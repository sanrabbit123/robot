/**
 * @class StaticLounge
 * @description 이 클래스는 StaticLounge라는 이름의 Express 서버를 초기화하고 관리하는 데 사용됩니다. 
 * MongoDB와의 연결을 비롯한 여러 백엔드 작업을 수행하는 데 필요한 도구들을 제공합니다. 
 * 또한, Mother 및 BackMaker 클래스와의 통합을 통해 서버 운영에 필요한 다양한 유틸리티 기능을 지원합니다.
 */
class StaticLounge {

  /**
   * @constructor
   * @param {Object|null} mother - Mother 클래스의 인스턴스 (생략 가능).
   * @param {Object|null} back - BackMaker 클래스의 인스턴스 (생략 가능).
   * @param {Object|null} address - 서버 설정 정보 객체 (생략 가능).
   * @description StaticLounge 클래스의 인스턴스를 초기화합니다. 
   * 주어진 파라미터들이 있으면 그것들을 사용하고, 그렇지 않으면 새 인스턴스를 생성하여 초기화합니다. 
   * 서버 운영에 필요한 디렉토리 경로도 설정합니다.
   */
  constructor(mother = null, back = null, address = null) {

    // mother, back, address가 null이 아닐 경우
    if (mother !== null && back !== null && address !== null) {
      
      // 주어진 Mother 클래스 인스턴스를 현재 객체의 mother 속성에 할당합니다.
      this.mother = mother;

      // 주어진 BackMaker 클래스 인스턴스를 현재 객체의 back 속성에 할당합니다.
      this.back = back;

      // 주어진 서버 설정 정보 객체를 현재 객체의 address 속성에 할당합니다.
      this.address = address;

    } else {
      
      // Mother 클래스를 현재 작업 디렉토리에서 불러옵니다.
      const Mother = require(process.cwd() + "/apps/mother.js");

      // BackMaker 클래스를 현재 작업 디렉토리에서 불러옵니다.
      const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js");

      // 서버 설정 정보를 포함하는 ADDRESS 객체를 현재 작업 디렉토리에서 불러옵니다.
      const ADDRESS = require(process.cwd() + "/apps/infoObj.js");

      // Mother 클래스의 인스턴스를 생성하여 현재 객체의 mother 속성에 할당합니다.
      this.mother = new Mother();

      // BackMaker 클래스의 인스턴스를 생성하여 현재 객체의 back 속성에 할당합니다.
      this.back = new BackMaker();

      // 불러온 서버 설정 정보를 현재 객체의 address 속성에 할당합니다.
      this.address = ADDRESS;
    }

    // StaticLounge와 관련된 작업 디렉토리 경로를 설정하여 dir 속성에 할당합니다.
    this.dir = process.cwd() + "/apps/staticLounge";
  }
}

/**
 * StaticLounge 클래스의 staticConnect 메서드입니다.
 * 이 메서드는 StaticLounge 서버를 설정하고 시작합니다.
 * MongoDB 연결 설정, KakaoTalk 및 HumanPacket 인스턴스 초기화, HTTPS 서버 시작 등의 작업을 수행합니다.
 * @returns {Promise<void>}
 */
