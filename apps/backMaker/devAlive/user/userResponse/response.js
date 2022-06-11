const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const USER_DIR = process.cwd() + "/apps/backMaker/alive/user";
const { DateParse, Menu, Address } = require(GENERAL_DIR + "/generator.js");

const CalculationInfo = function (json) {
  this.account = json.account;
  this.proof = json.proof;
  this.to = json.to;
}

CalculationInfo.prototype.toNormal = function () {
  let obj = {};
  obj.account = this.account;
  obj.proof = this.proof;
  obj.to = this.to;
  return obj;
}

const Calculation = function (json) {
  this.date = new DateParse(json.date);
  this.cancel = new DateParse(json.cancel);
  this.method = json.method;
  this.percentage = json.percentage;
  this.amount = json.amount;
  this.info = new CalculationInfo(json.info);
  this.refund = json.refund;
}

Calculation.prototype.toNormal = function () {
  let obj = {};
  obj.date = this.date.toNormal();
  obj.cancel = this.cancel.toNormal();
  obj.method = this.method;
  obj.percentage = this.percentage;
  obj.amount = this.amount;
  obj.info = this.info.toNormal();
  obj.refund = this.refund;
  return obj;
}

const ConsultingComments = function (json) {
  this.designer = json.designer;
  this.client = json.client;
  this.homeliaison = json.homeliaison;
}

ConsultingComments.prototype.toNormal = function () {
  let obj = {};
  obj.designer = this.designer;
  obj.client = this.client;
  obj.homeliaison = this.homeliaison;
  return obj;
}

const ConsultingFactor = function (json) {
  this.date = new DateParse(json.date);
  this.comments = new ConsultingComments(json.comments);
}

ConsultingFactor.prototype.toNormal = function () {
  let obj = {};
  obj.date = this.date.toNormal();
  obj.comments = this.comments.toNormal();
  return obj;
}

class Consulting extends Array {
  constructor(arr) {
    super();
    for (let obj of arr) {
      this.push(new ConsultingFactor(obj));
    }
  }
  toNormal() {
    let arr = [];
    for (let obj of this) {
      arr.push(obj.toNormal());
    }
    return arr;
  }
}

const DesignComments = function (json) {
  this.designer = json.designer;
  this.client = json.client;
  this.homeliaison = json.homeliaison;
}

DesignComments.prototype.toNormal = function () {
  let obj = {};
  obj.designer = this.designer;
  obj.client = this.client;
  obj.homeliaison = this.homeliaison;
  return obj;
}

const DesignConcept = function (json) {
  this.date = new DateParse(json.date);
  this.confirm = new DateParse(json.confirm);
  this.key = json.key;
  this.name = json.name;
  this.target = json.target;
  this.space = json.space;
  this.comments = new DesignComments(json.comments);
}

DesignConcept.prototype.toNormal = function () {
  let obj = {};
  obj.date = this.date.toNormal();
  obj.confirm = this.confirm.toNormal();
  obj.key = this.key;
  obj.name = this.name;
  obj.target = this.target;
  obj.space = this.space;
  obj.comments = this.comments.toNormal();
  return obj;
}

const DesignProposal = function (json) {
  this.date = new DateParse(json.date);
  this.confirm = new DateParse(json.confirm);
  this.key = json.key;
  this.name = json.name;
  this.target = json.target;
  this.space = json.space;
  this.comments = new DesignComments(json.comments);
}

DesignProposal.prototype.toNormal = function () {
  let obj = {};
  obj.date = this.date.toNormal();
  obj.confirm = this.confirm.toNormal();
  obj.key = this.key;
  obj.name = this.name;
  obj.target = this.target;
  obj.space = this.space;
  obj.comments = this.comments.toNormal();
  return obj;
}

const DesignPhoto = function (json) {
  this.date = new DateParse(json.date);
  this.confirm = new DateParse(json.confirm);
  this.key = json.key;
  this.name = json.name;
  this.target = json.target;
  this.space = json.space;
  this.comments = new DesignComments(json.comments);
}

DesignPhoto.prototype.toNormal = function () {
  let obj = {};
  obj.date = this.date.toNormal();
  obj.confirm = this.confirm.toNormal();
  obj.key = this.key;
  obj.name = this.name;
  obj.target = this.target;
  obj.space = this.space;
  obj.comments = this.comments.toNormal();
  return obj;
}

const PurchaseWhere = function (json) {
  this.name = json.name;
  this.link = json.link;
}

PurchaseWhere.prototype.toNormal = function () {
  let obj = {};
  obj.name = this.name;
  obj.link = this.link;
  return obj;
}

const PurchasePrice = function (json) {
  this.unit = json.unit;
  this.delivery = json.delivery;
}

PurchasePrice.prototype.toNormal = function () {
  let obj = {};
  obj.unit = this.unit;
  obj.delivery = this.delivery;
  return obj;
}

