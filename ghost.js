const Ghost = function () {
  const Mother = require(process.cwd() + "/apps/mother.js");
  const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js");
  const GoogleSheet = require(process.cwd() + "/apps/googleAPIs/googleSheet.js");
  const GoogleDrive = require(process.cwd() + "/apps/googleAPIs/googleDrive.js");
  const ADDRESS = require(process.cwd() + "/apps/infoObj.js");
  this.mother = new Mother();
  this.back = new BackMaker();
  this.sheets = new GoogleSheet();
  this.drive = new GoogleDrive();
  this.address = ADDRESS;
  this.homeliaisonServer = this.address.officeinfo.ghost.file.static + "/" + this.address.officeinfo.ghost.file.office;
  this.alien = process.cwd() + "/alien.js";
  this.ghost = process.cwd() + "/ghost.js";
  this.robot = process.cwd() + "/robot.js";
  this.formidable = require('formidable');
}

Ghost.prototype.setTimer = function (callback, timeObj) {
  if (typeof timeObj !== "object" || typeof callback !== "function") {
    throw new Error("arguments must be Object: timeObj, Function: callback");
  }
  const instance = this;
  const { shell, shellLink, dateToString } = this.mother;
  const nowDate = new Date();
  let targetDate;
  let result, time;
  let timeoutObj;
  let logName;

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

  logName = ".__timerCallback_waiting___at_" + dateToString(targetDate, true).replace(/ /gi, '_').replace(/\-/gi, '_').replace(/\:/gi, '_') + "__Dont_git_pull_yet___please__";
  shell.exec(`touch ${shellLink(process.cwd())}/${logName}`);
  result = targetDate.valueOf() - nowDate.valueOf();
  if (result < 0) {
    time = 0;
  } else {
    time = result;
  }

  return new Promise(function (resolve, reject) {
    timeoutObj = setTimeout(function () {
      callback();
      shell.exec(`rm -rf ${shellLink(process.cwd())}/${logName}`);
      resolve(time);
      clearTimeout(timeoutObj);
      timeoutObj = null;
    }, time);
  });
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
    const GoogleAnalytics = require(process.cwd() + "/apps/googleAPIs/googleAnalytics.js");
    const app = new GoogleAnalytics();
    await app.analyticsToMongo();

    return `analytics to mongo done`;
  } catch (e) {
    console.log(e);
  }
}

