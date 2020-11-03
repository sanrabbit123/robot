const Region = function (json) {
  this.country = json.country;
  this.city = json.city;
  this.latitude = json.latitude;
  this.longitude = json.longitude;
}

Region.prototype.toNormal = function () {
  let obj = {};
  obj.country = this.country;
  obj.city = this.city;
  obj.latitude = this.latitude;
  obj.longitude = this.longitude;
  return obj;
}

module.exports = Region;
