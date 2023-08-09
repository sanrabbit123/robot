const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const PROJECT_DIR = process.cwd() + "/apps/backMaker/alive/aspirant";
const { DateParse } = require(GENERAL_DIR + "/generator.js");

const AspirantMeetingCommon = function (json) {
  this.date = new DateParse(json.date);
  this.status = json.status;
}

AspirantMeetingCommon.prototype.toNormal = function () {
  let obj = {};
  obj.date = this.date.toNormal();
  obj.status = this.status;
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
