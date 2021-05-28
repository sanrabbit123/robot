const Alien = function () {
  const Mother = require(process.cwd() + "/apps/mother.js");
  const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js");
  const ADDRESS = require(process.cwd() + "/apps/infoObj.js");
  const schedule = require('node-schedule');
  this.mother = new Mother();
  this.back = new BackMaker();
  this.address = ADDRESS;
  this.schedule = schedule;
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

    app.get("/", function (req, res) {
      const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      res.send(String(ip).replace(/[^0-9\.]/gi, ''));
    });

    //launching python cron
    cronScript = await cron.scriptReady(cronNumber);
    shell.exec(`python3 ${shellLink(cronScript)}`, { async: true });
    console.log(`\x1b[33m%s\x1b[0m`, `Cron running`);

    //server on
    http.createServer(app).listen(5000, () => {});

  } catch (e) {
    console.log(e);
  }
}

Alien.prototype.wssClientLaunching = async function (url = "") {
  const instance = this;
  const { mongo, mongoinfo, mongolocalinfo } = this.mother;
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

    console.log(`\x1b[33m%s\x1b[0m`, `Wss running`);

    ws.on('message', async (raw) => {
      try {
        const data = JSON.parse(raw.replace(/^\n/, '').replace(/\n$/, '').trim());
        if (data.type === "push") {
          const { push: { type, notifications } } = data;
          if (type === "sms_changed") {
            let tempArr;
            let amount, who;
            let whereQuery, updateQuery;
            let projects, clients;
            let cliid, proid;
            let boo;
            let num;
            let message;

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

                await this.mother.slack_bot.chat.postMessage({ text: message, channel });

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
    await app.requestBeating();
  } catch (e) {
    console.log(e);
  }
}

// EXE --------------------------------------------------------------------------------------

const app = new Alien();
if (/office/gi.test(process.argv[2])) {
  app.cronLaunching(2);
} else if (/home/gi.test(process.argv[2])) {
  app.cronLaunching(0);
} else if (/static/gi.test(process.argv[2])) {
  app.cronLaunching(1);
} else if (/python/gi.test(process.argv[2])) {
  app.cronLaunching(3);
} else if (/calculation/gi.test(process.argv[2])) {
  app.wssClientLaunching();
} else if (/request/gi.test(process.argv[2])) {
  app.requestWhisk(Number(process.argv[3]));
}
