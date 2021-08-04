const Mother = function () {
  const infoObj = require(process.cwd() + "/apps/infoObj.js");

  //mongo
  this.mongoinfoObj = infoObj.mongoinfo;
  this.bridgeinfoObj = infoObj.bridgeinfo;

  this.mongoinfo = "mongodb://" + infoObj.mongoinfo.user + ':' + infoObj.mongoinfo.password + '@' + infoObj.mongoinfo.host + ':' + String(infoObj.mongoinfo.port) + "/admin";
  this.mongopythoninfo = "mongodb://" + infoObj.pythoninfo.user + ':' + infoObj.pythoninfo.password + '@' + infoObj.pythoninfo.host + ':' + String(infoObj.pythoninfo.port) + "/admin";
  this.mongoconsoleinfo = "mongodb://" + infoObj.backinfo.user + ':' + infoObj.backinfo.password + '@' + infoObj.backinfo.host + ':' + String(infoObj.backinfo.port) + "/admin";
  this.mongohomeinfo = "mongodb://" + infoObj.homeinfo.user + ':' + infoObj.homeinfo.password + '@' + infoObj.homeinfo.ip.outer + ':' + String(infoObj.homeinfo.port) + "/admin";
  this.mongolocalinfo = "mongodb://" + infoObj.mongoinfo.user + ':' + infoObj.mongoinfo.password + '@' + "127.0.0.1" + ':' + String(infoObj.mongoinfo.port) + "/admin";

  this.bridgeinfo = "mongodb://" + infoObj.bridgeinfo.user + ':' + infoObj.bridgeinfo.password + '@' + infoObj.bridgeinfo.host + ':' + String(infoObj.bridgeinfo.port) + "/admin";
  this.mongo = require("mongodb").MongoClient;

  //mysql
  this.frontinfo = {
    host: infoObj.frontinfo.host,
    user: infoObj.frontinfo.user,
    password: infoObj.frontinfo.password,
    port: infoObj.frontinfo.port,
    database: infoObj.frontinfo.database
  };
  this.mysqlpythoninfo = {
    host: infoObj.pythoninfo.host,
    user: infoObj.frontinfo.user,
    password: infoObj.frontinfo.password,
    port: infoObj.frontinfo.port,
    database: infoObj.frontinfo.database
  };
  this.mysql = require("mysql2");

  //shell
  this.shell = require("shelljs");

  //slack
  const { WebClient } = require('@slack/web-api');
  this.slack_bot = new WebClient(`xoxb-717757271335-2032150390679-1FTxRg4wQasMpe9kKDgAdqBv`);

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
  const shell = require('shelljs');
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
        for (let i = 0; i < filelist.length; i++) { if (filelist[i] !== `.DS_Store`) {
          shell.exec(`rm -rf ${shellLink(targetDir)}/${filelist[i]};`);
        }}
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

Mother.prototype.googleSystem = function (sw) {
  let app;
  switch (sw) {
    case "sheets":
      const GoogleSheet = require(process.cwd() + "/apps/googleAPIs/googleSheet.js");
      app = new GoogleSheet();
      return app;
      break;
    case "docs":
      const GoogleDocs = require(process.cwd() + "/apps/googleAPIs/googleDocs.js");
      app = new GoogleDocs();
      return app;
      break;
    case "drive":
      const GoogleDrive = require(process.cwd() + "/apps/googleAPIs/googleDrive.js");
      app = new GoogleDrive();
      return app;
      break;
    case "gmail":
      const GoogleMail = require(process.cwd() + "/apps/googleAPIs/googleMail.js");
      app = new GoogleMail();
      return app;
      break;
    case "calendar":
      const GoogleCalendar = require(process.cwd() + "/apps/googleAPIs/googleCalendar.js");
      app = new GoogleCalendar();
      return app;
      break;
  }
}

Mother.prototype.babelSystem = function (code, webpack = false, minify = false) {
  const babel = require("@babel/core");
  if (webpack) { minify = false; }
  let babelOptions = {
    presets: [
      [ "@babel/preset-env", { targets: { browsers : [ "last 2 versions", "ie >= 11" ] } }, ],
    ],
  }
  if (minify) {
    babelOptions.presets.push([ "minify", {
      mangle: false,
      simplify: false,
    }]);
  }
  if (webpack) {
    babelOptions.plugins = [];
    babelOptions.plugins.push([ "@babel/plugin-transform-runtime", { corejs: 3, } ]);
  }
  return new Promise(function(resolve, reject) {
    babel.transform(code, babelOptions, function(err, result) {
      if (err) { reject(err); }
      let code;
      if (minify) {
        code = result.code.replace(/\\u([\d\w]{4})/gi, (m, g) => String.fromCharCode(parseInt(g, 16)));
      } else {
        code = result.code;
      }
      code = result.code;
      resolve(code);
    });
  });
}

Mother.prototype.webpackSystem = function (from, to, customOpt = null) {
  const webpack = require('webpack');
  let resultRaw, resultPath, resultFile, options;
  resultRaw = to.split('/');
  resultFile = resultRaw[resultRaw.length - 1];
  resultPath = '';
  for (let i = 1; i < resultRaw.length - 1; i++) {
    resultPath += '/' + resultRaw[i];
  }

  if (customOpt === null) {
    options = {
      mode: "production",
      entry: process.cwd() + '/temp/' + from,
      output: { path: resultPath, filename: resultFile },
      module: {
        rules: [
          {
            test: /\.js$/,
            include: [
              `${process.cwd()}/temp`
            ],
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
              }
            }
          }
        ]
      },
    }
  } else {
    options = customOpt;
  }

  return new Promise(function (resolve, reject) {
    webpack(options, function(err, stats) {
      if (err) { reject(err); }
      console.log(stats.toString({ chunks: false, colors: true }));
      resolve(to + " pack success");
    });
  });
}

