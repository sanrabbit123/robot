const Mother = require(`${process.cwd()}/apps/mother.js`);
const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
const BackWorker = require(`${process.cwd()}/apps/backMaker/backWorker.js`);
const BillMaker = require(`${process.cwd()}/apps/billMaker/billMaker.js`);
const GoogleSheet = require(`${process.cwd()}/apps/googleAPIs/googleSheet.js`);
const GoogleDrive = require(`${process.cwd()}/apps/googleAPIs/googleDrive.js`);
const GoogleCalendar = require(`${process.cwd()}/apps/googleAPIs/googleCalendar.js`);
const GoogleAnalytics = require(`${process.cwd()}/apps/googleAPIs/googleAnalytics.js`);
const express = require('express');
const router = express.Router();

const DataRouter = function (DataPatch, DataMiddle, MONGOC, MONGOLOCALC, MONGOLOGC, kakaoInstance, humanInstance) {
  if (MONGOC === undefined || MONGOC === null || MONGOLOCALC === undefined || MONGOLOCALC === null) {
    throw new Error("must be mongo, mongo_local connection");
  }
  this.mother = new Mother();
  this.back = new BackMaker();
  this.work = new BackWorker();
  this.dir = process.cwd() + "/apps/dataConsole";
  this.module = this.dir + "/module";
  this.address = require(`${process.cwd()}/apps/infoObj.js`);
  this.bill = new BillMaker();
  this.patchClass = DataPatch;
  this.patch = new DataPatch();
  this.middle = DataMiddle;
  this.sheets = new GoogleSheet();
  this.drive = new GoogleDrive();
  this.calendar = new GoogleCalendar();
  this.analytics = new GoogleAnalytics();
  this.mongo = MONGOC;
  this.mongolocal = MONGOLOCALC;
  this.mongolog = MONGOLOGC;
  this.pythonApp = this.dir + "/python/app.py";
  this.members = {};
  this.kakao = kakaoInstance;
  this.human = humanInstance;
  this.bankCode = BillMaker.returnBankCode("", "matrix");
}

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


//GENERAL METHODS ---------------------------------------------------------------------------------

DataRouter.prototype.baseMaker = function (target, mode = "first", req = null) {
  const instance = this;
  const ADDRESS = this.address;
  const DataPatch = this.patchClass;
  const DataMiddle = this.middle;
  let html;

  if (mode === "first") {

    html = `<!DOCTYPE html>
    <html lang="ko" dir="ltr">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no,user-scalable=no">
        <title>HomeLiaison Console: ${target}</title>
        <style></style>
      </head>
      <body>
        <div id="totalcontents"></div>
        <script src="/${target}.js"></script>
      </body>
    </html>`;

    return new Promise(function(resolve, reject) {
      resolve(html);
    });


  } else if (mode === "middle") {

    return new Promise(function(resolve, reject) {
      if (DataMiddle !== null) {
        DataMiddle.baseHtml(target, req, instance.mongo, instance.mongolocal).then(function (html) {
          resolve(html);
        }).catch(function (e) {
          reject(e);
        });
      } else {
        resolve(`<!DOCTYPE html><html><head><title>Permission denied</title></head><body>error<script>alert("잘못된 접근입니다!");window.location.href = "https://home-liaison.com";</script></body></html>`);
      }
    });

  }
}

DataRouter.prototype.getDateMatrix = async function (length = 6) {
  const instance = this;
  try {
    const today = new Date();
    const dateMatrix = await this.mother.pythonExecute(this.pythonApp, [ "dateMatrix" ], { length });

    let year, month;
    let day0, day1, day2;
    let dateString0, dateString1;
    let resultArr, middleResultArr, resultFactorArr;

    resultArr = [];
    for (let j = 0; j < dateMatrix.length; j++) {

      year = today.getFullYear();
      month = today.getMonth() + 1 - j;

      year = today.getFullYear() + Math.floor(month / 12) + ((month % 12) === 0 ? -1 : 0);
      month = (month % 12) > 0 ? (month % 12) : 12 + (month % 12);

      middleResultArr = [];
      for (let i = 0; i < dateMatrix[j].length; i++) {
        resultFactorArr = [];

        day0 = dateMatrix[j][i][0];
        resultFactorArr.push(new Date(year, month - 1, day0));

        day1 = dateMatrix[j][i][dateMatrix[j][i].length - 1];
        resultFactorArr.push(new Date(year, month - 1, day1));

        if (i !== dateMatrix[j].length - 1) {
          day2 = dateMatrix[j][i + 1][0];
          resultFactorArr.push(new Date(year, month - 1, day2));
        } else {
          day2 = 1;
          if (month === 12) {
            resultFactorArr.push(new Date(year + 1, 0, day2));
          } else {
            resultFactorArr.push(new Date(year, month, day2));
          }
        }
        middleResultArr.push(resultFactorArr);
      }
      resultArr.push(middleResultArr);
    }

    return resultArr;
  } catch (e) {
    console.log(e);
  }
}

DataRouter.prototype.getCalendar = async function (length = 12) {
  const instance = this;
  try {
    const dateMatrix = await this.mother.pythonExecute(this.pythonApp, [ "dateMatrixFullSet" ], { length });
    return dateMatrix;
  } catch (e) {
    console.log(e);
  }
}

DataRouter.prototype.parsingAddress = async function (id, rawString, MONGOC, logger) {
  if (typeof id !== "string" || typeof rawString !== "string" || MONGOC === undefined) {
    throw new Error("invaild input");
  }
  const instance = this;
  const AddressParser = require(`${process.cwd()}/apps/addressParser/addressParser.js`);
  const app = new AddressParser();
  const back = this.back;
  const { messageSend, messageLog } = this.mother;
  try {
    let arr;

    //client
    if (/^c/gi.test(id)) {
      arr = await app.addressInspection([ { id, address: rawString } ]);
      if (arr.length === 0) {
        return { result: true, id };
      } else {
        const res = await app.getAddress(rawString);
        if (res === null) {
          return { result: false, id };
        } else {
          const { address: { road } } = res;
          await back.updateClient([ { cliid: id }, { "requests.0.request.space.address": (road + " " + rawString) } ], { selfMongo: MONGOC });
          return { result: true, id };
        }
      }
    }
  } catch (e) {
    await logger.error("주소 연산 중 오류 생김 (parsingAddress): " + e.message);
    console.log(e);
  }
}

//GET ---------------------------------------------------------------------------------------------

DataRouter.prototype.rou_get_Root = function () {
  const instance = this;
  const address = this.address;
  let obj = {};
  obj.link = '/';
  obj.func = async function (req, res, logger) {
    try {
      const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
      res.set({
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send(String(ip).replace(/[^0-9\.]/gi, ''));
    } catch (e) {
      logger.error("Console 서버 문제 생김 (rou_get_Root): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_get_First = function () {
  const instance = this;
  const { diskReading, aliveMongo } = this.mother;
  let obj = {};
  let ipTong;
  ipTong = [ 1, 127001, 19216801, 192168090, 129918118 ];
  for (let info in instance.address) {
    if (instance.address[info].ip.outer.length > 0) {
      ipTong.push(Number(instance.address[info].ip.outer.replace(/[^0-9]/g, '')));
    }
    if (instance.address[info].ip.inner.length > 0) {
      ipTong.push(Number(instance.address[info].ip.inner.replace(/[^0-9]/g, '')));
    }
  }
  ipTong = Array.from(new Set(ipTong));
  obj.link = "/:id";
  obj.func = async function (req, res, logger) {
    try {
      let ip, pass;
      let target;
      let aliveMongoResult;

      ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
      if (typeof ip !== "string") {
        pass = false;
        ip = '';
      } else {
        if (ipTong.includes(Number(ip.trim().replace(/[^0-9]/g, '')))) {
          pass = true;
        } else {
          pass = false;
        }
      }

      if (!pass) {
        if (ipTong.includes(Number(ip.trim().replace(/[^0-9]/g, '')))) {
          pass = true;
        } else {
          pass = false;
        }
      }

      if (req.params.id === "ssl") {

        aliveMongoResult = false;
        aliveMongo().then((boo) => {
          aliveMongoResult = boo;
          return diskReading();
        }).then((disk) => {
          res.set({ "Content-Type": "application/json" });
          res.send(JSON.stringify({ disk: disk.toArray(), mongo: aliveMongoResult }));
        }).catch((err) => {
          throw new Error(err);
        });

      } else if (req.params.id === "disk") {

        diskReading().then((disk) => {
          res.set({ "Content-Type": "application/json" });
          res.send(JSON.stringify({ disk: disk.toArray() }));
        }).catch((err) => {
          throw new Error(err);
        });

      } else if (req.params.id === "bluePrint") {

        const html = `<!DOCTYPE html><html lang="ko" dir="ltr"><head><meta charset="utf-8"><style media="screen">*::-webkit-scrollbar{display:none;}html{overflow:hidden}body {position: absolute;top: 0px;left: 0px;width: 100vw;height: 100vh;background: #00ff00;}</style></head><body></body></html>`;
        res.set({
          "Content-Type": "text/html",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
        });
        res.send(html);

      } else if (req.params.id === "blackPrint") {

        const html = `<!DOCTYPE html><html lang="ko" dir="ltr"><head><meta charset="utf-8"><style media="screen">*::-webkit-scrollbar{display:none;}html{overflow:hidden}body {position: absolute;top: 0px;left: 0px;width: 100vw;height: 100vh;background: #000000;}</style></head><body></body></html>`;
        res.set({
          "Content-Type": "text/html",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
        });
        res.send(html);

      } else if (req.params.id === "isOffice") {

        res.set({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
        });
        const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
        res.send(JSON.stringify({ result: (String(ip).replace(/[^0-9\.]/gi, '').trim() === address.officeinfo.ip.outer.trim() ? 1 : 0) }));  

      } else if (req.params.id === "code") {
        
        res.set({
          "Content-Type": "text/html",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
        });
        res.send((`<html><script>window.location.href = "https://${instance.address.officeinfo.host}:38080?folder=/home/ubuntu/robot";</script></html>`));


      } else {

        if (false) {

          res.set("Content-Type", "text/html");
          res.send(`<html><head><title>알 수 없는 ip</title></head><body><script>
            alert("알 수 없는 아이피 주소 입니다. 관리자에게 문의해주세요!\\n접근 아이피 주소 : ${ip.trim()}");
            window.location.href = "https://home-liaison.com";</script></body></html>`);

        } else {

          if (/^cl/i.test(req.params.id)) {
            target = "client";
          } else if (/^bu/i.test(req.params.id)) {
            target = "builder";
          } else if (/^de/i.test(req.params.id)) {
            target = "designer";
          } else if (/^dash/i.test(req.params.id)) {
            target = "dashboard";
          } else if (/^proj/i.test(req.params.id)) {
            target = "project";
          } else if (/^prop/i.test(req.params.id)) {
            target = "proposal";
          } else if (/^proc/i.test(req.params.id)) {
            target = "process";
          } else if (/^con/i.test(req.params.id)) {
            target = "contents";
          } else if (/^fil/i.test(req.params.id)) {
            target = "file";
          } else if (/^mes/i.test(req.params.id)) {
            target = "message";
          } else if (/^use/i.test(req.params.id)) {
            target = "user";
          } else if (/^mpr/i.test(req.params.id)) {
            target = "mpr";
          } else if (/^ana/i.test(req.params.id)) {
            target = "analytics";
          } else if (/^ca/i.test(req.params.id)) {
            target = "calculation";
          } else if (/^sa/i.test(req.params.id)) {
            target = "sales";
          } else if (/^flo/i.test(req.params.id)) {
            target = "flow";
          } else if (/^numb/i.test(req.params.id)) {
            target = "numbers";
          } else if (/^raw/i.test(req.params.id)) {
            target = "raw";
          } else {
            target = "client";
          }

          instance.baseMaker(target, "first", null).then(function (html) {
            res.set("Content-Type", "text/html");
            res.send(html);
          }).catch(function (err) {
            throw new Error(err);
          });

        }

      }

    } catch (e) {
      logger.error("Console 서버 문제 생김 (rou_get_First): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.set({ "Content-Type": "text/plain" });
      res.send("error");
    }
  }
  return obj;
}

DataRouter.prototype.rou_get_Middle = function () {
  const instance = this;
  let obj = {};
  obj.link = "/middle/:id";
  obj.func = async function (req, res, logger) {
    try {
      instance.baseMaker(req.params.id, "middle", req).then(function (html) {
        res.set("Content-Type", "text/html");
        res.send(html);
      }).catch(function (err) {
        throw new Error(err);
      });
    } catch (e) {
      logger.error("Console 서버 문제 생김 (rou_get_Middle): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_get_Address = function () {
  const instance = this;
  let obj = {};
  obj.link = "/tools/address";
  obj.func = async function (req, res, logger) {
    try {
      const html = `<!DOCTYPE html><html lang="ko" dir="ltr"><head><meta charset="utf-8">
        <style>*{margin:0}body{width:100vh;height:100vh;overflow:hidden}body::-webkit-scrollbar{display:none;}img{cursor:pointer;position:absolute;right:0px;top:-1px;z-index:1}div{border:0;width:100vw;height:100vh;position:relative}</style><script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script></head><body><script>
        let div_clone, img_clone;div_clone = document.createElement("DIV");img_clone = document.createElement("IMG");img_clone.setAttribute("src", "https://t1.daumcdn.net/postcode/resource/images/close.png");img_clone.setAttribute("id", "btnFoldWrap");div_clone.appendChild(img_clone);document.body.appendChild(div_clone);
        new daum.Postcode({
            oncomplete: function (data) {
              let addr = '', extraAddr = '';
              if (data.userSelectedType === 'R') {
                addr = data.roadAddress;
                if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) { extraAddr += data.bname; }
                if (data.buildingName !== '' && data.apartment === 'Y') { extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName); }
                if (extraAddr !== '') { extraAddr = ' (' + extraAddr + ')'; }
              } else { addr = data.jibunAddress; }
              const detail = prompt("상세주소를 입력해주세요! : " + addr + extraAddr);
              window.parent.postMessage(addr + extraAddr + " " + detail, '*');
            }, width : '100%', height : '100%' }).embed(div_clone);</script></body></html>`;
      res.set("Content-Type", "text/html");
      res.send(html);
    } catch (e) {
      logger.error("Console 서버 문제 생김 (rou_get_Address): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_get_AddressLite = function () {
  const instance = this;
  let obj = {};
  obj.link = "/tools/addressLite";
  obj.func = async function (req, res, logger) {
    try {
      const html = `<!DOCTYPE html><html lang="ko" dir="ltr"><head><meta charset="utf-8">
        <style>*{margin:0}body{width:100vh;height:100vh;overflow:hidden}body::-webkit-scrollbar{display:none;}img{cursor:pointer;position:absolute;right:0px;top:-1px;z-index:1}div{border:0;width:100vw;height:100vh;position:relative}</style><script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script></head><body><script>
        let div_clone, img_clone;div_clone = document.createElement("DIV");img_clone = document.createElement("IMG");img_clone.setAttribute("src", "https://t1.daumcdn.net/postcode/resource/images/close.png");img_clone.setAttribute("id", "btnFoldWrap");div_clone.appendChild(img_clone);document.body.appendChild(div_clone);
        new daum.Postcode({
            oncomplete: function (data) {
              let addr = '', extraAddr = '';
              if (data.userSelectedType === 'R') {
                addr = data.roadAddress;
                if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) { extraAddr += data.bname; }
                if (data.buildingName !== '' && data.apartment === 'Y') { extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName); }
                if (extraAddr !== '') { extraAddr = ' (' + extraAddr + ')'; }
              } else { addr = data.jibunAddress; }
              window.parent.postMessage(addr + extraAddr, '*');
            }, width : '100%', height : '100%' }).embed(div_clone);</script></body></html>`;
      res.set("Content-Type", "text/html");
      res.send(html);
    } catch (e) {
      logger.error("Console 서버 문제 생김 (rou_get_Address): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_get_Trigger = function () {
  const instance = this;
  let obj = {};
  obj.link = "/tools/trigger";
  obj.func = async function (req, res, logger) {
    try {
      const html = `<!DOCTYPE html><html lang="ko" dir="ltr"><head><meta charset="utf-8">
        <style>*{margin:0}body{width:100vh;height:100vh;overflow:hidden}body::-webkit-scrollbar{display:none;}img{cursor:pointer;position:absolute;right:0px;top:-1px;z-index:1}div{border:0;width:100vw;height:100vh;position:relative}</style><script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script></head><body><script>
        window.parent.postMessage("안녕?", '*');</script></body></html>`;
      res.set("Content-Type", "text/html");
      res.send(html);
    } catch (e) {
      logger.error("Console 서버 문제 생김 (rou_get_Trigger): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_get_AllLogStore = function () {
  const instance = this;
  const { fileSystem, requestSystem, equalJson } = this.mother;
  const allLogToFile = async (logger) => {
    try {
      const allLogKeyword = logger.all;
      const logFolder = logger.folder;
      const allLogFileName = `${allLogKeyword}_${(new Date()).valueOf()}.json`;
      const allLogFile = `${logFolder}/${allLogFileName}`;
      let stringTemp;
      let logString, pastJsonArr;
      let pastPastArr;
      let pastLoggerFiles;
      let thisLoggerFiles;
      let allLoggerFiles;

      pastLoggerFiles = (await fileSystem("readDir", [ logFolder ])).filter((str) => { return str !== ".DS_Store" });

      thisLoggerFiles = pastLoggerFiles.filter((str) => { return (new RegExp("^" + logger.keyword, "gi")).test(str) });
      thisLoggerFiles.sort((a, b) => {
        return Number(b.split("_")[1].replace(/[^0-9]/gi, '')) - Number(a.split("_")[1].replace(/[^0-9]/gi, ''));
      })
      thisLoggerFiles = thisLoggerFiles.slice(0, logger.instances);

      allLoggerFiles = equalJson(JSON.stringify(pastLoggerFiles));
      pastLoggerFiles = pastLoggerFiles.filter((str) => { return !thisLoggerFiles.includes(str) });

      if (allLoggerFiles.length > 0) {
        logString = '';
        pastPastArr = [];
        for (let fileName of allLoggerFiles) {
          stringTemp = await fileSystem(`readString`, [ `${logFolder}/${fileName}` ]);
          if (/^\{/.test(stringTemp)) {
            logString += stringTemp;
            logString += "\n\n";
          } else if (/^\[/.test(stringTemp)) {
            pastPastArr = JSON.parse(stringTemp);
          }
        }

        pastJsonArr = logString.split("\n").map((str) => { return str.trim(); }).filter((str) => { return str !== "" }).filter((str) => {
          return (/^\{/.test(str) && /\}$/.test(str))
        }).filter((str) => {
          try {
            const obj = JSON.parse(str);
            return true;
          } catch {
            return false;
          }
        }).map((str) => {
          return equalJson(str);
        });

        pastJsonArr = pastPastArr.concat(pastJsonArr);
        pastJsonArr.sort((a, b) => { return a.date.valueOf() - b.date.valueOf(); });

        await fileSystem(`write`, [ allLogFile, JSON.stringify(pastJsonArr) ]);
        for (let fileName of pastLoggerFiles) {
          await fileSystem(`remove`, [ `${logFolder}/${fileName}` ]);
        }
      }

      return allLogFileName;
    } catch (e) {
      await logger.error("past log to file error : " + e.message);
      console.log(e);
      return null;
    }
  }
  let obj = {};
  obj.link = "/log/allLogStore";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      allLogToFile(logger).then((file) => {
        if (typeof file === "string") {
          logger.cron("back console all log store success").catch((err) => { console.log(err); });
        } else {
          throw new Error("back console all log store fail");
        }
      }).catch((err) => {
        logger.error("Console 서버 문제 생김 (rou_get_AllLogStore): " + err.message).catch((err) => { console.log(err); });
      });
      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      logger.error("Console 서버 문제 생김 (rou_get_AllLogStore): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_get_Patch = function () {
  const instance = this;
  const { fileSystem } = this.mother;
  let obj = {};
  obj.link = "/patch/:key";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      let target, stream;
      if (typeof req.query.directory === "string") {
        target = instance.dir + "/router/source/patch/" + req.query.directory + "/" + req.params.key + ".js";
      } else {
        target = instance.dir + "/router/source/patch" + "/" + req.params.key + ".js";
      }
      if (await fileSystem("exist", [ target ])) {
        stream = await fileSystem("readStream", [ target ]);
        stream.pipe(res);
      } else {
        throw new Error("invaild key");
      }
    } catch (e) {
      logger.error("Console 서버 문제 생김 (rou_get_Patch): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send("error : " + e.message);
    }
  }
  return obj;
}

DataRouter.prototype.rou_get_ServerSent = function () {
  const instance = this;
  const back = this.back;
  const SseStream = require(`${this.module}/sseStream.js`);
  const { readFileSync } = require(`fs`);
  let obj = {};
  obj.link = [ "/sse/get_client", "/sse/get_designer", "/sse/get_project", "/sse/get_contents" ];
  obj.func = async function (req, res, logger) {
    try {
      const thisPath = req.url.split('_')[1];
      const sseStream = new SseStream(req);
      let log_past, log_new;

      res.set({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });

      sseStream.pipe(res);

      const pusher = setInterval(async function () {
        try {
          log_new = String(readFileSync(instance.dir + "/log/" + thisPath + "_latest.json"));
          if (log_new !== log_past) {
            sseStream.write({ event: 'updateTong', data: log_new });
          }
          log_past = log_new;
        } catch (e) {
          console.log(e);
        }
      }, 400);

      res.on('close', function () {
        clearInterval(pusher);
        sseStream.unpipe(res);
      });

    } catch (e) {
      logger.error("Console 서버 문제 생김 (rou_get_ServerSent): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_get_SpecificServerSent = function () {
  const instance = this;
  const back = this.back;
  const { fileSystem, equalJson } = this.mother;
  const SseStream = require(`${this.module}/sseStream.js`);
  const { readFileSync } = require(`fs`);
  const os = require(`os`);
  const cpuLength = os.cpus().length;
  let connectionNumber_raw = 0;
  let connectionNumber = 0;
  let totalOrder = 0;
  let obj = {};
  obj.link = [ "/specificsse/:id" ];
  obj.func = async function (req, res, logger) {
    try {
      const idConst = "sse";
      const sseConst = idConst + "_" + req.params.id;
      const sseFile = instance.dir + "/log/sse_" + req.params.id + "_latest.json"
      let sseObjs;
      let orderRaw, order;
      let trigger;

      res.set({
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache",
        "Connection": 'keep-alive',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });

      sseObjs = await back.mongoRead(sseConst, { id: idConst }, { selfMongo: instance.mongolocal });
      if (sseObjs.length === 0) {
        await back.mongoCreate(sseConst, { id: idConst, order: [] }, { selfMongo: instance.mongolocal });
      }

      if (!(await fileSystem(`exist`, [ sseFile ]))) {
        await fileSystem(`write`, [ sseFile, JSON.stringify([]) ]);
      }

      connectionNumber_raw = connectionNumber_raw + 1;
      connectionNumber = cpuLength * connectionNumber_raw;
      totalOrder = connectionNumber;

      const pusher = setInterval(async function () {
        try {
          if (totalOrder <= 0) {
            totalOrder = connectionNumber;
          }
          try {
            trigger = JSON.parse(String(readFileSync(sseFile)));
          } catch (e) {
            trigger = [];
          }
          if (trigger.length > 0) {
            orderRaw = await back.mongoRead(sseConst, { id: idConst }, { selfMongo: instance.mongolocal });
            order = orderRaw[0].order;
            for (let i = 0; i < order.length; i++) {
              if (/^[\{\[]/.test(order[i].trim()) && /[\}\]]$/.test(order[i].trim())) {
                order[i] = equalJson(order[i]);
              }
            }
            res.write(`event: updateTong\ndata: ${JSON.stringify(order)}\n\n`);
            totalOrder = totalOrder - 1;
            if (totalOrder <= 0) {
              await back.mongoUpdate(sseConst, [ { id: idConst }, { order: [] } ], { selfMongo: instance.mongolocal });
              await fileSystem(`write`, [ sseFile, JSON.stringify([]) ]);
            }
          }
        } catch (e) {
          console.log(e);
        }
      }, 100);

      res.on('close', function () {
        clearInterval(pusher);
        res.end();
        connectionNumber_raw = connectionNumber_raw - 1;
        connectionNumber = cpuLength * connectionNumber_raw;
      });

    } catch (e) {
      logger.error("Console 서버 문제 생김 (rou_get_SpecificServerSent): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
    }
  }
  return obj;
}


//POST ---------------------------------------------------------------------------------------------

DataRouter.prototype.rou_post_getDocuments = function () {
  const instance = this;
  const back = this.back;
  const { equalJson, dateToString, serviceParsing, db, stringToDate, requestSystem } = this.mother;
  let obj = {};
  obj.link = [ "/getClients", "/getDesigners", "/getProjects", "/getContents", "/getBuilders" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const selfMongo = instance.mongolocal;
      const selfCoreMongo = instance.mongo;
      let standard, raw_data, data, optionQuery, whereQuery;
      let historyWhereQuery;
      let thisCliids;
      let thisHistories;
      let resultArr;
      let thisHistory;
      let proposalSend;
      let thisProjects;
      let allProjects;
      let allDesigners;
      let desidArr, designersArr;
      let thisDailySales;
      let dailySalesArr;
      let thisRequestIndex;
      let thisSalesDate;
      let allClients;
      let thisRequestNumber;
      let thisRequest;
      let evaluationSendRows;
      let evaluationResultRows;
      let thisEvaluationSendRow;
      let thisEvaluationResultRow;

      if (req.body.where === undefined && req.body.whereQuery !== undefined) {
        req.body.where = req.body.whereQuery;
      }
      if (req.url === "/getClients") {
        standard = instance.patch.clientStandard();
        optionQuery = { withTools: true, selfMongo: instance.mongo };
        if (req.body.sort !== undefined) {
          optionQuery.sort = equalJson(req.body.sort);
        }
        if (req.body.where === undefined) {
          if (req.body.limit !== undefined) {
            raw_data = await back.getClientsByQuery({}, { withTools: true, selfMongo: instance.mongo, limit: Number(req.body.limit) });
          } else {
            raw_data = await back.getClientsByQuery({}, { withTools: true, selfMongo: instance.mongo });
          }
        } else {
          if (req.body.limit !== undefined) {
            optionQuery.limit = Number(req.body.limit);
          }
          raw_data = await back.getClientsByQuery(equalJson(req.body.where), optionQuery);
        }
      } else if (req.url === "/getDesigners") {
        standard = instance.patch.designerStandard();
        optionQuery = { withTools: true, selfMongo: instance.mongo };
        if (req.body.sort !== undefined) {
          optionQuery.sort = equalJson(req.body.sort);
        }
        if (req.body.where === undefined) {
          if (req.body.limit !== undefined) {
            raw_data = await back.getDesignersByQuery({}, { withTools: true, selfMongo: instance.mongo, limit: Number(req.body.limit) });
          } else {
            raw_data = await back.getDesignersByQuery({}, { withTools: true, selfMongo: instance.mongo });
          }
        } else {
          if (req.body.limit !== undefined) {
            optionQuery.limit = Number(req.body.limit);
          }
          raw_data = await back.getDesignersByQuery(equalJson(req.body.where), optionQuery);
        }
      } else if (req.url === "/getProjects") {
        standard = instance.patch.projectStandard();
        optionQuery = { withTools: true, selfMongo: instance.mongo };
        if (req.body.sort !== undefined) {
          optionQuery.sort = equalJson(req.body.sort);
        }
        if (req.body.where === undefined) {
          if (req.body.limit !== undefined) {
            raw_data = await back.getProjectsByQuery({}, { withTools: true, selfMongo: instance.mongo, limit: Number(req.body.limit) });
          } else {
            raw_data = await back.getProjectsByQuery({}, { withTools: true, selfMongo: instance.mongo });
          }
        } else {
          if (req.body.limit !== undefined) {
            optionQuery.limit = Number(req.body.limit);
          }
          whereQuery = equalJson(req.body.where);
          raw_data = await back.getProjectsByQuery(whereQuery, optionQuery);
        }
      } else if (req.url === "/getContents") {
        standard = instance.patch.contentsStandard();
        optionQuery = { withTools: true, selfMongo: instance.mongo };
        if (req.body.sort !== undefined) {
          optionQuery.sort = equalJson(req.body.sort);
        }
        if (req.body.where === undefined) {
          if (req.body.limit !== undefined) {
            raw_data = await back.getContentsArrByQuery({}, { withTools: true, selfMongo: instance.mongo, limit: Number(req.body.limit) });
          } else {
            raw_data = await back.getContentsArrByQuery({}, { withTools: true, selfMongo: instance.mongo });
          }
        } else {
          if (req.body.limit !== undefined) {
            optionQuery.limit = Number(req.body.limit);
          }
          raw_data = await back.getContentsArrByQuery(equalJson(req.body.where), optionQuery);
        }
      } else if (req.url === "/getBuilders") {
        standard = null;
        optionQuery = { withTools: true, selfMongo: instance.mongo };
        if (req.body.sort !== undefined) {
          optionQuery.sort = equalJson(req.body.sort);
        }
        if (req.body.where === undefined) {
          if (req.body.limit !== undefined) {
            raw_data = await back.getBuildersByQuery({}, { withTools: true, selfMongo: instance.mongo, limit: Number(req.body.limit) });
          } else {
            raw_data = await back.getBuildersByQuery({}, { withTools: true, selfMongo: instance.mongo });
          }
        } else {
          if (req.body.limit !== undefined) {
            optionQuery.limit = Number(req.body.limit);
          }
          raw_data = await back.getBuildersByQuery(equalJson(req.body.where), optionQuery);
        }
      }

      if (req.body.noFlat === undefined) {
        data = raw_data.flatDeath();
        if (req.url === "/getClients") {

          thisCliids = data.map((obj) => { return obj.standard.cliid });
          historyWhereQuery = {};
          historyWhereQuery["$or"] = thisCliids.map((cliid) => { return { cliid } });
          thisHistories = await back.mongoPick("clientHistory", [ historyWhereQuery, {
            cliid: 1,
            manager: 1,
            "curation.analytics.send": 1,
            "curation.service.serid": 1,
            "curation.construct.items": 1,
          } ], { selfMongo });
          thisDailySales = await back.mongoPick("dailySales", [
            {
              $or: thisCliids.map((thisCliid) => {
                return {
                  cliids: {
                    $elemMatch: {
                      cliid: thisCliid
                    }
                  }
                }
              })
            },
            { date: 1, cliids: 1, _id: 0 }
          ], { selfMongo });

          allProjects = await back.mongoPick("project", [ historyWhereQuery, { cliid: 1, proid: 1, proposal: 1 } ], { selfMongo: selfCoreMongo });
          allDesigners = await back.mongoPick("designer", [ {}, { desid: 1, designer: 1 } ], { selfMongo: selfCoreMongo });
          resultArr = [];
          for (let { manager, cliid, curation: { analytics: { send }, service: { serid }, construct: { items } } } of thisHistories) {
            resultArr.push({
              cliid,
              manager,
              proposal: send.filter((obj) => { return obj.page === "designerProposal" }),
              about: send.filter((obj) => { return obj.page === "finalPush" }),
              pure: send.filter((obj) => { return obj.page === "pureOutOfClient" }),
              haha: send.filter((obj) => { return obj.page === "lowLowPush" }),
              serid,
              construct: items,
            })
          }

          for (let obj of data) {
            thisHistory = resultArr.find((o) => { return o.cliid === obj.standard.cliid });
            thisHistory.proposal.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });
            thisHistory.about.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });
            thisHistory.pure.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });
            thisHistory.haha.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });

            if (thisHistory.proposal.length > 0) {
              proposalSend = dateToString(thisHistory.proposal[0].date);
              thisProjects = allProjects.filter((project) => { return project.cliid === obj.standard.cliid });
              thisProjects.sort((a, b) => { return b.proposal.date.valueOf() - a.proposal.date.valueOf() });
              desidArr = thisProjects[0].proposal.detail.map((o) => { return o.desid });
              designersArr = desidArr.map((desid) => { return allDesigners.find((d) => { return d.desid === desid }).designer; });
            } else {
              proposalSend = '-';
              desidArr = [];
              designersArr = [];
            }

            obj.info.manager = thisHistory.manager;
            obj.info.proposalSend = proposalSend;
            obj.info.pureSend = thisHistory.pure.length > 0 ? dateToString(thisHistory.pure[0].date) : '-';
            obj.info.aboutSend = thisHistory.about.length > 0 ? dateToString(thisHistory.about[0].date) : '-';
            obj.info.hahaSend = thisHistory.haha.length > 0 ? dateToString(thisHistory.haha[0].date) : '-';
            obj.info.desids = desidArr.length > 0 ? desidArr.join(", ") : "-";
            obj.info.proposalDesigners = designersArr.length > 0 ? designersArr.join(", ") : "-";
            obj.info.wantsService = thisHistory.serid.length > 0 ? serviceParsing(thisHistory.serid[0]) : "-";
            obj.info.selectConstruct = thisHistory.construct.length > 0 ? thisHistory.construct.map((str) => { return str.replace(/ 공사/gi, "").trim() }).join(", ") : "-";

            dailySalesArr = thisDailySales.filter((s) => {
              if (s.cliids.findIndex((o) => { return o.cliid === obj.standard.cliid }) === -1) {
                return false;
              } else {
                return true;
              }
            }).map((o) => { return o.date });

            if (dailySalesArr.length === 0) {
              obj.info.standardDate = '-';
            } else if (dailySalesArr.length === 1) {
              obj.info.standardDate = dateToString(dailySalesArr[0]);
            } else {
              dailySalesArr.sort((a, b) => { return b.valueOf() - a.valueOf() });
              thisRequestIndex = raw_data.find((client) => { return client.cliid === obj.standard.cliid }).requests.toNormal().map((re) => {
                return dateToString(re.request.timeline, true).slice(0, 13);
              }).findIndex((str) => { return str === obj.info.timeline.slice(0, 13) });
              thisSalesDate = dailySalesArr[thisRequestIndex]
              if (thisSalesDate === undefined) {
              obj.info.standardDate = '-';
              } else {
              obj.info.standardDate = dateToString(thisSalesDate);
              }
            }
          }

        } else if (req.url === "/getProjects") {

          thisCliids = data.map((obj) => { return obj.middle.cliid });
          historyWhereQuery = {};
          historyWhereQuery["$or"] = thisCliids.map((cliid) => { return { cliid } });

          allClients = await back.mongoRead("client", historyWhereQuery, { selfMongo: selfCoreMongo });

          evaluationSendRows = (await requestSystem("https://" + instance.address.officeinfo.host + ":3002/justClientEvaluation", { mode: "all", cliid: "", proid: "" }, { headers: { "Content-Type": "application/json" } })).data;
          evaluationResultRows = (await requestSystem("https://" + instance.address.officeinfo.host + ":3002/justClientEvaluation", { mode: "resultAll", cliid: "", proid: "" }, { headers: { "Content-Type": "application/json" } })).data;

          for (let obj of data) {
            thisHistory = allClients.find((o) => { return o.cliid === obj.middle.cliid });
            thisRequestNumber = 0;
            for (let i = 0; i < thisHistory.requests.length; i++) {
              if (thisHistory.requests[i].request.timeline.valueOf() <= stringToDate(obj.info.proposalDate).valueOf()) {
                thisRequestNumber = i;
                break;
              }
            }
            thisRequest = thisHistory.requests[thisRequestNumber].request;

            thisEvaluationSendRow = evaluationSendRows.map((r) => { return r.proid }).includes(obj.standard.proid) ? 1 : 0;
            thisEvaluationResultRow = evaluationResultRows.map((r) => { return r.proid }).includes(obj.standard.proid) ? 1 : 0;

            obj.info.name = thisHistory.name;
            obj.info.address = thisRequest.space.address;
            obj.info.spaceContract = thisRequest.space.contract;
            obj.info.pyeong = thisRequest.space.pyeong;
            obj.info.evaluationSend = thisEvaluationSendRow === 1 ? "전송" : "미전송";
            obj.info.evaluationResult = thisEvaluationResultRow === 1 ? "완료" : "미완료";
          }

        }
        res.send(JSON.stringify({ standard, data }));
      } else {
        res.send(JSON.stringify(raw_data.toNormal()));
      }
    } catch (e) {
      logger.error("Console 서버 문제 생김 (rou_post_getDocuments): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_searchDocuments = function () {
  const instance = this;
  const back = this.back;
  const { equalJson, dateToString, serviceParsing, db, stringToDate, requestSystem } = this.mother;
  let obj = {};
  obj.link = [ "/searchClients", "/searchProjects", "/searchDesigners", "/searchContents" ];
  obj.func = async function (req, res, logger) {
    try {
      const selfMongo = instance.mongolocal;
      const selfCoreMongo = instance.mongo;
      const db = "miro81";
      let standard;
      let map, mapArr;
      let searchQuery, searchArr, tempObj, tempObj2;
      let whereQuery;
      let data;
      let rawJson;
      let filteredArr;
      let idName;
      let historyWhereQuery;
      let thisCliids;
      let thisHistories;
      let resultArr;
      let thisHistory;
      let proposalSend;
      let thisProjects;
      let allProjects;
      let allDesigners;
      let desidArr, designersArr;
      let thisDailySales;
      let dailySalesArr;
      let thisRequestIndex;
      let thisSalesDate;
      let queryArr;
      let allClients;
      let thisRequestNumber;
      let thisRequest;
      let evaluationSendRows;
      let evaluationResultRows;
      let thisEvaluationSendRow;
      let thisEvaluationResultRow;

      if (req.url === "/searchClients") {
        standard = instance.patch.clientStandard();
        map = instance.patch.clientMap();
        idName = "cliid";
      } else if (req.url === "/searchProjects") {
        standard = instance.patch.projectStandard();
        map = instance.patch.projectMap();
        idName = "proid";
      } else if (req.url === "/searchDesigners") {
        standard = instance.patch.designerStandard();
        map = instance.patch.designerMap();
        idName = "desid";
      } else if (req.url === "/searchContents") {
        standard = instance.patch.contentsStandard();
        map = instance.patch.contentsMap();
        idName = "conid";
      }

      mapArr = Object.values(map);
      searchQuery = {};
      if (/^id\:/gi.test(req.body.query)) {
        searchArr = req.body.query.slice(3).trim().split(',').map((str) => { return str.trim(); });
        searchArr = searchArr.map((str) => { let obj = {}; obj[idName] = str; return obj; });
      } else {
        searchArr = [];
        for (let { position, searchBoo } of mapArr) {
          if (searchBoo) {
            tempObj = {};
            tempObj2 = {};
            if (req.body.query !== "") {
              tempObj["$regex"] = new RegExp(DataRouter.queryFilter(req.body.query), 'gi');
            } else {
              tempObj["$regex"] = new RegExp('.', 'gi');
            }
            tempObj2[position] = tempObj["$regex"];
            searchArr.push(tempObj2);
          }
        }

        if (req.url === "/searchDesigners" && /,/gi.test(req.body.query)) {
          queryArr = req.body.query.split(",").map((s) => { return s.trim() });
          queryArr = queryArr.map((s) => { return { designer: { $regex: s } } });
          searchArr = searchArr.concat(queryArr);
        }

      }
      searchQuery["$or"] = searchArr;

      if (req.url === "/searchClients") {
        rawJson = await instance.back.getClientsByQuery(searchQuery, { withTools: true, selfMongo: instance.mongo });
      } else if (req.url === "/searchProjects") {
        rawJson = await instance.back.getProjectsByQuery(searchQuery, { withTools: true, selfMongo: instance.mongo });
        if (/\/project/g.test(req.headers.referer)) {

          if (/^d/i.test(req.body.query)) {
            req.body.query = req.body.query.replace(/[\~\!\@\#\$\%\^\&\*\(\)\_\:\;\?\/\|\<\>\,\.\\\]\[\{\} \n\t]/g, '').replace(/^d/i, '');
            if (rawJson.length === 0) {
              mapArr = Object.values(instance.patch.designerMap());
              searchQuery = {};
              searchArr = [];
              for (let { position, searchBoo } of mapArr) {
                if (searchBoo) {
                  tempObj = {};
                  tempObj2 = {};
                  if (req.body.query !== "") {
                    tempObj["$regex"] = new RegExp(DataRouter.queryFilter(req.body.query), 'gi');
                  } else {
                    tempObj["$regex"] = new RegExp('.', 'gi');
                  }
                  tempObj2[position] = tempObj["$regex"];
                  searchArr.push(tempObj2);
                }
              }
              searchQuery["$or"] = searchArr;
              if (req.body.query !== "") {
                rawJson = await instance.back.getDesignersByQuery(searchQuery, { withTools: true, selfMongo: instance.mongo });
              } else {
                rawJson = await instance.back.getDesignersByQuery(searchQuery, { withTools: true, selfMongo: instance.mongo });
              }

              whereQuery = {};
              whereQuery["$or"] = [];
              for (let designers of rawJson) {
                whereQuery["$or"].push({ desid: designers.desid });
              }

              if (whereQuery["$or"].length > 0) {
                rawJson = await instance.back.getProjectsByQuery(whereQuery, { withTools: true, selfMongo: instance.mongo });
              } else {
                rawJson = [];
              }

            }
          } else {
            if (rawJson.length === 0) {
              mapArr = Object.values(instance.patch.clientMap());
              searchQuery = {};
              searchArr = [];
              for (let { position, searchBoo } of mapArr) {
                if (searchBoo) {
                  tempObj = {};
                  tempObj2 = {};
                  if (req.body.query !== "") {
                    tempObj["$regex"] = new RegExp(DataRouter.queryFilter(req.body.query), 'gi');
                  } else {
                    tempObj["$regex"] = new RegExp('.', 'gi');
                  }
                  tempObj2[position] = tempObj["$regex"];
                  searchArr.push(tempObj2);
                }
              }
              searchQuery["$or"] = searchArr;
              if (req.body.query !== "") {
                rawJson = await instance.back.getClientsByQuery(searchQuery, { withTools: true, selfMongo: instance.mongo });
              } else {
                rawJson = await instance.back.getClientsByQuery(searchQuery, { withTools: true, selfMongo: instance.mongo });
              }

              whereQuery = {};
              whereQuery["$or"] = [];
              for (let client of rawJson) {
                whereQuery["$or"].push({ cliid: client.cliid });
              }

              if (whereQuery["$or"].length > 0) {
                rawJson = await instance.back.getProjectsByQuery(whereQuery, { withTools: true, selfMongo: instance.mongo });
              } else {
                rawJson = [];
              }

              if (rawJson.length === 0) {
                mapArr = Object.values(instance.patch.designerMap());
                searchQuery = {};
                searchArr = [];
                for (let { position, searchBoo } of mapArr) {
                  if (searchBoo) {
                    tempObj = {};
                    tempObj2 = {};
                    if (req.body.query !== "") {
                      tempObj["$regex"] = new RegExp(DataRouter.queryFilter(req.body.query), 'gi');
                    } else {
                      tempObj["$regex"] = new RegExp('.', 'gi');
                    }
                    tempObj2[position] = tempObj["$regex"];
                    searchArr.push(tempObj2);
                  }
                }
                searchQuery["$or"] = searchArr;
                if (req.body.query !== "") {
                  rawJson = await instance.back.getDesignersByQuery(searchQuery, { withTools: true, selfMongo: instance.mongo });
                } else {
                  rawJson = await instance.back.getDesignersByQuery(searchQuery, { withTools: true, selfMongo: instance.mongo });
                }

                whereQuery = {};
                whereQuery["$or"] = [];
                for (let designers of rawJson) {
                  whereQuery["$or"].push({ desid: designers.desid });
                }

                if (whereQuery["$or"].length > 0) {
                  rawJson = await instance.back.getProjectsByQuery(whereQuery, { withTools: true, selfMongo: instance.mongo });
                } else {
                  rawJson = [];
                }

              }

            }
          }

          filteredArr = [];
          for (let obj of rawJson) {
            if (obj.desid !== "") {
              filteredArr.push(obj);
            }
          }
          filteredArr.flatDeath = function () {
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
          filteredArr.planeDeath = function () {
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

          rawJson = filteredArr;
        }
      } else if (req.url === "/searchDesigners") {
        rawJson = await instance.back.getDesignersByQuery(searchQuery, { withTools: true, selfMongo: instance.mongo });
      } else if (req.url === "/searchContents") {
        rawJson = await instance.back.getContentsArrByQuery(searchQuery, { withTools: true, selfMongo: instance.mongo });
      }

      if (req.body.noFlat === undefined) {
        data = rawJson.flatDeath();
        if (req.url === "/searchClients") {

          thisCliids = data.map((obj) => { return obj.standard.cliid });
          historyWhereQuery = {};
          historyWhereQuery["$or"] = thisCliids.map((cliid) => { return { cliid } });

          if (thisCliids.length > 0) {
            thisHistories = await selfMongo.db(db).collection("clientHistory").find(historyWhereQuery).project({ cliid: 1, manager: 1, "curation.analytics.send": 1, _id: 0 }).toArray();
            thisDailySales = await selfMongo.db(db).collection("dailySales").find({
              $or: thisCliids.map((thisCliid) => {
                return {
                  cliids: {
                    $elemMatch: {
                      cliid: thisCliid
                    }
                  }
                }
              })
            }).project({ date: 1, cliids: 1, _id: 0 }).toArray();
            allProjects = await selfCoreMongo.db(db).collection("project").find(historyWhereQuery).project({ cliid: 1, proid: 1, proposal: 1, _id: 0 }).toArray();
          } else {
            thisHistories = [];
            thisDailySales = [];
            allProjects = [];
          }

          allDesigners =await selfCoreMongo.db(db).collection("designer").find({}).project({ desid: 1, designer: 1, _id: 0 }).toArray();
          resultArr = [];
          for (let { manager, cliid, curation: { analytics: { send } } } of thisHistories) {
            resultArr.push({
              cliid,
              manager,
              proposal: send.filter((obj) => { return obj.page === "designerProposal" }),
              about: send.filter((obj) => { return obj.page === "finalPush" }),
              pure: send.filter((obj) => { return obj.page === "pureOutOfClient" }),
              haha: send.filter((obj) => { return obj.page === "lowLowPush" }),
            })
          }

          for (let obj of data) {
            thisHistory = resultArr.find((o) => { return o.cliid === obj.standard.cliid });
            thisHistory.proposal.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });

            if (thisHistory.proposal.length > 0) {
              proposalSend = dateToString(thisHistory.proposal[0].date);
              thisProjects = allProjects.filter((project) => { return project.cliid === obj.standard.cliid });
              thisProjects.sort((a, b) => { return b.proposal.date.valueOf() - a.proposal.date.valueOf() });
              desidArr = thisProjects[0].proposal.detail.map((o) => { return o.desid });
              designersArr = desidArr.map((desid) => { return allDesigners.find((d) => { return d.desid === desid }).designer; });
            } else {
              proposalSend = '-';
              desidArr = [];
              designersArr = [];
            }

            obj.info.manager = thisHistory.manager;
            obj.info.proposalSend = proposalSend;
            obj.info.pureSend = thisHistory.pure.length > 0 ? dateToString(thisHistory.pure[0].date) : '-';
            obj.info.aboutSend = thisHistory.about.length > 0 ? dateToString(thisHistory.about[0].date) : '-';
            obj.info.hahaSend = thisHistory.haha.length > 0 ? dateToString(thisHistory.haha[0].date) : '-';
            obj.info.desids = desidArr.length > 0 ? desidArr.join(", ") : "-";
            obj.info.proposalDesigners = designersArr.length > 0 ? designersArr.join(", ") : "-";
            dailySalesArr = thisDailySales.filter((s) => {
              if (s.cliids.findIndex((o) => { return o.cliid === obj.standard.cliid }) === -1) {
                return false;
              } else {
                return true;
              }
            }).map((o) => { return o.date });

            if (dailySalesArr.length === 0) {
              obj.info.standardDate = '-';
            } else if (dailySalesArr.length === 1) {
              obj.info.standardDate = dateToString(dailySalesArr[0]);
            } else {
              dailySalesArr.sort((a, b) => { return b.valueOf() - a.valueOf() });
              thisRequestIndex = rawJson.find((client) => { return client.cliid === obj.standard.cliid }).requests.toNormal().map((re) => {
                return dateToString(re.request.timeline, true).slice(0, 13);
              }).findIndex((str) => { return str === obj.info.timeline.slice(0, 13) });
              thisSalesDate = dailySalesArr[thisRequestIndex]
              if (thisSalesDate === undefined) {
              obj.info.standardDate = '-';
              } else {
              obj.info.standardDate = dateToString(thisSalesDate);
              }
            }
          }

        } else if (req.url === "/searchProjects") {

          thisCliids = data.map((obj) => { return obj.middle.cliid });
          historyWhereQuery = {};
          historyWhereQuery["$or"] = thisCliids.map((cliid) => { return { cliid } });

          allClients = await back.mongoRead("client", historyWhereQuery, { selfMongo: selfCoreMongo });

          evaluationSendRows = (await requestSystem("https://" + instance.address.officeinfo.host + ":3002/justClientEvaluation", { mode: "all", cliid: "", proid: "" }, { headers: { "Content-Type": "application/json" } })).data;
          evaluationResultRows = (await requestSystem("https://" + instance.address.officeinfo.host + ":3002/justClientEvaluation", { mode: "resultAll", cliid: "", proid: "" }, { headers: { "Content-Type": "application/json" } })).data;

          for (let obj of data) {
            thisHistory = allClients.find((o) => { return o.cliid === obj.middle.cliid });
            thisRequestNumber = 0;
            for (let i = 0; i < thisHistory.requests.length; i++) {
              if (thisHistory.requests[i].request.timeline.valueOf() <= stringToDate(obj.info.proposalDate).valueOf()) {
                thisRequestNumber = i;
                break;
              }
            }
            thisRequest = thisHistory.requests[thisRequestNumber].request;

            thisEvaluationSendRow = evaluationSendRows.map((r) => { return r.proid }).includes(obj.standard.proid) ? 1 : 0;
            thisEvaluationResultRow = evaluationResultRows.map((r) => { return r.proid }).includes(obj.standard.proid) ? 1 : 0;

            obj.info.name = thisHistory.name;
            obj.info.address = thisRequest.space.address;
            obj.info.spaceContract = thisRequest.space.contract;
            obj.info.pyeong = thisRequest.space.pyeong;
            obj.info.evaluationSend = thisEvaluationSendRow === 1 ? "전송" : "미전송";
            obj.info.evaluationResult = thisEvaluationResultRow === 1 ? "완료" : "미완료";
          }

        }
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ standard, data }));
      } else {
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify(rawJson.toNormal()));
      }
    } catch (e) {
      logger.error("Console 서버 문제 생김 (rou_post_searchDocuments): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_updateDocument = function () {
  const instance = this;
  const back = this.back;
  const { fileSystem, pythonExecute, shellExec, shellLink, equalJson, dateToString } = this.mother;
  let obj = {};
  obj.link = [ "/updateClient", "/updateDesigner", "/updateProject", "/updateContents" ];
  obj.func = async function (req, res, logger) {
    try {
      let { thisId, requestIndex, column, value, pastValue, user, thisCase } = equalJson(req.body);
      let thisPath;
      let map;
      let whereQuery, updateQuery;
      let message;
      let finalValue, valueTemp, pastFinalValue, pastValueTemp;
      let temp, temp2, temp3;
      let tempFunction;
      let position;
      let userArr;
      let today;
      let noUpdate;
      let updateTong;

      if (req.url === "/updateClient") {
        thisPath = "client";
        map = instance.patch.clientMap();
      } else if (req.url === "/updateDesigner") {
        thisPath = "designer";
        map = instance.patch.designerMap();
      } else if (req.url === "/updateProject") {
        thisPath = "project";
        map = instance.patch.projectMap();
      } else if (req.url === "/updateContents") {
        thisPath = "contents";
        map = instance.patch.contentsMap();
      }

      noUpdate = false;

      if (typeof value !== "string") {
        if (value instanceof Date) {
          value = dateToString(value, true);
        }
      }

      switch (map[column].type) {
        case "string":
          finalValue = String(value).trim().replace(/\t/gi, '');
          pastFinalValue = String(pastValue).trim().replace(/\t/gi, '');
          break;
        case "number":
          if (Number.isNaN(Number(value.replace(/[^0-9\.\-]/g, '')))) {
            finalValue = Number(pastValue.replace(/[^0-9\.\-]/g, ''));
          } else {
            finalValue = Number(value.replace(/[^0-9\.\-]/g, ''));
          }
          pastFinalValue = Number(pastValue.replace(/[^0-9\.\-]/g, ''));
          break;
        case "date":
          if (value === "-" || value === "") {
            value = "1800-01-01";
          } else if (/예정/g.test(value)) {
            value = "3800-01-01";
          }
          if (/^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]/g.test(value)) {
            if (value.length === 10) {
              temp = value.split('-');
              finalValue = new Date(Number(temp[0]), Number(temp[1].replace(/^0/, '')) - 1, Number(temp[2].replace(/^0/, '')));
            } else if (value.length === 19) {
              temp = value.split(' ');
              temp2 = temp[0].split('-');
              temp3 = temp[1].split(':');
              finalValue = new Date(Number(temp2[0]), Number(temp2[1].replace(/^0/, '')) - 1, Number(temp2[2].replace(/^0/, '')), Number(temp3[0].replace(/^0/, '')), Number(temp3[1].replace(/^0/, '')), Number(temp3[2].replace(/^0/, '')));
            } else {
              finalValue = new Date(pastValue);
            }
          } else {
            finalValue = new Date(pastValue);
          }
          pastFinalValue = new Date(pastValue);
          break;
        case "boolean":
          if (/^미/.test(value) || /^비/.test(value) || /^안/.test(value) || /no/gi.test(value) || value === "false" || value === "null" || value === "전체") {
            pastFinalValue = false;
            finalValue = false;
          } else {
            pastFinalValue = true;
            finalValue = true;
          }
          break;
        case "array":
          finalValue = [];
          pastFinalValue = [];
          valueTemp = value.split(", ");
          pastValueTemp = pastValue.split(", ");
          for (let i of valueTemp) {
            finalValue.push(i);
          }
          for (let i of pastValueTemp) {
            pastFinalValue.push(i);
          }
          break;
        case "object":
          tempFunction = new Function("value", "pastValue", "vaildMode", map[column].objectFunction);
          finalValue = tempFunction(value, pastValue, false);
          pastFinalValue = tempFunction(pastValue, pastValue, false);
          break;
        case "null":
          noUpdate = true;
          finalValue = null;
          pastFinalValue = null;
        case "link":
          finalValue = String(value);
          break;
        default:
          throw new Error("invaild type");
      }

      if (!noUpdate) {
        updateQuery = {};
        position = map[column].position.replace(/\.0\./, ("." + requestIndex + "."));
        if (position !== "null") {

          updateQuery[position] = finalValue;

          whereQuery = {};
          if (req.url === "/updateClient") {
            whereQuery[map.cliid.position] = thisId;
          } else if (req.url === "/updateDesigner") {
            whereQuery[map.desid.position] = thisId;
          } else if (req.url === "/updateProject") {
            whereQuery[map.proid.position] = thisId;
          } else if (req.url === "/updateContents") {
            whereQuery[map.conid.position] = thisId;
          }

          if (map[column].isHistory !== undefined && map[column].isHistory !== null) {
            if (req.url === "/updateClient") {
              message = await instance.back.updateHistory("client", [ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });
            } else if (req.url === "/updateDesigner") {
              message = await instance.back.updateHistory("designer", [ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });
            } else if (req.url === "/updateProject") {
              message = await instance.back.updateHistory("project", [ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });
            } else if (req.url === "/updateContents") {
              message = await instance.back.updateHistory("contents", [ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });
            }
          } else {
            if (req.url === "/updateClient") {
              message = await instance.back.updateClient([ whereQuery, updateQuery ], { selfMongo: instance.mongo });
            } else if (req.url === "/updateDesigner") {
              message = await instance.back.updateDesigner([ whereQuery, updateQuery ], { selfMongo: instance.mongo });
            } else if (req.url === "/updateProject") {
              message = await instance.back.updateProject([ whereQuery, updateQuery ], { selfMongo: instance.mongo });
            } else if (req.url === "/updateContents") {
              message = await instance.back.updateContents([ whereQuery, updateQuery ], { selfMongo: instance.mongo });
            }
          }

          //update log
          const members = instance.members;
          const logDir = `${instance.dir}/log`;
          let thisPerson, fileTarget;

          userArr = user.split("__split__");
          today = new Date();

          for (let { name, email } of members) {
            if (email.includes(userArr[1])) {
              thisPerson = name;
              break;
            }
          }

          updateTong = {
            user: {
              name: thisPerson,
              email: userArr[1]
            },
            where: thisId,
            update: {
              target: position,
              value: finalValue,
              pastValue: pastFinalValue
            },
            date: today
          };

          back.mongoCreate((req.url.replace(/^\//, '') + "Log"), updateTong, { selfMongo: instance.mongolocal }).catch(function (e) {
            throw new Error(e);
          });

          await fileSystem(`write`, [ logDir + "/" + thisPath + "_" + "latest.json", JSON.stringify({ path: thisPath, who: thisPerson, where: thisId, column: column, value: value, date: today }) ]);
          const dir = await fileSystem(`readDir`, [ logDir ]);
          fileTarget = null;

          for (let fileName of dir) {
            if ((new RegExp("^" + thisId)).test(fileName)) {
              fileTarget = fileName;
            }
          }
          if (fileTarget !== null) {
            await shellExec(`rm -rf ${shellLink(logDir)}/${fileTarget}`);
          }
          await fileSystem(`write`, [ `${instance.dir}/log/${thisId}__name__${thisPerson}`, `0` ]);

        } else {
          message = "success";
        }
      }

      //calendar
      if (map[column].calendar !== undefined) {
        if (typeof map[column].calendar === "function") {
          let calendObj, start, id, to, title;
          calendObj = map[column].calendar(equalJson(thisCase));
          id = calendObj.id;
          to = calendObj.to;
          title = calendObj.title;
          start = finalValue;
          instance.calendar.listEvents(to, id).then((searchResult) => {
            if (searchResult.length === 0) {
              instance.calendar.makeSchedule(to, title, "", start, null);
            } else {
              instance.calendar.updateSchedule(to, searchResult[0].eventId, { start, title });
            }
          }).catch((err) => {
            throw new Error(err);
          });
        }
      }

      res.set("Content-Type", "application/json");
      res.send(JSON.stringify({ message }));
    } catch (e) {
      logger.error("Console 서버 문제 생김 (rou_post_updateDocument): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_updateLog = function () {
  const instance = this;
  const back = this.back;
  const { fileSystem, shellExec, shellLink, equalJson } = this.mother;
  let obj = {};
  obj.link = [ "/updateLog" ];
  obj.func = async function (req, res, logger) {
    try {
      if (req.body.id === undefined || req.body.column === undefined || req.body.position === undefined || req.body.pastValue === undefined || req.body.finalValue === undefined) {
        throw new Error("invaild post");
      }
      const { id: thisId, column, position, pastValue, finalValue } = equalJson(req.body);
      const fixedEmail = "uragenbooks@gmail.com";
      const members = instance.members;
      const logDir = `${instance.dir}/log`;
      const today = new Date();
      let thisPerson, fileTarget, thisPath, dir;
      let updateTong;
      let logCollectionName;

      if (/^c/.test(thisId)) {
        thisPath = "client";
        logCollectionName = "updateClientLog";
      } else if (/^d/.test(thisId)) {
        thisPath = "designer";
        logCollectionName = "updateDesignerLog";
      } else if (/^p/.test(thisId)) {
        thisPath = "project";
        logCollectionName = "updateProjectLog";
      } else if (/^t/.test(thisId)) {
        thisPath = "contents";
        logCollectionName = "updateContentsLog";
      }

      for (let { name, email } of members) {
        if (email.includes(fixedEmail)) {
          thisPerson = name;
          break;
        }
      }

      updateTong = {
        user: {
          name: thisPerson,
          email: fixedEmail
        },
        where: thisId,
        update: {
          target: position,
          value: finalValue,
          pastValue: pastValue
        },
        date: today
      };

      back.mongoCreate(logCollectionName, updateTong, { selfMongo: instance.mongolocal }).catch(function (e) {
        throw new Error(e);
      });

      await fileSystem(`write`, [ logDir + "/" + thisPath + "_" + "latest.json", JSON.stringify({ path: thisPath, who: thisPerson, where: thisId, column: column, value: finalValue, date: today }) ]);
      dir = await fileSystem(`readDir`, [ logDir ]);
      fileTarget = null;
      for (let fileName of dir) {
        if ((new RegExp("^" + thisId)).test(fileName)) {
          fileTarget = fileName;
        }
      }
      if (fileTarget !== null) {
        await shellExec(`rm -rf ${shellLink(logDir)}/${fileTarget}`);
      }
      await fileSystem(`write`, [ `${logDir}/${thisId}__name__${thisPerson}`, `0` ]);

      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send(JSON.stringify({ message: "done" }));

    } catch (e) {
      logger.error("Console 서버 문제 생김 (rou_post_updateLog): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_rawUpdateDocument = function () {
  const instance = this;
  const back = this.back;
  const { equalJson, messageLog } = this.mother;
  let obj = {};
  obj.link = [ "/rawUpdateClient", "/rawUpdateDesigner", "/rawUpdateProject", "/rawUpdateContents", "/rawUpdateAspirant" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      let raw_data;
      let whereQuery, updateQuery, dateQuery;
      let cookies;
      let updateTong;

      if (req.body.where !== undefined) {
        whereQuery = equalJson(req.body.where);
      } else {
        whereQuery = equalJson(req.body.whereQuery);
      }

      if (req.body.updateQuery === undefined) {
        updateQuery = {};
        if (/^\{/.test(req.body.updateValue) || /^\[/.test(req.body.updateValue)) {
          updateQuery[req.body.target] = equalJson(req.body.updateValue);
        } else if (req.body.updateValue === "today") {
          updateQuery[req.body.target] = new Date();
        } else {
          updateQuery[req.body.target] = req.body.updateValue;
        }
      } else {
        updateQuery = equalJson(req.body.updateQuery);
      }

      if (req.url === "/rawUpdateClient") {
        raw_data = await back.updateClient([ whereQuery, updateQuery ], { selfMongo: instance.mongo });
      } else if (req.url === "/rawUpdateDesigner") {
        raw_data = await back.updateDesigner([ whereQuery, updateQuery ], { selfMongo: instance.mongo });
      } else if (req.url === "/rawUpdateProject") {
        raw_data = await back.updateProject([ whereQuery, updateQuery ], { selfMongo: instance.mongo });
      } else if (req.url === "/rawUpdateContents") {
        raw_data = await back.updateContents([ whereQuery, updateQuery ], { selfMongo: instance.mongo });
      } else if (req.url === "/rawUpdateAspirant") {
        raw_data = await back.updateAspirant([ whereQuery, updateQuery ], { selfMongo: instance.mongo });
      }

      updateTong = {
        user: {
          name: "unknown",
          email: "unknown"
        },
        where: Object.values(whereQuery)[0],
        update: { updateQuery: JSON.stringify(updateQuery) },
        date: new Date()
      };

      cookies = DataRouter.cookieParsing(req);
      if (cookies !== null) {
        if (cookies.homeliaisonConsoleLoginedName !== undefined && cookies.homeliaisonConsoleLoginedEmail !== undefined) {
          updateTong.user.name = cookies.homeliaisonConsoleLoginedName;
          updateTong.user.email = cookies.homeliaisonConsoleLoginedEmail;
        }
      }

      back.mongoCreate((req.url.replace(/^\/rawU/, 'u') + "Log"), updateTong, { selfMongo: instance.mongolocal }).catch(function (e) {
        throw new Error(e);
      });

      res.send(JSON.stringify({ message: raw_data }));

    } catch (e) {
      logger.error("Console 서버 문제 생김 (rou_post_rawUpdateDocument): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_deleteDocument = function () {
  const instance = this;
  let obj = {};
  obj.link = [ "/deleteClient", "/deleteDesigner", "/deleteProject", "/deleteContents" ];
  obj.func = async function (req, res, logger) {
    try {
      if (req.url === "/deleteClient") {
        await instance.back.deleteClient(req.body.id, { selfMongo: instance.mongo });
      } else if (req.url === "/deleteDesigner") {
        await instance.back.deleteDesigner(req.body.id, { selfMongo: instance.mongo });
      } else if (req.url === "/deleteProject") {
        await instance.back.deleteProject(req.body.id, { selfMongo: instance.mongo });
      } else if (req.url === "/deleteContents") {
        await instance.back.deleteContents(req.body.id, { selfMongo: instance.mongo });
      }

      res.set("Content-Type", "application/json");
      res.send(JSON.stringify({ message: "success" }));

    } catch (e) {
      logger.error("Console 서버 문제 생김 (rou_post_deleteDocument): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_createDocument = function () {
  const instance = this;
  const { equalJson } = this.mother;
  let obj = {};
  obj.link = [ "/createClient", "/createDesigner", "/createProject", "/createContents" ];
  obj.func = async function (req, res, logger) {
    try {
      const updateQuery = equalJson(req.body.updateQuery);
      let id;

      if (req.url === "/createClient") {
        id = await instance.back.createClient(updateQuery, { selfMongo: instance.mongo });
      } else if (req.url === "/createDesigner") {
        id = await instance.back.createDesigner(updateQuery, { selfMongo: instance.mongo });
      } else if (req.url === "/createProject") {
        updateQuery["proposal.date"] = new Date();
        id = await instance.back.createProject(updateQuery, { selfMongo: instance.mongo });
      } else if (req.url === "/createContents") {
        id = await instance.back.createContents(updateQuery, { selfMongo: instance.mongo });
      }

      res.set("Content-Type", "application/json");
      res.send(JSON.stringify({ id: id }));
    } catch (e) {
      logger.error("Console 서버 문제 생김 (rou_post_createDocument): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_getServices = function () {
  const instance = this;
  const back = this.back;
  const { equalJson } = this.mother;
  let obj = {};
  obj.link = [ "/getServices", "/getServiceByKey", "/getServicesByKind" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.url === "/getServices") {
        if (req.body.whereQuery === undefined) {
          throw new Error("invalid post");
        }
        const { whereQuery } = equalJson(req.body);
        const services = await back.getServicesByQuery(whereQuery, { selfMongo: instance.mongo, sort: { date: -1 } });
        res.send(JSON.stringify(services.toNormal()));
      } else if (req.url === "/getServiceByKey") {
        if (req.body.key === undefined) {
          throw new Error("invaild post");
        }
        const { key } = equalJson(req.body);
        const service = await back.getServiceByKey(key, { selfMongo: instance.mongo });
        res.send(JSON.stringify(service.toNormal()));
      } else if (req.url === "/getServicesByKind") {
        if (req.body.kind === undefined) {
          throw new Error("invaild post");
        }
        const { kind } = equalJson(req.body);
        const services = await back.getServicesByKind(kind, { selfMongo: instance.mongo });
        res.send(JSON.stringify(services.toNormal()));
      }
    } catch (e) {
      await logger.error("Console 서버 문제 생김 (rou_post_getServices): " + e.message);
      res.send(JSON.stringify({ message: "error" }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_getClientReport = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const port = 3000;
  const { equalJson, zeroAddition, requestSystem } = this.mother;
  let obj = {};
  obj.link = "/getClientReport";
  obj.func = async function (req, res, logger) {
    try {
      const today = new Date();
      const proposalStandardDate = new Date(2021, 8, 1);
      const proposalStandardDateValue = proposalStandardDate.valueOf();
      let dateMatrix;
      let searchQuery, clients, proposals, contracts, process;
      let processTong;
      let cliidArr, cliidArr_raw;
      let resultArr;
      let obj;
      let searchBoo;
      let processTong_refined, processTong_past, processTong_double;
      let doubleObject;
      let doubleClient;
      let finalLength;
      let processNumber;
      let pastTong;
      let proposalsTong;
      let cliidTempArr, proidTempArr;
      let motherClients, motherProjects, motherProjects_raw;
      let motherClientHistories;
      let histories;
      let copiedMatrix;
      let monthObject;
      let copiedCopiedMatrix;
      let yearMonthArr;
      let logRes;
      let logFound;
      let contractsPure, contractsAmount, contractsPureAmount;
      let calculationPureAmount;

      if (req.body.month === undefined) {
        if (req.body.startYear === undefined) {
          req.body.month = 8;
          searchBoo = false;
        } else {
          let { startYear, startMonth, endYear, endMonth } = req.body;
          startYear = Number(startYear);
          startMonth = Number(startMonth.replace(/^0/, ''));
          endYear = Number(endYear);
          endMonth = Number(endMonth.replace(/^0/, ''));
          req.body.month = ((today.getFullYear() * 12) + today.getMonth() + 1) - ((startYear * 12) + startMonth) + 1;
          req.body.endMonth = ((today.getFullYear() * 12) + today.getMonth() + 1) - ((endYear * 12) + endMonth);
          searchBoo = true;
        }
      } else {
        searchBoo = false;
      }

      if (!searchBoo) {
        dateMatrix = await instance.getDateMatrix(Number(req.body.month));
      } else {
        dateMatrix = await instance.getDateMatrix(Number(req.body.month));
        for (let i = 0; i < req.body.endMonth; i++) {
          dateMatrix.shift();
        }
      }

      copiedMatrix = equalJson(JSON.stringify(dateMatrix));
      copiedMatrix = copiedMatrix.flat().flat();
      copiedMatrix.sort((a, b) => {
        return a.valueOf() - b.valueOf();
      });

      motherClients = (await back.getClientsByQuery({
        $and: [
          {
            requests: {
              $elemMatch: {
                "request.timeline": { $gte: copiedMatrix[0] }
              }
            }
          },
          {
            requests: {
              $elemMatch: {
                "request.timeline": { $lte: copiedMatrix[copiedMatrix.length - 1] }
              }
            }
          }
        ]
      }, { selfMongo: instance.mongo, withTools: true })).getRequestsTong().map((arr) => { let obj = arr[0].toNormal(); obj.cliid = arr.cliid; obj.analytics = arr[1].toNormal(); return obj; });
      motherClientHistories = await back.mongoPick("clientHistory", [ {
        $or: motherClients.map((o) => { return { cliid: o.cliid } }),
      }, { cliid: 1, manager: 1, curation: 1 } ], { selfMongo: instance.mongolocal });
      motherProjects_raw = (await back.getProjectsByQuery({
        $or: motherClients.map((o) => { return { cliid: o.cliid } }).concat([
          {
            "process.contract.first.date": {
              $gte: copiedMatrix[0]
            }
          }
        ]),
      }, { selfMongo: instance.mongo })).toNormal();
      motherProjects = motherProjects_raw.filter((obj) => {  return obj.process.contract.first.date.valueOf() >= (new Date(2000, 0, 1)).valueOf() });

      yearMonthArr = [];
      resultArr = [];
      for (let matrix of dateMatrix) {

        copiedCopiedMatrix = equalJson(JSON.stringify(matrix));
        copiedCopiedMatrix = copiedCopiedMatrix.flat();
        copiedCopiedMatrix.sort((a, b) => {
          return b.valueOf() - a.valueOf();
        });

        monthObject = {
          year: copiedCopiedMatrix[Math.round(copiedCopiedMatrix.length / 2)].getFullYear(),
          month: copiedCopiedMatrix[Math.round(copiedCopiedMatrix.length / 2)].getMonth() + 1,
        };
        yearMonthArr.push((monthObject.year * 100) + monthObject.month);

        monthArr = [];
        for (let arr of matrix) {

          obj = {};

          obj.cliid = {};
          obj.proid = {};

          obj.startDay = `${zeroAddition(arr[0].getFullYear())}-${zeroAddition(arr[0].getMonth() + 1)}-${zeroAddition(arr[0].getDate())}`;
          obj.endDay = `${zeroAddition(arr[1].getFullYear())}-${zeroAddition(arr[1].getMonth() + 1)}-${zeroAddition(arr[1].getDate())}`;

          //client
          clients = motherClients.filter((obj) => { return obj.timeline.valueOf() >= arr[0].valueOf() && obj.timeline.valueOf() < arr[2].valueOf() });
          obj.client = clients.length;
          obj.cliid.client = clients.map((obj) => { return obj.cliid; });
          obj.proid.client = [];

          //proposal
          if (arr[0].valueOf() > proposalStandardDateValue) {
            cliidArr_raw = clients.map((obj) => { return obj.cliid; });
            cliidArr_raw = Array.from(new Set(cliidArr_raw));
            process = motherProjects_raw.filter((obj) => { return cliidArr_raw.includes(obj.cliid) });
            histories = process
            obj.proposal = histories.length;
            obj.cliid.proposal = [ ...new Set(histories.map((obj) => { return obj.cliid })) ];
            obj.proid.proposal = [ ...new Set(process.map((obj) => { return obj.proid })) ];
          } else {
            cliidArr_raw = clients.map((obj) => { return obj.cliid; });
            cliidArr_raw = Array.from(new Set(cliidArr_raw));
            process = motherProjects_raw.filter((obj) => { return cliidArr_raw.includes(obj.cliid) });
            obj.proposal = process.length;
            obj.cliid.proposal = [ ...new Set(process.map((obj) => { return obj.cliid })) ];
            obj.proid.proposal = [ ...new Set(process.map((obj) => { return obj.proid })) ];
          }

          //recommend
          if (arr[0].valueOf() > proposalStandardDateValue) {
            obj.recommend = 0;
            obj.cliid.recommend = [];
            obj.proid.recommend = [];
          } else {
            obj.recommend = 0;
            obj.cliid.recommend = [];
            obj.proid.recommend = [];
          }

          //contract
          contracts = motherProjects.filter((obj) => { return obj.process.contract.first.date.valueOf() >= arr[0].valueOf() && obj.process.contract.first.date.valueOf() < arr[2].valueOf() });
          obj.contract = contracts.length;
          obj.cliid.contract = [ ...new Set(contracts.map((obj) => { return obj.cliid; })) ];
          obj.proid.contract = contracts.map((obj) => { return obj.proid });

          //contract pure
          contractsPure = contracts.filter((c) => { return !/드[랍롭]/gi.test(c.process.status) });
          obj.contractsPure = contractsPure.length;
          obj.cliid.contractsPure = [ ...new Set(contractsPure.map((obj) => { return obj.cliid; })) ];
          obj.proid.contractsPure = contractsPure.map((obj) => { return obj.proid });

          //contract amount
          contractsAmount = contractsPure.map((c) => { return c.process.contract.remain.calculation.amount.consumer });
          obj.contractsAmount = contractsAmount.reduce((acc, curr) => { return acc + curr }, 0);

          //contract amount pure
          contractsPureAmount = contractsPure.map((c) => { return c.process.contract.remain.calculation.amount.supply });
          obj.contractsPureAmount = contractsPureAmount.reduce((acc, curr) => { return acc + curr }, 0);

          //calculation subtract
          calculationPureAmount = contractsPure.map((c) => { return c.process.calculation.payments.totalAmount });
          obj.contractAmountSubtract = obj.contractsPureAmount - calculationPureAmount.reduce((acc, curr) => { return acc + curr }, 0);

          //process start
          cliidArr_raw = clients.filter((obj) => { return !/드[롭랍]/gi.test(obj.analytics.response.status) }).map((obj) => { return obj.cliid; });
          cliidArr_raw = Array.from(new Set(cliidArr_raw));
          process = motherProjects_raw.filter((obj) => { return cliidArr_raw.includes(obj.cliid) }).filter((obj) => {
            return obj.desid.trim() !== '';
          });
          obj.process = process.length;
          obj.cliid.process = [ ...new Set(process.map((obj) => { return obj.cliid })) ];
          obj.proid.process = [ ...new Set(process.map((obj) => { return obj.proid })) ];

          monthArr.push(obj);
        }
        monthObject.data = equalJson(JSON.stringify(monthArr));

        monthObject.contractsPure = monthObject.data.reduce((acc, curr) => { return acc + curr.contractsPure }, 0);
        monthObject.contractsAmount = monthObject.data.reduce((acc, curr) => { return acc + curr.contractsAmount }, 0);
        monthObject.contractsPureAmount = monthObject.data.reduce((acc, curr) => { return acc + curr.contractsPureAmount }, 0);
        monthObject.contractAmountSubtract = monthObject.data.reduce((acc, curr) => { return acc + curr.contractAmountSubtract }, 0);

        resultArr.push(monthObject);
      }

      yearMonthArr.sort();

      logRes = await requestSystem("https://" + address.testinfo.host + ":" + String(port) + "/getClientReport", {
        fromYear: Math.floor(yearMonthArr[0] / 100),
        fromMonth: yearMonthArr[0] % 100,
        toYear: Math.floor(yearMonthArr[yearMonthArr.length - 1] / 100),
        toMonth: yearMonthArr[yearMonthArr.length - 1] % 100,
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      for (let obj of resultArr) {
        logFound = logRes.data.find((obj2) => {
          return obj2.year === obj.year && obj2.month === obj.month
        });
        if (logFound === undefined) {
          obj.mau = 0;
          obj.adClients = 0;
          obj.charge = 0;
        } else {
          obj.mau = logFound.mau
          obj.adClients = logFound.adClients
          obj.charge = logFound.charge
        }
      }

      res.set("Content-Type", "application/json");
      res.send(JSON.stringify(resultArr));
    } catch (e) {
      logger.error("Console 서버 문제 생김 (rou_post_getClientReport): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_extractAnalytics = function () {
  const instance = this;
  const back = this.back;
  const { equalJson } = this.mother;
  let obj = {};
  obj.link = [ "/extractAnalytics" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.mode === undefined) {
        throw new Error("invalid post");
      }
      const selfMongo = instance.mongo;
      const selfLocalMongo = instance.mongolocal;
      const { mode } = equalJson(req.body);
      let collection;
      let fromDate, toDate;
      let whereQuery;
      let rows;
      let motherClients;
      let clients;
      let cliidArr_raw;
      let process;
      let histories;
      let motherClientHistories;
      let motherProjects_raw;
      let motherProjects;
      let obj;
      let contracts;
      let matrix;
      let fromDateCopied;
      let tomorrow;

      if (mode === "basic") {

        if (req.body.fromDate === undefined || req.body.toDate === undefined) {
          throw new Error("invalid post 2");
        }

        ({ fromDate, toDate } = equalJson(req.body));

        fromDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate(), 0, 0, 0);
        fromDateCopied = new Date(JSON.stringify(fromDate).slice(1, -1));
        toDate = new Date(toDate.getFullYear(), toDate.getMonth(), toDate.getDate(), 0, 0, 0);
        toDate.setDate(toDate.getDate() + 1);

        motherClients = (await back.getClientsByQuery({
          $and: [
            {
              requests: {
                $elemMatch: {
                  "request.timeline": { $gte: fromDate }
                }
              }
            },
            {
              requests: {
                $elemMatch: {
                  "request.timeline": { $lt: toDate }
                }
              }
            }
          ]
        }, { selfMongo, withTools: true })).getRequestsTong().map((arr) => { let obj = arr[0].toNormal(); obj.cliid = arr.cliid; obj.analytics = arr[1].toNormal(); return obj; });
        motherClientHistories = await back.mongoPick("clientHistory", [ {
          $or: motherClients.map((o) => { return { cliid: o.cliid } }),
        }, { cliid: 1, manager: 1, curation: 1 } ], { selfMongo: selfLocalMongo });
        motherProjects_raw = (await back.getProjectsByQuery({
          $or: motherClients.map((o) => { return { cliid: o.cliid } }).concat([
            {
              "process.contract.first.date": {
                $gte: fromDate
              }
            }
          ]),
        }, { selfMongo })).toNormal();
        motherProjects = motherProjects_raw.filter((obj) => {  return obj.process.contract.first.date.valueOf() >= (new Date(2000, 0, 1)).valueOf() });

        matrix = [];
        while (fromDateCopied.valueOf() < toDate.valueOf()) {
          tomorrow = new Date(JSON.stringify(fromDateCopied).slice(1, -1));
          tomorrow.setDate(tomorrow.getDate() + 1);
          matrix.push([
            new Date(JSON.stringify(fromDateCopied).slice(1, -1)),
            tomorrow,
          ]);
          fromDateCopied.setDate(fromDateCopied.getDate() + 1);
        }

        rows = [];

        for (let [ fromDate, toDate ] of matrix) {

          obj = { fromDate, toDate };

          //client
          clients = motherClients.filter((obj) => { return obj.timeline.valueOf() >= fromDate && obj.timeline.valueOf() < toDate });
          obj.client = clients.length;

          //recommend
          histories = motherClientHistories.map((obj) => { return obj.curation.analytics.send.filter((o) => { return /designerProposal/gi.test(o.page) && (o.date.valueOf() >= fromDate && o.date.valueOf() < toDate) }) }).flat();
          obj.recommend = histories.length;

          //contract
          contracts = motherProjects.filter((obj) => { return obj.process.contract.first.date.valueOf() >= fromDate && obj.process.contract.first.date.valueOf() < toDate });
          obj.contract = contracts.length;

          rows.push(obj);
        }

        //end
        res.send(JSON.stringify(rows));

      } else {
        throw new Error("invalid mode");
      }

    } catch (e) {
      logger.error("Console 문제 생김 (rou_post_extractAnalytics): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_getProjectReport = function () {
  const instance = this;
  const back = this.back;
  const { equalJson, serviceParsing } = this.mother;
  let obj = {};
  obj.link = "/getProjectReport";
  obj.func = async function (req, res, logger) {
    res.set("Content-Type", "application/json");
    try {
      const { mode, start, end } = equalJson(req.body);
      let clients, clients2;
      let projects, projects2;
      let serviceArr;
      let designers;
      let designerArr;
      let tempClient;
      let requestNumber;

      if (mode === "service") {

        serviceArr = new Array(4);

        projects = await back.getProjectsByQuery({
          $and: [
            {
              "process.contract.first.date": { $gte: start }
            },
            {
              "process.contract.first.date": { $lt: end }
            },
            {
              "desid": { $regex: "^d" }
            }
          ]
        }, { selfMongo: instance.mongo });

        clients = await back.getClientsByQuery({
          $or: [
            ...projects.toNormal().map((obj) => { return { cliid: obj.cliid } }),
          ]
        }, { selfMongo: instance.mongo });

        serviceArr[0] = projects.filter((obj) => { return /1/gi.test(obj.service.serid.split('_')[1]) }).map((obj) => { return { proid: obj.proid, cliid: obj.cliid } });
        serviceArr[1] = projects.filter((obj) => { return /2/gi.test(obj.service.serid.split('_')[1]) }).map((obj) => { return { proid: obj.proid, cliid: obj.cliid } });
        serviceArr[2] = projects.filter((obj) => { return /3/gi.test(obj.service.serid.split('_')[1]) }).map((obj) => { return { proid: obj.proid, cliid: obj.cliid } });
        serviceArr[3] = projects.filter((obj) => { return /4/gi.test(obj.service.serid.split('_')[1]) }).map((obj) => { return { proid: obj.proid, cliid: obj.cliid } });

        for (let arr of serviceArr) {
          for (let obj of arr) {
            obj.name = clients.toNormal().find((c) => { return c.cliid === obj.cliid }).name;
          }
        }

        res.send(JSON.stringify({ start, end, numbers: { client: clients.length, project: projects.length }, serviceArr }));

      } else if (mode === "designer") {

        designers = await back.getDesignersByQuery({}, { selfMongo: instance.mongo });
        projects = await back.getProjectsByQuery({}, { selfMongo: instance.mongo });
        if (projects.length === 0) {
          clients = [];
        } else {
          clients = (await back.getClientsByQuery({
            $or: projects.toNormal().map((p) => { return { cliid: p.cliid } })
          })).toNormal();
        }
        for (let p of projects) {
          tempClient = clients.find((c) => { return p.cliid === c.cliid });
          if (tempClient === undefined) {
            tempClient = await back.getClientById(p.cliid, { selfMongo: instance.mongo, toNormal: true });
          }
          requestNumber = 0;
          for (let i = 0; i < tempClient.requests.length; i++) {
            if (tempClient.requests[i].request.timeline.valueOf() < p.proposal.date.valueOf()) {
              requestNumber = i;
              break;
            }
          }
          p.name = tempClient.name;
          p.pyeong = tempClient.requests[requestNumber].request.space.pyeong;
        }

        designerArr = designers.toNormal().map((obj) => { return { desid: obj.desid, designer: obj.designer } });
        for (let obj of designerArr) {

          // proposal
          obj.proposal = projects.filter((p) => {
            return (p.proposal.detail.findIndex((z) => { return z.desid === obj.desid }) !== -1 && p.proposal.date.valueOf() >= start.valueOf() && p.proposal.date.valueOf() < end.valueOf());
          }).map((p) => {
            const thisProposal = p.proposal.detail.find((d) => { return d.desid === obj.desid });
            let amount, thisFee;
            if (thisProposal === undefined) {
              amount = 0;
            } else {
              thisFee = thisProposal.fee.toNormal().findIndex((k) => { return k.method === (p.service.online ? "online" : "offline"); });
              if (thisFee !== -1) {
                amount = thisProposal.fee.toNormal()[thisFee].amount;
              } else {
                amount = 0;
              }
            }
            return { proid: p.proid, status: (p.desid !== '' ? p.process.status.value : "드랍"), service: serviceParsing(p.service.toNormal()), date: p.proposal.date, name: p.name, pyeong: p.pyeong, amount, per: Math.floor((amount / p.pyeong) / 1000) * 1000 };
          });

          // process
          obj.process = projects.filter((p) => {
            return (p.desid === obj.desid && p.process.contract.first.date.valueOf() >= start.valueOf() && p.process.contract.first.date.valueOf() < end.valueOf());
          }).map((p) => {
            const thisProposal = p.proposal.detail.find((d) => { return d.desid === obj.desid });
            let amount, thisFee;
            if (thisProposal === undefined) {
              amount = 0;
            } else {
              thisFee = thisProposal.fee.toNormal().findIndex((k) => { return k.method === (p.service.online ? "online" : "offline"); });
              if (thisFee !== -1) {
                amount = thisProposal.fee.toNormal()[thisFee].amount;
              } else {
                amount = 0;
              }
            }
            return { proid: p.proid, status: p.process.status.value, service: serviceParsing(p.service.toNormal()), date: p.process.contract.first.date, name: p.name, pyeong: p.pyeong, amount, per: Math.floor((amount / p.pyeong) / 1000) * 1000 };
          });

          // calculation first
          obj.first = projects.filter((p) => {
            return (p.desid === obj.desid && p.process.calculation.payments.first.date.valueOf() >= start.valueOf() && p.process.calculation.payments.first.date.valueOf() < end.valueOf());
          }).map((p) => {
            return { proid: p.proid, service: serviceParsing(p.service.toNormal()), date: p.process.calculation.payments.first.date, name: p.name, pyeong: p.pyeong, amount: p.process.calculation.payments.first.amount - p.process.calculation.payments.first.refund };
          });

          // calculation remain
          obj.remain = projects.filter((p) => {
            return (p.desid === obj.desid && p.process.calculation.payments.remain.date.valueOf() >= start.valueOf() && p.process.calculation.payments.remain.date.valueOf() < end.valueOf());
          }).map((p) => {
            return { proid: p.proid, service: serviceParsing(p.service.toNormal()), date: p.process.calculation.payments.remain.date, name: p.name, pyeong: p.pyeong, amount: p.process.calculation.payments.remain.amount - p.process.calculation.payments.remain.refund };
          });

        }

        res.send(JSON.stringify({ start, end, designers: designerArr }));

      } else {
        throw new Error("invaild mode");
      }

    } catch (e) {
      logger.error("Console 서버 문제 생김 (rou_post_getProjectReport): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_getAspirantInfo = function () {
  const instance = this;
  const back = this.back;
  const { equalJson } = this.mother;
  let obj = {};
  obj.link = [ "/getAspirants" ];
  obj.func = async function (req, res, logger) {
    res.set("Content-Type", "application/json");
    try {
      if (req.body.whereQuery === undefined) {
        throw new Error("invaild post");
      }
      const { whereQuery } = equalJson(req.body);
      let rows;

      if (req.url === "/getAspirants") {
        rows = await back.getAspirantsByQuery(whereQuery, { selfMongo: instance.mongo });
      }

      res.send(JSON.stringify(rows.toNormal()));
    } catch (e) {
      logger.error("Console 서버 문제 생김 (rou_post_getAspirantInfo): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_getDesignerReport = function () {
  const instance = this;
  const back = this.back;
  let obj = {};
  obj.link = "/getDesignerReport";
  obj.func = async function (req, res, logger) {
    try {
      if (req.body.desid === undefined) {
        throw new Error("must be desid");
      }
      const { desid } = req.body;
      const selfMongo = instance.mongo;
      let projects;
      let whereQuery;
      let cliidArr_raw, cliidArr;
      let clients;
      let requests, boo;
      let contentsArr;
      let price;

      res.set("Content-Type", "application/json");

      whereQuery = {
        $or: [
          { desid },
          { "proposal.detail": { $elemMatch: { desid } } }
        ]
      };

      projects = await back.getProjectsByQuery(whereQuery, { selfMongo });
      if (projects.length > 0) {

        cliidArr_raw = [];
        for (let p of projects) {
          cliidArr_raw.push(p.cliid);
        }
        cliidArr_raw = Array.from(new Set(cliidArr_raw));
        cliidArr = cliidArr_raw.map((c) => { return { cliid: c }; });
        whereQuery = { $or: [] };
        for (let obj of cliidArr) {
          whereQuery["$or"].push(obj);
        }
        clients = (await back.getClientsByQuery(whereQuery, { selfMongo })).toNormal();

        for (let project of projects) {
          for (let client of clients) {
            if (project.cliid === client.cliid) {
              project.name = client.name;
              requests = client.requests;
              boo = false;
              for (let { request } of requests) {
                if (request.timeline.valueOf() <= project.proposal.date.valueOf()) {
                  boo = true;
                  project.pyeong = request.space.pyeong;
                }
              }
              if (!boo) {
                project.pyeong = requests[0].request.space.pyeong;
              }
            }
          }
        }

      } else {
        clients = [];
      }

      contentsArr = await back.getContentsArrByQuery({ desid }, { selfMongo });
      for (let c of contentsArr) {
        for (let client of clients) {
          if (c.cliid === client.cliid) {
            c.name = client.name;
          }
        }
      }

      price = await back.mongoRead("designerPrice", {}, { selfMongo: instance.mongolocal });

      res.send(JSON.stringify({ projects, clients, contentsArr, price }));
    } catch (e) {
      logger.error("Console 서버 문제 생김 (rou_post_getDesignerReport): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_getHistory = function () {
  const instance = this;
  const back = this.back;
  const { equalJson } = this.mother;
  const stringFilter = function (raw) {
    const originalValue = raw;
    const originalValueArr = originalValue.split("\n");

    let str;
    let tempString;
    let item = null;
    let tong = [];

    for (let text of originalValueArr) {
      if (!/^\<\%item\%\>/.test(text) && /[^ \n]/g.test(text.replace(/[\n ]/g, ''))) {
        tempString = text.trim().replace(/^- /g, '').replace(/^-/g, '').trim();
        tong.push(tempString);
      } else if (/^\<\%item\%\>/.test(text)) {
        item = text;
      }
    }

    if (item !== null) {
      str = item + "\n\n" + tong.join("\n");
    } else {
      str = tong.join("\n");
    }

    return str.replace(/\&/g, ",");
  }
  let obj = {};
  obj.link = [ "/getClientHistory", "/getProjectHistory", "/getHistoryProperty", "/getHistoryTotal", "/getClientsImportant", "/getProjectsImportant", "/getClientsManager", "/getProjectsManager", "/getClientsIssue", "/getProjectsIssue" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      let historyObj, responseArr;
      let resultObj;
      let method;
      let temp, tempArr;

      responseArr = [];

      if (req.url === "/getClientHistory") {

        historyObj = await back.getHistoryById("client", req.body.id, { selfMongo: instance.mongolocal });
        if (historyObj === null) {
          await back.createHistory("client", { cliid: req.body.id }, { selfMongo: instance.mongolocal, secondMongo: instance.mongo });
          historyObj = await back.getHistoryById("client", req.body.id, { selfMongo: instance.mongolocal });
        }

        responseArr.push((historyObj.history === undefined ? '' : historyObj.history.replace(/\=/g, '').replace(/\&/g, ",")));
        responseArr.push((historyObj.space === undefined ? '' : historyObj.space.replace(/\=/g, '').replace(/\&/g, ",")));
        responseArr.push((historyObj.styling === undefined ? '' : historyObj.styling.replace(/\=/g, '').replace(/\&/g, ",")));
        responseArr.push((historyObj.construct === undefined ? '' : historyObj.construct.replace(/\=/g, '').replace(/\&/g, ",")));
        responseArr.push((historyObj.budget === undefined ? '' : historyObj.budget.replace(/\=/g, '').replace(/\&/g, ",")));
        responseArr.push((historyObj.progress === undefined ? '' : historyObj.progress.replace(/\=/g, '').replace(/\&/g, ",")));

        if (req.body.rawMode !== undefined) {
          responseArr = historyObj;
        }

      } else if (req.url === "/getProjectHistory") {

        historyObj = await back.getHistoryById("project", req.body.id, { selfMongo: instance.mongolocal });
        if (historyObj === null) {
          await back.createHistory("project", { proid: req.body.id }, { selfMongo: instance.mongolocal, secondMongo: instance.mongo });
          historyObj = await back.getHistoryById("project", req.body.id, { selfMongo: instance.mongolocal });
        }

        responseArr.push((historyObj.history === undefined ? '' : historyObj.history.replace(/\=/g, '').replace(/\&/g, ",")));
        responseArr.push((historyObj.designer === undefined ? '' : historyObj.designer.replace(/\=/g, '').replace(/\&/g, ",")));
        responseArr.push((historyObj.client === undefined ? '' : historyObj.client.replace(/\=/g, '').replace(/\&/g, ",")));
        responseArr.push((historyObj.photo === undefined ? '' : historyObj.photo.replace(/\=/g, '').replace(/\&/g, ",")));

        if (req.body.rawMode !== undefined) {
          responseArr = historyObj;
        }

      } else if (req.url === "/getHistoryProperty") {
        if (equalJson(req.body.idArr).length > 0) {
          const { method, property, idArr } = equalJson(req.body);
          responseArr = await back.getHistoryProperty(method, property, idArr, { selfMongo: instance.mongolocal });
        } else {
          responseArr = [];
        }
      } else if (req.url === "/getHistoryTotal") {
        if (equalJson(req.body.idArr).length > 0) {
          const { method, idArr } = equalJson(req.body);
          responseArr = await back.getHistoryProperty(method, "$all", idArr, { selfMongo: instance.mongolocal });
        } else {
          responseArr = [];
        }
      }

      if (responseArr === null) {
        responseArr = [];
      }
      res.send(JSON.stringify(responseArr));
    } catch (e) {
      logger.error("Console 서버 문제 생김 (rou_post_getHistory): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_updateHistory = function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink, equalJson } = this.mother;
  const back = this.back;
  const members = this.members;
  let obj = {};
  obj.link = [ "/updateHistory", "/updateClientHistory", "/updateProjectHistory", "/updateDesignerHistory" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const today = new Date();
      if (req.body.newMode === undefined || req.body.newMode === null || req.body.newMode === 0) {
        const { id, column, value, email } = equalJson(req.body);
        const logDir = `${instance.dir}/log`;
        const managerInteraction = {
          designer: {
            to: "project",
            toId: "proid",
            method: "getProjectsByQuery",
            whereQuery: { desid: id }
          },
        };
        let historyObj;
        let whereQuery, updateQuery;
        let thisPerson;
        let fileTarget;
        let method, standard;
        let managerArr;
        let managerIdArr;
        let managerToObj;
        let managerTargetArr;
        let page, query, dummy, cookies;

        thisPerson = null;
        if (email !== null) {
          for (let member of members) {
            if (member.email.includes(email)) {
              thisPerson = member.name;
              break;
            }
          }
        }

        whereQuery = {};
        updateQuery = {};

        if (/Client/gi.test(req.url)) {
          method = "client";
        } else if (/Project/gi.test(req.url)) {
          method = "project";
        } else if (/Designer/gi.test(req.url)) {
          method = "designer";
        } else if (/Contents/gi.test(req.url)) {
          method = "contents";
        } else {
          if (req.body.method === undefined) {
            throw new Error("invaild method");
          } else {
            method = req.body.method;
          }
        }

        if (/client/gi.test(method)) {
          standard = "cliid";
        } else if (/project/gi.test(method)) {
          standard = "proid";
        } else if (/designer/gi.test(method)) {
          standard = "desid";
        } else if (/contents/gi.test(method)) {
          standard = "conid";
        } else {
          throw new Error("invaild method");
        }

        historyObj = await back.getHistoryById(method, id, { selfMongo: instance.mongolocal });
        if (historyObj === null) {
          updateQuery = {};
          updateQuery[standard] = id;
          if (column === "important") {
            updateQuery[column] = (Number(value) === 1);
          } else {
            if (column !== null) {
              if (value === "true" || value === "false") {
                updateQuery[column] = (value === "true");
              } else {
                updateQuery[column] = value;
              }
            }
          }
          await back.createHistory(method, updateQuery, { selfMongo: instance.mongolocal, secondMongo: instance.mongo });
          historyObj = await back.getHistoryById(method, id, { selfMongo: instance.mongolocal });
        } else {
          whereQuery = {};
          whereQuery[standard] = id;
          updateQuery = {};
          if (column === "important") {
            updateQuery[column] = (Number(value) === 1);
          } else {
            if (column !== null) {
              if (value === "true" || value === "false") {
                updateQuery[column] = (value === "true");
              } else {
                updateQuery[column] = value;
              }
            }
          }

          if (Object.keys(updateQuery).length > 0) {
            await back.updateHistory(method, [ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });
          }
        }

        if (column !== null && thisPerson !== null) {
          await fileSystem(`write`, [ logDir + "/" + method + "_" + "latest.json", JSON.stringify({ path: method, who: thisPerson, where: id, column: "history_" + column, value: "", date: today }) ]);
          const dir = await fileSystem(`readDir`, [ logDir ]);
          fileTarget = null;
          for (let fileName of dir) {
            if ((new RegExp("^" + id)).test(fileName)) {
              fileTarget = fileName;
            }
          }
          if (fileTarget !== null) {
            await shellExec(`rm -rf ${shellLink(logDir)}/${fileTarget}`);
          }
          await fileSystem(`write`, [ `${instance.dir}/log/${id}__name__${thisPerson}`, `0` ]);
        }

        if (column === "manager") {
          if (managerInteraction[method] !== undefined) {
            managerArr = await back[managerInteraction[method].method](managerInteraction[method].whereQuery, { selfMongo: instance.mongo });
            managerIdArr = [];
            for (let obj of managerArr) {
              managerIdArr.push(obj[managerInteraction[method].toId]);
            }
            if (managerIdArr.length !== 0) {
              managerToObj = await back.getHistoryProperty(managerInteraction[method].to, "manager", managerIdArr, { selfMongo: instance.mongolocal });
              managerTargetArr = [];
              for (let i in managerToObj) {
                managerTargetArr.push([ i, managerToObj[i] ]);
              }
              managerTargetArr = managerTargetArr.filter((a) => { return a[1] === '' || a[1] === '-' || a[1] === "홀딩"; });
              for (let [ id ] of managerTargetArr) {
                whereQuery = {};
                whereQuery[managerInteraction[method].toId] = id;
                await back.updateHistory(managerInteraction[method].to, [ whereQuery, { manager: value } ], { selfMongo: instance.mongolocal });
              }
            }
          }
        }

        if (typeof req.body.send === "string" && /Client/gi.test(req.url)) {
          page = req.body.send.split('_')[0];
          query = req.body.send.split('_').length > 1 ? req.body.send.split('_')[1] : null;
          dummy = {
            page,
            date: new Date(),
            mode: query,
            who: {
              name: null,
              email: null,
            }
          };
          if (Array.isArray(historyObj.curation.analytics.send)) {
            historyObj.curation.analytics.send.push(dummy);
          } else {
            historyObj.curation.analytics.send = [ dummy ];
          }
          await back.updateHistory("client", [ { cliid: id }, { "curation.analytics.send": historyObj.curation.analytics.send } ], { selfMongo: instance.mongolocal });
        }

      } else {
        const { id, updateQuery, coreQuery } = equalJson(req.body);
        let historyObj;
        let method, standard;
        let createQuery;
        let whereQuery;
        let collection;

        if (/Client/gi.test(req.url)) {
          method = "client";
        } else if (/Project/gi.test(req.url)) {
          method = "project";
        } else if (/Designer/gi.test(req.url)) {
          method = "designer";
        } else if (/Contents/gi.test(req.url)) {
          method = "contents";
        } else {
          if (req.body.method === undefined) {
            throw new Error("invaild method");
          } else {
            method = req.body.method;
          }
        }

        if (/client/gi.test(method)) {
          standard = "cliid";
          collection = "client";
        } else if (/project/gi.test(method)) {
          standard = "proid";
          collection = "project";
        } else if (/designer/gi.test(method)) {
          standard = "desid";
          collection = "designer";
        } else if (/contents/gi.test(method)) {
          standard = "conid";
          collection = "contents";
        } else {
          throw new Error("invaild method");
        }

        whereQuery = {};
        whereQuery[standard] = id;

        historyObj = await back.getHistoryById(method, id, { selfMongo: instance.mongolocal });
        if (historyObj === null) {
          createQuery = { ...updateQuery };
          createQuery[standard] = id;
          await back.createHistory(method, createQuery, { selfMongo: instance.mongolocal, secondMongo: instance.mongo });
          historyObj = await back.getHistoryById(method, id, { selfMongo: instance.mongolocal });
        } else {
          if (Object.keys(updateQuery).length > 0) {
            await back.updateHistory(method, [ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });
          }
        }

        if (typeof coreQuery === "object" && coreQuery !== null) {
          if (Object.keys(coreQuery).length > 0) {
            await back.mongoUpdate(collection, [ whereQuery, coreQuery ], { selfMongo: instance.mongo });
          }
        }

      }
      res.send(JSON.stringify({ message: "success" }));
    } catch (e) {
      logger.error("Console 서버 문제 생김 (rou_post_updateHistory): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_getContentsDetail = function () {
  const instance = this;
  const back = this.back;
  let obj = {};
  obj.link = [ "/getContentsDetail" ];
  obj.func = async function (req, res, logger) {
    try {
      let contents;

      contents = await back.getContentsById(req.body.id);
      const { portfolio, review } = contents.getContentsFlatDetail();

      res.set("Content-Type", "application/json");
      if (req.body.noFlat === undefined) {
        res.send(JSON.stringify([ portfolio, review ]));
      } else {
        res.send(JSON.stringify([ contents.getPortfolioDetail(), contents.getReviewDetail(), contents.getGsArr() ]));
      }
    } catch (e) {
      logger.error("Console 서버 문제 생김 (rou_post_getContentsDetail): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_sendSlack = function () {
  const instance = this;
  const back = this.back;
  const { equalJson, messageSend } = this.mother;
  const url = require("url");
  let obj = {};
  obj.link = "/sendSlack";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.message === undefined || req.body.channel === undefined) {
        throw new Error("invalid post");
      }
      const { message, channel } = req.body;
      let text;
      let voiceBoo;
      let ip, rawUserAgent;

      ip = String(req.headers["x-forwarded-for"] === undefined ? req.socket.remoteAddress : req.headers["x-forwarded-for"]).trim().replace(/[^0-9\.]/gi, '');
      rawUserAgent = req.useragent;

      text = message.replace(/__equal__/g, '=').replace(/__amper__/g, '&').replace(/__query__/g, '?').replace(/__plus__/g, '+');
      if (req.body.voice !== undefined) {
        if (req.body.voice === null) {
          voiceBoo = false;
        } else if (req.body.voice === "false") {
          voiceBoo = false;
        } else if (req.body.voice === false) {
          voiceBoo = false;
        } else {
          voiceBoo = true;
        }
      } else {
        voiceBoo = false;
      }

      if (channel === "#error_log") {
        await logger.error(text + "\n\n" + "ip: " + String(ip) + "\n\n" + JSON.stringify(rawUserAgent, null, 2));
      } else {
        await messageSend({ text, channel, voice: voiceBoo, target: (req.body.target !== undefined ? equalJson(req.body).target : null), fairy: false });
      }

      res.send(JSON.stringify({ message: "success" }));

    } catch (e) {
      logger.error("Console 서버 문제 생김 (rou_post_sendSlack): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_sendSheets = function () {
  const instance = this;
  const back = this.back;
  const sheets = this.sheets;
  const drive = this.drive;
  const { equalJson, messageSend } = this.mother;
  const asyncFunc = async (sheetName, parentId, values, tapName) => {
    let sheetsId, result;
    try {
      sheetsId = await sheets.create_newSheets_inPython(sheetName, parentId);
      if (tapName !== undefined) {
        await sheets.update_defaultSheetName_inPython(sheetsId, tapName);
      }
      values = equalJson(values);
      await sheets.update_value_inPython(sheetsId, (tapName !== undefined ? tapName : ''), values, [ 0, 0 ]);
      await sheets.setting_cleanView_inPython(sheetsId);
      result = await drive.read_webView_inPython(sheetsId);
      return result;
    } catch (e) {
      result = "error";
      return result;
    }
  }
  let obj = {};
  obj.link = "/sendSheets";
  obj.func = async function (req, res, logger) {
    res.set("Content-Type", "application/json");
    try {
      if (req.body.sheetName === undefined || req.body.parentId === undefined || req.body.values === undefined) {
        throw new Error("must be sheetName, parentId");
      }
      let sheetsId, response, values, sheetsTargets, tempArr, async;

      if (req.body.multiple === undefined) {
        async = false;
        if (req.body.async !== undefined) {
          async = true;
        }

        if (!async) {
          response = await asyncFunc(req.body.sheetName, req.body.parentId, req.body.values, req.body.tapName);
        } else {
          asyncFunc(req.body.sheetName, req.body.parentId, req.body.values, req.body.tapName).then((link) => {
            return messageSend({ text: req.body.sheetName + " => " + link, channel: (req.body.channel === undefined) ? "#general" : req.body.channel });
          }).catch((err) => {
            console.log(err);
          });
          response = "will do";
        }
      } else {
        sheetsTargets = JSON.parse(req.body.values);
        sheetsId = "";
        response = "will do";
        tempArr = [];
        sheets.create_newSheets_inPython(req.body.sheetName, req.body.parentId).then((id) => {
          sheetsId = id;
          for (let i = 0; i < sheetsTargets.length; i++) {
            if (i !== 0) {
              tempArr.push(sheetsTargets[i].sheets);
            }
          }
          return sheets.update_defaultSheetName_inPython(sheetsId, sheetsTargets[0].sheets);
        }).then(() => {
          return sheets.add_newSheet_inPython(sheetsId, tempArr);
        }).then(() => {
          return sheets.update_values_inPython(sheetsId, sheetsTargets, [ 0, 0 ]);
        }).then((arr) => {
          return sheets.setting_cleanView_inPython(sheetsId);
        }).then(() => {
          return drive.read_webView_inPython(sheetsId);
        }).then((link) => {
          return messageSend({ text: req.body.sheetName + " => " + link, channel: (req.body.channel === undefined) ? "#general" : req.body.channel });
        }).catch((err) => {
          console.log(err);
        });
      }

      res.send(JSON.stringify({ link: response }));
    } catch (e) {
      logger.error("Console 서버 문제 생김 (rou_post_sendSheets): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_createProposalDocument = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const { shellExec, shellLink, requestSystem } = this.mother;
  let obj = {};
  obj.link = [ "/createProposalDocument" ];
  obj.func = async function (req, res, logger) {
    res.set("Content-Type", "application/json");
    try {

      const { proid } = req.body;
      const proposalLink = "https://" + address.frontinfo.host + "/proposal.php?proid=" + proid + "&mode=test";
      const thisProject = await back.getProjectById(proid, { selfMongo: instance.mongo });
      const cliid = thisProject.cliid;
      let page, dummy, historyObj;
      let future, now, delta;
      let year, month, date, hour, minute, second;

      if (req.body.retryProposal === undefined) {
        await back.updateProject([ { proid }, { "proposal.date": new Date() } ], { selfMongo: instance.mongo });
      }

      historyObj = await back.getHistoryById("client", cliid, { selfMongo: instance.mongolocal });
      if (historyObj === null) {
        await back.createHistory("client", { cliid }, { selfMongo: instance.mongolocal, secondMongo: instance.mongo });
        historyObj = await back.getHistoryById("client", cliid, { selfMongo: instance.mongolocal });
      }
      page = "designerProposal";
      dummy = {
        page,
        date: new Date(),
        mode: null,
        who: {
          name: null,
          email: null,
        }
      };
      if (Array.isArray(historyObj.curation.analytics.send)) {
        historyObj.curation.analytics.send.push(dummy);
      } else {
        historyObj.curation.analytics.send = [ dummy ];
      }
      await back.updateHistory("client", [ { cliid }, { "curation.analytics.send": historyObj.curation.analytics.send } ], { selfMongo: instance.mongolocal });

      if (req.body.year !== undefined && req.body.month !== undefined && req.body.date !== undefined && req.body.hour !== undefined && req.body.minute !== undefined && req.body.second !== undefined) {

        year = Number(req.body.year);
        month = Number(req.body.month);
        date = Number(req.body.date);
        hour = Number(req.body.hour);
        minute = Number(req.body.minute);
        second = Number(req.body.second);
        future = new Date(year, month - 1, date, hour, minute, second);
        now = new Date();
        delta = future.valueOf() - now.valueOf();
        setTimeout(async () => {
          try {
            await shellExec("node", [ `${process.cwd()}/robot.js`, `webProposal`, proid ]);
          } catch (e) {
            console.log(e);
          }
        }, delta);

      } else if (req.body.instant !== undefined) {

        shellExec("node", [ `${process.cwd()}/robot.js`, `webProposal`, proid ]).catch((err) => { console.log(err); });

      } else {

        throw new Error("invaild post");

      }

      res.send(JSON.stringify({ link: proposalLink }));

    } catch (e) {
      logger.error("Console 서버 문제 생김 (rou_post_createProposalDocument): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_proposalLog = function () {
  const instance = this;
  const back = this.back;
  const { shell, shellLink, requestSystem } = this.mother;
  let obj = {};
  obj.link = [ "/proposalLog" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (typeof req.body.proid !== "string") {
        throw new Error("invaild post");
      }
      const { proid } = req.body;
      const collection = "proposalLog";
      let rows;

      rows = await back.mongoRead(collection, { proid }, { selfMongo: instance.mongolocal });
      rows.sort((a, b) => { return b.date.valueOf() - a.date.valueOf(); });

      res.send(JSON.stringify(rows.map((obj) => { return obj.project })));
    } catch (e) {
      logger.error("Console 서버 문제 생김 (rou_post_proposalLog): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_proposalReset = function () {
  const instance = this;
  const back = this.back;
  const work = this.work;
  const address = this.address;
  const { requestSystem, messageSend } = this.mother;
  let obj = {};
  obj.link = [ "/proposalReset", "/proposalCreate" ];
  obj.func = async function (req, res, logger) {
    try {
      let id, historyObj;
      let requestObj;

      if (req.body.proid === undefined) {
        id = req.body.cliid;
      }
      if (req.body.cliid === undefined) {
        id = req.body.proid;
      }
      if (typeof id !== "string") {
        throw new Error("invaild post");
      }
      if (!/^[cp]/.test(id)) {
        throw new Error("invaild post");
      }

      if (req.url === "/proposalReset") {
        work.proposalReset(id, { selfMongo: instance.mongo, selfLocalBoo: instance.mongolocal }).catch((err) => {
          console.log(err);
        });

      } else if (req.url === "/proposalCreate") {
        if (/^c/.test(id)) {
          if (typeof req.body.serid === "string") {
            if (/^s[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]$/.test(req.body.serid)) {

              historyObj = await back.getHistoryById("client", id, { selfMongo: instance.mongolocal });
              if (historyObj !== null && historyObj.curation.image.length > 0) {

                requestObj = {
                  cliid: id,
                  historyQuery: { "curation.service.serid": [ req.body.serid ] },
                  coreQuery: {},
                  mode: "create",
                  fromConsole: 1,
                };
                if (req.body.silent !== undefined) {
                  requestObj.silent = true;
                }

                requestSystem("https://" + address.officeinfo.host + ":3002/styleCuration_updateCalculation", requestObj, { headers: { "origin": "https://" + address.officeinfo.host, "Content-Type": "application/json" } }).then(() => {
                  //pass
                }).catch((err) => {
                  console.log(err);
                });
              } else {
                messageSend({ text: id + " 고객님은 스타일 체크를 진행하지 않아 자동으로 제안서를 만들 수 없습니다!", channel: "#403_proposal" }).catch((err) => {
                  console.log(err);
                });
              }

            }
          }
        }
      }

      res.set("Content-Type", "application/json");
      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      logger.error("Console 서버 문제 생김 (rou_post_proposalReset): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_getMembers = function () {
  const instance = this;
  const address = this.address;
  const { equalJson } = this.mother;
  let obj = {};
  obj.link = "/getMembers";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (typeof req.body.type !== "string") {
        throw new Error("must be type");
      }
      const membersArr = instance.members;
      let emailArr = [];
      let targetMember = null;

      if (req.body.type === "get") {
        res.send(JSON.stringify(membersArr));
      } else if (req.body.type === "boo") {
        for (let { id, email } of membersArr) {
          for (let e of email) {
            emailArr.push({ email: e, id });
          }
        }

        for (let i = 0; i < emailArr.length; i++) {
          if (req.body.value === emailArr[i].email) {
            for (let j = 0; j < membersArr.length; j++) {
              if (emailArr[i].id === membersArr[j].id) {
                targetMember = membersArr[j];
              }
            }
          }
        }

        if (targetMember === undefined || targetMember === null) {
          res.send(JSON.stringify({ result: null }));
        } else {
          if (!targetMember.alive) {
            res.send(JSON.stringify({ result: null }));
          } else {
            res.send(JSON.stringify({ result: targetMember }));
          }
        }

      } else if (req.body.type === "this") {

        if (req.body.mac === undefined) {
          throw new Error("must be mac array");
        }
        const { mac } = equalJson(req.body);
        if (!Array.isArray(mac)) {
          throw new Error("invaild post");
        }
        if (!mac.every((str) => { return typeof str === "string" })) {
          throw new Error("invaild post");
        }
        let thisMemid, thisMap, thisMember;

        thisMemid = null;
        for (let obj of address.officeinfo.map) {
          if (mac.includes(obj.mac) && typeof obj.memid === "string") {
            thisMemid = obj.memid;
            break;
          }
        }

        if (thisMemid !== null) {
          thisMap = address.officeinfo.map.find((obj) => { return obj.memid = thisMemid; })
          thisMember = membersArr.find((obj) => { return obj.id === thisMemid });
          thisMember.memid = thisMember.id;
          thisMember.mac = thisMap.mac;

          res.send((JSON.stringify(thisMember)));
        } else {
          res.send((JSON.stringify({ member: null })));
        }

      }
    } catch (e) {
      logger.error("Console 서버 문제 생김 (rou_post_getMembers): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_parsingLatestLog = function () {
  const instance = this;
  const { fileSystem, equalJson } = this.mother;
  let obj = {};
  obj.link = "/parsingLatestLog";
  obj.func = async function (req, res, logger) {
    try {
      if (req.body.idArr === undefined) {
        throw new Error("must be id arr: Array");
      }
      const logDir = `${instance.dir}/log`;
      const idArr = equalJson(req.body.idArr);
      const logAll = await fileSystem(`readDir`, [ logDir ]);

      let logParsing, logIdArr;
      let result;
      let tempArr;
      let index;

      logParsing = [];
      logIdArr = [];
      for (let log of logAll) {
        if (log !== `.DS_Store`) {
          tempArr = log.split("__name__");
          logParsing.push({ id: tempArr[0], name: tempArr[1] });
          logIdArr.push(tempArr[0]);
        }
      }

      result = [];
      for (let id of idArr) {
        index = logIdArr.indexOf(id);
        if (index === -1) {
          result.push("-");
        } else {
          result.push(logParsing[index].name);
        }
      }

      res.set("Content-Type", "application/json");
      res.send(JSON.stringify(result));
    } catch (e) {
      logger.error("Console 서버 문제 생김 (rou_post_parsingLatestLog): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_parsingProposal = function () {
  const instance = this;
  const back = this.back;
  const work = this.work;
  let obj = {};
  obj.link = "/parsingProposal";
  obj.func = async function (req, res, logger) {
    try {
      if (req.body.id === undefined || req.body.serid === undefined) {
        throw new Error("must be cliid, seridNumber");
      }
      const selected = await work.designerCuration(req.body.id, 4, [ `s2011_aa0${req.body.serid}s` ], { selfMongo: instance.mongo, selfLocalMongo: instance.mongolocal });
      if (!Array.isArray(selected)) {
        throw new Error(selected);
      }
      res.set("Content-Type", "application/json");
      if (selected.length === 0) {
        res.send(JSON.stringify({ result: null }));
      } else {
        res.send(JSON.stringify({ result: { proposal: selected } }));
      }
    } catch (e) {
      logger.error("Console 서버 문제 생김 (rou_post_parsingProposal): " + e.message).catch((e) => { console.log(e); });
      res.set("Content-Type", "application/json");
      res.send(JSON.stringify({ result: null }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_alimTalk = function () {
  const instance = this;
  const back = this.back;
  const { equalJson, homeliaisonAnalytics, dateToString, stringToDate } = this.mother;
  let obj = {};
  obj.link = "/alimTalk";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": '*',
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": '*',
    });
    try {
      if (req.body.method === undefined || req.body.name === undefined || req.body.phone === undefined) {
        throw new Error("must be method, name, phone");
      }
      const { method, name, phone } = equalJson(req.body);
      let option;
      if (req.body.option === undefined) {
        option = {};
      } else {
        option = equalJson(req.body.option);
        if (/ADDRESS\[/g.test(option.host)) {
          if (/\(ghost\)/gi.test(option.host)) {
            option.host = instance.address[option.host.replace(/ADDRESS\[/gi, '').replace(/\]/g, '').replace(/\([^\(\)]+\)/g, '')].ghost.host;
          } else {
            option.host = instance.address[option.host.replace(/ADDRESS\[/gi, '').replace(/\]/g, '').replace(/\([^\(\)]+\)/g, '')].host;
          }
        }
      }
      await instance.kakao.sendTalk(method, name, phone, option);

      res.send(JSON.stringify({ message: "success" }));
    } catch (e) {
      logger.error("Console 서버 문제 생김 (rou_post_alimTalk): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_sendCertification = function () {
  const instance = this;
  const back = this.back;
  const human = this.human;
  const kakao = this.kakao;
  const address = this.address;
  const { equalJson } = this.mother;
  let obj = {};
  obj.link = [ "/sendCertification" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const { name, phone, certification } = req.body;
      const ip = String(req.headers["x-forwarded-for"] === undefined ? req.socket.remoteAddress : req.headers["x-forwarded-for"]).trim().replace(/[^0-9\.]/gi, '');

      if (address.officeinfo.ip.outer.replace(/[^0-9]/gi, '') === ip.replace(/[^0-9]/gi, '')) {

        res.send(JSON.stringify({ message: "office" }));

      } else {
        logger.log("인증번호 요청 감지 : " + name + " / " + phone + " / " + certification).catch((e) => { console.log(e); });
        logger.alert("인증번호 요청 감지 : " + name + " / " + phone + " / " + certification).catch((e) => { console.log(e); });

        human.sendSms({
          to: phone,
          body: "[홈리에종] 안녕하세요! " + name + "님,\n휴대폰 인증번호를 보내드립니다.\n\n인증번호 : " + certification + "\n\n인증번호를 팝업창에 입력해주세요!"
        }).then(() => {
          return logger.log("인증번호 문자 전송 완료");
        }).catch((e) => { console.log(e); });

        kakao.sendTalk("certification", name, phone, {
          company: "홈리에종",
          name,
          certification
        }).then(() => {
          return logger.log("인증번호 카카오 전송 완료");
        }).catch((e) => { console.log(e); });

        res.send(JSON.stringify({ message: "will do" }));
      }

    } catch (e) {
      logger.error("Console 서버 문제 생김 (rou_post_sendCertification): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_clientSubmit = function () {
  const instance = this;
  const back = this.back;
  const { equalJson, stringToDate, messageSend, messageLog, requestSystem } = this.mother;
  let obj = {};
  obj.link = [ "/clientSubmit" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const selfMongo = instance.mongo;
      const { map } = equalJson(req.body);
      const budgetArr = [ '500만원 이하', '1,000만원', '1,500만원', '2,000만원', '2,500만원', '3,000만원', '3,500만원', '4,000만원', '4,500만원', '5,000만원 이상', '6,000만원 이상', '7,000만원 이상', '8,000만원 이상', '9,000만원 이상', '1억원 이상', '1억 5,000만원 이상', '2억원 이상', '3억원 이상', '5억원 이상', '10억원 이상', ];
      const furnitureArr = [ "재배치", "일부 구매", "전체 구매" ];
      const contractArr = [ "자가", "전월세" ];
      const ignorePhone = [ "010-2747-3403" ];
      const overlapStandardHours = 12;
      const defaultPyeong = 34;
      const moveinConst0 = 60;
      const moveinConst1 = 10;
      let ifOverlap;
      let requestObject;
      let name;
      let phone;
      let address0;
      let address1;
      let email;
      let pyeong;
      let movein;
      let living;
      let etc;
      let future;
      let expectedStart;
      let requestArr;
      let pastRequests;
      let cliid;
      let message;
      let thisClient;
      let sessionId;
      let overlapTimeline;
      let budget;
      let furniture;
      let contract;

      name = map.find((obj) => { return obj.property === "name" });
      phone = map.find((obj) => { return obj.property === "phone" });
      address0 = map.find((obj) => { return obj.property === "address0" });
      address1 = map.find((obj) => { return obj.property === "address1" });
      email = map.find((obj) => { return obj.property === "email" });
      pyeong = map.find((obj) => { return obj.property === "pyeong" });
      movein = map.find((obj) => { return obj.property === "movein" });
      living = map.find((obj) => { return obj.property === "living" });
      etc = map.find((obj) => { return obj.property === "etc" });
      contract = map.find((obj) => { return obj.property === "contract" });

      sessionId = map.find((obj) => { return obj.property === "sessionId" });

      // budget = map.find((obj) => { return obj.property === "budget" });
      // furniture = map.find((obj) => { return obj.property === "furniture" });

      if (name === undefined || phone === undefined || address0 === undefined || address1 === undefined || email === undefined || pyeong === undefined || movein === undefined || living === undefined || etc === undefined) {
        throw new Error("invaild post");
      }

      if (sessionId === undefined) {
        sessionId = [];
      } else {
        sessionId = [ sessionId.value.trim() ];
      }

      // if (budget === undefined) {
      //   budget = { property: "budget", value: budgetArr[9] };
      // }
      // if (furniture === undefined) {
      //   furniture = { property: "furniture", value: furnitureArr[1] };
      // }

      if (contract === undefined) {
        contract = { property: "contract", value: contractArr[0] };
      }

      name = name.value.trim();
      phone = phone.value.trim();
      address0 = address0.value.trim();
      address1 = address1.value.trim();
      email = email.value.trim();
      pyeong = pyeong.value.trim();
      movein = movein.value.trim();
      living = living.value.trim();
      etc = etc.value.trim();
      contract = contract.value.trim();

      // budget = budget.value.trim();
      // furniture = furniture.value.trim();

      requestObject = {};

      requestObject["name"] = name.replace(/[^가-힣]/gi, '')
      requestObject["phone"] = phone.replace(/[^0-9\-]/gi, '');
      requestObject["email"] = email;

      requestObject["requests.0.request.space.address"] = String(address0 + " " + address1).trim();
      requestObject["requests.0.request.family"] = "";

      // requestObject["requests.0.request.budget"] = budget;
      // requestObject["requests.0.request.furniture"] = furniture;

      if (Number.isNaN(Number(pyeong.replace(/[^0-9\.]/gi, ''))) || Number(pyeong.replace(/[^0-9\.]/gi, '')) === 0) {
        requestObject["requests.0.request.space.pyeong"] = defaultPyeong;
      } else {
        requestObject["requests.0.request.space.pyeong"] = Number(pyeong.replace(/[^0-9\.]/gi, ''));
      }

      if (/거주중/gi.test(living)) {
        requestObject["requests.0.request.space.resident.living"] = true;
        requestObject["requests.0.request.space.resident.expected"] = new Date();
        future = new Date();
        future.setDate(future.getDate() + moveinConst0);
        requestObject["requests.0.analytics.date.space.movein"] = future;
      } else {
        requestObject["requests.0.request.space.resident.living"] = false;
        requestObject["requests.0.request.space.resident.expected"] = stringToDate(movein);
        future = stringToDate(movein);
        future.setDate(future.getDate() + moveinConst1);
        requestObject["requests.0.analytics.date.space.movein"] = future;
      }

      expectedStart = new Date(future.getFullYear(), future.getMonth(), future.getDate(), future.getHours(), future.getMinutes(), future.getSeconds());
      expectedStart = expectedStart.setDate(expectedStart.getDate() - moveinConst0);
      if (!requestObject["requests.0.request.space.resident.living"] && expectedStart.valueOf() <= (new Date()).valueOf()) {
        // requestObject["requests.0.request.space.resident.living"] = true;
        requestObject["requests.0.request.space.resident.expected"] = new Date();
        future = new Date();
        future.setDate(future.getDate() + moveinConst0);
        requestObject["requests.0.analytics.date.space.movein"] = future;
      }

      requestObject["requests.0.request.space.contract"] = contract;
      requestObject["requests.0.request.space.spec.room"] = 3;
      requestObject["requests.0.request.space.spec.bathroom"] = 2;
      requestObject["requests.0.request.space.spec.valcony"] = false;

      requestObject["requests.0.request.etc.comment"] = etc;
      if (/from meta instant ads/gi.test(etc)) {
        requestObject["requests.0.request.etc.channel"] = "메타 인스턴트";
      } else {
        requestObject["requests.0.request.etc.channel"] = "인터넷 검색";
      }
      requestObject["requests.0.request.timeline"] = new Date();

      requestObject["requests.0.analytics.session"] = sessionId;

      message = '';
      ifOverlap = await back.getClientsByQuery({ phone }, { selfMongo });
      if (ifOverlap.length > 0) {

        cliid = ifOverlap[0].cliid;

        pastRequests = (ifOverlap[0].toNormal()).requests;
        overlapTimeline = new Date(JSON.stringify(pastRequests[0].request.timeline).slice(1, -1));
        overlapTimeline.setHours(overlapTimeline.getHours() + overlapStandardHours);

        if (overlapTimeline.valueOf() < (new Date()).valueOf()) {
          requestArr = [];
          for (let z = 0; z < pastRequests.length; z++) {
            requestArr.push(pastRequests[z]);
          }
          requestArr.unshift(back.returnClientRequest());
          await back.updateClient([ { cliid }, { "requests": requestArr } ], { selfMongo });
        }

        await back.updateClient([ { cliid }, requestObject ], { selfMongo });

        message += "재문의가 왔습니다!\n";

      } else {

        cliid = await back.createClient(requestObject, { selfMongo });
        await back.createHistory("client", { cliid, space: "최초 고객이 적은 주소 : " + requestObject["requests.0.request.space.address"] }, { selfMongo: instance.mongolocal });
        message += "새로운 상담 문의가 왔습니다!\n";

      }

      instance.parsingAddress(cliid, requestObject["requests.0.request.space.address"], instance.mongo, logger).then((r) => {
        const { result, id } = r;
      }).catch((err) => {
        logger.error("주소 연산 중 오류 생김 : " + err.message).catch((e) => { console.log(e); });
        console.log(err);
      });

      back.getCaseProidById(cliid, { selfMongo }).then((clientCase) => {
        if (clientCase !== null) {
          const serviceCase = clientCase.caseService();
          if (serviceCase !== null) {
            const { serid, xValue } = serviceCase;
            let whereQuery, updateQuery;
            whereQuery = { cliid };
            updateQuery = { "requests.0.analytics.response.service.serid": serid[0].serid, "requests.0.analytics.response.service.xValue": xValue[0].xValue };
            return back.updateClient([ whereQuery, updateQuery ], { selfMongo });
          } else {
            return (new Promise((resolve, reject) => { resolve("fail"); }));
          }
        } else {
          return (new Promise((resolve, reject) => { resolve("fail"); }));
        }
      }).then((message) => {
        logger.log(cliid, "case update " + message);
      }).catch((err) => {
        logger.error("Console 서버 문제 생김 (submit, case 연산) : " + err.message).catch((e) => { console.log(e); });
      });

      thisClient = await back.getClientById(cliid, { selfMongo });
      message += "새로운 상담 문의가 왔습니다!" + " " + "성함 : " + thisClient.name + "(" + thisClient.cliid + ") " + "연락처 : " + thisClient.phone + "\n";

      messageSend({ text: message, channel: "#401_consulting" }).then(() => {
        return requestSystem("https://" + instance.address.officeinfo.ghost.host + ":" + String(3000) + "/storeClientAnalytics", { fast: true, talk: true, cliid: thisClient.cliid }, { headers: { "Content-Type": "application/json" } });
      }).catch((err) => { console.log(err); });

      res.send(JSON.stringify({ cliid }));
    } catch (e) {
      logger.error("Console 서버 문제 생김 (rou_post_clientSubmit): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_aspirantSubmit = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const kakao = this.kakao;
  const { equalJson, stringToDate, messageSend, messageLog, requestSystem, dateToString, sleep, stringToLink } = this.mother;
  let obj = {};
  obj.link = [ "/aspirantSubmit" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.map === undefined || req.body.mode === undefined) {
        throw new Error("invalid post");
      }
      const selfMongo = instance.mongo;
      const { map, mode } = equalJson(req.body);
      let name;
      let phone;
      let email;
      let address0;
      let address1;
      let business;
      let company;
      let numbers;
      let start;
      let representative;
      let bankname;
      let banknumber;
      let bankto;
      let homepage;
      let sns;
      let sessionId;
      let whereQuery, updateQuery;
      let aspid;
      let message;
      let rows;
      let thisAspirant;
      let careerDetail, schoolDetail;
      let gender;
      let birth;
      let birth_y, birth_m, birth_d;
      let etc;
      let ceoName, ceoId;

      ceoName = instance.members.find((o) => { return o.roles.includes("CEO") }).name;
      ceoId = instance.members.find((o) => { return o.roles.includes("CEO") }).slack.id;

      if (mode === "general") {

        name = map.find((obj) => { return obj.property === "name" });
        phone = map.find((obj) => { return obj.property === "phone" });
        gender = map.find((obj) => { return obj.property === "gender" });
        birth_y = map.find((obj) => { return obj.property === "birth_y" });
        birth_m = map.find((obj) => { return obj.property === "birth_m" });
        birth_d = map.find((obj) => { return obj.property === "birth_d" });
        email = map.find((obj) => { return obj.property === "email" });
        address0 = map.find((obj) => { return obj.property === "address0" });
        address1 = map.find((obj) => { return obj.property === "address1" });
        business = map.find((obj) => { return obj.property === "business" });
        company = map.find((obj) => { return obj.property === "company" });
        numbers = map.find((obj) => { return obj.property === "numbers" });
        start = map.find((obj) => { return obj.property === "start" });
        representative = map.find((obj) => { return obj.property === "representative" });
        bankname = map.find((obj) => { return obj.property === "bankname" });
        banknumber = map.find((obj) => { return obj.property === "banknumber" });
        bankto = map.find((obj) => { return obj.property === "bankto" });
        careerDetail = map.find((obj) => { return obj.property === "careerdetail" });
        schoolDetail = map.find((obj) => { return obj.property === "schooldetail" });
        homepage = map.find((obj) => { return obj.property === "homepage" });
        sns = map.find((obj) => { return obj.property === "sns" });
        etc = map.find((obj) => { return obj.property === "etc" });
        sessionId = map.find((obj) => { return obj.property === "sessionId" });

        if (name === undefined || phone === undefined || email === undefined || address0 === undefined || address1 === undefined || business === undefined || company === undefined || numbers === undefined || start === undefined || representative === undefined || bankname === undefined || banknumber === undefined || bankto === undefined || homepage === undefined || sns === undefined || sessionId === undefined) {
          throw new Error("invalid map post");
        }

        if (sessionId === undefined) {
          sessionId = [];
        } else {
          sessionId = [ sessionId.value.trim() ];
        }

        name = name.value.trim();
        phone = phone.value.trim();
        address0 = address0.value.trim();
        address1 = address1.value.trim();
        email = email.value.trim();
        gender = gender.value.trim();
        birth_y = birth_y.value.trim();
        if (Number(birth_y) < 1000) {
          birth_y = "19" + birth_y;
        }
        birth_m = birth_m.value.trim();
        birth_d = birth_d.value.trim();
        birth = new Date(Number(birth_y), Number(birth_m) - 1, Number(birth_d));
        etc = etc === undefined ? "" : etc.value.trim();

        updateQuery = {};

        updateQuery["designer"] = name.replace(/[^가-힣]/gi, '')
        updateQuery["phone"] = phone.replace(/[^0-9\-]/gi, '');
        updateQuery["gender"] = gender;
        updateQuery["email"] = email;
        updateQuery["address"] = address0 + " " + address1;
        updateQuery["birth"] = birth;

        updateQuery["submit.partnership.date"] = new Date();
        updateQuery["submit.partnership.boo"] = true;
        updateQuery["submit.comeFrom"] = "";

        if (/개인/gi.test(business.value.trim())) {
          if (/일반/gi.test(business.value.trim())) {
            updateQuery["information.company.classification"] = "개인사업자(일반)";
          } else {
            updateQuery["information.company.classification"] = "개인사업자(간이)";
          }
        } else if (/법인/gi.test(business.value.trim())) {
          if (/일반/gi.test(business.value.trim())) {
            updateQuery["information.company.classification"] = "법인사업자(일반)";
          } else {
            updateQuery["information.company.classification"] = "법인사업자(간이)";
          }
        } else {
          updateQuery["information.company.classification"] = "프리랜서";
        }
        updateQuery["information.company.name"] = company.value.trim();
        updateQuery["information.company.businessNumber"] = numbers.value.trim();
        updateQuery["information.company.start"] = stringToDate(start.value.trim());
        updateQuery["information.company.representative"] = representative.value.trim();

        updateQuery["information.account.bank"] = bankname.value.trim();
        updateQuery["information.account.number"] = banknumber.value.trim();
        updateQuery["information.account.to"] = bankto.value.trim();
        updateQuery["information.account.etc"] = "";

        updateQuery["information.career.detail"] = equalJson(careerDetail.value.trim());
        updateQuery["information.career.school"] = equalJson(schoolDetail.value.trim());
        updateQuery["information.career.about"] = etc;

        updateQuery["information.channel.web"] = [];
        updateQuery["information.channel.sns"] = [];
        updateQuery["information.channel.cloud"] = [];

        if (/^http/gi.test(homepage.value.trim())) {
          updateQuery["information.channel.web"].push(stringToLink(homepage.value.trim()));
        }
        if (/^http/gi.test(sns.value.trim())) {
          updateQuery["information.channel.sns"].push(stringToLink(sns.value.trim()));
        }

        updateQuery["meeting.status"] = "검토중";
        updateQuery["meeting.date"] = new Date(1800, 0, 1);
        updateQuery["submit.firstRequest.date"] = new Date();
        updateQuery["submit.firstRequest.method"] = "partnership";

        updateQuery["response.manager"] = ceoName;
        updateQuery["response.first.status"] = "검토중";

        rows = await back.getAspirantsByQuery({ phone: phone.replace(/[^0-9\-]/gi, '') }, { selfMongo });
        message = '';

        if (rows.length === 0) {
          aspid = await back.createAspirant(updateQuery, { selfMongo });
          message += "새로운 디자이너 파트너십 신청이 왔습니다!\n";
        } else {
          [ thisAspirant ] = rows.toNormal();
          aspid = thisAspirant.aspid;
          await back.updateAspirant([ { aspid }, updateQuery ], { selfMongo });
          message += "재문의 파트너십 신청이 왔습니다!\n";
        }

        message += "문의일 : " + dateToString(new Date()) + "\n";
        message += "성함 : " + updateQuery.designer + "\n";
        message += "연락처 : " + updateQuery.phone + "\n";
        message += "성별 : " + updateQuery.gender + "\n";
        message += "생일 : " + dateToString(updateQuery.birth) + "\n";
        message += "이메일 : " + updateQuery.email + "\n";
        message += "주소 : " + updateQuery.address + "\n";
        message += "사업자 분류 : " + updateQuery["information.company.classification"] + "\n";
        message += "회사명 : " + updateQuery["information.company.name"] + "\n";
        message += "사업자 등록번호 : " + updateQuery["information.company.businessNumber"] + "\n";
        message += "개업일 : " + dateToString(updateQuery["information.company.start"]) + "\n";
        message += "대표자 성함 : " + updateQuery["information.company.representative"] + "\n";
        message += "은행명 : " + updateQuery["information.account.bank"] + "\n";
        message += "계좌번호 : " + updateQuery["information.account.number"] + "\n";
        message += "예금주 : " + updateQuery["information.account.to"] + "\n";
        message += "홈페이지 : " + updateQuery["information.channel.web"].join(", ") + "\n";
        message += "SNS 채널 : " + updateQuery["information.channel.sns"].join(", ") + "\n";
        message += "자기 소개 : " + etc + "\n";
        message += "세션 아이디 : " + sessionId.join(", ");

        await messageSend({ text: message, channel: "#301_apply", voice: false });
        await messageSend({ text: name + " 디자이너 신청자님의 검토를 부탁드리겠습니다!", channel: "#301_apply", voice: true });

        kakao.sendTalk("aspirantSubmit", updateQuery.designer, updateQuery.phone, {
          client: updateQuery.designer,
          host: address.frontinfo.host,
          path: "aspinformation",
          aspid: aspid,
        }).catch((err) => {
          console.log(err);
        });

        res.send(JSON.stringify({ aspid }));

      } else if (mode === "portfolio") {

        name = map.find((obj) => { return obj.property === "name" });
        phone = map.find((obj) => { return obj.property === "phone" });
        careerDetail = map.find((obj) => { return obj.property === "careerdetail" });
        schoolDetail = map.find((obj) => { return obj.property === "schooldetail" });
        etc = map.find((obj) => { return obj.property === "etc" });

        name = name.value.trim();
        phone = phone.value.trim();
        etc = etc === undefined ? "" : etc.value.trim();

        updateQuery = {};
        updateQuery["designer"] = name.replace(/[^가-힣]/gi, '')

        updateQuery["information.career.detail"] = equalJson(careerDetail.value.trim());
        updateQuery["information.career.school"] = equalJson(schoolDetail.value.trim());
        updateQuery["information.career.about"] = etc;

        updateQuery["response.portfolio.plus.request"] = new Date();
        updateQuery["response.manager"] = ceoName;
        updateQuery["response.first.status"] = "검토중";
        updateQuery["meeting.status"] = "검토중";

        rows = await back.getAspirantsByQuery({ phone: phone.replace(/[^0-9\-]/gi, '') }, { selfMongo });
        if (rows.length === 0) {
          throw new Error("invalid phone number");
        } else {
          [ thisAspirant ] = rows.toNormal();
          aspid = thisAspirant.aspid;
        }

        await back.updateAspirant([ { aspid }, updateQuery ], { selfMongo });
        await messageSend({ text: thisAspirant.designer + " 디자이너 신청자님이 추가 포트폴리오를 전송하였습니다!", channel: "#301_apply", voice: true });
        await messageSend({ text: thisAspirant.designer + " 디자이너 신청자님의 추가 포트폴리오 검토를 부탁드리겠습니다!", channel: "#301_apply", voice: false });

        sleep(5000).then(() => {
          return kakao.sendTalk("aspirantPortfolio", name, phone, {
            client: name,
            host: address.frontinfo.host,
            path: "aspportfolio",
            aspid: aspid,
          })
        }).catch((err) => {
          console.log(err);
        });

        res.send(JSON.stringify({ aspid }));

      } else if (mode === "setting") {

        const { name, aspid, type, phone } = map;

        whereQuery = { aspid };
        updateQuery = {};
        updateQuery["response.portfolio.plus.photo"] = new Date();

        await back.updateAspirant([ whereQuery, updateQuery ], { selfMongo });
        await kakao.sendTalk("aspirantSettingConfirm", name, phone, {
          client: name,
          host: address.frontinfo.host,
          path: "aspsetting",
          aspid: aspid,
        });

        res.send(JSON.stringify({ aspid }));

      } else {
        throw new Error("invalid mode");
      }

    } catch (e) {
      console.log(e);
      logger.error("Console 서버 문제 생김 (rou_post_aspirantSubmit): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_aspirantDocuments = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const kakao = this.kakao;
  const { equalJson, stringToDate, messageSend, messageLog, requestSystem, dateToString, sleep } = this.mother;
  let obj = {};
  obj.link = [ "/aspirantDocuments" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.aspid === undefined) {
        throw new Error("invalid post");
      }
      const selfMongo = instance.mongo;
      const { aspid } = equalJson(req.body);
      const [ aspirant ] = await back.getAspirantsByQuery({ aspid }, { selfMongo });
      let whereQuery, updateQuery;

      whereQuery = { aspid };
      updateQuery = {};
      updateQuery["submit.documents.date"] = new Date();
      updateQuery["submit.documents.boo"] = true;

      await back.updateAspirant([ whereQuery, updateQuery ], { selfMongo });
      await kakao.sendTalk("aspirantNoticeComplete", aspirant.designer, aspirant.phone, {
        client: aspirant.designer,
        host: address.frontinfo.host,
        path: "asppayment",
        aspid: aspid,
      });

      await messageSend({ text: aspirant.designer + " 디자이너 신청자님이 행정 서류를 업로드하셨습니다!", channel: "#301_apply", voice: true });

      res.send(JSON.stringify({ message: "done" }));
    } catch (e) {
      console.log(e);
      logger.error("Console 서버 문제 생김 (rou_post_aspirantDocuments): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_aspirantPayment = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const kakao = this.kakao;
  const { equalJson, stringToDate, messageSend, messageLog, requestSystem, dateToString, sleep } = this.mother;
  const paidCompleteFunc = async (aspirant, logger) => {
    try {
      await sleep(2000);
      await requestSystem("https://" + address.secondinfo.host + ":3003/noticeAspirantConsole", {
        mode: "send",
        aspid: aspirant.aspid,
        designer: aspirant.designer,
        phone: aspirant.phone,
        type: "setting",
      }, {
        headers: { "Content-Type": "application/json" },
      });
      await sleep(500);
      await requestSystem("https://" + address.secondinfo.host + ":3003/noticeAspirantCommon", {
        aspid: aspirant.aspid,
        value: "default",
        mode: "send",
      }, {
        headers: { "Content-Type": "application/json" },
      });
    } catch (e) {
      await logger.error("Console 서버 문제 생김 (rou_post_aspirantPayment.paidCompleteFunc): " + e.message);
      console.log(e);
    }
  }
  let obj = {};
  obj.link = [ "/aspirantPayment" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.aspid === undefined || req.body.mode === undefined || req.body.status === undefined) {
        throw new Error("invalid post");
      }
      const selfMongo = instance.mongo;
      const { aspid, mode, status } = equalJson(req.body);
      const [ aspirant ] = await back.getAspirantsByQuery({ aspid }, { selfMongo });
      let whereQuery, updateQuery;
      let paidComplete;

      paidComplete = false;

      if (mode === "card") {
        whereQuery = { aspid };
        updateQuery = {};
        updateQuery["submit.registration.date"] = new Date();
        updateQuery["submit.registration.boo"] = true;
        updateQuery["meeting.status"] = "등록 완료";
        updateQuery["meeting.common.status"] = "미팅 조율";

        await back.updateAspirant([ whereQuery, updateQuery ], { selfMongo });
        await messageSend({ text: aspirant.designer + " 디자이너 신청자님이 디자이너 등록비를 카드 결제하셨습니다!", channel: "#301_apply", voice: true });
        await kakao.sendTalk("aspirantPaymentComplete", aspirant.designer, aspirant.phone, { client: aspirant.designer });
        paidComplete = true;

      } else if (mode === "vbank") {
        if (status === "ready") {

          const { data } = equalJson(req.body);
          await kakao.sendTalk("designerAccount", aspirant.designer, aspirant.phone, {
            designer: aspirant.designer,
            goodName: data.name,
            bankName: data.vbank_name,
            account: data.vbank_num,
            to: data.vbank_holder,
            amount: (data.paid_amount === undefined || Number.isNaN(Number(data.paid_amount))) ? data.amount : data.paid_amount,
          });
          paidComplete = false;

        } else if (status === "paid") {

          whereQuery = { aspid };
          updateQuery = {};
          updateQuery["submit.registration.date"] = new Date();
          updateQuery["submit.registration.boo"] = true;
          updateQuery["meeting.status"] = "등록 완료";
          updateQuery["meeting.common.status"] = "미팅 조율";

          await back.updateAspirant([ whereQuery, updateQuery ], { selfMongo });
          await messageSend({ text: aspirant.designer + " 디자이너 신청자님이 디자이너 등록비를 무통장 입금하셨습니다!", channel: "#301_apply", voice: true });
          await kakao.sendTalk("aspirantPaymentComplete", aspirant.designer, aspirant.phone, { client: aspirant.designer });
          paidComplete = true;

        }
      } else {
        throw new Error("invalid mode");
      }

      if (paidComplete) {
        paidCompleteFunc(aspirant, logger).catch((err) => {
          logger.error("Console 서버 문제 생김 (rou_post_aspirantPayment): " + err.message).catch((err) => { console.log(err) });
        });
      }

      res.send(JSON.stringify({ message: "done" }));
    } catch (e) {
      console.log(e);
      logger.error("Console 서버 문제 생김 (rou_post_aspirantPayment): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_getDesignerGhost = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const { equalJson, requestSystem } = this.mother;
  let obj = {};
  obj.link = "/getDesignerGhost";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.desid === undefined) {
        throw new Error("must be desid");
      }
      const { desid } = req.body;
      let result, final, tempArr, tempObj;
      let contentsResponse;


      contentsResponse = await requestSystem("https://" + address.contentsinfo.host + ":3000/foreContents", { mode: "get", desid }, { headers: { "Content-Type": "application/json" } });
      if (!Array.isArray(contentsResponse.data)) {
        result = [];
      } else {
        result = contentsResponse.data;
      }

      final = [];
      for (let { forecast } of result) {
        tempArr = [];
        for (let { file, gs } of forecast) {
          tempObj = {};
          tempObj.link = file;
          tempObj.sgTrue = gs;
          tempArr.push(tempObj);
        }
        final.push(tempArr);
      }

      if (req.body.mode === undefined || req.body.mode === null || req.body.mode === "list") {
        res.send(JSON.stringify(final));
      } else if (req.body.mode === "full") {
        res.send(JSON.stringify(result));
      }

    } catch (e) {
      logger.error("Console 서버 문제 생김 (rou_post_getDesignerGhost): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_webHookPayment = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const { requestSystem, messageSend, zeroAddition } = this.mother;
  let obj = {};
  obj.link = "/webHookPayment";
  obj.public = true;
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const selfMongo = instance.mongo;
      const impId = req.body.imp_uid;
      const oid = req.body.merchant_uid;
      const mid = address.officeinfo.inicis.mid;
      const status = req.body.status;
      if (typeof status === "string") {
        if (/paid/gi.test(status)) {
          if (!/mini_/g.test(oid) && !/dreg_/g.test(oid)) {

            const BillMaker = require(`${process.cwd()}/apps/billMaker/billMaker.js`);
            const bill = new BillMaker();
            const { data: { response: { access_token: accessToken } } } = (await requestSystem("https://api.iamport.kr/users/getToken", {
              imp_key: address.officeinfo.import.key,
              imp_secret: address.officeinfo.import.secret
            }, { headers: { "Content-Type": "application/json" } }));
            const { data: { response: paymentData } } = await requestSystem("https://api.iamport.kr/payments/" + impId, {}, {
              method: "get",
              headers: { "Authorization": accessToken }
            });
            const { buyer_tel, paid_at } = paymentData;
            const today = new Date();
            logger.alert(JSON.stringify(paymentData, null, 2)).catch((e) => { console.log(e); });
            const convertingData = {
              goodName: paymentData.name,
              goodsName: paymentData.name,
              resultCode: (paymentData.status.trim() === "paid" ? "0000" : "4000"),
              resultMsg: (paymentData.status.trim() === "paid" ? "성공적으로 처리 하였습니다." : "결제 실패 : " + String(paymentData.fail_reason)),
              tid: paymentData.pg_tid,
              payMethod: "CARD",
              applDate: `${String(today.getFullYear())}${zeroAddition(today.getMonth() + 1)}${zeroAddition(today.getDate())}${zeroAddition(today.getHours())}${zeroAddition(today.getMinutes())}${zeroAddition(today.getSeconds())}`,
              mid: mid,
              MOID: oid,
              TotPrice: String(paymentData.amount),
              buyerName: paymentData.buyer_name,
              CARD_BankCode: paymentData.card_code,
              CARD_Num: paymentData.card_number,
              CARD_ApplPrice: String(paymentData.amount),
              CARD_Code: paymentData.card_code,
              vactBankName: paymentData.card_name,
              payDevice: "MOBILE",
              P_FN_NM: paymentData.card_name,
            };
            const clients = await back.getClientsByQuery({ phone: buyer_tel }, { selfMongo });
            let requestNumber, projects;
            if (clients.length > 0) {
              const [ client ] = clients;
              if (/잔금/gi.test(paymentData.name)) {
                projects = (await back.getProjectsByQuery({ $and: [ { cliid: client.cliid } ] }, { selfMongo })).toNormal().filter((p) => { return p.desid.trim() !== "" });
              } else {
                projects = (await back.getProjectsByQuery({ $and: [ { cliid: client.cliid } ] }, { selfMongo })).toNormal();
              }
              if (projects.length > 0) {
                projects.sort((a, b) => { return Math.abs((a.process.contract.remain.calculation.amount.consumer - a.process.contract.first.calculation.amount) - paymentData.amount) - Math.abs((b.process.contract.remain.calculation.amount.consumer - b.process.contract.first.calculation.amount) - paymentData.amount) });
                const [ project ] = projects;
                let bills;
                bills = await bill.getBillsByQuery({ $and: [
                    { "links.proid": project.proid },
                    { "links.cliid": client.cliid },
                    { "links.method": project.service.online ? "online" : "offline" }
                  ]
                });
                if (bills.length === 0) {
                  bills = await bill.getBillsByQuery({ $and: [
                      { "links.proid": project.proid },
                      { "links.cliid": client.cliid },
                    ]
                  });
                }
                if (bills.length > 0) {
                  const [ thisBill ] = bills;
                  requestNumber = 0;
                  for (let i = 0; i < thisBill.requests.length; i++) {
                    if (convertingData.goodName === thisBill.requests[i].name) {
                      requestNumber = i;
                      break;
                    }
                  }
                  await requestSystem("https://" + address.officeinfo.host + ":3002/ghostClientBill", {
                    bilid: thisBill.bilid,
                    requestNumber,
                    data: convertingData
                  }, { headers: { "Content-Type": "application/json" } });
                } else {
                  throw new Error("cannot find bills (from links.proid and links.cliid)");
                }
              }
            }

          } else if (/dreg_/g.test(oid)) {
            const { data: { response: { access_token: accessToken } } } = (await requestSystem("https://api.iamport.kr/users/getToken", {
              imp_key: address.officeinfo.import.key,
              imp_secret: address.officeinfo.import.secret
            }, { headers: { "Content-Type": "application/json" } }));
            const { data: { response: paymentData } } = await requestSystem("https://api.iamport.kr/payments/" + impId, {}, {
              method: "get",
              headers: { "Authorization": accessToken }
            });
            const [ oidConst, aspid0, aspid1 ] = oid.split("_");
            const aspid = aspid0 + "_" + aspid1;

            if (paymentData.pay_method === "card") {
              await requestSystem("https://" + address.officeinfo.host + ":3002/aspirantPayment", {
                aspid,
                mode: "card",
                status: "paid"
              }, { headers: { "Content-Type": "application/json" } });
            } else {
              await requestSystem("https://" + address.officeinfo.host + ":3002/aspirantPayment", {
                aspid,
                mode: "vbank",
                status: "paid"
              }, { headers: { "Content-Type": "application/json" } });
            }
          }
        }
      }

      res.send(JSON.stringify({ "message": "ok" }));
    } catch (e) {
      console.log(e);
      logger.error("Console 서버 문제 생김 (rou_post_webHookPayment): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ "message": "error" }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_webHookGoogle = function () {
  const instance = this;
  const back = this.back;
  const { mongo, mongoconsoleinfo, requestSystem, messageLog } = this.mother;
  const uragenGhostFinalRandomAccessKeyArraySubwayHomeLiaisonStyle = "a19OyoZjf9xQJXykapple3kE5ySgBW39IjxQJXyk3homeliaisonkE5uf9uuuySgBW3ULXHF1CdjxGGPCQJsubwayXyk3kE5ySgBW3f9y2Y2lotionpuk0dQF9ruhcs";
  const coreTargets = [ "designer", "project", "contents", "service" ];
  let obj = {};
  obj.link = "/webHookGoogle";
  obj.public = true;
  obj.func = async function (req, res, logger) {
    try {
      let boo;
      res.set({ "Content-Type": "application/json" });
      if (req.body.who === "uragen" && req.body.where === "homeliaison" && req.body.uragenGhostFinalRandomAccessKeyArraySubwayHomeLiaisonStyle === uragenGhostFinalRandomAccessKeyArraySubwayHomeLiaisonStyle) {
        if (req.body.mode === "read" || req.body.mode === "update" || req.body.mode === "create") {
          if (req.body.collection === undefined || req.body.collection === null) {
            res.send(JSON.stringify({ "message": "error" }));
          } else {
            if (typeof req.body.collection !== "string") {
              res.send(JSON.stringify({ "message": "error" }));
            } else {
              if (Array.isArray(req.body.queries)) {
                boo = true;
                for (let obj of req.body.queries) {
                  if (typeof obj !== "object") {
                    boo = false;
                  } else {
                    if (obj.whereQuery === undefined || obj.updateQuery === undefined) {
                      boo = false;
                    } else {
                      if (typeof obj.whereQuery !== "object" || typeof obj.updateQuery !== "object") {
                        boo = false;
                      } else {
                        boo = true;
                      }
                    }
                  }
                }
                if (boo) {
                  if (coreTargets.includes(req.body.collection)) {
                    for (let { whereQuery, updateQuery } of req.body.queries) {
                      await back.mongoUpdate(req.body.collection, [ whereQuery, updateQuery ], { selfMongo: instance.mongo });
                      console.log(whereQuery, updateQuery);
                    }
                  } else {
                    const selfMongo = new mongo(mongoconsoleinfo);
                    await selfMongo.connect();
                    for (let { whereQuery, updateQuery } of req.body.queries) {
                      await back.mongoUpdate(req.body.collection, [ whereQuery, updateQuery ], { selfMongo });
                    }
                    await selfMongo.close();
                  }
                  messageLog("시트로부터의 업데이트 감지 : " + req.body.collection).catch((e) => { console.log(e); });
                  res.send(JSON.stringify({ "message": "ok" }));
                } else {
                  res.send(JSON.stringify({ "message": "error" }));
                }
              } else {
                res.send(JSON.stringify({ "message": "error" }));
              }
            }
          }
        } else {
          res.send(JSON.stringify({ "message": "error" }));
        }
      } else {
        res.send(JSON.stringify({ "message": "error" }));
      }
    } catch (e) {
      logger.error("Console 서버 문제 생김 (rou_post_webHookGoogle): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_generalMongo = function () {
  const instance = this;
  const back = this.back;
  const { equalJson, fileSystem } = this.mother;
  let obj = {};
  obj.link = "/generalMongo";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.mode === undefined) {
        throw new Error("must be mode => [ create, read, update, delete, sse ]");
      }
      if (req.body.collection === undefined) {
        throw new Error("must be collection name");
      }
      if (req.body.db === undefined) {
        throw new Error("must be db name => ( [ core, back, mongo ] => instance.mongo or [ sub, local, console ] => instance.mongolocal )");
      }
      const { mode, db, collection } = req.body;
      let selfMongo, result;
      let whereQuery, updateQuery;
      let ip, device, logObject;
      let updateQueries;
      let order;

      if (db === "core" || db === "back" || db === "mongo") {
        selfMongo = instance.mongo;
      } else if (db === "sub" || db === "local" || db === "console") {
        selfMongo = instance.mongolocal;
      } else {
        throw new Error("must be db name => ( [ core, back, mongo ] => instance.mongo or [ sub, local, console ] => instance.mongolocal )");
      }

      if (mode === "read") {
        if (req.body.whereQuery === undefined) {
          throw new Error("must be whereQuery");
        }
        whereQuery = equalJson(req.body.whereQuery);
        result = await back.mongoRead(collection, whereQuery, { selfMongo });
      } else if (mode === "update") {
        if (req.body.whereQuery === undefined || req.body.updateQuery === undefined) {
          throw new Error("must be whereQuery and updateQuery");
        }
        whereQuery = equalJson(req.body.whereQuery);
        updateQuery = equalJson(req.body.updateQuery);
        result = await back.mongoRead(collection, whereQuery, { selfMongo });
        if (result.length !== 0) {
          await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo });
        }
        result = { message: "done" };
      } else if (mode === "create") {
        if (req.body.updateQuery === undefined) {
          throw new Error("must be updateQuery");
        }
        updateQuery = equalJson(req.body.updateQuery);
        await back.mongoCreate(collection, updateQuery, { selfMongo });
        result = { message: "done" };
      } else if (mode === "delete") {
        if (req.body.whereQuery === undefined) {
          throw new Error("must be whereQuery");
        }
        whereQuery = equalJson(req.body.whereQuery);
        await back.mongoDelete(collection, whereQuery, { selfMongo });
        result = { message: "done" };
      } else if (mode === "sse") {
        if (req.body.updateQueries === undefined) {

          if (req.body.updateQuery === undefined) {
            throw new Error("must be updateQuery");
          }
          updateQuery = equalJson(req.body.updateQuery);
          result = await back.mongoRead(collection, { id: "sse" }, { selfMongo });
          if (result.length === 0) {
            await back.mongoCreate(collection, { id: "sse", order: [ JSON.stringify(updateQuery) ] }, { selfMongo });
          } else {
            result[0].order.push(JSON.stringify(updateQuery));
            await back.mongoUpdate(collection, [ { id: "sse" }, { order: result[0].order } ], { selfMongo });
          }

        } else {

          updateQueries = equalJson(req.body.updateQueries);
          if (!Array.isArray(updateQueries)) {
            throw new Error("updateQueries must be updateQuery array");
          }
          if (!updateQueries.every((obj) => { return typeof obj === "object" })) {
            throw new Error("updateQueries must be updateQuery array");
          }
          result = await back.mongoRead(collection, { id: "sse" }, { selfMongo });
          if (result.length === 0) {
            order = [];
            for (let updateQuery of updateQueries) {
              order.push(JSON.stringify(updateQuery));
            }
            await back.mongoCreate(collection, { id: "sse", order }, { selfMongo });
          } else {
            for (let updateQuery of updateQueries) {
              result[0].order.push(JSON.stringify(updateQuery));
            }
            await back.mongoUpdate(collection, [ { id: "sse" }, { order: result[0].order } ], { selfMongo });
          }
          updateQuery = updateQueries;

        }

        await fileSystem(`write`, [ instance.dir + "/log/" + collection + "_latest.json", JSON.stringify([ 0 ]) ]);
        if (req.body.log !== undefined) {
          if (req.body.who === undefined) {
            throw new Error("in log, must be who");
          }
          ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
          device = req.headers['user-agent'] || "unknown";
          logObject = {
            date: (new Date()),
            who: req.body.who,
            where: { ip, device },
            update: JSON.stringify(updateQuery)
          };
          await back.mongoCreate(collection.replace(/^sse\_/, "log_"), logObject, { selfMongo });
        }
        result = { message: "done" };

      } else {
        throw new Error("must be mode => [ create, read, update, delete, sse ]");
      }

      res.send(JSON.stringify(result));
    } catch (e) {
      logger.error("Console 서버 문제 생김 (rou_post_generalMongo): " + e.message).catch((e) => { console.log(e); });
      res.send({ message: "error" });
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_generalCalendar = function () {
  const instance = this;
  const back = this.back;
  const calendar = this.calendar;
  const { equalJson } = this.mother;
  let obj = {};
  obj.link = [ "/makeSchedule", "/listSchedule", "/updateSchedule", "/deleteSchedule" ];
  obj.func = async function (req, res, logger) {
    try {
      let resultObj;
      if (req.url === "/makeSchedule") {
        if (req.body.to === undefined || req.body.title === undefined || req.body.start === undefined) {
          throw new Error("invaild body");
        }
        const { to, title } = req.body;
        const start = new Date(req.body.start.replace(/"/g, ''));
        const end = (req.body.end !== undefined) ? new Date(req.body.end.replace(/"/g, '')) : null;
        const description = (req.body.description !== undefined) ? req.body.description : "";
        resultObj = await calendar.makeSchedule(to, title, description, start, end);
      } else if (req.url === "/listSchedule") {
        if (req.body.from === undefined) {
          throw new Error("invaild body");
        }
        const { from } = req.body;
        const search = (req.body.search !== undefined) ? req.body.search : null;
        resultObj = await calendar.listEvents(from, search);
      } else if (req.url === "/updateSchedule") {
        if (req.body.from === undefined || req.body.id === undefined || req.body.updateQuery === undefined) {
          throw new Error("invaild body");
        }
        const { from, id } = req.body;
        const updateQuery = equalJson(req.body.updateQuery);
        await calendar.updateSchedule(from, id, updateQuery);
        resultObj = { "message": "done" };
      } else {
        if (req.body.from === undefined || req.body.id === undefined) {
          throw new Error("invaild body");
        }
        const { from, id } = req.body;
        await calendar.deleteSchedule(from, id);
        resultObj = { "message": "done" };
      }

      res.set({ "Content-Type": "application/json" });
      res.send(JSON.stringify(resultObj));
    } catch (e) {
      logger.error("Console 서버 문제 생김 (rou_post_generalCalendar): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_parsingAddress = function () {
  const instance = this;
  const AddressParser = require(`${process.cwd()}/apps/addressParser/addressParser.js`);
  const addressApp = new AddressParser();
  const back = this.back;
  const calendar = this.calendar;
  const { equalJson, autoComma, fileSystem } = this.mother;
  let obj = {};
  obj.link = [ "/parsingAddress" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.mode === undefined) {
        throw new Error("must be mode => inspection, distance");
      }
      const { mode } = req.body;
      let result;

      if (mode === "inspection") {
        if (req.body.addressArr === undefined) {
          throw new Error("must be addressArr");
        }
        const addressArr = equalJson(req.body.addressArr);
        const liteMode = req.body.liteMode === undefined ? false : (typeof req.body.liteMode === "string" ? req.body.liteMode === "true" : req.body.liteMode);
        for (let obj of addressArr) {
          if (obj.id === undefined || obj.address === undefined) {
            throw new Error("invaild address array => [ { id, address }... ]");
          }
          result = await addressApp.addressInspection(addressArr, liteMode);
        }
      } else if (mode === "distance") {
        if (req.body.from === undefined || req.body.to === undefined) {
          throw new Error("must be from, to");
        }
        const { from, to } = req.body;
        result = await addressApp.getTravelExpenses(from, to, { selfMongo: instance.mongolocal });
      } else if (mode === "sample" || mode === "samples") {
        const priceStandard = await back.mongoRead(`designerPrice`, { key: 33 }, { selfMongo: instance.mongolocal });
        const { travel: { unit, consulting } } = priceStandard[0];
        let travelSamples_min, temp, amount, tong;
        travelSamples_min = await fileSystem(`readJson`, [ addressApp.samples.travelMin ]);
        for (let obj of travelSamples_min) {
          temp = (unit.meters * obj.distance * 2) + (unit.seconds * obj.time * 2);
          amount = (Math.round(temp / 1000) * 1000) + (consulting.hours * consulting.labor);
          obj.amount = amount;
          obj.amountString = autoComma(amount) + '원';
        }
        tong = { standard: {  unit, consulting } };
        for (let obj of travelSamples_min) {
          if (tong[obj.desid] === undefined) {
            tong[obj.desid] = {};
            tong[obj.desid].detail = [];
          }
          tong[obj.desid].detail.push(obj);
          tong[obj.desid].designer = obj.designer;
          tong[obj.desid].desid = obj.desid;
          tong[obj.desid].address = obj.from;
        }
        tong.designers = [];
        for (let i in tong) {
          if (i !== "designers" && i !== "standard") {
            tong.designers.push(equalJson(JSON.stringify(tong[i])));
            delete tong[i];
          }
        }
        result = tong;
      }

      res.send(JSON.stringify(result));
    } catch (e) {
      logger.error("Console 서버 문제 생김 (rou_post_parsingAddress): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_realtimeClient = function () {
  const instance = this;
  const back = this.back;
  const { equalJson, fileSystem, messageSend } = this.mother;
  let obj = {};
  obj.link = [ "/realtimeClient" ];
  obj.func = async function (req, res, logger) {
    try {
      if (!req.body.hasOwnProperty("method")) {
        throw new Error("invaild post");
      }
      const selfMongo = instance.mongolocal;
      const { method } = req.body;
      const members = instance.members;
      const emptyCliid = "c0000_aa00s";
      const zeroAddition = (num) => { return (num < 10 ? `0${String(num)}` : String(num)); }
      const dateToKey = function (date) {
        if (!(date instanceof Date)) {
          throw new Error("input => Date: date");
        }
        return Number(String(date.getFullYear()) + zeroAddition(date.getMonth() + 1) + zeroAddition(date.getDate()));
      }
      const returnModel = function (date, standard, clientSide, manager) {
        if (!(date instanceof Date) || !Array.isArray(standard) || !Array.isArray(manager)) {
          throw new Error("input => Date: date, Array: standard, Array: manager");
        }
        let key, caution, matrix;
        key = dateToKey(date);
        caution = (new Array(standard.length)).fill(null, 0);
        matrix = caution.map((i) => { return (new Array(manager.length).fill(null, 0)); });
        return { key, year: date.getFullYear(), month: date.getMonth() + 1, standard, clientSide, caution, manager, matrix };
      }
      class SearchArray extends Array {
        find(q) {
          let target = null;
          for (let i of this) {
            if (i.cliid === q) {
              target = q;
              break;
            }
          }
          return target;
        }
      }
      const manager = [ "m1701_aa01s", "m1707_aa01s", "m1810_aa01s", "m2012_aa01s", "m2101_aa01s" ];
      const managerMain = [ 3, 4 ];
      const clientSide = [
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        0,
        0,
        0,
      ];
      const standard = [
        [
          [ 11, 0 ],
          [ 11, 30 ]
        ],
        [
          [ 11, 30 ],
          [ 12, 0 ]
        ],
        [
          [ 13, 30 ],
          [ 14, 0 ]
        ],
        [
          [ 14, 0 ],
          [ 14, 30 ]
        ],
        [
          [ 14, 30 ],
          [ 15, 0 ]
        ],
        [
          [ 15, 0 ],
          [ 15, 30 ]
        ],
        [
          [ 15, 30 ],
          [ 16, 0 ]
        ],
        [
          [ 16, 0 ],
          [ 16, 30 ]
        ],
        [
          [ 16, 30 ],
          [ 17, 0 ]
        ],
        [
          [ 17, 0 ],
          [ 17, 30 ]
        ],
        [
          [ 17, 30 ],
          [ 18, 0 ]
        ],
        [
          [ 18, 0 ],
          [ 18, 30 ]
        ],
        [
          [ 18, 30 ],
          [ 19, 0 ]
        ],
        [
          [ 19, 0 ],
          [ 19, 30 ]
        ],
        [
          [ 19, 30 ],
          [ 20, 0 ]
        ],
      ];
      const listKey = 99999999;
      const collection = "realtimeClient";
      let result, rows, cliidArr, clients;
      let updateIdIndex;
      let tempDate;
      let boo, boo2, thisObj;
      let bookList;
      let tempRows, tempRow;
      let memberIndex;

      if (method === "get") {
        if (req.body.date === undefined) {
          throw new Error("invaild post");
        }
        const { date } = equalJson(req.body);
        rows = await back.mongoRead(collection, { key: dateToKey(date) }, { selfMongo });
        if (rows.length === 0) {
          result = returnModel(date, standard, clientSide, manager);
          await back.mongoCreate(collection, result, { selfMongo });
        } else {
          result = rows[0];
        }

        result.standard = result.standard.map((arr) => {
          const [ from, to ] = arr;
          const arrToString = (a) => { return zeroAddition(a[0]) + ':' + zeroAddition(a[1]); }
          return (arrToString(from) + "  ~  " + arrToString(to));
        });

        if (req.body.member === undefined) {

          result.matrix = result.matrix.map((arr) => {
            let tong;
            tong = [];
            for (let number of managerMain) {
              tong.push(arr[number]);
            }
            return tong;
          });

        } else {

          memberIndex = manager.findIndex((i) => { return i === req.body.member; });
          if (memberIndex === undefined) {
            memberIndex = 0;
          }

          for (let i = 0; i < result.caution.length; i++) {
            if (typeof result.caution[i] === "string") {
              if (!result.matrix[i].includes(result.caution[i])) {
                result.matrix[i].fill(result.caution[i]);
              }
            }
          }

          result.matrix = result.matrix.map((arr) => {
            let tong;
            tong = [];
            tong.push(arr[memberIndex]);
            return tong;
          });

        }

        result.matrix = result.matrix.map((arr) => {
          let r;
          r = arr.find((z) => { return z !== null });
          if (r !== undefined && r !== null) {
            return r;
          } else {
            return emptyCliid;
          }
        });
        cliidArr = result.matrix.filter((i) => { return i !== emptyCliid; });
        cliidArr = cliidArr.map((id) => { return { cliid: id }; });
        if (cliidArr.length !== 0) {
          clients = await back.getClientsByQuery({ $or: cliidArr }, { selfMongo: instance.mongo, withTools: true });
        } else {
          clients = new SearchArray();
        }
        result.matrix = result.matrix.map((id) => {
          let client;
          client = clients.search(id);
          if (client !== undefined && client !== null) {
            return { name: client.name, cliid: client.cliid };
          } else {
            return { name: "미정", cliid: emptyCliid };
          }
        });

      } else if (method === "update") {

        if (req.body.date === undefined || req.body.update === undefined) {
          throw new Error("invaild post");
        }
        let { date, update } = equalJson(req.body);
        update = equalJson(update);
        if (update.cliid === undefined || update.index === undefined) {
          throw new Error("invaild update object");
        }

        const { cliid, index } = update;
        let member = (update.member !== undefined ? update.member : null);

        tempRows = await back.mongoRead(collection, { key: listKey }, { selfMongo });
        if (tempRows.length === 0) {
          throw new Error("invaild db");
        }
        bookList = tempRows[0];
        if (member === null) {
          if (bookList.book[cliid] !== undefined) {
            tempRows = await back.mongoRead(collection, { key: bookList.book[cliid] }, { selfMongo });
            if (tempRows.length === 0) {
              throw new Error("invaild db");
            }
            tempRow = tempRows[0];
            tempRow.caution = tempRow.caution.map((id) => {
              if (id === cliid) {
                return null;
              } else {
                return id;
              }
            });
            tempRow.matrix = tempRow.matrix.map((arr) => {
              if (arr.includes(cliid)) {
                return arr.map((id) => {
                  if (id === cliid) {
                    return null;
                  } else {
                    return id;
                  }
                });
              } else {
                return arr;
              }
            });
            await back.mongoUpdate(collection, [ { key: bookList.book[cliid] }, { caution: tempRow.caution, matrix: tempRow.matrix } ], { selfMongo });
          }
        }

        rows = await back.mongoRead(collection, { key: dateToKey(date) }, { selfMongo });
        if (rows.length !== 0) {
          result = rows[0];
          if (member !== null) {
            updateIdIndex = result.manager.findIndex((m) => { return m === member; });
            if (updateIdIndex !== undefined && updateIdIndex !== null) {
              if (updateIdIndex >= 0) {
                result.matrix[index][updateIdIndex] = cliid;
                await back.mongoUpdate(collection, [ { key: dateToKey(date) }, { matrix: result.matrix } ], { selfMongo });
              }
            }
          } else {
            if (update.name === undefined) {
              throw new Error("invaild post");
            }

            result.standard = result.standard.map((arr) => {
              const [ from, to ] = arr;
              const arrToString = (a) => { return zeroAddition(a[0]) + ':' + zeroAddition(a[1]); }
              return (arrToString(from) + " ~ " + arrToString(to));
            });

            await messageSend({ text: `${update.name}(${cliid}) 고객님이 ${String(date.getMonth() + 1)}월 ${String(date.getDate())}일 ${result.standard[index]}에 응대 예약을 하셨습니다! 담당자 지정을 부탁드리겠습니다!`, channel: "#400_customer" });
            result.caution[index] = cliid;
            await back.mongoUpdate(collection, [ { key: dateToKey(date) }, { caution: result.caution } ], { selfMongo });
          }
          bookList.book[cliid] = dateToKey(date);
          await back.mongoUpdate(collection, [ { key: listKey }, { book: bookList.book } ], { selfMongo });

        } else {
          throw new Error("invaild db");
        }
        result = { message: "done" };

      } else if (method === "standard") {
        result = standard.map((arr) => {
          const [ from, to ] = arr;
          const arrToString = (a) => { return zeroAddition(a[0]) + ':' + zeroAddition(a[1]); }
          return (arrToString(from) + "  ~  " + arrToString(to));
        });
      } else if (method === "range") {

        if (req.body.year === undefined || req.body.month === undefined) {
          throw new Error("invaild post");
        }
        const year = Number(req.body.year);
        const month = Number(req.body.month);
        const today = new Date();
        rows = await back.mongoRead(collection, { $and: [ { year }, { month } ] }, { selfMongo });
        result = [];
        for (let i = 0; i < 31; i++) {
          tempDate = new Date(year, month - 1, i + 1, standard.flat(2)[standard.flat(2).length - 2], standard.flat(2)[standard.flat(2).length - 1]);
          if (tempDate.getMonth() + 1 === month) {

            if (tempDate.getDay() === 0 || tempDate.getDay() === 6 || today.valueOf() > tempDate.valueOf()) {
              result.push(false);
            } else {
              boo = false;
              for (let r of rows) {
                if (r.key === dateToKey(tempDate)) {
                  thisObj = r;
                  boo = true;
                }
              }
              if (boo) {
                boo2 = false;
                for (let number of managerMain) {
                  boo2 = thisObj.matrix[number].includes(null);
                  if (boo2) {
                    break;
                  }
                }
                result.push(boo2);
              } else {
                result.push(true);
              }
            }
          }
        }

      } else if (method === "manager") {
        result = manager;
      } else if (method === "list") {
        tempRows = await back.mongoRead(collection, { key: listKey }, { selfMongo });
        if (tempRows.length === 0) {
          throw new Error("invaild db");
        }
        const { book } = tempRows[0];
        result = book;
      }

      res.set({ "Content-Type": "application/json" });
      res.send(JSON.stringify(result));
    } catch (e) {
      logger.error("Console 서버 문제 생김 (rou_post_realtimeClient): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_realtimeDesigner = function () {
  const instance = this;
  const back = this.back;
  const work = this.work;
  const { equalJson, fileSystem } = this.mother;
  let obj = {};
  obj.link = [ "/realtimeDesigner" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (typeof req.body.mode !== "string") {
        throw new Error("invaild post");
      }
      if (![ "get", "all", "sync", "update" ].includes(req.body.mode)) {
        throw new Error("invaild post");
      }
      const { mode } = req.body;
      const collection = "realtimeDesigner";
      let rows;
      let desid, proid;
      let result;
      let response;

      if (mode === "get") {

        if (req.body.desid === undefined) {
          throw new Error("invaild post");
        }
        desid = req.body.desid;
        rows = await back.mongoRead(collection, { desid }, { selfMongo: instance.mongolocal });
        if (rows.length > 0) {
          result = rows[0];
        } else {
          result = {};
        }

      } else if (mode === "all") {

        rows = await back.mongoPick(collection, [ {}, { desid: 1, possible: 1 } ], { selfMongo: instance.mongolocal });
        result = {
          data: rows
        };

      } else if (mode === "sync") {

        if (req.body.proid === undefined) {
          throw new Error("invaild post");
        }
        proid = req.body.proid;
        response = await work.realtimeDesignerSync(proid, { selfMongo: instance.mongo, selfConsoleMongo: instance.mongolocal });
        if (response.message === "success") {
          result = { message: "success" };
        } else {
          throw new Error(JSON.stringify(response));
        }

      } else if (mode === "update") {

        if (req.body.desid === undefined) {
          throw new Error("invaild post");
        }
        if (req.body.updateQuery === undefined) {
          throw new Error("invaild post");
        }
        const { desid, updateQuery } = equalJson(req.body);
        await back.mongoUpdate(collection, [ { desid }, updateQuery ], { selfMongo: instance.mongolocal });
        result = { message: "done" };

      }

      res.send(JSON.stringify(result));
    } catch (e) {
      logger.error("Console 서버 문제 생김 (rou_post_realtimeDesigner): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error" }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_designerFee = function () {
  const instance = this;
  const work = this.work;
  const back = this.back;
  const { equalJson, serviceParsing, dateToString } = this.mother;
  let obj = {};
  obj.link = [ "/designerFee" ];
  obj.func = async function (req, res, logger) {
    try {
      const option = { selfMongo: instance.mongo, selfLocalMongo: instance.mongolocal };
      if (req.body.matrix === undefined) {
        throw new Error("must be matrix");
      }
      const matrix = equalJson(req.body.matrix);
      const dateMargin = 10;
      let resultObj, temp;
      let project, thisProposal;
      let designerRealtime;

      if (req.body.frontMode === 1 || req.body.frontMode === '1') {
        option.frontMode = 1;
      }

      if (!Array.isArray(matrix)) {
        throw new Error("invaild post");
      }

      if (matrix.every((a) => { return typeof a === "string" && /^p/.test(a); })) {
        resultObj = {};
        for (let proid of matrix) {
          resultObj[proid] = await work.getDesignerFee(proid, option);
        }
      } else if (matrix.every((a) => { return Array.isArray(a) && a.length === 5; })) {
        resultObj = [];
        for (let [ desid, cliid, serid, xValue, proid ] of matrix) {
          temp = await work.getDesignerFee(desid, cliid, serid, xValue, option);
          temp.detail.discount = {
            online: 0,
            offline: 0,
          };
          if (proid !== null && proid !== undefined) {
            project = await back.getProjectById(proid, { selfMongo: instance.mongo });
            thisProposal = project.selectProposal(desid);
            if (thisProposal !== null) {
              for (let { method, discount } of thisProposal.fee) {
                if (/^off/gi.test(method)) {
                  temp.detail.discount.offline = discount;
                } else {
                  temp.detail.discount.online = discount;
                }
              }
            }
            designerRealtime = await work.realtimeDesignerMatch(desid, proid, option);
          } else {
            designerRealtime = await work.realtimeDesignerMatch(desid, cliid, serid, xValue, option);
          }

          if (!designerRealtime.result) {
            temp.comment = (req.body.frontMode === 1 || req.body.frontMode === '1') ? "일정 불가능" : "Unable schedule";
            // temp.detail.online = 0;
            // temp.detail.offline = 0;
            temp.detail.travel.number = 0;
            // temp.fee = 0;
          }

          temp.detail.travel.limit = 5;

          resultObj.push(temp);
        }
      } else {
        throw new Error("invaild matrix");
      }

      res.set({ "Content-Type": "application/json" });
      res.send(JSON.stringify(resultObj));
    } catch (e) {
      logger.error("Console 서버 문제 생김 (rou_post_designerFee): " + e.message).catch((e) => { console.log(e); });
      res.set({ "Content-Type": "application/json" });
      res.send(JSON.stringify([ null ]));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_inicisPayment = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const { requestSystem, cryptoString, decryptoHash, equalJson, messageSend, dateToString } = this.mother;
  const crypto = require("crypto");
  const password = "homeliaison";
  let obj = {};
  obj.link = [ "/inicisPayment" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const now = new Date();

      if (req.body.mode === "script") {
        const { cliid, kind, desid, proid, method, device, bilid } = req.body;
        const oidConst = "homeliaisonBill_";
        const version = "1.0";
        const gopaymethod = req.body.gopaymethod;
        const mid = instance.address.officeinfo.inicis.mid;
        const signkey = instance.address.officeinfo.inicis.signkey;
        const timestamp = String(now.valueOf());
        const oid = oidConst + timestamp;
        const price = Math.round(Number(req.body.price));
        const signature = crypto.createHash("sha256").update(`oid=${oid}&price=${String(price)}&timestamp=${timestamp}`).digest("hex");
        const mKey = crypto.createHash("sha256").update(signkey).digest("hex");
        const currency = "WON";
        const goodname = req.body.name;
        const buyername = req.body.buyerName;
        const buyertel = req.body.buyerPhone;
        const buyeremail = req.body.buyerEmail;
        let returnUrl, closeUrl;
        let pluginScript, formValue, acceptmethod;
        let future;

        if ((new RegExp(address.frontinfo.host, "gi")).test(req.body.currentPage)) {
          returnUrl = req.body.currentPage + "/inicisPayment?cliid=" + cliid + "&needs=" + ([ kind, desid, proid, method ]).join(',');
          closeUrl = req.body.currentPage + "/tools/trigger.html";
        } else {
          returnUrl = req.body.currentPage + "/inicisPayment?cliid=" + cliid + "&needs=" + ([ kind, desid, proid, method ]).join(',');
          closeUrl = req.body.currentPage + "/tools/trigger";
        }

        // if (device === "mobile" && gopaymethod === "Card") {
        if (gopaymethod === "Card") {
          pluginScript = '';
          pluginScript += (await requestSystem("https://cdn.iamport.kr/v1/iamport.js")).data;
          formValue = { version, gopaymethod, mid, oid, price, timestamp, signature, mKey, currency, goodname, buyername, buyertel, buyeremail, returnUrl, closeUrl };
        } else if (gopaymethod !== "Account") {
          pluginScript = (await requestSystem("https://stdpay.inicis.com/stdjs/INIStdPay.js")).data;
          if (gopaymethod === "VBank") {
            acceptmethod = "va_receipt";
          } else {
            acceptmethod = "below1000";
          }
          formValue = { version, gopaymethod, mid, oid, price, timestamp, signature, mKey, currency, goodname, buyername, buyertel, buyeremail, returnUrl, closeUrl, acceptmethod };
        } else {

          await requestSystem("https://" + instance.address.officeinfo.host + ":3002/accountTimeSet", {
            bilid,
            requestNumber: Number(req.body.requestNumber),
            proid,
            cliid,
            desid,
            goodname,
            date: new Date(),
            name: buyername,
            phone: buyertel,
            amount: price,
            accountInfo: {
              no_tid: "realAccount",
              no_oid: oid,
              cd_bank: "00",
              nm_inputbank: "unknown",
              nm_input: buyername,
              amt_input: String(price),
              real_account: "true"
            }
          }, {
            headers: { "Content-Type": "application/json" }
          });

          future = new Date();
          future.setDate(future.getDate() + 7);

          pluginScript = await cryptoString(password, JSON.stringify({
            goodName: goodname,
            goodsName: goodname,
            resultCode: "0000",
            resultMsg: "성공적으로 처리 하였습니다.",
            tid: "realAccount",
            payMethod: "ACCOUNT",
            applDate: dateToString(new Date(), true).replace(/[^0-9]/gi, ''),
            mid,
            MOID: oid,
            TotPrice: String(price),
            buyerName: buyername,
            CARD_Code: "",
            vactBankName: "기업",
            VACT_Num: "049-085567-04-022",
            VACT_Name: "(주)홈리에종",
            VACT_Date: dateToString(future).replace(/[^0-9]/gi, ''),
            payDevice: "",
            P_FN_NM: "realAccount",
            REAL_Account: "true"
          }));
          formValue = {};

        }

        res.send(JSON.stringify({ pluginScript, formValue }));

      } else if (req.body.mode === "decrypto") {

        let result = await decryptoHash(password, req.body.hash.trim());
        try {
          result = JSON.parse(result);
          res.send(JSON.stringify(result));
        } catch (e) {
          res.send(JSON.stringify({ result }));
        }

      } else if (req.body.mode === "mobileCard") {

        const { mid, oid, impId } = req.body;
        const { data: { response: { access_token: accessToken } } } = (await requestSystem("https://api.iamport.kr/users/getToken", {
          imp_key: address.officeinfo.import.key,
          imp_secret: address.officeinfo.import.secret
        }, { headers: { "Content-Type": "application/json" } }));
        const { data: { response: paymentData } } = await requestSystem("https://api.iamport.kr/payments/" + impId, {}, {
          method: "get",
          headers: { "Authorization": accessToken }
        });
        const today = new Date();
        const zeroAddition = (num) => { return num < 10 ? `0${String(num)}` : String(num); }
        const convertingData = {
          goodName: paymentData.name,
          goodsName: paymentData.name,
          resultCode: ((typeof paymentData.status === "string" && paymentData.status.trim() === "paid") ? "0000" : "4000"),
          resultMsg: ((typeof paymentData.status === "string" && paymentData.status.trim() === "paid") ? "성공적으로 처리 하였습니다." : "결제 실패 : " + String(paymentData.fail_reason)),
          tid: paymentData.pg_tid,
          payMethod: "CARD",
          applDate: `${String(today.getFullYear())}${zeroAddition(today.getMonth() + 1)}${zeroAddition(today.getDate())}${zeroAddition(today.getHours())}${zeroAddition(today.getMinutes())}${zeroAddition(today.getSeconds())}`,
          mid: mid,
          MOID: oid,
          TotPrice: String(paymentData.amount),
          buyerName: paymentData.buyer_name,
          CARD_BankCode: paymentData.card_code,
          CARD_Num: paymentData.card_number,
          CARD_ApplPrice: String(paymentData.amount),
          CARD_Code: paymentData.card_code,
          vactBankName: paymentData.card_name,
          payDevice: "MOBILE",
          P_FN_NM: paymentData.card_name,
          "__ignorethis__": 1,
        };

        if (paymentData.status.trim() === "paid") {
          res.send(JSON.stringify({ convertingData }));
        } else {
          res.send(JSON.stringify({ convertingData: { error: "error" } }));
        }

      } else if (req.body.mode === "cashPhone") {

        const { phone, hash, bilid, proid, desid, cliid, name } = equalJson(req.body);
        const data = JSON.parse(await decryptoHash(password, hash.trim()));
        await requestSystem("https://" + instance.address.officeinfo.host + ":3002/accountTimeUpdate", {
          whereQuery: {
            $and: [
              { bilid },
              { proid },
              { "accountInfo.no_oid": data.MOID }
            ]
          },
          updateQuery: { phone },
          name,
          phone,
        }, {
          headers: { "Content-Type": "application/json" }
        });
        res.send(JSON.stringify({ message: "done" }));

      } else {

        const mobileConverting = {
          P_STATUS: "resultCode",
          P_RMESG1: "resultMsg",
          P_TID: "tid",
          P_TYPE: "payMethod",
          P_AUTH_DT: "applDate",
          P_MID: "mid",
          P_OID: "MOID",
          P_AMT: "TotPrice",
          P_UNAME: "buyerName",
          P_CARD_ISSUER_CODE: "CARD_BankCode",
          P_CARD_NUM: "CARD_Num",
          P_CARD_APPLPRICE: "CARD_ApplPrice",
          P_FN_CD1: "CARD_Code",
          P_FN_NM: "vactBankName",
          P_VACT_NUM: "VACT_Num",
          P_VACT_NAME: "VACT_Name",
          P_VACT_DATE: "VACT_Date",
        };
        const charset = "UTF-8";
        const format = "JSON";
        const timestamp = String(now.valueOf());
        let device;
        let resultCode, authUrl, netCancelUrl, returnUrl, orderNumber, authToken, mid;
        let signature;
        let response, responseData;
        let target;
        let targetArr, tong, convertTong;
        let tempStr, tempArr;

        if (req.body.P_STATUS === undefined) {
          device = "desktop";
          resultCode = req.body.resultCode;
          authUrl = req.body.authUrl;
          netCancelUrl = req.body.netCancelUrl;
          returnUrl = req.body.returnUrl;
          orderNumber = req.body.orderNumber;
          authToken = req.body.authToken;
          mid = req.body.mid;
        } else {
          device = "mobile";
          resultCode = (req.body.P_STATUS === "00" ? "0000" : req.body.P_STATUS);
          authUrl = req.body.P_REQ_URL;
          netCancelUrl = "";
          returnUrl = req.body.P_NOTI.split("__split__")[2];
          orderNumber = "";
          authToken = req.body.P_TID;
          mid = req.body.P_NOTI.split("__split__")[1];
        }

        if (device === "desktop") {
          signature = crypto.createHash("sha256").update(`authToken=${authToken}&timestamp=${timestamp}`).digest("hex");
          response = await requestSystem(authUrl, { mid, authToken, timestamp, signature, charset, format });
          responseData = await cryptoString(password, JSON.stringify(response.data));
          if (response.data.resultCode === "0000") {
            res.redirect("/middle/estimation?" + returnUrl.split('?')[1] + "&mode=complete" + "&hash=" + responseData);
          } else {
            res.redirect("/middle/estimation?" + returnUrl.split('?')[1] + "&mode=fail" + "&hash=" + responseData);
          }
        } else {
          if (resultCode === "0000") {
            response = await requestSystem(authUrl, { P_MID: mid, P_TID: authToken });
            target = response.data;
            targetArr = target.split('&').map((q) => { return q.split('='); });
            for (let i = 1; i < targetArr.length; i++) {
              if (targetArr[i][0] === "needs" || targetArr[i][0] === "mode" || targetArr[i][0] === "cliid" || targetArr[i][0] === "desid" || targetArr[i][0] === "proid") {
                tempStr = targetArr[i - 1][targetArr[i - 1].length - 1] + "&" + targetArr[i].join('=');
                targetArr[i - 1][targetArr[i - 1].length - 1] = tempStr;
              }
            }
            targetArr = targetArr.filter((arr) => { return arr[0] !== "needs" && arr[0] !== "mode" && arr[0] !== "cliid" && arr[0] !== "desid" && arr[0] !== "proid" });
            for (let i = 0; i < targetArr.length; i++) {
              if (targetArr[i].length > 2) {
                tempArr = JSON.parse(JSON.stringify(targetArr[i]));
                tempArr.shift();
                targetArr[i] = [ targetArr[i][0], tempArr.join('=') ];
              }
            }
            tong = {};
            for (let arr of targetArr) {
              tong[arr[0]] = arr[1];
            }

            convertTong = {};
            convertTong.goodName = tong.P_NOTI.split("__split__")[0];
            convertTong.goodsName = tong.P_NOTI.split("__split__")[0];
            for (let from in mobileConverting) {
              if (tong[from] !== undefined) {
                convertTong[mobileConverting[from]] = tong[from];
              }
            }
            if (convertTong.resultCode === "00") {
              convertTong.resultCode = "0000";
            }
            convertTong.payDevice = "MOBILE";
            convertTong.P_FN_NM = convertTong.vactBankName;
            responseData = await cryptoString(password, JSON.stringify(convertTong));

            if (convertTong.resultCode === "0000") {
              res.redirect("/middle/estimation?" + returnUrl.split('?')[1] + "&mode=complete" + "&hash=" + responseData);
            } else {
              logger.alert("결제 문제 생김 (rou_post_inicisPayment) : " + JSON.stringify(convertTong, null, 2) + "\n" + JSON.stringify(req.body, null, 2)).catch((e) => { console.log(e); });
              res.redirect("/middle/estimation?" + returnUrl.split('?')[1] + "&mode=fail" + "&hash=" + responseData);
            }
          } else {
            logger.alert("결제 문제 생김 (rou_post_inicisPayment) : " + resultCode + "\n" + JSON.stringify(req.body, null, 2)).catch((e) => { console.log(e); });
            res.redirect("/middle/estimation?" + returnUrl.split('?')[1] + "&mode=fail");
          }
        }

      }

    } catch (e) {
      logger.error("Console 서버 문제 생김 (rou_post_inicisPayment): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_callTo = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const { requestSystem, equalJson } = this.mother;
  let obj = {};
  obj.link = [ "/callTo" ];
  obj.func = async function (req, res, logger) {
    res.set({ "Content-Type": "application/json" });
    try {
      if (req.body.who === undefined) {
        res.send(JSON.stringify({ message: "OK" }));
      } else {
        const members = instance.members;
        let thisPerson, index, number, phone, who;

        who = req.body.who;

        if (req.body.phone !== undefined) {
          phone = req.body.phone;
        } else if (req.body.proid !== undefined) {
          phone = (await back.getClientById((await back.getProjectById(req.body.proid, { selfMongo: instance.mongo })).cliid, { selfMongo: instance.mongo })).phone;
        } else {
          throw new Error("invaild post");
        }

        for (let { id, email } of members) {
          if (email.includes(who)) {
            thisPerson = id;
            break;
          }
        }
        index = address.officeinfo.phone.members.indexOf(thisPerson);

        if (index === -1 || address.officeinfo.phone.numbers[index] === undefined) {
          logger.alert("Console 서버 문제 생김 (rou_post_callTo): cannot find member index => " + String(index) + ", " + thisPerson + ", " + who + ", " + JSON.stringify(req.body)).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error" }));
        } else {
          number = address.officeinfo.phone.numbers[index];
          await requestSystem("https://" + instance.address.secondinfo.host + ":3003/clickDial", { id: number, destnumber: phone.replace(/[^0-9]/g, '') }, { headers: { "Content-Type": "application/json" } });
          res.send(JSON.stringify({ message: "true" }));
        }
      }
    } catch (e) {
      console.log(e);
      logger.error("Console 서버 문제 생김 (rou_post_callTo): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error" }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_ghostDesigner_updateAnalytics = function () {
  const instance = this;
  const back = this.back;
  const { equalJson, ipParsing } = this.mother;
  let obj = {};
  obj.link = [ "/ghostDesigner_updateAnalytics" ];
  obj.func = async function (req, res, logger) {
    try {
      if (req.body.mode === undefined || req.body.desid === undefined || req.body.page === undefined || req.body.who === undefined) {
        throw new Error("invaild post");
      }
      const { mode, desid, page, who } = req.body;
      const ip = String(req.headers["x-forwarded-for"] === undefined ? req.socket.remoteAddress : req.headers["x-forwarded-for"]).trim().replace(/[^0-9\.]/gi, '');
      const rawUserAgent = req.useragent;
      const { source: userAgent, browser, os, platform } = rawUserAgent;
      const referrer = (req.headers.referer === undefined ? "" : req.headers.referer);
      let whereQuery, updateQuery;
      let history;
      let update;
      let image;
      let ipObj;
      let updateObj;

      whereQuery = { desid };
      history = await back.getHistoryById("designer", desid, { selfMongo: instance.mongolocal });
      if (history === null) {
        await back.createHistory("designer", { desid }, { selfMongo: instance.mongolocal, secondMongo: instance.mongo });
        history = await back.getHistoryById("designer", desid, { selfMongo: instance.mongolocal });
      }

      if (mode === "page") {

        ipObj = await ipParsing(ip);
        if (Object.keys(ipObj).length === 0) {
          ipObj = { ip };
        }
        history[page].analytics.page.push({ page, date: new Date(), who, referrer, userAgent, browser, os, platform, mobile: rawUserAgent.isMobile, ...ipObj });
        updateQuery = {};
        updateQuery[page + ".analytics.page"] = history[page].analytics.page;
        await back.updateHistory("designer", [ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });

      } else if (mode === "update") {

        update = equalJson(req.body.update);
        history[page].analytics.update.push({ page, who, date: new Date(), update });
        updateQuery = {};
        updateQuery[page + ".analytics.update"] = history[page].analytics.update;
        await back.updateHistory("designer", [ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });

      } else if (mode === "send") {

        ipObj = await ipParsing(ip);
        if (Object.keys(ipObj).length === 0) {
          ipObj = { ip };
        }
        updateObj = { page, date: new Date(), who, referrer, userAgent, browser, os, platform, mobile: rawUserAgent.isMobile, ...ipObj };
        if (typeof req.body.cliid === "string") {
          updateObj.cliid = req.body.cliid.trim();
        }
        history[page].analytics.send.push(updateObj);
        updateQuery = {};
        updateQuery[page + ".analytics.send"] = history[page].analytics.send;
        await back.updateHistory("designer", [ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });

      } else {
        throw new Error("invaild mode");
      }

      res.set({ "Content-Type": "application/json" });
      res.send(JSON.stringify({ message: "done" }));

    } catch (e) {
      logger.error("Console 서버 문제 생김 (rou_post_ghostDesigner_updateAnalytics): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_ghostDesigner_getAnalytics = function () {
  const instance = this;
  const back = this.back;
  const { equalJson } = this.mother;
  let obj = {};
  obj.link = [ "/ghostDesigner_getAnalytics" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.desid === undefined || req.body.mode === undefined || req.body.type === undefined) {
        throw new Error("invalid post");
      }
      const { desid, mode, type } = req.body;
      const selfMongo = instance.mongolocal;
      const db = "miro81";
      const collection = "designerHistory";
      let projectQuery;
      let rows, row;
      let targetAnalytics;

      projectQuery = {};
      projectQuery[mode] = 1;

      rows = await selfMongo.db(db).collection(collection).find({ desid }).project(projectQuery).toArray();
      if (rows.length === 0) {
        throw new Error("invalid desid");
      }

      [ row ] = rows;
      targetAnalytics = row[mode].analytics[type];

      if (req.body.cliid === undefined) {
        res.send(JSON.stringify(targetAnalytics));
      } else {
        res.send(JSON.stringify(targetAnalytics.filter((obj) => { return obj.cliid === req.body.cliid })));
      }

    } catch (e) {
      logger.error("Console 서버 문제 생김 (rou_post_ghostDesigner_getAnalytics): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_errorLog = function () {
  const instance = this;
  const { equalJson } = this.mother;
  let obj = {};
  obj.link = [ "/errorLog" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      let ip, rawUserAgent;
      if (typeof req.body.message !== "string") {
        throw new Error("invalid post");
      }

      ip = String(req.headers["x-forwarded-for"] === undefined ? req.socket.remoteAddress : req.headers["x-forwarded-for"]).trim().replace(/[^0-9\.]/gi, '');
      rawUserAgent = req.useragent;

      await logger.error(req.body.message + "\n\n" + "ip: " + String(ip) + "\n\n" + JSON.stringify(rawUserAgent, null, 2));
      res.send(JSON.stringify({ message: "done" }));
    } catch (e) {
      await logger.error("Console 서버 문제 생김 (rou_post_errorLog): " + e.message);
      res.send(JSON.stringify({ message: "error" }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_getDataPatch = function () {
  const instance = this;
  const { equalJson } = this.mother;
  let obj = {};
  obj.link = [ "/getDataPatch", "/dataPatch" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (typeof req.body.method !== "string") {
        throw new Error("invalid post");
      }
      const { method } = req.body;
      const result = (instance.patch[method])();
      res.send(JSON.stringify(result));
    } catch (e) {
      await logger.error("Console 서버 문제 생김 (rou_post_getDataPatch): " + e.message);
      res.send(JSON.stringify({ message: "error" }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_constructInteraction = function () {
  const instance = this;
  const back = this.back;
  const kakao = this.kakao;
  const { equalJson, dateToString, stringToDate, requestSystem, autoComma, messageSend } = this.mother;
  const numberToHangul = (number) => {
    if (typeof number !== "number") {
      throw new Error("input must be integer");
    }
    const instance = this;
    const hangul0 = [ '', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구' ];
    const hangul1 = [ '', '십', '백', '천' ];
    const hangul2 = [ '', '만', '억', '조', '경', '해', '자', '양', '구', '간', '정', '재', '극' ];
    try {
      let numberStr, numberArr, hangul3, first;

      hangul3 = [];
      for (let i = 0; i < hangul2.length; i++) {
        for (let j = 0; j < hangul1.length; j++) {
          hangul3.push(hangul1[j] + hangul2[i]);
        }
      }

      number = Math.floor(number);
      numberStr = String(number);
      numberArr = numberStr.split('').reverse();
      numberArr = numberArr.map((str, index) => {
        if (str === '0') {
          return '';
        } else {
          return hangul0[Number(str)] + hangul3[index];
        }
      });

      for (let i = 1; i < hangul2.length; i++) {
        first = true;
        for (let j = 0; j < numberArr.length; j++) {
          if ((new RegExp(hangul2[i] + '$')).test(numberArr[j])) {
            if (first) {
              first = false;
            } else {
              numberArr[j] = numberArr[j].slice(0, -1);
            }
          }
        }
      }
      numberArr.reverse();

      return numberArr.join('');

    } catch (e) {
      console.log(e);
      return null;
    }
  }
  let obj = {};
  obj.link = [ "/constructInteraction" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (typeof req.body.mode !== "string" || typeof req.body.proid !== "string") {
        throw new Error("invalid post 1");
      }
      if (![ "updatePayments", "inspection", "sendContract", "constructOnoff", "amountSync", "chargeGuide", "changeAmount", "historyUpdate" ].includes(req.body.mode)) {
        throw new Error("invalid post 2");
      }
      const { mode, proid } = req.body;
      const project = await back.getProjectById(proid, { selfMongo: instance.mongo });
      const projectHistory = await back.getHistoryById("project", proid, { selfMongo: instance.mongolocal });
      const { process: { design: { construct } } } = project;
      let result, summary;

      if (mode !== "constructOnoff" && construct === null) {
        throw new Error("invaild proid");
      }

      if (mode === "updatePayments") {
        if (req.body.first === undefined || req.body.start === undefined || req.body.middle === undefined || req.body.remain === undefined || req.body.total === undefined) {
          throw new Error("invaild post");
        }
        const { total, first, start, middle, remain } = equalJson(req.body);
        let firstObj, startObj, middleObj, remainObj;
        let whereQuery, updateQuery;

        if (construct.contract.payments.first === null) {
          firstObj = back.returnProjectDummies("process.design.construct.contract.payments");
        } else {
          firstObj = construct.contract.payments.first;
        }
        firstObj.calculation.amount.consumer = Math.round(Math.floor(total * (first.ratio / 100)) / 1000) * 1000;
        firstObj.calculation.amount.vat = Math.floor(firstObj.calculation.amount.consumer / 11);
        firstObj.calculation.amount.supply = firstObj.calculation.amount.consumer - firstObj.calculation.amount.vat;

        if (construct.contract.payments.start === null) {
          startObj = back.returnProjectDummies("process.design.construct.contract.payments");
        } else {
          startObj = construct.contract.payments.start;
        }
        startObj.calculation.amount.consumer = Math.round(Math.floor(total * (start.ratio / 100)) / 1000) * 1000;
        startObj.calculation.amount.vat = Math.floor(startObj.calculation.amount.consumer / 11);
        startObj.calculation.amount.supply = startObj.calculation.amount.consumer - startObj.calculation.amount.vat;

        if (construct.contract.payments.middle === null) {
          middleObj = back.returnProjectDummies("process.design.construct.contract.payments");
        } else {
          middleObj = construct.contract.payments.middle;
        }
        middleObj.calculation.amount.consumer = Math.round(Math.floor(total * (middle.ratio / 100)) / 1000) * 1000;
        middleObj.calculation.amount.vat = Math.floor(middleObj.calculation.amount.consumer / 11);
        middleObj.calculation.amount.supply = middleObj.calculation.amount.consumer - middleObj.calculation.amount.vat;

        if (construct.contract.payments.remain === null) {
          remainObj = back.returnProjectDummies("process.design.construct.contract.payments");
        } else {
          remainObj = construct.contract.payments.remain;
        }
        remainObj.calculation.amount.consumer = Math.round(Math.floor(total * (remain.ratio / 100)) / 1000) * 1000;
        remainObj.calculation.amount.vat = Math.floor(remainObj.calculation.amount.consumer / 11);
        remainObj.calculation.amount.supply = remainObj.calculation.amount.consumer - remainObj.calculation.amount.vat;

        whereQuery = { proid };
        updateQuery = {};
        updateQuery["process.design.construct.contract.payments.first"] = firstObj;
        updateQuery["process.design.construct.contract.payments.start"] = startObj;
        updateQuery["process.design.construct.contract.payments.middle"] = middleObj;
        updateQuery["process.design.construct.contract.payments.remain"] = remainObj;
        await back.updateProject([ whereQuery, updateQuery ], { selfMongo: instance.mongo });

        result = {
          message: "success",
          core: {
            first: firstObj,
            start: startObj,
            middle: middleObj,
            remain: remainObj,
          }
        };

      } else if (mode === "inspection") {

        const { name, address, start, end } = equalJson(req.body);
        let firstAmount, firstPercentage;
        let startAmount, startPercentage;
        let middleAmount, middlePercentage;
        let remainAmount, remainPercentage;
        let totalAmount;

        if (construct.contract.payments.first === null || construct.contract.payments.start === null || construct.contract.payments.middle === null || construct.contract.payments.remain === null) {
          result = { result: false, summary: null };
        } else {

          firstAmount = Math.floor(construct.contract.payments.first.calculation.amount.consumer);
          startAmount = Math.floor(construct.contract.payments.start.calculation.amount.consumer);
          middleAmount = Math.floor(construct.contract.payments.middle.calculation.amount.consumer);
          remainAmount = Math.floor(construct.contract.payments.remain.calculation.amount.consumer);

          totalAmount = (firstAmount + startAmount + middleAmount + remainAmount);

          firstPercentage = Math.round((firstAmount / totalAmount) * 100);
          startPercentage = Math.round((startAmount / totalAmount) * 100);
          middlePercentage = Math.round((middleAmount / totalAmount) * 100);
          remainPercentage = 100 - (firstPercentage + startPercentage + middlePercentage);

          if (firstPercentage < 0 || startPercentage < 0 || middlePercentage < 0 || remainPercentage < 0) {
            result = { result: false, summary: null };
          } else {

            summary = {
              total: Math.floor(totalAmount),
              hangul: numberToHangul(Math.floor(totalAmount)) + '원',
              name,
              address,
              date: { start, end },
              first: {
                percentage: Math.floor(firstPercentage),
                amount: Math.floor(firstAmount),
                date: dateToString(projectHistory.construct.payments.first.date),
                etc: projectHistory.construct.payments.first.etc
              },
              start: {
                percentage: Math.floor(startPercentage),
                amount: Math.floor(startAmount),
                date: dateToString(projectHistory.construct.payments.start.date),
                etc: projectHistory.construct.payments.start.etc
              },
              middle: {
                percentage: Math.floor(middlePercentage),
                amount: Math.floor(middleAmount),
                date: dateToString(projectHistory.construct.payments.middle.date),
                etc: projectHistory.construct.payments.middle.etc
              },
              remain: {
                percentage: Math.floor(remainPercentage),
                amount: Math.floor(remainAmount),
                date: dateToString(projectHistory.construct.payments.remain.date),
                etc: projectHistory.construct.payments.remain.etc
              },
            }
            result = { result: true, summary };

          }
        }

      } else if (mode === "sendContract") {

        const { summary } = equalJson(req.body);
        let whereQuery, updateQuery;

        whereQuery = { proid };
        updateQuery = {};
        updateQuery["process.design.construct.contract.form.guide"] = new Date();
        await back.updateProject([ whereQuery, updateQuery ], { selfMongo: instance.mongo });

        requestSystem("https://" + instance.address.officeinfo.host + ":3002/createConstructContract", { proid, summary }, { headers: { "Content-type": "application/json" } }).catch((err) => {
          throw new Error(err);
        });
        result = { message: "success" };

      } else if (mode === "constructOnoff") {
        const { action } = req.body;
        let whereQuery, updateQuery;

        whereQuery = { proid };
        updateQuery = {};

        if (action === "on") {
          updateQuery["process.design.construct"] = back.returnProjectDummies("process.design.construct");
        } else {
          updateQuery["process.design.construct"] = null;
        }

        await back.updateProject([ whereQuery, updateQuery ], { selfMongo: instance.mongo });
        result = { message: "success" };

      } else if (mode === "amountSync") {
        const { amount: amountRaw } = req.body;
        const amount = Number(amountRaw);
        let whereQuery, updateQuery;
        let supply, vat, consumer;
        if (construct.contract.payments.remain !== null) {

          consumer = Math.floor(amount);
          vat = Math.floor(consumer / 11);
          supply = Math.floor(consumer - vat);

          whereQuery = { proid };
          updateQuery = {};

          updateQuery["process.design.construct.contract.payments.remain.calculation.amount.supply"] = supply;
          updateQuery["process.design.construct.contract.payments.remain.calculation.amount.vat"] = vat;
          updateQuery["process.design.construct.contract.payments.remain.calculation.amount.consumer"] = consumer;

          await back.updateProject([ whereQuery, updateQuery ], { selfMongo: instance.mongo });

          requestSystem("https://" + instance.address.officeinfo.host + ":3002/constructAmountSync", {
            proid,
            cliid: project.cliid,
            desid: project.desid,
            method: (project.service.online ? "online" : "offline"),
            amount: { supply, vat, consumer },
          }, { headers: { "Content-type": "application/json" } }).catch((err) => {
            throw new Error(err);
          });

        }

        result = {};

      } else if (mode === "chargeGuide") {
        const { method } = equalJson(req.body);
        const now = new Date();
        const client = await back.getClientById(project.cliid, { selfMongo: instance.mongo });
        const cliid = client.cliid;
        const host = instance.address.frontinfo.host;
        const path = "estimation";
        const needs = "style," + project.desid + "," + project.proid + "," + (project.service.online ? "online" : "offline");
        const name = client.name;
        const phone = client.phone;
        let whereQuery, updateQuery;
        let target;
        whereQuery = { proid };
        updateQuery = {};
        target = "";
        if (method === "first") {
          await kakao.sendTalk("constructFirst", name, phone, {
            client: name,
            amount: autoComma(project.process.design.construct.contract.payments.first.calculation.amount.consumer),
            host, path, cliid, needs
          });
          updateQuery["process.design.construct.contract.payments.first.guide"] = now;
          target = "계약금";
        } else if (method === "start") {
          await kakao.sendTalk("constructStart", name, phone, {
            client: name,
            amount: autoComma(project.process.design.construct.contract.payments.start.calculation.amount.consumer),
            host, path, cliid, needs
          });
          updateQuery["process.design.construct.contract.payments.start.guide"] = now;
          target = "착수금";
        } else if (method === "middle") {
          await kakao.sendTalk("constructMiddle", name, phone, {
            client: name,
            amount: autoComma(project.process.design.construct.contract.payments.middle.calculation.amount.consumer),
            host, path, cliid, needs
          });
          updateQuery["process.design.construct.contract.payments.middle.guide"] = now;
          target = "중도금";
        } else if (method === "remain") {
          await kakao.sendTalk("constructRemain", name, phone, {
            client: name,
            amount: autoComma(project.process.design.construct.contract.payments.remain.calculation.amount.consumer),
            host, path, cliid, needs
          });
          updateQuery["process.design.construct.contract.payments.remain.guide"] = now;
          target = "잔금";
        }
        await back.updateProject([ whereQuery, updateQuery ], { selfMongo: instance.mongo });
        messageSend({ text: name + " 고객님께 시공 " + target + " 안내 알림톡을 전송했어요.", channel: "#400_customer", voice: true }).catch((err) => {
          console.log(err);
        });
        result = { date: dateToString(now), now };

      } else if (mode === "changeAmount") {

        if (req.body.map === undefined) {
          throw new Error("invaild post");
        }
        const { map: { first, start, middle, remain } } = equalJson(req.body);
        let firstObj, startObj, middleObj, remainObj;
        let whereQuery, updateQuery;
        let toPython;

        if (construct.contract.payments.first === null) {
          firstObj = back.returnProjectDummies("process.design.construct.contract.payments");
        } else {
          firstObj = construct.contract.payments.first;
        }
        firstObj.calculation.amount.consumer = first;
        firstObj.calculation.amount.vat = Math.floor(firstObj.calculation.amount.consumer / 11);
        firstObj.calculation.amount.supply = firstObj.calculation.amount.consumer - firstObj.calculation.amount.vat;

        if (construct.contract.payments.start === null) {
          startObj = back.returnProjectDummies("process.design.construct.contract.payments");
        } else {
          startObj = construct.contract.payments.start;
        }
        startObj.calculation.amount.consumer = start;
        startObj.calculation.amount.vat = Math.floor(startObj.calculation.amount.consumer / 11);
        startObj.calculation.amount.supply = startObj.calculation.amount.consumer - startObj.calculation.amount.vat;

        if (construct.contract.payments.middle === null) {
          middleObj = back.returnProjectDummies("process.design.construct.contract.payments");
        } else {
          middleObj = construct.contract.payments.middle;
        }
        middleObj.calculation.amount.consumer = middle;
        middleObj.calculation.amount.vat = Math.floor(middleObj.calculation.amount.consumer / 11);
        middleObj.calculation.amount.supply = middleObj.calculation.amount.consumer - middleObj.calculation.amount.vat;

        if (construct.contract.payments.remain === null) {
          remainObj = back.returnProjectDummies("process.design.construct.contract.payments");
        } else {
          remainObj = construct.contract.payments.remain;
        }
        remainObj.calculation.amount.consumer = remain;
        remainObj.calculation.amount.vat = Math.floor(remainObj.calculation.amount.consumer / 11);
        remainObj.calculation.amount.supply = remainObj.calculation.amount.consumer - remainObj.calculation.amount.vat;

        toPython = {
          proid,
          cliid: project.cliid,
          desid: project.desid,
          method: project.service.online ? "online" : "offline",
          first: {
            consumer: firstObj.calculation.amount.consumer,
            vat: firstObj.calculation.amount.vat,
            supply: firstObj.calculation.amount.supply,
          },
          start: {
            consumer: startObj.calculation.amount.consumer,
            vat: startObj.calculation.amount.vat,
            supply: startObj.calculation.amount.supply,
          },
          middle: {
            consumer: middleObj.calculation.amount.consumer,
            vat: middleObj.calculation.amount.vat,
            supply: middleObj.calculation.amount.supply,
          },
          remain: {
            consumer: remainObj.calculation.amount.consumer,
            vat: remainObj.calculation.amount.vat,
            supply: remainObj.calculation.amount.supply,
          },
        };

        requestSystem("https://" + instance.address.officeinfo.host + ":3002/constructAmountSync", toPython, { headers: { "Content-type": "application/json" } }).catch((err) => {
          throw new Error(err);
        });

        whereQuery = { proid };
        updateQuery = {};
        updateQuery["process.design.construct.contract.payments.first"] = firstObj;
        updateQuery["process.design.construct.contract.payments.start"] = startObj;
        updateQuery["process.design.construct.contract.payments.middle"] = middleObj;
        updateQuery["process.design.construct.contract.payments.remain"] = remainObj;
        await back.updateProject([ whereQuery, updateQuery ], { selfMongo: instance.mongo });

        result = {
          message: "success",
          core: {
            first: firstObj,
            start: startObj,
            middle: middleObj,
            remain: remainObj,
          }
        };

      } else if (mode === "historyUpdate") {
        const { kind, value, column } = equalJson(req.body);
        let whereQuery, updateQuery;
        whereQuery = { proid };
        updateQuery = {};
        updateQuery["construct.payments." + kind + "." + column] = (column === "date" ? stringToDate(value) : value);
        await back.updateHistory("project", [ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });
        result = {};
      } else {
        result = {};
      }

      res.send(JSON.stringify(result));
    } catch (e) {
      await logger.error("Console 서버 문제 생김 (rou_post_constructInteraction): " + e.message);
      res.send(JSON.stringify({ message: "error" }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_getOpenGraph = function () {
  const instance = this;
  const { equalJson, requestSystem } = this.mother;
  let obj = {};
  obj.link = [ "/getOpenGraph" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (typeof req.body.url !== "string") {
        throw new Error("invaild post");
      }
      const mode = req.body.mode;
      let url;
      let result;
      let urlArr;
      let resOpen, targets;
      let middleTarget, target;
      let imgTargets, imgTarget;
      let imgMiddleTarget;
      let protocol, host;
      let imgMiddleTargets;
      let requestHeaders;

      requestHeaders = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
      };

      try {
        url = global.decodeURI(req.body.url);
      } catch (e) {
        await logger.error("Console 서버 문제 생김 (rou_post_getOpenGraph): " + e.message + "\n" + JSON.stringify(req.body, null, 2));
        url = "";
      }
      urlArr = url.split("");
      urlArr = urlArr.map((char) => {
        if (/[가-힣]/i.test(char)) {
          return global.encodeURI(char);
        } else if (char.trim() === '') {
          return global.encodeURI(char);
        } else {
          return char;
        }
      });
      url = urlArr.join("");

      try {
        resOpen = await requestSystem(url, {}, { method: "get", headers: requestHeaders });
        targets = [ ...resOpen.data.matchAll(/\<meta[^\>]+property=\"og\:image\"[^\>]+\>/gi) ].map((arr) => { return arr[0] });
      } catch (e) {
        targets = [];
      }

      imgTarget = null;
      if (targets.length === 0) {
        try {
          resOpen = await requestSystem(url);
          imgMiddleTargets = [ ...resOpen.data.matchAll(/\<img[^\>]+src="[^\>]+\>/gi) ].map((arr) => { return arr[0] });
        } catch (e) {
          imgMiddleTargets = [];
        }
        imgTargets = imgMiddleTargets.filter((str) => { return !/\.svg/gi.test(str) });
        if (imgTargets.length > 0) {
          imgMiddleTarget = [ ...imgTargets[0].matchAll(/src\=\"[^\"]+\"/gi) ];
          if (imgMiddleTarget.length > 0) {
            imgTarget = imgMiddleTarget[0][0].trim().replace(/^src\=\"/gi, '').slice(0, -1);
            if (/^\//.test(imgTarget)) {
              [ protocol, host ] = url.split('/').filter((str) => { return str.trim() !== '' })
              if (/^\/\//.test(imgTarget)) {
                imgTarget = protocol + imgTarget;
              } else {
                imgTarget = protocol + "//" + host + imgTarget;
              }
            }
          }
        }
      }

      middleTarget = [];
      target = null;
      if (targets.length > 0) {
        middleTarget = [ ...targets[targets.length - 1].matchAll(/content\=\"[^\"]+\"/gi) ];
        if (middleTarget.length > 0) {
          target = middleTarget[0][0].trim().replace(/^content\=\"/gi, '').slice(0, -1);
          if (/^\//.test(target)) {
            [ protocol, host ] = url.split('/').filter((str) => { return str.trim() !== '' })
            if (/^\/\//.test(target)) {
              target = protocol + target;
            } else {
              target = protocol + "//" + host + target;
            }
          }
        }
      }

      if (target === null) {
        if (imgTarget === null) {
          result = { image: null };
        } else {
          result = { image: imgTarget };
        }
      } else {
        result = { image: target };
      }

      if (typeof req.body.target === "string") {
        result.target = req.body.target;
      }

      res.send(JSON.stringify(result));
    } catch (e) {
      console.log(e);
      console.log(req);
      await logger.error("Console 서버 문제 생김 (rou_post_getOpenGraph): " + e.message + "\n" + JSON.stringify(req.body, null, 2));
      res.send(JSON.stringify({ message: "error" }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_generalImpPayment = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const { requestSystem, uniqueValue, equalJson } = this.mother;
  let obj = {};
  obj.link = [ "/generalImpPayment" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (typeof req.body.mode !== "string") {
        throw new Error("invaild post");
      }
      const { mode } = req.body;
      const storeCollection = "impPaymentTempStore";
      const selfMongo = instance.mongolocal;
      const oidConstDictionary = {
        mini: "mini_",
        designerPhoto: "dpho_",
        designerRegistration: "dreg_",
      };
      let pluginScript;

      if (mode === "script") {
        pluginScript = '';
        pluginScript += (await requestSystem("https://cdn.iamport.kr/v1/iamport.js")).data;
        res.send(JSON.stringify({ pluginScript, oidConst: oidConstDictionary[req.body.oidKey] }));

      } else if (mode === "store") {

        const data = equalJson(req.body.data);
        const key = "impKey_" + uniqueValue("hex");
        await back.mongoCreate(storeCollection, { key, data: JSON.stringify(data), oid: req.body.oid }, { selfMongo });

        res.send(JSON.stringify({ key }));

      } else if (mode === "open") {

        const key = req.body.key;
        const rows = await back.mongoRead(storeCollection, { key }, { selfMongo });
        if (rows.length === 0) {
          res.send(JSON.stringify({}));
        } else {
          const [ { key, data, oid } ] = rows;
          const { response: { access_token } } = (await requestSystem("https://api.iamport.kr/users/getToken", {
            imp_key: address.officeinfo.import.key,
            imp_secret: address.officeinfo.import.secret,
          }, { headers: { "Content-Type": "application/json" } })).data;
          const { data: { response: rsp } } = await requestSystem("https://api.iamport.kr/payments/find/" + oid, {}, { method: "get", headers: { "Authorization": access_token } });
          res.send(JSON.stringify({ data: equalJson(data), oid, rsp }));
        }

      } else if (mode === "oid") {
        const { response: { access_token } } = (await requestSystem("https://api.iamport.kr/users/getToken", {
          imp_key: address.officeinfo.import.key,
          imp_secret: address.officeinfo.import.secret,
        }, { headers: { "Content-Type": "application/json" } })).data;
        const { oid } = equalJson(req.body);
        const { data: { response: rsp } } = await requestSystem("https://api.iamport.kr/payments/find/" + oid, {}, { method: "get", headers: { "Authorization": access_token } });
        res.send(JSON.stringify({ data: { oid }, oid, rsp }));

      } else {
        throw new Error("invaild mode");
      }

    } catch (e) {
      console.log(e);
      await logger.error("Console 서버 문제 생김 (rou_post_generalImpPayment): " + e.message);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_designerFeeTable = function () {
  const instance = this;
  const work = this.work;
  const { requestSystem } = this.mother;
  let obj = {};
  obj.link = [ "/designerFeeTable" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      let json;
      json = await work.designerFeeTable(req.body.desid, { selfMongo: this.mongo, selfLocalMongo: this.mongolocal, jsonMode: true });
      res.send(json);
    } catch (e) {
      await logger.error("Console 서버 문제 생김 (rou_post_designerFeeTable): " + e.message);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_timeDeltaAlarm = function () {
  const instance = this;
  const back = this.back;
  const kakao = this.kakao;
  const address = this.address;
  const { messageSend, dateToString, stringToDate, sleep, requestSystem, equalJson } = this.mother;
  const firstMeetingAlarmFunc = async (MONGOC, logger) => {
    try {
      const selfMongo = MONGOC;
      const today = new Date();
      const dayConst = [ '일', '월', '화', '수', '목', '금', '토' ];
      let projects;
      let clients, client;
      let clientIndex;
      let meetingDate;
      let delta;
      let todayValue;
      let rawDelta;
      let designer;

      today.setHours(9);
      todayValue = today.valueOf();

      projects = await back.getProjectsByQuery({
        $and: [
          { "desid": { $regex: "^d" } },
          { "process.status": { $regex: "^[대진]" } },
          { "process.contract.meeting.date": { $gt: new Date() } },
        ]
      }, { selfMongo });

      if (projects.length > 0) {

        clients = await back.getClientsByQuery({
          $or: [ ...new Set(projects.toNormal().map((pr) => { return pr.cliid; })) ].map((cliid) => { return { cliid } }),
        }, { selfMongo });

        for (let project of projects) {
          clientIndex = clients.toNormal().findIndex((obj) => { return obj.cliid === project.cliid });
          if (clientIndex !== -1) {
            meetingDate = project.process.contract.meeting.date;
            client = clients.toNormal()[clientIndex];

            rawDelta = (((Math.abs(meetingDate.valueOf() - todayValue) / 1000) / 60) / 60) / 24;
            delta = Math.floor(rawDelta);

            if (delta === 1 || delta === 7) {

              designer = await back.getDesignerById(project.desid, { selfMongo });

              await kakao.sendTalk("firstMeetingWeekAgo", client.name, client.phone, {
                client: client.name,
                date: String(meetingDate.getMonth() + 1) + "월 " + String(meetingDate.getDate()) + "일",
                day: dayConst[meetingDate.getDay()],
                hour: String(meetingDate.getHours()),
                minute: String(meetingDate.getMinutes()),
                host: address.frontinfo.host,
                path: "meeting",
                proid: project.proid,
              });

              await kakao.sendTalk("designerConsoleRequestFirstMeeting", designer.designer, designer.information.phone, {
                designer: designer.designer,
                client: client.name,
                date: String(meetingDate.getMonth() + 1) + "월 " + String(meetingDate.getDate()) + "일",
                day: dayConst[meetingDate.getDay()],
                hour: String(meetingDate.getHours()),
                minute: String(meetingDate.getMinutes()),
                host: address.frontinfo.host,
                path: "process",
                proid: project.proid,
              });

              await messageSend(client.name + " 고객님과 " + designer.designer + " 실장님께 현장 미팅 알림을 전송하였어요.", "#400_customer", true);
            }

          }
        }
      }

      await logger.cron("first meeting alarm done");

    } catch (e) {
      await logger.error("Console 서버 문제 생김 (rou_post_firstMeetingAlarm): " + e.message);
    }
  }
  const afterMeetingAlarmFunc = async (MONGOC, logger) => {
    try {
      const selfMongo = MONGOC;
      const today = new Date();
      let projects;
      let clients, client;
      let clientIndex;
      let meetingDate;
      let todayValue;
      let designer;
      let ago;

      today.setHours(9);
      todayValue = today.valueOf();

      ago = new Date();
      ago.setHours(7);
      ago.setDate(ago.getDate() - 1);

      projects = await back.getProjectsByQuery({
        $and: [
          { "desid": { $regex: "^d" } },
          { "process.status": { $regex: "^[대진]" } },
          { "process.contract.meeting.date": { $gte: ago } },
        ]
      }, { selfMongo });

      if (projects.length > 0) {

        clients = await back.getClientsByQuery({
          $or: [ ...new Set(projects.toNormal().map((pr) => { return pr.cliid; })) ].map((cliid) => { return { cliid } }),
        }, { selfMongo });

        for (let project of projects) {
          clientIndex = clients.toNormal().findIndex((obj) => { return obj.cliid === project.cliid });
          if (clientIndex !== -1) {
            meetingDate = project.process.contract.meeting.date;
            client = clients.toNormal()[clientIndex];

            if (meetingDate.valueOf() <= todayValue) {

              designer = await back.getDesignerById(project.desid, { selfMongo });

              await kakao.sendTalk("feedBackDesigner", designer.designer, designer.information.phone, {
                client: client.name,
                designer: designer.designer,
                host: address.frontinfo.host,
                proid: project.proid,
              });

              await messageSend(designer.designer + " 실장님께 현장 미팅 피드백 알림을 전송하였어요.", "#300_designer", true);

            }
          }
        }
      }

      await logger.cron("first meeting feedback alarm done");

    } catch (e) {
      await logger.error("Console 서버 문제 생김 (rou_post_firstMeetingAlarm): " + e.message);
    }
  }
  const photoDesignerAlarmFunc = async (MONGOC, logger) => {
    try {
      const selfMongo = MONGOC;
      const today = new Date();
      let projects;
      let clients, client;
      let clientIndex;
      let photoDate;
      let delta;
      let todayValue;
      let rawDelta;
      let designer;
      let requestNumber;

      today.setHours(9);
      todayValue = today.valueOf();

      projects = await back.getProjectsByQuery({
        $and: [
          { "desid": { $regex: "^d" } },
          { "process.status": { $regex: "^[대진]" } },
          { "contents.photo.date": { $gt: new Date() } },
        ]
      }, { selfMongo });

      if (projects.length > 0) {

        clients = await back.getClientsByQuery({
          $or: [ ...new Set(projects.toNormal().map((pr) => { return pr.cliid; })) ].map((cliid) => { return { cliid } }),
        }, { selfMongo });

        for (let project of projects) {
          clientIndex = clients.toNormal().findIndex((obj) => { return obj.cliid === project.cliid });
          if (clientIndex !== -1) {
            photoDate = project.contents.photo.date;
            client = clients.toNormal()[clientIndex];
            requestNumber = 0;
            for (let z = 0; z < client.requests.length; z++) {
              if (client.requests[z].request.timeline.valueOf() <= project.proposal.date.valueOf()) {
                requestNumber = z;
                break;
              }
            }

            rawDelta = (((Math.abs(photoDate.valueOf() - todayValue) / 1000) / 60) / 60) / 24;
            delta = Math.floor(rawDelta);

            if (delta === 3) {

              designer = await back.getDesignerById(project.desid, { selfMongo });

              await kakao.sendTalk("photoDateDesigner", designer.designer, designer.information.phone, {
                designer: designer.designer,
                client: client.name,
                date: `${String(photoDate.getFullYear())}년 ${String(photoDate.getMonth() + 1)}월 ${String(photoDate.getDate())}일 ${String(photoDate.getHours())}시`,
                address: client.requests[requestNumber].request.space.address,
              });

              await messageSend(designer.designer + " 실장님께 촬영일 알림을 전송하였어요.", "#300_designer", false);
            }

          }
        }
      }

      await logger.cron("photo designer alarm done");

    } catch (e) {
      await logger.error("Console 서버 문제 생김 (rou_post_firstMeetingAlarm): " + e.message);
    }
  }
  const contractStartAlarmFunc = async (MONGOC, logger) => {
    try {
      const selfMongo = MONGOC;
      const today = new Date();
      let projects;
      let clients, client;
      let clientIndex;
      let contractDate;
      let todayValue;
      let designer;
      let requestNumber;
      let ago;

      today.setHours(9);
      todayValue = today.valueOf();

      ago = new Date();
      ago.setHours(7);
      ago.setDate(ago.getDate() - 2);

      projects = await back.getProjectsByQuery({
        $and: [
          { "desid": { $regex: "^d" } },
          { "process.status": { $regex: "^[대진완홀]" } },
          { "process.contract.form.date.from": { $gte: ago } },
          { "process.remain.date": { $gte: new Date(2000, 0, 1) } },
        ]
      }, { selfMongo });

      if (projects.length > 0) {

        clients = await back.getClientsByQuery({
          $or: [ ...new Set(projects.toNormal().map((pr) => { return pr.cliid; })) ].map((cliid) => { return { cliid } }),
        }, { selfMongo });

        for (let project of projects) {
          clientIndex = clients.toNormal().findIndex((obj) => { return obj.cliid === project.cliid });
          if (clientIndex !== -1) {
            contractDate = project.process.contract.form.date.from;
            client = clients.toNormal()[clientIndex];
            requestNumber = 0;
            for (let z = 0; z < client.requests.length; z++) {
              if (client.requests[z].request.timeline.valueOf() <= project.proposal.date.valueOf()) {
                requestNumber = z;
                break;
              }
            }
            if (dateToString(contractDate) === dateToString(new Date())) {

              designer = await back.getDesignerById(project.desid, { selfMongo });

              await kakao.sendTalk("contractStartDesigner", designer.designer, designer.information.phone, {
                designer: designer.designer,
                client: client.name,
                host: address.frontinfo.host,
                proid: project.proid,
              });

              await messageSend(designer.designer + " 실장님께 " + client.name + " 고객님 프로젝트 계약 시작일 알림을 전송하였어요.", "#300_designer", false);
            }
          }
        }
      }

      await logger.cron("contract start designer alarm done");

    } catch (e) {
      await logger.error("Console 서버 문제 생김 (rou_post_firstMeetingAlarm): " + e.message);
    }
  }
  let obj = {};
  obj.link = [ "/timeDeltaAlarm" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      firstMeetingAlarmFunc(instance.mongo, logger).then(() => {
      //   return afterMeetingAlarmFunc(instance.mongo, logger);
      // }).then(() => {
      //   return photoDesignerAlarmFunc(instance.mongo, logger);
      // }).then(() => {
        return contractStartAlarmFunc(instance.mongo, logger);
      }).then(() => {
        return logger.cron("time delta alarm done : " + JSON.stringify(new Date()));
      }).catch((err) => {
        logger.error("Console 서버 문제 생김 (rou_post_timeDeltaAlarm): " + e.message).catch((err) => { console.log(err) });
      });
      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      await logger.error("Console 서버 문제 생김 (rou_post_timeDeltaAlarm): " + e.message);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_pushClient = function () {
  const instance = this;
  const back = this.back;
  const kakao = this.kakao;
  const address = this.address;
  const { messageSend, dateToString, stringToDate, sleep } = this.mother;
  const pushClientFunc = async (MONGOC, logger) => {
    try {
      const selfMongo = MONGOC;
      const clients = await back.getClientsByQuery({}, { selfMongo, withTools: true });
      let today, ago;
      let requests;

      today = new Date();
      today.setHours(today.getHours() - 1);

      ago = new Date();
      ago.setDate(ago.getDate() - 2);

      requests = clients.getRequestsTong().filter((request) => {
        return request.analytics.response.status.value === "응대중" && request.analytics.response.action.value === "1차 응대 예정";
      }).filter((request) => {
        return request.request.timeline.valueOf() < today.valueOf() && request.request.timeline.valueOf() >= ago.valueOf();
      })

      for (let request of requests) {
        await kakao.sendTalk("pushClient", request.name, request.phone, {
          client: request.name,
          host: address.frontinfo.host,
          path: "curation",
          cliid: request.cliid,
        });
        await messageSend({ text: request.name + " 고객님께 신청 완료해달라고 부탁했어요.", channel: "#404_curation", voice: true });
        await sleep(1000);
      }

      await logger.cron("push client done");


    } catch (e) {
      await logger.error("Console 서버 문제 생김 (rou_post_firstMeetingAlarm): " + e.message);
    }
  }
  let obj = {};
  obj.link = [ "/pushClient" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      pushClientFunc(instance.mongo, logger).catch((err) => {
        logger.error("Console 서버 문제 생김 (rou_post_pushClient): " + err.message).catch((err) => { console.log(err) });
      });
      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      await logger.error("Console 서버 문제 생김 (rou_post_pushClient): " + e.message);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_processConsole = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const { equalJson, requestSystem } = this.mother;
  let obj = {};
  obj.link = [ "/processConsole" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const selfMongo = instance.mongolocal;
      const selfCoreMongo = instance.mongo;
      const { mode } = req.body;
      let projects, clients, designers, history;
      let ago;
      let preClients;
      let clientHistory;
      let proidArr;
      let secondRes;
      let values;
      let designerValue;
      let preDesigners;
      let clientValues, designerValues;
      let finalOr;
      let searchMode;
      let clientValue;

      class NormalArray extends Array {
        constructor(arr) {
          super();
          for (let i of arr) {
            this.push(i);
          }
        }
        toNormal() {
          let arr;
          arr = [];
          for (let i of this) {
            arr.push(i);
          }
          return arr;
        }
      }

      if (mode !== "pre") {
        if (mode === "init") {

          projects = await back.getProjectsByQuery({
            $and: [
              {
                "process.contract.first.date": { $gte: new Date(2000, 0, 1) }
              },
              {
                "process.status": { $regex: "^[진대]" }
              }
            ]
          }, { selfMongo: selfCoreMongo });

        } else if (mode === "search") {

          const { value } = req.body;

          if (value === '' || value === '.') {
            projects = await back.getProjectsByQuery({
              $and: [
                {
                  "process.contract.first.date": { $gte: new Date(2000, 0, 1) }
                },
                {
                  "process.status": { $regex: "^[진대]" }
                }
              ]
            }, { selfMongo: selfCoreMongo });
          } else {
            if (/\,/gi.test(value)) {

              values = value.split(",").map((str) => { return str.trim() });
              clientValues = values.filter((str) => { return /^c\:/i.test(str) && str.length >= 3 });
              designerValues = values.filter((str) => { return !(/^c\:/i.test(str) && str.length >= 3) });

              if (clientValues.length > 0) {
                preClients = await back.getClientsByQuery({ $or: clientValues.map((str) => { return str.split(":")[1].trim() }).map((str) => { return { name: { $regex: str } } }) }, { selfMongo: selfCoreMongo });
              } else {
                preClients = new NormalArray([]);
              }
              if (designerValues.length > 0) {
                preDesigners = await back.getDesignersByQuery({ $or: designerValues.map((str) => { return { designer: { $regex: str } } }) }, { selfMongo: selfCoreMongo });
              } else {
                preDesigners = new NormalArray([]);
              }

              finalOr = preClients.toNormal().map((c) => { return { cliid: c.cliid } }).concat(preDesigners.toNormal().map((c) => { return { desid: c.desid } }))

              if (finalOr.length > 0) {
                projects = await back.getProjectsByQuery({ $or: finalOr }, { selfMongo: selfCoreMongo });
                projects = projects.filter((project) => {
                  return project.process.contract.first.date.valueOf() > (new Date(2000, 0, 1)).valueOf();
                });
              } else {
                projects = [];
              }

            } else if (/^c\:/i.test(value) && value.length >= 3) {

              clientValue = value.split(":")[1].trim();
              preClients = await back.getClientsByQuery({ name: { $regex: clientValue } }, { selfMongo: selfCoreMongo });
              if (preClients.length === 0) {
                projects = [];
              } else {
                projects = await back.getProjectsByQuery({ $or: preClients.toNormal().map((c) => { return { cliid: c.cliid } }) }, { selfMongo: selfCoreMongo });
                projects = projects.filter((project) => {
                  return project.process.contract.first.date.valueOf() > (new Date(2000, 0, 1)).valueOf();
                });
              }

            } else {
              designerValue = value;
              preDesigners = await back.getDesignersByQuery({ designer: { $regex: designerValue } }, { selfMongo: selfCoreMongo });
              if (preDesigners.length === 0) {
                projects = [];
              } else {
                projects = await back.getProjectsByQuery({ $or: preDesigners.toNormal().map((c) => { return { desid: c.desid } }) }, { selfMongo: selfCoreMongo });
                projects = projects.filter((project) => {
                  return project.process.contract.first.date.valueOf() > (new Date(2000, 0, 1)).valueOf();
                });
              }
            }
          }

        } else {

          projects = await back.getProjectsByQuery({
            $and: [
              {
                "process.contract.first.date": { $gte: new Date(2000, 0, 1) }
              },
              {
                "process.status": { $regex: "^[진대]" }
              }
            ]
          }, { selfMongo: selfCoreMongo });

        }

        projects.sort((a, b) => { return b.process.contract.first.date.valueOf() - a.process.contract.first.date.valueOf() });

        if (projects.length > 0) {

          clients = await back.getClientsByQuery({ $or: Array.from(new Set(projects.toNormal().map((p) => { return p.cliid }))).map((cliid) => { return { cliid } }) }, { selfMongo: selfCoreMongo });
          designers = await back.getDesignersByQuery({ $or: Array.from(new Set(projects.toNormal().map((p) => { return p.desid }))).map((desid) => { return { desid } }) }, { selfMongo: selfCoreMongo });

          history = await back.mongoRead("projectHistory", {
            $or: projects.toNormal().map((project) => { return { proid: project.proid } })
          }, { selfMongo });

          clientHistory = await back.mongoRead("clientHistory", {
            $or: clients.toNormal().map((client) => { return { cliid: client.cliid } })
          }, { selfMongo });

          proidArr = projects.toNormal().map((p) => { return p.proid })
          secondRes = await requestSystem("https://" + address.secondinfo.host + ":3003/getProcessData", { proidArr }, {
            headers: {
              "Content-Type": "application/json",
              "origin": address.officeinfo.host
            }
          });

          res.send(JSON.stringify({ projects: projects.toNormal(), clients: clients.toNormal(), designers: designers.toNormal(), history, clientHistory, rawContents: secondRes.data.rawContents, sendStatus: secondRes.data.sendStatus, sendSchedule: secondRes.data.sendSchedule, sendFile: secondRes.data.sendFile }));

        } else {
          res.send(JSON.stringify({ projects: [], clients: [], designers: [], history: [], clientHistory: [], rawContents: [], sendStatus: [], sendSchedule: [], sendFile: [] }));
        }
      } else {

        searchMode = (typeof req.body.searchMode === "string" && /^p/.test(req.body.searchMode));

        if (searchMode) {
          projects = await back.getProjectsByQuery({
            $and: [
              {
                "process.contract.first.date": { $gte: new Date(2000, 0, 1) }
              },
              {
                "proid": req.body.searchMode
              }
            ]
          }, { selfMongo: selfCoreMongo });
        } else {
          if (req.body.careView !== undefined && Number(req.body.careView) === 1) {
            projects = await back.getProjectsByQuery({
              $and: [
                {
                  "process.contract.first.date": { $gte: new Date(2000, 0, 1) }
                },
                {
                  "process.status": { $regex: "^[진]" }
                }
              ]
            }, { selfMongo: selfCoreMongo });
          } else {
            projects = await back.getProjectsByQuery({
              $and: [
                {
                  "process.contract.first.date": { $gte: new Date(2000, 0, 1) }
                },
                {
                  "process.status": { $regex: "^[진대]" }
                }
              ]
            }, { selfMongo: selfCoreMongo });
          }
        }
        projects.sort((a, b) => { return b.process.contract.first.date.valueOf() - a.process.contract.first.date.valueOf() });
        if (projects.length > 0) {
          clients = await back.getClientsByQuery({ $or: Array.from(new Set(projects.toNormal().map((p) => { return p.cliid }))).map((cliid) => { return { cliid } }) }, { selfMongo: selfCoreMongo });
          res.send(JSON.stringify({ projects: projects.toNormal(), clients: clients.toNormal() }));
        } else {
          res.send(JSON.stringify({ projects: [], clients: [] }));
        }

      }

    } catch (e) {
      await logger.error("Console 서버 문제 생김 (rou_post_processConsole): " + e.message);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_salesClient = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const kakao = this.kakao;
  const { equalJson, messageSend } = this.mother;
  let obj = {};
  obj.link = [ "/salesClient" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.mode === undefined) {
        throw new Error("invalid post");
      }
      const selfMongo = instance.mongolocal;
      const selfCoreMongo = instance.mongo;
      const collection = "dailySales";
      const { mode } = req.body;
      const monthAgo = 3;
      let basicRows;
      let pureCliids;
      let clients, clientHistories;
      let standard;
      let resultObj;
      let whereQuery, updateQuery;
      let filteredHistory;
      let ongoingClients;
      let ongoingClientsRequests;
      let ongoingClientsCliids;
      let orQuery;
      let newBasicRows;
      let copiedObj;
      let ago;
      let targetCliids;
      let targetClients;
      let targetHistories;
      let copiedSend;

      standard = new Date();
      standard.setMonth(standard.getMonth() - monthAgo);

      resultObj = { message: "done" };

      if (mode === "init") {

        ongoingClients = await back.getClientsByQuery({
          requests: {
            $elemMatch: {
              "analytics.response.status": {
                $regex: "^[응장]"
              }
            }
          }
        }, { selfMongo: selfCoreMongo, withTools: true });

        ongoingClientsRequests = ongoingClients.getRequestsTong();
        ongoingClientsRequests.sort((a, b) => {
          return a.request.timeline.valueOf() - b.request.timeline.valueOf();
        });

        if (ongoingClientsRequests.length === 0) {
          basicRows = await back.mongoRead(collection, { date: { $gte: standard } }, { selfMongo });
        } else {
          basicRows = await back.mongoRead(collection, { date: { $gte: ongoingClientsRequests[0].request.timeline } }, { selfMongo });
        }

        basicRows.sort((a, b) => {
          return b.date.valueOf() - a.date.valueOf();
        })

        pureCliids = basicRows.map((o) => {
          return o.cliids.map((o2) => {
            return o2.cliid;
          })
        }).flat();

        clients = await back.getClientsByQuery({ $or: pureCliids.map((cliid) => { return { cliid } }) }, { selfMongo: selfCoreMongo });
        clientHistories = await back.mongoRead("clientHistory", { $or: pureCliids.map((cliid) => { return { cliid } }) }, { selfMongo });

        filteredHistory = [];
        for (let obj of clientHistories) {
          filteredHistory.push({
            cliid: obj.cliid,
            manager: obj.manager,
            curation: obj.curation,
          })
        }

        resultObj = {
          clients: clients.toNormal(),
          histories: filteredHistory,
          sales: basicRows
        };

      } else if (mode === "search") {

        const { value } = req.body;
        if (value.trim() === '' || value.trim() === '.') {

          ongoingClients = await back.getClientsByQuery({
            requests: {
              $elemMatch: {
                "analytics.response.status": {
                  $regex: "^[응장]"
                }
              }
            }
          }, { selfMongo: selfCoreMongo, withTools: true });

          ongoingClientsRequests = ongoingClients.getRequestsTong();
          ongoingClientsRequests.sort((a, b) => {
            return a.request.timeline.valueOf() - b.request.timeline.valueOf();
          });

          if (ongoingClientsRequests.length === 0) {
            basicRows = await back.mongoRead(collection, { date: { $gte: standard } }, { selfMongo });
          } else {
            basicRows = await back.mongoRead(collection, { date: { $gte: ongoingClientsRequests[0].request.timeline } }, { selfMongo });
          }

          pureCliids = basicRows.map((o) => {
            return o.cliids.map((o2) => {
              return o2.cliid;
            })
          }).flat();

          clients = await back.getClientsByQuery({ $or: pureCliids.map((cliid) => { return { cliid } }) }, { selfMongo: selfCoreMongo });
          clientHistories = await back.mongoRead("clientHistory", { $or: pureCliids.map((cliid) => { return { cliid } }) }, { selfMongo });

          filteredHistory = [];
          for (let obj of clientHistories) {
            filteredHistory.push({
              cliid: obj.cliid,
              manager: obj.manager,
              curation: obj.curation,
            })
          }

          resultObj = {
            clients: clients.toNormal(),
            histories: filteredHistory,
            sales: basicRows
          };

        } else {

          ongoingClients = await back.getClientsByQuery({
            name: { $regex: value }
          }, { selfMongo: selfCoreMongo });
          ongoingClientsCliids = ongoingClients.toNormal().map((c) => { return c.cliid });

          orQuery = [];
          for (let cliid of ongoingClientsCliids) {
            orQuery.push({
              cliids: {
                $elemMatch: { cliid }
              }
            })
          }

          if (orQuery.length === 0) {
            basicRows = [];
            resultObj = {
              clients: [],
              histories: [],
              sales: basicRows
            };
          } else {
            basicRows = await back.mongoRead(collection, { $or: orQuery }, { selfMongo });

            newBasicRows = [];
            for (let obj of basicRows) {
              copiedObj = equalJson(JSON.stringify(obj));
              copiedObj.cliids = copiedObj.cliids.filter((o) => {
                return ongoingClientsCliids.includes(o.cliid);
              })
              newBasicRows.push(copiedObj);
            }

            pureCliids = newBasicRows.map((o) => {
              return o.cliids.map((o2) => {
                return o2.cliid;
              })
            }).flat();

            if (pureCliids.length === 0) {
              filteredHistory = [];
            } else {
              clientHistories = await back.mongoRead("clientHistory", { $or: pureCliids.map((cliid) => { return { cliid } }) }, { selfMongo });
              filteredHistory = [];
              for (let obj of clientHistories) {
                filteredHistory.push({
                  cliid: obj.cliid,
                  manager: obj.manager,
                  curation: obj.curation,
                })
              }
            }

            resultObj = {
              clients: ongoingClients.toNormal(),
              histories: filteredHistory,
              sales: newBasicRows
            };

          }

        }

      } else if (mode === "update") {

        ({ whereQuery, updateQuery } = equalJson(req.body));
        await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo });
        resultObj = { message: "done" };

      } else if (mode === "lowLow") {
        if (typeof req.body.cliid === "string") {

          targetClients = await back.getClientsByQuery({ cliid: req.body.cliid }, { selfMongo: selfCoreMongo });
          targetHistories = await back.mongoRead("clientHistory", { cliid: req.body.cliid }, { selfMongo });

          for (let client of targetClients) {
            await kakao.sendTalk("hahaClientSend", client.name, client.phone, { client: client.name, host: instance.address.frontinfo.host, cliid: client.cliid });
            await messageSend({ text: client.name + " 고객님께 하하(타겟 하, 우선순위 하) 고객용 알림톡을 전송하였습니다!", channel: "#400_customer", voice: false });
          }

          for (let history of targetHistories) {

            whereQuery = { cliid: history.cliid };
            updateQuery = {};

            copiedSend = equalJson(JSON.stringify(history.curation.analytics.send));
            copiedSend.push({
              page: "lowLowPush",
              date: new Date(),
              mode: null,
              who: {
                name: null,
                email: null,
              }
            })
            copiedSend.sort((a, b) => { return a.date.valueOf() - b.date.valueOf() })

            updateQuery["curation.analytics.send"] = copiedSend;

            await back.mongoUpdate("clientHistory", [ whereQuery, updateQuery ], { selfMongo });
          }

          resultObj = copiedSend;

        } else {

          ago = new Date();
          ago.setDate(ago.getDate() - 1);

          basicRows = await back.mongoRead(collection, { date: { $gte: ago } }, { selfMongo });
          if (basicRows.length === 0) {
            resultObj = { message: "fail" };
          } else {
            targetCliids = basicRows[0].cliids;
            targetCliids = targetCliids.filter((obj) => {
              return obj.priority === 0 && obj.target === 0;
            });
            if (targetCliids.length === 0) {
              resultObj = { message: "done" };
            } else {
              targetClients = await back.getClientsByQuery({ $or: targetCliids.map((obj) => { return { cliid: obj.cliid } }) }, { selfMongo: selfCoreMongo });
              targetHistories = await back.mongoRead("clientHistory", { $or: targetCliids.map((obj) => { return { cliid: obj.cliid } }) }, { selfMongo });

              for (let client of targetClients) {
                await kakao.sendTalk("hahaClientSend", client.name, client.phone, { client: client.name, host: instance.address.frontinfo.host, cliid: client.cliid });
                await messageSend({ text: client.name + " 고객님께 하하(타겟 하, 우선순위 하) 고객용 알림톡을 전송하였습니다!", channel: "#400_customer", voice: false });
              }

              for (let history of targetHistories) {

                whereQuery = { cliid: history.cliid };
                updateQuery = {};

                copiedSend = equalJson(JSON.stringify(history.curation.analytics.send));
                copiedSend.push({
                  page: "lowLowPush",
                  date: new Date(),
                  mode: null,
                  who: {
                    name: null,
                    email: null,
                  }
                })
                copiedSend.sort((a, b) => { return a.date.valueOf() - b.date.valueOf() })

                updateQuery["curation.analytics.send"] = copiedSend;
                await back.mongoUpdate("clientHistory", [ whereQuery, updateQuery ], { selfMongo });
              }

              resultObj = { message: "done" };
            }
          }

        }
      }

      res.send(JSON.stringify(resultObj));

    } catch (e) {
      await logger.error("Console 서버 문제 생김 (rou_post_salesClient): " + e.message);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_dailySales = function () {
  const instance = this;
  const back = this.back;
  const { equalJson, messageSend, dateToString, stringToDate } = this.mother;
  let obj = {};
  obj.link = [ "/dailySales" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const selfMongo = instance.mongolocal;
      const selfCoreMongo = instance.mongo;
      const aMonthAgo = new Date();
      aMonthAgo.setDate(aMonthAgo.getDate() - 30);
      const clients = await back.getClientsByQuery({
        requests: {
          $elemMatch: {
            "request.timeline": { $gte: aMonthAgo }
          }
        }
      }, { selfMongo: selfCoreMongo, withTools: true });
      const requests = clients.getRequestsTong();
      const collection = "dailySales";
      const idMaker = (date) => {
        return `sales_${dateToString(date).replace(/\-/gi, '')}`;
      }
      let now;
      let standard0From, standard1From, standard2From, standard3From, standard4From;
      let standard0To, standard1To, standard2To, standard3To, standard4To;
      let dummy;
      let thisRequests;
      let matrix;
      let rows;
      let resultObj;

      now = new Date();

      standard0From = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0, 0, 0);
      while (standard0From.getDay() === 0 || standard0From.getDay() === 6) {
        standard0From.setDate(standard0From.getDate() - 1);
      }
      standard1From = new Date(JSON.stringify(standard0From).slice(1, -1));
      standard1From.setDate(standard1From.getDate() - 1);
      while (standard1From.getDay() === 0 || standard1From.getDay() === 6) {
        standard1From.setDate(standard1From.getDate() - 1);
      }
      standard2From = new Date(JSON.stringify(standard1From).slice(1, -1));
      standard2From.setDate(standard2From.getDate() - 1);
      while (standard2From.getDay() === 0 || standard2From.getDay() === 6) {
        standard2From.setDate(standard2From.getDate() - 1);
      }
      standard3From = new Date(JSON.stringify(standard2From).slice(1, -1));
      standard3From.setDate(standard3From.getDate() - 1);
      while (standard3From.getDay() === 0 || standard3From.getDay() === 6) {
        standard3From.setDate(standard3From.getDate() - 1);
      }
      standard4From = new Date(JSON.stringify(standard3From).slice(1, -1));
      standard4From.setDate(standard4From.getDate() - 1);
      while (standard4From.getDay() === 0 || standard4From.getDay() === 6) {
        standard4From.setDate(standard4From.getDate() - 1);
      }

      standard0To = new Date(JSON.stringify(standard0From).slice(1, -1));
      standard1To = new Date(JSON.stringify(standard1From).slice(1, -1));
      standard2To = new Date(JSON.stringify(standard2From).slice(1, -1));
      standard3To = new Date(JSON.stringify(standard3From).slice(1, -1));
      standard4To = new Date(JSON.stringify(standard4From).slice(1, -1));

      standard0From.setDate(standard0From.getDate() - 1);
      while (standard0From.getDay() === 0 || standard0From.getDay() === 6) {
        standard0From.setDate(standard0From.getDate() - 1);
      }
      standard1From.setDate(standard1From.getDate() - 1);
      while (standard1From.getDay() === 0 || standard1From.getDay() === 6) {
        standard1From.setDate(standard1From.getDate() - 1);
      }
      standard2From.setDate(standard2From.getDate() - 1);
      while (standard2From.getDay() === 0 || standard2From.getDay() === 6) {
        standard2From.setDate(standard2From.getDate() - 1);
      }
      standard3From.setDate(standard3From.getDate() - 1);
      while (standard3From.getDay() === 0 || standard3From.getDay() === 6) {
        standard3From.setDate(standard3From.getDate() - 1);
      }
      standard4From.setDate(standard4From.getDate() - 1);
      while (standard4From.getDay() === 0 || standard4From.getDay() === 6) {
        standard4From.setDate(standard4From.getDate() - 1);
      }

      matrix = [
        [ standard0From, standard0To ],
        [ standard1From, standard1To ],
        [ standard2From, standard2To ],
        [ standard3From, standard3To ],
        [ standard4From, standard4To ],
      ];

      for (let [ standardFrom, standardTo ] of matrix) {

        dummy = {
          id: idMaker(standardTo),
          date: new Date(JSON.stringify(standardTo).slice(1, -1)),
          range: {
            from: new Date(JSON.stringify(standardFrom).slice(1, -1)),
            to: new Date(JSON.stringify(standardTo).slice(1, -1)),
          },
          cliids: [],
        }

        thisRequests = requests.filter((request) => { return request.request.timeline.valueOf() > standardFrom.valueOf() && request.request.timeline.valueOf() <= standardTo.valueOf() })

        for (let obj of thisRequests) {
          dummy.cliids.push({
            cliid: obj.cliid,
            possible: 0,
            priority: 0,
            target: 0,
          })
        }

        rows = await back.mongoRead(collection, { id: dummy.id }, { selfMongo });
        if (rows.length !== 0) {
          await back.mongoDelete(collection, { id: dummy.id }, { selfMongo });
        }
        await back.mongoCreate(collection, equalJson(JSON.stringify(dummy)), { selfMongo });

      }

      resultObj = { message: "done" };

      res.send(JSON.stringify(resultObj));

    } catch (e) {
      await logger.error("Console 서버 문제 생김 (rou_post_dailySales): " + e.message);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_dailySalesReport = function () {
  const instance = this;
  const back = this.back;
  const { equalJson, messageSend, dateToString, stringToDate } = this.mother;
  let obj = {};
  obj.link = [ "/dailySalesReport" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.startYear === undefined || req.body.startMonth === undefined || req.body.endYear === undefined || req.body.endMonth === undefined) {
        throw new Error("invalid post");
      }
      const { startYear, startMonth, endYear, endMonth } = req.body;
      const selfMongo = instance.mongolocal;
      const selfCoreMongo = instance.mongo;
      const collection = "dailySales";
      const historyCollection = "clientHistory";
      const proposalKeywords = "designerProposal";
      const db = "miro81";
      const rowToCliids = (rows) => {
        const targetRows = equalJson(JSON.stringify(rows));
        return targetRows.map((o) => { return o.cliids.map(({ cliid }) => { return cliid }) }).flat();
      }
      let rows;
      let rowsCopy;
      let whereQuery;
      let thisClients, thisHistories;
      let thisProjects;
      let reports;
      let reportObject;
      let managers;
      let targetRows;
      let targetCliids;
      let targetClients;
      let monthRows, monthCliids, monthClients;
      let fromDate;
      let toDate;
      let currentClients;
      let rowsFlat;
      let resultObj;
      let todayClients;
      let startDate, endDate;
      let allSendHistories;
      let monthFromDate;
      let toDateStandard;
      let contractProjects;
      let contractProjectsCliids;
      let contractProjectsCopied;
      let monthProjects;
      let thisDateCopied;
      let totalProjects;

      startDate = new Date(Number(startYear), Number(startMonth) - 1, 1, 8, 0, 0);
      endDate = new Date(Number(endYear), Number(endMonth) - 1, 1, 10, 0, 0);
      endDate.setMonth(endDate.getMonth() + 1);
      endDate.setDate(endDate.getDate() - 1);

      contractProjects = await back.getProjectsByQuery({
        $and: [
          {
            "process.contract.first.date": { $gte: startDate }
          },
          {
            "process.contract.first.date": { $lte: endDate }
          },
        ]
      }, { selfMongo: selfCoreMongo });
      contractProjectsCliids = contractProjects.toNormal().map((p) => { return p.cliid });

      rows = await back.mongoRead(collection, {
        $and: [
          {
            date: { $gte: startDate }
          },
          {
            date: { $lte: endDate }
          },
        ]
      }, { selfMongo });

      rows.sort((a, b) => {
        return b.date.valueOf() - a.date.valueOf();
      });

      rowsCopy = equalJson(JSON.stringify(rows));
      rowsFlat = rowsCopy.map(({ cliids }) => { return cliids }).flat();

      whereQuery = rowToCliids(rows).concat(contractProjectsCliids);
      whereQuery = { $or: [ ...new Set(whereQuery) ].map((cliid) => { return { cliid } }) }

      allSendHistories = await selfMongo.db(db).collection(historyCollection).find({
        "curation.analytics.send": {
          $elemMatch: {
            date: { $gte: startDate }
          }
        }
      }).project({ manager: 1, "curation.analytics.send": 1, _id: 0 }).toArray();

      if (whereQuery["$or"].length > 0) {

        thisClients = (await back.getClientsByQuery(whereQuery, { selfMongo: selfCoreMongo })).toNormal();
        thisProjects = (await back.getProjectsByQuery(whereQuery, { selfMongo: selfCoreMongo })).toNormal();
        thisHistories = await selfMongo.db(db).collection(historyCollection).find(whereQuery).project({ cliid: 1, manager: 1, _id: 0 }).toArray();
        contractProjectsCopied = contractProjects.toNormal();

        managers = await back.setMemberObj({ getMode: true, selfMongo: selfCoreMongo });
        managers = managers.filter((member) => { return member.roles.includes("CX") }).map((member) => { return member.name });
        managers.push("미지정");
        managers.push("total");

        reports = [];
        for (let row of rows) {

          reportObject = {};
          reportObject.standard = row.date;

          // today stadard
          todayClients = row.cliids.map(({ cliid }) => { return thisClients.find((c) => { return c.cliid === cliid }) });
          for (let client of todayClients) {
            client.history = thisHistories.find((h) => { return h.cliid === client.cliid });
            client.project = thisProjects.find((p) => { return p.cliid === client.cliid });
            client.row = rowsFlat.find((c) => { return c.cliid === client.cliid });
          }

          // total standard
          targetRows = rowsCopy.filter((o) => { return o.date.valueOf() <= row.date.valueOf() });
          targetCliids = rowToCliids(targetRows);
          targetClients = targetCliids.map((cliid) => { return thisClients.find((c) => { return c.cliid === cliid }) });
          for (let client of targetClients) {
            client.history = thisHistories.find((h) => { return h.cliid === client.cliid });
            client.project = thisProjects.find((p) => { return p.cliid === client.cliid });
            client.row = rowsFlat.find((c) => { return c.cliid === client.cliid });
          }

          // month standard
          fromDate = new Date(row.date.getFullYear(), row.date.getMonth(), 1, 8, 0, 0);
          monthFromDate = new Date(JSON.stringify(fromDate).slice(1, -1));
          toDate = new Date(row.date.getFullYear(), row.date.getMonth() + 1, 1);
          monthRows = rowsCopy.filter((o) => {
            return (o.date.valueOf() > fromDate.valueOf() && o.date.valueOf() < toDate.valueOf()) && (o.date.valueOf() <= row.date.valueOf());
          });
          monthCliids = rowToCliids(monthRows);
          monthClients = monthCliids.map((cliid) => { return thisClients.find((c) => { return c.cliid === cliid }) });
          for (let client of monthClients) {
            client.history = thisHistories.find((h) => { return h.cliid === client.cliid });
            client.project = thisProjects.find((p) => { return p.cliid === client.cliid });
            client.row = rowsFlat.find((c) => { return c.cliid === client.cliid });
          }
          toDateStandard = new Date(JSON.stringify(row.date).slice(1, -1));
          toDateStandard.setHours(23);
          toDateStandard.setMinutes(59);
          toDateStandard.setSeconds(59);
          monthProjects = contractProjectsCopied.filter((obj) => {
            return (obj.process.contract.first.date.valueOf() > fromDate.valueOf() && obj.process.contract.first.date.valueOf() < toDate.valueOf()) && (obj.process.contract.first.date.valueOf() <= toDateStandard.valueOf());
          });
          for (let project of monthProjects) {
            project.history = thisHistories.find((h) => { return h.cliid === project.cliid });
          }

          totalProjects = contractProjectsCopied.filter((obj) => {
            return (obj.process.contract.first.date.valueOf() > startDate.valueOf() && obj.process.contract.first.date.valueOf() < toDate.valueOf()) && (obj.process.contract.first.date.valueOf() <= toDateStandard.valueOf());
          });
          for (let project of totalProjects) {
            project.history = thisHistories.find((h) => { return h.cliid === project.cliid });
          }

          // day clients
          reportObject.dayClients = [];
          for (let manager of managers) {
            if (manager === "total") {
              reportObject.dayClients.push({
                manager,
                value: row.cliids.length,
              })
            } else if (manager === "미지정") {
              reportObject.dayClients.push({
                manager,
                value: todayClients.filter((c) => { return !managers.includes(c.history.manager) }).length,
              })
            } else {
              reportObject.dayClients.push({
                manager,
                value: todayClients.filter((c) => { return c.history.manager === manager }).length,
              })
            }
          }

          // total clients
          reportObject.totalClients = [];
          for (let manager of managers) {
            if (manager === "total") {
              reportObject.totalClients.push({
                manager,
                value: targetCliids.length,
              })
            } else if (manager === "미지정") {
              reportObject.totalClients.push({
                manager,
                value: targetClients.filter((c) => { return !managers.includes(c.history.manager) }).length,
              })
            } else {
              reportObject.totalClients.push({
                manager,
                value: targetClients.filter((c) => { return c.history.manager === manager }).length,
              })
            }
          }

          // monthly clients
          reportObject.monthClients = [];
          for (let manager of managers) {
            if (manager === "total") {
              reportObject.monthClients.push({
                manager,
                value: monthCliids.length,
              })
            } else if (manager === "미지정") {
              reportObject.monthClients.push({
                manager,
                value: monthClients.filter((c) => { return !managers.includes(c.history.manager) }).length,
              })
            } else {
              reportObject.monthClients.push({
                manager,
                value: monthClients.filter((c) => { return c.history.manager === manager }).length,
              })
            }
          }

          // current clients
          currentClients = targetClients.filter((client) => {
            return client.requests.some(({ analytics }) => { return /^[응장]/gi.test(analytics.response.status) })
          });
          reportObject.currentClients = [];
          for (let manager of managers) {
            if (manager === "total") {
              reportObject.currentClients.push({
                manager,
                value: currentClients.length,
              })
            } else if (manager === "미지정") {
              reportObject.currentClients.push({
                manager,
                value: currentClients.filter((c) => { return !managers.includes(c.history.manager) }).length,
              })
            } else {
              reportObject.currentClients.push({
                manager,
                value: currentClients.filter((c) => { return c.history.manager === manager }).length,
              })
            }
          }

          // contract possible clients
          reportObject.contractPossible = [];
          for (let manager of managers) {
            if (manager === "total") {
              reportObject.contractPossible.push({
                manager,
                value: currentClients.filter((c) => { return c.requests[0].analytics.response.possible === "높음" }).length,
              })
            } else if (manager === "미지정") {
              reportObject.contractPossible.push({
                manager,
                value: currentClients.filter((c) => { return c.requests[0].analytics.response.possible === "높음" }).filter((c) => { return !managers.includes(c.history.manager) }).length,
              })
            } else {
              reportObject.contractPossible.push({
                manager,
                value: currentClients.filter((c) => { return c.requests[0].analytics.response.possible === "높음" }).filter((c) => { return c.history.manager === manager }).length,
              })
            }
          }

          // total contracts
          reportObject.totalContracts = [];
          for (let manager of managers) {
            if (manager === "total") {
              reportObject.totalContracts.push({
                manager,
                value: totalProjects.length,
              })
            } else if (manager === "미지정") {
              reportObject.totalContracts.push({
                manager,
                value: totalProjects.filter((p) => { return !managers.includes(p.history.manager) }).length,
              })
            } else {
              reportObject.totalContracts.push({
                manager,
                value: totalProjects.filter((p) => { return p.history.manager === manager }).length,
              })
            }
          }

          // month contracts
          reportObject.monthContracts = [];
          for (let manager of managers) {
            if (manager === "total") {
              reportObject.monthContracts.push({
                manager,
                value: monthProjects.length,
              })
            } else if (manager === "미지정") {
              reportObject.monthContracts.push({
                manager,
                value: monthProjects.filter((p) => { return !managers.includes(p.history.manager) }).length,
              })
            } else {
              reportObject.monthContracts.push({
                manager,
                value: monthProjects.filter((p) => { return p.history.manager === manager }).length,
              })
            }
          }

          // day proposal
          reportObject.dayProposals = [];
          for (let manager of managers) {
            if (manager === "total") {
              reportObject.dayProposals.push({
                manager,
                value: allSendHistories.map(({ curation }) => { return curation.analytics.send.filter((obj) => { return dateToString(obj.date) === dateToString(row.date) }) }).flat().filter((obj) => { return obj.page === proposalKeywords }).length,
              })
            } else if (manager === "미지정") {
              reportObject.dayProposals.push({
                manager,
                value: allSendHistories.filter((c) => { return !managers.includes(c.manager) }).map(({ curation }) => { return curation.analytics.send.filter((obj) => { return dateToString(obj.date) === dateToString(row.date) }) }).flat().filter((obj) => { return obj.page === proposalKeywords }).length,
              })
            } else {
              reportObject.dayProposals.push({
                manager,
                value: allSendHistories.filter((c) => { return c.manager === manager }).map(({ curation }) => { return curation.analytics.send.filter((obj) => { return dateToString(obj.date) === dateToString(row.date) }) }).flat().filter((obj) => { return obj.page === proposalKeywords }).length,
              })
            }
          }

          // month proposal
          reportObject.monthProposals = [];
          for (let manager of managers) {
            if (manager === "total") {
              reportObject.monthProposals.push({
                manager,
                value: allSendHistories.map(({ curation }) => { return curation.analytics.send.filter((obj) => { return obj.date.valueOf() >= monthFromDate.valueOf() && obj.date.valueOf() <= toDateStandard.valueOf() }) }).flat().filter((obj) => { return obj.page === proposalKeywords }).length,
              })
            } else if (manager === "미지정") {
              reportObject.monthProposals.push({
                manager,
                value: allSendHistories.filter((c) => { return !managers.includes(c.manager) }).map(({ curation }) => { return curation.analytics.send.filter((obj) => { return obj.date.valueOf() >= monthFromDate.valueOf() && obj.date.valueOf() <= toDateStandard.valueOf() }) }).flat().filter((obj) => { return obj.page === proposalKeywords }).length,
              })
            } else {
              reportObject.monthProposals.push({
                manager,
                value: allSendHistories.filter((c) => { return c.manager === manager }).map(({ curation }) => { return curation.analytics.send.filter((obj) => { return obj.date.valueOf() >= monthFromDate.valueOf() && obj.date.valueOf() <= toDateStandard.valueOf() }) }).flat().filter((obj) => { return obj.page === proposalKeywords }).length,
              })
            }
          }

          // total proposal
          reportObject.totalProposals = [];
          for (let manager of managers) {
            if (manager === "total") {
              reportObject.totalProposals.push({
                manager,
                value: allSendHistories.map(({ curation }) => { return curation.analytics.send.filter((obj) => { return obj.date.valueOf() >= startDate.valueOf() && obj.date.valueOf() <= toDateStandard.valueOf() }) }).flat().filter((obj) => { return obj.page === proposalKeywords }).length,
              })
            } else if (manager === "미지정") {
              reportObject.totalProposals.push({
                manager,
                value: allSendHistories.filter((c) => { return !managers.includes(c.manager) }).map(({ curation }) => { return curation.analytics.send.filter((obj) => { return obj.date.valueOf() >= startDate.valueOf() && obj.date.valueOf() <= toDateStandard.valueOf() }) }).flat().filter((obj) => { return obj.page === proposalKeywords }).length,
              })
            } else {
              reportObject.totalProposals.push({
                manager,
                value: allSendHistories.filter((c) => { return c.manager === manager }).map(({ curation }) => { return curation.analytics.send.filter((obj) => { return obj.date.valueOf() >= startDate.valueOf() && obj.date.valueOf() <= toDateStandard.valueOf() }) }).flat().filter((obj) => { return obj.page === proposalKeywords }).length,
              })
            }
          }

          reports.push(reportObject);
        }

        resultObj = { reports };
      } else {
        resultObj = { reports: [] };
      }

      res.send(JSON.stringify(resultObj));

    } catch (e) {
      await logger.error("Console 서버 문제 생김 (rou_post_dailySalesReport): " + e.message);
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_updateContentsStatus = function () {
  const instance = this;
  const back = this.back;
  const { equalJson, messageSend, dateToString, stringToDate, sleep } = this.mother;
  let obj = {};
  obj.link = [ "/updateContentsStatus" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.mode === undefined) {
        throw new Error("invalid post");
      }
      const selfMongo = instance.mongolocal;
      const { mode } = equalJson(req.body);
      const collection = "contentsStatus";
      let whereQuery, updateQuery;
      let rows;
      let resultObj;
      let dummy;
      let emptyObject;

      dummy = {
        conid: "",
        pid: "",
        complete: false,
        date: new Date(),
      };

      if (mode === "get") {
        ({ whereQuery } = equalJson(req.body));
        rows = await back.mongoRead(collection, whereQuery, { selfMongo });
        resultObj = rows;

      } else if (mode === "update") {
        ({ whereQuery, updateQuery } = equalJson(req.body));

        rows = await back.mongoRead(collection, whereQuery, { selfMongo });
        if (rows.length === 0) {
          emptyObject = equalJson(JSON.stringify(dummy));
          emptyObject.conid = updateQuery.conid;
          await back.mongoCreate(collection, emptyObject, { selfMongo });
          await sleep(300);
          await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo });
        } else {
          await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo });
        }
        resultObj = { message: "done" };

      } else {
        throw new Error("invalid mode");
      }

      res.send(JSON.stringify(resultObj));

    } catch (e) {
      await logger.error("Console 서버 문제 생김 (rou_post_updateContentsStatus): " + e.message);
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_proposalGeneration = function () {
  const instance = this;
  const back = this.back;
  const { equalJson, messageSend, dateToString, stringToDate, sleep } = this.mother;
  let obj = {};
  obj.link = [ "/proposalGeneration" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.desid === undefined) {
        throw new Error("invalid post");
      }
      const { desid } = equalJson(req.body);
      const selfMongo = instance.mongo;
      const collection = "project";
      const projects = await back.mongoPick(collection, [ { "proposal.detail": { $elemMatch: { desid } } }, { proid: 1, desid: 1, proposal: 1 } ], { selfMongo });
      let targetProposals;

      projects.sort((a, b) => { return b.proposal.date.valueOf() - a.proposal.date.valueOf() })
      targetProposals = projects.map((p) => { return p.proposal.detail }).flat().filter((o) => { return o.desid === desid });
      targetProposals = targetProposals.map(({ pictureSettings }) => { return JSON.stringify(pictureSettings) });
      targetProposals = [ ...new Set(targetProposals) ].map((str) => { return equalJson(str) });

      res.send(JSON.stringify(targetProposals));

    } catch (e) {
      await logger.error("Console 서버 문제 생김 (rou_post_proposalGeneration): " + e.message);
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_frontMemberParsing = function () {
  const instance = this;
  const back = this.back;
  const { equalJson, messageSend, dateToString, stringToDate, sleep } = this.mother;
  let obj = {};
  obj.link = [ "/frontMemberParsing" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.id === undefined || req.body.ip === undefined || req.body.href === undefined || req.body.mode === undefined) {
        throw new Error("invalid input => " + JSON.stringify(req.body, null, 2));
      }
      const { id, ip, href, mode } = equalJson(req.body);
      const selfMongo = instance.mongolocal;
      const collection = "frontMemberHistory";
      const members = instance.members;
      let json;
      let targetMember;
      let memberId, memberName;

      if (mode === "store") {

        targetMember = members.find((o) => { return o.ip.includes(ip) });
        if (targetMember !== undefined && targetMember !== null) {
          memberId = targetMember.id;
          memberName = targetMember.name;

          json = {
            date: new Date(),
            member: {
              memid: memberId,
              name: memberName,
            },
            data: {
              session: id,
              ip: ip,
              href: href,
            },
          };

          await back.mongoCreate(collection, json, { selfMongo });
        } else {
          json = { data: null };
        }

        res.send(JSON.stringify(json));

      } else {
        throw new Error("invalid mode");
      }

    } catch (e) {
      await logger.error("Console 서버 문제 생김 (rou_post_frontMemberParsing): " + e.message);
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_blackButtonsClick = function () {
  const instance = this;
  const address = this.address;
  const back = this.back;
  const { equalJson, messageSend, dateToString, stringToDate, sleep, setQueue, requestSystem } = this.mother;
  let obj = {};
  obj.link = [ "/blackButtonsClick" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.cliid === undefined || req.body.name === undefined || req.body.mode === undefined) {
        throw new Error("invalid input => " + JSON.stringify(req.body, null, 2));
      }
      const { cliid, name, mode } = equalJson(req.body);
      const selfCoreMongo = instance.mongo;
      const selfMongo = instance.mongolocal;
      const toNormal = true;
      const collection = "blackButtonsClick";
      const delta = Math.floor((1 + Math.random()) * 60 * 60 * 1000) - (10 * 60 * 1000);
      const generalPort = 3000;
      let proid, rows;
      let targetProposal;

      if (mode === "consulting") {
        await messageSend({ text: name + " 고객님(" + cliid + ")이 상담부터 원한다고 선택하셨어요!", channel: "#404_curation", voice: true });
        await back.mongoCreate(collection, {
          cliid,
          name,
          date: new Date(),
          mode,
        }, { selfMongo });
      } else {
        await messageSend({ text: name + " 고객님(" + cliid + ")이 추천부터 원한다고 선택하셨어요! 2시간 이내로(" + String(Math.floor((delta / 1000) / 60)) + "분 뒤에) 자동 추천서가 발송될 예정입니다!", channel: "#404_curation", voice: true });

        setTimeout(async () => {
          try {
            rows = await back.getProjectsByQuery({ cliid }, { selfMongo: selfCoreMongo, toNormal });
            while (rows.length === 0) {
              await sleep(10 * 60 * 1000);
              rows = await back.getProjectsByQuery({ cliid }, { selfMongo: selfCoreMongo, toNormal });
            }

            if (rows.length === 0) {
              throw new Error("cannot find proposal");
            }

            rows.sort((a, b) => { return b.proposal.date.valueOf() - a.proposal.date.valueOf() });
            [ targetProposal ] = rows;
            proid = targetProposal.proid;

            await requestSystem("https://" + address.officeinfo.host + ":" + String(3002) + "/createProposalDocument", { instant: true, proid }, { headers: { "Content-Type": "application/json", "origin": "https://" + address.frontinfo.host } });
            await messageSend({ text: name + " 고객님(" + cliid + ")께 자동 추천서를 전송하였어요!", channel: "#404_curation", voice: true });
            await messageSend({ text: name + " 고객님(" + cliid + ")께 자동 추천서를 전송하였어요!", channel: "#403_proposal", voice: false });

            await back.mongoCreate(collection, {
              cliid,
              name,
              date: new Date(),
              mode,
            }, { selfMongo });

          } catch(e) {
            console.log(e);
            await messageSend({ text: name + " 고객님(" + cliid + ")이 상담부터 원한다고 선택하셨어요!", channel: "#404_curation", voice: true });

            await back.mongoCreate(collection, {
              cliid,
              name,
              date: new Date(),
              mode: "consulting",
            }, { selfMongo });

            await logger.error("Console 서버 문제 생김 (rou_post_blackButtonsClick): " + e.message);
          }
        }, delta);
      }

      res.send(JSON.stringify({ message: "done" }));

    } catch (e) {
      await logger.error("Console 서버 문제 생김 (rou_post_blackButtonsClick): " + e.message);
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_justClientEvaluation = function () {
  const instance = this;
  const address = this.address;
  const back = this.back;
  const kakao = this.kakao;
  const { equalJson, messageSend, dateToString, stringToDate, sleep, setQueue, requestSystem, objectDeepCopy } = this.mother;
  let obj = {};
  obj.link = [ "/justClientEvaluation" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.mode === undefined) {
        throw new Error("invalid input => " + JSON.stringify(req.body, null, 2));
      }
      const { cliid, proid, mode } = equalJson(req.body);
      const selfCoreMongo = instance.mongo;
      const selfMongo = instance.mongolocal;
      const selfOfficeMongo = instance.mongolog;
      const collection = "clientEvaluationSendHistory";
      const collection2 = "clientEvaluation";
      let thisClient;
      let method;
      let name, phone;
      let projects;
      let rows;
      let target;
      let json;
      
      if (mode === "send") {

        [ thisClient ] = await back.mongoPick("client", [ { cliid }, { cliid: 1, name: 1, phone: 1 } ], { selfMongo: selfCoreMongo });
        ({ name, phone } = thisClient);
  
        projects = await back.mongoRead("project", { proid }, { selfMongo: selfCoreMongo });
        projects = projects.filter((p) => { return p.desid !== "" }).filter((p) => {
          return (/진행/gi.test(p.process.status) || /완료/gi.test(p.process.status));
        });
        method = "justClientEvaluation";

        if (projects.length > 0) {
          await kakao.sendTalk(method, name, phone, {
            client: name,
            host: address.frontinfo.host,
            path: "evaluation",
            proid
          });
          await messageSend({
            text: name + " 고객님께 서비스 평가 요청을 보냈어요!",
            channel: "#200_web",
            voice: false,
          });
          rows = await back.mongoRead(collection, { proid }, { selfMongo })
          if (rows.length === 0) {
            json = {
              proid,
              cliid,
              date: new Date(),
              send: [ { date: new Date() } ],
            };
            await back.mongoCreate(collection, json, { selfMongo });
          } else {
            [ target ] = rows;
            target.send.unshift({ date: new Date() });
            target.date = new Date();
            json = objectDeepCopy(target);
            await back.mongoDelete(collection, { proid }, { selfMongo });
            await back.mongoCreate(collection, json, { selfMongo });
          }
          res.send(JSON.stringify({ message: "success" }));
        } else {
          res.send(JSON.stringify({ message: "fail" }));
        }

      } else if (mode === "list" || mode === "get") {

        rows = await back.mongoRead(collection, { proid }, { selfMongo })
        if (rows.length === 0) {
          res.send(JSON.stringify({ data: null }));
        } else {
          res.send(JSON.stringify({ data: rows[0] }));
        }

      } else if (mode === "all") {

        rows = await back.mongoRead(collection, {}, { selfMongo })
        res.send(JSON.stringify(rows));

      } else if (mode === "store") {

        [ thisClient ] = await back.mongoPick("client", [ { cliid }, { cliid: 1, name: 1, phone: 1 } ], { selfMongo: selfCoreMongo });
        ({ name, phone } = thisClient);
  
        projects = await back.mongoRead("project", { proid }, { selfMongo: selfCoreMongo });
        projects = projects.filter((p) => { return p.desid !== "" }).filter((p) => {
          return (/진행/gi.test(p.process.status) || /완료/gi.test(p.process.status));
        });
        method = "justClientEvaluation";

        if (projects.length > 0) {
          rows = await back.mongoRead(collection, { proid }, { selfMongo })
          if (rows.length === 0) {
            json = {
              proid,
              cliid,
              date: new Date(),
              send: [ { date: new Date() } ],
            };
            await back.mongoCreate(collection, json, { selfMongo });
          } else {
            [ target ] = rows;
            target.send.unshift({ date: new Date() });
            target.date = new Date();
            json = objectDeepCopy(target);
            await back.mongoDelete(collection, { proid }, { selfMongo });
            await back.mongoCreate(collection, json, { selfMongo });
          }
          res.send(JSON.stringify({ message: "success" }));
        } else {
          res.send(JSON.stringify({ message: "fail" }));
        }

      } else if (mode === "result") {

        rows = await back.mongoRead(collection2, { proid }, { selfMongo: selfOfficeMongo })
        res.send(JSON.stringify({ data: rows.find((r) => { return r.proid === proid }) ? rows.find((r) => { return r.proid === proid }) : null }));

      } else if (mode === "resultAll") {

        rows = await back.mongoRead(collection2, {}, { selfMongo: selfOfficeMongo })
        res.send(JSON.stringify(rows));

      } else {
        throw new Error("invalid mode");
      }

    } catch (e) {
      await logger.error("Console 서버 문제 생김 (rou_post_justClientEvaluation): " + e.message);
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_cashReceipt = function () {
  const instance = this;
  const back = this.back;
  const bill = this.bill;
  const { equalJson, messageLog } = this.mother;
  let obj = {};
  obj.link = "/cashReceipt";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.json === undefined) {
        throw new Error("must be json");
      }
      const json = equalJson(req.body.json);
      const collection = "cashReceipt";
      const selfMongo = instance.mongolocal;
      let rows;

      rows = [];
      if (json.cashOut !== undefined) {
        const { cashOut: cashOut_raw } = json;
        for (let arr of cashOut_raw) {
          for (let obj of arr) {
            rows.push(obj);
          }
        }
      } else if (json.cashIn !== undefined) {
        const { cashIn: cashIn_raw } = json;
        for (let arr of cashIn_raw) {
          for (let obj of arr) {
            rows.push(obj);
          }
        }
      }

      bill.createBill(collection, rows, { selfMongo: selfMongo }).catch((err) => {
        console.log(err);
      });

      res.send(JSON.stringify({ message: "OK" }));
    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_post_cashReceipt): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error" }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_createStylingContract = function () {
  const instance = this;
  const back = this.back;
  const bill = this.bill;
  const kakao = this.kakao;
  const address = this.address;
  const { requestSystem, messageSend, dateToString, serviceParsing, autoComma } = this.mother;
  let obj = {};
  obj.link = "/createStylingContract";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.proid === undefined || req.body.contractName === undefined || req.body.contractAddress === undefined) {
        throw new Error("invaild post");
      }
      const { proid, contractName, contractAddress } = req.body;
      const rows = await back.mongoRead("stylingForm", { proid }, { selfMongo: instance.mongolocal });
      if (rows.length === 0) {
        const selfMongo = instance.mongo;
        const { officeinfo: { widsign: { id, key, endPoint } } } = address;
        const title = "2023디자인계약서_000고객님_주홈리에종_YYMMDD";
        const project = await back.getProjectById(proid, { selfMongo });
        const client = await back.getClientById(project.cliid, { selfMongo });
        const designer = await back.getDesignerById(project.desid, { selfMongo });
        const today = new Date();
        let url, requestNumber, proposalDate;
        let widsignRes, token, target, targetFormId, safeNum;
        let titleName, titleAddress, formTitle;
        let request, analytics;
        let tempArr;
        let map;
        let data;
        let todayYear, todayMonth ,todayDate;
        let delta;

        todayYear = String(today.getFullYear());
        todayMonth = String(today.getMonth() + 1);
        todayDate = String(today.getDate());

        proposalDate = project.proposal.date.valueOf();

        requestNumber = 0;
        for (let i = 0; i < client.requests.length; i++) {
          if (client.requests[i].request.timeline.valueOf() <= proposalDate) {
            requestNumber = i;
            break;
          }
        }

        ({ request, analytics } = client.toNormal().requests[requestNumber]);

        widsignRes = await requestSystem(endPoint + "/v2/token", {}, { method: "get", headers: { "x-api-id": id, "x-api-key": key } });

        if (widsignRes.data.result_code !== 200) {
          throw new Error("access token error");
        } else {
          token = widsignRes.data.access_token;
          num = 1;
          safeNum = 0;
          do {
            widsignRes = await requestSystem(endPoint + "/v2/form", { page: num, page_size: 30, title }, { method: "get", headers: { "x-api-key": key, "x-access-token": token } });
            target = widsignRes.data.result.filter((obj) => { return obj.title === title });
            num++;
            safeNum++;
            if (safeNum > 1000) {
              throw new Error("title name error");
            }
          } while (target.length === 0);

          [ { id: targetFormId } ] = target;

          titleName = client.name;
          if (contractName.trim() !== "") {
            titleName = contractName;
          }

          titleAddress = request.space.address;
          if (contractAddress.trim() !== "") {
            titleAddress = contractAddress;
          }

          tempArr = dateToString(today).split('-');
          formTitle = "2023디자인계약서_" + titleName + "고객님_주홈리에종_";
          formTitle = formTitle + tempArr[0].slice(2) + tempArr[1] + tempArr[2];
          map = [
            { id: "661380e13e7c67bec0da739e", value: todayYear },
            { id: "661380e13e7c67bec0da739f", value: todayMonth },
            { id: "661380e13e7c67bec0da73a0", value: todayDate },
            { id: "661380e13e7c67bec0da73a1", value: titleName === '' ? '-' : titleName },
            { id: "661380e13e7c67bec0da73a2", value: client.phone === '' ? '-' : client.phone },
            { id: "661380e13e7c67bec0da73a3", value: request.family === '' ? "알 수 없음" : request.family },
            { id: "661380e13e7c67bec0da73a4", value: titleAddress === '' ? '-' : titleAddress },
            { id: "661380e13e7c67bec0da73a5", value: request.budget + " (디자이너 논의 및 조정)" },
            { id: "661380e13e7c67bec0da73a6", value: request.space.contract === '' ? '-' : request.space.contract },
            { id: "661380e13e7c67bec0da73a7", value: "방 " + String(request.space.spec.room) + "개 / 화장실 " + String(request.space.spec.bathroom) + "개" },
            { id: "661380e13e7c67bec0da73a8", value: String(request.space.pyeong) },
            { id: "661380e13e7c67bec0da73a9", value: (/없/gi.test(dateToString(analytics.date.space.precheck)) ? '-' : dateToString(analytics.date.space.precheck)) },
            { id: "661380e13e7c67bec0da73aa", value: (/없/gi.test(dateToString(analytics.date.space.empty)) ? '-' : dateToString(analytics.date.space.empty)) },
            { id: "661380e13e7c67bec0da73ab", value: (/없/gi.test(dateToString(request.space.resident.expected)) ? '-' : dateToString(request.space.resident.expected)) },
          ];

          map.push({ id: "661380e13e7c67bec0da73c1", value: serviceParsing(project.service) });

          map.push({ id: "661380e13e7c67bec0da73ac", value: designer.designer });

          map.push({ id: "661380e13e7c67bec0da73ad", value: todayYear });
          map.push({ id: "661380e13e7c67bec0da73ae", value: todayMonth });
          map.push({ id: "661380e13e7c67bec0da73af", value: todayDate });

          map.push({ id: "661380e13e7c67bec0da73b0", value: String(project.process.contract.form.date.from.getFullYear()) });
          map.push({ id: "661380e13e7c67bec0da73b1", value: String(project.process.contract.form.date.from.getMonth() + 1) });
          map.push({ id: "661380e13e7c67bec0da73b2", value: String(project.process.contract.form.date.from.getDate()) });

          map.push({ id: "661380e13e7c67bec0da73b3", value: String(project.process.contract.form.date.to.getFullYear()) });
          map.push({ id: "661380e13e7c67bec0da73b4", value: String(project.process.contract.form.date.to.getMonth() + 1) });
          map.push({ id: "661380e13e7c67bec0da73b5", value: String(project.process.contract.form.date.to.getDate()) });

          delta = (((((project.process.contract.form.date.to.valueOf() - project.process.contract.form.date.from.valueOf()) / 1000) / 60) / 60) / 24) / 30;
          map.push({ id: "661380e13e7c67bec0da73b6", value: String(Math.round(delta * 10) / 10) });

          map.push({ id: "661380e13e7c67bec0da73b7", value: autoComma(project.process.contract.remain.calculation.amount.consumer) === '' ? '-' : autoComma(project.process.contract.remain.calculation.amount.consumer) });

          map.push({ id: "661380e13e7c67bec0da73b8", value: "박헌성" });
          map.push({ id: "661380e13e7c67bec0da73ba", value: "02-2039-2252" });
          map.push({ id: "661380e13e7c67bec0da73b9", value: "help@home-liaison.com" });

          map.push({ id: "661380e13e7c67bec0da73bc", value: todayYear });
          map.push({ id: "661380e13e7c67bec0da73be", value: todayMonth });
          map.push({ id: "661380e13e7c67bec0da73bd", value: todayDate });
          map.push({ id: "661380e13e7c67bec0da73bf", value: titleName === '' ? '-' : titleName });

          map.push({ id: "661380e13e7c67bec0da73c2", value: titleName === '' ? '-' : titleName });

          map.push({ id: "661380e13e7c67bec0da73c3", value: String(project.process.contract.form.date.from.getFullYear()) });
          map.push({ id: "661380e13e7c67bec0da73c5", value: String(project.process.contract.form.date.from.getMonth() + 1) });
          map.push({ id: "661380e13e7c67bec0da73c6", value: String(project.process.contract.form.date.from.getDate()) });

          map.push({ id: "661380e13e7c67bec0da73c4", value: String(project.process.contract.form.date.to.getFullYear()) });
          map.push({ id: "661380e13e7c67bec0da73c8", value: String(project.process.contract.form.date.to.getMonth() + 1) });
          map.push({ id: "661380e13e7c67bec0da73c7", value: String(project.process.contract.form.date.to.getDate()) });

          map.push({ id: "661380e13e7c67bec0da73c9", value: autoComma(project.process.contract.remain.calculation.amount.consumer) === '' ? '-' : autoComma(project.process.contract.remain.calculation.amount.consumer) });


          map.push({ id: "661380e13e7c67bec0da73cd", value: todayYear });
          map.push({ id: "661380e13e7c67bec0da73ce", value: todayMonth });
          map.push({ id: "661380e13e7c67bec0da73cf", value: todayDate });

          map.push({ id: "661380e13e7c67bec0da73ca", value: titleAddress === '' ? '-' : titleAddress });
          map.push({ id: "661380e13e7c67bec0da73cb", value: titleName === '' ? '-' : titleName });

          map.push({ id: "6613817dacb8f4637c000001", value: titleName === '' ? '-' : titleName });
          map.push({ id: "66138192acb8f4637c000002", value: todayYear });
          map.push({ id: "6613819aacb8f4637c000003", value: todayMonth });
          map.push({ id: "661381a7acb8f4637c000004", value: todayDate });

          map.push({ id: "661380e13e7c67bec0da73d3", value: todayYear });
          map.push({ id: "661380e13e7c67bec0da73d4", value: todayMonth });
          map.push({ id: "661380e13e7c67bec0da73d5", value: todayDate });

          map.push({ id: "661380e13e7c67bec0da73d0", value: titleAddress === '' ? '-' : titleAddress });
          map.push({ id: "661380e13e7c67bec0da73d1", value: titleName === '' ? '-' : titleName });

          data = {
            form_id: targetFormId,
            title: formTitle,
            send_type: "SAMETIME",
            auth_phone: "N",
            mail_title: "안녕하세요, " + client.name + " 고객님! 홈리에종입니다. 홈스타일링 계약서 보내드립니다.",
            receiver_list: [
              {
                name: client.name,
                email: client.email,
                mobile: client.phone.replace(/\-/gi, '')
              }
            ],
            items: map
          }

          widsignRes = await requestSystem(endPoint + "/v2/form/send", data, { headers: { "x-api-key": key, "x-access-token": token, "Content-Type": "application/json" } });

          await bill.createBill("stylingForm", [ {
            name: widsignRes.data.result[0].doc_name,
            id: widsignRes.data.result[0].receiver_meta_id,
            time: new Date(),
            requestNumber: requestNumber,
            cliid: client.cliid,
            proid: project.proid
          } ], { selfMongo: instance.mongolocal });

          await kakao.sendTalk("stylingForm", client.name, client.phone, { client: client.name });
          messageSend({ text: client.name + " 계약서를 작성하고 알림톡을 전송했어요!", channel: "#400_customer", voice: true }).catch((err) => {
            console.log(err);
          });

        }

        res.send(JSON.stringify({ message: "OK" }));
      } else {
        await messageSend({ text: "프로젝트 " + proid + "의 스타일링 계약서는 이미 만들어졌기에, 중복해서 만들지 않았습니다!", channel: "#400_customer", voice: true });
        res.send(JSON.stringify({ message: "ERROR" }));
      }
    } catch (e) {
      console.log(e);
      logger.error("Python 서버 문제 생김 (rou_post_createStylingContract): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "ERROR" }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_removeStylingContract = function () {
  const instance = this;
  const back = this.back;
  const bill = this.bill;
  const kakao = this.kakao;
  const address = this.address;
  const { requestSystem, messageSend, dateToString, serviceParsing, autoComma } = this.mother;
  let obj = {};
  obj.link = "/removeStylingContract";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.proid === undefined) {
        throw new Error("invaild post");
      }
      const { proid } = req.body;
      const rows = await back.mongoRead("stylingForm", { proid }, { selfMongo: instance.mongolocal });
      for (let i = 0; i < rows.length; i++) {
        await back.mongoDelete("stylingForm", { proid }, { selfMongo: instance.mongolocal });
      }
      res.send(JSON.stringify({ message: "OK" }));
    } catch (e) {
      console.log(e);
      logger.error("Python 서버 문제 생김 (rou_post_removeStylingContract): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "ERROR" }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_removeConstructContract = function () {
  const instance = this;
  const back = this.back;
  const bill = this.bill;
  const kakao = this.kakao;
  const address = this.address;
  const { requestSystem, messageSend, dateToString, serviceParsing, autoComma } = this.mother;
  let obj = {};
  obj.link = "/removeConstructContract";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.proid === undefined) {
        throw new Error("invaild post");
      }
      const { proid } = req.body;
      const rows = await back.mongoRead("stylingForm", { proid }, { selfMongo: instance.mongolocal });
      for (let i = 0; i < rows.length; i++) {
        await back.mongoDelete("constructForm", { proid }, { selfMongo: instance.mongolocal });
      }
      res.send(JSON.stringify({ message: "OK" }));
    } catch (e) {
      console.log(e);
      logger.error("Python 서버 문제 생김 (rou_post_removeConstructContract): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "ERROR" }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_createConstructContract = function () {
  const instance = this;
  const back = this.back;
  const bill = this.bill;
  const kakao = this.kakao;
  const address = this.address;
  const { requestSystem, messageSend, messageLog, dateToString, serviceParsing, autoComma } = this.mother;
  let obj = {};
  obj.link = "/createConstructContract";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.proid === undefined || req.body.summary === undefined) {
        throw new Error("invaild post");
      }
      const { proid, summary } = req.body;
      const { contractName, contractAddress, contractPhone } = summary;
      const rows = await back.mongoRead("constructForm", { proid }, { selfMongo: instance.mongolocal });

      if (rows.length === 0) {
        const selfMongo = instance.mongo;
        const { officeinfo: { widsign: { id, key, endPoint } } } = address;
        const title = "2023시공계약서_000고객님_주홈리에종_YYMMDD";
        const project = await back.getProjectById(proid, { selfMongo: instance.mongo });
        const client = await back.getClientById(project.cliid, { selfMongo: instance.mongo });
        const designer = await back.getDesignerById(project.desid, { selfMongo: instance.mongo });
        const today = new Date();
        const thisBills = await bill.getBillsByQuery({
          $and: [
            { "links.proid": project.proid },
            { "links.desid": project.desid },
            { "links.cliid": project.cliid },
            { "links.method": project.service.online ? "online" : "offline" }
          ]
        }, { selfMongo: instance.mongolocal });
        if (thisBills.length > 0) {
          const [ thisBill ] = thisBills;
          let url, requestNumber, proposalDate;
          let searchPoint0, searchPoint1;
          let tempArr;
          let projectNormal;
          let builders;
          let widsignRes, token, target, targetFormId, safeNum;
          let titleName, titleAddress, formTitle;
          let request, analytics;
          let map;
          let data;

          projectNormal = project.toNormal();

          if (projectNormal.process.design.construct.contract.partner !== "") {

            if (/_/gi.test(projectNormal.process.design.construct.contract.partner)) {
              tempArr = projectNormal.process.design.construct.contract.partner.split('_');
              searchPoint0 = tempArr[0].trim();
              searchPoint1 = tempArr[1].trim();
            } else {
              searchPoint0 = projectNormal.process.design.construct.contract.partner.trim();
              searchPoint1 = '';
            }

            builders = await back.getBuildersByQuery({
              $and: [
                { "builder": searchPoint0 },
                { "information.business.company": searchPoint1 }
              ]
            }, { selfMongo: instance.mongo });

            if (builders.length !== 0) {
              const [ builder ] = builders;

              await bill.constructInjection(thisBill.bilid, builder.buiid, {
                first: summary.first.amount,
                start: summary.start.amount,
                middle: summary.middle.amount,
                remain: summary.remain.amount,
              }, { selfMongo: instance.mongolocal, selfCoreMongo: instance.mongo });
              await messageLog(thisBill.bilid + " construct request, response set complete");

              proposalDate = project.proposal.date.valueOf();
              requestNumber = 0;
              for (let i = 0; i < client.requests.length; i++) {
                if (client.requests[i].request.timeline.valueOf() <= proposalDate) {
                  requestNumber = i;
                  break;
                }
              }

              ({ request, analytics } = client.toNormal().requests[requestNumber]);

              widsignRes = await requestSystem(endPoint + "/v2/token", {}, { method: "get", headers: { "x-api-id": id, "x-api-key": key } });

              if (widsignRes.data.result_code !== 200) {
                throw new Error("access token error");
              } else {
                token = widsignRes.data.access_token;
                num = 1;
                safeNum = 0;
                do {
                  widsignRes = await requestSystem(endPoint + "/v2/form", { page: num, page_size: 30, title }, { method: "get", headers: { "x-api-key": key, "x-access-token": token } });
                  target = widsignRes.data.result.filter((obj) => { return obj.title === title });
                  num++;
                  safeNum++;
                  if (safeNum > 1000) {
                    throw new Error("title name error");
                  }
                } while (target.length === 0);

                [ { id: targetFormId } ] = target;

                titleName = client.name;
                if (contractName.trim() !== "") {
                  titleName = contractName;
                }

                titleAddress = request.space.address;
                if (contractAddress.trim() !== "") {
                  titleAddress = contractAddress;
                }

                tempArr = dateToString(today).split('-');
                formTitle = "시공계약서_" + titleName + "고객님_주홈리에종_";
                formTitle = formTitle + tempArr[0].slice(2) + tempArr[1] + tempArr[2];
                map = [
                  { id: "651e7414fbcd2144a51009c2", value: titleName === '' ? '-' : titleName },
                  { id: "651e7414fbcd2144a51009c3", value: summary.name === '' ? '-' : summary.name },
                  { id: "651e7414fbcd2144a51009c4", value: summary.address === '' ? '-' : summary.address },
                  { id: "651e7414fbcd2144a51009c5", value: summary.date.start === '' ? '-' : summary.date.start.split('-')[0] },
                  { id: "651e7414fbcd2144a51009c7", value: summary.date.start === '' ? '-' : summary.date.start.split('-')[1] },
                  { id: "651e7414fbcd2144a51009c9", value: summary.date.start === '' ? '-' : summary.date.start.split('-')[2] },
                  { id: "651e7414fbcd2144a51009c6", value: summary.date.end === '' ? '-' : summary.date.end.split('-')[0] },
                  { id: "651e7414fbcd2144a51009c8", value: summary.date.end === '' ? '-' : summary.date.end.split('-')[1] },
                  { id: "651e7414fbcd2144a51009ca", value: summary.date.end === '' ? '-' : summary.date.end.split('-')[2] },
                  { id: "651e7414fbcd2144a51009cb", value: summary.hangul === '' ? '-' : summary.hangul.replace(/원$/, '') },
                  { id: "651e7414fbcd2144a51009cc", value: autoComma(summary.total) === '' ? '-' : autoComma(summary.total) },
                  { id: "651e7414fbcd2144a51009cd", value: String(summary.first.percentage) + '%' },
                  { id: "651e7414fbcd2144a51009d1", value: autoComma(summary.first.amount) === '' ? '-' : autoComma(summary.first.amount) },
                  { id: "651e7414fbcd2144a51009d5", value: summary.first.date === '' ? '-' : summary.first.date },
                  { id: "651e7414fbcd2144a51009d9", value: summary.first.etc === '' ? '-' : summary.first.etc },
                  { id: "651e7414fbcd2144a51009ce", value: String(summary.start.percentage) + '%' },
                  { id: "651e7414fbcd2144a51009d2", value: autoComma(summary.start.amount) === '' ? '-' : autoComma(summary.start.amount) },
                  { id: "651e7414fbcd2144a51009d6", value: summary.start.date === '' ? '-' : summary.start.date },
                  { id: "651e7414fbcd2144a51009da", value: summary.start.etc === '' ? '-' : summary.start.etc },
                  { id: "651e7414fbcd2144a51009cf", value: String(summary.middle.percentage) + '%' },
                  { id: "651e7414fbcd2144a51009d3", value: autoComma(summary.middle.amount) === '' ? '-' : autoComma(summary.middle.amount) },
                  { id: "651e7414fbcd2144a51009d7", value: summary.middle.date === '' ? '-' : summary.middle.date },
                  { id: "651e7414fbcd2144a51009db", value: summary.middle.etc === '' ? '-' : summary.middle.etc },
                  { id: "651e7414fbcd2144a51009d0", value: String(summary.remain.percentage) + '%' },
                  { id: "651e7414fbcd2144a51009d4", value: autoComma(summary.remain.amount) === '' ? '-' : autoComma(summary.remain.amount) },
                  { id: "651e7414fbcd2144a51009d8", value: summary.remain.date === '' ? '-' : summary.remain.date },
                  { id: "651e7414fbcd2144a51009dc", value: summary.remain.etc === '' ? '-' : summary.remain.etc },
                  { id: "651e7414fbcd2144a51009e0", value: titleName === '' ? '-' : titleName },
                  { id: "651e7414fbcd2144a51009de", value: contractPhone === '' ? '-' : contractPhone },
                  { id: "651e7414fbcd2144a51009df", value: contractAddress === '' ? '-' : contractAddress },
                ];

                data = {
                  form_id: targetFormId,
                  title: formTitle,
                  send_type: "SAMETIME",
                  auth_phone: "N",
                  mail_title: "안녕하세요, " + client.name + " 고객님! 홈리에종입니다. 시공 계약서 보내드립니다.",
                  receiver_list: [
                    {
                      name: client.name,
                      email: client.email,
                      mobile: client.phone.replace(/\-/gi, '')
                    }
                  ],
                  items: map
                }
                widsignRes = await requestSystem(endPoint + "/v2/form/send", data, { headers: { "x-api-key": key, "x-access-token": token, "Content-Type": "application/json" } });

                await bill.createBill("constructForm", [ {
                  name: widsignRes.data.result[0].doc_name,
                  id: widsignRes.data.result[0].receiver_meta_id,
                  time: new Date(),
                  requestNumber: requestNumber,
                  cliid: client.cliid,
                  proid: project.proid
                } ], { selfMongo: instance.mongolocal });

                await kakao.sendTalk("constructForm", client.name, client.phone, { client: client.name });
                messageSend({ text: client.name + " 시공 계약서를 작성하고 알림톡을 전송했어요!", channel: "#400_customer", voice: true }).then(() => {
                  return requestSystem("https://" + instance.address.officeinfo.host + ":3002/constructInteraction", {
                    mode: "chargeGuide",
                    proid: project.proid,
                    method: "first",
                  }, { headers: { "Content-Type": "application/json", "origin": instance.address.officeinfo.host } });
                }).catch((err) => {
                  console.log(err);
                });


                res.send(JSON.stringify({ message: "OK" }));
              }

            } else {
              await messageSend({ text: "프로젝트 " + proid + "에서 지정된 파트서 시공사가 등록된 파트너가 아니에요. 계약서를 쓸 수가 없어요.", channel: "#400_customer", voice: true });
              res.send(JSON.stringify({ message: "ERROR" }));
            }
          } else {
            await messageSend({ text: "프로젝트 " + proid + "는 파트서 시공사가 지정되지 않았어요. 계약서를 쓸 수가 없어요.", channel: "#400_customer", voice: true });
            res.send(JSON.stringify({ message: "ERROR" }));
          }
        } else {
          await messageSend({ text: "프로젝트 " + proid + "의 영수증을 찾을 수 없어요. 계약서를 쓸 수가 없어요.", channel: "#400_customer", voice: true });
          res.send(JSON.stringify({ message: "ERROR" }));
        }
      } else {
        console.log("styling form cancel : " + proid);
        await messageSend({ text: "프로젝트 " + proid + "의 시공 계약서는 이미 만들어졌기에, 중복해서 만들지 않았습니다!", channel: "#400_customer", voice: true });
        res.send(JSON.stringify({ message: "ERROR" }));
      }
    } catch (e) {
      console.log(e);
      logger.error("Python 서버 문제 생김 (rou_post_createConstructContract): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "ERROR" }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_createPartnershipContract = function () {
  const instance = this;
  const back = this.back;
  const bill = this.bill;
  const kakao = this.kakao;
  const address = this.address;
  const { requestSystem, messageSend, dateToString, serviceParsing, autoComma } = this.mother;
  let obj = {};
  obj.link = "/createPartnershipContract";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.aspid === undefined) {
        throw new Error("invaild post");
      }
      const { aspid } = req.body;
      const rows = await back.mongoRead("partnershipForm", { aspid }, { selfMongo: instance.mongolocal });
      if (rows.length === 0) {
        const selfMongo = instance.mongo;
        const { officeinfo: { widsign: { id, key, endPoint } } } = address;
        const title = "2023디자이너파트너십계약서_000디자이너_YYMMDD";
        const aspirant = await back.getAspirantById(aspid, { selfMongo });
        const today = new Date();
        const nextYear = new Date();
        nextYear.setFullYear(nextYear.getFullYear() + 1);
        nextYear.setDate(nextYear.getDate() - 1);
        let url, requestNumber, proposalDate;
        let widsignRes, token, target, targetFormId, safeNum;
        let titleName, titleAddress, formTitle;
        let tempArr;
        let map;
        let data;
        let todayYear, todayMonth ,todayDate;

        todayYear = String(today.getFullYear());
        todayMonth = String(today.getMonth() + 1);
        todayDate = String(today.getDate());

        widsignRes = await requestSystem(endPoint + "/v2/token", {}, { method: "get", headers: { "x-api-id": id, "x-api-key": key } });

        if (widsignRes.data.result_code !== 200) {
          throw new Error("access token error");
        } else {
          token = widsignRes.data.access_token;
          num = 1;
          safeNum = 0;
          do {
            widsignRes = await requestSystem(endPoint + "/v2/form", { page: num, page_size: 30, title }, { method: "get", headers: { "x-api-key": key, "x-access-token": token } });
            target = widsignRes.data.result.filter((obj) => { return obj.title === title });
            num++;
            safeNum++;
            if (safeNum > 1000) {
              throw new Error("title name error");
            }
          } while (target.length === 0);

          [ { id: targetFormId } ] = target;

          titleName = aspirant.designer;
          titleAddress = aspirant.address;

          tempArr = dateToString(today).split('-');
          formTitle = "2023디자이너파트너십계약서_" + titleName + "디자이너_";
          formTitle = formTitle + tempArr[0].slice(2) + tempArr[1] + tempArr[2];

          map = [
            { id: "6441eeed39f14f6a53000001", value: aspirant.designer },
            { id: "6441ef0e39f14f6a53000002", value: dateToString(today) + " ~ " + dateToString(nextYear) },
            { id: "6441ef2c39f14f6a53000003", value: aspirant.designer },
            { id: "6441ef4239f14f6a53000005", value: /프리/gi.test(aspirant.information.company.classification) ? "-" : aspirant.information.company.businessNumber },
            { id: "6441ef4b39f14f6a53000006", value: dateToString(aspirant.birth) },
            { id: "6441ef3f39f14f6a53000004", value: dateToString(today) },
            { id: "6441f02f39f14f6a53000009", value: titleAddress },
            { id: "6441f03e39f14f6a5300000a", value: /프리/gi.test(aspirant.information.company.classification) ? aspirant.designer : aspirant.information.company.name },
            { id: "6441f04b39f14f6a5300000b", value: /프리/gi.test(aspirant.information.company.classification) ? aspirant.designer : aspirant.information.company.representative },
          ];
          
          data = {
            form_id: targetFormId,
            title: formTitle,
            send_type: "SAMETIME",
            auth_phone: "N",
            mail_title: "안녕하세요, " + aspirant.designer + " 디자이너님! 홈리에종입니다. 디자이너 파트너십 계약서 보내드립니다.",
            receiver_list: [
              {
                name: aspirant.designer,
                email: aspirant.email,
                mobile: aspirant.phone.replace(/\-/gi, '')
              }
            ],
            items: map
          }

          widsignRes = await requestSystem(endPoint + "/v2/form/send", data, { headers: { "x-api-key": key, "x-access-token": token, "Content-Type": "application/json" } });

          await bill.createBill("partnershipForm", [ {
            name: widsignRes.data.result[0].doc_name,
            id: widsignRes.data.result[0].receiver_meta_id,
            time: new Date(),
            aspid: aspid,
          } ], { selfMongo: instance.mongolocal });

          messageSend({ text: aspirant.designer + " 파트너십 계약서를 작성하고 알림톡을 전송했어요!", channel: "#301_apply", voice: true }).catch((err) => {
            console.log(err);
          });

        }

        res.send(JSON.stringify({ message: "OK" }));
      } else {
        await messageSend({ text: "신청자 " + aspid + "의 파트너십 계약서는 이미 만들어졌기에, 중복해서 만들지 않았습니다!", channel: "#301_apply", voice: true });
        res.send(JSON.stringify({ message: "ERROR" }));
      }
    } catch (e) {
      console.log(e);
      logger.error("Python 서버 문제 생김 (rou_post_createPartnershipContract): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "ERROR" }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_createDesignerContract = function () {
  const instance = this;
  const back = this.back;
  const bill = this.bill;
  const kakao = this.kakao;
  const address = this.address;
  const { requestSystem, messageSend, dateToString, serviceParsing, autoComma } = this.mother;
  let obj = {};
  obj.link = "/createDesignerContract";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.aspid === undefined) {
        throw new Error("invaild post");
      }
      const { aspid } = req.body;
      const rows = await back.mongoRead("designerForm", { aspid }, { selfMongo: instance.mongolocal });
      if (rows.length === 0) {
        const selfMongo = instance.mongo;
        const { officeinfo: { widsign: { id, key, endPoint } } } = address;
        const title = "2023디자인서비스제휴계약서_000디자이너_YYMMDD";
        const aspirant = await back.getAspirantById(aspid, { selfMongo });
        const today = new Date();
        const nextYear = new Date();
        nextYear.setFullYear(nextYear.getFullYear() + 1);
        nextYear.setDate(nextYear.getDate() - 1);
        let url, requestNumber, proposalDate;
        let widsignRes, token, target, targetFormId, safeNum;
        let titleName, titleAddress, formTitle;
        let tempArr;
        let map;
        let data;
        let todayYear, todayMonth ,todayDate;
        let percentage;

        todayYear = String(today.getFullYear());
        todayMonth = String(today.getMonth() + 1);
        todayDate = String(today.getDate());

        percentage = 30;

        widsignRes = await requestSystem(endPoint + "/v2/token", {}, { method: "get", headers: { "x-api-id": id, "x-api-key": key } });

        if (widsignRes.data.result_code !== 200) {
          throw new Error("access token error");
        } else {
          token = widsignRes.data.access_token;
          num = 1;
          safeNum = 0;
          do {
            widsignRes = await requestSystem(endPoint + "/v2/form", { page: num, page_size: 30, title }, { method: "get", headers: { "x-api-key": key, "x-access-token": token } });
            target = widsignRes.data.result.filter((obj) => { return obj.title === title });
            num++;
            safeNum++;
            if (safeNum > 1000) {
              throw new Error("title name error");
            }
          } while (target.length === 0);

          [ { id: targetFormId } ] = target;

          titleName = aspirant.designer;
          titleAddress = aspirant.address;

          tempArr = dateToString(today).split('-');
          formTitle = "2023디자인서비스제휴계약서_" + titleName + "디자이너_";
          formTitle = formTitle + tempArr[0].slice(2) + tempArr[1] + tempArr[2];

          map = [
            { id: "6440dafad4a1496b82000005", value: aspirant.designer },
            { id: "6440db17d4a1496b82000006", value: todayYear },
            { id: "6440db23d4a1496b82000007", value: todayMonth },
            { id: "6440db3dd4a1496b82000009", value: todayDate },
            { id: "6440db8fd4a1496b8200000a", value: String(percentage) },
            { id: "6440dbc3d4a1496b8200000b", value: aspirant.information.account.to },
            { id: "6440dbe4d4a1496b8200000d", value: aspirant.information.account.bank },
            { id: "6440dc17d4a1496b8200000e", value: aspirant.information.account.number },
            { id: "6440dddad4a1496b82000011", value: titleAddress },
            { id: "6440ddebd4a1496b82000012", value: /프리/gi.test(aspirant.information.company.classification) ? aspirant.designer : aspirant.information.company.name },
            { id: "6440ddfbd4a1496b82000013", value: /프리/gi.test(aspirant.information.company.classification) ? aspirant.designer : aspirant.information.company.representative },
          ];

          data = {
            form_id: targetFormId,
            title: formTitle,
            send_type: "SAMETIME",
            auth_phone: "N",
            mail_title: "안녕하세요, " + aspirant.designer + " 디자이너님! 홈리에종입니다. 디자이너 서비스 제휴 계약서 보내드립니다.",
            receiver_list: [
              {
                name: aspirant.designer,
                email: aspirant.email,
                mobile: aspirant.phone.replace(/\-/gi, '')
              }
            ],
            items: map
          }

          widsignRes = await requestSystem(endPoint + "/v2/form/send", data, { headers: { "x-api-key": key, "x-access-token": token, "Content-Type": "application/json" } });

          await bill.createBill("designerForm", [ {
            name: widsignRes.data.result[0].doc_name,
            id: widsignRes.data.result[0].receiver_meta_id,
            time: new Date(),
            aspid: aspid,
          } ], { selfMongo: instance.mongolocal });

          messageSend({ text: aspirant.designer + " 서비스 제휴 계약서를 작성하고 알림톡을 전송했어요!", channel: "#301_apply", voice: true }).catch((err) => {
            console.log(err);
          });

        }

        res.send(JSON.stringify({ message: "OK" }));
      } else {
        await messageSend({ text: "신청자 " + aspid + "의 서비스 제휴 계약서는 이미 만들어졌기에, 중복해서 만들지 않았습니다!", channel: "#301_apply", voice: true });
        res.send(JSON.stringify({ message: "ERROR" }));
      }
    } catch (e) {
      console.log(e);
      logger.error("Python 서버 문제 생김 (rou_post_createDesignerContract): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "ERROR" }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_receiveConstructContract = function () {
  const instance = this;
  const back = this.back;
  const bill = this.bill;
  const kakao = this.kakao;
  const { equalJson, fileSystem, dateToString, autoComma, messageSend, requestSystem } = this.mother;
  let obj = {};
  obj.link = "/receiveConstructContract";
  obj.func = async function (req, res, logger) {
    try {
      if (req.body.json === undefined) {
        throw new Error("must be json");
      }
      const json = equalJson(req.body.json);
      const collection = "constructForm";
      const selfMongo = instance.mongolocal;
      let client;

      await bill.createBill(collection, [ json ], { selfMongo: instance.mongolocal });
      client = await back.getClientById(json.cliid, { selfMongo: instance.mongo });
      if (client !== null) {
        await kakao.sendTalk(collection, client.name, client.phone, { client: client.name });
        messageSend({ text: client.name + " 시공 계약서를 작성하고 알림톡을 전송했어요!", channel: "#400_customer", voice: true }).then(() => {
          return requestSystem("https://" + instance.address.officeinfo.host + ":3002/constructInteraction", {
            mode: "chargeGuide",
            proid: json.proid,
            method: "first",
          }, { headers: { "Content-Type": "application/json", "origin": instance.address.officeinfo.host } });
        }).catch((err) => {
          console.log(err);
        });

      }

      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send(JSON.stringify({ message: "OK" }));
    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_post_receiveConstructContract): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_constructAmountSync = function () {
  const instance = this;
  const back = this.back;
  const bill = this.bill;
  const address = this.address;
  const { equalJson, messageSend, messageLog } = this.mother;
  let obj = {};
  obj.link = "/constructAmountSync";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.proid === undefined || req.body.cliid === undefined || req.body.desid === undefined || req.body.method === undefined) {
        throw new Error("invaild post");
      }
      const { proid, cliid, desid, method } = equalJson(req.body);
      const find0 = "시공 잔금";
      const findFirst = "시공 계약금";
      const findStart = "시공 착수금";
      const findMiddle = "시공 중도금";
      const findRemain = "시공 잔금";
      const find1 = "시공";
      let bills, bilid, tempIndex, targetIndex, targetBill;
      let itemIndex;
      let whereQuery, updateQuery;

      bills = await bill.getBillsByQuery({
        $and: [
          { "links.proid": proid },
          { "links.cliid": cliid },
          { "links.desid": desid },
          { "links.method": method },
        ]
      }, { selfMongo: instance.mongolocal });
      if (bills.length > 0) {
        bilid = null;
        targetBill = null;
        targetIndex = -1;
        for (let i = 0; i < bills.length; i++) {
          tempIndex = bills[i].requests.findIndex((obj) => {
            return (new RegExp(find0, "gi")).test(obj.name);
          });
          if (tempIndex !== -1) {
            bilid = bills[i].bilid;
            targetBill = bills[i];
            targetIndex = tempIndex;
            break;
          }
        }

        if (bilid !== null) {
          if (req.body.amount !== undefined) {
            const { amount: { supply, vat, consumer } } = equalJson(req.body);

            if (targetIndex !== -1) {
              itemIndex = -1;
              for (let i = 0; i < targetBill.requests[targetIndex].items.length; i++) {
                if ((new RegExp(find1, "gi")).test(targetBill.requests[targetIndex].items[i].name)) {
                  itemIndex = i;
                  break;
                }
              }
              whereQuery = { bilid };
              updateQuery = {};
              updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".unit.price"] = supply;
              updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".amount.supply"] = supply;
              updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".amount.vat"] = vat;
              updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".amount.consumer"] = consumer;
              await bill.updateBill([ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });
            }

          } else {
            const { first, start, middle, remain } = equalJson(req.body);

            whereQuery = { bilid };
            updateQuery = {};

            targetIndex = targetBill.requests.findIndex((obj) => {
              return (new RegExp(findFirst, "gi")).test(obj.name);
            });
            if (targetIndex !== -1) {
              itemIndex = -1;
              for (let i = 0; i < targetBill.requests[targetIndex].items.length; i++) {
                if ((new RegExp(find1, "gi")).test(targetBill.requests[targetIndex].items[i].name)) {
                  itemIndex = i;
                  break;
                }
              }
              updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".unit.price"] = first.supply;
              updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".amount.supply"] = first.supply;
              updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".amount.vat"] = first.vat;
              updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".amount.consumer"] = first.consumer;
            }



            targetIndex = targetBill.requests.findIndex((obj) => {
              return (new RegExp(findStart, "gi")).test(obj.name);
            });
            if (targetIndex !== -1) {
              itemIndex = -1;
              for (let i = 0; i < targetBill.requests[targetIndex].items.length; i++) {
                if ((new RegExp(find1, "gi")).test(targetBill.requests[targetIndex].items[i].name)) {
                  itemIndex = i;
                  break;
                }
              }
              updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".unit.price"] = start.supply;
              updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".amount.supply"] = start.supply;
              updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".amount.vat"] = start.vat;
              updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".amount.consumer"] = start.consumer;
            }



            targetIndex = targetBill.requests.findIndex((obj) => {
              return (new RegExp(findMiddle, "gi")).test(obj.name);
            });
            if (targetIndex !== -1) {
              itemIndex = -1;
              for (let i = 0; i < targetBill.requests[targetIndex].items.length; i++) {
                if ((new RegExp(find1, "gi")).test(targetBill.requests[targetIndex].items[i].name)) {
                  itemIndex = i;
                  break;
                }
              }
              updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".unit.price"] = middle.supply;
              updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".amount.supply"] = middle.supply;
              updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".amount.vat"] = middle.vat;
              updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".amount.consumer"] = middle.consumer;
            }



            targetIndex = targetBill.requests.findIndex((obj) => {
              return (new RegExp(findRemain, "gi")).test(obj.name);
            });
            if (targetIndex !== -1) {
              itemIndex = -1;
              for (let i = 0; i < targetBill.requests[targetIndex].items.length; i++) {
                if ((new RegExp(find1, "gi")).test(targetBill.requests[targetIndex].items[i].name)) {
                  itemIndex = i;
                  break;
                }
              }
              updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".unit.price"] = remain.supply;
              updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".amount.supply"] = remain.supply;
              updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".amount.vat"] = remain.vat;
              updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".amount.consumer"] = remain.consumer;
            }

            await bill.updateBill([ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });
          }

        }
      }

      res.send(JSON.stringify({ message: "success" }));
    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_post_constructAmountSync): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_stylingAmountSync = function () {
  const instance = this;
  const back = this.back;
  const bill = this.bill;
  const address = this.address;
  const { equalJson, messageSend, messageLog } = this.mother;
  let obj = {};
  obj.link = "/stylingAmountSync";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.proid === undefined) {
        throw new Error("invaild post");
      }
      const { proid } = equalJson(req.body);
      const find0 = "홈리에종 잔금";
      const find1 = "디자인비";
      const emptyDateValue = (new Date(2000, 0, 1)).valueOf();
      let bills, bilid, tempIndex, targetIndex, targetBill;
      let itemIndex;
      let whereQuery, updateQuery;
      let project;
      let supply;
      let vat;
      let consumer;
      let firstTargetIndex, firstItemIndex;
      let firstConsumer;
      let firstVat;
      let firstSupply;
      let firstIndex;
      let remainIndex;


      project = await back.getProjectById(proid, { selfMongo: instance.mongo });
      if (project === null) {
        throw new Error("invaild post");
      }

      bills = await bill.getBillsByQuery({
        $and: [
          { "links.proid": proid },
          { "links.cliid": project.cliid },
          { "links.desid": project.desid },
          { "links.method": (project.service.online ? "online" : "offline") },
        ]
      }, { selfMongo: instance.mongolocal });
      if (bills.length === 0) {
        throw new Error("cannot find bill");
      }

      bilid = null;
      targetBill = null;
      targetIndex = -1;
      for (let i = 0; i < bills.length; i++) {
        tempIndex = bills[i].requests.findIndex((obj) => {
          return (new RegExp(find0, "gi")).test(obj.name);
        });
        if (tempIndex !== -1) {
          bilid = bills[i].bilid;
          targetBill = bills[i];
          targetIndex = tempIndex;
          break;
        }
      }

      consumer = Math.floor(project.process.contract.remain.calculation.amount.consumer - project.process.contract.first.calculation.amount);
      vat = Math.floor(consumer / 11);
      supply = Math.floor(consumer - vat);

      firstConsumer = Math.floor(project.process.contract.first.calculation.amount);
      firstVat = Math.floor(firstConsumer / 11);
      firstSupply = Math.floor(firstConsumer - firstVat);


      itemIndex = -1;
      for (let i = 0; i < targetBill.requests[targetIndex].items.length; i++) {
        if ((new RegExp(find1, "gi")).test(targetBill.requests[targetIndex].items[i].name)) {
          itemIndex = i;
          break;
        }
      }

      firstTargetIndex = -1;
      firstItemIndex = -1;
      for (let i = 0; i < targetBill.requests.length; i++) {
        if (/홈리에종 계약금/gi.test(targetBill.requests[i].name)) {
          firstTargetIndex = i;
          break;
        }
      }

      for (let i = 0; i < targetBill.requests[firstTargetIndex].items.length; i++) {
        if (/디자인비/gi.test(targetBill.requests[firstTargetIndex].items[i].name)) {
          firstItemIndex = i;
          break;
        }
      }


      whereQuery = { bilid };
      updateQuery = {};

      if (firstTargetIndex !== -1 && firstItemIndex !== -1) {
        updateQuery["requests." + String(firstTargetIndex) + ".items." + String(firstItemIndex) + ".unit.price"] = firstSupply;
        updateQuery["requests." + String(firstTargetIndex) + ".items." + String(firstItemIndex) + ".amount.supply"] = firstSupply;
        updateQuery["requests." + String(firstTargetIndex) + ".items." + String(firstItemIndex) + ".amount.vat"] = firstVat;
        updateQuery["requests." + String(firstTargetIndex) + ".items." + String(firstItemIndex) + ".amount.consumer"] = firstConsumer;
      }

      updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".unit.price"] = supply;
      updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".amount.supply"] = supply;
      updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".amount.vat"] = vat;
      updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".amount.consumer"] = consumer;


      remainIndex = 0;
      firstIndex = 0;
      for (let i = 0; i < targetBill.responses.length; i++) {
        if (/홈리에종 잔금/gi.test(targetBill.responses[i].name)) {
          remainIndex = i;
        }
        if (/홈리에종 선금/gi.test(targetBill.responses[i].name)) {
          firstIndex = i;
        }
      }

      updateQuery["responses." + String(firstIndex) + ".items.0.unit.price"] = Math.floor(project.process.calculation.payments.first.amount)
      updateQuery["responses." + String(firstIndex) + ".items.0.amount.pure"] = Math.floor(project.process.calculation.payments.first.amount)
      updateQuery["responses." + String(firstIndex) + ".items.0.amount.commission"] = Math.floor((project.process.contract.remain.calculation.amount.supply - project.process.calculation.payments.totalAmount) / 2)

      updateQuery["responses." + String(remainIndex) + ".items.0.unit.price"] = Math.floor(project.process.calculation.payments.remain.amount)
      updateQuery["responses." + String(remainIndex) + ".items.0.amount.pure"] = Math.floor(project.process.calculation.payments.remain.amount)
      updateQuery["responses." + String(remainIndex) + ".items.0.amount.commission"] = Math.floor((project.process.contract.remain.calculation.amount.supply - project.process.calculation.payments.totalAmount) / 2)


      if (project.process.calculation.payments.first.date.valueOf() > emptyDateValue) {
        updateQuery["responses." + String(firstIndex) + ".pay"] = [
          {
            date: project.process.calculation.payments.first.date,
            amount: Math.floor(project.process.calculation.payments.first.amount),
            oid: ""
          }
        ]
        updateQuery["responses." + String(firstIndex) + ".proofs"] = [
          {
            date: project.process.calculation.payments.first.date,
            method: "계좌 이체",
            proof: project.process.calculation.info.proof,
            to: project.process.calculation.info.to,
          }
        ]
      }

      if (project.process.calculation.payments.first.cancel.valueOf() > emptyDateValue) {
        updateQuery["responses." + String(firstIndex) + ".cancel"] = [
          {
            date: project.process.calculation.payments.first.cancel,
            amount: Math.floor(project.process.calculation.payments.first.refund),
            oid: ""
          }
        ]
      }

      if (project.process.calculation.payments.remain.date.valueOf() > emptyDateValue) {
        updateQuery["responses." + String(remainIndex) + ".pay"] = [
          {
            date: project.process.calculation.payments.remain.date,
            amount: Math.floor(project.process.calculation.payments.remain.amount),
            oid: ""
          }
        ]
        updateQuery["responses." + String(remainIndex) + ".proofs"] = [
          {
            date: project.process.calculation.payments.remain.date,
            method: "계좌 이체",
            proof: project.process.calculation.info.proof,
            to: project.process.calculation.info.to,
          }
        ]
      }

      if (project.process.calculation.payments.remain.cancel.valueOf() > emptyDateValue) {
        updateQuery["responses." + String(remainIndex) + ".cancel"] = [
          {
            date: project.process.calculation.payments.remain.cancel,
            amount: Math.floor(project.process.calculation.payments.remain.refund),
            oid: ""
          }
        ]
      }

      console.log(whereQuery, updateQuery);

      await bill.updateBill([ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });

      res.send(JSON.stringify({ message: "success" }));
    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_post_stylingAmountSync): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_smsParsing = function () {
  const instance = this;
  const back = this.back;
  const bill = this.bill;
  const { equalJson, messageLog, messageSend, autoComma, requestSystem, sleep } = this.mother;
  const collection = "accountTransfer";
  const designerCollection = "designerTransfer";
  const standardDay = 7;
  let obj = {};
  obj.link = "/smsParsing";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.date === undefined || req.body.amount === undefined || req.body.name === undefined) {
        throw new Error("invaild post");
      }
      const selfMongo = instance.mongolocal;
      const { date, amount, name } = equalJson(req.body);
      const errorMessage = "뭔가 은행 문자가 왔는데 찾을 수 없음 : " + name + " " + autoComma(amount) + "원";
      const ignoreMessage = "무시하는 리스트에 포함된 은행 문자 왔음 : " + name + " " + autoComma(amount) + "원";
      const ignoreList = [
        "KG이니시스",
      ];
      let rows, ago, target, rows2;
      let target2;
      let whereQuery;
      let updateQuery;
      let thisProject;
      let thisClient;

      if (!ignoreList.includes(name.trim())) {
        ago = new Date();
        ago.setDate(ago.getDate() - (standardDay * 2));

        target = null;
        rows = await back.mongoRead(collection, { amount }, { selfMongo });
        if (rows.length > 0) {
          rows.sort((a, b) => { return b.date.valueOf() - a.date.valueOf(); });
          rows = rows.filter((obj) => {
            return obj.date.valueOf() >= ago.valueOf();
          }).filter((obj) => {
            return (new RegExp(obj.name, "gi")).test(name);
          });
          if (rows.length > 0) {
            if (rows.length === 1) {
              [ target ] = rows;
            } else {
              rows2 = rows.filter((obj) => {
                return obj.name.trim() === name.trim();
              });
              if (rows2.length > 0) {
                [ target ] = rows2;
              } else {
                [ target ] = rows;
              }
            }
          }
        }

        if (target !== null) {

          await sleep(500);

          const { phone, amount, requestNumber } = target;

          target.accountInfo.requestNumber = requestNumber;
          messageSend(`${name} 고객님이 ${autoComma(amount)}원을 계좌에 입금하여 주셨어요.`, "#700_operation", (target === null)).catch((err) => { throw new Error(err.message); });

          await requestSystem("https://" + instance.address.officeinfo.host + ":3002/webHookVAccount", target.accountInfo, {
            headers: { "Content-Type": "application/json" }
          });
          logger.log("현금 영수증 관련 핸드폰 번호 감지 => " + phone).catch((e) => { console.log(e); });
          if (/^010/.test(phone)) {
            requestSystem("https://" + instance.address.officeinfo.ghost.host + ":" + String(3000) + "/issueCashReceipt", { amount: Number(amount), phone }, { headers: { "Content-Type": "application/json" } }).then(() => {
              return messageSend(`${name} 고객님의 현금 영수증을 발행하였습니다!\n번호 : ${phone}\n가격 : ${autoComma(amount)}원`, "#700_operation", false);
            }).catch((err) => {
              logger.error("Python 서버 문제 생김 (rou_post_smsParsing): " + err.message).catch((e) => { console.log(e); });
              throw new Error(err.message);
            });
          }

        } else {

          target2 = null;
          rows = await back.mongoRead(designerCollection, { amount }, { selfMongo });
          if (rows.length > 0) {
            rows.sort((a, b) => { return b.date.valueOf() - a.date.valueOf(); });
            rows = rows.filter((obj) => {
              return obj.date.valueOf() >= ago.valueOf();
            }).filter((obj) => {
              return (new RegExp(obj.name, "gi")).test(name);
            }).filter((obj) => {
              return obj.complete === 0;
            });
            if (rows.length > 0) {
              if (rows.length === 1) {
                [ target2 ] = rows;
              } else {
                rows2 = rows.filter((obj) => {
                  return obj.name.trim() === name.trim();
                });
                if (rows2.length > 0) {
                  [ target2 ] = rows2;
                } else {
                  [ target2 ] = rows;
                }
              }
            }
          }

          if (target2 !== null) {

            if (/촬영/gi.test(target2.goodname)) {

              thisProject = await back.getProjectById(target2.proid, { selfMongo: instance.mongo });
              thisClient = await back.getClientById(target2.cliid, { selfMongo: instance.mongo });

              messageSend(`${target2.name} 실장님이 계좌 이체로 ${thisClient.name} 고객님 현장의 ${target2.goodname}를 결제하셨습니다.`, "#301_console", true).catch((err) => { throw new Error(err.message); });
              messageSend(`${target2.name} 실장님이 계좌 이체로 ${thisClient.name} 고객님 현장의 ${target2.goodname}를 결제하셨습니다.`, "#700_operation", true).catch((err) => { throw new Error(err.message); });
              
              whereQuery = { proid: target2.proid };
              updateQuery = {};
              updateQuery["contents.payment.status"] = "결제 완료";
              updateQuery["contents.payment.date"] = new Date();
              updateQuery["contents.payment.calculation.amount"] = amount;
              updateQuery["contents.payment.calculation.info.method"] = "계좌 이체";
              if (/프리/gi.test(thisProject.process.calculation.method) || /간이/gi.test(thisProject.process.calculation.method)) {
                updateQuery["contents.payment.calculation.info.proof"] = "현금영수증";
              } else {
                updateQuery["contents.payment.calculation.info.proof"] = "세금계산서";
              }
              updateQuery["contents.payment.calculation.info.to"] = target2.name;
              await back.updateProject([ whereQuery, updateQuery ], { selfMongo: instance.mongo });

              whereQuery = { proid: target2.proid, goodname: target2.goodname };
              updateQuery = {};
              updateQuery["complete"] = 1;
              await selfMongo.db("miro81").collection(designerCollection).updateMany(whereQuery, { $set: updateQuery });

            } else {
              messageSend(`${name} 고객님이 ${autoComma(amount)}원을 계좌에 입금하여 주셨어요.`, "#700_operation", (target === null)).catch((err) => { throw new Error(err.message); });
              logger.alert(errorMessage).catch((e) => { console.log(e); });
            }

          } else {
            messageSend(`${name} 고객님이 ${autoComma(amount)}원을 계좌에 입금하여 주셨어요.`, "#700_operation", (target === null)).catch((err) => { throw new Error(err.message); });
            logger.alert(errorMessage).catch((e) => { console.log(e); });
          }

        }
      } else {
        logger.log(ignoreMessage).catch((e) => { console.log(e); });
      }

      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_post_smsParsing): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ message: "error" }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_accountTimeSet = function () {
  const instance = this;
  const back = this.back;
  const bill = this.bill;
  const { equalJson, messageLog, messageSend, autoComma } = this.mother;
  const collection = "accountTransfer";
  let obj = {};
  obj.link = "/accountTimeSet";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.amount === undefined || req.body.name === undefined) {
        throw new Error("invaild post");
      }
      const selfMongo = instance.mongolocal;
      const { amount, name } = equalJson(req.body);
      let rows, result;

      messageSend(`${name} 고객님이 계좌에 입금을 위한 안내를 받으셨어요. 아직 입금한 건 아니에요.`, "#700_operation", true).catch((err) => { throw new Error(err.message); });
      await back.mongoCreate(collection, equalJson(req.body), { selfMongo });

      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_post_accountTimeSet): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ message: "error" }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_designerTransfer = function () {
  const instance = this;
  const back = this.back;
  const bill = this.bill;
  const kakao = this.kakao;
  const { equalJson, messageLog, messageSend, autoComma } = this.mother;
  const collection = "designerTransfer";
  let obj = {};
  obj.link = "/designerTransfer";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.designer === undefined || req.body.desid === undefined || req.body.body === undefined) {
        throw new Error("invaild post");
      }
      const selfMongo = instance.mongolocal;
      const { designer, desid, body } = equalJson(req.body);
      const thisDesigner = await back.getDesignerById(desid, { selfMongo: instance.mongo });

      messageSend(`${designer} 실장님이 ${body.goodname} 결제를 위해 계좌에 입금을 위한 안내를 받으셨어요. 아직 입금한 건 아니에요.`, "#700_operation", true).catch((err) => { throw new Error(err.message); });

      kakao.sendTalk("designerAccount", designer, thisDesigner.information.phone, {
        designer,
        goodName: body.goodname,
        bankName: "기업",
        account: "049-085567-04-022",
        to: designer,
        amount: autoComma(body.amount),
      }).catch((err) => {
        console.log(err);
      });

      await back.mongoCreate(collection, body, { selfMongo });

      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_post_designerTransfer): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ message: "error" }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_accountTimeUpdate = function () {
  const instance = this;
  const back = this.back;
  const bill = this.bill;
  const { equalJson, messageLog, messageSend, autoComma } = this.mother;
  const collection = "accountTransfer";
  let obj = {};
  obj.link = "/accountTimeUpdate";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const selfMongo = instance.mongolocal;
      const { whereQuery, updateQuery, name, phone } = equalJson(req.body);

      logger.log(`증빙 번호 업데이트 감지 => \n${JSON.stringify(whereQuery, null, 2)}\n${JSON.stringify(updateQuery, null, 2)}`).catch((err) => { throw new Error(err.message); });

      if (/^010/.test(phone)) {
        // pass
      } else {
        await messageSend({ text: `${name} 고객님이 ${phone} 번호로 세금 계산서 신청을 하셨습니다!`, channel: "#700_operation", voice: true });
      }
      await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo });

      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_post_accountTimeUpdate): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ message: "error" }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_createStylingBill = function () {
  const instance = this;
  const back = this.back;
  const bill = this.bill;
  let obj = {};
  obj.link = "/createStylingBill";
  obj.func = async function (req, res, logger) {
    try {
      if (req.body.proid === undefined) {
        throw new Error("invaild post, must be { proid }");
      }
      const { proid } = req.body;
      let option, bilidArr;
      option = { selfCoreMongo: instance.mongo, selfMongo: instance.mongolocal };
      if (req.body.desid !== undefined) {
        option.forceDesid = req.body.desid;
      }
      bilidArr = await bill.createStylingBill(proid, option);
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send(JSON.stringify(bilidArr));
    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_post_createStylingBill): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_generalBill = function () {
  const instance = this;
  const back = this.back;
  const bill = this.bill;
  const { equalJson, fileSystem } = this.mother;
  let obj = {};
  obj.link = "/generalBill";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.mode === undefined) {
        throw new Error("must be mode => [ create, read, update, delete, sse ]");
      }
      const collection = "generalBill";
      const { mode } = req.body;
      let selfMongo, result;
      let whereQuery, updateQuery;
      let option;

      selfMongo = instance.mongolocal;

      if (mode === "read") {
        if (req.body.whereQuery === undefined) {
          throw new Error("must be whereQuery");
        }
        whereQuery = equalJson(req.body.whereQuery);
        option = { selfMongo };
        if (req.body.limit !== undefined && !Number.isNaN(Number(req.body.limit))) {
          option.limit = Number(req.body.limit);
        }
        result = await bill.getBillsByQuery(whereQuery, option);

      } else if (mode === "update") {

        if (req.body.whereQuery === undefined || req.body.updateQuery === undefined) {
          throw new Error("must be whereQuery, updateQuery");
        }
        ({ whereQuery, updateQuery } = equalJson(req.body));
        await bill.updateBill([ whereQuery, updateQuery ], { selfMongo });
        result = { message: "success" };

      } else {
        throw new Error("must be mode => [ read, update ]");
      }

      res.send(JSON.stringify(result));
    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_post_generalBill): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.sync_paymentProject = async function (bilid, requestNumber, data, amount, proofs, inisis, needs, logger) {
  const instance = this;
  const back = this.back;
  const bill = this.bill;
  const { equalJson, autoComma, requestSystem, messageSend } = this.mother;
  try {
    const { thisBill, client, designer, project, proposal } = needs;
    const { cliid } = client;
    const { desid } = designer;
    const { proid } = project;
    let projectQuery;
    let pureDesignFee;
    let vat, consumer;
    let classification, percentage;
    let businessMethod;
    let bankName, bankTo;
    let calculate;
    let discount;
    let thisProposal;
    let thisMethod;
    let thisFeeObject;
    let billsDuplication;

    if (/홈리에종 계약금/gi.test(data.goodName.trim()) || /홈리에종 잔금/gi.test(data.goodName.trim())) {
      projectQuery = {};
      if (proposal !== undefined && proposal !== null) {
        if (proposal.fee.length === 1) {
          pureDesignFee = Math.round(proposal.fee[0].amount);
          discount = proposal.fee[0].discount;
        } else {
          for (let obj of proposal.fee) {
            if (obj.method === thisBill.links.method) {
              pureDesignFee = Math.round(obj.amount);
              discount = obj.discount;
            }
          }
        }
      } else {
        pureDesignFee = 0;
        discount = 0;
      }

      if (/계약금/gi.test(data.goodName.trim())) {

        billsDuplication = await bill.getBillsByQuery({ "links.proid": proid, "links.desid": desid, "links.method": thisBill.links.method }, { selfMongo: instance.mongolocal });
        if (billsDuplication.length > 1) {
          for (let b of billsDuplication) {
            if (b.bilid !== thisBill.bilid) {
              if (typeof b.bilid === "string") {
                await bill.deleteBill(b.bilid, { selfMongo: instance.mongolocal });
              }
            }
          }
        }

        projectQuery["process.contract.first.date"] = new Date();
        projectQuery["process.contract.first.calculation.amount"] = amount;
        projectQuery["process.contract.first.calculation.info.method"] = proofs.method;
        projectQuery["process.contract.first.calculation.info.proof"] = inisis;
        projectQuery["process.contract.first.calculation.info.to"] = proofs.to;

        projectQuery["desid"] = desid;
        projectQuery["service.online"] = !/off/gi.test(thisBill.links.method);
        projectQuery["process.status"] = "대기";
        projectQuery["proposal.status"] = "고객 선택";

        vat = Math.round(pureDesignFee * 0.1);
        consumer = Math.round(pureDesignFee * 1.1);

        projectQuery["process.contract.remain.calculation.amount.supply"] = Number(pureDesignFee);
        projectQuery["process.contract.remain.calculation.amount.vat"] = Number(vat);
        projectQuery["process.contract.remain.calculation.amount.consumer"] = Number(consumer);
        projectQuery["process.contract.remain.calculation.discount"] = Number(discount);

        classification = designer.information.business.businessInfo.classification;
        percentage = Number(designer.information.business.service.cost.percentage);
        businessMethod = "사업자(일반)";
        if (/사업자/g.test(classification)) {
          if (/일반/g.test(classification)) {
            businessMethod = "사업자(일반)";
          } else {
            businessMethod = "사업자(간이)";
          }
        } else {
          businessMethod = "프리랜서";
        }
        projectQuery["process.calculation.method"] = businessMethod;
        projectQuery["process.calculation.percentage"] = percentage;

        if (designer.information.business.account.length > 0) {
          bankName = designer.information.business.account[0].bankName + " " + String(designer.information.business.account[0].accountNumber);
          bankTo = designer.information.business.account[0].to;
          projectQuery["process.calculation.info.account"] = bankName;
          projectQuery["process.calculation.info.proof"] = bankTo;
          projectQuery["process.calculation.info.to"] = bankTo;
        }

        [ calculate ] = bill.designerCalculation((pureDesignFee / (1 - discount)), businessMethod, percentage, client, { toArray: true });
        projectQuery["process.calculation.payments.totalAmount"] = calculate;
        projectQuery["process.calculation.payments.first.amount"] = Math.round(calculate / 2);
        projectQuery["process.calculation.payments.remain.amount"] = Math.round(calculate / 2);

        if (Number(project.service.serid.split("_")[1].replace(/[^0-9]/gi, '').replace(/^0/, '')) !== 1) {
          projectQuery["process.design.construct"] = back.returnProjectDummies("process.design.construct");
        }

        await back.updateClient([ { cliid }, { "requests.0.analytics.response.status": "진행" } ], { selfMongo: instance.mongo });
        await bill.designerSelect(proid, desid, { selfMongo: instance.mongolocal });

        await back.updateProject([ { proid }, projectQuery ], { selfMongo: instance.mongo });
        await bill.amountConverting(thisBill.bilid, { selfMongo: instance.mongolocal });

        thisProposal = project.proposal.detail.find((p) => { return p.desid === desid });
        thisMethod = (project.service.online ? "online" : "offline");
        if (thisProposal !== undefined) {
          thisFeeObject = thisProposal.fee.find((f) => { return f.method === thisMethod });
          if (thisFeeObject !== undefined) {
            if (thisFeeObject.distance.amount !== 0) {
              await bill.travelInjection("request", proid, thisMethod, 1, { selfMongo: instance.mongolocal });
            }
          }
        }

        requestSystem("https://" + instance.address.officeinfo.host + ":3002/getHistoryProperty", { idArr: [ desid ], method: "designer", property: "manager" }, {
          headers: {
            "Content-Type": "application/json",
            "origin": "https://" + instance.address.officeinfo.host,
          }
        }).then((res) => {
          const { data } = res;
          return requestSystem("https://" + instance.address.officeinfo.host + ":3002/updateHistory", {
            method: "project",
            id: proid,
            column: "manager",
            value: data[desid],
            email: null
          }, {
            headers: {
              "Content-Type": "application/json",
              "origin": "https://" + instance.address.officeinfo.host,
            }
          });
        }).catch((err) => {
          logger.error("Python 서버 문제 생김 (sync_paymentProject, history 연산중 콘솔에서 문제 생김) : " + err.message).catch((e) => { console.log(e); })
        });

        instance.kakao.sendTalk("paymentAndChannel", client.name, client.phone, {
          client: client.name,
          designer: designer.designer,
          host: instance.address.frontinfo.host,
          path: "caution",
        }).catch((err) => {
          console.log(err);
        });

        requestSystem("https://" + instance.address.officeinfo.host + ":3002/realtimeDesigner", { mode: "sync", proid }, {
          headers: {
            "Content-Type": "application/json",
            "origin": "https://" + instance.address.officeinfo.host
          }
        }).then((obj) => {
          if (obj.status >= 300) {
            return logger.error("Python 서버 문제 생김 (sync_paymentProject, realtime 연산중 콘솔에서 문제 생김) ");
          }
        }).catch((err) => {
          logger.error("Python 서버 문제 생김 (sync_paymentProject, realtime 연산중 콘솔에서 문제 생김) : " + err.message).catch((e) => { console.log(e); })
        });

      } else if (/잔금/gi.test(data.goodName.trim())) {

        projectQuery["process.status"] = "진행중";
        projectQuery["process.action"] = "시작 대기";
        projectQuery["process.contract.remain.date"] = new Date();
        projectQuery["process.contract.remain.calculation.info.method"] = proofs.method;
        projectQuery["process.contract.remain.calculation.info.proof"] = inisis;
        projectQuery["process.contract.remain.calculation.info.to"] = proofs.to;

        await back.updateProject([ { proid }, projectQuery ], { selfMongo: instance.mongo });

        instance.kakao.sendTalk("remainPaymentAndChannel", client.name, client.phone, {
          client: client.name,
          designer: designer.designer,
          emoji: "(방긋)",
        }).catch((err) => {
          console.log(err);
        });

      }

    } else if (/시공 계약금/gi.test(data.goodName.trim()) || /시공 착수금/gi.test(data.goodName.trim()) || /시공 중도금/gi.test(data.goodName.trim()) || /시공 잔금/gi.test(data.goodName.trim())) {

      projectQuery = {};

      if (/계약금/gi.test(data.goodName.trim())) {

        projectQuery["process.design.construct.status"] = "계약금 입금";
        projectQuery["process.design.construct.contract.payments.first.date"] = new Date();
        projectQuery["process.design.construct.contract.payments.first.calculation.info.method"] = proofs.method;
        projectQuery["process.design.construct.contract.payments.first.calculation.info.proof"] = inisis;
        projectQuery["process.design.construct.contract.payments.first.calculation.info.to"] = proofs.to;
        await back.updateProject([ { proid }, projectQuery ], { selfMongo: instance.mongo });

      } else if (/착수금/gi.test(data.goodName.trim())) {

        projectQuery["process.design.construct.status"] = "착수금 입금";
        projectQuery["process.design.construct.contract.payments.start.date"] = new Date();
        projectQuery["process.design.construct.contract.payments.start.calculation.info.method"] = proofs.method;
        projectQuery["process.design.construct.contract.payments.start.calculation.info.proof"] = inisis;
        projectQuery["process.design.construct.contract.payments.start.calculation.info.to"] = proofs.to;
        await back.updateProject([ { proid }, projectQuery ], { selfMongo: instance.mongo });

      } else if (/중도금/gi.test(data.goodName.trim())) {

        projectQuery["process.design.construct.status"] = "중도금 입금";
        projectQuery["process.design.construct.contract.payments.middle.date"] = new Date();
        projectQuery["process.design.construct.contract.payments.middle.calculation.info.method"] = proofs.method;
        projectQuery["process.design.construct.contract.payments.middle.calculation.info.proof"] = inisis;
        projectQuery["process.design.construct.contract.payments.middle.calculation.info.to"] = proofs.to;
        await back.updateProject([ { proid }, projectQuery ], { selfMongo: instance.mongo });

      } else if (/잔금/gi.test(data.goodName.trim())) {

        projectQuery["process.design.construct.status"] = "잔금 입금";
        projectQuery["process.design.construct.contract.payments.remain.date"] = new Date();
        projectQuery["process.design.construct.contract.payments.remain.calculation.info.method"] = proofs.method;
        projectQuery["process.design.construct.contract.payments.remain.calculation.info.proof"] = inisis;
        projectQuery["process.design.construct.contract.payments.remain.calculation.info.to"] = proofs.to;
        await back.updateProject([ { proid }, projectQuery ], { selfMongo: instance.mongo });

      }

      instance.kakao.sendTalk("generalPayments", client.name, client.phone, {
        client: client.name,
        goods: data.goodName.trim(),
      }).catch((err) => {
        console.log(err);
      });

    }

  } catch (e) {
    logger.error("Python 서버 문제 생김 (sync_paymentProject) : " + e.message).catch((e) => { console.log(e); })
    console.log(e);
  }
}

DataRouter.prototype.rou_post_ghostClientBill = function () {
  const instance = this;
  const back = this.back;
  const bill = this.bill;
  const { equalJson, autoComma, requestSystem, messageSend } = this.mother;
  let obj = {};
  obj.link = "/ghostClientBill";
  obj.func = async function (req, res, logger) {
    try {
      if (req.body.bilid === undefined || req.body.requestNumber === undefined || req.body.data === undefined) {
        throw new Error("invaild post");
      }
      const selfMongo = instance.mongolocal;
      const { bilid, requestNumber, data } = equalJson(req.body);
      if (typeof data !== "object") {
        throw new Error("invaild post : data must be object");
      }
      if (typeof data.MOID !== "string") {
        throw new Error("invaild post");
      }
      if (Number.isNaN(Number(requestNumber))) {
        throw new Error("invaild request number");
      }
      const oid = data.MOID;
      const inisis = "이니시스";
      let whereQuery, updateQuery, method;
      let thisBill;
      let cliid, desid, proid;
      let client, designer, project;
      let proposal;
      let oidArr, infoArr;
      let index;
      let boo;
      let proofs;
      let projectQuery;
      let amount;
      let pureDesignFee;
      let vat, consumer;
      let classification, percentage;
      let businessMethod;
      let bankName, bankTo;
      let calculate;
      let itemArr, payArr, cancelArr;
      let itemNum, payNum, cancelNum;
      let payObject;
      let message;

      if (data.__ignorethis__ !== 1) {

        thisBill = await bill.getBillById(bilid, { selfMongo });
        if (thisBill === null) {
          throw new Error("there is no bill");
        }
        if (thisBill.links.cliid === undefined || thisBill.links.desid === undefined || thisBill.links.proid === undefined) {
          throw new Error("invaild bill");
        }
        thisBill = thisBill.toNormal();
        cliid = thisBill.links.cliid;
        desid = thisBill.links.desid;
        proid = thisBill.links.proid;
        client = await back.getClientById(cliid, { selfMongo: instance.mongo });
        designer = await back.getDesignerById(desid, { selfMongo: instance.mongo });
        project = await back.getProjectById(proid, { selfMongo: instance.mongo });
        proposal = project.selectProposal(desid);

        if (client === null || designer === null || project === null) {
          throw new Error("invaild id");
        }

        if (Array.isArray(thisBill.links.oid)) {
          oidArr = equalJson(JSON.stringify(thisBill.links.oid));
          boo = false;
          for (let o of oidArr) {
            if (o === oid) {
              boo = true;
            }
          }
          if (!boo) {
            oidArr.unshift(oid);
          }
        } else {
          oidArr = [ oid ];
        }

        infoArr = equalJson(JSON.stringify(thisBill.requests[Number(requestNumber)].info));
        infoArr.unshift({ data });
        infoArr.unshift({ oid });

        whereQuery = { bilid };
        updateQuery = {};
        updateQuery["links.oid"] = oidArr;
        updateQuery["requests." + String(requestNumber) + ".info"] = infoArr;

        amount = Number(data.TotPrice.replace(/[^0-9]/gi, ''));

        if (data.CARD_BankCode !== undefined) {

          itemArr = equalJson(JSON.stringify(thisBill.requests[Number(requestNumber)].items));
          payArr = equalJson(JSON.stringify(thisBill.requests[Number(requestNumber)].pay));
          cancelArr = equalJson(JSON.stringify(thisBill.requests[Number(requestNumber)].cancel));
          payObject = bill.returnBillDummies("pay");
          payObject.amount = amount;
          payObject.oid = oid;
          payArr.unshift(payObject);

          updateQuery["requests." + String(requestNumber) + ".status"] = "결제 완료";

          updateQuery["requests." + String(requestNumber) + ".pay"] = payArr;

          proofs = bill.returnBillDummies("proofs");
          if (typeof data.P_FN_NM === "string") {
            proofs.method = "카드(" + data.P_FN_NM.replace(/카드/gi, '') + ")";
          } else {
            proofs.method = "카드(알 수 없음)";
          }
          proofs.proof = inisis;
          proofs.to = data.buyerName;
          thisBill.requests[Number(requestNumber)].proofs.unshift(proofs);
          updateQuery["requests." + String(requestNumber) + ".proofs"] = thisBill.requests[Number(requestNumber)].proofs;

          message = client.name + " 고객님 (" + designer.designer + " 실장님" + ") 이 " + proofs.method + "로 " + data.goodName.trim() + "을 결제하셨습니다!";
          messageSend({ text: message, channel: "#700_operation", voice: true }).catch((err) => {
            console.log(err);
          })
          await bill.updateBill([ whereQuery, updateQuery ], { selfMongo });
          await instance.sync_paymentProject(bilid, requestNumber, data, amount, proofs, inisis, { thisBill, client, designer, project, proposal }, logger);

        } else {

          if (data.REAL_Account === undefined) {

            instance.kakao.sendTalk("virtualAccount", client.name, client.phone, {
              client: client.name,
              goodName: data.goodName,
              bankName: data.vactBankName,
              account: data.VACT_Num,
              to: data.VACT_Name,
              amount: autoComma(amount),
              date: data.VACT_Date.slice(0, 4) + "년 " + data.VACT_Date.slice(4, -2) + "월 " + data.VACT_Date.slice(-2) + "일",
            }).catch((err) => {
              console.log(err);
            });
            message = client.name + " 고객님이 " + data.goodName.trim() + " 결제를 위한 가상 계좌를 발급하셨습니다!";
            messageSend({ text: message, channel: "#700_operation", voice: true }).catch((err) => {
              console.log(err);
            });

          } else {

            instance.kakao.sendTalk("realAccount", client.name, client.phone, {
              client: client.name,
              goodName: data.goodName,
              bankName: data.vactBankName,
              account: data.VACT_Num,
              to: data.VACT_Name,
              amount: autoComma(amount),
            }).catch((err) => {
              console.log(err);
            });

          }

          await bill.updateBill([ whereQuery, updateQuery ], { selfMongo });

        }

        res.set({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
        });
        res.send(JSON.stringify({ message: "success" }));

      } else {

        res.set({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
        });
        res.send(JSON.stringify({ message: "success" }));

      }

    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_post_ghostClientBill): " + e.message).catch((e) => { console.log(e); });
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send(JSON.stringify({ message: "error" }));
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_webHookVAccount = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const bill = this.bill;
  const { equalJson, requestSystem, messageSend } = this.mother;
  const impWebhookUrl = "https://service.iamport.kr/inicis_payments/notice_vbank";
  let obj = {};
  obj.link = "/webHookVAccount";
  obj.public = true;
  obj.func = async function (req, res, logger) {
    try {
      const oid = req.body.no_oid;
      const inisis = "현금 영수증";
      const bankFrom = req.body.nm_inputbank;
      const nameFrom = req.body.nm_input;
      const rawRequestNumber = Number(req.body.requestNumber);
      let bills;
      let accountTransferCollection;
      let transferRows, transferRows2;
      let impId;

      if (!/imp_/g.test(oid)) {

        bills = await bill.getBillsByQuery({ "links.oid": { $elemMatch: { $regex: oid } } }, { selfMongo: instance.mongolocal });

        if (bills.length === 0) {
          accountTransferCollection = "accountTransfer";
          transferRows = await back.mongoRead(accountTransferCollection, { "accountInfo.no_oid": oid }, { selfMongo: instance.mongolocal });
          if (transferRows.length > 0) {
            transferRows2 = await back.mongoRead(accountTransferCollection, {
              $and: [
                { name: transferRows[0].name },
                { phone: transferRows[0].phone },
                { amount: transferRows[0].amount },
                { goodname: transferRows[0].goodname },
              ]
            }, { selfMongo: instance.mongolocal });
            if (transferRows2.length > 0) {
              transferRows2.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });
              for (let obj of transferRows2) {
                bills = await bill.getBillsByQuery({ "links.oid": { $elemMatch: { $regex: obj.accountInfo.no_oid } } }, { selfMongo: instance.mongolocal });
                if (bills.length !== 0) {
                  break;
                }
              }
              if (bills.length === 0) {
                bills = await bill.getBillsByQuery({ "bilid": transferRows[0].bilid }, { selfMongo: instance.mongolocal });
                if (bills.length === 0) {
                  throw new Error("invaild oid 3");
                }
              }
            } else {
              throw new Error("invaild oid 2");
            }
          } else {
            throw new Error("invaild oid 1");
          }
        }
  
        if (bills[0].links.proid === undefined || bills[0].links.desid === undefined || bills[0].links.cliid === undefined) {
          throw new Error("invaild bill");
        }
  
        const { proid, cliid, desid, method } = bills[0].links;
        let infoArr, index;
        let bilid;
        let client, designer, project, proposal;
        let requestNumber;
        let data;
        let thisBill;
        let projectQuery;
        let amount;
        let pureDesignFee;
        let vat, consumer;
        let classification, percentage;
        let businessMethod;
        let bankName, bankTo;
        let calculate;
        let whereQuery, updateQuery;
        let proofs;
        let itemArr, payArr, cancelArr;
        let itemNum, payNum, cancelNum;
        let payObject;
        let message;
  
        thisBill = bills[0];
        thisBill = thisBill.toNormal();
        bilid = thisBill.bilid;
  
        client = await back.getClientById(cliid, { selfMongo: instance.mongo });
        designer = await back.getDesignerById(desid, { selfMongo: instance.mongo });
        project = await back.getProjectById(proid, { selfMongo: instance.mongo });
        proposal = project.selectProposal(desid);
  
        if (client === null || designer === null || project === null) {
          throw new Error("invaild id");
        }
  
        requestNumber = null;
        for (let i = 0; i < thisBill.requests.length; i++) {
          for (let obj of thisBill.requests[i].info) {
            if (obj.oid === oid) {
              requestNumber = i;
              break;
            }
          }
        }
  
        if (requestNumber === null) {
          requestNumber = rawRequestNumber;
          if (Number.isNaN(Number(requestNumber))) {
            throw new Error("invalid request request number")
          }
        }
  
        for (let obj of thisBill.requests[requestNumber].info) {
          if (obj.data !== undefined && typeof obj.data === "object" && obj.data !== null) {
            data = equalJson(JSON.stringify(obj.data));
            break;
          }
        }
        if (data === null || data === undefined) {
          data = { goodName: thisBill.requests[transferRows[0].requestNumber].name };
        }
  
        infoArr = equalJson(JSON.stringify(thisBill.requests[requestNumber].info));
        infoArr.unshift({ virtualAccount: equalJson(JSON.stringify(req.body)) });
  
        whereQuery = { bilid };
        updateQuery = {};
        updateQuery["requests." + String(requestNumber) + ".info"] = infoArr;
  
        amount = Number(equalJson(JSON.stringify(req.body)).amt_input.replace(/[^0-9]/gi, ''));
  
        itemArr = equalJson(JSON.stringify(thisBill.requests[Number(requestNumber)].items));
        payArr = equalJson(JSON.stringify(thisBill.requests[Number(requestNumber)].pay));
        cancelArr = equalJson(JSON.stringify(thisBill.requests[Number(requestNumber)].cancel));
        payObject = bill.returnBillDummies("pay");
        payObject.oid = oid;
        payObject.amount = amount;
        payArr.unshift(payObject);
  
        updateQuery["requests." + String(requestNumber) + ".status"] = "결제 완료";
        updateQuery["requests." + String(requestNumber) + ".pay"] = payArr;
  
        proofs = bill.returnBillDummies("proofs");
  
        if (!(typeof req.body.real_account === "string")) {
          if (typeof bankFrom === "string") {
            proofs.method = "무통장 입금(" + bankFrom.replace(/은행/gi, '') + ")";
          } else {
            proofs.method = "무통장 입금(알 수 없음)";
          }
        } else {
          proofs.method = "계좌 이체";
        }
  
        proofs.proof = inisis;
        proofs.to = nameFrom;
        thisBill.requests[requestNumber].proofs.unshift(proofs);
        updateQuery["requests." + String(requestNumber) + ".proofs"] = thisBill.requests[requestNumber].proofs;
  
        message = client.name + " 고객님 (" + designer.designer + " 실장님" + ") 이 " + proofs.method + "로 " + data.goodName.trim() + "을 결제하셨습니다!";
        messageSend({ text: message, channel: "#700_operation", voice: true }).catch((err) => {
          console.log(err);
        });
        await bill.updateBill([ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });
        await instance.sync_paymentProject(bilid, requestNumber, data, amount, proofs, inisis, { thisBill, client, designer, project, proposal }, logger);
  
      } else {
        const impId = req.body.no_oid;
        const { data: { response: { access_token: accessToken } } } = (await requestSystem("https://api.iamport.kr/users/getToken", {
          imp_key: address.officeinfo.import.key,
          imp_secret: address.officeinfo.import.secret
        }, { headers: { "Content-Type": "application/json" } }));
        const { data: { response: paymentData } } = await requestSystem("https://api.iamport.kr/payments/" + impId, {}, {
          method: "get",
          headers: { "Authorization": accessToken }
        });

        const oid = paymentData.merchant_uid;

        if (/dreg_/g.test(oid)) {
          const [ oidConst, aspid0, aspid1 ] = oid.split("_");
          const aspid = aspid0 + "_" + aspid1;
          if (/paid/g.test(paymentData.status)) {
            if (paymentData.pay_method === "card") {
              await requestSystem("https://" + address.officeinfo.host + ":3002/aspirantPayment", {
                aspid,
                mode: "card",
                status: "paid"
              }, { headers: { "Content-Type": "application/json" } });
            } else {
              await requestSystem("https://" + address.officeinfo.host + ":3002/aspirantPayment", {
                aspid,
                mode: "vbank",
                status: "paid"
              }, { headers: { "Content-Type": "application/json" } });
            }
          } else {
            if (paymentData.pay_method !== "card") {
              await requestSystem("https://" + address.officeinfo.host + ":3002/aspirantPayment", {
                aspid,
                mode: "vbank",
                status: "paid"
              }, { headers: { "Content-Type": "application/json" } });
            }
          }
        }
      }

      res.set({ "Content-Type": "text/plain" });
      res.send("OK");
    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_post_webHookVAccount): " + e.message).catch((e) => { console.log(e); });
      res.set({ "Content-Type": "text/plain" });
      res.send("FAIL");
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_designerSelect = function () {
  const instance = this;
  const bill = this.bill;
  const { equalJson } = this.mother;
  let obj = {};
  obj.link = "/designerSelect";
  obj.func = async function (req, res, logger) {
    try {
      if (req.body.proid === undefined || req.body.desid === undefined) {
        throw new Error("invaild post, must be proid / desid : " + JSON.stringify(req.body, null, 2));
      }
      const selfMongo = instance.mongolocal;
      const { proid, desid } = equalJson(req.body);
      await bill.designerSelect(proid, desid, { selfMongo });
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send(JSON.stringify({ message: "success" }));
    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_post_designerSelect): " + e.message).catch((e) => { console.log(e); });
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send(JSON.stringify({ message: "error" }));
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_travelInjection = function () {
  const instance = this;
  const bill = this.bill;
  const { equalJson } = this.mother;
  let obj = {};
  obj.link = "/travelInjection";
  obj.func = async function (req, res, logger) {
    try {
      if (req.body.injectionCase === undefined || req.body.proid === undefined || req.body.method === undefined || req.body.number === undefined) {
        throw new Error("invaild post");
      }
      const selfMongo = instance.mongolocal;
      const { injectionCase, proid, method, number: rawNumber } = equalJson(req.body);
      const number = Number(rawNumber);
      const thisBill = await bill.travelInjection(injectionCase, proid, method, number, { selfMongo });
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send(JSON.stringify(thisBill.toNormal()));
    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_post_travelInjection): " + e.message).catch((e) => { console.log(e); });
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send(JSON.stringify({ message: "error" }));
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_travelEjection = function () {
  const instance = this;
  const bill = this.bill;
  const { equalJson } = this.mother;
  let obj = {};
  obj.link = "/travelEjection";
  obj.func = async function (req, res, logger) {
    try {
      if (req.body.injectionCase === undefined || req.body.proid === undefined || req.body.method === undefined || req.body.index === undefined) {
        throw new Error("invaild post");
      }
      const selfMongo = instance.mongolocal;
      const { injectionCase, proid, method, index: rawIndex } = equalJson(req.body);
      const index = Number(rawIndex);
      const thisBill = await bill.travelEjection(injectionCase, proid, method, index, { selfMongo });
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send(JSON.stringify(thisBill.toNormal()));
    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_post_travelEjection): " + e.message).catch((e) => { console.log(e); });
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send(JSON.stringify({ message: "error" }));
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_travelUpDown = function () {
  const instance = this;
  const bill = this.bill;
  const { equalJson } = this.mother;
  let obj = {};
  obj.link = "/travelUpDown";
  obj.func = async function (req, res, logger) {
    try {
      if (req.body.order === undefined || req.body.proid === undefined || req.body.method === undefined || req.body.index === undefined) {
        throw new Error("invaild post");
      }
      const selfMongo = instance.mongolocal;
      const { order, proid, method, index: rawIndex } = equalJson(req.body);
      const index = Number(rawIndex);
      const thisBill = await bill.travelUpDown(order, proid, method, index, { selfMongo });
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send(JSON.stringify(thisBill.toNormal()));
    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_post_travelUpDown): " + e.message).catch((e) => { console.log(e); });
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send(JSON.stringify({ message: "error" }));
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_travelReconfig = function () {
  const instance = this;
  const bill = this.bill;
  const { equalJson } = this.mother;
  let obj = {};
  obj.link = "/travelReconfig";
  obj.func = async function (req, res, logger) {
    try {
      if (req.body.injectionCase === undefined || req.body.proid === undefined || req.body.method === undefined || req.body.index === undefined || req.body.number === undefined) {
        throw new Error("invaild post");
      }
      const selfMongo = instance.mongolocal;
      const { injectionCase, proid, method, index: rawIndex, number: rawNumber } = equalJson(req.body);
      const index = Number(rawIndex);
      const number = Number(rawNumber);
      const thisBill = await bill.travelReconfig(injectionCase, proid, method, index, number, { selfMongo });
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send(JSON.stringify(thisBill.toNormal()));
    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_post_travelReconfig): " + e.message).catch((e) => { console.log(e); });
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send(JSON.stringify({ message: "error" }));
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_serviceConverting = function () {
  const instance = this;
  const back = this.back;
  const bill = this.bill;
  const address = this.address;
  const kakao = this.kakao;
  const { equalJson, requestSystem, sleep, serviceParsing, messageSend, autoComma } = this.mother;
  let obj = {};
  obj.link = "/serviceConverting";
  obj.func = async function (req, res, logger) {
    try {
      if (req.body.proid === undefined || req.body.method === undefined || req.body.serid === undefined) {
        throw new Error("invaild post");
      }
      const selfMongo = instance.mongolocal;
      const { proid, method, serid } = equalJson(req.body);
      const project = await back.getProjectById(proid, { selfMongo: instance.mongo });
      const client = await back.getClientById(project.cliid, { selfMongo: instance.mongo });
      const firstContract = project.process.contract.first.calculation.amount;
      const pastService = equalJson(JSON.stringify(project.service));
      const timeConst = 410;
      let report, map;
      let newPrice, confirmMode;

      if (req.body.mode === "confirm") {

        confirmMode = true;
        if (req.body.newPrice === undefined) {
          report = await bill.serviceConverting(proid, method, serid, { selfMongo, selfCoreMongo: instance.mongo, confirmMode });
        } else {
          if (Number.isNaN(Number(req.body.newPrice))) {
            throw new Error("must be newPrice(number) in confirm mode");
          }
          newPrice = Math.round(Number(req.body.newPrice));
          report = await bill.serviceConverting(proid, method, serid, { selfMongo, selfCoreMongo: instance.mongo, newPrice, confirmMode });
        }

        res.set({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
        });
        res.send(JSON.stringify(report));

      } else {

        if (req.body.newPrice !== undefined && !Number.isNaN(Number(req.body.newPrice))) {
          newPrice = Math.round(Number(req.body.newPrice));
          report = await bill.serviceConverting(proid, method, serid, { selfMongo, selfCoreMongo: instance.mongo, newPrice });
        } else {
          report = await bill.serviceConverting(proid, method, serid, { selfMongo, selfCoreMongo: instance.mongo });
        }

        map = [
          {
            column: "service",
            position: "service",
            pastValue: report.service.from,
            finalValue: report.service.to,
          },
          {
            column: "remainSupply",
            position: "process.contract.remain.calculation.amount.supply",
            pastValue: report.request.from.supply,
            finalValue: report.request.to.supply,
          },
          {
            column: "remainVat",
            position: "process.contract.remain.calculation.amount.vat",
            pastValue: report.request.from.vat,
            finalValue: report.request.to.vat,
          },
          {
            column: "remainConsumer",
            position: "process.contract.remain.calculation.amount.consumer",
            pastValue: report.request.from.consumer,
            finalValue: report.request.to.consumer,
          },
          {
            column: "remainPure",
            position: "process.contract.remain.calculation.amount.consumer",
            pastValue: report.request.from.consumer - firstContract,
            finalValue: report.request.to.consumer - firstContract,
          },
          {
            column: "paymentsTotalAmount",
            position: "process.calculation.payments.totalAmount",
            pastValue: report.response.from.total,
            finalValue: report.response.to.total,
          },
          {
            column: "paymentsFirstAmount",
            position: "process.calculation.payments.first.amount",
            pastValue: report.response.from.first,
            finalValue: report.response.to.first,
          },
          {
            column: "paymentsRemainAmount",
            position: "process.calculation.payments.remain.amount",
            pastValue: report.response.from.remain,
            finalValue: report.response.to.remain,
          },
        ];

        if (report.request.additional) {
          await kakao.sendTalk("plusDesignFee", client.name, client.phone, {
            client: client.name,
            pastservice: serviceParsing(report.service.from),
            newservice: serviceParsing(report.service.to),
            total: autoComma(Math.abs(report.request.from.consumer - report.request.to.consumer)),
            host: address.officeinfo.host + ":3002",
            path: "estimation",
            cliid: client.cliid,
            needs: "style," + project.desid + "," + proid + "," + (report.service.to.online ? "online" : "offline"),
          }).catch((err) => {
            console.log(err);
          });
          messageSend({ text: client.name + " 고객님의 추가 디자인비 요청 알림톡을 전송했어요!", channel: "#700_operation", voice: true }).catch((err) => {
            console.log(err);
          });
        }

        res.set({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
        });
        res.send(JSON.stringify({ message: "success" }));

      }
    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_post_serviceConverting): " + e.message).catch((e) => { console.log(e); });
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send(JSON.stringify({ message: "error" }));
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_designerConverting = function () {
  const instance = this;
  const back = this.back;
  const bill = this.bill;
  const address = this.address;
  const kakao = this.kakao;
  const { equalJson, requestSystem, sleep, serviceParsing, messageSend, autoComma } = this.mother;
  let obj = {};
  obj.link = "/designerConverting";
  obj.func = async function (req, res, logger) {
    try {
      if (req.body.proid === undefined || req.body.method === undefined || req.body.desid === undefined) {
        throw new Error("invaild post");
      }
      const selfMongo = instance.mongolocal;
      const { proid, method, desid } = equalJson(req.body);
      const project = (await back.getProjectById(proid, { selfMongo: instance.mongo })).toNormal();
      const client = await back.getClientById(project.cliid, { selfMongo: instance.mongo });
      const pastDesigner = await back.getDesignerById(project.desid, { selfMongo: instance.mongo });
      const designer = await back.getDesignerById(desid, { selfMongo: instance.mongo });
      const firstContract = project.process.contract.first.calculation.amount;
      const report = await bill.designerConverting(proid, method, desid, { selfMongo, selfCoreMongo: instance.mongo });
      const newProject = (await back.getProjectById(proid, { selfMongo: instance.mongo })).toNormal();
      const timeConst = 410;
      const map = [
        {
          column: "designer",
          position: "desid",
          pastValue: pastDesigner.desid,
          finalValue: designer.desid,
        },
        {
          column: "calculationInfo",
          position: "process.calculation.info",
          pastValue: project.process.calculation.info,
          finalValue: newProject.process.calculation.info,
        },
        {
          column: "method",
          position: "process.calculation.method",
          pastValue: project.process.calculation.method,
          finalValue: newProject.process.calculation.method,
        },
        {
          column: "percentage",
          position: "process.calculation.percentage",
          pastValue: project.process.calculation.percentage,
          finalValue: newProject.process.calculation.percentage,
        },
        {
          column: "remainSupply",
          position: "process.contract.remain.calculation.amount.supply",
          pastValue: report.request.from.supply,
          finalValue: report.request.to.supply,
        },
        {
          column: "remainVat",
          position: "process.contract.remain.calculation.amount.vat",
          pastValue: report.request.from.vat,
          finalValue: report.request.to.vat,
        },
        {
          column: "remainConsumer",
          position: "process.contract.remain.calculation.amount.consumer",
          pastValue: report.request.from.consumer,
          finalValue: report.request.to.consumer,
        },
        {
          column: "remainPure",
          position: "process.contract.remain.calculation.amount.consumer",
          pastValue: report.request.from.consumer - firstContract,
          finalValue: report.request.to.consumer - firstContract,
        },
        {
          column: "paymentsTotalAmount",
          position: "process.calculation.payments.totalAmount",
          pastValue: report.response.from.total,
          finalValue: report.response.to.total,
        },
        {
          column: "paymentsFirstAmount",
          position: "process.calculation.payments.first.amount",
          pastValue: report.response.from.first,
          finalValue: report.response.to.first,
        },
        {
          column: "paymentsRemainAmount",
          position: "process.calculation.payments.remain.amount",
          pastValue: report.response.from.remain,
          finalValue: report.response.to.remain,
        },
      ];

      if (report.request.additional) {
        await kakao.sendTalk("plusDesignerFee", client.name, client.phone, {
          client: client.name,
          pastdesigner: pastDesigner.designer,
          newdesigner: designer.designer,
          host: address.officeinfo.host + ":3002",
          total: autoComma(Math.abs(report.request.from.consumer - report.request.to.consumer)),
          path: "estimation",
          cliid: client.cliid,
          needs: "style," + project.desid + "," + proid + "," + (report.service.to.online ? "online" : "offline"),
        }).catch((err) => {
          console.log(err);
        });
        messageSend({ text: client.name + " 고객님의 추가 디자인비 요청 알림톡을 전송했어요!", channel: "#700_operation", voice: true }).catch((err) => {
          console.log(err);
        });
      }

      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send(JSON.stringify({ message: "success" }));
    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_post_designerConverting): " + e.message).catch((e) => { console.log(e); });
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send(JSON.stringify({ message: "error" }));
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_amountConverting = function () {
  const instance = this;
  const back = this.back;
  const bill = this.bill;
  const address = this.address;
  const kakao = this.kakao;
  const { equalJson, sleep } = this.mother;
  let obj = {};
  obj.link = "/amountConverting";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.bilid === undefined) {
        throw new Error("invaild post");
      }
      const selfMongo = instance.mongolocal;
      const { bilid } = equalJson(req.body);
      await bill.amountConverting(bilid, { selfMongo, selfCoreMongo: instance.mongo });
      res.send(JSON.stringify({ message: "success" }));
    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_post_amountConverting): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error" }));
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_requestRefund = function () {
  const instance = this;
  const back = this.back;
  const bill = this.bill;
  const address = this.address;
  const kakao = this.kakao;
  const { equalJson, sleep, requestSystem, messageSend, messageLog } = this.mother;
  let obj = {};
  obj.link = "/requestRefund";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.kind === undefined || req.body.bilid === undefined || req.body.requestIndex === undefined || req.body.payIndex === undefined) {
        throw new Error("invaild post 0");
      }
      const selfMongo = instance.mongolocal;
      const { kind, bilid } = equalJson(req.body);
      const requestIndex = Number(req.body.requestIndex);
      const payIndex = Number(req.body.payIndex);
      if (!([ "cardEntire", "cardPartial", "vaccountEntire", "vaccountPartial", "cashEntire", "cashPartial" ]).includes(kind)) {
        throw new Error("invaild post, kind must be : [ cardEntire, cardPartial, vaccountEntire, vaccountPartial, cashEntire, cashPartial ]");
      }
      if (Number.isNaN(requestIndex) || Number.isNaN(payIndex)) {
        throw new Error("invaild post 1");
      }
      let refundPrice;
      let report, option, client, designer, project, pastProject, proid;
      let timeConst, map;

      if (req.body.refundPrice !== undefined) {
        refundPrice = Number(req.body.refundPrice);
        if (refundPrice === 0 || Number.isNaN(refundPrice)) {
          refundPrice = null;
        }
      } else {
        refundPrice = null;
      }

      option = { selfMongo, selfCoreMongo: instance.mongo };
      if (req.body.percentage !== undefined) {
        if (typeof req.body.percentage === "string") {
          if (!Number.isNaN(Number(req.body.percentage.replace(/[^0-9\.]/gi, '')))) {
            option.percentage = Number(req.body.percentage);
          }
        } else if (typeof req.body.percentage === "number") {
          if (!Number.isNaN(req.body.percentage)) {
            option.percentage = Number(req.body.percentage);
          }
        }
      }
      if (req.body.accountNumber !== undefined && req.body.bankName !== undefined && req.body.accountName !== undefined) {
        option.accountNumber = req.body.accountNumber;
        option.bankName = req.body.bankName;
        option.accountName = req.body.accountName;
      }
      if (refundPrice !== undefined && refundPrice !== null) {
        if (typeof refundPrice === "number") {
          option.refundPrice = refundPrice;
        }
      }

      if (!/^cash/i.test(kind)) {
        report = await bill.requestRefund(kind, bilid, requestIndex, payIndex, option);
        await messageLog("환불 감지 : " + JSON.stringify(report, null, 2));
        report.bill = report.bill.toNormal();
        report.pastProject = report.pastProject.toNormal();
        report.project = report.project.toNormal();
        report.client = report.client.toNormal();
        client = report.client;
        pastProject = report.pastProject;
        project = report.project;
        proid = project.proid;
        designer = await back.getDesignerById(report.desid, { selfMongo: instance.mongo });

        timeConst = 410;
        map = [
          {
            column: "paymentsTotalAmount",
            position: "process.calculation.payments.totalAmount",
            pastValue: pastProject.process.calculation.payments.totalAmount,
            finalValue: project.process.calculation.payments.totalAmount,
          },
          {
            column: "paymentsFirstAmount",
            position: "process.calculation.payments.first.amount",
            pastValue: pastProject.process.calculation.payments.first.amount,
            finalValue: project.process.calculation.payments.first.amount,
          },
          {
            column: "paymentsRemainAmount",
            position: "process.calculation.payments.remain.amount",
            pastValue: pastProject.process.calculation.payments.remain.amount,
            finalValue: project.process.calculation.payments.remain.amount,
          },
        ];

        kakao.sendTalk((/card/gi.test(kind) ? "refundCard" : "refundVAccount"), client.name, client.phone, {
          client: client.name,
          designer: designer.designer,
          percentage: (!Number.isNaN(Number(report.price.percentage)) ? report.price.percentage : 100),
          amount: report.price.refund
        }).then(() => {
          return messageSend({ text: client.name + " 고객님의 환불 요청이 완료되었습니다!", channel: "#700_operation", voice: true });
        }).catch((err) => {
          console.log(err);
        });

        res.send(JSON.stringify(report));

      } else {

        if (req.body.mode === undefined || req.body.mode === null || req.body.mode === "request") {
          report = await bill.cashRefund("request", bilid, requestIndex, payIndex, option);
        } else if (req.body.mode === "execute") {
          report = await bill.cashRefund("execute", bilid, requestIndex, payIndex, option);

          client = report.client;
          designer = await back.getDesignerById(report.desid, { selfMongo: instance.mongo });

          kakao.sendTalk("refundVAccount", client.name, client.phone, {
            client: client.name,
            designer: designer.designer,
            percentage: (!Number.isNaN(Number(report.price.percentage)) ? report.price.percentage : 100),
            amount: report.price.refund
          }).then(() => {
            return messageSend({ text: client.name + " 고객님의 환불 요청이 완료되었습니다!", channel: "#700_operation", voice: true });
          }).catch((err) => {
            console.log(err);
          });

        }
        if (report.message === "success") {
          res.send(JSON.stringify(report));
        } else {
          throw new Error(report.message);
        }

      }

    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_post_requestRefund): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error" }));
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_contractCancel = function () {
  const instance = this;
  const back = this.back;
  const bill = this.bill;
  const address = this.address;
  const kakao = this.kakao;
  const { equalJson, sleep, requestSystem } = this.mother;
  let obj = {};
  obj.link = "/contractCancel";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.bilid === undefined) {
        throw new Error("invaild post");
      }
      const selfMongo = instance.mongolocal;
      const { bilid } = equalJson(req.body);
      let report, option, project, pastProject, proid;
      let timeConst, map;

      option = { selfMongo, selfCoreMongo: instance.mongo };

      report = await bill.contractCancel(bilid, option);
      report.bill = report.bill.toNormal();
      report.pastProject = report.pastProject.toNormal();
      report.project = report.project.toNormal();

      pastProject = report.pastProject;
      project = report.project;
      proid = project.proid;

      timeConst = 410;
      map = [
        {
          column: "paymentsTotalAmount",
          position: "process.calculation.payments.totalAmount",
          pastValue: pastProject.process.calculation.payments.totalAmount,
          finalValue: project.process.calculation.payments.totalAmount,
        },
        {
          column: "paymentsFirstAmount",
          position: "process.calculation.payments.first.amount",
          pastValue: pastProject.process.calculation.payments.first.amount,
          finalValue: project.process.calculation.payments.first.amount,
        },
        {
          column: "paymentsRemainAmount",
          position: "process.calculation.payments.remain.amount",
          pastValue: pastProject.process.calculation.payments.remain.amount,
          finalValue: project.process.calculation.payments.remain.amount,
        },
      ];

      res.send(JSON.stringify(report));
    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_post_contractCancel): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error" }));
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_returnBankCode = function () {
  const instance = this;
  const bankCode = this.bankCode;
  const { equalJson, sleep } = this.mother;
  let obj = {};
  obj.link = "/returnBankCode";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      res.send(JSON.stringify(bankCode));
    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_post_returnBankCode): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error" }));
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_designerCalculation = function () {
  const instance = this;
  const back = this.back;
  const bill = this.bill;
  const { equalJson, sleep } = this.mother;
  let obj = {};
  obj.link = "/designerCalculation";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.supply === undefined || req.body.classification === undefined || req.body.percentage === undefined || req.body.cliid === undefined) {
        throw new Error("invaild post");
      }
      const { classification, cliid } = equalJson(req.body);
      const supply = Number(req.body.supply);
      const percentage = Number(req.body.percentage);
      let calculate, commission;
      let project, client;

      if (/^c/.test(cliid)) {
        client = await back.getClientById(cliid, { selfMongo: instance.mongo });
        if (client === null) {
          throw new Error("invaild cliid");
        }
      } else if (/^p/.test(cliid)) {
        project = await back.getProjectById(cliid, { selfMongo: instance.mongo });
        if (project === null) {
          throw new Error("invaild proid");
        }
        client = await back.getClientById(project.cliid, { selfMongo: instance.mongo });
        if (client === null) {
          throw new Error("invaild cliid");
        }
      } else {
        throw new Error("invaild cliid");
      }

      [ calculate, commission ] = bill.designerCalculation(supply, classification, percentage, client, { toArray: true });

      if (req.body.mode === "commission") {
        res.send(JSON.stringify({ commission }));
      } else if (req.body.mode === "total") {
        res.send(JSON.stringify({ calculate, commission }));
      } else {
        res.send(JSON.stringify({ calculate }));
      }
    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_post_designerCalculation): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error" }));
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_returnDummy = function () {
  const instance = this;
  const bill = this.bill;
  const { equalJson, sleep } = this.mother;
  let obj = {};
  obj.link = "/returnDummy";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.collection === undefined || req.body.subject === undefined) {
        throw new Error("invaild post : must be { collection, subject }");
      }
      const { collection, subject } = req.body;
      const dummy = bill.returnDummies(collection, subject);
      res.send(JSON.stringify(dummy));
    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_post_returnDummy): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error" }));
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_taxBill = function () {
  const instance = this;
  const bill = this.bill;
  const { equalJson, requestSystem } = this.mother;
  let obj = {};
  obj.link = "/taxBill";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      bill.taxBill().catch((err) => {
        logger.error("Python 서버 문제 생김 (rou_post_taxBill): " + err.message).catch((e) => { console.log(e); });
      })
      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_post_taxBill): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error" }));
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_weeklyCalculation = function () {
  const instance = this;
  const work = this.work;
  const { equalJson } = this.mother;
  let obj = {};
  obj.link = "/weeklyCalculation";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      work.designerCalculation().then(() => {
        return logger.cron("weeklyCalculation success");
      }).catch((e) => {
        logger.error("Python 서버 문제 생김 (rou_post_weeklyCalculation): " + e.message).catch((e) => { console.log(e); });
      });
      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_post_weeklyCalculation): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error" }));
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_nonPaidResponses = function () {
  const instance = this;
  const work = this.work;
  const { equalJson } = this.mother;
  let obj = {};
  obj.link = "/nonPaidResponses";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const result = await work.designerCalculation(false);
      res.send(JSON.stringify(result));
    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_post_nonPaidResponses): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error" }));
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_excuteResponse = function () {
  const instance = this;
  const back = this.back;
  const bill = this.bill;
  const address = this.address;
  const kakao = this.kakao;
  const { equalJson, messageSend } = this.mother;
  let obj = {};
  obj.link = "/excuteResponse";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.bilid === undefined || req.body.responseIndex === undefined || req.body.date === undefined) {
        throw new Error("invaild post");
      }
      let { bilid, responseIndex, date } = equalJson(req.body);
      let thisBill;
      let oid;
      let method;
      let proid;
      let thisProject;
      let thisResponse;
      let pay, name, target;
      let whereQuery, updateQuery;
      let projectWhereQuery, projectUpdateQuery;
      let amount;
      let type;
      let thisClient, thisDesigner;

      responseIndex = Number(responseIndex);
      if (Number.isNaN(responseIndex)) {
        throw new Error("invaild post");
      }

      thisBill = await bill.getBillById(bilid, { selfMongo: instance.mongolocal });
      if (thisBill.responses[responseIndex] === undefined) {
        throw new Error("invaild index");
      }

      oid = "";
      method = "계좌 이체";
      proid = thisBill.links.proid;
      thisProject = await back.getProjectById(proid, { selfMongo: instance.mongo });

      thisResponse = thisBill.responses[responseIndex];
      ({ pay, name, target } = thisResponse);

      amount = Math.floor(thisResponse.items.reduce((acc, curr) => { return acc + curr.amount.pure }, 0));

      whereQuery = { bilid };
      updateQuery = {};

      if (pay.length === 0) {
        updateQuery["responses." + String(responseIndex) + ".pay"] = [ { amount, date, oid } ];
        updateQuery["responses." + String(responseIndex) + ".proofs"] = [ { date, method, proof: thisProject.process.calculation.info.proof, to: thisProject.process.calculation.info.to } ];
      } else if (pay.length === 1) {
        updateQuery["responses." + String(responseIndex) + ".pay." + String(0) + ".amount"] = amount;
        updateQuery["responses." + String(responseIndex) + ".pay." + String(0) + ".date"] = date;
        updateQuery["responses." + String(responseIndex) + ".proofs." + String(0) + ".date"] = date;
        updateQuery["responses." + String(responseIndex) + ".proofs." + String(0) + ".method"] = method;
        updateQuery["responses." + String(responseIndex) + ".proofs." + String(0) + ".proof"] = thisProject.process.calculation.info.proof;
        updateQuery["responses." + String(responseIndex) + ".proofs." + String(0) + ".to"] = thisProject.process.calculation.info.to;
      } else {
        updateQuery["responses." + String(responseIndex) + ".pay"] = [ { amount, date, oid } ];
        updateQuery["responses." + String(responseIndex) + ".proofs"] = [ { date, method, proof: thisProject.process.calculation.info.proof, to: thisProject.process.calculation.info.to } ];
      }

      await bill.updateBill([ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });
      thisBill = await bill.getBillById(bilid, { selfMongo: instance.mongolocal });

      if (/홈리에종 선금/gi.test(name) || /홈리에종 잔금/gi.test(name)) {

        projectWhereQuery = { proid };
        projectUpdateQuery = {};

        if (/홈리에종 선금/gi.test(name)) {
          projectUpdateQuery["process.calculation.payments.first.amount"] = Math.floor(amount);
          projectUpdateQuery["process.calculation.payments.first.date"] = date;
          projectUpdateQuery["process.calculation.payments.remain.amount"] = Math.floor(thisProject.process.calculation.payments.totalAmount - amount);
          type = "first";
        } else if (/홈리에종 잔금/gi.test(name)) {
          projectUpdateQuery["process.calculation.payments.remain.amount"] = Math.floor(amount);
          projectUpdateQuery["process.calculation.payments.remain.date"] = date;
          type = "remain";
        }

        await back.updateProject([ projectWhereQuery, projectUpdateQuery ], { selfMongo: instance.mongo });
        thisProject = await back.getProjectById(proid, { selfMongo: instance.mongo });
        thisClient = await back.getClientById(thisProject.cliid, { selfMongo: instance.mongo });
        thisDesigner = await back.getDesignerById(thisResponse.target.id, { selfMongo: instance.mongo });

        if (type === "first") {
          await kakao.sendTalk("paymentFirstDesigner", thisDesigner.designer, thisDesigner.information.phone, {
            designer: thisDesigner.designer,
            client: thisClient.name,
            host: address.frontinfo.host,
            proid: thisProject.proid,
          });
          await messageSend({ text: thisDesigner.designer + " 실장님께 선금 정산 완료 알림을 보냈습니다!", channel: "#700_operation", voice: false });
        } else {
          await kakao.sendTalk("paymentRemainDesigner", thisDesigner.designer, thisDesigner.information.phone, {
            designer: thisDesigner.designer,
            client: thisClient.name,
            host: address.frontinfo.host,
            proid: thisProject.proid,
          });
          await messageSend({ text: thisDesigner.designer + " 실장님께 잔금 정산 완료 알림을 보냈습니다!", channel: "#700_operation", voice: false });
        }

      }

      res.send(JSON.stringify({
        message: "success",
        bilid,
        proid,
        bill: thisBill.toNormal(),
        project: thisProject.toNormal(),
      }));

    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_post_excuteResponse): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ message: "error" }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_excuteRepay = function () {
  const instance = this;
  const back = this.back;
  const bill = this.bill;
  const { equalJson } = this.mother;
  let obj = {};
  obj.link = "/excuteRepay";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.bilid === undefined || req.body.responseIndex === undefined || req.body.date === undefined || req.body.amount === undefined) {
        throw new Error("invaild post");
      }
      let { bilid, responseIndex, date, amount } = equalJson(req.body);
      let thisBill;
      let oid;
      let method;
      let proid;
      let thisProject;
      let thisResponse;
      let cancel, name, target, proofs;
      let whereQuery, updateQuery;
      let projectWhereQuery, projectUpdateQuery;
      let cancelArr, proofsArr;
      let proof, to;

      responseIndex = Number(responseIndex);
      if (Number.isNaN(responseIndex)) {
        throw new Error("invaild post");
      }

      amount = Number(amount);
      if (Number.isNaN(amount)) {
        throw new Error("invaild post");
      }

      thisBill = await bill.getBillById(bilid, { selfMongo: instance.mongolocal });
      if (thisBill.responses[responseIndex] === undefined) {
        throw new Error("invaild index");
      }

      oid = "";
      method = "계좌 이체 취소";
      proof = "현금 영수증";
      to = "주식회사 홈리에종";

      proid = thisBill.links.proid;
      thisProject = await back.getProjectById(proid, { selfMongo: instance.mongo });

      thisResponse = thisBill.responses[responseIndex];
      ({ cancel, proofs, name, target } = thisResponse);

      cancelArr = equalJson(JSON.stringify(cancel));
      proofsArr = equalJson(JSON.stringify(proofs));

      whereQuery = { bilid };
      updateQuery = {};

      cancelArr.unshift({ date, amount, oid });
      proofsArr.unshift({ date, method, proof, to });

      updateQuery["responses." + String(responseIndex) + ".cancel"] = cancelArr;
      updateQuery["responses." + String(responseIndex) + ".proofs"] = proofsArr;

      await bill.updateBill([ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });
      thisBill = await bill.getBillById(bilid, { selfMongo: instance.mongolocal });

      if (/홈리에종 선금/gi.test(name) || /홈리에종 잔금/gi.test(name)) {

        projectWhereQuery = { proid };
        projectUpdateQuery = {};

        if (/홈리에종 선금/gi.test(name)) {
          projectUpdateQuery["process.calculation.payments.first.refund"] = Math.floor(amount);
          projectUpdateQuery["process.calculation.payments.first.cancel"] = date;
        } else if (/홈리에종 잔금/gi.test(name)) {
          projectUpdateQuery["process.calculation.payments.remain.refund"] = Math.floor(amount);
          projectUpdateQuery["process.calculation.payments.remain.cancel"] = date;
        }

        await back.updateProject([ projectWhereQuery, projectUpdateQuery ], { selfMongo: instance.mongo });
        thisProject = await back.getProjectById(proid, { selfMongo: instance.mongo });

      }

      res.send(JSON.stringify({
        message: "success",
        bilid,
        proid,
        bill: thisBill.toNormal(),
        project: thisProject.toNormal(),
      }));

    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_post_excuteRepay): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ message: "error" }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_passiveResponse = function () {
  const instance = this;
  const back = this.back;
  const bill = this.bill;
  const { equalJson } = this.mother;
  let obj = {};
  obj.link = "/passiveResponse";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.bilid === undefined || req.body.responseIndex === undefined || req.body.amount === undefined) {
        throw new Error("invaild post");
      }
      let { bilid, responseIndex, amount } = equalJson(req.body);
      let thisBill;
      let whereQuery;
      let updateQuery;
      let thisResponse;
      let thisItems;
      let thisItem;

      responseIndex = Number(responseIndex);
      if (Number.isNaN(responseIndex)) {
        throw new Error("invaild post");
      }

      amount = Number(amount);
      if (Number.isNaN(amount)) {
        throw new Error("invaild post");
      }

      thisBill = await bill.getBillById(bilid, { selfMongo: instance.mongolocal });
      if (thisBill.responses[responseIndex] === undefined) {
        throw new Error("invaild index");
      }

      thisResponse = thisBill.responses[responseIndex];
      thisItems = thisResponse.items;
      thisItem = thisItems[0];

      whereQuery = { bilid };
      updateQuery = {};

      updateQuery["responses." + String(responseIndex) + ".items"] = [
        {
          id: thisItem.id,
          class: thisItem.class,
          name: thisItem.name,
          description: thisItem.description,
          info: thisItem.info,
          unit: {
            ea: thisItem.unit.ea,
            price: amount,
            number: 1,
          },
          amount: {
            pure: amount,
            commission: 0,
          }
        }
      ];

      await bill.updateBill([ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });
      thisBill = await bill.getBillById(bilid, { selfMongo: instance.mongolocal });

      res.send(JSON.stringify({
        bilid: thisBill.bilid,
        proid: thisBill.links.proid,
        bill: thisBill.toNormal()
      }));

    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_post_passiveResponse): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ message: "error" }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_stylingFormSync = function () {
  const instance = this;
  const { requestSystem, equalJson, stringToDate, messageLog, messageSend } = this.mother;
  const address = this.address;
  const { officeinfo: { widsign: { id, key, endPoint } } } = address;
  const collections = [ "stylingForm", "constructForm", "partnershipForm", "designerForm" ];
  const back = this.back;
  const formSync = async (MONGOC, MONGOPYTHONC) => {
    try {
      const selfMongo = MONGOPYTHONC;
      let widsignResponse, token;
      let num;
      let forms, resultForms, finalForms;
      let pageSize;
      let monthAgoValue;
      let boo;
      let whereQuery, updateQuery;
      let dbForms;
      let target;
      let formDetail;
      let thisClient;
      let thisProject, thisDesigner;
      let text;

      for (let collection of collections) {
        monthAgoValue = new Date();
        monthAgoValue.setMonth(monthAgoValue.getMonth() - 3);
        monthAgoValue = monthAgoValue.valueOf();

        pageSize = 30;
        widsignResponse = await requestSystem(endPoint + "/v2/token", {}, { method: "get", headers: { "x-api-id": id, "x-api-key": key } });

        if (widsignResponse.data.result_code !== 200) {
          throw new Error("access token error");
        } else {
          token = widsignResponse.data.access_token;
          resultForms = [];
          forms = [ null ];
          num = 1;
          while (forms.length > 0) {
            widsignResponse = await requestSystem(endPoint + "/v2/doc", { page: num, page_size: pageSize }, { method: "get", headers: { "x-api-key": key, "x-access-token": token } });
            forms = equalJson(JSON.stringify(widsignResponse.data.result)).map((obj) => {
              let newObj;
              newObj = {};
              newObj.form = obj.form_id;
              newObj.id = (obj.receiver_list.length > 0) ? obj.receiver_list[0] : null;
              newObj.name = obj.title;
              newObj.date = stringToDate(obj.created_date);
              newObj.confirm = (obj.status === 'END');
              return newObj;
            });
            if (forms.length > 0) {
              forms.sort((a, b) => { return a.date.valueOf() - b.date.valueOf(); });
              if (forms[0].date.valueOf() <= monthAgoValue) {
                break;
              }
              resultForms = resultForms.concat(forms);
            }
            num++;
          }

          resultForms.sort((a, b) => { return b.date.valueOf() - a.date.valueOf(); });

          finalForms = [];
          for (let f of resultForms) {
            boo = (finalForms.find((obj) => { return obj.name === f.name; }) !== undefined);
            if (!boo) {
              finalForms.push(f);
            }
          }

          widsignResponse = await requestSystem(endPoint + "/v2/token", {}, { method: "get", headers: { "x-api-id": id, "x-api-key": key } });
          if (widsignResponse.data.result_code !== 200) {
            throw new Error("access token error");
          }
          token = widsignResponse.data.access_token;

          if (/styling/gi.test(collection) || /construct/gi.test(collection)) {
            whereQuery = { $or: finalForms.map((obj) => { return { name: obj.name } }) };
            dbForms = await back.mongoRead(collection, whereQuery, { selfMongo });
            for (let f of dbForms) {
              whereQuery = { proid: f.proid };
              updateQuery = {};
  
              target = null;
              for (let i of finalForms) {
                if (i.name === f.name) {
                  target = i;
                }
              }
  
              if (target !== null) {
                widsignResponse = await requestSystem(endPoint + "/v2/doc/detail", { "receiver_meta_id": target.id }, { method: "get", headers: { "x-api-key": key, "x-access-token": token } });
                if (typeof widsignResponse.data === "object") {
                  if (widsignResponse.data.result !== undefined) {
                    if (widsignResponse.data.result.receiver_list.length > 0) {
                      updateQuery["id"] = target.id;
                      updateQuery["date"] = target.date;
                      updateQuery["confirm"] = target.confirm;
                      updateQuery["form"] = target.form;
                      updateQuery["detail"] = widsignResponse.data.result.receiver_list[0];
                      widsignResponse = await requestSystem(endPoint + "/v2/doc/history", { "receiver_meta_id": target.id }, { method: "get", headers: { "x-api-key": key, "x-access-token": token } });
                      if (typeof widsignResponse.data === "object") {
                        if (Array.isArray(widsignResponse.data.result)) {
                          updateQuery["history"] = widsignResponse.data.result.map((obj) => {
                            obj.date = stringToDate(obj.created_date);
                            delete obj.created_date;
                            return obj;
                          });
                          if (f.confirm !== true && target.confirm === true) {
  
                            thisProject = await back.getProjectById(f.proid, { selfMongo: MONGOC });
                            thisClient = await back.getClientById(f.client.cliid, { selfMongo: MONGOC });
                            thisDesigner = await back.getDesignerById(thisProject.desid, { selfMongo: MONGOC });
  
                            text = thisClient.name + " 고객님이 계약서에 서명을 완료하셨습니다!";
                            await messageSend({ text, channel: "#400_customer", voice: true });
  
                          }
                          await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo });
  
                          if (/styling/gi.test(collection)) {
                            await back.updateProject([ { proid: f.proid }, { "process.contract.form.id": target.id } ], { selfMongo: MONGOC });
                          } else if (/construct/gi.test(collection)) {
                            await back.updateProject([ { proid: f.proid }, { "process.design.construct.contract.form.id": target.id } ], { selfMongo: MONGOC });
                          }
  
                        }
                      }
                    }
                  }
                }
              }
  
            }
          } else {

            whereQuery = { $or: finalForms.map((obj) => { return { name: obj.name } }) };
            dbForms = await back.mongoRead(collection, whereQuery, { selfMongo });
            for (let f of dbForms) {
              whereQuery = { aspid: f.aspid };
              updateQuery = {};
  
              target = null;
              for (let i of finalForms) {
                if (i.name === f.name) {
                  target = i;
                }
              }
  
              if (target !== null) {
                widsignResponse = await requestSystem(endPoint + "/v2/doc/detail", { "receiver_meta_id": target.id }, { method: "get", headers: { "x-api-key": key, "x-access-token": token } });
                if (typeof widsignResponse.data === "object") {
                  if (widsignResponse.data.result !== undefined) {
                    if (widsignResponse.data.result.receiver_list.length > 0) {
                      updateQuery["id"] = target.id;
                      updateQuery["date"] = target.date;
                      updateQuery["confirm"] = target.confirm;
                      updateQuery["form"] = target.form;
                      updateQuery["detail"] = widsignResponse.data.result.receiver_list[0];
                      widsignResponse = await requestSystem(endPoint + "/v2/doc/history", { "receiver_meta_id": target.id }, { method: "get", headers: { "x-api-key": key, "x-access-token": token } });
                      if (typeof widsignResponse.data === "object") {
                        if (Array.isArray(widsignResponse.data.result)) {
                          updateQuery["history"] = widsignResponse.data.result.map((obj) => {
                            obj.date = stringToDate(obj.created_date);
                            delete obj.created_date;
                            return obj;
                          });
                          await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo });
                          if (f.confirm !== true && target.confirm === true) {
                            thisDesigner = await back.getAspirantById(f.aspid, { selfMongo: MONGOC });
                            text = thisDesigner.designer + " 디자이너님이 계약서에 서명을 완료하셨습니다!";
                            await messageSend({ text, channel: "#301_apply", voice: true });
                            if (/partnership/gi.test(collection)) {
                              await back.updateAspirant([ { aspid: f.aspid }, { "contract.partnership.id": target.id, "contract.partnership.date": new Date() } ], { selfMongo: MONGOC });
                            } else if (/designer/gi.test(collection)) {
                              await back.updateAspirant([ { aspid: f.aspid }, { "contract.designer.id": target.id, "contract.designer.date": new Date() } ], { selfMongo: MONGOC });
                            }
                            await back.updateAspirant([ { aspid: f.aspid }, { "meeting.status": "계약 완료" } ], { selfMongo: MONGOC });
                          }
                        }
                      }
                    }
                  }
                }
              }
  
            }

          }

        }

      }
    
      return true;

    } catch (e) {
      return false;
    }
  }
  let obj = {};
  obj.link = "/stylingFormSync";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      formSync(instance.mongo, instance.mongolocal).then((boo) => {
        if (boo) {
          logger.cron("styling form sync success : " + JSON.stringify(new Date())).catch((e) => { console.log(e); });
        } else {
          logger.error("styling form sync fail : " + JSON.stringify(new Date())).catch((e) => { console.log(e); });
        }
        return requestSystem("https://" + address.officeinfo.host + ":3002/stylingFormFile", { data: null }, { headers: { "Content-Type": "application/json" } });;
      }).catch((err) => {
        logger.error("Python 서버 문제 생김 (rou_post_stylingFormSync): " + err.message).catch((e) => { console.log(e); });
      });
      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_post_stylingFormSync): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ message: "error" }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_stylingFormFile = function () {
  const instance = this;
  const { requestSystem, binaryRequest, fileSystem, shellExec, sleep, generalFileUpload, equalJson, stringToDate, messageLog, messageSend } = this.mother;
  const address = this.address;
  const { officeinfo: { widsign: { id, key, endPoint } } } = address;
  const back = this.back;
  let obj = {};
  obj.link = "/stylingFormFile";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const selfMongo = instance.mongolocal;
      const splitToken = "__split__";
      const collection = "stylingForm";
      let widsignResponse;
      let token;
      let rows;
      let fileName;
      let transRes;
      let subtract;
      let fileList;
      let downloadTargets;
      let fromArr, toArr;

      rows = await back.mongoRead(collection, {}, { selfMongo });
      rows = rows.filter((obj) => { return obj.confirm });
  
      transRes = await requestSystem("https://" + address.secondinfo.host + ":3003/contractList", { data: null }, { headers: { "Content-Type": "application/json" } });

      fileList = transRes.data.map((obj) => { return obj.proid });
      subtract = rows.map((obj) => { return obj.proid }).filter((proid) => {
        return !fileList.includes(proid);
      });
      downloadTargets = rows.filter((obj) => {
        return subtract.includes(obj.proid);
      });
  
      for (let { id: formId, proid, client: { cliid, requestNumber } } of downloadTargets) {
        widsignResponse = await requestSystem(endPoint + "/v2/token", {}, { method: "get", headers: { "x-api-id": id, "x-api-key": key } });
        if (widsignResponse.data.result_code !== 200) {
          throw new Error("access token error");
        }
        token = widsignResponse.data.access_token;
        fileName = `${proid}${splitToken}${cliid}${splitToken}${requestNumber}${splitToken}${formId}.zip`;
        widsignResponse = await binaryRequest(endPoint + "/v2/doc/download?receiver_meta_id=" + formId, null, { "x-api-key": key, "x-access-token": token });
        await fileSystem(`writeBinary`, [ `${process.cwd()}/temp/${fileName}`, widsignResponse ]);
  
        fromArr = [ `${process.cwd()}/temp/${fileName}` ];
        toArr = [ "/photo/contract/" + fileName ];
        await generalFileUpload("https://" + address.secondinfo.host + ":3003/generalFileUpload", fromArr, toArr);
  
        await sleep(300);
        await shellExec("rm", [ "-rf", `${process.cwd()}/temp/${fileName}` ]);
  
      }

      logger.cron("styling form file success : " + JSON.stringify(new Date())).catch((e) => { console.log(e); });

      res.send(JSON.stringify({ message: "done" }));
    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_post_stylingFormFile): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ message: "error " + e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_responseInjection = function () {
  const instance = this;
  const bill = this.bill;
  const back = this.back;
  const { equalJson } = this.mother;
  let obj = {};
  obj.link = "/responseInjection";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.bilid === undefined || req.body.amount === undefined || req.body.name === undefined) {
        throw new Error("invalid post");
      }
      const selfMongo = instance.mongolocal;
      const { bilid, amount, name } = equalJson(req.body);
      let thisBill;
      let cliid, desid, proid, method;
      let client, designer, project;

      thisBill = await bill.getBillById(bilid, { selfMongo });
      if (thisBill === null) {
        throw new Error("invaild bilid");
      }
      ({ cliid, desid, proid, method } = thisBill.links);
      client = await back.getClientById(cliid, { selfMongo: instance.mongo });
      designer = await back.getDesignerById(desid, { selfMongo: instance.mongo });
      project = await back.getProjectById(proid, { selfMongo: instance.mongo });
  
      await bill.responseInjection(bilid, "generalConstructFee", client, designer, project, method, {
        customAmount: { amount: Number(amount) },
        consumerMode: false,
        customSub: { name },
        selfMongo
      });

      thisBill = await bill.getBillById(bilid, { selfMongo });
      res.send(JSON.stringify({ bill: thisBill }));
    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_post_responseInjection): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error" }));
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_calculationConsole = function () {
  const instance = this;
  const back = this.back;
  const { equalJson } = this.mother;
  let obj = {};
  obj.link = "/calculationConsole";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const selfMongo = instance.mongolocal;
      const selfCoreMongo = instance.mongo;
      const { mode } = req.body;
      const agoDateNumber = 28;
      let projects, clients, designers, bills;
      let ago;
      let preClients;

      if (mode === "init") {
        ago = new Date();
        ago.setDate(ago.getDate() - agoDateNumber);
        projects = await back.getProjectsByQuery({
          "process.contract.first.date": { $gte: ago }
        }, { selfMongo: selfCoreMongo });
      } else if (mode === "search") {
        const { value } = req.body;
        preClients = await back.getClientsByQuery({ name: { $regex: value.replace(/[\\]/g, '') } }, { selfMongo: selfCoreMongo });
        if (preClients.length === 0) {
          projects = [];
        } else {
          projects = await back.getProjectsByQuery({ $or: preClients.toNormal().map((c) => { return { cliid: c.cliid } }) }, { selfMongo: selfCoreMongo });
          projects = projects.filter((project) => {
            return project.process.contract.first.date.valueOf() > (new Date(2000, 0, 1)).valueOf();
          });
        }
      } else {
        projects = await back.getProjectsByQuery({
          "process.contract.first.date": { $gte: new Date(2000, 0, 1) }
        }, { selfMongo: selfCoreMongo });
      }

      projects.sort((a, b) => { return b.process.contract.first.date.valueOf() - a.process.contract.first.date.valueOf() });

      if (projects.length > 0) {

        clients = await back.getClientsByQuery({ $or: Array.from(new Set(projects.toNormal().map((p) => { return p.cliid }))).map((cliid) => { return { cliid } }) }, { selfMongo: selfCoreMongo });
        designers = await back.getDesignersByQuery({ $or: Array.from(new Set(projects.toNormal().map((p) => { return p.desid }))).map((desid) => { return { desid } }) }, { selfMongo: selfCoreMongo });
  
        bills = await back.mongoRead("generalBill", {
          $or: projects.toNormal().map((project) => { return { "links.proid": project.proid } })
        }, { selfMongo });
  
        res.send(JSON.stringify({ projects: projects.toNormal(), clients: clients.toNormal(), designers: designers.toNormal(), bills }));

      } else {

        res.send(JSON.stringify({ projects: [], clients: [], designers: [], bills: [] }));

      }

    } catch (e) {
      logger.error("Python 서버 문제 생김 (rou_post_calculationConsole): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error" }));
      console.log(e);
    }
  }
  return obj;
}


DataRouter.policy = function () {
  let text = '';
  text += "<b>개인정보 수집 및 이용 동의서</b><br><br>주식회사 홈리에종은 아래의 목적으로 수집, 이용하며 고객님의 소중한 개인정보를 보호함으로써 안심하고 법률서비스를 이용할 수 있도록 최선을 다합니다.<br><br>";
  text += "<b>개인정보 처리 방침</b><br><br><b>제1조 총칙</b><br><br>① 개인정보라 함은 생존하고 있는 개인에 관한 정보로써 성명, 주민등록번호 및 영상 등을 통하여 개인을 알아볼 수 있는 정보(해당 정보만으로는 특정 개인은 알아볼 수 없더라도 다른 정보와 쉽게 결합하여 알아볼 수 있는 것을 포함한다)를 말합니다.<br>";
  text += "② 개인정보 처리방침이란 회원의 개인정보를 보호함으로써 이용자가 안심하고 서비스를 이용할 수 있도록 홈리에종을 운영함에 있어 준수해야 할 지침을 의미합니다.<br>③ 홈리에종은 ‘정보통신망 ";
  text += "이용촉진 및 정보보호에 등에 관한 법률’과 ‘개인정보 보호법’ 및 관련 법령에 따라 개인정보 보호규정을 준수합니다.<br>④ 홈리에종은 회원(디자이너, 구매자)의 동의를 기반으로 개인정보를 수집, 이용 및 제공하고 있으며 회원의 권리(개인정보 자기결정권)를 적극적으로 보장합니다.";
  text += "<br>⑤ 개인정보 처리방침은 회원이 언제나 쉽게 열람할 수 있도록 홈리에종 웹사이트에 게시하며 개인정보 관련법령, 지침, 고시 또는 홈리에종의 서비스 정책의 변경에 따라 달라질 수 있습니다.<br><br><b>제2조 개인정보의 수집항목 및 목적</b><br><br>";
  text += "① 고객이 의뢰한 홈디자인 업무 수행 및 이와 관련하여 필요한 연락, 거래 관계의 설정과 유지와 이행과 관리, 분쟁해결, 민원 처리 및 기타 법령상 의무의 이행 홈리에종이 처리하고 있는 개인정보는 다음의 수집, 이용 목적 이외의 용도로는 활용되지 않으며, 수집, 이용목적이 변경되는 경우에는 개인정보보호법에 따라 별도의 동의를 받는 등의 필요한 조치를 이행합니다.";
  text += "<br>② 회원의 인권을 침해할 우려가 있는 민감한 정보(인증, 사상 및 신조, 정치적 성향이나 범죄기록, 의료정보 등)는 수집하지 않으며, 만약 법령에서 정한 의무가 따라 불가피하게 수집하는 경우에는 반드시 회원에게 사전동의를 받습니다.<br>③ 홈리에종은 다음과 같이 회원의 ";
  text += "개인정보를 수집합니다.<br>④ 회원 가입시, 문의사항 작성시 : 성명, 주소, E-mail, 연락처(전화번호), 비밀번호 이용자 식별을 통한 이용계약 이행 및 회원 상호간 계약체결을 위한 지원(문의사항에 대한 답변, 계약이행을 위한 연락, 구매자와 디자이너간 계약체결 지원, 회원간 정보 안내 등)";
  text += "<br>⑤ 상담 문의시 : 주거공간 특성 관련 정보(주거유형, 공간이미지, 공간면적, 주거공간 구성 등)<br>⑥ 디자이너 신청시 : 회사명, 사업자등록번호, 대표자이름, 개업일, 주소, 전화번호, 휴대전화번호, E-mail, Fax, 은행명, 예금주명, 계좌 번호 등";
  text += "디자이너 식별, 서비스 개설/제공, 각종 알림, 정산 등<br>⑦ 자동수집정보 : 기기정보, 로그정보, 위치정보, 애플리케이션번호, 로컬저장소 등 시스템 운영 관리<br>⑧ 개인정보의 이용목적<br>⑨ 회원관리 : 회원제 서비스 제공에 따른 개인식별, 가입의사 확인, 이용약관 위반 ";
  text += "회원에 대한 이용제한 조치, 가입 및 가입횟수 제한, 서비스 부정 이용 제재, 고충 처리 및 분쟁 조정을 위한 기록 보존, 고지사항 전달, 회원탈퇴 의사의 확인 등<br>⑩ 중개서비스 등 이용약관에 따른 서비스 제공(광고 포함) 및 서비스 개선 : 인구통계학적 분석, 서비스 방문 및 ";
  text += "이용기록의 분석, 개인정보 및 관심에 기반한 이용자간 관계의 형성, 지인 및 관심사 등에 기반한 맞춤형 서비스 제공 등 신규 서비스 요소의 발굴 및 기존 서비스 개선 등<br>⑪ 신규 서비스 개발 및 홍보 및 마케팅 광고에의 활용 : 홈디자인 서비스 정보 제공 목적, 신규 서비스 개발 및 맞춤 서비스 제공, 인구통계학적 ";
  text += "특성에 따른 서비스 제공 및 광고 게재, 서비스의 유효성 확인, 이벤트/광고성 정보 및 참여 기회 제공 등<br>⑫ 결제 시스템 제공 : 예약 및 요금 결제, 상품 및 서비스 제공 등<br>⑬ 정보보호 : 보안, 프라이버시, 안전 측면에서 이용자가 안심하고 이용할 수 있는 환경 ";
  text += "구축 등<br><br><b>제3조 개인정보 제3자 제공</b><br><br>① 홈리에종은 원칙적으로 회원의 동의 없이 개인정보를 제3자에게 제공하지 않으며 개인정보를 제3자에게 제공해야 하는 경우 법령에 따른 동의를 받고 있습니다.<br>② 홈리에종은 개인정보를  ‘개인정보 수집항목 ";
  text += "및 목적’에서 명시한 범위 내에서 사용하며 회원의 사전 동의 없이 개인정보 수집 이용 목적 범위를 초과하여 이용하거나 회원의 개인정보를 제공하지 않습니다.<br>③ 다만 아래와 같이 양질의 서비스 제공을 위해 이용자의 개인정보를 협력업체와 공유할 필요가 있는 경우 제공 ";
  text += "받는 자, 제공목적, 제공정보 항목, 이용 및 보유기간 등을 회원에게 고지하여 동의를 구하거나 관련법령에 따른 경우는 예외로 합니다.<br>④ 회원이 사전에 공개 또는 제3자 제공에 동의한 경우 : 대표적으로 구매자의 개인정보를 디자이너에게 제공하는 경우, 디자이너의 ";
  text += "개인정보를 구매자에게 제공하는 경우가 제3자제공의 예입니다. 디자이너의 개인정보는 일반적으로 회원을 포함한 제3자에게 공개되며(가입시 사전에 포괄적 제3자 제공동의를 받습니다.) 구매자의 개인정보는 디자이너의 물품(서비스) 구매결제가 완료된 이후 디자이너에게 제공됩니다.";
  text += "<br>⑤ 관계법령의 규정에 의거하거나, 수사목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우<br><br><b>제4조 개인정보 처리위탁</b><br><br>① 홈리에종은 서비스의 제공에 관한 계약을 이행하고 이용자의 편의증진 등을 위하여 개인정보를 타인에게 위탁 ";
  text += "처리할 수 있습니다. 타인에게 위탁업무를 하는 경우에는 다음의 내용을 이용자에게 알리고 동의를 받습니다. 다음의 내용에 대하여 어느 하나의 사항이 변경되는 경우에도 같습니다.<br>② 개인정보 처리위탁을 받는 자(이하 수탁자라 함)<br>③ 개인정보 처리위탁을 하는 업무의 내용";
  text += "<br>④ 홈리에종은 아래와 같이 개인정보를 위탁하고 있으며, 개인정보의 수탁자와 위탁업무의 범위는 아래와 같습니다.<br>⑤ PG사 : ㈜이니시스(결제대행 서비스 제공)<br>⑥ E-mail 및 문자 발송 : widsign, 알리고(서비스 운영관련 알림 및 정보 제공)<br>⑦ ";
  text += "배송대행업체 : 업체명(홈리에종이 직접 판매한 물품의 배송 위탁)<br><br><b>제5조 개인정보의 보유 및 이용기간</b><br><br>홈리에종의 개인 정보 보유 기간은 위임업무 종료 시 또는 목적 달성 시 또는 정부 주체의 동의 철회 시까지입니다. 단, 관계 법령에 따라 파기하지 않고 보존하여야 하는 경우에는 해당 기간까지 입니다.<br><br>① 홈리에종은 회원의 개인정보를 원칙적으로 보유/이용기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 ";
  text += "개인정보를 파기합니다.<br>② 원으로부터 동의받은 개인정보 보유기간이 경과하거나 처리목적이 달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는 경우에는 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.<br>③ ";
  text += "홈리에종은 1년동안 회사의 서비스를 이용하지 않은 회원의 개인정보는 ‘정보통신망 이용촉진 및 정보보호 등에 관한 법률 제 29조’에 근거하여 회원에게 사전통지하고 개인정보를 파기하거나 별도로 분리하여 저장합니다.(회사는 개인정보가 파기되거나 분리되어 저장/관리된다는 ";
  text += "사실, 서비스 미이용기간 만료일, 해당 개인정보의 항목을 E-mail 등의 방법으로 미이용기간 30일전에 회원에게 알립니다. 이를 위해 회원은 회사에게 정확한 연락처 정보를 알리거나 수정해야 합니다.<br>④ 관련 법률에 따른 정보보유 사유는 아래와 같습니다. 서비스 결제 ";
  text += "및 정산 발생시 관련 법률에 따라 개인정보를 포함한 결제, 정산 관련 정보가 5년간 보관이 됩니다.<br>⑤ 전자상거래 등에서의 소비자 보호에 관한 법률<br>⑥ 계약 또는 청약철회 등에 관한 기록 : 5년<br>⑦ 대금결제 및 재화 등의 공급에 관한 기록 : 5년<br>⑧ 소비자의 ";
  text += "불만 또는 분쟁처리에 관한 기록 : 3년<br>⑨ 통신비밀보호법 - 로그인 기록 : 3개월<br>⑩ 조세 관련 법령 - 매출 관련 기록 : 5년<br>⑪ 개인정보 파기절차 – 회사는 파기사유가 발생한 개인정보를 개인정보 보호책임자의 승인 절차를 거쳐 파기합니다.<br>⑫ 개인정보 ";
  text += "파기방법 – 회사는 전자적 파일형태로 기록/저장된 개인정보는 기록을 재생할 수 없도록 기술적인 방법 또는 물리적인 방법을 이용하여 파기하며, 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각 등을 통하여 파기합니다.<br><br><b>제6조 개인정보의 수집 및 이용을 ";
  text += "거부할 권리</b><br><br>개인정보 주체는 개인정보의 수집 및 이용을 거부할 권리가 있으나, 서비스 제공을 위한 필수적인 개인정보는 그 수집이용 동의를 거부할 시 회원가입을 할 수 없습니다.<br><br><b>제7조 링크 사이트에 대한 책임</b><br><br>홈리에종은 ";
  text += "회원에게 다른 웹사이트에 대한 링크를 제공할 수 있습니다. 다만, 링크되어 있는 웹사이트들이 개인정보를 수집하는 행위에 대해서는 본 \“개인정보처리방침\”이 적용되지 않습니다.<br><br><b>제8조 회원 및 법정대리인의 권리</b><br><br>① 회원 및 법정 대리인은 ";
  text += "언제든지 등록되어 있는 자신의 개인정보를 조회하거나 수정, 탈퇴를 요청할 수 있습니다. 다만, 이 경우 서비스의 일부 또는 전체 이용에 제한이 있을 수 있습니다.<br>② 회원 및 법정 대리인의 개인정보 조회, 수정, 탈퇴는 홈리에종 웹사이트에서 가능하며, 회사는 ";
  text += "이에 대해 지체없이 조치하겠습니다.<br>③ 회원이 개인정보의 오류에 대한 정정을 요청한 경우에는 정정을 완료하기 전까지 해당 개인정보를 이용 또는 제공하지 않습니다. 또한 잘못된 개인정보를 제3자에게 이미 제공한 경우에는 정정 처리결과를 제3자에게 지체없이 ";
  text += "통지하여 정정이 이루어지도록 하겠습니다.<br>④ 회원은 자신의 개인정보를 최신의 상태로 유지해야 하며, 회원의 부정확한 정보 입력으로 발생하는 문제의 책인은 이용자 자신에게 있습니다.<br>⑤ 타인의 개인정보를 도용한 회원가입의 경우 회원자격을 상실하거나 관련 ";
  text += "개인정보보호 법령에 의해 처벌 받을 수 있습니다.<br>⑥ 회원은 E-mail, 비밀번호 등에 대한 보안을 유지할 책임이 있으며 제3자에게 이를 양도하거나 대여할 수 없습니다.<br>⑦ 회원 또는 법정대리인의 요청에 의해 해지 또는 삭제된 개인정보는 \“개인정보의 보유 ";
  text += "및 이용기간\”에 명시된 바에 따라 처리하고 그 외의 용도로 열람 또는 이용할 수 없도록 처리하고 있습니다.<br><br><b>제9조 개인정보의 기술적, 관리적 보호대책</b><br><br>① 회사는 회원을 개인정보를 처리함에 있어 개인정보가 분실, 도난, 유출, 변조, 훼손 ";
  text += "등이 되지 않도록 안전성을 확보하기 위하여 다음과 같이 기술적, 관리적 보호대책을 강구하고 있습니다.<br>② 비밀번호의 암호화 – 이용자의 비밀번호는 일방향 암호화하여 저장 및 관리되고 있으며, 개인정보의 확인/변경은 비밀번호를 알고 있는 본인에 의해서만 가능합니다.";
  text += "<br>③ 해킹 등에 대비한 대책 - 해킹, 컴퓨터 바이러스 등 정보통신망 침입에 의해 회원의 개인정보가 유출되거나 훼손되는 것을 막기 위해 최선을 다하고 있습니다.<br>④ 만일의 사태에 대비하여 침입차단 시스템을 이용하여 보안에 최선을 다하고 있습니다.<br>⑤ ";
  text += "민감한 개인정보는 암호화 통신 등을 통하여 네트워크상에서 개인정보를 안전하게 전손할 수 있도록 하고 있습니다.<br>⑥ 개인정보 처리 최소화 및 교육 – 개인정보 관련 처리 담당자를 최소한으로 제한하고 개인정보 처리자에 대한 교육 등 관리적 조치를 통해 법령 및 ";
  text += "내부방침 등의 준수를 강조하고 있습니다.<br>⑦ 개인정보보호 전담담당부서 운영 – 개인정보의 보호를 위해 개인정보보호 전담부서를 운영하고 있으며, 개인정보처리방침의 이행사항 및 담당자의 준수여부를 확인하여 문제가 발견 될 경우 즉시 해결하고 바로 잡을 수 있도록 ";
  text += "최선을 다하고 있습니다.<br><br><b>제10조 개인정보보호 책임자</b><br><br>① 홈리에종은 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자 및 개인정보보호 전담담당부서를 ";
  text += "지정하고 있습니다.<br>② 개인정보보호 책임자 이름 : 박혜연 연락처 : 02-2039-2252<br>③ 회원은 서비스 이용 중 발생한 모든 개인정보와 관련된 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자 및 개인정보보호 전담 담당부서로 문의할 수 있습니다.";
  text += "홈리에종은 이용자의 문의에 대해 최대한 빠른 시간 내에 답변 및 처리합니다.<br><br><b>제11조 기타 개인정보침해에 대한 신고 및 상담</b><br><br>① 회원은 아래의 기관에 개인정보 침해에 대한 피해구제, 상담 등을 문의할 수 있습니다. 아래의 기관은 정부기관";
  text += "소속으로서, 홈리에종의 자체적인 개인정보 불만처리 또는 개인정보 피해구제 결과가 만족스럽지 않을 경우, 구체적인 도움이 필요한 경우에 문의하시면 됩니다.<br>② 개인정보침해신고센터 : http://privacy.kisa.or.kr/kor/mail.jsp (국번없이) 118<br>";
  text += "③ 개인정보분쟁조정위원회 : http://www.kopico.go.kr 02-2100-2499<br>④ 대검찰청 사이버수사과 : http://www.spo.go.kr/spo/index.jsp (국번없이) 130<br>⑤ 경찰청 사이버안전국 : http://cyberbureau.police.go.kr/index.do ";
  text += "(국번없이) 182<br><br><b>제12조 고지의 의무</b><br><br>현 개인정보 처리방침은 법령, 정부의 정책 또는 회사 내부정책 등 필요에 의하여 변경될 수 있으며, 변경시에는 개정 최소 7일전부터 홈페이지의 ‘공지사항’을 통해 고지할 것입니다. 다만, 회원에게 불리한 ";
  text += "내용으로 변경하는 경우에는 최소 30일 전에 고지합니다.<br><br>귀하는 위의 개인정보 수집과 이용에 대해 동의를 거부할 권리가 있습니다. 그러나 동의를 거부할 경우 당사의 서비스 이용이 어려울 수 있습니다.";
  text = text.replace(/[\=\&]/g, '');
  return text;
}

DataRouter.policyButton = function () {
  let obj;
  obj = {};
  obj.off = '<svg xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 346.511 20.463"><rect width="346.511" height="20.463" fill="#FFF"/><path d="M29.108 10.848c-1.811-0.836-3.708-2.509-4.549-4.511 -0.604 2.156-2.63 4.07-4.808 5.127L18.5 9.835c2.868-1.254 4.98-3.718 4.98-6.931V0.946h2.07v1.87c0 3.234 2.458 5.61 4.744 6.403L29.108 10.848zM27.9 20.463c-4.226 0-6.748-1.54-6.748-4.005 0-2.464 2.522-4.004 6.748-4.004 4.248 0 6.77 1.54 6.77 4.004C34.67 18.923 32.148 20.463 27.9 20.463zM23.244 16.458c0 1.452 1.768 2.311 4.657 2.311 2.911 0 4.7-0.858 4.7-2.311s-1.789-2.31-4.7-2.31C25.011 14.148 23.244 15.006 23.244 16.458zM34.39 7.063v5.413h-2.026V0h2.026v5.347h2.997V7.063H34.39z" fill="#575757"/><path d="M48.792 2.179c-0.129 6.49-3.838 11.287-9.314 14.323l-1.25-1.584c4.744-2.311 7.999-6.579 8.366-11.001h-7.46V2.179H48.792zM52.63 20.463V0H54.656v20.463H52.63z" fill="#575757"/><path d="M71.473 2.509C71.408 8.56 68.972 12.938 64.077 16.282l-1.38-1.519c4.14-2.464 6.403-6.381 6.749-10.562h-5.865V2.509H71.473zM77.984 20.463V9.571h-2.35v9.88h-1.919V0.462h1.919v7.415h2.35V0h1.962v20.463H77.984z" fill="#575757"/><path d="M93.464 6.469c0 2.948-2.264 4.995-5.347 4.995 -3.083 0-5.347-2.047-5.347-4.973 0-2.949 2.264-5.105 5.347-5.105C91.2 1.386 93.464 3.542 93.464 6.469zM84.904 6.447c0 1.892 1.315 3.278 3.212 3.278 1.962 0 3.213-1.364 3.213-3.257 0-1.937-1.25-3.322-3.213-3.322C86.22 3.146 84.904 4.555 84.904 6.447zM85.573 19.825v-6.381h2.027v4.708h11.621v1.673H85.573zM96.72 14.853V0h2.026v14.853H96.72z" fill="#575757"/><path d="M102.066 1.65h10.953v1.694h-4.377v0.682c0 2.904 2.523 5.215 4.787 5.919l-1.121 1.65c-1.79-0.727-3.838-2.509-4.679-4.379 -0.647 1.958-2.976 4.115-5.045 4.973l-1.143-1.628c2.609-0.968 5.131-3.631 5.131-6.491V3.345h-4.506V1.65zM111.401 20.463c-4.291 0-6.749-1.519-6.749-3.961s2.458-3.982 6.749-3.982c4.334 0 6.77 1.54 6.77 3.982S115.735 20.463 111.401 20.463zM106.723 16.502c0 1.431 1.747 2.267 4.679 2.267 2.976 0 4.7-0.836 4.7-2.267 0-1.43-1.725-2.266-4.7-2.266C108.469 14.236 106.723 15.072 106.723 16.502zM112.264 6.843V5.148h3.751V0h2.026v12.674h-2.026V6.843H112.264z" fill="#575757"/><path d="M130.913 12.233v4.027h8.085v1.693H120.887v-1.693h7.999v-4.027h-5.8V1.43h2.027v3.719h9.659v-3.719h2.027v10.804H130.913zM134.772 6.821h-9.659v3.718h9.659V6.821z" fill="#575757"/><path d="M151.2 19.759v-6.535c-1.962 0.088-3.751 0.11-5.476 0.132l-0.302-1.782c2.35 0 4.593-0.044 6.813-0.132 2.695-0.109 5.11-0.264 6.792-0.462l0.151 1.65c-1.509 0.198-3.816 0.374-5.951 0.484v6.645H151.2zM147.104 3.454h10.5v1.717h-4.269c0.366 1.848 2.781 3.036 4.851 3.19l-0.841 1.76c-2.048-0.33-4.226-1.54-5.024-2.948 -0.69 1.563-2.803 2.927-5.131 3.345l-0.927-1.694c2.307-0.308 4.657-1.606 5.002-3.652h-4.161V3.454zM149.54 0.484h5.563v1.716h-5.563V0.484zM160.148 20.463V0h2.027v20.463H160.148z" fill="#575757"/><path d="M180.673 0.924c0 2.663-0.237 5.413-0.647 7.459h3.04v1.694h-18.111V8.383h13.109c0.323-1.54 0.539-4.246 0.539-5.786h-11.276V0.924H180.673zM167.262 20.177v-8.383h2.027v2.508h9.422V11.75h2.026v8.427H167.262zM178.711 15.931h-9.422v2.574h9.422V15.931z" fill="#575757"/><path d="M184.92 10.892V1.056h2.026v3.301h5.391V1.034h2.026v9.857H184.92zM193.328 20.419c-4.247 0-6.619-1.562-6.619-3.961 0-2.42 2.372-3.982 6.619-3.982 4.313 0 6.663 1.584 6.663 3.982S197.576 20.419 193.328 20.419zM192.337 6.028h-5.391v3.191h5.391V6.028zM188.779 16.458c0 1.408 1.703 2.289 4.549 2.289 2.933 0 4.593-0.858 4.593-2.289 0-1.408-1.66-2.31-4.593-2.31C190.461 14.148 188.779 15.072 188.779 16.458zM199.754 6.909v5.412h-2.027V0h2.027v5.192h2.997v1.717H199.754z" fill="#575757"/><path d="M214.694 11.728c-1.682-0.528-4.031-2.09-4.959-3.916 -0.668 1.848-2.716 3.74-4.915 4.51l-1.121-1.628c2.565-0.814 4.722-2.816 4.98-5.347h-4.291V3.652h10.953v1.694h-4.55c0.323 2.486 2.76 4.181 4.959 4.753L214.694 11.728zM206.911 20.177v-6.953h13.109v6.953H206.911zM207.084 2.156V0.462h5.434V2.156H207.084zM217.993 14.874h-9.055v3.652h9.055V14.874zM217.993 12.102V0h2.027v12.102H217.993z" fill="#575757"/><path d="M232.05 7.987h1.94V0.396h1.94v19.1h-1.94V9.682h-1.94c-0.193 3.63-1.639 6.271-4.398 6.271 -2.996 0-4.42-3.103-4.42-7.195 0-4.07 1.424-7.15 4.42-7.15C230.455 1.606 231.878 4.313 232.05 7.987zM227.651 3.366c-1.595 0-2.414 2.223-2.414 5.413s0.819 5.413 2.414 5.413c1.617 0 2.437-2.223 2.437-5.413S229.269 3.366 227.651 3.366zM237.872 20.463V0H239.813v20.463H237.872z" fill="#575757"/><path d="M257.707 7.723v2.442h8.063v1.673h-18.111v-1.673h8.021V7.723h-5.843V0.814h13.583v1.694h-11.557v3.52h11.708v1.694H257.707zM256.715 20.463c-4.398 0-6.921-1.364-6.921-3.652 0-2.244 2.522-3.631 6.921-3.631s6.921 1.32 6.921 3.631S261.113 20.463 256.715 20.463zM251.885 16.832c0 1.255 1.854 1.959 4.83 1.959 2.997 0 4.852-0.704 4.852-1.959 0-1.254-1.854-1.979-4.852-1.979C253.739 14.853 251.885 15.578 251.885 16.832z" fill="#575757"/><path d="M280.474 15.271c-1.833 0.241-4.786 0.439-7.33 0.571 -2.286 0.11-4.398 0.154-5.994 0.177l-0.323-1.761c1.919 0 4.269-0.021 6.641-0.154 2.824-0.109 5.196-0.264 6.791-0.462L280.474 15.271zM273.401 11.111c-2.953 0-5.217-1.892-5.217-4.664 0-2.816 2.285-4.819 5.217-4.819 2.976 0 5.262 1.893 5.262 4.819C278.663 9.285 276.334 11.111 273.401 11.111zM273.401 3.366c-1.768 0-3.212 1.299-3.212 3.059 0 1.761 1.444 2.948 3.212 2.948 1.747 0 3.256-1.166 3.256-2.948C276.657 4.555 275.213 3.366 273.401 3.366zM283.557 0v20.463h-2.005V0H283.557z" fill="#575757"/><path d="M286.144 4.709V3.08h11.664v1.629H286.144zM292.072 12.124c-2.781 0-4.636-1.32-4.636-3.279 0-2.002 1.854-3.3 4.636-3.3 2.76 0 4.636 1.298 4.636 3.3C296.708 10.781 294.832 12.124 292.072 12.124zM289.011 20.243v-7.394h2.026v2.003h8.689V12.828h2.005v7.415H289.011zM289.141 1.826V0.176h5.691v1.65H289.141zM292.072 7.107c-1.423 0-2.651 0.682-2.651 1.737 0 1.034 1.25 1.717 2.651 1.717s2.631-0.683 2.631-1.717C294.703 7.789 293.474 7.107 292.072 7.107zM299.727 16.502h-8.689v2.068h8.689V16.502zM301.731 7.481v4.334h-2.005V0h2.005v5.765h2.997v1.717H301.731z" fill="#575757"/><path d="M318.332 14.412c-2.35 0.594-6.855 0.946-9.702 0.99h-1.875V2.134h2.026v11.486c2.651 0 6.985-0.33 9.293-0.88L318.332 14.412zM321.977 20.463h-2.006V0h2.006V20.463z" fill="#575757"/><path d="M328.552 13.729c2.63 0 6.316-0.197 8.344-0.66l0.237 1.694c-2.092 0.44-5.541 0.683-9.186 0.704h-2.242V2.156h9.466v1.694h-7.46v9.879H328.552zM340.323 7.987h3.127V9.703h-3.127v10.76h-2.005V0h2.005V7.987z" fill="#575757"/><path d="M344.29 16.084h2.221v2.289h-2.221V16.084z" fill="#575757"/><circle cx="4.604" cy="10.231" r="4.604" fill="#ECECEC"/></svg>';
  obj.on = '<svg xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 346.511 20.463"><rect width="346.511" height="20.463" fill="#FFF"/><path d="M29.108 10.848c-1.811-0.836-3.708-2.509-4.549-4.511 -0.604 2.156-2.63 4.07-4.808 5.127L18.5 9.835c2.868-1.254 4.98-3.718 4.98-6.931V0.946h2.07v1.87c0 3.234 2.458 5.61 4.744 6.403L29.108 10.848zM27.9 20.463c-4.226 0-6.748-1.54-6.748-4.005 0-2.464 2.522-4.004 6.748-4.004 4.248 0 6.77 1.54 6.77 4.004C34.67 18.923 32.148 20.463 27.9 20.463zM23.244 16.458c0 1.452 1.768 2.311 4.657 2.311 2.911 0 4.7-0.858 4.7-2.311s-1.789-2.31-4.7-2.31C25.011 14.148 23.244 15.006 23.244 16.458zM34.39 7.063v5.413h-2.026V0h2.026v5.347h2.997V7.063H34.39z" fill="#9bbdd1"/><path d="M48.792 2.179c-0.129 6.49-3.838 11.287-9.314 14.323l-1.25-1.584c4.744-2.311 7.999-6.579 8.366-11.001h-7.46V2.179H48.792zM52.63 20.463V0H54.656v20.463H52.63z" fill="#9bbdd1"/><path d="M71.473 2.509C71.408 8.56 68.972 12.938 64.077 16.282l-1.38-1.519c4.14-2.464 6.403-6.381 6.749-10.562h-5.865V2.509H71.473zM77.984 20.463V9.571h-2.35v9.88h-1.919V0.462h1.919v7.415h2.35V0h1.962v20.463H77.984z" fill="#9bbdd1"/><path d="M93.464 6.469c0 2.948-2.264 4.995-5.347 4.995 -3.083 0-5.347-2.047-5.347-4.973 0-2.949 2.264-5.105 5.347-5.105C91.2 1.386 93.464 3.542 93.464 6.469zM84.904 6.447c0 1.892 1.315 3.278 3.212 3.278 1.962 0 3.213-1.364 3.213-3.257 0-1.937-1.25-3.322-3.213-3.322C86.22 3.146 84.904 4.555 84.904 6.447zM85.573 19.825v-6.381h2.027v4.708h11.621v1.673H85.573zM96.72 14.853V0h2.026v14.853H96.72z" fill="#9bbdd1"/><path d="M102.066 1.65h10.953v1.694h-4.377v0.682c0 2.904 2.523 5.215 4.787 5.919l-1.121 1.65c-1.79-0.727-3.838-2.509-4.679-4.379 -0.647 1.958-2.976 4.115-5.045 4.973l-1.143-1.628c2.609-0.968 5.131-3.631 5.131-6.491V3.345h-4.506V1.65zM111.401 20.463c-4.291 0-6.749-1.519-6.749-3.961s2.458-3.982 6.749-3.982c4.334 0 6.77 1.54 6.77 3.982S115.735 20.463 111.401 20.463zM106.723 16.502c0 1.431 1.747 2.267 4.679 2.267 2.976 0 4.7-0.836 4.7-2.267 0-1.43-1.725-2.266-4.7-2.266C108.469 14.236 106.723 15.072 106.723 16.502zM112.264 6.843V5.148h3.751V0h2.026v12.674h-2.026V6.843H112.264z" fill="#9bbdd1"/><path d="M130.913 12.233v4.027h8.085v1.693H120.887v-1.693h7.999v-4.027h-5.8V1.43h2.027v3.719h9.659v-3.719h2.027v10.804H130.913zM134.772 6.821h-9.659v3.718h9.659V6.821z" fill="#9bbdd1"/><path d="M151.2 19.759v-6.535c-1.962 0.088-3.751 0.11-5.476 0.132l-0.302-1.782c2.35 0 4.593-0.044 6.813-0.132 2.695-0.109 5.11-0.264 6.792-0.462l0.151 1.65c-1.509 0.198-3.816 0.374-5.951 0.484v6.645H151.2zM147.104 3.454h10.5v1.717h-4.269c0.366 1.848 2.781 3.036 4.851 3.19l-0.841 1.76c-2.048-0.33-4.226-1.54-5.024-2.948 -0.69 1.563-2.803 2.927-5.131 3.345l-0.927-1.694c2.307-0.308 4.657-1.606 5.002-3.652h-4.161V3.454zM149.54 0.484h5.563v1.716h-5.563V0.484zM160.148 20.463V0h2.027v20.463H160.148z" fill="#9bbdd1"/><path d="M180.673 0.924c0 2.663-0.237 5.413-0.647 7.459h3.04v1.694h-18.111V8.383h13.109c0.323-1.54 0.539-4.246 0.539-5.786h-11.276V0.924H180.673zM167.262 20.177v-8.383h2.027v2.508h9.422V11.75h2.026v8.427H167.262zM178.711 15.931h-9.422v2.574h9.422V15.931z" fill="#9bbdd1"/><path d="M184.92 10.892V1.056h2.026v3.301h5.391V1.034h2.026v9.857H184.92zM193.328 20.419c-4.247 0-6.619-1.562-6.619-3.961 0-2.42 2.372-3.982 6.619-3.982 4.313 0 6.663 1.584 6.663 3.982S197.576 20.419 193.328 20.419zM192.337 6.028h-5.391v3.191h5.391V6.028zM188.779 16.458c0 1.408 1.703 2.289 4.549 2.289 2.933 0 4.593-0.858 4.593-2.289 0-1.408-1.66-2.31-4.593-2.31C190.461 14.148 188.779 15.072 188.779 16.458zM199.754 6.909v5.412h-2.027V0h2.027v5.192h2.997v1.717H199.754z" fill="#9bbdd1"/><path d="M214.694 11.728c-1.682-0.528-4.031-2.09-4.959-3.916 -0.668 1.848-2.716 3.74-4.915 4.51l-1.121-1.628c2.565-0.814 4.722-2.816 4.98-5.347h-4.291V3.652h10.953v1.694h-4.55c0.323 2.486 2.76 4.181 4.959 4.753L214.694 11.728zM206.911 20.177v-6.953h13.109v6.953H206.911zM207.084 2.156V0.462h5.434V2.156H207.084zM217.993 14.874h-9.055v3.652h9.055V14.874zM217.993 12.102V0h2.027v12.102H217.993z" fill="#9bbdd1"/><path d="M232.05 7.987h1.94V0.396h1.94v19.1h-1.94V9.682h-1.94c-0.193 3.63-1.639 6.271-4.398 6.271 -2.996 0-4.42-3.103-4.42-7.195 0-4.07 1.424-7.15 4.42-7.15C230.455 1.606 231.878 4.313 232.05 7.987zM227.651 3.366c-1.595 0-2.414 2.223-2.414 5.413s0.819 5.413 2.414 5.413c1.617 0 2.437-2.223 2.437-5.413S229.269 3.366 227.651 3.366zM237.872 20.463V0H239.813v20.463H237.872z" fill="#9bbdd1"/><path d="M257.707 7.723v2.442h8.063v1.673h-18.111v-1.673h8.021V7.723h-5.843V0.814h13.583v1.694h-11.557v3.52h11.708v1.694H257.707zM256.715 20.463c-4.398 0-6.921-1.364-6.921-3.652 0-2.244 2.522-3.631 6.921-3.631s6.921 1.32 6.921 3.631S261.113 20.463 256.715 20.463zM251.885 16.832c0 1.255 1.854 1.959 4.83 1.959 2.997 0 4.852-0.704 4.852-1.959 0-1.254-1.854-1.979-4.852-1.979C253.739 14.853 251.885 15.578 251.885 16.832z" fill="#9bbdd1"/><path d="M280.474 15.271c-1.833 0.241-4.786 0.439-7.33 0.571 -2.286 0.11-4.398 0.154-5.994 0.177l-0.323-1.761c1.919 0 4.269-0.021 6.641-0.154 2.824-0.109 5.196-0.264 6.791-0.462L280.474 15.271zM273.401 11.111c-2.953 0-5.217-1.892-5.217-4.664 0-2.816 2.285-4.819 5.217-4.819 2.976 0 5.262 1.893 5.262 4.819C278.663 9.285 276.334 11.111 273.401 11.111zM273.401 3.366c-1.768 0-3.212 1.299-3.212 3.059 0 1.761 1.444 2.948 3.212 2.948 1.747 0 3.256-1.166 3.256-2.948C276.657 4.555 275.213 3.366 273.401 3.366zM283.557 0v20.463h-2.005V0H283.557z" fill="#9bbdd1"/><path d="M286.144 4.709V3.08h11.664v1.629H286.144zM292.072 12.124c-2.781 0-4.636-1.32-4.636-3.279 0-2.002 1.854-3.3 4.636-3.3 2.76 0 4.636 1.298 4.636 3.3C296.708 10.781 294.832 12.124 292.072 12.124zM289.011 20.243v-7.394h2.026v2.003h8.689V12.828h2.005v7.415H289.011zM289.141 1.826V0.176h5.691v1.65H289.141zM292.072 7.107c-1.423 0-2.651 0.682-2.651 1.737 0 1.034 1.25 1.717 2.651 1.717s2.631-0.683 2.631-1.717C294.703 7.789 293.474 7.107 292.072 7.107zM299.727 16.502h-8.689v2.068h8.689V16.502zM301.731 7.481v4.334h-2.005V0h2.005v5.765h2.997v1.717H301.731z" fill="#9bbdd1"/><path d="M318.332 14.412c-2.35 0.594-6.855 0.946-9.702 0.99h-1.875V2.134h2.026v11.486c2.651 0 6.985-0.33 9.293-0.88L318.332 14.412zM321.977 20.463h-2.006V0h2.006V20.463z" fill="#9bbdd1"/><path d="M328.552 13.729c2.63 0 6.316-0.197 8.344-0.66l0.237 1.694c-2.092 0.44-5.541 0.683-9.186 0.704h-2.242V2.156h9.466v1.694h-7.46v9.879H328.552zM340.323 7.987h3.127V9.703h-3.127v10.76h-2.005V0h2.005V7.987z" fill="#9bbdd1"/><path d="M344.29 16.084h2.221v2.289h-2.221V16.084z" fill="#9bbdd1"/><circle cx="4.604" cy="10.231" r="4.604" fill="#9bbdd1"/></svg>';
  return obj;
}


DataRouter.prototype.rou_post_ghostClient_updateAnalytics = function () {
  const instance = this;
  const back = this.back;
  const { equalJson, ipParsing } = this.mother;
  let obj = {};
  obj.link = [ "/ghostClient_updateAnalytics" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.mode === undefined || req.body.cliid === undefined || req.body.page === undefined) {
        throw new Error("invaild post");
      }
      const { mode, cliid, page } = req.body;
      const ip = String(req.headers['x-forwarded-for'] === undefined ? req.socket.remoteAddress : req.headers['x-forwarded-for']).trim().replace(/[^0-9\.]/gi, '');
      const rawUserAgent = req.useragent;
      const { source: userAgent, browser, os, platform } = rawUserAgent;
      const referrer = (req.headers.referer === undefined ? "" : req.headers.referer);
      let whereQuery, updateQuery;
      let history;
      let update;
      let image;
      let ipObj;

      whereQuery = { cliid };
      history = await back.getHistoryById("client", cliid, { selfMongo: instance.mongolocal });
      if (history === null) {
        await back.createHistory("client", { cliid }, { selfMongo: instance.mongolocal, secondMongo: instance.mongo });
        history = await back.getHistoryById("client", cliid, { selfMongo: instance.mongolocal });
      }

      if (mode === "page") {

        ipObj = await ipParsing(ip);
        if (Object.keys(ipObj).length === 0) {
          ipObj = { ip };
        }

        history.curation.analytics.page.push({ page, date: new Date(), referrer, userAgent, browser, os, platform, mobile: rawUserAgent.isMobile, ...ipObj });
        updateQuery = {};
        updateQuery["curation.analytics.page"] = history.curation.analytics.page;
        await back.updateHistory("client", [ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });

      } else if (mode === "update") {

        update = equalJson(req.body.update);
        history.curation.analytics.update.push({ page, date: new Date(), update });
        updateQuery = {};
        updateQuery["curation.analytics.update"] = history.curation.analytics.update;
        await back.updateHistory("client", [ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });

        if (req.body.updateQuery !== undefined) {
          const { history: historyQuery, core: coreQuery } = equalJson(req.body.updateQuery);
          if (historyQuery !== null && typeof historyQuery === "object" && Object.keys(historyQuery).length > 0) {
            await back.updateHistory("client", [ whereQuery, historyQuery ], { selfMongo: instance.mongolocal });
          }
          if (coreQuery !== null && typeof coreQuery === "object" && Object.keys(coreQuery).length > 0) {
            await back.updateClient([ { cliid }, coreQuery ], { selfMongo: instance.mongo });
          }
        }

      } else if (mode === "submit") {

        history.curation.analytics.submit.push({ page, date: new Date() });
        updateQuery = {};
        updateQuery["curation.analytics.submit"] = history.curation.analytics.submit;
        await back.updateHistory("client", [ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });

      } else if (mode === "image") {

        image = equalJson(req.body.image);
        updateQuery = {};
        updateQuery["curation.image"] = image;
        await back.updateHistory("client", [ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });

      } else {
        throw new Error("invaild mode");
      }

      res.send(JSON.stringify({ message: "done" }));

    } catch (e) {
      await logger.error("Console 서버 문제 생김 (rou_post_ghostClient_updateAnalytics) : " + e.message);
      console.log(e);
    }
  }
  return obj;
}


DataRouter.prototype.rou_post_designerProposal_submit = function () {
  const instance = this;
  const { requestSystem, messageSend } = this.mother;
  const back = this.back;
  const address = this.address;
  let obj = {};
  obj.link = "/designerProposal_submit";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      let { cliid, proid, desid, name, phone, designer, method } = req.body;
      let thisProject, thisClient, requestNumber;
      let action;

      thisProject = await back.getProjectById(proid, { selfMongo: instance.mongo });
      thisClient = await back.getClientById(cliid, { selfMongo: instance.mongo });
      requestNumber = 0;
      for (let i = 0; i < thisClient.requests.length; i++) {
        if (thisClient.requests[i].request.timeline.valueOf() <= thisProject.proposal.date.valueOf()) {
          requestNumber = i;
          break;
        }
      }
      action = "디자이너 선택";

      await requestSystem("https://" + address.officeinfo.host + ":3002/createStylingBill", { proid, desid }, { headers: { "Content-Type": "application/json" } });
      await back.updateProject([ { proid }, { "service.online": (method === "online") } ], { selfMongo: instance.mongo });

      messageSend({ text: `${name} 고객님이 ${designer} 디자이너를 선택하셨어요.`, channel: "#400_customer", voice: true }).then(() => {
        let updateObj;
        updateObj = {};
        updateObj["requests." + String(requestNumber) + ".analytics.response.action"] = action;
        return back.updateClient([ { cliid }, updateObj ], { selfMongo: instance.mongo });
      }).catch((err) => {
        logger.error({ text: "Console 서버 문제 생김 (designerProposal_submit) : " + err.message, channel: "#error_log" }).catch((e) => { console.log(e); });
      });

      await instance.kakao.sendTalk("designerSelect", name, phone, {
        client: name,
        designer: designer,
        host: address.frontinfo.host,
        cliid: cliid,
        needs: ("style," + desid + "," + proid + "," + method),
      });

      res.send(JSON.stringify({ index: 0 }));
    } catch (e) {
      await logger.error("Console 서버 문제 생김 (designerProposal_submit) : " + e.message);
      res.send(JSON.stringify({ message: "error" }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_designerProposal_policy = function () {
  const instance = this;
  const { equalJson } = this.mother;
  const back = this.back;
  const address = this.address;
  let obj = {};
  obj.link = "/designerProposal_policy";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      let resultObj;
      resultObj = {
        policy: DataRouter.policy(),
        button: DataRouter.policyButton(),
      };
      res.send(JSON.stringify(resultObj));
    } catch (e) {
      await logger.error("Console 서버 문제 생김 (rou_post_designerProposal_policy): " + e.message);
      res.send(JSON.stringify({
        policy: DataRouter.policy(),
        button: DataRouter.policyButton(),
      }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_designerProposal_getDesigners = function () {
  const instance = this;
  const { equalJson } = this.mother;
  const back = this.back;
  const work = this.work;
  let obj = {};
  obj.link = "/designerProposal_getDesigners";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.whereQuery === undefined || req.body.proid === undefined) {
        throw new Error("invaild post");
      }
      const { whereQuery, proid } = equalJson(req.body);
      const thisProject = await back.getProjectById(proid, { selfMongo: instance.mongo });
      const designers = await back.getDesignersByQuery(whereQuery, { withTools: true, selfMongo: instance.mongo });
      let designersNormal;
      let designerNormal;
      let realtime;
      let thisDesigner;
      let designerMode;

      designerMode = false;
      if (req.body.designerMode !== undefined) {
        if (req.body.designerMode === 1 || req.body.designerMode === '1') {
          designerMode = true;
        }
      }

      if (!designerMode) {
        designersNormal = [];
        for (let { desid } of thisProject.proposal.detail) {
          thisDesigner = designers.find((d) => { return d.desid === desid });
          realtime = await work.realtimeDesignerMatch(desid, proid, { selfMongo: instance.mongo, selfConsoleMongo: instance.mongolocal });
          designerNormal = thisDesigner.toNormal();
          designerNormal.end = !realtime.result;
          designersNormal.push(designerNormal);
        }
        res.send(JSON.stringify(designersNormal));
      } else {
        designersNormal = [];
        for (let { desid } of designers) {
          thisDesigner = designers.find((d) => { return d.desid === desid });
          designerNormal = thisDesigner.toNormal();
          designerNormal.end = false;
          designersNormal.push(designerNormal);
        }
        res.send(JSON.stringify(designersNormal));
      }

    } catch (e) {
      await logger.error("Console 서버 문제 생김(designerProposal_getDesigners) : " + e.message);
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}


DataRouter.prototype.rou_post_styleCuration_getPhotos = function () {
  const instance = this;
  const back = this.back;
  const { equalJson } = this.mother;
  let obj = {};
  obj.link = "/styleCuration_getPhotos";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const selfMongo = instance.mongo;
      const contentsArr = await back.getContentsArrByQuery({}, { selfMongo });
      const designers = await back.getDesignersByQuery({}, { selfMongo });
      const exceptionList = [
        "t16a41.jpg",
        "t1p36.jpg",
        "t1a33.jpg",
        "t1a20.jpg",
        "t2a33.jpg",
        "t5a27.jpg",
        "t8p9.jpg",
        "t13a27.jpg",
        "t19a41.jpg",
        "t1p12.jpg",
        "t9a37.jpg"
      ];

      let photos, sendingDesigners, temp;

      photos = contentsArr.getAllPhotos();
      sendingDesigners = [];
      for (let designer of designers) {
        temp = designer.toNormal();
        temp.tendency = designer.analytics.styling.tendency.toMatrix();
        sendingDesigners.push(temp);
      }
      for (let obj of photos) {
        for (let designer of designers) {
          if (obj.desid === designer.desid) {
            obj.tendency = designer.analytics.styling.tendency.toMatrix();
            break;
          }
        }
      }
      photos = photos.filter((obj) => { return !/before/gi.test(obj.room) && !/withdesigner/gi.test(obj.room) && !exceptionList.includes(obj.file) });
      photos = photos.map((obj) => {
        obj.keywords = obj.keywords.filter((s) => { return !/아파트/gi.test(s) && !/거주중/gi.test(s) && !/아기/gi.test(s) && !/아이/gi.test(s) && !/부부/gi.test(s) && !/가족/gi.test(s) && !/소품/gi.test(s) && !/거실/gi.test(s) && !/주방/gi.test(s) && !/신축/gi.test(s) && !/서재/gi.test(s) && !/톤앤/gi.test(s) && !/스타일링/gi.test(s) && !/조명/gi.test(s) && !/오피스텔/gi.test(s) && !/홈스타일링/gi.test(s) && !/홈퍼니싱/gi.test(s) && !/토탈/gi.test(s) && !/인테리어/gi.test(s) && !/인가구/gi.test(s) && !/다이닝/gi.test(s) && !/깔끔/gi.test(s) && !/인스타/gi.test(s) && !/아이/gi.test(s); });
        return obj;
      });
      photos = photos.filter((obj) => { return !obj.tendency.every((num) => { return num === 0; }); });

      res.send(JSON.stringify({ photos, contentsArr, designers: sendingDesigners }));
    } catch (e) {
      await logger.error("GhostClient 서버 문제 생김 (rou_post_styleCuration_getPhotos): " + e.message);
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_styleCuration_updateCalculation = function () {
  const instance = this;
  const back = this.back;
  const work = this.work;
  const address = this.address;
  const { equalJson, requestSystem, messageSend, serviceParsing, sleep } = this.mother;
  let obj = {};
  obj.link = "/styleCuration_updateCalculation";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.cliid === undefined || req.body.historyQuery === undefined || req.body.coreQuery === undefined || req.body.mode === undefined) {
        throw new Error("invaild post");
      }
      const passPromise = () => { return new Promise((resolve, reject) => { resolve(null); }); }
      const cliid = req.body.cliid;
      const historyQuery = equalJson(req.body.historyQuery);
      const coreQuery = equalJson(req.body.coreQuery);
      const mode = req.body.mode;
      let client, history;

      if (DataRouter.timeouts["styleCuration_styleCheckComplete_" + cliid] !== undefined && DataRouter.timeouts["styleCuration_styleCheckComplete_" + cliid] !== null) {
        clearTimeout(DataRouter.timeouts["styleCuration_styleCheckComplete_" + cliid]);
        DataRouter.timeouts["styleCuration_styleCheckComplete_" + cliid] = null;
      }

      if (DataRouter.timeouts["styleCuration_pageInitComplete_" + cliid] !== undefined && DataRouter.timeouts["styleCuration_pageInitComplete_" + cliid] !== null) {
        clearTimeout(DataRouter.timeouts["styleCuration_pageInitComplete_" + cliid]);
        DataRouter.timeouts["styleCuration_pageInitComplete_" + cliid] = null;
      }

      history = await back.getHistoryById("client", cliid, { selfMongo: instance.mongolocal });
      if (history === null) {
        await back.createHistory("client", { cliid }, { selfMongo: instance.mongolocal, secondMongo: instance.mongo });
      }

      if (Object.keys(coreQuery).length > 0) {
        await back.updateClient([ { cliid }, coreQuery ], { selfMongo: instance.mongo });
      }

      if (Object.keys(historyQuery).length > 0) {
        await back.updateHistory("client", [ { cliid }, historyQuery ], { selfMongo: instance.mongolocal });
        history = await back.getHistoryById("client", cliid, { selfMongo: instance.mongolocal });
      }

      const clientCase = await back.getCaseProidById(cliid, { selfMongo: instance.mongo });
      if (clientCase === null) {
        throw new Error("invaild client case");
      } else {
        const service = clientCase.caseService();
        let detailUpdate, updateQuery;
        let newProid;
        let requestNumber;
        let action;
        let targetSerid;

        client = clientCase.client;
        requestNumber = 0;

        if ([ "부재중 알림 발송", "상세 설문 대기" ].includes(client.requests[requestNumber].analytics.response.action.value)) {
          action = "부재중 제안 발송";
        } else {
          action = "제안 발송 예정";
        }

        detailUpdate = [];
        updateQuery = {};
        newProid = null;

        targetSerid = (req.body.fromConsole !== undefined && Number(req.body.fromConsole) === 1) ? [ client.requests[requestNumber].analytics.response.service.serid ] : history.curation.service.serid;

        work.designerCuration(cliid, 4, targetSerid, { selfMongo: instance.mongo, selfLocalMongo: instance.mongolocal }).then((detail) => {
          for (let obj of detail) {
            detailUpdate.push(obj);
          }

          updateQuery["desid"] = "";
          updateQuery["proposal.status"] = "작성중";
          updateQuery["proposal.date"] = new Date();
          updateQuery["cliid"] = cliid;
          updateQuery["service.serid"] = targetSerid[0];
          if (service === null) {
            updateQuery["service.xValue"] = "B";
          } else {
            if (typeof service === "object") {
              if (Array.isArray(service.xValue)) {
                updateQuery["service.xValue"] = (service.xValue.length === 0 ? "B" : service.xValue[0].xValue);
                if (client.requests[requestNumber].analytics.response.service !== null && typeof client.requests[requestNumber].analytics.response.service.xValue === "string") {
                  updateQuery["service.xValue"] = client.requests[requestNumber].analytics.response.service.xValue;
                }
              } else {
                updateQuery["service.xValue"] = "B";
              }
            } else {
              updateQuery["service.xValue"] = "B";
            }
          }
          updateQuery["service.online"] = false;
          updateQuery["proposal.detail"] = detailUpdate;
          return back.getProjectsByQuery({ cliid }, { selfMongo: instance.mongo });

        }).then((rows) => {

          if (detailUpdate.length > 0) {
            if (rows.length > 0 && rows[0].desid === "") {
              newProid = rows[0].proid;
              return back.updateProject([ { proid: newProid }, updateQuery ], { selfMongo: instance.mongo });
            } else {
              return back.createProject(updateQuery, { selfMongo: instance.mongo });
            }
          } else {
            return passPromise();
          }

        }).then((proid) => {

          if (newProid === null) {
            newProid = proid;
          }
          return requestSystem("https://" + address.officeinfo.host + ":3002/updateLog", {
            id: cliid,
            column: "action",
            position: "requests." + String(requestNumber) + ".analytics.response.action",
            pastValue: client.requests[requestNumber].analytics.response.action.value,
            finalValue: action
          }, { headers: { "origin": "https://" + address.officeinfo.host, "Content-Type": "application/json" } });

        }).then(() => {

          return requestSystem("https://" + address.officeinfo.host + ":3002/generalMongo", {
            mode: "sse",
            db: "console",
            collection: "sse_clientCard",
            log: true,
            who: "autoBot",
            updateQuery: {
              cliid,
              requestNumber,
              mode: "action",
              from: client.requests[requestNumber].analytics.response.action.value,
              to: action,
              randomToken: Number(String((new Date()).valueOf()) + String(Math.round(Math.random() * 1000000))),
            }
          }, { headers: { "origin": "https://" + address.officeinfo.host, "Content-Type": "application/json" } });

        }).then(() => {

          if (Number(req.body.fromConsole) !== 1) {
            let updateObj, future, nextDate, nextNextDate;
            updateObj = {};
            updateObj["requests." + String(requestNumber) + ".analytics.response.action"] = action;
            nextDate = new Date();
            nextDate.setDate(nextDate.getDate() + 1);
            nextNextDate = new Date();
            nextNextDate.setDate(nextNextDate.getDate() + 2);
            if (client.requests[requestNumber].request.space.resident.living || client.requests[requestNumber].request.space.resident.expected.valueOf() <= nextNextDate.valueOf()) {
              updateObj["requests." + String(requestNumber) + ".request.space.resident.expected"] = nextDate;
              future = new Date();
              future.setDate(future.getDate() + serviceParsing({
                serid: updateQuery["service.serid"],
                xValue: updateQuery["service.xValue"],
                online: updateQuery["service.online"],
              }, true) + 1);
              updateObj["requests." + String(requestNumber) + ".analytics.date.space.movein"] = future;
            }

            return back.updateClient([ { cliid }, updateObj ], { selfMongo: instance.mongo });
          } else {
            return passPromise();
          }

        }).then(() => {

          if (detailUpdate.length > 0) {
            return messageSend({ text: client.name + " 고객님의 디자이너 추천서가 자동으로 제작되었습니다!", channel: "#404_curation", voice: false });
          } else {
            return messageSend({ text: client.name + " 고객님의 디자이너 추천서를 자동으로 제작하려 했으나 매칭되는 경우가 없어요!", channel: "#404_curation", voice: false });
          }

        }).catch((err) => {
          console.log(err);
          messageSend({ text: client.name + " 제안서 제작 문제 생김 " + err.message, channel: "#404_curation" }).catch((e) => { console.log(e) });
        });

        if (Number(req.body.fromConsole) !== 1) {
          
          await instance.kakao.sendTalk("curationComplete", client.name, client.phone, {
            client: client.name,
            cliid: client.cliid,
            host: instance.address.frontinfo.host,
            path: "about",
          });
          await messageSend({ text: client.name + " 고객님께 큐레이션 완료 알림톡을 보냈어요.", channel: "#404_curation" });
          requestSystem("https://" + instance.address.officeinfo.ghost.host + ":" + String(3000) + "/storeClientAnalytics", { fast: true }, { headers: { "Content-Type": "application/json" } }).then(() => {
            return sleep(10 * 1000);
          }).then(() => {
            return requestSystem("https://" + instance.address.officeinfo.ghost.host + ":" + String(3000) + "/analyticsToday", { report: 0 }, { headers: { "Content-Type": "application/json" } });
          }).catch((err) => { logger.error("GhostClient 서버 문제 생김 (rou_post_styleCuration_updateCalculation) : " + err.message).catch((err) => { console.log(err) }) });

        }

        res.send(JSON.stringify({ service: [], client: client.toNormal(), history }));

      }
    } catch (e) {
      await logger.error("GhostClient 서버 문제 생김 (rou_post_styleCuration_updateCalculation) : " + e.message);
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_styleCuration_styleCheckComplete = function () {
  const instance = this;
  const back = this.back;
  const { equalJson, requestSystem, messageSend } = this.mother;
  let obj = {};
  obj.link = "/styleCuration_styleCheckComplete";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.cliid === undefined || req.body.name === undefined || req.body.image === undefined) {
        throw new Error("invaild post");
      }
      const { cliid, name, image } = equalJson(req.body);
      let text, channel;

      text = name + " 고객님이 스타일 찾기를 완료하였어요.";
      channel = "#404_curation";

      messageSend({ text, channel, voice: false }).catch((e) => {
        console.log(e);
      });

      res.send(JSON.stringify({ message: "done" }));

    } catch (e) {
      await logger.error("GhostClient 서버 문제 생김 (rou_post_styleCuration_styleCheckComplete) : " + e.message);
      res.send(JSON.stringify({ message: "error" }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_styleCuration_pageInitComplete = function () {
  const instance = this;
  const back = this.back;
  const kakao = this.kakao;
  const address = this.address;
  const { equalJson, requestSystem, messageSend } = this.mother;
  let obj = {};
  obj.link = "/styleCuration_pageInitComplete";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.cliid === undefined || req.body.name === undefined || req.body.phone === undefined) {
        throw new Error("invaild post");
      }
      const { cliid, name, phone } = equalJson(req.body);
      let text, channel;

      text = name + " 고객님이 스타일 찾기 페이지에 진입하셨어요.";
      channel = "#error_log";

      messageSend({ text, channel, voice: false }).catch((e) => {
        console.log(e);
      });

      if (DataRouter.timeouts["styleCuration_pageInitComplete_" + cliid] !== undefined && DataRouter.timeouts["styleCuration_pageInitComplete_" + cliid] !== null) {
        clearTimeout(DataRouter.timeouts["styleCuration_pageInitComplete_" + cliid]);
        DataRouter.timeouts["styleCuration_pageInitComplete_" + cliid] = null;
      }
      DataRouter.timeouts["styleCuration_pageInitComplete_" + cliid] = setTimeout(async () => {
        try {
          const client = await back.getClientById(cliid, { selfMongo: instance.mongo });
          if (client.requests[0].analytics.response.status.value === "응대중" && client.requests[0].analytics.response.action.value === "1차 응대 예정") {
            await kakao.sendTalk("pushClient", client.name, client.phone, {
              client: client.name,
              host: address.frontinfo.host,
              path: "curation",
              cliid: cliid,
            });
            await messageSend({ text: client.name + " 고객님께 신청 완료해달라고 부탁했어요.", channel: "#404_curation", voice: true });
          }
        } catch (e) {
          await logger.error("독촉하는 과정중 오류남 : " + e.message);
        }
      }, 30 * 60 * 1000);

      res.send(JSON.stringify({ message: "done" }));

    } catch (e) {
      await logger.error("GhostClient 서버 문제 생김 (rou_post_styleCuration_styleCheckComplete) : " + e.message);
      res.send(JSON.stringify({ message: "error" }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_styleCuration_styleChecking = function () {
  const instance = this;
  const { equalJson, messageSend } = this.mother;
  let obj = {};
  obj.link = "/styleCuration_styleChecking";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.cliid === undefined || req.body.name === undefined || req.body.phone === undefined || req.body.photos === undefined) {
        throw new Error("invaild post");
      }
      const { cliid, name, phone, photos } = equalJson(req.body);
      let text, channel;

      text = name + " 고객님이 스타일 찾기 사진 체크를 함 => "  + String(photos.length);
      channel = "#error_log";

      messageSend({ text, channel, voice: false }).catch((e) => {
        console.log(e);
      });

      res.send(JSON.stringify({ message: "done" }));
    } catch (e) {
      await logger.error("GhostClient 서버 문제 생김 (rou_post_styleCuration_styleChecking) : " + e.message);
      res.send(JSON.stringify({ message: "error" }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_styleCuration_getTotalMenu = function () {
  const instance = this;
  const back = this.back;
  const { equalJson, messageSend, objectDeepCopy } = this.mother;
  let obj = {};
  obj.link = "/styleCuration_getTotalMenu";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const selfMongo = instance.mongolocal;
      const selfCoreMongo = instance.mongo;
      const unknown = "알 수 없음";
      const selfLogMongo = instance.mongolog;
      const totalMenu = [
        {
          question: "생각하는 서비스 유형을 선택해 주세요!",
          values: [
            {
              title: "홈퍼니싱",
              english: "Homefurnishing",
              description: [
                "시공 없이 스타일링만!",
                "가구 소품 패브릭 조명으로 진행",
              ],
              source: "/service_f.png",
              plus: false,
              margin: false,
              value: "s2011_aa01s",
            },
            {
              title: "홈스타일링",
              english: "Homestyling",
              description: [
                "부분 시공 (제작 가구 포함)",
                "스타일링 (가구 소품 패브릭)",
              ],
              source: "/service_s.png",
              plus: true,
              margin: true,
              value: "s2011_aa02s",
            },
            {
              title: "토탈 스타일링",
              english: "Totalstyling",
              description: [
                "전체 시공 (주방, 화장실 포함)",
                "스타일링 (가구 소품 패브릭)",
              ],
              source: "/service_t.png",
              plus: true,
              margin: false,
              value: "s2011_aa03s",
            },
          ],
        },
        {
          question: "전체 공간을 철거하고 재시공을 원하시나요?",
          values: [
            {
              title: "아니요",
              value: "부분 철거",
            },
            {
              title: "예",
              value: "전체 철거",
            },
          ],
        },
        {
          question: "생각하시는 시공을 모두 체크해 주세요.",
          values: [
            {
              title: "철거",
              value: "철거",
              description: "철거, 기존에 있던 것을\n모두 제거하는 작업",
              styling: true,
              alert: true,
              notice: "전체 철거는 토탈 스타일링에서만 가능합니다!",
            },
            {
              title: "보양",
              value: "보양",
              description: "엘리베이터 등에 기스 나지\n않도록 비닐을 씌우는 작업",
              styling: true,
              alert: false,
              notice: "",
            },
            {
              title: "목공",
              value: "목공",
              description: "나무를 사용한 작업\n걸레받이, 몰딩, 문짝, 천정 평탄화 등",
              styling: true,
              alert: false,
              notice: "",
            },
            {
              title: "전기",
              value: "전기",
              description: "집 내부의 전기 배선\n구성을 바꾸는 작업",
              styling: true,
              alert: false,
              notice: "",
            },
            {
              title: "타일",
              value: "타일",
              description: "화장실, 주방 등에 타일을\n바꾸는 작업",
              styling: true,
              alert: true,
              notice: "홈스타일링에서는 덧방 공사만 가능합니다!",
            },
            {
              title: "바닥",
              value: "바닥",
              description: "집의 바닥 공사\n장판, 마루, 타일이 있음",
              styling: true,
              alert: true,
              notice: "홈스타일링에서는 장판과 마루 공사만 가능합니다!",
            },
            {
              title: "욕실",
              value: "욕실",
              description: "화장실 공사, 홈스타일링에선\n부분 악세사리 교체만 가능",
              styling: true,
              alert: true,
              notice: "홈스타일링에서는 부분 악세사리 교체만 가능합니다!",
            },
            {
              title: "주방",
              value: "주방",
              description: "주방 공사, 홈스타일링에선\n부분 악세사리 교체만 가능",
              styling: true,
              alert: true,
              notice: "홈스타일링에서는 부분 악세사리 교체만 가능합니다!",
            },
            {
              title: "필름",
              value: "필름",
              description: "필름지를 씌워 해당 면의\n색상이나 재질감을 바꾸는 제공",
              styling: true,
              alert: false,
              notice: "",
            },
            {
              title: "도배",
              value: "도배",
              description: "벽에 도배지를 바르는 작업\n합지와 실크가 있음",
              styling: true,
              alert: false,
              notice: "",
            },
            {
              title: "도장",
              value: "도장",
              description: "페인팅, 탄성코트 등\n면의 도료를 칠하는 공사",
              styling: true,
              alert: false,
              notice: "",
            },
            {
              title: "중문",
              value: "중문",
              description: "현관에 중문을\n새로 달거나 바꾸는 작업",
              styling: true,
              alert: false,
              notice: "",
            },
            {
              title: "발코니",
              value: "발코니",
              description: "발코니의 확장 및\n확장 부분 단열 공사",
              styling: false,
              alert: false,
              notice: "",
            },
            {
              title: "금속 샤시",
              value: "금속 샤시",
              description: "모든 금속 공사와\n샤시 교체 작업",
              styling: false,
              alert: false,
              notice: "",
            },
            {
              title: "조명",
              value: "조명",
              description: "스타일링을 위한 조명\n배치부터 조명 제품 선택",
              styling: true,
              alert: false,
              notice: "",
            },
            {
              title: "제작 가구",
              value: "제작 가구",
              description: "대가구, 소가구로 나뉘며\n제작이 필요한 모든 가구",
              styling: true,
              alert: false,
              notice: "",
            },
          ],
        },
        {
          question: "시공 당일의 주거 환경을 알려주세요.",
          values: [
            {
              title: "거주 중이며 가구 있음",
              value: "거주 중이며 가구 있음",
            },
            {
              title: "거주 중이며 보관 이사 계획",
              value: "거주 중이며 보관 이사 계획",
            },
            {
              title: "거주하지 않으며 공실 상태",
              value: "거주하지 않으며 공실 상태",
            },
          ],
        },
        {
          question: "인테리어 전체 가용 예산을 알려주세요.",
          values: [
            { title: "500만원 이하", value: "500만원 이하" },
            { title: "1,000만원", value: "1,000만원" },
            { title: "1,500만원", value: "1,500만원" },
            { title: "2,000만원", value: "2,000만원" },
            { title: "3,000만원", value: "3,000만원" },
            { title: "4,000만원", value: "4,000만원" },
            { title: "5,000만원", value: "5,000만원 이상" },
            { title: "6,000만원", value: "6,000만원 이상" },
            { title: "7,000만원", value: "7,000만원 이상" },
            { title: "8,000만원", value: "8,000만원 이상" },
            { title: "9,000만원", value: "9,000만원 이상" },
            { title: "1억원 이상", value: "1억원 이상" },
          ],
        },
        {
          question: "생각하는 가구 영역을 모두 체크해 주세요.",
          values: [
            {
              title: "빌트인 제작 가구",
              value: "빌트인 제작 가구",
            },
            {
              title: "단순 붙박이장",
              value: "단순 붙박이장",
            },
            {
              title: "구매형 가구",
              value: "구매형 가구",
            },
          ],
        },
        {
          question: "생각하는 패브릭 영역을 모두 체크해 주세요.",
          values: [
            {
              title: "커튼, 블라인드 등 외부 창문 패브릭",
              value: "커튼, 블라인드 등 외부 창문 패브릭",
            },
            {
              title: "제작 발주형 침구류 (쿠션, 이불, 베개 등)",
              value: "제작 발주형 침구류 (쿠션, 이불, 베개 등)",
            },
            {
              title: "구매형 침구류, 카펫 등 패브릭",
              value: "구매형 침구류, 카펫 등 패브릭",
            },
          ],
        },
        {
          question: "입주 예정 시기를 알려주세요.",
          values: [
            { title: "미정 / 거주중", value: "미정 / 거주중" },
            { title: "1개월 이내", value: "1개월 이내" },
            { title: "2개월 이내", value: "2개월 이내" },
            { title: "3개월 이내", value: "3개월 이내" },
            { title: "4개월 이내", value: "4개월 이내" },
            { title: "5개월 이내", value: "5개월 이내" },
            { title: "6개월 이내", value: "6개월 이내" },
            { title: "1년 이내", value: "1년 이내" },
            { title: "1년 이상", value: "1년 이상" },
          ],
        },
        {
          question: "가구 구매 정도를 알려주세요.",
          values: [
            {
              title: "기존 가구 재배치",
              value: "재배치",
            },
            {
              title: "일부 신규 구매",
              value: "일부 구매",
            },
            {
              title: "전체 신규 구매",
              value: "전체 구매",
            },
          ],
        },
        {
          question: "해당 가족 구성원을 체크해 주세요!",
          values: [
            {
              title: "1인 가구",
              value: "1인 가구",
            },
            {
              title: "부부, 자녀 없음",
              value: "부부, 자녀 없음",
            },
            {
              title: "부부, 유아기 자녀",
              value: "부부, 유아기 자녀",
            },
            {
              title: "부부, 학령기 자녀",
              value: "부부, 학령기 자녀",
            },
            {
              title: "기타",
              value: "기타",
            },
          ],
        },
        {
          question: "고객님의 연령대를 체크해 주세요!",
          values: [
            {
              title: "29세 이하",
              value: "29세 이하",
            },
            {
              title: "30세 - 39세",
              value: "30세 - 39세",
            },
            {
              title: "40세 - 49세",
              value: "40세 - 49세",
            },
            {
              title: "50세 - 59세",
              value: "50세 - 59세",
            },
            {
              title: "60세 이상",
              value: "60세 이상",
            },
          ],
        },
        {
          question: "가능한 상담 시간을 모두 체크해 주세요.",
          values: [
            { title: "9:30 - 11:00", value: "9:30 - 11:00" },
            { title: "11:00 - 12:30", value: "11:00 - 12:30" },
            { title: "13:30 - 16:30", value: "13:30 - 16:30" },
            { title: "16:30 - 18:30", value: "16:30 - 18:30" },
          ],
        },
        {
          question: "마음에 드는 사진을 3장씩 선택해주세요.",
          values: [],
        },
        {
          question: "현장 사진, 도면이 있다면 업로드해주세요.",
          values: [],
        },
      ];
      const dummyData = {
        cliid: unknown,
        selection: unknown,
        receive: unknown,
        image: unknown,
        service: unknown,
        serid: 's2011_aa02s',
        construct: unknown,
        constructItems: unknown,
        constructEnvironment: unknown,
        budget: unknown,
        furniture: unknown,
        fabric: unknown,
        expect: unknown,
        purchase: unknown,
        family: unknown,
        age: unknown,
        time: unknown,
      };
      const collection = "clientHistory";
      const collection2 = "blackButtonsClick";
      const collection3 = "homeliaisonAnalytics";
      const defaultButton = "consulting";
      let whereQuery, projectQuery;
      let rows, rows2;
      let filteredBlack;
      let thisCliid, curation;
      let selection;
      let resultJson;
      let tong;
      let check;
      let receive;
      let rows3;
      let start;
      let target;
      let thisAnalytics;
      let thisStatus;
      let cliidStatusArr;

      if (req.body.mode === undefined || req.body.mode === null || req.body.mode === "get") {

        res.send(JSON.stringify({ totalMenu }));

      } else if (req.body.mode === "dummy") {

        res.send(JSON.stringify({ dummy: dummyData }));
        
      } else if (req.body.mode === "analytics" || req.body.mode === "parse" || req.body.mode === "parsing") {
        const { cliids, statusArr } = equalJson(req.body);

        whereQuery = { $or: cliids.map((cliid) => { return { cliid } }) };
        projectQuery = { "cliid": 1, "curation.image": 1, "curation.check": 1 };
    
        rows = await back.mongoPick(collection, [ whereQuery, projectQuery ], { selfMongo });
        rows2 = await back.mongoRead(collection2, whereQuery, { selfMongo });
    
        whereQuery = { $or: cliids.map((cliid) => { return { "data.cliid": cliid, "action": "pageInit" } }) };
        projectQuery = { "page": 1, "data": 1, "action": 1 };
        rows3 = await back.mongoPick(collection3, [ whereQuery, projectQuery ], { selfMongo: selfLogMongo });
    
        cliidStatusArr = [];
        for (let i = 0; i < cliids.length; i++) {
          cliidStatusArr.push([ cliids[i], statusArr[i] ]);
        }

        tong = [];
        for (let obj of rows) {
          thisCliid = obj.cliid;
          thisStatus = cliidStatusArr.find((arr) => { return arr[0] === thisCliid })[1];

          curation = objectDeepCopy(obj.curation);
          check = curation.check;
          thisAnalytics = rows3.filter((o) => { return o.data.cliid === thisCliid });
          filteredBlack = rows2.filter((o) => { return o.cliid === thisCliid });
    
          if (filteredBlack.length === 0) {
            selection = defaultButton;
          } else {
            filteredBlack.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });
            selection = filteredBlack[0].mode;
          }
    
          if (thisAnalytics.filter((o) => { return o.page === "styleCuration" }).length === 0) {
            start = "스타일 체크 거부";
            target = "단순 드랍 대상";
          } else {
            start = "스타일 체크 진입";
            target = "1차 응대 대상";
          }
    
          if (/단순 드랍 대상/gi.test(target) || /드랍/gi.test(thisStatus)) {
    
            selection = "응대 불필요";
            receive = "추천 불필요";
    
          } else {
    
            if (/consulting/gi.test(selection)) {
              selection = "상담부터";
              receive = "추천서 받기 전";
              if (thisAnalytics.filter((o) => { return o.page === "designerProposal" }).length > 0) {
                receive = "자동 추천 받음";
              }
            } else {
              selection = "추천부터";
              receive = "추천서 진입";
              if (thisAnalytics.filter((o) => { return o.page === "designerProposal" }).length === 0) {
                selection = "상담부터";
                receive = "자동 추천 받음";
              } else {
                target = "자동 응대중";
              }
            }
    
          }
    
          resultJson = { cliid: thisCliid, selection, receive };
    
          if (curation.length === 0) {
            resultJson.image = "이미지 선택 거부";
          } else {
            if (thisAnalytics.filter((o) => { return o.page === "styleCuration" }).length === 0) {
              resultJson.image = "이미지 선택 거부";
            } else {
              resultJson.image = "이미지 선택 진행";
            }
          }
          resultJson.service = totalMenu[0].values[Number(check.serid.split("_")[1].replace(/[^0-9]/gi, '')) - 1].title
          resultJson.serid = check.serid;
          if (typeof check.construct.entire === "boolean") {
            resultJson.construct = totalMenu[1].values[check.construct.entire ? 1 : 0].value;
          } else {
            resultJson.construct = totalMenu[1].values[0].value;
          }
          resultJson.constructItems = totalMenu[2].values.filter((o, index) => { return check.construct.items.includes(index) }).map((o) => { return o.title }).join(", ").trim();
          if (resultJson.constructItems === "") {
            resultJson.constructItems = unknown;
          }
          if (typeof check.construct.environment === "number") {
            resultJson.constructEnvironment = totalMenu[3].values[check.construct.environment].value;
          } else {
            resultJson.constructEnvironment = unknown;
          }
          if (typeof check.budget === "number") {
            resultJson.budget = totalMenu[4].values[check.budget].value;
          } else {
            resultJson.budget = unknown;
          }
          resultJson.furniture = totalMenu[5].values.filter((o, index) => { return check.furniture.includes(index) }).map((o) => { return o.title }).join(", ").trim();
          if (resultJson.furniture === "") {
            resultJson.furniture = unknown;
          }
          resultJson.fabric = totalMenu[6].values.filter((o, index) => { return check.fabric.includes(index) }).map((o) => { return o.title }).join(", ").trim();
          if (resultJson.fabric === "") {
            resultJson.fabric = unknown;
          }
          if (typeof check.expect === "number") {
            resultJson.expect = totalMenu[7].values[check.expect].value;
          } else {
            resultJson.expect = unknown;
          }
          if (typeof check.purchase === "number") {
            resultJson.purchase = totalMenu[8].values[check.purchase].value;
          } else {
            resultJson.purchase = unknown;
          }
          if (typeof check.family === "number") {
            resultJson.family = totalMenu[9].values[check.family].value;
          } else {
            resultJson.family = unknown;
          }
          if (typeof check.age === "number") {
            resultJson.age = totalMenu[10].values[check.age].value;
          } else {
            resultJson.age = unknown;
          }
          resultJson.time = totalMenu[11].values.filter((o, index) => { return check.time.includes(index) }).map((o) => { return o.title }).join(", ").trim();
          if (resultJson.time === "") {
            resultJson.time = unknown;
          }
          tong.push(objectDeepCopy(resultJson));
        }
        res.send(JSON.stringify({ data: tong, dummy: dummyData }));
        
      }

    } catch (e) {
      await logger.error("GhostClient 서버 문제 생김 (rou_post_styleCuration_getTotalMenu) : " + e.message);
      res.send(JSON.stringify({ message: "error" }));
    }
  }
  return obj;
}


//ROUTING ----------------------------------------------------------------------

DataRouter.prototype.setMembers = async function () {
  const instance = this;
  const back = this.back;
  const { equalJson } = this.mother;
  try {
    this.members = await back.setMemberObj({ getMode: true, selfMongo: instance.mongo });
  } catch (e) {
    console.log(e);
  }
}

DataRouter.prototype.getAll = function () {
  let result, result_arr;

  result = { get: [], post: [] };
  result_arr = Object.keys(DataRouter.prototype);

  for (let i of result_arr) { if (/^rou_get/g.test(i)) {
    result.get.push((this[i])());
  }}

  for (let i of result_arr) { if (/^rou_post/g.test(i)) {
    result.post.push((this[i])());
  }}

  return result;
}

module.exports = DataRouter;


