const ContentsRouter = function (MONGOC, MONGOLOCALC, MONGOCONSOLEC, MONGOLOGC, kakaoInstance) {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);

  const ImageReader = require(process.cwd() + "/apps/imageReader/imageReader.js");
  const ParsingHangul = require(process.cwd() + "/apps/parsingHangul/parsingHangul.js");

  const GoogleDrive = require(`${process.cwd()}/apps/googleAPIs/googleDrive.js`);
  const GoogleDocs = require(process.cwd() + "/apps/googleAPIs/googleDocs.js");
  const GoogleSheet = require(`${process.cwd()}/apps/googleAPIs/googleSheet.js`);
  const GoogleCalendar = require(`${process.cwd()}/apps/googleAPIs/googleCalendar.js`);

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
  this.members = {};
  this.kakao = kakaoInstance;

  this.formidable = require("formidable");
  this.imageReader = new ImageReader(this.mother, this.back, this.address);
  this.hangul = new ParsingHangul();
  this.drive = new GoogleDrive();
  this.docs = new GoogleDocs();
  this.sheets = new GoogleSheet();
  this.calendar = new GoogleCalendar();

  this.facebook = new FacebookAPIs();
  this.naver = new NaverAPIs();
  this.google = new GoogleAds();
  this.youtube = new GoogleYoutube();

  this.staticConst = process.env.HOME + "/static";

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

