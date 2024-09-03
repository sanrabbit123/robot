const ROBOT_PATH = process.cwd();
const APP_PATH = ROBOT_PATH + "/apps";
const Mother = require(APP_PATH + "/mother.js");
const BackMaker = require(APP_PATH + "/backMaker/backMaker.js");
const BackReport = require(APP_PATH + "/backMaker/backReport.js");
const BackWorker = require(APP_PATH + "/backMaker/backWorker.js");
const GoogleSheet = require(APP_PATH + "/googleAPIs/googleSheet.js");
const GoogleCalendar = require(APP_PATH + "/googleAPIs/googleCalendar.js");
const GoogleChrome = require(APP_PATH + "/googleAPIs/googleChrome.js");
const NaverAPIs = require(APP_PATH + "/naverAPIs/naverAPIs.js");
const KakaoTalk = require(APP_PATH + "/kakaoTalk/kakaoTalk.js");
const ParsingHangul = require(APP_PATH + "/parsingHangul/parsingHangul.js");
const BillMaker = require(APP_PATH + "/billMaker/billMaker.js");
const HumanPacket = require(APP_PATH + "/humanPacket/humanPacket.js");
const PortfolioFilter = require(APP_PATH + "/portfolioFilter/portfolioFilter.js");
const ImageReader = require(APP_PATH + "/imageReader/imageReader.js");

class DevContext {
  constructor () {
    this.mother = new Mother();
    this.back = new BackMaker();
    const { mongo, mongoinfo, mongolocalinfo, mongoconsoleinfo, mongotestinfo } = this.mother;
    this.MONGOC = new mongo(mongoinfo);
    this.MONGOLOCALC = new mongo(mongolocalinfo);
    this.MONGOCONSOLEC = new mongo(mongoconsoleinfo);
    this.MONGOLOGC = new mongo(mongotestinfo);
    this.address = require(`${process.cwd()}/apps/infoObj.js`);
    this.dir = `${process.cwd()}/apps/devContext`;
  }
}

