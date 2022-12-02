const Ghost = function () {
  const Mother = require(process.cwd() + "/apps/mother.js");
  const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js");
  const GoogleSheet = require(process.cwd() + "/apps/googleAPIs/googleSheet.js");
  const GoogleDrive = require(process.cwd() + "/apps/googleAPIs/googleDrive.js");
  const ADDRESS = require(process.cwd() + "/apps/infoObj.js");
  const { WebClient } = require("@slack/web-api");
  this.mother = new Mother();
  this.back = new BackMaker();
  this.sheets = new GoogleSheet();
  this.drive = new GoogleDrive();
  this.slack_token = "xoxb-717757271335-2032150390679-1FTxRg4wQasMpe9kKDgAdqBv";
  this.slack_bot = new WebClient(this.slack_token);
  this.address = ADDRESS;
  this.homeliaisonServer = this.address.officeinfo.ghost.file.static + this.address.officeinfo.ghost.file.office;
  this.photoServer = this.address.officeinfo.ghost.file.static + "/photo";
  this.projectServer = this.address.officeinfo.ghost.file.static + "/photo/designer";
  this.photoServerClient = this.photoServer + "/고객 전송 사진";
  this.photoServerDesigner = this.photoServer + "/디자이너 포트폴리오";
  this.serverTempFolder = this.address.officeinfo.ghost.file.static + "/temp";
  this.alien = process.cwd() + "/alien.js";
  this.ghost = process.cwd() + "/ghost.js";
  this.robot = process.cwd() + "/robot.js";
  this.formidable = require("formidable");
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

Ghost.timeouts = {};

Ghost.intervals = {};

Ghost.prototype.setTimer = function (callback, timeObj) {
  if (typeof timeObj !== "object" || typeof callback !== "function") {
    throw new Error("arguments must be Object: timeObj, Function: callback");
  }
  const instance = this;
  const { shell, shellLink, dateToString } = this.mother;
  const nowDate = new Date();
  let targetDate;
  let result, time;
  let timeoutObj;
  let logName;

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

  logName = ".__timerCallback_waiting___at_" + dateToString(targetDate, true).replace(/ /gi, '_').replace(/\-/gi, '_').replace(/\:/gi, '_') + "__Dont_git_pull_yet___please__";
  shell.exec(`touch ${shellLink(process.cwd())}/${logName}`);
  result = targetDate.valueOf() - nowDate.valueOf();
  if (result < 0) {
    time = 0;
  } else {
    time = result;
  }

  return new Promise(function (resolve, reject) {
    timeoutObj = setTimeout(function () {
      callback();
      shell.exec(`rm -rf ${shellLink(process.cwd())}/${logName}`);
      resolve(time);
      clearTimeout(timeoutObj);
      timeoutObj = null;
    }, time);
  });
}

Ghost.prototype.clientPrint = async function (cliid, MONGOC = null) {
  if (typeof cliid !== "string") {
    throw new Error("invalid input");
  }
  const instance = this;
  const back = this.back;
  const { fileSystem, shellExec, shellLink, errorLog } = this.mother;
  const fontName = `/home/homeliaison/font/NanumGothicEco.ttf`;
  const getPrinterName = function () {
    const { spawn } = require("child_process");
    const lpstat = spawn("lpstat", [ "-p" ]);
    let printer;
    return new Promise((resolve, reject) => {
      lpstat.stdout.on("data", (data) => {
        const arr = String(data).split("\n").map((i) => { return i.trim(); });
        const printerRaw = arr.find((i) => { return /^printer/gi.test(i) && /EPSON_WF_2650_Series/gi.test(i); });
        if (typeof printerRaw !== "string") {
          reject("There is no printer");
        }
        printer = printerRaw.trim().split(' ')[1];
        lpstat.kill();
        resolve(printer);
      });
    });
  }
  const getPrintCommand = function (printer, targetFile) {
    return `uniprint -printer ${printer} -size 9 -hsize 0 -L -media A4 -wrap -font ${fontName} ${targetFile}`;
  }
  const nowValue = (new Date()).valueOf();
  const tempFileName = (cliid) => { return `printerTemp_${cliid}_${String(nowValue)}.txt`; };
  try {
    let client, targetFile, printer;

    client = await back.getClientById(cliid, { selfMongo: MONGOC, withTools: true });
    if (client === null) {
      throw new Error("invalid cliid");
    }
    targetFile = `${shellLink(process.cwd())}/temp/${tempFileName(client.cliid)}`;
    await fileSystem(`write`, [ targetFile, client.toPrint() ]);

    printer = await getPrinterName();

    await shellExec(getPrintCommand(printer, targetFile));
    await shellExec("rm", [ "-rf", targetFile ]);

    return client;

  } catch (e) {
    errorLog("Ghost clientPrint error : " + e.message).catch((err) => { console.log(err); });
    console.log(e);
  }
}

Ghost.prototype.slackToMongo = async function (selfMongo) {
  const instance = this;
  const { slack_token: token, slack_bot } = this;
  const { messageLog, errorLog } = this.mother;
  const collection = "slackMessages";
  const userMap = {
    UM1S7H3GQ: "Clare",
    UM1SUNFFX: "Jini",
    UM1CS4ZRS: "uragen",
    UNYELBLNP: "jenny",
    TM3N97Z9V: "Olivia",
    U016MUF8TDE: "서미화",
    U01JL6U5NPP: "임지민",
    U01HFUADKB8: "이큰별",
  };
  const targets = [
    "#000_master_notice",
    "#001_staff_notice",
    "#100_service",
    "#300_designer",
    "#401_consulting",
    "#502_sns_contents",
    "#700_operation",
    "#701_taxbill",
  ];
  try {
    const channels = (await slack_bot.conversations.list({ token })).channels;
    const returnMessages = async (target) => {
      try {
        let result, index;
        let channelId;
        let tong;
        let tempDate;
        let thisChannel;

        index = channels.findIndex((obj) => { return (new RegExp(target.replace(/\#/gi, '').trim(), "gi")).test(obj.name.trim()) });
        if (index === -1) {
          throw new Error("cannot find channel");
        }
        thisChannel = channels[index];
        channelId = thisChannel.id;
        result = await slack_bot.conversations.history({
          channel: channelId
        });

        result.messages = result.messages.filter((obj) => { return typeof obj.client_msg_id === "string" });

        tong = [];
        for (let obj of result.messages) {
          obj.id = obj.client_msg_id;
          delete obj.client_msg_id;
          obj.date = new Date(Number(obj.ts) * 1000);
          delete obj.ts;
          obj.user = userMap[obj.user] === undefined ? obj.user : userMap[obj.user];
          obj.channel = {
            id: channelId,
            name: thisChannel.name,
          }
          tong.push(obj);
        }

        tong.sort((a, b) => {
          return a.date.valueOf() - b.date.valueOf();
        });

        return tong;
      } catch (e) {
        console.log(e);
      }
    }
    let totalTong;
    let tempArr;
    let idArr;
    let rows;
    let uploadTargets;
    let index;

    totalTong = [];
    for (let t of targets) {
      tempArr = await returnMessages(t);
      totalTong = totalTong.concat(tempArr);
    }

    idArr = totalTong.map((obj) => { return { id: obj.id } });

    rows = await selfMongo.db(`miro81`).collection(collection).find({ $or: idArr }).toArray();

    uploadTargets = [];
    for (let t of totalTong) {
      index = rows.findIndex((obj) => { return obj.id === t.id });
      if (index === -1) {
        uploadTargets.push(t);
      }
    }

    for (let obj of uploadTargets) {
      await selfMongo.db(`miro81`).collection(collection).insertOne(obj);
      console.log(obj);
    }

    await messageLog("slack sync done : " + JSON.stringify(new Date()));

    return totalTong;

  } catch (e) {
    await errorLog("slack sync error : " + e.message);
    console.log(e);
  }
}

Ghost.prototype.consoleQ = function (question) {
  const readline = require(`readline`);
  const rL = readline.createInterface({ input : process.stdin, output : process.stdout });
  return new Promise(function (resolve, reject) {
    rL.question(question, function (input) {
      resolve(input);
      rL.close();
    });
  });
}

Ghost.prototype.callHistory = async function (MONGOC, MONGOCONSOLEC) {
  const instance = this;
  const back = this.back;
  const { requestSystem, stringToDate, errorLog, autoHypenPhone } = this.mother;
  const url = "https://centrex.uplus.co.kr/RestApi/callhistory";
  const { officeinfo: { phone: { numbers: phoneNumbers, password: pass } } } = instance.address;
  const querystring = require("querystring");
  const callConst = "c_";
  const uniqueConst = "u_";
  const successStandardSec = 200;
  try {
    const selfMongo = MONGOC;
    const selfConsoleInfo = MONGOCONSOLEC;
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
      } while (data.SVC_RT === '0000');
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
          if (tong[callConst + obj.DST] !== undefined) {
            tong[callConst + obj.DST].in.push(JSON.parse(JSON.stringify(obj)));
          }
        }
      } while (data.SVC_RT === '0000');
    }

    outArr = [];
    inArr = [];
    for (let c in tong) {
      for (let obj of tong[c].out) {
        tempObj = {};
        tempObj.date = stringToDate(obj.TIME);
        tempObj.to = autoHypenPhone(obj.DST);
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
        tempObj.from = autoHypenPhone(obj.SRC);
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

    console.log("call history update success");
    errorLog("callHistory update sync success : " + JSON.stringify(new Date())).catch((err) => { console.log(err) });

  } catch (e) {
    console.log(e);
    await errorLog("call history fail " + e.message);
  }
}

Ghost.prototype.recordBackup = async function () {
  const instance = this;
  const address = this.address;
  const { fileSystem, shellExec, shellLink, requestSystem, dateToString, uniqueValue, binaryRequest } = this.mother;
  const storeMother = address.officeinfo.ghost.file.static + address.officeinfo.ghost.file.office + "/통화녹취파일";
  const jsdom = require("jsdom");
  const { JSDOM } = jsdom;
  const urls = {
    init: "https://centrex.uplus.co.kr/premium",
    login: "https://centrex.uplus.co.kr/premium/PHP/web_login.php",
    list: "https://centrex.uplus.co.kr/premium/backoffice/record_list.html",
    delete: "https://centrex.uplus.co.kr/premium/PHP/deleteRecordFile.php"
  };
  const splitToken = "__split__";
  const tempFolder = process.cwd() + "/temp";
  try {
    const storeMotherContents = (await fileSystem(`readDir`, [ storeMother ])).filter((str) => { return !/^\./.test(str); });
    const folderName = "records_" + dateToString(new Date()).replace(/\-/gi, '') + "_" + uniqueValue("string");
    let url, res, dom, token, idsave, id, pass;
    let session;
    let inputs;
    let postData;
    let trArr;
    let aNode, aArr;
    let pageNum;
    let totalLinks;
    let log;
    let tempbinary;
    let storeTargets;
    let downloadedFiles;
    let errorBoo;
    let safeNum;

    url = urls.init;
    res = await requestSystem(url);

    dom = new JSDOM(res.data);

    token = dom.window.document.querySelectorAll("input")[2].value;
    session = res.headers["set-cookie"][0].split(';')[0];
    idsave = 1;
    id = address.officeinfo.phone.total.number;
    pass = address.officeinfo.phone.total.password;

    url = urls.login;
    res = await requestSystem(url, { token, idsave, id, pass }, { headers: { Cookie: session } });

    url = urls.list;
    res = await requestSystem(url, {}, { method: "get", headers: { Cookie: session } });

    dom = new JSDOM(res.data);
    inputs = dom.window.document.querySelector('form').children;
    postData = {};
    for (let input of inputs) {
      if (/INPUT/gi.test(input.nodeName)) {
        postData[input.getAttribute("name")] = input.getAttribute("value");
      }
    }

    pageNum = 0;
    totalLinks = [];
    do {
      pageNum++;
      postData.page = String(pageNum);
      res = await requestSystem(url, postData, { headers: { Cookie: session } });
      dom = new JSDOM(res.data);
      trArr = [ ...dom.window.document.querySelector('.contents_area').querySelector('.table_type01').querySelectorAll('tr') ];
      aArr = [];
      for (let tr of trArr) {
        aNode = tr.querySelector('a');
        if (aNode !== null) {
          aArr.push(aNode.getAttribute("href"));
        }
      }

      aArr = aArr.map((str) => { return str.trim(); }).filter((str) => { return str !== '#'; }).map((str) => {
        return str + splitToken + String(pageNum);
      });
      totalLinks = totalLinks.concat(aArr);
    } while (aArr.length !== 0);

    totalLinks = [ ...new Set(totalLinks) ].map((str) => {
      return urls.init + str.slice(2);
    }).map((link) => {
      let tempArr, tempArr1, obj, page;
      page = Number(link.split(splitToken)[1]);
      link = link.split(splitToken)[0];
      tempArr = link.split('?');
      tempArr1 = tempArr[1].split('&').map((s) => { return s.split('='); });
      obj = {};
      for (let [ key, value ] of tempArr1) {
        obj[key] = value;
      }
      return { link, page, host: tempArr[0], data: obj };
    });

    log = {
      date: new Date(),
      length: totalLinks.length,
      records: totalLinks
    };

    await shellExec(`rm -rf ${shellLink(tempFolder)}/${folderName}`);
    await shellExec(`mkdir ${shellLink(tempFolder)}/${folderName}`);

    for (let i = 0; i < totalLinks.length; i++) {
      safeNum = 0;
      do {
        errorBoo = true;
        try {
          tempbinary = await binaryRequest(totalLinks[i].link, null, { headers: { Cookie: session } });
          await fileSystem(`writeBinary`, [ `${process.cwd()}/temp/${folderName}/${totalLinks[i].data.filename}`, tempbinary ]);
          console.log(`${totalLinks[i].data.filename} download success`);

          postData.page = String(totalLinks[i].page);
          postData["chk[]"] = totalLinks[i].data.filename.split('-')[0] + "|" + totalLinks[i].data.filename;
          res = await requestSystem(urls.delete, postData, { headers: { Cookie: session } });
          console.log(`${totalLinks[i].data.filename} server delete success`);

          errorBoo = false;
        } catch (e) {
          errorBoo = true;
        }
        safeNum++;
      } while (errorBoo || safeNum > 10);
    }

    storeTargets = {};
    for (let str of storeMotherContents) {
      storeTargets['p' + str.split('_')[0]] = str;
    }

    downloadedFiles = (await fileSystem(`readDir`, [ `${tempFolder}/${folderName}` ])).filter((str) => { return !/^\./.test(str); });
    downloadedFiles = downloadedFiles.map((str) => {
      return { target: 'p' + str.split('-')[0].replace(/^0/gi, '').replace(/^0/gi, ''), file: `${tempFolder}/${folderName}/${str}` };
    });

    for (let { target, file } of downloadedFiles) {
      if (typeof storeTargets[target] === "string") {
        await shellExec(`mv ${shellLink(file)} ${shellLink(storeMother + "/" + storeTargets[target])};`);
      }
    }

    await shellExec(`rm -rf ${shellLink(tempFolder)}/${folderName};`);

    return log;

  } catch (e) {
    console.log(e);
    return false;
  }
}

Ghost.prototype.insyncCheck = async function () {
  const instance = this;
  const { shellExec, errorLog, messageLog } = this.mother;
  const successCode = 200;
  const failCode = 500;
  try {
    const statusRaw = await shellExec(`insync-headless status`);
    const statusRawArr = statusRaw.split("\n").map((s) => { return s.trim(); }).filter((s) => { return s !== '' });
    let index, result;

    index = statusRawArr.findIndex((s) => { return /^Sync status\:/i.test(s); });
    result = {};
    if (index !== -1) {
      result.status = /SYNC/gi.test(statusRawArr[index].split(':').map((s) => { return s.trim(); })[1]) ? successCode : failCode;
      index = statusRawArr.findIndex((s) => { return /^Syncing files\:/i.test(s); });
      if (index !== -1) {
        result.doing = statusRawArr.slice(index + 1);
      }
    }

    if (result.status !== successCode) {
      await errorLog("insync 문제 발생함 : \n" + statusRaw);
    }

    return result;
  } catch (e) {
    await errorLog("Ghost.insyncCheck error : " + e.message);
  }
}

Ghost.prototype.mongoToJson = async function () {
  const instance = this;
  const back = this.back;
  const { fileSystem, shell, shellLink } = this.mother;
  try {
    const today = new Date();
    const zeroAddition = function (number) {
      if (number < 10) {
        return `0${String(number)}`;
      } else {
        return String(number);
      }
    }
    const backFolderName = "backup";
    const mongoTargets = [
      [ "mongoinfo", "mongo" ],
      [ "backinfo", "console" ],
      [ "pythoninfo", "python" ],
    ];
    const robotDirArr = process.cwd().split("/");
    robotDirArr.pop();
    const robotDirMother = robotDirArr.join("/");
    const robotDirMotherDetail = await fileSystem(`readDir`, [ robotDirMother ]);
    if (!robotDirMotherDetail.includes(backFolderName)) {
      shell.exec(`mkdir ${shellLink(robotDirMother)}/${backFolderName}`);
    }
    const backDir = robotDirMother + "/" + backFolderName;
    let tempObj, tempInfo, collections, order, timeString;

    timeString = `${String(today.getFullYear())}${zeroAddition(today.getMonth() + 1)}${zeroAddition(today.getDate())}${zeroAddition(today.getHours())}${zeroAddition(today.getMinutes())}${zeroAddition(today.getSeconds())}`;

    for (let [ infoName, dbName ] of mongoTargets) {
      tempObj = {};
      tempObj[dbName] = true;
      collections = await back.mongoListCollections(tempObj);
      tempInfo = this.address[infoName];
      for (let collection of collections) {
        order = `mongoexport --uri="mongodb://${tempInfo["host"]}/${tempInfo["database"]}" --username=${tempInfo["user"]} --password=${tempInfo["password"]} --port=${String(tempInfo["port"])} --collection=${collection} --out="${shellLink(backDir)}/${timeString}/${collection}${timeString}.json" --authenticationDatabase admin`;
        shell.exec(order);
      }
    }

    return `mongo exports done`;
  } catch (e) {
    console.log(e);
  }
}

Ghost.prototype.ultimateReflection = async function () {
  try {
    const MongoReflection = require(`${process.cwd()}/apps/mongoReflection/mongoReflection.js`);
    const reflection = new MongoReflection();
    await reflection.ultimateReflection();

    return `ultimate reflection done`;
  } catch (e) {
    console.log(e);
  }
}

Ghost.prototype.clientReport = async function () {
  try {
    const sheets = this.sheets;
    const sheetId = "14tnBRhwpvrf0h6iYTJzLaxs8UPseNYsznhdhV5kc0UM";
    const startPoint = [ 0, 0 ];
    const report = await this.back.getClientReport();
    await sheets.update_value_inPython(sheetId, "", report.getMatrix(), startPoint);
    console.log(`\x1b[33m%s\x1b[0m`, `sheets upload done`);

    return `client report done`;
  } catch (e) {
    console.log(e);
  }
}

Ghost.prototype.requestObject = async function () {
  const instance = this;
  const back = this.back;
  const { shell, shellLink, fileSystem, mongo, mongoinfo, mongolocalinfo, requestSystem } = this.mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  const MONGOLOCALC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
  try {
    await MONGOC.connect();
    await MONGOLOCALC.connect();

    // DEV AREA ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    let to, json;
    let res;

    // to = "http://homeliaison.ddns.net:3000/shell";
    to = "https://homeliaison.ddns.net:3000/readDir";
    // to = "http://homeliaison.ddns.net:3000/fixDir";
    // to = "http://homeliaison.ddns.net:3000/mkdir";

    const motherDir = "__samba__/디자이너";
    // const motherDir = "__samba__/디자이너/신청자";
    // const motherDir = "__samba__/사진_등록_포트폴리오";
    // let orders, aspirants;
    //
    // orders = [];
    //
    // aspirants = await back.getAspirantsByQuery({}, { selfMongo: MONGOLOCALC });
    // for (let a of aspirants) {
    //   orders.push(motherDir + "/" + a.aspid + "_" + a.designer);
    // }

    json = {
      target: motherDir,
    };

    // const { data } = await requestSystem(to, json, { "Content-Type": "application/json" });
    //
    // console.log(data);
    //
    // let tong, targetNames;
    //
    // targetNames = [
    //   "등록서류",
    //   "포트폴리오",
    // ];
    // tong = [];
    // for (let folderName of data) {
    //   if (folderName !== `.DS_Store`) {
    //     for (let targetName of targetNames) {
    //       tong.push(motherDir + "/" + folderName + "/" + targetName);
    //     }
    //   }
    // }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    let order;

    order = '';
    order += "curl"
    order += " ";
    order += "-d";
    order += " ";
    order += "'";
    order += JSON.stringify(json);
    order += "'";
    order += " ";
    order += '-H "Content-Type: application/json" -X POST ';

    order += to;

    const { stdout } = shell.exec(order, { silent: true });
    if (/^[\[\{]/.test(stdout.trim())) {
      console.log(JSON.parse(stdout.trim()));
    } else {
      console.log(stdout);
    }

  } catch (e) {
    console.log(e);
  } finally {
    MONGOC.close();
    MONGOLOCALC.close();
    console.log(`done`);
  }
}

Ghost.prototype.dirParsing = function (dir) {
  const instance = this;
  if (/__home__/g.test(dir)) {
    dir = dir.replace(/__home__/g, process.env.HOME);
  }
  if (/__samba__/g.test(dir)) {
    dir = dir.replace(/__samba__/g, instance.homeliaisonServer);
  }
  if (/__photo__/g.test(dir)) {
    dir = dir.replace(/__photo__/g, instance.photoServerClient);
  }
  if (/__designer__/g.test(dir)) {
    dir = dir.replace(/__designer__/g, instance.photoServerDesigner);
  }
  if (/__project__/g.test(dir)) {
    dir = dir.replace(/__project__/g, instance.photoServer + "/designer");
  }
  return dir;
}

Ghost.prototype.ghostRouter = function (needs) {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const { webHook, serverTempFolder } = this;
  const [ MONGOC, MONGOLOCALC, MONGOCONSOLEC, rethink ] = needs;
  const { fileSystem, headRequest, requestSystem, shell, shellExec, shellLink, ghostRequest, dateToString, todayMaker, mongo, mongoinfo, mongolocalinfo, sleep, equalJson, leafParsing, uniqueValue, setQueue, ipParsing, errorLog, messageSend, messageLog, mysqlQuery, treeParsing } = this.mother;
  const querystring = require("querystring");
  const PlayAudio = require(process.cwd() + "/apps/playAudio/playAudio.js");
  const ParsingHangul = require(process.cwd() + "/apps/parsingHangul/parsingHangul.js");
  const ImageReader = require(process.cwd() + "/apps/imageReader/imageReader.js");
  const GoogleChrome = require(process.cwd() + "/apps/googleAPIs/googleChrome.js");
  const jsdom = require("jsdom");
  const { JSDOM } = jsdom;
  const audio = new PlayAudio();
  const hangul = new ParsingHangul();
  const imageReader = new ImageReader(this.mother, this.back, this.address);
  const chrome = new GoogleChrome();
  let funcObj = {};
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

  //GET - redirect
  funcObj.get_root = {
    link: [ "/" ],
    func: async function (req, res) {
      try {
        res.set({
          "Content-Type": "text/html",
          "Access-Control-Allow-Origin": '*',
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
          "Access-Control-Allow-Headers": '*',
        });
        res.send(`<script>window.location.href = "https://naver.com";</script>`);
      } catch (e) {
        console.log(e);
      }
    }
  };

  //GET - redirect
  funcObj.get_ip = {
    link: [ "/ip" ],
    func: async function (req, res) {
      try {
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        res.set({
          "Content-Type": "text/html",
          "Access-Control-Allow-Origin": '*',
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
          "Access-Control-Allow-Headers": '*',
        });
        res.send(String(ip).replace(/[^0-9\.]/gi, ''));
      } catch (e) {
        console.log(e);
      }
    }
  };

  //GET - ssl test
  funcObj.get_ssl = {
    link: [ "/ssl" ],
    func: async function (req, res) {
      try {
        instance.callHistory(MONGOC, MONGOCONSOLEC).then(() => {
          return errorLog("callHistory update sync success : " + JSON.stringify(new Date()));
        }).catch((err) => {
          errorLog("ghost error (ssl cron): " + err.message).catch((e) => { console.log(e); });
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
  };

  //GET - polling test
  funcObj.get_polling = {
    link: [ "/polling" ],
    func: async function (req, res) {
      try {
        console.log(req);
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
  };

  //GET - callHistory
  funcObj.get_callHistory = {
    link: [ "/callHistory" ],
    func: async function (req, res) {
      try {

        instance.callHistory(MONGOC, MONGOCONSOLEC).then(() => {
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
  };

  //GET - slackSync
  funcObj.get_slackSync = {
    link: [ "/slackSync" ],
    func: async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      try {
        instance.slackToMongo(MONGOLOCALC).catch((err) => {
          errorLog("slackToMongo error : " + err.message).catch((e) => { console.log(e); });
        });
        res.send(JSON.stringify({ message: "hello?" }));
      } catch (e) {
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    }
  };

  //GET - recordBackup
  funcObj.get_recordBackup = {
    link: [ "/recordBackup" ],
    func: async function (req, res) {
      try {
        const backupFunc = async function () {
          try {
            const logCollection = "recordBackupLog";
            let safeNum, log;
            safeNum = 0;
            do {
              log = await instance.recordBackup();
              safeNum++;
            } while (log === false || safeNum < 10);
            await messageLog("record backup and delete done");
          } catch (e) {
            await errorLog("record backup and delete error : " + e.message);
          }
        }

        backupFunc().catch((err) => {
          errorLog("record backup and delete error : " + err.message).catch((e) => { console.log(e); });
        });

        res.set({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": '*',
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
          "Access-Control-Allow-Headers": '*',
        });
        res.send(JSON.stringify({ message: "will do" }));
      } catch (e) {
        console.log(e);
      }
    }
  };

  //POST - tong delete
  funcObj.post_tongDelete = {
    link: [ "/tongDelete" ],
    func: async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      try {
        shellExec(`rm`, [ `-rf`, `${instance.address.officeinfo.ghost.file.static}/tong` ]).then(() => {
          return shellExec(`mkdir`, [ `${instance.address.officeinfo.ghost.file.static}/tong` ]);
        }).catch((err) => {
          throw new Error(err.message);
        })
        res.send(JSON.stringify({ message: "will do" }));
      } catch (e) {
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    }
  };

  //POST - file upload
  funcObj.post_fileUpload = {
    binary: true,
    link: [ "/fileUpload", "/file", "/upload" ],
    func: function (req, res) {
      const form = instance.formidable({ multiples: true, encoding: "utf-8", maxFileSize: (10000 * 1024 * 1024) });
      form.parse(req, async function (err, fields, files) {
        try {
          if (err) {
            throw new Error(err);
            return;
          } else {
            res.set({
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": '*',
              "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
              "Access-Control-Allow-Headers": '*',
            });

            const staticFolder = instance.address.officeinfo.ghost.file.static;
            const toArr = JSON.parse(fields.toArr).map((path) => { return hangul.fixString(path); });
            let filesKey, fromArr, num;
            let tempArr, tempString, tempDir;

            filesKey = Object.keys(files);
            filesKey.sort((a, b) => {
              return Number(a.replace(/[^0-9]/gi, '')) - Number(b.replace(/[^0-9]/gi, ''));
            });

            fromArr = [];
            for (let key of filesKey) {
              fromArr.push(files[key]);
            }

            num = 0;
            for (let { filepath: path } of fromArr) {
              tempArr = toArr[num].split("/");
              tempString = staticFolder;
              if (tempArr.length === 0) {
                throw new Error("invaild to array");
              }
              for (let i = 0; i < tempArr.length - 1; i++) {
                tempDir = await fileSystem(`readDir`, [ tempString ]);
                if (!tempDir.includes(tempArr[i]) && tempArr[i] !== "") {
                  await shellExec(`mkdir ${shellLink(tempString + "/" + tempArr[i])}`);
                }
                tempString += '/';
                tempString += tempArr[i];
              }
              await shellExec(`mv ${shellLink(path)} ${shellLink(staticFolder + "/" + toArr[num])}`);
              if (/\.pdf$/i.test(toArr[num])) {
                imageReader.pdfToJpg(staticFolder + "/" + toArr[num]).catch((err) => { console.log(err); });
              }
              num++;
            }

            res.send(JSON.stringify({ "message": "done" }));
          }
        } catch (e) {
          console.log(e);
        }
      });
    }
  };

  //POST - backup
  funcObj.post_backup = {
    link: [ "/backup" ],
    func: function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      instance.mongoToJson().then(function () {
        return instance.ultimateReflection();
      }).then(function () {
        console.log("backup done");
      }).catch(function (err) {
        console.log(err);
      });
      res.send(JSON.stringify({ message: "success" }));
    }
  };

  //POST - mkdir
  funcObj.post_mkdir = {
    link: [ "/mkdir", "/rm", "/touch" ],
    func: function (req, res) {
      let command;
      let order;
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      if (req.body.target === undefined) {
        console.log(req.body);
        res.send(JSON.stringify({ error: "must be property 'target'" }));
      } else {
        if (req.url === "/mkdir") {
          order = "mkdir";
        } else if (req.url === "/rm") {
          order = "rm -rf";
        } else if (req.url === "/touch") {
          order = "touch";
        }
        let { target } = req.body;
        command = '';
        if (Array.isArray(target)) {
          for (let d of target) {
            d = instance.dirParsing(d);
            command += `${order} ${shellLink(d)};`;
          }
        } else {
          target = instance.dirParsing(target);
          command = `${order} ${shellLink(target)}`;
        }
        shell.exec(command, { async: true });
        res.send(JSON.stringify({ message: "success" }));
      }
    }
  };

  //POST - readDir
  funcObj.post_readDir = {
    link: [ "/readDir", "/ls" ],
    func: function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      let target;
      if (req.body.target === undefined) {
        target = "__samba__";
      } else {
        target = req.body.target;
      }
      target = instance.dirParsing(target);

      fileSystem(`readDir`, [ target ]).then((list) => {
        let list_refined = [];
        for (let i of list) {
          if (!/^\._/.test(i) && !/DS_Store/gi.test(i)) {
            list_refined.push(i);
          }
        }
        res.send(JSON.stringify(list_refined));
      }).catch((e) => { throw new Error(e); });

    }
  };

  //POST - link parsing
  funcObj.post_linkParsing = {
    link: [ "/linkParsing" ],
    func: async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      try {
        if (req.body.links === undefined) {
          throw new Error("invaild post");
        }
        const targets = equalJson(req.body.links);
        let tong, raw, rawArr, link, memo;

        tong = [];
        for (let { desid, proid, file } of targets) {

          raw = (await fileSystem(`readString`, [ `${instance.projectServer}/${desid}/${proid}/${file}` ])).trim();
          rawArr = raw.split("\n");
          if (rawArr.length === 1) {
            link = rawArr[0];
            memo = "";
          } else if (rawArr.length > 1) {
            link = rawArr[0];
            memo = rawArr[1];
          } else {
            link = "";
            memo = "";
          }

          tong.push({ desid, proid, file, link, memo });
        }

        res.send(JSON.stringify(tong));
      } catch (e) {
        res.send(JSON.stringify({ error: e.message }));
      }
    }
  };

  //POST - link save
  funcObj.post_linkSave = {
    link: [ "/linkSave" ],
    func: async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      try {
        if (req.body.proid === undefined || req.body.desid === undefined || req.body.link === undefined || req.body.memo === undefined || req.body.key === undefined) {
          throw new Error("invaild post");
        }
        const { proid, desid, link, memo, key } = req.body;
        const now = new Date();
        await fileSystem(`write`, [ `${instance.projectServer}/${desid}/${proid}/${key}_${String(now.valueOf())}_${String(0)}_${uniqueValue("hex")}.link`, (global.decodeURIComponent(link).trim() + "\n" + memo.trim()) ]);
        res.send(JSON.stringify({ message: "success" }));
      } catch (e) {
        res.send(JSON.stringify({ error: e.message }));
      }
    }
  };

  //POST - find client photos
  funcObj.post_clientPhoto = {
    link: [ "/clientPhoto" ],
    func: async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      try {
        if (req.body.cliid === undefined) {
          throw new Error("invaild post");
        }
        const preferredPhotoName = "preferredPhoto";
        const sitePhotoName = "sitePhoto";
        const { cliid } = req.body;
        let totalList, client, phone;
        let preferredPhoto, sitePhoto;
        let preferredPhotoList, sitePhotoList;
        let root;
        let mode;

        mode = "siteMode";
        if (req.body.fileMode !== undefined) {
          mode = "fileMode";
        }

        client = await back.getClientById(cliid, { selfMongo: MONGOC });
        if (client === null) {
          throw new Error("invaild cliid");
        }
        phone = client.phone.replace(/[^0-9]/g, '');
        root = instance.dirParsing("__photo__");
        totalList = await fileSystem(`readDir`, [ root ]);
        totalList = totalList.filter((i) => { return i !== ".DS_Store" }).filter((i) => { return (new RegExp(phone, "gi")).test(i); });

        preferredPhoto = [];
        sitePhoto = [];
        for (let t of totalList) {
          if (await fileSystem(`exist`, [ root + "/" + t + "/" + preferredPhotoName ])) {
            preferredPhotoList = (await fileSystem(`readDir`, [ root + "/" + t + "/" + preferredPhotoName ])).filter((i) => { return i !== `.DS_Store` && !/^\.\_/.test(i); }).map((i) => { return `${root}/${t}/${preferredPhotoName}/${i}`; });
          } else {
            preferredPhotoList = [];
          }
          if (await fileSystem(`exist`, [ root + "/" + t + "/" + sitePhotoName ])) {
            sitePhotoList = (await fileSystem(`readDir`, [ root + "/" + t + "/" + sitePhotoName ])).filter((i) => { return i !== `.DS_Store` && !/^\.\_/.test(i); }).map((i) => { return `${root}/${t}/${sitePhotoName}/${i}`; });
          } else {
            sitePhotoList = [];
          }
          preferredPhoto = preferredPhoto.concat(preferredPhotoList);
          sitePhoto = sitePhoto.concat(sitePhotoList);
        }

        if (mode !== "fileMode") {
          preferredPhoto = preferredPhoto.map((i) => { return `https://${instance.address.officeinfo.ghost.host}/${global.encodeURI(i.replace(new RegExp(instance.photoServer.split('/').slice(0, -1).join('/'), "gi"), '')).replace(/^\//, '')}`; });
          sitePhoto = sitePhoto.map((i) => { return `https://${instance.address.officeinfo.ghost.host}/${global.encodeURI(i.replace(new RegExp(instance.photoServer.split('/').slice(0, -1).join('/'), "gi"), '')).replace(/^\//, '')}`; });
        }

        res.send(JSON.stringify({ sitePhoto, preferredPhoto }));

      } catch (e) {
        res.send(JSON.stringify({ message: e.message + " : post must be { cliid }" }));
      }
    }
  };

  //POST - find designer photos
  funcObj.post_designerPhoto = {
    link: [ "/designerPhoto" ],
    func: async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      try {
        if (req.body.aspid === undefined || req.body.mode === undefined) {
          throw new Error("invaild post");
        }
        const preferredPhotoName = "preferredPhoto";
        const sitePhotoName = "sitePhoto";
        const { aspid, mode } = req.body;
        let totalList, aspirant, phone;
        let root;
        let middleList;
        let list;
        let tempArr;
        let designerTemp, zipFileName;
        let finalList;

        if (mode === "download") {

          aspirant = await back.getAspirantById(aspid, { selfMongo: MONGOC });
          if (aspirant === null) {
            throw new Error("invaild aspid");
          }
          phone = aspirant.phone.replace(/[^0-9]/g, '');
          root = instance.dirParsing("__designer__");
          totalList = await fileSystem(`readDir`, [ root ]);
          totalList = totalList.filter((i) => { return i !== ".DS_Store" }).filter((i) => { return !/^\.\_/.test(i); }).filter((i) => { return (new RegExp(phone, "gi")).test(i); });

          middleList = [];
          for (let t of totalList) {
            if (t !== ".DS_Store") {
              tempArr = await fileSystem(`readDir`, [ root + "/" + t ]);
              tempArr = tempArr.filter((i) => { return i !== ".DS_Store" }).filter((i) => { return !/^\.\_/.test(i); }).map((i) => { return `${root}/${t}/${i}`; });
              middleList = middleList.concat(tempArr);
            }
          }

          list = [];
          for (let path of middleList) {
            tempArr = await fileSystem(`readDir`, [ path ]);
            tempArr = tempArr.filter((i) => { return i !== ".DS_Store" }).filter((i) => { return !/^\.\_/.test(i); }).map((i) => { return `${path}/${i}`; });
            list = list.concat(tempArr);
          }

          designerTemp = `${aspid}_${String((new Date()).valueOf())}_${uniqueValue("string")}`;

          await shellExec(`rm`, [ `-rf`, serverTempFolder + "/" + designerTemp ]);
          await shellExec(`mkdir`, [ serverTempFolder + "/" + designerTemp ]);
          for (let l of list) {
            await shellExec(`cp ${shellLink(l)} ${shellLink(serverTempFolder)}/${designerTemp};`);
          }
          zipFileName = `${aspid}_${aspirant.phone.replace(/[^0-9]/gi, '')}_${uniqueValue("string")}.zip`;
          await shellExec(`cd ${shellLink(serverTempFolder)}/${designerTemp};zip ${shellLink(serverTempFolder)}/${zipFileName} ./*`);

          finalList = [ `${serverTempFolder}/${zipFileName}` ];
          finalList = finalList.map((i) => { return `https://${instance.address.officeinfo.ghost.host}/${global.encodeURI(i.replace(new RegExp(instance.photoServer.split('/').slice(0, -1).join('/'), "gi"), '')).replace(/^\//, '')}`; });

          res.send(JSON.stringify({ list: finalList, folder: designerTemp, file: zipFileName }));


        } else if (mode === "list") {

          aspirant = await back.getAspirantById(aspid, { selfMongo: MONGOC });
          if (aspirant === null) {
            throw new Error("invaild aspid");
          }
          phone = aspirant.phone.replace(/[^0-9]/g, '');
          root = instance.dirParsing("__designer__");
          totalList = await fileSystem(`readDir`, [ root ]);
          totalList = totalList.filter((i) => { return i !== ".DS_Store" }).filter((i) => { return !/^\.\_/.test(i); }).filter((i) => { return (new RegExp(phone, "gi")).test(i); });

          middleList = [];
          for (let t of totalList) {
            if (t !== ".DS_Store") {
              try {
                tempArr = await fileSystem(`readDir`, [ root + "/" + t ]);
              } catch {
                tempArr = [];
              }
              tempArr = tempArr.filter((i) => { return i !== ".DS_Store" }).filter((i) => { return !/^\.\_/.test(i); }).map((i) => { return `${root}/${t}/${i}`; });
              middleList = middleList.concat(tempArr);
            }
          }

          list = [];
          for (let path of middleList) {
            try {
              tempArr = await fileSystem(`readDir`, [ path ]);
              tempArr = tempArr.filter((i) => { return i !== ".DS_Store" }).filter((i) => { return !/^\.\_/.test(i); }).map((i) => { return `${path}/${i}`; });
              list = list.concat(tempArr);
            } catch {
              list.push(path);
            }
          }

          list = list.filter((path) => { return /\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i.test(path); });
          list = list.map((str) => {
            return `https://${instance.address.officeinfo.ghost.host}${global.encodeURI(str.replace(new RegExp('^' + instance.address.officeinfo.ghost.file.static), ''))}`;
          });

          res.send(JSON.stringify({ list }));

        } else if (mode === "delete") {
          if (req.body.folder === undefined || req.body.file === undefined) {
            throw new Error("invaild post");
          }
          await shellExec(`rm`, [ `-rf`, serverTempFolder + "/" + req.body.folder ]);
          await shellExec(`rm`, [ `-rf`, serverTempFolder + "/" + req.body.file ]);
          res.send(JSON.stringify({ message: "done" }));
        }

      } catch (e) {
        res.send(JSON.stringify({ message: e.message + " : post must be { aspid }" }));
      }
    }
  };

  //POST - find user photos
  funcObj.post_userPhoto = {
    link: [ "/userPhoto" ],
    func: async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      try {
        if (req.body.useid === undefined) {
          throw new Error("invaild post");
        }
        const staticPath = address.officeinfo.ghost.file.static + address.officeinfo.ghost.file.user;
        const selfMongo = MONGOC;
        const { useid } = req.body;
        const user = await back.getUserById(useid, { selfMongo });
        let keyArr;
        let dir;
        let tong;

        keyArr = user.request.photo.toNormal().map((obj) => { return obj.key });
        keyArr = keyArr.map((str) => { return { path: staticPath + "/" + str, link: address.officeinfo.ghost.file.user + "/" + str } });

        tong = [];
        for (let { path, link } of keyArr) {
          dir = await fileSystem("readDir", [ path ]);
          dir = dir.filter((str) => { return str !== ".DS_Store" }).map((str) => { return link + "/" + str });
          tong = tong.concat(dir);
        }

        res.send(JSON.stringify({ list: tong }));

      } catch (e) {
        res.send(JSON.stringify({ message: e.message + " : post must be { useid }" }));
      }
    }
  };

  //POST - find user key photos
  funcObj.post_userKey = {
    link: [ "/userKey" ],
    func: async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      try {
        if (req.body.key === undefined) {
          throw new Error("invaild post");
        }
        const staticPath = address.officeinfo.ghost.file.static + address.officeinfo.ghost.file.user;
        const selfMongo = MONGOC;
        const { key } = req.body;
        const keyDetailList = (await fileSystem("readDir", [ staticPath + "/" + key ])).filter((str) => { return str !== ".DS_Store" });
        res.send(JSON.stringify({ list: keyDetailList.map((str) => { return address.officeinfo.ghost.file.user + "/" + key + "/" + str }) }));
      } catch (e) {
        res.send(JSON.stringify({ message: e.message + " : post must be { useid }" }));
      }
    }
  };

  //POST - static delete
  funcObj.post_staticDelete = {
    link: [ "/staticDelete" ],
    func: async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      try {
        if (typeof req.body.path !== "string") {
          throw new Error("must be path");
        }
        if (!/^\//i.test(req.body.path)) {
          throw new Error("invaild path");
        }
        const { path } = req.body;
        let realDo;

        realDo = false;
        if (/^\/photo/gi.test(path)) {
          if (/고객 전송/gi.test(path)) {
            realDo = true;
          }
        }

        if (realDo) {
          await shellExec(`rm`, [ `-rf`, instance.address.officeinfo.ghost.file.static + path ]);
        }

        res.send(JSON.stringify({ message: "success" }));
      } catch (e) {
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    }
  };

  //POST - photo parsing
  funcObj.post_photoParsing = {
    link: [ "/photoParsing" ],
    func: async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      try {
        if (req.body.images === undefined) {
          throw new Error("invaild post, must be 'images' array");
        }
        const selfMongo = MONGOC;
        const { images } = equalJson(req.body);
        if (images === undefined) {
          throw new Error("images must be array");
        }
        if (!Array.isArray(images)) {
          throw new Error("images must be array");
        }
        if (!images.every((i) => { return /[ap]/gi.test(i) && /^[it]/i.test(i); })) {
          throw new Error("invaild name in images : " + JSON.stringify(images));
        }

        let pidArr, raw, contents, contentsArr, desidArr;
        let designers;
        let totalObj;

        pidArr = images.map((i) => {
          return i.replace(/\.[a-z]+$/gi, '').replace(/^[it][0-9]+/gi, '');
        });

        contentsArr = [];
        for (let pid of pidArr) {
          raw = await back.getContentsArrByQuery({ "contents.portfolio.pid": pid }, { selfMongo });
          if (raw.length !== 1) {
            throw new Error("invaild pid : " + JSON.stringify(pidArr));
          }
          [ contents ] = raw;
          contentsArr.push(contents);
        }

        desidArr = Array.from(new Set(contentsArr.map((c) => {
          return c.desid;
        })));

        if (desidArr > 0) {
          designers = (await back.getDesignersByQuery({ $or: desidArr.map((desid) => { return { desid }; }) }, { selfMongo })).map((d) => {
            return d.analytics.styling.tendency.toNormal();
          });
          if (designers.length > 0) {
            totalObj = equalJson(JSON.stringify(designers[0]));
            for (let i in totalObj) {
              for (let j in totalObj[i]) {
                totalObj[i][j] = 0;
              }
            }
            for (let style of designers) {
              for (let i in style) {
                for (let j in style[i]) {
                  totalObj[i][j] += style[i][j];
                }
              }
            }
            for (let i in totalObj) {
              for (let j in totalObj[i]) {
                totalObj[i][j] = Math.round((totalObj[i][j] / designers.length) * 100) / 100;
              }
            }
            res.send(JSON.stringify(totalObj));
          } else {
            throw new Error("There is no designer : " + JSON.stringify(desidArr));
          }
        } else {
          res.send(JSON.stringify([]));
        }

      } catch (e) {
        res.send(JSON.stringify({ message: e.message }));
      }
    }
  };

  //POST - list files
  funcObj.post_listFiles = {
    link: [ "/listFiles" ],
    func: function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      let target, finalTong;
      if (req.body.path === undefined) {
        target = "__samba__";
      } else {
        target = req.body.path.replace(/^\//i, '').replace(/\/$/i, '');
      }
      if (target.trim() === '') {
        target = "__samba__";
      }
      if (!/^__/.test(target)) {
        target = "__samba__" + "/" + target;
      }
      if (target.replace(/\/$/, '') !== "__samba__") {
        target = instance.dirParsing(target);
        leafParsing(target).then((list) => {
          res.send(JSON.stringify(list.map((i) => {
            i.absolute = i.absolute.replace(new RegExp("^" + instance.homeliaisonServer, "i"), "__samba__");
            if (/^\//i.test(i.absolute)) {
              i.absolute = i.absolute.replace(new RegExp("^" + instance.photoServerClient, "i"), "__photo__");
            }
            if (/^\//i.test(i.absolute)) {
              i.absolute = i.absolute.replace(new RegExp("^" + instance.photoServerDesigner, "i"), "__designer__");
            }
            return i;
          }).filter((i) => {
            return !/^\.\_/.test(i.absolute.split("/")[i.absolute.split("/").length - 1]);
          }).filter((i) => {
            return i.absolute.split("/")[i.absolute.split("/").length - 1] !== ".DS_Store";
          })));
        }).catch((err) => {
          res.send(JSON.stringify({ message: "error : " + err.message }));
        });
      } else {
        target = instance.dirParsing(target);
        finalTong = [];
        leafParsing(target).then((list) => {
          finalTong = finalTong.concat(list.map((i) => {
            i.absolute = i.absolute.replace(new RegExp("^" + instance.homeliaisonServer, "i"), "__samba__");
            if (/^\//i.test(i.absolute)) {
              i.absolute = i.absolute.replace(new RegExp("^" + instance.photoServerClient, "i"), "__photo__");
            }
            if (/^\//i.test(i.absolute)) {
              i.absolute = i.absolute.replace(new RegExp("^" + instance.photoServerDesigner, "i"), "__designer__");
            }
            return i;
          }).filter((i) => {
            return !/^\.\_/.test(i.absolute.split("/")[i.absolute.split("/").length - 1]);
          }).filter((i) => {
            return i.absolute.split("/")[i.absolute.split("/").length - 1] !== ".DS_Store";
          }));
          return leafParsing(instance.photoServer);
        }).then((list) => {
          finalTong = finalTong.concat(list.map((i) => {
            if (/고객/gi.test(i.absolute)) {
              i.absolute = "__photo__";
            } else if (/디자이너/gi.test(i.absolute)) {
              i.absolute = "__designer__";
            } else {
              i.absolute = ".DS_Store";
            }
            return i;
          }).filter((i) => {
            return !/^\.\_/.test(i.absolute.split("/")[i.absolute.split("/").length - 1]);
          }).filter((i) => {
            return i.absolute.split("/")[i.absolute.split("/").length - 1] !== ".DS_Store";
          }));
          res.send(JSON.stringify(finalTong));
        }).catch((err) => {
          res.send(JSON.stringify({ message: "error : " + err.message }));
        });

      }
    }
  };

  //POST - list
  funcObj.post_list = {
    link: [ "/list" ],
    func: function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      let target;
      if (typeof req.body.target !== "string") {
        res.send(JSON.stringify({ message: "error" }));
      } else {
        target = req.body.target;
        if (/\/$/.test(target)) {
          target = target.slice(0, -1);
        }
        if (/^\//.test(target)) {
          target = target.slice(1);
        }
        target = address.officeinfo.ghost.file.static + "/" + target;
        treeParsing(target, true, (i) => {
          return i.slice(address.officeinfo.ghost.file.static.length);
        }).then((arr) => {
          res.send(JSON.stringify(arr));
        }).catch((err) => {
          res.send(JSON.stringify({ message: "error" }));
        });
      }
    }
  };

  //POST - search files
  funcObj.post_searchFiles = {
    link: [ "/searchFiles" ],
    func: function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      if (req.body.keyword === undefined) {
        res.send(JSON.stringify({ message: "error" }));
      } else {
        let target, finalTong;
        if (req.body.path === undefined) {
          target = "__samba__";
        } else {
          target = req.body.path.replace(/^\//i, '').replace(/\/$/i, '');
        }
        if (target.trim() === '') {
          target = "__samba__";
        }
        if (!/^__/.test(target)) {
          target = "__samba__" + "/" + target;
        }
        if (target.replace(/\/$/, '') !== "__samba__") {
          target = instance.dirParsing(target);
          leafParsing(target, true, req.body.keyword).then((list) => {
            res.send(JSON.stringify(list.map((i) => {
              i.absolute = i.absolute.replace(new RegExp("^" + instance.homeliaisonServer, "i"), "__samba__");
              if (/^\//i.test(i.absolute)) {
                i.absolute = i.absolute.replace(new RegExp("^" + instance.photoServerClient, "i"), "__photo__");
              }
              if (/^\//i.test(i.absolute)) {
                i.absolute = i.absolute.replace(new RegExp("^" + instance.photoServerDesigner, "i"), "__designer__");
              }
              return i;
            }).filter((i) => {
              return !/^\.\_/.test(i.absolute.split("/")[i.absolute.split("/").length - 1]);
            }).filter((i) => {
              return i.absolute.split("/")[i.absolute.split("/").length - 1] !== ".DS_Store";
            })));
          }).catch((err) => {
            res.send(JSON.stringify({ message: "error : " + err.message }));
          });
        } else {
          target = instance.dirParsing(target);
          finalTong = [];
          leafParsing(target, true, req.body.keyword).then((list) => {
            finalTong = finalTong.concat(list.map((i) => {
              i.absolute = i.absolute.replace(new RegExp("^" + instance.homeliaisonServer, "i"), "__samba__");
              if (/^\//i.test(i.absolute)) {
                i.absolute = i.absolute.replace(new RegExp("^" + instance.photoServerClient, "i"), "__photo__");
              }
              if (/^\//i.test(i.absolute)) {
                i.absolute = i.absolute.replace(new RegExp("^" + instance.photoServerDesigner, "i"), "__designer__");
              }
              return i;
            }).filter((i) => {
              return !/^\.\_/.test(i.absolute.split("/")[i.absolute.split("/").length - 1]);
            }).filter((i) => {
              return i.absolute.split("/")[i.absolute.split("/").length - 1] !== ".DS_Store";
            }));
            return leafParsing(instance.photoServerClient, true, req.body.keyword);
          }).then((list) => {
            finalTong = finalTong.concat(list.map((i) => {
              i.absolute = i.absolute.replace(new RegExp("^" + instance.photoServerClient, "i"), "__photo__");
              return i;
            }).filter((i) => {
              return !/^\.\_/.test(i.absolute.split("/")[i.absolute.split("/").length - 1]);
            }).filter((i) => {
              return i.absolute.split("/")[i.absolute.split("/").length - 1] !== ".DS_Store";
            }));
            return leafParsing(instance.photoServerDesigner, true, req.body.keyword);
          }).then((list) => {
            finalTong = finalTong.concat(list.map((i) => {
              i.absolute = i.absolute.replace(new RegExp("^" + instance.photoServerClient, "i"), "__designer__");
              return i;
            }).filter((i) => {
              return !/^\.\_/.test(i.absolute.split("/")[i.absolute.split("/").length - 1]);
            }).filter((i) => {
              return i.absolute.split("/")[i.absolute.split("/").length - 1] !== ".DS_Store";
            }));
            res.send(JSON.stringify(finalTong));
          }).catch((err) => {
            res.send(JSON.stringify({ message: "error : " + err.message }));
          });

        }
      }
    }
  };

  //POST - file delivery
  funcObj.post_deliveryFiles = {
    link: [ "/deliveryFiles" ],
    func: async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      try {
        if (!Array.isArray(req.body.files)) {
          throw new Error("invaild post : files must be array");
        }
        if (typeof req.body.who !== "string") {
          throw new Error("invaild post : who must be string");
        }
        const targetFolder = "1rSIKIL-jjmXU-D2Zdmf9ElXFmH2Htycl";
        const GoogleDrive = require(process.cwd() + "/apps/googleAPIs/googleDrive.js");
        const googleDrive = new GoogleDrive();
        const { files, who } = equalJson(req.body);
        if (!files.every((i) => { return typeof i === "object" })) {
          throw new Error("invaild post");
        }
        if (!files.every((i) => { return (typeof i.absolute === "string") && (i.type === "folder" || i.type === "file"); })) {
          throw new Error("invaild post");
        }
        const homeFolder = await fileSystem(`readDir`, [ process.env.HOME ]);
        const tempFolderName = "temp";
        const currentFolder = process.cwd();
        const future = new Date();
        let shareName;
        let zipId;
        let zipLink;
        let text;
        let folderName;
        let tempArr;
        let command;

        future.setHours(future.getHours() + 3);

        if (homeFolder.includes(tempFolderName)) {
          await shellExec(`rm -rf ${shellLink(process.env.HOME + "/" + tempFolderName)}`);
        }
        await shellExec(`mkdir ${shellLink(process.env.HOME + "/" + tempFolderName)}`);
        shareName = "delivery_" + String((new Date()).valueOf()) + String(Math.round(Math.random() * 10000)) + "_" + dateToString(new Date()).slice(2).replace(/\-/gi, '') + ".zip";
        command = "";
        for (let { absolute, type } of files) {
          if (type === "folder") {
            command += `cp -r ${shellLink(instance.dirParsing(absolute))} ${shellLink(process.env.HOME + "/" + tempFolderName)};`;
          } else {
            command += `cp ${shellLink(instance.dirParsing(absolute))} ${shellLink(process.env.HOME + "/" + tempFolderName)};`;
          }
        }
        command += `cd ${shellLink(process.env.HOME + "/" + tempFolderName)};zip -r ${shellLink(process.env.HOME + "/" + tempFolderName + "/" + shareName)} ./*;cd ${shellLink(currentFolder)}`;

        shellExec(command).then(() => {
          return googleDrive.upload_inPython(targetFolder, process.env.HOME + "/" + tempFolderName + "/" + shareName);
        }).then((zipId) => {
          return googleDrive.read_webView_inPython(zipId);
        }).then((link) => {
          zipLink = link;
          return messageSend({ text: who + "님! 요청하셨던 파일 배달이 완료되었습니다.\n유효 시간은 " + dateToString(future, true) + " 까지, 총 3시간입니다.\n다운로드 : " + zipLink, channel: "#file" });
        }).then(() => {
          return shellExec(`rm -rf ${shellLink(process.env.HOME + "/" + tempFolderName)}`);
        }).then(() => {
          instance.setTimer(async function () {
            try {
              const GoogleDrive = require(process.cwd() + "/apps/googleAPIs/googleDrive.js");
              const googleDrive = new GoogleDrive();
              await googleDrive.delete_inPython(zipLink);
            } catch (e) {
              console.log(e);
            }
          }, future);
        }).catch((err) => { messageSend({ text: err.message + " " + process.env.HOME + "/" + tempFolderName + "/" + shareName + " " + targetFolder, channel: "#error_log" }).catch((err) => { console.log(err); }) });

        res.send(JSON.stringify({ message: "will do" }));
      } catch (e) {
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    }
  };

  //POST - get slack messages
  funcObj.post_slackMessages = {
    link: [ "/slackMessages" ],
    func: async function (req, res) {
      const collection = "slackMessages";
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      try {
        if (typeof req.body.channel !== "string") {
          throw new Error("invaild post");
        }
        const channel = req.body.channel.replace(/\#/gi, '').trim();
        const limit = req.body.limit !== undefined ? Number(req.body.limit) : 100;
        const rows = await MONGOLOCALC.db(`miro81`).collection(collection).find({ "channel.name": channel }).sort({ "date": -1 }).limit(limit).toArray();
        res.send(JSON.stringify(rows));
      } catch (e) {
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    }
  };

  //POST - dirParsing
  funcObj.post_dirParsing = {
    link: [ "/dirParsing" ],
    func: async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      try {
        if (req.body.targets === undefined) {
          throw new Error("invaild post : targets must be array");
        }
        const { targets } = equalJson(req.body);
        if (!Array.isArray(targets)) {
          throw new Error("invaild post : targets must be array");
        }
        let result = [];
        for (let path of targets) {
          if (/^\//.test(path)) {
            path = "__samba__" + path.replace(/^\//g, '');
          }
          result.push(instance.dirParsing(path));
        }
        if (req.body.frontMode !== undefined) {
          res.send(JSON.stringify(result.map((i) => { return i.replace(new RegExp('^' + instance.address.officeinfo.ghost.file.static, 'i'), ''); })));
        } else {
          res.send(JSON.stringify(result));
        }
      } catch (e) {
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    }
  };

  //POST - pdf print
  funcObj.post_pdfPrint = {
    link: [ "/pdfPrint" ],
    func: async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      try {
        if (typeof req.body.html !== "string") {
          throw new Error("invaild post : html must be string");
        }
        const static = instance.address.officeinfo.ghost.file.static;
        const htmlName = `html_name_${uniqueValue("string")}.html`;
        const pdfName = htmlName.replace(/\.html$/i, ".pdf");

        await fileSystem("write", [ `${static}/${htmlName}`, req.body.html.replace(/__equal__/gi, '=').replace(/__ampersand__/gi, '&').replace(/__quotes__/gi, "'") ]);
        await chrome.pdfPrint("https://" + instance.address.officeinfo.ghost.host + "/" + htmlName, static + "/" + pdfName);

        setQueue(() => {
          shell.exec(`rm -rf ${shellLink(static)}/${htmlName};`);
        }, 15 * 60 * 1000);

        res.send(JSON.stringify({ pdf: "https://" + instance.address.officeinfo.ghost.host + "/" + pdfName }));

      } catch (e) {
        console.log(e);
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    }
  };

  //POST - pageToPdf
  funcObj.post_pageToPdf = {
    link: [ "/pageToPdf" ],
    func: async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      try {
        if (typeof req.body.url !== "string") {
          throw new Error("invaild post : url must be string");
        }
        const static = instance.address.officeinfo.ghost.file.static;
        const imageName = `pagePrint_${uniqueValue("string")}.png`;
        const htmlName = imageName.replace(/\.png$/i, ".html");
        const pdfName = imageName.replace(/\.png$/i, ".pdf");
        let htmlString;

        await chrome.pageToPng(global.decodeURIComponent(req.body.url), static + "/" + imageName, true);

        htmlString = `<html><head><style>*{margin:0;padding:0}</style></head><body><img src="https://${instance.address.officeinfo.ghost.host}/${imageName}" style="width:100%"></body></html>`;
        await fileSystem(`write`, [ `${static}/${htmlName}`, htmlString ]);

        await chrome.pdfPrint(`https://${instance.address.officeinfo.ghost.host}/${htmlName}`, `${static}/${pdfName}`, false);

        setQueue(() => {
          shell.exec(`rm -rf ${shellLink(static)}/${imageName};`);
          shell.exec(`rm -rf ${shellLink(static)}/${htmlName};`);
          shell.exec(`rm -rf ${shellLink(static)}/${pdfName};`);
        }, 15 * 60 * 1000);

        res.send(JSON.stringify({ url: global.encodeURIComponent("https://" + instance.address.officeinfo.ghost.host + "/" + pdfName) }));

      } catch (e) {
        console.log(e);
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    }
  };

  //POST - pageToPng
  funcObj.post_pageToPng = {
    link: [ "/pageToPng" ],
    func: async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      try {
        if (typeof req.body.url !== "string") {
          throw new Error("invaild post : url must be string");
        }
        const static = instance.address.officeinfo.ghost.file.static;
        const imageName = `pagePrint_${uniqueValue("string")}.png`;

        await chrome.pageToPng(global.decodeURIComponent(req.body.url), static + "/" + imageName, false);

        setQueue(() => {
          shell.exec(`rm -rf ${shellLink(static)}/${imageName};`);
        }, 15 * 60 * 1000);

        res.send(JSON.stringify({ url: global.encodeURIComponent("https://" + instance.address.officeinfo.ghost.host + "/" + imageName) }));

      } catch (e) {
        console.log(e);
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    }
  };

  //POST - insync check
  funcObj.post_insyncCheck = {
    link: [ "/insyncCheck" ],
    func: async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      try {
        const result = await instance.insyncCheck();
        res.send(JSON.stringify(result));
      } catch (e) {
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    }
  };

  //POST - send slack
  funcObj.post_sendSlack = {
    link: [ "/sendSlack" ],
    func: async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      try {
        await messageSend({ text: req.body.text, channel: req.body.channel });
        res.send(JSON.stringify({ message: "success" }));
      } catch (e) {
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    }
  };

  //POST - bolt pipe
  funcObj.post_boltPipe = {
    link: [ "/boltPipe" ],
    func: async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      try {
        if (req.body.path === undefined || req.body.data === undefined) {
          throw new Error("invalid post");
        }
        const { path, data } = equalJson(req.body);
        await errorLog("bolt pipe launching : " + path + "\n" + JSON.stringify(data, null, 2));
        requestSystem(instance.address.officeinfo.bolt.protocol + "//" + instance.address.officeinfo.bolt.server + ":" + String(instance.address.officeinfo.bolt.port) + path, data, { headers: { "Content-Type": "application/json" } }).catch((err) => { console.log(err); });
        res.send(JSON.stringify({ message: "will do" }));
      } catch (e) {
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    }
  };

  //POST - mysql query
  funcObj.post_mysqlQuery = {
    link: [ "/mysqlQuery" ],
    func: async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      try {
        if (typeof req.body.query !== "string") {
          throw new Error("invaild post");
        }
        let query, response;
        if (/;$/.test(req.body.query.trim())) {
          query = req.body.query.trim();
        } else {
          query = req.body.query.trim() + ';';
        }
        if (!/drop/gi.test(query) && !/delete/gi.test(query)) {
          response = await mysqlQuery(query, { local: true });
        } else {
          response = [];
        }
        res.send(JSON.stringify(response));
      } catch (e) {
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    }
  };

  //POST - pwd
  funcObj.post_pwd = {
    link: [ "/pwd" ],
    func: function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      let target;
      if (req.body.target === undefined) {
        target = "__samba__";
      } else {
        target = "__samba__" + "/" + req.body.target;
      }
      target = instance.dirParsing(target);
      res.send(JSON.stringify({ absolute: target }));
    }
  };

  //POST - robot
  funcObj.post_robot = {
    link: [ "/robot" ],
    func: function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      if (req.body.command === undefined) {
        console.log(req.body);
        res.send(JSON.stringify({ error: "must be property 'command'" }));
      } else {
        let { command } = req.body;
        if (Array.isArray(command)) {
          command = command.join(" ");
        }
        if (req.body.await === true) {
          const { stdout } = shell.exec(`node ${shellLink(instance.robot)} ${command}`);
          res.send(JSON.stringify({ stdout }));
        } else {
          shell.exec(`node ${shellLink(instance.robot)} ${command}`, { async: true }, function (err, stdout, stderr) {
            if (err) {
              console.log(err);
            } else {
              console.log(stdout);
            }
          });
          res.send(JSON.stringify({ message: "will do" }));
        }
      }
    }
  };

  //POST - robot will do
  funcObj.post_robotWillDo = {
    link: [ "/robotWill", "/robotWillDo", "/robotTimer", "/timer" ],
    func: function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      if (req.body.command === undefined || req.body.time === undefined || typeof req.body.time !== "object") {
        console.log(req.body);
        res.send(JSON.stringify({ error: "must be property 'String or Array: command, Object: time'" }));
      } else {
        let { command, time } = req.body;
        if (Array.isArray(command)) {
          command = command.join(" ");
        }
        instance.setTimer(function () {
          shell.exec(`node ${shellLink(instance.robot)} ${command}`, { async: true }, function (err, stdout, stderr) {
            if (err) {
              console.log(err);
            } else {
              console.log(stdout);
            }
          });
        }, time);
        res.send(JSON.stringify({ message: "will do" }));
      }
    }
  };

  //POST - fixDir
  funcObj.post_fixDir = {
    link: [ "/fixDir" ],
    func: function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });

      let target;
      if (req.body.target === undefined) {
        target = "__samba__";
      } else {
        target = req.body.target;
      }
      target = instance.dirParsing(target);

      if (req.body.await === true) {
        console.log(`waiting 10 minutes...`);
        setTimeout(function () {
          console.log(`fix start`);
          shell.exec(`node ${shellLink(process.cwd())}/robot.js fixDir ${shellLink(target)}`, { async: true }, function (err, stdout, stderr) {
            if (err) {
              console.log(err);
            } else {
              console.log(`fix done`);
            }
          });
        }, (10 * 60 * 1000));
      } else {
        shell.exec(`node ${shellLink(process.cwd())}/robot.js fixDir ${shellLink(target)}`, { async: true }, function (err, stdout, stderr) {
          if (err) {
            console.log(err);
          } else {
            console.log(`fix done`);
          }
        });
      }

      res.send(JSON.stringify({ message: "will do" }));
    }
  };

  //POST - updateSheets
  funcObj.post_updateSheets = {
    link: [ "/updateSheets" ],
    func: function (req, res) {
      const sheets = instance.sheets;
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });

      let id, sheetName, values, startPoint;
      if (req.body.id === undefined || req.body.values === undefined) {
        console.log(req.body);
        res.send(JSON.stringify({ error: "must be property 'id, sheetName, values, startPoint'" }));
      } else {
        id = req.body.id;
        values = req.body.values;
        sheetName = "";
        if (req.body.sheetName !== undefined) {
          sheetName = req.body.sheetName;
        }
        startPoint = [ 0, 0 ];
        if (req.body.startPoint !== undefined) {
          startPoint = req.body.startPoint;
        }
        if (req.body.clean === true || req.body.cleanView === true) {
          sheets.setting_cleanView_inPython(id).then(function (message) {
            return sheets.update_value_inPython(id, sheetName, values, startPoint);
          }).then(function (message) {
            console.log(message);
            console.log("done");
          }).catch(function (err) {
            res.send(JSON.stringify({ error: err }));
            throw new Error(err);
          });
        } else {
          sheets.update_value_inPython(id, sheetName, values, startPoint).then(function (message) {
            console.log(message);
            console.log("done");
          }).catch(function (err) {
            res.send(JSON.stringify({ error: err }));
            throw new Error(err);
          });
        }
        res.send(JSON.stringify({ message: "will do" }));
      }
    }
  };

  //POST - getSheets
  funcObj.post_getSheets = {
    link: [ "/getSheets" ],
    func: function (req, res) {
      const sheets = instance.sheets;
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      let id, range;
      if (req.body.id === undefined || req.body.range === undefined) {
        console.log(req.body);
        res.send(JSON.stringify({ error: "must be property 'id, range'" }));
      } else {
        id = req.body.id;
        range = req.body.range;
        sheets.get_value_inPython(id, range).then(function (result) {
          res.send(JSON.stringify(result));
        }).catch(function (err) {
          res.send(JSON.stringify({ error: err }));
          throw new Error(err);
        });
      }
    }
  };

  //POST - createSheets
  funcObj.post_sendSheets = {
    link: [ "/sendSheets" ],
    func: function (req, res) {
      const sheets = instance.sheets;
      const drive = instance.drive;
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });

      if (req.body.sheetName === undefined || req.body.parentId === undefined || req.body.values === undefined) {
        console.log(req.body);
        res.send(JSON.stringify({ error: "must be property 'sheetName, parentId, values'" }));
      } else {
        let tapName, values, sheetsId, sheetsTargets, tempArr;
        if (req.body.multiple === undefined) {
          sheetsId = null;
          tapName = (req.body.tapName !== undefined) ? req.body.tapName : 'default';
          values = JSON.parse(req.body.values);
          sheets.create_newSheets_inPython(req.body.sheetName, req.body.parentId).then((id) => {
            sheetsId = id;
            return sheets.update_defaultSheetName_inPython(sheetsId, tapName);
          }).then(() => {
            return sheets.update_value_inPython(sheetsId, tapName, values, [ 0, 0 ]);
          }).then(() => {
            return sheets.setting_cleanView_inPython(sheetsId);
          }).then(() => {
            return drive.read_webView_inPython(sheetsId);
          }).then((link) => {
            return messageLog({ text: req.body.sheetName + " => " + link, channel: (req.body.channel === undefined) ? "#general" : req.body.channel });
          }).catch((err) => {
            console.log(err);
          });
        } else {
          sheetsTargets = JSON.parse(req.body.values);
          if (!Array.isArray(sheetsTargets)) {
            console.log(req.body);
            res.send(JSON.stringify({ error: "multiple value must be [ { sheets, matrix }... ]" }));
            return false;
          }
          if (sheetsTargets.length === 0) {
            console.log(req.body);
            res.send(JSON.stringify({ error: "multiple value must be [ { sheets, matrix }... ]" }));
            return false;
          }
          tempArr = [];
          sheets.create_newSheets_inPython(req.body.sheetName, req.body.parentId).then((id) => {
            sheetsId = id;
            for (let i = 0; i < sheetsTargets.length; i++) {
              if (typeof sheetsTargets[i] !== "object") {
                console.log(req.body);
                res.send(JSON.stringify({ error: "multiple value must be [ { sheets, matrix }... ]" }));
                throw new Error("multiple value must be [ { sheets, matrix }... ]");
              }
              if (sheetsTargets[i].sheets === undefined || sheetsTargets[i].matrix === undefined) {
                console.log(req.body);
                res.send(JSON.stringify({ error: "multiple value must be [ { sheets, matrix }... ]" }));
                throw new Error("multiple value must be [ { sheets, matrix }... ]");
              }
              if (i !== 0) {
                tempArr.push(sheetsTargets[i].sheets);
              }
            }
            return sheets.update_defaultSheetName_inPython(sheetsId, sheetsTargets[0].sheets);
          }).then(() => {
            return sheets.add_newSheet_inPython(sheetsId, tempArr);
          }).then(() => {
            return sheets.update_values_inPython(sheetsId, sheetsTargets, [ 0, 0 ]);
          }).then((arr) => {
            return sheets.setting_cleanView_inPython(sheetsId);
          }).then(() => {
            return drive.read_webView_inPython(sheetsId);
          }).then((link) => {
            return messageLog({ text: req.body.sheetName + " => " + link, channel: (req.body.channel === undefined) ? "#general" : req.body.channel });
          }).catch((err) => {
            console.log(err);
          });
        }
        res.send(JSON.stringify({ message: "will do" }));
      }
    }
  };

  //POST - printer
  funcObj.post_printer = {
    link: [ "/printer", "/print" ],
    func: function (req, res) {

      instance.clientPrint(req.body.cliid, MONGOC).catch((err) => {
        errorLog(err.message).catch((e) => { console.log(e); });
      });

      if (typeof req.body.voice === "string") {
        audio.textToVoice(req.body.voice).catch((err) => { console.log(err) });
      }

      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      res.send(JSON.stringify({ message: "will do" }));
    }
  };

  //POST - voice
  funcObj.post_voice = {
    link: [ "/voice" ],
    func: function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      const text = (typeof req.body.text !== "string" ? "안녕하세요!" : req.body.text);

      audio.textToVoice(text).catch((err) => { console.log(err) });

      res.send(JSON.stringify({ message: "will do" }));
    }
  };

  //POST - apartment info
  funcObj.post_apartment = {
    link: [ "/apartment" ],
    func: async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      try {
        if (req.body.data === undefined) {
          throw new Error("invalid post");
        }
        const { data } = equalJson(req.body);

        res.send(JSON.stringify({ message: "done" }));
      } catch (e) {
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    }
  };

  //POST - apartment info
  funcObj.post_apartmentInfo = {
    link: [ "/apartmentInfo" ],
    func: async function (req, res) {
      console.log(req);
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      try {
        if (req.body.json === undefined) {
          throw new Error("invalid post");
        }
        const data = equalJson(req.body.json);
        let address;

        if (data.error === "error") {
          await errorLog("주소 찾을 수 없음 1 : \n" + "https://" + instance.address.backinfo.host + "/client?cliid=" + data.cliid);
        } else {
          address = data.entire.find((obj) => { return /주소/gi.test(obj.name) });
          if (address !== undefined) {
            if (address.value.trim().slice(0, 1) === data.raw.trim().slice(0, 1)) {
              await requestSystem("https://" + instance.address.officeinfo.ghost.host + ":3000/apartment", { data }, { headers: { "Content-Type": "application/json" } });
            } else {
              await errorLog("주소 찾을 수 없음 2 : \n" + "https://" + instance.address.backinfo.host + "/client?cliid=" + data.cliid);
            }
          } else {
            await errorLog("주소 찾을 수 없음 3 : \n" + "https://" + instance.address.backinfo.host + "/client?cliid=" + data.cliid);
          }
        }

        res.send(JSON.stringify({ message: "done" }));
      } catch (e) {
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    }
  };

  //POST - set status log
  funcObj.post_statusLog = {
    link: [ "/statusLog" ],
    func: async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      try {
        const collection = "statusLog";
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
        for (let info in instance.address) {
          if (ip === instance.address[info].ip.outer) {
            thisName = info.replace(/info$/, '');
            break;
          }
        }

        await rethink.rethinkCreate(collection, {
          date: new Date(),
          status: equalJson(JSON.stringify(status)),
          from: { name: thisName, referrer, userAgent, browser, os, platform, mobile: rawUserAgent.isMobile, ...ipObj }
        });

        res.send(JSON.stringify({ message: "done" }));
      } catch (e) {
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    }
  };

  //POST - set proposal log
  funcObj.post_proposalLog = {
    link: [ "/proposalLog" ],
    func: async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      try {
        if (req.body.proid === undefined) {
          throw new Error("invaild post, must be proid");
        }
        const collection = "proposalLog";
        const { proid } = equalJson(req.body);
        const project = await back.getProjectById(proid, { selfMongo: MONGOC });
        if (project === null) {
          throw new Error("invaild project");
        }

        await rethink.rethinkCreate(collection, {
          date: new Date(),
          method: "send",
          proid: proid,
          project: project.toNormal().proposal,
        });

        res.send(JSON.stringify({ message: "done" }));
      } catch (e) {
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    }
  };

  //POST - find past proposal
  funcObj.post_pastProposal = {
    link: [ "/pastProposal" ],
    func: async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      try {
        if (req.body.proid === undefined) {
          throw new Error("invaild post, must be proid");
        }
        const collection = "proposalLog";
        const { proid } = equalJson(req.body);
        const arr = await rethink.rethinkRead(collection, { proid });
        res.send(JSON.stringify(arr));
      } catch (e) {
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    }
  };

  //POST - rethink api
  funcObj.post_rethink = {
    link: [ "/rethink" ],
    func: async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      try {
        if (req.body.mode === undefined) {
          throw new Error("mode must be : [ create, read, update, delete ]");
        }
        if (req.body.collection === undefined) {
          throw new Error("must be collection");
        }
        const { mode, collection } = req.body;
        let result;

        if (mode === "create") {

          if (req.body.json === undefined) {
            throw new Error("create mode require json");
          }
          const { json } = equalJson(req.body);
          await rethink.rethinkCreate(collection, json);
          result = { message: "success" };

        } else if (mode === "read") {

          if (req.body.whereQuery === undefined) {
            throw new Error("create mode require whereQuery");
          }
          const { whereQuery } = equalJson(req.body);
          result = await rethink.rethinkRead(collection, whereQuery);

        } else if (mode === "update") {

          if (req.body.whereQuery === undefined || req.body.updateQuery === undefined) {
            throw new Error("create mode require whereQuery");
          }
          const { whereQuery, updateQuery } = equalJson(req.body);
          await rethink.rethinkUpdate(collection, [ whereQuery, updateQuery ]);
          result = { message: "success" };

        } else if (mode === "delete") {

          if (req.body.whereQuery === undefined) {
            throw new Error("create mode require whereQuery");
          }
          const { whereQuery } = equalJson(req.body);
          await rethink.rethinkDelete(collection, whereQuery);
          result = { message: "success" };

        } else {
          throw new Error("mode must be : [ create, read, update, delete ]");
        }

        res.send(JSON.stringify(result));
      } catch (e) {
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    }
  };

  //end : set router
  let resultObj = { get: [], post: [] };
  for (let i in funcObj) {
    resultObj[i.split('_')[0]].push(funcObj[i]);
  }
  return resultObj;
}

