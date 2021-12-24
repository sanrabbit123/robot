const ADDRESS = {
  "officeinfo": {
    "ghost": {
      "host": "home-liaison.serveftp.com",
      "monitor": {
        "path": "/officeMonitor"
      }
    }
  },
  "homeinfo": {
    "ghost": {
      "host": "home-liaison.servehttp.com"
    }
  }
};

const Mother = function () {
  this.address = ADDRESS;
}

// <<<<<<<<< MOTHER COPIED START
{
  Mother.prototype.consoleQ = function (question) {
    const readline = require(`readline`);
    const rL = readline.createInterface({ input : process.stdin, output : process.stdout });
    return new Promise(function(resolve, reject) {
      rL.question(question, function (input) {
        resolve(input);
        rL.close();
      });
    });
  }

  Mother.prototype.shellExec = function (command, args = null) {
    if (typeof command === "string") {
      if (!Array.isArray(args)) {
        const { exec } = require("child_process");
        return new Promise((resolve, reject) => {
          exec(command, { cwd: process.cwd(), maxBuffer: 20 * 1024 * 1024 }, (error, stdout, stderr) => {
            if (error) {
              reject(error);
            } else {
              if (typeof stdout === "string") {
                resolve(stdout.trim());
              } else {
                resolve(stdout);
              }
            }
          });
        });
      } else {
        const { spawn } = require("child_process");
        if (args.every((s) => { return typeof s === "string"; })) {
          return new Promise((resolve, reject) => {
            const name = command;
            const program = spawn(name, args);
            let out;
            out = "";
            program.stdout.on("data", (data) => { out += String(data); });
            program.stderr.on("data", (data) => { reject(String(data)); });
            program.on("close", (code) => { resolve(out.trim()); });
          });
        } else {
          throw new Error("invaild input");
        }
      }
    } else if (Array.isArray(command)) {
      if (command.length > 0) {
        const { spawn } = require("child_process");
        if (command.every((s) => { return typeof s === "string"; })) {
          return new Promise((resolve, reject) => {
            const name = command[0];
            const program = spawn(name, command.slice(1));
            let out;
            out = "";
            program.stdout.on("data", (data) => { out += String(data); });
            program.stderr.on("data", (data) => { reject(String(data)); });
            program.on("close", (code) => { resolve(out.trim()); });
          });
        } else if (command.every((s) => { return Array.isArray(s); })) {
          if (command.every((arr) => { return arr.length > 0 })) {
            return Promise.all(command.map((arr) => {
              arr = arr.flat();
              if (!arr.every((s) => { return typeof s === "string"; })) {
                throw new Error("invaild input");
              }
              return new Promise((resolve, reject) => {
                const name = arr[0];
                const program = spawn(name, arr.slice(1));
                let out;
                out = "";
                program.stdout.on("data", (data) => { out += String(data); });
                program.stderr.on("data", (data) => { reject(String(data)); });
                program.on("close", (code) => { resolve(out.trim()); });
              });
            }));
          } else {
            throw new Error("invaild input");
          }
        } else {
          throw new Error("invaild input");
        }
      } else {
        throw new Error("invaild input");
      }
    } else {
      throw new Error("invaild input");
    }
  }

  Mother.prototype.shellLink = function (str) {
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

  Mother.prototype.fileSystem = function (sw, arr) {
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
      case "readFolder":
        return new Promise(function (resolve, reject) {
          if (arr.length !== 1) { reject("second argument must be length 1 array"); }
          fs.readdir(arr[0], function (err, filelist) {
            if (err) { reject(err); }
            else { resolve(Array.from(filelist).filter((str) => { return str !== ".DS_Store"; })); }
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
      case "remove":
        return new Promise(function (resolve, reject) {
          if (arr.length !== 1) { reject("second argument must be length 1 array"); }
          const { spawn } = require("child_process");
          const mkdir = spawn("rm", [ "-rf", arr[0] ]);
          let out;
          out = "";
          mkdir.stdout.on("data", (data) => { out += String(data); });
          mkdir.stderr.on("data", (data) => { reject(String(data)); });
          mkdir.on("close", (code) => { resolve(arr[0]); });
        });
      case "open":
        return new Promise(function (resolve, reject) {
          if (arr.length !== 1) { reject("second argument must be length 1 array"); }
          const { spawn } = require("child_process");
          const open = spawn("open", [ arr[0] ]);
          let out;
          out = "";
          open.stdout.on("data", (data) => { out += String(data); });
          open.stderr.on("data", (data) => { reject(String(data)); });
          open.on("close", (code) => { resolve(arr[0]); });
        });
    }
  }

  Mother.prototype.requestSystem = function (url, data = {}, config = {}) {
    const axios = require('axios');
    const FormData = require('form-data');

    let method, dataKeys, configKeys;
    let dataBoo, configBoo, jsonBoo, nvpBoo;
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
    nvpBoo = false;

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
      } else if (/x\-www\-form\-urlencoded/gi.test(JSON.stringify(config))) {
        nvpBoo = true;
        querystring = require("querystring");
        data = querystring.stringify(data);
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
            resolve(response);
          }).catch(function (error) {
            reject(error);
          });
        } else {
          axios.get(url, config).then(function (response) {
            resolve(response);
          }).catch(function (error) {
            reject(error);
          });
        }

      } else if (method === "post") {

        if (jsonBoo) {
          axios.post(url, data, config).then(function (response) {
            resolve(response);
          }).catch(function (error) {
            reject(error);
          });
        } else if (nvpBoo) {
          axios.post(url, data, config).then(function (response) {
            resolve(response);
          }).catch(function (error) {
            reject(error);
          });
        } else {
          form = new FormData();
          for (let key in data) {
            if (typeof data[key] === 'object') {
              form.append(key, JSON.stringify(data[key]));
            } else {
              form.append(key, data[key]);
            }
          }
          let formHeaders = form.getHeaders();
          if (!configBoo) {
            axios.post(url, form, { headers: { ...formHeaders } }).then(function (response) {
              resolve(response);
            }).catch(function (error) {
              reject(error);
            });
          } else {
            finalConfig = { headers: { ...formHeaders } };
            if (config.headers !== undefined) {
              for (let z in config.headers) {
                finalConfig.headers[z] = config.headers[z];
              }
              for (let z in config) {
                if (z !== "headers") {
                  finalConfig[z] = config[z];
                }
              }
            } else {
              for (let z in config) {
                finalConfig[z] = config[z];
              }
            }
            axios.post(url, form, finalConfig).then(function (response) {
              resolve(response);
            }).catch(function (error) {
              reject(error);
            });
          }
        }

      }
    });
  }

  Mother.prototype.headRequest = function (to, port = 80, headers = {}) {
    if (typeof to !== "string" || typeof headers !== "object") {
      throw new Error("invaild input");
    }
    if (typeof port === "object" && Object.keys(headers).length === 0) {
      headers = port;
      port = 80;
    }
    let http;
    let target, tempArr;
    let pathArr, pathString;
    let options;
    let host;
    if (/^https:\/\//.test(to)) {
      target = to.slice(8);
      http = require("https");
      port = 443;
    } else if (/^http:\/\//.test(to)) {
      target = to.slice(7);
      http = require("http");
      port = 80;
    } else {
      target = to;
      http = require("http");
      port = 80;
    }
    pathArr = target.split('/');
    pathString = '/';
    for (let i = 0; i < pathArr.length; i++) { if (i !== 0) {
      pathString += pathArr[i] + '/';
    }}
    pathString = pathString.slice(0, -1);
    if (/\:/g.test(pathArr[0])) {
      tempArr = pathArr[0].split(':');
      host = tempArr[0];
      port = Number(tempArr[1].replace(/[^0-9]/g, ''));
      if (Number.isNaN(port)) {
        throw new Error("invaild port");
      }
    } else {
      host = pathArr[0];
    }
    options = {
      hostname: host,
      port: port,
      path: pathString,
      method: "HEAD"
    }
    options.headers = {};
    for (let i in headers) {
      options.headers[i] = headers[i];
    }
    return new Promise(function (resolve, reject) {
      let req = http.request(options, function (res) {
        res.setEncoding('utf8');
        let resultObj = {}
        resultObj.headers = res.headers;
        resultObj.statusCode = res.statusCode;
        resultObj.body = '';
        res.on('data', function (chunk) {
          resultObj.body += chunk.toString();
        });
        res.on('end', function () {
          resolve(resultObj);
        });
      });
      req.on('error', function (e) { reject(e); });
      req.end();
    });
  }

  Mother.prototype.binaryRequest = function (to, port = null, headers = null) {
    let http;
    let target, tempArr;
    let targetHost, targetPath;
    let option;

    if (/^https:\/\//.test(to)) {
      http = require("https");
      port = (port === null) ? 443 : port;
      target = to.slice(8);
    } else if (/^http:\/\//.test(to)) {
      http = require("http");
      port = (port === null) ? 80 : port;
      target = to.slice(7);
    } else {
      http = require("http");
      port = (port === null) ? 80 : port;
      target = to;
    }

    //host and path parsing
    tempArr = target.split('/');
    targetHost = tempArr.shift();
    targetPath = '/' + tempArr.join('/');

    option = {
      hostname: targetHost,
      port: port,
      path: targetPath,
      method: "GET"
    };

    if (headers !== null) {
      if (typeof headers !== "object") {
        throw new Error("headers must be object");
      }
      if (typeof headers.headers === "object" && headers.headers !== null) {
        option.headers = headers.headers;
      } else {
        option.headers = headers;
      }
    }

    return new Promise((resolve, reject) => {
      let req = http.request(option, (res) => {
          res.setEncoding('binary');
          let chunks = [];
          res.on('data', (chunk) => {
              chunks.push(Buffer.from(chunk, 'binary'));
          });
          res.on('end', () => {
              let binary = Buffer.concat(chunks);
              resolve(binary);
          });
          res.on('error', function (e) {
              reject(e);
          });
      });
      req.on('error', function (e) { reject(e); });
      req.end();
    });
  }

  Mother.prototype.orderSystem = function (type, number) {
    if (number === undefined) {
      number = type;
      type = "encode";
    }
    const ABC = [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z" ];
    let a1, a2, a0;
    let n1, n2;
    let target, index0, index1, result;
    let lastInitialArr, num;
    let a, s, z;

    lastInitialArr = [];
    a = 'a'.charCodeAt(0);
    s = 's'.charCodeAt(0);
    z = 'z'.charCodeAt(0);
    for (let i = a; i < z + 1; i++) {
      num = i + (s - a);
      if (num > z) {
        lastInitialArr.push(String.fromCharCode(num - z - 1 + a));
      } else {
        lastInitialArr.push(String.fromCharCode(num));
      }
    }

    if (type === "encode") {

      if (typeof number !== "number") {
        throw new Error("encode input must be number");
      }
      if (number >= ((ABC.length - 1) * 100 * (ABC.length)) + ((ABC.length - 1) * 100) + (9 * 10) + (9 * 1) + ((ABC.length - 1) * 100 * (ABC.length) * (ABC.length)) + 1) {
        throw new Error("too heavy number");
      }

      n2 = (number % 10);
      n1 = (((number - n2) % (10 * 10)) / 10);
      a2 = ABC[((number - n2 - (n1 * 10)) % (ABC.length * 10 * 10)) / (10 * 10)];
      a1 = ABC[((number - n2 - (n1 * 10) - (ABC.indexOf(a2) * 10 * 10)) % (ABC.length * ABC.length * 10 * 10)) / (ABC.length * 10 * 10)];
      a0 = lastInitialArr[((number - n2 - (n1 * 10) - (ABC.indexOf(a2) * 10 * 10) - (ABC.indexOf(a1) * ABC.length * 10 * 10)) % (ABC.length * ABC.length * ABC.length * 10 * 10)) / (ABC.length * ABC.length * 10 * 10)];

      return (a1 + a2 + String(n1) + String(n2) + a0);

    } else if (type === "decode") {

      if (typeof number !== "string") {
        throw new Error("decode input must be string");
      }

      if (number.length === 11) {
        target = number.split("_")[1].trim();
      } else if (number.length === 5) {
        target = number.trim();
      } else {
        throw new Error("invaild id");
      }

      index0 = 0;
      index1 = 0;
      for (let i = 0; i < ABC.length; i++) {
        if (ABC[i] === target[0]) {
          index0 = i;
        }
        if (ABC[i] === target[1]) {
          index1 = i;
        }
      }
      result = (index0 * 100 * 26) + (index1 * 100) + (Number(target[2]) * 10) + (Number(target[3]) * 1) + (lastInitialArr.indexOf(target[4]) * 100 * 26 * 26);

      return result;

    } else {
      throw new Error("orderSystem type must be 'encode' or 'decode'");
    }
  }

  Mother.prototype.generalFileUpload = async function (url, fromArr, toArr) {
    if (typeof url !== "string" || !Array.isArray(fromArr) || !Array.isArray(toArr)) {
      throw new Error("input must be url, from array, to array");
    }
    const fs = require(`fs`);
    const FormData = require('form-data');
    const axios = require(`axios`);
    const form = new FormData();
    try {
      let num, formHeaders, toList;

      for (let i = 0; i < toArr.length; i++) {
        if (/^\//.test(toArr[i])) {
          toArr[i] = toArr[i].slice(1);
        }
      }
      toList = toArr;
      form.append("toArr", JSON.stringify(toList));

      num = 0;
      for (let fileName of fromArr) {
        form.append("file" + String(num), fs.createReadStream(fileName));
        num++;
      }
      formHeaders = form.getHeaders();
      await axios.post(url, form, {
        headers: { ...formHeaders },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      });
    } catch (e) {
      console.log(e);
    }
  }

  Mother.prototype.sleep = function (time) {
    let timeoutId = null;
    return new Promise(function (resolve, reject) {
      timeoutId = setTimeout(function () {
        resolve('awake');
        clearTimeout(timeoutId);
      }, time);
    });
  }

  Mother.prototype.getDateMatrix = function (year, month) {
    const motherInstance = this;
    let tempObj, tempArr, tempArr2, tempArr3;

    if (year === "today" || (year === undefined && month === undefined)) {
      tempObj = new Date();
      year = tempObj.getFullYear();
      month = tempObj.getMonth();
    } else if (typeof year === "string" && month === undefined && /\-/g.test(year)) {
      if (year.length === 10) {
        tempArr = year.split("-");
        tempObj = new Date(Number(tempArr[0]), Number(tempArr[1].replace(/^0/, '')) - 1, Number(tempArr[2].replace(/^0/, '')));
      } else {
        tempArr = year.split(" ");
        tempArr2 = tempArr[0].split("-");
        tempArr3 = tempArr[1].split(":");
        tempObj = new Date(Number(tempArr2[0]), Number(tempArr2[1].replace(/^0/, '')) - 1, Number(tempArr2[2].replace(/^0/, '')), Number(tempArr3[0].replace(/^0/, '')), Number(tempArr3[1].replace(/^0/, '')), Number(tempArr3[2].replace(/^0/, '')));
      }
      year = tempObj.getFullYear();
      month = tempObj.getMonth();
    } else if (typeof year === "object") {
      month = year.getMonth();
      year = year.getFullYear();
    }

    const getLastDate = function (year, month) {
      const today = new Date(year, month, 1);
      let newMonth, lastDate;
      for (let i = 27; i < 33; i++) {
        today.setDate(i);
        newMonth = today.getMonth();
        if (month !== newMonth) {
          lastDate = i - 1;
          break;
        }
      }
      return lastDate;
    }

    const firstDate = 1;
    const firstDay = (new Date(year, month, 1)).getDay();
    const lastDate = getLastDate(year, month);

    const DateMatrix = function (year, month) {
      this.year = year;
      this.month = month;
      this.matrix = null;
    }

    DateMatrix.prototype.getYearString = function () {
      return String(this.year) + "년";
    }

    DateMatrix.prototype.getMonthString = function () {
      return String(this.month + 1) + "월";
    }

    DateMatrix.prototype.getMatrix = function () {
      return this.matrix;
    }

    DateMatrix.prototype.getNormalMatrix = function () {
      let justTong, justArr;
      justTong = [];
      justArr = [];
      for (let arr of this.matrix) {
        justArr = [];
        for (let obj of arr) {
          if (obj === null) {
            justArr.push(null);
          } else {
            justArr.push(obj.date);
          }
        }
        justTong.push(justArr);
      }
      return justTong;
    }

    DateMatrix.prototype.getDateArr = function () {
      let justTong;
      justTong = [];
      for (let arr of this.matrix) {
        for (let obj of arr) {
          if (obj !== null) {
            justTong.push(obj);
          }
        }
      }
      return justTong;
    }

    DateMatrix.prototype.nextMatrix = function () {
      if (this.month === 11) {
        return motherInstance.getDateMatrix(this.year + 1, 0);
      } else {
        return motherInstance.getDateMatrix(this.year, this.month + 1);
      }
    }

    DateMatrix.prototype.previousMatrix = function () {
      if (this.month === 0) {
        return motherInstance.getDateMatrix(this.year - 1, 11);
      } else {
        return motherInstance.getDateMatrix(this.year, this.month - 1);
      }
    }

    DateMatrix.prototype.yearMatrix = function () {
      let arr = [];
      for (let i = 0; i < 12; i++) {
        arr.push(motherInstance.getDateMatrix(this.year, i));
      }
      return arr;
    }

    DateMatrix.prototype.nextYearMatrix = function () {
      let arr = [];
      for (let i = 0; i < 12; i++) {
        arr.push(motherInstance.getDateMatrix(this.year + 1, i));
      }
      return arr;
    }

    DateMatrix.prototype.previousYearMatrix = function () {
      let arr = [];
      for (let i = 0; i < 12; i++) {
        arr.push(motherInstance.getDateMatrix(this.year - 1, i));
      }
      return arr;
    }

    DateMatrix.prototype.rangeMatrix = function (range = 3) {
      let arr = [];
      let tempMatrix;

      tempMatrix = this.previousMatrix();
      arr.unshift(tempMatrix);
      for (let i = 1; i < range; i++) {
        tempMatrix = tempMatrix.previousMatrix();
        arr.unshift(tempMatrix);
      }

      arr.push(this);

      tempMatrix = this.nextMatrix();
      arr.push(tempMatrix);
      for (let i = 1; i < range; i++) {
        tempMatrix = tempMatrix.nextMatrix();
        arr.push(tempMatrix);
      }

      return arr;
    }

    DateMatrix.prototype.returnSundayMatrix = function () {
      let arr, boo;
      let tempArr;
      let tong;
      let length;

      arr = [];
      for (let matrix of this.matrix) {
        for (let i of matrix) {
          arr.push(i);
        }
      }
      arr.unshift(null);

      boo = true;
      for (let i = 0; i < 7; i++) {
        if (arr[i] !== null) {
          boo = false;
        }
      }

      if (boo) {
        for (let i = 0; i < 7; i++) {
          arr.shift();
        }
      }

      tong = [];
      for (let i = 0; i < arr.length; i++) {
        if (i % 7 === 0) {
          tempArr = [];
        }
        tempArr.push(arr[i]);
        if (i % 7 === 6 || i === arr.length - 1) {
          tong.push(tempArr);
        }
      }

      if (tong[tong.length - 1].length === 0) {
        tong.pop();
      }

      length = tong[tong.length - 1].length;
      if (length !== 7) {
        for (let i = 0; i < 7 - length; i++) {
          tong[tong.length - 1].push(null);
        }
      }

      boo = true;
      for (let i = 0; i < 7; i++) {
        if (tong[tong.length - 1][i] !== null) {
          boo = false;
        }
      }

      if (boo) {
        tong.pop();
      }

      return tong;
    }

    DateMatrix.prototype.sundayConvert = function () {
      const newObj = new DateMatrix(this.year, this.month);
      newObj.matrix = this.returnSundayMatrix();
      return newObj;
    }

    const DateFactor = function (year, month, date, index) {
      this.year = year;
      this.month = month;
      this.date = date;
      this.day = ([ '월', '화', '수', '목', '금', '토', '일' ])[index];
      this.dateObject = new Date(year, month, date);
      this.dayday = this.dateObject.getDay()
    }

    DateFactor.prototype.getDateString = function () {
      const zeroAddition = function (num) {
        if (typeof num === 'string') {
          if (Number.isNaN(Number(num))) {
            throw new Error("invaild type");
          } else {
            num = Number(num);
          }
        }
        if (num < 10) {
          return '0' + String(num);
        } else {
          return String(num);
        }
      }
      return (String(this.year) + '-' + zeroAddition(this.month + 1) + '-' + zeroAddition(this.date));
    }

    let tempDate, arr;
    let tong;
    let pastLength;
    let result;
    let num;

    result = new DateMatrix(year, month);
    tong = [];
    arr = [];

    if (firstDay !== 0) {
      for (let i = 0; i < firstDay - 1; i++) {
        arr.push(null);
      }
    } else {
      for (let i = 0; i < 6; i++) {
        arr.push(null);
      }
    }

    for (let i = firstDate; i < lastDate + 1; i++) {
      tempDate = new Date(year, month, i);
      arr.push(tempDate.getDay());
      if (arr.length % 7 === 0) {
        tong.push(arr);
        arr = [];
      }
    }

    if (arr.length !== 7 && arr.length !== 0) {
      pastLength = arr.length;
      for (let i = 0; i < 7 - pastLength; i++) {
        arr.push(null);
      }
      tong.push(arr);
    }

    num = 1;
    for (let arr of tong) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== null) {
          arr[i] = new DateFactor(year, month, num, i);
          num++;
        }
      }
    }

    result.matrix = tong;

    return result;
  }

  Mother.prototype.treeParsing = async function (target, liteMode = false, liteCallBack = null) {
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
        exec(`ls -al ${shellLink(target)}`, { cwd: process.cwd(), maxBuffer: 20 * 1024 * 1024 }, (error, stdout, stderr) => {
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

  Mother.prototype.leafParsing = async function (target, searchMode = false, keyword = '') {
    if (typeof target !== "string") {
      throw new Error("invaild input");
    }
    target = target.replace(/\/$/i, '');
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
        exec(`ls -al ${shellLink(target)}`, { cwd: process.cwd(), maxBuffer: 20 * 1024 * 1024 }, (error, stdout, stderr) => {
          if (error) {
            reject(error);
          } else {
            resolve(stdout);
          }
          return;
        });
      });
    }
    const execPromise = function (command) {
      return new Promise((resolve, reject) => {
        exec(command, { cwd: process.cwd(), maxBuffer: 20 * 1024 * 1024 }, (error, stdout, stderr) => {
          if (error) {
            reject(error);
          } else {
            resolve(stdout);
          }
        })
      });
    }
    const kindFilter = function (fileName) {
      let str;
      if (/\.(js|py|c|scpt|html|css|xml|java|json|cfg|bash|csh|md)$/gi.test(fileName)) {
        str = "code";
      } else if (/\.(ai|eps|svg)$/gi.test(fileName)) {
        str = "ai";
      } else if (/\.(png|psd|iff|pcx|raw|tga|psb)$/gi.test(fileName)) {
        str = "png";
      } else if (/\.(jpg|jpeg|gif|jpf|jps|bmp|heic|jfif)$/gi.test(fileName)) {
        str = "jpg";
      } else if (/\.(pdf)$/gi.test(fileName)) {
        str = "pdf";
      } else if (/\.(pptx|pptm|ppt)$/gi.test(fileName)) {
        str = "powerpoint";
      } else if (/\.(xlsx|xlsm|xlsb|xltx|xltxm|xls|xlt|xlam)$/gi.test(fileName)) {
        str = "excel";
      } else if (/\.(docx|docm|doc|dotx|dotm|dot|hwp)$/gi.test(fileName)) {
        str = "word";
      } else if (/\.(txt|wps|odt|rtf)$/gi.test(fileName)) {
        str = "txt";
      } else if (/\.(exe|pkg|dmg|iso)$/gi.test(fileName)) {
        str = "exe";
      } else if (/\.(mp3|wav|m4a|m4b|m4v|m4r|3gp|aac|wv|aiff|aif|aifc|ogg)$/gi.test(fileName)) {
        str = "mp3";
      } else if (/\.(mp4|avi|mov|wmv|mkv|mpg|flv|asf|asx|ogm|ogv|webm|vob|qt|amv|m4p|mpv|mpg|nsv)$/gi.test(fileName)) {
        str = "mp4";
      } else if (/\.(zip|egg|7z|tar|rar|apk|alz|tgz|zoo|cab|img|pak|war)$/gi.test(fileName)) {
        str = "zip";
      } else {
        str = "general";
      }
      return str;
    }
    const findTarget = function (where, searchTarget) {
      let files, folders, tong, tempObj, targetName;
      return new Promise((resolve, reject) => {
        execPromise(`find ${shellLink(where)} -name "*${searchTarget.trim()}*"`).then((stdout) => {
          files = stdout.split("\n").map((i) => {
            return i.trim();
          }).filter((i) => {
            return i !== '' && i !== ".DS_Store" && !/^\.\_/.test(i);
          });
          return execPromise(`find ${shellLink(where)} -name "*${searchTarget.trim()}*" -type d`);
        }).then((stdout) => {
          folders = stdout.split("\n").map((i) => {
            return i.trim();
          }).filter((i) => {
            return i !== '' && i !== ".DS_Store" && !/^\.\_/.test(i);
          });
          tong = [];
          for (let f of files) {
            tempObj = {};
            targetName = (f.split("/"))[f.split("/").length - 1];
            if (folders.includes(f)) {
              tempObj.directory = true;
              tempObj.fileName = targetName;
              tempObj.hidden = /^\./.test(targetName);
              tempObj.absolute = f;
              tempObj.kind = "folder";
            } else {
              tempObj.directory = false;
              tempObj.fileName = targetName;
              tempObj.hidden = /^\./.test(targetName);
              tempObj.absolute = f;
              tempObj.kind = kindFilter(f);
            }
            tong.push(tempObj);
          }
          resolve(tong);
        }).catch((err) => {
          reject(err);
        });
      });
    }
    const makeFileArr = async function (target) {
      try {
        const targetFolderName = (target.split("/"))[target.split("/").length - 1];
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
          tempArr4.push(i);
        }

        tempArr4 = tempArr4.map((obj) => {
          delete obj.length;
          const { directory, fileName } = obj;
          if (directory) {
            obj.kind = "folder";
          } else {
            obj.kind = kindFilter(fileName);
          }
          return obj;
        });
        return tempArr4;
      } catch (e) {
        console.log(e);
      }
    }
    if (!searchMode) {
      return makeFileArr(target);
    } else {
      return findTarget(target, keyword);
    }
  }

  Mother.prototype.returnRandoms = function (num = 10, length = false) {
    const crypto = require('crypto');
    const password = "eorgghseGehfwi3r2";
    if (typeof num === "boolean") {
      length = num;
      num = 10;
    }
    if (typeof num !== "number") {
      num = 10;
    }
    if (typeof length !== "boolean") {
      length = false;
    }
    if (num === 0) {
      num = 10;
    }
    return new Promise(function (resolve, reject) {
      crypto.scrypt(password, "salt", 24, (err, key) => {
        if (err) throw err;
        crypto.randomFill(new Uint32Array(num), (err, iv) => {
          if (err) {
            reject(err);
          } else {
            if (!length) {
              resolve(iv);
            } else {
              let resultArr, minLength;
              resultArr = Array.from(iv).map((n) => { return String(n); });
              resultArr.sort((a, b) => { return a.length - b.length; });
              minLength = resultArr[0].length;
              resultArr = resultArr.map((n) => { return Number(n.slice(0, minLength).replace(/^0/, '1')); });
              resolve(resultArr);
            }
          }
        });
      });
    });
  }

  Mother.prototype.cryptoString = function (password, string, option = { algorithm: "aes-192-cbc", makeKey: true, iv: null, digest: "hex" }) {
    if (typeof password !== "string" || typeof string !== "string" || typeof option !== "object") {
      throw new Error("invaild input");
    }
    if (option.algorithm === undefined || option.makeKey === undefined || option.iv === undefined || option.digest === undefined) {
      throw new Error("invaild option");
    }

    const crypto = require("crypto");
    const algorithms = crypto.getCiphers();
    let algorithm, iv, digest;

    if (!algorithms.includes(option.algorithm)) {
      throw new Error("invaild algorithm");
    }
    if (option.digest !== "hex" && option.digest !== "base64" && option.digest !== "latin1") {
      throw new Error("invaild digest");
    }
    if (typeof option.makeKey !== "boolean") {
      throw new Error("invaild make key property");
    }
    if (typeof option.iv !== "string") {
      option.iv = Buffer.alloc(16, 0);
    }

    algorithm = option.algorithm;
    iv = option.iv;
    digest = option.digest;

    if (option.makeKey) {
      return new Promise(function (resolve, reject) {
        crypto.scrypt(password, "salt", 24, function (err, key) {
          if (err) {
            reject(err);
          } else {
            const cipher = crypto.createCipheriv(algorithm, key, iv);
            let encrypted = '';
            cipher.setEncoding(digest);
            cipher.on("data", (chunk) => { encrypted += chunk; });
            cipher.on("end", () => { resolve(encrypted); });
            cipher.write(string);
            cipher.end();
          }
        });
      });
    } else {
      return new Promise(function (resolve, reject) {
        const cipher = crypto.createCipheriv(algorithm, password, iv);
        let encrypted = '';
        cipher.setEncoding(digest);
        cipher.on("data", (chunk) => { encrypted += chunk; });
        cipher.on("end", () => { resolve(encrypted); });
        cipher.write(string);
        cipher.end();
      });
    }
  }

  Mother.prototype.decryptoHash = function (password, hash, option = { algorithm: "aes-192-cbc", makeKey: true, iv: null, digest: "hex" }) {
    if (typeof password !== "string" || typeof hash !== "string" || typeof option !== "object") {
      throw new Error("invaild input");
    }
    if (option.algorithm === undefined || option.makeKey === undefined || option.iv === undefined || option.digest === undefined) {
      throw new Error("invaild option");
    }

    const crypto = require("crypto");
    const algorithms = crypto.getCiphers();
    let algorithm, iv, digest;

    if (!algorithms.includes(option.algorithm)) {
      throw new Error("invaild algorithm");
    }
    if (option.digest !== "hex" && option.digest !== "base64" && option.digest !== "latin1") {
      throw new Error("invaild digest");
    }
    if (typeof option.makeKey !== "boolean") {
      throw new Error("invaild make key property");
    }
    if (typeof option.iv !== "string") {
      option.iv = Buffer.alloc(16, 0);
    }

    algorithm = option.algorithm;
    iv = option.iv;
    digest = option.digest;

    if (option.makeKey) {
      return new Promise(function (resolve, reject) {
        crypto.scrypt(password, "salt", 24, function (err, key) {
          if (err) {
            reject(err);
          } else {
            const decipher = crypto.createDecipheriv(algorithm, key, iv);
            let decrypted = '';
            decipher.on("readable", () => {
              let chunk;
              chunk = decipher.read();
              while (chunk !== null) {
                decrypted += chunk.toString("utf8");
                chunk = decipher.read();
              }
            });
            decipher.on("end", () => { resolve(decrypted); });
            decipher.write(hash, digest);
            decipher.end();
          }
        });
      });
    } else {
      return new Promise(function (resolve, reject) {
        const decipher = crypto.createDecipheriv(algorithm, password, iv);
        let decrypted = '';
        decipher.on("readable", () => {
          let chunk;
          chunk = decipher.read();
          while (chunk !== null) {
            decrypted += chunk.toString("utf8");
            chunk = decipher.read();
          }
        });
        decipher.on("end", () => { resolve(decrypted); });
        decipher.write(hash, digest);
        decipher.end();
      });
    }
  }

  Mother.prototype.copyToClipboard = function (data) {
    const os = require("os");
    const { spawn } = require('child_process');
    let pbcopy;
    if (os.type() === 'Darwin') {
      pbcopy = spawn('pbcopy');
    } else {
      pbcopy = spawn('xclip', [ '-selection', 'clipboard' ]);
    }
    pbcopy.stdin.write(data);
    pbcopy.stdin.end();
  }

  Mother.prototype.pasteToClipboard = function (data) {
    const os = require("os");
    const { execSync } = require('child_process');
    let stdout;
    if (os.type() === 'Darwin') {
      stdout = execSync('pbpaste');
    } else {
      stdout = execSync('xclip -selection clipboard -o');
    }
    return stdout;
  }

  Mother.prototype.equalJson = function (jsonString) {
    const equal = function (jsonString) {
      if (typeof jsonString === "object") {
        jsonString = JSON.stringify(jsonString);
      }
      if (typeof jsonString !== "string") {
        jsonString = String(jsonString);
      }
      const filtered = jsonString.replace(/(\"[0-9]+\-[0-9]+\-[0-9]+T[0-9]+\:[0-9]+\:[^Z]+Z\")/g, function (match, p1, offset, string) { return "new Date(" + p1 + ")"; });
      const tempFunc = new Function("const obj = " + filtered + "; return obj;");
      const json = tempFunc();
      let temp, boo;
      if (typeof json === "object") {
        for (let i in json) {
          if (typeof json[i] === "string") {
            if (/^[\{\[]/.test(json[i].trim()) && /[\}\]]$/.test(json[i].trim())) {
              try {
                temp = JSON.parse(json[i]);
                boo = true;
              } catch (e) {
                boo = false;
              }
              if (boo) {
                json[i] = equal(json[i]);
              }
            }
          }
        }
        return json;
      } else {
        return jsonString;
      }
    }
    return equal(jsonString);
  }

  Mother.prototype.copyJson = function (obj) {
    if (typeof obj !== "object") {
      throw new Error("must be object input");
    }
    const jsonString = JSON.stringify(obj);
    const filtered = jsonString.replace(/(\"[0-9]+\-[0-9]+\-[0-9]+T[0-9]+\:[0-9]+\:[^Z]+Z\")/g, function (match, p1, offset, string) { return "new Date(" + p1 + ")"; });
    const tempFunc = new Function("const obj = " + filtered + "; return obj;");
    const json = tempFunc();
    return json;
  }

  Mother.prototype.autoComma = function (str) {
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

  Mother.prototype.dateToString = function (date, detail = false, dayOption = false) {
    const dayday = [ '일', '월', '화', '수', '목', '금', '토' ];
    if (!(date instanceof Date)) {
      console.log(date);
      throw new Error("invaild input");
    }
    if (detail === undefined || detail === null) {
      detail = false;
    }
    if (typeof detail !== "boolean") {
      throw new Error("second input must be boolean");
    }
    const zeroAddition = (num) => { return (num < 10) ? `0${String(num)}` : String(num); }
    const emptyDateValue = (new Date(1999, 0, 1)).valueOf();
    const futureDateValue = (new Date(3000, 0, 1)).valueOf();
    if (date.valueOf() <= emptyDateValue) {
      return "해당 없음";
    } else if (date.valueOf() >= futureDateValue) {
      return "예정";
    } else {
      if (!detail) {
        return `${String(date.getFullYear())}-${zeroAddition(date.getMonth() + 1)}-${zeroAddition(date.getDate())}`;
      } else {
        if (dayOption) {
          return `${String(date.getFullYear())}-${zeroAddition(date.getMonth() + 1)}-${zeroAddition(date.getDate())} ${zeroAddition(date.getHours())}:${zeroAddition(date.getMinutes())}:${zeroAddition(date.getSeconds())} ${dayday[date.getDay()]}요일`;
        } else {
          return `${String(date.getFullYear())}-${zeroAddition(date.getMonth() + 1)}-${zeroAddition(date.getDate())} ${zeroAddition(date.getHours())}:${zeroAddition(date.getMinutes())}:${zeroAddition(date.getSeconds())}`;
        }
      }
    }
  }

  Mother.prototype.stringToDate = function (str) {
    if (str instanceof Date) {
      return str;
    }
    if (typeof str !== "string") {
      throw new Error("invaild input");
    }
    if (str.trim() === '' || str.trim() === '-' || /없음/gi.test(str)) {
      return (new Date(1800, 0, 1));
    }
    if (str === "예정" || str === "진행중" || str === "미정") {
      return (new Date(3800, 0, 1));
    }
    str = str.trim();
    if (/T/g.test(str) && /Z$/.test(str) && /^[0-9]/.test(str) && /\-/g.test(str) && /\:/g.test(str)) {
      if (!Number.isNaN((new Date(str)).getTime())) {
        return new Date(str);
      }
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

  Mother.prototype.colorParsing = function (str) {
    if (typeof str === "string") {
      if (/^\#/.test(str) && str.length === 7) {
        str = str.slice(1);
      }
      if (str.length !== 6 && str.replace(/[^0-9a-f]/gi, '') === '') {
        throw new Error("invaild input");
      }
      let colorArr;
      colorArr = [ str.slice(0, 2), str.slice(2, 4), str.slice(4) ];
      colorArr = colorArr.map((s) => {
        let num;
        num = 0;
        if (/[a-z]/gi.test(s[1])) {
          num += s[1].charCodeAt(0) - 97 + 10;
        } else {
          num += Number(s[1]);
        }
        if (/[a-z]/gi.test(s[0])) {
          num += (s[0].charCodeAt(0) - 97 + 10) * 16;
        } else {
          num += (Number(s[0])) * 16;
        }
        return num;
      });
      return colorArr;
    } else if (Array.isArray(str)) {
      if (str.length !== 3) {
        throw new Error("invaild input");
      }
      if (typeof str[0] !== "number" || typeof str[1] !== "number" || typeof str[2] !== "number") {
        throw new Error("invaild input");
      }
      if (Number.isNaN(str[0]) || Number.isNaN(str[1]) || Number.isNaN(str[2])) {
        throw new Error("invaild input");
      }
      const convertNum = (num) => {
        const convertStr = (n) => {
          if (n < 10) {
            return String(n);
          } else {
            return String.fromCharCode(n + 87);
          }
        }
        let first, second;
        second = num % 16;
        first = (num - second) / 16;
        return convertStr(first) + convertStr(second);
      }
      str = str.map(convertNum);
      return '#' + str.join('');
    } else {
      throw new Error("invaild input");
    }
  }

  Mother.prototype.uniqueValue = function (type = "number") {
    if (type === "number") {
      return Number(String((new Date()).valueOf()) + String(Math.round(Math.random() * 10000)));
    } else if (type === "string") {
      return String((new Date()).valueOf()) + String(Math.round(Math.random() * 10000));
    } else if (type === "hex") {
      const x = 16;
      const length = 11;
      const uniqueNumber = (new Date()).valueOf();
      const hexChars = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F' ];
      const randomKeyWords = [ 'A', 'B', 'C', 'D', 'E', 'F' ];
      let uniqueNumber_copied;
      let maxExponent;
      let cArr;
      let temp;
      let hexString;
      uniqueNumber_copied = uniqueNumber;
      maxExponent = 0;
      while (Math.pow(x, maxExponent) <= uniqueNumber) {
        maxExponent++;
      }
      cArr = [];
      for (let i = 0; i < maxExponent; i++) {
        temp = ((uniqueNumber_copied / Math.pow(x, i)) % x);
        cArr.push(temp);
        uniqueNumber_copied = uniqueNumber_copied - (temp * Math.pow(x, i));
      }
      hexString = cArr.map((index) => { return hexChars[index] }).join('');
      for (let i = 0; i < length; i++) {
        hexString += hexChars[Math.floor(hexChars.length * Math.random())];
      }
      return randomKeyWords[Math.floor(randomKeyWords.length * Math.random())] + randomKeyWords[Math.floor(randomKeyWords.length * Math.random())] + hexChars[Math.floor(hexChars.length * Math.random())] + randomKeyWords[Math.floor(randomKeyWords.length * Math.random())] + String(uniqueNumber) + 'A' + hexString;
    } else {
      return String((new Date()).valueOf()) + String(Math.round(Math.random() * 10000));
    }
  }

  Mother.prototype.setQueue = function (callback, delay = 0) {
    if (typeof callback !== "function") {
      throw new Error("invaild input");
    }
    if (typeof delay !== "number") {
      delay = 0;
    }
    let propertyName, timeoutId;
    propertyName = "tempQueue_" + String((new Date()).valueOf()) + String(Math.round(Math.random() * 10000));
    timeoutId = setTimeout(() => {
      callback();
      clearTimeout(timeoutId);
    }, delay);
  }

  Mother.prototype.xyConverting = function (original) {
    if (!Array.isArray(original)) {
      throw new Error("input must be array");
    }
    if (original.length > 0) {
      if (!original.every((arr) => { return Array.isArray(arr); })) {
        throw new Error("input must be matrix");
      }
    }
    let converted, tempArr;

    converted = [];
    if (original.length > 0) {
      for (let i = 0; i < original[0].length; i++) {
        tempArr = [];
        for (let arr of original) {
          tempArr.push(arr[i]);
        }
        converted.push(tempArr);
      }
    }

    return converted;
  }
}
// <<<<<<<<< MOTHER COPIED END

const Clown = function () {
  this.mother = new Mother();
  this.address = ADDRESS;
}

Clown.prototype.launching = async function () {
  const instance = this;
  const address = this.address;
  const { requestSystem } = this.mother;
  const os = require("os");
  try {
    const { app, BrowserWindow, Notification, ipcMain } = require("electron");
    const createWindow = () => {
      const mainWindow = new BrowserWindow({
        width: 2000,
        height: 2000,
        title: "HomeLiaison Console",
        frame: false,
        roundedCorners: true,
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
        }
      });

      mainWindow.maximize();
      mainWindow.loadURL("https://" + address.homeinfo.ghost.host);

      return mainWindow;
    }

    app.whenReady().then(createWindow).then((mainWindow) => {
      mainWindow.webContents.openDevTools();
    }).catch((err) => {
      console.log(err);
    });

    app.on("window-all-closed", () => {
      if (process.platform !== "darwin") {
        app.quit();
      }
    });

    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    });

    ipcMain.on("asynchronous-message", (event, arg) => {
      const alarm = new Notification({ title: "HomeLiaison", body: arg });
      alarm.show();
      event.reply("asynchronous-reply", "done");
    });

    ipcMain.on("synchronous-message", (event, arg) => {
      if (arg === "device") {
        let network;

        network = Object.values(os.networkInterfaces()).flat().filter((obj) => {
          return obj.family === "IPv4";
        }).filter((obj) => {
          return obj.mac !== "00:00:00:00:00:00";
        });

        event.returnValue = JSON.stringify({
          type: os.type(),
          platform: os.platform(),
          release: os.release(),
          arch: os.arch(),
          hostname: os.hostname(),
          cpus: os.cpus(),
          uptime: os.uptime(),
          memory: {
            total: os.totalmem(),
            free: os.freemem()
          },
          networkInterfaces: network,
        });

      } else {
        event.returnValue = "";
      }
    });


  } catch (e) {
    console.log(e);
  }
}

const app = new Clown();
app.launching().catch((err) => { console.log(err); })
