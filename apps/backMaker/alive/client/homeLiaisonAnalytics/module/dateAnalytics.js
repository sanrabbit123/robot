const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const { DateParse } = require(GENERAL_DIR + "/generator.js");

class CallHistory extends Array {

}

class DateSpace {

  constructor(space) {
    this.precheck = new DateParse(space.precheck);
    this.empty = new DateParse(space.empty);
    this.movein = new DateParse(space.movein);
  }

  toNormal() {
    let obj = {};
    obj.precheck = this.precheck.toNormal();
    obj.empty = this.empty.toNormal();
    obj.movein = this.movein.toNormal();
    return obj;
  }

}

class DateAnalytics {

  constructor(date) {
    this.callHistory = new CallHistory();
    for (let i of date.callHistory) {
      this.callHistory.push(new DateParse(i));
    }
    this.space = new DateSpace(date.space);
  }

  toNormal() {
    let obj = {};
    obj.callHistory = [];
    for (let i of this.callHistory) {
      obj.callHistory.push(i.toNormal());
    }
    obj.space = this.space.toNormal();
    return obj;
  }

}

module.exports = DateAnalytics;
