const MemberRouter = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const PlayAudio = require(process.cwd() + "/apps/playAudio/playAudio.js");
  const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js");
  this.mother = new Mother();
  this.back = new BackMaker();
  this.address = require(`${process.cwd()}/apps/infoObj.js`);
  this.formidable = require("formidable").formidable;
  this.audio = new PlayAudio();
}

//GET ---------------------------------------------------------------------------------------------

MemberRouter.prototype.rou_get_First = function () {
  const instance = this;
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
      res.send(JSON.stringify({ message: "hi" }));
    } catch (e) {
      logger.error("Member lounge 서버 문제 생김 (rou_get_First): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
    }
  }

  return obj;
}

//POST ---------------------------------------------------------------------------------------------

MemberRouter.prototype.rou_post_textToVoice = function () {
  const instance = this;
  const audio = this.audio;
  const { equalJson } = this.mother;
  let obj;
  obj = {};
  obj.link = [ "/textToVoice" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (typeof req.body.text !== "string") {
        throw new Error("invalid post");
      }
      audio.textToVoice(req.body.text).catch((err) => {
        console.log(err);
      });
      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      logger.error("Member lounge 서버 문제 생김 (rou_post_textToVoice): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

//ROUTING ----------------------------------------------------------------------

MemberRouter.prototype.getAll = function () {
  let result, result_arr;

  result = { get: [], post: [] };
  result_arr = Object.keys(MemberRouter.prototype);

  for (let i of result_arr) { if (/^rou_get/g.test(i)) {
    result.get.push((this[i])());
  }}

  for (let i of result_arr) { if (/^rou_post/g.test(i)) {
    result.post.push((this[i])());
  }}

  return result;
}

module.exports = MemberRouter;