ContentsRouter.prototype.storeContentsView = async function (selfMongo, selfCoreMongo, selfLocalMongo, logger) {
  const instance = this;
  const address = this.address;
  const back = this.back;
  const { requestSystem, equalJson, dateToString, stringToDate, sleep } = this.mother;
  try {
    const analyticsCollection = "homeliaisonAnalytics";
    const action = "contentsView";
    const collection = "contentsView";
    let rows;
    let whereQuery;
    let contentsArr;
    let jsonModel;
    let browserMap;
    let foundTarget, foundTarget2, foundTarget3;
    let osMap;
    let timeMap;
    let dateTypeString;
    let finalJson;
    let finalRows, key;

    key = dateToString(new Date()).replace(/[^0-9]/gi, '') + "_web";
    finalJson = {
      key,
      date: new Date(),
      contents: [],
    };

    contentsArr = await back.getContentsArrByQuery({}, { selfMongo: selfCoreMongo });
    for (let contents of contentsArr) {

      thisPid = contents.contents.portfolio.pid;
      whereQuery = { action, "data.contents_pid": thisPid };
      rows = await back.mongoRead(analyticsCollection, whereQuery, { selfMongo });
  
      browserMap = rows.filter((o) => { return typeof o.device.os.browser === "string" }).map((o) => { return o.device.os.browser.toLowerCase().trim(); });
      browserMap = [ ...new Set(browserMap) ];
      browserMap = browserMap.map((type) => { return { type, value: 0 } })
  
      osMap = rows.filter((o) => { return typeof o.device.os.name === "string" }).map((o) => { return o.device.os.name.toLowerCase().trim(); });
      osMap = [ ...new Set(osMap) ];
      osMap = osMap.map((type) => { return { type, value: 0 } })
  
      timeMap = rows.map((o) => { return dateToString(o.date).replace(/[^0-9]/gi, '').slice(0, 6) });
      timeMap = [ ...new Set(timeMap) ];
      timeMap = timeMap.map((type) => { return { type, value: 0 } })
  
      for (let obj of rows) {
        if (typeof obj.device.os.browser === "string") {
          foundTarget = browserMap.find((o) => { return o.type === obj.device.os.browser.toLowerCase().trim() });
          if (foundTarget !== undefined) {
            foundTarget.value = foundTarget.value + 1;
          }
        }
        if (typeof obj.device.os.name === "string") {
          foundTarget2 = osMap.find((o) => { return o.type === obj.device.os.name.toLowerCase().trim() });
          if (foundTarget2 !== undefined) {
            foundTarget2.value = foundTarget2.value + 1;
          }
        }
        dateTypeString = dateToString(obj.date).replace(/[^0-9]/gi, '').slice(0, 6)
        foundTarget3 = timeMap.find((o) => { return o.type === dateTypeString });
        if (foundTarget3 !== undefined) {
          foundTarget3.value = foundTarget3.value + 1;
        }
      }
  
      jsonModel = {
        pid: thisPid,
        conid: contents.conid,
        desid: contents.desid,
        proid: contents.proid,
        date: new Date(JSON.stringify(contents.contents.portfolio.date).slice(1, -1)),
        data: {
          view: {
            total: rows.length,
            portfolio: rows.filter((obj) => { return !/revdetail/gi.test(obj.info.requestUrl) }).length,
            review: rows.filter((obj) => { return /revdetail/gi.test(obj.info.requestUrl) }).length,
          },
          device: {
            mobile: rows.filter((obj) => { return /mobile/gi.test(obj.device.device.type) }).length,
            desktop: rows.filter((obj) => { return /desktop/gi.test(obj.device.device.type) }).length,
            tablet: rows.filter((obj) => { return /tablet/gi.test(obj.device.device.type) }).length,
          },
          browser: equalJson(JSON.stringify(browserMap)),
          os: equalJson(JSON.stringify(osMap)),
          time: equalJson(JSON.stringify(timeMap)),
        }
      };
  
      finalJson.contents.push(equalJson(JSON.stringify(jsonModel)));

      await sleep(1500);
    }
    
    finalRows = await back.mongoRead(collection, { key }, { selfMongo: selfLocalMongo });
    if (finalRows.length > 0) {
      await back.mongoDelete(collection, { key }, { selfMongo: selfLocalMongo });
    }
    await back.mongoCreate(collection, finalJson, { selfMongo: selfLocalMongo });

    await logger.log("store web contents view success : " + JSON.stringify(new Date()));
    return { message: "done" };
  } catch (e) {
    logger.error("Contents calculator 문제 생김 (storeContentsView): " + e.message).catch((e) => { console.log(e); });
    console.log(e);
    return null;
  }
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
      } else if (req.params.id === "metaWebhook") {
        res.set({
          "Content-Type": "text/plain",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
        });
        res.send(req.query["hub.challenge"] || req.query[" hub.challenge"]);
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


ContentsRouter.prototype.rou_post_metaComplex = function () {
  const instance = this;
  const meta = this.facebook;
  const naver = this.naver;
  const google = this.google;
  const kakao = this.kakao;
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
      let boo;

      (async () => {
        try {

          await meta.metaComplex(selfMongo, 2, logger);
          await sleep(500);

          boo = await naver.naverComplex(selfMongo, dayConst, logger);
          if (!boo) {
            await sleep(3000);
            boo = await naver.naverComplex(selfMongo, dayConst, logger);
            if (!boo) {
              await sleep(3000);
              boo = await naver.naverComplex(selfMongo, dayConst, logger);
              if (!boo) {
                await sleep(3000);
                await naver.naverComplex(selfMongo, dayConst, logger);
              }
            }
          }

          await sleep(500);

          boo = await google.googleComplex(selfMongo, dayConst, logger);
          if (!boo) {
            await sleep(3000);
            boo = await google.googleComplex(selfMongo, dayConst, logger);
            if (!boo) {
              await sleep(3000);
              boo = await google.googleComplex(selfMongo, dayConst, logger);
              if (!boo) {
                await sleep(3000);
                await google.googleComplex(selfMongo, dayConst, logger);
              }
            }
          }

          await sleep(500);

        } catch (e) {
          console.log(e);
          logger.error("Contents lounge 서버 문제 생김 (rou_post_metaComplex): " + e.message).catch((e) => { console.log(e); });
          return false;
        }
      })().catch((err) => {
        console.log(err);
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

ContentsRouter.prototype.rou_post_metaInstant = function () {
  const instance = this;
  const meta = this.facebook;
  const { fileSystem, equalJson, requestSystem, sleep, dateToString } = this.mother;
  let obj;
  obj = {};
  obj.link = [ "/metaInstant" ];
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
      const defaultDay = 3;
      const dayConst = req.body.day === undefined ? defaultDay : (Number.isNaN(Number(req.body.day)) ? defaultDay : Number(req.body.day));
      let boo;

      (async () => {
        try {
          boo = await meta.syncMetaInstantForm(selfMongo, dayConst, logger);
          if (!boo) {
            await sleep(3000);
            boo = await meta.syncMetaInstantForm(selfMongo, dayConst, logger);
            if (!boo) {
              await sleep(60 * 1000);
              boo = await meta.syncMetaInstantForm(selfMongo, dayConst, logger);
              if (!boo) {
                await sleep(60 * 1000);
                await meta.syncMetaInstantForm(selfMongo, dayConst, logger);
              }
            }
          }

          if (boo) {
            await sleep(3000);
            await meta.metaInstantToClient(selfMongo, selfCoreMongo, logger);
          }

        } catch (e) {
          console.log(e);
          logger.error("Contents lounge 서버 문제 생김 (rou_post_metaInstant): " + e.message).catch((e) => { console.log(e); });
          return false;
        }
      })().catch((err) => {
        console.log(err);
        logger.error("Contents lounge 서버 문제 생김 (rou_post_metaInstant): " + err.message).catch((e) => { console.log(e); });
      });

      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      logger.error("Contents lounge 서버 문제 생김 (rou_post_metaInstant): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

ContentsRouter.prototype.rou_post_kakaoComplex = function () {
  const instance = this;
  const kakao = this.kakao;
  const { fileSystem, equalJson, requestSystem, sleep, dateToString } = this.mother;
  let obj;
  obj = {};
  obj.link = [ "/kakaoComplex" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const selfMongo = instance.mongolocal;
      const defaultDay = 30;
      const dayConst = req.body.day === undefined ? defaultDay : (Number.isNaN(Number(req.body.day)) ? defaultDay : Number(req.body.day));
      let boo;

      (async () => {
        try {

        } catch (e) {
          console.log(e);
          logger.error("Contents lounge 서버 문제 생김 (rou_post_kakaoComplex): " + e.message).catch((e) => { console.log(e); });
          return false;
        }
      })().catch((err) => {
        console.log(err);
        logger.error("Contents lounge 서버 문제 생김 (rou_post_kakaoComplex): " + err.message).catch((e) => { console.log(e); });
      });

      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      logger.error("Contents lounge 서버 문제 생김 (rou_post_kakaoComplex): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

ContentsRouter.prototype.rou_post_getAdsComplex = function () {
  const instance = this;
  const { fileSystem, equalJson, requestSystem, sleep, dateToString } = this.mother;
  const back = this.back;
  let obj;
  obj = {};
  obj.link = [ "/getAdsComplex" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.startDate === undefined || req.body.endDate === undefined) {
        throw new Error("invalid post");
      }
      const { startDate, endDate } = equalJson(req.body);
      const selfMongo = instance.mongolocal;
      const collectionList = [
        "metaComplex",
        "naverComplex",
        "googleComplex",
        "kakaoComplex",
      ];
      let resultObj;
      let startDateCopied;
      let endDateCopied;
      let start, end;
      let rows;
      let whereQuery;

      resultObj = {};

      startDateCopied = new Date(JSON.stringify(startDate).slice(1, -1));
      start = new Date(startDateCopied.getFullYear(), startDateCopied.getMonth(), startDateCopied.getDate(), 0, 0, 0);

      endDateCopied = new Date(JSON.stringify(endDate).slice(1, -1));
      end = new Date(endDateCopied.getFullYear(), endDateCopied.getMonth(), endDateCopied.getDate(), 0, 0, 0);
      end.setDate(end.getDate() + 1);

      whereQuery = {};
      whereQuery["date.from"] = {
        $gte: start,
        $lt: end,
      }

      for (let collection of collectionList) {
        rows = await back.mongoRead(collection, whereQuery, { selfMongo });
        resultObj[collection.replace(/Complex/g, '')] = equalJson(JSON.stringify(rows));
        resultObj[collection.replace(/Complex/g, '')].sort((a, b) => {
          return b.date.from.valueOf() - a.date.from.valueOf();
        });
      }

      res.send(JSON.stringify(resultObj));
    } catch (e) {
      logger.error("Contents lounge 서버 문제 생김 (rou_post_getAdsComplex): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

ContentsRouter.prototype.rou_post_getSnsComplex = function () {
  const instance = this;
  const { fileSystem, equalJson, requestSystem, sleep, dateToString } = this.mother;
  const back = this.back;
  let obj;
  obj = {};
  obj.link = [ "/getSnsComplex" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.startDate === undefined || req.body.endDate === undefined) {
        throw new Error("invalid post");
      }
      const { startDate, endDate } = equalJson(req.body);
      const selfMongo = instance.mongolocal;
      const collectionList = [
        "metaComplex",
        "googleComplex",
      ];
      let resultObj;
      let startDateCopied;
      let endDateCopied;
      let start, end;
      let rows;
      let whereQuery;

      resultObj = {};

      startDateCopied = new Date(JSON.stringify(startDate).slice(1, -1));
      start = new Date(startDateCopied.getFullYear(), startDateCopied.getMonth(), startDateCopied.getDate(), 0, 0, 0);

      endDateCopied = new Date(JSON.stringify(endDate).slice(1, -1));
      end = new Date(endDateCopied.getFullYear(), endDateCopied.getMonth(), endDateCopied.getDate(), 0, 0, 0);
      end.setDate(end.getDate() + 1);

      whereQuery = {};
      whereQuery["date.from"] = {
        $gte: start,
        $lt: end,
      }

      for (let collection of collectionList) {
        rows = await back.mongoRead(collection, whereQuery, { selfMongo });
        resultObj[collection.replace(/Complex/g, '')] = equalJson(JSON.stringify(rows));
        resultObj[collection.replace(/Complex/g, '')].sort((a, b) => {
          return b.date.from.valueOf() - a.date.from.valueOf();
        });
      }

      res.send(JSON.stringify(resultObj));
    } catch (e) {
      logger.error("Contents lounge 서버 문제 생김 (rou_post_getSnsComplex): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

ContentsRouter.prototype.rou_post_evaluationSubmit = function () {
  const instance = this;
  const back = this.back;
  const kakao = this.kakao;
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
      const selfCoreMongo = instance.mongo;
      const collection = "clientEvaluation";
      const googleCollection = "shareGoogleId";
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
      let googleRows;
      let thisClient;

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

      googleRows = await back.mongoRead(googleCollection, { proid }, { selfMongo });
      if (googleRows.length > 0) {
        googleRows.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });
        thisClient = await back.getClientById(cliid, { selfMongo: selfCoreMongo });
        if (thisClient !== null) {
          kakao.sendTalk("evaluationSubmit", thisClient.name, thisClient.phone, {
            client: thisClient.name,
            file: googleRows[0].google.original,
          }).catch((err) => {
            console.log(err);
          });
        }
      }

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
        const { cliid, desid, proid } = equalJson(req.body);
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

ContentsRouter.prototype.rou_post_getAllContents = function () {
  const instance = this;
  const back = this.back;
  const { equalJson, messageSend, sleep } = this.mother;
  let obj = {};
  obj.link = [ "/getAllContents" ];
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
      const selfMongo = instance.mongo;
      const selfLocalMongo = instance.mongolocal;
      const collection = "foreContents";
      const delta = 24;
      let contentsArr, projects, clients, designers;
      let whereQuery0, whereQuery1;
      let resultObj;
      let foreContents;
      let proidArr;
      let coreWhereQuery;
      let ago;
      let searchClients;
      let searchProjects;
      let cliidArr;
      let searchProidArr;
      let searchContents;
      let searchForeContents;
      let desidArr;
      let thisDesignerName;

      if (mode === "all") {

        if (req.body.whereQuery === undefined) {
          if (req.body.init !== undefined) {
            ago = new Date();
            ago.setMonth(ago.getMonth() - delta);
            contentsArr = (await back.getContentsArrByQuery({
              "contents.portfolio.date": { $gte: ago }
            }, { selfMongo })).toNormal();
          } else {
            contentsArr = (await back.getContentsArrByQuery({}, { selfMongo })).toNormal();
          }
        } else {
          coreWhereQuery = equalJson(req.body.whereQuery);
          contentsArr = (await back.getContentsArrByQuery(coreWhereQuery, { selfMongo })).toNormal();
        }

        designers = (await back.getDesignersByQuery({}, { selfMongo })).toNormal();

        if (req.body.nonFore !== undefined) {
          foreContents = [];  
        } else {
          foreContents = await back.mongoRead(collection, {}, { selfMongo: selfLocalMongo });
          foreContents.sort((a, b) => { return Number(b.pid.replace(/[^0-9]/gi, '')) - Number(a.pid.replace(/[^0-9]/gi, '')); });  
        }

        proidArr = contentsArr.filter((c) => { return c.proid !== "" }).map((obj) => { return obj.proid });
        proidArr = proidArr.concat(foreContents.map((o) => { return o.proid }));
        proidArr = [ ...new Set(proidArr) ];
  
        whereQuery0 = {};
        whereQuery0["$or"] = proidArr.map((proid) => { return { proid } });
        projects = (await back.getProjectsByQuery(whereQuery0, { selfMongo })).toNormal();
  
        whereQuery1 = {};
        whereQuery1["$or"] = projects.map((obj) => { return { cliid: obj.cliid } });
        clients = (await back.getClientsByQuery(whereQuery1, { selfMongo })).toNormal();
  
        resultObj = { contentsArr, foreContents, projects, clients, designers };
  
        res.send(JSON.stringify(resultObj));

      } else if (mode === "search") {

        if (req.body.value === undefined) {
          throw new Error("invalid post");
        }
        const { value } = equalJson(req.body);

        if (/^[가-힣]/i.test(value)) {

          designers = (await back.getDesignersByQuery({ designer: { $regex: value } }, { selfMongo })).toNormal();
          if (designers.length > 0) {

            desidArr = designers.filter((d) => { return d.desid !== "" }).map((d) => { return d.desid });
            desidArr = [ ...new Set(desidArr) ];
            
            projects = (await back.getProjectsByQuery({ $or: desidArr.map((desid) => { return { desid } }) }, { selfMongo })).toNormal();
            proidArr = projects.filter((d) => { return d.proid !== "" }).map((d) => { return d.proid });
            proidArr = [ ...new Set(proidArr) ];

            searchContents = [];
            searchForeContents = [];
            if (proidArr.length > 0) {
              searchProidArr = proidArr.map((proid) => { return { proid } }).concat(desidArr.map((desid) => { return { desid } }));
              searchContents = await back.getContentsArrByQuery({ $or: searchProidArr }, { selfMongo });
              searchForeContents = await back.mongoRead(collection, { $or: searchProidArr }, { selfMongo: selfLocalMongo });  
            }

            proidArr = searchContents.filter((c) => { return c.proid !== "" }).map((obj) => { return obj.proid });
            proidArr = proidArr.concat(searchForeContents.map((o) => { return o.proid }));
            proidArr = [ ...new Set(proidArr) ];
            
            if (proidArr.length > 0) {
              whereQuery0 = {};
              whereQuery0["$or"] = proidArr.map((proid) => { return { proid } });
              projects = (await back.getProjectsByQuery(whereQuery0, { selfMongo })).toNormal();
              whereQuery1 = {};
              whereQuery1["$or"] = projects.map((obj) => { return { cliid: obj.cliid } });
              clients = (await back.getClientsByQuery(whereQuery1, { selfMongo })).toNormal();
              resultObj = {
                contentsArr: searchContents,
                foreContents: searchForeContents,
                projects,
                clients,
                designers
              };
            } else {
              projects = [];
              clients = [];
              resultObj = {
                contentsArr: searchContents,
                foreContents: searchForeContents,
                projects,
                clients,
                designers
              };
            }

          } else {
            resultObj = {
              contentsArr: [],
              foreContents: [],
              projects: [],
              clients: [],
              designers: [],
            };
          }

        } else if (/^c[ ]*\:[ ]*[가-힣]*/i.test(value)) {

          thisDesignerName = value.split(":").map((str) => { return str.trim() })[1];

          searchContents = [];
          searchForeContents = [];
          searchClients = await back.getClientsByQuery({
            name: { $regex: thisDesignerName }
          }, { selfMongo });
          if (searchClients.length > 0) {
            cliidArr = searchClients.toNormal().map((c) => { return c.cliid }).map((cliid) => { return { cliid } });
            searchProjects = await back.getProjectsByQuery({
              $or: cliidArr
            }, { selfMongo });
            if (searchProjects.length > 0) {
              searchProidArr = searchProjects.toNormal().map((c) => { return c.proid }).map((proid) => { return { proid } });
              searchContents = await back.getContentsArrByQuery({ $or: searchProidArr }, { selfMongo });
              searchForeContents = await back.mongoRead(collection, { $or: searchProidArr }, { selfMongo: selfLocalMongo });
            }
          }

          proidArr = searchContents.filter((c) => { return c.proid !== "" }).map((obj) => { return obj.proid });
          proidArr = proidArr.concat(searchForeContents.map((o) => { return o.proid }));
          proidArr = [ ...new Set(proidArr) ];
    
          desidArr = searchContents.filter((c) => { return c.desid !== "" }).map((obj) => { return obj.desid });
          desidArr = desidArr.concat(searchForeContents.map((o) => { return o.desid }));
          desidArr = [ ...new Set(desidArr) ];

          if (desidArr.length > 0) {
            designers = (await back.getDesignersByQuery({ $or: desidArr.map((desid) => { return { desid } }) }, { selfMongo })).toNormal();
          } else {
            designers = [];
          }

          if (proidArr.length > 0) {
            whereQuery0 = {};
            whereQuery0["$or"] = proidArr.map((proid) => { return { proid } });
            projects = (await back.getProjectsByQuery(whereQuery0, { selfMongo })).toNormal();
            whereQuery1 = {};
            whereQuery1["$or"] = projects.map((obj) => { return { cliid: obj.cliid } });
            clients = (await back.getClientsByQuery(whereQuery1, { selfMongo })).toNormal();
            resultObj = {
              contentsArr: searchContents,
              foreContents: searchForeContents,
              projects,
              clients,
              designers
            };
          } else {
            projects = [];
            clients = [];
            resultObj = {
              contentsArr: searchContents,
              foreContents: searchForeContents,
              projects,
              clients,
              designers
            };
          }
        } else {
          if (/^[ap][0-9]+$/i.test(value)) {

            searchContents = await back.getContentsArrByQuery({ "contents.portfolio.pid": value.trim() }, { selfMongo });
            searchForeContents = await back.mongoRead(collection, { "pid": value.trim() }, { selfMongo: selfLocalMongo });

            proidArr = searchContents.filter((c) => { return c.proid !== "" }).map((obj) => { return obj.proid });
            proidArr = proidArr.concat(searchForeContents.map((o) => { return o.proid }));
            proidArr = [ ...new Set(proidArr) ];
      
            desidArr = searchContents.filter((c) => { return c.desid !== "" }).map((obj) => { return obj.desid });
            desidArr = desidArr.concat(searchForeContents.map((o) => { return o.desid }));
            desidArr = [ ...new Set(desidArr) ];
  
            if (desidArr.length > 0) {
              designers = (await back.getDesignersByQuery({ $or: desidArr.map((desid) => { return { desid } }) }, { selfMongo })).toNormal();
            } else {
              designers = [];
            }
  
            if (proidArr.length > 0) {
              whereQuery0 = {};
              whereQuery0["$or"] = proidArr.map((proid) => { return { proid } });
              projects = (await back.getProjectsByQuery(whereQuery0, { selfMongo })).toNormal();
              whereQuery1 = {};
              whereQuery1["$or"] = projects.map((obj) => { return { cliid: obj.cliid } });
              clients = (await back.getClientsByQuery(whereQuery1, { selfMongo })).toNormal();
              resultObj = {
                contentsArr: searchContents,
                foreContents: searchForeContents,
                projects,
                clients,
                designers
              };
            } else {
              projects = [];
              clients = [];
              resultObj = {
                contentsArr: searchContents,
                foreContents: searchForeContents,
                projects,
                clients,
                designers
              };
            }

          } else if (/^p/i.test(value)) {

            searchContents = await back.getContentsArrByQuery({ "proid": value.trim() }, { selfMongo });
            searchForeContents = await back.mongoRead(collection, { "proid": value.trim() }, { selfMongo: selfLocalMongo });

            proidArr = searchContents.filter((c) => { return c.proid !== "" }).map((obj) => { return obj.proid });
            proidArr = proidArr.concat(searchForeContents.map((o) => { return o.proid }));
            proidArr = [ ...new Set(proidArr) ];
      
            desidArr = searchContents.filter((c) => { return c.desid !== "" }).map((obj) => { return obj.desid });
            desidArr = desidArr.concat(searchForeContents.map((o) => { return o.desid }));
            desidArr = [ ...new Set(desidArr) ];
  
            if (desidArr.length > 0) {
              designers = (await back.getDesignersByQuery({ $or: desidArr.map((desid) => { return { desid } }) }, { selfMongo })).toNormal();
            } else {
              designers = [];
            }
  
            if (proidArr.length > 0) {
              whereQuery0 = {};
              whereQuery0["$or"] = proidArr.map((proid) => { return { proid } });
              projects = (await back.getProjectsByQuery(whereQuery0, { selfMongo })).toNormal();
              whereQuery1 = {};
              whereQuery1["$or"] = projects.map((obj) => { return { cliid: obj.cliid } });
              clients = (await back.getClientsByQuery(whereQuery1, { selfMongo })).toNormal();
              resultObj = {
                contentsArr: searchContents,
                foreContents: searchForeContents,
                projects,
                clients,
                designers
              };
            } else {
              projects = [];
              clients = [];
              resultObj = {
                contentsArr: searchContents,
                foreContents: searchForeContents,
                projects,
                clients,
                designers
              };
            }

          } else if (/^t/i.test(value)) {

            searchContents = await back.getContentsArrByQuery({ "conid": value.trim() }, { selfMongo });
            searchForeContents = [];

            proidArr = searchContents.filter((c) => { return c.proid !== "" }).map((obj) => { return obj.proid });
            proidArr = proidArr.concat(searchForeContents.map((o) => { return o.proid }));
            proidArr = [ ...new Set(proidArr) ];
      
            desidArr = searchContents.filter((c) => { return c.desid !== "" }).map((obj) => { return obj.desid });
            desidArr = desidArr.concat(searchForeContents.map((o) => { return o.desid }));
            desidArr = [ ...new Set(desidArr) ];
  
            if (desidArr.length > 0) {
              designers = (await back.getDesignersByQuery({ $or: desidArr.map((desid) => { return { desid } }) }, { selfMongo })).toNormal();
            } else {
              designers = [];
            }
  
            if (proidArr.length > 0) {
              whereQuery0 = {};
              whereQuery0["$or"] = proidArr.map((proid) => { return { proid } });
              projects = (await back.getProjectsByQuery(whereQuery0, { selfMongo })).toNormal();
              whereQuery1 = {};
              whereQuery1["$or"] = projects.map((obj) => { return { cliid: obj.cliid } });
              clients = (await back.getClientsByQuery(whereQuery1, { selfMongo })).toNormal();
              resultObj = {
                contentsArr: searchContents,
                foreContents: searchForeContents,
                projects,
                clients,
                designers
              };
            } else {
              projects = [];
              clients = [];
              resultObj = {
                contentsArr: searchContents,
                foreContents: searchForeContents,
                projects,
                clients,
                designers
              };
            }

          } else if (/^d/i.test(value)) {

            designers = (await back.getDesignersByQuery({ desid: { $regex: value } }, { selfMongo })).toNormal();
            if (designers.length > 0) {

              desidArr = designers.filter((d) => { return d.desid !== "" }).map((d) => { return d.desid });
              desidArr = [ ...new Set(desidArr) ];
              
              projects = (await back.getProjectsByQuery({ $or: desidArr.map((desid) => { return { desid } }) }, { selfMongo })).toNormal();
              proidArr = projects.filter((d) => { return d.proid !== "" }).map((d) => { return d.proid });
              proidArr = [ ...new Set(proidArr) ];

              searchContents = [];
              searchForeContents = [];
              if (proidArr.length > 0) {
                searchProidArr = proidArr.map((proid) => { return { proid } }).concat(desidArr.map((desid) => { return { desid } }));
                searchContents = await back.getContentsArrByQuery({ $or: searchProidArr }, { selfMongo });
                searchForeContents = await back.mongoRead(collection, { $or: searchProidArr }, { selfMongo: selfLocalMongo });  
              }

              proidArr = searchContents.filter((c) => { return c.proid !== "" }).map((obj) => { return obj.proid });
              proidArr = proidArr.concat(searchForeContents.map((o) => { return o.proid }));
              proidArr = [ ...new Set(proidArr) ];
              
              if (proidArr.length > 0) {
                whereQuery0 = {};
                whereQuery0["$or"] = proidArr.map((proid) => { return { proid } });
                projects = (await back.getProjectsByQuery(whereQuery0, { selfMongo })).toNormal();
                whereQuery1 = {};
                whereQuery1["$or"] = projects.map((obj) => { return { cliid: obj.cliid } });
                clients = (await back.getClientsByQuery(whereQuery1, { selfMongo })).toNormal();
                resultObj = {
                  contentsArr: searchContents,
                  foreContents: searchForeContents,
                  projects,
                  clients,
                  designers
                };
              } else {
                projects = [];
                clients = [];
                resultObj = {
                  contentsArr: searchContents,
                  foreContents: searchForeContents,
                  projects,
                  clients,
                  designers
                };
              }

            } else {
              resultObj = {
                contentsArr: [],
                foreContents: [],
                projects: [],
                clients: [],
                designers: [],
              };
            }

          } else {
            resultObj = {
              contentsArr: [],
              foreContents: [],
              projects: [],
              clients: [],
              designers: [],
            };
          }
        }

        res.send(JSON.stringify(resultObj));

      } else {
        throw new Error("invalid mode");
      }

    } catch (e) {
      logger.error("Contents lounge 서버 문제 생김 (rou_post_getAllContents): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

ContentsRouter.prototype.rou_post_queryAnalytics = function () {
  const instance = this;
  const back = this.back;
  const { fileSystem, equalJson, requestSystem, sleep, dateToString } = this.mother;
  let obj;
  obj = {};
  obj.link = [ "/queryAnalytics" ];
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
      const collection = "queryAnalytics";
      let rows;
      if (mode === "get") {
        if (req.body.whereQuery === undefined) {
          throw new Error("invalid post 2");
        }
        const { whereQuery } = equalJson(req.body);
        rows = await back.mongoRead(collection, whereQuery, { selfMongo });
        for (let obj of rows) {
          delete obj._id;
        }
        res.send(JSON.stringify(rows));
      } else {
        throw new Error("invalid mode");
      }
    } catch (e) {
      logger.error("Contents lounge 서버 문제 생김 (rou_post_queryAnalytics): " + e.message).catch((e) => { console.log(e); });
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
