const LocalRouter = function (MONGOC) {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js");
  this.mother = new Mother();
  this.back = new BackMaker();
  this.address = require(`${process.cwd()}/apps/infoObj.js`);
  this.formidable = require("formidable");
  this.mongo = MONGOC;
  this.mongolocal = MONGOC;
  this.targetIp = [
    "192.168.0.20",
    "192.168.0.24",
    "192.168.0.30",
  ]
  this.port = 8000;
}

//GET ---------------------------------------------------------------------------------------------

LocalRouter.prototype.rou_get_First = function () {
  const instance = this;
  const { generalHeaders } = this.mother;
  let obj = {};
  obj.link = "/:id";
  obj.func = async function (req, res, logger) {
    res.set(generalHeaders());
    try {
      res.send(JSON.stringify({ message: "hi" }));
    } catch (e) {
      logger.error("Local observer 서버 문제 생김 (rou_get_First): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
    }
  }

  return obj;
}

//POST ---------------------------------------------------------------------------------------------

LocalRouter.prototype.rou_post_registerIpAddress = function () {
  const instance = this;
  const { equalJson, generalHeaders } = this.mother;
  let obj;
  obj = {};
  obj.link = [ "/registerIpAddress" ];
  obj.func = async function (req, res, logger) {
    res.set(generalHeaders());
    try {
      if (req.body.id === undefined || req.body.ip === undefined) {
        throw new Error("invalid post");
      }
      const { id, ip } = equalJson(req.body);
      const member = instance.members.find((o) => { return o.id === id });
      if (member === undefined) {
        throw new Error("invalid id");
      }

      instance.members.find((o) => { return o.id === id }).ip = equalJson(JSON.stringify(ip));

      res.send(JSON.stringify({ message: "done" }));
    } catch (e) {
      logger.error("Local observer 서버 문제 생김 (rou_post_registerIpAddress): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

LocalRouter.prototype.rou_post_pushComplete = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const { equalJson, generalHeaders, messageSend, requestSystem } = this.mother;
  let obj;
  obj = {};
  obj.link = [ "/pushComplete" ];
  obj.func = async function (req, res, logger) {
    res.set(generalHeaders());
    try {
      if (req.body.member === undefined || req.body.appName === undefined || req.body.type === undefined || req.body.message === undefined) {
        throw new Error("invalid post");
      }
      const { member, appName, type, message } = equalJson(req.body);
      const collection = "gitPushLog";
      let json;

      json = {
        date: new Date(),
        method: "push",
        member: {
          id: member.id,
          name: member.name,
        },
        message: message,
        app: {
          type,
          ...appName,
        }
      };

      await back.mongoCreate(collection, json, { selfMongo: instance.mongolocal });
      messageSend({ text: member.name + "님이 " + appName["name"] + " 프로젝트의 git 저장소를 업데이트 진행하였습니다!", channel: "C063JC1417S", voice: false }).catch((err) => { console.log(err); })
      await requestSystem("https://" + address.officeinfo.gitlab.host + ":" + String(address.officeinfo.gitlab.endPort) + "/gitLocalSync", { type }, {
        headers: { "Content-Type": "application/json" }
      });

      res.send(JSON.stringify({ message: "done" }));
    } catch (e) {
      logger.error("Local observer 서버 문제 생김 (rou_post_pushComplete): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

LocalRouter.prototype.rou_post_gitLocalSync = function () {
  const instance = this;
  const back = this.back;
  const targetIp = this.targetIp;
  const port = this.port;
  const { equalJson, generalHeaders, messageSend, requestSystem } = this.mother;
  let obj;
  obj = {};
  obj.link = [ "/gitLocalSync" ];
  obj.func = async function (req, res, logger) {
    res.set(generalHeaders());
    try {
      if (req.body.type === undefined) {
        throw new Error("invalid post");
      }
      const { type } = equalJson(req.body);
      for (let ip of targetIp) {
        try {
          requestSystem("http://" + ip + ":" + String(port) + "/gitPull", { type }, { headers: { "Content-Type": "application/json" } }).catch((err) => { console.log(err) });
        } catch {}
      }
      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      logger.error("Local observer 서버 문제 생김 (rou_post_gitLocalSync): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

//ROUTING ----------------------------------------------------------------------

LocalRouter.prototype.setMembers = async function () {
  const instance = this;
  const back = this.back;
  const { fileSystem } = this.mother;
  try {
    this.members = await back.setMemberObj({ getMode: true, selfMongo: null });
  } catch (e) {
    await logger.error("Local observer 서버 문제 생김 (setMembers): " + e.message);
    console.log(e);
  }
}

LocalRouter.prototype.getAll = function () {
  let result, result_arr;

  result = { get: [], post: [] };
  result_arr = Object.keys(LocalRouter.prototype);

  for (let i of result_arr) { if (/^rou_get/g.test(i)) {
    result.get.push((this[i])());
  }}

  for (let i of result_arr) { if (/^rou_post/g.test(i)) {
    result.post.push((this[i])());
  }}

  return result;
}

module.exports = LocalRouter;
