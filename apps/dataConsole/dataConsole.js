const DataConsole = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  this.address = require(`${process.cwd()}/apps/infoObj.js`);
  this.mother = new Mother();
  this.dir = process.cwd() + "/apps/dataConsole";
}

DataConsole.prototype.renderStatic = async function (staticFolder, address, DataPatch) {
  const instance = this;
  const { fileSystem, babelSystem, shell, shellLink } = this.mother;
  const S3HOST = this.address.s3info.host;
  const SSEHOST = address.host;
  const SSEHOST_CONSOLE = this.address.backinfo.host;
  const GHOSTHOST = this.address.homeinfo.ghost.host;
  try {

    //set static
    const staticDir = `${this.dir}/router/source/local`;
    const staticDirList = await fileSystem(`readDir`, [ staticDir ]);
    const homeDirList = await fileSystem(`readDir`, [ process.env.HOME ]);
    if (!homeDirList.includes(staticFolder.split('/')[staticFolder.split('/').length - 1])) {
      shell.exec(`mkdir ${shellLink(staticFolder)}`);
    }
    const thisDirList = await fileSystem(`readDir`, [ this.dir ]);
    if (!thisDirList.includes("log")) {
      shell.exec(`mkdir ${shellLink(this.dir)}/log`);
    }
    const thisLogDirList = await fileSystem(`readDir`, [ this.dir + "/log" ]);
    if (!thisDirList.includes("client_latest.json")) {
      shell.exec(`touch ${shellLink(this.dir)}/log/client_latest.json`);
    }
    if (!thisDirList.includes("designer_latest.json")) {
      shell.exec(`touch ${shellLink(this.dir)}/log/designer_latest.json`);
    }
    if (!thisDirList.includes("project_latest.json")) {
      shell.exec(`touch ${shellLink(this.dir)}/log/project_latest.json`);
    }
    if (!thisDirList.includes("contents_latest.json")) {
      shell.exec(`touch ${shellLink(this.dir)}/log/contents_latest.json`);
    }
    console.log(`set static`);

    let svgTongString, generalString, consoleGeneralString, execString, fileString, svgTongItemsString, s3String, sseString, sseConsoleString, polyfillString;
    let code0, code1;
    let result;

    //set general js
    s3String = "const S3HOST = \"" + S3HOST + "\";";
    sseString = "const SSEHOST = \"" + SSEHOST + "\";";
    sseConsoleString = "const SSEHOST_CONSOLE = \"" + SSEHOST_CONSOLE + "\";";
    ghostString = "const GHOSTHOST = \"" + GHOSTHOST + "\";";
    svgTongString = await fileSystem(`readString`, [ `${process.cwd()}/apps/frontMaker/string/svgTong.js` ]);
    generalString = await fileSystem(`readString`, [ `${process.cwd()}/apps/frontMaker/source/jsGeneral/general.js` ]);
    generalString = generalString.replace(/\/<%generalMap%>\//, "{}");
    consoleGeneralString = await fileSystem(`readString`, [ `${this.dir}/router/source/general/general.js` ]);
    polyfillString = await fileSystem(`readString`, [ `${process.cwd()}/apps/frontMaker/source/jsGeneral/polyfill.js` ]);

    //write local js
    console.log(`set target : `, staticDirList);
    for (let i of staticDirList) {

      result = '';
      code0 = '';
      code1 = '';
      svgTongItemsString = null;

      if (i !== `.DS_Store`) {
        execString = await fileSystem(`readString`, [ `${this.dir}/router/source/general/exec.js` ]);
        execString = execString.replace(/\/<%name%>\//, (i.slice(0, 1).toUpperCase() + i.replace(/\.js$/, '').slice(1)));
        fileString = await fileSystem(`readString`, [ `${this.dir}/router/source/local/${i}` ]);
        if (/\/<%map%>\//g.test(fileString)) {
          fileString = fileString.replace(/(\/<%map%>\/)/g, function (match, p1, offset, string) {
            return JSON.stringify(require(`${instance.dir}/router/source/svg/map/${i}`), null, 2);
          });
          svgTongItemsString = await fileSystem(`readString`, [ `${this.dir}/router/source/svg/svgTong/${i}` ]);
        }
        code0 = s3String + "\n\n" + sseString + "\n\n" + sseConsoleString + "\n\n" + ghostString + "\n\n" + svgTongString;
        code1 = generalString + "\n\n" + consoleGeneralString + "\n\n" + fileString + "\n\n" + execString;
        if (svgTongItemsString === null) {
          result = (await babelSystem(code0)) + "\n\n" + (await babelSystem(code1));
        } else {
          result = (await babelSystem(code0)) + "\n\n" + svgTongItemsString + "\n\n" + (await babelSystem(code1));
        }
        console.log(`${i} babel compile success`);
        await fileSystem(`write`, [ `${staticFolder}/${i}`, (polyfillString + "\n\n" + result) ]);
      }

    }

  } catch (e) {
    console.log(e);
  }
}

DataConsole.prototype.renderMiddleStatic = async function (staticFolder, address, DataPatch, DataMiddle) {
  const instance = this;
  const { fileSystem, babelSystem, shell, shellLink } = this.mother;
  const S3HOST = this.address.s3info.host;
  const SSEHOST = address.host;
  const SSEHOST_CONSOLE = this.address.backinfo.host;
  const GHOSTHOST = this.address.homeinfo.ghost.host;
  try {

    //set static
    const staticDir = `${this.dir}/router/source/middle`;
    const staticDirList = await fileSystem(`readDir`, [ staticDir ]);
    const homeDirList = await fileSystem(`readDir`, [ process.env.HOME ]);
    if (!homeDirList.includes(staticFolder.split('/')[staticFolder.split('/').length - 1])) {
      shell.exec(`mkdir ${shellLink(staticFolder)}`);
    }
    const targetStaticFolder = await fileSystem(`readDir`, [ staticFolder ]);;
    if (!targetStaticFolder.includes(`middle`)) {
      shell.exec(`mkdir ${shellLink(staticFolder)}/middle`);
    }
    console.log(`set middle static`);

    let svgTongString, generalString, consoleGeneralString, execString, fileString, svgTongItemsString, s3String, sseString, sseConsoleString, polyfillString;
    let code0, code1, code2, code3;
    let result;
    let onoffObj, prototypes, dataPatchScript, prototypeBoo;

    //set general js
    s3String = "const S3HOST = \"" + S3HOST + "\";";
    sseString = "const SSEHOST = \"" + SSEHOST + "\";";
    sseConsoleString = "const SSEHOST_CONSOLE = \"" + SSEHOST_CONSOLE + "\";";
    ghostString = "const GHOSTHOST = \"" + GHOSTHOST + "\";";
    svgTongString = await fileSystem(`readString`, [ `${process.cwd()}/apps/frontMaker/string/svgTong.js` ]);
    generalString = await fileSystem(`readString`, [ `${process.cwd()}/apps/frontMaker/source/jsGeneral/general.js` ]);
    generalString = generalString.replace(/\/<%generalMap%>\//, "{}");
    consoleGeneralString = await fileSystem(`readString`, [ `${this.dir}/router/source/general/general.js` ]);
    polyfillString = await fileSystem(`readString`, [ `${process.cwd()}/apps/frontMaker/source/jsGeneral/polyfill.js` ]);

    //write local js
    console.log(`set middle target : `, staticDirList);
    for (let i of staticDirList) {

      result = '';
      code0 = '';
      code1 = '';
      svgTongItemsString = null;

      if (i !== `.DS_Store`) {
        execString = await fileSystem(`readString`, [ `${this.dir}/router/source/general/middleExec.js` ]);
        execString = execString.replace(/\/<%name%>\//, (i.slice(0, 1).toUpperCase() + i.replace(/\.js$/, '').slice(1)));
        fileString = await fileSystem(`readString`, [ `${staticDir}/${i}` ]);
        if (/\/<%map%>\//g.test(fileString)) {
          fileString = fileString.replace(/(\/<%map%>\/)/g, function (match, p1, offset, string) {
            return JSON.stringify(require(`${instance.dir}/router/source/svg/middle/map/${i}`), null, 2);
          });
          svgTongItemsString = await fileSystem(`readString`, [ `${this.dir}/router/source/svg/middle/svgTong/${i}` ]);
        }

        //set data patch
        onoffObj = DataMiddle.metaDictionary(i).patch;
        prototypes = Object.keys(DataPatch.prototype);
        dataPatchScript = `const DataPatch = new Function();\n`;
        if (onoffObj.entire) {
          for (let i of prototypes) {
            dataPatchScript += `DataPatch.${i} = ${DataPatch.prototype[i].toString().replace(/\n/g, '')};\n`;
          }
        } else {
          for (let i of prototypes) {
            prototypeBoo = /^tools/.test(i);
            for (let j in onoffObj) {
              if (onoffObj[j] && !prototypeBoo) {
                prototypeBoo = (new RegExp("^" + j)).test(i);
              }
            }
            if (prototypeBoo) {
              dataPatchScript += `DataPatch.${i} = ${DataPatch.prototype[i].toString().replace(/\n/g, '')};\n`;
            }
          }
        }

        //babel compile
        code0 = s3String + "\n\n" + sseString + "\n\n" + sseConsoleString + "\n\n" + ghostString + "\n\n" + svgTongString;
        code1 = dataPatchScript + "\n\n";
        code2 = generalString + "\n\n" + consoleGeneralString + "\n\n";
        code3 = fileString + "\n\n" + execString;

        result = '';
        result += await babelSystem(code0);
        result += "\n\n";
        if (svgTongItemsString === null) {
          result += svgTongItemsString;
          result += "\n\n";
        }
        result += await babelSystem(code1);
        result += "\n\n";
        result += await babelSystem(code2);
        result += "\n\n";
        result += await babelSystem(code3);
        result += "\n\n";
        
        console.log(`${i} babel compile success`);
        await fileSystem(`write`, [ `${staticFolder}/middle/${i}`, (polyfillString + "\n\n" + result) ]);
      }

    }

  } catch (e) {
    console.log(e);
  }
}

DataConsole.prototype.connect = async function () {
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
  const KakaoTalk = require(`${process.cwd()}/apps/kakaoTalk/kakaoTalk.js`);
  const DataPatch = require(`${this.dir}/router/dataPatch.js`);
  const DataRouter = require(`${this.dir}/router/dataRouter.js`);

  app.use(useragent.express());
  app.use(bodyParser.json());
  app.use(multiForms.array());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static(staticFolder));

  try {
    //set address info
    const { name, rawObj: address } = await this.mother.ipCheck();
    let isGhost = (address.isGhost === true);
    let isLocal;
    if (name === "unknown") {
      throw new Error("invalid address");
    }
    console.log(``);
    console.log(`\x1b[36m\x1b[1m%s\x1b[0m`, `launching console in ${name.replace(/info/i, '')} ${isGhost ? "(ghost) " : ""}==============`);
    console.log(``);

    //set mongo connetion
    let MONGOC, MONGOLOCALC;
    if (/localhost/gi.test(address.host)) {
      isLocal = true;
      MONGOC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
      console.log(`set DB server => 127.0.0.1`);
    } else {
      isLocal = false;
      MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
      console.log(`set DB server => ${this.address.mongoinfo.host}`);
    }
    MONGOLOCALC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
    await MONGOC.connect();
    await MONGOLOCALC.connect();

    //set kakao
    const kakaoInstance = new KakaoTalk();
    await kakaoInstance.ready();

    //set dataMiddle
    let DataMiddle;
    if (isLocal || isGhost) {
      DataMiddle = require(`${this.dir}/router/dataMiddle.js`);
    } else {
      DataMiddle = null;
    }

    //set pem key
    let pems = {};
    let pemsLink = process.cwd() + "/pems/" + address.host;
    let certDir, keyDir, caDir;

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
    const router = new DataRouter(DataPatch, DataMiddle, MONGOC, MONGOLOCALC, kakaoInstance, isGhost);
    await router.setMembers();
    const rouObj = router.getAll();
    for (let obj of rouObj.get) {
      app.get(obj.link, obj.func);
    }
    for (let obj of rouObj.post) {
      app.post(obj.link, obj.func);
    }
    console.log(`set router`);

    //set static
    await this.renderStatic(staticFolder, address, DataPatch);
    if (DataMiddle !== null) {
      await this.renderMiddleStatic(staticFolder, address, DataPatch, DataMiddle);
    }

    //error handle
    // app.use(function (req, res, next) {
    //   res.status(404);
    //   res.send('<script>window.location.href = "https://' + instance.address.backinfo.host + '/client"</script>');
    // });

    //server on
    https.createServer(pems, app).listen(3000, address.ip.inner, () => {
      console.log(``);
      console.log(`\x1b[33m%s\x1b[0m`, `Server running`);
      console.log(``);
    });

  } catch (e) {
    console.log(e);
  }
}

module.exports = DataConsole;
