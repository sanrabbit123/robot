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

Contents.prototype.toAiState = function (jsonBoo = false) {
  let obj = {};
  let tempSubject0, tempObj;
  const { portfolio: portfolioTitle, review: reviewTitle } = this.returnTitleObject();
  const json = this.toNormal();
  const { contents: { portfolio, review } } = json;

  obj.title = portfolioTitle.main[0];
  obj.space = this.getSpace();
  obj.pyeong = String(this.getPyeong());
  obj.sub_titles = {};
  obj.sub_titles.main_title = portfolioTitle.main[1];
  obj.sub_titles.main_color_title = portfolioTitle.main[3];

  obj.sub_titles.main_color_object = {};
  obj.sub_titles.main_color_object.main = portfolio.color.main;
  obj.sub_titles.main_color_object.sub = portfolio.color.sub;
  obj.sub_titles.main_color_object.title = portfolio.color.title;

  obj.sub_titles.portivec = {};
  obj.sub_titles.portivec.main = portfolioTitle.main[2];
  obj.sub_titles.portivec.sub = portfolioTitle.sub[0];
  obj.sub_titles.portivec.region = this.getRegion();
  obj.sub_titles.portivec.method = this.getMethod();

  obj.sub_titles.name_card = {};
  obj.sub_titles.name_card.main = portfolioTitle.main[3];
  obj.sub_titles.name_card.sub = portfolioTitle.sub[1];

  obj.sub_titles.rev_main_title = reviewTitle.main[1];

  obj.sub_titles.revivec = {};
  obj.sub_titles.revivec.main = reviewTitle.sub[0];
  obj.sub_titles.revivec.sub = portfolioTitle.main[2] + " 후기";
  obj.sub_titles.revivec.hover = reviewTitle.sub[0];
  obj.sub_titles.revivec.mobile = reviewTitle.sub[1];

  obj.sub_titles.rev_name_card = {};
  obj.sub_titles.rev_name_card.main = reviewTitle.sub[1];
  obj.sub_titles.rev_name_card.sub = portfolioTitle.main[3] + " 후기";
  obj.sub_titles.rev_name_card.subsub = this.getSpace() + "\n" + "홈스타일링 후기";

  obj.designer = this.desid;
  obj.p_id = this.getPid();
  obj.p_info = {};
  obj.p_info.photodae = portfolio.detailInfo.photodae;
  obj.p_info.photosg = portfolio.detailInfo.photosg;
  obj.p_info.slide = portfolio.detailInfo.slide.join(' ');
  obj.p_info.tag = portfolio.detailInfo.tag.join(',');
  obj.p_info.service = portfolio.detailInfo.service;
  obj.p_info.key8 = portfolio.detailInfo.sort.key8;
  obj.p_info.key9 = portfolio.detailInfo.sort.key9;

  obj.suggestion = portfolio.contents.suggestion;
  obj.contents = [];
  for (let { photoKey, title, contents, smallTalk } of portfolio.contents.detail) {
    obj.contents.push({ photo_key: photoKey, title, main_contents: contents, smalltalk_yn: smallTalk.title, smalltalk_contents: smallTalk.contents });
  }

  obj.r_id = this.getRid();
  obj.r_info = {};
  obj.r_info.photodae = review.detailInfo.photodae;
  obj.r_info.order = review.detailInfo.order;

  obj.reviews = [];
  for (let { type, photos, contents } of review.contents.detail) {
    tempObj = { type, photos };
    tempObj.contents = [];
    for (let { question, answer } of contents) {
      tempObj.contents.push({ quest: question, answer: answer });
    }
    obj.reviews.push(tempObj);
  }

  if (jsonBoo) {
    return JSON.stringify(obj, null, 2);
  } else {
    return obj;
  }
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
  for (let { photoKey, title, contents, smallTalk: { title: smallTalkTitle, contents: smallTalkContents } } of portfolioDetail) {
    if (pastKey !== null) {
      portfolio += String(pastKey + 1) + " - " + String(photoKey);
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
    pastKey = photoKey;
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
