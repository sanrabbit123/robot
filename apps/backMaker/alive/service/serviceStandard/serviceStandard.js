const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const SERVICE_DIR = process.cwd() + "/apps/backMaker/alive/service";

class StandardX extends Array {
  toNormal() {
    let arr = [];
    for (let i of this) {
      arr.push(i);
    }
    return arr;
  }
}

class StandardY extends Array {
  toNormal() {
    let arr = [];
    for (let i of this) {
      arr.push(i);
    }
    return arr;
  }
}

const ServiceStandard = function (json) {
  this.x = new StandardX();
  for (let i of json.x) {
    this.x.push(i);
  }
  this.y = new StandardY();
  for (let i of json.y) {
    this.y.push(i);
  }
}

ServiceStandard.prototype.toNormal = function () {
  let obj = {};
  obj.x = this.x.toNormal();
  obj.y = this.y.toNormal();
  return obj;
}

module.exports = ServiceStandard;