Ghost.prototype.clientRouter = function (needs) {
  const instance = this;
  const back = this.back;
  const [ MONGOC, MONGOLOCALC, MONGOCONSOLEC, rethink ] = needs;
  const folderName = "고객";
  const pathNameConst = "/client_";
  const sambaDir = this.homeliaisonServer + "/" + folderName;
  const { fileSystem, requestSystem, shell, shellLink, todayMaker, mongo, mongoinfo, mongolocalinfo } = this.mother;
  let funcObj = {};

  //POST - ls
  funcObj.post_ls = {
    link: [ "/ls", "/readDir" ],
    func: function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      fileSystem(`readDir`, [ sambaDir ]).then((list) => {
        let list_refined = [];
        for (let i of list) {
          if (!/^\._/.test(i) && !/DS_Store/gi.test(i)) {
            list_refined.push(i);
          }
        }
        res.send(JSON.stringify(list_refined));
      }).catch((e) => { throw new Error(e); });
    }
  };

  //end : set router
  let resultObj = { get: [], post: [] };
  for (let i in funcObj) {
    for (let j = 0; j < funcObj[i].link.length; j++) {
      funcObj[i].link[j] = pathNameConst + funcObj[i].link[j].slice(1);
    }
    resultObj[i.split('_')[0]].push(funcObj[i]);
  }
  return resultObj;
}

