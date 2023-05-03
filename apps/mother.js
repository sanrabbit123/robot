const Mother = function () {
  const infoObj = require(process.cwd() + "/apps/infoObj.js");

  //mongo
  this.mongoinfoObj = infoObj.mongoinfo;

  this.mongoinfo = "mongodb://" + infoObj.mongoinfo.user + ':' + infoObj.mongoinfo.password + '@' + infoObj.mongoinfo.host + ':' + String(infoObj.mongoinfo.port) + "/admin";
  this.mongopythoninfo = "mongodb://" + infoObj.pythoninfo.user + ':' + infoObj.pythoninfo.password + '@' + infoObj.pythoninfo.host + ':' + String(infoObj.pythoninfo.port) + "/admin";
  this.mongoconsoleinfo = "mongodb://" + infoObj.backinfo.user + ':' + infoObj.backinfo.password + '@' + infoObj.backinfo.host + ':' + String(infoObj.backinfo.port) + "/admin";
  this.mongolocalinfo = "mongodb://" + infoObj.mongoinfo.user + ':' + infoObj.mongoinfo.password + '@' + "127.0.0.1" + ':' + String(infoObj.mongoinfo.port) + "/admin";
  this.mongotestinfo = "mongodb://" + infoObj.testinfo.user + ':' + infoObj.testinfo.password + '@' + infoObj.testinfo.host + ':' + String(infoObj.testinfo.port) + "/admin";
  this.mongosecondinfo = "mongodb://" + infoObj.secondinfo.user + ':' + infoObj.secondinfo.password + '@' + infoObj.secondinfo.host + ':' + String(infoObj.secondinfo.port) + "/admin";
  this.mongocroninfo = "mongodb://" + infoObj.croninfo.user + ':' + infoObj.croninfo.password + '@' + infoObj.croninfo.host + ':' + String(infoObj.croninfo.port) + "/admin";

  this.mongo = require("mongodb").MongoClient;

  //shell
  this.shell = require("shelljs");

  //temp
  this.tempDir = `${process.cwd()}/temp`;
}

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

Mother.prototype.tempDelete = function (dir = null) {
  const fs = require('fs');
  const { exec } = require('child_process');
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

  let targetDir;
  if (dir === null) {
    targetDir = `${process.cwd()}/temp`;
  } else {
    targetDir = dir;
  }
  return new Promise(function (resolve, reject) {
    fs.readdir(targetDir, function (err, filelist) {
      if (err) {
        reject(err);
      } else {
        for (let i = 0; i < filelist.length; i++) {
          if (filelist[i] !== `.DS_Store`) {
            exec(`rm -rf ${shellLink(targetDir)}/${filelist[i]};`, { cwd: process.cwd(), maxBuffer: 20 * 1024 * 1024 }, (error, stdout, stderr) => {
              if (error) {
                reject(error);
              }
            });
          }
        }
        resolve("success");
      }
    });
  });
}

Mother.prototype.todayMaker = function (startPoint = "month") {
  const today = new Date();
  let dayString = '';
  if (startPoint === "month") {
    if (today.getMonth() + 1 < 10) {
      dayString += '0' + String(today.getMonth() + 1);
    } else {
      dayString += String(today.getMonth() + 1);
    }
    if (today.getDate() < 10) {
      dayString += '0' + String(today.getDate());
    } else {
      dayString += String(today.getDate());
    }
    if (today.getHours() < 10) {
      dayString += '0' + String(today.getHours());
    } else {
      dayString += String(today.getHours());
    }
  } else if (startPoint === "year") {
    dayString += String(today.getFullYear()).slice(2, 4);
    if (today.getMonth() + 1 < 10) {
      dayString += '0' + String(today.getMonth() + 1);
    } else {
      dayString += String(today.getMonth() + 1);
    }
    if (today.getDate() < 10) {
      dayString += '0' + String(today.getDate());
    } else {
      dayString += String(today.getDate());
    }
  } else if (startPoint === "total") {
    dayString += String(today.getFullYear()).slice(2, 4);
    if (today.getMonth() + 1 < 10) {
      dayString += '0' + String(today.getMonth() + 1);
    } else {
      dayString += String(today.getMonth() + 1);
    }
    if (today.getDate() < 10) {
      dayString += '0' + String(today.getDate());
    } else {
      dayString += String(today.getDate());
    }
    if (today.getHours() < 10) {
      dayString += '0' + String(today.getHours());
    } else {
      dayString += String(today.getHours());
    }
    if (today.getMinutes() < 10) {
      dayString += '0' + String(today.getMinutes());
    } else {
      dayString += String(today.getMinutes());
    }
  } else {
    throw new Error("invaild option");
  }
  return dayString;
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
    case "readBuffer":
      return new Promise(function (resolve, reject) {
        if (arr.length !== 1) { reject("second argument must be length 1 array"); }
        fs.readFile(arr[0], null, (err, data) => {
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
    case "readHead":
      return new Promise(function (resolve, reject) {
        if (arr.length === 0) { reject("second argument must be length 1~2 array"); }
        const { spawn } = require("child_process");
        const du = spawn("head", [ "-n", String(typeof arr[1] === "number" ? arr[1] : 10), arr[0] ]);
        let out;
        out = "";
        du.stdout.on("data", (data) => { out += String(data); });
        du.stderr.on("data", (data) => { reject(String(data)); });
        du.on("close", (code) => { resolve(String(out)); });
      });
      break;
    case "readStream":
      return new Promise(function(resolve, reject) {
        if (arr.length !== 1) { reject("second argument must be length 1 array"); }
        const stream = fs.createReadStream(arr[0])
        resolve(stream);
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
      break;
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
      break;
    case "exist":
      return new Promise(function(resolve, reject) {
        if (arr.length !== 1) { reject("second argument must be length 1 array"); }
        fs.access(arr[0], fs.constants.F_OK, function (err) {
          try {
            if (!err) {
              resolve(true);
            } else {
              resolve(false);
            }
          } catch (e) {
            resolve(false);
          }
        });
      });
      break;
    case "isDir":
      return new Promise(function(resolve, reject) {
        if (arr.length !== 1) { reject("second argument must be length 1 array"); }
        fs.stat(arr[0], (err, stats) => {
          if (err) {
            reject(err);
          } else {
            resolve(stats.isDirectory());
          }
        });
      });
      break;
    case "remove":
      return new Promise(function (resolve, reject) {
        if (arr.length !== 1) { reject("second argument must be length 1 array"); }
        const { spawn } = require("child_process");
        const remove = spawn("rm", [ "-rf", arr[0] ]);
        let out;
        out = "";
        remove.stdout.on("data", (data) => { out += String(data); });
        remove.stderr.on("data", (data) => { reject(String(data)); });
        remove.on("close", (code) => { resolve(arr[0]); });
      });
      break;
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
      break;
  }
}

Mother.prototype.requestSystem = function (url, data = {}, config = {}) {
  const axios = require("axios");
  const FormData = require("form-data");

  let method, dataKeys, configKeys;
  let dataBoo, configBoo, jsonBoo, nvpBoo;
  let options;
  let form;
  let finalConfig;
  let getData;
  let querystring;
  let formHeaders;

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
        form.getLength((err, length) => {
          if (err) {
            reject(err);
          } else {
            formHeaders = form.getHeaders();
            formHeaders["Content-Length"] = length;
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
        });
      }
    }
  });
}

Mother.prototype.ajaxJson = function (data, url) {
  if (typeof data !== "object" || typeof url !== "string") {
    throw new Error("invaild input");
  }
  const axios = require('axios');
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
  return new Promise((resolve, reject) => {
    axios.post(url, data, { headers: { "Content-Type": "application/json" } }).then((response) => {
      if (response.data === undefined) {
        reject("response error : there is no data");
      } else {
        try {
          const jsonString = JSON.stringify(response.data);
          JSON.parse(jsonString);
          resolve(equal(jsonString));
        } catch (e) {
          resolve(response.data);
        }
      }
    }).catch(function (error) {
      reject(error);
    });
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
        res.on('error', (e) => {
            reject(e);
        });
    });
    req.on('error', (e) => { reject(e); });
    req.end();
  });
}

