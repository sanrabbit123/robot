const fs = require("fs");
const path = require("path");
const { sep, normalize } = path;
const shell = require("shelljs");
const shellLink = function (str) {
  let arr = str.split(sep);
  let newStr = '';
  for (let i of arr) {
    if (!/ /g.test(i) && !/\&/g.test(i) && !/\(/g.test(i) && !/\)/g.test(i) && !/\#/g.test(i) && !/\%/g.test(i) && !/\[/g.test(i) && !/\]/g.test(i) && !/\{/g.test(i) && !/\}/g.test(i) && !/\@/g.test(i) && !/\!/g.test(i) && !/\=/g.test(i) && !/\+/g.test(i) && !/\~/g.test(i) && !/\?/g.test(i) && !/\$/g.test(i)) {
      newStr += i + sep;
    } else if (!/'/g.test(i)) {
      newStr += "'" + i + "'" + sep;
    } else if (!/"/g.test(i)) {
      newStr += '"' + i + '"' + sep;
    } else {
      newStr += i + sep;
    }
  }
  newStr = newStr.slice(0, -1);
  return normalize(newStr);
}
const toolDirRoot = normalize(__dirname);
let toolDirRootArr = toolDirRoot.split(sep);
toolDirRootArr.pop();
const currentDirRoot = normalize(toolDirRootArr.join(sep));
const appDirRoot = normalize(currentDirRoot + sep + "apps");
const jsonDirRoot = normalize(currentDirRoot + sep + "jsondata");
const BasicTools = function () {}

BasicTools.print = function (arr) {
  if (!Array.isArray(arr)) {
    throw new Error("invaild input");
  }
  if (arr.length === 0) {
    console.log(null);
    return true;
  } else {
    let keys, testMatrix, testLength, testArr, boo;
    let standardArr, standardString;
    let length;
    let bar;
    if (arr.every((i) => { return typeof i === "object"; })) {
      testMatrix = arr.map((obj) => { return Object.keys(obj); });
      testArr = testMatrix[0];
      testLength = testMatrix[0].length;
      if (!testMatrix.every((a) => { return a.length === testLength; })) {
        throw new Error("must be object-array 1");
      }
      for (let a of testMatrix) {
        boo = false;
        for (let b of a) {
          if (!testArr.includes(b)) {
            boo = true;
          }
        }
        if (boo) {
          throw new Error("must be object-array 2");
        }
      }
    } else {
      throw new Error("must be object-array 3");
    }
    console.table(arr);
    return true;
  }
}

BasicTools.query = function (q) {
  const order = "tempQuery";
  const result = "mysqlQueryResult";
  fs.writeFileSync(normalize(jsonDirRoot + sep + order + ".sql"), q);
  shell.exec(`node ${shellLink(appDirRoot + sep + "fromMysql")} file_${order}`, { silent: true });
  const json = JSON.parse(fs.readFileSync(normalize(jsonDirRoot + sep + result + ".json")));
  BasicTools.print(json);
  return json;
}

module.exports = BasicTools;
