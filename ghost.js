const ROBOT_PATH = process.cwd();
const APP_PATH = ROBOT_PATH + "/apps";
const Mother = require(APP_PATH + "/mother.js");
const BackMaker = require(APP_PATH + "/backMaker/backMaker.js");
const BridgeCloud = require(APP_PATH + "/bridgeCloud/bridgeCloud.js");
const GoogleAnalytics = require(APP_PATH + "/googleAPIs/googleAnalytics.js");
const GoogleSheet = require(APP_PATH + "/googleAPIs/googleSheet.js");
const GoogleDrive = require(APP_PATH + "/googleAPIs/googleDrive.js");
const GoogleCalendar = require(APP_PATH + "/googleAPIs/googleCalendar.js");
const AiGraph = require(APP_PATH + "/contentsMaker/aiGraph.js");
const AiConsole = require(APP_PATH + "/contentsMaker/aiConsole.js");
const AppleAPIs = require(APP_PATH + "/appleAPIs/appleAPIs.js");
const ContentsMaker = require(APP_PATH + "/contentsMaker/contentsMaker.js");
const NaverAPIs = require(APP_PATH + "/naverAPIs/naverAPIs.js");
const ResourceMaker = require(APP_PATH + "/resourceMaker/resourceMaker.js");
const NotionAPIs = require(APP_PATH + "/notionAPIs/notionAPIs.js");
const ImmovablesServer = require(APP_PATH + "/immovablesServer/immovablesServer.js");
const KakaoTalk = require(APP_PATH + "/kakaoTalk/kakaoTalk.js");
const PortfolioFilter = require(APP_PATH + "/portfolioFilter/portfolioFilter.js");
const DataRouter = require(APP_PATH + "/dataConsole/router/dataRouter.js");
const ParsingHangul = require(APP_PATH + "/parsingHangul/parsingHangul.js");
const SnsParsing = require(APP_PATH + "/snsParsing/snsParsing.js");
const PlayAudio = require(APP_PATH + "/playAudio/playAudio.js");
const SpawnCatfish = require(APP_PATH + "/spawnCatfish/spawnCatfish.js");
const MongoReflection = require(APP_PATH + "/mongoReflection/mongoReflection.js");
const SvgOptimizer = require(APP_PATH + "/svgOptimizer/svgOptimizer.js");
const NaverBlogParsing = require(APP_PATH + "/naverAPIs/naverBlogParsing.js");

const Ghost = function () {
  const Mother = require(process.cwd() + "/apps/mother.js");
  const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js");
  const GoogleSheet = require(process.cwd() + "/apps/googleAPIs/googleSheet.js");
  const ADDRESS = require(process.cwd() + "/apps/infoObj.js");
  const schedule = require('node-schedule');
  this.mother = new Mother();
  this.back = new BackMaker();
  this.sheets = new GoogleSheet();
  this.address = ADDRESS;
  this.schedule = schedule;
  this.homeliaisonServer = process.env.HOME + "/samba/drive/HomeLiaisonServer";
  this.ghost = process.cwd() + "/ghost.js";
  this.robot = process.cwd() + "/robot.js";
}