Mother.prototype.requestSystem = function (url, data = {}, config = {}) {
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

Mother.prototype.binaryRequest = function (to, port = null) {
  let http;
  let target, tempArr;
  let targetHost, targetPath;

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

  return new Promise(function(resolve, reject) {
    let req = http.request({
      hostname: targetHost,
      port: port,
      path: targetPath,
      method: "GET"
    }, (res) => {
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

Mother.prototype.ghostRequest = function (path = "", data = {}) {
  /*
  // bind usage example
  const designerRequest = this.mother.ghostRequest().bindPath("designer");
  console.log(await designerRequest("ls"));
  */
  let requestFunction = new Function();
  class BindPromise extends Promise {
    bindPath(mode) {
      if (mode === undefined) {
        throw new Error("must be bind path mode");
      }
      return requestFunction(mode);
    }
    bind(mode) {
      return this.bindPath(mode);
    }
  }
  requestFunction = function (bind = null) {
    const homeGhostNames = [ "ghost", "home", "original", "core" ];
    if (homeGhostNames.includes(bind)) {
      bind = "file";
    }
    return function requestLaunchingFunction(path, data = {}) {
      let promiseObj;
      const shell = require(`shelljs`);
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
      const address = require(`${process.cwd()}/apps/infoObj.js`);
      let ddns, port, protocol;
      let order, url;

      if (bind === "file") {
        ddns = address.homeinfo.ghost.ddns;
        port = address.homeinfo.ghost.file.port;
        protocol = address.homeinfo.ghost.protocol;

        const crypto = require('crypto');
        const algorithm = 'aes-192-cbc';
        return new BindPromise(function (resolve, reject) {
          crypto.scrypt("homeliaison", 'salt', 24, function (err, key) {
            if (err) {
              reject(err);
            } else {
              const cipher = crypto.createCipheriv(algorithm, key, Buffer.alloc(16, 0));
              let encrypted = '';
              cipher.setEncoding('hex');
              cipher.on('data', function (chunk) {
                encrypted += chunk;
              });
              cipher.on('end', function () {
                data.hash = encrypted;
                data.uragenGhostFinalRandomAccessKeyArraySubwayHomeLiaisonStyle = "a19OyoZjf9xQJXykapple3kE5ySgBW39IjxQJXyk3homeliaisonkE5uf9uuuySgBW3ULXHF1CdjxGGPCQJsubwayXyk3kE5ySgBW3f9y2Y2lotionpuk0dQF9ruhcs";
                url = `${protocol}://${ddns}:${String(port)}/${path.replace(/^\//gi, '')}`;
                order = "curl -d '" + JSON.stringify(data) + "' -H \"Content-Type: application/json\" -X POST " + url;
                shell.exec(order, { silent: true, async: true }, function (err, stdout, stderr) {
                  if (err) {
                    reject(err);
                  } else {
                    if (/^[\[\{]/.test(stdout.trim())) {
                      resolve(JSON.parse(stdout.trim()));
                    } else {
                      resolve(stdout.trim());
                    }
                  }
                });
              });
              cipher.write(address.s3info.boto3.key);
              cipher.end();
            }
          });
        });
      } else {
        ddns = address.officeinfo.ghost.ddns;
        port = address.officeinfo.ghost.port;
        protocol = address.officeinfo.ghost.protocol;
        url = `${protocol}://${ddns}:${String(port)}/${(bind !== null && bind !== "") ? bind + "_" : ""}${path.replace(/^\//gi, '')}`;
        order = "curl -d '" + JSON.stringify(data) + "' -H \"Content-Type: application/json\" -X POST " + url;
        promiseObj = new BindPromise(function (resolve, reject) {
          if (path === "") {
            resolve("bind");
          } else {
            shell.exec(order, { silent: true, async: true }, function (err, stdout, stderr) {
              if (err) {
                reject(err);
              } else {
                if (/^[\[\{]/.test(stdout.trim())) {
                  resolve(JSON.parse(stdout.trim()));
                } else {
                  resolve(stdout.trim());
                }
              }
            });
          }
        });
        return promiseObj;
      }
    }
  }
  return (requestFunction())(path, data);
}

Mother.prototype.appleScript = function (name, contents, dir = null, clean = true, silent = false) {
  const fs = require('fs');
  const shell = require('shelljs');
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
              shell.exec(`rm -rf ${shellLink(targetDir)}/${filelist[i]};`);
            }
          }
          fs.writeFile(`${targetDir}/${name}.applescript`, contents, "utf8", (err) => {
            if (err) {
              reject(err);
            } else {
              let output = shell.exec(`osascript ${shellLink(targetDir)}/${name}.applescript`, { silent: silent });
              shell.exec(`rm -rf ${shellLink(targetDir)}/${name}.applescript`);
              resolve(output.stdout.replace(/\n$/, ''));
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
          let output = shell.exec(`osascript ${shellLink(targetDir)}/${name}.applescript`, { silent: silent });
          shell.exec(`rm -rf ${shellLink(targetDir)}/${name}.applescript`);
          resolve(output.stdout.replace(/\n$/, ''));
        }
      });
    });
  }
}

Mother.prototype.pythonExecute = function (target, args = [], inputObj) {
  const fs = require(`fs`);
  const shell = require(`shelljs`);

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
      let order, child;
      let result, jsonRaw, json;
      order = `python3 ${targetLink}`;
      if (args.length > 0) {
        order += ` ${args.join(' ')}`;
      }
      child = shell.exec(order, { silent: true });
      jsonRaw = child.stdout.replace(/\n$/, '');
      try {
        json = JSON.parse(jsonRaw);
        result = json;
      } catch (e) {
        result = jsonRaw;
      }
      resolve(result);
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
  const axios = require(`axios`);
  const ADDRESS = require(`${process.cwd()}/apps/infoObj.js`);
  const keys = Object.keys(ADDRESS);
  const values = Object.values(ADDRESS);
  return new Promise(function(resolve, reject) {
    axios.get("https://" + ADDRESS["pythoninfo"]["host"] + ":3000").then(function (response) {
      const ip = response.data.replace(/[^0-9\.]/g, '');
      let obj = { ip };
      let target = "unknown", targetNum = 0;
      let number = 0;
      for (let { ip: { outer } } of values) {
        if (outer === ip) {
          target = keys[number].replace(/info$/, '');
          targetNum = number;
        }
        number++;
      }
      obj.name = target;
      obj.rawObj = values[targetNum];

      if (target === "home" || target === "office") {
        const networkInterfaces = require("os").networkInterfaces();
        let macList;
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
  const abc = `[ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z" ]`;
  const ABC = JSON.parse(abc);
  let text = '', func;
  let target, index0, index1, result;

  if (type === "encode") {

    for (let i = 0; i < ABC.length; i++) {
      for (let j = 0; j < ABC.length; j++) {
        text += `} else if (number < (100 * ((${ABC.length} * ${i}) + (${j} + 1)))) {\nreturn ABC[${i}] + ABC[${j}] + (number - (100 * ((${ABC.length} * ${i}) + ${j})) < 10 ? '0' + String(number - (100 * ((${ABC.length} * ${i}) + ${j}))) : String(number - (100 * ((${ABC.length} * ${i}) + ${j}))));\n`;
      }
    }
    func = new Function("number", `const ABC = ${abc};\n${text.slice(7)}}`);
    return func(number);

  } else if (type === "decode") {

    if (number.length > 4) {
      target = number.replace(/[a-z]$/, '').split("_")[1];
    } else if (number.length === 4) {
      target = number;
    } else {
      throw new Error("invaild number");
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
    result = (index0 * 100 * 26) + (index1 * 100) + (Number(target[2]) * 10) + (Number(target[3]) * 1);

    return result;

  } else {
    throw new Error("orderSystem type must be 'encode' or 'decode'");
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

Mother.prototype.ghostFileUpload = function (fromArr, toArr) {
  const axios = require('axios');
  const fs = require('fs');
  const FormData = require('form-data');
  const ADDRESS = require(`${process.cwd()}/apps/infoObj.js`);
  const crypto = require('crypto');
  const algorithm = 'aes-192-cbc';
  let num, form, formHeaders, toList;
  return new Promise(function (resolve, reject) {
    crypto.scrypt("homeliaison", 'salt', 24, function (err, key) {
      if (err) {
        reject(err);
      } else {
        const cipher = crypto.createCipheriv(algorithm, key, Buffer.alloc(16, 0));
        let encrypted = '';
        cipher.setEncoding('hex');
        cipher.on('data', function (chunk) {
          encrypted += chunk;
        });
        cipher.on('end', function () {
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
            form.append("file" + String(num), fs.createReadStream(fileName));
            num++;
          }
          formHeaders = form.getHeaders();
          axios.post(`${ADDRESS.homeinfo.ghost.protocol}://${ADDRESS.homeinfo.ghost.host}:${String(ADDRESS.homeinfo.ghost.file.port)}/file?hash=${encrypted}&uragenGhostFinalRandomAccessKeyArraySubwayHomeLiaisonStyle=a19OyoZjf9xQJXykapple3kE5ySgBW39IjxQJXyk3homeliaisonkE5uf9uuuySgBW3ULXHF1CdjxGGPCQJsubwayXyk3kE5ySgBW3f9y2Y2lotionpuk0dQF9ruhcs`, form, {
            headers: { ...formHeaders },
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
          }).then(function (response) {
            resolve(response);
          }).catch(function (error) {
            reject(error);
          });
        });
        cipher.write(ADDRESS.s3info.boto3.key);
        cipher.end();
      }
    });
  });
}

Mother.prototype.ghostFileList = function (dir) {
  const shell = require('shelljs');
  const ADDRESS = require(`${process.cwd()}/apps/infoObj.js`);
  const crypto = require('crypto');
  const algorithm = 'aes-192-cbc';
  let url, order, data;
  let ddns, port, protocol;
  data = { target: dir };
  ddns = ADDRESS.homeinfo.ghost.ddns;
  port = ADDRESS.homeinfo.ghost.file.port;
  protocol = ADDRESS.homeinfo.ghost.protocol;
  return new Promise(function (resolve, reject) {
    crypto.scrypt("homeliaison", 'salt', 24, function (err, key) {
      if (err) {
        reject(err);
      } else {
        const cipher = crypto.createCipheriv(algorithm, key, Buffer.alloc(16, 0));
        let encrypted = '';
        cipher.setEncoding('hex');
        cipher.on('data', function (chunk) {
          encrypted += chunk;
        });
        cipher.on('end', function () {
          data.hash = encrypted;
          data.uragenGhostFinalRandomAccessKeyArraySubwayHomeLiaisonStyle = "a19OyoZjf9xQJXykapple3kE5ySgBW39IjxQJXyk3homeliaisonkE5uf9uuuySgBW3ULXHF1CdjxGGPCQJsubwayXyk3kE5ySgBW3f9y2Y2lotionpuk0dQF9ruhcs";
          url = `${protocol}://${ddns}:${String(port)}/list`;
          order = "curl -d '" + JSON.stringify(data) + "' -H \"Content-Type: application/json\" -X POST " + url;
          shell.exec(order, { silent: true, async: true }, function (err, stdout, stderr) {
            if (err) {
              reject(err);
            } else {
              if (/^[\[\{]/.test(stdout.trim())) {
                resolve(JSON.parse(stdout.trim()));
              } else {
                resolve(stdout.trim());
              }
            }
          });
        });
        cipher.write(ADDRESS.s3info.boto3.key);
        cipher.end();
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

Mother.prototype.cryptoString = function (password, string) {
  const crypto = require('crypto');
  const algorithm = 'aes-192-cbc';
  return new Promise(function (resolve, reject) {
    crypto.scrypt(password, 'salt', 24, function (err, key) {
      if (err) {
        reject(err);
      } else {
        const cipher = crypto.createCipheriv(algorithm, key, Buffer.alloc(16, 0));
        let encrypted = '';
        cipher.setEncoding('hex');
        cipher.on('data', function (chunk) {
          encrypted += chunk;
        });
        cipher.on('end', function () {
          resolve(encrypted);
        });
        cipher.write(string);
        cipher.end();
      }
    });
  });
}

Mother.prototype.decryptoHash = function (password, hash) {
  const crypto = require('crypto');
  const algorithm = 'aes-192-cbc';
  return new Promise(function (resolve, reject) {
    crypto.scrypt(password, 'salt', 24, function (err, key) {
      if (err) {
        reject(err);
      } else {
        const decipher = crypto.createDecipheriv(algorithm, key, Buffer.alloc(16, 0));
        let decrypted = '';
        decipher.on('readable', function () {
          while (null !== (chunk = decipher.read())) {
            decrypted += chunk.toString('utf8');
          }
        });
        decipher.on('end', function () {
          resolve(decrypted);
        });
        decipher.write(hash, 'hex');
        decipher.end();
      }
    });
  });
}

Mother.prototype.mysqlQuery = function (query, option = { local: false, front: true }) {
  const mysql = require('mysql2');
  const ADDRESS = require(`${process.cwd()}/apps/infoObj.js`);
  const mysqlStandard = ADDRESS["frontinfo"];
  let host;
  if (option.local === true) {
    host = "localhost";
  } else if (option.front === true) {
    host = ADDRESS["frontinfo"]["host"];
  } else {
    host = ADDRESS["frontinfo"]["host"];
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
            resolve("done");
          }
        } else {
          resolve("done");
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
  const { exec } = require('child_process');
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

Mother.prototype.dateToString = function (date, detail = false) {
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

Mother.prototype.stringToDate = function (str) {
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

Mother.prototype.ipParsing = function (ip) {
  if (typeof ip !== "string") {
    throw new Error("input must be ip");
  }
  ip = ip.trim().replace(/[^0-9\.]/gi, '');
  if (ip.replace(/[0-9\.]/g, '') !== '') {
    return new Promise(function (resolve, reject) {
      resolve(null);
    });
  }
  const axios = require('axios');
  let url;

  url = "https://ipinfo.io";
  url += "/" + ip;

  return new Promise(function (resolve, reject) {
    axios.get(url).then(function (response) {
      if (response.status === 200 && typeof response.data === "object") {
        if (response.data.readme !== undefined) {
          delete response.data.readme;
        }
        resolve(response.data);
      }
    }).catch(function (error) {
      reject(error);
    });
  });
}

module.exports = Mother;
