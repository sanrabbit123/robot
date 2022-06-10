const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const USER_DIR = process.cwd() + "/apps/backMaker/alive/user";
const { DateParse, Menu, Address } = require(GENERAL_DIR + "/generator.js");

class PaymentInfoData extends Array {
  constructor(arr) {
    super();
    for (let obj of arr) {
      if (typeof obj === "object") {
        try {
          this.push(JSON.parse(JSON.stringify(obj)));
        } catch (e) {
          this.push(obj);
        }
      } else {
        this.push(obj);
      }
    }
  }
  toNormal() {
    let arr = [];
    for (let obj of this) {
      if (typeof obj === "object") {
        try {
          arr.push(JSON.parse(JSON.stringify(obj)));
        } catch (e) {
          arr.push(obj);
        }
      } else {
        arr.push(obj);
      }
    }
    return arr;
  }
}

const PaymentInfo = function (json) {
  this.method = json.method;
  this.proof = json.proof;
  this.to = json.to;
  this.data = new PaymentInfoData(json.data);
}

PaymentInfo.prototype.toNormal = function () {
  let obj = {};
  obj.method = this.method;
  obj.proof = this.proof;
  obj.to = this.to;
  obj.data = this.data.toNormal();
  return obj;
}

const PaymentAmount = function (json) {
  this.supply = json.supply;
  this.vat = json.vat;
  this.consumer = json.consumer;
}

PaymentAmount.prototype.toNormal = function () {
  let obj = {};
  obj.supply = this.supply;
  obj.vat = this.vat;
  obj.consumer = this.consumer;
  return obj;
}

const Payment = function (json) {
  this.date = new DateParse(json.date);
  this.cancel = new DateParse(json.cancel);
  this.oid = json.oid;
  this.amount = new PaymentAmount(json.amount);
  this.info = new PaymentInfo(json.info);
  this.refund = json.refund;
}

Payment.prototype.toNormal = function () {
  let obj = {};
  obj.date = this.date.toNormal();
  obj.cancel = this.cancel.toNormal();
  obj.oid = this.oid;
  obj.amount = this.amount.toNormal();
  obj.info = this.info.toNormal();
  obj.refund = this.refund;
  return obj;
}

const PhotoFactor = function (json) {
  this.date = new DateParse(json.date);
  this.method = json.method;
  this.key = json.key;
  this.target = json.target;
}

PhotoFactor.prototype.toNormal = function () {
  let obj = {};
  obj.date = this.date.toNormal();
  obj.method = this.method;
  obj.key = this.key;
  obj.target = this.target;
  return obj;
}

class Photo extends Array {
  constructor(arr) {
    super();
    for (let obj of arr) {
      this.push(new PhotoFactor(obj));
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

const Comments = function (json) {
  this.init = json.init;
  this.style = json.style;
  this.budget = json.budget;
  this.size = json.size;
  this.etc = json.etc;
}

Comments.prototype.toNormal = function () {
  let obj = {};
  obj.init = this.init;
  obj.style = this.style;
  obj.budget = this.budget;
  obj.size = this.size;
  obj.etc = this.etc;
  return obj;
}

const Space = function (json) {
  this.address = json.address;
  this.targets = json.targets;
}

Space.prototype.toNormal = function () {
  let obj = {};
  obj.address = this.address;
  obj.targets = this.targets;
  return obj;
}

//main ------------------------------------------------------------------------

const Request = function (json) {
  this.timeline = new DateParse(json.timeline);
  this.status = json.status;
  this.complete = Boolean(json.complete);
  this.alarm = Boolean(json.alarm);
  this.space = new Space(json.space);
  this.comments = new Comments(json.comments);
  this.photo = new Photo(json.photo);
  this.payment = new Payment(json.payment);
}

Request.prototype.toNormal = function () {
  let obj = {};
  obj.timeline = this.timeline.toNormal();
  obj.status = this.status;
  obj.complete = this.complete;
  obj.alarm = this.alarm;
  obj.space = this.space.toNormal();
  obj.comments = this.comments.toNormal();
  obj.photo = this.photo.toNormal();
  obj.payment = this.payment.toNormal();
  return obj;
}

module.exports = Request;
