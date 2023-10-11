const ContentsRouter = function (MONGOC, MONGOLOCALC, MONGOCONSOLEC, MONGOLOGC) {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);

  const ImageReader = require(process.cwd() + "/apps/imageReader/imageReader.js");
  const ParsingHangul = require(process.cwd() + "/apps/parsingHangul/parsingHangul.js");

  const GoogleDrive = require(`${process.cwd()}/apps/googleAPIs/googleDrive.js`);
  const GoogleDocs = require(process.cwd() + "/apps/googleAPIs/googleDocs.js");
  const GoogleSheet = require(`${process.cwd()}/apps/googleAPIs/googleSheet.js`);
  const GoogleCalendar = require(`${process.cwd()}/apps/googleAPIs/googleCalendar.js`);
  const ContentsCalculator = require(`${process.cwd() + "/apps/contentsLounge"}/router/contentsCalculator.js`);

  const FacebookAPIs = require(`${process.cwd()}/apps/facebookAPIs/facebookAPIs.js`);
  const NaverAPIs = require(`${process.cwd()}/apps/naverAPIs/naverAPIs.js`);
  const GoogleAds = require(`${process.cwd()}/apps/googleAPIs/googleAds.js`);
  const GoogleYoutube = require(`${process.cwd()}/apps/googleAPIs/googleYoutube.js`);

  this.mother = new Mother();
  this.back = new BackMaker();
  this.address = require(`${process.cwd()}/apps/infoObj.js`);
  this.host = this.address.contentsinfo.host;
  this.mongo = MONGOC;
  this.mongolocal = MONGOLOCALC;
  this.mongoconsole = MONGOCONSOLEC;
  this.mongolog = MONGOLOGC;
  this.members = {};

  this.formidable = require("formidable");
  this.imageReader = new ImageReader(this.mother, this.back, this.address);
  this.hangul = new ParsingHangul();
  this.drive = new GoogleDrive();
  this.docs = new GoogleDocs();
  this.sheets = new GoogleSheet();
  this.calendar = new GoogleCalendar();
  this.calcaulator = new ContentsCalculator();

  this.facebook = new FacebookAPIs();
  this.naver = new NaverAPIs();
  this.google = new GoogleAds();
  this.youtube = new GoogleYoutube();

  this.staticConst = process.env.HOME + "/static";
  this.calendarName = "homeliaisonContents"

  this.vaildHost = [
    this.address.frontinfo.host,
    this.address.secondinfo.host,
    this.address.transinfo.host,
    this.address.backinfo.host,
    this.address.pythoninfo.host,
    this.address.testinfo.host,
    this.address.contentsinfo.host,
    this.address.officeinfo.ghost.host,
    "home-liaison.servehttp.com",
    "localhost:3000",
    "172.30.1.90:3000",
    "172.30.1.37:3000",
    "192.168.0.90:3000",
  ];
}

ContentsRouter.prototype.fireWall = function (req) {
  const instance = this;
  let __originTarget, __wallLogicBoo, __vailHosts;

  __vailHosts = this.vaildHost;
  __originTarget = req.headers["origin"];
  if (typeof __originTarget !== "string") {
    __originTarget = req.headers["host"];
    if (typeof __originTarget !== "string") {
      __originTarget = "";
    }
  }
  __wallLogicBoo = false;
  for (let host of __vailHosts) {
    __wallLogicBoo = (new RegExp(host, "gi")).test(__originTarget.trim().replace(/\/$/, ''));
    if (__wallLogicBoo) {
      break;
    }
  }
  return __wallLogicBoo;
}

//GET ---------------------------------------------------------------------------------------------

ContentsRouter.prototype.rou_get_First = function () {
  const instance = this;
  const { diskReading, aliveMongo } = this.mother;
  let obj = {};
  obj.link = "/:id";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {

      if (req.params.id === "ssl") {
        const disk = await diskReading();
        const aliveMongoResult = await aliveMongo();
        res.send(JSON.stringify({ disk: disk.toArray(), mongo: aliveMongoResult }));
      } else if (req.params.id === "disk") {
        const disk = await diskReading();
        res.send(JSON.stringify({ disk: disk.toArray() }));
      } else {
        res.send(JSON.stringify({ message: "hi" }));
      }

    } catch (e) {
      logger.error("Contents lounge 서버 문제 생김 (rou_get_First): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
    }
  }

  return obj;
}

