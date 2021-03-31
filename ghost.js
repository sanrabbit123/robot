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
  this.pythonApp = process.cwd() + "/ghost.py";
  this.formidable = require('formidable');
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
  return new Promise(function (resolve, reject) {
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

Ghost.prototype.analyticsToMongo = async function () {
  try {
    const app = new GoogleAnalytics();
    await app.analyticsToMongo();

    return `analytics to mongo done`;
  } catch (e) {
    console.log(e);
  }
}

Ghost.prototype.clientReport = async function () {
  try {
    const sheets = new GoogleSheet();
    const sheetId = "14tnBRhwpvrf0h6iYTJzLaxs8UPseNYsznhdhV5kc0UM";
    const startPoint = [ 0, 0 ];
    const report = await this.back.getClientReport();
    await sheets.update_value_inPython(sheetId, "", report.getMatrix(), startPoint);
    console.log(`\x1b[33m%s\x1b[0m`, `sheets upload done`);

    return `client report done`;
  } catch (e) {
    console.log(e);
  }
}

Ghost.prototype.requestObject = async function () {
  const instance = this;
  const back = this.back;
  const { shell, shellLink, fileSystem, s3FileUpload, mongo, mongoinfo, mongolocalinfo, requestSystem } = this.mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  const MONGOLOCALC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
  try {
    await MONGOC.connect();
    await MONGOLOCALC.connect();

    // DEV AREA ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    let to, json;
    let res;

    // to = "http://homeliaison.ddns.net:3000/shell";
    to = "https://homeliaison.ddns.net:3000/readDir";
    // to = "http://homeliaison.ddns.net:3000/fixDir";
    // to = "http://homeliaison.ddns.net:3000/mkdir";

    const motherDir = "__samba__/디자이너";
    // const motherDir = "__samba__/디자이너/신청자";
    // const motherDir = "__samba__/사진_등록_포트폴리오";
    // let orders, aspirants;
    //
    // orders = [];
    //
    // aspirants = await back.getAspirantsByQuery({}, { selfMongo: MONGOLOCALC });
    // for (let a of aspirants) {
    //   orders.push(motherDir + "/" + a.aspid + "_" + a.designer);
    // }

    json = {
      target: motherDir,
    };

    // const { data } = await requestSystem(to, json, { "Content-Type": "application/json" });
    //
    // console.log(data);
    //
    // let tong, targetNames;
    //
    // targetNames = [
    //   "등록서류",
    //   "포트폴리오",
    // ];
    // tong = [];
    // for (let folderName of data) {
    //   if (folderName !== `.DS_Store`) {
    //     for (let targetName of targetNames) {
    //       tong.push(motherDir + "/" + folderName + "/" + targetName);
    //     }
    //   }
    // }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

    order += to;

    const { stdout } = shell.exec(order, { silent: true });
    if (/^[\[\{]/.test(stdout.trim())) {
      console.log(JSON.parse(stdout.trim()));
    } else {
      console.log(stdout);
    }

  } catch (e) {
    console.log(e);
  } finally {
    MONGOC.close();
    MONGOLOCALC.close();
    console.log(`done`);
  }
}

Ghost.prototype.dirParsing = function (dir) {
  const instance = this;
  if (/__home__/g.test(dir)) {
    dir = dir.replace(/__home__/, process.env.HOME);
  }
  if (/__samba__/g.test(dir)) {
    dir = dir.replace(/__samba__/, instance.homeliaisonServer);
  }
  return dir;
}

Ghost.prototype.ghostRouter = function (needs) {
  const instance = this;
  const back = this.back;
  const [ MONGOC, MONGOLOCALC ] = needs;
  const { fileSystem, requestSystem, shell, slack_bot, shellLink, todayMaker, googleSystem, mongo, mongoinfo, mongolocalinfo } = this.mother;
  let funcObj = {};

  //POST - shell
  funcObj.post_shell = {
    link: [ "/shell" ],
    func: function (req, res) {
      let order;
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      if (req.body.command === undefined) {
        console.log(req.body);
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
    }
  };

  //POST - backup
  funcObj.post_backup = {
    link: [ "/backup" ],
    func: function (req, res) {
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
    }
  };

  //POST - mkdir
  funcObj.post_mkdir = {
    link: [ "/mkdir", "/rm", "/touch" ],
    func: function (req, res) {
      let command;
      let order;
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      if (req.body.target === undefined) {
        console.log(req.body);
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
            d = instance.dirParsing(d);
            command += `${order} ${shellLink(d)};`;
          }
        } else {
          target = instance.dirParsing(target);
          command = `${order} ${shellLink(target)}`;
        }
        shell.exec(command, { async: true });
        res.send(JSON.stringify({ message: "success" }));
      }
    }
  };

  //POST - readDir
  funcObj.post_readDir = {
    link: [ "/readDir", "/ls" ],
    func: function (req, res) {
      let command;
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });

      let target;
      if (req.body.target === undefined) {
        target = "__samba__";
      } else {
        target = req.body.target;
      }
      target = instance.dirParsing(target);

      fileSystem(`readDir`, [ target ]).then((list) => {
        let list_refined = [];
        for (let i of list) {
          if (!/^\._/.test(i) && !/DS_Store/gi.test(i)) {
            list_refined.push(i);
          }
        }
        res.send(JSON.stringify(list_refined));
      }).catch((e) => { throw new Error(e); });

    }
  };

  //POST - robot
  funcObj.post_robot = {
    link: [ "/robot" ],
    func: function (req, res) {
      let command;
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      if (req.body.command === undefined) {
        console.log(req.body);
        res.send(JSON.stringify({ error: "must be property 'command'" }));
      } else {
        let { command } = req.body;
        const { stdout } = shell.exec("node " + instance.robot + " " + command);
        res.send(JSON.stringify({ stdout }));
      }
    }
  };

  //POST - fixDir
  funcObj.post_fixDir = {
    link: [ "/fixDir" ],
    func: function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });

      let target;
      if (req.body.target === undefined) {
        target = "__samba__";
      } else {
        target = req.body.target;
      }
      target = instance.dirParsing(target);

      if (req.body.await === true) {
        console.log(`waiting 10 minutes...`);
        setTimeout(function () {
          console.log(`fix start`);
          shell.exec(`node ${shellLink(process.cwd())}/robot.js fixDir ${shellLink(target)}`, { async: true }, function (err, stdout, stderr) {
            if (err) {
              console.log(err);
            } else {
              console.log(`fix done`);
            }
          });
        }, (10 * 60 * 1000));
      } else {
        shell.exec(`node ${shellLink(process.cwd())}/robot.js fixDir ${shellLink(target)}`, { async: true }, function (err, stdout, stderr) {
          if (err) {
            console.log(err);
          } else {
            console.log(`fix done`);
          }
        });
      }

      res.send(JSON.stringify({ message: "will do" }));
    }
  };

  //POST - updateSheets
  funcObj.post_updateSheets = {
    link: [ "/updateSheets" ],
    func: function (req, res) {
      const sheets = new GoogleSheet();
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });

      let id, sheetName, values, startPoint;
      if (req.body.id === undefined || req.body.values === undefined) {
        console.log(req.body);
        res.send(JSON.stringify({ error: "must be property 'id, sheetName, values, startPoint'" }));
      } else {
        id = req.body.id;
        values = req.body.values;
        sheetName = "";
        if (req.body.sheetName !== undefined) {
          sheetName = req.body.sheetName;
        }
        startPoint = [ 0, 0 ];
        if (req.body.startPoint !== undefined) {
          startPoint = req.body.startPoint;
        }
        if (req.body.clean === true || req.body.cleanView === true) {
          sheets.setting_cleanView_inPython(id).then(function (message) {
            return sheets.update_value_inPython(id, sheetName, values, startPoint);
          }).then(function (message) {
            console.log(message);
            console.log("done");
          }).catch(function (err) {
            res.send(JSON.stringify({ error: err }));
            throw new Error(err);
          });
        } else {
          sheets.update_value_inPython(id, sheetName, values, startPoint).then(function (message) {
            console.log(message);
            console.log("done");
          }).catch(function (err) {
            res.send(JSON.stringify({ error: err }));
            throw new Error(err);
          });
        }
        res.send(JSON.stringify({ message: "will do" }));
      }
    }
  };

  //POST - getSheets
  funcObj.post_getSheets = {
    link: [ "/getSheets" ],
    func: function (req, res) {
      const sheets = new GoogleSheet();
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      let id, range;
      if (req.body.id === undefined || req.body.range === undefined) {
        console.log(req.body);
        res.send(JSON.stringify({ error: "must be property 'id, range'" }));
      } else {
        id = req.body.id;
        range = req.body.range;
        sheets.get_value_inPython(id, range).then(function (result) {
          res.send(JSON.stringify(result));
        }).catch(function (err) {
          res.send(JSON.stringify({ error: err }));
          throw new Error(err);
        });
      }
    }
  };

  //end : set router
  let resultObj = { get: [], post: [] };
  for (let i in funcObj) {
    resultObj[i.split('_')[0]].push(funcObj[i]);
  }
  return resultObj;
}

