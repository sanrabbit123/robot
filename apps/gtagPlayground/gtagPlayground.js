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
  const gtag = "GTM-TQS6Q3C";
  const analytics = "G-QBLBSWF1Q6";
  return {
    host,
    port,
    gtag,
    analytics
  };
}

GtagPlayground.prototype.routerSetting = function (app) {
  const instance = this;
  const { fileSystem, shellExec, shellLink, equalJson } = this.mother;
  const {
    gtag,
    analytics
  } = this.staticStore();

  app.get("/", function (req, res) {
    res.set("Content-Type", "text/html");
    res.send(`
      <html>
        <head>
        <!-- Google Tag Manager -->
        <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${gtag}');</script>
        <!-- End Google Tag Manager -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${analytics}');
        </script>
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
