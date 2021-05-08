const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const CONTENTS_MODULE_DIR = process.cwd() + "/apps/backMaker/alive/contents/contentsTong";

const QuestionAnswer = function (json) {
  this.question = json.question;
  this.answer = json.answer;
}

QuestionAnswer.prototype.toNormal = function () {
  let obj = {};
  obj.question = this.question;
  obj.answer = this.answer;
  return obj;
}

class Photos extends Array {
  toNormal() {
    let arr = [];
    for (let i of this) {
      arr.push(i);
    }
    return arr;
  }
}

class QuestionAnswers extends Array {
  toNormal() {
    let arr = [];
    for (let i of this) {
      arr.push(i.toNormal());
    }
    return arr;
  }
}

const ReviewContentsDetail = function (json) {
  let arr0, arr1;
  let temp;

  arr0 = new Photos();
  arr1 = new QuestionAnswers();

  for (let i of json.photos) {
    arr0.push(i);
  }
  for (let i of json.contents) {
    temp = new QuestionAnswer(i);
    arr1.push(temp);
  }

  this.type = json.type;
  this.photos = arr0;
  this.contents = arr1;
}

ReviewContentsDetail.prototype.toNormal = function () {
  let obj = {};
  obj.type = this.type;
  obj.photos = this.photos.toNormal();
  obj.contents = this.contents.toNormal();

  return obj;
}

class ReviewContentsDetails extends Array {
  toNormal() {
    let arr = [];
    for (let i of this) {
      arr.push(i.toNormal());
    }
    return arr;
  }
}

const ReviewContents = function (json) {
  let temp, arr;
  arr = new ReviewContentsDetails();
  for (let i of json.detail) {
    temp = new ReviewContentsDetail(i);
    arr.push(temp);
  }
  this.detail = arr;
}

ReviewContents.prototype.toNormal = function () {
  let obj = {};
  obj.detail = this.detail.toNormal();
  return obj;
}

module.exports = ReviewContents;
