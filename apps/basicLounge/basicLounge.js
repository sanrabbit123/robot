const BasicLounge = function () {
  const Mother = require(process.cwd() + "/apps/mother.js");
  this.mother = new Mother();
  this.dir = process.cwd() + "/apps/basicLounge";
}

BasicLounge.prototype.basicConnect = async function () {
  const instance = this;
  const { fileSystem, shellExec } = this.mother;
  const PORT = 3000;
  const http = require("http");
  const express = require("express");
  const app = express();
  const useragent = require("express-useragent");
  const staticFolder = process.env.HOME + "/static";

  app.use(useragent.express());
  app.use(express.json({ limit : "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  app.use(express.static(staticFolder));
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, HEAD, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With, remember-me");
    if (req.method === "OPTIONS") {
      res.sendStatus(200);
    } else {
      next();
    }
  });
  
  try {
    console.log(``);
    console.log(`\x1b[36m\x1b[1m%s\x1b[0m`, `launching basic lounge ==============`);
    console.log(``);

    //set static
    if (!(await fileSystem("exist", [ staticFolder ]))) {
      await shellExec("mkdir", [ staticFolder ]);
    }

    //set router
    const BasicRouter = require(`${this.dir}/router/basicRouter.js`);
    const router = new BasicRouter();

    const rouObj = router.getAll();
    for (let obj of rouObj.get) {
      app.get(obj.link, obj.func);
    }
    for (let obj of rouObj.post) {
      app.post(obj.link, obj.func);
    }
    console.log(`set router`);

    //server on
    http.createServer(app).listen(PORT, () => { console.log(`\x1b[33m%s\x1b[0m`, `\nServer running\n`); });

  } catch (e) {
    console.log(e);
  }
}

module.exports = BasicLounge;
