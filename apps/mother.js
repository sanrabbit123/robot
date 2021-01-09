const Mother = function () {
  const infoObj = require(process.cwd() + "/apps/infoObj.js");

  //mongo
  this.mongoinfoObj = infoObj.mongoinfo;
  this.bridgeinfoObj = infoObj.bridgeinfo;
  this.mongoinfo = "mongodb://" + infoObj.mongoinfo.user + ':' + infoObj.mongoinfo.password + '@' + infoObj.mongoinfo.host + ':' + String(infoObj.mongoinfo.port) + "/admin";
  this.mongolocalinfo = "mongodb://" + infoObj.mongoinfo.user + ':' + infoObj.mongoinfo.password + '@' + "127.0.0.1" + ':' + String(infoObj.mongoinfo.port) + "/admin";
  this.mongoconsoleinfo = "mongodb://" + infoObj.backinfo.user + ':' + infoObj.backinfo.password + '@' + infoObj.backinfo.host + ':' + String(infoObj.backinfo.port) + "/admin";
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
  this.mysql = require("mysql2");

  //shell
  this.shell = require("shelljs");

  //slack
  const { WebClient } = require('@slack/web-api');
  this.slack_bot = new WebClient(`xoxb-717757271335-1044856512278-hQ42lRO25cRLHQ3Pd7HjMP6v`);

  //temp
  this.tempDir = `${process.cwd()}/temp`;
}

Mother.prototype.shellLink = function (str) {
  let arr = str.split('/');
  let newStr = '';
  for (let i of arr) {
    if (!/ /g.test(i)) {
      newStr += i + '/';
    } else if (!/^'/.test(i) && !/'$/.test(i)) {
      newStr += "'" + i + "'" + '/';
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
      if (!/ /g.test(i)) {
        newStr += i + '/';
      } else if (!/^'/.test(i) && !/'$/.test(i)) {
        newStr += "'" + i + "'" + '/';
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
        fs.readFile(arr[0], (err, data) => {
          if (err) { reject(err); }
          else { resolve(data); }
        });
      });
      break;
    case "readString":
      return new Promise(function (resolve, reject) {
        fs.readFile(arr[0], "utf8", (err, data) => {
          if (err) { reject(err); }
          else { resolve(data); }
        });
      });
      break;
    case "readBinary":
      return new Promise(function (resolve, reject) {
        fs.readFile(arr[0], "binary", (err, data) => {
          if (err) { reject(err); }
          else { resolve(data); }
        });
      });
      break;
    case "readDir":
      return new Promise(function (resolve, reject) {
        fs.readdir(arr[0], function (err, filelist) {
          if (err) { reject(err); }
          else { resolve(filelist); }
        });
      });
      break;
    case "write":
      return new Promise(function (resolve, reject) {
        fs.writeFile(arr[0], arr[1], "utf8", (err) => {
          if (err) { reject(err); }
          else { resolve("success"); }
        });
      });
      break;
    case "writeBinary":
      return new Promise(function (resolve, reject) {
        fs.writeFile(arr[0], arr[1], "binary", (err) => {
          if (err) { reject(err); }
          else { resolve("success"); }
        });
      });
      break;
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

  let method = "get";
  let dataKeys = Object.keys(data);
  let configKeys = Object.keys(config);
  let dataBoo = false;
  let configBoo = false;
  let options;

  if (dataKeys.length === 0 && configKeys.length === 0) {
    method = "get";
    data = {};
    config = {};
    dataBoo = false;
    configBoo = false;
  } else if (dataKeys.length === 0 && configKeys.length > 0) {
    method = "get";
    config = data;
    dataBoo = false;
    configBoo = true;
  } else if (dataKeys.length > 0) {
    method = "post";
    dataBoo = true;
    configBoo = (configKeys.length === 0) ? false : true;
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
      let form = new FormData();
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
        axios.post(url, form, { ...config, ...({ headers: { ...formHeaders } }) }).then(function (response) {
          resolve(response);
        }).catch(function (error) {
          reject(error);
        });
      }

    }
  });
}


Mother.prototype.rawRequestSystem = function (to, port = 80, header = {}, postData = {}, customMethod = "GET") {
  let meth = "GET";
  let postKeys = Object.keys(postData);
  if (postKeys.length > 0) {
    meth = "POST";
  }
  let target;
  const http = require("http");
  if (/^https:\/\//.test(to)) {
    target = to.slice(8);
  } else if (/^http:\/\//.test(to)) {
    target = to.slice(7);
  } else {
    target = to;
  }
  let pathArr = target.split('/');
  let pathString = '/';
  for (let i = 0; i < pathArr.length; i++) { if (i !== 0) {
    pathString += pathArr[i] + '/';
  }}
  pathString = pathString.slice(0, -1);
  if (customMethod !== "GET") {
    meth = customMethod;
  }
  let options = {
    hostname: pathArr[0],
    port: port,
    path: pathString,
    method: meth
  }
  options.header = {};
  let postString = '';
  if (/POST/gi.test(meth)) {
    for (let i in postData) {
      postString += i.replace(/=/g, '').replace(/&/g, '');
      postString += '=';
      postString += postData[i].replace(/=/g, '').replace(/&/g, '');
      postString += '&';
    }
    postString = postString.slice(0, -1);
    options.header['Content-Type'] = 'application/x-www-form-urlencoded';
    options.header['Content-Length'] = Buffer.byteLength(postString);
  }
  for (let i in header) {
    options.header[i] = header[i];
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
    if (/POST/gi.test(meth)) {
      req.write(postString);
    }
    req.end();
  });
}

