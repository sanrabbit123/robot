const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const CLIENT_DIR = process.cwd() + "/apps/backMaker/alive/client";
const THIS_DIR = CLIENT_DIR + "/homeLiaisonAnalytics/module";
const MODULE_DIR = THIS_DIR + "/googleAnalytics";
const { DateParse } = require(GENERAL_DIR + "/generator.js");
const Referrer = require(MODULE_DIR + "/referrer.js");
const Device = require(MODULE_DIR + "/device.js");
const Region = require(MODULE_DIR + "/region.js");
const PersonalInfo = require(MODULE_DIR + "/personalInfo.js");
const History = require(MODULE_DIR + "/history.js");

class GoogleAnalytics {

  constructor(json) {
    this.timeline = new DateParse(json.timeline);
    this.referrer = new Referrer(json.referrer);
    this.device = new Device(json.device);
    this.region = new Region(json.region);
    this.personalInfo = new PersonalInfo(json.personalInfo);
    this.campaign = json.campaign;
    this.history = new History(json.history);
  }

  jsonUpdate(json) {
    this.timeline = null;
    this.referrer = null;
    this.device = null;
    this.region = null;
    this.personalInfo = null;
    this.campaign = null;
    this.history = null;

    this.timeline = new DateParse(json.timeline);
    this.referrer = new Referrer(json.referrer);
    this.device = new Device(json.device);
    this.region = new Region(json.region);
    this.personalInfo = new PersonalInfo(json.personalInfo);
    this.campaign = json.campaign;
    this.history = new History(json.history);
  }

  toNormal() {
    let obj = {};
    obj.timeline = this.timeline.toNormal();
    obj.referrer = this.referrer.toNormal();
    obj.device = this.device.toNormal();
    obj.region = this.region.toNormal();
    obj.personalInfo = this.personalInfo.toNormal();
    obj.campaign = this.campaign;
    obj.history = this.history.toNormal();
    return obj;
  }

}

module.exports = GoogleAnalytics;
