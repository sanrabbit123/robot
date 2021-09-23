const ROBOT_PATH = process.cwd();
const APP_PATH = ROBOT_PATH + "/apps";
const Mother = require(APP_PATH + "/mother.js");
const BackMaker = require(APP_PATH + "/backMaker/backMaker.js");
const BackReport = require(APP_PATH + "/backMaker/backReport.js");
const BackWorker = require(APP_PATH + "/backMaker/backWorker.js");
const BridgeCloud = require(APP_PATH + "/bridgeCloud/bridgeCloud.js");
const GoogleAPIs = require(APP_PATH + "/googleAPIs/googleAPIs.js");
const GoogleAnalytics = require(APP_PATH + "/googleAPIs/googleAnalytics.js");
const GoogleSheet = require(APP_PATH + "/googleAPIs/googleSheet.js");
const GoogleDrive = require(APP_PATH + "/googleAPIs/googleDrive.js");
const GoogleCalendar = require(APP_PATH + "/googleAPIs/googleCalendar.js");
const GoogleMail = require(APP_PATH + "/googleAPIs/googleMail.js");
const GoogleDocs = require(APP_PATH + "/googleAPIs/googleDocs.js");
const AiGraph = require(APP_PATH + "/contentsMaker/aiGraph.js");
const AiConsole = require(APP_PATH + "/contentsMaker/aiConsole.js");
const AiContents = require(APP_PATH + "/contentsMaker/aiContents.js");
const AppleNotes = require(APP_PATH + "/appleAPIs/appleNotes.js");
const ContentsMaker = require(APP_PATH + "/contentsMaker/contentsMaker.js");
const NaverAPIs = require(APP_PATH + "/naverAPIs/naverAPIs.js");
const ResourceMaker = require(APP_PATH + "/resourceMaker/resourceMaker.js");
const NotionAPIs = require(APP_PATH + "/notionAPIs/notionAPIs.js");
const AddressParser = require(APP_PATH + "/addressParser/addressParser.js");
const KakaoTalk = require(APP_PATH + "/kakaoTalk/kakaoTalk.js");
const PortfolioFilter = require(APP_PATH + "/portfolioFilter/portfolioFilter.js");
const DataRouter = require(APP_PATH + "/dataConsole/router/dataRouter.js");
const ParsingHangul = require(APP_PATH + "/parsingHangul/parsingHangul.js");
const SnsParsing = require(APP_PATH + "/snsParsing/snsParsing.js");
const PlayAudio = require(APP_PATH + "/playAudio/playAudio.js");
const SpawnBoradoli = require(APP_PATH + "/spawnBoradoli/spawnBoradoli.js");
const MongoReflection = require(APP_PATH + "/mongoReflection/mongoReflection.js");
const SvgOptimizer = require(APP_PATH + "/svgOptimizer/svgOptimizer.js");
const NaverBlogParsing = require(APP_PATH + "/naverAPIs/naverBlogParsing.js");
const DataMiddle = require(APP_PATH + "/dataConsole/router/dataMiddle.js");
const ReceiptObserver = require(APP_PATH + "/receiptObserver/receiptObserver.js");
const GraphicBot = require(APP_PATH + "/graphicBot/graphicBot.js");
const GaroseroParser = require(APP_PATH + "/garoseroParser/garoseroParser.js");
const BillMaker = require(APP_PATH + "/billMaker/billMaker.js");
const MirrorRouter = require(APP_PATH + "/mirrorWhisk/router/mirrorRouter.js");

const DevContext = function () {
  this.mother = new Mother();
  this.back = new BackMaker();
  const { mongo, mongoinfo, mongolocalinfo, mongopythoninfo, mongoconsoleinfo } = this.mother;
  this.MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  this.MONGOLOCALC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
  this.MONGOPYTHONC = new mongo(mongopythoninfo, { useUnifiedTopology: true });
  this.MONGOCONSOLEC = new mongo(mongoconsoleinfo, { useUnifiedTopology: true });
  this.address = require(`${process.cwd()}/apps/infoObj.js`);
  this.dir = `${process.cwd()}/apps/devContext`;
}

