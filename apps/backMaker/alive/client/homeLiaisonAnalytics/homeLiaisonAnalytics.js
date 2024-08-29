const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const CLIENT_DIR = process.cwd() + "/apps/backMaker/alive/client";
const MODULE_DIR = CLIENT_DIR + "/homeLiaisonAnalytics/module";
const Response = require(MODULE_DIR + "/response.js");
const DateAnalytics = require(MODULE_DIR + "/dateAnalytics.js");
const Picture = require(MODULE_DIR + "/picture.js");
const Proposal = require(MODULE_DIR + "/proposal.js");

class Session extends Array {
  constructor(json) {
    super();
    for (let i of json) {
      this.push(i);
    }
  }
  toNormal() {
    let arr = [];
    for (let i of this) {
      arr.push(i);
    }
    return arr;
  }
}

const HomeLiaisonAnalytics = function (analytics) {
  this.response = new Response(analytics.response);
  this.date = new DateAnalytics(analytics.date);
  this.picture = new Picture(analytics.picture);
  this.proposal = new Proposal(analytics.proposal);
  this.session = new Session(analytics.session);
}

HomeLiaisonAnalytics.prototype.toNormal = function () {
  let obj = {};
  obj.response = this.response.toNormal();
  obj.date = this.date.toNormal();
  obj.picture = this.picture.toNormal();
  obj.proposal = this.proposal.toNormal();
  obj.session = this.session.toNormal();
  return obj;
}

module.exports = HomeLiaisonAnalytics;
