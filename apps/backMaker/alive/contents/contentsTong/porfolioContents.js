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

  keyMatrix() {
    let result = {};
    let arr = [];
    let tempArr;
    let pastKey;

    result.rooms = [];
    pastKey = 1;
    for (let i = 1; i < this.length; i++) {
      tempArr = [];
      tempArr.push(pastKey);
      tempArr.push(this[i].photoKey);
      arr.push(tempArr);
      result.rooms.push(this[i].title);
      pastKey = this[i].photoKey + 1;
    }

    result.photos = arr;
    return result;
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

PorfolioContents.prototype.keyMatrix = function () {
  return this.detail.keyMatrix();
}

module.exports = PorfolioContents;
