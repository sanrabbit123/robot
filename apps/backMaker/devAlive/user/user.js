const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const USER_DIR = process.cwd() + "/apps/backMaker/alive/user";
const Request = require(USER_DIR + "/userRequest/request.js");
const Response = require(USER_DIR + "/userResponse/response.js");

const Service = function (json) {
  this.serid = json.serid;
  this.xValue = json.xValue;
  this.online = Boolean(json.online);
}

Service.prototype.toNormal = function () {
  let obj = {};
  obj.serid = this.serid;
  obj.xValue = this.xValue;
  obj.online = this.online;
  return obj;
}

const User = function (json) {
  this.useid = json.useid;
  this.desid = json.desid;
  this.name = json.name;
  this.phone = json.phone;
  this.email = json.email;
  this.service = new Service(json.service);
  this.request = new Request(json.request);
  this.response = new Response(json.response);
}

User.prototype.toNormal = function () {
  let obj = {};
  obj.useid = this.useid;
  obj.desid = this.desid;
  obj.name = this.name;
  obj.phone = this.phone;
  obj.email = this.email;
  obj.service = this.service.toNormal();
  obj.request = this.request.toNormal();
  obj.response = this.response.toNormal();
  return obj;
}

module.exports = User;
