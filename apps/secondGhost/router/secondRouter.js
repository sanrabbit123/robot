const SecondRouter = function (slack_bot, slack_user, MONGOC, MONGOLOCALC, slack_userToken, slack_info, telegram) {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  const GoogleSheet = require(`${process.cwd()}/apps/googleAPIs/googleSheet.js`);
  const GoogleDrive = require(`${process.cwd()}/apps/googleAPIs/googleDrive.js`);

  this.mother = new Mother();
  this.back = new BackMaker();
  this.address = require(`${process.cwd()}/apps/infoObj.js`);
  this.host = this.address.secondinfo.host;
  this.mongo = MONGOC;
  this.mongolocal = MONGOLOCALC;
  this.timeouts = {};
  this.sheets = new GoogleSheet();
  this.drive = new GoogleDrive();

  this.slack_userToken = slack_userToken;
  this.slack_bot = slack_bot;
  this.slack_user = slack_user;
  this.slack_info = slack_info;

  this.secondPort = this.address.officeinfo.ghost.second.port;
  this.secondHost = this.address.officeinfo.ghost.host + ":" + String(this.secondPort);

  this.vaildHost = [
    this.address.frontinfo.host,
    this.address.secondinfo.host,
    this.address.transinfo.host,
    this.address.backinfo.host,
    this.address.pythoninfo.host,
    this.address.testinfo.host,
    this.address.croninfo.host,
    this.address.officeinfo.ghost.host,
    "home-liaison.servehttp.com",
    "localhost:3000",
    "192.168.0.14:3000",
  ];

  this.telegram = telegram;
}

SecondRouter.prototype.baseMaker = function (target, req = null) {
  const instance = this;
  let html;

  html = `<!DOCTYPE html>
  <html lang="ko" dir="ltr">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no,user-scalable=no">
      <title>HomeLiaison Second Ghost: ${target}</title>
      <style></style>
    </head>
    <body>
      <div id="totalcontents"></div>
      <script src="${target}.js"></script>
    </body>
  </html>`;

  return new Promise(function(resolve, reject) {
    resolve(html);
  });
}

SecondRouter.prototype.fireWall = function (req) {
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

SecondRouter.prototype.telegramSend = async function (chat_id, text) {
  const instance = this;
  const { telegram } = this;
  const { ajaxJson, sleep, errorLog } = this.mother;
  try {
    let result;
    
    result = true;

    try {
      await ajaxJson({ chat_id, text }, telegram.url(telegram.token));
    } catch (e) {
      await sleep(100);
      try {
        await ajaxJson({ chat_id, text }, telegram.url(telegram.token));
      } catch (e) {
        await sleep(500);
        try {
          await ajaxJson({ chat_id, text }, telegram.url(telegram.token));
        } catch (e) {
          await sleep(1000);
          try {
            await ajaxJson({ chat_id, text }, telegram.url(telegram.token));
          } catch (e) {
            await sleep(1500);
            try {
              await ajaxJson({ chat_id, text }, telegram.url(telegram.token));
            } catch (e) {
              await sleep(3000);
              try {
                await ajaxJson({ chat_id, text }, telegram.url(telegram.token));
              } catch (e) {
                result = false;
              }
            }
          }
        }
      }
    }
    return result;
  } catch (e) {
    errorLog("SecondRouter.prototype.telegramSend error : " + e.message).catch((err) => { console.log(err) });
    return false;
  }
}

//GET ---------------------------------------------------------------------------------------------

SecondRouter.prototype.rou_get_First = function () {
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
      let disk;

      if (req.params.id === "ssl") {
        disk = await diskReading();
        res.send(JSON.stringify({ disk: disk.toArray() }));
      } else if (req.params.id === "disk") {
        disk = await diskReading();
        res.send(JSON.stringify({ disk: disk.toArray() }));
      } else {
        res.send(JSON.stringify({ message: "hi" }));
      }

    } catch (e) {
      errorLog("Second Ghost 서버 문제 생김 (rou_get_First): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
    }
  }

  return obj;
}

//POST ---------------------------------------------------------------------------------------------

