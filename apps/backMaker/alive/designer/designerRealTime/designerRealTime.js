const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const DESIGNER_DIR = process.cwd() + "/apps/backMaker/alive/designer";

const AvailableDate = function (json) {
  this.value = json;
}

const DesignerRealTime = function (json) {
  this.availableDate = new AvailableDate(json.availableDate);
}

module.exports = DesignerRealTime;
