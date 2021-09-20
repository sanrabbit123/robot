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

RecordCloud.prototype.computerReading = function () {
  const os = require("os");
  const mac = /darwin/gi.test(os.platform());
  const { spawn } = require("child_process");
  const now = new Date();
  const pm2Promise = () => {
    const pm2 = spawn("pm2", [ "list" ]);
    let result;
    let nameIndex, modeIndex, pidIndex, uptimeIndex, statusIndex, cpuIndex, memIndex, userIndex;
    return new Promise((resolve, reject) => {
      result = [];
      pm2.stdout.on("data", (data) => {
        result = result.concat(String(data).split("\n"));
      });
      pm2.on("close", (code) => {
        result = result.filter((i) => { return !/\[PM2/gi.test(i.trim()); }).filter((i) => { return i.trim() !== ''; });
        result = result.filter((i) => { return /[a-z0-9]/gi.test(i); }).map((i) => { return i.trim().split(i[0]).map((j) => { return j.trim(); }).filter((j) => { return j !== ''; }); });

        nameIndex = result[0].findIndex((i) => { return /name/gi.test(i); });
        modeIndex = result[0].findIndex((i) => { return /mode/gi.test(i); });
        pidIndex = result[0].findIndex((i) => { return /pid/gi.test(i); });
        uptimeIndex = result[0].findIndex((i) => { return /uptime/gi.test(i); });
        statusIndex = result[0].findIndex((i) => { return /status/gi.test(i); });
        cpuIndex = result[0].findIndex((i) => { return /cpu/gi.test(i); });
        memIndex = result[0].findIndex((i) => { return /mem/gi.test(i); });
        userIndex = result[0].findIndex((i) => { return /user/gi.test(i); });

        if (nameIndex === undefined || modeIndex === undefined || pidIndex === undefined || uptimeIndex === undefined || statusIndex === undefined || cpuIndex === undefined || memIndex === undefined || userIndex === undefined) {
          reject("invaild stdout");
        } else {
          result.shift();
          result = result.map((arr) => {
            let memory;
            memory = arr[memIndex];
            if (/mb/gi.test(memory)) {
              memory = Math.round(Number(memory.replace(/[^0-9\-\.]/gi, '')) * 1000 * 1000);
            } else if (/kb/gi.test(memory)) {
              memory = Math.round(Number(memory.replace(/[^0-9\-\.]/gi, '')) * 1000);
            } else if (/gb/gi.test(memory)) {
              memory = Math.round(Number(memory.replace(/[^0-9\-\.]/gi, '')) * 1000 * 1000 * 1000);
            } else {
              memory = Math.round(Number(memory.replace(/[^0-9\-\.]/gi, '')));
            }
            return {
              name: arr[nameIndex],
              mode: arr[modeIndex],
              pid: arr[pidIndex],
              uptime: arr[uptimeIndex],
              status: arr[statusIndex],
              cpu: Math.round(Number(arr[cpuIndex].replace(/[^0-9\.\-]/gi, '')) / 100),
              memory: memory,
              user: arr[userIndex],
            }
          });
          resolve(result);
        }
      });
    });
  }
  const dfPromise = () => {
    const df = spawn("df", [ "-h" ]);
    let str, tempArr;
    let totalIndex, usedIndex, availableIndex, mountIndex;
    return new Promise((resolve, reject) => {
      str = '';

      df.stdout.on("data", (data) => {
        str += String(data);
      });

      df.on("close", (code) => {
        tempArr = str.split('\n');

        tempArr = tempArr.filter((i) => { return i !== '' }).map((i) => { return i.trim().split(' ').map((j) => { return j.trim(); }).filter((j) => { return j !== ''; }) });

        mountIndex = tempArr[0].findIndex((i) => { return /mount/gi.test(i); });
        totalIndex = tempArr[0].findIndex((i) => { return /size/gi.test(i); });
        usedIndex = tempArr[0].findIndex((i) => { return /used/gi.test(i); });
        availableIndex = tempArr[0].findIndex((i) => { return /avail/gi.test(i); });

        if (typeof mountIndex !== "number" || typeof totalIndex !== "number" || typeof usedIndex !== "number" || typeof availableIndex !== "number") {
          reject("invaild stdout");
        } else {
          tempArr.shift();
          tempArr = tempArr.filter((i) => { return /^\//gi.test(i[mountIndex]); });
          tempArr = tempArr.map((arr) => {
            let position, total, used, available;

            position = arr[mountIndex];

            total = Math.floor(Number(arr[totalIndex].replace(/[^0-9\.\-]/gi, '')) * 100) / 100;
            if (/T/gi.test(arr[totalIndex])) {
              total = total * 1000 * 1000 * 1000 * 1000;
            } else if (/G/gi.test(arr[totalIndex])) {
              total = total * 1000 * 1000 * 1000;
            } else if (/M/gi.test(arr[totalIndex])) {
              total = total * 1000 * 1000;
            } else if (/K/gi.test(arr[totalIndex])) {
              total = total * 1000;
            }

            used = Math.floor(Number(arr[usedIndex].replace(/[^0-9\.\-]/gi, '')) * 100) / 100;
            if (/T/gi.test(arr[usedIndex])) {
              used = used * 1000 * 1000 * 1000 * 1000;
            } else if (/G/gi.test(arr[usedIndex])) {
              used = used * 1000 * 1000 * 1000;
            } else if (/M/gi.test(arr[usedIndex])) {
              used = used * 1000 * 1000;
            } else if (/K/gi.test(arr[usedIndex])) {
              used = used * 1000;
            }

            available = Math.floor(Number(arr[availableIndex].replace(/[^0-9\.\-]/gi, '')) * 100) / 100;
            if (/T/gi.test(arr[availableIndex])) {
              available = available * 1000 * 1000 * 1000 * 1000;
            } else if (/G/gi.test(arr[availableIndex])) {
              available = available * 1000 * 1000 * 1000;
            } else if (/M/gi.test(arr[availableIndex])) {
              available = available * 1000 * 1000;
            } else if (/K/gi.test(arr[availableIndex])) {
              available = available * 1000;
            }

            return { position, total, used, available };
          })

          resolve(tempArr);
        }
      });
    });
  }
  let top;
  let num, arr;
  let index;
  let processIndex, cpuIndex;
  let tempArr;
  let result;
  let tempObj;
  let endBoo;
  if (mac) {
    top = spawn("top");
  } else {
    top = spawn("top", [ "-b" ])
  }
  return new Promise((resolve, reject) => {
    num = 0;
    result = { date: new Date() };
    top.stdout.on("data", (data) => {
      arr = String(data).split("\n");
      arr = arr.map((i) => { return i.trim(); }).filter((i) => { return i !== ''; });
      if (mac) {
        endBoo = (num !== 0 && arr.length > 0 && /Processes\:/gi.test(arr[0]));
      } else {
        endBoo = (num !== 0 && arr.length > 0 && /top \-/gi.test(arr[0]));
      }
      if (endBoo) {
        if (mac) {
          processIndex = arr.findIndex((i) => { return /^Processes/i.test(i); });
          cpuIndex = arr.findIndex((i) => { return /^CPU/i.test(i); });
        } else {
          processIndex = arr.findIndex((i) => { return /^Tasks/i.test(i); });
          cpuIndex = arr.findIndex((i) => { return /^\%Cpu/i.test(i); });
        }
        if (typeof processIndex !== "number" || typeof cpuIndex !== "number") {
          reject("stdout error");
        } else {
          tempArr = arr[cpuIndex].split(':').map((i) => { return i.trim(); })[1].split(',').map((i) => { return Number(i.replace(/[^0-9\.\-]/gi, '')); });
          result.cpu = {};
          result.cpu.used = Math.round((100 - tempArr[mac ? 2 : 3]) * 1000) / 100000;
          result.cpu.idle = Math.round((tempArr[mac ? 2 : 3]) * 1000) / 100000;
          result.cpu.detail = os.cpus();

          tempArr = arr[processIndex].split(':').map((i) => { return i.trim(); })[1].split(',').map((i) => { return Number(i.replace(/[^0-9\.\-]/gi, '')); });
          result.processes = {};
          result.processes.total = tempArr[0];
          result.processes.running = tempArr[1];
          result.processes.sleeping = tempArr[2];

          result.memory = {};
          result.memory.total = os.totalmem();
          result.memory.free = os.freemem();

          tempArr = [];
          tempObj = os.networkInterfaces();
          for (let i in tempObj) {
            tempArr = tempArr.concat(tempObj[i]);
          }
          tempArr = tempArr.filter((i) => { return /4/gi.test(i.family) && !/127\.0\.0\.1/gi.test(i.address); });
          result.network = tempArr;

          result.platform = os.platform();
          result.arch = os.arch();
          now.setSeconds(now.getSeconds() - os.uptime());

          result.start = now;

          dfPromise().then((dfResult) => {
            result.disk = dfResult.find((i) => { return i.position === "/"; });
            if (result.disk === undefined) {
              throw new Error("invaild df result");
            }
            result.disk = JSON.parse(JSON.stringify(result.disk));
            delete result.disk.position;
            result.disk.detail = dfResult;
            return pm2Promise();
          }).then((pm2Result) => {
            result.pm2 = pm2Result;
            resolve(result);
          }).catch((err) => {
            reject(err);
          });

        }
        top.kill();
      }
      num++;
    });
    top.stderr.on("data", (data) => { reject(data); });
  });
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
