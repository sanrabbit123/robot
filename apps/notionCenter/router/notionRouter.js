const NotionRouter = function (MONGOC, MONGOLOCALC) {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  const ImageReader = require(process.cwd() + "/apps/imageReader/imageReader.js");
  const ParsingHangul = require(process.cwd() + "/apps/parsingHangul/parsingHangul.js");

  this.mother = new Mother();
  this.back = new BackMaker();
  this.address = require(`${process.cwd()}/apps/infoObj.js`);
  this.host = this.address.notioninfo.host;
  this.mongo = MONGOC;
  this.mongolocal = MONGOLOCALC;
  this.members = {};

  this.formidable = require("formidable");
  this.imageReader = new ImageReader(this.mother, this.back, this.address);
  this.hangul = new ParsingHangul();

  this.staticConst = process.env.HOME + "/static";
}

//GET ---------------------------------------------------------------------------------------------

NotionRouter.prototype.rou_get_First = function () {
  const instance = this;
  const { diskReading, aliveMongo } = this.mother;
  let obj = {};
  obj.link = "/:id";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {

      if (req.params.id === "ssl") {
        const disk = await diskReading();
        const aliveMongoResult = await aliveMongo();
        res.send(JSON.stringify({ disk: disk.toArray(), mongo: aliveMongoResult }));
      } else if (req.params.id === "disk") {
        const disk = await diskReading();
        res.send(JSON.stringify({ disk: disk.toArray() }));
      } else {
        res.send(JSON.stringify({ message: "hi" }));
      }

    } catch (e) {
      logger.error("Notion center 서버 문제 생김 (rou_get_First): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
    }
  }

  return obj;
}

//POST ---------------------------------------------------------------------------------------------

NotionRouter.prototype.rou_post_getHoliday = function () {
  const instance = this;
  const back = this.back;
  const { fileSystem, equalJson, requestSystem, sleep, dateToString } = this.mother;
  let obj;
  obj = {};
  obj.link = [ "/getHoliday" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const selfMongo = instance.mongolocal;
      const collection = "holidayList";
      let rows;
      let oneYearsAgo;

      oneYearsAgo = new Date();
      oneYearsAgo.setFullYear(oneYearsAgo.getFullYear() - 1);

      rows = await back.mongoRead(collection, { date: { $gte: oneYearsAgo } }, { selfMongo });
      rows.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });

      if (rows.length > 0) {
        res.send(JSON.stringify({ holiday: rows[0].data }));
      } else {
        res.send(JSON.stringify({ holiday: [] }));
      }

    } catch (e) {
      logger.error("Notion center 서버 문제 생김 (rou_post_getHoliday): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

//ROUTING ----------------------------------------------------------------------

NotionRouter.prototype.setMembers = async function () {
  const instance = this;
  const back = this.back;
  const { fileSystem } = this.mother;
  try {
    this.members = await back.setMemberObj({ getMode: true, selfMongo: instance.mongo });
  } catch (e) {
    await logger.error("Notion center 서버 문제 생김 (setMembers): " + e.message);
    console.log(e);
  }
}

NotionRouter.prototype.getAll = function () {
  let result, result_arr;

  result = { get: [], post: [] };
  result_arr = Object.keys(NotionRouter.prototype);

  for (let i of result_arr) { if (/^rou_get/g.test(i)) {
    result.get.push((this[i])());
  }}

  for (let i of result_arr) { if (/^rou_post/g.test(i)) {
    result.post.push((this[i])());
  }}

  return result;
}

module.exports = NotionRouter;