DevContext.prototype.launching = async function () {
  const instance = this;
  const { mongo, mongoinfo, mongolocalinfo, mongoconsoleinfo, mongotestinfo, mongoofficeinfo } = this.mother;
  const { consoleQ, fileSystem, copyToClipboard, setQueue, shellExec, shellLink, http2InNode, orderSystem, stringToJson, jsonToString, ghostFileUpload, chromeOpen, curlRequest, diskReading, requestSystem, objectDeepCopy, ajaxJson, uniqueValue, getDateMatrix, generalFileUpload, promiseTimeout, mysqlQuery, headRequest, binaryRequest, cryptoString, decryptoHash, treeParsing, appleScript, sleep, equalJson, copyJson, pythonExecute, autoComma, dateToString, stringToDate, ipParsing, ipCheck, leafParsing, errorLog, messageLog, messageSend, pureServer, s3FileDelete, sendMessage, hexaJson, promiseTogether, serviceParsing, localUnique, processSystem, sha256Hmac, variableArray, autoHypenPhone, designerCareer, emergencyAlarm, mediaQuery, zeroAddition, linkToString, stringToLink, aliveLog, cronLog, alertLog, homeliaisonAnalytics, aliveMongo, getHoliday, capitalizeString } = this.mother;
  try {
    await this.MONGOC.connect();
    const address = this.address;
    const back = this.back;
    const work = new BackWorker();
    const parent = "1XrxI7BRC8S9ZZ96ZtJf1cq5T_2rACjQJ";
    const sheets = new GoogleSheet();
    const bill = new BillMaker();
    const chrome = new GoogleChrome();
    const findCode = this.findCode.bind(this);
    const human = new HumanPacket();

    

    // monthly must ==========================================================================================================================================
    // =======================================================================================================================================================

    // facebook token
    // const facebook = new FacebookAPIs();
    // await facebook.getAccessToken();
    // await facebook.dailyCampaign(this.MONGOLOCALC, 1, null);

    // =======================================================================================================================================================

    // kakao template json
    // const kakao = new KakaoTalk();
    // const json = await kakao.getTemplate();
    // await fileSystem(`writeJson`, [ `${process.cwd()}/temp/kakaoJson.json`, json ]);
    // await shellExec(`code`, [ `${process.cwd()}/temp/kakaoJson.json` ]);
    // =======================================================================================================================================================
        
    // certbot
    // await this.certRefreshing();
    // =======================================================================================================================================================


    

    
    


    
    

    


    

    

    
    
    // const selfMongo = this.MONGOC;
    // const collection = "contents";
    // let rows;
    // let targets;
    //
    // rows = await back.mongoRead(collection, {}, { selfMongo });
    // targets = [];
    // for (let c of rows) {
    //   if (c.contents.portfolio.date.valueOf() > (new Date(2024, 6, 7)).valueOf()) {
    //     console.log(c.contents.portfolio.date);
    //     targets.push(c.contents.portfolio.pid);
    //   }
    // }
    //
    // console.log(targets.length);
    // console.log(JSON.stringify(targets))



    // let date;
    // let requestString;
    //
    // date = new Date();
    // date.setDate(date.getDate() - 1);
    // date.setDate(date.getDate() - 1);
    // date.setDate(date.getDate() - 1);
    // date.setDate(date.getDate() - 1);
    // date.setDate(date.getDate() - 1);
    // date.setDate(date.getDate() - 1);
    // date.setDate(date.getDate() - 1);
    // date.setDate(date.getDate() - 1);
    // date.setDate(date.getDate() - 1);
    // date.setDate(date.getDate() - 1);
    // date.setDate(date.getDate() - 1);
    // date.setDate(date.getDate() - 1);
    // date.setDate(date.getDate() - 1);
    // date.setDate(date.getDate() - 1);
    // date.setDate(date.getDate() - 1);
    // date.setDate(date.getDate() - 1);
    // date.setDate(date.getDate() - 1);
    // date.setDate(date.getDate() - 1);
    // date.setDate(date.getDate() - 1);
    // date.setDate(date.getDate() - 1);
    // date.setDate(date.getDate() - 1);
    // date.setDate(date.getDate() - 1);
    // date.setDate(date.getDate() - 1);
    // date.setDate(date.getDate() - 1);
    // date.setDate(date.getDate() - 1);
    // date.setDate(date.getDate() - 1);
    // date.setDate(date.getDate() - 1);
    // date.setDate(date.getDate() - 1);
    // date.setDate(date.getDate() - 1);
    // date.setDate(date.getDate() - 1);
    // date.setDate(date.getDate() - 1);
    // date.setDate(date.getDate() - 1);
    // date.setDate(date.getDate() - 1);
    // date.setDate(date.getDate() - 1);
    // date.setDate(date.getDate() - 1);
    //
    // date.setDate(date.getDate() - 1);
    // date.setDate(date.getDate() - 1);
    // date.setDate(date.getDate() - 1);
    // date.setDate(date.getDate() - 1);
    // date.setDate(date.getDate() - 1);
    // date.setDate(date.getDate() - 1);
    // date.setDate(date.getDate() - 1);
    // date.setDate(date.getDate() - 1);
    // date.setDate(date.getDate() - 1);
    // date.setDate(date.getDate() - 1);
    // date.setDate(date.getDate() - 1);
    // date.setDate(date.getDate() - 1);
    // date.setDate(date.getDate() - 1);
    // date.setDate(date.getDate() - 1);
    // date.setDate(date.getDate() - 1);
    // date.setDate(date.getDate() - 1);
    // date.setDate(date.getDate() - 1);
    // date.setDate(date.getDate() - 1);
    // date.setDate(date.getDate() - 1);
    // date.setDate(date.getDate() - 1);
    // date.setDate(date.getDate() - 1);
    // date.setDate(date.getDate() - 1);
    //
    //
    // requestString = '';
    //
    // requestString += dateToString(date);
    // requestString += ',';
    // date.setDate(date.getDate() + 1);
    // requestString += dateToString(date);
    // requestString += ',';
    // date.setDate(date.getDate() + 1);
    // requestString += dateToString(date);
    // requestString += ',';
    // date.setDate(date.getDate() + 1);
    // requestString += dateToString(date);
    // requestString += ',';
    // date.setDate(date.getDate() + 1);
    // requestString += dateToString(date);
    // requestString += ',';
    // date.setDate(date.getDate() + 1);
    // requestString += dateToString(date);
    // requestString += ',';
    // date.setDate(date.getDate() + 1);
    // requestString += dateToString(date);
    // requestString += ',';
    // date.setDate(date.getDate() + 1);
    // requestString += dateToString(date);
    // requestString += ',';
    // date.setDate(date.getDate() + 1);
    // requestString += dateToString(date);
    // requestString += ',';
    // date.setDate(date.getDate() + 1);
    // requestString += dateToString(date);
    // requestString += ',';
    // date.setDate(date.getDate() + 1);
    // requestString += dateToString(date);
    // requestString += ',';
    // date.setDate(date.getDate() + 1);
    // requestString += dateToString(date);
    // requestString += ',';
    // date.setDate(date.getDate() + 1);
    // requestString += dateToString(date);
    // requestString += ',';
    // date.setDate(date.getDate() + 1);
    // requestString += dateToString(date);
    // requestString += ',';
    // date.setDate(date.getDate() + 1);
    // requestString += dateToString(date);
    // requestString += ',';
    // date.setDate(date.getDate() + 1);
    // requestString += dateToString(date);
    // requestString += ',';
    // date.setDate(date.getDate() + 1);
    // requestString += dateToString(date);
    // requestString += ',';
    // date.setDate(date.getDate() + 1);
    // requestString += dateToString(date);
    // requestString += ',';
    // date.setDate(date.getDate() + 1);
    // requestString += dateToString(date);
    // requestString += ',';
    // date.setDate(date.getDate() + 1);
    // requestString += dateToString(date);
    // requestString += ',';
    // date.setDate(date.getDate() + 1);
    // requestString += dateToString(date);
    // requestString += ',';
    // date.setDate(date.getDate() + 1);
    // requestString += dateToString(date);
    // requestString += ',';
    // date.setDate(date.getDate() + 1);
    // requestString += dateToString(date);
    // requestString += ',';
    // date.setDate(date.getDate() + 1);
    // requestString += dateToString(date);
    // requestString += ',';
    // date.setDate(date.getDate() + 1);
    // requestString += dateToString(date);
    // requestString += ',';
    // date.setDate(date.getDate() + 1);
    // requestString += dateToString(date);
    // requestString += ',';
    // date.setDate(date.getDate() + 1);
    // requestString += dateToString(date);
    // requestString += ',';
    // date.setDate(date.getDate() + 1);
    // requestString += dateToString(date);
    // requestString += ',';
    // date.setDate(date.getDate() + 1);
    // requestString += dateToString(date);
    // requestString += ',';
    // date.setDate(date.getDate() + 1);
    // requestString += dateToString(date);
    // requestString += ',';
    // date.setDate(date.getDate() + 1);
    // requestString += dateToString(date);
    // requestString += ',';
    // date.setDate(date.getDate() + 1);
    // requestString += dateToString(date);
    // requestString += ',';
    // date.setDate(date.getDate() + 1);
    // requestString += dateToString(date);
    // requestString += ',';
    // date.setDate(date.getDate() + 1);
    // requestString += dateToString(date);
    // requestString += ',';
    // date.setDate(date.getDate() + 1);
    // requestString += dateToString(date);
    // requestString += ',';
    // date.setDate(date.getDate() + 1);
    // requestString += dateToString(date);
    // requestString += ',';
    // date.setDate(date.getDate() + 1);
    // requestString += dateToString(date);
    // requestString += ',';
    // date.setDate(date.getDate() + 1);
    // requestString += dateToString(date);
    // requestString += ',';
    // date.setDate(date.getDate() + 1);
    // requestString += dateToString(date);
    // requestString += ',';
    // date.setDate(date.getDate() + 1);
    // requestString += dateToString(date);
    // requestString += ',';
    // date.setDate(date.getDate() + 1);
    // requestString += dateToString(date);
    // requestString += ',';
    // date.setDate(date.getDate() + 1);
    // requestString += dateToString(date);
    // requestString += ',';
    // date.setDate(date.getDate() + 1);
    // requestString += dateToString(date);
    // requestString += ',';
    // date.setDate(date.getDate() + 1);
    // requestString += dateToString(date);
    // requestString += ',';
    // date.setDate(date.getDate() + 1);
    // requestString += dateToString(date);
    // requestString += ',';
    // date.setDate(date.getDate() + 1);
    // requestString += dateToString(date);
    // requestString += ',';
    // date.setDate(date.getDate() + 1);
    // requestString += dateToString(date);
    // requestString += ',';
    // date.setDate(date.getDate() + 1);
    // requestString += dateToString(date);
    // requestString += ',';
    // date.setDate(date.getDate() + 1);
    // requestString += dateToString(date);
    // requestString += ',';
    // date.setDate(date.getDate() + 1);
    // requestString += dateToString(date);
    // requestString += ',';
    // date.setDate(date.getDate() + 1);
    // requestString += dateToString(date);
    // requestString += ',';
    // date.setDate(date.getDate() + 1);
    // requestString += dateToString(date);
    // requestString += ',';
    // date.setDate(date.getDate() + 1);
    // requestString += dateToString(date);
    // requestString += ',';
    // date.setDate(date.getDate() + 1);
    // requestString += dateToString(date);
    // requestString += ',';
    // date.setDate(date.getDate() + 1);
    // requestString += dateToString(date);
    // requestString += ',';
    // date.setDate(date.getDate() + 1);
    // requestString += dateToString(date);
    // requestString += ',';
    // date.setDate(date.getDate() + 1);
    // requestString += dateToString(date);
    //
    // console.log(requestString);
    // console.log(await requestSystem("https://" + instance.address.officeinfo.ghost.host + "/analyticsDaily", { date: requestString, dayNumber: 57 }, { headers: { "Content-Type": "application/json" } }));



    // const designers = (await back.getDesignersByQuery({}, { selfMongo: this.MONGOC, toNormal: true })).filter((d) => { return d.information.contract.status === "협약 완료" }).map((d) => { return { name: d.designer, phone: d.information.phone } });

    // const kakao = new KakaoTalk();
    // console.log(await kakao.friendsTalk(designers, {
    //   ads: false,
    //   title: `홈리에종 디자이너 교육`,
    //   body: `안녕하세요, #{name} 실장님!\n홈리에종 홈스타일링 클래스 1기 오픈 안내드립니다!\n현직 홈리에종 TOP 디자이너 업무 전략 공개 \n\n- 1차 클래스 : 홈스타일링 6월 15일 (토) 오후 1시 \n- 2차 클래스 : 시공 6월 22일 (토) 오후 1시\n\n* 상세 커리큘럼 보러가기\nhttps://bit.ly/3V7RxNW\n\n* 신청 링크\nhttps://homeliaison.typeform.com/to/Q73mE8eD`,
    //   convert: {
    //     name: (name, phone) => { return name; },
    //   },
    // }));

    // const res = await requestSystem("https://" + address.officeinfo.ghost.host + "/analyticsToday", { report: 1 }, { headers: { "Content-Type": "application/json" } });
    // console.log(res)






    // const url = "https://api.pushbullet.com/v2/permanents/ujEVkZaUIQCsjA8RALCBgW_thread_36";
    // const webToken = "OWdKdk94bTNrQ2tUMUNwMVVxSW5jT29kQ3dCZnhnWE46";
    // const headers = {
    //   "Accept": `*/*`,
    //   "Accept-Encoding": `gzip, deflate, br`,
    //   "Accept-Language": `ko-KR,ko;q=0.9`,
    //   "API-Version": `2014-05-07`,
    //   "Authorization": `Basic ${webToken}`,
    //   "Connection": `keep-alive`,
    //   "Host": `api.pushbullet.com`,
    //   "Origin": `https://www.pushbullet.com`,
    //   "Referer": `https://www.pushbullet.com/`,
    //   "Sec-Fetch-Dest": `empty`,
    //   "Sec-Fetch-Mode": `cors`,
    //   "Sec-Fetch-Site": `same-site`,
    //   "User-Agent": `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15`,
    //   "X-User-Agent": `Pushbullet Website 162`,
    // }
    // const response = await requestSystem(url, {}, {
    //   method: "get",
    //   headers: {
    //     ...headers
    //   }
    // });
    // const ago = new Date();
    // const bodyToValues = (body) => {
    //   const accountStartNumber = "049";
    //   const accountEndNumber = "022";
    //   let date, messageArr, index, amount, name;

    //   messageArr = body.split("\n").map((str) => { return str.trim(); });
    //   messageArr = messageArr.filter((str) => { return str.trim() !== "" }).filter((str) => {
    //     return !/잔액 [0-9]/gi.test(str)
    //   }).map((str) => {
    //     return str.replace(/\[홈리에종\] /gi, "").trim().replace(/\:$/gi, '')
    //   }).filter((str) => {
    //     return !(/^\[/.test(str) && /^\]/.test(str));
    //   }).filter((str) => {
    //     return !((new RegExp('^' + accountStartNumber)).test(str) && (new RegExp(accountEndNumber + '$')).test(str));
    //   });
    //   if (messageArr[messageArr.length - 1].trim() === "기업") {
    //     messageArr = messageArr.slice(0, -1);
    //   }

    //   index = messageArr.findIndex((str) => { return /^입금/gi.test(str.trim()) });
    //   if (index === -1) {
    //     throw new Error("invaild message");
    //   }
    //   amount = Math.floor(Number(messageArr[index].replace(/[^0-9]/gi, '')));
    //   if (Number.isNaN(amount)) {
    //     throw new Error("invaild message, NaN amount");
    //   }
    //   if (typeof messageArr[index + 1] !== "string") {
    //     throw new Error("invaild message, name error");
    //   }
    //   name = messageArr[index + 1].trim();
    //   date = stringToDate(messageArr[index - 1].trim().replace(/\//gi, '-') + ":00");
    //   return { name, date, amount };
    // }
    // let tempObj;

    // ago.setDate(ago.getDate() - 2);

    // const targets = (response.data.thread.filter((o) => {
    //   return o.timestamp * 1000 > ago.valueOf()
    // }));
    // for (let { body } of targets)  {
    //   tempObj = bodyToValues(body);
    //   await requestSystem("https://" + instance.address.officeinfo.ghost.host + ":3000/receiveSms", { date: tempObj.date, amount: tempObj.amount, name: tempObj.name }, { headers: { "Content-Type": "application/json" } });
    // }


    

    // version 0

    // const selfMongo = this.MONGOC;
    // const contentsProjectQuery = {
    //   conid: 1,
    //   desid: 1,
    //   cliid: 1,
    //   proid: 1,
    //   service: 1,
    //   photos: 1,
    //   "contents.portfolio.pid": 1,
    //   "contents.portfolio.date": 1,
    //   "contents.portfolio.spaceInfo": 1,
    //   "contents.portfolio.title": 1,
    //   "contents.portfolio.color": 1,
    //   "contents.portfolio.detailInfo": 1,
    //   "contents.review.rid": 1,
    //   "contents.review.date": 1,
    //   "contents.review.title": 1,
    //   "contents.review.detailInfo": 1,
    // };
    // const collection = "contents";
    // let designers, contentsArr;
    // let cliidArr;
    // let proidArr;
    // let whereQuery, projectQuery;
    // let thisClients, thisProjects;
    // let thisRequestNumber;
    // let thisClient;
    // let proposalDate;
    // let projects;
    // let thisProject;
    // let thisDesigner;

    // contentsArr = await back.mongoPick(collection, [ {}, contentsProjectQuery ], { selfMongo });
    // designers = await back.getDesignersByQuery({ $or: contentsArr.map((obj) => { return { desid: obj.desid } }) }, { selfMongo });

    // cliidArr = [ ...new Set(contentsArr.map((o) => { return o.cliid.trim() }).filter((s) => { return s !== "" })) ];
    // proidArr = [ ...new Set(contentsArr.map((o) => { return o.proid.trim() }).filter((s) => { return s !== "" })) ];

    // if (cliidArr.length > 0) {

    //   whereQuery = { $or: cliidArr.map((cliid) => { return { cliid } }) };
    //   projectQuery = {
    //     cliid: 1,
    //     name: 1,
    //     "requests.request.timeline": 1,
    //     "requests.request.budget": 1,
    //     "requests.request.family": 1,
    //     "requests.request.furniture": 1,
    //     "requests.request.space": 1,
    //   }
    //   thisClients = await back.mongoPick("client", [ objectDeepCopy(whereQuery), objectDeepCopy(projectQuery) ], { selfMongo });

    //   whereQuery = { $or: proidArr.map((proid) => { return { proid } }) };
    //   projectQuery = {
    //     proid: 1,
    //     cliid: 1,
    //     desid: 1,
    //     "proposal.date": 1,
    //     process: 1,
    //   }
    //   thisProjects = await back.mongoPick("project", [ objectDeepCopy(whereQuery), objectDeepCopy(projectQuery) ], { selfMongo });

    //   projects = [];
    //   for (let project of thisProjects) {
    //     proposalDate = new Date(JSON.stringify(project.proposal.date).slice(1, -1));
    //     thisClient = thisClients.find((c) => { return c.cliid === project.cliid });

    //     thisRequestNumber = 0;
    //     for (let i = 0; i < thisClient.requests.length; i++) {
    //       if (thisClient.requests[i].request.timeline.valueOf() <= proposalDate.valueOf()) {
    //         thisRequestNumber = i;
    //         break;
    //       }
    //     }

    //     project.requestNumber = thisRequestNumber;
    //     project.client = {
    //       name: thisClient.name,
    //       cliid: thisClient.cliid,
    //       request: objectDeepCopy(thisClient.requests[thisRequestNumber].request),
    //     };
    //     projects.push(project);
    //   }

    //   for (let contents of contentsArr) {
    //     if (contents.proid !== "") {
    //       thisProject = projects.find((p) => { return p.proid === contents.proid });
    //       contents.project = objectDeepCopy(thisProject);
    //     } else {
    //       contents.project = { client: { request: [] } };
    //     }
    //     thisDesigner = designers.find((d) => { return d.desid === contents.desid });
    //     contents.designer = thisDesigner.designer;
    //   }



    // }

    /*

    // version 1

    const selfMongo = this.MONGOC;
    const contentsProjectQuery = {
      conid: 1,
      desid: 1,
      cliid: 1,
      proid: 1,
      service: 1,
      photos: 1,
      "contents.portfolio.pid": 1,
      "contents.portfolio.date": 1,
      "contents.portfolio.spaceInfo": 1,
      "contents.portfolio.title": 1,
      "contents.portfolio.color": 1,
      "contents.portfolio.detailInfo": 1,
      "contents.review.rid": 1,
      "contents.review.date": 1,
      "contents.review.title": 1,
      "contents.review.detailInfo": 1,
    };
    const collection = "contents";
    const limit = 42;
    const toNormal = true;
    let designers, contentsArr;
    let cliidArr;
    let whereQuery, projectQuery;
    let thisClients;
    let thisRequestNumber;
    let thisClient;
    let thisDesigner;

    contentsArr = await back.mongoPick(collection, [ {}, contentsProjectQuery ], { selfMongo, limit });
    designers = await back.getDesignersByQuery({ $or: contentsArr.map((obj) => { return { desid: obj.desid } }) }, { selfMongo, toNormal });

    cliidArr = [ ...new Set(contentsArr.map((o) => { return o.cliid.trim() }).filter((s) => { return s !== "" })) ];

    if (cliidArr.length > 0) {

      whereQuery = { $or: cliidArr.map((cliid) => { return { cliid } }) };
      projectQuery = {
        cliid: 1,
        name: 1,
        "requests.request.timeline": 1,
        "requests.request.budget": 1,
        "requests.request.family": 1,
        "requests.request.furniture": 1,
        "requests.request.space": 1,
      }
      thisClients = await back.mongoPick("client", [ objectDeepCopy(whereQuery), objectDeepCopy(projectQuery) ], { selfMongo });

      for (let contents of contentsArr) {
        if (contents.cliid !== "") {
          thisClient = thisClients.find((c) => { return c.cliid === contents.cliid });
          thisRequestNumber = 0;
          for (let i = 0; i < thisClient.requests.length; i++) {
            if (thisClient.requests[i].request.timeline.valueOf() <= contents.contents.portfolio.date.valueOf()) {
              thisRequestNumber = i;
              break;
            }
          }
          contents.client = {
            name: thisClient.name,
            cliid: thisClient.cliid,
            request: objectDeepCopy(thisClient.requests[thisRequestNumber].request),
          };
        } else {
          contents.client = { request: {} };
        }
        thisDesigner = designers.find((d) => { return d.desid === contents.desid });
        contents.designer = thisDesigner.designer;
      }

      console.log(contentsArr);

    }

    */





    // promotion start ============================================================================================================================================================
    /*

    const promotion = {
      id: "promotion_342087238572035",
      date: new Date(),
      key: "from_239857239875_to_239857239875",
      lifespan: {
        from: new Date(),
        to: new Date(),
      },
      name: "샘플 프로모션_test",
      contents: {
        description: [
          "이것은 샘플 프로모션에 대한 설명입니다."
        ],
        filter: {
          js_json: async (mother, client, designer, project) => {
            const { ajaxJson, equalJson } = mother;
            try {
              const from = new Date(2024, 3, 20);
              const to = new Date(2024, 3, 24);
              let result;

              result = 0;
              if (client.requests[0].request.timeline.valueOf() >= from.valueOf() && client.requests[0].request.timeline.valueOf() < to.valueOf()) {
                result = 1;
              }

              return 0.3;
            } catch (e) {
              return 0;
            }
          },
          js_sql: "<<<sfrvgaergvawrgvawegwagwegweg4g4g4gagv>>>",
          python_json: "<<<w3eofhqo3248gq0243gh2q4gq24jp0g9jq24g>>>",
          python_sql: "<<<eafrbdcxvwdvawrgvaergvrddaefweaddfawef>>>",
        },
        values: [ 0, 0.1, 0.3 ]
      },
    }

    const obj0 = ((await hexaJson(promotion)));
    const obj1 = (await hexaJson(await hexaJson(promotion)));

    console.log(obj0);
    console.log(obj1);

    */
    // promotion end ==============================================================================================================================================================





    

    

    















    // await this.MONGOCONSOLEC.connect();

    // const selfCoreMongo = this.MONGOC;
    // const selfMongo = this.MONGOCONSOLEC;
    // const collection = "realtimeDesigner";
    // let rows;
    // let designers;
    // let matrix;
    // let thisStart, thisEnd;
    // let thisArr;
    // let possibleArr;
    // let possibleNumbersArr;
    // let possibleNumber;

    // designers = await back.getDesignersByQuery({}, { selfMongo: selfCoreMongo });
    // rows = await back.mongoRead(collection, {}, { selfMongo });

    // ({ matrix } = getDateMatrix(2024, 1).sundayConvert());

    // for (let arr of matrix) {

    //   thisArr = arr.filter((o) => { return o !== null });
    //   thisStart = thisArr[0].dateObject;
    //   thisEnd = thisArr[thisArr.length - 1].dateObject;


    //   for (let row of rows) {
    //     possibleArr = row.possible.filter((o) => {
    //       return (o.start.valueOf() >= thisStart.valueOf()) && (o.end.valueOf() <= thisEnd.valueOf())
    //     });
    //     possibleNumbersArr = possibleArr.map((a) => { return a.matrix.reduce((acc, curr) => { return acc >= curr ? acc : curr }, 0) });
    //     possibleNumber = 0;
    //     if (possibleNumbersArr.length > 0) {
    //       possibleNumber = possibleNumbersArr.reduce((acc, curr) => { return acc >= curr ? acc : curr }, 0);
    //     }
    //     console.log(row.desid, thisStart, thisEnd, possibleNumber);
    //   }
    // }

    // await this.MONGOCONSOLEC.close();










    /*

    // ads anti-ads ratio

    const clients = (await back.getClientsByQuery({}, { selfMongo: this.MONGOC })).toNormal();

    const selfMongo = this.MONGOLOGC;
    await selfMongo.connect();
    const collection = "dailyClients";
    const sheetsId = "1qI_JUsHP6Wor1xieJDbR67q9xrTuSvG8XIxXXuauzY8";
    let rows;
    let targets;
    let startDate, endDate;
    let matrix;
    let thisClient;
    let standardNumber;

    rows = await back.mongoRead(collection, {}, { selfMongo });



    for (let i = 1; i < 9; i++) {
      standardNumber = i;

      startDate = new Date(2023, standardNumber - 1, 1);
      endDate = new Date(2023, standardNumber, 1);
      targets = [];
      for (let row of rows) {
        if (startDate.valueOf() <= row.date.from.valueOf() && row.date.from.valueOf() < endDate.valueOf()) {
          targets.push(equalJson(JSON.stringify(row)));
        }
      }

      matrix = [];
      matrix.push([
        "아이디",
        "성함",
        "문의일",
        "광고 여부",
        "상태",
      ]);

      for (let row of targets) {
        for (let obj of row.data.detail) {
          thisClient = clients.find((c) => { return c.cliid === obj.cliid });
          thisRequest = thisClient.requests[0];
          matrix.push([
            obj.cliid,
            thisClient.name,
            dateToString(thisRequest.request.timeline, true),
            (obj.users.map((o) => { return o.source }).map((o) => { return o.campaign }).flat().filter((str) => { return !/^link/.test(str) }).length > 0) ? "광고" : "비광고",
            thisRequest.analytics.response.status,
          ])
        }
      }

      await sheets.update_value_inPython(sheetsId, dateToString(new Date(2023, standardNumber - 1, 1)).split("-").slice(0, 2).join("-"), matrix);
    }
    console.log(matrix);
    await selfMongo.close();


    */














    // /designer path => desid injection


    // ai study =====================================================================================================================

    // const host = "analytics.naver.com";
    // const siteId = "s_dc977e44f53";
    // const accessToken = "xBEV6ywWnX1f06tB9zxvb2Hi31jhCMX9cMRu31zQrMQxSa8HjS4zvBuc7oR0JsWfTAV1k86ACkbBPMvVcHNAfwz5BDWmbYJJ1vmKey5l7tcfZFBXbDVeq0QGobh+/9WLS87NtXDJo68Thay4zpiK8JmWugAhobzpPAZV1hG9/v9WwoomU/z0ybKAZw/Jt5kmu4vQBeHNIimQC2iAQCBPY3p1926pXmoTfkK19+fv9Sj4K/RHFdJxDEzwRo7BJ5jzrMZ5AZM8RlfXJqBclgIINGssUHAGYp6nYE1akZpcdvBCjFHMBibZf2bjciXkM0jZB59YYf+AQrsDE8QQJ/kFhqW0crAaKN1FBDReFMVW72MjvNh+1qA8auWj5yNvsXAQl3K0sH8WmSXMGIpKd+mtGw==";
    // const res = await requestSystem("https://" + host + "/api/sites/" + siteId + "/report", {
    //   startDate: dateToString(new Date(2023, 6, 7)),
    //   endDate: dateToString(new Date(2023, 6, 7)),
    //   metrics: "pageView",
    //   dimensions: [ "refInfoKeyword", "refInfoClass", "refInfoService" ],
    //   _: String((new Date()).valueOf()),
    // }, {
    //   method: "get",
    //   headers: {
    //     "Authorization": "Bearer " + accessToken,
    //   }
    // })
    // console.log(res);



    /*

    const image = new ImageReader();
    const imageKeyword = "imageTarget";
    const magick = "magick";
    const mkdir = "mkdir";
    const imagePath = `${process.cwd()}/temp/test.jpg`;
    const factorFolderName = "factorFolderName__" + uniqueValue("hex");
    const factorFolder = `${process.cwd()}/temp/${factorFolderName}`;
    const targetImageName = `${process.cwd()}/temp/${imageKeyword}_${uniqueValue("hex")}_${String(Math.floor(Math.random() * 100))}.jpg`;
    const clarifaiKey = "e399e812ec1d4ef8b6f441d19f1af3c7";
    const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");
    const standardWidth = 2000;

    const detectImageFactors = (imagePath) => {
      const stub = ClarifaiStub.grpc();
      const metaData = new grpc.Metadata();
      let inputData;
      let imageInfo;
      return new Promise((resolve, reject) => {
        metaData.set("authorization", "Key " + clarifaiKey);
        image.readImage(imagePath).then((info) => {
          imageInfo = info;
          return fileSystem(`readBuffer`, [ imagePath ]);
        }).then((buffer) => {
          inputData = {
            user_app_id: { "user_id": "clarifai", "app_id": "main" },
            model_id: "general-image-detection",
            inputs: [
              { data: { image: { url: null, base64: buffer } } }
            ]
          };
          stub.PostModelOutputs(inputData, metaData, (err, response) => {
            if (err) {
              reject(err);
            }
            if (response.status.code !== 10000) {
              reject("Post model outputs failed, status: " + response.status.description);
            }
            const output = response.outputs[0];
            const totalWidth = imageInfo.geometry.width;
            const totalHeight = imageInfo.geometry.height;
            const totalArea = totalWidth * totalHeight;
            let resultObj;
            let detailArr;

            detailArr = output.data.regions.map((obj) => {
              let x, y, width, height;
              y = obj.region_info.bounding_box.top_row * totalHeight;
              x = obj.region_info.bounding_box.left_col * totalWidth;
              width = Math.abs(obj.region_info.bounding_box.right_col - obj.region_info.bounding_box.left_col) * totalWidth;
              height = Math.abs(obj.region_info.bounding_box.bottom_row - obj.region_info.bounding_box.top_row) * totalHeight;
              return {
                name: obj.data.concepts.length > 0 ? obj.data.concepts[0].name : "unknown",
                bound: { x, y, width, height, area: width * height, ratio: (width * height) / totalArea },
              };
            }).filter((obj) => {
              return obj.name !== "House";
            });

            resultObj = {};
            resultObj.width = totalWidth;
            resultObj.height = totalHeight;
            resultObj.area = totalArea;
            resultObj.factors = {};
            resultObj.factors.length = detailArr.length;
            resultObj.factors.density = detailArr.reduce((acc, curr) => { return acc + curr.bound.ratio }, 0);
            resultObj.factors.detail = detailArr;

            resolve(resultObj);
          })
        }).catch((err) => {
          reject(err);
        })
      });
    }
    let imageSizeFactors;
    let x, y, width, height;
    let factorFile;
    let factorList;

    await shellExec(magick, [ imagePath, "-resize", String(standardWidth), targetImageName ]);
    imageSizeFactors = await detectImageFactors(targetImageName);

    await shellExec(mkdir, [ factorFolder ]);
    factorList = [];
    for (let { name, bound } of imageSizeFactors.factors.detail) {
      x = Math.round(bound.x);
      y = Math.round(bound.y);
      width = Math.round(bound.width);
      height = Math.round(bound.height);
      factorFile = `${factorFolder}/${name.replace(/ /gi, "").replace(/ /gi, "").replace(/ /gi, "")}.jpg`;
      await shellExec(magick, [ targetImageName, "-crop", `${String(width)}x${String(height)}+${String(x)}+${String(y)}`, `${factorFile}` ]);
      factorList.push(factorFile);
    }


    // color section

    const stub = ClarifaiStub.grpc();
    const metaData = new grpc.Metadata();
    metaData.set("authorization", "Key " + clarifaiKey);
    stub.PostModelOutputs(
      {
          user_app_id: {
              "user_id": "clarifai",
              "app_id": "main"
          },
          model_id: "color-recognition",
          inputs: [
            { data: { image: { url: null, base64: (await fileSystem("readBuffer", [ `${process.cwd()}/temp/test.jpg` ])) } } }
          ]
      },
      metaData,
      (err, response) => {
          if (err) {
            throw new Error(err);
          }
          if (response.status.code !== 10000) {
            throw new Error("Post model outputs failed, status: " + response.status.description);
          }

          console.log(response);

          fileSystem(`writeJson`, [ `${process.cwd()}/temp/bb.json`, response ]).catch((err) => {
            console.log(err);
          })

        }
    );

    */

    /*

    r, g, b
    max, min, average, representative

    representativeDistance
    distanceAverage

    bright
    contrast
    cct
    gamma

    wallRepresentativeDistance
    floorRepresentativeDistance
    ceilRepresentativeDistance

    factorRepresentativeDistanceMax
    factorRepresentativeDistanceMin
    factorRepresentativeDistanceAverage

    24

    +

    length
    density
    fabricBoo(0 or 1)
    curtainBoo(0 or 1)
    plantBoo(0 or 1)

    5

    */




    // const image = new ImageReader();
    // console.log(await image.readImage(process.cwd() + "/temp/test.jpg"));


    // ai study =====================================================================================================================



    // ai study =====================================================================================================================


    // const makeModel = async (matrixX, matrixY, deepMode = 3, hiddenUnits = 200) => {
    //   try {
    //     const makeModelFactor = async (matrixX, matrixY, deepMode = 3, hiddenUnits = 200) => {
    //       try {
    //         if (![ 0, 1, 2, 3, 4, 5 ].includes(deepMode)) {
    //           throw new Error("invalid mode");
    //         }
    //         const flow = require("@tensorflow/tfjs-node");
    //         const activation = "relu";
    //         const unitEpochs = 200;
    //         const finalEpochs = 1200;
    //         const safeConst = 250;
    //         const lossArrConst = 5;
    //         let tensorX, tensorY;
    //         let setX, setY;
    //         let model;
    //         let compileParam;
    //         let fitParam;
    //         let fitResult;
    //         let predictResult;
    //         let safeNum;
    //         let finalLoss;
    //         let lossArr;
    //         let setW, setH, setA, setB, setC;

    //         tensorX = flow.tensor(matrixX);
    //         tensorY = flow.tensor(matrixY);

    //         if (deepMode === 0) {
    //           setX = flow.input({ shape: [ matrixX[0].length ] });
    //           setY = flow.layers.dense({ units: matrixY[0].length, activation }).apply(setX);
    //         } else if (deepMode === 1) {
    //           setX = flow.input({ shape: [ matrixX[0].length ] });
    //           setW = flow.layers.dense({ units: hiddenUnits, activation }).apply(setX);
    //           setY = flow.layers.dense({ units: matrixY[0].length, activation }).apply(setW);
    //         } else if (deepMode === 2) {
    //           setX = flow.input({ shape: [ matrixX[0].length ] });
    //           setW = flow.layers.dense({ units: hiddenUnits, activation }).apply(setX);
    //           setH = flow.layers.dense({ units: hiddenUnits, activation }).apply(setW);
    //           setY = flow.layers.dense({ units: matrixY[0].length, activation }).apply(setH);
    //         } else if (deepMode === 3) {
    //           setX = flow.input({ shape: [ matrixX[0].length ] });
    //           setW = flow.layers.dense({ units: hiddenUnits, activation }).apply(setX);
    //           setH = flow.layers.dense({ units: hiddenUnits, activation }).apply(setW);
    //           setA = flow.layers.dense({ units: hiddenUnits, activation }).apply(setH);
    //           setY = flow.layers.dense({ units: matrixY[0].length, activation }).apply(setA);
    //         } else if (deepMode === 4) {
    //           setX = flow.input({ shape: [ matrixX[0].length ] });
    //           setW = flow.layers.dense({ units: hiddenUnits, activation }).apply(setX);
    //           setH = flow.layers.dense({ units: hiddenUnits, activation }).apply(setW);
    //           setA = flow.layers.dense({ units: hiddenUnits, activation }).apply(setH);
    //           setB = flow.layers.dense({ units: hiddenUnits, activation }).apply(setA);
    //           setY = flow.layers.dense({ units: matrixY[0].length, activation }).apply(setB);
    //         } else if (deepMode === 5) {
    //           setX = flow.input({ shape: [ matrixX[0].length ] });
    //           setW = flow.layers.dense({ units: hiddenUnits, activation }).apply(setX);
    //           setH = flow.layers.dense({ units: hiddenUnits, activation }).apply(setW);
    //           setA = flow.layers.dense({ units: hiddenUnits, activation }).apply(setH);
    //           setB = flow.layers.dense({ units: hiddenUnits, activation }).apply(setA);
    //           setC = flow.layers.dense({ units: hiddenUnits, activation }).apply(setB);
    //           setY = flow.layers.dense({ units: matrixY[0].length, activation }).apply(setC);
    //         } else {
    //           throw new Error("invalid mode");
    //         }

    //         model = flow.model({ inputs: setX, outputs: setY });
    //         compileParam = { optimizer: flow.train.adam(), loss: flow.losses.meanSquaredError };
    //         model.compile(compileParam);

    //         fitParam = { epochs: unitEpochs };
    //         safeNum = 0;
    //         finalLoss = 500000;
    //         lossArr = (new Array(lossArrConst)).fill(0, 0);
    //         do {
    //           fitResult = await model.fit(tensorX, tensorY, fitParam);
    //           safeNum++;
    //           finalLoss = fitResult.history.loss[fitResult.history.loss.length - 1];
    //           lossArr.push(finalLoss);
    //           lossArr = lossArr.slice(-1 * lossArrConst);
    //           if (lossArr.every((value) => { return value === lossArr[0] })) {
    //             break;
    //           }
    //         } while (fitResult.history.loss[fitResult.history.loss.length - 1] > 1 && safeNum < safeConst)
    //         fitResult = await model.fit(tensorX, tensorY, { epochs: finalEpochs });

    //         if (fitResult.history.loss[fitResult.history.loss.length - 1] > 1) {
    //           throw new Error("mode make fail");
    //         }

    //         await model.save("file://" + process.cwd() + "/temp/myModel");
    //         return model;
    //       } catch (e) {
    //         return null;
    //       }
    //     }
    //     let result;
    //     do {
    //       result = await makeModelFactor(matrixX, matrixY, deepMode, hiddenUnits);
    //     } while (result === null)
    //     return result;
    //   } catch (e) {
    //     console.log(e);
    //     return null;
    //   }
    // }
    // await makeModel(
    //   [ [ 2 ], [ 3 ], [ 4 ], [ 5 ], [ 6 ], [ 7 ], [ 8 ], [ 9 ], [ 10 ], [ 11 ], [ 20 ], [ 30 ], [ 40 ] ],
    //   [ [ 4 ], [ 9 ], [ 16 ], [ 25 ], [ 36 ], [ 49 ], [ 64 ], [ 81 ], [ 100 ], [ 121 ], [ 400 ], [ 900 ], [ 1600 ] ],
    //   3,
    //   200
    // );


    // ai study =====================================================================================================================





    // const sampleValue = "경기 광주시 문형산길157번길 12-7 (신현동, 큐비코) 104동 102호";
    // let res, firstId;
    // let startIndex;
    // let secondTarget;
    // let targetObject;

    // res = await requestSystem("https://hogangnono.com/api/v2/searches", {
    //   query: sampleValue,
    //   x: "127.107468",
    //   y: "37.4975273",
    // }, {
    //   method: "get",
    //   headers: {
    //     "Sec-Ch-Ua": `"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"`,
    //     "Sec-Ch-Ua-Mobile": `?0`,
    //     "Sec-Ch-Ua-Platform": `"macOS"`,
    //     "Sec-Fetch-Dest": `empty`,
    //     "Sec-Fetch-Mode": `cors`,
    //     "Sec-Fetch-Site": `same-origin`,
    //     "User-Agent": `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36`,
    //     "X-Hogangnono-Api-Version": `1.9.11`,
    //     "X-Hogangnono-App-Name": `hogangnono`,
    //     "X-Hogangnono-At": `B-77rONrQGeer_YaBA1iyqDkRtJrqOpxdtiQ`,
    //     "X-Hogangnono-Ct": `1687844642572`,
    //     "X-Hogangnono-Event-Duration": `740576`,
    //     "X-Hogangnono-Event-Log": `acda0c8a03ef4f72cc8bac1a63e907f804ff68fb`,
    //     "X-Hogangnono-Platform": `web`,
    //     "X-Hogangnono-Release-Version": `1.9.11.33`,
    //   }
    // })

    // if (res.data.data.matched.apt.list.length === 0) {
    //   throw new Error("there is no information");
    // }
    // firstId = res.data.data.matched.apt.list[0].id;
    // if (typeof firstId !== "string") {
    //   throw new Error("there is no information 2");
    // }

    // res = await requestSystem("https://hogangnono.com/apt/" + firstId, {}, {
    //   method: "get",
    //   headers: {
    //     "Sec-Ch-Ua": `"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"`,
    //     "Sec-Ch-Ua-Mobile": `?0`,
    //     "Sec-Ch-Ua-Platform": `"macOS"`,
    //     "Sec-Fetch-Dest": `document`,
    //     "Sec-Fetch-Mode": `navigate`,
    //     "Sec-Fetch-Site": `none`,
    //     "Sec-Fetch-Site": `none`,
    //     "Sec-Fetch-User": `?1`,
    //     "Upgrade-Insecure-Requests": `1`,
    //     "User-Agent": `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36`,
    //   }
    // })

    // targetObject = JSON.parse(/<script[^\>]*>(.+AptStore.+)<\/script>/g.exec(res.data)[1].slice(1, -1).replace(/\\"/gi, '"').replace(/\\\\/gi, "\\"));
    // console.log(targetObject.AptStore.detail.portal_id);






    // const abDistance = (arr0, arr1) => {
    //   const [ x0, y0, z0 ] = arr0;
    //   const [ x1, y1, z1 ] = arr1;
    //   const x2 = Math.abs(x0 - x1) * Math.abs(x0 - x1);
    //   const y2 = Math.abs(y0 - y1) * Math.abs(y0 - y1);
    //   const z2 = Math.abs(z0 - z1) * Math.abs(z0 - z1);
    //   let distance;
    //   distance = Math.sqrt(x2 + y2 + z2);
    //   return (Math.round(distance * 100)) / 100;
    // }
    // const a0 = [ 220, 220, 220 ];
    // const a1 = [ 192, 192, 192 ];
    // const a2 = [ 128, 128, 128 ];
    // const a3 = [ 255, 255, 255 ];
    // const a4 = [ 169, 169, 169 ];
    // const distances = [
    //   abDistance(a0, a1),
    //   abDistance(a0, a2),
    //   abDistance(a0, a3),
    //   abDistance(a0, a4),
    //   abDistance(a1, a2),
    //   abDistance(a1, a3),
    //   abDistance(a1, a4),
    //   abDistance(a2, a3),
    //   abDistance(a2, a4),
    //   abDistance(a3, a4),
    // ]
    // console.log(distances);
    // console.log(distances.reduce((acc, curr) => { return acc + curr }, 0) / distances.length);



    // const puppeteer = require("puppeteer");
    // const browser = await puppeteer.launch({ headless: false, args: [ "--no-sandbox", "--disable-setuid-sandbox" ] });
    // const page = await browser.newPage();
    // await page.goto("https://www.hometax.go.kr/websquare/websquare.wq?w2xPath=/ui/comm/a/b/UTXPPABA01.xml&w2xHome=/ui/pp/&w2xDocumentRoot=", { waitUntil: "networkidle2" });
    // await page.evaluate(async function () {
    //   document.getElementById("anchor22").click()
    // });
    // await sleep(10 * 1000);
    // await browser.close();



    // const designers = await back.getDesignersByQuery({ designer: "정다연" }, { selfMongo: this.MONGOC });
    // console.log(designers[0].analytics);
    // console.log(designers[0].analytics.toNormal());


    // const selfMongo = this.MONGOC;
    // const db = "miro81";
    // const collection = "designer";
    // const designers = await selfMongo.db(db).collection(collection).find({}).toArray();
    // let whereQuery, updateQuery;
    // let copiedArr;
    // let one, two, three;

    // for (let designer of designers) {
    //   whereQuery = { desid: designer.desid };
    //   updateQuery = {};

    //   updateQuery["analytics.personality"] = {
    //     operation: 1,
    //     design: 1,
    //     efficient: 1,
    //     communication: 1,
    //     homeliaison: 1,
    //   };

    //   await selfMongo.db(db).collection(collection).updateOne(whereQuery, { $set: updateQuery });
    //   console.log(updateQuery);
    // }




















    /*

    // if cafe24 taxbill again, hacking below
    // cafe24 parsing

    const jsdom = require("jsdom");
    const { JSDOM } = jsdom;
    const queryString = require("querystring");
    const businessNumber = "2218149759";
    let id0, password0;
    let newMail;
    let count;
    let raw;
    let issueId;
    let res;
    let dom;
    let key;
    id0 = "help";
    password0 = "hlofwis83!";
    const client = await human.homeliaisonLogin(id0, password0);
    ({ count } = await client.list());
    [ newMail ] = await human.getMails(id0, password0, [ count - 0 ]);
    raw = Object.keys(queryString.decode(newMail.data.raw.slice(newMail.data.raw.findIndex((str) => { return /\<html\>/gi.test(str) })).join("\n").replace(/\=/gi, "%")))[0].replace(/\%\n/g, "");
    dom = new JSDOM(raw);
    key = dom.window.document.querySelectorAll("table")[1].querySelectorAll("td")[1].textContent;
    client.quit();
    res = await requestSystem("https://etax.cafe24.com/etax/printview/?url=setEmailViewCheck", { view_auth_key: key, biz_no: businessNumber })
    issueId = res.data[0].issue_id;
    res = await requestSystem("https://etax.cafe24.com/etax/printview/?url=detaliView", { issue_id: issueId });
    await fileSystem(`write`, [ `${process.cwd()}/temp/target.html`, res.data ])
    console.log(res.data);

    */



    /*

    const parent = "1XrxI7BRC8S9ZZ96ZtJf1cq5T_2rACjQJ";
    const clients = await back.getClientsByQuery({}, { selfMongo: this.MONGOC });
    const projects = await back.getProjectsByQuery({ "process.contract.first.date": { $gte: new Date(2000, 0, 1) } }, { selfMongo: this.MONGOC });
    const contractClients = await back.getClientsByQuery({ $or: Array.from(new Set(projects.toNormal().map((p) => { return p.cliid }))).map((cliid) => { return { cliid } }) }, { selfMongo: this.MONGOC });
    let matrix0, matrix1;
    let targets;
    let sheetsId;


    matrix0 = [
      [
        "성함",
        "아이디",
        "연락처",
        "문의일",
        "주소",
        "평형",
        "콘솔"
      ]
    ]

    targets = clients.toNormal();
    for (let { cliid, name, phone, requests } of targets) {
      for (let { request } of requests) {
        matrix0.push([
          name,
          cliid,
          phone,
          dateToString(request.timeline, true),
          request.space.address,
          request.space.pyeong,
          "https://" + address.backinfo.host + "/client?cliid=" + cliid,
        ]);
      }
    }

    sheetsId = await sheets.create_newSheets_inPython("전체 고객 주소와 평형", parent);
    await sheets.setting_cleanView_inPython(sheetsId);
    await sheets.update_value_inPython(sheetsId, "", matrix0);

    matrix1 = [
      [
        "성함",
        "아이디",
        "연락처",
        "문의일",
        "주소",
        "평형",
        "콘솔"
      ]
    ]

    targets = contractClients.toNormal();
    for (let { cliid, name, phone, requests } of targets) {
      for (let { request } of requests) {
        matrix1.push([
          name,
          cliid,
          phone,
          dateToString(request.timeline, true),
          request.space.address,
          request.space.pyeong,
          "https://" + address.backinfo.host + "/client?cliid=" + cliid,
        ]);
      }
    }

    sheetsId = await sheets.create_newSheets_inPython("계약 고객 주소와 평형", parent);
    await sheets.setting_cleanView_inPython(sheetsId);
    await sheets.update_value_inPython(sheetsId, "", matrix1);

    console.log(clients.toNormal().length);
    console.log(contractClients.toNormal().length);

    */




    // CRM 2

    /*

    const kakao = new KakaoTalk();

    const selfMongo = this.MONGOC;
    const clients = await back.getClientsByQuery({}, { selfMongo, withTools: true });
    const projects = await back.getProjectsByQuery({}, { selfMongo });
    let from, to, requests;
    let targetCliids;
    let filteredCliid;
    let targetClients;
    let matrix;
    let tempArr;
    let sheetsId;
    let targets;

    requests = [ ...clients.getRequestsTong() ];

    from = new Date(2020, 0, 1);
    to = new Date();
    requests = requests.filter(({ request }) => {
      return request.timeline.valueOf() >= from.valueOf() && request.timeline.valueOf() < to.valueOf()
    })

    targetCliids = requests.map(({ cliid }) => { return cliid });
    filteredCliid = projects.toNormal().filter((p) => { return targetCliids.includes(p.cliid) }).filter((p) => { return p.desid !== "" }).filter((p) => {
      return !/드랍/gi.test(p.process.status) && !/대기/gi.test(p.process.status)
    }).map((p) => { return p.cliid });

    targetClients = clients.toNormal().filter((c) => { return filteredCliid.includes(c.cliid) });

    matrix = [
      [
        "아이디",
        "성함",
        "문의일",
        "계약일",
        "연락처",
        "상태",
        "상태2",
      ]
    ];

    targets = [];

    for (let client of targetClients) {
      if (!/드랍/gi.test(client.requests[0].analytics.response.status)) {
        if (/완료/gi.test(projects.toNormal().find((p) => { return p.cliid === client.cliid && p.desid !== "" }).process?.status ? projects.toNormal().find((p) => { return p.cliid === client.cliid && p.desid !== "" }).process?.status : "")) {
          tempArr = [];
          tempArr.push(client.cliid);
          tempArr.push(client.name);
          tempArr.push(dateToString(client.requests[0].request.timeline, true));
          tempArr.push(dateToString(projects.toNormal().find((p) => { return p.cliid === client.cliid && p.desid !== "" }).process.contract.first.date, true));
          tempArr.push(client.phone);
          tempArr.push(client.requests[0].analytics.response.status);
          tempArr.push(projects.toNormal().find((p) => { return p.cliid === client.cliid && p.desid !== "" }).process.status);
          matrix.push(tempArr);
          // targets.push({
          //   name: client.name,
          //   phone: client.phone,
          // });
        }
      }
    }

    sheetsId = await sheets.create_newSheets_inPython("계약 고객 CRM", "1XrxI7BRC8S9ZZ96ZtJf1cq5T_2rACjQJ");
    await sheets.setting_cleanView_inPython(sheetsId);
    await sheets.update_value_inPython(sheetsId, "", matrix);
    console.log(matrix);


    // console.log(await kakao.friendsTalk([
    //   {
    //     name: "배창규",
    //     phone: "010-2747-3403",
    //   }
    // ], {
    //   title: `23년 5월 가정의 달 프로모션`,
    //   body: `#{name}님, 입주를 준비하는 가족에게\n홈스타일링을 소개해주세요 (방긋)\n\n홈리에종 계약하면\n모두에게 혜택을 드려요! (선물)\n\n- 추천자에게 3만원 백화점 상품권 즉시 발송 (하트)\n- 계약하신 가족(지인)에게는 디자인비 5% 할인 적용 (꽃)\n\n* 이 메시지를 가족(지인)에게 지금 공유해 주세요 :)\n* 상담 시 추천자 성함을 말씀해 주세요.\n* 이 프로모션은 2023년 6월 16일까지 계약 성사 시 유효합니다.`,
    //   image: `${process.cwd()}/temp/target.jpg`,
    //   convert: {
    //     name: (name, phone) => { return name; },
    //   },
    //   button: {
    //     title: "상담 신청하기",
    //     link: "https://home-liaison.com/consulting.php",
    //   }
    // }));

    */










    // const { BetaAnalyticsDataClient } = require("@google-analytics/data");
    // const analyticsDataClient = new BetaAnalyticsDataClient();

    // const analytics = new GoogleAnalytics();

    // await analytics.setCredentials();

    // const res = await analyticsDataClient.runRealtimeReport({
    //   property: analytics.property,
    //   dimensions: [
    //     {
    //       name: "unifiedScreenName",
    //     },
    //   ],
    //   metrics: [
    //     {
    //       name: "activeUsers",
    //     },
    //   ],
    // });

    // for (let row of res[0].rows) {
    //   console.log(row);
    // }









































    /*

    await this.MONGOCONSOLEC.connect();

    const selfLocalMongo = this.MONGOCONSOLEC;
    const selfMongo = this.MONGOC;
    const designers = (await back.getDesignersByQuery({}, { selfMongo })).toNormal().filter((obj) => { return !/해지/gi.test(obj.information.contract.status) });
    const services = [
      "s2011_aa01s",
      "s2011_aa02s",
      "s2011_aa03s",
      "s2011_aa04s",
    ]
    const servicesName = [
      "홈퍼니싱",
      "홈스타일링",
      "토탈 스타일링",
      "엑스트라 스타일링"
    ]
    const pyeongTarget = [
      30,
      31,
      32,
      33
    ];
    let report;
    let matrix;
    let sheetsId;

    matrix = [
      [
        "아이디",
        "디자이너",
        "서비스",
        "평수",
        "가격",
      ]
    ]

    for (let x = 0; x < designers.length; x++) {
      report = await work.designerFeeTable(designers[x].desid, { selfMongo, selfLocalMongo });
      for (let y = 0; y < services.length; y++) {
        for (let z = 0; z < pyeongTarget.length; z++) {
          matrix.push([ designers[x].desid, designers[x].designer, servicesName[y], pyeongTarget[z], report.service[services[y]].example.find((obj) => { return obj.pyeong === pyeongTarget[z] }).price ]);
        }
      }
    }


    sheetsId = "13-NKMFOnxnFE103vrenD8TWJ9mgFy3KA5KEIOM8-tBU";
    // await sheets.setting_cleanView_inPython(sheetsId);
    await sheets.update_value_inPython(sheetsId, "", equalJson(JSON.stringify(matrix)));
    console.log(matrix);

    await this.MONGOCONSOLEC.close();

    */

    // remove google analytics

    // const selfMongo = this.MONGOC;
    // const db = "miro81";
    // const collection = "client";
    // const clients = await selfMongo.db(db).collection(collection).find({}).toArray();
    // let whereQuery, updateQuery;

    // for (let client of clients) {
    //   whereQuery = { cliid: client.cliid };
    //   updateQuery = {};

    //   for (let i = 0; i < client.requests.length; i++) {
    //     updateQuery["requests." + String(i) + ".analytics.googleAnalytics"] = "";
    //   }

    //   await selfMongo.db(db).collection(collection).updateOne(whereQuery, { $unset: updateQuery });
    //   console.log(whereQuery, updateQuery);
    // }





    // open ai 개선

    // dall-e
    // whisper


    // ga4

    // const envConst = "GOOGLE_APPLICATION_CREDENTIALS";
    // const dir = process.cwd() + "/apps/googleAPIs";
    // const tokenDir = dir + "/python/google/tokens";
    // const iamSecrets = tokenDir + "/iam_secrets.json";

    // process.env[envConst] = iamSecrets;

    // const { BetaAnalyticsDataClient } = require('@google-analytics/data');

    // const analyticsDataClient = new BetaAnalyticsDataClient();
    // const propertyId = "227717726";

    // async function runReport() {
    //   const [ response ] = await analyticsDataClient.runReport({
    //     property: `properties/${propertyId}`,
    //     dateRanges: [
    //       {
    //         startDate: '2023-03-06',
    //         endDate: 'today',
    //       },
    //     ],
    //     dimensions: [
    //       {
    //         name: 'streamId',
    //       },
    //     ],
    //     metrics: [
    //       {
    //         name: 'sessions',
    //       },
    //     ],
    //   });
    //   console.log(response.rows.map(({ dimensionValues, metricValues }) => { return dimensionValues }))
    // }

    // await runReport();














    // await this.MONGOCONSOLEC.connect();

    // const selfMongo = this.MONGOC;
    // const db = "miro81";
    // const collection = "client";
    // const clients = await selfMongo.db(db).collection(collection).find({}).toArray();
    // const dailyClients = await this.MONGOCONSOLEC.db(db).collection("dailySales").find({}).toArray();

    // let whereQuery, updateQuery;
    // let thisObject;
    // let flatBase;
    // let priority, possible, target;
    // let possibleArr;
    // let priorityArr;
    // let targetArr;

    // possibleArr = [ "낮음", "높음" ];
    // priorityArr = [
    //   "하",
    //   "중",
    //   "상",
    // ];
    // targetArr = [
    //   "해당 없음",
    //   "애매",
    //   "타겟",
    // ];

    // flatBase = dailyClients.map((obj) => { return obj.cliids }).flat();

    // for (let client of clients) {
    //   whereQuery = { cliid: client.cliid };
    //   updateQuery = {};

    //   thisObject = flatBase.find((o) => { return o.cliid === client.cliid });
    //   if (thisObject === undefined) {
    //     priority = "하";
    //     possible = "낮음";
    //     target = "해당 없음";
    //   } else {
    //     possible = possibleArr[thisObject.possible];
    //     priority = priorityArr[thisObject.priority];
    //     target = targetArr[thisObject.target];
    //   }

    //   for (let i = 0; i < client.requests.length; i++) {
    //     updateQuery["requests." + String(i) + ".analytics.response.priority"] = priority;
    //     updateQuery["requests." + String(i) + ".analytics.response.possible"] = possible;
    //     updateQuery["requests." + String(i) + ".analytics.response.target"] = target;
    //     updateQuery["requests." + String(i) + ".analytics.response.memo"] = "";
    //   }

    //   await selfMongo.db(db).collection(collection).updateOne(whereQuery, { $set: updateQuery });
    //   console.log(whereQuery, updateQuery);
    // }




    // await this.MONGOCONSOLEC.close();








    /*

    // sales update

    await this.MONGOCONSOLEC.connect();

    const selfMongo = this.MONGOCONSOLEC;
    const sheetsId = "1EsYgzt-itSq_hWjYBkSwOgorpOWCjoe9_gmfCtBtlZ4";
    const dateStringParsing = (str) => {
      const [ yearRaw, monthRaw, dateRaw ] = str.split('.');
      const thisDate = new Date(Number(yearRaw.replace(/[^0-9]/gi, '')), Number(monthRaw.replace(/[^0-9]/gi, '')) - 1, Number(dateRaw.replace(/[^0-9]/gi, '')))
      return thisDate;
    }
    const idMaker = (dateObj) => {
      return `sales_${dateToString(dateObj).replace(/\-/gi, '')}`
    }
    const res = await sheets.get_value_inPython(sheetsId, "default!A2:AA");
    const collection = "dailySales";
    let standard;
    let cliid;
    let possible, priority, target;
    let tong;
    let tempObj;
    let thisObj;

    tong = [];

    for (let arr of res) {
      try {
        standard = dateStringParsing(arr[0]);

        if (tong.find((o) => { return o.date.valueOf() === standard.valueOf() }) === undefined) {
          tempObj = {
            id: idMaker(standard),
            date: standard,
            cliids: []
          };
          tong.push(tempObj)
        }

        thisObj = tong.find((o) => { return o.date.valueOf() === standard.valueOf() });

        cliid = arr[4].trim();
        if (/O/gi.test(arr[10])) {
          possible = 1;
        } else {
          possible = 0;
        }

        if (/상/gi.test(arr[11])) {
          priority = 2;
        } else if (/중/gi.test(arr[11])) {
          priority = 1;
        } else {
          priority = 0;
        }

        if (/O/gi.test(arr[12])) {
          target = 2;
        } else if (/애/gi.test(arr[12])) {
          target = 1;
        } else {
          target = 0;
        }

        thisObj.cliids.push({ cliid, possible, priority, target });

      } catch {}

    }

    for (let json of tong) {
      await back.mongoCreate(collection, json, { selfMongo });
    }

    console.log(tong);

    await this.MONGOCONSOLEC.close();

    */
    /*

    // lowLow update

    await this.MONGOCONSOLEC.connect();
    const selfMongo = this.MONGOCONSOLEC;
    const sheetsId = "1EsYgzt-itSq_hWjYBkSwOgorpOWCjoe9_gmfCtBtlZ4";
    const rows = await sheets.get_value_inPython(sheetsId, "default!A2:N");
    const collection = "clientHistory";
    const dateStringParsing = (str) => {
      const [ yearRaw, monthRaw, dateRaw ] = str.split('.');
      const thisDate = new Date(Number(yearRaw.replace(/[^0-9]/gi, '')), Number(monthRaw.replace(/[^0-9]/gi, '')) - 1, Number(dateRaw.replace(/[^0-9]/gi, '')))
      return thisDate;
    }
    const pageName = "lowLowPush";
    let standard;
    let cliid, lowLow;
    let thisHistory;
    let copiedArray;
    let whereQuery, updateQuery;

    for (let arr of rows) {
      try {
        standard = dateStringParsing(arr[0]);
        cliid = arr[4].trim();
        if (/O/gi.test(arr[13])) {
          lowLow = 1;
        } else {
          lowLow = 0;
        }
        if (lowLow === 1) {

          [ thisHistory ] = await back.mongoRead(collection, { cliid }, { selfMongo });
          copiedArray = equalJson(JSON.stringify(thisHistory.curation.analytics.send));

          for (let obj of copiedArray) {
            obj.mode = null
            obj.who.name = null;
            obj.who.email = null;
          }

          if (!copiedArray.some((o) => { return o.page.trim() === pageName })) {
            copiedArray.push({
              page: pageName,
              date: standard,
              mode: null,
              who: {
                name: null,
                email: null,
              }
            });
          }

          copiedArray.sort((a, b) => { return a.date.valueOf() - b.date.valueOf() })

          whereQuery = { cliid };
          updateQuery = {};
          updateQuery["curation.analytics.send"] = copiedArray;

          await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo });
          console.log(whereQuery, updateQuery)

        }
      } catch {}
    }

    await this.MONGOCONSOLEC.close();

    */



















    // await this.MONGOLOGC.connect();
    // const selfMongo = this.MONGOLOGC;
    // const collection = "dailyClients";
    // let rawRows;
    // let clientsTong;
    // let allProjects;
    // let thisClients;
    // let thisClient;
    // let matrix;
    // let targetUser;
    // let sheetsId;
    // let total, nonCount, thisCount;

    // rawRows = await back.mongoRead(collection, {}, { selfMongo });
    // allProjects = await back.getProjectsByQuery({ desid: { $regex: "^d" } }, { selfMongo: this.MONGOC });
    // allProjects = allProjects.toNormal().filter((obj) => {
    //   return obj.process.contract.first.date.valueOf() > (new Date(2000, 0, 1)).valueOf();
    // })
    // thisClients = await back.getClientsByQuery({ $or: allProjects.map((o) => { return { cliid: o.cliid } }) }, { selfMongo: this.MONGOC });

    // clientsTong = [];
    // for (let obj of rawRows) {
    //   for (let i = 0; i < obj.data.detail.length; i++) {
    //     clientsTong.push(obj.data.detail[i])
    //   }
    // }

    // clientsTong = clientsTong.filter((obj) => {
    //   return allProjects.map((o) => { return o.cliid }).includes(obj.cliid);
    // })

    // await fileSystem("writeJson", [ `${process.cwd()}/temp/tong.json`, clientsTong ])


    // matrix = [
    //   [
    //     "아이디",
    //     "성함",
    //     "소스",
    //     "캠패인",
    //   ]
    // ]

    // for (let obj of clientsTong) {
    //   thisClient = thisClients.find((o) => { return o.cliid === obj.cliid });
    //   targetUser = obj.users.find((obj2) => {
    //     if (obj2 === null) {
    //       return false;
    //     } else {
    //       return !/not set/gi.test(obj2.source.campaign);
    //     }
    //   })
    //   if (targetUser === undefined || targetUser === null) {
    //     if (obj.users.length > 0 && obj.users[0] !== null) {
    //       targetUser = obj.users[0];
    //     } else {
    //       targetUser = {
    //         source: {
    //           mother: "(direct)",
    //           campaign: "(not set)"
    //         }
    //       };
    //     }
    //   }

    //   matrix.push([
    //     obj.cliid,
    //     thisClient.name,
    //     (/home-liaison/gi.test(targetUser.source.mother) ? "(direct)" : targetUser.source.mother),
    //     targetUser.source.campaign,
    //   ]);
    // }

    // total = 0;
    // nonCount = 0;
    // thisCount = 0;
    // for (let arr of matrix) {
    //   total++;
    //   if (/not set/gi.test(arr[3])) {
    //     nonCount++;
    //   } else {
    //     thisCount++;
    //   }
    // }

    // matrix.push([
    //   "전체 " + String(total) + "명",
    //   "비광고 " + String(nonCount) + "명",
    //   "광고 " + String(thisCount) + "명",
    //   "광고 비율 " + String(Math.floor((thisCount / total) * 10000) / 100) + '%'
    // ])

    // sheetsId = await sheets.create_newSheets_inPython("계약자 광고 비율", "1XrxI7BRC8S9ZZ96ZtJf1cq5T_2rACjQJ");
    // await sheets.setting_cleanView_inPython(sheetsId);
    // await sheets.update_value_inPython(sheetsId, "", equalJson(JSON.stringify(matrix)));

    // await this.MONGOLOGC.close();







    /*

    await this.MONGOLOGC.connect();

    const selfMongo = this.MONGOLOGC;
    const collection = "complexReport";
    let allRows;
    let matrix;
    let tempArr;
    let num;
    let sheetsId;


    allRows = await back.mongoRead(collection, {}, { selfMongo });



    // age
    matrix = [ [ "날짜" ] ];
    for (let i = 0; i < allRows[0].data.age.length; i++) {
      matrix[0].push(allRows[0].data.age[i].case);
    }
    for (let i = 0; i < allRows[0].data.age.length; i++) {
      matrix[0].push(allRows[0].data.age[i].case);
    }
    for (let { date, data } of allRows) {
      tempArr = [ dateToString(date.from) ];
      for (let i = 0; i < data.age.length; i++) {
        tempArr.push(data.age[i].value);
      }
      for (let i = 0; i < data.age.length; i++) {
        tempArr.push(data.age[i].ratio);
      }
      matrix.push(tempArr);
    }
    sheetsId = await sheets.create_newSheets_inPython("추출_나이", "1XrxI7BRC8S9ZZ96ZtJf1cq5T_2rACjQJ");
    await sheets.setting_cleanView_inPython(sheetsId);
    await sheets.update_value_inPython(sheetsId, "", equalJson(JSON.stringify(matrix)));



    // gender
    matrix = [ [ "날짜" ] ];
    for (let i = 0; i < allRows[0].data.gender.length; i++) {
      matrix[0].push(allRows[0].data.gender[i].case);
    }
    for (let i = 0; i < allRows[0].data.gender.length; i++) {
      matrix[0].push(allRows[0].data.gender[i].case);
    }
    for (let { date, data } of allRows) {
      tempArr = [ dateToString(date.from) ];
      for (let i = 0; i < data.gender.length; i++) {
        tempArr.push(data.gender[i].value);
      }
      for (let i = 0; i < data.gender.length; i++) {
        tempArr.push(data.gender[i].ratio);
      }
      matrix.push(tempArr);
    }
    sheetsId = await sheets.create_newSheets_inPython("추출_성별", "1XrxI7BRC8S9ZZ96ZtJf1cq5T_2rACjQJ");
    await sheets.setting_cleanView_inPython(sheetsId);
    await sheets.update_value_inPython(sheetsId, "", equalJson(JSON.stringify(matrix)));




    // device
    matrix = [ [ "날짜" ] ];
    for (let i = 0; i < allRows[0].data.device.length; i++) {
      matrix[0].push(allRows[0].data.device[i].case);
    }
    for (let i = 0; i < allRows[0].data.device.length; i++) {
      matrix[0].push(allRows[0].data.device[i].case);
    }
    for (let { date, data } of allRows) {
      tempArr = [ dateToString(date.from) ];
      for (let i = 0; i < data.device.length; i++) {
        tempArr.push(data.device[i].value);
      }
      for (let i = 0; i < data.device.length; i++) {
        tempArr.push(data.device[i].ratio);
      }
      matrix.push(tempArr);
    }
    sheetsId = await sheets.create_newSheets_inPython("추출_디바이스", "1XrxI7BRC8S9ZZ96ZtJf1cq5T_2rACjQJ");
    await sheets.setting_cleanView_inPython(sheetsId);
    await sheets.update_value_inPython(sheetsId, "", equalJson(JSON.stringify(matrix)));




    // pyeong
    matrix = [ [ "날짜" ] ];
    for (let i = 0; i < allRows[0].data.pyeong.detail.length; i++) {
      matrix[0].push(allRows[0].data.pyeong.detail[i].case);
    }
    for (let i = 0; i < allRows[0].data.pyeong.detail.length; i++) {
      matrix[0].push(allRows[0].data.pyeong.detail[i].case);
    }
    for (let { date, data } of allRows) {
      tempArr = [ dateToString(date.from) ];
      for (let i = 0; i < data.pyeong.detail.length; i++) {
        tempArr.push(data.pyeong.detail[i].value);
      }
      for (let i = 0; i < data.pyeong.detail.length; i++) {
        tempArr.push(data.pyeong.detail[i].ratio);
      }
      matrix.push(tempArr);
    }
    sheetsId = await sheets.create_newSheets_inPython("추출_평형대", "1XrxI7BRC8S9ZZ96ZtJf1cq5T_2rACjQJ");
    await sheets.setting_cleanView_inPython(sheetsId);
    await sheets.update_value_inPython(sheetsId, "", equalJson(JSON.stringify(matrix)));




    // service
    matrix = [ [ "날짜" ] ];
    for (let i = 0; i < allRows[0].data.service.detail.length; i++) {
      matrix[0].push(allRows[0].data.service.detail[i].case);
    }
    for (let i = 0; i < allRows[0].data.service.detail.length; i++) {
      matrix[0].push(allRows[0].data.service.detail[i].case);
    }
    for (let { date, data } of allRows) {
      tempArr = [ dateToString(date.from) ];
      for (let i = 0; i < data.service.detail.length; i++) {
        tempArr.push(data.service.detail[i].value);
      }
      for (let i = 0; i < data.service.detail.length; i++) {
        tempArr.push(data.service.detail[i].ratio);
      }
      matrix.push(tempArr);
    }
    sheetsId = await sheets.create_newSheets_inPython("추출_서비스", "1XrxI7BRC8S9ZZ96ZtJf1cq5T_2rACjQJ");
    await sheets.setting_cleanView_inPython(sheetsId);
    await sheets.update_value_inPython(sheetsId, "", equalJson(JSON.stringify(matrix)));





    // region
    matrix = [ [ "날짜" ] ];
    for (let i = 0; i < allRows[0].data.region.detail.length; i++) {
      matrix[0].push(allRows[0].data.region.detail[i].case);
    }
    for (let i = 0; i < allRows[0].data.region.detail.length; i++) {
      matrix[0].push(allRows[0].data.region.detail[i].case);
    }
    for (let { date, data } of allRows) {
      tempArr = [ dateToString(date.from) ];
      for (let i = 0; i < data.region.detail.length; i++) {
        tempArr.push(data.region.detail[i].value);
      }
      for (let i = 0; i < data.region.detail.length; i++) {
        tempArr.push(data.region.detail[i].ratio);
      }
      matrix.push(tempArr);
    }
    sheetsId = await sheets.create_newSheets_inPython("추출_지역", "1XrxI7BRC8S9ZZ96ZtJf1cq5T_2rACjQJ");
    await sheets.setting_cleanView_inPython(sheetsId);
    await sheets.update_value_inPython(sheetsId, "", equalJson(JSON.stringify(matrix)));





    // fee
    matrix = [ [ "날짜" ] ];
    for (let i = 0; i < allRows[0].data.fee.detail.length; i++) {
      matrix[0].push(allRows[0].data.fee.detail[i].case);
    }
    for (let i = 0; i < allRows[0].data.fee.detail.length; i++) {
      matrix[0].push(allRows[0].data.fee.detail[i].case);
    }
    for (let { date, data } of allRows) {
      tempArr = [ dateToString(date.from) ];
      for (let i = 0; i < data.fee.detail.length; i++) {
        tempArr.push(data.fee.detail[i].value);
      }
      for (let i = 0; i < data.fee.detail.length; i++) {
        tempArr.push(data.fee.detail[i].ratio);
      }
      matrix.push(tempArr);
    }
    sheetsId = await sheets.create_newSheets_inPython("추출_예산", "1XrxI7BRC8S9ZZ96ZtJf1cq5T_2rACjQJ");
    await sheets.setting_cleanView_inPython(sheetsId);
    await sheets.update_value_inPython(sheetsId, "", equalJson(JSON.stringify(matrix)));






    // family
    matrix = [ [ "날짜" ] ];
    for (let i = 0; i < allRows[0].data.family.detail.length; i++) {
      matrix[0].push(allRows[0].data.family.detail[i].case);
    }
    for (let i = 0; i < allRows[0].data.family.detail.length; i++) {
      matrix[0].push(allRows[0].data.family.detail[i].case);
    }
    for (let { date, data } of allRows) {
      tempArr = [ dateToString(date.from) ];
      for (let i = 0; i < data.family.detail.length; i++) {
        tempArr.push(data.family.detail[i].value);
      }
      for (let i = 0; i < data.family.detail.length; i++) {
        tempArr.push(data.family.detail[i].ratio);
      }
      matrix.push(tempArr);
    }
    sheetsId = await sheets.create_newSheets_inPython("추출_가족구성", "1XrxI7BRC8S9ZZ96ZtJf1cq5T_2rACjQJ");
    await sheets.setting_cleanView_inPython(sheetsId);
    await sheets.update_value_inPython(sheetsId, "", equalJson(JSON.stringify(matrix)));








    // living
    matrix = [ [ "날짜" ] ];
    for (let i = 0; i < allRows[0].data.living.detail.length; i++) {
      matrix[0].push(allRows[0].data.living.detail[i].case);
    }
    for (let i = 0; i < allRows[0].data.living.detail.length; i++) {
      matrix[0].push(allRows[0].data.living.detail[i].case);
    }
    for (let { date, data } of allRows) {
      tempArr = [ dateToString(date.from) ];
      for (let i = 0; i < data.living.detail.length; i++) {
        tempArr.push(data.living.detail[i].value);
      }
      for (let i = 0; i < data.living.detail.length; i++) {
        tempArr.push(data.living.detail[i].ratio);
      }
      matrix.push(tempArr);
    }
    sheetsId = await sheets.create_newSheets_inPython("추출_거주중", "1XrxI7BRC8S9ZZ96ZtJf1cq5T_2rACjQJ");
    await sheets.setting_cleanView_inPython(sheetsId);
    await sheets.update_value_inPython(sheetsId, "", equalJson(JSON.stringify(matrix)));

    // contract
    matrix = [ [ "날짜" ] ];
    for (let i = 0; i < allRows[0].data.contract.detail.length; i++) {
      matrix[0].push(allRows[0].data.contract.detail[i].case);
    }
    for (let i = 0; i < allRows[0].data.contract.detail.length; i++) {
      matrix[0].push(allRows[0].data.contract.detail[i].case);
    }
    for (let { date, data } of allRows) {
      tempArr = [ dateToString(date.from) ];
      for (let i = 0; i < data.contract.detail.length; i++) {
        tempArr.push(data.contract.detail[i].value);
      }
      for (let i = 0; i < data.contract.detail.length; i++) {
        tempArr.push(data.contract.detail[i].ratio);
      }
      matrix.push(tempArr);
    }
    sheetsId = await sheets.create_newSheets_inPython("추출_계약형태", "1XrxI7BRC8S9ZZ96ZtJf1cq5T_2rACjQJ");
    await sheets.setting_cleanView_inPython(sheetsId);
    await sheets.update_value_inPython(sheetsId, "", equalJson(JSON.stringify(matrix)));


    // age: [Array],
    // gender: [Array],
    // type: [Array],
    // source: [Array],
    // device: [Array],
    // sessionSource: [Array],
    // timeSource: [Array],
    // boundSource: [Array],
    // query: [Array],

    // conversion: [Object],
    // pyeong: [Object],
    // service: [Object],
    // region: [Object],
    // fee: [Object],
    // family: [Object],
    // living: [Object],
    // contract: [Object]

    await this.MONGOLOGC.close();


    */






    /*

    // 프로젝트 케어 project care projectCare

    await this.MONGOCONSOLEC.connect();

    const selfMongo = this.MONGOC;
    const selfConsoleMongo = this.MONGOCONSOLEC;
    const sheetsId = "1EsYgzt-itSq_hWjYBkSwOgorpOWCjoe9_gmfCtBtlZ4";

    let designers;
    let designerHistories;
    let todayString;
    let filtered;
    let thisDesigner;
    let allProjects;
    let thisProjects;
    let processLength, stayLength;
    let processArr, stayArr;
    let allClients;
    let requestsTong;
    let allClientHistories;
    let currentCliids;
    let matrix;
    let thisClient;
    let targetArr;

    todayString = dateToString(new Date()).split("-").map((str, index) => { return String(Number(str)) + ([ "년 ", "월 ", "일" ][index]) }).join("");

    allClients = await back.getClientsByQuery({}, { selfMongo, withTools: true });

    requestsTong = allClients.getRequestsTong();
    requestsTong = requestsTong.filter((obj) => { return /응대/gi.test(obj.analytics.response.status) });

    allClientHistories = await back.mongoRead("clientHistory", {}, { selfMongo: selfConsoleMongo });

    currentCliids = requestsTong.map((obj) => { return obj.cliid }).map((cliid) => {
      return [ cliid, allClientHistories.find((o) => { return o.cliid === cliid }).manager ];
    });
    designers = (await back.getDesignersByQuery({}, { selfMongo })).toNormal();
    designerHistories = await back.mongoRead("designerHistory", {}, { selfMongo: selfConsoleMongo });
    allProjects = (await back.getProjectsByQuery({ "process.contract.first.date": { $gte: new Date(2000, 0, 1) } }, { selfMongo })).toNormal();


    matrix = [
      [
        "담당자",
        "고객명",
        "디자이너",
        "진행 서비스",
        "상태",
        "응대",
        "계약금 입금일",
        "현장 미팅일",
        "잔금 입금일",
        "프로젝트 시작일",
        "프로젝트 종료일",
      ]
    ];

    filtered = designerHistories.filter((obj) => { return /이큰별/gi.test(obj.manager) });
    processLength = 0;
    stayLength = 0;
    for (let { desid } of filtered) {
      thisDesigner = designers.find((d) => { return d.desid === desid });
      thisProjects = allProjects.filter((p) => { return p.desid === desid });
      processLength += thisProjects.filter((p) => { return /진행/gi.test(p.process.status) }).length;
      stayLength += thisProjects.filter((p) => { return /대기/gi.test(p.process.status) }).length;
    }

    for (let { desid } of filtered) {
      thisDesigner = designers.find((d) => { return d.desid === desid });
      thisProjects = allProjects.filter((p) => { return p.desid === desid });

      processArr = thisProjects.filter((p) => { return /진행/gi.test(p.process.status) });
      stayArr = thisProjects.filter((p) => { return /대기/gi.test(p.process.status) });
      targetArr = stayArr.concat(processArr);

      for (let project of targetArr) {
        thisClient = allClients.toNormal().find((c) => { return c.cliid === project.cliid });
        matrix.push([
          "이큰별",
          thisClient.name,
          thisDesigner.designer,
          serviceParsing(project.service),
          project.process.status,
          project.process.action,
          dateToString(project.process.contract.first.date),
          dateToString(project.process.contract.meeting.date),
          dateToString(project.process.contract.remain.date),
          dateToString(project.process.contract.form.date.from),
          dateToString(project.process.contract.form.date.to),
        ]);
      }
    }


    filtered = designerHistories.filter((obj) => { return /임지민/gi.test(obj.manager) });
    processLength = 0;
    stayLength = 0;
    for (let { desid } of filtered) {
      thisDesigner = designers.find((d) => { return d.desid === desid });
      thisProjects = allProjects.filter((p) => { return p.desid === desid });
      processLength += thisProjects.filter((p) => { return /진행/gi.test(p.process.status) }).length;
      stayLength += thisProjects.filter((p) => { return /대기/gi.test(p.process.status) }).length;
    }


    for (let { desid } of filtered) {
      thisDesigner = designers.find((d) => { return d.desid === desid });
      thisProjects = allProjects.filter((p) => { return p.desid === desid });

      processArr = thisProjects.filter((p) => { return /진행/gi.test(p.process.status) });
      stayArr = thisProjects.filter((p) => { return /대기/gi.test(p.process.status) });
      targetArr = stayArr.concat(processArr);

      for (let project of targetArr) {
        thisClient = allClients.toNormal().find((c) => { return c.cliid === project.cliid });
        matrix.push([
          "임지민",
          thisClient.name,
          thisDesigner.designer,
          serviceParsing(project.service),
          project.process.status,
          project.process.action,
          dateToString(project.process.contract.first.date),
          dateToString(project.process.contract.meeting.date),
          dateToString(project.process.contract.remain.date),
          dateToString(project.process.contract.form.date.from),
          dateToString(project.process.contract.form.date.to),
        ]);
      }
    }

    await sheets.update_value_inPython(sheetsId, "project", matrix);

    console.log(matrix);

    await this.MONGOCONSOLEC.close();

    */
















    /*

    const trelloToJson = async () => {
      try {
        const token = "ATTA4e194cc66c57d591c43d02a5f328a0308ca57da46ad3e18326a690041fe1668fB8A61188";
        const key = "a8f3f39ea9739b982faa14b0324f3777";
        const boardId = "63c5f6e79ceb1d015ab198a0";
        const baseUrl = "https://api.trello.com";
        const urlMaker = (path) => { return `${baseUrl}/${path}` }
        let res;
        let listRaw;
        let targetList;
        let cardsRaw;
        let listDic;
        let listDicKeys, listRefined;

        res = await requestSystem(urlMaker(`1/boards/${boardId}/lists`), { token, key }, { method: "get" });
        listRaw = res.data;
        targetList = listRaw.filter((obj) => { return /^PD/.test(obj.name) });

        res = await requestSystem(urlMaker(`1/boards/${boardId}/cards`), { token, key }, { method: "get" });
        cardsRaw = res.data.filter((obj) => { return targetList.map((o) => { return o.id }).includes(obj.idList) });


        listDic = {};
        for (let { id, name, close } of targetList) {
          if (!close) {
            listDic[id] = { name, cards: [] };
          }
        }
        for (let obj of cardsRaw) {
          listDic[obj.idList].cards.push(equalJson(JSON.stringify(obj)));
        }

        listDicKeys = Object.keys(listDic);
        listRefined = [];
        for (let key of listDicKeys) {
          listDic[key].id = key;
          listRefined.push(listDic[key]);
        }

        for (let obj of listRefined) {

          obj.key = obj.name;
          obj.name = "";
          obj.goal = "";
          obj.childrenRaw = [];

          for (let card of obj.cards) {
            if (card.labels.length === 0) {
              obj.goal = card.name;
            } else if (card.labels.length === 1 && card.labels[0].name === "제목") {
              obj.name = card.name;
            } else {
              obj.childrenRaw.push(equalJson(JSON.stringify(card)));
            }
          }
          delete obj.cards;

          obj.children = [];
          for (let rawObj of obj.childrenRaw) {
            res = await requestSystem(urlMaker(`1/checklists/${rawObj.idChecklists[0]}`), { token, key }, { method: "get" });
            res.data.checkItems.sort((a, b) => { return a.pos - b.pos });

            obj.children.push({
              id: rawObj.id,
              name: rawObj.name,
              status: rawObj.labels.filter((o) => { return [ "대기", "진행중", "완료" ].includes(o.name) })[0].name,
              class: rawObj.labels.filter((o) => { return ![ "대기", "진행중", "완료" ].includes(o.name) })[0].name,
              description: rawObj.desc.replace(/\n/g, ' ').trim(),
              until: rawObj.due,
              children: res.data.checkItems.map((o) => {
                return {
                  name: o.name,
                  status: o.state === "complete" ? "완료" : "대기"
                }
              }),
            });
          }
          delete obj.childrenRaw;
        }

        return listRefined;

      } catch (e) {
        console.log(e);
      }
    }

    const sheetsId = "1Q_epCyVE0JukFomRKgMGUvuTN44-v3rGAp2wXuc09cY";
    const trelloJson = await trelloToJson();
    let matrix;

    trelloJson.sort((a, b) => {
      return Number(a.key.replace(/[^0-9]/gi, '')) - Number(b.key.replace(/[^0-9]/gi, ''));
    });


    matrix = [
      [
        "대분류",
        "목표",
        "계획명",
        "중분류",
        "상태",
        "설명",
        "목표일",
        "세부 사항",
        "세부 상태",
      ]
    ]

    for (let obj of trelloJson) {
      for (let obj2 of obj.children) {
        for (let obj3 of obj2.children) {
          matrix.push([
            obj.name.replace(/개발/gi, '').trim(),
            obj.goal,
            obj2.name,
            obj2.class,
            obj2.status,
            obj2.description,
            dateToString(obj2.until),
            obj3.name,
            obj3.status,
          ]);
        }
      }
    }

    await sheets.update_value_inPython(sheetsId, "dev2023", matrix, [ 0, 0 ])

    */










    /*


    await this.MONGOPYTHONC.connect();
    await this.MONGOCONSOLEC.connect();

    const emptyDate = new Date(1800, 0, 1);
    const emptyDateValue = (new Date(2000, 0, 1)).valueOf();
    const collection = "generalBill";
    const selfMongo = this.MONGOC;
    const selfConsoleMongo = this.MONGOCONSOLEC;
    const selfPythonMongo = this.MONGOPYTHONC;
    const motherSheetsFolderId = "1XrxI7BRC8S9ZZ96ZtJf1cq5T_2rACjQJ";
    let projects, projectsRaw;
    let clients, designers;
    let bills;
    let proid, cliid, desid, service;
    let thisClient;
    let thisDesigner;
    let thisBill;
    let matrix;
    let thisRequest, thisResponse;
    let currentState;
    let confirmState;
    let requestName, responseName;
    let payDate, cancelAmount, cancelDate;
    let requestValueArr;
    let responseValueArr;
    let payAmount, nonPayAmount;
    let refundAmount;
    let requestLength, responseLength;
    let requestArr, responseArr;
    let sheetsId;
    let payMethod;
    let doneTong, willTong;
    let requestNumber;
    let timeline;
    let cliidTong;
    let tempObj;
    let cliidTongRefined;
    let entireClients;
    let entireClientsTong, entireClientsMatrix;
    let foundProject, foundClient;
    let requestSumConsumer;
    let requestSumConfirm;
    let requestSumRefund;
    let requestSumIncome;
    let responseSumTotal;
    let responseSumNon;
    let responseSumPaid;
    let responseSumRefund;
    let cStatus, pStatus, foundService;
    let payRealAmount;
    let blockWill;
    let copiedObject;
    let thisRequestNumber;
    let thisTimeline;
    let totalTong;
    let proidTong;
    let thisArray;
    let thisObject;
    let thisRequestObject;
    let thisContractDate;
    let reduceFunction;
    let allClients;
    let requestsTong;
    let projectHistory, projectHistories;

    projectsRaw = await back.getProjectsByQuery({}, { selfMongo });
    projectsRawNormal = projectsRaw.toNormal();
    allClients = await back.getClientsByQuery({}, { selfMongo, withTools: true });
    requestsTong = allClients.getRequestsTong();
    entireClients = allClients.toNormal();
    projects = projectsRaw.toNormal().filter((obj) => {  return obj.process.contract.first.date.valueOf() >= emptyDateValue });

    clients = (await back.getClientsByQuery({ $or: Array.from(new Set(projects.map((p) => { return p.cliid }))).map((cliid) => { return { cliid } }) }, { selfMongo })).toNormal();
    designers = (await back.getDesignersByQuery({ $or: Array.from(new Set(projects.map((p) => { return p.desid }))).map((desid) => { return { desid } }) }, { selfMongo })).toNormal();

    bills = await back.mongoRead(collection, {}, { selfMongo: selfPythonMongo });

    projectHistories = await back.mongoRead("projectHistory", {}, { selfMongo: selfConsoleMongo });

    doneTong = [];
    willTong = [];
    totalTong = [];

    for (let project of projects) {
      ({ proid, cliid, desid, service } = project);

      thisClient = clients.find((obj) => { return obj.cliid === cliid });
      thisDesigner = designers.find((obj) => { return obj.desid === desid });
      thisBill = bills.find((obj) => {
        return ((obj.links.proid === proid) && (obj.links.method === (service.online ? "online" : "offline")))
      });
      projectHistory = projectHistories.find((obj) => { return obj.proid === proid });

      project.client = thisClient;
      project.designer = thisDesigner;
      project.bill = thisBill;
      project.name = thisClient.name;
      project.phone = thisClient.phone;
      project.manager = projectHistory.manager;
    }

    projects = projects.filter((obj) => {
      return obj.proid !== "p1801_aa01s" && obj.proid !== "p1801_aa02s";
    });

    await this.MONGOPYTHONC.close();
    await this.MONGOCONSOLEC.close();

    matrix = [ [
      "아이디",
      "고객",
      "디자이너",
      "종류",
      "구분",
      "확정가",
      "입금일",
      "입금액",
      "미입금액",
      "방법",
      "문의일",
      "서비스 유형",
      "상태",
      "담당자",
    ] ];

    for (let project of projects) {

      requestNumber = 0;
      for (let i = 0; i < project.client.requests.length; i++) {
        if (project.client.requests[i].request.timeline.valueOf() <= project.proposal.date.valueOf()) {
          requestNumber = i;
          break;
        }
      }
      timeline = project.client.requests[requestNumber].request.timeline;

      requestSumConsumer = 0;
      requestSumConfirm = 0;
      requestSumRefund = 0;
      requestSumIncome = 0;
      requestArr = [];
      for (let z = 0; z < project.bill.requests.length; z++) {
        thisRequest = project.bill.requests[z];

        requestName = thisRequest.name;
        confirmState = Math.floor(thisRequest.items.reduce((acc, curr) => { return acc + curr.amount.consumer }, 0));

        if (requestName === "홈리에종 잔금") {
          currentState = 1 - project.process.contract.remain.calculation.discount;
          currentState = Math.floor(project.process.contract.remain.calculation.amount.consumer / currentState);
          currentState = Math.floor(currentState - project.process.contract.first.calculation.amount);
        } else {
          currentState = Math.floor(thisRequest.items.reduce((acc, curr) => { return acc + curr.amount.consumer }, 0));
        }

        if (/^드/gi.test(project.process.status)) {
          if (thisRequest.pay.length === 0) {
            confirmState = 0;
          }
        }

        payDate = '-';
        payMethod = '-';
        payRealAmount = 0;
        if (thisRequest.pay.length > 0) {
          payDate = dateToString(thisRequest.pay[0].date);
          payMethod = thisRequest.proofs[0].method;
          if (payMethod.trim() === "계좌" || payMethod.trim() === "계좌" || payMethod.trim() === "게좌" ||  payMethod.trim() === "계좌입금" ||  /현금영수증/gi.test(payMethod.trim()) || payMethod.trim() === "계좌이체" || payMethod.trim() === "-" || payMethod.trim() === "" || payMethod.trim() === "증빙") {
            payMethod = "계좌 이체";
          }
          payRealAmount = thisRequest.pay.reduce((acc, curr) => { return acc + curr.amount }, 0);
        }

        cancelAmount = 0;
        cancelDate = '-';

        if (thisRequest.cancel.length > 0) {
          cancelAmount = thisRequest.cancel.reduce((acc, curr) => { return acc + curr.amount }, 0);
          cancelDate = dateToString(thisRequest.cancel[0].date);
        }

        requestSumConsumer += currentState;
        requestSumConfirm += confirmState;
        requestSumRefund += cancelAmount;
        if (payDate !== '-') {
          requestSumIncome += confirmState;
        }

        requestValueArr = [
          {
            value: requestName,
          },
          {
            value: payRealAmount,
          },
          {
            value: confirmState,
          },
          {
            value: payDate,
          },
          {
            value: cancelAmount,
          },
          {
            value: cancelDate,
          },
          {
            value: payMethod
          },
        ];

        requestArr.push(requestValueArr.map((obj) => { return obj.value }));
      }
      requestLength = requestArr.length;

      // response

      responseSumTotal = 0;
      responseSumNon = 0;
      responseSumPaid = 0;
      responseSumRefund = 0;
      responseArr = [];
      for (let z = 0; z < project.bill.responses.length; z++) {
        thisResponse = project.bill.responses[z];

        responseName = thisResponse.name;

        confirmState = Math.floor(thisResponse.items.reduce((acc, curr) => { return acc + curr.amount.pure }, 0));
        payAmount = Math.floor(thisResponse.pay.reduce((acc, curr) => { return acc + curr.amount }, 0));
        refundAmount = Math.floor(thisResponse.cancel.reduce((acc, curr) => { return acc + curr.amount }, 0));
        nonPayAmount = confirmState - payAmount;
        payDate = '-';
        if (thisResponse.pay.length > 0) {
          payDate = dateToString(thisResponse.pay[0].date);
        }

        responseSumTotal += confirmState;
        responseSumNon += nonPayAmount;
        responseSumPaid += payAmount;
        responseSumRefund += refundAmount;

        responseValueArr = [
          {
            value: responseName,
          },
          {
            value: confirmState,
          },
          {
            value: nonPayAmount,
          },
          {
            value: payAmount,
          },
          {
            value: payDate,
          },
          {
            value: refundAmount,
          },
        ];

        responseArr.push(responseValueArr.map((obj) => { return obj.value }));
      }
      responseLength = responseArr.length;

      for (let i = 0; i < requestLength; i++) {
        matrix.push([
          project.proid,
          project.name,
          project.designer.designer,
          /시공/gi.test(requestArr[i][0]) ? "시공" : "디자인",
          requestArr[i][0],
          requestArr[i][2],
          requestArr[i][3],
          requestArr[i][3] === '-' ? 0 : requestArr[i][1],
          requestArr[i][3] === '-' ? requestArr[i][2] : 0,
          requestArr[i][6].replace(/ 취소/gi, ''),
          dateToString(timeline),
          serviceParsing(project.service),
          project.process.status,
          project.manager,
        ]);
        totalTong.push({
          proid: project.proid,
          cliid: project.cliid,
          desid: project.desid,
          bilid: project.bill.bilid,
          name: project.name,
          designer: project.designer.designer,
          kind: requestArr[i][0],
          class: /시공/gi.test(requestArr[i][0]) ? "construct" : "design",
          standard: requestArr[i][2],
          date: requestArr[i][3].trim() === '-' ? emptyDate : stringToDate(requestArr[i][3]),
          amount: requestArr[i][3].trim() === '-' ? requestArr[i][2] : requestArr[i][1],
          method: requestArr[i][6].replace(/ 취소/gi, ''),
          type: "in",
          category: requestArr[i][3].trim() === '-' ? "will" : "done",
          timeline,
          service: project.service,
          status: project.process.status,
          requestNumber,
        });

        if (requestArr[i][4] !== 0) {
          matrix.push([
            project.proid,
            project.name,
            project.designer.designer,
            /시공/gi.test(requestArr[i][0]) ? "시공" : "디자인",
            requestArr[i][0],
            requestArr[i][4],
            requestArr[i][5],
            requestArr[i][5] === '-' ? 0 : (requestArr[i][4] * -1),
            requestArr[i][5] === '-' ? (requestArr[i][4] * -1) : 0,
            requestArr[i][6],
            dateToString(timeline),
            serviceParsing(project.service),
            project.process.status,
            project.manager,
          ]);
          totalTong.push({
            proid: project.proid,
            cliid: project.cliid,
            desid: project.desid,
            bilid: project.bill.bilid,
            name: project.name,
            designer: project.designer.designer,
            kind: requestArr[i][0],
            class: /시공/gi.test(requestArr[i][0]) ? "construct" : "design",
            standard: requestArr[i][4],
            date: requestArr[i][5].trim() === '-' ? emptyDate : stringToDate(requestArr[i][5]),
            amount: requestArr[i][4] * -1,
            method: requestArr[i][6],
            type: "out",
            category: requestArr[i][5].trim() === '-' ? "will" : "done",
            timeline,
            service: project.service,
            status: project.process.status,
            requestNumber,
          });

        }
      }

      for (let i = 0; i < responseLength; i++) {
        matrix.push([
          project.proid,
          project.name,
          project.designer.designer,
          /시공/gi.test(responseArr[i][0]) ? "시공" : "디자인",
          responseArr[i][0],
          responseArr[i][1],
          responseArr[i][4],
          responseArr[i][3] * -1,
          responseArr[i][2] * -1,
          responseArr[i][3] !== 0 ? "계좌 이체" : "-",
          dateToString(timeline),
          serviceParsing(project.service),
          project.process.status,
          project.manager,
        ]);
        totalTong.push({
          proid: project.proid,
          cliid: project.cliid,
          desid: project.desid,
          bilid: project.bill.bilid,
          name: project.name,
          designer: project.designer.designer,
          kind: responseArr[i][0],
          class: /시공/gi.test(responseArr[i][0]) ? "construct" : "design",
          standard: responseArr[i][1],
          date: responseArr[i][4].trim() === '-' ? emptyDate : stringToDate(responseArr[i][4]),
          amount: responseArr[i][4].trim() === '-' ? responseArr[i][2] * -1 : responseArr[i][3] * -1,
          method: responseArr[i][4].trim() === '-' ? "-" : "계좌 이체",
          type: "out",
          category: responseArr[i][4].trim() === '-' ? "will" : "done",
          timeline,
          service: project.service,
          status: project.process.status,
          requestNumber,
        });

      }
    }


    proidTong = {};
    for (let obj of totalTong) {
      if (!Array.isArray(proidTong[obj.proid])) {
        proidTong[obj.proid] = [];
      }
      proidTong[obj.proid].push(equalJson(JSON.stringify(obj)));

    }

    proidMatrix = [];
    for (let proid in proidTong) {
      thisArray = proidTong[proid];
      [ thisObject ] = thisArray;
      thisRequestNumber = thisObject.requestNumber;
      thisTimeline = thisObject.timeline;

      foundClient = entireClients.find((client) => { return client.cliid === thisObject.cliid });
      foundProject = projectsRawNormal.find((project) => { return project.proid === proid });

      thisRequestObject = foundClient.requests[thisRequestNumber];
      thisContractDate = foundProject.process.contract.first.date;

      reduceFunction = (acc, curr) => {
        return acc + curr.amount;
      }

      proidMatrix.push([
        thisObject.name,
        thisObject.cliid,
        proid,
        thisRequestObject.analytics.response.status,
        foundProject.process.status,
        serviceParsing(foundProject.service),
        dateToString(thisTimeline, true),
        thisTimeline.getFullYear(),
        thisTimeline.getMonth() + 1,
        thisTimeline.getDate(),
        dateToString(thisContractDate, true),
        thisContractDate.getFullYear(),
        thisContractDate.getMonth() + 1,
        thisContractDate.getDate(),
        thisArray.filter((obj) => { return obj.type === "in" && obj.category === "done" }).reduce(reduceFunction, 0),
        thisArray.filter((obj) => { return obj.type === "in" && obj.category === "done" && obj.class === "design" }).reduce(reduceFunction, 0),
        thisArray.filter((obj) => { return obj.type === "in" && obj.category === "done" && obj.class === "construct" }).reduce(reduceFunction, 0),
        thisArray.filter((obj) => { return obj.type === "out" && obj.category === "done" }).reduce(reduceFunction, 0),
        thisArray.filter((obj) => { return obj.type === "out" && obj.category === "done" && obj.class === "design" }).reduce(reduceFunction, 0),
        thisArray.filter((obj) => { return obj.type === "out" && obj.category === "done" && obj.class === "construct" }).reduce(reduceFunction, 0),
        thisArray.filter((obj) => { return obj.type === "in" && obj.category === "will" }).reduce(reduceFunction, 0),
        thisArray.filter((obj) => { return obj.type === "in" && obj.category === "will" && obj.class === "design" }).reduce(reduceFunction, 0),
        thisArray.filter((obj) => { return obj.type === "in" && obj.category === "will" && obj.class === "construct" }).reduce(reduceFunction, 0),
        thisArray.filter((obj) => { return obj.type === "out" && obj.category === "will" }).reduce(reduceFunction, 0),
        thisArray.filter((obj) => { return obj.type === "out" && obj.category === "will" && obj.class === "design" }).reduce(reduceFunction, 0),
        thisArray.filter((obj) => { return obj.type === "out" && obj.category === "will" && obj.class === "construct" }).reduce(reduceFunction, 0),
      ]);

    }


    for (let rawProject of projectsRawNormal) {

      if (proidMatrix.find((arr) => { return arr[2] === rawProject.proid; }) === undefined) {

        foundClient = entireClients.find((client) => { return client.cliid === rawProject.cliid });

        thisRequestNumber = 0;
        for (let i = 0; i < foundClient.requests.length; i++) {
          if (foundClient.requests[i].request.timeline.valueOf() <= rawProject.proposal.date.valueOf()) {
            thisRequestNumber = i;
            break;
          }
        }

        thisRequestObject = foundClient.requests[thisRequestNumber];
        thisTimeline = thisRequestObject.request.timeline;

        proidMatrix.push([
          foundClient.name,
          foundClient.cliid,
          rawProject.proid,
          thisRequestObject.analytics.response.status,
          rawProject.process.status,
          serviceParsing(rawProject.service),
          dateToString(thisTimeline, true),
          thisTimeline.getFullYear(),
          thisTimeline.getMonth() + 1,
          thisTimeline.getDate(),
          "1800-01-01 00:00:00",
          1800,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
        ]);

      }

    }

    for (let obj of requestsTong) {
      if (proidMatrix.find((arr) => { return arr[1] === obj.cliid; }) === undefined) {

        thisTimeline = obj.request.timeline;

        proidMatrix.push([
          obj.name,
          obj.cliid,
          '-',
          obj.analytics.response.status,
          '-',
          '-',
          dateToString(thisTimeline, true),
          thisTimeline.getFullYear(),
          thisTimeline.getMonth() + 1,
          thisTimeline.getDate(),
          "1800-01-01 00:00:00",
          1800,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
        ]);


      }
    }

    proidMatrix.sort((a, b) => {
      return stringToDate(b[6]).valueOf() - stringToDate(a[6]).valueOf()
    })

    proidMatrix.unshift([
      "고객",
      "c아이디",
      "p아이디",
      "c상태",
      "p상태",
      "서비스",
      "문의 날짜",
      "문의 년",
      "문의 월",
      "문의 일",
      "계약 날짜",
      "계약 년",
      "계약 월",
      "계약 일",
      "총 받은 돈",
      "디자인 받은 돈",
      "시공 받은 돈",
      "총 준 돈",
      "디자인 준 돈",
      "시공 준 돈",
      "총 받을 돈",
      "디자인 받을 돈",
      "시공 받을 돈",
      "총 줄 돈",
      "디자인 줄 돈",
      "시공 줄 돈",
    ])

    await sheets.update_value_inPython("1QeYg0ISXIxaXu8FagC_FLOcl7c2aJPiqyfsVxstCzO0", "", matrix);
    await sheets.update_value_inPython("1tt11onR8REeZ0-kFHuymwlMrMW5fC9Jh4w_U051ETKM", "", proidMatrix);


    */






















    // CRM

    /*

    const selfMongo = this.MONGOC;
    const clients = await back.getClientsByQuery({}, { selfMongo, withTools: true });
    const requests = [ ...clients.getRequestsTong() ];
    let longTimes;
    let dropRequests;
    let from, to;
    let matrix;
    let tempArr;
    let sheetsId;

    longTimes = requests.filter(({ analytics }) => {
      return /장기/gi.test(analytics.response.status)
    })

    dropRequests = requests.filter(({ analytics }) => {
      return /드[랍롭]/gi.test(analytics.response.status)
    })

    // long

    from = new Date(2023, 0, 1);
    to = new Date();
    longTimes = longTimes.filter(({ request }) => {
      return request.timeline.valueOf() >= from.valueOf() && request.timeline.valueOf() < to.valueOf()
    })

    matrix = [
      [
        "아이디",
        "성함",
        "문의일",
        "연락처",
        "상태"
      ]
    ];

    for (let { request, analytics, cliid, name, phone } of longTimes) {
      tempArr = [];

      tempArr.push(cliid);
      tempArr.push(name);
      tempArr.push(dateToString(request.timeline, true));
      tempArr.push(phone);
      tempArr.push(analytics.response.status.value);

      matrix.push(tempArr);
    }

    sheetsId = await sheets.create_newSheets_inPython("장기 고객 CRM", "1XrxI7BRC8S9ZZ96ZtJf1cq5T_2rACjQJ");
    await sheets.setting_cleanView_inPython(sheetsId);
    await sheets.update_value_inPython(sheetsId, "", matrix);
    console.log(matrix);


    // drop

    from = new Date(2023, 0, 1);
    to = new Date();
    dropRequests = dropRequests.filter(({ request }) => {
      return request.timeline.valueOf() >= from.valueOf() && request.timeline.valueOf() < to.valueOf()
    })

    matrix = [
      [
        "아이디",
        "성함",
        "문의일",
        "연락처",
        "상태",
        "유출 이유",
      ]
    ];

    for (let { request, analytics, cliid, name, phone } of dropRequests) {
      tempArr = [];

      tempArr.push(cliid);
      tempArr.push(name);
      tempArr.push(dateToString(request.timeline, true));
      tempArr.push(phone);
      tempArr.push(analytics.response.status.value);
      tempArr.push(analytics.response.outreason.values.join(", "));

      matrix.push(tempArr);
    }

    sheetsId = await sheets.create_newSheets_inPython("드랍 고객 CRM", "1XrxI7BRC8S9ZZ96ZtJf1cq5T_2rACjQJ");
    await sheets.setting_cleanView_inPython(sheetsId);
    await sheets.update_value_inPython(sheetsId, "", matrix);
    console.log(matrix);


    */








    /*

    // designer checklist

    const selfMongo = this.MONGOC;
    const designers = await back.getDesignersByQuery({}, { selfMongo });
    const projects = await back.getProjectsByQuery({}, { selfMongo });
    const now = new Date();
    const past = new Date(2019, 0, 1);
    const calcMonthDelta = (from, to) => {
      return ((to.getFullYear() * 12) + to.getMonth() + 1) - ((from.getFullYear() * 12) + from.getMonth() + 1) + 1;
    }
    let matrix;
    let tempArr;
    let yearDelta, monthDelta;
    let tempDate;
    let tempString;
    let timeDelta;
    let year, month;
    let filteredProjectsProposal, filteredProjectsContract;
    let filteredFilteredProjectsProposal, filteredFilteredProjectsContract;
    let from, to;
    let thisYear, thisMonth;
    let thisDate;
    let sheetsId;

    yearDelta = now.getFullYear() - past.getFullYear() + 1
    monthDelta = calcMonthDelta(past, now);

    matrix = [
      [
        "아이디",
        "이름",
        "계약 상태",
        "계약일",
        "계약 유지",
        "적용 경력",
        "주소",
        "유효 범위",
        "한계 범위",
        "홈퍼니싱 일반",
        "홈스타일링 일반",
        "토탈 스타일링 일반",
        "설계 변경 일반",
        "프리미엄 여부",
        "부분 여부",
        "온라인 여부",
        "거주중 여부",
        "총 추천수",
        "총 진행수",
        "진행율",
        "총 정산액",
      ]
    ];

    for (let i = 0; i < yearDelta; i++) {
      matrix[0].push(String(now.getFullYear() - i) + " " + "추천수");
      matrix[0].push(String(now.getFullYear() - i) + " " + "진행수");
      matrix[0].push(String(now.getFullYear() - i) + " " + "진행율");
      matrix[0].push(String(now.getFullYear() - i) + " " + "총 정산액");
    }

    for (let i = 0; i < monthDelta; i++) {
      tempDate = new Date();
      tempDate.setMonth(tempDate.getMonth() - i);
      tempString = String(tempDate.getFullYear()).slice(2) + "년 " + String(tempDate.getMonth() + 1) + "월";
      matrix[0].push(tempString + " " + "추천수");
    }

    for (let designer of designers) {
      tempArr = [];

      tempArr.push(designer.desid);
      tempArr.push(designer.designer);
      tempArr.push(designer.information.contract.status.value);
      tempArr.push(dateToString(designer.information.contract.date));

      timeDelta = calcMonthDelta(designer.information.contract.date, new Date());
      tempArr.push(String(timeDelta) + "개월");

      [ year, month ] = designerCareer(designer.toNormal());
      tempArr.push(`${String(year)}년 ${String(month)}개월`);

      tempArr.push(designer.toNormal().information.address.length > 0 ? designer.toNormal().information.address[0] : "");

      tempArr.push(String(designer.toNormal().analytics.region.range) + "km");
      tempArr.push(String(designer.toNormal().analytics.region.expenses) + "km");

      tempArr.push(designer.toNormal().analytics.project.matrix[0][1] === 1 ? "가능" : "불가능");
      tempArr.push(designer.toNormal().analytics.project.matrix[1][1] === 1 ? "가능" : "불가능");
      tempArr.push(designer.toNormal().analytics.project.matrix[2][1] === 1 ? "가능" : "불가능");
      tempArr.push(designer.toNormal().analytics.project.matrix[3][1] === 1 ? "가능" : "불가능");

      tempArr.push(designer.toNormal().analytics.project.matrix.some((arr) => { return arr[2] === 1 }) ? "가능" : "불가능");
      tempArr.push(designer.toNormal().analytics.project.matrix.some((arr) => { return arr[0] === 1 }) ? "가능" : "불가능");

      tempArr.push(designer.toNormal().analytics.project.online ? "가능" : "불가능");
      tempArr.push(designer.toNormal().analytics.project.living ? "가능" : "불가능");

      filteredProjectsProposal = projects.toNormal().filter((p) => {
        return p.proposal.detail.some((obj) => {
          return obj.desid === designer.desid
        });
      });

      filteredProjectsContract = projects.toNormal().filter((p) => {
        return p.desid === designer.desid;
      });

      tempArr.push(filteredProjectsProposal.length);
      tempArr.push(filteredProjectsContract.length);
      tempArr.push(filteredProjectsProposal.length === 0 ? 0 : (filteredProjectsContract.length / filteredProjectsProposal.length));
      tempArr.push(Math.floor(filteredProjectsContract.reduce((acc, curr) => {
        return acc + curr.process.calculation.payments.totalAmount;
      }, 0)));


      for (let i = 0; i < yearDelta; i++) {

        thisYear = (new Date()).getFullYear() - i;
        from = new Date(thisYear, 0, 1);
        to = new Date(thisYear + 1, 0, 1);

        filteredFilteredProjectsProposal = filteredProjectsProposal.filter((p) => {
          return (p.proposal.date.valueOf() >= from.valueOf() && p.proposal.date.valueOf() < to.valueOf());
        });

        filteredFilteredProjectsContract = filteredProjectsContract.filter((p) => {
          return (p.process.contract.first.date.valueOf() >= from.valueOf() && p.process.contract.first.date.valueOf() < to.valueOf());
        });


        tempArr.push(filteredFilteredProjectsProposal.length);
        tempArr.push(filteredFilteredProjectsContract.length);
        tempArr.push(filteredFilteredProjectsProposal.length === 0 ? 0 : (filteredFilteredProjectsContract.length / filteredFilteredProjectsProposal.length));
        tempArr.push(Math.floor(filteredFilteredProjectsContract.reduce((acc, curr) => {
          return acc + curr.process.calculation.payments.totalAmount;
        }, 0)));

      }


      for (let i = 0; i < monthDelta; i++) {
        thisDate = new Date();
        thisDate.setMonth(thisDate.getMonth() - i);

        from = new Date(thisDate.getFullYear(), thisDate.getMonth(), 1);
        to = new Date(thisDate.getFullYear(), thisDate.getMonth(), 1);
        to.setMonth(to.getMonth() + 1);

        filteredFilteredProjectsProposal = filteredProjectsProposal.filter((p) => {
          return (p.proposal.date.valueOf() >= from.valueOf() && p.proposal.date.valueOf() < to.valueOf());
        });

        tempArr.push(filteredFilteredProjectsProposal.length);
      }

      matrix.push(tempArr);
    }


    sheetsId = await sheets.create_newSheets_inPython("디자이너 체크리스트 3", "1XrxI7BRC8S9ZZ96ZtJf1cq5T_2rACjQJ");
    await sheets.setting_cleanView_inPython(sheetsId);
    await sheets.update_value_inPython(sheetsId, "", matrix);

    console.log(matrix);

    */






    // designer career

    // const selfMongo = this.MONGOC;
    // const designers = (await back.getDesignersByQuery({}, { selfMongo })).toNormal();
    // const sheetsId = "1jedA_xAZ_J4CzVLL3O1WkqWD3jFObWtUl7ncCYoCHMs";
    // const raw = await sheets.get_value_inPython(sheetsId, "A1:C22");
    // let arr0, arr1;
    // let year0, month0
    // let year1, month1;
    // let stylingMonth;
    // let start;
    // let startYear, startMonth;
    // let desid;
    // let whereQuery, updateQuery;
    //
    //
    // now = new Date();
    //
    // for (let [ designer, raw0, raw1 ] of raw) {
    //
    //   desid = designers.find((d) => { return d.designer === designer }).desid;
    //
    //   arr0 = raw0.split("년").map((str) => { return Number(str.trim().replace(/[^0-9]/gi, '')) });
    //   arr1 = raw1.split("년").map((str) => { return Number(str.trim().replace(/[^0-9]/gi, '')) });
    //
    //   [ year0, month0 ] = arr0;
    //   [ year1, month1 ] = arr1;
    //
    //   stylingMonth = ((year1 * 12) + month1) - ((year0 * 12) + month0)
    //
    //   start = new Date();
    //   start.setMonth(start.getMonth() - stylingMonth);
    //
    //   startYear = start.getFullYear();
    //   startMonth = start.getMonth() + 1;
    //
    //   whereQuery = { desid };
    //   updateQuery = {};
    //
    //   updateQuery["information.business.career.startY"] = startYear;
    //   updateQuery["information.business.career.startM"] = startMonth;
    //   updateQuery["information.business.career.relatedY"] = year0;
    //   updateQuery["information.business.career.relatedM"] = month0;
    //
    //   await back.updateDesigner([ whereQuery, updateQuery ], { selfMongo });
    //
    //   console.log(whereQuery, updateQuery);
    //
    // }













    /*

    const getMatrix = (clients, projects, histories, requests, year, month) => {
      const cleanRatio = (num) => { return (Math.floor(num * 10000) / 10000) }
      let from, to;
      let filtered;
      let cliidArr;
      let managerArr;
      let standard;
      let projectArr;
      let managerStandard;
      let matrix;
      let tempArr;
      let index;
      let totalConsultingNumber;
      let totalProcessNumber;
      let totalContractNumber;


      matrix = [ [ "담당자명", "문의", "진행", "계약", "진행율", "계약율", "응대 비율", "계약 비율" ] ];
      from = new Date(year, (month - 1), 1);
      to = new Date(year, ((month - 1) + 1), 1);



      // consulting

      filtered = requests.filter((req) => {
        return req.request.timeline.toNormal().valueOf() >= from.valueOf() && req.request.timeline.toNormal().valueOf() < to.valueOf();
      })

      cliidArr = [ ...filtered.map((req) => { return req.cliid }) ];
      managerArr = cliidArr.map((cliid) => {
        if (histories.find((obj) => { return obj.cliid === cliid }) === undefined) {
          console.log(cliid);
          return "";
        } else {
          return histories.find((obj) => { return obj.cliid === cliid }).manager;
        }
      });
      managerStandard = [ ...new Set(managerArr) ];
      managerStandard.sort();

      for (let name of managerStandard) {
        matrix.push([ name, 0, 0, 0, 0, 0, 0, 0 ]);
      }
      matrix.push([ "전체", 0, 0, 0, 0, 0, 0, 0 ]);

      for (let i = 0; i < managerStandard.length; i++) {
        matrix[i + 1][1] = managerArr.filter((n) => { return n === managerStandard[i] }).length;
      }
      matrix[matrix.length - 1][1] = cliidArr.length;
      totalConsultingNumber = cliidArr.length;



      // process

      filtered = filtered.filter((req) => {
        return !/드[롭랍]/gi.test(req.analytics.response.status);
      });
      cliidArr = [ ...filtered.map((req) => { return req.cliid }) ];
      projectArr = projects.toNormal().filter((obj) => { return cliidArr.includes(obj.cliid) }).filter((obj) => {
        return obj.desid.trim() !== '';
      });

      projectArr = projectArr.map((obj) => {
        obj.manager = histories.find((obj2) => { return obj2.cliid === obj.cliid }).manager;
        return obj;
      })
      managerArr = projectArr.map((obj) => { return obj.manager });

      for (let i = 0; i < managerStandard.length; i++) {
        matrix[i + 1][2] = managerArr.filter((n) => { return n === managerStandard[i] }).length;
      }
      matrix[matrix.length - 1][2] = projectArr.length;
      totalProcessNumber = projectArr.length;


      // contract

      projectArr = projects.toNormal().filter((obj) => {
        return obj.process.contract.first.date.valueOf() >= from.valueOf() && obj.process.contract.first.date.valueOf() < to.valueOf();
      });
      projectArr = projectArr.map((obj) => {
        obj.manager = histories.find((obj2) => { return obj2.cliid === obj.cliid }).manager;
        return obj;
      })
      managerArr = projectArr.map((obj) => { return obj.manager });

      for (let i = 0; i < managerStandard.length; i++) {
        matrix[i + 1][3] = managerArr.filter((n) => { return n === managerStandard[i] }).length;
      }
      matrix[matrix.length - 1][3] = projectArr.length;
      totalContractNumber = projectArr.length;


      // total

      index = 0;
      for (let [ name, consulting, process, contract ] of matrix) {
        if (index !== 0) {
          matrix[index][4] = consulting !== 0 ? cleanRatio(process / consulting) : 0;
          matrix[index][5] = consulting !== 0 ? cleanRatio(contract / consulting) : 0;
          matrix[index][6] = totalConsultingNumber !== 0 ? cleanRatio(consulting / totalConsultingNumber) : 0;
          matrix[index][7] = totalContractNumber !== 0 ? cleanRatio(contract / totalContractNumber) : 0;
        }
        index++;
      }

      matrix.unshift([ `${String(year)}-${String(month)}`, "", "", "", "", "", "", "" ]);
      matrix.push([ "", "", "", "", "", "", "", "" ]);

      return matrix;
    }
    const selfMongo = this.MONGOC;
    const clients = await back.getClientsByQuery({}, { selfMongo, withTools: true });
    const projects = await back.getProjectsByQuery({}, { selfMongo, withTools: true });
    const histories = [ ...(await back.getHistoriesByQuery("client", {}, { fromConsole: true })) ];
    const requests = clients.getRequestsTong();
    let finalMatrix, sheetsId;

    finalMatrix = [];
    finalMatrix = finalMatrix.concat(getMatrix(clients, projects, histories, requests, 2023, 5))
    finalMatrix = finalMatrix.concat(getMatrix(clients, projects, histories, requests, 2023, 4))
    finalMatrix = finalMatrix.concat(getMatrix(clients, projects, histories, requests, 2023, 3))
    finalMatrix = finalMatrix.concat(getMatrix(clients, projects, histories, requests, 2023, 2))
    finalMatrix = finalMatrix.concat(getMatrix(clients, projects, histories, requests, 2023, 1))
    finalMatrix = finalMatrix.concat(getMatrix(clients, projects, histories, requests, 2022, 12))
    finalMatrix = finalMatrix.concat(getMatrix(clients, projects, histories, requests, 2022, 11))
    finalMatrix = finalMatrix.concat(getMatrix(clients, projects, histories, requests, 2022, 10))
    finalMatrix = finalMatrix.concat(getMatrix(clients, projects, histories, requests, 2022, 9))
    finalMatrix = finalMatrix.concat(getMatrix(clients, projects, histories, requests, 2022, 8))
    finalMatrix = finalMatrix.concat(getMatrix(clients, projects, histories, requests, 2022, 7))
    finalMatrix = finalMatrix.concat(getMatrix(clients, projects, histories, requests, 2022, 6))
    finalMatrix = finalMatrix.concat(getMatrix(clients, projects, histories, requests, 2022, 5))
    finalMatrix = finalMatrix.concat(getMatrix(clients, projects, histories, requests, 2022, 4))
    finalMatrix = finalMatrix.concat(getMatrix(clients, projects, histories, requests, 2022, 3))
    finalMatrix = finalMatrix.concat(getMatrix(clients, projects, histories, requests, 2022, 2))
    finalMatrix = finalMatrix.concat(getMatrix(clients, projects, histories, requests, 2022, 1))
    finalMatrix = finalMatrix.concat(getMatrix(clients, projects, histories, requests, 2021, 12))
    finalMatrix = finalMatrix.concat(getMatrix(clients, projects, histories, requests, 2021, 11))
    finalMatrix = finalMatrix.concat(getMatrix(clients, projects, histories, requests, 2021, 10))
    finalMatrix = finalMatrix.concat(getMatrix(clients, projects, histories, requests, 2021, 9))
    finalMatrix = finalMatrix.concat(getMatrix(clients, projects, histories, requests, 2021, 8))
    finalMatrix = finalMatrix.concat(getMatrix(clients, projects, histories, requests, 2021, 7))
    finalMatrix = finalMatrix.concat(getMatrix(clients, projects, histories, requests, 2021, 6))
    finalMatrix = finalMatrix.concat(getMatrix(clients, projects, histories, requests, 2021, 5))
    finalMatrix = finalMatrix.concat(getMatrix(clients, projects, histories, requests, 2021, 4))
    finalMatrix = finalMatrix.concat(getMatrix(clients, projects, histories, requests, 2021, 3))
    finalMatrix = finalMatrix.concat(getMatrix(clients, projects, histories, requests, 2021, 2))
    finalMatrix = finalMatrix.concat(getMatrix(clients, projects, histories, requests, 2021, 1))
    finalMatrix = finalMatrix.concat(getMatrix(clients, projects, histories, requests, 2020, 12))
    finalMatrix = finalMatrix.concat(getMatrix(clients, projects, histories, requests, 2020, 11))
    finalMatrix = finalMatrix.concat(getMatrix(clients, projects, histories, requests, 2020, 10))
    finalMatrix = finalMatrix.concat(getMatrix(clients, projects, histories, requests, 2020, 9))
    finalMatrix = finalMatrix.concat(getMatrix(clients, projects, histories, requests, 2020, 8))
    finalMatrix = finalMatrix.concat(getMatrix(clients, projects, histories, requests, 2020, 7))
    finalMatrix = finalMatrix.concat(getMatrix(clients, projects, histories, requests, 2020, 6))
    finalMatrix = finalMatrix.concat(getMatrix(clients, projects, histories, requests, 2020, 5))
    finalMatrix = finalMatrix.concat(getMatrix(clients, projects, histories, requests, 2020, 4))
    finalMatrix = finalMatrix.concat(getMatrix(clients, projects, histories, requests, 2020, 3))
    finalMatrix = finalMatrix.concat(getMatrix(clients, projects, histories, requests, 2020, 2))
    finalMatrix = finalMatrix.concat(getMatrix(clients, projects, histories, requests, 2020, 1))

    // sheetsId = await sheets.create_newSheets_inPython("응대자별 계약율", "1XrxI7BRC8S9ZZ96ZtJf1cq5T_2rACjQJ");
    await sheets.setting_cleanView_inPython("1Vu0VbMt-M6-vsLKfuMKBYOKk3TJZN592UPHHmOiaxk0");
    await sheets.update_value_inPython("1Vu0VbMt-M6-vsLKfuMKBYOKk3TJZN592UPHHmOiaxk0", "", finalMatrix);
    */


    /*

    const selfPythonMongo = this.MONGOPYTHONC;

    await selfPythonMongo.connect();


    const selfMongo = this.MONGOC;
    const clients = (await back.getClientsByQuery({}, { selfMongo })).toNormal();
    const motherProjects_raw = (await back.getProjectsByQuery({}, { selfMongo })).toNormal();
    const motherProjects = motherProjects_raw.filter((obj) => {  return obj.process.contract.first.date.valueOf() >= (new Date(2000, 0, 1)).valueOf() });
    const collection = "generalBill";
    const emptyDateValue = (new Date(2000, 0, 1)).valueOf();
    let first, second;
    let standard;
    let rows;
    let thisBill;
    let thisClient;
    let name;
    let requestItem, requestPay, requestCancel;
    let tempArr;
    let thisItems;
    let matrix;
    let sheetsId;

    standard = 210900;

    first = motherProjects.filter((obj) => {
      return Number(obj.proid.replace(/[^0-9]/gi, '')) >= standard
    });

    second = motherProjects.filter((obj) => {
      return Number(obj.proid.replace(/[^0-9]/gi, '')) < standard
    });


    matrix = []

    for (let { proid, cliid, service, process } of first) {

      thisClient = clients.find((obj) => { return obj.cliid === cliid });
      name = thisClient.name;
      [ thisBill ] = await back.mongoRead(collection, { $and: [ { "links.proid": proid }, { "links.method": (service.online ? "online" : "offline") } ] }, { selfMongo: selfPythonMongo });

      thisItems = [];
      for (let request of thisBill.requests) {

        tempArr = [];

        tempArr.push(proid);
        tempArr.push(cliid);
        tempArr.push(name);
        tempArr.push(process.status);

        tempArr.push(request.name);

        requestItem = Math.floor(request.items.reduce((acc, curr) => { return acc + curr.amount.consumer }, 0));
        requestPay = Math.floor(request.pay.reduce((acc, curr) => { return acc + curr.amount }, 0));
        requestCancel = Math.floor(request.cancel.reduce((acc, curr) => { return acc + curr.amount }, 0));

        tempArr.push(requestItem);
        tempArr.push(requestPay);
        tempArr.push(requestCancel);

        if (request.pay.length > 0) {
          tempArr.push(dateToString(request.pay[0].date));
        } else {
          tempArr.push("1800-01-01");
        }

        if (request.cancel.length > 0) {
          tempArr.push(dateToString(request.cancel[0].date));
        } else {
          tempArr.push("1800-01-01");
        }

        if (requestItem === 0 && requestPay === 0) {
          // pass
        } else {
          thisItems.push(tempArr);
        }

      }


      tempArr = [];
      tempArr.push(proid);
      tempArr.push(cliid);
      tempArr.push(name);
      tempArr.push(process.status);
      tempArr.push("디자이너 선금");
      tempArr.push(process.calculation.payments.first.amount);

      if (process.calculation.payments.first.date.valueOf() > emptyDateValue) {
        tempArr.push(process.calculation.payments.first.amount);
      } else {
        tempArr.push(0);
      }

      if (process.calculation.payments.first.cancel.valueOf() > emptyDateValue) {
        tempArr.push(process.calculation.payments.first.amount);
      } else {
        tempArr.push(0);
      }

      tempArr.push(process.calculation.payments.first.date.valueOf() > emptyDateValue ? dateToString(process.calculation.payments.first.date) : "1800-01-01");
      tempArr.push(process.calculation.payments.first.cancel.valueOf() > emptyDateValue ? dateToString(process.calculation.payments.first.cancel) : "1800-01-01");

      thisItems.push(tempArr);


      tempArr = [];

      tempArr.push(proid);
      tempArr.push(cliid);
      tempArr.push(name);
      tempArr.push(process.status);
      tempArr.push("디자이너 잔금");
      tempArr.push(process.calculation.payments.remain.amount);

      if (process.calculation.payments.remain.date.valueOf() > emptyDateValue) {
        tempArr.push(process.calculation.payments.remain.amount);
      } else {
        tempArr.push(0);
      }

      if (process.calculation.payments.remain.cancel.valueOf() > emptyDateValue) {
        tempArr.push(process.calculation.payments.remain.amount);
      } else {
        tempArr.push(0);
      }

      tempArr.push(process.calculation.payments.remain.date.valueOf() > emptyDateValue ? dateToString(process.calculation.payments.remain.date) : "1800-01-01");
      tempArr.push(process.calculation.payments.remain.cancel.valueOf() > emptyDateValue ? dateToString(process.calculation.payments.remain.cancel) : "1800-01-01");

      thisItems.push(tempArr);

      matrix = matrix.concat(equalJson(JSON.stringify(thisItems)));

    }


    for (let { proid, cliid, service, process } of second) {

      thisClient = clients.find((obj) => { return obj.cliid === cliid });
      name = thisClient.name;

      thisItems = [];




      tempArr = [];
      tempArr.push(proid);
      tempArr.push(cliid);
      tempArr.push(name);
      tempArr.push(process.status);
      tempArr.push("홈리에종 계약금");
      tempArr.push(process.contract.first.calculation.amount);

      if (process.contract.first.date.valueOf() > emptyDateValue) {
        tempArr.push(process.contract.first.calculation.amount);
      } else {
        tempArr.push(0);
      }

      if (process.contract.first.cancel.valueOf() > emptyDateValue) {
        tempArr.push(process.contract.first.calculation.amount);
      } else {
        tempArr.push(0);
      }

      tempArr.push(process.contract.first.date.valueOf() > emptyDateValue ? dateToString(process.contract.first.date) : "1800-01-01");
      tempArr.push(process.contract.first.cancel.valueOf() > emptyDateValue ? dateToString(process.contract.first.cancel) : "1800-01-01");

      thisItems.push(tempArr);



      tempArr = [];
      tempArr.push(proid);
      tempArr.push(cliid);
      tempArr.push(name);
      tempArr.push(process.status);
      tempArr.push("홈리에종 잔금");
      tempArr.push(process.contract.remain.calculation.amount.consumer - process.contract.first.calculation.amount);

      if (process.contract.remain.date.valueOf() > emptyDateValue) {
        tempArr.push(process.contract.remain.calculation.amount.consumer - process.contract.first.calculation.amount);
      } else {
        tempArr.push(0);
      }

      if (process.contract.remain.cancel.valueOf() > emptyDateValue) {
        tempArr.push(process.contract.remain.calculation.amount.consumer - process.contract.first.calculation.amount);
      } else {
        tempArr.push(0);
      }

      tempArr.push(process.contract.remain.date.valueOf() > emptyDateValue ? dateToString(process.contract.remain.date) : "1800-01-01");
      tempArr.push(process.contract.remain.cancel.valueOf() > emptyDateValue ? dateToString(process.contract.remain.cancel) : "1800-01-01");

      thisItems.push(tempArr);




      tempArr = [];
      tempArr.push(proid);
      tempArr.push(cliid);
      tempArr.push(name);
      tempArr.push(process.status);
      tempArr.push("디자이너 선금");
      tempArr.push(process.calculation.payments.first.amount);

      if (process.calculation.payments.first.date.valueOf() > emptyDateValue) {
        tempArr.push(process.calculation.payments.first.amount);
      } else {
        tempArr.push(0);
      }

      if (process.calculation.payments.first.cancel.valueOf() > emptyDateValue) {
        tempArr.push(process.calculation.payments.first.amount);
      } else {
        tempArr.push(0);
      }

      tempArr.push(process.calculation.payments.first.date.valueOf() > emptyDateValue ? dateToString(process.calculation.payments.first.date) : "1800-01-01");
      tempArr.push(process.calculation.payments.first.cancel.valueOf() > emptyDateValue ? dateToString(process.calculation.payments.first.cancel) : "1800-01-01");

      thisItems.push(tempArr);


      tempArr = [];

      tempArr.push(proid);
      tempArr.push(cliid);
      tempArr.push(name);
      tempArr.push(process.status);
      tempArr.push("디자이너 잔금");
      tempArr.push(process.calculation.payments.remain.amount);

      if (process.calculation.payments.remain.date.valueOf() > emptyDateValue) {
        tempArr.push(process.calculation.payments.remain.amount);
      } else {
        tempArr.push(0);
      }

      if (process.calculation.payments.remain.cancel.valueOf() > emptyDateValue) {
        tempArr.push(process.calculation.payments.remain.amount);
      } else {
        tempArr.push(0);
      }

      tempArr.push(process.calculation.payments.remain.date.valueOf() > emptyDateValue ? dateToString(process.calculation.payments.remain.date) : "1800-01-01");
      tempArr.push(process.calculation.payments.remain.cancel.valueOf() > emptyDateValue ? dateToString(process.calculation.payments.remain.cancel) : "1800-01-01");

      thisItems.push(tempArr);

      matrix = matrix.concat(equalJson(JSON.stringify(thisItems)));

    }


    matrix.forEach((arr) => {
      const [ year, month, date ] = arr[8].split("-");
      arr.push(Number(year));
      arr.push(Number(month));
    })


    matrix.unshift([ "p아이디", "c아이디", "성함", "상태", "구분", "계약 금액", "입금액", "환불액", "입금일", "환불일", "년", "월" ])


    sheetsId = await sheets.create_newSheets_inPython("기본 추출", "1XrxI7BRC8S9ZZ96ZtJf1cq5T_2rACjQJ");
    await sheets.setting_cleanView_inPython(sheetsId);
    await sheets.update_value_inPython(sheetsId, "", matrix);

    console.log(matrix);



    await selfPythonMongo.close();

    */



    // const selfMongo = this.MONGOLOGC;
    // await selfMongo.connect();
    // const LogReport = require(`${process.cwd()}/apps/logConsole/router/logReport.js`);
    // const app = new LogReport(selfMongo);
    // await app.dailyReports();
    // await selfMongo.close();





    // const selfMongo = this.MONGOC;
    //
    // const clients = await back.getClientsByQuery({}, { selfMongo, withTools: true });
    // const projects = await back.getProjectsByQuery({}, { selfMongo, withTools: true });
    // const histories = [ ...(await back.getHistoriesByQuery("client", {}, { fromConsole: true })) ];
    // const requests = clients.getRequestsTong();
    // let from, to;
    // let filtered;
    // let cliidArr;
    // let managerArr;
    // let standard;
    // let projectArr;
    // let month;
    //
    // standard = [ "강해진", "이큰별", "임지민" ];
    // month = 10;
    //
    // from = new Date(2022, (month - 1), 1);
    // to = new Date(2022, ((month - 1) + 1), 1);
    //
    // filtered = requests.filter((req) => {
    //   return req.request.timeline.toNormal().valueOf() >= from.valueOf() && req.request.timeline.toNormal().valueOf() < to.valueOf();
    // })
    //
    // cliidArr = [ ...filtered.map((req) => { return req.cliid }) ];
    // managerArr = cliidArr.map((cliid) => {
    //   if (histories.find((obj) => { return obj.cliid === cliid }) === undefined) {
    //     console.log(cliid);
    //     return "";
    //   } else {
    //     return histories.find((obj) => { return obj.cliid === cliid }).manager;
    //   }
    // });
    //
    // for (let name of standard) {
    //   console.log(name, managerArr.filter((n) => { return n === name }).length);
    // }
    // console.log(cliidArr.length);
    //
    // filtered = filtered.filter((req) => {
    //   return !/드[롭랍]/gi.test(req.analytics.response.status);
    // });
    // cliidArr = [ ...filtered.map((req) => { return req.cliid }) ];
    // projectArr = projects.toNormal().filter((obj) => { return cliidArr.includes(obj.cliid) }).filter((obj) => {
    //   return obj.desid.trim() !== '';
    // });
    //
    // projectArr = projectArr.map((obj) => {
    //   obj.manager = histories.find((obj2) => { return obj2.cliid === obj.cliid }).manager;
    //   return obj;
    // })
    //
    // managerArr = projectArr.map((obj) => { return obj.manager });
    //
    // for (let name of standard) {
    //   console.log(name, managerArr.filter((n) => { return n === name }).length);
    // }
    // console.log(projectArr.length);













    // const selfMongo = this.MONGOCONSOLEC;
    // await selfMongo.connect();
    // const collection = "flowBlock";
    // const typeCode = [ "page", "action", "alarm" ];
    // const targetCode = [ "client", "designer", "homeliaison" ];
    // let sheetsId;
    // let rows;
    // let matrix;
    // let tong;
    // let tempObj;
    // let status;
    //
    // sheetsId = "1l5OpdpKDtes3hwJCNq1b-a8BpJ5wLuBU1dsGQPavZT0";
    //
    // rows = await sheets.get_value_inPython(sheetsId, "default!A2:I");
    //
    // tong = [];
    // for (let [ id, name, description, type, target, complete, trigger, link, wordings ] of rows) {
    //   tempObj = {
    //     id,
    //     name,
    //     feature: {
    //       mode: "service",
    //       code: ((typeCode.findIndex((str) => { return str === type.trim() }) + 1) * 10) + (targetCode.findIndex((str) => { return str === target.trim() }) + 1),
    //       type: {
    //         code: typeCode.findIndex((str) => { return str === type.trim() }) + 1,
    //         key: type.trim(),
    //       },
    //       target: {
    //         code: targetCode.findIndex((str) => { return str === target.trim() }) + 1,
    //         key: target.trim(),
    //       },
    //     },
    //     project: {
    //       date: {
    //         update: new Date(),
    //         start: new Date(),
    //         end: (complete === "TRUE" ? new Date() : new Date(3800, 0, 1)),
    //       },
    //       complete: (complete === "TRUE"),
    //       status: (complete === "TRUE" ? "완료" : "예정"),
    //     },
    //     contents: {
    //       description,
    //       trigger: trigger === '-' ? '' : trigger,
    //     },
    //     composition: {
    //       wordings: wordings === '-' ? '' : wordings,
    //       link: link === '-' ? '' : link,
    //     }
    //   };
    //   tong.push(tempObj);
    // }
    //
    // for (let json of tong) {
    //   await back.mongoCreate(collection, json, { selfMongo });
    //   console.log(json);
    // }
    //
    // await selfMongo.close();






















    // const selfMongo = this.MONGOC;
    // const db = "miro81";
    // const collection = "designer";
    // const designers = await selfMongo.db(db).collection(collection).find({}).toArray();
    // let whereQuery, updateQuery;
    //
    // for (let { desid } of designers) {
    //   whereQuery = { desid };
    //   updateQuery = {};
    //   updateQuery["analytics.construct.partner"] = false;
    //   updateQuery["analytics.construct.range"] = 2;
    //
    //   await selfMongo.db(db).collection(collection).updateOne(whereQuery, { $set: updateQuery });
    //   console.log(whereQuery);
    //
    // }







    // const selfMongo = this.MONGOC;
    // const projects = await back.getProjectsByQuery({}, { selfMongo });
    // let whereQuery, updateQuery;
    // for (let project of projects) {
    //   if (project.proid !== "p1801_aa01s") {
    //     whereQuery = { proid: project.proid };
    //     updateQuery = {};
    //     for (let i = 0; i < project.proposal.detail.length; i++) {
    //       for (let j = 0; j < project.proposal.detail[i].fee.length; j++) {
    //         updateQuery["proposal.detail." + String(i) + ".fee." + String(j) + ".discount"] = 0;
    //       }
    //     }
    //     await back.updateProject([ whereQuery, updateQuery ], { selfMongo });
    //     console.log(whereQuery, updateQuery);
    //   }
    // }


    // const targetFolder = `${process.cwd()}/temp/target`;
    // const targetList = (await fileSystem(`readDir`, [ targetFolder ])).filter((str) => { return str !== ".DS_Store" }).map((str) => { return `${targetFolder}/${str}` });
    // const token = "____split____";
    // let raw, num;
    // let arr;
    // let columns;
    // let name;
    // let query;
    // let queryArr;
    // let createQuery;
    //
    // for (let txt of targetList) {
    //   raw = await fileSystem(`readString`, [ txt ]);
    //   arr = raw.split("\n").map((str) => { let a = str.split(token); a.shift(); return a; }).filter((arr) => { return arr.length > 1 });
    //
    //   name = txt.split("/")[txt.split("/").length - 1].replace(/\.txt$/i, '');
    //   columns = arr.shift();
    //
    //   queryArr = [];
    //   createQuery = "CREATE TABLE " + name + " (";
    //   createQuery += "id INT(11) NOT NULL AUTO_INCREMENT,";
    //   createQuery += " ";
    //   for (let i of columns) {
    //     createQuery += i;
    //     createQuery += " ";
    //     createQuery += "VARCHAR(255)";
    //     createQuery += ", ";
    //   }
    //   createQuery += "PRIMARY KEY (id));";
    //   queryArr.push(createQuery);
    //
    //   for (let valuesArr of arr) {
    //     query = "INSERT INTO " + name + " (" + columns.join(",") + ") VALUES (";
    //     for (let value of valuesArr) {
    //       query += "'";
    //       query += value.replace(/'/gi ,'"');
    //       query += "',";
    //     }
    //     query = query.slice(0, -1);
    //     query += ");";
    //     queryArr.push(query);
    //   }
    //
    //   await fileSystem(`write`, [ `${targetFolder}/${name}.sql`, queryArr.join("\n") ])
    //
    // }







    // const selfMongo = this.MONGOC;
    // const projects = await back.getProjectsByQuery({ desid: { $regex: "^d" } }, { selfMongo });
    // let tong;
    // let whereQuery, updateQuery;
    // let feeTarget;
    // let feeObj;
    //
    // tong = [];
    // for (let project of projects) {
    //   if (project.proposal.detail.toNormal().map((obj) => { return obj.desid }).includes(project.desid)) {
    //     if (project.proposal.detail.toNormal().find((obj) => { return obj.desid === project.desid }).fee.length !== 0) {
    //       tong.push(project.toNormal());
    //     }
    //   }
    // }
    //
    // for (let project of tong) {
    //   feeTarget = project.proposal.detail.find((obj) => { return obj.desid === project.desid }).fee;
    //   feeObj = null;
    //   if (!project.service.online) {
    //     feeObj = feeTarget.find((obj) => { return obj.method === "offline" });
    //   } else {
    //     feeObj = feeTarget.find((obj) => { return obj.method === "online" });
    //   }
    //
    //   if (feeObj === undefined || feeObj === null) {
    //     feeObj = feeTarget[0];
    //   }
    //
    //   whereQuery = { proid: project.proid };
    //   updateQuery = {};
    //   updateQuery["process.contract.remain.calculation.discount"] = feeObj.discount;
    //
    //   await back.updateProject([ whereQuery, updateQuery ], { selfMongo });
    //   console.log(whereQuery, updateQuery);
    // }






    // const addr = new AddressParser();
    // let from, to;
    // let distance;
    // let meters;
    // let seconds;
    // let targets;
    // let meterStandard, secondStandard;
    // let matrix;
    // let sheetsId;
    //
    // meterStandard = 0.22;
    // secondStandard = 0.5;
    //
    // from = "서울특별시 마포구 양화로 55";
    // targets = [
    //   { name: "강원도 원주", to: "강원도 원주시 무실동 1714" },
    //   { name: "강원도 춘천", to: "강원도 춘천시 공지로 591" },
    //   { name: "강원도 강릉", to: "강원도 강릉시 강릉대로 149" },
    //   { name: "경기도 평택", to: "경기도 평택시 평택로 51" },
    //   { name: "충청남도 천안", to: "충청남도 천안시 서북구 불당동 1534" },
    //   { name: "대전광역시", to: "대전광역시 서구 둔산동 1420" },
    //   { name: "세종특별자치시", to: "세종특별자치시 보람동 744" },
    //   { name: "충청북도 청주", to: "충청북도 청주시 서원구 사직동 265-5" },
    //   { name: "충청북도 충주", to: "충청북도 충주시 금릉동 661" },
    //   { name: "광주광역시 광산구", to: "광주광역시 광산구 송정동 1003-141" },
    //   { name: "광주광역시 동구", to: "광주광역시 동구 학동 720-10" },
    //   { name: "전라북도 전주", to: "전라북도 전주시 덕진구 금암동 767-9" },
    //   { name: "전라북도 군산", to: "전라북도 군산시 대명동 388-13" },
    //   { name: "전라남도 순천", to: "전라남도 순천시 장천동 18-22" },
    //   { name: "전라남도 여수", to: "전라남도 여수시 학동 68-20" },
    //   { name: "대구광역시 동구", to: "대구광역시 동구 신암동 1463" },
    //   { name: "대구광역시 수성구", to: "대구광역시 수성구 범어동 197-4" },
    //   { name: "대구광역시 달서구", to: "대구광역시 달서구 월성동 281" },
    //   { name: "울산광역시 남구", to: "울산광역시 남구 신정동 646-4" },
    //   { name: "경상북도 포항", to: "경상북도 포항시 남구 대잠동 971" },
    //   { name: "경상남도 김해", to: "경상남도 김해시 부원동 630-7" },
    //   { name: "경상남도 창원", to: "경상남도 창원시 성산구 신월동 94" },
    //   { name: "부산광역시 해운대구", to: "부산광역시 해운대구 중동 1378-95" },
    //   { name: "부산광역시 중구", to: "부산광역시 중구 대청동4가 6-20" },
    //   { name: "부산광역시 기장군", to: "부산광역시 기장군 기장읍 청강리 846" },
    //   { name: "제주도 연동", to: "제주특별자치도 제주시 연동 302-6" },
    // ];
    //
    // matrix = [ [ "대상", "미터", "초", "출장비" ] ];
    //
    // for (let { name, to } of targets) {
    //   distance = await addr.getDistance(from, to);
    //   ({ meters, seconds } = distance);
    //   matrix.push([ name, meters, seconds, autoComma(Math.floor(((meters * meterStandard) + (seconds * secondStandard)) / 1000) * 1000) + '원' ]);
    // }
    //
    // sheetsId = await sheets.create_newSheets_inPython("사진 작가님 출장비", "1XrxI7BRC8S9ZZ96ZtJf1cq5T_2rACjQJ");
    // await sheets.setting_cleanView_inPython(sheetsId);
    // await sheets.update_value_inPython(sheetsId, "", matrix);
    //
    // console.log(matrix);








    // const WebSocket = require("ws");
    // const ws = new WebSocket("wss://home-liaison.serveftp.com:5000/general");
    // ws.on("open", () => {
    //   ws.send(JSON.stringify({
    //     mode: "register",
    //     to: null,
    //     data: {
    //       id: 1,
    //       date: new Date(),
    //       name: "uragen"
    //     }
    //   }));
    // });
    //
    // ws.on("message", (raw) => {
    //   const { from, data } = JSON.parse(raw);
    //   console.log(from, data);
    // });
    //
    // setTimeout(async () => {
    //   console.log(await requestSystem("https://home-liaison.serveftp.com:5000/status"));
    // }, 3000)





    // let res;
    // let item;
    // let tong;
    // let convertFunction;
    //
    // res = await requestSystem("http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcSHRent", {
    //   LAWD_CD: "11110",
    //   DEAL_YMD: "202202",
    //   serviceKey: "qYxqA/rabM2euF/V0hfK7RoH5z9vLUyj5GEsjM4U3NhiVrgIBDMKE5jfdpjeTZ176nISXMeaRl2TxefP5MrpsQ=="
    // }, { method: "get" });
    //
    // item = res.data.response.body.items.item;
    //
    // convertFunction = (obj) => {
    //   return {
    //     date: new Date(obj["년"], obj["월"] - 1, obj["일"]),
    //     amount: {
    //       trade: 0,
    //       deposit: (typeof obj["보증금액"] === "string" ? Number(obj["보증금액"].trim().replace(/[^0-9]/gi, '')) : obj["보증금액"]) * 10000,
    //       monthly: (typeof obj["월세금액"] === "string" ? Number(obj["월세금액"].trim().replace(/[^0-9]/gi, '')) : obj["월세금액"]) * 10000,
    //     },
    //     space: {
    //       kind: "singlehouse",
    //       name: "단독",
    //       pyeong: obj["계약면적"] / 3.30579,
    //       floor: 0,
    //       dong: obj["법정동"].trim(),
    //       builtYear: obj["건축년도"],
    //     }
    //   };
    // }
    //
    // console.log(item);
    // tong = [];
    // for (let obj of item) {
    //   tong.push(convertFunction(obj));
    // }
    // console.log(tong);








    /*
    setTimeout(async () => {
      await this.MONGOCONSOLEC.connect();
      const standard = new Date(2022, 0, 28, 16, 0, 0);
      const clients = await back.getClientsByQuery({}, { withTools: true });
      const projects = await back.getProjectsByQuery({}, { withTools: true });
      const clientHistory = await back.mongoRead("clientHistory", {}, { selfMongo: this.MONGOCONSOLEC });
      const requests = clients.getRequestsTong();
      const exceptions = [];
      const parentId = "1RDgKLfqrlLyJtRRc0T3a6nYOakCqmnBe";
      let targets;
      let matrix;
      let tempArr;
      let tempBoo;
      let tempBoo2;
      let sheetsId;
      let callArray;
      let proposalArray;

      targets = [];
      for (let { request, cliid, name } of requests) {
        if (request.timeline.valueOf() >= standard.valueOf()) {
          if (!exceptions.includes(cliid)) {
            targets.push(cliid)
          }
        }
      }

      targets = targets.map((cliid) => { return clients.search(cliid); });
      for (let client of targets) {
        for (let history of clientHistory) {
          if (client.cliid === history.cliid) {
            client.manager = history.manager;
            client.history = history.curation;
            client.analytics = history.curation.analytics;
          }
        }
      }

      matrix = [ [ "아이디", "성함", "담당자", "진행 상태", "응대 단계", "스타일 체크 여부", "제안서 제작 여부", "제안서 1차 전송", "제안서 열람", "통화 연결 여부", "제안서 수정 전송", "수정후 통화 연결", "드랍 사유" ] ]

      for (let target of targets) {
        tempArr = [];
        tempArr.push(target.cliid);
        tempArr.push(target.name);
        tempArr.push(target.manager);
        tempArr.push(target.requests[0].analytics.response.status.value);
        tempArr.push(target.requests[0].analytics.response.action.value);

        tempBoo = target.history.image.length > 0;
        tempArr.push(tempBoo ? "진행" : "안 함");

        tempBoo = projects.findIndex((obj) => { return obj.cliid === target.cliid }) !== -1;
        tempArr.push(tempBoo ? "제작" : "안 됨");

        tempBoo = target.analytics.send.findIndex((obj) => { return obj.page === "designerProposal" }) !== -1;
        tempArr.push(tempBoo ? "전송" : "안 함");

        tempBoo = target.analytics.page.findIndex((obj) => { return obj.page === "designerProposal" }) !== -1;
        tempArr.push(tempBoo ? "열람" : "안 함");

        callArray = target.analytics.call.out.concat(target.analytics.call.in);
        callArray.sort((a, b) => { return a.date.valueOf() - b.date.valueOf() });

        tempBoo = callArray.findIndex((obj) => { return obj.success }) !== -1;
        tempArr.push(tempBoo ? "성공" : "실패");

        proposalArray = target.analytics.send.filter((obj) => { return obj.page === "designerProposal" });
        tempBoo = proposalArray.length > 1;
        tempArr.push(tempBoo ? "전송" : "안 함");


        proposalArray.reverse();
        callArray.reverse();
        callArray = callArray.filter((obj) => { return obj.success });
        if (proposalArray.length > 1 && callArray.length > 1) {
          tempArr.push("성공");
        } else {
          tempArr.push("실패");
        }

        tempArr.push(target.requests[0].analytics.response.outreason.values.join(", "));

        matrix.push(tempArr);
      }

      sheetsId = "1pfzymPAEjz6Q2G_QIMwQlc7e6Q_FYQkSw4tYIxAkWDk";
      await sheets.update_value_inPython(sheetsId, "default", matrix);
      console.log(matrix);

      await this.MONGOC.close();
      await this.MONGOCONSOLEC.close();

      console.log("donedone");
    }, 1 * 1000);
    */







    // matrix = [];
    // for (let id in result) {
    //
    //   first = result[id].history[0].date;
    //   login = result[id].history.find((obj) => { return obj.title === "login" }).date;
    //   loginAgo = new Date(JSON.stringify(login).slice(1, -1));
    //   loginAgo.setHours(loginAgo.getHours() - 12);
    //
    //   index = result[id].history.findIndex((obj) => { return obj.title === "login" });
    //   consulting = null;
    //   for (let i = 0; i < index; i++) {
    //     if (/consulting/gi.test(result[id].history[i].path)) {
    //       consulting = result[id].history[i].date;
    //     }
    //   }
    //   if (consulting === null) {
    //     consulting = login;
    //   }
    //   continueFirst = null;
    //   for (let i = 0; i < index; i++) {
    //     if (result[id].history[i].date.valueOf() >= loginAgo.valueOf()) {
    //       continueFirst = result[id].history[i].date;
    //       break;
    //     }
    //   }
    //   if (continueFirst === null) {
    //     continueFirst = first;
    //   }
    //
    //   matrix.push([ id, dateToString(first, true), dateToString(continueFirst, true), dateToString(consulting, true), dateToString(login, true), Math.round(((login.valueOf() - first.valueOf()) / 1000) / 60), Math.round(((login.valueOf() - continueFirst.valueOf()) / 1000) / 60), Math.round(((login.valueOf() - consulting.valueOf()) / 1000) / 60) ])
    // }
    //
    // matrix.sort((a, b) => { return stringToDate(a[1]).valueOf() - stringToDate(b[1]).valueOf() })
    // matrix.unshift([ "구글 아이디", "최초 도달", "당일 도달 추정", "서비스 신청 도달", "서비스 신청", "신청 - 최초(분)", "신청 - 당일(분)", "신청 - 서비스(분)" ])
    //
    // await sheets.update_value_inPython("1arniWfRNu2tYTyqcRCH6Meh16LUc2DRHQQCC19WQL3o", "", matrix);
    // console.log(matrix);






    // const projects = await back.getProjectsByQuery({
    //   $and: [
    //     {
    //       "process.contract.first.date": { $gte: new Date(2021, 0, 1) }
    //     },
    //     {
    //       "process.contract.first.date": { $lt: new Date(2022, 0, 1) }
    //     },
    //     {
    //       "desid": { $regex: "^d" }
    //     }
    //   ]
    // }, { selfMongo: instance.MONGOC });
    // clients = await back.getClientsByQuery({
    //   $or: [
    //     ...projects.toNormal().map((obj) => { return { cliid: obj.cliid } }),
    //   ]
    // }, { selfMongo: instance.MONGOC });
    //
    // const target = projects.toNormal();
    //
    // for (let obj of target) {
    //   for (let client of clients) {
    //     if (obj.cliid === client.cliid) {
    //       obj.client = client.toNormal();
    //       obj.pyeong = client.requests[0].request.space.pyeong.value;
    //     }
    //   }
    // }
    //
    // const a1 = target.filter((obj) => { return /_aa01s/gi.test(obj.service.serid) });
    // const a2 = target.filter((obj) => { return /_aa02s/gi.test(obj.service.serid) });
    // const a3 = target.filter((obj) => { return /_aa03s/gi.test(obj.service.serid) });
    // const a4 = target.filter((obj) => { return /_aa04s/gi.test(obj.service.serid) });
    //
    // const a1m = a1.map((obj) => { return obj.process.contract.remain.calculation.amount.consumer });
    // const a2m = a2.map((obj) => { return obj.process.contract.remain.calculation.amount.consumer });
    // const a3m = a3.map((obj) => { return obj.process.contract.remain.calculation.amount.consumer });
    // const a4m = a4.map((obj) => { return obj.process.contract.remain.calculation.amount.consumer });
    //
    // const a1a = Math.floor((a1m.reduce((acc, curr) => { return acc + curr }, 0) / a1m.length) / 1000) * 1000;
    // const a2a = Math.floor((a2m.reduce((acc, curr) => { return acc + curr }, 0) / a2m.length) / 1000) * 1000;
    // const a3a = Math.floor((a3m.reduce((acc, curr) => { return acc + curr }, 0) / a3m.length) / 1000) * 1000;
    // const a4a = Math.floor((a4m.reduce((acc, curr) => { return acc + curr }, 0) / a4m.length) / 1000) * 1000;
    //
    // const a1e = a1.map((obj) => { return obj.process.contract.remain.calculation.amount.consumer / obj.pyeong });
    // const a2e = a2.map((obj) => { return obj.process.contract.remain.calculation.amount.consumer / obj.pyeong });
    // const a3e = a3.map((obj) => { return obj.process.contract.remain.calculation.amount.consumer / obj.pyeong });
    // const a4e = a4.map((obj) => { return obj.process.contract.remain.calculation.amount.consumer / obj.pyeong });
    //
    // const a1b = Math.floor((a1e.reduce((acc, curr) => { return acc + curr }, 0) / a1e.length) / 1000) * 1000;
    // const a2b = Math.floor((a2e.reduce((acc, curr) => { return acc + curr }, 0) / a2e.length) / 1000) * 1000;
    // const a3b = Math.floor((a3e.reduce((acc, curr) => { return acc + curr }, 0) / a3e.length) / 1000) * 1000;
    // const a4b = Math.floor((a4e.reduce((acc, curr) => { return acc + curr }, 0) / a4e.length) / 1000) * 1000;
    //
    // console.log(a1a, a2a, a3a, a4a)
    // console.log(a1b, a2b, a3b, a4b)





    /*

    const jsdom = require("jsdom");
    const { JSDOM } = jsdom;
    const reviewCategoryNumber = 10;
    const blogId = "homeliaison";
    const extractLoginInfo = async () => {
      const LZString = function(){function o(o,r){if(!t[o]){t[o]={};for(var n=0;n<o.length;n++)t[o][o.charAt(n)]=n}return t[o][r]}var r=String.fromCharCode,n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",t={},i={compressToBase64:function(o){if(null==o)return"";var r=i._compress(o,6,function(o){return n.charAt(o)});switch(r.length%4){default:case 0:return r;case 1:return r+"===";case 2:return r+"==";case 3:return r+"="}},decompressFromBase64:function(r){return null==r?"":""==r?null:i._decompress(r.length,32,function(e){return o(n,r.charAt(e))})},compressToUTF16:function(o){return null==o?"":i._compress(o,15,function(o){return r(o+32)})+" "},decompressFromUTF16:function(o){return null==o?"":""==o?null:i._decompress(o.length,16384,function(r){return o.charCodeAt(r)-32})},compressToUint8Array:function(o){for(var r=i.compress(o),n=new Uint8Array(2*r.length),e=0,t=r.length;t>e;e++){var s=r.charCodeAt(e);n[2*e]=s>>>8,n[2*e+1]=s%256}return n},decompressFromUint8Array:function(o){if(null===o||void 0===o)return i.decompress(o);for(var n=new Array(o.length/2),e=0,t=n.length;t>e;e++)n[e]=256*o[2*e]+o[2*e+1];var s=[];return n.forEach(function(o){s.push(r(o))}),i.decompress(s.join(""))},compressToEncodedURIComponent:function(o){return null==o?"":i._compress(o,6,function(o){return e.charAt(o)})},decompressFromEncodedURIComponent:function(r){return null==r?"":""==r?null:(r=r.replace(/ /g,"+"),i._decompress(r.length,32,function(n){return o(e,r.charAt(n))}))},compress:function(o){return i._compress(o,16,function(o){return r(o)})},_compress:function(o,r,n){if(null==o)return"";var e,t,i,s={},p={},u="",c="",a="",l=2,f=3,h=2,d=[],m=0,v=0;for(i=0;i<o.length;i+=1)if(u=o.charAt(i),Object.prototype.hasOwnProperty.call(s,u)||(s[u]=f++,p[u]=!0),c=a+u,Object.prototype.hasOwnProperty.call(s,c))a=c;else{if(Object.prototype.hasOwnProperty.call(p,a)){if(a.charCodeAt(0)<256){for(e=0;h>e;e++)m<<=1,v==r-1?(v=0,d.push(n(m)),m=0):v++;for(t=a.charCodeAt(0),e=0;8>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}else{for(t=1,e=0;h>e;e++)m=m<<1|t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t=0;for(t=a.charCodeAt(0),e=0;16>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}l--,0==l&&(l=Math.pow(2,h),h++),delete p[a]}else for(t=s[a],e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;l--,0==l&&(l=Math.pow(2,h),h++),s[c]=f++,a=String(u)}if(""!==a){if(Object.prototype.hasOwnProperty.call(p,a)){if(a.charCodeAt(0)<256){for(e=0;h>e;e++)m<<=1,v==r-1?(v=0,d.push(n(m)),m=0):v++;for(t=a.charCodeAt(0),e=0;8>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}else{for(t=1,e=0;h>e;e++)m=m<<1|t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t=0;for(t=a.charCodeAt(0),e=0;16>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}l--,0==l&&(l=Math.pow(2,h),h++),delete p[a]}else for(t=s[a],e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;l--,0==l&&(l=Math.pow(2,h),h++)}for(t=2,e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;for(;;){if(m<<=1,v==r-1){d.push(n(m));break}v++}return d.join("")},decompress:function(o){return null==o?"":""==o?null:i._decompress(o.length,32768,function(r){return o.charCodeAt(r)})},_decompress:function(o,n,e){var t,i,s,p,u,c,a,l,f=[],h=4,d=4,m=3,v="",w=[],A={val:e(0),position:n,index:1};for(i=0;3>i;i+=1)f[i]=i;for(p=0,c=Math.pow(2,2),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;switch(t=p){case 0:for(p=0,c=Math.pow(2,8),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;l=r(p);break;case 1:for(p=0,c=Math.pow(2,16),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;l=r(p);break;case 2:return""}for(f[3]=l,s=l,w.push(l);;){if(A.index>o)return"";for(p=0,c=Math.pow(2,m),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;switch(l=p){case 0:for(p=0,c=Math.pow(2,8),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;f[d++]=r(p),l=d-1,h--;break;case 1:for(p=0,c=Math.pow(2,16),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;f[d++]=r(p),l=d-1,h--;break;case 2:return w.join("")}if(0==h&&(h=Math.pow(2,m),m++),f[l])v=f[l];else{if(l!==d)return null;v=s+s.charAt(0)}w.push(v),f[d++]=s+v.charAt(0),h--,s=v,0==h&&(h=Math.pow(2,m),m++)}}};return i}();

      const publicKeyUrl = "https://nid.naver.com/login/ext/keys.nhn";
      const { id, password: pwd } = this.address.officeinfo.naver;
      const uniqueName = uniqueValue("uuid");
      const uniqueFolder = process.cwd() + "/temp/" + uniqueValue("hex");
      const { data } = await requestSystem(publicKeyUrl);
      const [ sessionKey, keyName, eStr, nStr ] = data.trim().split(',');
      const uuid = uniqueValue("uuid");
      const encData = `{"a":"${uuid}-4","b":"1.3.4","d":[{"i":"id","b":{"a":["0,${id}"]},"d":"${id}","e":false,"f":false},{"i":"${pwd}","e":true,"f":false}],"h":"1f","i":{"a":"Mozilla/5.0"}}`;
      const bvsd = JSON.stringify({ uuid, encData: LZString.compressToEncodedURIComponent(encData) });
      const svctype = "0";
      const enctp = "1";
      const enc_url = "http0X0.0000000000001P-10220.0000000.000000www.naver.com";
      const url = "www.naver.com";
      const smart_level = "1";
      const target = "https://nid.naver.com/nidlogin.login";
      let pythonScript;

      await shellExec(`rm`, [ `-rf`, uniqueFolder ]);
      await shellExec(`mkdir`, [ uniqueFolder ]);
      await shellExec(`pip3 install rsa --target="${shellLink(uniqueFolder)}";`);

      pythonScript = ``;
      pythonScript += `import sys\n`;
      pythonScript += `sys.path.append("${uniqueFolder}")\n`;
      pythonScript += `import rsa\n`;
      pythonScript += `import json\n`;
      pythonScript += `def naver_style_join(arr):\n`;
      pythonScript += `\tresult = ''\n`;
      pythonScript += `\tfor str in arr:\n`;
      pythonScript += `\t\tresult += chr(len(str)) + str\n`;
      pythonScript += `\treturn result\n`;
      pythonScript += `message = naver_style_join([ "${sessionKey}", "${id}", "${pwd}" ]).encode()\n`;
      pythonScript += `pubkey = rsa.PublicKey(int("${eStr}", 16), int("${nStr}", 16))\n`;
      pythonScript += `encrypted = rsa.encrypt(message, pubkey)\n`;
      pythonScript += `result = json.dumps({ "hex": encrypted.hex() })\n`;
      pythonScript += `print(result)`;

      await fileSystem(`write`, [ `${process.cwd()}/temp/${uniqueName}.py`, pythonScript ]);
      const { hex: encpw } = equalJson(await shellExec("python3", [ `${process.cwd()}/temp/${uniqueName}.py` ]));
      await shellExec(`rm`, [ `-rf`, `${process.cwd()}/temp/${uniqueName}.py` ]);
      await shellExec(`rm`, [ `-rf`, uniqueFolder ]);

      return { svctype, keyName, encpw, id, pwd, bvsd, enctp, enc_url, url, smart_level };
    }
    const naverLogin = (svctype, keyName, encpw, id, pwd, bvsd) => {
      return {
        link: "https://nid.naver.com/nidlogin.login?qqq=" + svctype + "&vdvd=" + keyName + "&zzz=" + encpw + "&id=" + id + "&pwd=" + pwd + "&aaaa=" + global.encodeURIComponent(bvsd),
        func: async function () {
          const { returnGet } = GeneralJs;
          const getObj = returnGet();
          const { qqq: svctype, vdvd: encnm, zzz: encpw, iii: id, kkk: pwd } = getObj;
          const bvsd = window.decodeURIComponent(getObj.aaaa);
          document.getElementById("svctype").value = svctype;
          document.getElementById("encnm").value = encnm;
          document.getElementById("encpw").value = encpw;
          document.getElementById("bvsd").value = bvsd;
          document.getElementById("id").value = id;
          document.getElementById("pw").value = pwd;
          document.querySelector("form").submit();
          return 0;
        }
      }
    }

    let svctype;
    let keyName;
    let encpw;
    let id;
    let pwd;
    let bvsd;
    let response;
    let chainArr;
    let tong;
    let cookie;
    let data;
    let dom;
    let num;
    let tong2;
    let finalTong;

    ({ svctype, keyName, encpw, id, pwd, bvsd } = await extractLoginInfo());
    [ , response ] = await chrome.scriptChain([
      naverLogin(svctype, keyName, encpw, id, pwd, bvsd),
      {
        link: "https://blog.naver.com/PostList.naver?blogId=" + blogId + "&from=postList&categoryNo=" + String(reviewCategoryNumber),
        func: async function () {
          const { sleep, dateToString } = GeneralJs;
          let target, nextButton;
          let pages;
          let pageButtons;
          let tempArr;
          let mother;
          let tong;
          let tempObj;
          let length;
          let past, updated;
          let boo;
          let tongPush;
          let obj;
          let dateArr;

          tongPush = (tong) => {
            tempArr = [ ...document.querySelector('.post_top_title_aggregate_expose').querySelectorAll("td.title") ];
            for (let title of tempArr) {
              mother = title.parentElement;

              tempObj = {};
              obj = {};
              mother.querySelector(".title").querySelector("a").href.split("?")[1].replace(/\??(?:([^=]+)=([^&]*)&?)/g, (origin, name, value) => {
                const decode = (str) => { return window.decodeURIComponent(str.split("+").join(" ")); }
                obj[decode(name)] = decode(value);
              });

              tempObj.id = obj["logNo"];
              tempObj.link = "https://blog.naver.com/" + obj["blogId"] + "/" + tempObj.id;

              dateArr = mother.querySelector(".date").textContent.trim().replace(/\.$/, '').replace(/\. /gi, '-').split('-').map((str) => {
                if (str.length === 1) {
                  return '0' + str;
                } else {
                  return str;
                }
              });
              if (dateArr.length === 3) {
                tempObj.date = dateArr.join('-');
              } else {
                tempObj.date = dateToString(new Date());
              }
              tempObj.read = Number(mother.querySelector(".read").textContent.replace(/[^0-9]/gi, ''));
              tempObj.category = obj["categoryNo"];

              tong.push(tempObj);
            }
          }

          while (!(document.querySelectorAll('.blog2_paginate').length > 0 && document.querySelectorAll('.blog2_paginate')[0].querySelectorAll("a.page").length > 0)) {
            await sleep(100);
          }

          tong = [];
          do {
            pageButtons = document.querySelectorAll('.blog2_paginate')[0].querySelectorAll("a.page");
            length = pageButtons.length;
            tongPush(tong);

            for (let i = 0; i < length; i++) {
              past = document.querySelector('.post_top_title_aggregate_expose').querySelector("td.title");
              pageButtons[i].click();
              while (document.querySelector('.post_top_title_aggregate_expose').querySelector("td.title") === past) {
                await sleep(10);
              }
              pageButtons = document.querySelectorAll('.blog2_paginate')[0].querySelectorAll("a.page");
              tongPush(tong);
            }

            target = document.querySelectorAll('.blog2_paginate')[0];
            boo = target.querySelector(".next") !== null;

            if (boo) {
              past = document.querySelector('.post_top_title_aggregate_expose').querySelector("td.title");
              target.querySelector(".next").click();
              while (document.querySelector('.post_top_title_aggregate_expose').querySelector("td.title") === past) {
                await sleep(10);
              }
            }

          } while (boo);

          return tong;
        }
      }
    ], 500);

    tong = equalJson(JSON.stringify(response));

    // TEST
    tong = tong.slice(0, 5);
    // TEST

    ({ svctype, keyName, encpw, id, pwd, bvsd } = await extractLoginInfo());
    chainArr = [ naverLogin(svctype, keyName, encpw, id, pwd, bvsd) ];

    num = 0;
    for (let { id } of tong) {
      chainArr.push({
        link: "https://blog.naver.com/" + blogId + "/" + id,
        func: async function () {
          let title, tag, sympathy, comment;
          title = document.getElementById("mainFrame").contentWindow.document.getElementById("postListBody").querySelector(".pcol1").textContent.trim();
          tag = Array.from(document.getElementById("mainFrame").contentWindow.document.getElementById('post_footer_contents').querySelector('.wrap_tag').querySelectorAll('a.item')).map((dom) => { return dom.textContent }).map((str) => { return str.replace(/^\#/, '') });
          sympathy = Number(document.getElementById("mainFrame").contentWindow.document.getElementById('post_footer_contents').nextElementSibling.querySelector('.wrap_postcomment').querySelector('.area_sympathy').querySelector('.u_cnt').textContent.replace(/[^0-9]/gi, ''))
          comment = Number(document.getElementById("mainFrame").contentWindow.document.getElementById('post_footer_contents').nextElementSibling.querySelector('.wrap_postcomment').querySelector('.area_comment').querySelector('._commentCount').textContent.trim().replace(/[^0-9]/gi, ''))
          return { title, tag, sympathy, comment };
        }
      })
      num++;
    }

    tong2 = await chrome.scriptChain(chainArr, 500);
    tong2.shift();

    for (let i = 0; i < tong.length; i++) {
      tong[i].title = tong2[i].title;
      tong[i].tag = tong2[i].tag;
      tong[i].sympathy = tong2[i].sympathy;
      tong[i].comment = tong2[i].comment;
    }

    finalTong = [];
    for (let obj of tong) {
      finalTong.push({
        id: obj.id,
        link: obj.link,
        date: stringToDate(obj.date),
        category: obj.category,
        title: obj.title,
        numbers: {
          read: obj.read,
          sympathy: obj.sympathy,
          comment: obj.comment,
        },
        tag: obj.tag,
      });
    }

    console.log(finalTong);

    */



    /*
    // designer fee
    const today = new Date();
    const tenYearsAgo = new Date(today.getFullYear() - 10, today.getMonth(), today.getDate());
    const fourYearsAgo = new Date(today.getFullYear() - 4, today.getMonth(), today.getDate());
    const serviceName = [ "홈퍼니싱", "홈스타일링", "토탈 스타일링", "엑스트라 스타일링" ];
    const levelName = [ "하", "중", "상" ];
    const functionMaker = function (tong) {
      if (!Array.isArray(tong)) {
        throw new Error("invaild input");
      }
      const endLimit = 900;
      const inclinationDownConst = 2;
      const middleConst = 0.55193;
      const inputName = 'x';
      const outputName = 'y';
      let functionScript;
      let middle;
      let pastMiddle;
      let pastAmount;
      let from;
      let inclination;

      functionScript = '';
      pastMiddle = 0;
      pastAmount = 0;
      from = 0;
      for (let { to, amount } of tong) {
        middle = to <= endLimit ? ((from + to) * middleConst) : from;
        functionScript += `} else if (${String(pastMiddle)} <= ${inputName} && ${inputName} < ${String(middle)}) {\n`;
        functionScript += `  ${outputName} = (((${String(amount)} - ${String(pastAmount)}) / (${String(middle)} - ${String(pastMiddle)})) * ${inputName}) + (((${String(pastAmount)} * ${String(middle)}) - (${String(amount)} * ${String(pastMiddle)})) / (${String(middle)} - ${String(pastMiddle)}));\n`;
        if (to > endLimit) {
          functionScript += `} else {\n`;
          functionScript += `  ${outputName} = (${String(inclination / inclinationDownConst)} * ${inputName}) + (${String(amount)} - ${String(from * (inclination / inclinationDownConst))});\n`;
        }
        inclination = (amount - pastAmount) / (middle - pastMiddle);
        from = to;
        pastMiddle = middle;
        pastAmount = amount;
      }

      functionScript = "let " + outputName + ";\n" + functionScript.slice(String("} else ").length) + "}\nreturn Math.round(" + outputName + ");";
      return new Function(inputName, functionScript);
    }
    const projects = await back.getProjectsByQuery({}, { selfMongo: this.MONGOLOCALC });
    const [ project ] = projects;
    let tong;
    let thisFeeFunction;
    let price;
    let y;
    let thisDesignerCareerStart;
    let client, designer;
    let request;
    let pyeong;
    let construct, styling;
    let key;
    let alpha;
    let homeliaison;
    let relationItems;
    let alphaPercentage;
    let newFee, oldFee;
    let num, num2;
    let average;
    let subtract;
    let matrix;
    let sheetsId;

    num = 0;
    average = 0;
    num2 = 0;
    subtract = [];
    matrix = [ [ "고객", "디자이너", "서비스", "평수", "시공", "스타일링", "옛날", "새로운", "차액" ] ]

    for (let project of projects) {

      client = await back.getClientById(project.cliid, { selfMongo: this.MONGOLOCALC });
      [ { request } ] = client.requests;
      pyeong = request.space.pyeong.value;
      y = Number(project.service.serid.split('_')[1].replace(/[^0-9]/gi, '')) - 1;

      for (let { desid, fee } of project.proposal.detail) {
        designer = await back.getDesignerById(desid, { selfMongo: this.MONGOLOCALC });
        ({ construct, styling } = designer.analytics);

        key = (construct.level * 10) + styling.level;

        [ price ] = await back.mongoRead("designerPrice", { key }, { selfMongo: this.MONGOLOCALC });
        tong = [];
        for (let i = 0; i < price.matrix.length; i++) {
          tong.push({
            to: price.standard.x.value[i][1],
            amount: price.matrix[i][y]
          })
        }
        thisFeeFunction = functionMaker(tong);

        thisDesignerCareerStart = new Date(designer.information.business.career.startY, designer.information.business.career.startM - 1, 1);

        alpha = 0;
        alpha += (designer.information.business.career.relatedY >= 4 ? 0.5 : 0);
        alpha += thisDesignerCareerStart.valueOf() <= tenYearsAgo.valueOf() ? 1 : (thisDesignerCareerStart.valueOf() <= fourYearsAgo.valueOf() ? 0.5 : 0);
        alpha += (designer.analytics.project.paperWork.values.includes("3D") ? 0.5 : 0);
        alpha += (designer.analytics.project.paperWork.values.includes("콜라주") ? 0.5 : 0);
        alpha += (designer.analytics.project.paperWork.values.length >= 4 ? 0.5 : 0);

        homeliaison = 0;
        for (let { value } of designer.analytics.etc.personality) {
          if (value) {
            homeliaison = homeliaison + 1;
          }
        }
        relationItems = designer.analytics.etc.relation.items;
        homeliaison += 2 - relationItems.indexOf(designer.analytics.etc.relation.value);
        alpha += (homeliaison * (4.5 / 7));
        alpha += 1;
        alpha += 0.5;

        alphaPercentage = (alpha / 100) + 1;

        newFee = Math.round(alphaPercentage * thisFeeFunction(pyeong) * 10) * 1000 * (1 - fee[0].discount);
        oldFee = fee[0].amount;

        matrix.push([ client.name, designer.designer, serviceName[y], pyeong, levelName[construct.level - 1], levelName[styling.level - 1], oldFee, newFee, newFee - oldFee ]);
        subtract.push(newFee - oldFee);
        average += newFee - oldFee;
        num2++;
      }

      if (num === 900) {
        break;
      }
      num++;
    }

    subtract = subtract.map((num) => { return Math.abs(num) });
    subtract.sort((a, b) => { return b - a; })

    // sheetsId = await sheets.create_newSheets_inPython("새로운 디자이너 비용 계산", "1XrxI7BRC8S9ZZ96ZtJf1cq5T_2rACjQJ");
    sheetsId = "10OjyBrG75gukkUbzeV5wkjgiy9GlLgBft0QI8OvX88g";
    await sheets.setting_cleanView_inPython(sheetsId);
    await sheets.update_value_inPython(sheetsId, "", matrix);
    */


    // push client
    // const cliid = "c2307_ab93s";
    // const kakao = new KakaoTalk();
    // const client = await back.getClientById(cliid, { selfMongo: this.MONGOC });
    // if (client.requests[0].analytics.response.status.value === "응대중" && client.requests[0].analytics.response.action.value === "1차 응대 예정") {
    //   await kakao.sendTalk("pushClient", client.name, client.phone, {
    //     client: client.name,
    //     host: address.frontinfo.host,
    //     path: "curation",
    //     cliid: cliid,
    //   });
    //   await messageSend({ text: client.name + " 고객님께 신청 완료하라고 독촉했어요.", channel: "#404_curation", voice: true });
    // }






    // force client complete
    // const cliid = "c2203_aa35s";
    // await requestSystem("https://" + instance.address.homeinfo.ghost.host + "/styleCuration_updateCalculation", { cliid, coreQuery: {}, historyQuery: {}, mode: "" }, {
    //   headers: {
    //     "Content-Type": "application/json",
    //     "origin": instance.address.homeinfo.ghost.host,
    //   }
    // })



    // await this.MONGOCONSOLEC.connect();
    //
    // const selfMongo = this.MONGOCONSOLEC;
    // const res = await sheets.get_value_inPython("1pfzymPAEjz6Q2G_QIMwQlc7e6Q_FYQkSw4tYIxAkWDk", "default!A2:N77");
    // const collection = "clientHistory";
    // let matrix, history, data, page;
    // let totalHistory;
    // let tong;
    // let tempObj;
    // let historyLengthTong;
    // let historyMaxLength;
    // let newMatrix, tempArr;
    //
    // matrix = res.filter((arr) => { return arr.length > 13 }).map((arr) => { return [ arr[0], arr[arr.length - 1] ] });
    //
    // tong = [];
    // historyLengthTong = [];
    // for (let [ cliid, googleId ] of matrix) {
    //
    //   ({ data } = await requestSystem("https://home-liaison.info:3000/googleLog", { id: googleId }, { headers: { "Content-Type": "application/json" } }));
    //   ([ { curation: { analytics: { page } } } ] = await back.mongoRead(collection, { cliid }, { selfMongo }));
    //
    //   history = equalJson(JSON.stringify(data.history))
    //   totalHistory = page.concat(history.map((obj) => { return { page: obj.page, date: obj.time } }));
    //   totalHistory.sort((a, b) => {
    //     return a.date.valueOf() - b.date.valueOf();
    //   });
    //   historyLengthTong.push(totalHistory.length);
    //
    //   for (let obj of totalHistory) {
    //     if (obj.page.trim() === "styleCuration") {
    //       obj.page = "스타일 찾기";
    //     } else if (obj.page.trim() === "designerProposal") {
    //       obj.page = "디자이너 추천서";
    //     } else if (obj.page.trim() === "universalEstimation") {
    //       obj.page = "계약금 결제";
    //     } else if (obj.page.trim() === "firstMeeting") {
    //       obj.page = "현장 미팅";
    //     } else {
    //       obj.page = obj.page.replace(/\| 홈리에종/gi, '').trim();
    //     }
    //   }
    //
    //   tempObj = {};
    //   tempObj.cliid = cliid;
    //   tempObj.googleId = googleId;
    //   tempObj.name = (await back.getClientById(cliid, { selfMongo: this.MONGOC })).name;
    //   tempObj.history = equalJson(JSON.stringify(totalHistory));
    //
    //   tong.push(tempObj);
    // }
    //
    // historyMaxLength = historyLengthTong.reduce((acc, curr) => { return acc > curr ? acc : curr }, 0);
    //
    // newMatrix = [];
    //
    // tempArr = [];
    // for (let i = 0; i < tong.length; i++) {
    //   tempArr.push(tong[i].name);
    // }
    // newMatrix.push(tempArr);
    //
    //
    // tempArr = [];
    // for (let i = 0; i < tong.length; i++) {
    //   tempArr.push(tong[i].googleId);
    // }
    // newMatrix.push(tempArr);
    //
    //
    // tempArr = [];
    // for (let i = 0; i < tong.length; i++) {
    //   tempArr.push(tong[i].cliid);
    // }
    // newMatrix.push(tempArr);
    //
    //
    // tempArr = [];
    // for (let i = 0; i < tong.length; i++) {
    //   tempArr.push("");
    // }
    // newMatrix.push(tempArr);
    //
    //
    // for (let i = 0; i < historyMaxLength; i++) {
    //
    //
    //   tempArr = [];
    //   for (let j = 0; j < tong.length; j++) {
    //     if (tong[j].history[i] !== undefined) {
    //       tempArr.push(dateToString(tong[j].history[i].date, true));
    //     } else {
    //       tempArr.push("");
    //     }
    //   }
    //   newMatrix.push(tempArr);
    //
    //
    //
    //   tempArr = [];
    //   for (let j = 0; j < tong.length; j++) {
    //     if (tong[j].history[i] !== undefined) {
    //       tempArr.push(tong[j].history[i].page);
    //     } else {
    //       tempArr.push("");
    //     }
    //   }
    //   newMatrix.push(tempArr);
    //
    // }
    //
    // await sheets.update_value_inPython("1pfzymPAEjz6Q2G_QIMwQlc7e6Q_FYQkSw4tYIxAkWDk", "history", newMatrix)
    // console.log(newMatrix);
    //
    // await this.MONGOCONSOLEC.close();





    // const cliid = "c1801_aa01s";
    // const designers = await back.getDesignersByQuery({}, { selfMongo: this.MONGOLOCALC, withTools: true });
    // let res, view;
    //
    // res = await work.designerCuration(cliid, 4, [ "s2011_aa02s" ], { selfMongo: instance.MONGOLOCALC, selfLocalMongo: instance.MONGOLOCALC })
    //
    // console.log(res.map((obj) => { return designers.search(obj.desid).designer }))




    // const RETHINKC = await rethink.connect();
    // let messages;
    //
    // messages = await rethink.rethinkRead("messageLog", {}, { selfRethink: RETHINKC });
    // messages.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });
    // messages = messages.slice(0, 10).map((obj) => { const { channel, date, text } = obj; return { channel, date, text } })
    //
    // console.log(messages);
    //
    //
    // await RETHINKC.close();




    /*

    const sheetsId = "1MBd0Z9W6-T9WzEpIZ1EGevOZOWUAA_MxpFRaDfHVor4";
    const zeroAddition = num => (num < 10 ? `0${String(num)}` : String(num));
    const selfMongo = this.MONGOLOCALC;
    const clientHistories = await back.mongoRead("clientHistory", {}, { selfMongo });
    const clients = await back.getClientsByQuery({}, { selfMongo, withTools: true });
    const projects = await back.getProjectsByQuery({}, { selfMongo, withTools: true });
    let target;
    let timeline, sendTime, betweenLength;
    let tempArr;
    let targetClients;
    let startDate, endDate;
    let matrix, matrixFactor;
    let proposalClient;
    let tempTime, timeSum;
    let thisProject;
    let firstDate;
    let totalLength;
    let totalSum;
    let contractClient;

    for (let client of clients) {
      for (let history of clientHistories) {
        if (history.cliid === client.cliid) {
          client.history = history;
        }
      }
    }

    for (let z = 7; z < 12; z++) {

      startDate = new Date(2021, z, 1);
      endDate = new Date(2021, z + 1, 1);

      targetClients = [];
      for (let client of clients) {
        if (client.requests[0].request.timeline >= startDate && client.requests[0].request.timeline < endDate) {
          targetClients.push(client);
        }
      }

      matrix = [ [ "성함", "아이디", "문의일", "제안일", "제안 시간 (단위: 시간)", "성공 여부", "성공일", "과정 시간 (단위: 시간)" ] ];
      proposalClient = [];
      timeSum = 0;
      contractClient = [];
      totalSum = 0;
      for (let target of targetClients) {
        timeline = target.requests[0].request.timeline;
        sendTime = null;
        if (target.history !== undefined) {
          if (target.history.curation.analytics.send.length !== 0) {
            tempArr = copyJson(target.history.curation.analytics.send);
            tempArr = tempArr.filter((obj) => { return obj.page === "designerProposal" });
            if (tempArr.length !== 0) {
              tempArr.sort((a, b) => { return a.date.valueOf() - b.date.valueOf() });
              sendTime = tempArr[0].date;
            }
          }
        }

        betweenLength = null;
        if (sendTime !== null) {
          betweenLength = sendTime.valueOf() - timeline.valueOf();
        }

        if (betweenLength !== null) {
          if (betweenLength >= 0) {

            tempTime = Math.round(((betweenLength / 1000) / 60) / 60);
            timeSum += tempTime;
            proposalClient.push(target);

            thisProject = projects.searchByCliid(target.cliid, true);
            if (thisProject.length === 0) {
              thisProject = null;
              firstDate = null;
              totalLength = null;
            } else {
              contractClient.push(target);
              thisProject = thisProject[0];
              firstDate = thisProject.process.contract.first.date;
              totalLength = firstDate.valueOf() - timeline.valueOf();
              totalLength = Math.round(((totalLength / 1000) / 60) / 60);
              totalSum += totalLength;
            }

            matrix.push([ target.name, target.cliid, dateToString(timeline, true), dateToString(sendTime, true), tempTime, (thisProject !== null ? 'O' : 'X'), (firstDate !== null ? dateToString(firstDate, true) : '-'), (totalLength !== null ? totalLength : '-') ]);

          }
        }
      }

      matrix.push([ '', '', '', '', '', '', '', '' ]);

      if (targetClients.length !== 0) {
        matrix.push([ "제안률", "단위: %", '', Math.floor((proposalClient.length / targetClients.length) * 10000) / 100, '', '', '', '' ])
        matrix.push([ "제안 시간 평균", "단위: 시간", '', Math.floor((timeSum / proposalClient.length) * 100) / 100, '', '', '', '' ])
        matrix.push([ "성공률", "단위: %", '', Math.floor((contractClient.length / targetClients.length) * 10000) / 100, '', '', '', '' ])
        matrix.push([ "과정 시간 평균", "단위: 시간", '', Math.floor((totalSum / contractClient.length) * 100) / 100, '', '', '', '' ])
      }

      await sheets.update_value_inPython(sheetsId, String(startDate.getFullYear()) + zeroAddition(startDate.getMonth() + 1), matrix);
      console.log(matrix);

    }

    */






    // const WebSocket = require("ws");
    // const url = "wss://" + this.address.officeinfo.ghost.host + ":5000/general";
    // const ws = new WebSocket(url);
    // ws.on("open", () => {
    //   ws.on("message", (raw) => {
    //     console.log(raw);
    //   })
    // });

    /*
    const scheduleDummyDataPatch = async () => {
      let dummy, dummyCopied;
      let whereQuery, updateQuery;

      dummy = {
        analytics: {
          make: [],
          page: [],
          update: [],
          send: [],
        },
        progress: {
          start: new Date(),
          complete: new Date(1800, 0, 1),
          send: new Date(1800, 0, 1),
        },
        contents: {
          title: "배창규 고객님 상세 일정표",
          description: "",
          color: "",
        },
        date: {
          start: new Date(),
          end: new Date(2022, 1, 7),
        },
        children: [
          {
            date: {
              start: new Date(2021, 11, 2),
              end: new Date(2021, 11, 10)
            },
            contents: {
              title: "1차 제안",
              description: "평균 2주의 작업 시간이 소요됩니다. 배치도, 제품 리스트 등의 기본 제공 사항은 동일하지만, 각 디자이너가 가장 잘할 수 있는 방식으로 일합니다.",
              color: "#f05a24",
            }
          },
          {
            date: {
              start: new Date(2021, 11, 6),
              end: new Date(2021, 11, 15)
            },
            contents: {
              title: "수정 제안",
              description: "1~2회 정도 수정을 거쳐 고객님만의 맞춤 디자인이 확정됩니다. 고객님의 의견을 솔직하고 명확하게 공유해주세요!",
              color: "#29aae1",
            }
          },
          {
            date: {
              start: new Date(2021, 11, 12),
              end: new Date(2021, 11, 25)
            },
            contents: {
              title: "구매 리스트 제공",
              description: "제품 스펙과 함께 금액과 구매처를 안내드립니다. 구매처는 온라인 링크 또는 쇼룸 방문에 대한 정보를 제공합니다",
              color: "#8bc53f",
            }
          },
          {
            date: {
              start: new Date(2021, 11, 30),
              end: new Date(2022, 0, 10)
            },
            contents: {
              title: "제작 가구 발주",
              description: "패브릭과 가구를 제작하실 때에는 디자이너님이 직접 발주합니다. 결제는 상황에 따라 고객님이 업체로 지불하시거나 디자이너가 수령하여 발주와 함께 진행합니다.",
              color: "#faaf3b",
            }
          },
        ]
      };

      await instance.MONGOCONSOLEC.connect();

      await instance.MONGOCONSOLEC.db(`miro81`).collection(`projectHistory`).updateMany({}, {
        $set: {
          schedule: {
            analytics: {
              make: [],
              page: [],
              update: [],
              send: [],
            },
            progress: {
              start: new Date(1800, 0, 1),
              complete: new Date(1800, 0, 1),
              send: new Date(1800, 0, 1),
            },
            contents: {
              title: "",
              description: "",
              color: "",
            },
            date: {
              start: new Date(1800, 0, 1),
              end: new Date(1800, 0, 1),
            },
            children: []
          }
        }
      });

      whereQuery = { proid: "p1801_aa01s" }
      dummyCopied = equalJson(JSON.stringify(dummy));
      updateQuery = {};
      updateQuery["schedule"] = dummyCopied;
      console.log(whereQuery, updateQuery);
      await instance.MONGOCONSOLEC.db(`miro81`).collection(`projectHistory`).updateOne(whereQuery, { $set: updateQuery });

      whereQuery = { proid: "p1801_aa02s" }
      dummyCopied = equalJson(JSON.stringify(dummy));
      dummyCopied.progress.complete = new Date(2021, 11, 30);
      dummyCopied.contents.title = "리에종 고객님 상세 일정표";
      updateQuery = {};
      updateQuery["schedule"] = dummyCopied;
      console.log(whereQuery, updateQuery);
      await instance.MONGOCONSOLEC.db(`miro81`).collection(`projectHistory`).updateOne(whereQuery, { $set: updateQuery });

      whereQuery = { proid: "p1902_aa01s" }
      dummyCopied = equalJson(JSON.stringify(dummy));
      dummyCopied.progress.complete = new Date(2021, 11, 30);
      dummyCopied.progress.send = new Date(2021, 11, 31);
      dummyCopied.contents.title = "임경원 고객님 상세 일정표";
      updateQuery = {};
      updateQuery["schedule"] = dummyCopied;
      console.log(whereQuery, updateQuery);
      await instance.MONGOCONSOLEC.db(`miro81`).collection(`projectHistory`).updateOne(whereQuery, { $set: updateQuery });

      await instance.MONGOCONSOLEC.close();
    }
    await scheduleDummyDataPatch();
    */






























    // console.log(await bill.matrixToRequest(`${process.cwd()}/temp/test.xlsx`));
    // const selfPythonMongo = this.MONGOLOCALC;
    // const selfCoreMongo = this.MONGOLOCALC;
    // const proidArr = [
    //   "p1801_aa01s",
    //   "p2109_aa34s",
    //   "p2110_aa26s",
    //   "p2109_aa50s",
    //   "p2109_aa30s",
    //   "p2110_aa02s",
    //   "p2108_aa45s",
    //   "p2109_aa65s",
    // ]
    // for (let proid of proidArr) {
    //   await bill.requestInvoice("u2111_aa01s", proid, `${process.cwd()}/temp/test.xlsx`, { selfMongo: selfPythonMongo, selfCoreMongo });
    // }












    /*


    const selfMongo = this.MONGOLOCALC;
    const selfPythonMongo = this.MONGOLOCALC;
    const sheetsId = "1OFnDHF0ZI4OyDfAsF_qGOSxOouxtwLw8zlSsbj4ymY0";
    const projects = await back.getProjectsByQuery({
      $and: [
        { "desid": { $regex: "^d" } },
        { "process.contract.first.date": { $gte: new Date(2000, 0, 1) } }
      ]
    }, { selfMongo });
    const clients = await back.getClientsByQuery({ $or: projects.toNormal().map((obj) => { return { cliid: obj.cliid } }) }, { selfMongo, withTools: true });
    const targetProjectsProid = projects.toNormal().map((obj) => { return obj.proid }).map((proid) => { return { "links.proid": proid } });
    const targetBills = await back.mongoRead("generalBill", { $or: targetProjectsProid }, { selfMongo: selfPythonMongo });
    const targetRequests = targetBills.map((obj) => { for (let request of obj.requests) { request.proid = obj.links.proid; request.cliid = obj.links.cliid; } return obj.requests });
    const requestMatrix_raw = targetRequests.flat();
    const requestMatrix = requestMatrix_raw.map((obj) => { return { proid: obj.proid, cliid: obj.cliid, name: obj.name, status: obj.status, pay: obj.pay, proofs: obj.proofs } }).filter((obj) => { return obj.proofs.length !== 0 });
    let client, finalMatrix, tempArr;

    requestMatrix.sort((a, b) => {
      return a.proid > b.proid ? 1 : -1;
    });

    finalMatrix = [];
    for (let obj of requestMatrix) {
      client = clients.search(obj.cliid);
      obj.client = client.name;

      for (let i = 0; i < obj.proofs.length; i++) {
        obj.proofs[i].amount = obj.pay[Math.floor(i / 2)].amount;
      }

      obj.proofs.sort((a, b) => { return a.date.valueOf() - b.date.valueOf(); });

      for (let { date, amount, method, proof, to } of obj.proofs) {
        tempArr = [];
        tempArr.push(client.name);
        tempArr.push(obj.cliid);
        tempArr.push(obj.proid);
        tempArr.push(obj.name);
        tempArr.push(amount);
        tempArr.push(dateToString(date));
        tempArr.push(method);
        tempArr.push(proof);
        tempArr.push(to);
        finalMatrix.unshift(tempArr);
      }
    }

    finalMatrix.unshift([
      "성함",
      "C id",
      "P id",
      "대상",
      "결제 금액",
      "결제 날짜",
      "결제 방법",
      "증빙",
      "수신자"
    ]);

    await sheets.update_value_inPython(sheetsId, "default", finalMatrix);
    console.log(finalMatrix);


    */







    /*
    const forecastProject = {
      structure: {
        proid: "",
        cliid: "",
        desid: "",
        service: {
          serid: "",
          xValue: "",
          online: false,
        },
        proposal: {
          status: "",
          date: new Date(1800, 0, 1),
          detail: [],
        },
        process: {
          status: "대기",
          action: "계약금 안내",
          detail: [],
          outreason: [],
          call: {
            next: new Date(1800, 0, 1),
            history: [],
          },
          contract: {
            first: {
              guide: new Date(1800, 0, 1),
              date: new Date(1800, 0, 1),
              cancel: new Date(1800, 0, 1),
              calculation: {
                amount: 0,
                info: {
                  method: "",
                  proof: "",
                  to: "",
                },
                refund: 0,
              },
            },
            remain: {
              guide: new Date(1800, 0, 1),
              date: new Date(1800, 0, 1),
              cancel: new Date(1800, 0, 1),
              calculation: {
                amount: {
                  supply: 0,
                  vat: 0,
                  consumer: 0,
                },
                info: {
                  method: "",
                  proof: "",
                  to: "",
                },
                refund: 0,
              },
            },
            form: {
              id: "",
              guide: new Date(1800, 0, 1),
              date: {
                from: new Date(1800, 0, 1),
                to: new Date(1800, 0, 1),
                cancel: new Date(1800, 0, 1),
              }
            },
            meeting: {
              date: new Date(1800, 0, 1),
              pastDesigners: []
            },
          },
          design: {
            proposal: {
              provided: false,
              limit: null,
              detail: []
            },
            construct: {
              provided: false,
              partner: "",
              detail: [
                {
                  status: "",
                  request: new Date(1800, 0, 1),
                  estimate: [],
                  contract: {
                    partner: "",
                    form: {
                      id: "",
                      guide: new Date(1800, 0, 1),
                      date: {
                        from: new Date(1800, 0, 1),
                        to: new Date(1800, 0, 1),
                        cancel: new Date(1800, 0, 1),
                      }
                    },
                    payments: [
                      {
                        guide: new Date(1800, 0, 1),
                        date: new Date(1800, 0, 1),
                        cancel: new Date(1800, 0, 1),
                        calculation: {
                          amount: 0,
                          info: {
                            method: "",
                            proof: "",
                            to: "",
                          },
                          refund: 0,
                        },
                      }
                    ],
                  }
                }
              ],
            },
            purchase: {
              provided: false,
              detail: [],
            },
          },
          calculation: {
            method: "",
            percentage: 0,
            info: {
              account: "",
              proof: "",
              to: "",
            },
            payments: {
              totalAmount: 0,
              first: {
                amount: 0,
                date: new Date(1800, 0, 1),
                cancel: new Date(1800, 0, 1),
                refund: 0,
              },
              remain: {
                amount: 0,
                date: new Date(1800, 0, 1),
                cancel: new Date(1800, 0, 1),
                refund: 0,
              }
            }
          },
        },
        contents: {
          conid: "",
          photo: {
            boo: true,
            status: "세팅 대기",
            date: new Date(3800, 0, 1),
            info: {
              photographer: "미정",
              interviewer: "미정",
            }
          },
          raw: {
            portfolio: {
              status: "해당 없음",
              link: "",
            },
            interview: {
              status: "해당 없음",
              link: "",
            },
            photo: {
              status: "해당 없음",
              link: "",
            },
          },
          share: {
            client: {
              photo: new Date(3800, 0, 1),
              contents: new Date(3800, 0, 1),
            },
            designer: {
              photo: new Date(3800, 0, 1),
              contents: new Date(3800, 0, 1),
            }
          },
          sns: {
            portfolio: {
              long: new Date(3800, 0, 1),
              short: new Date(3800, 0, 1),
            },
            interview: {
              long: new Date(3800, 0, 1),
              short: new Date(3800, 0, 1),
            },
          }
        },
      }
    };
    */


    // const selfMongo = this.MONGOC;
    // const projects = await back.getProjectsByQuery({}, { selfMongo });
    // let whereQuery, updateQuery;
    //
    // for (let project of projects) {
    //   whereQuery = { proid: project.proid };
    //   updateQuery = {};
    //   updateQuery["process.design.construct.partner"] = "";
    //   await selfMongo.db(`miro81`).collection(`project`).updateOne(whereQuery, { $set: updateQuery });
    //   console.log(whereQuery, updateQuery);
    // }



    // console.log(projects[100].process.toNormal());







    // let note, targetArr;
    // let level1Index;
    // let tempArr, tempObj;
    // let checklist;
    // let final;
    // let updateQuery;
    //
    // note = new AppleNotes({ folder: "checklist", subject: "photoSetting" });
    // targetArr = await note.readNote();
    //
    // targetArr = targetArr.map((str) => {
    //   return str.replace(/\[/gi, "<b%").replace(/\]/gi, "%b>");
    // });
    //
    // level1Index = [];
    // for (let i = 0; i < targetArr.length; i++) {
    //   if (/^_/.test(targetArr[i].trim())) {
    //     level1Index.push(i);
    //   }
    // }
    //
    // level1Index.push(targetArr.length);
    // checklist = [];
    // for (let i = 0; i < level1Index.length - 1; i++) {
    //   tempArr = [];
    //   for (let j = level1Index[i] + 1; j < level1Index[i + 1]; j++) {
    //     if (j % 2 !== level1Index[i] % 2) {
    //       tempObj = {};
    //       tempObj.title = targetArr[j].replace(/^T\. /i, '').trim();
    //     } else {
    //       tempObj.contents = targetArr[j].replace(/^C\. /i, '').trim();
    //       tempArr.push(tempObj);
    //     }
    //   }
    //   checklist.push({
    //     title: targetArr[level1Index[i]].replace(/^_[0-9][0-9]? /i, ''),
    //     children: tempArr
    //   });
    // }
    //
    // final = {
    //   key: targetArr[0],
    //   date: new Date(),
    //   kind: "checklist",
    //   setting: {
    //     target: {
    //       collection: targetArr[2],
    //       action: targetArr[3].trim().split(',').map((str) => { return str.trim(); }).filter((str) => { return str !== ''; }),
    //     },
    //     contents: {
    //       title: targetArr[1],
    //       checklist
    //     }
    //   }
    // };
    //
    // updateQuery = {};
    // updateQuery.key = final.key;
    // updateQuery.kind = final.kind;
    // updateQuery.setting = final.setting;
    //
    // await back.createService(updateQuery, { selfMongo: this.MONGOC })
    //
    // console.log(updateQuery);





    // const tree = await treeParsing(process.env.HOME + "/samba");
    // const bashScript = (tree.flatDeath.map((obj) => { return obj.absolute; }).filter((i) => { return /\/\.\_/gi.test(i); }).map((str) => {
    //   return "rm -rf " + shellLink(str) + ';';
    // }).join("\n"));
    // await fileSystem(`write`, [ `${process.cwd()}/temp/remove.sh`, bashScript ]);





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






    


    



    // const url = "https://centrex.uplus.co.kr/RestApi/setringcallback";
    // const { officeinfo: { phone: { numbers: phoneNumbers, password: pass } } } = this.address;
    // let id;
    // let callbackurl;
    // let callbackhost;
    // let callbackport;
    // let num;
    // phoneNumbers.push("0220392252")
    // num = 0;
    // for (let id of phoneNumbers) {
    //   callbackurl = "/receiveCall.php";
    //   callbackhost = "13.125.244.81";
    //   callbackport = 80;
    //   console.log(url + "?id=" + global.encodeURIComponent(id) + "&pass=" + pass + "&callbackurl=" + global.encodeURIComponent(callbackurl) + "&callbackhost=" + global.encodeURIComponent(callbackhost) + "&callbackport=" + String(callbackport));
    //   // console.log(((url + "?id=" + id + "&pass=" + pass + "&callbackurl=" + callbackurl + "&callbackhost=" + callbackhost + "&callbackport=" + String(callbackport), { id, pass, callbackurl, callbackhost, callbackport: String(callbackport) }, { headers: { "Content-Type": "application/json" } })));
    //   num++;
    // }

    // const url = "https://centrex.uplus.co.kr/RestApi/getringcallback";
    // const { officeinfo: { phone: { numbers: phoneNumbers, password: pass } } } = this.address;
    // let id;
    // let num;
    // phoneNumbers.push("0220392252")
    // console.log(phoneNumbers);
    // num = 0;
    // for (let id of phoneNumbers) {
    //   console.log(url + "?id=" + id + "&pass=" + pass);
    //   // console.log((await requestSystem(url + "?id=" + id + "&pass=" + pass, { id, pass }, { headers: { "Content-Type": "application/json" } })).data);
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








    // const selfMongo = new mongo(mongoconsoleinfo);
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

    const MONGOC = new mongo(mongoconsoleinfo);
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
    // res = await requestSystem("https://home-liaison.serveftp.com:3000/submit", resultObj, { "Content-Type": "application/json" });
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



    
    await this.MONGOC.close();
    await this.MONGOLOCALC.close();
    console.log(`done`);

  } catch (e) {
    console.log(e);
    console.log(e?.response?.data);
    await this.MONGOC.close();
    console.log(`error`);
  }
}

