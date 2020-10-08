const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

const OfficePolling = function () {
  const address = require(`${process.cwd()}/apps/infoObj.js`);
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  this.mother = new Mother();
  this.dir = process.cwd() + "/apps/officePolling";
  this.injectionDir = `${this.dir}/injection`;
  this.tong = `${this.dir}/tong`;
  this.injections = [];
  this.targetId = "none";
  this.cloudHost = { inner: address.pollinginfo.ip.inner, outer: address.pollinginfo.host, port: 3000 };
  this.bridge = { home: address.homeinfo.polling.inner, office: address.officeinfo.polling.inner, cloud: this.cloudHost.inner };
  this.server = null;
  this.stack = 0;
}

OfficePolling.prototype.postParser = function (str) {
  let newObj = {}, tempArr, tempArr2;
  tempArr = str.split('&');
  for (let i of tempArr) {
    tempArr2 = i.split('=');
    newObj[tempArr2[0]] = this.execParser(tempArr2[1]);
  }
  return newObj;
}

OfficePolling.prototype.execParser = function (str) {
  let newStr = '';
  newStr = str.replace(/__equal__/g, '=');
  newStr = newStr.replace(/__empersend__/g, '&');
  return newStr;
}

OfficePolling.prototype.execFilter = function (str) {
  for (let i = 0; i < 5; i++) {
    str = str.replace(/=/g, "__equal__").replace(/&/g, "__empersend__");
  }
  return str;
}

OfficePolling.prototype.getId = function (str) {
  let callbackId = str.slice(0, (str.search(/[0-9]_/g) + 1));
  return Number(callbackId);
}

OfficePolling.prototype.readSort = async function () {
  const instance = this;
  try {
    let callbacks = await this.mother.fileSystem(`readDir`, [ this.injectionDir ]);
    for (let i of callbacks) { if (i !== `.DS_Store` && i !== `module`) {
      if (isNaN(this.getId(i))) { throw new Error(`invaild callbacks list`); }
      this.injections.push(i);
    }}
    this.injections.sort((a, b) => { return instance.getId(b) - instance.getId(a); });
  } catch (e) {
    console.log(e);
  }
}

OfficePolling.prototype.setInjection = async function () {
  const instance = this;
  try {
    await this.readSort();
    let target = this.injections[0];
    if (this.targetId !== "none") {
      this.injections.sort((a, b) => { return instance.getId(b) - instance.getId(a); });
      target = this.injections[Number(this.targetId)];
    }
    let callbackString = await this.mother.fileSystem(`readString`, [ this.injectionDir + "/" + target ]);
    return callbackString;
  } catch (e) {
    console.log(e);
  }
}

OfficePolling.prototype.bridgeInjection = async function (to = "office") {
  const instance = this;
  let from;
  try {
    let options = {}
    this.injectionDir = `${this.dir}/exec`;
    options.exec = this.execFilter(await this.setInjection());
    this.injections = [];
    this.injectionDir = `${this.dir}/injection`;
    options.func = this.execFilter(await this.setInjection());
    options.to = to;
    options.method = "post";
    console.log(options);
    const { body } = await this.mother.rawRequestSystem(this.cloudHost.outer, 3000, {}, options);
    console.log(body);
  } catch (e) {
    console.log(e);
  }
}

OfficePolling.prototype.bridgeCreate = function () {
  const instance = this;
  return async function () {
    try {
      const { body } = await instance.mother.rawRequestSystem(instance.cloudHost.outer, 3000);
      const { exec, func } = JSON.parse(body);

      let execfunc, execfuncReturn, tong;
      if (func !== "__nothing__") {
        tong = await instance.mother.fileSystem('readDir', [ instance.dir + "/tong" ]);
        if (tong.length === 0) {
          await instance.mother.fileSystem('write', [ instance.dir + "/tong/" + "1_func" + instance.mother.todayMaker() + ".js", instance.execParser(func) ]);
        } else {
          tong.sort((a, b) => { return instance.getId(b) - instance.getId(a); });
          await instance.mother.fileSystem('write', [ instance.dir + "/tong/" + String(instance.getId(tong[0]) + 1) + "_func" + instance.mother.todayMaker() + ".js", instance.execParser(func) ]);
        }
      }
      if (exec !== "__nothing__") {
        execfunc = new AsyncFunction("Mother", instance.execParser(exec));
        execfuncReturn = await execfunc(instance.mother);
        console.log(execfuncReturn);
      } else {
        console.log("nothing");
      }

      let callback = instance.bridgeCreate();
      callback();

    } catch (e) {
      console.log(e);
    }
  }
}

