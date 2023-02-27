const TextDecorator = function (mother = null, back = null, address = null) {
  if (mother !== null && back !== null && address !== null) {
    this.mother = mother;
    this.back = back;
    this.address = address;
  } else {
    const Mother = require(process.cwd() + "/apps/mother.js");
    const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js");
    const ADDRESS = require(process.cwd() + "/apps/infoObj.js");
    this.mother = new Mother();
    this.back = new BackMaker();
    this.address = ADDRESS;
  }
  this.dir = process.cwd() + "/apps/textDecorator";
  this.moduleDir = this.dir + "/module";

  const cliTools = require(this.moduleDir + "/bundle.js");
  this.cliUi = cliTools.cliUi;
  this.cliColor = cliTools.cliColor;

  this.set = {
    plain: {},
    bold: {
      color: "red",
      bold: true,
    },
    under: {
      color: "green",
      under: true,
    },
    special: {
      color: "blue",
      background: "white",
    },
  };

}

TextDecorator.prototype.decorateText = function (obj) {
  const instance = this;
  const { cliUi, cliColor } = this;

  if (typeof obj !== "object" || obj === null) {
    throw new Error("invalid input");
  }
  if (typeof obj.text !== "string") {
    throw new Error("invalid input 2");
  }

  let thisText;
  let finalFunc;

  finalFunc = null;
  thisText = obj.text;

  if (typeof obj.color === "string") {
    finalFunc = cliColor[obj.color];
  }

  if (obj.bold === true) {
    if (typeof finalFunc === "function") {
      finalFunc = finalFunc.bold;
    } else {
      finalFunc = cliColor.bold;
    }
  }

  if (obj.under === true) {
    if (typeof finalFunc === "function") {
      finalFunc = finalFunc.underline;
    } else {
      finalFunc = cliColor.underline;
    }
  }

  if (typeof obj.background === "string") {
    if (typeof finalFunc === "function") {
      finalFunc = finalFunc["bg" + obj.background.slice(0, 1).toUpperCase() + obj.background.slice(1)];
    } else {
      finalFunc = cliColor["bg" + obj.background.slice(0, 1).toUpperCase() + obj.background.slice(1)];
    }
  }

  if (typeof finalFunc === "function") {
    return finalFunc(thisText);
  } else {
    return thisText;
  }
}

TextDecorator.prototype.printText = function (obj) {
  const instance = this;
  const { cliUi, cliColor } = this;
  let finalText;
  if (typeof obj !== "object" || obj === null) {
    throw new Error("invalid input");
  }
  if (Array.isArray(obj)) {
    if (!obj.every((o) => { return typeof o === "object" && o !== null })) {
      throw new Error("invalid input 3");
    } else {
      finalText = "";
      for (let obj2 of obj) {
        finalText += this.decorateText(obj2);
      }
      console.log(finalText);
    }
  } else {
    console.log(this.decorateText(obj));
  }
}

TextDecorator.prototype.parseString = function (str) {
  const instance = this;
  if (typeof str !== "string") {
    throw new Error("invalid input");
  }
  let arr;
  let tong;
  let baguni;
  let requestTong;
  let tempObj;

  str = str.replace(/\<b\%/gi, "__bold__%b%");
  str = str.replace(/\%b\>/gi, "__bold__");

  arr = str.split("__bold__");

  tong = [];
  for (let s of arr) {
    s = s.replace(/\<u\%/gi, "__under__%u%");
    s = s.replace(/\%u\>/gi, "__under__");
    tong.push(s.split("__under__"));
  }

  tong = tong.flat();

  baguni = [];
  for (let s of tong) {
    s = s.replace(/\<s\%/gi, "__special__%s%");
    s = s.replace(/\%s\>/gi, "__special__");
    baguni.push(s.split("__special__"));
  }

  baguni = baguni.flat().filter((s) => { return s !== '' });

  requestTong = [];
  for (let rawStr of baguni) {
    tempObj = {};
    if (/^\%[a-z]\%/.test(rawStr)) {
      tempObj.text = rawStr.replace(/^\%[a-z]\%/, "");
      if (rawStr.slice(0, 3) === "%b%") {
        for (let key in this.set.bold) {
          tempObj[key] = this.set.bold[key];
        }
      } else if (rawStr.slice(0, 3) === "%u%") {
        for (let key in this.set.under) {
          tempObj[key] = this.set.under[key];
        }
      } else if (rawStr.slice(0, 3) === "%s%") {
        for (let key in this.set.special) {
          tempObj[key] = this.set.special[key];
        }
      }
    } else {
      tempObj.text = rawStr;
      for (let key in this.set.plain) {
        tempObj[key] = this.set.plain[key];
      }
    }
    requestTong.push(tempObj);
  }
  return requestTong;
}

TextDecorator.prototype.setPlain = function (obj) {
  const instance = this;
  if (typeof obj !== "object" || obj === null) {
    throw new Error("invalid input");
  }
  this.set.plain = obj;
}

TextDecorator.prototype.setBold = function (obj) {
  const instance = this;
  if (typeof obj !== "object" || obj === null) {
    throw new Error("invalid input");
  }
  this.set.bold = obj;
}

TextDecorator.prototype.setUnder = function (obj) {
  const instance = this;
  if (typeof obj !== "object" || obj === null) {
    throw new Error("invalid input");
  }
  this.set.under = obj;
}

TextDecorator.prototype.setSpecial = function (obj) {
  const instance = this;
  if (typeof obj !== "object" || obj === null) {
    throw new Error("invalid input");
  }
  this.set.special = obj;
}

TextDecorator.prototype.reload = function () {
  const instance = this;
  this.set = {
    plain: {},
    bold: {
      color: "red",
      bold: true,
    },
    under: {
      color: "green",
      under: true,
    },
    special: {
      color: "blue",
      background: "white",
    },
  };
}

TextDecorator.prototype.print = function (obj) {
  const instance = this;
  if (typeof obj === "object" && obj !== null) {
    this.printText(obj);
  } else if (typeof obj === "string") {
    this.printText(this.parseString(obj));
  } else {
    throw new Error("invalid input")
  }
}

module.exports = TextDecorator;