DevContext.prototype.printSpotsGraph = async function (matrix) {
  if (!Array.isArray(matrix)) {
    throw new Error("invaild input");
  }
  if (!matrix.every((arr) => { return Array.isArray(arr) })) {
    throw new Error("invaild input");
  }
  if (!matrix.every((arr) => { return arr.length === 2 })) {
    throw new Error("invaild input");
  }
  const instance = this;
  const { fileSystem, shellLink, shellExec, uniqueValue } = this.mother;
  try {
    const first = `<head><meta charset="utf-8"><style media="screen">*{margin:0;padding:0}</style></head><body><script src="https://www.desmos.com/api/v1.6/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6"></script><div id="calculator" style="width: 100vw; height: 100vh;"></div><script>const calculator = Desmos.GraphingCalculator(document.getElementById('calculator'));\n`;
    const end = `\n</script></body>`;
    let middle, fileName, num;

    middle = '';
    num = 0;
    for (let arr of matrix) {
      middle += `calculator.setExpression({ id: 'spot${String(num)}', latex: '(${String(arr[0])}, ${String(arr[1])})' });\n`;
      num++;
    }

    fileName = "graph_" + uniqueValue("hex") + ".html";
    await fileSystem(`write`, [ process.cwd() + "/temp/" + fileName, (first + middle + end) ]);
    await shellExec(`open ${shellLink(process.cwd() + "/temp/" + fileName)}`);

  } catch (e) {
    console.log(e);
  }
}

