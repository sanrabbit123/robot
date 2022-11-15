const CLIENT_DIR = process.cwd() + "/apps/backMaker/alive/client";
const { Client, Clients } = require(CLIENT_DIR + "/addOn/generator.js");

class ClientTypeCases extends Array {
  parsingCases(client) {
    const requestTypes = client.getType();
    let arr = [], result = [];
    for (let i of requestTypes) {
      arr.push(`${i.budget.type}_${i.address.type}_${i.pyeong.type}_${i.contract.type}_${i.living.type}`);
    }
    for (let i of arr) {
      for (let obj of this) {
        if (obj.name === i) {
          result.push(obj);
        }
      }
    }
    return result;
  }

  parsingProid(client) {
    const caseArray = this.parsingCases(client);
    let targetProid;

    targetProid = null;

    for (let i = 0; i < caseArray.length; i++) {
      caseArray[caseArray.length - 1 - i].proidArr.sort();
      caseArray[caseArray.length - 1 - i].contractArr.sort();
      for (let j = 0; j < caseArray[caseArray.length - 1 - i].proidArr.length; j++) {
        targetProid = caseArray[caseArray.length - 1 - i].proidArr[j];
      }
      for (let j = 0; j < caseArray[caseArray.length - 1 - i].contractArr.length; j++) {
        targetProid = caseArray[caseArray.length - 1 - i].contractArr[j];
      }
    }

    return targetProid;
  }
}

class ClientTypes extends Array {

  getCompositionWords() {
    let arr = [];
    for (let i of this) {
      arr.push(`${i.budget.type}_${i.address.type}_${i.pyeong.type}_${i.contract.type}_${i.living.type}`);
    }
    return arr;
  }

  getTypeCases(projects = null) {
    const typeSet = Array.from(new Set(this.getCompositionWords()));
    typeSet.sort((a, b) => {
      return Number(a.split("_")[0]) - Number(b.split("_")[0]);
    });
    let resultArr, cliidArr, tempObj, tempArr, proidArr, contractArr;

    resultArr = new ClientTypeCases();

    for (let i of typeSet) {
      tempObj = { name: i, case: {} };
      tempArr = i.split('_');
      tempObj.case.budget = Number(tempArr[0]);
      tempObj.case.address = tempArr[1];
      tempObj.case.pyeong = { from: Number(tempArr[2].split(" ~ ")[0]), to: Number(tempArr[2].split(" ~ ")[1]) };
      tempObj.case.contract = tempArr[3];
      tempObj.case.living = tempArr[4] === "거주중";
      cliidArr = [];
      for (let j of this) {
        if (i === (`${j.budget.type}_${j.address.type}_${j.pyeong.type}_${j.contract.type}_${j.living.type}`)) {
          cliidArr.push(j.cliid);
        }
      }
      tempObj.cliidArr = cliidArr;
      if (projects !== null) {
        proidArr = [];
        contractArr = [];
        for (let p of projects) {
          if (cliidArr.includes(p.cliid)) {
            proidArr.push(p.proid);
            if (/^d/.test(p.desid)) {
              contractArr.push(p.proid);
            }
          }
        }
        tempObj.proidArr = proidArr;
        tempObj.contractArr = contractArr;
      }
      resultArr.push(tempObj);
    }

    return resultArr;
  }
}