Ghost.prototype.clientRouter = function (needs) {
  const instance = this;
  const back = this.back;
  const [ MONGOC, MONGOLOCALC ] = needs;
  const folderName = "고객";
  const pathNameConst = "/client_";
  const sambaDir = this.homeliaisonServer + "/" + folderName;
  const { fileSystem, requestSystem, shell, slack_bot, shellLink, todayMaker, googleSystem, mongo, mongoinfo, mongolocalinfo } = this.mother;
  let funcObj = {};

  //POST - ls
  funcObj.post_ls = {
    link: [ "/ls", "/readDir" ],
    func: function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      fileSystem(`readDir`, [ sambaDir ]).then((list) => {
        let list_refined = [];
        for (let i of list) {
          if (!/^\._/.test(i) && !/DS_Store/gi.test(i)) {
            list_refined.push(i);
          }
        }
        res.send(JSON.stringify(list_refined));
      }).catch((e) => { throw new Error(e); });
    }
  };

  //end : set router
  let resultObj = { get: [], post: [] };
  for (let i in funcObj) {
    for (let j = 0; j < funcObj[i].link.length; j++) {
      funcObj[i].link[j] = pathNameConst + funcObj[i].link[j].slice(1);
    }
    resultObj[i.split('_')[0]].push(funcObj[i]);
  }
  return resultObj;
}

