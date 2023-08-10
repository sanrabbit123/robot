const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const PROJECT_DIR = process.cwd() + "/apps/backMaker/alive/aspirant";
const { DateParse } = require(GENERAL_DIR + "/generator.js");

const AspirantResponsePortfolioProper = function (json) {
  this.status = json.status;
  this.remodeling = json.remodeling;
  this.styling = json.styling;
}

AspirantResponsePortfolioProper.prototype.toNormal = function () {
  let obj = {};
  obj.status = this.status;
  obj.remodeling = this.remodeling;
  obj.styling = this.styling;
  return obj;
}

const AspirantResponsePortfolioReady = function (json) {
  this.home = json.home;
  this.furnishing = json.furnishing;
  this.set = json.set;
}

AspirantResponsePortfolioReady.prototype.toNormal = function () {
  let obj = {};
  obj.home = this.home;
  obj.furnishing = this.furnishing;
  obj.set = this.set;
  return obj;
}

const AspirantResponsePortfolioPlus = function (json) {
  this.needs = json.needs;
  this.request = new DateParse(json.request);
  this.photo = new DateParse(json.photo);
}

AspirantResponsePortfolioPlus.prototype.toNormal = function () {
  let obj = {};
  obj.needs = this.needs;
  obj.request = this.request.toNormal();
  obj.photo = this.photo.toNormal();
  return obj;
}

const AspirantResponsePortfolio = function (json) {
  this.summary = json.summary;
  this.proper = new AspirantResponsePortfolioProper(json.proper);
  this.ready = new AspirantResponsePortfolioReady(json.ready);
  this.plus = new AspirantResponsePortfolioPlus(json.plus);
}

AspirantResponsePortfolio.prototype.toNormal = function () {
  let obj = {};
  obj.summary = this.summary;
  obj.proper = this.proper.toNormal();
  obj.ready = this.ready.toNormal();
  obj.plus = this.plus.toNormal();
  return obj;
}

const AspirantResponseFirst = function (json) {
  this.status = json.status;
  this.reason = json.reason;
}

AspirantResponseFirst.prototype.toNormal = function () {
  let obj = {};
  obj.status = this.status;
  obj.reason = this.reason;
  return obj;
}

const AspirantResponse = function (json) {
  this.date = new DateParse(json.date);
  this.long = json.long;
  this.outreason = json.outreason;
  this.manager = json.manager;
  this.first = new AspirantResponseFirst(json.first);
  this.portfolio = new AspirantResponsePortfolio(json.portfolio);
}

AspirantResponse.prototype.toNormal = function () {
  let obj = {};
  obj.date = this.date.toNormal();
  obj.long = this.long;
  obj.outreason = this.outreason;
  obj.manager = this.manager;
  obj.first = this.first.toNormal();
  obj.portfolio = this.portfolio.toNormal();
  return obj;
}

module.exports = AspirantResponse;
