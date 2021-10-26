const utils = require('./utils');
const Growl = require('./growl');
const path = require('path');
const notifier = path.join(__dirname, './vendor/mac.noindex/HomeLiaison.app/Contents/MacOS/terminal-notifier');
const EventEmitter = require('events').EventEmitter;
const util = require('util');
let activeId = null;

const NotificationCenter = function (options) {
  options = utils.clone(options || {});
  if (!(this instanceof NotificationCenter)) {
    return new NotificationCenter(options);
  }
  this.options = options;
  EventEmitter.call(this);
}
util.inherits(NotificationCenter, EventEmitter);

const notifyRaw = function (options, callback = function () {}) {
  let fallbackNotifier;
  const id = { _ref: 'val' };
  options = utils.clone(options || {});
  activeId = id;

  if (typeof options === 'string') {
    options = { title: 'HomeLiaison', message: options };
  }

  if (typeof callback !== 'function') {
    throw new TypeError(
      'The second argument must be a function callback. You have passed ' +
        typeof fn
    );
  }

  const actionJackedCallback = utils.actionJackerDecorator(
    this,
    options,
    callback,
    function(data) {
      if (activeId !== id) return false;

      if (data === 'activate') {
        return 'click';
      }
      if (data === 'timeout') {
        return 'timeout';
      }
      if (data === 'replied') {
        return 'replied';
      }
      return false;
    }
  );
  options = utils.mapToMac(options);
  if (!options.message && !options.group && !options.list && !options.remove) {
    callback(new Error('Message, group, remove or list property is required.'));
    return this;
  }
  const argsList = utils.constructArgumentList(options);
  if (utils.isMountainLion()) {
    utils.fileCommandJson(
      this.options.customPath || notifier,
      argsList,
      actionJackedCallback
    );
    return this;
  }
  if (fallbackNotifier || !!this.options.withFallback) {
    fallbackNotifier = fallbackNotifier || new Growl(this.options);
    return fallbackNotifier.notify(options, callback);
  }
  callback(new Error("You need Mac OS X 10.8 or above to use NotificationCenter, or use Growl fallback with constructor option {withFallback: true}."));
  return this;
}

Object.defineProperty(NotificationCenter.prototype, 'notify', {
  get: function() {
    if (!this._notify) this._notify = notifyRaw.bind(this);
    return this._notify;
  }
});

module.exports = NotificationCenter;
