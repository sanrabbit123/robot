const CronRouter = function (MONGOC, MONGOLOCALC, socket) {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);

  this.mother = new Mother();
  this.back = new BackMaker();
  this.address = require(`${process.cwd()}/apps/infoObj.js`);
  this.mongo = MONGOC;
  this.mongolocal = MONGOLOCALC;
  this.socket = socket;
  this.dir = `${process.cwd()}/apps/cronGhost`;
  this.moduleDir = this.dir + "/module";

  this.vaildHost = [
    this.address.frontinfo.host,
    this.address.secondinfo.host,
    this.address.transinfo.host,
    this.address.backinfo.host,
    this.address.testinfo.host,
    this.address.officeinfo.ghost.host,
    "localhost:3000",
  ];

}

CronRouter.prototype.fireWall = function (req) {
  const instance = this;
  let __originTarget, __wallLogicBoo, __vailHosts;

  __vailHosts = this.vaildHost;
  __originTarget = req.headers["origin"];
  if (typeof __originTarget !== "string") {
    __originTarget = req.headers["host"];
    if (typeof __originTarget !== "string") {
      __originTarget = "";
    }
  }
  __wallLogicBoo = false;
  for (let host of __vailHosts) {
    __wallLogicBoo = (new RegExp(host, "gi")).test(__originTarget.trim().replace(/\/$/, ''));
    if (__wallLogicBoo) {
      break;
    }
  }
  return __wallLogicBoo;
}

//GET ---------------------------------------------------------------------------------------------

CronRouter.prototype.rou_get_First = function () {
  const instance = this;
  const { errorLog, diskReading } = this.mother;
  let obj = {};
  obj.link = "/:id";
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {

      if (req.params.id === "ssl") {
        const disk = await diskReading();
        res.send(JSON.stringify({ disk: disk.toArray() }));
      } else if (req.params.id === "disk") {
        const disk = await diskReading();
        res.send(JSON.stringify({ disk: disk.toArray() }));
      } else {
        res.send(JSON.stringify({ message: "hi" }));
      }

    } catch (e) {
      errorLog("Cron launcher 서버 문제 생김 (rou_get_First): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
    }
  }

  return obj;
}

CronRouter.prototype.rou_get_ServerSent = function () {
  const instance = this;
  const socket = this.socket;
  const SseStream = require(`${this.moduleDir}/sseStream.js`);
  let obj = {};
  obj.link = [ "/sse/onlineDesigners" ];
  obj.func = async function (req, res) {
    try {
      res.set({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });

      const sseStream = new SseStream(req);
      let pusher;
      let thisSet;
      let thisSetString;
      let pastSetString;

      sseStream.pipe(res);
      pastSetString = "[]";

      pusher = setInterval(() => {
        thisSet = Array.from(new Set([ ...socket.clients ].map((obj) => { return obj.__who__ })));
        thisSet.sort();
        thisSetString = JSON.stringify(thisSet);
        if (thisSetString !== pastSetString) {
          sseStream.write({ event: "message", data: thisSetString });
        }
        pastSetString = thisSetString;
      }, 1000);

      res.on("close", function () {
        clearInterval(pusher);
        sseStream.unpipe(res);
      });

    } catch (e) {
      instance.mother.errorLog("CronGhost 서버 문제 생김 (rou_get_ServerSent): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
    }
  }
  return obj;
}

//POST ---------------------------------------------------------------------------------------------

CronRouter.prototype.rou_post_wssStatus = function () {
  const instance = this;
  const socket = this.socket;
  const { errorLog, equalJson } = this.mother;
  let obj = {};
  obj.link = [ "/wssStatus" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const clients = [ ...socket.clients ].map((obj) => { return obj.__who__ });
      res.send(JSON.stringify(clients));
    } catch (e) {
      errorLog("Cron launcher 서버 문제 생김 (rou_post_wssStatus): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
    }
  }

  return obj;
}

//ROUTING ----------------------------------------------------------------------

CronRouter.prototype.getAll = function () {
  let result, result_arr;

  result = { get: [], post: [] };
  result_arr = Object.keys(CronRouter.prototype);

  for (let i of result_arr) { if (/^rou_get/g.test(i)) {
    result.get.push((this[i])());
  }}

  for (let i of result_arr) { if (/^rou_post/g.test(i)) {
    result.post.push((this[i])());
  }}

  return result;
}

module.exports = CronRouter;