DevContext.prototype.pureScript = function () {
  const instance = this;
  const deleteToken = "__delete__";
  const motherTargets = [
    "fileSystem",
    "shellExec",
    "shellLink",
    "sleep",
    "equalJson",
    "copyJson",
    "dateToString",
    "stringToDate",
    "pureServer",
    "requestSystem",
    "binaryRequest",
    "cryptoString",
    "decryptoHash",
    "uniqueValue",
    "setQueue"
  ];
  const deleteFilter = (str) => { return str.split("\n").map((s) => { return s.replace((new RegExp("^  " + deleteToken, "gi")), ""); }).join("\n"); }
  let script;
  let backMakerScript, addressScript;
  let motherScript;

  script = `const PureServer = function () {
  ${deleteToken}  const Mother = require(process.cwd() + "/apps/mother.js");
  ${deleteToken}  this.mother = new Mother();
  ${deleteToken}}

  ${deleteToken}PureServer.prototype.launching = ${this.pureServer.toString()}

  ${deleteToken}const app = new PureServer();
  ${deleteToken}app.launching().catch((err) => { console.log(err); });`;

  backMakerScript = `const BackMaker = function () {}
  ${deleteToken}module.exports = BackMaker;`;

  addressScript = `module.exports = {};`;

  motherScript = "const Mother = function () {}\n\n";
  for (let name of motherTargets) {
    motherScript += `Mother.prototype.${name} = ${Mother.prototype[name].toString()}\n\n`;
  }
  motherScript += `module.exports = Mother;`;

  return {
    script: deleteFilter(script),
    backMakerScript: deleteFilter(backMakerScript),
    addressScript: deleteFilter(addressScript),
    motherScript,
  };
}

