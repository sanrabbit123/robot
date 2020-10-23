const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const CONTENTS_DIR = process.cwd() + "/apps/backMaker/alive/contents";
const ContentsTong = require(CONTENTS_DIR + "/contentsTong.js");
const PhotoTong = require(CONTENTS_DIR + "/photoTong.js");

const Contents = function (json) {
  this.conid = json.conid;
  this.desid = json.desid;
  this.contents = new ContentsTong(json.contents);
  this.photos = new PhotoTong(json.photos);
}

Contents.prototype.toNormal = function () {
  let obj = {};
  obj.conid = this.conid;
  obj.desid = this.desid;
  obj.contents = this.contents.toNormal();
  obj.photos = this.photos.toNormal();

  return obj;
}

Contents.prototype.toJson = function () {
  return JSON.stringify(this.toNormal(), null, 2);
}

Contents.prototype.toDeath = function () {
  return JSON.stringify(this.toNormal(), null, 2);
}

Contents.prototype.toAiState = function () {
  let obj = {};
  



  return obj;
}

module.exports = Contents;
