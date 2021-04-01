const Robot = function () {
  const Mother = require(process.cwd() + "/apps/mother.js");
  const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js");
  const GoogleSheet = require(process.cwd() + "/apps/googleAPIs/googleSheet.js");
  this.mother = new Mother();
  this.back = new BackMaker();
  this.sheets = new GoogleSheet();
}

Robot.prototype.consoleQ = function (question) {
  const readline = require(`readline`);
  const rL = readline.createInterface({ input : process.stdin, output : process.stdout });
  return new Promise(function(resolve, reject) {
    rL.question(question, function (input) {
      resolve(input);
      rL.close();
    });
  });
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

    timeString = `${String(today.getFullYear())}${zeroAddition(today.getMonth() + 1)}${zeroAddition(today.getDate())}${zeroAddition(today.getHours())}${zeroAddition(today.getMinutes())}${zeroAddition(today.getSeconds())}`;

    for (let [ infoName, dbName ] of mongoTargets) {
      tempObj = {};
      tempObj[dbName] = true;
      collections = await back.mongoListCollections(tempObj);
      tempInfo = this.address[infoName];
      for (let collection of collections) {
        order = `mongoexport --uri="mongodb://${tempInfo["host"]}/${tempInfo["database"]}" --username=${tempInfo["user"]} --password=${tempInfo["password"]} --port=${String(tempInfo["port"])} --collection=${collection} --out="${shellLink(backDir)}/${timeString}/${collection}${timeString}.json" --authenticationDatabase admin`;
        shell.exec(order);
      }
    }

    return `mongo exports done`;
  } catch (e) {
    console.log(e);
  }
}

Robot.prototype.dataConsole = function () {
  const DataConsole = require(process.cwd() + "/apps/dataConsole/dataConsole.js");
  let app = new DataConsole();
  app.connect();
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
  const AiProposal = require(process.cwd() + "/apps/contentsMaker/aiProposal.js");
  let app;
  if (button === "make" || button === "1") {
    app = new AiProposal(arg);
    app.proposalLaunching();
  }
}

Robot.prototype.requestMaker = async function (arg) {
  const AiConsole = require(process.cwd() + "/apps/contentsMaker/aiConsole.js");
  try {
    let app;
    app = new AiConsole();
    await app.cardToRequest(arg);
  } catch (e) {
    console.log(e);
  }
}

