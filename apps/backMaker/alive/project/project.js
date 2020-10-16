const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const PROJECT_DIR = process.cwd() + "/apps/backMaker/alive/project";
// const RequestsMaker = require(PROJECT_DIR + "/requestsMaker.js");

class Project {

  constructor(json) {
    // const clientId = function (rawId) {
    //   let newId;
    //   if (!/^c/.test(rawId) || rawId.length !== 11) {
    //     throw new Error("invaild client id");
    //   }
    //   newId = rawId;
    //   return newId;
    // }
    // let requestsInstance;
    //
    // this.name = json.name;
    // this.phone = json.phone;
    // this.email = json.email;
    // this.cliid = clientId(json.cliid);
    // requestsInstance = new RequestsMaker(json.requests);
    // this.requests = requestsInstance.output();
  }

  toJson() {
    // let obj = {};
    // obj.name = this.name;
    // obj.phone = this.phone;
    // obj.email = this.email;
    // obj.cliid = this.cliid;
    // obj.requests = this.requests.toNormal();
    // return obj;
  }

  toNormal() {
    return this.toJson();
  }

  toString() {
    return JSON.stringify(this.toJson(), null, 2);
  }

  toDeath() {
    return this.toString();
  }

  stringify() {
    return this.toString();
  }

  get json() {
    return this.toJson();
  }

  get normal() {
    return this.toJson();
  }

  get death() {
    return this.toDeath();
  }

}

module.exports = Client;
