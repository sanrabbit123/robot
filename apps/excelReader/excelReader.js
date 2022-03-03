const ExcelReader = function (mother = null, back = null, address = null) {
  if (mother !== null && back !== null && address !== null) {
    this.mother = mother;
    this.back = back;
    this.address = address;
  } else {
    const Mother = require(process.cwd() + "/apps/mother.js");
    const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js");
    const ADDRESS = require(process.cwd() + "/apps/infoObj.js");
    this.mother = new Mother();
    this.back = new BackMaker();
    this.address = ADDRESS;
  }
  this.dir = process.cwd() + "/apps/excelReader";
  this.pythonApp = this.dir + "/python/app.py";
}

ExcelReader.prototype.fileToMatrix = async function (filePath, sheetsName) {
  if (typeof filePath !== "string" || typeof sheetsName !== "string") {
    throw new Error("invaild input");
  }
  const instance = this;
  const { pythonExecute } = this.mother;
  try {
    return await pythonExecute(this.pythonApp, [ "read" ], { filePath, sheetsName });
  } catch (e) {
    console.log(e);
  }
}

module.exports = ExcelReader;
