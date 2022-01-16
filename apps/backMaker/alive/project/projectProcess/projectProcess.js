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

const ConstructContractAfterHistoryFactor = function (json) {
  this.from = new DateParse(json.from);
  this.to = new DateParse(json.to);
  this.amount = json.amount;
}

ConstructContractAfterHistoryFactor.prototype.toNormal = function () {
  let obj = {};
  obj.from = this.from.toNormal();
  obj.to = this.to.toNormal();
  obj.amount = this.amount;
  return obj;
}

class ConstructContractAfterHistory extends Array {
  constructor(arr) {
    super();
    for (let i of arr) {
      this.push(new ConstructContractAfterHistoryFactor(i));
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

const ConstructContractAfter = function (json) {
  this.expired = new DateParse(json.expired);
  this.history = new ConstructContractAfterHistory(json.history);
}

ConstructContractAfter.prototype.toNormal = function () {
  let obj = {};
  obj.expired = this.expired.toNormal();
  obj.history = this.history.toNormal();
  return obj;
}

const ConstructContractPaymentCalculationInfo = function (json) {
  this.method = json.method;
  this.proof = json.proof;
  this.to = json.to;
}

ConstructContractPaymentCalculationInfo.prototype.toNormal = function () {
  let obj = {};
  obj.method = this.method;
  obj.proof = this.proof;
  obj.to = this.to;
  return obj;
}

const ConstructContractPaymentCalculationAmount = function (json) {
  this.supply = json.supply;
  this.vat = json.vat;
  this.consumer = json.consumer;
}

ConstructContractPaymentCalculationAmount.prototype.toNormal = function () {
  let obj = {};
  obj.supply = this.supply;
  obj.vat = this.vat;
  obj.consumer = this.consumer;
  return obj;
}

const ConstructContractPaymentCalculation = function (json) {
  this.amount = new ConstructContractPaymentCalculationAmount(json.amount);
  this.info = new ConstructContractPaymentCalculationInfo(json.info);
  this.refund = json.refund;
}

ConstructContractPaymentCalculation.prototype.toNormal = function () {
  let obj = {};
  obj.amount = this.amount.toNormal();
  obj.info = this.info.toNormal();
  obj.refund = this.refund;
  return obj;
}

const ConstructContractPayment = function (json) {
  this.guide = new DateParse(json.guide);
  this.date = new DateParse(json.date);
  this.cancel = new DateParse(json.cancel);
  this.calculation = new ConstructContractPaymentCalculation(json.calculation);
}

ConstructContractPayment.prototype.toNormal = function () {
  let obj = {};
  obj.guide = this.guide.toNormal();
  obj.date = this.date.toNormal();
  obj.cancel = this.cancel.toNormal();
  obj.calculation = this.calculation.toNormal();
  return obj;
}

const ConstructContractPayments = function (json) {
  if (json.first !== null) {
    this.first = new ConstructContractPayment(json.first);
  } else {
    this.first = null;
  }
  if (json.start !== null) {
    this.start = new ConstructContractPayment(json.start);
  } else {
    this.start = null;
  }
  if (json.middle !== null) {
    this.middle = new ConstructContractPayment(json.middle);
  } else {
    this.middle = null;
  }
  if (json.remain !== null) {
    this.remain = new ConstructContractPayment(json.remain);
  } else {
    this.remain = null;
  }
}

ConstructContractPayments.prototype.toNormal = function () {
  let obj = {};
  if (this.first === null) {
    obj.first = null;
  } else {
    obj.first = this.first.toNormal();
  }
  if (this.start === null) {
    obj.start = null;
  } else {
    obj.start = this.start.toNormal();
  }
  if (this.middle === null) {
    obj.middle = null;
  } else {
    obj.middle = this.middle.toNormal();
  }
  if (this.remain === null) {
    obj.remain = null;
  } else {
    obj.remain = this.remain.toNormal();
  }
  return obj;
}

const ConstructContractFormDate = function (json) {
  this.from = new DateParse(json.from);
  this.to = new DateParse(json.to);
  this.cancel = new DateParse(json.cancel);
}

ConstructContractFormDate.prototype.toNormal = function () {
  let obj = {};
  obj.from = this.from.toNormal();
  obj.to = this.to.toNormal();
  obj.cancel = this.cancel.toNormal();
  return obj;
}

const ConstructContractForm = function (json) {
  this.id = json.id;
  this.guide = new DateParse(json.guide);
  this.date = new ConstructContractFormDate(json.date);
}

ConstructContractForm.prototype.toNormal = function () {
  let obj = {};
  obj.id = this.id;
  obj.guide = this.guide.toNormal();
  obj.date = this.date.toNormal();
  return obj;
}

const ConstructContract = function (json) {
  this.partner = json.partner;
  this.form = new ConstructContractForm(json.form);
  this.payments = new ConstructContractPayments(json.payments);
  this.after = new ConstructContractAfter(json.after);
}

ConstructContract.prototype.toNormal = function () {
  let obj = {};
  obj.partner = this.partner;
  obj.form = this.form.toNormal();
  obj.payments = this.payments.toNormal();
  obj.after = this.after.toNormal();
  return obj;
}

const ConstructEstimateDocument = function (json) {
  this.invid = json.invid;
  this.date = new DateParse(json.date);
}

ConstructEstimateDocument.prototype.toNormal = function () {
  let obj = {};
  obj.invid = this.invid;
  obj.date = this.date.toNormal();
  return obj;
}

class ConstructEstimate extends Array {
  constructor(arr) {
    super();
    for (let i of arr) {
      this.push(new ConstructEstimateDocument(i));
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

const ConstructDetail = function (json) {
  this.status = json.status;
  this.request = new DateParse(json.request);
  this.estimate = new ConstructEstimate(json.estimate);
  this.contract = new ConstructContract(json.contract);
}

ConstructDetail.prototype.toNormal = function () {
  let obj = {};
  obj.status = this.status;
  obj.request = this.request.toNormal();
  obj.estimate = this.estimate.toNormal();
  obj.contract = this.contract.toNormal();
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

// design -------------------------------------------------------------------------

const Design = function (json) {
  this.proposal = new DesignProposal(json.proposal);
  if (json.construct !== null) {
    this.construct = new ConstructDetail(json.construct);
  } else {
    this.construct = null;
  }
  this.purchase = new Purchase(json.purchase);
}

Design.prototype.toNormal = function () {
  let obj = {};
  obj.proposal = this.proposal.toNormal();
  if (this.construct === null) {
    obj.construct = null;
  } else {
    obj.construct = this.construct.toNormal();
  }
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
  this.date = new DateParse(json.date);
}

PastDesigner.prototype.toNormal = function () {
  let obj = {};
  obj.desid = this.desid;
  obj.date = this.date.toNormal();
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

const ProcessCallHistoryFactor = function (json) {
  this.date = new DateParse(json.date);
  this.who = json.who;
}

ProcessCallHistoryFactor.prototype.toNormal = function () {
  let obj = {};
  obj.date = this.date.toNormal();
  obj.who = this.who;
  return obj;
}

class ProcessCallHistory extends Array {
  constructor(json) {
    super();
    for (let i of json) {
      this.push(new ProcessCallHistoryFactor(i));
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

const ProcessCall = function (json) {
  this.next = new DateParse(json.next);
  this.history = new ProcessCallHistory(json.history);
}

ProcessCall.prototype.toNormal = function () {
  let obj = {};
  obj.next = this.next.toNormal();
  obj.history = this.history.toNormal();
  return obj;
}

// main ----------------------------------------------------------------------------------

const ProjectProcess = function (json) {
  this.status = new Menu(json.status, [
    "대기",
    "진행중",
    "완료",
    "홀딩",
    "드랍"
  ], false);
  this.action = new Menu(json.action, [
    "계약금 안내",
    "현장미팅 조율",
    "현장미팅 확정",
    "의뢰서 공유",
    "현장미팅 피드백",
    "잔금 안내",
    "시작 대기",
    "1차 제안",
    "수정 제안",
    "시공 진행",
    "제품 구매",
    "추가 제안",
    "배송중",
    "세팅 마무리",
    "촬영 컨택",
    "사진 업로드",
    "디자이너글 업로드",
    "증빙 처리",
    "정산 대기",
    "프로젝트 완료",
    "해당 없음"
  ], false);
  this.outreason = new Menu(json.outreason, [
    "연결 안 됨",
    "가벼운 문의",
    "타사 계약",
    "비용 문제",
    "의견 조정 안 됨",
    "직접 진행",
  ], true);
  this.detail = new ProcessDetails(json.detail);
  this.call = new ProcessCall(json.call);
  this.contract = new Contract(json.contract);
  this.design = new Design(json.design);
  this.calculation = new Calculation(json.calculation);
}

ProjectProcess.prototype.toNormal = function () {
  let obj = {};
  obj.status = this.status.toNormal();
  obj.action = this.action.toNormal();
  obj.outreason = this.outreason.toNormal();
  obj.detail = this.detail.toNormal();
  obj.call = this.call.toNormal();
  obj.contract = this.contract.toNormal();
  obj.design = this.design.toNormal();
  obj.calculation = this.calculation.toNormal();
  return obj;
}

module.exports = ProjectProcess;