OfficePolling.prototype.bridgeServer = function () {
  const instance = this;
  const { fileSystem, shell, slack_bot, shellLink, todayMaker } = this.mother;
  const url = require("url");
  return async function (req, res) {
    const pathname = url.parse(req.url).pathname;
    try {
      let from = 'office', to = '', tempRegexp;
      let stackString = '', execString = '', postData = '', stack;
      let stackBoo = false, execBoo = false;

      //GET
      if (req.method === "GET") {

        let resultObj = {};

        stack = await fileSystem('readDir', [ instance.dir + "/stack" ]);

        execString = "__nothing__";
        stackString = "__nothing__";

        tempRegexp = new RegExp('^' + from + "_exec");
        for (let i of stack) { if (tempRegexp.test(i)) {
          execBoo = true;
          execString += await fileSystem('readString', [ instance.dir + "/stack/" + i ]);
          execString += "\n\n";
          shell.exec("rm -rf " + shellLink(instance.dir) + "/stack/" + i);
        }}
        tempRegexp = new RegExp('^' + from + "_func");
        for (let i of stack) { if (tempRegexp.test(i)) {
          stackBoo = true;
          stackString += await fileSystem('readString', [ instance.dir + "/stack/" + i ]);
          stackString += "\n\n";
          shell.exec("rm -rf " + shellLink(instance.dir) + "/stack/" + i);
        }}

        if (execBoo) {
          resultObj.exec = execString.slice(11);
        } else {
          resultObj.exec = execString;
        }

        if (stackBoo) {
          resultObj.func = stackString.slice(11);
        } else {
          resultObj.func = stackString;
        }

        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(JSON.stringify(resultObj));

      //POST - exec and func
      } else if (req.method === "POST") {

        req.on('data', function (chunk) {
          postData += chunk;
        });

        req.on('end', async function () {
          let execfunc, execfuncReturn = "no execute";
          let resultObj = instance.postParser(postData);
          if (resultObj.to === undefined) {
            resultObj.to = "home";
          }
          if (resultObj.exec !== undefined) {
            await instance.mother.fileSystem('write', [ instance.dir + "/stack/" + resultObj.to + "_exec" + instance.mother.todayMaker() + ".js", instance.execParser(resultObj.exec) ]);
          }
          if (resultObj.func !== undefined) {
            await instance.mother.fileSystem('write', [ instance.dir + "/stack/" + resultObj.to + "_func" + instance.mother.todayMaker() + ".js", instance.execParser(resultObj.func) ]);
          }
          res.writeHead(200, { "Content-Type": "text/plain" });
          res.end(execfuncReturn);
        });

      }
    } catch (e) {
      console.log(e);
    }
  }
}

OfficePolling.prototype.serverLaunching = async function () {
  const { createServer } = require('http');
  try {
    const server = createServer(this.bridgeServer());
    server.listen(this.cloudHost.port, this.cloudHost.inner, () => {
      console.log(`Server running`);
    });
  } catch (e) {
    console.log(e);
  }
}

OfficePolling.prototype.receiveLaunching = async function () {
  try {
    let bridge = this.bridgeCreate();
    bridge();
  } catch (e) {
    console.log(e);
  }
}

OfficePolling.prototype.injectionLaunching = async function (to = "office") {
  try {
    await this.bridgeInjection(to);
  } catch (e) {
    console.log(e);
  }
}

module.exports = OfficePolling;
