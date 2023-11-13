const SpawnHuman = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  this.mother = new Mother();
  this.back = new BackMaker();
  this.address = require(`${process.cwd()}/apps/infoObj.js`);
  this.dir = process.cwd() + "/apps/spawnHuman";
  this.applicationName = "human";
  this.appDir = this.dir + "/" + this.applicationName;
}

SpawnHuman.prototype.spawnLaunching = async function (setupMode = false) {
  const instance = this;
  const { applicationName, appDir } = this;
  const { equalJson, shellExec, shellLink, fileSystem } = this.mother;
  try {
    const homeFolder = process.env.HOME;
    const homeFolderList = await fileSystem("readFolder", [ homeFolder ]);
    const homeTarget = homeFolder + "/" + applicationName
    if (homeFolderList.includes(applicationName)) {



      
      await shellExec("rm", [ "-rf", homeTarget ]);



    }
    await shellExec("cp", [ "-r", appDir, homeTarget ]);







  } catch (e) {
    console.log(e);
  }
}

module.exports = SpawnHuman;
