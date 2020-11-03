const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const PROJECT_DIR = process.cwd() + "/apps/backMaker/alive/project";
const { DateParse } = require(GENERAL_DIR + "/generator.js");

// calculation ----------------------------------------------------------------------------------

const Info = function (json) {

}

const Payments = function (json) {

}

const Calculation = function (json) {
  this.method = json.method;
  this.percentage = json.percentage;
  this.info = new Info(json.info);
  this.payments = new Payments(json.payments);
}

// design ----------------------------------------------------------------------------------

// design proposal -------------------------------------------------------------------------

class DesignProposalDetails extends Array {
  toNormal() {

  }
}

const DesignProposalDetail = function (json) {
  this.date = new DateParse(json.date);
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

// construct -------------------------------------------------------------------------











class ConstructDetails extends Array {
  toNormal() {

  }
}

const ConstructDetail = function (json) {
  this.name = json.name;
  this.provider = json.provider;
  this.form = new ConstructDetailForm(json.form);
  this.calculation = new ConstructDetailCalculation(json.calculation);
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


// purchase -------------------------------------------------------------------------











class PurchaseDetails extends Array {
  toNormal() {

  }
}

const PurchaseDetail = function (json) {
  this.date = new DateParse(json.date);
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

const Design = function (json) {
  this.proposal = new DesignProposal(json.proposal);
  this.construct = new Construct(json.construct);
  this.purchase = new Purchase(json.purchase);
}

// contract ----------------------------------------------------------------------------------

const FirstCalculationInfo = function (json) {
  this.method = json.method;
  this.proof = json.proof;
  this.to = json.to;
}

const FirstCalculation = function (json) {
  this.amount = json.amount;
  this.info = new FirstCalculationInfo(json.info);
}

const RemainCalculationAmount = function (json) {
  this.supply = json.supply;
  this.vat = json.vat;
  this.consumer = json.consumer;
}

const RemainCalculationInfo = function (json) {
  this.method = json.method;
  this.proof = json.proof;
  this.to = json.to;
}

const RemainCalculation = function (json) {
  this.amount = new RemainCalculationAmount(json.amount);
  this.info = new RemainCalculationInfo(json.info);
}

const FormDate = function (json) {
  this.from = new DateParse(json.from);
  this.to = new DateParse(json.to);
}

class PastDesigners extends Array {
  toNormal() {

  }
}

const PastDesigner = function (json) {
  this.desid = json.desid;
}

const First = function (json) {
  this.guide = new DateParse(json.guide);
  this.date = new DateParse(json.date);
  this.calculation = new FirstCalculation(json.calculation);
}

const Remain = function (json) {
  this.guide = new DateParse(json.guide);
  this.date = new DateParse(json.date);
  this.calculation = new RemainCalculation(json.calculation);
}

const Form = function (json) {
  this.id = json.id;
  this.guide = new DateParse(json.guide);
  this.date = new FormDate(json.date);
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

const Contract = function (json) {
  this.first = new First(json.first);
  this.remain = new Remain(json.remain);
  this.form = new Form(json.form);
  this.meeting = new Meeting(json.meeting);
}

// main ----------------------------------------------------------------------------------

const ProjectProcess = function (json) {
  this.status = json.status;
  this.contract = new Contract(json.contract);
  this.design = new Design(json.design);
  this.calculation = new Calculation(json.calculation);
}

ProjectProcess.prototype.toNormal = function () {
}

module.exports = ProjectProcess;
