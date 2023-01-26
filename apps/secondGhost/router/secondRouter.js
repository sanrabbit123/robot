const SecondRouter = function (slack_bot, MONGOC, MONGOLOCALC, slack_userToken, slack_info, telegram) {
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

      if (req.params.id === "ssl") {
        res.send(JSON.stringify({ message: "hi" }));
      } else if (req.params.id === "disk") {
        const disk = await diskReading();
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
  const { requestSystem, ajaxJson, equalJson } = this.mother;
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
        requestSystem("https://" + instance.address.officeinfo.voice.host + ":" + String(instance.address.officeinfo.voice.port) + "/voice", { text }, { headers: { "Content-Type": "application/json" } }).catch((err) => { console.log(err); });
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
      ajaxJson({ chat_id: telegram.bot[thisChannel], text: `(${channel}) ${slackText}` }, telegram.url(telegram.token)).catch((err) => {
        instance.mother.errorLog("Second Ghost 서버 문제 생김 (rou_post_messageLog): " + err.message).catch((e) => { console.log(e); });
      })

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
  const { requestSystem, ajaxJson } = this.mother;
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

      await ajaxJson({ chat_id: telegram.bot["emergency"], text: `(${channel}) ${text}` }, telegram.url(telegram.token));

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

SecondRouter.prototype.rou_post_voice = function () {
  const instance = this;
  const back = this.back;
  const { secondHost } = this;
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
      requestSystem("https://" + secondHost + "/voice", {
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
        amount: req.body.amount,
        phone: req.body.phone,
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
  const { secondHost } = this;
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
      const ghostResponse = await requestSystem("https://" + secondHost + "/pageToPdf", req.body, { headers: { "Content-Type": "application/json" } });
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
  const { secondHost } = this;
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

      requestSystem("https://" + secondHost + "/printText", { text }, { headers: { "Content-Type": "application/json" } }).catch((err) => { console.log(err); });

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
  const { secondHost, slack_info: { userDictionary, channelDictionary }, telegram } = this;
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
  const { secondHost, slack_info: { userDictionary, channelDictionary }, telegram } = this;
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

      console.log(thisBody);

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
