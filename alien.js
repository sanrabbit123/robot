const Alien = function () {
  const Mother = require(process.cwd() + "/apps/mother.js");
  const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js");
  const ADDRESS = require(process.cwd() + "/apps/infoObj.js");
  this.mother = new Mother();
  this.back = new BackMaker();
  this.address = ADDRESS;
  this.alien = process.cwd() + "/alien.js";
  this.ghost = process.cwd() + "/ghost.js";
  this.robot = process.cwd() + "/robot.js";
}

Alien.prototype.setTimer = function (callback, timeObj) {
  if (typeof timeObj !== "object" || typeof callback !== "function") {
    throw new Error("arguments must be Object: timeObj, Function: callback");
  }
  const nowDate = new Date();
  let targetDate;
  let result, time;
  let timeoutObj;

  if (timeObj instanceof Date) {
    targetDate = timeObj;
  } else {
    if (timeObj.year === undefined || typeof timeObj.year !== "number") {
      timeObj.year = nowDate.getFullYear();
    }
    if (timeObj.month === undefined || typeof timeObj.month !== "number") {
      timeObj.month = nowDate.getMonth() + 1;
    }
    if (timeObj.date === undefined || typeof timeObj.date !== "number") {
      timeObj.date = nowDate.getDate();
    }
    if (timeObj.hour === undefined || typeof timeObj.hour !== "number") {
      timeObj.hour = nowDate.getHours();
    }
    if (timeObj.minute === undefined || typeof timeObj.minute !== "number") {
      timeObj.minute = nowDate.getMinutes();
    }
    if (timeObj.second === undefined || typeof timeObj.second !== "number") {
      timeObj.second = nowDate.getSeconds();
    }
    const { year, month, date, hour, minute, second } = timeObj;
    targetDate = new Date(year, month - 1, date, hour, minute, second);
  }

  result = targetDate.valueOf() - nowDate.valueOf();
  if (result < 0) {
    time = 0;
  } else {
    time = result;
  }

  return new Promise(function (resolve, reject) {
    timeoutObj = setTimeout(function () {
      callback();
      resolve(time);
      clearTimeout(timeoutObj);
      timeoutObj = null;
    }, time);
  });
}

Alien.prototype.objectToCron = function (obj = {}) {
  let properties, target, cron;

  properties = [ "seconds", "minutes", "hours", "date", "month", "day" ];
  target = {};

  for (let i of properties) {
    if (obj[i] !== undefined) {
      if (typeof obj[i] !== "number" && typeof obj[i] !== "string") {
        throw new Error("invaild input");
      } else {
        target[i] = String(obj[i]);
      }
    } else {
      target[i] = '*';
    }
  }

  cron = '';
  for (let i of properties) {
    cron += target[i];
    cron += ' ';
  }
  cron = cron.slice(0, -1);

  return cron;
}

Alien.prototype.cronLaunching = async function (cronNumber) {
  const instance = this;
  const { fileSystem, shell, shellLink } = this.mother;
  const http = require("http");
  const express = require("express");
  const app = express();
  const CronGhost = require(process.cwd() + "/apps/cronGhost/cronGhost.js");
  const cron = new CronGhost();
  try {
    let cronScript;

    app.get("/", function (req, res) {
      const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      res.send(String(ip).replace(/[^0-9\.]/gi, ''));
    });

    cronScript = await cron.scriptReady(cronNumber);
    shell.exec(`python3 ${shellLink(cronScript)}`, { async: true });
    console.log(`\x1b[33m%s\x1b[0m`, `Cron running`);
    http.createServer(app).listen(5000, () => {});
  } catch (e) {
    console.log(e);
  }
}

Alien.prototype.wssLaunching = async function (cronNumber) {
  const instance = this;
  const { fileSystem, shell, shellLink, errorLog } = this.mother;
  try {
    const https = require("https");
    const express = require("express");
    const app = express();
    const useragent = require("express-useragent");
    const WebSocket = require("ws");
    const url = require("url");
    const CronGhost = require(process.cwd() + "/apps/cronGhost/cronGhost.js");
    const cron = new CronGhost();
    const port = 5000;
    let cronScript;
    let generalSocket;
    let sockets, server;
    let pems, pemsLink;
    let certDir, keyDir, caDir;

    app.use(useragent.express());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    pems = {};
    pemsLink = process.cwd() + "/pems/" + this.address.officeinfo.ghost.host;

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

    generalSocket = new WebSocket.Server({ noServer: true });
    generalSocket.on("connection", (ws) => {
      ws.on("message", (message) => {
        const clients = generalSocket.clients;
        for (let c of clients) {
          if (c.readyState === WebSocket.OPEN && ws !== c) {
            c.send(message);
          }
        }
      });
    });

    server = https.createServer(pems, app);

    server.on("upgrade", (request, socket, head) => {
      const { pathname } = url.parse(request.url);
      if (/general/gi.test(pathname)) {
        generalSocket.handleUpgrade(request, socket, head, (ws) => {
          generalSocket.emit("connection", ws, request);
        });
      } else {
        socket.destroy();
      }
    });

    cronScript = await cron.scriptReady(cronNumber);
    shell.exec(`python3 ${shellLink(cronScript)}`, { async: true });
    console.log(`\x1b[33m%s\x1b[0m`, `Cron running`);

    server.listen(port, () => { console.log(`\x1b[33m%s\x1b[0m`, `\nWss server running\n`); });

  } catch (e) {
    console.log(e);
  }
}

