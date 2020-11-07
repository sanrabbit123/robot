const CLIENT_DIR = process.cwd() + "/apps/backMaker/alive/contents";
const Contents = require(CLIENT_DIR + "/contents.js");

class ContentsArr extends Array {

}

const widthTools = function (Contents) {

  return Contents;
}

const widthToolsArr = function (ContentsArr) {

  return ContentsArr;
}

const Tools = function () {}
Tools.widthTools = widthTools;
Tools.widthToolsArr = widthToolsArr;

module.exports = { Contents, ContentsArr, Tools };
