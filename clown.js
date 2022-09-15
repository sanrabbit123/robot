const Clown = function () {
  const Mother = require(process.cwd() + "/apps/mother.js");
  const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js");
  const ADDRESS = require(process.cwd() + "/apps/infoObj.js");
  this.mother = new Mother();
  this.back = new BackMaker();
  this.address = ADDRESS;
}

Clown.timeouts = {};

Clown.prototype.mongoToJson = async function () {
  const instance = this;
  const back = this.back;
  const { fileSystem, shell, shellLink } = this.mother;
  try {
    const today = new Date();
    const zeroAddition = function (number) {
      if (number < 10) {
        return `0${String(number)}`;
      } else {
        return String(number);
      }
    }
    const backFolderName = "backup";
    const mongoTargets = [
      [ "mongoinfo", "mongo" ],
      [ "backinfo", "console" ],
      [ "pythoninfo", "python" ],
    ];
    const robotDirArr = process.cwd().split("/");
    robotDirArr.pop();
    const robotDirMother = robotDirArr.join("/");
    const robotDirMotherDetail = await fileSystem(`readDir`, [ robotDirMother ]);
    if (!robotDirMotherDetail.includes(backFolderName)) {
      shell.exec(`mkdir ${shellLink(robotDirMother)}/${backFolderName}`);
    }
    const backDir = robotDirMother + "/" + backFolderName;
    let tempObj, tempInfo, collections, order, timeString;
    let tempMsg;

    timeString = `${String(today.getFullYear())}${zeroAddition(today.getMonth() + 1)}${zeroAddition(today.getDate())}${zeroAddition(today.getHours())}${zeroAddition(today.getMinutes())}${zeroAddition(today.getSeconds())}`;

    for (let [ infoName, dbName ] of mongoTargets) {
      tempObj = {};
      tempObj[dbName] = true;
      collections = await back.mongoListCollections(tempObj);
      tempInfo = this.address[infoName];
      order = `mongodump --uri="mongodb://${tempInfo["host"]}/${tempInfo["database"]}" --username=${tempInfo["user"]} --password=${tempInfo["password"]} --port=${String(tempInfo["port"])} --out="${shellLink(backDir)}/${timeString}/${dbName}${timeString}.json" --authenticationDatabase admin`;
      tempMsg = shell.exec(order);
    }

    return `mongo exports done`;
  } catch (e) {
    console.log(e);
  }
}

Clown.prototype.infoObj = async function () {
  try {
    await this.back.setInfoObj({ getMode: false });
  } catch (e) {
    console.log(e);
  }
}

Clown.prototype.memberObj = async function () {
  try {
    await this.back.setMemberObj({ getMode: false });
  } catch (e) {
    console.log(e);
  }
}

Clown.prototype.infoUpdate = async function () {
  try {
    await this.back.updateInfoObj();
  } catch (e) {
    console.log(e);
  }
}

Clown.prototype.memberUpdate = async function () {
  try {
    await this.back.updateMemberObj();
  } catch (e) {
    console.log(e);
  }
}

Clown.prototype.dataConsole = function (noStatic = false) {
  const DataConsole = require(process.cwd() + "/apps/dataConsole/dataConsole.js");
  let app = new DataConsole();
  app.connect(noStatic);
}

Clown.prototype.contentsMaker = function (button, arg) {
  const AiContents = require(process.cwd() + "/apps/contentsMaker/aiContents.js");
  const ResourceMaker = require(process.cwd() + "/apps/resourceMaker/resourceMaker.js");
  let app;
  if (button === "make" || button === "1") {
    app = new AiContents(arg);
    app.total_make();
  } else if (button === "mysql" || button === "2") {
    app = new AiContents();
    app.to_mysql();
  } else if (button === "poo" || button === "3") {
    app = new AiContents();
    app.to_poo();
  } else if (button === "resource" || button === "4") {
    app = new ResourceMaker(arg);
    app.launching();
  }
}

Clown.prototype.aliveTest = async function () {
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
              await messageLog(message);
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

  } catch (e) {
    await errorLog("alive test error : " + e.message);
  }
}