Ghost.prototype.designerRouter = function (needs) {
  const instance = this;
  const back = this.back;
  const [ MONGOC, MONGOLOCALC ] = needs;
  const folderName = "디자이너";
  const pathNameConst = "/designer_";
  const standardId = "desid";
  const sambaDir = this.homeliaisonServer + "/" + folderName;
  const { fileSystem, requestSystem, shell, slack_bot, shellLink, todayMaker, googleSystem, mongo, mongoinfo, mongolocalinfo } = this.mother;
  let funcObj = {};

  //POST - ls
  funcObj.post_ls = {
    link: [ "/ls", "/readDir" ],
    func: function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      fileSystem(`readDir`, [ sambaDir ]).then((list) => {
        let list_refined = [];
        for (let i of list) {
          if (!/^\._/.test(i) && !/DS_Store/gi.test(i)) {
            list_refined.push(i);
          }
        }
        res.send(JSON.stringify(list_refined));
      }).catch((e) => { throw new Error(e); });
    }
  };

  //POST - get designer folders
  funcObj.post_folders = {
    link: [ "/folder", "/folders" ],
    func: function (req, res) {
      let target, whereQuery;
      let tempObj;
      let allList;
      let targetDIds;
      let finalList;

      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });

      if (req.body.id === undefined || req.body.id === undefined || req.body.id === "entire" || req.body.id === "all") {
        target = "entire";
        whereQuery = {};
      } else if (Array.isArray(req.body.id)) {
        target = req.body.id;
        whereQuery = { "$or": [] };
        for (let id of target) {
          tempObj = {};
          tempObj[standardId] = id;
          whereQuery["$or"].push(tempObj);
        }
      } else {
        target = req.body.id;
        whereQuery = {};
        whereQuery[standardId] = target;
      }

      allList = [];
      targetDIds = [];
      finalList = [];

      fileSystem(`readDir`, [ sambaDir ]).then((list) => {
        allList = [];
        for (let i of list) {
          if (!/^\._/.test(i) && !/DS_Store/gi.test(i)) {
            allList.push(i);
          }
        }
        return back.getDesignersByQuery(whereQuery, { selfMongo: MONGOC });
      }).then((designers) => {
        for (let d of designers) {
          targetDIds.push(d.information.did);
        }
        for (let i of allList) {
          if (targetDIds.includes(i.split("_")[0].trim())) {
            finalList.push(i);
          }
        }
        res.send(JSON.stringify(finalList));
      }).catch((e) => { throw new Error(e); });

    }
  };

  //POST - create new designer folder
  funcObj.post_createFolder = {
    link: [ "/create", "/createFolder" ],
    func: function (req, res) {
      let id, subid;
      let folderName;
      let basicList = [
        "포트폴리오",
        "등록서류",
        "고객안내및제안문서"
      ];
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      if (req.body.name !== undefined && req.body.subid !== undefined) {
        folderName = req.body.subid + "_" + req.body.name;
        shell.exec(`mkdir ${shellLink(sambaDir)}/${folderName}`, { async: true }, function (err, stdout, stderr) {
          if (err) {
            console.log(err);
          } else {
            for (let b of basicList) {
              shell.exec(`mkdir ${shellLink(sambaDir)}/${folderName}/${b}`);
            }
          }
        });
        res.send(JSON.stringify({ folderName: folderName }));
      } else {
        res.send(JSON.stringify({ error: "must be property 'name' and 'subid'" }));
      }
    }
  };

  //end : set router
  let resultObj = { get: [], post: [] };
  for (let i in funcObj) {
    for (let j = 0; j < funcObj[i].link.length; j++) {
      funcObj[i].link[j] = pathNameConst + funcObj[i].link[j].slice(1);
    }
    resultObj[i.split('_')[0]].push(funcObj[i]);
  }
  return resultObj;
}

