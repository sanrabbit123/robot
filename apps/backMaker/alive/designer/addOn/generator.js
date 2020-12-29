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

}

const widthTools = function (Designer) {

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
    const { contract: { status, date }, phone, email, address, personalSystem: { showRoom, webPage, sns }, business: { career, account, businessInfo: { classification, businessNumber, files }, service: { cost: { percentage }, construct: { partner, method } } } } = designer_raw.information;

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

  return Designer;
}

const widthToolsArr = function (Designers) {

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

  return Designers;
}

const Tools = function () {}
Tools.widthTools = widthTools;
Tools.widthToolsArr = widthToolsArr;

module.exports = { Designer, Designers, Tools };
