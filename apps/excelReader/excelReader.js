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

ExcelReader.prototype.convertExcelMatrix = function (arr) {
  if (!Array.isArray(arr)) {
    throw new Error("input must be object-array");
  }
  if (!arr.every((obj) => { return typeof obj === "object" })) {
    throw new Error("input must be object-array");
  }
  if (arr.length === 0) {
    throw new Error("input cannot be zero array");
  }
  const instance = this;
  const { equalJson } = this.mother;
  let columns;
  let result;
  let keys;
  let tong, tempObj;
  let arrCopied;

  if (!Array.isArray(arr[0])) {

    columns = Object.keys(arr[0]);

    result = {};
    for (let key of columns) {
      result[key] = [];
    }

    for (let obj of arr) {
      for (let key in obj) {
        result[key].push(obj[key]);
      }
    }

    return result;

  } else {

    if (arr.length <= 1) {
      throw new Error("invaild matrix");
    }

    arrCopied = equalJson(JSON.stringify(arr));
    keys = arr[0];

    arrCopied.shift();

    tong = [];
    for (let a of arrCopied) {
      tempObj = {};
      for (let i = 0; i < a.length; i++) {
        tempObj[keys[i]] = a[i];
      }
      tong.push(tempObj);
    }

    return this.convertExcelMatrix(tong);
    
  }
}

ExcelReader.prototype.matrixToFile = async function (arr, filePath) {
  const instance = this;
  const { pythonExecute } = this.mother;
  try {
    return await pythonExecute(this.pythonApp, [ "write" ], { filePath, matrix: this.convertExcelMatrix(arr) });
  } catch (e) {
    console.log(e);
  }
}

module.exports = ExcelReader;
