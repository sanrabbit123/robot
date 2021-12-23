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

CronGhost.prototype.initialPython = function () {
  const instance = this;
  const indent = 2;
  let script, scriptArr, scriptArrRefined;

  script = `
  import os
  import sys
  import json
  import re
  import time
  sys.path.append("${(process.cwd() + "/python_modules").replace(/"/g, "'")}")
  import subprocess
  import asyncio
  from apscheduler.schedulers.asyncio import AsyncIOScheduler
  ROBOT_PATH = "${(process.cwd()).replace(/"/g, "'")}"
  ROBOT = ROBOT_PATH + "/robot.js"
  THIS_PATH = ROBOT_PATH + "/apps/cronGhost"
  LOG_PATH = THIS_PATH + "/log"
  async def run(cmdArr):
      cmd = ' '.join(cmdArr)
      proc = await asyncio.create_subprocess_shell(cmd, stdout=asyncio.subprocess.PIPE, stderr=asyncio.subprocess.PIPE)
      (stdout, stderr) = await proc.communicate()
      if stdout:
          print(stdout.decode())
          return stdout.decode()
      if stderr:
          print(stderr.decode())
          return stderr.decode()`;

  scriptArr = script.split("\n");
  scriptArrRefined = [];
  for (let i of scriptArr) {
    if (i !== "") {
      scriptArrRefined.push(i.slice(indent));
    }
  }

  return scriptArrRefined.join("\n");
}

CronGhost.prototype.middlePython = function (listNum) {
  const instance = this;
  const targetList = this.list[listNum];
  let script, scriptString;

  script = function (name, order = null) {
    if (order === null) {
      return `async def ${name}():` + `\n` + `    await run([ 'node', ROBOT, '${name}' ])`;
    } else {
      return `async def ${name}():` + `\n` + `    await run([ 'node', ROBOT, '${order}' ])`;
    }
  }

  scriptString = '';
  for (let obj of targetList) {
    if (obj.order !== undefined) {
      scriptString += script(obj.name, obj.order);
    } else {
      scriptString += script(obj.name, null);
    }
    scriptString += "\n\n";
  }

  return scriptString;
}

CronGhost.prototype.endPython = function (listNum) {
  const instance = this;
  const targetList = this.list[listNum];
  const addJopMaker = function (name, time) {
    if (time.hour === undefined || time.hour === undefined || time.hour === undefined) {
      throw new Error("invaild time");
    }
    const { hour, minute, second } = time;
    if (time.day_of_week === undefined) {
      if (hour !== null && minute === null && second === null) {
        return `scheduler.add_job(${name}, 'interval', hours=${String(hour)})`;
      } else if (hour === null && minute !== null && second === null) {
        return `scheduler.add_job(${name}, 'interval', minutes=${String(minute)})`;
      } else if (hour === null && minute === null && second !== null) {
        return `scheduler.add_job(${name}, 'interval', seconds=${String(second)})`;
      } else {
        return `scheduler.add_job(${name}, 'cron', hour='${String(hour)}', minute='${String(minute)}', second='${String(second)}')`;
      }
    } else {
      return `scheduler.add_job(${name}, 'cron', day_of_week='${String(time.day_of_week)}', hour='${String(hour)}', minute='${String(minute)}', second='${String(second)}')`;
    }
  }
  let script;

  script = `scheduler = AsyncIOScheduler()`;
  for (let { name, time } of targetList) {
    script += `\n`;
    script += addJopMaker(name, time);
  }
  script += `\n`;
  script += `scheduler.start()`;
  script += `\n`;
  script += `try:`;
  script += `\n`;
  script += `    asyncio.get_event_loop().run_forever()`;
  script += `\n`;
  script += `except (KeyboardInterrupt, SystemExit):`;
  script += `\n`;
  script += `    pass`;

  return script;
}

CronGhost.prototype.scriptReady = async function (listNum = 0) {
  const instance = this;
  const { fileSystem } = this.mother;
  try {
    let totalScript, targetList;

    targetList = await fileSystem(`readDir`, [ `${this.dir}/list` ]);
    targetList = targetList.filter((a) => {
      return a !== `.DS_Store`;
    });
    targetList.sort((a, b) => {
      return Number(a.split('_')[0]) - Number(b.split('_')[0]);
    });

    this.list = [];
    for (let i of targetList) {
      this.list.push(require(`${this.dir}/list/${i}`));
    }

    totalScript = this.initialPython();
    totalScript += "\n\n";
    totalScript += this.middlePython(listNum);
    totalScript += "\n\n";
    totalScript += this.endPython(listNum);

    await fileSystem(`write`, [ `${this.dir}/cronGhost.py`, totalScript ]);

    return `${this.dir}/cronGhost.py`;

  } catch (e) {
    console.log(e);
  }
}

