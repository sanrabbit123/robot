const CLIENT_DIR = process.cwd() + "/apps/backMaker/alive/client";
const Client = require(CLIENT_DIR + "/client.js");

class RequestsTong extends Array {

}

class Clients extends Array {

  latestRequests() {
    let arr = new RequestsTong();
    for (let i of this) {
      arr.push(i.latestRequest());
    }
    return arr;
  }

  getRequests() {
    let arr = new RequestsTong();
    let tempArr;
    for (let i of this) {
      tempArr = i.requests;
      for (let j of tempArr) {
        arr.push(j);
      }
    }
    return arr;
  }

  get requests() {
    return this.getRequests();
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
