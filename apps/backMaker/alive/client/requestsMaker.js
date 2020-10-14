const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const CLIENT_DIR = process.cwd() + "/apps/backMaker/alive/client";
const WebRequest = require(CLIENT_DIR + "/webRequest/webRequest.js");
const HomeLiaisonAnalytics = require(CLIENT_DIR + "/homeLiaisonAnalytics/homeLiaisonAnalytics.js");
const DesignerProposal = require(CLIENT_DIR + "/designerProposal/designerProposal.js");

class Request extends Array {

  toAlive(_request) {
    const { request, analytics, proposal } = _request;
    let instance0, instance1, instance2;
    instance0 = new WebRequest(request);
    instance1 = new HomeLiaisonAnalytics(analytics);
    instance2 = new DesignerProposal(proposal);
    instance0.toAlive();
    instance1.toAlive();
    instance2.toAlive();
    this.request = instance0;
    this.analytics = instance1;
    this.proposal = instance2;
    this.push(this.request);
    this.push(this.analytics);
    this.push(this.proposal);
  }

  get space() {
    return this.request.space;
  }

  toNormal() {
    let obj = {};
    obj.request = this.request.toNormal();
    obj.analytics = this.analytics.toNormal();
    obj.proposal = this.proposal.toNormal();
    return obj;
  }

}

class Requests extends Array {

  constructor() {
    super();
    this.children = [];
  }

  toNormal() {
    let arr = [];
    for (let i of this.children) {
      arr.push(i.toNormal());
    }
    return arr;
  }

}

const RequestsMaker = function (requests) {
  this.rawRequests = requests;
}

RequestsMaker.prototype.output = function () {
  let result = new Requests();
  let requestInstance;

  for (let i of this.rawRequests) {
    requestInstance = new Request();
    requestInstance.toAlive(i);
    result.push(requestInstance);
    result.children.push(requestInstance);
  }
  return result;
}

module.exports = RequestsMaker;
