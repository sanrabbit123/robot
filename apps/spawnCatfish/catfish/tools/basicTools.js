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

BasicTools.query = function (q) {
  const order = "tempQuery";
  const result = "mysqlQueryResult";
  fs.writeFileSync(normalize(jsonDirRoot + sep + order + ".sql"), q);
  shell.exec(`node ${shellLink(appDirRoot + sep + "fromMysql")} file_${order}`, { silent: true });
  return JSON.parse(fs.readFileSync(normalize(jsonDirRoot + sep + result + ".json")));
}




module.exports = BasicTools;
