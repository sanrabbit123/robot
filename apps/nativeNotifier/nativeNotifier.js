const NativeNotifier = function () {
  const os = require('os').type().trim();
  const Mother = require(process.cwd() + "/apps/mother.js");
  const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js");
  const ADDRESS = require(process.cwd() + "/apps/infoObj.js");
  this.mother = new Mother();
  this.back = new BackMaker();
  this.address = ADDRESS;
  this.dir = process.cwd() + "/apps/nativeNotifier";
  this.moduleDir = `${this.dir}/module`;
  this.notifier = null;
  if (/Linux/gi.test(os)) {
    const NotifySend = require(`${this.moduleDir}/notifysend`);
    this.notifier = new NotifySend({ withFallback: true });
  } else if (/Darwin/gi.test(os)) {
    const NotificationCenter = require(`${this.moduleDir}/notificationcenter`);
    this.notifier = new NotificationCenter({ withFallback: true });
  } else if (/Windows/gi.test(os)) {
    const WindowsToaster = require(`${this.moduleDir}/toaster`);
    this.notifier = new WindowsToaster({ withFallback: true });
  } else {
    throw new Error("unknown os");
  }
}

NativeNotifier.prototype.sendAlarm = function (message, callback = function () {}) {
  if (typeof message !== "string") {
    throw new Error("invaild input");
  }
  const instance = this;
  const { notifier } = this;
  return new Promise((resolve, reject) => {
    notifier.notify({
        title: '',
        message,
        sound: true,
        wait: true
      }, (err, response, metadata) => {
      if (err) {
        reject(err);
      } else {
        metadata.type = metadata.activationType;
        delete metadata.activationType;
        metadata.activationAt = new Date(metadata.activationAt.split(' ').slice(0, 2).join(' '));
        metadata.deliveredAt = new Date(metadata.deliveredAt.split(' ').slice(0, 2).join(' '));
        if (/click/gi.test(metadata.type)) {
          callback.call(instance, metadata);
        }
        resolve(metadata);
      }
    });
  });
}

module.exports = NativeNotifier;
