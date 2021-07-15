const fs = require("fs");
const path = require("path");
const { sep, normalize } = path;
const shell = require("shelljs");
const shellLink = function (str) {
  let arr = str.split(sep);
  let newStr = '';
  for (let i of arr) {
    if (!/ /g.test(i) && !/\&/g.test(i) && !/\(/g.test(i) && !/\)/g.test(i) && !/\#/g.test(i) && !/\%/g.test(i) && !/\[/g.test(i) && !/\]/g.test(i) && !/\{/g.test(i) && !/\}/g.test(i) && !/\@/g.test(i) && !/\!/g.test(i) && !/\=/g.test(i) && !/\+/g.test(i) && !/\~/g.test(i) && !/\?/g.test(i) && !/\$/g.test(i)) {
      newStr += i + sep;
    } else if (!/'/g.test(i)) {
      newStr += "'" + i + "'" + sep;
    } else if (!/"/g.test(i)) {
      newStr += '"' + i + '"' + sep;
    } else {
      newStr += i + sep;
    }
  }
  newStr = newStr.slice(0, -1);
  return normalize(newStr);
}
const equalJson = function (jsonString) {
  if (typeof jsonString === "object") {
    jsonString = JSON.stringify(jsonString);
  }
  const filtered = jsonString.replace(/(\"[0-9]+\-[0-9]+\-[0-9]+T[0-9]+\:[0-9]+\:[^Z]+Z\")/g, function (match, p1, offset, string) { return "new Date(" + p1 + ")"; });
  const tempFunc = new Function("const obj = " + filtered + "; return obj;");
  const json = tempFunc();
  return json;
}
const requestPromise = function (url, data = {}, config = {}) {
  const axios = require('axios');
  const FormData = require('form-data');

  let method, dataKeys, configKeys;
  let dataBoo, configBoo, jsonBoo;
  let options;
  let form;
  let finalConfig;
  let getData;
  let querystring;

  method = "get";
  dataKeys = Object.keys(data);
  configKeys = Object.keys(config);
  dataBoo = false;
  configBoo = false;
  jsonBoo = false;

  if (dataKeys.length === 0 && configKeys.length === 0) {
    method = "get";
    data = {};
    config = {};
    dataBoo = false;
    configBoo = false;
  } else if (dataKeys.length === 0 && configKeys.length > 0) {
    method = "get";
    dataBoo = false;
    configBoo = true;
  } else if (dataKeys.length > 0) {
    method = "post";
    dataBoo = true;
    configBoo = (configKeys.length === 0) ? false : true;
  }

  if (configBoo) {
    if (/json/gi.test(JSON.stringify(config))) {
      jsonBoo = true;
    } else if (config.method === "get") {
      method = "get";
      querystring = require("querystring");
      getData = "?";
      getData += querystring.stringify(data);
      url = url + getData;
      delete config.method;
    }
  }

  return new Promise(function (resolve, reject) {
    if (method === "get") {
      if (!configBoo) {
        axios.get(url).then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(error);
        });
      } else {
        axios.get(url, config).then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(error);
        });
      }
    } else if (method === "post") {
      axios.post(url, data, { headers: { "Content-Type": "application/json" } }).then(function (response) {
        resolve(response.data);
      }).catch(function (error) {
        reject(error);
      });
    }
  });
}
const consoleQ = function (question) {
  const readline = require(`readline`);
  const rL = readline.createInterface({ input : process.stdin, output : process.stdout });
  return new Promise(function(resolve, reject) {
    rL.question(question, function (input) {
      resolve(input);
      rL.close();
    });
  });
}
const fileSystem = function (sw, arr) {
  const fs = require('fs');
  if (!Array.isArray(arr)) { throw new Error("second argument must be array"); return; }
  switch (sw) {
    case "read":
      return new Promise(function (resolve, reject) {
        if (arr.length !== 1) { reject("second argument must be length 1 array"); }
        fs.readFile(arr[0], (err, data) => {
          if (err) { reject(err); }
          else { resolve(data); }
        });
      });
      break;
    case "readString":
      return new Promise(function (resolve, reject) {
        if (arr.length !== 1) { reject("second argument must be length 1 array"); }
        fs.readFile(arr[0], "utf8", (err, data) => {
          if (err) { reject(err); }
          else { resolve(data); }
        });
      });
      break;
    case "readBinary":
      return new Promise(function (resolve, reject) {
        if (arr.length !== 1) { reject("second argument must be length 1 array"); }
        fs.readFile(arr[0], "binary", (err, data) => {
          if (err) { reject(err); }
          else { resolve(data); }
        });
      });
      break;
    case "readJson":
      return new Promise(function (resolve, reject) {
        if (arr.length !== 1) { reject("second argument must be length 1 array"); }
        fs.readFile(arr[0], "utf8", (err, data) => {
          if (err) { reject(err); }
          else {
            try {
              resolve(JSON.parse(data));
            } catch (e) {
              reject(e);
            }
          }
        });
      });
      break;
    case "readDir":
      return new Promise(function (resolve, reject) {
        if (arr.length !== 1) { reject("second argument must be length 1 array"); }
        fs.readdir(arr[0], function (err, filelist) {
          if (err) { reject(err); }
          else { resolve(filelist); }
        });
      });
      break;
    case "write":
      return new Promise(function (resolve, reject) {
        if (arr.length !== 2) { reject("second argument must be length 2 array"); }
        fs.writeFile(arr[0], arr[1], "utf8", (err) => {
          if (err) { reject(err); }
          else { resolve("success"); }
        });
      });
      break;
    case "writeBinary":
      return new Promise(function (resolve, reject) {
        if (arr.length !== 2) { reject("second argument must be length 2 array"); }
        fs.writeFile(arr[0], arr[1], "binary", (err) => {
          if (err) { reject(err); }
          else { resolve("success"); }
        });
      });
      break;
    case "writeJson":
      return new Promise(function (resolve, reject) {
        if (arr.length !== 2) { reject("second argument must be length 2 array"); }
        if (typeof arr[0] !== "string" || typeof arr[1] !== "object") { reject("second argument must be string, object array"); }
        fs.writeFile(arr[0], JSON.stringify(arr[1], null, 2), "utf8", (err) => {
          if (err) { reject(err); }
          else { resolve("success"); }
        });
      });
      break;
    case "size":
      return new Promise(function (resolve, reject) {
        if (arr.length !== 1) { reject("second argument must be length 1 array"); }
        const { spawn } = require("child_process");
        const du = spawn("du", [ "-sk", arr[0] ]);
        let out;
        out = "";
        du.stdout.on("data", (data) => { out += String(data); });
        du.stderr.on("data", (data) => { reject(String(data)); });
        du.on("close", (code) => { resolve(Number((String(out).split("\t"))[0]) * 1000); });
      });
    case "mkdir":
      return new Promise(function (resolve, reject) {
        if (arr.length !== 1) { reject("second argument must be length 1 array"); }
        const { spawn } = require("child_process");
        const mkdir = spawn("mkdir", [ arr[0] ]);
        let out;
        out = "";
        mkdir.stdout.on("data", (data) => { out += String(data); });
        mkdir.stderr.on("data", (data) => { reject(String(data)); });
        mkdir.on("close", (code) => { resolve(arr[0]); });
      });
    case "exist":
      return new Promise(function(resolve, reject) {
        if (arr.length !== 1) { reject("second argument must be length 1 array"); }
        fs.access(arr[0], fs.constants.F_OK, function (err) {
          try {
            if (!err) { resolve(true); }
            else { resolve(false); }
          } catch (e) {
            resolve(false);
          }
        });
      });
  }
}
const sleep = function (time) {
  let timeoutId = null;
  return new Promise(function (resolve, reject) {
    timeoutId = setTimeout(function () {
      resolve('awake');
      clearTimeout(timeoutId);
    }, time);
  });
}
const treeParsing = async function (target, liteMode = false, liteCallBack = null) {
  if (/^\./.test(target)) {
    target = process.cwd() + target.slice(1);
  }
  const targetFolderName = (target.split("/"))[target.split("/").length - 1];
  const { exec } = require(`child_process`);
  const shellLink = function (str) {
    let arr = str.split('/');
    let newStr = '';
    for (let i of arr) {
      if (!/ /g.test(i) && !/\&/g.test(i) && !/\(/g.test(i) && !/\)/g.test(i) && !/\#/g.test(i) && !/\%/g.test(i) && !/\[/g.test(i) && !/\]/g.test(i) && !/\{/g.test(i) && !/\}/g.test(i) && !/\@/g.test(i) && !/\!/g.test(i) && !/\=/g.test(i) && !/\+/g.test(i) && !/\~/g.test(i) && !/\?/g.test(i) && !/\$/g.test(i)) {
        newStr += i + '/';
      } else if (!/'/g.test(i)) {
        newStr += "'" + i + "'" + '/';
      } else if (!/"/g.test(i)) {
        newStr += '"' + i + '"' + '/';
      } else {
        newStr += i + '/';
      }
    }
    newStr = newStr.slice(0, -1);
    return newStr;
  }
  const lsAl = function (target) {
    return new Promise(function (resolve, reject) {
      exec(`ls -al ${shellLink(target)}`, (error, stdout, stderr) => {
        if (error) {
          reject(error);
        } else {
          resolve(stdout);
        }
        return;
      });
    });
  }
  const exist = function (target) {
    const fs = require('fs');
    return new Promise(function (resolve, reject) {
      fs.access(target, fs.constants.F_OK, function (err) {
        try {
          if (!err) { resolve(true); }
          else { resolve(false); }
        } catch (e) {
          resolve(false);
        }
      });
    });
  }
  try {
    if (await exist(target)) {
      const makeFileArr = async function (target) {
        try {
          const stdout = await lsAl(target);
          let fileList;
          let tempArr, tempArr2, tempArr3, tempArr4, tempArr5;
          let temp, str;
          let newArr;

          fileList = stdout.split("\n");
          fileList.shift();
          fileList.pop();

          tempArr = [];
          for (let i of fileList) {
            newArr = [];
            for (let j of i.split(" ")) {
              if (j !== '' && j !== ' ') {
                newArr.push(j);
              }
            }
            tempArr.push(newArr);
          }

          tempArr2 = [];
          for (let i of tempArr) {
            temp = {};

            if (i[0][0] === 'd') {
              temp.directory = true;
            } else {
              temp.directory = false;
            }

            if (i.length > 9) {
              str = '';
              for (let j = 8; j < i.length; j++) {
                str += i[j];
                str += ' ';
              }
              temp.fileName = str.slice(0, -1);
            } else {
              temp.fileName = i[8];
            }

            if (temp.fileName[0] === '.') {
              temp.hidden = true;
            } else {
              temp.hidden = false;
            }

            temp.absolute = target + "/" + temp.fileName;

            temp.length = temp.absolute.split("/").length;

            tempArr2.push(temp);
          }

          tempArr3 = [];
          for (let i of tempArr2) {
            if (i.fileName !== '.' && i.fileName !== ".." && !/\-\>/gi.test(i.fileName) && i.fileName !== ".DS_Store") {
              tempArr3.push(i);
            }
          }

          tempArr4 = [];
          for (let i of tempArr3) {
            if (i.directory) {
              tempArr4.push(i);
              tempArr5 = await makeFileArr(i.absolute);
              for (let j of tempArr5) {
                tempArr4.push(j);
              }
            } else {
              tempArr4.push(i);
            }
          }

          tempArr4.unshift({
            directory: true,
            fileName: targetFolderName,
            hidden: (/^\./.test(targetFolderName)),
            absolute: target,
            length: target.split("/").length
          });

          return tempArr4;
        } catch (e) {
          console.log(e);
        }
      }
      if (!liteMode) {
        const setTree = async function (target) {
          try {
            const result = await makeFileArr(target);
            class TreeArray extends Array {

              get data() {
                return this[0];
              }

              get tree() {
                return this[0];
              }

              get value() {
                return this[0];
              }

              get target() {
                return target;
              }

              async returnFlat() {
                try {
                  const flatArr = await makeFileArr(target);
                  this.flatDeath = flatArr;
                  return flatArr;
                } catch (e) {
                  console.log(e);
                }
              }

              async setLength() {
                try {
                  let allFlats;
                  if (this.flatDeath === undefined || this.flatDeath === null) {
                    allFlats = await this.returnFlat();
                  } else {
                    allFlats = this.flatDeath;
                  }
                  allFlats.sort((a, b) => {
                    return a.length - b.length;
                  });
                  this.minLength = allFlats[0].length;
                  this.maxLength = allFlats[allFlats.length - 1].length;
                  this.totalLength = this.maxLength - this.minLength + 1;
                } catch (e) {
                  console.log(e);
                }
              }

              async returnIndexFlat(index) {
                try {
                  if (this.minLength === undefined) {
                    await this.setLength();
                  }
                  if (index !== "min" && index !== "max") {
                    if (typeof index !== "number") {
                      throw new Error("input must be number");
                    }
                  } else {
                    index = (index === "min") ? this.minLength : this.maxLength;
                  }
                  if (this.flatDeath === undefined || this.flatDeath === null) {
                    await this.returnFlat();
                  }
                  let arr = [];
                  for (let i of this.flatDeath) {
                    if (i.length === index) {
                      arr.push(i);
                    }
                  }
                  return arr;
                } catch (e) {
                  console.log(e);
                }
              }

              async returnFlatMatrix() {
                try {
                  if (this.minLength === undefined) {
                    await this.setLength();
                  }
                  let result = [];
                  for (let i = this.minLength; i < this.maxLength + 1; i++) {
                    result.push(await this.returnIndexFlat(i));
                  }
                  return result;
                } catch (e) {
                  console.log(e);
                }
              }

              setFromDir(dir) {
                this.fromDir = dir;
              }

              setToDir(dir) {
                this.toDir = dir;
              }

            }
            let absolutes, tempList;
            let filter;
            let filterSplit;
            let filterSplitJoin;
            let temp, temp2;
            let finalJson;
            let maxLength, minLength;
            let lengthArr;
            let tree;
            let finalTree;

            absolutes = [];
            absolutes.push(target);
            for (let i of result) {
              if (i.directory) {
                absolutes.push(i.absolute);
              }
            }

            filter = Array.from(new Set(absolutes));

            filterSplit = [];
            for (let i of filter) {
              filterSplit.push(i.split("/"));
            }

            filterSplit.sort((a, b) => {
              return a.length - b.length;
            });

            filterSplitJoin = [];
            for (let i of filterSplit) {
              temp = {
                directory: true,
                fileName: i[i.length - 1],
                hidden: (i[i.length - 1][0] === '.'),
                absolute: i.join("/"),
                files: [],
                length: i.length,
              };
              for (let j of result) {
                temp2 = j.absolute.split("/");
                if (!j.directory) {
                  if (temp2.length - 1 === i.length) {
                    if ((new RegExp('^' + temp.absolute)).test(j.absolute)) {
                      temp.files.push(j);
                    }
                  }
                }
              }
              filterSplitJoin.push(temp);
            }

            filterSplitJoin.sort((a, b) => {
              return a.length - b.length;
            });

            maxLength = filterSplitJoin[filterSplitJoin.length - 1].length;
            minLength = filterSplitJoin[0].length;

            lengthArr = [];
            for (let i = minLength; i < maxLength + 1; i++) {
              temp = [];
              for (let j of filterSplitJoin) {
                if (j.length === i) {
                  temp.push(j);
                }
              }
              lengthArr.push(temp);
            }

            finalJson = new TreeArray();
            finalJson.push(filterSplitJoin[0]);

            const directoryParsing = function (arr) {
              for (let obj of arr) {
                if (obj.directory) {
                  for (let i = 0; i < filterSplitJoin.length; i++) {
                    if (filterSplitJoin[i].directory) {
                      if ((new RegExp('^' + obj.absolute)).test(filterSplitJoin[i].absolute) && (obj.length + 1 === filterSplitJoin[i].length)) {
                        obj.files.push(filterSplitJoin[i]);
                      }
                    }
                  }
                }
              }
              for (let i of arr) {
                if (i.files !== undefined) {
                  i.files = directoryParsing(i.files);
                }
              }
              return arr;
            }

            finalTree = directoryParsing(finalJson);
            await finalTree.setLength();

            return finalTree;

          } catch (e) {
            console.log(e);
          }
        }
        return (await setTree(target));
      } else {
        const resultArr = await makeFileArr(target);
        let finalArr;
        finalArr = resultArr.map((obj) => { return obj.absolute + (obj.directory ? '/' : ''); });
        if (typeof liteCallBack === "function") {
          finalArr = finalArr.map(liteCallBack);
        }
        finalArr = Array.from(new Set(finalArr));
        return finalArr;
      }
    } else {
      return [];
    }
  } catch (e) {
    console.log(e);
  }
}
const dateToString = function (date, detail = false) {
  if (!(date instanceof Date)) {
    throw new Error("invaild input");
  }
  if (detail === undefined || detail === null) {
    detail = false;
  }
  if (typeof detail !== "boolean") {
    throw new Error("second input must be boolean");
  }
  const zeroAddition = (num) => { return (num < 10) ? `0${String(num)}` : String(num); }
  const emptyDateValue = (new Date(1901, 0, 1)).valueOf();
  const futureDateValue = (new Date(3000, 0, 1)).valueOf();
  if (date.valueOf() <= emptyDateValue) {
    return "-";
  } else if (date.valueOf() >= futureDateValue) {
    return "예정";
  } else {
    if (!detail) {
      return `${String(date.getFullYear())}-${zeroAddition(date.getMonth() + 1)}-${zeroAddition(date.getDate())}`;
    } else {
      return `${String(date.getFullYear())}-${zeroAddition(date.getMonth() + 1)}-${zeroAddition(date.getDate())} ${zeroAddition(date.getHours())}:${zeroAddition(date.getMinutes())}:${zeroAddition(date.getSeconds())}`;
    }
  }
}
const stringToDate = function (str) {
  if (typeof str !== "string") {
    throw new Error("invaild input");
  }
  if (str.trim() === '' || str.trim() === '-' || /없음/gi.test(str)) {
    return (new Date(1800, 0, 1));
  }
  if (str === "예정" || str === "진행중" || str === "미정") {
    return (new Date(3800, 0, 1));
  }
  if (!/^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]$/.test(str) && !/^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9] [0-9][0-9]\:[0-9][0-9]\:[0-9][0-9]$/.test(str)) {
    throw new Error("not date string");
  }
  let tempArr, tempArr2, tempArr3;
  if (/^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]$/.test(str)) {
    tempArr = str.split('-');
    return (new Date(Number(tempArr[0]), Number(tempArr[1]) - 1, Number(tempArr[2])));
  } else {
    tempArr = str.split(' ');
    tempArr2 = tempArr[0].split('-');
    tempArr3 = tempArr[1].split(':');
    return (new Date(Number(tempArr2[0]), Number(tempArr2[1]) - 1, Number(tempArr2[2]), Number(tempArr3[0]), Number(tempArr3[1]), Number(tempArr3[2])));
  }
}
const chromeOpen = async function (url) {
  const { exec } = require(`child_process`);
  const osModule = require(`os`);
  const thisOs = osModule.type();
  let os;
  if (/Linux/gi.test(thisOs)) {
    os = "linux";
  } else if (/Darwin/gi.test(thisOs)) {
    os = "mac";
  } else if (/Windows/gi.test(thisOs)) {
    os = "windows";
  } else {
    throw new Error("unknown os");
  }

  if (os === "linux") {
    return new Promise(function (resolve, reject) {
      exec(`killall chrome`, (error, stdout, stderr) => {
        exec(`google-chrome ${url} --start-maximized`);
        setTimeout(function () {
          resolve(stdout);
        }, 1000);
      });
    });

  } else if (os === "windows") {
    const path = require("path");
    const { sep, normalize } = path;
    const { exec, execFile } = require("child_process");
    const chrome = "C:/Program Files/Google/Chrome/Application/chrome.exe";
    return new Promise(function(resolve, reject) {
      exec(`taskkill /IM "chrome.exe" /F`, function (error, stdout, stderr) {
        execFile(normalize(chrome), [ "--start-maximized", url ], function (error, stdout, stderr) {
          setTimeout(function () {
            resolve(stdout);
          }, 1000);
        });
      });
    });

  } else if (os === "mac") {
    return new Promise(function (resolve, reject) {
      exec(`killall 'Google Chrome'`, (error, stdout, stderr) => {
        exec(`/Applications/'Google Chrome.app'/Contents/MacOS/'Google Chrome' --start-maximized ${url}`);
        setTimeout(function () {
          resolve(stdout);
        }, 1000);
      });
    });

  }
}

