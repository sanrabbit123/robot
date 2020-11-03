const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const CLIENT_DIR = process.cwd() + "/apps/backMaker/alive/client";
const RequestsMaker = require(CLIENT_DIR + "/requestsMaker.js");

const Client = function (json) {
  const clientId = function (rawId) {
    let newId;
    if (!/^c/.test(rawId) || rawId.length !== 11) {
      throw new Error("invaild client id");
    }
    newId = rawId;
    return newId;
  }
  let requestsInstance;

  this.name = json.name;
  this.phone = json.phone;
  this.email = json.email;
  this.cliid = clientId(json.cliid);
  this.requests = RequestsMaker(json.requests);
}

Client.prototype.latestRequest = function () {
  return this.requests[this.requests.length - 1];
}

Client.prototype.googleAnalyticsUpdate = function (obj) {
  const request = this.requests[this.requests.length - 1];
  request.google.jsonUpdate(obj);
  return this;
}

Client.prototype.toJson = function () {
  let obj = {};
  obj.name = this.name;
  obj.phone = this.phone;
  obj.email = this.email;
  obj.cliid = this.cliid;
  obj.requests = this.requests.toNormal();
  return obj;
}

Client.prototype.toNormal = function () {
  return this.toJson();
}

Client.prototype.toString = function () {
  return JSON.stringify(this.toJson(), null, 2);
}

Client.prototype.toDeath = function () {
  return this.toString();
}

Client.prototype.stringify = function () {
  return this.toString();
}

module.exports = Client;
