class Region {

  constructor(json) {
    this.country = json.country;
    this.city = json.city;
    this.latitude = json.latitude;
    this.longitude = json.longitude;
  }

  toNormal() {
    let obj = {};
    obj.country = this.country;
    obj.city = this.city;
    obj.latitude = this.latitude;
    obj.longitude = this.longitude;
    return obj;
  }

}

module.exports = Region;