Robot.prototype.portfolioFilter = function (boo, clientName, apartName, exceptionId = 0, pid = null) {
  const PortfolioFilter = require(process.cwd() + "/apps/portfolioFilter/portfolioFilter.js");
  let app = new PortfolioFilter(clientName, apartName, exceptionId, pid);
  if (boo === "portfolio") {
    app.total_make();
  } else if (boo === "ghost") {
    app.ghost_make(exceptionId);
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

Robot.prototype.pythonCloud = async function () {
  try {
    const PythonCloud = require(`${process.cwd()}/apps/pythonCloud/pythonCloud.js`);
    const app = new PythonCloud();
    app.serverLaunching();
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

Robot.prototype.ultimateReflection = async function () {
  try {
    const MongoReflection = require(`${process.cwd()}/apps/mongoReflection/mongoReflection.js`);
    const reflection = new MongoReflection();
    await reflection.ultimateReflection();
  } catch (e) {
    console.log(e);
  }
}

Robot.prototype.clientReportToSheets = async function () {
  try {
    const sheetId = "14tnBRhwpvrf0h6iYTJzLaxs8UPseNYsznhdhV5kc0UM";
    const startPoint = [ 0, 0 ];
    const report = await this.back.getClientReport();
    await this.sheets.update_value_inPython(sheetId, "", report.getMatrix(), startPoint);
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

Robot.prototype.launching = async function () {
  try {
    let re, re2, re3, re4, re5, re6;
    if (process.argv[2] === "proposal" && process.argv[3] !== undefined) {
      this.proposalMaker("make", process.argv[3]);

    } else if (process.argv[2] === "back") {
      this.dataConsole();

    } else if (process.argv[2] === "request" && process.argv[3] !== undefined) {
      await this.requestMaker(process.argv[3]);

    } else if (process.argv[2] === "front" && process.argv[3] !== "--webpack") {
      this.frontMaker(false);

    } else if (process.argv[2] === "front" && process.argv[3] === "--webpack") {
      this.frontMaker(true);

    } else if (process.argv[2] === "frontsource") {

      if (process.argv[3] !== undefined) {
        this.frontSource(process.argv[3].replace(/-/g, ''));
      } else {
        this.frontSource("general");
      }

    } else if (process.argv[2] === "frontupdate") {

      if (process.argv[3] !== undefined) {
        this.frontUpdate(true);
      } else {
        this.frontUpdate(false);
      }

    } else if (process.argv[2] === "consolesource") {

      this.consoleSource();

    } else if (process.argv[2] === "consulting") {
      if (process.argv[3] !== "pack" && process.argv[3] !== "webpack") {
        await this.getConsulting(false);
      } else {
        await this.getConsulting(true);
      }

    } else if (/pollingserver/gi.test(process.argv[2])) {
      await this.officePolling("server", true);

    } else if (/pollingoffice/gi.test(process.argv[2])) {
      await this.officePolling("server", false);

    } else if (/pollingreceive/gi.test(process.argv[2])) {
      await this.officePolling("receive");

    } else if (/pollinginjection/gi.test(process.argv[2])) {
      await this.officePolling("injection");

    } else if (/pythoncloud/gi.test(process.argv[2]) || /pythonserver/gi.test(process.argv[2])) {
      await this.pythonCloud();

    } else if (/bridgeserver/gi.test(process.argv[2])) {
      await this.bridgeCloud();

    } else if (/analyticsParsing/gi.test(process.argv[2])) {
      await this.analyticsParsing();

    } else if (/voice/gi.test(process.argv[2]) && process.argv[3] !== undefined) {
      await this.tellVoice(process.argv[3]);

    } else if (/sendAspirantPresentation/gi.test(process.argv[2])) {
      await this.sendAspirantPresentation();

    } else if (/reflect/gi.test(process.argv[2])) {
      await this.ultimateReflection();

    } else if (/clientReportToSheets/gi.test(process.argv[2])) {
      await this.clientReportToSheets();

    } else if (/fixDir/gi.test(process.argv[2])) {
      await this.fixDir(process.argv[3]);

    } else if (/proposalToClient/gi.test(process.argv[2])) {
      await this.proposalToClient();

    } else {
      re = await this.consoleQ(`Choose commands : 1.back 2.contents 3.portfolio 4.proposal 5.google 6.front 7.consulting 8.aiohttp 9.aiohttpInstall 10.exit\n`);

      //console server
      if (re === "back" || re === "1") {
        this.dataConsole();

      //contents maker
      } else if (re === "contents" || re === "2") {
        re2 = await this.consoleQ(`Choose commands : 1.make 2.mysql 3.poo 4.resource 5.front\n`);
        if (re2 === "make" || re2 === "1") {
          re3 = await this.consoleQ(`Porfolio number?\n`);
        } else if (re2 === "mysql" || re2 === "2") {
          re3 = ``;
        } else if (re2 === "poo" || re2 === "3") {
          re3 = ``;
        } else if (re2 === "resource" || re2 === "4") {
          re3 = await this.consoleQ(`Porfolio number?\n`);
        }
        this.contentsMaker(re2, re3);

      //portfolio filter
      } else if (re === "portfolio" || re === "3") {
        re2 = await this.consoleQ(`Choose commands : 1.portfolio 2.ghost\n`);
        if (re2 === "portfolio" || re2 === "1") {
          re3 = await this.consoleQ(`Client name what?\n`);
          re4 = await this.consoleQ(`Apart name what? (ex : "강서 크라운 팰리스")\n`);
          re5 = await this.consoleQ(`Designer name what?\n`);
          re6 = await this.consoleQ(`Project number what?\n`);
          this.portfolioFilter("portfolio", re3, re4, re5, re6);
        } else if (re2 === "ghost" || re2 === "2") {
          re3 = await this.consoleQ(`Designer name what?\n`);
          re4 = await this.consoleQ(`Exception id what? (must be Number, ex : 1, default: 0)\n`);
          this.portfolioFilter("ghost", re3, "", Number(re4), null);
        }

      //proposal
      } else if (re === "proposal" || re === "4") {
        re3 = await this.consoleQ(`Project number? (default: latest, if you want press 'none')\n`);
        this.proposalMaker("1", re3);

      //google
      } else if (re === "google" || re === "5") {
        re2 = await this.consoleQ(`Choose commands : 1.token 2.analytics\n`);
        this.googleAPIs(re2);

      //front
      } else if (re === "front" || re === "6") {
        this.frontMaker(false);

      //consulting
      } else if (re === "consulting" || re === "7") {
        re2 = await this.consoleQ(`Choose commands : 1.notion 2.junk\n`);
        if (re2 === "notion" || re2 === "1") {
          re3 = await this.consoleQ(`Client id? (default: latest, if you want press 'none')\n`);
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
    }
  } catch (e) {
    console.log(e);
  }
}

// EXE --------------------------------------------------------------------------------------

if (process.argv[2] !== "dev" && process.argv[2] !== "canvas" && !/canvascheck/gi.test(process.argv[2])) {
  const app = new Robot();
  app.launching();
} else {
  const DevContext = require(`${process.cwd()}/apps/devContext/devContext.js`);
  const dev = new DevContext();
  if (process.argv[2] === "dev") {
    dev.launching();
  } else {
    dev.devCanvas(process.argv[2] !== "canvas");
  }
}
