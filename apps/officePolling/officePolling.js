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

OfficePolling.prototype.pollingInjection = async function () {
  const instance = this;
  let from;
  try {
    let options = {}
    this.injectionDir = `${this.dir}/exec`;
    options.exec = this.execFilter(await this.setInjection());
    this.injections = [];
    this.injectionDir = `${this.dir}/injection`;
    options.func = this.execFilter(await this.setInjection());
    options.method = "post";
    console.log(options);
    const { body } = await this.mother.rawRequestSystem(this.cloudHost.outer + "/writeInjection", this.cloudHost.port, {}, options);
    console.log(body);
  } catch (e) {
    console.log(e);
  }
}

OfficePolling.prototype.requestPolling = function () {
  const instance = this;
  return async function () {
    try {
      const { body } = await instance.mother.rawRequestSystem(instance.cloudHost.outer + "/polling", instance.cloudHost.port);
      const { exec, func } = JSON.parse(body);

      let execfunc, execfuncReturn;
      let tong = await instance.mother.fileSystem('readDir', [ instance.dir + "/tong" ]);

      for (let i = 0; i < func.length; i++) {
        if (tong.length === 0) {
          await instance.mother.fileSystem('write', [ instance.dir + "/tong/func_0.js", instance.execParser(func[i]) ]);
        } else {
          tong.sort((a, b) => { return Number(b.replace(/[^0-9]/g, '')) - Number(a.replace(/[^0-9]/g, '')); });
          await instance.mother.fileSystem('write', [ instance.dir + "/tong/func_" + String(Number(tong[0].replace(/[^0-9]/g, '')) + 1) + ".js", instance.execParser(func[i]) ]);
        }
      }

      if (exec.length > 0) {
        for (let i = 0; i < exec.length; i++) {
          execfunc = new AsyncFunction("Mother", instance.execParser(exec[i]));
          execfuncReturn = await execfunc(instance.mother);
          console.log(execfuncReturn);
        }
      } else {
        console.log("nothing");
      }

      let callback = instance.requestPolling();
      callback();

    } catch (e) {
      console.log(e);
    }
  }
}

OfficePolling.prototype.routingCloud = function () {
  const instance = this;
  const { fileSystem, shell, slack_bot, shellLink } = this.mother;
  let funcObj = {};

  //GET - receive polling request
  funcObj.get_polling = async function (req, res) {
    try {
      let stackFolder;
      let execFileArr, stackFileArr;
      let execArr, stackArr;
      let tempRegexp;
      let resultObj = {};
      let finalResult;

      stackFolder = await fileSystem('readDir', [ instance.dir + "/stack" ]);

      execFileArr = [];
      stackFileArr = [];

      execArr = [];
      stackArr = [];

      tempRegexp = new RegExp('^exec_');
      for (let i of stackFolder) { if (tempRegexp.test(i)) {
        execFileArr.push(i);
      }}

      tempRegexp = new RegExp('^func_');
      for (let i of stackFolder) { if (tempRegexp.test(i)) {
        stackFileArr.push(i);
      }}

      execFileArr.sort((a, b) => { return Number(a.replace(/[^0-9]/g, '')) - Number(b.replace(/[^0-9]/g, '')); });
      stackFileArr.sort((a, b) => { return Number(a.replace(/[^0-9]/g, '')) - Number(b.replace(/[^0-9]/g, '')); });

      for (let i of execFileArr) {
        execArr.push(await fileSystem('readString', [ instance.dir + "/stack/" + i ]));
      }

      for (let i of stackFileArr) {
        stackArr.push(await fileSystem('readString', [ instance.dir + "/stack/" + i ]));
      }

      resultObj.exec = execArr;
      resultObj.func = stackArr;

      finalResult = JSON.stringify(resultObj);

      for (let i of stackFolder) {
        shell.exec("rm -rf " + shellLink(instance.dir) + "/stack/" + i);
      }

      res.set({
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      res.send(finalResult);

    } catch (e) {
      console.log(e);
    }
  }

  //POST - write injection files
  funcObj.post_writeInjection = async function (req, res) {
    try {
      const resultObj = req.body;
      let stackFolder;
      let execArr, stackArr;
      let tempRegexp;

      stackFolder = await fileSystem('readDir', [ instance.dir + "/stack" ]);
      execArr = [];
      stackArr = [];

      tempRegexp = new RegExp('^exec_');
      for (let i of stackFolder) { if (tempRegexp.test(i)) {
        execArr.push(i);
      }}

      tempRegexp = new RegExp('^func_');
      for (let i of stackFolder) { if (tempRegexp.test(i)) {
        stackArr.push(i);
      }}

      execArr.sort((a, b) => { return Number(a.replace(/[^0-9]/g, '')) - Number(b.replace(/[^0-9]/g, '')); });
      stackArr.sort((a, b) => { return Number(a.replace(/[^0-9]/g, '')) - Number(b.replace(/[^0-9]/g, '')); });

      if (resultObj.exec !== undefined) {
        await fileSystem('write', [ instance.dir + "/stack/" + "exec_" + String(execArr.length) + ".js", resultObj.exec ]);
      }
      if (resultObj.func !== undefined) {
        await fileSystem('write', [ instance.dir + "/stack/" + "func_" + String(stackArr.length) + ".js", resultObj.func ]);
      }

      res.set({
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      res.send("done");

    } catch (e) {
      console.log(e);
    }
  }

  //end : set router
  let resultObj = { get: [], post: [] };
  for (let i in funcObj) {
    resultObj[i.split('_')[0]].push({ link: "/" + i.split('_')[1], func: funcObj[i] });
  }
  return resultObj;
}

OfficePolling.prototype.serverLaunching = async function () {
  const instance = this;
  const http = require("http");
  const { shell, shellLink, fileSystem, mongo, bridgeinfo, mongoinfo } = this.mother;
  const { parse } = require("url");
  const express = require("express");
  const bodyParser = require("body-parser");
  const useragent = require("express-useragent");

  //express
  const app = express();
  app.use(useragent.express());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  try {
    //set router
    let get, post, router;
    if (true) {
      router = this.routingCloud();
    }
    get = router.get;
    post = router.post;
    for (let obj of get) { app.get(obj.link, obj.func); }
    for (let obj of post) { app.post(obj.link, obj.func); }

    //server on
    https.createServer(app).listen(this.cloudHost.port, this.cloudHost.inner, () => {
      console.log(`Server running`);
    });
  } catch (e) {
    console.log(e);
  }
}

OfficePolling.prototype.receiveLaunching = async function () {
  try {
    let bridge = this.requestPolling();
    bridge();
  } catch (e) {
    console.log(e);
  }
}

OfficePolling.prototype.injectionLaunching = async function () {
  try {
    await this.pollingInjection();
  } catch (e) {
    console.log(e);
  }
}

module.exports = OfficePolling;
