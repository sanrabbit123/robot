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

  getProposals() {
    let tong;
    tong = [];
    for (let i of this) {
      for (let j of i.proposal.detail) {
        j.proid = i.proid;
        j.cliid = i.cliid;
        j.service = i.service;
        tong.push(j);
      }
    }
    return tong;
  }

  getFees() {
    let tong;
    class Fees extends Array {
      online() {
        let tong = new Fees();
        for (let i of this) {
          if (i.method === "online") {
            tong.push(i);
          }
        }
        return tong;
      }
      offline() {
        let tong = new Fees();
        for (let i of this) {
          if (i.method === "offline") {
            tong.push(i);
          }
        }
        return tong;
      }
    }

    tong = new Fees();
    for (let i of this) {
      for (let j of i.proposal.detail) {
        for (let k of j.fee) {
          k.proid = i.proid;
          k.cliid = i.cliid;
          k.desid = j.desid;
          tong.push(k);
        }
      }
    }
    return tong;
  }

  proceedFilter() {
    let arr;
    arr = new Projects();
    for (let i of this) {
      if (i.desid !== "") {
        arr.push(i);
      }
    }
    return arr;
  }

}

const withTools = function (Project) {

  const QueryString = require("querystring");

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
      } else if (/^3/.test(dayString)) {
        dayString = '예정';
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
      historyArr.reverse();
      for (let { date, who } of historyArr) {
        totalString += dateToString(date) + ", ";
      }
      if (totalString !== '') {
        totalString = totalString.slice(0, -2);
      }
      return totalString;
    }
    const discountToString = function (discount, supply, consumer) {
      const autoComma = function (str) {
        let minus;
        let count, countArr;
        let temp, tempArr;
        if (typeof str === "number") {
          str = String(Math.floor(str));
        }
        if (/e/gi.test(str)) {
          throw new Error("is too heavy");
        }
        minus = /\-/g.test(str) ? /\-/g.exec(str)[0] : '';
        str = str.replace(/[^0-9]/g, '');
        if (str === '') {
          throw new Error("invaild number");
        }
        count = Math.ceil(str.length / 3);
        countArr = [];
        for (let i = 0; i < count; i++) {
          countArr.push([ 3 * i, 3 * (i + 1) ]);
        }
        if (countArr.length === 0) {
          throw new Error("invaild number");
        }
        tempArr = [];
        for (let arr of countArr) {
          temp = '';
          for (let i = arr[0]; i < arr[1]; i++) {
            if (str.length - 1 - i < 0) {
              temp += '';
            } else {
              temp = str[str.length - 1 - i] + temp;
            }
          }
          if (temp !== '') {
            tempArr.unshift(temp);
          }
        }
        return (minus + tempArr.join(','));
      }
      const supplyDiscount = (supply / (1 - discount)) - supply;
      const consumerDiscount = (consumer / (1 - discount)) - consumer;
      return `${String(Math.floor(discount * 100))}% (${autoComma(supplyDiscount)}원/${autoComma(consumerDiscount)}원)`;
    }

    let tong = [];
    let temp;
    let proposalDetailLength, proposalAverage;

    const { proid, cliid, desid, service: { serid, xValue, online } } = project;
    const { date: proposalDate, detail: proposalDetail } = project.proposal;
    const { status, action, outreason, call: { next, history: callHistory }, contract: { first: { guide: firstGuide, date: firstDate, cancel: firstCancel, calculation: { amount: firstAmount, info: firstInfo, refund: firstRefund, } }, remain: { guide: remainGuide, date: remainDate, cancel: remainCancel, calculation: { amount: { supply: remainSupply, vat: remainVat, consumer: remainConsumer }, info: remainInfo, refund: remainRefund, discount: remainDiscount } }, form: { guide: formGuide, date: { from: formDateFrom, to: formDateTo, cancel: formDateCancel, } }, meeting: { date: meetingDate } }, calculation: { method, percentage, info: calculationInfo, payments: { totalAmount: paymentsTotalAmount, first: { amount: paymentsFirstAmount, date: paymentsFirstDate, cancel: paymentsFirstCancel, refund: paymentsFirstRefund, }, remain: { amount: paymentsRemainAmount, date: paymentsRemainDate, cancel: paymentsRemainCancel, refund: paymentsRemainRefund, } } } } = project.process;
    const { photo: { boo: photoBoo, status: photoStatus, date: contentsPhotoDate, info: { photographer, interviewer } }, raw: { portfolio: { status: rawPortfolioStatus }, interview: { status: rawInterviewStatus }, photo: { status: rawPhotoStatus } }, share: { client: { photo: shareClientPhoto, contents: shareClientContents }, designer: { photo: shareDesignerPhoto, contents: shareDesignerContents } } } = project.contents;

    proposalDetailLength = proposalDetail.length;
    proposalAverage = 0;
    for (let i = 0; i < proposalDetailLength; i++) {
      proposalAverage += proposalDetail[i].fee[0].amount;
    }
    if (proposalDetailLength !== 0) {
      proposalAverage = Math.round(Math.round(proposalAverage / proposalDetailLength) / 1000) * 1000;
    }

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
      discount: discountToString(remainDiscount, remainSupply, remainConsumer),
      discountDesigner: discountToString(remainDiscount, remainSupply, remainConsumer),
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
      proposalDate: dateToString(proposalDate),
      proposalDesigner0: (proposalDetailLength > 0 ? proposalDetail[0].desid : ''),
      proposalFee0: (proposalDetailLength > 0 ? proposalDetail[0].fee[0].amount : 0),
      proposalDesigner1: (proposalDetailLength > 1 ? proposalDetail[1].desid : ''),
      proposalFee1: (proposalDetailLength > 1 ? proposalDetail[1].fee[0].amount : 0),
      proposalDesigner2: (proposalDetailLength > 2 ? proposalDetail[2].desid : ''),
      proposalFee2: (proposalDetailLength > 2 ? proposalDetail[2].fee[0].amount : 0),
      proposalDesigner3: (proposalDetailLength > 3 ? proposalDetail[3].desid : ''),
      proposalFee3: (proposalDetailLength > 3 ? proposalDetail[3].fee[0].amount : 0),
      proposalDesigner4: (proposalDetailLength > 4 ? proposalDetail[4].desid : ''),
      proposalFee4: (proposalDetailLength > 4 ? proposalDetail[4].fee[0].amount : 0),
      proposalDesigner5: (proposalDetailLength > 5 ? proposalDetail[5].desid : ''),
      proposalFee5: (proposalDetailLength > 5 ? proposalDetail[5].fee[0].amount : 0),
      proposalDesigner6: (proposalDetailLength > 6 ? proposalDetail[6].desid : ''),
      proposalFee6: (proposalDetailLength > 6 ? proposalDetail[6].fee[0].amount : 0),
      proposalDesigner7: (proposalDetailLength > 7 ? proposalDetail[7].desid : ''),
      proposalFee7: (proposalDetailLength > 7 ? proposalDetail[7].fee[0].amount : 0),
      proposalDesigner8: (proposalDetailLength > 8 ? proposalDetail[8].desid : ''),
      proposalFee8: (proposalDetailLength > 8 ? proposalDetail[8].fee[0].amount : 0),
      proposalDesigner9: (proposalDetailLength > 9 ? proposalDetail[9].desid : ''),
      proposalFee9: (proposalDetailLength > 9 ? proposalDetail[9].fee[0].amount : 0),
      proposalAverage,
    };

    tong.push(temp);

    return tong;
  }

  Project.prototype.planeDeath = function () {
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
      } else if (/^3/.test(dayString)) {
        dayString = '예정';
      }

      return dayString;
    }

    let tong = [];
    let temp;

    const { proid, cliid, desid } = project;
    const { status, action } = project.process;
    const { photo: { boo: photoBoo, status: photoStatus, date: contentsPhotoDate, info: { photographer, interviewer } }, raw: { portfolio: { status: rawPortfolioStatus, link: rawPortfolioLink }, interview: { status: rawInterviewStatus, link: rawInterviewLink }, photo: { status: rawPhotoStatus, link: rawPhotoLink } }, share: { client: { photo: shareClientPhoto, contents: shareClientContents }, designer: { photo: shareDesignerPhoto, contents: shareDesignerContents } } } = project.contents;

    temp = {};

    temp.standard = {
      proid
    };

    temp.middle = {
      cliid,
      desid,
    };

    temp.info = {
      status,
      action,
      photoBoo,
      photoStatus,
      contentsPhotoDate: dateToString(contentsPhotoDate),
      photographer,
      interviewer,
      rawPortfolioStatus,
      rawPortfolioLink: QueryString.escape(rawPortfolioLink),
      rawInterviewStatus,
      rawInterviewLink: QueryString.escape(rawInterviewLink),
      rawPhotoStatus,
      rawPhotoLink: QueryString.escape(rawPhotoLink),
      shareClientPhoto: dateToString(shareClientPhoto),
      shareClientContents: dateToString(shareClientContents),
      shareDesignerPhoto: dateToString(shareDesignerPhoto),
      shareDesignerContents: dateToString(shareDesignerContents),
    };

    tong.push(temp);

    return tong;
  }

  Project.prototype.dimensionSqueeze = function () {
    const tong = this.flatDeath();
    let result, tempObj;

    result = [];
    for (let { standard, middle, info } of tong) {
      tempObj = {};
      for (let i in standard) {
        tempObj[i] = standard[i];
      }
      for (let i in middle) {
        tempObj[i] = middle[i];
      }
      for (let i in info) {
        tempObj[i] = info[i];
      }
      result.push(tempObj);
    }

    return result;
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

  Projects.prototype.planeDeath = function () {
    let tong, tempArr;
    tong = [];
    for (let i of this) {
      tempArr = i.planeDeath();
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

  Projects.prototype.dimensionSqueeze = function () {
    const TABLE_NAME = "project";
    const LONG_TARGETS = [];
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

  Projects.prototype.search = function (proid) {
    let result = null;
    for (let i of this) {
      if (i.proid === proid) {
        result = i;
        break;
      }
    }
    return result;
  }
  
  Projects.prototype.searchByCliid = function (cliid, isContract = false) {
    if (cliid === undefined) {
      throw new Error("must be cliid");
    }
    let result = null;
    let final = null;
    if (!isContract) {
      for (let i of this) {
        if (i.cliid === cliid) {
          result = i;
          break;
        }
      }
      return result;
    } else {
      result = [];
      for (let i of this) {
        if (/^d/.test(i.desid)) {
          if (i.cliid === cliid) {
            result.push(i);
          }
        }
      }
      final = [];
      for (let i of result) {
        if (i.process.contract.first.date.valueOf() > (new Date(2000, 0, 1).valueOf())) {
          final.push(i);
        }
      }
      return final;
    }
  }
  return Projects;
}

const Tools = function () {}
Tools.withTools = withTools;
Tools.withToolsArr = withToolsArr;

module.exports = { Project, Projects, Tools };
