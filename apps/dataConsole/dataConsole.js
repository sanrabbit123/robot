const DataConsole = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  this.address = require(`${process.cwd()}/apps/infoObj.js`);
  this.mother = new Mother();
  this.back = new BackMaker();
  this.dir = process.cwd() + "/apps/dataConsole";
  this.sourceDir = this.dir + "/router/source";
  this.middleDir = this.sourceDir + "/middle";
  this.middleModuleDir = this.middleDir + "/module";
}

DataConsole.prototype.mediaQuery = function (code) {
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

DataConsole.prototype.renderStatic = async function (staticFolder, address, DataPatch) {
  const instance = this;
  const { fileSystem, shell, shellLink, sleep } = this.mother;
  const S3HOST = this.address.homeinfo.ghost.protocol + "://" + this.address.homeinfo.ghost.host;
  const SSEHOST = address.host;
  const SSEHOST_CONSOLE = this.address.backinfo.host;
  const GHOSTHOST = this.address.homeinfo.ghost.host;
  const PYTHONHOST = "https://" + this.address.pythoninfo.host + ":3000";
  const BRIDGEHOST = "https://" + this.address.bridgeinfo.host + ":3000";
  const FRONTHOST = "https://" + this.address.frontinfo.host;
  const OFFICEHOST = "https://" + this.address.officeinfo.ghost.host + ":" + String(this.address.officeinfo.ghost.port);
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
        tempMediaResult = this.mediaQuery(tempScriptString);
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
            tempMediaResult = this.mediaQuery(tempScriptString);
            tempScriptString = tempMediaResult.conditions + "\n\n" + tempMediaResult.code;
          }
          await fileSystem(`write`, [ `${staticFolder}/${moduleName}/${i.replace(/\.js/gi, '')}/${subFile}`, tempScriptString ]);
        }
      }

    }

    console.log(`set static`);

    let svgTongString, generalString, consoleGeneralString, execString, fileString, svgTongItemsString, s3String, sseString, sseConsoleString, polyfillString, classString, pythonString, bridgeString, frontWebString, trapString, officeString;
    let code0, code1, code2, code3;
    let result;
    let prototypes, dataPatchScript, prototypeBoo;
    let resultFromArr;

    //set general js
    s3String = "const S3HOST = \"" + S3HOST + "\";";
    sseString = "const SSEHOST = \"" + SSEHOST + "\";";
    sseConsoleString = "const SSEHOST_CONSOLE = \"" + SSEHOST_CONSOLE + "\";";
    ghostString = "const GHOSTHOST = \"" + GHOSTHOST + "\";";
    pythonString = "const PYTHONHOST = \"" + PYTHONHOST + "\";";
    bridgeString = "const BRIDGEHOST = \"" + BRIDGEHOST + "\";";
    frontWebString = "const FRONTHOST = \"" + FRONTHOST + "\";";
    officeString = "const OFFICEHOST = \"" + OFFICEHOST + "\";";
    svgTongString = await fileSystem(`readString`, [ `${process.cwd()}/apps/frontMaker/string/svgTong.js` ]);
    generalString = await fileSystem(`readString`, [ `${process.cwd()}/apps/frontMaker/source/jsGeneral/general.js` ]);
    generalString = generalString.replace(/\/<%generalMap%>\//, "{}");
    consoleGeneralString = await fileSystem(`readString`, [ `${this.dir}/router/source/general/general.js` ]);
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
      if (/\/<%map%>\//g.test(fileString)) {
        fileString = fileString.replace(/(\/<%map%>\/)/g, function (match, p1, offset, string) {
          return JSON.stringify(require(`${instance.dir}/router/source/svg/map/${i}`), null, 2);
        });
        svgTongItemsString = await fileSystem(`readString`, [ `${this.dir}/router/source/svg/svgTong/${i}` ]);
      }
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
      code0 = svgTongString + "\n\n" + trapString + "\n\n" + s3String + "\n\n" + sseString + "\n\n" + sseConsoleString + "\n\n" + ghostString + "\n\n" + pythonString + "\n\n" + bridgeString + "\n\n" + frontWebString + "\n\n" + officeString + "\n\n";
      code1 = dataPatchScript;
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
      await fileSystem(`write`, [ `${staticFolder}/${i}`, result ]);
      resultFromArr.push(`${staticFolder}/${i}`);

    }

    return resultFromArr;

  } catch (e) {
    console.log(e);
  }
}

