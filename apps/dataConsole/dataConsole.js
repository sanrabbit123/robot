const DataConsole = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  this.address = require(`${process.cwd()}/apps/infoObj.js`);
  this.mother = new Mother();
  this.back = new BackMaker();
  this.dir = process.cwd() + "/apps/dataConsole";
  this.sourceDir = this.dir + "/router/source";
  this.middleDir = this.sourceDir + "/middle";
  this.ghostDir = this.sourceDir + "/ghost";
  this.frontDir = this.sourceDir + "/front";
  this.middleModuleDir = this.middleDir + "/module";
}

DataConsole.prototype.renderStatic = async function (staticFolder, address, DataPatch) {
  const instance = this;
  const { fileSystem, shell, shellLink, sleep, mediaQuery } = this.mother;
  const S3HOST = "https://" + this.address.officeinfo.ghost.host;
  const SSEHOST = address.host;
  const SSEHOST_CONSOLE = this.address.backinfo.host;
  const FILEHOST = this.address.officeinfo.ghost.host;
  const BRIDGEHOST = "https://" + this.address.transinfo.host + ":3000";
  const PYTHONHOST = "https://" + this.address.pythoninfo.host + ":3000";
  const LOGHOST = "https://" + this.address.testinfo.host + ":3000";
  const FRONTHOST = "https://" + this.address.frontinfo.host;
  const BACKHOST = "https://" + this.address.backinfo.host + ":3000";
  const SECONDHOST = "https://" + this.address.secondinfo.host + ":3000";
  const classException = {
    proposal: [ "designer.js" ],
    bill: [ "designer.js" ],
  };
  try {

    //set static
    const moduleName = "module";
    const staticDir = `${this.dir}/router/source/local`;
    const staticDirList_raw = await fileSystem(`readDir`, [ staticDir ]);
    const staticDirList = staticDirList_raw.filter((fileName) => { return !(([ ".DS_Store", moduleName ]).includes(fileName)); });
    const homeDirList = await fileSystem(`readDir`, [ process.env.HOME ]);
    let folderSize, tempScriptString;
    let tempMediaResult;
    let subModuleList;

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
    shell.exec(`mkdir ${shellLink(staticFolder)}/${shellLink(moduleName)}`);

    const staticModuleFolderList = await fileSystem(`readDir`, [ staticFolder + "/" + moduleName ]);

    for (let i of staticDirList) {
      if (!staticModuleFolderList.includes(i.replace(/\.js/gi, ''))) {
        shell.exec(`mkdir ${shellLink(staticFolder)}/${shellLink(moduleName)}/${shellLink(i.replace(/\.js/gi, ''))}`);
      }
    }

    for (let i of staticDirList) {

      //self module
      tempScriptString = await fileSystem(`readString`, [ `${staticDir}/${i}` ]);
      tempScriptString = tempScriptString.replace(/^const ([A-Z][^ \=]+) = function \(/, (match, p1, offset, string) => {
        return p1 + ".prototype.constructor = function (";
      });
      tempScriptString = tempScriptString.replace(/\.prototype\.launching = /g, ".prototype.launching_pastFunction = ");
      if (/<%%/gi.test(tempScriptString)) {
        tempMediaResult = mediaQuery(tempScriptString);
        tempScriptString = tempMediaResult.conditions + "\n\n" + tempMediaResult.code;
      }
      while (!(await fileSystem(`exist`, [ `${staticFolder}/${moduleName}/${i.replace(/\.js/gi, '')}` ]))) {
        console.log("waiting....");
        await sleep(500);
      }
      await fileSystem(`write`, [ `${staticFolder}/${moduleName}/${i.replace(/\.js/gi, '')}/${i}`, tempScriptString ]);

      //sub module
      if (await fileSystem(`exist`, [ `${staticDir}/${moduleName}/${i.replace(/\.js/gi, '')}` ])) {
        subModuleList = await fileSystem(`readDir`, [ `${staticDir}/${moduleName}/${i.replace(/\.js/gi, '')}` ]);
        subModuleList = subModuleList.filter((f) => { return f !== `.DS_Store`; });
        for (let subFile of subModuleList) {
          tempScriptString = await fileSystem(`readString`, [ `${staticDir}/${moduleName}/${i.replace(/\.js/gi, '')}/${subFile}` ]);
          if (/<%%/gi.test(tempScriptString)) {
            tempMediaResult = mediaQuery(tempScriptString);
            tempScriptString = tempMediaResult.conditions + "\n\n" + tempMediaResult.code;
          }
          await fileSystem(`write`, [ `${staticFolder}/${moduleName}/${i.replace(/\.js/gi, '')}/${subFile}`, tempScriptString ]);
        }
      }

    }

    console.log(`set static`);

    let svgTongString, generalString, consoleGeneralString, execString, fileString, svgTongItemsString, s3String, sseString, sseConsoleString, polyfillString, classString, pythonString, bridgeString, frontWebString, officeString, logString, backString, secondString;
    let code0, code1, code2, code3;
    let result;
    let prototypes, dataPatchScript, prototypeBoo;
    let resultFromArr;

    //set general js
    s3String = "const S3HOST = \"" + S3HOST + "\";";
    sseString = "const SSEHOST = \"" + SSEHOST + "\";";
    sseConsoleString = "const SSEHOST_CONSOLE = \"" + SSEHOST_CONSOLE + "\";";
    pythonString = "const PYTHONHOST = \"" + PYTHONHOST + "\";";
    bridgeString = "const BRIDGEHOST = \"" + BRIDGEHOST + "\";";
    logString = "const LOGHOST = \"" + LOGHOST + "\";";
    frontWebString = "const FRONTHOST = \"" + FRONTHOST + "\";";
    backString = "const BACKHOST = \"" + BACKHOST + "\";";
    secondString = "const SECONDHOST = \"" + SECONDHOST + "\";";
    officeString = "const FILEHOST = \"" + FILEHOST + "\";";
    svgTongString = await fileSystem(`readString`, [ `${process.cwd()}/apps/frontMaker/string/svgTong.js` ]);
    generalString = await fileSystem(`readString`, [ `${process.cwd()}/apps/frontMaker/source/jsGeneral/general.js` ]);
    consoleGeneralString = await fileSystem(`readString`, [ `${this.dir}/router/source/general/general.js` ]);

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

      if (await fileSystem(`exist`, [ `${this.dir}/router/source/class/${i}` ])) {
        classString = await fileSystem(`readString`, [ `${this.dir}/router/source/class/${i}` ]);
        fileString = classString.replace(/module\.exports \= [^\n]+/gi, '') + "\n\n" + fileString;
      }
      if (classException[i.replace(/\.js$/, '')] !== undefined) {
        for (let add of classException[i.replace(/\.js$/, '')]) {
          classString = await fileSystem(`readString`, [ `${this.dir}/router/source/class/${add}` ]);
          fileString = classString.replace(/module\.exports \= [^\n]+/gi, '') + "\n\n" + fileString;
        }
      }

      //set data patch
      prototypes = Object.keys(DataPatch.prototype);
      dataPatchScript = `const DataPatch = new Function();\n`;
      for (let p of prototypes) {
        if ((new RegExp("^" + i.trim().replace(/\.js/gi, ''))).test(p) || /^tools/.test(p)) {
          dataPatchScript += `DataPatch.${p} = ${DataPatch.prototype[p].toString().replace(/\n/g, '')};\n`;
        }
      }

      //merge
      code0 = svgTongString + "\n\n" + s3String + "\n\n" + sseString + "\n\n" + sseConsoleString + "\n\n" + pythonString + "\n\n" + bridgeString + "\n\n" + logString + "\n\n" + backString + "\n\n" + secondString + "\n\n" + frontWebString + "\n\n" + officeString + "\n\n";
      code1 = dataPatchScript;
      code2 = generalString + "\n\n" + consoleGeneralString;
      code3 = fileString + "\n\n" + execString;

      //set media query
      if (/<%%/gi.test(code2)) {
        tempMediaResult = mediaQuery(code2);
        code2 = tempMediaResult.code;
      }
      if (/<%%/gi.test(code3)) {
        tempMediaResult = mediaQuery(code3);
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
      await fileSystem(`write`, [ `${staticFolder}/${i}`, result ]);
      resultFromArr.push(`${staticFolder}/${i}`);

    }

    return resultFromArr;

  } catch (e) {
    console.log(e);
  }
}

DataConsole.prototype.renderMiddleStatic = async function (staticFolder, address, DataPatch, DataMiddle, mini = false) {
  const instance = this;
  const { fileSystem, shell, shellLink, treeParsing, mediaQuery } = this.mother;
  const { minify } = require("terser");
  const S3HOST = "https://" + this.address.officeinfo.ghost.host;
  const SSEHOST = address.host;
  const SSEHOST_CONSOLE = this.address.backinfo.host;
  const FILEHOST = this.address.officeinfo.ghost.host;
  const PYTHONHOST = "https://" + this.address.pythoninfo.host + ":3000";
  const BRIDGEHOST = "https://" + this.address.transinfo.host + ":3000";
  const LOGHOST = "https://" + this.address.testinfo.host + ":3000";
  const FRONTHOST = "https://" + this.address.frontinfo.host;
  const BACKHOST = "https://" + this.address.backinfo.host + ":3000";
  const SECONDHOST = "https://" + this.address.secondinfo.host + ":3000";
  try {

    //module transform function
    const moduleTrans = async function (tree, name) {
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

    //set static
    const staticTargets = [
      `${this.dir}/router/source/middle`,
      `${this.dir}/router/source/ghost/client`,
      `${this.dir}/router/source/ghost/designer`,
    ];
    const homeDirList = await fileSystem(`readDir`, [ process.env.HOME ]);
    if (!homeDirList.includes(staticFolder.split('/')[staticFolder.split('/').length - 1])) {
      await fileSystem(`mkdir`, [ staticFolder ]);
    }
    const targetStaticFolder = await fileSystem(`readDir`, [ staticFolder ]);
    if (!targetStaticFolder.includes(`middle`)) {
      await fileSystem(`mkdir`, [ `${staticFolder}/middle` ]);
    }
    console.log(`set middle static`);

    let staticDirList;
    let staticTempDir, staticTempDirList_raw, staticTempDirList;
    let svgTongString, generalString, consoleGeneralString, execString, fileString, svgTongItemsString, s3String, sseString, sseConsoleString, polyfillString, pythonString, frontClassString, bridgeString, frontWebString, officeString, logString, backString, secondString;;
    let code0, code1, code2, code3;
    let result, moduleString;
    let prototypes, dataPatchScript, prototypeBoo;
    let treeArray;
    let moduleBoo;
    let totalModuleObjectConst;
    let resultFromArr;
    let tempArr;
    let tempMediaResult;
    let ghostClientGeneral, ghostDesignerGeneral;
    let ghostClientGeneralString, ghostDesignerGeneralString;
    let generalMediaBoo;

    staticDirList = [];
    for (let s of staticTargets) {
      staticTempDir = s;
      staticTempDirList_raw = await fileSystem(`readDir`, [ staticTempDir ]);
      staticTempDirList_raw = staticTempDirList_raw.filter((fileName) => { return !(([ ".DS_Store", "module" ]).includes(fileName)); });
      staticTempDirList = staticTempDirList_raw.map((fileName) => { return { dir: staticTempDir, file: fileName, kinds: (/apps\/dataConsole\/router\/source\/ghost\/client/g.test(staticTempDir) ? "GHOST:CLIENT" : (/apps\/dataConsole\/router\/source\/ghost\/designer/g.test(staticTempDir) ? "GHOST:DESIGNER" : "MIDDLE")) }; });
      staticDirList = staticDirList.concat(staticTempDirList);
    }
    ghostClientGeneralString = '';
    ghostDesignerGeneralString = '';
    for (let { kinds, dir, file } of staticDirList) {
      if (kinds === "GHOST:CLIENT") {
        if (file === "general.js") {
          ghostClientGeneral = dir + "/" + file;
          ghostClientGeneralString = await fileSystem(`readString`, [ ghostClientGeneral ]);
        }
      } else if (kinds === "GHOST:DESIGNER") {
        if (file === "general.js") {
          ghostDesignerGeneral = dir + "/" + file;
          ghostDesignerGeneralString = await fileSystem(`readString`, [ ghostDesignerGeneral ]);
        }
      }
    }
    staticDirList = staticDirList.filter((obj) => { return !(obj.file === "general.js" && /^GHOST/.test(obj.kinds)); });

    //set general js
    s3String = "const S3HOST = \"" + S3HOST + "\";";
    sseString = "const SSEHOST = \"" + SSEHOST + "\";";
    sseConsoleString = "const SSEHOST_CONSOLE = \"" + SSEHOST_CONSOLE + "\";";
    pythonString = "const PYTHONHOST = \"" + PYTHONHOST + "\";";
    bridgeString = "const BRIDGEHOST = \"" + BRIDGEHOST + "\";";
    logString = "const LOGHOST = \"" + LOGHOST + "\";";
    backString = "const BACKHOST = \"" + BACKHOST + "\";";
    secondString = "const SECONDHOST = \"" + SECONDHOST + "\";";
    frontWebString = "const FRONTHOST = \"" + FRONTHOST + "\";";
    officeString = "const FILEHOST = \"" + FILEHOST + "\";";
    svgTongString = await fileSystem(`readString`, [ `${process.cwd()}/apps/frontMaker/string/svgTong.js` ]);
    consoleGeneralString = await fileSystem(`readString`, [ `${this.dir}/router/source/general/general.js` ]);
    polyfillString = await fileSystem(`readString`, [ `${process.cwd()}/apps/frontMaker/source/jsGeneral/polyfill.js` ]);

    //write local js
    console.log(`set middle target :`, staticDirList);
    resultFromArr = [];
    for (let { file: i, dir: staticDir, kinds } of staticDirList) {

      result = '';
      code0 = '';
      code1 = '';
      svgTongItemsString = '';
      moduleBoo = false;

      fileString = await fileSystem(`readString`, [ `${staticDir}/${i}` ]);

      if (!/\/<%patch%>\//g.test(fileString)) {
        throw new Error("There is no patch, impossible");
      }

      //set data patch
      const { patch: onoffObj, class: classOnOffObj, meta, name, route } = JSON.parse(fileString.slice(0, [ ...fileString.matchAll(/%\/%\/g/g) ][0].index).replace(/\/<%patch%>\/ /gi, ''));

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

      execString = await fileSystem(`readString`, [ `${this.dir}/router/source/general/middleExec.js` ]);
      execString = execString.replace(/\/<%name%>\//, (name.slice(0, 1).toUpperCase() + name.slice(1)));

      fileString = fileString.slice([ ...fileString.matchAll(/%\/%\/g/g) ][0].index + String("%/%/g").length + 1);

      //set data patch
      prototypes = Object.keys(DataPatch.prototype);
      dataPatchScript = `const DataPatch = new Function();\n`;
      if (onoffObj.entire) {
        for (let z of prototypes) {
          dataPatchScript += `DataPatch.${z} = ${DataPatch.prototype[z].toString().replace(/\n/g, '')};\n`;
        }
      } else {
        for (let z of prototypes) {
          prototypeBoo = /^tools/.test(z);
          for (let j in onoffObj) {
            if (onoffObj[j] && !prototypeBoo) {
              prototypeBoo = (new RegExp("^" + j)).test(z);
            }
          }
          if (prototypeBoo) {
            dataPatchScript += `DataPatch.${z} = ${DataPatch.prototype[z].toString().replace(/\n/g, '')};\n`;
          }
        }
      }

      //front class set
      frontClassString = '';
      for (let c in classOnOffObj) {
        if (classOnOffObj[c]) {
          frontClassString += (await fileSystem(`readString`, [ `${this.dir}/router/source/class/${c}.js` ])).replace(/module\.exports = [^\n]+/gi , '');
          frontClassString += "\n\n";
        }
      }

      //merge
      code0 = svgTongString + "\n\n" + s3String + "\n\n" + sseString + "\n\n" + sseConsoleString + "\n\n" + pythonString + "\n\n" + bridgeString + "\n\n" + logString + "\n\n" + backString + "\n\n" + secondString + "\n\n" + frontWebString + "\n\n" + officeString + "\n\n";
      code1 = dataPatchScript + "\n\n";
      if (kinds === "MIDDLE") {
        code2 = generalString + "\n\n" + consoleGeneralString + "\n\n" + frontClassString + "\n\n";
      } else {
        if (/CLIENT/gi.test(kinds)) {
          code2 = generalString + "\n\n" + consoleGeneralString + "\n\n" + ghostClientGeneralString + "\n\n" + frontClassString + "\n\n";
        } else {
          code2 = generalString + "\n\n" + consoleGeneralString + "\n\n" + ghostDesignerGeneralString + "\n\n" + frontClassString + "\n\n";
        }
      }
      code3 = fileString + "\n\n" + execString;

      //set media query
      generalMediaBoo = false;
      if (/<%%/gi.test(code2)) {
        tempMediaResult = mediaQuery(code2);
        code2 = tempMediaResult.code + "\n\n" + tempMediaResult.conditions;
        generalMediaBoo = true;
      }
      if (/<%%/gi.test(code3)) {
        tempMediaResult = mediaQuery(code3);
        if (generalMediaBoo) {
          code3 = tempMediaResult.code;
        } else {
          code3 = tempMediaResult.conditions + "\n\n" + tempMediaResult.code;
        }
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

      console.log(`${i}${moduleBoo ? "(module)": ""} merge success`);
      if (moduleBoo) {

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

        if (mini) {
          result = (await minify(result, {
            mangle: false,
            keep_classnames: true,
            keep_fnames: true
          })).code;
        }

        await fileSystem(`write`, [ `${staticFolder}/middle/${i}`, result ]);
        resultFromArr.push(`${staticFolder}/middle/${i}`);

      }

    }

    return resultFromArr;

  } catch (e) {
    console.log(e);
  }
}

DataConsole.prototype.renderFrontPhp = async function () {
  const instance = this;
  const { fileSystem, shellLink, shellExec, equalJson, requestSystem, consoleQ } = this.mother;
  const { ghostDir } = this;
  const address = this.address;
  const staticFolder = process.env.HOME + "/static";
  const staticMiddleFolder = staticFolder + "/middle";
  const frontDir = this.frontDir + "/client";
  const DataPatch = require(`${this.dir}/router/dataPatch.js`);
  const DataMiddle = require(`${this.dir}/router/dataMiddle.js`);
  try {
    await this.renderMiddleStatic(staticFolder, address.backinfo, DataPatch, DataMiddle, true);
    const targetMap = [
      { from: "clientConsulting", to: "consulting", path: "/middle/consulting" },
      { from: "aspirantExplanation", to: "aspirant", path: "/middle/aspirantExplanation" },
      { from: "frontIndex", to: "index", path: "/middle/frontIndex" },
      { from: "portfolioList", to: "portfolio", path: "/middle/portfolioList" },
      { from: "portfolioDetail", to: "portdetail", path: "/middle/portfolioDetail" },
      { from: "reviewList", to: "review", path: "/middle/reviewList" },
      { from: "reviewDetail", to: "revdetail", path: "/middle/reviewDetail" },
      { from: "designerList", to: "designer", path: "/middle/designerList" },
      { from: "designerDetail", to: "desdetail", path: "/middle/designerDetail" },
      { from: "frontAbout", to: "about", path: "/middle/frontAbout" },
      { from: "frontFaq", to: "faq", path: "/middle/frontFaq" },
      { from: "frontTerms", to: "terms", path: "/middle/frontTerms" },
      { from: "frontNotfound", to: "notfound", path: "/middle/frontNotfound" },
      { from: "miniAbout", to: "miniAbout", path: "/middle/miniAbout" },
      { from: "styleCuration", to: "curation", path: "/middle/styleCuration" },
      { from: "designerProposal", to: "proposal", path: "/middle/designerProposal" },
      { from: "firstMeeting", to: "meeting", path: "/middle/firstMeeting" },
      { from: "universalEstimation", to: "estimation", path: "/middle/universalEstimation" },
      { from: "magazineDetail", to: "magdetail", path: "/middle/magazineDetail" },
      { from: "magazineList", to: "magazine", path: "/middle/magazineList" },
      { from: "aboutService", to: "magnetic", path: "/middle/aboutService" },
      { from: "contractCaution", to: "caution", path: "/middle/contractCaution" },
      { from: "styleParts", to: "styleparts", path: "/middle/styleParts" },
      { from: "projectDetail", to: "project", path: "/middle/projectDetail" },
      { from: "serviceDetail", to: "service", path: "/middle/serviceDetail" },
    ];
    const ghostTargets = (await fileSystem(`readDir`, [ ghostDir + "/client" ])).filter((str) => { return str !== ".DS_Store" }).filter((str) => {
      const fromArr = targetMap.map((obj) => { return obj.from });
      return fromArr.includes(str.replace(/\.js$/i, ''));
    }).map((str) => {
      const o = targetMap.find((obj) => { return obj.from === str.replace(/\.js$/i, '') });
      o.file = `${staticMiddleFolder}/${str}`;
      o.php = `${frontDir}/${str.replace(/\.js$/i, ".php")}`;
      return o;
    });
    let targetScript, response, html;
    let motherTong, middleTong;
    let command;
    let input;
    let phpScript;
    let generalPhpScript;

    motherTong = [];
    middleTong = [];
    for (let { from, to, file, php, path } of ghostTargets) {
      targetScript = await fileSystem(`readString`, [ file ]);
      targetScript = targetScript.replace(/ajaxJson\((\{[^}]*\}[^}]*\}?, ?)(\"[^\"]+\")/gi, (original, p1, p2) => {
        if (/^[\"\']http/.test(p2)) {
          return original;
        } else {
          return `ajaxJson(${p1}"https://${address.backinfo.host}" + ${p2}`;
        }
      });

      phpScript = await fileSystem(`readString`, [ php ]);

      await fileSystem(`write`, [ `${process.cwd()}/temp/${from}.js`, targetScript ]);
      middleTong.push(`${shellLink(process.cwd())}/temp/${shellLink(from)}.js`);
      await fileSystem(`write`, [ `${process.cwd()}/temp/${to}.php`, phpScript ]);
      motherTong.push(`${shellLink(process.cwd())}/temp/${shellLink(to)}.php`);
    }

    console.log("middle :", middleTong);
    console.log("mother :", motherTong);

    command = middleTong.map((p) => {
      return `scp ${p} ${address.frontinfo.user}@${address.frontinfo.host}:/${address.frontinfo.user}/www/middle/`;
    }).concat(motherTong.map((p) => {
      return `scp ${p} ${address.frontinfo.user}@${address.frontinfo.host}:/${address.frontinfo.user}/www/`;
    })).join(';');

    generalPhpScript = await fileSystem(`readString`, [ frontDir + "/general.php" ]);
    generalPhpScript = generalPhpScript.replace(/__host__/gi, address.frontinfo.host);
    generalPhpScript = generalPhpScript.replace(/__secondHost__/gi, address.secondinfo.host + ":3000");
    generalPhpScript = generalPhpScript.replace(/__logHost__/gi, address.testinfo.host + ":3000");
    generalPhpScript = generalPhpScript.replace(/__backHost__/gi, address.backinfo.host + ":3000");
    generalPhpScript = generalPhpScript.replace(/__user__/gi, address.frontinfo.user);
    generalPhpScript = generalPhpScript.replace(/__password__/gi, address.frontinfo.password);
    generalPhpScript = generalPhpScript.replace(/__database__/gi, address.frontinfo.database);
    await fileSystem(`write`, [ `${process.cwd()}/temp/general.php`, generalPhpScript ]);

    command += `;scp ${process.cwd()}/temp/general.php ${address.frontinfo.user}@${address.frontinfo.host}:/${address.frontinfo.user}/www/;`;

    console.log(command);

    input = await consoleQ(`is it OK? : (if no problem, press 'ok')\n`);
    if (input === "done" || input === "a" || input === "o" || input === "ok" || input === "OK" || input === "Ok" || input === "oK" || input === "yes" || input === "y" || input === "yeah" || input === "Y") {
      await shellExec(command);
      console.log(`front update done`);
    }

  } catch (e) {
    console.log(e);
  }
}

DataConsole.prototype.renderDesignerPhp = async function () {
  const instance = this;
  const { fileSystem, shellLink, shellExec, equalJson, requestSystem, consoleQ } = this.mother;
  const { ghostDir } = this;
  const address = this.address;
  const staticFolder = process.env.HOME + "/static";
  const staticMiddleFolder = staticFolder + "/middle";
  const frontClientDir = this.frontDir + "/client";
  const frontDir = this.frontDir + "/designer";
  const DataPatch = require(`${this.dir}/router/dataPatch.js`);
  const DataMiddle = require(`${this.dir}/router/dataMiddle.js`);
  try {
    await this.renderMiddleStatic(staticFolder, address.backinfo, DataPatch, DataMiddle, true);
    const targetMap = [
      { from: "designerAbout", to: "about", path: "/middle/designerAbout" },
      { from: "designerBoard", to: "dashboard", path: "/middle/designerBoard" },
      { from: "designerReport", to: "report", path: "/middle/designerReport" },
      { from: "requestDetail", to: "request", path: "/middle/requestDetail" },
      { from: "requestList", to: "requests", path: "/middle/requestList" },
      { from: "designerLogin", to: "login", path: "/middle/designerLogin" },
      { from: "designManual", to: "manual", path: "/middle/designManual" },
      { from: "designerPossible", to: "possible", path: "/middle/designerPossible" },
      { from: "partnershipManual", to: "partnership", path: "/middle/partnershipManual" },
      { from: "processDetail", to: "process", path: "/middle/processDetail" },
    ];
    const ghostTargets = (await fileSystem(`readDir`, [ ghostDir + "/designer" ])).filter((str) => { return str !== ".DS_Store" }).filter((str) => {
      const fromArr = targetMap.map((obj) => { return obj.from });
      return fromArr.includes(str.replace(/\.js$/i, ''));
    }).map((str) => {
      const o = targetMap.find((obj) => { return obj.from === str.replace(/\.js$/i, '') });
      o.file = `${staticMiddleFolder}/${str}`;
      o.php = `${frontDir}/${str.replace(/\.js$/i, ".php")}`;
      return o;
    });
    let targetScript, response, html;
    let motherTong, middleTong;
    let command;
    let input;
    let phpScript;
    let generalPhpScript;

    motherTong = [];
    middleTong = [];
    for (let { from, to, file, php, path } of ghostTargets) {
      targetScript = await fileSystem(`readString`, [ file ]);
      targetScript = targetScript.replace(/ajaxJson\((\{[^}]*\}[^}]*\}?, ?)(\"[^\"]+\")/gi, (original, p1, p2) => {
        if (/^[\"\']http/.test(p2)) {
          return original;
        } else {
          return `ajaxJson(${p1}"https://${address.backinfo.host}" + ${p2}`;
        }
      });

      phpScript = await fileSystem(`readString`, [ php ]);

      await fileSystem(`write`, [ `${process.cwd()}/temp/${from}.js`, targetScript ]);
      middleTong.push(`${shellLink(process.cwd())}/temp/${shellLink(from)}.js`);
      await fileSystem(`write`, [ `${process.cwd()}/temp/${to}.php`, phpScript ]);
      motherTong.push(`${shellLink(process.cwd())}/temp/${shellLink(to)}.php`);
    }

    console.log("middle :", middleTong);
    console.log("mother :", motherTong);

    command = middleTong.map((p) => {
      return `scp ${p} ${address.frontinfo.user}@${address.frontinfo.host}:/${address.frontinfo.user}/www/middle/`;
    }).concat(motherTong.map((p) => {
      return `scp ${p} ${address.frontinfo.user}@${address.frontinfo.host}:/${address.frontinfo.user}/www/designer/`;
    })).join(';');

    generalPhpScript = await fileSystem(`readString`, [ frontClientDir + "/general.php" ]);
    generalPhpScript = generalPhpScript.replace(/__host__/gi, address.frontinfo.host);
    generalPhpScript = generalPhpScript.replace(/__secondHost__/gi, address.secondinfo.host + ":3000");
    generalPhpScript = generalPhpScript.replace(/__logHost__/gi, address.testinfo.host + ":3000");
    generalPhpScript = generalPhpScript.replace(/__backHost__/gi, address.backinfo.host + ":3000");
    generalPhpScript = generalPhpScript.replace(/__user__/gi, address.frontinfo.user);
    generalPhpScript = generalPhpScript.replace(/__password__/gi, address.frontinfo.password);
    generalPhpScript = generalPhpScript.replace(/__database__/gi, address.frontinfo.database);
    await fileSystem(`write`, [ `${process.cwd()}/temp/general.php`, generalPhpScript ]);

    command += `;scp ${process.cwd()}/temp/general.php ${address.frontinfo.user}@${address.frontinfo.host}:/${address.frontinfo.user}/www/designer/;`;

    console.log(command);

    input = await consoleQ(`is it OK? : (if no problem, press 'ok')\n`);
    if (input === "done" || input === "a" || input === "o" || input === "ok" || input === "OK" || input === "Ok" || input === "oK" || input === "yes" || input === "y" || input === "yeah" || input === "Y") {
      await shellExec(command);
      console.log(`front update done`);
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
          if (!/middle/gi.test(i.split('_')[1]) && !/ghost/gi.test(i.split('_')[1])) {
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

DataConsole.prototype.readGhostPatch = async function () {
  const instance = this;
  const { fileSystem } = this.mother;
  try {
    const ghostTargetsDir = `${this.ghostDir}/client`;
    const ghostTargets = (await fileSystem("readDir", [ ghostTargetsDir ])).filter((str) => { return str !== ".DS_Store" && str !== "general.js" }).map((str) => { return `${ghostTargetsDir}/${str}`; });
    const readHead = async (path) => {
      try {
        let raw, patch;
        raw = await fileSystem("readHead", [ path, 50 ]);
        patch = JSON.parse(raw.slice(0, [ ...raw.matchAll(/%\/%\/g/g) ][0].index).replace(/\/<%patch%>\/ /gi, ''));
        return patch;
      } catch (e) {
        return {};
      }
    }
    class GhostPatch extends Array {
      constructor(arr) {
        super();
        for (let obj of arr) {
          this.push(obj);
        }
        for (let obj of arr) {
          this[obj.name] = obj;
        }
      }

      getHangulNames() {
        let tong = [];
        for (let obj of this) {
          tong[obj.name] = obj.hangul;
        }
        return tong;
      }

      getMetaObject() {
        let obj = {};
        for (let o of this) {
          obj[o.name] = o.meta;
        }
        return obj;
      }

    }
    let tong;

    tong = [];
    for (let target of ghostTargets) {
      tong.push(await readHead(target));
    }

    return new GhostPatch(tong);
  } catch (e) {
    console.log(e);
  }
}

DataConsole.prototype.connect = async function () {
  const instance = this;
  const { fileSystem, shell, shellLink, mongo, mongoinfo, mongolocalinfo, mongoconsoleinfo, errorLog } = this.mother;
  const PORT = 3000;
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
    console.log(`\x1b[36m\x1b[1m%s\x1b[0m`, `launching console in ${name} ${isTest ? "(test mode) " : ""}==============`);
    console.log(``);

    //set mongo connetion
    let MONGOC, MONGOLOCALC;
    if (/localhost/gi.test(address.host) || address.host === this.address.officeinfo.ghost.host || isTest) {
      isLocal = true;
      MONGOC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
      console.log(`\x1b[33m%s\x1b[0m`, `set DB server => 127.0.0.1`);
      MONGOLOCALC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
      console.log(`\x1b[33m%s\x1b[0m`, `set SSE server => 127.0.0.1`);
    } else {
      await this.back.setInfoObj({ getMode: false });
      isLocal = false;
      MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
      console.log(`\x1b[33m%s\x1b[0m`, `set DB server => ${this.address.mongoinfo.host}`);
      MONGOLOCALC = new mongo(mongoconsoleinfo, { useUnifiedTopology: true });
      console.log(`\x1b[33m%s\x1b[0m`, `set SSE server => ${this.address.backinfo.host}`);
    }
    console.log(``);

    await MONGOC.connect();
    await MONGOLOCALC.connect();

    //set kakao
    const KakaoTalk = require(`${process.cwd()}/apps/kakaoTalk/kakaoTalk.js`);
    const kakaoInstance = new KakaoTalk();

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
    const DataPatch = require(`${this.dir}/router/dataPatch.js`);
    const DataMiddle = require(`${this.dir}/router/dataMiddle.js`);
    const DataRouter = await this.mergeRouter(DataMiddle !== null);
    const router = new DataRouter(DataPatch, DataMiddle, MONGOC, MONGOLOCALC, kakaoInstance, humanInstance, isLocal);
    await router.setMembers();
    const rouObj = router.getAll();
    for (let obj of rouObj.get) {
      app.get(obj.link, obj.func);
    }
    for (let obj of rouObj.post) {
      if (obj.public !== true) {
        app.post(obj.link, function (req, res) {
          let __wallLogicBoo, __vailHosts, __authorization, __originTarget, __headers, __slackMessage;

          __vailHosts = [
            instance.address.frontinfo.host,
            instance.address.frontinfo.host + ":3000",
            instance.address.backinfo.host,
            instance.address.backinfo.host + ":3000",
            instance.address.pythoninfo.host,
            instance.address.pythoninfo.host + ":3000",
            instance.address.testinfo.host,
            instance.address.testinfo.host + ":3000",
            instance.address.secondinfo.host,
            instance.address.secondinfo.host + ":3000",
            instance.address.officeinfo.ghost.host,
            instance.address.officeinfo.ghost.host + ":3000",
            "localhost:3000",
            "localhost:8080",
            "stdpay.inicis.com",
            "fcstdpay.inicis.com",
            "ksstdpay.inicis.com",
            "stgmobile.inicis.com",
            "ksmobile.inicis.com",
            "fcmobile.inicis.com",
            "192.168.0.14:3000"
          ];

          __wallLogicBoo = false;

          __originTarget = req.headers["origin"] || "invaild";
          if (__originTarget === "invaild" || __originTarget === "null" || __originTarget === "undefined" || __originTarget === null) {
            __originTarget = req.headers["host"] || "invaild";
          }
          for (let host of __vailHosts) {
            __wallLogicBoo = (new RegExp(host, "gi")).test(__originTarget.trim().replace(/\/$/, ''));
            if (__wallLogicBoo) {
              break;
            }
          }

          if (!__wallLogicBoo) {
            res.set("Content-Type", "application/json");
            res.send(JSON.stringify({ message: "OK" }));
            __headers = req.headers;
            __headers = JSON.parse(JSON.stringify(__headers));
            __slackMessage = JSON.stringify(__headers, null, 2);
            if (req.body !== null && req.body !== undefined) {
              __slackMessage += "\n\n";
              __slackMessage += JSON.stringify(req.body, null, 2);
            }
            errorLog({ text: "잘못된 보안 접근 감지 : (dataConsole) \n" + JSON.stringify(__headers, null, 2), channel: "#error_log" }).catch((e) => { console.log(e); });
          } else {
            obj.func(req, res);
          }

        });
      } else {
        app.post(obj.link, obj.func);
      }
    }
    console.log(`set router`);

    //set static
    this.renderStatic(staticFolder, address, DataPatch).then(() => {
      if (DataMiddle !== null) {
        return instance.renderMiddleStatic(staticFolder, address, DataPatch, DataMiddle, false);
      } else {
        return new Promise(function (resolve, reject) {
          resolve(null);
        });
      }
    }).then(() => {
      console.log(`static done`);
    }).catch((err) => {
      console.log(err);
    });

    //server on
    https.createServer(pems, app).listen(PORT, () => { console.log(`\x1b[33m%s\x1b[0m`, `\nServer running\n`); });


  } catch (e) {
    console.log(e);
  }
}

module.exports = DataConsole;
