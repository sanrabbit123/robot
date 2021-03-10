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

ParsingHangul.prototype.fixDir = async function (target) {
  const instance = this;
  const { shell, shellLink, treeParsing } = this.mother;
  try {
    let boo, fixedString;
    let temp;
    let fixedAbsolute;
    let min, max;
    let tree;
    let finalTarget;
    let arr;

    this.setMap();

    await this.mother.sleep(5000);

    console.log("aaa");

    // tree = treeParsing(target);
    //
    // min = tree.minLength;
    // max = tree.maxLength;
    //
    // fixedString = null;
    // boo = false;
    // for (let { fileName, absolute } of tree.returnIndexFlat(min)) {
    //   boo = false;
    //   for (let i of fileName) {
    //     if (this.problemsCodes.includes(i.charCodeAt(0))) {
    //       boo = true;
    //     }
    //   }
    //   if (boo) {
    //     fixedString = this.fixString(fileName);
    //     temp = absolute.split("/");
    //     temp.pop();
    //     fixedAbsolute = temp.join("/") + "/" + fixedString;
    //     shell.exec(`mv ${shellLink(absolute)} ${shellLink(fixedAbsolute)}`);
    //     console.log(`fix ${fixedString}`);
    //   }
    // }
    //
    // if (fixedString === null) {
    //   finalTarget = tree.target;
    // } else {
    //   temp = target.split("/");
    //   temp.pop();
    //   finalTarget = temp.join("/") + "/" + fixedString;
    // }
    //
    // console.log(`target set : min(${String(min)}), max(${String(max)})`);
    //
    // tree = treeParsing(finalTarget);
    //
    // for (let i = min + 1; i < max + 1; i++) {
    //   tree = treeParsing(finalTarget);
    //   console.log(`tree reload`);
    //   arr = tree.returnIndexFlat(i);
    //   console.log(`find index ${String(i)} flat`);
    //
    //   fixedString = null;
    //   boo = false;
    //   for (let { fileName, absolute } of arr) {
    //     boo = false;
    //     for (let i of fileName) {
    //       if (this.problemsCodes.includes(i.charCodeAt(0))) {
    //         boo = true;
    //       }
    //     }
    //     if (boo) {
    //       fixedString = this.fixString(fileName);
    //       temp = absolute.split("/");
    //       temp.pop();
    //       fixedAbsolute = temp.join("/") + "/" + fixedString;
    //       shell.exec(`mv ${shellLink(absolute)} ${shellLink(fixedAbsolute)}`);
    //       console.log(`fix ${fixedString}`);
    //     }
    //   }
    // }
    //
    // return tree;
  } catch (e) {
    console.log(e);
  }
}

ParsingHangul.prototype.fixDirPromise = function (target) {
  const instance = this;
  return new Promise(function (resolve, reject) {
    if (target === undefined || target === null) {
      reject("invaild arguments");
    } else {
      instance.fixDir(target, function (tree) {
        resolve(tree);
      });
    }
  });
}

module.exports = ParsingHangul;