DataConsole.prototype.renderMiddleStatic = async function (staticFolder, address, DataPatch, DataMiddle) {
  const instance = this;
  const generalMap = require(`${process.cwd()}/apps/mapMaker/map/general.js`);
  const { fileSystem, shell, shellLink, babelSystem, treeParsing } = this.mother;
  const S3HOST = this.address.homeinfo.ghost.protocol + "://" + this.address.homeinfo.ghost.host;
  const SSEHOST = address.host;
  const SSEHOST_CONSOLE = this.address.backinfo.host;
  const GHOSTHOST = this.address.homeinfo.ghost.host;
  const PYTHONHOST = "https://" + this.address.pythoninfo.host + ":3000";
  const BRIDGEHOST = "https://" + this.address.bridgeinfo.host + ":3000";
  const FRONTHOST = "https://" + this.address.frontinfo.host;
  const OFFICEHOST = "https://" + this.address.officeinfo.ghost.host + ":" + String(this.address.officeinfo.ghost.port);
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
    let svgTongString, generalString, consoleGeneralString, execString, fileString, svgTongItemsString, s3String, sseString, sseConsoleString, polyfillString, pythonString, frontClassString, bridgeString, frontWebString, officeString;
    let code0, code1, code2, code3;
    let result, moduleString;
    let prototypes, dataPatchScript, prototypeBoo;
    let generalSvg;
    let treeArray;
    let moduleBoo;
    let totalModuleObjectConst;
    let resultFromArr;
    let tempArr;
    let tempMediaResult;
    let trapString;
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
        ghostDesignerGeneral = dir + "/" + file;
        ghostDesignerGeneralString = await fileSystem(`readString`, [ ghostDesignerGeneral ]);
      }
    }
    staticDirList = staticDirList.filter((obj) => { return !(obj.file === "general.js" && /^GHOST/.test(obj.kinds)); });

    //set general js
    s3String = "const S3HOST = \"" + S3HOST + "\";";
    sseString = "const SSEHOST = \"" + SSEHOST + "\";";
    sseConsoleString = "const SSEHOST_CONSOLE = \"" + SSEHOST_CONSOLE + "\";";
    ghostString = "const GHOSTHOST = \"" + GHOSTHOST + "\";";
    pythonString = "const PYTHONHOST = \"" + PYTHONHOST + "\";";
    bridgeString = "const BRIDGEHOST = \"" + BRIDGEHOST + "\";";
    frontWebString = "const FRONTHOST = \"" + FRONTHOST + "\";";
    officeString = "const OFFICEHOST = \"" + OFFICEHOST + "\";";
    svgTongString = await fileSystem(`readString`, [ `${process.cwd()}/apps/frontMaker/string/svgTong.js` ]);
    consoleGeneralString = await fileSystem(`readString`, [ `${this.dir}/router/source/general/general.js` ]);
    polyfillString = await fileSystem(`readString`, [ `${process.cwd()}/apps/frontMaker/source/jsGeneral/polyfill.js` ]);
    generalSvg = await fileSystem(`readString`, [ `${process.cwd()}/apps/mapMaker/svgTong/general_async.js` ]);
    generalSvg += "\n\n";
    generalSvg += await fileSystem(`readString`, [ `${process.cwd()}/apps/mapMaker/svgTong/general.js` ]);
    trapString = await this.back.setAjaxAuthorization();

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
      generalString = generalString.replace(/(\/<%generalMap%>\/)/, (match, p1, offset, string) => {
        let generalObj_clone = JSON.parse(JSON.stringify(generalMap));
        for (let j in generalObj_clone.main.interaction) {
          if (!([ name ]).includes(j)) {
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
      code0 = svgTongString + "\n\n" + trapString + "\n\n" + generalSvg + "\n\n" + s3String + "\n\n" + sseString + "\n\n" + sseConsoleString + "\n\n" + ghostString + "\n\n" + pythonString + "\n\n" + bridgeString + "\n\n" + frontWebString + "\n\n" + officeString + "\n\n";
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
        tempMediaResult = this.mediaQuery(code2);
        code2 = tempMediaResult.code + "\n\n" + tempMediaResult.conditions;
        generalMediaBoo = true;
      }
      if (/<%%/gi.test(code3)) {
        tempMediaResult = this.mediaQuery(code3);
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

DataConsole.prototype.setBinary = async function () {
  const instance = this;
  const { fileSystem, shell, shellLink, ghostFileList, binaryRequest } = this.mother;
  const address = this.address;
  const staticFolder = process.env.HOME + "/static";
  const FILEHOST = address.homeinfo.ghost.host;
  try {

    const targetName = "dataConsole";
    let res;
    let resFolders, resFiles;
    let tempObject, tempArray;
    let resultFromArr;

    res = await ghostFileList(targetName);
    resFiles = res.filter((i) => { return !/\/$/.test(i); });
    resFolders = res.filter((i) => { return /\/$/.test(i); });
    resFolders.sort((a, b) => { return a.split('/').length - b.split('/').length; });
    resFolders = resFolders.map((i) => { return i.slice(targetName.length + 1); });
    resFolders = resFolders.map((i) => { return i.slice(0, -1); });
    resFolders = resFolders.filter((i) => { return i !== '' });

    for (let f of resFolders) {
      if (!(await fileSystem(`exist`, [ staticFolder + f ]))) {
        shell.exec(`mkdir ${shellLink(staticFolder)}/${shellLink(f)}`);
      }
    }
    resultFromArr = [];
    for (let f of resFiles) {
      tempObject = await binaryRequest("https://" + FILEHOST + f);
      await fileSystem(`writeBinary`, [ staticFolder + f.slice(targetName.length + 1), tempObject ]);
      resultFromArr.push(staticFolder + f.slice(targetName.length + 1));
      console.log(`${f} download done`);
    }

    return resultFromArr;
  } catch (e) {
    console.log(e);
  }
}

DataConsole.prototype.connect = async function (noStatic = false) {
  const instance = this;
  const { fileSystem, shell, shellLink, mongo, mongoinfo, mongolocalinfo, mongoconsoleinfo, errorLog } = this.mother;
  const PORT = 3000;
  const TESTINBOUND = 55555;
  const TESTOUTBOUND = 55556;

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
    const { name, rawObj: address } = await this.mother.ipCheck();
    let isLocal;
    if (name === "unknown") {
      throw new Error("invalid address");
    }
    console.log(``);
    console.log(`\x1b[36m\x1b[1m%s\x1b[0m`, `launching console in ${name.replace(/info/i, '')} ==============`);
    console.log(``);

    //set mongo connetion
    let MONGOC, MONGOLOCALC;
    if (/localhost/gi.test(address.host) || address.host === this.address.officeinfo.ghost.host) {
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
      MONGOLOCALC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
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
    DataMiddle = require(`${this.dir}/router/dataMiddle.js`);

    //set pem key
    let pems, pemsLink;
    let certDir, keyDir, caDir;

    pems = {};
    pemsLink = process.cwd() + "/pems/" + address.host;

    if (process.argv.length > 3) {
      if (process.argv[3] === "--test") {
        pemsLink = process.cwd() + "/pems/" + this.address.officeinfo.ghost.host;
        console.log(`\x1b[36m\x1b[1m%s\x1b[0m`, `test mode from window to port => ${String(TESTINBOUND)}`);
      }
    }

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
            instance.address.backinfo.host,
            instance.address.backinfo.host + ":3000",
            instance.address.homeinfo.ghost.host,
            instance.address.homeinfo.ghost.host + ":3000",
            instance.address.bridgeinfo.host,
            instance.address.bridgeinfo.host + ":3000",
            instance.address.pythoninfo.host,
            instance.address.pythoninfo.host + ":3000",
            instance.address.officeinfo.ghost.host,
            instance.address.officeinfo.ghost.host + ":" + String(TESTINBOUND),
            "localhost:3000",
            "localhost:8080",
            "stdpay.inicis.com",
            "fcstdpay.inicis.com",
            "ksstdpay.inicis.com",
            "stgmobile.inicis.com",
            "ksmobile.inicis.com",
            "fcmobile.inicis.com"
          ];

          __wallLogicBoo = false;

          __originTarget = req.headers["origin"] || "invaild";
          for (let host of __vailHosts) {
            __wallLogicBoo = ((__originTarget.trim().replace(/\/$/, '') === ("https://" + host)) || (__originTarget.trim().replace(/\/$/, '') === host));
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
        return instance.renderMiddleStatic(staticFolder, address, DataPatch, DataMiddle);
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

    //set binary
    // await this.setBinary();

    //server on
    if (process.argv.length > 3) {
      if (process.argv[3] === "--test") {
        https.createServer(pems, app).listen(TESTOUTBOUND, () => { console.log(`\x1b[33m%s\x1b[0m`, `\nServer running\n`); });
      } else {
        https.createServer(pems, app).listen(PORT, () => { console.log(`\x1b[33m%s\x1b[0m`, `\nServer running\n`); });
      }
    } else {
      https.createServer(pems, app).listen(PORT, () => { console.log(`\x1b[33m%s\x1b[0m`, `\nServer running\n`); });
    }

  } catch (e) {
    console.log(e);
  }
}

module.exports = DataConsole;
