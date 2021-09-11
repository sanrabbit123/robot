const PythonCloud = function () {
  const ADDRESS = require(`${process.cwd()}/apps/infoObj.js`);
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  this.mother = new Mother();
  this.address = ADDRESS;
  this.dir = process.cwd() + "/apps/pythonCloud";
  this.tong = this.dir + "/tong";
  this.formidable = require('formidable');
  this.pythonApp = this.dir + "/python/app.py";
}

PythonCloud.prototype.routingCloud = function () {
  const instance = this;
  const { fileSystem, shell, slack_bot, shellLink, todayMaker, requestSystem, sleep, pythonExecute } = this.mother;
  let funcObj = {};

  //GET test
  funcObj.get_test = function (req, res) {
    res.set({
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin": '*',
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": '*',
    });
    res.send("done");
  }

  let resultObj = { get: [], post: [] };
  for (let i in funcObj) {
    resultObj[i.split('_')[0]].push({ link: "/" + i.split('_')[1], func: funcObj[i] });
  }
  return resultObj;
}

PythonCloud.prototype.serverLaunching = async function () {
  const instance = this;
  const http = require("http");
  const { shell, shellLink, fileSystem, mongo, bridgeinfo, mongoinfo, ipCheck } = this.mother;
  const { parse } = require("url");
  const express = require("express");
  const useragent = require("express-useragent");
  const app = express();
  app.use(useragent.express());

  try {
    let get, post, router;

    router = this.routingCloud();
    get = router.get;
    post = router.post;
    for (let obj of get) {
      app.get(obj.link, obj.func);
    }
    for (let obj of post) {
      app.post(obj.link, obj.func);
    }

    http.createServer(app).listen(3000, () => {
      console.log(`Server running`);
    });
  } catch (e) {
    console.log(e);
  }
}

module.exports = PythonCloud;