Ghost.prototype.objectToCron = function (obj = {}) {
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

Ghost.prototype.consoleQ = function (question) {
  const readline = require(`readline`);
  const rL = readline.createInterface({ input : process.stdin, output : process.stdout });
  return new Promise(function(resolve, reject) {
    rL.question(question, function (input) {
      resolve(input);
      rL.close();
    });
  });
}

Ghost.prototype.mongoToJson = async function () {
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

Ghost.prototype.ultimateReflection = async function () {
  try {
    const MongoReflection = require(`${process.cwd()}/apps/mongoReflection/mongoReflection.js`);
    const reflection = new MongoReflection();
    await reflection.ultimateReflection();

    return `ultimate reflection done`;
  } catch (e) {
    console.log(e);
  }
}

Ghost.prototype.requestObject = async function () {
  const instance = this;
  const back = this.back;
  const { shell, shellLink, fileSystem, s3FileUpload, mongo, mongoinfo, mongolocalinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  const MONGOLOCALC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
  try {
    await MONGOC.connect();
    await MONGOLOCALC.connect();

    // DEV AREA ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    let to, json;

    // to = "http://homeliaison.ddns.net:3000/shell";
    // to = "http://homeliaison.ddns.net:3000/readDir";
    // to = "http://homeliaison.ddns.net:3000/fixDir";
    to = "http://homeliaison.ddns.net:3000/mkdir";

    const motherDir = "__samba__/디자이너/신청자";
    let orders, aspirants;

    orders = [];

    aspirants = await back.getAspirantsByQuery({}, { selfMongo: MONGOLOCALC });
    for (let a of aspirants) {
      orders.push(motherDir + "/" + a.aspid + "_" + a.designer);
    }

    json = {
      target: orders,
    };

    return { json, to };
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  } catch (e) {
    console.log(e);
  } finally {
    MONGOC.close();
    MONGOLOCALC.close();
    console.log(`done`);
  }
}

Ghost.prototype.launching = async function () {
  const instance = this;
  const { fileSystem, shell, shellLink, mongo, mongoinfo, mongolocalinfo } = this.mother;
  const http = require("http");
  const express = require("express");
  const app = express();
  const bodyParser = require("body-parser");
  const useragent = require("express-useragent");
  const staticFolder = process.env.HOME + '/static';
  app.use(useragent.express());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(express.static(staticFolder));
  try {
    let message = {};
    if (process.argv[2] === "backup") {

      await this.mongoToJson();
      await this.ultimateReflection();

    } else if (process.argv[2] === "cron") {

      //backup
      message.backup = '';
      this.schedule.scheduleJob(this.objectToCron({ hours: 22, minutes: 30, seconds: 30 }), function () {
        instance.mongoToJson().then(function (m) {
          message.backup += m;
          return instance.ultimateReflection();
        }).then(function (m) {
          message.backup += "\n"
          message.backup += m;
          console.log(message);
        }).catch(function (err) {
          console.log(err);
        });
      });

    } else if (process.argv[2] === "ghost" || process.argv[2] === "request") {

      const { json, to } = this.requestObject();
      let order;

      order = '';
      order += "curl"
      order += " ";
      order += "-d";
      order += " ";
      order += "'";
      order += JSON.stringify(json);
      order += "'";
      order += " ";
      order += '-H "Content-Type: application/json" -X POST ';

      if (process.argv[3] !== undefined) {
        order += process.argv[3];
      } else {
        order += to;
      }

      const { stdout } = shell.exec(order, { silent: true });
      if (/^[\[\{]/.test(stdout.trim())) {
        console.log(JSON.parse(stdout.trim()));
      } else {
        console.log(stdout);
      }

    } else if (process.argv[2] === undefined || process.argv[2] === "server") {

      const { name, rawObj: address } = await this.mother.ipCheck();
      if (name === "unknown") {
        throw new Error("invalid address");
      }

      const dirParsing = function (dir) {
        if (/__home__/g.test(dir)) {
          dir = dir.replace(/__home__/, process.env.HOME);
        }
        if (/__samba__/g.test(dir)) {
          dir = dir.replace(/__samba__/, instance.homeliaisonServer);
        }
        return dir;
      }

      //set router
      app.post("/shell", function (req, res) {
        let order;
        res.set({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": '*',
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
          "Access-Control-Allow-Headers": '*',
        });
        if (req.body.command === undefined) {
          res.send(JSON.stringify({ error: "must be property 'command'" }));
        } else {
          const { command } = req.body;
          order = '';
          if (Array.isArray(command)) {
            for (let c of command) {
              order += c + ';';
            }
          } else {
            order = command;
          }
          shell.exec(order, { async: true });
          res.send(JSON.stringify({ message: "success" }));
        }
      });

      app.get("/backup", function (req, res) {
        res.set({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": '*',
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
          "Access-Control-Allow-Headers": '*',
        });
        instance.mongoToJson().then(function () {
          return instance.ultimateReflection();
        }).then(function () {
          console.log("backup done");
        }).catch(function (err) {
          console.log(err);
        });
        res.send(JSON.stringify({ message: "success" }));
      });

      app.post([ "/mkdir", "/rm", "/touch" ], function (req, res) {
        let command;
        let order;
        res.set({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": '*',
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
          "Access-Control-Allow-Headers": '*',
        });
        if (req.body.target === undefined) {
          res.send(JSON.stringify({ error: "must be property 'target'" }));
        } else {
          if (req.url === "/mkdir") {
            order = "mkdir";
          } else if (req.url === "/rm") {
            order = "rm -rf";
          } else if (req.url === "/touch") {
            order = "touch";
          }
          let { target } = req.body;
          command = '';
          if (Array.isArray(target)) {
            for (let d of target) {
              d = dirParsing(d);
              command += `${order} ${shellLink(d)};`;
            }
          } else {
            target = dirParsing(target);
            command = `${order} ${shellLink(target)}`;
          }
          shell.exec(command, { async: true });
          res.send(JSON.stringify({ message: "success" }));
        }
      });

      app.post("/readDir", function (req, res) {
        let command;
        res.set({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": '*',
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
          "Access-Control-Allow-Headers": '*',
        });
        if (req.body.target === undefined) {
          res.send(JSON.stringify({ error: "must be property 'target'" }));
        } else {
          let { target } = req.body;
          target = dirParsing(target);
          fileSystem(`readDir`, [ target ]).then((list) => {
            res.send(JSON.stringify(list));
          }).catch((e) => { throw new Error(e); });
        }
      });

      app.post("/robot", function (req, res) {
        let command;
        res.set({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": '*',
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
          "Access-Control-Allow-Headers": '*',
        });
        if (req.body.command === undefined) {
          res.send(JSON.stringify({ error: "must be property 'command'" }));
        } else {
          let { command } = req.body;
          const { stdout } = shell.exec("node " + instance.robot + " " + command);
          res.send(JSON.stringify({ stdout }));
        }
      });

      app.post("/fixDir", function (req, res) {
        const hangul = new ParsingHangul();
        res.set({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": '*',
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
          "Access-Control-Allow-Headers": '*',
        });
        if (req.body.target === undefined) {
          res.send(JSON.stringify({ error: "must be property 'target'" }));
        } else {
          let { target } = req.body;
          target = dirParsing(target);
          hangul.fixDirPromise(target).then(function (tree) {
            console.log("done");
            process.exit();
          }).catch(function (err) {
            console.log(err);
            process.exit();
          });
          res.send(JSON.stringify({ message: "will do" }));
        }
      })

      //server on
      http.createServer(app).listen(3000, () => {
        console.log(`\x1b[33m%s\x1b[0m`, `Server running`);
      });

    }

  } catch (e) {
    console.log(e);
  }
}

// EXE --------------------------------------------------------------------------------------

const app = new Ghost();
app.launching();
