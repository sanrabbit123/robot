const RequestWhisk = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  this.mother = new Mother();
  this.back = new BackMaker();
  this.dir = process.cwd() + "/apps/requestWhisk";
}

RequestWhisk.prototype.scriptReady = async function (method, url, data, headers, interval) {
  if (typeof method === "object") {
    if (method.method === undefined || method.url === undefined || method.data === undefined || method.headers === undefined || method.interval === undefined) {
      throw new Error("invaild object input => must be { method, url, data, headers, interval }");
    } else {
      url = method.url;
      data = method.data;
      headers = method.headers;
      interval = method.interval;
      method = method.method;
    }
  }
  if (method !== "get" && method !== "post") {
    throw new Error("method must be 'get' or 'post'");
  }
  if (typeof url !== "string" || typeof data !== "object" || typeof headers !== "object" || typeof interval !== "number") {
    throw new Error("url must be string, data must be json, headers must be object, interval must be number");
  }
  if (method === "post" && typeof data !== "object") {
    throw new Error("data must be json");
  }
  if (!/^htt/.test(url)) {
    throw new Error("invaild url");
  }
  const instance = this;
  const { fileSystem, shell, shellLink } = this.mother;
  try {
    let pythonArr, pythonScript;

    pythonScript = "";

    pythonArr = [
      `import aiohttp`,
      `import asyncio`,
      `import json`,
      `from apscheduler.schedulers.asyncio import AsyncIOScheduler`,
      ``,
    ];
    pythonScript += pythonArr.join('\n');

    if (method === "get") {

      pythonArr = [
        `async def main():`,
        `    async with aiohttp.ClientSession() as session:`,
        `        async with session.get('${url.replace(/\'/g, '"')}') as response:`,
        `            html = await response.text()`,
        `            tong = {}`,
        `            tong["data"] = html`,
        `            print(json.dumps(tong))`,
        ``,
      ];
      pythonScript += pythonArr.join('\n');

    } else {

      headers["Content-Type"] = "application/json";
      pythonArr = [
        `async def main():`,
        `    async with aiohttp.ClientSession() as session:`,
        `        async with session.post('${url.replace(/\'/g, '"')}', json=${JSON.stringify(data)}, headers=${JSON.stringify(headers)}) as response:`,
        `            jsonResponse = await response.text()`,
        `            print(jsonResponse)`,
        ``,
      ];
      pythonScript += pythonArr.join('\n');

    }

    pythonArr = [
      `scheduler = AsyncIOScheduler()`,
      `scheduler.add_job(main, 'interval', seconds=${String(interval / 1000)})`,
      `scheduler.start()`,
      ``,
      `try:`,
      `    asyncio.get_event_loop().run_forever()`,
      `except (KeyboardInterrupt, SystemExit):`,
      `    pass`,
    ];
    pythonScript += pythonArr.join('\n');

  } catch (e) {
    console.log(e);
  }
}

RequestWhisk.protocol.requestBeating = async function () {
  const instance = this;
  const { shell, shellLink } = this.mother;
  const http = require("http");
  const express = require("express");
  const app = express();
  try {
    let requestScript;

    app.get("/", function (req, res) {
      res.send("test");
    });

    requestScript = await this.scriptReady();
    shell.exec(`python3 ${shellLink(requestScript)}`, { async: true });
    console.log(`\x1b[33m%s\x1b[0m`, `Request running`);

    http.createServer(app).listen(3000, () => {});

  } catch (e) {
    console.log(e);
  }
}

module.exports = RequestWhisk;
