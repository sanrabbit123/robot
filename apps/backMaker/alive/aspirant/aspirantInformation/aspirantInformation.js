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

const SchoolDetailFactorDate = function (json) {
  this.start = new DateParse(json.start);
  this.end = new DateParse(json.end);
}

SchoolDetailFactorDate.prototype.toNormal = function () {
  let obj = {};
  obj.start = this.start.toNormal();
  obj.end = this.end.toNormal();
  return obj;
}

const SchoolDetailFactor = function (json) {
  this.school = json.school;
  this.major = json.major;
  this.date = new SchoolDetailFactorDate(json.date);
}

SchoolDetailFactor.prototype.toNormal = function () {
  let obj = {};
  obj.school = this.school;
  obj.major = this.major;
  obj.date = this.date.toNormal();
  return obj;
}

class SchoolDetail extends Array {
  constructor(json) {
    super();
    let tempInstance;
    for (let i of json) {
      tempInstance = new SchoolDetailFactor(i);
      this.push(tempInstance);
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

const CareerDetailFactorDate = function (json) {
  this.start = new DateParse(json.start);
  this.end = new DateParse(json.end);
}

CareerDetailFactorDate.prototype.toNormal = function () {
  let obj = {};
  obj.start = this.start.toNormal();
  obj.end = this.end.toNormal();
  return obj;
}

const CareerDetailFactor = function (json) {
  this.company = json.company;
  this.team = json.team;
  this.role = json.role;
  this.tag = json.tag;
  this.date = new CareerDetailFactorDate(json.date);
}

CareerDetailFactor.prototype.toNormal = function () {
  let obj = {};
  obj.company = this.company;
  obj.team = this.team;
  obj.role = this.role;
  obj.tag = this.tag;
  obj.date = this.date.toNormal();
  return obj;
}

class CareerDetail extends Array {
  constructor(json) {
    super();
    let tempInstance;
    for (let i of json) {
      tempInstance = new CareerDetailFactor(i);
      this.push(tempInstance);
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
  this.detail = new CareerDetail(json.detail);
  this.school = new SchoolDetail(json.school);
  this.about = json.about;
}

Career.prototype.toNormal = function () {
  let obj = {};
  obj.interior = this.interior.toNormal();
  obj.styling = this.styling.toNormal();
  obj.detail = this.detail.toNormal();
  obj.school = this.school.toNormal();
  obj.about = this.about;
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