SecondRouter.prototype.rou_post_messageLog = function () {
  const instance = this;
  const { telegram, slack_info } = this;
  const { requestSystem, ajaxJson, equalJson, sleep } = this.mother;
  let obj;
  obj = {};
  obj.link = [ "/messageLog" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.text === undefined || req.body.channel === undefined || req.body.collection === undefined) {
        throw new Error("invaild post, must be text, channel");
      }
      const { text, channel, collection } = req.body;
      let thisChannel;
      let slackText;
      let keyArr, valueArr;
      let targetArr;
      let tempName;
      let foundNames;
      let finalTargets;

      slackText = text;
      if (Array.isArray(equalJson(req.body).target)) {

        targetArr = equalJson(req.body).target;

        keyArr = Object.keys(slack_info.userDictionary);
        valueArr = [];
        for (let i = 0; i < keyArr.length; i++) {
          valueArr.push(slack_info.userDictionary[keyArr[i]]);
        }

        foundNames = [];
        for (let name of targetArr) {
          tempName = valueArr.findIndex((n) => { return n === name });
          if (tempName !== -1) {
            foundNames.push(tempName);
          }
        }
        foundNames = foundNames.map((index) => { return keyArr[index] }).map((id) => {
          return `<@${id}>`;
        });

        finalTargets = '';
        if (foundNames.length > 0) {
          finalTargets = foundNames.join(" ");
        }

        slackText = finalTargets + " " + text;

      }

      instance.slack_bot.chat.postMessage({ text: slackText, channel: (channel === "silent" ? "#error_log" : channel) }).catch((err) => { console.log(err); });

      if (req.body.voice === true || req.body.voice === "true") {
        requestSystem("https://" + instance.address.officeinfo.ghost.host + ":" + String(3000) + "/textToVoice", { text }, { headers: { "Content-Type": "application/json" } }).catch((err) => { console.log(err); });
      }

      if (/silent/gi.test(channel) || /error_log/gi.test(channel)) {
        thisChannel = "log";
      } else if (/consulting/gi.test(channel)) {
        thisChannel = "consulting";
      } else if (/operation/gi.test(channel)) {
        thisChannel = "operation";
      } else if (/proposal/gi.test(channel)) {
        thisChannel = "proposal";
      } else if (/mail/gi.test(channel)) {
        thisChannel = "mail";
      } else if (/taxbill/gi.test(channel)) {
        thisChannel = "taxbill";
      } else if (/console/gi.test(channel)) {
        thisChannel = "console";
      } else {
        thisChannel = "general";
      }

      await instance.telegramSend(telegram.bot[thisChannel], `(${channel}) ${slackText}`);

      res.send(JSON.stringify({ message: "done" }));
    } catch (e) {
      instance.mother.errorLog("Second Ghost 서버 문제 생김 (rou_post_messageLog): " + JSON.stringify(req.body) + " " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

SecondRouter.prototype.rou_post_emergencyAlarm = function () {
  const instance = this;
  const { telegram } = this;
  const { requestSystem, ajaxJson, sleep } = this.mother;
  let obj;
  obj = {};
  obj.link = [ "/emergencyAlarm" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.text === undefined) {
        throw new Error("invaild post, must be text");
      }
      const { text } = req.body;
      const channel = "#emergency_alarm";

      await instance.slack_bot.chat.postMessage({ text, channel });
      await instance.telegramSend(telegram.bot["emergency"], `(${channel}) ${text}`);

      res.send(JSON.stringify({ message: "done" }));
    } catch (e) {
      instance.mother.errorLog("Second Ghost 서버 문제 생김 (rou_post_emergencyAlarm): " + JSON.stringify(req.body) + " " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

SecondRouter.prototype.rou_post_parsingCall = function () {
  const instance = this;
  const back = this.back;
  const { requestSystem, messageSend, errorLog, messageLog } = this.mother;
  const jsdom = require("jsdom");
  const { JSDOM } = jsdom;
  let obj = {};
  obj.link = [ "/parsingCall" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    const outerUrl = "http://www.moyaweb.com/search_result.do";
    try {
      if (req.body.phoneNumber === undefined) {
        console.log(req.body);
        res.send(JSON.stringify({ error: "error" }));
      } else {
        const selfMongo = instance.mongo;
        const { phoneNumber, kind } = req.body;
        const method = (kind === '1' ? "전화" : "문자");
        let client;
        let rows, temp, name, sub, text;
        let manager;
        let desid, proid;
        let projects;
        let boo;
        let outerResponse;
        let entireDom, resultDom, findName;
        let builders;

        if (!/^2/.test(phoneNumber)) {
          manager = null;
          rows = await back.getClientsByQuery({ phone: phoneNumber }, { selfMongo });
          if (rows.length === 0) {
            rows = await back.getDesignersByQuery({ "information.phone": phoneNumber }, { selfMongo });
            if (rows.length === 0) {
              temp = await back.setMemberObj({ selfMongo, getMode: true });
              rows = [];
              for (let obj of temp) {
                if (obj.phone === phoneNumber) {
                  rows.push(obj);
                }
              }
              if (rows.length === 0) {
                name = "알 수 없는";
                sub = "사람";
              } else {
                name = rows[0].name;
                sub = "팀원";
              }
            } else {
              name = rows[0].designer;
              sub = "실장님";
            }
          } else {
            client = rows[0];
            name = client.name;
            sub = "고객님";
          }
          text = `${name} ${sub}에게서 ${method}가 왔습니다!`;

          if (name.trim() === "알 수 없는") {
            builders = await back.getBuildersByQuery({ "information.phone": phoneNumber }, { selfMongo });
            if (builders.length > 0) {
              text = `${builders[0].builder} 시공 소장님께 ${method}가 왔습니다!`;
            } else {
              text = `알 수 없는 사람(${phoneNumber})으로부터 ${method}가 왔습니다!`
            }
            if (/^알 수 없는/gi.test(text)) {
              rows = await back.getAspirantsByQuery({ phone: phoneNumber }, { selfMongo });
              if (rows.length === 0) {
                outerResponse = await requestSystem(outerUrl, { SCH_TEL_NO: String(phoneNumber).replace(/[^0-9]/gi, '') }, { headers: { "Content-Type": "application/x-www-form-urlencoded" } });
                entireDom = new JSDOM(outerResponse.data);
                resultDom = entireDom.window.document.getElementById("result_phone_text");
                if (resultDom !== null) {
                  findName = resultDom.textContent.trim();
                  text = `${findName}에서 ${method}가 왔습니다!`;
                }
              } else {
                text = `${rows[0].designer} 디자이너 신청자로부터 ${method}가 왔습니다!`;
              }
            }
          }
          await messageSend({ text, channel: "#call", voice: true });
        }
        res.send(JSON.stringify({ message: "success" }));
      }
    } catch (e) {
      instance.mother.errorLog("Second Ghost 서버 문제 생김 (rou_post_parsingCall): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

SecondRouter.prototype.rou_post_receiveCall = function () {
  const instance = this;
  const back = this.back;
  const { requestSystem, messageSend, fileSystem, setQueue, sleep, shellExec, shellLink, errorLog, messageLog } = this.mother;
  let obj = {};
  obj.link = [ "/receiveCall" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.sender === undefined || req.body.kind === undefined) {
        console.log(req.body);
        res.send(JSON.stringify({ error: "error" }));
      } else {
        const { sender, kind, ip } = req.body;
        const timeoutConst = "receiveCall";
        let phoneNumber, senderArr;
        let part0, part1, part2;

        senderArr = sender.split('');
        phoneNumber = '';
        part0 = '';
        part1 = '';
        part2 = '';
        if (/^01/gi.test(sender)) {
          for (let i = 0; i < 3; i++) {
            part0 += senderArr.shift();
          }
          for (let i = 0; i < 4; i++) {
            part2 = senderArr.pop() + part2;
          }
          part1 = senderArr.join('');
          phoneNumber = part0 + '-' + part1 + '-' + part2;
        } else if (/^02/gi.test(sender)) {
          for (let i = 0; i < 2; i++) {
            part0 += senderArr.shift();
          }
          for (let i = 0; i < 4; i++) {
            part2 = senderArr.pop() + part2;
          }
          part1 = senderArr.join('');
          phoneNumber = part0 + '-' + part1 + '-' + part2;
        } else {
          for (let i = 0; i < 3; i++) {
            part0 += senderArr.shift();
          }
          for (let i = 0; i < 4; i++) {
            part2 = senderArr.pop() + part2;
          }
          part1 = senderArr.join('');
          phoneNumber = part0 + '-' + part1 + '-' + part2;
        }

        if (instance.timeouts[timeoutConst] !== undefined || instance.timeouts[timeoutConst] !== null) {
          clearTimeout(instance.timeouts[timeoutConst]);
        }
        instance.timeouts[timeoutConst] = setTimeout(async () => {
          try {
            await fileSystem(`writeJson`, [ `${process.cwd()}/temp/${timeoutConst}.json`, { phoneNumber, kind } ]);
            setQueue(async () => {
              try {
                await sleep(Math.round(1000 * Math.random()));
                if (await fileSystem(`exist`, [ `${process.cwd()}/temp/${timeoutConst}.json` ])) {
                  const { phoneNumber, kind } = await fileSystem(`readJson`, [ `${process.cwd()}/temp/${timeoutConst}.json` ]);
                  await shellExec(`rm`, [ `-rf`, `${process.cwd()}/temp/${timeoutConst}.json` ]);
                  await requestSystem("https://" + instance.address.secondinfo.host + ":3000/parsingCall", { phoneNumber, kind }, { headers: { "Content-Type": "application/json" } });
                }
              } catch (e) {
                throw new Error(e.message);
              }
            }, 300);
            clearTimeout(instance.timeouts[timeoutConst]);
            instance.timeouts[timeoutConst] = null;
          } catch (e) {
            console.log(e);
          }
        }, 600);

        res.send(JSON.stringify({ message: "success" }));
      }
    } catch (e) {
      instance.mother.errorLog("Second Ghost 서버 문제 생김 (rou_post_receiveCall): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

SecondRouter.prototype.rou_post_clickDial = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const { requestSystem, messageSend, fileSystem, setQueue, sleep, shellExec, shellLink, errorLog, messageLog } = this.mother;
  const querystring = require("querystring");
  let obj = {};
  obj.link = [ "/clickDial" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.id === undefined || req.body.destnumber === undefined) {
        throw new Error("invaild post");
      }
      const url = "https://centrex.uplus.co.kr/RestApi/clickdial";
      let query, phone;
      query = { id: req.body.id, pass: address.officeinfo.phone.password, destnumber: req.body.destnumber.replace(/[^0-9]/g, '') };
      requestSystem(url + "?" + querystring.stringify(query), query, { headers: { "Content-Type": "application/json" } }).catch((err) => {
        errorLog("Ghost error (rou_post_clickDial) : " + "전화 거는 도중 문제 생김 => " + err.message).catch((er) => { console.log(er); });
      });
      res.send(JSON.stringify({ message: "hello?" }));

    } catch (e) {
      instance.mother.errorLog("Second Ghost 서버 문제 생김 (rou_post_clickDial): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

SecondRouter.prototype.rou_post_getDocuments = function () {
  const instance = this;
  const back = this.back;
  const { equalJson } = this.mother;
  let obj = {};
  obj.link = [ "/getClients", "/getDesigners", "/getProjects", "/getContents", "/getBuilders" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (!instance.fireWall(req)) {
        throw new Error("post ban");
      }
      if (req.body.whereQuery === undefined) {
        throw new Error("invaild post");
      }

      const selfMongo = instance.mongo;
      const { whereQuery } = equalJson(req.body);
      let rows;

      if (typeof whereQuery !== "object" || whereQuery === null) {
        throw new Error("invaild query object");
      }
      if (Object.keys(whereQuery).length === 0) {
        throw new Error("query ban");
      }

      if (req.url === "/getClients") {
        rows = await back.getClientsByQuery(whereQuery, { selfMongo });
      } else if (req.url === "/getDesigners") {
        rows = await back.getDesignersByQuery(whereQuery, { selfMongo });
      } else if (req.url === "/getProjects") {
        rows = await back.getProjectsByQuery(whereQuery, { selfMongo });
      } else if (req.url === "/getContents") {
        rows = await back.getContentsArrByQuery(whereQuery, { selfMongo });
      } else if (req.url === "/getBuilders") {
        rows = await back.getBuildersByQuery(whereQuery, { selfMongo });
      }

      res.send(JSON.stringify(rows.toNormal()));

    } catch (e) {
      instance.mother.errorLog("Second Ghost 서버 문제 생김 (rou_post_getDocuments): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

SecondRouter.prototype.rou_post_updateDocument = function () {
  const instance = this;
  const back = this.back;
  const { equalJson, errorLog, messageLog, messageSend } = this.mother;
  let obj = {};
  obj.link = [ "/updateClient", "/updateDesigner", "/updateProject", "/updateContents", "/updateAspirant" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (!instance.fireWall(req)) {
        throw new Error("post ban");
      }
      if (req.body.whereQuery === undefined || req.body.updateQuery === undefined) {
        throw new Error("invaild post");
      }

      const selfMongo = instance.mongo;
      const { whereQuery, updateQuery } = equalJson(req.body);
      let data;

      if (typeof whereQuery !== "object" || whereQuery === null) {
        throw new Error("invaild query object");
      }
      if (Object.keys(whereQuery).length === 0) {
        throw new Error("query ban");
      }
      if (typeof updateQuery !== "object" || updateQuery === null) {
        throw new Error("invaild query object");
      }

      if (req.url === "/updateClient") {
        data = await back.updateClient([ whereQuery, updateQuery ], { selfMongo });
      } else if (req.url === "/updateDesigner") {
        data = await back.updateDesigner([ whereQuery, updateQuery ], { selfMongo });
      } else if (req.url === "/updateProject") {
        data = await back.updateProject([ whereQuery, updateQuery ], { selfMongo });
      } else if (req.url === "/updateContents") {
        data = await back.updateContents([ whereQuery, updateQuery ], { selfMongo });
      } else if (req.url === "/updateAspirant") {
        data = await back.updateAspirant([ whereQuery, updateQuery ], { selfMongo });
      }

      res.send(JSON.stringify({ message: data }));

    } catch (e) {
      instance.mother.errorLog("Second Ghost 서버 문제 생김 (rou_post_updateDocument): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

SecondRouter.prototype.rou_post_designerProjects = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const { requestSystem, messageSend, fileSystem, setQueue, sleep, shellExec, shellLink, errorLog, messageLog } = this.mother;
  const querystring = require("querystring");
  let obj = {};
  obj.link = [ "/designerProjects" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (!instance.fireWall(req)) {
        throw new Error("post ban");
      }
      if (req.body.desid === undefined) {
        throw new Error("invaild post");
      }
      const selfMongo = instance.mongo;
      const { desid } = req.body;
      const designer = await back.getDesignerById(desid, { selfMongo });
      const totalProject = await back.getProjectsByQuery({
        $or: [
          {
            "proposal.detail": {
              $elemMatch: { desid }
            }
          },
          {
            desid: desid
          }
        ]
      }, { selfMongo });
      let contractProjects, proposalProjects;
      let totalClient;
      let cliidArr;

      contractProjects = totalProject.toNormal().filter((obj) => {
        return obj.desid === desid;
      });
      proposalProjects = totalProject.toNormal().filter((obj) => {
        return obj.proposal.detail.some((o) => { return o.desid === desid });
      });

      cliidArr = contractProjects.map((obj) => { return obj.cliid }).concat(proposalProjects.map((obj) => { return obj.cliid }));
      cliidArr = [ ...new Set(cliidArr) ];
      cliidArr = cliidArr.map((cliid) => { return { cliid } });
      if (cliidArr.length === 0) {
        totalClient = [];
      } else {
        totalClient = (await back.getClientsByQuery({ $or: cliidArr }, { selfMongo })).toNormal();
      }

      res.send(JSON.stringify({ totalClient, contractProjects, proposalProjects, designer: designer.toNormal() }));

    } catch (e) {
      instance.mother.errorLog("Second Ghost 서버 문제 생김 (rou_post_designerProjects): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

SecondRouter.prototype.rou_post_getChecklist = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const { requestSystem, messageSend, fileSystem, setQueue, sleep, shellExec, shellLink, errorLog, messageLog } = this.mother;
  let obj = {};
  obj.link = [ "/getChecklist" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (!instance.fireWall(req)) {
        throw new Error("post ban");
      }
      const selfMongo = instance.mongo;
      const collection = "service";
      const services = await back.mongoRead(collection, { kind: "checklist" }, { selfMongo });
      let contents;

      services.sort((a, b) => { return Number(a.serid.replace(/[^0-9]/gi, '')) - Number(b.serid.replace(/[^0-9]/gi, '')) });

      contents = services.map((obj) => {
        return {
          title: obj.setting.contents.title,
          key: obj.key,
          target: obj.setting.target.action,
          checklist: obj.setting.contents.checklist,
          children: obj.setting.children,
        }
      });

      res.send(JSON.stringify(contents));

    } catch (e) {
      instance.mother.errorLog("Second Ghost 서버 문제 생김 (rou_post_getChecklist): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

SecondRouter.prototype.rou_post_projectDesignerMemo = function () {
  const instance = this;
  const back = this.back;
  const { requestSystem, messageSend, fileSystem, setQueue, sleep, shellExec, shellLink, errorLog, messageLog } = this.mother;
  let obj = {};
  obj.link = [ "/projectDesignerMemo" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (!instance.fireWall(req)) {
        throw new Error("post ban");
      }
      if (req.body.mode === undefined || req.body.desid === undefined || req.body.proid === undefined || req.body.key === undefined || req.body.memo === undefined) {
        throw new Error("invaild post");
      }
      const selfMongo = instance.mongolocal;
      const collection = "projectDesignerMemo";
      const { mode, desid, proid, key, memo } = req.body;
      let resultObj;
      let rows;
      let json;
      let id;

      id = proid + "_" + key;
      json = {
        proid,
        desid,
        key: id,
        contents: {
          memo,
          type: key,
        }
      };

      if (mode === "get") {

        rows = await back.mongoRead(collection, { key: id }, { selfMongo });
        if (rows.length === 0) {
          await back.mongoCreate(collection, json, { selfMongo });
          resultObj = json;
        } else {
          resultObj = rows[0];
        }

      } else if (mode === "update") {

        rows = await back.mongoRead(collection, { key: id }, { selfMongo });
        if (rows.length === 0) {
          await back.mongoCreate(collection, json, { selfMongo });
        } else {
          await back.mongoUpdate(collection, [ { key: id }, { "contents.memo": memo } ], { selfMongo });
        }

        resultObj = { message: "success" };
      }

      res.send(JSON.stringify(resultObj));

    } catch (e) {
      instance.mother.errorLog("Second Ghost 서버 문제 생김 (rou_post_projectDesignerMemo): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

SecondRouter.prototype.rou_post_projectDesignerRaw = function () {
  const instance = this;
  const back = this.back;
  const { requestSystem, messageSend, fileSystem, setQueue, sleep, shellExec, shellLink, errorLog, messageLog } = this.mother;
  let obj = {};
  obj.link = [ "/projectDesignerRaw" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (!instance.fireWall(req)) {
        throw new Error("post ban");
      }
      if (req.body.mode === undefined || req.body.desid === undefined || req.body.cliid === undefined || req.body.proid === undefined) {
        throw new Error("invaild post");
      }
      const selfMongo = instance.mongolocal;
      const collection = "designerRawContents";
      const { mode, desid, proid, cliid } = req.body;
      let resultObj;
      let rows;
      let json;
      let body, type;

      if (typeof req.body.body === "string") {
        body = req.body.body;
      } else {
        body = "";
      }

      if (typeof req.body.type === "string") {
        type = req.body.type;
      } else {
        type = "docx";
      }

      json = {
        proid,
        desid,
        cliid,
        date: new Date(),
        contents: {
          body,
          type,
        }
      };

      if (mode === "get") {

        rows = await back.mongoRead(collection, { proid }, { selfMongo });
        if (rows.length === 0) {
          await back.mongoCreate(collection, json, { selfMongo });
          resultObj = json;
        } else {
          resultObj = rows[0];
        }

      } else if (mode === "update") {

        rows = await back.mongoRead(collection, { proid }, { selfMongo });
        if (rows.length === 0) {
          await back.mongoCreate(collection, json, { selfMongo });
        } else {
          await back.mongoUpdate(collection, [ { proid }, { "contents.body": body, "contents.type": type, "date": new Date() } ], { selfMongo });
        }

        resultObj = { message: "success" };
      }

      res.send(JSON.stringify(resultObj));

    } catch (e) {
      instance.mother.errorLog("Second Ghost 서버 문제 생김 (rou_post_projectDesignerRaw): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

SecondRouter.prototype.rou_post_projectDesignerSchedule = function () {
  const instance = this;
  const back = this.back;
  const { errorLog, equalJson, serviceParsing } = this.mother;
  let obj = {};
  obj.link = [ "/projectDesignerSchedule" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (!instance.fireWall(req)) {
        throw new Error("post ban");
      }
      if (req.body.mode === undefined || req.body.desid === undefined || req.body.proid === undefined) {
        throw new Error("invaild post");
      }
      const selfMongo = instance.mongolocal;
      const collection = "projectDesignerSchedule";
      const { mode, desid, proid } = req.body;
      let resultObj;
      let rows;
      let schedule;
      let createQuery;
      let whereQuery, updateQuery;
      let thisRow;
      let project;
      let originalContents;
      let startDate;
      let after7;
      let after14;
      let after21;
      let after28;
      let after35;
      let after42;
      let after49;
      let after56;
      let after63;
      let after70;

      if (mode === "get") {

        rows = await back.mongoRead(collection, { proid }, { selfMongo });
        resultObj = rows;

      } else if (mode === "create") {

        schedule = equalJson(req.body.schedule);
        createQuery = { proid, desid, schedule };
        await back.mongoCreate(collection, createQuery, { selfMongo });

        resultObj = createQuery;

      } else if (mode === "update") {

        whereQuery = equalJson(req.body.whereQuery);
        updateQuery = equalJson(req.body.updateQuery);

        await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo });
        
        thisRow = await back.mongoRead(collection, whereQuery, { selfMongo });

        if (thisRow.length === 0) {
          resultObj = { message: "error" };
        } else {
          resultObj = thisRow[0];
        }

      } else if (mode === "delete") {

        whereQuery = { proid };
        await back.mongoDelete(collection, whereQuery, { selfMongo });
        resultObj = { message: "success" };

      } else if (mode === "original") {

        project = await back.getProjectById(proid, { selfMongo: instance.mongo });

        startDate = new Date(JSON.stringify(project.process.contract.form.date.from).slice(1, -1));
        after7 = new Date(JSON.stringify(project.process.contract.form.date.from).slice(1, -1));
        after7.setDate(after7.getDate() + 7);
        after14 = new Date(JSON.stringify(project.process.contract.form.date.from).slice(1, -1));
        after14.setDate(after14.getDate() + 14);
        after21 = new Date(JSON.stringify(project.process.contract.form.date.from).slice(1, -1));
        after21.setDate(after21.getDate() + 21);
        after28 = new Date(JSON.stringify(project.process.contract.form.date.from).slice(1, -1));
        after28.setDate(after28.getDate() + 28);
        after35 = new Date(JSON.stringify(project.process.contract.form.date.from).slice(1, -1));
        after35.setDate(after35.getDate() + 35);
        after42 = new Date(JSON.stringify(project.process.contract.form.date.from).slice(1, -1));
        after42.setDate(after42.getDate() + 42);
        after49 = new Date(JSON.stringify(project.process.contract.form.date.from).slice(1, -1));
        after49.setDate(after49.getDate() + 49);
        after56 = new Date(JSON.stringify(project.process.contract.form.date.from).slice(1, -1));
        after56.setDate(after56.getDate() + 56);
        after63 = new Date(JSON.stringify(project.process.contract.form.date.from).slice(1, -1));
        after63.setDate(after63.getDate() + 63);
        after70 = new Date(JSON.stringify(project.process.contract.form.date.from).slice(1, -1));
        after70.setDate(after70.getDate() + 70);

        if (/홈퍼니싱/gi.test(serviceParsing(project.service))) {
          originalContents = {
            schedule: [
              {
                title: "현장 미팅",
                description: "현장에서 고객님과 미팅 후 실측과 스타일링의 방향을 정합니다.",
                date: {
                  start: project.process.contract.meeting.date,
                  end: project.process.contract.meeting.date,
                },
              },
              {
                title: "계약 시작일",
                description: "계약서상 프로젝트 시작일입니다. 본격적인 디자인 작업이 시작됩니다.",
                date: {
                  start: startDate,
                  end: startDate,
                },
              },
              {
                title: "컨셉 제안서",
                description: "전체적인 디자인 방향을 정할 컨셉 제안서 입니다.",
                date: {
                  start: startDate,
                  end: after7,
                },
              },
              {
                title: "1차 디자인 제안서",
                description: "컨셉을 바탕으로 구체적인 디자인 시안을 1차적으로 제공드립니다.",
                date: {
                  start: after7,
                  end: after14,
                },
              },
              {
                title: "제안서 수정 작업",
                description: "디자인 제안서의 수정 사항을 반영하여 수정 작업을 진행하는 기간입니다.",
                date: {
                  start: after14,
                  end: after21,
                },
              },
              {
                title: "제품 리스트",
                description: "디자인 제안서에 나와 있는 제품의 구체적인 리스트를 제공합니다.",
                date: {
                  start: after14,
                  end: after21,
                },
              },
              {
                title: "제품 구매 및 배송",
                description: "리스트에 나온 제품들을 실제로 구매하고 배송을 기다리는 기간입니다.",
                date: {
                  start: after21,
                  end: after28,
                },
              },
              {
                title: "제품 설치 및 세팅",
                description: "배송된 가구, 가전, 패브릭 등의 설치와 세팅이 진행되는 기간입니다.",
                date: {
                  start: after21,
                  end: after35,
                },
              },
            ]
          };
        } else if (/홈스타일링/gi.test(serviceParsing(project.service))) {
          originalContents = {
            schedule: [
              {
                title: "현장 미팅",
                description: "현장에서 고객님과 미팅 후 실측과 스타일링의 방향을 정합니다.",
                date: {
                  start: project.process.contract.meeting.date,
                  end: project.process.contract.meeting.date,
                },
              },
              {
                title: "계약 시작일",
                description: "계약서상 프로젝트 시작일입니다. 본격적인 디자인 작업이 시작됩니다.",
                date: {
                  start: startDate,
                  end: startDate,
                },
              },
              {
                title: "컨셉 제안서",
                description: "전체적인 디자인 방향을 정할 컨셉 제안서 입니다.",
                date: {
                  start: startDate,
                  end: after7,
                },
              },
              {
                title: "1차 디자인 제안서",
                description: "컨셉을 바탕으로 구체적인 디자인 시안을 1차적으로 제공드립니다.",
                date: {
                  start: after7,
                  end: after14,
                },
              },
              {
                title: "제안서 수정 작업",
                description: "디자인 제안서의 수정 사항을 반영하여 수정 작업을 진행하는 기간입니다.",
                date: {
                  start: after14,
                  end: after21,
                },
              },
              {
                title: "제품 리스트",
                description: "디자인 제안서에 나와 있는 제품의 구체적인 리스트를 제공합니다.",
                date: {
                  start: after14,
                  end: after21,
                },
              },
              {
                title: "시공 의뢰서",
                description: "구체적으로 어떤 시공을 어떻게 진행할 지에 대한 의뢰서입니다.",
                date: {
                  start: after14,
                  end: after21,
                },
              },
              {
                title: "시공 견적서",
                description: "시공 의뢰서를 바탕으로 정해진 시공 내역에 대한 견적서 입니다.",
                date: {
                  start: after21,
                  end: after28,
                },
              },
              {
                title: "시공 진행",
                description: "시공 의뢰서에 나온 시공 내역대로 실제 시공을 진행하는 기간입니다.",
                date: {
                  start: after28,
                  end: after49,
                },
              },
              {
                title: "제품 구매 및 배송",
                description: "리스트에 나온 제품들을 실제로 구매하고 배송을 기다리는 기간입니다.",
                date: {
                  start: after42,
                  end: after56,
                },
              },
              {
                title: "제품 설치 및 세팅",
                description: "배송된 가구, 가전, 패브릭 등의 설치와 세팅이 진행되는 기간입니다.",
                date: {
                  start: after49,
                  end: after56,
                },
              },
            ]
          };
        } else {
          originalContents = {
            schedule: [
              {
                title: "현장 미팅",
                description: "현장에서 고객님과 미팅 후 실측과 스타일링의 방향을 정합니다.",
                date: {
                  start: project.process.contract.meeting.date,
                  end: project.process.contract.meeting.date,
                },
              },
              {
                title: "계약 시작일",
                description: "계약서상 프로젝트 시작일입니다. 본격적인 디자인 작업이 시작됩니다.",
                date: {
                  start: startDate,
                  end: startDate,
                },
              },
              {
                title: "컨셉 제안서",
                description: "전체적인 디자인 방향을 정할 컨셉 제안서 입니다.",
                date: {
                  start: startDate,
                  end: after7,
                },
              },
              {
                title: "1차 디자인 제안서",
                description: "컨셉을 바탕으로 구체적인 디자인 시안을 1차적으로 제공드립니다.",
                date: {
                  start: after7,
                  end: after14,
                },
              },
              {
                title: "제안서 수정 작업",
                description: "디자인 제안서의 수정 사항을 반영하여 수정 작업을 진행하는 기간입니다.",
                date: {
                  start: after14,
                  end: after21,
                },
              },
              {
                title: "제품 리스트",
                description: "디자인 제안서에 나와 있는 제품의 구체적인 리스트를 제공합니다.",
                date: {
                  start: after14,
                  end: after21,
                },
              },
              {
                title: "시공 의뢰서",
                description: "구체적으로 어떤 시공을 어떻게 진행할 지에 대한 의뢰서입니다.",
                date: {
                  start: after14,
                  end: after21,
                },
              },
              {
                title: "시공 견적서",
                description: "시공 의뢰서를 바탕으로 정해진 시공 내역에 대한 견적서 입니다.",
                date: {
                  start: after21,
                  end: after28,
                },
              },
              {
                title: "시공 진행",
                description: "시공 의뢰서에 나온 시공 내역대로 실제 시공을 진행하는 기간입니다.",
                date: {
                  start: after28,
                  end: after56,
                },
              },
              {
                title: "제품 구매 및 배송",
                description: "리스트에 나온 제품들을 실제로 구매하고 배송을 기다리는 기간입니다.",
                date: {
                  start: after42,
                  end: after63,
                },
              },
              {
                title: "제품 설치 및 세팅",
                description: "배송된 가구, 가전, 패브릭 등의 설치와 세팅이 진행되는 기간입니다.",
                date: {
                  start: after56,
                  end: after70,
                },
              },
            ]
          };
        }

        resultObj = originalContents;

      }

      res.send(JSON.stringify(resultObj));

    } catch (e) {
      errorLog("Second Ghost 서버 문제 생김 (rou_post_projectDesignerSchedule): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

SecondRouter.prototype.rou_post_projectDesignerStatus = function () {
  const instance = this;
  const back = this.back;
  const { errorLog, equalJson, serviceParsing } = this.mother;
  let obj = {};
  obj.link = [ "/projectDesignerStatus" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (!instance.fireWall(req)) {
        throw new Error("post ban");
      }
      if (req.body.mode === undefined || req.body.desid === undefined || req.body.proid === undefined) {
        throw new Error("invaild post");
      }
      const selfMongo = instance.mongolocal;
      const collection = "projectDesignerStatus";
      const { mode, desid, proid } = req.body;
      let rows;
      let resultObj;
      let project;
      let defaultObj;
      let matrix;

      resultObj = { message: "done" };

      project = (await back.getProjectById(proid, { selfMongo: instance.mongo })).toNormal();

      defaultObj = [
        {
          title: "디자인",
          children: [
            {
              title: "현장 미팅 완료",
              deactive: false,
              value: 0,
              children: [
                {
                  title: "현장 사진 업로드",
                  type: "upload",
                  key: "firstPhoto",
                  photo: true,
                },
                {
                  title: "현장 사진 메모",
                  type: "memo",
                  key: "firstPhoto",
                },
              ],
            },
            {
              title: "일정표 공유됨",
              deactive: false,
              value: 0,
              children: [
                {
                  title: "일정표 업로드",
                  type: "upload",
                  key: "scheduleInfo",
                  photo: true,
                },
                {
                  title: "일정표 메모",
                  type: "memo",
                  key: "scheduleInfo",
                },
              ],
            },
            {
              title: "컨셉 제안서 공유됨",
              deactive: false,
              value: 0,
              children: [
                {
                  title: "컨셉 제안서 업로드",
                  type: "upload",
                  key: "designProposal",
                  photo: false,
                },
                {
                  title: "컨셉 제안서 메모",
                  type: "memo",
                  key: "designProposal",
                },
              ],
            },
            {
              title: "1차 디자인 제안서 공유됨",
              deactive: false,
              value: 0,
              children: [
                {
                  title: "디자인 제안서 업로드",
                  type: "upload",
                  key: "designDevelop",
                  photo: false,
                },
                {
                  title: "디자인 제안서 메모",
                  type: "memo",
                  key: "designDevelop",
                },
              ],
            },
            {
              title: "수정 제안서 공유됨",
              deactive: false,
              value: 0,
              children: [
                {
                  title: "디자인 제안서 업로드",
                  type: "upload",
                  key: "designDevelop",
                  photo: false,
                },
                {
                  title: "디자인 제안서 메모",
                  type: "memo",
                  key: "designDevelop",
                },
              ],
            },
            {
              title: "제품 리스트 공유됨",
              deactive: false,
              value: 0,
              children: [
                {
                  title: "제품 리스트 업로드",
                  type: "upload",
                  key: "productList",
                  photo: false,
                },
                {
                  title: "제품 리스트 메모",
                  type: "memo",
                  key: "productList",
                },
              ],
            },
            {
              title: "디자인 제안서 최종 컨펌",
              deactive: false,
              value: 0,
              children: [
                {
                  title: "최종 완료 메모",
                  type: "memo",
                  key: "finalDesign",
                },
              ],
            },
          ]
        },
        {
          title: "시공",
          children: [
            {
              title: "시공 의뢰서 공유됨",
              deactive: /퍼니싱/gi.test(serviceParsing(project.service)),
              value: 0,
              children: [
                {
                  title: "시공 의뢰서 업로드",
                  type: "upload",
                  key: "constructInfo",
                  photo: false,
                },
                {
                  title: "시공 의뢰서 메모",
                  type: "memo",
                  key: "constructInfo",
                },
              ],
            },
            {
              title: "시공 견적서 공유됨",
              deactive: /퍼니싱/gi.test(serviceParsing(project.service)),
              value: 0,
              children: [
                {
                  title: "시공 견적서 업로드",
                  type: "upload",
                  key: "constructEstimate",
                  photo: false,
                },
                {
                  title: "시공 견적서 메모",
                  type: "memo",
                  key: "constructEstimate",
                },
              ],
            },
            {
              title: "시공사 선택 완료",
              deactive: /퍼니싱/gi.test(serviceParsing(project.service)),
              value: 0,
              children: [
                {
                  title: "홈리에종 시공사",
                  type: "selection",
                  value: 0,
                },
                {
                  title: "디자이너 시공사",
                  type: "selection",
                  value: 0,
                },
                {
                  title: "고객 시공사",
                  type: "selection",
                  value: 0,
                },
              ]
            },
            {
              title: "공정표 공유됨",
              deactive: /퍼니싱/gi.test(serviceParsing(project.service)),
              value: 0,
              children: [
                {
                  title: "시공 공정표 메모",
                  type: "memo",
                  key: "constructSchedule",
                },
              ],
            },
            {
              title: "시공 착수",
              deactive: /퍼니싱/gi.test(serviceParsing(project.service)),
              value: 0,
              children: [
                {
                  title: "시공 착수 메모",
                  type: "memo",
                  key: "constructStart",
                },
              ],
            },
            {
              title: "시공 진행중",
              deactive: /퍼니싱/gi.test(serviceParsing(project.service)),
              value: 0,
              children: [
                {
                  title: "시공 진행 메모",
                  type: "memo",
                  key: "constructProgress",
                },
              ],
            },
            {
              title: "시공 완료",
              deactive: /퍼니싱/gi.test(serviceParsing(project.service)),
              value: 0,
              children: [
                {
                  title: "시공 사진 업로드",
                  type: "upload",
                  key: "middlePhoto",
                  photo: true,
                },
                {
                  title: "시공 사진 메모",
                  type: "memo",
                  key: "middlePhoto",
                },
              ],
            },
            {
              title: "시공 AS 완료",
              deactive: /퍼니싱/gi.test(serviceParsing(project.service)),
              value: 0,
              children: [
                {
                  title: "시공 AS 메모",
                  type: "memo",
                  key: "constructFinal",
                },
              ],
            },
          ]
        },
        {
          title: "구매",
          children: [
            {
              title: "제품 구매 시작 전",
              deactive: false,
              value: 0,
              children: [
                {
                  title: "제품 리스트 업로드",
                  type: "upload",
                  key: "productList",
                  photo: false,
                },
                {
                  title: "제품 리스트 메모",
                  type: "memo",
                  key: "productList",
                },
              ],
            },
            {
              title: "제품 구매 진행중",
              deactive: false,
              value: 0,
              children: [
                {
                  title: "제품 구매 메모",
                  type: "memo",
                  key: "productPurchase",
                }
              ]
            },
            {
              title: "구매 완료, 배송중",
              deactive: false,
              value: 0,
              children: [
                {
                  title: "배송중 메모",
                  type: "memo",
                  key: "productProgress",
                }
              ]
            },
            {
              title: "배송 및 세팅 완료",
              deactive: false,
              value: 0,
              children: [
                {
                  title: "제품 배치도 업로드",
                  type: "upload",
                  key: "settingGuide",
                  photo: false,
                },
                {
                  title: "제품 배치도 메모",
                  type: "memo",
                  key: "settingGuide",
                },
              ]
            },
          ]
        },
        {
          title: "세팅",
          children: [
            {
              title: "촬영 여부 확인",
              deactive: false,
              value: 0,
              children: [
                {
                  title: "촬영 진행 희망",
                  type: "selection",
                  value: 0,
                },
                {
                  title: "촬영 진행 안 함",
                  type: "selection",
                  value: 0,
                }
              ]
            },
            {
              title: "촬영일 확인 완료",
              deactive: false,
              value: 0,
              children: [
                {
                  title: "촬영일 메모",
                  type: "memo",
                  key: "contentsPhoto",
                }
              ]
            },
            {
              title: "세팅 및 촬영 완료",
              deactive: false,
              value: 0,
              children: [
                {
                  title: "세팅 관련 메모",
                  type: "memo",
                  key: "projectFinal",
                }
              ]
            },
          ]
        },
      ];

      if (mode === "get") {

        rows = await back.mongoRead(collection, { proid }, { selfMongo });
        if (rows.length === 0) {
          resultObj = equalJson(JSON.stringify(defaultObj));
          await back.mongoCreate(collection, {
            proid, desid, matrix: defaultObj
          }, { selfMongo });
        } else {
          resultObj = rows[0].matrix;
        }

      } else if (mode === "update") {

        matrix = equalJson(req.body.matrix);
        rows = await back.mongoRead(collection, { proid }, { selfMongo });
        if (rows.length === 0) {
          await back.mongoCreate(collection, {
            proid, desid, matrix
          }, { selfMongo });
        } else {
          await back.mongoUpdate(collection, [
            { proid },
            { matrix }
          ], { selfMongo });
        }

        resultObj = { message: "done" };

      }

      res.send(JSON.stringify(resultObj));

    } catch (e) {
      errorLog("Second Ghost 서버 문제 생김 (rou_post_projectDesignerStatus): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

SecondRouter.prototype.rou_post_voice = function () {
  const instance = this;
  const address = this.address;
  const { requestSystem, messageSend, errorLog, messageLog } = this.mother;
  let obj = {};
  obj.link = [ "/voice" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.text === undefined) {
        throw new Error("invaild post");
      }
      requestSystem("https://" + address.officeinfo.ghost.host + ":3000/textToVoice", {
        text: req.body.text,
      }, {
        headers: { "Content-Type": "application/json" }
      }).catch((err) => { console.log(err); });
      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      instance.mother.errorLog("Second Ghost 서버 문제 생김 (rou_post_voice): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

SecondRouter.prototype.rou_post_receiptSend = function () {
  const instance = this;
  const back = this.back;
  const { secondHost } = this;
  const { requestSystem, messageSend, errorLog, messageLog } = this.mother;
  let obj = {};
  obj.link = [ "/receiptSend" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.amount === undefined || req.body.phone === undefined) {
        throw new Error("invaild post");
      }
      const { amount, phone } = req.body;
      requestSystem("https://" + secondHost + "/receiptSend", {
        amount,
        phone,
      }, {
        headers: { "Content-Type": "application/json" }
      }).catch((err) => { console.log(err); });
      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      instance.mother.errorLog("Second Ghost 서버 문제 생김 (rou_post_receiptSend): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

SecondRouter.prototype.rou_post_pageToPdf = function () {
  const instance = this;
  const address = this.address;
  const { requestSystem, messageSend, errorLog, messageLog } = this.mother;
  let obj = {};
  obj.link = [ "/pageToPdf" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const ghostResponse = await requestSystem("https://" + address.officeinfo.ghost.host + ":3000/pageToPdf", req.body, { headers: { "Content-Type": "application/json" } });
      res.send(JSON.stringify(ghostResponse.data));
    } catch (e) {
      instance.mother.errorLog("Second Ghost 서버 문제 생김 (rou_post_pageToPdf): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

SecondRouter.prototype.rou_post_printClient = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const { requestSystem, messageSend, errorLog, messageLog, equalJson } = this.mother;
  let obj = {};
  obj.link = [ "/printClient" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.cliid === undefined || req.body.curation === undefined) {
        throw new Error("invaild post");
      }
      const selfMongo = instance.mongo;
      const { cliid, curation } = equalJson(req.body);
      const client = await back.getClientById(cliid, { selfMongo, withTools: true });
      const indent = "    ";
      let text;

      text = client.toPrint();
      text += "\n";
      text += indent + "체크한 시공 : " + curation.construct.items.join(", ") + "\n\n";
      text += indent + "체크한 거주 환경 : " + (curation.construct.living ? "거주중" : "이사 예정") + "\n\n";

      requestSystem("https://" + address.officeinfo.ghost.host + ":3000/printText", { text }, { headers: { "Content-Type": "application/json" } }).catch((err) => { console.log(err); });

      res.send(JSON.stringify({ message: "will do" }));

    } catch (e) {
      instance.mother.errorLog("Second Ghost 서버 문제 생김 (rou_post_printClient): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

SecondRouter.prototype.rou_post_slackEvents = function () {
  const instance = this;
  const { slack_info: { userDictionary, channelDictionary }, telegram } = this;
  const { errorLog, messageLog, equalJson, ajaxJson, requestSystem } = this.mother;
  let obj = {};
  obj.link = [ "/slackEvents" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const thisBody = equalJson(req.body);
      let text;
      let thisChannel;
      
      if (typeof thisBody.event === "object") {
        if (thisBody.event.type === "message") {
          if (channelDictionary[thisBody.event.channel] !== undefined && userDictionary[thisBody.event.user] !== undefined) {
            text = `(${channelDictionary[thisBody.event.channel]}) ${userDictionary[thisBody.event.user]} : ${thisBody.event.text}`;
            thisChannel = "general";
            if (/notice/gi.test(channelDictionary[thisBody.event.channel])) {
              thisChannel = "notice";
            } else if (/operation/gi.test(channelDictionary[thisBody.event.channel])) {
              thisChannel = "operation";
            } else if (/request/gi.test(channelDictionary[thisBody.event.channel])) {
              thisChannel = "request";
            } else if (/plan/gi.test(channelDictionary[thisBody.event.channel])) {
              thisChannel = "plan";
            } else if (/clare/gi.test(channelDictionary[thisBody.event.channel])) {
              thisChannel = "clare";
            } else if (/jyeun/gi.test(channelDictionary[thisBody.event.channel])) {
              thisChannel = "jyeun";
            }
            ajaxJson({ chat_id: telegram.chat[thisChannel], text }, telegram.url(telegram.token)).catch((err) => {
              instance.mother.errorLog("Second Ghost 서버 문제 생김 (rou_post_slackEvents): " + err.message).catch((e) => { console.log(e); });
            });
          }
        } else if (thisBody.event.type === "app_home_opened") {
          console.log(thisBody.event.user)
        }
        
        res.send(JSON.stringify({ message: "OK" }));
      } else {
        res.send(JSON.stringify({ challenge: thisBody.challenge }));
      }
    } catch (e) {
      instance.mother.errorLog("Second Ghost 서버 문제 생김 (rou_post_slackEvents): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

SecondRouter.prototype.rou_post_telegramEvents = function () {
  const instance = this;
  const { slack_info: { userDictionary, channelDictionary }, telegram, slack_user } = this;
  const { errorLog, messageLog, equalJson, ajaxJson, requestSystem } = this.mother;
  let obj = {};
  obj.link = [ "/telegramEvents" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const thisBody = equalJson(req.body);
      if (typeof thisBody.message === "object" && thisBody.message !== null) {
        if (typeof thisBody.message.chat === "object") {
          const { text, chat: { id } } = thisBody.message;
          const keyArr = Object.keys(channelDictionary);
          let valueArr;
          let targetChannel;

          valueArr = [];
          for (let key of keyArr) {
            valueArr.push(channelDictionary[key]);
          }

          targetChannel = null;
          if (String(id) === telegram.chat.plan) {
            targetChannel = keyArr[valueArr.findIndex((str) => { return str === "plan" })];
          } else if (String(id) === telegram.chat.clare) {
            targetChannel = keyArr[valueArr.findIndex((str) => { return str === "clare" })];
          } else if (String(id) === telegram.chat.jyeun) {
            targetChannel = keyArr[valueArr.findIndex((str) => { return str === "jyeun" })];
          } else {
            targetChannel = null;
          }

          if (targetChannel !== null) {
            await slack_user.chat.postMessage({ text, channel: targetChannel });
          }

        }
      }
      res.send(JSON.stringify({ message: "OK" }));
    } catch (e) {
      instance.mother.errorLog("Second Ghost 서버 문제 생김 (rou_post_telegramEvents): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

SecondRouter.prototype.rou_post_rawImageParsing = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const { errorLog, ajaxJson } = this.mother;
  let obj = {};
  obj.link = [ "/rawImageParsing" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.mode === undefined) {
        throw new Error("invalid post");
      }
      const { mode } = req.body;
      const token = "__split__";
      const folderConst = "/corePortfolio/rawImage";
      const selfMongo = instance.mongo;
      let firstResult;
      let contentsArr;
      let proid;
      let finalResult;
      let temp;
      let thisPid;

      firstResult = await ajaxJson({ path: "/corePortfolio/rawImage" }, "https://" + instance.address.officeinfo.ghost.host + ":3000/readDir");
      firstResult = firstResult.filter((str) => { return /^[p]/.test(str) }).filter((str) => { return str.split(token).length >= 2 }).map((str) => {
        const [ proid, pidZip ] = str.split(token);
        const [ pid ] = pidZip.split(".");
        return { proid, pid }
      });
  
      if (mode === "list") {

        res.send(JSON.stringify(firstResult));

      } else if (mode === "get" || mode === "search" || mode === "proid") {

        if (req.body.proid === undefined) {
          throw new Error("invalid post");
        }

        finalResult = {};

        ({ proid } = req.body);
        contentsArr = await back.getContentsArrByQuery({ proid }, { selfMongo });

        finalResult.proid = proid;
        finalResult.raw = { exist: false, link: "" };
        finalResult.portfolio = { exist: false, link: "" };
        finalResult.review = { exist: false, link: "" };

        temp = firstResult.find((obj) => { return obj.proid === proid });
        if (temp !== undefined) {
          thisPid = temp.pid;
          finalResult.raw.exist = true;
          finalResult.raw.link = "https://" + address.officeinfo.ghost.host + folderConst + "/" + proid + token + thisPid + ".zip";
        }

        if (contentsArr.length > 0) {
          [ { contents: { portfolio: { pid: thisPid } } } ] = contentsArr;
          finalResult.portfolio.exist = true;
          finalResult.portfolio.link = "https://" + address.frontinfo.host + "/portdetail.php?pid=" + thisPid;
          if (contentsArr[0].contents.review.rid !== "" && !/re999/gi.test(contentsArr[0].contents.review.rid)) {
            finalResult.review.exist = true;
            finalResult.review.link = "https://" + address.frontinfo.host + "/revdetail.php?pid=" + thisPid;  
          }
        }

        res.send(JSON.stringify(finalResult));

      } else {
        throw new Error("invalid mode");
      }

    } catch (e) {
      await errorLog("Second Ghost 서버 문제 생김 (rou_post_rawImageParsing): " + e.message);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

SecondRouter.prototype.rou_post_rawContentsSync = function () {
  const instance = this;
  const back = this.back;
  const drive = this.drive;
  const { errorLog, emergencyAlarm } = this.mother;
  const rawcontentsSyncFunc = async function (MONGOLOCALC, MONGOC) {
    try {
      const targetDriveId0 = "1iqH3Ajbz5CB2jXIiMuDKTnc33e36laUr";
      const targetDriveId1 = "1k-vo9L_WB90ACup7WarklVIUFq1mf1ay";
      const targetDriveId2 = "1YuWV37wnTqe68nYqnn_oyu5j_p6SPuAe";
      const selfMongo = MONGOLOCALC;
      const selfCoreMongo = MONGOC;
      const collection = "designerRawContents";
      const bodyRows = await back.mongoRead(collection, {}, { selfMongo });
      const allProjects = await back.getProjectsByQuery({ desid: { $regex: "^d" } }, { selfMongo: selfCoreMongo });
      const targetProjects = allProjects.filter((project) => {
        return project.process.contract.remain.date.valueOf() > (new Date(2000, 0, 1)).valueOf()
      }).filter((project) => {
        return project.process.calculation.payments.first.date.valueOf() > (new Date(2000, 0, 1)).valueOf()
      });

      const allClients = await back.getClientsByQuery({ $or: targetProjects.map((p) => { return { cliid: p.cliid } }) }, { selfMongo: selfCoreMongo });
      const allDesigners = await back.getDesignersByQuery({ $or: targetProjects.map((p) => { return { desid: p.desid } }) }, { selfMongo: selfCoreMongo });
      let proidArr0, proidArr1;
      let targetProids;
      let filteredProjects;
      let nameArr;
      let driveFiles0, driveFiles1, driveFiles2;
      let nameTargets;
      let tempArr;
  
      proidArr0 = bodyRows.map((obj) => { return obj.proid });
      proidArr1 = targetProjects.map((obj) => { return obj.proid });
  
      targetProids = proidArr1.filter((proid) => { return !proidArr0.includes(proid) })
  
      filteredProjects = targetProjects.filter((project) => { return targetProids.includes(project.proid) }).filter((project) => {
        return project.process.status.value !== "드랍";
      })
  
      nameArr = [];
      for (let { proid, cliid, desid } of filteredProjects) {
        nameArr.push([
          allClients.find((client) => { return client.cliid === cliid }).name,
          allDesigners.find((designer) => { return designer.desid === desid }).designer,
          proid,
          cliid,
          desid,
        ]);
      }
  
      driveFiles0 = await drive.listFiles_inPython(targetDriveId0);
      driveFiles1 = await drive.listFiles_inPython(targetDriveId1);
      driveFiles2 = await drive.listFiles_inPython(targetDriveId2);
  
      nameTargets = [];
      nameTargets = nameTargets.concat(driveFiles0);
      nameTargets = nameTargets.concat(driveFiles1);
      nameTargets = nameTargets.concat(driveFiles2);
  
      for (let [ client, designer ] of nameArr) {
        tempArr = nameTargets.filter(({ name }) => { return (new RegExp(client, "gi")).test(name) }).filter(({ name }) => { return (new RegExp(designer, "gi")).test(name) })
        if (tempArr.length > 0) {
          await emergencyAlarm(JSON.stringify(tempArr, null, 2));
        }
      }

      await errorLog("raw contents sync done");

    } catch (e) {
      console.log(e);
    }
  }
  let obj = {};
  obj.link = [ "/rawContentsSync" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      rawcontentsSyncFunc(instance.mongolocal, instance.mongo).catch((err) => { console.log(err); });
      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      await errorLog("Second Ghost 서버 문제 생김 (rou_post_rawContentsSync): " + e.message);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

SecondRouter.prototype.rou_post_slackForm = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const { slack_info: { userDictionary, channelDictionary }, telegram } = this;
  const { errorLog, messageSend, equalJson, ajaxJson, requestSystem, dateToString } = this.mother;

  const divider = () => {
    return {
      "type": "divider"
    };
  }
  const header = (text) => {
    return {
      "type": "header",
      "text": {
        "type": "plain_text",
        "text": text,
        "emoji": true
      }
    }
  }
  const blank = () => {
    return {
      "type": "section",
      "text": {
        "type": "plain_text",
        "text": " ",
        "emoji": true
      }
    };
  }
  const blankDivider = () => {
    return [
      blank(),
      divider()
    ]
  }
  const linkButtonSection = (text, buttonText, buttonLink) => {
    return {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": text
      },
      "accessory": {
        "type": "button",
        "text": {
          "type": "plain_text",
          "text": buttonText,
          "emoji": true
        },
        "value": "click_me_123",
        "url": buttonLink,
        "action_id": "button-action"
      }
    }
  }
  const normalButtonSection = (text, buttonText, actionId, buttonValue) => {
    return {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": text
      },
      "accessory": {
        "type": "button",
        "text": {
          "type": "plain_text",
          "text": buttonText,
          "emoji": true
        },
        "value": buttonValue,
        "action_id": actionId
      }
    };
  }

  let obj = {};
  obj.link = [ "/slackForm", "/slackForm_rawPhoto" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const thisBody = equalJson(req.body);
      let modalJson, resultJson;
      let finalValues;
      let desid, triggerId;
      let thisDesigner;
      let allProjects;
      let processArr, stayArr;
      let targetArr;
      let buttonText;
      let allClients;
      let thisClient;

      resultJson = { "message": "done" };
      finalValues = {};

      if (req.url === "/slackForm_rawPhoto") {

        modalJson = {
          "trigger_id": (typeof thisBody.payload === "object" ? thisBody.payload.trigger_id : thisBody.trigger_id),
          "view": {
            "type": "modal",
            "callback_id": "rawPhoto",
            "title": {
              "type": "plain_text",
              "text": "원본 사진 링크 공유됨"
            },
            "blocks": [
              {
                "type": "input",
                "block_id": "client",
                "label": {
                  "type": "plain_text",
                  "text": "고객명",
                  "emoji": true
                },
                "optional": false,
                "dispatch_action": true,
                "element": {
                  "type": "plain_text_input",
                  "action_id": "clientInput",
                  "dispatch_action_config": {
                    "trigger_actions_on": [
                      "on_character_entered"
                    ]
                  }
                }
              },
              blank(),
              {
                "type": "input",
                "block_id": "designer",
                "label": {
                  "type": "plain_text",
                  "text": "디자이너명",
                  "emoji": true
                },
                "optional": false,
                "dispatch_action": true,
                "element": {
                  "type": "plain_text_input",
                  "action_id": "designerInput",
                  "dispatch_action_config": {
                    "trigger_actions_on": [
                      "on_character_entered"
                    ]
                  }
                }
              },
              blank(),
              {
                "type": "input",
                "block_id": "link",
                "label": {
                  "type": "plain_text",
                  "text": "원본 사진 링크",
                  "emoji": true
                },
                "optional": false,
                "dispatch_action": true,
                "element": {
                  "type": "plain_text_input",
                  "action_id": "linkInput",
                  "dispatch_action_config": {
                    "trigger_actions_on": [
                      "on_character_entered"
                    ]
                  }
                }
              },
              blank(),
              {
                "type": "input",
                "block_id": "pay",
                "label": {
                  "type": "plain_text",
                  "text": "촬영비",
                  "emoji": true
                },
                "optional": false,
                "dispatch_action": false,
                "element": {
                  "type": "radio_buttons",
                  "action_id": "payInput",
                  "options": [
                    {
                      "text": {
                        "type": "plain_text",
                        "text": "유료",
                        "emoji": true
                      },
                      "value": "paid"
                    },
                    {
                      "text": {
                        "type": "plain_text",
                        "text": "무료",
                        "emoji": true
                      },
                      "value": "free"
                    }
                  ]
                }
              },
              blank(),
            ],
            "close": {
              "type": "plain_text",
              "text": "취소",
              "emoji": true
            },
            "submit": {
              "type": "plain_text",
              "text": "공유하기",
              "emoji": true
            },
          }
        };
        await requestSystem("https://slack.com/api/views.open", modalJson, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + instance.slack_userToken,
          }
        });
        resultJson = { "message": "done" };

      } else if (req.url === "/slackForm") {

        if (typeof thisBody.payload === "object" && thisBody.payload.type === "view_submission") {

          resultJson = {
            "response_action": "clear"
          };

          if (thisBody.payload.view.callback_id === "rawPhoto") {

            finalValues = {
              client: thisBody.payload.view.state.values.client.clientInput.value,
              designer: thisBody.payload.view.state.values.designer.designerInput.value,
              link: thisBody.payload.view.state.values.link.linkInput.value,
              pay: thisBody.payload.view.state.values.pay.payInput.selected_option.value,
            };

            await messageSend({
              text: `${finalValues.client} 고객님 ${finalValues.designer} 실장님 현장의 원본 사진 링크를 공유합니다! (${finalValues.pay === "paid" ? "유료" : "무료"} 촬영)\n${finalValues.link}`,
              channel: "#502_sns_contents",
            });

            resultJson = {
              "response_action": "clear"
            };

          }
  
        } else if (typeof thisBody.payload === "object" && thisBody.payload.type === "block_actions") {

          if (thisBody.payload.view.callback_id === "projectCare") {

            triggerId = thisBody.payload.trigger_id;
            desid = thisBody.payload.actions[0].value;
            thisDesigner = await back.getDesignerById(desid, { selfMongo: instance.mongo });
            allProjects = (await back.getProjectsByQuery({ $and: [ { "desid": thisDesigner.desid }, { "process.contract.first.date": { $gte: new Date(2000, 0, 1) } } ] }, { selfMongo: instance.mongo })).toNormal();
            if (allProjects.length === 0) {
              allClients = [];
            } else {
              allClients = (await back.getClientsByQuery({ $or: allProjects.map(({ cliid }) => { return { cliid }; }) }, { selfMongo: instance.mongo })).toNormal();
            }
            processArr = allProjects.filter((p) => { return /진행/gi.test(p.process.status) });
            stayArr = allProjects.filter((p) => { return /대기/gi.test(p.process.status) });
            targetArr = stayArr.concat(processArr);

            modalJson = {
              "trigger_id": triggerId,
              "view": {
                "type": "modal",
                "callback_id": "projectCareDetail",
                "title": {
                  "type": "plain_text",
                  "text": thisDesigner.designer + " 프로젝트 상세"
                },
                "blocks": [ blank() ],
                "close": {
                  "type": "plain_text",
                  "text": "취소",
                  "emoji": true
                },
                "submit": {
                  "type": "plain_text",
                  "text": "확인",
                  "emoji": true
                },
              }
            };

            for (let project of targetArr) {

              thisClient = allClients.find(({ cliid }) => { return cliid === project.cliid });

              buttonText = ""
              buttonText += thisClient.name + " 고객님";
              buttonText += " / ";
              buttonText += project.process.status;
              buttonText += " => ";
              buttonText += dateToString(project.process.contract.form.date.from).slice(2);
              buttonText += " ~ ";
              buttonText += dateToString(project.process.contract.form.date.to).slice(2);

              modalJson.view.blocks.push(linkButtonSection(buttonText, "콘솔", "https://" + address.backinfo.host + "/project?proid=" + project.proid));
            }

            await requestSystem("https://slack.com/api/views.open", modalJson, {
              headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + instance.slack_userToken,
              }
            });
            resultJson = { "message": "done" };


          }

        }

      }

      res.send(JSON.stringify(resultJson));
    } catch (e) {
      instance.mother.errorLog("Second Ghost 서버 문제 생김 (rou_post_slackForm): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}


//ROUTING ----------------------------------------------------------------------

SecondRouter.prototype.getAll = function () {
  let result, result_arr;

  result = { get: [], post: [] };
  result_arr = Object.keys(SecondRouter.prototype);

  for (let i of result_arr) { if (/^rou_get/g.test(i)) {
    result.get.push((this[i])());
  }}

  for (let i of result_arr) { if (/^rou_post/g.test(i)) {
    result.post.push((this[i])());
  }}

  return result;
}

module.exports = SecondRouter;
