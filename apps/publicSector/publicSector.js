const PublicSector = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  const ADDRESS = require(`${process.cwd()}/apps/infoObj.js`);
  this.mother = new Mother();
  this.back = new BackMaker();
  this.address = ADDRESS;
  this.dir = process.cwd() + "/apps/publicSector";
  this.home = process.env.HOME;
  this.name = "sector";
  this.staticName = "static";
  this.serverDir = this.dir + "/" + this.name;
  this.spawnDir = this.home + "/" + this.name;
  this.staticDir = this.home + "/" + this.staticName;
  this.moduleName = "python_modules";
}

PublicSector.prototype.staticRender = async function () {
  const instance = this;
  const { home, name, spawnDir, serverDir, staticName, staticDir } = this;
  const { fileSystem, shellExec } = this.mother;
  try {




    console.log("this")





  } catch (e) {
    console.log(e);
  }
}

PublicSector.prototype.spawnSector = async function () {
  const instance = this;
  const { home, name, spawnDir, serverDir, moduleName } = this;
  const { fileSystem, shellExec, shellLink, uniqueValue, ipCheck } = this.mother;
  try {
    const homeDir = await fileSystem(`readDir`, [ home ]);
    const package = await fileSystem(`readJson`, [ serverDir + "/package.json" ]);
    const getTarget = spawnDir + "/router/get";
    const postTarget = spawnDir + "/router/post";
    const router = spawnDir + "/router/router.py";
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

    if (homeDir.includes(name)) {
      await shellExec(`sudo rm -rf ${shellLink(spawnDir)}`);
    }
    await shellExec(`cp`, [ `-r`, serverDir, home ]);

    order = `cd ${shellLink(spawnDir)};mkdir ${moduleName};`;
    for (let m of package.dependencies) {
      order += `pip3 install ${m} --target="${shellLink(spawnDir)}/${moduleName}";`;
      console.log(`install ${m}...`);
    }
    await shellExec(order);

    console.log(`moduel install all`);

    if (await fileSystem(`exist`, [ getTarget ])) {
      getTargetDir = await fileSystem(`readDir`, [ getTarget ]);
    } else {
      getTargetDir = [];
    }

    if (await fileSystem(`exist`, [ postTarget ])) {
      postTargetDir = await fileSystem(`readDir`, [ postTarget ]);
    } else {
      postTargetDir = [];
    }

    getTargetDir = getTargetDir.filter((name) => { return name !== ".DS_Store"; });
    postTargetDir = postTargetDir.filter((name) => { return name !== ".DS_Store"; });

    moduleTong = [];
    funcTong = [];

    for (let name of getTargetDir) {
      tempScript = await fileSystem(`readString`, [ `${getTarget}/${name}` ]);
      tempArr = tempScript.split("\n");
      tempArr = tempArr.filter((str) => { return /^\=\>/gi.test(str); });

      tempStr = '';
      tempStr += tempArr[0].replace(/^\=\> /, '');
      tempStr += "\n";
      tempStr += "async def get_" + uniqueValue("string") + "(request):";
      tempStr += "\n";
      tempStr += "    return " + tempArr[1].replace(/^\=\> /, '');
      funcTong.push(tempStr);

      tempStr2 = '';
      tempStr2 += "from router.get." + name.split(".")[0] + " import " + "get" + name.split(".")[0].toUpperCase().slice(0, 1) + name.split(".")[0].slice(1);
      moduleTong.push(tempStr2);

      await fileSystem(`write`, [ `${getTarget}/${name}`, tempScript.split("\n").filter((str) => { return !/^\=\>/gi.test(str); }).join("\n") ]);
    }

    for (let name of postTargetDir) {
      tempScript = await fileSystem(`readString`, [ `${postTargetDir}/${name}` ]);
      tempArr = tempScript.split("\n");
      tempArr = tempArr.filter((str) => { return /^\=\>/gi.test(str); });

      tempStr = '';
      tempStr += tempArr[0].replace(/^\=\> /, '');
      tempStr += "\n";
      tempStr += "async def post_" + uniqueValue("string") + "(request):";
      tempStr += "\n";
      tempStr += "    return " + tempArr[1].replace(/^\=\> /, '');
      funcTong.push(tempStr);

      tempStr2 = '';
      tempStr2 += "from router.post." + name.split(".")[0] + " import " + "post" + name.split(".")[0].toUpperCase().slice(0, 1) + name.split(".")[0].slice(1);
      moduleTong.push(tempStr2);

      await fileSystem(`write`, [ `${postTarget}/${name}`, tempScript.split("\n").filter((str) => { return !/^\=\>/gi.test(str); }).join("\n") ]);
    }

    console.log("router update done", moduleTong);

    routerScript = await fileSystem(`readString`, [ router ]);
    routerScriptArr = routerScript.split("\n");

    moduleIndex = routerScriptArr.findIndex((str) => { return /^\=\> module/.test(str); });
    funcIndex = routerScriptArr.findIndex((str) => { return /^\=\> function/.test(str); });

    routerScriptArr[moduleIndex] = moduleTong.join("\n");
    routerScriptArr[funcIndex] = funcTong.join("\n\n");

    await fileSystem(`write`, [ router, routerScriptArr.join("\n") ]);

    console.log("router patch done");

    thisIp = await ipCheck();

    certDir = await fileSystem(`readDir`, [ `${process.cwd()}/pems/${thisIp.rawObj.host}/cert` ]);
    keyDir = await fileSystem(`readDir`, [ `${process.cwd()}/pems/${thisIp.rawObj.host}/key` ]);

    cert = `"/pems/${thisIp.rawObj.host}/cert/${certDir.find((str) => { return /\.(pem|crt)$/i.test(str); })}"`;
    key = `"/pems/${thisIp.rawObj.host}/key/${keyDir.find((str) => { return /\.(pem|key)$/i.test(str); })}"`;

    mainScript = await fileSystem(`readString`, [ main ]);
    mainScript = mainScript.replace(/__cert__/, cert);
    mainScript = mainScript.replace(/__key__/, key);

    await fileSystem(`write`, [ main, mainScript ]);

    await shellExec(`cp`, [ `-r`, `${process.cwd()}/pems`, spawnDir ]);

    console.log("pem patch done");

    await this.staticRender();

  } catch (e) {
    console.log(e);
  }
}

module.exports = PublicSector;
