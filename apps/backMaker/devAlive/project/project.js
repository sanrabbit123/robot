const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const PROJECT_DIR = process.cwd() + "/apps/backMaker/alive/project";
const ProjectProposal = require(PROJECT_DIR + "/projectProposal/projectProposal.js");
const ProjectProcess = require(PROJECT_DIR + "/projectProcess/projectProcess.js");
const ProjectContents = require(PROJECT_DIR + "/projectContents/projectContents.js");

const ProjectService = function (json) {
  this.serid = json.serid;
  this.xValue = json.xValue;
  this.online = Boolean(json.online);
}

ProjectService.prototype.toNormal = function () {
  let obj = {};
  obj.serid = this.serid;
  obj.xValue = this.xValue;
  obj.online = this.online;
  return obj;
}

const Project = function (json) {
  this.proid = json.proid;
  this.cliid = json.cliid;
  this.desid = json.desid;
  this.service = new ProjectService(json.service);
  this.proposal = new ProjectProposal(json.proposal);
  this.process = new ProjectProcess(json.process);
  this.contents = new ProjectContents(json.contents);
}

Project.prototype.toNormal = function () {
  let obj = {};
  obj.proid = this.proid;
  obj.cliid = this.cliid;
  obj.desid = this.desid;
  obj.service = this.service.toNormal();
  obj.proposal = this.proposal.toNormal();
  obj.process = this.process.toNormal();
  obj.contents = this.contents.toNormal();
  return obj;
}

Project.prototype.selectProposal = function (desid) {
  if (typeof desid !== "string") {
    throw new Error("must be desid");
  }
  let target = null;
  for (let obj of this.proposal.detail) {
    if (obj.desid === desid) {
      target = obj;
    }
  }
  return target;
}

module.exports = Project;
