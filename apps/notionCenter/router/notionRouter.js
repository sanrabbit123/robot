const NotionRouter = function (MONGOC, MONGOLOCALC) {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  const ImageReader = require(process.cwd() + "/apps/imageReader/imageReader.js");
  const ParsingHangul = require(process.cwd() + "/apps/parsingHangul/parsingHangul.js");
  const NotionAPIs = require(process.cwd() + "/apps/notionAPIs/notionAPIs.js");
  const LiaisonCalendar = require(process.cwd() + "/apps/notionAPIs/children/liaisonCalendar.js");

  this.mother = new Mother();
  this.back = new BackMaker();
  this.address = require(`${process.cwd()}/apps/infoObj.js`);

  this.notion = new NotionAPIs(this.mother, this.back, this.address);
  this.notionChildren = {};
  this.notionChildren.liaisonCalendar = new LiaisonCalendar();

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

NotionRouter.prototype.rou_post_listCalendars = function () {
  const instance = this;
  const notion = this.notion;
  const notionChildren = this.notionChildren;
  const members = this.members;
  const { fileSystem, equalJson, requestSystem, sleep, dateToString } = this.mother;
  let obj;
  obj = {};
  obj.link = [ "/listCalendars" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const allMode = equalJson(req.body).all === "true" || equalJson(req.body).all === true;
      let targetMember = !allMode ? equalJson(req.body).member : null;
      if (!allMode) {
        if (targetMember === undefined || targetMember === null) {
          throw new Error("invalid post");
        }
      }
      if (targetMember !== null) {
        targetMember = members.find((o) => { return o.id === targetMember });
      }
      if (targetMember === undefined) {
        throw new Error("invalid post 2");
      }
      const result = await notionChildren.liaisonCalendar.listCalendars(allMode, targetMember);
      res.send(JSON.stringify(result));
    } catch (e) {
      logger.error("Notion center 서버 문제 생김 (rou_post_listCalendars): " + e.message).catch((e) => { console.log(e); });
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