Mother.prototype.curlRequest = function (to, data = {}, config = {}) {
  if (typeof to !== "string" || typeof data !== "object" || typeof config !== "object") {
    throw new Error("invaild input");
  }
  const { exec } = require("child_process");
  let command, method;

  command = "curl ";
  if (Object.keys(data).length === 0) {
    method = "GET";
  } else {
    method = "POST";
  }
  if (config.method === "get") {
    method = "GET";
    delete config.method;
  }

  if (method === "POST") {
    command += "-X " + method + " ";
    command += "-d '" + JSON.stringify(data) + "' ";
  }

  if (typeof config.headers === "object" && config.headers !== null) {
    for (let key in config.headers) {
      command += "-H \"" + key + ": " + config.headers[key].replace(/\"/gi, '') + "\" ";
    }
  } else {
    command += "-H \"Content-Type: application/json\" ";
  }

  command += to;

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
}

Mother.prototype.appleScript = function (name, contents, dir = null, clean = true, silent = false) {
  const fs = require('fs');
  const { exec, execSync } = require('child_process');
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
  let targetDir;
  if (dir === null) {
    targetDir = `${process.cwd()}/temp`;
  } else {
    targetDir = dir;
  }
  if (clean) {
    return new Promise(function (resolve, reject) {
      fs.readdir(targetDir, function (err, filelist) {
        if (err) {
          reject(err);
        } else {
          for (let i = 0; i < filelist.length; i++) {
            if (filelist[i] !== `.DS_Store`) {
              execSync(`rm -rf ${shellLink(targetDir)}/${filelist[i]};`);
            }
          }
          fs.writeFile(`${targetDir}/${name}.applescript`, contents, "utf8", (err) => {
            if (err) {
              reject(err);
            } else {
              exec(`osascript ${shellLink(targetDir)}/${name}.applescript`, { cwd: process.cwd(), maxBuffer: 20 * 1024 * 1024 }, (err, stdout, stderr) => {
                if (err) {
                  reject(err);
                } else {
                  execSync(`rm -rf ${shellLink(targetDir)}/${name}.applescript`);
                  resolve(stdout.replace(/\n$/, ''));
                }
              });
            }
          });
        }
      });
    });
  } else {
    return new Promise(function (resolve, reject) {
      fs.writeFile(`${targetDir}/${name}.applescript`, contents, "utf8", (err) => {
        if (err) {
          reject(err);
        } else {
          exec(`osascript ${shellLink(targetDir)}/${name}.applescript`, { cwd: process.cwd(), maxBuffer: 20 * 1024 * 1024 }, (err, stdout, stderr) => {
            if (err) {
              reject(err);
            } else {
              execSync(`rm -rf ${shellLink(targetDir)}/${name}.applescript`);
              resolve(stdout.replace(/\n$/, ''));
            }
          });
        }
      });
    });
  }
}

Mother.prototype.pythonExecute = function (target, args = [], inputObj = {}) {
  const fs = require(`fs`);
  const { exec } = require("child_process");
  let targetLink, targetArr;

  //shellLink and make target path
  targetLink = '';
  targetArr = target.split('/');
  for (let i of targetArr) {
    if (!/ /g.test(i) && !/\&/g.test(i) && !/\(/g.test(i) && !/\)/g.test(i) && !/\#/g.test(i) && !/\%/g.test(i) && !/\[/g.test(i) && !/\]/g.test(i) && !/\{/g.test(i) && !/\}/g.test(i) && !/\@/g.test(i) && !/\!/g.test(i) && !/\=/g.test(i) && !/\+/g.test(i) && !/\~/g.test(i) && !/\?/g.test(i) && !/\$/g.test(i)) {
      targetLink += i + '/';
    } else if (!/'/g.test(i)) {
      targetLink += "'" + i + "'" + '/';
    } else if (!/"/g.test(i)) {
      targetLink += '"' + i + '"' + '/';
    } else {
      targetLink += i + '/';
    }
  }
  targetLink = targetLink.slice(0, -1);

  const name = targetArr[targetArr.length - 3];
  const bridgeFile = process.cwd() + "/temp/" + name + ".json";

  return new Promise(function(resolve, reject) {
    fs.writeFile(bridgeFile, JSON.stringify(inputObj, null, 2), "utf8", function (err) {
      if (err) { reject(err); }
      let order;
      let result, jsonRaw, json;
      order = `python3 ${targetLink}`;
      if (args.length > 0) {
        order += ` ${args.join(' ')}`;
      }
      exec(order, { cwd: process.cwd(), maxBuffer: 20 * 1024 * 1024 }, (error, stdout, stderr) => {
        if (error) {
          reject(error);
        } else {
          jsonRaw = stdout.replace(/\n$/, '');
          try {
            json = JSON.parse(jsonRaw);
            result = json;
          } catch (e) {
            result = jsonRaw;
          }
          resolve(result);
        }
      });
    });
  });
}

Mother.prototype.returnUragenPath = function () {
  const segment = '/';
  let pathArr, uragenPath;
  pathArr = process.cwd().split(segment);
  pathArr.pop();
  pathArr.pop();
  uragenPath = pathArr.join(segment);
  return uragenPath;
}

Mother.prototype.ipCheck = function () {
  const standardInfo = "backinfo";
  const axios = require(`axios`);
  const ADDRESS = require(`${process.cwd()}/apps/infoObj.js`);
  const keys = Object.keys(ADDRESS);
  const values = Object.values(ADDRESS);
  return new Promise(function(resolve, reject) {
    axios.get("https://" + ADDRESS["pythoninfo"]["host"] + ":3000").then(function (response) {
      const ip = response.data.replace(/[^0-9\.]/g, '');
      let obj;
      let target;
      let targetNum;
      let number;
      let networkInterfaces;
      let macList;

      obj = { ip };
      target = "unknown";
      targetNum = 0;
      number = 0;

      if (/^223/.test(ip) && Number(ip.split('.')[1]) >= 32 && Number(ip.split('.')[1]) <= 63) {

        obj.name = "skt";
        obj.rawObj = ADDRESS[standardInfo];
        obj.rawObj.isGhost = false;

      } else {

        for (let { ip: { outer } } of values) {
          if (outer === ip) {
            target = keys[number].replace(/info$/, '');
            targetNum = number;
          }
          number++;
        }

        obj.name = target;
        obj.rawObj = values[targetNum];

        if (target === "test") {
          obj.isTest = true;
        } else {
          obj.isTest = false;
        }

        if (target === "office") {
          networkInterfaces = require("os").networkInterfaces();
          macList = [];
          for (let i in networkInterfaces) {
            for (let { mac, family } of networkInterfaces[i]) {
              if (/4/g.test(family) && Number(mac.replace(/[^0-9]/g, '')) !== 0) {
                macList.push(mac);
              }
            }
          }
          macList = Array.from(new Set(macList));
          if (macList.includes(obj.rawObj.ghost.mac)) {
            obj.rawObj = values[targetNum].ghost;
            obj.rawObj.ip = {};
            obj.rawObj.ip.outer = obj.rawObj.outer;
            obj.rawObj.ip.inner = obj.rawObj.inner;
            obj.rawObj.isGhost = true;
          }
        }

      }

      resolve(obj);
    }).catch(function (error) {
      reject(error);
    });
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

Mother.prototype.zeroAddition = function (number) {
  if (typeof number !== "number") {
    throw new Error("input must be number");
  }
  return (number < 10 ? `0${String(number)}` : String(number));
}

Mother.prototype.ghostFileUpload = function (fromArr, toArr) {
  if (!Array.isArray(fromArr) || !Array.isArray(toArr)) {
    throw new Error("input must be from array, to array")
  }
  const axios = require("axios");
  const fs = require("fs");
  const FormData = require("form-data");
  const ADDRESS = require(`${process.cwd()}/apps/infoObj.js`);
  let num, form, formHeaders, toList;
  return new Promise((resolve, reject) => {

    form = new FormData();
    num = 0;
    for (let i = 0; i < toArr.length; i++) {
      if (/^\//.test(toArr[i])) {
        toArr[i] = toArr[i].slice(1);
      }
    }
    toList = toArr;
    form.append("toArr", JSON.stringify(toList));
    for (let fileName of fromArr) {
      form.append("file" + String(num), fs.readFileSync(fileName));
      num++;
    }

    form.getLength((err, length) => {
      if (err) {
        reject(err);
      } else {
        formHeaders = form.getHeaders();
        formHeaders["Content-Length"] = length;
        axios.post(`https://${ADDRESS.officeinfo.ghost.host}:${String(3000)}/generalFileUpload`, form, {
          headers: { ...formHeaders },
        }).then((response) => {
          resolve({ message: "done" });
        }).catch((error) => {
          reject(error);
        });
      }
    });

  });
}

Mother.prototype.generalFileUpload = function (url, fromArr, toArr) {
  if (typeof url !== "string" || !Array.isArray(fromArr) || !Array.isArray(toArr)) {
    throw new Error("input must be url, from array, to array");
  }
  const fs = require("fs");
  const FormData = require("form-data");
  const axios = require("axios");
  const form = new FormData();
  let num, formHeaders, toList;
  return new Promise((resolve, reject) => {
    for (let i = 0; i < toArr.length; i++) {
      if (/^\//.test(toArr[i])) {
        toArr[i] = toArr[i].slice(1);
      }
    }
    toList = toArr;
    form.append("toArr", JSON.stringify(toList));
  
    num = 0;
    for (let fileName of fromArr) {
      form.append("file" + String(num), fs.readFileSync(fileName));
      num++;
    }
  
    form.getLength((err, length) => {
      if (err) {
        reject(err);
      } else {
        formHeaders = form.getHeaders();
        formHeaders["Content-Length"] = length;
        axios.post(url, form, {
          headers: { ...formHeaders },
        }).then((response) => {
          resolve({ message: "done" });
        }).catch((error) => {
          reject(error);
        });
      }
    });
  });
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
    } else if (/\.(gddoc)$/gi.test(fileName)) {
      str = "gddoc";
    } else if (/\.(gdsheet)$/gi.test(fileName)) {
      str = "gdsheet";
    } else if (/\.(gdslides)$/gi.test(fileName)) {
      str = "gdslides";
    } else if (/\.(gdform)$/gi.test(fileName)) {
      str = "gdform";
    } else if (/\.(ntpage)$/gi.test(fileName)) {
      str = "ntpage";
    } else if (/\.(ntkanban)$/gi.test(fileName)) {
      str = "ntkanban";
    } else if (/\.(drawio)$/gi.test(fileName)) {
      str = "drawio";
    } else if (/\.(link)$/gi.test(fileName)) {
      str = "link";
    } else if (/\.(odxlsx)$/gi.test(fileName)) {
      str = "odxlsx";
    } else if (/\.(oddocx)$/gi.test(fileName)) {
      str = "oddocx";
    } else if (/\.(odpptx)$/gi.test(fileName)) {
      str = "odpptx";
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
  try {
    let finalResult;
    if (!searchMode) {
      finalResult = await makeFileArr(target);
    } else {
      finalResult = await findTarget(target, keyword);
    }
    return finalResult;
  } catch (e) {
    console.log(e);
    return { error: e.message };
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

Mother.prototype.mysqlQuery = function (query, option = { local: false, front: true }) {
  const mysql = require("mysql2");
  const ADDRESS = require(`${process.cwd()}/apps/infoObj.js`);
  let mysqlStandard;
  let host;

  mysqlStandard = ADDRESS["frontinfo"];
  if (option.local === true) {
    host = "127.0.0.1";
  } else if (option.front === true) {
    host = ADDRESS["frontinfo"]["host"];
  } else {
    mysqlStandard = option;
    host = mysqlStandard.host;
  }

  const { user, password, database } = mysqlStandard;
  const connection = mysql.createConnection({ host, user, password, database });
  let tong = {};
  if (Array.isArray(query)) {
    let promiseList;
    promiseList = [];
    for (let i of query) {
      promiseList.push(connection.promise().query(i));
    }
    return new Promise(function (resolve, reject) {
      Promise.all(promiseList).then((values) => {
        tong = values;
        connection.end();
        resolve(tong);
      }).catch(function (err) {
        reject(err);
      });
    });
  } else {
    return new Promise(function (resolve, reject) {
      connection.promise().query(query).then(function (response) {
        tong = response;
      }).then(function () {
        connection.end();
        if (Array.isArray(tong)) {
          if (tong.length > 0) {
            resolve(tong[0]);
          } else {
            resolve({ message: "done" });
          }
        } else {
          resolve({ message: "done" });
        }
      }).catch(function (err) {
        reject(err);
      });
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

Mother.prototype.hexaJson = async function (input, middleMode = false) {
  const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor
  const tokenStart = "__hexaFunctionStart__<<<";
  const tokenEnd = ">>>__hexaFunctionEnd__";
  const hexaFunction = async function (input) {
    try {
      const crypto = require("crypto");
      const password = "homeliaison";
      const algorithm = "aes-192-cbc";
      const iv = Buffer.alloc(16, 0);
      const digest = "hex";
      const toHex = (string) => {
        return new Promise((resolve, reject) => {
          crypto.scrypt(password, "salt", 24, (err, key) => {
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
      }
      const toFunction = (hash) => {
        return new Promise((resolve, reject) => {
          crypto.scrypt(password, "salt", 24, (err, key) => {
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
      }
      let functionString, functionString_copied;
      let argString;
      let argArr;
      let decodeFunction;
      let asyncBoo;

      if (typeof input === "function") {

        return tokenStart + (await toHex(input.toString())) + tokenEnd;

      } else if (typeof input === "string") {

        if ((new RegExp('^' + tokenStart)).test(input) && (new RegExp(tokenEnd + '$')).test(input)) {
          input = input.replace(new RegExp('^' + tokenStart), '').replace(new RegExp(tokenEnd + '$'), '');
          functionString = await toFunction(input);
          functionString_copied = String(functionString).trim();
          argString = '';
          asyncBoo = /^async/.test(functionString_copied);
          if (/^(async function|function)/i.test(functionString_copied)) {
            functionString_copied.replace(/^(async function|function) [^\(]*\(([^\)]*)\)[ ]*\{/, (match, p1, p2) => {
              argString = p2.trim();
              return '';
            });
          } else {
            functionString_copied.replace(/^(async \(|\()([^\)]*)\)[ ]*\=\>[ ]*\{/, (match, p1, p2) => {
              argString = p2.trim();
              return '';
            });
          }
          argString = argString.replace(/[ ]*\=[ ]*[\{\[][^\=]*[\}\]]/gi, '');
          argString = argString.replace(/[ ]*\=[ ]*[^,]+/gi, '');
          argArr = argString.split(',').map((str) => { return str.trim(); });
          if (argArr.some((str) => { return / /gi.test(str); })) {
            throw new Error("invaild argument name");
          }
          if (asyncBoo) {
            decodeFunction = new AsyncFunction(...argArr, functionString.trim().replace(/^(async function [^\(]*\([^\)]*\)[ ]*\{|async \([^\)]*\)[ ]*\=\>[ ]*\{)/, '').replace(/\}$/, ''));
          } else {
            decodeFunction = new Function(...argArr, functionString.trim().replace(/^(function [^\(]*\([^\)]*\)[ ]*\{|\([^\)]*\)[ ]*\=\>[ ]*\{)/, '').replace(/\}$/, ''));
          }
          return decodeFunction;
        } else {
          return input;
        }

      } else {
        throw new Error("invaild input");
      }
    } catch (e) {
      console.log(e);
    }
  }
  const equalJson = function (jsonString) {
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
  try {
    if (typeof input === "function") {
      return await hexaFunction(input);
    } else if (typeof input === "object") {
      if (input === null) {
        return null;
      } else {
        const toJson = async function (obj) {
          try {
            for (let i in obj) {
              if (typeof obj[i] === "function") {
                obj[i] = await hexaFunction(obj[i]);
              } else if (typeof obj[i] === "object" && obj[i] !== null) {
                obj[i] = await toJson(obj[i]);
              }
            }
            return obj;
          } catch (e) {
            return obj;
          }
        }
        if (!middleMode) {
          return JSON.stringify(await toJson(input));
        } else {
          return await toJson(input);
        }
      }
    } else if (typeof input === "string") {
      if ((new RegExp('^' + tokenStart)).test(input)) {
        return await hexaFunction(input);
      } else {
        const toObj = async function (obj) {
          try {
            for (let i in obj) {
              if (typeof obj[i] === "string" && (new RegExp('^' + tokenStart)).test(obj[i])) {
                obj[i] = await hexaFunction(obj[i]);
              } else if (typeof obj[i] === "object" && obj[i] !== null) {
                obj[i] = await toObj(obj[i]);
              }
            }
            return obj;
          } catch (e) {
            return obj;
          }
        }
        return await toObj(equalJson(input));
      }
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
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
  if (typeof str === "number") {
    return new Date(str);
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

Mother.prototype.linkToString = function (link) {
  if (typeof link !== "string") {
    throw new Error("invalid input");
  }
  if (!/^http/.test(link)) {
    throw new Error("it is not link");
  }
  const nameToToken = (name) => { return `_____${name}_____` } 
  const tokens = {
    equal: nameToToken("equal"),
    amp: nameToToken("amp"),
    question: nameToToken("question"),
    hypen: nameToToken("hypen"),
    slash: nameToToken("slash"),
    colon: nameToToken("colon"),
    back: nameToToken("back"),
    sharp: nameToToken("sharp"),
    plus: nameToToken("plus"),
    percent: nameToToken("percent"),
    dot: nameToToken("dot"),
    wave: nameToToken("wave"),
    hat: nameToToken("hat"),
  }
  let linkArr;
  let protocol;
  let host;
  let pathName;
  let search;
  let getObj;
  let filteredLink;

  linkArr = link.split("/");
  if (linkArr.length < 3) {
    throw new Error("invalid link");
  }
  protocol = linkArr[0].replace(/[\:]/gi, '');
  host = linkArr[2];
  pathName = "/" + linkArr.slice(3).join("/");

  if (/[\?]/gi.test(pathName)) {
    search = pathName.split("?")[1];
    pathName = pathName.split("?")[0];
  } else {
    search = "";
  }

  if (search !== "") {
    getObj = search.split("&").map((str) => { return { key: str.split("=")[0], value: str.split("=")[1] } });
  } else {
    getObj = [];
  }

  pathName = pathName.split("/").map((str) => { return globalThis.encodeURIComponent(str) }).join("/");

  if (getObj.map((obj) => { return `${obj.key}=${obj.value}` }).join("&") === '') {
    filteredLink = protocol + "://" + host + pathName;
  } else {
    filteredLink = protocol + "://" + host + pathName + "?" + getObj.map((obj) => { return `${obj.key}=${obj.value}` }).join("&");
  }

  filteredLink = filteredLink.replace(/[\=]/gi, tokens.equal);
  filteredLink = filteredLink.replace(/[\&]/gi, tokens.amp);
  filteredLink = filteredLink.replace(/[\?]/gi, tokens.question);
  filteredLink = filteredLink.replace(/[\-]/gi, tokens.hypen);
  filteredLink = filteredLink.replace(/[\/]/gi, tokens.slash);
  filteredLink = filteredLink.replace(/[\:]/gi, tokens.colon);
  filteredLink = filteredLink.replace(/[\\]/gi, tokens.back);
  filteredLink = filteredLink.replace(/[\#]/gi, tokens.sharp);
  filteredLink = filteredLink.replace(/[\+]/gi, tokens.plus);
  filteredLink = filteredLink.replace(/[\%]/gi, tokens.percent);
  filteredLink = filteredLink.replace(/[\.]/gi, tokens.dot);
  filteredLink = filteredLink.replace(/[\~]/gi, tokens.wave);
  filteredLink = filteredLink.replace(/[\^]/gi, tokens.hat);

  return filteredLink;
}

Mother.prototype.stringToLink = function (string) {
  if (typeof string !== "string") {
    throw new Error("invalid input");
  }
  const nameToToken = (name) => { return `_____${name}_____` } 
  const tokens = {
    equal: nameToToken("equal"),
    amp: nameToToken("amp"),
    question: nameToToken("question"),
    hypen: nameToToken("hypen"),
    slash: nameToToken("slash"),
    colon: nameToToken("colon"),
    back: nameToToken("back"),
    sharp: nameToToken("sharp"),
    plus: nameToToken("plus"),
    percent: nameToToken("percent"),
    dot: nameToToken("dot"),
    wave: nameToToken("wave"),
    hat: nameToToken("hat"),
  }
  let filteredLink;

  filteredLink = string;

  filteredLink = filteredLink.replace(new RegExp(tokens.equal, "gi"), "=");
  filteredLink = filteredLink.replace(new RegExp(tokens.amp, "gi"), "&");
  filteredLink = filteredLink.replace(new RegExp(tokens.question, "gi"), "?");
  filteredLink = filteredLink.replace(new RegExp(tokens.hypen, "gi"), "-");
  filteredLink = filteredLink.replace(new RegExp(tokens.slash, "gi"), "/");
  filteredLink = filteredLink.replace(new RegExp(tokens.colon, "gi"), ":");
  filteredLink = filteredLink.replace(new RegExp(tokens.back, "gi"), "\\");
  filteredLink = filteredLink.replace(new RegExp(tokens.sharp, "gi"), "#");
  filteredLink = filteredLink.replace(new RegExp(tokens.plus, "gi"), "+");
  filteredLink = filteredLink.replace(new RegExp(tokens.percent, "gi"), "%");
  filteredLink = filteredLink.replace(new RegExp(tokens.dot, "gi"), ".");
  filteredLink = filteredLink.replace(new RegExp(tokens.wave, "gi"), "~");
  filteredLink = filteredLink.replace(new RegExp(tokens.hat, "gi"), "^");

  return filteredLink;
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

Mother.prototype.ipParsing = async function (ip) {
  if (typeof ip !== "string") {
    throw new Error("input must be ip");
  }
  const axios = require("axios");
  const tokenArr = [
    "5364d1717afd33",
    "e0cda9d974c871",
    "43e500b8c6c967",
    "e9604175815438",
  ];
  try {
    ip = ip.trim().replace(/[^0-9\.]/gi, '');
    if (ip.replace(/[0-9\.]/g, '') !== '') {
      throw new Error("invalid ip");
    }
    if (!/[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+/g.test(ip)) {
      throw new Error("invalid ip");
    }
    let url;
    let res;
    let resultBoo;
    let num;
    let finalResult;

    url = "https://ipinfo.io";
    url += "/" + ip;
  
    num = 0;
    resultBoo = false;
    do {
      try {
        if (tokenArr[num] === undefined) {
          throw new Error("more token need");
        }
        res = await axios.get(url + "?token=" + tokenArr[num]);
        finalResult = res.data;
        resultBoo = true;
      } catch {
        resultBoo = false;
        finalResult = {};
        num = num + 1;
      }
    } while (!resultBoo)

    return finalResult;
  } catch (e) {
    console.log(e);
    return {};
  }
}

Mother.prototype.s3FileUpload = function (fromArr, toArr) {
  const fs = require(`fs`);
  const shell = require(`shelljs`);

  let target = process.cwd() + "/apps/mother.py";
  let targetLink, targetArr;

  //shellLink and make target path
  targetLink = '';
  targetArr = target.split('/');
  for (let i of targetArr) {
    if (!/ /g.test(i) && !/\&/g.test(i) && !/\(/g.test(i) && !/\)/g.test(i) && !/\#/g.test(i) && !/\%/g.test(i) && !/\[/g.test(i) && !/\]/g.test(i) && !/\{/g.test(i) && !/\}/g.test(i) && !/\@/g.test(i) && !/\!/g.test(i) && !/\=/g.test(i) && !/\+/g.test(i) && !/\~/g.test(i) && !/\?/g.test(i) && !/\$/g.test(i)) {
      targetLink += i + '/';
    } else if (!/'/g.test(i)) {
      targetLink += "'" + i + "'" + '/';
    } else if (!/"/g.test(i)) {
      targetLink += '"' + i + '"' + '/';
    } else {
      targetLink += i + '/';
    }
  }
  targetLink = targetLink.slice(0, -1);

  //set bridge
  const bridgeFile = process.cwd() + "/temp/motherPythonBridge.json";

  //set data
  let fromList, toList;
  if (Array.isArray(fromArr)) {
    fromList = fromArr;
    for (let i = 0; i < toArr.length; i++) {
      if (/^\//.test(toArr[i])) {
        toArr[i] = toArr[i].slice(1);
      }
    }
    toList = toArr;
  } else {
    fromList = [ fromArr ];
    if (/^\//.test(toArr)) {
      toArr = toArr.slice(1);
    }
    toList = [ toArr ];
  }

  return new Promise(function(resolve, reject) {
    fs.writeFile(bridgeFile, JSON.stringify({ fromList, toList }, null, 2), "utf8", function (err) {
      if (err) {
        reject(err);
      }
      let order, child;
      let result, jsonRaw, json;
      order = `python3 ${targetLink} fileUpload`;
      child = shell.exec(order, { silent: true });
      jsonRaw = child.stdout.replace(/\n$/, '');
      json = JSON.parse(jsonRaw);
      result = json;
      resolve(result.message);
    });
  });
}

Mother.prototype.s3FileList = function (query = "all") {
  const fs = require(`fs`);
  const shell = require(`shelljs`);

  let target = process.cwd() + "/apps/mother.py";
  let targetLink, targetArr;

  //shellLink and make target path
  targetLink = '';
  targetArr = target.split('/');
  for (let i of targetArr) {
    if (!/ /g.test(i) && !/\&/g.test(i) && !/\(/g.test(i) && !/\)/g.test(i) && !/\#/g.test(i) && !/\%/g.test(i) && !/\[/g.test(i) && !/\]/g.test(i) && !/\{/g.test(i) && !/\}/g.test(i) && !/\@/g.test(i) && !/\!/g.test(i) && !/\=/g.test(i) && !/\+/g.test(i) && !/\~/g.test(i) && !/\?/g.test(i) && !/\$/g.test(i)) {
      targetLink += i + '/';
    } else if (!/'/g.test(i)) {
      targetLink += "'" + i + "'" + '/';
    } else if (!/"/g.test(i)) {
      targetLink += '"' + i + '"' + '/';
    } else {
      targetLink += i + '/';
    }
  }
  targetLink = targetLink.slice(0, -1);

  //set bridge
  const bridgeFile = process.cwd() + "/temp/motherPythonBridge.json";

  return new Promise(function(resolve, reject) {
    fs.writeFile(bridgeFile, JSON.stringify({ search: query }, null, 2), "utf8", function (err) {
      if (err) {
        reject(err);
      }
      let order, child;
      let result, jsonRaw, json;
      if (query !== "all") {
        order = `python3 ${targetLink} listBucket`;
      } else {
        order = `python3 ${targetLink} listBucketAll`;
      }
      child = shell.exec(order, { silent: true });
      jsonRaw = child.stdout.replace(/\n$/, '');
      json = JSON.parse(jsonRaw);
      result = json;
      resolve(result.message);
    });
  });
}

Mother.prototype.s3FileDelete = function (key) {
  const fs = require(`fs`);
  const shell = require(`shelljs`);

  let target = process.cwd() + "/apps/mother.py";
  let targetLink, targetArr;

  //shellLink and make target path
  targetLink = '';
  targetArr = target.split('/');
  for (let i of targetArr) {
    if (!/ /g.test(i) && !/\&/g.test(i) && !/\(/g.test(i) && !/\)/g.test(i) && !/\#/g.test(i) && !/\%/g.test(i) && !/\[/g.test(i) && !/\]/g.test(i) && !/\{/g.test(i) && !/\}/g.test(i) && !/\@/g.test(i) && !/\!/g.test(i) && !/\=/g.test(i) && !/\+/g.test(i) && !/\~/g.test(i) && !/\?/g.test(i) && !/\$/g.test(i)) {
      targetLink += i + '/';
    } else if (!/'/g.test(i)) {
      targetLink += "'" + i + "'" + '/';
    } else if (!/"/g.test(i)) {
      targetLink += '"' + i + '"' + '/';
    } else {
      targetLink += i + '/';
    }
  }
  targetLink = targetLink.slice(0, -1);

  if (/^\//.test(key)) {
    key = key.slice(1);
  }

  //set bridge
  const bridgeFile = process.cwd() + "/temp/motherPythonBridge.json";

  return new Promise(function(resolve, reject) {
    fs.writeFile(bridgeFile, JSON.stringify({ key }, null, 2), "utf8", function (err) {
      if (err) {
        reject(err);
      }
      let order, child;
      let result, jsonRaw, json;
      order = `python3 ${targetLink} delete`;
      child = shell.exec(order, { silent: true });
      jsonRaw = child.stdout.replace(/\n$/, '');
      json = JSON.parse(jsonRaw);
      result = json;
      resolve(result.message);
    });
  });
}

Mother.prototype.serviceParsing = function (serviceObj, startDateMode = false, initialMode = false) {
  const onoffString = [ "온라인", "오프라인" ];
  const serviceString = [ "홈퍼니싱", "홈스타일링", "토탈 스타일링", "엑스트라 스타일링" ];
  const serviceInitial = [ "F", "S", "T", "XT" ];
  const startDateNumbers = [ 30, 45, 60, 60 ];
  const xValueString = [ "mini", "basic", "premium" ];
  const seridKeywords = "s2011_aa0";

  if (typeof serviceObj === "object") {
    if (serviceObj.online === undefined || serviceObj.serid === undefined || serviceObj.xValue === undefined) {
      throw new Error("invaild service object");
    }
    let { online, serid, xValue } = serviceObj;
    let finalWords;
    let startDateNumber;
    let initial;

    if (online) {
      finalWords = onoffString[0] + " ";
    } else {
      finalWords = onoffString[1] + " ";
    }

    if (/_/gi.test(serid) && serid.split('_').length === 2) {
      serid = serid.split('_')[1];
      if (/aa01s/gi.test(serid)) {
        finalWords += serviceString[0] + " ";
        startDateNumber = startDateNumbers[0];
        initial = serviceInitial[0];
      } else if (/aa02s/gi.test(serid)) {
        finalWords += serviceString[1] + " ";
        startDateNumber = startDateNumbers[1];
        initial = serviceInitial[1];
      } else if (/aa03s/gi.test(serid)) {
        finalWords += serviceString[2] + " ";
        startDateNumber = startDateNumbers[2];
        initial = serviceInitial[2];
      } else if (/aa04s/gi.test(serid)) {
        finalWords += serviceString[3] + " ";
        startDateNumber = startDateNumbers[3];
        initial = serviceInitial[3];
      } else {
        throw new Error("invaild service object");
      }
    } else {
      if (/1/gi.test(serid)) {
        finalWords += serviceString[0] + " ";
        startDateNumber = startDateNumbers[0];
        initial = serviceInitial[0];
      } else if (/2/gi.test(serid)) {
        finalWords += serviceString[1] + " ";
        startDateNumber = startDateNumbers[1];
        initial = serviceInitial[1];
      } else if (/3/gi.test(serid)) {
        finalWords += serviceString[2] + " ";
        startDateNumber = startDateNumbers[2];
        initial = serviceInitial[2];
      } else if (/4/gi.test(serid)) {
        finalWords += serviceString[3] + " ";
        startDateNumber = startDateNumbers[3];
        initial = serviceInitial[3];
      } else {
        throw new Error("invaild service object");
      }
    }

    if (/M/gi.test(xValue)) {
      finalWords += xValueString[0];
    } else if (/B/gi.test(xValue)) {
      finalWords += xValueString[1];
    } else if (/P/gi.test(xValue)) {
      finalWords += xValueString[2];
    } else {
      throw new Error("invaild service object");
    }

    if (!startDateMode) {
      if (!initialMode) {
        return finalWords;
      } else {
        return initial;
      }
    } else {
      return startDateNumber;
    }

  } else if (typeof serviceObj === "string") {
    let tempArr, serviceNumber, tempString, thisSerid, thisXValue, thisOnline;
    tempArr = serviceObj.split('_');
    if (tempArr.length > 1) {
      serviceNumber = Number(tempArr[1].replace(/[a-z]/gi, '').replace(/^0/g, '').replace(/^0/g, '')) - 1;
      return serviceString[serviceNumber];
    } else {
      tempArr = serviceObj.split(' ');
      tempString = tempArr.pop();
      thisSerid = seridKeywords + String(serviceString.findIndex((str) => { return (new RegExp(str, "gi")).test(tempArr.join(" ")) }) + 1) + 's';
      return {
        serid: thisSerid,
        xValue: xValueString[xValueString.findIndex((str) => { return str.trim() === tempString.trim() })].slice(0, 1).toUpperCase(),
        online: /online/gi.test(serviceObj) || /온라인/gi.test(serviceObj),
      };
    }
  } else {
    return {
      onoff: onoffString,
      name: serviceString,
      date: startDateNumbers,
      xValue: xValueString
    };
  }
}

Mother.prototype.diskReading = function (mode = "check", arr = []) {
  if (typeof mode !== "string") {
    throw new Error("invaild input");
  }
  if (![ "check", "view" ].includes(mode)) {
    throw new Error("invaild input");
  }

  class Disk extends Array {
    constructor(total, used, available) {
      super();
      this.push(total);
      this.push(used);
      this.push(available);
      const usedPercentage = Math.round(((used / total) * 100) * 100) / 100;
      const obj = {
        byte: { total, used, available },
        megaByte: {
          total: Math.round((total / (1024)) * 10) / 10,
          used: Math.round((used / (1024)) * 10) / 10,
          available: Math.round((available / (1024)) * 10) / 10,
        },
        gigaByte: {
          total: Math.round((total / (1024 * 1024)) * 100) / 100,
          used: Math.round((used / (1024 * 1024)) * 100) / 100,
          available: Math.round((available / (1024 * 1024)) * 100) / 100,
        },
        percentage: {
          total: 100,
          used: usedPercentage,
          available: 100 - usedPercentage
        }
      };
      for (let key in obj) {
        this[key] = obj[key];
      }
    }
    toNormal() {
      let obj = {};
      obj.byte = JSON.parse(JSON.stringify(this.byte));
      obj.megaByte = JSON.parse(JSON.stringify(this.megaByte));
      obj.gigaByte = JSON.parse(JSON.stringify(this.gigaByte));
      obj.percentage = JSON.parse(JSON.stringify(this.percentage));
      return obj;
    }
    toArray() {
      return [ this[0], this[1], this[2] ];
    }
    toPercentage() {
      return { gigaByte: this.gigaByte, percentage: this.percentage };
    }
  }

  if (mode === "check") {
    const { exec } = require("child_process");
    const command = "df -Pk -- /";
    return new Promise((resolve, reject) => {
      exec(command, { cwd: process.cwd(), maxBuffer: 20 * 1024 * 1024 }, (error, stdout, stderr) => {
        if (error) {
          reject(error);
        } else {
          const [ , totalRaw, , availableRaw ] = stdout.trim().split("\n").map((str) => { return str.trim() })[1].split(' ').filter((str) => { return str.trim() !== '' });
          const total = Number(totalRaw);
          const available = Number(availableRaw);
          const used = total - available;
          resolve(new Disk(total, used, available));
        }
      });
    });
  } else if (mode === "view") {
    if (!Array.isArray(arr)) {
      throw new Error("invaild input 2");
    }
    if (arr.length !== 3) {
      throw new Error("invaild input => arr must be [ total, used, available ]");
    }
    if (!arr.every((n) => { return typeof n === "number" })) {
      throw new Error("invaild input => arr must be [ total, used, available ]");
    }
    const disk = new Disk(...arr);
    console.table(disk.toPercentage());
  }
}

Mother.prototype.errorLog = function (text) {
  if (typeof text === "object" && text !== null) {
    if (typeof text.text === "string") {
      text = text.text;
    } else {
      throw new Error("invaild input");
    }
  } else {
    if (typeof text !== "string") {
      throw new Error("invaild input");
    }
  }
  const ADDRESS = require(`${process.cwd()}/apps/infoObj.js`);
  const recordUrl = "https://" + ADDRESS.secondinfo.host + ":3000/messageLog";
  const axios = require("axios");
  const collection = "errorLog";
  const channel = "#error_log";
  return new Promise((resolve, reject) => {
    axios.post(recordUrl, { text, channel, collection }, { headers: { "Content-Type": "application/json" } }).then((res) => {
      if (res.status !== 200) {
        reject(res);
      } else {
        resolve(res);
      }
    }).catch((err) => {
      reject(err);
    });
  });
}

Mother.prototype.emergencyAlarm = function (text) {
  if (typeof text === "object" && text !== null) {
    if (typeof text.text === "string") {
      text = text.text;
    } else {
      throw new Error("invaild input");
    }
  } else {
    if (typeof text !== "string") {
      throw new Error("invaild input");
    }
  }
  const ADDRESS = require(`${process.cwd()}/apps/infoObj.js`);
  const recordUrl = "https://" + ADDRESS.secondinfo.host + ":3000/emergencyAlarm";
  const axios = require("axios");
  return new Promise((resolve, reject) => {
    axios.post(recordUrl, { text }, { headers: { "Content-Type": "application/json" } }).then((res) => {
      if (res.status !== 200) {
        reject(res);
      } else {
        resolve(res);
      }
    }).catch((err) => {
      reject(err);
    });
  });
}

Mother.prototype.messageSend = function (text, channel = "silent", voice = false, target = null, fairy = false) {
  if (typeof text === "object" && text !== null) {
    if (typeof text.text === "string" && typeof text.channel === "string") {
      channel = text.channel;
      if (text.voice === true) {
        voice = true;
      } else {
        voice = false;
      }
      if (Array.isArray(text.target)) {
        target = text.target;
      }
      fairy = text.fairy === undefined ? false : text.fairy;
      text = text.text;
    } else {
      throw new Error("invaild input");
    }
  } else {
    if (typeof text !== "string" || typeof channel !== "string") {
      throw new Error("invaild input");
    }
  }
  if (voice !== true) {
    voice = false;
  }
  if (fairy !== true) {
    fairy = false;
  }
  const ADDRESS = require(`${process.cwd()}/apps/infoObj.js`);
  const recordUrl = "https://" + ADDRESS.secondinfo.host + ":3000/messageLog";
  const axios = require("axios");
  const collection = "messageLog";
  const emptyPromise = () => {
    return new Promise((resolve, reject) => {
      resolve({ status: 200, message: "done" });
    });
  }
  return new Promise((resolve, reject) => {
    axios.post(recordUrl, { text, channel, collection, voice, target, fairy }, { headers: { "Content-Type": "application/json" } }).then((res) => {
      if (res.status !== 200) {
        reject(res);
      } else {
        return emptyPromise();
      }
    }).then((res) => {
      if (res.status !== 200) {
        reject(res);
      } else {
        resolve(res);
      }
    }).catch((err) => {
      reject(err);
    });
  });
}

Mother.prototype.messageLog = function (text) {
  let channel;
  if (typeof text === "object" && text !== null) {
    if (typeof text.text === "string") {
      channel = text.channel;
      text = text.text;
    } else {
      throw new Error("invaild input");
    }
  } else {
    if (typeof text !== "string") {
      throw new Error("invaild input");
    }
  }
  if (typeof channel !== "string") {
    channel = "silent";
  }
  const ADDRESS = require(`${process.cwd()}/apps/infoObj.js`);
  const recordUrl = "https://" + ADDRESS.secondinfo.host + ":3000/messageLog";
  const axios = require("axios");
  const collection = "messageLog";
  return new Promise((resolve, reject) => {
    axios.post(recordUrl, { text, channel, collection }, { headers: { "Content-Type": "application/json" } }).then((res) => {
      if (res.status !== 200) {
        reject(res);
      } else {
        resolve(res);
      }
    }).catch((err) => {
      reject(err);
    });
  });
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
  } else if (type === "uuid") {
    const { v4 } = require("uuid");
    return v4();
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

Mother.prototype.pureServer = function (mode = "class", app = null, port = 8000) {
  const PureServer = function () {
    this.matrix = [];
  }
  PureServer.prototype.get = function (path, callback) {
    if (typeof callback !== "function") {
      throw new Error("invaild input");
    }
    if (Array.isArray(path)) {
      for (let str of path) {
        if (typeof str !== "string") {
          throw new Error("invaild input");
        }
        if (!/^\//.test(str)) {
          str = '/' + str;
        }
        this.matrix.push([
          "GET",
          str,
          callback
        ]);
      }
    } else if (typeof path === "string") {
      if (!/^\//.test(path)) {
        path = '/' + path;
      }
      this.matrix.push([
        "GET",
        path,
        callback
      ]);
    } else {
      throw new Error("invaild input");
    }
  }
  PureServer.prototype.post = function (path, callback) {
    if (typeof callback !== "function") {
      throw new Error("invaild input");
    }
    if (Array.isArray(path)) {
      for (let str of path) {
        if (typeof str !== "string") {
          throw new Error("invaild input");
        }
        if (!/^\//.test(str)) {
          str = '/' + str;
        }
        this.matrix.push([
          "POST",
          str,
          callback
        ]);
      }
    } else if (typeof path === "string") {
      if (!/^\//.test(path)) {
        path = '/' + path;
      }
      this.matrix.push([
        "POST",
        path,
        callback
      ]);
    } else {
      throw new Error("invaild input");
    }
  }
  PureServer.prototype.server = function () {
    const instance = this;
    return async function (req, res) {
      try {
        const buffers = [];
        for await (const chunk of req) {
          buffers.push(chunk);
        }
        const data = Buffer.concat(buffers).toString();
        try {
          req.body = JSON.parse(data);
        } catch (e) {
          req.body = {};
          if (data !== "") {
            req.body.raw = data;
          }
        }
        let boo;

        res.set = function (obj) {
          return res.writeHead(200, obj);
        }
        res.send = res.end;

        boo = false;
        for (let [ method, path, callback ] of instance.matrix) {
          if (method === req.method && path === req.url.trim()) {
            boo = true;
            res.writeHead(200, {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
              "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
            });
            await callback(req, res);
          }
        }
        if (!boo) {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ data: 'error' }));
        }
      } catch (e) {
        console.log(e);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ data: 'error' }));
      }
    }
  }
  if (mode === "class") {
    return PureServer;
  } else if (mode === "server" || mode === "listen" || mode === "run") {
    if (typeof app.constructor === "function") {
      if (app.constructor.name === "PureServer") {
        const http = require("http");
        const server = http.createServer();
        server.on("request", app.server());
        server.listen(port);
        console.log(`\x1b[33m%s\x1b[0m`, `Pure server launching in ${String(port)}`);
      } else {
        throw new Error("invaild input");
      }
    } else {
      throw new Error("invaild input");
    }
  } else {
    throw new Error("invaild mode");
  }
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

Mother.prototype.promiseTogether = function (promiseArr) {
  if (!Array.isArray(promiseArr)) {
    throw new Error("invaild input");
  }
  if (!promiseArr.every((obj) => { return obj instanceof Promise })) {
    throw new Error("invaild input");
  }
  return new Promise((resolve, reject) => {
    const workLength = promiseArr.length;
    let promiseTong, interval, timeout;

    promiseTong = [];

    for (let i = 0; i < workLength; i++) {
      promiseArr[i].then(() => {
        promiseTong.push(true);
      }).catch((err) => {
        reject(err);
      })
    }

    interval = setInterval(() => {
      if (promiseTong.length >= workLength) {
        timeout = setTimeout(() => {
          resolve(true);
          clearTimeout(timeout);
        }, 0);
        clearInterval(interval);
      }
    }, 100);
  });
}

Mother.prototype.localUnique = function () {
  let networkInterfaces, macTargets;
  networkInterfaces = require("os").networkInterfaces();
  macTargets = Object.values(networkInterfaces).flat().filter((obj) => { return obj.family === "IPv4" }).filter((obj) => { return obj.address !== "127.0.0.1" }).map((obj) => {
    return obj.mac;
  });
  macTargets.sort();
  return "fa" + macTargets[0].trim().replace(/\:/gi, "0000");
}

Mother.prototype.mediaQuery = function (code) {
  const conditions = [
    "window.innerWidth > 1450",
    "window.innerWidth <= 1450 && window.innerWidth > 1100",
    "window.innerWidth <= 1100 && window.innerWidth > 900",
    "window.innerWidth <= 900 && window.innerWidth > 760",
    "window.innerWidth <= 760"
  ];
  const updateProtoConst = "GeneralJs.stacks.updateMiddleMedialQueryConditions";
  const matchReg = /[\n;]([^\n\;]*)\<\%\%([^\%]+)\%\%\>[;]?/g;
  const replacer = function (match, p1, p2, offset, string) {
    const safeWall = "\n\n";
    let tempValue, tempArr, tempStr;

    tempValue = p1.replace(/[\n;]/g, '').replace(/\<\%\%/g, '').trim();
    tempArr = p2.replace(/\<\%\%/g, '').replace(/\%\%\>/g, '').trim().split(",");
    tempStr = "";
    if (tempArr.length > conditions.length) {
      throw new Error("parse error");
    }
    for (let j = 0; j < tempArr.length; j++) {
      tempStr += " } else if (" + conditions[j] + ") { ";
      tempStr += "\n"
      tempStr += tempValue;
      tempStr += " ";
      tempStr += tempArr[j];
      tempStr += ";\n";
    }
    tempStr = safeWall + tempStr.slice(7) + " }" + safeWall;
    return tempStr;
  }
  let updateProto;

  updateProto = '';
  updateProto += updateProtoConst;
  updateProto += " = ";
  updateProto += "[";
  for (let i of conditions) {
    updateProto += "(";
    updateProto += i;
    updateProto += "),";
  }
  updateProto += "];\n";

  code = code.replace(matchReg, replacer);
  code = code.replace(/\<\&\&([^\&]+)\&\&\>/g, (match, p1) => {
    let tempValue, tempArr, tempStr;
    tempArr = p1.replace(/\<\&\&/g, '').replace(/\&\&\>/g, '').trim().split("|");
    tempArr = tempArr.map((str) => { return str.trim(); });
    return `(${conditions[0]} ? ${tempArr[0]} : (${conditions[1]} ? ${tempArr[1]} : (${conditions[2]} ? ${tempArr[2]} : (${conditions[3]} ? ${tempArr[3]} : ${tempArr[4]}))))`;
  });

  return { conditions: updateProto, code };
}

Mother.prototype.processSystem = async function (mode, processNameKeywords = []) {
  if (typeof mode !== "string") {
    throw new Error("invalid input, must be mode");
  }
  const processList = function () {
    const { spawn } = require("child_process");
    const ps = spawn("ps", [ "-ax" ]);
    return new Promise((resolve, reject) => {
      let out, processList;
      out = "";
      ps.stdout.on("data", (data) => { out += String(data); });
      ps.stderr.on("data", (data) => { reject(String(data)); });
      ps.on("close", (code) => {
        processList = out.split("\n").slice(1).map((str) => {
          return str.trim();
        }).map((str) => {
          const arr = str.split(/[0-9]\:[0-9][0-9]/);
          if (arr.length >= 2) {
            return arr;
          } else {
            return null;
          }
        }).filter((arr) => {
          return arr !== null;
        }).map(([ first, second ]) => {
          return [ Number(first.split(" ")[0].trim()), second.split(" ").slice(1).join(" ") ];
        }).map(([ pid, process ]) => {
          return { pid, process };
        });
        resolve(processList);
      });
    });
  }
  const killProcess = function (pid) {
    const { exec } = require("child_process");
    return new Promise((resolve, reject) => {
      exec("kill -9 " + String(pid), { cwd: process.cwd(), maxBuffer: 20 * 1024 * 1024 }, (error, stdout, stderr) => {
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
  }
  try {
    if (mode === "list") {
      return await processList();
    } else if (mode === "kill" || mode === "find" || mode === "pid") {
      if (!Array.isArray(processNameKeywords)) {
        throw new Error("keywords box must be array");
      }
      const list = await processList();
      let targetPid;

      targetPid = null;
      for (let { pid, process } of list) {
        if (processNameKeywords.map((str) => { return new RegExp(str, "gi"); }).every((reg) => { return reg.test(process) })) {
          targetPid = pid;
        }
      }
      if (mode === "find" || mode === "pid") {
        return targetPid;
      } else {
        if (targetPid !== null) {
          await killProcess(targetPid);
          return "done";
        } else {
          console.log("there is no process");
          return null;
        }
      }
    }
  } catch (e) {
    console.log(e);
  }
}

Mother.prototype.sha256Hmac = function (key, message, type = "base64") {
  const crypto = require("crypto");
  return crypto.createHmac("sha256", key).update(message).digest(type);
}

Mother.prototype.stringToBase64 = function (str) {
  const iconv = require("iconv-lite");
  return iconv.encode(str, "utf-8").toString("base64");
}

Mother.prototype.base64ToString = function (data) {
  const iconv = require("iconv-lite");
  return iconv.decode(Buffer.from(data, "base64"), "utf-8");
}

Mother.prototype.variableArray = function (length, callback = null) {
  if (typeof length !== "number") {
    throw new Error("invaild input")
  }
  let targetArray = [];
  for (let i = 0; i < length; i++) {
    if (typeof callback === "function") {
      targetArray.push(callback(i));
    } else {
      targetArray.push(i);
    }
  }
  return targetArray;
}

Mother.prototype.autoHypenPhone = function (m) {
  let str = m.trim();
  str = str.replace(/[^0-9]/g, '');
  let tmp = '';
  if (str.length < 4) {
    return str;
  } else if (str.length < 7) {
    tmp += str.substr(0,3);
    tmp += '-';
    tmp += str.substr(3);
    return tmp;
  } else if (str.length < 11) {
    tmp += str.substr(0, 3);
    tmp += '-';
    tmp += str.substr(3, 3);
    tmp += '-';
    tmp += str.substr(6);
    return tmp;
  } else {
    tmp += str.substr(0, 3);
    tmp += '-';
    tmp += str.substr(3, 4);
    tmp += '-';
    tmp += str.substr(7);
    return tmp;
  }
}

Mother.prototype.designerCareer = function (designer, wordingMode = false) {
  const today = new Date();
  let careerSubtract;
  let year, month;
  let sumCareer;
  let finalYear, finalMonth;

  careerSubtract = ((today.getFullYear() * 12) + (today.getMonth() + 1)) - ((designer.information.business.career.startY * 12) + designer.information.business.career.startM);

  year = Math.floor(careerSubtract / 12);
  month = (careerSubtract % 12);

  sumCareer = (year * 12) + month + (designer.information.business.career.relatedY * 12) + designer.information.business.career.relatedM;

  finalYear = Math.floor(sumCareer / 12);
  finalMonth = (sumCareer % 12);

  if (wordingMode) {
    return `경력&nbsp;&nbsp;<b%|%b>&nbsp;&nbsp;${String(finalYear)}년 ${String(finalMonth)}개월`;
  } else {
    return [ finalYear, finalMonth ];
  }
}

module.exports = Mother;
