const checkGrowl = require('./checkGrowl');
const utils = require('./utils');
const growly = require('./growly/growly.js');
const EventEmitter = require('events').EventEmitter;
const util = require('util');
let hasGrowl;

const Growl = function (options) {
  options = utils.clone(options || {});
  if (!(this instanceof Growl)) {
    return new Growl(options);
  }
  growly.appname = options.name || 'Node';
  this.options = options;
  EventEmitter.call(this);
}
util.inherits(Growl, EventEmitter);

const notifyRaw = function (options, callback) {
  growly.setHost(this.options.host, this.options.port);
  options = utils.clone(options || {});

  if (typeof options === 'string') {
    options = { title: 'node-notifier', message: options };
  }

  callback = utils.actionJackerDecorator(this, options, callback, function(
    data
  ) {
    if (data === 'click') {
      return 'click';
    }
    if (data === 'timedout') {
      return 'timeout';
    }
    return false;
  });

  options = utils.mapToGrowl(options);

  if (!options.message) {
    callback(new Error('Message is required.'));
    return this;
  }

  options.title = options.title || 'Node Notification:';

  if (hasGrowl || !!options.wait) {
    const localCallback = options.wait ? callback : noop;
    growly.notify(options.message, options, localCallback);
    if (!options.wait) callback();
    return this;
  }

  checkGrowl(growly, function(_, didHaveGrowl) {
    hasGrowl = didHaveGrowl;
    if (!didHaveGrowl) return callback(new Error("Couldn't connect to growl (might be used as a fallback). Make sure it is running"));
    growly.notify(options.message, options);
    callback();
  });
  return this;
}

Object.defineProperty(Growl.prototype, 'notify', {
  get: function() {
    if (!this._notify) this._notify = notifyRaw.bind(this);
    return this._notify;
  }
});

function noop() {}

module.exports = Growl;
