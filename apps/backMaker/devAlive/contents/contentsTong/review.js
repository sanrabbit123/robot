const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const CONTENTS_MODULE_DIR = process.cwd() + "/apps/backMaker/alive/contents/contentsTong";
const { DateParse } = require(GENERAL_DIR + "/generator.js");
const ReviewDetailInfo = require(CONTENTS_MODULE_DIR + "/reviewDetailInfo.js");
const ReviewContents = require(CONTENTS_MODULE_DIR + "/reviewContents.js");

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

Title.prototype.getAllCases = function () {
  let obj = {};

  obj.main = [];
  obj.main.push(this.main);
  obj.main.push(this.main.replace(/, /, "\n"));

  obj.sub = [];
  obj.sub.push(this.sub.replace(/, /, " "));
  obj.sub.push(this.sub.replace(/, /, "\n"));

  return obj;
}

const Review = function (json) {
  this.rid = json.rid;
  this.date = new DateParse(json.date);
  this.title = new Title(json.title);
  this.detailInfo = new ReviewDetailInfo(json.detailInfo);
  this.contents = new ReviewContents(json.contents);
}

Review.prototype.toNormal = function () {
  let obj = {};
  obj.rid = this.rid;
  obj.date = this.date.toNormal();
  obj.title = this.title.toNormal();
  obj.detailInfo = this.detailInfo.toNormal();
  obj.contents = this.contents.toNormal();

  return obj;
}

module.exports = Review;
