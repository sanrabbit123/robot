const Robot = function () {
  const Mother = require(process.cwd() + "/apps/mother.js");
  const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js");
  const ADDRESS = require(process.cwd() + "/apps/infoObj.js");
  const { WebClient } = require("@slack/web-api");
  this.mother = new Mother();
  this.back = new BackMaker();
  this.address = ADDRESS;
  this.slack_token = "xoxb-717757271335-2032150390679-1FTxRg4wQasMpe9kKDgAdqBv";
  this.slack_bot = new WebClient(this.slack_token);
}

Robot.timeouts = {};

Robot.prototype.mongoToJson = async function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink } = this.mother;
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
      [ "testinfo", "log" ],
    ];
    const robotDirArr = process.cwd().split("/");
    robotDirArr.pop();
    const robotDirMother = robotDirArr.join("/");
    const robotDirMotherDetail = await fileSystem(`readDir`, [ robotDirMother ]);
    if (!robotDirMotherDetail.includes(backFolderName)) {
      await shellExec(`mkdir ${shellLink(robotDirMother)}/${backFolderName}`);
    }
    const backDir = robotDirMother + "/" + backFolderName;
    let tempInfo, timeString;

    timeString = `${String(today.getFullYear())}${zeroAddition(today.getMonth() + 1)}${zeroAddition(today.getDate())}${zeroAddition(today.getHours())}${zeroAddition(today.getMinutes())}${zeroAddition(today.getSeconds())}`;

    for (let [ infoName, dbName ] of mongoTargets) {
      tempInfo = this.address[infoName];
      await shellExec(`mongodump --uri="mongodb://${tempInfo["host"]}/${tempInfo["database"]}" --username=${tempInfo["user"]} --password=${tempInfo["password"]} --port=${String(tempInfo["port"])} --out="${shellLink(backDir)}/${timeString}/${dbName}${timeString}" --authenticationDatabase admin`);
    }

    await shellExec(`cd ${shellLink(backDir)};zip -r ./${timeString}.zip ./${timeString};rm -rf ${shellLink(backDir)}/${timeString}`);

    return `mongo exports done`;
  } catch (e) {
    console.log(e);
  }
}

Robot.prototype.diskTest = function () {
  const instance = this;
  const CronGhost = require(`${process.cwd()}/apps/cronGhost/cronGhost.js`);
  const app = new CronGhost();
  app.diskTest().catch((err) => { console.log(err); });
}

Robot.prototype.infoObj = async function () {
  try {
    await this.back.setInfoObj({ getMode: false });
  } catch (e) {
    console.log(e);
  }
}

Robot.prototype.memberObj = async function () {
  try {
    await this.back.setMemberObj({ getMode: false });
  } catch (e) {
    console.log(e);
  }
}

Robot.prototype.infoUpdate = async function () {
  try {
    await this.back.updateInfoObj();
  } catch (e) {
    console.log(e);
  }
}

Robot.prototype.memberUpdate = async function () {
  try {
    await this.back.updateMemberObj();
  } catch (e) {
    console.log(e);
  }
}

Robot.prototype.dataConsole = function (noStatic = false) {
  const DataConsole = require(process.cwd() + "/apps/dataConsole/dataConsole.js");
  const app = new DataConsole();
  app.connect(noStatic).catch((err) => { console.log(err); });
}

Robot.prototype.renderFrontPhp = async function () {
  const DataConsole = require(process.cwd() + "/apps/dataConsole/dataConsole.js");
  const app = new DataConsole();
  await app.renderFrontPhp();
}

Robot.prototype.renderDesignerPhp = async function () {
  const DataConsole = require(process.cwd() + "/apps/dataConsole/dataConsole.js");
  const app = new DataConsole();
  await app.renderDesignerPhp();
}

