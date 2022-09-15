const DataRouter = function (DataPatch, DataMiddle, MONGOC, MONGOLOCALC, kakaoInstance, humanInstance, isLocal = false) {
  if (MONGOC === undefined || MONGOC === null || MONGOLOCALC === undefined || MONGOLOCALC === null) {
    throw new Error("must be mongo, mongo_local connection");
  }
  this.dir = process.cwd() + "/apps/dataConsole";
  this.module = this.dir + "/module";
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  const BackWorker = require(`${process.cwd()}/apps/backMaker/backWorker.js`);
  const GoogleSheet = require(`${process.cwd()}/apps/googleAPIs/googleSheet.js`);
  const GoogleDrive = require(`${process.cwd()}/apps/googleAPIs/googleDrive.js`);
  const GoogleCalendar = require(`${process.cwd()}/apps/googleAPIs/googleCalendar.js`);
  const GoogleAnalytics = require(`${process.cwd()}/apps/googleAPIs/googleAnalytics.js`);
  this.mother = new Mother();
  this.back = new BackMaker();
  this.work = new BackWorker();
  this.patchClass = DataPatch;
  this.patch = new DataPatch();
  this.middle = DataMiddle;
  this.sheets = new GoogleSheet();
  this.drive = new GoogleDrive();
  this.calendar = new GoogleCalendar();
  this.analytics = new GoogleAnalytics();
  this.mongo = MONGOC;
  this.mongolocal = MONGOLOCALC;
  this.pythonApp = this.dir + "/python/app.py";
  this.address = require(`${process.cwd()}/apps/infoObj.js`);
  this.members = {};
  this.kakao = kakaoInstance;
  this.human = humanInstance;
  if (isLocal) {
    this.back.bindDev();
  }
}

//STATIC FUNCTIONS --------------------------------------------------------------------------

DataRouter.timeouts = {};

DataRouter.cookieParsing = function (req) {
  if (req.headers.cookie === undefined) {
    return null;
  } else {
    if (typeof req.headers.cookie === "string" && /=/gi.test(req.headers.cookie)) {
      const str = req.headers.cookie;
      const tryDecode = (str) => {
        try {
          return decodeURIComponent(str);
        } catch (e) {
          return str;
        }
      }
      const pairs = str.split(/; */);
      let obj;
      let key, val;
      obj = {};
      for (let pair of pairs) {
        eq_idx = pair.indexOf('=');
        if (eq_idx < 0) {
          continue;
        }
        key = pair.slice(0, eq_idx).trim();
        val = pair.slice(eq_idx + 1, pair.length).trim();
        if (val[0] === '"') {
          val = val.slice(1, -1);
        }
        if (obj[key] === undefined) {
          obj[key] = tryDecode(val);
        }
      }
      return obj;
    } else {
      return null;
    }
  }
}

DataRouter.queryFilter = function (str) {
  str = str.replace(/[|\\\/\[\]\{\}\(\)\<\>!@#\$\%\^\&\*\=\+\?]/g, '');
  str = str.replace(/\n/g, '');
  str = str.replace(/\t/g, '');
  return str;
}

DataRouter.dateToString = function (obj) {
  const zeroAddition = function (number) {
    if (number < 10) {
      return "0" + String(number);
    } else {
      return String(number);
    }
  }
  return `${String(obj.getFullYear())}-${zeroAddition(obj.getMonth() + 1)}-${zeroAddition(obj.getDate())}`;
}

DataRouter.autoComma = function (str) {
  if (typeof str === "number") {
    str = String(str);
  }
  let minus, num, tmp;
  if (/\-/g.test(str)) {
    minus = /\-/g.exec(str)[0];
  } else {
    minus = '';
  }
  num = str.replace(/[^0-9]/g, '');
  tmp = '';
  if (num.length < 4) {
    return minus + num;
  } else if (num.length < 7) {
    tmp += num.slice(-6, -3) + ',' + num.slice(-3);
    return minus + tmp;
  } else if (num.length < 10) {
    tmp += num.slice(-9, -6) + ',' + num.slice(-6, -3) + ',' + num.slice(-3);
    return minus + tmp;
  } else if (num.length < 13) {
    tmp += num.slice(-12, -9) + ',' + num.slice(-9, -6) + ',' + num.slice(-6, -3) + ',' + num.slice(-3);
    return minus + tmp;
  } else if (num.length < 16) {
    tmp += num.slice(-15, -12) + ',' + num.slice(-12, -9) + ',' + num.slice(-9, -6) + ',' + num.slice(-6, -3) + ',' + num.slice(-3);
    return minus + tmp;
  }
  return minus + num;
}

DataRouter.stringFilter = function (str) {
  let filtered;
  filtered = str.replace(/^ /g, '').replace(/ $/g, '').replace(/^ /g, '').replace(/ $/g, '').replace(/^ /g, '').replace(/ $/g, '').replace(/^ /g, '').replace(/ $/g, '').replace(/^ /g, '').replace(/ $/g, '').replace(/^ /g, '').replace(/ $/g, '');
  filtered = filtered.replace(/^\n/, '');
  filtered = filtered.replace(/\n$/, '');
  filtered = filtered.replace(/\n\n/g, '\n');
  filtered = filtered.replace(/[^가-힣ㄱ-ㅎㅏ-ㅣ0-9a-zA-Z\)\(\.\,\?\!\/\'\"\;\:\@\#\$\%\&\*\-\_\+\=\n\t ]/g, '');
  filtered = filtered.replace(/^ /g, '');
  filtered = filtered.replace(/ $/g, '');
  filtered = filtered.replace(/  /g, ' ');
  filtered = filtered.replace(/   /g, ' ');
  filtered = filtered.replace(/    /g, ' ');
  filtered = filtered.replace(/     /g, ' ');
  filtered = filtered.replace(/      /g, ' ');
  filtered = filtered.replace(/     /g, ' ');
  filtered = filtered.replace(/    /g, ' ');
  filtered = filtered.replace(/   /g, ' ');
  filtered = filtered.replace(/  /g, ' ');
  return filtered;
}

DataRouter.objectToFlat = function (arr) {
  let totalString;
  let temp, tempArr;
  totalString = '';
  for (let obj of arr) {
    totalString += obj.title_plaintext;
    totalString += "__split__";
    if (obj.children !== undefined) {
      temp = DataRouter.objectToFlat(obj.children);
      tempArr = temp.split("__split__");
      for (let i = 0; i < tempArr.length; i++) {
        tempArr[i] = "- " + tempArr[i];
      }
      totalString += tempArr.join("__split__");
      totalString += "__split__";
    }
  }
  totalString = totalString.slice(0, -9);
  return totalString;
}

DataRouter.splitToSpace = function (str) {
  return str.replace(/__split__/g, '\n');
}
