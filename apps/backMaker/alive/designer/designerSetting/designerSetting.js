const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const DESIGNER_DIR = process.cwd() + "/apps/backMaker/alive/designer";

// front --------------------------------------------------------------------------------

class FrontMethods extends Array {}

class FrontIntroductionDesktop extends Array {}

class FrontIntroductionMobile extends Array {}

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

const FrontPhoto = function (json) {
  this.porlid = json.porlid;
  this.index = json.index;
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

// proposal --------------------------------------------------------------------------------

class Proposals extends Array {}

class ProposalPhotos extends Array {}

const ProposalPhoto = function (json) {
  this.position = json.position;
  this.sgTrue = json.sgTrue;
  this.unionPo = json.unionPo;
  this.styleText = json.styleText;
  this.imgSrc = json.imgSrc;
}

class ProposalDescription extends Array {}

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

// ghost --------------------------------------------------------------------------------

class Ghosts extends Array {}

const Ghost = function (json) {
  this.link = json.link;
  this.sgTrue = json.sgTrue;
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

module.exports = DesignerSetting;
