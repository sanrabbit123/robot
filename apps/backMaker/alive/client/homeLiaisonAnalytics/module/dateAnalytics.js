const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const { DateParse } = require(GENERAL_DIR + "/generator.js");

const Calendar = function (json) {
  this.mother = json.mother;
  this.id = json.id;
}

Calendar.prototype.toNormal = function () {
  let obj = {};
  obj.mother = this.mother;
  obj.id = this.id;
  return obj;
}

const DateCalendar = function (json) {
  this.call = new Calendar(json.call);
  this.precheck = new Calendar(json.precheck);
  this.empty = new Calendar(json.empty);
  this.movein = new Calendar(json.movein);
}

DateCalendar.prototype.toNormal = function () {
  let obj = {};
  obj.call = this.call.toNormal();
  obj.precheck = this.precheck.toNormal();
  obj.empty = this.empty.toNormal();
  obj.movein = this.movein.toNormal();
  return obj;
}

const DateSpace = function (json) {
  this.precheck = new DateParse(json.precheck);
  this.empty = new DateParse(json.empty);
  this.movein = new DateParse(json.movein);
}

DateSpace.prototype.toNormal = function () {
  let obj = {};
  obj.precheck = this.precheck.toNormal();
  obj.empty = this.empty.toNormal();
  obj.movein = this.movein.toNormal();
  return obj;
}

const DateCallHistoryFactor = function (json) {
  this.date = new DateParse(json.date);
  this.who = json.who;
}

DateCallHistoryFactor.prototype.toNormal = function () {
  let obj = {};
  obj.date = this.date.toNormal();
  obj.who = this.who;
  return obj;
}

class DateCallHistory extends Array {
  constructor(json) {
    super();
    for (let i of json) {
      this.push(new DateCallHistoryFactor(i));
    }
  }
  toNormal() {
    let arr = [];
    for (let i of this) {
      arr.push(i.toNormal());
    }
    return arr;
  }
}

const DateCall = function (json) {
  this.next = new DateParse(json.next);
  this.history = new DateCallHistory(json.history);
  this.recommend = new DateParse(json.recommend);
}

DateCall.prototype.toNormal = function () {
  let obj = {};
  obj.next = this.next.toNormal();
  obj.history = this.history.toNormal();
  obj.recommend = this.recommend.toNormal();
  return obj;
}

const DateAnalytics = function (date) {
  this.call = new DateCall(date.call);
  this.space = new DateSpace(date.space);
  this.calendar = new DateCalendar(date.calendar);
}

DateAnalytics.prototype.toNormal = function () {
  let obj = {};
  obj.call = this.call.toNormal();
  obj.space = this.space.toNormal();
  obj.calendar = this.calendar.toNormal();
  return obj;
}

module.exports = DateAnalytics;
