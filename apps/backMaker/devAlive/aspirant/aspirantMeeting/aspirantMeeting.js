const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const PROJECT_DIR = process.cwd() + "/apps/backMaker/alive/aspirant";
const { DateParse } = require(GENERAL_DIR + "/generator.js");

const AspirantMeeting = function (json) {
  this.status = json.status;
  this.date = new DateParse(json.date);
}

AspirantMeeting.prototype.toNormal = function () {
  let obj = {};
  obj.status = this.status;
  obj.date = this.date.toNormal();
  return obj;
}

module.exports = AspirantMeeting;
