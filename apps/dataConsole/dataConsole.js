class DataConsole {
  constructor() {
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
}

DataConsole.prototype.renderStatic = async function (staticFolder) {
  const instance = this;
  const { fileSystem, shellExec, shellLink, sleep, mediaQuery, uniqueValue } = this.mother;
  const S3HOST = "https://" + this.address.officeinfo.ghost.host;
  const FILEHOST = this.address.officeinfo.ghost.host;
  const BRIDGEHOST = "https://" + this.address.secondinfo.host + ":3003";
  const PYTHONHOST = "https://" + this.address.officeinfo.host + ":3002";
  const LOGHOST = "https://" + this.address.officeinfo.ghost.host + ":3000";
  const FRONTHOST = "https://" + this.address.frontinfo.host;
  const BACKHOST = "https://" + this.address.officeinfo.host + ":3002";
  const SECONDHOST = "https://" + this.address.secondinfo.host + ":3003";
  const CONTENTSHOST = "https://" + this.address.officeinfo.ghost.host + ":3000";
  const CONSTRUCTHOST = "https://" + this.address.officeinfo.construct.host + "";
  const NUMBERSHOST = "https://" + this.address.officeinfo.numbers.host + "";
  const classException = {
    proposal: [ "designer.js" ],
    bill: [ "designer.js" ],
  };
  try {

    //set static
    const workerName = "worker";
    const moduleName = "module";
    const staticDir = `${this.dir}/router/source/local`;
    const staticDirList_raw = await fileSystem(`readDir`, [ staticDir ]);
    const staticDirList = staticDirList_raw.filter((fileName) => { return !(([ ".DS_Store", moduleName ]).includes(fileName)); });
    const homeDirList = await fileSystem(`readDir`, [ process.env.HOME ]);
    let tempScriptString;
    let tempMediaResult;

    if (!homeDirList.includes(staticFolder.split('/')[staticFolder.split('/').length - 1])) {
      await shellExec(`mkdir ${shellLink(staticFolder)}`);
    }

    const staticFolderList = await fileSystem(`readDir`, [ staticFolder ]);

    if (staticFolderList.includes(moduleName)) {
      await shellExec(`rm -rf ${shellLink(staticFolder)}/${shellLink(moduleName)}`);
    }
    await shellExec(`mkdir ${shellLink(staticFolder)}/${shellLink(moduleName)}`);
    if (staticFolderList.includes(workerName)) {
      await shellExec(`rm -rf ${shellLink(staticFolder)}/${shellLink(workerName)}`);
    }
    await shellExec(`cp -r ${shellLink(this.dir)}/router/source/general/worker ${shellLink(staticFolder)}`);

    const staticModuleFolderList = await fileSystem(`readDir`, [ staticFolder + "/" + moduleName ]);

    for (let i of staticDirList) {
      if (!staticModuleFolderList.includes(i.replace(/\.js/gi, ''))) {
        await shellExec(`mkdir ${shellLink(staticFolder)}/${shellLink(moduleName)}/${shellLink(i.replace(/\.js/gi, ''))}`);
      }
    }

    for (let i of staticDirList) {
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
    }

    let svgTongString, consoleGeneralString, execString, fileString, svgTongItemsString, s3String, classString, pythonString, bridgeString, frontWebString, officeString, logString, backString, secondString, contentsString, constructString;
    let numbersString, parserString;
    let code0, code1, code2, code3;
    let result;
    let resultFromArr;

    //set general js
    s3String = "const S3HOST = \"" + S3HOST + "\";";
    pythonString = "const PYTHONHOST = \"" + PYTHONHOST + "\";";
    bridgeString = "const BRIDGEHOST = \"" + BRIDGEHOST + "\";";
    logString = "const LOGHOST = \"" + LOGHOST + "\";";
    frontWebString = "const FRONTHOST = \"" + FRONTHOST + "\";";
    backString = "const BACKHOST = \"" + BACKHOST + "\";";
    secondString = "const SECONDHOST = \"" + SECONDHOST + "\";";
    contentsString = "const CONTENTSHOST = \"" + CONTENTSHOST + "\";";
    constructString = "const CONSTRUCTHOST = \"" + CONSTRUCTHOST + "\";";
    numbersString = "const NUMBERSHOST = \"" + NUMBERSHOST + "\"";
    parserString = "";
    officeString = "const FILEHOST = \"" + FILEHOST + "\";";
    svgTongString = await fileSystem(`readString`, [ `${this.dir}/router/source/general/svgTong.js` ]);
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
      execString = execString.replace(/\/<%name%>\//g, (i.slice(0, 1).toUpperCase() + i.replace(/\.js$/, '').slice(1)));
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

      //merge
      code0 = svgTongString + "\n\n" + s3String + "\n\n" + pythonString + "\n\n" + bridgeString + "\n\n" + logString + "\n\n" + backString + "\n\n" + secondString + "\n\n" + contentsString + "\n\n" + constructString + "\n\n" + numbersString + "\n\n" + parserString + "\n\n" + frontWebString + "\n\n" + officeString + "\n\n";
      code1 = "";
      code2 = consoleGeneralString;
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

DataConsole.prototype.renderMiddleStatic = async function (staticFolder) {
  const instance = this;
  const { fileSystem, shell, shellLink, treeParsing, mediaQuery } = this.mother;
  const S3HOST = "https://" + this.address.officeinfo.ghost.host;
  const FILEHOST = this.address.officeinfo.ghost.host;
  const PYTHONHOST = "https://" + this.address.officeinfo.host + ":3002";
  const BRIDGEHOST = "https://" + this.address.secondinfo.host + ":3003";
  const LOGHOST = "https://" + this.address.officeinfo.ghost.host + ":3000";
  const FRONTHOST = "https://" + this.address.frontinfo.host;
  const BACKHOST = "https://" + this.address.officeinfo.host + ":3002";
  const SECONDHOST = "https://" + this.address.secondinfo.host + ":3003";
  const CONTENTSHOST = "https://" + this.address.officeinfo.ghost.host + ":3000";
  const CONSTRUCTHOST = "https://" + this.address.officeinfo.construct.host + "";
  const NUMBERSHOST = "https://" + this.address.officeinfo.numbers.host + "";
  try {
    //set static
    const staticTargets = [
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
    let svgTongString, consoleGeneralString, execString, fileString, svgTongItemsString, s3String, pythonString, frontClassString, bridgeString, frontWebString, officeString, logString, backString, secondString, contentsString, constructString;
    let numbersString, parserString;
    let code0, code1, code2, code3;
    let result, moduleString;
    let totalModuleObjectConst;
    let resultFromArr;
    let tempArr;
    let tempMediaResult;
    let ghostClientGeneral, ghostDesignerGeneral;
    let ghostClientGeneralString, ghostDesignerGeneralString;
    let generalMediaBoo;
    let testHomeLiaisonAnalytics;

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
    pythonString = "const PYTHONHOST = \"" + PYTHONHOST + "\";";
    bridgeString = "const BRIDGEHOST = \"" + BRIDGEHOST + "\";";
    logString = "const LOGHOST = \"" + LOGHOST + "\";";
    backString = "const BACKHOST = \"" + BACKHOST + "\";";
    secondString = "const SECONDHOST = \"" + SECONDHOST + "\";";
    contentsString = "const CONTENTSHOST = \"" + CONTENTSHOST + "\";";
    constructString = "const CONSTRUCTHOST = \"" + CONSTRUCTHOST + "\";";
    numbersString = "const NUMBERSHOST = \"" + NUMBERSHOST + "\"";
    parserString = "";
    frontWebString = "const FRONTHOST = \"" + FRONTHOST + "\";";
    officeString = "const FILEHOST = \"" + FILEHOST + "\";";
    svgTongString = await fileSystem(`readString`, [ `${this.dir}/router/source/general/svgTong.js` ]);
    consoleGeneralString = await fileSystem(`readString`, [ `${this.dir}/router/source/general/general.js` ]);

    //write local js
    console.log(`set middle target :`, staticDirList);
    resultFromArr = [];
    for (let { file: i, dir: staticDir, kinds } of staticDirList) {

      result = '';
      code0 = '';
      code1 = '';
      svgTongItemsString = '';

      fileString = await fileSystem(`readString`, [ `${staticDir}/${i}` ]);

      if (!/\/<%patch%>\//g.test(fileString)) {
        throw new Error("There is no patch, impossible");
      }

      //set data patch
      const { class: classOnOffObj, name, route } = JSON.parse(fileString.slice(0, [ ...fileString.matchAll(/%\/%\/g/g) ][0].index).replace(/\/<%patch%>\/ /gi, ''));

      //set meta info
      route.unshift(name);

      //set browser js
      execString = await fileSystem(`readString`, [ `${this.dir}/router/source/general/middleExec.js` ]);
      execString = execString.replace(/\/<%name%>\//g, (name.slice(0, 1).toUpperCase() + name.slice(1)));

      fileString = fileString.slice([ ...fileString.matchAll(/%\/%\/g/g) ][0].index + String("%/%/g").length + 1);

      //front class set
      frontClassString = '';
      for (let c in classOnOffObj) {
        if (classOnOffObj[c]) {
          frontClassString += (await fileSystem(`readString`, [ `${this.dir}/router/source/class/${c}.js` ])).replace(/module\.exports = [^\n]+/gi , '');
          frontClassString += "\n\n";
        }
      }

      //merge
      code0 = svgTongString + "\n\n" + s3String + "\n\n" + pythonString + "\n\n" + bridgeString + "\n\n" + logString + "\n\n" + backString + "\n\n" + secondString + "\n\n" + contentsString + "\n\n" + constructString + "\n\n" + numbersString + "\n\n" + parserString + "\n\n" + frontWebString + "\n\n" + officeString + "\n\n";
      code1 = "" + "\n\n";
      if (kinds === "MIDDLE") {
        code2 = consoleGeneralString + "\n\n" + frontClassString + "\n\n";
      } else {
        if (/CLIENT/gi.test(kinds)) {
          code2 = consoleGeneralString + "\n\n" + ghostClientGeneralString + "\n\n" + frontClassString + "\n\n";
        } else {
          code2 = consoleGeneralString + "\n\n" + ghostDesignerGeneralString + "\n\n" + frontClassString + "\n\n";
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
      result += "\n\n";
      result += code3;
      result += "\n\n";

      console.log(`${i} merge success`);
      await fileSystem(`write`, [ `${staticFolder}/middle/${i}`, result ]);
      resultFromArr.push(`${staticFolder}/middle/${i}`);

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
  const frontGeneralDir = this.frontDir + "/general";
  const frontDir = this.frontDir + "/client";
  try {
    await this.renderMiddleStatic(staticFolder);
    const targetMap = [
      { from: "clientConsulting", to: "consulting", path: "/middle/consulting" },
      { from: "clientEvaluation", to: "evaluation", path: "/middle/evaluation" },
      { from: "aspirantExplanation", to: "aspiration", path: "/middle/aspirantExplanation" },
      { from: "aspirantSubmit", to: "aspirant", path: "/middle/aspirantSubmit" },
      { from: "aspirantNotice", to: "aspnotice", path: "/middle/aspirantNotice" },
      { from: "aspirantPayment", to: "asppayment", path: "/middle/aspirantPayment" },
      { from: "aspirantPortfolio", to: "aspportfolio", path: "/middle/aspirantPortfolio" },
      { from: "aspirantSetting", to: "aspsetting", path: "/middle/aspirantSetting" },
      { from: "aspirantInformation", to: "aspinformation", path: "/middle/aspirantInformation" },
      { from: "aspirantCommon", to: "aspcommon", path: "/middle/aspirantCommon" },
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
      { from: "firstResponse", to: "response", path: "/middle/firstResponse" },
      { from: "jobPosting", to: "job", path: "/middle/jobPosting" },
      { from: "imageTransfer", to: "transfer", path: "/middle/imageTransfer" },
      { from: "firstPayment", to: "payment", path: "/middle/firstPayment" },
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
    let generalTargets;
    let generalTargetScript;
    let commandTong;
    let cpCommand, cpCommandTong;
    let scpCommand2, scpCommand2Tong;

    motherTong = [];
    middleTong = [];
    for (let { from, to, file, php, path } of ghostTargets) {
      targetScript = await fileSystem(`readString`, [ file ]);
      targetScript = targetScript.replace(/ajaxJson\((\{[^}]*\}[^}]*\}?, ?)(\"[^\"]+\")/gi, (original, p1, p2) => {
        if (/^[\"\']http/.test(p2)) {
          return original;
        } else {
          return `ajaxJson(${p1}"https://${address.officeinfo.host}:3002" + ${p2}`;
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

    commandTong = middleTong.map((p) => {
      return `scp ${shellLink(p)} ${address.frontinfo.user}@${address.frontinfo.host}:/${address.frontinfo.user}/www/middle/`;
    }).concat(motherTong.map((p) => {
      return `scp ${shellLink(p)} ${address.frontinfo.user}@${address.frontinfo.host}:/${address.frontinfo.user}/www/`;
    }));
    command = commandTong.join(';');

    generalPhpScript = await fileSystem(`readString`, [ frontDir + "/general.php" ]);
    generalPhpScript = generalPhpScript.replace(/__host__/gi, address.frontinfo.host);
    generalPhpScript = generalPhpScript.replace(/__realHost__/gi, address.frontinfo.host);
    generalPhpScript = generalPhpScript.replace(/__coreHost__/gi, address.officeinfo.core.ddns);
    generalPhpScript = generalPhpScript.replace(/__secondHost__/gi, address.secondinfo.host + ":3003");
    generalPhpScript = generalPhpScript.replace(/__logHost__/gi, address.officeinfo.ghost.host + ":3000");
    generalPhpScript = generalPhpScript.replace(/__backHost__/gi, address.officeinfo.host + ":3002");
    generalPhpScript = generalPhpScript.replace(/__contentsHost__/gi, address.officeinfo.ghost.host + ":3000");
    generalPhpScript = generalPhpScript.replace(/__constructHost__/gi, address.officeinfo.construct.host + ":8000");
    generalPhpScript = generalPhpScript.replace(/__numbersHost__/gi, address.officeinfo.numbers.host + ":8000");
    generalPhpScript = generalPhpScript.replace(/__officeIp__/gi, address.officeinfo.test.ip.outer);
    generalPhpScript = generalPhpScript.replace(/__testHost__/gi, address.officeinfo.test.host);
    generalPhpScript = generalPhpScript.replace(/__user__/gi, address.frontinfo.user);
    generalPhpScript = generalPhpScript.replace(/__password__/gi, address.frontinfo.password);
    generalPhpScript = generalPhpScript.replace(/__database__/gi, address.frontinfo.database);
    await fileSystem(`write`, [ `${process.cwd()}/temp/general.php`, generalPhpScript ]);
    command += `;scp ${process.cwd()}/temp/general.php ${address.frontinfo.user}@${address.frontinfo.host}:/${address.frontinfo.user}/www/;`;

    generalTargets = await fileSystem(`readDir`, [ frontGeneralDir ]);
    generalTargets = generalTargets.filter((str) => { return str !== ".DS_Store" });
    for (let target of generalTargets) {
      generalTargetScript = await fileSystem(`readString`, [ frontGeneralDir + "/" + target ]);
      await fileSystem(`write`, [ `${process.cwd()}/temp/${target}`, generalTargetScript ]);
      command += `scp ${process.cwd()}/temp/${target} ${address.frontinfo.user}@${address.frontinfo.host}:/${address.frontinfo.user}/www/;`;
    }

    cpCommandTong = (commandTong.filter((o) => { return /\.js[\'\"]? /.test(o) }).map((c) => {
      const tempCommandArr = c.split(" ").map((s) => { return s.trim() });
      const updatedJs = tempCommandArr[1].replace(/\/([a-zA-Z0-9_\- ]+\.js[\'\"]?)/g, (match, p1) => {
        return "/updated_" + p1;
      });
      return tempCommandArr.slice(0, -1).join(" ").replace(/^scp/, "cp") + " " + updatedJs;
    }));
    cpCommand = cpCommandTong.join(";");
    scpCommand2Tong = cpCommandTong.map((c) => {
      const tempCommandArr = c.split(" ").map((s) => { return s.trim() });
      return "scp " + tempCommandArr[2] + " " + `${address.frontinfo.user}@${address.frontinfo.host}:/${address.frontinfo.user}/www/middle/`;
    });
    scpCommand2 = scpCommand2Tong.join(";");

    await shellExec(`scp -r ${shellLink(instance.dir)}/router/source/general/worker ${address.frontinfo.user}@${address.frontinfo.host}:/${address.frontinfo.user}/www/;`);
    await shellExec(command);
    await shellExec(cpCommand);
    await shellExec(scpCommand2);
    console.log(`front update done`);
    
    await instance.renderDesignerPhp();

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
  const frontGeneralDir = this.frontDir + "/general";
  const frontDir = this.frontDir + "/designer";
  try {
    await this.renderMiddleStatic(staticFolder);
    const targetMap = [
      { from: "designerAbout", to: "about", path: "/middle/designerAbout" },
      { from: "designerBoard", to: "dashboard", path: "/middle/designerBoard" },
      { from: "designerReport", to: "report", path: "/middle/designerReport" },
      { from: "requestDetail", to: "request", path: "/middle/requestDetail" },
      { from: "requestList", to: "requests", path: "/middle/requestList" },
      { from: "designerLogin", to: "login", path: "/middle/designerLogin" },
      { from: "designManual", to: "provision", path: "/middle/designManual" },
      { from: "consoleManual", to: "manual", path: "/middle/consoleManual" },
      { from: "designerPossible", to: "possible", path: "/middle/designerPossible" },
      { from: "partnershipManual", to: "partnership", path: "/middle/partnershipManual" },
      { from: "feeManual", to: "fee", path: "/middle/feeManual" },
      { from: "processDetail", to: "process", path: "/middle/processDetail" },
      { from: "setPortfolio", to: "setting", path: "/middle/setPortfolio" },
      { from: "proposalManual", to: "proposal_manual", path: "/middle/proposalManual" },
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
    let commandTong;
    let cpCommand, cpCommandTong;
    let scpCommand2, scpCommand2Tong;

    motherTong = [];
    middleTong = [];
    for (let { from, to, file, php, path } of ghostTargets) {
      targetScript = await fileSystem(`readString`, [ file ]);
      targetScript = targetScript.replace(/ajaxJson\((\{[^}]*\}[^}]*\}?, ?)(\"[^\"]+\")/gi, (original, p1, p2) => {
        if (/^[\"\']http/.test(p2)) {
          return original;
        } else {
          return `ajaxJson(${p1}"https://${address.officeinfo.host}:3002" + ${p2}`;
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

    commandTong = middleTong.map((p) => {
      return `scp ${p} ${address.frontinfo.user}@${address.frontinfo.host}:/${address.frontinfo.user}/www/middle/`;
    }).concat(motherTong.map((p) => {
      return `scp ${p} ${address.frontinfo.user}@${address.frontinfo.host}:/${address.frontinfo.user}/www/designer/`;
    }));
    command = commandTong.join(';');

    generalPhpScript = await fileSystem(`readString`, [ frontClientDir + "/general.php" ]);
    generalPhpScript = generalPhpScript.replace(/__host__/gi, address.frontinfo.host);
    generalPhpScript = generalPhpScript.replace(/__realHost__/gi, address.frontinfo.host);
    generalPhpScript = generalPhpScript.replace(/__coreHost__/gi, address.officeinfo.core.ddns);
    generalPhpScript = generalPhpScript.replace(/__secondHost__/gi, address.secondinfo.host + ":3003");
    generalPhpScript = generalPhpScript.replace(/__logHost__/gi, address.officeinfo.ghost.host + ":3000");
    generalPhpScript = generalPhpScript.replace(/__backHost__/gi, address.officeinfo.host + ":3002");
    generalPhpScript = generalPhpScript.replace(/__contentsHost__/gi, address.officeinfo.ghost.host + ":3000");
    generalPhpScript = generalPhpScript.replace(/__constructHost__/gi, address.officeinfo.construct.host + ":8000");
    generalPhpScript = generalPhpScript.replace(/__numbersHost__/gi, address.officeinfo.numbers.host + ":8000");
    generalPhpScript = generalPhpScript.replace(/__officeIp__/gi, address.officeinfo.test.ip.outer);
    generalPhpScript = generalPhpScript.replace(/__testHost__/gi, address.officeinfo.test.host);
    generalPhpScript = generalPhpScript.replace(/__user__/gi, address.frontinfo.user);
    generalPhpScript = generalPhpScript.replace(/__password__/gi, address.frontinfo.password);
    generalPhpScript = generalPhpScript.replace(/__database__/gi, address.frontinfo.database);
    await fileSystem(`write`, [ `${process.cwd()}/temp/general.php`, generalPhpScript ]);
    command += `;scp ${process.cwd()}/temp/general.php ${address.frontinfo.user}@${address.frontinfo.host}:/${address.frontinfo.user}/www/designer/;`;

    cpCommandTong = (commandTong.filter((o) => { return /\.js[\'\"]? /.test(o) }).map((c) => {
      const tempCommandArr = c.split(" ").map((s) => { return s.trim() });
      const updatedJs = tempCommandArr[1].replace(/\/([a-zA-Z0-9_\- ]+\.js[\'\"]?)/g, (match, p1) => {
        return "/updated_" + p1;
      });
      return tempCommandArr.slice(0, -1).join(" ").replace(/^scp/, "cp") + " " + updatedJs;
    }));
    cpCommand = cpCommandTong.join(";");
    scpCommand2Tong = cpCommandTong.map((c) => {
      const tempCommandArr = c.split(" ").map((s) => { return s.trim() });
      return "scp " + tempCommandArr[2] + " " + `${address.frontinfo.user}@${address.frontinfo.host}:/${address.frontinfo.user}/www/middle/`;
    });
    scpCommand2 = scpCommand2Tong.join(";");

    input = await consoleQ(`is it OK? : (if no problem, press 'ok')\n`);
    if (input === "done" || input === "a" || input === "o" || input === "ok" || input === "OK" || input === "Ok" || input === "oK" || input === "yes" || input === "y" || input === "yeah" || input === "Y") {
      await shellExec(`scp -r ${shellLink(instance.dir)}/router/source/general/worker ${address.frontinfo.user}@${address.frontinfo.host}:/${address.frontinfo.user}/www/;`);
      await shellExec(command);
      await shellExec(cpCommand);
      await shellExec(scpCommand2);
      console.log(`front update done`);
    }

  } catch (e) {
    console.log(e);
  }
}

DataConsole.prototype.connect = async function () {
  const instance = this;
  const { fileSystem, sleep, mongo, mongoinfo, mongolocalinfo, mongotestinfo, mongoofficeinfo, uniqueValue, errorLog, expressLog, dateToString, aliveLog, cronLog, emergencyAlarm, alertLog, shellExec, shellLink } = this.mother;
  const PORT = 3002;
  const https = require("https");
  const express = require("express");
  const app = express();
  const multer = require("multer");
  const multiForms = multer();
  const useragent = require("express-useragent");
  const staticFolder = process.env.HOME + "/static";
  const fs = require("fs");
  const allLogKeyword = "allExpressLog";
  const logKeyword = "expressLog";
  const logFolder = process.env.HOME + "/server/log";
  const thisLogFile = `${logFolder}/${logKeyword}_${(new Date()).valueOf()}.log`;
  const serverName = "back";
  const processDoingKeywords = "processDoing_";
  const tempProcessName = processDoingKeywords + uniqueValue("hex") + ".temp";

  app.use(useragent.express());
  app.use(express.json({ limit : "50mb" }));
  app.use(multiForms.array());
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  app.use(express.static(staticFolder));
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, HEAD, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With, remember-me");
    if (req.method === "OPTIONS") {
      res.sendStatus(200);
    } else {
      next();
    }
  });

  try {
    //set address info
    console.log(`\n\x1b[36m\x1b[1m%s\x1b[0m`, `launching console ==============\n`);

    //set mongo connetion
    await this.back.setInfoObj({ getMode: false });
    const MONGOC = new mongo(mongoinfo);
    await MONGOC.connect();


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
    pemsLink = process.cwd() + "/pems/" + this.address.officeinfo.host;

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
    const DataRouter = require(`${this.dir}/router/dataRouter.js`);
    const router = new DataRouter(MONGOC, kakaoInstance, humanInstance);
    await router.setMembers();
    const rouObj = router.getAll();
    const logStream = fs.createWriteStream(thisLogFile);
    await expressLog(serverName, logStream, "start");
    const logger = {
      alert: async (text) => {
        try {
          expressLog(serverName, logStream, "alert", { text }).catch((err) => { console.log(err) });
          await emergencyAlarm(text);
        } catch (e) {
          console.log(e);
        }
      },
      log: async (text) => {
        try {
          expressLog(serverName, logStream, "log", { text }).catch((err) => { console.log(err) });
          await errorLog(text);
        } catch (e) {
          console.log(e);
        }
      },
      error: async (text) => {
        try {
          expressLog(serverName, logStream, "error", { text }).catch((err) => { console.log(err) });
          await alertLog(text);
        } catch (e) {
          console.log(e);
        }
      },
      cron: async (text) => {
        try {
          expressLog(serverName, logStream, "cron", { text }).catch((err) => { console.log(err) });
          await cronLog(text);
        } catch (e) {
          console.log(e);
        }
      },
      alive: async (text) => {
        try {
          expressLog(serverName, logStream, "alive", { text }).catch((err) => { console.log(err) });
          await aliveLog(text);
        } catch (e) {
          console.log(e);
        }
      },
      stream: logStream,
      path: thisLogFile,
      keyword: logKeyword,
      all: allLogKeyword,
      folder: logFolder,
      instances: 2,
    };
    for (let obj of rouObj.get) {
      app.get(obj.link, async function (req, res) {
        try {
          await obj.func(req, res, logger);
        } catch (e) {
          console.log(e);
          res.set("Content-Type", "application/json");
          res.send(JSON.stringify({ error: e.message }));
        }
      });
    }
    for (let obj of rouObj.post) {
      if (obj.public !== true) {
        app.post(obj.link, async function (req, res) {
          try {  
            await obj.func(req, res, logger);
          } catch (e) {
            console.log(e);
            res.set("Content-Type", "application/json");
            res.send(JSON.stringify({ error: e.message }));
          }
        });
      } else {
        app.post(obj.link, async function (req, res) {
          try {
            expressLog(serverName, logStream, "route", req).catch((err) => { console.log(err) });
            await obj.func(req, res, logger);
          } catch (e) {
            console.log(e);
            res.set("Content-Type", "application/json");
            res.send(JSON.stringify({ error: e.message }));
          }
        });
      }
    }
    console.log(`set router`);

    //set static
    sleep(1000 * Math.random()).then(() => {
      return fileSystem("readFolder", [ process.env.HOME ]);
    }).then((homeFolderList) => {
      if (homeFolderList.some((str) => { return (new RegExp("^" + processDoingKeywords, "i")).test(str) })) {
        sleep(500).then(() => {
          return instance.renderStatic(staticFolder);
        }).then(() => {
          return instance.renderMiddleStatic(staticFolder);
        }).then(() => {
          console.log(`static done`);
        }).catch((err) => {
          console.log(err);
        })
      } else {
        fileSystem("writeString", [ process.env.HOME + "/" + tempProcessName, String(1) ]).then(() => {
          return instance.renderStatic(staticFolder);
        }).then(() => {
          return instance.renderMiddleStatic(staticFolder);
        }).then(() => {
          console.log(`static done`);
          return shellExec("rm", [ "-rf", process.env.HOME + "/" + tempProcessName ]);
        }).catch((err) => {
          console.log(err);
        });
      }
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
