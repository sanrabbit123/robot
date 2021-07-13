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
const SpawnCatfish = require(APP_PATH + "/spawnCatfish/spawnCatfish.js");
const MongoReflection = require(APP_PATH + "/mongoReflection/mongoReflection.js");
const SvgOptimizer = require(APP_PATH + "/svgOptimizer/svgOptimizer.js");
const NaverBlogParsing = require(APP_PATH + "/naverAPIs/naverBlogParsing.js");
const DataMiddle = require(APP_PATH + "/dataConsole/router/dataMiddle.js");
const ReceiptObserver = require(APP_PATH + "/receiptObserver/receiptObserver.js");
const GraphicBot = require(APP_PATH + "/graphicBot/graphicBot.js");

const DevContext = function () {
  this.mother = new Mother();
  this.back = new BackMaker();
  const { mongo, mongoinfo, mongolocalinfo, mongopythoninfo, mongoconsoleinfo } = this.mother;
  this.MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  this.MONGOLOCALC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
  this.address = require(`${process.cwd()}/apps/infoObj.js`);
  this.dir = `${process.cwd()}/apps/devContext`;
}

DevContext.prototype.launching = async function () {
  const instance = this;
  const { mongo, mongoinfo, mongolocalinfo, mongopythoninfo, mongoconsoleinfo } = this.mother;
  const { fileSystem, shell, shellLink, s3FileUpload, s3FileList, ghostFileUpload, ghostFileList, requestSystem, getDateMatrix, ghostRequest, mysqlQuery, headRequest, binaryRequest, cryptoString, decryptoHash, treeParsing, appleScript, sleep, equalJson, copyJson, pythonExecute, autoComma, dateToString, stringToDate } = this.mother;
  try {
    await this.MONGOC.connect();
    await this.MONGOLOCALC.connect();
    const address = this.address;
    const back = this.back;
    const report = new BackReport();
    const work = new BackWorker();
    const sheets = new GoogleSheet();


    const photoRequest = ghostRequest().bind("photo");
    const res = await photoRequest("zip", { pid: "p103" });
    console.log(res);


    // const proid = "p2105_aa10s"
    // const selfMongo = this.MONGOC;
    // const project = await back.getProjectById(proid, { selfMongo });
    // const client = await back.getClientById(project.cliid, { selfMongo });
    // const designer = await back.getDesignerById(project.desid, { selfMongo });
    // let url, requestNumber, proposalDate;
    //
    // proposalDate = project.proposal.date.valueOf();
    //
    // requestNumber = 0;
    // for (let i = 0; i < client.requests.length; i++) {
    //   if (client.requests[i].request.timeline.valueOf() <= proposalDate) {
    //     requestNumber = i;
    //     break;
    //   }
    // }
    //
    // url = "http://127.0.0.1:3000/form";
    //
    // await requestSystem(url, { requestNumber, client: client.toNormal(), designer: designer.toNormal(), project: project.toNormal(), contractName: "", contractAddress: "" }, { headers: { "Content-type": "application/json" } });








    // await this.frontDesignerSync();

    // const selfMongo = this.MONGOLOCALC;
    //
    // "인스타그램"
    // "유튜브"
    // "블로그"
    //
    // const clients = await back.getClientsByQuery({}, { selfMongo, withTools: true });
    // const requests = clients.getRequestsTongsMonthly();
    // let tong;
    // let a1, a2, a3;
    // let tempArr, arr;
    //
    // arr = [];
    // for (let z = 0; z < 6; z++) {
    //   tong = requests.select(new Date(2021, z)).tong;
    //   a1 = 0;
    //   a2 = 0;
    //   a3 = 0;
    //   for (let i of tong) {
    //     if (/인스타/gi.test(i.request.etc.channel)) {
    //       a1 = a1 + 1;
    //     } else if (/유튜/gi.test(i.request.etc.channel)) {
    //       a2 = a2 + 1;
    //     } else if (/블/gi.test(i.request.etc.channel)) {
    //       a3 = a3 + 1;
    //     }
    //   }
    //   tempArr = [ a1, a2, a3 ];
    //   arr.push(tempArr);
    // }











    // const selfMongo = this.MONGOLOCALC;
    // const project = await back.getProjectById("p2106_aa16s", { selfMongo });
    // const client = await back.getClientById(project.cliid, { selfMongo });
    // const designer = await back.getDesignerById(project.desid, { selfMongo });
    // const res = await requestSystem("https://home-liaison.servehttp.com:55556/form", { requestNumber: 0, client: client.toNormal(), designer: designer.toNormal(), project: project.toNormal() }, { headers: { "Content-type": "application/json" } });
    // console.log(res);

    // console.log(await requestSystem("https://home-liaison.servehttp.com:55556/cash"));

    // const res = await requestSystem("https://home-liaison.servehttp.com:55556/toAiServer", { type: "proposal", id: "p2106_aa59s" }, { headers: { "Content-type": "application/json" } });
    // console.log(res);

    /*

    const MONGOC = this.MONGOC;

    const designers = await MONGOC.db(`miro81`).collection(`designer`).find({}).toArray();
    let whereQuery, updateQuery;
    let tempArr, tempObj;

    for (let designer of designers) {
      whereQuery = { desid: designer.desid };
      updateQuery = {};
      updateQuery["analytics.region.construct"] = 50;

      tempArr = designer.analytics.styling.fabric.curtain ? [ "직접 제작" ] : [];
      if (designer.analytics.styling.fabric.method !== "") {
        tempArr.push(designer.analytics.styling.fabric.method);
      }
      tempArr = Array.from(new Set(tempArr));
      updateQuery["analytics.styling.fabric.curtain"] = JSON.parse(JSON.stringify(tempArr));

      tempArr = designer.analytics.styling.fabric.bedding ? [ "직접 제작" ] : [];
      if (designer.analytics.styling.fabric.method !== "") {
        tempArr.push(designer.analytics.styling.fabric.method);
      }
      tempArr = Array.from(new Set(tempArr));
      updateQuery["analytics.styling.fabric.bedding"] = JSON.parse(JSON.stringify(tempArr));

      tempObj = JSON.parse(JSON.stringify(designer.analytics.etc.personality[1]));
      designer.analytics.etc.personality.splice(1, 1);
      designer.analytics.etc.personality.unshift(tempObj);

      updateQuery["analytics.etc.personality"] = designer.analytics.etc.personality;

      await MONGOC.db(`miro81`).collection(`designer`).updateOne(whereQuery, { $set: updateQuery });
      console.log(whereQuery);

      updateQuery = {};
      updateQuery["analytics.styling.fabric.method"] = "";
      await MONGOC.db(`miro81`).collection(`designer`).updateOne(whereQuery, { $unset: updateQuery });
      console.log(whereQuery);
    }


    */

    // const designers = await back.getDesignersByQuery({}, { selfMongo: this.MONGOLOCALC });
    // console.log(designers)
    // console.log(designers[0])
    // console.log(designers[0].analytics.etc.personality)





    // const tong = await work.getDesignerFee("p2106_aa49s", { selfMongo: this.MONGOLOCALC, selfLocalMongo: this.MONGOLOCALC });
    // console.log(tong);
    // for (let obj of tong) {
    //   console.log(obj);
    // }

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





    //eform

    // const id = "8tYXXpqfLD";
    // const key = "pmXpXXlzgtsJGLIYHNfOgrBHm5XCbmixvF7hnRyd";
    // const { data: { access_token } } = await requestSystem("https://api.eform.io/v2/token", {}, { headers: { "x-api-id": id, "x-api-key": key } });
    // const getUrl = function (url, params) {
    //   if (typeof url !== "string" || typeof params !== "object") {
    //     throw new Error("invaild input");
    //   }
    //   if (!/^http/.test(url)) {
    //     throw new Error("invaild input");
    //   }
    //   let str = '';
    //   for (let i in params) {
    //     str += i.replace(/[\=\&]/g, '');
    //     str += '=';
    //     str += params[i].replace(/[\=\&]/g, '');
    //     str += '&';
    //   }
    //   if (str.length > 0) {
    //     str = str.slice(0, -1);
    //   }
    //   return url + "?" + str;
    // }
    // let response, headers, url, data, config;
    // headers = { "x-api-key": key, "x-access-token": access_token };
    // data = {};
    // config = { headers };
    // url = "https://api.eform.io/v2/form";
    // response = await requestSystem(getUrl(url, {}), data, config);
    // console.log(response.data);
    // url = "https://api.eform.io/v2/form/detail";
    // response = await requestSystem(getUrl(url, { form_id: "60b6d531bb0e68efedc5c1f1" }), data, config);
    // console.log(JSON.stringify(response.data, null, 2));














    // let resultObj, res;
    // resultObj = {};
    // resultObj["pretext"] = "김주연";
    // resultObj["cellphone"] = "070-7558-9269";
    // resultObj["email"] = "j05sup@hanmail.net";
    // resultObj["dwelling"] = "서울시 노원구 노원로 38길 포레나노원 아파트";
    // resultObj["folk"] = "부부, 딸 2명(6학년, 4학년)";
    // resultObj["money"] = "1,000만원";
    // resultObj["area"] = "34";
    // resultObj["movingdate"] = "2021-08-16";
    // resultObj["myhomeboo"] = "자가";
    // resultObj["spotspec"] = "방 3개 / 화장실 2개 / 발코니 확장";
    // resultObj["description"] = "방3개, 화장실 2개, 다용도실1, 거실, ,주방, 거실에 딸린 알파 공간, 안방 베란다1, 작은 방에 딸린 실외기실\n1) 홈스타일링 요청. (가구, 조명, 침구 패브릭, 액자, 소품 등)\n2) 새아파트 입주.\n3) 거의 모든 가구 구매 예정.\n4) 가전은 제가 선택하나 디자인은 함께 봐 주길 희망함.\n5) 가구는 가성비 좋은 합리적 가구를 원함.\n6) 상의 후 제작 가구가 필요하다면 제작 가구도 들일 생각 있으므로 제작 가구를 해 주실 수 있는 디자이너 추천 바람.\n7) 인테리어나 홈스타일에 대한 지식이 없으므로 성향 잘 캐치하여 알아서 잘 해주시는 분 추천 해주시길 바람.\n8) 풍수 인테리어에 관심 있음. 그런 쪽을 잘 알고 해주시는 디자이너 선생님이면 좋겠음.\n9) 홈스타일링 비용은 100만원 후반대에서 200만원까지 생각하고 있음.";
    // resultObj["wayto"] = "인터넷 검색";
    // res = await requestSystem("https://homeliaison-bridgecloud.xyz:3000/submit", resultObj, { "Content-Type": "application/json" });
    // console.log(res);







    /*

    const sheetsId = "1Clrbaub3Ztn5l2FYWIkGKrYL2_lP0B6QBGDzOXTRqw8";
    const matrix = await sheets.get_value_inPython(sheetsId, "총괄 시트!B2:V");
    const columns = [ "name", "null0", "boo", "status", "designer", "photographer", "interviewer", "date", "hours", "memo", "rawInterview", "rawPortfolio", "rawPhoto", "blogInterview", "blogPortfolio", "instaInterview", "instaPortfolio", "web", "sharePhotoDesigner", "sharePhotoClient", "shareContents" ];
    const matrix_clone = JSON.parse(JSON.stringify(matrix));
    const selfMongo = this.MONGOC;
    const convertStatus_photo = (str) => {
      if (/대기/gi.test(str)) {
        return '세팅 대기';
      } else if (/요망/gi.test(str)) {
        return '촬영 컨택 요망';
      } else if (/컨택중/gi.test(str)) {
        return '촬영 컨택중';
      } else if (/확정/gi.test(str)) {
        return '촬영 일정 확정';
      } else if (/완료/gi.test(str)) {
        return '촬영 완료';
      } else if (/홀딩/gi.test(str)) {
        return '촬영 홀딩';
      } else if (/없음/gi.test(str)) {
        return '해당 없음';
      } else {
        console.log("photo", str);
        throw new Error("invaild input");
      }
    }
    const convertStatus_rawPortfolio = (str) => {
      if (/대기/gi.test(str)) {
        return '세팅 대기';
      } else if (/요망/gi.test(str)) {
        return '원본 요청 요망';
      } else if (/요청 완료/gi.test(str)) {
        return '원본 요청 완료';
      } else if (/수집 완료/gi.test(str)) {
        return '원본 수집 완료';
      } else if (/편집중/gi.test(str)) {
        return '원본 편집중';
      } else if (/편집 완료/gi.test(str)) {
        return '원본 편집 완료';
      } else if (/없음/gi.test(str)) {
        return '해당 없음';
      } else {
        console.log("portfolio", str);
        throw new Error("invaild input");
      }
    }
    const convertStatus_rawInterview = (str) => {
      if (/대기/gi.test(str)) {
        return '세팅 대기';
      } else if (/요망/gi.test(str)) {
        return '인터뷰 요망';
      } else if (/인터뷰 완료/gi.test(str)) {
        return '인터뷰 완료';
      } else if (/편집중/gi.test(str)) {
        return '원본 편집중';
      } else if (/편집 완료/gi.test(str)) {
        return '원본 편집 완료';
      } else if (/없음/gi.test(str)) {
        return '해당 없음';
      } else {
        console.log("interview", str);
        throw new Error("invaild input");
      }
    }
    const convertStatus_rawPhoto = (str) => {
      if (/대기/gi.test(str)) {
        return '촬영 대기';
      } else if (/요망/gi.test(str)) {
        return '원본 요청 요망';
      } else if (/요청 완료/gi.test(str)) {
        return '원본 요청 완료';
      } else if (/수집 완료/gi.test(str)) {
        return '원본 수집 완료';
      } else if (/보정중/gi.test(str)) {
        return '원본 보정중';
      } else if (/보정 완료/gi.test(str)) {
        return '원본 보정 완료';
      } else if (/없음/gi.test(str)) {
        return '해당 없음';
      } else {
        console.log("rawphoto", str);
        throw new Error("invaild input");
      }
    }
    const stringToDate = (dateString, hours = null) => {
      let tempArr, hoursArr, h;
      tempArr = dateString.split('-');
      if (hours === null) {
        return new Date(Number(tempArr[0]), Number(tempArr[1].replace(/^0/, '')) - 1, Number(tempArr[2].replace(/^0/, '')));
      } else {
        hoursArr = hours.split(':');
        if (/후/.test(hoursArr[0])) {
          h = Number(hoursArr[0].replace(/[^0-9]/g, '')) + 12;
        } else {
          h = Number(hoursArr[0].replace(/[^0-9]/g, ''));
        }
        return new Date(Number(tempArr[0]), Number(tempArr[1].replace(/^0/, '')) - 1, Number(tempArr[2].replace(/^0/, '')), h);
      }
    }
    let tong, tempObj;
    let filteredTong;
    let projects, project;
    let convertingDictionary;
    let whereQuery, updateQuery;
    let tempDate;
    let contents;
    let tempContentsDate;

    matrix_clone.sort((a, b) => { return b.length - a.length });

    tong = [];
    for (let arr of matrix) {
      tempObj = {};
      for (let i = 0; i < columns.length; i++) {
        tempObj[columns[i]] = arr[i] === undefined ? "" : arr[i].trim();
      }
      tong.push(tempObj);
    }

    filteredTong = [];
    for (let obj of tong) {
      projects = await back.getProjectsByNames([ obj.name, obj.designer ], { selfMongo });
      contents = await back.getContentsArrByQuery({ proid: projects[0].proid }, { selfMongo });
      tempContentsDate = new Date(3800, 0, 1);
      if (contents.length !== 0) {
        tempContentsDate = contents[0].contents.portfolio.date.toNormal();
      }
      tempDate = stringToDate(obj.date, obj.hours);
      tempDate.setDate(tempDate.getDate() + 3);
      tempObj = {
        proid: projects[0].proid,
        cliid: projects[0].cliid,
        desid: projects[0].desid,
        boo: (obj.boo.trim() === 'X' || obj.boo.trim() === 'x') ? false : true,
        status: convertStatus_photo(obj.status),
        photographer: obj.photographer.trim(),
        interviewer: obj.interviewer.trim(),
        date: stringToDate(obj.date, obj.hours),
        memo: obj.memo,
        rawInterview: convertStatus_rawInterview(obj.rawInterview),
        rawPortfolio: convertStatus_rawPortfolio(obj.rawPortfolio),
        rawPhoto: convertStatus_rawPhoto(obj.rawPhoto),
        blogInterview: stringToDate(obj.blogInterview),
        blogPortfolio: stringToDate(obj.blogPortfolio),
        instaInterview: stringToDate(obj.instaInterview),
        instaPortfolio: stringToDate(obj.instaPortfolio),
        sharePhotoDesigner: obj.sharePhotoDesigner === 'O' ? tempDate : new Date(3800, 0, 1),
        sharePhotoClient: obj.sharePhotoClient === 'O' ? tempDate : new Date(3800, 0, 1),
        shareContentsDesigner: obj.shareContents === 'O' ? tempContentsDate : new Date(3800, 0, 1),
        shareContentsClient: obj.shareContents === 'O' ? tempContentsDate : new Date(3800, 0, 1),
      };
      filteredTong.push(tempObj);
    }

    convertingDictionary = {
      boo: "contents.photo.boo",
      status: "contents.photo.status",
      photographer: "contents.photo.info.photographer",
      interviewer: "contents.photo.info.interviewer",
      date: "contents.photo.date",
      rawInterview: "contents.raw.interview.status",
      rawPortfolio: "contents.raw.portfolio.status",
      rawPhoto: "contents.raw.photo.status",
      blogInterview: "contents.sns.interview.long",
      blogPortfolio: "contents.sns.portfolio.long",
      instaInterview: "contents.sns.interview.short",
      instaPortfolio: "contents.sns.portfolio.short",
      sharePhotoDesigner: "contents.share.designer.photo",
      sharePhotoClient: "contents.share.client.photo",
      shareContentsDesigner: "contents.share.designer.contents",
      shareContentsClient: "contents.share.client.contents",
    };

    console.log(filteredTong);

    for (let obj of filteredTong) {
      whereQuery = { proid: obj.proid };
      updateQuery = {};
      for (let i in convertingDictionary) {
        updateQuery[convertingDictionary[i]] = obj[i];
      }
      await back.updateProject([ whereQuery, updateQuery ], { selfMongo });
      console.log(whereQuery);
    }

    */








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
    // await drive.get_folder("https://drive.google.com/drive/folders/1RnYBRTxigMj6Nm86VwJ4WPnVfal-Wcoe");


    // naverBlog to json
    // const blog = new NaverBlogParsing();
    // await blog.blogToJson();


    // spawn catfish
    // const app = new SpawnCatfish();
    // await app.spawnLaunching(true);


    // kakao token
    // const app = new KakaoTalk();
    // await app.generateToken();


    // addtional photo repair
    // const filter = new PortfolioFilter();
    // await filter.additionalRepair("p90", 13);


    // raw photo to raw portfolio
    // const filter = new PortfolioFilter();
    // await filter.rawToRaw([
    //   {
    //     client: "윤슬아",
    //     designer: "정다연",
    //     link: "https://drive.google.com/drive/folders/1tGyHQtxqLti7iMHGpAgNvIA5x8LBgbi6",
    //   },
    //   {
    //     client: "박혜성",
    //     designer: "오정수",
    //     link: "https://drive.google.com/drive/folders/1VNwojg_chUAR6zxf7P4wH3ImQI1ichKJ",
    //   },
    // ]);


    // get photo folder
    // const drive = new GoogleDrive();
    // await drive.get_folder("https://drive.google.com/drive/folders/1f7TO4P5SoSPoI9v6ZgVNEohwhTsNEquf", "p96");


    // send checklist
    // await this.sendChecklist();


    // spell check
    // await this.spellCheck("p103");


    // get corePortfolio by pid
    // await this.getCorePortfolio("p103");


    // aspirant to designer
    // await this.aspirantToDesigner([
    //   [ "이진선", "2021-06-15" ],
    // ]);


    // new designer to front web
    // await work.newDesignerToFront([ "d2008_aa01s" ]);


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
    await this.MONGOC.close();
    await this.MONGOLOCALC.close();
    console.log(`done`);
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
      console.log(fixString)
      updateArr.push(fixString);
    }
    console.log(updateArr);
    updateArr.shift();
    await note.updateNote(updateArr.join('<br><br>'));
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
