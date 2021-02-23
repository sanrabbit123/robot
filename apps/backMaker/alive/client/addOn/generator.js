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

const widthTools = function (Client) {

  Client.prototype.toMessage = function () {
    const { request } = this.requests[0];
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
    message += "입주 예정일 : " + request.space.resident.expected.toString() + "\n";
    message += "계약 형태 : " + request.space.contract.value + "\n";
    message += "공간 상태 : " + request.space.spec.toMessage() + "\n";
    message += "요청 사항 : " + request.etc.comment + "\n";
    message += "유입 경로 : " + request.etc.channel + "\n";

    return message.replace(/\n$/, '');
  }

  Client.prototype.toGoogleAnalyticsSheet = function () {
    const { request, analytics: { googleAnalytics } } = this.requests[0];
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
    sheet.push(request.space.resident.expected.toString());
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
    const client = this.toNormal();
    const { name, phone, email, cliid } = client;

    const dateToString = function (dateObject, detail = false) {
      let dayString = '';

      dayString += String(dateObject.getFullYear()).slice(0, 4);
      dayString += '-';

      if (dateObject.getMonth() + 1 < 10) {
        dayString += '0' + String(dateObject.getMonth() + 1);
      } else {
        dayString += String(dateObject.getMonth() + 1);
      }

      dayString += '-';

      if (dateObject.getDate() < 10) {
        dayString += '0' + String(dateObject.getDate());
      } else {
        dayString += String(dateObject.getDate());
      }

      if (detail) {
        dayString += ' ';
        if (dateObject.getHours() < 10) {
          dayString += '0' + String(dateObject.getHours());
        } else {
          dayString += String(dateObject.getHours());
        }
        dayString += ':';
        if (dateObject.getMinutes() < 10) {
          dayString += '0' + String(dateObject.getMinutes());
        } else {
          dayString += String(dateObject.getMinutes());
        }
        dayString += ':';
        if (dateObject.getSeconds() < 10) {
          dayString += '0' + String(dateObject.getSeconds());
        } else {
          dayString += String(dateObject.getSeconds());
        }
      }

      if (/^1[678]/.test(dayString)) {
        dayString = '-';
      }

      return dayString;
    }

    const callHistoryToString = function (historyArr) {
      let totalString = '';
      for (let { date, who } of historyArr) {
        totalString += dateToString(date) + ", ";
      }
      if (totalString !== '') {
        totalString = totalString.slice(0, -2);
      }
      return totalString;
    }

    let tong = [];
    let temp;

    for (let { request: { timeline, budget, family, space: { address, contract, pyeong, spec: { room, bathroom, valcony }, resident: { living } }, etc: { comment, channel } }, analytics: { response: { status, action, outreason, outspot, kakao }, date: { call: { next, history: callHistory }, space: { precheck, empty, movein } }, picture: { space: spacePicture, prefer: preferPicture } } } of client.requests) {

      temp = {};
      temp.standard = {
        cliid,
        name
      };
      temp.info = {
        status,
        action,
        outreason: outreason.join(", "),
        outspot,
        kakao,
        next: dateToString(next),
        callHistory: callHistoryToString(callHistory),
        timeline: dateToString(timeline, true),
        spacePicture: (spacePicture.length > 0 ? "제출" : "미제출"),
        preferPicture: (preferPicture.length > 0 ? "제출" : "미제출"),
        phone,
        email,
        budget,
        address,
        contract,
        pyeong,
        living,
        precheck: dateToString(precheck),
        empty: dateToString(empty),
        movein: dateToString(movein),
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

  Client.prototype.dimensionSqueeze = function () {
    const tong = this.flatDeath();
    let result, tempObj;

    result = [];
    for (let { standard, info } of tong) {
      tempObj = {};
      for (let i in standard) {
        tempObj[i] = standard[i];
      }
      for (let i in info) {
        tempObj[i] = info[i];
      }
      result.push(tempObj);
    }

    return result;
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

  Clients.prototype.dimensionSqueeze = function () {
    let tong, tempArr;
    tong = [];
    for (let i of this) {
      tempArr = i.dimensionSqueeze();
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
