const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const PROJECT_DIR = process.cwd() + "/apps/backMaker/alive/aspirant";
const { DateParse } = require(GENERAL_DIR + "/generator.js");

const AspirantCalendar = function (json) {
  this.mother = json.mother;
  this.id = json.id;
}

AspirantCalendar.prototype.toNormal = function () {
  let obj = {};
  obj.status = this.mother;
  obj.date = this.id;
  return obj;
}

module.exports = AspirantCalendar;
