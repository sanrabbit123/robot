const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const CLIENT_DIR = process.cwd() + "/apps/backMaker/alive/client";
const MODULE_DIR = CLIENT_DIR + "/homeLiaisonAnalytics/module";
const GoogleAnalytics = require(MODULE_DIR + "/googleAnalytics.js");
const Response = require(MODULE_DIR + "/response.js");
const DateAnalytics = require(MODULE_DIR + "/dateAnalytics.js");
const Picture = require(MODULE_DIR + "/picture.js");

class HomeLiaisonAnalytics {

  constructor(analytics) {
    this.rawAnalytics = analytics;
  }

  toAlive() {
    this.googleAnalytics = new GoogleAnalytics(this.rawAnalytics.googleAnalytics);
    this.response = new Response(this.rawAnalytics.response);
    this.date = new DateAnalytics(this.rawAnalytics.date);
    this.picture = new Picture(this.rawAnalytics.picture);
    delete this.rawAnalytics;
  }

  toNormal() {
    let obj = {};
    obj.googleAnalytics = this.googleAnalytics.toNormal();
    obj.response = this.response.toNormal();
    obj.date = this.date.toNormal();
    obj.picture = this.picture.toNormal();
    return obj;
  }

}

module.exports = HomeLiaisonAnalytics;
