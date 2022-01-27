const Koala = function () {
  const Mother = require(process.cwd() + "/apps/mother.js");
  const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js");
  const ADDRESS = require(process.cwd() + "/apps/infoObj.js");
  this.mother = new Mother();
  this.back = new BackMaker();
  this.address = ADDRESS;
}

Koala.timeouts = {};

Koala.prototype.publicSector = async function () {
  try {
    const PublicSector = require(`${process.cwd()}/apps/publicSector/publicSector.js`);
    const sector = new PublicSector();
    await sector.spawnSector();
    await sector.staticRender();
    await sector.pythonServer();
  } catch (e) {
    console.log(e);
  }
}

Koala.prototype.spawnSector = async function (install = false) {
  try {
    const PublicSector = require(`${process.cwd()}/apps/publicSector/publicSector.js`);
    const app = new PublicSector();
    await app.spawnSector(install);
  } catch (e) {
    console.log(e);
  }
}

const koala = new Koala();
const MENU = {
  spawnSector: async function () {
    try {
      let arg;
      arg = typeof process.argv[3] === "string" ? process.argv[3] : "";
      await koala.spawnSector(arg === "install");
    } catch (e) {
      console.log(e);
    }
  },
  publicSector: async function () {
    try {
      await koala.publicSector();
    } catch (e) {
      console.log(e);
    }
  },
};
let launchingFunc;

if (process.argv[2] === undefined) {
  koala.launching().catch((err) => { console.log(err); });
} else {
  launchingFunc = MENU[process.argv[2]];
  if (launchingFunc !== undefined) {
    launchingFunc().catch((err) => { console.log(err); });
  }
}