StaticLounge.prototype.staticConnect = async function () {

  // 현재 StaticLounge 인스턴스를 instance 변수에 할당합니다.
  const instance = this;

  /**
   * Mother 클래스에서 제공하는 다양한 유틸리티 메서드 및 정보를 디스트럭처링 할당합니다.
   * - fileSystem: 파일 시스템 작업을 수행하는 메서드입니다.
   * - shellExec: 쉘 명령을 실행하는 메서드입니다.
   * - shellLink: 파일 경로를 안전하게 변환하는 메서드입니다.
   * - mongo: MongoDB 클라이언트 모듈입니다.
   * - mongoinfo: MongoDB 연결 정보 객체입니다.
   * - mongolocalinfo: 로컬 MongoDB 연결 정보 객체입니다.
   * - mongoconsoleinfo: 콘솔용 MongoDB 연결 정보 객체입니다.
   * - mongocontentsinfo: 콘텐츠용 MongoDB 연결 정보 객체입니다.
   * - errorLog: 오류 로그를 기록하는 메서드입니다.
   * - messageLog: 일반 메시지 로그를 기록하는 메서드입니다.
   * - setQueue: 작업 큐를 설정하는 메서드입니다.
   * - requestSystem: HTTP 요청을 수행하는 메서드입니다.
   * - dateToString: 날짜를 문자열로 변환하는 메서드입니다.
   * - sleep: 비동기 대기 메서드입니다.
   * - expressLog: Express 서버 로그를 기록하는 메서드입니다.
   * - emergencyAlarm: 긴급 알람을 보내는 메서드입니다.
   * - aliveLog: 서버 활성화 상태를 기록하는 메서드입니다.
   * - cronLog: 정기 작업 로그를 기록하는 메서드입니다.
   * - alertLog: 알림 로그를 기록하는 메서드입니다.
   */
  const { 
    fileSystem, shellExec, shellLink, mongo, mongoinfo, mongolocalinfo, mongoconsoleinfo, mongocontentsinfo, 
    errorLog, messageLog, setQueue, requestSystem, dateToString, sleep, expressLog, emergencyAlarm, aliveLog, cronLog, alertLog 
  } = this.mother;

  // 서버가 청취할 포트를 3000번으로 설정합니다.
  const PORT = 3000;

  // HTTPS 모듈을 불러옵니다. 이 모듈은 HTTPS 서버를 생성하는 데 사용됩니다.
  const https = require("https");

  // Express 모듈을 불러옵니다. 이 모듈은 웹 서버를 구축하는 데 사용됩니다.
  const express = require("express");

  // Express 애플리케이션 인스턴스를 생성합니다.
  const app = express();

  // express-useragent 미들웨어를 불러옵니다. 이 미들웨어는 사용자 에이전트(브라우저 정보 등)를 파싱합니다.
  const useragent = require("express-useragent");

  // 정적 파일이 위치한 폴더 경로를 환경 변수 HOME과 'samba' 디렉토리를 결합하여 설정합니다.
  const staticFolder = process.env.HOME + "/samba";

  // 사용자 에이전트를 파싱하는 미들웨어를 애플리케이션에 추가합니다.
  app.use(useragent.express());

  // JSON 요청 본문의 최대 크기를 50MB로 제한하는 미들웨어를 추가합니다.
  app.use(express.json({ limit: "50mb" }));

  // URL 인코딩된 요청 본문의 최대 크기를 50MB로 제한하고, 확장된 URL 인코딩을 허용하는 미들웨어를 추가합니다.
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // 정적 파일을 제공하는 미들웨어를 추가하여 staticFolder 디렉토리의 파일들을 클라이언트에게 제공합니다.
  app.use(express.static(staticFolder));

  /**
   * 모든 요청에 대해 CORS(Cross-Origin Resource Sharing) 헤더를 설정하는 미들웨어를 추가합니다.
   * - Access-Control-Allow-Origin: 모든 도메인에서의 요청을 허용합니다.
   * - Access-Control-Allow-Methods: 허용되는 HTTP 메서드를 설정합니다 (GET, PUT, HEAD, OPTIONS).
   * - Access-Control-Allow-Headers: 허용되는 HTTP 헤더를 설정합니다.
   * 만약 요청 메서드가 OPTIONS인 경우, 200 상태 코드로 응답합니다.
   */
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
    // 콘솔에 빈 줄을 출력합니다.
    console.log(``);
    
    // 콘솔에 서버 시작 메시지를 출력합니다.
    console.log(`\x1b[36m\x1b[1m%s\x1b[0m`, `launching static lounge ==============`);

    // 콘솔에 다시 빈 줄을 출력합니다.
    console.log(``);

    // MongoDB 연결을 설정합니다.
    const MONGOC = new mongo(mongoinfo);
    
    // 콘솔에 MongoDB 서버의 호스트 주소를 출력합니다.
    console.log(`\x1b[33m%s\x1b[0m`, `set DB server => ${this.address.mongoinfo.host}`);
    
    // 콘솔에 빈 줄을 출력합니다.
    console.log(``);

    // MongoDB에 연결합니다.
    await MONGOC.connect();

    // KakaoTalk 모듈을 불러옵니다.
    const KakaoTalk = require(`${process.cwd()}/apps/kakaoTalk/kakaoTalk.js`);
    
    // KakaoTalk 인스턴스를 생성합니다.
    const kakaoInstance = new KakaoTalk();

    // HumanPacket 모듈을 불러옵니다.
    const HumanPacket = require(`${process.cwd()}/apps/humanPacket/humanPacket.js`);
    
    // HumanPacket 인스턴스를 생성합니다.
    const humanInstance = new HumanPacket();

    // PEM 키와 관련된 변수를 선언합니다.
    let pems, pemsLink;
    let certDir, keyDir, caDir;

    // PEM 키 정보를 저장할 객체를 초기화합니다.
    pems = {};

    // PEM 파일의 경로를 설정합니다.
    pemsLink = process.cwd() + "/pems/" + this.address.officeinfo.host;

    // 인증서 디렉토리의 파일 목록을 읽어옵니다.
    certDir = await fileSystem(`readDir`, [`${pemsLink}/cert`]);

    // 키 디렉토리의 파일 목록을 읽어옵니다.
    keyDir = await fileSystem(`readDir`, [`${pemsLink}/key`]);

    // CA 디렉토리의 파일 목록을 읽어옵니다.
    caDir = await fileSystem(`readDir`, [`${pemsLink}/ca`]);

    // 인증서 디렉토리에서 인증서 파일을 읽어옵니다.
    for (let i of certDir) {
      if (i !== `.DS_Store`) {
        pems.cert = await fileSystem(`read`, [`${pemsLink}/cert/${i}`]);
      }
    }

    // 키 디렉토리에서 키 파일을 읽어옵니다.
    for (let i of keyDir) {
      if (i !== `.DS_Store`) {
        pems.key = await fileSystem(`read`, [`${pemsLink}/key/${i}`]);
      }
    }

    // CA 디렉토리에서 CA 파일들을 읽어와 pems 객체에 추가합니다.
    pems.ca = [];
    for (let i of caDir) {
      if (i !== `.DS_Store`) {
        pems.ca.push(await fileSystem(`read`, [`${pemsLink}/ca/${i}`]));
      }
    }

    // HTTP/1.1 지원을 허용하는 옵션을 설정합니다.
    pems.allowHTTP1 = true;

    // StaticRouter 모듈을 불러옵니다.
    const StaticRouter = require(`${this.dir}/router/staticRouter.js`);

    // StaticRouter 인스턴스를 생성하고 MongoDB 연결, KakaoTalk 및 HumanPacket 인스턴스를 전달합니다.
    const staticRouter = new StaticRouter(MONGOC, kakaoInstance, humanInstance);

    // 라우터를 설정하고 Express 애플리케이션에 추가합니다.
    const router = staticRouter.setRouter();
    app.use("/", router);

    // HTTPS 서버를 생성하고, pems 객체와 Express 애플리케이션을 사용하여 3000번 포트에서 서버를 시작합니다.
    https.createServer(pems, app).listen(PORT, () => { 
      console.log(`\x1b[33m%s\x1b[0m`, `\nServer running\n`); 
    });

  } catch (e) {
    // 오류가 발생하면 오류 메시지를 콘솔에 출력합니다.
    console.log(e);
  }
}

module.exports = StaticLounge;
