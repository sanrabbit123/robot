const ReadDocuments = function (mother = null, back = null, address = null) {
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
  this.dir = process.cwd() + "/apps/readDocuments";
  this.moduleDir = this.dir + "/module";
}

ReadDocuments.prototype.readDocx = async function (fileName) {
  const instance = this;
  const { moduleDir } = this;
  const readDocx = require(moduleDir + "/readDocx.js");
  try {
    const text = await readDocx(fileName);
    return text;
  } catch (e) {
    console.log(e);
  }
}

module.exports = ReadDocuments;

