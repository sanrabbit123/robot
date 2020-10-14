const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const CLIENT_DIR = process.cwd() + "/apps/backMaker/alive/client";
const RequestsMaker = require(CLIENT_DIR + "/requestsMaker.js");

class Client {

  constructor(json) {
    this.rawJson = json;
    this.alive = false;
  }

  get latestRequest() {
    return this.requests[this.requests.length - 1];
  }

  clientId(rawId) {
    let newId;
    if (!/^c/.test(rawId) || rawId.length !== 11) {
      throw new Error("invaild client id");
    }
    newId = rawId;
    return newId;
  }

  toAlive() {
    let requestsInstance;

    this.name = this.rawJson.name;
    this.phone = this.rawJson.phone;
    this.email = this.rawJson.email;
    this.cliid = this.clientId(this.rawJson.cliid);

    requestsInstance = new RequestsMaker(this.rawJson.requests);
    this.requests = requestsInstance.output();

    this.alive = true;
    delete this.rawJson;
  }

  toJson() {
    let obj = {};
    if (!this.alive) {
      this.toAlive();
    }
    obj.name = this.name;
    obj.phone = this.phone;
    obj.email = this.email;
    obj.cliid = this.cliid;
    obj.requests = this.requests.toNormal();

    return obj;
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

  get death() {
    return this.toDeath();
  }

}

module.exports = Client;
