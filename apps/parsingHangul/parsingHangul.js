const ParsingHangul = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  const Hangul = require(`${process.cwd()}/apps/parsingHangul/module/hangulModule.js`);
  const problems = require(`${process.cwd()}/apps/parsingHangul/library/problems.js`);
  const fixed = require(`${process.cwd()}/apps/parsingHangul/library/fixed.js`);
  this.mother = new Mother();
  this.back = new BackMaker();
  this.address = require(`${process.cwd()}/apps/infoObj.js`);
  this.dir = process.cwd() + "/apps/parsingHangul";
  this.hangul = Hangul;
  this.problems = problems;
  this.fixed = fixed;
}

ParsingHangul.prototype.setMap = function () {
  const instance = this;
  let problemsCodes, problemsCodesArr, problemsCodesArrFlat;
  let target;
  let temp, tempObj;

  target = [
    "son",
    "mother",
    "base"
  ];

  problemsCodes = {
    son: [],
    mother: [],
    base: []
  };

  for (let t of target) {
    for (let i = 0; i < this.problems[t].length; i++) {
      temp = [];
      for (let j = 0; j < this.fixed[t][i].length; j++) {
        temp.push(this.fixed[t][i][j].charCodeAt(0));
      }
      tempObj = { char: this.fixed[t][i], code: temp };
      problemsCodes[t].push({ char: this.problems[t][i], code: this.problems[t][i].charCodeAt(0), fixed: tempObj });
    }
  }

  problemsCodesArr = [];
  problemsCodesArrFlat = [];
  for (let i in problemsCodes) {
    for (let j of problemsCodes[i]) {
      problemsCodesArr.push(j.code);
      problemsCodesArrFlat.push(j);
    }
  }

  this.map = problemsCodes;
  this.flatMap = problemsCodesArrFlat;
  this.problemsCodes = problemsCodesArr;
  return problemsCodes;
}

ParsingHangul.prototype.fixString = function (ugly) {
  if (typeof ugly !== 'string') {
    throw new Error("must be string arguments");
  }
  const instance = this;
  const { disassemble, assemble } = this.hangul;
  const get = function (num) {
    let result;
    for (let i of instance.flatMap) {
      if (i.code === num) {
        result = i;
      }
    }
    return result;
  }
  let newString;

  this.setMap();

  newString = [];
  for (let i of ugly) {
    if (this.problemsCodes.includes(i.charCodeAt(0))) {
      newString.push(get(i.charCodeAt(0)).fixed.char);
    } else {
      newString.push(i);
    }
  }

  return assemble(newString);
}

ParsingHangul.prototype.fixDir = function (target) {
  const instance = this;
  const { shell, shellLink, treeParsing } = this.mother;
  let boo, fixedString;
  let temp;
  let fixedAbsolute;

  this.setMap();

  const { flat, tree } = treeParsing(target);

  boo = false;
  for (let { fileName, absolute } of flat) {
    boo = false;
    for (let i of fileName) {
      if (this.problemsCodes.includes(i.charCodeAt(0))) {
        boo = true;
      }
    }
    if (boo) {
      fixedString = this.fixString(fileName);
      temp = absolute.split("/");
      temp.pop();
      fixedAbsolute = temp.join("/") + "/" + fixedString;
      shell.exec(`mv ${shellLink(absolute)} ${shellLink(fixedAbsolute)}`);
      console.log(`fix ${fixedString}`);
    }
  }
}

module.exports = ParsingHangul;
