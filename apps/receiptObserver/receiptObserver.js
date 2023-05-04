const ReceiptObserver = function () {
  const Mother = require(process.cwd() + "/apps/mother.js");
  const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js");
  const ADDRESS = require(process.cwd() + "/apps/infoObj.js");
  this.mother = new Mother();
  this.back = new BackMaker();
  this.address = ADDRESS;
  this.dir = process.cwd() + "/apps/receiptObserver";
}

ReceiptObserver.prototype.wssClientLaunching = async function (url = "") {
  const instance = this;
  const { mongo, mongoinfo, mongolocalinfo, messageSend } = this.mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  const back = this.back;
  const address = this.address;
  const WebSocket = require('ws');
  const autoComma = function (str) {
    if (typeof str === "number") {
      str = String(str);
    }
    let minus, num, tmp;

    if (/\-/g.test(str)) {
      minus = /\-/g.exec(str)[0];
    } else {
      minus = '';
    }

    num = str.replace(/[^0-9]/g, '');
    tmp = '';

    if (num.length < 4) {
      return minus + num;
    } else if (num.length < 7) {
      tmp += num.slice(-6, -3) + ',' + num.slice(-3);
      return minus + tmp;
    } else if (num.length < 10) {
      tmp += num.slice(-9, -6) + ',' + num.slice(-6, -3) + ',' + num.slice(-3);
      return minus + tmp;
    } else if (num.length < 13) {
      tmp += num.slice(-12, -9) + ',' + num.slice(-9, -6) + ',' + num.slice(-6, -3) + ',' + num.slice(-3);
      return minus + tmp;
    } else if (num.length < 16) {
      tmp += num.slice(-15, -12) + ',' + num.slice(-12, -9) + ',' + num.slice(-9, -6) + ',' + num.slice(-6, -3) + ',' + num.slice(-3);
      return minus + tmp;
    }

    return minus + num;
  }
  try {

    await MONGOC.connect();
    const selfMongo = MONGOC;
    const ws = new WebSocket("wss://stream.pushbullet.com/websocket/o.MJyKgIBma8O14mg0VOZrsCdf8X8L6UJF");
    const emptyDate = new Date(2000, 0, 1);
    const emptyDateValue = (new Date(2000, 0, 1)).valueOf();
    const contract = 330000;
    const channel = "#700_operation";

    setTimeout(async () => {
      await MONGOC.close();
      process.exit();
    }, (1000 * 60 * 60 * 24) + (1000 * 60 * 5));

    console.log(`\x1b[33m%s\x1b[0m`, `Wss running`);

    ws.on('message', async (raw) => {
      try {
        const data = JSON.parse(raw.replace(/^\n/, '').replace(/\n$/, '').trim());
        if (data.type === "push") {
          const { push: { type } } = data;
          if (type === "sms_changed") {
            const { notifications } = data.push;
            let tempArr;
            let amount, who;
            let whereQuery, updateQuery;
            let projects, clients;
            let cliid, proid;
            let boo;
            let num;
            let message;
            await messageSend({ text: "문자 변동 감지", channel: "#error_log" });
            for (let { body } of notifications) {
              if (/\[Web/.test(body.trim()) && /입금/gi.test(body) && /원/gi.test(body) && /\]/gi.test(body) && /\//gi.test(body) && /\:/gi.test(body)) {
                tempArr = body.split("원");

                amount = Number(((tempArr[0].split("입금"))[1]).replace(/[^0-9]/gi, ''));
                who = ((tempArr[1].split("\n"))[1]).trim();

                clients = await back.getClientsByQuery({ name: who.replace(/[^가-힣]/gi, '') }, { selfMongo });

                cliid = null;
                proid = null;
                message = "";

                if (clients.length > 0) {
                  projects = [];
                  num = 0;
                  while (projects.length === 0 && clients[num] !== undefined) {
                    whereQuery = {};
                    whereQuery["$and"] = [];
                    whereQuery["$and"].push({ "process.contract.remain.calculation.amount.consumer": amount + contract });
                    whereQuery["$and"].push({ "process.contract.remain.date": { "$lt": emptyDate } });
                    whereQuery["$and"].push({ "process.contract.first.date": { "$gt": emptyDate } });
                    whereQuery["$and"].push({ "desid": { "$regex": "^d" } });
                    whereQuery["$and"].push({ "cliid": clients[num].cliid });
                    projects = await back.getProjectsByQuery(whereQuery, { selfMongo });
                    num++;
                  }
                  if (projects.length > 0) {
                    cliid = clients[num - 1].cliid;
                    proid = projects[0].proid;
                  }
                }

                if (cliid === null || proid === null) {
                  message += `해석할 수 없는 문자가 왔습니다! 직접 해석해주세요!`;
                } else {
                  message += `고객 아이디: ${cliid} / 프로젝트 아이디: ${proid} / 금액: ${autoComma(amount)}원\n`;
                  message += `고객 : https://${address["backinfo"]["host"]}/client?cliid=${cliid}\n`;
                  message += `프로젝트 : https://${address["backinfo"]["host"]}/project?proid=${proid}`;
                }

                message += "\n";
                message += body;

                await messageSend({ text: message, channel });
                await MONGOC.close();
                process.exit();

              }
            }
          }
        }

      } catch (e) {
        console.log(e);
      }
    });

  } catch (e) {
    console.log(e);
  }
}

