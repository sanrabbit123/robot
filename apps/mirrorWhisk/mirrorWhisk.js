const MirrorWhisk = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  const BillMaker = require(`${process.cwd()}/apps/billMaker/billMaker.js`);
  this.address = require(`${process.cwd()}/apps/infoObj.js`);
  this.mother = new Mother();
  this.back = new BackMaker();
  this.bill = new BillMaker();
  this.dir = process.cwd() + "/apps/mirrorWhisk";
  this.workList = require(this.dir + "/list/workList.js");
}

MirrorWhisk.prototype.scriptReady = async function () {
  const instance = this;
  const indent = 2;
  const address = this.address;
  const { fileSystem } = this.mother;
  const { workList } = this;
  const pythonAppName = "mirrorWhisk.py";
  let script, pythonArr, pythonScript, url;
  try {

    script = `
    import os
    import sys
    import json
    import re
    import time
    sys.path.append("${(process.cwd() + "/python_modules").replace(/"/g, "'")}")
    import subprocess
    import aiohttp
    import asyncio
    from apscheduler.schedulers.asyncio import AsyncIOScheduler`;

    pythonScript = script.split("\n").map((s) => { return s.trim(); }).filter((s) => { return s !== ''; }).join("\n") + "\n\n";

    for (let { method, name, target, data, headers, minute } of workList) {
      url = "https://" + address.mirrorinfo.host + ":" + String(3000) + target
      if (method === "get") {
        pythonArr = [
          `async def ${name}():`,
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
          `async def ${name}():`,
          `    async with aiohttp.ClientSession() as session:`,
          `        async with session.post('${url.replace(/\'/g, '"')}', json=${JSON.stringify(data)}, headers=${JSON.stringify(headers)}) as response:`,
          `            resText = await response.text()`,
          `            print(resText)`,
          ``,
        ];
        pythonScript += pythonArr.join('\n');
      }
    }

    pythonScript += "\n";
    pythonScript += `scheduler = AsyncIOScheduler()`;
    for (let { method, name, target, data, headers, minute } of workList) {
      pythonScript += `\n`;
      pythonScript += `scheduler.add_job(${name}, 'interval', minutes=${String(minute)})`;
    }
    pythonScript += `\n`;
    pythonScript += `scheduler.start()`;
    pythonScript += `\n`;
    pythonScript += `try:`;
    pythonScript += `\n`;
    pythonScript += `    asyncio.get_event_loop().run_forever()`;
    pythonScript += `\n`;
    pythonScript += `except (KeyboardInterrupt, SystemExit):`;
    pythonScript += `\n`;
    pythonScript += `    pass`;

    await fileSystem(`write`, [ `${this.dir}/${pythonAppName}`, pythonScript ]);

    return `${this.dir}/${pythonAppName}`;

  } catch (e) {
    console.log(e);
  }
}

MirrorWhisk.prototype.mirrorServerLaunching = async function () {
  const instance = this;
  const { fileSystem, shell, shellLink, mongo, mongoinfo, mongolocalinfo, mongoconsoleinfo, mongopythoninfo } = this.mother;
  const https = require("https");
  const express = require("express");
  const app = express();
  const multer = require("multer");
  const multiForms = multer();
  const useragent = require("express-useragent");

  app.use(useragent.express());
  app.use(express.json({ limit : "50mb" }));
  app.use(multiForms.array());
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  try {
    await this.back.setInfoObj({ getMode: false });

    const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
    const MONGOLOCALC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
    const MONGOCONSOLEC = new mongo(mongoconsoleinfo, { useUnifiedTopology: true });
    const MONGOPYTHONC = new mongo(mongopythoninfo, { useUnifiedTopology: true });

    await MONGOC.connect();
    await MONGOLOCALC.connect();
    await MONGOCONSOLEC.connect();
    await MONGOPYTHONC.connect();
    console.log(`set db`);

    //set kakao
    const KakaoTalk = require(`${process.cwd()}/apps/kakaoTalk/kakaoTalk.js`);
    const kakaoInstance = new KakaoTalk();
    await kakaoInstance.ready();

    //set human
    const HumanPacket = require(`${process.cwd()}/apps/humanPacket/humanPacket.js`);
    const humanInstance = new HumanPacket();

    //set pem key
    let pems, pemsLink;
    let certDir, keyDir, caDir;

    pems = {};
    pemsLink = process.cwd() + "/pems/" + this.address.mirrorinfo.host;

    certDir = await fileSystem(`readDir`, [ `${pemsLink}/cert` ]);
    keyDir = await fileSystem(`readDir`, [ `${pemsLink}/key` ]);
    caDir = await fileSystem(`readDir`, [ `${pemsLink}/ca` ]);

    for (let i of certDir) {
      if (i !== `.DS_Store`) {
        pems.cert = await fileSystem(`read`, [ `${pemsLink}/cert/${i}` ]);
      }
    }
    for (let i of keyDir) {
      if (i !== `.DS_Store`) {
        pems.key = await fileSystem(`read`, [ `${pemsLink}/key/${i}` ]);
      }
    }
    pems.ca = [];
    for (let i of caDir) {
      if (i !== `.DS_Store`) {
        pems.ca.push(await fileSystem(`read`, [ `${pemsLink}/ca/${i}` ]));
      }
    }
    pems.allowHTTP1 = true;

    //set router
    const MirrorRouter = require(`${this.dir}/router/mirrorRouter.js`);
    const router = new MirrorRouter(MONGOC, MONGOLOCALC, MONGOCONSOLEC, MONGOPYTHONC, kakaoInstance, humanInstance);
    const rouObj = router.getAll();
    for (let obj of rouObj.get) {
      app.get(obj.link, obj.func);
    }
    for (let obj of rouObj.post) {
      app.post(obj.link, obj.func);
    }
    console.log(`set router`);

    //server on
    https.createServer(pems, app).listen(3000, () => {
      console.log(``);
      console.log(`\x1b[33m%s\x1b[0m`, `Server running`);
    });

    //set cron
    const cronScript = await this.scriptReady();
    shell.exec(`python3 ${shellLink(cronScript)}`, { async: true });
    console.log("\x1b[32m%s\x1b[0m", `Cron running`);

  } catch (e) {
    console.log(e);
  }
}

module.exports = MirrorWhisk;
