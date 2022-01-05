const GtagPlayground = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  const ADDRESS = require(`${process.cwd()}/apps/infoObj.js`);
  this.mother = new Mother();
  this.back = new BackMaker();
  this.address = ADDRESS;
  this.dir = process.cwd() + "/apps/gtagPlayground";
}

GtagPlayground.prototype.staticStore = function () {
  const instance = this;
  const host = "homeliaison-playground.xyz";
  const port = 3000;
  return {
    host,
    port
  };
}

GtagPlayground.prototype.routerSetting = function (app) {
  const instance = this;
  const { fileSystem, shellExec, shellLink, equalJson } = this.mother;

  app.get("/", function (req, res) {
    res.set("Content-Type", "text/html");
    res.send(`
      <html>
        <head>
        </head>
        <body>
          hi
        </body>
      </html>
    `);
  });

}

GtagPlayground.prototype.playgroundConnect = async function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink } = this.mother;
  const { host, port } = this.staticStore();
  const https = require("https");
  const express = require("express");
  const app = express();
  const multer = require("multer");
  const multiForms = multer();
  const useragent = require("express-useragent");
  const staticFolder = process.env.HOME + "/static";
  try {
    let pems, pemsLink;
    let certDir, keyDir, caDir;

    app.use(useragent.express());
    app.use(express.json({ limit : "50mb" }));
    app.use(multiForms.array());
    app.use(express.urlencoded({ limit: "50mb", extended: true }));
    app.use(express.static(staticFolder));

    pems = {};
    pemsLink = process.cwd() + "/pems/" + host;
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

    this.routerSetting(app);

    https.createServer(pems, app).listen(port, () => { console.log(`\x1b[33m%s\x1b[0m`, `\nServer running\n`); });

  } catch (e) {
    console.log(e);
  }
}

module.exports = GtagPlayground;
