const Robot = function () {
  const Mother = require(process.cwd() + "/apps/mother.js");
  const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js");
  const ADDRESS = require(process.cwd() + "/apps/infoObj.js");
  this.mother = new Mother();
  this.back = new BackMaker();
  this.address = ADDRESS;
}

Robot.prototype.mongoToJson = async function () {
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
      for (let collection of collections) {
        order = `mongoexport --uri="mongodb://${tempInfo["host"]}/${tempInfo["database"]}" --username=${tempInfo["user"]} --password=${tempInfo["password"]} --port=${String(tempInfo["port"])} --collection=${collection} --out="${shellLink(backDir)}/${timeString}/${collection}${timeString}.json" --authenticationDatabase admin`;
        tempMsg = shell.exec(order);
      }
    }

    return `mongo exports done`;
  } catch (e) {
    console.log(e);
  }
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

Robot.prototype.dataConsole = function (testMode = false) {
  const DataConsole = require(process.cwd() + "/apps/dataConsole/dataConsole.js");
  let app = new DataConsole();
  app.connect(testMode);
}

Robot.prototype.staticUpload = function () {
  const DataConsole = require(process.cwd() + "/apps/dataConsole/dataConsole.js");
  let app = new DataConsole();
  app.staticUpload();
}

Robot.prototype.contentsMaker = function (button, arg) {
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

Robot.prototype.proposalMaker = function (button, arg) {
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
    const proid = arg;
    let kakaoInstance, cliid, name, phone;
    return new Promise(function (resolve, reject) {
      back.getProjectById(proid).then(function (project) {
        if (project === null) {
          reject("There is no project");
        }
        cliid = project.cliid;
        return back.getClientById(cliid);
      }).then(function (client) {
        name = client.name;
        phone = client.phone;
        kakaoInstance = new KakaoTalk();
        return kakaoInstance.ready();
      }).then(function () {
        return kakaoInstance.sendTalk("designerProposal", name, phone, { client: name, host, path, proid });
      }).then(function () {
        return back.updateProject([ { proid }, { "proposal.status": "완료", "proposal.date": (new Date()) } ]);
      }).then(function () {
        instance.mother.slack_bot.chat.postMessage({ text: name + " 고객님께 제안서 알림톡을 전송하였습니다!\n" + host + "/" + path + "?proid=" + proid, channel: "#error_log" });
        console.log("web proposal done", name, phone, proid);
      }).catch(function (err) {
        reject(err);
      });
    });
  }
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

Robot.prototype.googleAPIs = function (button) {
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

Robot.prototype.frontSource = function (argv) {
  const AiFront = require(process.cwd() + "/apps/contentsMaker/aiFront.js");
  let fobot = new AiFront();
  fobot.front_maker(argv);
}

Robot.prototype.frontMaker = function (webpack) {
  const FrontMaker = require(process.cwd() + "/apps/frontMaker/frontMaker.js");
  let fobot = new FrontMaker();
  fobot.totalLaunching(webpack);
}

Robot.prototype.frontUpdate = function (testMode) {
  const FrontMaker = require(process.cwd() + "/apps/frontMaker/frontMaker.js");
  let fobot = new FrontMaker();
  fobot.totalUpdate(testMode);
}

Robot.prototype.consoleSource = function () {
  const AiConsole = require(process.cwd() + "/apps/contentsMaker/aiConsole.js");
  let cobot = new AiConsole();
  cobot.console_maker();
}

Robot.prototype.getConsulting = async function (sw = "1", cliid = "latest") {
  try {
    const NotionAPIs = require(`${process.cwd()}/apps/notionAPIs/notionAPIs.js`);
    const GetConsulting = require(`${process.cwd()}/apps/getConsulting/getConsulting.js`);

    let app;

    if (sw === "notion" || sw === "1") {
      app = new NotionAPIs();
      await app.launching(cliid);
    } else {
      app = new GetConsulting();
      await app.launching(false);
    }

  } catch (e) {
    console.log(e);
  }
}

Robot.prototype.officePolling = async function (sw, boo = true) {
  try {
    const OfficePolling = require(`${process.cwd()}/apps/officePolling/officePolling.js`);
    const app = new OfficePolling();
    switch (sw) {
      case "server":
        await app.serverLaunching(boo);
        break;
      case "receive":
        await app.receiveLaunching();
        break;
      case "injection":
        await app.injectionLaunching();
        break;
    }
  } catch (e) {
    console.log(e);
  }
}

Robot.prototype.robotPass = async function () {
  try {
    const PythonCloud = require(`${process.cwd()}/apps/pythonCloud/pythonCloud.js`);
    const app = new PythonCloud();
    await app.serverLaunching();
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
    const ReceiptObserver = require(`${process.cwd()}/apps/receiptObserver/receiptObserver.js`);
    const app = new ReceiptObserver();
    await app.taxBill();
  } catch (e) {
    console.log(e);
  }
}

Robot.prototype.cashReceipt = async function () {
  try {
    const { shell, shellLink } = this.mother;
    const { homeinfo: { map, ghost } } = this.address;
    const target = "graphic";
    let port;
    for (let obj of map) {
      if (obj.name === target) {
        port = obj.port.express[0];
      }
    }
    shell.exec(`curl https://${ghost.host}:${String(port)}/cash`);
  } catch (e) {
    console.log(e);
  }
}

Robot.prototype.bridgeCloud = async function (sw) {
  try {
    const BridgeCloud = require(`${process.cwd()}/apps/bridgeCloud/bridgeCloud.js`);
    const app = new BridgeCloud();
    await app.serverLaunching();
  } catch (e) {
    console.log(e);
  }
}

Robot.prototype.analyticsParsing = async function () {
  try {
    const GoogleAnalytics = require(`${process.cwd()}/apps/googleAPIs/googleAnalytics.js`);
    const app = new GoogleAnalytics();
    await app.analyticsToMongo();
  } catch (e) {
    console.log(e);
  }
}

Robot.prototype.tellVoice = async function (text) {
  try {
    const PlayAudio = require(`${process.cwd()}/apps/playAudio/playAudio.js`);
    const voice = new PlayAudio();
    if (/__split__/gi.test(text)) {
      text = text.replace(/__split__/gi, "\n");
    }
    await voice.textToVoice(text);
  } catch (e) {
    console.log(e);
  }
}

Robot.prototype.sendAspirantPresentation = async function () {
  try {
    const KakaoTalk = require(`${process.cwd()}/apps/kakaoTalk/kakaoTalk.js`);
    const kakao = new KakaoTalk();
    await kakao.sendAspirantPresentation();
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

Robot.prototype.mysqlReflection = async function () {
  try {
    const MongoReflection = require(`${process.cwd()}/apps/mongoReflection/mongoReflection.js`);
    const reflection = new MongoReflection();
    await reflection.mysqlReflection();
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
      } else if (/home/gi.test(arg)) {
        target = "homeinfo";
      } else if (/bridge/gi.test(arg)) {
        target = "bridgeinfo";
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
    await this.mother.slack_bot.chat.postMessage({ text, channel });
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

Robot.prototype.spawnCatfish = async function () {
  try {
    const SpawnCatfish = require(`${process.cwd()}/apps/spawnCatfish/spawnCatfish.js`);
    const app = new SpawnCatfish();
    await app.spawnLaunching(true);
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

Robot.prototype.launching = async function () {
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

    //consulting
    } else if (re === "consulting" || re === "7") {
      re2 = await consoleQ(`Choose commands : 1.notion 2.junk\n`);
      if (re2 === "notion" || re2 === "1") {
        re3 = await consoleQ(`Client id? (default: latest, if you want press 'none')\n`);
        if (re3 === "none" || re3 === "latest" || re3 === "") {
          await this.getConsulting(re2, "latest");
        } else {
          await this.getConsulting(re2, re3);
        }
      } else {
        await this.getConsulting(re2);
      }

    //exit
    } else if (re === "exit" || re === "10") {
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
      if (process.argv[3] === "test") {
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
  consulting: async function () {
    try {
      if (process.argv[3] !== "pack" && process.argv[3] !== "webpack") {
        await robot.getConsulting(false);
      } else {
        await robot.getConsulting(true);
      }
    } catch (e) {
      console.log(e);
    }
  },
  pollingserver: async function () {
    try {
      await robot.officePolling("server", true);
    } catch (e) {
      console.log(e);
    }
  },
  pollingoffice: async function () {
    try {
      await robot.officePolling("server", false);
    } catch (e) {
      console.log(e);
    }
  },
  pollingreceive: async function () {
    try {
      await robot.officePolling("receive");
    } catch (e) {
      console.log(e);
    }
  },
  pollinginjection: async function () {
    try {
      await robot.officePolling("injection");
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
  voice: async function () {
    try {
      await robot.tellVoice(process.argv[3]);
    } catch (e) {
      console.log(e);
    }
  },
  sendAspirantPresentation: async function () {
    try {
      await robot.sendAspirantPresentation();
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
      dev.launching();
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
  canvascheck: async function () {
    try {
      const DevContext = require(`${process.cwd()}/apps/devContext/devContext.js`);
      const dev = new DevContext();
      dev.devCanvas(process.argv[2] !== "canvas");
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
  staticUpload: async function () {
    try {
      await robot.staticUpload();
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
  sayHello: async function () {
    try {
      await robot.sayHello(process.argv[3] !== undefined ? process.argv[3] : null);
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
  spawnCatfish: async function () {
    try {
      await robot.spawnCatfish();
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
  robotPass: async function () {
    try {
      await robot.robotPass();
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
};
let launchingFunc;

if (process.argv[2] === undefined) {
  robot.launching();
} else {
  launchingFunc = MENU[process.argv[2]];
  if (launchingFunc !== undefined) {
    launchingFunc();
  }
}
