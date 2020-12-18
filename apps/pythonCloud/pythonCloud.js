const PythonCloud = function () {
  const address = require(`${process.cwd()}/apps/infoObj.js`);
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  this.mother = new Mother();
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

PythonCloud.prototype.routingCloud = function (macAddress = null) {
  const instance = this;
  const { fileSystem, shell, slack_bot, shellLink, todayMaker, requestSystem } = this.mother;
  let funcObj = {};

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
            for (let i of tongDir) { if (i !== `.DS_Store`) {
              await app.launching(i.replace(/\.js$/, ''));
            }}
            for (let i of tongDir) {
              shell.exec(`rm -rf ${shellLink(targetTongs[0])}/${i}`);
            }
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

  funcObj.post_toAiServer = async function (req, res) {
    try {
      const form = instance.formidable({ multiples: true });
      form.parse(req, async function (err, fields, files) {
        if (!err) {
          let tongName = "illustrator";
          let targetTong = `${instance.tong}/${tongName}`;
          let tongBoo = false;
          let tongDir;
          let targetTongList;

          const zeroAddition = function (number) {
            if (number < 10) {
              return `0${String(number)}`;
            } else {
              return String(number);
            }
          }
          const objToQuery = function (obj) {
            let str = '';
            for (let i in obj) {
              str += i.replace(/[\=\&]/g, '');
              str += '=';
              str += obj[i].replace(/[\=\&]/g, '');
              str += '&';
            }
            return str.slice(0, -1);
          }
          const today = new Date();
          const todayString = `${zeroAddition(today.getMonth() + 1)}${zeroAddition(today.getDate())}${zeroAddition(today.getHours())}${zeroAddition(today.getMinutes())}${zeroAddition(today.getSeconds())}`;

          //make tong
          tongDir = await fileSystem(`readDir`, [ instance.tong ]);
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
          for (let i = 0; i < targetTongs.length; i++) {
            await fileSystem(`write`, [ targetTong + "/" + tongName + "_order_" + todayString + ".json", JSON.stringify(fields) ]);
            PythonCloud.firstDo[tongName] = false;
          }

          //debounce clean
          if (PythonCloud.timeout[tongName] !== null) {
            clearTimeout(PythonCloud.timeout[tongName]);
            PythonCloud.timeout[tongName] = null;
          }

          //debounce timeout : illustrator
          PythonCloud.timeout.illustrator = setTimeout(async function () {
            const tongDir = await fileSystem(`readDir`, [ targetTong ]);
            if (macAddress !== null) {
              const targetIp = await instance.mother.pythonExecute(instance.pythonApp, [ "getIp" ], { macAddress });
              let targetJsons;

              targetJsons = [];
              for (let i of tongDir) {
                if (i !== `.DS_Store`) {
                  targetJsons.push(JSON.parse(await fileSystem(`readString`, [ targetTong + "/" + i ])));
                }
              }

              for (let i of targetJsons) {
                console.log(await requestSystem("http://" + targetIp + ":8080/illustrator?" + objToQuery(i)));
              }

            }
            for (let i of tongDir) {
              shell.exec(`rm -rf ${shellLink(targetTong)}/${i}`);
            }
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

  //end : set router
  let resultObj = { get: [], post: [] };
  for (let i in funcObj) {
    resultObj[i.split('_')[0]].push({ link: "/" + i.split('_')[1], func: funcObj[i] });
  }
  return resultObj;
}

PythonCloud.prototype.serverLaunching = async function () {
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

    //set address info
    const { name, rawObj: address } = await this.mother.ipCheck();
    if (name === "unknown") {
      throw new Error("invalid address");
    }

    //set router
    let get, post, router, inner;

    console.log(address);

    if (address.host !== "localhost") {
      inner = address.ip.inner;
      router = this.routingCloud(address.polling.mac);
    } else {
      inner = address.polling.inner;
      router = this.routingCloud(null);
    }

    get = router.get;
    post = router.post;
    for (let obj of get) {
      app.get(obj.link, obj.func);
    }
    for (let obj of post) {
      app.post(obj.link, obj.func);
    }

    //server on
    http.createServer(app).listen(3000, address.ip.inner, () => {
      console.log(`Server running`);
    });
  } catch (e) {
    console.log(e);
  }
}

module.exports = PythonCloud;