Ghost.prototype.designerRouter = function (needs) {
  const instance = this;
  const back = this.back;
  const [ MONGOC, MONGOLOCALC, MONGOCONSOLEC, rethink ] = needs;
  const folderName = "디자이너";
  const pathNameConst = "/designer_";
  const standardId = "desid";
  const sambaDir = this.homeliaisonServer + "/" + folderName;
  const { fileSystem, requestSystem, shell, shellLink, todayMaker, mongo, mongoinfo, mongolocalinfo, sleep } = this.mother;
  let funcObj = {};

  //POST - ls
  funcObj.post_ls = {
    link: [ "/ls", "/readDir" ],
    func: function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      fileSystem(`readDir`, [ sambaDir + "/partnership" ]).then((list) => {
        let list_refined = [];
        for (let i of list) {
          if (!/^\._/.test(i) && !/DS_Store/gi.test(i)) {
            list_refined.push(i);
          }
        }
        res.send(JSON.stringify(list_refined));
      }).catch((e) => { throw new Error(e); });
    }
  };

  //POST - get designer folders
  funcObj.post_folders = {
    link: [ "/folder", "/folders" ],
    func: function (req, res) {
      let target, whereQuery;
      let tempObj;
      let allList;
      let targetDIds;
      let finalList;

      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });

      if (req.body.id === undefined || req.body.id === undefined || req.body.id === "entire" || req.body.id === "all") {
        target = "entire";
        whereQuery = {};
      } else if (Array.isArray(req.body.id)) {
        target = req.body.id;
        whereQuery = { "$or": [] };
        for (let id of target) {
          tempObj = {};
          tempObj[standardId] = id;
          whereQuery["$or"].push(tempObj);
        }
      } else {
        target = req.body.id;
        whereQuery = {};
        whereQuery[standardId] = target;
      }

      allList = [];
      targetDIds = [];
      finalList = [];

      fileSystem(`readDir`, [ sambaDir + "/partnership" ]).then((list) => {
        allList = [];
        for (let i of list) {
          if (!/^\._/.test(i) && !/DS_Store/gi.test(i)) {
            allList.push(i);
          }
        }
        return back.getDesignersByQuery(whereQuery, { selfMongo: MONGOC });
      }).then((designers) => {
        for (let d of designers) {
          targetDIds.push(d.information.did);
        }
        for (let i of allList) {
          if (targetDIds.includes(i.split("_")[0].trim())) {
            finalList.push(i);
          }
        }
        res.send(JSON.stringify(finalList));
      }).catch((e) => { throw new Error(e); });

    }
  };

  //POST - create new designer folder
  funcObj.post_createFolder = {
    link: [ "/create", "/createFolder" ],
    func: async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      try {
        const GoogleDrive = require(process.cwd() + "/apps/googleAPIs/googleDrive.js");
        const GoogleDocs = require(process.cwd() + "/apps/googleAPIs/googleDocs.js");
        const drive = new GoogleDrive();
        const docs = new GoogleDocs();
        const designerFolderId = "1-xcQct5wXg8am57W1e8xXKwSQyLWAsMP";
        let basicList = [
          "포트폴리오",
          "등록서류",
          "고객안내및제안문서"
        ];
        let id, subid;
        let folderName;
        let folderId, docsId;
        let num;
        if (req.body.name !== undefined && req.body.subid !== undefined) {
          folderName = req.body.subid + "_" + req.body.name;

          folderId = await drive.makeFolder_inPython(folderName);
          await drive.moveFolder_inPython(folderId, designerFolderId);

          await sleep(2000);
          num = 0;
          while ((!(await fileSystem(`exist`, [ `${sambaDir}/partnership/${folderName}` ]))) && (num < 10)) {
            await sleep(2000);
            num++;
          }

          if (await fileSystem(`exist`, [ `${sambaDir}/partnership/${folderName}` ])) {
            for (let b of basicList) {
              if (!(await fileSystem(`exist`, [ `${sambaDir}/partnership/${folderName}/${b}` ]))) {
                await fileSystem(`mkdir`, [ `${sambaDir}/partnership/${folderName}/${b}` ]);
              }
            }
          }

          docsId = await docs.create_newDocs_inPython(folderName + '_' + "docs", folderId);

          res.send(JSON.stringify({
            folderName: folderName,
            drive: `https://drive.google.com/drive/folders/${folderId}`,
            docs: `https://docs.google.com/document/d/${docsId}`,
          }));

        } else {
          res.send(JSON.stringify({ error: "must be property 'name' and 'subid'" }));
        }

      } catch (e) {
        console.log(e);
        res.send(JSON.stringify({ error: e.message }));
      }
    }
  };

  //end : set router
  let resultObj = { get: [], post: [] };
  for (let i in funcObj) {
    for (let j = 0; j < funcObj[i].link.length; j++) {
      funcObj[i].link[j] = pathNameConst + funcObj[i].link[j].slice(1);
    }
    resultObj[i.split('_')[0]].push(funcObj[i]);
  }
  return resultObj;
}

