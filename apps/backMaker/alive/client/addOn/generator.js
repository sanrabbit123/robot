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

}

const widthTools = function (Client) {

  Client.prototype.toMessage = function () {
    const { request } = this.requests[this.requests.length - 1];
    let message = "";

    message += "문의일 : " + request.timeline.toString(true) + "\n";
    message += "고객 아이디 : " + this.cliid + "\n";
    message += "성함 : " + this.name + "\n";
    message += "연락처 : " + this.phone + "\n";
    message += "이메일 : " + this.email + "\n";
    message += "주소 : " + request.space.address.value + "\n";
    message += "가족 구성원 : " + request.family.value + "\n";
    message += "예산 : " + request.budget.value + "\n";
    message += "평수 : " + request.space.pyeong.toMessage() + "\n";
    message += "입주 예정일 : " + request.space.resident.expected.toNormal() + "\n";
    message += "계약 형태 : " + request.space.contract.value + "\n";
    message += "공간 상태 : " + request.space.spec.toMessage() + "\n";
    message += "요청 사항 : " + request.etc.comment + "\n";
    message += "유입 경로 : " + request.etc.channel + "\n";

    return message.replace(/\n$/, '');
  }

  Client.prototype.toGoogleAnalyticsSheet = function () {
    const { request, analytics: { googleAnalytics } } = this.requests[this.requests.length - 1];
    let sheet = [];

    sheet.push(request.timeline.toString(true));
    sheet.push(this.cliid);
    sheet.push(this.name);
    sheet.push(this.phone);
    sheet.push(this.email);
    sheet.push(request.space.address.value);
    sheet.push(request.family.value);
    sheet.push(request.budget.value);
    sheet.push(request.space.pyeong.toMessage());
    sheet.push(request.space.resident.expected.toNormal());
    sheet.push(request.space.contract.value);
    sheet.push(request.space.spec.toMessage());
    sheet.push(request.etc.comment);
    sheet.push(request.etc.channel);

    sheet.push(googleAnalytics.userType);
    sheet.push(googleAnalytics.referrerString);
    sheet.push(googleAnalytics.deviceString);
    sheet.push(googleAnalytics.regionString);
    sheet.push(googleAnalytics.campaign);
    sheet.push(googleAnalytics.historyString);

    return sheet;
  }

  Client.prototype.flatDeath = function () {
    let tong = [];
    let temp;
    const client = this.toNormal();
    const { name, phone, email, cliid } = client;
    for (let { request: { timeline, budget, family, space: { address, contract, pyeong, spec: { room, bathroom, valcony }, resident: { living, expected } }, etc: { comment, channel } }, analytics: { response: { status, outreason }, date: { callHistory, space: { precheck, empty, movein } }, picture } } of client.requests) {
      temp = {};
      temp.standard = {
        cliid,
        name
      };
      temp.info = {
        status,
        outreason: outreason.join("__split__"),
        callHistory: callHistory.join("__split__"),
        timeline,
        phone,
        email,
        budget,
        address,
        contract,
        pyeong,
        living,
        expected,
        precheck,
        empty,
        movein,
        room,
        bathroom,
        valcony,
        family,
        comment,
        channel,
      }
      tong.push(temp);
    }
    return tong;
  }

  return Client;
}

const widthToolsArr = function (Clients) {

  Clients.prototype.toMessage = function () {
    let arr = [];
    for (let i of this) {
      arr.push(i.toMessage());
    }
    return arr;
  }

  Clients.prototype.toGoogleAnalyticsSheet = function () {
    let arr = [];
    for (let i of this) {
      arr.push(i.toGoogleAnalyticsSheet());
    }
    return arr;
  }

  Clients.prototype.flatDeath = function () {
    let tong, tempArr;
    tong = [];
    for (let i of this) {
      tempArr = i.flatDeath();
      for (let j of tempArr) {
        tong.push(j);
      }
    }
    return tong;
  }

  return Clients;
}

const Tools = function () {}
Tools.widthTools = widthTools;
Tools.widthToolsArr = widthToolsArr;

module.exports = { Client, Clients, Tools };
