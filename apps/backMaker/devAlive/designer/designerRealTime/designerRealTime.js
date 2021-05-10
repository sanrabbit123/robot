const GENERAL_DIR = process.cwd() + "/apps/backMaker/devAlive/general";
const DESIGNER_DIR = process.cwd() + "/apps/backMaker/devAlive/designer";

const AvailableDate = function (json) {
  this.value = json;
}

AvailableDate.prototype.toNormal = function () {
  return this.value;
}

const DesignerRealTime = function (json) {
  this.availableDate = new AvailableDate(json.availableDate);
}

DesignerRealTime.prototype.toNormal = function () {
  let obj = {};
  obj.availableDate = this.availableDate.toNormal();
  return obj;
}

module.exports = DesignerRealTime;