Ghost.prototype.photoRouter = function (needs) {
  const instance = this;
  const back = this.back;
  const [ MONGOC, MONGOLOCALC ] = needs;
  const folderName = "사진_등록_포트폴리오";
  const pathNameConst = "/photo_";
  const sambaDir = this.homeliaisonServer + "/" + folderName;
  const { fileSystem, requestSystem, shell, slack_bot, shellLink, todayMaker, googleSystem, mongo, mongoinfo, mongolocalinfo } = this.mother;
  let funcObj = {};

  //POST - ls
  funcObj.post_ls = {
    link: [ "/ls", "/readDir" ],
    func: function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      fileSystem(`readDir`, [ sambaDir ]).then((list) => {
        let list_refined = [];
        for (let i of list) {
          if (!/^\._/.test(i) && !/DS_Store/gi.test(i)) {
            list_refined.push(i);
          }
        }
        res.send(JSON.stringify(list_refined));
      }).catch((e) => { throw new Error(e); });
    }
  };

  //end : set router
  let resultObj = { get: [], post: [] };
  for (let i in funcObj) {
    for (let j = 0; j < funcObj[i].link.length; j++) {
      funcObj[i].link[j] = pathNameConst + funcObj[i].link[j].slice(1);
    }
    resultObj[i.split('_')[0]].push(funcObj[i]);
  }
  return resultObj;
}

Ghost.prototype.photorawRouter = function (needs) {
  const instance = this;
  const back = this.back;
  const [ MONGOC, MONGOLOCALC ] = needs;
  const folderName = "사진_미등록_포트폴리오";
  const pathNameConst = "/photoraw_";
  const sambaDir = this.homeliaisonServer + "/" + folderName;
  const { fileSystem, requestSystem, shell, slack_bot, shellLink, todayMaker, googleSystem, mongo, mongoinfo, mongolocalinfo } = this.mother;
  let funcObj = {};

  //POST - read directory
  funcObj.post_ls = {
    link: [ "/ls", "/readDir" ],
    func: function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      fileSystem(`readDir`, [ sambaDir ]).then((list) => {
        let list_refined = [];
        for (let i of list) {
          if (!/^\._/.test(i) && !/DS_Store/gi.test(i)) {
            list_refined.push(i);
          }
        }
        res.send(JSON.stringify(list_refined));
      }).catch((e) => { throw new Error(e); });
    }
  };

  //end : set router
  let resultObj = { get: [], post: [] };
  for (let i in funcObj) {
    for (let j = 0; j < funcObj[i].link.length; j++) {
      funcObj[i].link[j] = pathNameConst + funcObj[i].link[j].slice(1);
    }
    resultObj[i.split('_')[0]].push(funcObj[i]);
  }
  return resultObj;
}

