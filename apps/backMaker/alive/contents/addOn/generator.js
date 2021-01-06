const CLIENT_DIR = process.cwd() + "/apps/backMaker/alive/contents";
const Contents = require(CLIENT_DIR + "/contents.js");

class ContentsArr extends Array {

  toNormal() {
    let tong;
    tong = [];
    for (let i of this) {
      tong.push(i.toNormal());
    }
    return tong;
  }

}

const widthTools = function (Contents) {

  Contents.prototype.flatDeath = function () {
    const contents = this.toNormal();
    const { conid, desid, contents: { portfolio, review }, photos } = contents;
    const { pid, date: portfolioDate, spaceInfo, title, color, detailInfo, contents: portfolioContents } = portfolio;
    const { space, pyeong, region, method } = spaceInfo;
    const { photodae, photosg, slide, tag, service, sort: { key8, key9 } } = detailInfo;
    const { rid, date: reviewDate, title: reviewTitle, detailInfo: reviewDetailInfo, contents: reviewContents } = review;
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

    let tong = [];
    let temp;

    temp = {};
    temp.standard = {
      conid,
      pid
    };
    temp.info = {
      desid,
      rid,
      portfolioDate: dateToString(portfolioDate, true),
      reviewDate: dateToString(reviewDate, true),
      titleMain: title.main,
      titleSub: title.sub,
      reviewTitleMain: reviewTitle.main,
      reviewTitleSub: reviewTitle.sub,
      space,
      pyeong,
      region,
      method,
      color: (color.main + " / " + color.sub + " / " + color.title),
      photodae: photodae.join(", "),
      reviewPhotodae: reviewDetailInfo.photodae.join(", "),
      photosg: (photosg.first + ", " + photosg.last),
      slide: slide.join(", "),
      tag: tag.join(", "),
      service,
      key8,
      key9,
      order: reviewDetailInfo.order,
    };
    tong.push(temp);

    return tong;
  }

  return Contents;
}

const widthToolsArr = function (ContentsArr) {

  ContentsArr.prototype.flatDeath = function () {
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

  return ContentsArr;
}

const Tools = function () {}
Tools.widthTools = widthTools;
Tools.widthToolsArr = widthToolsArr;

module.exports = { Contents, ContentsArr, Tools };
