const SecondGhost = function (mother = null, back = null, address = null) {
  if (mother !== null && back !== null && address !== null) {
    this.mother = mother;
    this.back = back;
    this.address = address;
  } else {
    const Mother = require(process.cwd() + "/apps/mother.js");
    const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js");
    const ADDRESS = require(process.cwd() + "/apps/infoObj.js");
    this.mother = new Mother();
    this.back = new BackMaker();
    this.address = ADDRESS;
  }
  const { WebClient } = require("@slack/web-api");
  this.dir = process.cwd() + "/apps/secondGhost";
  this.slack_token = "xoxb-717757271335-4566120587107-i7TxxYzbPWPzdBMPoZDo2kxn";
  this.slack_userToken = "xoxp-717757271335-704486967090-4566130160163-fd2a2cc412e2a509a43635fb8f6c65e2";
  this.slack_bot = new WebClient(this.slack_token);
  this.slack_users = {
    admin: "xoxp-717757271335-704486967090-4566130160163-fd2a2cc412e2a509a43635fb8f6c65e2",
    uragen: "xoxp-717757271335-715434169876-4588473337589-1ff8fc65c00ba8872f90e3f9aae69ead",
  };
  this.telegram = {
    chat: {
      general: "-1001897212963",
      private: "-873784218",
      operation: "-658958104",
      log: "-760085658",
    },
    token: "5127747215:AAHDSmjmeYNJ4C4B5hWdAO-T1bJleSfOpGU",
    url: (token) => { return `https://api.telegram.org/bot${token}/sendMessage` }
  }
}

SecondGhost.prototype.ghostConnect = async function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink, mongo, mongoinfo, mongolocalinfo, errorLog, messageLog, setQueue, requestSystem, dateToString, sleep, equalJson } = this.mother;
  const { slack_userToken, slack_users } = this;
  const PORT = 3000;
  const https = require("https");
  const express = require("express");
  const app = express();
  const multer = require("multer");
  const multiForms = multer();
  const useragent = require("express-useragent");
  const staticFolder = process.env.HOME + "/static";

  app.use(useragent.express());
  app.use(express.json({ limit : "50mb" }));
  app.use(multiForms.array());
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  app.use(express.static(staticFolder));

  try {
    console.log(``);
    console.log(`\x1b[36m\x1b[1m%s\x1b[0m`, `launching second ghost ==============`);
    console.log(``);

    //set mongo connetion
    let MONGOC, MONGOLOCALC;
    MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
    MONGOLOCALC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
    console.log(`\x1b[33m%s\x1b[0m`, `set DB server => ${this.address.mongoinfo.host}`);
    console.log(``);
    await MONGOC.connect();
    await MONGOLOCALC.connect();

    //set pem key
    let pems, pemsLink;
    let certDir, keyDir, caDir;

    pems = {};
    pemsLink = process.cwd() + "/pems/" + this.address.secondinfo.host;

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

    //set slack members, channels;
    const { data: { members: slackMembers } } = await requestSystem("https://slack.com/api/users.list", {}, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + slack_userToken,
      }
    });
    let slackChannelsTotal, slackChannels, members, thisToken;

    slackChannelsTotal = [];
    for (let user in slack_users) {
      console.log("find channel in " + user + "...");
      thisToken = slack_users[user];
      ({ data: { channels: slackChannels } } = await requestSystem("https://slack.com/api/conversations.list?limit=999&types=public_channel,private_channel,mpim,im", {}, { method: "get", headers: { "Content-Type": "application/json", "Authorization": "Bearer " + thisToken, } }));
      for (let obj of slackChannels) {
        if (obj.is_im === true) {
          console.log("find private channel : " + obj.id + " of " + user);
          await sleep(200);
          ({ data: { members } } = await requestSystem("https://slack.com/api/conversations.members?channel=" + obj.id, {}, { method: "get", headers: { "Content-Type": "application/json", "Authorization": "Bearer " + thisToken, } }));
          obj.members = equalJson(JSON.stringify(members));
        }
      }
      slackChannelsTotal = slackChannelsTotal.concat(slackChannels);
    }

    //set router
    const SecondRouter = require(`${this.dir}/router/secondRouter.js`);
    const router = new SecondRouter(this.slack_bot, MONGOC, MONGOLOCALC, slack_userToken, slackMembers, slackChannelsTotal, this.telegram);

    const rouObj = router.getAll();
    for (let obj of rouObj.get) {
      app.get(obj.link, obj.func);
    }
    for (let obj of rouObj.post) {
      app.post(obj.link, obj.func);
    }
    console.log(`set router`);

    //server on
    https.createServer(pems, app).listen(PORT, () => { console.log(`\x1b[33m%s\x1b[0m`, `\nServer running\n`); });

  } catch (e) {
    console.log(e);
  }
}

module.exports = SecondGhost;