Ghost.prototype.photoRouter = function (needs) {
  const instance = this;
  const back = this.back;
  const drive = this.drive;
  const [ MONGOC, MONGOLOCALC, MONGOCONSOLEC, rethink ] = needs;
  const folderName = "사진_등록_포트폴리오";
  const pathNameConst = "/photo_";
  const sambaDir = this.homeliaisonServer + "/" + folderName;
  const { fileSystem, requestSystem, shell, shellExec, shellLink, todayMaker, mongo, mongoinfo, mongolocalinfo, dateToString, sleep, errorLog } = this.mother;
  let funcObj = {};

  //POST - ls
  funcObj.post_ls = {
    link: [ "/ls", "/readDir" ],
    func: function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      let target;
      if (req.body.target === undefined) {
        target = sambaDir;
      } else {
        target = sambaDir + "/" + req.body.target;
      }
      fileSystem(`readDir`, [ target ]).then((list) => {
        let list_refined = [];
        for (let i of list) {
          if (!/^\._/.test(i) && !/DS_Store/gi.test(i)) {
            list_refined.push(i);
          }
        }
        res.send(JSON.stringify(list_refined));
      }).catch((e) => { throw new Error(e); });
    }
  };

  //POST - pwd
  funcObj.post_pwd = {
    link: [ "/pwd" ],
    func: function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      let target;
      if (req.body.target === undefined) {
        target = sambaDir;
      } else {
        target = sambaDir + "/" + req.body.target;
      }
      res.send(JSON.stringify({ absolute: target }));
    }
  };

  //POST - zip
  funcObj.post_zip = {
    link: [ "/zip" ],
    func: async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      try {
        if (req.body.pid === undefined || req.body.pay === undefined) {
          res.send(JSON.stringify({ message: "invaild body : must be 'pid' and 'pay'" }));
        } else {
          const GoogleDrive = require(process.cwd() + "/apps/googleAPIs/googleDrive.js");
          const targetFolderId = "1rSIKIL-jjmXU-D2Zdmf9ElXFmH2Htycl";
          const googleDrive = new GoogleDrive();
          const { pid } = req.body;
          const pay = (Number(req.body.pay) === 1);
          const c780 = "780";
          const c1500 = "1500";
          const c3508 = pid;
          const list = await fileSystem(`readDir`, [ sambaDir ]);
          const homeFolder = await fileSystem(`readDir`, [ process.env.HOME ]);
          const tempFolderName = "temp";
          let list_refined = [];
          let folderName;
          let shareClientName, shareDesignerName;
          let tempArr;
          let command;
          let zipIdClient, zipIdDesigner;
          let zipLinkClient, zipLinkDesigner;
          let commands;

          if (!homeFolder.includes(tempFolderName)) {
            await shellExec(`mkdir`, [ `${process.env.HOME}/${tempFolderName}` ]);
          }

          for (let i of list) {
            if (!/^\./.test(i) && !/DS_Store/gi.test(i)) {
              list_refined.push(i);
            }
          }
          folderName = list_refined.find((i) => { return (new RegExp('^' + pid)).test(i); });
          tempArr = folderName.split('_');
          shareClientName = "HL_";
          shareDesignerName = "HL_";
          if (tempArr.length === 4) {
            shareClientName += tempArr[2] + "_고객님_";
            shareClientName += tempArr[1] + "_디자이너님";
            shareDesignerName += tempArr[1] + "_디자이너님_";
            shareDesignerName += tempArr[2] + "_고객님";
          } else if (tempArr.length === 3) {
            shareDesignerName += tempArr[1] + "_디자이너님";
          } else {
            throw new Error("invaild post");
          }
          shareClientName += '_' + dateToString(new Date()).slice(2).replace(/\-/gi, '') + ".zip";
          shareDesignerName += '_' + dateToString(new Date()).slice(2).replace(/\-/gi, '') + ".zip";

          commands = "";
          if (!pay) {
            commands += `cd ${shellLink(sambaDir)}/${shellLink(folderName)}/${shellLink(c780)};`;
            commands += `zip ${shellLink(process.env.HOME)}/${shellLink(tempFolderName)}/${shellLink(shareDesignerName)} ./*;`;
            commands += `cd ${shellLink(sambaDir)}/${shellLink(folderName)}/${shellLink(c780)};`;
            commands += `zip ${shellLink(process.env.HOME)}/${shellLink(tempFolderName)}/${shellLink(shareClientName)} ./*;`;
          } else {
            commands += `cd ${shellLink(sambaDir)}/${shellLink(folderName)}/${shellLink(c3508)};`;
            commands += `zip ${shellLink(process.env.HOME)}/${shellLink(tempFolderName)}/${shellLink(shareDesignerName)} ./*;`;
            commands += `cd ${shellLink(sambaDir)}/${shellLink(folderName)}/${shellLink(c780)};`;
            commands += `zip ${shellLink(process.env.HOME)}/${shellLink(tempFolderName)}/${shellLink(shareClientName)} ./*;`;
          }
          await shellExec(commands);

          zipIdDesigner = await googleDrive.upload_inPython(targetFolderId, `${shellLink(process.env.HOME + "/" + tempFolderName + "/" + shareDesignerName)}`);
          zipLinkDesigner = await googleDrive.read_webView_inPython(zipIdDesigner);

          if (tempArr.length === 3) {
            zipLinkClient = null;
          } else {
            zipIdClient = await googleDrive.upload_inPython(targetFolderId, `${shellLink(process.env.HOME + "/" + tempFolderName + "/" + shareClientName)}`);
            zipLinkClient = await googleDrive.read_webView_inPython(zipIdClient);
          }

          // await shellExec([
          //   [ `rm`, [ `-rf`, `${process.env.HOME}/${tempFolderName}/${shareClientName}` ] ],
          //   [ `rm`, [ `-rf`, `${process.env.HOME}/${tempFolderName}/${shareDesignerName}` ] ],
          // ]);

          res.send(JSON.stringify({ designer: zipLinkDesigner, client: zipLinkClient }));

        }
      } catch (e) {
        await errorLog("rawtoraw zip error : " + e.message);
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    }
  };

  //POST - mkdir
  funcObj.post_mkdir = {
    link: [ "/mkdir", "/create", "/createDir" ],
    func: async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      try {
        if (req.body.name === undefined) {
          res.send(JSON.stringify({ message: "invaild body : must be 'name'" }));
        } else {

          let tempFolder;
          let folderList;
          let name;

          name = req.body.name.trim().replace(/^\//, '');

          tempFolder = `newFolder_${String((new Date()).valueOf())}`;

          if (await fileSystem(`exist`, [ `${sambaDir}/${tempFolder}` ])) {
            shell.exec(`rm -rf ${shellLink(sambaDir + '/' + tempFolder)};`);
          }
          await fileSystem(`mkdir`, [ `${sambaDir}/${tempFolder}` ]);
          await fileSystem(`mkdir`, [ `${sambaDir}/${tempFolder}/${name}` ]);

          shell.exec(`node ${shellLink(process.cwd() + '/' + "robot.js")} fixDir ${shellLink(sambaDir + '/' + tempFolder)};`);

          folderList = await fileSystem(`readDir`, [ `${sambaDir}/${tempFolder}` ]);
          folderList = folderList.filter((f) => { return f !== `.DS_Store` });

          if (folderList.length === 0) {
            throw new Error("error");
          }

          shell.exec(`mv ${shellLink(sambaDir + '/' + tempFolder + '/' + folderList[0])} ${shellLink(sambaDir + '/' + folderList[0])};`);
          shell.exec(`rm -rf ${shellLink(sambaDir + '/' + tempFolder)};`);

          res.send(JSON.stringify({ message: "make folder : " + (sambaDir + '/' + folderList[0]) }));
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  //POST - fixDir
  funcObj.post_fixDir = {
    link: [ "/fixDir" ],
    func: function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });

      let target;
      if (req.body.target === undefined) {
        target = sambaDir;
      } else {
        target = sambaDir + "/" + req.body.target;
      }

      if (req.body.await === true) {
        console.log(`waiting 1 minutes...`);
        setTimeout(function () {
          console.log(`fix start`);
          shell.exec(`node ${shellLink(process.cwd())}/robot.js fixDir ${shellLink(target)}`, { async: true }, function (err, stdout, stderr) {
            if (err) {
              console.log(err);
            } else {
              console.log(`fix done`);
            }
          });
        }, (60 * 1000));
      } else {
        shell.exec(`node ${shellLink(process.cwd())}/robot.js fixDir ${shellLink(target)}`, { async: true }, function (err, stdout, stderr) {
          if (err) {
            console.log(err);
          } else {
            console.log(`fix done`);
          }
        });
      }

      res.send(JSON.stringify({ message: "will do" }));
    }
  };

  //end : set router
  let resultObj = { get: [], post: [] };
  for (let i in funcObj) {
    for (let j = 0; j < funcObj[i].link.length; j++) {
      funcObj[i].link[j] = pathNameConst + funcObj[i].link[j].slice(1);
    }
    resultObj[i.split('_')[0]].push(funcObj[i]);
  }
  return resultObj;
}

