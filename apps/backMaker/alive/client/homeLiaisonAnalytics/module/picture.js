const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const { DateParse } = require(GENERAL_DIR + "/generator.js");

const Confirm = function (json) {
  this.date = new DateParse(json.date);
  this.who = json.who;
}

Confirm.prototype.toNormal = function () {
  let obj = {};
  obj.date = this.date.toNormal();
  obj.who = this.who;
  return obj;
}

class Confirms extends Array {
  constructor(json) {
    super();
    for (let i of json) {
      this.push(new Confirm(i));
    }
  }
  toNormal() {
    let arr = [];
    for (let i of this) {
      arr.push(i.toNormal());
    }
    return arr;
  }
}

const PreferPictureDetail = function (json) {
  this.date = new DateParse(json.date);
  this.confirm = new Confirms(json.confirm);
  this.folderId = json.folderId;
}

PreferPictureDetail.prototype.toNormal = function () {
  let obj = {};
  obj.date = this.date.toNormal();
  obj.confirm = this.confirm.toNormal();
  obj.folderId = this.folderId;
  return obj;
}

class PreferPicture extends Array {
  constructor(json) {
    super();
    let tempInstance;
    for (let i of json) {
      tempInstance = new PreferPictureDetail(i);
      this.push(tempInstance);
    }
  }
  toNormal() {
    let arr = [];
    for (let i of this) {
      arr.push(i.toNormal());
    }
    return arr;
  }
}

const SpacePictureDetail = function (json) {
  this.date = new DateParse(json.date);
  this.confirm = new Confirms(json.confirm);
  this.folderId = json.folderId;
}

SpacePictureDetail.prototype.toNormal = function () {
  let obj = {};
  obj.date = this.date.toNormal();
  obj.confirm = this.confirm.toNormal();
  obj.folderId = this.folderId;
  return obj;
}

class SpacePicture extends Array {
  constructor(json) {
    super();
    let tempInstance;
    for (let i of json) {
      tempInstance = new SpacePictureDetail(i);
      this.push(tempInstance);
    }
  }
  toNormal() {
    let arr = [];
    for (let i of this) {
      arr.push(i.toNormal());
    }
    return arr;
  }
}

const Picture = function (picture) {
  this.space = new SpacePicture(picture.space);
  this.prefer = new PreferPicture(picture.prefer);
}

Picture.prototype.toNormal = function () {
  let obj = {};
  obj.space = this.space.toNormal();
  obj.prefer = this.prefer.toNormal();
  return obj;
}

module.exports = Picture;
