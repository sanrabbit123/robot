const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const PROJECT_DIR = process.cwd() + "/apps/backMaker/alive/project";
const { DateParse, Menu } = require(GENERAL_DIR + "/generator.js");

// calculation ----------------------------------------------------------------------------------

const PaymentsFirst = function (json) {
  this.amount = json.amount;
  this.date = new DateParse(json.date);
}

PaymentsFirst.prototype.toNormal = function () {
  let obj = {};
  obj.amount = this.amount;
  obj.date = this.date.toNormal();
  return obj;
}

const PaymentsRemain = function (json) {
  this.amount = json.amount;
  this.date = new DateParse(json.date);
}

PaymentsRemain.prototype.toNormal = function () {
  let obj = {};
  obj.amount = this.amount;
  obj.date = this.date.toNormal();
  return obj;
}

const Info = function (json) {
  this.account = json.account;
  this.proof = json.proof;
  this.to = json.to;
}

Info.prototype.toNormal = function () {
  let obj = {};
  obj.account = this.account;
  obj.proof = this.proof;
  obj.to = this.to;
  return obj;
}

const Payments = function (json) {
  this.totalAmount = json.totalAmount;
  this.first = new PaymentsFirst(json.first);
  this.remain = new PaymentsRemain(json.remain);
}

Payments.prototype.toNormal = function () {
  let obj = {};
  obj.totalAmount = this.totalAmount;
  obj.first = this.first.toNormal();
  obj.remain = this.remain.toNormal();
  return obj;
}

const Calculation = function (json) {
  this.method = json.method;
  this.percentage = json.percentage;
  this.info = new Info(json.info);
  this.payments = new Payments(json.payments);
}

Calculation.prototype.toNormal = function () {
  let obj = {};
  obj.method = this.method;
  obj.percentage = this.percentage;
  obj.info = this.info.toNormal();
  obj.payments = this.payments.toNormal();
  return obj;
}

// design ----------------------------------------------------------------------------------

// design proposal -------------------------------------------------------------------------

class DesignProposalDetails extends Array {
  toNormal() {
    let arr = [];
    for (let i of this) {
      arr.push(i.toNormal());
    }
    return arr;
  }
}

const DesignProposalDetail = function (json) {
  this.date = new DateParse(json.date);
}

DesignProposalDetail.prototype.toNormal = function () {
  let obj = {};
  obj.date = this.date.toNormal();
  return obj;
}

const DesignProposal = function (json) {
  let tempInstance;
  this.provided = json.provided;
  this.limit = json.limit;
  this.detail = new DesignProposalDetails();
  for (let i of json.detail) {
    tempInstance = new DesignProposalDetail(i);
    this.detail.push(tempInstance);
  }
}

DesignProposal.prototype.toNormal = function () {
  let obj = {};
  obj.provided = this.provided;
  obj.limit = this.limit;
  obj.detail = this.detail.toNormal();
  return obj;
}

// construct -------------------------------------------------------------------------


const ConstructDetailFormDate = function (json) {
  this.from = new DateParse(json.from);
  this.to = new DateParse(json.to);
}

ConstructDetailFormDate.prototype.toNormal = function () {
  let obj = {};
  obj.from = this.from.toNormal();
  obj.to = this.to.toNormal();
  return obj;
}

const ConstructDetailForm = function (json) {
  this.id = json.id;
  this.date = new ConstructDetailFormDate(json.date);
}

ConstructDetailForm.prototype.toNormal = function () {
  let obj = {};
  obj.id = this.id;
  obj.date = this.date.toNormal();
  return obj;
}

const ConstructDetailCalculationAmountDetail = function (json) {
  this.name = json.name;
  this.amount = json.amount;
}

ConstructDetailCalculationAmountDetail.prototype.toNormal = function () {
  let obj = {};
  obj.name = this.name;
  obj.amount = this.amount;
  return obj;
}

