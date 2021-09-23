const MirrorRouter = function (MONGOC, MONGOLOCALC, MONGOCONSOLEC, MONGOPYTHONC, kakaoInstance, humanInstance) {
  this.dir = process.cwd() + "/apps/mirrorWhisk";
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  const BillMaker = require(`${process.cwd()}/apps/billMaker/billMaker.js`);
  const GoogleSheet = require(`${process.cwd()}/apps/googleAPIs/googleSheet.js`);
  const GoogleDrive = require(`${process.cwd()}/apps/googleAPIs/googleDrive.js`);
  const GoogleCalendar = require(`${process.cwd()}/apps/googleAPIs/googleCalendar.js`);
  this.mother = new Mother();
  this.back = new BackMaker();
  this.bill = new BillMaker();
  this.sheets = new GoogleSheet();
  this.drive = new GoogleDrive();
  this.calendar = new GoogleCalendar();
  this.mongo = MONGOC;
  this.mongolocal = MONGOLOCALC;
  this.mongoConsole = MONGOCONSOLEC;
  this.mongoPython = MONGOPYTHONC;
  this.address = require(`${process.cwd()}/apps/infoObj.js`);
  this.kakao = kakaoInstance;
  this.human = humanInstance;
}

MirrorRouter.timeouts = {};

MirrorRouter.prototype.emptyPromise = function () {
  return new Promise(function (resolve, reject) {
    resolve(null);
  });
}

MirrorRouter.prototype.autoHypen = function (sender) {
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
  return phoneNumber;
}

