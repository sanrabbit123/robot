const Alien = function () {
  const Mother = require(process.cwd() + "/apps/mother.js");
  const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js");
  const ADDRESS = require(process.cwd() + "/apps/infoObj.js");
  const schedule = require('node-schedule');
  this.mother = new Mother();
  this.back = new BackMaker();
  this.address = ADDRESS;
  this.schedule = schedule;
  this.alien = process.cwd() + "/alien.js";
  this.ghost = process.cwd() + "/ghost.js";
  this.robot = process.cwd() + "/robot.js";
}

Alien.prototype.setTimer = function (callback, timeObj) {
  if (typeof timeObj !== "object" || typeof callback !== "function") {
    throw new Error("arguments must be Object: timeObj, Function: callback");
  }
  const nowDate = new Date();
  let targetDate;
  let result, time;
  let timeoutObj;

  if (timeObj instanceof Date) {
    targetDate = timeObj;
  } else {
    if (timeObj.year === undefined || typeof timeObj.year !== "number") {
      timeObj.year = nowDate.getFullYear();
    }
    if (timeObj.month === undefined || typeof timeObj.month !== "number") {
      timeObj.month = nowDate.getMonth() + 1;
    }
    if (timeObj.date === undefined || typeof timeObj.date !== "number") {
      timeObj.date = nowDate.getDate();
    }
    if (timeObj.hour === undefined || typeof timeObj.hour !== "number") {
      timeObj.hour = nowDate.getHours();
    }
    if (timeObj.minute === undefined || typeof timeObj.minute !== "number") {
      timeObj.minute = nowDate.getMinutes();
    }
    if (timeObj.second === undefined || typeof timeObj.second !== "number") {
      timeObj.second = nowDate.getSeconds();
    }
    const { year, month, date, hour, minute, second } = timeObj;
    targetDate = new Date(year, month - 1, date, hour, minute, second);
  }

  result = targetDate.valueOf() - nowDate.valueOf();
  if (result < 0) {
    time = 0;
  } else {
    time = result;
  }

  return new Promise(function (resolve, reject) {
    timeoutObj = setTimeout(function () {
      callback();
      resolve(time);
      clearTimeout(timeoutObj);
      timeoutObj = null;
    }, time);
  });
}

Alien.prototype.objectToCron = function (obj = {}) {
  let properties, target, cron;

  properties = [ "seconds", "minutes", "hours", "date", "month", "day" ];
  target = {};

  for (let i of properties) {
    if (obj[i] !== undefined) {
      if (typeof obj[i] !== "number" && typeof obj[i] !== "string") {
        throw new Error("invaild input");
      } else {
        target[i] = String(obj[i]);
      }
    } else {
      target[i] = '*';
    }
  }

  cron = '';
  for (let i of properties) {
    cron += target[i];
    cron += ' ';
  }
  cron = cron.slice(0, -1);

  return cron;
}

Alien.prototype.cronLaunching = async function (cronNumber) {
  const instance = this;
  const { fileSystem, shell, shellLink } = this.mother;
  const http = require("http");
  const express = require("express");
  const app = express();
  const CronGhost = require(process.cwd() + "/apps/cronGhost/cronGhost.js");
  const cron = new CronGhost();
  try {

    app.get("/", function (req, res) {
      const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      res.send(String(ip).replace(/[^0-9\.]/gi, ''));
    });

    //launching python cron
    cronScript = await cron.scriptReady(cronNumber);
    shell.exec(`python3 ${shellLink(cronScript)}`, { async: true });
    console.log(`\x1b[33m%s\x1b[0m`, `Cron running`);

    //server on
    http.createServer(app).listen(5000, () => {});

  } catch (e) {
    console.log(e);
  }
}

