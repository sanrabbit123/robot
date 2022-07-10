const SecondGhost = function (mother = null, back = null, address = null) {
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
  const { WebClient } = require("@slack/web-api");
  this.dir = process.cwd() + "/apps/secondGhost";
  this.slack_token = "xoxb-717757271335-2032150390679-1FTxRg4wQasMpe9kKDgAdqBv";
  this.slack_bot = new WebClient(this.slack_token);
}

SecondGhost.prototype.aliveTest = async function () {
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
      { name: "home", protocol: "https:", host: address.homeinfo.ghost.host, port: generalPort, },
      { name: "office", protocol: "https:", host: address.officeinfo.ghost.host, port: ghostPort, },
      { name: "log", protocol: "https:", host: address.testinfo.host, port: generalPort, },
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
              await messageLog(message);
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
      } else {
        await instance.slack_bot.chat.postMessage({ text: "server all alive", channel: "#error_log" });
      }

    }

  } catch (e) {
    await instance.slack_bot.chat.postMessage({ text: "alive test error : " + e.message, channel: "#error_log" });
  }
}

SecondGhost.prototype.ghostConnect = async function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink, errorLog, messageLog, setQueue, requestSystem, dateToString } = this.mother;
  const PORT = 53001;
  const http = require("http");
  const express = require("express");
  const app = express();
  const multer = require("multer");
  const multiForms = multer();
  const useragent = require("express-useragent");
  const staticFolder = process.env.HOME + "/static";
  const MongoReflection = require(`${process.cwd()}/apps/mongoReflection/mongoReflection.js`);
  const reflection = new MongoReflection();

  app.use(useragent.express());
  app.use(express.json({ limit : "50mb" }));
  app.use(multiForms.array());
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  app.use(express.static(staticFolder));

  const targets = [
    { name: "home", host: instance.address.homeinfo.ghost.host },
    { name: "office", host: instance.address.officeinfo.ghost.host },
    { name: "python", host: instance.address.pythoninfo.host },
    { name: "log", host: instance.address.testinfo.host },
  ]
  const robotPort = 3000;
  const pathConst = "/disk";
  const protocol = "https:";
  let response;
  let intervalFunc0, intervalFunc1, intervalFunc2;
  try {

    intervalFunc0 = async () => {
      try {
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
    intervalFunc1 = async () => {
      try {
        await instance.aliveTest();
      } catch (e) {
        console.log(e);
      }
    }
    intervalFunc2 = async () => {
      try {
      } catch (e) {
        console.log(e);
      }
    }

    intervalFunc0().then(intervalFunc1).then(intervalFunc2).catch((err) => { console.log(err); });

    setInterval(intervalFunc0, 12 * 60 * 60 * 1000);
    setInterval(intervalFunc1, 30 * 60 * 1000);
    setInterval(intervalFunc2, 24 * 60 * 60 * 1000);

    console.log(``);
    console.log(`\x1b[36m\x1b[1m%s\x1b[0m`, `launching second ghost ==============`);
    console.log(``);

    //set router
    const SecondRouter = require(`${this.dir}/router/secondRouter.js`);
    const router = new SecondRouter();

    const rouObj = router.getAll();
    for (let obj of rouObj.get) {
      app.get(obj.link, obj.func);
    }
    for (let obj of rouObj.post) {
      app.post(obj.link, obj.func);
    }
    console.log(`set router`);

    //server on
    http.createServer(app).listen(PORT, () => { console.log(`\x1b[33m%s\x1b[0m`, `\nServer running\n`); });

  } catch (e) {
    console.log(e);
  }
}

module.exports = SecondGhost;
