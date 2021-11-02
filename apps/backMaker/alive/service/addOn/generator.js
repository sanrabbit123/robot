const CLIENT_DIR = process.cwd() + "/apps/backMaker/alive/service";
const Service = require(CLIENT_DIR + "/service.js");

class Services extends Array {
  toNormal() {
    let tong;
    tong = [];
    for (let i of this) {
      tong.push(i.toNormal());
    }
    return tong;
  }
  get setting() {
    let arr = [];
    for (let i of this) {
      arr.push(i.setting);
    }
    return arr;
  }
  toMatrix() {
    let arr;
    arr = [];
    for (let i of this) {
      arr.push(i.toMatrix());
    }
    return arr;
  }
}

const withTools = function (Service) {
  return Service;
}

const withToolsArr = function (Services) {
  return Services;
}

const Tools = function () {}
Tools.withTools = withTools;
Tools.withToolsArr = withToolsArr;

module.exports = { Service, Services, Tools };
