const LogConsole = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  this.address = require(`${process.cwd()}/apps/infoObj.js`);
  this.mother = new Mother();
  this.back = new BackMaker();
  this.dir = process.cwd() + "/apps/logConsole";
  this.console = process.cwd() + "/apps/dataConsole";
  this.sourceDir = this.dir + "/router/source";

  const { WebClient } = require("@slack/web-api");
  this.slack_token = "xoxb-4088608221477-4095446877285-jtvkvipa2umku2S1Qy3do4Lo";
  this.slack_bot = new WebClient(this.slack_token);
}

LogConsole.prototype.renderStatic = async function (staticFolder) {
  const instance = this;
  const { fileSystem, shell, shellLink, sleep, mediaQuery } = this.mother;
  const S3HOST = "https://" + this.address.officeinfo.ghost.host;
  const SSEHOST = this.address.testinfo.host;
  const SSEHOST_CONSOLE = this.address.testinfo.host;
  const FILEHOST = this.address.officeinfo.ghost.host;
  const PYTHONHOST = "https://" + this.address.pythoninfo.host + ":3000";
  const BRIDGEHOST = "https://" + this.address.transinfo.host + ":3000";
  const FRONTHOST = "https://" + this.address.frontinfo.host;
  try {

    //set static
    const homeDirList = await fileSystem(`readDir`, [ process.env.HOME ]);
    let staticDir, staticDirFunc;
    let staticDirList_raw, staticDirList;
    let folderSize, tempScriptString;
    let tempMediaResult;
    let subModuleList;
    let temp;
    let svgTongString, generalString, consoleGeneralString, execString, fileString, svgTongItemsString, s3String, sseString, sseConsoleString, polyfillString, classString, pythonString, bridgeString, frontWebString, trapString, officeString;
    let code0, code1, code2, code3;
    let result;
    let prototypes, prototypeBoo;
    let resultFromArr;

    if (!homeDirList.includes(staticFolder.split('/')[staticFolder.split('/').length - 1])) {
      shell.exec(`mkdir ${shellLink(staticFolder)}`);
    }
    console.log(`set static`);

    //set general js
    s3String = "const S3HOST = \"" + S3HOST + "\";";
    sseString = "const SSEHOST = \"" + SSEHOST + "\";";
    sseConsoleString = "const SSEHOST_CONSOLE = \"" + SSEHOST_CONSOLE + "\";";
    pythonString = "const PYTHONHOST = \"" + PYTHONHOST + "\";";
    bridgeString = "const BRIDGEHOST = \"" + BRIDGEHOST + "\";";
    frontWebString = "const FRONTHOST = \"" + FRONTHOST + "\";";
    officeString = "const FILEHOST = \"" + FILEHOST + "\";";
    svgTongString = await fileSystem(`readString`, [ `${process.cwd()}/apps/abstractNode/source/svgTong.js` ]);
    generalString = await fileSystem(`readString`, [ `${process.cwd()}/apps/abstractNode/source/general.js` ]);
    consoleGeneralString = await fileSystem(`readString`, [ `${this.console}/router/source/general/general.js` ]);
    trapString = await this.back.setAjaxAuthorization();

    staticDirFunc = async (staticDir) => {
      try {
        let staticDirList_raw, staticDirList;
        staticDirList_raw = (await fileSystem(`readDir`, [ staticDir ])).filter((str) => { return str !== ".DS_Store"; });
        staticDirList_raw = staticDirList_raw.map((str) => { return `${staticDir}/${str}` });
        staticDirList = [];
        for (let path of staticDirList_raw) {
          if (await fileSystem(`isDir`, [ path ])) {
            staticDirList = staticDirList.concat(await staticDirFunc(path));
          } else {
            staticDirList.push(path);
          }
        }
        return staticDirList;
      } catch (e) {
        throw new Error("read static files error : " + e.message);
      }
    }

    staticDir = `${this.dir}/router/source/local`;
    staticDirList = await staticDirFunc(staticDir);
    if (staticDirList.some((path) => { return !/\.js$/.test(path) })) {
      throw new Error("not allow non-js file");
    }
    staticDirList = staticDirList.map((path) => {
      return { path, name: path.split("/")[path.split("/").length - 1] };
    })
    if (staticDirList.length !== [ ...new Set(staticDirList.map((obj) => { return obj.name })) ].length) {
      throw new Error("name error, not allow same file name");
    }

    //write local js
    console.log(`set target :`, staticDirList);
    resultFromArr = [];

    for (let { path, name } of staticDirList) {

      result = '';
      code0 = '';
      code1 = '';
      svgTongItemsString = null;

      execString = await fileSystem(`readString`, [ `${this.dir}/router/source/general/exec.js` ]);
      execString = execString.replace(/\/<%name%>\//, (name.slice(0, 1).toUpperCase() + name.replace(/\.js$/, '').slice(1)));
      fileString = await fileSystem(`readString`, [ path ]);

      //merge
      code0 = svgTongString + "\n\n" + trapString + "\n\n" + s3String + "\n\n" + sseString + "\n\n" + sseConsoleString + "\n\n" + pythonString + "\n\n" + bridgeString + "\n\n" + frontWebString + "\n\n" + officeString + "\n\n";
      code1 = "";
      code2 = generalString + "\n\n" + consoleGeneralString;
      code3 = fileString + "\n\n" + execString;

      //set media query
      if (/<%%/gi.test(code2)) {
        tempMediaResult = mediaQuery(code2);
        code2 = tempMediaResult.code;
      }
      if (/<%%/gi.test(code3)) {
        tempMediaResult = mediaQuery(code3);
        code3 = tempMediaResult.conditions + "\n\n" + tempMediaResult.code;
      }

      result = '';
      result += code0;
      result += "\n\n";
      if (svgTongItemsString !== null) {
        result += svgTongItemsString;
        result += "\n\n";
      }
      result += code1;
      result += "\n\n";
      result += code2;
      result += "\n\n";
      result += code3;
      result += "\n\n";

      console.log(`${name} merge success`);
      await fileSystem(`write`, [ `${staticFolder}/${name}`, result ]);
      resultFromArr.push(`${staticFolder}/${name}`);

    }

    console.log(`set render :`, resultFromArr);

    return resultFromArr;

  } catch (e) {
    console.log(e);
  }
}

LogConsole.prototype.logConnect = async function (testMode = false) {
  const instance = this;
  const { fileSystem, shell, shellLink, mongo, mongoinfo, mongolocalinfo, mongotestinfo, mongoconsoleinfo, errorLog, messageLog, expressLog, emergencyAlarm, aliveLog, cronLog, alertLog } = this.mother;
  const PORT = testMode ? instance.address.officeinfo.test.port : 3000;
  const https = require("https");
  const express = require("express");
  const app = express();
  const multer = require("multer");
  const multiForms = multer();
  const useragent = require("express-useragent");
  const staticFolder = process.env.HOME + "/static";
  const fs = require("fs");
  const logKeyword = "expressLog";
  const logFolder = process.env.HOME + "/server/log";
  const thisLogFile = `${logFolder}/${logKeyword}_${(new Date()).valueOf()}.log`;
  const serverName = "log";

  app.use(useragent.express());
  app.use(express.json({ limit : "50mb" }));
  app.use(multiForms.array());
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  app.use(express.static(staticFolder));
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, HEAD, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With, remember-me");
    if (req.method === "OPTIONS") {
      res.sendStatus(200);
    } else {
      next();
    }
  });

  try {
    console.log(``);
    console.log(`\x1b[36m\x1b[1m%s\x1b[0m`, `launching log console ==============`);
    console.log(``);

    //set mongo connetion
    let MONGOC, MONGOLOCALC, MONGOCOREC;
    MONGOC = new mongo(mongotestinfo);
    MONGOLOCALC = new mongo(mongolocalinfo);
    MONGOCOREC = new mongo(mongoinfo);
    console.log(`\x1b[33m%s\x1b[0m`, `set DB server => 127.0.0.1`);
    console.log(``);

    await MONGOC.connect();
    await MONGOLOCALC.connect();
    await MONGOCOREC.connect();

    //set pem key
    let pems, pemsLink;
    let certDir, keyDir, caDir;

    pems = {};
    pemsLink = testMode ? process.cwd() + "/pems/" + this.address.officeinfo.test.host : process.cwd() + "/pems/" + this.address.testinfo.host;

    certDir = await fileSystem(`readDir`, [ `${pemsLink}/cert` ]);
    keyDir = await fileSystem(`readDir`, [ `${pemsLink}/key` ]);
    caDir = await fileSystem(`readDir`, [ `${pemsLink}/ca` ]);

    for (let i of certDir) {
      if (i !== `.DS_Store`) {
        pems.cert = await fileSystem(`read`, [ `${pemsLink}/cert/${i}` ]);
      }
    }
    for (let i of keyDir) {
      if (i !== `.DS_Store`) {
        pems.key = await fileSystem(`read`, [ `${pemsLink}/key/${i}` ]);
      }
    }
    pems.ca = [];
    for (let i of caDir) {
      if (i !== `.DS_Store`) {
        pems.ca.push(await fileSystem(`read`, [ `${pemsLink}/ca/${i}` ]));
      }
    }
    pems.allowHTTP1 = true;

    //set router
    const LogRouter = require(`${this.dir}/router/logRouter.js`);
    const router = new LogRouter(this.slack_bot, MONGOC, MONGOLOCALC, MONGOCOREC, testMode);

    const rouObj = router.getAll();
    const logStream = fs.createWriteStream(thisLogFile);
    await expressLog(serverName, logStream, "start");
    const logger = {
      alert: async (text) => {
        try {
          expressLog(serverName, logStream, "alert", { text }).catch((err) => { console.log(err) });
          await emergencyAlarm(text);
        } catch (e) {
          console.log(e);
        }
      },
      log: async (text) => {
        try {
          expressLog(serverName, logStream, "log", { text }).catch((err) => { console.log(err) });
          await errorLog(text);
        } catch (e) {
          console.log(e);
        }
      },
      error: async (text) => {
        try {
          expressLog(serverName, logStream, "error", { text }).catch((err) => { console.log(err) });
          await alertLog(text);
        } catch (e) {
          console.log(e);
        }
      },
      cron: async (text) => {
        try {
          expressLog(serverName, logStream, "cron", { text }).catch((err) => { console.log(err) });
          await cronLog(text);
        } catch (e) {
          console.log(e);
        }
      },
      alive: async (text) => {
        try {
          expressLog(serverName, logStream, "alive", { text }).catch((err) => { console.log(err) });
          await aliveLog(text);
        } catch (e) {
          console.log(e);
        }
      },
      stream: logStream,
      path: thisLogFile,
    };
    for (let obj of rouObj.get) {
      app.get(obj.link, async function (req, res) {
        try {
          expressLog(serverName, logStream, "route", req).catch((err) => { console.log(err) });
          await obj.func(req, res, logger);
        } catch (e) {
          console.log(e);
          res.set("Content-Type", "application/json");
          res.send(JSON.stringify({ error: e.message }));
        }
      });
    }
    for (let obj of rouObj.post) {
      app.post(obj.link, async function (req, res) {
        try {
          expressLog(serverName, logStream, "route", req).catch((err) => { console.log(err) });
          await obj.func(req, res, logger);
        } catch (e) {
          console.log(e);
          res.set("Content-Type", "application/json");
          res.send(JSON.stringify({ error: e.message }));
        }
      });
    }
    console.log(`set router`);

    //set static
    this.renderStatic(staticFolder).then(() => {
      console.log(`static done`);
    }).catch((err) => {
      console.log(err);
    });

    //server on
    https.createServer(pems, app).listen(PORT, () => { console.log(`\x1b[33m%s\x1b[0m`, `\nServer running\n`); });

  } catch (e) {
    console.log(e);
  }
}

module.exports = LogConsole;