MirrorRouter.prototype.callHistory = async function () {
  const instance = this;
  const back = this.back;
  const autoHypen = this.autoHypen;
  const { mongo, mongoinfo, mongolocalinfo, mongoconsoleinfo, requestSystem, stringToDate } = this.mother;
  const selfMongo = this.mongo;
  const selfConsoleInfo = this.mongoConsole;
  try {
    const url = "https://centrex.uplus.co.kr/RestApi/callhistory";
    const { officeinfo: { phone: { numbers: phoneNumbers, password: pass } } } = this.address;
    const querystring = require("querystring");
    const callConst = "c_";
    const uniqueConst = "u_";
    const successStandardSec = 200;
    let res, tong, data, query, calltype, page;
    let outArr, inArr;
    let tempObj;
    let rows, cliid;
    let whereQuery, updateQuery;
    let historyObj;
    let boo;
    let requestNumber;
    let targetColumn;
    let pastHistory;
    let index, indexTarget;

    calltype = "outbound";
    tong = {};
    for (let id of phoneNumbers) {
      page = 0;
      do {
        page++;
        query = { id, pass, calltype, page };
        res = await requestSystem(url + "?" + querystring.stringify(query), query, { headers: { "Content-Type": "application/json" } });
        data = res.data;
        if (data.DATAS === null) {
          break;
        }
        for (let obj of data.DATAS) {
          if (!Array.isArray(tong[callConst + obj.SRC])) {
            tong[callConst + obj.SRC] = [];
          }
          tong[callConst + obj.SRC].push(JSON.parse(JSON.stringify(obj)));
        }
      } while (data.LISTINFO.total > 10);
    }
    for (let c in tong) {
      tong[c].sort((a, b) => { return a.NO - b.NO; });
      tong[c] = { out: JSON.parse(JSON.stringify(tong[c])), in: [] };
    }

    calltype = "inbound";
    for (let id of phoneNumbers) {
      page = 0;
      do {
        page++;
        query = { id, pass, calltype, page };
        res = await requestSystem(url + "?" + querystring.stringify(query), query, { headers: { "Content-Type": "application/json" } });
        data = res.data;
        if (data.DATAS === null) {
          break;
        }
        for (let obj of data.DATAS) {
          tong[callConst + obj.DST].in.push(JSON.parse(JSON.stringify(obj)));
        }
      } while (data.LISTINFO.total > 10);
    }

    outArr = [];
    inArr = [];
    for (let c in tong) {
      for (let obj of tong[c].out) {
        tempObj = {};
        tempObj.date = stringToDate(obj.TIME);
        tempObj.to = autoHypen(obj.DST);
        tempObj.duration = Number.isNaN(Number(obj.DURATION.replace(/[^0-9]/gi, ''))) ? 0 : Number(obj.DURATION.replace(/[^0-9]/gi, ''));
        if (obj.STATUS === "OK") {
          if (tempObj.duration >= successStandardSec) {
            tempObj.success = true;
          } else {
            tempObj.success = false;
          }
        } else {
          tempObj.success = false;
        }
        outArr.push(tempObj);
      }
      for (let obj of tong[c].in) {
        tempObj = {};
        tempObj.date = stringToDate(obj.TIME);
        tempObj.from = autoHypen(obj.SRC);
        tempObj.duration = Number.isNaN(Number(obj.DURATION.replace(/[^0-9]/gi, ''))) ? 0 : Number(obj.DURATION.replace(/[^0-9]/gi, ''));
        if (obj.STATUS === "OK") {
          if (tempObj.duration >= successStandardSec) {
            tempObj.success = true;
          } else {
            tempObj.success = false;
          }
        } else {
          tempObj.success = false;
        }
        inArr.push(tempObj);
      }
    }

    outArr.sort((a, b) => { return a.date.valueOf() - b.date.valueOf(); });
    inArr.sort((a, b) => { return a.date.valueOf() - b.date.valueOf(); });

    for (let { date, to, duration, success } of outArr) {
      rows = await back.getClientsByQuery({ phone: to }, { selfMongo });
      if (rows.length !== 0) {
        cliid = rows[0].cliid;
        historyObj = await back.getHistoryById("client", cliid, { selfMongo: selfConsoleInfo });
        boo = true;
        index = 0;
        indexTarget = -1;
        for (let obj of historyObj.curation.analytics.call.out) {
          if (obj.date.getFullYear() === date.getFullYear() && obj.date.getMonth() === date.getMonth() && obj.date.getDate() === date.getDate() && obj.date.getHours() === date.getHours() && obj.date.getMinutes() === date.getMinutes()) {
            boo = false;
            indexTarget = index;
          }
          index++;
        }
        if (boo) {
          historyObj.curation.analytics.call.out.push({ date, success, duration });
          whereQuery = { cliid };
          updateQuery = {};
          updateQuery["curation.analytics.call.out"] = historyObj.curation.analytics.call.out;
          await back.updateHistory("client", [ whereQuery, updateQuery ], { selfMongo: selfConsoleInfo });
        } else {
          if (typeof historyObj.curation.analytics.call.out[indexTarget] === "object") {
            if (historyObj.curation.analytics.call.out[indexTarget].duration !== duration) {
              historyObj.curation.analytics.call.out[indexTarget].duration = duration;
              historyObj.curation.analytics.call.out[indexTarget].success = success;
              whereQuery = { cliid };
              updateQuery = {};
              updateQuery["curation.analytics.call.out"] = historyObj.curation.analytics.call.out;
              await back.updateHistory("client", [ whereQuery, updateQuery ], { selfMongo: selfConsoleInfo });
            }
          }
        }

        requestNumber = 0;
        for (let i = 0; i < rows[0].requests.length; i++) {
          if (rows[0].requests[i].request.timeline.valueOf() <= date.valueOf()) {
            requestNumber = i;
            break;
          }
        }
        pastHistory = rows[0].requests[requestNumber].analytics.date.call.history.toNormal();
        targetColumn = "requests." + String(requestNumber) + ".analytics.date.call.history";
        boo = true;
        for (let obj of pastHistory) {
          if (obj.date.getFullYear() === date.getFullYear() && obj.date.getMonth() === date.getMonth() && obj.date.getDate() === date.getDate() && obj.date.getHours() === date.getHours() && obj.date.getMinutes() === date.getMinutes()) {
            boo = false;
          }
        }
        if (boo) {
          pastHistory.push({ date, who: '' });
          whereQuery = { cliid };
          updateQuery = {};
          updateQuery[targetColumn] = pastHistory;
          await back.updateClient([ whereQuery, updateQuery ], { selfMongo });
        }

      }
    }

    for (let { date, from, duration, success } of inArr) {
      rows = await back.getClientsByQuery({ phone: from }, { selfMongo });
      if (rows.length !== 0) {
        cliid = rows[0].cliid;
        historyObj = await back.getHistoryById("client", cliid, { selfMongo: selfConsoleInfo });
        boo = true;
        index = 0;
        indexTarget = -1;
        for (let obj of historyObj.curation.analytics.call.in) {
          if (obj.date.getFullYear() === date.getFullYear() && obj.date.getMonth() === date.getMonth() && obj.date.getDate() === date.getDate() && obj.date.getHours() === date.getHours() && obj.date.getMinutes() === date.getMinutes()) {
            boo = false;
            indexTarget = index;
          }
          index++;
        }
        if (boo) {
          historyObj.curation.analytics.call.in.push({ date, success, duration });
          whereQuery = { cliid };
          updateQuery = {};
          updateQuery["curation.analytics.call.in"] = historyObj.curation.analytics.call.in;
          await back.updateHistory("client", [ whereQuery, updateQuery ], { selfMongo: selfConsoleInfo });
        } else {
          if (typeof historyObj.curation.analytics.call.in[indexTarget] === "object") {
            if (historyObj.curation.analytics.call.in[indexTarget].duration !== duration) {
              historyObj.curation.analytics.call.in[indexTarget].duration = duration;
              historyObj.curation.analytics.call.in[indexTarget].success = success;
              whereQuery = { cliid };
              updateQuery = {};
              updateQuery["curation.analytics.call.in"] = historyObj.curation.analytics.call.in;
              await back.updateHistory("client", [ whereQuery, updateQuery ], { selfMongo: selfConsoleInfo });
            }
          }
        }
      }
    }

  } catch (e) {
    console.log(e);
  }
}

