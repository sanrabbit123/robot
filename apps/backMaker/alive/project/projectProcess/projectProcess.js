const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const PROJECT_DIR = process.cwd() + "/apps/backMaker/alive/project";
const { DateParse, Menu } = require(GENERAL_DIR + "/generator.js");

// calculation ----------------------------------------------------------------------------------

const PaymentsFirst = function (json) {
  this.amount = json.amount;
  this.date = new DateParse(json.date);
  this.cancel = new DateParse(json.cancel);
  this.refund = json.refund;
}

PaymentsFirst.prototype.toNormal = function () {
  let obj = {};
  obj.amount = this.amount;
  obj.date = this.date.toNormal();
  obj.cancel = this.cancel.toNormal();
  obj.refund = this.refund;
  return obj;
}

const PaymentsRemain = function (json) {
  this.amount = json.amount;
  this.date = new DateParse(json.date);
  this.cancel = new DateParse(json.cancel);
  this.refund = json.refund;
}

PaymentsRemain.prototype.toNormal = function () {
  let obj = {};
  obj.amount = this.amount;
  obj.date = this.date.toNormal();
  obj.cancel = this.cancel.toNormal();
  obj.refund = this.refund;
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
  this.method = new Menu(json.method, [ "사업자(일반)", "사업자(간이)", "프리랜서" ], false);
  this.percentage = json.percentage;
  this.info = new Info(json.info);
  this.payments = new Payments(json.payments);
}

Calculation.prototype.toNormal = function () {
  let obj = {};
  obj.method = this.method.toNormal();
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
  this.refund = json.refund;
}

FirstCalculation.prototype.toNormal = function () {
  let obj = {};
  obj.amount = this.amount;
  obj.info = this.info.toNormal();
  obj.refund = this.refund;
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
  this.refund = json.refund;
}

RemainCalculation.prototype.toNormal = function () {
  let obj = {};
  obj.amount = this.amount.toNormal();
  obj.info = this.info.toNormal();
  obj.refund = this.refund;
  return obj;
}

const FormDate = function (json) {
  this.from = new DateParse(json.from);
  this.to = new DateParse(json.to);
  this.cancel = new DateParse(json.cancel);
}

FormDate.prototype.toNormal = function () {
  let obj = {};
  obj.from = this.from.toNormal();
  obj.to = this.to.toNormal();
  obj.cancel = this.cancel.toNormal();
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
  this.cancel = new DateParse(json.cancel);
  this.calculation = new FirstCalculation(json.calculation);
}

First.prototype.toNormal = function () {
  let obj = {};
  obj.guide = this.guide.toNormal();
  obj.date = this.date.toNormal();
  obj.cancel = this.cancel.toNormal();
  obj.calculation = this.calculation.toNormal();
  return obj;
}

const Remain = function (json) {
  this.guide = new DateParse(json.guide);
  this.date = new DateParse(json.date);
  this.cancel = new DateParse(json.cancel);
  this.calculation = new RemainCalculation(json.calculation);
}

Remain.prototype.toNormal = function () {
  let obj = {};
  obj.guide = this.guide.toNormal();
  obj.date = this.date.toNormal();
  obj.cancel = this.cancel.toNormal();
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

const ProcessDetail = function (json) {
  this.name = json.name;
  this.date = new DateParse(json.date);
  this.calendar = new Calendar(json.calendar);
}

ProcessDetail.prototype.toNormal = function () {
  let obj = {};
  obj.name = this.name;
  obj.date = this.date.toNormal();
  obj.calendar = this.calendar.toNormal();
  return obj;
}

class ProcessDetails extends Array {
  constructor(json) {
    super();
    for (let i of json) {
      this.push(new ProcessDetail(i));
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

// main ----------------------------------------------------------------------------------

const ProjectProcess = function (json) {
  const actionList = [
    "응대 대기",
    "현장 미팅",
    "1차 제안",
    "수정 제안",
    "시공 진행",
    "제품 구매",
    "배송중",
    "촬영 컨택",
    "촬영 대기",
    "사진 대기",
    "사진 공유",
    "컨텐츠 공유",
    "응대 종료",
    "해당 없음"
  ];
  this.status = new Menu(json.status, [ '대기', '진행중', '완료', '홀딩', '드랍' ], false);
  this.action = new Menu(json.action, actionList, false);
  this.outreason = new Menu(json.outreason, [ '연결 안 됨', '가벼운 문의', '타사 계약', '비용 문제', '의견 조정 안 됨', '직접 진행' ], true);
  this.outspot = new Menu(json.outspot, actionList, false);
  this.detail = new ProcessDetails(json.detail);
  this.contract = new Contract(json.contract);
  this.design = new Design(json.design);
  this.calculation = new Calculation(json.calculation);
}

ProjectProcess.prototype.toNormal = function () {
  let obj = {};
  obj.status = this.status.toNormal();
  obj.action = this.action.toNormal();
  obj.outreason = this.outreason.toNormal();
  obj.outspot = this.outspot.toNormal();
  obj.detail = this.detail.toNormal();
  obj.contract = this.contract.toNormal();
  obj.design = this.design.toNormal();
  obj.calculation = this.calculation.toNormal();
  return obj;
}

module.exports = ProjectProcess;