Clown.prototype.proposalMaker = function (button, arg) {
  if (arg === undefined) {
    throw new Error("proposal must be id");
    return;
  }
  if (button === "make" || button === "1") {
    const AiProposal = require(process.cwd() + "/apps/contentsMaker/aiProposal.js");
    let app;
    app = new AiProposal(arg);
    app.proposalLaunching();
  } else if (button === "web") {
    const instance = this;
    const back = this.back;
    const KakaoTalk = require(`${process.cwd()}/apps/kakaoTalk/kakaoTalk.js`);
    const path = "designerProposal";
    const { host } = this.address.homeinfo.ghost;
    const { requestSystem, ghostRequest, messageLog, errorLog, messageSend } = this.mother;
    const proid = arg;
    let kakaoInstance, cliid, name, phone, client;
    let requestNumber, action;
    let now;
    return new Promise((resolve, reject) => {

      now = new Date();

      back.getProjectById(proid).then((project) => {
        if (project === null) {
          reject("There is no project");
        }
        cliid = project.cliid;
        return back.getClientById(cliid);
      }).then((data) => {
        client = data;
        name = client.name;
        phone = client.phone;

        requestNumber = 0;
        for (let i = 0; i < client.requests.length; i++) {
          if (client.requests[i].request.timeline.valueOf() <= now.valueOf()) {
            requestNumber = i;
            break;
          }
        }

        if (client.requests[requestNumber].analytics.response.action.value === "부재중 제안 발송") {
          action = "피드백과 응대 예정";
        } else {
          action = "제안 피드백 예정";
        }

        kakaoInstance = new KakaoTalk();
        return kakaoInstance.ready();
      }).then(() => {
        return kakaoInstance.sendTalk("designerProposal", name, phone, { client: name, host, path, proid });
      }).then(() => {
        return back.updateProject([ { proid }, { "proposal.status": "완료", "proposal.date": now } ]);
      }).then(() => {

        return requestSystem("https://" + instance.address.backinfo.host + ":3000/updateLog", {
          id: cliid,
          column: "action",
          position: "requests." + String(requestNumber) + ".analytics.response.action",
          pastValue: client.requests[requestNumber].analytics.response.action.value,
          finalValue: action
        }, { headers: { "origin": "https://" + instance.address.homeinfo.ghost.host, "Content-Type": "application/json" } });

      }).then(() => {
        return requestSystem("https://" + instance.address.officeinfo.ghost.host + ":" + String(instance.address.officeinfo.ghost.port) + "/proposalLog", { proid }, { headers: { "origin": "https://" + instance.address.homeinfo.ghost.host, "Content-Type": "application/json" } });

      }).then(() => {

        return requestSystem("https://" + instance.address.backinfo.host + ":3000/generalMongo", {
          mode: "sse",
          db: "console",
          collection: "sse_clientCard",
          log: true,
          who: "autoBot",
          updateQuery: {
            cliid,
            requestNumber,
            mode: "action",
            from: client.requests[requestNumber].analytics.response.action.value,
            to: action,
            randomToken: Number(String((new Date()).valueOf()) + String(Math.round(Math.random() * 1000000))),
          }
        }, { headers: { "origin": "https://" + instance.address.homeinfo.ghost.host, "Content-Type": "application/json" } });

      }).then(() => {

        let updateObj;
        updateObj = {};
        updateObj["requests." + String(requestNumber) + ".analytics.response.action"] = action;
        return back.updateClient([ { cliid }, updateObj ]);

      }).then(() => {
        return ghostRequest("voice", { text: name + " 고객님에게 제안서 알림톡을 전송하였어요." });
      }).then(() => {
        return messageSend({ text: name + " 고객님에게 제안서 알림톡을 전송하였어요.\nlink : https://" + host + "/middle/" + path + "?proid=" + proid + "&mode=test", channel: "#403_proposal" });
      }).catch((err) => {
        errorLog("제안서 보내는 도중 오류남 : " + err.message).catch((e) => { console.log(e); });
        reject(err);
      });
    });
  }
}

Clown.prototype.requestMaker = async function (arg) {
  const AiConsole = require(process.cwd() + "/apps/contentsMaker/aiConsole.js");
  try {
    let app;
    app = new AiConsole();
    if (arg === undefined) {
      throw new Error("must be arguments");
    }
    await app.cardToRequest(arg);
  } catch (e) {
    console.log(e);
  }
}