const DesignPurchaseDetail = function (json) {
  this.image = json.image;
  this.name = json.name;
  this.number = json.number;
  this.price = new PurchasePrice(json.price);
  this.detail = json.detail;
  this.where = new PurchaseWhere(json.where);
}

DesignPurchaseDetail.prototype.toNormal = function () {
  let obj = {};
  obj.image = this.image;
  obj.name = this.name;
  obj.number = this.number;
  obj.price = this.price.toNormal();
  obj.detail = this.detail;
  obj.where = this.where.toNormal();
  return obj;
}

class DesignPurchaseDetailList extends Array {
  constructor(arr) {
    super();
    for (let obj of arr) {
      this.push(new DesignPurchaseDetail(obj));
    }
  }
  toNormal() {
    let arr = [];
    for (let obj of this) {
      arr.push(obj.toNormal());
    }
    return arr;
  }
}

const DesignPurchase = function (json) {
  this.date = new DateParse(json.date);
  this.confirm = new DateParse(json.confirm);
  this.key = json.key;
  this.name = json.name;
  this.target = json.target;
  this.space = json.space;
  this.detail = new DesignPurchaseDetailList(json.detail);
  this.comments = new DesignComments(json.comments);
}

DesignPurchase.prototype.toNormal = function () {
  let obj = {};
  obj.date = this.date.toNormal();
  obj.confirm = this.confirm.toNormal();
  obj.key = this.key;
  obj.name = this.name;
  obj.target = this.target;
  obj.space = this.space;
  obj.detail = this.detail.toNormal();
  obj.comments = this.comments.toNormal();
  return obj;
}

class DesignConceptList extends Array {
  constructor(arr) {
    super();
    for (let obj of arr) {
      this.push(new DesignConcept(obj));
    }
  }
  toNormal() {
    let arr = [];
    for (let obj of this) {
      arr.push(obj.toNormal());
    }
    return arr;
  }
}
class DesignProposalList extends Array {
  constructor(arr) {
    super();
    for (let obj of arr) {
      this.push(new DesignProposal(obj));
    }
  }
  toNormal() {
    let arr = [];
    for (let obj of this) {
      arr.push(obj.toNormal());
    }
    return arr;
  }
}
class DesignPhotoList extends Array {
  constructor(arr) {
    super();
    for (let obj of arr) {
      this.push(new DesignPhoto(obj));
    }
  }
  toNormal() {
    let arr = [];
    for (let obj of this) {
      arr.push(obj.toNormal());
    }
    return arr;
  }
}
class DesignPurchaseList extends Array {
  constructor(arr) {
    super();
    for (let obj of arr) {
      this.push(new DesignPurchase(obj));
    }
  }
  toNormal() {
    let arr = [];
    for (let obj of this) {
      arr.push(obj.toNormal());
    }
    return arr;
  }
}

const DesignFactor = function (json) {
  this.concept = new DesignConceptList(json.concept);
  this.proposal = new DesignProposalList(json.proposal);
  this.photo = new DesignPhotoList(json.photo);
  this.list = new DesignPurchaseList(json.list);
}

DesignFactor.prototype.toNormal = function () {
  let obj = {};
  obj.concept = this.concept.toNormal();
  obj.proposal = this.proposal.toNormal();
  obj.photo = this.photo.toNormal();
  obj.list = this.list.toNormal();
  return obj;
}

class Design extends Array {
  constructor(arr) {
    super();
    for (let obj of arr) {
      this.push(new DesignFactor(obj));
    }
  }
  toNormal() {
    let arr = [];
    for (let obj of this) {
      arr.push(obj.toNormal());
    }
    return arr;
  }
}

const HistoryFactor = function (json) {
  this.send = new DateParse(json.send);
  this.read = new DateParse(json.read);
}

HistoryFactor.prototype.toNormal = function () {
  let obj = {};
  obj.send = this.send.toNormal();
  obj.read = this.read.toNormal();
  return obj;
}

class History extends Array {
  constructor(arr) {
    super();
    for (let obj of arr) {
      this.push(new HistoryFactor(obj));
    }
  }
  toNormal() {
    let arr = [];
    for (let obj of this) {
      arr.push(obj.toNormal());
    }
    return arr;
  }
}

//main ------------------------------------------------------------------------

const Response = function (json) {
  this.timeline = new DateParse(json.timeline);
  this.status = json.status;
  this.complete = Boolean(json.complete);
  this.alarm = Boolean(json.alarm);
  this.history = new History(json.history);
  this.design = new Design(json.design);
  this.consulting = new Consulting(json.consulting);
  this.calculation = new Calculation(json.calculation);
}

Response.prototype.toNormal = function () {
  let obj = {};
  obj.timeline = this.timeline.toNormal();
  obj.status = this.status;
  obj.complete = this.complete;
  obj.alarm = this.alarm;
  obj.history = this.history.toNormal();
  obj.design = this.design.toNormal();
  obj.consulting = this.consulting.toNormal();
  obj.calculation = this.calculation.toNormal();
  return obj;
}

module.exports = Response;
