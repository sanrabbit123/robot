const CronGhost = function () {
  const Mother = require(process.cwd() + "/apps/mother.js");
  const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js");
  const ADDRESS = require(process.cwd() + "/apps/infoObj.js");
  const { WebClient } = require("@slack/web-api");

  this.mother = new Mother();
  this.back = new BackMaker();
  this.address = ADDRESS;
  this.dir = `${process.cwd()}/apps/cronGhost`;
  this.list = [];
  this.slack_token = "xoxb-717757271335-2032150390679-1FTxRg4wQasMpe9kKDgAdqBv";
  this.slack_bot = new WebClient(this.slack_token);
}

CronGhost.prototype.aliveTest = async function () {
  const instance = this;
  const address = this.address;
  const { requestSystem, messageLog, errorLog } = this.mother;
  const generalPort = 3000;
  const ghostPort = 8080;
  const controlPath = "/ssl";
  let res, targets, targetNumber, successNum, failNum, message;
  try {

    targets = [
      { name: "python", protocol: "https:", host: address.pythoninfo.host, port: generalPort, },
      { name: "post", protocol: "https:", host: address.backinfo.host, port: generalPort, },
      { name: "log", protocol: "https:", host: address.testinfo.host, port: generalPort, },
      { name: "second", protocol: "https:", host: address.secondinfo.host, port: generalPort, },
      { name: "trans", protocol: "https:", host: address.transinfo.host, port: generalPort, },
      { name: "office", protocol: "https:", host: address.officeinfo.ghost.host, port: ghostPort, },
    ];

    targetNumber = targets.length;
    successNum = 0;
    failNum = 0;
    message = '';

    await requestSystem("https://" + address.pythoninfo.host + ":" + String(generalPort) + "/taxBill", { data: null }, { headers: { "Content-Type": "application/json" } });

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
              await instance.slack_bot.chat.postMessage({ text: message, channel: "#error_log" });
            } else if (successNum + failNum === targetNumber) {
              console.log("\x1b[33m%s\x1b[0m", "something death");
              message += "\n======================================";
              message += "\nsomething death";
              await instance.slack_bot.chat.postMessage({ text: message, channel: "#error_log" });
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
          await instance.slack_bot.chat.postMessage({ text: message, channel: "#error_log" });
        }
      }

    }

  } catch (e) {
    await instance.slack_bot.chat.postMessage({ text: "alive test error : " + e.message, channel: "#error_log" });
  }
}

CronGhost.prototype.diskTest = async function () {
  const instance = this;
  const { requestSystem } = this.mother;
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
        await instance.slack_bot.chat.postMessage({ text: name + " " + "disk warning", channel: "#error_log" });
      }
    }
    await instance.slack_bot.chat.postMessage({ text: "disk check done", channel: "#error_log" });
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
  const port = 53001;
  const interval = (10 * 60 * 1000);
  const dateCopy = (dateObj) => { return new Date(JSON.stringify(dateObj).slice(1, -1)); }
  const zeroAddition = (num) => { return num < 10 ? `0${String(num)}` : String(num) }
  const CronSource = require(`${this.dir}/source/cronSource.js`);
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  const MONGOLOCALC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
  const MONGOCONSOLEC = new mongo(mongoconsoleinfo, { useUnifiedTopology: true });
  const MONGOPYTHONC = new mongo(mongopythoninfo, { useUnifiedTopology: true });
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
    let intervalFunc0, intervalFunc1;

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
      MONGOLOCALC
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

    console.log(startTime)

    setTimeout(() => {
      intervalFunc().catch((err) => { console.log(err); });
      intervalFunc0().catch((err) => { console.log(err); });
      setInterval(intervalFunc, interval);
      setInterval(intervalFunc0, 4 * 60 * 60 * 1000);
      setInterval(intervalFunc1, 1 * 30 * 60 * 1000);
    }, startTime);

    pureServer("listen", app, port);

  } catch (e) {
    console.log(e);
  }
}

module.exports = CronGhost;