Clown.prototype.portfolioFilter = function (boo, clientName, apartName, designerName, pid = "g0") {
  const PortfolioFilter = require(process.cwd() + "/apps/portfolioFilter/portfolioFilter.js");
  let app = new PortfolioFilter(clientName, apartName, designerName, pid);
  if (boo === "portfolio") {
    app.total_make();
  } else if (boo === "ghost") {
    app.ghost_make();
  }
}

Clown.prototype.googleAPIs = function (button) {
  const GoogleAPIs = require(process.cwd() + "/apps/googleAPIs/googleAPIs.js");
  const GoogleAnalytics = require(process.cwd() + "/apps/googleAPIs/googleAnalytics.js");
  let app;
  if (button === "token" || button === "1") {
    app = new GoogleAPIs();
    app.generate_tokens();
  } else if (button === "analytics" || button === "2") {
    app = new GoogleAnalytics();
    app.getClients();
  }
}

Clown.prototype.frontSource = function (argv) {
  const AiFront = require(process.cwd() + "/apps/contentsMaker/aiFront.js");
  let fobot = new AiFront();
  fobot.front_maker(argv);
}

Clown.prototype.frontMaker = function (webpack) {
  const FrontMaker = require(process.cwd() + "/apps/frontMaker/frontMaker.js");
  let fobot = new FrontMaker();
  fobot.totalLaunching(webpack);
}

Clown.prototype.frontUpdate = async function (testMode) {
  try {
    const FrontMaker = require(process.cwd() + "/apps/frontMaker/frontMaker.js");
    let fobot = new FrontMaker();
    await fobot.totalUpdate(testMode);
  } catch (e) {
    console.log(e);
  }
}

Clown.prototype.playgroundConnect = async function () {
  try {
    const LogConsole = require(process.cwd() + "/apps/logConsole/logConsole.js");
    const app = new LogConsole();
    await app.playgroundConnect();
  } catch (e) {
    console.log(e);
  }
}

Clown.prototype.consoleSource = function () {
  const AiConsole = require(process.cwd() + "/apps/contentsMaker/aiConsole.js");
  let cobot = new AiConsole();
  cobot.console_maker();
}

Clown.prototype.recordCloud = async function (sw, boo = true) {
  try {
    const RecordCloud = require(`${process.cwd()}/apps/recordCloud/recordCloud.js`);
    const app = new RecordCloud();
    await app.recordServerLaunching();
  } catch (e) {
    console.log(e);
  }
}

Clown.prototype.pythonCloud = async function () {
  try {
    const ReceiptObserver = require(`${process.cwd()}/apps/receiptObserver/receiptObserver.js`);
    const app = new ReceiptObserver();
    await app.taxServerLaunching();
  } catch (e) {
    console.log(e);
  }
}

Clown.prototype.pythonWatcher = async function () {
  try {
    const ReceiptObserver = require(`${process.cwd()}/apps/receiptObserver/receiptObserver.js`);
    const app = new ReceiptObserver();
    await app.wssClientLaunching();
  } catch (e) {
    console.log(e);
  }
}

Clown.prototype.taxBill = async function () {
  try {
    const BillMaker = require(`${process.cwd()}/apps/billMaker/billMaker.js`);
    const app = new BillMaker();
    await app.taxBill();
    await this.aliveTest();
  } catch (e) {
    console.log(e);
  }
}

Clown.prototype.cashReceipt = async function () {
  try {
    const { shell, shellLink } = this.mother;
    const url = "https://" + this.address.homeinfo.ghost.host + ":" + String(this.address.homeinfo.ghost.graphic.port[0]) + "/cash";
    shell.exec(`curl ${url}`);
  } catch (e) {
    console.log(e);
  }
}

Clown.prototype.bridgeCloud = async function (sw) {
  try {
    const BridgeCloud = require(`${process.cwd()}/apps/bridgeCloud/bridgeCloud.js`);
    const app = new BridgeCloud();
    await app.serverLaunching();
  } catch (e) {
    console.log(e);
  }
}