MirrorRouter.prototype.callObserver = async function (client, id, pass) {
  const instance = this;
  const { requestSystem, sleep, sendJandi } = this.mother;
  const querystring = require("querystring");
  const url = "https://centrex.uplus.co.kr/RestApi/channelstatus";
  const back = this.back;
  const address = this.address;
  const { officeinfo: { phone: { numbers: phoneNumbers } } } = address;
  try {
    let query;
    let num, num2;
    let status;
    let response, response2;
    let tempRes;
    let index;
    let targets;

    if (client !== null) {

      sendJandi(client.name + " Observer");

      // if (id !== null) {
      //
      //   query = { id, pass };
      //   num = 0;
      //   status = 0;
      //   while (num < 40) {
      //     response = await requestSystem(url + "?" + querystring.stringify(query), query, { headers: { "Content-Type": "application/json" } });
      //     if (response.data.SVC_RT === "0000") {
      //       status = 1;
      //       num2 = 0;
      //       while (true) {
      //         response2 = await requestSystem(url + "?" + querystring.stringify(query), query, { headers: { "Content-Type": "application/json" } });
      //         if (response2.data.SVC_RT !== "0000") {
      //           break;
      //         }
      //         await sleep(2000);
      //         num2++;
      //       }
      //       if (num2 >= ((30 * 5) - 1)) {
      //         status = 2;
      //       } else {
      //         status = 3;
      //       }
      //       break;
      //     }
      //     await sleep(2000);
      //     num++;
      //   }
      //
      //   if (status === 0) {
      //     sendJandi(client.name + " 부재중");
      //     //fail => "부재중"
      //   } else if (status === 2) {
      //     sendJandi(client.name + " 스타일 찾기");
      //     //success => "스타일 찾기"
      //   } else if (status === 3) {
      //     sendJandi(client.name + " 부재중");
      //     //fail => "부재중"
      //   }
      //   sendJandi(client.name + String(status));
      //
      // }

    }

  } catch (e) {
    console.log(e);
  }
}

