const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const Designer_DIR = process.cwd() + "/apps/backMaker/alive/designer";
const DesignerInformation = require(Designer_DIR + "/designerInformation/designerInformation.js");
const HomeLiaisonAnalytics = require(Designer_DIR + "/homeLiaisonAnalytics/homeLiaisonAnalytics.js");
const DesignerRealTime = require(Designer_DIR + "/designerRealTime/designerRealTime.js");
const DesignerSetting = require(Designer_DIR + "/designerSetting/designerSetting.js");

const Designer = function (json) {
  this.designer = json.designer;
  this.desid = json.desid;
  this.information = new DesignerInformation(json.information);
  this.analytics = new HomeLiaisonAnalytics(json.analytics);
  this.realTime = new DesignerRealTime(json.realTime);
  this.setting = new DesignerSetting(json.setting);
}

module.exports = Designer;
