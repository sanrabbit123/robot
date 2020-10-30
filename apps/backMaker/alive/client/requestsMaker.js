const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const CLIENT_DIR = process.cwd() + "/apps/backMaker/alive/client";
const WebRequest = require(CLIENT_DIR + "/webRequest/webRequest.js");
const HomeLiaisonAnalytics = require(CLIENT_DIR + "/homeLiaisonAnalytics/homeLiaisonAnalytics.js");
const DesignerProposal = require(CLIENT_DIR + "/designerProposal/designerProposal.js");

class Request extends Array {

  constructor(_request) {
    super();
    const { request, analytics, proposal } = _request;
    this.request = new WebRequest(request);
    this.analytics = new HomeLiaisonAnalytics(analytics);
    this.proposal = new DesignerProposal(proposal);
    this.push(this.request);
    this.push(this.analytics);
    this.push(this.proposal);
  }

  get space() {
    return this.request.space;
  }

  get google() {
    return this.analytics.googleAnalytics;
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

  toNormal() {
    let arr = [];
    for (let i = 0; i < this.length; i++) {
      arr.push(this[i].toNormal());
    }
    return arr;
  }

}

const RequestsMaker = function (requests) {
  let result = new Requests();
  let requestInstance;
  for (let i of requests) {
    requestInstance = new Request(i);
    result.push(requestInstance);
  }
  return result;
}

module.exports = RequestsMaker;
