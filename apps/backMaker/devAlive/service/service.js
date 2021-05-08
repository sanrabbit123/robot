const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const SERVICE_DIR = process.cwd() + "/apps/backMaker/alive/service";
const ServiceStandard = require(SERVICE_DIR + "/serviceStandard/serviceStandard.js");
const ServiceCases = require(SERVICE_DIR + "/serviceCase/serviceCase.js");

const Service = function (json) {
  this.serid = json.serid;
  this.name = json.name;
  this.standard = new ServiceStandard(json.standard);
  this.case = new ServiceCases(json.case);
}

Service.prototype.getMatrixByNumber = function (index) {
  const result = this.case.getMatrixByNumber(index);
  return result;
}

Service.prototype.getCaseByNumber = function (index) {
  return this.getMatrixByNumber(index);
}

Service.prototype.queryCase = function (matrix) {
  let queryString = '';
  let newMatrix, tempArr;

  newMatrix = [];
  for (let i of matrix) {
    if (!Array.isArray(i)) {
      throw new Error("invaild matrix value");
    } else {
      tempArr = [];
      for (let j of i) {
        if (/^[0-9]/.test(j)) {
          tempArr.push(String(j));
        } else {
          if (!/py/g.test(j)) {
            throw new Error("invaild pyeong value");
          }
          tempArr.push(String(j));
        }
      }
      newMatrix.push(tempArr);
    }
  }

  let result;
  result = '';
  for (let i = 0; i < newMatrix.length; i++) {
    result += newMatrix[i].join("__split0__");
    result += "__split1__";
  }
  result = result.slice(0, -10);

  return this.case.queryCase(result);
}

Service.prototype.toNormal = function () {
  let obj = {};
  obj.serid = this.serid;
  obj.name = this.name;
  obj.standard = this.standard.toNormal();
  obj.case = this.case.toNormal();
  return obj;
}

module.exports = Service;