//POST ---------------------------------------------------------------------------------------------

ContentsRouter.prototype.rou_post_storeHoliday = function () {
  const instance = this;
  const back = this.back;
  const { fileSystem, equalJson, requestSystem, sleep, dateToString } = this.mother;
  const returnHolidayArr = async () => {
    try {
      const endPoint0 = "http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo";
      const endPoint1 = "http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo";
      const key = "7VuaiHtcKan1rHFT1huoXCufMJYJnmRl0Y5j5E5dyNnrDu2+bNqF2CzcA6M9RZ6n7GTO9xV74nwHxkNv9bkn/Q==";
      const totalRange = 3;
      let result;
      let holidayArr;
      let thisYear;

      thisYear = (new Date()).getFullYear();
      holidayArr = [];

      for (let i = 0; i < totalRange; i++) {
        result = await requestSystem(endPoint0, {
          solYear: (thisYear + i),
          ServiceKey: key,
          _type: "json",
          numOfRows: 300,
        }, { method: "get" });
        for (let { isHoliday, locdate } of result.data.response.body.items.item) {
          if (/Y/gi.test(isHoliday)) {
            holidayArr.push(locdate);
          }
        }
        result = await requestSystem(endPoint1, {
          solYear: (thisYear + i),
          ServiceKey: key,
          _type: "json",
          numOfRows: 300,
        }, { method: "get" });
        for (let { isHoliday, locdate } of result.data.response.body.items.item) {
          if (/Y/gi.test(isHoliday)) {
            holidayArr.push(locdate);
          }
        }
      }

      holidayArr = [ ...new Set(holidayArr.map((num) => { return String(num) })) ].map((str) => { return Number(str) });
      holidayArr.sort((a, b) => { return a - b });
      holidayArr = holidayArr.map((num) => { return String(num).slice(0, 4) + "-" + String(num).slice(4, 6) + "-" + String(num).slice(6, 8) })

      return holidayArr;
    } catch (e) {
      return null;
    }
  }
  let obj;
  obj = {};
  obj.link = [ "/storeHoliday" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const selfMongo = instance.mongolocal;
      const collection = "holidayList";
      const keyConst = "holiday_";

      (async () => {
        try {
          let resultHolidayArr;
          let safeNum;
          let resultJson;
          let key;
          let thisDateString;
          let thisDateStringArr;
          let rows;

          resultHolidayArr = await returnHolidayArr();
          safeNum = 0;
          while (!Array.isArray(resultHolidayArr)) {
            if (safeNum > 100) {
              break;
            }
            await sleep(1000);
            resultHolidayArr = await returnHolidayArr();
            safeNum++;
          }

          thisDateString = dateToString(new Date());
          thisDateStringArr = thisDateString.split("-");

          key = keyConst + thisDateStringArr[0] + thisDateStringArr[1];

          resultJson = {
            key,
            date: new Date(),
            data: resultHolidayArr,
          };

          rows = await back.mongoRead(collection, { key }, { selfMongo });
          if (rows.length !== 0) {
            await back.mongoDelete(collection, { key }, { selfMongo });
          }
          await back.mongoCreate(collection, resultJson, { selfMongo });

          return true;
        } catch (e) {
          console.log(e);
          logger.error("Contents lounge 서버 문제 생김 (rou_post_storeHoliday): " + e.message).catch((e) => { console.log(e); });
          return false;
        }
      })().catch((err) => {
        console.log(err);
        logger.error("Contents lounge 서버 문제 생김 (rou_post_storeHoliday): " + err.message).catch((e) => { console.log(e); });
      });

      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      logger.error("Contents lounge 서버 문제 생김 (rou_post_storeHoliday): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

ContentsRouter.prototype.rou_post_getHoliday = function () {
  const instance = this;
  const back = this.back;
  const { fileSystem, equalJson, requestSystem, sleep, dateToString } = this.mother;
  let obj;
  obj = {};
  obj.link = [ "/getHoliday" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const selfMongo = instance.mongolocal;
      const collection = "holidayList";
      let rows;
      let oneYearsAgo;

      oneYearsAgo = new Date();
      oneYearsAgo.setFullYear(oneYearsAgo.getFullYear() - 1);

      rows = await back.mongoRead(collection, { date: { $gte: oneYearsAgo } }, { selfMongo });
      rows.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });

      if (rows.length > 0) {
        res.send(JSON.stringify({ holiday: rows[0].data }));
      } else {
        res.send(JSON.stringify({ holiday: [] }));
      }

    } catch (e) {
      logger.error("Contents lounge 서버 문제 생김 (rou_post_getHoliday): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

ContentsRouter.prototype.rou_post_contentsCalendar = function () {
  const instance = this;
  const back = this.back;
  const calendar = this.calendar;
  const { calendarName } = this;
  const { fileSystem, equalJson, requestSystem, sleep, dateToString } = this.mother;
  let obj;
  obj = {};
  obj.link = [ "/contentsCalendar" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.mode === undefined) {
        throw new Error("invaild post");
      }
      const { mode } = equalJson(req.body);
      const selfCoreMongo = instance.mongo;
      const selfLocalMongo = instance.mongolocal;
      const collection = "foreContents";
      const factors = await calendar.listEvents(calendarName);
      const targets = factors.filter((o) => { return /(Web|Blog|Instagram|Youtube)\([^\)]+\)/gi.test(o.title) });
      let thisId;
      let thisType;
      let tempArr;
      let contentsArr, projects;
      let proidArr;
      let whereQuery;
      let foreContents;
      let thisObj;
      let thisProid, thisCliid, thisDesid;
      let thisProject;

      for (let obj of targets) {
        tempArr = /(Web|Blog|Instagram|Youtube)\(([^\)]+)\)/gi.exec(obj.title);
        thisType = tempArr[1].toLowerCase();
        thisId = tempArr[2];
        obj.type = thisType;
        obj.pid = thisId;
      }

      if (mode === "get") {
        if (req.body.detailMode === "true" || req.body.detailMode === true) {
          if (targets.length > 0) {
            whereQuery = {};
            whereQuery["$or"] = targets.map((o) => { return o.pid }).map((pid) => { return { "contents.portfolio.pid": pid } });
            contentsArr = await back.getContentsArrByQuery(whereQuery, { selfMongo: selfCoreMongo });
            foreContents = await back.mongoRead(collection, {}, { selfMongo: selfLocalMongo });

            proidArr = contentsArr.toNormal().map((c) => { return c.proid });
            proidArr = proidArr.concat(foreContents.filter((o) => { return !o.exception }).map((o) => { return o.proid }));
            proidArr = [ ...new Set(proidArr) ];
            proidArr = proidArr.map((p) => { return p.trim(); }).filter((p) => { return p !== "" });

            if (proidArr.length > 0) {
              projects = (await back.getProjectsByQuery({ $or: proidArr.map((proid) => { return { proid } }) }, { selfMongo: selfCoreMongo })).toNormal();
            } else {
              projects = [];
            }

            for (let obj of targets) {
              thisObj = contentsArr.toNormal().find((c) => { return c.contents.portfolio.pid === obj.pid });
              if (thisObj === undefined) {
                thisObj = foreContents.find((c) => { return c.pid === obj.pid });
                thisProid = thisObj.proid;
              } else {
                thisProid = thisObj.proid;
              }
              if (thisProid !== undefined && thisProid !== null && thisProid !== "") {
                thisProject = projects.find((p) => { return p.proid === thisProid });
                thisCliid = thisProject.cliid;
                thisDesid = thisProject.desid;
              } else {
                thisProid = "";
                thisCliid = "";
                thisDesid = "";
              }
              obj.proid = thisProid;
              obj.cliid = thisCliid;
              obj.desid = thisDesid;
            }
            res.send(JSON.stringify(targets));
          } else {
            res.send(JSON.stringify(targets));
          }
        } else {
          res.send(JSON.stringify(targets));
        }
      } else {
        throw new Error("invaild mode");
      }

    } catch (e) {
      logger.error("Contents lounge 서버 문제 생김 (rou_post_contentsCalendar): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

ContentsRouter.prototype.rou_post_foreContents = function () {
  const instance = this;
  const back = this.back;
  const { fileSystem, equalJson, requestSystem, sleep, dateToString } = this.mother;
  let obj;
  obj = {};
  obj.link = [ "/foreContents" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.mode === undefined) {
        throw new Error("invaild post");
      }
      const { mode } = equalJson(req.body);
      const selfMongo = instance.mongolocal;
      const collection = "foreContents";
      let rows;
      let desid;

      if (mode === "get") {
        if (req.body.desid === undefined) {
          rows = await back.mongoRead(collection, {}, { selfMongo });
        } else {
          desid = req.body.desid;
          rows = await back.mongoRead(collection, { desid }, { selfMongo });
        }
        res.send(JSON.stringify(rows));

      } else if (mode === "exceptionControl") {

        if (req.body.pid === undefined || req.body.control === undefined) {
          throw new Error("invalid post");
        }
        const { pid, control } = equalJson(req.body);
        await back.mongoUpdate(collection, [ { pid }, { exception: (control === "register") } ], { selfMongo });

        res.send(JSON.stringify({ message: "done" }));

      } else if (mode === "exceptionList") {

        rows = await back.mongoRead(collection, {}, { selfMongo });
        rows = rows.filter((o) => { return o.exception === true });
        if (req.body.type === "string") {
          res.send(JSON.stringify(rows.map((o) => { return o.pid })));
        } else {
          res.send(JSON.stringify(rows));
        }

      } else {
        throw new Error("invaild mode");
      }

    } catch (e) {
      logger.error("Contents lounge 서버 문제 생김 (rou_post_foreContents): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

ContentsRouter.prototype.rou_post_generalFileUpload = function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink } = this.mother;
  const { staticConst } = this;
  const hangul = this.hangul;
  let obj;
  obj = {};
  obj.link = [ "/generalFileUpload" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (!instance.fireWall(req)) {
        throw new Error("post ban");
      }
      const form = instance.formidable({ multiples: true, encoding: "utf-8", maxFileSize: (9000 * 1024 * 1024) });
      form.parse(req, async function (err, fields, files) {
        try {
          if (err) {
            throw new Error(err);
          } else {
            const toArr = JSON.parse(fields.toArr).map((path) => { return hangul.fixString(path); });
            let filesKey, fromArr, num;
            let tempArr, tempString, tempDir;

            filesKey = Object.keys(files);
            filesKey.sort((a, b) => {
              return Number(a.replace(/[^0-9]/gi, '')) - Number(b.replace(/[^0-9]/gi, ''));
            });

            fromArr = [];
            for (let key of filesKey) {
              fromArr.push(files[key]);
            }

            num = 0;
            for (let { filepath: path } of fromArr) {
              tempArr = toArr[num].split("/");
              tempString = staticConst;
              if (tempArr.length === 0) {
                throw new Error("invaild to array");
              }
              for (let i = 0; i < tempArr.length - 1; i++) {
                tempDir = await fileSystem(`readDir`, [ tempString ]);
                if (!tempDir.includes(tempArr[i]) && tempArr[i] !== "") {
                  await shellExec(`mkdir ${shellLink(tempString + "/" + tempArr[i])}`);
                }
                tempString += '/';
                tempString += tempArr[i];
              }
              await shellExec(`mv ${shellLink(path)} ${shellLink(staticConst + "/" + toArr[num].replace(/^\//i, ''))}`);
              num++;
            }

            res.send(JSON.stringify({ "message": "done" }));
          }
        } catch (e) {
          logger.error("Contents lounge 서버 문제 생김 (rou_post_generalFileUpload): " + e.message).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
        }
      });
    } catch (e) {
      logger.error("Contents lounge 서버 문제 생김 (rou_post_generalFileUpload): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

ContentsRouter.prototype.rou_post_contentsSchedule = function () {
  const instance = this;
  const calcaulator = this.calcaulator;
  const { fileSystem, equalJson, requestSystem, sleep, dateToString } = this.mother;
  let obj;
  obj = {};
  obj.link = [ "/contentsSchedule" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const selfCoreMongo = instance.mongo;
      const timeConst = 10 * 1000;
      calcaulator.settingWebSchedule(selfCoreMongo, logger).then((resultMessage) => {
        if (resultMessage.message !== "done") {
          throw new Error("setting web schedule fail");
        }
        return sleep(timeConst);
      }).then(() => {
        return calcaulator.syncWebSchedule(selfCoreMongo, logger);
      }).then((resultMessage) => {
        if (resultMessage.message !== "done") {
          throw new Error("sync web schedule fail");
        }
      }).catch((err) => {
        logger.error("Contents lounge 서버 문제 생김 (rou_post_contentsSchedule): " + err.message).catch((e) => { console.log(e); });
        console.log(err);
      });
      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      logger.error("Contents lounge 서버 문제 생김 (rou_post_contentsSchedule): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

ContentsRouter.prototype.rou_post_metaComplex = function () {
  const instance = this;
  const meta = this.facebook;
  const naver = this.naver;
  const { fileSystem, equalJson, requestSystem, sleep, dateToString } = this.mother;
  let obj;
  obj = {};
  obj.link = [ "/metaComplex" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const selfMongo = instance.mongolocal;
      const defaultDay = 3;
      const dayConst = req.body.day === undefined ? defaultDay : (Number.isNaN(Number(req.body.day)) ? defaultDay : Number(req.body.day));
      meta.metaComplex(selfMongo, dayConst, logger).then(() => {
        return naver.naverComplex(selfMongo, dayConst, logger);
      }).catch((err) => {
        logger.error("Contents lounge 서버 문제 생김 (rou_post_metaComplex): " + err.message).catch((e) => { console.log(e); });
      });
      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      logger.error("Contents lounge 서버 문제 생김 (rou_post_metaComplex): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

ContentsRouter.prototype.rou_post_evaluationSubmit = function () {
  const instance = this;
  const back = this.back;
  const { equalJson, messageSend, dateToString, stringToDate, sleep } = this.mother;
  let obj = {};
  obj.link = [ "/evaluationSubmit" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.cliid === undefined || req.body.proid === undefined || req.body.desid === undefined || req.body.map === undefined) {
        throw new Error("invalid post");
      }
      const { cliid, proid, desid, map } = equalJson(req.body);
      const selfMongo = instance.mongolocal;
      const collection = "clientEvaluation";
      let constructAmount;
      let constructPeriod;
      let totalAmount;
      let stylingAmount;
      let furniture;
      let productList;
      let settingPeriod;
      let compliance;
      let designSatisfaction;
      let feedbackSatisfaction;
      let operationSatisfaction;
      let json;
      let rows;

      constructAmount = map.find((o) => { return o.property === "constructamount" }) === undefined ? "" : map.find((o) => { return o.property === "constructamount" }).value;
      constructPeriod = map.find((o) => { return o.property === "constructperiod" }) === undefined ? "" : map.find((o) => { return o.property === "constructperiod" }).value;
      totalAmount = map.find((o) => { return o.property === "totalamount" }) === undefined ? "" : map.find((o) => { return o.property === "totalamount" }).value;
      stylingAmount = map.find((o) => { return o.property === "stylingamount" }) === undefined ? "" : map.find((o) => { return o.property === "stylingamount" }).value;
      furniture = map.find((o) => { return o.property === "furniture" }) === undefined ? "" : map.find((o) => { return o.property === "furniture" }).value;
      productList = map.find((o) => { return o.property === "productlist" }) === undefined ? "" : map.find((o) => { return o.property === "productlist" }).value;
      settingPeriod = map.find((o) => { return o.property === "settingperiod" }) === undefined ? "" : map.find((o) => { return o.property === "settingperiod" }).value;
      compliance = map.find((o) => { return o.property === "compliance_ratio" }) === undefined ? 1 : map.find((o) => { return o.property === "compliance_ratio" }).value;
      designSatisfaction = map.find((o) => { return o.property === "designsatisfaction" }) === undefined ? "" : map.find((o) => { return o.property === "designsatisfaction" }).value;
      feedbackSatisfaction = map.find((o) => { return o.property === "feedbacksatisfaction" }) === undefined ? "" : map.find((o) => { return o.property === "feedbacksatisfaction" }).value;
      operationSatisfaction = map.find((o) => { return o.property === "operationsatisfaction" }) === undefined ? "" : map.find((o) => { return o.property === "operationsatisfaction" }).value;

      json = {
        proid,
        desid,
        cliid,
        date: new Date(),
        construct: {
          level: 0,
          period: 0,
        },
        spend: {
          total: 0,
          construct: 0,
          styling: 0,
        },
        purchase: {
          list: 0,
          furniture: 0,
          period: 0,
          compliance: 0,
        },
        satisfaction: {
          design: 0,
          feedback: 0,
          operation: 0,
        }
      };

      if (/시공 없음/gi.test(constructAmount)) {
        json.construct.level = 0;
      } else if (/부분 시공/gi.test(constructAmount)) {
        json.construct.level = 1;
      } else if (/전체 시공/gi.test(constructAmount)) {
        json.construct.level = 2;
      } else {
        json.construct.level = 0;
      }

      if (/시공 없음/gi.test(constructPeriod)) {
        json.construct.period = 0;
      } else if (/2주 이하/gi.test(constructPeriod)) {
        json.construct.period = 14;
      } else if (/4주 이상/gi.test(constructPeriod)) {
        json.construct.period = 30;
      } else if (/[0-9]/gi.test(constructPeriod)) {
        json.construct.period = Math.ceil(constructPeriod.split("~").map((str) => { return Number(str.replace(/[^0-9]/gi, '')) * 7 }).reduce((acc, curr) => { return acc + curr }, 0) / 2);
      } else {
        json.construct.period = 0;
      }

      if (/1억/gi.test(totalAmount)) {
        json.spend.total = 100000000;
      } else if (/만원/gi.test(totalAmount)) {
        json.spend.total = Number(totalAmount.replace(/[^0-9]/gi, '')) * 10000;
      } else {
        json.spend.total = 0;
      }

      if (/1억/gi.test(stylingAmount)) {
        json.spend.styling = 100000000;
      } else if (/만원/gi.test(stylingAmount)) {
        json.spend.styling = Number(stylingAmount.replace(/[^0-9]/gi, '')) * 10000;
      } else {
        json.spend.styling = 0;
      }

      json.spend.construct = json.spend.total - json.spend.styling;

      if (/불만족/gi.test(productList)) {
        json.purchase.list = 0;
      } else if (/보통/gi.test(productList)) {
        json.purchase.list = 1;
      } else if (/만족/gi.test(productList)) {
        json.purchase.list = 2;
      } else {
        json.purchase.list = 1;
      }

      if (/재배치/gi.test(furniture)) {
        json.purchase.furniture = 0;
      } else if (/일부/gi.test(furniture)) {
        json.purchase.furniture = 1;
      } else {
        json.purchase.furniture = 2;
      }

      if (/구매 없음/gi.test(settingPeriod)) {
        json.purchase.period = 0;
      } else if (/2주 이하/gi.test(settingPeriod)) {
        json.purchase.period = 14;
      } else if (/4주 이상/gi.test(settingPeriod)) {
        json.purchase.period = 30;
      } else if (/[0-9]/gi.test(constructPeriod)) {
        json.purchase.period = Math.ceil(settingPeriod.split("~").map((str) => { return Number(str.replace(/[^0-9]/gi, '')) * 7 }).reduce((acc, curr) => { return acc + curr }, 0) / 2);
      } else {
        json.purchase.period = 0;
      }

      json.purchase.compliance = compliance;

      if (/불만족/gi.test(designSatisfaction)) {
        json.satisfaction.design = 0;
      } else if (/보통/gi.test(designSatisfaction)) {
        json.satisfaction.design = 1;
      } else if (/만족/gi.test(designSatisfaction)) {
        json.satisfaction.design = 2;
      } else {
        json.satisfaction.design = 1;
      }

      if (/불만족/gi.test(feedbackSatisfaction)) {
        json.satisfaction.feedback = 0;
      } else if (/보통/gi.test(feedbackSatisfaction)) {
        json.satisfaction.feedback = 1;
      } else if (/만족/gi.test(feedbackSatisfaction)) {
        json.satisfaction.feedback = 2;
      } else {
        json.satisfaction.feedback = 1;
      }

      if (/불만족/gi.test(operationSatisfaction)) {
        json.satisfaction.operation = 0;
      } else if (/보통/gi.test(operationSatisfaction)) {
        json.satisfaction.operation = 1;
      } else if (/만족/gi.test(operationSatisfaction)) {
        json.satisfaction.operation = 2;
      } else {
        json.satisfaction.operation = 1;
      }

      rows = await back.mongoRead(collection, { proid }, { selfMongo });
      if (rows.length > 0) {
        await back.mongoDelete(collection, { proid }, { selfMongo });
      }
      await back.mongoCreate(collection, json, { selfMongo });

      logger.alert("evaluationSubmit success => " + proid + ", " + cliid + ", " + desid).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "done" }));

    } catch (e) {
      logger.error("Contents lounge 서버 문제 생김 (rou_post_evaluationSubmit): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

ContentsRouter.prototype.rou_post_evaluationList = function () {
  const instance = this;
  const back = this.back;
  const { equalJson, messageSend, dateToString, stringToDate, sleep } = this.mother;
  let obj = {};
  obj.link = [ "/evaluationList" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const selfMongo = instance.mongolocal;
      const collection = "clientEvaluation";
      const mode = (req.body.mode === undefined ? "pick" : req.body.mode);
      let rows;
      let targetJson;

      if (mode === "pick") {

        if (req.body.proid === undefined) {
          throw new Error("invalid post");
        }
        const { proid } = equalJson(req.body);
        
        rows = await back.mongoRead(collection, { proid }, { selfMongo });
        if (rows.length > 0) {
          rows.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });
          targetJson = equalJson(JSON.stringify(rows[0]));
          res.send(JSON.stringify({
            exist: true,
            data: targetJson,
          }));
        } else {
          res.send(JSON.stringify({
            exist: false,
            data: null,
          }));
        }

      } else if (mode === "list") {

        if (req.body.whereQuery === undefined) {
          throw new Error("invalid post");
        }
        const { whereQuery } = equalJson(req.body);
        rows = await back.mongoRead(collection, whereQuery, { selfMongo });
        targetJson = equalJson(JSON.stringify(rows));
        for (let obj of targetJson) {
          delete obj._id;
        }
        res.send(JSON.stringify({ data: targetJson }));

      } else {
        throw new Error("invalid mode");
      }

    } catch (e) {
      logger.error("Contents lounge 서버 문제 생김 (rou_post_evaluationList): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

ContentsRouter.prototype.rou_post_evaluationNotice = function () {
  const instance = this;
  const back = this.back;
  const { equalJson, messageSend, dateToString, stringToDate, sleep } = this.mother;
  let obj = {};
  obj.link = [ "/evaluationNotice" ];
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
      const { mode } = equalJson(req.body);
      const selfMongo = instance.mongolocal;
      const collection = "evaluationNotice";
      let json;
      let rows;
      let targetJson;
      let thisJson;

      if (mode === "send") {

        if (req.body.proid === undefined || req.body.cliid === undefined || req.body.desid === undefined) {
          throw new Error("invalid post");
        }
        const { cliid, desid } = equalJson(req.body);
        json = {
          proid,
          desid,
          cliid,
          date: new Date(),
          history: [
            (new Date()),
          ]
        };
        rows = await back.mongoRead(collection, { proid }, { selfMongo });
        if (rows.length > 0) {
          [ targetJson ] = rows;
          delete targetJson._id;
          thisJson = equalJson(JSON.stringify(targetJson));
          thisJson.date = new Date();
          thisJson.history.unshift(new Date());
          await back.mongoDelete(collection, { proid }, { selfMongo });
          await back.mongoCreate(collection, thisJson, { selfMongo });
        } else {
          await back.mongoCreate(collection, json, { selfMongo });
        }
        res.send(JSON.stringify({ message: "done" }));

      } else if (mode === "list") {

        if (req.body.from === undefined) {
          throw new Error("invalid post");
        }
        const { from } = equalJson(req.body);
        rows = await back.mongoRead(collection, { date: { $gte: from } }, { selfMongo });
        targetJson = equalJson(JSON.stringify(rows));
        for (let obj of targetJson) {
          delete obj._id;
        }
        res.send(JSON.stringify({ data: targetJson }));

      } else {
        throw new Error("invalid mode");
      }

    } catch (e) {
      logger.error("Contents lounge 서버 문제 생김 (rou_post_evaluationNotice): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

//ROUTING ----------------------------------------------------------------------

ContentsRouter.prototype.setMembers = async function () {
  const instance = this;
  const back = this.back;
  const { fileSystem } = this.mother;
  try {
    this.members = await back.setMemberObj({ getMode: true, selfMongo: instance.mongo });
  } catch (e) {
    await logger.error("Contents lounge 서버 문제 생김 (setMembers): " + e.message);
    console.log(e);
  }
}

ContentsRouter.prototype.getAll = function () {
  let result, result_arr;

  result = { get: [], post: [] };
  result_arr = Object.keys(ContentsRouter.prototype);

  for (let i of result_arr) { if (/^rou_get/g.test(i)) {
    result.get.push((this[i])());
  }}

  for (let i of result_arr) { if (/^rou_post/g.test(i)) {
    result.post.push((this[i])());
  }}

  return result;
}

module.exports = ContentsRouter;