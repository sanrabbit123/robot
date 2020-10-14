class Device {

  constructor(json) {
    this.type = json.type;
    this.os = json.os;
    this.mobileDevice = json.mobileDevice;
  }

  toNormal() {
    let obj = {};
    obj.type = this.type;
    obj.os = this.os;
    obj.mobileDevice = this.mobileDevice;
    return obj;
  }

}

module.exports = Device;