class ConstructDetailCalculationAmountDetails extends Array {
  constructor(json) {
    super();
    let tempInstance;
    for (let i of json) {
      tempInstance = new ConstructDetailCalculationAmountDetail(i);
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

const ConstructDetailCalculationAmount = function (json) {
  this.detail = new ConstructDetailCalculationAmountDetails(json.detail);
  this.total = json.total;
}

ConstructDetailCalculationAmount.prototype.toNormal = function () {
  let obj = {};
  obj.detail = this.detail.toNormal();
  obj.total = this.total;
  return obj;
}

const ConstructDetailCalculationInfo = function (json) {
  this.account = json.account;
  this.proof = json.proof;
  this.to = json.to;
}

ConstructDetailCalculationInfo.prototype.toNormal = function () {
  let obj = {};
  obj.account = this.account;
  obj.proof = this.proof;
  obj.to = this.to;
  return obj;
}

const ConstructDetailCalculation = function (json) {
  this.amount = new ConstructDetailCalculationAmount(json.amount);
  this.percentage = json.percentage;
  this.info = new ConstructDetailCalculationInfo(json.info);
}

ConstructDetailCalculation.prototype.toNormal = function () {
  let obj = {};
  obj.amount = this.amount.toNormal();
  obj.percentage = this.percentage;
  obj.info = this.info.toNormal();
  return obj;
}

class ConstructDetails extends Array {
  toNormal() {
    let arr = [];
    for (let i of this) {
      arr.push(i.toNormal());
    }
    return arr;
  }
}

const ConstructDetail = function (json) {
  this.name = json.name;
  this.provider = json.provider;
  this.form = new ConstructDetailForm(json.form);
  this.calculation = new ConstructDetailCalculation(json.calculation);
}

ConstructDetail.prototype.toNormal = function () {
  let obj = {};
  obj.name = this.name;
  obj.provider = this.provider;
  obj.form = this.form.toNormal();
  obj.calculation = this.calculation.toNormal();
  return obj;
}

const Construct = function (json) {
  let tempInstance;
  this.provided = json.provided;
  this.detail = new ConstructDetails();
  for (let i of json.detail) {
    tempInstance = new ConstructDetail(i);
    this.detail.push(tempInstance);
  }
}

Construct.prototype.toNormal = function () {
  let obj = {};
  obj.provided = this.provided;
  obj.detail = this.detail.toNormal();
  return obj;
}

// purchase -------------------------------------------------------------------------

const PurchaseDetailCalculation = function (json) {
  this.amount = json.amount;
}

PurchaseDetailCalculation.prototype.toNormal = function () {
  let obj = {};
  obj.amount = this.amount;
  return obj;
}

class PurchaseDetails extends Array {
  toNormal() {
    let arr = [];
    for (let i of this) {
      arr.push(i.toNormal());
    }
    return arr;
  }
}

const PurchaseDetail = function (json) {
  this.name = json.name;
  this.provider = json.provider;
  this.link = json.link;
  this.calculation = new PurchaseDetailCalculation(json.calculation);
}

PurchaseDetail.prototype.toNormal = function () {
  let obj = {};
  obj.name = this.name;
  obj.provider = this.provider;
  obj.link = this.link;
  obj.calculation = this.calculation.toNormal();
  return obj;
}

const Purchase = function (json) {
  let tempInstance;
  this.provided = json.provided;
  this.detail = new PurchaseDetails();
  for (let i of json.detail) {
    tempInstance = new PurchaseDetail(i);
    this.detail.push(tempInstance);
  }
}

Purchase.prototype.toNormal = function () {
  let obj = {};
  obj.provided = this.provided;
  obj.detail = this.detail.toNormal();
  return obj;
}

const Design = function (json) {
  this.proposal = new DesignProposal(json.proposal);
  this.construct = new Construct(json.construct);
  this.purchase = new Purchase(json.purchase);
}

Design.prototype.toNormal = function () {
  let obj = {};
  obj.proposal = this.proposal.toNormal();
  obj.construct = this.construct.toNormal();
  obj.purchase = this.purchase.toNormal();
  return obj;
}

// contract ----------------------------------------------------------------------------------

const FirstCalculationInfo = function (json) {
  this.method = json.method;
  this.proof = json.proof;
  this.to = json.to;
}

FirstCalculationInfo.prototype.toNormal = function () {
  let obj = {};
  obj.method = this.method;
  obj.proof = this.proof;
  obj.to = this.to;
  return obj;
}

const FirstCalculation = function (json) {
  this.amount = json.amount;
  this.info = new FirstCalculationInfo(json.info);
}

FirstCalculation.prototype.toNormal = function () {
  let obj = {};
  obj.amount = this.amount;
  obj.info = this.info.toNormal();
  return obj;
}

const RemainCalculationAmount = function (json) {
  this.supply = json.supply;
  this.vat = json.vat;
  this.consumer = json.consumer;
}

RemainCalculationAmount.prototype.toNormal = function () {
  let obj = {};
  obj.supply = this.supply;
  obj.vat = this.vat;
  obj.consumer = this.consumer;
  return obj;
}

const RemainCalculationInfo = function (json) {
  this.method = json.method;
  this.proof = json.proof;
  this.to = json.to;
}

RemainCalculationInfo.prototype.toNormal = function () {
  let obj = {};
  obj.method = this.method;
  obj.proof = this.proof;
  obj.to = this.to;
  return obj;
}

const RemainCalculation = function (json) {
  this.amount = new RemainCalculationAmount(json.amount);
  this.info = new RemainCalculationInfo(json.info);
}

RemainCalculation.prototype.toNormal = function () {
  let obj = {};
  obj.amount = this.amount.toNormal();
  obj.info = this.info.toNormal();
  return obj;
}

const FormDate = function (json) {
  this.from = new DateParse(json.from);
  this.to = new DateParse(json.to);
}

FormDate.prototype.toNormal = function () {
  let obj = {};
  obj.from = this.from.toNormal();
  obj.to = this.to.toNormal();
  return obj;
}

class PastDesigners extends Array {
  toNormal() {
    let arr = [];
    for (let i of this) {
      arr.push(i.toNormal());
    }
    return arr;
  }
}

const PastDesigner = function (json) {
  this.desid = json.desid;
}

PastDesigner.prototype.toNormal = function () {
  let obj = {};
  obj.desid = this.desid;
  return obj;
}

const First = function (json) {
  this.guide = new DateParse(json.guide);
  this.date = new DateParse(json.date);
  this.calculation = new FirstCalculation(json.calculation);
}

First.prototype.toNormal = function () {
  let obj = {};
  obj.guide = this.guide.toNormal();
  obj.date = this.date.toNormal();
  obj.calculation = this.calculation.toNormal();
  return obj;
}

const Remain = function (json) {
  this.guide = new DateParse(json.guide);
  this.date = new DateParse(json.date);
  this.calculation = new RemainCalculation(json.calculation);
}

Remain.prototype.toNormal = function () {
  let obj = {};
  obj.guide = this.guide.toNormal();
  obj.date = this.date.toNormal();
  obj.calculation = this.calculation.toNormal();
  return obj;
}

const Form = function (json) {
  this.id = json.id;
  this.guide = new DateParse(json.guide);
  this.date = new FormDate(json.date);
}

Form.prototype.toNormal = function () {
  let obj = {};
  obj.id = this.id;
  obj.guide = this.guide.toNormal();
  obj.date = this.date.toNormal();
  return obj;
}

const Meeting = function (json) {
  let tempInstance;
  this.date = new DateParse(json.date);
  this.pastDesigners = new PastDesigners();
  for (let i of json.pastDesigners) {
    tempInstance = new PastDesigner(i);
    this.pastDesigners.push(tempInstance);
  }
}

Meeting.prototype.toNormal = function () {
  let obj = {};
  obj.date = this.date.toNormal();
  obj.pastDesigners = this.pastDesigners.toNormal();
  return obj;
}

const Contract = function (json) {
  this.first = new First(json.first);
  this.remain = new Remain(json.remain);
  this.form = new Form(json.form);
  this.meeting = new Meeting(json.meeting);
}

Contract.prototype.toNormal = function () {
  let obj = {};
  obj.first = this.first.toNormal();
  obj.remain = this.remain.toNormal();
  obj.form = this.form.toNormal();
  obj.meeting = this.meeting.toNormal();
  return obj;
}

// main ----------------------------------------------------------------------------------

const ProjectProcess = function (json) {
  this.status = new Menu(json.status, [ '대기', '진행중', '완료', '홀딩', '드랍' ], false);
  this.contract = new Contract(json.contract);
  this.design = new Design(json.design);
  this.calculation = new Calculation(json.calculation);
}

ProjectProcess.prototype.toNormal = function () {
  let obj = {};
  obj.status = this.status.toNormal();
  obj.contract = this.contract.toNormal();
  obj.design = this.design.toNormal();
  obj.calculation = this.calculation.toNormal();
  return obj;
}

module.exports = ProjectProcess;
