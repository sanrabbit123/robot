const CronGhost = function () {
  const Mother = require(process.cwd() + "/apps/mother.js");
  const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js");
  const ADDRESS = require(process.cwd() + "/apps/infoObj.js");

  this.mother = new Mother();
  this.back = new BackMaker();
  this.address = ADDRESS;
  this.dir = `${process.cwd()}/apps/cronGhost`;
  this.list = [];
}

CronGhost.prototype.aliveTest = async function () {
  const instance = this;
  const address = this.address;
  const { requestSystem, messageLog, errorLog } = this.mother;
  const generalPort = 3000;
  const controlPath = "/ssl";
  const BillMaker = require(`${process.cwd()}/apps/billMaker/billMaker.js`);
  const bill = new BillMaker();
  let res, targets, targetNumber, successNum, failNum, message;
  try {

    targets = [
      { name: "python", protocol: "https:", host: address.pythoninfo.host, port: generalPort, },
      { name: "post", protocol: "https:", host: address.backinfo.host, port: generalPort, },
      { name: "log", protocol: "https:", host: address.testinfo.host, port: generalPort, },
      { name: "second", protocol: "https:", host: address.secondinfo.host, port: generalPort, },
      { name: "trans", protocol: "https:", host: address.transinfo.host, port: generalPort, },
      { name: "office", protocol: "https:", host: address.officeinfo.ghost.host, port: generalPort, },
    ];

    targetNumber = targets.length;
    successNum = 0;
    failNum = 0;
    message = '';

    for (let { name, protocol, host, port } of targets) {

      boo = false;
      try {
        res = await requestSystem(protocol + "//" + host + ':' + String(port) + controlPath);
      } catch {
        res = null;
      }

      if (typeof res === "object" && res !== null) {
        if (res.status !== undefined && typeof res.status === "number") {
          if (res.status === 200) {
            console.log("\x1b[32m%s\x1b[0m", name + " server alive");
            successNum = successNum + 1;
            message += "\n" +  name + " server alive";
            boo = true;
            if (successNum === targetNumber) {
              console.log("\x1b[33m%s\x1b[0m", "all alive");
              message = "server all alive";
              await errorLog(message);
            } else if (successNum + failNum === targetNumber) {
              console.log("\x1b[33m%s\x1b[0m", "something death");
              message += "\n======================================";
              message += "\nsomething death";
              await errorLog(message);
            }
          }
        }
      }

      if (!boo) {
        failNum = failNum + 1;
        console.log("\x1b[32m%s\x1b[0m", name + " server death");
        message += "\n" +  name + " server death";
        if (successNum + failNum === targetNumber) {
          console.log("\x1b[33m%s\x1b[0m", "something death");
          message += "\n======================================";
          message += "\nsomething death";
          await errorLog(message);
        }
      }

    }

    requestSystem("https://" + address.officeinfo.ghost.host + ":" + String(generalPort) + "/parsingCashReceipt", { data: null }, { headers: { "Content-Type": "application/json" } }).then(() => {
      return requestSystem("https://" + address.pythoninfo.host + ":" + String(generalPort) + "/stylingFormSync", { data: null }, { headers: { "Content-Type": "application/json" } });
    }).then(() => {
      return requestSystem("https://" + address.backinfo.host + ":" + String(generalPort) + "/callHistory", { data: null }, { headers: { "Content-Type": "application/json" } });
    }).catch((e) => {
      throw new Error(e);
    });

  } catch (e) {
    await errorLog("alive test error : " + e.message);
  }
}

CronGhost.prototype.diskTest = async function () {
  const instance = this;
  const { requestSystem, errorLog } = this.mother;
  try {
    const targets = [
      { name: "post", host: instance.address.backinfo.host },
      { name: "python", host: instance.address.pythoninfo.host },
      { name: "log", host: instance.address.testinfo.host },
      { name: "second", host: instance.address.secondinfo.host },
      { name: "trans", host: instance.address.transinfo.host },
    ]
    const robotPort = 3000;
    const pathConst = "/disk";
    const protocol = "https:";
    let response;
    for (let { name, host } of targets) {
      response = await requestSystem(protocol + "//" + host + ":" + String(robotPort) + pathConst);
      console.log(response.data.disk);
      if (response.data.disk[2] < 100000) {
        await errorLog(name + " " + "disk warning");
      }
    }
    await errorLog("disk check done");
  } catch (e) {
    console.log(e);
  }
}

