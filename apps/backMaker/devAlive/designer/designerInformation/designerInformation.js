const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const DESIGNER_DIR = process.cwd() + "/apps/backMaker/alive/designer";
const { DateParse, Menu, Address } = require(GENERAL_DIR + "/generator.js");

//contract ------------------------------------------------------------------------

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

//personal system -----------------------------------------------------------------

class Addresses extends Array {
  toNormal() {
    let arr = [];
    for (let i of this) {
      arr.push(i.toNormal());
    }
    return arr;
  }
}

class WebPages extends Array {
  toNormal() {
    let arr = [];
    for (let i of this) {
      arr.push(i.toNormal());
    }
    return arr;
  }
}

const WebPage = function (json) {
  this.value = json;
}

WebPage.prototype.toNormal = function () {
  return this.value;
}

class Snses extends Array {
  toNormal() {
    let arr = [];
    for (let i of this) {
      arr.push(i.toNormal());
    }
    return arr;
  }
}

const Sns = function (json) {
  this.kind = json.kind;
  this.href = json.href;
}

Sns.prototype.toNormal = function () {
  let obj = {};
  obj.kind = this.kind;
  obj.href = this.href;
  return obj;
}

const PersonalSystem = function (json) {
  let tempInstance;
  this.showRoom = json.showRoom;
  this.webPage = new WebPages();
  for (let i of json.webPage) {
    tempInstance = new WebPage(i);
    this.webPage.push(tempInstance);
  }
  this.sns = new Snses();
  for (let i of json.sns) {
    tempInstance = new Sns(i);
    this.sns.push(tempInstance);
  }
}

PersonalSystem.prototype.toNormal = function () {
  let obj = {};
  obj.showRoom = this.showRoom;
  obj.webPage = this.webPage.toNormal();
  obj.sns = this.sns.toNormal();
  return obj;
}

//business --------------------------------------------------------------------

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

const Career = function (json) {
  this.relatedY = Number(json.relatedY);
  this.relatedM = Number(json.relatedM);
  this.startY = Number(json.startY);
  this.startM = Number(json.startM);
  this.detail = new CareerDetail(json.detail);
  this.school = new SchoolDetail(json.school);
}

Career.prototype.toNormal = function () {
  let obj = {};
  obj.relatedY = Number(this.relatedY);
  obj.relatedM = Number(this.relatedM);
  obj.startY = Number(this.startY);
  obj.startM = Number(this.startM);
  obj.detail = this.detail.toNormal();
  obj.school = this.school.toNormal();
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

const BusinessFiles = function (json) {
  this.businessRegistration = json.businessRegistration;
  this.bankBook = json.bankBook;
  this.registrationCard = json.registrationCard;
}

BusinessFiles.prototype.toNormal = function () {
  let obj = {};
  obj.businessRegistration = this.businessRegistration;
  obj.bankBook = this.bankBook;
  obj.registrationCard = this.registrationCard;
  return obj;
}

const BusinessInfo = function (json) {
  this.classification = new Menu(json.classification, [ "법인사업자(일반)", "법인사업자(간이)", "개인사업자(일반)", "개인사업자(간이)", "프리랜서" ], false);
  this.businessNumber = json.businessNumber;
  this.files = new BusinessFiles(json.files);
}

BusinessInfo.prototype.toNormal = function () {
  let obj = {};
  obj.classification = this.classification.toNormal();
  obj.businessNumber = this.businessNumber;
  obj.files = this.files.toNormal();
  return obj;
}

const ServiceMatrixFactor = function (json) {
  this.serid = json.serid;
  this.case = json.case;
}

ServiceMatrixFactor.prototype.toNormal = function () {
  let obj = {};
  obj.serid = this.serid;
  obj.case = this.case;
  return obj;
}

class ServiceMatrix extends Array {

  constructor(json) {
    super();
    let tempInstance;
    for (let i of json) {
      tempInstance = new ServiceMatrixFactor(i);
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

const Matrix = function (json) {
  this.service = new ServiceMatrix(json.service);
  this.online = json.online;
}

Matrix.prototype.toNormal = function () {
  let obj = {};
  obj.service = this.service.toNormal();
  obj.online = this.online;
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
  this.matrix = new Matrix(json.matrix);
  this.percentage = json.percentage;
  this.percentageHistory = new PercentageHistory();
  for (let i of json.percentageHistory) {
    tempInstance = new PastPercentage(i);
    this.percentageHistory.push(tempInstance);
  }
}

Cost.prototype.toNormal = function () {
  let obj = {};
  obj.matrix = this.matrix.toNormal();
  obj.percentage = this.percentage;
  obj.percentageHistory = this.percentageHistory.toNormal();
  return obj;
}

const Construct = function (json) {
  this.partner = json.partner;
  this.method = json.method;
}

Construct.prototype.toNormal = function () {
  let obj = {};
  obj.partner = this.partner;
  obj.method = this.method;
  return obj;
}

const Service = function (json) {
  this.cost = new Cost(json.cost);
  this.construct = new Construct(json.construct);
}

Service.prototype.toNormal = function () {
  let obj = {};
  obj.cost = this.cost.toNormal();
  obj.construct = this.construct.toNormal();
  return obj;
}

const Business = function (json) {
  let tempInstance;
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
  obj.career = this.career.toNormal();
  obj.account = this.account.toNormal();
  obj.businessInfo = this.businessInfo.toNormal();
  obj.service = this.service.toNormal();
  return obj;
}

//main ------------------------------------------------------------------------

const DesignerInformation = function (json) {
  let tempInstance;
  this.contract = new Contract(json.contract);
  this.phone = json.phone;
  this.email = json.email;
  this.birth = new DateParse(json.birth);
  this.marry = json.marry;
  this.child = new Menu(json.child, [ "미취학", "어린이", "청소년", "성인" ], true);
  this.cat = json.cat;
  this.dog = json.dog;
  this.did = json.did;
  this.address = new Addresses();
  for (let i of json.address) {
    tempInstance = new Address(i);
    this.address.push(tempInstance);
  }
  this.residentNunber = json.residentNunber;
  this.personalSystem = new PersonalSystem(json.personalSystem);
  this.business = new Business(json.business);
}

DesignerInformation.prototype.toNormal = function () {
  let obj = {};
  obj.contract = this.contract.toNormal();
  obj.phone = this.phone;
  obj.email = this.email;
  obj.birth = this.birth.toNormal();
  obj.marry = this.marry;
  obj.child = this.child.toNormal();
  obj.cat = this.cat;
  obj.dog = this.dog;
  obj.did = this.did;
  obj.address = this.address.toNormal();
  obj.residentNunber = this.residentNunber;
  obj.personalSystem = this.personalSystem.toNormal();
  obj.business = this.business.toNormal();
  return obj;
}

module.exports = DesignerInformation;
