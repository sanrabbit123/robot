const RequestWhisk = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  this.mother = new Mother();
  this.back = new BackMaker();
  this.dir = process.cwd() + "/apps/requestWhisk";
  this.list = [];
}

RequestWhisk.prototype.scriptReady = async function (method, url, data, headers) {
  if (typeof method === "object") {
    if (method.method === undefined || method.url === undefined || method.data === undefined || method.headers === undefined) {
      throw new Error("invaild object input => must be { method, url, data, headers, interval }");
    } else {
      url = method.url;
      data = method.data;
      headers = method.headers;
      method = method.method;
    }
  }
  if (method !== "get" && method !== "post") {
    throw new Error("method must be 'get' or 'post'");
  }
  if (typeof url !== "string" || typeof data !== "object" || typeof headers !== "object") {
    throw new Error("url must be string, data must be json, headers must be object");
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
    const modulePath = process.cwd() + "/python_modules";
    let pythonArr, pythonScript;

    pythonScript = "";

    pythonArr = [
      `import sys`,
      `sys.path.append("${modulePath.replace(/"/g, "'")}")`,
      `import aiohttp`,
      `import asyncio`,
      ``,
    ];
    pythonScript += pythonArr.join('\n');

    if (method === "get") {

      pythonArr = [
        `async def main():`,
        `    async with aiohttp.ClientSession() as session:`,
        `        async with session.get('${url.replace(/\'/g, '"')}') as response:`,
        `            resText = await response.text()`,
        `            print(resText)`,
        ``,
      ];
      pythonScript += pythonArr.join('\n');

    } else {

      headers["Content-Type"] = "application/json";
      pythonArr = [
        `async def main():`,
        `    async with aiohttp.ClientSession() as session:`,
        `        async with session.post('${url.replace(/\'/g, '"')}', json=${JSON.stringify(data)}, headers=${JSON.stringify(headers)}) as response:`,
        `            resText = await response.text()`,
        `            print(resText)`,
        ``,
      ];
      pythonScript += pythonArr.join('\n');

    }

    pythonArr = [
      `try:`,
      `    asyncio.run(main())`,
      `except (KeyboardInterrupt, SystemExit):`,
      `    pass`,
    ];
    pythonScript += pythonArr.join('\n');

    await fileSystem(`write`, [ `${this.dir}/requestWhisk.py`, pythonScript ]);

    return `${this.dir}/requestWhisk.py`;

  } catch (e) {
    console.log(e);
  }
}

RequestWhisk.prototype.requestBeating = async function (requestNumber = 0) {
  if (typeof requestNumber !== "number") {
    throw new Error("input must be number");
  }
  const instance = this;
  const mother = this.mother;
  const back = this.back;
  const { fileSystem, shell, shellLink } = mother;
  const http = require("http");
  const express = require("express");
  const app = express();
  const { spawn } = require('child_process');
  try {
    let requestScript, targetList, requestOpt;

    targetList = await fileSystem(`readDir`, [ `${this.dir}/list` ]);
    targetList = targetList.filter((a) => { return a !== `.DS_Store`; });
    targetList.sort((a, b) => { return Number(a.split('_')[0]) - Number(b.split('_')[0]); });

    this.list = [];
    for (let i of targetList) {
      this.list.push(require(`${this.dir}/list/${i}`));
    }

    requestOpt = this.list[requestNumber];
    if (requestOpt.method === undefined || requestOpt.url === undefined || requestOpt.data === undefined || requestOpt.headers === undefined || requestOpt.interval === undefined || requestOpt.callback === undefined || requestOpt.port === undefined) {
      throw new Error("invaild request object");
    }
    requestScript = await this.scriptReady(requestOpt);
    setInterval(async function () {
      shell.exec(`python3 ${shellLink(requestScript)}`, { async: true }, async function (code, stdout, stderr) {
        try {
          await requestOpt.callback(mother, back, stdout.replace(/^\n/, '').replace(/\n$/, '').trim());
        } catch (e) {
          console.log(e);
        }
      });
    }, requestOpt.interval);

    console.log(`\x1b[33m%s\x1b[0m`, `Request running`);

    http.createServer(app).listen(requestOpt.port, () => {});

  } catch (e) {
    console.log(e);
  }
}

module.exports = RequestWhisk;
