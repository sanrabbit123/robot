const RecordCloud = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  this.mother = new Mother();
  this.back = new BackMaker();
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
  }
}

RecordCloud.prototype.recordServerLaunching = async function () {
  const instance = this;
  const back = this.back;
  const { webHook, dir, responseHeader, db, router } = this;
  const { fileSystem, shell, shellLink, mongo, mongolocalinfo, requestSystem, slack_bot, ipParsing, equalJson } = this.mother;
  const http = require("http");
  const express = require("express");
  const app = express();
  const multer = require("multer");
  const multiForms = multer();
  const useragent = require("express-useragent");

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
        let ipObj;

        ipObj = await ipParsing(ip);
        if (ipObj === null) {
          ipObj = { ip };
        }
        await MONGOLOCALC.db(db).collection(router.message.collection).insertOne({
          date: new Date(),
          message: req.body.message,
          from: { referrer, userAgent, browser, os, platform, mobile: rawUserAgent.isMobile, ...ipObj }
        });
        await requestSystem(webHook.url, webHook.message(req.body.message), { headers: webHook.headers });
        res.send(JSON.stringify({ message: "done" }));
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
        let ipObj;

        ipObj = await ipParsing(ip);
        if (ipObj === null) {
          ipObj = { ip };
        }

        await MONGOLOCALC.db(db).collection(router.error.collection).insertOne({
          date: new Date(),
          message: req.body.message,
          from: { referrer, userAgent, browser, os, platform, mobile: rawUserAgent.isMobile, ...ipObj }
        });

        await requestSystem(webHook.url, webHook.message(req.body.message), { headers: webHook.headers });
        slack_bot.chat.postMessage({ text: req.body.message, channel: webHook.channel });

        res.send(JSON.stringify({ message: "done" }));
      } catch (e) {
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    console.log(`set router`);

    //server on
    http.createServer(app).listen(3000, () => {
      console.log(``);
      console.log(`\x1b[33m%s\x1b[0m`, `Server running`);
    });

  } catch (e) {
    console.log(e);
  }
}

module.exports = RecordCloud;
