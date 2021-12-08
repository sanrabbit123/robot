const ExcelReader = function () {
  const Mother = require(process.cwd() + "/apps/mother.js");
  const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js");
  const ADDRESS = require(process.cwd() + "/apps/infoObj.js");
  this.mother = new Mother();
  this.back = new BackMaker();
  this.address = ADDRESS;
  this.dir = process.cwd() + "/apps/excelReader";
  this.moduleDir = `${this.dir}/module`;
  this.readExcel = require(`${this.moduleDir}/readExcel.js`);
}

ExcelReader.prototype.fileToMatrix_inLocal = async function (filePath) {
  if (typeof filePath !== "string") {
    throw new Error("invaild input");
  }
  const instance = this;
  try {
    const matrix = await this.readExcel(filePath);
    return matrix;
  } catch (e) {
    console.log(e);
  }
}

ExcelReader.prototype.fileToMatrix = async function (filePath, sheetsName) {
  if (typeof filePath !== "string" || typeof sheetsName !== "string") {
    throw new Error("invaild input");
  }
  const instance = this;
  const address = this.address;
  const { generalFileUpload } = this.mother;
  try {
    await generalFileUpload("https://" + address.officeinfo.ghost.host + "/fileUpload", [ filePath ], [ "/temp" ]);


  } catch (e) {
    console.log(e);
  }
}

module.exports = ExcelReader;