CronGhost.prototype.cronRouter = async function () {
  const instance = this;
  const { pureServer, shellExec, shellLink, fileSystem, dateToString } = this.mother;
  try {
    const PureServer = pureServer("class");
    const app = new PureServer();

    app.get("/id", async (req, res) => {
      try {
        res.send(JSON.stringify({ cronId: instance.cronId }));
      } catch (e) {
        res.send(JSON.stringify({ message: "error" }));
      }
    });

    return app;
  } catch (e) {
    console.log(e);
  }
}

CronGhost.prototype.cronServer = async function () {
  const instance = this;
  const { pureServer, dateToString, mongo, mongolocalinfo, mongoinfo, mongoconsoleinfo, mongopythoninfo, errorLog } = this.mother;
  const port = 3000;
  const interval = (10 * 60 * 1000);
  const dateCopy = (dateObj) => { return new Date(JSON.stringify(dateObj).slice(1, -1)); }
  const zeroAddition = (num) => { return num < 10 ? `0${String(num)}` : String(num) }
  const CronSource = require(`${this.dir}/source/cronSource.js`);
  const RethinkAccess = require(`${process.cwd()}/apps/rethinkAccess/rethinkAccess.js`);
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  const MONGOLOCALC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
  const MONGOCONSOLEC = new mongo(mongoconsoleinfo, { useUnifiedTopology: true });
  const MONGOPYTHONC = new mongo(mongopythoninfo, { useUnifiedTopology: true });
  const RETHINKC = new RethinkAccess();
  const KakaoTalk = require(`${process.cwd()}/apps/kakaoTalk/kakaoTalk.js`);
  const HumanPacket = require(`${process.cwd()}/apps/humanPacket/humanPacket.js`);
  const BackWorker = require(`${process.cwd()}/apps/backMaker/backWorker.js`);
  const BackReport = require(`${process.cwd()}/apps/backMaker/backReport.js`);
  const GoogleAnalytics = require(`${process.cwd()}/apps/googleAPIs/googleAnalytics.js`);
  const GoogleSheet = require(`${process.cwd()}/apps/googleAPIs/googleSheet.js`);
  const GoogleDrive = require(`${process.cwd()}/apps/googleAPIs/googleDrive.js`);
  const GoogleCalendar = require(`${process.cwd()}/apps/googleAPIs/googleCalendar.js`);
  const GoogleDocs = require(`${process.cwd()}/apps/googleAPIs/googleDocs.js`);
  const BillMaker = require(`${process.cwd()}/apps/billMaker/billMaker.js`);
  try {
    const app = await this.cronRouter();

    this.time = new Date();
    this.cronId = {
      unique: "",
      week: "",
      day: "",
      hour: "",
    };

    await MONGOC.connect();
    await MONGOLOCALC.connect();
    await MONGOCONSOLEC.connect();
    await MONGOPYTHONC.connect();

    await RETHINKC.connect();
    await RETHINKC.bindCollection("cronLog");

    const work = new BackWorker();
    const report = new BackReport();
    const bill = new BillMaker();

    const analytics = new GoogleAnalytics();
    const sheets = new GoogleSheet();
    const drive = new GoogleDrive();
    const calendar = new GoogleCalendar();
    const docs = new GoogleDocs();

    const humanInstance = new HumanPacket();
    const kakaoInstance = new KakaoTalk();
    await kakaoInstance.ready();

    let intervalFunc, startTime, today;

    this.source = new CronSource(
      this.mother,
      this.back,
      this.address,
      kakaoInstance,
      humanInstance,
      work,
      report,
      bill,
      analytics,
      sheets,
      drive,
      calendar,
      docs,
      MONGOC,
      MONGOCONSOLEC,
      MONGOPYTHONC,
      MONGOLOCALC,
      RETHINKC
    );
    await this.source.sourceLoad();

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

    today = new Date();
    startTime = Number(zeroAddition(today.getMinutes()).slice(1));
    if (startTime === 0) {
      startTime = 10;
    }
    startTime = (10 - startTime) * (60 * 1000);

    errorLog(startTime);

    setTimeout(() => {
      intervalFunc().catch((err) => { console.log(err); });
      setInterval(intervalFunc, interval);
    }, startTime);

    pureServer("listen", app, port);

  } catch (e) {
    console.log(e);
  }
}

module.exports = CronGhost;
