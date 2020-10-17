const NaverAPIs = function () {
  const Mother = require(process.cwd() + "/apps/mother.js");
  this.mother = new Mother();
  this.dir = process.cwd() + "/apps/naverAPIs";
  this.pythonApp = this.dir + "/python/app.py";
}

NaverAPIs.prototype.spellChecker = async function () {
  const instance = this;
  try {
    let res = await this.mother.pythonExecute(this.pythonApp, [ "spell" ], { target: "안녕 하세요? 내이름은 창규얌" });
    return res;
  } catch (e) {
    console.log(e);
  }
}

module.exports = NaverAPIs;
