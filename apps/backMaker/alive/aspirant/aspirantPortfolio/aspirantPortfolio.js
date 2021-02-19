const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const PROJECT_DIR = process.cwd() + "/apps/backMaker/alive/aspirant";
const { DateParse } = require(GENERAL_DIR + "/generator.js");

const AspirantPortfolioDetail = function (json) {
  this.date = new DateParse(json.date);
  this.folderId = json.folderId;
}

AspirantPortfolioDetail.prototype.toNormal = function () {
  let obj = {};
  obj.date = this.date.toNormal();
  obj.folderId = this.folderId;
  return obj;
}

class AspirantPortfolio extends Array {
  constructor(json) {
    super();
    let tempInstance;
    for (let i of json) {
      tempInstance = new AspirantPortfolioDetail(i);
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


module.exports = AspirantPortfolio;
