const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const CONTENTS_DIR = process.cwd() + "/apps/backMaker/alive/contents";
const ContentsTong = require(CONTENTS_DIR + "/contentsTong.js");
const PhotoTong = require(CONTENTS_DIR + "/photoTong.js");

const Service = function (json) {
  this.serid = json.serid;
  this.xValue = json.xValue;
  this.online = Boolean(json.online);
}

Service.prototype.toNormal = function () {
  let obj = {};
  obj.serid = this.serid;
  obj.xValue = this.xValue;
  obj.online = this.online;
  return obj;
}

const Contents = function (json) {
  this.conid = json.conid;
  this.desid = json.desid;
  this.cliid = json.cliid;
  this.proid = json.proid;
  this.contents = new ContentsTong(json.contents);
  this.photos = new PhotoTong(json.photos);
  this.service = new Service(json.service);
}

Contents.prototype.toNormal = function () {
  let obj = {};
  obj.conid = this.conid;
  obj.desid = this.desid;
  obj.cliid = this.cliid;
  obj.proid = this.proid;
  obj.contents = this.contents.toNormal();
  obj.photos = this.photos.toNormal();
  obj.service = this.service.toNormal();
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
  return obj;
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

Contents.prototype.getPid = function () {
  return this.contents.portfolio.pid;
}

Contents.prototype.getRid = function () {
  return this.contents.review.rid;
}

Contents.prototype.toOriginalPath = function () {
  let arr = [];
  for (let i = 0; i < this.photos.detail.length; i++) {
    arr.push(`/corePortfolio/original/${this.contents.portfolio.pid}/i${String(i + 1)}${this.contents.portfolio.pid}.jpg`);
  }
  return arr;
}

Contents.prototype.getPortfolioDetail = function () {
  return this.contents.portfolio.contents.detail;
}

Contents.prototype.getReviewDetail = function () {
  return this.contents.review.contents.detail;
}

Contents.prototype.getGsArr = function () {
  let arr = [];
  for (let { gs } of this.photos.detail) {
    arr.push(gs);
  }
  return arr;
}

Contents.prototype.getContentsFlatDetail = function () {
  const { contents: { portfolio: { contents: { detail: portfolioDetail } }, review: { contents: { detail: reviewDetail } } } } = this;
  let portfolio, review;
  let pastKey = null;

  portfolio = "";
  for (let { photo, title, contents, smallTalk: { title: smallTalkTitle, contents: smallTalkContents } } of portfolioDetail) {
    if (pastKey !== null) {
      portfolio += photo.join(", ");
      portfolio += "\n\n";
      portfolio += title;
      portfolio += "\n\n";
    }
    portfolio += contents;
    if (smallTalkTitle !== "") {
      portfolio += "\n\n";
      portfolio += smallTalkTitle;
      portfolio += "\n";
      portfolio += smallTalkContents;
    }
    portfolio += "\n\n";
  }
  portfolio = portfolio.slice(0, -2);

  review = "";
  for (let { type, photos, contents } of reviewDetail) {
    if (type === "init") {
      for (let { answer } of contents) {
        review += answer;
        review += "\n\n";
      }
    } else {
      review += photos.join(" ");
      review += "\n\n";
      for (let { question, answer } of contents) {
        review += "Q. " + question;
        review += "\n\n";
        review += "A. " + answer;
        review += "\n\n";
      }
    }
  }
  review = review.slice(0, -2);

  return { portfolio, review };
}

Contents.prototype.getGoogleDocsDetail = function (server) {
  if (typeof server !== "string") {
    throw new Error("server address must")
  }
  const self = this;
  const corePortfolio = "/corePortfolio/listImage";
  const photoChar = 't';
  const { portfolio, review } = this.getContentsFlatDetail();
  const token = "___split___";
  let tempArr, tempArr2, result;

  result = {};

  tempArr = portfolio.split('\n').map((i) => { return (i === '' ? "\n" : i.trim()); }).map((i) => {
    let arr0, arr1;
    if (/^[0-9]/.test(i) && /[0-9]$/.test(i) && /\-/gi.test(i)) {
      arr0 = i.split('-').map((j) => { return Number(j.trim()); });
      if (arr0.length !== 2) {
        throw new Error("invaild text");
      }
      arr1 = [];
      for (let z = arr0[0]; z < arr0[1] + 1; z++) {
        arr1.push(server + corePortfolio + "/" + self.contents.portfolio.pid + "/" + photoChar + String(z) + self.contents.portfolio.pid + ".jpg" + token + String(z));
      }
      return arr1;
    } else {
      return i;
    }
  });

  tempArr = tempArr.flat().map((i) => {
    if (/^http/.test(i)) {
      return [ i.split(token)[0], self.photos.detail[Number(i.split(token)[1]) - 1].gs ];
    } else {
      return i;
    }
  });

  tempArr.unshift("\n");
  tempArr.unshift(self.contents.portfolio.title.main);
  result.portfolio = tempArr;

  result.review = [];
  if (review !== '') {

    tempArr2 = review.split('\n').map((i) => { return (i === '' ? "\n" : i.trim()); }).map((i) => {
      let arr0;
      if (/^[0-9]/.test(i) && /[0-9]$/.test(i)) {
        arr0 = i.split(' ').map((j) => { return Number(j.trim()); });
        arr0 = arr0.map((z) => {
          return server + corePortfolio + "/" + self.contents.portfolio.pid + "/" + photoChar + String(z) + self.contents.portfolio.pid + ".jpg" + token + String(z);
        });
        return arr0;
      } else {
        return i;
      }
    });

    tempArr2 = tempArr2.flat().map((i) => {
      if (/^http/.test(i)) {
        return [ i.split(token)[0], self.photos.detail[Number(i.split(token)[1]) - 1].gs ];
      } else {
        return i;
      }
    });

    tempArr2.unshift("\n");
    tempArr2.unshift(self.contents.review.title.main);
    result.review = tempArr2;
  }

  return result;
}

module.exports = Contents;
