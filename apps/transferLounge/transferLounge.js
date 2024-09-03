/**
 * TransferLounge 클래스는 Transfer Lounge Express 서버를 설정하고 관리하는 역할을 합니다.
 * 이 서버는 디자이너 콘솔 관리, 슬랙 메시지 관리, 파일 입출력 등의 역할을 합니다.
 */
class TransferLounge {
  /**
   * TransferLounge 클래스의 생성자입니다.
   * 서버를 초기화하고 필요한 모듈 및 클래스를 로드합니다.
   */
  constructor () {
    /**
     * @description 현재 작업 디렉토리에서 Mother 클래스를 가져옵니다.
     * Mother 클래스는 다양한 유틸리티 메서드를 제공하며, 이 클래스의 여러 부분에서 사용됩니다.
     */
    const Mother = require(process.cwd() + "/apps/mother.js");

    /**
     * @description 현재 작업 디렉토리에서 BackMaker 클래스를 가져옵니다.
     * BackMaker 클래스는 백엔드 작업을 관리하는 데 사용됩니다.
     */
    const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js");

    /**
     * @description 서버 설정 정보를 담고 있는 ADDRESS 객체를 가져옵니다.
     * 여기에는 MongoDB 연결 정보, Slack 토큰 등이 포함됩니다.
     */
    const ADDRESS = require(process.cwd() + "/apps/infoObj.js");

    /**
     * @description Slack Web API 클라이언트를 가져옵니다.
     * Slack과의 상호작용을 위해 WebClient 클래스를 사용합니다.
     */
    const { WebClient } = require("@slack/web-api");

    /**
     * @description Mother 클래스의 인스턴스를 생성하여 서버에서 사용할 다양한 유틸리티 메서드를 초기화합니다.
     * 이 인스턴스는 MongoDB 연결, 파일 시스템 작업, 로그 기록 등을 처리할 수 있습니다.
     */
    this.mother = new Mother();

    /**
     * @description BackMaker 클래스의 인스턴스를 생성하여 백엔드 관련 작업을 처리할 수 있도록 합니다.
     * 이를 통해 서버의 백엔드 작업을 관리합니다.
     */
    this.back = new BackMaker();

    /**
     * @description 서버의 설정 정보를 저장합니다.
     * ADDRESS 객체에는 MongoDB 정보, Slack 토큰 등이 포함되어 있으며, 이 정보를 통해 서버 설정을 관리합니다.
     */
    this.address = ADDRESS;

    /**
     * @description Transfer Lounge 관련 작업 디렉토리 경로를 설정합니다.
     * 서버가 위치한 디렉토리를 기준으로 경로를 설정합니다.
     */
    this.dir = process.cwd() + "/apps/transferLounge";

    /**
     * @description Slack 봇 토큰을 설정 정보에서 가져옵니다.
     * 이 토큰을 사용하여 Slack API에 접근할 수 있습니다.
     */
    this.slack_token = this.address.officeinfo.slack.bot;

    /**
     * @description Slack Web API 클라이언트를 초기화합니다.
     * 이 클라이언트를 사용하여 Slack 채널에 메시지를 보내거나 상호작용할 수 있습니다.
     */
    this.slack_bot = new WebClient(this.slack_token);
  }