const toolDirRoot = normalize(__dirname);
let toolDirRootArr = toolDirRoot.split(sep);
toolDirRootArr.pop();
const currentDirRoot = normalize(toolDirRootArr.join(sep));
const appDirRoot = normalize(currentDirRoot + sep + "apps");
const jsonDirRoot = normalize(currentDirRoot + sep + "jsondata");
const promiseToSync = function (promiseFunc, input, tempFolder = null) {
  if (typeof promiseFunc !== "function" || !Array.isArray(input)) {
    throw new Error("invaild input");
  }
  if (typeof tempFolder !== "string") {
    tempFolder = jsonDirRoot;
  }
  const fs = require(`fs`);
  const shell = require(`shelljs`);
  const path = require("path");
  const { sep, normalize } = path;
  const shellLink = function (str) {
    let arr = str.split(sep);
    let newStr = '';
    for (let i of arr) {
      if (!/ /g.test(i) && !/\&/g.test(i) && !/\(/g.test(i) && !/\)/g.test(i) && !/\#/g.test(i) && !/\%/g.test(i) && !/\[/g.test(i) && !/\]/g.test(i) && !/\{/g.test(i) && !/\}/g.test(i) && !/\@/g.test(i) && !/\!/g.test(i) && !/\=/g.test(i) && !/\+/g.test(i) && !/\~/g.test(i) && !/\?/g.test(i) && !/\$/g.test(i)) {
        newStr += i + sep;
      } else if (!/'/g.test(i)) {
        newStr += "'" + i + "'" + sep;
      } else if (!/"/g.test(i)) {
        newStr += '"' + i + '"' + sep;
      } else {
        newStr += i + sep;
      }
    }
    newStr = newStr.slice(0, -1);
    return normalize(newStr);
  }
  const fileName = "___promiseFuncTempFile___" + String((new Date()).valueOf()) + String(Math.round(Math.random() * 10000)) + ".js";
  let funcString, outString, result;
  funcString = "const promiseFunc = " + promiseFunc.toString() + ";\n\n";
  funcString += "async function main() {\n";
  funcString += "\tconst input = " + JSON.stringify(input) + ";\n";
  funcString += "\treturn await promiseFunc(...input);\n";
  funcString += "};\n\n";
  funcString += "const { inspect } = require('util');\n\n"
  funcString += "main().then((stdout) => { if (typeof stdout === 'object') { console.log(JSON.stringify(stdout)); } else { console.log(stdout) } });"
  fs.writeFileSync(normalize(tempFolder + sep + fileName), funcString, { encoding: "utf8" });
  const { stdout } = shell.exec(`node ${shellLink(tempFolder + sep + fileName)}`, { silent: true });
  outString = (stdout.trim().replace(/^\n/, '').replace(/\n$/, '').replace(/^\n/, '').replace(/\n$/, '').replace(/^\n/, '').replace(/\n$/, '').trim());
  try {
    result = JSON.parse(outString);
  } catch (e) {
    result = outString;
  }
  shell.exec(`rm -rf ${shellLink(tempFolder + sep + fileName)}`, { silent: true });
  return result;
}


