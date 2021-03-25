const DataConsole = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  this.address = require(`${process.cwd()}/apps/infoObj.js`);
  this.mother = new Mother();
  this.dir = process.cwd() + "/apps/dataConsole";
}

DataConsole.prototype.renderStatic = async function (staticFolder, address, DataPatch, isGhost) {
  const instance = this;
  const { fileSystem, shell, shellLink } = this.mother;
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
    let code0, code1, code2, code3;
    let result;
    let prototypes, dataPatchScript, prototypeBoo;
    let finalMinifyObj, finalMinifyString;

    //set general js
    s3String = "const S3HOST = \"" + S3HOST + "\";";
    sseString = "const SSEHOST = \"" + SSEHOST + "\";";
    sseConsoleString = "const SSEHOST_CONSOLE = \"" + SSEHOST_CONSOLE + "\";";
    ghostString = "const GHOSTHOST = \"" + GHOSTHOST + "\";";
    svgTongString = await fileSystem(`readString`, [ `${process.cwd()}/apps/frontMaker/string/svgTong.js` ]);
    generalString = await fileSystem(`readString`, [ `${process.cwd()}/apps/frontMaker/source/jsGeneral/general.js` ]);
    generalString = generalString.replace(/\/<%generalMap%>\//, "{}");
    consoleGeneralString = await fileSystem(`readString`, [ `${this.dir}/router/source/general/general.js` ]);
    // polyfillString = await fileSystem(`readString`, [ `${process.cwd()}/apps/frontMaker/source/jsGeneral/polyfill.js` ]);

    //write local js
    console.log(`set target :`, staticDirList);
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

        //set data patch
        prototypes = Object.keys(DataPatch.prototype);
        dataPatchScript = `const DataPatch = new Function();\n`;
        if (i.trim().replace(/\.js/gi, '') !== "photo") {
          for (let p of prototypes) {
            if ((new RegExp("^" + i.trim().replace(/\.js/gi, ''))).test(p) || /^tools/.test(p)) {
              dataPatchScript += `DataPatch.${p} = ${DataPatch.prototype[p].toString().replace(/\n/g, '')};\n`;
            }
          }
        } else {
          for (let p of prototypes) {
            if ((new RegExp("^photo")).test(p) || (new RegExp("^project")).test(p) || /^tools/.test(p)) {
              dataPatchScript += `DataPatch.${p} = ${DataPatch.prototype[p].toString().replace(/\n/g, '')};\n`;
            }
          }
        }

        //merge
        code0 = s3String + "\n\n" + sseString + "\n\n" + sseConsoleString + "\n\n" + ghostString + "\n\n" + svgTongString;
        code1 = dataPatchScript;
        code2 = generalString + "\n\n" + consoleGeneralString;
        code3 = fileString + "\n\n" + execString;

        result = '';
        result += code0;
        result += "\n\n";
        if (svgTongItemsString === null) {
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
        await fileSystem(`write`, [ `${staticFolder}/${i}`, result ]);
      }

    }

  } catch (e) {
    console.log(e);
  }
}