DevContext.prototype.pureServer = async function () {
  const instance = this;
  const { pureServer, shellExec, shellLink, fileSystem, setQueue } = this.mother;
  const NativeNotifier = require(process.cwd() + "/apps/nativeNotifier/nativeNotifier.js");
  const notifier = new NativeNotifier();
  const axios = require(`axios`);
  const os = require(`os`);
  let osType;
  if (/Darwin/gi.test(os.type().trim())) {
    osType = "mac";
  } else {
    osType = "windows";
  }
  try {

    const PureServer = pureServer("class");
    const app = new PureServer();

    app.get("/", async (req, res) => {
      try {
        res.send(JSON.stringify({ message: "It works!" }));
      } catch (e) {
        console.log(e);
      }
    });

    app.get("/update", async (req, res) => {
      try {
        shellExec(`cd ${shellLink(process.cwd())};git pull;`).then(() => {
          setQueue(() => { process.kill(); });
        }).catch((err) => {
          console.log(err);
        });
        res.send(JSON.stringify({ message: "will do" }));
      } catch (e) {
        console.log(e);
      }
    });

    app.get("/check", async (req, res) => {
      try {
        let inner, result, ip;
        inner = [];
        tempObj = os.networkInterfaces();
        for (let i in tempObj) {
          inner = inner.concat(tempObj[i]);
        }
        inner = inner.filter((i) => { return /4/gi.test(i.family) && !/127\.0\.0\.1/gi.test(i.address); });
        const { data } = await axios.get("https://icanhazip.com");
        ip = data.replace(/[^0-9\.]/gi, '').trim();
        result = { os: osType, ip, inner };
        res.send(JSON.stringify(result));
      } catch (e) {
        console.log(e);
      }
    });

    app.post("/push", async (req, res) => {
      try {
        if (typeof req.body.text !== "string") {
          throw new Error("invaild post, must be text");
        }
        notifier.sendAlarm(String(req.body.text).trim()).catch((err) => { console.log(err); });
        res.send(JSON.stringify({ message: "will do" }));
      } catch (e) {
        res.send(JSON.stringify({ message: "error" }));
      }
    });

    app.post("/alert", async (req, res) => {
      try {
        if (typeof req.body.text !== "string") {
          throw new Error("invaild post, must be text");
        }
        notifier.alertAlarm(String(req.body.text).trim()).catch((err) => { console.log(err); });
        res.send(JSON.stringify({ message: "will do" }));
      } catch (e) {
        res.send(JSON.stringify({ message: "error" }));
      }
    });

    app.post("/prompt", async (req, res) => {
      try {
        if (typeof req.body.text !== "string") {
          throw new Error("invaild post, must be text");
        }
        let input;
        input = await notifier.sendPrompt(String(req.body.text).trim());
        if (typeof input !== "string") {
          input = "";
        } else {
          input = input.trim();
        }
        res.send(JSON.stringify({ message: input }));
      } catch (e) {
        res.send(JSON.stringify({ message: "error" }));
      }
    });

    pureServer("listen", app, 8000);

  } catch (e) {
    console.log(e);
  }
}

