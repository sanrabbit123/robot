const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const CONTENTS_MODULE_DIR = process.cwd() + "/apps/backMaker/alive/contents/contentsTong";

const SmallTalk = function (json) {
  this.title = json.title;
  this.contents = json.contents;
}

SmallTalk.prototype.toNormal = function () {
  let obj = {};
  obj.title = this.title;
  obj.contents = this.contents;

  return obj;
}

const PorfolioContentsDetail = function (json) {
  this.photoKey = json.photoKey;
  this.title = json.title;
  this.contents = json.contents;
  this.smallTalk = new SmallTalk(json.smallTalk);
}

PorfolioContentsDetail.prototype.toNormal = function () {
  let obj = {};
  obj.photoKey = this.photoKey;
  obj.title = this.title;
  obj.contents = this.contents;
  obj.smallTalk = this.smallTalk.toNormal();

  return obj;
}

class PorfolioContentsDetails extends Array {
  toNormal() {
    let arr = [];
    for (let i of this) {
      arr.push(i.toNormal());
    }
    return arr;
  }
}

const PorfolioContents = function (json) {
  let temp;
  let arr = new PorfolioContentsDetails();
  for (let i of json.detail) {
    temp = new PorfolioContentsDetail(i);
    arr.push(temp);
  }

  this.suggestion = json.suggestion;
  this.detail = arr;
}

PorfolioContents.prototype.toNormal = function () {
  let obj = {};
  obj.suggestion = this.suggestion;
  obj.detail = this.detail.toNormal();

  return obj;
}

module.exports = PorfolioContents;