DataConsole.prototype.renderMiddleStatic = async function (staticFolder, address, DataPatch, DataMiddle, isGhost) {
  const instance = this;
  const { minify } = require("terser");
  const { fileSystem, shell, shellLink, babelSystem } = this.mother;
  const S3HOST = this.address.s3info.host;
  const SSEHOST = (isGhost ? this.address.backinfo.host : address.host);
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
    let prototypes, dataPatchScript, prototypeBoo;
    let finalMinifyObj, finalMinifyString;

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
    console.log(`set middle target :`, staticDirList);
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
        if (/\/<%patch%>\//g.test(fileString)) {
          const { patch: onoffObj, meta } = JSON.parse(fileString.slice(0, [ ...fileString.matchAll(/%\/%\/g/g) ][0].index).replace(/\/<%patch%>\/ /gi, ''));

          //set meta info
          DataMiddle.setMetadata(i.replace(/\.js/gi, ''), meta);

          //set browser js
          fileString = fileString.slice([ ...fileString.matchAll(/%\/%\/g/g) ][0].index + String("%/%/g").length + 1);

          //set data patch
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
        }

        //merge
        code0 = s3String + "\n\n" + sseString + "\n\n" + sseConsoleString + "\n\n" + ghostString + "\n\n" + svgTongString;
        code1 = dataPatchScript;
        code2 = generalString + "\n\n" + consoleGeneralString;
        code3 = fileString + "\n\n" + execString;

        result = '';
        result += code0;
        result += "\n\n";
        if (svgTongItemsString === null) {
          result += svgTongItemsString;
          result += "\n\n";
        }
        result += code1;
        result += "\n\n";
        result += code2;
        result += "\n\n";
        result += code3;
        result += "\n\n";

        result = await babelSystem(result);
        console.log(`${i} babel compile success`);
        finalMinifyObj = await minify(polyfillString + "\n\n" + result);
        finalMinifyString = finalMinifyObj.code;
        await fileSystem(`write`, [ `${staticFolder}/middle/${i}`, finalMinifyString ]);

        // console.log(`${i} merge success`);
        // await fileSystem(`write`, [ `${staticFolder}/middle/${i}`, result ]);
      }

    }

  } catch (e) {
    console.log(e);
  }
}

DataConsole.prototype.mergeRouter = async function (middle = true) {
  const instance = this;
  const { fileSystem, shell, shellLink } = this.mother;
  try {
    const routerFragments = this.dir + "/router/fragments";
    const routerFragmentsDir_raw = await fileSystem(`readDir`, [ routerFragments ]);
    const finalStringConst = "dataRouter.js";
    let routerFragmentsDir, codeString;

    routerFragmentsDir = [];
    for (let i of routerFragmentsDir_raw) {
      if (i !== `.DS_Store`) {
        if (middle) {
          routerFragmentsDir.push(i);
        } else {
          if (!/middle/gi.test(i.split('_')[1])) {
            routerFragmentsDir.push(i);
          }
        }
      }
    }
    routerFragmentsDir.sort((a, b) => { return Number(a.replace(/[^0-9]/g, '')) - Number(b.replace(/[^0-9]/g, '')); });

    codeString = '';
    for (let i of routerFragmentsDir) {
      codeString += await fileSystem(`readString`, [ routerFragments + "/" + i ]);
      codeString += "\n\n";
    }

    await fileSystem(`write`, [ `${this.dir}/router/${finalStringConst}`, codeString ]);
    const DataRouter = require(`${this.dir}/router/${finalStringConst}`);
    return DataRouter;
  } catch (e) {
    console.log(e);
  }
}

