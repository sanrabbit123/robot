const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const CLIENT_DIR = process.cwd() + "/apps/backMaker/alive/client";
const MODULE_DIR = CLIENT_DIR + "/webRequest/module";
const { DateParse, Menu } = require(GENERAL_DIR + "/generator.js");
const Space = require(MODULE_DIR + "/space.js");
const Family = require(MODULE_DIR + "/family.js");

class WebRequest {

  constructor(request) {
    this.rawRequest = request;
  }

  toAlive() {
    let tempInstance;

    this.timeline = new DateParse(this.rawRequest.timeline);
    this.notionId = this.rawRequest.notionId;
    this.budget = new Menu(this.rawRequest.budget, [ '500만원 이하', '1,000만원', '1,500만원', '2,000만원', '2,500만원', '3,000만원', '3,500만원', '4,000만원', '4,500만원', '5,000만원 이상' ], false);
    this.family = new Family(this.rawRequest.family);

    tempInstance = new Space(this.rawRequest.space);
    tempInstance.toAlive();
    this.space = tempInstance;

    this.etc = {};
    this.etc.comment = this.rawRequest.etc.comment;
    this.etc.channel = this.rawRequest.etc.channel;
    delete this.rawRequest;
  }

  toNormal() {
    let obj = {};
    obj.timeline = this.timeline.toNormal(true);
    obj.notionId = this.notionId;
    obj.budget = this.budget.toNormal();
    obj.family = this.family.toNormal();
    obj.space = this.space.toNormal();
    obj.etc = this.etc;
    return obj;
  }

}

module.exports = WebRequest;
