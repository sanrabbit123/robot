const Rabbit = function () {
  const Mother = require(process.cwd() + "/apps/mother.js");
  const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js");
  const ADDRESS = require(process.cwd() + "/apps/infoObj.js");
  this.mother = new Mother();
  this.back = new BackMaker();
  this.address = ADDRESS;
}

Rabbit.prototype.abstractRabbit = async function () {
  try {
    const AbstractRabbit = require(process.cwd() + "/apps/abstractRabbit/abstractRabbit.js");
    const app = new AbstractRabbit();
    await app.connect();
  } catch (e) {
    console.log(e);
  }
}

Rabbit.prototype.launching = async function () {
  try {
    await this.abstractRabbit();
  } catch (e) {
    console.log(e);
  }
}

// EXE --------------------------------------------------------------------------------------

const rabbit = new Rabbit();
rabbit.launching().catch((err) => { console.log(err); });