DataConsole.prototype.setBinary = async function () {
  const instance = this;
  const { fileSystem, shell, shellLink, s3FileList, binaryRequest } = this.mother;
  const ADDRESS = require(`${process.cwd()}/apps/infoObj.js`);
  const S3HOST = ADDRESS["s3info"]["host"];
  const staticFolder = process.env.HOME + "/static";
  try {

    //set boto3 key-secret
    const homeDir = await fileSystem(`readDir`, [ process.env.HOME ]);
    let awsKeyText;
    if (!homeDir.includes(`.aws`)) {
      shell.exec(`mkdir ${shellLink(process.env.HOME)}/.aws`);
    }
    awsKeyText = `[default]\n`;
    awsKeyText += `aws_access_key_id = ${ADDRESS["s3info"]["boto3"]["key"]}\n`;
    awsKeyText += `aws_secret_access_key = ${ADDRESS["s3info"]["boto3"]["secret"]}`;
    await fileSystem(`write`, [ `${process.env.HOME}/.aws/credentials`, awsKeyText ]);

    //download font
    const sourceFolerConst0 = `designSource`;
    const sourceFolerConst1 = `font`;
    const fontList = [
      "sandoll",
      "futura",
      "graphik"
    ];
    let targetFonts, binaryTarget, tempObject;

    //set font folder
    const staticFolderDir = await fileSystem(`readDir`, [ staticFolder ]);
    if (!staticFolderDir.includes(sourceFolerConst0)) {
      shell.exec(`mkdir ${shellLink(staticFolder + "/" + sourceFolerConst0)}`);
    }
    const designerSourceDir = await fileSystem(`readDir`, [ `${staticFolder}/${sourceFolerConst0}` ]);
    if (!designerSourceDir.includes(sourceFolerConst1)) {
      shell.exec(`mkdir ${shellLink(staticFolder + "/" + sourceFolerConst0 + "/" + sourceFolerConst1)}`);
    }
    const designerSourceFontDir = await fileSystem(`readDir`, [ `${staticFolder}/${sourceFolerConst0}/${sourceFolerConst1}` ]);
    for (let f of fontList) {
      if (!designerSourceFontDir.includes(f)) {
        shell.exec(`mkdir ${shellLink(staticFolder + "/" + sourceFolerConst0 + "/" + sourceFolerConst1)}/${f}`);
      }
      targetFonts = await s3FileList(`${sourceFolerConst0}/${sourceFolerConst1}/${f}`);
      binaryTarget = [];
      for (let t of targetFonts) {
        if (!/\/$/.test(t)) {
          binaryTarget.push(t);
        }
      }
      console.log(`\x1b[33m%s\x1b[0m`, `binary target :`, binaryTarget);
      for (let b of binaryTarget) {
        tempObject = await binaryRequest(S3HOST + "/" + b);
        await fileSystem(`writeBinary`, [ staticFolder + "/" + b, tempObject ]);
        console.log(`binary "${b}" download done`);
      }
    }
  } catch (e) {
    console.log(e);
  }
}

DataConsole.prototype.connect = async function () {
  const instance = this;
  const { fileSystem, shell, shellLink, mongo, mongoinfo, mongolocalinfo, mongoconsoleinfo } = this.mother;
  const https = require("https");
  const express = require("express");
  const app = express();
  const bodyParser = require("body-parser");
  const multer = require("multer");
  const multiForms = multer();
  const useragent = require("express-useragent");
  const staticFolder = process.env.HOME + "/static";

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
      console.log(`\x1b[33m%s\x1b[0m`, `set DB server => 127.0.0.1`);
      MONGOLOCALC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
      console.log(`\x1b[33m%s\x1b[0m`, `set SSE server => 127.0.0.1`);
    } else {
      isLocal = false;
      MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
      console.log(`\x1b[33m%s\x1b[0m`, `set DB server => ${this.address.mongoinfo.host}`);
      if (isGhost) {
        MONGOLOCALC = new mongo(mongoconsoleinfo, { useUnifiedTopology: true });
      } else {
        MONGOLOCALC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
      }
      console.log(`\x1b[33m%s\x1b[0m`, `set SSE server => ${this.address.backinfo.host}`);
    }
    console.log(``);

    await MONGOC.connect();
    await MONGOLOCALC.connect();

    //set kakao
    const KakaoTalk = require(`${process.cwd()}/apps/kakaoTalk/kakaoTalk.js`);
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
    const DataPatch = require(`${this.dir}/router/dataPatch.js`);
    const DataRouter = await this.mergeRouter(DataMiddle !== null);
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
    await this.renderStatic(staticFolder, address, DataPatch, isGhost);
    if (DataMiddle !== null) {
      await this.renderMiddleStatic(staticFolder, address, DataPatch, DataMiddle, isGhost);
    }

    //set binary
    if (!/localhost/gi.test(address.host)) {
      await this.setBinary();
      if (DataMiddle !== null) {
        await DataMiddle.middleBinary();
      }
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
