const PROJECT_DIR = process.cwd() + "/apps/backMaker/alive/aspirant";
const Aspirant = require(PROJECT_DIR + "/aspirant.js");

class Aspirants extends Array {

  toNormal() {
    let tong;
    tong = [];
    for (let i of this) {
      tong.push(i.toNormal());
    }
    return tong;
  }

  meetingAlarm() {
    let arr;
    arr = [];
    for (let i of this) {
      if (i.meetingAlarm() !== null) {
        arr.push(i.meetingAlarm());
      }
    }
    arr.sort((a, b) => {
      return a.date.valueOf() - b.date.valueOf();
    });
    return arr;
  }

}

const withTools = function (Aspirant) {

  Aspirant.prototype.flatDeath = function (mode = "total") {
    const aspirant = this.toNormal();
    const dateToStringDay = function (dateObject) {
      const dayConvert = [
        "일요일",
        "월요일",
        "화요일",
        "수요일",
        "목요일",
        "금요일",
        "토요일"
      ];
      return `${String(dateObject.getMonth() + 1)}월 ${String(dateObject.getDate())}일 ${dayConvert[dateObject.getDay()]} ${String(dateObject.getHours())}시`;
    };
    const dateToString = function (str) {
      const zeroAddition = function (num) {
        if (num < 10) {
          return `0${String(num)}`;
        } else {
          return String(num);
        }
      }
      let date;
      date = new Date(str);
      return `${String(date.getFullYear())}-${zeroAddition(date.getMonth() + 1)}-${zeroAddition(date.getDate())} ${zeroAddition(date.getHours())}:${zeroAddition(date.getMinutes())}:${zeroAddition(date.getSeconds())}`;
    }
    let tempObj;

    tempObj = {};

    if (mode === "total") {
      tempObj.designer = aspirant.designer;
      tempObj.phone = aspirant.phone;
      tempObj.status = aspirant.meeting.status;
      tempObj.meetingTime = (!/^조정/.test(aspirant.meeting.status)) ? dateToStringDay(aspirant.meeting.date) : "기타";
      tempObj.date = dateToString(aspirant.submit.firstRequest.date);
      tempObj.presentationBoo = aspirant.submit.presentation.boo;
      tempObj.partnershipBoo = aspirant.submit.partnership.boo;
      tempObj.portfolioBoo = (aspirant.portfolio.length > 0);
      tempObj.webChannel = aspirant.information.channel.web.join(',');;
      tempObj.snsChannel = aspirant.information.channel.sns.join(',');;
      tempObj.cloudChannel = aspirant.information.channel.cloud.join(',');;
      tempObj.comeFrom = aspirant.submit.comeFrom;
      tempObj.email = aspirant.email;
      tempObj.address = aspirant.address;
      tempObj.classification = aspirant.information.company.classification;
      tempObj.company = aspirant.information.company.name;
      tempObj.businessNumber = aspirant.information.company.businessNumber;
      tempObj.startDate = dateToString(aspirant.information.company.start).slice(0, 10);
      tempObj.representative = aspirant.information.company.representative;
      tempObj.bankName = aspirant.information.account.bank;
      tempObj.bankAccount = aspirant.information.account.number;
      tempObj.bankTo = aspirant.information.account.to;
      tempObj.bankEtc = aspirant.information.account.etc;
      tempObj.interiorCareer = String(aspirant.information.career.interior.year) + '년 ' + String(aspirant.information.career.interior.month) + '개월';
      tempObj.stylingCareer = String(aspirant.information.career.styling.year) + '년 ' + String(aspirant.information.career.styling.month) + '개월';
      tempObj.careerDetail = aspirant.information.career.detail;

      tempObj.binary = (aspirant.portfolio.length > 0);
      tempObj.folderId = null;
      tempObj.portfolioConfirms = JSON.stringify([]);
      if (aspirant.portfolio.length > 0) {
        tempObj.folderId = aspirant.portfolio[0].folderId;
        tempObj.portfolioConfirms = JSON.stringify(aspirant.portfolio[0].confirm);
      }
      tempObj.relation = aspirant.submit.partnership.boo;
      if (!tempObj.binary) {
        for (let i of aspirant.information.channel.web) {
          tempObj.binary = true;
          tempObj.portfolioBoo = true;
          tempObj.folderId = "__link__" + i.replace(/[\&\=]/g, '');
        }
        for (let i of aspirant.information.channel.sns) {
          tempObj.binary = true;
          tempObj.portfolioBoo = true;
          tempObj.folderId = "__link__" + i.replace(/[\&\=]/g, '');
        }
        for (let i of aspirant.information.channel.cloud) {
          tempObj.binary = true;
          tempObj.portfolioBoo = true;
          tempObj.folderId = "__link__" + i.replace(/[\&\=]/g, '');
        }
      }
      tempObj.presentationBoo = tempObj.presentationBoo ? "신청" : "미신청";
      tempObj.partnershipBoo = tempObj.partnershipBoo ? "신청" : "미신청";
      tempObj.portfolioBoo = tempObj.portfolioBoo ? "제출" : "미제출";

      return tempObj;
    } else if (mode === "presentation") {

      if (!aspirant.submit.presentation.boo) {
        return null;
      }

      tempObj.date = dateToString(aspirant.submit.presentation.date);
      tempObj.designer = aspirant.designer;
      tempObj.phone = aspirant.phone;
      tempObj.email = aspirant.email;
      tempObj.address = aspirant.address;
      tempObj.status = aspirant.meeting.status;
      tempObj.presentationTimes = (!/^조정/.test(aspirant.meeting.status)) ? dateToStringDay(aspirant.meeting.date) : "기타";
      tempObj.comeFrom = aspirant.submit.comeFrom;
      tempObj.webChannel = aspirant.information.channel.web.join(',');;
      tempObj.snsChannel = aspirant.information.channel.sns.join(',');;
      tempObj.cloudChannel = aspirant.information.channel.cloud.join(',');;

      tempObj.binary = (aspirant.portfolio.length > 0);
      tempObj.folderId = null;
      if (aspirant.portfolio.length > 0) {
        tempObj.folderId = aspirant.portfolio[0].folderId;
      }
      tempObj.relation = aspirant.submit.partnership.boo;
      if (!tempObj.binary) {
        for (let i of aspirant.information.channel.web) {
          tempObj.binary = true;
          tempObj.folderId = "__link__" + i.replace(/[\&\=]/g, '');
        }
        for (let i of aspirant.information.channel.sns) {
          tempObj.binary = true;
          tempObj.folderId = "__link__" + i.replace(/[\&\=]/g, '');
        }
        for (let i of aspirant.information.channel.cloud) {
          tempObj.binary = true;
          tempObj.folderId = "__link__" + i.replace(/[\&\=]/g, '');
        }
      }

    } else if (mode === "partnership") {

      if (!aspirant.submit.partnership.boo) {
        return null;
      }

      tempObj.date = dateToString(aspirant.submit.partnership.date);
      tempObj.designer = aspirant.designer;
      tempObj.phone = aspirant.phone;
      tempObj.email = aspirant.email;
      tempObj.address = aspirant.address;

      tempObj.status = aspirant.meeting.status;
      tempObj.meetingTime = (!/^조정/.test(aspirant.meeting.status)) ? dateToStringDay(aspirant.meeting.date) : "기타";

      tempObj.classification = aspirant.information.company.classification;
      tempObj.company = aspirant.information.company.name;
      tempObj.businessNumber = aspirant.information.company.businessNumber;
      tempObj.startDate = dateToString(aspirant.information.company.start).slice(0, 10);
      tempObj.representative = aspirant.information.company.representative;
      tempObj.bankName = aspirant.information.account.bank;
      tempObj.bankAccount = aspirant.information.account.number;
      tempObj.bankTo = aspirant.information.account.to;
      tempObj.bankEtc = aspirant.information.account.etc;
      tempObj.interiorCareer = String(aspirant.information.career.interior.year) + '년 ' + String(aspirant.information.career.interior.month) + '개월';
      tempObj.stylingCareer = String(aspirant.information.career.styling.year) + '년 ' + String(aspirant.information.career.styling.month) + '개월';
      tempObj.careerDetail = aspirant.information.career.detail;

      tempObj.comeFrom = aspirant.submit.comeFrom;
      tempObj.webChannel = aspirant.information.channel.web.join(',');;
      tempObj.snsChannel = aspirant.information.channel.sns.join(',');;
      tempObj.cloudChannel = aspirant.information.channel.cloud.join(',');;

      tempObj.binary = (aspirant.portfolio.length > 0);
      tempObj.folderId = null;
      if (aspirant.portfolio.length > 0) {
        tempObj.folderId = aspirant.portfolio[0].folderId;
      }
      tempObj.relation = aspirant.submit.partnership.boo;
      if (!tempObj.binary) {
        for (let i of aspirant.information.channel.web) {
          tempObj.binary = true;
          tempObj.folderId = "__link__" + i.replace(/[\&\=]/g, '');
        }
        for (let i of aspirant.information.channel.sns) {
          tempObj.binary = true;
          tempObj.folderId = "__link__" + i.replace(/[\&\=]/g, '');
        }
        for (let i of aspirant.information.channel.cloud) {
          tempObj.binary = true;
          tempObj.folderId = "__link__" + i.replace(/[\&\=]/g, '');
        }
      }

    }

    return tempObj;
  }

  Aspirant.prototype.dimensionSqueeze = function () {
    const tong = JSON.parse(JSON.stringify(this.flatDeath()));
    let result;

    result = [];

    delete tong.portfolioConfirms;
    if (/^__link__/.test(tong.folderId)) {
      tong.folderId = tong.folderId.slice(8);
    }
    tong.aspirantBinary = tong.binary;
    delete tong.binary;

    result.push(tong);

    return result;
  }

  return Aspirant;
}

const withToolsArr = function (Aspirants) {

  Aspirants.prototype.flatDeath = function () {
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

  Aspirants.prototype.dimensionSqueeze = function () {
    const TABLE_NAME = "aspirant";
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
            sql += "'";
            sql += this[i].replace(/'/g, '"');
            sql += "'";
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

  Aspirants.prototype.search = function (aspid) {
    let result = null;
    for (let i of this) {
      if (i.aspid === aspid) {
        result = i;
        break;
      }
    }
    return result;
  }

  Aspirants.prototype.find = function (aspid) {
    return this.search(aspid);
  }

  return Aspirants;
}

const Tools = function () {}
Tools.withTools = withTools;
Tools.withToolsArr = withToolsArr;

module.exports = { Aspirant, Aspirants, Tools };