Clown.prototype.tellVoice = async function () {
  try {
    const PlayAudio = require(`${process.cwd()}/apps/playAudio/playAudio.js`);
    const voice = new PlayAudio();
    const http = require("http");
    const express = require("express");
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.post("/voice", async (req, res) => {
      if (req.body.text === undefined) {
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ message: "invaild post" }));
      } else {
        voice.textToVoice(String(req.body.text));
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ message: "will do" }));
      }
    });

    http.createServer(app).listen(3000, () => {
      console.log(``);
      console.log(`\x1b[33m%s\x1b[0m`, `Server running`);
      console.log(``);
    });

  } catch (e) {
    console.log(e);
  }
}

Clown.prototype.kakaoTokenGenerate = async function () {
  try {
    const KakaoTalk = require(`${process.cwd()}/apps/kakaoTalk/kakaoTalk.js`);
    const app = new KakaoTalk();
    await app.generateToken();
  } catch (e) {
    console.log(e);
  }
}

Clown.prototype.ultimateReflection = async function () {
  try {
    const MongoReflection = require(`${process.cwd()}/apps/mongoReflection/mongoReflection.js`);
    const reflection = new MongoReflection();
    await reflection.ultimateReflection();
  } catch (e) {
    console.log(e);
  }
}

Clown.prototype.coreReflection = async function () {
  try {
    const MongoReflection = require(`${process.cwd()}/apps/mongoReflection/mongoReflection.js`);
    const reflection = new MongoReflection();
    await reflection.coreReflection();
  } catch (e) {
    console.log(e);
  }
}

Clown.prototype.mysqlReflection = async function () {
  try {
    const MongoReflection = require(`${process.cwd()}/apps/mongoReflection/mongoReflection.js`);
    const reflection = new MongoReflection();
    await reflection.mysqlReflection();
    await reflection.frontReflection();
  } catch (e) {
    console.log(e);
  }
}

Clown.prototype.localReflection = async function (arg = null) {
  try {
    const MongoReflection = require(`${process.cwd()}/apps/mongoReflection/mongoReflection.js`);
    const reflection = new MongoReflection();
    let target;

    if (arg === undefined || arg === null) {
      target = "mongoinfo";
    } else {
      if (/mongo/gi.test(arg)) {
        target = "mongoinfo";
      } else if (/console/gi.test(arg) || /back/gi.test(arg)) {
        target = "backinfo";
      } else if (/home/gi.test(arg)) {
        target = "homeinfo";
      } else if (/python/gi.test(arg)) {
        target = "pythoninfo";
      } else {
        target = "mongoinfo";
      }
    }

    console.log(arg, target);
    await reflection.mongoMigration("local", target);
  } catch (e) {
    console.log(e);
  }
}

Clown.prototype.clientReportToSheets = async function () {
  try {
    const GoogleSheet = require(process.cwd() + "/apps/googleAPIs/googleSheet.js");
    const sheets = new GoogleSheet();
    const sheetId = "14tnBRhwpvrf0h6iYTJzLaxs8UPseNYsznhdhV5kc0UM";
    const startPoint = [ 0, 0 ];
    const report = await this.back.getClientReport();
    await sheets.update_value_inPython(sheetId, "", report.getMatrix(), startPoint);
    console.log(`\x1b[33m%s\x1b[0m`, `sheets upload done`);
  } catch (e) {
    console.log(e);
  }
}

Clown.prototype.fixDir = async function (target) {
  try {
    const ParsingHangul = require(process.cwd() + "/apps/parsingHangul/parsingHangul.js");
    const hangul = new ParsingHangul();
    hangul.fixDirPromise(target).then(function (tree) {
      console.log("done");
      process.exit();
    }).catch(function (err) {
      console.log(err);
      process.exit();
    });
  } catch (e) {
    console.log(e);
  }
}

Clown.prototype.proposalToClient = async function () {
  try {
    const BackWorker = require(process.cwd() + "/apps/backMaker/backWorker.js");
    const work = new BackWorker();
    await work.setProposalToClient("cron");
  } catch (e) {
    console.log(e);
  }
}

Clown.prototype.imageReady = async function () {
  try {
    const PortfolioFilter = require(process.cwd() + "/apps/portfolioFilter/portfolioFilter.js");
    let app = new PortfolioFilter();
    await app.image_ready();
  } catch (e) {
    console.log(e);
  }
}

