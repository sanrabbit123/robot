const BUILDER_DIR = process.cwd() + "/apps/backMaker/alive/builder";
const Builder = require(BUILDER_DIR + "/builder.js");

class Builders extends Array {

  toNormal() {
    let tong;
    tong = [];
    for (let i of this) {
      tong.push(i.toNormal());
    }
    return tong;
  }

}

const withTools = function (Builder) {
  return Builder;
}

const withToolsArr = function (Builders) {
  return Builders;
}

const Tools = function () {}
Tools.withTools = withTools;
Tools.withToolsArr = withToolsArr;

module.exports = { Builder, Builders, Tools };
