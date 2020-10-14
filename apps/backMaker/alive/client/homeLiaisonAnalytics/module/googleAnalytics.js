class GoogleAnalytics {

  constructor(json) {
    this.timeline = Number(json.timeline);
    this.referrer = json.referrer;
    this.device = json.device;
    this.region = json.region;
    this.personalInfo = json.personalInfo;
    this.campaign = json.campaign;
    this.history = json.history;
  }

  toNormal() {
    let obj = {};
    obj.timeline = this.timeline;
    obj.referrer = this.referrer;
    obj.device = this.device;
    obj.region = this.region;
    obj.personalInfo = this.personalInfo;
    obj.campaign = this.campaign;
    obj.history = this.history;
    return obj;
  }

}

module.exports = GoogleAnalytics;
