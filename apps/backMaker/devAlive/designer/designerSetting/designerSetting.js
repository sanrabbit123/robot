const GENERAL_DIR = process.cwd() + "/apps/backMaker/devAlive/general";
const DESIGNER_DIR = process.cwd() + "/apps/backMaker/devAlive/designer";

// front --------------------------------------------------------------------------------

class FrontMethods extends Array {
  toNormal() {
    let arr = [];
    for (let i of this) {
      arr.push(i);
    }
    return arr;
  }
}

class FrontIntroductionDesktop extends Array {
  toNormal() {
    let arr = [];
    for (let i of this) {
      arr.push(i);
    }
    return arr;
  }
}

class FrontIntroductionMobile extends Array {
  toNormal() {
    let arr = [];
    for (let i of this) {
      arr.push(i);
    }
    return arr;
  }
}

const FrontIntroduction = function (json) {
  this.desktop = new FrontIntroductionDesktop();
  this.mobile = new FrontIntroductionMobile();
  for (let i of json.desktop) {
    this.desktop.push(i);
  }
  for (let i of json.mobile) {
    this.mobile.push(i);
  }
}

FrontIntroduction.prototype.toNormal = function () {
  let obj = {};
  obj.desktop = this.desktop.toNormal();
  obj.mobile = this.mobile.toNormal();
  return obj;
}

const FrontPhoto = function (json) {
  this.porlid = json.porlid;
  this.index = json.index;
}

FrontPhoto.prototype.toNormal = function () {
  let obj = {};
  obj.porlid = this.porlid;
  obj.index = this.index;
  return obj;
}

const Front = function (json) {
  let tempInstance;
  this.introduction = new FrontIntroduction(json.introduction);
  this.methods = new FrontMethods();
  for (let i of json.methods) {
    this.methods.push(i);
  }
  this.photo = new FrontPhoto(json.photo);
  this.order = json.order;
}

Front.prototype.toNormal = function () {
  let obj = {};
  obj.introduction = this.introduction.toNormal();
  obj.methods = this.methods.toNormal();
  obj.photo = this.photo.toNormal();
  obj.order = this.order;
  return obj;
}

// proposal --------------------------------------------------------------------------------

class Proposals extends Array {
  toNormal() {
    let arr = [];
    for (let i of this) {
      arr.push(i.toNormal());
    }
    return arr;
  }
}

class ProposalPhotos extends Array {
  toNormal() {
    let arr = [];
    for (let i of this) {
      arr.push(i.toNormal());
    }
    return arr;
  }
}

const ProposalPhoto = function (json) {
  this.position = json.position;
  this.sgTrue = json.sgTrue;
  this.unionPo = json.unionPo;
  this.styleText = json.styleText;
  this.imgSrc = json.imgSrc;
}

ProposalPhoto.prototype.toNormal = function () {
  let obj = {};
  obj.position = this.position;
  obj.sgTrue = this.sgTrue;
  obj.unionPo = this.unionPo;
  obj.styleText = this.styleText;
  obj.imgSrc = this.imgSrc;
  return obj;
}

class ProposalDescription extends Array {
  toNormal() {
    let arr = [];
    for (let i of this) {
      arr.push(i);
    }
    return arr;
  }
}

const Proposal = function (json) {
  let tempInstance;
  this.name = json.name;
  this.photo = new ProposalPhotos();
  for (let i of json.photo) {
    tempInstance = new ProposalPhoto(i);
    this.photo.push(tempInstance);
  }
  this.description = new ProposalDescription();
  for (let i of json.description) {
    this.description.push(i);
  }
}

Proposal.prototype.toNormal = function () {
  let obj = {};
  obj.name = this.name;
  obj.photo = this.photo.toNormal();
  obj.description = this.description.toNormal();
  return obj;
}

// ghost --------------------------------------------------------------------------------

class Ghosts extends Array {
  toNormal() {
    let arr = [];
    for (let i of this) {
      arr.push(i.toNormal());
    }
    return arr;
  }
}

const Ghost = function (json) {
  this.link = json.link;
  this.sgTrue = json.sgTrue;
}

Ghost.prototype.toNormal = function () {
  let obj = {};
  obj.link = this.link;
  obj.sgTrue = this.sgTrue;
  return obj;
}

// main --------------------------------------------------------------------------------

const DesignerSetting = function (json) {
  let tempInstance;
  this.front = new Front(json.front);
  this.proposal = new Proposals();
  for (let i of json.proposal) {
    tempInstance = new Proposal(i);
    this.proposal.push(tempInstance);
  }
  this.ghost = new Ghosts();
  for (let i of json.ghost) {
    tempInstance = new Ghost(i);
    this.ghost.push(tempInstance);
  }
}

DesignerSetting.prototype.toNormal = function () {
  let obj = {};
  obj.front = this.front.toNormal();
  obj.proposal = this.proposal.toNormal();
  obj.ghost = this.ghost.toNormal();
  return obj;
}

module.exports = DesignerSetting;
