const SpawnCatfish = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  const GoogleSheet = require(`${process.cwd()}/apps/googleAPIs/googleSheet.js`);
  this.mother = new Mother();
  this.back = new BackMaker();
  this.address = require(`${process.cwd()}/apps/infoObj.js`);
  this.dir = process.cwd() + "/apps/spawnCatfish";
  this.sheets = new GoogleSheet();
  this.applicationName = "catfish";
  this.app = this.dir + "/" + this.applicationName;
  this.nodeAppName = "apps";
}

SpawnCatfish.prototype.viewTree = async function () {
  const instance = this;
  const { treeParsing } = this.mother;
  try {
    const tree = await treeParsing(this.app);

    return tree;
  } catch (e) {
    console.log(e);
  }
}

SpawnCatfish.prototype.spawnLaunching = async function (reload = true) {
  const instance = this;
  const { shell, shellLink, fileSystem, todayMaker } = this.mother;
  try {
    const address = this.address;
    const mongoInfo = "mongodb://" + address.officeinfo.user + ':' + address.officeinfo.password + '@' + address.officeinfo.ghost.host + ':' + String(address.officeinfo.port) + "/admin";
    const mysqlInfo = {
      host: address.officeinfo.ghost.host,
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

module.exports = SpawnCatfish;