Ghost.prototype.clientReport = async function () {
  try {
    const sheets = this.sheets;
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
  const { shell, shellLink, fileSystem, s3FileUpload, ghostFileUpload, mongo, mongoinfo, mongolocalinfo, requestSystem } = this.mother;
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
  const { fileSystem, headRequest, requestSystem, shell, slack_bot, shellLink, todayMaker, googleSystem, mongo, mongoinfo, mongolocalinfo, sleep } = this.mother;
  let funcObj = {};

  //GET - ssl test
  funcObj.get_ssl = {
    link: [ "/ssl" ],
    func: function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      res.send(JSON.stringify({ message: "hello?" }));
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

  //POST - pwd
  funcObj.post_pwd = {
    link: [ "/pwd" ],
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
        target = "__samba__" + "/" + req.body.target;
      }
      target = instance.dirParsing(target);
      res.send(JSON.stringify({ absolute: target }));
    }
  };

  //POST - robot
  funcObj.post_robot = {
    link: [ "/robot" ],
    func: function (req, res) {
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
        if (Array.isArray(command)) {
          command = command.join(" ");
        }
        if (req.body.await === true) {
          const { stdout } = shell.exec(`node ${shellLink(instance.robot)} ${command}`);
          res.send(JSON.stringify({ stdout }));
        } else {
          shell.exec(`node ${shellLink(instance.robot)} ${command}`, { async: true }, function (err, stdout, stderr) {
            if (err) {
              console.log(err);
            } else {
              console.log(stdout);
            }
          });
          res.send(JSON.stringify({ message: "will do" }));
        }
      }
    }
  };

  //POST - robot will do
  funcObj.post_robotWillDo = {
    link: [ "/robotWill", "/robotWillDo", "/robotTimer", "/timer" ],
    func: function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      if (req.body.command === undefined || req.body.time === undefined || typeof req.body.time !== "object") {
        console.log(req.body);
        res.send(JSON.stringify({ error: "must be property 'String or Array: command, Object: time'" }));
      } else {
        let { command, time } = req.body;
        if (Array.isArray(command)) {
          command = command.join(" ");
        }
        instance.setTimer(function () {
          shell.exec(`node ${shellLink(instance.robot)} ${command}`, { async: true }, function (err, stdout, stderr) {
            if (err) {
              console.log(err);
            } else {
              console.log(stdout);
            }
          });
        }, time);
        res.send(JSON.stringify({ message: "will do" }));
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
      const sheets = instance.sheets;
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
      const sheets = instance.sheets;
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

  //POST - createSheets
  funcObj.post_sendSheets = {
    link: [ "/sendSheets" ],
    func: function (req, res) {
      const sheets = instance.sheets;
      const drive = instance.drive;
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });

      if (req.body.sheetName === undefined || req.body.parentId === undefined || req.body.values === undefined) {
        console.log(req.body);
        res.send(JSON.stringify({ error: "must be property 'sheetName, parentId, values'" }));
      } else {
        let tapName, values, sheetsId, sheetsTargets, tempArr;
        if (req.body.multiple === undefined) {
          sheetsId = null;
          tapName = (req.body.tapName !== undefined) ? req.body.tapName : 'default';
          values = JSON.parse(req.body.values);
          sheets.create_newSheets_inPython(req.body.sheetName, req.body.parentId).then((id) => {
            sheetsId = id;
            return sheets.update_defaultSheetName_inPython(sheetsId, tapName);
          }).then(() => {
            return sheets.update_value_inPython(sheetsId, tapName, values, [ 0, 0 ]);
          }).then(() => {
            return sheets.setting_cleanView_inPython(sheetsId);
          }).then(() => {
            return drive.read_webView_inPython(sheetsId);
          }).then((link) => {
            return instance.mother.slack_bot.chat.postMessage({ text: req.body.sheetName + " => " + link, channel: (req.body.channel === undefined) ? "#general" : req.body.channel });
          }).catch((err) => {
            console.log(err);
          });
        } else {
          sheetsTargets = JSON.parse(req.body.values);
          if (!Array.isArray(sheetsTargets)) {
            console.log(req.body);
            res.send(JSON.stringify({ error: "multiple value must be [ { sheets, matrix }... ]" }));
            return false;
          }
          if (sheetsTargets.length === 0) {
            console.log(req.body);
            res.send(JSON.stringify({ error: "multiple value must be [ { sheets, matrix }... ]" }));
            return false;
          }
          tempArr = [];
          sheets.create_newSheets_inPython(req.body.sheetName, req.body.parentId).then((id) => {
            sheetsId = id;
            for (let i = 0; i < sheetsTargets.length; i++) {
              if (typeof sheetsTargets[i] !== "object") {
                console.log(req.body);
                res.send(JSON.stringify({ error: "multiple value must be [ { sheets, matrix }... ]" }));
                throw new Error("multiple value must be [ { sheets, matrix }... ]");
              }
              if (sheetsTargets[i].sheets === undefined || sheetsTargets[i].matrix === undefined) {
                console.log(req.body);
                res.send(JSON.stringify({ error: "multiple value must be [ { sheets, matrix }... ]" }));
                throw new Error("multiple value must be [ { sheets, matrix }... ]");
              }
              if (i !== 0) {
                tempArr.push(sheetsTargets[i].sheets);
              }
            }
            return sheets.update_defaultSheetName_inPython(sheetsId, sheetsTargets[0].sheets);
          }).then(() => {
            return sheets.add_newSheet_inPython(sheetsId, tempArr);
          }).then(() => {
            return sheets.update_values_inPython(sheetsId, sheetsTargets, [ 0, 0 ]);
          }).then((arr) => {
            return sheets.setting_cleanView_inPython(sheetsId);
          }).then(() => {
            return drive.read_webView_inPython(sheetsId);
          }).then((link) => {
            return instance.mother.slack_bot.chat.postMessage({ text: req.body.sheetName + " => " + link, channel: (req.body.channel === undefined) ? "#general" : req.body.channel });
          }).catch((err) => {
            console.log(err);
          });
        }
        res.send(JSON.stringify({ message: "will do" }));
      }
    }
  };

  //POST - printer
  funcObj.post_printer = {
    link: [ "/printer", "/print" ],
    func: function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      let target;
      target = "http://" + instance.address.officeinfo.ghost.host + ":" + String(instance.address.officeinfo.ghost.graphic.port[0]);
      headRequest(target + "/confirm").then(async (response) => {
        const { statusCode } = response;
        let raw, res, doing;
        if (statusCode === 200) {
          raw = await requestSystem(target + "/confirm");
          if (raw.data.doing !== undefined) {
            await sleep(1000);
            doing = raw.data.doing;
            while (doing === 1) {
              console.log("waiting...");
              await sleep(1000);
              raw = await requestSystem(target + "/confirm");
              if (raw.data.doing !== undefined) {
                doing = raw.data.doing;
              } else {
                doing = 2;
              }
            }
            if (doing === 0) {
              res = await requestSystem(target + "/print");
              await slack_bot.chat.postMessage({ text: "프린트 출력을 완료하였습니다!", channel: "#401_consulting" });
              console.log("print", res.data);
            }
          }
        }
      }).catch((err) => {
        console.log(err);
      });
      res.send(JSON.stringify({ message: "will do" }));
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
  const { fileSystem, requestSystem, shell, slack_bot, shellLink, todayMaker, googleSystem, mongo, mongoinfo, mongolocalinfo, sleep } = this.mother;
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
    func: async function (req, res) {
      try {
        const GoogleSheet = require(process.cwd() + "/apps/googleAPIs/googleSheet.js");
        const GoogleDrive = require(process.cwd() + "/apps/googleAPIs/googleDrive.js");
        const GoogleDocs = require(process.cwd() + "/apps/googleAPIs/googleDocs.js");
        const drive = new GoogleDrive();
        const sheets = new GoogleSheet();
        const docs = new GoogleDocs();
        let id, subid;
        let folderName;
        let folderId, docsId, sheetsId;
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
          if (!(await fileSystem(`exist`, [ `${sambaDir}/${folderName}` ]))) {
            await fileSystem(`mkdir`, [ `${sambaDir}/${folderName}` ]);
          }
          for (let b of basicList) {
            if (!(await fileSystem(`exist`, [ `${sambaDir}/${folderName}/${b}` ]))) {
              await fileSystem(`mkdir`, [ `${sambaDir}/${folderName}/${b}` ]);
            }
          }

          do {
            await sleep(2000);
            folderId = await drive.searchId_inPython(folderName);
          } while (folderId === null);

          docsId = await docs.create_newDocs_inPython(folderName + '_' + "docs", folderId);
          sheetsId = await sheets.create_newSheets_inPython(folderName + '_' + "sheets", folderId);

          res.send(JSON.stringify({
            folderName: folderName,
            forder: `https://drive.google.com/drive/folders/${folderId}`,
            docs: `https://docs.google.com/document/d/${docsId}`,
            sheets: `https://docs.google.com/spreadsheets/d/${sheetsId}`,
          }));

        } else {
          res.send(JSON.stringify({ error: "must be property 'name' and 'subid'" }));
        }

      } catch (e) {
        console.log(e);
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
  const drive = this.drive;
  const [ MONGOC, MONGOLOCALC ] = needs;
  const folderName = "사진_등록_포트폴리오";
  const pathNameConst = "/photo_";
  const sambaDir = this.homeliaisonServer + "/" + folderName;
  const { fileSystem, requestSystem, shell, slack_bot, shellLink, todayMaker, googleSystem, mongo, mongoinfo, mongolocalinfo, dateToString, sleep } = this.mother;
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
      let target;
      if (req.body.target === undefined) {
        target = sambaDir;
      } else {
        target = sambaDir + "/" + req.body.target;
      }
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

  //POST - pwd
  funcObj.post_pwd = {
    link: [ "/pwd" ],
    func: function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      let target;
      if (req.body.target === undefined) {
        target = sambaDir;
      } else {
        target = sambaDir + "/" + req.body.target;
      }
      res.send(JSON.stringify({ absolute: target }));
    }
  };

  //POST - zip
  funcObj.post_zip = {
    link: [ "/zip" ],
    func: async function (req, res) {
      try {
        res.set({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": '*',
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
          "Access-Control-Allow-Headers": '*',
        });
        if (req.body.pid === undefined) {
          res.send(JSON.stringify({ message: "invaild body : must be 'pid'" }));
        } else {

          const { pid } = req.body;
          const c780 = "780";
          const list = await fileSystem(`readDir`, [ sambaDir ]);
          let list_refined = [];
          let folderName;
          let shareName;
          let tempArr;
          let command;
          let zipId;
          let zipLink;

          for (let i of list) {
            if (!/^\./.test(i) && !/DS_Store/gi.test(i)) {
              list_refined.push(i);
            }
          }
          folderName = list_refined.find((i) => { return (new RegExp('^' + pid)).test(i); });
          tempArr = folderName.split('_');
          shareName = "HL_";
          if (tempArr.length === 4) {
            shareName += tempArr[2] + "_고객님_";
            shareName += tempArr[1] + "_디자이너님";
          } else if (tempArr.length === 3) {
            shareName += tempArr[1] + "_디자이너님";
          } else {
            throw new Error("invaild post");
          }
          shareName += '_' + dateToString(new Date()).slice(2).replace(/\-/gi, '') + ".zip";

          command = `cd ${shellLink(sambaDir + "/" + folderName + "/" + c780)};zip ${shellLink(instance.address.officeinfo.ghost.file.static + "/" + instance.address.officeinfo.ghost.file.share + "/" + shareName)} ./*`;
          shell.exec(command);

          zipId = await drive.searchId_inPython(shareName);
          while (zipId === null) {
            await sleep(1000);
            zipId = await drive.searchId_inPython(shareName);
          }

          zipLink = await drive.read_webView_inPython(zipId);
          res.send(JSON.stringify({ link: zipLink }));
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  //POST - mkdir
  funcObj.post_mkdir = {
    link: [ "/mkdir", "/create", "/createDir" ],
    func: async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      try {
        if (req.body.name === undefined) {
          res.send(JSON.stringify({ message: "invaild body : must be 'name'" }));
        } else {

          let tempFolder;
          let folderList;
          let name;

          name = req.body.name.trim().replace(/^\//, '');

          tempFolder = `newFolder_${String((new Date()).valueOf())}`;

          if (await fileSystem(`exist`, [ `${sambaDir}/${tempFolder}` ])) {
            shell.exec(`rm -rf ${shellLink(sambaDir + '/' + tempFolder)};`);
          }
          await fileSystem(`mkdir`, [ `${sambaDir}/${tempFolder}` ]);
          await fileSystem(`mkdir`, [ `${sambaDir}/${tempFolder}/${name}` ]);

          shell.exec(`node ${shellLink(process.cwd() + '/' + "robot.js")} fixDir ${shellLink(sambaDir + '/' + tempFolder)};`);

          folderList = await fileSystem(`readDir`, [ `${sambaDir}/${tempFolder}` ]);
          folderList = folderList.filter((f) => { return f !== `.DS_Store` });

          if (folderList.length === 0) {
            throw new Error("error");
          }

          shell.exec(`mv ${shellLink(sambaDir + '/' + tempFolder + '/' + folderList[0])} ${shellLink(sambaDir + '/' + folderList[0])};`);
          shell.exec(`rm -rf ${shellLink(sambaDir + '/' + tempFolder)};`);

          res.send(JSON.stringify({ message: "make folder : " + (sambaDir + '/' + folderList[0]) }));
        }
      } catch (e) {
        console.log(e);
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
        target = sambaDir;
      } else {
        target = sambaDir + "/" + req.body.target;
      }

      if (req.body.await === true) {
        console.log(`waiting 1 minutes...`);
        setTimeout(function () {
          console.log(`fix start`);
          shell.exec(`node ${shellLink(process.cwd())}/robot.js fixDir ${shellLink(target)}`, { async: true }, function (err, stdout, stderr) {
            if (err) {
              console.log(err);
            } else {
              console.log(`fix done`);
            }
          });
        }, (60 * 1000));
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

Ghost.prototype.investRouter = function (needs) {
  const instance = this;
  const back = this.back;
  const [ MONGOC, MONGOLOCALC ] = needs;
  const folderName = "IR";
  const pathNameConst = "/invest_";
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

  //POST - index
  funcObj.post_index = {
    link: [ "/index/:id" ],
    func: function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      fileSystem(`readDir`, [ sambaDir ]).then((list) => {
        let list_refined;
        list_refined = list.filter((name) => { return (!/^\._/.test(name) && !/DS_Store/gi.test(name)); });
        list_refined.sort((a, b) => { return Number(a) - Number(b); });
        if (Number.isNaN(Number(req.params.id.replace(/[^0-9]/g, '')))) {
          throw new Error("invaild parameter");
        }
        return fileSystem(`readDir`, [ `${sambaDir}/${list_refined[Number(req.params.id.replace(/[^0-9]/g, ''))]}` ]);
      }).then((list) => {
        let list_refined;
        list_refined = list.filter((name) => { return (!/^\._/.test(name) && !/DS_Store/gi.test(name)); });
        list_refined.sort((a, b) => { return Number(a) - Number(b); });
        res.send(JSON.stringify(list_refined));
      }).catch((e) => { throw new Error(e); });
    }
  }

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
  const address = this.address;
  const staticDir = static;
  const { fileSystem, requestSystem, shell, slack_bot, shellLink, todayMaker, googleSystem, mongo, mongoinfo, mongolocalinfo, cryptoString, decryptoHash, treeParsing } = this.mother;
  let funcObj = {};
  const ghostWall = function (callback, binary = false) {
    const banCode = "<html><head><title>error</title></head><body><script>window.close();</script></body></html>"
    let property, ipTong;
    if (binary) {
      property = "query";
    } else {
      property = "body";
    }
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
      if (!ipTong.includes(Number(ip.trim().replace(/[^0-9]/g, ''))) && req[property].hash === undefined) {
        res.set("Content-Type", "text/html");
        res.send(banCode);
      } else {
        decryptoHash("homeliaison", req[property].hash).then(function (string) {
          if (string === instance.address.s3info.boto3.key) {
            if (req[property].uragenGhostFinalRandomAccessKeyArraySubwayHomeLiaisonStyle === "a19OyoZjf9xQJXykapple3kE5ySgBW39IjxQJXyk3homeliaisonkE5uf9uuuySgBW3ULXHF1CdjxGGPCQJsubwayXyk3kE5ySgBW3f9y2Y2lotionpuk0dQF9ruhcs") {
              callback(req, res);
            } else {
              res.set("Content-Type", "text/html");
              res.send(banCode);
            }
          } else {
            res.set("Content-Type", "text/html");
            res.send(banCode);
          }
        }).catch(function (err) {
          res.set("Content-Type", "text/html");
          res.send(banCode);
        });
      }
    }
  }

  //POST - file upload
  funcObj.post_file = {
    binary: true,
    link: [ "/file", "/upload" ],
    func: function (req, res) {
      const form = instance.formidable({ multiples: true, encoding: "utf-8", maxFileSize: (10000 * 1024 * 1024) });
      form.parse(req, async function (err, fields, files) {
        try {
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

            const staticFolder = instance.address.homeinfo.ghost.file.static;
            const toArr = JSON.parse(fields.toArr);
            let staticFolderDir;
            let filesKey, fromArr, num;
            let tempArr, tempString, tempDir;

            filesKey = Object.keys(files);
            filesKey.sort((a, b) => {
              return Number(a.replace(/[^0-9]/gi, '')) - Number(b.replace(/[^0-9]/gi, ''));
            });

            fromArr = [];
            for (let key of filesKey) {
              fromArr.push(files[key]);
            }

            staticFolderDir = await fileSystem(`readDir`, [ staticFolder ]);
            num = 0;
            for (let { path } of fromArr) {
              tempArr = toArr[num].split("/");
              tempString = staticFolder;
              if (tempArr.length === 0) {
                throw new Error("invaild to array");
              }
              for (let i = 0; i < tempArr.length - 1; i++) {
                tempDir = await fileSystem(`readDir`, [ tempString ]);
                if (!tempDir.includes(tempArr[i])) {
                  shell.exec(`mkdir ${shellLink(tempString + "/" + tempArr[i])}`);
                }
                tempString += '/';
                tempString += tempArr[i];
              }
              shell.exec(`mv ${shellLink(path)} ${shellLink(staticFolder + "/" + toArr[num])}`);
              num++;
            }

            res.json({ "message": "done" });
          }
        } catch (e) {
          console.log(e);
        }
      });
    }
  };

  //POST - mkdir
  funcObj.post_mkdir = {
    binary: false,
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

  //POST - list
  funcObj.post_list = {
    binary: false,
    link: [ "/list" ],
    func: function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      let target;
      if (typeof req.body.target !== "string") {
        res.send(JSON.stringify({ message: "error" }));
      } else {
        target = req.body.target;
        if (/\/$/.test(target)) {
          target = target.slice(0, -1);
        }
        if (/^\//.test(target)) {
          target = target.slice(1);
        }
        target = address.homeinfo.ghost.file.static + "/" + target;
        treeParsing(target, true, (i) => {
          return i.slice(address.homeinfo.ghost.file.static.length);
        }).then((arr) => {
          res.send(JSON.stringify(arr));
        }).catch((err) => {
          res.send(JSON.stringify({ message: "error" }));
        });
      }
    }
  };

  //POST - readDir
  funcObj.post_readDir = {
    binary: false,
    link: [ "/readDir", "/ls" ],
    func: function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });

      let target;
      if (req.body.target === undefined) {
        target = instance.address.homeinfo.ghost.file.static;
      } else {
        target = req.body.target;
      }

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

  //POST - robot do
  funcObj.post_robotDo = {
    binary: false,
    link: [ "/robot" ],
    func: function (req, res) {
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
        if (Array.isArray(command)) {
          command = command.join(" ");
        }
        if (req.body.await === true) {
          const { stdout } = shell.exec(`node ${shellLink(instance.robot)} ${command}`);
          res.send(JSON.stringify({ stdout }));
        } else {
          shell.exec(`node ${shellLink(instance.robot)} ${command}`, { async: true }, function (err, stdout, stderr) {
            if (err) {
              console.log(err);
            } else {
              console.log(stdout);
            }
          });
          res.send(JSON.stringify({ message: "will do" }));
        }
      }
    }
  }

  //POST - robot will do
  funcObj.post_robotWillDo = {
    binary: false,
    link: [ "/robotWill", "/robotWillDo", "/robotTimer", "/timer" ],
    func: function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      if (req.body.command === undefined || req.body.time === undefined || typeof req.body.time !== "object") {
        console.log(req.body);
        res.send(JSON.stringify({ error: "must be property 'String or Array: command, Object: time'" }));
      } else {
        let { command, time } = req.body;
        if (Array.isArray(command)) {
          command = command.join(" ");
        }
        instance.setTimer(function () {
          shell.exec(`node ${shellLink(instance.robot)} ${command}`, { async: true }, function (err, stdout, stderr) {
            if (err) {
              console.log(err);
            } else {
              console.log(stdout);
            }
          });
        }, time);
        res.send(JSON.stringify({ message: "will do" }));
      }
    }
  }

  //end : set router
  let resultObj = { get: [], post: [] };
  for (let i in funcObj) {
    funcObj[i].func = ghostWall(funcObj[i].func, funcObj[i].binary);
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
  const WebSocket = require("ws");
  const url = require("url");

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

    await this.back.setInfoObj({ getMode: false });

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
    let server;
    let sockets;
    let routerTargets = [
      "client",
      "designer",
      "photo",
    ];
    let wssTargets = [
      "client",
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

    server = https.createServer(pems, app);

    sockets = [];
    for (let i = 0; i < wssTargets.length; i++) {
      sockets.push(new WebSocket.Server({ noServer: true }));
    }

    for (let wss of sockets) {
      wss.on("connection", function (ws) {
        ws.on("message", (message) => {
          const clients = wss.clients;
          for (let c of clients) {
            if (c.readyState === WebSocket.OPEN && ws !== c) {
              c.send(message);
            }
          }
        });
      });
    }

    server.on("upgrade", function (request, socket, head) {
      const { pathname } = url.parse(request.url);
      let urlTargets, number;
      urlTargets = wssTargets.map((i) => { return new RegExp(i, "gi"); });
      number = null;
      for (let i = 0; i < urlTargets.length; i++) {
        if (urlTargets[i].test(pathname)) {
          number = i;
          break;
        }
      }
      if (number !== null) {
        sockets[number].handleUpgrade(request, socket, head, function (ws) {
          sockets[number].emit("connection", ws, request);
        });
      } else {
        socket.destroy();
      }
    });

    //server on
    server.listen(3000, address.ip.inner, () => {
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

Ghost.prototype.robotPassLaunching = async function () {
  const instance = this;
  const { fileSystem, shell, shellLink } = this.mother;
  const http = require("http");
  const express = require("express");
  const app = express();
  const bodyParser = require("body-parser");
  const multer = require("multer");
  const multiForms = multer();
  const useragent = require("express-useragent");
  const staticFolder = process.env.HOME + '/static';
  const robotPassPort = 8080;

  app.use(useragent.express());
  app.use(bodyParser.json());
  app.use(multiForms.array());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static(staticFolder));

  try {
    console.log(``);
    console.log(`\x1b[36m\x1b[1m%s\x1b[0m`, `launching robot pass server =====================`);
    console.log(``);

    await this.back.setInfoObj({ getMode: false });

    const BUTTON_LIST = [
        "proposal",
        "request",
        "contents",
        "voice"
    ];
    let runProcess, runList;
    runProcess = {};
    runList = {};
    for (let b of BUTTON_LIST) {
      runProcess[b] = 0;
      runList[b] = [];
    }

    const runAi = async function (button) {
      try {
        let orders;

        runProcess[button] = 1;
        await instance.mother.sleep(5000);
        runProcess[button] = 2;
        orders = [];
        for (let i of runList[button]) {
          shell.exec(`node ${shellLink(instance.robot)} ${button} ${i}`);
          orders.push(i);
        }
        runList[button] = [];
        runProcess[button] = 0;

        return `${button} ${orders.join(",")} done`;
      } catch (e) {
        console.log(e);
      }
    }

    app.get([ "/", "/ai", "/robot", "/illustrator" ], async function (req, res) {
      try {
        res.set({
          "Content-Type": "text/plain",
          "Access-Control-Allow-Origin": '*',
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
          "Access-Control-Allow-Headers": '*',
        });

        const order = req.query;
        const id = String(order.id);

        if (runProcess[order.type] === 1) {
          runList[order.type].push(id);
          res.send(id + " make pass");
        } else if (runProcess[order.type] === 2) {
          res.send(id + " make fail");
        } else if (runProcess[order.type] === 0) {
          runList[order.type].push(id);
          runAi(order.type).then(function (msg) {
            console.log(msg);
          }).catch(function (e) {
            throw new Error(e);
          });
          res.send(id + " make pass");
        }

      } catch (e) {
        console.log(e);
      }
    });

    //server on
    http.createServer(app).listen(robotPassPort, () => {
      console.log(`\x1b[33m%s\x1b[0m`, `Server running in ${String(robotPassPort)}`);
    });

  } catch (e) {
    console.log(e);
  }
}

Ghost.prototype.wssLaunching = async function () {
  const instance = this;
  const { fileSystem } = this.mother;
  try {

    const https = require("https");
    const express = require("express");
    const app = express();
    const bodyParser = require("body-parser");
    const useragent = require("express-useragent");
    const WebSocket = require("ws");
    const url = require("url");
    const socketNumbers = 99;
    const port = 8080;
    let sockets, server;
    let pems, pemsLink;
    let certDir, keyDir, caDir;

    app.use(useragent.express());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    sockets = [];
    for (let i = 0; i < socketNumbers; i++) {
      sockets.push(new WebSocket.Server({ noServer: true }));
    }

    for (let wss of sockets) {
      wss.on("connection", function (ws) {
        ws.on("message", (message) => {
          const clients = wss.clients;
          for (let c of clients) {
            if (c.readyState === WebSocket.OPEN && ws !== c) {
              c.send(message);
            }
          }
        });
      });
    }

    app.get("/view", (req, res) => {
      let numbers;
      numbers = [];
      for (let wss of sockets) {
        numbers.push(wss.clients.size);
      }
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send(JSON.stringify(numbers));
    });

    app.get("/viewSse", (req, res) => {
      let numbers, pusher;
      res.set({
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });

      pusher = setInterval(function () {
        numbers = [];
        for (let wss of sockets) {
          numbers.push(wss.clients.size === 0 ? 0 : 1);
        }
        res.write(`event: updateTong\ndata: ${JSON.stringify(numbers)}\n\n`);
      }, 3 * 1000);

      res.on('close', function () {
        clearInterval(pusher);
        res.end();
      });
    });

    pems = {};
    pemsLink = process.cwd() + "/pems/" + this.address.pythoninfo.host;

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

    server = https.createServer(pems, app);

    server.on("upgrade", function (request, socket, head) {
      const { pathname } = url.parse(request.url);
      let number;
      if (/client/gi.test(pathname)) {
        number = null;
        for (let i = 0; i < sockets.length; i++) {
          if (sockets[i].clients.size === 0) {
            number = i;
            break;
          }
        }
        if (number === null) {
          socket.destroy();
        } else {
          sockets[number].handleUpgrade(request, socket, head, function (ws) {
            sockets[number].emit("connection", ws, request);
          });
        }
      } else if (/homeliaison/gi.test(pathname)) {
        number = Number(pathname.replace(/[^0-9]/gi, ''));
        if (sockets[number] !== undefined) {
          sockets[number].handleUpgrade(request, socket, head, function (ws) {
            sockets[number].emit("connection", ws, request);
          });
        } else {
          socket.destroy();
        }
      } else {
        socket.destroy();
      }
    });

    server.listen(port, () => { console.log(`\x1b[33m%s\x1b[0m`, `\nWss server running\n`); });

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
} else if (/ai/gi.test(process.argv[2]) || /robot/gi.test(process.argv[2]) || /pass/gi.test(process.argv[2])) {
  app.robotPassLaunching();
} else if (/wss/gi.test(process.argv[2])) {
  app.wssLaunching();
}
