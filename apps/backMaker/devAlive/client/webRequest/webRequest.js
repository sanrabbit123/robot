const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const CLIENT_DIR = process.cwd() + "/apps/backMaker/alive/client";
const MODULE_DIR = CLIENT_DIR + "/webRequest/module";
const { DateParse, Menu } = require(GENERAL_DIR + "/generator.js");
const Space = require(MODULE_DIR + "/space.js");
const Family = require(MODULE_DIR + "/family.js");

const WebRequest = function (request) {
  this.timeline = new DateParse(request.timeline);
  this.notionId = request.notionId;
  this.budget = new Menu(request.budget, [ '500만원 이하', '1,000만원', '1,500만원', '2,000만원', '2,500만원', '3,000만원', '3,500만원', '4,000만원', '4,500만원', '5,000만원 이상' ], false);
  this.family = new Family(request.family);
  this.space = new Space(request.space);
  this.etc = {};
  this.etc.comment = request.etc.comment;
  this.etc.channel = request.etc.channel;
}

WebRequest.prototype.toNormal = function () {
  let obj = {};
  obj.timeline = this.timeline.toNormal();
  obj.notionId = this.notionId;
  obj.budget = this.budget.toNormal();
  obj.family = this.family.toNormal();
  obj.space = this.space.toNormal();
  obj.etc = this.etc;
  return obj;
}

module.exports = WebRequest;
