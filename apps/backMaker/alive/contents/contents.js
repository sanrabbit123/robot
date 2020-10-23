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

Contents.prototype.getTitle = function (main = "portfolio", sub = "main") {
  const { contents: { portfolio, review } } = this;
  switch (main) {
    case "portfolio":
      switch (sub) {
        case "main":
          return portfolio.title.main;
          break;
        case "sub":
          return portfolio.title.sub;
          break;
      }
      break;
    case "review":
      switch (sub) {
        case "main":
          return review.title.main;
          break;
        case "sub":
          return review.title.sub;
          break;
      }
      break;
  }
}

Contents.prototype.returnTitleObject = function () {
  const { contents: { portfolio: { title: portfolioTitle }, review: { title: reviewTitle } } } = this;
  let obj = {};
  obj.portfolio = portfolioTitle.getAllCases();
  obj.review = reviewTitle.getAllCases();
}

Contents.prototype.getSpace = function () {
  const { contents: { portfolio: { spaceInfo } } } = this;
  return spaceInfo.space;
}

Contents.prototype.getPyeong = function () {
  const { contents: { portfolio: { spaceInfo } } } = this;
  return spaceInfo.pyeong;
}

Contents.prototype.getRegion = function () {
  const { contents: { portfolio: { spaceInfo } } } = this;
  return spaceInfo.region;
}

Contents.prototype.getMethod = function () {
  const { contents: { portfolio: { spaceInfo } } } = this;
  return spaceInfo.method;
}

Contents.prototype.toAiState = function () {
  let obj = {};
  let tempSubject0;
  const { portfolio: portfolioTitle, review: reviewTitle } = this.returnTitleObject();

  obj.title = portfolioTitle.main[0];
  obj.space = this.getSpace();
  obj.pyeong = this.getPyeong();
  obj.sub_titles = {};
  obj.sub_titles.main_title = portfolioTitle.main[1];
  obj.sub_titles.main_color_title = portfolioTitle.main[3];





  obj.designer
  obj.p_id
  obj.p_info
  obj.suggestion
  obj.contents
  obj.r_id
  obj.r_info
  obj.reviews

  return obj;
}

module.exports = Contents;
