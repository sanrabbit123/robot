const StaticRouter = function (MONGOC, MONGOLOCALC, MONGOCONSOLEC, MONGOLOGC) {
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
  const LocalDevices = require(`${process.cwd()}/apps/localDevices/localDevices.js`);

  this.mother = new Mother();
  this.back = new BackMaker();
  this.work = new BackWorker();
  this.address = require(`${process.cwd()}/apps/infoObj.js`);
  this.host = this.address.officeinfo.ghost.host;
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

  this.staticConst = process.env.HOME + "/samba";
  this.sambaToken = "__samba__";
  this.homeliaisonOfficeConst = this.address.officeinfo.ghost.file.office;
  this.designerPhotoConst = "사진_등록_포트폴리오";
  this.designerFolderConst = "디자이너";

  this.centrex = {
    host: "centrex.uplus.co.kr",
    sessionConst: "PHPSESSID",
    sessionValue: "1df507d66618fa05fd4e82bf26176c73",
  };

  this.vaildHost = [
    this.address.frontinfo.host,
    this.address.secondinfo.host,
    this.address.transinfo.host,
    this.address.backinfo.host,
    this.address.pythoninfo.host,
    this.address.testinfo.host,
    this.address.croninfo.host,
    this.address.officeinfo.ghost.host,
    "home-liaison.servehttp.com",
    "localhost:3000",
    "192.168.0.14:3000",
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

//GET ---------------------------------------------------------------------------------------------

StaticRouter.prototype.rou_get_First = function () {
  const instance = this;
  const microsoft = this.microsoft;
  const { errorLog, diskReading } = this.mother;
  let obj = {};
  obj.link = "/:id";
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {

      if (req.params.id === "ssl") {
        const disk = await diskReading();
        res.send(JSON.stringify({ disk: disk.toArray() }));
      } else if (req.params.id === "disk") {
        const disk = await diskReading();
        res.send(JSON.stringify({ disk: disk.toArray() }));

      } else if (((req.params.id === "microsoft" && typeof req.query === "object") && req.query !== null) && typeof req.query.code === "string") {
        microsoft.codeToAccessToken(req.query.code).catch((err) => { console.log(err) });
        res.send(JSON.stringify({ message: "hi" }));
      } else {
        res.send(JSON.stringify({ message: "hi" }));
      }

    } catch (e) {
      errorLog("Static lounge 서버 문제 생김 (rou_get_First): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
    }
  }

  return obj;
}

//POST ---------------------------------------------------------------------------------------------

StaticRouter.prototype.rou_post_listFiles = function () {
  const instance = this;
  const { errorLog, fileSystem, shellExec, shellLink, leafParsing } = this.mother;
  const { staticConst, sambaToken } = this;
  let obj;
  obj = {};
  obj.link = [ "/listFiles" ];
  obj.func = async function (req, res) {
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
      list = await leafParsing(target);
      if (!Array.isArray(list)) {
        throw new Error(list);
      }

      list = list.map((i) => {
        i.absolute = i.absolute.replace(new RegExp("^" + staticConst, "i"), "__samba__");
        return i;
      }).filter((i) => {
        return !/^\.\_/.test(i.absolute.split("/")[i.absolute.split("/").length - 1]);
      }).filter((i) => {
        return i.absolute.split("/")[i.absolute.split("/").length - 1] !== ".DS_Store";
      });

      res.send(JSON.stringify(list));
    } catch (e) {
      errorLog("Static lounge 서버 문제 생김 (rou_post_listFiles): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_searchFiles = function () {
  const instance = this;
  const { errorLog, fileSystem, shellExec, shellLink, leafParsing } = this.mother;
  const { staticConst } = this;
  let obj;
  obj = {};
  obj.link = [ "/searchFiles" ];
  obj.func = async function (req, res) {
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
        target = "__samba__";
      }
      if (!/^__/.test(target)) {
        target = "__samba__" + "/" + target;
      }

      target = target.replace(/__samba__/gi, staticConst);
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
        i.absolute = i.absolute.replace(new RegExp("^" + staticConst, "i"), "__samba__");
        return i;
      }).filter((i) => {
        return !/^\.\_/.test(i.absolute.split("/")[i.absolute.split("/").length - 1]);
      }).filter((i) => {
        return i.absolute.split("/")[i.absolute.split("/").length - 1] !== ".DS_Store";
      });

      res.send(JSON.stringify(list));
    } catch (e) {
      errorLog("Static lounge 서버 문제 생김 (rou_post_searchFiles): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_readDir = function () {
  const instance = this;
  const { errorLog, fileSystem, shellExec, shellLink } = this.mother;
  const { staticConst } = this;
  let obj;
  obj = {};
  obj.link = [ "/readDir" ];
  obj.func = async function (req, res) {
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
        target = "__samba__";
      }
      if (!/^__/.test(target)) {
        target = "__samba__" + "/" + target;
      }

      target = target.replace(/__samba__/gi, staticConst);

      list = await fileSystem(`readDir`, [ target ]);

      res.send(JSON.stringify(list));
    } catch (e) {
      errorLog("Static lounge 서버 문제 생김 (rou_post_readDir): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_readFile = function () {
  const instance = this;
  const { errorLog, fileSystem, shellExec, shellLink } = this.mother;
  const { staticConst, sambaToken } = this;
  let obj;
  obj = {};
  obj.link = [ "/readFile" ];
  obj.func = async function (req, res) {
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
      errorLog("Static lounge 서버 문제 생김 (rou_post_readFile): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_findFolderId = function () {
  const instance = this;
  const drive = this.drive;
  const { errorLog, fileSystem, shellExec, shellLink } = this.mother;
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
  obj.func = async function (req, res) {
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
      errorLog("Static lounge 서버 문제 생김 (rou_post_findFolderId): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_findFileId = function () {
  const instance = this;
  const drive = this.drive;
  const { errorLog, fileSystem, shellExec, shellLink } = this.mother;
  const { staticConst } = this;
  let obj;
  obj = {};
  obj.link = [ "/findFileId" ];
  obj.func = async function (req, res) {
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
      errorLog("Static lounge 서버 문제 생김 (rou_post_findFileId): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_parsingDrawio = function () {
  const instance = this;
  const drive = this.drive;
  const { errorLog, fileSystem, shellExec, shellLink, uniqueValue, sleep } = this.mother;
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
  obj.func = async function (req, res) {
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
      errorLog("Static lounge 서버 문제 생김 (rou_post_parsingDrawio): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_getPathFromId = function () {
  const instance = this;
  const drive = this.drive;
  const { errorLog, fileSystem, shellExec, shellLink } = this.mother;
  const { staticConst, sambaToken } = this;
  const sambaKeyword = "drive";
  let obj;
  obj = {};
  obj.link = [ "/getPathFromId" ];
  obj.func = async function (req, res) {
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
      errorLog("Static lounge 서버 문제 생김 (rou_post_getPathFromId): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_moveFiles = function () {
  const instance = this;
  const { errorLog, fileSystem, shellExec, shellLink, equalJson } = this.mother;
  const { staticConst } = this;
  let obj;
  obj = {};
  obj.link = [ "/moveFiles" ];
  obj.func = async function (req, res) {
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
        toTarget = "__samba__";
      }
      if (!/^__/.test(toTarget)) {
        toTarget = "__samba__" + "/" + toTarget;
      }
      toTarget = toTarget.replace(/__samba__/gi, staticConst);

      for (let str of fromItems) {
        target = str.replace(/^\//i, '').replace(/\/$/i, '');
        if (target.trim() === '') {
          target = "__samba__";
        }
        if (!/^__/.test(target)) {
          target = "__samba__" + "/" + target;
        }
        target = target.replace(/__samba__/gi, staticConst);
        await shellExec("mv", [ target, toTarget + "/" ]);
      }

      res.send(JSON.stringify({ message: "success" }));
      
    } catch (e) {
      console.log(e);
      errorLog("Static lounge 서버 문제 생김 (rou_post_moveFiles): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_createNewSheets = function () {
  const instance = this;
  const sheets = this.sheets;
  const { errorLog, fileSystem, shellExec, shellLink, equalJson } = this.mother;
  const { staticConst } = this;
  let obj;
  obj = {};
  obj.link = [ "/createNewSheets" ];
  obj.func = async function (req, res) {
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
      errorLog("Static lounge 서버 문제 생김 (rou_post_createNewSheets): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_createNewDocs = function () {
  const instance = this;
  const docs = this.docs;
  const { errorLog, fileSystem, shellExec, shellLink, equalJson } = this.mother;
  const { staticConst } = this;
  let obj;
  obj = {};
  obj.link = [ "/createNewDocs" ];
  obj.func = async function (req, res) {
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
      errorLog("Static lounge 서버 문제 생김 (rou_post_createNewDocs): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_createNewSlides = function () {
  const instance = this;
  const slides = this.slides;
  const { errorLog, fileSystem, shellExec, shellLink, equalJson } = this.mother;
  const { staticConst } = this;
  let obj;
  obj = {};
  obj.link = [ "/createNewSlides" ];
  obj.func = async function (req, res) {
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
      errorLog("Static lounge 서버 문제 생김 (rou_post_createNewSlides): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_createNewForms = function () {
  const instance = this;
  const forms = this.forms;
  const { errorLog, fileSystem, shellExec, shellLink, equalJson } = this.mother;
  const { staticConst } = this;
  let obj;
  obj = {};
  obj.link = [ "/createNewForms" ];
  obj.func = async function (req, res) {
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
      errorLog("Static lounge 서버 문제 생김 (rou_post_createNewForms): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_createNewNotionPage = function () {
  const instance = this;
  const notion = this.notion;
  const { errorLog, fileSystem, shellExec, shellLink, equalJson } = this.mother;
  const { staticConst, sambaToken } = this;
  let obj;
  obj = {};
  obj.link = [ "/createNewNotionPage" ];
  obj.func = async function (req, res) {
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
      errorLog("Static lounge 서버 문제 생김 (rou_post_createNewNotionPage): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_createNewNotionKanban = function () {
  const instance = this;
  const notion = this.notion;
  const { errorLog, fileSystem, shellExec, shellLink, equalJson } = this.mother;
  const { staticConst, sambaToken } = this;
  let obj;
  obj = {};
  obj.link = [ "/createNewNotionKanban" ];
  obj.func = async function (req, res) {
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
      errorLog("Static lounge 서버 문제 생김 (rou_post_createNewNotionKanban): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_createNewLinkFile = function () {
  const instance = this;
  const { errorLog, fileSystem, shellExec, shellLink, equalJson, stringToLink } = this.mother;
  const { staticConst, sambaToken } = this;
  let obj;
  obj = {};
  obj.link = [ "/createNewLinkFile" ];
  obj.func = async function (req, res) {
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
      errorLog("Static lounge 서버 문제 생김 (rou_post_createNewLinkFile): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_createNewExcel = function () {
  const instance = this;
  const microsoft = this.microsoft;
  const { errorLog, fileSystem, shellExec, shellLink, equalJson, linkToString } = this.mother;
  const { staticConst, sambaToken } = this;
  let obj;
  obj = {};
  obj.link = [ "/createNewExcel" ];
  obj.func = async function (req, res) {
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
      errorLog("Static lounge 서버 문제 생김 (rou_post_createNewExcel): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_createNewWord = function () {
  const instance = this;
  const microsoft = this.microsoft;
  const { errorLog, fileSystem, shellExec, shellLink, equalJson, linkToString } = this.mother;
  const { staticConst, sambaToken } = this;
  let obj;
  obj = {};
  obj.link = [ "/createNewWord" ];
  obj.func = async function (req, res) {
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
      errorLog("Static lounge 서버 문제 생김 (rou_post_createNewWord): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_createNewPowerPoint = function () {
  const instance = this;
  const microsoft = this.microsoft;
  const { errorLog, fileSystem, shellExec, shellLink, equalJson, linkToString } = this.mother;
  const { staticConst, sambaToken } = this;
  let obj;
  obj = {};
  obj.link = [ "/createNewPowerPoint" ];
  obj.func = async function (req, res) {
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
      errorLog("Static lounge 서버 문제 생김 (rou_post_createNewPowerPoint): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_downloadUrlFromOneDrive = function () {
  const instance = this;
  const microsoft = this.microsoft;
  const { errorLog, equalJson } = this.mother;
  let obj;
  obj = {};
  obj.link = [ "/downloadUrlFromOneDrive" ];
  obj.func = async function (req, res) {
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
      errorLog("Static lounge 서버 문제 생김 (rou_post_downloadUrlFromOneDrive): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_microsoftConvert = function () {
  const instance = this;
  const microsoft = this.microsoft;
  const { fileSystem, errorLog, equalJson, shellExec } = this.mother;
  const { staticConst, sambaToken } = this;
  let obj;
  obj = {};
  obj.link = [ "/microsoftConvert" ];
  obj.func = async function (req, res) {
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
      errorLog("Static lounge 서버 문제 생김 (rou_post_microsoftConvert): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_renameTargets = function () {
  const instance = this;
  const { errorLog, fileSystem, shellExec, shellLink, equalJson } = this.mother;
  const { staticConst } = this;
  let obj;
  obj = {};
  obj.link = [ "/renameTargets" ];
  obj.func = async function (req, res) {
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
      errorLog("Static lounge 서버 문제 생김 (rou_post_renameTargets): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_generalFileUpload = function () {
  const instance = this;
  const { errorLog, fileSystem, shellExec, shellLink, sleep } = this.mother;
  const { staticConst } = this;
  const osTempFolder = "/tmp";
  const hangul = this.hangul;
  const microsoft = this.microsoft;
  let obj;
  obj = {};
  obj.link = [ "/generalFileUpload" ];
  obj.func = async function (req, res) {
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
      const form = instance.formidable({ multiples: true, encoding: "utf-8", maxFileSize: (10000 * 1024 * 1024) });
      form.parse(req, async function (err, fields, files) {
        try {
          if (err) {
            throw new Error(err);
            return;
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
              if (microsoft.isMicrosoftFile(thisFileName)) {
                await shellExec(`mv ${shellLink(path)} ${shellLink(osTempFolder + "/" + thisFileName)}`);
                microsoftResult = await microsoft.uploadDocument(osTempFolder + "/" + thisFileName);
                await sleep(500);
                await shellExec(`rm -rf ${shellLink(osTempFolder + "/" + thisFileName)}`);
                await fileSystem(`writeJson`, [ microsoft.localToOneDriveName(staticConst + "/" + toArr[num].replace(/^\//i, '')), {
                  url: microsoftResult.editUrl,
                  ...microsoftResult
                } ]);
              } else {
                await shellExec(`mv ${shellLink(path)} ${shellLink(staticConst + "/" + toArr[num].replace(/^\//i, ''))}`);
              }
              num++;
            }

            res.send(JSON.stringify({ "message": "done" }));
          }
        } catch (e) {
          console.log(e);
        }
      });
    } catch (e) {
      errorLog("Static lounge 서버 문제 생김 (rou_post_generalFileUpload): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_makeFolder = function () {
  const instance = this;
  const { errorLog, fileSystem, shellExec, shellLink } = this.mother;
  const { staticConst, sambaToken } = this;
  let obj;
  obj = {};
  obj.link = [ "/makeFolder" ];
  obj.func = async function (req, res) {
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

      res.send(JSON.stringify({ message: "done" }));
    } catch (e) {
      errorLog("Static lounge 서버 문제 생김 (rou_post_makeFolder): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_zipPhoto = function () {
  const instance = this;
  const { errorLog, fileSystem, shellExec, shellLink, dateToString, sleep } = this.mother;
  const { staticConst, sambaToken, homeliaisonOfficeConst, designerPhotoConst } = this;
  const drive = this.drive;
  let obj;
  obj = {};
  obj.link = [ "/zipPhoto" ];
  obj.func = async function (req, res) {
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
      }
      commands += `cd ${shellLink(targetDir)}/${shellLink(folderName)}/${shellLink(c3508)};`;
      commands += `zip ${shellLink(process.env.HOME)}/${shellLink(tempFolderName)}/${shellLink(shareDesignerName)} ./*;`;
      commands += `cd ${shellLink(targetDir)}/${shellLink(folderName)}/${shellLink(c780)};`;
      commands += `zip ${shellLink(process.env.HOME)}/${shellLink(tempFolderName)}/${shellLink(shareClientName)} ./*;`;

      await shellExec(commands);

      do {
        zipIdDesigner = await drive.upload_inPython(targetFolderId, `${shellLink(process.env.HOME + "/" + tempFolderName + "/" + shareDesignerName)}`);
        await sleep(500);
      } while (zipIdDesigner === null);
      await sleep(500);
      zipLinkDesigner = await drive.read_webView_inPython(zipIdDesigner);

      if (tempArr.length === 3) {
        zipLinkClient = null;
      } else {

        do {
          zipIdClient = await drive.upload_inPython(targetFolderId, `${shellLink(process.env.HOME + "/" + tempFolderName + "/" + shareClientName)}`);
          await sleep(500);
        } while (zipIdClient === null);
        await sleep(500);
        zipLinkClient = await drive.read_webView_inPython(zipIdClient);
      }

      await shellExec([
        [ `rm`, [ `-rf`, `${process.env.HOME}/${tempFolderName}/${shareClientName}` ] ],
        [ `rm`, [ `-rf`, `${process.env.HOME}/${tempFolderName}/${shareDesignerName}` ] ],
      ]);

      res.send(JSON.stringify({ designer: zipLinkDesigner, client: zipLinkClient }));

    } catch (e) {
      errorLog("Static lounge 서버 문제 생김 (rou_post_zipPhoto): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_designerFolder = function () {
  const instance = this;
  const { errorLog, fileSystem, shellExec, shellLink, dateToString, sleep } = this.mother;
  const { staticConst, sambaToken, homeliaisonOfficeConst, designerFolderConst } = this;
  const drive = this.drive;
  const docs = this.docs;
  let obj;
  obj = {};
  obj.link = [ "/designerFolder" ];
  obj.func = async function (req, res) {
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
      if (req.body.name === undefined || req.body.subid === undefined) {
        throw new Error("invaild post");
      }
      const designerFolderId = "1-xcQct5wXg8am57W1e8xXKwSQyLWAsMP";
      const sambaDir = staticConst + homeliaisonOfficeConst + "/" + designerFolderConst;
      let basicList = [
        "포트폴리오",
        "등록서류",
        "고객안내및제안문서"
      ];
      let id, subid;
      let folderName;
      let folderId, docsId;
      let num;

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

    } catch (e) {
      errorLog("Static lounge 서버 문제 생김 (rou_post_designerFolder): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_recordBackup = function () {
  const instance = this;
  const address = this.address;
  const { errorLog, fileSystem, shellExec, shellLink, requestSystem, dateToString, uniqueValue, binaryRequest, emergencyAlarm } = this.mother;
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
      inputs = dom.window.document.querySelector('form').children;
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
  obj.func = async function (req, res) {
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

          await emergencyAlarm("record backup and delete success");
        } catch (e) {
          await emergencyAlarm("record backup and delete error : " + e.message);
        }
      }
      
      backupFunc().catch((err) => {
        errorLog("record backup and delete error : " + err.message).catch((e) => { console.log(e); });
      });

      res.send(JSON.stringify({ message: "will do" }));

    } catch (e) {
      errorLog("Static lounge 서버 문제 생김 (rou_post_recordBackup): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_centrexSession = function () {
  const instance = this;
  const { centrex: { host, sessionConst, sessionValue } } = this;
  const { errorLog, requestSystem, emergencyAlarm } = this.mother;
  let obj;
  obj = {};
  obj.link = [ "/centrexSession" ];
  obj.func = async function (req, res) {
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
        emergencyAlarm("centrex token expired").catch((err) => { console.log(err); });
      }

      res.send(JSON.stringify({ message: "reload done" }));
    } catch (e) {
      errorLog("Static lounge 서버 문제 생김 (rou_post_centrexSession): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_mongoToJson = function () {
  const instance = this;
  const { shellExec, shellLink, fileSystem, errorLog } = this.mother;
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
        [ "backinfo", "console" ],
        [ "pythoninfo", "python" ],
        [ "testinfo", "log" ],
        [ "secondinfo", "second" ],
        [ "croninfo", "cron" ],
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

      await errorLog("mongo to json done");

    } catch (e) {
      await errorLog("mongo to json error : " + e.message);
    }
  }
  let obj;
  obj = {};
  obj.link = [ "/mongoToJson" ];
  obj.func = async function (req, res) {
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
    
      mongoToJsonFunction().catch((err) => {
        errorLog("mongo to json error : " + err.message).catch((e) => { console.log(e); });
      });

      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      errorLog("Static lounge 서버 문제 생김 (rou_post_mongoToJson): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_dataReflection = function () {
  const instance = this;
  const { errorLog } = this.mother;
  const address = this.address;
  const MongoReflection = require(`${process.cwd()}/apps/mongoReflection/mongoReflection.js`);
  const reflection = new MongoReflection();
  let obj;
  obj = {};
  obj.link = [ "/dataReflection" ];
  obj.func = async function (req, res) {
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

      reflection.coreReflection().then(() => {
        return reflection.mysqlReflection();
      }).catch((err) => {
        console.log(err);
      })
    
      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      errorLog("Static lounge 서버 문제 생김 (rou_post_dataReflection): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_mysqlQuery = function () {
  const instance = this;
  const { errorLog, mysqlQuery } = this.mother;
  const address = this.address;
  let obj;
  obj = {};
  obj.link = [ "/mysqlQuery" ];
  obj.func = async function (req, res) {
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
      errorLog("Static lounge 서버 문제 생김 (rou_post_mysqlQuery): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_parsingCashReceipt = function () {
  const instance = this;
  const { errorLog } = this.mother;
  const BillMaker = require(`${process.cwd()}/apps/billMaker/billMaker.js`);
  const bill = new BillMaker();
  let obj;
  obj = {};
  obj.link = [ "/parsingCashReceipt" ];
  obj.func = async function (req, res) {
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

      bill.parsingCashReceipt().catch((err) => {
        errorLog("cash receipt error : " + err.message).catch((e) => { console.log(e); });
      });

      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      errorLog("Static lounge 서버 문제 생김 (rou_post_parsingCashReceipt): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_textToVoice = function () {
  const instance = this;
  const audio = this.audio;
  const { errorLog } = this.mother;
  let obj;
  obj = {};
  obj.link = [ "/textToVoice" ];
  obj.func = async function (req, res) {
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
      if (typeof req.body.text !== "string") {
        throw new Error("invalid post");
      }
      audio.textToVoice(req.body.text).catch((err) => {
        console.log(err);
      })
      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      errorLog("Static lounge 서버 문제 생김 (rou_post_textToVoice): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_printText = function () {
  const instance = this;
  const audio = this.audio;
  const { errorLog, uniqueValue, fileSystem, shellExec, shellLink } = this.mother;
  let obj;
  obj = {};
  obj.link = [ "/printText" ];
  obj.func = async function (req, res) {
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
        const printerRaw = arr.find((i) => { return /epson/gi.test(i); });
        printer = printerRaw.trim().split(' ')[1];
        lpstat.kill();
        fileSystem(`write`, [ targetFile, req.body.text ]).then(() => {
          return shellExec(`uniprint -printer ${printer} -size 9 -hsize 0 -L -media A4 -wrap -font ${fontName} ${shellLink(targetFile)}`);
        }).then(() => {
          return shellExec("rm", [ "-rf", targetFile ]);
        }).catch((err) => {
          console.log(err);
        });
      });

      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      errorLog("Static lounge 서버 문제 생김 (rou_post_printText): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_pageToPdf = function () {
  const instance = this;
  const chrome = this.chrome;
  const address = this.address;
  const { errorLog, fileSystem, shellExec, shellLink, uniqueValue } = this.mother;
  const { staticConst } = this;
  let obj;
  obj = {};
  obj.link = [ "/pageToPdf" ];
  obj.func = async function (req, res) {
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
      errorLog("Static lounge 서버 문제 생김 (rou_post_pageToPdf): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_getUtilization = function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink, dateToString, errorLog } = this.mother;
  const fileTargetFolder = process.env.HOME + "/nmontong";
  const delta = 10;
  const fileKeyWords = "homeliaison_";
  const utilizationByDate = async function (standardDate, delta = 10) {
    try {
      const fileToMatrix = async function (fileName) {
        try {
          let target;
          let matrix, tempArr;
          let targetArr;
          let filteredMatrix;
      
          target = await fileSystem("readString", [ `${fileTargetFolder}/${fileName}` ])
      
          targetArr = target.split("\n");

          matrix = [];
          tempArr = null;
          for (let raw of targetArr) {
            if (/^ZZZZ/.test(raw)) {
              if (Array.isArray(tempArr)) {
                matrix.push(tempArr);
              }
              tempArr = [];
              tempArr.push(raw);
            } else {
              if (Array.isArray(tempArr)) {
                if (/^NET,/.test(raw)) {
                  tempArr.push(raw);
                } else if (/^CPU_ALL,/.test(raw)) {
                  tempArr.push(raw);
                }
                
                /*
                else if (/^MEM,/.test(raw)) {
                  tempArr.push(raw);
                  // MEM,Memory MB homeliaison,memtotal,hightotal,lowtotal,swaptotal,memfree,highfree,lowfree,swapfree,memshared,cached,active,bigfree,buffers,swapcached,inactive
                  // MEM,T0005,15673.3,-0.0,-0.0,4096.0,1012.6,-0.0,-0.0,4004.7,212.4,9534.0,7820.2,-1.0,1297.8,2.4,5574.1
                } else if (/^TOP,/.test(raw)) {
                  tempArr.push(raw);
                  // TOP,0802321,T0005,9.51,9.51,0.00,651452,114816,78112,136592,37600,0,0,node,7,0
                }
                */
               
              }
            }
          }
      
          filteredMatrix = matrix.map((arr) => {
            const [ , cpu, net, memory ] = arr;
            const cpuUsage = (100 - Number(cpu.split(",")[5])) / 100;
            const networkIn = Number(net.split(",")[3]) * 1024;
            const networkOut = Number(net.split(",")[5]) * 1024;
            /*
            const totalMemory = memory.split(",")[5];
            const memoryUsage = (100 - Number(memory.split(",")[5])) / 100;
            */
            return [ cpuUsage, networkIn, networkOut ];
          });
  
          return filteredMatrix;
        } catch (e) {
          console.log(e);
          return [];
        }
      }
      const dateToName = function (dateObject) {
        return fileKeyWords + dateToString(dateObject, true).slice(2, -3).replace(/\-/gi, '').replace(/\:/gi, '').replace(/ /gi, "_") + ".nmon";
      }
      let ago, copiedDate;
      let totalMatrix;
      let cpuMax, cpuAve, networkIn, networkOut;

      ago = new Date(JSON.stringify(standardDate).slice(1, -1));
      ago.setMinutes(ago.getMinutes() - delta);
  
      totalMatrix = [];
      for (let i = 0; i < delta; i++) {
        copiedDate = new Date(JSON.stringify(ago).slice(1, -1));
        copiedDate.setMinutes(copiedDate.getMinutes() + i);
        totalMatrix = totalMatrix.concat(await fileToMatrix(dateToName(copiedDate)));
      }
  
      cpuMax = totalMatrix.reduce((acc, curr) => { return acc >= curr[0] ? acc : curr[0] }, 0);
      if (totalMatrix.length === 0) {
        cpuAve = 0;
      } else {
        cpuAve = totalMatrix.reduce((acc, curr) => { return acc + curr[0] }, 0) / totalMatrix.length;
      }
      networkIn = Math.round(totalMatrix.reduce((acc, curr) => { return acc + curr[1] }, 0));
      networkOut = Math.round(totalMatrix.reduce((acc, curr) => { return acc + curr[2] }, 0));
      return {
        cpu: {
          average: cpuAve,
          maximum: cpuMax
        },
        network: {
          in: networkIn,
          out: networkOut
        },
      };
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  let obj = {};
  obj.link = [ "/getUtilization" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      let standardDate;
      let result;

      standardDate = new Date();
      standardDate.setMinutes(standardDate.getMinutes() - 1);

      result = await utilizationByDate(standardDate, delta);

      res.send(JSON.stringify(result));
    } catch (e) {
      errorLog("Static lounge 서버 문제 생김 (rou_post_getUtilization): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_removeCronNmon = function () {
  const instance = this;
  const { fileSystem, dateToString, errorLog } = this.mother;
  const targetDir = process.env.HOME + "/nmontong";
  let obj = {};
  obj.link = [ "/removeCronNmon" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const targetDirList = await fileSystem("readDir", [ targetDir ]);
      const nmonTargetKeywords = "homeliaison_";
      const yearKeywords = String((new Date()).getFullYear()).slice(0, 2);
      const now = new Date();
      const ago = new Date(JSON.stringify(now).slice(1, -1));
      const agoConst = 12;
      let removeTargets;
  
      ago.setHours(ago.getHours() - agoConst);
  
      removeTargets = targetDirList.filter((str) => { return (new RegExp("^" + nmonTargetKeywords)).test(str) }).map((str) => {
        const [ key, dateRaw, hoursRaw ] = str.split("_");
        const [ hours, exe ] = hoursRaw.split(".");
        const thisDate = new Date(
          Number(yearKeywords + dateRaw.slice(0, 2)),
          Number(dateRaw.slice(2, 4)) - 1,
          Number(dateRaw.slice(4)),
          Number(hours.slice(0, 2)),
          Number(hours.slice(2)),
          0
        );
        return { date: thisDate, fileName: str };
      }).filter(({ date, fileName }) => {
        return date.valueOf() <= ago.valueOf();
      }).map(({ fileName }) => { return targetDir + "/" + fileName });
  
      for (let str of removeTargets) {
        await fileSystem("remove", [ str ]);
      }
      
      res.send(JSON.stringify({ message: "done" }));
    } catch (e) {
      errorLog("Static lounge 서버 문제 생김 (rou_post_removeCronNmon): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_analyticsDaily = function () {
  const instance = this;
  const { errorLog, equalJson, stringToDate, requestSystem, sleep } = this.mother;
  const analytics = this.analytics;
  const address = this.address;
  let obj = {};
  obj.link = [ "/analyticsDaily" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const { date } = equalJson(req.body);
      let thisDate;
      let dateArr;

      if (typeof date !== "string") {
        throw new Error("invaild post");
      }
      if (date.length === 10) {

        thisDate = stringToDate(date);
        analytics.generalMetric(thisDate, thisDate).then((result) => {
          return requestSystem("https://" + address.testinfo.host + "/analyticsGeneral", { result }, { headers: { "Content-Type": "application/json" } });
        }).then(() => {
          return analytics.getSubmitClients(thisDate, instance.mongo);
        }).then((result) => {
          return requestSystem("https://" + address.testinfo.host + "/analyticsClients", { result }, { headers: { "Content-Type": "application/json" } });
        }).catch((err) => {
          console.log(err);
        });

      } else {

        dateArr = date.split(",").map((str) => { return str.trim(); });
        if (!(dateArr.every((str) => { return str.length === 10 }))) {
          throw new Error("invaild post");
        }
        (async () => {
          let result;
          for (let thisDate of dateArr) {
            result = await analytics.generalMetric(thisDate, thisDate);
            await requestSystem("https://" + address.testinfo.host + "/analyticsGeneral", { result }, { headers: { "Content-Type": "application/json" } });
            await sleep(1000);
          }
          for (let thisDate of dateArr) {
            result = await analytics.getSubmitClients(thisDate, instance.mongo);
            await requestSystem("https://" + address.testinfo.host + "/analyticsClients", { result }, { headers: { "Content-Type": "application/json" } });
            await sleep(1000);
          }
        })().catch((err) => {
          console.log(err);
        });

      }

      res.send({ message: "will do" });
    } catch (e) {
      await errorLog("Static lounge 서버 문제 생김 (rou_post_analyticsDaily): " + e.message);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_filesToZip = function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink, dateToString, errorLog, equalJson, uniqueValue } = this.mother;
  const address = this.address;
  let obj = {};
  obj.link = [ "/filesToZip" ];
  obj.func = async function (req, res) {
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
      errorLog("Static lounge 서버 문제 생김 (rou_post_filesToZip): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_renameFile = function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink, dateToString, errorLog, equalJson, uniqueValue } = this.mother;
  const address = this.address;
  let obj = {};
  obj.link = [ "/renameFile" ];
  obj.func = async function (req, res) {
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
      errorLog("Static lounge 서버 문제 생김 (rou_post_renameFile): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_deleteFile = function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink, dateToString, errorLog, equalJson, uniqueValue } = this.mother;
  const address = this.address;
  let obj = {};
  obj.link = [ "/deleteFile" ];
  obj.func = async function (req, res) {
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
      errorLog("Static lounge 서버 문제 생김 (rou_post_deleteFile): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_getMicrosoftAccessToken = function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink, dateToString, errorLog, equalJson, uniqueValue } = this.mother;
  const microsoft = this.microsoft;
  let obj = {};
  obj.link = [ "/getMicrosoftAccessToken" ];
  obj.func = async function (req, res) {
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
      errorLog("Static lounge 서버 문제 생김 (rou_post_getMicrosoftAccessToken): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_renewMicrosoftAccessToken = function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink, dateToString, errorLog, equalJson, uniqueValue } = this.mother;
  const microsoft = this.microsoft;
  let obj = {};
  obj.link = [ "/renewMicrosoftAccessToken" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      microsoft.renewAccessToken().catch((err) => { console.log(err); });
      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      errorLog("Static lounge 서버 문제 생김 (rou_post_renewMicrosoftAccessToken): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_getMacArr = function () {
  const instance = this;
  const devices = this.devices;
  const { fileSystem, shellExec, shellLink, dateToString, errorLog, equalJson, uniqueValue } = this.mother;
  let obj = {};
  obj.link = [ "/getMacArr" ];
  obj.func = async function (req, res) {
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
      errorLog("Static lounge 서버 문제 생김 (rou_post_getMacArr): " + e.message).catch((e) => { console.log(e); });
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
  obj.func = async function (req, res) {
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
      const text = "안녕하세요, " + thisMember.name + "님! #{from}님께서 새로운 파일을 업로드하셨습니다. 확인부탁드립니다!\n" + "https://" + address.backinfo.host + "/dashboard?mode=file&injection=me";
      requestSystem("https://" + address.secondinfo.host + ":" + String(portNumber) + path, { fromId, toId, text }, { headers: { "Content-Type": "application/json" } }).catch((err) => { console.log(err); })
      res.send(JSON.stringify({ message: "done" }));
    } catch (e) {
      errorLog("Static lounge 서버 문제 생김 (rou_post_fromToFileAlarm): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_parsingDevicesStatus = function () {
  const instance = this;
  const devices = this.devices;
  const { fileSystem, shellExec, shellLink, dateToString, errorLog, equalJson, uniqueValue } = this.mother;
  let obj = {};
  obj.link = [ "/parsingDevicesStatus" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const { macArr } = equalJson(req.body);
      const { to: finalObject } = await devices.storeDevicesStatus(macArr, instance.members);
      
      res.send(JSON.stringify(finalObject));
    } catch (e) {
      errorLog("Static lounge 서버 문제 생김 (rou_post_parsingDevicesStatus): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_storeDevicesStatus = function () {
  const instance = this;
  const devices = this.devices;
  const { fileSystem, errorLog, equalJson, shellExec, messageSend } = this.mother;
  let obj;
  obj = {};
  obj.link = [ "/storeDevicesStatus" ];
  obj.func = async function (req, res) {
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
      devices.scanLocalMacIp(10).then(() => {
        // return devices.getDevicesFlow(instance.members);
      }).catch((err) => {
        console.log(err);
      });
      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      errorLog("Static lounge 서버 문제 생김 (rou_post_storeDevicesStatus): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_getDevicesStatus = function () {
  const instance = this;
  const devices = this.devices;
  const { fileSystem, errorLog, equalJson, shellExec, messageSend } = this.mother;
  let obj;
  obj = {};
  obj.link = [ "/getDevicesStatus" ];
  obj.func = async function (req, res) {
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
      errorLog("Static lounge 서버 문제 생김 (rou_post_getDevicesStatus): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_callHistory = function () {
  const instance = this;
  const back = this.back;
  const { requestSystem, stringToDate, errorLog, autoHypenPhone } = this.mother;
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

      console.log("call history update success");
      errorLog("callHistory update sync success : " + JSON.stringify(new Date())).catch((err) => { console.log(err) });

    } catch (e) {
      await errorLog("call history fail " + e.message);
    }
  }
  let obj = {};
  obj.link = [ "/callHistory" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      parsingCallHistory(instance.mongo, instance.mongoconsole).catch((err) => {
        errorLog("Static lounge 서버 문제 생김 (rou_post_callHistory): " + e.message).catch((err) => { console.log(err) });
      });
      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      await errorLog("Static lounge 서버 문제 생김 (rou_post_callHistory): " + e.message);
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
  const { errorLog, sleep } = this.mother;
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

      errorLog("calendar sync success " + String(index) + " : " + JSON.stringify(new Date())).catch((err) => { console.log(err) });

    } catch (e) {
      await errorLog("Console 서버 문제 생김 (rou_post_calendarSync): " + e.message);
    }
  }
  let obj = {};
  obj.link = [ "/calendarSync" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      calendarSyncFunc(instance.mongo, 0).then(() => {
        return calendarSyncFunc(instance.mongo, 1);
      }).catch((err) => {
        errorLog("Static lounge 서버 문제 생김 (rou_post_calendarSync): " + err.message).catch((err) => { console.log(err) });
      });
      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      await errorLog("Static lounge 서버 문제 생김 (rou_post_calendarSync): " + e.message);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_workProposalToClient = function () {
  const instance = this;
  const work = this.work;
  const { errorLog } = this.mother;
  let obj = {};
  obj.link = [ "/workProposalToClient" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      work.setProposalToClient("cron", { selfMongo: instance.mongo }).then(() => {
        return errorLog("proposal to client sync done : " + JSON.stringify(new Date()));
      }).catch((err) => {
        errorLog("Static lounge 서버 문제 생김 (rou_post_workProposalToClient): " + err.message).catch((err) => { console.log(err) });
      });
      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      await errorLog("Static lounge 서버 문제 생김 (rou_post_workProposalToClient): " + e.message);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_workProjectActionSync = function () {
  const instance = this;
  const work = this.work;
  const { errorLog } = this.mother;
  let obj = {};
  obj.link = [ "/workProjectActionSync" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      work.projectActionSync({ selfMongo: instance.mongo, selfConsoleMongo: instance.mongoconsole, updateMongo: instance.mongo }).then(() => {
        return errorLog("project action sync done : " + JSON.stringify(new Date()));
      }).catch((err) => {
        errorLog("Static lounge 서버 문제 생김 (rou_post_workProjectActionSync): " + err.message).catch((err) => { console.log(err) });
      });
      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      await errorLog("Static lounge 서버 문제 생김 (rou_post_workProjectActionSync): " + e.message);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_photoStatusSync = function () {
  const instance = this;
  const back = this.back;
  const { errorLog, sleep, equalJson } = this.mother;
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
  
      await errorLog("photoStatus sync done : " + JSON.stringify(new Date()));


    } catch (e) {
      await errorLog("Console 서버 문제 생김 (rou_post_photoStatusSync): " + e.message);
    }
  }
  let obj = {};
  obj.link = [ "/photoStatusSync" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      photoStatusSyncFunc(instance.mongo).catch((err) => {
        errorLog("Static lounge 서버 문제 생김 (rou_post_photoStatusSync): " + err.message).catch((err) => { console.log(err) });
      });
      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      await errorLog("Static lounge 서버 문제 생김 (rou_post_photoStatusSync): " + e.message);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

//ROUTING ----------------------------------------------------------------------

StaticRouter.prototype.setMembers = async function () {
  const instance = this;
  const back = this.back;
  const { fileSystem, errorLog } = this.mother;
  try {
    this.members = await back.setMemberObj({ getMode: true, selfMongo: instance.mongo });
  } catch (e) {
    await errorLog("Static lounge 서버 문제 생김 (setMembers): " + e.message);
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
