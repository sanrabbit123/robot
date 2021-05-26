const SpawnCatfish = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  const GoogleSheet = require(`${process.cwd()}/apps/googleAPIs/googleSheet.js`);
  this.mother = new Mother();
  this.back = new BackMaker();
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

    key = JSON.parse(await fileSystem(`readString`, [ `${this.app}/jsondata/mongoKey.json` ]));

    key.mongo.hash = await this.mother.cryptoString(key.mongo.password, this.mother.mongopythoninfo);
    key.mysql.hash = await this.mother.cryptoString(key.mongo.password, JSON.stringify(this.mother.mysqlpythoninfo));

    command = '';

    if (reload) {
      if (homeDir.includes(this.applicationName)) {
        shell.exec(`rm -rf ${shellLink(home)}/${this.applicationName};`);
      }
      command += `mkdir ${shellLink(home)}/${this.applicationName};`;
      // command += `cd ${shellLink(home)};`;
      // command += `git clone git@gitlab.com:uragen/${this.applicationName}.git;`;
      // command += `cd ${shellLink(home)}/${this.applicationName};`;
      // command += `git pull;`;
    } else {
      if (!homeDir.includes(this.applicationName)) {
        throw new Error("There is no " + this.applicationName);
      } else {
        command += `cd ${shellLink(home)}/${this.applicationName};`;
        command += `git pull;`;
      }
    }

    command += `cp -r ${shellLink(this.app)} ${shellLink(home)};`;
    for (let g of googleList) {
      command += `cp ${shellLink(process.cwd())}/apps/googleAPIs/${g} ${shellLink(home)}/${this.applicationName}/${this.nodeAppName}/googleAPIs;`;
    }
    // command += `cd ${shellLink(home)}/${this.applicationName};`;
    // command += `git add -A;`;
    // command += `git commit -m "CatfishAutoUpdate_${todayMaker("total")}";`;
    // command += `git push;`;

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
