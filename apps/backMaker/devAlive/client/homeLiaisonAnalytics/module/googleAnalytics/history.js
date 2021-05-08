const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const { DateParse } = require(GENERAL_DIR + "/generator.js");

const HistoryDetail = function (json) {
  this.time = new DateParse(json.time);
  this.page = json.page;
  this.page_raw = json.page_raw;
}

HistoryDetail.prototype.toNormal = function () {
  let obj = {};
  obj.time = this.time.toNormal();
  obj.page = this.page;
  obj.page_raw = this.page_raw;
  return obj;
}

class History extends Array {

  constructor(json) {
    super();
    for (let i of json) {
      this.push(new HistoryDetail(i));
    }
  }

  toNormal() {
    let arr = [];
    for (let i = 0; i < this.length; i++) {
      arr.push(this[i].toNormal());
    }
    return arr;
  }

}

module.exports = History;
