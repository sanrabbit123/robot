const GoogleSheet = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  this.mother = new Mother();
  this.dir = process.cwd() + "/apps/googleAPIs";
  this.pythonApp = this.dir + "/python/app.py";

  let alphabet, temp0, temp1;
  temp0 = 'A'.charCodeAt();
  temp1 = 'Z'.charCodeAt();
  alphabet = [];
  for (let i = temp0; i < temp1 + 1; i++) {
    alphabet.push(String.fromCharCode(i));
  }
  this.abc = [];
  for (let i of alphabet) {
    this.abc.push(i);
  }
  for (let i of alphabet) {
    for (let j of alphabet) {
      this.abc.push(i + j);
    }
  }
}

GoogleSheet.prototype.parsingId = function (link) {
  let linkArr, target;
  if (/^http/i.test(link)) {
    linkArr = (link.split('?'))[0].split('/');
    for (let i of linkArr) {
      if (!/docs/gi.test(i) && !/document/gi.test(i) && !/spreadsheets/gi.test(i) && !/drive/gi.test(i) && !/google/gi.test(i) && !/file/gi.test(i) && !/folders/gi.test(i) && !/view/gi.test(i)) {
        if (i.length > 12) {
          target = i;
        }
      }
    }
  } else {
    target = link;
  }
  return target;
}

GoogleSheet.prototype.create_newSheets_inPython = async function (title, parent) {
  const instance = this;
  const mother = this.mother;
  try {
    const { id } = await mother.pythonExecute(this.pythonApp, [ "sheets", "create" ], { title });
    await mother.pythonExecute(this.pythonApp, [ "drive", "moveFolder" ], { targetId: id, parent: parent });
    return id;
  } catch (e) {
    console.log(e);
  }
}

GoogleSheet.prototype.setting_cleanView_inPython = async function (id) {
  const instance = this;
  const mother = this.mother;
  try {
    id = this.parsingId(id);
    const result = await mother.pythonExecute(this.pythonApp, [ "sheets", "cleanView" ], { id });
    return result.message;
  } catch (e) {
    console.log(e);
  }
}

GoogleSheet.prototype.update_defaultSheetName_inPython = async function (id, title) {
  const instance = this;
  const mother = this.mother;
  try {
    id = this.parsingId(id);
    const result = await mother.pythonExecute(this.pythonApp, [ "sheets", "updateDefaultSheetName" ], { id, title });
    return result.message;
  } catch (e) {
    console.log(e);
  }
}

GoogleSheet.prototype.add_newSheet_inPython = async function (id, nameArr) {
  const instance = this;
  const mother = this.mother;
  try {
    id = this.parsingId(id);
    const result = await mother.pythonExecute(this.pythonApp, [ "sheets", "addSheet" ], { id, nameArr });
    return result.message;
  } catch (e) {
    console.log(e);
  }
}

GoogleSheet.prototype.get_value_inPython = async function (id, range) {
  const instance = this;
  const mother = this.mother;
  try {
    id = this.parsingId(id);
    let result = await mother.pythonExecute(this.pythonApp, [ "sheets", "get" ], { id, range });
    return result;
  } catch (e) {
    console.log(e);
  }
}

