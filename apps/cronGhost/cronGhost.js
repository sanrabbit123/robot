const CronGhost = function () {
  const Mother = require(process.cwd() + "/apps/mother.js");
  const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js");
  const ADDRESS = require(process.cwd() + "/apps/infoObj.js");
  this.mother = new Mother();
  this.back = new BackMaker();
  this.address = ADDRESS;
  this.dir = `${process.cwd()}/apps/cronGhost`;
  this.generalPort = 3000;
}

CronGhost.prototype.aliveTest = async function (MONGOC) {
  const instance = this;
  const address = this.address;
  const { requestSystem, messageLog, errorLog, emergencyAlarm, aliveLog, dateToString, stringToDate } = this.mother;
  const { generalPort } = this;
  const controlPath = "/ssl";
  const back = this.back;
  const selfMongo = MONGOC;
  const bar = "================================================";
  const bar2 = "====================================================================";
  const timeoutConst = 1 * 1000;
  const originalResponse = await requestSystem("https://api.pushbullet.com/v2/permanents/ujEVkZaUIQCsjA8RALCBgW_thread_36", {}, { method: "get", headers: {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "ko-KR,ko;q=0.9",
    "API-Version": "2014-05-07",
    "Authorization": "Basic OWdKdk94bTNrQ2tUMUNwMVVxSW5jT29kQ3dCZnhnWE46",
    "Host": "api.pushbullet.com",
    "Origin": "https://www.pushbullet.com",
    "Referer": "https://www.pushbullet.com/",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-site",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15",
    "X-User-Agent": "Pushbullet Website 162",
  } });
  const targetArray = originalResponse.data.thread.sort((a, b) => { return b.timestamp - a.timestamp });
  const accountStartNumber = "049";
  const accountEndNumber = "022";
  let res, targets, targetNumber, successNum, failNum, message;
  let instances;
  let thisObj;
  let diskMongoMessage;
  let thisDisk, thisMongo;
  let tempMessage;
  let percentage;
  let tong;
  let timeoutId;
  try {
    const accountSync = async () => {
      const collection = "accountHistory";
      const selfMongo = MONGOC;
      let date, messageArr, index, amount, name, body, data, rows, original;
      rows = await back.mongoRead(collection, {}, { selfMongo });
      rows.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });
      [ original ] = rows;
      data = [];
      for (let obj of targetArray) {
        body = obj.body;
        if (/입금/gi.test(body) && /기업/gi.test(body)) {
          messageArr = body.split("\n").map((str) => { return str.trim(); });
          messageArr = body.split("\n").map((str) => { return str.trim(); });
          messageArr = messageArr.filter((str) => { return str.trim() !== "" }).map((str) => {
            return str.replace(/\[홈리에종\] /gi, "").trim().replace(/\:$/gi, '')
          }).filter((str) => {
            return !(/^\[/.test(str) && /^\]/.test(str));
          }).filter((str) => {
            return !((new RegExp('^' + accountStartNumber)).test(str) && (new RegExp(accountEndNumber + '$')).test(str));
          });
          if (messageArr[messageArr.length - 1].trim() === "기업") {
            messageArr = messageArr.slice(0, -1);
          }
  
          messageArr = messageArr.filter((arr) => { return !/KG이니시스/gi.test(arr[4]) });
  
          if (messageArr.length >= 2) {
  
            index = messageArr.findIndex((str) => { return /^입금/gi.test(str.trim()) });
            if (index === -1) {
              throw new Error("invaild message");
            }
            amount = Math.floor(Number(messageArr[index].replace(/[^0-9]/gi, '')));
            if (Number.isNaN(amount)) {
              throw new Error("invaild message, NaN amount");
            }
            if (typeof messageArr[index + 1] !== "string") {
              throw new Error("invaild message, name error");
            }
            name = messageArr[index + 1].trim();
            date = stringToDate(messageArr[index - 1].trim().replace(/\//gi, '-') + ":00");
  
            data.push({
              date,
              amount,
              name,
              confirm: false,
            });
          }
        }
      }
      for (let d of original.data) {
        for (let o of data) {
          if (dateToString(o.date, true) === dateToString(d.date, true) && o.amount === d.amount && o.name === d.name) {
            o.confirm = true;
          }
        }
      }
      for (let o of data) {
        if (!o.confirm) {
          await requestSystem("https://" + instance.address.officeinfo.ghost.host + ":3000/receiveSms", { date: new Date(), amount: o.amount, name: o.name }, { headers: { "Content-Type": "application/json" } });
        }
      }
      await back.mongoCreate(collection, {
        date: new Date(),
        data,
      }, { selfMongo });
    }
    await accountSync();
  } catch (e) {
    await emergencyAlarm("alive test error : " + e.message);
  }
}

