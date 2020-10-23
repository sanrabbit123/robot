const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const CONTENTS_MODULE_DIR = process.cwd() + "/apps/backMaker/alive/contents/contentsTong";
const Porfolio = require(CONTENTS_MODULE_DIR + "/portfolio.js");
const Review = require(CONTENTS_MODULE_DIR + "/review.js");

const ContentsTong = function (json) {
  this.portfolio = new Porfolio(json.portfolio);
  this.review = new Review(json.review);
}

ContentsTong.prototype.toNormal = function () {
  let obj = {};
  obj.portfolio = this.portfolio.toNormal();
  obj.review = this.review.toNormal();

  return obj;
}

module.exports = ContentsTong;
