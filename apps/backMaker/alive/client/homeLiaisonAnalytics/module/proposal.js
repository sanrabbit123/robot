const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const { DateParse } = require(GENERAL_DIR + "/generator.js");

const ProposalDetail = function (json) {
  this.proid = json.proid;
  this.date = new DateParse(json.date);
  this.contract = json.contract;
}

ProposalDetail.prototype.toNormal = function () {
  let obj = {};
  obj.proid = this.proid;
  obj.date = this.date.toNormal();
  obj.contract = this.contract;
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
