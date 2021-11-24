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
const GoogleChrome = require(`${process.cwd()}/apps/googleAPIs/googleChrome.js`);
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
const MirrorWhisk = require(APP_PATH + "/mirrorWhisk/mirrorWhisk.js");
const MirrorRouter = require(APP_PATH + "/mirrorWhisk/router/mirrorRouter.js");
const NativeNotifier = require(APP_PATH + "/nativeNotifier/nativeNotifier.js");
const RethinkAccess = require(APP_PATH + "/rethinkAccess/rethinkAccess.js");
const AppleCalendar = require(APP_PATH + "/appleAPIs/appleCalendar.js");

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
  const rethink = new RethinkAccess();
  const { mongo, mongoinfo, mongolocalinfo, mongopythoninfo, mongoconsoleinfo } = this.mother;
  const { fileSystem, shellExec, shellLink, orderSystem, ghostFileUpload, ghostFileList, curlRequest, requestSystem, uniqueValue, getDateMatrix, ghostRequest, generalFileUpload, promiseTimeout, mysqlQuery, headRequest, binaryRequest, cryptoString, decryptoHash, treeParsing, appleScript, sleep, equalJson, copyJson, pythonExecute, autoComma, dateToString, stringToDate, ipParsing, ipCheck, leafParsing, statusReading, errorLog, messageLog, messageSend, pureServer, s3FileDelete } = this.mother;
  try {
    await this.MONGOC.connect();
    await this.MONGOLOCALC.connect();
    // await rethink.connect();
    const address = this.address;
    const back = this.back;
    const report = new BackReport();
    const work = new BackWorker();
    const sheets = new GoogleSheet();
    const bill = new BillMaker();
    const { Agent } = require("https");
    const agent = new Agent({ rejectUnauthorized: false });
    const chrome = new GoogleChrome();
    const findCode = this.findCode.bind(this);

    // in config { httpsAgent: agent }
    // console.log(await this.findCode("* 1.1)"));
    // const count = (await this.findCode("count")).scripts
    // const realtimeDesigner = (await this.findCode("realtimeDesigner")).scripts
    // console.log(count.filter((p) => { return realtimeDesigner.includes(p); }));

    // await this.passiveAddressSync("c2110_aa14s");

    // await this.pureSpawn();


    // const res = await requestSystem(`http://172.30.1.5/`, {}, { method: "get" });
    // console.log(JSON.stringify(res.data, null, 2));


    const constructGeneralBillSync = async () => {
      const selfMongo = instance.MONGOLOCALC;
      const widsignTargets = [
        {
          name: "신정안",
          form: {
            name: "경기도 고양시 덕양구 삼송자이더빌리지 510-102 부분시공(전기&도배)",
            address: "경기도 고양시 덕양구 삼송자이더빌리지 510-102"
          },
          date: {
            start: "2021-02-03",
            end: "2021-02-09",
          },
          payments: {
            first: {
              amount: 156000,
              date: "2021-01-16",
            },
            start: {
              amount: 273000,
              date: "2021-02-02",
            },
            middle: {
              amount: 273000,
              date: "2021-02-05",
            },
            remain: {
              amount: 78000,
              date: "2021-02-09",
            }
          },
          proid: "p2011_aa32s"
        },
        {
          name: "장윤정",
          form: {
            name: "경기도 고양시 덕양구 오부자로 77 중흥S클래스 102동 2201호 내부인테리어",
            address: "경기도 고양시 덕양구 오부자로 77 중흥S클래스 102동 2201호"
          },
          date: {
            start: "2021-01-21",
            end: "2021-02-17",
          },
          payments: {
            first: {
              amount: 1280000,
              date: "2021-01-18",
            },
            start: {
              amount: 5120000,
              date: "2021-01-21",
            },
            middle: {
              amount: 5120000,
              date: "2021-01-28",
            },
            remain: {
              amount: 1280000,
              date: "2021-02-17",
            }
          },
          proid: "p2012_aa31s"
        },
        {
          name: "박미연",
          form: {
            name: "경기도 하남시 감일 백제로 70 더샵 206동 1602호 세대 내부 리모델링",
            address: "경기도 하남시 감일 백제로 70 더샵 206동 1602호"
          },
          date: {
            start: "2021-02-19",
            end: "2021-02-26",
          },
          payments: {
            first: {
              amount: 683000,
              date: "2021-02-01",
            },
            start: {
              amount: 2732000,
              date: "2021-02-19",
            },
            middle: {
              amount: 2732000,
              date: "2021-02-23",
            },
            remain: {
              amount: 683000,
              date: "2021-02-26",
            }
          },
          proid: "p2012_aa13s"
        },
        {
          name: "여훈",
          form: {
            name: "경기도 남양주시 별내동 우미린1차 4505동 605호",
            address: "경기도 남양주시 별내동 우미린1차 4505동 605호"
          },
          date: {
            start: "2021-04-12",
            end: "2021-05-12",
          },
          payments: {
            first: {
              amount: 6140000,
              date: "2021-03-29",
            },
            start: {
              amount: 24560000,
              date: "2021-04-12",
            },
            middle: {
              amount: 24560000,
              date: "2021-04-19",
            },
            remain: {
              amount: 6140000,
              date: "2021-05-12",
            }
          },
          proid: "p2103_aa01s"
        },
        {
          name: "최가영",
          form: {
            name: "서울시 서대문구 서소문로27 충정리시온 1302호 세대 내부 리모델링",
            address: "서울시 서대문구 서소문로27 충정리시온 1302호"
          },
          date: {
            start: "2021-04-19",
            end: "2021-05-19",
          },
          payments: {
            first: {
              amount: 2452000,
              date: "2021-04-08",
            },
            start: {
              amount: 9808000,
              date: "2021-04-19",
            },
            middle: {
              amount: 9808000,
              date: "2021-04-26",
            },
            remain: {
              amount: 2452000,
              date: "2021-05-19",
            }
          },
          proid: "p2103_aa31s"
        },
        {
          name: "전경은",
          form: {
            name: "서울시 송파구 오금동 송파두산위브 101동 1203호 세대 내부 리모델링 (부분시공)",
            address: "서울시 송파구 오금동 송파두산위브 101동 1203호 (24py)"
          },
          date: {
            start: "2021-06-02",
            end: "2021-06-30",
          },
          payments: {
            first: {
              amount: 1266000,
              date: "2021-04-13",
            },
            start: {
              amount: 5064000,
              date: "2021-06-01",
            },
            middle: {
              amount: 5064000,
              date: "2021-06-08",
            },
            remain: {
              amount: 1266000,
              date: "2021-06-30",
            }
          },
          proid: "p2101_aa18s"
        },
        {
          "name": "임현서",
          "form": {
            "name": "서울시 서초구 동산로6길 42 신도아트빌 201호 (30py) 세대 내부 리모델링 (부분시공)",
            "address": "서울시 서초구 동산로6길 42 신도아트빌 201호 (30py)"
          },
          "payments": {
            "first": {
              "amount": 2057000,
              "date": "2021-06-04T15:00:00.000Z",
              "etc": ""
            },
            "start": {
              "amount": 8228000,
              "date": "2021-06-06T15:00:00.000Z",
              "etc": ""
            },
            "middle": {
              "amount": 8228000,
              "date": "2021-06-17T15:00:00.000Z",
              "etc": ""
            },
            "remain": {
              "amount": 2057000,
              "date": "2021-06-26T15:00:00.000Z",
              "etc": ""
            }
          },
          "proid": "p2104_aa41s"
        },
        {
          name: "김혜현",
          form: {
            name: "서울시 강남구 역삼동 푸르지오시티오피스텔 1525호 (19평형) 세대 내부 리모델링 (부분시공)",
            address: "서울시 강남구 역삼동 푸르지오시티오피스텔 1525호"
          },
          date: {
            start: "2021-06-11",
            end: "2021-06-12",
          },
          payments: {
            first: {
              amount: 1328000,
              date: "2021-06-08",
            },
            start: {
              amount: 0,
              date: "",
            },
            middle: {
              amount: 0,
              date: "",
            },
            remain: {
              amount: 332000,
              date: "2021-06-12",
            }
          },
          proid: "p2105_aa26s"
        },
        {
          name: "우아라",
          form: {
            name: "경기도 성남시 분당구 백현동 516 판교더샵퍼스트파크 101동 402호 (45py) 세대 내부 리모델링 (부분시공)",
            address: "경기도 성남시 분당구 백현동 516 판교더샵퍼스트파크 101동 402호"
          },
          date: {
            start: "2021-06-17",
            end: "2021-07-06",
          },
          payments: {
            first: {
              amount: 2403000,
              date: "2021-06-10",
            },
            start: {
              amount: 9612000,
              date: "2021-06-17",
            },
            middle: {
              amount: 9612000,
              date: "2021-06-25",
            },
            remain: {
              amount: 2403000,
              date: "2021-07-06",
            }
          },
          proid: "p2104_aa66s"
        },
        {
          name: "이은영",
          form: {
            name: "경기도 수원시 영통구 광교호반베르디움 8704동 201호 (32평형) 세대 내부 리모델링 (부분시공)",
            address: "경기도 수원시 영통구 광교호반베르디움 8704동 201호 (32평형)"
          },
          date: {
            start: "2021-07-05",
            end: "2021-07-19",
          },
          payments: {
            first: {
              amount: 692000,
              date: "2021-06-15",
            },
            start: {
              amount: 2768000,
              date: "2021-07-05",
            },
            middle: {
              amount: 2768000,
              date: "2021-07-09",
            },
            remain: {
              amount: 692000,
              date: "2021-07-19",
            }
          },
          proid: "p2103_aa40s"
        },
        {
          name: "김현애",
          form: {
            name: "경기도 수원시 영통구 광교중흥s클래스 109동 4703호 (35평형) 세대 내부 리모델링 (부분시공)",
            address: "경기도 수원시 영통구 광교중흥s클래스 109동 4703호"
          },
          date: {
            start: "2021-06-28",
            end: "2021-07-27",
          },
          payments: {
            first: {
              amount: 2932000,
              date: "2021-06-22",
            },
            start: {
              amount: 11728000,
              date: "2021-06-28",
            },
            middle: {
              amount: 11728000,
              date: "2021-07-12",
            },
            remain: {
              amount: 2932000,
              date: "2021-07-27",
            }
          },
          proid: "p2104_aa45s"
        },
        {
          "name": "홍은영",
          "form": {
            "name": "용인시 신동백 두산위브더제니스 103동 1401호 (31py) 세대 내부 리모델링 (부분시공)",
            "address": "용인시 신동백 두산위브더제니스 103동 1401호"
          },
          "payments": {
            "first": {
              "amount": 799000,
              "date": "2021-06-24T15:00:00.000Z",
              "etc": ""
            },
            "start": {
              "amount": 3196000,
              "date": "2021-07-11T15:00:00.000Z",
              "etc": ""
            },
            "middle": {
              "amount": 3196000,
              "date": "2021-07-14T15:00:00.000Z",
              "etc": ""
            },
            "remain": {
              "amount": 799000,
              "date": "2021-07-18T15:00:00.000Z",
              "etc": "(공사완료시)"
            }
          },
          "proid": "p2105_aa35s"
        },
        {
          "name": "이수진",
          "form": {
            "name": "서울시 강남구 도산대로61길 14, 4층 에버홈 내부 리모델링 (부분시공)",
            "address": "서울시 강남구 도산대로61길 14, 4층 에버홈"
          },
          "payments": {
            "first": {
              "amount": 547000,
              "date": "2021-07-01T15:00:00.000Z",
              "etc": ""
            },
            "start": {
              "amount": 2188000,
              "date": "2021-07-04T15:00:00.000Z",
              "etc": ""
            },
            "middle": {
              "amount": 2188000,
              "date": "2021-07-07T15:00:00.000Z",
              "etc": ""
            },
            "remain": {
              "amount": 547000,
              "date": "2021-07-09T15:00:00.000Z",
              "etc": ""
            }
          },
          "proid": "p2105_aa54s"
        },
        {
          name: "이지현",
          form: {
            name: "경기도 남양주시 다산동 6015 다산 자연앤자이 1404동 504호 (34py) 세대 내부 리모델링 (부분시공)",
            address: "경기도 남양주시 다산동 6015 다산 자연앤자이 1404동 504호 (34py)"
          },
          date: {
            start: "2021-08-03",
            end: "2021-08-12",
          },
          payments: {
            first: {
              amount: 702000,
              date: "2021-07-20",
            },
            start: {
              amount: 2808000,
              date: "2021-08-03",
            },
            middle: {
              amount: 2808000,
              date: "2021-08-06",
            },
            remain: {
              amount: 702000,
              date: "2021-08-12",
            }
          },
          proid: "p2105_aa48s"
        },
        {
          "name": "이지현",
          "form": {
            "name": "경기도 남양주시 다산동 6015 다산 자연앤자이 1404동 504호 (34py) 세대 내부 리모델링 (부분시공)",
            "address": "경기도 남양주시 다산동 6015 다산 자연앤자이 1404동 504호 (34py)"
          },
          "payments": {
            "first": {
              "amount": 702000,
              "date": "2021-07-19T15:00:00.000Z",
              "etc": ""
            },
            "start": {
              "amount": 2808000,
              "date": "2021-08-02T15:00:00.000Z",
              "etc": ""
            },
            "middle": {
              "amount": 2808000,
              "date": "2021-08-05T15:00:00.000Z",
              "etc": ""
            },
            "remain": {
              "amount": 702000,
              "date": "2021-08-11T15:00:00.000Z",
              "etc": ""
            }
          },
          "proid": "p2105_aa48s"
        },
        {
          "name": "이해정",
          "form": {
            "name": "서울 강남구 영동대로 22 디에이치자이개포 813동 2205호  세대 내부 리모델링 (부분시공)",
            "address": "서울 강남구 영동대로 22 디에이치자이개포 813동 2205호"
          },
          "payments": {
            "first": {
              "amount": 418000,
              "date": "2021-07-22T15:00:00.000Z",
              "etc": ""
            },
            "start": {
              "amount": 1672000,
              "date": "2021-08-04T15:00:00.000Z",
              "etc": "(공사착수일)"
            },
            "middle": {
              "amount": 0,
              "date": null,
              "etc": ""
            },
            "remain": {
              "amount": 0,
              "date": null,
              "etc": ""
            }
          },
          "proid": "p2102_aa24s"
        },
        {
          "name": "김태완",
          "form": {
            "name": "경기도 성남시 수정구 심곡로29번길 3, 포레스트빌라 1층 세대 내부 리모델링 (부분시공)",
            "address": "경기도 성남시 수정구 심곡로29번길 3, 포레스트빌라 1층"
          },
          "payments": {
            "first": {
              "amount": 1665000,
              "date": "2021-08-09T15:00:00.000Z",
              "etc": ""
            },
            "start": {
              "amount": 6660000,
              "date": "2021-09-05T15:00:00.000Z",
              "etc": ""
            },
            "middle": {
              "amount": 6660000,
              "date": "2021-09-09T15:00:00.000Z",
              "etc": ""
            },
            "remain": {
              "amount": 1665000,
              "date": "2021-09-15T15:00:00.000Z",
              "etc": "(공사완료시)"
            }
          },
          "proid": "p2107_aa01s"
        },
        {
          name: "박준영",
          form: {
            name: "경기도 용인시 수지구 풍덕천로 1223 수지파크푸르지오 103동 802호 (25py) 세대 내부 리모델링 (부분시공)",
            address: "경기도 용인시 수지구 풍덕천로 1223 수지파크푸르지오 103동 802호"
          },
          date: {
            start: "2021-08-30",
            end: "2021-09-07",
          },
          payments: {
            first: {
              amount: 1304000,
              date: "2021-08-17",
            },
            start: {
              amount: 5216000,
              date: "2021-08-30",
            },
            middle: {
              amount: 5216000,
              date: "2021-09-03",
            },
            remain: {
              amount: 1304000,
              date: "2021-09-07",
            }
          },
          proid: "p2106_aa17s"
        },
        {
          "name": "정현진",
          "form": {
            "name": "서울시 영등포구 신길로29길 17 신길센트럴자이 102동 1201호 세대 내부 리모델링 (부분시공)",
            "address": "서울시 영등포구 신길로29길 17 신길센트럴자이 102동 1201호"
          },
          "payments": {
            "first": {
              "amount": 2317000,
              "date": "2021-08-24T15:00:00.000Z",
              "etc": ""
            },
            "start": {
              "amount": 9268000,
              "date": "2021-09-22T15:00:00.000Z",
              "etc": ""
            },
            "middle": {
              "amount": 9268000,
              "date": "2021-09-28T15:00:00.000Z",
              "etc": "(시공내용에따라증감될수있음)"
            },
            "remain": {
              "amount": 2317000,
              "date": "2021-10-06T15:00:00.000Z",
              "etc": "(시공내용에따라증감될수있음)"
            }
          },
          "proid": "p2107_aa40s"
        },
        {
          "name": "박지현",
          "form": {
            "name": "서울시 강동구 고덕로 360 고덕아르테온 316동 1404호 (34py) 세대 내부 리모델링 (부분시공)",
            "address": "서울시 강동구 고덕로 360 고덕아르테온 316동 1404호 (34py)"
          },
          "payments": {
            "first": {
              "amount": 695000,
              "date": "2021-08-25T15:00:00.000Z",
              "etc": "박지현"
            },
            "start": {
              "amount": 2780000,
              "date": "2021-10-01T15:00:00.000Z",
              "etc": "박지현"
            },
            "middle": {
              "amount": 2780000,
              "date": "2021-10-02T15:00:00.000Z",
              "etc": "박지현"
            },
            "remain": {
              "amount": 695000,
              "date": "2021-10-03T15:00:00.000Z",
              "etc": "(공사종료시)"
            }
          },
          "proid": "p2107_aa37s"
        },
        {
          "name": "차은상",
          "form": {
            "name": "경기도 화성시 동탄대로4길18 동탄호수 우남더테라스 (27py) 세대 내부 리모델링 (부분시공)",
            "address": "경기도 화성시 동탄대로4길18 동탄호수 우남더테라스 (27py)"
          },
          "payments": {
            "first": {
              "amount": 1274000,
              "date": "2021-08-26T15:00:00.000Z",
              "etc": ""
            },
            "start": {
              "amount": 5096000,
              "date": "2021-09-12T15:00:00.000Z",
              "etc": ""
            },
            "middle": {
              "amount": 5096000,
              "date": "2021-09-14T15:00:00.000Z",
              "etc": ""
            },
            "remain": {
              "amount": 1274000,
              "date": "2021-09-17T15:00:00.000Z",
              "etc": "(공사종료시)"
            }
          },
          "proid": "p2107_aa22s"
        },
        {
          "name": "정혜민",
          "form": {
            "name": "인천광역시 서구 보듬로 158, 736호,737호,738호(오류동)",
            "address": "인천광역시 서구 보듬로 158, 736호,737호,738호(오류동)"
          },
          "payments": {
            "first": {
              "amount": 3546000,
              "date": "2021-08-30T15:00:00.000Z",
              "etc": ""
            },
            "start": {
              "amount": 14184000,
              "date": "2021-10-31T15:00:00.000Z",
              "etc": ""
            },
            "middle": {
              "amount": 14184000,
              "date": "2021-11-09T15:00:00.000Z",
              "etc": ""
            },
            "remain": {
              "amount": 3546000,
              "date": "2021-11-19T15:00:00.000Z",
              "etc": "(공사종료시)"
            }
          },
          "proid": "p2108_aa18s"
        },
        {
          "name": "최진주",
          "form": {
            "name": "경기도 용인시 수지구 신봉2로26 LG신봉자이1차아파트 101동 602호 세대 내부 주방&일반가구 리폼 (부분시공)",
            "address": "경기도 용인시 수지구 신봉2로26 LG신봉자이1차아파트 101동 602호"
          },
          "payments": {
            "first": {
              "amount": 1123000,
              "date": "2021-09-29T15:00:00.000Z",
              "etc": ""
            },
            "start": {
              "amount": 4492000,
              "date": "2021-10-04T15:00:00.000Z",
              "etc": "(공사착수시)"
            },
            "middle": {
              "amount": 4492000,
              "date": "2021-10-07T15:00:00.000Z",
              "etc": ""
            },
            "remain": {
              "amount": 1123000,
              "date": "2021-10-11T15:00:00.000Z",
              "etc": "(공사종료시)"
            }
          },
          "proid": "p2106_aa26s"
        },
        {
          "name": "유영란",
          "form": {
            "name": "경기도 수원시 장안구 정자동 111 화서역 파크푸르지오 109동 3003호 세대 내부 리모델링 (부분시공)",
            "address": "경기도 수원시 장안구 정자동 111 화서역 파크푸르지오 109동 3003호"
          },
          "payments": {
            "first": {
              "amount": 4052000,
              "date": "2021-10-07T15:00:00.000Z",
              "etc": ""
            },
            "start": {
              "amount": 16208000,
              "date": "2021-10-11T15:00:00.000Z",
              "etc": ""
            },
            "middle": {
              "amount": 16208000,
              "date": "2021-10-21T15:00:00.000Z",
              "etc": ""
            },
            "remain": {
              "amount": 4052000,
              "date": "2021-11-03T15:00:00.000Z",
              "etc": "(공사종료시)"
            }
          },
          "proid": "p2106_aa62s"
        },
        {
          "name": "장해신",
          "form": {
            "name": "경기도 수원시 영통구 광교호수공원로 277 광교중흥S클래스 103동 1107호 세대 내부 리모델링 (부분시공)",
            "address": "경기도 수원시 영통구 광교호수공원로 277 광교중흥S클래스 103동 1107호"
          },
          "payments": {
            "first": {
              "amount": 1225000,
              "date": "2021-10-14T15:00:00.000Z",
              "etc": ""
            },
            "start": {
              "amount": 4900000,
              "date": "2021-10-18T15:00:00.000Z",
              "etc": "(공사착수시)"
            },
            "middle": {
              "amount": 4900000,
              "date": "2021-10-24T15:00:00.000Z",
              "etc": ""
            },
            "remain": {
              "amount": 1225000,
              "date": "2021-11-01T15:00:00.000Z",
              "etc": "(공사종료시)"
            }
          },
          "proid": "p2107_aa15s"
        },
        {
          "name": "김명준",
          "form": {
            "name": "위례 학암로 30 LH포엘리움 7401동 2202호 세대 내부 리모델링 (부분시공)",
            "address": "위례 학암로 30 LH포엘리움 7401동 2202호"
          },
          "payments": {
            "first": {
              "amount": 380000,
              "date": "2021-10-21T15:00:00.000Z",
              "etc": ""
            },
            "start": {
              "amount": 1520000,
              "date": "2021-10-26T15:00:00.000Z",
              "etc": ""
            },
            "middle": {
              "amount": 1520000,
              "date": "2021-11-01T15:00:00.000Z",
              "etc": ""
            },
            "remain": {
              "amount": 380000,
              "date": "2021-11-08T15:00:00.000Z",
              "etc": "(공사종료시)"
            }
          },
          "proid": "p2108_aa15s"
        },
        {
          "name": "김진구",
          "form": {
            "name": "다산신도시 자연앤푸르지오 6507동 501호 (21PY) 세대 내부 리모델링 (부분시공)",
            "address": "다산신도시 자연앤푸르지오 6507동 501호 (21PY)"
          },
          "payments": {
            "first": {
              "amount": 817000,
              "date": "2021-10-24T15:00:00.000Z",
              "etc": ""
            },
            "start": {
              "amount": 3268000,
              "date": "2021-11-01T15:00:00.000Z",
              "etc": "(공사착공시)"
            },
            "middle": {
              "amount": 3268000,
              "date": "2021-11-03T15:00:00.000Z",
              "etc": ""
            },
            "remain": {
              "amount": 817000,
              "date": "2021-11-07T15:00:00.000Z",
              "etc": "(공사종료시)"
            }
          },
          "proid": "p2108_aa34s"
        },
        {
          "name": "엄지영",
          "form": {
            "name": "서울 동대문구 장한로27가길 37 동대문더퍼스트데시앙 103동 1204호 세대 내부 리모델링 (부분시공)",
            "address": "서울 동대문구 장한로27가길 37 동대문더퍼스트데시앙 103동 1204호"
          },
          "payments": {
            "first": {
              "amount": 1383000,
              "date": "2021-10-26T15:00:00.000Z",
              "etc": ""
            },
            "start": {
              "amount": 5532000,
              "date": "2021-12-05T15:00:00.000Z",
              "etc": ""
            },
            "middle": {
              "amount": 5532000,
              "date": "2021-12-09T15:00:00.000Z",
              "etc": ""
            },
            "remain": {
              "amount": 1383000,
              "date": "2021-12-14T15:00:00.000Z",
              "etc": "(공사종료시)"
            }
          },
          "proid": "p2108_aa45s"
        },
        {
          "name": "유미희",
          "form": {
            "name": "서울 송파구 백제고분로45길 38-9 이움레이크 604호 (17PY) 세대 내부 리모델링",
            "address": "서울 송파구 백제고분로45길 38-9 이움레이크 604호 (17PY)"
          },
          "payments": {
            "first": {
              "amount": 1699000,
              "date": "2021-11-11T15:00:00.000Z",
              "etc": ""
            },
            "start": {
              "amount": 6796000,
              "date": "2021-11-14T15:00:00.000Z",
              "etc": ""
            },
            "middle": {
              "amount": 6796000,
              "date": "2021-11-21T15:00:00.000Z",
              "etc": ""
            },
            "remain": {
              "amount": 1699000,
              "date": "2021-11-28T15:00:00.000Z",
              "etc": "(공사종료시)"
            }
          },
          "proid": "p2110_aa02s"
        },
        {
          "name": "전이제",
          "form": {
            "name": "서울 송파구 동남로 13길 48, 빌라402호 (18PY) 세대 내부 리모델링 (부분시공)",
            "address": "서울 송파구 동남로 13길 48, 빌라402호 (18PY)"
          },
          "payments": {
            "first": {
              "amount": 1022000,
              "date": "2021-11-15T15:00:00.000Z",
              "etc": ""
            },
            "start": {
              "amount": 8176000,
              "date": "2021-11-25T15:00:00.000Z",
              "etc": ""
            },
            "middle": {
              "amount": 0,
              "date": null,
              "etc": ""
            },
            "remain": {
              "amount": 1022000,
              "date": "2021-11-28T15:00:00.000Z",
              "etc": "(공사종료시)"
            }
          },
          "proid": "p2109_aa41s"
        },
        {
          "name": "오희진",
          "form": {
            "name": "경기 평택시 고덕면 고덕국제1로 50 호반써밋고덕신도시 (33py) 세대 내부 리모델링 (부분시공)",
            "address": "경기 평택시 고덕면 고덕국제1로 50 호반써밋고덕신도시 (33py)"
          },
          "payments": {
            "first": {
              "amount": 1182000,
              "date": "2021-11-15T15:00:00.000Z",
              "etc": ""
            },
            "start": {
              "amount": 4728000,
              "date": "2021-11-28T15:00:00.000Z",
              "etc": ""
            },
            "middle": {
              "amount": 4728000,
              "date": "2021-12-02T15:00:00.000Z",
              "etc": ""
            },
            "remain": {
              "amount": 1182000,
              "date": "2021-12-10T15:00:00.000Z",
              "etc": "(공사종료시)"
            }
          },
          "proid": "p2109_aa30s"
        },
        {
          "name": "김영주",
          "form": {
            "name": "서울시 동대문구 용두동 253 e편한세상청계센트럴포레 503동 2401호 세대 내부 리모델링 (부분시공)",
            "address": "서울시 동대문구 용두동 253 e편한세상청계센트럴포레 503동 2401호"
          },
          "payments": {
            "first": {
              "amount": 1764000,
              "date": "2021-11-17T15:00:00.000Z",
              "etc": ""
            },
            "start": {
              "amount": 7056000,
              "date": "2021-11-30T15:00:00.000Z",
              "etc": ""
            },
            "middle": {
              "amount": 7056000,
              "date": "2021-12-06T15:00:00.000Z",
              "etc": ""
            },
            "remain": {
              "amount": 1764000,
              "date": "2021-12-13T15:00:00.000Z",
              "etc": "(공사종료시)"
            }
          },
          "proid": "p2110_aa26s"
        },
        {
          "name": "김경민",
          "form": {
            "name": "서울 강동구 아리수로50길 50 래미안힐스테이트고덕 209동 2603호 (25PY) 세대 내부 리모델링 (부분시공)",
            "address": "서울 강동구 아리수로50길 50 래미안힐스테이트고덕 209동 2603호 (25PY)"
          },
          "payments": {
            "first": {
              "amount": 1576000,
              "date": "2021-11-18T15:00:00.000Z",
              "etc": ""
            },
            "start": {
              "amount": 6304000,
              "date": "2021-12-01T15:00:00.000Z",
              "etc": ""
            },
            "middle": {
              "amount": 6304000,
              "date": "2021-12-08T15:00:00.000Z",
              "etc": ""
            },
            "remain": {
              "amount": 1576000,
              "date": "2021-12-15T15:00:00.000Z",
              "etc": "(공사종료시)"
            }
          },
          "proid": "p2109_aa50s"
        },
      ];
      let targetProjects;

      targetProjects = [];
      for (let { proid } of widsignTargets) {
        targetProjects.push((await back.getProjectById(proid, { selfMongo })).toNormal())
      }

      targetProjects = targetProjects.filter((obj) => {
        return obj.process.design.construct !== null;
      });

      targetProjects = targetProjects.map((obj) => {
        obj.process.design.construct.contract.payments.proid = obj.proid;
        return obj.process.design.construct.contract;
      })

      targetProjects = targetProjects.map((obj) => {
        if (/유창민/gi.test(obj.partner)) {
          obj.payments.buiid = "u2111_aa01s";
        } else if (/조호익/gi.test(obj.partner)) {
          obj.payments.buiid = "u2111_aa02s";
        } else if (/이청호/gi.test(obj.partner)) {
          obj.payments.buiid = "u2111_aa03s";
        } else if (/김민정/gi.test(obj.partner)) {
          obj.payments.buiid = "u2111_aa04s";
        } else {
          obj.payments.buiid = null;
        }
        return obj;
      })

      targetProjects = targetProjects.filter((obj) => {
        return obj.payments.buiid !== null;
      });

      targetProjects = targetProjects.map((obj) => {
        return obj.payments;
      })

      targetProjects = targetProjects.filter((obj) => {
        return !(obj.first === null && obj.start === null && obj.middle === null && obj.remain === null);
      });

      console.log(targetProjects);
    }

    // await constructGeneralBillSync();




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









    // setInterval(async () => {
    //   console.log(await ghostRequest("insyncCheck", {}))
    // }, 5000);





    // const aliveMembers = await this.pureScan();
    // console.log(await aliveMembers.aliveRequest("/push", { text: "이제 다시 사용하셔도 됩니다!" }));



    // await chrome.scriptRequest("https://www.hometax.go.kr/websquare/websquare.wq?w2xPath=/ui/comm/a/b/UTXPPABA01.xml&w2xHome=/ui/pp/&w2xDocumentRoot=", [
    //   async function () {
    //     const idLoginButtonId = "anchor15";
    //     const returnButtonId = "anchor25";
    //     const inputs = {
    //       id: "iptUserId",
    //       pwd: "iptUserPw"
    //     };
    //     document.getElementById(idLoginButtonId).click();
    //     document.getElementById(inputs.id).value = "homeliaison20";
    //     document.getElementById(inputs.pwd).value = "hlofwis83!";
    //     document.getElementById(returnButtonId).click();
    //   },
    //   async function () {
    //     window.location.href = "https://tecr.hometax.go.kr/websquare/websquare.html?w2xPath=/ui/cr/c/b/UTECRCB013.xml";
    //   },
    //   async function () {
    //     const { sleep } = GeneralJs;
    //     let buttons;
    //     let pageNumber, pageButtons;
    //     let domTargets, textArr;
    //     let total, middle;
    //     let timeIndex;
    //     let tempObj;
    //
    //     buttons = document.querySelectorAll('.w2radio_label');
    //     buttons[2].click();
    //     document.getElementById("trigger1").click();
    //     pageButtons = document.querySelectorAll('.w2pageList_control_label');
    //     pageNumber = pageButtons.length;
    //
    //     await sleep(2000);
    //
    //     total = [];
    //     for (let i = 0; i < pageNumber; i++) {
    //       pageButtons = document.querySelectorAll('.w2pageList_control_label');
    //       pageButtons[i].click();
    //       await sleep(2000);
    //
    //       domTargets = document.getElementById("grdCshpt").querySelectorAll("td");
    //       textArr = [];
    //       for (let dom of domTargets) {
    //         textArr.push(dom.textContent);
    //       }
    //       textArr = textArr.filter((i) => { return !(/[0-9]/g.test(i) && /\:/g.test(i) && /[A-Z]/gi.test(i) && / /gi.test(i) && /,/gi.test(i)); });
    //       textArr = textArr.map((i) => { return i.trim(); });
    //       textArr = textArr.filter((i) => { return i !== '' });
    //
    //       timeIndex = [];
    //       for (let j = 0; j < textArr.length; j++) {
    //         if (/^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9] [0-9][0-9]\:[0-9][0-9]\:[0-9][0-9]$/.test(textArr[j].trim())) {
    //           timeIndex.push(j);
    //         }
    //       }
    //
    //       middle = [];
    //       for (let index of timeIndex) {
    //         middle.push({
    //           method: textArr[index - 1],
    //           time: stringToDate(textArr[index].trim()),
    //           supply: Number(textArr[index + 1].replace(/[^0-9\-]/g, '')),
    //           vat: Number(textArr[index + 2].replace(/[^0-9\-]/g, '')),
    //           service: Number(textArr[index + 3].replace(/[^0-9\-]/g, '')),
    //           total: Number(textArr[index + 4].replace(/[^0-9\-]/g, '')),
    //           id: textArr[index + 5],
    //           issuance: textArr[index + 6],
    //           deal: /승인/gi.test(textArr[index + 7]),
    //           etc: textArr[index + 8],
    //         });
    //       }
    //
    //       total.push(middle);
    //       await sleep(500);
    //
    //       print(total);
    //     }
    //   }
    // ]);








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




    const managerContract = async () => {
      const selfMongo = instance.MONGOLOCALC;
      const sheetsId = "1nqjhgB8xYqoM_6R_wbO7qHJL8EcGMfpa6vc9-xYxNro";
      let clients, cliidArr, projects, projectsRaw, secondCliidArr, targetClients, targetClientHistories, totalClientHistories;
      let arr, result, total, matrix, num, table;
      let keys, values;
      let totalLength;
      let resultLength;
      let start, end;
      let dateArr;
      let tempClient, tempProject;
      let tempCliidArr;
      let startDate, endDate;
      let acc0, acc1, acc2, acc3, acc4, acc5;
      let curr0, curr1, curr2, curr3, curr4, curr5;
      let temp;

      clients = (await back.getClientsByQuery({}, { selfMongo, withTools: true })).getRequestsTong().map((arr) => { let obj = arr[0].toNormal(); obj.cliid = arr.cliid; return obj; });
      clients.sort((a, b) => { return a.timeline.valueOf() - b.timeline.valueOf(); });
      cliidArr = clients.map((obj) => { return { cliid: obj.cliid }; });
      totalClientHistories = await back.getHistoriesByQuery("client", { $or: cliidArr }, { selfMongo });
      for (let obj of clients) {
        for (let history of totalClientHistories) {
          if (obj.cliid === history.cliid) {
            obj.manager = history.manager;
          }
        }
      }

      clients.sort((a, b) => { return a.timeline.valueOf() - b.timeline.valueOf(); });
      cliidArr = clients.map((obj) => { return { cliid: obj.cliid }; });
      totalClientHistories = await back.getHistoriesByQuery("client", { $or: cliidArr }, { selfMongo });

      start = new Date(JSON.stringify(clients[0].timeline).slice(1, -1));
      end = new Date(JSON.stringify(clients[clients.length - 1].timeline).slice(1, -1));
      dateArr = [];
      while (start.valueOf() <= end.valueOf()) {
        dateArr.push([ start.getFullYear(), start.getMonth() + 1, start.getDate() ]);
        start.setDate(start.getDate() + 1);
      }
      dateArr = dateArr.map((arr) => {
        return arr.slice(0, 2).map((num) => { return String(num) }).join("_")
      });
      dateArr = [ ...new Set(dateArr) ].map((str) => { return str.split('_').map((str) => { return Number(str) }) });
      dateArr.reverse();


      projectsRaw = (await back.getProjectsByQuery({ desid: { $regex: "^d" } }, { selfMongo })).toNormal();
      for (let obj of projectsRaw) {
        for (let history of totalClientHistories) {
          if (obj.cliid === history.cliid) {
            obj.manager = history.manager;
          }
        }
      }
      projects = projectsRaw.filter((obj) => {  return obj.process.contract.first.date.valueOf() >= (new Date(2000, 0, 1)).valueOf() });
      secondCliidArr = projects.map((obj) => { return obj.cliid });
      targetClients = clients.filter((obj) => { return secondCliidArr.includes(obj.cliid); });


      arr = targetClients.map((obj) => { return { cliid: obj.cliid, manager: obj.manager } });
      result = {};
      for (let { cliid, manager } of arr) {
        if (result[manager] === undefined) {
          result[manager] = [];
        }
        result[manager].push(cliid);
      }

      arr = clients.map((obj) => { return { cliid: obj.cliid, manager: obj.manager } });
      total = {};
      for (let { cliid, manager } of arr) {
        if (total[manager] === undefined) {
          total[manager] = [];
        }
        total[manager].push(cliid);
      }


      matrix = [ [ "담당자명", "전체 응대수", "전체 문의자 계약수", "전체 계약자 수", "개인계약 성사율(%)", "팀내 응대 비율(%)", "팀내 계약 비율(%)" ] ];
      keys = Object.keys(total);
      totalLength = Object.values(total).map((arr) => { return arr.length; }).reduce((accumulate, current) => { return accumulate + current });
      resultLength = Object.values(result).map((arr) => { return arr.length; }).reduce((accumulate, current) => { return accumulate + current });
      keys.sort();
      acc0 = 0;
      acc1 = 0;
      acc2 = 0;
      acc3 = 0;
      acc4 = 0;
      acc5 = 0;
      for (let name of keys) {
        curr0 = total[name].length;
        curr1 = result[name].length;
        curr2 = result[name].length;
        curr3 = total[name].length === 0 ? 0 : (Math.floor((result[name].length / total[name].length) * 100000) / 1000);
        curr4 = totalLength === 0 ? 0 : (Math.floor((total[name].length / totalLength) * 100000) / 1000);
        curr5 = resultLength === 0 ? 0 : (Math.floor((result[name].length / resultLength) * 100000) / 1000);

        acc0 += curr0;
        acc1 += curr1;
        acc2 += curr2;
        acc3 += curr3;
        acc4 += curr4;
        acc5 += curr5;

        arr = [];
        arr.push(name);
        arr.push(curr0);
        arr.push(curr1);
        arr.push(curr2);
        arr.push(curr3);
        arr.push(curr4);
        arr.push(curr5);
        matrix.push(arr);
      }

      matrix.push([ "total", acc0, acc1, acc2, (Math.floor((acc1 / acc0) * 100000) / 1000), Math.round(acc4), Math.round(acc5) ]);

      matrix.push([ "", "", "", "", "", "", "" ]);

      for (let [ year, month ] of dateArr) {

        startDate = new Date(year, month - 1, 1);
        if (month < 12) {
          endDate = new Date(year, month, 1);
        } else {
          endDate = new Date(year + 1, 0, 1);
        }

        matrix.push([ "담당자명", String(year).slice(2) + '.' + String(month) + " 응대수", String(year).slice(2) + '.' + String(month) + " 문의자 계약수", String(year).slice(2) + '.' + String(month) + " 계약자 수", "개인계약 성사율(%)", "팀내 응대 비율(%)", "팀내 계약 비율(%)" ]);

        tempClient = equalJson(JSON.stringify(clients)).filter((obj) => { return obj.timeline.valueOf() >= startDate.valueOf() && obj.timeline.valueOf() < endDate.valueOf() });
        tempProject = equalJson(JSON.stringify(projectsRaw));
        tempCliidArr = tempClient.map((obj) => { return obj.cliid });
        acc0 = tempClient.length;
        acc1 = tempProject.filter((obj) => { return tempCliidArr.includes(obj.cliid); }).length;

        for (let name of keys) {
          tempClient = equalJson(JSON.stringify(clients)).filter((obj) => { return obj.timeline.valueOf() >= startDate.valueOf() && obj.timeline.valueOf() < endDate.valueOf() }).filter((obj) => { return obj.manager === name });
          tempProject = equalJson(JSON.stringify(projectsRaw));
          tempCliidArr = tempClient.map((obj) => { return obj.cliid });
          curr0 = tempClient.length;
          curr1 = tempProject.filter((obj) => { return tempCliidArr.includes(obj.cliid); }).length;
          curr2 = tempProject.filter((obj) => { return obj.process.contract.first.date.valueOf() >= startDate.valueOf() && obj.process.contract.first.date.valueOf() < endDate.valueOf() }).filter((obj) => { return obj.manager === name }).length;
          curr3 = curr0 === 0 ? 0 : Math.floor((curr1 / curr0) * 100000) / 1000;
          curr4 = acc0 === 0 ? 0 : Math.floor((curr0 / acc0) * 100000) / 1000;
          curr5 = acc1 === 0 ? 0 : Math.floor((curr1 / acc1) * 100000) / 1000;
          matrix.push([
            name,
            curr0,
            curr1,
            curr2,
            curr3,
            curr4,
            curr5,
          ]);
        }

        tempClient = equalJson(JSON.stringify(clients)).filter((obj) => { return obj.timeline.valueOf() >= startDate.valueOf() && obj.timeline.valueOf() < endDate.valueOf() });
        tempProject = equalJson(JSON.stringify(projectsRaw));
        tempCliidArr = tempClient.map((obj) => { return obj.cliid });
        curr0 = tempClient.length;
        curr1 = tempProject.filter((obj) => { return tempCliidArr.includes(obj.cliid); }).length;
        curr2 = tempProject.filter((obj) => { return obj.process.contract.first.date.valueOf() >= startDate.valueOf() && obj.process.contract.first.date.valueOf() < endDate.valueOf() }).length;
        curr3 = curr0 === 0 ? 0 : Math.floor((curr1 / curr0) * 100000) / 1000;
        curr4 = 100;
        curr5 = 100;
        matrix.push([
          "total",
          curr0,
          curr1,
          curr2,
          curr3,
          curr4,
          curr5,
        ]);
        matrix.push([ "", "", "", "", "", "", "" ]);

      }

      console.log(await sheets.update_value_inPython(sheetsId, "", matrix));

    }

    await managerContract();























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
    // await app.spawnLaunching();


    // kakao token
    // const app = new KakaoTalk();
    // await app.generateToken();


    // kakao test
    // const kakao = new KakaoTalk();
    // await kakao.ready();
    // await kakao.sendTalk("pureOutOfClient", "배창규", "010-2747-3403", {
    //   client: "배창규",
    //   emoji0: "(미소)",
    //   emoji1: "(콜)",
    // });



    // raw photo to raw portfolio
    // const filter = new PortfolioFilter();
    // await filter.rawToRaw([
    //   {
    //     client: null,
    //     designer: "유수진",
    //     link: "https://drive.google.com/drive/folders/1bwJ-Qw1bANm7QTt18ljSnHtwoAXyGneN",
    //     pay: true
    //   },
    // ]);



    // get photo folder
    // const drive = new GoogleDrive();
    // await drive.get_folder("https://drive.google.com/drive/folders/1RD8A65ghQe4oPruXYJ4Koieny0n3jYO9", "test");


    // spell check
    // await this.spellCheck("p116");


    // get rawPortfolio by pid
    // await this.getRawPortfolio("p132");


    // get corePortfolio by pid
    // await this.getCorePortfolio("p132");


    // aspirant to designer
    // await this.aspirantToDesigner([
    //   [ "유수진", "2021-11-15" ],
    // ]);


    // new designer to front web
    // await work.newDesignerToFront([ "d2111_aa02s" ]);


    // new designer set proposal setting
    // await this.setProposalSettingForDesigner("d2111_aa01s", [
    //   { porlid: "ghost", index: 5 },
    //   { porlid: "ghost", index: 2 },
    //   { porlid: "ghost", index: 6 },
    //   { porlid: "ghost", index: 4 },
    //   { porlid: "ghost", index: 7 },
    //   { porlid: "ghost", index: 1 },
    // ], [
    //   "그 집의 구성원, 패턴, 니즈를 모두 반영하여 고객 중심의 공간을 만듭니다.",
    //   "새롭거나 놀라워 의외의 느낌을 주는 동시에 실용적인 공간을 만듭니다.",
    //   "최소한의 가구와 패브릭, 그리고 소품으로 단순하고 세련된 스타일을 구사합니다."
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
    //   await messageSend({ text: `${designer} 디자이너의 첫 번째 포트폴리오 컨텐츠를 웹에 업로드하였습니다! link : ${webLinks[0]}`, channel });
    //   await messageSend({ text: `${designer} 디자이너 페이지를 생성하여 웹에 업로드하였습니다! link : ${webLinks[1]}`, channel });
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
    // console.log(await bill.passiveSync("b219g_aa02s", "김수진", 1, 330000, new Date(2021, 8, 15, 15, 0, 0), "카드(삼성)", "이니시스"));


    // front designer sync
    // await this.frontDesignerSync();

    // ready page block
    // await this.pageReady("webProposal");


    // render page block
    // await this.pageRender(process.env.HOME + "/improvingContract/improvingContract.ai");


    // voice to text
    // const audio = new PlayAudio();
    // await audio.voiceToText();


    // send native alarm
    // const alarm = new NativeNotifier();
    // await alarm.sendAlarm("안녕안녕", () => {});

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
    // await rethink.close();
    console.log(`done`);
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

DevContext.prototype.pureSpawn = async function () {
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
    delete package.dependencies["@babel/runtime"];
    delete package.dependencies["@babel/runtime-corejs3"];
    delete package.dependencies["csso"];
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

DevContext.prototype.passiveAddressSync = async function (cliid) {
  const instance = this;
  const back = this.back;
  const { ghostRequest } = this.mother;
  try {
    const addr = new AddressParser();
    const client = await back.getClientById(cliid);
    const data = await addr.apartNameSearch(client.requests[0].request.space.address.value);
    data.cliid = client.cliid;
    console.log(data);
    await ghostRequest("/apartment", { data });
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

DevContext.prototype.findCode = async function (str, openMode = false) {
  if (typeof str !== "string" || typeof openMode !== "boolean") {
    throw new Error("invaild input");
  }
  const instance = this;
  const { treeParsing, fileSystem, shellExec, shellLink } = this.mother;
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
        await shellExec(`atom ${shellLink(process.cwd() + s)};`);
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
  const { fileSystem, shell, shellLink, ghostFileUpload, requestSystem, ghostRequest, mysqlQuery, binaryRequest, cryptoString, decryptoHash } = this.mother;
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
  const { fileSystem, shell, shellLink, ghostFileUpload, requestSystem, ghostRequest, mysqlQuery, binaryRequest, cryptoString, decryptoHash } = this.mother;
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
