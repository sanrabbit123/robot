const PythonCloud = function () {
  const address = require(`${process.cwd()}/apps/infoObj.js`);
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  this.mother = new Mother();
  this.dir = process.cwd() + "/apps/pythonCloud";
  this.tong = this.dir + "/tong";
  this.cloudHost = { inner: address.pythoninfo.ip.inner, outer: address.pythoninfo.host, port: 3000 };
  this.formidable = require('formidable');
}

PythonCloud.firstDo = {
  proposal: true,
  notion: true,
  analytics: true,
};

PythonCloud.timeout = {
  proposal: null,
  notion: null,
  analytics: null,
};

PythonCloud.prototype.routingCloud = function () {
  const instance = this;
  const { fileSystem, shell, slack_bot, shellLink } = this.mother;
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
          let targetTongs = [], tongBoo = [];
          let tongDir;
          let targetTongList;

          for (let i of tongNames) {
            targetTongs.push(`${instance.tong}/${i}`);
            tongBoo.push(false);
          }

          //make tong
          tongDir = await fileSystem(`readDir`, [ instance.tong ]);
          for (let i = 0; i < tongDir.length; i++) {
            if (tongNames.includes(tongDir[i])) {
              tongBoo[i] = true;
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
            const NotionAPIs = require(`${process.cwd()}/apps/notionAPIs/notionAPIs.js`);
            let app = new NotionAPIs();
            let temp;
            let tongDir = await fileSystem(`readDir`, [ targetTongs[1] ]);
            for (let i of tongDir) { if (i !== `.DS_Store`) {
              await app.launching(i.replace(/\.js$/, ''));
            }}
            for (let i of tongDir) {
              shell.exec(`rm -rf ${shellLink(targetTongs[1])}/${i}`);
            }
            PythonCloud.firstDo.analytics = true;
            PythonCloud.timeout.analytics = null;
          }, (1000 * 60 * 20));



          /*

          const tongName = `notionTong`;
          const targetTong = `${instance.tong}/${tongName}`;
          let tongDir, tongBoo;

          //make tong
          tongDir = await fileSystem(`readDir`, [ instance.tong ]);
          tongBoo = false;
          for (let i of tongDir) {
            if (i === tongName) {
              tongBoo = true;
            }
          }
          if (!tongBoo) {
            shell.exec(`mkdir ${shellLink(targetTong)};`);
          }

          //clean target tong
          const targetTongList = await fileSystem(`readDir`, [ targetTong ]);
          if (PythonCloud.firstDo.notion) {
            for (let i of targetTongList) {
              shell.exec(`rm -rf ${shellLink(targetTong)}/${i}`);
            }
          }

          //write stack
          await fileSystem(`write`, [ targetTong + "/" + cliid + ".js", "module_exports = function () { return '" + cliid + "' }" ]);
          PythonCloud.firstDo.notion = false;

          //debounce clean
          if (PythonCloud.timeout.notion !== null) {
            clearTimeout(PythonCloud.timeout.notion);
            PythonCloud.timeout.notion = null;
          }

          //debounce timeout
          PythonCloud.timeout.notion = setTimeout(async function () {
            const NotionAPIs = require(`${process.cwd()}/apps/notionAPIs/notionAPIs.js`);
            let app = new NotionAPIs();
            let temp;
            let tongDir = await fileSystem(`readDir`, [ targetTong ]);
            for (let i of tongDir) { if (i !== `.DS_Store`) {
              await app.launching(i.replace(/\.js$/, ''));
            }}
            PythonCloud.firstDo.notion = true;
            PythonCloud.timeout.notion = null;
            for (let i of tongDir) {
              shell.exec(`rm -rf ${shellLink(targetTong)}/${i}`);
            }
          }, 4000);

          */

          //end
          res.set({
            "Content-Type": "text/plain",
            "Access-Control-Allow-Origin": '*',
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
            "Access-Control-Allow-Headers": '*',
          });
          res.send("done");

        } else {
          console.log(err);
        }
      });
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
    //set router
    let get, post, router, inner;

    router = this.routingCloud();
    inner = this.cloudHost.inner;

    get = router.get;
    post = router.post;
    for (let obj of get) { app.get(obj.link, obj.func); }
    for (let obj of post) { app.post(obj.link, obj.func); }

    //server on
    http.createServer(app).listen(this.cloudHost.port, inner, () => {
      console.log(`Server running`);
    });
  } catch (e) {
    console.log(e);
  }
}

module.exports = PythonCloud;
