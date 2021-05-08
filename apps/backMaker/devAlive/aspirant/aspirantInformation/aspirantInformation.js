const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const PROJECT_DIR = process.cwd() + "/apps/backMaker/alive/aspirant";
const { DateParse } = require(GENERAL_DIR + "/generator.js");

const Company = function (json) {
  this.name = json.name;
  this.classification = json.classification;
  this.businessNumber = json.businessNumber;
  this.representative = json.representative;
  this.start = new DateParse(json.start);
}

Company.prototype.toNormal = function () {
  let obj = {};
  obj.name = this.name;
  obj.classification = this.classification;
  obj.businessNumber = this.businessNumber;
  obj.representative = this.representative;
  obj.start = this.start.toNormal();
  return obj;
}

const Account = function (json) {
  this.bank = json.bank;
  this.number = json.number;
  this.to = json.to;
  this.etc = json.etc;
}

Account.prototype.toNormal = function () {
  let obj = {};
  obj.bank = this.bank;
  obj.number = this.number;
  obj.to = this.to;
  obj.etc = this.etc;
  return obj;
}

const CareerYearMonth = function (json) {
  this.year = json.year;
  this.month = json.month;
}

CareerYearMonth.prototype.toNormal = function () {
  let obj = {};
  obj.year = this.year;
  obj.month = this.month;
  return obj;
};

const Career = function (json) {
  this.interior = new CareerYearMonth(json.interior);
  this.styling = new CareerYearMonth(json.styling);
  this.detail = json.detail;
}

Career.prototype.toNormal = function () {
  let obj = {};
  obj.interior = this.interior.toNormal();
  obj.styling = this.styling.toNormal();
  obj.detail = this.detail;
  return obj;
}

class LinkArray extends Array {
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

const Channel = function (json) {
  this.web = new LinkArray(json.web);
  this.sns = new LinkArray(json.sns);
  this.cloud = new LinkArray(json.cloud);
}

Channel.prototype.toNormal = function () {
  let obj = {};
  obj.web = this.web.toNormal();
  obj.sns = this.sns.toNormal();
  obj.cloud = this.cloud.toNormal();
  return obj;
}

const AspirantInformation = function (json) {
  this.company = new Company(json.company);
  this.account = new Account(json.account);
  this.career = new Career(json.career);
  this.channel = new Channel(json.channel);
}

AspirantInformation.prototype.toNormal = function () {
  let obj = {};
  obj.company = this.company.toNormal();
  obj.account = this.account.toNormal();
  obj.career = this.career.toNormal();
  obj.channel = this.channel.toNormal();
  return obj;
}

module.exports = AspirantInformation;