Alien.prototype.smsLaunching = async function () {
  const instance = this;
  const { fileSystem, dateToString, messageLog, errorLog, equalJson, requestSystem } = this.mother;
  const sender = [ "15662566", "01027473403", "0220392252" ];
  const myname = "배창규";
  const token = "o.u4wyBN6vM9IxqjHq8SLoFE0b1D82kbGr";
  const accountStartNumber = "049";
  const accountEndNumber = "022";
  try {
    const https = require("https");
    const express = require("express");
    const app = express();
    const useragent = require("express-useragent");
    const url = "wss://stream.pushbullet.com/websocket/" + token;
    const WebSocket = require("ws");
    const port = 5000;
    const ws = new WebSocket(url);
    let server;
    let pems, pemsLink;
    let certDir, keyDir, caDir;

    app.use(useragent.express());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    setInterval(async () => {
      try {
        const now = new Date();
        console.log("i'm alive in " + dateToString(now, true));
        if (now.getHours() === 4 && now.getMinutes() >= 0 && now.getMinutes() <= 9) {
          throw new Error("sms wss sleep");
        }
        if (now.getHours() === 5 && now.getMinutes() >= 0 && now.getMinutes() <= 9) {
          throw new Error("sms wss sleep");
        }
      } catch (e) {
        await errorLog(e.message);
        process.exit();
      }
    }, (10 * 60 * 1000));

    ws.on("open", async () => {
      try {
        await errorLog("sms wss wake up");
        setInterval(() => {
          ws.send(JSON.stringify({ message: "alive" }));
        }, 3 * 1000);
        setInterval(async () => {
          try {
            await messageLog("sms wss alive");
          } catch (e) {
            await errorLog(e.message);
            process.exit();
          }
        }, (30 * 60 * 1000));
      } catch (e) {
        await errorLog(e.message);
        process.exit();
      }
    });

    ws.on("message", async (message) => {
      try {
        const data = JSON.parse(message);
        if (data.type === "push") {
          if (typeof data.push === "object") {
            if (data.push.type === "sms_changed" && Array.isArray(data.push.notifications)) {
              if (data.push.notifications.length > 0) {
                const [ sms ] = data.push.notifications;
                if (typeof sms !== "object" || sms === null) {
                  throw new Error("invaild message");
                } else {
                  if (typeof sms.title !== "string" || typeof sms.body !== "string" || typeof sms.timestamp !== "number") {
                    throw new Error("invaild message");
                  } else {
                    const { title, body, timestamp } = sms;
                    await errorLog("receive message from " + title + " : " + body);
                    if (sender.includes(title.trim().replace(/[^0-9]/gi, '')) || title.trim() === myname) {
                      const date = new Date(timestamp * 1000);
                      let messageArr, index, amount, name, res;

                      messageArr = body.split("\n").map((str) => { return str.trim(); });
                      messageArr = messageArr.filter((str) => {
                        return !(/^\[/.test(str) && /^\]/.test(str));
                      }).filter((str) => {
                        return !(/[0-9]/gi.test(str) && / /gi.test(str) && /\//gi.test(str) && /\:/gi.test(str) && str.replace(/[0-9\/\: ]/gi, '') === '');
                      }).filter((str) => {
                        return !/^잔액/gi.test(str);
                      }).filter((str) => {
                        return !((new RegExp('^' + accountStartNumber)).test(str) && (new RegExp(accountEndNumber + '$')).test(str));
                      });
                      if (messageArr[messageArr.length - 1].trim() === "기업") {
                        messageArr = messageArr.slice(0, -1);
                      }

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

                        res = await requestSystem("https://" + instance.address.pythoninfo.host + ":3000/smsParsing", { date, amount, name }, { headers: { "Content-Type": "application/json" } });
                        if (typeof res.data !== "object" || res.data === null) {
                          throw new Error("request fail");
                        }
                        if (res.data.message !== "will do") {
                          throw new Error("request fail");
                        }

                      }
                    }
                  }
                }
              }
            }
          } else {
            throw new Error("invaild message");
          }
        }
      } catch (e) {
        await errorLog("error in sms : " + e.message);
        console.log(e);
        process.exit();
      }
    });

    app.get("/", (req, res) => {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send(JSON.stringify({ message: "done" }));
    });

    pems = {};
    pemsLink = process.cwd() + "/pems/" + this.address.homeinfo.ghost.host;

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

    server = https.createServer(pems, app);

    server.listen(port, () => { console.log(`\x1b[33m%s\x1b[0m`, `\nSms server running\n`); });

  } catch (e) {
    console.log(e);
  }
}

Alien.prototype.requestWhisk = async function (num) {
  try {
    if (typeof num !== "number") {
      throw new Error("invaild input");
    }
    if (Number.isNaN(num)) {
      throw new Error("invaild input");
    }
    const RequestWhisk = require(`${process.cwd()}/apps/requestWhisk/requestWhisk.js`);
    const app = new RequestWhisk();
    await app.requestBeating(num);
  } catch (e) {
    console.log(e);
  }
}

// EXE --------------------------------------------------------------------------------------

const app = new Alien();
if (/office/gi.test(process.argv[2])) {
  app.wssLaunching(2).catch((err) => { console.log(err); });
} else if (/home/gi.test(process.argv[2])) {
  app.cronLaunching(0).catch((err) => { console.log(err); });
} else if (/polling/gi.test(process.argv[2])) {
  app.cronLaunching(1).catch((err) => { console.log(err); });
} else if (/request/gi.test(process.argv[2])) {
  app.requestWhisk(Number(process.argv[3])).catch((err) => { console.log(err); });
} else if (/receiveSms/gi.test(process.argv[2])) {
  app.smsLaunching().catch((err) => { console.log(err); });
}
