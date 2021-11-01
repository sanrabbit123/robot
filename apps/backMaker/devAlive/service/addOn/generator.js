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