CronGhost.prototype.cronServer = async function () {
  const instance = this;
  const address = this.address;
  const { shellExec, fileSystem, messageSend, requestSystem, pureServer, dateToString, mongo, mongolocalinfo, mongoinfo, mongoconsoleinfo, errorLog } = this.mother;
  const port = 53001;
  const interval = (10 * 60 * 1000);
  const dateCopy = (dateObj) => { return new Date(JSON.stringify(dateObj).slice(1, -1)); }
  const zeroAddition = (num) => { return num < 10 ? `0${String(num)}` : String(num) }
  const CronSource = require(`${this.dir}/source/cronSource.js`);
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  const MONGOLOCALC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
  const MONGOCONSOLEC = new mongo(mongoconsoleinfo, { useUnifiedTopology: true });
  const BackWorker = require(`${process.cwd()}/apps/backMaker/backWorker.js`);
  const HumanPacket = require(`${process.cwd()}/apps/humanPacket/humanPacket.js`);
  try {
    const human = new HumanPacket();
    const work = new BackWorker();
    const https = require("https");
    const express = require("express");
    const app = express();
    const id = "help";
    const pwd = "hlofwis83!";
    const targetEmail = "hometaxadmin@hometax.go.kr";
    const standardFile = process.cwd() + "/temp/mailStandard.json";
    let pems;
    let pemsLink;
    let certDir;
    let keyDir;
    let caDir;
    let intervalFunc, startTime, today;
    let intervalFunc0, intervalFunc1;

    app.use(express.json({ limit: "50mb" }));
    app.use(express.urlencoded({ limit: "50mb", extended: true }));

    await MONGOC.connect();
    await MONGOLOCALC.connect();
    await MONGOCONSOLEC.connect();

    this.time = new Date();
    this.cronId = {
      unique: "",
      week: "",
      day: "",
      hour: "",
    };
    this.source = new CronSource(
      this.mother,
      this.back,
      this.address,
      work,
      MONGOC,
      MONGOCONSOLEC,
      MONGOLOCALC
    );
    await this.source.sourceLoad();

    app.post("/voice", async (req, res) => {
      res.set("Content-Type", "application/json");
      try {
        if (req.body.text === undefined) {
          res.send(JSON.stringify({ message: "invaild post" }));
        } else {
          shellExec("say", [ req.body.text.replace(/[a-zA-Z\:\=\&\/\-\?]/gi, '').replace(/[0-9]/gi, '') ]).catch((err) => { console.log(err); });
          res.send(JSON.stringify({ message: "will do" }));
        }
      } catch (e) {
        res.send(JSON.stringify({ error: e.message }));
      }
    });

    intervalFunc = async () => {
      try {
        const now = new Date();
        const dayNumber = now.getDay();
        const dateString = dateToString(now, true);
        let tempArr, tempArr2, tempArr3;
        let date, hour, minute;
        let uniqueId, weekId, dayId, hourId;

        tempArr = dateString.split(' ');
        tempArr2 = tempArr[0].split('-');
        tempArr3 = tempArr[1].split(':');

        date = tempArr2[2];
        hour = tempArr3[0];
        minute = tempArr3[1].slice(0, 1);

        instance.time = dateCopy(now);

        uniqueId = 'u' + dateString.slice(2, -4).replace(/[^0-9]/gi, '');
        weekId = 'w' + String(dayNumber) + hour + minute;
        dayId = 'd' + hour + minute;
        hourId = 'h' + minute;

        instance.cronId.unique = uniqueId;
        instance.cronId.week = weekId;
        instance.cronId.day = dayId;
        instance.cronId.hour = hourId;

        await instance.source.targetLauching(instance.cronId);

      } catch (e) {
        await errorLog("cron ghost 문제 일어남 : " + e.message);
        process.exit();
      }
    }

    intervalFunc0 = async () => {
      try {
        await instance.diskTest();
      } catch (e) {
        console.log(e);
      }
    }

    intervalFunc1 = async () => {
      try {
        await instance.aliveTest();
      } catch (e) {
        console.log(e);
      }
    }

    today = new Date();
    startTime = Number(zeroAddition(today.getMinutes()).slice(1));
    if (startTime === 0) {
      startTime = 10;
    }
    startTime = (10 - startTime) * (60 * 1000);

    setTimeout(() => {
      intervalFunc().catch((err) => { console.log(err); });
      intervalFunc0().catch((err) => { console.log(err); });
      setInterval(intervalFunc, interval);
      setInterval(intervalFunc0, 4 * 60 * 60 * 1000);
      setInterval(intervalFunc1, 1 * 30 * 60 * 1000);
    }, startTime);

    setInterval(async () => {
      try {
        const client = await human.homeliaisonLogin(id, pwd);
        let standardString;
        let pastString;
        let count;
        let newMail;
        let length;

        const { data } = await client.list();
        const arr = data.split("\r\n").map((str) => { return str.trim() }).filter((str) => { return str !== '' });
        standardString = JSON.stringify(arr);
        try {
          pastString = await fileSystem(`readString`, [ standardFile ]);
        } catch (e) {
          await fileSystem(`write`, [ standardFile, "" ]);
          pastString = await fileSystem(`readString`, [ standardFile ]);
        }
        if (standardString !== pastString) {
          ({ count } = await client.list());
          length = count - JSON.parse(pastString).length;
          for (let i = 0; i < length; i++) {
            [ newMail ] = await human.getMails(id, pwd, [ count - i ]);
            await messageSend({ text: newMail.from + " 으로부터 새로운 메일이 도착했습니다! : " + Buffer.from(newMail.subject, "base64").toString("utf8"), channel: "#702_mail" });
            if ((new RegExp(targetEmail, "gi")).test(newMail.from)) {
              await requestSystem("https://" + address.pythoninfo.host + ":" + String(3000) + "/taxBill", { count: count - i }, { headers: { "Content-Type": "application/json" } });
            }
          }
        }
        await fileSystem(`write`, [ standardFile, standardString ]);

        await client.quit();
      } catch (e) {
        console.log(e);
      }
    }, 1000 * 10);


    



    pems = {};
    pemsLink = process.cwd() + "/pems/" + address.officeinfo.ghost.host;
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

    https.createServer(pems, app).listen(address.officeinfo.voice.port, () => {
      console.log(``);
      console.log(`\x1b[33m%s\x1b[0m`, `Server running`);
      console.log(``);
    });

  } catch (e) {
    console.log(e);
  }
}

module.exports = CronGhost;
