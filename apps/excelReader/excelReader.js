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
}

ExcelReader.prototype.fileToMatrix_inLocal = async function (filePath) {
  if (typeof filePath !== "string") {
    throw new Error("invaild input");
  }
  const instance = this;
  const readExcel = require(`${this.dir}/module/readExcel.js`);
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
  const { generalFileUpload, uniqueValue, requestSystem, ghostRequest } = this.mother;
  const fileNameConst = "excel_";
  try {
    let tempFileName;
    let matrix;
    let file;

    tempFileName = fileNameConst + uniqueValue("hex") + ".xlsx";
    file = "/tong/" + tempFileName;

    await generalFileUpload("https://" + address.officeinfo.ghost.host + "/fileUpload", [ filePath ], [ file ]);
    matrix = (await requestSystem("https://" + address.officeinfo.ghost.host + "/publicSector/excel", { file, sheetsName })).data;
    await ghostRequest("/tongDelete");

    return matrix;
  } catch (e) {
    console.log(e);
  }
}

module.exports = ExcelReader;
