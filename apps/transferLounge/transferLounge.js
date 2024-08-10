const TransferLounge = function (mother = null, back = null, address = null) {
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
  this.dir = process.cwd() + "/apps/transferLounge";
  const { WebClient } = require("@slack/web-api");
  this.slack_token = this.address.officeinfo.slack.bot;
  this.slack_userToken = this.address.officeinfo.slack.user;
  this.slack_bot = new WebClient(this.slack_token);
  this.slack_user = new WebClient(this.slack_userToken);
  this.slack_info = {
    endPoint: "https://slack.com/api",
    userDictionary: {},
    channelDictionary: {
      "CLQERRWR1": "general",
      "CLQERS2CB": "homestyling-platform",
      "CLVGBR8HX": "random",
      "CPLC56QUW": "plan_image",
      "CRWHWBN2V": "cooperation",
      "C01DG384RFF": "to-do-list",
      "CLY8SV681": "401_consulting",
      "CM1T6HXLM": "502_sns_contents",
      "CM20UBN3S": "403_proposal",
      "CM3PM73LP": "000_master_notice",
      "C02SQGGTG00": "001_staff_notice",
      "CUZGKGUBS": "100_service",
      "CM4G6QBRT": "300_designer",
      "CM5H48SJG": "105_ir",
      "CM9PHLM0D": "200_web",
      "C02RP66AK6C": "201_test",
      "C02K21JU5K5": "202_request",
      "C03RCHW40UT": "203_schedule",
      "C03UMHVQQT1": "204_magazine",
      "C04CK5X9Q83": "301_console",
      "CMZMWGK1A": "400_customer",
      "C02AE3H16US": "404_curation",
      "C03KHAUAL9Y": "405_mini",
      "CNY9UEBEG": "500_marketing",
      "C01HHA4DC0K": "503_contents",
      "CS05EFPD1": "900_design",
      "C0135LFQH7X": "700_operation",
      "C0236JSQGGP": "701_taxbill",
      "C04DN6KMHBR": "702_mail",
      "C01E32KPH0Q": "수다방",
      "C01EBS9E5BK": "시공",
      "C02FBSYM40G": "file",
      "C02KKLHUVBJ": "call",
      "C04H4LBJZ3R": "emergency_alarm",
      "C04LB1RBWQ5": "plan",
    },
    attackTarget: {
      user: "U05NNQYUFHD",
      channel: "D062B65SSNS",
    },
  };
}

TransferLounge.prototype.transConnect = async function () {
  const instance = this;
  const back = this.back;
  const { fileSystem, shellExec, shellLink, mongo, mongoinfo, mongolocalinfo, errorLog, messageLog, setQueue, requestSystem, dateToString, sleep, expressLog, emergencyAlarm, cronLog, aliveLog, alertLog } = this.mother;
  const { slack_userToken, slack_info } = this;
  const PORT = 3000;
  const https = require("https");
  const express = require("express");
  const app = express();
  const useragent = require("express-useragent");
  const staticFolder = process.env.HOME + "/static";
  const fs = require("fs");
  const logKeyword = "expressLog";
  const logFolder = process.env.HOME + "/server/log";
  const thisLogFile = `${logFolder}/${logKeyword}_${(new Date()).valueOf()}.log`;
  const serverName = "trans";

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
    console.log(`\x1b[36m\x1b[1m%s\x1b[0m`, `launching transfer lounge ==============`);
    console.log(``);

    //set mongo connetion
    let MONGOC, MONGOLOCALC;
    MONGOC = new mongo(mongoinfo);
    MONGOLOCALC = new mongo(mongolocalinfo);
    console.log(`\x1b[33m%s\x1b[0m`, `set DB server => ${this.address.mongoinfo.host}`);
    console.log(``);
    await MONGOC.connect();
    await MONGOLOCALC.connect();

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
    pemsLink = process.cwd() + "/pems/" + this.address.transinfo.host;

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

    //set member slack info
    let members;
    members = await back.setMemberObj({ getMode: true, selfMongo: MONGOC });
    members = members.map((member) => {
      return member.slack;
    }).filter((obj) => {
      return obj.id !== null;
    });
    for (let { id, name } of members) {
      slack_info.userDictionary[id] = name;
    }

    //set router
    const TransferRouter = require(`${this.dir}/router/transferRouter.js`);
    const router = new TransferRouter(this.slack_bot, this.slack_user, MONGOC, MONGOLOCALC, slack_userToken, slack_info, kakaoInstance, humanInstance);
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
    https.createServer(pems, app).listen(PORT, () => { console.log(`\x1b[33m%s\x1b[0m`, `\nServer running\n`); });

  } catch (e) {
    console.log(e);
  }
}

module.exports = TransferLounge;
