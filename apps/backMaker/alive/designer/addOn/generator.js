const DESIGNER_DIR = process.cwd() + "/apps/backMaker/alive/designer";
const Designer = require(DESIGNER_DIR + "/designer.js");

class Designers extends Array {

}

const widthTools = function (Designer) {

  return Designer;
}

const widthToolsArr = function (Designers) {

  return Designers;
}

const Tools = function () {}
Tools.widthTools = widthTools;
Tools.widthToolsArr = widthToolsArr;

module.exports = { Designer, Designers, Tools };
