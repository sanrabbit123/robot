const DESIGNER_DIR = process.cwd() + "/apps/backMaker/alive/designer";
const Designer = require(DESIGNER_DIR + "/designer.js");

class Designers extends Array {

}

const widthTools = function (Designer) {

  Designer.prototype.flatDeath = function () {
    const designer = this.toNormal();
    const { designer, desid } = designer;
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

    let tong = [];
    let temp;

    // {
    //   information: {
    //     contract: {
    //       status,
    //       date: contraceDate
    //     },
    //     phone,
    //     email,
    //     address,
    //     personalSystem: {
    //       showRoom,
    //       webPage,
    //       sns
    //     },
    //     business: {
    //       career,
    //       account,
    //       businessInfo: {
    //         classification,
    //         businessNumber,
    //         files
    //       },
    //       service: {
    //         cost: {
    //           matrix: {
    //             service,
    //             online
    //           },
    //           percentage,
    //         },
    //         contruct: {
    //           partner,
    //           method
    //         }
    //       }
    //     },
    //   },
    //   analytics: {
    //
    //   }
    // }

    for (let { request: { timeline, budget, family, space: { address, contract, pyeong, spec: { room, bathroom, valcony }, resident: { living, expected } }, etc: { comment, channel } }, analytics: { response: { status, outreason }, date: { callHistory, space: { precheck, empty, movein } }, picture } } of client.requests) {

      callHistoryString = '';
      for (let h of callHistory) {
        callHistoryString += dateToString(h) + "__split__";
      }
      callHistoryString = callHistoryString.slice(0, -9);

      temp = {};
      temp.standard = {
        cliid,
        name
      };
      temp.info = {
        status,
        outreason: outreason.join("__split__"),
        callHistory: callHistoryString,
        timeline: dateToString(timeline, true),
        phone,
        email,
        budget,
        address,
        contract,
        pyeong,
        living,
        expected: dateToString(expected),
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