Ghost.prototype.serverLaunching = async function () {
  const instance = this;
  const { fileSystem, shell, shellLink, mongo, mongoinfo, mongolocalinfo, mongoconsoleinfo } = this.mother;
  const https = require("https");
  const express = require("express");
  const app = express();
  const useragent = require("express-useragent");
  const staticFolder = process.env.HOME + '/static';
  const WebSocket = require("ws");
  const RethinkAccess = require(`${process.cwd()}/apps/rethinkAccess/rethinkAccess.js`);
  const url = require("url");

  app.use(useragent.express());
  app.use(express.json({ limit : "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  app.use(express.static(staticFolder));

  try {
    let message = '';

    //set address info
    const { name, rawObj: address } = await this.mother.ipCheck();
    if (name === "unknown") {
      throw new Error("invalid address");
    }
    console.log(``);
    console.log(`\x1b[36m\x1b[1m%s\x1b[0m`, `launching ghost in ${name.replace(/info/i, '')} ==============`);
    console.log(``);

    await this.back.setInfoObj({ getMode: false });

    //set mongo connetion
    const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
    const MONGOLOCALC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
    const MONGOCONSOLEC = new mongo(mongoconsoleinfo, { useUnifiedTopology: true });
    console.log(`\x1b[33m%s\x1b[0m`, `set DB server => ${this.address.mongoinfo.host}`);

    await MONGOC.connect();
    await MONGOLOCALC.connect();
    await MONGOCONSOLEC.connect();

    //set rethink connection
    const RETHINKC = new RethinkAccess();
    await RETHINKC.connect();

    //set pem key
    let pems = {};
    let pemsLink = process.cwd() + "/pems/" + address.host;
    let certDir, keyDir, caDir;
    let routerObj;
    let server;
    let sockets;
    let routerTargets = [
      "client",
      "designer",
      "photo",
    ];

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
    const { get, post } = this.ghostRouter([ MONGOC, MONGOLOCALC, MONGOCONSOLEC, RETHINKC ]);
    for (let obj of get) {
      app.get(obj.link, obj.func);
    }
    for (let obj of post) {
      app.post(obj.link, obj.func);
    }

    //set sub routers
    for (let r of routerTargets) {
      routerObj = (this[r + "Router"])([ MONGOC, MONGOLOCALC, MONGOCONSOLEC, RETHINKC ]);
      for (let obj of routerObj.get) {
        app.get(obj.link, obj.func);
      }
      for (let obj of routerObj.post) {
        app.post(obj.link, obj.func);
      }
    }

    server = https.createServer(pems, app);

    //server on
    server.listen(8080, address.ip.inner, () => {
      console.log(`\x1b[33m%s\x1b[0m`, `Server running`);
    });

  } catch (e) {
    console.log(e);
  }
}

Ghost.prototype.robotPassLaunching = async function () {
  const instance = this;
  const { fileSystem, shell, shellLink } = this.mother;
  const http = require("http");
  const express = require("express");
  const app = express();
  const multer = require("multer");
  const multiForms = multer();
  const useragent = require("express-useragent");
  const staticFolder = process.env.HOME + '/static';
  const robotPassPort = 8080;
  const PlayAudio = require(process.cwd() + "/apps/playAudio/playAudio.js");
  const audio = new PlayAudio();
  let doing;

  app.use(useragent.express());
  app.use(express.json());
  app.use(multiForms.array());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(staticFolder));

  try {
    console.log(``);
    console.log(`\x1b[36m\x1b[1m%s\x1b[0m`, `launching robot pass server =====================`);
    console.log(``);

    await this.back.setInfoObj({ getMode: false });

    const BUTTON_LIST = [
        "proposal",
        "request",
        "contents",
        "voice"
    ];
    let runProcess, runList;
    runProcess = {};
    runList = {};
    for (let b of BUTTON_LIST) {
      runProcess[b] = 0;
      runList[b] = [];
    }

    doing = 0;

    const runAi = async function (button) {
      try {
        let orders;

        runProcess[button] = 1;
        await instance.mother.sleep(5000);
        runProcess[button] = 2;
        orders = [];
        for (let i of runList[button]) {
          shell.exec(`node ${shellLink(instance.robot)} ${button} ${i}`);
          orders.push(i);
        }
        runList[button] = [];
        runProcess[button] = 0;

        return `${button} ${orders.join(",")} done`;
      } catch (e) {
        console.log(e);
      }
    }

    app.get([ "/", "/ai", "/robot", "/illustrator" ], async function (req, res) {
      try {
        res.set({
          "Content-Type": "text/plain",
          "Access-Control-Allow-Origin": '*',
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
          "Access-Control-Allow-Headers": '*',
        });

        const order = req.query;
        const id = String(order.id);

        if (runProcess[order.type] === 1) {
          runList[order.type].push(id);
          res.send(id + " make pass");
        } else if (runProcess[order.type] === 2) {
          res.send(id + " make fail");
        } else if (runProcess[order.type] === 0) {
          runList[order.type].push(id);
          runAi(order.type).then(function (msg) {
            console.log(msg);
          }).catch(function (e) {
            throw new Error(e);
          });
          res.send(id + " make pass");
        }

      } catch (e) {
        console.log(e);
      }
    });

    app.post("/voice", async (req, res) => {
      try {
        res.set("Content-Type", "application/json");
        audio.textToVoice(req.body.text).catch((err) => {
          console.log(err);
        });
        res.send({ message: "will do" });
      } catch (e) {
        console.log(e);
      }
    });

    app.get("/confirm", (req, res) => {
        res.set("Content-Type", "application/json");
        res.send({ doing });
    });

    //server on
    http.createServer(app).listen(robotPassPort, () => {
      console.log(`\x1b[33m%s\x1b[0m`, `Server running in ${String(robotPassPort)}`);
    });

  } catch (e) {
    console.log(e);
  }
}

Ghost.prototype.wssLaunching = async function () {
  const instance = this;
  const { fileSystem } = this.mother;
  try {

    const https = require("https");
    const express = require("express");
    const app = express();
    const useragent = require("express-useragent");
    const WebSocket = require("ws");
    const url = require("url");
    const socketNumbers = 99;
    const port = 8080;
    let sockets, server;
    let pems, pemsLink;
    let certDir, keyDir, caDir;

    app.use(useragent.express());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    sockets = [];
    for (let i = 0; i < socketNumbers; i++) {
      sockets.push(new WebSocket.Server({ noServer: true }));
    }

    for (let wss of sockets) {
      wss.on("connection", function (ws) {
        ws.on("message", (message) => {
          const clients = wss.clients;
          for (let c of clients) {
            if (c.readyState === WebSocket.OPEN && ws !== c) {
              c.send(message);
            }
          }
        });
      });
    }

    app.get("/view", (req, res) => {
      let numbers;
      numbers = [];
      for (let wss of sockets) {
        numbers.push(wss.clients.size);
      }
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send(JSON.stringify(numbers));
    });

    app.get("/viewSse", (req, res) => {
      let numbers, pusher;
      res.set({
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });

      pusher = setInterval(function () {
        numbers = [];
        for (let wss of sockets) {
          numbers.push(wss.clients.size === 0 ? 0 : 1);
        }
        res.write(`event: updateTong\ndata: ${JSON.stringify(numbers)}\n\n`);
      }, 3 * 1000);

      res.on('close', function () {
        clearInterval(pusher);
        res.end();
      });
    });

    pems = {};
    pemsLink = process.cwd() + "/pems/" + this.address.pythoninfo.host;

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

    server = https.createServer(pems, app);

    server.on("upgrade", function (request, socket, head) {
      const { pathname } = url.parse(request.url);
      let number;
      if (/client/gi.test(pathname)) {
        number = null;
        for (let i = 0; i < sockets.length; i++) {
          if (sockets[i].clients.size === 0) {
            number = i;
            break;
          }
        }
        if (number === null) {
          socket.destroy();
        } else {
          sockets[number].handleUpgrade(request, socket, head, function (ws) {
            sockets[number].emit("connection", ws, request);
          });
        }
      } else if (/homeliaison/gi.test(pathname)) {
        number = Number(pathname.replace(/[^0-9]/gi, ''));
        if (sockets[number] !== undefined) {
          sockets[number].handleUpgrade(request, socket, head, function (ws) {
            sockets[number].emit("connection", ws, request);
          });
        } else {
          socket.destroy();
        }
      } else {
        socket.destroy();
      }
    });

    server.listen(port, () => { console.log(`\x1b[33m%s\x1b[0m`, `\nWss server running\n`); });

  } catch (e) {
    console.log(e);
  }
}

// EXE --------------------------------------------------------------------------------------

const app = new Ghost();
if (process.argv[2] === undefined || /server/gi.test(process.argv[2]) || /ghost/gi.test(process.argv[2])) {
  app.serverLaunching().catch((err) => { console.log(err); });
} else if (/ai/gi.test(process.argv[2]) || /robot/gi.test(process.argv[2]) || /pass/gi.test(process.argv[2])) {
  app.robotPassLaunching().catch((err) => { console.log(err); });
} else if (/wss/gi.test(process.argv[2])) {
  app.wssLaunching().catch((err) => { console.log(err); });
} else if (/print/gi.test(process.argv[2])) {
  app.clientPrint(process.argv[3].trim(), null).catch((err) => { console.log(err); });
} else if (/record/gi.test(process.argv[2])) {
  app.recordBackup().catch((err) => { console.log(err); });
}
