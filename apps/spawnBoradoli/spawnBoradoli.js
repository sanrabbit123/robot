const SpawnBoradoli = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  const GoogleSheet = require(`${process.cwd()}/apps/googleAPIs/googleSheet.js`);

  this.mother = new Mother();
  this.back = new BackMaker();
  this.address = require(`${process.cwd()}/apps/infoObj.js`);

  this.dir = process.cwd() + "/apps/spawnBoradoli";
  this.sheets = new GoogleSheet();
  this.applicationName = "boradoli";
  this.app = this.dir + "/" + this.applicationName;
  this.nodeAppName = "apps";
}

SpawnBoradoli.prototype.viewTree = async function () {
  const instance = this;
  const { treeParsing } = this.mother;
  try {
    const tree = await treeParsing(this.app);
    return tree;
  } catch (e) {
    console.log(e);
  }
}

SpawnBoradoli.prototype.spawnLaunching = async function () {
  const instance = this;
  const { shell, shellLink, fileSystem, todayMaker } = this.mother;
  try {
    const address = this.address;
    const mongoInfo = "mongodb://" + address.officeinfo.user + ':' + address.officeinfo.password + '@' + address.officeinfo.ghost.inner + ':' + String(address.officeinfo.port) + "/admin";
    const mysqlInfo = {
      host: address.officeinfo.ghost.inner,
      user: address.officeinfo.mysql.user,
      password: address.officeinfo.mysql.password,
      port: address.officeinfo.mysql.port,
      database: address.officeinfo.mysql.database
    };
    const home = process.env.HOME;
    const homeDir = await fileSystem(`readDir`, [ home ]);
    const googleList = [
      "googleAnalytics.js",
      "googleCalendar.js",
      "googleDocs.js",
      "googleDrive.js",
      "googleSheet.js",
    ];
    let command, key;

    key = await fileSystem(`readJson`, [ `${this.app}/jsondata/mongoKey.json` ]);
    key.mongo.hash = await this.mother.cryptoString(key.mongo.password, mongoInfo);
    key.mysql.hash = await this.mother.cryptoString(key.mongo.password, JSON.stringify(mysqlInfo));

    command = '';

    if (homeDir.includes(this.applicationName)) {
      shell.exec(`rm -rf ${shellLink(home)}/${this.applicationName};`);
    }
    command += `mkdir ${shellLink(home)}/${this.applicationName};`;
    command += `cp -r ${shellLink(this.app)} ${shellLink(home)};`;
    for (let g of googleList) {
      command += `cp ${shellLink(process.cwd())}/apps/googleAPIs/${g} ${shellLink(home)}/${this.applicationName}/${this.nodeAppName}/googleAPIs;`;
    }
    command += `cd ${shellLink(home)}/${this.applicationName};`;
    command += `npm install;`;

    shell.exec(command);
    await fileSystem(`write`, [ `${home}/${this.applicationName}/jsondata/mongoKey.json`, JSON.stringify(key, null, 2) ]);

    shell.exec(`open ${shellLink(home)}/${this.applicationName};`);

  } catch (e) {
    console.log(e);
  }
}

SpawnBoradoli.prototype.spawnPython = async function (name) {
  const instance = this;
  const { shell, shellLink, fileSystem, consoleQ, tempDelete } = this.mother;
  try {
    const address = this.address;
    const applications = (await fileSystem(`readDir`, [ this.dir + "/python" ])).filter((a) => { return a !== "general" && a !== ".DS_Store" });
    const home = process.env.HOME;
    const homeDir = await fileSystem(`readDir`, [ home ]);
    const setupFile = "setup.py";
    const initAppName = "app.py";
    const executeName = "exe";
    const packageName = "package.json";
    let package;
    let command, applicationName, applicationTarget;

    if (typeof name !== "string") {
      do {
        applicationName = await consoleQ("application name what?");
      } while (applicationName === '' || /[ \n\t]/gi.test(applicationName));
    } else {
      applicationName = name;
    }

    if (applications.includes(applicationName)) {
      applicationTarget = applications.find((i) => { return i === applicationName });
    } else {
      applicationTarget = null;
    }

    if (homeDir.includes(applicationName)) {
      shell.exec(`rm -rf ${shellLink(home)}/${applicationName};`);
    }

    command = '';
    if (applicationTarget === null) {
      command += `cp -r ${shellLink(this.dir + "/python/general")} ${shellLink(process.cwd() + "/temp")};`;
      command += `mv ${shellLink(process.cwd() + "/temp/general")} ${shellLink(process.cwd() + "/temp/" + applicationName)};`;
      command += `cp -r ${shellLink(process.cwd() + "/temp/" + applicationName)} ${shellLink(home)}/${applicationName};`;
    } else {
      command += `cp -r ${shellLink(this.dir + "/python/general")} ${shellLink(process.cwd() + "/temp")};`;
      command += `mv ${shellLink(process.cwd() + "/temp/general")} ${shellLink(process.cwd() + "/temp/" + applicationName)};`;
      command += `cp -r ${shellLink(process.cwd() + "/temp/" + applicationName)} ${shellLink(home)}/${applicationName};`;
      command += `rm -rf ${shellLink(home)}/${applicationName}/${initAppName};`;
      command += `rm -rf ${shellLink(home)}/${applicationName}/${packageName};`;
      command += `cp -r ${shellLink(this.dir + "/python/" + applicationName)} ${shellLink(home)};`;
    }

    await tempDelete();
    shell.exec(command);
    package = await fileSystem(`readJson`, [ `${home}/${applicationName}/${packageName}` ]);
    package.name = applicationName;
    await fileSystem(`writeJson`, [ `${home}/${applicationName}/${packageName}`, package ]);
    await fileSystem(`write`, [ `${home}/${applicationName}/${executeName}`, `excuteFile="${shellLink(`${home}/${applicationName}/${initAppName}`)}";\ncd ${shellLink(`${home}/${applicationName}`)};\npython3 $excuteFile;` ]);

    command = '';
    command += `cd ${shellLink(home)}/${applicationName};`;
    command += `chmod +x ${shellLink(home)}/${applicationName}/${executeName};`;
    command += `python3 ${shellLink(home)}/${applicationName}/${setupFile} install`;

    await tempDelete();
    shell.exec(command);
    await tempDelete();

  } catch (e) {
    console.log(e);
  }
}

module.exports = SpawnBoradoli;