Robot.prototype.contentsMaker = function (button, arg) {
  const AiContents = require(process.cwd() + "/apps/contentsMaker/aiContents.js");
  const ResourceMaker = require(process.cwd() + "/apps/resourceMaker/resourceMaker.js");
  let app;
  if (button === "resource" || button === "1") {
    app = new ResourceMaker(arg);
    app.launching();
  } else if (button === "google" || button === "2") {
    app = new AiContents();
    app.to_google(arg);
  }
}

Robot.prototype.aliveTest = function () {
  const instance = this;
  const CronGhost = require(`${process.cwd()}/apps/cronGhost/cronGhost.js`);
  const app = new CronGhost();
  app.aliveTest().catch((err) => { console.log(err); });
}

Robot.prototype.proposalMaker = function (button, arg) {
  if (arg === undefined) {
    throw new Error("proposal must be id");
    return;
  }
  const instance = this;
  const back = this.back;
  const KakaoTalk = require(`${process.cwd()}/apps/kakaoTalk/kakaoTalk.js`);
  const path = "proposal";
  const collection = "proposalLog";
  const { host } = this.address.frontinfo;
  const { requestSystem, messageLog, errorLog, messageSend } = this.mother;
  const proid = arg;
  let kakaoInstance, cliid, name, phone, client;
  let requestNumber, action;
  let now;
  let project;

  return new Promise((resolve, reject) => {

    now = new Date();

    back.getProjectById(proid).then((thisProject) => {
      if (thisProject === null) {
        reject("There is no project");
      }
      project = thisProject;
      cliid = thisProject.cliid;
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
      }, { headers: { "origin": "https://" + instance.address.backinfo.host, "Content-Type": "application/json" } });

    }).then(() => {

      const targetProposal = project.toNormal().proposal;
      targetProposal.status = "완료";
      targetProposal.date = now;

      return back.mongoCreate(collection, {
        date: new Date(),
        method: "send",
        proid: proid,
        project: targetProposal,
      }, { console: true });

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
      }, { headers: { "origin": "https://" + instance.address.backinfo.host, "Content-Type": "application/json" } });

    }).then(() => {

      let updateObj;
      updateObj = {};
      updateObj["requests." + String(requestNumber) + ".analytics.response.action"] = action;
      return back.updateClient([ { cliid }, updateObj ]);

    }).then(() => {
      return messageSend({ text: name + " 고객님께 추천서를 전송하였어요.\nlink : https://" + host + "/" + path + ".php?proid=" + proid + "&mode=test", channel: "#403_proposal", voice: true });

    }).catch((err) => {
      errorLog("추천서 보내는 도중 오류남 : " + err.message).catch((e) => { console.log(e); });
      reject(err);
    });
  });
}