DevContext.prototype.serviceChildren = async function () {
  const instance = this;
  const { shellExec, shellLink, fileSystem, equalJson, uniqueValue } = this.mother;
  try {
    const serverName = "homeliaisonpureserver";
    const gitHostName = "git@gitlab.com:uragen/homeliaisonpureserver.git";
    const home = process.env.HOME;
    const { script, backMakerScript, addressScript, motherScript } = this.pureScript();
    const copiedModules = [
      "nativeNotifier"
    ];
    const package = equalJson(await fileSystem(`readString`, [ `${process.cwd()}/package.json` ]));

    package.name = "pure";
    package.main = "index.js";
    package.scripts = {};
    delete package.devDependencies;
    delete package.dependencies["express"];
    delete package.dependencies["express-useragent"];
    delete package.dependencies["multer"];
    delete package.dependencies["shelljs"];

    if (await fileSystem(`exist`, [ `${home}/.${serverName}` ])) {
      try {
        await shellExec(`rm`, [ `-rf`, `${home}/.${serverName}` ]);
      } catch (e) {
        await shellExec(`rm`, [ `-rf`, `${home}/.${serverName}` ]);
      }
    }

    await shellExec(`cd ${shellLink(home)};git clone ${gitHostName}`);
    await shellExec(`mv`, [ `${home}/${serverName}`, `${home}/.${serverName}` ]);
    await shellExec(`rm`, [ `-rf`, `${home}/.${serverName}/apps` ]);
    await shellExec(`mkdir`, [ `${home}/.${serverName}/apps` ]);
    await shellExec(`mkdir`, [ `${home}/.${serverName}/apps/backMaker` ]);
    await shellExec(`mkdir`, [ `${home}/.${serverName}/temp` ]);
    await fileSystem(`write`, [ `${home}/.${serverName}/apps/mother.js`, motherScript ]);
    await fileSystem(`write`, [ `${home}/.${serverName}/apps/infoObj.js`, addressScript ]);
    await fileSystem(`write`, [ `${home}/.${serverName}/apps/backMaker/backMaker.js`, backMakerScript ]);
    await fileSystem(`write`, [ `${home}/.${serverName}/index.js`, script ]);
    await fileSystem(`write`, [ `${home}/.${serverName}/.gitignore`, (await fileSystem(`readString`, [ `${process.cwd()}/.gitignore` ])) ]);
    await fileSystem(`write`, [ `${home}/.${serverName}/package.json`, JSON.stringify(package, null, 2) ]);
    for (let m of copiedModules) {
      await shellExec(`cp -r ${shellLink(process.cwd())}/apps/${m} ${shellLink(home)}/.${serverName}/apps;`);
    }
    await shellExec(`cd ${home}/.${serverName};npm install;git add -A;git commit -m "${serverName}_${uniqueValue("string")}";git push;pm2 kill;pm2 start ./index.js;`);

  } catch (e) {
    console.log(e);
  }
}

