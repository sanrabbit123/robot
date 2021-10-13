const os = require('os');
const which = require('./which/which.js');
const utils = require('./utils');
const EventEmitter = require('events').EventEmitter;
const util = require('util');
const allowedArguments = ['urgency', 'expire-time', 'icon', 'category', 'hint', 'app-name'];
const notifier = 'notify-send';
let hasNotifier;

const NotifySend = function (options) {
  options = utils.clone(options || {});
  if (!(this instanceof NotifySend)) {
    return new NotifySend(options);
  }
  this.options = options;
  EventEmitter.call(this);
}
util.inherits(NotifySend, EventEmitter);

const doNotification = function (options, callback) {
  options = utils.mapToNotifySend(options);
  options.title = options.title || 'Node Notification:';

  const initial = [options.title, options.message];
  delete options.title;
  delete options.message;

  const argsList = utils.constructArgumentList(options, {
    initial: initial,
    keyExtra: '-',
    allowedArguments: allowedArguments
  });

  utils.command(notifier, argsList, callback);
}

const notifyRaw = function (options, callback = function () {}) {
  options = utils.clone(options || {});

  if (typeof callback !== 'function') {
    throw new TypeError(
      'The second argument must be a function callback. You have passed ' +
        typeof callback
    );
  }

  if (typeof options === 'string') {
    options = { title: 'node-notifier', message: options };
  }

  if (!options.message) {
    callback(new Error('Message is required.'));
    return this;
  }

  if (os.type() !== 'Linux' && !os.type().match(/BSD$/)) {
    callback(new Error('Only supported on Linux and *BSD systems'));
    return this;
  }

  if (hasNotifier === false) {
    callback(new Error('notify-send must be installed on the system.'));
    return this;
  }

  if (hasNotifier || !!this.options.suppressOsdCheck) {
    doNotification(options, callback);
    return this;
  }

  try {
    hasNotifier = !!which.sync(notifier);
    doNotification(options, callback);
  } catch (err) {
    hasNotifier = false;
    return callback(err);
  }

  return this;
}

Object.defineProperty(NotifySend.prototype, 'notify', {
  get: function() {
    if (!this._notify) this._notify = notifyRaw.bind(this);
    return this._notify;
  }
});

module.exports = NotifySend;
