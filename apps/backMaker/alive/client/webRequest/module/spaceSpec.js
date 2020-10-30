const SpaceSpec = function (spec) {
  this.room = Number(spec.room);
  this.bathroom = Number(spec.bathroom);
  this.valcony = Boolean(spec.valcony);
}

SpaceSpec.prototype.toNormal = function () {
  let obj = {};
  obj.room = this.room;
  obj.bathroom = this.bathroom;
  obj.valcony = this.valcony;
  return obj;
}

SpaceSpec.prototype.toMessage = function () {
  return `방 ${this.room}개${this.room === 4 ? " 이상" : ""} / 화장실 ${this.bathroom}개${this.bathroom === 3 ? " 이상" : ""} / 발코니 확장${(this.valcony ? "" : " 없음")}`;
}

module.exports = SpaceSpec;
