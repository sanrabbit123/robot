const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const { DateParse } = require(GENERAL_DIR + "/generator.js");

class Resident {
  constructor(resident) {
    this.living = Boolean(resident.living);
    this.expected = new DateParse(resident.expected);
  }

  toNormal() {
    let obj = {};
    obj.living = this.living;
    obj.expected = this.expected.toNormal();
    return obj;
  }
}

module.exports = Resident;
