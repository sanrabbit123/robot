const AbstractRabbit = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  this.address = require(`${process.cwd()}/apps/infoObj.js`);
  this.mother = new Mother();
  this.back = new BackMaker();
  this.dir = process.cwd() + "/apps/abstractRabbit";
  this.console = process.cwd() + "/apps/dataConsole";
  this.sourceDir = this.dir + "/router/source";
  this.localDir = `${this.sourceDir}/local`;
  this.metaLimit = 150;
}

AbstractRabbit.prototype.renderStatic = async function (staticFolder) {
  const instance = this;
  const { fileSystem, shellExec, shellLink, sleep, mediaQuery } = this.mother;
  try {

    //set static
    const homeDirList = await fileSystem(`readDir`, [ process.env.HOME ]);
    let staticDir, staticDirFunc;
    let staticDirList_raw, staticDirList;
    let tempMediaResult;
    let svgTongString, generalString, consoleGeneralString, rabbitGeneralString, execString, fileString;
    let code0, code1, code2, code3;
    let result;
    let resultFromArr;

    console.log(`set static`);

    //set general js
    svgTongString = await fileSystem(`readString`, [ `${process.cwd()}/apps/abstractNode/source/svgTong.js` ]);
    generalString = await fileSystem(`readString`, [ `${process.cwd()}/apps/abstractNode/source/general.js` ]);
    consoleGeneralString = await fileSystem(`readString`, [ `${this.console}/router/source/general/general.js` ]);
    rabbitGeneralString = await fileSystem(`readString`, [ `${this.dir}/router/source/general/general.js` ]);

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

      execString = await fileSystem(`readString`, [ `${this.dir}/router/source/general/exec.js` ]);
      execString = execString.replace(/\/<%name%>\//, (name.slice(0, 1).toUpperCase() + name.replace(/\.js$/, '').slice(1)));
      fileString = await fileSystem(`readString`, [ path ]);
      if (!/\/<%metaStart%>\//g.test(fileString)) {
        throw new Error("There is no meta patch, impossible");
      }

      fileString = fileString.slice([ ...fileString.matchAll(/\/<%metaEnd%>\/\;/g) ][0].index + String("/<%metaEnd%>/;").length + 1);

      //merge
      code0 = svgTongString + "\n\n";
      code1 = "";
      code2 = generalString + "\n\n" + consoleGeneralString + "\n\n" + rabbitGeneralString;
      code3 = fileString + "\n\n" + execString;

      //set media query
      if (/<%%/gi.test(code2)) {
        tempMediaResult = mediaQuery(code2)
        code2 = tempMediaResult.code + "\n\n" + tempMediaResult.conditions;
      }
      if (/<%%/gi.test(code3)) {
        tempMediaResult = mediaQuery(code3);
        code3 = tempMediaResult.conditions + "\n\n" + tempMediaResult.code;
      }

      result = '';
      result += code0;
      result += "\n\n";
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

AbstractRabbit.prototype.readMeta = async function () {
  const instance = this;
  const { fileSystem } = this.mother;
  const { localDir, metaLimit } = this;
  try {
    const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
    const localTargets = (await fileSystem(`readDir`, [ localDir ])).filter((str) => { return str !== ".DS_Store" });
    let targetJsString;
    let metaFunctionString;
    let metaFunction;
    let metaFunctions;
    let targetJs;
    metaFunctions = [];
    for (let name of localTargets) {
      targetJs = `${localDir}/${name}`;
      targetJsString = await fileSystem(`readHead`, [ targetJs, metaLimit ]);
      if (!/\/<%metaEnd%>\//gi.test(targetJsString)) {
        throw new Error("meta function limit : " + String(metaLimit));
      }
      metaFunctionString = targetJsString.slice([ ...targetJsString.matchAll(/\/<%metaStart%>\/\;/g) ][0].index + String("/<%metaStart%>/;").length, [ ...targetJsString.matchAll(/\/<%metaEnd%>\/\;/g) ][0].index).trim().replace(/^\;/, '').replace(/\;$/, '').trim();
      metaFunction = new AsyncFunction("req", "mongo", "host", metaFunctionString.replace(/\}$/, '').replace(/async function metaFunction \(req, mongo, host\) \{/gi, '').trim());
      metaFunctions.push({
        name: name.split(".").slice(0, -1).join("."),
        meta: metaFunction,
      });
    }
    return metaFunctions;
  } catch (e) {
    console.log(e);
    return null;
  }
}

AbstractRabbit.prototype.connect = async function () {
  const instance = this;
  const { fileSystem, mongo, mongoinfo, mongolocalinfo, mongoconsoleinfo, errorLog, expressLog, dateToString, aliveLog, cronLog, emergencyAlarm, alertLog } = this.mother;
  const PORT = 3000;
  const https = require("https");
  const express = require("express");
  const app = express();
  const useragent = require("express-useragent");
  const staticFolder = process.env.HOME + "/static/abstract";
  const fs = require("fs");
  const allLogKeyword = "allExpressLog";
  const logKeyword = "expressLog";
  const logFolder = process.env.HOME + "/server/log";
  const thisLogFile = `${logFolder}/${logKeyword}_${(new Date()).valueOf()}.log`;
  const serverName = "abstract";

  app.use(useragent.express());
  app.use(express.json({ limit : "50mb" }));
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
    // set address info
    const { name, rawObj: address } = await this.mother.ipCheck();
    const isLocal = (/localhost/gi.test(address.host) || address.host === this.address.officeinfo.ghost.host);
    if (name === "unknown") {
      throw new Error("invalid address");
    }

    console.log(``);
    console.log(`\x1b[36m\x1b[1m%s\x1b[0m`, `launching rabbit in ${name} ==============`);
    console.log(``);

    // set mongo connetion
    const MONGOC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
    await MONGOC.connect();

    // set pem key
    let pems, pemsLink;
    let certDir, keyDir, caDir;

    pems = {};
    pemsLink = process.cwd() + "/pems/" + address.host;

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

    // set router
    const localTargets = (await fileSystem(`readDir`, [ this.localDir ])).filter((str) => { return str !== ".DS_Store" });
    const metaFunctions = await this.readMeta();
    const AbstractRouter = require(`${this.dir}/router/abstractRouter.js`);
    const router = new AbstractRouter(MONGOC, localTargets, metaFunctions, staticFolder);
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
      keyword: logKeyword,
      all: allLogKeyword,
      folder: logFolder,
      instances: 2,
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

    // set static
    this.renderStatic(staticFolder).then(() => {
      console.log(`static done`);
    }).catch((err) => {
      console.log(err);
    });

    // server on
    https.createServer(pems, app).listen(PORT, () => { console.log(`\x1b[33m%s\x1b[0m`, `\nServer running\n`); });

  } catch (e) {
    console.log(e);
  }
}

module.exports = AbstractRabbit;