CronGhost.prototype.basicAsyncRequest = async function (MONGOC) {
  const instance = this;
  const address = this.address;
  const { requestSystem, messageLog, errorLog } = this.mother;
  const { generalPort } = this;
  const selfMongo = MONGOC;
  try {

    requestSystem("https://" + address.officeinfo.ghost.host + ":" + String(generalPort) + "/parsingCashReceipt", { data: null }, { headers: { "Content-Type": "application/json" } }).then(() => {
      return requestSystem("https://" + address.officeinfo.host + ":" + String(3002) + "/stylingFormSync", { data: null }, { headers: { "Content-Type": "application/json" } });
    }).then(() => {
      return requestSystem("https://" + address.contentsinfo.host + ":" + String(generalPort) + "/metaInstant", { data: null }, { headers: { "Content-Type": "application/json" } });
    }).then(() => {
      return requestSystem("https://" + address.officeinfo.ghost.host + ":" + String(generalPort) + "/callHistory", { data: null }, { headers: { "Content-Type": "application/json" } });
    }).then(() => {
      return requestSystem("https://" + address.officeinfo.ghost.host + ":" + String(generalPort) + "/calendarSync", { data: null }, { headers: { "Content-Type": "application/json" } });
    }).then(() => {
      return requestSystem("https://" + address.officeinfo.ghost.host + ":" + String(generalPort) + "/workProjectActionSync", { data: null }, { headers: { "Content-Type": "application/json" } });
    }).then(() => {
      return requestSystem("https://" + address.officeinfo.ghost.host + ":" + String(generalPort) + "/workProposalToClient", { data: null }, { headers: { "Content-Type": "application/json" } });
    }).then(() => {
      return requestSystem("https://" + address.officeinfo.ghost.host + ":" + String(generalPort) + "/photoStatusSync", { data: null }, { headers: { "Content-Type": "application/json" } });
    }).then(() => {
      return requestSystem("https://" + address.officeinfo.ghost.host + ":" + String(generalPort) + "/storeClientAnalytics", { fast: true }, { headers: { "Content-Type": "application/json" } });
    }).then(() => {
      return requestSystem("https://" + address.secondinfo.host + ":" + String(3003) + "/timeAspirantCommon", { mode: "update" }, { headers: { "Content-Type": "application/json" } });
    }).then(() => {
      return requestSystem("https://" + address.secondinfo.host + ":" + String(3003) + "/designerCareerSync", { mode: "update" }, { headers: { "Content-Type": "application/json" } });
    }).then(() => {
      return requestSystem("https://" + address.officeinfo.host + ":" + String(3002) + "/taxBill", { data: null }, { headers: { "Content-Type": "application/json" } });
    }).catch((e) => {
      throw new Error(e);
    });

  } catch (e) {
    await errorLog("basic async request error : " + e.message);
  }
}

CronGhost.prototype.pollingAsyncRequest = async function (MONGOC) {
  const instance = this;
  const address = this.address;
  const { requestSystem, messageLog, errorLog } = this.mother;
  const { generalPort } = this;
  const selfMongo = MONGOC;
  try {

    requestSystem("https://" + address.officeinfo.ghost.host + ":" + String(generalPort) + "/storeDevicesStatus", { data: null }, { headers: { "Content-Type": "application/json" } }).then(() => {
      return requestSystem("https://" + address.officeinfo.ghost.host + ":" + String(generalPort) + "/centrexSession", { data: null }, { headers: { "Content-Type": "application/json" } });
    }).then(() => {
      return requestSystem("https://" + address.officeinfo.ghost.host + ":" + String(generalPort) + "/checkInsyncStatus", { data: null }, { headers: { "Content-Type": "application/json" } });
    }).then(() => {
      return requestSystem("https://" + address.officeinfo.ghost.host + ":" + String(generalPort) + "/designerFolder", { data: null }, { headers: { "Content-Type": "application/json" } });
    }).then(() => {
      return requestSystem("https://" + address.officeinfo.ghost.host + ":" + String(generalPort) + "/storeRealtimeAnalytics", { data: null }, { headers: { "Content-Type": "application/json" } });
    }).catch((e) => {
      throw new Error(e);
    });

  } catch (e) {
    await errorLog("basic async request error : " + e.message);
  }
}

CronGhost.prototype.diskTestAndCost = async function (MONGOC) {
  const instance = this;
  const { requestSystem, errorLog, emergencyAlarm, aliveLog } = this.mother;
  try {
    const targets = [
      { name: "office", port: 3000 },
      { name: "office", port: 3002 },
      { name: "office", port: 3003 },
    ]
    const robotPort = 3000;
    const pathConst = "/disk";
    const protocol = "https:";

    for (let { name, port } of targets) {
      await requestSystem(protocol + "//" + instance.address.officeinfo.ghost.host + ":" + String(port) + pathConst);
    }

  } catch (e) {
    console.log(e);
  }
}

