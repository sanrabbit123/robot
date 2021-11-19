const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const BUILDER_DIR = process.cwd() + "/apps/backMaker/alive/builder";
const { DateParse, Menu, Address } = require(GENERAL_DIR + "/generator.js");

const Contract = function (json) {
  this.status = new Menu(json.status, [ "협약 완료", "협약 휴직", "협약 해지", "신청 대기", "컨택중" ], false);
  this.date = new DateParse(json.date);
}

Contract.prototype.toNormal = function () {
  let obj = {};
  obj.status = this.status.toNormal();
  obj.date = this.date.toNormal();
  return obj;
}

class Addresses extends Array {
  toNormal() {
    let arr = [];
    for (let i of this) {
      arr.push(i.toNormal());
    }
    return arr;
  }
}

const Career = function (json) {
  this.relatedY = Number(json.relatedY);
  this.relatedM = Number(json.relatedM);
  this.startY = Number(json.startY);
  this.startM = Number(json.startM);
}

Career.prototype.toNormal = function () {
  let obj = {};
  obj.relatedY = Number(this.relatedY);
  obj.relatedM = Number(this.relatedM);
  obj.startY = Number(this.startY);
  obj.startM = Number(this.startM);
  return obj;
}

class Accounts extends Array {
  toNormal() {
    let arr = [];
    for (let i of this) {
      arr.push(i.toNormal());
    }
    return arr;
  }
}

const Account = function (json) {
  this.bankName = json.bankName;
  this.accountNumber = json.accountNumber;
  this.to = json.to;
}

Account.prototype.toNormal = function () {
  let obj = {};
  obj.bankName = this.bankName;
  obj.accountNumber = this.accountNumber;
  obj.to = this.to;
  return obj;
}

const BusinessInfo = function (json) {
  this.classification = new Menu(json.classification, [ "법인사업자(일반)", "법인사업자(간이)", "개인사업자(일반)", "개인사업자(간이)", "프리랜서" ], false);
  this.businessNumber = json.businessNumber;
}

BusinessInfo.prototype.toNormal = function () {
  let obj = {};
  obj.classification = this.classification.toNormal();
  obj.businessNumber = this.businessNumber;
  return obj;
}

class PercentageHistory extends Array {
  toNormal() {
    let arr = [];
    for (let i of this) {
      arr.push(i.toNormal());
    }
    return arr;
  }
}

const PastPercentage = function (json) {
  this.date = {
    start: new DateParse(json.date.start),
    end: new DateParse(json.date.end),
  };
  this.percentage = json.percentage;
}

PastPercentage.prototype.toNormal = function () {
  let obj = {};
  obj.date = {};
  obj.date.start = this.date.start.toNormal();
  obj.date.end = this.date.end.toNormal();
  obj.percentage = this.percentage;
  return obj;
}

const Cost = function (json) {
  this.percentage = json.percentage;
  this.percentageHistory = new PercentageHistory();
  for (let i of json.percentageHistory) {
    tempInstance = new PastPercentage(i);
    this.percentageHistory.push(tempInstance);
  }
}

Cost.prototype.toNormal = function () {
  let obj = {};
  obj.percentage = this.percentage;
  obj.percentageHistory = this.percentageHistory.toNormal();
  return obj;
}

const Designer = function (json) {
  this.partner = json.partner;
}

Designer.prototype.toNormal = function () {
  let obj = {};
  obj.partner = this.partner;
  return obj;
}

const Service = function (json) {
  this.cost = new Cost(json.cost);
  this.designer = new Designer(json.designer);
}

Service.prototype.toNormal = function () {
  let obj = {};
  obj.cost = this.cost.toNormal();
  obj.designer = this.designer.toNormal();
  return obj;
}

const Business = function (json) {
  let tempInstance;
  this.company = json.company;
  this.career = new Career(json.career);
  this.account = new Accounts();
  for (let i of json.account) {
    tempInstance = new Account(i);
    this.account.push(tempInstance);
  }
  this.businessInfo = new BusinessInfo(json.businessInfo);
  this.service = new Service(json.service);
}

Business.prototype.toNormal = function () {
  let obj = {};
  obj.company = this.company;
  obj.career = this.career.toNormal();
  obj.account = this.account.toNormal();
  obj.businessInfo = this.businessInfo.toNormal();
  obj.service = this.service.toNormal();
  return obj;
}

//main ------------------------------------------------------------------------

const BuilderInformation = function (json) {
  let tempInstance;
  this.contract = new Contract(json.contract);
  this.phone = json.phone;
  this.email = json.email;
  this.address = new Addresses();
  for (let i of json.address) {
    tempInstance = new Address(i);
    this.address.push(tempInstance);
  }
  this.business = new Business(json.business);
}

BuilderInformation.prototype.toNormal = function () {
  let obj = {};
  obj.contract = this.contract.toNormal();
  obj.phone = this.phone;
  obj.email = this.email;
  obj.address = this.address.toNormal();
  obj.business = this.business.toNormal();
  return obj;
}

module.exports = BuilderInformation;
