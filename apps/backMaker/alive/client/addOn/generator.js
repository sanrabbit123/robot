const CLIENT_DIR = process.cwd() + "/apps/backMaker/alive/client";
const Client = require(CLIENT_DIR + "/client.js");

class Clients extends Array {

  latestRequests() {
    let arr = [];
    for (let i of this) {
      arr.push(i.latestRequest());
    }
    return arr;
  }

  get name() {
    let arr = [];
    for (let i of this) {
      arr.push(i.name);
    }
    return arr.join(',');
  }

  toNormal() {
    let tong;
    tong = [];
    for (let i of this) {
      tong.push(i.toNormal());
    }
    return tong;
  }

}

module.exports = { Client, Clients };