Robot.prototype.requestMaker = async function (arg) {
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

Robot.prototype.portfolioFilter = function (boo, clientName, apartName, designerName, pid = "g0") {
  const PortfolioFilter = require(process.cwd() + "/apps/portfolioFilter/portfolioFilter.js");
  let app = new PortfolioFilter(clientName, apartName, designerName, pid);
  if (boo === "portfolio") {
    app.total_make();
  } else if (boo === "ghost") {
    app.ghost_make();
  }
}

Robot.prototype.frontSource = function (argv) {
  const AiFront = require(process.cwd() + "/apps/contentsMaker/aiFront.js");
  let fobot = new AiFront();
  fobot.front_maker(argv);
}

Robot.prototype.frontTest = async function () {
  try {
    const FrontMaker = require(process.cwd() + "/apps/frontMaker/frontMaker.js");
    let fobot = new FrontMaker();
    await fobot.totalUpdate(true);
  } catch (e) {
    console.log(e);
  }
}

Robot.prototype.frontUpdate = async function () {
  try {
    const FrontMaker = require(process.cwd() + "/apps/frontMaker/frontMaker.js");
    let fobot = new FrontMaker();
    await fobot.totalUpdate(false);
  } catch (e) {
    console.log(e);
  }
}

Robot.prototype.logConnect = async function () {
  try {
    const LogConsole = require(process.cwd() + "/apps/logConsole/logConsole.js");
    const app = new LogConsole();
    await app.logConnect();
  } catch (e) {
    console.log(e);
  }
}

Robot.prototype.secondConnect = async function () {
  try {
    const SecondGhost = require(process.cwd() + "/apps/secondGhost/secondGhost.js");
    const app = new SecondGhost();
    await app.ghostConnect();
  } catch (e) {
    console.log(e);
  }
}

Robot.prototype.transferConnect = async function () {
  try {
    const TransferLounge = require(process.cwd() + "/apps/transferLounge/transferLounge.js");
    const app = new TransferLounge();
    await app.transConnect();
  } catch (e) {
    console.log(e);
  }
}

Robot.prototype.consoleSource = function () {
  const AiConsole = require(process.cwd() + "/apps/contentsMaker/aiConsole.js");
  let cobot = new AiConsole();
  cobot.console_maker();
}

Robot.prototype.recordCloud = async function (sw, boo = true) {
  try {
    const RecordCloud = require(`${process.cwd()}/apps/recordCloud/recordCloud.js`);
    const app = new RecordCloud();
    await app.recordServerLaunching();
  } catch (e) {
    console.log(e);
  }
}

Robot.prototype.pythonCloud = async function () {
  try {
    const ReceiptObserver = require(`${process.cwd()}/apps/receiptObserver/receiptObserver.js`);
    const app = new ReceiptObserver();
    await app.taxServerLaunching();
  } catch (e) {
    console.log(e);
  }
}

Robot.prototype.pythonWatcher = async function () {
  try {
    const ReceiptObserver = require(`${process.cwd()}/apps/receiptObserver/receiptObserver.js`);
    const app = new ReceiptObserver();
    await app.wssClientLaunching();
  } catch (e) {
    console.log(e);
  }
}

Robot.prototype.taxBill = async function () {
  try {
    const BillMaker = require(`${process.cwd()}/apps/billMaker/billMaker.js`);
    const app = new BillMaker();
    await app.taxBill();
  } catch (e) {
    console.log(e);
  }
}

Robot.prototype.tellVoice = async function () {
  try {
    const { shellExec } = this.mother;
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
        // voice.textToVoice(String(req.body.text));
        shellExec("say", [ req.body.text ]).catch((err) => { console.log(err); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ message: "will do" }));
      }
    });

    http.createServer(app).listen(instance.address.officeinfo.voice.port, () => {
      console.log(``);
      console.log(`\x1b[33m%s\x1b[0m`, `Server running`);
      console.log(``);
    });

  } catch (e) {
    console.log(e);
  }
}

Robot.prototype.kakaoTokenGenerate = async function () {
  try {
    const KakaoTalk = require(`${process.cwd()}/apps/kakaoTalk/kakaoTalk.js`);
    const app = new KakaoTalk();
    await app.generateToken();
  } catch (e) {
    console.log(e);
  }
}

Robot.prototype.ultimateReflection = async function () {
  try {
    const MongoReflection = require(`${process.cwd()}/apps/mongoReflection/mongoReflection.js`);
    const reflection = new MongoReflection();
    await reflection.ultimateReflection();
  } catch (e) {
    console.log(e);
  }
}

Robot.prototype.coreReflection = async function () {
  try {
    const MongoReflection = require(`${process.cwd()}/apps/mongoReflection/mongoReflection.js`);
    const reflection = new MongoReflection();
    await reflection.coreReflection();
  } catch (e) {
    console.log(e);
  }
}

Robot.prototype.frontReflection = async function () {
  try {
    const MongoReflection = require(`${process.cwd()}/apps/mongoReflection/mongoReflection.js`);
    const reflection = new MongoReflection();
    await reflection.frontReflection();
  } catch (e) {
    console.log(e);
  }
}

Robot.prototype.mysqlReflection = async function () {
  try {
    const MongoReflection = require(`${process.cwd()}/apps/mongoReflection/mongoReflection.js`);
    const reflection = new MongoReflection();
    await reflection.mysqlReflection();
  } catch (e) {
    console.log(e);
  }
}

