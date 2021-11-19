const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const BUILDER_DIR = process.cwd() + "/apps/backMaker/alive/builder";
const BuilderInformation = require(BUILDER_DIR + "/builderInformation/builderInformation.js");
const HomeLiaisonAnalytics = require(BUILDER_DIR + "/homeLiaisonAnalytics/homeLiaisonAnalytics.js");

const Builder = function (json) {
  this.builder = json.builder;
  this.buiid = json.buiid;
  this.information = new BuilderInformation(json.information);
  this.analytics = new HomeLiaisonAnalytics(json.analytics);
}

Builder.prototype.toNormal = function () {
  let obj = {};
  obj.builder = this.builder;
  obj.buiid = this.buiid;
  obj.information = this.information.toNormal();
  obj.analytics = this.analytics.toNormal();
  return obj;
}

module.exports = Builder;
