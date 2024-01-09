const LocalObserver = function (mother = null, back = null, address = null) {
  if (mother !== null && back !== null && address !== null) {
    this.mother = mother;
    this.back = back;
    this.address = address;
  } else {
    const Mother = require(process.cwd() + "/apps/mother.js");
    const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js");
    const ADDRESS = require(process.cwd() + "/apps/infoObj.js");
    this.mother = new Mother();
    this.back = new BackMaker();
    this.address = ADDRESS;
  }
  this.dir = process.cwd() + "/apps/localObserver";
}

LocalObserver.prototype.localConnect = async function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink, mongo, mongoinfo, mongolocalinfo, mongopythoninfo, mongoconsoleinfo, mongotestinfo, mongosecondinfo, errorLog, messageLog, setQueue, requestSystem, dateToString, sleep, expressLog, emergencyAlarm, aliveLog, cronLog, alertLog } = this.mother;
  const PORT = 3000;
  const http = require("http");
  const express = require("express");
  const app = express();
  const useragent = require("express-useragent");
  const staticFolder = process.env.HOME + "/samba";
  const fs = require("fs");
  const logKeyword = "expressLog";
  const logFolder = process.env.HOME + "/server/log";
  const thisLogFile = `${logFolder}/${logKeyword}_${(new Date()).valueOf()}.log`;
  const serverName = "local";

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
    console.log(``);
    console.log(`\x1b[36m\x1b[1m%s\x1b[0m`, `launching local observer ==============`);
    console.log(``);

    //set router
    const LocalRouter = require(`${this.dir}/router/localRouter.js`);
    const router = new LocalRouter();
    await router.setMembers();
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

    //server on
    http.createServer(app).listen(PORT, () => { console.log(`\x1b[33m%s\x1b[0m`, `\nServer running\n`); });

  } catch (e) {
    console.log(e);
  }
}

module.exports = LocalObserver;