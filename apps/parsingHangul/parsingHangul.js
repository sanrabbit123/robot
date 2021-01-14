const ParsingHangul = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  const Hangul = require(`${process.cwd()}/apps/parsingHangul/module/hangulModule.js`);
  const problems = require(`${process.cwd()}/apps/parsingHangul/lib/problems.js`);
  const fixed = require(`${process.cwd()}/apps/parsingHangul/lib/fixed.js`);
  this.mother = new Mother();
  this.back = new BackMaker();
  this.address = require(`${process.cwd()}/apps/infoObj.js`);
  this.dir = process.cwd() + "/apps/parsingHangul";
  this.hangul = Hangul;
  this.problems = problems;
  this.fixed = fixed;
}

ParsingHangul.prototype.fixString = function (ugly) {
  if (typeof ugly !== 'string') {
    throw new Error("must be string arguments");
  }

  const instance = this;
  const { disassemble, assemble } = this.hangul;
  let codeArr;

  codeArr = [];
  for (let i of ugly) {
    codeArr.push(i.charCodeAt(0));
  }

  return assemble(this.convertArr(codeArr));
}

ParsingHangul.prototype.launching = async function () {
  const instance = this;
  const { disassemble, assemble } = this.hangul;
  const { fileSystem } =  this.mother;
  try {


    let problemsCodes, fixedCodes;


    problemsCodes = [

    ];
    fixedCodes = [

    ];



    for (let i = 0; i < this.problems.mother.length; i++) {
      console.log(this.problems.base[i].charCodeAt(0), this.fixed.base[i].charCodeAt(0));
    }





  } catch (e) {
    console.log(e);
  }
}






module.exports = ParsingHangul;