Mother.prototype.headRequest = function (to, port = 80, header = {}) {
  let target;
  const http = require("http");
  if (/^https:\/\//.test(to)) {
    target = to.slice(8);
  } else if (/^http:\/\//.test(to)) {
    target = to.slice(7);
  } else {
    target = to;
  }
  let pathArr = target.split('/');
  let pathString = '/';
  for (let i = 0; i < pathArr.length; i++) { if (i !== 0) {
    pathString += pathArr[i] + '/';
  }}
  pathString = pathString.slice(0, -1);
  let options = {
    hostname: pathArr[0],
    port: port,
    path: pathString,
    method: "HEAD"
  }
  options.header = {};
  for (let i in header) {
    options.header[i] = header[i];
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

Mother.prototype.binaryRequest = function (to, port = 80) {
  const http = require("http");
  let target, tempArr;
  let targetHost, targetPath;

  if (/^https:\/\//.test(to)) {
    target = to.slice(8);
  } else if (/^http:\/\//.test(to)) {
    target = to.slice(7);
  } else {
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

Mother.prototype.appleScript = function (name, contents, dir = null, clean = true, silent = false) {
  const fs = require('fs');
  const shell = require('shelljs');
  const shellLink = function (str) {
    let arr = str.split('/');
    let newStr = '';
    for (let i of arr) {
      if (!/ /g.test(i)) {
        newStr += i + '/';
      } else if (!/^'/.test(i) && !/'$/.test(i)) {
        newStr += "'" + i + "'" + '/';
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
          for (let i = 0; i < filelist.length; i++) { if (filelist[i] !== `.DS_Store`) {
            shell.exec(`rm -rf ${shellLink(targetDir)}/${filelist[i]};`);
          }}
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
    if (!/ /g.test(i)) {
      targetLink += i + '/';
    } else if (!/^'/.test(i) && !/'$/.test(i)) {
      targetLink += "'" + i + "'" + '/';
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

Mother.prototype.ghostPath = function () {
  let robotPath, robotPathArr;
  robotPath = process.cwd();
  robotPathArr = robotPath.split("/");
  robotPathArr.pop();
  robotPathArr.push("ghost");
  return robotPathArr.join("/");
}

Mother.prototype.sendJandi = function (mode, msg) {
  if (mode === undefined && msg === undefined) {
    mode = "request";
    msg = "default message";
  } else if (mode !== undefined && msg === undefined) {
    msg = mode;
    mode = "request";
  }
  const axios = require('axios');
  let url;
  switch (mode) {
    case "request":
      url = "https://wh.jandi.com/connect-api/webhook/20614472/94b9b85183e946b8faf4623db850bca0";
      break;
    case "file":
      url = "https://wh.jandi.com/connect-api/webhook/20614472/9cc255e8929afaf0f9f0c2643a1e1756";
      break;
    case "error":
      url = "https://wh.jandi.com/connect-api/webhook/20614472/ae10cca5a209a08e6649635d2648255b";
      break;
    default:
      url = "https://wh.jandi.com/connect-api/webhook/20614472/8919ae324cce2fc3616398b5084d9fee";
  }
  return new Promise(function (resolve, reject) {
    axios.post(url, { body: msg }, { headers: { "Accept": "application/vnd.tosslab.jandi-v2+json", "Content-Type": "application/json" } }).then(function (response) {
      resolve(response);
    }).catch(function (error) {
      reject(error);
    });
  });
}

Mother.prototype.ipCheck = function () {
  const axios = require(`axios`);
  const ADDRESS = require(`${process.cwd()}/apps/infoObj.js`);
  const keys = Object.keys(ADDRESS);
  const values = Object.values(ADDRESS);
  return new Promise(function(resolve, reject) {
    axios.get("https://icanhazip.com").then(function (response) {
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
    if (!/ /g.test(i)) {
      targetLink += i + '/';
    } else if (!/^'/.test(i) && !/'$/.test(i)) {
      targetLink += "'" + i + "'" + '/';
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

Mother.prototype.searchDir = function (targetDirectory) {
  const fs = require(`fs`);
  const shell = require(`shelljs`);

  let target = process.cwd() + "/apps/mother.py";
  let targetLink, targetArr;

  //shellLink and make target path
  targetLink = '';
  targetArr = target.split('/');
  for (let i of targetArr) {
    if (!/ /g.test(i)) {
      targetLink += i + '/';
    } else if (!/^'/.test(i) && !/'$/.test(i)) {
      targetLink += "'" + i + "'" + '/';
    } else {
      targetLink += i + '/';
    }
  }
  targetLink = targetLink.slice(0, -1);

  //set bridge
  const bridgeFile = process.cwd() + "/temp/motherPythonBridge.json";
  const bridgeContents = { directory: targetDirectory };

  return new Promise(function(resolve, reject) {
    fs.writeFile(bridgeFile, JSON.stringify(bridgeContents, null, 2), "utf8", function (err) {
      if (err) {
        reject(err);
      }
      let order, child;
      let result, jsonRaw, json;
      order = `python3 ${targetLink} searchDir`;
      child = shell.exec(order, { silent: true });
      jsonRaw = child.stdout.replace(/\n$/, '');
      json = JSON.parse(jsonRaw);
      result = json;
      resolve(result);
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
  let tempObj, tempArr;

  if (year === "today" || (year === undefined && month === undefined)) {
    tempObj = new Date();
    year = tempObj.getFullYear();
    month = tempObj.getMonth();
  } else if (typeof year === "string" && month === undefined && /\-/g.test(year)) {
    tempArr = year.split("-");
    tempObj = new Date(Number(tempArr[0]), Number(tempArr[1].replace(/^0/, '')) - 1, Number(tempArr[2].replace(/^0/, '')));
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

module.exports = Mother;
