const DESIGNER_DIR = process.cwd() + "/apps/backMaker/alive/designer";
const Designer = require(DESIGNER_DIR + "/designer.js");

class Designers extends Array {

  toNormal() {
    let tong;
    tong = [];
    for (let i of this) {
      tong.push(i.toNormal());
    }
    return tong;
  }

  frontMode() {
    let tong;
    tong = [];
    for (let i of this) {
      tong.push(i.frontMode());
    }
    return tong;
  }

}

const withTools = function (Designer) {

  Designer.prototype.flatDeath = function () {
    const designer_raw = this.toNormal();
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
    const snsSplit = function (snsArr) {
      let result = '';
      for (let { kind, href } of snsArr) {
        result += kind + " " + href;
        result += " / ";
      }
      result = result.slice(0, -3);
      return result;
    }
    const accountSplit = function (accountArr) {
      let result = '';
      for (let { bankName, accountNumber, to } of accountArr) {
        result += bankName + " " + accountNumber + " " + to;
        result += " / ";
      }
      result = result.slice(0, -3);
      return result;
    }

    let tong = [];
    let temp;

    const { designer, desid } = designer_raw;
    const { contract: { status, date }, phone, email, did, address, personalSystem: { showRoom, webPage, sns }, business: { career, account, businessInfo: { classification, businessNumber, files }, service: { cost: { percentage }, construct: { partner, method } } } } = designer_raw.information;

    temp = {};
    temp.standard = {
      desid,
      designer
    };
    temp.info = {
      status,
      date: dateToString(date),
      phone,
      email,
      did,
      address: address.join(", "),
      showRoom: String(showRoom),
      webPage: webPage.join(", "),
      sns: snsSplit(sns),
      career: (String(career.startY) + '년' + ' ' + String(career.startM) + '월'),
      account: accountSplit(account),
      classification,
      businessNumber,
      files: ((files.businessRegistration ? '사업자등록증 유' : '사업자등록증 무') + " / " + (files.bankBook ? '통장사본 유' : '통장사본 무') + " / " + (files.registrationCard ? '신분증사본 유' : '신분증사본 무')),
      percentage: String(percentage),
      partner,
      method
    }
    tong.push(temp);

    return tong;
  }

  Designer.prototype.dimensionSqueeze = function () {
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

  return Designer;
}

const withToolsArr = function (Designers) {

  Designers.prototype.flatDeath = function () {
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

  Designers.prototype.dimensionSqueeze = function () {
    const TABLE_NAME = "designer";
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

  Designers.prototype.search = function (desid) {
    let result = null;
    for (let i of this) {
      if (i.desid === desid) {
        result = i;
        break;
      }
    }
    return result;
  }

  Designers.prototype.pick = function (desid) {
    return this.search(desid);
  }

  return Designers;
}

const Tools = function () {}
Tools.withTools = withTools;
Tools.withToolsArr = withToolsArr;

module.exports = { Designer, Designers, Tools };