Clown.prototype.staticInSync = async function () {
  const instance = this;
  const { fileSystem, shell, shellLink } = this.mother;
  try {
    const home = process.env.HOME;
    const homeDir = await fileSystem("readDir", [ home ]);
    const staticName = "static";
    const driveName = "drive";
    const diskName = "disk";
    const ssdName = "ssd";
    const ssdNumber = 2;
    let order = '';

    if (!homeDir.includes(driveName)) {
      shell.exec(`mkdir ${shellLink(home + "/" + driveName)}`);
    }

    order = "scp -r ";
    order += this.address.homeinfo.ghost.user + "@" + this.address.homeinfo.ghost.host + ":" + shellLink(this.address.homeinfo.ghost.file.static);
    order += " ";
    order += shellLink(home + "/" + driveName);
    console.log(order);
    shell.exec(order);

    for (let i = 0; i < ssdNumber; i++) {
      order = "cp -rf ";
      order += shellLink(home + "/" + driveName + "/" + staticName);
      order += " ";
      order += shellLink(home + "/" + diskName + "/" + ssdName + String(i + 1));
      console.log(order);
      shell.exec(order);
    }

    console.log("static sync done");
    return home + "/" + driveName;

  } catch (e) {
    console.log(e);
  }
}

Clown.prototype.sayHello = async function (message = null) {
  const instance = this;
  try {
    let text, channel;
    channel = "#error_log";
    if (message === null || typeof message !== "string") {
      text = "안녕?";
    } else {
      text = message;
    }
    await this.mother.messageSend({ text, channel });
  } catch (e) {
    console.log(e);
  }
}

Clown.prototype.designerCalculation = async function () {
  try {
    const BackWorker = require(`${process.cwd()}/apps/backMaker/backWorker.js`);
    const work = new BackWorker();
    await work.designerCalculation();
  } catch (e) {
    console.log(e);
  }
}

Clown.prototype.publicSector = async function () {
  try {
    const PublicSector = require(`${process.cwd()}/apps/publicSector/publicSector.js`);
    const sector = new PublicSector();
    await sector.spawnSector();
    await sector.staticRender();
    await sector.pythonServer();
  } catch (e) {
    console.log(e);
  }
}

Clown.prototype.spawnSector = async function (install = false) {
  try {
    const PublicSector = require(`${process.cwd()}/apps/publicSector/publicSector.js`);
    const app = new PublicSector();
    await app.spawnSector(install);
  } catch (e) {
    console.log(e);
  }
}

Clown.prototype.positionWatch = async function () {
  try {
    const GraphicBot = require(`${process.cwd()}/apps/graphicBot/graphicBot.js`);
    const app = new GraphicBot();
    app.positionWatch();
  } catch (e) {
    console.log(e);
  }
}

Clown.prototype.graphicServer = async function () {
  try {
    const GraphicBot = require(`${process.cwd()}/apps/graphicBot/graphicBot.js`);
    const app = new GraphicBot();
    app.botServer();
  } catch (e) {
    console.log(e);
  }
}

Clown.prototype.passiveSync = async function () {
  try {
    const BillMaker = require(`${process.cwd()}/apps/billMaker/billMaker.js`);
    const bill = new BillMaker();
    bill.passiveSyncAll();
  } catch (e) {
    console.log(e);
  }
}

Clown.prototype.devAliveSync = async function () {
  try {
    const path = `${process.cwd()}/apps/backMaker`;
    const { shell, shellLink } = this.mother;
    const list = [
      [ "alive", "devAlive" ],
      [ "map", "devMap" ]
    ];
    let command;
    for (let [ from, to ] of list) {
      command = "";
      command += `rm -rf ${shellLink(path)}/${shellLink(to)};`;
      command += `cp -r ${shellLink(path)}/${shellLink(from)} ${shellLink(path)}/${shellLink(to)};`;
      shell.exec(command);
      console.log(`sync ${from} => ${to} done`);
    }
  } catch (e) {
    console.log(e);
  }
}

