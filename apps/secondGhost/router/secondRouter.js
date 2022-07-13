const SecondRouter = function (slack_bot, MONGOC) {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);

  this.mother = new Mother();
  this.back = new BackMaker();
  this.address = require(`${process.cwd()}/apps/infoObj.js`);
  this.host = this.address.secondinfo.host;
  this.mongo = MONGOC;
  this.timeouts = {};

  this.slack_bot = slack_bot;
  this.webHook = {
    url: "https://wh.jandi.com/connect-api/webhook/20614472/1c7efd1bd02b1e237092e1b8a694e844",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Accept": "application/vnd.tosslab.jandi-v2+json"
    },
    message: (message) => {
      return {
        body: message,
        connectColor: "#FAC11B",
        connectInfo: []
      }
    },
    channel: "#error_log"
  };
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

//GET ---------------------------------------------------------------------------------------------

SecondRouter.prototype.rou_get_First = function () {
  const instance = this;
  const { errorLog } = this.mother;
  let obj = {};
  obj.link = "/ssl";
  obj.func = function (req, res) {
    res.set({ "Content-Type": "text/plain" });
    try {
      res.send("hi");
    } catch (e) {
      errorLog("Second Ghost 서버 문제 생김 (rou_get_First): " + e.message).catch((e) => { console.log(e); });
      res.send("error");
    }
  }
  return obj;
}

//POST ---------------------------------------------------------------------------------------------

SecondRouter.prototype.rou_post_messageLog = function () {
  const instance = this;
  const webHook = this.webHook;
  const { requestSystem, ghostRequest } = this.mother;
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
      await requestSystem(webHook.url, webHook.message(text), { headers: webHook.headers });
      if (channel !== "silent") {
        await instance.slack_bot.chat.postMessage({ text, channel });
      }
      let voice;

      if (req.body.voice === true || req.body.voice === "true") {
        voice = true;
      } else {
        voice = false;
      }

      if (voice) {
        ghostRequest("voice", { text }).catch((err) => { console.log(err); });
      }

      res.send(JSON.stringify({ message: "done" }));
    } catch (e) {
      instance.mother.errorLog("Second Ghost 서버 문제 생김 (rou_post_messageLog): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

SecondRouter.prototype.rou_post_mysqlQuery = function () {
  const instance = this;
  const back = this.back;
  const { mysqlQuery } = this.mother;
  let obj = {};
  let ipTong;

  ipTong = [ 1, 127001, 19216801 ];
  for (let info in instance.address) {
    if (instance.address[info].ip.outer.length > 0) {
      ipTong.push(Number(instance.address[info].ip.outer.replace(/[^0-9]/g, '')));
    }
    if (instance.address[info].ip.inner.length > 0) {
      ipTong.push(Number(instance.address[info].ip.inner.replace(/[^0-9]/g, '')));
    }
  }
  ipTong = Array.from(new Set(ipTong));

  obj.link = [ "/mysqlQuery" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      let query, response, ip;
      if (typeof req.body.query !== "string") {
        throw new Error("invaild post");
      }
      ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      if (/;$/.test(req.body.query.trim())) {
        query = req.body.query.trim();
      } else {
        query = req.body.query.trim() + ';';
      }
      if (!/drop/gi.test(query) && !/delete/gi.test(query) && /^select/gi.test(query)) {
        if (typeof ip === "string") {
          if (ipTong.includes(Number(ip.trim().replace(/[^0-9]/g, '')))) {
            response = await mysqlQuery(query, { local: true });
          } else {
            response = [];
          }
        } else {
          response = [];
        }
      } else {
        response = [];
      }
      res.send(JSON.stringify(response));
    } catch (e) {
      instance.mother.errorLog("Second Ghost 서버 문제 생김 (rou_post_mysqlQuery): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

SecondRouter.prototype.rou_post_parsingCall = function () {
  const instance = this;
  const back = this.back;
  const { requestSystem, messageSend } = this.mother;
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
  const { requestSystem, messageSend, fileSystem, setQueue, sleep, shellExec, shellLink } = this.mother;
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
    } catch (e) {
      instance.mother.errorLog("Second Ghost 서버 문제 생김 (rou_post_receiveCall): " + e.message).catch((e) => { console.log(e); });
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
