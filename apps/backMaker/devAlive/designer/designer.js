const GENERAL_DIR = process.cwd() + "/apps/backMaker/devAlive/general";
const DESIGNER_DIR = process.cwd() + "/apps/backMaker/devAlive/designer";
const DesignerInformation = require(DESIGNER_DIR + "/designerInformation/designerInformation.js");
const HomeLiaisonAnalytics = require(DESIGNER_DIR + "/homeLiaisonAnalytics/homeLiaisonAnalytics.js");
const DesignerRealTime = require(DESIGNER_DIR + "/designerRealTime/designerRealTime.js");
const DesignerSetting = require(DESIGNER_DIR + "/designerSetting/designerSetting.js");

const Designer = function (json) {
  this.designer = json.designer;
  this.desid = json.desid;
  this.information = new DesignerInformation(json.information);
  this.analytics = new HomeLiaisonAnalytics(json.analytics);
  this.realTime = new DesignerRealTime(json.realTime);
  this.setting = new DesignerSetting(json.setting);
}

Designer.prototype.toNormal = function () {
  let obj = {};
  obj.designer = this.designer;
  obj.desid = this.desid;
  obj.information = this.information.toNormal();
  obj.analytics = this.analytics.toNormal();
  obj.realTime = this.realTime.toNormal();
  obj.setting = this.setting.toNormal();
  return obj;
}

module.exports = Designer;
