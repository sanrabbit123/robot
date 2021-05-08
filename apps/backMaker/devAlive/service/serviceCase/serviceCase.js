const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const SERVICE_DIR = process.cwd() + "/apps/backMaker/alive/service";

const ServiceCase = function (json) {
  this.value = json;
  this.index = 0;

  let tempArr0, tempArr1;
  this.matrix = [];
  tempArr0 = json.split("__split1__");
  for (let i of tempArr0) {
    tempArr1 = [];
    for (let j of i.split("__split0__")) {
      if (/^[0-9]/.test(j)) {
        tempArr1.push(Number(j));
      } else {
        tempArr1.push(j);
      }
    }
    this.matrix.push(tempArr1);
  }
}

ServiceCase.prototype.setIndex = function (num) {
  this.index = num;
}

ServiceCase.prototype.getMatrix = function () {
  return this.matrix;
}

ServiceCase.prototype.toNormal = function () {
  return this.value;
}

class ServiceMatrixArr extends Array {

}

class ServiceMatrix extends Array {

}

class ServiceCases extends Array {

  constructor(arr) {
    super();
    let tempInstance, num = 0;
    for (let i of arr) {
      tempInstance = new ServiceCase(i);
      tempInstance.setIndex(num);
      this.push(tempInstance);
      num++;
    }
    this.length = num;
  }

  getMatrixByNumber(index) {
    if (this[index] !== undefined) {
      return this[index].getMatrix();
    } else {
      return false;
    }
  }

  getMatrix() {
    let arr = new ServiceMatrixArr();
    for (let i of this) {
      arr.push(new ServiceMatrix(i.matrix));
    }
    return arr;
  }

  get matrix() {
    return this.getMatrix()
  }

  queryCase(str) {
    let none = true;
    for (let i of this) {
      if (str === i.value) {
        none = false;
        return i.index;
      }
    }
    if (none) {
      throw new Error("invaild matrix value");
    }
  }

  toNormal() {
    let arr = [];
    for (let i of this) {
      arr.push(i.toNormal());
    }
    return arr;
  }

}

module.exports = ServiceCases;
