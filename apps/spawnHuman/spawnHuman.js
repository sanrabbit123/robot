const SpawnHuman = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);

  this.mother = new Mother();
  this.back = new BackMaker();
  this.address = require(`${process.cwd()}/apps/infoObj.js`);

  this.dir = process.cwd() + "/apps/spawnHuman";
  this.applicationName = "human";
  this.app = this.dir + "/" + this.applicationName;
}

SpawnHuman.prototype.spawnLaunching = async function () {
  const instance = this;
  const { equalJson, shellExec, shellLink, fileSystem } = this.mother;
  try {

    



  } catch (e) {
    console.log(e);
  }
}

module.exports = SpawnHuman;
