const Picture = function (picture) {
  this.space = picture.space;
  this.prefer = picture.prefer;
}

Picture.prototype.toNormal = function () {
  let obj = {};
  obj.space = this.space;
  obj.prefer = this.prefer;
  return obj;
}

module.exports = Picture;
