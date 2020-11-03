const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const PROJECT_DIR = process.cwd() + "/apps/backMaker/alive/project";
const { DateParse } = require(GENERAL_DIR + "/generator.js");

const ContentsPhotoInfo = function (json) {
  this.photographer = json.photographer;
  this.interviewer = json.interviewer;
}

ContentsPhotoInfo.prototype.toNormal = function () {
  let obj = {};
  obj.photographer = this.photographer;
  obj.interviewer = this.interviewer;
  return obj;
}

const ContentsPhoto = function (json) {
  this.date = new DateParse(json.date);
  this.info = new ContentsPhotoInfo(json.info);
}

ContentsPhoto.prototype.toNormal = function () {
  let obj = {};
  obj.date = this.date.toNormal();
  obj.info = this.info.toNormal();
  return obj;
}

const ProjectContents = function (json) {
  this.photo = new ContentsPhoto(json.photo);
  this.conid = json.conid;
}

ProjectContents.prototype.toNormal = function () {
  let obj = {};
  obj.photo = this.photo.toNormal();
  obj.conid = this.conid;
  return obj;
}

module.exports = ProjectContents;
