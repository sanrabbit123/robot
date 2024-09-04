/**
 * @file transferRouter.js
 * @description 이 파일은 Transfer Lounge 서버의 라우터를 정의합니다. 
 * 주로 파일 업로드, 클라이언트 및 디자이너 데이터 관리, 디렉토리 읽기 등을 처리합니다.
 */

// 서버 내에서 필요한 여러 모듈을 가져옵니다.
const Mother = require(process.cwd() + "/apps/mother.js"); // Mother 클래스는 다양한 유틸리티 메서드를 제공합니다.
const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js"); // BackMaker 클래스는 백엔드 관련 작업을 관리합니다.
const ImageReader = require(process.cwd() + "/apps/imageReader/imageReader.js"); // ImageReader 클래스는 이미지 처리 작업을 수행합니다.
const ParsingHangul = require(process.cwd() + "/apps/parsingHangul/parsingHangul.js"); // ParsingHangul 클래스는 한글 처리 작업을 수행합니다.
const GoogleSheet = require(`${process.cwd()}/apps/googleAPIs/googleSheet.js`); // GoogleSheet 클래스는 구글 시트와의 통신을 처리합니다.
const GoogleDrive = require(`${process.cwd()}/apps/googleAPIs/googleDrive.js`); // GoogleDrive 클래스는 구글 드라이브와의 통신을 처리합니다.
const ReadDocuments = require(`${process.cwd()}/apps/readDocuments/readDocuments.js`); // ReadDocuments 클래스는 문서 읽기를 처리합니다.

// 서버의 다른 기능에 필요한 모듈을 추가로 가져옵니다.
const jsdom = require("jsdom"); // jsdom은 서버 측에서 DOM을 시뮬레이션하는 데 사용됩니다.
const { JSDOM } = jsdom; // JSDOM 객체를 가져옵니다.
const address = require(process.cwd() + "/apps/infoObj.js"); // 서버의 설정 정보를 담고 있는 객체를 가져옵니다.
const host = address.secondinfo.host; // 서버 호스트 정보를 가져옵니다.
const mother = new Mother(); // Mother 클래스의 인스턴스를 생성합니다.
const back = new BackMaker(); // BackMaker 클래스의 인스턴스를 생성합니다.
const formidable = require("formidable"); // formidable은 파일 업로드를 처리하는 데 사용됩니다.
const imageReader = new ImageReader(mother, back, address); // ImageReader 인스턴스를 생성합니다.
const hangul = new ParsingHangul(); // ParsingHangul 인스턴스를 생성합니다.
const sheets = new GoogleSheet(); // GoogleSheet 인스턴스를 생성합니다.
const drive = new GoogleDrive(); // GoogleDrive 인스턴스를 생성합니다.
const documents = new ReadDocuments(); // ReadDocuments 인스턴스를 생성합니다.
const querystring = require("querystring"); // querystring 모듈은 URL 쿼리 문자열을 처리하는 데 사용됩니다.

// 로그 관련 설정을 정의합니다.
const bar = "============================================================"; // 로그 메시지 구분을 위한 바 형식의 문자열

// Mother 클래스에서 제공하는 다양한 유틸리티 메서드를 비구조화 할당으로 가져옵니다.
const { diskReading, aliveMongo, errorLog, alertLog, cronLog, aliveLog, expressLog, requestSystem, fileSystem, shellExec, shellLink, todayMaker, messageSend, uniqueValue, equalJson, linkToString, decryptoHash, cryptoString, stringToLink, objectDeepCopy, ajaxJson, sleep, setQueue, messageLog, serviceParsing, dateToString, emergencyAlarm, stringToDate, ipParsing } = mother;

// 로그 메시지 및 오류를 처리하는 로거 객체를 정의합니다.
const logger = {
  alert: async (text) => {
    try {
      await emergencyAlarm(text); // 긴급 경보를 보냅니다.
    } catch (e) {
      console.error(e); // 오류가 발생하면 콘솔에 출력합니다.
    }
  },
  log: async (obj, req = { url: "unknown" }) => {
    try {
      console.log(bar); // 로그 구분을 위한 바 출력
      console.log(new Date(), "log"); // 현재 시간과 로그 메시지 출력
      console.log("in " + String(req.url)); // 요청 URL 출력
      console.log(obj); // 로그 객체 출력
      console.log(bar); // 로그 구분을 위한 바 출력
    } catch (e) {
      console.error(e); // 오류가 발생하면 콘솔에 출력합니다.
    }
  },
  error: async (obj, req = { url: "unknown" }) => {
    try {
      console.log(bar); // 오류 구분을 위한 바 출력
      console.log(new Date(), "error"); // 현재 시간과 오류 메시지 출력
      console.log("in " + String(req.url)); // 요청 URL 출력
      console.log(obj); // 오류 객체 출력
      console.log(bar); // 오류 구분을 위한 바 출력
    } catch (e) {
      console.error(e); // 오류가 발생하면 콘솔에 출력합니다.
    }
  },
  cron: async (text) => {
    try {
      await cronLog(text); // 크론 로그를 기록합니다.
    } catch (e) {
      console.error(e); // 오류가 발생하면 콘솔에 출력합니다.
    }
  },
  alive: async (text) => {
    try {
      await aliveLog(text); // 서버 상태를 기록합니다.
    } catch (e) {
      console.error(e); // 오류가 발생하면 콘솔에 출력합니다.
    }
  },
};

// 정적 파일 경로와 관련된 상수를 정의합니다.
const staticConst = process.env.HOME + "/static";
const sambaToken = "__samba__";
const folderConst = staticConst + "/photo/designer";
const clientConst = staticConst + "/photo/client";
const aspirantConst = staticConst + "/photo/aspirant";
const contractLinkConst = "/photo/contract";
const contractConst = staticConst + contractLinkConst;
const userLinkConst = "/photo/user";
const userConst = staticConst + userLinkConst;
const hashConst = "homeliaisonHash";
const tempConst = staticConst + "/photo/temp";
const designerProfileConst = folderConst + "/profile";
const designerWorksConst = folderConst + "/works";
const designerSettingConst = folderConst + "/setting";
const designerWorksConstFactors = [ "w0", "w1", "w2", "w3" ];
const designerRepresentativeFolderConst = folderConst + "/representative";

/**
 * @class TransferRouter
 * @description TransferRouter 클래스는 Transfer Lounge 서버의 라우터를 관리합니다.
 * 이 클래스는 다양한 HTTP 요청을 처리하고, MongoDB와의 상호작용, 파일 처리, Slack 알림 등을 수행합니다.
 */
class TransferRouter {
  /**
   * @constructor
   * @param {object} slack_bot - Slack 봇 클라이언트 인스턴스.
   * @param {object} MONGOC - MongoDB 클라이언트 인스턴스.
   * @param {object} kakao - KakaoTalk 인스턴스.
   * @param {object} human - HumanPacket 인스턴스.
   * @description TransferRouter 클래스의 생성자로, 다양한 의존성을 초기화합니다.
   */
  constructor(slack_bot, MONGOC, kakao, human) {
    /**
     * @property {object} mongo - MongoDB 클라이언트 인스턴스입니다.
     * MongoDB 데이터베이스와 상호작용을 관리합니다.
     */
    this.mongo = MONGOC;

    /**
     * @property {object} timeouts - 타임아웃을 관리하기 위한 객체입니다.
     * 서버에서 발생할 수 있는 다양한 타임아웃을 추적합니다.
     */
    this.timeouts = {};

    /**
     * @property {object} slack_bot - Slack 봇 클라이언트 인스턴스입니다.
     * Slack과의 상호작용을 관리하며, 메시지 전송 등을 처리합니다.
     */
    this.slack_bot = slack_bot;

    /**
     * @property {object} kakao - KakaoTalk 인스턴스입니다.
     * KakaoTalk API와의 상호작용을 처리합니다.
     */
    this.kakao = kakao;

    /**
     * @property {object} human - HumanPacket 인스턴스입니다.
     * 사용자 패킷 처리와 관련된 작업을 관리합니다.
     */
    this.human = human;

    /**
     * @property {object} JSDOM - JSDOM 라이브러리의 인스턴스입니다.
     * 서버 측에서 DOM을 시뮬레이션하기 위해 사용됩니다.
     */
    this.JSDOM = JSDOM;

    /**
     * @property {object} address - 서버 설정 정보를 담고 있는 객체입니다.
     * 서버의 설정과 관련된 다양한 정보를 포함합니다.
     */
    this.address = address;

    /**
     * @property {string} host - 서버 호스트 정보입니다.
     * 서버가 실행되는 호스트의 URL을 포함합니다.
     */
    this.host = host;

    /**
     * @property {object} mother - Mother 클래스의 인스턴스입니다.
     * 다양한 유틸리티 메서드를 제공하며, 서버의 여러 작업에 사용됩니다.
     */
    this.mother = mother;

    /**
     * @property {object} back - BackMaker 클래스의 인스턴스입니다.
     * 백엔드 작업을 관리하고 처리합니다.
     */
    this.back = back;

    /**
     * @property {object} formidable - formidable 모듈 인스턴스입니다.
     * 파일 업로드와 폼 데이터를 처리하는 데 사용됩니다.
     */
    this.formidable = formidable;

    /**
     * @property {object} imageReader - ImageReader 클래스의 인스턴스입니다.
     * 이미지 처리 작업을 관리합니다.
     */
    this.imageReader = imageReader;

    /**
     * @property {object} hangul - ParsingHangul 클래스의 인스턴스입니다.
     * 한글 처리와 관련된 작업을 관리합니다.
     */
    this.hangul = hangul;

    /**
     * @property {object} sheets - GoogleSheet 클래스의 인스턴스입니다.
     * 구글 시트와의 상호작용을 처리합니다.
     */
    this.sheets = sheets;

    /**
     * @property {object} drive - GoogleDrive 클래스의 인스턴스입니다.
     * 구글 드라이브와의 상호작용을 처리합니다.
     */
    this.drive = drive;

    /**
     * @property {object} documents - ReadDocuments 클래스의 인스턴스입니다.
     * 문서 읽기 작업을 관리합니다.
     */
    this.documents = documents;

    /**
     * @property {object} querystring - querystring 모듈 인스턴스입니다.
     * URL 쿼리 문자열을 파싱하고 조작하는 데 사용됩니다.
     */
    this.querystring = querystring;

    /**
     * @property {string} staticConst - 정적 파일이 저장된 기본 경로입니다.
     * 서버에서 제공하는 정적 파일의 기본 디렉토리 경로를 정의합니다.
     */
    this.staticConst = staticConst;

    /**
     * @property {string} sambaToken - Samba 서버에 접근하기 위한 토큰 상수입니다.
     * 서버에서 Samba 파일 시스템을 관리하기 위해 사용됩니다.
     */
    this.sambaToken = sambaToken;

    /**
     * @property {string} folderConst - 디자이너의 사진이 저장된 폴더의 경로입니다.
     * 이 경로는 디자이너의 작업 및 프로필 사진을 저장하는 데 사용됩니다.
     */
    this.folderConst = folderConst;

    /**
     * @property {string} clientConst - 클라이언트 사진이 저장된 폴더의 경로입니다.
     * 이 경로는 클라이언트의 사진을 저장하는 데 사용됩니다.
     */
    this.clientConst = clientConst;

    /**
     * @property {string} aspirantConst - 예비 디자이너의 사진이 저장된 폴더의 경로입니다.
     * 이 경로는 예비 디자이너의 포트폴리오 및 기타 관련 자료를 저장하는 데 사용됩니다.
     */
    this.aspirantConst = aspirantConst;

    /**
     * @property {string} contractLinkConst - 계약 사진이 저장된 링크의 경로입니다.
     * 이 경로는 서버에서 계약과 관련된 사진 파일을 관리하는 데 사용됩니다.
     */
    this.contractLinkConst = contractLinkConst;

    /**
     * @property {string} contractConst - 계약 사진이 저장된 폴더의 경로입니다.
     * 이 경로는 서버에서 계약 사진을 저장하는 폴더의 절대 경로입니다.
     */
    this.contractConst = contractConst;

    /**
     * @property {string} userLinkConst - 사용자 사진이 저장된 링크의 경로입니다.
     * 이 경로는 서버에서 사용자 사진 파일을 관리하는 데 사용됩니다.
     */
    this.userLinkConst = userLinkConst;

    /**
     * @property {string} userConst - 사용자 사진이 저장된 폴더의 경로입니다.
     * 이 경로는 서버에서 사용자 사진을 저장하는 폴더의 절대 경로입니다.
     */
    this.userConst = userConst;

    /**
     * @property {string} hashConst - 해시를 처리하기 위한 상수 값입니다.
     * 해시 처리와 관련된 작업에서 사용됩니다.
     */
    this.hashConst = hashConst;

    /**
     * @property {string} tempConst - 임시 파일이 저장된 폴더의 경로입니다.
     * 서버에서 임시 파일을 저장하는 데 사용됩니다.
     */
    this.tempConst = tempConst;

    /**
     * @property {string} designerProfileConst - 디자이너 프로필 사진이 저장된 폴더의 경로입니다.
     * 이 경로는 디자이너의 프로필 사진을 관리하는 데 사용됩니다.
     */
    this.designerProfileConst = designerProfileConst;

    /**
     * @property {string} designerWorksConst - 디자이너 작업물이 저장된 폴더의 경로입니다.
     * 이 경로는 디자이너의 작업물을 관리하는 데 사용됩니다.
     */
    this.designerWorksConst = designerWorksConst;

    /**
     * @property {string} designerSettingConst - 디자이너 설정 파일이 저장된 폴더의 경로입니다.
     * 이 경로는 디자이너의 설정 파일을 관리하는 데 사용됩니다.
     */
    this.designerSettingConst = designerSettingConst;

    /**
     * @property {Array} designerWorksConstFactors - 디자이너 작업물과 관련된 상수 배열입니다.
     * 작업물의 다양한 측면을 관리하는 데 사용됩니다.
     */
    this.designerWorksConstFactors = designerWorksConstFactors;

    /**
     * @property {string} designerRepresentativeFolderConst - 디자이너 대표 사진이 저장된 폴더의 경로입니다.
     * 이 경로는 디자이너의 대표 사진을 관리하는 데 사용됩니다.
     */
    this.designerRepresentativeFolderConst = designerRepresentativeFolderConst;
  }

  /**
   * @method setRouter
   * @description 이 메서드는 TransferRouter 클래스의 라우터를 설정합니다.
   * Express.js를 사용하여 HTTP 요청을 처리하는 다양한 경로를 정의하고 설정합니다.
   * 이 메서드는 서버의 주요 엔드포인트를 관리하며, 데이터베이스와의 상호작용, 파일 업로드, Slack 알림 등을 처리합니다.
   * @returns {object} router - 설정된 Express 라우터 객체를 반환합니다.
   */
  setRouter() {
    /**
     * @description TransferRouter 클래스의 인스턴스를 instance 변수에 할당합니다.
     * 이는 콜백 함수에서 this 대신 사용할 수 있도록 합니다.
     */
    const instance = this;

    /**
     * @description Express 모듈을 가져와서 라우터를 생성합니다.
     * 이 라우터는 서버의 모든 HTTP 요청을 처리하는 데 사용됩니다.
     */
    const express = require("express");

    /**
     * @description Express 라우터 객체를 생성합니다.
     * 이 객체는 이후에 정의된 HTTP 요청 핸들러를 포함하게 됩니다.
     */
    const router = express.Router();

    /**
     * @description MongoDB 클라이언트를 mongo 변수에 할당합니다.
     * 이는 데이터베이스 작업을 수행하는 데 사용됩니다.
     */
    const mongo = this.mongo;

    /**
     * @description 서버에서 타임아웃을 관리하기 위한 객체를 timeouts 변수에 할당합니다.
     * 이 객체는 여러 비동기 작업의 타임아웃을 추적하고 관리하는 데 사용됩니다.
     */
    const timeouts = this.timeouts;

    /**
     * @description Slack 봇 클라이언트를 slack_bot 변수에 할당합니다.
     * 이 클라이언트는 Slack 메시지를 보내는 등 Slack API와 상호작용하는 데 사용됩니다.
     */
    const slack_bot = this.slack_bot;

    /**
     * @description KakaoTalk 인스턴스를 kakao 변수에 할당합니다.
     * 이 인스턴스는 KakaoTalk API와 상호작용하는 데 사용됩니다.
     */
    const kakao = this.kakao;

    /**
     * @description HumanPacket 인스턴스를 human 변수에 할당합니다.
     * 이 인스턴스는 사용자 패킷 처리와 관련된 작업을 수행하는 데 사용됩니다.
     */
    const human = this.human;

    /**
     * @description 이 라우트는 특정 ID에 따라 다른 작업을 수행하는 GET 요청을 처리합니다.
     * 요청된 ID에 따라 디스크 상태를 확인하거나, MongoDB 연결 상태를 확인하거나, 특정 페이지로 리다이렉션합니다.
     * @route GET /:id
     * @param {string} id - 요청된 리소스의 ID (예: "ssl", "disk").
     * @returns {object} - JSON 형식의 데이터 또는 HTML 리다이렉션 스크립트를 반환합니다.
     */
    router.get(["/:id"], async (req, res) => {
      /**
       * @description 응답 헤더를 설정하여 응답 형식을 JSON으로 지정하고, 
       * 모든 출처에서의 접근을 허용하며, 특정 HTTP 메서드와 헤더를 허용합니다.
       */
      res.set({
        "Content-Type": "application/json", // 응답의 Content-Type을 JSON으로 설정합니다.
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 지정합니다.
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 요청 헤더를 지정합니다.
      });

      try {
        /**
         * @description 요청된 ID가 "ssl"인 경우, 디스크 상태와 MongoDB 연결 상태를 확인하여 반환합니다.
         */
        if (req.params.id === "ssl") {
          // Mother 클래스의 diskReading 메서드를 사용하여 디스크 상태를 읽습니다.
          const disk = await diskReading();
          
          // Mother 클래스의 aliveMongo 메서드를 사용하여 MongoDB 연결 상태를 확인합니다.
          const aliveMongoResult = await aliveMongo();

          // 디스크 상태와 MongoDB 상태를 JSON 형식으로 응답합니다.
          res.send(JSON.stringify({ disk: disk.toArray(), mongo: aliveMongoResult }));
        } 
        /**
         * @description 요청된 ID가 "disk"인 경우, 디스크 상태를 확인하여 반환합니다.
         */
        else if (req.params.id === "disk") {
          // Mother 클래스의 diskReading 메서드를 사용하여 디스크 상태를 읽습니다.
          const disk = await diskReading();

          // 디스크 상태를 JSON 형식으로 응답합니다.
          res.send(JSON.stringify({ disk: disk.toArray() }));
        } 
        /**
         * @description 요청된 ID가 "ssl" 또는 "disk"가 아닌 경우, 지정된 페이지로 리다이렉션합니다.
         */
        else {
          // 응답 헤더를 HTML 형식으로 설정합니다.
          res.set({
            "Content-Type": "text/html", // 응답의 Content-Type을 HTML로 설정합니다.
            "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 지정합니다.
            "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 요청 헤더를 지정합니다.
          });

          // 지정된 URL로 클라이언트를 리다이렉션하는 HTML 스크립트를 응답으로 보냅니다.
          res.send((`<html><script>window.location.href = "https://${instance.address.officeinfo.host}:3002/${req.params.id}";</script></html>`));
        }
      } catch (e) {
        /**
         * @description 예외 발생 시, 오류를 로깅하고, 오류 메시지를 JSON 형식으로 응답합니다.
         */
        // 발생한 오류를 로그로 기록합니다.
        logger.error(e, req).catch((e) => { console.log(e); });

        // 오류 메시지를 JSON 형식으로 응답합니다.
        res.send(JSON.stringify({ error: e.message }));
      }
    });

    /**
     * @description 이 라우트는 POST 요청을 처리하며, 주어진 경로에 있는 디렉토리의 내용을 읽어옵니다.
     * 요청된 경로에 따라 폴더의 리스트를 반환하거나, 오류 메시지를 반환합니다.
     * @route POST /readDir, /readFolder
     * @param {string} path - 요청된 디렉토리 경로.
     * @returns {object} - JSON 형식으로 폴더의 리스트를 반환하거나, 오류 메시지를 반환합니다.
     */
    router.post(["/readDir", "/readFolder"], async function (req, res) {
      /**
       * @description 응답 헤더를 설정하여 응답 형식을 JSON으로 지정하고, 
       * 모든 출처에서의 접근을 허용하며, 특정 HTTP 메서드와 헤더를 허용합니다.
       */
      res.set({
        "Content-Type": "application/json", // 응답의 Content-Type을 JSON으로 설정합니다.
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 지정합니다.
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 요청 헤더를 지정합니다.
      });

      try {
        /**
         * @description 요청된 body에 path가 없으면 오류를 발생시킵니다.
         * 디렉토리 경로가 주어지지 않은 경우, "invaild post" 오류 메시지를 반환합니다.
         */
        if (req.body.path === undefined) {
          throw new Error("invaild post");
        }

        let target;
        let list;

        /**
         * @description 요청된 경로에서 앞뒤 슬래시를 제거하여 정규화합니다.
         * 시작 슬래시와 끝 슬래시를 제거한 후, 빈 문자열인지 확인합니다.
         */
        target = req.body.path.replace(/^\//i, '').replace(/\/$/i, '');
        
        /**
         * @description 경로가 빈 문자열이면 sambaToken을 기본 경로로 설정합니다.
         * 빈 경로를 처리하기 위해 sambaToken을 기본 값으로 할당합니다.
         */
        if (target.trim() === '') {
          target = sambaToken;
        }

        /**
         * @description 경로가 '__'로 시작하지 않으면 sambaToken을 경로 앞에 추가합니다.
         * 이렇게 함으로써 상대 경로가 sambaToken을 기준으로 작동하게 합니다.
         */
        if (!/^__/.test(target)) {
          target = sambaToken + "/" + target;
        }

        /**
         * @description sambaToken을 정적 파일의 기본 경로로 대체합니다.
         * 경로에서 sambaToken을 staticConst 경로로 변환합니다.
         */
        target = target.replace(new RegExp("^" + sambaToken, "i"), staticConst);

        /**
         * @description 파일 시스템에서 대상 경로가 존재하는지 확인합니다.
         * 존재하면 디렉토리인지 확인하고, 그렇지 않으면 빈 배열을 반환합니다.
         */
        if (await fileSystem(`exist`, [target])) {
          /**
           * @description 대상 경로가 디렉토리인지 확인합니다.
           * 디렉토리라면 그 내용을 읽어와 리스트로 반환합니다.
           */
          if (await fileSystem(`isDir`, [target])) {
            list = await fileSystem(`readFolder`, [target]);
            res.send(JSON.stringify(list));
          } else {
            res.send(JSON.stringify([]));
          }
        } else {
          res.send(JSON.stringify([]));
        }

      } catch (e) {
        /**
         * @description 예외 발생 시, 오류를 로깅하고, 오류 메시지를 JSON 형식으로 응답합니다.
         */
        // 발생한 오류를 로그로 기록합니다.
        logger.error(e, req).catch((e) => { console.log(e); });

        // 오류 메시지를 JSON 형식으로 응답합니다.
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @description 이 라우트는 POST 요청을 처리하며, 여러 파일을 업로드하고, 특정 경로로 파일을 이동하거나 변환하는 작업을 수행합니다.
     * 요청된 파일들은 주어진 디렉토리에 저장되며, 필요에 따라 이미지 변환 작업을 수행합니다.
     * @route POST /middlePhotoBinary
     * @param {object} req - 클라이언트 요청 객체, 파일과 메타데이터를 포함합니다.
     * @param {object} res - 서버 응답 객체, 처리 결과를 반환합니다.
     */
    router.post(["/middlePhotoBinary"], async function (req, res) {
      /**
       * @description 응답 헤더를 설정하여 응답 형식을 JSON으로 지정하고, 
       * 모든 출처에서의 접근을 허용하며, 특정 HTTP 메서드와 헤더를 허용합니다.
       */
      res.set({
        "Content-Type": "application/json", // 응답의 Content-Type을 JSON으로 설정합니다.
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 지정합니다.
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 요청 헤더를 지정합니다.
      });

      try {
        /**
         * @description formidable 모듈을 사용하여 클라이언트로부터 업로드된 파일을 처리합니다.
         * 여러 파일을 처리할 수 있으며, 최대 파일 크기를 9GB로 설정합니다.
         */
        const form = formidable({ multiples: true, encoding: "utf-8", maxFileSize: (9000 * 1024 * 1024) });
        
        /**
         * @description 폼 데이터를 파싱하여 파일과 필드를 분리합니다.
         * 파일 처리와 관련된 주요 로직이 이 안에서 수행됩니다.
         */
        form.parse(req, async function (err, fields, files) {
          // 클라이언트로부터 받은 필드 데이터를 디스트럭처링하여 할당합니다.
          const { proid, desid, client, name, type } = fields;

          try {
            if (!err) {
              // 현재 시간을 기준으로 파일명을 생성하는 데 사용할 값을 얻습니다.
              const requestNow = new Date();
              const requestNowValue = requestNow.valueOf();
              const token = "_"; // 파일명 생성 시 사용할 구분자
              const exeConst = "jpg"; // 기본 확장자 상수
              const digitConst = 4; // 파일명에 사용할 숫자 자릿수
              let execName, file;
              let fileNameConst, positionKey, order;
              let results;
              let past;
              let pureConst;
              let digitTenConst;
              let pureFileConst;
              let pureFolderConst;
              let jpgKey, jpgDateValue, jpgOrder, jpgName;
              let newOrder;

              /**
               * @description 파일명이 16진수로 이루어져 있지 않으면 오류를 기록합니다.
               * 이 조건은 파일명이 예상된 형식인지 확인하는 데 사용됩니다.
               */
              if (name.replace(/[0-9a-f]/g, '') !== '') {
                logger.error(e, req).catch((e) => { console.log(e); });
              }

              // 업로드된 모든 파일을 순회하여 처리합니다.
              for (let key in files) {
                file = files[key];

                // 파일 키를 분리하여 파일명, 위치 키, 순서를 추출합니다.
                [fileNameConst, positionKey, order] = key.split("_");

                // 파일의 원본 확장자를 추출합니다.
                execName = file.originalFilename.split(".")[file.originalFilename.split(".").length - 1];

                /**
                 * @description 디자이너 ID를 기반으로 한 폴더가 없으면 새로 만듭니다.
                 */
                if (!(await fileSystem(`exist`, [`${folderConst}/${desid}`]))) {
                  await fileSystem(`mkdir`, [`${folderConst}/${desid}`]);
                }

                /**
                 * @description 프로젝트 ID를 기반으로 한 폴더가 없으면 새로 만듭니다.
                 */
                if (!(await fileSystem(`exist`, [`${folderConst}/${desid}/${proid}`]))) {
                  await fileSystem(`mkdir`, [`${folderConst}/${desid}/${proid}`]);
                }

                /**
                 * @description 파일을 지정된 경로로 이동시킵니다.
                 * 파일명을 포함한 전체 경로를 구성하여 `shellExec` 명령어를 사용해 파일을 이동합니다.
                 */
                await shellExec(`mv ${shellLink(file.filepath)} ${folderConst}/${desid}/${proid}/${positionKey}${token}${String(requestNowValue)}${token}${order}${token}${name}.${execName};`);

                /**
                 * @description 파일 타입이 'photo'인 경우 PDF 파일을 JPG로 변환합니다.
                 * 변환된 이미지 파일에 대해 추가적인 처리(예: 파일명 변경)를 수행합니다.
                 */
                if (type === "photo") {
                  if (/pdf$/i.test(execName)) {
                    try {
                      // PDF 파일을 JPG로 변환합니다.
                      results = await imageReader.pdfToJpg(`${folderConst}/${desid}/${proid}/${positionKey}${token}${String(requestNowValue)}${token}${order}${token}${name}.${execName}`, true);

                      // 변환된 모든 JPG 파일을 순회하여 이름을 변경합니다.
                      for (let index = 0; index < results.length; index++) {
                        past = results[index];
                        pureConst = past.slice(0, -1 * (digitConst + (exeConst.length + 1)));
                        digitTenConst = 10 ** digitConst;
                        pureFileConst = pureConst.split("/")[pureConst.split("/").length - 1];
                        pureFolderConst = pureConst.split("/").slice(0, -1).join("/");
                        [jpgKey, jpgDateValue, jpgOrder, jpgName] = pureFileConst.split(token);
                        newOrder = String(((Number(jpgOrder) + 1) * digitTenConst) + (index + 1));
                        
                        // 변환된 파일의 이름을 새로운 이름으로 변경합니다.
                        await shellExec(`mv ${shellLink(past)} ${shellLink(pureFolderConst)}/${jpgKey}${token}${jpgDateValue}${token}${newOrder}${token}${name}.${exeConst}`);
                      }
                    } catch {}
                  }
                }
              }

              // 모든 작업이 성공적으로 완료되었음을 클라이언트에 알립니다.
              res.send(JSON.stringify({ message: "success" }));

            } else {
              console.log(err);
              logger.error(e, req).catch((e) => { console.log(e); });
              res.send(JSON.stringify({ message: "error : " + err.message }));
            }
          } catch (e) {
            console.log(e);
            logger.error(e, req).catch((e) => { console.log(e); });
            res.send(JSON.stringify({ message: "error : " + e.message + " / " + desid + " / " + proid }));
          }
        });
      } catch (e) {
        console.log(e);
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @description 이 라우트는 POST 요청을 처리하여 지정된 경로의 파일 목록을 읽고 반환합니다.
     * 경로가 존재하지 않으면 경로를 생성한 후 파일 목록을 반환합니다.
     * @route POST /middlePhotoRead
     * @param {object} req - 클라이언트 요청 객체, 타겟 경로를 포함합니다.
     * @param {object} res - 서버 응답 객체, 처리 결과를 반환합니다.
     */
    router.post(["/middlePhotoRead"], async function (req, res) {
      /**
       * @description 응답 헤더를 설정하여 응답 형식을 JSON으로 지정하고, 
       * 모든 출처에서의 접근을 허용하며, 특정 HTTP 메서드와 헤더를 허용합니다.
       */
      res.set({
        "Content-Type": "application/json", // 응답의 Content-Type을 JSON으로 설정합니다.
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 지정합니다.
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 요청 헤더를 지정합니다.
      });

      try {
        /**
         * @description 요청된 body에 target이 없으면 오류를 발생시킵니다.
         * 디렉토리 경로가 주어지지 않은 경우, "invalid post" 오류 메시지를 반환합니다.
         */
        if (req.body.target === undefined) {
          throw new Error("invalid post");
        }

        // 요청된 타겟 경로를 가져옵니다.
        const { target } = req.body;
        let list;
        let finalTarget;
        let tempArr;
        let tempDir;
        let tempString;

        /**
         * @description 요청된 타겟 경로의 앞에 슬래시를 추가하여 최종 경로를 설정합니다.
         * 경로의 시작에 슬래시가 없으면 슬래시를 추가합니다.
         */
        finalTarget = "/" + (/^\//.test(target) ? target.slice(1) : target);

        /**
         * @description 최종 경로를 슬래시로 구분된 배열로 변환합니다.
         * 각 디렉토리의 경로를 추적하기 위해 사용됩니다.
         */
        tempArr = finalTarget.split("/");
        tempString = folderConst;

        /**
         * @description 최종 경로의 각 디렉토리를 확인하고, 디렉토리가 없으면 생성합니다.
         * 각 경로를 순차적으로 검사하여 존재하지 않는 경우 디렉토리를 생성합니다.
         */
        for (let i = 0; i < tempArr.length; i++) {
          tempDir = await fileSystem(`readDir`, [tempString]);
          if (!tempDir.includes(tempArr[i]) && tempArr[i] !== "") {
            await shellExec(`mkdir ${shellLink(tempString + "/" + tempArr[i])}`);
          }
          tempString += '/';
          tempString += tempArr[i];
        }

        /**
         * @description 최종 경로의 파일 목록을 읽고, 특정 파일을 필터링한 후 반환합니다.
         * 디렉토리에서 파일 목록을 가져오고, 숨김 파일이나 시스템 파일을 제외한 목록을 반환합니다.
         */
        list = (await fileSystem(`readFolder`, [folderConst + finalTarget])).filter((str) => {
          return (!/^\._/.test(str) && !/DS_Store/gi.test(str));
        });

        // 파일 목록을 JSON 형식으로 응답합니다.
        res.send(JSON.stringify(list));
      } catch (e) {
        /**
         * @description 예외 발생 시, 오류를 로깅하고, 오류 메시지를 JSON 형식으로 응답합니다.
         */
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @description 이 라우트는 POST 요청을 처리하여 여러 파일을 업로드하고, 디자이너의 대표 파일 폴더로 이동시킵니다.
     * 요청된 파일들은 주어진 디렉토리에 저장되며, 필요에 따라 파일명을 조정합니다.
     * @route POST /representativeFileBinary
     * @param {object} req - 클라이언트 요청 객체, 파일과 메타데이터를 포함합니다.
     * @param {object} res - 서버 응답 객체, 처리 결과를 반환합니다.
     */
    router.post([ "/representativeFileBinary" ], async function (req, res) {
      /**
       * @description 응답 헤더를 설정하여 응답 형식을 JSON으로 지정하고, 
       * 모든 출처에서의 접근을 허용하며, 특정 HTTP 메서드와 헤더를 허용합니다.
       */
      res.set({
          "Content-Type": "application/json", // 응답의 Content-Type을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 지정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 요청 헤더를 지정합니다.
      });

      try {
          /**
           * @description formidable 모듈을 사용하여 클라이언트로부터 업로드된 파일을 처리합니다.
           * 여러 파일을 처리할 수 있으며, 최대 파일 크기를 9GB로 설정합니다.
           */
          const form = formidable({ multiples: true, encoding: "utf-8", maxFileSize: (9000 * 1024 * 1024) });

          /**
           * @description 폼 데이터를 파싱하여 파일과 필드를 분리합니다.
           * 파일 처리와 관련된 주요 로직이 이 안에서 수행됩니다.
           */
          form.parse(req, async function (err, fields, files) {
              // 클라이언트로부터 받은 필드 데이터를 디스트럭처링하여 할당합니다.
              const { desid, name, type } = fields;

              try {
                  if (!err) {
                      // 현재 시간을 기준으로 파일명을 생성하는 데 사용할 값을 얻습니다.
                      const requestNow = new Date();
                      const requestNowValue = requestNow.valueOf();
                      const token = "_"; // 파일명 생성 시 사용할 구분자
                      let execName, file;
                      let fileNameConst, positionKey, order;

                      /**
                       * @description 파일명이 16진수로 이루어져 있지 않으면 오류를 기록합니다.
                       * 이 조건은 파일명이 예상된 형식인지 확인하는 데 사용됩니다.
                       */
                      if (name.replace(/[0-9a-f]/g, '') !== '') {
                          logger.error(e, req).catch((e) => { console.log(e); });
                      }

                      // 업로드된 모든 파일을 순회하여 처리합니다.
                      for (let key in files) {
                          file = files[key];

                          // 파일 키를 분리하여 파일명, 위치 키, 순서를 추출합니다.
                          [ fileNameConst, positionKey, order ] = key.split("_");

                          // 파일의 원본 확장자를 추출합니다.
                          execName = file.originalFilename.split(".")[file.originalFilename.split(".").length - 1];

                          /**
                           * @description 디자이너 ID를 기반으로 한 폴더가 없으면 새로 만듭니다.
                           * 해당 디자이너의 대표 파일을 저장할 폴더가 없으면 생성합니다.
                           */
                          if (!(await fileSystem(`exist`, [ `${designerRepresentativeFolderConst}/${desid}` ]))) {
                              await fileSystem(`mkdir`, [ `${designerRepresentativeFolderConst}/${desid}` ]);
                          }

                          /**
                           * @description 파일을 지정된 경로로 이동시킵니다.
                           * 파일명을 포함한 전체 경로를 구성하여 `shellExec` 명령어를 사용해 파일을 이동합니다.
                           */
                          await shellExec(`mv ${shellLink(file.filepath)} ${designerRepresentativeFolderConst}/${desid}/${positionKey}${token}${String(requestNowValue)}${token}${order}${token}${name}.${execName};`);
                      }

                      // 모든 작업이 성공적으로 완료되었음을 클라이언트에 알립니다.
                      res.send(JSON.stringify({ message: "success" }));

                  } else {
                      console.log(err);
                      logger.error(e, req).catch((e) => { console.log(e); });
                      res.send(JSON.stringify({ message: "error : " + err.message }));
                  }
              } catch (e) {
                  console.log(e);
                  logger.error(e, req).catch((e) => { console.log(e); });
                  res.send(JSON.stringify({ message: "error : " + e.message + " / " + desid }));
              }
          });
      } catch (e) {
          console.log(e);
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @description 이 라우트는 POST 요청을 처리하여 디자이너의 대표 파일 폴더에서 파일 목록을 읽어 반환합니다.
     * 요청된 경로가 존재하지 않으면 폴더를 생성한 후 파일 목록을 반환하며, 전체 목록을 요청할 수도 있습니다.
     * @route POST /representativeFileRead
     * @param {object} req - 클라이언트 요청 객체, 타겟 경로를 포함합니다.
     * @param {object} res - 서버 응답 객체, 처리 결과를 반환합니다.
     */
    router.post([ "/representativeFileRead" ], async function (req, res) {
      /**
       * @description 응답 헤더를 설정하여 응답 형식을 JSON으로 지정하고, 
       * 모든 출처에서의 접근을 허용하며, 특정 HTTP 메서드와 헤더를 허용합니다.
       */
      res.set({
          "Content-Type": "application/json", // 응답의 Content-Type을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 지정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 요청 헤더를 지정합니다.
      });

      try {
          /**
           * @description 요청된 body에 target이 없으면 오류를 발생시킵니다.
           * 디렉토리 경로가 주어지지 않은 경우, "invalid post" 오류 메시지를 반환합니다.
           */
          if (req.body.target === undefined) {
              throw new Error("invalid post");
          }

          const { target } = req.body;
          let list;
          let finalTarget;
          let tempArr;
          let tempDir;
          let tempString;
          let tempList;
          let resultList;

          /**
           * @description 전체 디자이너 폴더를 대상으로 파일 목록을 읽어오는 경우를 처리합니다.
           * target이 "$all"인 경우, 모든 디자이너 폴더를 순회하여 각 디자이너의 파일 존재 여부를 확인합니다.
           */
          if (target === "$all") {

              // 디자이너 대표 폴더의 모든 디렉토리를 읽어옵니다.
              list = (await fileSystem(`readDir`, [ designerRepresentativeFolderConst ])).filter((str) => { return (!/^\._/.test(str) && !/DS_Store/gi.test(str)) });
              resultList = [];

              // 각 디자이너 폴더를 순회하며 파일이 있는지 여부를 확인합니다.
              for (let desid of list) {
                  tempList = (await fileSystem(`readDir`, [ designerRepresentativeFolderConst + "/" + desid ])).filter((str) => { return (!/^\._/.test(str) && !/DS_Store/gi.test(str)) });
                  resultList.push({
                      desid,
                      folder: designerRepresentativeFolderConst,
                      boo: (tempList.length > 0), // 파일이 있으면 true, 없으면 false
                  });
              }

              // 결과 리스트를 JSON 형식으로 응답합니다.
              res.send(JSON.stringify(resultList));

          } else {

              /**
               * @description 요청된 타겟 경로의 앞에 슬래시를 추가하여 최종 경로를 설정합니다.
               * 경로의 시작에 슬래시가 없으면 슬래시를 추가합니다.
               */
              finalTarget = "/" + (/^\//.test(target) ? target.slice(1) : target);

              /**
               * @description 최종 경로를 슬래시로 구분된 배열로 변환합니다.
               * 각 디렉토리의 경로를 추적하기 위해 사용됩니다.
               */
              tempArr = finalTarget.split("/");
              tempString = designerRepresentativeFolderConst;

              /**
               * @description 최종 경로의 각 디렉토리를 확인하고, 디렉토리가 없으면 생성합니다.
               * 각 경로를 순차적으로 검사하여 존재하지 않는 경우 디렉토리를 생성합니다.
               */
              for (let i = 0; i < tempArr.length; i++) {
                  tempDir = await fileSystem(`readDir`, [ tempString ]);
                  if (!tempDir.includes(tempArr[i]) && tempArr[i] !== "") {
                      await shellExec(`mkdir ${shellLink(tempString + "/" + tempArr[i])}`);
                  }
                  tempString += '/';
                  tempString += tempArr[i];
              }

              /**
               * @description 최종 경로의 파일 목록을 읽고, 특정 파일을 필터링한 후 반환합니다.
               * 디렉토리에서 파일 목록을 가져오고, 숨김 파일이나 시스템 파일을 제외한 목록을 반환합니다.
               */
              list = (await fileSystem(`readDir`, [ designerRepresentativeFolderConst + finalTarget ])).filter((str) => { return (!/^\._/.test(str) && !/DS_Store/gi.test(str)) });

              // 파일 목록을 JSON 형식으로 응답합니다.
              res.send(JSON.stringify(list));

          }
      } catch (e) {
          /**
           * @description 예외 발생 시, 오류를 로깅하고, 오류 메시지를 JSON 형식으로 응답합니다.
           */
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @description 이 라우트는 POST 요청을 처리하여 클라이언트의 사진 목록을 읽어 반환합니다.
     * 요청된 클라이언트 ID에 따라 선호 사진(preferredPhoto)과 사이트 사진(sitePhoto)을 반환하며,
     * 파일 모드에 따라 반환되는 URL 형식을 조정할 수 있습니다.
     * @route POST /clientPhoto
     * @param {object} req - 클라이언트 요청 객체, 클라이언트 ID(cliid)를 포함합니다.
     * @param {object} res - 서버 응답 객체, 처리 결과를 반환합니다.
     */
    router.post([ "/clientPhoto" ], async function (req, res) {
      /**
       * @description 응답 헤더를 설정하여 응답 형식을 JSON으로 지정하고, 
       * 모든 출처에서의 접근을 허용하며, 특정 HTTP 메서드와 헤더를 허용합니다.
       */
      res.set({
          "Content-Type": "application/json", // 응답의 Content-Type을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 지정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 요청 헤더를 지정합니다.
      });

      try {
          /**
           * @description 요청된 body에 cliid가 없으면 오류를 발생시킵니다.
           * 클라이언트 ID가 주어지지 않은 경우, "invalid post" 오류 메시지를 반환합니다.
           */
          if (req.body.cliid === undefined) {
              throw new Error("invalid post");
          }

          const preferredPhotoName = "preferredPhoto"; // 선호 사진 폴더 이름
          const sitePhotoName = "sitePhoto"; // 사이트 사진 폴더 이름
          const { cliid } = req.body; // 요청된 클라이언트 ID를 가져옵니다.
          let totalList, client;
          let preferredPhoto, sitePhoto;
          let preferredPhotoList, sitePhotoList;
          let root;
          let mode;

          /**
           * @description 파일 모드 설정을 확인하여 모드를 결정합니다.
           * 기본 모드는 "siteMode"이며, 파일 모드가 명시된 경우 "fileMode"로 설정됩니다.
           */
          mode = "siteMode";
          if (req.body.fileMode !== undefined) {
              mode = "fileMode";
          }

          root = clientConst; // 클라이언트 사진 폴더의 루트 경로를 설정합니다.
          
          /**
           * @description 루트 경로에서 모든 디렉토리를 읽어와 클라이언트 ID와 일치하는 폴더를 필터링합니다.
           */
          totalList = await fileSystem(`readDir`, [ root ]);
          totalList = totalList.filter((i) => { return i !== ".DS_Store" }).filter((i) => { return (new RegExp(cliid, "gi")).test(i); });

          preferredPhoto = [];
          sitePhoto = [];

          /**
           * @description 필터링된 각 클라이언트 폴더를 순회하며, 선호 사진 및 사이트 사진을 읽어옵니다.
           * 각 사진의 경로를 수집하여 리스트로 구성합니다.
           */
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

          /**
           * @description 파일 모드가 아닌 경우, 파일 경로를 URL 형식으로 변환합니다.
           * 각 파일 경로를 인코딩하여 웹에서 접근할 수 있는 URL로 변환합니다.
           */
          if (mode !== "fileMode") {
              preferredPhoto = preferredPhoto.map((i) => { return `https://${instance.address.secondinfo.host}/${global.encodeURI(i.replace(new RegExp(clientConst.split('/').slice(0, -2).join('/'), "gi"), '')).replace(/^\//, '')}`; });
              sitePhoto = sitePhoto.map((i) => { return `https://${instance.address.secondinfo.host}/${global.encodeURI(i.replace(new RegExp(clientConst.split('/').slice(0, -2).join('/'), "gi"), '')).replace(/^\//, '')}`; });
          }

          // 선호 사진과 사이트 사진 목록을 JSON 형식으로 응답합니다.
          res.send(JSON.stringify({ sitePhoto, preferredPhoto }));

      } catch (e) {
          /**
           * @description 예외 발생 시, 오류를 로깅하고, 오류 메시지를 JSON 형식으로 응답합니다.
           */
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @description 이 라우트는 POST 요청을 처리하여 클라이언트의 파일을 업로드하고, 해당 파일을 지정된 폴더로 이동시킵니다.
     * PDF 파일의 경우, 이미지로 변환하는 작업도 수행합니다. 작업이 완료되면 지정된 채널로 Slack 메시지를 보냅니다.
     * @route POST /clientBinary, /binary
     * @param {object} req - 클라이언트 요청 객체, 파일과 메타데이터를 포함합니다.
     * @param {object} res - 서버 응답 객체, 처리 결과를 반환합니다.
     */
    router.post([ "/clientBinary", "/binary" ], async function (req, res) {
      /**
       * @description 응답 헤더를 설정하여 응답 형식을 JSON으로 지정하고, 
       * 모든 출처에서의 접근을 허용하며, 특정 HTTP 메서드와 헤더를 허용합니다.
       */
      res.set({
          "Content-Type": "application/json", // 응답의 Content-Type을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 지정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 요청 헤더를 지정합니다.
      });

      try {
          /**
           * @description formidable 모듈을 사용하여 클라이언트로부터 업로드된 파일을 처리합니다.
           * 여러 파일을 처리할 수 있으며, 최대 파일 크기를 9GB로 설정합니다.
           */
          const form = formidable({ multiples: true, encoding: "utf-8", maxFileSize: (9000 * 1024 * 1024) });

          /**
           * @description 폼 데이터를 파싱하여 파일과 필드를 분리합니다.
           * 파일 처리와 관련된 주요 로직이 이 안에서 수행됩니다.
           */
          form.parse(req, async function (err, fields, files) {
              try {
                  // 업로드된 파일의 키를 가져옵니다.
                  let filesKeys = Object.keys(files);

                  // 에러가 없고 파일이 하나 이상 업로드된 경우에만 처리합니다.
                  if (!err && filesKeys.length > 0) {
                      const { name, cliid } = fields; // 필드에서 이름과 클라이언트 ID를 추출합니다.
                      const clientFolderName = ("date" + todayMaker("total")) + '_' + name + '_' + cliid; // 파일이 저장될 폴더 이름을 생성합니다.
                      const uploadMap = {
                          upload0: "sitePhoto",
                          upload1: "preferredPhoto"
                      }; // 업로드된 파일 키를 폴더 이름으로 매핑합니다.
                      let list, clientFolder;

                      clientFolder = `${clientConst}/${clientFolderName}`; // 클라이언트 파일이 저장될 폴더 경로를 설정합니다.

                      list = [];
                      for (let i = 0; i < filesKeys.length; i++) {
                          list.push(uploadMap[filesKeys[i]]); // 업로드된 각 파일에 대해 대상 폴더 이름을 리스트에 추가합니다.
                      }

                      /**
                       * @description 클라이언트 폴더가 존재하지 않으면 생성하고, 각 파일의 대상 폴더도 생성합니다.
                       */
                      if (!(await fileSystem(`exist`, [ clientFolder ]))) {
                          await shellExec(`mkdir`, [ clientFolder ]); // 클라이언트 폴더 생성
                          for (let i = 0; i < list.length; i++) {
                              await shellExec(`mkdir`, [ `${clientFolder}/${list[i]}` ]); // 대상 폴더 생성
                          }
                      }

                      /**
                       * @description 업로드된 각 파일을 지정된 폴더로 이동시키고, PDF 파일이면 JPG로 변환합니다.
                       */
                      for (let i = 0; i < list.length; i++) {
                          if (Array.isArray(files[filesKeys[i]])) {
                              for (let j of files[filesKeys[i]]) {
                                  await shellExec(`mv ${shellLink(j.filepath)} ${shellLink(clientFolder + '/' + list[i] + '/' + j.originalFilename)};`); // 파일 이동
                                  if (/\.pdf$/.test(j.originalFilename)) { // PDF 파일인지 확인
                                      try {
                                          await imageReader.pdfToJpg(clientFolder + '/' + list[i] + '/' + j.originalFilename, true); // PDF를 JPG로 변환
                                      } catch {}
                                  }
                              }
                          } else {
                              await shellExec(`mv ${shellLink(files[filesKeys[i]].filepath)} ${shellLink(clientFolder + '/' + list[i] + '/' + files[filesKeys[i]].originalFilename)};`); // 단일 파일 이동
                              if (/\.pdf$/.test(files[filesKeys[i]].originalFilename)) { // PDF 파일인지 확인
                                  try {
                                      await imageReader.pdfToJpg(clientFolder + '/' + list[i] + '/' + files[filesKeys[i]].originalFilename, true); // PDF를 JPG로 변환
                                  } catch {}
                              }
                          }
                      }

                      // 파일 전송 완료 메시지를 Slack 채널로 보냅니다.
                      await messageSend({ text: name + "님의 파일 전송을 완료하였습니다!", channel: "#404_curation" });

                      // 성공 메시지를 클라이언트에 응답으로 보냅니다.
                      res.send(JSON.stringify({ message: "done" }));

                  } else {
                      console.log(err);
                      logger.error(e, req).catch((e) => { console.log(e); });
                      res.send(JSON.stringify({ message: "error" }));
                  }
              } catch (e) {
                  console.log(e);
                  logger.error(e, req).catch((e) => { console.log(e); });
                  res.send(JSON.stringify({ message: "error : " + e.message }));
              }
          });

      } catch (e) {
          console.log(e);
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @description 이 라우트는 POST 요청을 처리하여 디자이너 신청자(aspirant)의 파일을 업로드하고, 해당 파일을 지정된 폴더로 이동시킵니다.
     * PDF 파일의 경우, 이미지로 변환하는 작업도 수행합니다. 작업이 완료되면 지정된 채널로 Slack 메시지를 보냅니다.
     * @route POST /aspirantBinary
     * @param {object} req - 클라이언트 요청 객체, 파일과 메타데이터를 포함합니다.
     * @param {object} res - 서버 응답 객체, 처리 결과를 반환합니다.
     */
    router.post([ "/aspirantBinary" ], async function (req, res) {
      /**
       * @description 응답 헤더를 설정하여 응답 형식을 JSON으로 지정하고, 
       * 모든 출처에서의 접근을 허용하며, 특정 HTTP 메서드와 헤더를 허용합니다.
       */
      res.set({
          "Content-Type": "application/json", // 응답의 Content-Type을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 지정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 요청 헤더를 지정합니다.
      });

      try {
          /**
           * @description formidable 모듈을 사용하여 클라이언트로부터 업로드된 파일을 처리합니다.
           * 여러 파일을 처리할 수 있으며, 최대 파일 크기를 9GB로 설정합니다.
           */
          const form = formidable({ multiples: true, encoding: "utf-8", maxFileSize: (9000 * 1024 * 1024) });

          /**
           * @description 폼 데이터를 파싱하여 파일과 필드를 분리합니다.
           * 파일 처리와 관련된 주요 로직이 이 안에서 수행됩니다.
           */
          form.parse(req, async function (err, fields, files) {
              try {
                  // 업로드된 파일의 키를 가져옵니다.
                  let filesKeys = Object.keys(files);

                  // 에러가 없고 파일이 하나 이상 업로드된 경우에만 처리합니다.
                  if (!err && filesKeys.length > 0) {
                      const { name, aspid } = fields; // 필드에서 이름과 신청자 ID를 추출합니다.
                      const aspirantFolderName = ("date" + todayMaker("total")) + '_' + name + '_' + aspid; // 파일이 저장될 폴더 이름을 생성합니다.
                      const uploadMap = {
                          upload0: "portfolio",
                      }; // 업로드된 파일 키를 폴더 이름으로 매핑합니다.
                      let list, aspirantFolder;

                      aspirantFolder = `${aspirantConst}/${aspirantFolderName}`; // 신청자 파일이 저장될 폴더 경로를 설정합니다.

                      list = [];
                      for (let i = 0; i < filesKeys.length; i++) {
                          list.push(uploadMap[filesKeys[i]]); // 업로드된 각 파일에 대해 대상 폴더 이름을 리스트에 추가합니다.
                      }

                      /**
                       * @description 신청자 폴더가 존재하지 않으면 생성하고, 각 파일의 대상 폴더도 생성합니다.
                       */
                      if (!(await fileSystem(`exist`, [ aspirantFolder ]))) {
                          await shellExec(`mkdir`, [ aspirantFolder ]); // 신청자 폴더 생성
                      }
                      for (let i = 0; i < list.length; i++) {
                          if (!(await fileSystem(`exist`, [ `${aspirantFolder}/${list[i]}` ]))) {
                              await shellExec(`mkdir`, [ `${aspirantFolder}/${list[i]}` ]); // 대상 폴더 생성
                          }
                      }

                      /**
                       * @description 업로드된 각 파일을 지정된 폴더로 이동시키고, PDF 파일이면 JPG로 변환합니다.
                       */
                      for (let i = 0; i < list.length; i++) {
                          if (Array.isArray(files[filesKeys[i]])) {
                              for (let j of files[filesKeys[i]]) {
                                  await shellExec(`mv ${shellLink(j.filepath)} ${shellLink(aspirantFolder + '/' + list[i] + '/' + j.originalFilename)};`); // 파일 이동
                                  if (/\.pdf$/.test(j.originalFilename)) { // PDF 파일인지 확인
                                      try {
                                          await imageReader.pdfToJpg(aspirantFolder + '/' + list[i] + '/' + j.originalFilename, true); // PDF를 JPG로 변환
                                      } catch {}
                                  }
                              }
                          } else {
                              await shellExec(`mv ${shellLink(files[filesKeys[i]].filepath)} ${shellLink(aspirantFolder + '/' + list[i] + '/' + files[filesKeys[i]].originalFilename)};`); // 단일 파일 이동
                              if (/\.pdf$/.test(files[filesKeys[i]].originalFilename)) { // PDF 파일인지 확인
                                  try {
                                      await imageReader.pdfToJpg(aspirantFolder + '/' + list[i] + '/' + files[filesKeys[i]].originalFilename, true); // PDF를 JPG로 변환
                                  } catch {}
                              }
                          }
                      }

                      // 파일 전송 완료 메시지를 Slack 채널로 보냅니다.
                      await messageSend({ text: name + "님의 파일 전송을 완료하였습니다!", channel: "#301_apply" });

                      // 성공 메시지를 클라이언트에 응답으로 보냅니다.
                      res.send(JSON.stringify({ message: "done" }));

                  } else {
                      logger.error(e, req).catch((e) => { console.log(e); });
                      console.log(err);
                      res.send(JSON.stringify({ message: "error" }));
                  }
              } catch (e) {
                  console.log(e);
                  logger.error(e, req).catch((e) => { console.log(e); });
                  res.send(JSON.stringify({ message: "error : " + e.message }));
              }
          });

      } catch (e) {
          console.log(e);
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @description 이 라우트는 POST 요청을 처리하여 디자이너 신청자(aspirant)의 세팅 파일과 제안서를 업로드하고, 해당 파일을 지정된 폴더로 이동시킵니다.
     * PDF 파일의 경우, 이미지로 변환하는 작업도 수행합니다. 작업이 완료되면 지정된 채널로 Slack 메시지를 보낸 후, 신청 정보를 서버에 제출합니다.
     * @route POST /aspirantSettingBinary
     * @param {object} req - 클라이언트 요청 객체, 파일과 메타데이터를 포함합니다.
     * @param {object} res - 서버 응답 객체, 처리 결과를 반환합니다.
     */
    router.post([ "/aspirantSettingBinary" ], async function (req, res) {
      /**
       * @description 응답 헤더를 설정하여 응답 형식을 JSON으로 지정하고, 
       * 모든 출처에서의 접근을 허용하며, 특정 HTTP 메서드와 헤더를 허용합니다.
       */
      res.set({
          "Content-Type": "application/json", // 응답의 Content-Type을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 지정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 요청 헤더를 지정합니다.
      });

      try {
          /**
           * @description formidable 모듈을 사용하여 클라이언트로부터 업로드된 파일을 처리합니다.
           * 여러 파일을 처리할 수 있으며, 최대 파일 크기를 9GB로 설정합니다.
           */
          const form = formidable({ multiples: true, encoding: "utf-8", maxFileSize: (9000 * 1024 * 1024) });

          /**
           * @description 폼 데이터를 파싱하여 파일과 필드를 분리합니다.
           * 파일 처리와 관련된 주요 로직이 이 안에서 수행됩니다.
           */
          form.parse(req, async function (err, fields, files) {
              try {
                  // 업로드된 파일의 키를 가져옵니다.
                  let filesKeys = Object.keys(files);

                  // 에러가 없고 파일이 하나 이상 업로드된 경우에만 처리합니다.
                  if (!err && filesKeys.length > 0) {
                      const { mode, name, aspid, phone, description } = fields; // 필드에서 모드, 이름, 신청자 ID, 전화번호, 설명을 추출합니다.
                      const aspirantFolderName = ("date" + todayMaker("total")) + '_' + name + '_' + aspid; // 파일이 저장될 폴더 이름을 생성합니다.
                      const uploadMap = {
                          upload0: "setting",
                          upload1: "proposal",
                      }; // 업로드된 파일 키를 폴더 이름으로 매핑합니다.
                      let list, aspirantFolder;

                      aspirantFolder = `${aspirantConst}/${aspirantFolderName}`; // 신청자 파일이 저장될 폴더 경로를 설정합니다.

                      list = [];
                      for (let i = 0; i < filesKeys.length; i++) {
                          list.push(uploadMap[filesKeys[i]]); // 업로드된 각 파일에 대해 대상 폴더 이름을 리스트에 추가합니다.
                      }

                      /**
                       * @description 신청자 폴더가 존재하지 않으면 생성하고, 각 파일의 대상 폴더도 생성합니다.
                       * 생성된 폴더에 설명 텍스트 파일을 저장합니다.
                       */
                      if (!(await fileSystem(`exist`, [ aspirantFolder ]))) {
                          await shellExec(`mkdir`, [ aspirantFolder ]); // 신청자 폴더 생성
                      }
                      for (let i = 0; i < list.length; i++) {
                          if (!(await fileSystem(`exist`, [ `${aspirantFolder}/${list[i]}` ]))) {
                              await shellExec(`mkdir`, [ `${aspirantFolder}/${list[i]}` ]); // 대상 폴더 생성
                          }
                          // 설명 파일을 폴더에 작성합니다.
                          await fileSystem(`write`, [ `${aspirantFolder}/${list[i]}/description_${String(uniqueValue("hex"))}.txt`, description ]);
                      }

                      /**
                       * @description 업로드된 각 파일을 지정된 폴더로 이동시키고, PDF 파일이면 JPG로 변환합니다.
                       */
                      for (let i = 0; i < list.length; i++) {
                          if (Array.isArray(files[filesKeys[i]])) {
                              for (let j of files[filesKeys[i]]) {
                                  await shellExec(`mv ${shellLink(j.filepath)} ${shellLink(aspirantFolder + '/' + list[i] + '/' + j.originalFilename)};`); // 파일 이동
                                  if (/\.pdf$/.test(j.originalFilename)) { // PDF 파일인지 확인
                                      try {
                                          await imageReader.pdfToJpg(aspirantFolder + '/' + list[i] + '/' + j.originalFilename, true); // PDF를 JPG로 변환
                                      } catch {}
                                  }
                              }
                          } else {
                              await shellExec(`mv ${shellLink(files[filesKeys[i]].filepath)} ${shellLink(aspirantFolder + '/' + list[i] + '/' + files[filesKeys[i]].originalFilename)};`); // 단일 파일 이동
                              if (/\.pdf$/.test(files[filesKeys[i]].originalFilename)) { // PDF 파일인지 확인
                                  try {
                                      await imageReader.pdfToJpg(aspirantFolder + '/' + list[i] + '/' + files[filesKeys[i]].originalFilename, true); // PDF를 JPG로 변환
                                  } catch {}
                              }
                          }
                      }

                      // 신청자 정보를 서버에 제출합니다.
                      await requestSystem("https://" + address.officeinfo.host + ":3002/aspirantSubmit", { mode: "setting", map: { aspid, name, phone, type: mode } }, { headers: { "Content-Type": "application/json" } });

                      // 파일 전송 완료 메시지를 Slack 채널로 보냅니다.
                      await messageSend({ text: name + "님의 " + (mode === "general" ? "1세트 포트폴리오" : "추천서용 사진") + " 파일 전송을 완료하였습니다!", channel: "#301_apply" });

                      // 성공 메시지를 클라이언트에 응답으로 보냅니다.
                      res.send(JSON.stringify({ message: "done" }));

                  } else {
                      logger.error(e, req).catch((e) => { console.log(e); });
                      console.log(err);
                      res.send(JSON.stringify({ message: "error" }));
                  }
              } catch (e) {
                  console.log(e);
                  logger.error(e, req).catch((e) => { console.log(e); });
                  res.send(JSON.stringify({ message: "error : " + e.message }));
              }
          });

      } catch (e) {
          console.log(e);
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @description 이 라우트는 POST 요청을 처리하여 특정 디자이너 신청자(aspirant)의 설정 파일과 제안서 파일 목록을 반환합니다.
     * 요청된 신청자 ID를 기반으로 관련된 모든 폴더를 검색하고, 해당 폴더 내의 설정 및 제안서 파일의 URL을 생성하여 반환합니다.
     * @route POST /aspirantSettingList
     * @param {object} req - 클라이언트 요청 객체, 신청자 ID(aspid)를 포함합니다.
     * @param {object} res - 서버 응답 객체, 처리 결과를 반환합니다.
     */
    router.post([ "/aspirantSettingList" ], async function (req, res) {
      /**
       * @description 응답 헤더를 설정하여 응답 형식을 JSON으로 지정하고, 
       * 모든 출처에서의 접근을 허용하며, 특정 HTTP 메서드와 헤더를 허용합니다.
       */
      res.set({
          "Content-Type": "application/json", // 응답의 Content-Type을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 지정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 요청 헤더를 지정합니다.
      });

      try {
          /**
           * @description 요청된 body에 aspid(신청자 ID)가 없으면 오류를 발생시킵니다.
           * 신청자 ID가 주어지지 않은 경우, "invalid post" 오류 메시지를 반환합니다.
           */
          if (req.body.aspid === undefined) {
              throw new Error("invalid post");
          }

          const { aspid } = equalJson(req.body); // 요청된 데이터에서 신청자 ID를 추출합니다.
          const folderList = await fileSystem(`readDir`, [ aspirantConst ]); // 신청자 폴더의 목록을 읽어옵니다.
          const target0Folders = folderList.filter((str) => { return (new RegExp(aspid, "g").test(str)) }); // 신청자 ID와 일치하는 폴더를 필터링합니다.
          const targetFolders = target0Folders.map((str) => { return `${aspirantConst}/${str}` }); // 필터링된 폴더의 경로를 생성합니다.
          
          let tempArr, tempArr2;
          let settingList = []; // 설정 파일 목록을 저장할 배열
          let proposalList = []; // 제안서 파일 목록을 저장할 배열

          /**
           * @description 각 신청자 폴더를 순회하며 설정 및 제안서 파일을 검색하고, 해당 파일의 URL을 생성합니다.
           */
          for (let folder of targetFolders) {
              tempArr = (await fileSystem(`readDir`, [ folder ])).filter((str) => { return str !== ".DS_Store" }); // 폴더의 내용을 읽고, 불필요한 항목을 필터링합니다.
      
              let tempSettingList = []; // 임시 설정 파일 목록
              let tempProposalList = []; // 임시 제안서 파일 목록
      
              if (tempArr.includes("setting")) { // 'setting' 폴더가 있는지 확인합니다.
                  tempArr2 = (await fileSystem(`readDir`, [ folder + "/setting" ])).filter((str) => { return str !== ".DS_Store" }); // 'setting' 폴더의 내용을 읽습니다.
                  tempSettingList = tempArr2.map((str) => { return `${folder}/setting/${str}`; }) // 파일 경로를 생성합니다.
                      .map((path) => {
                          const targetPath = path.replace(new RegExp("^" + staticConst, "g"), ""); // 경로에서 staticConst를 제거합니다.
                          return targetPath;
                      })
                      .map((path) => {
                          return linkToString("https://" + address.secondinfo.host + path); // 최종 URL을 생성합니다.
                      });
              }
              
              if (tempArr.includes("proposal")) { // 'proposal' 폴더가 있는지 확인합니다.
                  tempArr2 = (await fileSystem(`readDir`, [ folder + "/proposal" ])).filter((str) => { return str !== ".DS_Store" }); // 'proposal' 폴더의 내용을 읽습니다.
                  tempProposalList = tempArr2.map((str) => { return `${folder}/proposal/${str}`; }) // 파일 경로를 생성합니다.
                      .map((path) => {
                          const targetPath = path.replace(new RegExp("^" + staticConst, "g"), ""); // 경로에서 staticConst를 제거합니다.
                          return targetPath;
                      })
                      .map((path) => {
                          return linkToString("https://" + address.secondinfo.host + path); // 최종 URL을 생성합니다.
                      });
              }
      
              settingList = settingList.concat(tempSettingList); // 생성된 설정 파일 URL을 설정 리스트에 추가합니다.
              proposalList = proposalList.concat(tempProposalList); // 생성된 제안서 파일 URL을 제안서 리스트에 추가합니다.
          }
      
          // 생성된 설정 및 제안서 파일 목록을 JSON 형식으로 응답합니다.
          res.send(JSON.stringify({
              setting: settingList,
              proposal: proposalList,
          }));
      
      } catch (e) {
          /**
           * @description 예외 발생 시, 오류를 로깅하고, 오류 메시지를 JSON 형식으로 응답합니다.
           */
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @description 이 라우트는 POST 요청을 처리하여 디자이너 신청자(aspirant)의 문서 및 추가 포트폴리오를 업로드하고, 해당 파일을 지정된 폴더로 이동시킵니다.
     * PDF 파일의 경우, 이미지로 변환하는 작업도 수행합니다. 작업이 완료되면 지정된 채널로 Slack 메시지를 보냅니다.
     * @route POST /aspirantDocuments
     * @param {object} req - 클라이언트 요청 객체, 파일과 메타데이터를 포함합니다.
     * @param {object} res - 서버 응답 객체, 처리 결과를 반환합니다.
     */
    router.post([ "/aspirantDocuments" ], async function (req, res) {
      /**
       * @description 응답 헤더를 설정하여 응답 형식을 JSON으로 지정하고, 
       * 모든 출처에서의 접근을 허용하며, 특정 HTTP 메서드와 헤더를 허용합니다.
       */
      res.set({
          "Content-Type": "application/json", // 응답의 Content-Type을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 지정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 요청 헤더를 지정합니다.
      });

      try {
          /**
           * @description formidable 모듈을 사용하여 클라이언트로부터 업로드된 파일을 처리합니다.
           * 여러 파일을 처리할 수 있으며, 최대 파일 크기를 9GB로 설정합니다.
           */
          const form = formidable({ multiples: true, encoding: "utf-8", maxFileSize: (9000 * 1024 * 1024) });

          /**
           * @description 폼 데이터를 파싱하여 파일과 필드를 분리합니다.
           * 파일 처리와 관련된 주요 로직이 이 안에서 수행됩니다.
           */
          form.parse(req, async function (err, fields, files) {
              try {
                  // 업로드된 파일의 키를 가져옵니다.
                  let filesKeys = Object.keys(files);

                  // 에러가 없고 파일이 하나 이상 업로드된 경우에만 처리합니다.
                  if (!err && filesKeys.length > 0) {
                      const { name, aspid } = fields; // 필드에서 이름과 신청자 ID를 추출합니다.
                      const aspirantFolderName = ("date" + todayMaker("total")) + '_' + name + '_' + aspid; // 파일이 저장될 폴더 이름을 생성합니다.
                      const uploadMap = {
                          upload0: "portfolio",
                          account: "account",
                          business: "business",
                          identity: "identity",
                      }; // 업로드된 파일 키를 폴더 이름으로 매핑합니다.
                      let list, aspirantFolder;

                      aspirantFolder = `${aspirantConst}/${aspirantFolderName}`; // 신청자 파일이 저장될 폴더 경로를 설정합니다.

                      list = [];
                      for (let i = 0; i < filesKeys.length; i++) {
                          list.push(uploadMap[filesKeys[i]]); // 업로드된 각 파일에 대해 대상 폴더 이름을 리스트에 추가합니다.
                      }

                      /**
                       * @description 신청자 폴더가 존재하지 않으면 생성하고, 각 파일의 대상 폴더도 생성합니다.
                       */
                      if (!(await fileSystem(`exist`, [ aspirantFolder ]))) {
                          await shellExec(`mkdir`, [ aspirantFolder ]); // 신청자 폴더 생성
                          for (let i = 0; i < list.length; i++) {
                              await shellExec(`mkdir`, [ `${aspirantFolder}/${list[i]}` ]); // 대상 폴더 생성
                          }
                      }

                      /**
                       * @description 업로드된 각 파일을 지정된 폴더로 이동시키고, PDF 파일이면 JPG로 변환합니다.
                       */
                      for (let i = 0; i < list.length; i++) {
                          if (Array.isArray(files[filesKeys[i]])) {
                              for (let j of files[filesKeys[i]]) {
                                  await shellExec(`mv ${shellLink(j.filepath)} ${shellLink(aspirantFolder + '/' + list[i] + '/' + j.originalFilename)};`); // 파일 이동
                                  if (/\.pdf$/.test(j.originalFilename)) { // PDF 파일인지 확인
                                      try {
                                          await imageReader.pdfToJpg(aspirantFolder + '/' + list[i] + '/' + j.originalFilename, true); // PDF를 JPG로 변환
                                      } catch {}
                                  }
                              }
                          } else {
                              await shellExec(`mv ${shellLink(files[filesKeys[i]].filepath)} ${shellLink(aspirantFolder + '/' + list[i] + '/' + files[filesKeys[i]].originalFilename)};`); // 단일 파일 이동
                              if (/\.pdf$/.test(files[filesKeys[i]].originalFilename)) { // PDF 파일인지 확인
                                  try {
                                      await imageReader.pdfToJpg(aspirantFolder + '/' + list[i] + '/' + files[filesKeys[i]].originalFilename, true); // PDF를 JPG로 변환
                                  } catch {}
                              }
                          }
                      }

                      // 파일 전송 완료 메시지를 Slack 채널로 보냅니다.
                      await messageSend({ text: name + "님의 문서 전송과 추가 포트폴리오 전송을 완료하였습니다!", channel: "#301_apply" });

                      // 성공 메시지를 클라이언트에 응답으로 보냅니다.
                      res.send(JSON.stringify({ message: "done" }));

                  } else {
                      logger.error(e, req).catch((e) => { console.log(e); });
                      console.log(err);
                      res.send(JSON.stringify({ message: "error" }));
                  }
              } catch (e) {
                  console.log(e);
                  logger.error(e, req).catch((e) => { console.log(e); });
                  res.send(JSON.stringify({ message: "error : " + e.message }));
              }
          });

      } catch (e) {
          console.log(e);
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @description 이 라우트는 POST 요청을 처리하여 특정 디자이너 신청자(aspirant)의 문서 파일 목록을 반환합니다.
     * 요청된 신청자 ID를 기반으로 관련된 모든 폴더를 검색하고, 해당 폴더 내의 계좌(account), 사업자(business), 신분증(identity) 파일의 URL을 생성하여 반환합니다.
     * @route POST /aspirantDocumentsList
     * @param {object} req - 클라이언트 요청 객체, 신청자 ID(aspid)를 포함합니다.
     * @param {object} res - 서버 응답 객체, 처리 결과를 반환합니다.
     */
    router.post([ "/aspirantDocumentsList" ], async function (req, res) {
      /**
       * @description 응답 헤더를 설정하여 응답 형식을 JSON으로 지정하고, 
       * 모든 출처에서의 접근을 허용하며, 특정 HTTP 메서드와 헤더를 허용합니다.
       */
      res.set({
          "Content-Type": "application/json", // 응답의 Content-Type을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 지정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 요청 헤더를 지정합니다.
      });

      try {
          /**
           * @description 요청된 body에 aspid(신청자 ID)가 없으면 오류를 발생시킵니다.
           * 신청자 ID가 주어지지 않은 경우, "invalid post" 오류 메시지를 반환합니다.
           */
          if (req.body.aspid === undefined) {
              throw new Error("invalid post");
          }

          const { aspid } = equalJson(req.body); // 요청된 데이터에서 신청자 ID를 추출합니다.
          const folderList = await fileSystem(`readDir`, [ aspirantConst ]); // 신청자 폴더의 목록을 읽어옵니다.
          const target0Folders = folderList.filter((str) => { return (new RegExp(aspid, "g").test(str)) }); // 신청자 ID와 일치하는 폴더를 필터링합니다.
          const targetFolders = target0Folders.map((str) => { return `${aspirantConst}/${str}` }); // 필터링된 폴더의 경로를 생성합니다.
          
          let tempArr, tempArr2;
          let accountList = []; // 계좌 파일 목록을 저장할 배열
          let businessList = []; // 사업자 파일 목록을 저장할 배열
          let identityList = []; // 신분증 파일 목록을 저장할 배열

          /**
           * @description 각 신청자 폴더를 순회하며 계좌, 사업자, 신분증 파일을 검색하고, 해당 파일의 URL을 생성합니다.
           */
          for (let folder of targetFolders) {
              tempArr = (await fileSystem(`readDir`, [ folder ])).filter((str) => { return str !== ".DS_Store" }); // 폴더의 내용을 읽고, 불필요한 항목을 필터링합니다.
      
              let tempAccountList = []; // 임시 계좌 파일 목록
              let tempBusinessList = []; // 임시 사업자 파일 목록
              let tempIdentityList = []; // 임시 신분증 파일 목록
      
              if (tempArr.includes("account")) { // 'account' 폴더가 있는지 확인합니다.
                  tempArr2 = (await fileSystem(`readDir`, [ folder + "/account" ])).filter((str) => { return str !== ".DS_Store" }); // 'account' 폴더의 내용을 읽습니다.
                  tempAccountList = tempArr2.map((str) => { return `${folder}/account/${str}`; }) // 파일 경로를 생성합니다.
                      .map((path) => {
                          const targetPath = path.replace(new RegExp("^" + staticConst, "g"), ""); // 경로에서 staticConst를 제거합니다.
                          return targetPath;
                      })
                      .map((path) => {
                          return linkToString("https://" + address.secondinfo.host + path); // 최종 URL을 생성합니다.
                      });
              }
              
              if (tempArr.includes("business")) { // 'business' 폴더가 있는지 확인합니다.
                  tempArr2 = (await fileSystem(`readDir`, [ folder + "/business" ])).filter((str) => { return str !== ".DS_Store" }); // 'business' 폴더의 내용을 읽습니다.
                  tempBusinessList = tempArr2.map((str) => { return `${folder}/business/${str}`; }) // 파일 경로를 생성합니다.
                      .map((path) => {
                          const targetPath = path.replace(new RegExp("^" + staticConst, "g"), ""); // 경로에서 staticConst를 제거합니다.
                          return targetPath;
                      })
                      .map((path) => {
                          return linkToString("https://" + address.secondinfo.host + path); // 최종 URL을 생성합니다.
                      });
              }
              
              if (tempArr.includes("identity")) { // 'identity' 폴더가 있는지 확인합니다.
                  tempArr2 = (await fileSystem(`readDir`, [ folder + "/identity" ])).filter((str) => { return str !== ".DS_Store" }); // 'identity' 폴더의 내용을 읽습니다.
                  tempIdentityList = tempArr2.map((str) => { return `${folder}/identity/${str}`; }) // 파일 경로를 생성합니다.
                      .map((path) => {
                          const targetPath = path.replace(new RegExp("^" + staticConst, "g"), ""); // 경로에서 staticConst를 제거합니다.
                          return targetPath;
                      })
                      .map((path) => {
                          return linkToString("https://" + address.secondinfo.host + path); // 최종 URL을 생성합니다.
                      });
              }
      
              // 생성된 각 파일 URL을 리스트에 추가합니다.
              accountList = accountList.concat(tempAccountList);
              businessList = businessList.concat(tempBusinessList);
              identityList = identityList.concat(tempIdentityList);
          }
      
          // 생성된 계좌, 사업자, 신분증 파일 목록을 JSON 형식으로 응답합니다.
          res.send(JSON.stringify({
              account: accountList,
              business: businessList,
              identity: identityList,
          }));
      
      } catch (e) {
          /**
           * @description 예외 발생 시, 오류를 로깅하고, 오류 메시지를 JSON 형식으로 응답합니다.
           */
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @description 이 라우트는 POST 요청을 처리하여 디자이너 신청자(aspirant)의 포트폴리오 이미지를 반환합니다.
     * 요청된 신청자 ID(aspid)를 기반으로 관련된 모든 포트폴리오 폴더를 검색하고, 해당 폴더 내의 이미지 파일들의 URL을 생성하여 반환합니다.
     * @route POST /aspirantPortfolio
     * @param {object} req - 클라이언트 요청 객체, 신청자 ID(aspid)를 포함합니다.
     * @param {object} res - 서버 응답 객체, 처리 결과를 반환합니다.
     */
    router.post([ "/aspirantPortfolio" ], async function (req, res) {
      /**
       * @description 응답 헤더를 설정하여 응답 형식을 JSON으로 지정하고, 
       * 모든 출처에서의 접근을 허용하며, 특정 HTTP 메서드와 헤더를 허용합니다.
       */
      res.set({
          "Content-Type": "application/json", // 응답의 Content-Type을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 지정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 요청 헤더를 지정합니다.
      });

      try {
          /**
           * @description 요청된 body에 aspid(신청자 ID)가 없으면 오류를 발생시킵니다.
           * 신청자 ID가 주어지지 않은 경우, "invalid post" 오류 메시지를 반환합니다.
           */
          if (req.body.aspid === undefined) {
              throw new Error("invalid post");
          }

          // 요청된 데이터에서 신청자 ID를 추출합니다.
          const { aspid } = equalJson(req.body); 
          // 신청자 폴더의 목록을 읽어옵니다.
          const folderList = await fileSystem(`readDir`, [ aspirantConst ]);
          // 포트폴리오 파일이 저장될 폴더명을 정의합니다.
          const uploadMapConst = "portfolio";
          // 신청자 ID와 일치하는 폴더를 필터링하고, 필터링된 폴더 경로에 포트폴리오 폴더를 추가합니다.
          const targetFolders = folderList.filter((str) => { 
              return (new RegExp(aspid, "g").test(str)) 
          }).map((str) => { 
              return `${aspirantConst}/${str}/${uploadMapConst}` 
          });
          
          let targetImages;
          let totalImages = []; // 모든 포트폴리오 이미지를 저장할 배열

          /**
           * @description 각 신청자 포트폴리오 폴더를 순회하며 이미지 파일을 검색하고, 해당 파일의 URL을 생성합니다.
           */
          for (let folder of targetFolders) {
              try {
                  // 포트폴리오 폴더가 존재하는지 확인합니다.
                  if (await fileSystem(`exist`, [ folder ])) {
                      targetImages = (await fileSystem(`readDir`, [ folder ])) // 포트폴리오 폴더의 파일 목록을 읽어옵니다.
                          .filter((str) => { return str !== ".DS_Store" }) // 불필요한 파일을 필터링합니다.
                          .map((str) => { return `${folder}/${str}`; }) // 파일 경로를 생성합니다.
                          .map((path) => {
                              // 경로에서 staticConst를 제거합니다.
                              const targetPath = path.replace(new RegExp("^" + staticConst, "g"), ""); 
                              return targetPath;
                          })
                          .map((path) => {
                              // 최종 URL을 생성합니다.
                              return linkToString("https://" + address.secondinfo.host + path); 
                          });
                      // 생성된 이미지 URL을 리스트에 추가합니다.
                      totalImages = totalImages.concat(equalJson(JSON.stringify(targetImages))); 
                  } else {
                      // 폴더가 없을 경우 빈 배열을 추가합니다.
                      totalImages = totalImages.concat([]); 
                  }
              } catch (e) {
                  // 오류가 발생한 경우 빈 배열을 추가합니다.
                  totalImages = totalImages.concat([]); 
              }
          }

          // 생성된 이미지 URL 목록을 JSON 형식으로 응답합니다.
          res.send(JSON.stringify({ link: totalImages }));

      } catch (e) {
          /**
           * @description 예외 발생 시, 오류를 로깅하고, 오류 메시지를 JSON 형식으로 응답합니다.
           */
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @description 이 라우트는 POST 요청을 처리하여 디자이너 신청자(aspirant)의 포트폴리오 이미지를 다운로드할 수 있도록 ZIP 파일로 압축하거나, 생성된 ZIP 파일을 삭제합니다.
     * 요청된 신청자 ID(aspid)와 모드(mode)에 따라 파일을 생성하거나 삭제합니다.
     * @route POST /aspirantPortfolioDownload
     * @param {object} req - 클라이언트 요청 객체, 신청자 ID(aspid)와 모드(mode)를 포함합니다.
     * @param {object} res - 서버 응답 객체, 처리 결과를 반환합니다.
     */
    router.post([ "/aspirantPortfolioDownload" ], async function (req, res) {
      /**
       * @description 응답 헤더를 설정하여 응답 형식을 JSON으로 지정하고, 
       * 모든 출처에서의 접근을 허용하며, 특정 HTTP 메서드와 헤더를 허용합니다.
       */
      res.set({
          "Content-Type": "application/json", // 응답의 Content-Type을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 지정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 요청 헤더를 지정합니다.
      });

      try {
          /**
           * @description 요청된 body에 aspid(신청자 ID)가 없으면 오류를 발생시킵니다.
           * 신청자 ID가 주어지지 않은 경우, "invalid post" 오류 메시지를 반환합니다.
           */
          if (req.body.aspid === undefined) {
              throw new Error("invalid post");
          }

          // 요청된 데이터에서 신청자 ID와 모드를 추출합니다.
          const { aspid, mode } = equalJson(req.body);
          // 신청자 폴더의 목록을 읽어옵니다.
          const folderList = await fileSystem(`readDir`, [ aspirantConst ]);
          // 포트폴리오 파일이 저장될 폴더명을 정의합니다.
          const uploadMapConst = "portfolio";
          // 신청자 ID와 일치하는 폴더를 필터링하고, 필터링된 폴더 경로에 포트폴리오 폴더를 추가합니다.
          const targetFolders = folderList.filter((str) => { 
              return (new RegExp(aspid, "g").test(str)) 
          }).map((str) => { 
              return `${aspirantConst}/${str}/${uploadMapConst}` 
          });
          
          // 임시 폴더 이름을 생성합니다.
          const tempFolderName = "aspirant_" + aspid + "_" + uniqueValue("hex");
          let targetImages;
          let totalImages;
          let commands;
          let path;
      
          // 모드가 "create"인 경우 포트폴리오 ZIP 파일을 생성합니다.
          if (mode === "create") {
      
              totalImages = [];
              for (let folder of targetFolders) {
                  // 포트폴리오 폴더가 존재하는지 확인합니다.
                  if (await fileSystem(`exist`, [ folder ])) {
                      targetImages = (await fileSystem(`readDir`, [ folder ])) // 포트폴리오 폴더의 파일 목록을 읽어옵니다.
                          .filter((str) => { return str !== ".DS_Store" }) // 불필요한 파일을 필터링합니다.
                          .map((str) => { return `${folder}/${str}`; });
                      // 이미지 경로를 배열에 추가합니다.
                      totalImages = totalImages.concat(equalJson(JSON.stringify(targetImages))); 
                  } else {
                      // 폴더가 없을 경우 빈 배열을 추가합니다.
                      totalImages = totalImages.concat([]); 
                  }
              }
      
              // 이미 존재하는 임시 폴더를 삭제합니다.
              if (await fileSystem(`exist`, [ `${tempConst}/${tempFolderName}` ])) {
                  await shellExec(`rm`, [ `-rf`, `${tempConst}/${tempFolderName}` ]);
              }
              // 새 임시 폴더를 생성합니다.
              await shellExec(`mkdir`, [ `${tempConst}/${tempFolderName}` ]);
      
              // 이미지를 임시 폴더로 복사합니다.
              for (let path of totalImages) {
                  await shellExec(`cp`, [ path, `${tempConst}/${tempFolderName}/` ]);
              }
      
              // 임시 폴더에서 ZIP 파일을 생성합니다.
              commands = "";
              commands += `cd ${shellLink(tempConst)}/${tempFolderName};`;
              commands += `zip ${shellLink(tempConst)}/${tempFolderName}.zip ./*;`;  
              await shellExec(commands);
      
              // 생성된 ZIP 파일의 경로를 설정합니다.
              path = String(`${tempConst}/${tempFolderName}.zip`).replace(new RegExp("^" + staticConst, "g"), "");
              // 임시 폴더를 삭제합니다.
              await shellExec(`rm`, [ `-rf`, `${tempConst}/${tempFolderName}` ]);
      
              // ZIP 파일의 링크를 클라이언트에 응답합니다.
              res.send(JSON.stringify({ link: linkToString("https://" + address.secondinfo.host + path) }));
      
          // 모드가 "delete"인 경우 생성된 ZIP 파일을 삭제합니다.
          } else if (mode === "delete") {
      
              const { file } = equalJson(req.body); // 요청된 데이터에서 파일명을 추출합니다.
              // 지정된 파일을 삭제합니다.
              await shellExec(`rm`, [ `-rf`, `${tempConst}/${file}` ]);
              // 삭제 완료 메시지를 응답합니다.
              res.send(JSON.stringify({ message: "done" }));
      
          } else {
              // 잘못된 모드가 전달된 경우 오류를 발생시킵니다.
              throw new Error("invalid mode");
          }
      
      } catch (e) {
          /**
           * @description 예외 발생 시, 오류를 로깅하고, 오류 메시지를 JSON 형식으로 응답합니다.
           */
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @description 이 라우트는 POST 요청을 처리하여 디자이너 신청자(aspirant)의 설정 파일을 다운로드할 수 있도록 ZIP 파일로 압축하거나, 생성된 ZIP 파일을 삭제합니다.
     * 요청된 신청자 ID(aspid)와 모드(mode)에 따라 파일을 생성하거나 삭제합니다.
     * @route POST /aspirantSettingDownload
     * @param {object} req - 클라이언트 요청 객체, 신청자 ID(aspid)와 모드(mode)를 포함합니다.
     * @param {object} res - 서버 응답 객체, 처리 결과를 반환합니다.
     */
    router.post([ "/aspirantSettingDownload" ], async function (req, res) {
      /**
       * @description 응답 헤더를 설정하여 응답 형식을 JSON으로 지정하고, 
       * 모든 출처에서의 접근을 허용하며, 특정 HTTP 메서드와 헤더를 허용합니다.
       */
      res.set({
          "Content-Type": "application/json", // 응답의 Content-Type을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 지정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 요청 헤더를 지정합니다.
      });

      try {
          /**
           * @description 요청된 body에 aspid(신청자 ID)가 없으면 오류를 발생시킵니다.
           * 신청자 ID가 주어지지 않은 경우, "invalid post" 오류 메시지를 반환합니다.
           */
          if (req.body.aspid === undefined) {
              throw new Error("invalid post");
          }

          // 요청된 데이터에서 신청자 ID와 모드를 추출합니다.
          const { aspid, mode } = equalJson(req.body);
          // 신청자 폴더의 목록을 읽어옵니다.
          const folderList = await fileSystem(`readDir`, [ aspirantConst ]);
          // 설정 파일이 저장될 폴더명을 정의합니다.
          const uploadMapConst = "setting";
          // 신청자 ID와 일치하는 폴더를 필터링하고, 필터링된 폴더 경로에 설정 폴더를 추가합니다.
          const targetFolders = folderList.filter((str) => { 
              return (new RegExp(aspid, "g").test(str)) 
          }).map((str) => { 
              return `${aspirantConst}/${str}/${uploadMapConst}` 
          });
          
          // 임시 폴더 이름을 생성합니다.
          const tempFolderName = "aspirant_" + aspid + "_" + uniqueValue("hex");
          let targetImages;
          let totalImages;
          let commands;
          let path;
      
          // 모드가 "create"인 경우 설정 파일 ZIP을 생성합니다.
          if (mode === "create") {
      
              totalImages = [];
              for (let folder of targetFolders) {
                  // 설정 폴더가 존재하는지 확인합니다.
                  if (await fileSystem(`exist`, [ folder ])) {
                      targetImages = (await fileSystem(`readDir`, [ folder ])) // 설정 폴더의 파일 목록을 읽어옵니다.
                          .filter((str) => { return str !== ".DS_Store" }) // 불필요한 파일을 필터링합니다.
                          .map((str) => { return `${folder}/${str}`; });
                      // 이미지 경로를 배열에 추가합니다.
                      totalImages = totalImages.concat(equalJson(JSON.stringify(targetImages))); 
                  } else {
                      // 폴더가 없을 경우 빈 배열을 추가합니다.
                      totalImages = totalImages.concat([]); 
                  }
              }
      
              // 이미 존재하는 임시 폴더를 삭제합니다.
              if (await fileSystem(`exist`, [ `${tempConst}/${tempFolderName}` ])) {
                  await shellExec(`rm`, [ `-rf`, `${tempConst}/${tempFolderName}` ]);
              }
              // 새 임시 폴더를 생성합니다.
              await shellExec(`mkdir`, [ `${tempConst}/${tempFolderName}` ]);
      
              // 이미지를 임시 폴더로 복사합니다.
              for (let path of totalImages) {
                  await shellExec(`cp`, [ path, `${tempConst}/${tempFolderName}/` ]);
              }
      
              // 임시 폴더에서 ZIP 파일을 생성합니다.
              commands = "";
              commands += `cd ${shellLink(tempConst)}/${tempFolderName};`;
              commands += `zip ${shellLink(tempConst)}/${tempFolderName}.zip ./*;`;  
              await shellExec(commands);
      
              // 생성된 ZIP 파일의 경로를 설정합니다.
              path = String(`${tempConst}/${tempFolderName}.zip`).replace(new RegExp("^" + staticConst, "g"), "");
              // 임시 폴더를 삭제합니다.
              await shellExec(`rm`, [ `-rf`, `${tempConst}/${tempFolderName}` ]);
      
              // ZIP 파일의 링크를 클라이언트에 응답합니다.
              res.send(JSON.stringify({ link: linkToString("https://" + address.secondinfo.host + path) }));
      
          // 모드가 "delete"인 경우 생성된 ZIP 파일을 삭제합니다.
          } else if (mode === "delete") {
      
              const { file } = equalJson(req.body); // 요청된 데이터에서 파일명을 추출합니다.
              // 지정된 파일을 삭제합니다.
              await shellExec(`rm`, [ `-rf`, `${tempConst}/${file}` ]);
              // 삭제 완료 메시지를 응답합니다.
              res.send(JSON.stringify({ message: "done" }));
      
          } else {
              // 잘못된 모드가 전달된 경우 오류를 발생시킵니다.
              throw new Error("invalid mode");
          }
      
      } catch (e) {
          /**
           * @description 예외 발생 시, 오류를 로깅하고, 오류 메시지를 JSON 형식으로 응답합니다.
           */
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @description 이 라우트는 POST 요청을 처리하여 디자이너 신청자(aspirant)의 제안서 파일을 다운로드할 수 있도록 ZIP 파일로 압축하거나, 생성된 ZIP 파일을 삭제합니다.
     * 요청된 신청자 ID(aspid)와 모드(mode)에 따라 파일을 생성하거나 삭제합니다.
     * @route POST /aspirantProposalDownload
     * @param {object} req - 클라이언트 요청 객체, 신청자 ID(aspid)와 모드(mode)를 포함합니다.
     * @param {object} res - 서버 응답 객체, 처리 결과를 반환합니다.
     */
    router.post([ "/aspirantProposalDownload" ], async function (req, res) {
      /**
       * @description 응답 헤더를 설정하여 응답 형식을 JSON으로 지정하고, 
       * 모든 출처에서의 접근을 허용하며, 특정 HTTP 메서드와 헤더를 허용합니다.
       */
      res.set({
          "Content-Type": "application/json", // 응답의 Content-Type을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 지정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 요청 헤더를 지정합니다.
      });

      try {
          /**
           * @description 요청된 body에 aspid(신청자 ID)가 없으면 오류를 발생시킵니다.
           * 신청자 ID가 주어지지 않은 경우, "invalid post" 오류 메시지를 반환합니다.
           */
          if (req.body.aspid === undefined) {
              throw new Error("invalid post");
          }

          // 요청된 데이터에서 신청자 ID와 모드를 추출합니다.
          const { aspid, mode } = equalJson(req.body);
          // 신청자 폴더의 목록을 읽어옵니다.
          const folderList = await fileSystem(`readDir`, [ aspirantConst ]);
          // 제안서 파일이 저장될 폴더명을 정의합니다.
          const uploadMapConst = "proposal";
          // 신청자 ID와 일치하는 폴더를 필터링하고, 필터링된 폴더 경로에 제안서 폴더를 추가합니다.
          const targetFolders = folderList.filter((str) => { 
              return (new RegExp(aspid, "g").test(str)) 
          }).map((str) => { 
              return `${aspirantConst}/${str}/${uploadMapConst}` 
          });
          
          // 임시 폴더 이름을 생성합니다.
          const tempFolderName = "aspirant_" + aspid + "_" + uniqueValue("hex");
          let targetImages;
          let totalImages;
          let commands;
          let path;
      
          // 모드가 "create"인 경우 제안서 ZIP 파일을 생성합니다.
          if (mode === "create") {
      
              totalImages = [];
              for (let folder of targetFolders) {
                  // 제안서 폴더가 존재하는지 확인합니다.
                  if (await fileSystem(`exist`, [ folder ])) {
                      targetImages = (await fileSystem(`readDir`, [ folder ])) // 제안서 폴더의 파일 목록을 읽어옵니다.
                          .filter((str) => { return str !== ".DS_Store" }) // 불필요한 파일을 필터링합니다.
                          .map((str) => { return `${folder}/${str}`; });
                      // 이미지 경로를 배열에 추가합니다.
                      totalImages = totalImages.concat(equalJson(JSON.stringify(targetImages))); 
                  } else {
                      // 폴더가 없을 경우 빈 배열을 추가합니다.
                      totalImages = totalImages.concat([]); 
                  }
              }
      
              // 이미 존재하는 임시 폴더를 삭제합니다.
              if (await fileSystem(`exist`, [ `${tempConst}/${tempFolderName}` ])) {
                  await shellExec(`rm`, [ `-rf`, `${tempConst}/${tempFolderName}` ]);
              }
              // 새 임시 폴더를 생성합니다.
              await shellExec(`mkdir`, [ `${tempConst}/${tempFolderName}` ]);
      
              // 제안서 파일을 임시 폴더로 복사합니다.
              for (let path of totalImages) {
                  await shellExec(`cp`, [ path, `${tempConst}/${tempFolderName}/` ]);
              }
      
              // 임시 폴더에서 ZIP 파일을 생성합니다.
              commands = "";
              commands += `cd ${shellLink(tempConst)}/${tempFolderName};`;
              commands += `zip ${shellLink(tempConst)}/${tempFolderName}.zip ./*;`;  
              await shellExec(commands);
      
              // 생성된 ZIP 파일의 경로를 설정합니다.
              path = String(`${tempConst}/${tempFolderName}.zip`).replace(new RegExp("^" + staticConst, "g"), "");
              // 임시 폴더를 삭제합니다.
              await shellExec(`rm`, [ `-rf`, `${tempConst}/${tempFolderName}` ]);
      
              // ZIP 파일의 링크를 클라이언트에 응답합니다.
              res.send(JSON.stringify({ link: linkToString("https://" + address.secondinfo.host + path) }));
      
          // 모드가 "delete"인 경우 생성된 ZIP 파일을 삭제합니다.
          } else if (mode === "delete") {
      
              const { file } = equalJson(req.body); // 요청된 데이터에서 파일명을 추출합니다.
              // 지정된 파일을 삭제합니다.
              await shellExec(`rm`, [ `-rf`, `${tempConst}/${file}` ]);
              // 삭제 완료 메시지를 응답합니다.
              res.send(JSON.stringify({ message: "done" }));
      
          } else {
              // 잘못된 모드가 전달된 경우 오류를 발생시킵니다.
              throw new Error("invalid mode");
          }
      
      } catch (e) {
          /**
           * @description 예외 발생 시, 오류를 로깅하고, 오류 메시지를 JSON 형식으로 응답합니다.
           */
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @description 이 라우트는 POST 요청을 처리하여 디자이너의 설정 파일과 제안서 파일을 저장합니다.
     * 요청된 파일들은 지정된 디렉토리에 저장되며, 저장된 파일에 대한 설명 파일도 함께 생성됩니다.
     * @route POST /designerSettingBinary
     * @param {object} req - 클라이언트 요청 객체, 파일 업로드 정보와 디자이너의 설정 정보(mode, name, desid, phone, description)를 포함합니다.
     * @param {object} res - 서버 응답 객체, 처리 결과를 반환합니다.
     */
    router.post([ "/designerSettingBinary" ], async function (req, res) {
      /**
       * @description 응답 헤더를 설정하여 응답 형식을 JSON으로 지정하고, 
       * 모든 출처에서의 접근을 허용하며, 특정 HTTP 메서드와 헤더를 허용합니다.
       */
      res.set({
          "Content-Type": "application/json", // 응답의 Content-Type을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 지정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 요청 헤더를 지정합니다.
      });

      try {
          /**
           * @description formidable을 사용하여 다중 파일 업로드를 처리합니다. 
           * 최대 파일 크기와 인코딩 설정을 포함합니다.
           */
          const form = formidable({ multiples: true, encoding: "utf-8", maxFileSize: (9000 * 1024 * 1024) }); 
          form.parse(req, async function (err, fields, files) {
              try {
                  let filesKeys = Object.keys(files);
                  // 파일이 정상적으로 업로드 되었는지 확인합니다.
                  if (!err && filesKeys.length > 0) {
                      // 요청된 필드에서 디자이너의 설정 정보와 파일 이름을 추출합니다.
                      const { mode, name, desid, phone, description } = fields;
                      // 디자이너 폴더 이름을 설정합니다.
                      const designerFolderName = ("date" + todayMaker("total")) + '_' + name + '_' + desid;
                      // 업로드된 파일의 종류에 따라 폴더를 매핑합니다.
                      const uploadMap = {
                          upload0: "setting", // 설정 파일
                          upload1: "proposal", // 제안서 파일
                      };
                      let list, designerFolder;
          
                      // 디자이너 설정 파일이 저장될 폴더 경로를 정의합니다.
                      designerFolder = `${designerSettingConst}/${designerFolderName}`;
          
                      list = [];
                      // 업로드된 파일 리스트를 생성합니다.
                      for (let i = 0; i < filesKeys.length; i++) {
                          list.push(uploadMap[filesKeys[i]]);
                      }
          
                      // 디자이너 폴더가 존재하지 않으면 새로 생성합니다.
                      if (!(await fileSystem(`exist`, [ designerFolder ]))) {
                          await shellExec(`mkdir`, [ designerFolder ]);
                      }
                      // 각 파일 종류별로 하위 폴더를 생성하고 설명 파일을 저장합니다.
                      for (let i = 0; i < list.length; i++) {
                          if (!(await fileSystem(`exist`, [ `${designerFolder}/${list[i]}` ]))) {
                              await shellExec(`mkdir`, [ `${designerFolder}/${list[i]}` ]);
                          }
                          // 설명 파일을 생성합니다.
                          await fileSystem(`write`, [ `${designerFolder}/${list[i]}/description_${String(uniqueValue("hex"))}.txt`, description ]);
                      }
          
                      // 업로드된 파일을 지정된 폴더에 저장합니다.
                      for (let i = 0; i < list.length; i++) {
                          if (Array.isArray(files[filesKeys[i]])) {
                              for (let j of files[filesKeys[i]]) {
                                  await shellExec(`mv ${shellLink(j.filepath)} ${shellLink(designerFolder + '/' + list[i] + '/' + j.originalFilename)};`);
                                  // PDF 파일인 경우 JPG로 변환합니다.
                                  if (/\.pdf$/.test(j.originalFilename)) {
                                      try {
                                          await imageReader.pdfToJpg(designerFolder + '/' + list[i] + '/' + j.originalFilename, true);
                                      } catch {}
                                  }
                              }
                          } else {
                              await shellExec(`mv ${shellLink(files[filesKeys[i]].filepath)} ${shellLink(designerFolder + '/' + list[i] + '/' + files[filesKeys[i]].originalFilename)};`);
                              // PDF 파일인 경우 JPG로 변환합니다.
                              if (/\.pdf$/.test(files[filesKeys[i]].originalFilename)) {
                                  try {
                                      await imageReader.pdfToJpg(designerFolder + '/' + list[i] + '/' + files[filesKeys[i]].originalFilename, true);
                                  } catch {}
                              }
                          }
                      }
          
                      // 성공 메시지를 Slack 채널에 전송합니다.
                      await messageSend({ text: name + " 실장님의 " + (mode === "general" ? "1세트 포트폴리오" : "추천서용 사진") + " 파일 전송을 완료하였습니다!", channel: "#300_designer" });
                      // 클라이언트에게 성공 메시지를 응답합니다.
                      res.send(JSON.stringify({ message: "done" }));
          
                  } else {
                      // 파일 업로드 중 오류가 발생한 경우
                      logger.error(e, req).catch((e) => { console.log(e); });
                      console.log(err);
                      res.send(JSON.stringify({ message: "error" }));
                  }
              } catch (e) {
                  // 예외 발생 시, 오류를 로깅하고 클라이언트에게 오류 메시지를 응답합니다.
                  console.log(e);
                  logger.error(e, req).catch((e) => { console.log(e); });
                  res.send(JSON.stringify({ message: "error : " + e.message }));
              }
          });

      } catch (e) {
          // 예외 발생 시, 오류를 로깅하고 클라이언트에게 오류 메시지를 응답합니다.
          console.log(e);
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @description 이 라우트는 POST 요청을 처리하여 클라이언트의 파일 또는 폴더를 삭제합니다.
     * 요청된 경로(path)를 검증한 후, 유효한 경로인 경우 해당 경로에 위치한 파일 또는 폴더를 삭제합니다.
     * @route POST /clientDelete
     * @param {object} req - 클라이언트 요청 객체, 삭제할 경로(path)를 포함합니다.
     * @param {object} res - 서버 응답 객체, 처리 결과를 반환합니다.
     */
    router.post([ "/clientDelete" ], async function (req, res) {
      /**
       * @description 응답 헤더를 설정하여 응답 형식을 JSON으로 지정하고, 
       * 모든 출처에서의 접근을 허용하며, 특정 HTTP 메서드와 헤더를 허용합니다.
       */
      res.set({
          "Content-Type": "application/json", // 응답의 Content-Type을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 지정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 요청 헤더를 지정합니다.
      });

      try {
          /**
           * @description 요청된 경로(path)가 문자열이 아닌 경우, 오류를 발생시킵니다.
           * 경로가 문자열이어야 하며, 이 조건을 만족하지 않으면 "must be path" 오류 메시지를 반환합니다.
           */
          if (typeof req.body.path !== "string") {
              throw new Error("must be path");
          }

          /**
           * @description 요청된 경로(path)가 슬래시(/)로 시작하지 않으면 오류를 발생시킵니다.
           * 경로가 슬래시로 시작해야 하며, 이 조건을 만족하지 않으면 "invalid path" 오류 메시지를 반환합니다.
           */
          if (!/^\//i.test(req.body.path)) {
              throw new Error("invalid path");
          }

          // 요청된 경로를 변수에 저장합니다.
          const { path } = req.body;
          let realDo;

          // 초기 값 설정, 삭제 조건을 만족할 때만 true로 변경됩니다.
          realDo = false;

          /**
           * @description 경로가 "/photo"로 시작하고, "client"라는 문자열이 포함된 경우에만 삭제를 허용합니다.
           * 이는 특정 폴더에 대한 안전한 삭제를 보장하기 위한 검증입니다.
           */
          if (/^\/photo/gi.test(path)) {
              if (/client/gi.test(path)) {
                  realDo = true; // 조건을 만족하면 삭제를 허용합니다.
              }
          }

          /**
           * @description 조건을 만족한 경우, 주어진 경로에 위치한 파일 또는 폴더를 삭제합니다.
           */
          if (realDo) {
              await shellExec(`rm`, [ `-rf`, staticConst + path ]); // 주어진 경로에 있는 파일 또는 폴더를 삭제합니다.
          }

          // 삭제가 성공적으로 이루어진 경우, 클라이언트에게 성공 메시지를 응답합니다.
          res.send(JSON.stringify({ message: "success" }));

      } catch (e) {
          /**
           * @description 예외 발생 시, 오류를 로깅하고, 오류 메시지를 JSON 형식으로 응답합니다.
           */
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @description 이 라우트는 POST 요청을 처리하여 링크 파싱 작업을 수행합니다.
     * 요청된 링크를 파싱하여 필요한 데이터를 추출하고, 파싱된 정보를 반환합니다.
     * @route POST /middleLinkParsing
     * @param {object} req - 클라이언트 요청 객체, 파싱할 링크 목록(links)을 포함합니다.
     * @param {object} res - 서버 응답 객체, 파싱된 결과를 반환합니다.
     */
    router.post([ "/middleLinkParsing" ], async function (req, res) {
      /**
       * @description 응답 헤더를 설정하여 응답 형식을 JSON으로 지정하고, 
       * 모든 출처에서의 접근을 허용하며, 특정 HTTP 메서드와 헤더를 허용합니다.
       */
      res.set({
          "Content-Type": "application/json", // 응답의 Content-Type을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 지정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 요청 헤더를 지정합니다.
      });

      try {
          /**
           * @description 요청된 데이터에 links가 포함되어 있는지 확인합니다.
           * 포함되지 않은 경우, "invalid post" 오류 메시지를 반환합니다.
           */
          if (req.body.links === undefined) {
              throw new Error("invalid post");
          }

          // 요청된 링크 데이터를 파싱하여 변수에 저장합니다.
          const targets = equalJson(req.body.links);
          let tong, raw, rawArr, link, memo;
          let key, date, order, hashRaw, hash, exe;
          let parsedString;

          tong = []; // 결과를 저장할 배열 초기화

          /**
           * @description 각 링크(targets)에 대해 반복문을 수행하여 파싱 작업을 진행합니다.
           * 링크의 정보를 해시, 날짜, 키, 순서 등의 요소로 분해하고, 파일 내용을 읽어와 파싱된 정보를 생성합니다.
           */
          for (let { desid, proid, file } of targets) {

              // 파일명에서 key, date, order, hashRaw를 추출합니다.
              [ key, date, order, hashRaw ] = file.split("_");

              // hash와 확장자를 분리합니다.
              [ hash, exe ] = hashRaw.split(".");

              // 해시를 복호화하여 원래의 문자열을 얻습니다.
              parsedString = await decryptoHash("homeliaison", hash);

              // 파일에서 문자열을 읽어와서 불필요한 공백을 제거합니다.
              raw = (await fileSystem(`readString`, [ `${folderConst}/${desid}/${proid}/${file}` ])).trim();
              rawArr = raw.split("\n");

              // 읽어온 문자열이 한 줄일 경우, link로 설정하고 memo는 빈 문자열로 설정합니다.
              // 두 줄 이상일 경우, 첫 줄은 link, 두 번째 줄은 memo로 설정합니다.
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

              /**
               * @description parsedString이 특정 조건을 만족하지 않으면, memo에 parsedString을 저장하고
               * 파일 내용을 link와 parsedString으로 갱신합니다.
               */
              if (!(/^[0-9]/.test(parsedString) && /[0-9]$/.test(parsedString) && parsedString.length > 5 && parsedString.replace(/[0-9]/gi, '') === '')) {
                  await fileSystem(`write`, [ `${folderConst}/${desid}/${proid}/${file}`, link + "\n" + parsedString ]);
                  memo = parsedString;
              }

              // 파싱된 결과를 tong 배열에 추가합니다.
              tong.push({ desid, proid, file, link, memo });
          }

          // 파싱된 결과를 클라이언트에게 JSON 형식으로 응답합니다.
          res.send(JSON.stringify(tong));
      } catch (e) {
          /**
           * @description 예외 발생 시, 오류를 로깅하고, 오류 메시지를 JSON 형식으로 응답합니다.
           */
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @description 이 라우트는 POST 요청을 처리하여 전달된 링크와 메모를 저장합니다.
     * 요청된 정보(proid, desid, link, memo, key)를 기반으로 파일을 생성하고 저장합니다.
     * @route POST /middleLinkSave
     * @param {object} req - 클라이언트 요청 객체, 저장할 링크, 메모 및 기타 정보를 포함합니다.
     * @param {object} res - 서버 응답 객체, 처리 결과를 반환합니다.
     */
    router.post([ "/middleLinkSave" ], async function (req, res) {
      /**
       * @description 응답 헤더를 설정하여 응답 형식을 JSON으로 지정하고, 
       * 모든 출처에서의 접근을 허용하며, 특정 HTTP 메서드와 헤더를 허용합니다.
       */
      res.set({
          "Content-Type": "application/json", // 응답의 Content-Type을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 지정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 요청 헤더를 지정합니다.
      });

      try {
          /**
           * @description 요청된 데이터에 필요한 필드들이 모두 포함되어 있는지 확인합니다.
           * 포함되지 않은 경우, "invalid post" 오류 메시지를 반환합니다.
           */
          if (req.body.proid === undefined || req.body.desid === undefined || req.body.link === undefined || req.body.memo === undefined || req.body.key === undefined) {
              throw new Error("invalid post");
          }

          // 요청된 데이터를 변수에 저장합니다.
          const { proid, desid, link, memo, key } = req.body;
          const now = new Date(); // 현재 시간을 가져옵니다.
          
          // 현재 시간을 기반으로 해시를 생성합니다.
          const hash = await cryptoString("homeliaison", String(now.valueOf()));

          /**
           * @description 파일 시스템에 링크와 메모를 저장합니다.
           * 파일명은 `key_타임스탬프_0_해시.link` 형태로 지정되며, 링크와 메모가 파일 내용으로 저장됩니다.
           */
          await fileSystem(`write`, [ `${folderConst}/${desid}/${proid}/${key}_${String(now.valueOf())}_${String(0)}_${hash}.link`, (global.decodeURIComponent(link).trim() + "\n" + memo.trim()) ]);

          // 저장이 성공적으로 이루어진 경우, 클라이언트에게 성공 메시지를 응답합니다.
          res.send(JSON.stringify({ message: "done" }));

      } catch (e) {
          /**
           * @description 예외 발생 시, 오류를 로깅하고, 오류 메시지를 JSON 형식으로 응답합니다.
           */
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @description 이 라우트는 POST 요청을 처리하여 지정된 사진 파일들을 삭제합니다.
     * 요청된 대상 목록(targets)을 기반으로 파일 시스템에서 파일을 제거합니다.
     * @route POST /middlePhotoRemove
     * @param {object} req - 클라이언트 요청 객체, 삭제할 파일들의 정보(targets)를 포함합니다.
     * @param {object} res - 서버 응답 객체, 처리 결과를 반환합니다.
     */
    router.post([ "/middlePhotoRemove" ], async function (req, res) {
      /**
       * @description 응답 헤더를 설정하여 응답 형식을 JSON으로 지정하고, 
       * 모든 출처에서의 접근을 허용하며, 특정 HTTP 메서드와 헤더를 허용합니다.
       */
      res.set({
          "Content-Type": "application/json", // 응답의 Content-Type을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 지정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 요청 헤더를 지정합니다.
      });

      try {
          /**
           * @description 요청된 데이터에 targets 필드가 포함되어 있는지 확인합니다.
           * 포함되지 않은 경우, "invalid post, must be targets" 오류 메시지를 반환합니다.
           */
          if (req.body.targets === undefined) {
              throw new Error("invalid post, must be targets");
          }

          // 요청된 데이터를 파싱하여 targets 변수에 저장합니다.
          const { targets } = equalJson(req.body);

          // targets가 배열인지 확인합니다. 배열이 아닐 경우 오류를 반환합니다.
          if (!Array.isArray(targets)) {
              throw new Error("invalid post, must be targets");
          }

          // 배열의 요소들이 객체인지 확인합니다. 그렇지 않을 경우 오류를 반환합니다.
          if (targets.some((obj) => { return typeof obj !== "object" })) {
              throw new Error("invalid post, must be targets");
          }

          // 배열의 요소들이 null이 아닌지 확인합니다. null인 요소가 있을 경우 오류를 반환합니다.
          if (targets.some((obj) => { return obj === null })) {
              throw new Error("invalid post, must be targets");
          }

          let desid, proid, fileName;
          let folder, kind;

          /**
           * @description 각 대상에 대해 반복문을 수행하여 사진 파일을 삭제합니다.
           * 대상이 디자이너 모드인 경우와 일반 모드인 경우로 구분하여 처리합니다.
           */
          for (let obj of targets) {
              if (typeof obj !== "object" || obj === null) {
                  throw new Error("invalid post, must be targets");
              }

              // 디자이너 모드인 경우
              if (obj.mode === "designer") {
                  desid = obj.desid;
                  proid = obj.proid;
                  fileName = obj.fileName;

                  // 디자이너 폴더, 프로젝트 폴더, 파일이 모두 존재하는 경우 파일을 삭제합니다.
                  if (await fileSystem(`exist`, [ folderConst + "/" + desid ])) {
                      if (await fileSystem(`exist`, [ folderConst + "/" + desid + "/" + proid ])) {
                          if (await fileSystem(`exist`, [ folderConst + "/" + desid + "/" + proid + "/" + fileName ])) {
                              await shellExec(`rm`, [ `-rf`, folderConst + "/" + desid + "/" + proid + "/" + fileName ]);
                          }
                      }
                  }

              } else { // 일반 모드인 경우
                  folder = global.decodeURIComponent(obj.folder); // 폴더명을 디코딩
                  kind = obj.kind; // 파일 종류를 저장
                  fileName = global.decodeURIComponent(obj.fileName); // 파일명을 디코딩

                  // 클라이언트 폴더, 종류 폴더, 파일이 모두 존재하는 경우 파일을 삭제합니다.
                  if (await fileSystem(`exist`, [ clientConst + "/" + folder ])) {
                      if (await fileSystem(`exist`, [ clientConst + "/" + folder + "/" + kind ])) {
                          if (await fileSystem(`exist`, [ clientConst + "/" + folder + "/" + kind + "/" + fileName ])) {
                              await shellExec(`rm`, [ `-rf`, clientConst + "/" + folder + "/" + kind + "/" + fileName ]);
                          }
                      }
                  }
              }
          }

          // 모든 작업이 완료되면 성공 메시지를 클라이언트에게 응답합니다.
          res.send(JSON.stringify({ message: "done" }));

      } catch (e) {
          /**
           * @description 예외 발생 시, 오류를 로깅하고, 오류 메시지를 JSON 형식으로 응답합니다.
           */
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @description 이 라우트는 POST 요청을 처리하여 사진 파일의 이름을 업데이트합니다.
     * 요청된 대상 목록(targets)을 기반으로 파일 시스템에서 파일명을 변경합니다.
     * @route POST /middlePhotoUpdate
     * @param {object} req - 클라이언트 요청 객체, 업데이트할 파일들의 정보(targets)를 포함합니다.
     * @param {object} res - 서버 응답 객체, 처리 결과를 반환합니다.
     */
    router.post([ "/middlePhotoUpdate" ], async function (req, res) {
      /**
       * @description 응답 헤더를 설정하여 응답 형식을 JSON으로 지정하고, 
       * 모든 출처에서의 접근을 허용하며, 특정 HTTP 메서드와 헤더를 허용합니다.
       */
      res.set({
          "Content-Type": "application/json", // 응답의 Content-Type을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 지정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 요청 헤더를 지정합니다.
      });

      try {
          /**
           * @description 요청된 데이터에 targets 필드가 포함되어 있는지 확인합니다.
           * 포함되지 않은 경우, "invalid post, must be targets" 오류 메시지를 반환합니다.
           */
          if (req.body.targets === undefined) {
              throw new Error("invalid post, must be targets");
          }

          // 요청된 데이터를 파싱하여 targets 변수에 저장합니다.
          const { targets } = equalJson(req.body);

          // targets가 배열인지 확인합니다. 배열이 아닐 경우 오류를 반환합니다.
          if (!Array.isArray(targets)) {
              throw new Error("invalid post, must be targets");
          }

          // 배열의 요소들이 객체인지 확인합니다. 그렇지 않을 경우 오류를 반환합니다.
          if (targets.some((obj) => { return typeof obj !== "object" })) {
              throw new Error("invalid post, must be targets");
          }

          // 배열의 요소들이 null이 아닌지 확인합니다. null인 요소가 있을 경우 오류를 반환합니다.
          if (targets.some((obj) => { return obj === null })) {
              throw new Error("invalid post, must be targets");
          }

          let key, date, order, hashRaw, pastHash, exe;
          let newFileName;
          let desid, proid, fileName;
          let folder, kind;
          let hash, mode;

          /**
           * @description 각 대상에 대해 반복문을 수행하여 사진 파일명을 업데이트합니다.
           * 대상이 디자이너 모드인 경우와 일반 모드인 경우로 구분하여 처리합니다.
           */
          for (let obj of targets) {
              if (typeof obj !== "object" || obj === null) {
                  throw new Error("invalid post, must be targets");
              }

              // 대상 객체에서 해시값과 모드를 가져옵니다.
              hash = obj.hash;
              mode = obj.mode;

              // 디자이너 모드인 경우
              if (mode === "designer") {
                  desid = obj.desid;
                  proid = obj.proid;
                  fileName = obj.fileName;

                  // 디자이너 폴더, 프로젝트 폴더, 파일이 모두 존재하는 경우 파일명을 업데이트합니다.
                  if (await fileSystem(`exist`, [ folderConst + "/" + desid ])) {
                      if (await fileSystem(`exist`, [ folderConst + "/" + desid + "/" + proid ])) {
                          if (await fileSystem(`exist`, [ folderConst + "/" + desid + "/" + proid + "/" + fileName ])) {
                              [ key, date, order, hashRaw ] = fileName.split("_");
                              [ pastHash, exe ] = hashRaw.split(".");
                              newFileName = key + "_" + date + "_" + order + "_" + hash + "." + exe;
                              if (pastHash !== hash) {
                                  await shellExec(`mv`, [ folderConst + "/" + desid + "/" + proid + "/" + fileName, folderConst + "/" + desid + "/" + proid + "/" + newFileName ]);
                              }
                          }
                      }
                  }

              } else { // 일반 모드인 경우
                  folder = global.decodeURIComponent(obj.folder); // 폴더명을 디코딩
                  kind = obj.kind; // 파일 종류를 저장
                  fileName = global.decodeURIComponent(obj.fileName); // 파일명을 디코딩

                  // 클라이언트 폴더, 종류 폴더, 파일이 모두 존재하는 경우 파일명을 업데이트합니다.
                  if (await fileSystem(`exist`, [ clientConst + "/" + folder ])) {
                      if (await fileSystem(`exist`, [ clientConst + "/" + folder + "/" + kind ])) {
                          if (await fileSystem(`exist`, [ clientConst + "/" + folder + "/" + kind + "/" + fileName ])) {
                              newFileName = hashConst + "_" + hash + "." + fileName.split(".")[fileName.split(".").length - 1];
                              await shellExec(`mv`, [ clientConst + "/" + folder + "/" + kind + "/" + fileName, clientConst + "/" + folder + "/" + kind + "/" + newFileName ]);
                          }
                      }
                  }

              }
          }

          // 모든 작업이 완료되면 성공 메시지를 클라이언트에게 응답합니다.
          res.send(JSON.stringify({ message: "done" }));

      } catch (e) {
          /**
           * @description 예외 발생 시, 오류를 로깅하고, 오류 메시지를 JSON 형식으로 응답합니다.
           */
          console.log(e);
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @description 이 라우트는 POST 요청을 처리하여 디자이너의 대표 작업물 사진 파일을 삭제합니다.
     * 요청된 대상 목록(targets)을 기반으로 파일 시스템에서 파일을 제거합니다.
     * @route POST /representativeFileRemove
     * @param {object} req - 클라이언트 요청 객체, 삭제할 파일들의 정보(targets)를 포함합니다.
     * @param {object} res - 서버 응답 객체, 처리 결과를 반환합니다.
     */
    router.post([ "/representativeFileRemove" ], async function (req, res) {
      /**
       * @description 응답 헤더를 설정하여 응답 형식을 JSON으로 지정하고, 
       * 모든 출처에서의 접근을 허용하며, 특정 HTTP 메서드와 헤더를 허용합니다.
       */
      res.set({
          "Content-Type": "application/json", // 응답의 Content-Type을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 지정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 요청 헤더를 지정합니다.
      });

      try {
          /**
           * @description 요청된 데이터에 targets 필드가 포함되어 있는지 확인합니다.
           * 포함되지 않은 경우, "invalid post, must be targets" 오류 메시지를 반환합니다.
           */
          if (req.body.targets === undefined) {
            throw new Error("invalid post, must be targets");
          }

          // 요청된 데이터를 파싱하여 targets 변수에 저장합니다.
          const { targets } = equalJson(req.body);

          // targets가 배열인지 확인합니다. 배열이 아닐 경우 오류를 반환합니다.
          if (!Array.isArray(targets)) {
            throw new Error("invalid post, must be targets");
          }

          // 배열의 요소들이 객체인지 확인합니다. 그렇지 않을 경우 오류를 반환합니다.
          if (targets.some((obj) => { return typeof obj !== "object" })) {
            throw new Error("invalid post, must be targets");
          }

          // 배열의 요소들이 null이 아닌지 확인합니다. null인 요소가 있을 경우 오류를 반환합니다.
          if (targets.some((obj) => { return obj === null })) {
            throw new Error("invalid post, must be targets");
          }
      
          let desid, fileName;
      
          /**
           * @description 각 대상에 대해 반복문을 수행하여 해당 디자이너의 대표 작업물 사진 파일을 삭제합니다.
           */
          for (let obj of targets) {
              if (typeof obj !== "object" || obj === null) {
                throw new Error("invalid post, must be targets");
              }
          
              // 대상 객체에서 디자이너 ID와 파일명을 가져옵니다.
              desid = obj.desid;
              fileName = obj.fileName;
          
              // 디자이너 폴더와 파일이 존재하는 경우, 파일을 삭제합니다.
              if (await fileSystem(`exist`, [ designerRepresentativeFolderConst + "/" + desid ])) {
                if (await fileSystem(`exist`, [ designerRepresentativeFolderConst + "/" + desid + "/" + fileName ])) {
                  await shellExec(`rm`, [ `-rf`, designerRepresentativeFolderConst + "/" + desid + "/" + fileName ]);
                }
              }
          }
      
          // 모든 작업이 완료되면 성공 메시지를 클라이언트에게 응답합니다.
          res.send(JSON.stringify({ message: "done" }));
      
      } catch (e) {
          /**
           * @description 예외 발생 시, 오류를 로깅하고, 오류 메시지를 JSON 형식으로 응답합니다.
           */
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @description 이 라우트는 POST 요청을 처리하여 디자이너의 대표 작업물 파일명을 업데이트합니다.
     * 요청된 대상 목록(targets)을 기반으로 파일명을 변경합니다.
     * @route POST /representativeFileUpdate
     * @param {object} req - 클라이언트 요청 객체, 업데이트할 파일들의 정보(targets)를 포함합니다.
     * @param {object} res - 서버 응답 객체, 처리 결과를 반환합니다.
     */
    router.post([ "/representativeFileUpdate" ], async function (req, res) {
      /**
       * @description 응답 헤더를 설정하여 응답 형식을 JSON으로 지정하고, 
       * 모든 출처에서의 접근을 허용하며, 특정 HTTP 메서드와 헤더를 허용합니다.
       */
      res.set({
          "Content-Type": "application/json", // 응답의 Content-Type을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 지정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 요청 헤더를 지정합니다.
      });

      try {
          /**
           * @description 요청된 데이터에 targets 필드가 포함되어 있는지 확인합니다.
           * 포함되지 않은 경우, "invalid post, must be targets" 오류 메시지를 반환합니다.
           */
          if (req.body.targets === undefined) {
            throw new Error("invalid post, must be targets");
          }

          // 요청된 데이터를 파싱하여 targets 변수에 저장합니다.
          const { targets } = equalJson(req.body);

          // targets가 배열인지 확인합니다. 배열이 아닐 경우 오류를 반환합니다.
          if (!Array.isArray(targets)) {
            throw new Error("invalid post, must be targets");
          }

          // 배열의 요소들이 객체인지 확인합니다. 그렇지 않을 경우 오류를 반환합니다.
          if (targets.some((obj) => { return typeof obj !== "object" })) {
            throw new Error("invalid post, must be targets");
          }

          // 배열의 요소들이 null이 아닌지 확인합니다. null인 요소가 있을 경우 오류를 반환합니다.
          if (targets.some((obj) => { return obj === null })) {
            throw new Error("invalid post, must be targets");
          }

          let key, date, order, hashRaw, pastHash, exe;
          let newFileName;
          let desid, fileName;
          let hash, mode;

          /**
           * @description 각 대상에 대해 반복문을 수행하여 파일명을 업데이트합니다.
           */
          for (let obj of targets) {
            if (typeof obj !== "object" || obj === null) {
              throw new Error("invalid post, must be targets");
            }

            // 대상 객체에서 해시 값, 모드, 디자이너 ID, 파일명을 가져옵니다.
            hash = obj.hash;
            mode = obj.mode;
            desid = obj.desid;
            fileName = obj.fileName;

            // 디자이너 폴더와 파일이 존재하는 경우, 파일명을 업데이트합니다.
            if (await fileSystem(`exist`, [ designerRepresentativeFolderConst + "/" + desid ])) {
              if (await fileSystem(`exist`, [ designerRepresentativeFolderConst + "/" + desid + "/" + fileName ])) {
                [ key, date, order, hashRaw ] = fileName.split("_");
                [ pastHash, exe ] = hashRaw.split(".");
                newFileName = key + "_" + date + "_" + order + "_" + hash + "." + exe;
                if (pastHash !== hash) {
                  await shellExec(`mv`, [ designerRepresentativeFolderConst + "/" + desid + "/" + fileName, designerRepresentativeFolderConst + "/" + desid + "/" + newFileName ]);
                }
              }
            }
          }

          // 모든 작업이 완료되면 성공 메시지를 클라이언트에게 응답합니다.
          res.send(JSON.stringify({ message: "done" }));
        
      } catch (e) {
          /**
           * @description 예외 발생 시, 오류를 로깅하고, 오류 메시지를 JSON 형식으로 응답합니다.
           */
          console.log(e);
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @description 이 라우트는 일반 파일 업로드 요청을 처리합니다. 업로드된 파일을 지정된 경로로 이동시키고, PDF 파일의 경우 JPG로 변환합니다.
     * @route POST /generalFileUpload
     * @param {object} req - 클라이언트 요청 객체, 업로드할 파일 및 대상 경로를 포함합니다.
     * @param {object} res - 서버 응답 객체, 처리 결과를 반환합니다.
     */
    router.post([ "/generalFileUpload" ], async function (req, res) {
      /**
       * @description 응답 헤더를 설정하여 응답 형식을 JSON으로 지정하고, 
       * 모든 출처에서의 접근을 허용하며, 특정 HTTP 메서드와 헤더를 허용합니다.
       */
      res.set({
          "Content-Type": "application/json", // 응답의 Content-Type을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 지정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 요청 헤더를 지정합니다.
      });

      try {
          /**
           * @description formidable 모듈을 사용하여 파일 업로드 처리를 설정합니다. 
           * 최대 파일 크기는 9000MB로 제한됩니다.
           */
          const form = formidable({ multiples: true, encoding: "utf-8", maxFileSize: (9000 * 1024 * 1024) });

          /**
           * @description form.parse 메서드를 사용하여 업로드된 파일과 필드를 파싱합니다.
           * 에러가 발생하면 처리하고, 그렇지 않으면 업로드된 파일을 지정된 경로로 이동시킵니다.
           */
          form.parse(req, async function (err, fields, files) {
            try {
              if (err) {
                // 파일 업로드 중 에러 발생 시 예외 처리
                throw new Error(err);
              } else {
                /**
                 * @description 클라이언트에서 전달된 toArr 필드를 JSON으로 파싱하고, 각 경로를 한글 인코딩을 수정합니다.
                 */
                const toArr = JSON.parse(fields.toArr).map((path) => { return hangul.fixString(path); });

                let filesKey, fromArr, num;
                let tempArr, tempString, tempDir;

                // 업로드된 파일의 키를 가져와서 숫자 순으로 정렬합니다.
                filesKey = Object.keys(files);
                filesKey.sort((a, b) => {
                  return Number(a.replace(/[^0-9]/gi, '')) - Number(b.replace(/[^0-9]/gi, ''));
                });

                fromArr = [];
                // 파일 키를 이용하여 파일 배열을 생성합니다.
                for (let key of filesKey) {
                  fromArr.push(files[key]);
                }

                num = 0;
                // 각 파일에 대해 지정된 경로로 파일을 이동시킵니다.
                for (let { filepath: path } of fromArr) {
                  tempArr = toArr[num].split("/");
                  tempString = staticConst;
                  if (tempArr.length === 0) {
                    throw new Error("invalid to array");
                  }
                  for (let i = 0; i < tempArr.length - 1; i++) {
                    // 현재 경로에 디렉토리가 존재하지 않으면 생성합니다.
                    tempDir = await fileSystem(`readDir`, [ tempString ]);
                    if (!tempDir.includes(tempArr[i]) && tempArr[i] !== "") {
                      await shellExec(`mkdir ${shellLink(tempString + "/" + tempArr[i])}`);
                    }
                    tempString += '/';
                    tempString += tempArr[i];
                  }
                  // 파일을 지정된 경로로 이동시킵니다.
                  await shellExec(`mv ${shellLink(path)} ${shellLink(staticConst + "/" + toArr[num].replace(/^\//i, ''))}`);
                  
                  // 파일이 PDF일 경우 JPG로 변환합니다.
                  if (/\.pdf$/i.test(toArr[num])) {
                    imageReader.pdfToJpg(staticConst + "/" + toArr[num]).catch((err) => { console.log(err); });
                  }
                  num++;
                }

                // 파일 업로드 및 처리가 완료되면 성공 메시지를 반환합니다.
                res.send(JSON.stringify({ "message": "done" }));
              }
            } catch (e) {
              // 파일 업로드 또는 처리 중 예외 발생 시 예외를 로깅하고, 오류 메시지를 반환합니다.
              console.log(e);
              logger.error(e, req).catch((e) => { console.log(e); });
              res.send(JSON.stringify({ message: "error : " + e.message }));    
            }
          });
      } catch (e) {
          // 전반적인 try 블록에서 발생한 예외를 로깅하고, 오류 메시지를 반환합니다.
          console.log(e);
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @description 이 라우트는 클라이언트가 디자이너의 댓글을 파일로 업로드하는 요청을 처리합니다. 
     * 업로드된 파일을 서버에 저장하고, 그 파일 내용을 읽어 프로젝트에 관련된 데이터를 업데이트하며, 
     * 최종적으로 파일을 삭제합니다.
     * @route POST /middleCommentsBinary
     * @param {object} req - 클라이언트 요청 객체, 업로드할 파일 및 프로젝트 관련 정보를 포함합니다.
     * @param {object} res - 서버 응답 객체, 처리 결과를 반환합니다.
     */
    router.post([ "/middleCommentsBinary" ], async function (req, res) {
      /**
       * @description 응답 헤더를 설정하여 응답 형식을 JSON으로 지정하고, 
       * 모든 출처에서의 접근을 허용하며, 특정 HTTP 메서드와 헤더를 허용합니다.
       */
      res.set({
          "Content-Type": "application/json", // 응답의 Content-Type을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 지정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 요청 헤더를 지정합니다.
      });

      try {
          /**
           * @description formidable 모듈을 사용하여 파일 업로드 처리를 설정합니다. 
           * 최대 파일 크기는 9000MB로 제한됩니다.
           */
          const form = formidable({ multiples: true, encoding: "utf-8", maxFileSize: (9000 * 1024 * 1024) });

          /**
           * @description form.parse 메서드를 사용하여 업로드된 파일과 필드를 파싱합니다.
           * 에러가 발생하면 처리하고, 그렇지 않으면 업로드된 파일을 지정된 경로로 이동시킵니다.
           */
          form.parse(req, async function (err, fields, files) {
            try {
              if (!err) {
                /**
                 * @description 요청으로부터 받은 필드를 추출합니다. 
                 * 프로젝트 ID(proid), 디자이너 이름(designer), 클라이언트 이름(client), 
                 * 디자이너 ID(desid), 클라이언트 ID(cliid)를 포함합니다.
                 */
                const { proid, designer, client, desid, cliid } = fields;
                const parentsId = "1YuWV37wnTqe68nYqnn_oyu5j_p6SPuAe"; // Google Drive 부모 폴더 ID
                let execName, file;
                let newFileName;
                let contents;
                let tongContents = []; // 파일 내용을 저장할 배열
                let body;
                let type;

                // 업로드된 파일들을 순회하며 처리합니다.
                for (let key in files) {
                  file = files[key];
                  execName = file.originalFilename.split(".")[file.originalFilename.split(".").length - 1];
                  newFileName = `${folderConst}/${desid}/${proid}/${designer}_${client}_디자이너글_${proid}.${execName}`;

                  // 디자이너 ID 폴더가 존재하지 않으면 생성합니다.
                  if (!(await fileSystem(`exist`, [ `${folderConst}/${desid}` ]))) {
                    await shellExec(`mkdir`, [ `${folderConst}/${desid}` ]);
                  }

                  // 프로젝트 ID 폴더가 존재하지 않으면 생성합니다.
                  if (!(await fileSystem(`exist`, [ `${folderConst}/${desid}/${proid}` ]))) {
                    await shellExec(`mkdir`, [ `${folderConst}/${desid}/${proid}` ]);
                  }

                  // 파일을 지정된 위치로 이동시킵니다.
                  await shellExec(`mv ${shellLink(file.filepath)} ${newFileName};`);

                  // 파일 내용을 읽습니다.
                  contents = await documents.readFile(newFileName);
                  if (contents === null) {
                    tongContents.push(''); // 파일 내용이 비어있으면 빈 문자열을 추가합니다.
                  } else {
                    body = contents.body;
                    type = contents.type;
                    tongContents.push(body); // 파일 내용을 배열에 추가합니다.

                    // 서버에 프로젝트 데이터를 업데이트하고, Google Drive에 파일을 업로드합니다.
                    requestSystem("https://" + address.secondinfo.host + ":3003/projectDesignerRaw", 
                      { mode: "update", proid, cliid, desid, body, type }, 
                      { headers: { "Content-Type": "application/json", "origin": address.secondinfo.host } }
                    ).then(() => {
                      // 파일을 Google Drive에 업로드합니다.
                      return drive.upload_inPython(parentsId, newFileName);
                    }).then(() => {
                      // 파일을 서버에서 삭제합니다.
                      return shellExec(`rm -rf ${newFileName};`);
                    }).catch((err) => {
                      // 오류가 발생하면 로그에 기록합니다.
                      logger.error(e, req).catch((e) => { console.log(e); });
                    });
                  }
                }

                // 모든 파일 처리가 완료된 후, 파일 내용들을 클라이언트에 반환합니다.
                res.send(JSON.stringify(tongContents));

              } else {
                // 파일 업로드 중 에러 발생 시 예외 처리
                logger.error(e, req).catch((e) => { console.log(e); });
                res.send(JSON.stringify({ message: "error : " + e.message }));
              }
            } catch (e) {
              // 파일 처리 중 예외 발생 시 예외를 로깅하고, 오류 메시지를 반환합니다.
              logger.error(e, req).catch((e) => { console.log(e); });
              res.send(JSON.stringify({ message: "error : " + e.message }));
            }
          });
      } catch (e) {
          // 전반적인 try 블록에서 발생한 예외를 로깅하고, 오류 메시지를 반환합니다.
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @description 이 라우트는 중간 사진 알림을 처리하는 엔드포인트입니다. 
     * 디자이너나 클라이언트가 콘솔을 통해 사진 파일을 업로드할 때, 이를 알리는 메시지를 특정 채널로 전송합니다.
     * @route POST /middlePhotoAlarm
     * @param {object} req - 클라이언트 요청 객체, 업로드된 파일과 관련된 정보를 포함합니다.
     * @param {object} res - 서버 응답 객체, 처리 결과를 반환합니다.
     */
    router.post([ "/middlePhotoAlarm" ], async function (req, res) {
      /**
       * @description 응답 헤더를 설정하여 응답 형식을 JSON으로 지정하고, 
       * 모든 출처에서의 접근을 허용하며, 특정 HTTP 메서드와 헤더를 허용합니다.
       */
      res.set({
          "Content-Type": "application/json", // 응답의 Content-Type을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 지정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 요청 헤더를 지정합니다.
      });

      try {
          /**
           * @description 요청 본문에서 필수 필드(designer, client, desid, proid, title, mode)가 누락되었는지 확인합니다. 
           * 누락된 경우, 예외를 발생시킵니다.
           */
          if (req.body.designer === undefined || req.body.client === undefined || req.body.desid === undefined || req.body.proid === undefined || req.body.title === undefined || req.body.mode === undefined) {
              throw new Error("invalid post"); // 필수 필드 중 하나라도 누락된 경우 오류를 발생시킵니다.
          }

          /**
           * @description 요청 본문에서 필요한 데이터를 추출하여 변수에 할당합니다.
           * equalJson 함수는 req.body에서 데이터를 구조화하여 반환합니다.
           */
          const { designer, client, desid, proid, title, mode } = equalJson(req.body);
          
          // 메시지를 전송할 채널을 지정합니다.
          const channel = "#301_console";
          // 음성 알림을 사용할지 여부를 설정합니다. 여기서는 사용하지 않습니다.
          const voice = false;
          let text; // 전송할 메시지 내용을 저장할 변수입니다.

          /**
           * @description mode 값에 따라 메시지 내용을 다르게 설정합니다.
           * 디자이너가 업로드한 경우와 클라이언트가 업로드한 경우로 나뉩니다.
           */
          if (mode === "designer") {
              // 디자이너가 파일을 업로드한 경우
              text = designer + " 실장님이 콘솔을 통해 " + client + " 고객님 " + title + " 파일을 업로드했습니다!";
          } else {
              // 클라이언트가 파일을 업로드한 경우
              text = client + " 고객님이 콘솔을 통해 " + title + " 파일을 업로드했습니다!";
          }
          text += "\n"; // 메시지 끝에 줄 바꿈을 추가합니다.

          /**
           * @description 메시지를 전송합니다. messageSend 함수는 주어진 채널로 메시지를 전송합니다.
           */
          await messageSend({ text, channel, voice });

          // 클라이언트에 성공 메시지를 반환합니다.
          res.send(JSON.stringify({ message: "done" }));
      } catch (e) {
          // 예외가 발생한 경우, 예외를 로그에 기록하고 오류 메시지를 클라이언트에 반환합니다.
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @description 이 라우트는 계약서 목록을 반환하거나 특정 프로젝트 ID로 검색하는 기능을 제공합니다.
     * @route POST /contractList
     * @param {object} req - 클라이언트 요청 객체. 검색 모드에서는 특정 프로젝트 ID를 포함할 수 있습니다.
     * @param {object} res - 서버 응답 객체. 요청된 계약서 목록 또는 특정 계약서를 반환합니다.
     */
    router.post([ "/contractList" ], async function (req, res) {
      /**
       * @description 응답 헤더를 설정하여 응답 형식을 JSON으로 지정하고, 
       * 모든 출처에서의 접근을 허용하며, 특정 HTTP 메서드와 헤더를 허용합니다.
       */
      res.set({
          "Content-Type": "application/json", // 응답의 Content-Type을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 지정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 요청 헤더를 지정합니다.
      });

      try {
          const splitToken = "__split__"; // 파일명에서 데이터를 분리하기 위한 구분자입니다.
          
          // contractConst 디렉토리 내의 파일 목록을 읽어옵니다.
          const rawList = await fileSystem("readDir", [ contractConst ]);

          let result; // 최종 결과를 저장할 변수입니다.
      
          /**
           * @description 읽어온 파일 목록에서 숨김 파일을 제외한 후, 각 파일명을 파싱하여 
           * 프로젝트 ID, 클라이언트 ID, 요청 번호, 파일 ID, 다운로드 링크 등을 포함하는 객체로 변환합니다.
           */
          result = rawList.filter((str) => { 
              return !/^\./.test(str); // 숨김 파일을 필터링합니다.
          }).map((rawString) => {
              // 파일명을 splitToken으로 분리하여 필요한 정보를 추출합니다.
              const [ proid, cliid, requestNumberString, idFileExe ] = rawString.split(splitToken);
              // 파일의 ID와 확장자를 분리합니다.
              const [ id, zip ] = idFileExe.split(".");
              return {
                  proid, // 프로젝트 ID
                  cliid, // 클라이언트 ID
                  requestNumber: Number(requestNumberString), // 요청 번호를 숫자로 변환합니다.
                  id, // 파일의 ID
                  fileName: rawString, // 원본 파일명
                  downloadLink: "https://" + address.secondinfo.host + contractLinkConst + "/" + rawString, // 다운로드 링크 생성
              }
          });
      
          /**
           * @description 요청이 검색 모드인 경우, 전달된 프로젝트 ID와 일치하는 계약서만 필터링합니다.
           * 일치하는 계약서가 없으면 null을 반환합니다.
           */
          if (req.body.mode === "search" && typeof req.body.proid === "string") {
              // 특정 프로젝트 ID로 필터링합니다.
              result = result.filter((obj) => { return obj.proid === req.body.proid });
              if (result.length > 0) {
                  result = { contract: result[0] }; // 일치하는 첫 번째 계약서를 반환합니다.
              } else {
                  result = { contract: null }; // 일치하는 계약서가 없는 경우 null을 반환합니다.
              }
          }
      
          // 최종 결과를 클라이언트에 JSON 형식으로 반환합니다.
          res.send(JSON.stringify(result));
      
      } catch (e) {
          // 예외가 발생한 경우, 예외를 로그에 기록하고 오류 메시지를 클라이언트에 반환합니다.
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @description 이 라우트는 이미지를 업로드하여 분석하고, 분석 결과를 JSON 형식으로 반환하는 기능을 제공합니다.
     * @route POST /imageAnalytics
     * @param {object} req - 클라이언트 요청 객체, 이미지 파일과 이미지 형식을 포함합니다.
     * @param {object} res - 서버 응답 객체, 이미지 분석 결과를 반환합니다.
     */
    router.post([ "/imageAnalytics" ], async function (req, res) {
      /**
       * @description 응답 헤더를 설정하여 응답 형식을 JSON으로 지정하고,
       * 모든 출처에서의 접근을 허용하며, 특정 HTTP 메서드와 헤더를 허용합니다.
       */
      res.set({
          "Content-Type": "application/json", // 응답의 Content-Type을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 지정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 요청 헤더를 지정합니다.
      });

      try {
          // formidable 패키지를 사용하여 파일 업로드를 처리합니다.
          const form = formidable({ multiples: true, encoding: "utf-8", maxFileSize: (9000 * 1024 * 1024) });

          // 업로드된 파일을 파싱합니다.
          form.parse(req, async function (err, fields, files) {
              try {
                  // 파일 파싱 도중 에러가 발생하면 예외를 던집니다.
                  if (err) {
                      throw new Error(err);
                  } else {
                      // fields 객체에서 이미지 파일의 확장자를 가져옵니다.
                      const { exe } = fields;

                      let filesKey, fromArr;
                      let thisFileName;
                      let imageJson;

                      // 고유한 파일명을 생성합니다.
                      thisFileName = "file_" + uniqueValue("hex") + "." + exe;

                      // 업로드된 파일의 키를 가져옵니다.
                      filesKey = Object.keys(files);

                      // 하나의 이미지 파일만 허용됩니다.
                      if (filesKey.length !== 1) {
                          throw new Error("only one image must");
                      }

                      fromArr = [];
                      for (let key of filesKey) {
                          // 업로드된 파일을 fromArr 배열에 추가합니다.
                          fromArr.push(files[key]);
                      }

                      // 업로드된 파일을 지정된 경로로 이동시킵니다.
                      for (let { filepath: path } of fromArr) {
                          await shellExec(`mv ${shellLink(path)} ${shellLink(tempConst + "/" + thisFileName)}`);
                      }

                      // 이미지 분석을 위해 imageReader 모듈을 사용하여 이미지를 읽어들입니다.
                      imageJson = await imageReader.readImage(tempConst + "/" + thisFileName);

                      // 임시 파일을 삭제합니다.
                      await shellExec(`rm -rf ${shellLink(tempConst + "/" + thisFileName)}`);

                      // 이미지 분석 결과를 JSON 형식으로 응답합니다.
                      res.send(JSON.stringify(imageJson));
                  }
              } catch (e) {
                  // 예외가 발생한 경우 콘솔에 로그를 기록하고, 오류 메시지를 클라이언트에 반환합니다.
                  console.log(e);
              }
          });
      } catch (e) {
          // 전체 프로세스 중 예외가 발생하면 예외를 로그에 기록하고, 오류 메시지를 클라이언트에 반환합니다.
          console.log(e);
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @description 디자이너의 프로필 사진을 업로드하고, 업로드된 사진에 대한 정보를 반환하는 라우트입니다.
     * @route POST /designerProfilePhoto
     * @param {object} req - 클라이언트 요청 객체, 프로필 사진 파일과 메타데이터를 포함합니다.
     * @param {object} res - 서버 응답 객체, 업로드된 사진의 정보를 JSON 형식으로 반환합니다.
     */
    router.post([ "/designerProfilePhoto" ], async function (req, res) {
      /**
       * @description 응답 헤더를 설정하여 응답 형식을 JSON으로 지정하고,
       * 모든 출처에서의 접근을 허용하며, 특정 HTTP 메서드와 헤더를 허용합니다.
       */
      res.set({
          "Content-Type": "application/json", // 응답의 Content-Type을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 지정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 요청 헤더를 지정합니다.
      });

      try {
          // formidable 패키지를 사용하여 파일 업로드를 처리합니다.
          const form = formidable({ multiples: true, encoding: "utf-8", maxFileSize: (9000 * 1024 * 1024) });

          // 업로드된 파일을 파싱합니다.
          form.parse(req, async function (err, fields, files) {
              try {
                  // 파일 파싱 도중 에러가 발생하면 예외를 던집니다.
                  if (err) {
                      throw new Error(err);
                  } else {
                      // 파일 이름과 경로 설정을 위한 변수 선언
                      const token = "__split__"; // 파일명 구분자
                      const now = new Date(); // 현재 시간
                      const { desid, gs, exe } = fields; // 클라이언트가 보낸 필드 값
                      const longConst = 1500; // 이미지 크기 조정을 위한 상수 값
                      const idConst = "profile_"; // 프로필 아이디에 사용되는 접두사
                      const xPositionConst = 50; // 이미지의 X 좌표
                      const yPositionConst = 50; // 이미지의 Y 좌표
                      const sizeConst = 102; // 이미지의 크기
                      let filesKey, fromArr;
                      let thisFileName;
                      let imageJson;
                      let thisLinkPath;
                      let thisLink;
                      let resultObj;
                      let id;

                      // 파일의 고유 ID 생성
                      id = (idConst + uniqueValue("hex"));

                      // 최종 파일명 생성
                      thisFileName = desid + token + gs + token + String(now.valueOf()) + token + String(xPositionConst) + token + String(yPositionConst) + token + String(sizeConst) + token + id + "." + exe;

                      // 업로드된 파일의 키를 가져옵니다.
                      filesKey = Object.keys(files);

                      // 하나의 이미지 파일만 허용됩니다.
                      if (filesKey.length !== 1) {
                          throw new Error("only one image must");
                      }

                      fromArr = [];
                      for (let key of filesKey) {
                          // 업로드된 파일을 fromArr 배열에 추가합니다.
                          fromArr.push(files[key]);
                      }

                      // 업로드된 파일을 지정된 경로로 이동시킵니다.
                      for (let { filepath: path } of fromArr) {
                          await shellExec(`mv ${shellLink(path)} ${shellLink(designerProfileConst + "/" + thisFileName)}`);
                      }

                      // 이미지의 크기를 조정합니다. 
                      // 'gs' 값에 따라 이미지의 크기 조정이 다르게 이루어집니다.
                      if (gs === "g") {
                          await imageReader.resizeImage(designerProfileConst + "/" + thisFileName, longConst, null);
                      } else {
                          await imageReader.resizeImage(designerProfileConst + "/" + thisFileName, null, longConst);
                      }

                      // 업로드된 파일의 경로를 처리하여 링크로 변환합니다.
                      thisLinkPath = String(designerProfileConst + "/" + thisFileName).replace(new RegExp("^" + staticConst, "g"), "");
                      thisLink = linkToString("https://" + address.secondinfo.host + thisLinkPath);

                      // 최종적으로 클라이언트에게 반환할 결과 객체를 생성합니다.
                      resultObj = {
                          id, // 파일 ID
                          desid, // 디자이너 ID
                          gs, // 이미지의 GS 값
                          date: now, // 파일 업로드 시간
                          link: thisLink, // 파일의 링크
                          file: {
                              exe, // 파일 확장자
                              name: designerProfileConst + "/" + thisFileName, // 파일 경로
                          },
                          position: {
                              x: Number(xPositionConst), // X 좌표
                              y: Number(yPositionConst), // Y 좌표
                          },
                          size: Number(sizeConst), // 이미지 크기
                      };

                      // JSON 형식으로 결과 객체를 반환합니다.
                      res.send(JSON.stringify(resultObj));
                  }
              } catch (e) {
                  // 예외가 발생한 경우 콘솔에 로그를 기록하고, 오류 메시지를 클라이언트에 반환합니다.
                  console.log(e);
              }
          });
      } catch (e) {
          // 전체 프로세스 중 예외가 발생하면 예외를 로그에 기록하고, 오류 메시지를 클라이언트에 반환합니다.
          console.log(e);
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @description 디자이너 프로필 사진 목록을 가져오는 라우터입니다.
     * @route POST /designerProfileList
     * @param {object} req - 클라이언트 요청 객체, mode 및 desid 등을 포함합니다.
     * @param {object} res - 서버 응답 객체, 프로필 사진 목록을 JSON 형식으로 반환합니다.
     */
    router.post([ "/designerProfileList" ], async function (req, res) {
      // 응답 헤더를 설정하여 응답 형식을 JSON으로 지정하고, 모든 출처에서의 접근을 허용하며, 특정 HTTP 메서드와 헤더를 허용합니다.
      res.set({
        "Content-Type": "application/json", // 응답의 Content-Type을 JSON으로 설정합니다.
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 지정합니다.
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 요청 헤더를 지정합니다.
      });

      try {
        const splitToken = "__split__"; // 파일명 구분자 설정
        const rawList = await fileSystem("readDir", [ designerProfileConst ]); // 디자이너 프로필 사진 폴더 내의 파일 목록을 읽습니다.
        let result;
        let mode;

        // 요청에서 mode 값이 없으면 기본적으로 'pick' 모드를 설정합니다.
        if (req.body.mode === undefined) {
          mode = "pick";
        } else {
          mode = req.body.mode;
        }

        // 읽어온 파일 목록을 파싱하여 필요한 정보로 변환합니다.
        result = rawList.filter((str) => { 
          return !/^\./.test(str); // 숨김 파일(.으로 시작하는 파일)은 제외합니다.
        }).map((rawString) => {
          // 파일명을 구분자(splitToken)로 분할하여 필요한 정보를 추출합니다.
          const [ desid, gs, timeNumber, xPosition, yPosition, size, uniqueExe ] = rawString.split(splitToken);
          const [ id, exe ] = uniqueExe.split(".");
          
          return {
            id, // 파일 고유 ID
            desid, // 디자이너 ID
            gs, // 이미지의 gs 값 (세로, 가로 구분)
            date: new Date(Number(timeNumber)), // 파일 생성 시간
            link: linkToString("https://" + address.secondinfo.host + String(designerProfileConst + "/" + rawString).replace(new RegExp("^" + staticConst, "g"), "")), // 파일 링크
            file: {
              exe, // 파일 확장자
              name: rawString, // 파일 이름
            },
            position: {
              x: Number(xPosition), // 이미지의 X 좌표
              y: Number(yPosition), // 이미지의 Y 좌표
            },
            size: Number(size), // 이미지 크기
          }
        });

        // 'pick' 모드일 경우, 특정 디자이너의 프로필 사진만 필터링하여 반환합니다.
        if (mode === "pick") {
          const { desid } = req.body;
          result = result.filter((obj) => { return obj.desid === desid }); // desid 값에 따라 필터링
          result.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() }); // 최신 파일이 먼저 오도록 정렬
          res.send(JSON.stringify(result)); // 필터링된 결과를 반환합니다.
        } 
        // 'entire' 또는 'list' 모드일 경우, 모든 프로필 사진을 반환하거나, 특정 desid 배열에 포함된 사진만 필터링하여 반환합니다.
        else if (mode === "entire" || mode === "list") {

          // 특정 desid 배열로 필터링할 경우
          if (req.body.desidArr !== undefined) {
            const { desidArr } = equalJson(req.body);
            result = result.filter((o) => {
              return desidArr.includes(o.desid); // desid 배열에 포함된 항목만 필터링
            });
          }
          res.send(JSON.stringify(result)); // 필터링된 결과를 반환합니다.

        } 
        // 유효하지 않은 mode 값이 전달된 경우, 오류를 발생시킵니다.
        else {
          throw new Error("invalid mode");
        }

      } catch (e) {
        // 예외가 발생한 경우, 로그를 기록하고 클라이언트에 오류 메시지를 반환합니다.
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @description 디자이너 프로필 사진의 위치를 업데이트하는 라우터입니다.
     * @route POST /designerProfileUpdate
     * @param {object} req - 클라이언트 요청 객체, desid, id, mode, position 등을 포함합니다.
     * @param {object} res - 서버 응답 객체, 작업 결과 메시지를 반환합니다.
     */
    router.post([ "/designerProfileUpdate" ], async function (req, res) {
      // 응답 헤더를 설정하여 응답 형식을 JSON으로 지정하고, 모든 출처에서의 접근을 허용하며, 특정 HTTP 메서드와 헤더를 허용합니다.
      res.set({
        "Content-Type": "application/json", // 응답의 Content-Type을 JSON으로 설정합니다.
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 지정합니다.
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 요청 헤더를 지정합니다.
      });

      try {
        // 필수 파라미터가 요청에 포함되지 않은 경우 예외를 발생시킵니다.
        if (req.body.desid === undefined || req.body.id === undefined || req.body.mode === undefined) {
          throw new Error("invalid post");
        }
        
        const { desid, id, mode } = req.body; // 요청에서 desid, id, mode 값을 추출합니다.
        const splitToken = "__split__"; // 파일명 구분자 설정
        const rawList = await fileSystem("readDir", [ designerProfileConst ]); // 디자이너 프로필 사진 폴더 내의 파일 목록을 읽습니다.
        let targetList;
        let target;
        let newName;

        // 파일 목록을 파싱하여 필요한 정보를 추출하고, desid로 필터링합니다.
        targetList = rawList.filter((str) => { 
          return !/^\./.test(str); // 숨김 파일(.으로 시작하는 파일)은 제외합니다.
        }).map((rawString) => {
          // 파일명을 구분자(splitToken)로 분할하여 필요한 정보를 추출합니다.
          const [ desid, gs, timeNumber, xPosition, yPosition, size, uniqueExe ] = rawString.split(splitToken);
          const [ id, exe ] = uniqueExe.split(".");
          
          return {
            id, // 파일 고유 ID
            desid, // 디자이너 ID
            gs, // 이미지의 gs 값 (세로, 가로 구분)
            date: new Date(Number(timeNumber)), // 파일 생성 시간
            link: linkToString("https://" + address.secondinfo.host + String(designerProfileConst + "/" + rawString).replace(new RegExp("^" + staticConst, "g"), "")), // 파일 링크
            file: {
              exe, // 파일 확장자
              name: rawString, // 파일 이름
            },
            position: {
              x: Number(xPosition), // 이미지의 X 좌표
              y: Number(yPosition), // 이미지의 Y 좌표
            },
            size: Number(size), // 이미지 크기
          }
        });

        // 특정 desid에 해당하는 프로필 목록을 필터링하고, ID에 해당하는 타겟을 찾습니다.
        targetList = targetList.filter((obj) => { return obj.desid === desid });
        target = targetList.find((obj) => { return obj.id === id });
        if (target === undefined) {
          throw new Error("There is no target"); // 대상이 없는 경우 예외를 발생시킵니다.
        }

        // mode가 'position'인 경우, 위치를 업데이트합니다.
        if (mode === "position") {
          const { x, y } = equalJson(req.body.position); // 새로운 위치 좌표를 요청에서 추출합니다.
          // 새로운 파일명을 생성합니다.
          newName = desid + splitToken + target.gs + splitToken + String(target.date.valueOf()) + splitToken + String(x) + splitToken + String(y) + splitToken + String(target.size) + splitToken + target.id + "." + target.file.exe;
          
          // 파일명이 변경된 경우, 파일을 이동시킵니다.
          if (newName !== target.file.name) {
            await shellExec("mv", [ designerProfileConst + "/" + target.file.name, designerProfileConst + "/" + newName ]);
          }
        }

        // 작업 완료 메시지를 클라이언트에 반환합니다.
        res.send(JSON.stringify({ message: "done" }));

      } catch (e) {
        // 예외가 발생한 경우, 로그를 기록하고 클라이언트에 오류 메시지를 반환합니다.
        console.log(e);
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @description 디자이너 작업물 사진을 업로드하고, 파일 정보를 반환하는 라우터입니다.
     * @route POST /designerWorksPhoto
     * @param {object} req - 클라이언트 요청 객체, desid, gs, exe, index 등을 포함합니다.
     * @param {object} res - 서버 응답 객체, 작업 결과 메시지와 업로드된 파일 정보를 반환합니다.
     */
    router.post([ "/designerWorksPhoto" ], async function (req, res) {
      // 응답 헤더를 설정하여 응답 형식을 JSON으로 지정하고, 모든 출처에서의 접근을 허용하며, 특정 HTTP 메서드와 헤더를 허용합니다.
      res.set({
          "Content-Type": "application/json", // 응답의 Content-Type을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 지정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 요청 헤더를 지정합니다.
      });

      try {
          // formidable을 사용하여 폼 데이터를 파싱합니다. 여러 파일을 업로드할 수 있으며, 인코딩과 최대 파일 크기를 설정합니다.
          const form = formidable({ multiples: true, encoding: "utf-8", maxFileSize: (9000 * 1024 * 1024) });
          form.parse(req, async function (err, fields, files) {
              try {
                  // 폼 파싱 중 오류가 발생하면 예외를 던집니다.
                  if (err) {
                      throw new Error(err);
                  } else {
                      const token = "__split__"; // 파일명 구분자
                      const now = new Date(); // 현재 시간을 생성합니다.
                      const { desid, gs, exe, index } = fields; // 요청 필드에서 desid, gs, exe, index를 추출합니다.
                      const longConst = 1920; // 이미지 리사이즈 시 길이 기준 설정값
                      const idConst = "works" + String(index) + "_"; // 파일 ID 생성 규칙
                      const xPositionConst = 50; // X 좌표 기본값
                      const yPositionConst = 50; // Y 좌표 기본값
                      const sizeConst = 102; // 이미지 사이즈 기본값
                      let filesKey, fromArr;
                      let thisFileName;
                      let imageJson;
                      let thisLinkPath;
                      let thisLink;
                      let resultObj;
                      let id;
                      let targetFolder;
      
                      // 고유 ID를 생성하고 파일명을 설정합니다.
                      id = (idConst + uniqueValue("hex"));
                      thisFileName = desid + token + gs + token + String(now.valueOf()) + token + String(xPositionConst) + token + String(yPositionConst) + token + String(sizeConst) + token + id + "." + exe;
                      targetFolder = designerWorksConst + "/" + designerWorksConstFactors[Number(index)]; // 타겟 폴더 경로 설정
      
                      // 업로드된 파일의 키를 가져오고, 파일이 하나가 아닌 경우 예외를 던집니다.
                      filesKey = Object.keys(files);
                      if (filesKey.length !== 1) {
                          throw new Error("only one image must");
                      }
      
                      fromArr = [];
                      // 파일을 배열로 변환하여 저장합니다.
                      for (let key of filesKey) {
                          fromArr.push(files[key]);
                      }
      
                      // 파일을 지정된 경로로 이동시킵니다.
                      for (let { filepath: path } of fromArr) {
                          await shellExec(`mv ${shellLink(path)} ${shellLink(targetFolder + "/" + thisFileName)}`);
                      }
      
                      // gs 값에 따라 이미지의 크기를 조정합니다.
                      if (gs === "g") {
                          await imageReader.resizeImage(targetFolder + "/" + thisFileName, longConst, null);
                      } else {
                          await imageReader.resizeImage(targetFolder + "/" + thisFileName, null, longConst);
                      }
      
                      // 링크 경로를 생성하고, 결과 객체를 생성합니다.
                      thisLinkPath = String(targetFolder + "/" + thisFileName).replace(new RegExp("^" + staticConst, "g"), "");
                      thisLink = linkToString("https://" + address.secondinfo.host + thisLinkPath);
                      resultObj = {
                          id, // 파일 고유 ID
                          desid, // 디자이너 ID
                          gs, // 이미지의 gs 값 (세로, 가로 구분)
                          date: now, // 현재 시간
                          link: thisLink, // 파일 링크
                          file: {
                              exe, // 파일 확장자
                              name: targetFolder + "/" + thisFileName, // 파일 이름
                          },
                          position: {
                              x: Number(xPositionConst), // 이미지의 X 좌표
                              y: Number(yPositionConst), // 이미지의 Y 좌표
                          },
                          size: Number(sizeConst), // 이미지 크기
                      };
      
                      // 결과 객체를 클라이언트에 JSON 형식으로 반환합니다.
                      res.send(JSON.stringify(resultObj));
                  }
              } catch (e) {
                  console.log(e);
              }
          });
      } catch (e) {
          console.log(e);
          // 오류가 발생한 경우 로그를 기록하고 클라이언트에 오류 메시지를 반환합니다.
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @description 디자이너의 작업물 리스트를 가져오는 라우터입니다.
     * @route POST /designerWorksList
     * @param {object} req - 클라이언트 요청 객체, desid 및 mode 등을 포함합니다.
     * @param {object} res - 서버 응답 객체, 요청된 모드에 따라 필터링된 작업물 리스트를 반환합니다.
     */
    router.post([ "/designerWorksList" ], async function (req, res) {
      // 응답 헤더를 설정하여 응답 형식을 JSON으로 지정하고, 모든 출처에서의 접근을 허용하며, 특정 HTTP 메서드와 헤더를 허용합니다.
      res.set({
          "Content-Type": "application/json", // 응답의 Content-Type을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 지정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 요청 헤더를 지정합니다.
      });

      try {
          // 파일명 구분자로 사용될 문자열 상수
          const splitToken = "__split__";

          // 각 작업물 폴더에서 파일 목록을 읽어옵니다.
          const rawList0 = await fileSystem("readDir", [ designerWorksConst + "/" + designerWorksConstFactors[0] ]);
          const rawList1 = await fileSystem("readDir", [ designerWorksConst + "/" + designerWorksConstFactors[1] ]);
          const rawList2 = await fileSystem("readDir", [ designerWorksConst + "/" + designerWorksConstFactors[2] ]);
          const rawList3 = await fileSystem("readDir", [ designerWorksConst + "/" + designerWorksConstFactors[3] ]);

          let result0, result1, result2, result3;
          let filterFunction;
          let mapFunction;
          let mode;

          // 요청된 모드가 없으면 기본 모드를 "pick"으로 설정합니다.
          if (req.body.mode === undefined) {
              mode = "pick";
          } else {
              mode = req.body.mode;
          }

          // 파일 목록에서 숨김 파일(점(.)으로 시작하는 파일)을 제외하는 필터링 함수
          filterFunction = (str) => { return !/^\./.test(str) };

          // 파일명을 파싱하여 객체로 변환하는 맵핑 함수, 인덱스를 통해 폴더를 구분합니다.
          mapFunction = (index) => {
              return (rawString) => {
                  // 파일명을 구성하는 정보를 분리합니다.
                  const [ desid, gs, timeNumber, xPosition, yPosition, size, uniqueExe ] = rawString.split(splitToken);
                  const [ id, exe ] = uniqueExe.split(".");

                  // 각 정보를 사용하여 결과 객체를 생성합니다.
                  return {
                      id, // 고유 ID
                      desid, // 디자이너 ID
                      gs, // 이미지의 gs 값 (세로, 가로 구분)
                      date: new Date(Number(timeNumber)), // 날짜 정보
                      link: linkToString("https://" + address.secondinfo.host + String(designerWorksConst + "/" + designerWorksConstFactors[index] + "/" + rawString).replace(new RegExp("^" + staticConst, "g"), "")), // 파일 링크
                      file: {
                          exe, // 파일 확장자
                          name: rawString, // 파일명
                      },
                      position: {
                          x: Number(xPosition), // 이미지의 X 좌표
                          y: Number(yPosition), // 이미지의 Y 좌표
                      },
                      size: Number(size), // 이미지 크기
                  }
              };
          }

          // 각 폴더에서 읽어온 파일 목록을 필터링하고 객체로 변환합니다.
          result0 = rawList0.filter(filterFunction).map(mapFunction(0));
          result1 = rawList1.filter(filterFunction).map(mapFunction(1));
          result2 = rawList2.filter(filterFunction).map(mapFunction(2));
          result3 = rawList3.filter(filterFunction).map(mapFunction(3));

          // 요청된 모드가 "pick"인 경우 특정 디자이너의 작업물만 필터링하고, 날짜순으로 정렬하여 반환합니다.
          if (mode === "pick") {
              const { desid } = req.body;

              // 디자이너 ID로 작업물을 필터링하고, 최신순으로 정렬합니다.
              result0 = result0.filter((obj) => { return obj.desid === desid });
              result0.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });

              result1 = result1.filter((obj) => { return obj.desid === desid });
              result1.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });

              result2 = result2.filter((obj) => { return obj.desid === desid });
              result2.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });

              result3 = result3.filter((obj) => { return obj.desid === desid });
              result3.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });

              // 필터링된 결과를 JSON으로 반환합니다.
              res.send(JSON.stringify([ result0, result1, result2, result3 ]));

          // 요청된 모드가 "entire" 또는 "list"인 경우 모든 작업물을 반환합니다.
          } else if (mode === "entire" || mode === "list") {
              res.send(JSON.stringify([ result0, result1, result2, result3, [ staticConst, designerWorksConst, designerWorksConstFactors ] ]));

          // 유효하지 않은 모드가 요청된 경우 예외를 던집니다.
          } else {
              throw new Error("invalid mode");
          }

      } catch (e) {
          // 오류가 발생한 경우 로그를 기록하고 클라이언트에 오류 메시지를 반환합니다.
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @description 디자이너의 대표 포트폴리오 사진을 관리하는 라우터입니다.
     * @route POST /designerRepresentativePhotos
     * @param {object} req - 클라이언트 요청 객체, mode 및 기타 데이터를 포함합니다.
     * @param {object} res - 서버 응답 객체, 요청된 작업에 대한 결과를 반환합니다.
     */
    router.post([ "/designerRepresentativePhotos" ], async function (req, res) {
      // 응답 헤더를 설정하여 응답 형식을 JSON으로 지정하고, 모든 출처에서의 접근을 허용하며, 특정 HTTP 메서드와 헤더를 허용합니다.
      res.set({
          "Content-Type": "application/json", // 응답의 Content-Type을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 지정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 요청 헤더를 지정합니다.
      });

      try {
          // 요청 객체에서 mode 값이 없으면 오류를 발생시킵니다.
          if (req.body.mode === undefined) {
              throw new Error("invalid post");
          }
          
          // mode 값을 추출합니다.
          const { mode } = req.body;
          // MongoDB에 접근하기 위한 객체와 컬렉션 이름을 정의합니다.
          const selfMongo = mongo;
          const collection = "designerRepresentativePhotos";
          // 포지션 배열의 길이를 정의합니다.
          const positionLength = 5;
          let rows;
          let jsonModel;
          let targetData;
          let whereQuery;

          // mode가 "save"인 경우, 사진 경로를 저장하는 작업을 수행합니다.
          if (mode === "save") {
              // 요청 객체에서 desid, position, path 값을 추출합니다.
              const { desid, position: positionRaw, path: pathRaw } = equalJson(req.body);
              const position = Number(positionRaw);

              // desid에 해당하는 문서를 조회합니다.
              rows = await back.mongoRead(collection, { desid: desid }, { selfMongo });
              // 해당 desid로 문서가 없을 경우, 새로운 문서를 생성하여 저장합니다.
              if (rows.length === 0) {
                  jsonModel = {
                      date: new Date(), // 현재 날짜를 기록합니다.
                      desid, // 디자이너 ID
                      position: (new Array(positionLength)).fill(0, 0), // 포지션 배열을 초기화합니다.
                  }
                  // 유효한 포지션 값인지 확인합니다.
                  if (jsonModel.position[position] === undefined) {
                      throw new Error("invalid position");
                  }
                  // 포지션에 사진 경로를 저장합니다.
                  jsonModel.position[position] = pathRaw;
                  // MongoDB에 문서를 생성합니다.
                  await back.mongoCreate(collection, objectDeepCopy(jsonModel), { selfMongo });

              // 문서가 존재할 경우, 해당 문서를 업데이트합니다.
              } else {
                  [ jsonModel ] = rows;
                  // 만약 포지션 배열이 올바르지 않으면, 문서를 삭제하고 새로 생성합니다.
                  if (!Array.isArray(jsonModel.position)) {
                      await back.mongoDelete(collection, { desid }, { selfMongo });
                      jsonModel = {
                          date: new Date(),
                          desid,
                          position: (new Array(positionLength)).fill(0, 0),
                      }
                      if (jsonModel.position[position] === undefined) {
                          throw new Error("invalid position");
                      }
                      jsonModel.position[position] = pathRaw;
                      await back.mongoCreate(collection, objectDeepCopy(jsonModel), { selfMongo });
                  } else {
                      if (jsonModel.position[position] === undefined) {
                          throw new Error("invalid position");
                      }
                      jsonModel.position[position] = pathRaw;
                      await back.mongoUpdate(collection, [ { desid }, { "date": new Date(), "position": objectDeepCopy(jsonModel.position) } ], { selfMongo });
                  }
              }

              res.send(JSON.stringify({ message: "done" }));

          // mode가 "proposal"인 경우, 특정 desid 목록에 해당하는 문서들을 조회합니다.
          } else if (mode === "proposal") {
              const { desidArr } = equalJson(req.body);
              whereQuery = {};
              whereQuery["$or"] = [];
              // desid 배열의 각 항목에 대해 OR 조건을 생성합니다.
              for (let thisDesid of desidArr) {
                  whereQuery["$or"].push({ desid: thisDesid });
              }
              // MongoDB에서 문서들을 조회합니다.
              rows = await back.mongoRead(collection, whereQuery, { selfMongo });
              res.send(JSON.stringify({ data: rows }));

          // mode가 "get"인 경우, 특정 desid에 해당하는 문서를 조회합니다.
          } else if (mode === "get") {
              const { desid } = equalJson(req.body);
              // desid에 해당하는 문서를 조회합니다.
              rows = await back.mongoRead(collection, { desid: desid }, { selfMongo });
              if (rows.length === 0) {
                  // 문서가 없을 경우, 새로운 문서를 생성합니다.
                  jsonModel = {
                      date: new Date(),
                      desid,
                      position: (new Array(positionLength)).fill(0, 0),
                  }
                  await back.mongoCreate(collection, objectDeepCopy(jsonModel), { selfMongo });
                  res.send(JSON.stringify({ data: jsonModel }));
              } else {
                  [ targetData ] = rows;
                  res.send(JSON.stringify({ data: targetData }));
              }

          // mode가 유효하지 않은 경우 오류를 발생시킵니다.
          } else {
              throw new Error("invalid post");
          }

      } catch (e) {
          // 오류가 발생한 경우 로그를 기록하고 클라이언트에 오류 메시지를 반환합니다.
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @description 디자이너의 대표 포트폴리오 사진을 관리하는 라우터입니다. 이 라우터는 특정 설정을 저장하고 업데이트합니다.
     * @route POST /designerRepresentativeFrontPhotos
     * @param {object} req - 클라이언트 요청 객체, mode 및 기타 데이터를 포함합니다.
     * @param {object} res - 서버 응답 객체, 요청된 작업에 대한 결과를 반환합니다.
     */
    router.post([ "/designerRepresentativeFrontPhotos" ], async function (req, res) {
      // 응답 헤더를 설정하여 응답 형식을 JSON으로 지정하고, 모든 출처에서의 접근을 허용하며, 특정 HTTP 메서드와 헤더를 허용합니다.
      res.set({
          "Content-Type": "application/json", // 응답의 Content-Type을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 지정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 요청 헤더를 지정합니다.
      });

      try {
          // 요청 객체에서 mode 값이 없으면 오류를 발생시킵니다.
          if (req.body.mode === undefined) {
              throw new Error("invalid post");
          }
          
          // mode 값을 추출합니다.
          const { mode } = req.body;
          // MongoDB에 접근하기 위한 객체와 컬렉션 이름을 정의합니다.
          const selfMongo = instance.mongo;
          const collection = "designer";
          let rows;
          let jsonModel;
          let targetData;
          let thisArr;
          let fileName;
          let pid;
          let index;
          let whereQuery, updateQuery;

          // mode가 "save"인 경우, 사진 경로를 저장하는 작업을 수행합니다.
          if (mode === "save") {
              // 요청 객체에서 desid, position, path 값을 추출합니다.
              const { desid, position: positionRaw, path: pathRaw } = equalJson(req.body);

              // 경로에서 파일명을 추출하고, 포트폴리오 ID(pid)와 인덱스(index)를 계산합니다.
              thisArr = stringToLink(pathRaw).split("/");
              fileName = thisArr[thisArr.length - 1].split(".")[0];
              pid = /[ap][0-9]+/.exec(fileName)[0];
              index = fileName.replace(new RegExp(pid + "$"), "");

              // MongoDB에서 업데이트할 쿼리를 정의합니다.
              whereQuery = { desid }; // 디자이너 ID를 기준으로 검색합니다.
              updateQuery = {};
              updateQuery["setting.front.photo.porlid"] = pid; // 포트폴리오 ID를 설정합니다.
              updateQuery["setting.front.photo.index"] = index; // 인덱스를 설정합니다.

              // MongoDB에서 해당 데이터를 업데이트합니다.
              await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo });

              // 업데이트 이후, 프론트 엔드에 반영하기 위해 외부 API에 요청을 보냅니다.
              await requestSystem("https://" + instance.address.officeinfo.ghost.host + ":3000/frontReflection", { data: null }, { headers: { "Content-Type": "application/json" } });

              // 성공 메시지를 응답으로 보냅니다.
              res.send(JSON.stringify({ message: "done" }));

          } else {
              // mode가 유효하지 않은 경우 오류를 발생시킵니다.
              throw new Error("invalid post");
          }

      } catch (e) {
          // 오류가 발생한 경우 로그를 기록하고 클라이언트에 오류 메시지를 반환합니다.
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @description 디자이너의 대표 페이퍼워크 자료를 관리하는 라우터입니다. 이 라우터는 특정 설정을 저장하고 조회하는 기능을 제공합니다.
     * @route POST /designerRepresentativePaper
     * @param {object} req - 클라이언트 요청 객체로, mode 및 기타 데이터를 포함합니다.
     * @param {object} res - 서버 응답 객체로, 요청된 작업에 대한 결과를 반환합니다.
     */
    router.post([ "/designerRepresentativePaper" ], async function (req, res) {
      // 응답 헤더를 설정하여 응답 형식을 JSON으로 지정하고, 모든 출처에서의 접근을 허용하며, 특정 HTTP 메서드와 헤더를 허용합니다.
      res.set({
          "Content-Type": "application/json", // 응답의 Content-Type을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 지정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 요청 헤더를 지정합니다.
      });

      try {
          // 요청 객체에서 mode 값이 없으면 오류를 발생시킵니다.
          if (req.body.mode === undefined) {
              throw new Error("invalid post");
          }

          // mode 값을 추출합니다.
          const { mode } = req.body;
          // MongoDB에 접근하기 위한 객체와 컬렉션 이름을 정의합니다.
          const selfMongo = mongo;
          const collection = "designerRepresentativePaper";
          const positionLength = 12; // 포지션 배열의 길이를 정의합니다.
          const rootPath = "__samba__/designProposal/image"; // 루트 경로를 정의합니다.
          const indexToken = "____index____"; // 인덱스 토큰을 정의합니다.
          let rows;
          let jsonModel;
          let targetData;
          let thisDesignerRootFolder;
          let thisPosition;
          let tempName;
          let thisName;
          let findTarget;
          let newPath;

          // mode가 "save"인 경우, 페이퍼 자료 경로를 저장하는 작업을 수행합니다.
          if (mode === "save") {
              const { desid, position: positionRaw, path: pathRaw } = equalJson(req.body);
              const position = Number(positionRaw);

              // MongoDB에서 해당 디자이너 ID에 대한 데이터를 조회합니다.
              rows = await back.mongoRead(collection, { desid: desid }, { selfMongo });

              if (rows.length === 0) {
                  // 데이터가 없으면 새로운 모델을 생성하여 저장합니다.
                  jsonModel = {
                      date: new Date(), // 현재 날짜와 시간을 기록합니다.
                      desid, // 디자이너 ID를 저장합니다.
                      position: (new Array(positionLength)).fill(0, 0), // 포지션 배열을 초기화합니다.
                  }
                  if (jsonModel.position[position] === undefined) {
                      throw new Error("invalid position");
                  }
                  jsonModel.position[position] = pathRaw; // 지정된 위치에 경로를 저장합니다.
                  await back.mongoCreate(collection, objectDeepCopy(jsonModel), { selfMongo }); // MongoDB에 새로 생성된 데이터를 저장합니다.

              } else {
                  // 데이터가 있으면 기존 데이터를 업데이트합니다.
                  [ jsonModel ] = rows;
                  if (!Array.isArray(jsonModel.position)) {
                      // 만약 position 배열이 아니면 데이터를 삭제하고 새로 생성합니다.
                      await back.mongoDelete(collection, { desid }, { selfMongo });
                      jsonModel = {
                          date: new Date(),
                          desid,
                          position: (new Array(positionLength)).fill(0, 0),
                      }
                      if (jsonModel.position[position] === undefined) {
                          throw new Error("invalid position");
                      }
                      jsonModel.position[position] = pathRaw;
                      await back.mongoCreate(collection, objectDeepCopy(jsonModel), { selfMongo });

                  } else {
                      // 기존 데이터를 업데이트합니다.
                      if (jsonModel.position[position] === undefined) {
                          throw new Error("invalid position");
                      }
                      jsonModel.position[position] = pathRaw;
                      await back.mongoUpdate(collection, [ { desid }, { "date": new Date(), "position": objectDeepCopy(jsonModel.position) } ], { selfMongo });
                  }
              }

              // 성공 메시지를 응답으로 보냅니다.
              res.send(JSON.stringify({ message: "done" }));

          } else if (mode === "get") {
              // mode가 "get"인 경우, 특정 디자이너의 페이퍼 자료를 조회합니다.
              const { desid } = equalJson(req.body);

              // MongoDB에서 해당 디자이너 ID에 대한 데이터를 조회합니다.
              rows = await back.mongoRead(collection, { desid: desid }, { selfMongo });

              if (rows.length === 0) {
                  // 데이터가 없으면 초기화된 모델을 생성하여 응답합니다.
                  jsonModel = {
                      date: new Date(),
                      desid,
                      position: (new Array(positionLength)).fill(0, 0),
                  }
                  await back.mongoCreate(collection, objectDeepCopy(jsonModel), { selfMongo });
                  res.send(JSON.stringify({ data: jsonModel }));
              } else {
                  [ targetData ] = rows;

                  // 디자이너의 루트 폴더 정보를 외부 시스템에서 가져옵니다.
                  thisDesignerRootFolder = await requestSystem("https://" + address.officeinfo.ghost.host + "/readFolder", {
                      path: rootPath + "/" + desid
                  }, {
                      headers: {
                          "Content-Type": "application/json"
                      }
                  });

                  // 폴더 정보를 처리하여 파일명을 추출합니다.
                  thisDesignerRootFolder = thisDesignerRootFolder.data.map((str) => {
                      return {
                          original: str,
                          name: str.split(indexToken)[1],
                      }
                  });

                  // 위치 배열을 처리하여 새로운 경로를 생성합니다.
                  thisPosition = [];
                  for (let rawName of targetData.position) {
                      if (typeof rawName === "string") {
                          tempName = stringToLink(rawName).split("/");
                          if (tempName.length > 4 && (new RegExp(indexToken, "gi")).test(tempName[4])) {
                              thisName = tempName[4].split(indexToken)[1];
                              findTarget = thisDesignerRootFolder.find((o) => { return o.name === thisName });
                              if (findTarget === undefined) {
                                  thisPosition.push(rawName);
                              } else {
                                  newPath = rootPath + "/" + desid + "/" + findTarget.original;
                                  newPath = newPath.replace(/^__samba__/gi, '');
                                  thisPosition.push(linkToString(newPath));
                              }
                          } else {
                              thisPosition.push(rawName);
                          }
                      } else {
                          thisPosition.push(rawName);
                      }
                  }
                  targetData.position = objectDeepCopy(thisPosition);

                  // 처리된 데이터를 응답으로 보냅니다.
                  res.send(JSON.stringify({ data: targetData }));
              }

          } else {
              // mode가 유효하지 않은 경우 오류를 발생시킵니다.
              throw new Error("invalid post");
          }

      } catch (e) {
          // 오류가 발생한 경우 로그를 기록하고 클라이언트에 오류 메시지를 반환합니다.
          console.log(e);
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * 디자이너의 대표 키워드 관련 작업을 처리하는 라우터.
     * @route POST /designerRepresentativeKeywords
     * @param {Object} req - 클라이언트의 요청 객체
     * @param {Object} res - 서버의 응답 객체
     */
    router.post([ "/designerRepresentativeKeywords" ], async function (req, res) {
      
      // 응답의 Content-Type을 JSON으로 설정하고, CORS(Cross-Origin Resource Sharing)를 허용
      res.set({
        "Content-Type": "application/json", // 응답 데이터 형식이 JSON임을 명시
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서 이 리소스에 접근할 수 있도록 허용
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 명시
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 명시
      });

      try {
        // 요청의 mode 필드가 없으면 에러를 발생시킴
        if (req.body.mode === undefined) {
          throw new Error("invalid post"); // 유효하지 않은 POST 요청임을 알리는 에러
        }

        const { mode } = req.body; // 요청에서 mode 필드를 추출
        const selfCoreMongo = instance.mongo; // instance 객체에서 mongo 인스턴스를 가져옴
        const selfMongo = mongo; // 별도로 선언된 mongo 인스턴스를 가져옴
        const collection = "designerRepresentativeKeywords"; // 사용할 MongoDB 컬렉션 이름
        let rows; // MongoDB에서 가져온 데이터를 저장할 변수
        let jsonModel; // JSON 모델을 저장할 변수
        let targetData; // 처리 중인 데이터를 저장할 변수
        let thisDesigner, introduction; // 디자이너 정보와 소개 텍스트를 저장할 변수
        let tempResponse; // 임시로 API 응답을 저장할 변수
        let keywords; // 추출된 키워드를 저장할 변수
        let selected; // 선택된 키워드를 저장할 변수
        let newSelected; // 갱신된 선택 키워드를 저장할 변수
        let whereQuery; // MongoDB 쿼리를 저장할 변수

        // mode가 "select"일 때
        if (mode === "select") {

          const { desid, words, subMode } = equalJson(req.body); // 요청에서 desid, words, subMode 필드를 추출

          // MongoDB에서 desid로 해당 데이터를 조회
          rows = await back.mongoRead(collection, { desid: desid }, { selfMongo });
          if (rows.length === 0) {
            // 만약 해당 데이터가 없다면 디자이너 정보를 가져와서 소개 텍스트를 조합
            thisDesigner = await back.getDesignerById(desid, { selfMongo: selfCoreMongo, toNormal: true });
            introduction = thisDesigner.setting.front.introduction.desktop.join(" ").trim() + "\n\n" + thisDesigner.setting.description.join("\n");
            introduction = introduction.trim();
            if (/NULL/g.test(introduction)) {
              introduction = ""; // introduction에 "NULL"이 포함되어 있으면 빈 문자열로 초기화
              jsonModel = {
                date: new Date(),
                desid,
                introduction,
                keywords: [],
                selected: [],
              }
            } else {
              // aliveinfo API를 사용해 introduction에서 키워드를 추출
              tempResponse = await requestSystem("https://" + address.aliveinfo.host + "/extractKeywords", { sentence: introduction }, { headers: { "Content-Type": "application/json" } });
              keywords = objectDeepCopy(tempResponse.data.keywords).map((str) => { return str.trim(); }).map((str) => {
                // "홈 스타일링" 키워드를 "홈스타일링"으로 수정
                return str.replace(/홈 스타일링/gi, "홈스타일링");
              }).filter((str) => {
                // 특정 키워드들은 필터링하여 제외
                return str !== "홈스타일링" && str !== "인테리어" && str !== "스타일링" && str !== "인테리어 디자인" && str !== "디자인" && str !== "시공" && str !== "인테리어 디자이너" && str !== "디자이너" && str !== "안녕하세요" && str !== "경험" && str !== "디자인" && str !== "스타일" && str !== "디자인 스타일" && str !== "인테리어 설계";
              }).filter((str) => {
                // 키워드 길이가 3자 이상 15자 이하인 키워드만 남김
                return str.length < 15 && str.length > 2;
              })
              jsonModel = {
                date: new Date(),
                desid,
                introduction,
                keywords,
                selected: [],
              }
            }
            // MongoDB에 새로운 데이터 저장
            await back.mongoCreate(collection, objectDeepCopy(jsonModel), { selfMongo });
            rows = await back.mongoRead(collection, { desid: desid }, { selfMongo });
          }
          [ targetData ] = rows; // rows 배열에서 첫 번째 객체를 targetData에 할당

          if (subMode === "add") {
            // subMode가 "add"일 경우
            if (targetData.keywords.includes(words)) {
              // keywords 배열에 words가 포함되어 있으면 selected에 추가
              selected = objectDeepCopy(targetData.selected);
              selected.push(words);
              selected = [ ...new Set(selected) ]; // 중복 제거
              await back.mongoUpdate(collection, [ { desid }, { "date": new Date(), "selected": selected } ], { selfMongo })
            }
          } else {
            // subMode가 "add"가 아닐 경우 (키워드 제거)
            if (targetData.selected.includes(words)) {
              // selected 배열에서 words 제거
              newSelected = [];
              for (let w of targetData.selected) {
                if (w !== words) {
                  newSelected.push(w);
                }
              }
              newSelected = [ ...new Set(newSelected) ]; // 중복 제거
              await back.mongoUpdate(collection, [ { desid }, { "date": new Date(), "selected": newSelected } ], { selfMongo })
            }
          }

          res.send(JSON.stringify({ message: "done" })); // 작업 완료 응답 전송

        } else if (mode === "proposal") {

          // mode가 "proposal"일 때
          const { desidArr } = equalJson(req.body); // 요청에서 desidArr 필드를 추출
          whereQuery = {};
          whereQuery["$or"] = [];
          for (let thisDesid of desidArr) {
            whereQuery["$or"].push({ desid: thisDesid }); // desidArr 내의 각 desid에 대해 OR 조건을 추가
          }
          // 해당 조건으로 MongoDB에서 데이터 조회
          rows = await back.mongoRead(collection, whereQuery, { selfMongo });
          res.send(JSON.stringify({ data: rows })); // 조회된 데이터를 클라이언트에 응답으로 전송

        } else if (mode === "convert") {

          // mode가 "convert"일 때
          const { desid, selected } = equalJson(req.body); // 요청에서 desid와 selected 필드를 추출
          // MongoDB에서 해당 desid의 데이터를 업데이트
          await back.mongoUpdate(collection, [ { desid }, { "date": new Date(), "selected": selected } ], { selfMongo })
          res.send(JSON.stringify({ message: "done" })); // 작업 완료 응답 전송

        } else if (mode === "get") {

          // mode가 "get"일 때
          const { desid } = equalJson(req.body); // 요청에서 desid 필드를 추출

          // MongoDB에서 desid로 데이터를 조회
          rows = await back.mongoRead(collection, { desid: desid }, { selfMongo });
          if (rows.length === 0) {

            // 조회된 데이터가 없을 경우 기본값으로 초기화하여 저장
            thisDesigner = await back.getDesignerById(desid, { selfMongo: selfCoreMongo, toNormal: true });
            introduction = thisDesigner.setting.front.introduction.desktop.join(" ").trim() + "\n\n" + thisDesigner.setting.description.join("\n");
            introduction = introduction.trim();
            jsonModel = {
              date: new Date(),
              desid,
              introduction,
              keywords: [
                "꼼꼼한 스타일",
                "편안한 상담",
                "퀄리티 있는",
                "안정감 있는",
                "원활한 소통",
                "커뮤니케이션",
                "완벽한 마무리",
              ],
              selected: [],
            }

            await back.mongoCreate(collection, objectDeepCopy(jsonModel), { selfMongo });

            res.send(JSON.stringify({ data: jsonModel })); // 초기화된 데이터를 클라이언트에 응답으로 전송
          } else {
            [ targetData ] = rows;

            if (targetData.keywords.length > 0) {
              // 키워드가 존재하면 해당 데이터를 응답
              res.send(JSON.stringify({ data: targetData }));
            } else {

              // 키워드가 없는 경우, 디자이너의 소개 내용을 기반으로 키워드를 재생성
              thisDesigner = await back.getDesignerById(desid, { selfMongo: selfCoreMongo, toNormal: true });
              introduction = thisDesigner.setting.front.introduction.desktop.join(" ").trim() + "\n\n" + thisDesigner.setting.description.join("\n");
              introduction = introduction.trim();

              if (/NULL/g.test(introduction)) {
                res.send(JSON.stringify({ data: targetData }));
              } else {
                keywords = [
                  "꼼꼼한 스타일",
                  "편안한 상담",
                  "퀄리티 있는",
                  "안정감 있는",
                  "원활한 소통",
                  "커뮤니케이션",
                  "완벽한 마무리",
                ]

                // 키워드 재생성 후 MongoDB에 업데이트
                await back.mongoUpdate(collection, [ { desid }, { "date": new Date(), "introduction": introduction, "keywords": objectDeepCopy(keywords), "selected": [] } ], { selfMongo })
                rows = await back.mongoRead(collection, { desid: desid }, { selfMongo });
                [ targetData ] = rows;
                res.send(JSON.stringify({ data: targetData })); // 갱신된 데이터를 응답
              }

            }
          }

        } else if (mode === "update") {

          // mode가 "update"일 때
          const { desid, keywords } = equalJson(req.body); // 요청에서 desid와 keywords 필드를 추출

          rows = await back.mongoRead(collection, { desid: desid }, { selfMongo });
          if (rows.length === 0) {

            // 데이터가 없을 경우 초기화하여 저장
            thisDesigner = await back.getDesignerById(desid, { selfMongo: selfCoreMongo, toNormal: true });
            introduction = thisDesigner.setting.front.introduction.desktop.join(" ").trim() + "\n\n" + thisDesigner.setting.description.join("\n");
            introduction = introduction.trim();
            jsonModel = {
              date: new Date(),
              desid,
              introduction,
              keywords,
              selected: [],
            }

            await back.mongoCreate(collection, objectDeepCopy(jsonModel), { selfMongo });
            res.send(JSON.stringify({ message: "done" }));
          } else {
            // 데이터가 이미 존재하면 키워드를 업데이트
            await back.mongoUpdate(collection, [ { desid }, { "date": new Date(), "keywords": objectDeepCopy(keywords), "selected": [] } ], { selfMongo })
            res.send(JSON.stringify({ message: "done" }));
          }

        } else {
          throw new Error("invalid post"); // 유효하지 않은 요청 처리
        }

      } catch (e) {
        console.log(e);
        logger.error(e, req).catch((e) => { console.log(e); }); // 오류 발생 시 로그 기록
        res.send(JSON.stringify({ message: "error : " + e.message })); // 오류 메시지를 클라이언트에 응답
      }
    });
    
    /**
     * 메시지 로그를 처리하는 라우터.
     * 클라이언트에서 전송된 메시지를 지정된 채널에 로그로 기록하거나 알림으로 전송합니다.
     * @route POST /messageLog
     * @param {Object} req - 클라이언트의 요청 객체.
     * @param {Object} res - 서버의 응답 객체.
     */
    router.post([ "/messageLog" ], async function (req, res) {

      // 응답의 Content-Type을 JSON으로 설정하고, CORS(Cross-Origin Resource Sharing)를 허용합니다.
      res.set({
        "Content-Type": "application/json", // 응답 데이터 형식을 JSON으로 설정합니다.
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서 이 리소스에 접근할 수 있도록 허용합니다.
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 명시합니다.
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 명시합니다.
      });

      try {
        // 요청 본문에 필요한 필드가 모두 있는지 확인합니다.
        if (req.body.text === undefined || req.body.channel === undefined || req.body.collection === undefined) {
          throw new Error("invalid post, must be text, channel, collection"); // 필수 필드가 누락된 경우 에러를 발생시킵니다.
        }

        // 요청 본문에서 필요한 필드를 추출합니다.
        const { text, channel, collection } = req.body;

        // 슬랙에 전송할 메시지를 저장할 변수입니다.
        let slackText;

        // 특수 모드를 나타내는 변수로, 기본값은 false입니다.
        let fairyMode;

        // fairyMode를 false로 초기화합니다.
        fairyMode = false;

        // 슬랙에 전송할 텍스트를 요청 본문에서 받은 텍스트로 설정합니다.
        slackText = text;

        // 채널 이름에 'alive'가 포함되어 있지 않은 경우에만 슬랙에 메시지를 전송합니다.
        if (!/alive/gi.test(channel)) {
          // 슬랙 메시지 전송을 대기열에 등록합니다. 
          setQueue(() => {
            // 슬랙의 특정 채널에 메시지를 전송합니다. 만약 채널이 'silent'라면 '#error_log' 채널로 전송합니다.
            slack_bot.chat.postMessage({ text: slackText, channel: (channel === "silent" ? "#error_log" : channel) })
              .catch((err) => { console.log(err); }); // 메시지 전송 중 오류가 발생하면 콘솔에 로그를 출력합니다.
          }, 0);
        }

        // 클라이언트에게 'will do' 메시지를 JSON 형식으로 응답합니다.
        res.send(JSON.stringify({ message: "will do" }));
      } catch (e) {
        // 오류가 발생한 경우 오류를 로깅하고, 클라이언트에 오류 메시지를 JSON 형식으로 응답합니다.
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * 긴급 알람을 슬랙 채널로 전송하는 라우터.
     * 클라이언트에서 전송된 긴급 메시지를 특정 슬랙 채널에 전달합니다.
     * @route POST /emergencyAlarm
     * @param {Object} req - 클라이언트의 요청 객체.
     * @param {Object} res - 서버의 응답 객체.
     */
    router.post([ "/emergencyAlarm" ], async function (req, res) {

      // 응답의 Content-Type을 JSON으로 설정하고, CORS(Cross-Origin Resource Sharing)를 허용합니다.
      res.set({
        "Content-Type": "application/json", // 응답 데이터 형식을 JSON으로 설정합니다.
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서 이 리소스에 접근할 수 있도록 허용합니다.
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 명시합니다.
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 명시합니다.
      });

      try {
        // 요청 본문에 필수 필드인 'text'가 있는지 확인합니다.
        if (req.body.text === undefined) {
          throw new Error("invalid post, must be text"); // 'text' 필드가 누락된 경우 에러를 발생시킵니다.
        }

        // 요청 본문에서 'text' 필드를 추출합니다.
        const { text } = req.body;

        // 슬랙 메시지를 전송할 채널을 '#emergency_alarm'으로 설정합니다.
        const channel = "#emergency_alarm";

        // 슬랙의 '#emergency_alarm' 채널로 메시지를 전송합니다.
        await slack_bot.chat.postMessage({ text, channel });

        // 클라이언트에 'done' 메시지를 JSON 형식으로 응답합니다.
        res.send(JSON.stringify({ message: "done" }));
      } catch (e) {
        // 오류가 발생한 경우 오류를 로깅하고, 클라이언트에 오류 메시지를 JSON 형식으로 응답합니다.
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * "/parsingCall" 경로로 들어오는 POST 요청을 처리하는 라우터입니다.
     * 전화번호를 받아서 고객이나 디자이너, 시공 소장 등 관련된 사람을 찾아서 알림을 전송합니다.
     * @route POST /parsingCall
     * @param {Object} req - 클라이언트로부터 들어온 요청 객체
     * @param {Object} res - 서버에서 클라이언트로 보낼 응답 객체
     */
    router.post([ "/parsingCall" ], async function (req, res) {
      
      // 응답 헤더를 설정하여 JSON 형식의 데이터를 반환하고, CORS 설정을 허용합니다.
      res.set({
        "Content-Type": "application/json", // 응답 데이터를 JSON 형식으로 지정합니다.
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서 이 서버에 접근할 수 있도록 허용합니다.
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 이 서버에서 허용하는 HTTP 메서드를 지정합니다.
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 요청에서 허용하는 헤더들을 지정합니다.
      });

      // 외부 서비스의 URL을 설정합니다. 이 URL은 전화번호로 정보를 조회하기 위해 사용됩니다.
      const outerUrl = "http://www.moyaweb.com/search_result.do";

      try {
        // 요청 본문에 'phoneNumber'가 정의되어 있는지 확인합니다.
        if (req.body.phoneNumber === undefined) {
          // 전화번호가 제공되지 않았다면, 에러 메시지를 JSON 형태로 응답합니다.
          res.send(JSON.stringify({ error: "error" }));
        } else {
          // MongoDB 인스턴스를 가져옵니다.
          const selfMongo = instance.mongo;
          // 요청 본문에서 'phoneNumber'와 'kind' 값을 가져옵니다.
          const { phoneNumber, kind } = req.body;
          // 'kind' 값이 1이면 '전화', 그 외에는 '문자'로 설정합니다.
          const method = (kind === '1' ? "전화" : "문자");

          // 여러 변수들을 선언합니다.
          let client; // 조회된 클라이언트를 저장할 변수
          let rows, temp, name, sub, text; // 다양한 데이터를 임시로 저장할 변수들
          let manager; // 고객의 매니저를 저장할 변수
          let desid, proid; // 디자이너 ID와 프로젝트 ID를 저장할 변수
          let projects; // 프로젝트 리스트를 저장할 변수
          let boo; // 불리언 값을 저장할 변수
          let outerResponse; // 외부 API의 응답을 저장할 변수
          let entireDom, resultDom, findName; // DOM 파싱에 사용할 변수들
          let builders; // 시공 소장 정보를 저장할 변수
          let cliid; // 클라이언트 ID를 저장할 변수
          let thisProjects, thisProject, thisHistory; // 클라이언트와 관련된 프로젝트와 히스토리를 저장할 변수들
          let cliidBoo; // 클라이언트 ID 존재 여부를 확인할 불리언 변수
          let targetLink; // 대상 링크를 저장할 변수

          // 전화번호가 '2'로 시작하지 않는다면 다음 작업을 수행합니다.
          if (!/^2/.test(phoneNumber)) {
            cliidBoo = false; // 클라이언트 ID 존재 여부를 false로 초기화합니다.
            targetLink = null; // 대상 링크를 null로 초기화합니다.
            
            // 전화번호로 클라이언트를 조회합니다.
            rows = await back.getClientsByQuery({ phone: phoneNumber }, { selfMongo });
            if (rows.length === 0) { // 조회된 클라이언트가 없는 경우
              // 디자이너 정보를 조회합니다.
              rows = await back.getDesignersByQuery({ "information.phone": phoneNumber }, { selfMongo });
              if (rows.length === 0) { // 디자이너 정보도 없는 경우
                // 팀원 정보를 조회합니다.
                temp = await back.setMemberObj({ selfMongo, getMode: true });
                rows = [];
                for (let obj of temp) { // 팀원 중에서 전화번호가 일치하는 경우를 찾습니다.
                  if (obj.phone === phoneNumber) {
                    rows.push(obj);
                  }
                }
                if (rows.length === 0) { // 팀원 정보도 없는 경우
                  name = "알 수 없는"; // 이름을 '알 수 없는'으로 설정합니다.
                  sub = "사람"; // 서브 타이틀을 '사람'으로 설정합니다.
                } else {
                  name = rows[0].name; // 팀원 이름을 설정합니다.
                  sub = "팀원"; // 서브 타이틀을 '팀원'으로 설정합니다.
                }
              } else {
                name = rows[0].designer; // 디자이너 이름을 설정합니다.
                sub = "실장님"; // 서브 타이틀을 '실장님'으로 설정합니다.
              }

              // 최종적으로 알림 메시지를 구성합니다.
              text = `${name} ${sub}에게서 ${method}가 왔습니다!`;
            } else {
              // 클라이언트 정보가 존재하는 경우
              client = rows[0]; // 첫 번째 클라이언트를 선택합니다.
              name = client.name; // 클라이언트의 이름을 가져옵니다.
              cliid = client.cliid; // 클라이언트 ID를 가져옵니다.
              sub = "고객님"; // 서브 타이틀을 '고객님'으로 설정합니다.

              // 특정 이름에 대해 특별한 메시지를 설정합니다.
              if (/^대표님/gi.test(name)) {
                text = `대표님께 ${method}가 왔습니다!`;
              } else if (/^김실장/gi.test(name)) {
                text = `김지은 실장님에게서 ${method}가 왔습니다!`;
              } else if (/^김남편/gi.test(name)) {
                text = `김애란 실장님에게서 ${method}가 왔습니다!`;
              } else {
                // 클라이언트와 관련된 프로젝트를 조회합니다.
                thisProjects = await back.getProjectsByQuery({ cliid }, { selfMongo });
                thisProject = null;
                if (thisProjects.length > 0) {
                  [ thisProject ] = thisProjects; // 첫 번째 프로젝트를 선택합니다.
                }
                if (thisProject === null) { // 프로젝트가 없는 경우
                  // 매니저 정보를 조회합니다.
                  manager = (await requestSystem("https://" + address.officeinfo.host + ":3002/getHistoryProperty", { method: "client", property: "manager", idArr: [ cliid ] }, { headers: { "Content-Type": "application/json" } })).data[cliid];
                  text = `${name}(${cliid} - ${client.requests[0].analytics.response.status.value}) ${sub}에게서 ${method}가 왔습니다. ${manager}님 받아주세요!`;
                  cliidBoo = true; // 클라이언트 ID 존재 여부를 true로 설정합니다.
                  targetLink = "https://" + address.officeinfo.host + ":3002" + "/client?cliid=" + cliid; // 클라이언트 링크 설정
                } else {
                  // 프로젝트가 있는 경우
                  if (thisProject.desid.trim() === "") { // 프로젝트에 디자이너가 없는 경우
                    manager = (await requestSystem("https://" + address.officeinfo.host + ":3002/getHistoryProperty", { method: "client", property: "manager", idArr: [ cliid ] }, { headers: { "Content-Type": "application/json" } })).data[cliid];
                    text = `${name}(${cliid} - ${client.requests[0].analytics.response.status.value}) ${sub}에게서 ${method}가 왔습니다. ${manager}님 받아주세요!`;
                    cliidBoo = true;
                    targetLink = "https://" + address.officeinfo.host + ":3002" + "/client?cliid=" + cliid;
                  } else {
                    if (thisProject.process.contract.first.date.valueOf() > (new Date(2000, 0, 1)).valueOf()) { // 프로젝트 계약일이 유효한 경우
                      text = `${name}(${cliid} - ${client.requests[0].analytics.response.status.value}) ${sub}에게서 ${method}가 왔습니다.`;
                      cliidBoo = true;
                      targetLink = "https://" + address.officeinfo.host + ":3002" + "/project?cliid=" + cliid;
                    } else {
                      manager = (await requestSystem("https://" + address.officeinfo.host + ":3002/getHistoryProperty", { method: "client", property: "manager", idArr: [ cliid ] }, { headers: { "Content-Type": "application/json" } })).data[cliid];
                      text = `${name}(${cliid} - ${client.requests[0].analytics.response.status.value}) ${sub}에게서 ${method}가 왔습니다. ${manager}님 받아주세요!`;
                      cliidBoo = true;
                      targetLink = "https://" + address.officeinfo.host + ":3002" + "/client?cliid=" + cliid;
                    }
                  }
                }
              }
            }

            // 이름이 '알 수 없는' 경우 추가 처리
            if (name.trim() === "알 수 없는") {
              builders = await back.getBuildersByQuery({ "information.phone": phoneNumber }, { selfMongo });
              if (builders.length > 0) { // 시공 소장이 있는 경우
                text = `${builders[0].builder} 시공 소장님께 ${method}가 왔습니다!`;
              } else { // 시공 소장이 없는 경우
                console.log(new Date(), phoneNumber, "알 수 없는 사람");
                text = `알 수 없는 사람(전화번호 비공개)으로부터 ${method}가 왔습니다!`
              }
              if (/^알 수 없는/gi.test(text)) { // 여전히 알 수 없는 경우
                rows = await back.getAspirantsByQuery({ phone: phoneNumber }, { selfMongo });
                if (rows.length === 0) { // 지원자가 없는 경우
                  outerResponse = await requestSystem(outerUrl, { SCH_TEL_NO: String(phoneNumber).replace(/[^0-9]/gi, '') }, { headers: { "Content-Type": "application/x-www-form-urlencoded" } });
                  entireDom = new JSDOM(outerResponse.data);
                  resultDom = entireDom.window.document.getElementById("result_phone_text");
                  if (resultDom !== null) { // 외부 응답이 있는 경우
                    findName = resultDom.textContent.trim();
                    text = `${findName}에서 ${method}가 왔습니다!`;
                  }
                } else { // 지원자가 있는 경우
                  text = `${rows[0].designer} 디자이너 신청자로부터 ${method}가 왔습니다!`;
                }
              }
            }

            // 최종적으로 메시지를 전송합니다.
            await messageSend({ text, channel: "#call", voice: false, fairy: true });
          }
          // 작업이 완료된 후 응답 메시지를 보냅니다.
          res.send(JSON.stringify({ message: "success" }));
        }
      } catch (e) {
        // 에러가 발생하면 에러 로그를 기록하고, 클라이언트에게 에러 메시지를 보냅니다.
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * "/receiveCall" 경로로 들어오는 POST 요청을 처리하는 라우터입니다.
     * 전화번호와 종류(kind)를 받아서 적절한 형식으로 변환한 뒤, 다른 시스템으로 요청을 전달합니다.
     * @route POST /receiveCall
     * @param {Object} req - 클라이언트로부터 들어온 요청 객체
     * @param {Object} res - 서버에서 클라이언트로 보낼 응답 객체
     */
    router.post([ "/receiveCall" ], async function (req, res) {
      
      // 응답 헤더를 설정하여 JSON 형식의 데이터를 반환하고, CORS 설정을 허용합니다.
      res.set({
        "Content-Type": "application/json", // 응답 데이터를 JSON 형식으로 지정합니다.
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서 이 서버에 접근할 수 있도록 허용합니다.
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 이 서버에서 허용하는 HTTP 메서드를 지정합니다.
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 요청에서 허용하는 헤더들을 지정합니다.
      });

      try {
        // 요청 본문을 JSON 형식으로 파싱한 후 데이터만 추출합니다.
        const thisData = equalJson(req.body).data;

        // sender(발신자)와 kind(종류) 값이 요청에 포함되어 있는지 확인합니다.
        if (thisData.sender === undefined || thisData.kind === undefined) {
          console.log(req.body); // 에러 발생 시 요청 본문을 콘솔에 출력합니다.
          res.send(JSON.stringify({ error: "error" })); // 에러 메시지를 클라이언트에게 반환합니다.
        } else {
          // sender와 kind 값을 thisData에서 추출합니다.
          const { sender, kind } = thisData;
          // timeoutConst는 이 함수에서 사용하는 타임아웃의 키 이름입니다.
          const timeoutConst = "receiveCall";
          // 전화번호와 발신자 정보를 저장할 변수들을 초기화합니다.
          let phoneNumber, senderArr;
          let part0, part1, part2;

          // sender 값을 문자 배열로 변환합니다.
          senderArr = sender.split('');
          phoneNumber = ''; // 최종 전화번호를 저장할 변수입니다.
          part0 = ''; // 전화번호의 첫 번째 부분을 저장할 변수입니다.
          part1 = ''; // 전화번호의 중간 부분을 저장할 변수입니다.
          part2 = ''; // 전화번호의 마지막 부분을 저장할 변수입니다.

          // 발신자의 전화번호가 '01'로 시작하는지 확인합니다.
          if (/^01/gi.test(sender)) {
            // 휴대폰 번호 형식으로 전화번호를 분리합니다.
            for (let i = 0; i < 3; i++) {
              part0 += senderArr.shift(); // 첫 3자리를 part0에 저장합니다.
            }
            for (let i = 0; i < 4; i++) {
              part2 = senderArr.pop() + part2; // 마지막 4자리를 part2에 저장합니다.
            }
            part1 = senderArr.join(''); // 중간 나머지를 part1에 저장합니다.
            phoneNumber = part0 + '-' + part1 + '-' + part2; // 최종적으로 전화번호를 형성합니다.
          } else if (/^02/gi.test(sender)) {
            // 서울 지역번호 '02'로 시작하는 경우
            for (let i = 0; i < 2; i++) {
              part0 += senderArr.shift(); // 첫 2자리를 part0에 저장합니다.
            }
            for (let i = 0; i < 4; i++) {
              part2 = senderArr.pop() + part2; // 마지막 4자리를 part2에 저장합니다.
            }
            part1 = senderArr.join(''); // 중간 나머지를 part1에 저장합니다.
            phoneNumber = part0 + '-' + part1 + '-' + part2; // 최종적으로 전화번호를 형성합니다.
          } else {
            // 그 외 다른 지역번호인 경우
            for (let i = 0; i < 3; i++) {
              part0 += senderArr.shift(); // 첫 3자리를 part0에 저장합니다.
            }
            for (let i = 0; i < 4; i++) {
              part2 = senderArr.pop() + part2; // 마지막 4자리를 part2에 저장합니다.
            }
            part1 = senderArr.join(''); // 중간 나머지를 part1에 저장합니다.
            phoneNumber = part0 + '-' + part1 + '-' + part2; // 최종적으로 전화번호를 형성합니다.
          }

          // 이전에 설정된 타임아웃이 있는지 확인하고, 존재하면 이를 제거합니다.
          if (instance.timeouts[timeoutConst] !== undefined || instance.timeouts[timeoutConst] !== null) {
            clearTimeout(instance.timeouts[timeoutConst]); // 타임아웃 제거
          }

          // 새로운 타임아웃을 설정합니다.
          instance.timeouts[timeoutConst] = setTimeout(async () => {
            try {
              // 전화번호와 종류를 임시 JSON 파일에 저장합니다.
              await fileSystem(`writeJson`, [ `${process.cwd()}/temp/${timeoutConst}.json`, { phoneNumber, kind } ]);
              setQueue(async () => {
                try {
                  await sleep(Math.round(1000 * Math.random())); // 랜덤한 대기 시간을 추가합니다.
                  // 저장된 JSON 파일이 존재하는지 확인합니다.
                  if (await fileSystem(`exist`, [ `${process.cwd()}/temp/${timeoutConst}.json` ])) {
                    // JSON 파일을 읽어 전화번호와 종류를 다시 가져옵니다.
                    const { phoneNumber, kind } = await fileSystem(`readJson`, [ `${process.cwd()}/temp/${timeoutConst}.json` ]);
                    await shellExec(`rm`, [ `-rf`, `${process.cwd()}/temp/${timeoutConst}.json` ]); // 파일을 삭제합니다.
                    // 다른 시스템으로 요청을 보냅니다.
                    await requestSystem("https://" + instance.address.secondinfo.host + ":3003/parsingCall", { phoneNumber, kind }, { headers: { "Content-Type": "application/json" } });
                  }
                } catch (e) {
                  throw new Error(e.message); // 에러가 발생하면 새로운 에러를 던집니다.
                }
              }, 300); // 큐에서 작업을 대기시킵니다.
              clearTimeout(instance.timeouts[timeoutConst]); // 타임아웃을 제거합니다.
              instance.timeouts[timeoutConst] = null; // 타임아웃을 null로 초기화합니다.
            } catch (e) {
              console.log(e); // 에러가 발생하면 콘솔에 출력합니다.
            }
          }, 600); // 600밀리초 후에 타임아웃 함수가 실행됩니다.

          // 성공 메시지를 클라이언트에 반환합니다.
          res.send(JSON.stringify({ message: "success" }));
        }
      } catch (e) {
        // 에러가 발생하면 에러 로그를 기록하고, 클라이언트에게 에러 메시지를 보냅니다.
        console.log(e);
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /clickDial
     * @description 이 라우터는 클라이언트로부터 id와 destnumber(전화번호)를 받아, U+ Centrex API를 사용해 지정된 번호로 전화를 겁니다.
     * @param {Object} req - 요청 객체
     * @param {Object} req.body - 요청 본문
     * @param {string} req.body.id - 전화를 거는 데 사용되는 사용자 ID
     * @param {string} req.body.destnumber - 전화를 걸고자 하는 대상의 전화번호
     * @param {Object} res - 응답 객체
     */
    router.post([ "/clickDial" ], async function (req, res) {
      // 응답의 Content-Type을 JSON으로 설정합니다.
      res.set({
          "Content-Type": "application/json",
          // 모든 도메인에서 접근할 수 있도록 허용합니다.
          "Access-Control-Allow-Origin": "*",
          // POST, GET, OPTIONS, HEAD 메서드를 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
          // 요청 헤더로 Content-Type, Accept, X-Requested-With, remember-me를 허용합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
          // id와 destnumber 값이 요청 본문에 없는 경우, 에러를 발생시킵니다.
          if (req.body.id === undefined || req.body.destnumber === undefined) {
              throw new Error("invaild post");
          }

          // U+ Centrex API에 전화를 걸기 위한 URL입니다.
          const url = "https://centrex.uplus.co.kr/RestApi/clickdial";
          let query;

          // API 호출에 필요한 쿼리 파라미터를 설정합니다.
          query = {
              id: req.body.id, // 요청 본문에서 받은 id 값
              pass: address.officeinfo.phone.password, // 사무실의 전화 비밀번호
              destnumber: req.body.destnumber.replace(/[^0-9]/g, '') // 전화번호에서 숫자만 추출합니다.
          };

          // U+ Centrex API에 전화 걸기 요청을 보냅니다.
          requestSystem(url + "?" + querystring.stringify(query), query, {
              headers: { "Content-Type": "application/json" } // 헤더를 JSON 형식으로 설정합니다.
          }).catch((err) => {
              // 요청 중 에러가 발생하면 로그에 남깁니다.
              logger.alert("Ghost error (rou_post_clickDial) : " + "전화 거는 도중 문제 생김 => " + err.message).catch((er) => {
                  console.log(er);
              });
          });

          // 성공적으로 전화를 거는 요청을 보내면 클라이언트에게 메시지를 보냅니다.
          res.send(JSON.stringify({ message: "hello?" }));

      } catch (e) {
          // 예외 발생 시 에러를 로깅하고 클라이언트에게 에러 메시지를 보냅니다.
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /getClients
     * @route POST /getDesigners
     * @route POST /getProjects
     * @route POST /getContents
     * @route POST /getBuilders
     * @route POST /getAspirants
     * @description 이 라우터는 여러 가지 엔티티(클라이언트, 디자이너, 프로젝트, 콘텐츠, 빌더, 지원자)에 대해 쿼리를 수행하여 데이터를 가져옵니다.
     * @param {Object} req - 요청 객체
     * @param {Object} req.body - 요청 본문
     * @param {Object} req.body.whereQuery - MongoDB에서 데이터를 가져오기 위한 쿼리 객체
     * @param {Object} res - 응답 객체
     */
    router.post([
      "/getClients",
      "/getDesigners",
      "/getProjects",
      "/getContents",
      "/getBuilders",
      "/getAspirants"
    ], async function (req, res) {
      // 응답의 Content-Type을 JSON으로 설정합니다.
      res.set({
          "Content-Type": "application/json",
          // 모든 도메인에서 접근할 수 있도록 허용합니다.
          "Access-Control-Allow-Origin": "*",
          // POST, GET, OPTIONS, HEAD 메서드를 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
          // 요청 헤더로 Content-Type, Accept, X-Requested-With을 허용합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });

      try {
          // 요청 본문에 whereQuery가 정의되지 않은 경우, 에러를 발생시킵니다.
          if (req.body.whereQuery === undefined) {
              throw new Error("invaild post");
          }

          // MongoDB 인스턴스를 가져옵니다.
          const selfMongo = instance.mongo;
          // 요청 본문에서 whereQuery를 추출하여 사용합니다.
          const { whereQuery } = equalJson(req.body);
          let rows;

          // whereQuery가 객체 타입이 아니거나 null인 경우, 에러를 발생시킵니다.
          if (typeof whereQuery !== "object" || whereQuery === null) {
              throw new Error("invaild query object");
          }

          // 클라이언트 또는 프로젝트 쿼리인 경우, 추가적인 검사를 수행합니다.
          if (req.url === "/getClients" || req.url === "/getProjects") {
              // 쿼리 객체가 비어 있고, allMode가 정의되지 않은 경우, 에러를 발생시킵니다.
              if (Object.keys(whereQuery).length === 0) {
                  if (req.body.allMode === undefined) {
                      throw new Error("query ban");
                  }
              }
          }

          // 요청 URL에 따라 해당하는 데이터를 가져오는 메서드를 호출합니다.
          if (req.url === "/getClients") {
              // 클라이언트 데이터를 가져옵니다.
              rows = await back.getClientsByQuery(whereQuery, { selfMongo });
          } else if (req.url === "/getDesigners") {
              // 디자이너 데이터를 가져옵니다.
              rows = await back.getDesignersByQuery(whereQuery, { selfMongo });
          } else if (req.url === "/getProjects") {
              // 프로젝트 데이터를 가져옵니다.
              rows = await back.getProjectsByQuery(whereQuery, { selfMongo });
          } else if (req.url === "/getContents") {
              // 콘텐츠 데이터를 가져옵니다.
              rows = await back.getContentsArrByQuery(whereQuery, { selfMongo });
          } else if (req.url === "/getBuilders") {
              // 빌더 데이터를 가져옵니다.
              rows = await back.getBuildersByQuery(whereQuery, { selfMongo });
          } else if (req.url === "/getAspirants") {
              // 지원자 데이터를 가져옵니다.
              rows = await back.getAspirantsByQuery(whereQuery, { selfMongo });
          }

          // 가져온 데이터를 클라이언트에게 JSON 형태로 응답합니다.
          res.send(JSON.stringify(rows.toNormal()));

      } catch (e) {
          // 예외 발생 시 에러를 로깅하고 클라이언트에게 에러 메시지를 응답합니다.
          logger.error(e, req).catch((e) => { console.log(e); });
          console.log(e);
          res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /pickProjects
     * @description 프로젝트를 필터링하고 선택하여 반환하는 라우터입니다. 
     *              요청 본문에서 주어진 쿼리 조건에 맞는 프로젝트를 MongoDB에서 조회합니다.
     * @param {Object} req - 요청 객체
     * @param {Object} req.body - 요청 본문
     * @param {Object} req.body.whereQuery - 필터링에 사용될 쿼리 객체
     * @param {Object} req.body.projectQuery - 프로젝트 관련 추가 쿼리 객체
     * @param {Object} res - 응답 객체
     */
    router.post([ "/pickProjects" ], async function (req, res) {
      // 응답의 Content-Type을 JSON으로 설정합니다.
      res.set({
          "Content-Type": "application/json",
          // 모든 도메인에서 접근할 수 있도록 허용합니다.
          "Access-Control-Allow-Origin": "*",
          // POST, GET, OPTIONS, HEAD 메서드를 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
          // 요청 헤더로 Content-Type, Accept, X-Requested-With을 허용합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });

      try {
          // 요청 본문에 whereQuery 또는 projectQuery가 정의되지 않은 경우, 에러를 발생시킵니다.
          if (req.body.whereQuery === undefined || req.body.projectQuery === undefined) {
              throw new Error("invalid post");
          }

          // MongoDB 인스턴스를 가져옵니다.
          const selfMongo = instance.mongo;
          // 요청 본문에서 whereQuery와 projectQuery를 추출하여 사용합니다.
          const { whereQuery, projectQuery } = equalJson(req.body);
          let rows;

          // whereQuery가 객체 타입이 아니거나 null인 경우, 에러를 발생시킵니다.
          if (typeof whereQuery !== "object" || whereQuery === null) {
              throw new Error("invalid query object");
          }
          // projectQuery가 객체 타입이 아니거나 null인 경우, 에러를 발생시킵니다.
          if (typeof projectQuery !== "object" || projectQuery === null) {
              throw new Error("invalid query object");
          }

          // MongoDB에서 주어진 쿼리 조건에 맞는 프로젝트를 선택합니다.
          rows = await back.mongoPick("project", [ whereQuery, projectQuery ], { selfMongo });

          // 프로젝트 쿼리의 proposal 값이 1인 경우에 대해 처리합니다.
          if (projectQuery.proposal === 1) {
              // detail 속성이 "true"가 아니면 프로젝트의 세부 정보에서 특정 필드를 삭제합니다.
              if (req.body.detail !== "true" && req.body.detail !== true) {
                  for (let project of rows) {
                      for (let obj of project.proposal.detail) {
                          delete obj.pictureSettings;  // pictureSettings 필드를 삭제합니다.
                          delete obj.description;  // description 필드를 삭제합니다.
                      }
                  }
              }
              // 필터링된 결과를 클라이언트에게 JSON 형태로 응답합니다.
              res.send(JSON.stringify(rows));
          } else {
              // proposal 값이 1이 아닌 경우에도 필터링된 결과를 클라이언트에게 JSON 형태로 응답합니다.
              res.send(JSON.stringify(rows));
          }

      } catch (e) {
          // 예외 발생 시 에러를 로깅하고 클라이언트에게 에러 메시지를 응답합니다.
          logger.error(e, req).catch((e) => { console.log(e); });
          console.log(e);
          res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /updateClient, /updateDesigner, /updateProject, /updateContents, /updateAspirant
     * @description 클라이언트, 디자이너, 프로젝트, 컨텐츠 또는 지원자의 데이터를 업데이트하는 라우터입니다.
     *              요청 본문에서 제공된 쿼리 조건에 맞는 데이터를 MongoDB에서 업데이트합니다.
     * @param {Object} req - 요청 객체
     * @param {Object} req.body - 요청 본문
     * @param {Object} req.body.whereQuery - 업데이트할 데이터를 찾기 위한 쿼리 객체
     * @param {Object} req.body.updateQuery - 데이터를 업데이트하기 위한 쿼리 객체
     * @param {Object} res - 응답 객체
     */
    router.post([ "/updateClient", "/updateDesigner", "/updateProject", "/updateContents", "/updateAspirant" ], async function (req, res) {
      // 응답의 Content-Type을 JSON으로 설정합니다.
      res.set({
          "Content-Type": "application/json",
          // 모든 도메인에서 접근할 수 있도록 허용합니다.
          "Access-Control-Allow-Origin": "*",
          // POST, GET, OPTIONS, HEAD 메서드를 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
          // 요청 헤더로 Content-Type, Accept, X-Requested-With을 허용합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });

      try {
          // 요청 본문에 whereQuery 또는 updateQuery가 정의되지 않은 경우, 에러를 발생시킵니다.
          if (req.body.whereQuery === undefined || req.body.updateQuery === undefined) {
              throw new Error("invalid post");
          }

          // MongoDB 인스턴스를 가져옵니다.
          const selfMongo = instance.mongo;
          // 요청 본문에서 whereQuery와 updateQuery를 추출하여 사용합니다.
          const { whereQuery, updateQuery } = equalJson(req.body);
          let data;

          // whereQuery가 객체 타입이 아니거나 null인 경우, 에러를 발생시킵니다.
          if (typeof whereQuery !== "object" || whereQuery === null) {
              throw new Error("invalid query object");
          }
          // whereQuery가 빈 객체인 경우, 업데이트를 막기 위해 에러를 발생시킵니다.
          if (Object.keys(whereQuery).length === 0) {
              throw new Error("query ban");
          }
          // updateQuery가 객체 타입이 아니거나 null인 경우, 에러를 발생시킵니다.
          if (typeof updateQuery !== "object" || updateQuery === null) {
              throw new Error("invalid query object");
          }

          // 요청 URL에 따라 다른 업데이트 함수 호출
          if (req.url === "/updateClient") {
              // 클라이언트 데이터를 업데이트합니다.
              data = await back.updateClient([ whereQuery, updateQuery ], { selfMongo });
          } else if (req.url === "/updateDesigner") {
              // 디자이너 데이터를 업데이트합니다.
              data = await back.updateDesigner([ whereQuery, updateQuery ], { selfMongo });
          } else if (req.url === "/updateProject") {
              // 프로젝트 데이터를 업데이트합니다.
              data = await back.updateProject([ whereQuery, updateQuery ], { selfMongo });
          } else if (req.url === "/updateContents") {
              // 컨텐츠 데이터를 업데이트합니다.
              data = await back.updateContents([ whereQuery, updateQuery ], { selfMongo });
          } else if (req.url === "/updateAspirant") {
              // 지원자 데이터를 업데이트합니다.
              data = await back.updateAspirant([ whereQuery, updateQuery ], { selfMongo });
          }

          // 업데이트 결과를 클라이언트에게 JSON 형식으로 응답합니다.
          res.send(JSON.stringify({ message: data }));

      } catch (e) {
          // 예외 발생 시 에러를 로깅하고 클라이언트에게 에러 메시지를 응답합니다.
          logger.error(e, req).catch((e) => { console.log(e); });
          console.log(e);
          res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /designerProjects
     * @description 주어진 디자이너 ID(desid)에 해당하는 디자이너의 프로젝트와 관련된 클라이언트 정보를 가져옵니다.
     * @param {Object} req - 요청 객체
     * @param {Object} req.body - 요청 본문
     * @param {string} req.body.desid - 디자이너 ID
     * @param {Object} res - 응답 객체
     */
    router.post([ "/designerProjects" ], async function (req, res) {
      // 응답의 Content-Type을 JSON으로 설정합니다.
      res.set({
          "Content-Type": "application/json",
          // 모든 도메인에서 접근할 수 있도록 허용합니다.
          "Access-Control-Allow-Origin": "*",
          // POST, GET, OPTIONS, HEAD 메서드를 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
          // 요청 헤더로 Content-Type, Accept, X-Requested-With을 허용합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });

      try {
          // 요청 본문에 desid가 정의되지 않은 경우, 에러를 발생시킵니다.
          if (req.body.desid === undefined) {
              throw new Error("invalid post");
          }

          // MongoDB 인스턴스를 가져옵니다.
          const selfMongo = instance.mongo;
          // 요청 본문에서 desid를 추출합니다.
          const { desid } = req.body;

          // 주어진 desid에 해당하는 디자이너 정보를 가져옵니다.
          const designer = await back.getDesignerById(desid, { selfMongo });

          // 주어진 desid에 해당하는 모든 프로젝트를 가져옵니다.
          const totalProject = await back.getProjectsByQuery({
              $or: [
                  {
                      "proposal.detail": {
                          $elemMatch: { desid } // 프로젝트 제안서의 디테일 중 desid가 포함된 프로젝트를 찾습니다.
                      }
                  },
                  {
                      desid: desid // 직접적으로 desid가 연결된 프로젝트를 찾습니다.
                  }
              ]
          }, { selfMongo });

          let contractProjects, proposalProjects;
          let totalClient;
          let cliidArr;

          // 계약된 프로젝트를 필터링합니다.
          contractProjects = totalProject.toNormal().filter((obj) => {
              return obj.desid === desid; // desid가 일치하는 프로젝트를 필터링합니다.
          });

          // 제안된 프로젝트를 필터링합니다.
          proposalProjects = totalProject.toNormal().filter((obj) => {
              return obj.proposal.detail.some((o) => { return o.desid === desid }); // 제안서에 desid가 포함된 프로젝트를 필터링합니다.
          });

          // 계약된 프로젝트와 제안된 프로젝트의 cliid(클라이언트 ID)를 배열로 만듭니다.
          cliidArr = contractProjects.map((obj) => { return obj.cliid }).concat(proposalProjects.map((obj) => { return obj.cliid }));
          // 중복된 클라이언트 ID를 제거합니다.
          cliidArr = [ ...new Set(cliidArr) ];
          // cliid 배열을 MongoDB 쿼리에 맞게 변환합니다.
          cliidArr = cliidArr.map((cliid) => { return { cliid } });

          if (cliidArr.length === 0) {
              // 클라이언트 ID가 없으면 빈 배열로 설정합니다.
              totalClient = [];
          } else {
              // 해당 클라이언트 ID를 가진 클라이언트 정보를 MongoDB에서 가져옵니다.
              totalClient = (await back.getClientsByQuery({ $or: cliidArr }, { selfMongo })).toNormal();
          }

          // 최종적으로 클라이언트 정보, 계약된 프로젝트, 제안된 프로젝트, 디자이너 정보를 JSON 형식으로 응답합니다.
          res.send(JSON.stringify({ totalClient, contractProjects, proposalProjects, designer: designer.toNormal() }));

      } catch (e) {
          // 예외 발생 시 에러를 로깅하고 클라이언트에게 에러 메시지를 응답합니다.
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /getChecklist
     * @description 체크리스트 데이터를 가져오는 API. 'service' 컬렉션에서 'checklist' 종류의 데이터를 조회하고, 특정 형식으로 가공하여 반환합니다.
     * @param {Object} req - 요청 객체
     * @param {Object} res - 응답 객체
     */
    router.post([ "/getChecklist" ], async function (req, res) {
      // 응답 헤더 설정: JSON 형식으로 응답하며, CORS 정책에 따라 모든 도메인에서의 접근을 허용합니다.
      res.set({
          "Content-Type": "application/json", // 응답의 데이터 형식을 JSON으로 설정
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근 허용
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용할 HTTP 메서드 설정
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 요청 헤더로 허용할 필드 설정
      });

      try {
          // MongoDB 인스턴스를 가져옵니다.
          const selfMongo = instance.mongo;
          // 'service' 컬렉션을 사용할 것임을 선언합니다.
          const collection = "service";
          // 'service' 컬렉션에서 kind가 'checklist'인 모든 문서를 조회합니다.
          const services = await back.mongoRead(collection, { kind: "checklist" }, { selfMongo });
          let contents;

          // serid의 숫자 값을 기준으로 오름차순 정렬합니다.
          services.sort((a, b) => { return Number(a.serid.replace(/[^0-9]/gi, '')) - Number(b.serid.replace(/[^0-9]/gi, '')) });

          // services 배열의 각 객체를 특정 형식으로 가공하여 새로운 contents 배열을 만듭니다.
          contents = services.map((obj) => {
              return {
                  title: obj.setting.contents.title, // 각 서비스의 제목
                  key: obj.key, // 각 서비스의 고유 키 값
                  target: obj.setting.target.action, // 각 서비스가 타겟으로 하는 액션
                  checklist: obj.setting.contents.checklist, // 각 서비스의 체크리스트 항목들
                  children: obj.setting.children, // 각 서비스의 하위 항목들
              }
          });

          // 가공된 contents 배열을 JSON 형식으로 응답합니다.
          res.send(JSON.stringify(contents));

      } catch (e) {
          // 오류 발생 시 오류 로그를 기록하고 클라이언트에 오류 메시지를 JSON 형식으로 응답합니다.
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /projectDesignerMemo
     * @description 디자이너 메모를 프로젝트에 저장하거나 조회하는 API. 메모를 가져오거나 업데이트하는 기능을 제공합니다.
     * @param {Object} req - 요청 객체
     * @param {Object} res - 응답 객체
     */
    router.post([ "/projectDesignerMemo" ], async function (req, res) {
      // 응답 헤더 설정: JSON 형식으로 응답하며, CORS 정책에 따라 모든 도메인에서의 접근을 허용합니다.
      res.set({
          "Content-Type": "application/json", // 응답의 데이터 형식을 JSON으로 설정
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근 허용
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용할 HTTP 메서드 설정
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 요청 헤더로 허용할 필드 설정
      });

      try {
          // 요청 본문에 필요한 필드가 누락되었는지 확인합니다.
          if (req.body.mode === undefined || req.body.desid === undefined || req.body.proid === undefined || req.body.key === undefined || req.body.memo === undefined) {
              // 필수 필드가 누락된 경우 에러를 발생시킵니다.
              throw new Error("invaild post");
          }

          // MongoDB 인스턴스를 가져옵니다.
          const selfMongo = mongo;
          // 사용할 컬렉션 이름을 설정합니다.
          const collection = "projectDesignerMemo";
          // 요청 본문에서 필요한 필드를 구조 분해 할당합니다.
          const { mode, desid, proid, key, memo } = req.body;
          let resultObj; // 결과 객체를 저장할 변수입니다.
          let rows; // 데이터베이스에서 조회한 결과를 저장할 변수입니다.
          let json; // 데이터베이스에 저장할 JSON 객체를 정의합니다.
          let id; // 메모의 고유 식별자를 저장할 변수입니다.

          // 고유 식별자를 프로젝트 ID와 키를 조합하여 생성합니다.
          id = proid + "_" + key;

          // 데이터베이스에 저장할 JSON 객체를 구성합니다.
          json = {
              proid, // 프로젝트 ID
              desid, // 디자이너 ID
              key: id, // 고유 식별자
              contents: {
                  memo, // 메모 내용
                  type: key, // 메모의 종류
              }
          };

          // 요청된 작업이 'get'일 경우 처리합니다.
          if (mode === "get") {
              // 데이터베이스에서 해당 메모를 조회합니다.
              rows = await back.mongoRead(collection, { key: id }, { selfMongo });
              if (rows.length === 0) {
                  // 해당 메모가 존재하지 않을 경우, 새로운 메모를 생성합니다.
                  await back.mongoCreate(collection, json, { selfMongo });
                  resultObj = json;
              } else {
                  // 해당 메모가 존재할 경우, 그 메모를 결과 객체에 저장합니다.
                  resultObj = rows[0];
              }

          // 요청된 작업이 'update'일 경우 처리합니다.
          } else if (mode === "update") {
              // 데이터베이스에서 해당 메모를 조회합니다.
              rows = await back.mongoRead(collection, { key: id }, { selfMongo });
              if (rows.length === 0) {
                  // 해당 메모가 존재하지 않을 경우, 새로운 메모를 생성합니다.
                  await back.mongoCreate(collection, json, { selfMongo });
              } else {
                  // 해당 메모가 존재할 경우, 메모 내용을 업데이트합니다.
                  await back.mongoUpdate(collection, [ { key: id }, { "contents.memo": memo } ], { selfMongo });
              }

              // 성공 메시지를 결과 객체에 저장합니다.
              resultObj = { message: "success" };
          }

          // 결과 객체를 클라이언트에게 JSON 형식으로 응답합니다.
          res.send(JSON.stringify(resultObj));

      } catch (e) {
          // 오류 발생 시 오류 로그를 기록하고 클라이언트에 오류 메시지를 JSON 형식으로 응답합니다.
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /projectDesignerRaw
     * @description 해당 프로젝트의 디자이너의 글의 원본 내용을 저장, 조회, 업데이트 또는 삭제하는 API입니다.
     * @param {Object} req - 요청 객체
     * @param {Object} res - 응답 객체
     */
    router.post([ "/projectDesignerRaw" ], async function (req, res) {
      // 응답 헤더 설정: JSON 형식으로 응답하며, CORS 정책에 따라 모든 도메인에서의 접근을 허용합니다.
      res.set({
          "Content-Type": "application/json", // 응답의 데이터 형식을 JSON으로 설정
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근 허용
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용할 HTTP 메서드 설정
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 요청 헤더로 허용할 필드 설정
      });

      try {
          // 요청 본문에 필요한 필드가 누락되었는지 확인합니다.
          if (req.body.mode === undefined || req.body.desid === undefined || req.body.cliid === undefined || req.body.proid === undefined) {
              // 필수 필드가 누락된 경우 에러를 발생시킵니다.
              throw new Error("invaild post");
          }

          // MongoDB 인스턴스를 가져옵니다.
          const selfMongo = mongo;
          // 사용할 컬렉션 이름을 설정합니다.
          const collection = "designerRawContents";
          // 요청 본문에서 필요한 필드를 구조 분해 할당합니다.
          const { mode, desid, proid, cliid } = req.body;
          let resultObj; // 결과 객체를 저장할 변수입니다.
          let rows; // 데이터베이스에서 조회한 결과를 저장할 변수입니다.
          let json; // 데이터베이스에 저장할 JSON 객체를 정의합니다.
          let body, type; // 요청 본문에서 가져온 내용을 저장할 변수들입니다.

          // body 필드가 문자열이면 그 값을 저장하고, 그렇지 않으면 빈 문자열로 설정합니다.
          if (typeof req.body.body === "string") {
              body = req.body.body;
          } else {
              body = "";
          }

          // type 필드가 문자열이면 그 값을 저장하고, 그렇지 않으면 기본 값으로 "docx"를 설정합니다.
          if (typeof req.body.type === "string") {
              type = req.body.type;
          } else {
              type = "docx";
          }

          // 데이터베이스에 저장할 JSON 객체를 구성합니다.
          json = {
              proid, // 프로젝트 ID
              desid, // 디자이너 ID
              cliid, // 클라이언트 ID
              date: new Date(), // 현재 날짜와 시간을 저장
              contents: {
                  body, // 본문 내용
                  type, // 본문의 타입 (예: docx)
              }
          };

          // 요청된 작업이 'get'일 경우 처리합니다.
          if (mode === "get") {
              // 데이터베이스에서 해당 프로젝트 ID로 데이터를 조회합니다.
              rows = await back.mongoRead(collection, { proid }, { selfMongo });
              if (rows.length === 0) {
                  // 해당 데이터가 존재하지 않을 경우, 새로운 데이터를 생성합니다.
                  await back.mongoCreate(collection, json, { selfMongo });
                  resultObj = json;
              } else {
                  // 해당 데이터가 존재할 경우, 그 데이터를 결과 객체에 저장합니다.
                  resultObj = rows[0];
              }

          // 요청된 작업이 'update'일 경우 처리합니다.
          } else if (mode === "update") {
              // 데이터베이스에서 해당 프로젝트 ID로 데이터를 조회합니다.
              rows = await back.mongoRead(collection, { proid }, { selfMongo });
              if (rows.length === 0) {
                  // 해당 데이터가 존재하지 않을 경우, 새로운 데이터를 생성합니다.
                  await back.mongoCreate(collection, json, { selfMongo });
              } else {
                  // 해당 데이터가 존재할 경우, 본문 내용과 타입, 그리고 날짜를 업데이트합니다.
                  await back.mongoUpdate(collection, [ { proid }, { "contents.body": body, "contents.type": type, "date": new Date() } ], { selfMongo });
              }

              // 성공 메시지를 결과 객체에 저장합니다.
              resultObj = { message: "success" };

          // 요청된 작업이 'delete'일 경우 처리합니다.
          } else if (mode === "delete") {
              // 해당 디자이너 ID와 프로젝트 ID로 데이터를 삭제합니다.
              await back.mongoDelete(collection, { desid, proid }, { selfMongo });
              resultObj = { message: "success" };
          }

          // 결과 객체를 클라이언트에게 JSON 형식으로 응답합니다.
          res.send(JSON.stringify(resultObj));

      } catch (e) {
          // 오류 발생 시 오류 로그를 기록하고 클라이언트에 오류 메시지를 JSON 형식으로 응답합니다.
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /getProcessData
     * @description 이 라우트는 클라이언트에서 프로젝트 ID 배열을 받아 MongoDB에서 해당 데이터를 조회하고, 이를 가공하여 클라이언트에 반환합니다.
     * @param {object} req - 클라이언트 요청 객체.
     * @param {object} req.body - 요청 본문 객체.
     * @param {array} req.body.proidArr - 클라이언트에서 전달된 프로젝트 ID 배열.
     * @param {object} res - 서버 응답 객체.
     */
    router.post(["/getProcessData"], async function (req, res) {
      /**
       * @description 응답 헤더를 설정합니다. 응답을 JSON 형식으로 반환하고,
       * 모든 출처에서의 접근을 허용하며, 특정 HTTP 메서드와 헤더를 허용합니다.
       */
      res.set({
        "Content-Type": "application/json", // 응답의 Content-Type을 JSON으로 설정합니다.
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 지정합니다.
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 요청 헤더를 지정합니다.
      });

      try {
        /**
         * @description 클라이언트에서 전달된 프로젝트 ID 배열(proidArr)이 존재하지 않으면
         * "invalid post 1" 오류를 발생시킵니다.
         */
        if (req.body.proidArr === undefined) {
          throw new Error("invalid post 1"); // 오류 메시지를 던져 예외 처리를 강제합니다.
        }

        /**
         * @description MongoDB 클라이언트 인스턴스를 selfMongo 변수에 할당합니다.
         * 이 변수는 이후 MongoDB와의 상호작용에서 사용됩니다.
         */
        const selfMongo = mongo;

        /**
         * @description MongoDB에서 조회할 컬렉션 이름을 정의합니다.
         * 'designerRawContents'는 디자이너의 원시 콘텐츠 데이터를 저장하는 컬렉션입니다.
         */
        const collection = "designerRawContents";

        /**
         * @description MongoDB에서 로그 데이터를 조회할 컬렉션 이름을 정의합니다.
         * 'projectDesignerSend'는 프로젝트 관련 로그 데이터를 저장하는 컬렉션입니다.
         */
        const logCollection = "projectDesignerSend";

        /**
         * @description req.body를 equalJson 메서드를 사용해 DeepCopy 처리하여 
         * proidArr 값을 추출합니다. 이 과정은 데이터를 변형 없이 
         * 원본 상태에서 필요한 부분만을 가져오는 역할을 합니다.
         */
        const { proidArr } = equalJson(req.body);

        let rows; // MongoDB에서 조회한 원시 콘텐츠 데이터를 담을 변수
        let tong; // 가공된 데이터를 담을 배열
        let rows2; // MongoDB에서 조회한 로그 데이터를 담을 변수
        let tong2; // 가공된 로그 데이터를 담을 배열

        /**
         * @description proidArr이 배열이 아닌 경우, "invalid post 2" 오류를 발생시킵니다.
         * 이 검사는 입력 데이터의 유효성을 확인하는 중요한 단계입니다.
         */
        if (!Array.isArray(proidArr)) {
          throw new Error("invalid post 2"); // 오류 메시지를 던져 예외 처리를 강제합니다.
        }

        /**
         * @description proidArr 배열이 비어 있는 경우, "invalid post 3" 오류를 발생시킵니다.
         * 이는 빈 배열이 전달될 때의 예외 처리를 담당합니다.
         */
        if (proidArr.length === 0) {
          throw new Error("invalid post 3"); // 오류 메시지를 던져 예외 처리를 강제합니다.
        }

        /**
         * @description back.mongoRead 메서드를 사용하여 MongoDB의 
         * 'designerRawContents' 컬렉션에서 데이터를 조회합니다.
         * 조회 조건으로 프로젝트 ID 배열(proidArr)을 사용하며, 이는 각 
         * 프로젝트 ID에 대한 조건을 $or 연산자를 사용해 연결한 형태입니다.
         * selfMongo는 MongoDB와의 연결을 나타내며, 이 인스턴스를 통해 
         * 데이터베이스 작업이 수행됩니다.
         */
        rows = await back.mongoRead(
          collection, // 조회할 컬렉션 이름
          { $or: proidArr.map((proid) => { return { proid } }) }, // $or 연산자로 묶인 조회 조건
          { selfMongo } // MongoDB 클라이언트 인스턴스
        );

        tong = []; // 조회된 데이터를 가공하여 담을 배열을 초기화합니다.

        /**
         * @description 조회된 원시 콘텐츠 데이터를 순회하며, 각 데이터에서 
         * 필요한 정보를 추출해 tong 배열에 담습니다.
         */
        for (let row of rows) {
          tong.push({
            proid: row.proid, // 프로젝트 ID를 tong에 추가
            desid: row.desid, // 디자이너 ID를 tong에 추가
            cliid: row.cliid, // 클라이언트 ID를 tong에 추가
            date: row.date // 날짜 정보를 tong에 추가
          });
        }

        /**
         * @description back.mongoRead 메서드를 사용하여 MongoDB의 
         * 'projectDesignerSend' 컬렉션에서 로그 데이터를 조회합니다.
         * 조회 조건은 이전과 동일하게 프로젝트 ID 배열(proidArr)을 기반으로 합니다.
         */
        rows2 = await back.mongoRead(
          logCollection, // 조회할 로그 컬렉션 이름
          { $or: proidArr.map((proid) => { return { proid } }) }, // $or 연산자로 묶인 조회 조건
          { selfMongo } // MongoDB 클라이언트 인스턴스
        );

        tong2 = []; // 조회된 로그 데이터를 가공하여 담을 배열을 초기화합니다.

        /**
         * @description 조회된 로그 데이터를 순회하며, 각 데이터에서 
         * 필요한 정보를 추출해 tong2 배열에 담습니다.
         */
        for (let row of rows2) {
          tong2.push({
            proid: row.proid, // 프로젝트 ID를 tong2에 추가
            desid: row.designer.desid, // 디자이너 ID를 tong2에 추가
            cliid: row.client.cliid, // 클라이언트 ID를 tong2에 추가
            date: row.date, // 날짜 정보를 tong2에 추가
            type: row.type, // 로그 타입 정보를 tong2에 추가
          });
        }

        /**
         * @description 클라이언트에 응답을 JSON 형식으로 전송합니다. 
         * 조회된 데이터를 rawContents, sendStatus, sendSchedule, sendFile로 분류하여 반환합니다.
         * - rawContents: 디자이너 원시 콘텐츠 데이터
         * - sendStatus: 전송된 상태 데이터 (type이 'status'인 항목)
         * - sendSchedule: 전송된 일정 데이터 (type이 'schedule'인 항목)
         * - sendFile: 전송된 파일 데이터 (type이 'file'인 항목)
         */
        res.send(JSON.stringify({
          rawContents: tong, // 가공된 원시 콘텐츠 데이터를 반환
          sendStatus: tong2.filter((obj) => { return obj.type === "status" }), // 상태 데이터만 필터링하여 반환
          sendSchedule: tong2.filter((obj) => { return obj.type === "schedule" }), // 일정 데이터만 필터링하여 반환
          sendFile: tong2.filter((obj) => { return obj.type === "file" }) // 파일 데이터만 필터링하여 반환
        }));

      } catch (e) {
        /**
         * @description 예외 발생 시, 발생한 오류를 로그로 기록하고,
         * 오류 메시지를 JSON 형식으로 클라이언트에 응답합니다.
         */
        logger.error(e, req).catch((e) => { console.log(e); }); // 로그에 오류 기록
        res.send(JSON.stringify({ error: e.message })); // 오류 메시지를 JSON으로 클라이언트에 전송
      }
    });
    
    /**
     * @route POST /projectDesignerSchedule
     * @description 이 라우트는 클라이언트에서 전달된 요청 모드에 따라 MongoDB에서 프로젝트 디자이너 일정 데이터를 조회, 생성, 업데이트, 삭제하거나 원본 일정을 반환합니다.
     * @param {object} req - 클라이언트 요청 객체.
     * @param {object} req.body - 요청 본문 객체.
     * @param {string} req.body.mode - 요청 모드 ("get", "create", "update", "delete", "original", "boo").
     * @param {string} req.body.desid - 디자이너 ID.
     * @param {string} req.body.proid - 프로젝트 ID.
     * @param {object} res - 서버 응답 객체.
     */
    router.post([ "/projectDesignerSchedule" ], async function (req, res) {
      /**
       * @description 응답 헤더를 설정합니다. 응답을 JSON 형식으로 반환하고,
       * 모든 출처에서의 접근을 허용하며, 특정 HTTP 메서드와 헤더를 허용합니다.
       */
      res.set({
        "Content-Type": "application/json", // 응답의 Content-Type을 JSON으로 설정합니다.
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 지정합니다.
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 요청 헤더를 지정합니다.
      });

      try {
        /**
         * @description 요청 본문에 mode, desid, proid가 존재하지 않으면 "invalid post" 오류를 발생시킵니다.
         * 이는 요청 데이터의 필수 요소가 모두 있는지 확인하는 단계입니다.
         */
        if (req.body.mode === undefined || req.body.desid === undefined || req.body.proid === undefined) {
          throw new Error("invaild post"); // 필수 요청 데이터가 없을 경우 예외를 던집니다.
        }

        /**
         * @description MongoDB 클라이언트 인스턴스를 selfMongo 변수에 할당합니다.
         * 이 변수는 이후 MongoDB와의 상호작용에서 사용됩니다.
         */
        const selfMongo = mongo;

        /**
         * @description MongoDB에서 조회할 컬렉션 이름을 정의합니다.
         * 'projectDesignerSchedule'은 프로젝트 디자이너의 일정 데이터를 저장하는 컬렉션입니다.
         */
        const collection = "projectDesignerSchedule";

        /**
         * @description 요청 본문에서 mode, desid, proid 값을 추출합니다.
         * 이는 이후 로직에서 이들 값에 따라 데이터베이스 작업을 결정하는 데 사용됩니다.
         */
        const { mode, desid, proid } = req.body;

        let resultObj; // 클라이언트에 반환할 결과 객체를 저장할 변수
        let rows; // MongoDB에서 조회한 데이터를 담을 변수
        let schedule; // 생성 또는 업데이트할 일정을 저장할 변수
        let createQuery; // MongoDB에 새로운 데이터를 생성할 때 사용할 쿼리 객체
        let whereQuery, updateQuery; // MongoDB 데이터를 업데이트할 때 사용할 조건 및 업데이트 쿼리 객체
        let thisRow; // 특정 조건에 맞는 MongoDB 데이터를 담을 변수
        let project; // 프로젝트 데이터를 담을 변수
        let originalContents; // 원본 일정 데이터를 저장할 변수
        let startDate; // 프로젝트 시작일을 저장할 변수
        let after7, after14, after21, after28, after35, after42, after49, after56, after63, after70; // 일정의 특정 날짜들을 저장할 변수들
        let emptyDate; // 초기화된 빈 날짜를 저장할 변수
        let boo; // 일정의 유효성을 판단하는 플래그 변수

        /**
         * @description mode 값이 "get"인 경우, MongoDB에서 프로젝트 ID에 해당하는 일정을 조회하여 resultObj에 저장합니다.
         */
        if (mode === "get") {
        
          rows = await back.mongoRead(collection, { proid }, { selfMongo }); // MongoDB에서 프로젝트 ID로 일정 조회
          resultObj = rows; // 조회된 데이터를 resultObj에 저장
        
        /**
         * @description mode 값이 "create"인 경우, 요청 본문에서 schedule 값을 추출하고 이를 기반으로 새로운 일정을 생성합니다.
         */
        } else if (mode === "create") {
        
          schedule = equalJson(req.body.schedule); // 요청 본문에서 schedule을 DeepCopy하여 추출
          createQuery = { proid, desid, schedule }; // 생성할 쿼리 객체를 정의
          await back.mongoCreate(collection, createQuery, { selfMongo }); // MongoDB에 새로운 일정 데이터를 생성
        
          resultObj = createQuery; // 생성된 데이터를 resultObj에 저장
        
        /**
         * @description mode 값이 "update"인 경우, whereQuery와 updateQuery 값을 추출하여 기존 일정을 업데이트합니다.
         */
        } else if (mode === "update") {
        
          whereQuery = equalJson(req.body.whereQuery); // 업데이트할 조건을 DeepCopy하여 추출
          updateQuery = equalJson(req.body.updateQuery); // 업데이트할 데이터를 DeepCopy하여 추출
        
          await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo }); // 조건에 맞는 데이터를 업데이트
        
          thisRow = await back.mongoRead(collection, whereQuery, { selfMongo }); // 업데이트된 데이터를 조회
        
          /**
           * @description 조회된 데이터가 없으면 오류 메시지를 반환하고, 그렇지 않으면 해당 데이터를 반환합니다.
           */
          if (thisRow.length === 0) {
            resultObj = { message: "error" }; // 데이터가 없으면 오류 메시지를 설정
          } else {
            resultObj = thisRow[0]; // 조회된 첫 번째 데이터를 resultObj에 저장
          }
        
        /**
         * @description mode 값이 "delete"인 경우, 프로젝트 ID에 해당하는 일정을 삭제합니다.
         */
        } else if (mode === "delete") {
        
          whereQuery = { proid }; // 삭제할 조건을 프로젝트 ID로 설정
          await back.mongoDelete(collection, whereQuery, { selfMongo }); // 조건에 맞는 데이터를 삭제
          resultObj = { message: "success" }; // 성공 메시지를 resultObj에 저장
        
        /**
         * @description mode 값이 "original"인 경우, 원본 일정 데이터를 생성하여 반환합니다.
         */
        } else if (mode === "original") {
        
          project = await back.getProjectById(proid, { selfMongo: instance.mongo }); // 프로젝트 데이터를 조회
        
          emptyDate = new Date(1800, 0, 1); // 초기화된 빈 날짜를 생성
        
          startDate = new Date(JSON.stringify(project.process.contract.form.date.from).slice(1, -1)); // 계약 시작일을 설정
          after7 = new Date(JSON.stringify(project.process.contract.form.date.from).slice(1, -1)); // 계약 시작일로부터 7일 후
          after7.setDate(after7.getDate() + 7); // 7일을 더한 날짜를 설정
          after14 = new Date(JSON.stringify(project.process.contract.form.date.from).slice(1, -1)); // 계약 시작일로부터 14일 후
          after14.setDate(after14.getDate() + 14); // 14일을 더한 날짜를 설정
          after21 = new Date(JSON.stringify(project.process.contract.form.date.from).slice(1, -1)); // 계약 시작일로부터 21일 후
          after21.setDate(after21.getDate() + 21); // 21일을 더한 날짜를 설정
          after28 = new Date(JSON.stringify(project.process.contract.form.date.from).slice(1, -1)); // 계약 시작일로부터 28일 후
          after28.setDate(after28.getDate() + 28); // 28일을 더한 날짜를 설정
          after35 = new Date(JSON.stringify(project.process.contract.form.date.from).slice(1, -1)); // 계약 시작일로부터 35일 후
          after35.setDate(after35.getDate() + 35); // 35일을 더한 날짜를 설정
          after42 = new Date(JSON.stringify(project.process.contract.form.date.from).slice(1, -1)); // 계약 시작일로부터 42일 후
          after42.setDate(after42.getDate() + 42); // 42일을 더한 날짜를 설정
          after49 = new Date(JSON.stringify(project.process.contract.form.date.from).slice(1, -1)); // 계약 시작일로부터 49일 후
          after49.setDate(after49.getDate() + 49); // 49일을 더한 날짜를 설정
          after56 = new Date(JSON.stringify(project.process.contract.form.date.from).slice(1, -1)); // 계약 시작일로부터 56일 후
          after56.setDate(after56.getDate() + 56); // 56일을 더한 날짜를 설정
          after63 = new Date(JSON.stringify(project.process.contract.form.date.from).slice(1, -1)); // 계약 시작일로부터 63일 후
          after63.setDate(after63.getDate() + 63); // 63일을 더한 날짜를 설정
          after70 = new Date(JSON.stringify(project.process.contract.form.date.from).slice(1, -1)); // 계약 시작일로부터 70일 후
          after70.setDate(after70.getDate() + 70); // 70일을 더한 날짜를 설정
        
          /**
           * @description 서비스 종류에 따라 원본 일정 콘텐츠를 생성합니다.
           * 홈퍼니싱과 홈스타일링 서비스에 따라 다른 일정이 설정됩니다.
           */
          if (/홈퍼니싱/gi.test(serviceParsing(project.service))) {
            originalContents = {
              schedule: [
                {
                  title: "현장 미팅", // 일정 제목
                  description: "현장에서 고객님과 미팅 후 실측과 스타일링의 방향을 정합니다.", // 일정 설명
                  date: {
                    start: project.process.contract.meeting.date, // 시작 날짜
                    end: project.process.contract.meeting.date, // 종료 날짜
                  },
                },
                {
                  title: "계약 시작일",
                  description: "계약서상 프로젝트 시작일입니다. 본격적인 디자인 작업이 시작됩니다.",
                  date: {
                    start: startDate,
                    end: startDate,
                  },
                },
                {
                  title: "컨셉 제안서",
                  description: "전체적인 디자인 방향을 정할 컨셉 제안서 입니다.",
                  date: {
                    start: emptyDate,
                    end: emptyDate,
                  },
                },
                {
                  title: "1차 디자인 제안서",
                  description: "컨셉을 바탕으로 구체적인 디자인 시안을 1차적으로 제공드립니다.",
                  date: {
                    start: emptyDate,
                    end: emptyDate,
                  },
                },
                {
                  title: "제안서 수정 작업",
                  description: "디자인 제안서의 수정 사항을 반영하여 수정 작업을 진행하는 기간입니다.",
                  date: {
                    start: emptyDate,
                    end: emptyDate,
                  },
                },
                {
                  title: "제품 리스트",
                  description: "디자인 제안서에 나와 있는 제품의 구체적인 리스트를 제공합니다.",
                  date: {
                    start: emptyDate,
                    end: emptyDate,
                  },
                },
                {
                  title: "제품 구매 및 배송",
                  description: "리스트에 나온 제품들을 실제로 구매하고 배송을 기다리는 기간입니다.",
                  date: {
                    start: emptyDate,
                    end: emptyDate,
                  },
                },
                {
                  title: "제품 설치 및 세팅",
                  description: "배송된 가구, 가전, 패브릭 등의 설치와 세팅이 진행되는 기간입니다.",
                  date: {
                    start: emptyDate,
                    end: emptyDate,
                  },
                },
              ]
            };
          } else if (/홈스타일링/gi.test(serviceParsing(project.service))) {
            originalContents = {
              schedule: [
                {
                  title: "현장 미팅",
                  description: "현장에서 고객님과 미팅 후 실측과 스타일링의 방향을 정합니다.",
                  date: {
                    start: project.process.contract.meeting.date,
                    end: project.process.contract.meeting.date,
                  },
                },
                {
                  title: "계약 시작일",
                  description: "계약서상 프로젝트 시작일입니다. 본격적인 디자인 작업이 시작됩니다.",
                  date: {
                    start: startDate,
                    end: startDate,
                  },
                },
                {
                  title: "컨셉 제안서",
                  description: "전체적인 디자인 방향을 정할 컨셉 제안서 입니다.",
                  date: {
                    start: emptyDate,
                    end: emptyDate,
                  },
                },
                {
                  title: "1차 디자인 제안서",
                  description: "컨셉을 바탕으로 구체적인 디자인 시안을 1차적으로 제공드립니다.",
                  date: {
                    start: emptyDate,
                    end: emptyDate,
                  },
                },
                {
                  title: "제안서 수정 작업",
                  description: "디자인 제안서의 수정 사항을 반영하여 수정 작업을 진행하는 기간입니다.",
                  date: {
                    start: emptyDate,
                    end: emptyDate,
                  },
                },
                {
                  title: "제품 리스트",
                  description: "디자인 제안서에 나와 있는 제품의 구체적인 리스트를 제공합니다.",
                  date: {
                    start: emptyDate,
                    end: emptyDate,
                  },
                },
                {
                  title: "시공 의뢰서",
                  description: "구체적으로 어떤 시공을 어떻게 진행할 지에 대한 의뢰서입니다.",
                  date: {
                    start: emptyDate,
                    end: emptyDate,
                  },
                },
                {
                  title: "시공 견적서",
                  description: "시공 의뢰서를 바탕으로 정해진 시공 내역에 대한 견적서 입니다.",
                  date: {
                    start: emptyDate,
                    end: emptyDate,
                  },
                },
                {
                  title: "시공 진행",
                  description: "시공 의뢰서에 나온 시공 내역대로 실제 시공을 진행하는 기간입니다.",
                  date: {
                    start: emptyDate,
                    end: emptyDate,
                  },
                },
                {
                  title: "제품 구매 및 배송",
                  description: "리스트에 나온 제품들을 실제로 구매하고 배송을 기다리는 기간입니다.",
                  date: {
                    start: emptyDate,
                    end: emptyDate,
                  },
                },
                {
                  title: "제품 설치 및 세팅",
                  description: "배송된 가구, 가전, 패브릭 등의 설치와 세팅이 진행되는 기간입니다.",
                  date: {
                    start: emptyDate,
                    end: emptyDate,
                  },
                },
              ]
            };
          } else {
            originalContents = {
              schedule: [
                {
                  title: "현장 미팅",
                  description: "현장에서 고객님과 미팅 후 실측과 스타일링의 방향을 정합니다.",
                  date: {
                    start: project.process.contract.meeting.date,
                    end: project.process.contract.meeting.date,
                  },
                },
                {
                  title: "계약 시작일",
                  description: "계약서상 프로젝트 시작일입니다. 본격적인 디자인 작업이 시작됩니다.",
                  date: {
                    start: startDate,
                    end: startDate,
                  },
                },
                {
                  title: "컨셉 제안서",
                  description: "전체적인 디자인 방향을 정할 컨셉 제안서 입니다.",
                  date: {
                    start: emptyDate,
                    end: emptyDate,
                  },
                },
                {
                  title: "1차 디자인 제안서",
                  description: "컨셉을 바탕으로 구체적인 디자인 시안을 1차적으로 제공드립니다.",
                  date: {
                    start: emptyDate,
                    end: emptyDate,
                  },
                },
                {
                  title: "제안서 수정 작업",
                  description: "디자인 제안서의 수정 사항을 반영하여 수정 작업을 진행하는 기간입니다.",
                  date: {
                    start: emptyDate,
                    end: emptyDate,
                  },
                },
                {
                  title: "제품 리스트",
                  description: "디자인 제안서에 나와 있는 제품의 구체적인 리스트를 제공합니다.",
                  date: {
                    start: emptyDate,
                    end: emptyDate,
                  },
                },
                {
                  title: "시공 의뢰서",
                  description: "구체적으로 어떤 시공을 어떻게 진행할 지에 대한 의뢰서입니다.",
                  date: {
                    start: emptyDate,
                    end: emptyDate,
                  },
                },
                {
                  title: "시공 견적서",
                  description: "시공 의뢰서를 바탕으로 정해진 시공 내역에 대한 견적서 입니다.",
                  date: {
                    start: emptyDate,
                    end: emptyDate,
                  },
                },
                {
                  title: "시공 진행",
                  description: "시공 의뢰서에 나온 시공 내역대로 실제 시공을 진행하는 기간입니다.",
                  date: {
                    start: emptyDate,
                    end: emptyDate,
                  },
                },
                {
                  title: "제품 구매 및 배송",
                  description: "리스트에 나온 제품들을 실제로 구매하고 배송을 기다리는 기간입니다.",
                  date: {
                    start: emptyDate,
                    end: emptyDate,
                  },
                },
                {
                  title: "제품 설치 및 세팅",
                  description: "배송된 가구, 가전, 패브릭 등의 설치와 세팅이 진행되는 기간입니다.",
                  date: {
                    start: emptyDate,
                    end: emptyDate,
                  },
                },
              ]
            };
          }
        
          resultObj = originalContents; // 생성된 원본 일정 데이터를 resultObj에 저장
        
        /**
         * @description mode 값이 "boo"인 경우, 일정 데이터가 유효한지 판단하고, 이에 따라 결과를 반환합니다.
         */
        } else if (mode === "boo") {
        
          rows = await back.mongoRead(collection, { proid }, { selfMongo }); // 프로젝트 ID로 일정 데이터를 조회
          resultObj = { result: 0 }; // 초기값으로 result를 0으로 설정
          if (rows.length > 0) {
            boo = rows[0].schedule.some((obj) => {
              return obj.date.start.valueOf() > (new Date(2000, 0, 1)).valueOf() && obj.date.end.valueOf() > (new Date(2000, 0, 1)).valueOf();
            });
            if (boo) {
              resultObj = { result: 1 }; // 유효한 일정이 있으면 result를 1로 설정
            } else {
              resultObj = { result: 0 }; // 유효한 일정이 없으면 result를 0으로 설정
            }
          } else {
            resultObj = { result: 0 }; // 조회된 데이터가 없으면 result를 0으로 설정
          }
        
        }
        
        /**
         * @description resultObj를 JSON 형식으로 클라이언트에 응답으로 전송합니다.
         */
        res.send(JSON.stringify(resultObj));
        
      } catch (e) {
        /**
         * @description 예외 발생 시, 발생한 오류를 로그로 기록하고,
         * 오류 메시지를 JSON 형식으로 클라이언트에 응답합니다.
         */
        logger.error(e, req).catch((e) => { console.log(e); }); // 로그에 오류 기록
        res.send(JSON.stringify({ error: e.message })); // 오류 메시지를 JSON으로 클라이언트에 전송
      }
    });
    
    /**
     * @route POST /projectDesignerTravel
     * @description 이 라우트는 클라이언트에서 전달된 요청 모드에 따라 MongoDB에서 프로젝트 디자이너의 이동 데이터를 조회하거나 업데이트합니다.
     * @param {object} req - 클라이언트 요청 객체.
     * @param {object} req.body - 요청 본문 객체.
     * @param {string} req.body.mode - 요청 모드 ("get" 또는 "update").
     * @param {string} req.body.desid - 디자이너 ID.
     * @param {string} req.body.proid - 프로젝트 ID.
     * @param {object} res - 서버 응답 객체.
     */
    router.post([ "/projectDesignerTravel" ], async function (req, res) {
      /**
       * @description 응답 헤더를 설정합니다. 응답을 JSON 형식으로 반환하고,
       * 모든 출처에서의 접근을 허용하며, 특정 HTTP 메서드와 헤더를 허용합니다.
       */
      res.set({
        "Content-Type": "application/json", // 응답의 Content-Type을 JSON으로 설정합니다.
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 지정합니다.
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 요청 헤더를 지정합니다.
      });

      try {
        /**
         * @description 요청 본문에 mode, desid, proid가 존재하지 않으면 "invalid post" 오류를 발생시킵니다.
         * 이는 요청 데이터의 필수 요소가 모두 있는지 확인하는 단계입니다.
         */
        if (req.body.mode === undefined || req.body.desid === undefined || req.body.proid === undefined) {
          throw new Error("invaild post"); // 필수 요청 데이터가 없을 경우 예외를 던집니다.
        }

        /**
         * @description MongoDB 클라이언트 인스턴스를 selfMongo 변수에 할당합니다.
         * 이 변수는 이후 MongoDB와의 상호작용에서 사용됩니다.
         */
        const selfMongo = mongo;

        /**
         * @description MongoDB에서 조회할 컬렉션 이름을 정의합니다.
         * 'projectDesignerTravel'은 프로젝트 디자이너의 이동 데이터를 저장하는 컬렉션입니다.
         */
        const collection = "projectDesignerTravel";

        /**
         * @description 요청 본문에서 mode, desid, proid 값을 추출합니다.
         * 이는 이후 로직에서 이들 값에 따라 데이터베이스 작업을 결정하는 데 사용됩니다.
         */
        const { mode, desid, proid } = req.body;

        let resultObj; // 클라이언트에 반환할 결과 객체를 저장할 변수
        let defaultObj; // 디폴트 객체를 저장할 변수
        let json; // JSON 데이터를 저장할 변수
        let whereQuery, updateQuery; // MongoDB 데이터를 업데이트할 때 사용할 조건 및 업데이트 쿼리 객체

        /**
         * @description 디폴트 객체를 정의합니다. 이 객체는 새로 생성할 때 기본값으로 사용됩니다.
         */
        defaultObj = {
          proid, // 프로젝트 ID를 포함
          desid, // 디자이너 ID를 포함
          travel: [] // 이동 데이터를 포함하는 빈 배열
        };

        /**
         * @description mode 값이 "get"인 경우, MongoDB에서 프로젝트 ID에 해당하는 이동 데이터를 조회합니다.
         */
        if (mode === "get") {
          rows = await back.mongoRead(collection, { proid }, { selfMongo }); // MongoDB에서 프로젝트 ID로 이동 데이터를 조회
          if (rows.length === 0) {
            /**
             * @description 조회된 데이터가 없으면 기본 디폴트 객체를 JSON으로 변환하여 생성합니다.
             */
            json = equalJson(JSON.stringify(defaultObj)); // 기본 객체를 DeepCopy하여 JSON 형식으로 변환
            await back.mongoCreate(collection, json, { selfMongo }); // MongoDB에 새로운 이동 데이터를 생성
            resultObj = json; // 생성된 데이터를 resultObj에 저장
          } else {
            resultObj = rows[0]; // 조회된 첫 번째 데이터를 resultObj에 저장
          }
        /**
         * @description mode 값이 "update"인 경우, whereQuery와 updateQuery 값을 추출하여 기존 이동 데이터를 업데이트합니다.
         */
        } else if (mode === "update") {
          whereQuery = { proid }; // 업데이트할 조건을 프로젝트 ID로 설정
          ({ updateQuery } = equalJson(req.body)); // 업데이트할 데이터를 DeepCopy하여 추출
          await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo }); // 조건에 맞는 데이터를 업데이트
          resultObj = { message: "done" }; // 업데이트 완료 메시지를 resultObj에 저장
        }

        /**
         * @description resultObj를 JSON 형식으로 클라이언트에 응답으로 전송합니다.
         */
        res.send(JSON.stringify(resultObj));

      } catch (e) {
        /**
         * @description 예외 발생 시, 발생한 오류를 로그로 기록하고,
         * 오류 메시지를 JSON 형식으로 클라이언트에 응답합니다.
         */
        logger.error(e, req).catch((e) => { console.log(e); }); // 로그에 오류 기록
        res.send(JSON.stringify({ error: e.message })); // 오류 메시지를 JSON으로 클라이언트에 전송
      }
    });
    
    /**
     * @route POST /readLogDesignerStatus
     * @description 이 라우트는 디자이너 상태 로그를 조회하기 위한 엔드포인트입니다. 요청 모드에 따라 최근의 로그 데이터를 가져오거나 모든 로그 데이터를 가져올 수 있습니다.
     * @param {object} req - 클라이언트 요청 객체.
     * @param {object} req.body - 요청 본문 객체.
     * @param {string} req.body.mode - 요청 모드 ("pick", "get", "all").
     * @param {string} [req.body.desid] - 디자이너 ID, "pick" 또는 "get" 모드일 때 필요합니다.
     * @param {Date} [req.body.date] - 조회 시작 날짜, 없을 경우 기본값으로 설정됩니다.
     * @param {object} res - 서버 응답 객체.
     */
    router.post([ "/readLogDesignerStatus" ], async function (req, res) {
      /**
       * @description 응답 헤더를 설정합니다. 응답을 JSON 형식으로 반환하고,
       * 모든 출처에서의 접근을 허용하며, 특정 HTTP 메서드와 헤더를 허용합니다.
       */
      res.set({
        "Content-Type": "application/json", // 응답의 Content-Type을 JSON으로 설정합니다.
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 지정합니다.
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 요청 헤더를 지정합니다.
      });

      try {
        /**
         * @description 요청 본문에 mode 값이 없으면 "invalid post" 오류를 발생시킵니다.
         * 이는 mode 값이 필수로 제공되어야 함을 나타냅니다.
         */
        if (req.body.mode === undefined) {
          throw new Error("invalid post"); // 필수 요청 데이터가 없을 경우 예외를 던집니다.
        }

        /**
         * @description 요청 본문에서 mode 값을 추출합니다. 
         * equalJson은 JSON 객체를 DeepCopy하여 추출하기 쉽게 만들어 줍니다.
         */
        const { mode } = equalJson(req.body);

        const delta = 1; // 조회 기간을 설정하기 위한 변수, 기본적으로 1개월 전으로 설정됩니다.
        const projectQuery = { date: 1, data: 1 }; // MongoDB 조회 시 필요한 필드만 선택하도록 쿼리를 설정합니다.
        let rows, ago; // 조회된 데이터를 저장할 변수 및 조회 시작 날짜를 계산하기 위한 변수를 선언합니다.
        let thisDate; // 조회 시작 날짜를 저장할 변수
        let whereQuery; // MongoDB에서 조회할 조건을 설정할 쿼리 객체
        let desid; // 디자이너 ID를 저장할 변수

        /**
         * @description mode 값이 "pick" 또는 "get"일 경우, 디자이너 ID를 사용해 로그를 조회합니다.
         */
        if (mode === "pick" || mode === "get") {
        
          /**
           * @description 요청 본문에서 desid 값을 추출합니다. 이 값은 필수이며, 디자이너 ID입니다.
           */
          ({ desid } = equalJson(req.body));
          
          /**
           * @description MongoDB에서 action이 "updateDesignStatus"이고, 
           * desid가 일치하는 로그를 조회하기 위한 쿼리 조건을 설정합니다.
           */
          whereQuery = { action: "updateDesignStatus", "data.desid": desid };

          ago = new Date(); // 현재 날짜를 생성합니다.
          ago.setMonth(ago.getMonth() - delta); // 조회 시작 날짜를 1개월 전으로 설정합니다.

          /**
           * @description 요청 본문에 date 값이 없으면, 기본적으로 1개월 전을 조회 시작 날짜로 설정합니다.
           */
          if (req.body.date === undefined) {
            thisDate = new Date(JSON.stringify(ago).slice(1, -1)); // 1개월 전 날짜를 thisDate로 설정합니다.
          } else {
            thisDate = equalJson(req.body).date; // 요청 본문에서 date 값을 추출하여 thisDate로 설정합니다.
          }

          /**
           * @description 조회 조건에 날짜 범위를 추가합니다. 
           * 주어진 날짜 이후의 데이터를 가져오도록 설정합니다.
           */
          whereQuery["date"] = { $gte: thisDate };

          /**
           * @description requestSystem 메서드를 사용해 외부 서버에서 로그 데이터를 조회합니다.
           * 외부 서버로부터 데이터를 가져올 때 필요한 URL, 쿼리 조건 및 헤더 정보를 전달합니다.
           */
          rows = await requestSystem(
            "https://" + address.officeinfo.ghost.host + "/readHomeliaisonAnalytics", 
            { whereQuery, projectQuery }, 
            { headers: { "Content-Type": "application/json" } }
          );

          /**
           * @description 조회된 데이터를 클라이언트에 JSON 형식으로 응답합니다.
           */
          res.send(JSON.stringify({ data: equalJson(JSON.stringify(rows.data.data)) }));
        
        /**
         * @description mode 값이 "all"일 경우, 모든 디자이너의 상태 로그를 조회합니다.
         */
        } else if (mode === "all") {
        
          whereQuery = { action: "updateDesignStatus" }; // 모든 디자이너 상태 로그를 조회하기 위한 쿼리 조건을 설정합니다.

          ago = new Date(); // 현재 날짜를 생성합니다.
          ago.setMonth(ago.getMonth() - delta); // 조회 시작 날짜를 1개월 전으로 설정합니다.

          /**
           * @description 요청 본문에 date 값이 없으면, 기본적으로 1개월 전을 조회 시작 날짜로 설정합니다.
           */
          if (req.body.date === undefined) {
            thisDate = new Date(JSON.stringify(ago).slice(1, -1)); // 1개월 전 날짜를 thisDate로 설정합니다.
          } else {
            thisDate = equalJson(req.body).date; // 요청 본문에서 date 값을 추출하여 thisDate로 설정합니다.
          }

          whereQuery["date"] = { $gte: thisDate }; // 조회 조건에 날짜 범위를 추가합니다.

          /**
           * @description requestSystem 메서드를 사용해 외부 서버에서 로그 데이터를 조회합니다.
           * 외부 서버로부터 데이터를 가져올 때 필요한 URL, 쿼리 조건 및 헤더 정보를 전달합니다.
           */
          rows = await requestSystem(
            "https://" + address.officeinfo.ghost.host + "/readHomeliaisonAnalytics", 
            { whereQuery, projectQuery }, 
            { headers: { "Content-Type": "application/json" } }
          );

          /**
           * @description 조회된 데이터를 클라이언트에 JSON 형식으로 응답합니다.
           */
          res.send(JSON.stringify({ data: equalJson(JSON.stringify(rows.data.data)) }));
        
        /**
         * @description mode 값이 위에서 처리되지 않은 경우, "invalid mode" 오류를 발생시킵니다.
         */
        } else {
          throw new Error("invalid mode"); // 유효하지 않은 모드일 경우 예외를 던집니다.
        }

      } catch (e) {
        console.log(e); // 콘솔에 오류를 출력합니다.
        /**
         * @description 예외 발생 시, 발생한 오류를 로그로 기록하고,
         * 오류 메시지를 JSON 형식으로 클라이언트에 응답합니다.
         */
        logger.error(e, req).catch((e) => { console.log(e); }); // 로그에 오류 기록
        res.send(JSON.stringify({ error: e.message })); // 오류 메시지를 JSON으로 클라이언트에 전송
      }
    });
    
    /**
     * @route POST /projectDesignerStatus
     * @description 이 라우트는 클라이언트가 프로젝트 디자이너 상태와 관련된 데이터를 조회하거나 업데이트하기 위한 엔드포인트입니다. 요청 모드에 따라 다양한 작업을 수행할 수 있습니다.
     * @param {object} req - 클라이언트 요청 객체.
     * @param {object} req.body - 요청 본문 객체.
     * @param {string} req.body.mode - 요청 모드 ("get", "update", "chain", "send", "boo").
     * @param {string} req.body.desid - 디자이너 ID.
     * @param {string} req.body.proid - 프로젝트 ID.
     * @param {object} res - 서버 응답 객체.
     */
    router.post([ "/projectDesignerStatus" ], async function (req, res) {
      /**
       * @description 응답 헤더를 설정합니다. 응답을 JSON 형식으로 반환하고,
       * 모든 출처에서의 접근을 허용하며, 특정 HTTP 메서드와 헤더를 허용합니다.
       */
      res.set({
        "Content-Type": "application/json", // 응답의 Content-Type을 JSON으로 설정합니다.
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 지정합니다.
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 요청 헤더를 지정합니다.
      });

      try {
        /**
         * @description mode, desid, proid 값이 존재하지 않으면 "invalid post" 오류를 발생시킵니다.
         * 이는 요청 데이터의 필수 요소가 모두 있는지 확인하는 단계입니다.
         */
        if (req.body.mode === undefined || req.body.desid === undefined || req.body.proid === undefined) {
          throw new Error("invalid post"); // 필수 요청 데이터가 없을 경우 예외를 던집니다.
        }

        /**
         * @description MongoDB 클라이언트 인스턴스를 selfMongo 변수에 할당합니다.
         * 이 변수는 이후 MongoDB와의 상호작용에서 사용됩니다.
         */
        const selfMongo = mongo;

        /**
         * @description 프로젝트 디자이너 상태 데이터를 저장할 컬렉션 이름을 정의합니다.
         * 'projectDesignerStatus'는 프로젝트의 디자이너 상태 데이터를 저장하는 컬렉션입니다.
         */
        const collection = "projectDesignerStatus";

        /**
         * @description 프로젝트 디자이너 전송 로그 데이터를 저장할 컬렉션 이름을 정의합니다.
         * 'projectDesignerSend'는 프로젝트와 관련된 전송 로그를 기록하는 컬렉션입니다.
         */
        const logCollection = "projectDesignerSend";

        /**
         * @description 요청 본문에서 mode, desid, proid 값을 추출합니다.
         * 이는 이후 로직에서 이들 값에 따라 데이터베이스 작업을 결정하는 데 사용됩니다.
         */
        const { mode, desid, proid } = req.body;

        let rows; // MongoDB에서 조회한 데이터를 담을 변수
        let resultObj = { message: "done" }; // 클라이언트에 반환할 기본 결과 객체
        let project; // 프로젝트 데이터를 담을 변수
        let defaultObj; // 기본 상태 객체를 담을 변수
        let matrix; // 상태 매트릭스를 담을 변수
        let target; // 특정 데이터를 담을 변수
        let key; // 상태 매트릭스에서 특정 키를 담을 변수
        let x, y; // 매트릭스에서 특정 위치를 나타낼 변수
        let whereQuery, updateQuery; // MongoDB 데이터를 업데이트할 때 사용할 조건 및 업데이트 쿼리 객체
        let name, phone; // 클라이언트 이름과 전화번호를 담을 변수
        let host; // 클라이언트 호스트 정보를 담을 변수
        let type; // 요청 타입을 담을 변수
        let designer, file, itemKey, path; // 디자이너, 파일, 키, 경로 정보를 담을 변수

        /**
         * @description 요청된 프로젝트 ID를 사용해 프로젝트 데이터를 조회하고 이를 일반 객체로 변환합니다.
         */
        project = (await back.getProjectById(proid, { selfMongo: instance.mongo })).toNormal();

        /**
         * @description 프로젝트 디자이너 상태의 기본 구조를 정의합니다. 이는 각 프로젝트에 대해 초기화될 상태 매트릭스를 구성합니다.
         */
        defaultObj = [
          {
            title: "디자인", // 디자인 섹션의 타이틀
            children: [ // 디자인 섹션의 하위 항목들
              {
                title: "현장 미팅 완료", // 현장 미팅 완료 항목
                type: "upload", // 업로드 타입
                deactive: false, // 비활성화 여부
                value: 0, // 초기 값
                key: "firstPhoto", // 고유 키
                children: [ // 하위 항목들
                  {
                    title: "현장 사진 업로드",
                    type: "upload",
                    key: "firstPhoto",
                    photo: true, // 사진 여부
                  },
                  {
                    title: "현장 사진 메모",
                    type: "memo",
                    key: "firstPhoto",
                  },
                ],
              },
              {
                title: "일정표 공유",
                type: "upload",
                deactive: false,
                value: 0,
                key: "scheduleInfo",
                children: [
                  {
                    title: "일정표 업로드",
                    type: "upload",
                    key: "scheduleInfo",
                    photo: false,
                  },
                  {
                    title: "일정표 메모",
                    type: "memo",
                    key: "scheduleInfo",
                  },
                ],
              },
              {
                title: "컨셉 제안서 공유",
                type: "upload",
                deactive: false,
                value: 0,
                key: "designProposal",
                children: [
                  {
                    title: "컨셉 제안서 업로드",
                    type: "upload",
                    key: "designProposal",
                    photo: false,
                  },
                  {
                    title: "컨셉 제안서 메모",
                    type: "memo",
                    key: "designProposal",
                  },
                ],
              },
              {
                title: "디자인 제안서 공유",
                type: "upload",
                deactive: false,
                value: 0,
                key: "designDevelop",
                children: [
                  {
                    title: "디자인 제안서 업로드",
                    type: "upload",
                    key: "designDevelop",
                    photo: false,
                  },
                  {
                    title: "디자인 제안서 메모",
                    type: "memo",
                    key: "designDevelop",
                  },
                ],
              },
              {
                title: "수정 제안서 공유",
                type: "upload",
                deactive: false,
                value: 0,
                key: "designFix",
                children: [
                  {
                    title: "디자인 제안서 업로드",
                    type: "upload",
                    key: "designDevelop",
                    photo: false,
                  },
                  {
                    title: "디자인 제안서 메모",
                    type: "memo",
                    key: "designDevelop",
                  },
                ],
              },
              {
                title: "제품 리스트 공유",
                type: "upload",
                deactive: false,
                value: 0,
                key: "productList",
                children: [
                  {
                    title: "제품 리스트 업로드",
                    type: "upload",
                    key: "productList",
                    photo: false,
                  },
                  {
                    title: "제품 리스트 메모",
                    type: "memo",
                    key: "productList",
                  },
                ],
              },
              {
                title: "제안서 최종 컨펌",
                type: "string",
                deactive: false,
                value: 0,
                key: "finalDesign",
                children: [
                  {
                    title: "최종 완료 메모",
                    type: "memo",
                    key: "finalDesign",
                  },
                ],
              },
            ]
          },
          {
            title: "시공", // 시공 섹션의 타이틀
            children: [ // 시공 섹션의 하위 항목들
              {
                title: "시공 의뢰서 공유", 
                type: "upload", 
                deactive: /퍼니싱/gi.test(serviceParsing(project.service)), // 서비스가 퍼니싱인지 여부에 따라 비활성화
                value: 0,
                key: "constructInfo",
                children: [
                  {
                    title: "시공 의뢰서 업로드",
                    type: "upload",
                    key: "constructInfo",
                    photo: false,
                  },
                  {
                    title: "시공 의뢰서 메모",
                    type: "memo",
                    key: "constructInfo",
                  },
                ],
              },
              {
                title: "시공 견적서 공유",
                type: "upload",
                deactive: /퍼니싱/gi.test(serviceParsing(project.service)),
                value: 0,
                key: "constructEstimate",
                children: [
                  {
                    title: "시공 견적서 업로드",
                    type: "upload",
                    key: "constructEstimate",
                    photo: false,
                  },
                  {
                    title: "시공 견적서 메모",
                    type: "memo",
                    key: "constructEstimate",
                  },
                ],
              },
              {
                title: "시공사 선택 완료",
                type: "selection",
                deactive: /퍼니싱/gi.test(serviceParsing(project.service)),
                value: 0,
                key: "constructSelection",
                children: [
                  {
                    title: "홈리에종 시공사",
                    type: "selection",
                    value: 0,
                    view: "홈리에종 시공사 선택",
                  },
                  {
                    title: "디자이너 시공사",
                    type: "selection",
                    value: 0,
                    view: "디자이너 시공사 선택",
                  },
                  {
                    title: "고객 시공사",
                    type: "selection",
                    value: 0,
                    view: "고객 시공사 선택",
                  },
                ]
              },
              {
                title: "공정표 공유",
                type: "string",
                deactive: /퍼니싱/gi.test(serviceParsing(project.service)),
                value: 0,
                key: "constructSchedule",
                children: [
                  {
                    title: "시공 공정표 메모",
                    type: "memo",
                    key: "constructSchedule",
                  },
                ],
              },
              {
                title: "시공 착수",
                type: "string",
                deactive: /퍼니싱/gi.test(serviceParsing(project.service)),
                value: 0,
                key: "constructStart",
                children: [
                  {
                    title: "시공 착수 메모",
                    type: "memo",
                    key: "constructStart",
                  },
                ],
              },
              {
                title: "시공 진행중",
                type: "string",
                deactive: /퍼니싱/gi.test(serviceParsing(project.service)),
                value: 0,
                key: "constructProgress",
                children: [
                  {
                    title: "시공 진행 메모",
                    type: "memo",
                    key: "constructProgress",
                  },
                ],
              },
              {
                title: "시공 완료",
                type: "upload",
                deactive: /퍼니싱/gi.test(serviceParsing(project.service)),
                value: 0,
                key: "constructMiddleFinal",
                children: [
                  {
                    title: "시공 사진 업로드",
                    type: "upload",
                    key: "middlePhoto",
                    photo: true,
                  },
                  {
                    title: "시공 사진 메모",
                    type: "memo",
                    key: "middlePhoto",
                  },
                ],
              },
              {
                title: "시공 AS 완료",
                type: "string",
                deactive: /퍼니싱/gi.test(serviceParsing(project.service)),
                value: 0,
                key: "constructFinal",
                children: [
                  {
                    title: "시공 AS 메모",
                    type: "memo",
                    key: "constructFinal",
                  },
                ],
              },
            ]
          },
          {
            title: "구매", // 구매 섹션의 타이틀
            children: [ // 구매 섹션의 하위 항목들
              {
                title: "제품 구매 시작 전",
                type: "upload",
                deactive: false,
                value: 0,
                key: "productReady",
                children: [
                  {
                    title: "제품 리스트 업로드",
                    type: "upload",
                    key: "productList",
                    photo: false,
                  },
                  {
                    title: "제품 리스트 메모",
                    type: "memo",
                    key: "productList",
                  },
                ],
              },
              {
                title: "제품 구매 진행중",
                type: "string",
                deactive: false,
                value: 0,
                key: "productPurchase",
                children: [
                  {
                    title: "제품 구매 메모",
                    type: "memo",
                    key: "productPurchase",
                  }
                ]
              },
              {
                title: "구매 완료, 배송중",
                type: "string",
                deactive: false,
                value: 0,
                key: "productProgress",
                children: [
                  {
                    title: "배송중 메모",
                    type: "memo",
                    key: "productProgress",
                  }
                ]
              },
              {
                title: "배송 및 세팅 완료",
                type: "upload",
                deactive: false,
                value: 0,
                key: "productComplete",
                children: [
                  {
                    title: "제품 배치도 업로드",
                    type: "upload",
                    key: "settingGuide",
                    photo: false,
                  },
                  {
                    title: "제품 배치도 메모",
                    type: "memo",
                    key: "settingGuide",
                  },
                ]
              },
            ]
          },
          {
            title: "세팅", // 세팅 섹션의 타이틀
            children: [ // 세팅 섹션의 하위 항목들
              {
                title: "촬영 여부 확인",
                type: "selection",
                deactive: false,
                value: 0,
                key: "photoSelection",
                children: [
                  {
                    title: "촬영 진행 희망",
                    type: "selection",
                    value: 0,
                    view: "촬영 진행 희망",
                  },
                  {
                    title: "촬영 진행 안 함",
                    type: "selection",
                    value: 0,
                    view: "촬영 진행 안 함",
                  }
                ]
              },
              {
                title: "촬영일 확인 완료",
                type: "string",
                deactive: false,
                value: 0,
                key: "contentsPhoto",
                children: [
                  {
                    title: "촬영일 메모",
                    type: "memo",
                    key: "contentsPhoto",
                  }
                ]
              },
              {
                title: "세팅 및 촬영 완료",
                type: "string",
                deactive: false,
                value: 0,
                key: "projectFinal",
                children: [
                  {
                    title: "세팅 관련 메모",
                    type: "memo",
                    key: "projectFinal",
                  }
                ]
              },
            ]
          },
        ];

        /**
         * @description mode 값이 "get"인 경우, MongoDB에서 프로젝트 ID에 해당하는 디자이너 상태 매트릭스를 조회합니다.
         * 데이터가 없으면 기본 상태 매트릭스를 생성합니다.
         */
        if (mode === "get") {
        
          rows = await back.mongoRead(collection, { proid }, { selfMongo }); // MongoDB에서 프로젝트 ID로 상태 매트릭스를 조회
          if (rows.length === 0) {
            resultObj = equalJson(JSON.stringify(defaultObj)); // 조회된 데이터가 없으면 기본 상태 매트릭스를 반환합니다.
            await back.mongoCreate(collection, {
              proid, desid, matrix: defaultObj
            }, { selfMongo }); // 기본 상태 매트릭스를 MongoDB에 생성합니다.
          } else {
            resultObj = rows[0].matrix; // 조회된 상태 매트릭스를 반환합니다.
          }
        
        /**
         * @description mode 값이 "update"인 경우, 요청 본문에서 매트릭스를 추출하여 MongoDB에 업데이트합니다.
         * 기존 데이터가 없으면 새로운 데이터를 생성합니다.
         */
        } else if (mode === "update") {
        
          matrix = equalJson(req.body.matrix); // 요청 본문에서 매트릭스를 DeepCopy하여 추출합니다.
          rows = await back.mongoRead(collection, { proid }, { selfMongo }); // 프로젝트 ID로 상태 매트릭스를 조회합니다.
          if (rows.length === 0) {
            await back.mongoCreate(collection, {
              proid, desid, matrix
            }, { selfMongo }); // 데이터가 없으면 새로운 상태 매트릭스를 생성합니다.
          } else {
            await back.mongoUpdate(collection, [
              { proid },
              { matrix }
            ], { selfMongo }); // 데이터가 있으면 기존 데이터를 업데이트합니다.
          }
        
          resultObj = { message: "done" }; // 업데이트 완료 메시지를 반환합니다.
        
        /**
         * @description mode 값이 "chain"인 경우, 특정 상태 매트릭스 항목의 값을 업데이트합니다.
         * 이를 통해 특정 상태가 완료되었음을 표시합니다.
         */
        } else if (mode === "chain") {
        
          rows = await back.mongoRead(collection, { proid }, { selfMongo }); // 프로젝트 ID로 상태 매트릭스를 조회합니다.
          if (rows.length === 0) {
            await back.mongoCreate(collection, {
              proid, desid, matrix: defaultObj
            }, { selfMongo }); // 데이터가 없으면 기본 상태 매트릭스를 생성합니다.
            rows = await back.mongoRead(collection, { proid }, { selfMongo }); // 생성한 데이터를 다시 조회합니다.
          }
          target = rows[0]; // 조회된 데이터를 target에 저장합니다.
          key = req.body.key; // 요청 본문에서 키를 추출합니다.
          x = target.matrix.findIndex((obj) => { return obj.children.some((o) => { return o.key === key }); }); // 매트릭스에서 해당 키의 위치를 찾습니다.
        
          if (x !== -1) { // 키가 존재하는 경우
            y = target.matrix[x].children.findIndex((obj) => { return obj.key === key }); // 하위 항목에서 키의 위치를 찾습니다.
            if (y !== -1) {
              whereQuery = { proid }; // 업데이트할 조건을 설정합니다.
              updateQuery = {};
              updateQuery["matrix." + String(x) + ".children." + String(y) + ".value"] = 1; // 해당 항목의 값을 1로 설정합니다.
              console.log(updateQuery);
              await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo }); // MongoDB에서 상태 매트릭스를 업데이트합니다.
            }
          }
        
        /**
         * @description mode 값이 "send"인 경우, 카카오톡을 통해 클라이언트에게 특정 알림을 보냅니다.
         * 전송된 메시지를 로그에 기록합니다.
         */
        } else if (mode === "send") {
        
          name = req.body.name; // 요청 본문에서 클라이언트 이름을 추출합니다.
          phone = req.body.phone; // 요청 본문에서 클라이언트 전화번호를 추출합니다.
          designer = req.body.designer; // 요청 본문에서 디자이너 이름을 추출합니다.
          host = address.frontinfo.host; // 호스트 정보를 설정합니다.
          path = "project"; // 경로를 설정합니다.
          type = req.body.type; // 요청 타입을 설정합니다.
        
          if (type === "status") {
            await kakao.sendTalk("progressClient", name, phone, { client: name, host, proid }); // 진행 상태를 클라이언트에게 전송합니다.
          } else if (type === "schedule") {
            await kakao.sendTalk("scheduleClient", name, phone, { client: name, host, proid }); // 일정표를 클라이언트에게 전송합니다.
          } else if (type === "file") {
            file = req.body.file; // 요청 본문에서 파일을 추출합니다.
            itemKey = req.body.itemKey; // 요청 본문에서 아이템 키를 추출합니다.
            await kakao.sendTalk("projectDetail", name, phone, { client: name, designer, file, host, path, proid, key: itemKey }); // 파일 링크를 클라이언트에게 전송합니다.
          }
        
          await messageSend({
            text: designer + " 실장님이 " + name + " 고객님께 " + (type === "status" ? "진행바" : (type === "schedule" ? "일정표" : "파일 링크")) + "를 보냈습니다!",
            channel: "#301_console",
            voice: false,
          }); // 슬랙 메시지를 전송합니다.
        
          await back.mongoCreate(logCollection, {
            type,
            date: new Date(),
            proid,
            designer: {
              desid,
              designer,
            },
            client: {
              cliid: project.cliid,
              name,
            }
          }, { selfMongo }); // 전송 로그를 MongoDB에 기록합니다.
        
        /**
         * @description mode 값이 "boo"인 경우, MongoDB에서 프로젝트 ID에 해당하는 상태 매트릭스를 조회하여 존재 여부를 반환합니다.
         */
        } else if (mode === "boo") {
        
          rows = await back.mongoRead(collection, { proid }, { selfMongo }); // 프로젝트 ID로 상태 매트릭스를 조회합니다.
          if (rows.length === 0) {
            resultObj = { result: 0 }; // 데이터가 없으면 결과를 0으로 설정합니다.
          } else {
            resultObj = { result: 1 }; // 데이터가 있으면 결과를 1로 설정합니다.
          }
        
        }

        /**
         * @description 최종적으로 클라이언트에 resultObj를 JSON 형식으로 응답합니다.
         */
        res.send(JSON.stringify(resultObj));

      } catch (e) {
        /**
         * @description 예외 발생 시, 발생한 오류를 로그로 기록하고,
         * 오류 메시지를 JSON 형식으로 클라이언트에 응답합니다.
         */
        logger.error(e, req).catch((e) => { console.log(e); }); // 로그에 오류 기록
        res.send(JSON.stringify({ error: e.message })); // 오류 메시지를 JSON으로 클라이언트에 전송
      }
    });
    
    /**
     * @route POST /projectDesignerDownloadLog
     * @description 이 라우트는 프로젝트 디자이너의 다운로드 로그를 관리합니다. 
     * 클라이언트의 요청 모드에 따라 다운로드 로그를 추가하거나 조회할 수 있습니다.
     * @param {object} req - 클라이언트 요청 객체.
     * @param {object} req.body - 요청 본문 객체.
     * @param {string} req.body.mode - 요청 모드 ("push" 또는 "get").
     * @param {string} req.body.desid - 디자이너 ID.
     * @param {string} req.body.proid - 프로젝트 ID.
     * @param {string} [req.body.file] - 추가할 파일 이름, "push" 모드일 때 필요합니다.
     * @param {string} [req.body.who] - 파일을 다운로드한 사람, "push" 모드일 때 필요합니다.
     * @param {object} res - 서버 응답 객체.
     */
    router.post([ "/projectDesignerDownloadLog" ], async function (req, res) {
      /**
       * @description 응답 헤더를 설정합니다. 응답을 JSON 형식으로 반환하고,
       * 모든 출처에서의 접근을 허용하며, 특정 HTTP 메서드와 헤더를 허용합니다.
       */
      res.set({
        "Content-Type": "application/json", // 응답의 Content-Type을 JSON으로 설정합니다.
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 지정합니다.
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 요청 헤더를 지정합니다.
      });

      try {
        /**
         * @description 요청 본문에 mode, desid, proid 값이 존재하지 않으면 "invalid post" 오류를 발생시킵니다.
         * 이는 요청 데이터의 필수 요소가 모두 있는지 확인하는 단계입니다.
         */
        if (req.body.mode === undefined || req.body.desid === undefined || req.body.proid === undefined) {
          throw new Error("invalid post"); // 필수 요청 데이터가 없을 경우 예외를 던집니다.
        }

        /**
         * @description MongoDB 클라이언트 인스턴스를 selfMongo 변수에 할당합니다.
         * 이 변수는 이후 MongoDB와의 상호작용에서 사용됩니다.
         */
        const selfMongo = mongo;

        /**
         * @description 프로젝트 디자이너 다운로드 로그 데이터를 저장할 컬렉션 이름을 정의합니다.
         * 'projectDesignerDownload'는 프로젝트와 관련된 다운로드 로그를 기록하는 컬렉션입니다.
         */
        const collection = "projectDesignerDownload";

        /**
         * @description 요청 본문에서 mode, desid, proid 값을 추출합니다.
         * 이는 이후 로직에서 이들 값에 따라 데이터베이스 작업을 결정하는 데 사용됩니다.
         */
        const { mode, desid, proid } = req.body;

        let resultObj; // 클라이언트에 반환할 결과 객체를 저장할 변수
        let rows; // MongoDB에서 조회한 데이터를 담을 변수
        let defaultObj; // 기본 로그 객체를 담을 변수
        let file; // 다운로드한 파일 이름을 담을 변수
        let thisObj; // 현재 작업 중인 객체를 담을 변수
        let who; // 파일을 다운로드한 사람의 정보를 담을 변수

        /**
         * @description 기본 다운로드 로그 객체를 정의합니다.
         * 이 객체는 새로운 프로젝트에 대한 다운로드 로그가 없을 때 사용됩니다.
         */
        defaultObj = {
          proid, // 프로젝트 ID를 포함
          desid, // 디자이너 ID를 포함
          download: [] // 다운로드된 파일 목록을 포함하는 빈 배열
        };

        /**
         * @description mode 값이 "push"인 경우, 다운로드 로그에 새로운 항목을 추가합니다.
         */
        if (mode === "push") {
          file = req.body.file; // 요청 본문에서 다운로드된 파일 이름을 추출합니다.
          who = req.body.who; // 요청 본문에서 파일을 다운로드한 사람의 정보를 추출합니다.
          resultObj = { message: "done" }; // 기본 응답 메시지를 설정합니다.
          
          /**
           * @description 다운로드 로그 배열에 새로운 항목을 추가합니다.
           * 여기에는 파일 이름, 현재 날짜, 다운로드한 사람의 정보가 포함됩니다.
           */
          defaultObj.download.push({
            file,
            date: new Date(), // 현재 날짜를 추가합니다.
            who,
          });

          rows = await back.mongoRead(collection, { proid }, { selfMongo }); // MongoDB에서 프로젝트 ID로 다운로드 로그를 조회합니다.
          
          if (rows.length === 0) {
            /**
             * @description 조회된 데이터가 없으면 새로운 다운로드 로그 객체를 생성합니다.
             */
            thisObj = equalJson(JSON.stringify(defaultObj)); // 기본 로그 객체를 DeepCopy하여 JSON으로 변환합니다.
            await back.mongoCreate(collection, thisObj, { selfMongo }); // MongoDB에 새로운 다운로드 로그를 생성합니다.
          } else {
            /**
             * @description 기존 다운로드 로그가 있으면 해당 로그를 업데이트합니다.
             */
            thisObj = equalJson(JSON.stringify(rows[0])); // 기존 로그 객체를 DeepCopy하여 JSON으로 변환합니다.
            thisObj.download.push({
              file,
              date: new Date(),
              who,
            }); // 새로운 로그 항목을 추가합니다.
            await back.mongoUpdate(collection, [ { proid }, { download: thisObj.download } ], { selfMongo }); // 업데이트된 로그를 MongoDB에 저장합니다.
          }

        /**
         * @description mode 값이 "get"인 경우, 다운로드 로그를 조회하여 반환합니다.
         * 데이터가 없으면 새로운 로그 객체를 생성합니다.
         */
        } else if (mode === "get") {
          rows = await back.mongoRead(collection, { proid }, { selfMongo }); // MongoDB에서 프로젝트 ID로 다운로드 로그를 조회합니다.
          
          if (rows.length === 0) {
            /**
             * @description 조회된 데이터가 없으면 새로운 다운로드 로그 객체를 생성합니다.
             */
            thisObj = equalJson(JSON.stringify(defaultObj)); // 기본 로그 객체를 DeepCopy하여 JSON으로 변환합니다.
            await back.mongoCreate(collection, thisObj, { selfMongo }); // MongoDB에 새로운 다운로드 로그를 생성합니다.
          } else {
            /**
             * @description 기존 다운로드 로그가 있으면 해당 로그를 반환합니다.
             */
            thisObj = equalJson(JSON.stringify(rows[0])); // 기존 로그 객체를 DeepCopy하여 JSON으로 변환합니다.
          }
          
          resultObj = thisObj; // 조회된 로그 객체를 결과 객체로 설정합니다.
        }

        /**
         * @description 최종적으로 클라이언트에 resultObj를 JSON 형식으로 응답합니다.
         */
        res.send(JSON.stringify(resultObj));

      } catch (e) {
        /**
         * @description 예외 발생 시, 발생한 오류를 로그로 기록하고,
         * 오류 메시지를 JSON 형식으로 클라이언트에 응답합니다.
         */
        logger.error(e, req).catch((e) => { console.log(e); }); // 로그에 오류 기록
        res.send(JSON.stringify({ error: e.message })); // 오류 메시지를 JSON으로 클라이언트에 전송
      }
    });
    
    /**
     * @route POST /noticeDesignerConsole
     * @description 이 라우트는 디자이너 콘솔 알림을 관리하는 엔드포인트입니다. 
     * 클라이언트의 요청에 따라 다양한 알림을 디자이너에게 전송하거나, 로그 데이터를 조회할 수 있습니다.
     * @param {object} req - 클라이언트 요청 객체.
     * @param {object} req.body - 요청 본문 객체.
     * @param {string} req.body.mode - 요청 모드 ("send" 또는 "get").
     * @param {string} [req.body.desid] - 디자이너 ID, 알림을 보낼 때 필요합니다.
     * @param {string} [req.body.designer] - 디자이너 이름, 알림을 보낼 때 필요합니다.
     * @param {string} [req.body.type] - 알림 타입, "send" 모드일 때 필요합니다.
     * @param {string} [req.body.phone] - 디자이너 전화번호, 알림을 보낼 때 필요합니다.
     * @param {object} res - 서버 응답 객체.
     */
    router.post([ "/noticeDesignerConsole" ], async function (req, res) {
      /**
       * @description 응답 헤더를 설정합니다. 응답을 JSON 형식으로 반환하고,
       * 모든 출처에서의 접근을 허용하며, 특정 HTTP 메서드와 헤더를 허용합니다.
       */
      res.set({
        "Content-Type": "application/json", // 응답의 Content-Type을 JSON으로 설정합니다.
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 지정합니다.
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 요청 헤더를 지정합니다.
      });

      try {
        /**
         * @description mode 값이 존재하지 않으면 "invalid post" 오류를 발생시킵니다.
         * 이는 요청 데이터의 필수 요소가 모두 있는지 확인하는 단계입니다.
         */
        if (req.body.mode === undefined) {
          throw new Error("invalid post"); // 필수 요청 데이터가 없을 경우 예외를 던집니다.
        }

        /**
         * @description 테스트용 디자이너 ID와 전화번호를 설정합니다.
         * 실제 운영 환경에서는 이 값들이 다르게 설정될 수 있습니다.
         */
        const testDesid = "d1701_aa01s"; // 테스트용 디자이너 ID
        const testPhone = "010-2747-3403"; // 테스트용 전화번호

        /**
         * @description MongoDB 클라이언트 인스턴스를 selfMongo와 selfCoreMongo 변수에 할당합니다.
         * 이 변수들은 이후 MongoDB와의 상호작용에서 사용됩니다.
         */
        const selfMongo = mongo; // 일반 MongoDB 인스턴스
        const selfCoreMongo = instance.mongo; // 코어 MongoDB 인스턴스

        /**
         * @description 디자이너 콘솔 알림 데이터를 저장할 컬렉션 이름을 정의합니다.
         * 'noticeDesignerConsole'은 디자이너와 관련된 알림 로그를 기록하는 컬렉션입니다.
         */
        const collection = "noticeDesignerConsole"; // MongoDB 컬렉션 이름

        const channel = "#300_designer"; // 슬랙 채널 이름을 설정합니다.
        const idWords = "noticeDesignerConsoleSend_"; // 알림 로그 ID의 접두사를 설정합니다.
        const voice = true; // 알림 전송 시 음성을 사용할지 여부를 설정합니다.
        const fairy = false; // 알림 전송 시 페어리 모드를 사용할지 여부를 설정합니다.

        /**
         * @description 요청 본문에서 mode 값을 추출합니다.
         * 이 값에 따라 알림을 전송하거나 로그 데이터를 조회합니다.
         */
        const { mode } = equalJson(req.body); // DeepCopy된 JSON에서 mode를 추출

        let logDefaultObj; // 기본 로그 객체를 담을 변수
        let thisJson; // 현재 작업 중인 JSON 객체를 담을 변수
        let rows; // MongoDB에서 조회한 데이터를 담을 변수
        let thisId; // 현재 작업 중인 로그 ID를 담을 변수
        let thisHistory; // 현재 작업 중인 로그의 히스토리를 담을 변수

        /**
         * @description mode 값이 "send"인 경우, 디자이너에게 특정 알림을 전송합니다.
         */
        if (mode === "send") {
          const { desid, designer, type } = equalJson(req.body); // 요청 본문에서 desid, designer, type 값을 추출합니다.
          const phone = (desid !== testDesid) ? req.body.phone : testPhone; // 테스트용 전화번호를 사용하거나 요청된 전화번호를 사용

          /**
           * @description 기본 로그 객체를 정의합니다.
           * 알림이 전송될 때마다 로그가 기록되며, 여기에 ID, 타입, 날짜, 디자이너 정보가 포함됩니다.
           */
          logDefaultObj = {
            id: idWords + uniqueValue("hex"), // 로그 ID를 생성
            type, // 알림 타입 설정
            date: new Date(), // 현재 날짜 설정
            designer: {
              desid, // 디자이너 ID 설정
              designer, // 디자이너 이름 설정
            },
            history: [], // 알림 전송 히스토리를 기록할 배열
          };

          thisJson = equalJson(JSON.stringify(logDefaultObj)); // 로그 객체를 DeepCopy하여 JSON으로 변환

          /**
           * @description MongoDB에서 해당 타입과 디자이너 ID로 로그를 조회합니다.
           * 만약 기존 로그가 없으면 새로운 로그를 생성하고, 
           * 기존 로그가 있으면 히스토리에 새로운 알림 전송 기록을 추가합니다.
           */
          rows = await back.mongoRead(collection, { $and: [
            { type }, // 알림 타입 필터링
            { "designer.desid": desid }, // 디자이너 ID 필터링
          ] }, { selfMongo }); // 필터링 조건을 사용하여 MongoDB에서 데이터 조회

          if (rows.length === 0) { // 기존 로그가 없으면
            thisJson.history.unshift(new Date()); // 새로운 히스토리 항목 추가
            await back.mongoCreate(collection, thisJson, { selfMongo }); // 새로운 로그를 MongoDB에 생성
          } else {
            thisId = rows[0].id; // 기존 로그의 ID를 가져옴
            thisHistory = rows[0].history; // 기존 로그의 히스토리 가져옴
            thisHistory.unshift(new Date()); // 새로운 히스토리 항목 추가
            await back.mongoUpdate(collection, [
              { id: thisId }, // 업데이트할 로그의 조건 설정
              { date: new Date(), history: thisHistory }, // 새로운 데이터로 업데이트
            ], { selfMongo }); // MongoDB에서 데이터 업데이트
          }

          /**
           * @description 알림 타입에 따라 다른 종류의 알림을 전송합니다.
           * 각 타입에 대해 카카오톡 메시지와 슬랙 메시지를 전송하는 로직이 구현되어 있습니다.
           */
          if (type === "checklist") {
            // 체크리스트 알림 전송 로직
            await kakao.sendTalk("noticeDesignerChecklist", designer, phone, { designer, host: address.frontinfo.host, path: "about", desid });
            await messageSend({
              text: designer + " 실장님께 체크리스트 요청 알림톡을 전송하였습니다!",
              channel,
              voice,
              fairy
            });
            res.send(JSON.stringify({ message: "success" }));
        
          } else if (type === "console") {
            // 디자이너 콘솔 알림 전송 로직
            await kakao.sendTalk("noticeDesignerConsole", designer, phone, { designer, host: address.frontinfo.host, path: "dashboard", desid });
            await messageSend({
              text: designer + " 실장님께 디자이너 콘솔 알림톡을 전송하였습니다!",
              channel,
              voice,
              fairy
            });
            res.send(JSON.stringify({ message: "success" }));
        
          } else if (type === "profile") {
            // 프로필 사진 업로드 알림 전송 로직
            await kakao.sendTalk("noticeDesignerProfile", designer, phone, { designer, host: address.frontinfo.host, path: "about", desid });
            await messageSend({
              text: designer + " 실장님께 프로필 사진 업로드 알림톡을 전송하였습니다!",
              channel,
              voice,
              fairy
            });
            res.send(JSON.stringify({ message: "success" }));
        
          } else if (type === "work") {
            // 작업 사진 업로드 알림 전송 로직
            await kakao.sendTalk("noticeDesignerWork", designer, phone, { designer, host: address.frontinfo.host, path: "about", desid });
            await messageSend({
              text: designer + " 실장님께 작업 사진 업로드 알림톡을 전송하였습니다!",
              channel,
              voice,
              fairy
            });
            res.send(JSON.stringify({ message: "success" }));
        
          } else if (type === "career") {
            // 경력/학력 업데이트 요청 알림 전송 로직
            await kakao.sendTalk("noticeDesignerCareer", designer, phone, { designer, host: address.frontinfo.host, path: "about", desid });
            await messageSend({
              text: designer + " 실장님께 경력 학력 업데이트 요청 알림톡을 전송하였습니다!",
              channel,
              voice,
              fairy
            });
            res.send(JSON.stringify({ message: "success" }));
        
          } else if (type === "basicEducation") {
            // 기본 교육 자료 전송 알림 로직
            await kakao.sendTalk("designerEducationBasicSend", designer, phone, { designer, host: address.frontinfo.host, desid });
            await kakao.sendTalk("designerEducationConsoleSend", designer, phone, { designer, host: address.frontinfo.host, desid });
            await messageSend({
              text: designer + " 실장님께 디자이너 가이드와 콘솔 설명서를 전송하였습니다!",
              channel,
              voice,
              fairy
            });
            res.send(JSON.stringify({ message: "success" }));
        
          } else if (type === "consoleEducation") {
            // 콘솔 설명서 전송 알림 로직
            await kakao.sendTalk("designerEducationConsoleSend", designer, phone, { designer, host: address.frontinfo.host, desid });
            await messageSend({
              text: designer + " 실장님께 콘솔 설명서를 전송하였습니다!",
              channel,
              voice,
              fairy
            });
            res.send(JSON.stringify({ message: "success" }));
        
          } else if (type === "settingPortfolio") {
            // 세트 포트폴리오 요청 페이지 전송 알림 로직
            await kakao.sendTalk("designerSettingPortfolioSend", designer, phone, { designer, host: address.frontinfo.host, desid, path: "setting" });
            await messageSend({
              text: designer + " 실장님께 세트 포트폴리오 요청 페이지를 전송하였습니다!",
              channel,
              voice,
              fairy
            });
            res.send(JSON.stringify({ message: "success" }));
        
          } else if (type === "statusCheck") {
            // 프로젝트 상태 체크 요청 알림 로직
            await kakao.sendTalk("progressDesignerTotal", designer, phone, { designer, host: address.frontinfo.host, desid });
            await messageSend({
              text: designer + " 실장님께 프로젝트 상태 체크를 요청하였습니다!",
              channel,
              voice,
              fairy
            });
            res.send(JSON.stringify({ message: "success" }));
        
          } else if (type === "entire") {
            // 일괄 체크리스트 업로드 및 업데이트 알림 로직
            await kakao.sendTalk("noticeDesignerEntire", designer, phone, { designer, host: address.frontinfo.host, path: "about", desid });
            await messageSend({
              text: designer + " 실장님께 일괄 체크리스트 업로드 및 업데이트 알림톡을 전송하였습니다!",
              channel,
              voice,
              fairy
            });
            res.send(JSON.stringify({ message: "success" }));
        
          } else if (type === "until") {
            // 특정 날짜까지의 체크리스트 업로드 및 업데이트 알림 로직
            await kakao.sendTalk("noticeDesignerEntireUntil", designer, phone, { designer, date: req.body.until, host: address.frontinfo.host, path: "about", desid });
            await messageSend({
              text: designer + " 실장님께 일괄 체크리스트 업로드 및 업데이트 알림톡을 전송하였습니다!",
              channel,
              voice,
              fairy
            });
            res.send(JSON.stringify({ message: "success" }));
        
          } else if (type === "proposalProfile") {
            // 추천서 안내 및 프로필 업로드 요청 알림 로직
            await kakao.sendTalk("noticeDesignerProfileWithProposal", designer, phone, { designer, date: req.body.until, host: address.frontinfo.host, path: "proposal_manual", desid });
            await messageSend({
              text: designer + " 실장님께 추천서 안내 및 프로필 업로드 요청 알림톡을 전송하였습니다!",
              channel,
              voice,
              fairy
            });
            res.send(JSON.stringify({ message: "success" }));
        
          } else {
            throw new Error("invalid type"); // 유효하지 않은 type 값일 경우 예외를 던집니다.
          }

        /**
         * @description mode 값이 "get"인 경우, 디자이너의 알림 로그 데이터를 조회하여 반환합니다.
         * 특정 디자이너 ID로 조회하거나, 전체 로그 데이터를 조회할 수 있습니다.
         */
        } else if (mode === "get") {
          if (req.body.desid !== undefined) { // 특정 디자이너 ID로 조회할 경우
            rows = await back.mongoRead(collection, { "designer.desid": req.body.desid }, { selfMongo }); // 해당 디자이너의 로그 조회
            if (rows.length > 0) {
              res.send(JSON.stringify(rows[0])); // 조회된 로그 데이터를 반환
            } else {
              throw new Error("invalid desid"); // 유효하지 않은 디자이너 ID일 경우 예외를 던집니다.
            }
          } else { // 전체 로그 데이터를 조회할 경우
            rows = await back.mongoRead(collection, {}, { selfMongo }); // 전체 로그 조회
            res.send(JSON.stringify(rows)); // 조회된 전체 로그 데이터를 반환
          }
        } else {
          throw new Error("invalid mode"); // 유효하지 않은 mode 값일 경우 예외를 던집니다.
        }

      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); }); // 로그에 오류 기록
        res.send(JSON.stringify({ error: e.message })); // 오류 메시지를 JSON으로 클라이언트에 전송
      }
    });

    /**
     * @route POST /noticeAspirantConsole
     * @description 이 라우트는 홈리에종에 지원한 디자이너 신청자(Aspirant)에게 알림을 전송하거나 로그 데이터를 관리하는 엔드포인트입니다.
     * 클라이언트의 요청에 따라 다양한 알림을 신청자에게 전송하거나, 로그 데이터를 조회할 수 있습니다.
     * @param {object} req - 클라이언트 요청 객체.
     * @param {object} req.body - 요청 본문 객체.
     * @param {string} req.body.mode - 요청 모드 ("send" 또는 "get").
     * @param {string} [req.body.aspid] - 신청자 ID, 알림을 보낼 때 필요합니다.
     * @param {string} [req.body.designer] - 신청자 이름, 알림을 보낼 때 필요합니다.
     * @param {string} [req.body.type] - 알림 타입, "send" 모드일 때 필요합니다.
     * @param {string} [req.body.phone] - 신청자 전화번호, 알림을 보낼 때 필요합니다.
     * @param {object} res - 서버 응답 객체.
     */
    router.post([ "/noticeAspirantConsole" ], async function (req, res) {
      /**
       * @description 응답 헤더를 설정합니다. 응답을 JSON 형식으로 반환하고,
       * 모든 출처에서의 접근을 허용하며, 특정 HTTP 메서드와 헤더를 허용합니다.
       */
      res.set({
        "Content-Type": "application/json", // 응답의 Content-Type을 JSON으로 설정합니다.
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 지정합니다.
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 요청 헤더를 지정합니다.
      });

      try {
        /**
         * @description mode 값이 존재하지 않으면 "invalid post" 오류를 발생시킵니다.
         * 이는 요청 데이터의 필수 요소가 모두 있는지 확인하는 단계입니다.
         */
        if (req.body.mode === undefined) {
          throw new Error("invalid post"); // 필수 요청 데이터가 없을 경우 예외를 던집니다.
        }

        /**
         * @description MongoDB 클라이언트 인스턴스를 selfMongo와 selfCoreMongo 변수에 할당합니다.
         * 이 변수들은 이후 MongoDB와의 상호작용에서 사용됩니다.
         */
        const selfMongo = mongo; // 일반 MongoDB 인스턴스
        const selfCoreMongo = instance.mongo; // 코어 MongoDB 인스턴스

        /**
         * @description 신청자 콘솔 알림 데이터를 저장할 컬렉션 이름을 정의합니다.
         * 'noticeAspirantConsole'은 신청자와 관련된 알림 로그를 기록하는 컬렉션입니다.
         */
        const collection = "noticeAspirantConsole"; // MongoDB 컬렉션 이름

        const channel = "#301_apply"; // 슬랙 채널 이름을 설정합니다.
        const idWords = "noticeAspirantConsoleSend_"; // 알림 로그 ID의 접두사를 설정합니다.
        const voice = true; // 알림 전송 시 음성을 사용할지 여부를 설정합니다.
        const fairy = false; // 알림 전송 시 페어리 모드를 사용할지 여부를 설정합니다.

        /**
         * @description 요청 본문에서 mode 값을 추출합니다.
         * 이 값에 따라 알림을 전송하거나 로그 데이터를 조회합니다.
         */
        const { mode } = equalJson(req.body); // DeepCopy된 JSON에서 mode를 추출

        let logDefaultObj; // 기본 로그 객체를 담을 변수
        let thisJson; // 현재 작업 중인 JSON 객체를 담을 변수
        let rows; // MongoDB에서 조회한 데이터를 담을 변수
        let thisId; // 현재 작업 중인 로그 ID를 담을 변수
        let thisHistory; // 현재 작업 중인 로그의 히스토리를 담을 변수

        /**
         * @description mode 값이 "send"인 경우, 신청자에게 특정 알림을 전송합니다.
         */
        if (mode === "send") {
          const { aspid, designer, type, phone } = equalJson(req.body); // 요청 본문에서 aspid, designer, type, phone 값을 추출합니다.

          /**
           * @description 기본 로그 객체를 정의합니다.
           * 알림이 전송될 때마다 로그가 기록되며, 여기에 ID, 타입, 날짜, 신청자 정보가 포함됩니다.
           */
          logDefaultObj = {
            id: idWords + uniqueValue("hex"), // 로그 ID를 생성
            type, // 알림 타입 설정
            date: new Date(), // 현재 날짜 설정
            aspirant: {
              aspid, // 신청자 ID 설정
              designer, // 신청자 이름 설정
            },
            history: [], // 알림 전송 히스토리를 기록할 배열
          };

          thisJson = equalJson(JSON.stringify(logDefaultObj)); // 로그 객체를 DeepCopy하여 JSON으로 변환

          /**
           * @description MongoDB에서 해당 타입과 신청자 ID로 로그를 조회합니다.
           * 만약 기존 로그가 없으면 새로운 로그를 생성하고, 
           * 기존 로그가 있으면 히스토리에 새로운 알림 전송 기록을 추가합니다.
           */
          rows = await back.mongoRead(collection, { $and: [
            { type }, // 알림 타입 필터링
            { "aspirant.aspid": aspid }, // 신청자 ID 필터링
          ] }, { selfMongo }); // 필터링 조건을 사용하여 MongoDB에서 데이터 조회

          if (rows.length === 0) { // 기존 로그가 없으면
            thisJson.history.unshift(new Date()); // 새로운 히스토리 항목 추가
            await back.mongoCreate(collection, thisJson, { selfMongo }); // 새로운 로그를 MongoDB에 생성
          } else {
            thisId = rows[0].id; // 기존 로그의 ID를 가져옴
            thisHistory = rows[0].history; // 기존 로그의 히스토리 가져옴
            thisHistory.unshift(new Date()); // 새로운 히스토리 항목 추가
            await back.mongoUpdate(collection, [
              { id: thisId }, // 업데이트할 로그의 조건 설정
              { date: new Date(), history: thisHistory }, // 새로운 데이터로 업데이트
            ], { selfMongo }); // MongoDB에서 데이터 업데이트
          }

          /**
           * @description 알림 타입에 따라 다른 종류의 알림을 전송합니다.
           * 각 타입에 대해 카카오톡 메시지와 슬랙 메시지를 전송하는 로직이 구현되어 있습니다.
           */
          if (type === "documents") {
            // 등록 서류 업로드 요청 알림 전송 로직
            await kakao.sendTalk("aspirantRequestDocuments", designer, phone, { client: designer, host: address.frontinfo.host, path: "aspnotice", aspid });
            await messageSend({
              text: designer + " 실장님께 등록 서류 업로드 요청 알림톡을 전송하였습니다!",
              channel,
              voice,
              fairy
            });
            res.send(JSON.stringify({ message: "success" }));
        
          } else if (type === "payment") {
            // 등록비 결제 요청 알림 전송 로직
            await kakao.sendTalk("aspirantRequestPayment", designer, phone, { client: designer, host: address.frontinfo.host, path: "asppayment", aspid });
            await messageSend({
              text: designer + " 실장님께 등록비 결제 요청 알림톡을 전송하였습니다!",
              channel,
              voice,
              fairy
            });
            res.send(JSON.stringify({ message: "success" }));
        
          } else if (type === "plus") {
            // 추가 포트폴리오 요청 알림 전송 로직
            await kakao.sendTalk("aspirantRequestPortfolio", designer, phone, { client: designer, host: address.frontinfo.host, path: "aspportfolio", aspid });
            await messageSend({
              text: designer + " 실장님께 추가 포트폴리오 요청 알림톡을 전송하였습니다!",
              channel,
              voice,
              fairy
            });
            res.send(JSON.stringify({ message: "success" }));
        
          } else if (type === "fail") {
            // 불합격 통지 알림 전송 로직
            await human.sendSms({
              to: phone.replace(/[^0-9]/gi, ''), // 전화번호에서 숫자 외의 문자 제거
              body: ("안녕하세요, " + designer + "님! 홈리에종입니다.\n" +
              "보내주신 신청서를 확인해 보았으나 아쉽게도 저희를 찾아주신 고객님들께 홈스타일링 서비스를 바로 제공하기에는 적합하지 않다고 판단되어 연락드립니다.\n\n" +
              "혹시 추가적으로 포트폴리오 및 경력사항을 상세히 다시 보내주시면 다시 한 번 검토 후에 연락드리도록 하겠습니다.\n" +
              "궁금한 사항이 있으시면 카카오 채널에서 [홈리에종]을 검색, 친구 추가 후 문의 사항 남겨주세요. 순차적으로 답변드리도록 하겠습니다!\n" +
              "\n" +
              "*추가 포트폴리오 전송\n" +
              "https://" + address.frontinfo.host + "/" + "aspportfolio" + ".php?aspid=" + aspid),
            });
            await messageSend({
              text: designer + " 실장님께 불합격 통지 알림톡을 전송하였습니다!",
              channel,
              voice,
              fairy
            });
            res.send(JSON.stringify({ message: "success" }));
        
          } else if (type === "pure") {
            // 부재중 알림 전송 로직
            await kakao.sendTalk("aspirantRequestPure", designer, phone, { client: designer });
            await messageSend({
              text: designer + " 실장님께 부재중 알림 알림톡을 전송하였습니다!",
              channel,
              voice,
              fairy
            });
            res.send(JSON.stringify({ message: "success" }));
        
          } else if (type === "setting") {
            // 세팅 포트폴리오 요청 알림 전송 로직
            await kakao.sendTalk("aspirantRequestSetting", designer, phone, { client: designer, host: address.frontinfo.host, path: "aspsetting", aspid });
            await messageSend({
              text: designer + " 실장님께 세팅 포트폴리오 요청 알림톡을 전송하였습니다!",
              channel,
              voice,
              fairy
            });
            res.send(JSON.stringify({ message: "success" }));
        
          } else {
            throw new Error("invalid type"); // 유효하지 않은 type 값일 경우 예외를 던집니다.
          }

        /**
         * @description mode 값이 "get"인 경우, 신청자의 알림 로그 데이터를 조회하여 반환합니다.
         * 특정 신청자 ID로 조회하거나, 전체 로그 데이터를 조회할 수 있습니다.
         */
        } else if (mode === "get") {
          if (req.body.aspid !== undefined) { // 특정 신청자 ID로 조회할 경우
            rows = await back.mongoRead(collection, { "aspirant.aspid": req.body.aspid }, { selfMongo }); // 해당 신청자의 로그 조회
            if (rows.length > 0) {
              res.send(JSON.stringify(rows[0])); // 조회된 로그 데이터를 반환
            } else {
              throw new Error("invalid aspid"); // 유효하지 않은 신청자 ID일 경우 예외를 던집니다.
            }
          } else { // 전체 로그 데이터를 조회할 경우
            rows = await back.mongoRead(collection, {}, { selfMongo }); // 전체 로그 조회
            res.send(JSON.stringify(rows)); // 조회된 전체 로그 데이터를 반환
          }
        } else {
          throw new Error("invalid mode"); // 유효하지 않은 mode 값일 경우 예외를 던집니다.
        }

      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); }); // 로그에 오류 기록
        res.send(JSON.stringify({ error: e.message })); // 오류 메시지를 JSON으로 클라이언트에 전송
      }
    });
    
    /**
     * @route POST /noticeAspirantCommon
     * @description 이 라우트는 홈리에종에 지원한 디자이너 신청자(Aspirant)에게 공통 교육 관련 알림을 전송하거나, 로그 데이터를 관리하는 엔드포인트입니다.
     * 클라이언트의 요청에 따라 다양한 알림을 신청자에게 전송하거나, 로그 데이터를 조회할 수 있습니다.
     * @param {object} req - 클라이언트 요청 객체.
     * @param {object} req.body - 요청 본문 객체.
     * @param {string} req.body.mode - 요청 모드 ("send", "store", "get", "confirm", "guide", "reject").
     * @param {string} req.body.aspid - 신청자 ID, 알림을 보낼 때 필요합니다.
     * @param {string} [req.body.value] - 추가적인 값, 알림을 전송하거나 데이터를 저장할 때 사용됩니다.
     * @param {object} res - 서버 응답 객체.
     */
    router.post([ "/noticeAspirantCommon" ], async function (req, res) {
      /**
       * @description 응답 헤더를 설정합니다. 응답을 JSON 형식으로 반환하고,
       * 모든 출처에서의 접근을 허용하며, 특정 HTTP 메서드와 헤더를 허용합니다.
       */
      res.set({
          "Content-Type": "application/json", // 응답의 Content-Type을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 지정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 요청 헤더를 지정합니다.
      });

      try {
          /**
           * @description MongoDB 클라이언트 인스턴스를 selfMongo와 selfLocalMongo 변수에 할당합니다.
           * 이 변수들은 이후 MongoDB와의 상호작용에서 사용됩니다.
           */
          const selfMongo = instance.mongo; // 코어 MongoDB 인스턴스
          const selfLocalMongo = mongo; // 로컬 MongoDB 인스턴스

          /**
           * @description 신청자 공통 교육 관련 알림 데이터를 저장할 컬렉션 이름을 정의합니다.
           * 'noticeAspirantCommon'은 신청자와 관련된 공통 교육 알림 로그를 기록하는 컬렉션입니다.
           */
          const collection = "noticeAspirantCommon"; // MongoDB 컬렉션 이름

          const idKeywords = "noticeAspirantCommonSend_"; // 알림 로그 ID의 접두사를 설정합니다.
          const { aspid, mode } = equalJson(req.body); // Deepcopy된 JSON에서 aspid와 mode를 추출

          /**
           * @description 신청자 정보를 가져옵니다. 
           * 이는 신청자 ID로 MongoDB에서 해당 신청자의 데이터를 조회하여 사용됩니다.
           */
          const aspirant = await back.getAspirantById(aspid, { selfMongo }); // 신청자 정보 조회
          const channel = "#301_apply"; // 슬랙 채널 이름을 설정합니다.
          const masterId = "UM1S7H3GQ"; // 관리자 ID를 설정합니다.
          const addressConst = "서울 성동구 성수일로 10 서울숲ITCT지식산업센터 605호"; // 교육 장소 주소
          let json; // JSON 객체를 담을 변수
          let rows; // MongoDB에서 조회한 데이터를 담을 변수
          let thisId, thisHistory; // 로그 ID와 히스토리를 담을 변수
          let createBoo; // 로그를 새로 생성할지 여부를 결정하는 변수

          /**
           * @description mode 값이 "send"인 경우, 신청자에게 공통 교육 관련 알림을 전송하고 로그를 기록합니다.
           */
          if (mode === "send") {
              const { value } = equalJson(req.body); // 요청 본문에서 value 값을 추출합니다.
              
              // 신청자의 기존 로그를 조회합니다.
              rows = await back.mongoRead(collection, { "aspirant.aspid": aspid }, { selfMongo: selfLocalMongo });

              if (rows.length === 0) { // 기존 로그가 없으면
                  json = {
                      id: idKeywords + uniqueValue("hex"), // 새로운 로그 ID 생성
                      type: "common", // 로그 타입 설정
                      date: new Date(), // 현재 날짜 설정
                      aspirant: {
                          aspid: aspid, // 신청자 ID 설정
                          designer: aspirant.designer, // 신청자 이름 설정
                      },
                      history: [] // 히스토리를 기록할 배열
                  };
                  createBoo = true; // 로그를 새로 생성해야 함을 표시
              } else {
                  json = equalJson(JSON.stringify(rows[0])); // 기존 로그를 가져옴
                  createBoo = false; // 기존 로그를 업데이트해야 함을 표시
              }

              if (value !== "default") { // value 값이 "default"가 아닌 경우
                  json.history.unshift({
                      date: new Date(), // 현재 날짜
                      value: value, // 전달된 값
                  });
                  thisId = json.id; // 로그 ID를 설정
                  thisHistory = equalJson(JSON.stringify(json.history)); // 히스토리를 JSON으로 변환

                  if (createBoo) {
                      await back.mongoCreate(collection, json, { selfMongo: selfLocalMongo }); // 새 로그 생성
                  } else {
                      await back.mongoUpdate(collection, [
                          { id: thisId }, // 업데이트할 로그 조건
                          { date: new Date(), history: thisHistory }, // 업데이트할 데이터
                      ], { selfMongo: selfLocalMongo }); // 기존 로그 업데이트
                  }
              }

              // 신청자의 공통 교육 상태를 "미팅 조율"로 업데이트
              await back.updateAspirant([
                  { aspid: aspid },
                  { "meeting.common.status": "미팅 조율" }
              ], { selfMongo });

              // 카카오톡 알림 전송
              await kakao.sendTalk("aspirantRequestCommon", aspirant.designer, aspirant.phone, { client: aspirant.designer, host: address.frontinfo.host, path: "aspcommon", aspid: aspid });

              // 슬랙 메시지 전송
              await messageSend({
                  text: aspirant.designer + " 실장님께 공통 교육 안내 및 선택 알림톡을 전송하였습니다!",
                  channel,
                  voice: true,
              });

              res.send(JSON.stringify({ message: "done" })); // 작업 완료 메시지를 클라이언트에 전송

          } else if (mode === "store") {
              // mode 값이 "store"인 경우, 데이터를 저장합니다.
              const { value } = equalJson(req.body); // 요청 본문에서 value 값을 추출합니다.
              
              rows = await back.mongoRead(collection, { "aspirant.aspid": aspid }, { selfMongo: selfLocalMongo }); // 신청자의 기존 로그 조회

              if (rows.length === 0) { // 기존 로그가 없으면
                  json = {
                      id: idKeywords + uniqueValue("hex"), // 새로운 로그 ID 생성
                      type: "common", // 로그 타입 설정
                      date: new Date(), // 현재 날짜 설정
                      aspirant: {
                          aspid: aspid, // 신청자 ID 설정
                          designer: aspirant.designer, // 신청자 이름 설정
                      },
                      history: [] // 히스토리를 기록할 배열
                  };
                  createBoo = true; // 로그를 새로 생성해야 함을 표시
              } else {
                  json = equalJson(JSON.stringify(rows[0])); // 기존 로그를 가져옴
                  createBoo = false; // 기존 로그를 업데이트해야 함을 표시
              }

              json.history.unshift({
                  date: new Date(), // 현재 날짜
                  value: value, // 전달된 값
              });
              thisId = json.id; // 로그 ID를 설정
              thisHistory = equalJson(JSON.stringify(json.history)); // 히스토리를 JSON으로 변환

              if (createBoo) {
                  await back.mongoCreate(collection, json, { selfMongo: selfLocalMongo }); // 새 로그 생성
              } else {
                  await back.mongoUpdate(collection, [
                      { id: thisId }, // 업데이트할 로그 조건
                      { date: new Date(), history: thisHistory }, // 업데이트할 데이터
                  ], { selfMongo: selfLocalMongo }); // 기존 로그 업데이트
              }

              res.send(JSON.stringify({ message: "done" })); // 작업 완료 메시지를 클라이언트에 전송

          } else if (mode === "get") {
              // mode 값이 "get"인 경우, 데이터를 조회합니다.
              rows = await back.mongoRead(collection, { "aspirant.aspid": aspid }, { selfMongo: selfLocalMongo }); // 신청자의 기존 로그 조회

              if (rows.length === 0) { // 로그가 없으면
                  res.send(JSON.stringify({ message: "ok", data: null })); // 빈 데이터와 함께 응답
              } else {
                  res.send(JSON.stringify({ message: "ok", data: rows[0] })); // 조회된 데이터를 클라이언트에 전송
              }

          } else if (mode === "confirm") {
              // mode 값이 "confirm"인 경우, 공통 교육 일자를 확정합니다.
              const { value } = equalJson(req.body); // 요청 본문에서 value 값을 추출합니다.
              const thisDate = new Date(Number(value)); // 전달된 값을 날짜 객체로 변환

              await back.updateAspirant([
                  { aspid: aspid },
                  { "meeting.common.date": thisDate, "meeting.common.status": "참석 확정" }
              ], { selfMongo }); // 신청자의 공통 교육 일자와 상태를 업데이트

              // 슬랙 메시지 전송
              await messageSend({
                  text: aspirant.designer + " 실장님이 공통 교육 일자를 선택하셨습니다! => " + dateToString(thisDate, true) + " <@" + masterId + ">",
                  channel,
                  voice: true,
              });

              // 카카오톡 알림 전송
              await kakao.sendTalk("aspirantRequestCommonConfirm", aspirant.designer, aspirant.phone, {
                  client: aspirant.designer,
                  date: `${String(thisDate.getFullYear())}년 ${String(thisDate.getMonth() + 1)}월 ${String(thisDate.getDate())}일 ${String(thisDate.getHours())}시 ${String(thisDate.getMinutes())}분`,
                  address: addressConst,
              });

              await messageSend({
                  text: aspirant.designer + " 실장님께 공통 교육 일자와 장소를 안내하였습니다!",
                  channel,
                  voice: true,
              });

              res.send(JSON.stringify({ message: "done" })); // 작업 완료 메시지를 클라이언트에 전송

          } else if (mode === "guide") {
              // mode 값이 "guide"인 경우, 공통 교육 일자와 장소를 안내합니다.
              const thisDate = aspirant.meeting.common.date; // 신청자의 공통 교육 일자를 가져옴

              await kakao.sendTalk("aspirantRequestCommonConfirm", aspirant.designer, aspirant.phone, {
                  client: aspirant.designer,
                  date: `${String(thisDate.getFullYear())}년 ${String(thisDate.getMonth() + 1)}월 ${String(thisDate.getDate())}일 ${String(thisDate.getHours())}시 ${String(thisDate.getMinutes())}분`,
                  address: addressConst,
              });

              await messageSend({
                  text: aspirant.designer + " 실장님께 공통 교육 일자와 장소를 안내하였습니다!",
                  channel,
                  voice: true,
              });

              res.send(JSON.stringify({ message: "done" })); // 작업 완료 메시지를 클라이언트에 전송

          } else if (mode === "reject") {
              // mode 값이 "reject"인 경우, 신청자가 공통 교육 참석이 불가함을 알립니다.
              await messageSend({
                  text: aspirant.designer + " 실장님이 공통 교육이 가능한 일자가 없다고 하셨습니다! <@" + masterId + ">",
                  channel,
                  voice: true,
              });

              res.send(JSON.stringify({ message: "done" })); // 작업 완료 메시지를 클라이언트에 전송

          } else {
              throw new Error("invalid mode"); // 유효하지 않은 mode 값일 경우 예외를 던집니다.
          }

      } catch (e) {
          logger.error(e, req).catch((e) => { console.log(e); }); // 로그에 오류 기록
          res.send(JSON.stringify({ error: e.message })); // 오류 메시지를 JSON으로 클라이언트에 전송
      }
    });
    
    /**
     * @route POST /noticeAspirantContractYesterday
     * @description 이 라우트는 홈리에종에 지원한 디자이너 신청자(Aspirant)들 중 전날 계약이 요청된 신청자들에게
     * 계약 생성 및 관련 알림을 전송하는 작업을 수행합니다.
     * @param {object} req - 클라이언트 요청 객체.
     * @param {object} req.body - 요청 본문 객체.
     * @param {object} res - 서버 응답 객체.
     */
    router.post([ "/noticeAspirantContractYesterday" ], async function (req, res) {
      /**
       * @description 응답 헤더를 설정합니다. 응답을 JSON 형식으로 반환하고,
       * 모든 출처에서의 접근을 허용하며, 특정 HTTP 메서드와 헤더를 허용합니다.
       */
      res.set({
          "Content-Type": "application/json", // 응답의 Content-Type을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 지정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 요청 헤더를 지정합니다.
      });

      try {
          /**
           * @description MongoDB 인스턴스를 selfMongo 변수에 할당합니다.
           * 이후 MongoDB와의 상호작용에서 사용됩니다.
           */
          const selfMongo = instance.mongo;

          /**
           * @description 전날 계약 요청이 있는 신청자들을 대상으로 계약 생성 및 알림 전송 작업을 수행하는 비동기 함수입니다.
           * @param {object} selfMongo - MongoDB 인스턴스.
           * @param {object} logger - 로그 기록을 위한 로거 인스턴스.
           */
          const requestAspirantContract = async (selfMongo, logger) => {
              try {
                  const agoStandard = 6; // 6개월 이전을 기준으로 함
                  const sixMonthAgo = new Date();
                  sixMonthAgo.setMonth(sixMonthAgo.getMonth() - agoStandard); // 6개월 전의 날짜를 계산

                  /**
                   * @description 6개월 이내에 파트너십 신청서를 제출한 신청자들을 조회합니다.
                   */
                  const aspirants = await back.getAspirantsByQuery({
                      "submit.partnership.date": {
                          $gte: sixMonthAgo, // 6개월 전 이후의 신청자만 조회
                      }
                  }, { selfMongo: selfMongo });

                  const yesterday = new Date();
                  yesterday.setDate(yesterday.getDate() - 1); // 전날의 날짜를 계산
                  const emptyDate = new Date(2000, 0, 1); // 빈 날짜 기준을 설정
                  const emptyDateValue = emptyDate.valueOf(); // 빈 날짜의 값

                  let targets = []; // 계약 요청 대상 신청자들을 저장할 배열
                  let tempArr; // 날짜 문자열을 저장할 임시 배열
                  let thisYear, thisMonth, thisDate; // 비교할 연도, 월, 날짜
                  let year, month, date; // 전날의 연도, 월, 날짜
                  let whereQuery, updateQuery; // MongoDB 쿼리 객체들

                  year = yesterday.getFullYear(); // 전날의 연도를 추출
                  month = yesterday.getMonth() + 1; // 전날의 월을 추출
                  date = yesterday.getDate(); // 전날의 날짜를 추출

                  /**
                   * @description 신청자들 중에서 전날 공통 교육이 있었던 신청자들을 필터링하여 targets 배열에 추가합니다.
                   */
                  for (let aspirant of aspirants) {
                      if (aspirant.meeting.common.date.valueOf() > emptyDateValue) { // 공통 교육 날짜가 유효한 경우
                          tempArr = dateToString(aspirant.meeting.common.date).split("-"); // 날짜를 문자열로 변환하여 배열에 저장
                          thisYear = Number(tempArr[0]); // 교육 연도
                          thisMonth = Number(tempArr[1]); // 교육 월
                          thisDate = Number(tempArr[2]); // 교육 날짜
                          if (thisYear === year && thisMonth === month && thisDate === date) { // 교육이 전날에 있었는지 확인
                              targets.push(aspirant.toNormal()); // 전날 교육이 있었으면 targets에 추가
                          }
                      }
                  }

                  /**
                   * @description 필터링된 신청자들에 대해 계약 요청 및 관련 작업을 수행합니다.
                   */
                  for (let aspirant of targets) {
                      if (!/드랍/gi.test(aspirant.meeting.status)) { // 신청자의 상태가 "드랍"이 아닌 경우에만 수행
                          whereQuery = { aspid: aspirant.aspid }; // 신청자 ID를 기준으로 쿼리 생성
                          updateQuery = { "meeting.status": "계약 요청" }; // 신청자의 상태를 "계약 요청"으로 업데이트

                          await back.updateAspirant([ whereQuery, updateQuery ], { selfMongo }); // 신청자 상태 업데이트
                          await sleep(500); // 작업 사이에 500ms의 지연을 둠

                          /**
                           * @description 신청자에 대해 파트너십 계약을 생성합니다.
                           */
                          await requestSystem("https://" + address.officeinfo.host + ":3002/createPartnershipContract", { aspid: aspirant.aspid }, { headers: { "Content-Type": "application/json" } });
                          await sleep(500); // 작업 사이에 500ms의 지연을 둠

                          /**
                           * @description 신청자에 대해 디자이너 계약을 생성합니다.
                           */
                          await requestSystem("https://" + address.officeinfo.host + ":3002/createDesignerContract", { aspid: aspirant.aspid }, { headers: { "Content-Type": "application/json" } });
                          await sleep(500); // 작업 사이에 500ms의 지연을 둠

                          /**
                           * @description 신청자의 포트폴리오가 등록되지 않은 경우, 포트폴리오 세팅 알림을 전송합니다.
                           */
                          if (aspirant.response.portfolio.plus.photo.valueOf() < emptyDateValue) {
                              await sleep(500); // 작업 사이에 500ms의 지연을 둠
                              await requestSystem("https://" + address.secondinfo.host + ":3003/noticeAspirantConsole", {
                                  mode: "send",
                                  aspid: aspirant.aspid,
                                  designer: aspirant.designer,
                                  phone: aspirant.phone,
                                  type: "setting",
                              }, {
                                  headers: { "Content-Type": "application/json" },
                              });
                          }
                      }
                  }

                  return true; // 작업이 성공적으로 완료됨을 반환
              } catch (e) {
                  logger.error(e, req).catch((e) => { console.log(e); }); // 오류를 로그에 기록
                  console.log(e); // 오류를 콘솔에 출력
                  return false; // 작업 실패를 반환
              }
          };

          /**
           * @description 신청자 계약 요청 작업을 비동기적으로 호출합니다.
           */
          requestAspirantContract(selfMongo, logger).catch((err) => {
              logger.error(e, req).catch((e) => { console.log(e); }); // 오류를 로그에 기록
              console.log(err); // 오류를 콘솔에 출력
          });

          res.send(JSON.stringify({ message: "will do" })); // 작업이 예정됨을 클라이언트에 응답

      } catch (e) {
          logger.error(e, req).catch((e) => { console.log(e); }); // 오류를 로그에 기록
          res.send(JSON.stringify({ error: e.message })); // 오류 메시지를 JSON으로 클라이언트에 전송
      }
    });
    
    /**
     * @route POST /noticeAspirantOnBoarding
     * @description 이 라우트는 홈리에종에 지원한 디자이너 신청자(Aspirant)들 중 온보딩 조건을 충족한 신청자들에 대해
     * 특정 작업(예: 긴급 알림 전송)을 수행하는 엔드포인트입니다.
     * @param {object} req - 클라이언트 요청 객체.
     * @param {object} req.body - 요청 본문 객체.
     * @param {object} res - 서버 응답 객체.
     */
    router.post([ "/noticeAspirantOnBoarding" ], async function (req, res) {
      /**
       * @description 응답 헤더를 설정합니다. 응답을 JSON 형식으로 반환하고,
       * 모든 출처에서의 접근을 허용하며, 특정 HTTP 메서드와 헤더를 허용합니다.
       */
      res.set({
          "Content-Type": "application/json", // 응답의 Content-Type을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 지정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 요청 헤더를 지정합니다.
      });

      try {
          /**
           * @description MongoDB 인스턴스를 selfMongo 변수에 할당합니다.
           * 이후 MongoDB와의 상호작용에서 사용됩니다.
           */
          const selfMongo = instance.mongo;

          /**
           * @description 온보딩 조건을 충족한 신청자들을 대상으로 작업을 수행하는 비동기 함수입니다.
           * @param {object} selfMongo - MongoDB 인스턴스.
           * @param {object} logger - 로그 기록을 위한 로거 인스턴스.
           */
          const requestAspirantBoarding = async (selfMongo, logger) => {
              try {
                  const agoStandard = 12; // 12개월 이전을 기준으로 함
                  const sixMonthAgo = new Date();
                  sixMonthAgo.setMonth(sixMonthAgo.getMonth() - agoStandard); // 12개월 전의 날짜를 계산

                  /**
                   * @description 12개월 이내에 파트너십 신청서를 제출한 신청자들을 조회합니다.
                   */
                  const aspirants = await back.getAspirantsByQuery({
                      "submit.partnership.date": {
                          $gte: sixMonthAgo, // 12개월 전 이후의 신청자만 조회
                      }
                  }, { selfMongo: selfMongo });

                  const yesterday = new Date();
                  yesterday.setDate(yesterday.getDate() - 1); // 전날의 날짜를 계산
                  const now = new Date(); // 현재 날짜를 설정
                  const emptyDate = new Date(2000, 0, 1); // 빈 날짜 기준을 설정
                  const emptyDateValue = emptyDate.valueOf(); // 빈 날짜의 값

                  let targets = []; // 온보딩 대상 신청자들을 저장할 배열

                  /**
                   * @description 신청자들 중 온보딩 조건을 충족한 신청자들을 필터링하여 targets 배열에 추가합니다.
                   */
                  for (let aspirant of aspirants) {
                      if (aspirant.meeting.common.date.valueOf() > emptyDateValue) { // 공통 교육 날짜가 유효한 경우
                          if (aspirant.meeting.common.date.valueOf() <= now.valueOf()) { // 공통 교육 날짜가 현재 날짜 이전인 경우
                              if (aspirant.submit.registration.date.valueOf() > emptyDateValue) { // 등록 날짜가 유효한 경우
                                  if (aspirant.response.portfolio.plus.photo.valueOf() > emptyDateValue) { // 포트폴리오 사진 등록이 유효한 경우
                                      if (/계약 완료/gi.test(aspirant.meeting.status)) { // 신청자의 상태가 "계약 완료"인 경우
                                          targets.push(aspirant.toNormal()); // 조건을 충족한 신청자를 targets 배열에 추가
                                      }
                                  }
                              }
                          }
                      }
                  }

                  /**
                   * @description 필터링된 신청자들의 정보를 긴급 알림으로 전송합니다.
                   */
                  await emergencyAlarm("aspirant onboarding => " + "\n" + JSON.stringify(targets.map((a) => {
                      return {
                          aspid: a.aspid, // 신청자 ID
                          name: a.designer, // 신청자 이름
                      }
                  })));

                  return true; // 작업이 성공적으로 완료됨을 반환
              } catch (e) {
                  logger.error(e, req).catch((e) => { console.log(e); }); // 오류를 로그에 기록
                  console.log(e); // 오류를 콘솔에 출력
                  return false; // 작업 실패를 반환
              }
          };

          /**
           * @description 신청자 온보딩 작업을 비동기적으로 호출합니다.
           */
          requestAspirantBoarding(selfMongo, logger).catch((err) => {
              logger.error(e, req).catch((e) => { console.log(e); }); // 오류를 로그에 기록
              console.log(err); // 오류를 콘솔에 출력
          });

          res.send(JSON.stringify({ message: "will do" })); // 작업이 예정됨을 클라이언트에 응답

      } catch (e) {
          logger.error(e, req).catch((e) => { console.log(e); }); // 오류를 로그에 기록
          res.send(JSON.stringify({ error: e.message })); // 오류 메시지를 JSON으로 클라이언트에 전송
      }
    });
    
    /**
     * @route POST /designerCareerSync
     * @description 이 라우트는 홈리에종에 등록된 디자이너들의 경력 정보를 동기화하는 작업을 수행합니다.
     * 각 디자이너의 경력 세부 사항을 기반으로 관련된 총 경력을 계산하고, 이를 업데이트합니다.
     * @param {object} req - 클라이언트 요청 객체.
     * @param {object} res - 서버 응답 객체.
     */
    router.post([ "/designerCareerSync" ], async function (req, res) {
      /**
       * @description 응답 헤더를 설정합니다. 응답을 JSON 형식으로 반환하고,
       * 모든 출처에서의 접근을 허용하며, 특정 HTTP 메서드와 헤더를 허용합니다.
       */
      res.set({
          "Content-Type": "application/json", // 응답의 Content-Type을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 지정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 요청 헤더를 지정합니다.
      });

      try {
          /**
           * @description MongoDB 인스턴스를 selfMongo 변수에 할당합니다.
           * 이후 MongoDB와의 상호작용에서 사용됩니다.
           */
          const selfMongo = instance.mongo;

          /**
           * @description 디자이너들의 경력 정보를 동기화하는 비동기 함수입니다.
           * 각 디자이너의 경력을 계산하고 관련 필드를 업데이트합니다.
           * @param {object} selfMongo - MongoDB 인스턴스.
           * @param {object} logger - 로그 기록을 위한 로거 인스턴스.
           */
          const designerCareerSyncFunc = async (selfMongo, logger) => {
              try {
                  /**
                   * @description 데이터베이스에서 모든 디자이너 정보를 가져옵니다.
                   */
                  const designers = await back.getDesignersByQuery({}, { selfMongo });

                  const futureDate = new Date(3000, 0, 1); // 미래의 기준 날짜 설정
                  const futureDateValue = futureDate.valueOf(); // 미래 날짜의 값
                  const now = new Date(); // 현재 날짜 설정
                  const nowValue = now.valueOf(); // 현재 날짜의 값

                  let whereQuery, updateQuery; // MongoDB 쿼리 객체들
                  let targetArr; // 필터링된 경력 세부 사항을 저장할 배열
                  let rawNumbers; // 경력 기간의 총합을 저장할 변수
                  let workingDay; // 경력 기간의 총 일수를 저장할 변수
                  let totalYears; // 총 경력 연수를 저장할 변수
                  let totalLeftDays; // 총 경력 연수 계산 후 남은 일수를 저장할 변수
                  let totalMonth; // 남은 일수에서 계산된 월 수를 저장할 변수

                  /**
                   * @description 각 디자이너에 대해 경력 정보를 동기화합니다.
                   */
                  for (let designer of designers) {
                      if (designer.information.business.career.detail.length > 0) { // 경력 세부 정보가 있는 경우
                          // "기타 업무"를 제외한 경력 세부 사항을 필터링하여 배열에 저장
                          targetArr = designer.information.business.career.detail.toNormal().filter((o) => { return !/기타 업무/gi.test(o.tag) });

                          // 각 경력의 기간을 계산하고 총합을 구함
                          rawNumbers = targetArr.map((o) => {
                              const { start, end } = o.date;
                              let thisValue;
                              if (end.valueOf() > futureDateValue){ // 경력이 아직 진행 중인 경우
                                  thisValue = nowValue - start.valueOf(); // 현재까지의 경력 기간을 계산
                              } else {
                                  thisValue = end.valueOf() - start.valueOf(); // 경력이 종료된 경우 기간 계산
                              }
                              return thisValue; // 계산된 기간 반환
                          }).reduce((acc, curr) => { return acc + curr }, 0); // 모든 경력의 기간을 합산

                          // 총 경력 일수를 계산
                          workingDay = Math.floor((((rawNumbers / 1000) / 60) / 60) / 24);
                          
                          // 총 경력 연수를 계산
                          totalYears = Math.floor(workingDay / 365);
                          
                          // 총 경력 연수를 계산한 후 남은 일수 계산
                          totalLeftDays = (workingDay % 365);
                          
                          // 남은 일수에서 경력 월 수 계산
                          totalMonth = Math.floor(totalLeftDays / 30);

                          // 디자이너 ID를 기준으로 쿼리 생성
                          whereQuery = { desid: designer.desid };

                          // 경력 연수와 월을 업데이트하기 위한 쿼리 생성
                          updateQuery = {};
                          updateQuery["information.business.career.relatedY"] = totalYears; // 총 경력 연수 업데이트
                          updateQuery["information.business.career.relatedM"] = totalMonth; // 총 경력 월 업데이트

                          // 디자이너 정보 업데이트
                          await back.updateDesigner([ whereQuery, updateQuery ], { selfMongo });
                      }
                  }

                  return true; // 작업이 성공적으로 완료됨을 반환
              } catch (e) {
                  logger.error(e, req).catch((e) => { console.log(e); }); // 오류를 로그에 기록
                  console.log(e); // 오류를 콘솔에 출력
                  return false; // 작업 실패를 반환
              }
          };

          /**
           * @description 디자이너 경력 동기화 작업을 비동기적으로 호출합니다.
           */
          designerCareerSyncFunc(selfMongo, logger).catch((err) => {
              logger.error(e, req).catch((e) => { console.log(e); }); // 오류를 로그에 기록
              console.log(err); // 오류를 콘솔에 출력
          });

          res.send(JSON.stringify({ message: "will do" })); // 작업이 예정됨을 클라이언트에 응답

      } catch (e) {
          logger.error(e, req).catch((e) => { console.log(e); }); // 오류를 로그에 기록
          res.send(JSON.stringify({ error: e.message })); // 오류 메시지를 JSON으로 클라이언트에 전송
      }
    });
    
    /**
     * @route POST /designerContentsInfo
     * @description 이 라우트는 디자이너의 콘텐츠 정보를 조회하거나 처리하는 역할을 합니다.
     * 주로 콘텐츠와 관련된 이미지 링크를 생성하고, 조건에 따라 필터링된 결과를 반환합니다.
     * @param {object} req - 클라이언트 요청 객체.
     * @param {object} req.body - 요청 본문 객체.
     * @param {object} res - 서버 응답 객체.
     */
    router.post([ "/designerContentsInfo" ], async function (req, res) {
      /**
       * @description 응답 헤더를 설정합니다. 응답을 JSON 형식으로 반환하고,
       * 모든 출처에서의 접근을 허용하며, 특정 HTTP 메서드와 헤더를 허용합니다.
       */
      res.set({
          "Content-Type": "application/json", // 응답의 Content-Type을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 지정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 요청 헤더를 지정합니다.
      });

      try {
          /**
           * @description 요청 본문에서 mode 값이 정의되지 않은 경우, 예외를 발생시킵니다.
           * mode는 이 라우트에서 수행할 작업의 종류를 결정합니다.
           */
          if (req.body.mode === undefined) {
              throw new Error("invalid post"); // 요청이 잘못된 경우 오류를 발생시킵니다.
          }

          const { mode } = req.body; // 요청 본문에서 mode 값을 추출합니다.
          const selfMongo = instance.mongo; // MongoDB 인스턴스를 selfMongo 변수에 할당합니다.
          let thisDesigner, thisContents; // 디자이너 정보와 콘텐츠 정보를 저장할 변수들
          let targetContents; // 필터링된 콘텐츠를 저장할 배열

          /**
           * @description mode 값이 "get"인 경우, 디자이너의 콘텐츠 정보를 조회하고 처리합니다.
           */
          if (mode === "get") {
              const { desid } = req.body; // 요청 본문에서 desid 값을 추출합니다.

              /**
               * @description desid에 해당하는 디자이너 정보를 가져옵니다.
               * toNormal 옵션을 통해 데이터를 일반 객체 형태로 반환합니다.
               */
              thisDesigner = await back.getDesignerById(desid, { selfMongo, toNormal: true });

              /**
               * @description desid에 해당하는 콘텐츠 배열을 가져옵니다.
               */
              thisContents = await back.getContentsArrByQuery({ desid }, { selfMongo, toNormal: true });

              /**
               * @description 디자이너 설정의 고스트 콘텐츠와,
               * 각각의 콘텐츠에 대해 이미지 링크를 생성하여 targetContents 배열에 저장합니다.
               */
              targetContents = thisDesigner.setting.ghost.concat(thisContents.map((c) => {
                  const pid = c.contents.portfolio.pid; // 포트폴리오 ID를 추출합니다.
                  let newResult = []; // 새로운 결과 배열을 초기화합니다.

                  // 각 사진의 세부 사항을 순회하면서 이미지 링크를 생성합니다.
                  for (let { index, gs } of c.photos.detail) {
                      newResult.push({
                          link: `/corePortfolio/listImage/${pid}/t${String(index)}${pid}.jpg`, // 이미지 링크 생성
                          sgTrue: gs, // 세로(S) 또는 가로(G) 여부를 저장
                      });
                  }
                  return newResult; // 결과 배열 반환
              }).flat()); // 생성된 모든 결과를 평탄화하여 하나의 배열로 만듭니다.

              /**
               * @description 요청 본문에서 sero 값이 "true"인 경우, 세로(s) 콘텐츠만 필터링합니다.
               */
              if (req.body.sero === "true" || req.body.sero === true) {
                  targetContents = targetContents.filter((o) => { return o.sgTrue === 's'; });
              }

              /**
               * @description 요청 본문에서 garo 값이 "true"인 경우, 가로(g) 콘텐츠만 필터링합니다.
               */
              if (req.body.garo === "true" || req.body.garo === true) {
                  targetContents = targetContents.filter((o) => { return o.sgTrue === 'g'; });
              }

              /**
               * @description 최종 필터링된 콘텐츠 배열을 클라이언트에 JSON 형식으로 반환합니다.
               */
              res.send(JSON.stringify({ data: targetContents }));

          } else {
              throw new Error("invalid mode"); // 유효하지 않은 mode 값일 경우 예외를 던집니다.
          }
      } catch (e) {
          logger.error(e, req).catch((e) => { console.log(e); }); // 로그에 오류를 기록합니다.
          res.send(JSON.stringify({ error: e.message })); // 오류 메시지를 JSON 형식으로 클라이언트에 전송합니다.
      }
    });
    
    /**
     * @route POST /designerPaperInfo
     * @description 이 라우트는 디자이너의 서류 정보를 조회하는 기능을 제공합니다.
     * 주로 디자인 제안서와 관련된 정보를 가져와 링크 형태로 변환하여 반환합니다.
     * @param {object} req - 클라이언트 요청 객체.
     * @param {object} req.body - 요청 본문 객체.
     * @param {object} res - 서버 응답 객체.
     */
    router.post([ "/designerPaperInfo" ], async function (req, res) {
      /**
       * @description 응답 헤더를 설정합니다. 응답을 JSON 형식으로 반환하고,
       * 모든 출처에서의 접근을 허용하며, 특정 HTTP 메서드와 헤더를 허용합니다.
       */
      res.set({
          "Content-Type": "application/json", // 응답의 Content-Type을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 지정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 요청 헤더를 지정합니다.
      });

      try {
          /**
           * @description 요청 본문에서 mode 값이 정의되지 않은 경우, 예외를 발생시킵니다.
           * mode는 이 라우트에서 수행할 작업의 종류를 결정합니다.
           */
          if (req.body.mode === undefined) {
              throw new Error("invalid post"); // 요청이 잘못된 경우 오류를 발생시킵니다.
          }

          const { mode } = req.body; // 요청 본문에서 mode 값을 추출합니다.
          let thisResponse; // 외부 시스템으로부터의 응답을 저장할 변수
          let thisTarget; // 필터링된 결과를 저장할 배열

          /**
           * @description mode 값이 "get"인 경우, 디자이너의 서류 정보를 조회합니다.
           */
          if (mode === "get") {
              const { desid } = req.body; // 요청 본문에서 desid 값을 추출합니다.

              /**
               * @description 외부 시스템에 요청을 보내 디자인 제안서 정보를 가져옵니다.
               */
              thisResponse = await requestSystem("https://" + address.officeinfo.ghost.host + ":" + String(3000) + "/listDesignProposal", {
                  mode: "pick", // 디자인 제안서 정보를 조회할 때 사용되는 mode
                  desid, // 조회할 디자이너의 ID
              }, {
                  headers: {
                      "Content-Type": "application/json", // 요청의 Content-Type을 JSON으로 설정합니다.
                  }
              });

              /**
               * @description 받은 데이터를 링크 형태로 변환하여 thisTarget 배열에 저장합니다.
               */
              thisTarget = thisResponse.data.data.map((s) => {
                  return { link: stringToLink(s) }; // 각 데이터를 링크 형태로 변환하여 반환
              });

              /**
               * @description 최종 결과 배열을 클라이언트에 JSON 형식으로 반환합니다.
               */
              res.send(JSON.stringify({ data: thisTarget }));

          } else {
              throw new Error("invalid mode"); // 유효하지 않은 mode 값일 경우 예외를 던집니다.
          }
      } catch (e) {
          logger.error(e, req).catch((e) => { console.log(e); }); // 로그에 오류를 기록합니다.
          res.send(JSON.stringify({ error: e.message })); // 오류 메시지를 JSON 형식으로 클라이언트에 전송합니다.
      }
    });
    
    /**
     * @route POST /pageToPdf
     * @description 이 라우트는 웹 페이지를 PDF로 변환하는 요청을 처리합니다. 클라이언트로부터 받은 요청 데이터를 외부 시스템에 전달하고, 결과를 반환합니다.
     * @param {object} req - 클라이언트 요청 객체.
     * @param {object} req.body - 요청 본문 객체.
     * @param {object} res - 서버 응답 객체.
     */
    router.post([ "/pageToPdf" ], async function (req, res) {
      /**
       * @description 응답 헤더를 설정합니다. 응답을 JSON 형식으로 반환하고,
       * 모든 출처에서의 접근을 허용하며, 특정 HTTP 메서드와 헤더를 허용합니다.
       */
      res.set({
          "Content-Type": "application/json", // 응답의 Content-Type을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 지정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 요청 헤더를 지정합니다.
      });

      try {
          /**
           * @description 외부 시스템(Ghost 서버)으로 요청을 보냅니다. 
           * 클라이언트로부터 받은 데이터를 그대로 전달하여 페이지를 PDF로 변환합니다.
           * @param {string} url - Ghost 서버의 URL을 설정합니다.
           * @param {object} req.body - 클라이언트로부터 받은 요청 본문을 전달합니다.
           * @param {object} options - 요청 헤더에 Content-Type을 JSON으로 설정합니다.
           * @returns {object} - Ghost 서버에서 반환된 응답 데이터를 받습니다.
           */
          const ghostResponse = await requestSystem("https://" + address.officeinfo.ghost.host + "/pageToPdf", req.body, { 
              headers: { "Content-Type": "application/json" } // 요청의 Content-Type을 JSON으로 설정
          });

          /**
           * @description Ghost 서버로부터 받은 응답 데이터를 클라이언트에 반환합니다.
           */
          res.send(JSON.stringify(ghostResponse.data)); // 응답 데이터를 JSON 형식으로 클라이언트에 전송

      } catch (e) {
          /**
           * @description 오류가 발생한 경우, 오류를 로깅하고 클라이언트에 오류 메시지를 반환합니다.
           * @param {Error} e - 발생한 오류 객체.
           */
          logger.error(e, req).catch((e) => { console.log(e); }); // 발생한 오류를 로그에 기록하고, 콘솔에 출력
          res.send(JSON.stringify({ error: e.message })); // 오류 메시지를 JSON 형식으로 클라이언트에 전송
      }
    });
    
    /**
     * @route POST /printClient
     * @description 이 라우트는 특정 클라이언트의 요청 정보를 출력하는 기능을 수행합니다. 클라이언트의 ID, 요청 번호, 그리고 요청의 기록(history)을 기반으로 데이터를 수집하고, 이를 출력 시스템으로 전송합니다.
     * @param {object} req - 클라이언트 요청 객체.
     * @param {object} req.body - 요청 본문 객체.
     * @param {object} res - 서버 응답 객체.
     */
    router.post([ "/printClient" ], async function (req, res) {
      /**
       * @description 응답 헤더를 설정합니다. 응답을 JSON 형식으로 반환하고,
       * 모든 출처에서의 접근을 허용하며, 특정 HTTP 메서드와 헤더를 허용합니다.
       */
      res.set({
          "Content-Type": "application/json", // 응답의 Content-Type을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 지정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 요청 헤더를 지정합니다.
      });

      try {
          /**
           * @description 필수 데이터가 요청 본문에 존재하지 않는 경우, 예외를 발생시킵니다.
           * 여기서 필수 데이터는 cliid(클라이언트 ID), requestNumber(요청 번호), history(요청 기록)입니다.
           */
          if (req.body.cliid === undefined || req.body.requestNumber === undefined || req.body.history === undefined) {
              throw new Error("invalid post"); // 요청이 잘못된 경우 오류를 발생시킵니다.
          }

          const selfMongo = instance.mongo; // MongoDB 인스턴스를 selfMongo 변수에 할당합니다.
          const { cliid, history } = equalJson(req.body); // 요청 본문에서 cliid와 history 값을 추출하고 deep copy를 수행합니다.
          const mode = (req.body.mode === undefined ? "general" : req.body.mode); // 요청 본문에서 mode 값을 추출하거나, 기본값 "general"을 사용합니다.
          const requestNumber = Number(req.body.requestNumber); // 요청 번호를 숫자로 변환합니다.
          
          /**
           * @description 클라이언트 ID를 이용해 클라이언트 정보를 MongoDB에서 가져옵니다.
           */
          const client = await back.getClientById(cliid, { selfMongo });
          let text; // 출력할 텍스트를 저장할 변수
          let webReport; // 클라이언트 분석 결과를 저장할 변수

          /**
           * @description 클라이언트의 기본 정보와 요청 세부 사항을 텍스트로 구성합니다.
           */
          text = client.name + " / " + client.cliid + " / " + client.phone; // 클라이언트의 이름, ID, 전화번호를 포함한 텍스트
          text += "\n\n";
          text += JSON.stringify(client.toNormal().requests[requestNumber].request, null, 2); // 해당 요청 번호에 대한 요청 내용을 JSON 형식으로 추가
          text += "\n\n";
          
          /**
           * @description 클라이언트의 분석 데이터를 외부 시스템에서 가져옵니다.
           */
          webReport = (await requestSystem("https://" + address.officeinfo.ghost.host + "/getClientAnalytics", { 
              cliid, 
              textMode: true 
          }, { 
              headers: { "Content-Type": "application/json" } 
          })).data.report;

          text += webReport; // 분석 결과를 텍스트에 추가

          /**
           * @description 완성된 텍스트 데이터를 출력 시스템에 전송합니다.
           */
          requestSystem("https://" + address.officeinfo.ghost.host + "/printComplex", { 
              text, 
              cliid, 
              requestNumber, 
              mode 
          }, { 
              headers: { "Content-Type": "application/json" } 
          }).catch((err) => { console.log(err); }); // 출력 요청 중 오류가 발생할 경우 로그 출력

          /**
           * @description 클라이언트에게 작업이 진행 중임을 응답합니다.
           */
          res.send(JSON.stringify({ message: "will do" })); // 클라이언트에게 작업 예정임을 JSON 형식으로 응답

      } catch (e) {
          /**
           * @description 오류가 발생한 경우, 오류를 로깅하고 클라이언트에 오류 메시지를 반환합니다.
           * @param {Error} e - 발생한 오류 객체.
           */
          logger.error(e, req).catch((e) => { console.log(e); }); // 발생한 오류를 로그에 기록하고, 콘솔에 출력
          res.send(JSON.stringify({ error: e.message })); // 오류 메시지를 JSON 형식으로 클라이언트에 전송
      }
    });
    
    /**
     * @route POST /rawImageParsing
     * @description 이 라우트는 원본 이미지 데이터를 파싱하고, 특정 프로젝트 ID와 연관된 데이터를 조회하거나 반환하는 기능을 수행합니다.
     * @param {object} req - 클라이언트 요청 객체.
     * @param {object} req.body - 요청 본문 객체.
     * @param {object} res - 서버 응답 객체.
     */
    router.post([ "/rawImageParsing" ], async function (req, res) {
      /**
       * @description 응답 헤더를 설정합니다. 응답을 JSON 형식으로 반환하고,
       * 모든 출처에서의 접근을 허용하며, 특정 HTTP 메서드와 헤더를 허용합니다.
       */
      res.set({
          "Content-Type": "application/json", // 응답의 Content-Type을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 지정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 요청 헤더를 지정합니다.
      });

      try {
          /**
           * @description 요청 본문에서 mode 값이 정의되지 않은 경우, 예외를 발생시킵니다.
           * mode는 이 라우트에서 수행할 작업의 종류를 결정합니다.
           */
          if (req.body.mode === undefined) {
              throw new Error("invalid post"); // 요청이 잘못된 경우 오류를 발생시킵니다.
          }

          const { mode } = req.body; // 요청 본문에서 mode 값을 추출합니다.
          const token = "__split__"; // 파일명 구분에 사용되는 토큰 문자열을 정의합니다.
          const folderConst = "/corePortfolio/rawImage"; // 원본 이미지가 저장된 폴더 경로를 정의합니다.
          const selfMongo = instance.mongo; // MongoDB 인스턴스를 selfMongo 변수에 할당합니다.
          let firstResult; // 초기 파싱 결과를 저장할 변수
          let contentsArr; // 프로젝트 관련 콘텐츠 배열
          let proid; // 프로젝트 ID
          let finalResult; // 최종 결과를 저장할 객체
          let temp; // 임시 변수
          let thisPid; // 포트폴리오 ID

          /**
           * @description 원본 이미지가 저장된 디렉터리에서 파일 목록을 읽어와 초기 결과를 생성합니다.
           */
          firstResult = await ajaxJson({ path: "/corePortfolio/rawImage" }, "https://" + instance.address.officeinfo.ghost.host + "/readDir");
          firstResult = firstResult
              .filter((str) => /^[p]/.test(str)) // 파일명이 'p'로 시작하는 파일을 필터링합니다.
              .filter((str) => str.split(token).length >= 2) // 토큰 기준으로 분리된 배열의 길이가 2 이상인 파일만 필터링합니다.
              .map((str) => {
                  const [proid, pidZip] = str.split(token); // 파일명을 프로젝트 ID와 압축 파일명으로 분리합니다.
                  const [pid] = pidZip.split("."); // 압축 파일명에서 포트폴리오 ID를 추출합니다.
                  return { proid, pid }; // 프로젝트 ID와 포트폴리오 ID를 포함한 객체를 반환합니다.
              });

          /**
           * @description mode 값이 "list"인 경우, 필터링된 결과 리스트를 클라이언트에 반환합니다.
           */
          if (mode === "list") {
              res.send(JSON.stringify(firstResult)); // 초기 결과 리스트를 JSON 형식으로 클라이언트에 전송합니다.

          } else if (mode === "get" || mode === "search" || mode === "proid") {
              /**
               * @description mode가 "get", "search", 또는 "proid"인 경우, 특정 프로젝트 ID(proid)에 대한 데이터를 조회합니다.
               */
              if (req.body.proid === undefined) {
                  throw new Error("invalid post"); // 요청 본문에 프로젝트 ID가 없을 경우 오류를 발생시킵니다.
              }

              finalResult = {}; // 최종 결과 객체를 초기화합니다.
              ({ proid } = req.body); // 요청 본문에서 프로젝트 ID를 추출합니다.

              try {
                  /**
                   * @description MongoDB에서 해당 프로젝트 ID와 연관된 콘텐츠 배열을 조회합니다.
                   */
                  contentsArr = await back.getContentsArrByQuery({ proid }, { selfMongo });

                  // 최종 결과 객체에 기본 구조를 설정합니다.
                  finalResult.proid = proid;
                  finalResult.raw = { exist: false, link: "" };
                  finalResult.portfolio = { exist: false, link: "" };
                  finalResult.review = { exist: false, link: "" };

                  /**
                   * @description 초기 결과 리스트에서 해당 프로젝트 ID를 가진 항목을 찾습니다.
                   */
                  temp = firstResult.find((obj) => obj.proid === proid);
                  if (temp !== undefined) {
                      thisPid = temp.pid;
                      finalResult.raw.exist = true; // 원본 이미지가 존재함을 표시합니다.
                      finalResult.raw.link = "https://" + address.officeinfo.ghost.host + folderConst + "/" + proid + token + thisPid + ".zip"; // 원본 이미지 링크 설정
                  } else {
                      finalResult.raw.exist = true; // 원본 이미지가 존재하지 않음을 표시합니다.
                      finalResult.raw.link = "";
                  }

                  /**
                   * @description 콘텐츠 배열이 비어있지 않은 경우, 포트폴리오와 리뷰 링크를 설정합니다.
                   */
                  if (contentsArr.length > 0) {
                      [{ contents: { portfolio: { pid: thisPid } } }] = contentsArr; // 포트폴리오 ID를 추출합니다.
                      finalResult.portfolio.exist = true; // 포트폴리오가 존재함을 표시합니다.
                      finalResult.portfolio.link = "https://" + address.frontinfo.host + "/portdetail.php?pid=" + thisPid; // 포트폴리오 링크 설정
                      if (contentsArr[0].contents.review.rid !== "" && !/re999/gi.test(contentsArr[0].contents.review.rid)) {
                          finalResult.review.exist = true; // 리뷰가 존재함을 표시합니다.
                          finalResult.review.link = "https://" + address.frontinfo.host + "/revdetail.php?pid=" + thisPid; // 리뷰 링크 설정
                      }
                  }

                  res.send(JSON.stringify(finalResult)); // 최종 결과를 JSON 형식으로 클라이언트에 전송합니다.

              } catch {
                  /**
                   * @description 예외 발생 시 기본 구조로 결과를 반환합니다.
                   */
                  res.send(JSON.stringify({ proid, raw: { exist: true, link: "" }, portfolio: { exist: false, link: "" }, review: { exist: false, link: "" } }));
              }

          } else {
              throw new Error("invalid mode"); // 유효하지 않은 mode 값일 경우 예외를 던집니다.
          }

      } catch (e) {
          /**
           * @description 오류가 발생한 경우, 오류를 로깅하고 클라이언트에 오류 메시지를 반환합니다.
           * @param {Error} e - 발생한 오류 객체.
           */
          await logger.error(e, req).catch((e) => { console.log(e); }); // 발생한 오류를 로그에 기록하고, 콘솔에 출력
          res.send(JSON.stringify({ error: e.message })); // 오류 메시지를 JSON 형식으로 클라이언트에 전송
      }
    });
    
    /**
     * @route POST /photoParsing
     * @description 이 라우트는 업로드된 이미지 데이터를 파싱하고, 관련된 디자이너의 스타일링 성향을 분석하여 반환합니다.
     * @param {object} req - 클라이언트 요청 객체.
     * @param {object} req.body - 요청 본문 객체.
     * @param {object} res - 서버 응답 객체.
     */
    router.post([ "/photoParsing" ], async function (req, res) {
      /**
       * @description 응답 헤더를 설정합니다. 응답을 JSON 형식으로 반환하고,
       * 모든 출처에서의 접근을 허용하며, 특정 HTTP 메서드와 헤더를 허용합니다.
       */
      res.set({
          "Content-Type": "application/json", // 응답의 Content-Type을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 지정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 요청 헤더를 지정합니다.
      });

      try {
          /**
           * @description 요청 본문에서 images 배열이 정의되지 않은 경우, 예외를 발생시킵니다.
           * images 배열은 처리할 이미지 파일들의 리스트를 포함합니다.
           */
          if (req.body.images === undefined) {
              throw new Error("invalid post, must be 'images' array"); // 요청이 잘못된 경우 오류를 발생시킵니다.
          }

          const selfMongo = instance.mongo; // MongoDB 인스턴스를 selfMongo 변수에 할당합니다.
          const { images } = equalJson(req.body); // 요청 본문에서 images 배열을 추출합니다.
          let pidArr, raw, contents, contentsArr, desidArr; // 여러 변수를 선언하여 필요한 데이터를 저장할 준비를 합니다.
          let designers; // 디자이너들의 스타일링 성향을 저장할 변수
          let totalObj; // 모든 디자이너의 스타일링 성향을 합산한 결과를 저장할 객체

          /**
           * @description 이미지 파일명에서 포트폴리오 ID(pid)를 추출합니다.
           * 파일명에서 확장자를 제거하고, 파일명에서 포트폴리오 ID만 남도록 처리합니다.
           */
          pidArr = images.map((i) => {
              return i.replace(/\.[a-z]+$/gi, '').replace(/^[it][0-9]+/gi, '');
          });

          contentsArr = []; // 콘텐츠 배열을 초기화합니다.
          for (let pid of pidArr) {
              /**
               * @description MongoDB에서 포트폴리오 ID와 일치하는 콘텐츠를 조회합니다.
               */
              raw = await back.getContentsArrByQuery({ "contents.portfolio.pid": pid }, { selfMongo });
              if (raw.length !== 1) {
                  throw new Error("invalid pid : " + JSON.stringify(pidArr)); // 유효하지 않은 포트폴리오 ID가 있을 경우 오류를 발생시킵니다.
              }
              [contents] = raw; // 조회된 콘텐츠를 contents 변수에 저장합니다.
              contentsArr.push(contents); // 콘텐츠를 contentsArr 배열에 추가합니다.
          }

          /**
           * @description 콘텐츠에서 디자이너 ID(desid) 배열을 추출합니다.
           * 중복된 ID는 제거하고, 고유한 ID만 남깁니다.
           */
          desidArr = Array.from(new Set(contentsArr.map((c) => {
              return c.desid;
          })));

          if (desidArr.length > 0) {
              /**
               * @description MongoDB에서 디자이너 ID 배열과 일치하는 디자이너들의 데이터를 조회합니다.
               */
              designers = (await back.getDesignersByQuery({ $or: desidArr.map((desid) => { return { desid }; }) }, { selfMongo }))
                  .map((d) => {
                      return d.analytics.styling.tendency.toNormal(); // 디자이너들의 스타일링 성향을 추출하여 배열로 반환합니다.
                  });

              if (designers.length > 0) {
                  totalObj = equalJson(JSON.stringify(designers[0])); // 첫 번째 디자이너의 스타일링 성향을 기반으로 객체를 초기화합니다.
                  
                  /**
                   * @description 모든 성향 값을 0으로 초기화합니다.
                   */
                  for (let i in totalObj) {
                      for (let j in totalObj[i]) {
                          totalObj[i][j] = 0;
                      }
                  }

                  /**
                   * @description 각 디자이너의 성향 값을 합산합니다.
                   */
                  for (let style of designers) {
                      for (let i in style) {
                          for (let j in style[i]) {
                              totalObj[i][j] += style[i][j];
                          }
                      }
                  }

                  /**
                   * @description 평균값을 계산하여 최종 결과를 구성합니다.
                   */
                  for (let i in totalObj) {
                      for (let j in totalObj[i]) {
                          totalObj[i][j] = Math.round((totalObj[i][j] / designers.length) * 100) / 100;
                      }
                  }

                  res.send(JSON.stringify(totalObj)); // 최종 결과를 JSON 형식으로 클라이언트에 전송합니다.
              } else {
                  throw new Error("There is no designer : " + JSON.stringify(desidArr)); // 디자이너를 찾을 수 없을 경우 오류를 발생시킵니다.
              }
          } else {
              res.send(JSON.stringify([])); // 디자이너 ID 배열이 비어있는 경우 빈 배열을 반환합니다.
          }
      } catch (e) {
          /**
           * @description 오류가 발생한 경우, 오류를 로깅하고 클라이언트에 오류 메시지를 반환합니다.
           * @param {Error} e - 발생한 오류 객체.
           */
          console.log(e); // 콘솔에 오류를 출력합니다.
          logger.error(e, req).catch((e) => { console.log(e); }); // 오류를 로깅합니다.
          res.send(JSON.stringify({ message: "error : " + e.message })); // 오류 메시지를 JSON 형식으로 클라이언트에 전송합니다.
      }
    });
    
    /**
     * @route POST /designerChecklistLog
     * @description 디자이너의 체크리스트 로그를 기록하고 알림을 전송하는 라우터입니다.
     * @param {object} req - 클라이언트 요청 객체.
     * @param {object} req.body - 요청 본문 객체.
     * @param {object} res - 서버 응답 객체.
     */
    router.post([ "/designerChecklistLog" ], async function (req, res) {
      /**
       * @description 응답 헤더를 설정합니다. JSON 형식의 응답을 설정하고, CORS 정책을 허용합니다.
       */
      res.set({
          "Content-Type": "application/json", // 응답의 Content-Type을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 지정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 요청 헤더를 지정합니다.
      });

      try {
          /**
           * @description 요청 본문에서 필수 필드들이 정의되지 않은 경우 예외를 발생시킵니다.
           * 필수 필드: desid (디자이너 ID), designer (디자이너 이름), data (체크리스트 데이터)
           */
          if (req.body.desid === undefined || req.body.designer === undefined || req.body.data === undefined) {
              throw new Error("invalid post"); // 필수 데이터가 없을 경우 오류 발생
          }

          const { desid, designer, data } = equalJson(req.body); // 요청 본문에서 필요한 데이터를 추출합니다.
          const collection = "designerChecklistLog"; // 로그를 저장할 MongoDB 컬렉션 이름을 정의합니다.
          const channel = "#checklist_log"; // Slack 또는 다른 메신저 채널로 알림을 보낼 때 사용할 채널 이름을 설정합니다.
          const voice = false; // 음성 알림 여부를 설정합니다.
          const selfMongo = mongo; // MongoDB 인스턴스를 할당합니다.
          const ip = String(req.headers["x-forwarded-for"] === undefined ? req.socket.remoteAddress : req.headers["x-forwarded-for"])
                          .trim().replace(/[^0-9\.]/gi, ''); // 클라이언트의 IP 주소를 파싱합니다.
          const rawUserAgent = req.useragent; // 클라이언트의 User-Agent 정보를 추출합니다.
          const { source: userAgent, browser, os, platform } = rawUserAgent; // User-Agent 정보에서 필요한 세부 정보를 추출합니다.
          let text; // Slack 또는 다른 메신저에 보낼 메시지의 텍스트 내용을 저장할 변수입니다.

          text = ""; // 메시지 내용을 초기화합니다.

          /**
           * @description IP 주소를 파싱하여, 위치 정보 등을 가져옵니다.
           */
          ipParsing(ip).then((ipObj) => {
              if (ipObj === null) {
                  ipObj = { ip }; // IP 파싱에 실패한 경우 기본적으로 IP만 저장합니다.
              }

              data.id = desid + "_" + String((new Date()).valueOf()) + "_" + uniqueValue("hex"); // 로그 데이터를 식별할 고유 ID를 생성합니다.
              data.date = new Date(); // 로그 데이터에 현재 날짜와 시간을 추가합니다.
              data.entire = data.data.entireMode ? 1 : 0; // 전체 모드 여부를 설정합니다.
              data.network = {
                  userAgent,
                  browser,
                  os,
                  platform,
                  mobile: rawUserAgent.isMobile,
                  ...ipObj // IP 파싱 결과를 네트워크 정보에 추가합니다.
              };

              if (data.entire === 1) {
                  text += "홈리에종에서 " + designer + " 실장님의 체크리스트를 업데이트 : \n"; // 전체 모드인 경우 메시지 내용을 설정합니다.
              } else {
                  text += designer + " 실장님이 체크리스트 업데이트를 직접 수행함 : \n"; // 전체 모드가 아닌 경우 메시지 내용을 설정합니다.
              }
              text += JSON.stringify(data, null, 2); // 체크리스트 데이터를 JSON 형식으로 텍스트에 추가합니다.

              return back.mongoCreate(collection, data, { selfMongo }); // MongoDB에 로그 데이터를 저장합니다.
          }).then(() => {
              return messageSend({ text, channel, voice }); // 메시지를 지정된 채널에 전송합니다.
          }).then(() => {
              if (data.data.property === "성함") {
                  return messageSend({ text: data.data.designer + " 실장님의 이름이 바뀜 => " + data.data.value, channel: "#300_designer", voice: true }); // 이름이 변경된 경우 별도의 메시지를 전송합니다.
              } else {
                  return (new Promise((resolve, reject) => { return resolve(null) })); // 그 외의 경우에는 특별한 처리를 하지 않습니다.
              }
          }).catch((err) => {
              console.log(err); // 오류 발생 시 콘솔에 출력합니다.
          });

          res.send(JSON.stringify({ message: "will do" })); // 클라이언트에게 성공 메시지를 응답합니다.
      } catch (e) {
          console.log(e); // 오류 발생 시 콘솔에 출력합니다.
          logger.error(e, req).catch((e) => { console.log(e); }); // 오류를 로깅합니다.
          res.send(JSON.stringify({ message: "error : " + e.message })); // 오류 메시지를 JSON 형식으로 클라이언트에 전송합니다.
      }
    });
    
    /**
     * @route POST /timeAspirantCommon
     * @description 홈리에종에 지원한 디자이너 신청자(Aspirant)의 공통 미팅 시간을 관리하는 라우터입니다.
     * @param {object} req - 클라이언트 요청 객체.
     * @param {object} req.body - 요청 본문 객체.
     * @param {object} res - 서버 응답 객체.
     */
    router.post([ "/timeAspirantCommon" ], async function (req, res) {
      // 응답의 Content-Type을 JSON으로 설정하고, CORS 정책을 허용하는 헤더를 설정합니다.
      res.set({
          "Content-Type": "application/json", // 응답의 Content-Type을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 지정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 요청 헤더를 지정합니다.
      });

      try {
          // 요청 본문에서 mode가 정의되지 않은 경우 예외를 발생시킵니다.
          if (req.body.mode === undefined) {
              throw new Error("invalid mode"); // mode가 정의되지 않은 경우 오류 발생
          }

          const { mode } = equalJson(req.body); // 요청 본문에서 mode를 추출합니다.
          const selfMongo = instance.mongo; // 인스턴스의 MongoDB를 할당합니다.
          const selfLocalMongo = mongo; // 로컬 MongoDB를 할당합니다.
          const emptyDate = new Date(2000, 0, 1); // 기본적으로 사용되는 빈 날짜를 설정합니다.
          const emptyDateValue = emptyDate.valueOf(); // 빈 날짜의 값(Value)을 저장합니다.
          const idKeywords = "commonMeeting_"; // ID 생성을 위한 키워드를 설정합니다.
          const collection = "timeAspirantCommon"; // 사용할 MongoDB 컬렉션을 설정합니다.
          const monthAgo = new Date(); // 현재 날짜를 기반으로 한 객체를 생성합니다.
          const agoStandard = 12; // 몇 개월 전 기준을 설정합니다.
          monthAgo.setMonth(monthAgo.getMonth() - agoStandard); // 현재 날짜에서 12개월을 뺀 날짜를 설정합니다.
          const whereQuery = { "submit.partnership.date": { $gte: monthAgo } }; // 12개월 이내에 파트너십을 제출한 Aspirant를 조회하는 쿼리를 설정합니다.
          const aspirants = await back.getAspirantsByQuery(whereQuery, { selfMongo }); // 위에서 설정한 조건에 맞는 Aspirant들을 가져옵니다.
          let timeSet; // 미팅 시간을 저장할 배열입니다.
          let year, month, date; // 년, 월, 일 변수 선언
          let fromDate, toDate; // 시간 범위를 지정할 변수 선언
          let timeTong; // 최종적으로 시간별로 정리된 Aspirant 목록을 저장할 변수 선언
          let dateString; // 날짜를 문자열로 변환하여 저장할 변수 선언
          let rows; // MongoDB 쿼리 결과를 저장할 변수 선언
          let thisKey; // 각 시간대별로 고유한 키를 생성하기 위한 변수 선언

          if (mode === "update") {
              timeSet = []; // timeSet 배열을 초기화합니다.
              for (let aspirant of aspirants) { // 모든 Aspirant에 대해 반복합니다.
                  if (aspirant.meeting.common.date.valueOf() >= emptyDateValue) { // 미팅 날짜가 설정된 경우
                      if (!/드랍/gi.test(aspirant.meeting.status)) { // 미팅 상태가 "드랍"이 아닌 경우
                          timeSet.push(String(aspirant.meeting.common.date.valueOf())); // 미팅 시간을 timeSet 배열에 추가합니다.
                      }
                  }
              }
              timeSet = [ ...new Set(timeSet) ].map((str) => { return new Date(Number(str)) }); // 중복된 시간을 제거하고, Date 객체로 변환합니다.
              timeTong = timeSet.map((date) => { // 각 시간을 기준으로 빈 배열을 가지는 객체를 생성합니다.
                  return { date, targets: [] }
              });
              for (let dateObject of timeSet) { // 모든 날짜 객체에 대해 반복합니다.
                  year = dateObject.getFullYear(); // 년도를 추출합니다.
                  month = dateObject.getMonth(); // 월을 추출합니다.
                  date = dateObject.getDate(); // 일을 추출합니다.
                  fromDate = new Date(year, month, date, dateObject.getHours(), dateObject.getMinutes(), 0); // 시작 시간 설정
                  toDate = new Date(year, month, date, dateObject.getHours(), dateObject.getMinutes(), 0); // 종료 시간 설정
                  fromDate.setHours(fromDate.getHours() - 1); // 시작 시간을 1시간 전으로 설정
                  toDate.setHours(toDate.getHours() + 1); // 종료 시간을 1시간 후로 설정
                  for (let aspirant of aspirants) { // 모든 Aspirant에 대해 반복합니다.
                      if (aspirant.meeting.common.date.valueOf() >= emptyDateValue) { // 미팅 날짜가 설정된 경우
                          if (!/드랍/gi.test(aspirant.meeting.status)) { // 미팅 상태가 "드랍"이 아닌 경우
                              if (fromDate.valueOf() <= aspirant.meeting.common.date.valueOf() && toDate.valueOf() >= aspirant.meeting.common.date.valueOf()) {
                                  // Aspirant의 미팅 시간이 fromDate와 toDate 사이에 있는 경우
                                  timeTong.find(({ date }) => { return date.valueOf() === dateObject.valueOf() }).targets.push({
                                      aspid: aspirant.aspid, // 해당 시간대에 포함되는 Aspirant의 ID를 추가합니다.
                                      date: aspirant.meeting.common.date // 해당 시간대의 날짜를 추가합니다.
                                  })
                              }
                          }
                      }
                  }
              }
              for (let obj of timeTong) { // 모든 timeTong 객체에 대해 반복합니다.
                  dateString = dateToString(obj.date, true); // 날짜를 문자열로 변환합니다.
                  dateString = dateString.replace(/[ \-\:]/gi, ''); // 문자열에서 공백, 대시, 콜론을 제거합니다.
                  obj.id = idKeywords + dateString; // 고유한 ID를 생성합니다.
                  obj.log = new Date(); // 로그를 현재 날짜로 설정합니다.
                  thisKey = obj.id; // 이 객체의 키를 설정합니다.
                  rows = await back.mongoRead(collection, { id: thisKey }, { selfMongo: selfLocalMongo }); // 해당 키로 기존 데이터를 조회합니다.
                  if (rows.length !== 0) { // 기존 데이터가 있는 경우
                      await back.mongoDelete(collection, { id: thisKey }, { selfMongo: selfLocalMongo }); // 기존 데이터를 삭제합니다.
                  }
                  await back.mongoCreate(collection, equalJson(JSON.stringify(obj)), { selfMongo: selfLocalMongo }); // 새로운 데이터를 생성합니다.
              }

              res.send(JSON.stringify({ message: "done" })); // 클라이언트에 성공 메시지를 응답합니다.

          } else if (mode === "get") { // 모드가 "get"인 경우

              const { value } = equalJson(req.body); // 요청 본문에서 value를 추출합니다.
              const fromDate = new Date(Number(value)); // value를 기준으로 시작 시간을 설정합니다.
              const toDate = new Date(Number(value)); // value를 기준으로 종료 시간을 설정합니다.

              fromDate.setHours(fromDate.getHours() - 1); // 시작 시간을 1시간 전으로 설정
              toDate.setHours(toDate.getHours() + 1); // 종료 시간을 1시간 후로 설정

              rows = await back.mongoRead(collection, { $and: [
                  { date: { $gte: fromDate } }, // 시작 시간 이후의 데이터를 조회합니다.
                  { date: { $lte: toDate } }, // 종료 시간 이전의 데이터를 조회합니다.
              ] }, { selfMongo: selfLocalMongo });

              res.send(JSON.stringify({ data: rows })); // 조회된 데이터를 클라이언트에 응답합니다.

          } else {
              throw new Error("invalid mode"); // 유효하지 않은 모드일 경우 예외를 발생시킵니다.
          }

      } catch (e) {
          console.log(e); // 오류 발생 시 콘솔에 출력합니다.
          logger.error(e, req).catch((e) => { console.log(e); }); // 오류를 로깅합니다.
          res.send(JSON.stringify({ message: "error : " + e.message })); // 오류 메시지를 JSON 형식으로 클라이언트에 전송합니다.
      }
    });
    
    /**
     * @route POST /homeliaisonCrypto
     * @description 주어진 문자열 또는 해시를 암호화하거나 복호화하는 라우터입니다. 
     * @param {object} req - 클라이언트 요청 객체.
     * @param {object} req.body - 요청 본문 객체.
     * @param {object} res - 서버 응답 객체.
     */
    router.post([ "/homeliaisonCrypto" ], async function (req, res) {
      // 응답의 Content-Type을 JSON으로 설정하고, CORS 정책을 허용하는 헤더를 설정합니다.
      res.set({
          "Content-Type": "application/json", // 응답의 Content-Type을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 지정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 요청 헤더를 지정합니다.
      });

      try {
          // 요청 본문에서 mode가 정의되지 않은 경우 예외를 발생시킵니다.
          if (req.body.mode === undefined) {
              throw new Error("invalid post"); // mode가 정의되지 않은 경우 오류 발생
          }

          const { mode } = req.body; // 요청 본문에서 mode를 추출합니다.
          const password = "homeliaison"; // 암호화 및 복호화에 사용될 비밀번호를 설정합니다.
          let result; // 암호화 또는 복호화 결과를 저장할 변수 선언
          let resultObj; // 최종 결과를 저장할 객체 선언
          let targets; // 암호화 또는 복호화 대상 객체들을 저장할 배열 선언

          // 요청 본문에 targets가 정의되어 있고, 배열인지 확인합니다.
          if (req.body.targets !== undefined && Array.isArray(equalJson(req.body.targets))) {

              ({ targets } = equalJson(req.body)); // targets를 깊은 복사하여 추출합니다.
              resultObj = []; // 결과 객체를 배열로 초기화합니다.

              if (mode === "crypto") { // mode가 "crypto"인 경우
                  // 모든 객체가 올바른 형식(string과 target을 포함)인지 확인합니다.
                  if (!targets.every((obj) => { return (typeof obj === "object" && obj !== null && obj.string !== undefined && obj.target !== undefined) })) {
                      throw new Error("invalid post"); // 형식이 올바르지 않으면 오류 발생
                  }
                  // 모든 대상 객체를 순회하며 암호화 작업을 수행합니다.
                  for (let { string, target } of targets) {
                      resultObj.push({
                          hash: await cryptoString(password, string), // string을 암호화하여 hash를 생성합니다.
                          target // 대상의 타겟 정보 유지
                      });
                  }
              } else { // mode가 "crypto"가 아닌 경우
                  // 모든 객체가 올바른 형식(hash와 target을 포함)인지 확인합니다.
                  if (!targets.every((obj) => { return (typeof obj === "object" && obj !== null && obj.hash !== undefined && obj.target !== undefined) })) {
                      throw new Error("invalid post"); // 형식이 올바르지 않으면 오류 발생
                  }
                  // 모든 대상 객체를 순회하며 복호화 작업을 수행합니다.
                  for (let { hash, target } of targets) {
                      // 해시 값이 16진수 형식인지 확인합니다.
                      if (hash.replace(/[0-9a-f]/g, '') !== "") {
                          resultObj.push({
                              string: hash, // 해시가 16진수가 아니면 그대로 반환합니다.
                              target // 대상의 타겟 정보 유지
                          });
                      } else {
                          resultObj.push({
                              string: await decryptoHash(password, hash), // 해시를 복호화하여 string을 생성합니다.
                              target // 대상의 타겟 정보 유지
                          });
                      }
                  }
              }

          } else { // targets가 정의되지 않은 경우

              resultObj = {}; // 결과 객체를 빈 객체로 초기화합니다.

              if (mode === "crypto" || mode === "cryptoString") { // mode가 "crypto" 또는 "cryptoString"인 경우
                  if (req.body.string === undefined) {
                      throw new Error("invalid post"); // string이 정의되지 않은 경우 오류 발생
                  }
                  result = await cryptoString(password, req.body.string); // string을 암호화하여 result에 저장합니다.
                  resultObj = { hash: result }; // 결과 객체에 hash 속성으로 저장합니다.
              } else if (mode === "decrypto" || mode === "decryptoHash") { // mode가 "decrypto" 또는 "decryptoHash"인 경우
                  if (req.body.hash === undefined) {
                      throw new Error("invalid post"); // hash가 정의되지 않은 경우 오류 발생
                  }
                  // 해시 값이 16진수 형식인지 확인합니다.
                  if (req.body.hash.replace(/[0-9a-f]/g, '') !== "") {
                      result = req.body.hash; // 해시가 16진수가 아니면 그대로 반환합니다.
                  } else {
                      result = await decryptoHash(password, req.body.hash); // 해시를 복호화하여 result에 저장합니다.
                  }
                  resultObj = { string: result }; // 결과 객체에 string 속성으로 저장합니다.
              } else {
                  throw new Error("invalid mode"); // 유효하지 않은 모드일 경우 예외를 발생시킵니다.
              }

              // 요청 본문에 target이 정의된 경우 결과 객체에 추가합니다.
              if (typeof req.body.target === "string") {
                  resultObj.target = req.body.target;
              }

          }

          res.send(JSON.stringify(resultObj)); // 결과 객체를 JSON 형식으로 클라이언트에 응답합니다.

      } catch (e) {
          await logger.error(e, req).catch((e) => { console.log(e); }); // 오류를 로깅합니다.
          res.send(JSON.stringify({ error: e.message })); // 오류 메시지를 JSON 형식으로 클라이언트에 전송합니다.
      }
    });
    
    /**
     * @route POST /designerLevelMatrixSync
     * @description 디자이너 레벨 매트릭스를 동기화하는 라우터입니다. 
     *              이 라우터는 디자이너의 프로젝트 매트릭스를 특정 규칙에 따라 업데이트합니다.
     * @param {object} req - 클라이언트 요청 객체.
     * @param {object} res - 서버 응답 객체.
     */
    router.post([ "/designerLevelMatrixSync" ], async function (req, res) {
      // 응답의 Content-Type을 JSON으로 설정하고, CORS 정책을 허용하는 헤더를 설정합니다.
      res.set({
          "Content-Type": "application/json", // 응답의 Content-Type을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 지정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 요청 헤더를 지정합니다.
      });

      try {
          const selfMongo = instance.mongo; // MongoDB 인스턴스를 selfMongo로 할당합니다.

          /**
           * 디자이너 레벨 매트릭스를 동기화하는 함수입니다.
           * @param {object} selfMongo - MongoDB 인스턴스.
           * @returns {Promise<boolean>} 동기화가 성공했는지 여부를 반환합니다.
           */
          const designerLevelMatrixSync = async function (selfMongo) {
              try {
                  const db = "miro81"; // 사용할 데이터베이스 이름 설정
                  const collection = "designer"; // 사용할 컬렉션 이름 설정
                  const designers = await selfMongo.db(db).collection(collection).find({}).toArray(); // 모든 디자이너를 가져옵니다.
                  let whereQuery, updateQuery; // MongoDB 쿼리 객체 선언
                  let copiedMatrix; // 매트릭스를 복사할 변수 선언

                  // 각 디자이너에 대해 반복 작업을 수행합니다.
                  for (let designer of designers) {
                      whereQuery = { desid: designer.desid }; // 디자이너의 ID를 기준으로 업데이트할 쿼리 설정
                      updateQuery = {}; // 업데이트할 내용을 담을 객체 초기화

                      // 디자이너의 프로젝트 매트릭스를 깊은 복사합니다.
                      copiedMatrix = equalJson(JSON.stringify(designer.analytics.project.matrix));

                      // 디자이너의 레벨에 따라 프로젝트 매트릭스를 수정합니다.
                      if (designer.analytics.construct.level === 0) {
                          copiedMatrix[0] = [ (designer.analytics.project.partial ? 1 : 0), 1, 1 ]; // 부분 프로젝트가 있을 경우 첫 번째 배열 수정
                          copiedMatrix[1] = [ 0, 0, 0 ]; // 두 번째 배열을 모두 0으로 설정
                          copiedMatrix[2] = [ 0, 0, 0 ]; // 세 번째 배열을 모두 0으로 설정
                          copiedMatrix[3] = [ 0, 0, 0 ]; // 네 번째 배열을 모두 0으로 설정
                      } else if (designer.analytics.construct.level === 1) {
                          copiedMatrix[0] = [ (designer.analytics.project.partial ? 1 : 0), 1, 1 ];
                          copiedMatrix[1] = [ (designer.analytics.project.partial ? 1 : 0), 1, 1 ];
                          copiedMatrix[2] = [ 0, 0, 0 ];
                          copiedMatrix[3] = [ 0, 0, 0 ];
                      } else if (designer.analytics.construct.level === 2) {
                          copiedMatrix[0] = [ (designer.analytics.project.partial ? 1 : 0), 1, 1 ];
                          copiedMatrix[1] = [ (designer.analytics.project.partial ? 1 : 0), 1, 1 ];
                          copiedMatrix[2] = [ (designer.analytics.project.partial ? 1 : 0), 1, 1 ];
                          copiedMatrix[3] = [ 0, 0, 0 ];
                      } else if (designer.analytics.construct.level === 3) {
                          copiedMatrix[0] = [ (designer.analytics.project.partial ? 1 : 0), 1, 1 ];
                          copiedMatrix[1] = [ (designer.analytics.project.partial ? 1 : 0), 1, 1 ];
                          copiedMatrix[2] = [ (designer.analytics.project.partial ? 1 : 0), 1, 1 ];
                          copiedMatrix[3] = [ (designer.analytics.project.partial ? 1 : 0), 1, 1 ];
                      }

                      // 업데이트 쿼리에 수정된 매트릭스를 할당합니다.
                      updateQuery["analytics.project.matrix"] = equalJson(JSON.stringify(copiedMatrix));
                      // MongoDB에 업데이트를 수행합니다.
                      await selfMongo.db(db).collection(collection).updateOne(whereQuery, { $set: updateQuery });
                      console.log(whereQuery, updateQuery); // 업데이트된 내용을 로그로 출력합니다.
                  }

                  return true; // 동기화 성공 시 true 반환

              } catch (e) {
                  console.log(e); // 에러 발생 시 로그 출력
                  return false; // 동기화 실패 시 false 반환
              }
          }

          // 디자이너 레벨 매트릭스 동기화 함수 호출
          const result = await designerLevelMatrixSync(selfMongo);
          if (!result) {
              throw new Error("designer level matrix sync fail"); // 동기화 실패 시 오류 발생
          }
          res.send(JSON.stringify({ message: "done" })); // 클라이언트에 성공 메시지 응답

      } catch (e) {
          await logger.error(e, req).catch((e) => { console.log(e); }); // 에러를 로깅합니다.
          console.log(e); // 에러 내용을 콘솔에 출력합니다.
          res.send(JSON.stringify({ error: e.message })); // 에러 메시지를 클라이언트에 전송합니다.
      }
    });

    return router;
  }
}

module.exports = TransferRouter;
