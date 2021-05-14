const DataConsole = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  this.address = require(`${process.cwd()}/apps/infoObj.js`);
  this.mother = new Mother();
  this.dir = process.cwd() + "/apps/dataConsole";
  this.sourceDir = this.dir + "/router/source";
  this.middleDir = this.sourceDir + "/middle";
  this.middleModuleDir = this.middleDir + "/module";
}

DataConsole.prototype.renderStatic = async function (staticFolder, address, DataPatch, isGhost) {
  const instance = this;
  const { fileSystem, shell, shellLink } = this.mother;
  // const S3HOST = this.address.s3info.host;
  const S3HOST = this.address.homeinfo.ghost.protocol + "://" + this.address.homeinfo.ghost.host;
  const SSEHOST = address.host;
  const SSEHOST_CONSOLE = this.address.backinfo.host;
  const GHOSTHOST = this.address.homeinfo.ghost.host;
  try {

    //set static
    const moduleName = "module";
    const staticDir = `${this.dir}/router/source/local`;
    const staticDirList_raw = await fileSystem(`readDir`, [ staticDir ]);
    const staticDirList = staticDirList_raw.filter((fileName) => { return !(([ ".DS_Store", moduleName ]).includes(fileName)); });
    const homeDirList = await fileSystem(`readDir`, [ process.env.HOME ]);
    let folderSize;

    if (!homeDirList.includes(staticFolder.split('/')[staticFolder.split('/').length - 1])) {
      shell.exec(`mkdir ${shellLink(staticFolder)}`);
    }
    const thisDirList = await fileSystem(`readDir`, [ this.dir ]);
    if (thisDirList.includes("log")) {
      folderSize = await fileSystem("size", [ this.dir + "/log" ]);
      if (folderSize > 100 * 100 * 100) {
        shell.exec(`rm -rf ${shellLink(this.dir)}/log`);
        shell.exec(`mkdir ${shellLink(this.dir)}/log`);
      }
    } else {
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

    const staticFolderList = await fileSystem(`readDir`, [ staticFolder ]);
    if (staticFolderList.includes(moduleName)) {
      shell.exec(`rm -rf ${shellLink(staticFolder)}/${shellLink(moduleName)}`);
    }
    shell.exec(`cp -r ${shellLink(staticDir + "/" + moduleName)} ${shellLink(staticFolder)}`);

    console.log(`set static`);

    let svgTongString, generalString, consoleGeneralString, execString, fileString, svgTongItemsString, s3String, sseString, sseConsoleString, polyfillString;
    let code0, code1, code2, code3;
    let result;
    let prototypes, dataPatchScript, prototypeBoo;
    let finalMinifyObj, finalMinifyString;
    let resultFromArr;

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
    resultFromArr = [];
    for (let i of staticDirList) {

      result = '';
      code0 = '';
      code1 = '';
      svgTongItemsString = null;

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
      resultFromArr.push(`${staticFolder}/${i}`);

    }

    return resultFromArr;

  } catch (e) {
    console.log(e);
  }
}

DataConsole.prototype.renderMiddleStatic = async function (staticFolder, address, DataPatch, DataMiddle, isGhost) {
  const instance = this;
  const { minify } = require("terser");
  const generalMap = require(`${process.cwd()}/apps/mapMaker/map/general.js`);
  const { fileSystem, shell, shellLink, babelSystem, treeParsing } = this.mother;
  // const S3HOST = this.address.s3info.host;
  const S3HOST = this.address.homeinfo.ghost.protocol + "://" + this.address.homeinfo.ghost.host;
  const SSEHOST = (isGhost ? this.address.backinfo.host : address.host);
  const SSEHOST_CONSOLE = this.address.backinfo.host;
  const GHOSTHOST = this.address.homeinfo.ghost.host;
  try {

    //set static
    const staticDir = `${this.dir}/router/source/middle`;
    const staticDirList_raw = await fileSystem(`readDir`, [ staticDir ]);
    const staticDirList = staticDirList_raw.filter((fileName) => { return !(([ ".DS_Store", "module" ]).includes(fileName)); });
    const homeDirList = await fileSystem(`readDir`, [ process.env.HOME ]);
    if (!homeDirList.includes(staticFolder.split('/')[staticFolder.split('/').length - 1])) {
      await fileSystem(`mkdir`, [ staticFolder ]);
    }
    const targetStaticFolder = await fileSystem(`readDir`, [ staticFolder ]);
    if (!targetStaticFolder.includes(`middle`)) {
      await fileSystem(`mkdir`, [ `${staticFolder}/middle` ]);
    }
    console.log(`set middle static`);

    let svgTongString, generalString, consoleGeneralString, execString, fileString, svgTongItemsString, s3String, sseString, sseConsoleString, polyfillString;
    let code0, code1, code2, code3;
    let result, moduleString;
    let prototypes, dataPatchScript, prototypeBoo;
    let finalMinifyObj, finalMinifyString;
    let generalSvg;
    let treeArray;
    let moduleBoo;
    let moduleTrans;
    let totalModuleObjectConst;
    let resultFromArr;
    let tempArr;
    let tempMediaResult;

    //module transform
    moduleTrans = async function (tree, name) {
      try {
        const thisModuleDir = await fileSystem(`readDir`, [ instance.middleModuleDir + "/" + name ]);
        const { flatDeath } = tree;
        const render = function (code) {
          let totalModuleObjectConst;
          code = code.replace(/\$CURRENT_DIR_ARRAY/g, JSON.stringify(thisModuleDir));

          totalModuleObjectConst = "TOTAL_MODULEOBJECT_" + String((new Date()).valueOf()) + String(Math.round(Math.random() * 100000));
          code = code.replace(/(const |let | )([^ ]+) \= require\(([\"\'])([^\n\;]+)/g, (match, p1, p2, p3, p4, offset, string) => {
            return `const ${totalModuleObjectConst} = await import(${p3}/middle/module/${name}${p4.replace(/\.js/i, ".mjs")}; ${p1}${p2} = ${totalModuleObjectConst}[Object.keys(${totalModuleObjectConst})[0]];`;
          });

          code = code.replace(/module\.exports = ([^\=\;\/\n]+)/i, (match, p1, offset, string) => { return "export { " + p1 + " }"; });
          return code;
        }
        const from = tree.fromDir.replace(/\/$/gi, '');
        const to = tree.toDir.replace(/\/$/gi, '');
        let fileTargets;
        let targetPath, targetFolder;
        let resultFromArr;
        flatDeath.sort((a, b) => { return a.length - b.length });
        resultFromArr = [];
        for (let { directory, absolute } of flatDeath) {
          if (!directory) {
            if (!/\.DS_Store/g.test(absolute)) {
              targetPath = to + '/' + absolute.split('/').slice(from.split('/').length).join('/');
              targetPath = targetPath.replace(/\.js$/i, ".mjs");
              targetFolder = targetPath.split('/').slice(0, -1).join('/');
              if (!(await fileSystem(`exist`, [ targetFolder ]))) {
                await fileSystem(`mkdir`, [ targetFolder ]);
              }
              await fileSystem(`write`, [ targetPath, render(await fileSystem(`readString`, [ absolute ])) ]);
              resultFromArr.push(targetPath);
            }
          }
        }
        console.log(`${name} module render done`);
        return resultFromArr;
      } catch (e) {
        console.log(e);
      }
    }

    //set general js
    s3String = "const S3HOST = \"" + S3HOST + "\";";
    sseString = "const SSEHOST = \"" + SSEHOST + "\";";
    sseConsoleString = "const SSEHOST_CONSOLE = \"" + SSEHOST_CONSOLE + "\";";
    ghostString = "const GHOSTHOST = \"" + GHOSTHOST + "\";";
    svgTongString = await fileSystem(`readString`, [ `${process.cwd()}/apps/frontMaker/string/svgTong.js` ]);
    consoleGeneralString = await fileSystem(`readString`, [ `${this.dir}/router/source/general/general.js` ]);
    polyfillString = await fileSystem(`readString`, [ `${process.cwd()}/apps/frontMaker/source/jsGeneral/polyfill.js` ]);
    generalSvg = await fileSystem(`readString`, [ `${process.cwd()}/apps/mapMaker/svgTong/general_async.js` ]);
    generalSvg += "\n\n";
    generalSvg += await fileSystem(`readString`, [ `${process.cwd()}/apps/mapMaker/svgTong/general.js` ]);

    //write local js
    console.log(`set middle target :`, staticDirList);
    resultFromArr = [];
    for (let i of staticDirList) {

      result = '';
      code0 = '';
      code1 = '';
      svgTongItemsString = '';
      moduleBoo = false;

      fileString = await fileSystem(`readString`, [ `${staticDir}/${i}` ]);
      if (/\/<%map%>\//g.test(fileString)) {
        fileString = fileString.replace(/(\/<%map%>\/)/g, function (match, p1, offset, string) {
          return JSON.stringify(require(`${instance.dir}/router/source/svg/middle/map/${i}`), null, 2);
        });
        svgTongItemsString = await fileSystem(`readString`, [ `${this.dir}/router/source/svg/middle/svgTong/${i}` ]);
      }

      if (!/\/<%patch%>\//g.test(fileString)) {
        throw new Error("There is no patch, impossible");
      }

      //set data patch
      const { patch: onoffObj, meta, name, route } = JSON.parse(fileString.slice(0, [ ...fileString.matchAll(/%\/%\/g/g) ][0].index).replace(/\/<%patch%>\/ /gi, ''));

      //set meta info
      route.unshift(name);
      for (let routeName of route) {
        DataMiddle.setMetadata(routeName, meta);
        DataMiddle.setNamedata(routeName, name);
        DataMiddle.setNamedata(routeName + ".js", name);
      }
      moduleBoo = meta.module;

      //set browser js
      generalString = await fileSystem(`readString`, [ `${process.cwd()}/apps/frontMaker/source/jsGeneral/general.js` ]);
      generalString = generalString.replace(/(\/<%generalMap%>\/)/, function (match, p1, offset, string) {
        let generalObj_clone = JSON.parse(JSON.stringify(generalMap));
        for (let j in generalObj_clone.main.interaction) {
          if (!route.includes(j)) {
            delete generalObj_clone.main.interaction[j];
          }
        }
        return JSON.stringify(generalObj_clone, null, 2);
      });

      execString = await fileSystem(`readString`, [ `${this.dir}/router/source/general/middleExec.js` ]);
      execString = execString.replace(/\/<%name%>\//, (name.slice(0, 1).toUpperCase() + name.slice(1)));

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

      //set media query
      if (/<%%/gi.test(fileString)) {
        tempMediaResult = DataMiddle.mediaQuery(fileString);
        fileString = tempMediaResult.conditions + "\n\n" + tempMediaResult.code;
      }

      //merge
      code0 = s3String + "\n\n" + sseString + "\n\n" + sseConsoleString + "\n\n" + ghostString + "\n\n" + svgTongString + "\n\n" + generalSvg;
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
      if (moduleBoo) {
        totalModuleObjectConst = "TOTAL_MODULEOBJECT_" + String((new Date()).valueOf()) + String(Math.round(Math.random() * 100000));
        moduleString = code3.replace(/(const |let | )([^ ]+) \= require\(([\"\'])([^\n\;]+)/g, (match, p1, p2, p3, p4, offset, string) => {
          return `const ${totalModuleObjectConst} = await import(${p3}/middle/module/${i.replace(/\.js$/i, '')}${p4.replace(/\.js/i, ".mjs")}; ${p1}${p2} = ${totalModuleObjectConst}[Object.keys(${totalModuleObjectConst})[0]];`;
        });
      } else {
        result += "\n\n";
        result += code3;
      }
      result += "\n\n";

      // result = await babelSystem(result);
      // console.log(`${i} babel compile success`);
      // finalMinifyObj = await minify(polyfillString + "\n\n" + result, { mangle: { keep_classnames: true, keep_fnames: true } });
      // finalMinifyString = finalMinifyObj.code;
      // await fileSystem(`write`, [ `${staticFolder}/middle/${i}`, finalMinifyString ]);

      console.log(`${i}${moduleBoo ? "(module)": ""} merge success`);
      if (moduleBoo) {

        // finalMinifyObj = await minify(result, { mangle: { keep_classnames: true, keep_fnames: true } });
        // result = finalMinifyObj.code;
        // finalMinifyObj = await minify(moduleString, { mangle: { keep_classnames: true, keep_fnames: true } });
        // moduleString = finalMinifyObj.code;

        treeArray = await treeParsing(this.middleModuleDir + "/" + i.replace(/\.js$/i, ''));
        treeArray.setFromDir(this.middleModuleDir + "/" + i.replace(/\.js$/i, ''));
        treeArray.setToDir(staticFolder + "/middle/module/" + i.replace(/\.js$/i, ''));
        if (!(await fileSystem(`exist`, [ staticFolder + "/middle/module" ]))) {
          await fileSystem(`mkdir`, [ staticFolder + "/middle/module" ]);
        }
        if (!(await fileSystem(`exist`, [ treeArray.toDir ]))) {
          await fileSystem(`mkdir`, [ treeArray.toDir ]);
        }
        tempArr = await moduleTrans(treeArray, i.replace(/\.js$/i, ''));
        resultFromArr = resultFromArr.concat(tempArr);
        await fileSystem(`write`, [ `${staticFolder}/middle/${i.replace(/\.js$/i, '')}.js`, result ]);
        await fileSystem(`write`, [ `${staticFolder}/middle/${i.replace(/\.js$/i, '')}.mjs`, moduleString ]);
        resultFromArr.push(`${staticFolder}/middle/${i.replace(/\.js$/i, '')}.js`);
        resultFromArr.push(`${staticFolder}/middle/${i.replace(/\.js$/i, '')}.mjs`);

      } else {

        // finalMinifyObj = await minify(result, { mangle: { keep_classnames: true, keep_fnames: true } });
        // result = finalMinifyObj.code;

        await fileSystem(`write`, [ `${staticFolder}/middle/${i}`, result ]);
        resultFromArr.push(`${staticFolder}/middle/${i}`);

      }

    }

    return resultFromArr;

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
    let resultFromArr;

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
    resultFromArr = [];
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
        resultFromArr.push(staticFolder + "/" + b);
        console.log(`binary "${b}" download done`);
      }
    }
    return resultFromArr;
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

    //set human
    const HumanPacket = require(`${process.cwd()}/apps/humanPacket/humanPacket.js`);
    const humanInstance = new HumanPacket();

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
    const router = new DataRouter(DataPatch, DataMiddle, MONGOC, MONGOLOCALC, kakaoInstance, humanInstance, isGhost, isLocal);
    await router.setMembers();
    const rouObj = router.getAll();
    for (let obj of rouObj.get) {
      app.get(obj.link, obj.func);
    }
    if (isGhost) {
      if (obj.public !== true) {

      } else {

      }
      for (let obj of rouObj.post) {
        if (obj.public !== true) {
          app.post(obj.link, function (req, res) {
            let __ghostWallLogic, __ghostHost;
            __ghostWallLogic = false;
            __ghostHost = instance.address.homeinfo.ghost.host;
            if (typeof req.headers.referer === "string" && typeof req.headers.origin === "string") {
              __ghostWallLogic = (new RegExp(__ghostHost, "gi")).test(req.headers.referer) || (new RegExp(__ghostHost, "gi")).test(req.headers.origin);
            } else if (typeof req.headers.referer === "string") {
              __ghostWallLogic = (new RegExp(__ghostHost, "gi")).test(req.headers.referer);
            } else if (typeof req.headers.origin === "string") {
              __ghostWallLogic = (new RegExp(__ghostHost, "gi")).test(req.headers.origin);
            }
            if (!__ghostWallLogic) {
              res.set("Content-Type", "application/json");
              res.send(JSON.stringify({ message: "ok" }));
              return;
            } else {
              obj.func(req, res);
            }
          });
        } else {
          app.post(obj.link, obj.func);
        }
      }
    } else {
      for (let obj of rouObj.post) {
        app.post(obj.link, obj.func);
      }
    }
    console.log(`set router`);

    //set static
    await this.renderStatic(staticFolder, address, DataPatch, isGhost);
    if (DataMiddle !== null) {
      await this.renderMiddleStatic(staticFolder, address, DataPatch, DataMiddle, isGhost);
    }

    //set binary
    if (!/localhost/gi.test(address.host)) {
      // await this.setBinary();
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

DataConsole.prototype.staticUpload = async function (to = "ghost") {
  const instance = this;
  const { fileSystem, shell, shellLink, ghostFileUpload, sleep } = this.mother;
  const staticName = "static";
  const staticFolder = process.env.HOME + "/" + staticName;
  const DataMiddle = require(`${this.dir}/router/dataMiddle.js`);
  const DataPatch = require(`${this.dir}/router/dataPatch.js`);
  try {
    let address, isGhost;
    let tempObj, tempValue;
    let homeDir;
    let tempArr;
    let fromArr, toArr;

    if (to === "ghost") {
      tempObj = this.address["homeinfo"]["ghost"];
      tempObj.ip = {};
      tempObj.ip.outer = tempObj.outer;
      tempObj.ip.inner = tempObj.inner;
      tempObj.isGhost = true;
      address = tempObj;
    } else {
      throw new Error("not yet update");
    }

    homeDir = await fileSystem(`readDir`, [ process.env.HOME ]);
    tempValue = String((new Date()).valueOf()) + String(Math.round(Math.random() * 100000));
    if (homeDir.includes(staticName)) {
      shell.exec(`mv ${shellLink(process.env.HOME + "/" + staticName)} ${shellLink(process.env.HOME + "/" + staticName + "_" + tempValue)};`);
    }
    shell.exec(`mkdir ${shellLink(process.env.HOME + "/" + staticName)}`);

    fromArr = [];

    //set static
    tempArr = await this.renderStatic(staticFolder, address, DataPatch, isGhost);
    fromArr = fromArr.concat(tempArr);
    tempArr = await this.renderMiddleStatic(staticFolder, address, DataPatch, DataMiddle, isGhost);
    fromArr = fromArr.concat(tempArr);

    //set binary
    tempArr = await this.setBinary();
    fromArr = fromArr.concat(tempArr);

    toArr = [];
    for (let path of fromArr) {
      toArr.push(path.replace(new RegExp('^' + staticFolder, 'i'), '').replace(/^\//, ''));
    }

    console.log(fromArr, toArr);
    await ghostFileUpload(fromArr, toArr);

    for (let z = 0; z < 3; z++) {
      console.log(`static delete waiting... ${String(3 - z)}s`);
      await sleep(1000);
    }

    shell.exec(`rm -rf ${shellLink(process.env.HOME + "/" + staticName)};`);
    shell.exec(`mv ${shellLink(process.env.HOME + "/" + staticName + "_" + tempValue)} ${shellLink(process.env.HOME + "/" + staticName)};`);

    console.log(`static to ghost done`);

  } catch (e) {
    console.log(e);
  }
}

module.exports = DataConsole;
