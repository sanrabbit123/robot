class GaroseroArray extends Array {

  toSimple() {
    let arr = [];
    for (let { gs } of this) {
      arr.push(gs);
    }
    return arr;
  }

  get simple() {
    return this.toSimple();
  }

}

const GaroseroParser = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  this.mother = new Mother();
  this.dir = process.cwd() + "/apps/garoseroParser";
}

GaroseroParser.prototype.queryImage = async function (image) {
  const instance = this;
  const { fileSystem, shellExec, shellLink } = this.mother;
  try {
    const res = await shellExec(`identify -ping -format '%w %h' ${shellLink(image)}`);
    const [ width, height ] = res.trim().split(" ").map((str) => { return Number(str.trim()) });
    if (width > height) {
      return 'g';
    } else if (width < height) {
      return 's';
    } else {
      return 'c';
    }
  } catch (e) {
    console.log(e);
  }
}

GaroseroParser.prototype.queryImages = async function (imageArr) {
  const instance = this;
  const { fileSystem, shellExec, shellLink } = this.mother;
  try {
    let target, width, height, resultObj;
    let totalTong = new GaroseroArray();
    let number = 0;
    let res, tempArr;
    for (let i of imageArr) {
      res = await shellExec(`identify -ping -format '%w %h' ${shellLink(i)}`);
      [ width, height ] = res.trim().split(" ").map((str) => { return Number(str.trim()) });
      if (width > height) {
        totalTong.push({ index: number, file: i, gs: 'g' });
      } else if (width < height) {
        totalTong.push({ index: number, file: i, gs: 's' });
      } else {
        totalTong.push({ index: number, file: i, gs: 'c' });
      }
      number++;
    }
    return totalTong;
  } catch (e) {
    console.log(e);
  }
}

GaroseroParser.prototype.queryDirectory = async function (dir) {
  const instance = this;
  const { shell, shellLink, fileSystem, appleScript } = this.mother;
  try {
    let tongRaw, tong, result;
    let numberBoo;
    let sortFunc;

    tongRaw = await fileSystem(`readDir`, [ dir ]);
    tong = [];
    numberBoo = [];
    for (let i of tongRaw) {
      if (i !== `.DS_Store`) {
        tong.push(dir + "/" + i);
        if (/[0-9]/g.test(i)) {
          numberBoo.push("number");
        } else {
          numberBoo.push("string");
        }
      }
    }

    if (numberBoo.includes("string")) {
      tong.sort();
    } else {
      sortFunc = (str) => {
        return Number(str.replace(/_[0-9][0-9][0-9][0-9][0-9][0-9]$/, '').replace(/[^0-9]/g, ''));
      }
      tong.sort((a, b) => { return sortFunc(a) - sortFunc(b); });
    }

    result = await this.queryImages(tong);
    return result;
  } catch (e) {
    console.log(e);
  }
}

module.exports = GaroseroParser;
