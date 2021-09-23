const RecordCloud = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  const NotionAPIs = require(`${process.cwd()}/apps/notionAPIs/notionAPIs.js`);
  this.address = require(`${process.cwd()}/apps/infoObj.js`);
  this.mother = new Mother();
  this.back = new BackMaker();
  this.notion = new NotionAPIs();
  this.dir = process.cwd() + "/apps/recordCloud";
  this.webHook = {
    url: "https://wh.jandi.com/connect-api/webhook/20614472/1c7efd1bd02b1e237092e1b8a694e844",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Accept": "application/vnd.tosslab.jandi-v2+json"
    },
    message: (message) => {
      return {
        body: message,
        connectColor: "#FAC11B",
        connectInfo: []
      }
    },
    channel: "#error_log"
  };
  this.responseHeader = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
    "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
  };
  this.db = "miro81";
  this.router = {
    message: {
      router: "/message",
      collection: "messageLog"
    },
    error: {
      router: "/error",
      collection: "errorLog"
    },
    status: {
      router: "/status",
      collection: "statusLog",
      notion: "c0face620d04433187a7169c90d47a4e",
    }
  };
}

RecordCloud.prototype.recordServerLaunching = async function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const { webHook, dir, responseHeader, db, router, notion } = this;
  const { fileSystem, shell, shellLink, mongo, mongolocalinfo, requestSystem, slack_bot, ipParsing, equalJson, statusReading } = this.mother;
  const http = require("http");
  const express = require("express");
  const app = express();
  const multer = require("multer");
  const multiForms = multer();
  const useragent = require("express-useragent");
  const port = 3000;

  app.use(useragent.express());
  app.use(express.json({ limit : "50mb" }));
  app.use(multiForms.array());
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  try {
    await back.setInfoObj({ getMode: false });

    const MONGOLOCALC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
    await MONGOLOCALC.connect();
    console.log(`set db`);

    //set router
    app.get("/ssl", (req, res) => {
      statusReading().catch((err) => {
        console.log(err);
      });
      res.set("Content-Type", "application/json");
      res.send(JSON.stringify({ message: "hi" }));
    });

    app.post(router.message.router, async (req, res) => {
      const ip = String(req.headers['x-forwarded-for'] === undefined ? req.connection.remoteAddress : req.headers['x-forwarded-for']).trim().replace(/[^0-9\.]/gi, '');
      const rawUserAgent = req.useragent;
      const { source: userAgent, browser, os, platform } = rawUserAgent;
      const referrer = (req.headers.referer === undefined ? "" : req.headers.referer);
      res.set(responseHeader);
      try {
        if (typeof req.body.message !== "string") {
          throw new Error("must be message string field");
        }
        let ipObj, thisName;

        ipObj = await ipParsing(ip);
        if (ipObj === null) {
          ipObj = { ip };
        }

        thisName = "unknown";
        for (let info in address) {
          if (ip === address[info].ip.outer) {
            thisName = info.replace(/info$/, '');
            break;
          }
        }

        await MONGOLOCALC.db(db).collection(router.message.collection).insertOne({
          date: new Date(),
          message: req.body.message,
          from: { name: thisName, referrer, userAgent, browser, os, platform, mobile: rawUserAgent.isMobile, ...ipObj }
        });
        await requestSystem(webHook.url, webHook.message(req.body.message), { headers: webHook.headers });
        res.send(JSON.stringify({ name: thisName, message: "done" }));
      } catch (e) {
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });

    app.post(router.error.router, async (req, res) => {
      const ip = String(req.headers['x-forwarded-for'] === undefined ? req.connection.remoteAddress : req.headers['x-forwarded-for']).trim().replace(/[^0-9\.]/gi, '');
      const rawUserAgent = req.useragent;
      const { source: userAgent, browser, os, platform } = rawUserAgent;
      const referrer = (req.headers.referer === undefined ? "" : req.headers.referer);
      res.set(responseHeader);
      try {
        if (req.body.message === undefined) {
          throw new Error("must be message field");
        }
        let ipObj, thisName;

        ipObj = await ipParsing(ip);
        if (ipObj === null) {
          ipObj = { ip };
        }

        thisName = "unknown";
        for (let info in address) {
          if (ip === address[info].ip.outer) {
            thisName = info.replace(/info$/, '');
            break;
          }
        }

        await MONGOLOCALC.db(db).collection(router.error.collection).insertOne({
          date: new Date(),
          message: req.body.message,
          from: { name: thisName, referrer, userAgent, browser, os, platform, mobile: rawUserAgent.isMobile, ...ipObj }
        });

        await requestSystem(webHook.url, webHook.message(req.body.message), { headers: webHook.headers });
        slack_bot.chat.postMessage({ text: req.body.message, channel: webHook.channel });

        res.send(JSON.stringify({ name: thisName, message: "done" }));
      } catch (e) {
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });

    app.post(router.status.router, async (req, res) => {
      const ip = String(req.headers['x-forwarded-for'] === undefined ? req.connection.remoteAddress : req.headers['x-forwarded-for']).trim().replace(/[^0-9\.]/gi, '');
      const rawUserAgent = req.useragent;
      const { source: userAgent, browser, os, platform } = rawUserAgent;
      const referrer = (req.headers.referer === undefined ? "" : req.headers.referer);
      res.set(responseHeader);
      try {
        const status = equalJson(req.body);
        let ipObj, notionObj, thisName;

        ipObj = await ipParsing(ip);
        if (ipObj === null) {
          ipObj = { ip };
        }

        thisName = "unknown";
        for (let info in address) {
          if (ip === address[info].ip.outer) {
            thisName = info.replace(/info$/, '');
            break;
          }
        }

        await MONGOLOCALC.db(db).collection(router.status.collection).insertOne({
          date: new Date(),
          status: equalJson(JSON.stringify(status)),
          from: { name: thisName, referrer, userAgent, browser, os, platform, mobile: rawUserAgent.isMobile, ...ipObj }
        });

        // notionObj = {};
        // notionObj.title = thisName;
        // notionObj.date = status.date;
        // notionObj.cpu_used = String(Math.round(status.cpu.used * 100 * 100) / 100) + '%';
        // notionObj.cpu_idle = String(Math.round(status.cpu.idle * 100 * 100) / 100) + '%';
        // notionObj.processes_total = status.processes.total;
        // notionObj.processes_running = status.processes.running;
        // notionObj.memory_total = String(Math.round((Math.round(status.memory.total / (1024 * 1024)) / 1024) * 1000) / 1000) + "Gb";
        // notionObj.memory_used = String(Math.round((Math.round((status.memory.total - status.memory.free) / (1024 * 1024)) / 1024) * 1000) / 1000) + "Gb";
        // notionObj.start = status.start;
        // notionObj.disk_total = String(Math.round((Math.round(status.disk.total / (1024 * 1024)) / 1024) * 1000) / 1000) + "Gb";
        // notionObj.disk_used = String(Math.round((Math.round(status.disk.used / (1024 * 1024)) / 1024) * 1000) / 1000) + "Gb";
        // notionObj.disk_available = String(Math.round((Math.round(status.disk.available / (1024 * 1024)) / 1024) * 1000) / 1000) + "Gb";
        // notionObj.pm2_number = status.pm2.length;
        // notionObj.pm2_names = status.pm2.map((obj) => { return obj.name; }).join(", ");
        // notionObj.pm2_uptime = status.pm2.map((obj) => { return obj.uptime; }).join(", ");
        // notionObj.pm2_status = status.pm2.map((obj) => { return obj.status; }).join(", ");
        // notionObj.pm2_cpu = status.pm2.map((obj) => { return String(Math.round(obj.cpu * 100 * 100) / 100) + '%'; }).join(", ");
        // notionObj.pm2_memory = status.pm2.map((obj) => { return String(Math.round((Math.round(obj.memory / 1024) / 1024) * 1000) / 1000) + "Mb"; }).join(", ");
        //
        // notion.appendRow(router.status.notion, notionObj).then((message) => {
        //   console.log(message);
        // }).catch((err) => {
        //   throw new Error(err);
        // });

        res.send(JSON.stringify({ name: thisName, message: "done" }));
      } catch (e) {
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });

    console.log(`set router`);

    //server on
    http.createServer(app).listen(port, () => {
      console.log(``);
      console.log(`\x1b[33m%s\x1b[0m`, `Server running`);
    });

  } catch (e) {
    console.log(e);
  }
}

module.exports = RecordCloud;
