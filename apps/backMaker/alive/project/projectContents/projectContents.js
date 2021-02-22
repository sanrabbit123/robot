const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const PROJECT_DIR = process.cwd() + "/apps/backMaker/alive/project";
const { Menu, DateParse } = require(GENERAL_DIR + "/generator.js");

const ContentsShareDesigner = function (json) {
  this.photo = new DateParse(json.photo);
  this.contents = new DateParse(json.contents);
}

ContentsShareDesigner.prototype.toNormal = function () {
  let obj = {};
  obj.photo = this.photo.toNormal();
  obj.contents = this.contents.toNormal();
  return obj;
}

const ContentsShareClient = function (json) {
  this.photo = new DateParse(json.photo);
  this.contents = new DateParse(json.contents);
}

ContentsShareClient.prototype.toNormal = function () {
  let obj = {};
  obj.photo = this.photo.toNormal();
  obj.contents = this.contents.toNormal();
  return obj;
}

const ContentsShare = function (json) {
  this.client = new ContentsShareClient(json.client);
  this.designer = new ContentsShareDesigner(json.designer);
}

ContentsShare.prototype.toNormal = function () {
  let obj = {};
  obj.client = this.client.toNormal();
  obj.designer = this.designer.toNormal();
  return obj;
}

const ContentsRawPhoto = function (json) {
  this.status = new Menu(json.status, [ '원본 요청 요망', '원본 수집 완료', '원본 보정중', '원본 보정 완료', '해당 없음' ], false);
  this.link = json.link;
}

ContentsRawPhoto.prototype.toNormal = function () {
  let obj = {};
  obj.status = this.status.toNormal();
  obj.link = this.link;
  return obj;
}

const ContentsRawInterview = function (json) {
  this.status = new Menu(json.status, [ '인터뷰 요망', '인터뷰 완료', '원본 편집중', '원본 편집 완료', '해당 없음' ], false);
  this.link = json.link;
}

ContentsRawInterview.prototype.toNormal = function () {
  let obj = {};
  obj.status = this.status.toNormal();
  obj.link = this.link;
  return obj;
}

const ContentsRawPortfolio = function (json) {
  this.status = new Menu(json.status, [ '원본 요청 요망', '원본 수집 완료', '원본 편집중', '원본 편집 완료', '해당 없음' ], false);
  this.link = json.link;
}

ContentsRawPortfolio.prototype.toNormal = function () {
  let obj = {};
  obj.status = this.status.toNormal();
  obj.link = this.link;
  return obj;
}

const ContentsRaw = function (json) {
  this.portfolio = new ContentsRawPortfolio(json.portfolio);
  this.interview = new ContentsRawInterview(json.interview);
  this.photo = new ContentsRawPhoto(json.photo);
}

ContentsRaw.prototype.toNormal = function () {
  let obj = {};
  obj.portfolio = this.portfolio.toNormal();
  obj.interview = this.interview.toNormal();
  obj.photo = this.photo.toNormal();
  return obj;
}

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
  this.boo = json.boo;
  this.status = new Menu(json.status, [ '촬영 컨택 요망', '촬영 컨택중', '촬영 일정 확정', '촬영 완료', '촬영 홀딩', '해당 없음' ], false);
  this.date = new DateParse(json.date);
  this.info = new ContentsPhotoInfo(json.info);
}

ContentsPhoto.prototype.toNormal = function () {
  let obj = {};
  obj.boo = this.boo;
  obj.status = this.status.toNormal();
  obj.date = this.date.toNormal();
  obj.info = this.info.toNormal();
  return obj;
}

const ProjectContents = function (json) {
  this.conid = json.conid;
  this.photo = new ContentsPhoto(json.photo);
  this.raw = new ContentsRaw(json.raw);
  this.share = new ContentsShare(json.share);
}

ProjectContents.prototype.toNormal = function () {
  let obj = {};
  obj.conid = this.conid;
  obj.photo = this.photo.toNormal();
  obj.raw = this.raw.toNormal();
  obj.share = this.share.toNormal();
  return obj;
}

module.exports = ProjectContents;
