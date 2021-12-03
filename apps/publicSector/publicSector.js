const PublicSector = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  const ADDRESS = require(`${process.cwd()}/apps/infoObj.js`);
  this.mother = new Mother();
  this.back = new BackMaker();
  this.address = ADDRESS;
  this.dir = process.cwd() + "/apps/publicSector";
  this.serverDir = this.dir + "/python";
}

PublicSector.prototype.spawnSector = async function () {
  const instance = this;
  try {

    



  } catch (e) {
    console.log(e);
  }
}

module.exports = PublicSector;
