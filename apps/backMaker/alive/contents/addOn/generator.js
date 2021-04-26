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

const withTools = function (Contents) {

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
      } else if (/^3/.test(dayString)) {
        dayString = '예정';
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

  Contents.prototype.dimensionSqueeze = function () {
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
      tempObj.reviewOrder = tempObj.order;
      delete tempObj.order;
      result.push(tempObj);
    }

    return result;
  }

  Contents.prototype.imagePath = function () {
    const pid = this.contents.portfolio.pid;
    let result = {};
    let tempObj;

    result.conid = this.conid;
    result.pid = pid;

    result.listImage = [];
    result.original = [];

    for (let i = 0; i < this.photos.detail.length; i++) {
      tempObj = {};
      tempObj.path = "/corePortfolio/listImage/" + pid + "/t" + this.photos.detail[i].index + pid + ".jpg";
      tempObj.gs = this.photos.detail[i].gs;
      result.listImage.push(tempObj);
      tempObj = {};
      tempObj.path = "/corePortfolio/original/" + pid + "/i" + this.photos.detail[i].index + pid + ".jpg";
      tempObj.gs = this.photos.detail[i].gs;
      result.original.push(tempObj);
    }

    return result;
  }

  return Contents;
}

const withToolsArr = function (ContentsArr) {

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

  ContentsArr.prototype.dimensionSqueeze = function () {
    const TABLE_NAME = "contents";
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
        let sql = "CREATE TABLE " + this.getName() + " (";
        sql += "id INT(11) NOT NULL AUTO_INCREMENT,";
        sql += " ";
        for (let i in this) {
          sql += i;
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
        let sql = "INSERT INTO " + this.getName() + " (";
        for (let i in this) {
          sql += i;
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

  ContentsArr.prototype.search = function (conid) {
    let result = null;
    for (let i of this) {
      if (i.conid === conid) {
        result = i;
        break;
      }
    }
    return result;
  }

  ContentsArr.prototype.find = function (conid) {
    return this.search(conid);
  }

  ContentsArr.prototype.imagePath = function () {
    class ImageArray extends Array {
      convertConid() {
        let result = {};
        for (let i of this) {
          result[i.conid] = i;
        }
        return result;
      }
      convertPid() {
        let result = {};
        for (let i of this) {
          result[i.pid] = i;
        }
        return result;
      }
      flatListImage() {
        let result = [];
        for (let i of this) {
          for (let j of i.listImage) {
            result.push(j.path);
          }
        }
        return result;
      }
      flatOriginal() {
        let result = [];
        for (let i of this) {
          for (let j of i.original) {
            result.push(j.path);
          }
        }
        return result;
      }
    }
    let result = new ImageArray();
    for (let i of this) {
      result.push(i.imagePath());
    }
    return result;
  }
  return ContentsArr;
}

const Tools = function () {}
Tools.withTools = withTools;
Tools.withToolsArr = withToolsArr;

module.exports = { Contents, ContentsArr, Tools };
