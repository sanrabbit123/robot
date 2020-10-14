const Mother = function () {
  const infoObj = require(process.cwd() + "/apps/infoObj.js");

  //mongo
  this.mongoinfoObj = infoObj.mongoinfo;
  this.bridgeinfoObj = infoObj.bridgeinfo;
  this.mongoinfo = "mongodb://" + infoObj.mongoinfo.user + ':' + infoObj.mongoinfo.password + '@' + infoObj.mongoinfo.host + ':' + String(infoObj.mongoinfo.port) + "/admin";
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

Mother.prototype.todayMaker = function () {
  const today = new Date();
  let dayString = '';
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
  return dayString;
}

Mother.prototype.fileSystem = function (sw, arr) {
  const fs = require('fs');
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


Mother.prototype.rawRequestSystem = function (to, port = 80, header = {}, postData = {}) {
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
              resolve(output.stdout);
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
          resolve(output.stdout);
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

module.exports = Mother;