MirrorRouter.prototype.rou_get_Root = function () {
  const instance = this;
  let obj = {};
  obj.link = '/';
  obj.func = async function (req, res) {
    try {
      const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      res.set({
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send(String(ip).replace(/[^0-9\.]/gi, ''));
    } catch (e) {
      console.log(e);
    }
  }
  return obj;
}

MirrorRouter.prototype.rou_get_Ssl = function () {
  const instance = this;
  const { statusReading } = this.mother;
  let obj = {};
  obj.link = '/ssl';
  obj.func = async function (req, res) {
    try {
      statusReading().catch((err) => {
        console.log(err);
      });
      res.set({
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send("hi");
    } catch (e) {
      console.log(e);
    }
  }
  return obj;
}

MirrorRouter.prototype.rou_get_callHistory = function () {
  const instance = this;
  const { messageLog, errorLog } = this.mother;
  let obj = {};
  obj.link = "/callHistory";
  obj.func = async function (req, res) {
    try {
      instance.callHistory().then(() => {
        return messageLog("callHistory update success : " + JSON.stringify(new Date()));
      }).catch((err) => {
        errorLog("callHistory error : " + err.message).catch((e) => { console.log(e); });
      });
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      res.send(JSON.stringify({ message: "hello?" }));
    } catch (e) {
      console.log(e);
    }
  }
  return obj;
}

MirrorRouter.prototype.rou_post_clickDial = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const { requestSystem } = this.mother;
  const querystring = require("querystring");
  let obj = {};
  obj.link = "/clickDial";
  obj.func = async function (req, res) {
    try {
      if (req.body.id === undefined || req.body.destnumber === undefined) {
        throw new Error("invaild post");
      }
      const url = "https://centrex.uplus.co.kr/RestApi/clickdial";
      let query, phone;
      query = { id: req.body.id, pass: address.officeinfo.phone.password, destnumber: req.body.destnumber.replace(/[^0-9]/g, '') };
      await requestSystem(url + "?" + querystring.stringify(query), query, { headers: { "Content-Type": "application/json" } });

      phone = instance.autoHypen(req.body.destnumber.replace(/[^0-9]/g, ''));
      back.getClientsByQuery({ phone }, { selfMongo: instance.mongo }).then((rows) => {
        let client;
        if (rows.length > 0) {
          client = rows[0];
        } else {
          client = null;
        }
        return instance.callObserver(client, req.body.id, address.officeinfo.phone.password);
      }).catch((err) => {
        console.log(err);
      });

      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      res.send(JSON.stringify({ message: "hello?" }));
    } catch (e) {
      console.log(e);
    }
  }
  return obj;
}

MirrorRouter.prototype.rou_post_parsingCall = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const { requestSystem } = this.mother;
  let obj = {};
  obj.link = "/parsingCall";
  obj.func = async function (req, res) {
    try {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      if (req.body.phoneNumber === undefined) {
        console.log(req.body);
        res.send(JSON.stringify({ error: "error" }));
      } else {
        const { phoneNumber, kind } = req.body;
        const method = (kind === '1' ? "전화" : "문자");
        let client;
        let rows, temp, name, sub, text;
        let manager;
        let cliid, desid, proid;
        let projects;
        let boo;

        if (!/^2/.test(phoneNumber)) {
          manager = null;
          rows = await back.getClientsByQuery({ phone: phoneNumber }, { selfMongo: instance.mongo });
          if (rows.length === 0) {
            rows = await back.getDesignersByQuery({ "information.phone": phoneNumber }, { selfMongo: instance.mongo });
            if (rows.length === 0) {
              temp = await back.setMemberObj({ selfMongo: instance.mongo, getMode: true });
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
              manager = await back.getHistoryById("designer", rows[0].desid, { selfMongo: instance.mongoConsole });
              if (manager !== null) {
                if (manager.manager === '-' || manager.manager === '' || /^[홀없]/.test(manager.manager)) {
                  manager = null;
                } else {
                  manager = manager.manager;
                }
              }
            }
          } else {
            client = rows[0];
            instance.callObserver(client, null, address.officeinfo.phone.password).catch((err) => { console.log(err); });
            name = client.name;
            sub = "고객님";
            cliid = client.cliid;
            boo = false;
            for (let { analytics } of client.requests) {
              boo = /진행/gi.test(analytics.response.status);
            }
            if (boo) {
              projects = await back.getProjectsByQuery({ $and: [ { cliid }, { desid: { $regex: "^d" } }, { "process.status": { $regex: "^[진홀]" } } ] }, { selfMongo: instance.mongo });
              if (projects.length > 0) {
                manager = await back.getHistoryById("project", projects[0].proid, { selfMongo: instance.mongoConsole });
                if (manager !== null) {
                  if (manager.manager === '-' || manager.manager === '' || /^[홀없]/.test(manager.manager)) {
                    manager = null;
                  } else {
                    manager = manager.manager;
                  }
                }
              } else {
                manager = await back.getHistoryById("client", cliid, { selfMongo: instance.mongoConsole });
                if (manager !== null) {
                  if (manager.manager === '-' || manager.manager === '' || /^[홀없]/.test(manager.manager)) {
                    manager = null;
                  } else {
                    manager = manager.manager;
                  }
                }
              }
            } else {
              manager = await back.getHistoryById("client", cliid, { selfMongo: instance.mongoConsole });
              if (manager !== null) {
                if (manager.manager === '-' || manager.manager === '' || /^[홀없]/.test(manager.manager)) {
                  manager = null;
                } else {
                  manager = manager.manager;
                }
              }
            }
          }
          text = `${name} ${sub}에게서 ${method}가 왔습니다!`;
          if (manager !== null) {
            text += ` ${manager} 담당자님 `;
            if (method === "전화") {
              text += method + " 받아주세요!";
            } else {
              text += method + " 확인해주세요!";
            }
          }
          await instance.mother.slack_bot.chat.postMessage({ text, channel: "#cx" });
          requestSystem("https://" + instance.address.officeinfo.ghost.host + ":" + String(instance.address.officeinfo.ghost.port) + "/voice", { text }, { headers: { "Content-Type": "application/json" } }).catch((err) => { console.log(err); });
        }

        res.send(JSON.stringify({ message: "success" }));
      }
    } catch (e) {
      console.log(e);
    }
  }
  return obj;
}

MirrorRouter.prototype.rou_post_receiveCall = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const { requestSystem } = this.mother;
  let obj = {};
  obj.link = "/receiveCall";
  obj.func = async function (req, res) {
    try {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      if (req.body.sender === undefined || req.body.kind === undefined) {
        console.log(req.body);
        res.send(JSON.stringify({ error: "error" }));
      } else {
        const { sender, kind } = req.body;
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

        if (MirrorRouter.timeouts[timeoutConst] !== undefined || MirrorRouter.timeouts[timeoutConst] !== null) {
          clearTimeout(MirrorRouter.timeouts[timeoutConst]);
        }
        MirrorRouter.timeouts[timeoutConst] = setTimeout(async () => {
          try {
            await requestSystem("http://" + instance.address.mirrorinfo.host + ":3000/parsingCall", { phoneNumber, kind }, { headers: { "Content-Type": "application/json" } });
            clearTimeout(MirrorRouter.timeouts[timeoutConst]);
            MirrorRouter.timeouts[timeoutConst] = null;
          } catch (e) {
            console.log(e);
          }
        }, 600);

        res.send(JSON.stringify({ message: "success" }));
      }
    } catch (e) {
      console.log(e);
    }
  }
  return obj;
}

MirrorRouter.prototype.rou_post_messageLog = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const { requestSystem, ipParsing } = this.mother;
  const webhook = {
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
  }
  let obj = {};
  obj.link = "/message";
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": '*',
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": '*',
    });
    try {
      if (typeof req.body.message !== "string") {
        throw new Error("must be message string field");
      }
      const db = "miro81";
      const collection = "messageLog";
      const ip = String(req.headers['x-forwarded-for'] === undefined ? req.connection.remoteAddress : req.headers['x-forwarded-for']).trim().replace(/[^0-9\.]/gi, '');
      const rawUserAgent = req.useragent;
      const { source: userAgent, browser, os, platform } = rawUserAgent;
      const referrer = (req.headers.referer === undefined ? "" : req.headers.referer);
      let ipObj, thisName;

      ipObj = await ipParsing(ip);
      if (ipObj === null) {
        ipObj = { ip };
      }

      thisName = "unknown";
      for (let info in address) {
        if (ip === address[info].ip.outer) {
          thisName = info.replace(/info$/, '');
          break;
        }
      }

      await instance.mongolocal.db(db).collection(collection).insertOne({
        date: new Date(),
        message: req.body.message,
        from: { name: thisName, referrer, userAgent, browser, os, platform, mobile: rawUserAgent.isMobile, ...ipObj }
      });
      await requestSystem(webHook.url, webHook.message(req.body.message), { headers: webHook.headers });
      res.send(JSON.stringify({ name: thisName, message: "done" }));

    } catch (e) {
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

MirrorRouter.prototype.rou_post_errorLog = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const { requestSystem, ipParsing } = this.mother;
  const webhook = {
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
  }
  let obj = {};
  obj.link = "/error";
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": '*',
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": '*',
    });
    try {
      if (typeof req.body.message !== "string") {
        throw new Error("must be message string field");
      }
      const db = "miro81";
      const collection = "errorLog";
      const ip = String(req.headers['x-forwarded-for'] === undefined ? req.connection.remoteAddress : req.headers['x-forwarded-for']).trim().replace(/[^0-9\.]/gi, '');
      const rawUserAgent = req.useragent;
      const { source: userAgent, browser, os, platform } = rawUserAgent;
      const referrer = (req.headers.referer === undefined ? "" : req.headers.referer);
      let ipObj, thisName;

      ipObj = await ipParsing(ip);
      if (ipObj === null) {
        ipObj = { ip };
      }

      thisName = "unknown";
      for (let info in address) {
        if (ip === address[info].ip.outer) {
          thisName = info.replace(/info$/, '');
          break;
        }
      }

      await instance.mongolocal.db(db).collection(collection).insertOne({
        date: new Date(),
        message: req.body.message,
        from: { name: thisName, referrer, userAgent, browser, os, platform, mobile: rawUserAgent.isMobile, ...ipObj }
      });
      await requestSystem(webHook.url, webHook.message(req.body.message), { headers: webHook.headers });
      instance.mother.slack_bot.chat.postMessage({ text: req.body.message, channel: webHook.channel });

      res.send(JSON.stringify({ name: thisName, message: "done" }));

    } catch (e) {
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

MirrorRouter.prototype.rou_post_statusLog = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const { requestSystem, ipParsing, equalJson } = this.mother;
  const webhook = {
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
  }
  let obj = {};
  obj.link = "/status";
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": '*',
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": '*',
    });
    try {
      if (typeof req.body.message !== "string") {
        throw new Error("must be message string field");
      }
      const db = "miro81";
      const collection = "messageLog";
      const ip = String(req.headers['x-forwarded-for'] === undefined ? req.connection.remoteAddress : req.headers['x-forwarded-for']).trim().replace(/[^0-9\.]/gi, '');
      const rawUserAgent = req.useragent;
      const { source: userAgent, browser, os, platform } = rawUserAgent;
      const referrer = (req.headers.referer === undefined ? "" : req.headers.referer);
      const status = equalJson(req.body);
      let ipObj, thisName;

      ipObj = await ipParsing(ip);
      if (ipObj === null) {
        ipObj = { ip };
      }

      thisName = "unknown";
      for (let info in address) {
        if (ip === address[info].ip.outer) {
          thisName = info.replace(/info$/, '');
          break;
        }
      }

      await instance.mongolocal.db(db).collection(collection).insertOne({
        date: new Date(),
        status: equalJson(JSON.stringify(status)),
        from: { name: thisName, referrer, userAgent, browser, os, platform, mobile: rawUserAgent.isMobile, ...ipObj }
      });
      res.send(JSON.stringify({ name: thisName, message: "done" }));

    } catch (e) {
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

MirrorRouter.prototype.getAll = function () {
  let result, result_arr;

  result = { get: [], post: [] };
  result_arr = Object.keys(MirrorRouter.prototype);

  for (let i of result_arr) { if (/^rou_get/g.test(i)) {
    result.get.push((this[i])());
  }}

  for (let i of result_arr) { if (/^rou_post/g.test(i)) {
    result.post.push((this[i])());
  }}

  return result;
}

module.exports = MirrorRouter;
