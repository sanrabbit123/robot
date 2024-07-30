const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const CONTENTS_MODULE_DIR = process.cwd() + "/apps/backMaker/alive/contents/contentsTong";

const PorfolioContentsDetail = function (json) {
  this.photo = json.photo;
  this.title = json.title;
  this.contents = json.contents;
}

PorfolioContentsDetail.prototype.toNormal = function () {
  let obj = {};
  obj.photo = this.photo;
  obj.title = this.title;
  obj.contents = this.contents;
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

    result.rooms = [];
    for (let i = 1; i < this.length; i++) {
      tempArr = this[i].photo;
      arr.push(tempArr);
      result.rooms.push(this[i].title);
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