  /**
   * @description 이 메서드는 Transfer Lounge 서버를 설정하고 MongoDB 연결, 
   * SSL/TLS 설정, 외부 서비스 통합을 포함한 다양한 초기화 작업을 수행합니다.
   * 비동기로 실행되며 서버가 준비될 때까지 대기합니다.
   */
  async transConnect() {
    /**
     * @description Mother 클래스의 유틸리티 메서드를 비구조화 할당으로 가져옵니다.
     * 이 메서드들은 파일 시스템 작업, 쉘 명령어 실행, MongoDB 연결 등 다양한 작업에 사용됩니다.
     */
    const { fileSystem, shellExec, shellLink, mongo, mongoinfo } = this.mother;

    /**
     * @description BackMaker 인스턴스를 back 변수에 할당합니다.
     * 이를 통해 백엔드 관련 작업을 처리합니다.
     */
    const back = this.back;

    /**
     * @description 서버가 수신할 포트를 정의합니다. 여기서 포트 번호는 3003입니다.
     */
    const PORT = 3003;

    /**
     * @description HTTPS 모듈을 가져와서 SSL/TLS를 통해 보안을 강화한 서버를 생성할 수 있습니다.
     */
    const https = require("https");

    /**
     * @description Express 프레임워크를 가져옵니다. 
     * Express는 Node.js에서 널리 사용되는 웹 서버 프레임워크로, 애플리케이션을 관리합니다.
     */
    const express = require("express");

    /**
     * @description Express 애플리케이션 인스턴스를 생성합니다.
     * 이 인스턴스는 서버의 모든 라우팅 및 미들웨어를 관리합니다.
     */
    const app = express();

    /**
     * @description express-useragent 미들웨어를 가져옵니다.
     * 이 미들웨어는 요청 헤더에서 사용자 에이전트 정보를 추출하여 Express 애플리케이션에 추가합니다.
     */
    const useragent = require("express-useragent");

    /**
     * @description 정적 파일을 제공할 폴더 경로를 설정합니다.
     * HOME 환경 변수에서 기본 경로를 가져와 /static 폴더를 연결합니다.
     */
    const staticFolder = process.env.HOME + "/static";

    /**
     * @description useragent 미들웨어를 Express 애플리케이션에 추가합니다.
     * 이를 통해 각 요청의 사용자 에이전트 정보를 사용할 수 있습니다.
     */
    app.use(useragent.express());

    /**
     * @description Express 애플리케이션에서 JSON 데이터를 처리할 수 있도록 JSON 미들웨어를 추가합니다.
     * 요청 본문의 크기 제한을 50MB로 설정하여 큰 JSON 파일도 처리할 수 있도록 합니다.
     */
    app.use(express.json({ limit: "50mb" }));

    /**
     * @description URL 인코딩된 데이터를 처리할 수 있도록 Express 애플리케이션에 URL 인코딩 미들웨어를 추가합니다.
     * extended 옵션을 true로 설정하여 쿼리 문자열을 포함한 복잡한 데이터 구조도 처리할 수 있습니다.
     */
    app.use(express.urlencoded({ limit: "50mb", extended: true }));

    /**
     * @description 정적 파일을 제공하기 위해 Express 애플리케이션에 정적 파일 미들웨어를 추가합니다.
     * 위에서 설정한 staticFolder 경로를 사용하여 클라이언트에게 정적 파일을 제공합니다.
     */
    app.use(express.static(staticFolder));

    /**
     * @description CORS 헤더를 설정하여 모든 도메인에서의 접근을 허용합니다.
     * 모든 요청에 대해 특정 메서드(GET, PUT, HEAD, OPTIONS)를 허용하며, 특정 헤더를 허용합니다.
     * OPTIONS 메서드의 경우, 200 상태 코드로 응답하여 CORS 사전 요청을 처리합니다.
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
      /**
       * @description 서버 시작 메시지를 콘솔에 출력합니다.
       * 콘솔의 출력 색상을 설정하여 더 잘 보이도록 합니다.
       */
      console.log(``);
      console.log(`\x1b[36m\x1b[1m%s\x1b[0m`, `launching transfer lounge ==============`);
      console.log(``);

      /**
       * @description MongoDB 연결을 설정합니다.
       * Mother 클래스의 mongo 메서드를 사용하여 MongoDB 클라이언트를 생성하고, 연결을 수행합니다.
       */
      const MONGOC = new mongo(mongoinfo);
      await MONGOC.connect();

      /**
       * @description KakaoTalk 및 HumanPacket 인스턴스를 생성하여 외부 서비스와의 통합을 처리합니다.
       * 이 인스턴스들은 각각 카카오톡 API 및 사용자 패킷 처리와 관련된 기능을 제공합니다.
       */
      const KakaoTalk = require(`${process.cwd()}/apps/kakaoTalk/kakaoTalk.js`);
      const kakaoInstance = new KakaoTalk();
      const HumanPacket = require(`${process.cwd()}/apps/humanPacket/humanPacket.js`);
      const humanInstance = new HumanPacket();

      /**
       * @description PEM 키 설정을 위해 빈 객체를 초기화합니다.
       * SSL/TLS 설정에 필요한 인증서, 키, CA 파일을 담기 위해 사용됩니다.
       */
      let pems = {};
      const pemsLink = process.cwd() + "/pems/" + this.address.secondinfo.host;

      /**
       * @description 인증서, 키, CA 파일이 있는 디렉토리에서 파일 목록을 읽어옵니다.
       * fileSystem 메서드를 사용하여 각 디렉토리에서 파일 목록을 가져옵니다.
       */
      const certDir = await fileSystem(`readDir`, [`${pemsLink}/cert`]);
      const keyDir = await fileSystem(`readDir`, [`${pemsLink}/key`]);
      const caDir = await fileSystem(`readDir`, [`${pemsLink}/ca`]);

      /**
       * @description 인증서 파일을 읽어 PEM 형식으로 pems 객체에 저장합니다.
       * 첫 번째로 발견된 인증서 파일만 읽습니다.
       */
      for (let i of certDir) {
        if (i !== '.DS_Store') {
          pems.cert = await fileSystem(`read`, [`${pemsLink}/cert/${i}`]);
          break; // 첫 번째 pem 파일만 읽습니다.
        }
      }

      /**
       * @description 키 파일을 읽어 PEM 형식으로 pems 객체에 저장합니다.
       * 첫 번째로 발견된 키 파일만 읽습니다.
       */
      for (let i of keyDir) {
        if (i !== '.DS_Store') {
          pems.key = await fileSystem(`read`, [`${pemsLink}/key/${i}`]);
          break; // 첫 번째 pem 파일만 읽습니다.
        }
      }

      /**
       * @description CA 파일을 읽어 PEM 형식으로 pems 객체에 저장합니다.
       * CA 파일들은 배열로 저장되며, 각 파일이 pem 형식으로 변환됩니다.
       */
      pems.ca = [];
      for (let i of caDir) {
        if (i !== '.DS_Store') {
          pems.ca.push(await fileSystem(`read`, [`${pemsLink}/ca/${i}`]));
        }
      }

      /**
       * @description HTTP/1.1 지원을 위해 pems 객체의 allowHTTP1 속성을 true로 설정합니다.
       * 이는 HTTP/2만을 지원하는 서버와의 호환성을 유지하기 위함입니다.
       */
      pems.allowHTTP1 = true;

      /**
       * @description 서버의 라우터를 설정합니다.
       * TransferRouter 클래스의 인스턴스를 생성하여 슬랙, MongoDB, KakaoTalk, HumanPacket 인스턴스를 전달하고,
       * 이를 통해 라우터를 설정한 뒤, Express 애플리케이션에 적용합니다.
       */
      const TransferRouter = require(`${this.dir}/router/transferRouter.js`);
      const transRouter = new TransferRouter(this.slack_bot, MONGOC, kakaoInstance, humanInstance);
      const router = transRouter.setRouter();
      app.use("/", router);

      /**
       * @description HTTPS 서버를 생성하고, 지정된 포트에서 서버를 시작합니다.
       * PEM 파일로 설정된 인증서를 사용하여 HTTPS를 통해 서버가 실행됩니다.
       * 서버가 성공적으로 실행되면 콘솔에 메시지를 출력합니다.
       */
      https.createServer(pems, app).listen(PORT, () => {
        console.log(`\x1b[33m%s\x1b[0m`, `\nServer running\n`);
      });
    } catch (e) {
      /**
       * @description 서버 실행 중 발생한 모든 오류를 콘솔에 출력합니다.
       * 오류가 발생하면 서버는 실행되지 않을 수 있습니다.
       */
      console.error(e);
    }
  }
}

module.exports = TransferLounge;
