const ReceiptObserver = function () {
  const Mother = require(process.cwd() + "/apps/mother.js");
  const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js");
  const ADDRESS = require(process.cwd() + "/apps/infoObj.js");
  this.mother = new Mother();
  this.back = new BackMaker();
  this.address = ADDRESS;
  this.dir = process.cwd() + "/apps/receiptObserver";
}

ReceiptObserver.prototype.taxBill = async function (pastDateNumber = 2) {
  const instance = this;
  const back = this.back;
  const { mongo, mongoinfo, mongolocalinfo, fileSystem, shell, shellLink, pythonExecute, requestSystem, decryptoHash, slack_bot } = this.mother;
  const MONGOLOCALC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
  try {
    await MONGOLOCALC.connect();
    const selfMongo = MONGOLOCALC;
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
    const dateKeywords = "Date: ";
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
      findIndexAll(word, regxp = false, between = 0, start = 0) {
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
        result = result.slice(start);
        if (result.length > 1 && between > 0) {
          result.splice(1, between);
        }
        return result;
      }
    }
    class TaxBill {
      constructor(id, date) {
        if (id === undefined || date === undefined) {
          throw new Error("invaild input");
        }
        this.id = id;
        this.date = date;
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
        const { id, date, who, items, sum } = this;
        let message = '';
        message += "전자 세금 계산서(" + this.id + ") " + String(date.getFullYear()) + "-" + zeroAddition(date.getMonth() + 1) + "-" + zeroAddition(date.getDate()) + " " + zeroAddition(date.getHours()) + ":" + zeroAddition(date.getMinutes()) + ":" + zeroAddition(date.getSeconds()) + "\n";
        message += "\n";
        message += "발신자\n";
        message += "- 상호 : " + who.from.company + " (" + who.from.business + ")" + "\n";
        message += "- 이름 : " + who.from.name + "\n";
        message += "- 이메일 : " + who.from.email + "\n";
        message += "\n";
        message += "수신자\n";
        message += "- 상호 : " + who.to.company + " (" + who.to.business + ")" + "\n";
        message += "- 이름 : " + who.to.name + "\n";
        message += "- 이메일 : " + who.to.email + "\n";
        message += "\n";
        message += "내용\n";
        for (let item of items) {
          message += "- 날짜 : " + String((new Date()).getFullYear()) + "-" + zeroAddition(item.month) + "-" + zeroAddition(item.date) + "\n";
          message += "- 품목 : " + item.name + "\n";
          message += "- 공급가 : " + autoComma(item.supply) + "원" + "\n";
          message += "- 세액 : " + autoComma(item.vat) + "원" + "\n";
          message += "\n";
        }
        message += "합계\n";
        message += "- 소비자가 : " + autoComma(sum.total) + "원" + "\n";
        message += "- 공급가 : " + autoComma(sum.supply) + "원" + "\n";
        return message;
      }
    }
    let pythonDate, pythonScript;
    let realPwd;
    let result;
    let rawArr;
    let dateIndex;
    let attachmentsIndex;
    let binary, buff, data;
    let html, date;
    let search;
    let res, localScript;
    let newHtml;
    let dom;
    let finalText;
    let textArr, resultObj, tempArr;
    let spotTargets;
    let items, itemStart, itemEnd;
    let num;
    let supplySum, vatSum;
    let tempObj;
    let htmlTong, htmlNum;
    let resultObjTong;
    let startNums;
    let orderArr;
    let minus;
    let tempNum;
    let rows;

    yesterday.setDate(yesterday.getDate() - pastDateNumber);
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
    htmlTong = [];
    for (let i = 0; i < result.length; i++) {
      if ((new RegExp(keywords, "gi")).test(result[i])) {
        rawArr = result[i].split("\r\n");

        dateIndex = null;
        for (let j = 0; j < rawArr.length; j++) {
          if ((new RegExp(dateKeywords, "gi")).test(rawArr[j])) {
            dateIndex = j;
            break;
          }
        }

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
        date = new Date(rawArr[dateIndex].replace((new RegExp(dateKeywords, "gi"), "").trim()));

        htmlTong.push({ date, html });
      }
    }

    if (html === null || htmlTong.length === 0) {
      console.log("not found");
      return htmlTong;
    }

    console.log("parsing start...");
    resultObjTong = [];
    htmlNum = 0;
    for (let { date, html } of htmlTong) {

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

      console.log("dom" + String(htmlNum) + " parsing start...");
      dom = new JSDOM(newHtml, { runScripts: "dangerously" });
      finalText = dom.window.document.getElementById('CriMsgPosition').contentWindow.document.querySelector("table").textContent;
      textArr = finalText.split("\n");
      textArr = textArr.filter((i) => { return (i.trim() !== ""); });
      textArr = new FindIndex(textArr.map((i) => { return i.trim(); }));
      spotTargets = [
        { word: "번호", not: "상호", regxp: true, between: 1, start: 1, column: "business" },
        { word: "상호\\(", not: "성명", regxp: true, between: 0, start: 0, column: "company" },
        { word: "성명", not: "사업장", regxp: false, between: 0, start: 0, column: "name" },
        { word: "사업장", not: "업태", regxp: false, between: 0, start: 0, column: "address" },
        { word: "업태", not: "종목", regxp: false, between: 0, start: 0, column: "status" },
        { word: "종목", not: "이메일", regxp: false, between: 0, start: 0, column: "detail" },
        { word: "이메일", not: "이메일", regxp: false, between: 0, start: 0, column: "email" },
      ];
      resultObj = new TaxBill(textArr[2], date);

      for (let { word, not, regxp, between, start, column } of spotTargets) {
        tempArr = textArr.findIndexAll(word, regxp, between, start);
        if (tempArr.length < 2) {
          throw new Error("invaild text");
        }
        resultObj.who.from[column] = textArr[tempArr[0] + 1] === not ? "" : textArr[tempArr[0] + 1];
        resultObj.who.to[column] = textArr[tempArr[1] + 1] === not ? "" : textArr[tempArr[1] + 1];
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

      startNums = [];
      for (let i = 0; i < textArr.length; i++) {
        if (i !== textArr.length - 1) {
          if (/^[0-1][0-9]$/.test(textArr[i].trim())) {
            if (/^[0-9][0-9]$/.test(textArr[i + 1].trim())) {
              startNums.push(i);
            }
          }
        }
      }

      orderArr = [];
      for (let i = 0; i < startNums.length; i++) {
        if (i === startNums.length - 1) {
          orderArr.push([ startNums[i], textArr.length ]);
        } else {
          orderArr.push([ startNums[i], startNums[i + 1] ]);
        }
      }

      items = [];
      for (let i = 0; i < orderArr.length; i++) {
        tempArr = [];
        num = 0;
        for (let j = orderArr[i][0]; j < orderArr[i][1]; j++) {
          if (num === 0) {
            if (/^[0-1][0-9]$/.test(textArr[j].trim())) {
              tempArr.push(textArr[j].trim());
            } else {
              throw new Error("item month error");
            }
          } else if (num === 1) {
            if (/^[0-4][0-9]$/.test(textArr[j].trim())) {
              tempArr.push(textArr[j].trim());
            } else {
              throw new Error("item date error");
            }
          } else if (num === 2) {

            tempNum = orderArr[i][1] - orderArr[i][0];
            if (tempNum === 9) {
              for (let k = 0; k < 7; k++) {
                tempArr.push(textArr[j + k]);
              }
            } else if (tempNum === 8) {
              if (/[0-9\,\-]/g.test(textArr[orderArr[i][1] - 1].trim()) && textArr[orderArr[i][1] - 1].replace(/[0-9\,\-]/g, '') === '') {
                for (let k = 0; k < 6; k++) {
                  tempArr.push(textArr[j + k]);
                }
                tempArr.push("");
              } else {
                tempArr.push("");
                for (let k = 0; k < 6; k++) {
                  tempArr.push(textArr[j + k]);
                }
              }
            } else if (tempNum === 7 || tempNum === 6 || tempNum === 5) {
              if (/[0-9\,\-]/g.test(textArr[orderArr[i][1] - 1].trim()) && textArr[orderArr[i][1] - 1].replace(/[0-9\,\-]/g, '') === '') {
                tempArr.push(textArr[j].replace(/[0-9\,\-]/g, '') === '' ? "" : textArr[j]);
                tempArr.push(textArr[j + 1].replace(/[0-9\,\-]/g, '') === '' ? "" : textArr[j + 1]);
                tempArr.push(1);
                tempArr.push(textArr[orderArr[i][1] - 2]);
                tempArr.push(textArr[orderArr[i][1] - 2]);
                tempArr.push(textArr[orderArr[i][1] - 1]);
                tempArr.push("");
              } else {
                tempArr.push(textArr[j].replace(/[0-9\,\-]/g, '') === '' ? "" : textArr[j]);
                tempArr.push(textArr[j + 1].replace(/[0-9\,\-]/g, '') === '' ? "" : textArr[j + 1]);
                tempArr.push(1);
                tempArr.push(textArr[orderArr[i][1] - 3]);
                tempArr.push(textArr[orderArr[i][1] - 3]);
                tempArr.push(textArr[orderArr[i][1] - 2]);
                tempArr.push(textArr[orderArr[i][1] - 1]);
              }
            } else if (tempNum === 4) {
              tempArr.push("");
              tempArr.push("");
              tempArr.push(1);
              tempArr.push(textArr[j]);
              tempArr.push(textArr[j]);
              tempArr.push(textArr[j + 1]);
              tempArr.push("");
            } else {
              throw new Error("item error");
            }
          }
          num++;
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
          unit: Number(arr[5].replace(/[^0-9\-]/g, '')),
          supply: Number(arr[6].replace(/[^0-9\-]/g, '')),
          vat: Number(arr[7].replace(/[^0-9\-]/g, '')),
          etc: arr[8]
        };
        resultObj.items.push(tempObj);
        supplySum += tempObj.supply;
        vatSum += tempObj.vat;
      }

      resultObj.sum.total = supplySum + vatSum;
      resultObj.sum.supply = supplySum;
      resultObj.sum.vat = vatSum;

      console.log(resultObj);
      resultObjTong.push(resultObj);
      htmlNum++;

    }

    resultObjTong.sort((a, b) => { return a.date.valueOf() - b.date.valueOf(); });
    for (let json of resultObjTong) {
      rows = await back.mongoRead("taxBill", { id: json.id }, { selfMongo });
      if (rows.length === 0) {
        await back.mongoCreate("taxBill", json, { selfMongo });
        console.log("mongo insert");
        if (json.who.from.business !== "221-81-49759") {
          await slack_bot.chat.postMessage({ text: json.toMessage(), channel: "#701_taxbill" });
        }
      }
    }

  } catch (e) {
    console.log(e);
  } finally {
    await MONGOLOCALC.close();
    await slack_bot.chat.postMessage({ text: "taxBill success : " + JSON.stringify(new Date()), channel: "#error_log" });
  }
}

