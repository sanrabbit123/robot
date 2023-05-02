const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const CLIENT_DIR = process.cwd() + "/apps/backMaker/alive/client";
const MODULE_DIR = CLIENT_DIR + "/homeLiaisonAnalytics/module";
const Response = require(MODULE_DIR + "/response.js");
const DateAnalytics = require(MODULE_DIR + "/dateAnalytics.js");
const Picture = require(MODULE_DIR + "/picture.js");
const Proposal = require(MODULE_DIR + "/proposal.js");

const HomeLiaisonAnalytics = function (analytics) {
  this.response = new Response(analytics.response);
  this.date = new DateAnalytics(analytics.date);
  this.picture = new Picture(analytics.picture);
  this.proposal = new Proposal(analytics.proposal);
}

HomeLiaisonAnalytics.prototype.toNormal = function () {
  let obj = {};
  obj.response = this.response.toNormal();
  obj.date = this.date.toNormal();
  obj.picture = this.picture.toNormal();
  obj.proposal = this.proposal.toNormal();
  return obj;
}

module.exports = HomeLiaisonAnalytics;
