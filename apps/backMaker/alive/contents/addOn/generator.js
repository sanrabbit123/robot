const CLIENT_DIR = process.cwd() + "/apps/backMaker/alive/contents";
const Contents = require(CLIENT_DIR + "/contents.js");

class ContentsArr extends Array {

  toNormal() {
    let tong;
    tong = [];
    for (let i of this) {
      tong.push(i.toNormal());
    }
    return tong;
  }

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
