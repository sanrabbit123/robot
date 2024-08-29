const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const PROJECT_DIR = process.cwd() + "/apps/backMaker/alive/aspirant";
const { DateParse } = require(GENERAL_DIR + "/generator.js");

const AspirantMeetingEightMatrixFactor = function (json) {
  this.date = new DateParse(json.date);
  this.priority = json.priority;
  this.name = json.name;
}

AspirantMeetingEightMatrixFactor.prototype.toNormal = function () {
  let obj = {};
  obj.date = this.date.toNormal();
  obj.priority = this.priority;
  obj.name = this.name;
  return obj;
}

class AspirantMeetingEightMatrix extends Array {
  constructor(json) {
    super();
    for (let i of json) {
      this.push(new AspirantMeetingEightMatrixFactor(i));
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

const AspirantMeetingCommon = function (json) {
  this.date = new DateParse(json.date);
  this.status = json.status;
  this.eight = new AspirantMeetingEightMatrix(json.eight);
}

AspirantMeetingCommon.prototype.toNormal = function () {
  let obj = {};
  obj.date = this.date.toNormal();
  obj.status = this.status;
  obj.eight = this.eight.toNormal();
  return obj;
}

const AspirantMeeting = function (json) {
  this.status = json.status;
  this.date = new DateParse(json.date);
  this.memo = json.memo;
  this.common = new AspirantMeetingCommon(json.common);
}

AspirantMeeting.prototype.toNormal = function () {
  let obj = {};
  obj.status = this.status;
  obj.date = this.date.toNormal();
  obj.memo = this.memo;
  obj.common = this.common.toNormal();
  return obj;
}

module.exports = AspirantMeeting;