Alien.prototype.taxBill = async function () {
  const instance = this;
  const { fileSystem, shell, shellLink, pythonExecute, requestSystem, decryptoHash, slack_bot } = this.mother;
  try {

    const today = new Date();
    const yesterday = new Date();
    const month = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
    const host = "imap.daum.net";
    const port = 993;
    const id = "hijinijini0311";
    const hash = "d3e48a26c2203b3f57af7489f4357a49c1336757d65d49d31455414c3c84e54e";
    const password = "homeliaison";
    const homeTaxEmail = "hometaxadmin@hometax.go.kr";
    const jsdom = require("jsdom");
    const { JSDOM } = jsdom;
    const keywords = "전자세금계산서를 발급하고 발송한 메일";
    const attachmentsKeywords = "Content-Disposition: attachment";
    const pythonFile = `${process.cwd()}/temp/getMail.py`;
    const autoComma = function (str) {
      if (typeof str === "number") {
        str = String(str);
      }
      let minus, num, tmp;

      if (/\-/g.test(str)) {
        minus = /\-/g.exec(str)[0];
      } else {
        minus = '';
      }

      num = str.replace(/[^0-9]/g, '');
      tmp = '';

      if (num.length < 4) {
        return minus + num;
      } else if (num.length < 7) {
        tmp += num.slice(-6, -3) + ',' + num.slice(-3);
        return minus + tmp;
      } else if (num.length < 10) {
        tmp += num.slice(-9, -6) + ',' + num.slice(-6, -3) + ',' + num.slice(-3);
        return minus + tmp;
      } else if (num.length < 13) {
        tmp += num.slice(-12, -9) + ',' + num.slice(-9, -6) + ',' + num.slice(-6, -3) + ',' + num.slice(-3);
        return minus + tmp;
      } else if (num.length < 16) {
        tmp += num.slice(-15, -12) + ',' + num.slice(-12, -9) + ',' + num.slice(-9, -6) + ',' + num.slice(-6, -3) + ',' + num.slice(-3);
        return minus + tmp;
      }

      return minus + num;
    }
    const zeroAddition = (num) => { return ((num < 10) ? '0' + String(num) : String(num)); }
    class FindIndex extends Array {
      constructor(arr) {
        super();
        for (let i of arr) {
          this.push(i);
        }
      }
      findIndexAll(word, regxp = false) {
        let result;
        result = [];
        if (regxp) {
          for (let i = 0; i < this.length; i++) {
            if ((new RegExp(word, "gi")).test(this[i])) {
              result.push(i);
            }
          }
        } else {
          for (let i = 0; i < this.length; i++) {
            if (this[i] === word) {
              result.push(i);
            }
          }
        }
        return result;
      }
    }
    class TaxBill {
      constructor(id = '') {
        this.id = id;
        this.date = new Date();
        this.who = {};
        this.who.from = {};
        this.who.to = {};
        this.items = [];
        this.sum = {
          total: 0,
          supply: 0,
          vat: 0
        };
      }
      toMessage() {
        const now = new Date();
        const { id, who, items, sum } = this;
        let message = '';
        message += "전자 세금 계산서(" + this.id + ") " + String(now.getFullYear()) + "-" + zeroAddition(now.getMonth() + 1) + "-" + zeroAddition(now.getDate()) + " " + zeroAddition(now.getHours()) + ":" + zeroAddition(now.getMinutes()) + ":" + zeroAddition(now.getSeconds()) + "\n";
        message += "\n";
        message += "발신자\n";
        message += "- 상호 : " + who.from.company + "\n";
        message += "- 성함 : " + who.from.name + "\n";
        message += "- 주소 : " + who.from.address + "\n";
        message += "- 업태 : " + who.from.business + "\n";
        message += "- 종목 : " + who.from.detail + "\n";
        message += "- 이메일 : " + who.from.email + "\n";
        message += "\n";
        message += "수신자\n";
        message += "- 상호 : " + who.to.company + "\n";
        message += "- 성함 : " + who.to.name + "\n";
        message += "- 주소 : " + who.to.address + "\n";
        message += "- 업태 : " + who.to.business + "\n";
        message += "- 종목 : " + who.to.detail + "\n";
        message += "- 이메일 : " + who.to.email + "\n";
        message += "\n";
        message += "내용\n";
        for (let item of items) {
          message += "- 날짜 : " + String((new Date()).getFullYear()) + "-" + zeroAddition(item.month) + "-" + zeroAddition(item.date) + "\n";
          message += "- 품목 : " + item.name + "\n";
          message += "- 수량 : " + String(item.amount) + String(item.ea) + "\n";
          message += "- 공급가 : " + autoComma(item.supply) + "원" + "\n";
          message += "- 세액 : " + autoComma(item.vat) + "원" + "\n";
          message += "\n";
        }
        message += "합계\n";
        message += "- 소비자가 : " + autoComma(sum.total) + "원" + "\n";
        message += "- 공급가 : " + autoComma(sum.supply) + "원" + "\n";
        message += "- 세액 : " + autoComma(sum.vat) + "원";
        return message;
      }
    }
    let pythonDate, pythonScript;
    let realPwd;
    let result;
    let rawArr;
    let attachmentsIndex;
    let binary, buff, data;
    let html;
    let search;
    let res, localScript;
    let newHtml;
    let dom;
    let finalText;
    let textArr, resultObj, tempArr;
    let spotTargets;
    let items, itemStart, itemEnd;
    let num, standardNum;
    let accumulation;
    let supplySum, vatSum;
    let tempObj;

    yesterday.setDate(yesterday.getDate() - 1);
    realPwd = await decryptoHash(password, hash);
    pythonDate = `${zeroAddition(yesterday.getDate())}-${month[yesterday.getMonth()]}-${String(yesterday.getFullYear())}`;
    pythonScript = ``;
    pythonScript += `from imaplib import IMAP4_SSL\n`;
    pythonScript += `import json\n`;
    pythonScript += `\n`;
    pythonScript += `imap = IMAP4_SSL(host="${host}", port=${String(port)})\n`;
    pythonScript += `\n`;
    pythonScript += `imap.login('${id}', '${realPwd}')\n`;
    pythonScript += `imap.select(mailbox="Inbox")\n`;
    pythonScript += `(typ, data) = imap.search(None, '(FROM "${homeTaxEmail}" SINCE "${pythonDate}")')\n`;
    pythonScript += `\n`;
    pythonScript += `targetMail_numbers = data[0].split()\n`;
    pythonScript += `targetMail_numbers.sort(reverse=True)\n`;
    pythonScript += `\n`;
    pythonScript += `mailTong = []\n`;
    pythonScript += `for num in targetMail_numbers:\n`;
    pythonScript += `    (typ, data) = imap.fetch(num, '(RFC822)')\n`;
    pythonScript += `    mailTong.append(data[0][1].decode('utf8'))\n`;
    pythonScript += `\n`;
    pythonScript += `print(json.dumps(mailTong))\n`;
    pythonScript += `\n`;
    pythonScript += `imap.close()\n`;
    pythonScript += `imap.logout()`;

    if (await fileSystem(`exist`, [ pythonFile ])) {
      shell.exec(`rm -rf ${shellLink(pythonFile)}`);
    }
    await fileSystem(`write`, [ pythonFile, pythonScript ]);

    result = await pythonExecute(pythonFile, [], {});
    html = null;
    for (let i = 0; i < result.length; i++) {
      if ((new RegExp(keywords, "gi")).test(result[i])) {
        rawArr = result[i].split("\r\n");

        attachmentsIndex = null;
        for (let j = 0; j < rawArr.length; j++) {
          if ((new RegExp(attachmentsKeywords, "gi")).test(rawArr[j])) {
            attachmentsIndex = j;
            break;
          }
        }

        if (attachmentsIndex === null) {
          throw new Error("not found attachment");
        }

        do {
          attachmentsIndex = attachmentsIndex + 1;
        } while (rawArr[attachmentsIndex].trim() === "" || /filename\=/g.test(rawArr[attachmentsIndex]));

        binary = "";
        while (rawArr[attachmentsIndex].trim() !== "") {
          binary += rawArr[attachmentsIndex].trim();
          attachmentsIndex++;
        }

        buff = Buffer.from(binary, "base64");
        data = buff.toString("utf8");

        html = data;
        break;
      }
    }

    if (html === null) {
      throw new Error("not found");
    }

    search = [ ...html.matchAll(/\<script src\=\"([^\"]+)\"\>\<\/script\>/gi) ];
    res, localScript;
    newHtml;

    localScript = '';
    for (let arr of search) {
      res = await requestSystem(arr[1]);
      localScript += res.data;
      localScript += "\n\n";
    }

    localScript = `<script>\n\n${localScript}\n\n</script>`;

    newHtml = html.replace(/\<script src\=\"([^\"]+)\"\>\<\/script\>/gi, '');
    newHtml = newHtml.replace(/\<\/head\>/g, localScript + "</head>").replace(/src\=\"[^\"]+\"/gi, "").replace(/href\=\"[^\"]+\"/gi, "");
    newHtml = newHtml.replace(/\<script defer\>[^\<]+\<\/script\>/gi, '');
    newHtml += `\n\n<script>
    var s = document.getElementById("idCriHeader").value;
    var decodeHeader = CryptoJS.enc.Base64.parse(s);
    var words = decodeHeader.words;
    var decHeader="";
    for(i=0; i < decodeHeader.sigBytes; i++)
    {
      var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
      var bite2 = bite ^ 0x6b;
      decHeader = decHeader + String.fromCharCode(bite2);
    }
    decHeader = decHeader.replace(/\\r\\n/gi, '||');
    decHeader = decHeader.replace(/\\n/gi, '||');
    Cri_Header_parser(decHeader);
    Cri_Check_Pwd("2218149759");
    CriDisplayBody();
    </script>`;

    dom = new JSDOM(newHtml, { runScripts: "dangerously" });
    finalText = dom.window.document.getElementById('CriMsgPosition').contentWindow.document.querySelector("table").textContent;

    textArr = finalText.split("\n");
    textArr = textArr.filter((i) => { return (i.trim() !== ""); });
    textArr = new FindIndex(textArr.map((i) => { return i.trim(); }));
    spotTargets = [
      { word: "상호\\(", regxp: true, column: "company" },
      { word: "성명", regxp: false, column: "name" },
      { word: "사업장", regxp: false, column: "address" },
      { word: "업태", regxp: false, column: "business" },
      { word: "종목", regxp: false, column: "detail" },
      { word: "이메일", regxp: false, column: "email" },
    ];
    resultObj = new TaxBill(textArr[2]);

    for (let { word, regxp, column } of spotTargets) {
      tempArr = textArr.findIndexAll(word, regxp);
      if (tempArr.length < 2) {
        throw new Error("invaild text");
      }
      resultObj.who.from[column] = textArr[tempArr[0] + 1];
      resultObj.who.to[column] = textArr[tempArr[1] + 1];
    }

    tempArr = textArr.findIndexAll("비고");
    if (tempArr.length < 2) {
      throw new Error("invaild text");
    }
    itemStart = tempArr[1] + 1;
    tempArr = textArr.findIndexAll("합계금액");
    if (tempArr.length < 1) {
      throw new Error("invaild text");
    }
    itemEnd = tempArr[0] - 1;

    textArr = Array.from(textArr);
    textArr = textArr.slice(itemStart, itemEnd + 1);

    num = 0;
    standardNum = 8;
    accumulation = 0;

    while (!(((standardNum) * num <= textArr.length) && ((standardNum + 1) * num >= textArr.length))) {
      num++;
    }

    items = [];
    for (let i = 0; i < num; i++) {
      tempArr = [];
      for (var j = 0; j < standardNum; j++) {
        tempArr.push(textArr[accumulation + j]);
      }
      if (textArr[accumulation + standardNum] === undefined) {
        items.push(tempArr);
        break;
      }
      if (textArr[accumulation + standardNum + 1] === undefined) {
        items.push(tempArr);
        tempArr.push(accumulation + standardNum);
        break;
      }
      if (/^[0-1][0-9]$/.test(textArr[accumulation + standardNum]) && /^[0-1][0-9]$/.test(textArr[accumulation + standardNum + 1])) {
        accumulation = accumulation + standardNum;
      } else {
        tempArr.push(accumulation + standardNum);
        accumulation = accumulation + standardNum + 1;
      }
      items.push(tempArr);
    }

    supplySum = 0;
    vatSum = 0;

    for (let arr of items) {
      tempObj = {
        month: Number(arr[0].replace(/^0/, '')),
        date: Number(arr[1]),
        name: arr[2],
        ea: arr[3],
        amount: Number(arr[4]),
        unit: Number(arr[5].replace(/[^0-9]/g, '')),
        supply: Number(arr[6].replace(/[^0-9]/g, '')),
        vat: Number(arr[7].replace(/[^0-9]/g, '')),
      };
      if (arr.length !== standardNum) {
        tempObj.etc = arr[8];
      }
      resultObj.items.push(tempObj);
      supplySum += tempObj.supply;
      vatSum += tempObj.vat;
    }

    resultObj.sum.total = supplySum + vatSum;
    resultObj.sum.supply = supplySum;
    resultObj.sum.vat = vatSum;

    console.log(resultObj);

    await slack_bot.chat.postMessage({ text: resultObj.toMessage(), channel: "#700_operation" });
    shell.exec(`rm -rf ${shellLink(pythonFile)}`);

  } catch (e) {
    console.log(e);
  }
}

Alien.prototype.wssClientLaunching = async function (url = "") {
  const instance = this;
  const { mongo, mongoinfo, mongolocalinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  const back = this.back;
  const address = this.address;
  const WebSocket = require('ws');
  const autoComma = function (str) {
    if (typeof str === "number") {
      str = String(str);
    }
    let minus, num, tmp;

    if (/\-/g.test(str)) {
      minus = /\-/g.exec(str)[0];
    } else {
      minus = '';
    }

    num = str.replace(/[^0-9]/g, '');
    tmp = '';

    if (num.length < 4) {
      return minus + num;
    } else if (num.length < 7) {
      tmp += num.slice(-6, -3) + ',' + num.slice(-3);
      return minus + tmp;
    } else if (num.length < 10) {
      tmp += num.slice(-9, -6) + ',' + num.slice(-6, -3) + ',' + num.slice(-3);
      return minus + tmp;
    } else if (num.length < 13) {
      tmp += num.slice(-12, -9) + ',' + num.slice(-9, -6) + ',' + num.slice(-6, -3) + ',' + num.slice(-3);
      return minus + tmp;
    } else if (num.length < 16) {
      tmp += num.slice(-15, -12) + ',' + num.slice(-12, -9) + ',' + num.slice(-9, -6) + ',' + num.slice(-6, -3) + ',' + num.slice(-3);
      return minus + tmp;
    }

    return minus + num;
  }
  try {

    await MONGOC.connect();
    const selfMongo = MONGOC;
    const ws = new WebSocket("wss://stream.pushbullet.com/websocket/o.MJyKgIBma8O14mg0VOZrsCdf8X8L6UJF");
    const emptyDate = new Date(2000, 0, 1);
    const emptyDateValue = (new Date(2000, 0, 1)).valueOf();
    const contract = 330000;
    const channel = "#700_operation";

    console.log(`\x1b[33m%s\x1b[0m`, `Wss running`);

    ws.on('message', async (raw) => {
      try {
        const data = JSON.parse(raw.replace(/^\n/, '').replace(/\n$/, '').trim());
        if (data.type === "push") {
          const { push: { type } } = data;
          if (type === "sms_changed") {
            const { notifications } = data.push;
            let tempArr;
            let amount, who;
            let whereQuery, updateQuery;
            let projects, clients;
            let cliid, proid;
            let boo;
            let num;
            let message;
            for (let { body } of notifications) {
              if (/\[Web/.test(body.trim()) && /입금/gi.test(body) && /원/gi.test(body) && /\]/gi.test(body) && /\//gi.test(body) && /\:/gi.test(body)) {
                tempArr = body.split("원");

                amount = Number(((tempArr[0].split("입금"))[1]).replace(/[^0-9]/gi, ''));
                who = ((tempArr[1].split("\n"))[1]).trim();

                clients = await back.getClientsByQuery({ name: who.replace(/[^가-힣]/gi, '') }, { selfMongo });

                cliid = null;
                proid = null;
                message = "";

                if (clients.length > 0) {
                  projects = [];
                  num = 0;
                  while (projects.length === 0 && clients[num] !== undefined) {
                    whereQuery = {};
                    whereQuery["$and"] = [];
                    whereQuery["$and"].push({ "process.contract.remain.calculation.amount.consumer": amount + contract });
                    whereQuery["$and"].push({ "process.contract.remain.date": { "$lt": emptyDate } });
                    whereQuery["$and"].push({ "process.contract.first.date": { "$gt": emptyDate } });
                    whereQuery["$and"].push({ "desid": { "$regex": "^d" } });
                    whereQuery["$and"].push({ "cliid": clients[num].cliid });
                    projects = await back.getProjectsByQuery(whereQuery, { selfMongo });
                    num++;
                  }
                  if (projects.length > 0) {
                    cliid = clients[num - 1].cliid;
                    proid = projects[0].proid;
                  }
                }

                if (cliid === null || proid === null) {
                  message += `해석할 수 없는 문자가 왔습니다! 직접 해석해주세요!`;
                } else {
                  message += `고객 아이디: ${cliid} / 프로젝트 아이디: ${proid} / 금액: ${autoComma(amount)}원\n`;
                  message += `고객 : https://${address["backinfo"]["host"]}/client?cliid=${cliid}\n`;
                  message += `프로젝트 : https://${address["backinfo"]["host"]}/project?proid=${proid}`;
                }

                message += "\n";
                message += body;

                await instance.mother.slack_bot.chat.postMessage({ text: message, channel });

              }
            }
          } else if (type === "mirror") {
            const { package_name } = data.push;
            if (/net\.daum\.android\.mail/gi.test(package_name)) {
              await instance.mother.slack_bot.chat.postMessage({ text: "help 메일 변동 감지됨 : \n" + JSON.stringify(data, null, 2), channel: "#error_log" });
            }
          }
        }

      } catch (e) {
        console.log(e);
      }
    });

  } catch (e) {
    console.log(e);
  }
}

Alien.prototype.requestWhisk = async function (num) {
  try {
    if (typeof num !== "number") {
      throw new Error("invaild input");
    }
    if (Number.isNaN(num)) {
      throw new Error("invaild input");
    }
    const RequestWhisk = require(`${process.cwd()}/apps/requestWhisk/requestWhisk.js`);
    const app = new RequestWhisk();
    await app.requestBeating();
  } catch (e) {
    console.log(e);
  }
}

// EXE --------------------------------------------------------------------------------------

const app = new Alien();
if (/office/gi.test(process.argv[2])) {
  app.cronLaunching(2);
} else if (/home/gi.test(process.argv[2])) {
  app.cronLaunching(0);
} else if (/static/gi.test(process.argv[2])) {
  app.cronLaunching(1);
} else if (/python/gi.test(process.argv[2])) {
  app.cronLaunching(3);
} else if (/calculation/gi.test(process.argv[2])) {
  app.wssClientLaunching();
} else if (/request/gi.test(process.argv[2])) {
  app.requestWhisk(Number(process.argv[3]));
}
