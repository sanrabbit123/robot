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
    this.userType = json.userType;
    this.referrer = new Referrer(json.referrer);
    this.device = new Device(json.device);
    this.region = new Region(json.region);
    this.personalInfo = new PersonalInfo(json.personalInfo);
    this.campaign = json.campaign;
    this.history = new History(json.history);
  }

  jsonUpdate(json) {
    let tempArr0, tempArr1, tempArr2;
    if (typeof json.timeline === "string") {
      tempArr0 = json.timeline.split(" ");
      tempArr1 = tempArr0[0].split("-");
      tempArr2 = tempArr0[1].split(":");
      this.timeline = new DateParse(new Date(Number(tempArr1[0]), Number(tempArr1[1]) - 1, Number(tempArr1[2]), Number(tempArr2[0]), Number(tempArr2[1]), Number(tempArr2[2])));
    } else {
      this.timeline = new DateParse(json.timeline);
    }
    this.userType = json.userType;
    this.referrer = new Referrer(json.referrer);
    this.device = new Device(json.device);
    this.region = new Region(json.region);
    this.personalInfo = new PersonalInfo(json.personalInfo);
    this.campaign = json.campaign;
    this.history = new History(json.history);
  }

  get referrerString() {
    let temp = '';
    temp = this.referrer.name;
    if (this.referrer.host !== null) {
      temp += " (";
      temp += this.referrer.host + " ";
      for (let i in this.referrer.detail.queryString) {
        temp += this.referrer.detail.queryString[i] + " ";
      }
      temp = temp.slice(0, -1) + ")";
    }
    return temp;
  }

  get deviceString() {
    const { type, os, mobileDevice } = this.device.toNormal();
    let result = `${type} (${os})${(type === 'mobile') ? (' ' + mobileDevice) : ''}`;
    if (result === " ()") {
      return ``;
    } else {
      return result;
    }
  }

  get regionString() {
    const { country, city } = this.region.toNormal();
    let result = `${country} / ${city}`;
    if (result === " / ") {
      return ``;
    } else {
      return `${country} / ${city}`;
    }
  }

  get historyString() {
    let temp = '';
    let historyArr = this.history.toNormal();

    for (let { time, page, page_raw } of this.history) {
      temp += `${time.toString(true).slice(5)} : ${page}(${page_raw}) / `;
    }
    temp = temp.slice(0, -3);
    return temp;
  }

  toNormal() {
    let obj = {};
    obj.timeline = this.timeline.toNormal();
    obj.userType = this.userType;
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