ReceiptObserver.prototype.wssClientLaunching = async function (url = "") {
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

    setTimeout(async () => {
      await MONGOC.close();
      process.exit();
    }, (1000 * 60 * 60 * 24) + (1000 * 60 * 5));

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
            await instance.mother.slack_bot.chat.postMessage({ text: "문자 변동 감지", channel: "#error_log" });
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
                await MONGOC.close();
                process.exit();

              }
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

ReceiptObserver.prototype.taxServerLaunching = async function () {
  const instance = this;
  const { fileSystem, shell, shellLink, mongo, mongoinfo, mongolocalinfo } = this.mother;
  const https = require("https");
  const express = require("express");
  const app = express();
  const bodyParser = require("body-parser");
  const multer = require("multer");
  const multiForms = multer();

  app.use(bodyParser.json());
  app.use(multiForms.array());
  app.use(bodyParser.urlencoded({ extended: true }));

  try {
    await this.back.setInfoObj({ getMode: false });

    const MONGOC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
    const MONGOLOCALC = new mongo(mongolocalinfo, { useUnifiedTopology: true });

    await MONGOC.connect();
    await MONGOLOCALC.connect();
    console.log(`set db`);

    //set cron
    const CronGhost = require(process.cwd() + "/apps/cronGhost/cronGhost.js");
    const cron = new CronGhost();
    const cronScript = await cron.scriptReady(3);
    shell.exec(`python3 ${shellLink(cronScript)}`, { async: true });
    console.log(`set cron`);

    //set pem key
    let pems = {};
    let pemsLink = process.cwd() + "/pems/" + this.address.pythoninfo.host;
    let certDir, keyDir, caDir;

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

    //set router
    const ReceiptRouter = require(`${this.dir}/router/receiptRouter.js`);
    const router = new ReceiptRouter(MONGOC, MONGOLOCALC);
    const rouObj = router.getAll();
    for (let obj of rouObj.get) {
      app.get(obj.link, obj.func);
    }
    for (let obj of rouObj.post) {
      app.post(obj.link, obj.func);
    }
    console.log(`set router`);

    //server on
    https.createServer(pems, app).listen(3000, () => {
      console.log(``);
      console.log(`\x1b[33m%s\x1b[0m`, `Server running`);
      console.log(``);
    });

  } catch (e) {
    console.log(e);
  }
}


module.exports = ReceiptObserver;