ReceiptObserver.prototype.taxServerLaunching = async function () {
  const instance = this;
  const { fileSystem, shell, shellLink, mongo, mongoinfo, mongolocalinfo, expressLog } = this.mother;
  const https = require("https");
  const express = require("express");
  const app = express();
  const multer = require("multer");
  const multiForms = multer();
  const useragent = require("express-useragent");
  const fs = require("fs");
  const logKeyword = "expressLog";
  const logFolder = process.env.HOME + "/server/log";
  const thisLogFile = `${logFolder}/${logKeyword}_${(new Date()).valueOf()}.log`;
  const serverName = "python";

  app.use(useragent.express());
  app.use(express.json({ limit : "50mb" }));
  app.use(multiForms.array());
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
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
    await this.back.setInfoObj({ getMode: false });

    const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
    const MONGOLOCALC = new mongo(mongolocalinfo, { useUnifiedTopology: true });

    await MONGOC.connect();
    await MONGOLOCALC.connect();
    console.log(`set db`);

    //set kakao
    const KakaoTalk = require(`${process.cwd()}/apps/kakaoTalk/kakaoTalk.js`);
    const kakaoInstance = new KakaoTalk();

    //set human
    const HumanPacket = require(`${process.cwd()}/apps/humanPacket/humanPacket.js`);
    const humanInstance = new HumanPacket();

    //set pem key
    let pems = {};
    let pemsLink = process.cwd() + "/pems/" + this.address.pythoninfo.host;
    let certDir, keyDir, caDir;

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
    const ReceiptRouter = require(`${this.dir}/router/receiptRouter.js`);
    const router = new ReceiptRouter(MONGOC, MONGOLOCALC, kakaoInstance, humanInstance);
    const rouObj = router.getAll();
    const logStream = fs.createWriteStream(thisLogFile);
    await expressLog(serverName, logStream, "start");
    
    for (let obj of rouObj.get) {
      app.get(obj.link, async function (req, res) {
        try {
          expressLog(serverName, logStream, "route", req).catch((err) => { console.log(err) });
          await obj.func(req, res);
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
          await obj.func(req, res);
        } catch (e) {
          console.log(e);
          res.set("Content-Type", "application/json");
          res.send(JSON.stringify({ error: e.message }));
        }
      });
    }
    console.log(`set router`);

    //server on
    https.createServer(pems, app).listen(3000, () => {
      console.log(``);
      console.log(`\x1b[33m%s\x1b[0m`, `Server running`);
      console.log(``);
    });

  } catch (e) {
    console.log(e);
  }
}

module.exports = ReceiptObserver;
