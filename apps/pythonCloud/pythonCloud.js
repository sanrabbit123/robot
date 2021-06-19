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

PythonCloud.firstDo = {
  illustrator: true,
  notion: true,
  analytics: true,
};

PythonCloud.timeout = {
  illustrator: null,
  notion: null,
  analytics: null,
};

PythonCloud.running = {
  illustrator: false,
  notion: false,
  analytics: false,
};

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

  //POST - mongo to notion
  funcObj.post_toNotion = async function (req, res) {
    try {
      const form = instance.formidable({ multiples: true });
      form.parse(req, async function (err, fields, files) {
        if (!err) {
          const { cliid } = fields;
          const tongNames = [
            "notionTong",
            "analyticsTong",
          ];
          let targetTongs = [];
          let tongBoo = [];
          let tongDir;
          let targetTongList;

          for (let i of tongNames) {
            targetTongs.push(`${instance.tong}/${i}`);
            tongBoo.push(false);
          }

          //make tong
          tongDir = await fileSystem(`readDir`, [ instance.tong ]);
          for (let j = 0; j < tongNames.length; j++) {
            for (let i = 0; i < tongDir.length; i++) {
              if (tongNames[j].includes(tongDir[i])) {
                tongBoo[j] = true;
              }
            }
          }
          for (let i = 0; i < targetTongs.length; i++) {
            if (!tongBoo[i]) {
              shell.exec(`mkdir ${shellLink(targetTongs[i])};`);
            }
          }

          //clean target tong
          for (let i = 0; i < targetTongs.length; i++) {
            targetTongList = await fileSystem(`readDir`, [ targetTongs[i] ]);
            if (PythonCloud.firstDo[tongNames[i].replace(/Tong$/, '')]) {
              for (let j of targetTongList) {
                shell.exec(`rm -rf ${shellLink(targetTongs[i])}/${j}`);
              }
            }
          }

          //write stack
          for (let i = 0; i < targetTongs.length; i++) {
            await fileSystem(`write`, [ targetTongs[i] + "/" + cliid + ".js", "module_exports = function () { return '" + cliid + "' }" ]);
            PythonCloud.firstDo[tongNames[i].replace(/Tong$/, '')] = false;
          }

          //debounce clean
          for (let i = 0; i < targetTongs.length; i++) {
            if (PythonCloud.timeout[tongNames[i].replace(/Tong$/, '')] !== null) {
              clearTimeout(PythonCloud.timeout[tongNames[i].replace(/Tong$/, '')]);
              PythonCloud.timeout[tongNames[i].replace(/Tong$/, '')] = null;
            }
          }

          //debounce timeout : notion
          PythonCloud.timeout.notion = setTimeout(async function () {
            const NotionAPIs = require(`${process.cwd()}/apps/notionAPIs/notionAPIs.js`);
            let app = new NotionAPIs();
            let temp;
            let tongDir = await fileSystem(`readDir`, [ targetTongs[0] ]);
            for (let i of tongDir) {
              if (i !== `.DS_Store`) {
                await app.launching(i.replace(/\.js$/, ''));
              }
            }
            for (let i of tongDir) {
              shell.exec(`rm -rf ${shellLink(targetTongs[0])}/${i}`);
            }
            clearTimeout(PythonCloud.timeout.notion);
            PythonCloud.firstDo.notion = true;
            PythonCloud.timeout.notion = null;
          }, 4000);

          //debounce timeout : analytics
          PythonCloud.timeout.analytics = setTimeout(async function () {
            const GoogleAnalytics = require(process.cwd() + "/apps/googleAPIs/googleAnalytics.js");
            const GoogleSheet = require(process.cwd() + "/apps/googleAPIs/googleSheet.js");
            const analytics = new GoogleAnalytics();
            const sheet = new GoogleSheet();
            const sheetTarget = { id: "1ESI1wf8Zj17s6hYHkEJhDOeLutEvC5iDvtSUN3qjpZc", sheet: "분석", xyz: [ 0, 1 ] };

            let tongDir = await fileSystem(`readDir`, [ targetTongs[1] ]);
            const clients = await analytics.getClientsInfoByNumber(tongDir.length);
            const pastData = await sheet.get_value_inPython(sheetTarget.id, sheetTarget.sheet + "!A2:T101");
            const finalArr = clients.toGoogleAnalyticsSheet().concat(pastData);
            await sheet.update_value_inPython(sheetTarget.id, sheetTarget.sheet, finalArr, sheetTarget.xyz);
            for (let client of clients) {
              await fileSystem(`write`, [ `${process.cwd()}/temp/googleAnalytics_${client.name}_${todayMaker()}.json`, client.toDeath() ]);
            }

            slack_bot.chat.postMessage({ text: `${clients.name} 고객님의 Google analytics 정보를 업데이트하였습니다! : https://docs.google.com/spreadsheets/d/1ESI1wf8Zj17s6hYHkEJhDOeLutEvC5iDvtSUN3qjpZc/edit?usp=sharing`, channel: `#401_consulting` });

            for (let i of tongDir) {
              shell.exec(`rm -rf ${shellLink(targetTongs[1])}/${i}`);
            }
            clearTimeout(PythonCloud.timeout.analytics);
            PythonCloud.firstDo.analytics = true;
            PythonCloud.timeout.analytics = null;
          }, (1000 * 60 * 30));

          //end
          res.set({
            "Content-Type": "text/plain",
            "Access-Control-Allow-Origin": '*',
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
            "Access-Control-Allow-Headers": '*',
          });
          res.send("done");

        } else {
          slack_bot.chat.postMessage({ text: `파이선 클라우드 문제 생김 ${err}`, channel: `#error_log` });
          console.log(err);
        }
      });
    } catch (e) {
      slack_bot.chat.postMessage({ text: `파이선 클라우드 문제 생김 ${e}`, channel: `#error_log` });
      console.log(e);
    }
  }

  //POST - to ai server
  funcObj.post_toAiServer = async function (req, res) {
    try {
      const form = instance.formidable({ multiples: true });
      form.parse(req, async function (err, fields, files) {
        if (!err) {
          const targetComputer = "uragen";
          const tongName = "illustrator";
          const targetTong = `${instance.tong}/${tongName}`;
          let tongBoo = false;
          let tongDir;
          let targetTongList;
          let macAddress;

          macAddress = null;
          for (let obj of instance.address.homeinfo.map) {
            if (obj.name === targetComputer) {
              macAddress = obj.mac;
            }
          }

          //make tong
          tongDir = await fileSystem(`readDir`, [ instance.tong ]);
          tongDir = tongDir.map((i) => { return i !== `.DS_Store`; });
          tongBoo = tongDir.includes(tongName);
          if (!tongBoo) {
            shell.exec(`mkdir ${shellLink(targetTong)};`);
          }

          //clean target tong
          targetTongList = await fileSystem(`readDir`, [ targetTong ]);
          if (PythonCloud.firstDo[tongName]) {
            for (let j of targetTongList) {
              shell.exec(`rm -rf ${shellLink(targetTong)}/${j};`);
            }
          }

          //write stack
          await fileSystem(`writeJson`, [ targetTong + "/" + tongName + "_order_" + String((new Date()).valueOf()) + ".json", fields ]);
          PythonCloud.firstDo[tongName] = false;

          //debounce clean
          while (PythonCloud.timeout[tongName] !== null) {
            if (PythonCloud.running[tongName]) {
              await sleep(500);
            } else {
              clearTimeout(PythonCloud.timeout[tongName]);
              PythonCloud.timeout[tongName] = null;
            }
          }

          //debounce timeout : illustrator
          PythonCloud.timeout.illustrator = setTimeout(async function () {
            PythonCloud.running.illustrator = true;
            const tongDir = await fileSystem(`readDir`, [ targetTong ]);
            if (macAddress !== null) {
              const { ip } = await pythonExecute(instance.pythonApp, [ "getIp" ], { macAddress });
              let targetJsons;
              let aiResponse;
              targetJsons = [];
              for (let i of tongDir) {
                targetJsons.push(await fileSystem(`readJson`, [ `${targetTong}/${i}` ]));
              }
              if (ip !== null) {
                for (let i of targetJsons) {
                  await requestSystem("http://" + ip + ":8080", i, { method: "get" });
                }
              }
            }
            for (let i of tongDir) {
              shell.exec(`rm -rf ${shellLink(targetTong)}/${i}`);
            }
            PythonCloud.running.illustrator = false;
            clearTimeout(PythonCloud.timeout.illustrator);
            PythonCloud.firstDo.illustrator = true;
            PythonCloud.timeout.illustrator = null;
          }, 2000);

          //end
          res.set({
            "Content-Type": "text/plain",
            "Access-Control-Allow-Origin": '*',
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
            "Access-Control-Allow-Headers": '*',
          });
          res.send("done");

        } else {
          slack_bot.chat.postMessage({ text: `파이선 클라우드 문제 생김 ${err}`, channel: `#error_log` });
          console.log(err);
        }
      });
    } catch (e) {
      slack_bot.chat.postMessage({ text: `파이선 클라우드 문제 생김 ${e}`, channel: `#error_log` });
      console.log(e);
    }
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
