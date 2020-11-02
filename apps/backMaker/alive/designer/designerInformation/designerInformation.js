const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const DESIGNER_DIR = process.cwd() + "/apps/backMaker/alive/designer";
const { DateParse, Address } = require(GENERAL_DIR + "/generator.js");

//contract ------------------------------------------------------------------------

const Contract = function (json) {
  this.status = json.status;
  this.date = new DateParse(json.date);
}

Contract.prototype.toNormal = function () {
  let obj = {};
  obj.status = this.status;
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

const Career = function (json) {
  this.startY = Number(json.startY);
  this.startM = Number(json.startM);
}

Career.prototype.toNormal = function () {
  let obj = {};
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
  this.classification = json.classification;
  this.businessNumber = json.businessNumber;
  this.files = new BusinessFiles(json.files);
}

BusinessInfo.prototype.toNormal = function () {
  let obj = {};
  obj.classification = this.classification;
  obj.businessNumber = this.businessNumber;
  obj.files = this.files.toNormal();
  return obj;
}

const Matrix = function (json) {
  this.pyeong = json.pyeong;
  this.availables = json.availables;
}

Matrix.prototype.toNormal = function () {
  let obj = {};
  obj.pyeong = this.pyeong;
  obj.availables = this.availables;
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

const Contruct = function (json) {
  this.partner = json.partner;
  this.method = json.method;
}

Contruct.prototype.toNormal = function () {
  let obj = {};
  obj.partner = this.partner;
  obj.method = this.method;
  return obj;
}

const Service = function (json) {
  this.cost = new Cost(json.cost);
  this.contruct = new Contruct(json.contruct);
}

Service.prototype.toNormal = function () {
  let obj = {};
  obj.cost = this.cost.toNormal();
  obj.contruct = this.contruct.toNormal();
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
  this.address = new Addresses();
  for (let i of json.address) {
    tempInstance = new Address(i);
    this.address.push(tempInstance);
  }
  this.personalSystem = new PersonalSystem(json.personalSystem);
  this.business = new Business(json.business);
}

DesignerInformation.prototype.toNormal = function () {
  let obj = {};
  obj.contract = this.contract.toNormal();
  obj.phone = this.phone;
  obj.email = this.email;
  obj.address = this.address.toNormal();
  obj.personalSystem = this.personalSystem.toNormal();
  obj.business = this.business.toNormal();
  return obj;
}

module.exports = DesignerInformation;
