const LogConsole = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  this.address = require(`${process.cwd()}/apps/infoObj.js`);
  this.mother = new Mother();
  this.back = new BackMaker();
  this.dir = process.cwd() + "/apps/logConsole";
  this.console = process.cwd() + "/apps/dataConsole";
  this.sourceDir = this.dir + "/router/source";
}

LogConsole.prototype.mediaQuery = function (code) {
  const conditions = [
    "window.innerWidth > 1450",
    "window.innerWidth <= 1450 && window.innerWidth > 1100",
    "window.innerWidth <= 1100 && window.innerWidth > 900",
    "window.innerWidth <= 900 && window.innerWidth > 760",
    "window.innerWidth <= 760"
  ];
  const updateProtoConst = "GeneralJs.stacks.updateMiddleMedialQueryConditions";
  const matchReg = /[\n;]([^\n\;]*)\<\%\%([^\%]+)\%\%\>[;]?/g;
  const replacer = function (match, p1, p2, offset, string) {
    const safeWall = "\n\n";
    let tempValue, tempArr, tempStr;

    tempValue = p1.replace(/[\n;]/g, '').replace(/\<\%\%/g, '').trim();
    tempArr = p2.replace(/\<\%\%/g, '').replace(/\%\%\>/g, '').trim().split(",");
    tempStr = "";
    if (tempArr.length > conditions.length) {
      throw new Error("parse error");
    }
    for (let j = 0; j < tempArr.length; j++) {
      tempStr += " } else if (" + conditions[j] + ") { ";
      tempStr += "\n"
      tempStr += tempValue;
      tempStr += " ";
      tempStr += tempArr[j];
      tempStr += ";\n";
    }
    tempStr = safeWall + tempStr.slice(7) + " }" + safeWall;
    return tempStr;
  }
  let updateProto;

  updateProto = '';
  updateProto += updateProtoConst;
  updateProto += " = ";
  updateProto += "[";
  for (let i of conditions) {
    updateProto += "(";
    updateProto += i;
    updateProto += "),";
  }
  updateProto += "];\n";

  return { conditions: updateProto, code: code.replace(matchReg, replacer) };
}

