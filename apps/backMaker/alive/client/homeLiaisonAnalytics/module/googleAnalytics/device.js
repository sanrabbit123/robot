const Device = function (json) {
  this.type = json.type;
  this.os = json.os;
  this.mobileDevice = json.mobileDevice;
}

Device.prototype.toNormal = function () {
  let obj = {};
  obj.type = this.type;
  obj.os = this.os;
  obj.mobileDevice = this.mobileDevice;
  return obj;
}

module.exports = Device;
