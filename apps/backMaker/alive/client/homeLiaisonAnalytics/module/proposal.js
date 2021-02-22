const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const { DateParse } = require(GENERAL_DIR + "/generator.js");

const ProposalFeedback = function (json) {
  this.date = new DateParse(json.date);
  this.who = json.who;
}

ProposalFeedback.prototype.toNormal = function () {
  let obj = {};
  obj.date = this.date.toNormal();
  obj.who = this.who;
  return obj;
}

const ProposalSend = function (json) {
  this.date = new DateParse(json.date);
  this.who = json.who;
}

ProposalSend.prototype.toNormal = function () {
  let obj = {};
  obj.date = this.date.toNormal();
  obj.who = this.who;
  return obj;
}

const ProposalComplete = function (json) {
  this.date = new DateParse(json.date);
  this.who = json.who;
}

ProposalComplete.prototype.toNormal = function () {
  let obj = {};
  obj.date = this.date.toNormal();
  obj.who = this.who;
  return obj;
}

const ProposalGenerate = function (json) {
  this.date = new DateParse(json.date);
  this.who = json.who;
}

ProposalGenerate.prototype.toNormal = function () {
  let obj = {};
  obj.date = this.date.toNormal();
  obj.who = this.who;
  return obj;
}

const ProposalDetail = function (json) {
  this.proid = json.proid;
  this.generate = new ProposalGenerate(json.generate);
  this.complete = new ProposalComplete(json.complete);
  this.send = new ProposalSend(json.send);
  this.feedback = new ProposalFeedback(json.feedback);
}

ProposalDetail.prototype.toNormal = function () {
  let obj = {};
  obj.proid = this.proid;
  obj.generate = this.generate.toNormal();
  obj.complete = this.complete.toNormal();
  obj.send = this.send.toNormal();
  obj.feedback = this.feedback.toNormal();
  return obj;
}

class Proposal extends Array {
  constructor(json) {
    super();
    for (let i of json) {
      this.push(new ProposalDetail(i));
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

module.exports = Proposal;
