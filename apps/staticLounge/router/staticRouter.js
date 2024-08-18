const StaticRouter = function (MONGOC, MONGOLOCALC, MONGOCONSOLEC, MONGOCONTENTSC, kakao, human) {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  const BackWorker = require(`${process.cwd()}/apps/backMaker/backWorker.js`);
  const ImageReader = require(process.cwd() + "/apps/imageReader/imageReader.js");
  const ParsingHangul = require(process.cwd() + "/apps/parsingHangul/parsingHangul.js");
  const GoogleDrive = require(`${process.cwd()}/apps/googleAPIs/googleDrive.js`);
  const GoogleDocs = require(process.cwd() + "/apps/googleAPIs/googleDocs.js");
  const GoogleChrome = require(process.cwd() + "/apps/googleAPIs/googleChrome.js");
  const GoogleSheet = require(`${process.cwd()}/apps/googleAPIs/googleSheet.js`);
  const GoogleSlides = require(process.cwd() + "/apps/googleAPIs/googleSlides.js");
  const GoogleForms = require(process.cwd() + "/apps/googleAPIs/googleForms.js");
  const GoogleCalendar = require(`${process.cwd()}/apps/googleAPIs/googleCalendar.js`);
  const GoogleAnalytics = require(`${process.cwd()}/apps/googleAPIs/googleAnalytics.js`);
  const PlayAudio = require(process.cwd() + "/apps/playAudio/playAudio.js");
  const NotionAPIs = require(process.cwd() + "/apps/notionAPIs/notionAPIs.js");
  const MicrosoftAPIs = require(`${process.cwd()}/apps/microsoftAPIs/microsoftAPIs.js`);
  const NaverAPIs = require(`${process.cwd()}/apps/naverAPIs/naverAPIs.js`);
  const LocalDevices = require(`${process.cwd()}/apps/localDevices/localDevices.js`);
  const LogReport = require(`${process.cwd()}/apps/logConsole/router/logReport.js`);
  const FacebookAPIs = require(`${process.cwd()}/apps/facebookAPIs/facebookAPIs.js`);
  const GoogleAds = require(`${process.cwd()}/apps/googleAPIs/googleAds.js`);
  const GoogleYoutube = require(`${process.cwd()}/apps/googleAPIs/googleYoutube.js`);

  this.mother = new Mother();
  this.back = new BackMaker();
  this.work = new BackWorker();
  this.address = require(`${process.cwd()}/apps/infoObj.js`);
  this.host = this.address.officeinfo.ghost.host;
  this.mongo = MONGOC;
  this.mongolocal = MONGOLOCALC;
  this.mongoconsole = MONGOCONSOLEC;
  this.members = {};

  this.formidable = require("formidable");
  this.imageReader = new ImageReader(this.mother, this.back, this.address);
  this.hangul = new ParsingHangul();
  this.drive = new GoogleDrive();
  this.docs = new GoogleDocs();
  this.chrome = new GoogleChrome();
  this.sheets = new GoogleSheet();
  this.calendar = new GoogleCalendar();
  this.analytics = new GoogleAnalytics();
  this.audio = new PlayAudio();
  this.slides = new GoogleSlides();
  this.forms = new GoogleForms();
  this.notion = new NotionAPIs();
  this.microsoft = new MicrosoftAPIs();
  this.devices = new LocalDevices();
  this.report = new LogReport(MONGOLOCALC);
  this.naver = new NaverAPIs();
  this.facebook = new FacebookAPIs();
  this.google = new GoogleAds();
  this.youtube = new GoogleYoutube();

  this.kakao = kakao;
  this.human = human;

  this.staticConst = process.env.HOME + "/samba";
  this.portfolioConst = process.env.HOME + "/portfolioFilter/resource";
  this.sambaToken = "__samba__";
  this.homeliaisonOfficeConst = this.address.officeinfo.ghost.file.office;
  this.designerPhotoConst = "사진_등록_포트폴리오";
  this.designerFolderConst = "디자이너";
  this.designerFolderConst2 = "partnership";

  this.centrex = {
    host: "centrex.uplus.co.kr",
    sessionConst: "PHPSESSID",
    sessionValue: "18c31ed858c6824a885da1cc06daf388",
  };

  this.pushbullet = {
    host: "api.pushbullet.com",
    version: "v2",
    token: "o.k3SkBfY804BeUQhbHPQNPUK8FIIfz2XW",
    device: "ujy8FVCcQOysjv0gcsq9DM",
    threads: [ 33, 36 ],
    password: "homeliaison",
  };

  this.vaildHost = [
    this.address.frontinfo.host,
    this.address.secondinfo.host,
    this.address.transinfo.host,
    this.address.backinfo.host,
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

StaticRouter.prototype.fireWall = function (req) {
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

StaticRouter.prototype.storeContentsView = async function (selfMongo, selfCoreMongo, selfLocalMongo, logger) {
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

StaticRouter.prototype.dailyAnalytics = async function () {
  const instance = this;
  const back = this.back;
  const { dateToString, requestSystem, sleep } = this.mother;
  try {
    let date;
    let requestString;

    date = new Date();
    date.setDate(date.getDate() - 1);
    date.setDate(date.getDate() - 1);
    date.setDate(date.getDate() - 1);

    requestString = '';
    requestString += dateToString(date);
    requestString += ',';
    date.setDate(date.getDate() + 1);
    requestString += dateToString(date);
    requestString += ',';
    date.setDate(date.getDate() + 1);
    requestString += dateToString(date);

    await requestSystem("https://" + instance.address.officeinfo.ghost.host + "/analyticsDaily", { date: requestString }, { headers: { "Content-Type": "application/json" } });

  } catch (e) {
    console.log(e);
  }
}

//GET ---------------------------------------------------------------------------------------------

StaticRouter.prototype.rou_get_Root = function () {
  const instance = this;
  const address = this.address;
  let obj = {};
  obj.link = '/';
  obj.func = async function (req, res, logger) {
    try {
      res.redirect("https://" + address.frontinfo.host);
    } catch (e) {
      logger.error("Log Console 서버 문제 생김 (rou_get_Root): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.redirect("https://" + address.frontinfo.host);
    }
  }
  return obj;
}

StaticRouter.prototype.rou_get_First = function () {
  const instance = this;
  const microsoft = this.microsoft;
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
        instance.dailyAnalytics().then(() => {
          return logger.cron("front reflection, daily campaign, daily channel request done");
        }).catch((err) => {
          logger.error("log disk cron error : " + err.message).catch((e) => { console.log(e); });
          console.log(err);
        });
        res.send(JSON.stringify({ disk: disk.toArray(), mongo: aliveMongoResult }));
      } else if (req.params.id === "disk") {
        const disk = await diskReading();
        res.send(JSON.stringify({ disk: disk.toArray() }));
      } else if (((req.params.id === "microsoft" && typeof req.query === "object") && req.query !== null) && typeof req.query.code === "string") {
        microsoft.codeToAccessToken(req.query.code).catch((err) => { console.log(err) });
        res.send(JSON.stringify({ message: "hi" }));
      } else if (req.params.id === "ip") {
        const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
        res.set({
          "Content-Type": "text/plain",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
        });
        res.send(String(ip).replace(/[^0-9\.]/gi, ''));
      } else {
        res.send(JSON.stringify({ message: "hi" }));
      }

    } catch (e) {
      logger.error("Static lounge 서버 문제 생김 (rou_get_First): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
    }
  }

  return obj;
}

StaticRouter.prototype.rou_get_Address = function () {
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

//POST ---------------------------------------------------------------------------------------------

StaticRouter.prototype.rou_post_listFiles = function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink, leafParsing } = this.mother;
  const { staticConst, sambaToken } = this;
  let obj;
  obj = {};
  obj.link = [ "/listFiles" ];
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
      if (req.body.path === undefined) {
        throw new Error("invaild post");
      }
      let target;
      let list;

      target = req.body.path.replace(/^\//i, '').replace(/\/$/i, '');
      if (target.trim() === '') {
        target = sambaToken;
      }
      if (!/^__/.test(target)) {
        target = sambaToken + "/" + target;
      }

      target = target.replace(new RegExp(sambaToken, "gi"), staticConst);
      list = await leafParsing(target);
      if (!Array.isArray(list)) {
        list = [];
      }

      list = list.map((i) => {
        i.absolute = i.absolute.replace(new RegExp("^" + staticConst, "i"), sambaToken);
        return i;
      }).filter((i) => {
        return !/^\.\_/.test(i.absolute.split("/")[i.absolute.split("/").length - 1]);
      }).filter((i) => {
        return i.absolute.split("/")[i.absolute.split("/").length - 1] !== ".DS_Store";
      });

      res.send(JSON.stringify(list));
    } catch (e) {
      logger.error("Static lounge 서버 문제 생김 (rou_post_listFiles): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_searchFiles = function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink, leafParsing } = this.mother;
  const { staticConst, sambaToken } = this;
  let obj;
  obj = {};
  obj.link = [ "/searchFiles" ];
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
      if (req.body.path === undefined || req.body.keyword === undefined || req.body.mode === undefined) {
        throw new Error("invaild post");
      }
      let target;
      let result;
      let list;

      target = req.body.path.replace(/^\//i, '').replace(/\/$/i, '');
      if (target.trim() === '') {
        target = sambaToken;
      }
      if (!/^__/.test(target)) {
        target = sambaToken + "/" + target;
      }

      target = target.replace(new RegExp(sambaToken, "gi"), staticConst);
      if (req.body.mode === "entire") {
        list = await leafParsing(target, true, req.body.keyword);
        if (!Array.isArray(list)) {
          throw new Error(list.error);
        }
      } else {
        list = await leafParsing(target, true, req.body.keyword);
        if (!Array.isArray(list)) {
          throw new Error(list.error);
        }
        list = list.filter((obj) => {
          return (new RegExp(target)).test(obj.absolute);
        }).filter((obj) => {
          return obj.absolute.split("/").length === target.split("/").length + 1
        });
      }

      list = list.map((i) => {
        i.absolute = i.absolute.replace(new RegExp("^" + staticConst, "i"), sambaToken);
        return i;
      }).filter((i) => {
        return !/^\.\_/.test(i.absolute.split("/")[i.absolute.split("/").length - 1]);
      }).filter((i) => {
        return i.absolute.split("/")[i.absolute.split("/").length - 1] !== ".DS_Store";
      });

      res.send(JSON.stringify(list));
    } catch (e) {
      logger.error("Static lounge 서버 문제 생김 (rou_post_searchFiles): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_readDir = function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink } = this.mother;
  const { staticConst, sambaToken } = this;
  let obj;
  obj = {};
  obj.link = [ "/readDir", "/readFolder" ];
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
      if (req.body.path === undefined) {
        throw new Error("invaild post");
      }
      let target;
      let list;

      target = req.body.path.replace(/^\//i, '').replace(/\/$/i, '');
      if (target.trim() === '') {
        target = sambaToken;
      }
      if (!/^__/.test(target)) {
        target = sambaToken + "/" + target;
      }

      target = target.replace(new RegExp("^" + sambaToken, "i"), staticConst);

      list = await fileSystem(`readFolder`, [ target ]);

      res.send(JSON.stringify(list));
    } catch (e) {
      logger.error("Static lounge 서버 문제 생김 (rou_post_readDir): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_readFile = function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink } = this.mother;
  const { staticConst, sambaToken } = this;
  let obj;
  obj = {};
  obj.link = [ "/readFile" ];
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
      if (req.body.path === undefined) {
        throw new Error("invaild post");
      }
      let target;
      let contents;

      target = req.body.path.replace(/^\//i, '').replace(/\/$/i, '');
      if (target.trim() === '') {
        target = sambaToken;
      }
      if (!/^__/.test(target)) {
        target = sambaToken + "/" + target;
      }

      target = target.replace(new RegExp(sambaToken, "gi"), staticConst);
      contents = await fileSystem(`readString`, [ target ]);

      res.send(JSON.stringify({ contents }));
    } catch (e) {
      logger.error("Static lounge 서버 문제 생김 (rou_post_readFile): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_findFolderId = function () {
  const instance = this;
  const drive = this.drive;
  const { fileSystem, shellExec, shellLink } = this.mother;
  const { staticConst } = this;
  const sambaKeyword = "drive";
  const rootFolders = [
    {
      name: "HomeLiaisonServer",
      id: "1KOGtX31o16N6cfkdfyeAFrD9-2EFTO0d",
    },
    {
      name: "# 홈리에종",
      id: "0B7youNEnMPEfQjBNZldFZXVlVTg",
    },
  ]
  let obj;
  obj = {};
  obj.link = [ "/findFolderId" ];
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
      if (req.body.path === undefined) {
        throw new Error("invaild post");
      }
      const { path } = req.body;
      const thisFolderArr = path.replace(/\/$/i, '').replace(/\/$/i, '').split("/");
      let sambaIndex;
      let thisRootId;
      let thisRootIndex;
      let chainTarget;
      let parentId;
      let thisId;
      let finalId;

      sambaIndex = thisFolderArr.findIndex((str) => { return str === sambaKeyword });

      if (thisFolderArr[sambaIndex + 1] === undefined || !rootFolders.map(({ name }) => { return name; }).includes(thisFolderArr[sambaIndex + 1])) {
        throw new Error("invalid path 1");
      }

      thisRootIndex = sambaIndex + 1;
      thisRootId = rootFolders.find(({ name }) => { return name === thisFolderArr[thisRootIndex] }).id;

      chainTarget = thisFolderArr.slice(thisRootIndex + 1);

      finalId = null;
      if (chainTarget.length > 0) {

        parentId = thisRootId;
        for (let folderName of chainTarget) {
          thisId = await drive.searchFolderId_inPython(folderName, parentId);
          if (thisId === null) {
            throw new Error("invalid path 2");
          }
          parentId = thisId;
        }

        finalId = thisId;

      } else {
        finalId = thisRootId;
      }

      if (finalId === null) {
        throw new Error("invalid path 3");
      }

      res.send(JSON.stringify({ id: finalId }));

    } catch (e) {
      logger.error("Static lounge 서버 문제 생김 (rou_post_findFolderId): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_findFileId = function () {
  const instance = this;
  const drive = this.drive;
  const { fileSystem, shellExec, shellLink } = this.mother;
  const { staticConst } = this;
  let obj;
  obj = {};
  obj.link = [ "/findFileId" ];
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
      if (req.body.parent === undefined || req.body.name === undefined) {
        throw new Error("invaild post");
      }
      const { name, parent } = req.body;
      const finalId = await drive.searchFileId_inPython(name, parent);
      if (finalId === null) {
        throw new Error("cannot found");
      }
      res.send(JSON.stringify({ id: finalId }));

    } catch (e) {
      logger.error("Static lounge 서버 문제 생김 (rou_post_findFileId): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_parsingDrawio = function () {
  const instance = this;
  const drive = this.drive;
  const { fileSystem, shellExec, shellLink, uniqueValue, sleep } = this.mother;
  const { staticConst } = this;
  const drawioHost = "app.diagrams.net";
  const drawioUrlMother = "https://" + drawioHost;
  const drawioUserId = "111085281738578060467";
  const drawioVersion = "21.1.8";
  const drawioType = "google";
  const drawioExe = "drawio";
  const xmlMaker = (date, userAgent) => {
    return `<mxfile host="${drawioHost}" modified=${JSON.stringify(date)} agent="${userAgent}" version="${drawioVersion}" type="${drawioType}">
    <diagram name="Page-1" id="0"><mxGraphModel grid="1" page="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" pageScale="1" pageWidth="850" pageHeight="1100" math="0" shadow="0">
    <root><mxCell id="0" /><mxCell id="1" parent="0" /></root></mxGraphModel></diagram></mxfile>`;
  }
  let obj;
  obj = {};
  obj.link = [ "/parsingDrawio" ];
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
      if (req.body.mode === undefined || req.body.parent === undefined || req.body.name === undefined) {
        throw new Error("invaild post");
      }
      const { mode, name, parent } = req.body;
      let finalId;
      let url, json;
      let rawUserAgent;
      let userAgent;
      let contents;
      let thisFileName;
      let thisFile;

      if (mode === "get") {

        finalId = await drive.searchFileId_inPython(name, parent);
        if (finalId === null) {
          throw new Error("cannot found");
        }
        json = {
          ids: [ finalId ],
          action: "open",
          userId: drawioUserId,
          resourceKeys: {}
        };
        url = `${drawioUrlMother}?state=${globalThis.encodeURIComponent(JSON.stringify(json))}`;

        res.send(JSON.stringify({ url }));

      } else if (mode === "create") {

        rawUserAgent = req.useragent;
        ({ source: userAgent } = rawUserAgent);

        contents = xmlMaker(new Date(), userAgent);
        thisFileName = `${name}.${drawioExe}`;
        thisFile = `${process.cwd()}/temp/${thisFileName}`;
        await fileSystem(`write`, [ thisFile, contents ]);

        finalId = await drive.upload_inPython(parent, thisFile);
        if (finalId === null) {
          throw new Error("fail create drawio");
        }

        await shellExec(`rm`, [ `-rf`, thisFile ]);

        res.send(JSON.stringify({ url: "https://drive.google.com/file/d/" + finalId +"/view?usp=sharing" }));

      }

    } catch (e) {
      logger.error("Static lounge 서버 문제 생김 (rou_post_parsingDrawio): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_getPathFromId = function () {
  const instance = this;
  const drive = this.drive;
  const { fileSystem, shellExec, shellLink } = this.mother;
  const { staticConst, sambaToken } = this;
  const sambaKeyword = "drive";
  let obj;
  obj = {};
  obj.link = [ "/getPathFromId" ];
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
      if (req.body.id === undefined) {
        throw new Error("invaild post");
      }
      const { id } = req.body;
      let resultObj;

      resultObj = await drive.get_targetInfo_inPython(id);
      if (resultObj === null) {
        throw new Error("invalid id");
      }

      res.send(JSON.stringify({ path: sambaToken + "/" + sambaKeyword + resultObj.absolute }));

    } catch (e) {
      logger.error("Static lounge 서버 문제 생김 (rou_post_getPathFromId): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_moveFiles = function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink, equalJson } = this.mother;
  const { staticConst, sambaToken } = this;
  let obj;
  obj = {};
  obj.link = [ "/moveFiles" ];
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
      if (req.body.fromItems === undefined || req.body.toFolder === undefined) {
        throw new Error("invalid post");
      }
      const { fromItems, toFolder } = equalJson(req.body);
      if (!Array.isArray(fromItems) || typeof toFolder !== "string") {
        throw new Error("invalid post 2");
      }
      if (!fromItems.every((str) => { return typeof str === "string" })) {
        throw new Error("invalid post 3");
      }
      let target;
      let toTarget;

      toTarget = toFolder.replace(/^\//i, '').replace(/\/$/i, '');
      if (toTarget.trim() === '') {
        toTarget = sambaToken;
      }
      if (!/^__/.test(toTarget)) {
        toTarget = sambaToken + "/" + toTarget;
      }
      toTarget = toTarget.replace(/__samba__/gi, staticConst);

      for (let str of fromItems) {
        target = str.replace(/^\//i, '').replace(/\/$/i, '');
        if (target.trim() === '') {
          target = sambaToken;
        }
        if (!/^__/.test(target)) {
          target = sambaToken + "/" + target;
        }
        target = target.replace(/__samba__/gi, staticConst);
        await shellExec("mv", [ target, toTarget + "/" ]);
      }

      res.send(JSON.stringify({ message: "success" }));

    } catch (e) {
      console.log(e);
      logger.error("Static lounge 서버 문제 생김 (rou_post_moveFiles): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_createNewSheets = function () {
  const instance = this;
  const sheets = this.sheets;
  const { fileSystem, shellExec, shellLink, equalJson } = this.mother;
  const { staticConst } = this;
  let obj;
  obj = {};
  obj.link = [ "/createNewSheets" ];
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
      if (req.body.name === undefined || req.body.parent === undefined) {
        throw new Error("invalid post");
      }
      const { name, parent } = equalJson(req.body);
      let sheetsId;
      sheetsId = await sheets.create_newSheets_inPython(name, parent);
      res.send(JSON.stringify({ message: "success", sheetsId }));
    } catch (e) {
      logger.error("Static lounge 서버 문제 생김 (rou_post_createNewSheets): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_createNewDocs = function () {
  const instance = this;
  const docs = this.docs;
  const { fileSystem, shellExec, shellLink, equalJson } = this.mother;
  const { staticConst } = this;
  let obj;
  obj = {};
  obj.link = [ "/createNewDocs" ];
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
      if (req.body.name === undefined || req.body.parent === undefined) {
        throw new Error("invalid post");
      }
      const { name, parent } = equalJson(req.body);
      let docsId;
      docsId = await docs.create_newDocs_inPython(name, parent);
      res.send(JSON.stringify({ message: "success", docsId }));
    } catch (e) {
      logger.error("Static lounge 서버 문제 생김 (rou_post_createNewDocs): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_createNewSlides = function () {
  const instance = this;
  const slides = this.slides;
  const { fileSystem, shellExec, shellLink, equalJson } = this.mother;
  const { staticConst } = this;
  let obj;
  obj = {};
  obj.link = [ "/createNewSlides" ];
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
      if (req.body.name === undefined || req.body.parent === undefined) {
        throw new Error("invalid post");
      }
      const { name, parent } = equalJson(req.body);
      let slidesId;
      slidesId = await slides.create_newSlides_inPython(name, parent);
      res.send(JSON.stringify({ message: "success", slidesId }));
    } catch (e) {
      logger.error("Static lounge 서버 문제 생김 (rou_post_createNewSlides): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_createNewForms = function () {
  const instance = this;
  const forms = this.forms;
  const { fileSystem, shellExec, shellLink, equalJson } = this.mother;
  const { staticConst } = this;
  let obj;
  obj = {};
  obj.link = [ "/createNewForms" ];
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
      if (req.body.name === undefined || req.body.parent === undefined) {
        throw new Error("invalid post");
      }
      const { name, parent } = equalJson(req.body);
      let formsId;
      formsId = await forms.create_newForms_inPython(name, parent);
      res.send(JSON.stringify({ message: "success", formsId }));
    } catch (e) {
      logger.error("Static lounge 서버 문제 생김 (rou_post_createNewForms): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_createNewNotionPage = function () {
  const instance = this;
  const notion = this.notion;
  const { fileSystem, shellExec, shellLink, equalJson } = this.mother;
  const { staticConst, sambaToken } = this;
  let obj;
  obj = {};
  obj.link = [ "/createNewNotionPage" ];
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
      if (req.body.name === undefined || req.body.parent === undefined) {
        throw new Error("invalid post");
      }
      const { name, parent } = equalJson(req.body);
      let notionResult;
      let target;

      target = parent.replace(/^\//i, '').replace(/\/$/i, '');
      if (target.trim() === '') {
        target = sambaToken;
      }
      if (!/^__/.test(target)) {
        target = sambaToken + "/" + target;
      }
      target = target.replace(new RegExp(sambaToken, "gi"), staticConst);

      notionResult = await notion.createPage(name);
      await fileSystem(`writeJson`, [ target + "/" + name + ".ntpage", notionResult ]);

      res.send(JSON.stringify({ message: "success", editId: notionResult.editId, workspace: notionResult.workspace }));
    } catch (e) {
      logger.error("Static lounge 서버 문제 생김 (rou_post_createNewNotionPage): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_createNewNotionKanban = function () {
  const instance = this;
  const notion = this.notion;
  const { fileSystem, shellExec, shellLink, equalJson } = this.mother;
  const { staticConst, sambaToken } = this;
  let obj;
  obj = {};
  obj.link = [ "/createNewNotionKanban" ];
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
      if (req.body.name === undefined || req.body.parent === undefined) {
        throw new Error("invalid post");
      }
      const { name, parent } = equalJson(req.body);
      let notionResult;
      let target;

      target = parent.replace(/^\//i, '').replace(/\/$/i, '');
      if (target.trim() === '') {
        target = sambaToken;
      }
      if (!/^__/.test(target)) {
        target = sambaToken + "/" + target;
      }
      target = target.replace(new RegExp(sambaToken, "gi"), staticConst);

      notionResult = await notion.createKanban(name);
      await fileSystem(`writeJson`, [ target + "/" + name + ".ntkanban", notionResult ]);

      res.send(JSON.stringify({ message: "success", editId: notionResult.editId, workspace: notionResult.workspace }));
    } catch (e) {
      logger.error("Static lounge 서버 문제 생김 (rou_post_createNewNotionKanban): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_createNewLinkFile = function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink, equalJson, stringToLink } = this.mother;
  const { staticConst, sambaToken } = this;
  let obj;
  obj = {};
  obj.link = [ "/createNewLinkFile" ];
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
      if (req.body.name === undefined || req.body.parent === undefined || req.body.link === undefined) {
        throw new Error("invalid post");
      }
      const { name, parent, link } = equalJson(req.body);
      let json;
      let target;

      target = parent.replace(/^\//i, '').replace(/\/$/i, '');
      if (target.trim() === '') {
        target = sambaToken;
      }
      if (!/^__/.test(target)) {
        target = sambaToken + "/" + target;
      }
      target = target.replace(new RegExp(sambaToken, "gi"), staticConst);

      json = {
        url: stringToLink(link),
        hex: Buffer.from(link, "utf8").toString("hex"),
      };
      await fileSystem(`writeJson`, [ target + "/" + name + ".link", json ]);

      res.send(JSON.stringify({ message: "success" }));
    } catch (e) {
      logger.error("Static lounge 서버 문제 생김 (rou_post_createNewLinkFile): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_createNewExcel = function () {
  const instance = this;
  const microsoft = this.microsoft;
  const { fileSystem, shellExec, shellLink, equalJson, linkToString } = this.mother;
  const { staticConst, sambaToken } = this;
  let obj;
  obj = {};
  obj.link = [ "/createNewExcel" ];
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
      if (req.body.name === undefined || req.body.parent === undefined) {
        throw new Error("invalid post");
      }
      const { name, parent } = equalJson(req.body);
      let microsoftResult;
      let target;

      target = parent.replace(/^\//i, '').replace(/\/$/i, '');
      if (target.trim() === '') {
        target = sambaToken;
      }
      if (!/^__/.test(target)) {
        target = sambaToken + "/" + target;
      }
      target = target.replace(new RegExp(sambaToken, "gi"), staticConst);

      microsoftResult = await microsoft.createExcel(name);
      await fileSystem(`writeJson`, [ target + "/" + name + ".odxlsx", {
        url: microsoftResult.editUrl,
        ...microsoftResult
      } ]);

      res.send(JSON.stringify({ message: "success", editId: microsoftResult.id, editUrl: linkToString(microsoftResult.editUrl) }));
    } catch (e) {
      logger.error("Static lounge 서버 문제 생김 (rou_post_createNewExcel): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_createNewWord = function () {
  const instance = this;
  const microsoft = this.microsoft;
  const { fileSystem, shellExec, shellLink, equalJson, linkToString } = this.mother;
  const { staticConst, sambaToken } = this;
  let obj;
  obj = {};
  obj.link = [ "/createNewWord" ];
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
      if (req.body.name === undefined || req.body.parent === undefined) {
        throw new Error("invalid post");
      }
      const { name, parent } = equalJson(req.body);
      let microsoftResult;
      let target;

      target = parent.replace(/^\//i, '').replace(/\/$/i, '');
      if (target.trim() === '') {
        target = sambaToken;
      }
      if (!/^__/.test(target)) {
        target = sambaToken + "/" + target;
      }
      target = target.replace(new RegExp(sambaToken, "gi"), staticConst);

      microsoftResult = await microsoft.createWord(name);
      await fileSystem(`writeJson`, [ target + "/" + name + ".oddocx", {
        url: microsoftResult.editUrl,
        ...microsoftResult
      } ]);

      res.send(JSON.stringify({ message: "success", editId: microsoftResult.id, editUrl: linkToString(microsoftResult.editUrl) }));
    } catch (e) {
      logger.error("Static lounge 서버 문제 생김 (rou_post_createNewWord): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_createNewPowerPoint = function () {
  const instance = this;
  const microsoft = this.microsoft;
  const { fileSystem, shellExec, shellLink, equalJson, linkToString } = this.mother;
  const { staticConst, sambaToken } = this;
  let obj;
  obj = {};
  obj.link = [ "/createNewPowerPoint" ];
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
      if (req.body.name === undefined || req.body.parent === undefined) {
        throw new Error("invalid post");
      }
      const { name, parent } = equalJson(req.body);
      let microsoftResult;
      let target;

      target = parent.replace(/^\//i, '').replace(/\/$/i, '');
      if (target.trim() === '') {
        target = sambaToken;
      }
      if (!/^__/.test(target)) {
        target = sambaToken + "/" + target;
      }
      target = target.replace(new RegExp(sambaToken, "gi"), staticConst);

      microsoftResult = await microsoft.createPowerPoint(name);
      await fileSystem(`writeJson`, [ target + "/" + name + ".odpptx", {
        url: microsoftResult.editUrl,
        ...microsoftResult
      } ]);

      res.send(JSON.stringify({ message: "success", editId: microsoftResult.id, editUrl: linkToString(microsoftResult.editUrl) }));
    } catch (e) {
      logger.error("Static lounge 서버 문제 생김 (rou_post_createNewPowerPoint): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_downloadUrlFromOneDrive = function () {
  const instance = this;
  const microsoft = this.microsoft;
  const { equalJson } = this.mother;
  let obj;
  obj = {};
  obj.link = [ "/downloadUrlFromOneDrive" ];
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
      if (req.body.id === undefined) {
        throw new Error("invalid post");
      }
      const { id } = equalJson(req.body);
      const encodedUrl = await microsoft.getDownloadUrl(id, true);
      res.send(JSON.stringify({ url: encodedUrl }));
    } catch (e) {
      logger.error("Static lounge 서버 문제 생김 (rou_post_downloadUrlFromOneDrive): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_microsoftConvert = function () {
  const instance = this;
  const microsoft = this.microsoft;
  const { fileSystem, equalJson, shellExec } = this.mother;
  const { staticConst, sambaToken } = this;
  let obj;
  obj = {};
  obj.link = [ "/microsoftConvert" ];
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
      if (req.body.target === undefined || req.body.path === undefined) {
        throw new Error("invalid post");
      }
      const { target, path } = equalJson(req.body);
      let motherFolder, thisTarget;
      let microsoftResult;

      if (!microsoft.isMicrosoftFile(target)) {
        throw new Error("invalid target");
      }

      motherFolder = path.replace(/^\//i, '').replace(/\/$/i, '');
      if (motherFolder.trim() === '') {
        motherFolder = sambaToken;
      }
      if (!/^__/.test(motherFolder)) {
        motherFolder = sambaToken + "/" + motherFolder;
      }
      motherFolder = motherFolder.replace(new RegExp(sambaToken, "gi"), staticConst);

      thisTarget = target.replace(/^\//i, '').replace(/\/$/i, '');
      if (thisTarget.trim() === '') {
        thisTarget = sambaToken;
      }
      if (!/^__/.test(thisTarget)) {
        thisTarget = sambaToken + "/" + thisTarget;
      }
      thisTarget = thisTarget.replace(new RegExp(sambaToken, "gi"), staticConst);

      microsoftResult = await microsoft.uploadDocument(thisTarget);
      await fileSystem(`writeJson`, [ microsoft.localToOneDriveName(thisTarget), {
        url: microsoftResult.editUrl,
        ...microsoftResult
      } ]);
      await shellExec(`rm`, [ `-rf`, thisTarget ]);

      res.send(JSON.stringify({ url: microsoftResult.editUrl }));
    } catch (e) {
      logger.error("Static lounge 서버 문제 생김 (rou_post_microsoftConvert): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_renameTargets = function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink, equalJson } = this.mother;
  const { staticConst } = this;
  let obj;
  obj = {};
  obj.link = [ "/renameTargets" ];
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
      if (req.body.from === undefined || req.body.to === undefined) {
        throw new Error("invalid post");
      }
      const { from, to } = equalJson(req.body);
      if (!Array.isArray(from) || !Array.isArray(to)) {
        throw new Error("invalid post");
      }
      let finalFrom, finalTo;

      finalFrom = [];
      for (let target of from) {
        if (typeof target !== "string") {
          throw new Error("invalid post");
        }
        target = target.replace(/^\//i, '').replace(/\/$/i, '');
        if (target.trim() === '') {
          target = "__samba__";
        }
        if (!/^__/.test(target)) {
          target = "__samba__" + "/" + target;
        }
        target = target.replace(/__samba__/gi, staticConst);
        finalFrom.push(target);
      }

      finalTo = [];
      for (let target of to) {
        if (typeof target !== "string") {
          throw new Error("invalid post");
        }
        target = target.replace(/^\//i, '').replace(/\/$/i, '');
        if (target.trim() === '') {
          target = "__samba__";
        }
        if (!/^__/.test(target)) {
          target = "__samba__" + "/" + target;
        }
        target = target.replace(/__samba__/gi, staticConst);
        finalTo.push(target);
      }

      if (finalFrom.length !== finalTo.length) {
        throw new Error("invalid post");
      }

      for (let i = 0; i < finalFrom.length; i++) {
        await shellExec("mv", [ finalFrom[i], finalTo[i] ]);
      }

      res.send(JSON.stringify({ message: "succcess" }));
    } catch (e) {
      logger.error("Static lounge 서버 문제 생김 (rou_post_renameTargets): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_generalFileUpload = function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink, sleep } = this.mother;
  const { staticConst } = this;
  const osTempFolder = "/tmp";
  const hangul = this.hangul;
  const microsoft = this.microsoft;
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
            let thisFileName;
            let microsoftResult;
            let thisFileExe;

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
              thisFileName = tempArr[tempArr.length - 1];
              thisFileExe = thisFileName.split(".")[thisFileName.split(".").length - 1];
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

              await shellExec("mv", [ path, osTempFolder + "/" + thisFileName ]);
              await shellExec("cp", [ osTempFolder + "/" + thisFileName, tempString + "/" ]);
              await shellExec(`rm`, [ `-rf`, osTempFolder + "/" + thisFileName ]);
              
              num++;
            }

            res.send(JSON.stringify({ "message": "done" }));
          }
        } catch (e) {
          console.log(e);
          logger.error("Static lounge 서버 문제 생김 (rou_post_generalFileUpload): " + e.message).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
        }
      });
    } catch (e) {
      console.log(e);
      logger.error("Static lounge 서버 문제 생김 (rou_post_generalFileUpload): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_makeFolder = function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink } = this.mother;
  const { staticConst, sambaToken } = this;
  let obj;
  obj = {};
  obj.link = [ "/makeFolder" ];
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
      if (req.body.path === undefined) {
        throw new Error("invaild post");
      }
      let target;
      let targetList;
      let tempString;
      let tempDir;
      let target2;
      let folderList;

      target = req.body.path.replace(/^\//i, '').replace(/\/$/i, '');
      if (target.trim() === '') {
        target = sambaToken;
      }
      if (!/^__/.test(target)) {
        target = sambaToken + "/" + target;
      }
      target = target.replace(new RegExp(sambaToken, "gi"), '');
      targetList = target.split("/");
      tempString = staticConst;
      for (let i = 0; i < targetList.length; i++) {
        tempDir = await fileSystem(`readDir`, [ tempString ]);
        if (!tempDir.includes(targetList[i]) && targetList[i] !== "") {
          await shellExec(`mkdir ${shellLink(tempString + "/" + targetList[i])}`);
        }
        tempString += '/';
        tempString += targetList[i];
      }

      target2 = req.body.path.replace(/^\//i, '').replace(/\/$/i, '');
      if (target2.trim() === '') {
        target2 = sambaToken;
      }
      if (!/^__/.test(target2)) {
        target2 = sambaToken + "/" + target2;
      }
      target2 = target2.replace(new RegExp(sambaToken, "gi"), staticConst);
      folderList = await fileSystem(`readFolder`, [ target2 ]);

      res.send(JSON.stringify({ message: "done", list: folderList }));
    } catch (e) {
      logger.error("Static lounge 서버 문제 생김 (rou_post_makeFolder): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_zipPhoto = function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink, dateToString, sleep } = this.mother;
  const { staticConst, sambaToken, homeliaisonOfficeConst, designerPhotoConst } = this;
  const drive = this.drive;
  let obj;
  obj = {};
  obj.link = [ "/zipPhoto" ];
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
      if (req.body.pid === undefined || req.body.proid === undefined) {
        throw new Error("invaild post");
      }
      const targetFolderId = "1rSIKIL-jjmXU-D2Zdmf9ElXFmH2Htycl";
      const { pid, proid } = req.body;
      const c780 = "780";
      const c1500 = "1500";
      const c3508 = pid;
      const splitToken = "__split__";
      const targetDir = staticConst + homeliaisonOfficeConst + "/" + designerPhotoConst;
      const list = await fileSystem(`readDir`, [ targetDir ]);
      const homeFolder = await fileSystem(`readDir`, [ process.env.HOME ]);
      const tempFolderName = "temp";
      let folderName;
      let shareClientName, shareDesignerName;
      let tempArr;
      let command;
      let zipIdClient, zipIdDesigner;
      let zipLinkClient, zipLinkDesigner;
      let commands;
      let safeNum0, safeNum1;

      if (!homeFolder.includes(tempFolderName)) {
        await shellExec(`mkdir`, [ `${process.env.HOME}/${tempFolderName}` ]);
      }

      folderName = list.find((i) => { return (new RegExp('^' + pid)).test(i); });
      tempArr = folderName.split('_');
      shareClientName = "HL_";
      shareDesignerName = "HL_";
      if (tempArr.length === 4) {
        shareClientName += tempArr[2] + "_고객님_";
        shareClientName += tempArr[1] + "_디자이너님";
        shareDesignerName += tempArr[1] + "_디자이너님_";
        shareDesignerName += tempArr[2] + "_고객님";
      } else if (tempArr.length === 3) {
        shareDesignerName += tempArr[1] + "_디자이너님";
      } else {
        throw new Error("invaild post");
      }
      shareClientName += '_' + dateToString(new Date()).slice(2).replace(/\-/gi, '') + ".zip";
      shareDesignerName += '_' + dateToString(new Date()).slice(2).replace(/\-/gi, '') + ".zip";

      commands = "";
      if (proid.trim() !== "") {
        commands += `cd ${shellLink(targetDir)}/${shellLink(folderName)}/${shellLink(c3508)};`;
        commands += `zip ${shellLink(staticConst)}/corePortfolio/rawImage/${proid}${splitToken}${shellLink(c3508)}.zip ./*;`;
        await shellExec(commands);
      }

      res.send(JSON.stringify({ message: "done" }));

    } catch (e) {
      logger.error("Static lounge 서버 문제 생김 (rou_post_zipPhoto): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_designerFolder = function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink, dateToString, sleep } = this.mother;
  const { staticConst, sambaToken, homeliaisonOfficeConst, designerFolderConst, designerFolderConst2 } = this;
  const drive = this.drive;
  const docs = this.docs;
  let obj;
  obj = {};
  obj.link = [ "/designerFolder" ];
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
      const designerFolderId = "18PiKz57MQd8VgETd3hqp_cA-MNAXPquN";
      const sambaDir = staticConst + homeliaisonOfficeConst + "/" + designerFolderConst + "/" + designerFolderConst2;
      const basicList = [
        "포트폴리오",
        "등록서류",
        "제안문서",
        "첫등록",
        "경력관련",
        "계약서",
        "기타",
      ];
      let id, subid;
      let folderName;
      let folderId, docsId;
      let num;
      let folderList;
      let thisFolderList;
      let mvTarget;
      let mkdirTarget;
      let rmTarget;

      if (req.body.name === undefined || req.body.subid === undefined) {
        folderList = (await fileSystem(`readDir`, [ sambaDir ])).filter((str) => { return !/DS_Store/g.test(str) });

        for (let thisFolderName of folderList) {
          thisFolderList = (await fileSystem(`readDir`, [ sambaDir + "/" + thisFolderName ])).filter((str) => {
            return !/DS_Store/g.test(str);
          }).filter((str) => {
            return !/gddoc$/i.test(str);
          });

          mvTarget = [];
          for (let s of thisFolderList) {
            if (!basicList.includes(s)) {
              mvTarget.push(s);
            }
          }

          for (let s of mvTarget) {
            if (/제안문서/gi.test(s)) {
              await shellExec(`mv ${shellLink(sambaDir + "/" + thisFolderName + "/" + s)} ${shellLink(sambaDir + "/" + thisFolderName + "/" + "제안문서")}`);
            } else if (/첫/gi.test(s)) {
              await shellExec(`mv ${shellLink(sambaDir + "/" + thisFolderName + "/" + s)} ${shellLink(sambaDir + "/" + thisFolderName + "/" + "첫등록")}`);
            }
          }

          thisFolderList = (await fileSystem(`readDir`, [ sambaDir + "/" + thisFolderName ])).filter((str) => {
            return !/DS_Store/g.test(str);
          }).filter((str) => {
            return !/gddoc$/i.test(str);
          });

          mkdirTarget = [];
          for (let s of basicList) {
            if (!thisFolderList.includes(s)) {
              mkdirTarget.push(s);
            }
          }

          for (let s of mkdirTarget) {
            await shellExec(`mkdir ${shellLink(sambaDir + "/" + thisFolderName + "/" + s)}`);
          }

          thisFolderList = (await fileSystem(`readDir`, [ sambaDir + "/" + thisFolderName ])).filter((str) => {
            return !/DS_Store/g.test(str);
          }).filter((str) => {
            return !/gddoc$/i.test(str);
          });

          rmTarget = [];
          for (let s of thisFolderList) {
            if (!basicList.includes(s)) {
              rmTarget.push(s);
            }
          }

          for (let s of rmTarget) {
            await logger.error("디자이너 폴더 문제 => " + thisFolderName + " / " + s);
            await sleep(1000);
          }
        }

        res.send(JSON.stringify({ message: "done" }));

      } else {
        folderName = req.body.subid + "_" + req.body.name;

        folderId = await drive.makeFolder_inPython(folderName);
        await drive.moveFolder_inPython(folderId, designerFolderId);

        await sleep(2000);
        num = 0;
        while ((!(await fileSystem(`exist`, [ `${sambaDir}/partnership/${folderName}` ]))) && (num < 10)) {
          await sleep(2000);
          num++;
        }

        if (await fileSystem(`exist`, [ `${sambaDir}/partnership/${folderName}` ])) {
          for (let b of basicList) {
            if (!(await fileSystem(`exist`, [ `${sambaDir}/partnership/${folderName}/${b}` ]))) {
              await fileSystem(`mkdir`, [ `${sambaDir}/partnership/${folderName}/${b}` ]);
            }
          }
        }

        docsId = await docs.create_newDocs_inPython(folderName + '_' + "docs", folderId);

        res.send(JSON.stringify({
          folderName: folderName,
          drive: `https://drive.google.com/drive/folders/${folderId}`,
          docs: `https://docs.google.com/document/d/${docsId}`,
        }));
      }
    } catch (e) {
      logger.error("Static lounge 서버 문제 생김 (rou_post_designerFolder): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_recordBackup = function () {
  const instance = this;
  const address = this.address;
  const { fileSystem, shellExec, shellLink, requestSystem, dateToString, uniqueValue, binaryRequest } = this.mother;
  const { staticConst, sambaToken, homeliaisonOfficeConst, designerFolderConst } = this;
  const { centrex: { host, sessionConst, sessionValue } } = this;
  const storeMother = staticConst + homeliaisonOfficeConst + "/통화녹취파일";
  const recordBackupExecute = async function () {
    const jsdom = require("jsdom");
    const { JSDOM } = jsdom;
    const urls = {
      init: "https://" + host + "/premium",
      login: "https://" + host + "/premium/PHP/web_login.php",
      list: "https://" + host + "/premium/backoffice/record_list.html",
      delete: "https://" + host + "/premium/PHP/deleteRecordFile.php"
    };
    const splitToken = "__split__";
    const tempFolder = process.cwd() + "/temp";
    try {
      const storeMotherContents = (await fileSystem(`readDir`, [ storeMother ])).filter((str) => { return !/^\./.test(str); });
      const folderName = "records_" + dateToString(new Date()).replace(/\-/gi, '') + "_" + uniqueValue("string");
      let url, res, dom, token, idsave, id, pass;
      let session;
      let inputs;
      let postData;
      let trArr;
      let aNode, aArr;
      let pageNum;
      let totalLinks;
      let log;
      let tempbinary;
      let storeTargets;
      let downloadedFiles;
      let errorBoo;
      let safeNum;

      session = sessionConst + "=" + sessionValue;

      url = urls.list;
      res = await requestSystem(url, {}, { method: "get", headers: { Cookie: session } });

      dom = new JSDOM(res.data);
      inputs = dom.window.document.querySelector("form").children;
      postData = {};
      for (let input of inputs) {
        if (/INPUT/gi.test(input.nodeName)) {
          postData[input.getAttribute("name")] = input.getAttribute("value");
        }
      }

      pageNum = 0;
      totalLinks = [];
      do {
        pageNum++;
        postData.page = String(pageNum);
        res = await requestSystem(url, postData, { headers: { Cookie: session } });
        dom = new JSDOM(res.data);
        trArr = [ ...dom.window.document.querySelector('.contents_area').querySelector('.table_type01').querySelectorAll('tr') ];
        aArr = [];
        for (let tr of trArr) {
          aNode = tr.querySelector('a');
          if (aNode !== null) {
            aArr.push(aNode.getAttribute("href"));
          }
        }

        aArr = aArr.map((str) => { return str.trim(); }).filter((str) => { return str !== '#'; }).map((str) => {
          return str + splitToken + String(pageNum);
        });
        totalLinks = totalLinks.concat(aArr);
      } while (aArr.length !== 0);

      totalLinks = [ ...new Set(totalLinks) ].map((str) => {
        return urls.init + str.slice(2);
      }).map((link) => {
        let tempArr, tempArr1, obj, page;
        page = Number(link.split(splitToken)[1]);
        link = link.split(splitToken)[0];
        tempArr = link.split('?');
        tempArr1 = tempArr[1].split('&').map((s) => { return s.split('='); });
        obj = {};
        for (let [ key, value ] of tempArr1) {
          obj[key] = value;
        }
        return { link, page, host: tempArr[0], data: obj };
      });

      log = {
        date: new Date(),
        length: totalLinks.length,
        records: totalLinks
      };

      await shellExec(`rm -rf ${shellLink(tempFolder)}/${folderName}`);
      await shellExec(`mkdir ${shellLink(tempFolder)}/${folderName}`);

      for (let i = 0; i < totalLinks.length; i++) {
        safeNum = 0;
        do {
          errorBoo = true;
          try {
            tempbinary = await binaryRequest(totalLinks[i].link, null, { headers: { Cookie: session } });
            await fileSystem(`writeBinary`, [ `${process.cwd()}/temp/${folderName}/${totalLinks[i].data.filename}`, tempbinary ]);
            console.log(`${totalLinks[i].data.filename} download success`);

            postData.page = String(totalLinks[i].page);
            postData["chk[]"] = totalLinks[i].data.filename.split('-')[0] + "|" + totalLinks[i].data.filename;
            res = await requestSystem(urls.delete, postData, { headers: { Cookie: session } });
            console.log(`${totalLinks[i].data.filename} server delete success`);

            errorBoo = false;
          } catch (e) {
            errorBoo = true;
          }
          safeNum++;
        } while (errorBoo || safeNum > 10);
      }

      storeTargets = {};
      for (let str of storeMotherContents) {
        storeTargets['p' + str.split('_')[0]] = str;
      }

      downloadedFiles = (await fileSystem(`readDir`, [ `${tempFolder}/${folderName}` ])).filter((str) => { return !/^\./.test(str); });
      downloadedFiles = downloadedFiles.map((str) => {
        return { target: 'p' + str.split('-')[0].replace(/^0/gi, '').replace(/^0/gi, ''), file: `${tempFolder}/${folderName}/${str}` };
      });

      for (let { target, file } of downloadedFiles) {
        if (typeof storeTargets[target] === "string") {
          await shellExec(`mv ${shellLink(file)} ${shellLink(storeMother + "/" + storeTargets[target])};`);
        }
      }

      await shellExec(`rm -rf ${shellLink(tempFolder)}/${folderName};`);

      return log;

    } catch (e) {
      console.log(e);
      return false;
    }
  }
  let obj;
  obj = {};
  obj.link = [ "/recordBackup" ];
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
      const backupFunc = async function () {
        try {
          let safeNum, log;
          safeNum = 0;
          do {
            log = await recordBackupExecute();
            safeNum++;
            if (safeNum > 20) {
              break;
            }
          } while (log === false);

          if (!log) {
            throw new Error("session expired");
          }

          await logger.cron("record backup and delete success");
        } catch (e) {
          await logger.error("record backup and delete error : " + e.message);
        }
      }

      backupFunc().catch((err) => {
        logger.error("record backup and delete error : " + err.message).catch((e) => { console.log(e); });
      });

      res.send(JSON.stringify({ message: "will do" }));

    } catch (e) {
      logger.error("Static lounge 서버 문제 생김 (rou_post_recordBackup): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_centrexSession = function () {
  const instance = this;
  const { centrex: { host, sessionConst, sessionValue } } = this;
  const { requestSystem } = this.mother;
  let obj;
  obj = {};
  obj.link = [ "/centrexSession" ];
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
      const url = "https://" + host + "/premium/backoffice/main.su.html";
      const successKeyPoint = [
        ".onButton",
        "libgoff3",
        "MM_swapImgRestore",
        "MM_swapImage",
        "MM_preloadImages",
        "MM_findObj",
        "lgdacom_high.css",
        "info_box_bottom.gif",
        "btn_03_04",
        "popup_custom_coloring.html",
        "number_manage_list",
        "OVKEY",
        "popup_call.html",
        "popup_conference.html",
      ];
      let response, resultBoo;

      response = await requestSystem(url, {}, {
        method: "get",
        headers: {
          Cookie: sessionConst + "=" + sessionValue
        }
      });

      resultBoo = successKeyPoint.map((str) => { return new RegExp(str, "g"); }).every((re) => { return re.test(response.data) });
      if (!resultBoo) {
        logger.alert("centrex token expired").catch((err) => { console.log(err); });
      }

      res.send(JSON.stringify({ message: "reload done" }));
    } catch (e) {
      logger.error("Static lounge 서버 문제 생김 (rou_post_centrexSession): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_mongoToJson = function () {
  const instance = this;
  const { shellExec, shellLink, fileSystem } = this.mother;
  const address = this.address;
  const mongoToJsonFunction = async function () {
    try {
      const today = new Date();
      const zeroAddition = function (number) {
        if (number < 10) {
          return `0${String(number)}`;
        } else {
          return String(number);
        }
      }
      const backFolderName = "backup";
      const mongoTargets = [
        [ "mongoinfo", "mongo" ],
      ];
      const robotDirArr = process.cwd().split("/");
      robotDirArr.pop();
      const robotDirMother = robotDirArr.join("/");
      const robotDirMotherDetail = await fileSystem(`readDir`, [ robotDirMother ]);
      if (!robotDirMotherDetail.includes(backFolderName)) {
        await shellExec(`mkdir ${shellLink(robotDirMother)}/${backFolderName}`);
      }
      const backDir = robotDirMother + "/" + backFolderName;
      let tempInfo, timeString;

      timeString = `${String(today.getFullYear())}${zeroAddition(today.getMonth() + 1)}${zeroAddition(today.getDate())}${zeroAddition(today.getHours())}${zeroAddition(today.getMinutes())}${zeroAddition(today.getSeconds())}`;

      for (let [ infoName, dbName ] of mongoTargets) {
        tempInfo = address[infoName];
        await shellExec(`mongodump --uri="mongodb://${tempInfo["host"]}/${tempInfo["database"]}" --username=${tempInfo["user"]} --password=${tempInfo["password"]} --port=${String(tempInfo["port"])} --out="${shellLink(backDir)}/${timeString}/${dbName}${timeString}" --authenticationDatabase admin`);
      }

      await shellExec(`cd ${shellLink(backDir)};zip -r ./${timeString}.zip ./${timeString};rm -rf ${shellLink(backDir)}/${timeString}`);

      return true;

    } catch (e) {
      return false;
    }
  }
  let obj;
  obj = {};
  obj.link = [ "/mongoToJson" ];
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

      mongoToJsonFunction().then((boo) => {
        if (boo) {
          return logger.cron("mongo to json done");
        } else {
          return logger.error("mongo to json error");
        }
      }).catch((err) => {
        logger.error("mongo to json error : " + err.message).catch((e) => { console.log(e); });
      });

      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      logger.error("Static lounge 서버 문제 생김 (rou_post_mongoToJson): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_dataReflection = function () {
  const instance = this;
  const { equalJson } = this.mother;
  const address = this.address;
  const MongoReflection = require(`${process.cwd()}/apps/mongoReflection/mongoReflection.js`);
  const reflection = new MongoReflection();
  let obj;
  obj = {};
  obj.link = [ "/dataReflection" ];
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

      reflection.coreReflection().catch((err) => {
        console.log(err);
      })

      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      logger.error("Static lounge 서버 문제 생김 (rou_post_dataReflection): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_mysqlQuery = function () {
  const instance = this;
  const { mysqlQuery } = this.mother;
  const address = this.address;
  let obj;
  obj = {};
  obj.link = [ "/mysqlQuery" ];
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
      if (typeof req.body.query !== "string") {
        throw new Error("invaild post");
      }
      let query, response;
      if (/;$/.test(req.body.query.trim())) {
        query = req.body.query.trim();
      } else {
        query = req.body.query.trim() + ';';
      }
      if (!/drop/gi.test(query) && !/delete/gi.test(query)) {
        response = await mysqlQuery(query, { local: true });
      } else {
        response = [];
      }
      res.send(JSON.stringify(response));
    } catch (e) {
      logger.error("Static lounge 서버 문제 생김 (rou_post_mysqlQuery): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_parsingCashReceipt = function () {
  const instance = this;
  const { equalJson, sleep } = this.mother;
  const BillMaker = require(`${process.cwd()}/apps/billMaker/billMaker.js`);
  const bill = new BillMaker();
  let obj;
  obj = {};
  obj.link = [ "/parsingCashReceipt" ];
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
      let boo;

      boo = await bill.parsingCashReceipt();
      if (boo) {
        logger.log("cash receipt success : " + JSON.stringify(new Date())).catch((e) => { console.log(e); });
      } else {
        logger.error("cash receipt fail : " + JSON.stringify(new Date())).catch((e) => { console.log(e); });
      }

      if (!boo) {
        await sleep(3000);
        boo = await bill.parsingCashReceipt();
        if (boo) {
          logger.log("cash receipt success : " + JSON.stringify(new Date())).catch((e) => { console.log(e); });
        } else {
          logger.error("cash receipt fail : " + JSON.stringify(new Date())).catch((e) => { console.log(e); });
        }
      }

      if (!boo) {
        await sleep(3000);
        boo = await bill.parsingCashReceipt();
        if (boo) {
          logger.log("cash receipt success : " + JSON.stringify(new Date())).catch((e) => { console.log(e); });
        } else {
          logger.error("cash receipt fail : " + JSON.stringify(new Date())).catch((e) => { console.log(e); });
        }
      }

      res.send(JSON.stringify({ success: boo ? 1 : 0 }));
    } catch (e) {
      logger.error("Static lounge 서버 문제 생김 (rou_post_parsingCashReceipt): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_issueCashReceipt = function () {
  const instance = this;
  const { equalJson, sleep } = this.mother;
  const BillMaker = require(`${process.cwd()}/apps/billMaker/billMaker.js`);
  const bill = new BillMaker();
  let obj;
  obj = {};
  obj.link = [ "/issueCashReceipt" ];
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
      if (req.body.amount === undefined || req.body.phone === undefined) {
        throw new Error("invalid post");
      }
      let boo;

      boo = await bill.issueCashReceipt(Number(req.body.amount), req.body.phone);
      if (boo) {
        logger.log("issue cash receipt success : " + JSON.stringify(new Date())).catch((e) => { console.log(e); });
      } else {
        logger.error("issue cash receipt fail : " + JSON.stringify(new Date())).catch((e) => { console.log(e); });
      }

      while (!boo) {
        await sleep(3000);
        boo = await bill.issueCashReceipt(Number(req.body.amount), req.body.phone);
        if (boo) {
          logger.log("issue cash receipt success : " + JSON.stringify(new Date())).catch((e) => { console.log(e); });
        } else {
          logger.error("issue cash receipt fail : " + JSON.stringify(new Date())).catch((e) => { console.log(e); });
        }
      }

      res.send(JSON.stringify({ success: boo ? 1 : 0 }));
    } catch (e) {
      logger.error("Static lounge 서버 문제 생김 (rou_post_issueCashReceipt): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_textToVoice = function () {
  const instance = this;
  const audio = this.audio;
  const address = this.address;
  const { equalJson, requestSystem } = this.mother;
  let obj;
  obj = {};
  obj.link = [ "/textToVoice" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      // const thisBody = equalJson(req.body);
      // requestSystem("https://" + address.officeinfo.ghost.host + ":" + String(address.officeinfo.ghost.wss) + "/textToVoice", thisBody, { headers: { "Content-Type": "application/json" } }).catch((err) => { console.log(err) });
      // res.send(JSON.stringify({ message: "toss" }));

      if (!instance.fireWall(req)) {
        throw new Error("post ban");
      }
      if (typeof req.body.text !== "string") {
        throw new Error("invalid post");
      }
      audio.textToVoice(req.body.text).catch((err) => {
        console.log(err);
      })
      res.send(JSON.stringify({ message: "will do" }));

    } catch (e) {
      logger.error("Static lounge 서버 문제 생김 (rou_post_textToVoice): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_printText = function () {
  const instance = this;
  const audio = this.audio;
  const address = this.address;
  const { uniqueValue, fileSystem, shellExec, shellLink, equalJson, requestSystem } = this.mother;
  let obj;
  obj = {};
  obj.link = [ "/printText" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      // const thisBody = equalJson(req.body);
      // requestSystem("https://" + address.officeinfo.ghost.host + ":" + String(address.officeinfo.ghost.wss) + "/printText", thisBody, { headers: { "Content-Type": "application/json" } }).catch((err) => { console.log(err) });
      // res.send(JSON.stringify({ message: "toss" }));

      if (!instance.fireWall(req)) {
        throw new Error("post ban");
      }
      if (typeof req.body.text !== "string") {
        throw new Error("invalid post");
      }
      const { spawn } = require("child_process");
      const lpstat = spawn("lpstat", [ "-p" ]);
      const fontName = `/home/homeliaison/font/NanumGothicEco.ttf`;
      let printer;
      let targetFile;

      targetFile = process.cwd() + "/temp/printerTemp_" + uniqueValue("hex") + ".txt";

      lpstat.stdout.on("data", (data) => {
        const arr = String(data).split("\n").map((i) => { return i.trim(); });
        const printerRaw = arr.find((i) => { return /Brother/gi.test(i); });
        printer = printerRaw.trim().split(' ')[1];
        lpstat.kill();
        fileSystem(`write`, [ targetFile, req.body.text ]).then(() => {
          return shellExec(`uniprint -printer ${printer} -size 9 -hsize 0 ${req.body.landScape !== undefined ? String("-L ") : ""}-media A4 -wrap -font ${fontName} ${shellLink(targetFile)}`);
        }).then(() => {
          return shellExec("rm", [ "-rf", targetFile ]);
        }).catch((err) => {
          logger.error("Static lounge 서버 문제 생김 (rou_post_printText): " + err.message).catch((e) => { console.log(e); });
          console.log(err);
        });
      });

      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      logger.error("Static lounge 서버 문제 생김 (rou_post_printText): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_pageToPdf = function () {
  const instance = this;
  const chrome = this.chrome;
  const address = this.address;
  const { fileSystem, shellExec, shellLink, uniqueValue } = this.mother;
  const { staticConst } = this;
  let obj;
  obj = {};
  obj.link = [ "/pageToPdf" ];
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
      if (typeof req.body.url !== "string") {
        throw new Error("invaild post : url must be string");
      }
      const imageName = `pagePrint_${uniqueValue("string")}.png`;
      const htmlName = imageName.replace(/\.png$/i, ".html");
      const pdfName = imageName.replace(/\.png$/i, ".pdf");
      let htmlString;

      await chrome.pageToPng(global.decodeURIComponent(req.body.url), staticConst + "/" + imageName, true);

      htmlString = `<html><head><style>*{margin:0;padding:0}</style></head><body><img src="https://${address.officeinfo.ghost.host}/${imageName}" style="width:100%"></body></html>`;
      await fileSystem(`write`, [ `${staticConst}/${htmlName}`, htmlString ]);

      await chrome.pdfPrint(`https://${address.officeinfo.ghost.host}/${htmlName}`, `${staticConst}/${pdfName}`, false);

      await shellExec(`rm`, [ `-rf`, `${staticConst}/${imageName}` ]);
      await shellExec(`rm`, [ `-rf`, `${staticConst}/${htmlName}` ]);

      res.send(JSON.stringify({
        url: global.encodeURIComponent("https://" + address.officeinfo.ghost.host + "/" + pdfName),
      }));

    } catch (e) {
      logger.error("Static lounge 서버 문제 생김 (rou_post_pageToPdf): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_getUtilization = function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink, dateToString } = this.mother;
  const delta = 10;
  const fileKeyWords = "homeliaison_";
  let obj = {};
  obj.link = [ "/getUtilization" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      let standardDate;
      let result;


      res.send(JSON.stringify({}));
    } catch (e) {
      logger.error("Static lounge 서버 문제 생김 (rou_post_getUtilization): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_removeCronNmon = function () {
  const instance = this;
  const { fileSystem, dateToString } = this.mother;
  let obj = {};
  obj.link = [ "/removeCronNmon" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {


      res.send(JSON.stringify({ message: "done" }));
    } catch (e) {
      logger.error("Static lounge 서버 문제 생김 (rou_post_removeCronNmon): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_analyticsDaily = function () {
  const instance = this;
  const { equalJson, stringToDate, requestSystem, sleep, dateToString } = this.mother;
  const back = this.back;
  const analytics = this.analytics;
  const address = this.address;
  let obj = {};
  obj.link = [ "/analyticsDaily" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const { date } = equalJson(req.body);
      const selfMongo = instance.mongolocal;
      const dayNumber = req.body.dayNumber === undefined ? 7 : Number(req.body.dayNumber);
      let dateArr;
      let collection;
      let anaid, ancid, key, rows;
      let fromCollection;
      let toCollection;
      let targets;
      let tempRows;
      let json;
      let now, todayDate;

      if (typeof date !== "string") {
        throw new Error("invaild post");
      }

      dateArr = date.split(",").map((str) => { return str.trim(); }).filter((str) => { return str !== ''; });
      if (!(dateArr.every((str) => { return str.length === 10 }))) {
        throw new Error("invaild post");
      }
      dateArr = dateArr.map((str) => { return stringToDate(str) });

      now = new Date();
      todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);

      (async () => {
        try {
          let result;

          // daily campaign
          await instance.facebook.dailyCampaign(selfMongo, dayNumber, logger);
          await instance.naver.dailyCampaign(selfMongo, dayNumber, logger);
          await instance.google.dailyCampaign(selfMongo, dayNumber, logger);

          // daily aspirant campaign
          fromCollection = "dailyCampaign";
          toCollection = "dailyAspirantCampaign";
          rows = await back.mongoRead(fromCollection, {}, { selfMongo });
          targets = [];
          for (let row of rows) {
            if (/디자이너/gi.test(row.information.name)) {
              if (/모객/gi.test(row.information.name) || /모집/gi.test(row.information.name) || /신청/gi.test(row.information.name) || /채용/gi.test(row.information.name) || /전환/gi.test(row.information.name) || /캠패인/gi.test(row.information.name)) {
                targets.push(row);
              }
            }
          }
          for (let row of targets) {
            json = equalJson(JSON.stringify(row));
            tempRows = await back.mongoRead(toCollection, { key: row.key }, { selfMongo });
            if (tempRows.length !== 0) {
              await back.mongoDelete(toCollection, { key: row.key }, { selfMongo });
            }
            await back.mongoCreate(toCollection, json, { selfMongo });
            tempRows = await back.mongoRead(fromCollection, { key: row.key }, { selfMongo });
            if (tempRows.length !== 0) {
              await back.mongoDelete(fromCollection, { key: row.key }, { selfMongo });
            }
          }

          // daily channel
          await instance.facebook.dailyInstagram(selfMongo, dayNumber, logger);
          await instance.youtube.dailyYoutube(selfMongo, dayNumber, logger);

          // daily analytics
          collection = "dailyAnalytics";
          for (let thisDate of dateArr) {
            result = await analytics.dailyMetric(thisDate);
            if (result === null) {
              await logger.error("daily metric error 1 : " + dateToString(thisDate));
              await sleep(1000);
              result = await analytics.dailyMetric(thisDate);
              if (result === null) {
                await logger.error("daily metric error 2 : " + dateToString(thisDate));
                await sleep(1000);
                result = await analytics.dailyMetric(thisDate);
                if (result === null) {
                  await logger.error("daily metric error 3 : " + dateToString(thisDate));
                  await sleep(1000);
                  result = await analytics.dailyMetric(thisDate);
                  if (result === null) {
                    await logger.error("daily metric error 4 : " + dateToString(thisDate));
                  } else {
                    anaid = result.anaid;
                    rows = await back.mongoRead(collection, { anaid }, { selfMongo });
                    if (rows.length !== 0) {
                      await back.mongoDelete(collection, { anaid }, { selfMongo })
                    }
                    await back.mongoCreate(collection, result, { selfMongo });
                    logger.cron("daily analytics done : " + dateToString(result.date.from)).catch((err) => { console.log(err); });
                  }
                } else {
                  anaid = result.anaid;
                  rows = await back.mongoRead(collection, { anaid }, { selfMongo });
                  if (rows.length !== 0) {
                    await back.mongoDelete(collection, { anaid }, { selfMongo })
                  }
                  await back.mongoCreate(collection, result, { selfMongo });
                  logger.cron("daily analytics done : " + dateToString(result.date.from)).catch((err) => { console.log(err); });
                }
              } else {
                anaid = result.anaid;
                rows = await back.mongoRead(collection, { anaid }, { selfMongo });
                if (rows.length !== 0) {
                  await back.mongoDelete(collection, { anaid }, { selfMongo })
                }
                await back.mongoCreate(collection, result, { selfMongo });
                logger.cron("daily analytics done : " + dateToString(result.date.from)).catch((err) => { console.log(err); });
              }
            } else {
              anaid = result.anaid;
              rows = await back.mongoRead(collection, { anaid }, { selfMongo });
              if (rows.length !== 0) {
                await back.mongoDelete(collection, { anaid }, { selfMongo })
              }
              await back.mongoCreate(collection, result, { selfMongo });
              logger.cron("daily analytics done : " + dateToString(result.date.from)).catch((err) => { console.log(err); });
            }
            await sleep(1000);
          }

          // daily clients
          collection = "dailyClients";
          for (let thisDate of dateArr) {
            result = await analytics.dailyClients(thisDate, instance.mongo, instance.mongolocal);
            if (result === null) {
              await logger.error("daily clients error : " + dateToString(thisDate));
            } else {
              ancid = result.ancid;
              rows = await back.mongoRead(collection, { ancid }, { selfMongo });
              if (rows.length !== 0) {
                await back.mongoDelete(collection, { ancid }, { selfMongo })
              }
              await back.mongoCreate(collection, result, { selfMongo });
              logger.cron("daily clients done : " + dateToString(result.date.from)).catch((err) => { console.log(err); });
            }
            await sleep(1000);
          }
          result = await analytics.dailyClients(todayDate, instance.mongo, instance.mongolocal);
          if (result === null) {
            await logger.error("daily clients error : " + dateToString(todayDate));
          } else {
            ancid = result.ancid;
            rows = await back.mongoRead(collection, { ancid }, { selfMongo });
            if (rows.length !== 0) {
              await back.mongoDelete(collection, { ancid }, { selfMongo })
            }
            await back.mongoCreate(collection, result, { selfMongo });
            logger.cron("daily clients done : " + dateToString(result.date.from)).catch((err) => { console.log(err); });
          }
          await sleep(1000);

          // daily query
          collection = "queryAnalytics";
          for (let thisDate of dateArr) {
            result = await analytics.queryParsing(thisDate, instance.mongolocal);
            if (result === null) {
              await logger.error("query parsing error : " + dateToString(thisDate));
              await sleep(1000);
              result = await analytics.queryParsing(thisDate, instance.mongolocal);
              if (result === null) {
                await logger.error("query parsing error : " + dateToString(thisDate));
                await sleep(1000);
                result = await analytics.queryParsing(thisDate, instance.mongolocal);
                if (result === null) {
                  await logger.error("query parsing error : " + dateToString(thisDate));
                  await sleep(1000);
                  result = await analytics.queryParsing(thisDate, instance.mongolocal);
                  if (result === null) {
                    await logger.error("query parsing error : " + dateToString(thisDate));
                  } else {
                    key = result.key;
                    rows = await back.mongoRead(collection, { key }, { selfMongo });
                    if (rows.length !== 0) {
                      await back.mongoDelete(collection, { key }, { selfMongo })
                    }
                    await back.mongoCreate(collection, result, { selfMongo });
                    logger.cron("daily query done : " + dateToString(result.date.from)).catch((err) => { console.log(err); });
                  }
                } else {
                  key = result.key;
                  rows = await back.mongoRead(collection, { key }, { selfMongo });
                  if (rows.length !== 0) {
                    await back.mongoDelete(collection, { key }, { selfMongo })
                  }
                  await back.mongoCreate(collection, result, { selfMongo });
                  logger.cron("daily query done : " + dateToString(result.date.from)).catch((err) => { console.log(err); });
                }
              } else {
                key = result.key;
                rows = await back.mongoRead(collection, { key }, { selfMongo });
                if (rows.length !== 0) {
                  await back.mongoDelete(collection, { key }, { selfMongo })
                }
                await back.mongoCreate(collection, result, { selfMongo });
                logger.cron("daily query done : " + dateToString(result.date.from)).catch((err) => { console.log(err); });
              }
            } else {
              key = result.key;
              rows = await back.mongoRead(collection, { key }, { selfMongo });
              if (rows.length !== 0) {
                await back.mongoDelete(collection, { key }, { selfMongo })
              }
              await back.mongoCreate(collection, result, { selfMongo });
              logger.cron("daily query done : " + dateToString(result.date.from)).catch((err) => { console.log(err); });
            }
            await sleep(1000);
          }

          // monthly analytics
          await sleep(1000);
          await requestSystem("https://" + address.officeinfo.ghost.host + "/analyticsMonthly", { date: new Date() }, { headers: { "Content-Type": "application/json" } });

          // meta, naver complex
          await sleep(1000);
          await requestSystem("https://" + address.contentsinfo.host + ":3000/metaComplex", { day: dayNumber }, { headers: { "Content-Type": "application/json" } });

          return true;
        } catch (e) {
          console.log(e);
          logger.error("Static lounge 서버 문제 생김 (rou_post_analyticsDaily): " + e.message).catch((e) => { console.log(e); });
          return false;
        }
      })().catch((err) => {
        console.log(err);
        logger.error("Static lounge 서버 문제 생김 (rou_post_analyticsDaily): " + err.message).catch((e) => { console.log(e); });
      });

      res.send({ message: "will do" });
    } catch (e) {
      await logger.error("Static lounge 서버 문제 생김 (rou_post_analyticsDaily): " + e.message);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_analyticsToday = function () {
  const instance = this;
  const { equalJson, stringToDate, requestSystem, sleep, dateToString } = this.mother;
  const back = this.back;
  const analytics = this.analytics;
  const address = this.address;
  let obj = {};
  obj.link = [ "/analyticsToday" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const selfMongo = instance.mongolocal;
      const reportMode = (req.body.report === 1 || req.body.report === "1")
      let collection;
      let anaid, ancid, key, rows;
      let result;
      let thisDate;
      let now;

      (async () => {
        try {

          now = new Date();
          thisDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);

          // daily analytics
          collection = "dailyAnalytics";
          result = await analytics.dailyMetric(thisDate);
          if (result === null) {
            await logger.error("daily metric error : " + dateToString(thisDate));
            await sleep(1000);
            result = await analytics.dailyMetric(thisDate);
            if (result === null) {
              await logger.error("daily metric error : " + dateToString(thisDate));
              await sleep(1000);
              result = await analytics.dailyMetric(thisDate);
              if (result === null) {
                await logger.error("daily metric error : " + dateToString(thisDate));
                await sleep(1000);
                result = await analytics.dailyMetric(thisDate);
                if (result === null) {
                  await logger.error("daily metric error : " + dateToString(thisDate));
                } else {
                  anaid = result.anaid;
                  rows = await back.mongoRead(collection, { anaid }, { selfMongo });
                  if (rows.length !== 0) {
                    await back.mongoDelete(collection, { anaid }, { selfMongo })
                  }
                  await back.mongoCreate(collection, result, { selfMongo });
                  logger.cron("daily analytics done : " + dateToString(result.date.from)).catch((err) => { console.log(err); });
                }
              } else {
                anaid = result.anaid;
                rows = await back.mongoRead(collection, { anaid }, { selfMongo });
                if (rows.length !== 0) {
                  await back.mongoDelete(collection, { anaid }, { selfMongo })
                }
                await back.mongoCreate(collection, result, { selfMongo });
                logger.cron("daily analytics done : " + dateToString(result.date.from)).catch((err) => { console.log(err); });
              }
            } else {
              anaid = result.anaid;
              rows = await back.mongoRead(collection, { anaid }, { selfMongo });
              if (rows.length !== 0) {
                await back.mongoDelete(collection, { anaid }, { selfMongo })
              }
              await back.mongoCreate(collection, result, { selfMongo });
              logger.cron("daily analytics done : " + dateToString(result.date.from)).catch((err) => { console.log(err); });
            }
          } else {
            anaid = result.anaid;
            rows = await back.mongoRead(collection, { anaid }, { selfMongo });
            if (rows.length !== 0) {
              await back.mongoDelete(collection, { anaid }, { selfMongo })
            }
            await back.mongoCreate(collection, result, { selfMongo });
            logger.cron("daily analytics done : " + dateToString(result.date.from)).catch((err) => { console.log(err); });
          }
          await sleep(1000);

          // today clients
          collection = "dailyClients";
          result = await analytics.dailyClients(thisDate, instance.mongo, instance.mongolocal);
          if (result === null) {
            await logger.error("daily clients error : " + dateToString(thisDate));
          } else {
            ancid = result.ancid;
            rows = await back.mongoRead(collection, { ancid }, { selfMongo });
            if (rows.length !== 0) {
              await back.mongoDelete(collection, { ancid }, { selfMongo })
            }
            await back.mongoCreate(collection, result, { selfMongo });
            logger.cron("daily clients done : " + dateToString(result.date.from)).catch((err) => { console.log(err); });
          }
          await sleep(1000);

          // daily query
          collection = "queryAnalytics";
          result = await analytics.queryParsing(thisDate, instance.mongolocal);
          if (result === null) {
            await logger.error("query parsing error : " + dateToString(thisDate));
            await sleep(1000);
            result = await analytics.queryParsing(thisDate, instance.mongolocal);
            if (result === null) {
              await logger.error("query parsing error : " + dateToString(thisDate));
              await sleep(1000);
              result = await analytics.queryParsing(thisDate, instance.mongolocal);
              if (result === null) {
                await logger.error("query parsing error : " + dateToString(thisDate));
                await sleep(1000);
                result = await analytics.queryParsing(thisDate, instance.mongolocal);
                if (result === null) {
                  await logger.error("query parsing error : " + dateToString(thisDate));
                } else {
                  key = result.key;
                  rows = await back.mongoRead(collection, { key }, { selfMongo });
                  if (rows.length !== 0) {
                    await back.mongoDelete(collection, { key }, { selfMongo })
                  }
                  await back.mongoCreate(collection, result, { selfMongo });
                  logger.cron("daily query done : " + dateToString(result.date.from)).catch((err) => { console.log(err); });
                }
              } else {
                key = result.key;
                rows = await back.mongoRead(collection, { key }, { selfMongo });
                if (rows.length !== 0) {
                  await back.mongoDelete(collection, { key }, { selfMongo })
                }
                await back.mongoCreate(collection, result, { selfMongo });
                logger.cron("daily query done : " + dateToString(result.date.from)).catch((err) => { console.log(err); });
              }
            } else {
              key = result.key;
              rows = await back.mongoRead(collection, { key }, { selfMongo });
              if (rows.length !== 0) {
                await back.mongoDelete(collection, { key }, { selfMongo })
              }
              await back.mongoCreate(collection, result, { selfMongo });
              logger.cron("daily query done : " + dateToString(result.date.from)).catch((err) => { console.log(err); });
            }
          } else {
            key = result.key;
            rows = await back.mongoRead(collection, { key }, { selfMongo });
            if (rows.length !== 0) {
              await back.mongoDelete(collection, { key }, { selfMongo })
            }
            await back.mongoCreate(collection, result, { selfMongo });
            logger.cron("daily query done : " + dateToString(result.date.from)).catch((err) => { console.log(err); });
          }
          await sleep(1000);

          if (reportMode) {
            await requestSystem("https://" + address.officeinfo.ghost.host + "/logBasicReport", { message: "do it" }, { headers: { "Content-Type": "application/json" } });
          }

          return true;
        } catch (e) {
          console.log(e);
          logger.error("Static lounge 서버 문제 생김 (rou_post_analyticsToday): " + e.message).catch((e) => { console.log(e); });
          return false;
        }
      })().catch((err) => {
        console.log(err);
        logger.error("Static lounge 서버 문제 생김 (rou_post_analyticsToday): " + err.message).catch((e) => { console.log(e); });
      });

      res.send({ message: "will do" });
    } catch (e) {
      await logger.error("Static lounge 서버 문제 생김 (rou_post_analyticsToday): " + e.message);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_analyticsMonthly = function () {
  const instance = this;
  const { equalJson, stringToDate, requestSystem, sleep, dateToString } = this.mother;
  const back = this.back;
  const analytics = this.analytics;
  const address = this.address;
  let obj = {};
  obj.link = [ "/analyticsMonthly" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const { date } = equalJson(req.body);
      const selfMongo = instance.mongolocal;
      const collection = "complexAnalytics";
      let targetDate;
      let key;
      let searchKey;
      let rows;

      if (!(date instanceof Date)) {
        targetDate = new Date();
      } else {
        targetDate = date;
      }

      (async () => {
        try {
          let result;
          result = await analytics.monthlyMetric(targetDate);
          if (result === null) {
            await logger.error("monthly metric error : " + dateToString(targetDate));
          } else {
            key = result.pastMonth.key;
            searchKey = "^" + key.split("_").slice(0, -1).join("_");
            rows = await back.mongoRead(collection, { key: { $regex: searchKey } }, { selfMongo });
            if (rows.length !== 0) {
              await back.mongoDelete(collection, { key: rows[0].key }, { selfMongo })
            }
            await back.mongoCreate(collection, result.pastMonth, { selfMongo });
            logger.cron("monthly analytics done : " + dateToString(result.pastMonth.date.from)).catch((err) => { console.log(err); });

            if (result.thisMonth !== null) {
              await sleep(1000);
              key = result.thisMonth.key;
              searchKey = "^" + key.split("_").slice(0, -1).join("_");
              rows = await back.mongoRead(collection, { key: { $regex: searchKey } }, { selfMongo });
              if (rows.length !== 0) {
                await back.mongoDelete(collection, { key: rows[0].key }, { selfMongo })
              }
              await back.mongoCreate(collection, result.thisMonth, { selfMongo });
              logger.cron("monthly analytics done : " + dateToString(result.thisMonth.date.from)).catch((err) => { console.log(err); });

            }
          }
          return true;
        } catch (e) {
          console.log(e);
          logger.error("Static lounge 서버 문제 생김 (rou_post_analyticsMonthly): " + e.message).catch((e) => { console.log(e); });
          return false;
        }
      })().catch((err) => {
        logger.error("Static lounge 서버 문제 생김 (rou_post_analyticsMonthly): " + err.message).catch((e) => { console.log(e); });
        console.log(err);
      });

      res.send({ message: "will do" });
    } catch (e) {
      await logger.error("Static lounge 서버 문제 생김 (rou_post_analyticsMonthly): " + e.message);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_designerAboutComplete = function () {
  const instance = this;
  const back = this.back;
  const { equalJson } = this.mother;
  let obj = {};
  obj.link = [ "/designerAboutComplete" ];
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
      const collection = "homeliaisonAnalytics";
      const completeStandardNumber = 10;
      const targetPageName = "designerAbout";
      const { mode } = equalJson(req.body);
      let rows;
      let profileComplete, workComplete, aboutUpdateComplete;
      let resultObj;
      let desidToResult;
      let finalObj;

      desidToResult = async (desid, preRows = null) => {
        try {
          if (preRows === null) {
            rows = await back.mongoPick(collection, [ {
              $and: [
                {
                  page: targetPageName,
                },
                {
                  "data.desid": desid,
                }
              ]
            }, {
              page: 1,
              action: 1,
              data: 1,
              id: 1,
              date: 1,
            } ], { selfMongo });
          } else {
            rows = preRows.filter((o) => { return o.data.desid === desid });
          }

          profileComplete = rows.filter((o) => { return o.action === "profilePhotoUpload" }).length > 0;
          workComplete = [ ...new Set(rows.filter((o) => { return o.action === "workPhotoUpload" }).map((o) => { return o.data.index })) ].length >= 4;
          aboutUpdateComplete = [ ...new Set(rows.filter((o) => { return o.action === "designerAboutUpdate" }).map((o) => { return o.data.property })) ].length >= completeStandardNumber;

          resultObj = {
            profileComplete: profileComplete ? 1 : 0,
            workComplete: workComplete ? 1 : 0,
            aboutUpdateComplete: aboutUpdateComplete ? 1 : 0,
          };

          return resultObj;

        } catch (e) {
          return null;
        }
      }

      if (mode === "total") {
        const designers = await back.mongoPick("designer", [ {}, { desid: 1 } ], { selfMongo });
        finalObj = {};
        preRows = await back.mongoPick(collection, [ {
          page: targetPageName,
        }, {
          page: 1,
          action: 1,
          data: 1,
          id: 1,
          date: 1,
        } ], { selfMongo });
        for (let { desid } of designers) {
          finalObj[desid] = await desidToResult(desid, preRows);
        }
        res.send(JSON.stringify(finalObj));
      } else if (mode === "pick") {
        const { desid } = equalJson(req.body);
        const targetResult = await desidToResult(desid);
        res.send(JSON.stringify(targetResult));
      } else {
        throw new Error("invalid mode");
      }

    } catch (e) {
      logger.error("Static console 문제 생김 (rou_post_designerAboutComplete): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_filesToZip = function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink, dateToString, equalJson, uniqueValue } = this.mother;
  const address = this.address;
  let obj = {};
  obj.link = [ "/filesToZip" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.files === undefined) {
        throw new Error("invalid post");
      }
      const home = process.env.HOME;
      const uniqueValueFileName = "homeliaisonCloud_" + uniqueValue("string");
      const tempFileFolderName = "temp";
      const tempFileFolder = `${home}/${tempFileFolderName}`;
      const { files } = equalJson(req.body);
      let targetFiles;

      if (await fileSystem(`exist`, [ tempFileFolder ])) {
        await shellExec(`rm`, [ `-rf`, tempFileFolder ]);
      }
      await shellExec(`mkdir`, [ tempFileFolder ]);

      targetFiles = files.map((obj) => { return { absolute: obj.absolute.replace(/__samba__/gi, address.officeinfo.ghost.file.static).replace(/\/$/, ''), type: obj.type } });

      for (let { absolute, type } of targetFiles) {
        if (type === "file") {
          await shellExec(`cp`, [ absolute, tempFileFolder ]);
        } else {
          await shellExec(`cp`, [ `-r`, absolute, tempFileFolder ]);
        }
      }

      await shellExec(`mv`, [ tempFileFolder, `${home}/${uniqueValueFileName}` ]);
      await shellExec(`cd ${home};zip -r ${uniqueValueFileName}.zip ./${uniqueValueFileName}`);
      await shellExec(`mv`, [ `${home}/${uniqueValueFileName}.zip`, `${address.officeinfo.ghost.file.static}/${uniqueValueFileName}.zip` ]);
      await shellExec(`rm`, [ `-rf`, `${home}/${uniqueValueFileName}` ]);

      setTimeout(async () => {
        try {
          await shellExec(`rm`, [ `-rf`, `${address.officeinfo.ghost.file.static}/${uniqueValueFileName}.zip` ]);
        } catch (e) {
          console.log(e);
        }
      }, 1000 * 60 * 60 * 5);

      res.send(JSON.stringify({ link: "__samba__/" + uniqueValueFileName + ".zip" }));
    } catch (e) {
      console.log(e);
      logger.error("Static lounge 서버 문제 생김 (rou_post_filesToZip): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_renameFile = function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink, dateToString, equalJson, uniqueValue } = this.mother;
  const address = this.address;
  let obj = {};
  obj.link = [ "/renameFile" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.path === undefined || req.body.name === undefined) {
        throw new Error("invalid post");
      }
      const { path, name } = equalJson(req.body);
      let targetFile;
      let targetPlace;
      let thisExe;
      let thisFinal;

      targetFile = path.replace(/__samba__/gi, address.officeinfo.ghost.file.static).replace(/\/$/, '');
      targetPlace = targetFile.split("/").slice(0, -1).join("/");
      thisExe = targetFile.split("/").slice(-1)[0].split(".")[1];
      if (thisExe === undefined) {
        thisFinal = "";
      } else {
        thisFinal = "." + thisExe;
      }
      await shellExec(`mv`, [ targetFile, targetPlace.replace(/\/$/, '') + "/" + name.replace(/^\//, '').replace(/\/$/, '') + thisFinal ]);
      res.send(JSON.stringify({ message: "done" }));
    } catch (e) {
      logger.error("Static lounge 서버 문제 생김 (rou_post_renameFile): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_deleteFile = function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink, dateToString, equalJson, uniqueValue } = this.mother;
  const address = this.address;
  let obj = {};
  obj.link = [ "/deleteFile" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.files === undefined) {
        throw new Error("invalid post");
      }
      const { files } = equalJson(req.body);
      const allowedPath = [
        address.officeinfo.ghost.file.static + "/drive/# 홈리에종",
        address.officeinfo.ghost.file.static + address.officeinfo.ghost.file.office + "/고객/",
        address.officeinfo.ghost.file.static + address.officeinfo.ghost.file.office + "/디자이너/",
        address.officeinfo.ghost.file.static + address.officeinfo.ghost.file.office + "/일시적",
      ];
      let targetFiles;

      targetFiles = files.map((obj) => { return { absolute: obj.absolute.replace(/__samba__/gi, address.officeinfo.ghost.file.static).replace(/\/$/, ''), type: obj.type } });

      for (let { absolute, type } of targetFiles) {
        if (type === "file") {
          if (allowedPath.some((reg) => { return (new RegExp("^" + reg)).test(absolute) })) {
            await shellExec(`rm`, [ `-f`, absolute ]);
          }
        } else {
          if (absolute !== address.officeinfo.ghost.file.static) {
            if (allowedPath.some((reg) => { return (new RegExp("^" + reg)).test(absolute) })) {
              await shellExec(`rm`, [ `-rf`, absolute ]);
            }
          }
        }
      }

      res.send(JSON.stringify({ message: "done" }));
    } catch (e) {
      logger.error("Static lounge 서버 문제 생김 (rou_post_deleteFile): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_getMicrosoftAccessToken = function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink, dateToString, equalJson, uniqueValue } = this.mother;
  const microsoft = this.microsoft;
  let obj = {};
  obj.link = [ "/getMicrosoftAccessToken" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const accessToken = await microsoft.getAccessTokenInServer();
      res.send(JSON.stringify({ accessToken }));
    } catch (e) {
      logger.error("Static lounge 서버 문제 생김 (rou_post_getMicrosoftAccessToken): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_renewMicrosoftAccessToken = function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink, dateToString, equalJson, uniqueValue, sleep } = this.mother;
  const microsoft = this.microsoft;
  let obj = {};
  obj.link = [ "/renewMicrosoftAccessToken" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      let boo;
      boo = await microsoft.renewAccessToken();
      while (!boo) {
        await sleep(3000);
        boo = await microsoft.renewAccessToken();
      }
      res.send(JSON.stringify({ message: "done" }));
    } catch (e) {
      logger.error("Static lounge 서버 문제 생김 (rou_post_renewMicrosoftAccessToken): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_getMacArr = function () {
  const instance = this;
  const devices = this.devices;
  const { fileSystem, shellExec, shellLink, dateToString, equalJson, uniqueValue } = this.mother;
  let obj = {};
  obj.link = [ "/getMacArr" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const macArr = await devices.getMacArr();
      res.send(JSON.stringify(macArr));
    } catch (e) {
      logger.error("Static lounge 서버 문제 생김 (rou_post_getMacArr): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_fromToFileAlarm = function () {
  const instance = this;
  const address = this.address;
  const { requestSystem } = this.mother;
  let obj = {};
  obj.link = [ "/fromToFileAlarm" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.fromId === undefined || req.body.toId === undefined) {
        throw new Error("invalid input");
      }
      const { fromId, toId } = req.body;
      const portNumber = 3000;
      const path = "/fairyMessage";
      const thisMember = instance.members.find((o) => { return o.id === toId });
      const text = "안녕하세요, " + thisMember.name + "님! #{from}님께서 새로운 파일을 업로드하셨습니다. 확인부탁드립니다!";
      requestSystem("https://" + address.secondinfo.host + ":" + String(portNumber) + path, { fromId, toId, text }, { headers: { "Content-Type": "application/json" } }).catch((err) => { console.log(err); })
      res.send(JSON.stringify({ message: "done" }));
    } catch (e) {
      logger.error("Static lounge 서버 문제 생김 (rou_post_fromToFileAlarm): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_parsingDevicesStatus = function () {
  const instance = this;
  const devices = this.devices;
  const { fileSystem, shellExec, shellLink, dateToString, equalJson, uniqueValue } = this.mother;
  let obj = {};
  obj.link = [ "/parsingDevicesStatus" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      res.send(JSON.stringify({}));
    } catch (e) {
      logger.error("Static lounge 서버 문제 생김 (rou_post_parsingDevicesStatus): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_storeDevicesStatus = function () {
  const instance = this;
  const { fileSystem, equalJson, shellExec, messageSend } = this.mother;
  let obj;
  obj = {};
  obj.link = [ "/storeDevicesStatus" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      logger.error("Static lounge 서버 문제 생김 (rou_post_storeDevicesStatus): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_getDevicesStatus = function () {
  const instance = this;
  const devices = this.devices;
  const { fileSystem, equalJson, shellExec, messageSend } = this.mother;
  let obj;
  obj = {};
  obj.link = [ "/getDevicesStatus" ];
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
      const resultObj = await devices.getDevicesStatus();
      res.send(JSON.stringify(resultObj));
    } catch (e) {
      logger.error("Static lounge 서버 문제 생김 (rou_post_getDevicesStatus): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_callHistory = function () {
  const instance = this;
  const back = this.back;
  const { requestSystem, stringToDate, autoHypenPhone } = this.mother;
  const url = "https://centrex.uplus.co.kr/RestApi/callhistory";
  const { officeinfo: { phone: { numbers: phoneNumbers, password: pass } } } = instance.address;
  const querystring = require("querystring");
  const callConst = "c_";
  const successStandardSec = 200;
  const parsingCallHistory = async (MONGOC, MONGOCONSOLEC) => {
    try {
      const selfMongo = MONGOC;
      const selfConsoleInfo = MONGOCONSOLEC;
      let res, tong, data, query, calltype, page;
      let outArr, inArr;
      let tempObj;
      let rows, cliid;
      let whereQuery, updateQuery;
      let historyObj;
      let boo;
      let requestNumber;
      let targetColumn;
      let pastHistory;
      let index, indexTarget;

      calltype = "outbound";
      tong = {};
      for (let id of phoneNumbers) {
        page = 0;
        do {
          page++;
          query = { id, pass, calltype, page };
          res = await requestSystem(url + "?" + querystring.stringify(query), query, { headers: { "Content-Type": "application/json" } });
          data = res.data;
          if (data.DATAS === null) {
            break;
          }
          for (let obj of data.DATAS) {
            if (!Array.isArray(tong[callConst + obj.SRC])) {
              tong[callConst + obj.SRC] = [];
            }
            tong[callConst + obj.SRC].push(JSON.parse(JSON.stringify(obj)));
          }
        } while (data.SVC_RT === '0000');
      }

      for (let c in tong) {
        tong[c].sort((a, b) => { return a.NO - b.NO; });
        tong[c] = { out: JSON.parse(JSON.stringify(tong[c])), in: [] };
      }

      calltype = "inbound";
      for (let id of phoneNumbers) {
        page = 0;
        do {
          page++;
          query = { id, pass, calltype, page };
          res = await requestSystem(url + "?" + querystring.stringify(query), query, { headers: { "Content-Type": "application/json" } });
          data = res.data;
          if (data.DATAS === null) {
            break;
          }
          for (let obj of data.DATAS) {
            if (tong[callConst + obj.DST] !== undefined) {
              tong[callConst + obj.DST].in.push(JSON.parse(JSON.stringify(obj)));
            }
          }
        } while (data.SVC_RT === '0000');
      }

      outArr = [];
      inArr = [];
      for (let c in tong) {
        for (let obj of tong[c].out) {
          tempObj = {};
          tempObj.date = stringToDate(obj.TIME);
          tempObj.to = autoHypenPhone(obj.DST);
          tempObj.duration = Number.isNaN(Number(obj.DURATION.replace(/[^0-9]/gi, ''))) ? 0 : Number(obj.DURATION.replace(/[^0-9]/gi, ''));
          if (obj.STATUS === "OK") {
            if (tempObj.duration >= successStandardSec) {
              tempObj.success = true;
            } else {
              tempObj.success = false;
            }
          } else {
            tempObj.success = false;
          }
          outArr.push(tempObj);
        }
        for (let obj of tong[c].in) {
          tempObj = {};
          tempObj.date = stringToDate(obj.TIME);
          tempObj.from = autoHypenPhone(obj.SRC);
          tempObj.duration = Number.isNaN(Number(obj.DURATION.replace(/[^0-9]/gi, ''))) ? 0 : Number(obj.DURATION.replace(/[^0-9]/gi, ''));
          if (obj.STATUS === "OK") {
            if (tempObj.duration >= successStandardSec) {
              tempObj.success = true;
            } else {
              tempObj.success = false;
            }
          } else {
            tempObj.success = false;
          }
          inArr.push(tempObj);
        }
      }

      outArr.sort((a, b) => { return a.date.valueOf() - b.date.valueOf(); });
      inArr.sort((a, b) => { return a.date.valueOf() - b.date.valueOf(); });

      for (let { date, to, duration, success } of outArr) {
        rows = await back.getClientsByQuery({ phone: to }, { selfMongo });
        if (rows.length !== 0) {
          cliid = rows[0].cliid;
          historyObj = await back.getHistoryById("client", cliid, { selfMongo: selfConsoleInfo });
          boo = true;
          index = 0;
          indexTarget = -1;
          for (let obj of historyObj.curation.analytics.call.out) {
            if (obj.date.getFullYear() === date.getFullYear() && obj.date.getMonth() === date.getMonth() && obj.date.getDate() === date.getDate() && obj.date.getHours() === date.getHours() && obj.date.getMinutes() === date.getMinutes()) {
              boo = false;
              indexTarget = index;
            }
            index++;
          }
          if (boo) {
            historyObj.curation.analytics.call.out.push({ date, success, duration });
            whereQuery = { cliid };
            updateQuery = {};
            updateQuery["curation.analytics.call.out"] = historyObj.curation.analytics.call.out;
            await back.updateHistory("client", [ whereQuery, updateQuery ], { selfMongo: selfConsoleInfo });
          } else {
            if (typeof historyObj.curation.analytics.call.out[indexTarget] === "object") {
              if (historyObj.curation.analytics.call.out[indexTarget].duration !== duration) {
                historyObj.curation.analytics.call.out[indexTarget].duration = duration;
                historyObj.curation.analytics.call.out[indexTarget].success = success;
                whereQuery = { cliid };
                updateQuery = {};
                updateQuery["curation.analytics.call.out"] = historyObj.curation.analytics.call.out;
                await back.updateHistory("client", [ whereQuery, updateQuery ], { selfMongo: selfConsoleInfo });
              }
            }
          }

          requestNumber = 0;
          for (let i = 0; i < rows[0].requests.length; i++) {
            if (rows[0].requests[i].request.timeline.valueOf() <= date.valueOf()) {
              requestNumber = i;
              break;
            }
          }
          pastHistory = rows[0].requests[requestNumber].analytics.date.call.history.toNormal();
          targetColumn = "requests." + String(requestNumber) + ".analytics.date.call.history";
          boo = true;
          for (let obj of pastHistory) {
            if (obj.date.getFullYear() === date.getFullYear() && obj.date.getMonth() === date.getMonth() && obj.date.getDate() === date.getDate() && obj.date.getHours() === date.getHours() && obj.date.getMinutes() === date.getMinutes()) {
              boo = false;
            }
          }
          if (boo) {
            pastHistory.push({ date, who: '' });
            whereQuery = { cliid };
            updateQuery = {};
            updateQuery[targetColumn] = pastHistory;
            await back.updateClient([ whereQuery, updateQuery ], { selfMongo });
          }

        }
      }

      for (let { date, from, duration, success } of inArr) {
        rows = await back.getClientsByQuery({ phone: from }, { selfMongo });
        if (rows.length !== 0) {
          cliid = rows[0].cliid;
          historyObj = await back.getHistoryById("client", cliid, { selfMongo: selfConsoleInfo });
          boo = true;
          index = 0;
          indexTarget = -1;
          for (let obj of historyObj.curation.analytics.call.in) {
            if (obj.date.getFullYear() === date.getFullYear() && obj.date.getMonth() === date.getMonth() && obj.date.getDate() === date.getDate() && obj.date.getHours() === date.getHours() && obj.date.getMinutes() === date.getMinutes()) {
              boo = false;
              indexTarget = index;
            }
            index++;
          }
          if (boo) {
            historyObj.curation.analytics.call.in.push({ date, success, duration });
            whereQuery = { cliid };
            updateQuery = {};
            updateQuery["curation.analytics.call.in"] = historyObj.curation.analytics.call.in;
            await back.updateHistory("client", [ whereQuery, updateQuery ], { selfMongo: selfConsoleInfo });
          } else {
            if (typeof historyObj.curation.analytics.call.in[indexTarget] === "object") {
              if (historyObj.curation.analytics.call.in[indexTarget].duration !== duration) {
                historyObj.curation.analytics.call.in[indexTarget].duration = duration;
                historyObj.curation.analytics.call.in[indexTarget].success = success;
                whereQuery = { cliid };
                updateQuery = {};
                updateQuery["curation.analytics.call.in"] = historyObj.curation.analytics.call.in;
                await back.updateHistory("client", [ whereQuery, updateQuery ], { selfMongo: selfConsoleInfo });
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
  obj.link = [ "/callHistory" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      parsingCallHistory(instance.mongo, instance.mongoconsole).then((boo) => {
        if (boo) {
          return logger.cron("callHistory update sync success : " + JSON.stringify(new Date()));
        } else {
          return logger.alert("call history fail");
        }
      }).catch((err) => {
        logger.error("Static lounge 서버 문제 생김 (rou_post_callHistory): " + err.message).catch((err) => { console.log(err) });
      });
      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      await logger.error("Static lounge 서버 문제 생김 (rou_post_callHistory): " + e.message);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_calendarSync = function () {
  const instance = this;
  const back = this.back;
  const calendar = this.calendar;
  const address = this.address;
  const { sleep } = this.mother;
  const calendarSyncFunc = async (MONGOC, index) => {
    try {
      const selfMongo = MONGOC;
      const today = new Date();
      const standardDay = new Date();
      const pastConst = 3;
      standardDay.setDate(standardDay.getDate() - pastConst);
      let projects, from;
      let clients, designers;
      let client, designer;
      let title, list;
      let allEvents;

      from = "photographing";
      projects = await back.getProjectsByQuery({
        $and: [
          { "desid": { $regex: "^d" } },
          { "contents.photo.date": { $gt: standardDay } },
          { "contents.photo.date": { $lt: new Date(3000, 0, 1) } },
        ]
      }, { selfMongo });

      if (projects.length > 0) {
        clients = await back.getClientsByQuery({
          $or: [ ...new Set(projects.toNormal().map((pr) => { return pr.cliid; })) ].map((c) => { return { cliid: c } }),
        }, { selfMongo });
        designers = await back.getDesignersByQuery({
          $or: [ ...new Set(projects.toNormal().map((pr) => { return pr.desid; })) ].map((c) => { return { desid: c } }),
        }, { selfMongo });
        allEvents = await calendar.listEvents(from);

        for (let project of projects) {
          if (!/디자이너/gi.test(project.contents.photo.info.photographer) && !/고객/gi.test(project.contents.photo.info.photographer)) {
            client = clients.toNormal().find((obj) => { return obj.cliid === project.cliid });
            designer = designers.toNormal().find((obj) => { return obj.desid === project.desid });
            title = `촬영 W ${client.name}C ${designer.designer}D ${project.contents.photo.info.photographer}P ${project.contents.photo.info.interviewer}I ${project.proid}`;
            list = allEvents.filter((obj) => { return (new RegExp(project.proid, "gi")).test(obj.title) });
            if (list.length === 1) {
              await calendar.updateSchedule(from, list[0].eventId, { start: project.contents.photo.date.toNormal(), title });
            } else if (list.length === 0) {
              await calendar.makeSchedule(from, title, '', project.contents.photo.date.toNormal());
            } else {
              for (let i = 0; i < list.length; i++) {
                if (i === 0) {
                  await calendar.updateSchedule(from, list[i].eventId, { start: project.contents.photo.date.toNormal(), title });
                } else {
                  await calendar.deleteSchedule(from, list[i].eventId);
                }
              }
            }
          } else {
            list = allEvents.filter((obj) => { return (new RegExp(project.proid, "gi")).test(obj.title) });
            if (list.length !== 0) {
              for (let i = 0; i < list.length; i++) {
                await calendar.deleteSchedule(from, list[i].eventId);
              }
            }
          }
        }
      }

      from = "designerMeeting";
      projects = await back.getProjectsByQuery({
        $and: [
          { "desid": { $regex: "^d" } },
          { "process.contract.meeting.date": { $gt: standardDay } },
          { "process.contract.meeting.date": { $lt: new Date(3000, 0, 1) } },
        ]
      }, { selfMongo });

      if (projects.length > 0) {

        clients = await back.getClientsByQuery({
          $or: [ ...new Set(projects.toNormal().map((pr) => { return pr.cliid; })) ].map((c) => { return { cliid: c } }),
        }, { selfMongo });
        designers = await back.getDesignersByQuery({
          $or: [ ...new Set(projects.toNormal().map((pr) => { return pr.desid; })) ].map((c) => { return { desid: c } }),
        }, { selfMongo });
        allEvents = await calendar.listEvents(from);

        for (let project of projects) {
          client = clients.toNormal().find((obj) => { return obj.cliid === project.cliid });
          designer = designers.toNormal().find((obj) => { return obj.desid === project.desid });
          title = `현장 미팅 W ${client.name}C ${designer.designer}D ${project.proid}`;
          list = allEvents.filter((obj) => { return (new RegExp(project.proid, "gi")).test(obj.title) });
          if (list.length === 1) {
            await calendar.updateSchedule(from, list[0].eventId, { start: project.process.contract.meeting.date.toNormal(), title });
          } else if (list.length === 0) {
            await calendar.makeSchedule(from, title, '', project.process.contract.meeting.date.toNormal());
          } else {
            for (let i = 0; i < list.length; i++) {
              if (i === 0) {
                await calendar.updateSchedule(from, list[i].eventId, { start: project.process.contract.meeting.date.toNormal(), title });
              } else {
                await calendar.deleteSchedule(from, list[i].eventId);
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
  obj.link = [ "/calendarSync" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      calendarSyncFunc(instance.mongo, 0).then((boo) => {
        if (boo) {
          logger.cron("calendar sync success " + String(0) + " : " + JSON.stringify(new Date())).catch((err) => { console.log(err) });
        } else {
          logger.error("calendar sync fail " + String(0) + " : " + JSON.stringify(new Date())).catch((err) => { console.log(err) });
        }
        return calendarSyncFunc(instance.mongo, 1);
      }).then((boo) => {
        if (boo) {
          return logger.cron("calendar sync success " + String(1) + " : " + JSON.stringify(new Date()));
        } else {
          return logger.error("calendar sync fail " + String(1) + " : " + JSON.stringify(new Date()));
        }
      }).catch((err) => {
        logger.error("Static lounge 서버 문제 생김 (rou_post_calendarSync): " + err.message).catch((err) => { console.log(err) });
      });
      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      await logger.error("Static lounge 서버 문제 생김 (rou_post_calendarSync): " + e.message);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_workProposalToClient = function () {
  const instance = this;
  const work = this.work;
  const { equalJson } = this.mother;
  let obj = {};
  obj.link = [ "/workProposalToClient" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      work.setProposalToClient("cron", { selfMongo: instance.mongo }).then(() => {
        return logger.cron("proposal to client sync done : " + JSON.stringify(new Date()));
      }).catch((err) => {
        logger.error("Static lounge 서버 문제 생김 (rou_post_workProposalToClient): " + err.message).catch((err) => { console.log(err) });
      });
      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      await logger.error("Static lounge 서버 문제 생김 (rou_post_workProposalToClient): " + e.message);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_workProjectActionSync = function () {
  const instance = this;
  const work = this.work;
  const { equalJson } = this.mother;
  let obj = {};
  obj.link = [ "/workProjectActionSync" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      work.projectActionSync({ selfMongo: instance.mongo, selfConsoleMongo: instance.mongoconsole, updateMongo: instance.mongo }).then(() => {
        return logger.cron("project action sync done : " + JSON.stringify(new Date()));
      }).catch((err) => {
        logger.error("Static lounge 서버 문제 생김 (rou_post_workProjectActionSync): " + err.message).catch((err) => { console.log(err) });
      });
      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      await logger.error("Static lounge 서버 문제 생김 (rou_post_workProjectActionSync): " + e.message);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_photoStatusSync = function () {
  const instance = this;
  const back = this.back;
  const { sleep, equalJson } = this.mother;
  const photoStatusSyncFunc = async (MONGOC) => {
    try {
      const selfMongo = MONGOC;
      const dummny = {
        status: "결제 대기",
        date: new Date(1800, 0, 1),
        cancel: new Date(1800, 0, 1),
        calculation: {
          amount: 165000,
          info: {
            method: "",
            proof: "",
            to: "",
          },
          refund: 0,
        },
      };
      const collection = "project";
      let allDesigners;
      let whereQuery, updateQuery;
      let rawProjects;
      let proid;
      let thisDummy;
      let thisDesigner;
      let thisProof;

      allDesigners = (await back.getDesignersByQuery({}, { selfMongo })).toNormal();

      rawProjects = await selfMongo.db("miro81").collection(collection).find({}).toArray();
      for (let rawProject of rawProjects) {
        proid = rawProject.proid;
        thisDesigner = null;
        if (rawProject.desid !== '') {
          thisDesigner = allDesigners.find((designer) => { return designer.desid === rawProject.desid });
          if (thisDesigner === undefined) {
            thisDesigner = null;
          }
        }

        whereQuery = { proid };
        updateQuery = {};
        thisDummy = equalJson(JSON.stringify(dummny));

        if (rawProject.contents.photo.boo) {

          if ((new Date(2000, 0, 1)).valueOf() <= rawProject.contents.photo.date.valueOf() && (new Date(3000, 0, 1)).valueOf() > rawProject.contents.photo.date.valueOf()) {
            if ((new Date()).valueOf() >= rawProject.contents.photo.date.valueOf()) {

              if (rawProject.contents.photo.info.photographer !== "디자이너" && rawProject.contents.photo.info.photographer !== "고객") {

                if (rawProject.contents.photo.info.photographer !== "미정") {
                  updateQuery["contents.photo.status"] = "촬영 완료";
                }

              } else {

                updateQuery["contents.photo.status"] = "해당 없음";
                thisDummy.status = "해당 없음";
                thisDummy.calculation.amount = 0;
                updateQuery["contents.payment"] = thisDummy;

              }

            }
          } else {

            if (/완료/gi.test(rawProject.contents.photo.status)) {
              if (rawProject.contents.photo.info.photographer === "디자이너" || rawProject.contents.photo.info.photographer === "고객") {
                if (rawProject.process.calculation.payments.remain.date > (new Date(2000, 0, 1)).valueOf()) {
                  updateQuery["contents.photo.status"] = "해당 없음";
                  updateQuery["contents.photo.date"] = rawProject.process.calculation.payments.remain.date;
                  thisDummy.status = "해당 없음";
                  thisDummy.calculation.amount = 0;
                  updateQuery["contents.payment"] = thisDummy;
                }
              }
            }

          }

        } else {
          updateQuery["contents.photo.status"] = "해당 없음";
          thisDummy.status = "해당 없음";
          thisDummy.calculation.amount = 0;
          updateQuery["contents.payment"] = thisDummy;
        }

        if (Object.keys(updateQuery).length > 0) {
          await selfMongo.db("miro81").collection(collection).updateOne(whereQuery, { $set: updateQuery });
        }

      }

      return true;
    } catch (e) {
      return false;
    }
  }
  let obj = {};
  obj.link = [ "/photoStatusSync" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      photoStatusSyncFunc(instance.mongo).then((boo) => {
        if (boo) {
          return logger.cron("photoStatus sync done : " + JSON.stringify(new Date()));
        } else {
          return logger.error("photoStatus sync error");
        }
      }).catch((err) => {
        logger.error("Static lounge 서버 문제 생김 (rou_post_photoStatusSync): " + err.message).catch((err) => { console.log(err) });
      });
      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      await logger.error("Static lounge 서버 문제 생김 (rou_post_photoStatusSync): " + e.message);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_logBasicReport = function () {
  const instance = this;
  const report = this.report;
  const { equalJson } = this.mother;
  let obj;
  obj = {};
  obj.link = [ "/logBasicReport" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      report.dailyReports().then((boo) => {
        if (boo) {
          logger.cron("marketing reporting done").catch((err) => { console.log(err) });
        } else {
          logger.error("logBasicReport fail").catch((err) => { console.log(err) });
        }
      }).catch((err) => {
        logger.error("logBasicReport error : " + err.message).catch((err) => { console.log(err) });
      });
      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      await logger.error("Static lounge 서버 문제 생김 (rou_post_logBasicReport): " + e.message);
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_readHomeliaisonAnalytics = function () {
  const instance = this;
  const back = this.back;
  const { equalJson } = this.mother;
  let obj;
  obj = {};
  obj.link = [ "/readHomeliaisonAnalytics" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.whereQuery === undefined) {
        throw new Error("invalid post");
      }
      const selfMongo = instance.mongolocal;
      const { whereQuery } = equalJson(JSON.stringify(req.body));
      const collection = "homeliaisonAnalytics";
      let rows, projectQuery;
      let projectBoo;

      if (req.body.projectQuery === undefined) {
        projectBoo = false;
        projectQuery = null;
      } else {
        projectBoo = true;
        ({ projectQuery } = equalJson(JSON.stringify(req.body)));
      }

      if (projectBoo) {
        rows = await back.mongoPick(collection, [ whereQuery, projectQuery ], { selfMongo });
      } else {
        rows = await back.mongoRead(collection, whereQuery, { selfMongo });
      }

      if (!Array.isArray(rows)) {
        rows = [];
      }

      res.send(JSON.stringify({ data: rows }));
    } catch (e) {
      await logger.error("Static lounge 서버 문제 생김 (rou_post_readHomeliaisonAnalytics): " + e.message);
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_storeClientAnalytics = function () {
  const instance = this;
  const { equalJson, requestSystem } = this.mother;
  const analytics = this.analytics;
  const back = this.back;
  const address = this.address;
  let obj;
  obj = {};
  obj.link = [ "/storeClientAnalytics" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const selfCoreMongo = instance.mongo;
      const fromDate = new Date(2023, 4, 4, 0, 0, 0);
      const fastMode = ((req.body.fast === "true" || req.body.fast === true) ? true : false);
      let agoDate;
      let targetClients;
      let agoClients;
      let targets;
      let finalTargets;
      let delta;
      let targetClients2;
      let fiveMonthAgo;

      if (!fastMode) {

        delta = 7;
        agoDate = new Date();
        agoDate.setDate(agoDate.getDate() - delta);

        fiveMonthAgo = new Date();
        fiveMonthAgo.setMonth(fiveMonthAgo.getMonth() - 5);

        targetClients = (await back.getClientsByQuery({
          $and: [
            {
              "requests": {
                $elemMatch: {
                  "request.timeline": {
                    $gte: fromDate,
                  }
                }
              }
            },
            {
              "requests": {
                $elemMatch: {
                  "analytics.response.status": {
                    $regex: "^[응장]"
                  }
                }
              }
            }
          ]
        }, { selfMongo: selfCoreMongo })).toNormal();

        targetClients2 = (await back.getClientsByQuery({
          $and: [
            {
              "requests": {
                $elemMatch: {
                  "request.timeline": {
                    $gte: fiveMonthAgo,
                  }
                }
              }
            },
            {
              "requests": {
                $elemMatch: {
                  "analytics.response.status": {
                    $regex: "^[진응장]"
                  }
                }
              }
            }
          ]
        }, { selfMongo: selfCoreMongo })).toNormal();

        agoClients = (await back.getClientsByQuery({
          "requests": {
            $elemMatch: {
              "request.timeline": {
                $gte: agoDate,
              }
            }
          }
        }, { selfMongo: selfCoreMongo })).toNormal();

        targets = targetClients.concat(agoClients);
        targets = targets.concat(targetClients2);
        finalTargets = [];
        for (let client of targets) {
          if (!finalTargets.map((c) => { return c.cliid }).includes(client.cliid)) {
            finalTargets.push(client);
          }
        }

        analytics.clientsMetric(finalTargets, instance.mongo, instance.mongoconsole, instance.mongolocal, true, false).then((result) => {
          if (Array.isArray(result)) {
            logger.cron("client analytics store success : " + JSON.stringify(new Date())).catch((err) => { console.log(err) });
          } else {
            logger.error("client analytics store fail : " + JSON.stringify(new Date())).catch((err) => { console.log(err) });
          }
        }).catch((err) => {
          logger.error("Static lounge 서버 문제 생김 (rou_post_storeClientAnalytics): " + err.message).catch((err) => { console.log(err) });
        })

        res.send(JSON.stringify({ message: "will do" }));

      } else {

        targetClients = (await back.getClientsByQuery({
          $and: [
            {
              "requests": {
                $elemMatch: {
                  "request.timeline": {
                    $gte: fromDate,
                  }
                }
              }
            },
            {
              "requests": {
                $elemMatch: {
                  "analytics.response.status": {
                    $regex: "^[응]"
                  }
                }
              }
            }
          ]
        }, { selfMongo: selfCoreMongo })).toNormal();

        finalTargets = [];
        for (let client of targetClients) {
          finalTargets.push(client);
        }

        analytics.clientsMetric(finalTargets, instance.mongo, instance.mongoconsole, instance.mongolocal, true, true).then((result) => {
          if (Array.isArray(result)) {
            logger.cron("client analytics store success (fast) : " + JSON.stringify(new Date())).catch((err) => { console.log(err) });
          } else {
            logger.error("client analytics store fail (fast) : " + JSON.stringify(new Date())).catch((err) => { console.log(err) });
          }
        }).catch((err) => {
          logger.error("Static lounge 서버 문제 생김 (rou_post_storeClientAnalytics): " + err.message).catch((err) => { console.log(err) });
        });

        res.send(JSON.stringify({ message: "will do" }));
      }

    } catch (e) {
      await logger.error("Static lounge 서버 문제 생김 (rou_post_storeClientAnalytics): " + e.message);
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_fixClientAnalytics = function () {
  const instance = this;
  const { equalJson, requestSystem } = this.mother;
  const analytics = this.analytics;
  let obj;
  obj = {};
  obj.link = [ "/fixClientAnalytics" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const selfLogMongo = instance.mongolocal;
      analytics.fixClientMetric(selfLogMongo).then((result) => {
        if (result.message === "done") {
          logger.cron("client analytics fix done : " + JSON.stringify(new Date())).catch((err) => { console.log(err) });
        } else {
          logger.error("client analytics fix fail : " + JSON.stringify(new Date())).catch((err) => { console.log(err) });
        }
      }).catch((err) => {
        logger.error("Static lounge 서버 문제 생김 (rou_post_fixClientAnalytics): " + err.message).catch((err) => { console.log(err) });
      });
      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      await logger.error("Static lounge 서버 문제 생김 (rou_post_fixClientAnalytics): " + e.message);
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_getClientAnalytics = function () {
  const instance = this;
  const { equalJson, requestSystem } = this.mother;
  const analytics = this.analytics;
  const back = this.back;
  const address = this.address;
  let obj;
  obj = {};
  obj.link = [ "/getClientAnalytics" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.cliid === undefined) {
        throw new Error("invalid post");
      }
      const { cliid } = equalJson(req.body);
      const textMode = ((req.body.textMode === "true" || req.body.textMode === true) ? true : false);
      const collection = analytics.clientAnalyticsCollection;
      let textResult;
      let rows;

      if (textMode) {
        textResult = await analytics.clientMessage(cliid, instance.mongo, instance.mongolocal);
        if (typeof textResult === "string") {
          res.send(JSON.stringify({ report: textResult }));
        } else {
          res.send(JSON.stringify({ report: "" }));
        }
      } else {
        if (req.body.projectQuery !== undefined) {
          const { projectQuery } = equalJson(req.body);
          rows = await back.mongoPick(collection, [ { cliid }, projectQuery ], { selfMongo: instance.mongolocal });
        } else {
          rows = await back.mongoRead(collection, { cliid }, { selfMongo: instance.mongolocal });
        }
        if (rows.length > 0) {
          res.send(JSON.stringify({ data: rows[rows.length - 1] }));
        } else {
          res.send(JSON.stringify({ data: null }));
        }
      }

    } catch (e) {
      await logger.error("Static lounge 서버 문제 생김 (rou_post_getClientAnalytics): " + e.message);
      res.send(JSON.stringify({ report: "" }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_storeRealtimeAnalytics = function () {
  const instance = this;
  const { equalJson, requestSystem } = this.mother;
  const analytics = this.analytics;
  let obj;
  obj = {};
  obj.link = [ "/storeRealtimeAnalytics" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      analytics.realtimeMetric(instance.mongo, instance.mongolocal, true).then((result) => {
        if (Array.isArray(result)) {
          logger.cron("realtime analytics store success : " + JSON.stringify(new Date())).catch((err) => { console.log(err) });
        } else {
          logger.error("realtime analytics store fail : " + JSON.stringify(new Date())).catch((err) => { console.log(err) });
        }
      }).catch((err) => {
        logger.error("Static lounge 서버 문제 생김 (rou_post_storeRealtimeAnalytics): " + err.message).catch((err) => { console.log(err) });
      });
      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      await logger.error("Static lounge 서버 문제 생김 (rou_post_storeRealtimeAnalytics): " + e.message);
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_realtimeMessage = function () {
  const instance = this;
  const { equalJson, requestSystem } = this.mother;
  const analytics = this.analytics;
  const address = this.address;
  let obj;
  obj = {};
  obj.link = [ "/realtimeMessage" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const { channel } = equalJson(req.body);
      const text = await analytics.realtimeMessage(instance.mongolocal);

      requestSystem("https://" + address.secondinfo.host + ":" + String(3000) + "/fairySlack", {
        channel: channel,
        text: text,
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      }).catch((err) => { console.log(err); });

      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      await logger.error("Static lounge 서버 문제 생김 (rou_post_realtimeMessage): " + e.message);
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_checkInsyncStatus = function () {
  const instance = this;
  const { processSystem } = this.mother;
  let obj;
  obj = {};
  obj.link = [ "/checkInsyncStatus" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const processList = await processSystem("list");
      const result = processList.some(({ process: str }) => { return /insync/gi.test(str); });
      if (!result) {
        await logger.error("insync death : " + JSON.stringify(new Date()));
      }
      res.send(JSON.stringify({ result }));
    } catch (e) {
      await logger.error("Static lounge 서버 문제 생김 (rou_post_checkInsyncStatus): " + e.message);
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_naverComplex = function () {
  const instance = this;
  const back = this.back;
  const naver = this.naver;
  const { equalJson } = this.mother;
  let obj;
  obj = {};
  obj.link = [ "/naverComplex" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.id === undefined) {
        throw new Error("invalid post");
      }
      const selfMongo = instance.mongolocal;
      const collection = "addressComplex";
      const { id } = equalJson(req.body);
      let result;
      let rows;
      let naverResult;

      if (typeof id !== "string") {
        throw new Error("invalid post");
      }
      if (id.trim() === '') {
        throw new Error("invalid id");
      }

      rows = await back.mongoRead(collection, { naver: id.trim() }, { selfMongo });
      if (rows.length > 0) {
        result = rows[0];
        res.send(JSON.stringify(result));
      } else if (rows.length === 0) {
        naverResult = await naver.complexModeling(id);
        if (naverResult === null) {
          throw new Error("invalid id : " + id + ", no result");
        } else {
          await back.mongoCreate(collection, naverResult, { selfMongo });
          res.send(JSON.stringify(naverResult));
        }
      }

    } catch (e) {
      await logger.error("Static lounge 서버 문제 생김 (rou_post_naverComplex): " + e.message);
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_naverComplexes = function () {
  const instance = this;
  const back = this.back;
  const naver = this.naver;
  const { equalJson } = this.mother;
  let obj;
  obj = {};
  obj.link = [ "/naverComplexes" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.idArr === undefined) {
        throw new Error("invalid post");
      }
      const { idArr } = equalJson(req.body);
      if (idArr.length === 0) {
        throw new Error("invalid post 2");
      }
      const selfMongo = instance.mongolocal;
      const collection = "addressComplex";
      let rows;
      let result;

      rows = await back.mongoRead(collection, { $or: idArr.map((id) => { return { naver: id } }) }, { selfMongo });
      result = idArr.map((id) => {
        return rows.find((o) => { return o.naver === id }) === undefined ? null : rows.find((o) => { return o.naver === id });
      });

      res.send(JSON.stringify(result));

    } catch (e) {
      await logger.error("Static lounge 서버 문제 생김 (rou_post_naverComplexes): " + e.message);
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_printComplex = function () {
  const instance = this;
  const address = this.address;
  const back = this.back;
  const naver = this.naver;
  const { equalJson, requestSystem, dateToString, messageSend } = this.mother;
  let obj;
  obj = {};
  obj.link = [ "/printComplex" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.text === undefined || req.body.cliid === undefined || req.body.requestNumber === undefined) {
        throw new Error("invalid post");
      }
      const selfMongo = instance.mongo;
      const bar = "========================================================================";
      const { text, cliid } = equalJson(req.body);
      const mode = (req.body.mode === undefined ? "general" : req.body.mode );
      const requestNumber = Number(req.body.requestNumber);
      const client = await back.getClientById(cliid, { selfMongo });
      const targetAddress = client.requests[requestNumber].request.space.address.value.trim();
      const now = new Date();
      let finalText;
      let dateValue;
      let howLong;
      let naverId;
      let whereQuery, updateQuery;
      let originalArr, foundArr;

      const searchId = (client, requestNumber) => {
        if (client.requests[requestNumber].request.space.naver !== "") {
          return new Promise((resolve, reject) => {
            resolve(client.requests[requestNumber].request.space.naver);
          });
        } else {
          return naver.complexSearch(targetAddress, true);
        }
      }

      finalText = text;
      naverId = "";

      searchId(client, requestNumber).then((complexResult) => {
        if (typeof complexResult === "string" && /[0-9]/gi.test(complexResult)) {
          return requestSystem("https://" + address.officeinfo.ghost.host + "/naverComplex", { id: complexResult.trim() }, { headers: {
            "Content-Type": "application/json",
          } });
        } else {
          return (new Promise((resolve, reject) => { return resolve(null) }));
        }
      }).then((searchResult) => {
        if (searchResult !== null) {
          if (typeof searchResult.data === "object") {
            if (typeof searchResult.data.message === "string" && /error/gi.test(searchResult.data.message)) {
              naverId = "";
            } else {

              originalArr = targetAddress.split(" ").map((str) => { return str.trim().replace(/[시도군구]$/gi, '') })
              foundArr = searchResult.data.address.value.split(" ").map((str) => { return str.trim().replace(/[시도군구]$/gi, '') })

              if ((new RegExp("^" + foundArr[0].slice(0, 1), "gi")).test(originalArr[0]) && (new RegExp("^" + foundArr[1].slice(0, 1), "gi")).test(originalArr[1])) {
                naverId = searchResult.data.naver;

                finalText += "\n\n";
                finalText += client.name + "(" + client.cliid + ") " + "네이버 부동산 정보 - " + searchResult.data.name;
                finalText += "\n";
                finalText += bar;
                finalText += "\n";

                finalText += "아파트명 : " + searchResult.data.name + "\n";
                finalText += "주소 : " + searchResult.data.address.value + "\n";
                finalText += "사용승인일 : " + dateToString(equalJson(searchResult.data).information.date);

                dateValue = (((((now.valueOf() - (equalJson(searchResult.data).information.date).valueOf()) / 1000) / 60) / 60) / 24) / 365;
                howLong = String(Math.floor(dateValue)) + "년 " + String(Math.floor((dateValue % 1) * 12)) + "개월차";

                finalText += " / " + howLong + " 아파트" + "\n";

                finalText += "총 세대수 : " + String(searchResult.data.information.count.household) + "세대" + "\n";
                finalText += bar;
                finalText += "\n";
                finalText += "타입 개수 : " + String(searchResult.data.information.type.length) + "개" + "\n";
                for (let obj of searchResult.data.information.type.detail) {
                  finalText += obj.name;
                  finalText += " (" + String(obj.area.pyeong) + "평 / " + String(obj.area.exclusivePyeong) + "평) - ";
                  finalText += "방 : " + String(obj.count.room) + "개" + " / ";
                  finalText += "화장실 : " + String(obj.count.bathroom) + "개" + "\n";
                }
                finalText += bar;
              } else {
                naverId = "";
              }

            }
          } else {
            naverId = "";
          }
        } else {
          naverId = "";
        }

        whereQuery = { cliid };
        updateQuery = {};
        updateQuery["requests." + String(requestNumber) + ".request.space.naver"] = naverId;

        if (naverId === "") {
          logger.error("Static lounge 네이버 부동산 아이디 찾기 실패 : " + cliid).catch((err) => {
            console.log(err);
          });
        }

        return back.updateClient([ whereQuery, updateQuery ], { selfMongo });
      }).then(() => {
        if (mode === "general") {
          // return requestSystem("https://" + address.officeinfo.ghost.host + ":" + String(address.officeinfo.ghost.wss) + "/printText", { text: finalText }, { headers: { "Content-Type": "application/json" } }).catch((err) => { console.log(err); });
          // return requestSystem("https://" + address.officeinfo.ghost.host + ":" + String(3000) + "/printText", { text: finalText }, { headers: { "Content-Type": "application/json" } }).catch((err) => { console.log(err); });
        } else if (mode === "update") {
          if (naverId !== "") {
            logger.log("Static lounge 네이버 부동산 아이디 찾고 업데이트 성공함 : " + cliid + " / " + naverId).catch((err) => {
              console.log(err);
            });
            return messageSend({ text: client.name + "(" + client.cliid + ")" + " 고객님의 네이버 부동산 찾기를 완료하였어요.\nlink : https://new.land.naver.com/complexes/" + naverId, channel: "#400_customer", voice: true, fairy: true });
          } else {
            return messageSend({ text: client.name + "(" + client.cliid + ")" + " 고객님의 네이버 부동산 찾기에 실패하였어요.", channel: "#400_customer", voice: true, fairy: true });
          }
        }
      }).catch((err) => {
        console.log(err);
      });

      res.send(JSON.stringify({ message: "will do" }));

    } catch (e) {
      await logger.error("Static lounge 서버 문제 생김 (rou_post_printComplex): " + e.message);
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_complexReport = function () {
  const instance = this;
  const address = this.address;
  const back = this.back;
  const { equalJson, requestSystem, dateToString, messageSend } = this.mother;
  let obj;
  obj = {};
  obj.link = [ "/complexReport" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.fromDate === undefined || req.body.toDate === undefined) {
        throw new Error("invalid post");
      }
      const { fromDate, toDate } = equalJson(req.body);
      const selfMongo = instance.mongo;
      const selfLocalMongo = instance.mongolocal;
      const selfConsoleMongo = instance.mongoconsole;
      const selfLogMongo = instance.mongolocal;
      const unknownKeyword = "unknown";
      const proposalStandardDate = new Date(2021, 8, 1);
      const proposalStandardDateValue = proposalStandardDate.valueOf();
      const fromAgoDate = new Date(JSON.stringify(fromDate).slice(1, -1));
      fromAgoDate.setMonth(fromAgoDate.getMonth() - 3);
      const motherClients_rawRaw = await back.getClientsByQuery({
        $and: [
          {
            requests: {
              $elemMatch: {
                "request.timeline": { $gte: fromAgoDate }
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
      }, { selfMongo, withTools: true });
      const motherClients_raw = motherClients_rawRaw.getRequestsTong().map((arr) => { let obj = arr[0].toNormal(); obj.cliid = arr.cliid; obj.name = arr.name; obj.analytics = arr[1].toNormal(); return obj; });
      const motherClients = motherClients_raw.filter((obj) => {
        return obj.timeline.valueOf() >= fromDate.valueOf() && obj.timeline.valueOf() < toDate.valueOf();
      });
      const motherClientHistories = await back.mongoPick("clientHistory", [ {
        $or: motherClients.map((o) => { return { cliid: o.cliid } }),
      }, { cliid: 1, manager: 1, curation: 1 } ], { selfMongo: selfConsoleMongo });
      const motherProjects_raw = (await back.getProjectsByQuery({
        $or: motherClients.map((o) => { return { cliid: o.cliid } }).concat([
          {
            "process.contract.first.date": {
              $gte: fromDate
            }
          }
        ]),
      }, { selfMongo })).toNormal();
      const motherProjects = motherProjects_raw.filter((obj) => {  return obj.process.contract.first.date.valueOf() >= fromDate.valueOf() && obj.process.contract.first.date.valueOf() < toDate.valueOf() });
      motherProjects.sort((a, b) => { return a.proposal.date.valueOf() - b.proposal.date.valueOf() });
      const standardDate = new Date(JSON.stringify(motherProjects[0].proposal.date).slice(1, -1));
      standardDate.setMonth(standardDate.getMonth() - 3);
      const motherContracts = motherClients_raw.filter((obj) => {
        return motherProjects.map((o) => { return o.cliid }).includes(obj.cliid);
      }).filter((obj) => {
        return obj.analytics.response.status === "진행" && obj.timeline.valueOf() > standardDate.valueOf();
      });
      const motherAnalytics = await back.mongoRead("dailyAnalytics", {
        $and: [
          {
            "date.from": { $gte: fromDate }
          },
          {
            "date.from": { $lt: toDate }
          },
        ]
      }, { selfMongo: selfLogMongo });
      const motherClientsAnalytics = await back.mongoRead("dailyClients", {
        $and: [
          {
            "date.from": { $gte: fromDate }
          },
          {
            "date.from": { $lt: toDate }
          },
        ]
      }, { selfMongo: selfLogMongo });
      const motherCampaign = await back.mongoRead("dailyCampaign", {
        $and: [
          {
            "date.from": { $gte: fromDate }
          },
          {
            "date.from": { $lt: toDate }
          },
        ]
      }, { selfMongo: selfLogMongo });
      let thisIdArr;
      let response;
      let consultingAparts, contractAparts;
      let regionSet;
      let pyeongSet;
      let sourceSet;
      let budgetSet;
      let adSet;
      let contractSet;
      let address;
      let thisNaver;
      let oldSet;
      let thisOld;
      let dateValue;
      let howLong;
      let returnSet;
      let usersArr;
      let targetUsers;
      let targetUserObject;
      let sourceArr;
      let campaignArr;
      let deviceArr;
      let deviceSet;
      let household;
      let targetType;
      let floor;
      let room;
      let floorSet;
      let roomSet;
      let householdSet;
      let livingSet;
      let living;
      let graphObject;
      let consultingSet, finalContractSet;
      let thisValue;
      let finalObject;
      let cliidArr_raw;
      let process;
      let histories;
      let proposalLength;
      let cliid;
      let timeline;
      let budget;
      let resident;
      let addressRaw;
      let pyeong;
      let contract;
      let naver;
      let foundProject;

      thisIdArr = motherClients.map((obj) => { return obj.space.naver }).filter((obj) => { return obj.trim() !== "" });
      response = await requestSystem("https://office.home-liaison.net:3000/naverComplexes", { idArr: thisIdArr }, { headers: { "Content-Type": "application/json" } });
      consultingAparts = equalJson(JSON.stringify(response.data.filter((str) => { return str !== null })));

      thisIdArr = motherContracts.map((obj) => { return obj.space.naver }).filter((obj) => { return obj.trim() !== "" });
      response = await requestSystem("https://office.home-liaison.net:3000/naverComplexes", { idArr: thisIdArr }, { headers: { "Content-Type": "application/json" } });
      contractAparts = equalJson(JSON.stringify(response.data.filter((str) => { return str !== null })));

      usersArr = equalJson(JSON.stringify(motherClientsAnalytics.map((o) => { return o.data.detail }).flat()));

      returnSet = (motherClients, consultingAparts) => {
        regionSet = [
          {
            case: "서울",
            value: 0,
          },
          {
            case: "경기",
            value: 0,
          },
          {
            case: "충청",
            value: 0,
          },
          {
            case: "강원",
            value: 0,
          },
          {
            case: "경상",
            value: 0,
          },
          {
            case: "전라",
            value: 0,
          },
          {
            case: "제주",
            value: 0,
          },
          {
            case: "기타",
            value: 0,
          },
        ];
        pyeongSet = [
          {
            case: "10평 미만",
            value: 0,
          },
          {
            case: "10평대",
            value: 0,
          },
          {
            case: "20평대",
            value: 0,
          },
          {
            case: "30평대",
            value: 0,
          },
          {
            case: "40평대",
            value: 0,
          },
          {
            case: "50평대",
            value: 0,
          },
          {
            case: "60평 이상",
            value: 0,
          }
        ];
        sourceSet = [
          {
            case: "메타",
            value: 0,
          },
          {
            case: "네이버",
            value: 0,
          },
          {
            case: "구글",
            value: 0,
          },
          {
            case: "유튜브",
            value: 0,
          },
          {
            case: "카카오",
            value: 0,
          },
          {
            case: "기타",
            value: 0,
          }
        ];
        budgetSet = [
          {
            case: "500만원 이하",
            value: 0,
          },
          {
            case: "1,000만원대",
            value: 0,
          },
          {
            case: "2,000만원대",
            value: 0,
          },
          {
            case: "3,000만원대",
            value: 0,
          },
          {
            case: "4,000만원대",
            value: 0,
          },
          {
            case: "5,000만원대",
            value: 0,
          },
          {
            case: "6,000만원대",
            value: 0,
          },
          {
            case: "7,000만원대",
            value: 0,
          },
          {
            case: "8,000만원대",
            value: 0,
          },
          {
            case: "9,000만원대",
            value: 0,
          },
          {
            case: "1억원대",
            value: 0,
          },
        ];
        adSet = [
          {
            case: "광고 유입",
            value: 0,
          },
          {
            case: "비광고",
            value: 0,
          },
        ];
        contractSet = [
          {
            case: "자가",
            value: 0,
          },
          {
            case: "전월세",
            value: 0,
          },
        ];
        oldSet = [
          {
            case: "예정 1년 이내",
            value: 0,
          },
          {
            case: "예정 1년 ~ 2년 이내",
            value: 0,
          },
          {
            case: "예정 2년 ~ 3년 이내",
            value: 0,
          },
          {
            case: "예정 3년 초과",
            value: 0,
          },
          {
            case: "3년 이하",
            value: 0,
          },
          {
            case: "3년 초과 5년 이하",
            value: 0,
          },
          {
            case: "5년 초과 10년 이하",
            value: 0,
          },
          {
            case: "10년 초과 20년 이하",
            value: 0,
          },
          {
            case: "20년 초과 30년 이하",
            value: 0,
          },
          {
            case: "30년 초과",
            value: 0,
          },
          {
            case: "알 수 없음",
            value: 0,
          }
        ];
        deviceSet = [
          {
            case: "모바일",
            value: 0,
          },
          {
            case: "데스크탑",
            value: 0,
          },
          {
            case: "기타",
            value: 0,
          },
        ];
        floorSet = [
          {
            case: "10층 이하",
            value: 0,
          },
          {
            case: "20층 이하",
            value: 0,
          },
          {
            case: "30층 이하",
            value: 0,
          },
          {
            case: "30층 초과",
            value: 0,
          },
          {
            case: "알 수 없음",
            value: 0,
          },
        ];
        roomSet = [
          {
            case: "방 1개",
            value: 0,
          },
          {
            case: "방 2개",
            value: 0,
          },
          {
            case: "방 3개",
            value: 0,
          },
          {
            case: "방 4개",
            value: 0,
          },
          {
            case: "방 5개 이상",
            value: 0,
          },
          {
            case: "알 수 없음",
            value: 0,
          },
        ];
        householdSet = [
          {
            case: "500세대 이하",
            value: 0,
          },
          {
            case: "500세대 ~ 1000세대",
            value: 0,
          },
          {
            case: "1000세대 ~ 2000세대",
            value: 0,
          },
          {
            case: "2000세대 ~ 3000세대",
            value: 0,
          },
          {
            case: "3000세대 초과",
            value: 0,
          },
          {
            case: "알 수 없음",
            value: 0,
          },
        ];
        livingSet = [
          {
            case: "이사",
            value: 0,
          },
          {
            case: "거주중",
            value: 0,
          },
        ];

        for (let motherClient of motherClients) {

          ({ cliid, timeline, budget, space: { resident, address: addressRaw, pyeong, contract, naver } } = motherClient);
          motherClient.summary = {};

          targetUsers = [];
          if (usersArr.find((obj) => { return obj.cliid === cliid }) !== undefined) {
            targetUsers = usersArr.find((obj) => { return obj.cliid === cliid }).users;
          }

          if (targetUsers.length > 0) {
            targetUsers.forEach((o) => {
              o.history.sort((a, b) => {
                return a.date.valueOf() - b.date.valueOf();
              })
            })
            targetUsers.sort((a, b) => {
              return a.history[0].date.valueOf() - b.history[0].date.valueOf();
            })
            targetUsers = targetUsers.map((o) => { return { source: o.source, device: o.device.kinds } });

            sourceArr = [];
            campaignArr = [];
            deviceArr = [];
            for (let userObject of targetUsers) {
              for (let str of userObject.source.mother) {
                sourceArr.push(str);
              }
              for (let str of userObject.source.campaign) {
                campaignArr.push(str);
              }
              deviceArr.push(userObject.device);
            }

            campaignArr = campaignArr.filter((str) => { return !/^link_/g.test(str) });

            targetUserObject = {
              source: sourceArr.length === 0 ? unknownKeyword : sourceArr.join(", "),
              campaign: campaignArr.length === 0 ? unknownKeyword : campaignArr.join(", "),
              device: deviceArr.length === 0 ? unknownKeyword : deviceArr[0],
            }
          } else {
            targetUserObject = {
              source: unknownKeyword,
              campaign: unknownKeyword,
              device: unknownKeyword,
            }
          }

          living = resident.living ? "거주중" : "이사"

          thisNaver = null;
          if (consultingAparts.find((obj) => { return obj.naver === naver }) !== undefined) {
            thisNaver = consultingAparts.find((obj) => { return obj.naver === naver });
          }
          address = thisNaver === null ? addressRaw : thisNaver.address.value;
          motherClient.summary.naverObject = thisNaver;

          if (thisNaver === null) {
            howLong = "알 수 없음";
          } else {
            thisOld = new Date(JSON.stringify(timeline).slice(1, -1));
            dateValue = (((((thisOld.valueOf() - (thisNaver.information.date).valueOf()) / 1000) / 60) / 60) / 24) / 365;
            howLong = String(Math.floor(dateValue)) + "년 " + String(Math.floor((dateValue % 1) * 12)) + "개월차";
          }
          motherClient.summary.howLong = howLong;

          if (thisNaver !== null) {
            thisNaver.information.type.detail.sort((a, b) => {
              return Math.abs(a.area.pyeong - pyeong) - Math.abs(b.area.pyeong - pyeong);
            })
            if (thisNaver.information.type.detail.length > 0) {
              room = thisNaver.information.type.detail[0].count.room;
            } else {
              room = 0;
            }
            household = thisNaver.information.count.household;
            floor = thisNaver.information.floor.high;
          } else {
            room = 0;
            household = 0;
            floor = 0;
          }
          motherClient.summary.count = { room, household, floor };

          if (/^서울/gi.test(address) || /^강서/gi.test(address) || /^양천/gi.test(address) || /^구로/gi.test(address) || /^영등포/gi.test(address) || /^금천/gi.test(address)|| /^동작/gi.test(address)|| /^관악/gi.test(address)|| /^서초/gi.test(address)|| /^강남/gi.test(address)|| /^송파/gi.test(address)|| /^강동/gi.test(address)|| /^광진/gi.test(address)|| /^동대문/gi.test(address)|| /^성동/gi.test(address)|| /^중랑/gi.test(address)|| /^성북/gi.test(address)|| /^강북/gi.test(address)|| /^도봉/gi.test(address)|| /^노원/gi.test(address)|| /^종로/gi.test(address)|| /^서대문/gi.test(address)|| /^마포/gi.test(address)|| /^용산/gi.test(address)|| /^은평/gi.test(address)) {
            regionSet[0].value = regionSet[0].value + 1;
            motherClient.summary.region = "서울";
          } else if (/^경기/gi.test(address) || /^인천/gi.test(address) || /^수원/gi.test(address) || /^부평/gi.test(address) || /^의정부/gi.test(address) || /^부천/gi.test(address) || /^과천/gi.test(address) || /^고양/gi.test(address) || /^시흥/gi.test(address) || /^성남/gi.test(address) || /^파주/gi.test(address) || /^김포/gi.test(address) || /^양주/gi.test(address) || /^남양주/gi.test(address) || /^포천/gi.test(address) || /^안양/gi.test(address) || /^의왕/gi.test(address) || /^광명/gi.test(address) || /^동두천/gi.test(address) || /^화성/gi.test(address) || /^오산/gi.test(address) || /^안성/gi.test(address) || /^평택/gi.test(address) || /^이천/gi.test(address) || /^여주/gi.test(address) || /^안산/gi.test(address) || /^가평/gi.test(address) || /^양평/gi.test(address)) {
            regionSet[1].value = regionSet[1].value + 1;
            motherClient.summary.region = "경기";
          } else if (/^충청/gi.test(address) || /^충북/gi.test(address) || /^충남/gi.test(address) || /^세종/gi.test(address) || /^대전/gi.test(address) || /^충주/gi.test(address)) {
            regionSet[2].value = regionSet[2].value + 1;
            motherClient.summary.region = "충청";
          } else if (/^강원/gi.test(address) || /^원주/gi.test(address) || /^강릉/gi.test(address) || /^속초/gi.test(address)) {
            regionSet[3].value = regionSet[3].value + 1;
            motherClient.summary.region = "강원";
          } else if (/^경상/gi.test(address) || /^경북/gi.test(address) || /^경남/gi.test(address) || /^부산/gi.test(address) || /^울산/gi.test(address) || /^대구/gi.test(address)) {
            regionSet[4].value = regionSet[4].value + 1;
            motherClient.summary.region = "경상";
          } else if (/^전라/gi.test(address) || /^전북/gi.test(address) || /^전남/gi.test(address) || /^광주/gi.test(address) || /^전주/gi.test(address)) {
            regionSet[5].value = regionSet[5].value + 1;
            motherClient.summary.region = "전라";
          } else if (/^제주/gi.test(address)) {
            regionSet[6].value = regionSet[6].value + 1;
            motherClient.summary.region = "제주";
          } else {
            regionSet[7].value = regionSet[7].value + 1;
            motherClient.summary.region = "기타";
          }

          motherClient.summary.pyeong = pyeong;
          if (pyeong < 10) {
            pyeongSet[0].value = pyeongSet[0].value + 1;
          } else if (pyeong >= 10 && pyeong < 20) {
            pyeongSet[1].value = pyeongSet[1].value + 1;
          } else if (pyeong >= 20 && pyeong < 30) {
            pyeongSet[2].value = pyeongSet[2].value + 1;
          } else if (pyeong >= 30 && pyeong < 40) {
            pyeongSet[3].value = pyeongSet[3].value + 1;
          } else if (pyeong >= 40 && pyeong < 50) {
            pyeongSet[4].value = pyeongSet[4].value + 1;
          } else if (pyeong >= 50 && pyeong < 60) {
            pyeongSet[5].value = pyeongSet[5].value + 1;
          } else {
            pyeongSet[6].value = pyeongSet[6].value + 1;
          }

          motherClient.summary.contract = contract;
          if (/자가/gi.test(contract)) {
            contractSet[0].value = contractSet[0].value + 1;
          } else {
            contractSet[1].value = contractSet[1].value + 1;
          }

          if (/1억/gi.test(budget)) {
            budget = 100000000;
          } else {
            budget = Number(budget.replace(/[^0-9]/gi, '')) * 10000;
          }
          motherClient.summary.budget = budget;

          if (budget < 10000000) {
            budgetSet[0].value = budgetSet[0].value + 1;
          } else if (budget >= 10000000 && budget < 20000000) {
            budgetSet[1].value = budgetSet[1].value + 1;
          } else if (budget >= 20000000 && budget < 30000000) {
            budgetSet[2].value = budgetSet[2].value + 1;
          } else if (budget >= 30000000 && budget < 40000000) {
            budgetSet[3].value = budgetSet[3].value + 1;
          } else if (budget >= 40000000 && budget < 50000000) {
            budgetSet[4].value = budgetSet[4].value + 1;
          } else if (budget >= 50000000 && budget < 60000000) {
            budgetSet[5].value = budgetSet[5].value + 1;
          } else if (budget >= 60000000 && budget < 70000000) {
            budgetSet[6].value = budgetSet[6].value + 1;
          } else if (budget >= 70000000 && budget < 80000000) {
            budgetSet[7].value = budgetSet[7].value + 1;
          } else if (budget >= 80000000 && budget < 90000000) {
            budgetSet[8].value = budgetSet[8].value + 1;
          } else if (budget >= 90000000 && budget < 100000000) {
            budgetSet[9].value = budgetSet[9].value + 1;
          } else {
            budgetSet[10].value = budgetSet[10].value + 1;
          }

          if (/없음/gi.test(howLong)) {
            oldSet[10].value = budgetSet[10].value + 1;
          } else {
            if (/^\-/gi.test(howLong)) {

              howLong = Number(howLong.replace(/년/gi, ".").replace(/[^0-9\.]/gi, ''));
              if (howLong <= 1) {
                oldSet[0].value = oldSet[0].value + 1;
              } else if (howLong > 1 && howLong <= 2) {
                oldSet[1].value = oldSet[1].value + 1;
              } else if (howLong > 2 && howLong <= 3) {
                oldSet[2].value = oldSet[2].value + 1;
              } else {
                oldSet[3].value = oldSet[3].value + 1;
              }

            } else {

              howLong = Number(howLong.replace(/년/gi, ".").replace(/[^0-9\.]/gi, ''));
              if (howLong <= 3) {
                oldSet[4].value = oldSet[4].value + 1;
              } else if (howLong > 3 && howLong <= 5) {
                oldSet[5].value = oldSet[5].value + 1;
              } else if (howLong > 5 && howLong <= 10) {
                oldSet[6].value = oldSet[6].value + 1;
              } else if (howLong > 10 && howLong <= 20) {
                oldSet[7].value = oldSet[7].value + 1;
              } else if (howLong > 20 && howLong <= 30) {
                oldSet[8].value = oldSet[8].value + 1;
              } else if (howLong > 30) {
                oldSet[9].value = oldSet[9].value + 1;
              } else {
                oldSet[10].value = oldSet[10].value + 1;
              }

            }
          }

          if (targetUserObject.campaign === unknownKeyword) {
            adSet[1].value = adSet[1].value + 1;
            motherClient.summary.ad = adSet[1].case;
          } else {
            adSet[0].value = adSet[0].value + 1;
            motherClient.summary.ad = adSet[0].case;
          }

          if (targetUserObject.source === unknownKeyword) {
            sourceSet[5].value = sourceSet[5].value + 1;
            motherClient.summary.source = sourceSet[5].case;
          } else if (/meta/gi.test(targetUserObject.source) || /facebook/gi.test(targetUserObject.source) || /instagram/gi.test(targetUserObject.source)) {
            sourceSet[0].value = sourceSet[0].value + 1;
            motherClient.summary.source = sourceSet[0].case;
          } else if (/naver/gi.test(targetUserObject.source)) {
            sourceSet[1].value = sourceSet[1].value + 1;
            motherClient.summary.source = sourceSet[1].case;
          } else if (/google/gi.test(targetUserObject.source)) {
            sourceSet[2].value = sourceSet[2].value + 1;
            motherClient.summary.source = sourceSet[2].case;
          } else if (/youtube/gi.test(targetUserObject.source)) {
            sourceSet[3].value = sourceSet[3].value + 1;
            motherClient.summary.source = sourceSet[3].case;
          } else if (/kakao/gi.test(targetUserObject.source)) {
            sourceSet[4].value = sourceSet[4].value + 1;
            motherClient.summary.source = sourceSet[4].case;
          } else {
            sourceSet[5].value = sourceSet[5].value + 1;
            motherClient.summary.source = sourceSet[5].case;
          }

          if (/mobile/gi.test(targetUserObject.device)) {
            deviceSet[0].value = deviceSet[0].value + 1;
            motherClient.summary.device = deviceSet[0].case;
          } else if (/desktop/gi.test(targetUserObject.device)) {
            deviceSet[1].value = deviceSet[1].value + 1;
            motherClient.summary.device = deviceSet[1].case;
          } else {
            deviceSet[2].value = deviceSet[2].value + 1;
            motherClient.summary.device = deviceSet[2].case;
          }

          if (floor === 0) {
            floorSet[4].value = floorSet[4].value + 1;
          } else if (floor <= 10) {
            floorSet[0].value = floorSet[0].value + 1;
          } else if (floor > 10 && floor <= 20) {
            floorSet[1].value = floorSet[1].value + 1;
          } else if (floor > 20 && floor <= 30) {
            floorSet[2].value = floorSet[2].value + 1;
          } else {
            floorSet[3].value = floorSet[3].value + 1;
          }

          if (room === 0) {
            roomSet[5].value = roomSet[5].value + 1;
          } else if (room === 1) {
            roomSet[0].value = roomSet[0].value + 1;
          } else if (room === 2) {
            roomSet[1].value = roomSet[1].value + 1;
          } else if (room === 3) {
            roomSet[2].value = roomSet[2].value + 1;
          } else if (room === 4) {
            roomSet[3].value = roomSet[3].value + 1;
          } else {
            roomSet[4].value = roomSet[4].value + 1;
          }

          if (household === 0) {
            householdSet[5].value = householdSet[5].value + 1;
          } else if (household <= 500) {
            householdSet[0].value = householdSet[0].value + 1;
          } else if (household > 500 && household <= 1000) {
            householdSet[1].value = householdSet[1].value + 1;
          } else if (household > 1000 && household <= 2000) {
            householdSet[2].value = householdSet[2].value + 1;
          } else if (household > 2000 && household <= 3000) {
            householdSet[3].value = householdSet[3].value + 1;
          } else {
            householdSet[4].value = householdSet[4].value + 1;
          }

          motherClient.summary.living = living;
          if (living === "이사") {
            livingSet[0].value = livingSet[0].value + 1;
          } else {
            livingSet[1].value = livingSet[1].value + 1;
          }

        }

        return {
          region: regionSet,
          pyeong: pyeongSet,
          contract: contractSet,
          budget: budgetSet,
          old: oldSet,
          ad: adSet,
          source: sourceSet,
          device: deviceSet,
          floor: floorSet,
          room: roomSet,
          household: householdSet,
          living: livingSet,
          original: motherClients,
        }
      }

      consultingSet = returnSet(motherClients, consultingAparts);
      finalContractSet = returnSet(motherContracts, contractAparts);

      graphObject = {
        region: equalJson(JSON.stringify(consultingSet.region)),
        pyeong: equalJson(JSON.stringify(consultingSet.pyeong)),
        contract: equalJson(JSON.stringify(consultingSet.contract)),
        budget: equalJson(JSON.stringify(consultingSet.budget)),
        old: equalJson(JSON.stringify(consultingSet.old)),
        ad: equalJson(JSON.stringify(consultingSet.ad)),
        source: equalJson(JSON.stringify(consultingSet.source)),
        device: equalJson(JSON.stringify(consultingSet.device)),
        floor: equalJson(JSON.stringify(consultingSet.floor)),
        room: equalJson(JSON.stringify(consultingSet.room)),
        household: equalJson(JSON.stringify(consultingSet.household)),
        living: equalJson(JSON.stringify(consultingSet.living)),
      };

      for (let key in graphObject) {
        for (let obj of graphObject[key]) {
          thisValue = finalContractSet[key].find((o) => { return o.case === obj.case }).value;
          obj.contract = thisValue;
          obj.ratio = obj.value === 0 ? 0 : thisValue / obj.value;
        }
      }

      if (fromDate.valueOf() >= proposalStandardDateValue) {
        cliidArr_raw = motherClients.map((obj) => { return obj.cliid; });
        cliidArr_raw = Array.from(new Set(cliidArr_raw));
        process = motherProjects_raw.filter((obj) => { return cliidArr_raw.includes(obj.cliid) });
        histories = motherClientHistories.filter((obj) => { return process.map((o) => { return o.cliid; }).includes(obj.cliid) });
        histories = histories.filter((obj) => { return obj.curation.analytics.send.some((o) => { return /designerProposal/gi.test(o.page) }) });
        proposalLength = histories.length;
      } else {
        cliidArr_raw = clients.map((obj) => { return obj.cliid; });
        cliidArr_raw = Array.from(new Set(cliidArr_raw));
        process = motherProjects_raw.filter((obj) => { return cliidArr_raw.includes(obj.cliid) });
        proposalLength = process.length;
      }

      for (let clientObj of finalContractSet.original) {
        foundProject = motherProjects.find((o) => { return o.proposal.date.valueOf() >= clientObj.timeline.valueOf() && o.cliid === clientObj.cliid });
        clientObj.thisProject = foundProject === undefined ? null : foundProject;
      }
      finalContractSet.original = finalContractSet.original.filter((c) => { return c.thisProject !== null });

      finalObject = {
        clients: motherClients.length,
        proposal: proposalLength,
        contracts: motherContracts.length,
        contractsSuccess: motherProjects.filter((p) => { return !/드랍/gi.test(p.process.status) }).length,
        contractsSupply: motherProjects.filter((p) => { return !/드랍/gi.test(p.process.status) }).reduce((acc, curr) => {
          return acc + curr.process.contract.remain.calculation.amount.supply;
        }, 0),
        mau: motherAnalytics.map((o) => { return o.data.users }).reduce((acc, curr) => { return acc + curr.total }, 0),
        pageViews: motherAnalytics.map((o) => { return o.data.views }).reduce((acc, curr) => { return acc + curr.total }, 0),
        consulting: motherAnalytics.map((o) => { return o.data.conversion.consultingPage.total }).reduce((acc, curr) => { return acc + curr }, 0) + motherAnalytics.map((o) => { return o.data.conversion.popupOpen.total }).reduce((acc, curr) => { return acc + curr }, 0),
        charge: motherCampaign.map((o) => { return o.value.charge }).reduce((acc, curr) => { return acc + curr }, 0),
        impressions: motherCampaign.map((o) => { return o.value.performance.impressions }).reduce((acc, curr) => { return acc + curr }, 0),
        clicks: motherCampaign.map((o) => { return o.value.performance.clicks }).reduce((acc, curr) => { return acc + curr }, 0),
        graph: graphObject,
        contractDetail: finalContractSet.original,
      };

      res.send(JSON.stringify(finalObject));

    } catch (e) {
      await logger.error("Static lounge 서버 문제 생김 (rou_post_complexReport): " + e.message);
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_receiveSms = function () {
  const instance = this;
  const back = this.back;
  const { equalJson, dateToString, stringToDate, requestSystem, cryptoString, sleep } = this.mother;
  const { pushbullet } = this;
  const { token, device, threads, password, host, version } = pushbullet;
  let obj;
  obj = {};
  obj.link = [ "/receiveSms" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    const selfMongo = instance.mongolocal;
    const idKeyword = "sms_";
    const path = "/permanents";
    const collection = "accountSms";
    try {
      const { date, amount, name } = equalJson(req.body);
      const obj = {
        id: idKeyword + String(date.valueOf()) + "_" + String(amount),
        date,
        amount,
        name
      }
      rows = await back.mongoRead(collection, { id: obj.id }, { selfMongo });
      if (rows.length === 0) {
        await requestSystem("https://" + instance.address.officeinfo.host + ":3002/smsParsing", { date: obj.date, amount: obj.amount, name: obj.name }, { headers: { "Content-Type": "application/json" } });
        await back.mongoCreate(collection, obj, { selfMongo });
        await sleep(500);
      }
      res.send(JSON.stringify({ message: "done" }));

    } catch (e) {
      await logger.error("Static lounge 서버 문제 생김 (rou_post_receiveSms): " + e.message);

      const { date, amount, name } = equalJson(req.body);
      const obj = {
        id: idKeyword + String(date.valueOf()) + "_" + String(amount),
        date,
        amount,
        name
      }
      rows = await back.mongoRead(collection, { id: obj.id }, { selfMongo });
      if (rows.length === 0) {
        await requestSystem("https://" + instance.address.officeinfo.host + ":3002/smsParsing", { date: obj.date, amount: obj.amount, name: obj.name }, { headers: { "Content-Type": "application/json" } });
        await back.mongoCreate(collection, obj, { selfMongo });
        await sleep(500);
      }
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_refreshDesignerCareer = function () {
  const instance = this;
  const back = this.back;
  const { equalJson, dateToString, stringToDate, requestSystem, cryptoString, sleep } = this.mother;
  let obj;
  obj = {};
  obj.link = [ "/refreshDesignerCareer" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    const selfMongo = instance.mongo;
    try {
      const designers = await back.getDesignersByQuery({}, { selfMongo });
      const future = new Date(3000, 0, 1);
      const futureValue = future.valueOf();
      let targetDate;
      let targetYear, targetMonth;
      let whereQuery, updateQuery;
      let updateQuery2;
      let relatedY, relatedM;
      let dateValue;
      let monthDelta;
      for (let designer of designers) {

        targetDate = new Date(JSON.stringify(designer.information.contract.date).slice(1, -1));
        targetYear = targetDate.getFullYear();
        targetMonth = targetDate.getMonth() + 1;
        whereQuery = {};
        whereQuery["desid"] = designer.desid;
        updateQuery = {};
        updateQuery["information.business.career.startY"] = targetYear;
        updateQuery["information.business.career.startM"] = targetMonth;
        await back.updateDesigner([ whereQuery, updateQuery ], { selfMongo });

        if (designer.information.business.career.detail.length > 0) {
          dateValue = 0;
          for (let obj of designer.information.business.career.detail) {
            if (!/기타 업무/gi.test(obj.tag)) {
              if (obj.date.end.valueOf() > futureValue) {
                dateValue += (new Date()).valueOf() - obj.date.start.valueOf();
              } else {
                dateValue += obj.date.end.valueOf() - obj.date.start.valueOf();
              }
            }
          }
          monthDelta = Math.floor(((((dateValue / 1000) / 60) / 60) / 24) / 30);
          relatedY = Math.floor(monthDelta / 12);
          relatedM = monthDelta % 12;
          updateQuery2 = {};
          updateQuery2["information.business.career.relatedY"] = relatedY;
          updateQuery2["information.business.career.relatedM"] = relatedM;
          await back.updateDesigner([ whereQuery, updateQuery2 ], { selfMongo });
        }

      }

      await logger.cron("refresh designer career success : " + JSON.stringify(new Date()));
      res.send(JSON.stringify({ message: "done" }));

    } catch (e) {
      await logger.error("Static lounge 서버 문제 생김 (rou_post_refreshDesignerCareer): " + e.message);
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_mysqlReflection = function () {
  const instance = this;
  const back = this.back;
  const { equalJson, dateToString, stringToDate, requestSystem, mysqlQuery, sleep } = this.mother;
  const intoMysql = async (thisSqueeze) => {
    let tableReady;
    let boo;
    let safeNum;
    let injectionValues;
    let injectionBoo;
    let retryBoo;
    try {

      tableReady = async (model) => {
        let res;
        try {
          res = await mysqlQuery(model.getDropSql(), { center: true });
          if (res.message === "done") {
            res = await mysqlQuery(model.getCreateSql(), { center: true });
            if (res.message !== "done") {
              throw new Error("create fail");
            }
          } else {
            throw new Error("drop fail");
          }
          return true;
        } catch (e) {
          if (e.message === "create fail") {
            console.log(e);
            return false;
          } else {
            try {
              res = await mysqlQuery(model.getCreateSql(), { center: true });
              if (res.message !== "done") {
                throw new Error("create fail");
              }
              return true;
            } catch (e) {
              console.log(e);
              return false;
            }
          }
        }
      }
      injectionValues = async (data) => {
        let queryList;
        let queryResult;
        try {
          queryList = data.getInsertSql();
          queryResult = await mysqlQuery(queryList, { center: true });
          if (queryResult.message !== "done") {
            throw new Error("insert fail");
          }
          return true;
        } catch (e) {
          console.log(e);
          return false;
        }
      }

      boo = await tableReady(thisSqueeze.model);
      safeNum = 0;
      while (!boo) {
        if (safeNum > 10) {
          break;
        }
        await sleep(3000);
        boo = await tableReady(thisSqueeze.model);
        safeNum++;
      }

      if (boo) {
        injectionBoo = await injectionValues(thisSqueeze.data);
        if (!injectionBoo) {
          await sleep(3000);
          retryBoo = await intoMysql(thisSqueeze);
          if (retryBoo) {
            return true;
          } else {
            throw new Error("retry fail");
          }
        }
      }

      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
  let obj;
  obj = {};
  obj.link = [ "/mysqlReflection" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const selfMongo = instance.mongo;

      (async () => {
        try {
          let clients, designers, projects, aspirants;
          let resultBoo;

          clients = await back.getClientsByQuery({}, { withTools: true, selfMongo });
          resultBoo = await intoMysql(clients.dimensionSqueeze());
          if (!resultBoo) {
            throw new Error("clients mysql reflection fail");
          }

          designers = await back.getDesignersByQuery({}, { withTools: true, selfMongo });
          resultBoo = await intoMysql(designers.dimensionSqueeze());
          if (!resultBoo) {
            throw new Error("designers mysql reflection fail");
          }

          projects = await back.getProjectsByQuery({}, { withTools: true, selfMongo });
          resultBoo = await intoMysql(projects.dimensionSqueeze());
          if (!resultBoo) {
            throw new Error("projects mysql reflection fail");
          }

          aspirants = await back.getAspirantsByQuery({}, { withTools: true, selfMongo });
          resultBoo = await intoMysql(aspirants.dimensionSqueeze());
          if (!resultBoo) {
            throw new Error("aspirants mysql reflection fail");
          }

          await logger.cron("core db mysql reflection success : " + JSON.stringify(new Date()));

          return true;
        } catch (e) {
          logger.error("Static lounge 서버 문제 생김 (rou_post_mysqlReflection): " + e.message).catch((e) => { console.log(e); });
          return false;
        }
      })().catch((err) => {
        logger.error("Static lounge 서버 문제 생김 (rou_post_mysqlReflection): " + err.message).catch((e) => { console.log(e); });
        console.log(err);
      });

      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      await logger.error("Static lounge 서버 문제 생김 (rou_post_mysqlReflection): " + e.message);
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_hahaDropClients = function () {
  const instance = this;
  const back = this.back;
  const { equalJson, dateToString, stringToDate, requestSystem, mysqlQuery, sleep } = this.mother;
  let obj;
  obj = {};
  obj.link = [ "/hahaDropClients" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const selfMongo = instance.mongo;
      const selfConsoleMongo = instance.mongoconsole;
      const targetClients = await back.getClientsByQuery({
        requests: {
          $elemMatch: {
            "analytics.response.status": {
              $regex: "^[응]"
            }
          }
        }
      }, { selfMongo });
      const now = new Date();
      const ago = new Date();
      const delta = 14;
      const emptyDate = new Date(2000, 0, 1);
      const emptyDateValue = emptyDate.valueOf();
      let thisHistories;
      let historyWhereQuery;
      let resultArr;
      let hahaTargetClients;
      let thisHistory;
      let hahaList;
      let index;
      let proposals;
      let totalProposals;
      let boo;
      let whereQuery, updateQuery;

      ago.setDate(ago.getDate() - delta);

      if (targetClients.length > 0) {

        historyWhereQuery = {};
        historyWhereQuery["$or"] = targetClients.map((c) => { return c.cliid }).map((cliid) => { return { cliid } });
        thisHistories = await back.mongoPick("clientHistory", [ historyWhereQuery, {
          cliid: 1,
          manager: 1,
          "curation.analytics.send": 1,
          "curation.service.serid": 1,
          "curation.construct.items": 1,
        } ], { selfMongo: selfConsoleMongo });

        resultArr = [];
        for (let { manager, cliid, curation: { analytics: { send } } } of thisHistories) {
          resultArr.push({
            cliid,
            manager,
            haha: send.filter((obj) => { return obj.page === "lowLowPush" }),
          })
        }

        hahaTargetClients = targetClients.toNormal().filter((client) => { return resultArr.filter((o) => { return o.haha.length > 0 }).map((c) => { return c.cliid }).includes(client.cliid) });

        for (let client of hahaTargetClients) {
          thisHistory = resultArr.find((c) => { return c.cliid === client.cliid });
          thisHistory.haha.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });
          client.haha = equalJson(JSON.stringify(thisHistory.haha));
          client.manager = thisHistory.manager;
        }

        if (hahaTargetClients.length > 0) {
          totalProposals = await back.getProjectsByQuery({ $or: hahaTargetClients.map((c) => { return { cliid: c.cliid } }) }, { selfMongo });

          for (let client of hahaTargetClients) {
            index = 0;
            for (let { request, analytics } of client.requests) {
              hahaList = client.haha.filter((o) => { return o.date.valueOf() >= request.timeline.valueOf() });
              if (hahaList.length > 0) {
                if (client.requests[index - 1] !== undefined) {
                  hahaList = hahaList.filter((o) => { return o.date.valueOf() <= client.requests[index - 1].request.timeline.valueOf() });
                }
                if (hahaList.length > 0) {
                  if (hahaList[0].date.valueOf() <= ago.valueOf()) {
                    proposals = totalProposals.toNormal().filter((p) => { return p.cliid === client.cliid });
                    if (client.requests[index - 1] !== undefined) {
                      proposals = proposals.filter((p) => { return p.proposal.date.valueOf() >= request.timeline.valueOf() && p.proposal.date.valueOf() < client.requests[index - 1].request.timeline.valueOf() });
                    } else {
                      proposals = proposals.filter((p) => { return p.proposal.date.valueOf() >= request.timeline.valueOf() });
                    }

                    boo = false;
                    if (proposals.length === 0) {
                      boo = true;
                    } else {
                      proposals = proposals.filter((p) => { return p.process.contract.first.date.valueOf() > emptyDateValue && !/드랍/gi.test(p.process.status) })
                      boo = (proposals.length === 0);
                    }

                    if (boo) {
                      whereQuery = {};
                      updateQuery = {};
                      whereQuery.cliid = client.cliid;
                      updateQuery["requests." + String(index) + ".analytics.response.status"] = "드랍";
                      await back.updateClient([ whereQuery, updateQuery ], { selfMongo });
                    }

                  }
                }
              }
              index++;
            }
          }
        }

      }

      await logger.cron("haha drop clints success : " + JSON.stringify(new Date()));

      res.send(JSON.stringify({ message: "done" }));
    } catch (e) {
      await logger.error("Static lounge 서버 문제 생김 (rou_post_hahaDropClients): " + e.message);
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_syncDesignProposal = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const imageReader = this.imageReader;
  const { equalJson, dateToString, stringToDate, requestSystem, mysqlQuery, sleep, fileSystem, shellExec, shellLink } = this.mother;
  const { staticConst } = this;
  const downloadDesignProposal = async (selfMongo, logger = null) => {
    try {
      const targetRoot = staticConst + "/designProposal/image";
      const toNormal = true;
      const endPoint = "https://" + address.transinfo.host + ":" + String(3000);
      const config = { headers: { "Content-Type": "application/json" } };
      const userName = "ubuntu";
      const scpRoot = userName + "@" + address.transinfo.host + ":"
      const scpPath = scpRoot + "/home/" + userName + "/static/photo/designer";
      const representativeFolderPath = "/representative";
      const representativeRootPath = "/photo/designer" + representativeFolderPath;
      const indexToken = "____index____";
      const digitStandard = 5;
      const designers = await back.getDesignersByQuery({}, { selfMongo, toNormal });
      let rootFolderStatus;
      let desid;
      let targetProjects;
      let response;
      let fileTargets;
      let downloadPath;
      let result0, result1, result2, result3;
      let result0Path, result1Path, result2Path, result3Path;
      let worksInfo;
      let worksFiles;
      let representativeFiles;
      let worksFilesTargets;
      let thisFileName;
      let thisFilePureName;
      let thisFileExe;
      let thisFilePath;
      let thisFolderPath;
      let thisFolderContents_past, thisFolderContents;

      rootFolderStatus = await fileSystem(`readFolder`, [ targetRoot ]);
      for (let designer of designers) {
        if (!rootFolderStatus.includes(designer.desid)) {
          await shellExec(`mkdir`, [ `${targetRoot}/${designer.desid}` ]);
        }
      }

      response = await requestSystem(endPoint + "/designerWorksList", { mode: "entire" }, config);
      [ result0, result1, result2, result3, worksInfo ] = response.data;

      result0Path = worksInfo[1] + "/" + worksInfo[2][0]
      result1Path = worksInfo[1] + "/" + worksInfo[2][1]
      result2Path = worksInfo[1] + "/" + worksInfo[2][2]
      result3Path = worksInfo[1] + "/" + worksInfo[2][3]

      worksFiles = [];
      worksFiles = worksFiles.concat(result0.map((obj) => { return { desid: obj.desid, file: result0Path + "/" + obj.file.name } }));
      worksFiles = worksFiles.concat(result1.map((obj) => { return { desid: obj.desid, file: result1Path + "/" + obj.file.name } }));
      worksFiles = worksFiles.concat(result2.map((obj) => { return { desid: obj.desid, file: result2Path + "/" + obj.file.name } }));
      worksFiles = worksFiles.concat(result3.map((obj) => { return { desid: obj.desid, file: result3Path + "/" + obj.file.name } }));

      for (let designer of designers) {
        desid = designer.desid;
        thisFolderPath = targetRoot + "/" + desid + "/";
        thisFolderContents_past = await fileSystem(`readFolder`, [ thisFolderPath ]);
        thisFolderContents_past = thisFolderContents_past.map((s) => {
          let original;
          let pureFileName;
          let originalTempArr;

          originalTempArr = s.split(indexToken);
          if (originalTempArr.length >= 2) {
            original = originalTempArr[1];
            if (original === undefined) {
              throw new Error("something wrong => " + desid + " / " + s)
            }
            pureFileName = original.split('.')[0];
            pureFileName = pureFileName.slice(0, -1 * digitStandard);
            return { original, pure: pureFileName };
          } else {
            original = originalTempArr[0];
            pureFileName = original.split('.')[0];
            pureFileName = pureFileName.slice(0, -1 * digitStandard);
            return { original, pure: pureFileName };
          }

        });

        // projects
        response = await requestSystem(endPoint + "/middlePhotoRead", { target: "/" + desid }, config);
        targetProjects = response.data.filter((s) => { return /^p/gi.test(s) });
        for (let proid of targetProjects) {
          response = await requestSystem(endPoint + "/middlePhotoRead", { target: "/" + desid + "/" + proid }, config);
          fileTargets = response.data.filter((s) => { return !/^firstPhoto/gi.test(s) }).filter((s) => { return !/^quarterPhoto/gi.test(s) }).filter((s) => { return !/^middlePhoto/gi.test(s) }).filter((s) => { return /jpg$/gi.test(s) || /jpeg$/gi.test(s) || /png$/gi.test(s) || /pdf$/gi.test(s) });
          for (let fileName of fileTargets) {
            thisFileName = fileName;
            thisFilePureName = thisFileName.split(".")[0];
            thisFileExe = thisFileName.split(".")[thisFileName.split(".").length - 1];
            thisFilePath = thisFolderPath + thisFileName;
            downloadPath = scpPath + "/" + desid + "/" + proid + "/" + fileName;
            if (!thisFolderContents_past.map((o) => { return new RegExp(o.pure, "g") }).some((r) => { return r.test(thisFilePureName) })) {
              await shellExec("scp", [ downloadPath, thisFolderPath ]);
              if (/pdf/gi.test(thisFileExe)) {
                try {
                  await imageReader.pdfToJpg(thisFilePath, true);
                } catch {}
              }
              console.log("download", downloadPath);
              await sleep(500);
            }
          }
        }

        // representative
        response = await requestSystem(endPoint + "/readFolder", { path: representativeRootPath + "/" + desid }, config);
        representativeFiles = response.data.filter((s) => { return /jpg$/gi.test(s) || /jpeg$/gi.test(s) || /png$/gi.test(s) || /pdf$/gi.test(s) }).map((s) => { return scpPath + representativeFolderPath + "/" + desid + "/" + s });
        for (let downloadPath of representativeFiles) {
          thisFileName = downloadPath.split("/")[downloadPath.split("/").length - 1];
          thisFilePureName = thisFileName.split(".")[0];
          thisFileExe = thisFileName.split(".")[thisFileName.split(".").length - 1];
          thisFilePath = thisFolderPath + thisFileName;
          if (!thisFolderContents_past.map((o) => { return new RegExp(o.pure, "g") }).some((r) => { return r.test(thisFilePureName) })) {
            await shellExec("scp", [ downloadPath, thisFolderPath ]);
            if (/pdf/gi.test(thisFileExe)) {
              try {
                await imageReader.pdfToJpg(thisFilePath, true);
              } catch {}
            }
            console.log("download", downloadPath);
            await sleep(500);
          }
        }

        // works files
        worksFilesTargets = worksFiles.filter((o) => { return o.desid === desid });
        worksFilesTargets = worksFilesTargets.map((o) => { return scpRoot + o.file });
        for (let downloadPath of worksFilesTargets) {
          thisFileName = downloadPath.split("/")[downloadPath.split("/").length - 1];
          thisFilePureName = thisFileName.split(".")[0];
          thisFileExe = thisFileName.split(".")[thisFileName.split(".").length - 1];
          thisFilePath = thisFolderPath + thisFileName;
          if (!thisFolderContents_past.map((o) => { return new RegExp(o.pure, "g") }).some((r) => { return r.test(thisFilePureName) })) {
            await shellExec("scp", [ downloadPath, thisFolderPath ]);
            if (/pdf/gi.test(thisFileExe)) {
              try {
                await imageReader.pdfToJpg(thisFilePath, true);
              } catch {}
            }
            console.log("download", downloadPath);
            await sleep(500);
          }
        }

        thisFolderContents = await fileSystem(`readFolder`, [ thisFolderPath ]);
        thisFolderContents = thisFolderContents.map((s) => {
          let arr, dateString;
          let newString;
          let thisDate;
          let pastBoo;
          newString = "";
          if ((new RegExp(indexToken, "gi")).test(s)) {
            newString = s.split(indexToken)[1];
            if (/__split__/gi.test(s)) {
              arr = newString.split("__split__")
              dateString = arr[2];
            } else {
              arr = newString.split("_")
              dateString = arr[1];
            }
            pastBoo = true;
          } else {
            if (/__split__/gi.test(s)) {
              arr = s.split("__split__")
              dateString = arr[2];
            } else {
              arr = s.split("_")
              dateString = arr[1];
            }
            pastBoo = false;
          }
          thisDate = new Date(Number(dateString.replace(/[^0-9]/gi, '')));
          return {
            original: s,
            past: pastBoo,
            fileName: pastBoo ? newString : s,
            date: thisDate,
          }
        })
        thisFolderContents.sort((a, b) => { return a.date.valueOf() - b.date.valueOf() });
        thisFolderContents = thisFolderContents.map((obj, index) => {
          obj.index = index;
          return obj;
        });
        for (let obj of thisFolderContents) {
          if (thisFolderPath + obj.original !== thisFolderPath + String(obj.index) + indexToken + obj.fileName) {
            await shellExec("mv", [ thisFolderPath + obj.original, thisFolderPath + String(obj.index) + indexToken + obj.fileName ]);
          }
        }

        console.log(desid, designer.designer, "sync success");
        await sleep(1000);
      }

      return true;
    } catch (e) {
      logger.error("Static lounge 서버 문제 생김 (rou_post_syncDesignProposal): " + e.message).catch((err) => { console.log(err) });
      console.log(e);
      return false;
    }
  }
  let obj;
  obj = {};
  obj.link = [ "/syncDesignProposal" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const selfMongo = instance.mongo;
      downloadDesignProposal(selfMongo, logger).then((boo) => {
        if (boo) {
          return logger.cron("sync design proposal success : " + JSON.stringify(new Date()));
        } else {
          return logger.alert("sync design proposal fail");
        }
      }).catch((err) => {
        logger.error("Static lounge 서버 문제 생김 (rou_post_syncDesignProposal): " + err.message).catch((err) => { console.log(err) });
      });
      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      await logger.error("Static lounge 서버 문제 생김 (rou_post_syncDesignProposal): " + e.message);
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_listDesignProposal = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const { equalJson, dateToString, stringToDate, requestSystem, mysqlQuery, sleep, fileSystem, objectDeepCopy, shellExec, shellLink, linkToString } = this.mother;
  const { staticConst } = this;
  let obj;
  obj = {};
  obj.link = [ "/listDesignProposal" ];
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
      const { mode } = req.body;
      const targetPath = "/designProposal/image";
      const targetRoot = staticConst + targetPath;
      let rows;
      let resultObj;
      let targetDesidArr;

      if (mode === "pick" || mode === "get") {
        const { desid } = equalJson(req.body);
        if (!(await fileSystem("exist", [ targetRoot + "/" + desid ]))) {
          res.send(JSON.stringify({ data: [] }));
        } else {
          rows = await fileSystem("readFolder", [ targetRoot + "/" + desid ]);
          rows = rows.map((str) => { return linkToString(`${targetPath}/${desid}/${str}`) });
          res.send(JSON.stringify({ data: objectDeepCopy(rows) }));
        }

      } else if (mode === "all") {

        resultObj = {};
        targetDesidArr = await fileSystem("readFolder", [ targetRoot ]);

        for (let desid of targetDesidArr) {
          resultObj[desid] = [];
          rows = await fileSystem("readFolder", [ targetRoot + "/" + desid ]);
          rows = rows.map((str) => { return linkToString(`${targetPath}/${str}`) });
          resultObj[desid] = objectDeepCopy(rows);
        }

        res.send(JSON.stringify({ data: resultObj }));

      } else {
        throw new Error("invalid post");
      }
    } catch (e) {
      await logger.error("Static lounge 서버 문제 생김 (rou_post_listDesignProposal): " + e.message);
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_imageTransfer = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const human = this.human;
  const kakao = this.kakao;
  const { equalJson, dateToString, stringToDate, requestSystem, mysqlQuery, sleep, fileSystem, shellExec, shellLink, linkToString, uniqueValue } = this.mother;
  const { staticConst, sambaToken } = this;
  let obj;
  obj = {};
  obj.link = [ "/imageTransfer" ];
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
      const { mode } = req.body;
      const collection = "imageTransfer";
      const selfCoreMongo = instance.mongo;
      const selfMongo = instance.mongolocal;
      const idKeyword = "image_trans_";
      let json;
      let thisId;
      let now;
      let imagesArr;
      let thisPath;
      let finalPath;
      let thisDesigner, thisClient, thisMember;
      let tempObj;
      let thisSrc, finalSrc;
      let rows;
      let targetJson;
      let client;
      let purpose;
      let host;
      let path;
      let cliid;
      let historyArr;
      let proidArr;
      let designer, type;

      if (mode === "store") {
        if (req.body.cliid === undefined || req.body.desid === undefined || req.body.info === undefined || req.body.purpose === undefined || req.body.description === undefined || req.body.member === undefined || req.body.images === undefined) {
          throw new Error("invalid post 2");
        }
        const { cliid, purpose, description, member, images, desid, info } = equalJson(req.body);

        now = new Date();
        thisId = idKeyword + String(now.valueOf()) + "_" + uniqueValue("hex");

        imagesArr = [];
        for (let { absolute: rawPath, src: rawSrc } of images) {
          thisPath = rawPath.replace(/^\//i, '').replace(/\/$/i, '');
          if (thisPath.trim() === '') {
            finalPath = sambaToken;
          } else {
            finalPath = thisPath;
          }
          if (!/^__/.test(finalPath)) {
            finalPath = sambaToken + "/" + finalPath;
          }

          thisSrc = rawSrc.replace(/^\//i, '').replace(/\/$/i, '');
          if (thisSrc.trim() === '') {
            finalSrc = sambaToken;
          } else {
            finalSrc = thisSrc;
          }
          if (!/^__/.test(finalSrc)) {
            finalSrc = sambaToken + "/" + finalSrc;
          }

          if (/mobile\/mo/gi.test(finalSrc)) {
            imagesArr.push({
              original: finalPath.replace(new RegExp(sambaToken, "gi"), ""),
              source: finalSrc.replace(/mobile\/mo/gi, "").replace(new RegExp(sambaToken, "gi"), ""),
              link: finalSrc.replace(new RegExp(sambaToken, "gi"), ""),
            });
          } else {
            imagesArr.push({
              original: finalPath.replace(new RegExp(sambaToken, "gi"), ""),
              source: finalSrc.replace(new RegExp(sambaToken, "gi"), ""),
              link: finalSrc.replace(new RegExp(sambaToken, "gi"), ""),
            });
          }
        }

        thisMember = instance.members.find((o) => { return o.id === member });
        if (thisMember === undefined) {
          thisMember = {
            id: member,
            name: "리에종",
            title: "봇",
            roles: [],
          }
        } else {
          tempObj = {
            id: member,
            name: thisMember.name,
            title: thisMember.title,
            roles: thisMember.roles,
          };
          thisMember = equalJson(JSON.stringify(tempObj));
        }

        if (desid === "") {
          thisDesigner = {
            desid: desid,
            designer: "",
            phone: "",
          };
        } else {
          tempObj = await back.getDesignerById(desid, { selfMongo: selfCoreMongo });
          if (tempObj !== null) {
            thisDesigner = {
              desid: desid,
              designer: tempObj.designer,
              phone: tempObj.information.phone,
            }
          } else {
            thisDesigner = {
              desid: desid,
              designer: "",
              phone: "",
            };
          }
        }

        if (cliid === "") {
          throw new Error("invalid cliid 0");
        }
        tempObj = await back.getClientById(cliid, { selfMongo: selfCoreMongo });
        if (tempObj === null) {
          throw new Error("invalid cliid 1");
        }
        thisClient = {
          cliid: cliid,
          name: tempObj.name,
          phone: tempObj.phone,
        }

        proidArr = [];
        if (typeof req.body.proid === "string") {
          proidArr.push(req.body.proid);
        }

        json = {
          id: thisId,
          date: now,
          from: thisMember,
          target: thisClient,
          contents: {
            designer: thisDesigner,
            purpose,
            description,
            info,
          },
          images: imagesArr,
          history: [],
          proposals: proidArr,
        };

        await back.mongoCreate(collection, json, { selfMongo });

        res.send(JSON.stringify({ id: thisId }));

      } else if (mode === "copy") {

        const { cliid, id, purpose, description, member } = equalJson(req.body);
        [ targetJson ] = await back.mongoRead(collection, { id }, { selfMongo });

        now = new Date();
        thisId = idKeyword + String(now.valueOf()) + "_" + uniqueValue("hex");

        imagesArr = equalJson(JSON.stringify(targetJson.images))

        thisMember = instance.members.find((o) => { return o.id === member });
        if (thisMember === undefined) {
          thisMember = {
            id: member,
            name: "리에종",
            title: "봇",
            roles: [],
          }
        } else {
          tempObj = {
            id: member,
            name: thisMember.name,
            title: thisMember.title,
            roles: thisMember.roles,
          };
          thisMember = equalJson(JSON.stringify(tempObj));
        }

        if (cliid === "") {
          throw new Error("invalid cliid 0");
        }
        tempObj = await back.getClientById(cliid, { selfMongo: selfCoreMongo });
        if (tempObj === null) {
          throw new Error("invalid cliid 1");
        }
        thisClient = {
          cliid: cliid,
          name: tempObj.name,
          phone: tempObj.phone,
        }

        proidArr = [];
        if (typeof req.body.proid === "string") {
          proidArr.push(req.body.proid);
        }

        json = {
          id: thisId,
          date: now,
          from: thisMember,
          target: thisClient,
          contents: {
            designer: equalJson(JSON.stringify(targetJson.contents.designer)),
            purpose,
            description,
            info: equalJson(JSON.stringify(targetJson.contents.info)),
          },
          images: imagesArr,
          history: [],
          proposals: proidArr,
        };

        await back.mongoCreate(collection, json, { selfMongo });

        res.send(JSON.stringify({ id: thisId }));

      } else if (mode === "get") {

        if (req.body.id === undefined) {
          throw new Error("invalid post");
        }
        const { id, view } = equalJson(req.body);
        rows = await back.mongoRead(collection, { id }, { selfMongo });
        if (rows.length === 1) {
          [ targetJson ] = rows;

          thisDesigner = await back.getDesignerById(targetJson.contents.designer.desid, { selfMongo: selfCoreMongo, toNormal: true });
          thisClient = await back.getClientById(targetJson.target.cliid, { selfMongo: selfCoreMongo, toNormal: true });

          if (view !== 1 && view !== "1") {
            historyArr = equalJson(JSON.stringify(targetJson.history));
            historyArr.unshift({
              action: "view",
              date: new Date(),
            });
            await back.mongoUpdate(collection, [ { id }, { history: historyArr } ], { selfMongo });
            targetJson.history = historyArr;
          }

          res.send(JSON.stringify({
            data: targetJson,
            client: thisClient,
            designer: thisDesigner,
          }));
        } else {
          throw new Error("invalid id");
        }

      } else if (mode === "list") {

        if (req.body.whereQuery === undefined) {
          throw new Error("invalid post");
        }
        const { whereQuery } = equalJson(req.body);
        rows = await back.mongoRead(collection, whereQuery, { selfMongo });
        res.send(JSON.stringify({
          data: rows,
        }));

      } else if (mode === "proposal") {

        if (req.body.proid === undefined) {
          throw new Error("invalid post");
        }
        const { proid } = equalJson(req.body);
        rows = await back.mongoRead(collection, { proposals: { $elemMatch: { $regex: proid } } }, { selfMongo });
        res.send(JSON.stringify(rows));

      } else if (mode === "send") {

        if (req.body.id === undefined) {
          throw new Error("invalid post");
        }
        const { id } = equalJson(req.body);
        rows = await back.mongoRead(collection, { id }, { selfMongo });
        if (rows.length === 1) {
          [ targetJson ] = rows;

          client = targetJson.target.name;
          designer = targetJson.contents.designer.designer;
          purpose = targetJson.contents.designer.designer + " " + targetJson.contents.purpose;
          host = address.frontinfo.host;
          path = "transfer";
          cliid = targetJson.target.cliid;
          type = (/포트폴리오/gi.test(targetJson.contents.purpose) ? "포트폴리오" : (/제안/gi.test(targetJson.contents.purpose) ? "디자인 제안" : targetJson.contents.purpose));

          historyArr = equalJson(JSON.stringify(targetJson.history));
          historyArr.unshift({
            action: "send",
            date: new Date(),
          });
          await back.mongoUpdate(collection, [ { id }, { history: historyArr } ], { selfMongo });

          kakao.sendTalk("imageTransfer", client, targetJson.target.phone, {
            client,
            designer,
            type,
            purpose,
            host,
            path,
            cliid,
            id,
          }).catch((e) => { console.log(e); });

          res.send(JSON.stringify({ message: "done" }));

        } else {
          throw new Error("invalid id");
        }

      } else {
        throw new Error("invalid mode");
      }

    } catch (e) {
      await logger.error("Static lounge 서버 문제 생김 (rou_post_imageTransfer): " + e.message);
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_metaAccountCheck = function () {
  const instance = this;
  const facebook = this.facebook;
  const { equalJson, dateToString, stringToDate, requestSystem, mysqlQuery, sleep, fileSystem, shellExec, shellLink, linkToString, uniqueValue } = this.mother;
  let obj;
  obj = {};
  obj.link = [ "/metaAccountCheck" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const boo = await facebook.accountStatusCheck(logger);
      if (!boo) {
        throw new Error("meta account error");
      }
      res.send(JSON.stringify({ message: "done" }));
    } catch (e) {
      await logger.error("Static lounge 서버 문제 생김 (rou_post_metaAccountCheck): " + e.message);
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_orderPhotoSync = function () {
  const instance = this;
  const { staticConst } = this;
  const address = this.address;
  const { equalJson, dateToString, ghostFileUpload, stringToDate, requestSystem, mysqlQuery, sleep, fileSystem, shellExec, shellLink, linkToString, uniqueValue } = this.mother;
  let obj;
  obj = {};
  obj.link = [ "/orderPhotoSync" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const { pid, data } = equalJson(req.body);
      const corePortfolio = staticConst + "/corePortfolio";
      const listImageDesktop = corePortfolio + "/" + "listImage" + "/" + pid;
      const listImageMobile = corePortfolio + "/" + "listImage" + "/" + pid + "/mobile";
      const original = corePortfolio + "/" + "original" + "/" + pid;
      const tempDir = process.env.HOME + "/temp" + uniqueValue("hex");
      const serverFolderPath = "corePortfolio/listImage";
      const serverFolderPathOriginal = "corePortfolio/original";
      let fromArr, toArr;
      let originalList;
      let outputFolderList;
      let outputMobildFolderList;
      let numbers, num;

      numbers = [];
      for (let { fromIndex, toIndex } of data) {
        await shellExec("cp", [ (original + "/i" + String(fromIndex) + pid + ".jpg"), (original + "/middle_i" + String(toIndex) + pid + ".jpg") ]);
        await shellExec("cp", [ (listImageDesktop + "/t" + String(fromIndex) + pid + ".jpg"), (listImageDesktop + "/middle_t" + String(toIndex) + pid + ".jpg") ]);
        await shellExec("cp", [ (listImageMobile + "/mot" + String(fromIndex) + pid + ".jpg"), (listImageMobile + "/middle_mot" + String(toIndex) + pid + ".jpg") ]);
        numbers.push(toIndex);
      }
      for (let toIndex of numbers) {
        await shellExec("mv", [ (original + "/middle_i" + String(toIndex) + pid + ".jpg"), (original + "/i" + String(toIndex) + pid + ".jpg") ]);
        await shellExec("mv", [ (listImageDesktop + "/middle_t" + String(toIndex) + pid + ".jpg"), (listImageDesktop + "/t" + String(toIndex) + pid + ".jpg") ]);
        await shellExec("mv", [ (listImageMobile + "/middle_mot" + String(toIndex) + pid + ".jpg"), (listImageMobile + "/mot" + String(toIndex) + pid + ".jpg") ]);
      }
      await shellExec("mkdir", [ tempDir ]);
      await shellExec("cp", [ "-r", listImageDesktop, tempDir + "/" ]);
      await shellExec("mv", [ tempDir + "/" + pid, tempDir + "/portp" + pid ]);
      await shellExec(`cp -r ${shellLink(tempDir + "/portp" + pid)} /home/ubuntu/samba/list_image/`);
      await shellExec("rm", [ "-rf", tempDir ]);

      fromArr = [];
      toArr = [];
      originalList = await fileSystem(`readFolder`, [ original ]);
      outputFolderList = await fileSystem(`readFolder`, [ listImageDesktop ]);
      outputMobildFolderList = await fileSystem(`readFolder`, [ listImageMobile ]);
      
      for (let i of originalList) {
        if (i !== `.DS_Store`) {
          fromArr.push(original + "/" + i);
          toArr.push(`${serverFolderPathOriginal}/${pid}/${i}`);
        }
      }
      for (let i of outputFolderList) {
        if (i !== `.DS_Store` && /^[bt]/.test(i)) {
          fromArr.push(listImageDesktop + "/" + i);
          toArr.push(`${serverFolderPath}/${pid}/${i}`);
        }
      }
      for (let i of outputMobildFolderList) {
        if (i !== `.DS_Store`) {
          fromArr.push(listImageMobile + "/" + i);
          toArr.push(`${serverFolderPath}/${pid}/mobile/${i}`);
        }
      }

      await ghostFileUpload(fromArr, toArr);

      res.send(JSON.stringify({ message: "done" }));
    } catch (e) {
      await logger.error("Static lounge 서버 문제 생김 (rou_post_orderPhotoSync): " + e.message);
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_rawToRaw = function () {
  const instance = this;
  const address = this.address;
  const { fileSystem, shellExec, shellLink, sleep, requestSystem } = this.mother;
  const { portfolioConst } = this;
  const hangul = this.hangul;
  const image = this.imageReader;
  let obj;
  obj = {};
  obj.link = [ "/rawToRaw" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const form = instance.formidable({ multiples: true, encoding: "utf-8", maxFileSize: (9000 * 1024 * 1024) });
      form.parse(req, async function (err, fields, files) {
        try {
          if (err) {
            throw new Error(err);
          } else {
            const toArr = JSON.parse(fields.toArr).map((path) => { return hangul.fixString(path); });
            let filesKey, fromArr, num;
            let tempArr, tempString, tempDir;
            let thisFileName;
            let thisFileExe;
            let targetFileName;
            let designer, client;

            filesKey = Object.keys(files);
            filesKey.sort((a, b) => {
              return Number(a.replace(/[^0-9]/gi, '')) - Number(b.replace(/[^0-9]/gi, ''));
            });

            fromArr = [];
            for (let key of filesKey) {
              fromArr.push(files[key]);
            }
            await shellExec("rm", [ "-rf", portfolioConst ]);
            await shellExec("mkdir", [ portfolioConst ]);

            designer = fields.designer;
            if (fields.client === undefined || fields.client === null) {
              client = null;
            } else {
              client = fields.client;
            }

            (async () => {
              num = 0;
              for (let { filepath: path } of fromArr) {
                tempArr = toArr[num].split("/");
                thisFileName = tempArr[tempArr.length - 1];
                thisFileExe = thisFileName.split(".")[thisFileName.split(".").length - 1];
                tempString = portfolioConst;
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
  
                targetFileName = tempString + "/" + toArr[num].replace(/^\//i, '');
                await shellExec(`mv ${shellLink(path)} ${shellLink(targetFileName)}`);
                await image.overOfficialImage(targetFileName);
                num++;
              }

              await requestSystem("https://" + address.officeinfo.ghost.host + ":" + String(3000) + "/rawToRawExcute", {
                designer, client
              }, { headers: { "Content-Type": "application/json" } });

            })().catch((err) => { logger.error("Static lounge 서버 문제 생김 (rou_post_rawToRaw): " + err.message).catch((e) => { console.log(e); }); })

            res.send(JSON.stringify({ "message": "will do" }));
          }
        } catch (e) {
          logger.error("Static lounge 서버 문제 생김 (rou_post_rawToRaw): " + e.message).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
        }
      });
    } catch (e) {
      logger.error("Static lounge 서버 문제 생김 (rou_post_rawToRaw): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_rawToRawExcute = function () {
  const instance = this;
  const { equalJson, dateToString, messageSend, stringToDate, objectDeepCopy, requestSystem, mysqlQuery, sleep, fileSystem, shellExec, shellLink, linkToString, uniqueValue } = this.mother;
  const ROBOT_PATH = process.cwd();
  const APP_PATH = ROBOT_PATH + "/apps";
  const PortfolioFilter = require(APP_PATH + "/portfolioFilter/portfolioFilter.js");
  const filter = new PortfolioFilter();
  let obj;
  obj = {};
  obj.link = [ "/rawToRawExcute" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.requestArr === undefined) {
        if (req.body.designer === undefined) {
          throw new Error("invalid post");
        }
        const channel = "#502_sns_contents";
        const voice = false;
        const { designer: designerRaw } = equalJson(req.body);
        let client, designer, pay;
        let thisSetName;

        client = ((typeof req.body.client === "string" && req.body.client !== "null") ? req.body.client.trim() : null);
        designer = designerRaw.trim();
        pay = true;

        if (client !== null) {
          thisSetName = `${client} C, ${designer} D 현장 원본 사진`;
        } else {
          thisSetName = `${designer} D 개인 포트폴리오 사진`;
        }

        await messageSend({ text: thisSetName + " 처리를 시작합니다. 슬렉에 처리 성공 또는 실패 알림이 올 때까지 다음 원본 사진 처리요청을 하지 말아주세요!", channel, voice });
        filter.rawToRaw([
          {
            client,
            designer,
            pay
          }
        ]).then((boo) => {
          if (boo) {
            return messageSend({ text: thisSetName + " 처리를 성공적으로 완료하였어요!", channel, voice });
          } else {
            return messageSend({ text: thisSetName + " 처리에 실패하였어요, 다시 시도해주세요!", channel, voice });
          }
        }).catch((err) => {
          logger.error("Static lounge 서버 문제 생김 (rou_post_rawToRaw): " + err.message).catch((e) => { console.log(e); })
        });
      } else {
        const requestArr = equalJson(req.body.requestArr);
        let client, designer, pay;
        let tong;

        tong = [];
        for (let obj of requestArr) {
          client = obj.client;
          deisnger = obj.deisnger;
          pay = true;
          tong.push(objectDeepCopy({
            client,
            deisnger,
            pay
          }));
        }

        filter.rawToRaw([
          {
            client,
            deisnger,
            pay
          }
        ]).catch((err) => {
          logger.error("Static lounge 서버 문제 생김 (rou_post_rawToRawExcute): " + err.message).catch((e) => { console.log(e); })
        });
      }
      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      await logger.error("Static lounge 서버 문제 생김 (rou_post_rawToRawExcute): " + e.message);
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_updateRawInfo = function () {
  const instance = this;
  const { equalJson, dateToString, messageSend, stringToDate, objectDeepCopy, requestSystem, mysqlQuery, sleep, fileSystem, shellExec, shellLink, linkToString, uniqueValue } = this.mother;
  const ROBOT_PATH = process.cwd();
  const APP_PATH = ROBOT_PATH + "/apps";
  const PortfolioFilter = require(APP_PATH + "/portfolioFilter/portfolioFilter.js");
  const filter = new PortfolioFilter();
  const { staticConst, portfolioConst } = this;
  const back = this.back;
  let obj;
  obj = {};
  obj.link = [ "/updateRawInfo" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const rawToRawProcessDoingToken = process.env.HOME + "/" + "__rawToRawProcessDoingToken__.token";
      const selfMongo = instance.mongo;
      const channel = "#502_sns_contents";
      const voice = false;
      let client, designer, project;
      let thisSetName;
      let keyFolderList;
      let keyFolder;
      let nowValue;

      if (await fileSystem("exist", [ rawToRawProcessDoingToken ])) {
        const { key } = equalJson(req.body);
        keyFolder = `${staticConst}/temp/${key}`;
        await sleep(500);
        await shellExec("rm", [ "-rf", keyFolder ]);
        await messageSend({ text: "다른 원본 사진 처리가 진행중입니다. 끝날 때까지 기다려주세요!", channel, voice });
        res.send(JSON.stringify({ message: "will do" }));
      } else {

        await fileSystem("writeString", [ rawToRawProcessDoingToken, "doing" ]);
        if (req.body.designer !== undefined && req.body.individual === "true") {
  
          const { key, designer, desid, rawBody } = equalJson(req.body);
  
          keyFolder = `${staticConst}/temp/${key}`;
          thisSetName = `${designer} D 개인 포트폴리오 원본 사진`;
    
          nowValue = dateToString(new Date(), true).replace(/[^0-9]/gi, '');
  
          await requestSystem("https://" + instance.address.secondinfo.host + ":3000/projectDesignerRaw", {
            mode: "update",
            desid: desid,
            proid: "individual_" + nowValue,
            cliid: "individual_" + nowValue,
            type: "web",
            body: rawBody.trim(),
          }, {
            headers: { "Content-Type": "application/json" },
          });
    
          await shellExec("rm", [ "-rf", portfolioConst ]);
          await shellExec("mkdir", [ portfolioConst ]);
          keyFolderList = await fileSystem("readFolder", [ keyFolder ]);
          for (let photoName of keyFolderList) {
            if (/\.jp[e]?g$/gi.test(photoName)) {
              await shellExec("mv", [ keyFolder + "/" + photoName, portfolioConst + "/" ]);
            }
          }
          await sleep(500);
          await shellExec("rm", [ "-rf", keyFolder ]);
          await messageSend({ text: thisSetName + " 처리를 시작합니다. 슬렉에 처리 성공 또는 실패 알림이 올 때까지 다음 원본 사진 처리요청을 하지 말아주세요!", channel, voice });
          filter.rawToRaw([
            {
              desid,
              individual: true,
            }
          ]).then((pid) => {
            if (typeof pid === "string") {
              return requestSystem("https://" + instance.address.officeinfo.ghost.host + ":3000/rawUpdateSubject", {
                pid,
                individual: ("individual_" + nowValue),
              }, { headers: { "Content-Type": "application/json" } });
            } else {
              return messageSend({ text: thisSetName + " 처리에 실패하였어요, 다시 시도해주세요!", channel, voice });
            }
          }).then(() => {
            return sleep(60 * 1000 * 3);
          }).then(() => {
            return shellExec("rm", [ "-rf", rawToRawProcessDoingToken ]);
          }).then(() => {
            return filter.chmodReload();
          }).catch((err) => {
            logger.error("Static lounge 서버 문제 생김 (rou_post_updateRawInfo): " + err.message).catch((e) => { console.log(e); })
          });
    
          res.send(JSON.stringify({ message: "will do" }));
  
        } else {
  
          const { key, proid, desid, cliid, rawBody } = equalJson(req.body);
  
          keyFolder = `${staticConst}/temp/${key}`;
  
          [ client ] = await back.mongoRead("client", { cliid }, { selfMongo });
          [ designer ] = await back.mongoRead("designer", { desid }, { selfMongo });
          [ project ] =  await back.mongoRead("project", { proid }, { selfMongo });
          thisSetName = `${client.name} C, ${designer.designer} D 현장 원본 사진`;
  
          await requestSystem("https://" + instance.address.secondinfo.host + ":3000/projectDesignerRaw", {
            mode: "update",
            desid: designer.desid,
            proid: project.proid,
            cliid: client.cliid,
            type: "web",
            body: rawBody.trim(),
          }, {
            headers: { "Content-Type": "application/json" },
          });
  
          await shellExec("rm", [ "-rf", portfolioConst ]);
          await shellExec("mkdir", [ portfolioConst ]);
          keyFolderList = await fileSystem("readFolder", [ keyFolder ]);
          for (let photoName of keyFolderList) {
            if (/\.jp[e]?g$/gi.test(photoName)) {
              await shellExec("mv", [ keyFolder + "/" + photoName, portfolioConst + "/" ]);
            }
          }
          await sleep(500);
          await shellExec("rm", [ "-rf", keyFolder ]);
          await messageSend({ text: thisSetName + " 처리를 시작합니다. 슬렉에 처리 성공 또는 실패 알림이 올 때까지 다음 원본 사진 처리요청을 하지 말아주세요!", channel, voice });
          filter.rawToRaw([
            {
              cliid,
              desid,
              proid,
            }
          ]).then((pid) => {
            if (typeof pid === "string") {
              return requestSystem("https://" + instance.address.officeinfo.ghost.host + ":3000/rawUpdateSubject", {
                pid
              }, { headers: { "Content-Type": "application/json" } });
            } else {
              return messageSend({ text: thisSetName + " 처리에 실패하였어요, 다시 시도해주세요!", channel, voice });
            }
          }).then(() => {
            return sleep(60 * 1000 * 3);
          }).then(() => {
            return shellExec("rm", [ "-rf", rawToRawProcessDoingToken ]);
          }).then(() => {
            return filter.chmodReload();
          }).catch((err) => {
            logger.error("Static lounge 서버 문제 생김 (rou_post_updateRawInfo): " + err.message).catch((e) => { console.log(e); })
          });
  
          res.send(JSON.stringify({ message: "will do" }));
  
        }

      }
    } catch (e) {
      await logger.error("Static lounge 서버 문제 생김 (rou_post_updateRawInfo): " + e.message);
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_rawUpdateSubject = function () {
  const instance = this;
  const { equalJson, dateToString, messageSend, stringToDate, objectDeepCopy, requestSystem, mysqlQuery, sleep, fileSystem, shellExec, shellLink, linkToString, uniqueValue } = this.mother;
  const ROBOT_PATH = process.cwd();
  const APP_PATH = ROBOT_PATH + "/apps";
  const PortfolioFilter = require(APP_PATH + "/portfolioFilter/portfolioFilter.js");
  const filter = new PortfolioFilter();
  let obj;
  obj = {};
  obj.link = [ "/rawUpdateSubject" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.pid === undefined) {
        throw new Error("invalid post");
      }
      const channel = "#502_sns_contents";
      const voice = false;
      const { pid } = equalJson(req.body);
      let individualKey;

      individualKey = null;
      if (req.body.individual !== undefined) {
        individualKey = req.body.individual;
      }

      filter.updateSubject(pid, individualKey).then((boo) => {
        if (boo) {
          return messageSend({ text: pid + " update subject 성공", channel, voice });
        } else {
          return messageSend({ text: pid + " update subject 실패", channel, voice });
        }
      }).then(() => {
        return filter.chmodReload();
      }).catch((err) => {
        logger.error("Static lounge 서버 문제 생김 (rou_post_rawUpdateSubject): " + err.message).catch((e) => { console.log(e); })
      });

      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      await logger.error("Static lounge 서버 문제 생김 (rou_post_rawUpdateSubject): " + e.message);
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_rawToContents = function () {
  const instance = this;
  const { equalJson, dateToString, messageSend, stringToDate, objectDeepCopy, requestSystem, mysqlQuery, sleep, fileSystem, shellExec, shellLink, linkToString, uniqueValue } = this.mother;
  const ROBOT_PATH = process.cwd();
  const APP_PATH = ROBOT_PATH + "/apps";
  const PortfolioFilter = require(APP_PATH + "/portfolioFilter/portfolioFilter.js");
  const filter = new PortfolioFilter();
  let obj;
  obj = {};
  obj.link = [ "/rawToContents" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.pid === undefined) {
        throw new Error("invalid post");
      }
      const channel = "#502_sns_contents";
      const voice = false;
      const { pid } = equalJson(req.body);

      filter.rawToContents(pid, false, (req.body.proid === undefined ? null : req.body.proid)).then((desid) => {
        if (typeof desid === "string") {
          return filter.setDesignerSetting(desid, pid);
        } else {
          return messageSend({ text: pid + " 컨텐츠 자동 발행에 실패하였어요, 다시 시도해주세요!", channel, voice });
        }
      }).then((boo) => {
        if (boo) {
          return messageSend({ text: pid + " 컨텐츠 자동 발행에 성공하였어요!", channel, voice });
        } else {
          return messageSend({ text: pid + " 컨텐츠 자동 발행에 실패하였어요, 다시 시도해주세요!", channel, voice });
        }
      }).then(() => {
        return filter.chmodReload();
      }).catch((err) => {
        logger.error("Static lounge 서버 문제 생김 (rou_post_rawToContents): " + err.message).catch((e) => { console.log(e); })
      });
      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      await logger.error("Static lounge 서버 문제 생김 (rou_post_rawToContents): " + e.message);
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_rawRepairOrder = function () {
  const instance = this;
  const { equalJson, dateToString, messageSend, stringToDate, objectDeepCopy, requestSystem, mysqlQuery, sleep, fileSystem, shellExec, shellLink, linkToString, uniqueValue } = this.mother;
  const ROBOT_PATH = process.cwd();
  const APP_PATH = ROBOT_PATH + "/apps";
  const PortfolioFilter = require(APP_PATH + "/portfolioFilter/portfolioFilter.js");
  const filter = new PortfolioFilter();
  let obj;
  obj = {};
  obj.link = [ "/rawRepairOrder" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.pid === undefined) {
        throw new Error("invalid post");
      }
      const channel = "#502_sns_contents";
      const voice = false;
      const { pid } = equalJson(req.body);

      filter.rawToContents(pid, true, (req.body.proid === undefined ? null : req.body.proid)).then((boo) => {
        if (boo) {
          return messageSend({ text: pid + " 컨텐츠 순서 조정에 성공하였어요!", channel, voice });
        } else {
          return messageSend({ text: pid + " 컨텐츠 순서 조정에 실패하였어요, 다시 시도해주세요!", channel, voice });
        }
      }).catch((err) => {
        logger.error("Static lounge 서버 문제 생김 (rou_post_rawRepairOrder): " + err.message).catch((e) => { console.log(e); })
      });
      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      await logger.error("Static lounge 서버 문제 생김 (rou_post_rawRepairOrder): " + e.message);
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_syncEvaluationContents = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const { equalJson, objectDeepCopy, jsonToString, requestSystem } = this.mother;
  const collection = "contents";
  const evaluationCollection = "clientEvaluation";
  const titleSamples = [
    "전문가를 이용하는 것이, 확실히 편한 것 같아요.",
    "진짜 커스터마이징 된, 인테리어를 받을 수 있었어요.",
    "디자이너님 덕분에, 시간을 아낄 수 있었어요.",
    "맞춤형 디자인을 받으니, 집이 완전히 달라졌어요.",
    "디자이너님의 도움으로, 인테리어 과정이 순조로웠어요.",
    "직접 하려고 했다면, 이런 결과를 얻지 못했을 거예요.",
    "맞춤형 서비스로 스타일을, 완벽하게 구현했어요.",
    "디자이너님과 함께라면, 인테리어 두렵지 않아요.",
    "전문가의 섬세한 손길이, 공간마다 느껴져요.",
    "커스터마이징 솔루션 덕분에, 공간이 최적화되었어요.",
    "디자이너와 작업하는 과정이, 즐겁고 편안했어요.",
    "꼼꼼한 디자인으로 집안의, 분위기가 바뀌었어요.",
    "디자이너님 덕분에 인테리어, 과정이 즐거웠어요.",
    "맞춤형 접근 덕분에, 집 안이 완전히 바뀌었어요.",
    "처음엔 부담스러웠지만, 과정과 결과 모두 만족스러워요.",
    "디자이너와 함께 하며, 새로운 시각이 생겼어요.",
    "맞춤형 디자인 덕분에, 우리 집이 더 특별해졌어요.",
    "디자이너와 함께라서, 순조롭게 진행되었어요.",
    "디자이너의 제안으로, 시간 낭비를 피할 수 있었어요.",
    "확실히 인테리어에서, 질적인 차이를 느낄 수 있어요.",
    "작업이 초기 예상보다, 시간을 크게 단축시켰어요.",
    "디자이너님의 의견을, 듣는 것이 결정적이었어요.",
    "꿈에 그리던 공간을, 만들 수 있었어요.",
    "혼자 생각하던 것 이상의, 결과물을 얻을 수 있었어요.",
    "디자이너님 덕분에, 선택에서 안심할 수 있었어요",
    "커스터마이징으로 우리, 집만의 매력을 살렸어요.",
    "내 생각을 정확히, 반영한 결과물을 얻었어요.",
  ];
  let obj;
  obj = {};
  obj.link = [ "/syncEvaluationContents" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {

      (async () => {
        try {
          const selfMongo = instance.mongo;
          const selfContentsMongo = instance.mongolocal;
          let contentsArr;
          let rows;
          let target;
          let jsonTarget;
          let jsonString;
          let conid;
          let num;
          let whereQuery, updateQuery;
          let contentsProjectQuery;

          contentsProjectQuery = {
            conid: 1,
            desid: 1,
            cliid: 1,
            proid: 1,
            service: 1,
            photos: 1,
            "contents.portfolio.pid": 1,
            "contents.portfolio.date": 1,
            "contents.portfolio.spaceInfo": 1,
            "contents.portfolio.title": 1,
            "contents.portfolio.color": 1,
            "contents.portfolio.detailInfo": 1,
            "contents.review.rid": 1,
            "contents.review.date": 1,
            "contents.review.title": 1,
            "contents.review.detailInfo": 1,
          };

          contentsArr = await back.mongoPick(collection, [ {}, contentsProjectQuery ], { selfMongo });
          contentsArr = contentsArr.filter((o) => { return o.proid !== "" });
          contentsArr = contentsArr.filter((o) => { return /999/gi.test(o.contents.review.rid) })

          rows = await back.mongoRead(evaluationCollection, {
            $or: contentsArr.map((o) => { return { proid: o.proid } }),
          }, { selfMongo: selfContentsMongo });

          num = 0;
          for (let contents of contentsArr) {
            target = rows.find((o) => { return o.proid === contents.proid }) === undefined ? null : rows.find((o) => { return o.proid === contents.proid });
            if (target !== null) {

              jsonTarget = objectDeepCopy(target);
              jsonString = jsonToString(jsonTarget);

              conid = contents.conid;

              whereQuery = { conid };
              updateQuery = {};

              updateQuery["contents.review.title.main"] = titleSamples[num % titleSamples.length];
              updateQuery["contents.review.title.sub"] = titleSamples[num % titleSamples.length];
              updateQuery["contents.review.contents.detail"] = [
                {
                  type: "init",
                  photos: [],
                  contents: [
                    {
                      question: "",
                      answer: jsonString,
                    }
                  ]
                }
              ];

              if (contents.contents.review.detailInfo.order <= 1000) {
                updateQuery["contents.review.detailInfo.order"] = Math.round((Number(contents.contents.portfolio.pid.replace(/[^0-9]/gi, '')) * 1000000 / 1000));
              }
              updateQuery["contents.review.detailInfo.photodae"] = objectDeepCopy(contents.contents.portfolio.detailInfo.photodae);

              await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo });

              num++;
            }
          }

          await requestSystem("https://" + address.testinfo.host + ":" + String(3000) + "/frontReflection", { data: null }, { headers: { "Content-Type": "application/json" } });

        } catch (e) {
          console.log(e);
        }
      })().catch((err) => {
        console.log(err);
      })

      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      await logger.error("Static lounge 서버 문제 생김 (rou_post_syncEvaluationContents): " + e.message);
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_updateDesignerProposalRealtime = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const { dateToString, stringToDate, equalJson, objectDeepCopy, sleep, messageSend } = this.mother;
  const sheetsId = "1gJhebKDwnWSPbgvLNQdcuakt4NXc3hgpsXSYIM3ksKE";
  const sheets = this.sheets;
  const proposal = async function (selfMongo, selfConsoleMongo, logger) {
    try {
      const collection = "realtimeDesigner";
      const designers = await back.getDesignersByQuery({}, { selfMongo });
      const projects = await back.getProjectsByQuery({}, { selfMongo });
      const emptyDate = new Date(2000, 0, 1);
      const emptyDateValue = emptyDate.valueOf();
      const monthDelta = 24;
      const forecastDelta = 10;
      let number;
      let designer;
      let desid;
      let targetProposals;
      let targetProjects;
      let totalAmount;
      let totalPayments;
      let startDate, endDate;
      let thisTargetProjects;
      let thisTargetProposals;
      let thisTotalAmount;
      let thisTotalPayments;
      let targetProjects_f, targetProjects_s, targetProjects_t, targetProjects_xt;
      let targetProposals_f, targetProposals_s, targetProposals_t, targetProposals_xt;
      let totalAmount_f, totalAmount_s, totalAmount_t, totalAmount_xt;
      let totalPayments_f, totalPayments_s, totalPayments_t, totalPayments_xt;
      let matrix;
      let tempArr;
      let nowDate;
      let thisTargetProjects_f, thisTargetProjects_s, thisTargetProjects_t, thisTargetProjects_xt;
      let thisTargetProposals_f, thisTargetProposals_s, thisTargetProposals_t, thisTargetProposals_xt;
      let thisTotalAmount_f, thisTotalAmount_s, thisTotalAmount_t, thisTotalAmount_xt;
      let thisTotalPayments_f, thisTotalPayments_s, thisTotalPayments_t, thisTotalPayments_xt;
      let targetRow;
      let realtimeRows;
      let possibleArr;
      let possibleNumbersArr;
      let possibleNumber;
      let thisStart;
      let thisEnd;
      let thisDate;

      matrix = [
        [
          "아이디",
          "디자이너명",
          "협약 상태",
        ]
      ];

      for (let i = 0; i < forecastDelta; i++) {
        nowDate = new Date();
        nowDate.setDate(1);
        nowDate.setMonth(nowDate.getMonth() + i);
        thisDate = new Date(JSON.stringify(nowDate).slice(1, -1));
        matrix[0].push(dateToString(thisDate).split("-").slice(0, -1).join("-") + " 가능수");
      }

      matrix[0] = matrix[0].concat([
        "총 진행",
        "총 추천",
        "총 매출",
        "총 정산",
        "F 진행",
        "F 추천",
        "F 매출",
        "F 정산",
        "S 진행",
        "S 추천",
        "S 매출",
        "S 정산",
        "T 진행",
        "T 추천",
        "T 매출",
        "T 정산",
        "XT 진행",
        "XT 추천",
        "XT 매출",
        "XT 정산",
      ]);

      for (let i = -1; i < monthDelta; i++) {

        nowDate = new Date();
        nowDate.setDate(1);
        nowDate.setMonth(nowDate.getMonth() - 1 - i);
        startDate = new Date(JSON.stringify(nowDate).slice(1, -1));

        nowDate = new Date();
        nowDate.setDate(1);
        nowDate.setMonth(nowDate.getMonth() - 0 - i);
        endDate = new Date(JSON.stringify(nowDate).slice(1, -1));

        matrix[0].push(dateToString(startDate).split("-").slice(0, -1).join("-") + " 총 진행");
        matrix[0].push(dateToString(startDate).split("-").slice(0, -1).join("-") + " 총 추천");
        matrix[0].push(dateToString(startDate).split("-").slice(0, -1).join("-") + " 총 매출");
        matrix[0].push(dateToString(startDate).split("-").slice(0, -1).join("-") + " 총 정산");

        matrix[0].push(dateToString(startDate).split("-").slice(0, -1).join("-") + " F 진행");
        matrix[0].push(dateToString(startDate).split("-").slice(0, -1).join("-") + " F 추천");
        matrix[0].push(dateToString(startDate).split("-").slice(0, -1).join("-") + " F 매출");
        matrix[0].push(dateToString(startDate).split("-").slice(0, -1).join("-") + " F 정산");

        matrix[0].push(dateToString(startDate).split("-").slice(0, -1).join("-") + " S 진행");
        matrix[0].push(dateToString(startDate).split("-").slice(0, -1).join("-") + " S 추천");
        matrix[0].push(dateToString(startDate).split("-").slice(0, -1).join("-") + " S 매출");
        matrix[0].push(dateToString(startDate).split("-").slice(0, -1).join("-") + " S 정산");

        matrix[0].push(dateToString(startDate).split("-").slice(0, -1).join("-") + " T 진행");
        matrix[0].push(dateToString(startDate).split("-").slice(0, -1).join("-") + " T 추천");
        matrix[0].push(dateToString(startDate).split("-").slice(0, -1).join("-") + " T 매출");
        matrix[0].push(dateToString(startDate).split("-").slice(0, -1).join("-") + " T 정산");

        matrix[0].push(dateToString(startDate).split("-").slice(0, -1).join("-") + " XT 진행");
        matrix[0].push(dateToString(startDate).split("-").slice(0, -1).join("-") + " XT 추천");
        matrix[0].push(dateToString(startDate).split("-").slice(0, -1).join("-") + " XT 매출");
        matrix[0].push(dateToString(startDate).split("-").slice(0, -1).join("-") + " XT 정산");

      }

      realtimeRows = await back.mongoRead(collection, {}, { selfMongo: selfConsoleMongo });

      for (let designer of designers) {
        desid = designer.desid;
        tempArr = [];

        tempArr.push(desid);
        tempArr.push(designer.designer);
        tempArr.push(designer.information.contract.status.value);

        targetRow = realtimeRows.find((r) => { return r.desid === desid }) === undefined ? null : realtimeRows.find((r) => { return r.desid === desid });
        if (targetRow === null) {
          for (let i = 0; i < forecastDelta; i++) {
            tempArr.push(0);
          }
        } else {
          for (let i = 0; i < forecastDelta; i++) {
            nowDate = new Date();
            nowDate.setDate(1);
            nowDate.setHours(0);
            nowDate.setMinutes(0);
            nowDate.setSeconds(0);
            nowDate.setMilliseconds(0);
            nowDate.setMonth(nowDate.getMonth() + i);
            thisStart = new Date(JSON.stringify(nowDate).slice(1, -1));

            nowDate = new Date();
            nowDate.setDate(1);
            nowDate.setHours(0);
            nowDate.setMinutes(0);
            nowDate.setSeconds(0);
            nowDate.setMilliseconds(0);
            nowDate.setMonth(nowDate.getMonth() + 1 + i);
            thisEnd = new Date(JSON.stringify(nowDate).slice(1, -1));

            possibleArr = targetRow.possible.filter((o) => {
              return (o.start.valueOf() >= thisStart.valueOf()) && (o.end.valueOf() < thisEnd.valueOf())
            });
            possibleNumbersArr = possibleArr.map((a) => { return a.matrix.reduce((acc, curr) => { return acc >= curr ? acc : curr }, 0) });
            possibleNumber = 0;
            if (possibleNumbersArr.length > 0) {
              possibleNumber = possibleNumbersArr.reduce((acc, curr) => { return acc >= curr ? acc : curr }, 0);
            }
            tempArr.push(possibleNumber);
          }
        }

        targetProjects = projects.filter((p) => { return p.desid === desid });
        targetProposals = projects.filter((p) => { return p.proposal.detail.map((a) => { return a.desid }).includes(desid); });
        totalAmount = 0;
        totalAmount = targetProjects.filter((p) => { return p.process.contract.first.date.valueOf() > emptyDateValue && p.process.contract.remain.date.valueOf() < emptyDateValue }).reduce((acc, curr) => {
          return acc + curr.process.contract.first.calculation.amount;
        }, 0);
        totalAmount += targetProjects.filter((p) => { return p.process.contract.remain.date.valueOf() > emptyDateValue }).reduce((acc, curr) => {
          return acc + curr.process.contract.remain.calculation.amount.consumer;
        }, 0);
        totalPayments = 0;
        totalPayments = targetProjects.filter((p) => { return p.process.contract.remain.date.valueOf() > emptyDateValue }).reduce((acc, curr) => {
          return acc + (curr.process.contract.remain.calculation.amount.consumer * ((100 - curr.process.calculation.percentage) / 100));
        }, 0);

        targetProjects_f = targetProjects.filter((p) => { return p.service.serid === "s2011_aa01s" });
        targetProposals_f = targetProposals.filter((p) => { return p.service.serid === "s2011_aa01s" });
        totalAmount_f = 0;
        totalAmount_f = targetProjects_f.filter((p) => { return p.process.contract.first.date.valueOf() > emptyDateValue && p.process.contract.remain.date.valueOf() < emptyDateValue }).reduce((acc, curr) => {
          return acc + curr.process.contract.first.calculation.amount;
        }, 0);
        totalAmount_f += targetProjects_f.filter((p) => { return p.process.contract.remain.date.valueOf() > emptyDateValue }).reduce((acc, curr) => {
          return acc + curr.process.contract.remain.calculation.amount.consumer;
        }, 0);
        totalPayments_f = 0;
        totalPayments_f = targetProjects_f.filter((p) => { return p.process.contract.remain.date.valueOf() > emptyDateValue }).reduce((acc, curr) => {
          return acc + (curr.process.contract.remain.calculation.amount.consumer * ((100 - curr.process.calculation.percentage) / 100));
        }, 0);

        targetProjects_s = targetProjects.filter((p) => { return p.service.serid === "s2011_aa02s" });
        targetProposals_s = targetProposals.filter((p) => { return p.service.serid === "s2011_aa02s" });
        totalAmount_s = 0;
        totalAmount_s = targetProjects_s.filter((p) => { return p.process.contract.first.date.valueOf() > emptyDateValue && p.process.contract.remain.date.valueOf() < emptyDateValue }).reduce((acc, curr) => {
          return acc + curr.process.contract.first.calculation.amount;
        }, 0);
        totalAmount_s += targetProjects_s.filter((p) => { return p.process.contract.remain.date.valueOf() > emptyDateValue }).reduce((acc, curr) => {
          return acc + curr.process.contract.remain.calculation.amount.consumer;
        }, 0);
        totalPayments_s = 0;
        totalPayments_s = targetProjects_s.filter((p) => { return p.process.contract.remain.date.valueOf() > emptyDateValue }).reduce((acc, curr) => {
          return acc + (curr.process.contract.remain.calculation.amount.consumer * ((100 - curr.process.calculation.percentage) / 100));
        }, 0);

        targetProjects_t = targetProjects.filter((p) => { return p.service.serid === "s2011_aa03s" });
        targetProposals_t = targetProposals.filter((p) => { return p.service.serid === "s2011_aa03s" });
        totalAmount_t = 0;
        totalAmount_t = targetProjects_t.filter((p) => { return p.process.contract.first.date.valueOf() > emptyDateValue && p.process.contract.remain.date.valueOf() < emptyDateValue }).reduce((acc, curr) => {
          return acc + curr.process.contract.first.calculation.amount;
        }, 0);
        totalAmount_t += targetProjects_t.filter((p) => { return p.process.contract.remain.date.valueOf() > emptyDateValue }).reduce((acc, curr) => {
          return acc + curr.process.contract.remain.calculation.amount.consumer;
        }, 0);
        totalPayments_t = 0;
        totalPayments_t = targetProjects_t.filter((p) => { return p.process.contract.remain.date.valueOf() > emptyDateValue }).reduce((acc, curr) => {
          return acc + (curr.process.contract.remain.calculation.amount.consumer * ((100 - curr.process.calculation.percentage) / 100));
        }, 0);

        targetProjects_xt = targetProjects.filter((p) => { return p.service.serid === "s2011_aa04s" });
        targetProposals_xt = targetProposals.filter((p) => { return p.service.serid === "s2011_aa04s" });
        totalAmount_xt = 0;
        totalAmount_xt = targetProjects_xt.filter((p) => { return p.process.contract.first.date.valueOf() > emptyDateValue && p.process.contract.remain.date.valueOf() < emptyDateValue }).reduce((acc, curr) => {
          return acc + curr.process.contract.first.calculation.amount;
        }, 0);
        totalAmount_xt += targetProjects_xt.filter((p) => { return p.process.contract.remain.date.valueOf() > emptyDateValue }).reduce((acc, curr) => {
          return acc + curr.process.contract.remain.calculation.amount.consumer;
        }, 0);
        totalPayments_xt = 0;
        totalPayments_xt = targetProjects_xt.filter((p) => { return p.process.contract.remain.date.valueOf() > emptyDateValue }).reduce((acc, curr) => {
          return acc + (curr.process.contract.remain.calculation.amount.consumer * ((100 - curr.process.calculation.percentage) / 100));
        }, 0);


        tempArr.push(targetProjects.length);
        tempArr.push(targetProposals.length);
        tempArr.push(Math.floor(totalAmount));
        tempArr.push(Math.floor(totalPayments));

        tempArr.push(targetProjects_f.length);
        tempArr.push(targetProposals_f.length);
        tempArr.push(Math.floor(totalAmount_f));
        tempArr.push(Math.floor(totalPayments_f));

        tempArr.push(targetProjects_s.length);
        tempArr.push(targetProposals_s.length);
        tempArr.push(Math.floor(totalAmount_s));
        tempArr.push(Math.floor(totalPayments_s));

        tempArr.push(targetProjects_t.length);
        tempArr.push(targetProposals_t.length);
        tempArr.push(Math.floor(totalAmount_t));
        tempArr.push(Math.floor(totalPayments_t));

        tempArr.push(targetProjects_xt.length);
        tempArr.push(targetProposals_xt.length);
        tempArr.push(Math.floor(totalAmount_xt));
        tempArr.push(Math.floor(totalPayments_xt));

        for (let i = -1; i < monthDelta; i++) {

          nowDate = new Date();
          nowDate.setDate(1);
          nowDate.setHours(0);
          nowDate.setMinutes(0);
          nowDate.setSeconds(0);
          nowDate.setMilliseconds(0);
          nowDate.setMonth(nowDate.getMonth() - 1 - i);
          startDate = new Date(JSON.stringify(nowDate).slice(1, -1));

          nowDate = new Date();
          nowDate.setDate(1);
          nowDate.setHours(0);
          nowDate.setMinutes(0);
          nowDate.setSeconds(0);
          nowDate.setMilliseconds(0);
          nowDate.setMonth(nowDate.getMonth() - 0 - i);
          endDate = new Date(JSON.stringify(nowDate).slice(1, -1));

          thisTargetProjects = targetProjects.filter((p) => { return p.process.contract.first.date.valueOf() >= startDate.valueOf() && p.process.contract.first.date.valueOf() < endDate.valueOf() });
          thisTargetProposals = targetProposals.filter((p) => { return p.proposal.date.valueOf() >= startDate.valueOf() && p.proposal.date.valueOf() < endDate.valueOf() });

          thisTotalAmount = 0;
          thisTotalAmount = thisTargetProjects.filter((p) => { return p.process.contract.first.date.valueOf() > emptyDateValue && p.process.contract.remain.date.valueOf() < emptyDateValue }).reduce((acc, curr) => {
            return acc + curr.process.contract.first.calculation.amount;
          }, 0);
          thisTotalAmount += thisTargetProjects.filter((p) => { return p.process.contract.remain.date.valueOf() > emptyDateValue }).reduce((acc, curr) => {
            return acc + curr.process.contract.remain.calculation.amount.consumer;
          }, 0);

          thisTotalPayments = 0;
          thisTotalPayments = thisTargetProjects.filter((p) => { return p.process.contract.remain.date.valueOf() > emptyDateValue }).reduce((acc, curr) => {
            return acc + (curr.process.contract.remain.calculation.amount.consumer * ((100 - curr.process.calculation.percentage) / 100));
          }, 0);


          thisTargetProjects_f = thisTargetProjects.filter((p) => { return p.service.serid === "s2011_aa01s" });
          thisTargetProposals_f = thisTargetProposals.filter((p) => { return p.service.serid === "s2011_aa01s" });
          thisTotalAmount_f = 0;
          thisTotalAmount_f = thisTargetProjects_f.filter((p) => { return p.process.contract.first.date.valueOf() > emptyDateValue && p.process.contract.remain.date.valueOf() < emptyDateValue }).reduce((acc, curr) => {
            return acc + curr.process.contract.first.calculation.amount;
          }, 0);
          thisTotalAmount_f += thisTargetProjects_f.filter((p) => { return p.process.contract.remain.date.valueOf() > emptyDateValue }).reduce((acc, curr) => {
            return acc + curr.process.contract.remain.calculation.amount.consumer;
          }, 0);
          thisTotalPayments_f = 0;
          thisTotalPayments_f = thisTargetProjects_f.filter((p) => { return p.process.contract.remain.date.valueOf() > emptyDateValue }).reduce((acc, curr) => {
            return acc + (curr.process.contract.remain.calculation.amount.consumer * ((100 - curr.process.calculation.percentage) / 100));
          }, 0);

          thisTargetProjects_s = thisTargetProjects.filter((p) => { return p.service.serid === "s2011_aa02s" });
          thisTargetProposals_s = thisTargetProposals.filter((p) => { return p.service.serid === "s2011_aa02s" });
          thisTotalAmount_s = 0;
          thisTotalAmount_s = thisTargetProjects_s.filter((p) => { return p.process.contract.first.date.valueOf() > emptyDateValue && p.process.contract.remain.date.valueOf() < emptyDateValue }).reduce((acc, curr) => {
            return acc + curr.process.contract.first.calculation.amount;
          }, 0);
          thisTotalAmount_s += thisTargetProjects_s.filter((p) => { return p.process.contract.remain.date.valueOf() > emptyDateValue }).reduce((acc, curr) => {
            return acc + curr.process.contract.remain.calculation.amount.consumer;
          }, 0);
          thisTotalPayments_s = 0;
          thisTotalPayments_s = thisTargetProjects_s.filter((p) => { return p.process.contract.remain.date.valueOf() > emptyDateValue }).reduce((acc, curr) => {
            return acc + (curr.process.contract.remain.calculation.amount.consumer * ((100 - curr.process.calculation.percentage) / 100));
          }, 0);

          thisTargetProjects_t = thisTargetProjects.filter((p) => { return p.service.serid === "s2011_aa03s" });
          thisTargetProposals_t = thisTargetProposals.filter((p) => { return p.service.serid === "s2011_aa03s" });
          thisTotalAmount_t = 0;
          thisTotalAmount_t = thisTargetProjects_t.filter((p) => { return p.process.contract.first.date.valueOf() > emptyDateValue && p.process.contract.remain.date.valueOf() < emptyDateValue }).reduce((acc, curr) => {
            return acc + curr.process.contract.first.calculation.amount;
          }, 0);
          thisTotalAmount_t += thisTargetProjects_t.filter((p) => { return p.process.contract.remain.date.valueOf() > emptyDateValue }).reduce((acc, curr) => {
            return acc + curr.process.contract.remain.calculation.amount.consumer;
          }, 0);
          thisTotalPayments_t = 0;
          thisTotalPayments_t = thisTargetProjects_t.filter((p) => { return p.process.contract.remain.date.valueOf() > emptyDateValue }).reduce((acc, curr) => {
            return acc + (curr.process.contract.remain.calculation.amount.consumer * ((100 - curr.process.calculation.percentage) / 100));
          }, 0);

          thisTargetProjects_xt = thisTargetProjects.filter((p) => { return p.service.serid === "s2011_aa04s" });
          thisTargetProposals_xt = thisTargetProposals.filter((p) => { return p.service.serid === "s2011_aa04s" });
          thisTotalAmount_xt = 0;
          thisTotalAmount_xt = thisTargetProjects_xt.filter((p) => { return p.process.contract.first.date.valueOf() > emptyDateValue && p.process.contract.remain.date.valueOf() < emptyDateValue }).reduce((acc, curr) => {
            return acc + curr.process.contract.first.calculation.amount;
          }, 0);
          thisTotalAmount_xt += thisTargetProjects_xt.filter((p) => { return p.process.contract.remain.date.valueOf() > emptyDateValue }).reduce((acc, curr) => {
            return acc + curr.process.contract.remain.calculation.amount.consumer;
          }, 0);
          thisTotalPayments_xt = 0;
          thisTotalPayments_xt = thisTargetProjects_xt.filter((p) => { return p.process.contract.remain.date.valueOf() > emptyDateValue }).reduce((acc, curr) => {
            return acc + (curr.process.contract.remain.calculation.amount.consumer * ((100 - curr.process.calculation.percentage) / 100));
          }, 0);

          tempArr.push(thisTargetProjects.length);
          tempArr.push(thisTargetProposals.length);
          tempArr.push(Math.floor(thisTotalAmount));
          tempArr.push(Math.floor(thisTotalPayments));

          tempArr.push(thisTargetProjects_f.length);
          tempArr.push(thisTargetProposals_f.length);
          tempArr.push(Math.floor(thisTotalAmount_f));
          tempArr.push(Math.floor(thisTotalPayments_f));

          tempArr.push(thisTargetProjects_s.length);
          tempArr.push(thisTargetProposals_s.length);
          tempArr.push(Math.floor(thisTotalAmount_s));
          tempArr.push(Math.floor(thisTotalPayments_s));

          tempArr.push(thisTargetProjects_t.length);
          tempArr.push(thisTargetProposals_t.length);
          tempArr.push(Math.floor(thisTotalAmount_t));
          tempArr.push(Math.floor(thisTotalPayments_t));

          tempArr.push(thisTargetProjects_xt.length);
          tempArr.push(thisTargetProposals_xt.length);
          tempArr.push(Math.floor(thisTotalAmount_xt));
          tempArr.push(Math.floor(thisTotalPayments_xt));

        }
        matrix.push(tempArr);
      }

      await sheets.update_value_inPython(sheetsId, "", matrix);

      return true;
    } catch (e) {
      await logger.error("Static lounge 서버 문제 생김 (rou_post_updateDesignerProposalRealtime): " + e.message);
      console.log(e);
      return false;
    }
  }
  let obj;
  obj = {};
  obj.link = [ "/updateDesignerProposalRealtime" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      proposal(instance.mongo, instance.mongoconsole, logger).then((boo) => {
        if (boo) {
          return messageSend({ text: dateToString(new Date()) + " 디자이너 추천 현황 시트를 업데이트했어요!\nlink : " + "https://docs.google.com/spreadsheets/d/" + sheetsId + "/edit?usp=sharing", channel: "#101_cx_team", voice: false, fairy: true });
        } else {
          throw new Error("proposal update fail");
        }
      }).catch((err) => {
        console.log(err);
        logger.error("Static lounge 서버 문제 생김 (rou_post_updateDesignerProposalRealtime): " + err.message).catch((e) => { console.log(e) });
      })
      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      await logger.error("Static lounge 서버 문제 생김 (rou_post_updateDesignerProposalRealtime): " + e.message);
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_styleCurationTotalMenu = function () {
  const instance = this;
  const back = this.back;
  const { equalJson, messageSend, objectDeepCopy } = this.mother;
  let obj = {};
  obj.link = [ "/styleCurationTotalMenu" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const selfMongo = instance.mongoconsole;
      const selfCoreMongo = instance.mongo;
      const unknown = "알 수 없음";
      const selfLogMongo = instance.mongolocal;
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
              source: "/service_f.svg",
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
              source: "/service_s.svg",
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
              source: "/service_t.svg",
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
      await logger.error("GhostClient 서버 문제 생김 (rou_post_styleCurationTotalMenu) : " + e.message);
      res.send(JSON.stringify({ message: "error" }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_replaceContentsPhoto = function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink, sleep, tempReplaceImage, uniqueValue, requestSystem, messageSend, objectDeepCopy } = this.mother;
  const { staticConst } = this;
  const osTempFolder = "/tmp";
  const back = this.back;
  const address = this.address;
  const image = this.imageReader;
  const qualityConst = 95;
  const sizeMatrix = [
    [ 1200, 848 ],
    [ 800, 566 ],
  ];
  let obj;
  obj = {};
  obj.link = [ "/replaceContentsPhoto" ];
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
      const collection = "contents";
      const selfMongo = instance.mongo;
      const form = instance.formidable({ multiples: true, encoding: "utf-8", maxFileSize: (9000 * 1024 * 1024) });
      form.parse(req, async function (err, fields, files) {
        try {
          if (err) {
            throw new Error(err);
          } else {
            let filesKey;
            let thisFile, thisFiles;
            let tempName;
            let thisTempFull;
            let tempName2;
            let thisTempFull2;
            let tempName3;
            let thisTempFull3;
            let pid, gs, index;
            let fileNum;
            let targetInfo;
            let whereQuery, updateQuery;
            let photoDetailArr;
            let thisOriginalContents;
            let contentsDetailCopied;

            pid = fields.pid.trim();
            whereQuery = { "contents.portfolio.pid": pid };
            updateQuery = {};

            if (fields.multiple === "false" || fields.multiple === false) {

              gs = fields.gs.trim();
              index = Number(fields.index);

              filesKey = Object.keys(files);
              filesKey.sort((a, b) => {
                return Number(a.replace(/[^0-9]/gi, '')) - Number(b.replace(/[^0-9]/gi, ''));
              });
              thisFile = null;
              for (let key of filesKey) {
                thisFile = files[key];
              }

              tempName = "tempReplaceImage" + uniqueValue("hex") + ".jpg";
              thisTempFull = osTempFolder + "/" + tempName;
              tempName2 = "tempReplaceImage" + uniqueValue("hex") + ".jpg";
              thisTempFull2 = osTempFolder + "/" + tempName2;
              tempName3 = "tempReplaceImage" + uniqueValue("hex") + ".jpg";
              thisTempFull3 = osTempFolder + "/" + tempName3;
  
              await shellExec("mv", [ thisFile.filepath, thisTempFull ]);
              await image.overOfficialImage(thisTempFull);
  
              await sleep(50);
  
              await shellExec("cp", [ thisTempFull, thisTempFull2 ]);
              await shellExec("cp", [ thisTempFull, thisTempFull3 ]);
  
              await shellExec("mv", [ thisTempFull, osTempFolder + "/i" + String(index) + pid + ".jpg" ]);
              await shellExec(`convert ${shellLink(thisTempFull2)} -resize ${gs === 's' ? String(sizeMatrix[0][1]) + "x" + String(sizeMatrix[0][0]) : String(sizeMatrix[0][0]) + "x" + String(sizeMatrix[0][1])} -quality ${String(qualityConst)} ${shellLink(osTempFolder + "/t" + String(index) + pid + ".jpg")}`);
              await shellExec(`convert ${shellLink(thisTempFull3)} -resize ${gs === 's' ? String(sizeMatrix[1][1]) + "x" + String(sizeMatrix[1][0]) : String(sizeMatrix[1][0]) + "x" + String(sizeMatrix[1][1])} -quality ${String(qualityConst)} ${shellLink(osTempFolder + "/mot" + String(index) + pid + ".jpg")}`);
  
              await sleep(50);
  
              await shellExec("cp", [ osTempFolder + "/i" + String(index) + pid + ".jpg", staticConst + "/corePortfolio/original/" + pid + "/i" + String(index) + pid + ".jpg" ]);
              await shellExec("cp", [ osTempFolder + "/t" + String(index) + pid + ".jpg", staticConst + "/corePortfolio/listImage/" + pid + "/t" + String(index) + pid + ".jpg" ]);
              await shellExec("cp", [ osTempFolder + "/mot" + String(index) + pid + ".jpg", staticConst + "/corePortfolio/listImage/" + pid + "/mobile/mot" + String(index) + pid + ".jpg" ]);
  
              await sleep(50);
  
              await shellExec("cp", [ "-r", (staticConst + "/corePortfolio/listImage/" + pid + "/t" + String(index) + pid + ".jpg"), staticConst + `/list_image/portp${pid}/` ]);
              await shellExec("cp", [ "-r", (staticConst + "/corePortfolio/listImage/" + pid + "/mobile/mot" + String(index) + pid + ".jpg"), staticConst + `/list_image/portp${pid}/mobile/` ]);
  
              await shellExec("rm", [ "-rf", osTempFolder + "/i" + String(index) + pid + ".jpg" ]);
              await shellExec("rm", [ "-rf", osTempFolder + "/t" + String(index) + pid + ".jpg" ]);
              await shellExec("rm", [ "-rf", osTempFolder + "/mot" + String(index) + pid + ".jpg" ]);
              await shellExec("rm", [ "-rf", thisTempFull2 ]);
              await shellExec("rm", [ "-rf", thisTempFull3 ]);

            } else {
              filesKey = Object.keys(files);
              filesKey.sort((a, b) => {
                return Number(a.replace(/[^0-9]/gi, '')) - Number(b.replace(/[^0-9]/gi, ''));
              });
              thisFiles = [];
              for (let key of filesKey) {
                thisFiles.push(files[key]);
              }
              (async () => {

                fileNum = 1;
                photoDetailArr = [];
                for (let thisFile of thisFiles) {
  
                  await sleep(500);
                  targetInfo = await image.readImage(thisFile.filepath);
                  if (targetInfo.geometry.width >= targetInfo.geometry.height) {
                    gs = "g";
                  } else if (targetInfo.geometry.width < targetInfo.geometry.height) {
                    gs = "s";
                  }
                  await sleep(500);
                  index = fileNum;
                  photoDetailArr.push({ index: index, gs: gs });
  
                  tempName = "tempReplaceImage" + uniqueValue("hex") + ".jpg";
                  thisTempFull = osTempFolder + "/" + tempName;
                  tempName2 = "tempReplaceImage" + uniqueValue("hex") + ".jpg";
                  thisTempFull2 = osTempFolder + "/" + tempName2;
                  tempName3 = "tempReplaceImage" + uniqueValue("hex") + ".jpg";
                  thisTempFull3 = osTempFolder + "/" + tempName3;
      
                  await shellExec("mv", [ thisFile.filepath, thisTempFull ]);
                  await image.overOfficialImage(thisTempFull);
      
                  await sleep(500);
      
                  await shellExec("cp", [ thisTempFull, thisTempFull2 ]);
                  await shellExec("cp", [ thisTempFull, thisTempFull3 ]);
      
                  await shellExec("mv", [ thisTempFull, osTempFolder + "/i" + String(index) + pid + ".jpg" ]);
                  await shellExec(`convert ${shellLink(thisTempFull2)} -resize ${gs === 's' ? String(sizeMatrix[0][1]) + "x" + String(sizeMatrix[0][0]) : String(sizeMatrix[0][0]) + "x" + String(sizeMatrix[0][1])} -quality ${String(qualityConst)} ${shellLink(osTempFolder + "/t" + String(index) + pid + ".jpg")}`);
                  await shellExec(`convert ${shellLink(thisTempFull3)} -resize ${gs === 's' ? String(sizeMatrix[1][1]) + "x" + String(sizeMatrix[1][0]) : String(sizeMatrix[1][0]) + "x" + String(sizeMatrix[1][1])} -quality ${String(qualityConst)} ${shellLink(osTempFolder + "/mot" + String(index) + pid + ".jpg")}`);
      
                  await sleep(500);
      
                  await shellExec("cp", [ osTempFolder + "/i" + String(index) + pid + ".jpg", staticConst + "/corePortfolio/original/" + pid + "/i" + String(index) + pid + ".jpg" ]);
                  await shellExec("cp", [ osTempFolder + "/t" + String(index) + pid + ".jpg", staticConst + "/corePortfolio/listImage/" + pid + "/t" + String(index) + pid + ".jpg" ]);
                  await shellExec("cp", [ osTempFolder + "/mot" + String(index) + pid + ".jpg", staticConst + "/corePortfolio/listImage/" + pid + "/mobile/mot" + String(index) + pid + ".jpg" ]);
      
                  await sleep(500);
      
                  await shellExec("cp", [ "-r", (staticConst + "/corePortfolio/listImage/" + pid + "/t" + String(index) + pid + ".jpg"), staticConst + `/list_image/portp${pid}/` ]);
                  await shellExec("cp", [ "-r", (staticConst + "/corePortfolio/listImage/" + pid + "/mobile/mot" + String(index) + pid + ".jpg"), staticConst + `/list_image/portp${pid}/mobile/` ]);
        
                  await shellExec("rm", [ "-rf", osTempFolder + "/i" + String(index) + pid + ".jpg" ]);
                  await shellExec("rm", [ "-rf", osTempFolder + "/t" + String(index) + pid + ".jpg" ]);
                  await shellExec("rm", [ "-rf", osTempFolder + "/mot" + String(index) + pid + ".jpg" ]);
                  await shellExec("rm", [ "-rf", thisTempFull2 ]);
                  await shellExec("rm", [ "-rf", thisTempFull3 ]);
      
                  fileNum++;
                }
  
                updateQuery = {};
                updateQuery["photos.detail"] = photoDetailArr;
                updateQuery["photos.first"] = 1;
                updateQuery["photos.last"] = photoDetailArr.length;
                updateQuery["contents.portfolio.detailInfo.photosg.first"] = 1;
                updateQuery["contents.portfolio.detailInfo.photosg.last"] = photoDetailArr.length;

                [ thisOriginalContents ] = await back.mongoRead(collection, whereQuery, { selfMongo });
                contentsDetailCopied = objectDeepCopy(thisOriginalContents.contents.portfolio.contents.detail);
                if (contentsDetailCopied.length > 1) {
                  contentsDetailCopied[0].photo = [];
                  contentsDetailCopied[1].photo = [];
                  for (let i = 1; i < photoDetailArr.length + 1; i++) {
                    contentsDetailCopied[1].photo.push(i);
                  }
                  for (let i = 2; i < contentsDetailCopied.length; i++) {
                    contentsDetailCopied[i].photo = [];
                  }
                  updateQuery["contents.portfolio.contents.detail"] = objectDeepCopy(contentsDetailCopied);
                }

                await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo });
                await requestSystem("https://" + instance.address.officeinfo.ghost.host + ":3000/frontReflection", { data: null }, { headers: { "Content-Type": "application/json" } });
                await messageSend({ text: pid + " 컨텐츠 보정본 업로드 및 대치를 완료하였어요, 순서 조정 및 에디팅을 해주세요\nlink : https://" + address.frontinfo.host + "/portdetail.php?pid=" + pid + "&edit=true", channel: "#502_sns_contents", voice: true });

              })().catch((err) => { console.log(err); })

            }

            res.send(JSON.stringify({ "message": "done" }));
          }
        } catch (e) {
          console.log(e);
          logger.error("Static lounge 서버 문제 생김 (rou_post_replaceContentsPhoto): " + e.message).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
        }
      });
    } catch (e) {
      logger.error("Static lounge 서버 문제 생김 (rou_post_replaceContentsPhoto): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_frontReflection = function () {
  const instance = this;
  const MongoReflection = require(`${process.cwd()}/apps/mongoReflection/mongoReflection.js`);
  const reflection = new MongoReflection();
  const { equalJson } = this.mother;
  let obj = {};
  obj.link = [ "/frontReflection" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      reflection.frontReflection("local").catch((err) => {
        logger.error("Log Console 서버 문제 생김 (rou_post_frontReflection): " + err.message).catch((e) => { console.log(e); });
      });
      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      logger.error("Log Console 서버 문제 생김 (rou_post_frontReflection): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_searchContents = function () {
  const instance = this;
  const back = this.back;
  const { equalJson, objectDeepCopy, sleep, serviceParsing } = this.mother;
  let obj = {};
  obj.link = [ "/searchContents" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const selfMongo = instance.mongo;
      const selfCoreMongo = instance.mongo;
      const collection = "contents";
      const hideContents = [];
      const toNormal = true;
      const { keywords: seridKeywords, name: serviceNames } = serviceParsing();
      let limit;
      let contentsArr_raw;
      let contentsArr, designers;
      let reviewArr, indexArr;
      let indexSliceNumber;
      let contentsProjectQuery;
      let sortQuery;
      let cliidArr;
      let proidArr;
      let whereQuery, projectQuery;
      let thisClients, thisProjects;
      let thisRequestNumber;
      let thisClient;
      let proposalDate;
      let projects;
      let thisProject;
      let thisDesigner;
      let thisSerid;
      let fromDate, toDate;
      let dateDelta;
      let regionArr;
      let reg0, reg1;
      let thisArr;

      contentsProjectQuery = {
        conid: 1,
        desid: 1,
        cliid: 1,
        proid: 1,
        service: 1,
        photos: 1,
        "contents.portfolio.pid": 1,
        "contents.portfolio.date": 1,
        "contents.portfolio.spaceInfo": 1,
        "contents.portfolio.title": 1,
        "contents.portfolio.color": 1,
        "contents.portfolio.detailInfo": 1,
        "contents.review.rid": 1,
        "contents.review.date": 1,
        "contents.review.title": 1,
        "contents.review.detailInfo": 1,
      };

      sortQuery = {};
      if (req.body.from === "review") {
        sortQuery = { "contents.review.detailInfo.order": -1 };
      } else {
        sortQuery = { "contents.portfolio.detailInfo.sort.key9": -1 };
      }

      contentsArr = await back.mongoPick(collection, [ {}, contentsProjectQuery ], { selfMongo, sort: sortQuery });
      if (contentsArr.length === 0) {
        res.send(JSON.stringify({ conids: [] }));
      } else {
        designers = await back.getDesignersByQuery({ $or: contentsArr.map((obj) => { return { desid: obj.desid } }) }, { selfMongo });
        cliidArr = [ ...new Set(contentsArr.map((o) => { return o.cliid.trim() }).filter((s) => { return s !== "" })) ];
        proidArr = [ ...new Set(contentsArr.map((o) => { return o.proid.trim() }).filter((s) => { return s !== "" })) ];

        if (cliidArr.length > 0) {
          whereQuery = { $or: cliidArr.map((cliid) => { return { cliid } }) };
          projectQuery = {
            cliid: 1,
            name: 1,
            "requests.request.timeline": 1,
            "requests.request.budget": 1,
            "requests.request.family": 1,
            "requests.request.furniture": 1,
            "requests.request.space": 1,
          }
          thisClients = await back.mongoPick("client", [ objectDeepCopy(whereQuery), objectDeepCopy(projectQuery) ], { selfMongo: selfCoreMongo });

          whereQuery = { $or: proidArr.map((proid) => { return { proid } }) };
          projectQuery = {
            proid: 1,
            cliid: 1,
            desid: 1,
            "proposal.date": 1,
            process: 1,
          }
          thisProjects = await back.mongoPick("project", [ objectDeepCopy(whereQuery), objectDeepCopy(projectQuery) ], { selfMongo: selfCoreMongo });

          projects = [];
          for (let project of thisProjects) {
            proposalDate = new Date(JSON.stringify(project.proposal.date).slice(1, -1));
            thisClient = thisClients.find((c) => { return c.cliid === project.cliid });

            thisRequestNumber = 0;
            for (let i = 0; i < thisClient.requests.length; i++) {
              if (thisClient.requests[i].request.timeline.valueOf() <= proposalDate.valueOf()) {
                thisRequestNumber = i;
                break;
              }
            }

            project.requestNumber = thisRequestNumber;
            project.client = {
              name: thisClient.name,
              cliid: thisClient.cliid,
              request: objectDeepCopy(thisClient.requests[thisRequestNumber].request),
            };
            projects.push(project);
          }

          for (let contents of contentsArr) {
            if (contents.proid !== "") {
              thisProject = projects.find((p) => { return p.proid === contents.proid });
              contents.project = objectDeepCopy(thisProject);
            } else {
              contents.project = { client: { request: {} } };
            }
            thisDesigner = designers.find((d) => { return d.desid === contents.desid });
            contents.designer = thisDesigner.designer;
          }

        } else {
          for (let contents of contentsArr) {
            contents.project = { client: { request: {} } };
            thisDesigner = designers.find((d) => { return d.desid === contents.desid });
            contents.designer = thisDesigner.designer;
          }
        }

        const { subject, value } = equalJson(req.body);

        if (subject === "평수") {

          contentsArr = contentsArr.filter((c) => { return typeof c.contents.portfolio.spaceInfo.pyeong === "number" });
          if (value === "10평 미만") {
            contentsArr = contentsArr.filter((c) => {
              const pyeong = c.contents.portfolio.spaceInfo.pyeong;
              return pyeong < 10;
            });
          } else if (value === "60평 이상") {
            contentsArr = contentsArr.filter((c) => {
              const pyeong = c.contents.portfolio.spaceInfo.pyeong;
              return pyeong >= 60;
            });
          } else {
            contentsArr = contentsArr.filter((c) => {
              const pyeong = c.contents.portfolio.spaceInfo.pyeong;
              const standard = Number(value.replace(/[^0-9]/gi, ''))
              return (pyeong >= standard && pyeong < (standard + 10));
            });
          }

          res.send(JSON.stringify({ conids: contentsArr.map((c) => { return c.conid }) }));
        } else if (subject === "예산") {

          contentsArr = contentsArr.filter((c) => { return typeof c.project.client.request.budget === "string" });
          if (value === "500만원 이하") {
            contentsArr = contentsArr.filter((c) => {
              const budget = Number(c.project.client.request.budget.replace(/[^0-9]/gi, ''));
              return (budget > 50 && budget <= 500);
            });
          } else if (value === "6,000만원 이상") {
            contentsArr = contentsArr.filter((c) => {
              const budget = Number(c.project.client.request.budget.replace(/[^0-9]/gi, ''));
              return (budget >= 6000 || budget <= 50);
            });
          } else {
            contentsArr = contentsArr.filter((c) => {
              const budget = Number(c.project.client.request.budget.replace(/[^0-9]/gi, ''));
              const standard = Number(value.replace(/[^0-9]/gi, ''))
              return (budget >= standard && budget < (standard + 1000));
            });
          }

          res.send(JSON.stringify({ conids: contentsArr.map((c) => { return c.conid }) }));

        } else if (subject === "서비스 종류") {

          thisSerid = seridKeywords + String(serviceNames.findIndex((s) => { return s === value }) + 1) + 's';
          contentsArr = contentsArr.filter((c) => { return c.service.serid === thisSerid });

          res.send(JSON.stringify({ conids: contentsArr.map((c) => { return c.conid }) }));

        } else if (subject === "서비스 기간") {

          contentsArr = contentsArr.filter((c) => { return typeof c.project.process === "object" });
          contentsArr = contentsArr.filter((c) => {
            fromDate = c.project.process.contract.form.date.from;
            toDate = c.project.process.contract.form.date.to;
            dateDelta = Math.floor(((((toDate.valueOf() - fromDate.valueOf()) / 1000) / 60) / 60) / 24);
            if (value === "3주 이내") {
              return dateDelta < 21;
            } else if (value === "6주 이상") {
              return dateDelta >= 42;
            } else {
              return (dateDelta >= 21 && dateDelta < 42);
            }
          });
          res.send(JSON.stringify({ conids: contentsArr.map((c) => { return c.conid }) }));

        } else if (subject === "지역") {

          contentsArr = contentsArr.filter((c) => { return typeof c.project.client.request.space === "object" });
          contentsArr = contentsArr.filter((c) => {
            if (value === "서울 / 경기") {

              thisArr = [
                "서울",
                "남구",
                "강동",
                "강북",
                "강서",
                "관악",
                "광진",
                "구로",
                "금천",
                "노원",
                "도봉",
                "동대문",
                "동작",
                "마포",
                "서대문",
                "서초",
                "성동",
                "성북",
                "송파",
                "양천",
                "영등포",
                "용산",
                "은평",
                "종로",
                "중구",
                "중랑구",
                "경기",
                "의정부",
                "포천",
                "인천",
              ];
              return thisArr.some((str) => {
                const thisReg = new RegExp("^[ ]*" + (str.trim()), "gi");
                return thisReg.test(c.project.client.request.space.address.trim());
              });

            } else if (value === "충청 / 강원") {

              thisArr = [
                "충청",
                "충북",
                "충남",
                "세종",
                "대전",
                "청주",
                "제천",
                "천안",
                "강원",
                "강릉",
                "원주",
                "속초",
              ];
              return thisArr.some((str) => {
                const thisReg = new RegExp("^[ ]*" + (str.trim()), "gi");
                return thisReg.test(c.project.client.request.space.address.trim());
              });

            } else if (value === "전라 / 경상") {

              thisArr = [
                "전라",
                "경상",
                "전남",
                "전북",
                "경북",
                "경남",
                "광주",
                "대구",
                "부산",
                "울산",
              ];
              return thisArr.some((str) => {
                const thisReg = new RegExp("^[ ]*" + (str.trim()), "gi");
                return thisReg.test(c.project.client.request.space.address.trim());
              });

            } else if (value === "제주") {

              thisArr = [
                "제주",
                "서귀포",
              ];
              return thisArr.some((str) => {
                const thisReg = new RegExp("^[ ]*" + (str.trim()), "gi");
                return thisReg.test(c.project.client.request.space.address.trim());
              });

            } else {

              thisArr = [
                "서울",
                "남구",
                "강동",
                "강북",
                "강서",
                "관악",
                "광진",
                "구로",
                "금천",
                "노원",
                "도봉",
                "동대문",
                "동작",
                "마포",
                "서대문",
                "서초",
                "성동",
                "성북",
                "송파",
                "양천",
                "영등포",
                "용산",
                "은평",
                "종로",
                "중구",
                "중랑구",
                "경기",
                "의정부",
                "포천",
                "인천",
                "충청",
                "충북",
                "충남",
                "세종",
                "대전",
                "청주",
                "제천",
                "천안",
                "강원",
                "강릉",
                "원주",
                "속초",
                "전라",
                "경상",
                "전남",
                "전북",
                "경북",
                "경남",
                "광주",
                "대구",
                "부산",
                "울산",
                "제주",
                "서귀포",
              ];

              return thisArr.every((str) => {
                const thisReg = new RegExp("^[ ]*" + (str.trim()), "gi");
                return !thisReg.test(c.project.client.request.space.address.trim());
              });
            }
          });
          res.send(JSON.stringify({ conids: contentsArr.map((c) => { return c.conid }) }));

        } else if (subject === "전체") {
          res.send(JSON.stringify({ conids: contentsArr.map((c) => { return c.conid }) }));
        } else {
          res.send(JSON.stringify({ conids: contentsArr.map((c) => { return c.conid }) }));
        }
      }

    } catch (e) {
      logger.error("Log Console 서버 문제 생김 (rou_post_searchContents): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_hiddenContents = function () {
  const instance = this;
  const back = this.back;
  const { equalJson, objectDeepCopy } = this.mother;
  let obj = {};
  obj.link = [ "/hiddenContents" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const selfMongo = instance.mongolocal;
      const collection = "hiddenContents";
      const { mode } = equalJson(req.body);
      let target;
      let updateQuery, contents;
      let updatedContents;

      if (mode === "get") {

        [ target ] = await back.mongoRead(collection, {}, { selfMongo });
        res.send(JSON.stringify(target.contents));

      } else if (mode === "update") {

        const { updateQuery } = equalJson(req.body);
        updateQuery["date"] = new Date();
        await back.mongoUpdate(collection, [ {}, updateQuery ], { selfMongo });
        res.send(JSON.stringify({ message: "done" }));

      } else if (mode === "add") {

        const { pid } = equalJson(req.body);
        [ target ] = await back.mongoRead(collection, {}, { selfMongo });
        contents = objectDeepCopy(target.contents);
        contents.push(pid);
        contents = [ ...new Set(contents) ];
        updateQuery = { date: new Date(), contents };
        await back.mongoUpdate(collection, [ {}, updateQuery ], { selfMongo });
        res.send(JSON.stringify({ message: "done" }));

      } else if (mode === "remove") {

        const { pid } = equalJson(req.body);
        [ target ] = await back.mongoRead(collection, {}, { selfMongo });
        contents = objectDeepCopy(target.contents);
        updatedContents = [];
        for (let p of contents) {
          if (p !== pid) {
            updatedContents.push(p);
          }
        }
        contents = [ ...new Set(updatedContents) ];
        updateQuery = { date: new Date(), contents };
        await back.mongoUpdate(collection, [ {}, updateQuery ], { selfMongo });
        res.send(JSON.stringify({ message: "done" }));

      } else {
        throw new Error("invalid mode");
      }

    } catch (e) {
      logger.error("Log Console 서버 문제 생김 (rou_post_hiddenContents): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_syncContentsTag = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const { equalJson, objectDeepCopy, dateToString, serviceParsing } = this.mother;
  let obj = {};
  obj.link = [ "/syncContentsTag" ];
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
      const collection = "contents";

      (async () => {
        
        const targets = await back.mongoRead(collection, {}, { selfMongo: selfCoreMongo });
        const keywordsArr = (targets.map((c) => {
          const bodyArr = c.contents.portfolio.contents.detail[0].contents.split(" ");
          const keywordsArr = [ ...new Set(bodyArr.map((s) => { return s.trim() }).map((s) => {
            return s.replace(/[\n\t ]/gi, "").replace(/을$/gi, "").replace(/으로$/gi, "").replace(/하고$/gi, "").replace(/[^가-힣0-9]/gi, "");
          }).filter((s) => {
            return !/고객/gi.test(s) && !/스타일링/gi.test(s) && !/문의/gi.test(s) && !/의뢰/gi.test(s)
          }).map((s) => {
            return s.replace(/[은는이가을를]$/, "").replace(/[와과]$/, "").replace(/습니다$/, "").replace(/그리고/, "").replace(/그래서/, "").replace(/어떻게/, "").replace(/하지만/, "");
          }).map((s) => {
            return s.replace(/[에의]$/, "");
          }).filter((s) => {
            return !/하였/gi.test(s) && !/하셨/gi.test(s) && !/야겠다고/gi.test(s) && !/이에요/gi.test(s) && !/었죠/gi.test(s) && !/어요/gi.test(s) && !/했[고구]요/gi.test(s)
          }).filter((s) => {
            return !/아실까요/gi.test(s) && !/계셨구요/gi.test(s) && !/해드렸/gi.test(s) && !/봅시다/gi.test(s);
          }).filter((s) => {
            return !/진행/gi.test(s) && !/홈리에종/gi.test(s) && !/디자이너/gi.test(s) && !/소개/gi.test(s);
          }).map((s) => {
            return s.replace(/[에의]$/, "");
          }).map((s) => {
            return s.replace(/이다$/, "");
          }).map((s) => {
            return s.replace(/있으셨죠$/, "");
          }).map((s) => {
            return s.replace(/추천드렸$/, "");
          }).filter((s) => {
            return !/하시겠다고/gi.test(s) && !/현장이었/gi.test(s) && !/해드리겠다고/gi.test(s) && !/이었기/gi.test(s) && !/됐으면/gi.test(s);
          }).filter((s) => {
            return !/있도록/gi.test(s) && !/싶으셨죠/gi.test(s) && !/바뀌었답니다/gi.test(s) && !/이야기/gi.test(s) && !/현장입니다/gi.test(s);
          }).filter((s) => { return s !== "" }).filter((s) => { return s.trim().length > 2 })) ].concat([ "all" ]).concat([
            c.contents.portfolio.spaceInfo.space,
            String(c.contents.portfolio.spaceInfo.pyeong) + "평",
            String(Math.floor(c.contents.portfolio.spaceInfo.pyeong / 10) * 10) + "평형",
            c.contents.portfolio.spaceInfo.region,
            ...c.contents.portfolio.spaceInfo.space.split(" "),
            ...c.contents.portfolio.spaceInfo.region.split(" "),
            serviceParsing(c.service).replace(/[^가-힣 ]/gi, "").trim().replace(/^(온라인|오프라인)/, "").trim(),
            ...c.contents.portfolio.title.main.split(" ").map((s) => { return s.trim() }).filter((s) => { return s !== "" }),
          ])
          return {
            conid: c.conid,
            keywords: keywordsArr.concat(),
          }
        }));
        for (let { conid, keywords } of keywordsArr) {
          await back.mongoUpdate(collection, [ { conid }, { "contents.portfolio.detailInfo.tag": keywords } ], { selfMongo });
          await back.mongoUpdate(collection, [ { conid }, { "contents.portfolio.detailInfo.tag": keywords } ], { selfMongo: selfCoreMongo });
        }

      })().catch((err) => {
        console.log(err);
        logger.error("Log Console 서버 문제 생김 (rou_post_syncContentsTag): " + e.message).catch((e) => { console.log(e); });
      })

      res.send(JSON.stringify({ message: "will do" }));

    } catch (e) {
      logger.error("Log Console 서버 문제 생김 (rou_post_syncContentsTag): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_updateDesignerProposalSetting = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const { equalJson, objectDeepCopy, dateToString, serviceParsing } = this.mother;
  let obj = {};
  obj.link = [ "/updateDesignerProposalSetting" ];
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
      const collection = "designer";
      const { desid, photo, description } = equalJson(req.body);
      let dummy, proposalArr;

      dummy = () => {
        return { name: "기본 세팅", photo: objectDeepCopy(photo), description: objectDeepCopy(description) };
      }
      proposalArr = [];
      for (let i = 0; i < 5; i++) {
        proposalArr.push(objectDeepCopy(dummy()));
      }

      await back.mongoUpdate(collection, [ { desid }, { "setting.proposal": proposalArr } ], { selfMongo });
      await back.mongoUpdate(collection, [ { desid }, { "setting.proposal": proposalArr } ], { selfMongo: selfCoreMongo });

      res.send(JSON.stringify({ message: "done" }));

    } catch (e) {
      logger.error("Log Console 서버 문제 생김 (rou_post_syncContentsTag): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}


StaticRouter.prototype.rou_post_getContents = function () {
  const instance = this;
  const back = this.back;
  const { equalJson } = this.mother;
  let obj = {};
  obj.link = [ "/getContents" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const selfMongo = instance.mongo;
      const selfCoreMongo = instance.mongo;
      const selfLocalMongo = instance.mongolocal;
      const hiddenCollection = "hiddenContents";
      const collection = "contents";
      const hideContents = (await back.mongoRead(hiddenCollection, {}, { selfMongo: selfLocalMongo }))[0].contents;
      const toNormal = true;
      const defaultDelta = 45;
      const moneyDelta = 2500000;
      let limit;
      let contentsArr_raw;
      let contentsArr, designers;
      let reviewArr, indexArr;
      let indexSliceNumber;
      let contentsProjectQuery;
      let sortQuery;
      let whereQuery;
      let thisProid;
      let period;
      let thisProject;
      let delta;
      let dayDelta;

      if (req.body.mode === "portfolio" || req.body.mode === "review") {

        if (req.body.pid !== undefined) {
          if (/^re/.test(req.body.pid)) {
            contentsArr = await back.mongoRead(collection, { "contents.review.rid": req.body.pid }, { selfMongo });
            contentsArr = contentsArr.filter((obj) => {
              return obj.contents.review.rid === req.body.pid;
            });
          } else {
            contentsArr = await back.mongoRead(collection, { "contents.portfolio.pid": req.body.pid }, { selfMongo });
            contentsArr = contentsArr.filter((obj) => {
              return obj.contents.portfolio.pid === req.body.pid;
            });
          }

          if (contentsArr.length > 0) {
            thisProid = contentsArr[0].proid;
            contentsArr[0].consumer = moneyDelta;
            if (/^p/gi.test(thisProid)) {
              [ thisProject ] = await back.mongoPick("project", [ { proid: thisProid }, {
                "process.contract.remain.calculation": 1,
                "process.contract.form.date": 1,
              } ], { selfMongo: selfCoreMongo });
              if (thisProject !== undefined && thisProject !== null) {
                delta = thisProject.process.contract.form.date.to.valueOf() - thisProject.process.contract.form.date.from.valueOf();
                dayDelta = Math.floor((((delta / 1000) / 60) / 60) / 24);
                if (!Number.isNaN(Number(dayDelta)) && dayDelta > 10) {
                  period = "약 " + String(dayDelta) + "일";
                } else {
                  period = "약 " + String(defaultDelta) + "일";
                }
                contentsArr[0].consumer = thisProject.process.contract.remain.calculation.amount.consumer;
                if (Number.isNaN(Number(contentsArr[0].consumer))) {
                  contentsArr[0].consumer = moneyDelta;
                }
              } else {
                period = "약 " + String(defaultDelta) + "일";
              }
            } else {
              period = "약 " + String(defaultDelta) + "일";
            }
            contentsArr[0].period = period;

            designers = await back.getDesignersByQuery({ $or: contentsArr.map((obj) => { return { desid: obj.desid } }) }, { selfMongo });
            res.send(JSON.stringify({
              contentsArr: contentsArr,
              designers: designers.frontMode(),
            }));
          } else {
            res.send(JSON.stringify({
              contentsArr: contentsArr,
              designers: [],
            }));
          }

        } else {

          contentsProjectQuery = {
            conid: 1,
            desid: 1,
            cliid: 1,
            proid: 1,
            service: 1,
            photos: 1,
            "contents.portfolio.pid": 1,
            "contents.portfolio.date": 1,
            "contents.portfolio.spaceInfo": 1,
            "contents.portfolio.title": 1,
            "contents.portfolio.color": 1,
            "contents.portfolio.detailInfo": 1,
            "contents.review.rid": 1,
            "contents.review.date": 1,
            "contents.review.title": 1,
            "contents.review.detailInfo": 1,
          };

          sortQuery = {};
          if (req.body.mode === "review") {
            sortQuery = { "contents.review.detailInfo.order": -1 };
          } else {
            sortQuery = { "contents.portfolio.detailInfo.sort.key9": -1 };
          }

          whereQuery = { "$and": hideContents.map((pid) => { return { "contents.portfolio.pid": { "$not": { "$regex": "^" + pid + "$" } } } }) };
          whereQuery["$and"].push({ "contents.portfolio.title.main": { "$not": { "$regex": "제목을 입력해"} } });
          if (req.body.limit !== undefined) {
            contentsArr = await back.mongoPick(collection, [ whereQuery, contentsProjectQuery ], { selfMongo, sort: sortQuery, limit: Number(req.body.limit) });
          } else {
            contentsArr = await back.mongoPick(collection, [ whereQuery, contentsProjectQuery ], { selfMongo, sort: sortQuery });
          }

          contentsArr = contentsArr.filter((obj) => { return !hideContents.includes(obj.contents.portfolio.pid); });

          if (contentsArr.length > 0) {
            designers = await back.getDesignersByQuery({ $or: contentsArr.map((obj) => { return { desid: obj.desid } }) }, { selfMongo });
            res.send(JSON.stringify({
              contentsArr: contentsArr,
              designers: designers.frontMode(),
            }));
          } else {
            res.send(JSON.stringify({
              contentsArr: contentsArr,
              designers: [],
            }));
          }

        }

      } else if (req.body.mode === "designer") {

        if (req.body.desid === undefined) {

          contentsProjectQuery = {
            conid: 1,
            desid: 1,
            cliid: 1,
            proid: 1,
            service: 1,
            photos: 1,
            "contents.portfolio.pid": 1,
            "contents.portfolio.date": 1,
            "contents.portfolio.spaceInfo": 1,
            "contents.portfolio.title": 1,
            "contents.portfolio.color": 1,
            "contents.portfolio.detailInfo": 1,
            "contents.review.rid": 1,
            "contents.review.date": 1,
            "contents.review.title": 1,
            "contents.review.detailInfo": 1,
          };
          sortQuery = { "contents.portfolio.detailInfo.sort.key9": -1 };

          designers = await back.getDesignersByQuery({}, { selfMongo });
          contentsArr = await back.mongoPick(collection, [ { "$and": hideContents.map((pid) => { return { "contents.portfolio.pid": { "$not": { "$regex": "^" + pid + "$" } } } }) }, contentsProjectQuery ], { selfMongo, sort: sortQuery });
          contentsArr = contentsArr.filter((obj) => { return !hideContents.includes(obj.contents.portfolio.pid); });

          res.send(JSON.stringify({
            contentsArr: contentsArr,
            designers: designers.frontMode(),
          }));

        } else {

          contentsProjectQuery = {
            conid: 1,
            desid: 1,
            cliid: 1,
            proid: 1,
            service: 1,
            photos: 1,
            "contents.portfolio.pid": 1,
            "contents.portfolio.date": 1,
            "contents.portfolio.spaceInfo": 1,
            "contents.portfolio.title": 1,
            "contents.portfolio.color": 1,
            "contents.portfolio.detailInfo": 1,
            "contents.review.rid": 1,
            "contents.review.date": 1,
            "contents.review.title": 1,
            "contents.review.detailInfo": 1,
          };
          sortQuery = { "contents.portfolio.detailInfo.sort.key9": -1 };

          designers = await back.getDesignersByQuery({ desid: req.body.desid }, { selfMongo });
          whereQuery = { "$and": hideContents.map((pid) => { return { "contents.portfolio.pid": { "$not": { "$regex": "^" + pid + "$" } } } }) };
          whereQuery["$and"].push({ desid: req.body.desid });
          contentsArr = await back.mongoPick(collection, [ whereQuery, contentsProjectQuery ], { selfMongo, sort: sortQuery });

          res.send(JSON.stringify({
            contentsArr: contentsArr,
            designers: designers.frontMode(),
          }));

        }

      } else if (req.body.mode === "index") {

        indexSliceNumber = 9;

        contentsProjectQuery = {
          conid: 1,
          desid: 1,
          cliid: 1,
          proid: 1,
          service: 1,
          photos: 1,
          "contents.portfolio.pid": 1,
          "contents.portfolio.date": 1,
          "contents.portfolio.spaceInfo": 1,
          "contents.portfolio.title": 1,
          "contents.portfolio.color": 1,
          "contents.portfolio.detailInfo": 1,
          "contents.review.rid": 1,
          "contents.review.date": 1,
          "contents.review.title": 1,
          "contents.review.detailInfo": 1,
        };

        whereQuery = { "$and": hideContents.map((pid) => { return { "contents.portfolio.pid": { "$not": { "$regex": "^" + pid + "$" } } } }) };
        whereQuery["$and"].push({ "contents.portfolio.title.main": { "$not": { "$regex": "제목을 입력해"} } });

        contentsArr_raw = await back.mongoPick(collection, [ whereQuery, contentsProjectQuery ], { selfMongo });
        reviewArr = contentsArr_raw.filter((obj) => { return !hideContents.includes(obj.contents.portfolio.pid); }).filter((obj) => { return !/999/gi.test(obj.contents.review.rid); });
        indexArr = contentsArr_raw.filter((obj) => { return !hideContents.includes(obj.contents.portfolio.pid); });

        contentsArr.sort((a, b) => {
          return Number(b.contents.portfolio.detailInfo.sort.key9) - Number(a.contents.portfolio.detailInfo.sort.key9);
        });
        reviewArr.sort((a, b) => {
          return b.contents.review.detailInfo.order - a.contents.review.detailInfo.order;
        });
        indexArr.sort((a, b) => {
          return Number(b.contents.portfolio.detailInfo.sort.key8) - Number(a.contents.portfolio.detailInfo.sort.key8);
        });

        contentsArr = contentsArr.slice(0, indexSliceNumber);
        reviewArr = reviewArr.slice(0, indexSliceNumber);
        indexArr = indexArr.slice(0, indexSliceNumber * 2);

        res.send(JSON.stringify({ contentsArr, reviewArr, indexArr }));

      } else if (req.body.mode === "magazine") {

        contentsArr_raw = await back.mongoRead("magazine", {}, { selfMongo });
        contentsArr_raw.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });

        if (req.body.mid !== undefined) {
          contentsArr = contentsArr_raw.filter((obj) => {
            return obj.mid === req.body.mid;
          });
        } else {
          contentsArr = contentsArr_raw.map((obj) => {
            let contents;
            contents = equalJson(JSON.stringify(obj.contents));
            contents.detail = contents.detail.slice(0, 2);
            return {
              magid: obj.magid,
              mid: obj.mid,
              date: obj.date,
              editor: obj.editor,
              contents
            }
          })
        }

        res.send(JSON.stringify({
          contentsArr: contentsArr,
        }));

      }

    } catch (e) {
      logger.error("Log Console 서버 문제 생김 (rou_post_getContents): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_getLength = function () {
  const instance = this;
  const back = this.back;
  const { equalJson, objectDeepCopy } = this.mother;
  let obj = {};
  obj.link = [ "/getLength" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const selfMongo = instance.mongo;
      const selfCoreMongo = instance.mongo;
      let whereQuery, projectQuery;
      let contentsLength, projectLength, designerLength;
      let contentsArr, projectArr, designerArr;

      whereQuery = {};
      projectQuery = {
        conid: 1,
      };
      contentsArr = await back.mongoPick("contents", [ objectDeepCopy(whereQuery), objectDeepCopy(projectQuery) ], { selfMongo: selfMongo });
      contentsLength = contentsArr.length;

      whereQuery = { desid: { $regex: "^d" } };
      projectQuery = {
        proid: 1,
        desid: 1,
      };
      projectArr = await back.mongoPick("project", [ objectDeepCopy(whereQuery), objectDeepCopy(projectQuery) ], { selfMongo: selfCoreMongo });
      projectLength = projectArr.length;

      whereQuery = {};
      projectQuery = {
        desid: 1,
      };
      designerArr = await back.mongoPick("designer", [ objectDeepCopy(whereQuery), objectDeepCopy(projectQuery) ], { selfMongo: selfMongo });
      designerLength = designerArr.length;

      res.send(JSON.stringify({
        contents: contentsLength,
        project: projectLength,
        designer: designerLength,
      }));

    } catch (e) {
      logger.error("Log Console 서버 문제 생김 (rou_post_getLength): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_updateImagesOrder = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const { equalJson, objectDeepCopy, requestSystem } = this.mother;
  let obj = {};
  obj.link = [ "/updateImagesOrder" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const { pid, data, contents, title, photo } = equalJson(req.body);
      const { apart, wording: titleWording, pyeong, service } = title;
      const collection = "contents";
      const selfMongo = instance.mongolocal;
      const selfCoreMongo = instance.mongo;
      let whereQuery, updateQuery;
      let updatedContents;
      let photoUpdateBoo;

      photoUpdateBoo = (photo === 1 || photo === '1');
      whereQuery = { "contents.portfolio.pid": pid };
      updateQuery = {};
      updateQuery["contents.portfolio.contents.detail"] = contents;
      updateQuery["contents.portfolio.detailInfo.photodae"] = [ data.filter((o) => { return o.gs === "s" }).filter((o) => { return o.dae })[0].fromIndex, data.filter((o) => { return o.gs === "g" }).filter((o) => { return o.dae })[0].fromIndex ];
      updateQuery["contents.portfolio.spaceInfo.space"] = apart;
      updateQuery["contents.portfolio.spaceInfo.pyeong"] = pyeong;
      updateQuery["contents.portfolio.detailInfo.service"] = service;
      updateQuery["contents.portfolio.title.main"] = titleWording + ", " + apart + " " + String(pyeong) + "py " + service;
      updateQuery["contents.portfolio.title.sub"] = titleWording + ", " + apart + " " + service;

      await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo });
      await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo: selfCoreMongo });

      updatedContents = (await back.mongoRead(collection, whereQuery, { selfMongo: selfCoreMongo }))[0];
      delete updatedContents._id;

      res.send(JSON.stringify({ contents: updatedContents }));

    } catch (e) {
      console.log(e);
      logger.error("Log Console 서버 문제 생김 (rou_post_updateImagesOrder): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_updateReviewInfo = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const { equalJson, objectDeepCopy, requestSystem } = this.mother;
  let obj = {};
  obj.link = [ "/updateReviewInfo" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const { pid, words, mode } = equalJson(req.body);
      const collection = "contents";
      const selfMongo = instance.mongolocal;
      const selfCoreMongo = instance.mongo;
      let whereQuery, updateQuery;

      whereQuery = { "contents.portfolio.pid": pid };
      updateQuery = {};

      if (mode === "title") {
        updateQuery["contents.review.title.main"] = words.trim();
        updateQuery["contents.review.title.sub"] = words.trim();
      } else if (mode === "story") {
        updateQuery["contents.portfolio.contents.detail.0.contents"] = words.trim();
      }

      await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo });
      await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo: selfCoreMongo });
      res.send(JSON.stringify({ message: "done" }));

    } catch (e) {
      console.log(e);
      logger.error("Log Console 서버 문제 생김 (rou_post_updateImagesOrder): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_updateAddressRegion = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const { equalJson, objectDeepCopy, requestSystem } = this.mother;
  let obj = {};
  obj.link = [ "/updateAddressRegion" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const { pid, address: apart, region } = equalJson(req.body);
      const collection = "contents";
      const selfMongo = instance.mongolocal;
      const selfCoreMongo = instance.mongo;
      let whereQuery, updateQuery;
      let updatedContents;
      let titleWording;
      let originalContents;
      let pyeong;
      let service;

      [ originalContents ] = await back.mongoRead(collection, { "contents.portfolio.pid": pid }, { selfMongo: selfCoreMongo });
      titleWording = originalContents.contents.portfolio.title.main.split(", ")[0];
      pyeong = originalContents.contents.portfolio.spaceInfo.pyeong;
      service = originalContents.contents.portfolio.detailInfo.service;

      whereQuery = { "contents.portfolio.pid": pid };
      updateQuery = {};
      updateQuery["contents.portfolio.spaceInfo.space"] = apart;
      updateQuery["contents.portfolio.spaceInfo.region"] = region;
      updateQuery["contents.portfolio.title.main"] = titleWording + ", " + apart + " " + String(pyeong) + "py " + service;
      updateQuery["contents.portfolio.title.sub"] = titleWording + ", " + apart + " " + service;

      await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo });
      await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo: selfCoreMongo });

      updatedContents = (await back.mongoRead(collection, whereQuery, { selfMongo: selfCoreMongo }))[0];
      delete updatedContents._id;

      res.send(JSON.stringify({ contents: updatedContents }));

    } catch (e) {
      console.log(e);
      logger.error("Log Console 서버 문제 생김 (rou_post_updateAddressRegion): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_updateKey9Order = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const { equalJson, objectDeepCopy, requestSystem } = this.mother;
  let obj = {};
  obj.link = [ "/updateKey9Order" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const { pid, order } = equalJson(req.body);
      const collection = "contents";
      const selfMongo = instance.mongolocal;
      const selfCoreMongo = instance.mongo;
      let whereQuery, updateQuery;
      let updatedContents;
      let titleWording;

      whereQuery = { "contents.portfolio.pid": pid };
      updateQuery = {};
      updateQuery["contents.portfolio.detailInfo.sort.key9"] = String(order).replace(/[^0-9]/gi, '');

      await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo });
      await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo: selfCoreMongo });

      updatedContents = (await back.mongoRead(collection, whereQuery, { selfMongo: selfCoreMongo }))[0];
      delete updatedContents._id;

      res.send(JSON.stringify({ contents: updatedContents }));

    } catch (e) {
      console.log(e);
      logger.error("Log Console 서버 문제 생김 (rou_post_updateKey9Order): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_updateSlideOrder = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const { equalJson, objectDeepCopy, requestSystem } = this.mother;
  let obj = {};
  obj.link = [ "/updateSlideOrder" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const { pid, order, index } = equalJson(req.body);
      const collection = "contents";
      const selfMongo = instance.mongolocal;
      const selfCoreMongo = instance.mongo;
      let whereQuery, updateQuery;
      let updatedContents;

      whereQuery = { "contents.portfolio.pid": pid };
      updateQuery = {};
      updateQuery["contents.portfolio.detailInfo.slide." + String(Number(order) - 1)] = Number(index);

      await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo });
      await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo: selfCoreMongo });

      res.send(JSON.stringify({ message: "done" }));

    } catch (e) {
      console.log(e);
      logger.error("Log Console 서버 문제 생김 (rou_post_updateSlideOrder): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_errorMessage = function () {
  const instance = this;
  const { equalJson } = this.mother;
  let obj;
  obj = {};
  obj.link = [ "/errorMessage" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.text === undefined) {
        throw new Error("invaild post, must be text");
      }
      const { text } = req.body;
      await logger.error(text);
      res.send(JSON.stringify({ message: "done" }));
    } catch (e) {
      logger.error("Static Lounge 서버 문제 생김 (rou_post_errorMessage): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_getAnalytics = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const parser = require("ua-parser-js");
  const { equalJson, ipParsing, sleep } = this.mother;
  let obj;
  obj = {};
  obj.link = [ "/getAnalytics" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const collection = "homeliaisonAnalytics";
      const rawUserAgent = req.useragent;
      const emptyIp = address.frontinfo.ip.outer;
      const { source: userAgent, browser, os, platform } = rawUserAgent;
      let name;
      let custom;
      let ip, referer;
      let thisData;
      let thisId;
      let ipObj;
      let safeNum;
      let parserResult;
      let user;
      let temp;

      thisData = equalJson(req.body);

      ip = null;
      if (typeof thisData.info === "object" && thisData.info !== null) {
        ip = thisData.info.ip;
        referer = thisData.info.referer;
        user = thisData.info.userAgent;
      } else {
        temp = (req.headers["x-forwarded-for"] === undefined ? req.socket.remoteAddress : req.headers["x-forwarded-for"]);
        if (typeof temp !== "string") {
          ip = emptyIp;
        } else {
          ip = temp.trim().replace(/[^0-9\.]/gi, '');
        }
        referer = (req.headers.referer === undefined ? "" : req.headers.referer);
        user = userAgent;
      }

      if (typeof ip !== "string") {
        ip = emptyIp;
      }

      if (typeof thisData.id === "string") {
        thisId = thisData.id;
      } else {
        thisId = "(not set)";
      }

      name = "fromServer_" + thisData.action;

      ipObj = await ipParsing(ip);

      safeNum = 0;
      while (Object.keys(ipObj).length === 0) {
        if (safeNum > 10) {
          break;
        }
        await sleep(100);
        ipObj = await ipParsing(ip);
        safeNum = safeNum + 1;
      }

      custom = {
        id: thisData.id,
        network: {
          ip,
          referer,
          userAgent,
          browser,
          os,
          platform,
          mobile: rawUserAgent.isMobile,
          ...ipObj
        },
        date: (new Date()).valueOf(),
        data: {
          page: thisData.page,
          action: thisData.action,
          raw: thisData.data,
        }
      };

      thisData.date = new Date();
      thisData.network = { ...ipObj };
      thisData.network.ip = ip;

      try {
        parserResult = parser(user);

        delete parserResult.cpu;
        delete parserResult.ua;
        delete parserResult.engine;

        parserResult.browser = parserResult.browser.name;
        parserResult.os.browser = parserResult.browser;

        delete parserResult.browser;

        if (parserResult.os.name === "Windows") {
          if (parserResult.device.vendor === undefined) {
            parserResult.device.vendor = "Unknown";
          }
          if (parserResult.device.model === undefined) {
            parserResult.device.model = "Unknown";
          }
          parserResult.device.type = "desktop";
        } else if (/Mac OS/gi.test(parserResult.os.name)) {
          parserResult.device.type = "desktop";
        }

        if (parserResult.device.vendor === undefined) {
          parserResult.device.vendor = "Unknown";
        }
        if (parserResult.device.model === undefined) {
          parserResult.device.model = "Unknown";
        }
        if (parserResult.device.type === undefined) {
          parserResult.device.type = "desktop";
        }

        thisData.device = equalJson(JSON.stringify(parserResult));
      } catch {
        thisData.device = {};
      }
      if (thisData.network.ip.trim().replace(/[^0-9\.]/gi, '') !== address.officeinfo.ghost.outer.trim().replace(/[^0-9\.]/gi, '')) {
        await back.mongoCreate(collection, thisData, { selfMongo: instance.mongolocal });
      }
      instance.facebook.conversionEvent({
        name,
        data: {
          ip: ip,
          userAgent: userAgent,
        },
        custom,
      }).catch((err) => {
        logger.error("Static Lounge 서버 문제 생김 (rou_post_getAnalytics): " + err.message).catch((e) => { console.log(e); });
      });

      res.send(JSON.stringify({ message: "done" }));
    } catch (e) {
      console.log(e);
      logger.error("Static Lounge 서버 문제 생김 (rou_post_getAnalytics): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_updateContents = function () {
  const instance = this;
  const back = this.back;
  const { equalJson, messageLog, messageSend } = this.mother;
  let obj = {};
  obj.link = [ "/updateContents" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.whereQuery === undefined || req.body.updateQuery === undefined) {
        throw new Error("invaild post");
      }

      const selfMongo = instance.mongo;
      const { whereQuery, updateQuery } = equalJson(req.body);
      let data;

      if (typeof whereQuery !== "object" || whereQuery === null) {
        throw new Error("invaild query object");
      }
      if (Object.keys(whereQuery).length === 0) {
        throw new Error("query ban");
      }
      if (typeof updateQuery !== "object" || updateQuery === null) {
        throw new Error("invaild query object");
      }

      await back.updateContents([ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });
      data = await back.updateContents([ whereQuery, updateQuery ], { selfMongo });
      res.send(JSON.stringify({ message: data }));

    } catch (e) {
      logger.error("Log console 문제 생김 (rou_post_updateContents): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_getClientReport = function () {
  const instance = this;
  const back = this.back;
  const { equalJson, messageLog, messageSend, dateToString } = this.mother;
  let obj = {};
  obj.link = [ "/getClientReport" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.fromYear === undefined || req.body.fromMonth === undefined || req.body.toYear === undefined || req.body.toMonth === undefined) {
        throw new Error("invalid post");
      }
      const { fromYear, fromMonth, toYear, toMonth } = equalJson(req.body);
      const selfMongo = instance.mongolocal;
      let fromDate, toDate;
      let monthlyAnalytics;
      let thisFrom, thisTo;
      let tempRows;
      let tempRows2;

      fromDate = new Date(fromYear, fromMonth - 1, 1);
      toDate = new Date(toYear, toMonth, 1);

      monthlyAnalytics = await back.mongoRead("complexAnalytics", {
        $and: [
          { "date.from": { $gte: fromDate }, },
          { "date.to": { $lte: toDate } },
        ]
      }, { selfMongo });

      monthlyAnalytics = monthlyAnalytics.map((obj) => {
        let resultObj;
        let copiedDate;

        copiedDate = new Date(JSON.stringify(obj.date.from).slice(1, -1));
        copiedDate.setDate(copiedDate.getDate() + 10);

        resultObj = {};

        resultObj.standard = copiedDate;
        resultObj.year = copiedDate.getFullYear();
        resultObj.month = copiedDate.getMonth() + 1;
        resultObj.mau = obj.data.users.total;

        return resultObj;
      })

      monthlyAnalytics.sort((a, b) => {
        return a.standard.valueOf() - b.standard.valueOf();
      })

      for (let obj of monthlyAnalytics) {
        thisFrom = new Date(obj.year, obj.month - 1, 1);
        thisTo = new Date(obj.year, obj.month - 1, 1);
        thisTo.setMonth(thisTo.getMonth() + 1);

        tempRows = await back.mongoRead("dailyClients", {
          $and: [
            { "date.from": { $gte: thisFrom }, },
            { "date.to": { $lte: thisTo } },
          ]
        }, { selfMongo });

        obj.adClients = tempRows.map((obj) => { return obj.data.detail }).flat().filter((obj2) => {
          return obj2.users.some((obj3) => {
            if (obj3 === null) {
              return false;
            } else {
              return (obj3.source.campaign.filter((str) => { return str.trim() !== "(not set)"; }).length > 0);
            }
          })
        }).length;

        tempRows2 = await back.mongoRead("dailyCampaign", {
          $and: [
            { "date.from": { $gte: thisFrom }, },
            { "date.to": { $lte: thisTo } },
          ]
        }, { selfMongo });

        obj.charge = tempRows2.map((obj2) => { return obj2.value.charge }).reduce((acc, curr) => { return acc + curr }, 0);
      }

      res.send(JSON.stringify(monthlyAnalytics));

    } catch (e) {
      logger.error("Log console 문제 생김 (rou_post_getClientReport): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_clientAnalytics = function () {
  const instance = this;
  const back = this.back;
  const { equalJson } = this.mother;
  let obj = {};
  obj.link = [ "/clientAnalytics" ];
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
      const collection = "clientAnalytics";
      let rows;
      let projectKeys;

      if (mode === "get") {

        if (req.body.whereQuery === undefined || req.body.projectQuery === undefined) {
          throw new Error("invalid post");
        }
        const { whereQuery, projectQuery } = equalJson(req.body);
        if (typeof whereQuery !== "object" || whereQuery === null) {
          throw new Error("invalid where query");
        }
        if (typeof projectQuery !== "object" || projectQuery === null) {
          throw new Error("invalid project query");
        }

        projectKeys = Object.keys(projectQuery);
        if (projectKeys.length === 0) {
          rows = await back.mongoRead(collection, whereQuery, { selfMongo });
        } else {
          rows = await back.mongoPick(collection, [ whereQuery, projectQuery ], { selfMongo });
        }

        rows.sort((a, b) => { return b.client.requests[0].request.timeline.valueOf() - a.client.requests[0].request.timeline.valueOf() });

        res.send(JSON.stringify(rows));

      } else {
        throw new Error("invalid mode");
      }

    } catch (e) {
      logger.error("Log console 문제 생김 (rou_post_clientAnalytics): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_clientAnalytics2 = function () {
  const instance = this;
  const back = this.back;
  const { equalJson, sleep } = this.mother;
  let obj = {};
  obj.link = [ "/clientAnalytics2" ];
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
      const { mode } = equalJson(req.body);
      const collection = "clientAnalytics";
      const emptyDateValue = (new Date(2000, 0, 1)).valueOf();
      let rows;
      let projectKeys;
      let startRequestTimeline;
      let coreWhereQuery;
      let coreRows;
      let thisClient;
      let finalRows;
      let tempObj;
      let copiedObj;
      let projects, projects2;
      let cliidArr_raw, cliidArr;
      let thisProject;
      let projectArr;
      let startDate, endDate;
      let endDateCopied;
      let startDateCopied;
      let whereQuery;

      if (mode === "get") {

        if (req.body.standardDate === undefined) {
          if (req.body.startDate === undefined || req.body.endDate === undefined) {
            throw new Error("invalid post");
          }
          ({ startDate, endDate } = equalJson(req.body));
        } else {
          ({ standardDate: startDate } = equalJson(req.body));
          endDate = new Date();
        }

        startDateCopied = new Date(JSON.stringify(startDate).slice(1, -1));
        startDate = new Date(startDateCopied.getFullYear(), startDateCopied.getMonth(), startDateCopied.getDate(), 0, 0, 0);

        endDateCopied = new Date(JSON.stringify(endDate).slice(1, -1));
        endDate = new Date(endDateCopied.getFullYear(), endDateCopied.getMonth(), endDateCopied.getDate(), 0, 0, 0);
        endDate.setDate(endDate.getDate() + 1);

        rows = await back.mongoPick(collection, [ {
          "client.requests": {
            $elemMatch: {
              "request.timeline": { $gte: startDate, $lt: endDate }
            }
          }
        }, {
          cliid: 1,
          sessions: 1,
          source: 1,
        } ], { selfMongo });
        
        startRequestTimeline = new Date(JSON.stringify(startDate).slice(1, -1));
        startRequestTimeline.setDate(startRequestTimeline.getDate() - 3);
        if (rows.length > 0) {
          coreWhereQuery = {
            $or: [
              ...rows.map((o) => { return { cliid: o.cliid } }),
              {
                requests: {
                  $elemMatch: {
                    "request.timeline": { $gte: startRequestTimeline, $lt: endDate }
                  }
                }
              }
            ]
          }
        } else {
          coreWhereQuery = {
            requests: {
              $elemMatch: {
                "request.timeline": { $gte: startRequestTimeline, $lt: endDate }
              }
            }
          };
        }

        coreRows = (await back.getClientsByQuery(coreWhereQuery, { selfMongo: selfCoreMongo })).toNormal();
        for (let obj of rows) {
          thisClient = coreRows.find((c) => { return c.cliid === obj.cliid }) === undefined ? null : coreRows.find((c) => { return c.cliid === obj.cliid });
          if (thisClient !== null) {
            obj.client = equalJson(JSON.stringify(thisClient));
          } else {
            obj.client = (await back.getClientById(obj.cliid, { selfMongo: selfCoreMongo })).toNormal();
          }
        }

        cliidArr = [ ...new Set(rows.map((o) => { return o.cliid })) ];
        if (cliidArr.length > 0) {
          projects = await back.mongoPick("project", [
            {
              $or: cliidArr.map((cliid) => { return { cliid } })
            },
            {
              proid: 1,
              cliid: 1,
              desid: 1,
              service: 1,
              "proposal.date": 1,
              "process.status": 1,
              "process.contract": 1,
            }
          ], { selfMongo: selfCoreMongo });
        } else {
          projects = [];
        }

        projects.sort((a, b) => { return a.proposal.date.valueOf() - b.proposal.date.valueOf() });
        rows.sort((a, b) => {
          return b.client.requests[0].request.timeline.valueOf() - a.client.requests[0].request.timeline.valueOf();
        });

        finalRows = [];
        for (let obj of rows) {
          if (obj.cliid !== "c1801_aa01s") {
            for (let i = 0; i < obj.client.requests.length; i++) {
              copiedObj = equalJson(JSON.stringify(obj));
              tempObj = { ...copiedObj };
              tempObj.cliid = obj.cliid;
              tempObj.client = equalJson(JSON.stringify(obj.client));
              tempObj.client.requests = [
                equalJson(JSON.stringify(obj.client.requests[i]))
              ];
              tempObj.requestNumber = i;
              projectArr = projects.filter((p) => { return p.cliid === obj.cliid });
              projectArr.sort((a, b) => { return a.proposal.date.valueOf() - b.proposal.date.valueOf() });
              thisProject = null;
              for (let p of projectArr) {
                if (obj.client.requests[i].request.timeline.valueOf() <= p.proposal.date.valueOf()) {
                  thisProject = equalJson(JSON.stringify(p));
                  break;
                }
              }
              if (thisProject !== null) {
                if (thisProject.process.contract.first.date.valueOf() > emptyDateValue) {
                  if (!/드랍/gi.test(thisProject.process.status)) {
                    tempObj.client.requests[0].analytics.response.status = "진행";
                  } else {
                    tempObj.client.requests[0].analytics.response.status = "드랍";
                  }
                }
              }
              tempObj.project = equalJson(JSON.stringify(thisProject));

              finalRows.push(equalJson(JSON.stringify(tempObj)));
            }
          }
        }

        if (req.body.initRequest !== true && req.body.initRequest !== "true") {
          finalRows = finalRows.filter((o) => {
            return o.client.requests[0].request.timeline.valueOf() >= startDate.valueOf() && o.client.requests[0].request.timeline.valueOf() <= endDate.valueOf();
          });
          finalRows.sort((a, b) => {
            return b.client.requests[0].request.timeline.valueOf() - a.client.requests[0].request.timeline.valueOf();
          });
        }

        res.send(JSON.stringify(finalRows));

      } else if (mode === "pick") {

        if (req.body.cliid === undefined) {
          throw new Error("invalid post");
        }
        const { cliid } = equalJson(req.body);
        
        if (req.body.projectQuery !== undefined) {
          const { projectQuery } = equalJson(req.body);
          rows = await back.mongoPick(collection, [ { cliid }, projectQuery ], { selfMongo });
        } else {
          rows = await back.mongoRead(collection, { cliid }, { selfMongo });
        }

        if (rows.length > 0) {
          res.send(JSON.stringify({ data: rows[rows.length - 1] }));
        } else {
          res.send(JSON.stringify({ data: null }));
        }

      } else if (mode === "query") {

        if (req.body.whereQuery === undefined || req.body.coreWhereQuery === undefined) {
          throw new Error("invalid post");
        }
        ({ whereQuery, coreWhereQuery } = equalJson(req.body));

        rows = await back.mongoPick(collection, [ whereQuery, {
          cliid: 1,
          sessions: 1,
          source: 1,
        } ], { selfMongo });
        
        coreRows = (await back.getClientsByQuery(coreWhereQuery, { selfMongo: selfCoreMongo })).toNormal();
        for (let obj of rows) {
          thisClient = coreRows.find((c) => { return c.cliid === obj.cliid }) === undefined ? null : coreRows.find((c) => { return c.cliid === obj.cliid });
          if (thisClient !== null) {
            obj.client = equalJson(JSON.stringify(thisClient));
          } else {
            obj.client = (await back.getClientById(obj.cliid, { selfMongo: selfCoreMongo })).toNormal();
          }
        }

        cliidArr = [ ...new Set(rows.map((o) => { return o.cliid })) ];
        if (cliidArr.length > 0) {
          projects = await back.mongoPick("project", [
            {
              $or: cliidArr.map((cliid) => { return { cliid } })
            },
            {
              proid: 1,
              cliid: 1,
              desid: 1,
              service: 1,
              "proposal.date": 1,
              "process.status": 1,
              "process.contract": 1,
            }
          ], { selfMongo: selfCoreMongo });
        } else {
          projects = [];
        }

        projects.sort((a, b) => { return a.proposal.date.valueOf() - b.proposal.date.valueOf() });
        rows.sort((a, b) => {
          return b.client.requests[0].request.timeline.valueOf() - a.client.requests[0].request.timeline.valueOf();
        });

        finalRows = [];
        for (let obj of rows) {
          if (obj.cliid !== "c1801_aa01s") {
            for (let i = 0; i < obj.client.requests.length; i++) {
              copiedObj = equalJson(JSON.stringify(obj));
              tempObj = { ...copiedObj };
              tempObj.cliid = obj.cliid;
              tempObj.client = equalJson(JSON.stringify(obj.client));
              tempObj.client.requests = [
                equalJson(JSON.stringify(obj.client.requests[i]))
              ];
              tempObj.requestNumber = i;
              projectArr = projects.filter((p) => { return p.cliid === obj.cliid });
              projectArr.sort((a, b) => { return a.proposal.date.valueOf() - b.proposal.date.valueOf() });
              thisProject = null;
              for (let p of projectArr) {
                if (obj.client.requests[i].request.timeline.valueOf() <= p.proposal.date.valueOf()) {
                  thisProject = equalJson(JSON.stringify(p));
                  break;
                }
              }
              if (thisProject !== null) {
                if (thisProject.process.contract.first.date.valueOf() > emptyDateValue) {
                  if (!/드랍/gi.test(thisProject.process.status)) {
                    tempObj.client.requests[0].analytics.response.status = "진행";
                  } else {
                    tempObj.client.requests[0].analytics.response.status = "드랍";
                  }
                }
              }
              tempObj.project = equalJson(JSON.stringify(thisProject));

              finalRows.push(equalJson(JSON.stringify(tempObj)));
            }
          }
        }

        finalRows.sort((a, b) => {
          return b.client.requests[0].request.timeline.valueOf() - a.client.requests[0].request.timeline.valueOf();
        });

        res.send(JSON.stringify(finalRows));

      } else {
        throw new Error("invalid mode");
      }

    } catch (e) {
      logger.error("Contents lounge 서버 문제 생김 (rou_post_clientAnalytics2): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_extractAnalytics = function () {
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
      const selfMongo = instance.mongolocal;
      const { mode } = equalJson(req.body);
      let collection;
      let fromDate, toDate;
      let whereQuery;
      let rows;

      if (mode === "daily") {

        if (req.body.fromDate === undefined || req.body.toDate === undefined) {
          throw new Error("invalid post 2");
        }

        ({ fromDate, toDate } = equalJson(req.body));
        collection = "dailyAnalytics";

        fromDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate(), 0, 0, 0);
        toDate = new Date(toDate.getFullYear(), toDate.getMonth(), toDate.getDate(), 0, 0, 0);

        whereQuery = {};
        whereQuery["$and"] = [];
        whereQuery["$and"].push({
          "date.from": {
            $gte: fromDate,
          }
        });
        whereQuery["$and"].push({
          "date.from": {
            $gte: fromDate,
          }
        });
        whereQuery["$and"].push({
          "date.from": {
            $lte: toDate,
          }
        });

        rows = await back.mongoRead(collection, whereQuery, { selfMongo });
        res.send(JSON.stringify(rows));

      } else if (mode === "charge" || mode === "campaign") {

        if (req.body.fromDate === undefined || req.body.toDate === undefined) {
          throw new Error("invalid post 2");
        }

        ({ fromDate, toDate } = equalJson(req.body));
        collection = "dailyCampaign";

        fromDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate(), 0, 0, 0);
        toDate = new Date(toDate.getFullYear(), toDate.getMonth(), toDate.getDate(), 0, 0, 0);

        whereQuery = {};
        whereQuery["$and"] = [];
        whereQuery["$and"].push({
          "date.from": {
            $gte: fromDate,
          }
        });
        whereQuery["$and"].push({
          "date.from": {
            $gte: fromDate,
          }
        });
        whereQuery["$and"].push({
          "date.from": {
            $lte: toDate,
          }
        });
        if (mode === "charge") {
          whereQuery["$and"].push({
            "information.mother": {
              $ne: "unknown"
            }
          });
        }

        rows = await back.mongoRead(collection, whereQuery, { selfMongo });
        res.send(JSON.stringify(rows));

      } else {
        throw new Error("invalid mode");
      }


    } catch (e) {
      logger.error("Log console 문제 생김 (rou_post_extractAnalytics): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_requestScript = function () {
  const instance = this;
  const { requestSystem } = this.mother;
  let obj = {};
  obj.link = [ "/requestScript" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.url === undefined) {
        throw new Error("invaild post");
      }
      const responses = await requestSystem(global.decodeURIComponent(req.body.url));
      res.send(JSON.stringify({ data: responses.data }));
    } catch (e) {
      console.log(req);
      await logger.error("Static Lounge 서버 문제 생김 (rou_post_requestScript): " + e.message + " / " + global.decodeURIComponent(req.body.url));
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_resetContentsPhotoStatus = function () {
  const instance = this;
  const back = this.back;
  const { requestSystem, equalJson, objectDeepCopy } = this.mother;
  let obj = {};
  obj.link = [ "/resetContentsPhotoStatus" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.pid === undefined) {
        throw new Error("invaild post");
      }
      const { pid } = req.body;
      const collection = "contents";
      const selfMongo = instance.mongo;
      const selfLocalMongo = instance.mongo;
      let photo;
      let thisContents;
      let contentsDetail;
      let whereQuery;

      [ thisContents ] = await back.mongoRead(collection, { "contents.portfolio.pid": pid }, { selfMongo });
      contentsDetail = objectDeepCopy(thisContents.contents.portfolio.contents.detail);

      photo = thisContents.photos.detail.map((o) => { return o.index });
      contentsDetail[0].photo = [];
      if (contentsDetail.length < 2) {
        contentsDetail.push({
          photo: [],
          title: "space",
          contents: "",
        })
      }
      contentsDetail[1].photo = photo;
      for (let i = 2; i < contentsDetail.length; i++) {
        contentsDetail[i].photo = [];
      }

      await back.mongoUpdate(collection, [ { "contents.portfolio.pid": pid }, { "contents.portfolio.contents.detail": contentsDetail } ], { selfMongo });
      await back.mongoUpdate(collection, [ { "contents.portfolio.pid": pid }, { "contents.portfolio.contents.detail": contentsDetail } ], { selfMongo: selfLocalMongo });

      res.send(JSON.stringify({ message: "done" }));
    } catch (e) {
      console.log(req);
      await logger.error("Static Lounge 서버 문제 생김 (rou_post_resetContentsPhotoStatus): " + e.message + " / " + global.decodeURIComponent(req.body.url));
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_aspirantToDesigner = function () {
  const instance = this;
  const back = this.back;
  const work = this.work;
  const { requestSystem, equalJson, messageSend } = this.mother;
  let obj = {};
  obj.link = [ "/aspirantToDesigner" ];
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
      const { aspid } = equalJson(req.body);
      let aspirants, aspirant;
      let aspidArr;
      let designer;
  
      aspirants = await back.getAspirantsByQuery({ aspid: aspid }, { selfMongo: instance.mongo });
      aspirant = aspirants[0].toNormal();

      designer = aspirant.designer;

      aspidArr = [];
      aspidArr.push({ aspid: aspirant.aspid, contract: aspirant.contract.partnership.date });

      work.aspirantToDesigner(aspidArr, { selfMongo: instance.mongo }).then(() => {
        return messageSend({ text: designer + " 디자이너 등록을 완료하였어요! DE 2번 콘솔에서 확인해주세요!", channel: "#300_designer", voice: false, fairy: false });
      }).catch((err) => {
        console.log(err);
      });

      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      console.log(req);
      await logger.error("Static Lounge 서버 문제 생김 (rou_post_aspirantToDesigner): " + e.message + " / " + global.decodeURIComponent(req.body.url));
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_getContentsView = function () {
  const instance = this;
  const back = this.back;
  const { fileSystem, equalJson, requestSystem, sleep, dateToString } = this.mother;
  let obj;
  obj = {};
  obj.link = [ "/getContentsView" ];
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
      const collection = "contentsView";
      let rows;
      let data;
      rows = await back.mongoPick(collection, [ {}, { key: 1, date: 1 } ], { selfMongo });
      rows.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });

      if (mode === "pick" || mode === "get") {
        if (rows.length > 0) {
          [ data ] = await back.mongoRead(collection, { key: rows[0].key }, { selfMongo });
          res.send(JSON.stringify({ data, date: data.date }));
        } else {
          res.send(JSON.stringify({ data: null }));
        }
      } else {
        throw new Error("invalid mode");
      }

    } catch (e) {
      logger.error("Contents lounge 서버 문제 생김 (rou_post_getContentsView): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_storeContentsView = function () {
  const instance = this;
  const { fileSystem, equalJson, requestSystem, sleep, dateToString } = this.mother;
  let obj;
  obj = {};
  obj.link = [ "/storeContentsView" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      instance.storeContentsView(instance.mongolocal, instance.mongo, instance.mongolocal, logger).then((resultMessage) => {
        if (resultMessage.message !== "done") {
          throw new Error("store web contents view fail");
        }
        return sleep(500);
      }).catch((err) => {
        logger.error("Contents lounge 서버 문제 생김 (rou_post_storeContentsView): " + err.message).catch((e) => { console.log(e); });
        console.log(err);
      });

      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      logger.error("Contents lounge 서버 문제 생김 (rou_post_storeContentsView): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_syncClientBudget = function () {
  const instance = this;
  const back = this.back;
  const { equalJson, sleep, stringToDate, dateToString, autoComma } = this.mother;
  let obj = {};
  obj.link = [ "/syncClientBudget" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const toNormal = true;
      const selfCoreMongo = instance.mongo;
      const selfMongo = instance.mongolocal;
      const collection = "clientEvaluation";
      const budgetArr = [
        "500만원 이하",
        "1,000만원",
        "1,500만원",
        "2,000만원",
        "3,000만원",
        "4,000만원",
        "5,000만원 이상",
        "6,000만원 이상",
        "7,000만원 이상",
        "8,000만원 이상",
        "9,000만원 이상",
        "1억원 이상",
      ];
      let rows;
      let projects, clients;
      let proidArr, cliidArr;
      let thisProject, thisClient;
      let thisRequestNumber;
      let whereQuery, updateQuery;
      let tempString;
      let thisIndex;
      let ago;
      let contentsRows;

      (async function () {
        try {
          ago = new Date();
          ago.setMonth(ago.getMonth() - 2);
      
          rows = await back.mongoRead(collection, { date: { $gte: ago } }, { selfMongo });
          proidArr = rows.map((o) => { return { proid: o.proid } });
          cliidArr = rows.map((o) => { return { cliid: o.cliid } });
      
          projects = await back.getProjectsByQuery({ $or: proidArr }, { selfMongo: selfCoreMongo, toNormal });
          clients = await back.getClientsByQuery({ $or: cliidArr }, { selfMongo: selfCoreMongo, toNormal });
      
          for (let obj of rows) {
      
            thisProject = projects.find((p) => { return p.proid === obj.proid });
            thisClient = clients.find((c) => { return c.cliid === obj.cliid });
            thisRequestNumber = 0;
            for (let i = 0; i < thisClient.requests.length; i++) {
              if (thisClient.requests[i].request.timeline.valueOf() <= thisProject.proposal.date.valueOf()) {
                thisRequestNumber = i;
                break;
              }
            }
      
            whereQuery = { cliid: obj.cliid };
            updateQuery = {};
      
            tempString = autoComma(obj.spend.total >= obj.spend.styling ? obj.spend.total : obj.spend.styling, true);
            thisIndex = budgetArr.findIndex((str) => { return (new RegExp(tempString, "gi")).test(str) });
      
            if (thisIndex !== -1) {
              updateQuery["requests." + String(thisRequestNumber) + ".request.budget"] = budgetArr[thisIndex];
              await back.updateClient([ whereQuery, updateQuery ], { selfMongo: selfCoreMongo });
              contentsRows = await back.getContentsArrByQuery({ proid: thisProject.proid }, { selfMongo: selfCoreMongo });
              if (contentsRows.length > 0) {
                await back.updateContents([ { conid: contentsRows[0].conid }, {
                  "contents.portfolio.spaceInfo.budget": budgetArr[thisIndex],
                } ], { selfMongo: selfCoreMongo });
              }
            }
          }

          logger.log("budget sync done").catch((err) => { console.log(err) });

        } catch (e) {
          console.log(e);
        }
      })().catch((err) => { console.log(err); })

      res.send(JSON.stringify({ message: "will do" }));

    } catch (e) {
      logger.error("Contents lounge 서버 문제 생김 (rou_post_syncClientBudget): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_shareGoogleId = function () {
  const instance = this;
  const back = this.back;
  const { equalJson, sleep } = this.mother;
  let obj = {};
  obj.link = [ "/shareGoogleId" ];
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
      const collection = "shareGoogleId";
      const { mode } = equalJson(req.body);
      let json;
      let rows;
      let resultObj;

      if (mode === "store") {
        const { proid, cliid, desid, pid, zipIdDesigner, zipIdClient } = equalJson(req.body);

        json = {
          proid,
          cliid,
          desid,
          pid,
          date: new Date(),
          google: {
            designer: zipIdDesigner,
            client: zipIdClient,
            original: zipIdDesigner,
            watermark: zipIdClient,
          }
        };

        rows = await back.mongoRead(collection, { proid }, { selfMongo });
        if (rows.length > 0) {
          await back.mongoDelete(collection, { proid }, { selfMongo });
        }
        await back.mongoCreate(collection, json, { selfMongo });

        resultObj = { message: "done" };

      } else if (mode === "get") {

        const { proid } = equalJson(req.body);
        rows = await back.mongoRead(collection, { proid }, { selfMongo });
        if (rows.length > 0) {
          rows.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });
          resultObj = { data: rows[0] };
        } else {
          resultObj = { data: null };
        }

      } else {
        throw new Error("invalid post");
      }

      res.send(JSON.stringify(resultObj));

    } catch (e) {
      logger.error("Contents lounge 서버 문제 생김 (rou_post_shareGoogleId): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_storeHoliday = function () {
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
      console.log(e);
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
          console.log(resultHolidayArr);
          safeNum = 0;
          while (!Array.isArray(resultHolidayArr)) {
            if (safeNum > 100) {
              break;
            }
            await sleep(1000);
            resultHolidayArr = await returnHolidayArr();
            console.log(resultHolidayArr);
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

StaticRouter.prototype.rou_post_getHoliday = function () {
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
        if (rows[0].data === null) {
          if (rows.find((o) => { return Array.isArray(o.data) }) !== undefined) {
            res.send(JSON.stringify({ holiday: rows.find((o) => { return Array.isArray(o.data) }).data }));
          } else {
            throw new Error("data error");
          }
        } else {
          res.send(JSON.stringify({ holiday: rows[0].data }));
        }
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

StaticRouter.prototype.rou_post_foreContents = function () {
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

StaticRouter.prototype.rou_post_metaWebhook = function () {
  const instance = this;
  const meta = this.facebook;
  const { fileSystem, equalJson, requestSystem, sleep, dateToString } = this.mother;
  let obj;
  obj = {};
  obj.link = [ "/metaWebhook" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const selfMongo = instance.mongolocal;
      const dataString = JSON.stringify(req.body, null, 2);

      logger.error("meta webhook => \n\n" + dataString).catch((err) => { console.log(err.message) });

      res.send("homeliaison");
    } catch (e) {
      logger.error("Contents lounge 서버 문제 생김 (rou_post_metaWebhook): " + e.message).catch((e) => { console.log(e); });
      res.send("error");
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_metaComplex = function () {
  const instance = this;
  const meta = this.facebook;
  const naver = this.naver;
  const google = this.google;
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

StaticRouter.prototype.rou_post_metaInstant = function () {
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

StaticRouter.prototype.rou_post_kakaoComplex = function () {
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

StaticRouter.prototype.rou_post_getAdsComplex = function () {
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

StaticRouter.prototype.rou_post_getSnsComplex = function () {
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

StaticRouter.prototype.rou_post_evaluationSubmit = function () {
  const instance = this;
  const back = this.back;
  const kakao = this.kakao;
  const { equalJson, messageSend, dateToString, stringToDate, sleep, requestSystem } = this.mother;
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
      let thisClient;

      [ thisClient ] = await back.mongoPick("client", [ { cliid }, { cliid: 1, name: 1 } ], { selfMongo: selfCoreMongo });

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

      messageSend({ text: thisClient.name + " 고객님께서 평가를 완료하였습니다!", channel: "#200_web", voice: false, fairy: false }).then(() => {
        return requestSystem("https://" + instance.address.officeinfo.ghost.host + ":3000/syncEvaluationContents", { message: "do it" }, { headers: { "Content-Type": "application/json" } });
      }).catch((err) => {
        console.log(err);
      });

      res.send(JSON.stringify({ message: "done" }));

    } catch (e) {
      logger.error("Contents lounge 서버 문제 생김 (rou_post_evaluationSubmit): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_evaluationList = function () {
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

StaticRouter.prototype.rou_post_evaluationNotice = function () {
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

StaticRouter.prototype.rou_post_getAllContents = function () {
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

StaticRouter.prototype.rou_post_queryAnalytics = function () {
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

StaticRouter.prototype.setMembers = async function () {
  const instance = this;
  const back = this.back;
  const { fileSystem } = this.mother;
  try {
    this.members = await back.setMemberObj({ getMode: true, selfMongo: instance.mongo });
  } catch (e) {
    await logger.error("Static lounge 서버 문제 생김 (setMembers): " + e.message);
    console.log(e);
  }
}

StaticRouter.prototype.getAll = function () {
  let result, result_arr;

  result = { get: [], post: [] };
  result_arr = Object.keys(StaticRouter.prototype);

  for (let i of result_arr) { if (/^rou_get/g.test(i)) {
    result.get.push((this[i])());
  }}

  for (let i of result_arr) { if (/^rou_post/g.test(i)) {
    result.post.push((this[i])());
  }}

  return result;
}

module.exports = StaticRouter;
