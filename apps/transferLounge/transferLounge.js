class TransferLounge {
  constructor () {
    const Mother = require(process.cwd() + "/apps/mother.js");
    const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js");
    const ADDRESS = require(process.cwd() + "/apps/infoObj.js");
    this.mother = new Mother();
    this.back = new BackMaker();
    this.address = ADDRESS;
    const { WebClient } = require("@slack/web-api");
    this.dir = process.cwd() + "/apps/transferLounge";
    this.slack_token = this.address.officeinfo.slack.bot;
    this.slack_userToken = this.address.officeinfo.slack.user;
    this.slack_bot = new WebClient(this.slack_token);
    this.slack_user = new WebClient(this.slack_userToken);
    this.slack_info = {
      endPoint: "https://slack.com/api",
      userDictionary: {},
      channelDictionary: {
        "CLQERRWR1": "general",
        "CLQERS2CB": "homestyling-platform",
        "CLVGBR8HX": "random",
        "CPLC56QUW": "plan_image",
        "CRWHWBN2V": "cooperation",
        "C01DG384RFF": "to-do-list",
        "CLY8SV681": "401_consulting",
        "CM1T6HXLM": "502_sns_contents",
        "CM20UBN3S": "403_proposal",
        "CM3PM73LP": "000_master_notice",
        "C02SQGGTG00": "001_staff_notice",
        "CUZGKGUBS": "100_service",
        "CM4G6QBRT": "300_designer",
        "CM5H48SJG": "105_ir",
        "CM9PHLM0D": "200_web",
        "C02RP66AK6C": "201_test",
        "C02K21JU5K5": "202_request",
        "C03RCHW40UT": "203_schedule",
        "C03UMHVQQT1": "204_magazine",
        "C04CK5X9Q83": "301_console",
        "CMZMWGK1A": "400_customer",
        "C02AE3H16US": "404_curation",
        "C03KHAUAL9Y": "405_mini",
        "CNY9UEBEG": "500_marketing",
        "C01HHA4DC0K": "503_contents",
        "CS05EFPD1": "900_design",
        "C0135LFQH7X": "700_operation",
        "C0236JSQGGP": "701_taxbill",
        "C04DN6KMHBR": "702_mail",
        "C01E32KPH0Q": "수다방",
        "C01EBS9E5BK": "시공",
        "C02FBSYM40G": "file",
        "C02KKLHUVBJ": "call",
        "C04H4LBJZ3R": "emergency_alarm",
        "C04LB1RBWQ5": "plan",
      },
      attackTarget: {
        user: "U05NNQYUFHD",
        channel: "D062B65SSNS",
      },
    };
  }

  async transConnect() {
    const { fileSystem, shellExec, shellLink, mongo, mongoinfo, mongoofficeinfo, mongolocalinfo, errorLog, messageLog, setQueue, requestSystem, dateToString, sleep, expressLog, emergencyAlarm, cronLog, aliveLog, alertLog } = this.mother;
    const { slack_userToken, slack_info } = this;
    const back = this.back;
    const PORT = 3003;
    const https = require("https");
    const express = require("express");
    const app = express();
    const useragent = require("express-useragent");
    const staticFolder = process.env.HOME + "/static";
    const fs = require("fs");
    const logKeyword = "expressLog";
    const logFolder = process.env.HOME + "/server/log";
    const thisLogFile = `${logFolder}/${logKeyword}_${(new Date()).valueOf()}.log`;
    const serverName = "trans";
  
    // Express 설정
    app.use(useragent.express());
    app.use(express.json({ limit: "50mb" }));
    app.use(express.urlencoded({ limit: "50mb", extended: true }));
    app.use(express.static(staticFolder));
    app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET, PUT, HEAD, OPTIONS");
      res.header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With, remember-me");
      if (req.method === "OPTIONS") {
        res.sendStatus(200);
      } else {
        next();
      }
    });
  
    try {
      console.log(``);
      console.log(`\x1b[36m\x1b[1m%s\x1b[0m`, `launching transfer lounge ==============`);
      console.log(``);
  
      // MongoDB 연결 설정
      const MONGOC = new mongo(mongoinfo);
      const MONGOLOCALC = new mongo(mongoofficeinfo);
      console.log(`\x1b[33m%s\x1b[0m`, `set DB server => ${this.address.mongoinfo.host}`);
      console.log(``);
      await MONGOC.connect();
      await MONGOLOCALC.connect();
  
      // KakaoTalk 및 HumanPacket 인스턴스 생성
      const KakaoTalk = require(`${process.cwd()}/apps/kakaoTalk/kakaoTalk.js`);
      const kakaoInstance = new KakaoTalk();
      const HumanPacket = require(`${process.cwd()}/apps/humanPacket/humanPacket.js`);
      const humanInstance = new HumanPacket();
  
      // PEM 키 설정
      let pems = {};
      const pemsLink = process.cwd() + "/pems/" + this.address.secondinfo.host;
  
      const certDir = await fileSystem(`readDir`, [`${pemsLink}/cert`]);
      const keyDir = await fileSystem(`readDir`, [`${pemsLink}/key`]);
      const caDir = await fileSystem(`readDir`, [`${pemsLink}/ca`]);
  
      for (let i of certDir) {
        if (i !== '.DS_Store') {
          pems.cert = await fileSystem(`read`, [`${pemsLink}/cert/${i}`]);
          break; // 첫 번째 pem 파일만 읽습니다.
        }
      }
      for (let i of keyDir) {
        if (i !== '.DS_Store') {
          pems.key = await fileSystem(`read`, [`${pemsLink}/key/${i}`]);
          break; // 첫 번째 pem 파일만 읽습니다.
        }
      }
      pems.ca = [];
      for (let i of caDir) {
        if (i !== '.DS_Store') {
          pems.ca.push(await fileSystem(`read`, [`${pemsLink}/ca/${i}`]));
        }
      }
      pems.allowHTTP1 = true;
  
      // 슬랙 멤버 정보 설정
      let members = await back.setMemberObj({ getMode: true, selfMongo: MONGOC });
      members = members.map((member) => member.slack).filter((obj) => obj.id);
      for (let { id, name } of members) {
        slack_info.userDictionary[id] = name;
      }
  
      // 라우터 설정
      const TransferRouter = require(`${this.dir}/router/transferRouter.js`);
      const router = new TransferRouter(this.slack_bot, this.slack_user, MONGOC, MONGOLOCALC, slack_userToken, slack_info, kakaoInstance, humanInstance);
      const rouObj = router.getAll();
  
      // 로그 설정
      const logStream = fs.createWriteStream(thisLogFile);
      await expressLog(serverName, logStream, "start");
      const logger = {
        alert: async (text) => {
          try {
            expressLog(serverName, logStream, "alert", { text }).catch(console.error);
            await emergencyAlarm(text);
          } catch (e) {
            console.error(e);
          }
        },
        log: async (text) => {
          try {
            expressLog(serverName, logStream, "log", { text }).catch(console.error);
            await errorLog(text);
          } catch (e) {
            console.error(e);
          }
        },
        error: async (text) => {
          try {
            expressLog(serverName, logStream, "error", { text }).catch(console.error);
            await alertLog(text);
          } catch (e) {
            console.error(e);
          }
        },
        cron: async (text) => {
          try {
            expressLog(serverName, logStream, "cron", { text }).catch(console.error);
            await cronLog(text);
          } catch (e) {
            console.error(e);
          }
        },
        alive: async (text) => {
          try {
            expressLog(serverName, logStream, "alive", { text }).catch(console.error);
            await aliveLog(text);
          } catch (e) {
            console.error(e);
          }
        },
        stream: logStream,
        path: thisLogFile,
      };
  
      // 라우트 등록
      for (let obj of rouObj.get) {
        app.get(obj.link, async (req, res) => {
          try {
            expressLog(serverName, logStream, "route", req).catch(console.error);
            await obj.func(req, res, logger);
          } catch (e) {
            console.error(e);
            res.set("Content-Type", "application/json");
            res.send(JSON.stringify({ error: e.message }));
          }
        });
      }
      for (let obj of rouObj.post) {
        app.post(obj.link, async (req, res) => {
          try {
            expressLog(serverName, logStream, "route", req).catch(console.error);
            await obj.func(req, res, logger);
          } catch (e) {
            console.error(e);
            res.set("Content-Type", "application/json");
            res.send(JSON.stringify({ error: e.message }));
          }
        });
      }
      console.log(`set router`);
  
      // HTTPS 서버 실행
      https.createServer(pems, app).listen(PORT, () => {
        console.log(`\x1b[33m%s\x1b[0m`, `\nServer running\n`);
      });
    } catch (e) {
      console.error(e);
    }
  }
}

module.exports = TransferLounge;