Ghost.prototype.fileRouter = function (static) {
  const instance = this;
  const back = this.back;
  const staticDir = static;
  const { fileSystem, requestSystem, shell, slack_bot, shellLink, todayMaker, googleSystem, mongo, mongoinfo, mongolocalinfo, cryptoString, decryptoHash } = this.mother;
  let funcObj = {};
  const ghostWall = function (callback) {
    let ipTong;
    ipTong = [ 127001, 172301254 ];
    for (let info in instance.address) {
      if (instance.address[info].ip.outer.length > 0) {
        ipTong.push(Number(instance.address[info].ip.outer.replace(/[^0-9]/g, '')));
      }
      if (instance.address[info].ip.inner.length > 0) {
        ipTong.push(Number(instance.address[info].ip.inner.replace(/[^0-9]/g, '')));
      }
    }
    ipTong = Array.from(new Set(ipTong));
    return function (req, res) {
      const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      if (!ipTong.includes(Number(ip.trim().replace(/[^0-9]/g, ''))) || req.body.hash === undefined) {
        res.set("Content-Type", "text/html");
        res.send(`<html><head><title>알 수 없는 접근</title></head><body><script></script></body></html>`);
      } else {
        decryptoHash("homeliaison", req.body.hash).then(function (string) {
          if (string === instance.address.s3info.boto3.key) {
            if (req.body.uragenGhostFinalRandomAccessKeyArraySubwayHomeLiaisonStyle === "a19OyoZjf9xQJXykapple3kE5ySgBW39IjxQJXyk3homeliaisonkE5uf9uuuySgBW3ULXHF1CdjxGGPCQJsubwayXyk3kE5ySgBW3f9y2Y2lotionpuk0dQF9ruhcs") {
              callback(req, res);
            } else {
              res.set("Content-Type", "text/html");
              res.send(`<html><head><title>알 수 없는 접근</title></head><body><script></script></body></html>`);
            }
          } else {
            res.set("Content-Type", "text/html");
            res.send(`<html><head><title>알 수 없는 접근</title></head><body><script></script></body></html>`);
          }
        }).catch(function (err) {
          res.set("Content-Type", "text/html");
          res.send(`<html><head><title>알 수 없는 접근</title></head><body><script></script></body></html>`);
        });
      }
    }
  }

  //GET - test
  funcObj.get_test = {
    link: [ "/" ],
    func: function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      console.log("test");
      res.send(JSON.stringify({ message: "done" }));
    }
  };

  //POST - file upload
  funcObj.post_file = {
    link: [ "/file", "/upload" ],
    func: function (req, res) {
      const form = instance.formidable({ multiples: true });
      form.parse(req, function (err, fields, files) {
        if (err) {
          throw new Error(err);
          return;
        } else {
          res.set({
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": '*',
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
            "Access-Control-Allow-Headers": '*',
          });

          console.log(fields, files);

          res.json({ fields, files });
        }
      });
    }
  };

  //POST - shell
  funcObj.post_shell = {
    link: [ "/shell" ],
    func: function (req, res) {
      let order;
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      if (req.body.command === undefined) {
        console.log(req.body);
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
    }
  };

  //end : set router
  let resultObj = { get: [], post: [] };
  for (let i in funcObj) {
    funcObj[i].func = ghostWall(funcObj[i].func);
    resultObj[i.split('_')[0]].push(funcObj[i]);
  }
  return resultObj;
}

