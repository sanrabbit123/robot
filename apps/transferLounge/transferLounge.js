class TransferLounge {
  constructor () {
    const Mother = require(process.cwd() + "/apps/mother.js");
    const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js");
    const ADDRESS = require(process.cwd() + "/apps/infoObj.js");
    const { WebClient } = require("@slack/web-api");
    this.mother = new Mother();
    this.back = new BackMaker();
    this.address = ADDRESS;
    this.dir = process.cwd() + "/apps/transferLounge";
    this.slack_token = this.address.officeinfo.slack.bot;
    this.slack_bot = new WebClient(this.slack_token);
  }

  async transConnect() {
    const { fileSystem, shellExec, shellLink, mongo, mongoinfo, mongoofficeinfo, mongolocalinfo, errorLog, messageLog, setQueue, requestSystem, dateToString, sleep, expressLog, emergencyAlarm, cronLog, aliveLog, alertLog } = this.mother;
    const back = this.back;
    const PORT = 3003;
    const https = require("https");
    const express = require("express");
    const app = express();
    const useragent = require("express-useragent");
    const staticFolder = process.env.HOME + "/static";
  
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
      await MONGOC.connect();
  
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

      // 라우터 설정
      const TransferRouter = require(`${this.dir}/router/transferRouter.js`);
      const transRouter = new TransferRouter(this.slack_bot, MONGOC, kakaoInstance, humanInstance);
      const router = transRouter.setRouter();
      app.use("/", router);
  
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