LogConsole.prototype.aliveTest = async function () {
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

LogConsole.prototype.renderStatic = async function (staticFolder, address) {
  const instance = this;
  const { fileSystem, shell, shellLink, sleep } = this.mother;
  const S3HOST = this.address.homeinfo.ghost.protocol + "://" + this.address.homeinfo.ghost.host;
  const SSEHOST = address.host;
  const SSEHOST_CONSOLE = this.address.backinfo.host;
  const GHOSTHOST = this.address.homeinfo.ghost.host;
  const FILEHOST = this.address.officeinfo.ghost.host;
  const PYTHONHOST = "https://" + this.address.pythoninfo.host + ":3000";
  const BRIDGEHOST = "https://" + this.address.officeinfo.ghost.host + ":3000";
  const FRONTHOST = "https://" + this.address.frontinfo.host;
  const OFFICEHOST = "https://" + this.address.officeinfo.ghost.host + ":" + String(this.address.officeinfo.ghost.port);
  try {

    //set static
    const moduleName = "log";
    const staticDir = `${this.dir}/router/source/local`;
    const staticDirList_raw = await fileSystem(`readDir`, [ staticDir ]);
    const staticDirList = staticDirList_raw.filter((fileName) => { return !(([ ".DS_Store" ]).includes(fileName)); });
    const homeDirList = await fileSystem(`readDir`, [ process.env.HOME ]);
    let folderSize, tempScriptString;
    let tempMediaResult;
    let subModuleList;

    if (!homeDirList.includes(staticFolder.split('/')[staticFolder.split('/').length - 1])) {
      shell.exec(`mkdir ${shellLink(staticFolder)}`);
    }
    if (!await fileSystem(`exist`, [ `${shellLink(staticFolder)}/log` ])) {
      shell.exec(`mkdir ${shellLink(staticFolder)}/log`);
    }
    console.log(`set static`);

    let svgTongString, generalString, consoleGeneralString, execString, fileString, svgTongItemsString, s3String, sseString, sseConsoleString, polyfillString, classString, pythonString, bridgeString, frontWebString, trapString, officeString;
    let code0, code1, code2, code3;
    let result;
    let prototypes, prototypeBoo;
    let resultFromArr;

    //set general js
    s3String = "const S3HOST = \"" + S3HOST + "\";";
    sseString = "const SSEHOST = \"" + SSEHOST + "\";";
    sseConsoleString = "const SSEHOST_CONSOLE = \"" + SSEHOST_CONSOLE + "\";";
    ghostString = "const GHOSTHOST = \"" + GHOSTHOST + "\";";
    pythonString = "const PYTHONHOST = \"" + PYTHONHOST + "\";";
    bridgeString = "const BRIDGEHOST = \"" + BRIDGEHOST + "\";";
    frontWebString = "const FRONTHOST = \"" + FRONTHOST + "\";";
    officeString = "const OFFICEHOST = \"" + OFFICEHOST + "\";\n" + "const FILEHOST = \"" + FILEHOST + "\";";
    svgTongString = await fileSystem(`readString`, [ `${process.cwd()}/apps/frontMaker/string/svgTong.js` ]);
    generalString = await fileSystem(`readString`, [ `${process.cwd()}/apps/frontMaker/source/jsGeneral/general.js` ]);
    generalString = generalString.replace(/\/<%generalMap%>\//, "{}");
    consoleGeneralString = await fileSystem(`readString`, [ `${this.console}/router/source/general/general.js` ]);
    trapString = await this.back.setAjaxAuthorization();

    //write local js
    console.log(`set target :`, staticDirList);
    resultFromArr = [];
    for (let i of staticDirList) {

      result = '';
      code0 = '';
      code1 = '';
      svgTongItemsString = null;

      execString = await fileSystem(`readString`, [ `${this.dir}/router/source/general/exec.js` ]);
      execString = execString.replace(/\/<%name%>\//, (i.slice(0, 1).toUpperCase() + i.replace(/\.js$/, '').slice(1)));
      fileString = await fileSystem(`readString`, [ `${this.dir}/router/source/local/${i}` ]);

      //merge
      code0 = svgTongString + "\n\n" + trapString + "\n\n" + s3String + "\n\n" + sseString + "\n\n" + sseConsoleString + "\n\n" + ghostString + "\n\n" + pythonString + "\n\n" + bridgeString + "\n\n" + frontWebString + "\n\n" + officeString + "\n\n";
      code1 = "";
      code2 = generalString + "\n\n" + consoleGeneralString;
      code3 = fileString + "\n\n" + execString;

      //set media query
      if (/<%%/gi.test(code2)) {
        tempMediaResult = this.mediaQuery(code2);
        code2 = tempMediaResult.code;
      }
      if (/<%%/gi.test(code3)) {
        tempMediaResult = this.mediaQuery(code3);
        code3 = tempMediaResult.conditions + "\n\n" + tempMediaResult.code;
      }

      result = '';
      result += code0;
      result += "\n\n";
      if (svgTongItemsString !== null) {
        result += svgTongItemsString;
        result += "\n\n";
      }
      result += code1;
      result += "\n\n";
      result += code2;
      result += "\n\n";
      result += code3;
      result += "\n\n";

      console.log(`${i} merge success`);
      await fileSystem(`write`, [ `${staticFolder}/log/${i}`, result ]);
      resultFromArr.push(`${staticFolder}/log/${i}`);

    }

    return resultFromArr;

  } catch (e) {
    console.log(e);
  }
}

LogConsole.prototype.playgroundConnect = async function () {
  const instance = this;
  const { fileSystem, shell, shellLink, mongo, mongoinfo, mongolocalinfo, mongoconsoleinfo, errorLog } = this.mother;
  const PORT = 30000;
  const https = require("https");
  const express = require("express");
  const app = express();
  const multer = require("multer");
  const multiForms = multer();
  const useragent = require("express-useragent");
  const staticFolder = process.env.HOME + "/static";

  app.use(useragent.express());
  app.use(express.json({ limit : "50mb" }));
  app.use(multiForms.array());
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  app.use(express.static(staticFolder));

  try {
    //set address info
    const { name, rawObj: address, isTest } = await this.mother.ipCheck();
    let isLocal;
    if (name === "unknown") {
      throw new Error("invalid address");
    }
    console.log(``);
    console.log(`\x1b[36m\x1b[1m%s\x1b[0m`, `launching console in ${name} ==============`);
    console.log(``);

    //set mongo connetion
    let MONGOC, MONGOLOCALC;
    await this.back.setInfoObj({ getMode: false });
    isLocal = false;
    MONGOC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
    console.log(`\x1b[33m%s\x1b[0m`, `set DB server => 127.0.0.1`);
    MONGOLOCALC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
    console.log(`\x1b[33m%s\x1b[0m`, `set SSE server => 127.0.0.1`);

    console.log(``);

    await MONGOC.connect();
    await MONGOLOCALC.connect();

    //set kakao
    const KakaoTalk = require(`${process.cwd()}/apps/kakaoTalk/kakaoTalk.js`);
    const kakaoInstance = new KakaoTalk();
    await kakaoInstance.ready();

    //set human
    const HumanPacket = require(`${process.cwd()}/apps/humanPacket/humanPacket.js`);
    const humanInstance = new HumanPacket();

    //set pem key
    let pems, pemsLink;
    let certDir, keyDir, caDir;

    pems = {};
    pemsLink = process.cwd() + "/pems/" + address.host;

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
    const LogRouter = require(`${this.dir}/router/logRouter.js`);
    const router = new LogRouter(MONGOC, MONGOLOCALC, kakaoInstance, humanInstance, isLocal);

    const rouObj = router.getAll();
    for (let obj of rouObj.get) {
      app.get(obj.link, obj.func);
    }
    for (let obj of rouObj.post) {
      app.post(obj.link, obj.func);
    }
    console.log(`set router`);

    //set static
    this.renderStatic(staticFolder, address).then(() => {
      console.log(`static done`);
    }).catch((err) => {
      console.log(err);
    });

    //set cron
    setInterval(async () => {
      try {
        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();

        await instance.aliveTest();

        if (hour === 7 || hour === 13 || hour === 18 || hour === 21) {
          if (minute < 30) {
            const MongoReflection = require(`${process.cwd()}/apps/mongoReflection/mongoReflection.js`);
            const reflection = new MongoReflection();
            await reflection.ultimateReflection();
            await reflection.mysqlReflection();
            await reflection.frontReflection();
          }
        }
      } catch (e) {
        console.log(e);
      }
    }, 30 * 60 * 1000);

    //server on
    https.createServer(pems, app).listen(PORT, () => { console.log(`\x1b[33m%s\x1b[0m`, `\nServer running\n`); });

  } catch (e) {
    console.log(e);
  }
}

module.exports = LogConsole;
