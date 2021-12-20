const Clown = function () {
  const Mother = require(process.cwd() + "/apps/mother.js");
  const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js");
  const ADDRESS = require(process.cwd() + "/apps/infoObj.js");
  this.mother = new Mother();
  this.back = new BackMaker();
  this.address = ADDRESS;
}

Clown.prototype.clownRouter = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const { fileSystem, headRequest, requestSystem, shellExec, shellLink, ghostRequest, dateToString, todayMaker, mongo, mongoinfo, mongolocalinfo, sleep, equalJson, leafParsing, statusReading, uniqueValue, setQueue, ipParsing, errorLog, messageSend, messageLog } = this.mother;
  const querystring = require("querystring");
  const os = require("os");
  let funcObj, resultObj;

  funcObj = {};

  //GET - hello?
  funcObj.get_root = {
    link: [ "/" ],
    func: async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      try {
        res.send({ message: "hello?" });
      } catch (e) {
        res.send({ message: "error : " + e.message });
      }
    }
  };

  //GET - os status
  funcObj.get_status = {
    link: [ "/status" ],
    func: async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      try {
        let statusBox;

        statusBox = {
          cpu: os.cpus(),
          os: {
            type: os.type(),
            platform: os.platform(),
            arch: os.arch(),
            release: os.release(),
            uptime: os.uptime()
          },
          memory: {
            total: os.totalmem(),
            free: os.freemem(),
          },
          network: os.networkInterfaces()
        };

        res.send(statusBox);
      } catch (e) {
        res.send({ message: "error : " + e.message });
      }
    }
  };

  //POST - shell
  funcObj.post_shell = {
    link: [ "/shell" ],
    func: async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      try {
        if (typeof req.body.command !== "string") {
          throw new Error("must be post 'command'");
        }
        const { command } = req.body;
        let order, stdout;

        order = '';
        if (Array.isArray(command)) {
          for (let c of command) {
            order += c + ';';
          }
        } else {
          order = command;
        }

        if (req.body.async !== undefined) {
          shellExec(order).catch((err) => { throw new Error(err); });
          res.send({ message: "will do" });
        } else {
          stdout = await shellExec(order);
          res.send({ stdout });
        }
      } catch (e) {
        res.send({ message: "error : " + e.message });
      }
    }
  };

  //end : set router
  resultObj = { get: [], post: [] };
  for (let i in funcObj) {
    resultObj[i.split('_')[0]].push(funcObj[i]);
  }
  return resultObj;
}

Clown.prototype.serverConnect = async function () {
  const instance = this;
  const PORT = 3030;
  const http = require("http");
  const express = require("express");
  const app = express();
  const multer = require("multer");
  const multiForms = multer();
  const useragent = require("express-useragent");
  try {

    app.use(useragent.express());
    app.use(express.json({ limit : "50mb" }));
    app.use(multiForms.array());
    app.use(express.urlencoded({ limit: "50mb", extended: true }));

    const { get, post } = this.clownRouter();
    for (let obj of get) {
      app.get(obj.link, obj.func);
    }
    for (let obj of post) {
      app.post(obj.link, obj.func);
    }

    http.createServer(app).listen(PORT, () => { console.log(`\x1b[33m%s\x1b[0m`, `\nServer running\n`); });

  } catch (e) {
    console.log(e);
  }
}

Clown.prototype.launching = async function () {
  const instance = this;
  const address = this.address;
  const { requestSystem } = this.mother;
  try {
    const { app, BrowserWindow } = require("electron");
    let main;

    app.whenReady().then(() => {
      const mainWindow = new BrowserWindow({
        width: 5000,
        height: 5000,
        title: "HomeLiaison Console",
        titleBarStyle: "hidden",
        roundedCorners: true,
      });

      mainWindow.maximize();
      mainWindow.loadURL("https://" + address.homeinfo.ghost.host);

      return mainWindow;
    }).then((mainWindow) => {
      main = mainWindow;
      return requestSystem("https://" + address.officeinfo.ghost.host + "/officeMonitor/subway");
    }).catch((err) => {
      console.log(err);
    });

    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    });

    await this.serverConnect();

  } catch (e) {
    console.log(e);
  }
}

const app = new Clown();
app.launching().catch((err) => { console.log(err); })
