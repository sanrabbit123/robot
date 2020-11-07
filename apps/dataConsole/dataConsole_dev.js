const DataConsole = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  this.mother = new Mother();
  this.dir = process.cwd() + "/apps/dataConsole";
}

DataConsole.prototype.connect = async function () {
  const instance = this;
  const { fileSystem, shell, shellLink, mongo, mongoinfo } = this.mother;
  const http = require("http");
  const express = require("express");
  const app = express();
  const bodyParser = require("body-parser");
  const session = require("express-session");
  const MongoStore = require("connect-mongo")(session);
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  let localMongoUrl_Arr, localMongoUrl;
  localMongoUrl_Arr = mongoinfo.split('@');
  localMongoUrl = localMongoUrl_Arr[0] + '@' + "localhost" + ':' + (localMongoUrl_Arr[1].split(':'))[1];
  const sessionStore = new MongoStore({
    url: localMongoUrl,
    dbName: "miro81",
    collection: "sessions"
  });
  const useragent = require('express-useragent');
  app.use(useragent.express());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(session({
    key: 'session_cookie_name',
    HttpOnly: true,
    secret: 'weufhD@ao34ehvgawegv!@RFG',
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: (2 * 365 * 24 * 60 * 60 * 1000) }
  }));

  try {

    await MONGOC.connect();

    //set router
    const DataRouter = require(`${this.dir}/router/dataRouter.js`);
    const router = new DataRouter(MONGOC);
    const rouObj = router.getAll();
    for (let obj of rouObj.get) {
      app.get(obj.link, obj.func);
    }
    for (let obj of rouObj.post) {
      app.post(obj.link, obj.func);
    }

    //set static
    const staticDir = `${this.dir}/router/source/local`;
    const staticDirList = await fileSystem(`readDir`, [ staticDir ]);
    const homeDirList = await fileSystem(`readDir`, [ process.env.HOME ]);

    let svgTongString, generalString, consoleGeneralString, execString, fileString;

    if (!homeDirList.includes(`static`)) {
      shell.exec(`mkdir ${shellLink(process.env.HOME)}/static`);
    }
    for (let i of staticDirList) {
      if (i !== `.DS_Store`) {
        svgTongString = await fileSystem(`readString`, [ `${process.cwd()}/apps/frontMaker/string/svgTong.js` ]);
        generalString = await fileSystem(`readString`, [ `${process.cwd()}/apps/frontMaker/source/jsGeneral/general.js` ]);
        generalString = generalString.replace(/\/<%generalMap%>\//, "{}");
        consoleGeneralString = await fileSystem(`readString`, [ `${this.dir}/router/source/general/general.js` ]);
        fileString = await fileSystem(`readString`, [ `${this.dir}/router/source/local/${i}` ]);
        execString = await fileSystem(`readString`, [ `${this.dir}/router/source/general/exec.js` ]);
        execString = execString.replace(/\/<%name%>\//, (i.slice(0, 1).toUpperCase() + i.replace(/\.js$/, '').slice(1)));
        await fileSystem(`write`, [ `${process.env.HOME}/static/${i}`, ('"use strict";' + "\n\n" + svgTongString + "\n\n" + generalString + "\n\n" + consoleGeneralString + "\n\n" + fileString + "\n\n" + execString) ]);
      }
    }

    //server on
    http.createServer(app).listen(3000, () => { console.log(`connect 3000`) });
  } catch (e) {
    console.log(e.message);
  }
}

module.exports = DataConsole;
