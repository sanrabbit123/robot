const DataRouter = function (DataPatch, DataMiddle, MONGOC, MONGOLOCALC, kakaoInstance, humanInstance, isGhost = false, isLocal = false) {
  if (MONGOC === undefined || MONGOC === null || MONGOLOCALC === undefined || MONGOLOCALC === null) {
    throw new Error("must be mongo, mongo_local connection");
  }
  this.dir = process.cwd() + "/apps/dataConsole";
  this.module = this.dir + "/module";
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  const GoogleSheet = require(`${process.cwd()}/apps/googleAPIs/googleSheet.js`);
  const GoogleDrive = require(`${process.cwd()}/apps/googleAPIs/googleDrive.js`);
  const GoogleCalendar = require(`${process.cwd()}/apps/googleAPIs/googleCalendar.js`);
  this.mother = new Mother();
  this.back = new BackMaker();
  this.patchClass = DataPatch;
  this.patch = new DataPatch();
  this.middle = DataMiddle;
  this.sheets = new GoogleSheet();
  this.drive = new GoogleDrive();
  this.calendar = new GoogleCalendar();
  this.mongo = MONGOC;
  this.mongolocal = MONGOLOCALC;
  this.pythonApp = this.dir + "/python/app.py";
  this.address = require(`${process.cwd()}/apps/infoObj.js`);
  this.members = {};
  this.isGhost = isGhost;
  this.kakao = kakaoInstance;
  this.human = humanInstance;
  if (isLocal) {
    this.back.bindDev();
  }
}

//STATIC FUNCTIONS --------------------------------------------------------------------------

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
  let minus;
  if (/\-/g.test(str)) { minus = /\-/g.exec(str)[0]; }
  else { minus = ''; }
  let num = str.replace(/[^0-9]/g, '');
  let tmp = '';
  if (num.length < 4) {
    return minus + num;
  } else if (num.length < 7) {
    tmp += num.slice(-6, -3) + ',' + num.slice(-3);
    return minus + tmp;
  } else if (num.length < 10) {
    tmp += num.slice(-9, -6) + ',' + num.slice(-6, -3) + ',' + num.slice(-3);
    return minus + tmp;
  } else {
    tmp += num.slice(-12, -9) + ',' + num.slice(-9, -6) + ',' + num.slice(-6, -3) + ',' + num.slice(-3);
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

DataRouter.notionArrRefine = function (arr) {
  let target;
  let targetTong;
  target = [];
  for (let obj of arr) {
    if (obj.title_plaintext !== undefined && obj.title_plaintext !== '') {
      targetTong = {};
      targetTong.title_plaintext = DataRouter.stringFilter(obj.title_plaintext);
      if (obj.children !== undefined) {
        targetTong.children = DataRouter.notionArrRefine(obj.children);
      }
      target.push(targetTong);
    }
  }
  return target;
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
