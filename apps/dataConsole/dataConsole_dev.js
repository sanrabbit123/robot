const DataConsole = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  this.mother = new Mother();
  this.dir = process.cwd() + "/apps/dataConsole";
}

DataConsole.prototype.renderStatic = async function (staticFolder) {
  const instance = this;
  const { fileSystem, babelSystem, shell, shellLink } = this.mother;
  const ADDRESS = require(`${process.cwd()}/apps/infoObj.js`);
  const S3HOST = ADDRESS.s3info.host;
  try {

    //set static
    const staticDir = `${this.dir}/router/source/local`;
    const staticDirList = await fileSystem(`readDir`, [ staticDir ]);
    const homeDirList = await fileSystem(`readDir`, [ process.env.HOME ]);
    if (!homeDirList.includes(staticFolder.split('/')[staticFolder.split('/').length - 1])) {
      shell.exec(`mkdir ${shellLink(staticFolder)}`);
    }

    let svgTongString, generalString, consoleGeneralString, execString, fileString, svgTongItemsString, s3String, polyfillString;
    let code0, code1;
    let result;

    s3String = "const S3HOST = \"" + S3HOST + "\";";
    svgTongString = await fileSystem(`readString`, [ `${process.cwd()}/apps/frontMaker/string/svgTong.js` ]);
    generalString = await fileSystem(`readString`, [ `${process.cwd()}/apps/frontMaker/source/jsGeneral/general.js` ]);
    generalString = generalString.replace(/\/<%generalMap%>\//, "{}");
    consoleGeneralString = await fileSystem(`readString`, [ `${this.dir}/router/source/general/general.js` ]);
    polyfillString = await fileSystem(`readString`, [ `${process.cwd()}/apps/frontMaker/source/jsGeneral/polyfill.js` ]);

    for (let i of staticDirList) {
      svgTongItemsString = null;
      if (i !== `.DS_Store`) {
        execString = await fileSystem(`readString`, [ `${this.dir}/router/source/general/exec.js` ]);
        execString = execString.replace(/\/<%name%>\//, (i.slice(0, 1).toUpperCase() + i.replace(/\.js$/, '').slice(1)));
        fileString = await fileSystem(`readString`, [ `${this.dir}/router/source/local/${i}` ]);
        if (/\/<%map%>\//g.test(fileString)) {
          fileString = fileString.replace(/(\/<%map%>\/)/g, function (match, p1, offset, string) {
            return JSON.stringify(require(`${instance.dir}/router/source/svg/map/${i}`), null, 2);
          });
          svgTongItemsString = await fileSystem(`readString`, [ `${this.dir}/router/source/svg/svgTong/${i}` ]);
        }
        code0 = s3String + "\n\n" + svgTongString;
        code1 = generalString + "\n\n" + consoleGeneralString + "\n\n" + fileString + "\n\n" + execString;
        if (svgTongItemsString === null) {
          result = (await babelSystem(code0)) + "\n\n" + (await babelSystem(code1));
        } else {
          result = (await babelSystem(code0)) + "\n\n" + svgTongItemsString + "\n\n" + (await babelSystem(code1));
        }
        await fileSystem(`write`, [ `${process.env.HOME}/static/${i}`, (polyfillString + "\n\n" + result) ]);
      }
    }

  } catch (e) {
    console.log(e);
  }
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
  const staticFolder = process.env.HOME + '/static';
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
  app.use(express.static(staticFolder));
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
    await this.renderStatic(staticFolder);

    //server on
    http.createServer(app).listen(3000, () => { console.log(`connect 3000`) });
  } catch (e) {
    console.log(e);
  }
}

module.exports = DataConsole;
