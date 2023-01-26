const SecondGhost = function (mother = null, back = null, address = null) {
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
  const { WebClient } = require("@slack/web-api");
  this.dir = process.cwd() + "/apps/secondGhost";
  this.slack_token = "xoxb-717757271335-4566120587107-i7TxxYzbPWPzdBMPoZDo2kxn";
  this.slack_userToken = "xoxp-717757271335-704486967090-4566130160163-fd2a2cc412e2a509a43635fb8f6c65e2";
  this.slack_bot = new WebClient(this.slack_token);
  this.telegram = {
    chat: {
      general: "-806575867",
      notice: "-896011842",
      operation: "-895560263",
      request: "-625365105",
      plan: "-799916015",
      clare: "-882308233",
      jyeun: "-835972543",
    },
    bot: {
      log: "-741702420",
      general: "-771644766",
      emergency: "-754872890",
      consulting: "-856907489",
      operation: "-728861584",
      proposal: "-885912068",
      mail: "-617429987",
      taxbill: "-802082485",
      console: "-818998366"
    },
    token: "5127747215:AAHDSmjmeYNJ4C4B5hWdAO-T1bJleSfOpGU",
    url: (token) => { return `https://api.telegram.org/bot${token}/sendMessage` }
  }
}

SecondGhost.prototype.ghostConnect = async function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink, mongo, mongoinfo, mongolocalinfo, errorLog, messageLog, setQueue, requestSystem, dateToString, sleep, equalJson } = this.mother;
  const { slack_userToken } = this;
  const PORT = 3000;
  const https = require("https");
  const express = require("express");
  const app = express();
  const multer = require("multer");
  const multiForms = multer();
  const useragent = require("express-useragent");
  const staticFolder = process.env.HOME + "/static";

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
    console.log(`\x1b[36m\x1b[1m%s\x1b[0m`, `launching second ghost ==============`);
    console.log(``);

    //set mongo connetion
    let MONGOC, MONGOLOCALC;
    MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
    MONGOLOCALC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
    console.log(`\x1b[33m%s\x1b[0m`, `set DB server => ${this.address.mongoinfo.host}`);
    console.log(``);
    await MONGOC.connect();
    await MONGOLOCALC.connect();

    //set pem key
    let pems, pemsLink;
    let certDir, keyDir, caDir;

    pems = {};
    pemsLink = process.cwd() + "/pems/" + this.address.secondinfo.host;

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
    const SecondRouter = require(`${this.dir}/router/secondRouter.js`);
    const router = new SecondRouter(this.slack_bot, MONGOC, MONGOLOCALC, slack_userToken, this.telegram);

    const rouObj = router.getAll();
    for (let obj of rouObj.get) {
      app.get(obj.link, obj.func);
    }
    for (let obj of rouObj.post) {
      app.post(obj.link, obj.func);
    }
    console.log(`set router`);

    //server on
    https.createServer(pems, app).listen(PORT, () => { console.log(`\x1b[33m%s\x1b[0m`, `\nServer running\n`); });

  } catch (e) {
    console.log(e);
  }
}

module.exports = SecondGhost;
