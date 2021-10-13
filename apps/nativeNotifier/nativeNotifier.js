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

NativeNotifier.prototype.sendAlarm = function () {
  const instance = this;
  const { notifier } = this;

  notifier.notify(
    {
      title: 'My awesome title',
      message: 'Hello from node, Mr. User!',
      icon: path.join(__dirname, 'coulson.jpg'), // Absolute path (doesn't work on balloons)
      sound: true, // Only Notification Center or Windows Toasters
      wait: true // Wait with callback, until user action is taken against notification, does not apply to Windows Toasters as they always wait or notify-send as it does not support the wait option
    },
    function (err, response, metadata) {
      console.log(response);
      // Response is response from notification
      // Metadata contains activationType, activationAt, deliveredAt
    }
  );

}




module.exports = NativeNotifier;