DevContext.prototype.pureScan = async function () {
  const instance = this;
  const back = this.back;
  const { requestSystem, equalJson, copyJson, ipCheck } = this.mother;
  const { address } = this;
  const port = 8000;
  const limitNumber = 101;
  const protocol = "http:";
  const innerIpConst = "172.30.1";
  const routerConst = "check";
  const time = 1500;
  class AliveMembers extends Array {
    constructor(arr) {
      super();
      for (let obj of arr) {
        this.push(obj);
      }
      Object.defineProperty(this, "port", {
        value: port,
        writable: false,
        configurable: false,
        enumerable: false
      });
      Object.defineProperty(this, "protocol", {
        value: protocol,
        writable: false,
        configurable: false,
        enumerable: false
      });
    }
    setUrl(router) {
      if (typeof router !== "string") {
        throw new Error("invaild input");
      }
      if (!/^\//.test(router)) {
        router = '/' + router;
      }
      const { protocol, port } = this;
      let arr;
      arr = [];
      for (let obj of this) {
        if (obj.online !== null) {
          arr.push({ url: protocol + "//" + obj.online.ip + ":" + String(port) + router, who: obj });
        }
      }
      return arr;
    }
    async aliveRequest(router, data = {}, roles = null) {
      if (typeof router !== "string" || typeof data !== "object") {
        throw new Error("invaild input");
      }
      if (!/^\//.test(router)) {
        router = '/' + router;
      }
      const axios = require('axios');
      const { protocol } = this;
      try {
        let method, dataKeys, urls, result, response;

        dataKeys = Object.keys(data);
        if (dataKeys.length === 0) {
          method = "get";
        } else {
          method = "post";
        }

        urls = this.setUrl(router);
        result = [];

        if (method === "get") {
          for (let { url, who } of urls) {
            response = await axios.get(url);
            if (response.status >= 200 && response.status < 300 && response.data !== undefined) {
              result.push({ data: response.data, who });
            }
          }
        } else {
          for (let { url, who } of urls) {
            response = await axios.post(url, data, { headers: { "Content-Type": "application/json" } });
            if (response.status >= 200 && response.status < 300 && response.data !== undefined) {
              result.push({ data: response.data, who });
            }
          }
        }

        return result;
      } catch (e) {
        console.log(e);
      }
    }
  }
  try {
    const { rawObj: { map } } = await ipCheck();
    const macArr = map.map((obj) => { return obj.mac; });
    const members = await back.setMemberObj({ getMode: true });
    const arpScan = () => {
      let results;
      results = [];
      for (let i = 1; i < limitNumber; i++) {
        requestSystem(`${protocol}//${innerIpConst}.${String(i)}:${String(port)}/${routerConst}`).then((res) => {
          if (typeof res === "object") {
            if (res.status >= 200 && res.status < 300 && typeof res.data === "object") {
              results.push(res.data);
            }
          }
        }).catch((err) => {});
      }
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(results);
        }, time);
      });
    }
    const results = await arpScan();
    let total, index, onoff;

    total = [];
    for (let { os, ip, inner } of results) {
      for (let { address, mac } of inner) {
        total.push({
          os,
          ip: {
            outer: ip,
            inner: address
          },
          mac
        });
      }
    }

    total = total.map((obj) => { return JSON.stringify(obj); });
    total = [ ...new Set(total) ].map((json) => { return equalJson(json); });
    total = total.filter((obj) => { return macArr.includes(obj.mac); });

    for (let obj of total) {
      index = map.findIndex((m) => { return m.mac === obj.mac; });
      if (index === -1) {
        throw new Error("invaild map");
      }
      obj.memid = map[index].memid;
    }

    onoff = new AliveMembers(members.filter((obj) => { return obj.alive; }).map((obj) => {
      delete obj.death;
      delete obj.photo;
      obj.online = null;
      return obj;
    }));
    for (let obj of total) {
      for (let member of onoff) {
        if (member.id === obj.memid) {
          member.online = {
            os: obj.os,
            ip: obj.ip.inner,
            mac: obj.mac
          };
        }
      }
    }

    return onoff;
  } catch (e) {
    console.log(e);
  }
}

