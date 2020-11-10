const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const PROJECT_DIR = process.cwd() + "/apps/backMaker/alive/project";
const { DateParse } = require(GENERAL_DIR + "/generator.js");

class Fees extends Array {
  toNormal() {
    let arr = [];
    for (let i of this) {
      arr.push(i.toNormal());
    }
    return arr;
  }
}

const Fee = function (json) {
  this.method = json.method;
  this.partial = json.partial;
  this.amount = json.amount;
}

Fee.prototype.toNormal = function () {
  let obj = {};
  obj.method = this.method;
  obj.partial = this.partial;
  obj.amount = this.amount;
  return obj;
}

class PictureSettings extends Array {
  toNormal() {
    let arr = [];
    for (let i of this) {
      arr.push(i.toNormal());
    }
    return arr;
  }
}

const PictureSetting = function (json) {
  this.position = json.position;
  this.sgTrue = json.sgTrue;
  this.unionPo = json.unionPo;
  this.styleText = json.styleText;
  this.imgSrc = json.imgSrc;
}

PictureSetting.prototype.toNormal = function () {
  let obj = {};
  obj.position = this.position;
  obj.sgTrue = this.sgTrue;
  obj.unionPo = this.unionPo;
  obj.styleText = this.styleText;
  obj.imgSrc = this.imgSrc;
  return obj;
}

class Description extends Array {
  toNormal() {
    let arr = [];
    for (let i of this) {
      arr.push(i);
    }
    return arr;
  }
}

class Proposals extends Array {
  toNormal() {
    let arr = [];
    for (let i of this) {
      arr.push(i.toNormal());
    }
    return arr;
  }
}

const Proposal = function (json) {
  let tempInstance0, tempInstance1;
  this.desid = json.desid;
  this.fee = new Fees();
  for (let i of json.fee) {
    tempInstance0 = new Fee(i);
    this.fee.push(tempInstance0);
  }
  this.pictureSettings = new PictureSettings();
  for (let i of json.pictureSettings) {
    tempInstance1 = new PictureSetting(i);
    this.pictureSettings.push(tempInstance1);
  }
  this.description = new Description();
  for (let i of json.description) {
    this.description.push(i);
  }
}

Proposal.prototype.toNormal = function () {
  let obj = {};
  obj.desid = this.desid;
  obj.fee = this.fee.toNormal();
  obj.pictureSettings = this.pictureSettings.toNormal();
  obj.description = this.description.toNormal();
  return obj;
}

const ProjectProposal = function (json) {
  let tempInstance;
  this.status = json.status;
  this.date = new DateParse(json.date);
  this.detail = new Proposals();
  for (let i of json.detail) {
    tempInstance = new Proposal(i);
    this.detail.push(tempInstance);
  }
}

ProjectProposal.prototype.toNormal = function () {
  let obj = {};
  obj.status = this.status;
  obj.date = this.date.toNormal();
  obj.detail = this.detail.toNormal();
  return obj;
}

module.exports = ProjectProposal;