const BasicTools = function () {}

const JsonArrayFactor = function (obj) {
  if (typeof obj !== "object") {
    throw new Error("invaild input");
  }
  for (let i in obj) {
    this[i] = obj[i];
  }
}

JsonArrayFactor.prototype.timeStandard = function () {
  let key = null;
  for (let i in this) {
    if (/^[0-9]+\-[0-9]+\-[0-9]+T[0-9]+\:[0-9]+\:[^Z]+Z$/.test(this[i])) {
      key = i;
      break;
    } else if (/^\"[0-9]+\-[0-9]+\-[0-9]+T[0-9]+\:[0-9]+\:[^Z]+Z\"$/.test(this[i])) {
      key = i;
      break;
    } else if (/^[0-9][0-9][0-9][0-9][\-\/ \.][0-9][0-9][\-\/ \.][0-9][0-9]$/.test(this[i])) {
      key = i;
      break;
    } else if (/^[0-9][0-9][\-\/ \.][0-9][0-9][\-\/ \.][0-9][0-9]$/.test(this[i])) {
      key = i;
      break;
    } else if (/^[0-9][0-9][0-9][0-9][\-\/ \.][0-9][0-9][\-\/ \.][0-9][0-9] [0-9][0-9]:[0-9][0-9]:[0-9][0-9]$/.test(this[i])) {
      key = i;
      break;
    } else if (/^[0-9][0-9][\-\/ \.][0-9][0-9][\-\/ \.][0-9][0-9] [0-9][0-9]:[0-9][0-9]:[0-9][0-9]$/.test(this[i])) {
      key = i;
      break;
    }
  }
  return key;
}

