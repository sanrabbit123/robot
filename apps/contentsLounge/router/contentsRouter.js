const ContentsRouter = function (MONGOC, MONGOLOCALC, MONGOCONSOLEC, MONGOLOGC) {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  const ImageReader = require(process.cwd() + "/apps/imageReader/imageReader.js");
  const ParsingHangul = require(process.cwd() + "/apps/parsingHangul/parsingHangul.js");
  const GoogleDrive = require(`${process.cwd()}/apps/googleAPIs/googleDrive.js`);
  const GoogleDocs = require(process.cwd() + "/apps/googleAPIs/googleDocs.js");
  const GoogleSheet = require(`${process.cwd()}/apps/googleAPIs/googleSheet.js`);
  const GoogleCalendar = require(`${process.cwd()}/apps/googleAPIs/googleCalendar.js`);

  this.mother = new Mother();
  this.back = new BackMaker();
  this.address = require(`${process.cwd()}/apps/infoObj.js`);
  this.host = this.address.contentsinfo.host;
  this.mongo = MONGOC;
  this.mongolocal = MONGOLOCALC;
  this.mongoconsole = MONGOCONSOLEC;
  this.mongolog = MONGOLOGC;
  this.members = {};

  this.formidable = require("formidable");
  this.imageReader = new ImageReader(this.mother, this.back, this.address);
  this.hangul = new ParsingHangul();
  this.drive = new GoogleDrive();
  this.docs = new GoogleDocs();
  this.sheets = new GoogleSheet();
  this.calendar = new GoogleCalendar();

  this.staticConst = process.env.HOME + "/static";

  this.vaildHost = [
    this.address.frontinfo.host,
    this.address.secondinfo.host,
    this.address.transinfo.host,
    this.address.backinfo.host,
    this.address.pythoninfo.host,
    this.address.testinfo.host,
    this.address.contentsinfo.host,
    this.address.officeinfo.ghost.host,
    "home-liaison.servehttp.com",
    "localhost:3000",
    "172.30.1.90:3000",
    "172.30.1.37:3000",
    "192.168.0.90:3000",
  ];
}

ContentsRouter.prototype.fireWall = function (req) {
  const instance = this;
  let __originTarget, __wallLogicBoo, __vailHosts;

  __vailHosts = this.vaildHost;
  __originTarget = req.headers["origin"];
  if (typeof __originTarget !== "string") {
    __originTarget = req.headers["host"];
    if (typeof __originTarget !== "string") {
      __originTarget = "";
    }
  }
  __wallLogicBoo = false;
  for (let host of __vailHosts) {
    __wallLogicBoo = (new RegExp(host, "gi")).test(__originTarget.trim().replace(/\/$/, ''));
    if (__wallLogicBoo) {
      break;
    }
  }
  return __wallLogicBoo;
}

//GET ---------------------------------------------------------------------------------------------

ContentsRouter.prototype.rou_get_First = function () {
  const instance = this;
  const { diskReading, aliveMongo } = this.mother;
  let obj = {};
  obj.link = "/:id";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {

      if (req.params.id === "ssl") {
        const disk = await diskReading();
        const aliveMongoResult = await aliveMongo();
        res.send(JSON.stringify({ disk: disk.toArray(), mongo: aliveMongoResult }));
      } else if (req.params.id === "disk") {
        const disk = await diskReading();
        res.send(JSON.stringify({ disk: disk.toArray() }));
      } else {
        res.send(JSON.stringify({ message: "hi" }));
      }

    } catch (e) {
      logger.error("Contents lounge 서버 문제 생김 (rou_get_First): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
    }
  }

  return obj;
}

//POST ---------------------------------------------------------------------------------------------

ContentsRouter.prototype.rou_post_storeHoliday = function () {
  const instance = this;
  const { fileSystem, equalJson } = this.mother;
  let obj;
  obj = {};
  obj.link = [ "/storeHoliday" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      
      




      res.send(JSON.stringify({ message: "done" }));
    } catch (e) {
      logger.error("Contents lounge 서버 문제 생김 (rou_post_storeHoliday): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

ContentsRouter.prototype.rou_post_generalFileUpload = function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink } = this.mother;
  const { staticConst } = this;
  const hangul = this.hangul;
  let obj;
  obj = {};
  obj.link = [ "/generalFileUpload" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (!instance.fireWall(req)) {
        throw new Error("post ban");
      }
      const form = instance.formidable({ multiples: true, encoding: "utf-8", maxFileSize: (9000 * 1024 * 1024) });
      form.parse(req, async function (err, fields, files) {
        try {
          if (err) {
            throw new Error(err);
          } else {
            const toArr = JSON.parse(fields.toArr).map((path) => { return hangul.fixString(path); });
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

            num = 0;
            for (let { filepath: path } of fromArr) {
              tempArr = toArr[num].split("/");
              tempString = staticConst;
              if (tempArr.length === 0) {
                throw new Error("invaild to array");
              }
              for (let i = 0; i < tempArr.length - 1; i++) {
                tempDir = await fileSystem(`readDir`, [ tempString ]);
                if (!tempDir.includes(tempArr[i]) && tempArr[i] !== "") {
                  await shellExec(`mkdir ${shellLink(tempString + "/" + tempArr[i])}`);
                }
                tempString += '/';
                tempString += tempArr[i];
              }
              await shellExec(`mv ${shellLink(path)} ${shellLink(staticConst + "/" + toArr[num].replace(/^\//i, ''))}`);
              num++;
            }

            res.send(JSON.stringify({ "message": "done" }));
          }
        } catch (e) {
          logger.error("Contents lounge 서버 문제 생김 (rou_post_generalFileUpload): " + e.message).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
        }
      });
    } catch (e) {
      logger.error("Contents lounge 서버 문제 생김 (rou_post_generalFileUpload): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

//ROUTING ----------------------------------------------------------------------

ContentsRouter.prototype.setMembers = async function () {
  const instance = this;
  const back = this.back;
  const { fileSystem } = this.mother;
  try {
    this.members = await back.setMemberObj({ getMode: true, selfMongo: instance.mongo });
  } catch (e) {
    await logger.error("Contents lounge 서버 문제 생김 (setMembers): " + e.message);
    console.log(e);
  }
}

ContentsRouter.prototype.getAll = function () {
  let result, result_arr;

  result = { get: [], post: [] };
  result_arr = Object.keys(ContentsRouter.prototype);

  for (let i of result_arr) { if (/^rou_get/g.test(i)) {
    result.get.push((this[i])());
  }}

  for (let i of result_arr) { if (/^rou_post/g.test(i)) {
    result.post.push((this[i])());
  }}

  return result;
}

module.exports = ContentsRouter;
