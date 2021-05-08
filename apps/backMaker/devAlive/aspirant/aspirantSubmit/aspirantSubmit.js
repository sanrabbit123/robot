const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const PROJECT_DIR = process.cwd() + "/apps/backMaker/alive/aspirant";
const { DateParse } = require(GENERAL_DIR + "/generator.js");

const AspirantSubmitPresentation = function (json) {
  this.date = new DateParse(json.date);
  this.boo = json.boo;
}

AspirantSubmitPresentation.prototype.toNormal = function () {
  let obj = {};
  obj.date = this.date.toNormal();
  obj.boo = this.boo;
  return obj;
}

const AspirantSubmitPartnership = function (json) {
  this.date = new DateParse(json.date);
  this.boo = json.boo;
}

AspirantSubmitPartnership.prototype.toNormal = function () {
  let obj = {};
  obj.date = this.date.toNormal();
  obj.boo = this.boo;
  return obj;
}

const AspirantSubmitFirst = function (json) {
  this.date = new DateParse(json.date);
  this.method = json.method;
}

AspirantSubmitFirst.prototype.toNormal = function () {
  let obj = {};
  obj.date = this.date.toNormal();
  obj.method = this.method;
  return obj;
}

const AspirantSubmit = function (json) {
  this.presentation = new AspirantSubmitPresentation(json.presentation);
  this.partnership = new AspirantSubmitPartnership(json.partnership);
  this.firstRequest = new AspirantSubmitFirst(json.firstRequest);
  this.comeFrom = json.comeFrom;
}

AspirantSubmit.prototype.toNormal = function () {
  let obj = {};
  obj.presentation = this.presentation.toNormal();
  obj.partnership = this.partnership.toNormal();
  obj.firstRequest = this.firstRequest.toNormal();
  obj.comeFrom = this.comeFrom;
  return obj;
}

module.exports = AspirantSubmit;