DevContext.prototype.launching = async function () {
  const instance = this;
  const { mongo, mongoinfo, mongolocalinfo, mongopythoninfo, mongoconsoleinfo } = this.mother;
  const { fileSystem, shell, shellLink, orderSystem, s3FileUpload, s3FileList, ghostFileUpload, ghostFileList, requestSystem, getDateMatrix, ghostRequest, generalFileUpload, mysqlQuery, headRequest, binaryRequest, cryptoString, decryptoHash, treeParsing, appleScript, sleep, equalJson, copyJson, pythonExecute, autoComma, dateToString, stringToDate, ipParsing, sendJandi, ipCheck, leafParsing, statusReading, errorLog, messageLog } = this.mother;
  try {
    // await this.MONGOC.connect();
    // await this.MONGOLOCALC.connect();
    const address = this.address;
    const back = this.back;
    const report = new BackReport();
    const work = new BackWorker();
    const sheets = new GoogleSheet();
    const bill = new BillMaker();
    const { Agent } = require(`https`);
    const agent = new Agent({ rejectUnauthorized: false });
    // in config { httpsAgent: agent }
    // console.log(await this.findCode("* 1.1)"));



    // 현금영수증 발급
    // const url = "https://iniapi.inicis.com/api/v1/receipt";
    // const headers = { "Content-type": " application/x-www-form-urlencoded;charset=utf-8" };
    // const dateToTimestamp = (date) => {
    //   const zeroAddition = (num) => { return (num < 10 ? `0${String(num)}` : String(num)); }
    //   return `${String(date.getFullYear())}${zeroAddition(date.getMonth() + 1)}${zeroAddition(date.getDate())}${zeroAddition(date.getHours())}${zeroAddition(date.getMinutes())}${zeroAddition(date.getSeconds())}`;
    // }
    // const now = new Date();
    // const type = "Issue";
    // const paymethod = "Receipt";
    // const timestamp = dateToTimestamp(new Date());
    // const clientIp = address.officeinfo.ip.outer;
    // const mid = "";



    // const tree = await treeParsing(process.env.HOME + "/samba");
    // const bashScript = (tree.flatDeath.map((obj) => { return obj.absolute; }).filter((i) => { return /\/\.\_/gi.test(i); }).map((str) => {
    //   return "rm -rf " + shellLink(str) + ';';
    // }).join("\n"));
    // await fileSystem(`write`, [ `${process.cwd()}/temp/remove.sh`, bashScript ]);







    // await this.MONGOPYTHONC.connect();
    // const selfMongo = this.MONGOC;
    // const selfPythonMongo = this.MONGOPYTHONC;
    // const projects = await back.getProjectsByQuery({
    //   $and: [
    //     { "desid": { $regex: "^d" } },
    //     { "process.contract.first.date": { $gte: new Date(2000, 0, 1) } },
    //     { "process.contract.remain.date": { $lt: new Date(2000, 0, 1) } },
    //     { "process.status": { $regex: "^[대진홀]" } }
    //   ]
    // }, { selfMongo });
    // let thisBills, thisBill;
    // let whereQuery;
    // let client;
    // let method;
    // let bilid;
    // let bilidLog;
    //
    // bilidLog = [];
    // for (let project of projects) {
    //   whereQuery = {};
    //   whereQuery["links.proid"] = project.proid;
    //   whereQuery["links.method"] = project.service.online ? "online" : "offline";
    //   thisBills = await bill.getBillsByQuery(whereQuery, { selfMongo: selfPythonMongo });
    //   client = await back.getClientById(project.cliid, { selfMongo });
    //   if (thisBills.length === 1) {
    //     [ thisBill ] = thisBills;
    //     if (thisBill.requests[1].pay.length !== 1) {
    //       bilid = thisBill.bilid;
    //       method = project.process.contract.first.calculation.info.method.trim();
    //       if (method === '' || method === '-') {
    //         method = "계좌";
    //       }
    //       await bill.passiveSync(bilid, client.name, 1, 330000, project.process.contract.first.date, method, project.process.contract.first.calculation.info.proof, { selfMongo: selfPythonMongo });
    //       bilidLog.push(bilid);
    //     }
    //   }
    // }
    //
    // console.log(bilidLog);
    // await fileSystem(`writeJson`, [ `${process.cwd()}/temp/bilidLog.json`, bilidLog ]);
    // await this.MONGOPYTHONC.close();




    /*
    const selfMongo = this.MONGOLOCALC;

    let clients, cliidArr, projects, secondCliidArr, targetClients, targetClientHistories, totalClientHistories;
    let arr, result, total, matrix, num, table;
    let keys;
    let sheetsId;

    clients = await back.getClientsByQuery({ "requests.0.request.timeline": { $gte: new Date(2021, 3, 1) } }, { selfMongo });
    cliidArr = clients.map((obj) => { return { cliid: obj.cliid }; });
    projects = (await back.getProjectsByQuery({ $or: cliidArr }, { selfMongo })).filter((obj) => { return obj.desid !== ''; }).filter((obj) => {  return obj.process.contract.first.date.valueOf() >= (new Date(2000, 0, 1)).valueOf() });
    secondCliidArr = projects.map((obj) => { return { cliid: obj.cliid } });
    targetClients = await back.getClientsByQuery({ $or: secondCliidArr }, { selfMongo });
    targetClientHistories = await back.getHistoriesByQuery("client", { $or: secondCliidArr }, { selfMongo });
    totalClientHistories = await back.getHistoriesByQuery("client", { $or: cliidArr }, { selfMongo });

    arr = targetClientHistories.map((obj) => { return { cliid: obj.cliid, manager: obj.manager } });
    result = {};
    for (let { cliid, manager } of arr) {
      if (result[manager] === undefined) {
        result[manager] = [];
      }
      result[manager].push(cliid);
    }

    arr = totalClientHistories.map((obj) => { return { cliid: obj.cliid, manager: obj.manager } });
    total = {};
    for (let { cliid, manager } of arr) {
      if (total[manager] === undefined) {
        total[manager] = [];
      }
      total[manager].push(cliid);
    }

    matrix = [ [ "담당자명", "전체 응대수", "전체 계약수", "계약율", "계약율(문자)" ] ];
    keys = Object.keys(total);
    keys.sort();
    for (let name of keys) {
      arr = [];
      arr.push(name);
      arr.push(total[name].length);
      arr.push(result[name].length);
      if (total[name].length === 0) {
        arr.push(0);
        arr.push("0%");
      } else {
        num = Math.round((result[name].length / total[name].length) * 10000) / 100;
        arr.push(num);
        arr.push(String(num) + '%');
      }
      matrix.push(arr);
    }

    for (let i = 3; i < 8; i++) {

      matrix.push([ '', '', '', '', '' ]);
      matrix.push([ "2021년 " + String(i + 1) + "월", '', '', '', '' ]);

      clients = await back.getClientsByQuery({ $and: [ { "requests.0.request.timeline": { $gte: new Date(2021, i, 1) } }, { "requests.0.request.timeline": { $lt: new Date(2021, (i + 1), 1) } } ] }, { selfMongo });
      cliidArr = clients.map((obj) => { return { cliid: obj.cliid }; });
      projects = (await back.getProjectsByQuery({ $or: cliidArr }, { selfMongo })).filter((obj) => { return obj.desid !== ''; }).filter((obj) => {  return obj.process.contract.first.date.valueOf() >= (new Date(2000, 0, 1)).valueOf() });
      secondCliidArr = projects.map((obj) => { return { cliid: obj.cliid } });
      targetClients = await back.getClientsByQuery({ $or: secondCliidArr }, { selfMongo });
      targetClientHistories = await back.getHistoriesByQuery("client", { $or: secondCliidArr }, { selfMongo });
      totalClientHistories = await back.getHistoriesByQuery("client", { $or: cliidArr }, { selfMongo });

      arr = targetClientHistories.map((obj) => { return { cliid: obj.cliid, manager: obj.manager } });
      result = {};
      for (let { cliid, manager } of arr) {
        if (result[manager] === undefined) {
          result[manager] = [];
        }
        result[manager].push(cliid);
      }

      arr = totalClientHistories.map((obj) => { return { cliid: obj.cliid, manager: obj.manager } });
      total = {};
      for (let { cliid, manager } of arr) {
        if (total[manager] === undefined) {
          total[manager] = [];
        }
        total[manager].push(cliid);
      }

      keys = Object.keys(total);
      keys.sort();
      for (let name of keys) {
        arr = [];
        arr.push(name);
        arr.push(total[name].length);
        if (result[name] === undefined) {
          arr.push(0);
        } else {
          arr.push(result[name].length);
        }
        if (total[name].length === 0 || result[name] === undefined) {
          arr.push(0);
          arr.push("0%");
        } else {
          num = Math.round((result[name].length / total[name].length) * 10000) / 100;
          arr.push(num);
          arr.push(String(num) + '%');
        }
        matrix.push(arr);
      }

    }



    // sheetsId = await sheets.create_newSheets_inPython("응대자별 계약율", "1qriE2iba-MAdcglyuQsBjY5VcXVyy1pi");
    // await sheets.setting_cleanView_inPython(sheetsId);
    sheetsId = "1nqjhgB8xYqoM_6R_wbO7qHJL8EcGMfpa6vc9-xYxNro";
    await sheets.update_value_inPython(sheetsId, "", matrix);

    console.log(matrix);
    */




    /*
    const projects = await back.getProjectsByQuery({}, { selfMongo: this.MONGOLOCALC });
    const fees = projects.getFees();
    const targets = fees.filter((a) => { return a.distance.amount !== 0 });
    const onlineMinimum = 425000;
    const offlineMinimun = 450000;
    const firstDiscount = 0.15;
    const firstLimit = 50 * 10000;
    const secondDiscount = 0.05;
    let num;
    let matrix;
    let tempArr;
    let temp;

    matrix = [ [ "오프라인비", "순수 온라인", "온라인 + 출장 1회", "출장비 3회 합산", "거리", "시간", "회당 출장비" ] ]

    for (let t of targets) {
      tempArr = [];
      tempArr.push(t.amount);

      if (t.amount * firstDiscount >= firstLimit) {
        temp = t.amount - firstLimit;
      } else {
        temp = t.amount * (1 - firstDiscount);
      }
      if (temp <= onlineMinimum) {
        temp = onlineMinimum;
      }
      tempArr.push(temp);
      tempArr.push((t.amount * (1 - secondDiscount)) + t.distance.amount);
      tempArr.push(t.amount + (3 * t.distance.amount));
      tempArr.push(Number(t.distance.distance.replace(/[^0-9]/gi, '')));
      tempArr.push(Number(t.distance.time.replace(/시간/, '.').replace(/[^0-9\-\.]/gi, '')));
      tempArr.push(t.distance.amount);
      matrix.push(tempArr);
    }

    // const sheetsId = await sheets.create_newSheets_inPython("출장비 계산", "1H8iw8joBVDEu2BwNnVCSfHMiMPBqJWsz");
    // await sheets.setting_cleanView_inPython(sheetsId);

    matrix = matrix.map((arr) => { return arr.map((n) => { return String(n); }).join("__split__") });
    matrix = Array.from(new Set(matrix));
    matrix = matrix.map((str) => { return str.split("__split__").map((s) => { return Number(s); }) });

    const sheetsId = "1LpWjGBJP5fQtfIHFP4s39yBgMFoqZLHkmMjg-Aiju2c";
    await sheets.update_value_inPython(sheetsId, "", matrix);

    console.log(matrix);
    */



    // tong = {};
    // for (let arr of targetArr) {
    //   if (arr[0] === "needs" || arr[0] === "mode" || arr[0] === "cliid" || arr[0] === "desid" || arr[0] === "proid")
    //   if (arr.length === 2) {
    //     tong[arr[0]] = arr[1];
    //   } else if (arr.length > 2) {
    //
    //   }
    // }





    // const project = await back.getProjectById("p2108_aa63s", { selfMongo: this.MONGOLOCALC });
    // const client = await back.getClientById(project.cliid, { selfMongo: this.MONGOLOCALC });
    // const designer = await back.getDesignerById("d2007_aa02s", { selfMongo: this.MONGOLOCALC });
    // await bill.itemInjection("b218r_aa04s_r1", "travelExpenses", client, designer, project, "offline", { selfMongo: this.MONGOLOCALC });
    // await bill.itemInjection("b218r_aa04s_r0", "travelExpenses", client, designer, project, "offline", { selfMongo: this.MONGOLOCALC, number: 5 });
    // await bill.itemInjection("b218r_aa04s_s0", "travelExpenses", client, designer, project, "offline", { selfMongo: this.MONGOLOCALC });




    // alive test

    // const desid = "d1701_aa01s"
    // const project = await back.getDesignerById(desid, { selfMongo: this.MONGOC });
    // const p = (await this.MONGOC.db("miro81").collection("designer").find({ desid }).toArray())[0]
    // delete p._id;
    // console.log(JSON.stringify(project.toNormal()).length === JSON.stringify(p).length)
    // const bilid = "b218s_aa04s";
    // const b = await bill.getBillById(bilid);
    // const MONGOC = new mongo(mongopythoninfo, { useUnifiedTopology: true });
    // await MONGOC.connect();
    // const p = (await MONGOC.db("miro81").collection("generalBill").find({ bilid }).toArray())[0]
    // await MONGOC.close();
    // delete p._id;
    // console.log(JSON.stringify(b.toNormal()).length)
    // console.log(JSON.stringify(p).length);


    // create bill

    // const proid = "p2107_aa46s";

    // console.log(await bill.createStylingBill("p1801_aa01s"));
    // console.log(await bill.createStylingBill("p2108_aa63s", { selfMongo: this.MONGOLOCALC, selfCoreMongo: this.MONGOLOCALC, selfConsoleMongo: this.MONGOLOCALC }));
    // console.log((await bill.getBillById("b218q_aa04s", { selfMongo: this.MONGOLOCALC })).responses[0].items);
    // console.log((await bill.getBillById("b218r_aa04s")));

    // await bill.designerSelect("p2108_aa63s", "d2007_aa02s", { selfMongo: this.MONGOLOCALC });

    // console.log(await bill.travelInjection("remain", proid, "offline", 4, { selfMongo: this.MONGOLOCALC }));
    // console.log(await bill.travelReconfig("first", proid, "offline", 0, 2, { selfMongo: this.MONGOLOCALC }));
    // console.log(await bill.serviceConverting(proid, "online", "s2011_aa01s", { selfMongo: this.MONGOLOCALC, selfCoreMongo: this.MONGOLOCALC }))
    // console.log(await bill.amountConverting("b2192_aa02s", { selfMongo: this.MONGOLOCALC, selfCoreMongo: this.MONGOLOCALC }))


    // const url = "https://centrex.uplus.co.kr/RestApi/setringcallback";
    // const { officeinfo: { phone: { numbers: phoneNumbers, password: pass } } } = this.address;
    // let id;
    // let callbackurl;
    // let callbackhost;
    // let callbackport;
    // let num;
    // phoneNumbers.push("0220392252")
    // console.log(phoneNumbers);
    // num = 0;
    // for (let id of phoneNumbers) {
    //   callbackurl = "/cloud" + String(num) + ".php";
    //   callbackhost = "3.35.212.109";
    //   callbackport = 80;
    //   console.log((await requestSystem(url + "?id=" + id + "&pass=" + pass + "&callbackurl=" + callbackurl + "&callbackhost=" + callbackhost + "&callbackport=" + callbackport, { id, pass, callbackurl, callbackhost, callbackport }, { headers: { "Content-Type": "application/json" } })).data);
    //   num++;
    // }

    // const url = "https://centrex.uplus.co.kr/RestApi/getringcallback";
    // const { officeinfo: { phone: { numbers: phoneNumbers, password: pass } } } = this.address;
    // let id;
    // let callbackurl;
    // let callbackhost;
    // let callbackport;
    // let num;
    // phoneNumbers.push("0220392252")
    // console.log(phoneNumbers);
    // num = 0;
    // for (let id of phoneNumbers) {
    //   callbackurl = "/cloud" + String(num) + ".php";
    //   callbackhost = "3.35.212.109";
    //   callbackport = 80;
    //   console.log((await requestSystem(url + "?id=" + id + "&pass=" + pass, { id, pass }, { headers: { "Content-Type": "application/json" } })).data);
    //   num++;
    // }


    // const selfMongo = this.MONGOLOCALC;
    // const querystring = require("querystring");
    // const url = "https://centrex.uplus.co.kr/RestApi/channelstatus";
    // const { officeinfo: { phone: { numbers: phoneNumbers, password: pass } } } = this.address;
    // let num, num2;
    // let res, res2;
    // let query;
    // let id;
    // let status;
    //
    //
    // targets = [];
    // for (let phone of phoneNumbers) {
    //   query = { id: phone, pass };
    //   tempRes = await requestSystem(url + "?" + querystring.stringify(query), query, { headers: { "Content-Type": "application/json" } });
    //   console.log(tempRes.data);
    //   if (tempRes.data.SVC_RT !== "0000") {
    //     targets.push(phone);
    //   }
    // }
    // console.log(targets);



    // id = "07046037707";
    // query = { id, pass };
    //
    // num = 0;
    // status = 0;
    // while (num < 40) {
    //   res = await requestSystem(url + "?" + querystring.stringify(query), query, { headers: { "Content-Type": "application/json" } });
    //   if (res.data.SVC_RT === "0000") {
    //     status = 1;
    //     num2 = 0;
    //     while (true) {
    //       res2 = await requestSystem(url + "?" + querystring.stringify(query), query, { headers: { "Content-Type": "application/json" } });
    //       if (res2.data.SVC_RT !== "0000") {
    //         break;
    //       }
    //       await sleep(2000);
    //       num2++;
    //     }
    //     if (num2 >= ((30 * 5) - 1)) {
    //       status = 2;
    //     } else {
    //       status = 3;
    //     }
    //     break;
    //   }
    //   await sleep(2000);
    //   num++;
    // }
    //
    // if (status === 0) {
    //   //fail => "부재중"
    // } else if (status === 2) {
    //   //success => "스타일 찾기"
    // } else if (status === 3) {
    //   //fail => "부재중"
    // }













    // const selfMongo = this.MONGOC;
    // const projects = await selfMongo.db(`miro81`).collection(`project`).find({}).toArray();
    // let whereQuery, updateQuery, temp;
    //
    // for (let project of projects) {
    //   whereQuery = { proid: project.proid };
    //   updateQuery = {};
    //
    //   temp = JSON.parse(JSON.stringify(project.proposal.detail));
    //   for (let t of temp) {
    //     for (let obj of t.fee) {
    //       obj.distance.limit = 5;
    //     }
    //   }
    //   updateQuery["proposal.detail"] = temp;
    //
    //   await selfMongo.db(`miro81`).collection(`project`).updateOne(whereQuery, { $set: updateQuery });
    //   console.log(whereQuery);
    // }




    /*

    const today = new Date();
    const tenYearsAgo = new Date(today.getFullYear() - 10, today.getMonth(), today.getDate());
    const fourYearsAgo = new Date(today.getFullYear() - 4, today.getMonth(), today.getDate());
    const designers = await back.getDesignersByQuery({});

    let alpha, alphaPercentage;
    let thisDesignerCareerStart;
    let homeliaison;
    let relationItems;
    let matrix;
    let tempArr;
    let sheetsId;
    let paper;

    matrix = [ [ "디자이너 이름", "경력", "페이퍼 워크", "홈리에종 관계", "가산점", "증가율" ] ];
    for (let designer of designers) {

      tempArr = [];
      tempArr.push(designer.designer);

      thisDesignerCareerStart = new Date(designer.information.business.career.startY - Math.floor(designer.information.business.career.relatedY / 3), designer.information.business.career.startM - 1, 1);

      alpha = 0;

      alpha += (designer.information.business.career.relatedY >= 4 ? 0.5 : 0);
      alpha += thisDesignerCareerStart.valueOf() <= tenYearsAgo.valueOf() ? 1 : (thisDesignerCareerStart.valueOf() <= fourYearsAgo.valueOf() ? 0.5 : 0);
      tempArr.push(alpha);

      paper = 0;
      paper += (designer.analytics.project.paperWork.values.includes("3D") ? 0.5 : 0);
      paper += (designer.analytics.project.paperWork.values.includes("콜라주") ? 0.5 : 0);
      paper += (designer.analytics.project.paperWork.values.length >= 4 ? 0.5 : 0);
      tempArr.push(paper);
      alpha += paper;

      homeliaison = 0;
      for (let { value } of designer.analytics.etc.personality) {
        if (value) {
          homeliaison = homeliaison + 1;
        }
      }
      relationItems = designer.analytics.etc.relation.items;
      homeliaison += 2 - relationItems.indexOf(designer.analytics.etc.relation.value);
      alpha += (homeliaison * (4.5 / 7));
      tempArr.push((homeliaison * (4.5 / 7)));

      //인기도
      alpha += 1;
      alpha += 0.5;

      alphaPercentage = Math.round(((alpha / 100) + 1) * 10000) / 100;

      tempArr.push(alpha);
      tempArr.push(alphaPercentage);
      matrix.push(tempArr);
    }

    sheetsId = await sheets.create_newSheets_inPython("디자이너별 가산점 새로운 버전", "0B7youNEnMPEfOEJHM3NYRk0zQk0");
    await sheets.setting_cleanView_inPython(sheetsId);
    await sheets.update_value_inPython(sheetsId, "", matrix);

    */








    // const selfMongo = new mongo(mongoconsoleinfo, { useUnifiedTopology: true });
    // await selfMongo.connect();
    // const coreMongo = this.MONGOC;
    // const rows = (await back.mongoRead("projectHistory", {}, { selfMongo })).filter((obj) => { return obj.manager === '' || obj.manager === '-' || obj.manager === "홀딩"; });
    // const proidArr = rows.map((obj) => { return { proid: obj.proid } });
    // const targetProjects = (await back.getProjectsByQuery({ $or: proidArr }, { selfMongo: coreMongo })).filter((obj) => { return obj.desid !== "" });
    // let manager;
    //
    // for (let { desid, proid } of targetProjects) {
    //   manager = await back.mongoRead("designerHistory", { desid }, { selfMongo });
    //   if (manager.length === 1) {
    //     manager = manager[0].manager;
    //     if (manager !== '' && manager !== '-') {
    //       await back.mongoUpdate("projectHistory", [ { proid }, { manager } ], { selfMongo });
    //       console.log(proid, "done");
    //     }
    //   }
    // }
    //
    // await selfMongo.close();










    // const tong = await work.getDesignerFee("p2107_aa46s", { selfMongo: this.MONGOLOCALC, selfLocalMongo: this.MONGOLOCALC });
    // for (let obj of tong) {
    //   console.log(obj);
    // }

    // console.log(await work.getDesignerFee("d1907_aa01s", "c2107_aa69s", "s2011_aa02s", "B", { selfMongo: this.MONGOLOCALC, selfLocalMongo: this.MONGOLOCALC }));


    // console.log(await requestSystem("http://localhost:3000/designerFee", { matrix: test }, { headers: { "Content-Type": "application/json", "origin": "https://localhost:3000" } }));



    // const clientTargets = [
    //   "전라북도 익산시 무왕로 1195",
    //   "전라북도 정읍시 서부로 39",
    //   "대구광역시 북구 연암로 135-6",
    //   "대구광역시 수성구 범어동 551-7",
    //   "광주광역시 광산구 어등대로653번길 90",
    //   "전라남도 여수시 웅천남1로 52",
    //   "전라남도 목포시 용당로331번길 40",
    //   "울산 남구 신선로 45",
    //   "부산광역시 해운대구 해운대로76번길 55",
    //   "부산광역시 동래구 명륜로 170",
    //   "강원 고성군 죽왕면 가향길 20-2",
    //   "강원 춘천시 춘주로 176-22",
    //   "강원 강릉시 선수촌로 79-14",
    //   "충청북도 충주시 예성로 401",
    //   "충청북도 청주시 청원구 공항로150번길 51-12",
    //   "충청남도 아산시 배방읍 용연로 54",
    //   "충청남도 천안시 서북구 한들3로 85-9",
    //   "충남 서산시 성연면 성연5로 92-7",
    //   "대전광역시 서구 대덕대로195번길 63",
    //   "세종특별자치시 남세종로 302",
    // ];


    // const app = new AddressParser();
    // const designers = await back.getDesignersByQuery({}, { selfMongo: this.MONGOC, withTools: true });
    // const designerAddress = await fileSystem(`readJson`, [ `${process.cwd()}/apps/addressParser/json/samples/designerAddress.json` ]);
    // const clientAddress = await fileSystem(`readJson`, [ `${process.cwd()}/apps/addressParser/json/samples/clientAddress.json` ]);
    // let travelExpensesSamples, json;
    // travelExpensesSamples = {};
    // for (let desid in designerAddress) {
    //   travelExpensesSamples[desid] = [];
    //   for (let obj of clientAddress) {
    //     json = await app.getTravelExpenses(designerAddress[desid], obj);
    //     await sleep(1000);
    //     console.log(json);
    //     travelExpensesSamples[desid].push(json);
    //   }
    // }
    // console.log(travelExpensesSamples);
    // await fileSystem(`writeJson`, [ `${process.cwd()}/apps/addressParser/json/samples/travelExpensesSamples.json`, travelExpensesSamples ]);



    // const travelExpensesSamples = await fileSystem(`readJson`, [ `${process.cwd()}/apps/addressParser/json/samples/travelExpensesSamples.json` ]);
    // let tong;
    // tong = [];
    // for (let desid in travelExpensesSamples) {
    //   for (let obj of travelExpensesSamples[desid]) {
    //     tong.push({
    //       "desid": desid,
    //       "designer": designers.pick(desid).designer,
    //       "from": obj.from.address.road,
    //       "to": obj.to.address.road,
    //       "distance": obj.distance.meters,
    //       "distanceString": obj.distance.string,
    //       "time": obj.time.seconds,
    //       "timeString": obj.time.string,
    //       "amount": obj.amount,
    //       "amountString": obj.string,
    //     });
    //   }
    // }
    // await fileSystem(`writeJson`, [ `${process.cwd()}/apps/addressParser/json/samples/travelExpensesSamples_min.json`, tong ]);





    // const travelExpensesSamples = await fileSystem(`readJson`, [ `${process.cwd()}/apps/addressParser/json/samples/travelExpensesSamples.json` ]);
    // const data = await fileSystem(`readJson`, [ `${process.cwd()}/apps/addressParser/json/samples/travelExpensesSamples_min.json` ]);
    // const parentId = "1FY4RqqGeMNpYs9HJhWA6xJxJFHFiQpup";
    // const defaultName = "전체";
    // let matrix_standard, matrix, tempArr, num;
    // let pastDesid, pastDesigner, pastAddress;
    // let sheetsId;
    // let designerNames, designerDesid;
    // let designerName;
    //
    // sheetsId = await sheets.create_newSheets_inPython("디자이너 출장비 샘플", parentId);
    // await sheets.update_defaultSheetName_inPython(sheetsId, defaultName);
    //
    // matrix_standard = [ [ "순번", "디자이너 아이디", "디자이너", "디자이너 주소", "고객 주소", "거리", "시간", "출장비", "출장비(숫자)" ] ];
    //
    // matrix = copyJson(matrix_standard);
    // pastDesid = null;
    // pastDesigner = null;
    // pastAddress = null;
    // num = 0;
    // designerNames = [];
    // designerDesid = [];
    // for (let obj of data) {
    //   matrix.push([
    //     data.length - num,
    //     ((obj.desid === pastDesid) ?  '' : obj.desid),
    //     ((obj.designer === pastDesigner) ?  '' : obj.designer),
    //     ((obj.from === pastAddress) ?  '' : obj.from),
    //     obj.to,
    //     obj.distance,
    //     obj.time,
    //     obj.amount,
    //     Number(obj.amount.replace(/[^0-9]/g, '')),
    //   ]);
    //   if (obj.designer !== pastDesigner) {
    //     designerNames.push(obj.designer);
    //   }
    //   if (obj.desid !== pastDesid) {
    //     designerDesid.push(obj.desid);
    //   }
    //   pastDesid = obj.desid;
    //   pastDesigner = obj.designer;
    //   pastAddress = obj.from;
    //   num++;
    // }
    //
    // await sheets.add_newSheet_inPython(sheetsId, designerNames);
    // await sheets.setting_cleanView_inPython(sheetsId);
    // await sheets.update_value_inPython(sheetsId, defaultName, matrix, [ 0, 0 ]);
    //
    // for (let desid of designerDesid) {
    //   designerName = designers.pick(desid).designer;
    //   matrix = copyJson(matrix_standard);
    //   num = 0;
    //   for (let obj of data) {
    //     if (obj.desid === desid) {
    //       matrix.push([
    //         travelExpensesSamples[desid].length - num,
    //         ((num !== 0) ?  '' : obj.desid),
    //         ((num !== 0) ?  '' : obj.designer),
    //         ((num !== 0) ?  '' : obj.from),
    //         obj.to,
    //         obj.distance,
    //         obj.time,
    //         obj.amount,
    //         Number(obj.amount.replace(/[^0-9]/g, '')),
    //       ]);
    //       num++;
    //     }
    //   }
    //   await sheets.update_value_inPython(sheetsId, designerName, matrix, [ 0, 0 ]);
    // }









    // const result = [
    //   {
    //     name: '부산',
    //     to: '부산광역시 동래구 명륜동 782',
    //     amount: 200000,
    //     m: 380069,
    //     s: 14070
    //   },
    //   {
    //     name: '속초',
    //     to: '강원도 속초시 금호동 489-74',
    //     amount: 150000,
    //     m: 167336,
    //     s: 11741
    //   },
    //   {
    //     name: '세종',
    //     to: '세종특별자치시 새롬동 601',
    //     amount: 150000,
    //     m: 150283,
    //     s: 10301
    //   },
    //   {
    //     name: '대구',
    //     to: '대구광역시 북구 침산동 233-3',
    //     amount: 150000,
    //     m: 278896,
    //     s: 11521
    //   }
    // ];
    // const address = new AddressParser();
    // console.log(await address.getTravelExpenses('세종특별자치시 새롬동 601', '대구광역시 북구 침산동 233-3', new Date(2021, 7, 10, 3, 30)));







    // const selfMongo = this.MONGOLOCALC;
    // const designers = await back.getDesignersByQuery({}, { selfMongo });
    // let p, c, a, matrix;
    // a = [];
    // for (let { desid, designer } of designers) {
    //   p = await back.getProjectsByQuery({ "proposal.detail": { $elemMatch: { desid } } }, { selfMongo });
    //   c = await back.getProjectsByQuery({ desid }, { selfMongo });
    //   if (p.length === 0) {
    //     a.push({ n: 0, c: c.length, p: p.length, desid, designer });
    //   } else {
    //     a.push({ n: Math.round((c.length / p.length) * 1000) / 10, c: c.length, p: p.length, desid, designer });
    //   }
    // }
    // a.sort((c, d) => { return d.n - c.n });
    // matrix = [ [ "디자이너 이름", "제안수", "계약수", "계약율", "콘솔 링크" ] ];
    // for (let { n, c, p, desid, designer } of a) {
    //   matrix.push([ designer, p, c, n, ("https://homeliaison-console.xyz/designer?mode=checklist&desid=" + desid) ]);
    // }
    // const parentId = "1sxXUmSQThr9Vfvzg_H-1T4KNh1z5eyJg";
    // console.log(matrix);
    // const id = await sheets.create_newSheets_inPython("디자이너 계약율", parentId);
    // await sheets.setting_cleanView_inPython(id);
    // await sheets.update_value_inPython(id, "", matrix, [ 0, 0 ]);




    /*

    const MONGOC = new mongo(mongoconsoleinfo, { useUnifiedTopology: true });
    await MONGOC.connect();
    const selfMongo = MONGOC;
    const sheetsId = "1iRp_N0RMWCxxIO96uBNlph6bX3jKaP-At2Phj3qEiHA";
    const res = await sheets.get_value_inPython(sheetsId, "target!C1:J");
    class Price extends Array {
      constructor() {
        super();
        this.standard = {};
        this.standard.x = [ 9, 15, 23, 30, 34, 39, 45 ];
        this.standard.y = [ "F", "S", "T", "XT" ];

      }
      set(key, value) {
        this.push(value);
        this[key] = value;
      }
    }
    let num, standard, tempArr, tempArr2, tempArr3, tong;
    let num0, num1;
    let tempObj;
    let map, keyList;
    let length;
    let tong2;

    keyList = [ "c3s3", "c2s3", "c1s3", "c3s2", "c2s2", "c1s2", "c3s1", "c2s1", "c1s1" ];
    num = 0;
    standard = 8;
    tong = [];
    while (num < res.length) {
      tempArr = [];
      tempArr2 = [];
      for (let i = num; i < num + (standard / 2); i++) {
        tempArr3 = res[i].map((str) => { return Number(str); });
        tempArr2.push(tempArr3);
      }
      tempArr.push(tempArr2);
      tempArr2 = [];
      for (let i = num + (standard / 2); i < num + standard; i++) {
        tempArr3 = res[i].map((str) => { return Number(str); });
        tempArr2.push(tempArr3);
      }
      tempArr.push(tempArr2);
      tong.push(tempArr);
      num = num + standard;
    }
    tong.pop();

    tong2 = [];
    for (let arr of tong) {
      tempArr3 = [];
      for (let k = 0; k < arr.length; k++) {
        tempArr2 = [];
        for (let j = 0; j < arr[0][0].length; j++) {
          tempArr = [];
          for (let i = 0; i < arr[0].length; i++) {
            tempArr.push(arr[k][i][j]);
          }
          tempArr2.push(tempArr);
        }
        tempArr3.push(tempArr2);
      }
      tong2.push(tempArr3);
    }

    map = new Price();
    for (let i = 0; i < keyList.length; i++) {
      tempArr = keyList[i].split('s');
      num0 = Number(tempArr[0].replace(/[^0-9]/gi, ''));
      num1 = Number(tempArr[1].replace(/[^0-9]/gi, ''));
      tempObj = {};
      tempObj.key = (num0 * 10) + num1;
      tempObj.level = {};
      tempObj.level.construct = num0;
      tempObj.level.styling = num1;
      tempObj.matrix = tong2[i][1];
      tempObj.newcomer = 0.8;
      tempObj.premium = 1.2;
      map.push(tempObj);
    }

    for (let i of map) {
      console.log(i);
      await back.mongoCreate("designerPrice", i, { selfMongo });
    }

    await MONGOC.close();

    // */






    // const getPrice = async function (desid, cliid, serviceArr) {
    //   if (typeof desid !== "string" || typeof cliid !== "string" || !Array.isArray(serviceArr)) {
    //     throw new Error("invaild input");
    //   }
    //   try {
    //     const selfMongo = instance.MONGOLOCALC;
    //     const collection = "designerPrice";
    //     const pyeongArr = [ [ 0, 8 ], [ 9, 14 ], [ 15, 22 ], [ 23, 29 ], [ 30, 33 ], [ 34, 38 ], [ 39, 44 ], [ 45, 99999 ] ];
    //     let service, xValue, yValue, pyeong, online;
    //     let designer, client;
    //     let cLevel, sLevel;
    //     let priceMatrix, matrix;
    //     let count;
    //     let percentage;
    //     let final;
    //     designer = await back.getDesignerById(desid, { selfMongo });
    //     client = await back.getClientById(cliid, { selfMongo });
    //     service = serviceArr[0];
    //     xValue = serviceArr[1];
    //     pyeong = client.requests[0][0].space.pyeong.value;
    //     online = false;
    //     cLevel = designer.analytics.construct.level;
    //     sLevel = designer.analytics.styling.level;
    //     for (let i = 0; i < pyeongArr.length; i++) {
    //       if (pyeongArr[i][0] <= pyeong && pyeong <= pyeongArr[i][1]) {
    //         yValue = i;
    //         break;
    //       }
    //     }
    //
    //     priceMatrix = await back.mongoRead(collection, { key: (cLevel * 10) + sLevel }, { selfMongo });
    //     priceMatrix = priceMatrix[0];
    //     matrix = priceMatrix.matrix[(xValue === 0) ? "partial" : "entire"];
    //
    //     count = 0;
    //     for (let { value } of designer.analytics.etc.personality) {
    //       count += value ? 1 : 0;
    //     }
    //     switch (designer.analytics.etc.relation) {
    //       case "좋지 않음":
    //         count += 0;
    //         break;
    //       case "확인중":
    //         count += 1;
    //         break;
    //       case "그냥 평범":
    //         count += 2;
    //         break;
    //       case "지속가능성 높음":
    //         count += 3;
    //         break;
    //     }
    //     percentage = (count * (10 / 8)) / 100;
    //     final = Math.round(matrix[service][yValue] * (1 + percentage));
    //     return final;
    //   } catch (e) {
    //     console.log(e);
    //   }
    // }
    // console.log(await getPrice("d1909_aa01s", "c2106_aa01s", [ 1, 1 ]));
    // console.log(await getPrice("d1910_aa01s", "c2106_aa01s", [ 1, 1 ]));
    // console.log(await getPrice("d1904_aa12s", "c2106_aa01s", [ 1, 1 ]));
    // console.log(await getPrice("d1904_aa11s", "c2106_aa01s", [ 1, 1 ]));
    // console.log(await getPrice("d1902_aa01s", "c2106_aa01s", [ 1, 1 ]));




    // const selfMongo = this.MONGOLOCALC;
    // const targetDesid = [
    //   'd1902_aa01s',
    //   'd1904_aa02s',
    //   'd2007_aa02s',
    //   'd2006_aa01s',
    //   'd1908_aa01s',
    //   'd1904_aa01s',
    //   'd1906_aa01s',
    //   'd1904_aa11s',
    //   'd1907_aa01s',
    //   'd2007_aa01s',
    //   'd1908_aa02s',
    //   'd2008_aa01s',
    //   'd1904_aa17s',
    //   'd1904_aa09s',
    //   'd1910_aa02s',
    //   'd1904_aa16s',
    //   'd1910_aa01s',
    //   'd1910_aa02s',
    //   'd1910_aa03s',
    //   'd1904_aa05s',
    //   'd2004_aa02s',
    //   'd1909_aa01s',
    //   'd2004_aa01s',
    //   'd1904_aa12s',
    //   'd1909_aa01s',
    // ];
    // const projects = await back.getProjectsByQuery({ $and: [ { "service.serid": "s2011_aa02s" }, { "service.xValue": "B" }, { "service.online": false } ] }, { selfMongo });
    // let tong, client, designer;
    // let entireTong;
    // let key, value;
    // let sortTong;
    // let standard;
    // let range;
    // let sum, count;
    // let average;
    //
    // //1
    // entireTong = {};
    // for (let i = 0; i < targetDesid.length; i++) {
    //   entireTong[targetDesid[i]] = [];
    //   for (let project of projects) {
    //     for (let { desid, fee } of project.proposal.detail) {
    //       for (let { method, partial, amount } of fee) {
    //         if (desid === targetDesid[i]) {
    //           if (!/online/gi.test(method)) {
    //             if (!partial) {
    //               client = await back.getClientById(project.cliid, { selfMongo });
    //               entireTong[targetDesid[i]].push({ amount: (amount / client.requests[0][0].space.pyeong.value), cliid: project.cliid, proid: project.proid });
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    // }
    //
    // //2
    // average = {};
    // range = 20000;
    //
    // for (let d in entireTong) {
    //   tong = {};
    //   for (let { amount } of entireTong[d]) {
    //     key = 'a' + String(Math.round(amount / 10000));
    //     if (tong[key] === undefined) {
    //       tong[key] = 0;
    //     } else {
    //       tong[key] = tong[key] + 1;
    //     }
    //   }
    //   sortTong = [];
    //   for (let i in tong) {
    //     sortTong.push({ value: Number(i.replace(/[^0-9]/g, '')), count: tong[i] + 1 });
    //   }
    //   sortTong.sort((a, b) => { return b.count - a.count; });
    //   standard = sortTong[0].value * 10000;
    //
    //   sum = 0;
    //   count = 0;
    //   for (let { amount } of entireTong[d]) {
    //     // if (standard - range <= amount && amount <= standard + range) {
    //       sum += amount;
    //       count = count + 1;
    //     // }
    //   }
    //   designer = await back.getDesignerById(d, { selfMongo });
    //   average[d] = { average: Math.round((sum / count) / 1000) * 1000, c: designer.analytics.construct.level, s: designer.analytics.styling.level };
    // }
    //
    // console.log(average)




    // let resultObj, res;
    // resultObj = {};
    // resultObj["pretext"] = "이지영";
    // resultObj["cellphone"] = "601-7213-0519";
    // resultObj["email"] = "cmeasy@gmail.com";
    // resultObj["dwelling"] = "서울 서초구 사임당로17길 116 삼성래미안 101동 1102호";
    // resultObj["folk"] = "예비초 쌍둥이 딸2, 부부";
    // resultObj["money"] = "2,000만원";
    // resultObj["area"] = "34";
    // resultObj["movingdate"] = "2022-01-01";
    // resultObj["myhomeboo"] = "자가";
    // resultObj["spotspec"] = "방 3개 / 화장실 2개 / 발코니 확장";
    // resultObj["description"] = "공사 시작시 해외 체류 예정. 디자이너가 담당하여 스타일링 해주셨으면 합니다.";
    // resultObj["wayto"] = "인터넷 검색";
    // res = await requestSystem("https://homeliaison-bridge.xyz:3000/submit", resultObj, { "Content-Type": "application/json" });
    // console.log(res);




    // const aspirants = await back.getAspirantsByQuery({});
    // const designers = await back.getDesignersByQuery({});
    // let targetDesid, histories;
    // let whereQuery, updateQuery;
    // let careerTong;
    //
    // targetDesid = [];
    // careerTong = {};
    // for (let designer of designers) {
    //   for (let aspirant of aspirants) {
    //     if (aspirant.phone === designer.information.phone) {
    //       targetDesid.push(designer.desid);
    //       careerTong[designer.desid] = aspirant.information.career.detail;
    //     }
    //   }
    // }
    //
    // targetDesid = Array.from(new Set(targetDesid));
    //
    // histories = await this.MONGOLOCALC.db("miro81").collection("designerHistory").find({}).toArray();
    //
    // for (let obj of histories) {
    //   whereQuery = { desid: obj.desid };
    //   updateQuery = {};
    //   updateQuery["career"] = "";
    //   if (targetDesid.includes(obj.desid)) {
    //     updateQuery["career"] = careerTong[obj.desid];
    //   }
    //   await this.MONGOLOCALC.db("miro81").collection("designerHistory").updateOne(whereQuery, { "$set": updateQuery });
    //   console.log(whereQuery);
    // }





    // TOOLS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    // certbot
    // await this.certRefreshing();


    // get sheets
    // console.log(await ghostRequest(`getSheets`, {
    //   id: "1tZjTtDO1GmQ4hWKItGLtnZW4JPrBOY1mUHTaFCzW9Co",
    //   range: "A1:D2"
    // }));


    // update sheets
    // console.log(await ghostRequest(`updateSheets`, {
    //   id: "1z6QgrhFKbKnrMCdiuyQwSOnytCA0yRZ5pXdVjPr0YsM",
    //   values: [ [ "안녕?", "안녕?", "안녕?", "안녕?", ], [ "안녕?", "안녕?", "안녕?", "안녕?", ] ],
    //   cleanView: true
    // }));


    // convert svg to js
    // await this.makeSvgTong();


    // get drive folder
    // const drive = new GoogleDrive();
    // await drive.get_folder("https://drive.google.com/drive/folders/1rsLsiAo012dAsjHx97-urGsyxUma2trz");


    // naverBlog to json
    // const blog = new NaverBlogParsing();
    // await blog.blogToJson();


    // spawn catfish
    // const app = new SpawnBoradoli();
    // await app.spawnPython("studyCloud");


    // kakao token
    // const app = new KakaoTalk();
    // await app.generateToken();


    // kakao test
    // const kakao = new KakaoTalk();
    // await kakao.ready();
    // await kakao.sendTalk("designerSelect", "배창규", "010-2747-3403", {
    //   client: "배창규",
    //   designer: "배창규",
    //   host: "home-liaison.servehttp.com",
    //   path: "estimation",
    //   cliid: "c1801_aa01s",
    //   needs: "style,d2104_aa07s,p2107_aa46s,online",
    // });




    // addtional photo repair
    // const filter = new PortfolioFilter();
    // await filter.additionalRepair("p90", 13);


    // raw photo to raw portfolio
    // const filter = new PortfolioFilter();
    // await filter.rawToRaw([
    //   {
    //     client: "최소나",
    //     designer: "이연주",
    //     link: "https://drive.google.com/drive/folders/1Ndtp4xP1WYQCbwfQICIl2xb7M6r_9J7h",
    //   },
    // ]);



    // get photo folder
    // const drive = new GoogleDrive();
    // await drive.get_folder("https://drive.google.com/drive/folders/1f7TO4P5SoSPoI9v6ZgVNEohwhTsNEquf", "p96");


    // send checklist
    // await this.sendChecklist();


    // spell check
    // await this.spellCheck("p116");


    // get rawPortfolio by pid
    // await this.getRawPortfolio("p146");


    // get corePortfolio by pid
    // await this.getCorePortfolio("p118");


    // aspirant to designer
    // await this.aspirantToDesigner([
    //   [ "이진선", "2021-06-15" ],
    // ]);


    // new designer to front web
    // await work.newDesignerToFront([ "d2104_aa07s" ]);


    // new designer set proposal setting
    // await this.setProposalSettingForDesigner("d2106_aa01s", [
    //   { porlid: "ghost", index: 4 },
    //   { porlid: "ghost", index: 7 },
    //   { porlid: "ghost", index: 2 },
    //   { porlid: "ghost", index: 8 },
    //   { porlid: "ghost", index: 3 },
    // ], [
    //   "아늑하고 따뜻한 스타일의 내추럴 무드와 모던한 스타일을 지향하는 편입니다.",
    //   "클라이언트의 예산에 맞추며, 빠른 진행을 원할시 스케줄에 최대한 맞추어 드리려고 합니다.",
    //   "고객님께서 원하시는 공간의 활용과 무드를 구현시키는 것을 중요하게 생각합니다."
    // ]);


    // new designer alarm
    // let targetArr, channel, desid, designer, pid, webLinks;
    // channel = "#200_web";
    // targetArr = [
    //   { designer: "김윤진", desid: "de053", pid: "a83" },
    // ];
    // for (let { designer, desid, pid } of targetArr) {
    //   webLinks = [
    //     "https://home-liaison.com/portdetail.php?qqq=" + pid,
    //     "https://home-liaison.com/desdetail.php?qqq=" + desid,
    //   ];
    //   await this.mother.slack_bot.chat.postMessage({ text: `${designer} 디자이너의 첫 번째 포트폴리오 컨텐츠를 웹에 업로드하였습니다! link : ${webLinks[0]}`, channel });
    //   await this.mother.slack_bot.chat.postMessage({ text: `${designer} 디자이너 페이지를 생성하여 웹에 업로드하였습니다! link : ${webLinks[1]}`, channel });
    // }


    // send mail
    // const HumanPacket = require(`${process.cwd()}/apps/humanPacket/humanPacket.js`);
    // const human = new HumanPacket();
    // console.log(await human.sendEmail({
    //   to: "uragenbooks@gmail.com",
    //   subject: "안녕하세요!",
    //   contents: "안녕하세요.",
    // }));


    // send sms
    // const HumanPacket = require(`${process.cwd()}/apps/humanPacket/humanPacket.js`);
    // const human = new HumanPacket();
    // console.log(await human.sendSms({
    //   name: "배창규",
    //   phone: "01027473403",
    //   subject: "안녕하세요!",
    //   contents: "안녕하세요.",
    // }));


    // bill passive sync
    // console.log(await bill.passiveSync("b2193_aa10s", "최미란", 1, 330000, new Date(2021, 7, 26, 15, 0, 0), "계좌이체", "현금 영수증"));


    // ready page block
    // await this.pageReady("webProposal");


    // render page block
    // await this.pageRender(process.env.HOME + "/improvingContract/improvingContract.ai");


    // cook json property
    /*
    await this.cookProperty([
      {
        mongoConnection: this.MONGOC,
        collection: "project",
        standard: "proid",
        mode: "add",
        position: "contents.sns",
        value: {
          portfolio: {
            long: new Date(3800, 0, 1),
            short: new Date(3800, 0, 1),
          },
          interview: {
            long: new Date(3800, 0, 1),
            short: new Date(3800, 0, 1),
          },
        }
      }
    ]);


    */

  } catch (e) {
    console.log(e);
  } finally {
    // await this.MONGOC.close();
    // await this.MONGOLOCALC.close();
    console.log(`done`);
  }
}

