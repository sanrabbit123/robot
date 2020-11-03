const PersonalInfo = function (json) {
  this.age = json.age;
  this.gender = json.gender;
}

PersonalInfo.prototype.toNormal = function () {
  let obj = {};
  obj.age = this.age;
  obj.gender = this.gender;
  return obj;
}

module.exports = PersonalInfo;
