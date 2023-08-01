const PublicSector = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  const ADDRESS = require(`${process.cwd()}/apps/infoObj.js`);
  this.mother = new Mother();
  this.back = new BackMaker();
  this.address = ADDRESS;
  this.publicSector = "publicSector";
  this.dir = process.cwd() + "/apps/" + this.publicSector;
  this.home = process.env.HOME;
  this.name = "sector";
  this.staticName = "static";
  this.serverDir = this.dir + "/" + this.name;
  this.spawnDir = this.home + "/" + this.name;
  this.staticHome = this.home + "/" + this.staticName;
  this.staticDir = this.staticHome + "/" + this.publicSector;
  this.moduleName = "python_modules";
  this.initFile = "public.py";
}

PublicSector.prototype.staticRender = async function () {
  const instance = this;
  const { home, name, spawnDir, serverDir, publicSector } = this;
  const { fileSystem, shellExec, ipCheck, mediaQuery } = this.mother;
  try {
    const thisIp = await ipCheck();
    let staticName, staticDir, staticHome;
    if (thisIp.rawObj.isGhost) {
      staticName = "samba";
      staticHome = this.home + "/" + staticName;
      staticDir = this.home + "/" + staticName + "/" + publicSector;
    } else {
      staticName = this.staticName;
      staticHome = this.staticHome;
      staticDir = this.staticDir;
    }
    const targetDir = `${this.dir}/router/source/local`;
    const targetDirList = (await fileSystem(`readDir`, [ targetDir ])).filter((fileName) => { return !(([ ".DS_Store", "module" ]).includes(fileName)); });
    let svgTongString, generalString, consoleGeneralString, publicGeneralString, execString, fileString, svgTongItemsString, polyfillString, trapString;
    let code0, code1, code2, code3;
    let result;
    let prototypes, dataPatchScript, prototypeBoo;
    let resultFromArr;
    let tempMediaResult;


    if (!(await fileSystem(`exist`, [ staticHome ]))) {
      await shellExec(`mkdir`, [ staticHome ]);
    }
    if (!(await fileSystem(`exist`, [ staticDir ]))) {
      await shellExec(`mkdir`, [ staticDir ]);
    }

    svgTongString = await fileSystem(`readString`, [ `${process.cwd()}/apps/abstractNode/source/svgTong.js` ]);
    generalString = await fileSystem(`readString`, [ `${process.cwd()}/apps/abstractNode/source/general.js` ]);
    consoleGeneralString = await fileSystem(`readString`, [ `${process.cwd()}/apps/dataConsole/router/source/general/general.js` ]);
    publicGeneralString = await fileSystem(`readString`, [ `${this.dir}/router/source/general/general.js` ]);
    trapString = await this.back.setAjaxAuthorization();

    console.log(`set target :`, targetDirList);

    for (let i of targetDirList) {

      result = '';
      code0 = '';
      code1 = '';
      svgTongItemsString = null;

      execString = await fileSystem(`readString`, [ `${this.dir}/router/source/general/exec.js` ]);
      execString = execString.replace(/\/<%name%>\//, (i.slice(0, 1).toUpperCase() + i.replace(/\.js$/, '').slice(1)));
      fileString = await fileSystem(`readString`, [ `${this.dir}/router/source/local/${i}` ]);

      //merge
      code0 = svgTongString + "\n\n" + trapString + "\n\n";
      code2 = generalString + "\n\n" + consoleGeneralString + "\n\n" + publicGeneralString + "\n\n";
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
      await fileSystem(`write`, [ `${staticDir}/${i}`, result ]);

    }

  } catch (e) {
    console.log(e);
  }
}

PublicSector.prototype.spawnSector = async function (installMode = false) {
  const instance = this;
  const { home, name, spawnDir, serverDir, moduleName } = this;
  const { fileSystem, shellExec, shellLink, uniqueValue, ipCheck, treeParsing } = this.mother;
  try {
    const homeDir = await fileSystem(`readDir`, [ home ]);
    const package = await fileSystem(`readJson`, [ serverDir + "/package.json" ]);
    const getTarget = spawnDir + "/router/get";
    const postTarget = spawnDir + "/router/post";
    const router = spawnDir + "/router/router.py";
    const mother = spawnDir + "/router/mother.py";
    const main = spawnDir + "/public.py";
    let order;
    let getTargetDir, postTargetDir;
    let tempScript, tempArr, tempStr, tempStr2;
    let moduleTong, funcTong;
    let routerScript, routerScriptArr;
    let moduleIndex, funcIndex;
    let mainScript;
    let thisIp;
    let certDir, keyDir;
    let cert, key;
    let allTargets;
    let fromArr, toArr;
    let targetFolder;
    let fileName;
    let middleModule;
    let motherScript;


    if (installMode) {
      if (homeDir.includes(name)) {
        await shellExec(`sudo rm -rf ${shellLink(spawnDir)}`);
      }
      await shellExec(`cp`, [ `-rf`, serverDir, home ]);

      order = `cd ${shellLink(spawnDir)};mkdir ${moduleName};`;
      for (let m of package.dependencies) {
        order += `pip3 install ${m} --target="${shellLink(spawnDir)}/${moduleName}";`;
        console.log(`install ${m}...`);
      }
      await shellExec(order);

      console.log(`moduel install all`);
    } else {

      allTargets = (await treeParsing(serverDir)).flatDeath.filter((obj) => { return !obj.directory }).map((obj) => { return obj.absolute.slice(serverDir.length) });
      fromArr = allTargets.map((str) => { return serverDir + str });
      toArr = allTargets.map((str) => { return spawnDir + str });

      for (let i = 0; i < allTargets.length; i++) {
        tempArr = allTargets[i].split("/");
        tempArr.pop();
        tempArr.shift();
        tempArr.unshift(name);
        targetFolder = home;
        for (let f of tempArr) {
          targetFolder += "/";
          targetFolder += f;
          if (!(await fileSystem(`exist`, [ targetFolder ]))) {
            await shellExec(`mkdir`, [ targetFolder ]);
          }
        }

        await shellExec(`cp`, [ `-f`, fromArr[i], toArr[i] ]);
      }

      console.log(`file patch all`);
    }


    // mother

    motherScript = await fileSystem(`readString`, [ mother ]);
    motherScript = motherScript.replace(/__infoObj__/, JSON.stringify([
      {
        name: "pythoninfo",
        protocol: "https",
        host: instance.address.pythoninfo.host,
        port: 3000,
        static: "",
      },
      {
        name: "officeinfo",
        protocol: "https",
        host: instance.address.officeinfo.ghost.host,
        port: 443,
        static: instance.address.officeinfo.ghost.file.static,
      },
    ]));

    await fileSystem(`write`, [ mother, motherScript ]);


    // router

    if (await fileSystem(`exist`, [ getTarget ])) {
      getTargetDir = (await treeParsing(getTarget)).flatDeath.filter((obj) => { return !obj.directory }).map((obj) => { return obj.absolute }).filter((str) => { return !/__pycache__/gi.test(str) && !/\.DS_Store/gi.test(str); });
    } else {
      getTargetDir = [];
    }

    if (await fileSystem(`exist`, [ postTarget ])) {
      postTargetDir = (await treeParsing(postTarget)).flatDeath.filter((obj) => { return !obj.directory }).map((obj) => { return obj.absolute }).filter((str) => { return !/__pycache__/gi.test(str) && !/\.DS_Store/gi.test(str); });
    } else {
      postTargetDir = [];
    }

    moduleTong = [];
    funcTong = [];

    for (let absolute of getTargetDir) {
      fileName = absolute.split("/")[absolute.split("/").length - 1];
      middleModule = absolute.split("/")[absolute.split("/").length - 2];
      if (middleModule === "get") {
        middleModule = '';
      }

      tempScript = await fileSystem(`readString`, [ absolute ]);
      tempArr = tempScript.split("\n");
      tempArr = tempArr.filter((str) => { return /^\=\>/gi.test(str); });

      tempStr = '';
      tempStr += tempArr[0].replace(/^\=\> /, '').replace(/\//, "/publicSector" + "/" + middleModule + (middleModule === '' ? "" : "/"));
      tempStr += "\n";
      tempStr += "async def get_" + fileName.split(".")[0] + middleModule + uniqueValue("string") + uniqueValue("string") + "(request):";
      tempStr += "\n";
      tempStr += "    return " + tempArr[1].replace(/^\=\> /, '');
      funcTong.push(tempStr);

      tempStr2 = '';
      tempStr2 += "from router.get." + (middleModule !== '' ? middleModule + '.' : '') + fileName.split(".")[0] + " import " + "get" + fileName.split(".")[0].toUpperCase().slice(0, 1) + fileName.split(".")[0].slice(1);
      moduleTong.push(tempStr2);

      await fileSystem(`write`, [ absolute, tempScript.split("\n").filter((str) => { return !/^\=\>/gi.test(str); }).join("\n") ]);
    }

    for (let absolute of postTargetDir) {
      fileName = absolute.split("/")[absolute.split("/").length - 1];
      middleModule = absolute.split("/")[absolute.split("/").length - 2];
      if (middleModule === "post") {
        middleModule = '';
      }

      tempScript = await fileSystem(`readString`, [ absolute ]);
      tempArr = tempScript.split("\n");
      tempArr = tempArr.filter((str) => { return /^\=\>/gi.test(str); });

      tempStr = '';
      tempStr += tempArr[0].replace(/^\=\> /, '').replace(/\//, "/publicSector" + "/" + middleModule + (middleModule === '' ? "" : "/"));
      tempStr += "\n";
      tempStr += "async def post_" + fileName.split(".")[0] + middleModule + uniqueValue("string") + uniqueValue("string") + "(request):";
      tempStr += "\n";
      tempStr += "    return " + tempArr[1].replace(/^\=\> /, '');
      funcTong.push(tempStr);

      tempStr2 = '';
      tempStr2 += "from router.post." + (middleModule !== '' ? middleModule + '.' : '') + fileName.split(".")[0] + " import " + "post" + fileName.split(".")[0].toUpperCase().slice(0, 1) + fileName.split(".")[0].slice(1);
      moduleTong.push(tempStr2);

      await fileSystem(`write`, [ absolute, tempScript.split("\n").filter((str) => { return !/^\=\>/gi.test(str); }).join("\n") ]);
    }

    console.log("router update done", moduleTong);

    routerScript = await fileSystem(`readString`, [ router ]);
    routerScriptArr = routerScript.split("\n");

    moduleIndex = routerScriptArr.findIndex((str) => { return /^\=\> module/.test(str); });
    funcIndex = routerScriptArr.findIndex((str) => { return /^\=\> function/.test(str); });

    routerScriptArr[moduleIndex] = moduleTong.join("\n");
    routerScriptArr[funcIndex] = funcTong.join("\n\n");

    await fileSystem(`write`, [ router, routerScriptArr.join("\n").replace(/__mongo__/, '"' + instance.mother.mongolocalinfo + '"') ]);

    console.log("router patch done");


    // main

    thisIp = await ipCheck();

    certDir = await fileSystem(`readDir`, [ `${process.cwd()}/pems/${thisIp.rawObj.host}/cert` ]);
    keyDir = await fileSystem(`readDir`, [ `${process.cwd()}/pems/${thisIp.rawObj.host}/key` ]);

    cert = `"/pems/${thisIp.rawObj.host}/cert/${certDir.find((str) => { return /\.(pem|crt)$/i.test(str); })}"`;
    key = `"/pems/${thisIp.rawObj.host}/key/${keyDir.find((str) => { return /\.(pem|key)$/i.test(str); })}"`;

    mainScript = await fileSystem(`readString`, [ main ]);
    mainScript = mainScript.replace(/__cert__/, cert);
    mainScript = mainScript.replace(/__key__/, key);

    await fileSystem(`write`, [ main, mainScript ]);

    await shellExec(`cp`, [ `-rf`, `${process.cwd()}/pems`, spawnDir ]);

    console.log("pem patch done");

  } catch (e) {
    console.log(e);
  }
}

PublicSector.prototype.pythonServer = async function () {
  const instance = this;
  const { home, name, spawnDir, serverDir, initFile } = this;
  const { fileSystem, shellExec, shellLink } = this.mother;
  try {
    if (!(await fileSystem(`exist`, [ spawnDir ]))) {
      throw new Error("spawn first");
    }
    console.log(`\x1b[33m%s\x1b[0m`, `Python server running in 8443`);
    await shellExec(`cd ${shellLink(spawnDir)};python3 ${initFile};`);
  } catch (e) {
    console.log(e);
  }
}

module.exports = PublicSector;