class SearchArray extends Array {
  constructor(arr) {
    super();
    if (!Array.isArray(arr)) {
      throw new Error("must be array");
    }
    for (let i of arr) {
      this.push(i);
    }
  }
  search(query) {
    if (typeof query !== "string") {
      throw new Error("must be string");
    }
    let result = [];
    let boo, str;
    for (let obj of this) {
      if (typeof obj === "object") {
        str = JSON.stringify(obj);
      } else if (typeof obj === "string") {
        str = obj;
      } else {
        str = String(obj);
      }
      if ((new RegExp(query, "gi")).test(str)) {
        result.push(obj);
      }
    }
    return new SearchArray(result);
  }
}

class JsonArray extends Array {
  constructor(arr) {
    super();
    if (!Array.isArray(arr)) {
      throw new Error("must be array");
    }
    if (!arr.every((obj) => { return typeof obj === "object" })) {
      throw new Error("must be object array");
    }
    if (arr.length !== 0) {
      const self = this;
      let keys, tempKeys;
      keys = Object.keys(arr[0]);
      for (let i of arr) {
        tempKeys = Object.keys(i);
        if (!(tempKeys.every((k) => { return keys.includes(k); }) && tempKeys.length === keys.length)) {
          throw new Error("must be object array");
        }
      }
      for (let i of arr) {
        this.push(new JsonArrayFactor(i));
      }
      for (let k of keys) {
        Object.defineProperty(self, k, {
          get: function () {
            let childArray = [];
            for (let s of self) {
              childArray.push(s[k]);
            }
            return new SearchArray(childArray);
          }
        });
      }
    }
  }
  search(query) {
    if (typeof query !== "string") {
      throw new Error("must be string");
    }
    let result = [];
    let boo;
    for (let obj of this) {
      boo = false;
      for (let i in obj) {
        if ((new RegExp(query, "gi")).test(obj[i]) || (new RegExp(query, "gi")).test(i)) {
          boo = true;
        }
      }
      if (boo) {
        result.push(obj);
      }
    }
    return new JsonArray(result);
  }
  getDate(i) {
    if (typeof i === "object" && i instanceof Date) {
      return i;
    } else if (typeof i === "string") {
      return stringToDate(i);
    } else if (typeof i === "number" && Array.from(arguments).length >= 3) {
      let inputs = Array.from(arguments);
      if (inputs.every((j) => { return typeof j === "number"; })) {
        inputs[1] = inputs[1] - 1;
        return new Date(...inputs);
      }
    } else {
      throw new Error("invaild input");
    }
  }
  timeStandard(str) {
    const self = this;
    let targetDate, standardKey;
    if (typeof str === "string") {
      targetDate = stringToDate(str);
    } else if (typeof str === "number" && Array.from(arguments).length >= 3) {
      let inputs = Array.from(arguments);
      if (inputs.every((i) => { return typeof i === "number" })) {
        inputs[1] = inputs[1] - 1;
        targetDate = new Date(...inputs);
      }
    } else if (typeof str === "object" && str instanceof Date) {
      targetDate = str;
    } else {
      return null;
    }
    if (this.length > 0) {
      if (this[0].timeStandard() !== null) {
        standardKey = this[0].timeStandard();
        this.sort((a, b) => { return self.getDate(b[standardKey]).valueOf() - self.getDate(a[standardKey]).valueOf(); });
        return { standard: targetDate, key: standardKey };
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
  from(str) {
    if (this.timeStandard(str) !== null) {
      const { standard, key } = this.timeStandard(str);
      const standardValue = standard.valueOf();
      let index;
      for (let i = 0; i < this.length; i++) {
        if (this.getDate(this[i][key]).valueOf() < standardValue) {
          index = i;
          break;
        }
      }
      return new JsonArray(this.slice(index + 1));
    }
  }
}

BasicTools.print = function (i) {
  console.table(i);
}

BasicTools.view = function (i) {
  console.log(i);
}

BasicTools.request = function () {
  return promiseToSync(requestPromise, Array.from(arguments));
}

BasicTools.read = function (file) {
  if (typeof file !== "string") {
    throw new Error("invaild input");
  }
  const res = promiseToSync(fileSystem, [ "readString", [ file ] ]);
  let result;
  try {
    result = JSON.parse(res);
  } catch (e) {
    result = res;
  }
  return result;
}

BasicTools.write = function (where, what) {
  if (typeof where !== "string" || what === undefined) {
    throw new Error("invaild input");
  }
  if (typeof what === "object") {
    what = JSON.stringify(what, null, 2);
  }
  if (typeof what !== "string") {
    what = String(what);
  }
  return promiseToSync(fileSystem, [ "write", [ where, what ] ]);
}

BasicTools.exist = function (file) {
  if (typeof file !== "string") {
    throw new Error("invaild input");
  }
  return promiseToSync(fileSystem, [ "exist", [ file ] ]);
}

BasicTools.query = function (q) {
  const order = "tempQuery";
  const result = "mysqlQueryResult";
  fs.writeFileSync(normalize(jsonDirRoot + sep + order + ".sql"), q, { encoding: "utf8" });
  shell.exec(`node ${shellLink(normalize(appDirRoot + sep + "fromMysql"))} file_${order}`, { silent: true });
  const json = equalJson(BasicTools.read(normalize(jsonDirRoot + sep + result + ".json")));
  // BasicTools.print(json);
  return new JsonArray(json);
}

BasicTools.mongo = function (collection, whereQuery) {
  if (typeof collection !== "string" || typeof whereQuery !== "object") {
    throw new Error("invaild input");
  }
  const order = "tempMongo";
  const result = "result_" + order;
  fs.writeFileSync(normalize(jsonDirRoot + sep + order + ".json"), JSON.stringify([ collection, whereQuery ]), { encoding: "utf8" });
  shell.exec(`node ${shellLink(normalize(appDirRoot + sep + "fromMongo"))} ${order}`, { silent: true });
  const json = equalJson(BasicTools.read(normalize(jsonDirRoot + sep + result + ".json")));
  shell.exec(`rm -rf ${shellLink(normalize(jsonDirRoot + sep + order + ".json"))}`, { silent: true });
  shell.exec(`rm -rf ${shellLink(normalize(jsonDirRoot + sep + result + ".json"))}`, { silent: true });
  // BasicTools.print(json);
  return new JsonArray(json);
}

BasicTools.chrome = function (url) {
  if (typeof url !== "string") {
    throw new Error("invaild input");
  }
  chromeOpen(link);
  return 0;
}

BasicTools.sheets = function (title, json) {
  if (typeof title === "string" && typeof json === "object") {
    if (!Array.isArray(json)) {
      json = [ json ];
    }
  } else if (typeof title === "object" && json === undefined) {
    if (!Array.isArray(title)) {
      title = [ title ];
    }
    json = JSON.parse(JSON.stringify(title));
    title = "시트추출_" + String((new Date()).valueOf());
  } else {
    throw new Error("invaild input");
  }

  if (!Array.isArray(json)) {
    throw new Error("invaild input");
  }
  if (json.length === 0) {
    throw new Error("invaild input");
  } else {
    let keys, testMatrix, testLength, testArr, boo;
    let standardArr, standardString;
    let length;
    let bar;
    if (json.every((i) => { return typeof i === "object"; })) {
      testMatrix = json.map((obj) => { return Object.keys(obj); });
      testArr = testMatrix[0];
      testLength = testMatrix[0].length;
      if (!testMatrix.every((a) => { return a.length === testLength; })) {
        throw new Error("must be object-array 1");
      }
      for (let a of testMatrix) {
        boo = false;
        for (let b of a) {
          if (!testArr.includes(b)) {
            boo = true;
          }
        }
        if (boo) {
          throw new Error("must be object-array 2");
        }
      }
    } else {
      throw new Error("must be object-array 3");
    }
  }

  const order = "tempSheets";
  const result = "result_" + order;
  fs.writeFileSync(normalize(jsonDirRoot + sep + order + ".json"), JSON.stringify([ title, json ]), { encoding: "utf8" });
  shell.exec(`node ${shellLink(normalize(appDirRoot + sep + "toSheets"))} ${order}`, { silent: true });
  const link = BasicTools.read(normalize(jsonDirRoot + sep + result + ".json"));
  shell.exec(`rm -rf ${shellLink(normalize(jsonDirRoot + sep + order + ".json"))}`, { silent: true });
  shell.exec(`rm -rf ${shellLink(normalize(jsonDirRoot + sep + result + ".json"))}`, { silent: true });
  chromeOpen(link);
  return link;
}

BasicTools.sheet = function (title, json) {
  return BasicTools.sheets(title, json);
}

BasicTools.sleep = function (num) {
  if (typeof num !== "number") {
    throw new Error("invaild input");
  }
  return promiseToSync(sleep, [ num * 1000 ]);
}

BasicTools.tree = function () {
  return promiseToSync(treeParsing, Array.from(arguments));
}

BasicTools.shell = function (command) {
  if (typeof command !== "string") {
    throw new Error("input must be string");
  }
  const { stdout } = shell.exec(command);
  return stdout;
}

BasicTools.comma = function (str) {
  let minus;
  let count, countArr;
  let temp, tempArr;
  if (typeof str === "number") {
    str = String(Math.floor(str));
  }
  if (/e/gi.test(str)) {
    throw new Error("is too heavy");
  }
  minus = /\-/g.test(str) ? /\-/g.exec(str)[0] : '';
  str = str.replace(/[^0-9]/g, '');
  if (str === '') {
    throw new Error("invaild number");
  }
  count = Math.ceil(str.length / 3);
  countArr = [];
  for (let i = 0; i < count; i++) {
    countArr.push([ 3 * i, 3 * (i + 1) ]);
  }
  if (countArr.length === 0) {
    throw new Error("invaild number");
  }
  tempArr = [];
  for (let arr of countArr) {
    temp = '';
    for (let i = arr[0]; i < arr[1]; i++) {
      if (str.length - 1 - i < 0) {
        temp += '';
      } else {
        temp = str[str.length - 1 - i] + temp;
      }
    }
    if (temp !== '') {
      tempArr.unshift(temp);
    }
  }
  return (minus + tempArr.join(','));
}

BasicTools.date = function (i) {
  if (typeof i === "object") {
    return dateToString(i);
  } else if (typeof i === "string") {
    return stringToDate(i);
  } else if (typeof i === "number" && Array.from(arguments).length >= 3) {
    let inputs = Array.from(arguments);
    if (inputs.every((j) => { return typeof j === "number"; })) {
      inputs[1] = inputs[1] - 1;
      return new Date(...inputs);
    }
  }
}

module.exports = BasicTools;