Ghost.prototype.serverLaunching = async function () {
  const instance = this;
  const { fileSystem, shell, shellLink, mongo, mongoinfo, mongolocalinfo } = this.mother;
  const https = require("https");
  const express = require("express");
  const app = express();
  const bodyParser = require("body-parser");
  const multer = require("multer");
  const multiForms = multer();
  const useragent = require("express-useragent");
  const staticFolder = process.env.HOME + '/static';

  app.use(useragent.express());
  app.use(bodyParser.json());
  app.use(multiForms.array());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static(staticFolder));

  try {
    let message = '';

    //set address info
    const { name, rawObj: address } = await this.mother.ipCheck();
    let isGhost = (address.isGhost === true);
    if (name === "unknown") {
      throw new Error("invalid address");
    }
    console.log(``);
    console.log(`\x1b[36m\x1b[1m%s\x1b[0m`, `launching ghost in ${name.replace(/info/i, '')} ${isGhost ? "(ghost) " : ""}==============`);
    console.log(``);

    //set mongo connetion
    const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
    const MONGOLOCALC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
    console.log(`\x1b[33m%s\x1b[0m`, `set DB server => ${this.address.mongoinfo.host}`);

    await MONGOC.connect();
    await MONGOLOCALC.connect();

    //set pem key
    let pems = {};
    let pemsLink = process.cwd() + "/pems/" + address.host;
    let certDir, keyDir, caDir;
    let routerObj;
    let routerTargets = [
      "client",
      "designer",
      "photo",
      "photoraw"
    ];

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

    //set router
    const { get, post } = this.ghostRouter([ MONGOC, MONGOLOCALC ]);
    for (let obj of get) {
      app.get(obj.link, obj.func);
    }
    for (let obj of post) {
      app.post(obj.link, obj.func);
    }

    //set sub routers
    for (let r of routerTargets) {
      routerObj = (this[r + "Router"])([ MONGOC, MONGOLOCALC ]);
      for (let obj of routerObj.get) {
        app.get(obj.link, obj.func);
      }
      for (let obj of routerObj.post) {
        app.post(obj.link, obj.func);
      }
    }

    //launching python cron
    shell.exec(`python3 ${shellLink(this.pythonApp)} cron`, { async: true });
    console.log(`\x1b[33m%s\x1b[0m`, `Cron running`);

    //server on
    https.createServer(pems, app).listen(3000, address.ip.inner, () => {
      console.log(`\x1b[33m%s\x1b[0m`, `Server running`);
    });

  } catch (e) {
    console.log(e);
  }
}

Ghost.prototype.fileLaunching = async function () {
  const instance = this;
  const { fileSystem, shell, shellLink, mongo, mongoinfo, mongolocalinfo } = this.mother;
  const https = require("https");
  const express = require("express");
  const bodyParser = require("body-parser");
  const useragent = require("express-useragent");

  const app = express();
  app.use(useragent.express());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  try {
    let message = '';

    //set address info
    const { name, rawObj: address } = await this.mother.ipCheck();
    let isGhost = (address.isGhost === true);
    if (name === "unknown") {
      throw new Error("invalid address");
    }

    if (isGhost) {

      console.log(``);
      console.log(`\x1b[36m\x1b[1m%s\x1b[0m`, `launching file ghost in ${name.replace(/info/i, '')} ${isGhost ? "(ghost) " : ""}==============`);
      console.log(``);

      //set pem key
      let pems = {};
      let pemsLink = process.cwd() + "/pems/" + address.host;
      let certDir, keyDir, caDir;
      let routerObj;
      let routerTargets = [
        "client",
        "designer",
        "photo",
        "photoraw"
      ];

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

      //set router
      const { get, post } = this.fileRouter(address.file.static);
      for (let obj of get) {
        app.get(obj.link, obj.func);
      }
      for (let obj of post) {
        app.post(obj.link, obj.func);
      }

      //server on
      https.createServer(pems, app).listen(address.file.port, address.ip.inner, () => {
        console.log(`\x1b[33m%s\x1b[0m`, `Server running in ${String(address.file.port)}`);
      });

    } else {
      console.log(`file server can work in ghost`);
    }
  } catch (e) {
    console.log(e);
  }
}

// EXE --------------------------------------------------------------------------------------

const app = new Ghost();
if (process.argv[2] === "request") {
  app.requestObject();
} else if (process.argv[2] === undefined || /server/gi.test(process.argv[2]) || /ghost/gi.test(process.argv[2])) {
  app.serverLaunching();
} else if (/file/gi.test(process.argv[2]) || /ftp/gi.test(process.argv[2])) {
  app.fileLaunching();
}