DevContext.prototype.findCode = async function (str, openMode = false) {
  if (typeof str !== "string" || typeof openMode !== "boolean") {
    throw new Error("invaild input");
  }
  const instance = this;
  const { treeParsing, fileSystem, shell, shellLink } = this.mother;
  const entryPoints = [ "robot.js", "ghost.js", "alien.js", "setup.py" ];
  const escapeReg = function (s) {
    s = s.replace(/\*/gi, "\\*");
    s = s.replace(/\+/gi, "\\+");
    s = s.replace(/\^/gi, "\\^");
    s = s.replace(/\(/gi, "\\(");
    s = s.replace(/\)/gi, "\\)");
    s = s.replace(/\[/gi, "\\[");
    s = s.replace(/\]/gi, "\\]");
    s = s.replace(/\./gi, "\\.");
    s = s.replace(/\=/gi, "\\=");
    s = s.replace(/\&/gi, "\\&");
    s = s.replace(/\-/gi, "\\-");
    s = s.replace(/\$/gi, "\\$");
    s = s.replace(/\//gi, "\\/");
    return s;
  }
  try {
    let targets, script, report;
    str = escapeReg(str);
    targets = (await treeParsing(`${process.cwd()}/apps`)).flatDeath.filter((obj) => { return !obj.directory; }).map((obj) => { return obj.absolute; }).concat(entryPoints.map((i) => { return process.cwd() + "/" + i; }));
    report = {
      date: new Date(),
      input: str,
      target: new RegExp(str, 'g'),
      scripts: []
    };
    for (let absolute of targets) {
      script = await fileSystem(`readString`, [ absolute ]);
      if ((new RegExp(str, 'g')).test(script)) {
        report.scripts.push(absolute.replace(new RegExp('^' + escapeReg(process.cwd())), ''));
      }
    }
    if (openMode) {
      for (let s of report.scripts) {
        shell.exec(`atom ${shellLink(process.cwd() + s)};`);
      }
    }
    return report;
  } catch (e) {
    console.log(e);
  }
}

DevContext.prototype.certRefreshing = async function () {
  const instance = this;
  const back = this.back;
  const { fileSystem, shell, shellLink } = this.mother;
  try {
    const certbotFolder = process.env.HOME + "/certbot";
    const certbotFolderList = (await fileSystem(`readDir`, [ certbotFolder ])).filter((i) => { return i !== ".DS_Store"; });
    const certSetting = async function (certFolder) {
      if (typeof certFolder !== "string") {
        throw new Error("invaild input");
      }
      if (!/\//gi.test(certFolder)) {
        throw new Error("invaild input");
      }
      try {
        const robotFolder = process.cwd();
        const robotPems = robotFolder + "/" + "pems";
        const targetFolderList = (await fileSystem(`readDir`, [ certFolder ])).filter((i) => { return i !== ".DS_Store"; });
        const siteName = certFolder.split('/')[certFolder.split('/').length - 1];
        const siteNginx = siteName + "_nginx";
        const children = [
          { name: "ca", regexp: "chain" },
          { name: "cert", regexp: "cert" },
          { name: "key", regexp: "key" },
          { name: "etc", regexp: null }
        ];
        let tempArr;
        let cert, chain, fullChain;

        shell.exec(`mkdir ${shellLink(certFolder + "/" + siteName)}`);
        shell.exec(`mkdir ${shellLink(certFolder + "/" + siteNginx)}`);

        for (let { name, regexp } of children) {
          shell.exec(`mkdir ${shellLink(certFolder + "/" + siteName + "/" + name)}`);
          shell.exec(`mkdir ${shellLink(certFolder + "/" + siteNginx + "/" + name)}`);
          if (regexp !== null) {
            tempArr = targetFolderList.filter((i) => { return (new RegExp(regexp, "gi")).test(i); });
            for (let i of tempArr) {
              shell.exec(`cp ${shellLink(certFolder)}/${i} ${shellLink(certFolder + "/" + siteName + "/" + name)}`);
              shell.exec(`cp ${shellLink(certFolder)}/${i} ${shellLink(certFolder + "/" + siteNginx + "/" + name)}`);
            }
          }
        }

        cert = (await fileSystem(`readString`, [ certFolder + "/" + targetFolderList.find((i) => { return /^cert/.test(i); }) ])).trim().replace(/\n$/gi, '').replace(/\n$/gi, '').replace(/\n$/gi, '').trim();
        chain = (await fileSystem(`readString`, [ certFolder + "/" + targetFolderList.find((i) => { return /^chain/.test(i); }) ])).trim().replace(/\n$/gi, '').replace(/\n$/gi, '').replace(/\n$/gi, '').trim();
        fullChain = (await fileSystem(`readString`, [ certFolder + "/" + targetFolderList.find((i) => { return /^full/.test(i); }) ])).trim().replace(/\n$/gi, '').replace(/\n$/gi, '').replace(/\n$/gi, '').trim();
        await fileSystem(`write`, [ certFolder + "/" + targetFolderList.find((i) => { return /^cert/.test(i); }), (cert + "\n" + chain + "\n" + fullChain) ]);
        shell.exec(`cp ${shellLink(certFolder)}/${targetFolderList.find((i) => { return /^cert/.test(i); })} ${shellLink(certFolder + "/" + siteNginx + "/cert")}`);

        shell.exec(`cp -r ${shellLink(certFolder + "/" + siteName)} ${shellLink(robotPems)}`);
        shell.exec(`cp -r ${shellLink(certFolder + "/" + siteNginx)} ${shellLink(robotPems)}`);

        console.log(siteName, "done");
      } catch (e) {
        console.log(e);
      }
    }
    const scpCommands = certbotFolderList.map((host) => {
      const address = Object.values(instance.address);
      let target, scpTarget;
      target = null;
      for (let obj of address) {
        if (obj.host === host) {
          target = obj;
        }
      }
      if (target === null) {
        for (let obj of address) {
          if (obj.ghost !== undefined) {
            if (obj.ghost.host === host) {
              target = obj.ghost;
            }
          }
        }
      }
      if (target === null) {
        throw new Error("invaild host");
      }
      if (target.port !== 27017) {
        scpTarget = `${target.user}@${target.host}:/home/${target.user}/robot`;
      } else {
        scpTarget = `ubuntu@${target.host}:/home/ubuntu/robot`;
      }
      return `scp -r ${shellLink(process.cwd())}/pems/${target.host} ${scpTarget}/pems;scp -r ${shellLink(process.cwd())}/pems/${target.host}_nginx ${scpTarget}/pems;`;
    });

    console.log(certbotFolderList);
    for (let c of certbotFolderList) {
      await certSetting(certbotFolder + "/" + c);
    }
    for (let s of scpCommands) {
      shell.exec(s);
    }

  } catch (e) {
    console.log(e);
  }
}

DevContext.prototype.returnWssClient = function () {
  const wssClient = `<!DOCTYPE html><html lang="ko" dir="ltr"><head><meta charset="utf-8"><title></title><style media="screen">*{margin:0;padding:0}</style></head><body><script type="text/javascript" src="./general.js"></script><script type="text/javascript">const { createNode, createNodes, withOut, colorChip } = GeneralJs;const ea = "px";const exampleSocket = new WebSocket("wss://home-liaison.xyz:8080/client");const wordingBlock = function (mother, text, incoming = true) {createNode({mother,text,style: {position: "relative",padding: String(4) + ea,background: colorChip[incoming ? "red" : "yellow"],fontSize: String(15) + ea,color: colorChip.white,}});};exampleSocket.onopen = (event) => {let totalMother, whiteBase;let width, belowHeight;width = 800;belowHeight = 120;totalMother = {};whiteBase = {};totalMother = createNode({mother: document.body,style: {position: "fixed",width: String(100) + '%',height: String(window.innerHeight) + ea,background: colorChip.gray2,},children: [{mode: "input",attribute: [{ type: "text" }],events: [{type: "keypress",event: function (e) {if (e.key === "Enter" || e.key === "Tab") {let value = this.value;exampleSocket.send(value);wordingBlock(whiteBase, value, false);this.value = '';}}}],style: {width: String(width) + ea,height: String(30) + ea,fontSize: String(16) + ea,color: colorChip.black,position: "fixed",bottom: String(40) + ea,left: withOut(50, width / 2, ea),textAlign: "center",}},{style: {position: "absolute",width: String(100) + '%',height: withOut(belowHeight, ea),top: String(0) + ea,left: String(0) + ea,background: colorChip.white}}]});whiteBase = totalMother.lastChild;exampleSocket.onmessage = (event) => {wordingBlock(whiteBase, event.data, true);};};</script></body></html>`;
  return wssClient;
}

DevContext.prototype.frontDesignerSync = async function () {
  const instance = this;
  const { mysqlQuery } = this.mother;
  const back = this.back;
  try {
    const selfMongo = this.MONGOC;
    const table = "deslist";
    const calculation = function (designer) {
      let yS, yM, rY, rM;
      let monthResult;

      yS = designer.information.business.career.startY;
      yM = designer.information.business.career.startM;
      rY = designer.information.business.career.relatedY;
      rM = designer.information.business.career.relatedM;

      monthResult = ((yS * 12) + yM) - ((rY * 12) + rM);

      return {
        year: Math.floor(monthResult / 12),
        month: (monthResult % 12),
      };
    }
    let rows;
    let desid;
    let designer;
    let query;
    let tempObj;

    rows = await mysqlQuery("SELECT * FROM " + table + ";");

    rows = rows.map((obj) => {
      let newObj;
      newObj = {};
      for (let i in obj) {
        newObj[i] = String(obj[i]);
      }
      return newObj;
    });

    for (let obj of rows) {
      desid = back.idFilter("designer").pastToNew(obj.desid);
      designer = await back.getDesignerById(desid, { selfMongo });
      tempObj = calculation(designer);
      query = `UPDATE ${table} SET start_Y = '${String(tempObj.year)}', start_M = '${String(tempObj.month)}' WHERE desid = '${obj.desid}';`;
      await mysqlQuery(query);
      console.log(query);
    }

  } catch (e) {
    console.log(e);
  }
}

DevContext.prototype.cookProperty = async function (obj) {
  /*
    example:
    await instance.cookProperty([
      {
        mongoConnection: this.MONGOLOCALC,
        collection: "designer",
        standard: "desid",
        mode: "add", // add or remove
        position: "information.test",
        value: "this is test"
      },
      {
        mode: "add", // add or remove
        position: "information.test2",
        value: "this is test2"
      },
      {
        mode: "remove", // add or remove
        position: "information.contract.test3",
        value: "this is test3"
      }
    ]);
  */
  const instance = this;
  const { fileSystem, shell, shellLink } = this.mother;
  const dbName = "miro81";
  const modes = [ "add", "remove", "move", "copy" ];
  const findValue = function (json, order) {
    const orderArr = order.split(".");
    let target;
    target = json;
    for (let i = 0; i < orderArr.length; i++) {
      target = target[orderArr[i]];
    }
    return target;
  }
  try {
    if (obj === null || typeof obj !== "object") {
      throw new Error("argument must be Object: { mode, mongoConnection, collection, standard, position, value }");
    }
    if (!Array.isArray(obj)) {
      obj = [ obj ];
    }
    if (obj.length === 0) {
      throw new Error("invaild argument");
    }
    if (obj[0].mode === undefined || obj[0].mongoConnection === undefined || obj[0].collection === undefined || obj[0].standard === undefined || obj[0].position === undefined || obj[0].value === undefined) {
      throw new Error("arguments must be [ { mode, mongoConnection, collection, standard, position, value }... ]");
    }
    if (!(modes.includes(obj[0].mode))) {
      throw new Error("mode must be ", modes);
    }
    if (typeof obj[0].position !== "string") {
      throw new Error("position must be string");
    }

    let { mode, mongoConnection, collection, standard, position, value } = obj[0];
    let MONGOC = mongoConnection;
    let whereQuery, updateQuery, updateMotherQuery;
    let rows;

    rows = await MONGOC.db(dbName).collection(collection).find({}).toArray();

    for (let i = 0; i < obj.length; i++) {
      mode = modes.includes(obj[i].mode) ? obj[i].mode : mode;
      position = typeof obj[i].position === "string" ? obj[i].position : position;
      value = obj[i].value !== undefined ? obj[i].value : value;
      if (mode === "remove") {
        value = "";
      }
      for (let json of rows) {

        whereQuery = {};
        updateQuery = {};
        updateMotherQuery = {};

        whereQuery[standard] = findValue(json, standard);

        if (mode === "add") {
          updateQuery[position] = value;
          updateMotherQuery["$set"] = updateQuery;
          await MONGOC.db(dbName).collection(collection).updateOne(whereQuery, updateMotherQuery);
        } else if (mode === "remove") {
          updateQuery[position] = value;
          updateMotherQuery["$unset"] = updateQuery;
          await MONGOC.db(dbName).collection(collection).updateOne(whereQuery, updateMotherQuery);
        } else if (mode === "move") {
          updateQuery[position] = findValue(json, value);
          updateMotherQuery["$set"] = updateQuery;
          await MONGOC.db(dbName).collection(collection).updateOne(whereQuery, updateMotherQuery);
          updateQuery = {};
          updateMotherQuery = {};
          updateQuery[value] = "";
          updateMotherQuery["$unset"] = updateQuery;
          await MONGOC.db(dbName).collection(collection).updateOne(whereQuery, updateMotherQuery);
        } else if (mode === "copy") {
          updateQuery[position] = findValue(json, value);
          updateMotherQuery["$set"] = updateQuery;
          await MONGOC.db(dbName).collection(collection).updateOne(whereQuery, updateMotherQuery);
        }

        console.log(`${collection} ${mode} "${position}"`, whereQuery);
      }
    }

    console.log(`${collection} ${mode} all done`);
  } catch (e) {
    console.log(e);
  }
}

DevContext.prototype.splitAi = async function splitAi(targetAi) {
  const instance = this;
  const { fileSystem, shell, shellLink } = this.mother;
  const SvgOptimizer = require(`${process.cwd()}/apps/svgOptimizer/svgOptimizer.js`);
  const ContentsMaker = require(`${process.cwd()}/apps/contentsMaker/contentsMaker.js`);
  try {
    if (!(await fileSystem(`exist`, [ targetAi ]))) {
      throw new Error("There is no ai file");
    }
    const contents = new ContentsMaker();
    await fileSystem(`write`, [ `${process.cwd()}/temp/aiCanvasScript.js`, `console.splitAi("${targetAi}", true);` ]);
    await contents.generalLaunching(`${process.cwd()}/temp/aiCanvasScript.js`);
    let targetAirDir, resultFolder;
    let target;
    let targetDir, temp, targetTong, optimizer, optimizeResult;
    let svgTongString;

    targetAirDir = targetAi.split('/');
    targetAirDir.pop();
    targetAirDir = targetAirDir.join('/');
    resultFolder = targetAirDir + "/split";

    target = resultFolder + "/svg";

    targetDir = await fileSystem(`readDir`, [ target ]);
    targetDir = targetDir.filter((i) => { return ((i !== `.DS_Store`) && (!/\.js/i.test(i)) && i !== "tong.js"); });
    targetTong = [];

    for (let svg of targetDir) {
      targetTong.push(target + "/" + svg);
    }

    optimizer = new SvgOptimizer(targetTong);
    optimizeResult = await optimizer.launching();

    svgTongString = '';
    for (let i in optimizeResult) {
      svgTongString += "SvgTong." + i + " = " + "'" + optimizeResult[i].replace(/\'/g, '"') + "'";
      svgTongString += "\n\n";
    }

    await fileSystem(`write`, [ `${target}/tong.js`, svgTongString ]);
    for (let svg of targetDir) {
      shell.exec(`rm -rf ${shellLink(target + "/" + svg)};`);
    }

    return resultFolder;

  } catch (e) {
    console.log(e);
  }
}

DevContext.prototype.pageRender = async function (targetAi) {
  const instance = this;
  const { fileSystem, shell, shellLink, ghostFileUpload } = this.mother;
  try {
    if (!(await fileSystem(`exist`, [ targetAi ]))) {
      throw new Error("There is no ai file");
    }

    const resultConst = [ "svg", "jpg", "pdf" ];
    const mediaConst = "media";
    const pageBlockConst = "pageBlock";
    let mediaBoo;
    let targetFolder, resultFolder;
    let tempArr;
    let fromArr, toArr;
    let dirList;
    let aiName;

    tempArr = targetAi.split('/');
    aiName = tempArr.pop();
    targetFolder = tempArr.join('/');

    resultFolder = await this.splitAi(targetAi);

    if (await fileSystem(`exist`, [ `${targetFolder}/${mediaConst}` ])) {
      shell.exec(`cp -r ${shellLink(targetFolder + "/" + mediaConst)} ${resultFolder}`);
      mediaBoo = true;
    } else {
      mediaBoo = false;
    }

    fromArr = [];
    toArr = [];

    for (let i of resultConst) {
      dirList = await fileSystem(`readDir`, [ `${resultFolder}/${i}` ]);
      dirList = dirList.filter((f) => { return f !== `.DS_Store`; });
      for (let j of dirList) {
        fromArr.push(`${resultFolder}/${i}/${j}`);
        toArr.push(`${pageBlockConst}/${aiName.replace(/\.ai$/gi, '')}/${i}/${j}`);
      }
    }

    if (mediaBoo) {
      dirList = await fileSystem(`readDir`, [ `${resultFolder}/${mediaConst}` ]);
      dirList = dirList.filter((f) => { return f !== `.DS_Store`; });
      for (let j of dirList) {
        fromArr.push(`${resultFolder}/${mediaConst}/${j}`);
        toArr.push(`${pageBlockConst}/${aiName.replace(/\.ai$/gi, '')}/${mediaConst}/${j}`);
      }
    }

    await ghostFileUpload(fromArr, toArr);
    shell.exec(`rm -rf ${shellLink(resultFolder)}`);

  } catch (e) {
    console.log(e);
  }
}

DevContext.prototype.pageReady = async function (name) {
  const instance = this;
  const { fileSystem, shell, shellLink } = this.mother;
  const ContentsMaker = require(`${process.cwd()}/apps/contentsMaker/contentsMaker.js`);
  try {
    const contents = new ContentsMaker();
    const homeDir = process.env.HOME;
    const homeDirList = await fileSystem(`readDir`, [ homeDir ]);
    let aiScriptFunc, aiScript;
    let resultFolder;

    resultFolder = `${homeDir}/${name}`;
    if (homeDirList.includes(name)) {
      shell.exec(`rm -rf ${shellLink(resultFolder)}`);
    }
    shell.exec(`mkdir ${shellLink(resultFolder)}`);

    aiScriptFunc = function () {
      const thisAi = console.createDocument();
      const rect = thisAi.artboards[0].artboardRect;
      const rectangle = console.rectangle({
        top: 0,
        left: 0,
        width: console.convertMillimeters(297),
        height: console.convertMillimeters(210),
        stroke: null,
        fill: "#2fa678",
        radius: null,
      });

      thisAi.artboards.add(rectangle.geometricBounds);
      thisAi.artboards.remove(0);
      rectangle.remove();

      let tempRect, saveOptions;

      thisAi.artboards[0].name = "a1";
      thisAi.layers[0].name = "svg";
      tempRect = console.rectangle({
        top: 0,
        left: 0,
        width: console.convertMillimeters(20),
        height: console.convertMillimeters(210),
        stroke: null,
        fill: "#2fa678",
        radius: null,
      });
      tempRect.guides = true;
      tempRect = console.rectangle({
        top: 0,
        left: 0,
        width: console.convertMillimeters(297),
        height: console.convertMillimeters(24),
        stroke: null,
        fill: "#2fa678",
        radius: null,
      });
      tempRect.guides = true;
      tempRect = console.rectangle({
        top: 0,
        left: console.convertMillimeters(297 - 20),
        width: console.convertMillimeters(20),
        height: console.convertMillimeters(210),
        stroke: null,
        fill: "#2fa678",
        radius: null,
      });
      tempRect.guides = true;
      tempRect = console.rectangle({
        top: console.convertMillimeters(210 - 24) * -1,
        left: 0,
        width: console.convertMillimeters(297),
        height: console.convertMillimeters(24),
        stroke: null,
        fill: "#2fa678",
        radius: null,
      });
      tempRect.guides = true;

      saveOptions = new IllustratorSaveOptions();
      thisAi.saveAs(new File(RESULT_FILE), saveOptions);
      thisAi.close(SaveOptions.DONOTSAVECHANGES);
    }
    aiScript = aiScriptFunc.toString().replace(/^function[^\(\)]*\([^\(\)]*\)[^\{]*\{/gi, '').replace(/\}$/gi, '').replace(/RESULT_FILE/g, '"' + resultFolder + "/" + name + ".ai" + '"');
    await fileSystem(`write`, [ `${process.cwd()}/temp/aiCanvasScript.js`, aiScript ]);
    await contents.generalLaunching(`${process.cwd()}/temp/aiCanvasScript.js`);

    shell.exec(`open ${shellLink(resultFolder)}`);

  } catch (e) {
    console.log(e);
  }
}

DevContext.prototype.makeSvgTong = async function () {
  const instance = this;
  const { fileSystem } = this.mother;
  try {
    const SvgOptimizer = require(`${process.cwd()}/apps/svgOptimizer/svgOptimizer.js`);
    const target = process.cwd() + "/temp/svg";
    let targetDir, temp, targetTong, optimizer, optimizeResult;
    let svgTongString;

    targetDir = await fileSystem(`readDir`, [ target ]);
    targetDir = targetDir.filter((i) => { return ((i !== `.DS_Store`) && (!/\.js/i.test(i)) && i !== "tong.js"); });
    targetTong = [];

    for (let svg of targetDir) {
      targetTong.push(target + "/" + svg);
    }

    optimizer = new SvgOptimizer(targetTong);
    optimizeResult = await optimizer.launching();

    svgTongString = '';
    for (let i in optimizeResult) {
      svgTongString += "SvgTong." + i + " = " + "'" + optimizeResult[i].replace(/\'/g, '"') + "'";
      svgTongString += "\n\n";
    }

    await fileSystem(`write`, [ `${process.cwd()}/temp/svg/tong.js`, svgTongString ]);
  } catch (e) {
    console.log(e);
  }
}

DevContext.prototype.spellCheck = async function (porlid) {
  const instance = this;
  try {
    const app = new NaverAPIs();
    const hangul = new ParsingHangul();
    let note, targetArr, temp;
    let fixString;
    let updateArr = [];
    note = new AppleNotes({ folder: "portfolio", subject: porlid });
    targetArr = await note.readNote();
    for (let i of targetArr) {
      temp = await app.paragraphChecker(i);
      fixString = hangul.fixString(temp);
      console.log(fixString);
      updateArr.push(fixString);
    }
    console.log(updateArr);
    updateArr.shift();
    await note.updateNote(updateArr.join('<br><br>').replace(/\"/gi, "'"));
  } catch (e) {
    console.log(e);
  }
}

DevContext.prototype.aspirantToDesigner = async function (nameList) {
  if (!Array.isArray(nameList)) {
    throw new Error("input must be array => [ [], [], []... ]");
  }
  const instance = this;
  const back = new BackMaker();
  const report = new BackReport();
  const work = new BackWorker();
  const { fileSystem, shell, shellLink, s3FileUpload, ghostFileUpload, requestSystem, ghostRequest, mysqlQuery, binaryRequest, cryptoString, decryptoHash } = this.mother;
  try {
    const stringToDate = function (str) {
      let temp = str.split('-');
      return new Date(Number(temp[0]), Number(temp[1].replace(/^0/g, '')) - 1, Number(temp[2].replace(/^0/g, '')));
    }

    let whereQuery, updateQuery;
    let aspirants, aspirant;
    let aspidArr;
    aspidArr = [];
    for (let [ name, contractDay ] of nameList) {
      whereQuery = { designer: name };
      aspirants = await back.getAspirantsByQuery(whereQuery, { selfMongo: this.MONGOC });
      aspirant = aspirants[0];
      aspidArr.push({ aspid: aspirant.aspid, contract: stringToDate(contractDay) });
    }
    await work.aspirantToDesigner(aspidArr, { selfMongo: this.MONGOC });
  } catch (e) {
    console.log(e);
  }
}

DevContext.prototype.sendChecklist = async function () {
  const instance = this;
  const back = new BackMaker();
  const report = new BackReport();
  const work = new BackWorker();
  const { fileSystem, shell, shellLink, s3FileUpload, ghostFileUpload, requestSystem, ghostRequest, mysqlQuery, binaryRequest, cryptoString, decryptoHash } = this.mother;
  try {
    const ADDRESS = require(`${process.cwd()}/apps/infoObj.js`);
    const kakao = new KakaoTalk();
    await kakao.ready();
    const method = "designerCheckList";
    const designers = await back.getDesignersByQuery({ desid: "d2103_aa21s" });

    const today = new Date();
    const dayArr = [ '일', '월', '화', '수', '목', '금', '토' ];
    let expiredString = '';
    let targetDesigners = [];
    let tempObj;
    let middleDate, deadDate;
    let rows;

    if (today.getDay() !== 0 && today.getDay() !== 6) {
      //pyeong-day
      today.setDate(today.getDate() + 7);
    } else {
      if (today.getDay() !== 0) {
        //saturday
        today.setDate(today.getDate() + 9);
      } else {
        //sunday
        today.setDate(today.getDate() + 8);
      }
    }

    expiredString += String(today.getMonth() + 1) + "월";
    expiredString += " ";
    expiredString += String(today.getDate()) + "일";
    expiredString += " ";
    expiredString += dayArr[today.getDay()] + "요일";
    expiredString += " ";
    expiredString += String(14) + "시";

    for (let d of designers) {
      if (/완료/gi.test(d.information.contract.status.value)) {
        targetDesigners.push({ desid: d.desid, designer: d.designer, phone: d.information.phone });
      }
    }

    middleDate = new Date();
    middleDate.setHours(middleDate.getHours() + 8);
    deadDate = new Date();
    deadDate.setDate(deadDate.getDate() + 9);

    for (let { desid, designer, phone } of targetDesigners) {
      console.log(method, designer, phone);
      console.log(expiredString, ADDRESS.homeinfo.ghost.host, desid);
      rows = await back.mongoRead("deadline", { name: "designerCheckList_" + desid }, { console: true });
      if (rows.length > 0) {
        await back.mongoUpdate("deadline", [ { name: "designerCheckList_" + desid }, { deadline: deadDate, middleline: middleDate } ], { console: true });
      } else {
        await back.mongoCreate("deadline", { deadline: deadDate, middleline: middleDate, name: "designerCheckList_" + desid }, { console: true });
      }
      await kakao.sendTalk(method, designer, phone, {
        date: expiredString,
        host: ADDRESS.homeinfo.ghost.host,
        desid: desid,
      });
    }
  } catch (e) {
    console.log(e);
  }
}

DevContext.prototype.getCorePortfolio = async function (pid) {
  const instance = this;
  const { fileSystem, shell, shellLink } = this.mother;
  try {
    if (pid === undefined) {
      throw new Error("must be pid");
    }
    const nameConst = "static";
    const staticConst = "/home/" + this.address.homeinfo.ghost.user + "/" + nameConst;
    const portfolioConst = "/corePortfolio/original";
    let scpFrom, scpTo;
    scpFrom = this.address.homeinfo.ghost.user + "@" + this.address.homeinfo.ghost.host + ":" + shellLink(staticConst + portfolioConst + "/" + pid);
    scpTo = shellLink(process.cwd() + "/temp");
    shell.exec(`scp -r ${scpFrom} ${scpTo}`);
  } catch (e) {
    console.log(e);
  }
}

DevContext.prototype.getRawPortfolio = async function (pid) {
  const instance = this;
  const { ghostRequest, shell, shellLink } = this.mother;
  try {
    if (pid === undefined) {
      throw new Error("must be pid");
    }
    const photoRequest = ghostRequest().bind("photo");
    let photoList, tempArr;
    let target;
    let targetLink;
    let scpFrom, scpTo;

    photoList = await photoRequest("ls");
    photoList = photoList.filter((f) => { return /^[ap]/.test(f) && /_/gi.test(f); });

    target = null;
    for (let fileName of photoList) {
      tempArr = fileName.split('_').map((f => { return f.trim(); }));
      if (pid === tempArr[0]) {
        target = fileName;
        break;
      }
    }

    if (target !== null) {
      photoList = await photoRequest("ls", { target });
      if (photoList.includes(pid)) {
        targetLink = shellLink((await photoRequest("pwd", { target })).absolute + "/" + pid);
        scpFrom = this.address.officeinfo.ghost.user + "@" + this.address.officeinfo.ghost.host + ":" + targetLink;
        scpTo = shellLink(process.cwd() + "/temp");
        shell.exec(`scp -r ${scpFrom} ${scpTo}`);
      }
    }

  } catch (e) {
    console.log(e);
  }
}

DevContext.prototype.setProposalSettingForDesigner = async function (desid, files, description) {
  // files = [ { porlid: "a78", index: 2 } or { porlid: "ghost", index: 2 } ]
  const instance = this;
  try {
    if (!Array.isArray(files)) {
      throw new Error("files must be array");
    }
    if (files.length !== 6 && files.length !== 5) {
      throw new Error("files must be 5 or 6 array");
    }
    for (let i = 0; i < files.length; i++) {
      if (files[i].porlid === undefined || files[i].index === undefined) {
        throw new Error("files must be [ { porlid: \"a78\", index: 2 } or { porlid: \"ghost\", index: 2 } ]");
      }
    }
    let proposalArr, dummy, filesArr, mode;
    mode = files.length;
    filesArr = [];
    for (let { porlid, index } of files) {
      if (porlid !== "ghost") {
        filesArr.push(`/corePortfolio/listImage/${porlid}/t${String(index)}${porlid}.jpg`);
      } else {
        filesArr.push(`/rawDesigner/ghost/${desid}/g${String(index)}.jpg`);
      }
    }

    dummy = function (fileArr) {
      let resultArr;

      if (mode === 6) {

        resultArr = { name: "기본 세팅", photo: [
          {
              "position" : "0",
              "sgTrue" : "g",
              "unionPo" : "union",
              "styleText" : "width: 66.5%; height: 66%; top: 0%; left: 0%; background-image: url(\"" + filesArr[0] + "\");",
              "imgSrc" : filesArr[0]
          },
          {
              "position" : "1",
              "sgTrue" : "s",
              "unionPo" : "right",
              "styleText" : "width: 32.8%; height: 66%; top: 0%; left: 67.2%; background-image: url(\"" + filesArr[1] + "\");",
              "imgSrc" : filesArr[1]
          },
          {
              "position" : "2",
              "sgTrue" : "g",
              "unionPo" : "union",
              "imgSrc" : filesArr[2],
              "styleText" : "top: 67%; left: 0%; width: 32.8%; height: 33%; background-image: url(\"" + filesArr[2] + "\");"
          },
          {
              "position" : "3",
              "sgTrue" : "g",
              "unionPo" : "union",
              "imgSrc" : filesArr[3],
              "styleText" : "top: 67%; left: 33.5%; width: 33%; height: 33%; background-image: url(\"" + filesArr[3] + "\");"
          },
          {
              "position" : "4",
              "sgTrue" : "s",
              "unionPo" : "left",
              "imgSrc" : filesArr[4],
              "styleText" : "top: 67%; left: 67.2%; width: 16%; height: 33%; background-image: url(\"" + filesArr[4] + "\");"
          },
          {
              "position" : "5",
              "sgTrue" : "s",
              "unionPo" : "right",
              "imgSrc" : filesArr[5],
              "styleText" : "top: 67%; left: 84%; width: 16%; height: 33%; background-image: url(\"" + filesArr[5] + "\");"
          }
        ], description };

      } else if (mode === 5) {

        resultArr = { name: "기본 세팅", photo: [
          {
              "position" : "0",
              "sgTrue" : "g",
              "unionPo" : "union",
              "styleText" : "width: 66.5%; height: 66%; top: 0%; left: 0%; background-image: url(\"" + filesArr[0] + "\");",
              "imgSrc" : filesArr[0]
          },
          {
              "position" : "1",
              "sgTrue" : "s",
              "unionPo" : "right",
              "styleText" : "width: 32.8%; height: 66%; top: 0%; left: 67.2%; background-image: url(\"" + filesArr[1] + "\");",
              "imgSrc" : filesArr[1]
          },
          {
              "position" : "2",
              "sgTrue" : "g",
              "unionPo" : "union",
              "imgSrc" : filesArr[2],
              "styleText" : "top: 67%; left: 0%; width: 32.8%; height: 33%; background-image: url(\"" + filesArr[2] + "\");"
          },
          {
              "position" : "3",
              "sgTrue" : "g",
              "unionPo" : "union",
              "imgSrc" : filesArr[3],
              "styleText" : "top: 67%; left: 33.5%; width: 33%; height: 33%; background-image: url(\"" + filesArr[3] + "\");"
          },
          {
              "position" : "4",
              "sgTrue" : "g",
              "unionPo" : "union",
              "imgSrc" : filesArr[4],
              "styleText" : "top: 67%; left: 67.2%; width: 32.8%; height: 33%; background-image: url(\"" + filesArr[4] + "\");"
          }
        ], description };

      }

      return resultArr;
    }

    proposalArr = [];
    for (let i = 0; i < 5; i++) {
      proposalArr.push(JSON.parse(JSON.stringify(dummy())));
    }

    console.log(proposalArr[0]);
    await this.back.updateDesigner([ { desid }, { "setting.proposal": proposalArr } ]);
    console.log("injection success");
  } catch (e) {
    console.log(e);
  }
}

DevContext.prototype.devCanvas = async function (dataCheck = false) {
  const instance = this;
  const { fileSystem } = this.mother;
  const contents = new ContentsMaker();
  try {
    const canvasFolder = `${this.dir}/canvas`;
    const tempFolder = `${process.cwd()}/temp`;
    const canvasFolderList = await fileSystem(`readDir`, [ canvasFolder ]);
    let canvasFolderList_refined, targetFolder, targetFolderList;
    let finalString, tempString, order, fileName, temp;

    canvasFolderList_refined = [];
    for (let i of canvasFolderList) {
      if (i !== `.DS_Store`) {
        canvasFolderList_refined.push(i);
      }
    }

    canvasFolderList_refined.sort((a, b) => {
      return Number(b.split('_')[0].replace(/[^0-9]/g, '')) - Number(a.split('_')[0].replace(/[^0-9]/g, ''));
    });

    targetFolder = canvasFolder + "/" + canvasFolderList_refined[0];
    targetFolderList = await fileSystem(`readDir`, [ targetFolder ]);

    finalString = '';
    if (!dataCheck) {
      order = [ "class", "data", "text", "exec", "exe", "main", "m", "index", "app" ];
    } else {
      order = [ "class", "data", "text", "check", "dev" ];
    }

    for (let i of order) {
      if (targetFolderList.includes(`${i}.js`)) {
        tempString = await fileSystem(`readString`, [ `${targetFolder}/${i}.js` ]);
        finalString += "\n\n";
        finalString += tempString.replace(/process.cwd\(\)/g, '"' + process.cwd() + '"');
      }
    }

    if (!dataCheck) {
      fileName = "aiCanvasScript.js";
      await fileSystem(`write`, [ `${tempFolder}/${fileName}`, finalString ]);
      await contents.generalLaunching(`${tempFolder}/${fileName}`);
    } else {
      temp = new Function(finalString);
      temp();
    }

  } catch (e) {
    console.log(e);
  }
}

module.exports = DevContext;