Clown.prototype.cronServer = async function () {
  try {
    const CronGhost = require(`${process.cwd()}/apps/cronGhost/cronGhost.js`);
    const cron = new CronGhost();
    await cron.cronServer();
  } catch (e) {
    console.log(e);
  }
}

Clown.prototype.pureServer = async function () {
  const instance = this;
  const { pureServer, shellExec, shellLink, fileSystem, setQueue } = this.mother;
  try {

    const PureServer = pureServer("class");
    const app = new PureServer();

    app.get("/", async (req, res) => {
      try {
        res.send(JSON.stringify({ message: "It works!" }));
      } catch (e) {
        console.log(e);
      }
    });

    app.post("/log", async (req, res) => {
      try {
        if (typeof req.body.message !== "string" || typeof req.body.color !== "string") {
          throw new Error("invaild post, must be text");
        }

        const colorLog = function (mode, text) {
          const colors = {
            red: "\x1b[31m%s\x1b[34m > \x1b[0m%s",
            yellow: "\x1b[33m%s\x1b[34m > \x1b[0m%s",
            cyan: "\x1b[36m%s\x1b[34m > \x1b[0m%s",
          };
          const now = new Date();
          const zeroAddition = (num) => (num < 10 ? `0${String(num)}` : String(num));
          let timeWording;

          timeWording = '';
          timeWording += String(now.getFullYear());
          timeWording += '.';
          timeWording += zeroAddition(now.getMonth() + 1);
          timeWording += '.';
          timeWording += zeroAddition(now.getDate());
          timeWording += ' ';
          timeWording += zeroAddition(now.getHours());
          timeWording += ':';
          timeWording += zeroAddition(now.getMinutes());
          timeWording += ':';
          timeWording += zeroAddition(now.getSeconds());

          console.log(colors[mode], timeWording, text);
        }

        colorLog(req.body.color, req.body.message);

        res.send(JSON.stringify({ message: "done" }));
      } catch (e) {
        res.send(JSON.stringify({ message: "error" }));
      }
    });

    pureServer("listen", app, 8080);

  } catch (e) {
    console.log(e);
  }
}

Clown.prototype.launching = async function () {
  const instance = this;
  const { consoleQ } = this.mother;
  try {
    let re, re2, re3, re4, re5, re6;

    re = await consoleQ(`Choose commands : 1.back 2.contents 3.portfolio 4.proposal 5.google 6.front 7.consulting 8.aiohttp 9.aiohttpInstall 10.exit\n`);

    //console server
    if (re === "back" || re === "1") {
      this.dataConsole(false);

    //contents maker
    } else if (re === "contents" || re === "2") {
      re2 = await consoleQ(`Choose commands : 1.make 2.mysql 3.poo 4.resource 5.front\n`);
      if (re2 === "make" || re2 === "1") {
        re3 = await consoleQ(`Porfolio number?\n`);
      } else if (re2 === "mysql" || re2 === "2") {
        re3 = ``;
      } else if (re2 === "poo" || re2 === "3") {
        re3 = ``;
      } else if (re2 === "resource" || re2 === "4") {
        re3 = await consoleQ(`Porfolio number?\n`);
      }
      this.contentsMaker(re2, re3);

    //portfolio filter
    } else if (re === "portfolio" || re === "3") {
      re2 = await consoleQ(`Choose commands : 1.portfolio 2.ghost\n`);
      if (re2 === "portfolio" || re2 === "1") {
        re3 = await consoleQ(`Client name what?\n`);
        re4 = await consoleQ(`Apart name what? (ex : "강서 크라운 팰리스")\n`);
        re5 = await consoleQ(`Designer name what?\n`);
        re6 = await consoleQ(`Project number what?\n`);
        this.portfolioFilter("portfolio", re3, re4, re5, re6);
      } else if (re2 === "ghost" || re2 === "2") {
        re3 = await consoleQ(`Designer name what?\n`);
        this.portfolioFilter("ghost", "null", "", re3, "g0");
      }

    //proposal
    } else if (re === "proposal" || re === "4") {
      re3 = await consoleQ(`Project number? (default: latest, if you want press 'none')\n`);
      this.proposalMaker("1", re3);

    //google
    } else if (re === "google" || re === "5") {
      re2 = await consoleQ(`Choose commands : 1.token 2.analytics\n`);
      this.googleAPIs(re2);

    //front
    } else if (re === "front" || re === "6") {
      this.frontMaker(false);

    //exit
    } else if (re === "exit" || re === "10") {
      process.exit();
    }

  } catch (e) {
    console.log(e);
  }
}

