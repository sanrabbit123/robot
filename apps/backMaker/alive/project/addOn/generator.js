const PROJECT_DIR = process.cwd() + "/apps/backMaker/alive/project";
const Project = require(PROJECT_DIR + "/project.js");

class Projects extends Array {

  toNormal() {
    let tong;
    tong = [];
    for (let i of this) {
      tong.push(i.toNormal());
    }
    return tong;
  }

}

const withTools = function (Project) {

  Project.prototype.flatDeath = function () {
    const project = this.toNormal();
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
    const infoToString = function (infoObj) {
      const { proof, to } = infoObj;
      let target, wording, result;
      if (infoObj.account === undefined) {
        target = infoObj.method;
        wording = "결제방법";
      } else {
        target = infoObj.account;
        wording = "계좌번호";
      }
      result = wording + ' ' + target + " / " + "수신자" + ' ' + to + " / " + "증빙" + ' ' + proof;
      return result;
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

    const { proid, cliid, desid, service: { serid, xValue, online } } = project;
    const { status, action, outreason, outspot, call: { next, history: callHistory }, contract: { first: { guide: firstGuide, date: firstDate, cancel: firstCancel, calculation: { amount: firstAmount, info: firstInfo, refund: firstRefund, } }, remain: { guide: remainGuide, date: remainDate, cancel: remainCancel, calculation: { amount: { supply: remainSupply, vat: remainVat, consumer: remainConsumer }, info: remainInfo, refund: remainRefund, } }, form: { guide: formGuide, date: { from: formDateFrom, to: formDateTo, cancel: formDateCancel, } }, meeting: { date: meetingDate } }, calculation: { method, percentage, info: calculationInfo, payments: { totalAmount: paymentsTotalAmount, first: { amount: paymentsFirstAmount, date: paymentsFirstDate, cancel: paymentsFirstCancel, refund: paymentsFirstRefund, }, remain: { amount: paymentsRemainAmount, date: paymentsRemainDate, cancel: paymentsRemainCancel, refund: paymentsRemainRefund, } } } } = project.process;
    const { photo: { boo: photoBoo, status: photoStatus, date: contentsPhotoDate, info: { photographer, interviewer } }, raw: { portfolio: { status: rawPortfolioStatus }, interview: { status: rawInterviewStatus }, photo: { status: rawPhotoStatus } }, share: { client: { photo: shareClientPhoto, contents: shareClientContents }, designer: { photo: shareDesignerPhoto, contents: shareDesignerContents } } } = project.contents;

    temp = {};

    temp.standard = {
      proid
    };

    temp.middle = {
      cliid,
      desid,
      serid,
      xValue,
      online
    };

    temp.info = {
      status,
      action,
      next: dateToString(next),
      callHistory: callHistoryToString(callHistory),
      firstDate: dateToString(firstDate),
      firstCancel: dateToString(firstCancel),
      firstAmount: String(firstAmount),
      firstInfo: infoToString(firstInfo),
      firstRefund: String(firstRefund),
      remainDate: dateToString(remainDate),
      remainCancel: dateToString(remainCancel),
      remainSupply: String(remainSupply),
      remainVat: String(remainVat),
      remainConsumer: String(remainConsumer),
      remainPure: String(remainConsumer - firstAmount),
      remainInfo: infoToString(remainInfo),
      remainRefund: String(remainRefund),
      formDateFrom: dateToString(formDateFrom),
      formDateTo: dateToString(formDateTo),
      formDateCancel: dateToString(formDateCancel),
      meetingDate: dateToString(meetingDate, true),
      method,
      percentage: String(percentage),
      calculationInfo: infoToString(calculationInfo),
      paymentsTotalAmount: String(paymentsTotalAmount),
      paymentsFirstAmount: String(paymentsFirstAmount),
      paymentsFirstDate: dateToString(paymentsFirstDate),
      paymentsFirstCancel: dateToString(paymentsFirstCancel),
      paymentsFirstRefund: String(paymentsFirstRefund),
      paymentsRemainAmount: String(paymentsRemainAmount),
      paymentsRemainDate: dateToString(paymentsRemainDate),
      paymentsRemainCancel: dateToString(paymentsRemainCancel),
      paymentsRemainRefund: String(paymentsRemainRefund),
      photoStatus,
      contentsPhotoDate: dateToString(contentsPhotoDate),
    };

    tong.push(temp);

    return tong;
  }

  const Average = function (obj) {
    this.proid = obj.proid;
    this.cliid = obj.cliid;
    this.average = obj.average;
    this.averageRaw = obj.averageRaw;
    this.contract = obj.contract;
    this.length = obj.length;
  }

  Project.prototype.returnAverage = function () {
    const moneyParsing = function (num) {
      let str = String(Math.round(num));
      if (str.length > 3) {
        str = str.slice(0, -3) + ',' + str.slice(-3);
      }
      return `${str}만원`;
    }
    let result, total, pageNumber;

    total = 0;
    pageNumber = 0;
    for (let { fee } of this.proposal.detail) {
      for (let { amount } of fee) {
        total += amount;
        pageNumber++;
      }
    }

    result = {
      proid: this.proid,
      cliid: this.cliid,
      average: moneyParsing((total / pageNumber) / 10000),
      averageRaw: total / pageNumber,
      contract: (/^d/.test(this.desid) && this.process.status !== "드랍" && this.process.status !== "홀딩"),
      length: pageNumber,
    };

    return new Average(result);
  }

  return Project;
}

const withToolsArr = function (Projects) {

  class AverageTong extends Array {
    averageReport() {
      const moneyParsing = function (num) {
        let str = String(Math.round(num));
        if (str.length > 3) {
          str = str.slice(0, -3) + ',' + str.slice(-3);
        }
        return `${str}만원`;
      }
      let result, total, contractNum, contractProposalTotal;
      let proidArr, cliidArr;

      total = 0;
      contractNum = 0;
      contractProposalTotal = 0;
      proidArr = [];
      cliidArr = [];

      for (let { proid, cliid, averageRaw, contract } of this) {
        total += averageRaw;
        if (contract) {
          contractNum++;
          contractProposalTotal += averageRaw;
        }
        proidArr.push(proid);
        cliidArr.push(cliid);
      }

      result = { proidArr, cliidArr };
      result.proposal = proidArr.length;
      result.contract = contractNum;
      result.average = {};
      if (this.length === 0) {
        result.average.proposal = "0만원";
      } else {
        result.average.proposal = moneyParsing((total / this.length) / 10000)
      }
      if (contractNum === 0) {
        result.average.contract = "0만원";
      } else {
        result.average.contract = moneyParsing((contractProposalTotal / contractNum) / 10000);
      }

      return result;
    }
  }

  Projects.prototype.flatDeath = function () {
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

  Projects.prototype.returnAverage = function () {
    let tong, tempArr;
    tong = new AverageTong();
    for (let i of this) {
      tong.push(i.returnAverage());
    }
    return tong;
  }

  return Projects;
}

const Tools = function () {}
Tools.withTools = withTools;
Tools.withToolsArr = withToolsArr;

module.exports = { Project, Projects, Tools };