GoogleSheet.prototype.read = async function (id, range = "A1:ZZ") {
  const instance = this;
  class Matrix extends Array {
    constructor(arr) {
      super();
      let tempArr, max, columnIndex;
      let testArr, typeArr_raw, typeArr;
      let hiddenProperty;

      if (Array.isArray(arr) && arr.length > 1 && arr.every((obj) => { return Array.isArray(obj); })) {
        tempArr = arr.map((a) => { return a.length });
        tempArr.sort((a, b) => { return b - a; })
        max = tempArr[0];
        for (let array of arr) {
          if (array.length !== max) {
            do {
              array.push('');
            } while (array.length !== max);
          }
        }

        arr = arr.map((a) => {
          return a.map((s) => {
            let filtered;
            let tempArr0, tempArr1, tempArr2;
            if (typeof s === "string") {
              filtered = s.replace(/\n/g, '').trim();
              if (/[0-9]/gi.test(filtered)) {
                if (filtered.replace(/^\-/gi, '').replace(/[0-9\. ]/gi, '') === '') {
                  return Number(filtered.replace(/ /gi, ''));
                }
              }
              if (/[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]/i.test(filtered)) {
                tempArr0 = filtered.split('-');
                return new Date(Number(tempArr0[0]), Number(tempArr0[1]) - 1, Number(tempArr0[2]));
              }
              if (/[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9] [0-9][0-9]\:[0-9][0-9]\:[0-9][0-9]/i.test(filtered)) {
                tempArr0 = filtered.split(' ');
                tempArr1 = tempArr0[0].split('-');
                tempArr2 = tempArr0[1].split(':');
                return new Date(Number(tempArr1[0]), Number(tempArr1[1]) - 1, Number(tempArr1[2]), Number(tempArr2[0]), Number(tempArr2[1]), Number(tempArr2[2]));
              }
              if (filtered === '-') {
                return null;
              }
              if (filtered === '') {
                return null;
              } else {
                return filtered;
              }
            } else {
              return s;
            }
          });
        });

        columnIndex = arr.findIndex((a) => { return a.every((s) => { return s !== null }) })
        if (columnIndex === -1) {
          throw new Error("invaild matrix");
        }

        arr = arr.slice(columnIndex);


        testArr = arr.slice(1);
        if (testArr.length > 0) {
          typeArr_raw = [];
          for (let i = 0; i < testArr[0].length; i++) {
            tempArr = [];
            for (let a of arr) {
              if (a[i] !== null) {
                tempArr.push(a[i]);
              }
            }
            typeArr_raw.push(tempArr.slice(1));
          }

          typeArr = [];
          for (let i = 0; i < typeArr_raw.length; i++) {
            if (typeArr_raw[i].every((s) => { return s === 'O' || s === 'X'; })) {
              typeArr.push("boolean");
            } else {
              if (typeArr_raw[i].some((s) => { return typeof s === "number"; })) {
                typeArr.push("number");
              } else {
                if (typeArr_raw[i].some((s) => { return s instanceof Date; })) {
                  typeArr.push("date");
                } else {
                  typeArr.push("string");
                }
              }
            }
          }

          for (let i = 1; i < arr.length; i++) {
            arr[i] = arr[i].map((j, index) => {
              if (typeArr[index] === "string") {
                if (typeof j !== "string") {
                  return '';
                } else {
                  return j;
                }
              } else if (typeArr[index] === "number") {
                if (typeof j !== "number") {
                  return 0;
                } else {
                  return ;
                }
              } else if (typeArr[index] === "boolean") {
                if (j === 'O') {
                  return true;
                } else {
                  return false;
                }
              } else if (typeArr[index] === "date") {
                if (j instanceof Date) {
                  return j;
                } else {
                  return new Date(1800, 0, 1);
                }
              }
            });
          }

        } else {
          throw new Error("invaild matrix");
        }

        for (let i of arr) {
          if (!i.every((a) => { return a === null })) {
            this.push(i);
          }
        }

      }

      hiddenProperty = [ "columns", "json" ];
      for (let key of hiddenProperty) {
        Object.defineProperty(this, key, {
          enumerable: false,
          configurable: true,
          writable: true,
          value: false
        });
      }

    }

    setColumns(arr) {
      if (!Array.isArray(arr)) {
        throw new Error("invaild input 0");
      }
      if (!arr.every((s) => { return typeof s === "string" })) {
        throw new Error("invaild input 1");
      }
      if (this.length === 0) {
        throw new Error("invaild matrix");
      }
      if (this[0].length !== arr.length) {
        throw new Error("invaild input 2");
      }
      this[0] = arr;
      this.columns = true;
    }

    toJson() {
      if (!this.columns) {
        throw new Error("set columns first");
      }
      let result, target, columns;
      let tempObj;

      result = new Matrix();
      columns = this[0];
      target = this.slice(1);

      for (let arr of target) {
        tempObj = {};
        for (let i = 0; i < arr.length; i++) {
          tempObj[columns[i]] = arr[i];
        }
        result.push(tempObj);
      }

      result.columns = true;
      result.json = true;

      return result;
    }

    log() {
      console.log(this);
    }

    view() {
      if (!this.json) {
        throw new Error("json converting first");
      }
      console.table(this);
    }

  }
  try {
    let raw, columns, json;
    if (typeof id === "string") {
      return new Matrix(await this.get_value_inPython(id, range));
    } else if (typeof id === "object" && id !== null) {
      if (typeof id.id !== "string") {
        throw new Error("invaild input");
      }
      if (typeof id.range === "string") {
        range = id.range;
      }
      raw = new Matrix(await this.get_value_inPython(id.id, range));
      if (Array.isArray(id.columns)) {
        raw.setColumns(id.columns);
      }
      if (id.json === false) {
        return raw;
      } else {
        return raw.toJson();
      }
    } else {
      throw new Error("invaild input");
    }
  } catch (e) {
    console.log(e);
  }
}

GoogleSheet.prototype.update_value_inPython = async function (id, sheetName, values, startPoint = [ 0, 0 ]) {
  const instance = this;
  const mother = this.mother;
  try {
    let range, result;
    if (!Array.isArray(startPoint)) {
      throw new Error("invaild start point");
    }
    if (values.length > 0) {
      range = sheetName + "!";
      range += this.abc[startPoint[0]] + String(startPoint[1] + 1) + ':';
      range += this.abc[startPoint[0] + values[0].length - 1] + String(startPoint[1] + 1 + values.length - 1);
      id = this.parsingId(id);
      result = await mother.pythonExecute(this.pythonApp, [ "sheets", "update" ], { id, range, values });
      return result;
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
  }
}

GoogleSheet.prototype.update_values_inPython = async function (id, sheetsTargets, startPoint) {
  const instance = this;
  const mother = this.mother;
  try {
    if (typeof id !== "string") {
      throw new Error("invaild id");
    }
    if (!Array.isArray(sheetsTargets)) {
      throw new Error("multiple value must be [ { sheets, matrix }... ]");
    }
    for (let i = 0; i < sheetsTargets.length; i++) {
      if (typeof sheetsTargets[i] !== "object") {
        throw new Error("multiple value must be [ { sheets, matrix }... ]");
      }
      if (sheetsTargets[i].sheets === undefined || sheetsTargets[i].matrix === undefined) {
        throw new Error("multiple value must be [ { sheets, matrix }... ]");
      }
    }
    if (sheetsTargets.length > 0) {
      id = this.parsingId(id);
      for (let { sheets: sheetsName, matrix } of sheetsTargets) {
        await this.update_value_inPython(id, sheetsName, matrix, [ 0, 0 ]);
      }
      return "success";
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
  }
}

module.exports = GoogleSheet;