// EXE --------------------------------------------------------------------------------------

const robot = new Clown();
const MENU = {
  proposal: async function () {
    try {
      if (process.argv[3] === undefined) {
        throw new Error("must be proid");
      }
      robot.proposalMaker("make", process.argv[3]);
    } catch (e) {
      console.log(e);
    }
  },
  webProposal: async function () {
    try {
      if (process.argv[3] === undefined) {
        throw new Error("must be proid");
      }
      console.log(await robot.proposalMaker("web", process.argv[3]));
    } catch (e) {
      console.log(e);
    }
  },
  back: async function () {
    try {
      if (/nostatic/gi.test(process.argv[3])) {
        robot.dataConsole(true);
      } else {
        robot.dataConsole(false);
      }
    } catch (e) {
      console.log(e);
    }
  },
  request: async function () {
    try {
      await robot.requestMaker(process.argv[3]);
    } catch (e) {
      console.log(e);
    }
  },
  front: async function () {
    try {
      robot.frontMaker(process.argv[3] === "--webpack");
    } catch (e) {
      console.log(e);
    }
  },
  frontsource: async function () {
    try {
      if (process.argv[3] !== undefined) {
        robot.frontSource(process.argv[3].replace(/-/g, ''));
      } else {
        robot.frontSource("general");
      }
    } catch (e) {
      console.log(e);
    }
  },
  frontupdate: async function () {
    try {
      if (process.argv[3] !== undefined) {
        robot.frontUpdate(true);
      } else {
        robot.frontUpdate(false);
      }
    } catch (e) {
      console.log(e);
    }
  },
  consolesource: async function () {
    try {
      robot.consoleSource();
    } catch (e) {
      console.log(e);
    }
  },
  recordCloud: async function () {
    try {
      await robot.recordCloud();
    } catch (e) {
      console.log(e);
    }
  },
  pythonCloud: async function () {
    try {
      await robot.pythonCloud();
    } catch (e) {
      console.log(e);
    }
  },
  pythonWatcher: async function () {
    try {
      await robot.pythonWatcher();
    } catch (e) {
      console.log(e);
    }
  },
  bridgecloud: async function () {
    try {
      await robot.bridgeCloud();
    } catch (e) {
      console.log(e);
    }
  },
  bridgeserver: async function () {
    try {
      await robot.bridgeCloud();
    } catch (e) {
      console.log(e);
    }
  },
  analyticsParsing: async function () {
    try {
      await robot.analyticsParsing();
    } catch (e) {
      console.log(e);
    }
  },
  tellVoice: async function () {
    try {
      await robot.tellVoice();
    } catch (e) {
      console.log(e);
    }
  },
  reflect: async function () {
    try {
      await robot.ultimateReflection();
    } catch (e) {
      console.log(e);
    }
  },
  coreReflect: async function () {
    try {
      await robot.coreReflection();
    } catch (e) {
      console.log(e);
    }
  },
  mysqlReflect: async function () {
    try {
      await robot.mysqlReflection();
    } catch (e) {
      console.log(e);
    }
  },
  localReflect: async function () {
    try {
      await robot.localReflection(process.argv[3]);
    } catch (e) {
      console.log(e);
    }
  },
  clientReportToSheets: async function () {
    try {
      await robot.clientReportToSheets();
    } catch (e) {
      console.log(e);
    }
  },
  fixDir: async function () {
    try {
      let target;
      if (process.argv[3] === undefined) {
        target = process.env.HOME + "/samba/drive/HomeLiaisonServer";
      } else {
        target = process.argv[3];
      }
      await robot.fixDir(target);
    } catch (e) {
      console.log(e);
    }
  },
  proposalToClient: async function () {
    try {
      await robot.proposalToClient();
    } catch (e) {
      console.log(e);
    }
  },
  imageReady: async function () {
    try {
      await robot.imageReady();
    } catch (e) {
      console.log(e);
    }
  },
  mongoToJson: async function () {
    try {
      await robot.mongoToJson();
    } catch (e) {
      console.log(e);
    }
  },
  dev: async function () {
    try {
      const DevContext = require(`${process.cwd()}/apps/devContext/devContext.js`);
      const dev = new DevContext();
      await dev.launching();
    } catch (e) {
      console.log(e);
    }
  },
  canvas: async function () {
    try {
      const DevContext = require(`${process.cwd()}/apps/devContext/devContext.js`);
      const dev = new DevContext();
      dev.devCanvas(process.argv[2] !== "canvas");
    } catch (e) {
      console.log(e);
    }
  },
  calendarSync: async function () {
    try {
      const DevContext = require(`${process.cwd()}/apps/devContext/devContext.js`);
      const dev = new DevContext();
      await dev.calendarSync();
    } catch (e) {
      console.log(e);
    }
  },
  devAliveSync: async function () {
    try {
      await robot.devAliveSync();
    } catch (e) {
      console.log(e);
    }
  },
  clientActionSyncLocal: async function () {
    try {
      const BackWorker = require(`${process.cwd()}/apps/backMaker/backWorker.js`);
      const work = new BackWorker();
      await work.clientActionSync({ fromLocal: true });
    } catch (e) {
      console.log(e);
    }
  },
  clientActionSync: async function () {
    try {
      const BackWorker = require(`${process.cwd()}/apps/backMaker/backWorker.js`);
      const work = new BackWorker();
      await work.clientActionSync();
    } catch (e) {
      console.log(e);
    }
  },
  kakaoTokenGenerate: async function () {
    try {
      await robot.kakaoTokenGenerate();
    } catch (e) {
      console.log(e);
    }
  },
  staticInSync: async function () {
    try {
      await robot.staticInSync();
    } catch (e) {
      console.log(e);
    }
  },
  designerCalculation: async function () {
    try {
      await robot.designerCalculation();
    } catch (e) {
      console.log(e);
    }
  },
  spawnSector: async function () {
    try {
      let arg;
      arg = typeof process.argv[3] === "string" ? process.argv[3] : "";
      await robot.spawnSector(arg === "install");
    } catch (e) {
      console.log(e);
    }
  },
  publicSector: async function () {
    try {
      await robot.publicSector();
    } catch (e) {
      console.log(e);
    }
  },
  taxBill: async function () {
    try {
      await robot.taxBill();
    } catch (e) {
      console.log(e);
    }
  },
  positionWatch: async function () {
    try {
      await robot.positionWatch();
    } catch (e) {
      console.log(e);
    }
  },
  graphicServer: async function () {
    try {
      await robot.graphicServer();
    } catch (e) {
      console.log(e);
    }
  },
  cashReceipt: async function () {
    try {
      await robot.cashReceipt();
    } catch (e) {
      console.log(e);
    }
  },
  infoObj: async function () {
    try {
      await robot.infoObj();
    } catch (e) {
      console.log(e);
    }
  },
  infoUpdate: async function () {
    try {
      await robot.infoUpdate();
    } catch (e) {
      console.log(e);
    }
  },
  memberObj: async function () {
    try {
      await robot.memberObj();
    } catch (e) {
      console.log(e);
    }
  },
  memberUpdate: async function () {
    try {
      await robot.memberUpdate();
    } catch (e) {
      console.log(e);
    }
  },
  aliveTest: async function () {
    try {
      await robot.aliveTest();
    } catch (e) {
      console.log(e);
    }
  },
  passiveSync: async function () {
    try {
      await robot.passiveSync();
    } catch (e) {
      console.log(e);
    }
  },
  cronServer: async function () {
    try {
      await robot.cronServer();
    } catch (e) {
      console.log(e);
    }
  },
  log: async function () {
    try {
      await robot.playgroundConnect();
    } catch (e) {
      console.log(e);
    }
  }
};
let launchingFunc;

if (process.argv[2] === undefined) {
  robot.launching().catch((err) => { console.log(err); });
} else {
  launchingFunc = MENU[process.argv[2]];
  if (launchingFunc !== undefined) {
    launchingFunc().catch((err) => { console.log(err); });
  }
}
