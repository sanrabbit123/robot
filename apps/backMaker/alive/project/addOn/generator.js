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

const widthTools = function (Project) {

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

    let tong = [];
    let temp;

    const { proid, cliid, desid, service: { serid, xValue, online } } = project;
    const { status, contract: { first: { guide: firstGuide, date: firstDate, calculation: { amount: firstAmount, info: firstInfo } }, remain: { guide: remainGuide, date: remainDate, calculation: { amount: { supply: remainSupply, vat: remainVat, consumer: remainConsumer }, info: remainInfo } }, form: { guide: formGuide, date: { from: formDateFrom, to: formDateTo } }, meeting: { date: meetingDate } }, calculation: { method, percentage, info: calculationInfo, payments: { totalAmount: paymentsTotalAmount, first: { amount: paymentsFirstAmount, date: paymentsFirstDate }, remain: { amount: paymentsRemainAmount, date: paymentsRemainDate } } } } = project.process;
    const { photo: { date: contentsPhotoDate, info: { photographer, interviewer } } } = project.contents;

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
      firstGuide: dateToString(firstGuide),
      firstDate: dateToString(firstDate),
      firstAmount: String(firstAmount),
      firstInfo: infoToString(firstInfo),
      remainGuide: dateToString(remainGuide),
      remainDate: dateToString(remainDate),
      remainSupply: String(remainSupply),
      remainVat: String(remainVat),
      remainConsumer: String(remainConsumer),
      remainInfo: infoToString(remainInfo),
      formGuide: dateToString(formGuide),
      formDateFrom: dateToString(formDateFrom),
      formDateTo: dateToString(formDateTo),
      meetingDate: dateToString(meetingDate, true),
      method,
      percentage: String(percentage),
      calculationInfo: infoToString(calculationInfo),
      paymentsTotalAmount: String(paymentsTotalAmount),
      paymentsFirstAmount: String(paymentsFirstAmount),
      paymentsFirstDate: dateToString(paymentsFirstDate),
      paymentsRemainAmount: String(paymentsRemainAmount),
      paymentsRemainDate: dateToString(paymentsRemainDate),
      contentsPhotoDate: dateToString(contentsPhotoDate),
      photographer,
      interviewer
    };

    tong.push(temp);

    return tong;
  }

  return Project;
}

const widthToolsArr = function (Projects) {

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

  return Projects;
}

const Tools = function () {}
Tools.widthTools = widthTools;
Tools.widthToolsArr = widthToolsArr;

module.exports = { Project, Projects, Tools };
