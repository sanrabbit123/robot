class StaticLounge {
  constructor (mother = null, back = null, address = null) {
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
    this.dir = process.cwd() + "/apps/staticLounge";
  }
}

StaticLounge.prototype.staticConnect = async function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink, mongo, mongoinfo, mongolocalinfo, mongoconsoleinfo, mongocontentsinfo, errorLog, messageLog, setQueue, requestSystem, dateToString, sleep, expressLog, emergencyAlarm, aliveLog, cronLog, alertLog } = this.mother;
  const PORT = 3000;
  const https = require("https");
  const express = require("express");
  const app = express();
  const useragent = require("express-useragent");
  const staticFolder = process.env.HOME + "/samba";
  const fs = require("fs");
  const logKeyword = "expressLog";
  const logFolder = process.env.HOME + "/server/log";
  const thisLogFile = `${logFolder}/${logKeyword}_${(new Date()).valueOf()}.log`;
  const serverName = "static";

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
    console.log(`\x1b[36m\x1b[1m%s\x1b[0m`, `launching static lounge ==============`);
    console.log(``);

    //set mongo connetion
    const MONGOC = new mongo(mongoinfo);
    console.log(`\x1b[33m%s\x1b[0m`, `set DB server => ${this.address.mongoinfo.host}`);
    console.log(``);
    await MONGOC.connect();

    //set kakao
    const KakaoTalk = require(`${process.cwd()}/apps/kakaoTalk/kakaoTalk.js`);
    const kakaoInstance = new KakaoTalk();

    //set human
    const HumanPacket = require(`${process.cwd()}/apps/humanPacket/humanPacket.js`);
    const humanInstance = new HumanPacket();

    //set pem key
    let pems, pemsLink;
    let certDir, keyDir, caDir;

    pems = {};
    pemsLink = process.cwd() + "/pems/" + this.address.officeinfo.host;

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
    const StaticRouter = require(`${this.dir}/router/staticRouter.js`);
    const staticRouter = new StaticRouter(MONGOC, kakaoInstance, humanInstance);
    const router = staticRouter.setRouter();
    app.use("/", router);

    //server on
    https.createServer(pems, app).listen(PORT, () => { console.log(`\x1b[33m%s\x1b[0m`, `\nServer running\n`); });

  } catch (e) {
    console.log(e);
  }
}

module.exports = StaticLounge;