DevContext.prototype.calendarSync = async function () {
  const instance = this;
  const back = this.back;
  try {
    await this.MONGOLOCALC.connect();

    const selfMongo = this.MONGOLOCALC;
    const today = new Date();
    const standardDay = new Date();
    const pastConst = 3;
    standardDay.setDate(standardDay.getDate() - pastConst);
    const calendar = new GoogleCalendar();
    let projects, from;
    let clients, designers;
    let client, designer;
    let list;

    from = "photographing";
    projects = await back.getProjectsByQuery({
      $and: [
        { "desid": { $regex: "^d" } },
        { "contents.photo.date": { $gt: standardDay } },
        { "contents.photo.date": { $lt: new Date(3000, 0, 1) } },
      ]
    }, { selfMongo });

    if (projects.length > 0) {
      clients = await back.getClientsByQuery({
        $or: [ ...new Set(projects.toNormal().map((pr) => { return pr.cliid; })) ].map((c) => { return { cliid: c } }),
      }, { selfMongo });
      designers = await back.getDesignersByQuery({
        $or: [ ...new Set(projects.toNormal().map((pr) => { return pr.desid; })) ].map((c) => { return { desid: c } }),
      }, { selfMongo });

      for (let project of projects) {
        if (!/디자이너/gi.test(project.contents.photo.info.photographer) && !/고객/gi.test(project.contents.photo.info.photographer)) {
          client = clients.toNormal().find((obj) => { return obj.cliid === project.cliid });
          designer = designers.toNormal().find((obj) => { return obj.desid === project.desid });
          title = `촬영 W ${client.name}C ${designer.designer}D ${project.contents.photo.info.photographer}P ${project.contents.photo.info.interviewer}I ${project.proid}`;
          list = await calendar.listEvents(from, project.proid);
          if (list.length > 0) {
            await calendar.updateSchedule(from, list[0].eventId, { start: project.contents.photo.date.toNormal(), title });
            console.log(`${project.proid} photo schedule update : ${title}`);
          } else {
            await calendar.makeSchedule(from, title, '', project.contents.photo.date.toNormal());
            console.log(`${project.proid} photo schedule create : ${title}`);
          }
        }
      }
    }

    from = "designerMeeting";
    projects = await back.getProjectsByQuery({
      $and: [
        { "desid": { $regex: "^d" } },
        { "process.contract.meeting.date": { $gt: standardDay } },
        { "process.contract.meeting.date": { $lt: new Date(3000, 0, 1) } },
      ]
    }, { selfMongo });

    if (projects.length > 0) {

      clients = await back.getClientsByQuery({
        $or: [ ...new Set(projects.toNormal().map((pr) => { return pr.cliid; })) ].map((c) => { return { cliid: c } }),
      }, { selfMongo });
      designers = await back.getDesignersByQuery({
        $or: [ ...new Set(projects.toNormal().map((pr) => { return pr.desid; })) ].map((c) => { return { desid: c } }),
      }, { selfMongo });

      for (let project of projects) {
        client = clients.toNormal().find((obj) => { return obj.cliid === project.cliid });
        designer = designers.toNormal().find((obj) => { return obj.desid === project.desid });
        title = `현장 미팅 W ${client.name}C ${designer.designer}D ${project.proid}`;
        list = await calendar.listEvents(from, project.proid);
        if (list.length > 0) {
          await calendar.updateSchedule(from, list[0].eventId, { start: project.process.contract.meeting.date.toNormal(), title });
          console.log(`${project.proid} meeting schedule update : ${title}`);
        } else {
          await calendar.makeSchedule(from, title, '', project.process.contract.meeting.date.toNormal());
          console.log(`${project.proid} meeting schedule create : ${title}`);
        }
      }

    }

  } catch (e) {
    console.log(e);
  } finally {
    await this.MONGOLOCALC.close();
  }
}

DevContext.prototype.findCode = async function (str) {
  if (typeof str !== "string") {
    throw new Error("invaild input");
  }
  const instance = this;
  const { treeParsing, fileSystem, shellExec, shellLink } = this.mother;
  const entryPoints = [ "robot.js", "setup.py" ];
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
    console.log(report);
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
    // const scpCommands = certbotFolderList.map((host) => {
    //   const address = Object.values(instance.address);
    //   let target, scpTarget;
    //   target = null;
    //   for (let obj of address) {
    //     if (obj.host === host) {
    //       target = obj;
    //     }
    //   }
    //   if (target === null) {
    //     for (let obj of address) {
    //       if (obj.ghost !== undefined) {
    //         if (obj.ghost.host === host) {
    //           target = obj.ghost;
    //         }
    //       }
    //     }
    //   }
    //   if (target === null) {
    //     throw new Error("invaild host");
    //   }
    //   if (target.port !== 27017) {
    //     scpTarget = `${target.user}@${target.host}:/home/${target.user}/robot`;
    //   } else {
    //     scpTarget = `ubuntu@${target.host}:/home/ubuntu/robot`;
    //   }
    //   return `scp -r ${shellLink(process.cwd())}/pems/${target.host} ${scpTarget}/pems;scp -r ${shellLink(process.cwd())}/pems/${target.host}_nginx ${scpTarget}/pems;`;
    // });

    console.log(certbotFolderList);
    for (let c of certbotFolderList) {
      await certSetting(certbotFolder + "/" + c);
    }
    // for (let s of scpCommands) {
    //   shell.exec(s);
    // }

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

DevContext.prototype.aspirantToDesigner = async function (aspid) {
  const instance = this;
  const back = new BackMaker();
  const report = new BackReport();
  const work = new BackWorker();
  const { fileSystem, shellExec, shellLink, stringToDate, dateToString, ghostFileUpload, requestSystem, mysqlQuery, binaryRequest, cryptoString, decryptoHash } = this.mother;
  try {
    let aspirants, aspirant;
    let aspidArr;
    aspirants = await back.getAspirantsByQuery({ aspid: aspid }, { selfMongo: this.MONGOC });
    aspirant = aspirants[0].toNormal();
    aspidArr = [];
    aspidArr.push({ aspid: aspirant.aspid, contract: aspirant.contract.partnership.date });
    await work.aspirantToDesigner(aspidArr, { selfMongo: this.MONGOC });
  } catch (e) {
    console.log(e);
  }
}

module.exports = DevContext;