const ClientType = function (obj) {
  const budgetTypes = function (number) {
    if (number <= 500) {
      return 500;
    } else if (number > 500 && number < 1500) {
      return 1000;
    } else if (number >= 1500 && number < 2000) {
      return 1500;
    } else if (number >= 2000 && number < 3000) {
      return 2000;
    } else if (number >= 3000 && number < 4000) {
      return 3000;
    } else if (number >= 4000 && number < 5000) {
      return 4000;
    } else {
      return 5000;
    }
  }

  const addressTypes = function (arr) {
    if ((new RegExp("^서울")).test(arr[0])) {
      return "서울";
    } else if ((new RegExp("^서울")).test(arr[0])) {
      return "수도권";
    } else if ((new RegExp("^서울")).test(arr[0])) {
      return "수도권";
    } else {
      return "지방";
    }
  }

  const pyeongTypes = function (number) {
    if (number <= 10) {
      return "0 ~ 9";
    } else if (number >= 10 && number < 25) {
      return "10 ~ 24";
    } else if (number >= 25 && number < 30) {
      return "25 ~ 29";
    } else if (number >= 30 && number < 35) {
      return "30 ~ 34";
    } else if (number >= 35 && number < 40) {
      return "35 ~ 39";
    } else if (number >= 40 && number < 45) {
      return "40 ~ 44";
    } else if (number >= 45 && number < 50) {
      return "45 ~ 49";
    } else {
      return "50 ~ ";
    }
  }

  this.cliid = obj.cliid;
  this.timeline = obj.timeline;

  this.budget = {
    value: Number(obj.budget.replace(/[^0-9\.\-]/g, '')),
    type: budgetTypes(Number(obj.budget.replace(/[^0-9\.\-]/g, ''))),
  };

  this.address = {
    value: obj.address.split(" "),
    type: addressTypes(obj.address.split(" ")),
  };

  this.pyeong = {
    value: obj.pyeong,
    type: pyeongTypes(obj.pyeong),
  };

  this.contract = {
    value: obj.contract,
    type: obj.contract,
  };

  this.living = {
    value: obj.living,
    type: (obj.living ? "거주중" : "이사"),
  };

}

