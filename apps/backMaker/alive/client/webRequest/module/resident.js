const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const { DateParse } = require(GENERAL_DIR + "/generator.js");

const Resident = function (resident) {
  this.living = Boolean(resident.living);
  this.expected = new DateParse(resident.expected);
}

Resident.prototype.toNormal = function () {
  let obj = {};
  obj.living = this.living;
  obj.expected = this.expected.toNormal();
  return obj;
}

module.exports = Resident;
