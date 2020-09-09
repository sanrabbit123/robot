const Mother = function () {
	const infoObj = require(process.cwd() + "/apps/infoObj.js");

	//mongo
	this.mongoinfoObj = infoObj.mongoinfo;
	this.bridgeinfoObj = infoObj.bridgeinfo;
	this.mongoinfo = "mongodb://" + infoObj.mongoinfo.user + ':' + infoObj.mongoinfo.password + '@' + infoObj.mongoinfo.host + ':' + String(infoObj.mongoinfo.port) + "/admin";
	this.bridgeinfo = "mongodb://" + infoObj.bridgeinfo.user + ':' + infoObj.bridgeinfo.password + '@' + infoObj.bridgeinfo.host + ':' + String(infoObj.bridgeinfo.port) + "/admin";
	this.mongo = require("mongodb").MongoClient;

	//mysql
	this.myinfo = {
		host: infoObj.myinfo.host,
		user: infoObj.myinfo.user,
		password: infoObj.myinfo.password,
		port: infoObj.myinfo.port,
		database: infoObj.myinfo.database
	};
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

Mother.prototype.tempDelete = async function (dir = null) {
	let targetDir, tempDir;
	if (dir === null) {
		targetDir = this.tempDir;
	} else {
		targetDir = dir;
	}
	tempDir = await this.fileSystem(`readDir`, [ targetDir ]);
	for (let i = 0; i < tempDir.length; i++) { if (tempDir[i] !== `.DS_Store`) {
		this.shell.exec(`rm -rf ${this.shellLink(targetDir)}/${tempDir[i]};`);
	}}
}

Mother.prototype.todayMaker = function () {
	let today = new Date();
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
		case "analytics":
			const GoogleAnalytics = require(process.cwd() + "/apps/googleAPIs/googleAnalytics.js");
			app = new GoogleAnalytics();
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
      [
        "@babel/preset-env",
        { targets: { browsers : [ "last 2 versions", "ie >= 11" ] } },
      ],
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

Mother.prototype.appleScript = async function (name, contents, dir = null, clean = true, silent = false) {
	try {
		let targetDir;
		if (dir === null) {
			targetDir = this.tempDir;
		} else {
			targetDir = dir;
		}
		if (clean) { await this.tempDelete(targetDir); }
    await this.fileSystem(`write`, [ `${targetDir}/${name}.applescript`, contents ]);
    let output = this.shell.exec(`osascript ${this.shellLink(targetDir)}/${name}.applescript`, { silent: silent });
		if (clean) { await this.tempDelete(targetDir); }
    return output.stdout;
	} catch (e) {
		console.log(e);
	}
}

Mother.prototype.returnFriendsPath = function (friend) {
	const segment = '/';

	let target = '';
	if (/ghos/gi.test(friend)) {
		target = "ghost";
	} else if (/rabb/gi.test(friend)) {
		target = "rabbit";
	} else if (/robo/gi.test(friend)) {
		target = "robot";
	} else {
		throw new Error("invalid friend name");
	}

	let totalRobotPath = '';
	let pathString = '';
	let pathDirString = '';

	let pathArr = process.cwd().split(segment);
	pathArr.pop();
	totalRobotPath = pathArr.join(segment);
	pathString = pathArr.join(segment) + "/" + target + "/" + target + ".js";
	pathDirString = pathArr.join(segment) + "/" + target;
	return { pathDirString: pathDirString, pathString: pathString, totalRobotPath: totalRobotPath }
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

Mother.prototype.callFriends = async function (friend, parameters = [], option = { exec: true }) {
	try {
		if (option.exec === undefined) {
			throw new Error("invalid option : option => { exec: true/false }");
		}

		//make friend & path
		let target = '';
		if (/ghos/gi.test(friend)) {
			target = "ghost";
		} else if (/rabb/gi.test(friend)) {
			target = "rabbit";
		} else if (/robo/gi.test(friend)) {
			target = "robot";
		} else {
			throw new Error("invalid friend name");
		}
		const { pathDirString, pathString, totalRobotPath } = this.returnFriendsPath(friend);

		//check friend
		let totalRobotStatus = await this.fileSystem(`readDir`, [ totalRobotPath ]);
		let totalRobotBoo = false;
		for (let i of totalRobotStatus) {
			if (i === target) { totalRobotBoo = true; }
		}
		if (!totalRobotBoo) {
			throw new Error("There is no friend : " + target);
		}

		//make parameter
		/** friend self dir path call => <%self%> **/
		let renderedParameters = [];
		if (parameters.length > 0) {
			for (let i of parameters) {
				while (/<%self%>/.test(i)) {
					i = i.replace(/<%self%>/, this.shellLink(pathDirString));
				}
				if (/\//g.test(i)) {
					renderedParameters.push(this.shellLink(i));
				} else if (/ /g.test(i)) {
					renderedParameters.push("'" + i.replace(/^'/, '').replace(/'$/, '').replace(/'/g, '') + "'");
				} else {
					renderedParameters.push(i);
				}
			}
		}

		//execute
		let outPut = {};
		outPut.stdout = "no Execution";
		outPut.stderr = '';
		if (option.exec) {
			outPut = this.shell.exec(`node ${this.shellLink(pathString)} ${renderedParameters.join(' ')};`, { silent: true });
		}
		if (outPut.stderr !== '') {
			throw new Error("friends execute error : " + outPut.stderr);
		}
		if (/^<%json%>/.test(outPut.stdout)) {
			outPut.stdout = outPut.stdout.replace(/\n$/, '');
			outPut.stdout = JSON.parse(outPut.stdout.slice(outPut.stdout.search(/[{\[]/)).trim());
		}

		return { dir: pathDirString, path: pathString, shell: this.shellLink(pathString), stdout: outPut.stdout };
	} catch (e) {
		console.log(e);
	}
}

module.exports = Mother;
