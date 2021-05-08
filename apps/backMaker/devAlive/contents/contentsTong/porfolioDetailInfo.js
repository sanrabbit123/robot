const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const CONTENTS_MODULE_DIR = process.cwd() + "/apps/backMaker/alive/contents/contentsTong";

class Photodae extends Array {
  toNormal() {
    let arr = [];
    for (let i of this) {
      arr.push(i);
    }
    return arr;
  }
}

const Photosg = function (json) {
  this.first = Number(json.first);
  this.last = Number(json.last);
}

Photosg.prototype.toNormal = function () {
  let obj = {};
  obj.first = Number(this.first);
  obj.last = Number(this.last);

  return obj;
}

class Slide extends Array {
  toNormal() {
    let arr = [];
    for (let i of this) {
      arr.push(i);
    }
    return arr;
  }
}

class Tag extends Array {
  toNormal() {
    let arr = [];
    for (let i of this) {
      arr.push(i);
    }
    return arr;
  }
}

const Sort = function (json) {
  this.key8 = json.key8;
  this.key9 = json.key9;
}

Sort.prototype.toNormal = function () {
  let obj = {};
  obj.key8 = this.key8;
  obj.key9 = this.key9;

  return obj;
}

const PorfolioDetailInfo = function (json) {
  let arr0, arr1, arr2;

  arr0 = new Photodae();
  arr1 = new Slide();
  arr2 = new Tag();

  for (let i of json.photodae) {
    arr0.push(i);
  }
  for (let i of json.slide) {
    arr1.push(i);
  }
  for (let i of json.tag) {
    arr2.push(i);
  }

  this.photodae = arr0;
  this.photosg = new Photosg(json.photosg);
  this.slide = arr1;
  this.tag = arr2;
  this.service = json.service;
  this.sort = new Sort(json.sort);
}

PorfolioDetailInfo.prototype.toNormal = function () {
  let obj = {};
  obj.photodae = this.photodae.toNormal();
  obj.photosg = this.photosg.toNormal();
  obj.slide = this.slide.toNormal();
  obj.tag = this.tag.toNormal();
  obj.service = this.service;
  obj.sort = this.sort.toNormal();

  return obj;
}

module.exports = PorfolioDetailInfo;