Robot.prototype.frontReflection = async function () {
  try {
    const MongoReflection = require(`${process.cwd()}/apps/mongoReflection/mongoReflection.js`);
    const reflection = new MongoReflection();
    await reflection.frontReflection();
  } catch (e) {
    console.log(e);
  }
}

Robot.prototype.localReflection = async function (arg = null) {
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
      } else if (/log/gi.test(arg)) {
        target = "testinfo";
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

Robot.prototype.clientReportToSheets = async function () {
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

Robot.prototype.fixDir = async function (target) {
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

Robot.prototype.proposalToClient = async function () {
  try {
    const BackWorker = require(process.cwd() + "/apps/backMaker/backWorker.js");
    const work = new BackWorker();
    await work.setProposalToClient("cron");
  } catch (e) {
    console.log(e);
  }
}

Robot.prototype.imageReady = async function () {
  try {
    const PortfolioFilter = require(process.cwd() + "/apps/portfolioFilter/portfolioFilter.js");
    let app = new PortfolioFilter();
    await app.image_ready();
  } catch (e) {
    console.log(e);
  }
}

Robot.prototype.staticInSync = async function () {
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
    order += this.address.officeinfo.ghost.user + "@" + this.address.officeinfo.ghost.host + ":" + shellLink(this.address.officeinfo.ghost.file.static);
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

Robot.prototype.sayHello = async function (message = null) {
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

Robot.prototype.consoleHello = async function () {
  const instance = this;
  try {
    setTimeout(() => {
      console.log("hello : " + instance.mother.uniqueValue("hex"));
    }, 3000 + (10 * 1000 * Math.random()));
  } catch (e) {
    console.log(e);
  }
}

Robot.prototype.designerCalculation = async function () {
  try {
    const BackWorker = require(`${process.cwd()}/apps/backMaker/backWorker.js`);
    const work = new BackWorker();
    await work.designerCalculation();
  } catch (e) {
    console.log(e);
  }
}

Robot.prototype.publicSector = async function () {
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

Robot.prototype.spawnSector = async function (install = false) {
  try {
    const PublicSector = require(`${process.cwd()}/apps/publicSector/publicSector.js`);
    const app = new PublicSector();
    await app.spawnSector(install);
  } catch (e) {
    console.log(e);
  }
}

Robot.prototype.positionWatch = async function () {
  try {
    const GraphicBot = require(`${process.cwd()}/apps/graphicBot/graphicBot.js`);
    const app = new GraphicBot();
    app.positionWatch();
  } catch (e) {
    console.log(e);
  }
}

Robot.prototype.graphicServer = async function () {
  try {
    const GraphicBot = require(`${process.cwd()}/apps/graphicBot/graphicBot.js`);
    const app = new GraphicBot();
    app.botServer();
  } catch (e) {
    console.log(e);
  }
}

Robot.prototype.passiveSync = async function () {
  try {
    const BillMaker = require(`${process.cwd()}/apps/billMaker/billMaker.js`);
    const bill = new BillMaker();
    bill.passiveSyncAll();
  } catch (e) {
    console.log(e);
  }
}

Robot.prototype.devAliveSync = async function () {
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

Robot.prototype.cronServer = async function () {
  try {
    const CronGhost = require(`${process.cwd()}/apps/cronGhost/cronGhost.js`);
    const cron = new CronGhost();
    await cron.cronServer();
  } catch (e) {
    console.log(e);
  }
}

Robot.prototype.localLog = async function () {
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

        colorLog("yellow", req.body.message);

        res.send(JSON.stringify({ message: "done" }));
      } catch (e) {
        res.send(JSON.stringify({ message: "error" }));
      }
    });

    pureServer("listen", app, 3000);

  } catch (e) {
    console.log(e);
  }
}

Robot.prototype.arpScan = async function () {
  const instance = this;
  const address = this.address;
  const { shellExec, dateToString } = this.mother;
  try {
    setInterval(async () => {
      try {
        const bar = "=======================================";
        const self = "bc:5f:f4:93:ca:ed";
        const interface = [
          "enp3s0",
          "wlx705dccfbea68"
        ];
        let res;
        let targets;
        let matrix;
        let index;
        let tong;

        tong = {};
        for (let obj of address.officeinfo.map) {
          tong[obj.name] = self === obj.mac;
        }

        console.log("\x1b[33m%s\x1b[0m%s", dateToString(new Date(), true) + " " + bar, "");
        for (let i of interface) {
          res = await shellExec(`arp-scan --interface=${i} --localnet`);
          targets = res.split("\n").slice(res.split("\n").findIndex((str) => { return /^1/.test(str) }), res.split("\n").findIndex((str) => { return str.trim() === '' }));
          matrix = targets.map((str) => { return str.split("\t") });
          for (let [ ip, mac ] of matrix) {
            index = address.officeinfo.map.findIndex((obj) => { return obj.mac === mac })
            if (index !== -1) {
              tong[address.officeinfo.map[index].name] = true;
            }
          }
        }

        for (let name in tong) {
          console.log(tong[name] ? "\x1b[0m%s \x1b[33m%s" : "\x1b[0m%s \x1b[31m%s", name, tong[name] ? "alive" : "death");
        }
        console.log("\x1b[33m%s\x1b[0m%s", dateToString(new Date(), true) + " " + bar, "");
      } catch (e) {
        console.log(e);
      }
    }, 5 * 60 * 1000);
  } catch (e) {
    console.log(e);
  }
}

Robot.prototype.magazineMaker = function (mid) {
  const ResourceMaker = require(process.cwd() + "/apps/resourceMaker/resourceMaker.js");
  const app = new ResourceMaker();
  app.magazineMaker(mid).catch((err) => { console.log(err); })
}

Robot.prototype.launching = async function () {
  const instance = this;
  const { consoleQ } = this.mother;
  try {
    let re, re2, re3, re4, re5, re6;

    re = await consoleQ(`Choose commands : 1.contents 2.portfolio 3.magazine\n`);

    if (re === "contents" || re === "1") {
      re2 = await consoleQ(`Choose commands : 1.resource 2.google\n`);
      re3 = await consoleQ(`Porfolio number?\n`);
      this.contentsMaker(re2, re3);

    } else if (re === "portfolio" || re === "2") {
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

    } else if (re === "magazine" || re === "3") {
      re3 = await consoleQ(`mid?\n`);
      this.magazineMaker(re3);

    } else {
      process.exit();
    }

  } catch (e) {
    console.log(e);
  }
}

// EXE --------------------------------------------------------------------------------------

const robot = new Robot();
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
      await robot.frontTest();
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
  frontUpdate: async function () {
    try {
      await robot.frontUpdate();
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
  frontReflect: async function () {
    try {
      await robot.frontReflection();
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
  frontReflect: async function () {
    try {
      await robot.frontReflection();
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
      await robot.logConnect();
    } catch (e) {
      console.log(e);
    }
  },
  php: async function () {
    try {
      await robot.renderFrontPhp();
    } catch (e) {
      console.log(e);
    }
  },
  phpClient: async function () {
    try {
      await robot.renderFrontPhp();
    } catch (e) {
      console.log(e);
    }
  },
  phpDesigner: async function () {
    try {
      await robot.renderDesignerPhp();
    } catch (e) {
      console.log(e);
    }
  },
  consoleHello: async function () {
    try {
      await robot.consoleHello();
    } catch (e) {
      console.log(e);
    }
  },
  diskTest: async function () {
    try {
      await robot.diskTest();
    } catch (e) {
      console.log(e);
    }
  },
  localLog: async function () {
    try {
      await robot.localLog();
    } catch (e) {
      console.log(e);
    }
  },
  arpScan: async function () {
    try {
      await robot.arpScan();
    } catch (e) {
      console.log(e);
    }
  },
  second: async function () {
    try {
      await robot.secondConnect();
    } catch (e) {
      console.log(e);
    }
  },
  trans: async function () {
    try {
      await robot.transferConnect();
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
