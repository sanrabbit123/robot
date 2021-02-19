const PROJECT_DIR = process.cwd() + "/apps/backMaker/alive/aspirant";
const Aspirant = require(PROJECT_DIR + "/aspirant.js");

class Aspirants extends Array {

  toNormal() {
    let tong;
    tong = [];
    for (let i of this) {
      tong.push(i.toNormal());
    }
    return tong;
  }

}

const widthTools = function (Aspirant) {

  Aspirant.prototype.flatDeath = function () {
    const aspirant = this.toNormal();
  }

  return Aspirant;
}

const widthToolsArr = function (Aspirants) {

  Aspirants.prototype.flatDeath = function () {
    let tong, tempArr;
    tong = [];
    for (let i of this) {
      tempArr = i.flatDeath();
      for (let j of tempArr) {
        tong.push(j);
      }
    }
    return tong;
  }

  return Aspirants;
}

const Tools = function () {}
Tools.widthTools = widthTools;
Tools.widthToolsArr = widthToolsArr;

module.exports = { Aspirant, Aspirants, Tools };
