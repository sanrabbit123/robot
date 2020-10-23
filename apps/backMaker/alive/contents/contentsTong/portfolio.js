const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const CONTENTS_MODULE_DIR = process.cwd() + "/apps/backMaker/alive/contents/contentsTong";
const { DateParse } = require(GENERAL_DIR + "/generator.js");
const PorfolioDetailInfo = require(CONTENTS_MODULE_DIR + "/porfolioDetailInfo.js");
const PorfolioContents = require(CONTENTS_MODULE_DIR + "/porfolioContents.js");

const SpaceInfo = function (json) {
  this.space = json.space;
  this.pyeong = Number(json.pyeong);
  this.region = json.region;
  this.method = json.method;
}

SpaceInfo.prototype.toNormal = function () {
  let obj = {};
  obj.space = this.space;
  obj.pyeong = Number(this.pyeong);
  obj.region = this.region;
  obj.method = this.method;

  return obj;
}

const Title = function (json) {
  this.main = json.main;
  this.sub = json.sub;
}

Title.prototype.toNormal = function () {
  let obj = {};
  obj.main = this.main;
  obj.sub = this.sub;

  return obj;
}

const Color = function (json) {
  this.main = json.main;
  this.sub = json.sub;
  this.title = json.title;
}

Color.prototype.toNormal = function () {
  let obj = {};
  obj.main = this.main;
  obj.sub = this.sub;
  obj.title = this.title;

  return obj;
}

const Porfolio = function (json) {
  this.pid = json.pid;
  this.date = new DateParse(json.date);
  this.spaceInfo = new SpaceInfo(json.spaceInfo);
  this.title = new Title(json.title);
  this.color = new Color(json.color);
  this.detailInfo = new PorfolioDetailInfo(json.detailInfo);
  this.contents = new PorfolioContents(json.contents);
}

Porfolio.prototype.toNormal = function () {
  let obj = {};
  obj.pid = this.pid;
  obj.date = this.date.toNormal();
  obj.spaceInfo = this.spaceInfo.toNormal();
  obj.title = this.title.toNormal();
  obj.color = this.color.toNormal();
  obj.detailInfo = this.detailInfo.toNormal();
  obj.contents = this.contents.toNormal();

  return obj;
}


module.exports = Porfolio;
