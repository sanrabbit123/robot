const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const SERVICE_DIR = process.cwd() + "/apps/backMaker/alive/service";
const { DateParse } = require(GENERAL_DIR + "/generator.js");
const CoreSetting = require(SERVICE_DIR + "/serviceCore/serviceCore.js");
const ChecklistSetting = require(SERVICE_DIR + "/serviceChecklist/serviceChecklist.js");

const Service = function (json) {
  this.serid = json.serid;
  this.key = json.key;
  this.date = new DateParse(json.date);
  this.kind = json.kind;
  if (this.kind === "service") {
    this.setting = new CoreSetting(json.setting);
  } else if (this.kind === "checklist") {
    this.setting = new ChecklistSetting(json.setting);
  } else {
    throw new Error("invaild kind");
  }
}

Service.prototype.toNormal = function () {
  let obj = {};
  obj.serid = this.serid;
  obj.key = this.key;
  obj.date = this.date.toNormal();
  obj.kind = this.kind;
  obj.setting = this.setting.toNormal();
  return obj;
}

module.exports = Service;