CronGhost.prototype.cronServer = async function () {
  const instance = this;
  const address = this.address;
  const { shellExec, fileSystem, messageSend, requestSystem, pureServer, dateToString, mongo, mongolocalinfo, mongoinfo, mongoconsoleinfo, errorLog } = this.mother;
  const port = 53000;
  const interval = (10 * 60 * 1000);
  const dateCopy = (dateObj) => { return new Date(JSON.stringify(dateObj).slice(1, -1)); }
  const zeroAddition = (num) => { return num < 10 ? `0${String(num)}` : String(num) }
  const CronSource = require(`${this.dir}/source/cronSource.js`);
  const MONGOC = new mongo(mongoinfo);
  const MONGOLOCALC = new mongo(mongolocalinfo);
  try {
    const https = require("https");
    const express = require("express");
    const WebSocket = require("ws");
    const url = require("url");
    const app = express();
    const useragent = require("express-useragent");
    let pems;
    let pemsLink;
    let certDir;
    let keyDir;
    let caDir;
    let intervalFunc, startTime, today;
    let intervalFunc0, intervalFunc1, intervalFunc2, intervalFunc3;
    let generalSocket, server;

    app.use(useragent.express());
    app.use(express.json({ limit: "50mb" }));
    app.use(express.urlencoded({ limit: "50mb", extended: true }));

    await MONGOC.connect();
    await MONGOLOCALC.connect();

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
      MONGOC,
      MONGOLOCALC
    );
    await this.source.sourceLoad();

    // wss socket
    generalSocket = new WebSocket.Server({ noServer: true });
    generalSocket.on("connection", (ws) => {
      ws.on("message", (message) => {
        try {
          const { mode, to, data } = JSON.parse(String(message));
          if (mode === "register") {
            ws.__who__ = data;
          } else if (mode === "message") {
            const clients = [ ...generalSocket.clients ];
            for (let c of clients) {
              if (c.__who__ === to) {
                c.send(JSON.stringify({ from: ws.__who__, data }));
              }
            }
          }
        } catch (e) {
          console.log(e);
        }
      });
    });
    generalSocket.on("close", (ws) => {
      console.log(ws.__who__);
    });


    //set router
    const CronRouter = require(`${this.dir}/router/cronRouter.js`);
    const router = new CronRouter(MONGOC, MONGOLOCALC, generalSocket);
    const rouObj = router.getAll();
    for (let obj of rouObj.get) {
      app.get(obj.link, obj.func);
    }
    for (let obj of rouObj.post) {
      app.post(obj.link, obj.func);
    }
    console.log(`set router`);


    // set timer
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
        await instance.diskTestAndCost(MONGOLOCALC);
      } catch (e) {
        console.log(e);
      }
    }
    intervalFunc1 = async () => {
      try {
        await instance.basicAsyncRequest(MONGOLOCALC);
      } catch (e) {
        console.log(e);
      }
    }
    intervalFunc2 = async () => {
      try {
        await instance.aliveTest(MONGOLOCALC);
      } catch (e) {
        console.log(e);
      }
    }
    intervalFunc3 = async () => {
      try {
        await instance.pollingAsyncRequest(MONGOLOCALC);
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
      intervalFunc1().catch((err) => { console.log(err); });
      intervalFunc2().catch((err) => { console.log(err); });
      intervalFunc3().catch((err) => { console.log(err); });
      setInterval(intervalFunc, interval);
      setInterval(intervalFunc0, 1 * 60 * 60 * 1000);
      setInterval(intervalFunc1, 1 * 20 * 60 * 1000);
      setInterval(intervalFunc2, 1 * 5 * 60 * 1000);
      setInterval(intervalFunc3, 1 * 10 * 60 * 1000)
    }, startTime);


    // set pem key
    pems = {};
    pemsLink = process.cwd() + "/pems/" + address.officeinfo.host;
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

    // launching http server
    server = https.createServer(pems, app);
    server.on("upgrade", (request, socket, head) => {
      const { pathname } = url.parse(request.url);
      if (/realTimeCommunication/gi.test(pathname)) {
        generalSocket.handleUpgrade(request, socket, head, (ws) => {
          generalSocket.emit("connection", ws, request);
        });
      } else {
        socket.destroy();
      }
    });
    server.listen(port, () => {
      console.log(``);
      console.log(`\x1b[33m%s\x1b[0m`, `Server running`);
      console.log(``);
    });

  } catch (e) {
    console.log(e);
  }
}

module.exports = CronGhost;