const withTools = function (Client) {

  Client.prototype.getType = function () {
    let arr = new ClientTypes();
    let tempObj;
    for (let { request } of this.requests) {
      tempObj = {};
      tempObj.cliid = this.cliid;
      tempObj.timeline = request.timeline;
      tempObj.budget = request.budget.value;
      tempObj.address = request.space.address.value;
      tempObj.pyeong = request.space.pyeong.value;
      tempObj.contract = request.space.contract.value;
      tempObj.living = request.space.resident.living;
      arr.push(new ClientType(tempObj));
    }
    return arr;
  }

  Client.prototype.toMessage = function () {
    const { request } = this.requests[0];
    let message = "";

    message += "문의일 : " + request.timeline.toString(true) + "\n";
    message += "고객 아이디 : " + this.cliid + "\n";
    message += "성함 : " + this.name + "\n";
    message += "연락처 : " + this.phone + "\n";
    message += "이메일 : " + this.email + "\n";
    message += "주소 : " + request.space.address.value + "\n";
    message += "평수 : " + request.space.pyeong.toMessage() + "\n";
    message += "입주 예정일 : " + request.space.resident.expected.toString() + "\n";
    message += "계약 형태 : " + request.space.contract.value + "\n";
    message += "공간 상태 : " + request.space.spec.toMessage() + "\n";
    message += "요청 사항 : " + request.etc.comment + "\n";
    message += "유입 경로 : " + request.etc.channel + "\n";

    return message.replace(/\n$/, '');
  }

  Client.prototype.toPrint = function () {
    const { request } = this.requests[0];
    const indent = "    ";
    const bar = "=============================================================";
    const wordEaLength = 70;
    let documentArr, comment, commentArr;
    let tempStr;

    documentArr = [];

    documentArr.push(`상담 신청서  /  ${this.cliid}  /  ${request.timeline.toString(true)}\n`);
    documentArr.push(bar + "\n");
    documentArr.push(`${this.name} (${this.phone})\n`);
    documentArr.push("주소 : " + request.space.address.value + "\n");
    documentArr.push("평수 : " + request.space.pyeong.toMessage() + "\n");
    if (!request.space.resident.living) {
      documentArr.push("입주 예정일 : " + request.space.resident.expected.toString() + "\n");
    } else {
      documentArr.push("입주 예정일 : " + "거주중" + "\n");
    }
    documentArr.push("계약 형태 : " + request.space.contract.value + "\n");
    documentArr.push("예산 : " + request.budget.value + "\n");
    documentArr.push("가구 구매 : " + request.furniture.value + "\n");
    documentArr.push("유입 경로 : " + request.etc.channel + "\n");

    comment = "요청 사항 : " + request.etc.comment;
    commentArr = [];
    tempStr = '';
    for (let i = 0; i < comment.length; i++) {
      tempStr += comment[i];
      if (i % wordEaLength === wordEaLength - 1) {
        commentArr.push(tempStr);
        tempStr = '';
      }
    }
    commentArr.push(tempStr);

    commentArr = commentArr.filter((s) => { return s !== ""; }).map((s) => { return s.trim() + "\n"; });

    documentArr = documentArr.concat(commentArr);
    documentArr = documentArr.map((s) => { return indent + s; });

    return documentArr.join("\n");
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
      } else if (/^3/.test(dayString)) {
        dayString = '예정';
      }

      return dayString;
    }

    const callHistoryToString = function (historyArr) {
      let totalString = '';
      historyArr.reverse();
      for (let { date, who } of historyArr) {
        totalString += dateToString(date) + ", ";
      }
      if (totalString !== '') {
        totalString = totalString.slice(0, -2);
      }
      return totalString;
    }

    const serviceParsing = function (serviceObj) {
      let serviceWording = '';

      if (serviceObj.serid === "s2011_aa01s") {
        serviceWording = "홈퍼니싱";
      } else if (serviceObj.serid === "s2011_aa02s") {
        serviceWording = "홈스타일링";
      } else if (serviceObj.serid === "s2011_aa03s") {
        serviceWording = "토탈 스타일링";
      } else {
        serviceWording = "설계 변경";
      }

      if (serviceObj.xValue === 'M') {
        serviceWording += " mini";
      } else if (serviceObj.xValue === 'B') {
        serviceWording += " basic";
      } else if (serviceObj.xValue === 'P') {
        serviceWording += " premium";
      }

      if (serviceObj.online) {
        serviceWording = "온라인 " + serviceWording;
      } else {
        serviceWording = "오프라인 " + serviceWording;
      }

      return serviceWording;
    }

    let tong = [];
    let temp;

    for (let { request: { timeline, budget, family, furniture, space: { address, contract, pyeong, spec: { room, bathroom, valcony }, resident: { living, expected }, partial: { boo: partialBoo, pyeong: partialPyeong, detail: partialDetail } }, etc: { comment, channel } }, analytics: { response: { status, action, outreason, kakao, service }, date: { call: { next, history: callHistory }, space: { precheck, empty, movein } }, picture: { space: spacePicture, prefer: preferPicture } } } of client.requests) {

      temp = {};
      temp.standard = {
        cliid,
        name
      };
      temp.info = {
        status,
        action,
        outreason: outreason.join(", "),
        kakao: (kakao ? "등록" : "미등록"),
        service: serviceParsing(service),
        next: dateToString(next),
        callHistory: callHistoryToString(callHistory),
        timeline: dateToString(timeline, true),
        spacePicture: (spacePicture.boo ? "제출" : "미제출"),
        preferPicture: (preferPicture.boo ? "제출" : "미제출"),
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
        expected: dateToString(expected),
        room,
        bathroom,
        valcony,
        family,
        furniture,
        comment,
        channel,
        partialBoo: (partialBoo ? "부분" : "전체"),
        partialPyeong,
        partialDetail,
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

const withToolsArr = function (Clients) {

  class TongReports extends Array {}

  class TongReport {
    constructor(cliid, value) {
      this.cliid = cliid;
      this.value = value;
    }
  }

  class RequestsTongs extends Array {

    reportAll() {
      let arr = [];
      for (let i of this) {
        arr.push(i.reportAll());
      }
      return arr;
    }

    select(dateObj) {
      if (!(dateObj instanceof Date)) {
        throw new Error("must be date object");
      }
      let key, target;

      target = null;
      key = (String(dateObj.getFullYear()).slice(2) + "년 " + String(dateObj.getMonth() + 1) + "월");
      for (let obj of this) {
        if (obj.name === key) {
          target = obj;
          break;
        }
      }

      return target;
    }

  }

  class RequestsTongFactor {
    constructor(obj) {
      this.name = obj.name;
      this.date = obj.date;
      this.tong = obj.tong;
    }

    static ratioParsing(num) {
      return `${String(Math.round(num * 100 * 10) / 10)}%`;
    }

    static moneyParsing(num) {
      let str = String(Math.round(num));
      if (str.length > 3) {
        str = str.slice(0, -3) + ',' + str.slice(-3);
      }
      return `${str}만원`;
    }

    static pyeongParsing(num) {
      return `${String(Math.round(num * 100) / 100)}평`;
    }

    static dayParsing(num) {
      return `${String(Math.floor(num))}일`;
    }

    reportBudget() {
      const tong = this.tong;
      const reports = [
        { name: "500만원 이하", from: 0, to: 1000, value: 0, ratio: 0, cliidArr: [] },
        { name: "1,000만원", from: 1000, to: 1500, value: 0, ratio: 0, cliidArr: [] },
        { name: "1,500만원", from: 1500, to: 2000, value: 0, ratio: 0, cliidArr: [] },
        { name: "2,000만원", from: 2000, to: 3000, value: 0, ratio: 0, cliidArr: [] },
        { name: "3,000만원", from: 3000, to: 4000, value: 0, ratio: 0, cliidArr: [] },
        { name: "4,000만원", from: 4000, to: 5000, value: 0, ratio: 0, cliidArr: [] },
        { name: "5,000만원 이상", from: 5000, to: 6000, value: 0, ratio: 0, cliidArr: [] },
        { name: "6,000만원 이상", from: 6000, to: 7000, value: 0, ratio: 0, cliidArr: [] },
        { name: "7,000만원 이상", from: 7000, to: 8000, value: 0, ratio: 0, cliidArr: [] },
        { name: "8,000만원 이상", from: 8000, to: 9000, value: 0, ratio: 0, cliidArr: [] },
        { name: "9,000만원 이상", from: 9000, to: 10000, value: 0, ratio: 0, cliidArr: [] },
        { name: "1억원 이상", from: 10000, to: 15000, value: 0, ratio: 0, cliidArr: [] },
        { name: "1억 5,000만원 이상", from: 15000, to: 20000, value: 0, ratio: 0, cliidArr: [] },
        { name: "2억원 이상", from: 20000, to: 30000, value: 0, ratio: 0, cliidArr: [] },
        { name: "3억원 이상", from: 30000, to: 50000, value: 0, ratio: 0, cliidArr: [] },
        { name: "5억원 이상", from: 50000, to: 100000, value: 0, ratio: 0, cliidArr: [] },
        { name: "10억원 이상", from: 100000, to: 900000000, value: 0, ratio: 0, cliidArr: [] },
      ];
      const targetArr = tong.getBudget();
      let total = 0;
      for (let { value } of targetArr) {
        total += value;
      }
      for (let obj of reports) {
        for (let { cliid, value } of targetArr) {
          if (obj.from <= value && obj.to > value) {
            obj.value = obj.value + 1;
            obj.cliidArr.push(cliid);
          }
        }
      }
      for (let obj of reports) {
        obj.ratio = RequestsTongFactor.ratioParsing(obj.value / tong.length);
        delete obj.from;
        delete obj.to;
      }
      return { total: tong.length, average: RequestsTongFactor.moneyParsing(total / tong.length), detail: reports };
    }

    reportAddress() {
      const tong = this.tong;
      const reports = [
        { name: "서울", regex: new RegExp("^서울"), value: 0, ratio: 0, cliidArr: [] },
        { name: "인천", regex: new RegExp("^인천"), value: 0, ratio: 0, cliidArr: [] },
        { name: "경기", regex: new RegExp("^경기"), value: 0, ratio: 0, cliidArr: [] },
        { name: "강원", regex: new RegExp("^강"), value: 0, ratio: 0, cliidArr: [] },
        { name: "충청", regex: new RegExp("^충"), value: 0, ratio: 0, cliidArr: [] },
        { name: "대전", regex: new RegExp("^대전"), value: 0, ratio: 0, cliidArr: [] },
        { name: "세종", regex: new RegExp("^세종"), value: 0, ratio: 0, cliidArr: [] },
        { name: "전라", regex: new RegExp("^전"), value: 0, ratio: 0, cliidArr: [] },
        { name: "경상", regex: new RegExp("^경[상북남]"), value: 0, ratio: 0, cliidArr: [] },
        { name: "제주", regex: new RegExp("^제주"), value: 0, ratio: 0, cliidArr: [] },
        { name: "부산", regex: new RegExp("^부산"), value: 0, ratio: 0, cliidArr: [] },
        { name: "대구", regex: new RegExp("^대구"), value: 0, ratio: 0, cliidArr: [] },
        { name: "울산", regex: new RegExp("^울산"), value: 0, ratio: 0, cliidArr: [] },
        { name: "광주", regex: new RegExp("^광주"), value: 0, ratio: 0, cliidArr: [] },
      ];
      const targetArr = tong.getAddress();
      for (let obj of reports) {
        for (let { cliid, value } of targetArr) {
          if (obj.regex.test(value)) {
            obj.value = obj.value + 1;
            obj.cliidArr.push(cliid);
          }
        }
      }

      let num;
      let cliidArrAll, cliidArrLeft;
      num = 0;
      cliidArrAll = [];
      for (let obj of reports) {
        num = num + obj.value;
        for (let c of obj.cliidArr) {
          cliidArrAll.push(c);
        }
        obj.ratio = RequestsTongFactor.ratioParsing(obj.value / tong.length);
        delete obj.regex;
      }
      cliidArrLeft = [];
      for (let { cliid } of tong) {
        if (!cliidArrAll.includes(cliid)) {
          cliidArrLeft.push(cliid);
        }
      }
      if (cliidArrLeft.length > 0) {
        reports.push({
          name: "알 수 없음",
          value: tong.length - num,
          ratio: RequestsTongFactor.ratioParsing((tong.length - num) / tong.length),
          cliidArr: cliidArrLeft
        });
        throw new Error("problem in address : " + JSON.stringify(cliidArrLeft));
      }
      return { total: tong.length, average: null, detail: reports };
    }

    reportPyeong() {
      const tong = this.tong;
      const reports = [
        { name: "0 ~ 9", from: 0, to: 10, value: 0, ratio: 0, cliidArr: [] },
        { name: "10 ~ 24", from: 10, to: 25, value: 0, ratio: 0, cliidArr: [] },
        { name: "25 ~ 29", from: 25, to: 30, value: 0, ratio: 0, cliidArr: [] },
        { name: "30 ~ 34", from: 30, to: 35, value: 0, ratio: 0, cliidArr: [] },
        { name: "35 ~ 39", from: 35, to: 40, value: 0, ratio: 0, cliidArr: [] },
        { name: "40 ~ 44", from: 40, to: 45, value: 0, ratio: 0, cliidArr: [] },
        { name: "45 ~ 49", from: 45, to: 50, value: 0, ratio: 0, cliidArr: [] },
        { name: "50 ~ ", from: 50, to: 900000000, value: 0, ratio: 0, cliidArr: [] },
      ];
      const targetArr = tong.getPyeong();
      let total = 0;
      for (let { value } of targetArr) {
        total += value;
      }
      for (let obj of reports) {
        for (let { cliid, value } of targetArr) {
          if (obj.from <= value && obj.to > value) {
            obj.value = obj.value + 1;
            obj.cliidArr.push(cliid);
          }
        }
      }
      for (let obj of reports) {
        obj.ratio = RequestsTongFactor.ratioParsing(obj.value / tong.length);
        delete obj.from;
        delete obj.to;
      }
      return { total: tong.length, average: RequestsTongFactor.pyeongParsing(total / tong.length), detail: reports };
    }

    reportLiving() {
      const tong = this.tong;
      const reports = [
        { name: "거주중", boo: true, value: 0, ratio: 0, cliidArr: [] },
        { name: "이사 예정", boo: false, value: 0, ratio: 0, cliidArr: [] },
      ];
      const targetArr = tong.getLiving();
      for (let obj of reports) {
        for (let { cliid, value } of targetArr) {
          if (obj.boo === value) {
            obj.value = obj.value + 1;
            obj.cliidArr.push(cliid);
          }
        }
      }
      for (let obj of reports) {
        obj.ratio = RequestsTongFactor.ratioParsing(obj.value / tong.length);
        delete obj.boo;
      }
      return { total: tong.length, average: null, detail: reports };
    }

    reportContract() {
      const tong = this.tong;
      const reports = [
        { name: "자가", regex: new RegExp("^자"), value: 0, ratio: 0, cliidArr: [] },
        { name: "전월세", regex: new RegExp("^[전월임]"), value: 0, ratio: 0, cliidArr: [] },
      ];
      const targetArr = tong.getContract();
      for (let obj of reports) {
        for (let { cliid, value } of targetArr) {
          if (obj.regex.test(value)) {
            obj.value = obj.value + 1;
            obj.cliidArr.push(cliid);
          }
        }
      }

      let num;
      let cliidArrAll, cliidArrLeft;
      num = 0;
      cliidArrAll = [];
      for (let obj of reports) {
        num = num + obj.value;
        for (let c of obj.cliidArr) {
          cliidArrAll.push(c);
        }
        obj.ratio = RequestsTongFactor.ratioParsing(obj.value / tong.length);
        delete obj.regex;
      }
      cliidArrLeft = [];
      for (let { cliid } of tong) {
        if (!cliidArrAll.includes(cliid)) {
          cliidArrLeft.push(cliid);
        }
      }
      if (cliidArrLeft.length > 0) {
        reports.push({
          name: "알 수 없음",
          value: tong.length - num,
          ratio: RequestsTongFactor.ratioParsing((tong.length - num) / tong.length),
          cliidArr: cliidArrLeft
        });
        throw new Error("problem in contract : " + JSON.stringify(cliidArrLeft));
      }
      return { total: tong.length, average: null, detail: reports };
    }

    reportMovingDay() {
      const valuePasing = function (num) {
        return (((num / 1000) / 60) / 60) / 24;
      }
      const tong = this.tong;
      const reports = [
        { name: "30일 이하", from: 0, to: 30, value: 0, ratio: 0, cliidArr: [] },
        { name: "30일 이상", from: 30, to: 900000000, value: 0, ratio: 0, cliidArr: [] },
      ];
      const targetArr = tong.getMovingDay();
      let total = 0;
      let exceptionList;
      exceptionList = [];
      for (let { value } of targetArr) {
        if (valuePasing(value) > 365) {
          exceptionList.push(valuePasing(value));
        } else {
          total += valuePasing(value);
        }
      }
      for (let obj of reports) {
        for (let { cliid, value } of targetArr) {
          if (obj.from <= valuePasing(value) && obj.to > valuePasing(value)) {
            obj.value = obj.value + 1;
            obj.cliidArr.push(cliid);
          }
        }
      }
      for (let obj of reports) {
        obj.ratio = RequestsTongFactor.ratioParsing(obj.value / tong.length);
        delete obj.from;
        delete obj.to;
      }
      return { total: tong.length, average: RequestsTongFactor.dayParsing(total / (tong.length - exceptionList.length)), detail: reports };
    }

    reportAll() {
      let finalReport, tempObj;

      finalReport = {};

      finalReport.name = this.name;
      finalReport.date = this.date;

      tempObj = this.reportBudget();
      finalReport.total = tempObj.total;
      finalReport.budget = {};
      finalReport.budget.average = tempObj.average;
      finalReport.budget.detail = tempObj.detail;

      tempObj = this.reportAddress();
      finalReport.address = {};
      finalReport.address.average = tempObj.average;
      finalReport.address.detail = tempObj.detail;

      tempObj = this.reportPyeong();
      finalReport.pyeong = {};
      finalReport.pyeong.average = tempObj.average;
      finalReport.pyeong.detail = tempObj.detail;

      tempObj = this.reportLiving();
      finalReport.living = {};
      finalReport.living.average = tempObj.average;
      finalReport.living.detail = tempObj.detail;

      tempObj = this.reportContract();
      finalReport.contract = {};
      finalReport.contract.average = tempObj.average;
      finalReport.contract.detail = tempObj.detail;

      tempObj = this.reportMovingDay();
      finalReport.movingDay = {};
      finalReport.movingDay.average = tempObj.average;
      finalReport.movingDay.detail = tempObj.detail;

      return finalReport;
    }

  }

  class RequestsTong extends Array {

    search(fromToArr) {
      if (!Array.isArray(fromToArr)) {
        throw new Error("input must be array: [ from: Date, to: Date ]");
      } else {
        if (fromToArr.length !== 2) {
          throw new Error("input must be array: [ from: Date, to: Date ]");
        } else {
          const [ from, to ] = fromToArr;
          let tong;
          tong = new RequestsTong();
          for (let i of this) {
            if (i.request.timeline.valueOf() >= from.valueOf()) {
              if (i.request.timeline.valueOf() < to.valueOf()) {
                tong.push(i);
              }
            }
          }
          tong.sort((a, b) => {
            return b.request.timeline.valueOf() - a.request.timeline.valueOf();
          });
          return tong;
        }
      }
    }

    getBudget() {
      let result = new TongReports();
      for (let { cliid, request } of this) {
        result.push(new TongReport(cliid, Number(request.budget.value.replace(/[^0-9]/g, ''))));
      }
      return result;
    }

    getAddress() {
      let result = new TongReports();
      for (let { cliid, request } of this) {
        result.push(new TongReport(cliid, request.space.address.value));
      }
      return result;
    }

    getPyeong() {
      let result = new TongReports();
      for (let { cliid, request } of this) {
        result.push(new TongReport(cliid, request.space.pyeong.value));
      }
      return result;
    }

    getLiving() {
      let result = new TongReports();
      for (let { cliid, request } of this) {
        result.push(new TongReport(cliid, request.space.resident.living));
      }
      return result;
    }

    getContract() {
      let result = new TongReports();
      for (let { cliid, request } of this) {
        result.push(new TongReport(cliid, request.space.contract.value));
      }
      return result;
    }

    getMovingDay() {
      let result = new TongReports();
      for (let { cliid, request } of this) {
        if (request.space.resident.living) {
          result.push(new TongReport(cliid, 0));
        } else {
          if (request.space.resident.expected.getFullYear() > 2000) {
            if (request.space.resident.expected.valueOf() - request.timeline.valueOf() < 0) {
              result.push(new TongReport(cliid, 0));
            } else {
              result.push(new TongReport(cliid, (request.space.resident.expected.valueOf() - request.timeline.valueOf())));
            }
          } else {
            result.push(new TongReport(cliid, 0));
          }
        }
      }
      return result;
    }

  }

  Clients.prototype.getType = function () {
    let arr = new ClientTypes();
    let tempArr;
    for (let i of this) {
      tempArr = i.getType();
      for (let j of tempArr) {
        arr.push(j);
      }
    }
    return arr;
  }

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
    const TABLE_NAME = "client";
    const LONG_TARGETS = [
      "comment"
    ]
    class SqlModel {
      constructor(sample) {
        for (let i in sample) {
          if (typeof sample[i] === "string") {
            this[i] = "VARCHAR(255)";
          } else if (typeof sample[i] === "number") {
            this[i] = "INT(11)";
          } else if (typeof sample[i] === "boolean") {
            this[i] = "INT(11)";
          } else {
            this[i] = "VARCHAR(255)";
          }
          if (LONG_TARGETS.includes(i)) {
            this[i] = "TEXT";
          }
        }
      }

      getName() {
        return TABLE_NAME;
      }

      getCreateSql() {
        let sql = "CREATE TABLE \`" + this.getName() + "\` (";
        sql += "id INT(11) NOT NULL AUTO_INCREMENT,";
        sql += " ";
        for (let i in this) {
          sql += "\`";
          sql += i;
          sql += "\`";
          sql += " ";
          sql += this[i];
          sql += ", ";
        }
        sql += "PRIMARY KEY (id));";
        return sql;
      }

      getDropSql() {
        let sql = "DROP TABLE " + this.getName() + ";";
        return sql;
      }

    }
    class SqlTong extends Array {
      getName() {
        return TABLE_NAME;
      }

      getInsertSql() {
        let arr = [];
        for (let i of this) {
          arr.push(i.getInsertSql());
        }
        return arr;
      }

    }
    class SqlTongFactor {
      constructor(sample) {
        for (let i in sample) {
          if (typeof sample[i] === "string") {
            this[i] = sample[i];
          } else if (typeof sample[i] === "number") {
            this[i] = sample[i];
          } else if (typeof sample[i] === "boolean") {
            if (sample[i]) {
              this[i] = 1;
            } else {
              this[i] = 0;
            }
          } else {
            this[i] = JSON.stringify(sample[i]);
          }
        }
      }

      getName() {
        return TABLE_NAME;
      }

      getInsertSql() {
        let sql = "INSERT INTO \`" + this.getName() + "\` (";
        for (let i in this) {
          sql += "\`";
          sql += i;
          sql += "\`";
          sql += ",";
        }

        sql = sql.slice(0, -1);
        sql += ") VALUES (";

        for (let i in this) {
          if (typeof this[i] === "number") {
            sql += this[i];
          } else {
            if (/^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]$/gi.test(this[i])) {
              sql += "STR_TO_DATE('";
              sql += this[i].replace(/'/g, '"');
              sql += "', '%Y-%m-%d')";
            } else if (/^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9] [0-9][0-9]\:[0-9][0-9]\:[0-9][0-9]$/gi.test(this[i])) {
              sql += "STR_TO_DATE('";
              sql += this[i].replace(/'/g, '"');
              sql += "', '%Y-%m-%d %H:%i:%s')";
            } else {
              sql += "'";
              sql += this[i].replace(/'/g, '"');
              sql += "'";
            }
          }
          sql += ",";
        }

        sql = sql.slice(0, -1);
        sql += ");";

        return sql;
      }
    }

    let tong, tempArr;
    let sample, model;

    tong = new SqlTong();

    for (let i of this) {
      tempArr = i.dimensionSqueeze();
      for (let j of tempArr) {
        tong.push(new SqlTongFactor(j));
      }
    }

    if (tong.length > 0) {
      sample = tong[0];
      model = new SqlModel(sample);
      return { model, data: tong };
    } else {
      return null;
    }
  }

  Clients.prototype.getRequestsTong = function () {
    let tong, tempArr;
    tong = new RequestsTong();
    for (let i of this) {
      tempArr = i.requests;
      for (let j = 0; j < tempArr.length; j++) {
        tempArr[j].cliid = i.cliid;
        tempArr[j].name = i.name;
        tempArr[j].phone = i.phone;
        tempArr[j].index = j;
        tong.push(tempArr[j]);
      }
    }
    tong.sort((a, b) => {
      return b.request.timeline.valueOf() - a.request.timeline.valueOf();
    });
    return tong;
  }

  Clients.prototype.getRequestsTongsMonthly = function () {
    const today = new Date();
    const minimum = new Date(2019, 2, 1);
    if (today.valueOf() < minimum.valueOf()) {
      throw new Error("invaild date");
    }
    let tongs, tong, tongChild;
    let searchTargets;
    let monthNumber, monthConst;
    let tempObj, tempDateFrom, tempDateTo;

    monthNumber = ((today.getFullYear() * 12) + (today.getMonth() + 1)) - ((minimum.getFullYear() * 12) + (minimum.getMonth() + 1));
    monthConst = 1000 * 60 * 60 * 24 * 32;

    searchTargets = [];
    tempDateFrom = new Date(minimum.valueOf());
    tempDateFrom.setDate(1);
    tempDateTo = new Date(tempDateFrom.valueOf() + monthConst);
    tempDateTo.setDate(1);
    searchTargets.push([ tempDateFrom, tempDateTo ]);

    for (let i = 0; i < monthNumber; i++) {
      tempDateFrom = new Date(tempDateFrom.valueOf() + monthConst);
      tempDateFrom.setDate(1);
      tempDateTo = new Date(tempDateFrom.valueOf() + monthConst);
      tempDateTo.setDate(1);
      searchTargets.push([ tempDateFrom, tempDateTo ]);
    }

    tong = this.getRequestsTong();
    tongs = new RequestsTongs();
    for (let [ from, to ] of searchTargets) {
      tongChild = tong.search([ from, to ]);
      tongs.push(new RequestsTongFactor({ name: `${String(from.getFullYear()).slice(2)}년 ${String(from.getMonth() + 1)}월`, date: from, tong: tongChild }));
    }

    tongs.sort((a, b) => {
      return b.date.valueOf() - a.date.valueOf();
    });

    return tongs;
  }

  Clients.prototype.search = function (cliid) {
    let result = null;
    for (let i of this) {
      if (i.cliid === cliid) {
        result = i;
        break;
      }
    }
    return result;
  }

  Clients.prototype.find = function (cliid) {
    return this.search(cliid);
  }

  Clients.prototype.pick = function (cliid) {
    return this.search(cliid);
  }

  return Clients;
}

const Tools = function () {}
Tools.withTools = withTools;
Tools.withToolsArr = withToolsArr;

module.exports = { Tools };
