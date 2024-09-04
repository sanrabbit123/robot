/**
 * @file staticRouter.js
 * @description 이 파일은 Static Lounge 서버의 라우터를 정의합니다.
 */

const Mother = require(`${process.cwd()}/apps/mother.js`); // Mother 클래스를 현재 작업 디렉토리에서 불러옵니다.
const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`); // BackMaker 클래스를 현재 작업 디렉토리에서 불러옵니다.
const BackWorker = require(`${process.cwd()}/apps/backMaker/backWorker.js`); // BackWorker 클래스를 현재 작업 디렉토리에서 불러옵니다.
const ImageReader = require(process.cwd() + "/apps/imageReader/imageReader.js"); // ImageReader 클래스를 현재 작업 디렉토리에서 불러옵니다.
const ParsingHangul = require(process.cwd() + "/apps/parsingHangul/parsingHangul.js"); // ParsingHangul 클래스를 현재 작업 디렉토리에서 불러옵니다.
const GoogleDrive = require(`${process.cwd()}/apps/googleAPIs/googleDrive.js`); // GoogleDrive 클래스를 현재 작업 디렉토리에서 불러옵니다.
const GoogleChrome = require(process.cwd() + "/apps/googleAPIs/googleChrome.js"); // GoogleChrome 클래스를 현재 작업 디렉토리에서 불러옵니다.
const GoogleSheet = require(`${process.cwd()}/apps/googleAPIs/googleSheet.js`); // GoogleSheet 클래스를 현재 작업 디렉토리에서 불러옵니다.
const GoogleCalendar = require(`${process.cwd()}/apps/googleAPIs/googleCalendar.js`); // GoogleCalendar 클래스를 현재 작업 디렉토리에서 불러옵니다.
const GoogleAnalytics = require(`${process.cwd()}/apps/googleAPIs/googleAnalytics.js`); // GoogleAnalytics 클래스를 현재 작업 디렉토리에서 불러옵니다.
const NaverAPIs = require(`${process.cwd()}/apps/naverAPIs/naverAPIs.js`); // NaverAPIs 클래스를 현재 작업 디렉토리에서 불러옵니다.
const LogReport = require(`${process.cwd()}/apps/staticLounge/router/logReport.js`); // LogReport 클래스를 현재 작업 디렉토리에서 불러옵니다.
const FacebookAPIs = require(`${process.cwd()}/apps/facebookAPIs/facebookAPIs.js`); // FacebookAPIs 클래스를 현재 작업 디렉토리에서 불러옵니다.
const GoogleAds = require(`${process.cwd()}/apps/googleAPIs/googleAds.js`); // GoogleAds 클래스를 현재 작업 디렉토리에서 불러옵니다.
const GoogleYoutube = require(`${process.cwd()}/apps/googleAPIs/googleYoutube.js`); // GoogleYoutube 클래스를 현재 작업 디렉토리에서 불러옵니다.
const BillMaker = require(`${process.cwd()}/apps/billMaker/billMaker.js`); // BillMaker 클래스를 현재 작업 디렉토리에서 불러옵니다.
const PortfolioFilter = require(`${process.cwd()}/apps/portfolioFilter/portfolioFilter.js`); // PortfolioFilter 클래스를 현재 작업 디렉토리에서 불러옵니다.

const jsdom = require("jsdom"); // JSDOM을 불러오기 위해 jsdom 모듈을 가져옵니다.
const { JSDOM } = jsdom; // JSDOM 객체를 사용하기 위해 디스트럭처링 할당을 합니다.
const address = require(process.cwd() + "/apps/infoObj.js"); // 서버 설정 정보를 포함하는 address 객체를 불러옵니다.
const host = address.secondinfo.host; // address 객체에서 서버 호스트 정보를 가져옵니다.
const { spawn } = require("child_process"); // 자식 프로세스를 생성하기 위해 spawn 메서드를 불러옵니다.
const querystring = require("querystring"); // 쿼리 문자열을 파싱하고 형성하기 위해 querystring 모듈을 불러옵니다.
const parser = require("ua-parser-js"); // 사용자 에이전트를 파싱하기 위해 ua-parser-js 모듈을 불러옵니다.
const mother = new Mother(); // Mother 클래스의 인스턴스를 생성하여 mother 변수에 할당합니다.
const back = new BackMaker(); // BackMaker 클래스의 인스턴스를 생성하여 back 변수에 할당합니다.
const work = new BackWorker(); // BackWorker 클래스의 인스턴스를 생성하여 work 변수에 할당합니다.
const formidable = require("formidable"); // Formidable 모듈을 불러옵니다. 이는 파일 업로드를 처리하는 데 사용됩니다.
const imageReader = new ImageReader(mother, back, address); // ImageReader 클래스의 인스턴스를 생성하고 mother, back, address를 전달합니다.
const hangul = new ParsingHangul(); // ParsingHangul 클래스의 인스턴스를 생성하여 hangul 변수에 할당합니다.
const drive = new GoogleDrive(); // GoogleDrive 클래스의 인스턴스를 생성하여 drive 변수에 할당합니다.
const chrome = new GoogleChrome(); // GoogleChrome 클래스의 인스턴스를 생성하여 chrome 변수에 할당합니다.
const sheets = new GoogleSheet(); // GoogleSheet 클래스의 인스턴스를 생성하여 sheets 변수에 할당합니다.
const calendar = new GoogleCalendar(); // GoogleCalendar 클래스의 인스턴스를 생성하여 calendar 변수에 할당합니다.
const analytics = new GoogleAnalytics(); // GoogleAnalytics 클래스의 인스턴스를 생성하여 analytics 변수에 할당합니다.
const naver = new NaverAPIs(); // NaverAPIs 클래스의 인스턴스를 생성하여 naver 변수에 할당합니다.
const facebook = new FacebookAPIs(); // FacebookAPIs 클래스의 인스턴스를 생성하여 facebook 변수에 할당합니다.
const meta = new FacebookAPIs(); // FacebookAPIs 클래스의 또 다른 인스턴스를 생성하여 meta 변수에 할당합니다.
const google = new GoogleAds(); // GoogleAds 클래스의 인스턴스를 생성하여 google 변수에 할당합니다.
const youtube = new GoogleYoutube(); // GoogleYoutube 클래스의 인스턴스를 생성하여 youtube 변수에 할당합니다.
const bill = new BillMaker(); // BillMaker 클래스의 인스턴스를 생성하여 bill 변수에 할당합니다.
const filter = new PortfolioFilter(); // PortfolioFilter 클래스의 인스턴스를 생성하여 filter 변수에 할당합니다.

const bar = "============================================================"; // 로그 출력 시 사용될 구분선 문자열을 정의합니다.
const { 
  errorLog, alertLog, cronLog, aliveLog, expressLog, requestSystem, equalJson, dateToString, stringToDate, sleep, 
  mysqlQuery, diskReading, aliveMongo, fileSystem, shellExec, shellLink, leafParsing, uniqueValue, stringToLink, 
  binaryRequest, zeroAddition, autoHypenPhone, processSystem, messageSend, cryptoString, objectDeepCopy, emergencyAlarm,
  linkToString, ghostFileUpload, jsonToString, tempReplaceImage, serviceParsing, ipParsing, messageLog, autoComma 
} = mother; // Mother 클래스에서 제공하는 다양한 유틸리티 메서드 및 정보를 디스트럭처링 할당합니다.

const logger = {
  /**
   * @function alert
   * @description 긴급 알람을 보내는 함수입니다.
   * @param {string} text - 알람 메시지 텍스트입니다.
   */
  alert: async (text) => {
    try {
      await emergencyAlarm(text); // 긴급 알람을 보내는 Mother 클래스의 메서드를 호출합니다.
    } catch (e) {
      console.error(e); // 오류가 발생하면 콘솔에 출력합니다.
    }
  },
  /**
   * @function log
   * @description 일반 로그를 기록하는 함수입니다.
   * @param {Object} obj - 로그로 기록할 객체입니다.
   * @param {Object} req - HTTP 요청 객체입니다.
   */
  log: async (obj, req = { url: "unknown" }) => {
    try {
      console.log(bar); // 구분선을 출력합니다.
      console.log(new Date(), "log"); // 현재 시간과 "log"라는 텍스트를 출력합니다.
      console.log("in " + String(req.url)); // 요청된 URL을 출력합니다.
      console.log(obj); // 로그 객체를 출력합니다.
      console.log(bar); // 다시 구분선을 출력합니다.
    } catch (e) {
      console.error(e); // 오류가 발생하면 콘솔에 출력합니다.
    }
  },
  /**
   * @function error
   * @description 오류 로그를 기록하는 함수입니다.
   * @param {Object} obj - 오류로 기록할 객체입니다.
   * @param {Object} req - HTTP 요청 객체입니다.
   */
  error: async (obj, req = { url: "unknown" }) => {
    try {
      console.log(bar); // 구분선을 출력합니다.
      console.log(new Date(), "error"); // 현재 시간과 "error"라는 텍스트를 출력합니다.
      console.log("in " + String(req.url)); // 요청된 URL을 출력합니다.
      console.log(obj); // 오류 객체를 출력합니다.
      console.log(bar); // 다시 구분선을 출력합니다.
    } catch (e) {
      console.error(e); // 오류가 발생하면 콘솔에 출력합니다.
    }
  },
  /**
   * @function cron
   * @description 정기 작업 로그를 기록하는 함수입니다.
   * @param {string} text - 정기 작업 로그 텍스트입니다.
   */
  cron: async (text) => {
    try {
      await cronLog(text); // 정기 작업 로그를 기록하는 Mother 클래스의 메서드를 호출합니다.
    } catch (e) {
      console.error(e); // 오류가 발생하면 콘솔에 출력합니다.
    }
  },
  /**
   * @function alive
   * @description 서버 활성화 상태를 기록하는 함수입니다.
   * @param {string} text - 활성화 상태 로그 텍스트입니다.
   */
  alive: async (text) => {
    try {
      await aliveLog(text); // 활성화 상태 로그를 기록하는 Mother 클래스의 메서드를 호출합니다.
    } catch (e) {
      console.error(e); // 오류가 발생하면 콘솔에 출력합니다.
    }
  },
};

const staticConst = process.env.HOME + "/samba"; // 정적 파일이 위치한 기본 경로를 환경 변수 HOME과 'samba' 디렉토리를 결합하여 설정합니다.
const portfolioConst = process.env.HOME + "/portfolioFilter/resource"; // 포트폴리오 관련 파일이 위치한 기본 경로를 설정합니다.
const sambaToken = "__samba__"; // Samba 관련 경로에서 사용하는 토큰을 정의합니다.
const homeliaisonOfficeConst = address.officeinfo.ghost.file.office; // Homeliaison 관련 파일이 저장된 기본 경로를 설정합니다.
const designerPhotoConst = "사진_등록_포트폴리오"; // 디자이너 사진 폴더의 이름을 정의합니다.
const designerFolderConst = "디자이너"; // 디자이너 관련 폴더의 이름을 정의합니다.
const designerFolderConst2 = "partnership"; // 파트너십 관련 폴더의 이름을 정의합니다.
const centrex = {
  host: "centrex.uplus.co.kr", // Centrex 호스트 URL을 설정합니다.
  sessionConst: "PHPSESSID", // PHP 세션의 이름을 설정합니다.
  sessionValue: "18c31ed858c6824a885da1cc06daf388", // PHP 세션의 값을 설정합니다.
};
const sambaKeyword = "drive"; // Samba에서 사용하는 기본 키워드를 정의합니다.
const rootFolders = [
  {
    name: "HomeLiaisonServer", // 홈리에종 서버의 이름을 설정합니다.
    id: "1KOGtX31o16N6cfkdfyeAFrD9-2EFTO0d", // 홈리에종 서버의 ID를 설정합니다.
  },
  {
    name: "# 홈리에종", // 홈리에종의 다른 서버 이름을 설정합니다.
    id: "0B7youNEnMPEfQjBNZldFZXVlVTg", // 홈리에종의 다른 서버 ID를 설정합니다.
  },
];
const osTempFolder = "/tmp"; // 운영 체제의 임시 폴더 경로를 설정합니다.

/**
 * @class StaticRouter
 * @description StaticLounge 서버의 라우터를 설정하는 클래스입니다.
 */
class StaticRouter {
  /**
   * @constructor
   * @param {Object} MONGOC - MongoDB 연결 객체입니다.
   * @param {Object} kakao - KakaoTalk 인스턴스입니다.
   * @param {Object} human - HumanPacket 인스턴스입니다.
   * @description StaticRouter 클래스의 인스턴스를 초기화합니다. 
   * 라우터와 관련된 모든 클래스를 초기화하고 인스턴스 변수로 할당합니다.
   */
  constructor (MONGOC, kakao, human) {
    this.mother = mother; // Mother 클래스의 인스턴스를 현재 객체의 mother 속성에 할당합니다.
    this.back = back; // BackMaker 클래스의 인스턴스를 현재 객체의 back 속성에 할당합니다.
    this.work = work; // BackWorker 클래스의 인스턴스를 현재 객체의 work 속성에 할당합니다.
    this.address = address; // 서버 설정 정보를 포함하는 address 객체를 현재 객체의 address 속성에 할당합니다.
    this.JSDOM = JSDOM; // JSDOM 객체를 현재 객체의 JSDOM 속성에 할당합니다.
    this.host = host; // 서버 호스트 정보를 현재 객체의 host 속성에 할당합니다.
    this.mongo = MONGOC; // 전달된 MongoDB 연결 객체를 현재 객체의 mongo 속성에 할당합니다.
    this.mongolocal = MONGOC; // 로컬 MongoDB 연결 객체를 현재 객체의 mongolocal 속성에 할당합니다.
    this.report = new LogReport(MONGOC); // LogReport 클래스의 인스턴스를 생성하여 현재 객체의 report 속성에 할당합니다.
    this.kakao = kakao; // 전달된 KakaoTalk 인스턴스를 현재 객체의 kakao 속성에 할당합니다.
    this.human = human; // 전달된 HumanPacket 인스턴스를 현재 객체의 human 속성에 할당합니다.
    this.formidable = formidable; // Formidable 인스턴스를 현재 객체의 formidable 속성에 할당합니다.
    this.imageReader = imageReader; // ImageReader 인스턴스를 현재 객체의 imageReader 속성에 할당합니다.
    this.hangul = hangul; // ParsingHangul 인스턴스를 현재 객체의 hangul 속성에 할당합니다.
    this.drive = drive; // GoogleDrive 인스턴스를 현재 객체의 drive 속성에 할당합니다.
    this.chrome = chrome; // GoogleChrome 인스턴스를 현재 객체의 chrome 속성에 할당합니다.
    this.sheets = sheets; // GoogleSheet 인스턴스를 현재 객체의 sheets 속성에 할당합니다.
    this.calendar = calendar; // GoogleCalendar 인스턴스를 현재 객체의 calendar 속성에 할당합니다.
    this.analytics = analytics; // GoogleAnalytics 인스턴스를 현재 객체의 analytics 속성에 할당합니다.
    this.naver = naver; // NaverAPIs 인스턴스를 현재 객체의 naver 속성에 할당합니다.
    this.facebook = facebook; // FacebookAPIs 인스턴스를 현재 객체의 facebook 속성에 할당합니다.
    this.meta = meta; // 또 다른 FacebookAPIs 인스턴스를 현재 객체의 meta 속성에 할당합니다.
    this.google = google; // GoogleAds 인스턴스를 현재 객체의 google 속성에 할당합니다.
    this.youtube = youtube; // GoogleYoutube 인스턴스를 현재 객체의 youtube 속성에 할당합니다.
    this.bill = bill; // BillMaker 인스턴스를 현재 객체의 bill 속성에 할당합니다.
    this.filter = filter; // PortfolioFilter 인스턴스를 현재 객체의 filter 속성에 할당합니다.
    this.staticConst = staticConst; // 정적 파일의 기본 경로를 현재 객체의 staticConst 속성에 할당합니다.
    this.portfolioConst = portfolioConst; // 포트폴리오 관련 파일의 기본 경로를 현재 객체의 portfolioConst 속성에 할당합니다.
    this.sambaToken = sambaToken; // Samba 관련 경로의 토큰을 현재 객체의 sambaToken 속성에 할당합니다.
    this.homeliaisonOfficeConst = homeliaisonOfficeConst; // Homeliaison 관련 파일의 기본 경로를 현재 객체의 homeliaisonOfficeConst 속성에 할당합니다.
    this.designerPhotoConst = designerPhotoConst; // 디자이너 사진 폴더의 이름을 현재 객체의 designerPhotoConst 속성에 할당합니다.
    this.designerFolderConst = designerFolderConst; // 디자이너 관련 폴더의 이름을 현재 객체의 designerFolderConst 속성에 할당합니다.
    this.designerFolderConst2 = designerFolderConst2; // 파트너십 관련 폴더의 이름을 현재 객체의 designerFolderConst2 속성에 할당합니다.
    this.centrex = centrex; // Centrex 호스트와 세션 정보를 현재 객체의 centrex 속성에 할당합니다.
    this.sambaKeyword = sambaKeyword; // Samba 관련 기본 키워드를 현재 객체의 sambaKeyword 속성에 할당합니다.
    this.rootFolders = rootFolders; // 루트 폴더 정보를 현재 객체의 rootFolders 속성에 할당합니다.
    this.osTempFolder = osTempFolder; // 운영 체제의 임시 폴더 경로를 현재 객체의 osTempFolder 속성에 할당합니다.
  }

  /**
   * @function setRouter
   * @description StaticRouter 클래스에서 Express 라우터를 설정하는 함수입니다.
   * 이 함수는 다양한 종속성을 로드하고, 라우터의 엔드포인트를 정의합니다.
   * @returns {Object} Express 라우터 객체를 반환합니다.
   */
  setRouter () {
    // 현재 StaticRouter 인스턴스를 instance 변수에 할당합니다.
    const instance = this;

    // Express 모듈을 불러옵니다. Express는 Node.js의 웹 프레임워크입니다.
    const express = require("express");

    // Express 라우터 인스턴스를 생성합니다. 이 라우터는 새로운 요청 경로를 정의하는 데 사용됩니다.
    const router = express.Router();

    // StaticRouter 인스턴스의 mother 속성을 mother 변수에 할당합니다.
    const mother = this.mother;

    // StaticRouter 인스턴스의 back 속성을 back 변수에 할당합니다.
    const back = this.back;

    // StaticRouter 인스턴스의 work 속성을 work 변수에 할당합니다.
    const work = this.work;

    // StaticRouter 인스턴스의 address 속성을 address 변수에 할당합니다. 서버의 다양한 설정 정보가 포함되어 있습니다.
    const address = this.address;

    // StaticRouter 인스턴스의 JSDOM 속성을 JSDOM 변수에 할당합니다. 이는 서버에서 DOM을 생성하고 조작할 수 있게 합니다.
    const JSDOM = this.JSDOM;

    // StaticRouter 인스턴스의 host 속성을 host 변수에 할당합니다. 서버 호스트 정보가 포함되어 있습니다.
    const host = this.host;

    // StaticRouter 인스턴스의 mongo 속성을 mongo 변수에 할당합니다. MongoDB 연결 객체가 포함되어 있습니다.
    const mongo = this.mongo;

    // StaticRouter 인스턴스의 mongolocal 속성을 mongolocal 변수에 할당합니다. 로컬 MongoDB 연결 객체가 포함되어 있습니다.
    const mongolocal = this.mongolocal;

    // StaticRouter 인스턴스의 report 속성을 report 변수에 할당합니다. 로그 보고서를 관리하는 객체가 포함되어 있습니다.
    const report = this.report;

    // StaticRouter 인스턴스의 kakao 속성을 kakao 변수에 할당합니다. KakaoTalk 관련 기능을 처리하는 인스턴스입니다.
    const kakao = this.kakao;

    // StaticRouter 인스턴스의 human 속성을 human 변수에 할당합니다. HumanPacket 관련 기능을 처리하는 인스턴스입니다.
    const human = this.human;

    // StaticRouter 인스턴스의 formidable 속성을 formidable 변수에 할당합니다. 파일 업로드를 처리하는 인스턴스입니다.
    const formidable = this.formidable;

    // StaticRouter 인스턴스의 imageReader 속성을 imageReader 변수에 할당합니다. 이미지 읽기 및 처리 기능을 담당합니다.
    const imageReader = this.imageReader;

    // StaticRouter 인스턴스의 hangul 속성을 hangul 변수에 할당합니다. 한글 파싱을 처리하는 인스턴스입니다.
    const hangul = this.hangul;

    // StaticRouter 인스턴스의 drive 속성을 drive 변수에 할당합니다. Google Drive API와 상호작용을 처리합니다.
    const drive = this.drive;

    // StaticRouter 인스턴스의 chrome 속성을 chrome 변수에 할당합니다. Google Chrome API와 상호작용을 처리합니다.
    const chrome = this.chrome;

    // StaticRouter 인스턴스의 sheets 속성을 sheets 변수에 할당합니다. Google Sheets API와 상호작용을 처리합니다.
    const sheets = this.sheets;

    // StaticRouter 인스턴스의 calendar 속성을 calendar 변수에 할당합니다. Google Calendar API와 상호작용을 처리합니다.
    const calendar = this.calendar;

    // StaticRouter 인스턴스의 analytics 속성을 analytics 변수에 할당합니다. Google Analytics API와 상호작용을 처리합니다.
    const analytics = this.analytics;

    // StaticRouter 인스턴스의 naver 속성을 naver 변수에 할당합니다. Naver API와 상호작용을 처리합니다.
    const naver = this.naver;

    // StaticRouter 인스턴스의 facebook 속성을 facebook 변수에 할당합니다. Facebook API와 상호작용을 처리합니다.
    const facebook = this.facebook;

    // StaticRouter 인스턴스의 meta 속성을 meta 변수에 할당합니다. 메타 데이터를 처리하는 Facebook API 인스턴스입니다.
    const meta = this.meta;

    // StaticRouter 인스턴스의 google 속성을 google 변수에 할당합니다. Google Ads API와 상호작용을 처리합니다.
    const google = this.google;

    // StaticRouter 인스턴스의 youtube 속성을 youtube 변수에 할당합니다. Google Youtube API와 상호작용을 처리합니다.
    const youtube = this.youtube;

    // StaticRouter 인스턴스의 bill 속성을 bill 변수에 할당합니다. 청구서 생성을 관리하는 인스턴스입니다.
    const bill = this.bill;

    // StaticRouter 인스턴스의 filter 속성을 filter 변수에 할당합니다. 포트폴리오 필터링 기능을 관리합니다.
    const filter = this.filter;

    // StaticRouter 인스턴스의 staticConst 속성을 staticConst 변수에 할당합니다. 정적 파일의 기본 경로를 관리합니다.
    const staticConst = this.staticConst;

    // StaticRouter 인스턴스의 portfolioConst 속성을 portfolioConst 변수에 할당합니다. 포트폴리오 파일의 기본 경로를 관리합니다.
    const portfolioConst = this.portfolioConst;

    // StaticRouter 인스턴스의 sambaToken 속성을 sambaToken 변수에 할당합니다. Samba 관련 경로에서 사용하는 토큰을 관리합니다.
    const sambaToken = this.sambaToken;

    // StaticRouter 인스턴스의 homeliaisonOfficeConst 속성을 homeliaisonOfficeConst 변수에 할당합니다. Homeliaison 관련 파일의 기본 경로를 관리합니다.
    const homeliaisonOfficeConst = this.homeliaisonOfficeConst;

    // StaticRouter 인스턴스의 designerPhotoConst 속성을 designerPhotoConst 변수에 할당합니다. 디자이너 사진 폴더의 이름을 관리합니다.
    const designerPhotoConst = this.designerPhotoConst;

    // StaticRouter 인스턴스의 designerFolderConst 속성을 designerFolderConst 변수에 할당합니다. 디자이너 관련 폴더의 이름을 관리합니다.
    const designerFolderConst = this.designerFolderConst;

    // StaticRouter 인스턴스의 designerFolderConst2 속성을 designerFolderConst2 변수에 할당합니다. 파트너십 관련 폴더의 이름을 관리합니다.
    const designerFolderConst2 = this.designerFolderConst2;

    // StaticRouter 인스턴스의 centrex 속성을 centrex 변수에 할당합니다. Centrex 호스트와 세션 정보를 관리합니다.
    const centrex = this.centrex;

    // StaticRouter 인스턴스의 sambaKeyword 속성을 sambaKeyword 변수에 할당합니다. Samba 관련 기본 키워드를 관리합니다.
    const sambaKeyword = this.sambaKeyword;

    // StaticRouter 인스턴스의 rootFolders 속성을 rootFolders 변수에 할당합니다. 루트 폴더 정보를 관리합니다.
    const rootFolders = this.rootFolders;

    // StaticRouter 인스턴스의 osTempFolder 속성을 osTempFolder 변수에 할당합니다. 운영 체제의 임시 폴더 경로를 관리합니다.
    const osTempFolder = this.osTempFolder;

    /**
     * @route GET /
     * @description 루트 경로 ("/")에 대한 GET 요청을 처리하는 라우터입니다.
     * 이 엔드포인트는 클라이언트를 지정된 URL로 리다이렉트합니다.
     * @param {Object} req - 클라이언트 요청 객체입니다.
     * @param {Object} res - 서버 응답 객체입니다.
     */
    router.get([ "/" ], async (req, res) => {
      try {
        // 응답 헤더를 설정합니다. 클라이언트와 서버 간의 CORS(Cross-Origin Resource Sharing) 문제를 해결하는 데 사용됩니다.
        res.set({
          "Content-Type": "text/html", // 응답의 콘텐츠 타입을 HTML로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 설정합니다.
        });

        // 클라이언트를 지정된 URL로 리다이렉트하는 HTML 스크립트를 응답 본문으로 전송합니다.
        res.send((`<html><script>window.location.href = "https://${address.officeinfo.host}:3002/client";</script></html>`));

      } catch (e) {
        // 오류가 발생하면 logger.error 메서드를 통해 오류를 로깅합니다. 
        // Mother 클래스의 메서드를 활용하여 오류를 기록하고 알림을 보낼 수 있습니다.
        logger.error(e, req).catch((e) => { 
          console.log(e); // 만약 로깅 중 추가 오류가 발생하면 콘솔에 출력합니다.
        });

        // 오류가 발생한 경우에도 동일한 응답 헤더를 설정합니다.
        res.set({
          "Content-Type": "text/html", // 응답의 콘텐츠 타입을 HTML로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 설정합니다.
        });

        // 오류가 발생한 경우에도 클라이언트를 지정된 URL로 리다이렉트하는 HTML 스크립트를 응답 본문으로 전송합니다.
        res.send((`<html><script>window.location.href = "https://${address.officeinfo.host}:3002/client";</script></html>`));
      }
    });

    /**
     * @route GET /:id
     * @description 동적 경로 ("/:id")에 대한 GET 요청을 처리하는 라우터입니다.
     * 클라이언트가 전달한 경로 매개변수(id)에 따라 다양한 작업을 수행합니다.
     * @param {Object} req - 클라이언트 요청 객체입니다.
     * @param {Object} res - 서버 응답 객체입니다.
     */
    router.get([ "/:id" ], async (req, res) => {

      // 응답 헤더를 설정합니다. JSON 데이터를 전송할 준비를 합니다.
      res.set({
        "Content-Type": "application/json", // 응답의 콘텐츠 타입을 JSON으로 설정합니다.
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정합니다.
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 설정합니다.
      });

      try {
        // 요청된 id가 "ssl"인 경우
        if (req.params.id === "ssl") {

          // 디스크 사용량을 읽어오는 diskReading 메서드를 호출합니다.
          const disk = await diskReading();

          // MongoDB의 활성 상태를 확인하는 aliveMongo 메서드를 호출합니다.
          const aliveMongoResult = await aliveMongo();

          // dailyAnalytics 함수는 매일 수행되는 분석 작업을 관리합니다.
          const dailyAnalytics = async function () {
            try {
              let date;
              let requestString;

              // 날짜 객체를 생성하고, 날짜를 세 번 줄입니다.
              date = new Date();
              date.setDate(date.getDate() - 1);
              date.setDate(date.getDate() - 1);
              date.setDate(date.getDate() - 1);

              // 요청 문자열을 생성합니다. 날짜를 여러 형식으로 결합합니다.
              requestString = '';
              requestString += dateToString(date);
              requestString += ',';
              date.setDate(date.getDate() + 1);
              requestString += dateToString(date);
              requestString += ',';
              date.setDate(date.getDate() + 1);
              requestString += dateToString(date);

              // requestSystem 메서드를 사용하여 외부 API에 요청을 보냅니다.
              await requestSystem("https://" + instance.address.officeinfo.ghost.host + "/analyticsDaily", 
                                  { date: requestString }, 
                                  { headers: { "Content-Type": "application/json" } });

            } catch (e) {
              console.log(e); // 오류가 발생하면 콘솔에 출력합니다.
            }
          }

          // dailyAnalytics 함수를 실행하고, 완료되면 로그를 기록합니다.
          dailyAnalytics().then(() => {
            return logger.cron("front reflection, daily campaign, daily channel request done"); // 정기 작업 완료 로그를 기록합니다.
          }).catch((err) => {
            logger.error(err, req).catch((e) => { console.log(e); }); // 오류가 발생하면 오류를 로깅합니다.
          });

          // 디스크 사용량과 MongoDB 상태를 JSON 형태로 응답합니다.
          res.send(JSON.stringify({ disk: disk.toArray(), mongo: aliveMongoResult }));

        } else if (req.params.id === "disk") {
          // 요청된 id가 "disk"인 경우 디스크 사용량을 JSON 형태로 응답합니다.
          const disk = await diskReading();
          res.send(JSON.stringify({ disk: disk.toArray() }));

        } else if (req.params.id === "ip") {
          // 요청된 id가 "ip"인 경우 클라이언트의 IP 주소를 응답합니다.
          const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
          res.set({
            "Content-Type": "text/plain", // 응답의 콘텐츠 타입을 텍스트로 설정합니다.
            "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정합니다.
            "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 설정합니다.
          });
          res.send(String(ip).replace(/[^0-9\.]/gi, '')); // IP 주소에서 숫자와 점(.)만 추출하여 응답합니다.

        } else if (req.params.id === "code") {
          // 요청된 id가 "code"인 경우 특정 URL로 리다이렉트하는 HTML을 응답합니다.
          res.set({
            "Content-Type": "text/html", // 응답의 콘텐츠 타입을 HTML로 설정합니다.
            "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정합니다.
            "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 설정합니다.
          });
          res.send((`<html><script>window.location.href = "https://${instance.address.officeinfo.host}:38080?folder=/home/ubuntu/robot";</script></html>`));

        } else {
          // 그 외의 id 값에 대해서는 기본 리다이렉트 처리를 수행합니다.
          res.set({
            "Content-Type": "text/html", // 응답의 콘텐츠 타입을 HTML로 설정합니다.
            "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정합니다.
            "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 설정합니다.
          });
          res.send((`<html><script>window.location.href = "https://${instance.address.officeinfo.host}:3002/${req.params.id}";</script></html>`));
        }

      } catch (e) {
        // 오류가 발생하면 오류를 로깅하고, 오류 메시지를 JSON 형태로 응답합니다.
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ error: e.message }));
      }
    });

    /**
     * @route GET /tools/address
     * @description 주소 입력 도구 페이지를 제공하는 라우터입니다.
     * 이 페이지는 다음 우편번호 API를 사용하여 사용자가 주소를 입력할 수 있도록 합니다.
     * @param {Object} req - 클라이언트 요청 객체입니다.
     * @param {Object} res - 서버 응답 객체입니다.
     */
    router.get([ "/tools/address" ], async (req, res) => {
      try {
        // HTML 콘텐츠를 정의합니다. 이 콘텐츠는 다음 우편번호 API를 사용하여 주소 입력 창을 제공합니다.
        const html = `<!DOCTYPE html><html lang="ko" dir="ltr"><head><meta charset="utf-8">
          <style>*{margin:0}body{width:100vh;height:100vh;overflow:hidden}body::-webkit-scrollbar{display:none;}img{cursor:pointer;position:absolute;right:0px;top:-1px;z-index:1}div{border:0;width:100vw;height:100vh;position:relative}</style>
          <script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script></head><body><script>
          let div_clone, img_clone;div_clone = document.createElement("DIV");img_clone = document.createElement("IMG");img_clone.setAttribute("src", "https://t1.daumcdn.net/postcode/resource/images/close.png");img_clone.setAttribute("id", "btnFoldWrap");div_clone.appendChild(img_clone);document.body.appendChild(div_clone);
          new daum.Postcode({
              oncomplete: function (data) {
                let addr = '', extraAddr = '';
                if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택한 경우
                  addr = data.roadAddress;
                  if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) { // 법정동명에 '동', '로', '가'가 포함된 경우
                    extraAddr += data.bname; 
                  }
                  if (data.buildingName !== '' && data.apartment === 'Y') { // 건물 이름이 있고, 아파트인 경우
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                  }
                  if (extraAddr !== '') { // 추가 주소가 있는 경우 괄호로 묶어 표시합니다.
                    extraAddr = ' (' + extraAddr + ')';
                  }
                } else { // 사용자가 지번 주소를 선택한 경우
                  addr = data.jibunAddress;
                }
                // 상세 주소를 입력받고, 전체 주소를 부모 창으로 전송합니다.
                const detail = prompt("상세주소를 입력해주세요! : " + addr + extraAddr);
                window.parent.postMessage(addr + extraAddr + " " + detail, '*');
              }, 
              width : '100%', height : '100%' 
          }).embed(div_clone);</script></body></html>`;

        // 응답 헤더에 콘텐츠 타입을 HTML로 설정합니다.
        res.set("Content-Type", "text/html");

        // HTML 콘텐츠를 클라이언트에 응답으로 전송합니다.
        res.send(html);

      } catch (e) {
        // 오류가 발생하면 오류를 로깅합니다.
        logger.error(e, req).catch((e) => { 
          console.log(e); // 로깅 중 오류가 발생하면 콘솔에 출력합니다.
        });
      }
    });

    /**
     * @route POST /listFiles
     * @description 지정된 경로의 파일 목록을 반환하는 라우터입니다.
     * 클라이언트가 POST 요청으로 전달한 경로를 기준으로 파일 목록을 생성하여 응답합니다.
     * @param {Object} req - 클라이언트 요청 객체입니다.
     * @param {Object} res - 서버 응답 객체입니다.
     */
    router.post([ "/listFiles" ], async function (req, res) {
      // 응답 헤더를 설정하여 클라이언트와의 CORS(Cross-Origin Resource Sharing) 문제를 해결합니다.
      res.set({
        "Content-Type": "application/json", // 응답의 콘텐츠 타입을 JSON으로 설정합니다.
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정합니다.
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 설정합니다.
      });

      try {
        // 요청 본문에서 path가 정의되지 않았을 경우 예외를 발생시킵니다.
        if (req.body.path === undefined) {
          throw new Error("invaild post"); // 유효하지 않은 POST 요청에 대한 오류 메시지.
        }

        let target; // 검색할 대상 경로를 저장할 변수입니다.
        let list; // 파일 목록을 저장할 변수입니다.

        // 요청된 경로에서 시작과 끝에 있는 슬래시를 제거합니다.
        target = req.body.path.replace(/^\//i, '').replace(/\/$/i, '');

        // 경로가 빈 문자열일 경우 기본 경로인 sambaToken을 설정합니다.
        if (target.trim() === '') {
          target = sambaToken;
        }

        // 경로가 '__'로 시작하지 않으면 sambaToken을 경로 앞에 추가합니다.
        if (!/^__/.test(target)) {
          target = sambaToken + "/" + target;
        }

        // 경로에서 sambaToken을 실제 파일 경로로 변환합니다.
        target = target.replace(new RegExp(sambaToken, "gi"), staticConst);

        // leafParsing 메서드를 사용하여 대상 경로의 파일 목록을 가져옵니다.
        list = await leafParsing(target);

        // 파일 목록이 배열이 아닌 경우 빈 배열로 초기화합니다.
        if (!Array.isArray(list)) {
          list = [];
        }

        // 파일 목록에서 각 파일의 절대 경로를 다시 sambaToken으로 변환하고, 필터링 작업을 수행합니다.
        list = list.map((i) => {
          i.absolute = i.absolute.replace(new RegExp("^" + staticConst, "i"), sambaToken);
          return i;
        }).filter((i) => {
          // 파일명에 '._'로 시작하는 항목을 제거합니다.
          return !/^\.\_/.test(i.absolute.split("/")[i.absolute.split("/").length - 1]);
        }).filter((i) => {
          // 파일명이 '.DS_Store'인 항목을 제거합니다.
          return i.absolute.split("/")[i.absolute.split("/").length - 1] !== ".DS_Store";
        });

        // 필터링된 파일 목록을 JSON 형식으로 응답합니다.
        res.send(JSON.stringify(list));

      } catch (e) {
        // 오류가 발생하면 오류를 로깅하고, 오류 메시지를 JSON 형식으로 응답합니다.
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @route POST /searchFiles
     * @description 지정된 경로와 키워드를 기준으로 파일을 검색하는 라우터입니다.
     * 클라이언트가 POST 요청으로 전달한 경로와 검색 키워드에 따라 파일 목록을 검색하여 응답합니다.
     * @param {Object} req - 클라이언트 요청 객체입니다.
     * @param {Object} res - 서버 응답 객체입니다.
     */
    router.post([ "/searchFiles" ], async function (req, res) {
      // 응답 헤더를 설정하여 클라이언트와의 CORS(Cross-Origin Resource Sharing) 문제를 해결합니다.
      res.set({
        "Content-Type": "application/json", // 응답의 콘텐츠 타입을 JSON으로 설정합니다.
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정합니다.
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 설정합니다.
      });

      try {
        // 요청 본문에 path, keyword, mode가 정의되지 않았을 경우 예외를 발생시킵니다.
        if (req.body.path === undefined || req.body.keyword === undefined || req.body.mode === undefined) {
          throw new Error("invalid post"); // 유효하지 않은 POST 요청에 대한 오류 메시지.
        }

        let target; // 검색할 대상 경로를 저장할 변수입니다.
        let result; // 검색 결과를 저장할 변수입니다.
        let list; // 파일 목록을 저장할 변수입니다.

        // 요청된 경로에서 시작과 끝에 있는 슬래시를 제거합니다.
        target = req.body.path.replace(/^\//i, '').replace(/\/$/i, '');

        // 경로가 빈 문자열일 경우 기본 경로인 sambaToken을 설정합니다.
        if (target.trim() === '') {
          target = sambaToken;
        }

        // 경로가 '__'로 시작하지 않으면 sambaToken을 경로 앞에 추가합니다.
        if (!/^__/.test(target)) {
          target = sambaToken + "/" + target;
        }

        // 경로에서 sambaToken을 실제 파일 경로로 변환합니다.
        target = target.replace(new RegExp(sambaToken, "gi"), staticConst);

        // 검색 모드가 "entire"인 경우 전체 경로를 검색합니다.
        if (req.body.mode === "entire") {
          list = await leafParsing(target, true, req.body.keyword); // leafParsing 메서드를 사용하여 전체 파일 경로에서 검색합니다.
          if (!Array.isArray(list)) {
            throw new Error(list.error); // 검색 결과가 배열이 아닌 경우 오류를 발생시킵니다.
          }
        } else {
          // 검색 모드가 "entire"가 아닌 경우 지정된 경로에서만 검색합니다.
          list = await leafParsing(target, true, req.body.keyword); // leafParsing 메서드를 사용하여 지정된 경로에서 검색합니다.
          if (!Array.isArray(list)) {
            throw new Error(list.error); // 검색 결과가 배열이 아닌 경우 오류를 발생시킵니다.
          }
          // 검색된 파일 목록에서 절대 경로가 target과 일치하는 항목만 필터링합니다.
          list = list.filter((obj) => {
            return (new RegExp(target)).test(obj.absolute);
          }).filter((obj) => {
            // 대상 경로의 깊이와 검색된 파일 경로의 깊이가 동일한 항목만 필터링합니다.
            return obj.absolute.split("/").length === target.split("/").length + 1
          });
        }

        // 파일 목록에서 각 파일의 절대 경로를 다시 sambaToken으로 변환하고, 필터링 작업을 수행합니다.
        list = list.map((i) => {
          i.absolute = i.absolute.replace(new RegExp("^" + staticConst, "i"), sambaToken);
          return i;
        }).filter((i) => {
          // 파일명에 '._'로 시작하는 항목을 제거합니다.
          return !/^\.\_/.test(i.absolute.split("/")[i.absolute.split("/").length - 1]);
        }).filter((i) => {
          // 파일명이 '.DS_Store'인 항목을 제거합니다.
          return i.absolute.split("/")[i.absolute.split("/").length - 1] !== ".DS_Store";
        });

        // 필터링된 파일 목록을 JSON 형식으로 응답합니다.
        res.send(JSON.stringify(list));

      } catch (e) {
        // 오류가 발생하면 오류를 로깅하고, 오류 메시지를 JSON 형식으로 응답합니다.
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @route POST /readDir, /readFolder
     * @description 지정된 경로의 디렉토리 또는 폴더 내용을 읽어오는 라우터입니다.
     * 클라이언트가 POST 요청으로 전달한 경로에 따라 해당 디렉토리의 파일 및 폴더 목록을 반환합니다.
     * @param {Object} req - 클라이언트 요청 객체입니다.
     * @param {Object} res - 서버 응답 객체입니다.
     */
    router.post([ "/readDir", "/readFolder" ], async function (req, res) {
      // 응답 헤더를 설정하여 클라이언트와의 CORS(Cross-Origin Resource Sharing) 문제를 해결합니다.
      res.set({
        "Content-Type": "application/json", // 응답의 콘텐츠 타입을 JSON으로 설정합니다.
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정합니다.
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 설정합니다.
      });

      try {
        // 요청 본문에 path가 정의되지 않았을 경우 예외를 발생시킵니다.
        if (req.body.path === undefined) {
          throw new Error("invalid post"); // 유효하지 않은 POST 요청에 대한 오류 메시지.
        }

        let target; // 읽어올 대상 경로를 저장할 변수입니다.
        let list; // 디렉토리 내용을 저장할 변수입니다.

        // 요청된 경로에서 시작과 끝에 있는 슬래시를 제거합니다.
        target = req.body.path.replace(/^\//i, '').replace(/\/$/i, '');

        // 경로가 빈 문자열일 경우 기본 경로인 sambaToken을 설정합니다.
        if (target.trim() === '') {
          target = sambaToken;
        }

        // 경로가 '__'로 시작하지 않으면 sambaToken을 경로 앞에 추가합니다.
        if (!/^__/.test(target)) {
          target = sambaToken + "/" + target;
        }

        // 경로에서 sambaToken을 실제 파일 경로로 변환합니다.
        target = target.replace(new RegExp("^" + sambaToken, "i"), staticConst);

        // fileSystem 메서드를 사용하여 지정된 경로의 폴더 내용을 읽어옵니다.
        list = await fileSystem(`readFolder`, [ target ]);

        // 읽어온 폴더 내용을 JSON 형식으로 응답합니다.
        res.send(JSON.stringify(list));

      } catch (e) {
        // 오류가 발생하면 오류를 로깅하고, 오류 메시지를 JSON 형식으로 응답합니다.
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @route POST /readFile
     * @description 지정된 경로의 파일 내용을 읽어오는 라우터입니다.
     * 클라이언트가 POST 요청으로 전달한 경로에 있는 파일의 내용을 문자열로 읽어와 JSON 형식으로 반환합니다.
     * @param {Object} req - 클라이언트 요청 객체입니다.
     * @param {Object} res - 서버 응답 객체입니다.
     */
    router.post([ "/readFile" ], async function (req, res) {
      // 응답 헤더를 설정하여 클라이언트와의 CORS(Cross-Origin Resource Sharing) 문제를 해결합니다.
      res.set({
        "Content-Type": "application/json", // 응답의 콘텐츠 타입을 JSON으로 설정합니다.
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정합니다.
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 설정합니다.
      });

      try {
        // 요청 본문에 path가 정의되지 않았을 경우 예외를 발생시킵니다.
        if (req.body.path === undefined) {
          throw new Error("invalid post"); // 유효하지 않은 POST 요청에 대한 오류 메시지.
        }

        let target; // 읽어올 파일 경로를 저장할 변수입니다.
        let contents; // 파일 내용을 저장할 변수입니다.

        // 요청된 경로에서 시작과 끝에 있는 슬래시를 제거합니다.
        target = req.body.path.replace(/^\//i, '').replace(/\/$/i, '');

        // 경로가 빈 문자열일 경우 기본 경로인 sambaToken을 설정합니다.
        if (target.trim() === '') {
          target = sambaToken;
        }

        // 경로가 '__'로 시작하지 않으면 sambaToken을 경로 앞에 추가합니다.
        if (!/^__/.test(target)) {
          target = sambaToken + "/" + target;
        }

        // 경로에서 sambaToken을 실제 파일 경로로 변환합니다.
        target = target.replace(new RegExp(sambaToken, "gi"), staticConst);

        // fileSystem 메서드를 사용하여 지정된 경로의 파일 내용을 읽어옵니다.
        contents = await fileSystem(`readString`, [ target ]);

        // 읽어온 파일 내용을 JSON 형식으로 응답합니다.
        res.send(JSON.stringify({ contents }));

      } catch (e) {
        // 오류가 발생하면 오류를 로깅하고, 오류 메시지를 JSON 형식으로 응답합니다.
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @route POST /findFolderId
     * @description 지정된 경로의 폴더 ID를 찾는 라우터입니다.
     * 클라이언트가 POST 요청으로 전달한 경로를 분석하여 해당 폴더의 Google Drive ID를 반환합니다.
     * @param {Object} req - 클라이언트 요청 객체입니다.
     * @param {Object} res - 서버 응답 객체입니다.
     */
    router.post([ "/findFolderId" ], async function (req, res) {
      // 응답 헤더를 설정하여 클라이언트와의 CORS(Cross-Origin Resource Sharing) 문제를 해결합니다.
      res.set({
        "Content-Type": "application/json", // 응답의 콘텐츠 타입을 JSON으로 설정합니다.
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정합니다.
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 설정합니다.
      });

      try {
        // 요청 본문에 path가 정의되지 않았을 경우 예외를 발생시킵니다.
        if (req.body.path === undefined) {
          throw new Error("invalid post"); // 유효하지 않은 POST 요청에 대한 오류 메시지.
        }

        const { path } = req.body; // 요청 본문에서 경로를 추출합니다.
        const thisFolderArr = path.replace(/\/$/i, '').replace(/\/$/i, '').split("/"); // 경로의 마지막 슬래시를 제거하고, 경로를 배열로 변환합니다.
        let sambaIndex; // Samba 경로의 인덱스를 저장할 변수입니다.
        let thisRootId; // 최상위 폴더의 ID를 저장할 변수입니다.
        let thisRootIndex; // 최상위 폴더의 인덱스를 저장할 변수입니다.
        let chainTarget; // 폴더 체인을 저장할 변수입니다.
        let parentId; // 부모 폴더 ID를 저장할 변수입니다.
        let thisId; // 현재 폴더 ID를 저장할 변수입니다.
        let finalId; // 최종 폴더 ID를 저장할 변수입니다.

        // 경로에서 Samba 키워드의 위치를 찾습니다.
        sambaIndex = thisFolderArr.findIndex((str) => { return str === sambaKeyword });

        // Samba 키워드 뒤에 루트 폴더가 정의되지 않았거나, 유효하지 않은 경우 예외를 발생시킵니다.
        if (thisFolderArr[sambaIndex + 1] === undefined || !rootFolders.map(({ name }) => { return name; }).includes(thisFolderArr[sambaIndex + 1])) {
          throw new Error("invalid path 1");
        }

        // 최상위 폴더의 인덱스를 설정하고, 해당 폴더의 ID를 찾습니다.
        thisRootIndex = sambaIndex + 1;
        thisRootId = rootFolders.find(({ name }) => { return name === thisFolderArr[thisRootIndex] }).id;

        // 체인 타겟을 최상위 폴더 다음의 경로로 설정합니다.
        chainTarget = thisFolderArr.slice(thisRootIndex + 1);

        finalId = null; // 최종 ID를 초기화합니다.
        if (chainTarget.length > 0) {
          // 폴더 체인에 따라 폴더 ID를 찾습니다.
          parentId = thisRootId;
          for (let folderName of chainTarget) {
            thisId = await drive.searchFolderId_inPython(folderName, parentId); // 폴더 ID를 찾기 위해 searchFolderId_inPython 메서드를 사용합니다.
            if (thisId === null) {
              throw new Error("invalid path 2"); // 유효하지 않은 경로인 경우 예외를 발생시킵니다.
            }
            parentId = thisId; // 현재 폴더의 ID를 부모 ID로 설정합니다.
          }

          finalId = thisId; // 최종 폴더 ID를 설정합니다.

        } else {
          finalId = thisRootId; // 체인 타겟이 없으면 최상위 폴더의 ID를 최종 ID로 설정합니다.
        }

        // 최종 폴더 ID가 null인 경우 예외를 발생시킵니다.
        if (finalId === null) {
          throw new Error("invalid path 3");
        }

        // 최종 폴더 ID를 JSON 형식으로 응답합니다.
        res.send(JSON.stringify({ id: finalId }));

      } catch (e) {
        // 오류가 발생하면 오류를 로깅하고, 오류 메시지를 JSON 형식으로 응답합니다.
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @route POST /findFileId
     * @description 지정된 부모 폴더 내에서 파일의 ID를 찾는 라우터입니다.
     * 클라이언트가 POST 요청으로 전달한 파일 이름과 부모 폴더 ID를 사용하여 해당 파일의 Google Drive ID를 반환합니다.
     * @param {Object} req - 클라이언트 요청 객체입니다.
     * @param {Object} res - 서버 응답 객체입니다.
     */
    router.post([ "/findFileId" ], async function (req, res) {
      // 응답 헤더를 설정하여 클라이언트와의 CORS(Cross-Origin Resource Sharing) 문제를 해결합니다.
      res.set({
        "Content-Type": "application/json", // 응답의 콘텐츠 타입을 JSON으로 설정합니다.
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정합니다.
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 설정합니다.
      });

      try {
        // 요청 본문에 parent(부모 폴더 ID)와 name(파일 이름)이 정의되지 않았을 경우 예외를 발생시킵니다.
        if (req.body.parent === undefined || req.body.name === undefined) {
          throw new Error("invalid post"); // 유효하지 않은 POST 요청에 대한 오류 메시지.
        }

        const { name, parent } = req.body; // 요청 본문에서 파일 이름(name)과 부모 폴더 ID(parent)를 추출합니다.
        
        // Google Drive에서 파일 ID를 검색하기 위해 searchFileId_inPython 메서드를 호출합니다.
        const finalId = await drive.searchFileId_inPython(name, parent);

        // 파일 ID가 null인 경우, 파일을 찾을 수 없음을 알리는 예외를 발생시킵니다.
        if (finalId === null) {
          throw new Error("cannot found");
        }

        // 찾은 파일 ID를 JSON 형식으로 응답합니다.
        res.send(JSON.stringify({ id: finalId }));

      } catch (e) {
        // 오류가 발생하면 오류를 로깅하고, 오류 메시지를 JSON 형식으로 응답합니다.
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @route POST /getPathFromId
     * @description Google Drive 파일 또는 폴더 ID를 경로로 변환하는 라우터입니다.
     * 클라이언트가 POST 요청으로 전달한 ID를 사용하여 해당 파일 또는 폴더의 경로를 반환합니다.
     * @param {Object} req - 클라이언트 요청 객체입니다.
     * @param {Object} res - 서버 응답 객체입니다.
     */
    router.post([ "/getPathFromId" ], async function (req, res) {
      // 응답 헤더를 설정하여 클라이언트와의 CORS(Cross-Origin Resource Sharing) 문제를 해결합니다.
      res.set({
        "Content-Type": "application/json", // 응답의 콘텐츠 타입을 JSON으로 설정합니다.
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정합니다.
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 설정합니다.
      });

      try {
        // 요청 본문에 id가 정의되지 않았을 경우 예외를 발생시킵니다.
        if (req.body.id === undefined) {
          throw new Error("invalid post"); // 유효하지 않은 POST 요청에 대한 오류 메시지.
        }

        const { id } = req.body; // 요청 본문에서 ID를 추출합니다.
        let resultObj; // ID에 해당하는 파일 또는 폴더 정보를 저장할 객체입니다.

        // Google Drive에서 파일 또는 폴더 정보를 가져오기 위해 get_targetInfo_inPython 메서드를 호출합니다.
        resultObj = await drive.get_targetInfo_inPython(id);
        
        // 반환된 객체가 null인 경우, 유효하지 않은 ID임을 알리는 예외를 발생시킵니다.
        if (resultObj === null) {
          throw new Error("invalid id");
        }

        // 가져온 정보를 바탕으로 경로를 생성하여 JSON 형식으로 응답합니다.
        res.send(JSON.stringify({ path: sambaToken + "/" + sambaKeyword + resultObj.absolute }));

      } catch (e) {
        // 오류가 발생하면 오류를 로깅하고, 오류 메시지를 JSON 형식으로 응답합니다.
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @route POST /moveFiles
     * @description 파일을 지정된 폴더로 이동하는 라우터입니다.
     * 클라이언트가 POST 요청으로 전달한 파일 경로 목록을 지정된 폴더로 이동시킵니다.
     * @param {Object} req - 클라이언트 요청 객체입니다.
     * @param {Object} res - 서버 응답 객체입니다.
     */
    router.post([ "/moveFiles" ], async function (req, res) {
      // 응답 헤더를 설정하여 클라이언트와의 CORS(Cross-Origin Resource Sharing) 문제를 해결합니다.
      res.set({
        "Content-Type": "application/json", // 응답의 콘텐츠 타입을 JSON으로 설정합니다.
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정합니다.
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 설정합니다.
      });

      try {
        // 요청 본문에 fromItems(이동할 파일 목록)과 toFolder(이동할 폴더)가 정의되지 않았을 경우 예외를 발생시킵니다.
        if (req.body.fromItems === undefined || req.body.toFolder === undefined) {
          throw new Error("invalid post"); // 유효하지 않은 POST 요청에 대한 오류 메시지.
        }

        // equalJson 메서드를 사용하여 요청 본문을 깊은 복사한 후, fromItems와 toFolder를 추출합니다.
        const { fromItems, toFolder } = equalJson(req.body);

        // fromItems가 배열이 아니거나 toFolder가 문자열이 아닌 경우 예외를 발생시킵니다.
        if (!Array.isArray(fromItems) || typeof toFolder !== "string") {
          throw new Error("invalid post 2"); // 유효하지 않은 데이터 형식에 대한 오류 메시지.
        }

        // fromItems의 모든 항목이 문자열인지 확인합니다. 그렇지 않은 경우 예외를 발생시킵니다.
        if (!fromItems.every((str) => { return typeof str === "string" })) {
          throw new Error("invalid post 3"); // 유효하지 않은 항목에 대한 오류 메시지.
        }

        let target; // 각 파일의 실제 경로를 저장할 변수입니다.
        let toTarget; // 이동할 대상 폴더의 실제 경로를 저장할 변수입니다.

        // 이동할 폴더의 경로에서 시작과 끝에 있는 슬래시를 제거합니다.
        toTarget = toFolder.replace(/^\//i, '').replace(/\/$/i, '');

        // 경로가 빈 문자열일 경우 기본 경로인 sambaToken을 설정합니다.
        if (toTarget.trim() === '') {
          toTarget = sambaToken;
        }

        // 경로가 '__'로 시작하지 않으면 sambaToken을 경로 앞에 추가합니다.
        if (!/^__/.test(toTarget)) {
          toTarget = sambaToken + "/" + toTarget;
        }

        // 이동할 대상 폴더 경로에서 sambaToken을 실제 파일 경로로 변환합니다.
        toTarget = toTarget.replace(/__samba__/gi, staticConst);

        // 이동할 각 파일 경로에 대해 반복문을 실행합니다.
        for (let str of fromItems) {
          // 파일 경로에서 시작과 끝에 있는 슬래시를 제거합니다.
          target = str.replace(/^\//i, '').replace(/\/$/i, '');

          // 경로가 빈 문자열일 경우 기본 경로인 sambaToken을 설정합니다.
          if (target.trim() === '') {
            target = sambaToken;
          }

          // 경로가 '__'로 시작하지 않으면 sambaToken을 경로 앞에 추가합니다.
          if (!/^__/.test(target)) {
            target = sambaToken + "/" + target;
          }

          // 파일 경로에서 sambaToken을 실제 파일 경로로 변환합니다.
          target = target.replace(/__samba__/gi, staticConst);

          // shellExec 메서드를 사용하여 파일을 지정된 폴더로 이동합니다.
          await shellExec("mv", [ target, toTarget + "/" ]);
        }

        // 파일 이동 작업이 완료되면 성공 메시지를 JSON 형식으로 응답합니다.
        res.send(JSON.stringify({ message: "success" }));

      } catch (e) {
        // 오류가 발생하면 오류를 로깅하고, 오류 메시지를 JSON 형식으로 응답합니다.
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @route POST /createNewSheets
     * @description 새로운 Google Sheets 문서를 생성하는 라우터입니다.
     * 클라이언트가 POST 요청으로 전달한 문서 이름과 부모 폴더 ID를 사용하여 Google Sheets 문서를 생성합니다.
     * @param {Object} req - 클라이언트 요청 객체입니다.
     * @param {Object} res - 서버 응답 객체입니다.
     */
    router.post([ "/createNewSheets" ], async function (req, res) {
      // 응답 헤더를 설정하여 클라이언트와의 CORS(Cross-Origin Resource Sharing) 문제를 해결합니다.
      res.set({
        "Content-Type": "application/json", // 응답의 콘텐츠 타입을 JSON으로 설정합니다.
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정합니다.
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 설정합니다.
      });

      try {
        // 요청 본문에 name(새로 만들 문서 이름)과 parent(부모 폴더 ID)가 정의되지 않았을 경우 예외를 발생시킵니다.
        if (req.body.name === undefined || req.body.parent === undefined) {
          throw new Error("invalid post"); // 유효하지 않은 POST 요청에 대한 오류 메시지.
        }

        // equalJson 메서드를 사용하여 요청 본문을 깊은 복사한 후, name과 parent를 추출합니다.
        const { name, parent } = equalJson(req.body);

        let sheetsId; // 생성된 Google Sheets의 ID를 저장할 변수입니다.

        // Google Sheets 문서를 생성하기 위해 create_newSheets_inPython 메서드를 호출합니다.
        sheetsId = await sheets.create_newSheets_inPython(name, parent);

        // 성공 메시지와 함께 생성된 문서의 ID를 JSON 형식으로 응답합니다.
        res.send(JSON.stringify({ message: "success", sheetsId }));

      } catch (e) {
        // 오류가 발생하면 오류를 로깅하고, 오류 메시지를 JSON 형식으로 응답합니다.
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @route POST /createNewLinkFile
     * @description 새로운 링크 파일을 생성하는 라우터입니다.
     * 클라이언트가 POST 요청으로 전달한 링크와 파일 이름, 부모 폴더를 사용하여 링크 파일을 생성합니다.
     * @param {Object} req - 클라이언트 요청 객체입니다.
     * @param {Object} res - 서버 응답 객체입니다.
     */
    router.post([ "/createNewLinkFile" ], async function (req, res) {
      // 응답 헤더를 설정하여 클라이언트와의 CORS(Cross-Origin Resource Sharing) 문제를 해결합니다.
      res.set({
        "Content-Type": "application/json", // 응답의 콘텐츠 타입을 JSON으로 설정합니다.
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정합니다.
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 설정합니다.
      });

      try {
        // 요청 본문에 name(파일 이름), parent(부모 폴더), link(링크)가 정의되지 않았을 경우 예외를 발생시킵니다.
        if (req.body.name === undefined || req.body.parent === undefined || req.body.link === undefined) {
          throw new Error("invalid post"); // 유효하지 않은 POST 요청에 대한 오류 메시지.
        }

        // equalJson 메서드를 사용하여 요청 본문을 깊은 복사한 후, name, parent, link를 추출합니다.
        const { name, parent, link } = equalJson(req.body);
        let json; // 링크 정보를 저장할 JSON 객체입니다.
        let target; // 부모 폴더의 실제 경로를 저장할 변수입니다.

        // 부모 폴더 경로에서 시작과 끝에 있는 슬래시를 제거합니다.
        target = parent.replace(/^\//i, '').replace(/\/$/i, '');

        // 경로가 빈 문자열일 경우 기본 경로인 sambaToken을 설정합니다.
        if (target.trim() === '') {
          target = sambaToken;
        }

        // 경로가 '__'로 시작하지 않으면 sambaToken을 경로 앞에 추가합니다.
        if (!/^__/.test(target)) {
          target = sambaToken + "/" + target;
        }

        // 부모 폴더 경로에서 sambaToken을 실제 파일 경로로 변환합니다.
        target = target.replace(new RegExp(sambaToken, "gi"), staticConst);

        // 링크 정보를 JSON 형식으로 변환합니다.
        json = {
          url: stringToLink(link), // 링크를 URL 형식으로 변환합니다.
          hex: Buffer.from(link, "utf8").toString("hex"), // 링크를 헥사(16진수) 형식으로 변환하여 저장합니다.
        };

        // 파일 시스템에 JSON 데이터를 기록하여 링크 파일을 생성합니다.
        await fileSystem(`writeJson`, [ target + "/" + name + ".link", json ]);

        // 성공 메시지를 JSON 형식으로 응답합니다.
        res.send(JSON.stringify({ message: "success" }));

      } catch (e) {
        // 오류가 발생하면 오류를 로깅하고, 오류 메시지를 JSON 형식으로 응답합니다.
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @route POST /renameTargets
     * @description 여러 파일 또는 폴더의 이름을 변경하는 라우터입니다.
     * 클라이언트가 POST 요청으로 전달한 원본 경로와 변경할 경로를 사용하여 파일 또는 폴더의 이름을 변경합니다.
     * @param {Object} req - 클라이언트 요청 객체입니다.
     * @param {Object} res - 서버 응답 객체입니다.
     */
    router.post([ "/renameTargets" ], async function (req, res) {
      // 응답 헤더를 설정하여 클라이언트와의 CORS(Cross-Origin Resource Sharing) 문제를 해결합니다.
      res.set({
        "Content-Type": "application/json", // 응답의 콘텐츠 타입을 JSON으로 설정합니다.
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정합니다.
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 설정합니다.
      });

      try {
        // 요청 본문에 from(원본 경로 목록)과 to(변경할 경로 목록)가 정의되지 않았을 경우 예외를 발생시킵니다.
        if (req.body.from === undefined || req.body.to === undefined) {
          throw new Error("invalid post"); // 유효하지 않은 POST 요청에 대한 오류 메시지.
        }

        // equalJson 메서드를 사용하여 요청 본문을 깊은 복사한 후, from과 to를 추출합니다.
        const { from, to } = equalJson(req.body);

        // from과 to가 배열인지 확인하고, 그렇지 않은 경우 예외를 발생시킵니다.
        if (!Array.isArray(from) || !Array.isArray(to)) {
          throw new Error("invalid post"); // 유효하지 않은 데이터 형식에 대한 오류 메시지.
        }

        let finalFrom = []; // 최종 원본 경로 목록을 저장할 배열입니다.
        let finalTo = []; // 최종 변경 경로 목록을 저장할 배열입니다.

        // 원본 경로 목록을 처리하여 최종 경로로 변환합니다.
        for (let target of from) {
          if (typeof target !== "string") {
            throw new Error("invalid post"); // 유효하지 않은 경로 형식에 대한 오류 메시지.
          }
          // 경로의 시작과 끝에 있는 슬래시를 제거합니다.
          target = target.replace(/^\//i, '').replace(/\/$/i, '');
          // 경로가 빈 문자열일 경우 기본 경로인 "__samba__"로 설정합니다.
          if (target.trim() === '') {
            target = "__samba__";
          }
          // 경로가 "__"로 시작하지 않으면 "__samba__"를 경로 앞에 추가합니다.
          if (!/^__/.test(target)) {
            target = "__samba__" + "/" + target;
          }
          // "__samba__" 토큰을 실제 파일 경로로 변환합니다.
          target = target.replace(/__samba__/gi, staticConst);
          finalFrom.push(target); // 최종 경로를 배열에 추가합니다.
        }

        // 변경할 경로 목록을 처리하여 최종 경로로 변환합니다.
        for (let target of to) {
          if (typeof target !== "string") {
            throw new Error("invalid post"); // 유효하지 않은 경로 형식에 대한 오류 메시지.
          }
          // 경로의 시작과 끝에 있는 슬래시를 제거합니다.
          target = target.replace(/^\//i, '').replace(/\/$/i, '');
          // 경로가 빈 문자열일 경우 기본 경로인 "__samba__"로 설정합니다.
          if (target.trim() === '') {
            target = "__samba__";
          }
          // 경로가 "__"로 시작하지 않으면 "__samba__"를 경로 앞에 추가합니다.
          if (!/^__/.test(target)) {
            target = "__samba__" + "/" + target;
          }
          // "__samba__" 토큰을 실제 파일 경로로 변환합니다.
          target = target.replace(/__samba__/gi, staticConst);
          finalTo.push(target); // 최종 경로를 배열에 추가합니다.
        }

        // 원본 경로와 변경 경로의 길이가 동일하지 않으면 예외를 발생시킵니다.
        if (finalFrom.length !== finalTo.length) {
          throw new Error("invalid post"); // 경로 길이가 일치하지 않는 경우의 오류 메시지.
        }

        // 각 파일 또는 폴더를 이동하여 이름을 변경합니다.
        for (let i = 0; i < finalFrom.length; i++) {
          await shellExec("mv", [ finalFrom[i], finalTo[i] ]); // shellExec 메서드를 사용하여 이름을 변경합니다.
        }

        // 이름 변경 작업이 완료되면 성공 메시지를 JSON 형식으로 응답합니다.
        res.send(JSON.stringify({ message: "succcess" }));

      } catch (e) {
        // 오류가 발생하면 오류를 로깅하고, 오류 메시지를 JSON 형식으로 응답합니다.
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @route POST /generalFileUpload
     * @description 일반 파일을 업로드하는 라우터입니다.
     * 클라이언트가 업로드한 파일을 지정된 경로에 저장합니다.
     * @param {Object} req - 클라이언트 요청 객체입니다.
     * @param {Object} res - 서버 응답 객체입니다.
     */
    router.post([ "/generalFileUpload" ], async function (req, res) {
      // 응답 헤더를 설정하여 클라이언트와의 CORS(Cross-Origin Resource Sharing) 문제를 해결합니다.
      res.set({
        "Content-Type": "application/json", // 응답의 콘텐츠 타입을 JSON으로 설정합니다.
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정합니다.
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 설정합니다.
      });

      try {
        // formidable 객체를 생성하여 파일 업로드를 처리합니다. 여러 파일을 허용하고, 최대 파일 크기를 설정합니다.
        const form = instance.formidable({ multiples: true, encoding: "utf-8", maxFileSize: (9000 * 1024 * 1024) });

        // form.parse 메서드를 사용하여 요청(req)에서 파일과 필드를 파싱합니다.
        form.parse(req, async function (err, fields, files) {
          try {
            if (err) {
              throw new Error(err); // 파싱 중 오류가 발생하면 예외를 발생시킵니다.
            } else {
              // toArr는 업로드된 파일이 저장될 경로 배열입니다.
              const toArr = JSON.parse(fields.toArr).map((path) => { return hangul.fixString(path); });

              let filesKey, fromArr, num;
              let tempArr, tempString, tempDir;
              let thisFileName;
              let thisFileExe;

              // 업로드된 파일의 키를 가져와 정렬합니다.
              filesKey = Object.keys(files);
              filesKey.sort((a, b) => {
                return Number(a.replace(/[^0-9]/gi, '')) - Number(b.replace(/[^0-9]/gi, ''));
              });

              // fromArr 배열에 업로드된 파일 경로를 저장합니다.
              fromArr = [];
              for (let key of filesKey) {
                fromArr.push(files[key]);
              }

              num = 0; // 업로드된 파일의 인덱스를 나타냅니다.
              for (let { filepath: path } of fromArr) {
                // toArr 배열에서 현재 파일의 경로를 추출합니다.
                tempArr = toArr[num].split("/");
                thisFileName = tempArr[tempArr.length - 1]; // 파일 이름을 추출합니다.
                thisFileExe = thisFileName.split(".")[thisFileName.split(".").length - 1]; // 파일 확장자를 추출합니다.
                tempString = staticConst; // 파일을 저장할 기본 경로입니다.

                if (tempArr.length === 0) {
                  throw new Error("invalid to array"); // 경로 배열이 유효하지 않으면 예외를 발생시킵니다.
                }

                // 경로에 있는 각 디렉토리를 생성합니다.
                for (let i = 0; i < tempArr.length - 1; i++) {
                  tempDir = await fileSystem(`readDir`, [ tempString ]);
                  if (!tempDir.includes(tempArr[i]) && tempArr[i] !== "") {
                    await shellExec(`mkdir ${shellLink(tempString + "/" + tempArr[i])}`);
                  }
                  tempString += '/';
                  tempString += tempArr[i];
                }

                // 파일을 임시 폴더에 이동한 후, 지정된 경로로 복사합니다.
                await shellExec("mv", [ path, osTempFolder + "/" + thisFileName ]);
                await shellExec("cp", [ osTempFolder + "/" + thisFileName, tempString + "/" ]);
                await shellExec(`rm`, [ `-rf`, osTempFolder + "/" + thisFileName ]); // 임시 폴더에서 파일을 삭제합니다.

                num++; // 다음 파일로 넘어갑니다.
              }

              // 모든 파일이 업로드되었으면 성공 메시지를 반환합니다.
              res.send(JSON.stringify({ "message": "done" }));
            }
          } catch (e) {
            // 업로드 중 오류가 발생하면 오류를 로깅하고, 오류 메시지를 반환합니다.
            logger.error(e, req).catch((e) => { console.log(e); });
            res.send(JSON.stringify({ message: "error : " + e.message }));
          }
        });
      } catch (e) {
        // 오류가 발생하면 오류를 로깅하고, 오류 메시지를 반환합니다.
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @route POST /makeFolder
     * @description 지정된 경로에 새로운 폴더를 생성하는 라우터입니다.
     * 클라이언트가 POST 요청으로 전달한 경로를 기준으로 폴더를 생성하고, 생성된 폴더 목록을 반환합니다.
     * @param {Object} req - 클라이언트 요청 객체입니다.
     * @param {Object} res - 서버 응답 객체입니다.
     */
    router.post([ "/makeFolder" ], async function (req, res) {
      // 응답 헤더를 설정하여 클라이언트와의 CORS(Cross-Origin Resource Sharing) 문제를 해결합니다.
      res.set({
        "Content-Type": "application/json", // 응답의 콘텐츠 타입을 JSON으로 설정합니다.
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정합니다.
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 설정합니다.
      });

      try {
        // 요청 본문에 path가 정의되지 않았을 경우 예외를 발생시킵니다.
        if (req.body.path === undefined) {
          throw new Error("invalid post"); // 유효하지 않은 POST 요청에 대한 오류 메시지.
        }

        let target; // 폴더 생성 대상 경로를 저장할 변수입니다.
        let targetList; // 경로를 분할하여 폴더 이름 목록을 저장할 배열입니다.
        let tempString; // 현재 작업 중인 경로를 저장할 변수입니다.
        let tempDir; // 현재 경로에 존재하는 디렉토리 목록을 저장할 변수입니다.
        let target2; // 폴더 목록을 조회할 경로를 저장할 변수입니다.
        let folderList; // 생성된 폴더 목록을 저장할 변수입니다.

        // 전달된 경로에서 시작과 끝에 있는 슬래시를 제거합니다.
        target = req.body.path.replace(/^\//i, '').replace(/\/$/i, '');

        // 경로가 빈 문자열일 경우 기본 경로인 sambaToken을 설정합니다.
        if (target.trim() === '') {
          target = sambaToken;
        }

        // 경로가 '__'로 시작하지 않으면 sambaToken을 경로 앞에 추가합니다.
        if (!/^__/.test(target)) {
          target = sambaToken + "/" + target;
        }

        // sambaToken을 제거하여 실제 경로를 설정합니다.
        target = target.replace(new RegExp(sambaToken, "gi"), '');

        // 경로를 '/'로 분할하여 폴더 이름 목록을 생성합니다.
        targetList = target.split("/");
        tempString = staticConst; // 기본 경로를 설정합니다.

        // 각 폴더 이름을 확인하고, 존재하지 않으면 폴더를 생성합니다.
        for (let i = 0; i < targetList.length; i++) {
          tempDir = await fileSystem(`readDir`, [ tempString ]);
          if (!tempDir.includes(targetList[i]) && targetList[i] !== "") {
            await shellExec(`mkdir ${shellLink(tempString + "/" + targetList[i])}`);
          }
          tempString += '/';
          tempString += targetList[i];
        }

        // 생성된 폴더 목록을 조회하기 위한 경로를 설정합니다.
        target2 = req.body.path.replace(/^\//i, '').replace(/\/$/i, '');

        // 경로가 빈 문자열일 경우 기본 경로인 sambaToken을 설정합니다.
        if (target2.trim() === '') {
          target2 = sambaToken;
        }

        // 경로가 '__'로 시작하지 않으면 sambaToken을 경로 앞에 추가합니다.
        if (!/^__/.test(target2)) {
          target2 = sambaToken + "/" + target2;
        }

        // sambaToken을 제거하여 실제 경로를 설정합니다.
        target2 = target2.replace(new RegExp(sambaToken, "gi"), staticConst);

        // 생성된 폴더의 목록을 조회합니다.
        folderList = await fileSystem(`readFolder`, [ target2 ]);

        // 생성된 폴더 목록과 함께 성공 메시지를 반환합니다.
        res.send(JSON.stringify({ message: "done", list: folderList }));

      } catch (e) {
        // 오류가 발생하면 오류를 로깅하고, 오류 메시지를 JSON 형식으로 응답합니다.
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @route POST /zipPhoto
     * @description 특정 프로젝트에 대한 사진을 ZIP 파일로 압축하는 라우터입니다.
     * 클라이언트가 제공한 프로젝트 ID와 사진 ID를 사용하여 사진을 ZIP 파일로 압축하고, 해당 파일의 정보를 반환합니다.
     * @param {Object} req - 클라이언트 요청 객체입니다.
     * @param {Object} res - 서버 응답 객체입니다.
     */
    router.post([ "/zipPhoto" ], async function (req, res) {
      // 응답 헤더를 설정하여 클라이언트와의 CORS(Cross-Origin Resource Sharing) 문제를 해결합니다.
      res.set({
        "Content-Type": "application/json", // 응답의 콘텐츠 타입을 JSON으로 설정합니다.
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정합니다.
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 설정합니다.
      });

      try {
        // 요청 본문에 pid(사진 ID)와 proid(프로젝트 ID)가 정의되지 않았을 경우 예외를 발생시킵니다.
        if (req.body.pid === undefined || req.body.proid === undefined) {
          throw new Error("invalid post"); // 유효하지 않은 POST 요청에 대한 오류 메시지.
        }

        const targetFolderId = "1rSIKIL-jjmXU-D2Zdmf9ElXFmH2Htycl"; // 대상 폴더 ID를 정의합니다.
        const { pid, proid } = req.body; // 요청 본문에서 pid와 proid를 추출합니다.
        const c780 = "780"; // 사진 크기를 나타내는 상수입니다.
        const c1500 = "1500"; // 사진 크기를 나타내는 상수입니다.
        const c3508 = pid; // pid를 기반으로 한 상수입니다.
        const splitToken = "__split__"; // 파일 이름을 구분하기 위한 토큰입니다.
        const targetDir = staticConst + homeliaisonOfficeConst + "/" + designerPhotoConst; // 사진이 저장된 디렉토리 경로를 정의합니다.
        const list = await fileSystem(`readDir`, [ targetDir ]); // 대상 디렉토리의 파일 목록을 읽습니다.
        const homeFolder = await fileSystem(`readDir`, [ process.env.HOME ]); // 홈 디렉토리의 파일 목록을 읽습니다.
        const tempFolderName = "temp"; // 임시 폴더 이름을 정의합니다.
        let folderName; // 대상 폴더 이름을 저장할 변수입니다.
        let shareClientName, shareDesignerName; // 공유할 ZIP 파일 이름을 저장할 변수입니다.
        let tempArr; // 폴더 이름을 분할하여 저장할 배열입니다.
        let command; // 쉘 명령어를 저장할 변수입니다.
        let zipIdClient, zipIdDesigner; // 클라이언트와 디자이너를 위한 ZIP 파일 ID를 저장할 변수입니다.
        let zipLinkClient, zipLinkDesigner; // 클라이언트와 디자이너를 위한 ZIP 파일 링크를 저장할 변수입니다.
        let commands; // 실행할 명령어를 저장할 변수입니다.
        let safeNum0, safeNum1; // 안전성을 위한 숫자 변수입니다.

        // 홈 디렉토리에 임시 폴더가 없으면 생성합니다.
        if (!homeFolder.includes(tempFolderName)) {
          await shellExec(`mkdir`, [ `${process.env.HOME}/${tempFolderName}` ]);
        }

        // pid로 시작하는 폴더 이름을 찾습니다.
        folderName = list.find((i) => { return (new RegExp('^' + pid)).test(i); });
        tempArr = folderName.split('_'); // 폴더 이름을 '_'로 분할합니다.
        
        // 클라이언트와 디자이너를 위한 ZIP 파일 이름을 생성합니다.
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
          throw new Error("invalid post"); // 유효하지 않은 폴더 이름 형식에 대한 오류 메시지.
        }
        
        // ZIP 파일 이름에 날짜를 추가합니다.
        shareClientName += '_' + dateToString(new Date()).slice(2).replace(/\-/gi, '') + ".zip";
        shareDesignerName += '_' + dateToString(new Date()).slice(2).replace(/\-/gi, '') + ".zip";

        commands = ""; // 명령어 문자열을 초기화합니다.
        if (proid.trim() !== "") {
          commands += `cd ${shellLink(targetDir)}/${shellLink(folderName)}/${shellLink(c3508)};`; // 대상 디렉토리로 이동합니다.
          commands += `zip ${shellLink(staticConst)}/corePortfolio/rawImage/${proid}${splitToken}${shellLink(c3508)}.zip ./*;`; // ZIP 파일을 생성합니다.
          await shellExec(commands); // 명령어를 실행합니다.
        }

        // 성공 메시지를 JSON 형식으로 응답합니다.
        res.send(JSON.stringify({ message: "done" }));

      } catch (e) {
        // 오류가 발생하면 오류를 로깅하고, 오류 메시지를 JSON 형식으로 응답합니다.
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @route POST /designerFolder
     * @description 디자이너 폴더를 생성하고 관리하는 라우터입니다.
     * 클라이언트가 디자이너의 폴더를 생성하거나 기존 폴더의 정리 작업을 수행할 수 있습니다.
     * @param {Object} req - 클라이언트 요청 객체입니다.
     * @param {Object} res - 서버 응답 객체입니다.
     */
    router.post([ "/designerFolder" ], async function (req, res) {
      // 응답 헤더를 설정하여 클라이언트와의 CORS(Cross-Origin Resource Sharing) 문제를 해결합니다.
      res.set({
        "Content-Type": "application/json", // 응답의 콘텐츠 타입을 JSON으로 설정합니다.
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정합니다.
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 설정합니다.
      });

      try {
        const designerFolderId = "18PiKz57MQd8VgETd3hqp_cA-MNAXPquN"; // Google Drive 상의 디자이너 폴더 ID입니다.
        const sambaDir = staticConst + homeliaisonOfficeConst + "/" + designerFolderConst + "/" + designerFolderConst2; // Samba 서버 상의 디자이너 폴더 경로입니다.
        const basicList = [
          "포트폴리오",
          "등록서류",
          "제안문서",
          "첫등록",
          "경력관련",
          "계약서",
          "기타",
        ]; // 기본적으로 생성될 서브 폴더 목록입니다.
        let folderName; // 새로 생성할 폴더의 이름을 저장할 변수입니다.
        let folderId; // Google Drive 상의 폴더 ID를 저장할 변수입니다.
        let num; // 재시도 횟수를 저장할 변수입니다.
        let folderList; // Samba 서버 상의 폴더 목록을 저장할 변수입니다.
        let thisFolderList; // 현재 폴더의 서브 폴더 목록을 저장할 변수입니다.
        let mvTarget; // 이동 대상 파일 또는 폴더 목록을 저장할 변수입니다.
        let mkdirTarget; // 생성할 서브 폴더 목록을 저장할 변수입니다.
        let rmTarget; // 삭제할 대상 파일 또는 폴더 목록을 저장할 변수입니다.

        // 요청 본문에 name과 subid가 정의되지 않은 경우, 기존 폴더를 정리하는 작업을 수행합니다.
        if (req.body.name === undefined || req.body.subid === undefined) {
          // Samba 서버에서 디자이너 폴더 목록을 가져옵니다.
          folderList = (await fileSystem(`readDir`, [ sambaDir ])).filter((str) => { return !/DS_Store/g.test(str) });

          // 각 폴더에 대해 서브 폴더를 정리합니다.
          for (let thisFolderName of folderList) {
            thisFolderList = (await fileSystem(`readDir`, [ sambaDir + "/" + thisFolderName ])).filter((str) => {
              return !/DS_Store/g.test(str);
            }).filter((str) => {
              return !/gddoc$/i.test(str);
            });

            mvTarget = []; // 이동 대상 목록을 초기화합니다.
            for (let s of thisFolderList) {
              if (!basicList.includes(s)) {
                mvTarget.push(s); // 기본 목록에 포함되지 않은 항목을 이동 대상에 추가합니다.
              }
            }

            // 이동 대상 폴더를 정해진 서브 폴더로 이동합니다.
            for (let s of mvTarget) {
              if (/제안문서/gi.test(s)) {
                await shellExec(`mv ${shellLink(sambaDir + "/" + thisFolderName + "/" + s)} ${shellLink(sambaDir + "/" + thisFolderName + "/" + "제안문서")}`);
              } else if (/첫/gi.test(s)) {
                await shellExec(`mv ${shellLink(sambaDir + "/" + thisFolderName + "/" + s)} ${shellLink(sambaDir + "/" + thisFolderName + "/" + "첫등록")}`);
              }
            }

            // 현재 폴더의 서브 폴더 목록을 다시 가져옵니다.
            thisFolderList = (await fileSystem(`readDir`, [ sambaDir + "/" + thisFolderName ])).filter((str) => {
              return !/DS_Store/g.test(str);
            }).filter((str) => {
              return !/gddoc$/i.test(str);
            });

            mkdirTarget = []; // 생성할 서브 폴더 목록을 초기화합니다.
            for (let s of basicList) {
              if (!thisFolderList.includes(s)) {
                mkdirTarget.push(s); // 기본 목록에 포함된 항목이 없는 경우 생성할 대상으로 추가합니다.
              }
            }

            // 필요한 서브 폴더를 생성합니다.
            for (let s of mkdirTarget) {
              await shellExec(`mkdir ${shellLink(sambaDir + "/" + thisFolderName + "/" + s)}`);
            }

            // 마지막으로 삭제할 파일 또는 폴더를 확인하여 제거할 준비를 합니다.
            thisFolderList = (await fileSystem(`readDir`, [ sambaDir + "/" + thisFolderName ])).filter((str) => {
              return !/DS_Store/g.test(str);
            }).filter((str) => {
              return !/gddoc$/i.test(str);
            });

            rmTarget = [];
            for (let s of thisFolderList) {
              if (!basicList.includes(s)) {
                rmTarget.push(s);
              }
            }

            // 삭제할 대상이 있을 경우, 안전하게 제거합니다.
            for (let s of rmTarget) {
              await sleep(1000); // 삭제 작업 전 1초 대기하여 시스템 부하를 방지합니다.
            }
          }

          // 모든 작업이 완료되면 성공 메시지를 반환합니다.
          res.send(JSON.stringify({ message: "done" }));

        } else {
          // 새로운 폴더를 생성하고 관리하는 작업을 수행합니다.
          folderName = req.body.subid + "_" + req.body.name;

          // Google Drive에서 새로운 폴더를 생성하고, 해당 폴더를 지정된 위치로 이동합니다.
          folderId = await drive.makeFolder_inPython(folderName);
          await drive.moveFolder_inPython(folderId, designerFolderId);

          await sleep(2000); // 폴더 이동이 완료될 때까지 대기합니다.
          num = 0;
          // 폴더가 Samba 서버에 나타날 때까지 최대 10회 확인합니다.
          while ((!(await fileSystem(`exist`, [ `${sambaDir}/partnership/${folderName}` ]))) && (num < 10)) {
            await sleep(2000);
            num++;
          }

          // 폴더가 존재하는 경우, 기본 서브 폴더를 생성합니다.
          if (await fileSystem(`exist`, [ `${sambaDir}/partnership/${folderName}` ])) {
            for (let b of basicList) {
              if (!(await fileSystem(`exist`, [ `${sambaDir}/partnership/${folderName}/${b}` ]))) {
                await fileSystem(`mkdir`, [ `${sambaDir}/partnership/${folderName}/${b}` ]);
              }
            }
          }

          // 폴더 이름과 Google Drive 링크를 포함한 성공 메시지를 반환합니다.
          res.send(JSON.stringify({
            folderName: folderName,
            drive: `https://drive.google.com/drive/folders/${folderId}`,
            docs: "",
          }));
        }
      } catch (e) {
        // 오류가 발생하면 오류를 로깅하고, 오류 메시지를 JSON 형식으로 응답합니다.
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @route POST /recordBackup
     * @description Centrex 시스템에서 통화 녹취 파일을 백업하고, 백업 후 해당 파일을 삭제하는 라우터입니다.
     * 클라이언트가 이 엔드포인트를 호출하면 Centrex 시스템에 접근하여 통화 녹취 파일을 다운로드하고, 로컬 시스템에 저장한 후 Centrex 시스템에서 파일을 삭제합니다.
     * @param {Object} req - 클라이언트 요청 객체입니다.
     * @param {Object} res - 서버 응답 객체입니다.
     */
    router.post([ "/recordBackup" ], async function (req, res) {
      // 응답 헤더를 설정하여 클라이언트와의 CORS(Cross-Origin Resource Sharing) 문제를 해결합니다.
      res.set({
        "Content-Type": "application/json", // 응답의 콘텐츠 타입을 JSON으로 설정합니다.
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정합니다.
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 설정합니다.
      });

      try {
        // Centrex 시스템 접근에 필요한 설정 값을 정의합니다.
        const { host, sessionConst, sessionValue } = centrex;
        const storeMother = staticConst + homeliaisonOfficeConst + "/통화녹취파일"; // 통화 녹취 파일을 저장할 로컬 디렉토리 경로입니다.

        // 통화 녹취 파일을 백업하고 삭제하는 주요 함수입니다.
        const recordBackupExecute = async function () {
          // Centrex 시스템의 URL을 정의합니다.
          const urls = {
            init: "https://" + host + "/premium", // 초기 페이지 URL입니다.
            login: "https://" + host + "/premium/PHP/web_login.php", // 로그인 페이지 URL입니다.
            list: "https://" + host + "/premium/backoffice/record_list.html", // 녹취 파일 목록 페이지 URL입니다.
            delete: "https://" + host + "/premium/PHP/deleteRecordFile.php" // 녹취 파일 삭제 API URL입니다.
          };
          const splitToken = "__split__"; // URL을 분할하기 위한 토큰입니다.
          const tempFolder = process.cwd() + "/temp"; // 임시 폴더 경로를 정의합니다.
          
          try {
            // 로컬에 저장된 기존 녹취 파일 목록을 읽어옵니다.
            const storeMotherContents = (await fileSystem(`readDir`, [ storeMother ])).filter((str) => { return !/^\./.test(str); });
            const folderName = "records_" + dateToString(new Date()).replace(/\-/gi, '') + "_" + uniqueValue("string"); // 현재 날짜와 고유값으로 폴더 이름을 생성합니다.
            let url, res, dom, token, idsave, id, pass;
            let session; // 현재 세션 값을 저장할 변수입니다.
            let inputs; // HTML 폼의 입력 요소를 저장할 변수입니다.
            let postData; // POST 데이터 객체를 저장할 변수입니다.
            let trArr; // 테이블 행 요소를 저장할 배열입니다.
            let aNode, aArr; // 앵커 요소를 저장할 변수와 배열입니다.
            let pageNum; // 페이지 번호를 저장할 변수입니다.
            let totalLinks; // 모든 파일의 다운로드 링크를 저장할 배열입니다.
            let log; // 백업 로그를 저장할 객체입니다.
            let tempbinary; // 바이너리 데이터를 저장할 변수입니다.
            let storeTargets; // 로컬 저장소의 파일 타겟을 저장할 객체입니다.
            let downloadedFiles; // 다운로드된 파일 목록을 저장할 배열입니다.
            let errorBoo; // 오류 발생 여부를 저장할 불린 변수입니다.
            let safeNum; // 안전 실행 횟수를 저장할 변수입니다.

            session = sessionConst + "=" + sessionValue; // 세션 쿠키를 생성합니다.

            url = urls.list; // 녹취 파일 목록 페이지의 URL을 설정합니다.
            res = await requestSystem(url, {}, { method: "get", headers: { Cookie: session } }); // GET 요청으로 녹취 파일 목록을 가져옵니다.

            dom = new JSDOM(res.data); // 서버 응답 데이터를 DOM으로 변환합니다.
            inputs = dom.window.document.querySelector("form").children; // 폼 요소의 자식 입력 요소를 가져옵니다.
            postData = {}; // POST 데이터 객체를 초기화합니다.
            for (let input of inputs) {
              if (/INPUT/gi.test(input.nodeName)) {
                postData[input.getAttribute("name")] = input.getAttribute("value"); // 입력 요소의 이름과 값을 POST 데이터 객체에 저장합니다.
              }
            }

            pageNum = 0; // 페이지 번호를 초기화합니다.
            totalLinks = []; // 모든 파일의 다운로드 링크를 저장할 배열을 초기화합니다.
            do {
              pageNum++;
              postData.page = String(pageNum); // 페이지 번호를 POST 데이터에 설정합니다.
              res = await requestSystem(url, postData, { headers: { Cookie: session } }); // POST 요청으로 녹취 파일 목록의 특정 페이지를 가져옵니다.
              dom = new JSDOM(res.data); // 서버 응답 데이터를 DOM으로 변환합니다.
              trArr = [ ...dom.window.document.querySelector('.contents_area').querySelector('.table_type01').querySelectorAll('tr') ]; // 테이블 행 요소를 배열로 변환합니다.
              aArr = [];
              for (let tr of trArr) {
                aNode = tr.querySelector('a'); // 각 행에서 앵커 요소를 찾습니다.
                if (aNode !== null) {
                  aArr.push(aNode.getAttribute("href")); // 앵커 요소의 href 속성 값을 배열에 저장합니다.
                }
              }

              aArr = aArr.map((str) => { return str.trim(); }).filter((str) => { return str !== '#'; }).map((str) => {
                return str + splitToken + String(pageNum); // 링크와 페이지 번호를 결합하여 저장합니다.
              });
              totalLinks = totalLinks.concat(aArr); // 현재 페이지의 링크를 전체 링크 배열에 추가합니다.
            } while (aArr.length !== 0); // 페이지에 더 이상 링크가 없을 때까지 반복합니다.

            totalLinks = [ ...new Set(totalLinks) ].map((str) => {
              return urls.init + str.slice(2); // 링크에서 필요없는 부분을 제거하고 최종 링크를 생성합니다.
            }).map((link) => {
              let tempArr, tempArr1, obj, page;
              page = Number(link.split(splitToken)[1]); // 페이지 번호를 분리하여 저장합니다.
              link = link.split(splitToken)[0];
              tempArr = link.split('?');
              tempArr1 = tempArr[1].split('&').map((s) => { return s.split('='); });
              obj = {};
              for (let [ key, value ] of tempArr1) {
                obj[key] = value; // 링크의 쿼리스트링을 객체로 변환하여 저장합니다.
              }
              return { link, page, host: tempArr[0], data: obj }; // 링크와 페이지, 쿼리 데이터를 객체로 반환합니다.
            });

            log = {
              date: new Date(),
              length: totalLinks.length,
              records: totalLinks // 로그 객체에 다운로드할 링크 수와 링크 목록을 저장합니다.
            };

            await shellExec(`rm -rf ${shellLink(tempFolder)}/${folderName}`); // 임시 폴더에 동일한 이름의 폴더가 존재할 경우 삭제합니다.
            await shellExec(`mkdir ${shellLink(tempFolder)}/${folderName}`); // 새 폴더를 생성합니다.

            for (let i = 0; i < totalLinks.length; i++) {
              safeNum = 0; // 안전 실행 횟수를 초기화합니다.
              do {
                errorBoo = true;
                try {
                  // 바이너리 데이터를 요청하여 다운로드하고 파일로 저장합니다.
                  tempbinary = await binaryRequest(totalLinks[i].link, null, { headers: { Cookie: session } });
                  await fileSystem(`writeBinary`, [ `${process.cwd()}/temp/${folderName}/${totalLinks[i].data.filename}`, tempbinary ]);

                  // 다운로드 후 서버에서 파일을 삭제합니다.
                  postData.page = String(totalLinks[i].page);
                  postData["chk[]"] = totalLinks[i].data.filename.split('-')[0] + "|" + totalLinks[i].data.filename;
                  res = await requestSystem(urls.delete, postData, { headers: { Cookie: session } });

                  errorBoo = false; // 오류 없이 성공한 경우 플래그를 설정합니다.
                } catch (e) {
                  errorBoo = true; // 오류가 발생하면 다시 시도하도록 플래그를 설정합니다.
                }
                safeNum++;
              } while (errorBoo && safeNum <= 10); // 최대 10회 시도합니다.
            }

            // 로컬 저장소의 파일 타겟을 객체로 변환하여 저장합니다.
            storeTargets = {};
            for (let str of storeMotherContents) {
              storeTargets['p' + str.split('_')[0]] = str;
            }

            // 다운로드된 파일을 읽어와 로컬 저장소로 이동합니다.
            downloadedFiles = (await fileSystem(`readDir`, [ `${tempFolder}/${folderName}` ])).filter((str) => { return !/^\./.test(str); });
            downloadedFiles = downloadedFiles.map((str) => {
              return { target: 'p' + str.split('-')[0].replace(/^0/gi, '').replace(/^0/gi, ''), file: `${tempFolder}/${folderName}/${str}` };
            });

            for (let { target, file } of downloadedFiles) {
              if (typeof storeTargets[target] === "string") {
                await shellExec(`mv ${shellLink(file)} ${shellLink(storeMother + "/" + storeTargets[target])};`); // 대상 경로로 파일을 이동합니다.
              }
            }

            await shellExec(`rm -rf ${shellLink(tempFolder)}/${folderName};`); // 임시 폴더를 삭제합니다.

            return log; // 백업 로그를 반환합니다.

          } catch (e) {
            console.log(e);
            return false; // 오류 발생 시 false를 반환합니다.
          }
        }

        // 백업 작업을 반복적으로 수행하는 함수입니다.
        const backupFunc = async function () {
          try {
            let safeNum, log;
            safeNum = 0;
            do {
              log = await recordBackupExecute(); // 백업 작업을 실행합니다.
              safeNum++;
              if (safeNum > 20) { // 최대 20회 시도합니다.
                break;
              }
            } while (log === false);

            if (!log) {
              throw new Error("session expired"); // 세션이 만료된 경우 예외를 발생시킵니다.
            }

            await logger.cron("record backup and delete success"); // 백업 성공 로그를 기록합니다.
          } catch (e) {
            logger.error(e, req).catch((e) => { console.log(e); }); // 오류 발생 시 로그를 기록합니다.
          }
        }

        // 백업 작업을 비동기적으로 시작합니다.
        backupFunc().catch((err) => {
          logger.error(err, req).catch((e) => { console.log(e); });
        });

        res.send(JSON.stringify({ message: "will do" })); // 클라이언트에 백업 작업 시작을 알리는 메시지를 반환합니다.

      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); }); // 오류 발생 시 로그를 기록합니다.
        res.send(JSON.stringify({ message: "error : " + e.message })); // 오류 메시지를 클라이언트에 반환합니다.
      }
    });
    
    /**
     * @route POST /centrexSession
     * @description Centrex 시스템의 세션 유효성을 확인하는 라우터입니다. 
     * 클라이언트가 이 엔드포인트를 호출하면, Centrex 시스템에 접근하여 현재 세션이 유효한지 확인합니다. 
     * 만약 세션이 만료되었다면, 경고 알림을 발생시킵니다.
     * @param {Object} req - 클라이언트 요청 객체입니다.
     * @param {Object} res - 서버 응답 객체입니다.
     */
    router.post([ "/centrexSession" ], async function (req, res) {
      // 응답 헤더를 설정하여 클라이언트와의 CORS(Cross-Origin Resource Sharing) 문제를 해결합니다.
      res.set({
        "Content-Type": "application/json", // 응답의 콘텐츠 타입을 JSON으로 설정합니다.
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정합니다.
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 설정합니다.
      });

      try {
        // Centrex 시스템 접근에 필요한 설정 값을 정의합니다.
        const { host, sessionConst, sessionValue } = centrex;
        const url = "https://" + host + "/premium/backoffice/main.su.html"; // Centrex 시스템의 메인 페이지 URL입니다.

        // 세션 유효성을 확인하기 위한 특정 키워드를 정의합니다.
        const successKeyPoint = [
          ".onButton",
          "libgoff3",
          "MM_swapImgRestore",
          "MM_swapImage",
          "MM_preloadImages",
          "MM_findObj",
          "lgdacom_high.css",
          "info_box_bottom.gif",
          "btn_03_04",
          "popup_custom_coloring.html",
          "number_manage_list",
          "OVKEY",
          "popup_call.html",
          "popup_conference.html",
        ];

        let response, resultBoo;

        // Centrex 시스템에 GET 요청을 보내어 세션 유효성을 확인합니다.
        response = await requestSystem(url, {}, {
          method: "get",
          headers: {
            Cookie: sessionConst + "=" + sessionValue // 세션 쿠키를 요청 헤더에 포함합니다.
          }
        });

        // 응답 데이터에 유효성 검사를 위한 키워드들이 모두 포함되어 있는지 확인합니다.
        resultBoo = successKeyPoint.map((str) => { return new RegExp(str, "g"); }).every((re) => { return re.test(response.data) });
        if (!resultBoo) {
          // 세션이 만료되었을 경우 경고 알림을 발생시킵니다.
          logger.alert("centrex token expired").catch((err) => { console.log(err); });
        }

        // 유효성 검사가 완료되었음을 클라이언트에 알리는 메시지를 반환합니다.
        res.send(JSON.stringify({ message: "reload done" }));
      } catch (e) {
        // 오류가 발생하면 오류를 로깅하고, 오류 메시지를 클라이언트에 반환합니다.
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @route POST /mongoToJson
     * @description MongoDB 데이터베이스를 JSON 형식으로 백업하는 라우터입니다.
     * 클라이언트가 이 엔드포인트를 호출하면, 지정된 MongoDB 데이터베이스를 백업하고 해당 백업 파일을 압축한 후 원본 폴더를 삭제합니다.
     * @param {Object} req - 클라이언트 요청 객체입니다.
     * @param {Object} res - 서버 응답 객체입니다.
     */
    router.post([ "/mongoToJson" ], async function (req, res) {
      // 응답 헤더를 설정하여 클라이언트와의 CORS(Cross-Origin Resource Sharing) 문제를 해결합니다.
      res.set({
        "Content-Type": "application/json", // 응답의 콘텐츠 타입을 JSON으로 설정합니다.
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정합니다.
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 설정합니다.
      });

      try {
        // MongoDB 데이터를 JSON 형식으로 백업하는 함수입니다.
        const mongoToJsonFunction = async function () {
          try {
            const today = new Date(); // 현재 날짜와 시간을 가져옵니다.
            const backFolderName = "backup"; // 백업 파일을 저장할 폴더 이름입니다.
            const mongoTargets = [
              [ "mongoinfo", "mongo" ], // 백업 대상이 되는 MongoDB 정보입니다.
            ];

            // 현재 프로세스의 작업 디렉토리에서 부모 디렉토리를 추출합니다.
            const robotDirArr = process.cwd().split("/");
            robotDirArr.pop();
            const robotDirMother = robotDirArr.join("/");

            // 부모 디렉토리에 백업 폴더가 있는지 확인하고 없으면 생성합니다.
            const robotDirMotherDetail = await fileSystem(`readDir`, [ robotDirMother ]);
            if (!robotDirMotherDetail.includes(backFolderName)) {
              await shellExec(`mkdir ${shellLink(robotDirMother)}/${backFolderName}`);
            }

            const backDir = robotDirMother + "/" + backFolderName; // 백업 디렉토리의 전체 경로를 설정합니다.
            let tempInfo, timeString;

            // 현재 시간을 기반으로 백업 파일의 이름에 사용할 문자열을 생성합니다.
            timeString = `${String(today.getFullYear())}${zeroAddition(today.getMonth() + 1)}${zeroAddition(today.getDate())}${zeroAddition(today.getHours())}${zeroAddition(today.getMinutes())}${zeroAddition(today.getSeconds())}`;

            // 각 MongoDB 대상에 대해 백업을 수행합니다.
            for (let [ infoName, dbName ] of mongoTargets) {
              tempInfo = address[infoName]; // MongoDB 연결 정보를 가져옵니다.
              // MongoDB 데이터를 덤프하고 지정된 디렉토리에 저장합니다.
              await shellExec(`mongodump --uri="mongodb://${tempInfo["host"]}/${tempInfo["database"]}" --username=${tempInfo["user"]} --password=${tempInfo["password"]} --port=${String(tempInfo["port"])} --out="${shellLink(backDir)}/${timeString}/${dbName}${timeString}" --authenticationDatabase admin`);
            }

            // 백업한 데이터를 압축한 후 원본 폴더를 삭제합니다.
            await shellExec(`cd ${shellLink(backDir)};zip -r ./${timeString}.zip ./${timeString};rm -rf ${shellLink(backDir)}/${timeString}`);

            return true; // 백업이 성공적으로 완료되었음을 반환합니다.

          } catch (e) {
            return false; // 오류가 발생한 경우 false를 반환합니다.
          }
        }

        // 백업 함수를 비동기적으로 실행합니다.
        mongoToJsonFunction().then((boo) => {
          if (boo) {
            return logger.cron("mongo to json done"); // 백업이 성공적으로 완료되었음을 로그에 기록합니다.
          }
        }).catch((err) => {
          logger.error(err, req).catch((e) => { console.log(e); }); // 오류 발생 시 로그를 기록합니다.
        });

        res.send(JSON.stringify({ message: "will do" })); // 클라이언트에 백업 작업이 시작되었음을 알리는 메시지를 반환합니다.

      } catch (e) {
        // 오류가 발생하면 오류를 로깅하고, 오류 메시지를 클라이언트에 반환합니다.
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @route POST /mysqlQuery
     * @description 클라이언트가 전송한 SQL 쿼리를 실행하고 그 결과를 반환하는 라우터입니다.
     * 이 라우터는 안전성을 고려하여 'DROP'이나 'DELETE' 명령어가 포함된 쿼리는 실행하지 않습니다.
     * @param {Object} req - 클라이언트 요청 객체입니다.
     * @param {Object} res - 서버 응답 객체입니다.
     */
    router.post([ "/mysqlQuery" ], async function (req, res) {
      // 응답 헤더를 설정하여 클라이언트와의 CORS(Cross-Origin Resource Sharing) 문제를 해결합니다.
      res.set({
        "Content-Type": "application/json", // 응답의 콘텐츠 타입을 JSON으로 설정합니다.
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정합니다.
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 설정합니다.
      });

      try {
        // 클라이언트로부터 전송된 SQL 쿼리 문자열이 유효한지 확인합니다.
        if (typeof req.body.query !== "string") {
          throw new Error("invalid post"); // 쿼리가 문자열이 아니면 오류를 발생시킵니다.
        }

        let query, response;

        // 쿼리 문자열이 세미콜론(;)으로 끝나는지 확인하고, 없으면 추가합니다.
        if (/;$/.test(req.body.query.trim())) {
          query = req.body.query.trim();
        } else {
          query = req.body.query.trim() + ';';
        }

        // 'DROP'이나 'DELETE' 명령어가 포함된 쿼리는 실행하지 않도록 합니다.
        if (!/drop/gi.test(query) && !/delete/gi.test(query)) {
          // 쿼리를 실행하고 결과를 가져옵니다. 'local: true' 옵션은 로컬 데이터베이스에 연결하기 위한 설정입니다.
          response = await mysqlQuery(query, { local: true });
        } else {
          response = []; // 위험한 쿼리일 경우 빈 배열을 반환합니다.
        }

        // 실행된 쿼리의 결과를 JSON 형태로 클라이언트에 반환합니다.
        res.send(JSON.stringify(response));
      } catch (e) {
        // 오류가 발생하면 오류를 로깅하고, 오류 메시지를 클라이언트에 반환합니다.
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @route POST /parsingCashReceipt
     * @description 이 라우터는 현금 영수증 데이터를 파싱하여 성공 여부를 반환합니다.
     * 현금 영수증 데이터를 파싱하는 작업을 시도하며, 실패할 경우 최대 세 번까지 재시도합니다.
     * @param {Object} req - 클라이언트 요청 객체입니다.
     * @param {Object} res - 서버 응답 객체입니다.
     */
    router.post([ "/parsingCashReceipt" ], async function (req, res) {
      // 응답 헤더를 설정하여 클라이언트와의 CORS(Cross-Origin Resource Sharing) 문제를 해결합니다.
      res.set({
        "Content-Type": "application/json", // 응답의 콘텐츠 타입을 JSON으로 설정합니다.
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정합니다.
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 설정합니다.
      });

      try {
        let boo;

        // Bill 객체의 parsingCashReceipt 메서드를 호출하여 현금 영수증 데이터를 파싱합니다.
        boo = await bill.parsingCashReceipt();
        if (boo) {
          // 파싱에 성공한 경우 로그를 기록합니다.
          logger.log("cash receipt success : " + JSON.stringify(new Date())).catch((e) => { console.log(e); });
        }

        // 첫 번째 시도가 실패한 경우 3초 대기 후 재시도합니다.
        if (!boo) {
          await sleep(3000);
          boo = await bill.parsingCashReceipt();
          if (boo) {
            logger.log("cash receipt success : " + JSON.stringify(new Date())).catch((e) => { console.log(e); });
          }
        }

        // 두 번째 시도가 실패한 경우 3초 대기 후 마지막으로 한 번 더 재시도합니다.
        if (!boo) {
          await sleep(3000);
          boo = await bill.parsingCashReceipt();
          if (boo) {
            logger.log("cash receipt success : " + JSON.stringify(new Date())).catch((e) => { console.log(e); });
          }
        }

        // 최종적으로 성공 여부를 클라이언트에게 반환합니다.
        res.send(JSON.stringify({ success: boo ? 1 : 0 }));
      } catch (e) {
        // 오류가 발생하면 오류를 로깅하고, 오류 메시지를 클라이언트에 반환합니다.
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @route POST /issueCashReceipt
     * @description 클라이언트가 요청한 금액과 전화번호를 기반으로 현금 영수증을 발급하는 라우터입니다.
     * 요청이 성공할 때까지 재시도하며, 발급 성공 시 로그를 기록합니다.
     * @param {Object} req - 클라이언트 요청 객체입니다.
     * @param {Object} res - 서버 응답 객체입니다.
     */
    router.post([ "/issueCashReceipt" ], async function (req, res) {
      // 응답 헤더를 설정하여 클라이언트와의 CORS(Cross-Origin Resource Sharing) 문제를 해결합니다.
      res.set({
        "Content-Type": "application/json", // 응답의 콘텐츠 타입을 JSON으로 설정합니다.
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정합니다.
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 설정합니다.
      });

      try {
        // 클라이언트가 요청한 금액과 전화번호가 전달되었는지 확인합니다.
        if (req.body.amount === undefined || req.body.phone === undefined) {
          throw new Error("invalid post"); // 금액 또는 전화번호가 없으면 오류를 발생시킵니다.
        }

        let boo;

        // bill 객체의 issueCashReceipt 메서드를 호출하여 현금 영수증을 발급합니다.
        boo = await bill.issueCashReceipt(Number(req.body.amount), req.body.phone);
        if (boo) {
          // 발급에 성공한 경우 로그를 기록합니다.
          logger.log("issue cash receipt success : " + JSON.stringify(new Date())).catch((e) => { console.log(e); });
        }

        // 발급이 실패한 경우, 성공할 때까지 3초 간격으로 재시도합니다.
        while (!boo) {
          await sleep(3000);
          boo = await bill.issueCashReceipt(Number(req.body.amount), req.body.phone);
          if (boo) {
            logger.log("issue cash receipt success : " + JSON.stringify(new Date())).catch((e) => { console.log(e); });
          }
        }

        // 최종적으로 성공 여부를 클라이언트에게 반환합니다.
        res.send(JSON.stringify({ success: boo ? 1 : 0 }));
      } catch (e) {
        // 오류가 발생하면 오류를 로깅하고, 오류 메시지를 클라이언트에 반환합니다.
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @route POST /pageToPdf
     * @description 웹 페이지의 URL을 받아 해당 페이지를 PDF로 변환하는 라우터입니다.
     * URL에서 페이지 스크린샷을 찍고, 이를 HTML로 변환한 뒤, 최종적으로 PDF로 출력합니다.
     * @param {Object} req - 클라이언트 요청 객체입니다.
     * @param {Object} res - 서버 응답 객체입니다.
     */
    router.post([ "/pageToPdf" ], async function (req, res) {
      // 응답 헤더를 설정하여 클라이언트와의 CORS(Cross-Origin Resource Sharing) 문제를 해결합니다.
      res.set({
        "Content-Type": "application/json", // 응답의 콘텐츠 타입을 JSON으로 설정합니다.
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정합니다.
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 설정합니다.
      });

      try {
        // 요청 본문에 URL이 문자열 형태로 전달되었는지 확인합니다.
        if (typeof req.body.url !== "string") {
          throw new Error("invalid post : url must be string"); // URL이 문자열이 아닌 경우 오류를 발생시킵니다.
        }

        // 이미지 파일명과 HTML, PDF 파일명을 고유한 값으로 생성합니다.
        const imageName = `pagePrint_${uniqueValue("string")}.png`;
        const htmlName = imageName.replace(/\.png$/i, ".html");
        const pdfName = imageName.replace(/\.png$/i, ".pdf");
        let htmlString;

        // Chrome API를 이용하여 페이지의 스크린샷을 PNG 파일로 저장합니다.
        await chrome.pageToPng(global.decodeURIComponent(req.body.url), staticConst + "/" + imageName, true);

        // 저장된 이미지를 포함한 HTML 문자열을 생성합니다.
        htmlString = `<html><head><style>*{margin:0;padding:0}</style></head><body><img src="https://${address.officeinfo.ghost.host}/${imageName}" style="width:100%"></body></html>`;
        // 파일 시스템을 이용하여 HTML 파일로 저장합니다.
        await fileSystem(`write`, [ `${staticConst}/${htmlName}`, htmlString ]);

        // 생성된 HTML 파일을 PDF로 변환합니다.
        await chrome.pdfPrint(`https://${address.officeinfo.ghost.host}/${htmlName}`, `${staticConst}/${pdfName}`, false);

        // 중간 생성된 PNG와 HTML 파일을 삭제하여 임시 파일을 정리합니다.
        await shellExec(`rm`, [ `-rf`, `${staticConst}/${imageName}` ]);
        await shellExec(`rm`, [ `-rf`, `${staticConst}/${htmlName}` ]);

        // 생성된 PDF 파일의 URL을 클라이언트에 반환합니다.
        res.send(JSON.stringify({
          url: global.encodeURIComponent("https://" + address.officeinfo.ghost.host + "/" + pdfName),
        }));

      } catch (e) {
        // 오류가 발생하면 오류를 로깅하고, 오류 메시지를 클라이언트에 반환합니다.
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @route POST /analyticsDaily
     * @description 주간 및 일일 캠페인, 인스타그램, 유튜브, Google Analytics 등의 데이터를 수집하고 이를 MongoDB에 저장하는 라우터입니다.
     * 특정 날짜 범위에 대한 분석 결과를 처리하며, 클라이언트로부터 전달된 데이터를 기반으로 다양한 메트릭을 수집합니다.
     * @param {Object} req - 클라이언트 요청 객체로, 'date'와 'dayNumber'가 포함됩니다.
     * @param {Object} res - 서버 응답 객체로, 처리 결과를 반환합니다.
     */
    router.post([ "/analyticsDaily" ], async function (req, res) {
      // 클라이언트에 대한 응답 헤더 설정, JSON 형식의 데이터를 반환함을 알리고 CORS 허용
      res.set({
        "Content-Type": "application/json", // JSON 형식으로 응답
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근 허용
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용하는 HTTP 메서드
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용하는 HTTP 헤더
      });

      try {
        // 클라이언트에서 전달받은 요청 본문을 equalJson으로 처리하여 깊은 복사와 데이터 파싱 수행
        const { date } = equalJson(req.body);
        // 로컬 MongoDB 인스턴스를 가져옴
        const selfMongo = instance.mongolocal;
        // 일 단위로 처리할 날짜 범위 설정, 기본값은 7일
        const dayNumber = req.body.dayNumber === undefined ? 7 : Number(req.body.dayNumber);
        let dateArr; // 날짜 배열
        let collection; // MongoDB 컬렉션 이름 저장
        let anaid, ancid, key, rows; // 분석 ID, 클라이언트 ID, 키, 데이터베이스 행 저장용 변수
        let fromCollection; // 데이터를 복사할 출처 컬렉션
        let toCollection; // 데이터를 저장할 목표 컬렉션
        let targets; // 특정 조건을 만족하는 대상 데이터
        let tempRows; // 임시로 사용할 데이터베이스 행 저장용 배열
        let json; // JSON 형태로 변환된 데이터 저장용 변수
        let now, todayDate; // 현재 날짜와 오늘 날짜 저장용 변수

        // date가 문자열이 아닌 경우 예외 처리
        if (typeof date !== "string") {
          throw new Error("invalid post");
        }

        // 쉼표로 구분된 날짜 문자열을 배열로 변환하고, 공백을 제거한 후 유효한 날짜만 필터링
        dateArr = date.split(",").map((str) => { return str.trim(); }).filter((str) => { return str !== ''; });
        // 날짜 문자열이 10자리인지 확인하여 유효성 검사
        if (!(dateArr.every((str) => { return str.length === 10 }))) {
          throw new Error("invalid post");
        }
        // 문자열 형태의 날짜를 Date 객체로 변환
        dateArr = dateArr.map((str) => { return stringToDate(str) });

        // 현재 시각을 가져와서 오늘 날짜의 시작 시각 설정
        now = new Date();
        todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);

        // 비동기 IIFE(즉시 호출 함수 표현식)를 사용하여 데이터를 처리
        (async () => {
          try {
            let result;

            // Facebook, Naver, Google의 일일 캠페인 데이터를 수집하여 MongoDB에 저장
            await instance.facebook.dailyCampaign(selfMongo, dayNumber, logger);
            await instance.naver.dailyCampaign(selfMongo, dayNumber, logger);
            await instance.google.dailyCampaign(selfMongo, dayNumber, logger);

            // 특정 조건을 만족하는 캠페인 데이터를 dailyAspirantCampaign 컬렉션으로 이동
            fromCollection = "dailyCampaign";
            toCollection = "dailyAspirantCampaign";
            // MongoDB에서 dailyCampaign 컬렉션의 모든 데이터를 읽어옴
            rows = await back.mongoRead(fromCollection, {}, { selfMongo });
            targets = [];
            // 디자이너와 관련된 특정 캠페인만 필터링하여 targets 배열에 저장
            for (let row of rows) {
              if (/디자이너/gi.test(row.information.name)) {
                if (/모객/gi.test(row.information.name) || /모집/gi.test(row.information.name) || /신청/gi.test(row.information.name) || /채용/gi.test(row.information.name) || /전환/gi.test(row.information.name) || /캠패인/gi.test(row.information.name)) {
                  targets.push(row);
                }
              }
            }
            // 필터링된 캠페인 데이터를 dailyAspirantCampaign 컬렉션에 저장
            for (let row of targets) {
              json = equalJson(JSON.stringify(row)); // row 데이터를 JSON으로 변환
              tempRows = await back.mongoRead(toCollection, { key: row.key }, { selfMongo });
              if (tempRows.length !== 0) {
                // 이미 존재하는 데이터가 있을 경우 삭제 후 재저장
                await back.mongoDelete(toCollection, { key: row.key }, { selfMongo });
              }
              await back.mongoCreate(toCollection, json, { selfMongo });
              tempRows = await back.mongoRead(fromCollection, { key: row.key }, { selfMongo });
              if (tempRows.length !== 0) {
                // 기존 컬렉션의 데이터를 삭제하여 이동 처리 완료
                await back.mongoDelete(fromCollection, { key: row.key }, { selfMongo });
              }
            }

            // 인스타그램과 유튜브의 일일 채널 데이터를 수집하여 MongoDB에 저장
            await instance.facebook.dailyInstagram(selfMongo, dayNumber, logger);
            await instance.youtube.dailyYoutube(selfMongo, dayNumber, logger);

            // Google Analytics의 일일 분석 데이터를 dailyAnalytics 컬렉션에 저장
            collection = "dailyAnalytics";
            for (let thisDate of dateArr) {
              result = await analytics.dailyMetric(thisDate);
              if (result === null) {
                await sleep(1000); // 데이터 수집에 실패한 경우 1초 대기 후 재시도
                result = await analytics.dailyMetric(thisDate);
                if (result === null) {
                  await sleep(1000);
                  result = await analytics.dailyMetric(thisDate);
                  if (result === null) {
                    await sleep(1000);
                    result = await analytics.dailyMetric(thisDate);
                    if (result === null) {
                      // 실패 시 로그만 남기고 넘어감
                    } else {
                      // 데이터를 성공적으로 수집한 경우 MongoDB에 저장
                      anaid = result.anaid;
                      rows = await back.mongoRead(collection, { anaid }, { selfMongo });
                      if (rows.length !== 0) {
                        await back.mongoDelete(collection, { anaid }, { selfMongo });
                      }
                      await back.mongoCreate(collection, result, { selfMongo });
                      logger.cron("daily analytics done : " + dateToString(result.date.from)).catch((err) => { console.log(err); });
                    }
                  } else {
                    anaid = result.anaid;
                    rows = await back.mongoRead(collection, { anaid }, { selfMongo });
                    if (rows.length !== 0) {
                      await back.mongoDelete(collection, { anaid }, { selfMongo });
                    }
                    await back.mongoCreate(collection, result, { selfMongo });
                    logger.cron("daily analytics done : " + dateToString(result.date.from)).catch((err) => { console.log(err); });
                  }
                } else {
                  anaid = result.anaid;
                  rows = await back.mongoRead(collection, { anaid }, { selfMongo });
                  if (rows.length !== 0) {
                    await back.mongoDelete(collection, { anaid }, { selfMongo });
                  }
                  await back.mongoCreate(collection, result, { selfMongo });
                  logger.cron("daily analytics done : " + dateToString(result.date.from)).catch((err) => { console.log(err); });
                }
              } else {
                anaid = result.anaid;
                rows = await back.mongoRead(collection, { anaid }, { selfMongo });
                if (rows.length !== 0) {
                  await back.mongoDelete(collection, { anaid }, { selfMongo });
                }
                await back.mongoCreate(collection, result, { selfMongo });
                logger.cron("daily analytics done : " + dateToString(result.date.from)).catch((err) => { console.log(err); });
              }
              await sleep(1000); // 각 데이터 처리 후 1초 대기
            }

            // dailyClients 컬렉션에 고객 데이터를 저장
            collection = "dailyClients";
            for (let thisDate of dateArr) {
              result = await analytics.dailyClients(thisDate, instance.mongo, instance.mongolocal);
              if (result === null) {
                
              } else {
                ancid = result.ancid;
                rows = await back.mongoRead(collection, { ancid }, { selfMongo });
                if (rows.length !== 0) {
                  await back.mongoDelete(collection, { ancid }, { selfMongo });
                }
                await back.mongoCreate(collection, result, { selfMongo });
                logger.cron("daily clients done : " + dateToString(result.date.from)).catch((err) => { console.log(err); });
              }
              await sleep(1000);
            }
            result = await analytics.dailyClients(todayDate, instance.mongo, instance.mongolocal);
            if (result === null) {
              
            } else {
              ancid = result.ancid;
              rows = await back.mongoRead(collection, { ancid }, { selfMongo });
              if (rows.length !== 0) {
                await back.mongoDelete(collection, { ancid }, { selfMongo });
              }
              await back.mongoCreate(collection, result, { selfMongo });
              logger.cron("daily clients done : " + dateToString(result.date.from)).catch((err) => { console.log(err); });
            }
            await sleep(1000);

            // daily query 분석 데이터를 queryAnalytics 컬렉션에 저장
            collection = "queryAnalytics";
            for (let thisDate of dateArr) {
              result = await analytics.queryParsing(thisDate, instance.mongolocal);
              if (result === null) {
                
                await sleep(1000);
                result = await analytics.queryParsing(thisDate, instance.mongolocal);
                if (result === null) {
                  
                  await sleep(1000);
                  result = await analytics.queryParsing(thisDate, instance.mongolocal);
                  if (result === null) {
                    
                    await sleep(1000);
                    result = await analytics.queryParsing(thisDate, instance.mongolocal);
                    if (result === null) {
                      
                    } else {
                      key = result.key;
                      rows = await back.mongoRead(collection, { key }, { selfMongo });
                      if (rows.length !== 0) {
                        await back.mongoDelete(collection, { key }, { selfMongo });
                      }
                      await back.mongoCreate(collection, result, { selfMongo });
                      logger.cron("daily query done : " + dateToString(result.date.from)).catch((err) => { console.log(err); });
                    }
                  } else {
                    key = result.key;
                    rows = await back.mongoRead(collection, { key }, { selfMongo });
                    if (rows.length !== 0) {
                      await back.mongoDelete(collection, { key }, { selfMongo });
                    }
                    await back.mongoCreate(collection, result, { selfMongo });
                    logger.cron("daily query done : " + dateToString(result.date.from)).catch((err) => { console.log(err); });
                  }
                } else {
                  key = result.key;
                  rows = await back.mongoRead(collection, { key }, { selfMongo });
                  if (rows.length !== 0) {
                    await back.mongoDelete(collection, { key }, { selfMongo });
                  }
                  await back.mongoCreate(collection, result, { selfMongo });
                  logger.cron("daily query done : " + dateToString(result.date.from)).catch((err) => { console.log(err); });
                }
              } else {
                key = result.key;
                rows = await back.mongoRead(collection, { key }, { selfMongo });
                if (rows.length !== 0) {
                  await back.mongoDelete(collection, { key }, { selfMongo });
                }
                await back.mongoCreate(collection, result, { selfMongo });
                logger.cron("daily query done : " + dateToString(result.date.from)).catch((err) => { console.log(err); });
              }
              await sleep(1000);
            }

            // monthly analytics, meta 및 naver complex 데이터를 수집 및 처리
            await sleep(1000);
            await requestSystem("https://" + address.officeinfo.ghost.host + "/analyticsMonthly", { date: new Date() }, { headers: { "Content-Type": "application/json" } });

            await sleep(1000);
            await requestSystem("https://" + address.contentsinfo.host + ":3000/metaComplex", { day: dayNumber }, { headers: { "Content-Type": "application/json" } });

            return true;
          } catch (e) {
            // 처리 중 에러가 발생할 경우 로그에 기록
            logger.error(e, req).catch((e) => { console.log(e); });
            return false;
          }
        })().catch((err) => {
          logger.error(err, req).catch((e) => { console.log(e); });
        });

        res.send({ message: "will do" }); // 클라이언트에 작업이 시작되었음을 알림
      } catch (e) {
        // 예외 처리 및 에러 메시지 반환
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /analyticsToday
     * @description 오늘의 분석 데이터를 수집하여 MongoDB에 저장하는 라우터입니다. 
     * 이 라우터는 오늘의 클라이언트 데이터, 쿼리 데이터, 분석 데이터를 수집하고, 요청에 따라 보고서를 생성합니다.
     * @param {Object} req - 클라이언트 요청 객체로, 'report' 플래그가 포함됩니다.
     * @param {Object} res - 서버 응답 객체로, 처리 결과를 반환합니다.
     */
    router.post([ "/analyticsToday" ], async function (req, res) {
      // 클라이언트에 대한 응답 헤더 설정, JSON 형식의 데이터를 반환함을 알리고 CORS 허용
      res.set({
        "Content-Type": "application/json", // JSON 형식으로 응답
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근 허용
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용하는 HTTP 메서드
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용하는 HTTP 헤더
      });

      try {
        // 로컬 MongoDB 인스턴스를 가져옴
        const selfMongo = instance.mongolocal;
        // 클라이언트에서 전달된 'report' 플래그를 확인하여 보고서 모드 설정
        const reportMode = (req.body.report === 1 || req.body.report === "1")
        let collection; // MongoDB 컬렉션 이름 저장
        let anaid, ancid, key, rows; // 분석 ID, 클라이언트 ID, 키, 데이터베이스 행 저장용 변수
        let result; // 분석 결과 저장 변수
        let thisDate; // 오늘 날짜 저장 변수
        let now; // 현재 시각 저장 변수

        // 비동기 IIFE(즉시 호출 함수 표현식)를 사용하여 데이터를 처리
        (async () => {
          try {

            now = new Date(); // 현재 시각을 가져옴
            thisDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0); // 오늘 날짜의 시작 시각 설정

            // daily analytics - 오늘의 Google Analytics 데이터를 수집하여 MongoDB에 저장
            collection = "dailyAnalytics";
            result = await analytics.dailyMetric(thisDate);
            if (result === null) {
              await sleep(1000); // 데이터 수집에 실패한 경우 1초 대기 후 재시도
              result = await analytics.dailyMetric(thisDate);
              if (result === null) {
                await sleep(1000);
                result = await analytics.dailyMetric(thisDate);
                if (result === null) {
                  await sleep(1000);
                  result = await analytics.dailyMetric(thisDate);
                  if (result === null) {
                    // 네 번의 시도 후에도 실패하면 로그만 남기고 넘어감
                  } else {
                    // 데이터를 성공적으로 수집한 경우 MongoDB에 저장
                    anaid = result.anaid;
                    rows = await back.mongoRead(collection, { anaid }, { selfMongo });
                    if (rows.length !== 0) {
                      await back.mongoDelete(collection, { anaid }, { selfMongo })
                    }
                    await back.mongoCreate(collection, result, { selfMongo });
                    logger.cron("daily analytics done : " + dateToString(result.date.from)).catch((err) => { console.log(err); });
                  }
                } else {
                  anaid = result.anaid;
                  rows = await back.mongoRead(collection, { anaid }, { selfMongo });
                  if (rows.length !== 0) {
                    await back.mongoDelete(collection, { anaid }, { selfMongo })
                  }
                  await back.mongoCreate(collection, result, { selfMongo });
                  logger.cron("daily analytics done : " + dateToString(result.date.from)).catch((err) => { console.log(err); });
                }
              } else {
                anaid = result.anaid;
                rows = await back.mongoRead(collection, { anaid }, { selfMongo });
                if (rows.length !== 0) {
                  await back.mongoDelete(collection, { anaid }, { selfMongo })
                }
                await back.mongoCreate(collection, result, { selfMongo });
                logger.cron("daily analytics done : " + dateToString(result.date.from)).catch((err) => { console.log(err); });
              }
            } else {
              anaid = result.anaid;
              rows = await back.mongoRead(collection, { anaid }, { selfMongo });
              if (rows.length !== 0) {
                await back.mongoDelete(collection, { anaid }, { selfMongo })
              }
              await back.mongoCreate(collection, result, { selfMongo });
              logger.cron("daily analytics done : " + dateToString(result.date.from)).catch((err) => { console.log(err); });
            }
            await sleep(1000); // 각 데이터 처리 후 1초 대기

            // today clients - 오늘의 클라이언트 데이터를 수집하여 MongoDB에 저장
            collection = "dailyClients";
            result = await analytics.dailyClients(thisDate, instance.mongo, instance.mongolocal);
            if (result === null) {
              // 데이터 수집에 실패한 경우 처리 없음
            } else {
              ancid = result.ancid;
              rows = await back.mongoRead(collection, { ancid }, { selfMongo });
              if (rows.length !== 0) {
                await back.mongoDelete(collection, { ancid }, { selfMongo })
              }
              await back.mongoCreate(collection, result, { selfMongo });
              logger.cron("daily clients done : " + dateToString(result.date.from)).catch((err) => { console.log(err); });
            }
            await sleep(1000);

            // daily query - 오늘의 쿼리 데이터를 수집하여 MongoDB에 저장
            collection = "queryAnalytics";
            result = await analytics.queryParsing(thisDate, instance.mongolocal);
            if (result === null) {
              await sleep(1000);
              result = await analytics.queryParsing(thisDate, instance.mongolocal);
              if (result === null) {
                await sleep(1000);
                result = await analytics.queryParsing(thisDate, instance.mongolocal);
                if (result === null) {
                  await sleep(1000);
                  result = await analytics.queryParsing(thisDate, instance.mongolocal);
                  if (result === null) {
                    // 네 번의 시도 후에도 실패하면 로그만 남기고 넘어감
                  } else {
                    key = result.key;
                    rows = await back.mongoRead(collection, { key }, { selfMongo });
                    if (rows.length !== 0) {
                      await back.mongoDelete(collection, { key }, { selfMongo })
                    }
                    await back.mongoCreate(collection, result, { selfMongo });
                    logger.cron("daily query done : " + dateToString(result.date.from)).catch((err) => { console.log(err); });
                  }
                } else {
                  key = result.key;
                  rows = await back.mongoRead(collection, { key }, { selfMongo });
                  if (rows.length !== 0) {
                    await back.mongoDelete(collection, { key }, { selfMongo })
                  }
                  await back.mongoCreate(collection, result, { selfMongo });
                  logger.cron("daily query done : " + dateToString(result.date.from)).catch((err) => { console.log(err); });
                }
              } else {
                key = result.key;
                rows = await back.mongoRead(collection, { key }, { selfMongo });
                if (rows.length !== 0) {
                  await back.mongoDelete(collection, { key }, { selfMongo })
                }
                await back.mongoCreate(collection, result, { selfMongo });
                logger.cron("daily query done : " + dateToString(result.date.from)).catch((err) => { console.log(err); });
              }
            } else {
              key = result.key;
              rows = await back.mongoRead(collection, { key }, { selfMongo });
              if (rows.length !== 0) {
                await back.mongoDelete(collection, { key }, { selfMongo })
              }
              await back.mongoCreate(collection, result, { selfMongo });
              logger.cron("daily query done : " + dateToString(result.date.from)).catch((err) => { console.log(err); });
            }
            await sleep(1000);

            // 보고서 모드가 활성화된 경우 기본 보고서 생성 요청을 실행
            if (reportMode) {
              await requestSystem("https://" + address.officeinfo.ghost.host + "/logBasicReport", { message: "do it" }, { headers: { "Content-Type": "application/json" } });
            }

            return true; // 성공적으로 모든 작업이 완료되었음을 반환
          } catch (e) {
            // 처리 중 예외가 발생한 경우 예외를 기록하고 false 반환
            console.log(e);
            logger.error(e, req).catch((e) => { console.log(e); });
            return false;
          }
        })().catch((err) => {
          // 비동기 함수에서 예외가 발생한 경우 예외를 기록
          logger.error(err, req).catch((e) => { console.log(e); });
        });

        res.send({ message: "will do" }); // 클라이언트에 작업이 시작되었음을 알림
      } catch (e) {
        // 예외 처리 및 에러 메시지 반환
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /analyticsMonthly
     * @description 매월의 분석 데이터를 수집하여 MongoDB에 저장하는 라우터입니다. 
     * 이 라우터는 지정된 날짜 또는 현재 날짜를 기준으로 분석 데이터를 수집하고 이를 MongoDB에 저장합니다.
     * @param {Object} req - 클라이언트 요청 객체로, 'date' 필드를 포함할 수 있습니다.
     * @param {Object} res - 서버 응답 객체로, 처리 결과를 반환합니다.
     */
    router.post([ "/analyticsMonthly" ], async function (req, res) {
      // 클라이언트에 대한 응답 헤더 설정, JSON 형식의 데이터를 반환함을 알리고 CORS 허용
      res.set({
        "Content-Type": "application/json", // JSON 형식으로 응답
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근 허용
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용하는 HTTP 메서드
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용하는 HTTP 헤더
      });

      try {
        // 요청 본문에서 'date' 값을 equalJson 메서드를 사용해 추출. 이는 깊은 복사 및 Date 객체를 복원하기 위한 JSON.parse 업그레이드 버전 메서드.
        const { date } = equalJson(req.body);
        const selfMongo = instance.mongolocal; // 로컬 MongoDB 인스턴스를 가져옴
        const collection = "complexAnalytics"; // MongoDB 컬렉션 이름을 설정
        let targetDate; // 분석을 위한 대상 날짜
        let key; // 데이터베이스에서 사용할 키
        let searchKey; // 정규식 검색을 위한 키
        let rows; // MongoDB에서 조회된 데이터 저장 변수

        // 요청으로 받은 date가 Date 객체인지 확인. 만약 그렇지 않다면 현재 날짜로 설정
        if (!(date instanceof Date)) {
          targetDate = new Date();
        } else {
          targetDate = date;
        }

        // 비동기 IIFE(즉시 호출 함수 표현식)를 사용하여 데이터를 처리
        (async () => {
          try {
            let result;

            // targetDate를 기준으로 월간 분석 데이터를 수집
            result = await analytics.monthlyMetric(targetDate);

            if (result === null) {
              // 분석 데이터 수집이 실패한 경우 처리 없음
            } else {
              // 지난달 분석 데이터의 키를 설정하고, 이를 기준으로 MongoDB에서 기존 데이터를 검색
              key = result.pastMonth.key;
              searchKey = "^" + key.split("_").slice(0, -1).join("_");
              rows = await back.mongoRead(collection, { key: { $regex: searchKey } }, { selfMongo });

              // 기존 데이터가 존재하면 삭제
              if (rows.length !== 0) {
                await back.mongoDelete(collection, { key: rows[0].key }, { selfMongo })
              }

              // 새로운 데이터를 MongoDB에 생성
              await back.mongoCreate(collection, result.pastMonth, { selfMongo });
              logger.cron("monthly analytics done : " + dateToString(result.pastMonth.date.from)).catch((err) => { console.log(err); });

              // 이번 달 분석 데이터가 존재하는 경우 처리
              if (result.thisMonth !== null) {
                await sleep(1000); // 1초 대기
                key = result.thisMonth.key;
                searchKey = "^" + key.split("_").slice(0, -1).join("_");
                rows = await back.mongoRead(collection, { key: { $regex: searchKey } }, { selfMongo });

                // 기존 데이터가 존재하면 삭제
                if (rows.length !== 0) {
                  await back.mongoDelete(collection, { key: rows[0].key }, { selfMongo })
                }

                // 새로운 데이터를 MongoDB에 생성
                await back.mongoCreate(collection, result.thisMonth, { selfMongo });
                logger.cron("monthly analytics done : " + dateToString(result.thisMonth.date.from)).catch((err) => { console.log(err); });
              }
            }
            return true; // 성공적으로 모든 작업이 완료되었음을 반환
          } catch (e) {
            // 처리 중 예외가 발생한 경우 예외를 기록하고 false 반환
            console.log(e);
            logger.error(e, req).catch((e) => { console.log(e); });
            return false;
          }
        })().catch((err) => {
          // 비동기 함수에서 예외가 발생한 경우 예외를 기록
          logger.error(err, req).catch((e) => { console.log(e); });
          console.log(err);
        });

        res.send({ message: "will do" }); // 클라이언트에 작업이 시작되었음을 알림
      } catch (e) {
        // 예외 처리 및 에러 메시지 반환
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /designerAboutComplete
     * @description 디자이너 프로필 및 작업 업데이트 완료 상태를 확인하는 라우터입니다.
     * 클라이언트로부터 받은 `mode`에 따라 전체 디자이너 혹은 특정 디자이너의 프로필, 작업 사진 업로드, 자기소개 업데이트 상태를 확인합니다.
     * @param {Object} req - 클라이언트 요청 객체로, 'mode'와 'desid' (필요 시)을 포함할 수 있습니다.
     * @param {Object} res - 서버 응답 객체로, 처리 결과를 반환합니다.
     */
    router.post([ "/designerAboutComplete" ], async function (req, res) {
      // 클라이언트에 대한 응답 헤더 설정, JSON 형식의 데이터를 반환함을 알리고 CORS 허용
      res.set({
        "Content-Type": "application/json", // JSON 형식으로 응답
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근 허용
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용하는 HTTP 메서드
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용하는 HTTP 헤더
      });

      try {
        // 요청 본문에서 'mode' 값이 없는 경우 예외를 발생시킴
        if (req.body.mode === undefined) {
          throw new Error("invalid post");
        }

        const selfMongo = instance.mongolocal; // 로컬 MongoDB 인스턴스를 가져옴
        const collection = "homeliaisonAnalytics"; // MongoDB 컬렉션 이름을 설정
        const completeStandardNumber = 10; // 자기소개 업데이트 완료의 기준 숫자
        const targetPageName = "designerAbout"; // 분석할 대상 페이지 이름
        const { mode } = equalJson(req.body); // 'mode' 값을 equalJson으로 추출
        let rows; // MongoDB에서 조회된 데이터 저장 변수
        let profileComplete, workComplete, aboutUpdateComplete; // 완료 상태를 저장할 변수들
        let resultObj; // 최종 결과를 저장할 객체
        let desidToResult; // 특정 디자이너의 결과를 계산하는 함수
        let finalObj; // 모든 디자이너의 결과를 저장할 객체

        // 특정 desid에 대해 MongoDB에서 데이터를 조회하고 완료 상태를 계산하는 함수
        desidToResult = async (desid, preRows = null) => {
          try {
            if (preRows === null) {
              // MongoDB에서 특정 디자이너의 데이터를 조회
              rows = await back.mongoPick(collection, [
                {
                  $and: [
                    { page: targetPageName },
                    { "data.desid": desid }
                  ]
                },
                { page: 1, action: 1, data: 1, id: 1, date: 1 }
              ], { selfMongo });
            } else {
              // 이미 조회된 데이터를 필터링하여 특정 디자이너의 데이터만 사용
              rows = preRows.filter((o) => { return o.data.desid === desid });
            }

            // 프로필 사진 업로드 완료 상태 확인
            profileComplete = rows.filter((o) => { return o.action === "profilePhotoUpload" }).length > 0;

            // 작업 사진 업로드 완료 상태 확인 (최소 4개의 고유 작업이 필요)
            workComplete = [ ...new Set(rows.filter((o) => { return o.action === "workPhotoUpload" }).map((o) => { return o.data.index })) ].length >= 4;

            // 자기소개 업데이트 완료 상태 확인 (최소 completeStandardNumber개의 업데이트 필요)
            aboutUpdateComplete = [ ...new Set(rows.filter((o) => { return o.action === "designerAboutUpdate" }).map((o) => { return o.data.property })) ].length >= completeStandardNumber;

            // 결과 객체 생성
            resultObj = {
              profileComplete: profileComplete ? 1 : 0,
              workComplete: workComplete ? 1 : 0,
              aboutUpdateComplete: aboutUpdateComplete ? 1 : 0,
            };

            return resultObj; // 결과 객체 반환

          } catch (e) {
            return null; // 예외 발생 시 null 반환
          }
        }

        if (mode === "total") {
          // 전체 디자이너의 완료 상태를 확인하는 경우
          const designers = await back.mongoPick("designer", [ {}, { desid: 1 } ], { selfMongo });
          finalObj = {};
          preRows = await back.mongoPick(collection, [
            { page: targetPageName },
            { page: 1, action: 1, data: 1, id: 1, date: 1 }
          ], { selfMongo });

          // 모든 디자이너에 대해 완료 상태를 계산하여 finalObj에 저장
          for (let { desid } of designers) {
            finalObj[desid] = await desidToResult(desid, preRows);
          }

          res.send(JSON.stringify(finalObj)); // 결과를 클라이언트에 전송

        } else if (mode === "pick") {
          // 특정 디자이너의 완료 상태를 확인하는 경우
          const { desid } = equalJson(req.body); // 요청 본문에서 desid를 추출
          const targetResult = await desidToResult(desid); // 해당 디자이너의 결과를 계산
          res.send(JSON.stringify(targetResult)); // 결과를 클라이언트에 전송

        } else {
          throw new Error("invalid mode"); // 유효하지 않은 mode 값인 경우 예외 발생
        }

      } catch (e) {
        // 예외 처리 및 에러 메시지 반환
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /filesToZip
     * @description 요청된 파일들을 ZIP 파일로 압축하여 다운로드 링크를 반환하는 라우터입니다.
     * 클라이언트가 요청한 파일들을 임시 폴더에 복사한 후, ZIP으로 압축하고, 최종적으로 서버에 저장한 후 링크를 반환합니다.
     * @param {Object} req - 클라이언트 요청 객체로, 'files' 배열을 포함해야 합니다.
     * @param {Object} res - 서버 응답 객체로, 처리 결과를 반환합니다.
     */
    router.post([ "/filesToZip" ], async function (req, res) {
      // 클라이언트에 대한 응답 헤더 설정, JSON 형식의 데이터를 반환함을 알리고 CORS 허용
      res.set({
          "Content-Type": "application/json", // JSON 형식으로 응답
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근 허용
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용하는 HTTP 메서드
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용하는 HTTP 헤더
      });

      try {
          // 요청 본문에서 'files'가 정의되지 않은 경우 예외를 발생시킴
          if (req.body.files === undefined) {
              throw new Error("invalid post");
          }

          const home = process.env.HOME; // 홈 디렉토리 경로를 가져옴
          const uniqueValueFileName = "homeliaisonCloud_" + uniqueValue("string"); // 고유한 파일 이름 생성
          const tempFileFolderName = "temp"; // 임시 파일 폴더 이름 설정
          const tempFileFolder = `${home}/${tempFileFolderName}`; // 임시 파일 폴더의 전체 경로 생성
          const { files } = equalJson(req.body); // 요청 본문에서 'files'를 추출하고 equalJson 메서드로 처리
          let targetFiles; // 처리할 파일 목록을 저장할 변수

          // 임시 폴더가 이미 존재하는 경우 삭제
          if (await fileSystem(`exist`, [ tempFileFolder ])) {
              await shellExec(`rm`, [ `-rf`, tempFileFolder ]);
          }

          // 임시 폴더 생성
          await shellExec(`mkdir`, [ tempFileFolder ]);

          // 파일들의 절대 경로를 업데이트하여 'targetFiles' 배열에 저장
          targetFiles = files.map((obj) => {
              return {
                  absolute: obj.absolute.replace(/__samba__/gi, address.officeinfo.ghost.file.static).replace(/\/$/, ''),
                  type: obj.type
              }
          });

          // 각 파일을 임시 폴더로 복사
          for (let { absolute, type } of targetFiles) {
              if (type === "file") {
                  // 파일인 경우
                  await shellExec(`cp`, [ absolute, tempFileFolder ]);
              } else {
                  // 디렉토리인 경우
                  await shellExec(`cp`, [ `-r`, absolute, tempFileFolder ]);
              }
          }

          // 임시 폴더를 고유 이름으로 변경
          await shellExec(`mv`, [ tempFileFolder, `${home}/${uniqueValueFileName}` ]);

          // 폴더를 ZIP 파일로 압축
          await shellExec(`cd ${home};zip -r ${uniqueValueFileName}.zip ./${uniqueValueFileName}`);

          // 압축된 ZIP 파일을 최종 위치로 이동
          await shellExec(`mv`, [ `${home}/${uniqueValueFileName}.zip`, `${address.officeinfo.ghost.file.static}/${uniqueValueFileName}.zip` ]);

          // 원본 폴더 삭제
          await shellExec(`rm`, [ `-rf`, `${home}/${uniqueValueFileName}` ]);

          // 일정 시간이 지난 후 ZIP 파일 삭제 (5시간 후)
          setTimeout(async () => {
              try {
                  await shellExec(`rm`, [ `-rf`, `${address.officeinfo.ghost.file.static}/${uniqueValueFileName}.zip` ]);
              } catch (e) {
                  console.log(e);
              }
          }, 1000 * 60 * 60 * 5);

          // 최종적으로 생성된 ZIP 파일의 경로를 클라이언트에 반환
          res.send(JSON.stringify({ link: "__samba__/" + uniqueValueFileName + ".zip" }));
      } catch (e) {
          // 예외 처리 및 에러 메시지 반환
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /renameFile
     * @description 클라이언트가 요청한 파일의 이름을 변경하는 라우터입니다.
     * 클라이언트가 제공한 경로와 새로운 이름을 기반으로 파일 이름을 변경하고, 성공 메시지를 반환합니다.
     * @param {Object} req - 클라이언트 요청 객체로, 'path'와 'name' 필드를 포함해야 합니다.
     * @param {Object} res - 서버 응답 객체로, 처리 결과를 반환합니다.
     */
    router.post([ "/renameFile" ], async function (req, res) {
      // 클라이언트에 대한 응답 헤더 설정, JSON 형식의 데이터를 반환함을 알리고 CORS 허용
      res.set({
          "Content-Type": "application/json", // JSON 형식으로 응답
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근 허용
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용하는 HTTP 메서드
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용하는 HTTP 헤더
      });

      try {
          // 요청 본문에서 'path'와 'name'이 정의되지 않은 경우 예외를 발생시킴
          if (req.body.path === undefined || req.body.name === undefined) {
              throw new Error("invalid post");
          }

          // equalJson 메서드를 사용하여 요청 데이터를 깊은 복사하고 JSON을 파싱하여 사용
          const { path, name } = equalJson(req.body);

          let targetFile; // 변경 대상 파일의 경로
          let targetPlace; // 파일이 위치한 디렉토리 경로
          let thisExe; // 파일의 확장자
          let thisFinal; // 최종적으로 사용할 확장자 문자열

          // '__samba__'를 실제 파일 경로로 변환하고, 마지막 '/'를 제거한 후 targetFile에 저장
          targetFile = path.replace(/__samba__/gi, address.officeinfo.ghost.file.static).replace(/\/$/, '');

          // 파일이 위치한 디렉토리 경로를 추출하여 targetPlace에 저장
          targetPlace = targetFile.split("/").slice(0, -1).join("/");

          // 파일 이름에서 확장자를 추출하여 thisExe에 저장
          thisExe = targetFile.split("/").slice(-1)[0].split(".")[1];

          // 확장자가 없는 경우 빈 문자열을 할당하고, 있는 경우 '.확장자' 형식으로 thisFinal에 저장
          if (thisExe === undefined) {
              thisFinal = "";
          } else {
              thisFinal = "." + thisExe;
          }

          // shellExec 명령어를 사용하여 파일 이름을 변경
          await shellExec(`mv`, [
              targetFile,
              targetPlace.replace(/\/$/, '') + "/" + name.replace(/^\//, '').replace(/\/$/, '') + thisFinal
          ]);

          // 클라이언트에 성공 메시지를 JSON 형식으로 응답
          res.send(JSON.stringify({ message: "done" }));
      } catch (e) {
          // 예외 처리 및 에러 메시지 반환
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /deleteFile
     * @description 클라이언트가 요청한 파일을 삭제하는 라우터입니다.
     * 요청된 파일의 경로를 검증한 후, 허용된 경로 내의 파일 및 폴더를 삭제합니다.
     * @param {Object} req - 클라이언트 요청 객체로, 'files' 배열을 포함해야 합니다.
     * @param {Object} res - 서버 응답 객체로, 처리 결과를 반환합니다.
     */
    router.post([ "/deleteFile" ], async function (req, res) {
      // 클라이언트에 대한 응답 헤더 설정
      res.set({
          "Content-Type": "application/json", // 응답의 형식이 JSON임을 명시
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용하는 HTTP 메서드를 정의
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용하는 HTTP 헤더를 정의
      });

      try {
          // 요청 본문에서 'files' 필드가 없을 경우 에러를 발생시킴
          if (req.body.files === undefined) {
              throw new Error("invalid post");
          }

          // equalJson 메서드를 사용하여 요청 본문을 파싱하고 깊은 복사 수행
          const { files } = equalJson(req.body);

          // 파일 삭제가 허용된 경로 목록 정의
          const allowedPath = [
              address.officeinfo.ghost.file.static + "/drive/# 홈리에종",
              address.officeinfo.ghost.file.static + address.officeinfo.ghost.file.office + "/고객/",
              address.officeinfo.ghost.file.static + address.officeinfo.ghost.file.office + "/디자이너/",
              address.officeinfo.ghost.file.static + address.officeinfo.ghost.file.office + "/일시적",
          ];

          let targetFiles;

          // 요청된 파일 경로를 '__samba__'에서 실제 경로로 변환하고, 경로 끝의 '/' 제거
          targetFiles = files.map((obj) => { 
              return { 
                  absolute: obj.absolute.replace(/__samba__/gi, address.officeinfo.ghost.file.static).replace(/\/$/, ''), 
                  type: obj.type 
              };
          });

          // 파일과 폴더를 순회하면서 삭제를 시도
          for (let { absolute, type } of targetFiles) {
              // 타입이 파일일 경우
              if (type === "file") {
                  // 파일 경로가 허용된 경로 내에 있는지 확인
                  if (allowedPath.some((reg) => { return (new RegExp("^" + reg)).test(absolute) })) {
                      // 해당 파일을 삭제
                      await shellExec(`rm`, [ `-f`, absolute ]);
                  }
              } else { // 타입이 폴더일 경우
                  // 기본 경로(static 경로)가 아닌 경우에만 삭제
                  if (absolute !== address.officeinfo.ghost.file.static) {
                      // 폴더 경로가 허용된 경로 내에 있는지 확인
                      if (allowedPath.some((reg) => { return (new RegExp("^" + reg)).test(absolute) })) {
                          // 해당 폴더를 삭제
                          await shellExec(`rm`, [ `-rf`, absolute ]);
                      }
                  }
              }
          }

          // 파일 또는 폴더 삭제가 성공적으로 완료된 경우 성공 메시지를 반환
          res.send(JSON.stringify({ message: "done" }));
      } catch (e) {
          // 에러 발생 시 로그를 남기고, 클라이언트에 에러 메시지를 반환
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /callHistory
     * @description 클라이언트가 통화 기록을 동기화할 요청을 처리하는 라우터입니다.
     * 클라이언트의 요청에 따라 콜센터 API에서 통화 기록을 가져와 MongoDB에 저장합니다.
     * @param {Object} req - 클라이언트의 요청 객체로, 특별한 본문 데이터를 필요로 하지 않습니다.
     * @param {Object} res - 서버의 응답 객체로, 처리 결과를 JSON 형식으로 반환합니다.
     */
    router.post([ "/callHistory" ], async function (req, res) {
      // 클라이언트에 대한 응답 헤더 설정
      res.set({
          "Content-Type": "application/json", // 응답의 형식이 JSON임을 명시
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용하는 HTTP 메서드를 정의
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용하는 HTTP 헤더를 정의
      });

      try {
          const url = "https://centrex.uplus.co.kr/RestApi/callhistory"; // 통화 기록을 요청할 콜센터 API의 URL
          const { officeinfo: { phone: { numbers: phoneNumbers, password: pass } } } = address; // 설정된 전화번호 및 비밀번호 정보
          const callConst = "c_"; // 전화번호를 식별하기 위한 상수 접두사
          const successStandardSec = 200; // 성공적인 통화로 간주하는 최소 통화 시간 (초 단위)

          /**
           * @function parsingCallHistory
           * @description 콜센터 API로부터 통화 기록을 가져와 MongoDB에 저장하는 함수입니다.
           * @param {Object} MONGOC - MongoDB 커넥션 객체
           * @returns {boolean} 성공 여부를 반환합니다.
           */
          const parsingCallHistory = async (MONGOC) => {
              try {
                  const selfMongo = MONGOC;
                  const selfConsoleInfo = MONGOC;
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

                  calltype = "outbound"; // 발신 통화 유형
                  tong = {}; // 통화 데이터를 저장할 객체

                  // 발신 통화 기록을 가져오는 반복문
                  for (let id of phoneNumbers) {
                      page = 0;
                      do {
                          page++;
                          query = { id, pass, calltype, page }; // 요청 쿼리 구성
                          res = await requestSystem(url + "?" + querystring.stringify(query), query, { headers: { "Content-Type": "application/json" } });
                          data = res.data;
                          if (data.DATAS === null) { // 더 이상 데이터가 없으면 반복 종료
                              break;
                          }
                          for (let obj of data.DATAS) { // 받은 데이터를 tong 객체에 저장
                              if (!Array.isArray(tong[callConst + obj.SRC])) {
                                  tong[callConst + obj.SRC] = [];
                              }
                              tong[callConst + obj.SRC].push(JSON.parse(JSON.stringify(obj)));
                          }
                      } while (data.SVC_RT === '0000'); // 응답 상태 코드가 0000인 경우에만 반복
                  }

                  // 각 전화번호에 대해 통화 데이터를 정렬하고 복제하여 초기화
                  for (let c in tong) {
                      tong[c].sort((a, b) => { return a.NO - b.NO; });
                      tong[c] = { out: JSON.parse(JSON.stringify(tong[c])), in: [] };
                  }

                  calltype = "inbound"; // 수신 통화 유형
                  // 수신 통화 기록을 가져오는 반복문
                  for (let id of phoneNumbers) {
                      page = 0;
                      do {
                          page++;
                          query = { id, pass, calltype, page }; // 요청 쿼리 구성
                          res = await requestSystem(url + "?" + querystring.stringify(query), query, { headers: { "Content-Type": "application/json" } });
                          data = res.data;
                          if (data.DATAS === null) { // 더 이상 데이터가 없으면 반복 종료
                              break;
                          }
                          for (let obj of data.DATAS) { // 받은 데이터를 tong 객체에 저장
                              if (tong[callConst + obj.DST] !== undefined) {
                                  tong[callConst + obj.DST].in.push(JSON.parse(JSON.stringify(obj)));
                              }
                          }
                      } while (data.SVC_RT === '0000'); // 응답 상태 코드가 0000인 경우에만 반복
                  }

                  // 발신 및 수신 통화 기록을 각각 배열로 변환하여 정렬
                  outArr = [];
                  inArr = [];
                  for (let c in tong) {
                      for (let obj of tong[c].out) {
                          tempObj = {};
                          tempObj.date = stringToDate(obj.TIME); // 통화 날짜 변환
                          tempObj.to = autoHypenPhone(obj.DST); // 목적지 전화번호 변환
                          tempObj.duration = Number.isNaN(Number(obj.DURATION.replace(/[^0-9]/gi, ''))) ? 0 : Number(obj.DURATION.replace(/[^0-9]/gi, '')); // 통화 시간 변환
                          if (obj.STATUS === "OK") {
                              if (tempObj.duration >= successStandardSec) { // 통화 시간에 따라 성공 여부 결정
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
                          tempObj.date = stringToDate(obj.TIME); // 통화 날짜 변환
                          tempObj.from = autoHypenPhone(obj.SRC); // 출발지 전화번호 변환
                          tempObj.duration = Number.isNaN(Number(obj.DURATION.replace(/[^0-9]/gi, ''))) ? 0 : Number(obj.DURATION.replace(/[^0-9]/gi, '')); // 통화 시간 변환
                          if (obj.STATUS === "OK") {
                              if (tempObj.duration >= successStandardSec) { // 통화 시간에 따라 성공 여부 결정
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

                  // 날짜 순으로 발신 및 수신 통화 기록 정렬
                  outArr.sort((a, b) => { return a.date.valueOf() - b.date.valueOf(); });
                  inArr.sort((a, b) => { return a.date.valueOf() - b.date.valueOf(); });

                  // 발신 통화 기록을 클라이언트의 히스토리에 업데이트
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
                          if (boo) { // 히스토리에 동일한 기록이 없는 경우 추가
                              historyObj.curation.analytics.call.out.push({ date, success, duration });
                              whereQuery = { cliid };
                              updateQuery = {};
                              updateQuery["curation.analytics.call.out"] = historyObj.curation.analytics.call.out;
                              await back.updateHistory("client", [ whereQuery, updateQuery ], { selfMongo: selfConsoleInfo });
                          } else { // 히스토리에 동일한 기록이 있는 경우 업데이트
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

                          // 클라이언트의 요청 이력에 통화 기록 업데이트
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

                  // 수신 통화 기록을 클라이언트의 히스토리에 업데이트
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
                          if (boo) { // 히스토리에 동일한 기록이 없는 경우 추가
                              historyObj.curation.analytics.call.in.push({ date, success, duration });
                              whereQuery = { cliid };
                              updateQuery = {};
                              updateQuery["curation.analytics.call.in"] = historyObj.curation.analytics.call.in;
                              await back.updateHistory("client", [ whereQuery, updateQuery ], { selfMongo: selfConsoleInfo });
                          } else { // 히스토리에 동일한 기록이 있는 경우 업데이트
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

                  return true;

              } catch (e) {
                  return false;
              }
          }

          // 통화 기록 파싱 및 MongoDB 업데이트 후 로그 기록
          parsingCallHistory(instance.mongo).then((boo) => {
              if (boo) {
                  return logger.cron("callHistory update sync success : " + JSON.stringify(new Date()));
              } else {
                  return logger.alert("call history fail");
              }
          }).catch((err) => {
              logger.error(err, req).catch((e) => { console.log(e); });
          });

          // 요청에 대한 응답 전송
          res.send(JSON.stringify({ message: "will do" }));
      } catch (e) {
          // 에러 발생 시 로그 기록 및 클라이언트에 에러 메시지 전송
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /calendarSync
     * @description 이 라우터는 프로젝트의 일정과 관련된 데이터를 동기화하여 Google Calendar와 같은 외부 캘린더 시스템에 일정을 업데이트합니다.
     * @param {Object} req - 클라이언트의 요청 객체입니다.
     * @param {Object} res - 서버의 응답 객체로, 처리 결과를 JSON 형식으로 반환합니다.
     */
    router.post([ "/calendarSync" ], async function (req, res) {
      // 응답의 헤더를 설정합니다.
      res.set({
          "Content-Type": "application/json", // 응답의 형식을 JSON으로 설정
          "Access-Control-Allow-Origin": "*", // 모든 출처에 대해 CORS를 허용
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 설정
      });

      try {
          /**
           * @function calendarSyncFunc
           * @description 주어진 MongoDB 연결과 인덱스를 사용하여 프로젝트 일정을 동기화합니다.
           * @param {Object} MONGOC - MongoDB 커넥션 객체
           * @param {number} index - 현재 동기화 단계의 인덱스
           * @returns {boolean} 동기화 성공 여부를 반환합니다.
           */
          const calendarSyncFunc = async (MONGOC, index) => {
              try {
                  const selfMongo = MONGOC;
                  const today = new Date(); // 현재 날짜를 설정합니다.
                  const standardDay = new Date(); // 기준 날짜를 설정합니다.
                  const pastConst = 3; // 과거 3일을 기준으로 설정
                  standardDay.setDate(standardDay.getDate() - pastConst); // 기준 날짜에서 3일을 뺀 날짜로 설정

                  let projects, from; // 프로젝트 목록과 일정 유형을 저장할 변수
                  let clients, designers; // 클라이언트와 디자이너 정보를 저장할 변수
                  let client, designer; // 각각의 프로젝트에 해당하는 클라이언트와 디자이너를 저장할 변수
                  let title, list; // 일정의 제목과 기존 일정을 저장할 변수
                  let allEvents; // 모든 이벤트를 저장할 변수

                  // 첫 번째 동기화 유형은 촬영 일정입니다.
                  from = "photographing"; // 'photographing' 일정 타입으로 설정
                  
                  // 현재 활성화된 모든 'photographing' 프로젝트를 가져오기 위한 쿼리 실행
                  projects = await back.getProjectsByQuery({
                      $and: [
                          { "desid": { $regex: "^d" } }, // 디자이너 ID가 'd'로 시작하는 프로젝트를 필터링
                          { "contents.photo.date": { $gt: standardDay } }, // 촬영 날짜가 기준 날짜(현재로부터 3일 전) 이후인 프로젝트를 필터링
                          { "contents.photo.date": { $lt: new Date(3000, 0, 1) } }, // 촬영 날짜가 먼 미래 날짜 이전인 프로젝트를 필터링
                      ]
                  }, { selfMongo }); // MongoDB 인스턴스를 사용하여 쿼리 실행

                  // 조건에 맞는 프로젝트가 하나 이상 있을 경우 처리
                  if (projects.length > 0) {
                      // 프로젝트에 해당하는 클라이언트 정보를 가져오기 위한 쿼리 실행
                      clients = await back.getClientsByQuery({
                          $or: [ 
                              ...new Set(projects.toNormal().map((pr) => { return pr.cliid; })) // 각 프로젝트의 클라이언트 ID를 가져와서 중복 제거 후 필터링
                          ].map((c) => { return { cliid: c } }), // 필터링된 클라이언트 ID로 쿼리 생성
                      }, { selfMongo });

                      // 프로젝트에 해당하는 디자이너 정보를 가져오기 위한 쿼리 실행
                      designers = await back.getDesignersByQuery({
                          $or: [ 
                              ...new Set(projects.toNormal().map((pr) => { return pr.desid; })) // 각 프로젝트의 디자이너 ID를 가져와서 중복 제거 후 필터링
                          ].map((c) => { return { desid: c } }), // 필터링된 디자이너 ID로 쿼리 생성
                      }, { selfMongo });

                      // 현재 'photographing' 타입의 모든 이벤트를 캘린더에서 가져옴
                      allEvents = await calendar.listEvents(from);

                      // 각 프로젝트에 대해 일정 동기화 처리
                      for (let project of projects) {
                          // 프로젝트의 사진작가 정보가 '디자이너' 또는 '고객'이 아닌 경우에만 처리
                          if (!/디자이너/gi.test(project.contents.photo.info.photographer) && !/고객/gi.test(project.contents.photo.info.photographer)) {
                              // 프로젝트와 관련된 클라이언트 및 디자이너 정보를 가져옴
                              client = clients.toNormal().find((obj) => { return obj.cliid === project.cliid });
                              designer = designers.toNormal().find((obj) => { return obj.desid === project.desid });
                              
                              // 이벤트의 제목을 설정 (촬영에 대한 정보 포함)
                              title = `촬영 W ${client.name}C ${designer.designer}D ${project.contents.photo.info.photographer}P ${project.contents.photo.info.interviewer}I ${project.proid}`;
                              
                              // 현재 캘린더 이벤트 중 프로젝트 ID를 포함하는 이벤트를 필터링
                              list = allEvents.filter((obj) => { return (new RegExp(project.proid, "gi")).test(obj.title) });

                              // 필터링된 이벤트가 하나일 경우 해당 이벤트 업데이트
                              if (list.length === 1) {
                                  await calendar.updateSchedule(from, list[0].eventId, { start: project.contents.photo.date.toNormal(), title });
                              } 
                              // 필터링된 이벤트가 없을 경우 새로운 이벤트 생성
                              else if (list.length === 0) {
                                  await calendar.makeSchedule(from, title, '', project.contents.photo.date.toNormal());
                              } 
                              // 필터링된 이벤트가 여러 개일 경우 첫 번째 이벤트를 업데이트하고 나머지는 삭제
                              else {
                                  for (let i = 0; i < list.length; i++) {
                                      if (i === 0) {
                                          await calendar.updateSchedule(from, list[i].eventId, { start: project.contents.photo.date.toNormal(), title });
                                      } else {
                                          await calendar.deleteSchedule(from, list[i].eventId);
                                      }
                                  }
                              }
                          } 
                          // 사진작가 정보에 '디자이너' 또는 '고객'이 포함된 경우 관련 이벤트를 모두 삭제
                          else {
                              list = allEvents.filter((obj) => { return (new RegExp(project.proid, "gi")).test(obj.title) });
                              if (list.length !== 0) {
                                  for (let i = 0; i < list.length; i++) {
                                      await calendar.deleteSchedule(from, list[i].eventId);
                                  }
                              }
                          }
                      }
                  }

                  // 두 번째 동기화 유형은 디자이너 미팅 일정입니다.
                  from = "designerMeeting"; // 'designerMeeting' 일정 타입으로 설정

                  // 디자이너 미팅이 예정된 모든 프로젝트를 가져오기 위한 쿼리 실행
                  projects = await back.getProjectsByQuery({
                      $and: [
                          { "desid": { $regex: "^d" } }, // 디자이너 ID가 'd'로 시작하는 프로젝트를 필터링
                          { "process.contract.meeting.date": { $gt: standardDay } }, // 미팅 날짜가 기준 날짜(현재로부터 3일 전) 이후인 프로젝트를 필터링
                          { "process.contract.meeting.date": { $lt: new Date(3000, 0, 1) } }, // 미팅 날짜가 먼 미래 날짜 이전인 프로젝트를 필터링
                      ]
                  }, { selfMongo });

                  // 조건에 맞는 프로젝트가 하나 이상 있을 경우 처리
                  if (projects.length > 0) {
                      // 프로젝트에 해당하는 클라이언트 정보를 가져오기 위한 쿼리 실행
                      clients = await back.getClientsByQuery({
                          $or: [ 
                              ...new Set(projects.toNormal().map((pr) => { return pr.cliid; })) // 각 프로젝트의 클라이언트 ID를 가져와서 중복 제거 후 필터링
                          ].map((c) => { return { cliid: c } }), // 필터링된 클라이언트 ID로 쿼리 생성
                      }, { selfMongo });

                      // 프로젝트에 해당하는 디자이너 정보를 가져오기 위한 쿼리 실행
                      designers = await back.getDesignersByQuery({
                          $or: [ 
                              ...new Set(projects.toNormal().map((pr) => { return pr.desid; })) // 각 프로젝트의 디자이너 ID를 가져와서 중복 제거 후 필터링
                          ].map((c) => { return { desid: c } }), // 필터링된 디자이너 ID로 쿼리 생성
                      }, { selfMongo });

                      // 디자이너 미팅에 대한 모든 이벤트를 캘린더에서 가져옴
                      allEvents = await calendar.listEvents(from);

                      // 각 프로젝트에 대해 일정 동기화 처리
                      for (let project of projects) {
                          // 프로젝트와 관련된 클라이언트 및 디자이너 정보를 가져옴
                          client = clients.toNormal().find((obj) => { return obj.cliid === project.cliid });
                          designer = designers.toNormal().find((obj) => { return obj.desid === project.desid });

                          // 이벤트의 제목을 설정 (미팅에 대한 정보 포함)
                          title = `현장 미팅 W ${client.name}C ${designer.designer}D ${project.proid}`;
                          
                          // 현재 캘린더 이벤트 중 프로젝트 ID를 포함하는 이벤트를 필터링
                          list = allEvents.filter((obj) => { return (new RegExp(project.proid, "gi")).test(obj.title) });

                          // 필터링된 이벤트가 하나일 경우 해당 이벤트 업데이트
                          if (list.length === 1) {
                              await calendar.updateSchedule(from, list[0].eventId, { start: project.process.contract.meeting.date.toNormal(), title });
                          } 
                          // 필터링된 이벤트가 없을 경우 새로운 이벤트 생성
                          else if (list.length === 0) {
                              await calendar.makeSchedule(from, title, '', project.process.contract.meeting.date.toNormal());
                          } 
                          // 필터링된 이벤트가 여러 개일 경우 첫 번째 이벤트를 업데이트하고 나머지는 삭제
                          else {
                              for (let i = 0; i < list.length; i++) {
                                  if (i === 0) {
                                      await calendar.updateSchedule(from, list[i].eventId, { start: project.process.contract.meeting.date.toNormal(), title });
                                  } else {
                                      await calendar.deleteSchedule(from, list[i].eventId);
                                  }
                              }
                          }
                      }
                  }

                  return true;

              } catch (e) {
                  return false; // 에러 발생 시 false 반환
              }
          }

          // calendarSyncFunc 함수를 실행하여 캘린더를 동기화합니다.
          calendarSyncFunc(instance.mongo, 0).then((boo) => {
              if (boo) {
                  // 첫 번째 동기화가 성공했음을 로그에 기록
                  logger.cron("calendar sync success " + String(0) + " : " + JSON.stringify(new Date())).catch((err) => { console.log(err) });
              }
              // 두 번째 동기화를 실행
              return calendarSyncFunc(instance.mongo, 1);
          }).then((boo) => {
              if (boo) {
                  // 두 번째 동기화가 성공했음을 로그에 기록
                  return logger.cron("calendar sync success " + String(1) + " : " + JSON.stringify(new Date()));
              }
          }).catch((err) => {
              // 에러 발생 시 로그에 기록
              logger.error(err, req).catch((e) => { console.log(e); });
          });

          // 클라이언트에게 성공 메시지 전송
          res.send(JSON.stringify({ message: "will do" }));

      } catch (e) {
          // 에러 발생 시 로그에 기록하고 클라이언트에게 에러 메시지 전송
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /workProposalToClient
     * @description 클라이언트에게 작업 제안서를 동기화하는 작업을 처리하는 라우터입니다.
     * 작업 제안서를 동기화하고 로그를 기록하며, 오류 발생 시 오류 로그를 남깁니다.
     * @param {Object} req - 클라이언트의 요청 객체로, 특별한 본문 데이터를 필요로 하지 않습니다.
     * @param {Object} res - 서버의 응답 객체로, 처리 결과를 JSON 형식으로 반환합니다.
     */
    router.post([ "/workProposalToClient" ], async function (req, res) {
      
      // 응답 헤더를 설정합니다.
      // 'Content-Type'을 'application/json'으로 설정하여 응답 데이터가 JSON 형식임을 알립니다.
      // 'Access-Control-Allow-Origin'을 '*'로 설정하여 모든 도메인에서의 접근을 허용합니다.
      // 'Access-Control-Allow-Methods'를 'POST, GET, OPTIONS, HEAD'로 설정하여 이 HTTP 메서드들에 대해 접근을 허용합니다.
      // 'Access-Control-Allow-Headers'를 설정하여 클라이언트가 사용할 수 있는 HTTP 헤더를 정의합니다.
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });

      try {
        // 작업 제안서를 클라이언트에게 동기화하는 작업을 시작합니다.
        // 'cron' 모드로 동작하며, MongoDB 인스턴스를 전달하여 데이터베이스 작업을 수행합니다.
        work.setProposalToClient("cron", { selfMongo: instance.mongo })
          .then(() => {
            // 작업이 완료되면 로그에 동기화 완료 메시지를 기록합니다.
            return logger.cron("proposal to client sync done : " + JSON.stringify(new Date()));
          })
          .catch((err) => {
            // 작업 도중 오류가 발생하면 오류를 로그에 기록합니다.
            logger.error(err, req).catch((e) => { console.log(e); });
          });

        // 클라이언트에게 작업이 시작되었음을 알리는 메시지를 JSON 형식으로 응답합니다.
        res.send(JSON.stringify({ message: "will do" }));
      } catch (e) {
        // try 블록 내에서 발생한 오류를 처리합니다.
        // 오류 메시지를 로그에 기록하고 클라이언트에게 JSON 형식으로 오류 메시지를 응답합니다.
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /workProjectActionSync
     * @description 프로젝트 작업 동작을 동기화하는 요청을 처리하는 라우터입니다.
     * 이 라우터는 MongoDB 인스턴스를 사용하여 프로젝트 작업 동작을 동기화하고, 동기화 완료 여부를 로그로 기록합니다.
     * @param {Object} req - 클라이언트의 요청 객체로, 특별한 본문 데이터를 필요로 하지 않습니다.
     * @param {Object} res - 서버의 응답 객체로, 처리 결과를 JSON 형식으로 반환합니다.
     */
    router.post([ "/workProjectActionSync" ], async function (req, res) {

      // 응답 헤더를 설정합니다.
      // 'Content-Type'을 'application/json'으로 설정하여 응답 데이터가 JSON 형식임을 알립니다.
      // 'Access-Control-Allow-Origin'을 '*'로 설정하여 모든 도메인에서의 접근을 허용합니다.
      // 'Access-Control-Allow-Methods'를 'POST, GET, OPTIONS, HEAD'로 설정하여 이 HTTP 메서드들에 대해 접근을 허용합니다.
      // 'Access-Control-Allow-Headers'를 설정하여 클라이언트가 사용할 수 있는 HTTP 헤더를 정의합니다.
      res.set({
        "Content-Type": "application/json", // JSON 형식의 응답 데이터를 알림
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 지정
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 HTTP 헤더를 지정
      });

      try {
        // 프로젝트 작업 동작을 동기화하는 함수 호출
        // MongoDB 인스턴스를 전달하여 데이터베이스 작업을 수행
        work.projectActionSync({ 
          selfMongo: instance.mongo, // 작업에 사용할 MongoDB 인스턴스를 전달
          selfConsoleMongo: instance.mongo, // 콘솔에 사용할 MongoDB 인스턴스를 전달
          updateMongo: instance.mongo // 업데이트에 사용할 MongoDB 인스턴스를 전달
        }).then(() => {
          // 동기화 작업이 완료되면 로그에 완료 메시지를 기록
          return logger.cron("project action sync done : " + JSON.stringify(new Date()));
        }).catch((err) => {
          // 동기화 작업 중 오류가 발생하면 오류 로그를 기록
          logger.error(err, req).catch((e) => { console.log(e); });
        });

        // 클라이언트에게 작업이 시작되었음을 알리는 메시지를 JSON 형식으로 응답
        res.send(JSON.stringify({ message: "will do" }));
      } catch (e) {
        // try 블록 내에서 발생한 오류를 처리
        // 오류 메시지를 로그에 기록하고 클라이언트에게 JSON 형식으로 오류 메시지를 응답
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /photoStatusSync
     * @description 프로젝트의 사진 상태를 동기화하는 요청을 처리하는 라우터입니다.
     * MongoDB에서 프로젝트 데이터를 가져와서 특정 조건에 따라 사진 상태를 업데이트합니다.
     * 동기화가 완료되면 로그에 완료 메시지를 기록합니다.
     * @param {Object} req - 클라이언트의 요청 객체로, 특별한 본문 데이터를 필요로 하지 않습니다.
     * @param {Object} res - 서버의 응답 객체로, 처리 결과를 JSON 형식으로 반환합니다.
     */
    router.post([ "/photoStatusSync" ], async function (req, res) {

      // 응답 헤더를 설정합니다.
      // 'Content-Type'을 'application/json'으로 설정하여 응답 데이터가 JSON 형식임을 알립니다.
      // 'Access-Control-Allow-Origin'을 '*'로 설정하여 모든 도메인에서의 접근을 허용합니다.
      // 'Access-Control-Allow-Methods'를 'POST, GET, OPTIONS, HEAD'로 설정하여 이 HTTP 메서드들에 대해 접근을 허용합니다.
      // 'Access-Control-Allow-Headers'를 설정하여 클라이언트가 사용할 수 있는 HTTP 헤더를 정의합니다.
      res.set({
        "Content-Type": "application/json", // JSON 형식의 응답 데이터를 알림
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 지정
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 HTTP 헤더를 지정
      });

      try {
        // 비동기 함수 photoStatusSyncFunc를 정의하여 MongoDB 데이터를 동기화
        const photoStatusSyncFunc = async (MONGOC) => {
          try {
            const selfMongo = MONGOC; // MongoDB 연결 객체를 selfMongo로 저장
            const dummny = { // 기본 결제 상태 객체를 정의
              status: "결제 대기", // 초기 결제 상태는 "결제 대기"로 설정
              date: new Date(1800, 0, 1), // 초기 날짜 설정 (1800년 1월 1일)
              cancel: new Date(1800, 0, 1), // 초기 취소 날짜 설정 (1800년 1월 1일)
              calculation: { // 결제 계산 정보 초기화
                amount: 165000, // 기본 금액 설정
                info: {
                  method: "", // 결제 방법 초기화
                  proof: "", // 결제 증빙 초기화
                  to: "", // 결제 대상 초기화
                },
                refund: 0, // 환불 금액 초기화
              },
            };
            const collection = "project"; // 작업할 MongoDB 컬렉션 이름을 설정
            let allDesigners; // 모든 디자이너 데이터를 저장할 변수
            let whereQuery, updateQuery; // MongoDB 쿼리 문을 저장할 변수
            let rawProjects; // 모든 프로젝트 데이터를 저장할 변수
            let proid; // 프로젝트 ID를 저장할 변수
            let thisDummy; // 현재 처리 중인 더미 결제 상태를 저장할 변수
            let thisDesigner; // 현재 프로젝트와 관련된 디자이너를 저장할 변수
            let thisProof; // 결제 증빙 정보를 저장할 변수

            // MongoDB에서 모든 디자이너 정보를 가져옴
            allDesigners = (await back.getDesignersByQuery({}, { selfMongo })).toNormal();

            // MongoDB에서 모든 프로젝트 정보를 가져옴
            rawProjects = await selfMongo.db("miro81").collection(collection).find({}).toArray();
            for (let rawProject of rawProjects) { // 각 프로젝트에 대해 반복
              proid = rawProject.proid; // 현재 프로젝트의 ID를 설정
              thisDesigner = null; // 현재 디자이너 변수를 초기화
              
              // 프로젝트에 할당된 디자이너가 있다면 해당 디자이너 정보를 찾음
              if (rawProject.desid !== '') {
                thisDesigner = allDesigners.find((designer) => { return designer.desid === rawProject.desid });
                if (thisDesigner === undefined) {
                  thisDesigner = null;
                }
              }

              whereQuery = { proid }; // MongoDB 업데이트 쿼리의 조건 설정
              updateQuery = {}; // 업데이트할 데이터를 저장할 객체 초기화
              thisDummy = equalJson(JSON.stringify(dummny)); // dummny 객체를 깊은 복사하여 thisDummy로 설정

              if (rawProject.contents.photo.boo) { // 프로젝트에 사진 작업이 포함된 경우

                // 사진 작업의 날짜가 유효한 경우
                if ((new Date(2000, 0, 1)).valueOf() <= rawProject.contents.photo.date.valueOf() && (new Date(3000, 0, 1)).valueOf() > rawProject.contents.photo.date.valueOf()) {
                  // 현재 날짜가 사진 작업 날짜와 동일하거나 이후인 경우
                  if ((new Date()).valueOf() >= rawProject.contents.photo.date.valueOf()) {

                    // 사진 작업자가 디자이너 또는 고객이 아닌 경우
                    if (rawProject.contents.photo.info.photographer !== "디자이너" && rawProject.contents.photo.info.photographer !== "고객") {

                      if (rawProject.contents.photo.info.photographer !== "미정") {
                        updateQuery["contents.photo.status"] = "촬영 완료"; // 사진 상태를 "촬영 완료"로 설정
                      }

                    } else {

                      updateQuery["contents.photo.status"] = "해당 없음"; // 사진 상태를 "해당 없음"으로 설정
                      thisDummy.status = "해당 없음"; // 더미 결제 상태도 "해당 없음"으로 설정
                      thisDummy.calculation.amount = 0; // 금액을 0으로 설정
                      updateQuery["contents.payment"] = thisDummy; // 업데이트할 결제 정보를 설정

                    }

                  }
                } else {

                  // 사진 상태가 완료된 경우
                  if (/완료/gi.test(rawProject.contents.photo.status)) {
                    if (rawProject.contents.photo.info.photographer === "디자이너" || rawProject.contents.photo.info.photographer === "고객") {
                      if (rawProject.process.calculation.payments.remain.date > (new Date(2000, 0, 1)).valueOf()) {
                        updateQuery["contents.photo.status"] = "해당 없음"; // 사진 상태를 "해당 없음"으로 설정
                        updateQuery["contents.photo.date"] = rawProject.process.calculation.payments.remain.date; // 사진 날짜를 마지막 남은 결제 날짜로 설정
                        thisDummy.status = "해당 없음"; // 더미 결제 상태도 "해당 없음"으로 설정
                        thisDummy.calculation.amount = 0; // 금액을 0으로 설정
                        updateQuery["contents.payment"] = thisDummy; // 업데이트할 결제 정보를 설정
                      }
                    }
                  }

                }

              } else {
                updateQuery["contents.photo.status"] = "해당 없음"; // 사진 작업이 없는 경우 상태를 "해당 없음"으로 설정
                thisDummy.status = "해당 없음"; // 더미 결제 상태도 "해당 없음"으로 설정
                thisDummy.calculation.amount = 0; // 금액을 0으로 설정
                updateQuery["contents.payment"] = thisDummy; // 업데이트할 결제 정보를 설정
              }

              if (Object.keys(updateQuery).length > 0) {
                // MongoDB에서 해당 프로젝트의 사진 상태를 업데이트
                await selfMongo.db("miro81").collection(collection).updateOne(whereQuery, { $set: updateQuery });
              }

            }

            return true; // 동기화 성공 시 true를 반환
          } catch (e) {
            return false; // 동기화 중 오류 발생 시 false를 반환
          }
        }

        // 동기화 함수를 실행하고 결과를 로그에 기록
        photoStatusSyncFunc(instance.mongo).then((boo) => {
          if (boo) {
            return logger.cron("photoStatus sync done : " + JSON.stringify(new Date())); // 성공 시 완료 로그 기록
          }
        }).catch((err) => {
          logger.error(err, req).catch((e) => { console.log(e); }); // 오류 발생 시 오류 로그 기록
        });

        // 클라이언트에게 작업이 시작되었음을 알리는 메시지를 JSON 형식으로 응답
        res.send(JSON.stringify({ message: "will do" }));
      } catch (e) {
        // try 블록 내에서 발생한 오류를 처리
        // 오류 메시지를 로그에 기록하고 클라이언트에게 JSON 형식으로 오류 메시지를 응답
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /logBasicReport
     * @description 일일 마케팅 보고서를 생성하는 요청을 처리하는 라우터입니다.
     * 요청이 들어오면, 보고서 생성 작업을 비동기적으로 실행하고 그 결과를 로그에 기록합니다.
     * @param {Object} req - 클라이언트의 요청 객체로, 특별한 본문 데이터를 필요로 하지 않습니다.
     * @param {Object} res - 서버의 응답 객체로, 처리 결과를 JSON 형식으로 반환합니다.
     */
    router.post([ "/logBasicReport" ], async function (req, res) {

      // 응답 헤더를 설정하여 클라이언트에게 응답이 JSON 형식임을 알리고,
      // CORS(교차 출처 리소스 공유)를 허용하여 모든 도메인에서 이 엔드포인트에 접근할 수 있게 합니다.
      res.set({
          "Content-Type": "application/json", // 응답 데이터를 JSON 형식으로 지정
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서 접근을 허용
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 HTTP 헤더
      });

      try {
          // report.dailyReports 메서드를 호출하여 일일 마케팅 보고서를 생성합니다.
          report.dailyReports().then((boo) => { 
              // 보고서 생성이 성공적으로 완료된 경우
              if (boo) {
                  // 완료된 작업을 cron 로그에 기록합니다.
                  logger.cron("marketing reporting done").catch((err) => { console.log(err) });
              }
          }).catch((err) => {
              // 보고서 생성 중 에러가 발생한 경우, 에러를 로그에 기록합니다.
              logger.error(err, req).catch((e) => { console.log(e); });
          });

          // 클라이언트에게 작업이 시작되었음을 알리는 메시지를 JSON 형식으로 응답합니다.
          res.send(JSON.stringify({ message: "will do" }));
      } catch (e) {
          // try 블록 내에서 발생한 오류를 처리합니다.
          // 에러를 로그에 기록하고 클라이언트에게 JSON 형식으로 에러 메시지를 응답합니다.
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @route POST /readHomeliaisonAnalytics
     * @description 홈리에종 분석 데이터를 읽어오는 요청을 처리하는 라우터입니다.
     * 클라이언트의 요청에 따라 MongoDB에서 해당 조건의 데이터를 조회하여 반환합니다.
     * @param {Object} req - 클라이언트의 요청 객체로, whereQuery와 projectQuery(옵션)를 포함합니다.
     * @param {Object} res - 서버의 응답 객체로, 조회된 데이터를 JSON 형식으로 반환합니다.
     */
    router.post([ "/readHomeliaisonAnalytics" ], async function (req, res) {

      // 응답 헤더를 설정하여 클라이언트에게 응답이 JSON 형식임을 알리고,
      // CORS(교차 출처 리소스 공유)를 허용하여 모든 도메인에서 이 엔드포인트에 접근할 수 있게 합니다.
      res.set({
          "Content-Type": "application/json", // 응답 데이터를 JSON 형식으로 지정
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서 접근을 허용
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 HTTP 헤더
      });

      try {
          // 요청 본문에 whereQuery가 없을 경우, 잘못된 요청으로 간주하고 오류를 발생시킵니다.
          if (req.body.whereQuery === undefined) {
              throw new Error("invalid post"); // 에러 메시지로 "invalid post" 반환
          }

          // MongoDB 인스턴스를 가져옵니다.
          const selfMongo = instance.mongo;

          // 클라이언트 요청에서 whereQuery를 가져와 equalJson 메서드로 깊은 복사를 수행합니다.
          const { whereQuery } = equalJson(JSON.stringify(req.body));

          // 조회할 컬렉션 이름을 정의합니다.
          const collection = "homeliaisonAnalytics";

          // 조회 결과를 담을 변수와 projectQuery가 사용되는지 여부를 확인하는 변수를 초기화합니다.
          let rows, projectQuery;
          let projectBoo;

          // 요청에 projectQuery가 포함되어 있는지 확인합니다.
          if (req.body.projectQuery === undefined) {
              projectBoo = false; // projectQuery가 없으면 false로 설정
              projectQuery = null; // projectQuery를 null로 설정
          } else {
              projectBoo = true; // projectQuery가 있으면 true로 설정
              // 클라이언트 요청에서 projectQuery를 가져와 equalJson 메서드로 깊은 복사를 수행합니다.
              ({ projectQuery } = equalJson(JSON.stringify(req.body)));
          }

          // projectQuery가 있을 경우, 프로젝트 쿼리와 함께 데이터를 조회합니다.
          if (projectBoo) {
              rows = await back.mongoPick(collection, [ whereQuery, projectQuery ], { selfMongo });
          } else {
              // projectQuery가 없을 경우, whereQuery만으로 데이터를 조회합니다.
              rows = await back.mongoRead(collection, whereQuery, { selfMongo });
          }

          // 조회된 데이터가 배열이 아닌 경우, 빈 배열로 초기화합니다.
          if (!Array.isArray(rows)) {
              rows = [];
          }

          // 조회된 데이터를 클라이언트에게 JSON 형식으로 응답합니다.
          res.send(JSON.stringify({ data: rows }));
      } catch (e) {
          // 오류가 발생하면 에러를 로그에 기록하고 클라이언트에게 에러 메시지를 JSON 형식으로 응답합니다.
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @route POST /storeClientAnalytics
     * @description 클라이언트의 분석 데이터를 저장하는 요청을 처리하는 라우터입니다.
     * 이 라우터는 클라이언트 데이터를 분석하고 저장하는 작업을 수행합니다.
     * 일반 모드와 빠른 모드가 있으며, 요청 본문의 fast 파라미터에 따라 작동 모드가 결정됩니다.
     * @param {Object} req - 클라이언트의 요청 객체로, fast 파라미터를 포함합니다.
     * @param {Object} res - 서버의 응답 객체로, 처리 결과를 JSON 형식으로 반환합니다.
     */
    router.post([ "/storeClientAnalytics" ], async function (req, res) {

      // 응답 헤더를 설정하여 클라이언트에게 JSON 형식의 응답을 알리고 CORS 설정을 적용합니다.
      res.set({
          "Content-Type": "application/json", // 응답 데이터를 JSON 형식으로 지정
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서 접근을 허용
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드 설정
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 HTTP 헤더 설정
      });

      try {
          // MongoDB 인스턴스를 가져옵니다.
          const selfCoreMongo = instance.mongo;

          // 분석 대상 클라이언트를 필터링하기 위한 기준 날짜 설정
          const fromDate = new Date(2023, 4, 4, 0, 0, 0); // 2023년 5월 4일 0시 0분 0초 기준
          // 요청 본문의 fast 파라미터에 따라 빠른 모드인지 여부를 설정합니다.
          const fastMode = ((req.body.fast === "true" || req.body.fast === true) ? true : false);

          // 빠른 모드가 아닌 경우(기본 모드)
          if (!fastMode) {
              let agoDate = new Date(); // 일주일 전을 계산하기 위한 현재 날짜 복사
              agoDate.setDate(agoDate.getDate() - 7); // 7일을 뺀 날짜를 설정

              let fiveMonthAgo = new Date(); // 5개월 전을 계산하기 위한 현재 날짜 복사
              fiveMonthAgo.setMonth(fiveMonthAgo.getMonth() - 5); // 5개월을 뺀 날짜를 설정

              // 최근 요청이 있는 클라이언트를 가져옵니다.
              let targetClients = (await back.getClientsByQuery({
                  $and: [
                      {
                          "requests": {
                              $elemMatch: {
                                  "request.timeline": {
                                      $gte: fromDate,
                                  }
                              }
                          }
                      },
                      {
                          "requests": {
                              $elemMatch: {
                                  "analytics.response.status": {
                                      $regex: "^[응장]"
                                  }
                              }
                          }
                      }
                  ]
              }, { selfMongo: selfCoreMongo })).toNormal();

              // 5개월 이내에 요청이 있었던 클라이언트를 추가로 가져옵니다.
              let targetClients2 = (await back.getClientsByQuery({
                  $and: [
                      {
                          "requests": {
                              $elemMatch: {
                                  "request.timeline": {
                                      $gte: fiveMonthAgo,
                                  }
                              }
                          }
                      },
                      {
                          "requests": {
                              $elemMatch: {
                                  "analytics.response.status": {
                                      $regex: "^[진응장]"
                                  }
                              }
                          }
                      }
                  ]
              }, { selfMongo: selfCoreMongo })).toNormal();

              // 일주일 이내에 요청이 있었던 클라이언트를 가져옵니다.
              let agoClients = (await back.getClientsByQuery({
                  "requests": {
                      $elemMatch: {
                          "request.timeline": {
                              $gte: agoDate,
                          }
                      }
                  }
              }, { selfMongo: selfCoreMongo })).toNormal();

              // 중복 제거를 위해 클라이언트 리스트를 결합하고 필터링합니다.
              let targets = targetClients.concat(agoClients).concat(targetClients2);
              let finalTargets = [];
              for (let client of targets) {
                  if (!finalTargets.map((c) => { return c.cliid }).includes(client.cliid)) {
                      finalTargets.push(client);
                  }
              }

              // 클라이언트 메트릭을 분석하고 저장하는 비동기 작업을 수행합니다.
              analytics.clientsMetric(finalTargets, instance.mongo, instance.mongo, instance.mongo, true, false).then((result) => {
                  if (Array.isArray(result)) {
                      logger.cron("client analytics store success : " + JSON.stringify(new Date())).catch((err) => { console.log(err) });
                  }
              }).catch((err) => {
                  logger.error(err, req).catch((e) => { console.log(e); });
              });

              // 작업이 시작되었음을 클라이언트에게 응답합니다.
              res.send(JSON.stringify({ message: "will do" }));

          } else {
              // 빠른 모드로 작동할 경우
              let targetClients = (await back.getClientsByQuery({
                  $and: [
                      {
                          "requests": {
                              $elemMatch: {
                                  "request.timeline": {
                                      $gte: fromDate,
                                  }
                              }
                          }
                      },
                      {
                          "requests": {
                              $elemMatch: {
                                  "analytics.response.status": {
                                      $regex: "^[응]"
                                  }
                              }
                          }
                      }
                  ]
              }, { selfMongo: selfCoreMongo })).toNormal();

              // 분석할 클라이언트를 배열에 추가합니다.
              let finalTargets = [];
              for (let client of targetClients) {
                  finalTargets.push(client);
              }

              // 빠른 모드에서 클라이언트 메트릭을 분석하고 저장하는 비동기 작업을 수행합니다.
              analytics.clientsMetric(finalTargets, instance.mongo, instance.mongo, instance.mongo, true, true).then((result) => {
                  if (Array.isArray(result)) {
                      logger.cron("client analytics store success (fast) : " + JSON.stringify(new Date())).catch((err) => { console.log(err) });
                  }
              }).catch((err) => {
                  logger.error(err, req).catch((e) => { console.log(e); });
              });

              // 작업이 시작되었음을 클라이언트에게 응답합니다.
              res.send(JSON.stringify({ message: "will do" }));
          }

      } catch (e) {
          // 오류가 발생하면 에러를 로그에 기록하고 클라이언트에게 에러 메시지를 JSON 형식으로 응답합니다.
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });

    /**
     * @route POST /fixClientAnalytics
     * @description 클라이언트의 분석 데이터를 수정하는 요청을 처리하는 라우터입니다.
     * 이 라우터는 클라이언트 분석 데이터를 수정하는 작업을 수행합니다.
     * 클라이언트의 분석 데이터가 잘못된 경우 이를 수정하는 작업을 비동기적으로 처리합니다.
     * @param {Object} req - 클라이언트의 요청 객체로, 특별한 본문 데이터를 필요로 하지 않습니다.
     * @param {Object} res - 서버의 응답 객체로, 처리 결과를 JSON 형식으로 반환합니다.
     */
    router.post([ "/fixClientAnalytics" ], async function (req, res) {

      // 응답 헤더를 설정하여 클라이언트에게 JSON 형식의 응답을 알리고 CORS 설정을 적용합니다.
      res.set({
          "Content-Type": "application/json", // 응답 데이터를 JSON 형식으로 지정
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서 접근을 허용
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드 설정
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 HTTP 헤더 설정
      });

      try {
          // MongoDB 로컬 인스턴스를 가져옵니다.
          const selfLogMongo = instance.mongolocal;

          // 클라이언트 분석 데이터를 수정하는 비동기 작업을 호출합니다.
          analytics.fixClientMetric(selfLogMongo).then((result) => {
              // 수정 작업이 완료되었음을 확인하고, 완료된 시간과 함께 로그를 기록합니다.
              if (result.message === "done") {
                  logger.cron("client analytics fix done : " + JSON.stringify(new Date())).catch((err) => { console.log(err) });
              }
          }).catch((err) => {
              // 수정 작업 중 오류가 발생한 경우 오류를 로그에 기록합니다.
              logger.error(err, req).catch((e) => { console.log(e); });
          });

          // 작업이 시작되었음을 클라이언트에게 응답합니다.
          res.send(JSON.stringify({ message: "will do" }));

      } catch (e) {
          // 오류가 발생하면 에러를 로그에 기록하고 클라이언트에게 에러 메시지를 JSON 형식으로 응답합니다.
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @route POST /getClientAnalytics
     * @description 클라이언트의 분석 데이터를 조회하는 요청을 처리하는 라우터입니다.
     * 이 라우터는 클라이언트의 분석 데이터를 텍스트 또는 데이터베이스의 최신 기록으로 반환합니다.
     * @param {Object} req - 클라이언트의 요청 객체로, cliid와 textMode를 포함합니다.
     * @param {Object} res - 서버의 응답 객체로, 처리 결과를 JSON 형식으로 반환합니다.
     */
    router.post([ "/getClientAnalytics" ], async function (req, res) {
      // 응답 헤더를 설정하여 클라이언트에게 JSON 형식의 응답을 알리고 CORS 설정을 적용합니다.
      res.set({
          "Content-Type": "application/json", // 응답 데이터를 JSON 형식으로 지정
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서 접근을 허용
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드 설정
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 HTTP 헤더 설정
      });

      try {
          // 요청 객체에서 cliid가 정의되지 않은 경우, 에러를 발생시킵니다.
          if (req.body.cliid === undefined) {
              throw new Error("invalid post");
          }

          // 요청 본문에서 cliid를 추출합니다. equalJson을 사용하여 deepcopy와 Date 객체 복원을 처리합니다.
          const { cliid } = equalJson(req.body);

          // 요청에서 textMode 플래그를 확인하여 텍스트 모드인지 여부를 결정합니다.
          const textMode = ((req.body.textMode === "true" || req.body.textMode === true) ? true : false);

          // 클라이언트 분석 데이터를 저장하는 컬렉션 이름을 가져옵니다.
          const collection = analytics.clientAnalyticsCollection;
          let textResult;
          let rows;

          // 텍스트 모드가 활성화된 경우
          if (textMode) {
              // 클라이언트 메시지를 가져오는 비동기 작업을 수행합니다.
              textResult = await analytics.clientMessage(cliid, instance.mongo, instance.mongolocal);

              // 텍스트 결과가 문자열일 경우, 이를 응답으로 반환합니다.
              if (typeof textResult === "string") {
                  res.send(JSON.stringify({ report: textResult }));
              } else {
                  // 텍스트 결과가 없으면 빈 문자열을 반환합니다.
                  res.send(JSON.stringify({ report: "" }));
              }
          } else {
              // 프로젝트 쿼리가 정의된 경우, MongoDB에서 해당 조건으로 데이터를 조회합니다.
              if (req.body.projectQuery !== undefined) {
                  const { projectQuery } = equalJson(req.body);
                  rows = await back.mongoPick(collection, [ { cliid }, projectQuery ], { selfMongo: instance.mongolocal });
              } else {
                  // 프로젝트 쿼리가 없는 경우, cliid를 기준으로 데이터를 조회합니다.
                  rows = await back.mongoRead(collection, { cliid }, { selfMongo: instance.mongolocal });
              }

              // 조회된 데이터가 있는 경우, 가장 최신의 데이터를 반환합니다.
              if (rows.length > 0) {
                  res.send(JSON.stringify({ data: rows[rows.length - 1] }));
              } else {
                  // 조회된 데이터가 없는 경우, null을 반환합니다.
                  res.send(JSON.stringify({ data: null }));
              }
          }

      } catch (e) {
          // 오류가 발생하면 에러를 로그에 기록하고 클라이언트에게 빈 보고서를 응답합니다.
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ report: "" }));
      }
    });
    
    /**
     * @route POST /storeRealtimeAnalytics
     * @description 실시간 분석 데이터를 저장하는 요청을 처리하는 라우터입니다.
     * 이 라우터는 MongoDB 인스턴스를 사용하여 실시간 분석 데이터를 수집하고 저장합니다.
     * @param {Object} req - 클라이언트의 요청 객체입니다. 특별한 본문 데이터는 필요하지 않습니다.
     * @param {Object} res - 서버의 응답 객체로, 처리 결과를 JSON 형식으로 반환합니다.
     */
    router.post([ "/storeRealtimeAnalytics" ], async function (req, res) {
      // 응답 헤더를 설정하여 클라이언트에게 JSON 형식의 응답을 알리고 CORS 설정을 적용합니다.
      res.set({
          "Content-Type": "application/json", // 응답 데이터를 JSON 형식으로 지정
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서 접근을 허용
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드 설정
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 HTTP 헤더 설정
      });

      try {
          // 실시간 분석 데이터를 수집하고 저장하는 비동기 작업을 실행합니다.
          analytics.realtimeMetric(instance.mongo, instance.mongolocal, true)
              .then((result) => {
                  // 결과가 배열 형태인 경우, 로그에 성공 메시지를 기록합니다.
                  if (Array.isArray(result)) {
                      logger.cron("realtime analytics store success : " + JSON.stringify(new Date()))
                          .catch((err) => { console.log(err) });
                  }
              })
              .catch((err) => {
                  // 오류가 발생하면 에러를 로그에 기록합니다.
                  logger.error(err, req).catch((e) => { console.log(e); });
              });
          
          // 클라이언트에게 처리 완료 메시지를 응답으로 보냅니다.
          res.send(JSON.stringify({ message: "will do" }));

      } catch (e) {
          // 예외가 발생한 경우, 에러를 로그에 기록하고 클라이언트에게 에러 메시지를 응답합니다.
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @route POST /naverComplex
     * @description 네이버 복합 모델링 데이터를 조회하고, 해당 데이터를 데이터베이스에 저장한 후 클라이언트에게 반환하는 라우터입니다.
     * @param {Object} req - 클라이언트의 요청 객체로, 요청 본문에 'id' 필드를 포함해야 합니다.
     * @param {Object} res - 서버의 응답 객체로, 처리 결과를 JSON 형식으로 반환합니다.
     */
    router.post([ "/naverComplex" ], async function (req, res) {
      // 응답 헤더를 설정하여 클라이언트에게 JSON 형식의 응답을 알리고 CORS 설정을 적용합니다.
      res.set({
          "Content-Type": "application/json", // 응답 데이터를 JSON 형식으로 지정
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서 접근을 허용
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드 설정
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 HTTP 헤더 설정
      });

      try {
          // 요청 본문에 'id' 필드가 없으면 에러를 발생시킵니다.
          if (req.body.id === undefined) {
              throw new Error("invalid post");
          }

          const selfMongo = instance.mongolocal; // MongoDB 인스턴스를 가져옵니다.
          const collection = "addressComplex"; // MongoDB의 컬렉션 이름을 지정합니다.
          const { id } = equalJson(req.body); // 요청 본문에서 'id' 값을 추출합니다.
          let result;
          let rows;
          let naverResult;

          // 'id'가 문자열이 아닌 경우 에러를 발생시킵니다.
          if (typeof id !== "string") {
              throw new Error("invalid post");
          }
          // 'id'가 빈 문자열이면 에러를 발생시킵니다.
          if (id.trim() === '') {
              throw new Error("invalid id");
          }

          // MongoDB에서 'id'에 해당하는 데이터를 조회합니다.
          rows = await back.mongoRead(collection, { naver: id.trim() }, { selfMongo });
          
          // 조회된 데이터가 있을 경우, 그 데이터를 반환합니다.
          if (rows.length > 0) {
              result = rows[0]; // 첫 번째 결과를 가져옵니다.
              res.send(JSON.stringify(result)); // 결과를 JSON 형식으로 클라이언트에게 보냅니다.
          } 
          // 조회된 데이터가 없을 경우, 네이버 API를 통해 데이터를 가져옵니다.
          else if (rows.length === 0) {
              naverResult = await naver.complexModeling(id);
              // 네이버 API에서 가져온 결과가 null이면 에러를 발생시킵니다.
              if (naverResult === null) {
                  throw new Error("invalid id : " + id + ", no result");
              } else {
                  // 가져온 데이터를 MongoDB에 저장하고 클라이언트에게 반환합니다.
                  await back.mongoCreate(collection, naverResult, { selfMongo });
                  res.send(JSON.stringify(naverResult));
              }
          }

      } catch (e) {
          // 예외가 발생한 경우, 에러 메시지를 클라이언트에게 반환합니다.
          res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @route POST /naverComplexes
     * @description 클라이언트가 여러 개의 네이버 복합 모델링 ID를 제공하면, 해당 ID들에 대한 데이터를 MongoDB에서 조회하여 반환하는 라우터입니다.
     * @param {Object} req - 클라이언트의 요청 객체로, 요청 본문에 'idArr' 필드가 포함되어야 합니다. 'idArr'는 네이버 복합 모델링 ID의 배열입니다.
     * @param {Object} res - 서버의 응답 객체로, 처리 결과를 JSON 형식으로 반환합니다.
     */
    router.post([ "/naverComplexes" ], async function (req, res) {
      // 응답 헤더를 설정하여 클라이언트에게 JSON 형식의 응답을 알리고 CORS 설정을 적용합니다.
      res.set({
          "Content-Type": "application/json", // 응답 데이터를 JSON 형식으로 지정
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서 접근을 허용
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드 설정
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 HTTP 헤더 설정
      });

      try {
          // 요청 본문에 'idArr' 필드가 없으면 에러를 발생시킵니다.
          if (req.body.idArr === undefined) {
              throw new Error("invalid post"); // 'idArr' 필드가 없을 때의 에러 처리
          }

          const { idArr } = equalJson(req.body); // 요청 본문에서 'idArr' 값을 추출합니다.
          
          // 'idArr'가 비어있는 배열일 경우 에러를 발생시킵니다.
          if (idArr.length === 0) {
              throw new Error("invalid post 2"); // 'idArr'이 빈 배열일 때의 에러 처리
          }

          const selfMongo = instance.mongolocal; // MongoDB 인스턴스를 가져옵니다.
          const collection = "addressComplex"; // MongoDB의 컬렉션 이름을 지정합니다.
          let rows;
          let result;

          // MongoDB에서 'idArr'에 있는 ID들 중에 해당하는 데이터를 조회합니다.
          rows = await back.mongoRead(collection, { $or: idArr.map((id) => { return { naver: id } }) }, { selfMongo });
          
          // 'idArr'의 각 ID에 대해 MongoDB에서 찾은 데이터를 매핑하여 반환합니다.
          result = idArr.map((id) => {
              return rows.find((o) => { return o.naver === id }) === undefined ? null : rows.find((o) => { return o.naver === id });
          });

          // 결과를 JSON 형식으로 클라이언트에게 보냅니다.
          res.send(JSON.stringify(result));

      } catch (e) {
          // 예외가 발생한 경우, 에러 메시지를 클라이언트에게 반환합니다.
          res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @route POST /printComplex
     * @description 클라이언트의 요청에 따라 특정 고객의 네이버 부동산 정보를 검색하고, 그 결과를 출력하는 라우터입니다.
     * 검색된 부동산 정보는 클라이언트의 요청 정보에 업데이트되며, 결과에 따라 특정 채널에 메시지를 전송할 수 있습니다.
     * @param {Object} req - 클라이언트의 요청 객체로, 'text', 'cliid', 'requestNumber' 필드가 포함되어야 합니다.
     * @param {Object} res - 서버의 응답 객체로, 처리 결과를 JSON 형식으로 반환합니다.
     */
    router.post([ "/printComplex" ], async function (req, res) {
      // 응답 헤더를 설정하여 클라이언트에게 JSON 형식의 응답을 알리고 CORS 설정을 적용합니다.
      res.set({
          "Content-Type": "application/json", // 응답 데이터를 JSON 형식으로 지정
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서 접근을 허용
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드 설정
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 HTTP 헤더 설정
      });

      try {
          // 필수 필드들이 요청에 포함되지 않았을 경우 에러를 발생시킵니다.
          if (req.body.text === undefined || req.body.cliid === undefined || req.body.requestNumber === undefined) {
              throw new Error("invalid post");
          }

          const selfMongo = instance.mongo; // MongoDB 인스턴스를 가져옵니다.
          const bar = "========================================================================"; // 출력할 때 사용할 구분선
          const { text, cliid } = equalJson(req.body); // 요청 본문에서 'text'와 'cliid' 값을 추출합니다.
          const mode = (req.body.mode === undefined ? "general" : req.body.mode ); // 모드를 설정합니다. 기본값은 'general'입니다.
          const requestNumber = Number(req.body.requestNumber); // 요청 번호를 숫자로 변환합니다.
          const client = await back.getClientById(cliid, { selfMongo }); // 고객 정보를 데이터베이스에서 가져옵니다.
          const targetAddress = client.requests[requestNumber].request.space.address.value.trim(); // 고객의 요청에서 주소를 추출합니다.
          const now = new Date(); // 현재 날짜와 시간을 가져옵니다.
          let finalText;
          let dateValue;
          let howLong;
          let naverId;
          let whereQuery, updateQuery;
          let originalArr, foundArr;

          /**
           * @function searchId
           * @description 네이버 부동산 ID를 검색하거나 기존 데이터를 반환하는 함수입니다.
           * @param {Object} client - 고객 객체입니다.
           * @param {Number} requestNumber - 요청 번호입니다.
           * @returns {Promise<String>} 네이버 부동산 ID를 반환하는 Promise입니다.
           */
          const searchId = (client, requestNumber) => {
              if (client.requests[requestNumber].request.space.naver !== "") {
                  return new Promise((resolve, reject) => {
                      resolve(client.requests[requestNumber].request.space.naver);
                  });
              } else {
                  return naver.complexSearch(targetAddress, true);
              }
          }

          finalText = text; // 최종 출력 텍스트 초기화
          naverId = ""; // 네이버 ID 초기화

          // 네이버 부동산 ID를 검색하고, 해당 ID로 상세 정보를 요청합니다.
          searchId(client, requestNumber).then((complexResult) => {
              if (typeof complexResult === "string" && /[0-9]/gi.test(complexResult)) {
                  return requestSystem("https://" + address.officeinfo.ghost.host + "/naverComplex", { id: complexResult.trim() }, { headers: {
                      "Content-Type": "application/json",
                  } });
              } else {
                  return (new Promise((resolve, reject) => { return resolve(null) }));
              }
          }).then((searchResult) => {
              if (searchResult !== null) {
                  if (typeof searchResult.data === "object") {
                      if (typeof searchResult.data.message === "string" && /error/gi.test(searchResult.data.message)) {
                          naverId = "";
                      } else {
                          // 검색된 네이버 부동산 정보가 클라이언트 요청의 주소와 일치하는지 확인합니다.
                          originalArr = targetAddress.split(" ").map((str) => { return str.trim().replace(/[시도군구]$/gi, '') });
                          foundArr = searchResult.data.address.value.split(" ").map((str) => { return str.trim().replace(/[시도군구]$/gi, '') });

                          if ((new RegExp("^" + foundArr[0].slice(0, 1), "gi")).test(originalArr[0]) && (new RegExp("^" + foundArr[1].slice(0, 1), "gi")).test(originalArr[1])) {
                              naverId = searchResult.data.naver;

                              finalText += "\n\n";
                              finalText += client.name + "(" + client.cliid + ") " + "네이버 부동산 정보 - " + searchResult.data.name;
                              finalText += "\n";
                              finalText += bar;
                              finalText += "\n";

                              finalText += "아파트명 : " + searchResult.data.name + "\n";
                              finalText += "주소 : " + searchResult.data.address.value + "\n";
                              finalText += "사용승인일 : " + dateToString(equalJson(searchResult.data).information.date);

                              dateValue = (((((now.valueOf() - (equalJson(searchResult.data).information.date).valueOf()) / 1000) / 60) / 60) / 24) / 365;
                              howLong = String(Math.floor(dateValue)) + "년 " + String(Math.floor((dateValue % 1) * 12)) + "개월차";

                              finalText += " / " + howLong + " 아파트" + "\n";

                              finalText += "총 세대수 : " + String(searchResult.data.information.count.household) + "세대" + "\n";
                              finalText += bar;
                              finalText += "\n";
                              finalText += "타입 개수 : " + String(searchResult.data.information.type.length) + "개" + "\n";
                              for (let obj of searchResult.data.information.type.detail) {
                                  finalText += obj.name;
                                  finalText += " (" + String(obj.area.pyeong) + "평 / " + String(obj.area.exclusivePyeong) + "평) - ";
                                  finalText += "방 : " + String(obj.count.room) + "개" + " / ";
                                  finalText += "화장실 : " + String(obj.count.bathroom) + "개" + "\n";
                              }
                              finalText += bar;
                          } else {
                              naverId = "";
                          }

                      }
                  } else {
                      naverId = "";
                  }
              } else {
                  naverId = "";
              }

              // 클라이언트의 요청 정보에 네이버 부동산 ID를 업데이트합니다.
              whereQuery = { cliid };
              updateQuery = {};
              updateQuery["requests." + String(requestNumber) + ".request.space.naver"] = naverId;

              return back.updateClient([ whereQuery, updateQuery ], { selfMongo });
          }).then(() => {
              if (mode === "general") {
                  // 일반 모드에서는 추가 작업을 하지 않습니다.
              } else if (mode === "update") {
                  // 업데이트 모드에서는 네이버 부동산 ID를 찾은 경우, 채널에 메시지를 전송합니다.
                  if (naverId !== "") {
                      logger.log("Static lounge 네이버 부동산 아이디 찾고 업데이트 성공함 : " + cliid + " / " + naverId).catch((err) => {
                          console.log(err);
                      });
                      return messageSend({ text: client.name + "(" + client.cliid + ")" + " 고객님의 네이버 부동산 찾기를 완료하였어요.\nlink : https://new.land.naver.com/complexes/" + naverId, channel: "#400_customer", voice: true, fairy: true });
                  } else {
                      return messageSend({ text: client.name + "(" + client.cliid + ")" + " 고객님의 네이버 부동산 찾기에 실패하였어요.", channel: "#400_customer", voice: true, fairy: true });
                  }
              }
          }).catch((err) => {
              // 예외가 발생한 경우, 로그에 에러를 기록합니다.
              logger.error(err, req).catch((e) => { console.log(e); });
          });

          // 클라이언트에게 처리 중임을 알리는 응답을 반환합니다.
          res.send(JSON.stringify({ message: "will do" }));

      } catch (e) {
          // 예외가 발생한 경우, 에러 메시지를 클라이언트에게 반환합니다.
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @route POST /complexReport
     * @description 클라이언트의 특정 기간 동안의 단지에 대한 복합적인 보고서를 요청할 때 사용하는 라우터입니다. 
     * 이 라우터는 클라이언트, 프로젝트, 캠페인, 계약 등의 다양한 데이터를 분석하고 보고서 형태로 반환합니다.
     * @param {Object} req - 클라이언트의 요청 객체로, 'fromDate'와 'toDate'가 포함되어야 합니다.
     * @param {Object} res - 서버의 응답 객체로, 처리 결과를 JSON 형식으로 반환합니다.
     */
    router.post([ "/complexReport" ], async function (req, res) {
      // 응답 헤더를 설정하여 JSON 형식의 응답과 CORS 설정을 적용합니다.
      res.set({
          "Content-Type": "application/json", // 응답 데이터를 JSON 형식으로 지정
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서 접근을 허용
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드 설정
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용된 HTTP 헤더 설정
      });

      try {
        // 필수 필드가 요청에 포함되지 않은 경우 에러를 발생시킵니다.
        if (req.body.fromDate === undefined || req.body.toDate === undefined) {
            throw new Error("invalid post");
        }

        const { fromDate, toDate } = equalJson(req.body); // 요청 본문에서 fromDate와 toDate를 추출합니다.
        const selfMongo = instance.mongo; // MongoDB 인스턴스를 가져옵니다.
        const selfLocalMongo = instance.mongo; // 로컬 MongoDB 인스턴스를 가져옵니다.
        const selfConsoleMongo = instance.mongo; // 콘솔용 MongoDB 인스턴스를 가져옵니다.
        const selfLogMongo = instance.mongo; // 로그용 MongoDB 인스턴스를 가져옵니다.
        const unknownKeyword = "unknown"; // 기본값으로 사용할 문자열을 정의합니다.
        const proposalStandardDate = new Date(2021, 8, 1); // 제안 기준일을 정의합니다.
        const proposalStandardDateValue = proposalStandardDate.valueOf(); // 기준일의 timestamp를 가져옵니다.
        const fromAgoDate = new Date(JSON.stringify(fromDate).slice(1, -1)); // fromDate의 날짜 정보를 설정합니다.
        fromAgoDate.setMonth(fromAgoDate.getMonth() - 3); // fromDate를 3개월 전으로 설정합니다.

        // 주어진 기간 내의 클라이언트를 가져옵니다.
        const motherClients_rawRaw = await back.getClientsByQuery({
            $and: [
                {
                    requests: {
                        $elemMatch: {
                            "request.timeline": { $gte: fromAgoDate } // 3개월 전 날짜 이후의 타임라인을 가진 요청
                        }
                    }
                },
                {
                    requests: {
                        $elemMatch: {
                            "request.timeline": { $lt: toDate } // toDate 이전의 타임라인을 가진 요청
                        }
                    }
                }
            ]
        }, { selfMongo, withTools: true });

        // 클라이언트 요청을 정제하여 사용할 데이터로 변환합니다.
        const motherClients_raw = motherClients_rawRaw.getRequestsTong().map((arr) => { 
            let obj = arr[0].toNormal(); 
            obj.cliid = arr.cliid; 
            obj.name = arr.name; 
            obj.analytics = arr[1].toNormal(); 
            return obj; 
        });

        // 타임라인이 fromDate와 toDate 사이인 클라이언트를 필터링합니다.
        const motherClients = motherClients_raw.filter((obj) => {
            return obj.timeline.valueOf() >= fromDate.valueOf() && obj.timeline.valueOf() < toDate.valueOf();
        });

        // 클라이언트 히스토리 데이터를 MongoDB에서 가져옵니다.
        const motherClientHistories = await back.mongoPick("clientHistory", [ {
            $or: motherClients.map((o) => { return { cliid: o.cliid } }),
        }, { cliid: 1, manager: 1, curation: 1 } ], { selfMongo: selfConsoleMongo });

        // 프로젝트 데이터를 MongoDB에서 가져옵니다.
        const motherProjects_raw = (await back.getProjectsByQuery({
            $or: motherClients.map((o) => { return { cliid: o.cliid } }).concat([
                {
                    "process.contract.first.date": {
                        $gte: fromDate
                    }
                }
            ]),
        }, { selfMongo })).toNormal();

        // fromDate와 toDate 사이에 계약이 발생한 프로젝트만 필터링합니다.
        const motherProjects = motherProjects_raw.filter((obj) => {  
            return obj.process.contract.first.date.valueOf() >= fromDate.valueOf() && obj.process.contract.first.date.valueOf() < toDate.valueOf();
        });

        motherProjects.sort((a, b) => { return a.proposal.date.valueOf() - b.proposal.date.valueOf() });

        const standardDate = new Date(JSON.stringify(motherProjects[0].proposal.date).slice(1, -1));
        standardDate.setMonth(standardDate.getMonth() - 3); // 첫 제안 날짜를 기준으로 3개월 전을 기준일로 설정합니다.

        // 진행 중인 클라이언트 계약 데이터를 필터링합니다.
        const motherContracts = motherClients_raw.filter((obj) => {
            return motherProjects.map((o) => { return o.cliid }).includes(obj.cliid);
        }).filter((obj) => {
            return obj.analytics.response.status === "진행" && obj.timeline.valueOf() > standardDate.valueOf();
        });

        // MongoDB에서 일일 분석 데이터를 읽어옵니다.
        const motherAnalytics = await back.mongoRead("dailyAnalytics", {
            $and: [
                {
                    "date.from": { $gte: fromDate }
                },
                {
                    "date.from": { $lt: toDate }
                },
            ]
        }, { selfMongo: selfLogMongo });

        // MongoDB에서 일일 클라이언트 데이터를 읽어옵니다.
        const motherClientsAnalytics = await back.mongoRead("dailyClients", {
            $and: [
                {
                    "date.from": { $gte: fromDate }
                },
                {
                    "date.from": { $lt: toDate }
                },
            ]
        }, { selfMongo: selfLogMongo });

        // MongoDB에서 일일 캠페인 데이터를 읽어옵니다.
        const motherCampaign = await back.mongoRead("dailyCampaign", {
            $and: [
                {
                    "date.from": { $gte: fromDate }
                },
                {
                    "date.from": { $lt: toDate }
                },
            ]
        }, { selfMongo: selfLogMongo });
        let thisIdArr;
        let response;
        let consultingAparts, contractAparts;
        let regionSet;
        let pyeongSet;
        let sourceSet;
        let budgetSet;
        let adSet;
        let contractSet;
        let address;
        let thisNaver;
        let oldSet;
        let thisOld;
        let dateValue;
        let howLong;
        let returnSet;
        let usersArr;
        let targetUsers;
        let targetUserObject;
        let sourceArr;
        let campaignArr;
        let deviceArr;
        let deviceSet;
        let household;
        let targetType;
        let floor;
        let room;
        let floorSet;
        let roomSet;
        let householdSet;
        let livingSet;
        let living;
        let graphObject;
        let consultingSet, finalContractSet;
        let thisValue;
        let finalObject;
        let cliidArr_raw;
        let process;
        let histories;
        let proposalLength;
        let cliid;
        let timeline;
        let budget;
        let resident;
        let addressRaw;
        let pyeong;
        let contract;
        let naver;
        let foundProject;
    
        // 각 클라이언트에 대해 네이버 부동산 정보 및 각종 분석 결과를 요청하고 처리합니다.
        thisIdArr = motherClients.map((obj) => { return obj.space.naver }).filter((obj) => { return obj.trim() !== "" });
        response = await requestSystem("https://office.home-liaison.net:3000/naverComplexes", { idArr: thisIdArr }, { headers: { "Content-Type": "application/json" } });
        consultingAparts = equalJson(JSON.stringify(response.data.filter((str) => { return str !== null })));
    
        thisIdArr = motherContracts.map((obj) => { return obj.space.naver }).filter((obj) => { return obj.trim() !== "" });
        response = await requestSystem("https://office.home-liaison.net:3000/naverComplexes", { idArr: thisIdArr }, { headers: { "Content-Type": "application/json" } });
        contractAparts = equalJson(JSON.stringify(response.data.filter((str) => { return str !== null })));
    
        usersArr = equalJson(JSON.stringify(motherClientsAnalytics.map((o) => { return o.data.detail }).flat()));
    
        // 보고서 작성을 위한 다양한 설정 초기화
        returnSet = (motherClients, consultingAparts) => {
          regionSet = [
            {
              case: "서울",
              value: 0,
            },
            {
              case: "경기",
              value: 0,
            },
            {
              case: "충청",
              value: 0,
            },
            {
              case: "강원",
              value: 0,
            },
            {
              case: "경상",
              value: 0,
            },
            {
              case: "전라",
              value: 0,
            },
            {
              case: "제주",
              value: 0,
            },
            {
              case: "기타",
              value: 0,
            },
          ];
          pyeongSet = [
            {
              case: "10평 미만",
              value: 0,
            },
            {
              case: "10평대",
              value: 0,
            },
            {
              case: "20평대",
              value: 0,
            },
            {
              case: "30평대",
              value: 0,
            },
            {
              case: "40평대",
              value: 0,
            },
            {
              case: "50평대",
              value: 0,
            },
            {
              case: "60평 이상",
              value: 0,
            }
          ];
          sourceSet = [
            {
              case: "메타",
              value: 0,
            },
            {
              case: "네이버",
              value: 0,
            },
            {
              case: "구글",
              value: 0,
            },
            {
              case: "유튜브",
              value: 0,
            },
            {
              case: "카카오",
              value: 0,
            },
            {
              case: "기타",
              value: 0,
            }
          ];
          budgetSet = [
            {
              case: "500만원 이하",
              value: 0,
            },
            {
              case: "1,000만원대",
              value: 0,
            },
            {
              case: "2,000만원대",
              value: 0,
            },
            {
              case: "3,000만원대",
              value: 0,
            },
            {
              case: "4,000만원대",
              value: 0,
            },
            {
              case: "5,000만원대",
              value: 0,
            },
            {
              case: "6,000만원대",
              value: 0,
            },
            {
              case: "7,000만원대",
              value: 0,
            },
            {
              case: "8,000만원대",
              value: 0,
            },
            {
              case: "9,000만원대",
              value: 0,
            },
            {
              case: "1억원대",
              value: 0,
            },
          ];
          adSet = [
            {
              case: "광고 유입",
              value: 0,
            },
            {
              case: "비광고",
              value: 0,
            },
          ];
          contractSet = [
            {
              case: "자가",
              value: 0,
            },
            {
              case: "전월세",
              value: 0,
            },
          ];
          oldSet = [
            {
              case: "예정 1년 이내",
              value: 0,
            },
            {
              case: "예정 1년 ~ 2년 이내",
              value: 0,
            },
            {
              case: "예정 2년 ~ 3년 이내",
              value: 0,
            },
            {
              case: "예정 3년 초과",
              value: 0,
            },
            {
              case: "3년 이하",
              value: 0,
            },
            {
              case: "3년 초과 5년 이하",
              value: 0,
            },
            {
              case: "5년 초과 10년 이하",
              value: 0,
            },
            {
              case: "10년 초과 20년 이하",
              value: 0,
            },
            {
              case: "20년 초과 30년 이하",
              value: 0,
            },
            {
              case: "30년 초과",
              value: 0,
            },
            {
              case: "알 수 없음",
              value: 0,
            }
          ];
          deviceSet = [
            {
              case: "모바일",
              value: 0,
            },
            {
              case: "데스크탑",
              value: 0,
            },
            {
              case: "기타",
              value: 0,
            },
          ];
          floorSet = [
            {
              case: "10층 이하",
              value: 0,
            },
            {
              case: "20층 이하",
              value: 0,
            },
            {
              case: "30층 이하",
              value: 0,
            },
            {
              case: "30층 초과",
              value: 0,
            },
            {
              case: "알 수 없음",
              value: 0,
            },
          ];
          roomSet = [
            {
              case: "방 1개",
              value: 0,
            },
            {
              case: "방 2개",
              value: 0,
            },
            {
              case: "방 3개",
              value: 0,
            },
            {
              case: "방 4개",
              value: 0,
            },
            {
              case: "방 5개 이상",
              value: 0,
            },
            {
              case: "알 수 없음",
              value: 0,
            },
          ];
          householdSet = [
            {
              case: "500세대 이하",
              value: 0,
            },
            {
              case: "500세대 ~ 1000세대",
              value: 0,
            },
            {
              case: "1000세대 ~ 2000세대",
              value: 0,
            },
            {
              case: "2000세대 ~ 3000세대",
              value: 0,
            },
            {
              case: "3000세대 초과",
              value: 0,
            },
            {
              case: "알 수 없음",
              value: 0,
            },
          ];
          livingSet = [
            {
              case: "이사",
              value: 0,
            },
            {
              case: "거주중",
              value: 0,
            },
          ];
    
          for (let motherClient of motherClients) {
    
            ({ cliid, timeline, budget, space: { resident, address: addressRaw, pyeong, contract, naver } } = motherClient);
            motherClient.summary = {};
    
            targetUsers = [];
            if (usersArr.find((obj) => { return obj.cliid === cliid }) !== undefined) {
              targetUsers = usersArr.find((obj) => { return obj.cliid === cliid }).users;
            }
    
            if (targetUsers.length > 0) {
              targetUsers.forEach((o) => {
                o.history.sort((a, b) => {
                  return a.date.valueOf() - b.date.valueOf();
                })
              })
              targetUsers.sort((a, b) => {
                return a.history[0].date.valueOf() - b.history[0].date.valueOf();
              })
              targetUsers = targetUsers.map((o) => { return { source: o.source, device: o.device.kinds } });
    
              sourceArr = [];
              campaignArr = [];
              deviceArr = [];
              for (let userObject of targetUsers) {
                for (let str of userObject.source.mother) {
                  sourceArr.push(str);
                }
                for (let str of userObject.source.campaign) {
                  campaignArr.push(str);
                }
                deviceArr.push(userObject.device);
              }
    
              campaignArr = campaignArr.filter((str) => { return !/^link_/g.test(str) });
    
              targetUserObject = {
                source: sourceArr.length === 0 ? unknownKeyword : sourceArr.join(", "),
                campaign: campaignArr.length === 0 ? unknownKeyword : campaignArr.join(", "),
                device: deviceArr.length === 0 ? unknownKeyword : deviceArr[0],
              }
            } else {
              targetUserObject = {
                source: unknownKeyword,
                campaign: unknownKeyword,
                device: unknownKeyword,
              }
            }
    
            living = resident.living ? "거주중" : "이사"
    
            thisNaver = null;
            if (consultingAparts.find((obj) => { return obj.naver === naver }) !== undefined) {
              thisNaver = consultingAparts.find((obj) => { return obj.naver === naver });
            }
            address = thisNaver === null ? addressRaw : thisNaver.address.value;
            motherClient.summary.naverObject = thisNaver;
    
            if (thisNaver === null) {
              howLong = "알 수 없음";
            } else {
              thisOld = new Date(JSON.stringify(timeline).slice(1, -1));
              dateValue = (((((thisOld.valueOf() - (thisNaver.information.date).valueOf()) / 1000) / 60) / 60) / 24) / 365;
              howLong = String(Math.floor(dateValue)) + "년 " + String(Math.floor((dateValue % 1) * 12)) + "개월차";
            }
            motherClient.summary.howLong = howLong;
    
            if (thisNaver !== null) {
              thisNaver.information.type.detail.sort((a, b) => {
                return Math.abs(a.area.pyeong - pyeong) - Math.abs(b.area.pyeong - pyeong);
              })
              if (thisNaver.information.type.detail.length > 0) {
                room = thisNaver.information.type.detail[0].count.room;
              } else {
                room = 0;
              }
              household = thisNaver.information.count.household;
              floor = thisNaver.information.floor.high;
            } else {
              room = 0;
              household = 0;
              floor = 0;
            }
            motherClient.summary.count = { room, household, floor };
    
            if (/^서울/gi.test(address) || /^강서/gi.test(address) || /^양천/gi.test(address) || /^구로/gi.test(address) || /^영등포/gi.test(address) || /^금천/gi.test(address)|| /^동작/gi.test(address)|| /^관악/gi.test(address)|| /^서초/gi.test(address)|| /^강남/gi.test(address)|| /^송파/gi.test(address)|| /^강동/gi.test(address)|| /^광진/gi.test(address)|| /^동대문/gi.test(address)|| /^성동/gi.test(address)|| /^중랑/gi.test(address)|| /^성북/gi.test(address)|| /^강북/gi.test(address)|| /^도봉/gi.test(address)|| /^노원/gi.test(address)|| /^종로/gi.test(address)|| /^서대문/gi.test(address)|| /^마포/gi.test(address)|| /^용산/gi.test(address)|| /^은평/gi.test(address)) {
              regionSet[0].value = regionSet[0].value + 1;
              motherClient.summary.region = "서울";
            } else if (/^경기/gi.test(address) || /^인천/gi.test(address) || /^수원/gi.test(address) || /^부평/gi.test(address) || /^의정부/gi.test(address) || /^부천/gi.test(address) || /^과천/gi.test(address) || /^고양/gi.test(address) || /^시흥/gi.test(address) || /^성남/gi.test(address) || /^파주/gi.test(address) || /^김포/gi.test(address) || /^양주/gi.test(address) || /^남양주/gi.test(address) || /^포천/gi.test(address) || /^안양/gi.test(address) || /^의왕/gi.test(address) || /^광명/gi.test(address) || /^동두천/gi.test(address) || /^화성/gi.test(address) || /^오산/gi.test(address) || /^안성/gi.test(address) || /^평택/gi.test(address) || /^이천/gi.test(address) || /^여주/gi.test(address) || /^안산/gi.test(address) || /^가평/gi.test(address) || /^양평/gi.test(address)) {
              regionSet[1].value = regionSet[1].value + 1;
              motherClient.summary.region = "경기";
            } else if (/^충청/gi.test(address) || /^충북/gi.test(address) || /^충남/gi.test(address) || /^세종/gi.test(address) || /^대전/gi.test(address) || /^충주/gi.test(address)) {
              regionSet[2].value = regionSet[2].value + 1;
              motherClient.summary.region = "충청";
            } else if (/^강원/gi.test(address) || /^원주/gi.test(address) || /^강릉/gi.test(address) || /^속초/gi.test(address)) {
              regionSet[3].value = regionSet[3].value + 1;
              motherClient.summary.region = "강원";
            } else if (/^경상/gi.test(address) || /^경북/gi.test(address) || /^경남/gi.test(address) || /^부산/gi.test(address) || /^울산/gi.test(address) || /^대구/gi.test(address)) {
              regionSet[4].value = regionSet[4].value + 1;
              motherClient.summary.region = "경상";
            } else if (/^전라/gi.test(address) || /^전북/gi.test(address) || /^전남/gi.test(address) || /^광주/gi.test(address) || /^전주/gi.test(address)) {
              regionSet[5].value = regionSet[5].value + 1;
              motherClient.summary.region = "전라";
            } else if (/^제주/gi.test(address)) {
              regionSet[6].value = regionSet[6].value + 1;
              motherClient.summary.region = "제주";
            } else {
              regionSet[7].value = regionSet[7].value + 1;
              motherClient.summary.region = "기타";
            }
    
            motherClient.summary.pyeong = pyeong;
            if (pyeong < 10) {
              pyeongSet[0].value = pyeongSet[0].value + 1;
            } else if (pyeong >= 10 && pyeong < 20) {
              pyeongSet[1].value = pyeongSet[1].value + 1;
            } else if (pyeong >= 20 && pyeong < 30) {
              pyeongSet[2].value = pyeongSet[2].value + 1;
            } else if (pyeong >= 30 && pyeong < 40) {
              pyeongSet[3].value = pyeongSet[3].value + 1;
            } else if (pyeong >= 40 && pyeong < 50) {
              pyeongSet[4].value = pyeongSet[4].value + 1;
            } else if (pyeong >= 50 && pyeong < 60) {
              pyeongSet[5].value = pyeongSet[5].value + 1;
            } else {
              pyeongSet[6].value = pyeongSet[6].value + 1;
            }
    
            motherClient.summary.contract = contract;
            if (/자가/gi.test(contract)) {
              contractSet[0].value = contractSet[0].value + 1;
            } else {
              contractSet[1].value = contractSet[1].value + 1;
            }
    
            if (/1억/gi.test(budget)) {
              budget = 100000000;
            } else {
              budget = Number(budget.replace(/[^0-9]/gi, '')) * 10000;
            }
            motherClient.summary.budget = budget;
    
            if (budget < 10000000) {
              budgetSet[0].value = budgetSet[0].value + 1;
            } else if (budget >= 10000000 && budget < 20000000) {
              budgetSet[1].value = budgetSet[1].value + 1;
            } else if (budget >= 20000000 && budget < 30000000) {
              budgetSet[2].value = budgetSet[2].value + 1;
            } else if (budget >= 30000000 && budget < 40000000) {
              budgetSet[3].value = budgetSet[3].value + 1;
            } else if (budget >= 40000000 && budget < 50000000) {
              budgetSet[4].value = budgetSet[4].value + 1;
            } else if (budget >= 50000000 && budget < 60000000) {
              budgetSet[5].value = budgetSet[5].value + 1;
            } else if (budget >= 60000000 && budget < 70000000) {
              budgetSet[6].value = budgetSet[6].value + 1;
            } else if (budget >= 70000000 && budget < 80000000) {
              budgetSet[7].value = budgetSet[7].value + 1;
            } else if (budget >= 80000000 && budget < 90000000) {
              budgetSet[8].value = budgetSet[8].value + 1;
            } else if (budget >= 90000000 && budget < 100000000) {
              budgetSet[9].value = budgetSet[9].value + 1;
            } else {
              budgetSet[10].value = budgetSet[10].value + 1;
            }
    
            if (/없음/gi.test(howLong)) {
              oldSet[10].value = budgetSet[10].value + 1;
            } else {
              if (/^\-/gi.test(howLong)) {
    
                howLong = Number(howLong.replace(/년/gi, ".").replace(/[^0-9\.]/gi, ''));
                if (howLong <= 1) {
                  oldSet[0].value = oldSet[0].value + 1;
                } else if (howLong > 1 && howLong <= 2) {
                  oldSet[1].value = oldSet[1].value + 1;
                } else if (howLong > 2 && howLong <= 3) {
                  oldSet[2].value = oldSet[2].value + 1;
                } else {
                  oldSet[3].value = oldSet[3].value + 1;
                }
    
              } else {
    
                howLong = Number(howLong.replace(/년/gi, ".").replace(/[^0-9\.]/gi, ''));
                if (howLong <= 3) {
                  oldSet[4].value = oldSet[4].value + 1;
                } else if (howLong > 3 && howLong <= 5) {
                  oldSet[5].value = oldSet[5].value + 1;
                } else if (howLong > 5 && howLong <= 10) {
                  oldSet[6].value = oldSet[6].value + 1;
                } else if (howLong > 10 && howLong <= 20) {
                  oldSet[7].value = oldSet[7].value + 1;
                } else if (howLong > 20 && howLong <= 30) {
                  oldSet[8].value = oldSet[8].value + 1;
                } else if (howLong > 30) {
                  oldSet[9].value = oldSet[9].value + 1;
                } else {
                  oldSet[10].value = oldSet[10].value + 1;
                }
    
              }
            }
    
            if (targetUserObject.campaign === unknownKeyword) {
              adSet[1].value = adSet[1].value + 1;
              motherClient.summary.ad = adSet[1].case;
            } else {
              adSet[0].value = adSet[0].value + 1;
              motherClient.summary.ad = adSet[0].case;
            }
    
            if (targetUserObject.source === unknownKeyword) {
              sourceSet[5].value = sourceSet[5].value + 1;
              motherClient.summary.source = sourceSet[5].case;
            } else if (/meta/gi.test(targetUserObject.source) || /facebook/gi.test(targetUserObject.source) || /instagram/gi.test(targetUserObject.source)) {
              sourceSet[0].value = sourceSet[0].value + 1;
              motherClient.summary.source = sourceSet[0].case;
            } else if (/naver/gi.test(targetUserObject.source)) {
              sourceSet[1].value = sourceSet[1].value + 1;
              motherClient.summary.source = sourceSet[1].case;
            } else if (/google/gi.test(targetUserObject.source)) {
              sourceSet[2].value = sourceSet[2].value + 1;
              motherClient.summary.source = sourceSet[2].case;
            } else if (/youtube/gi.test(targetUserObject.source)) {
              sourceSet[3].value = sourceSet[3].value + 1;
              motherClient.summary.source = sourceSet[3].case;
            } else if (/kakao/gi.test(targetUserObject.source)) {
              sourceSet[4].value = sourceSet[4].value + 1;
              motherClient.summary.source = sourceSet[4].case;
            } else {
              sourceSet[5].value = sourceSet[5].value + 1;
              motherClient.summary.source = sourceSet[5].case;
            }
    
            if (/mobile/gi.test(targetUserObject.device)) {
              deviceSet[0].value = deviceSet[0].value + 1;
              motherClient.summary.device = deviceSet[0].case;
            } else if (/desktop/gi.test(targetUserObject.device)) {
              deviceSet[1].value = deviceSet[1].value + 1;
              motherClient.summary.device = deviceSet[1].case;
            } else {
              deviceSet[2].value = deviceSet[2].value + 1;
              motherClient.summary.device = deviceSet[2].case;
            }
    
            if (floor === 0) {
              floorSet[4].value = floorSet[4].value + 1;
            } else if (floor <= 10) {
              floorSet[0].value = floorSet[0].value + 1;
            } else if (floor > 10 && floor <= 20) {
              floorSet[1].value = floorSet[1].value + 1;
            } else if (floor > 20 && floor <= 30) {
              floorSet[2].value = floorSet[2].value + 1;
            } else {
              floorSet[3].value = floorSet[3].value + 1;
            }
    
            if (room === 0) {
              roomSet[5].value = roomSet[5].value + 1;
            } else if (room === 1) {
              roomSet[0].value = roomSet[0].value + 1;
            } else if (room === 2) {
              roomSet[1].value = roomSet[1].value + 1;
            } else if (room === 3) {
              roomSet[2].value = roomSet[2].value + 1;
            } else if (room === 4) {
              roomSet[3].value = roomSet[3].value + 1;
            } else {
              roomSet[4].value = roomSet[4].value + 1;
            }
    
            if (household === 0) {
              householdSet[5].value = householdSet[5].value + 1;
            } else if (household <= 500) {
              householdSet[0].value = householdSet[0].value + 1;
            } else if (household > 500 && household <= 1000) {
              householdSet[1].value = householdSet[1].value + 1;
            } else if (household > 1000 && household <= 2000) {
              householdSet[2].value = householdSet[2].value + 1;
            } else if (household > 2000 && household <= 3000) {
              householdSet[3].value = householdSet[3].value + 1;
            } else {
              householdSet[4].value = householdSet[4].value + 1;
            }
    
            motherClient.summary.living = living;
            if (living === "이사") {
              livingSet[0].value = livingSet[0].value + 1;
            } else {
              livingSet[1].value = livingSet[1].value + 1;
            }
    
          }
    
          return {
            region: regionSet,
            pyeong: pyeongSet,
            contract: contractSet,
            budget: budgetSet,
            old: oldSet,
            ad: adSet,
            source: sourceSet,
            device: deviceSet,
            floor: floorSet,
            room: roomSet,
            household: householdSet,
            living: livingSet,
            original: motherClients,
          }
        }
    
        consultingSet = returnSet(motherClients, consultingAparts);
        finalContractSet = returnSet(motherContracts, contractAparts);
    
        graphObject = {
          region: equalJson(JSON.stringify(consultingSet.region)),
          pyeong: equalJson(JSON.stringify(consultingSet.pyeong)),
          contract: equalJson(JSON.stringify(consultingSet.contract)),
          budget: equalJson(JSON.stringify(consultingSet.budget)),
          old: equalJson(JSON.stringify(consultingSet.old)),
          ad: equalJson(JSON.stringify(consultingSet.ad)),
          source: equalJson(JSON.stringify(consultingSet.source)),
          device: equalJson(JSON.stringify(consultingSet.device)),
          floor: equalJson(JSON.stringify(consultingSet.floor)),
          room: equalJson(JSON.stringify(consultingSet.room)),
          household: equalJson(JSON.stringify(consultingSet.household)),
          living: equalJson(JSON.stringify(consultingSet.living)),
        };
    
        for (let key in graphObject) {
          for (let obj of graphObject[key]) {
            thisValue = finalContractSet[key].find((o) => { return o.case === obj.case }).value;
            obj.contract = thisValue;
            obj.ratio = obj.value === 0 ? 0 : thisValue / obj.value;
          }
        }
    
        if (fromDate.valueOf() >= proposalStandardDateValue) {
          cliidArr_raw = motherClients.map((obj) => { return obj.cliid; });
          cliidArr_raw = Array.from(new Set(cliidArr_raw));
          process = motherProjects_raw.filter((obj) => { return cliidArr_raw.includes(obj.cliid) });
          histories = motherClientHistories.filter((obj) => { return process.map((o) => { return o.cliid; }).includes(obj.cliid) });
          histories = histories.filter((obj) => { return obj.curation.analytics.send.some((o) => { return /designerProposal/gi.test(o.page) }) });
          proposalLength = histories.length;
        } else {
          cliidArr_raw = clients.map((obj) => { return obj.cliid; });
          cliidArr_raw = Array.from(new Set(cliidArr_raw));
          process = motherProjects_raw.filter((obj) => { return cliidArr_raw.includes(obj.cliid) });
          proposalLength = process.length;
        }
    
        // 계약 데이터를 추가적으로 처리합니다.
        for (let clientObj of finalContractSet.original) {
          foundProject = motherProjects.find((o) => { return o.proposal.date.valueOf() >= clientObj.timeline.valueOf() && o.cliid === clientObj.cliid });
          clientObj.thisProject = foundProject === undefined ? null : foundProject;
        }
        finalContractSet.original = finalContractSet.original.filter((c) => { return c.thisProject !== null });
    
        // 최종 결과 객체를 생성합니다.
        finalObject = {
          clients: motherClients.length,
          proposal: proposalLength,
          contracts: motherContracts.length,
          contractsSuccess: motherProjects.filter((p) => { return !/드랍/gi.test(p.process.status) }).length,
          contractsSupply: motherProjects.filter((p) => { return !/드랍/gi.test(p.process.status) }).reduce((acc, curr) => {
            return acc + curr.process.contract.remain.calculation.amount.supply;
          }, 0),
          mau: motherAnalytics.map((o) => { return o.data.users }).reduce((acc, curr) => { return acc + curr.total }, 0),
          pageViews: motherAnalytics.map((o) => { return o.data.views }).reduce((acc, curr) => { return acc + curr.total }, 0),
          consulting: motherAnalytics.map((o) => { return o.data.conversion.consultingPage.total }).reduce((acc, curr) => { return acc + curr }, 0) + motherAnalytics.map((o) => { return o.data.conversion.popupOpen.total }).reduce((acc, curr) => { return acc + curr }, 0),
          charge: motherCampaign.map((o) => { return o.value.charge }).reduce((acc, curr) => { return acc + curr }, 0),
          impressions: motherCampaign.map((o) => { return o.value.performance.impressions }).reduce((acc, curr) => { return acc + curr }, 0),
          clicks: motherCampaign.map((o) => { return o.value.performance.clicks }).reduce((acc, curr) => { return acc + curr }, 0),
          graph: graphObject,
          contractDetail: finalContractSet.original,
        };
    
        // 최종 결과를 클라이언트에게 반환합니다.
        res.send(JSON.stringify(finalObject));

    } catch (e) {
        // 에러가 발생하면 에러 메시지를 클라이언트에게 반환합니다.
        logger.error(e, req).catch((err) => { console.log(err) });
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @route POST /receiveSms
     * @description 클라이언트로부터 수신된 SMS 데이터를 처리하는 라우터입니다. 
     *              데이터베이스에 저장된 적이 없는 SMS 데이터를 검증하고,
     *              해당 데이터를 외부 시스템으로 전송합니다.
     * @param {Object} req - 클라이언트의 요청 객체로, 수신된 SMS 데이터를 포함합니다.
     * @param {Object} res - 서버의 응답 객체로, 처리 결과를 JSON 형식으로 반환합니다.
     */
    router.post([ "/receiveSms" ], async function (req, res) {

      // 응답 헤더 설정: 응답 데이터 형식과 CORS(Cross-Origin Resource Sharing) 설정
      res.set({
          "Content-Type": "application/json", // 응답 데이터 형식이 JSON임을 명시
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 요청을 허용
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 명시
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 명시
      });

      // MongoDB 인스턴스를 지정 (로컬 DB 사용)
      const selfMongo = instance.mongolocal;

      // SMS 데이터의 고유 ID 생성을 위한 키워드
      const idKeyword = "sms_";

      // MongoDB 컬렉션 이름을 지정
      const collection = "accountSms";

      try {
          // 요청 본문에서 date, amount, name을 추출 및 equalJson 메서드를 사용하여 깊은 복사를 수행
          const { date, amount, name } = equalJson(req.body);

          // 새로운 SMS 객체를 생성 (ID는 날짜와 금액을 기반으로 생성)
          const obj = {
              id: idKeyword + String(date.valueOf()) + "_" + String(amount),
              date,
              amount,
              name
          }

          // MongoDB에서 동일한 ID를 가진 데이터가 있는지 조회
          rows = await back.mongoRead(collection, { id: obj.id }, { selfMongo });

          // 조회 결과가 없을 경우, 새로운 SMS 데이터를 처리하고 저장
          if (rows.length === 0) {
              // 외부 시스템으로 SMS 데이터를 전송
              await requestSystem("https://" + instance.address.officeinfo.host + ":3002/smsParsing", { date: obj.date, amount: obj.amount, name: obj.name }, { headers: { "Content-Type": "application/json" } });

              // MongoDB에 새로운 SMS 데이터를 저장
              await back.mongoCreate(collection, obj, { selfMongo });

              // 잠시 대기 (500ms)
              await sleep(500);
          }

          // 처리 완료 응답을 클라이언트에게 전송
          res.send(JSON.stringify({ message: "done" }));

      } catch (e) {
          // 에러 발생 시, 동일한 데이터를 다시 처리
          const { date, amount, name } = equalJson(req.body);
          const obj = {
              id: idKeyword + String(date.valueOf()) + "_" + String(amount),
              date,
              amount,
              name
          }

          // MongoDB에서 동일한 ID를 가진 데이터가 있는지 재조회
          rows = await back.mongoRead(collection, { id: obj.id }, { selfMongo });

          // 조회 결과가 없을 경우, 동일한 처리 진행
          if (rows.length === 0) {
              await requestSystem("https://" + instance.address.officeinfo.host + ":3002/smsParsing", { date: obj.date, amount: obj.amount, name: obj.name }, { headers: { "Content-Type": "application/json" } });
              await back.mongoCreate(collection, obj, { selfMongo });
              await sleep(500);
          }

          // 에러 메시지를 포함한 응답을 클라이언트에게 전송
          logger.error(e, req).catch((err) => { console.log(err) });
          res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @route POST /refreshDesignerCareer
     * @description 디자이너의 경력을 새로고침하는 작업을 수행하는 라우터입니다. 
     *              디자이너의 계약 시작 년도와 월을 업데이트하고, 업무 경력에 따라 관련 경력 기간을 계산합니다.
     * @param {Object} req - 클라이언트의 요청 객체로, 추가적인 입력 데이터는 필요하지 않습니다.
     * @param {Object} res - 서버의 응답 객체로, 처리 결과를 JSON 형식으로 반환합니다.
     */
    router.post([ "/refreshDesignerCareer" ], async function (req, res) {

      // 응답 헤더 설정: 응답 데이터 형식과 CORS(Cross-Origin Resource Sharing) 설정
      res.set({
          "Content-Type": "application/json", // 응답 데이터 형식이 JSON임을 명시
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 요청을 허용
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 명시
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 명시
      });

      // MongoDB 인스턴스를 지정
      const selfMongo = instance.mongo;

      try {
          // 모든 디자이너 데이터를 MongoDB에서 가져옴
          const designers = await back.getDesignersByQuery({}, { selfMongo });

          // 미래의 임의 날짜 설정 (디자이너 경력 종료일이 미래일 경우 대비)
          const future = new Date(3000, 0, 1);
          const futureValue = future.valueOf();

          // 디자이너 경력 정보를 갱신하기 위한 변수들 선언
          let targetDate;
          let targetYear, targetMonth;
          let whereQuery, updateQuery;
          let updateQuery2;
          let relatedY, relatedM;
          let dateValue;
          let monthDelta;

          // 모든 디자이너에 대해 반복 처리
          for (let designer of designers) {

              // 디자이너의 계약 시작 날짜를 파싱하여 년도와 월을 추출
              targetDate = new Date(JSON.stringify(designer.information.contract.date).slice(1, -1));
              targetYear = targetDate.getFullYear();
              targetMonth = targetDate.getMonth() + 1;

              // 디자이너의 ID를 기준으로 업데이트 쿼리 생성
              whereQuery = {};
              whereQuery["desid"] = designer.desid;

              // 계약 시작 년도와 월을 업데이트하는 쿼리 생성
              updateQuery = {};
              updateQuery["information.business.career.startY"] = targetYear;
              updateQuery["information.business.career.startM"] = targetMonth;

              // 디자이너 정보 업데이트 수행
              await back.updateDesigner([ whereQuery, updateQuery ], { selfMongo });

              // 디자이너의 경력 상세 정보가 존재할 경우 추가 계산 수행
              if (designer.information.business.career.detail.length > 0) {
                  dateValue = 0;

                  // 경력 상세 정보를 순회하며 총 경력 기간을 계산
                  for (let obj of designer.information.business.career.detail) {
                      if (!/기타 업무/gi.test(obj.tag)) { // '기타 업무'가 아닌 경우만 계산에 포함
                          if (obj.date.end.valueOf() > futureValue) { // 종료일이 미래일 경우 현재 날짜까지의 기간 계산
                              dateValue += (new Date()).valueOf() - obj.date.start.valueOf();
                          } else { // 종료일이 과거일 경우 해당 기간 계산
                              dateValue += obj.date.end.valueOf() - obj.date.start.valueOf();
                          }
                      }
                  }

                  // 총 경력 기간을 개월 수로 환산하여 년도와 월로 분리
                  monthDelta = Math.floor(((((dateValue / 1000) / 60) / 60) / 24) / 30);
                  relatedY = Math.floor(monthDelta / 12);
                  relatedM = monthDelta % 12;

                  // 경력 기간 업데이트 쿼리 생성
                  updateQuery2 = {};
                  updateQuery2["information.business.career.relatedY"] = relatedY;
                  updateQuery2["information.business.career.relatedM"] = relatedM;

                  // 디자이너 정보 업데이트 수행
                  await back.updateDesigner([ whereQuery, updateQuery2 ], { selfMongo });
              }

          }

          // 작업이 완료되면 로그를 기록하고 클라이언트에게 완료 메시지 전송
          await logger.cron("refresh designer career success : " + JSON.stringify(new Date()));
          res.send(JSON.stringify({ message: "done" }));

      } catch (e) {
          // 에러 발생 시 에러 메시지 전송
          logger.error(e, req).catch((err) => { console.log(err) });
          res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @route POST /mysqlReflection
     * @description MongoDB 데이터를 MySQL로 동기화하는 라우터입니다. 각 데이터 모델의 테이블을 준비하고,
     *              데이터를 MySQL로 삽입합니다. 클라이언트의 요청에 따라 비동기 방식으로 수행됩니다.
     * @param {Object} req - 클라이언트의 요청 객체로, 추가적인 입력 데이터는 필요하지 않습니다.
     * @param {Object} res - 서버의 응답 객체로, 처리 결과를 JSON 형식으로 반환합니다.
     */
    router.post([ "/mysqlReflection" ], async function (req, res) {
      // 응답 헤더 설정: 응답 데이터 형식과 CORS(Cross-Origin Resource Sharing) 설정
      res.set({
          "Content-Type": "application/json", // 응답 데이터 형식이 JSON임을 명시
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 요청을 허용
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 명시
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 명시
      });

      try {
          const selfMongo = instance.mongo; // MongoDB 인스턴스를 지정

          // MySQL에 데이터를 삽입하는 비동기 함수 정의
          const intoMysql = async (thisSqueeze) => {
              let tableReady;
              let boo;
              let safeNum;
              let injectionValues;
              let injectionBoo;
              let retryBoo;
              try {
                  /**
                   * @function tableReady
                   * @description MySQL 테이블을 드롭하고 다시 생성합니다.
                   * @param {Object} model - MySQL 테이블 모델 객체
                   * @returns {Promise<boolean>} - 성공 여부를 반환합니다.
                   */
                  tableReady = async (model) => {
                      let res;
                      try {
                          res = await mysqlQuery(model.getDropSql(), { center: true }); // 테이블 드롭 쿼리 실행
                          if (res.message === "done") {
                              res = await mysqlQuery(model.getCreateSql(), { center: true }); // 테이블 생성 쿼리 실행
                              if (res.message !== "done") {
                                  throw new Error("create fail"); // 생성 실패 시 에러 발생
                              }
                          } else {
                              throw new Error("drop fail"); // 드롭 실패 시 에러 발생
                          }
                          return true;
                      } catch (e) {
                          if (e.message === "create fail") {
                              console.log(e);
                              return false;
                          } else {
                              try {
                                  res = await mysqlQuery(model.getCreateSql(), { center: true }); // 테이블 생성 시도
                                  if (res.message !== "done") {
                                      throw new Error("create fail");
                                  }
                                  return true;
                              } catch (e) {
                                  console.log(e);
                                  return false;
                              }
                          }
                      }
                  }

                  /**
                   * @function injectionValues
                   * @description 데이터를 MySQL 테이블에 삽입합니다.
                   * @param {Object} data - 삽입할 데이터 객체
                   * @returns {Promise<boolean>} - 삽입 성공 여부를 반환합니다.
                   */
                  injectionValues = async (data) => {
                      let queryList;
                      let queryResult;
                      try {
                          queryList = data.getInsertSql(); // 데이터 삽입 쿼리 생성
                          queryResult = await mysqlQuery(queryList, { center: true }); // 삽입 쿼리 실행
                          if (queryResult.message !== "done") {
                              throw new Error("insert fail"); // 삽입 실패 시 에러 발생
                          }
                          return true;
                      } catch (e) {
                          console.log(e);
                          return false;
                      }
                  }

                  // 테이블 준비가 완료될 때까지 반복 시도
                  boo = await tableReady(thisSqueeze.model);
                  safeNum = 0;
                  while (!boo) {
                      if (safeNum > 10) {
                          break;
                      }
                      await sleep(3000); // 3초 대기
                      boo = await tableReady(thisSqueeze.model);
                      safeNum++;
                  }

                  if (boo) { // 테이블 준비가 완료되면
                      injectionBoo = await injectionValues(thisSqueeze.data); // 데이터 삽입 시도
                      if (!injectionBoo) {
                          await sleep(3000); // 삽입 실패 시 3초 대기 후 재시도
                          retryBoo = await intoMysql(thisSqueeze);
                          if (retryBoo) {
                              return true;
                          } else {
                              throw new Error("retry fail"); // 재시도 실패 시 에러 발생
                          }
                      }
                  }

                  return true;
              } catch (e) {
                  console.log(e);
                  return false;
              }
          }

          // 비동기 함수 실행
          (async () => {
              try {
                  let clients, designers, projects, aspirants;
                  let resultBoo;

                  // 각 데이터 모델에 대해 MongoDB에서 데이터를 가져와 MySQL에 동기화
                  clients = await back.getClientsByQuery({}, { withTools: true, selfMongo });
                  resultBoo = await intoMysql(clients.dimensionSqueeze());
                  if (!resultBoo) {
                      throw new Error("clients mysql reflection fail");
                  }

                  designers = await back.getDesignersByQuery({}, { withTools: true, selfMongo });
                  resultBoo = await intoMysql(designers.dimensionSqueeze());
                  if (!resultBoo) {
                      throw new Error("designers mysql reflection fail");
                  }

                  projects = await back.getProjectsByQuery({}, { withTools: true, selfMongo });
                  resultBoo = await intoMysql(projects.dimensionSqueeze());
                  if (!resultBoo) {
                      throw new Error("projects mysql reflection fail");
                  }

                  aspirants = await back.getAspirantsByQuery({}, { withTools: true, selfMongo });
                  resultBoo = await intoMysql(aspirants.dimensionSqueeze());
                  if (!resultBoo) {
                      throw new Error("aspirants mysql reflection fail");
                  }

                  // 동기화 성공 시 로그 기록
                  await logger.cron("core db mysql reflection success : " + JSON.stringify(new Date()));

                  return true;
              } catch (e) {
                  // 에러 발생 시 에러 로그 기록
                  logger.error(e, req).catch((e) => { console.log(e); });
                  return false;
              }
          })().catch((err) => {
              logger.error(err, req).catch((e) => { console.log(e); });
              console.log(err);
          });

          res.send(JSON.stringify({ message: "will do" })); // 클라이언트에게 완료 메시지 전송
      } catch (e) {
          // 에러 발생 시 에러 메시지 전송
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @route POST /hahaDropClients
     * @description 조건에 맞는 클라이언트의 상태를 "드랍"으로 업데이트하는 라우터입니다.
     *              요청을 받은 클라이언트 중 특정 조건을 만족하는 클라이언트를 필터링하여, 
     *              일정 기간 동안 반응이 없는 클라이언트를 드랍 처리합니다.
     * @param {Object} req - 클라이언트의 요청 객체로, 추가적인 입력 데이터는 필요하지 않습니다.
     * @param {Object} res - 서버의 응답 객체로, 처리 결과를 JSON 형식으로 반환합니다.
     */
    router.post([ "/hahaDropClients" ], async function (req, res) {
      // 응답 헤더 설정: 응답 데이터 형식과 CORS(Cross-Origin Resource Sharing) 설정
      res.set({
          "Content-Type": "application/json", // 응답 데이터 형식이 JSON임을 명시
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 요청을 허용
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 명시
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 명시
      });

      try {
          const selfMongo = instance.mongo; // MongoDB 인스턴스 지정
          const selfConsoleMongo = instance.mongo; // MongoDB 인스턴스 지정 (콘솔 로그용)
          
          // 조건에 맞는 클라이언트를 MongoDB에서 조회
          const targetClients = await back.getClientsByQuery({
              requests: {
                  $elemMatch: {
                      "analytics.response.status": {
                          $regex: "^[응]" // 응답 상태가 "응"으로 시작하는 요청 필터링
                      }
                  }
              }
          }, { selfMongo });

          const now = new Date(); // 현재 시간을 저장
          const ago = new Date(); // 기준 날짜를 저장
          const delta = 14; // 기준 기간(일 단위)
          const emptyDate = new Date(2000, 0, 1); // 빈 날짜(2000년 1월 1일) 설정
          const emptyDateValue = emptyDate.valueOf(); // 빈 날짜의 타임스탬프 값
          let thisHistories; // 클라이언트 히스토리 저장용 변수
          let historyWhereQuery; // 히스토리 조회용 쿼리
          let resultArr; // 결과 저장용 배열
          let hahaTargetClients; // 필터링된 클라이언트 저장용 배열
          let thisHistory; // 개별 클라이언트의 히스토리 저장용 변수
          let hahaList; // 'haha' 리스트 저장용 배열
          let index; // 루프용 인덱스
          let proposals; // 제안서 저장용 배열
          let totalProposals; // 모든 제안서 저장용 배열
          let boo; // 조건 만족 여부를 확인하는 변수
          let whereQuery, updateQuery; // 업데이트를 위한 쿼리 변수들

          ago.setDate(ago.getDate() - delta); // 기준 날짜를 현재 날짜에서 delta일 이전으로 설정

          if (targetClients.length > 0) {
              // 조건에 맞는 클라이언트 히스토리 조회
              historyWhereQuery = {};
              historyWhereQuery["$or"] = targetClients.map((c) => { return c.cliid }).map((cliid) => { return { cliid } });
              thisHistories = await back.mongoPick("clientHistory", [ historyWhereQuery, {
                  cliid: 1,
                  manager: 1,
                  "curation.analytics.send": 1,
                  "curation.service.serid": 1,
                  "curation.construct.items": 1,
              } ], { selfMongo: selfConsoleMongo });

              resultArr = [];
              for (let { manager, cliid, curation: { analytics: { send } } } of thisHistories) {
                  resultArr.push({
                      cliid,
                      manager,
                      haha: send.filter((obj) => { return obj.page === "lowLowPush" }), // 'lowLowPush' 페이지와 일치하는 기록 필터링
                  });
              }

              // 'haha' 리스트가 있는 클라이언트를 필터링
              hahaTargetClients = targetClients.toNormal().filter((client) => { return resultArr.filter((o) => { return o.haha.length > 0 }).map((c) => { return c.cliid }).includes(client.cliid) });

              for (let client of hahaTargetClients) {
                  thisHistory = resultArr.find((c) => { return c.cliid === client.cliid });
                  thisHistory.haha.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() }); // 날짜 기준으로 내림차순 정렬
                  client.haha = equalJson(JSON.stringify(thisHistory.haha)); // 'haha' 리스트를 깊은 복사하여 클라이언트 객체에 추가
                  client.manager = thisHistory.manager; // 매니저 정보 추가
              }

              if (hahaTargetClients.length > 0) {
                  // 해당 클라이언트들의 모든 프로젝트를 조회
                  totalProposals = await back.getProjectsByQuery({ $or: hahaTargetClients.map((c) => { return { cliid: c.cliid } }) }, { selfMongo });

                  for (let client of hahaTargetClients) {
                      index = 0;
                      for (let { request, analytics } of client.requests) {
                          hahaList = client.haha.filter((o) => { return o.date.valueOf() >= request.timeline.valueOf() }); // 요청 타임라인 이후의 'haha' 필터링
                          if (hahaList.length > 0) {
                              if (client.requests[index - 1] !== undefined) {
                                  hahaList = hahaList.filter((o) => { return o.date.valueOf() <= client.requests[index - 1].request.timeline.valueOf() }); // 이전 요청의 타임라인 이전의 'haha' 필터링
                              }
                              if (hahaList.length > 0) {
                                  if (hahaList[0].date.valueOf() <= ago.valueOf()) { // 'haha' 리스트의 첫 번째 날짜가 기준 날짜 이전인지 확인
                                      proposals = totalProposals.toNormal().filter((p) => { return p.cliid === client.cliid });
                                      if (client.requests[index - 1] !== undefined) {
                                          proposals = proposals.filter((p) => { return p.proposal.date.valueOf() >= request.timeline.valueOf() && p.proposal.date.valueOf() < client.requests[index - 1].request.timeline.valueOf() });
                                      } else {
                                          proposals = proposals.filter((p) => { return p.proposal.date.valueOf() >= request.timeline.valueOf() });
                                      }

                                      boo = false;
                                      if (proposals.length === 0) {
                                          boo = true;
                                      } else {
                                          proposals = proposals.filter((p) => { return p.process.contract.first.date.valueOf() > emptyDateValue && !/드랍/gi.test(p.process.status) });
                                          boo = (proposals.length === 0);
                                      }

                                      if (boo) { // 조건을 만족하면 상태를 "드랍"으로 업데이트
                                          whereQuery = {};
                                          updateQuery = {};
                                          whereQuery.cliid = client.cliid;
                                          updateQuery["requests." + String(index) + ".analytics.response.status"] = "드랍";
                                          await back.updateClient([ whereQuery, updateQuery ], { selfMongo });
                                      }
                                  }
                              }
                          }
                          index++;
                      }
                  }
              }
          }

          // 작업이 완료되면 로그 기록
          await logger.cron("haha drop clints success : " + JSON.stringify(new Date()));

          // 클라이언트에게 완료 메시지 전송
          res.send(JSON.stringify({ message: "done" }));
      } catch (e) {
          // 에러 발생 시 에러 메시지 전송
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @route POST /syncDesignProposal
     * @description 디자인 제안서와 관련된 파일을 동기화하는 작업을 수행하는 라우터입니다.
     *              디자이너별로 지정된 폴더에 파일을 다운로드하고 정리하며, 
     *              PDF 파일의 경우 이미지로 변환합니다. 작업이 완료되면 결과를 로그로 기록합니다.
     * @param {Object} req - 클라이언트의 요청 객체로, 추가적인 입력 데이터는 필요하지 않습니다.
     * @param {Object} res - 서버의 응답 객체로, 처리 결과를 JSON 형식으로 반환합니다.
     */
    router.post([ "/syncDesignProposal" ], async function (req, res) {
      // 응답 헤더 설정: 응답 데이터 형식과 CORS(Cross-Origin Resource Sharing) 설정
      res.set({
          "Content-Type": "application/json", // 응답 데이터 형식이 JSON임을 명시
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 요청을 허용
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 명시
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 명시
      });

      try {
          const selfMongo = instance.mongo; // MongoDB 인스턴스 지정
          
          // 디자인 제안서를 다운로드하고 파일을 정리하는 비동기 함수
          const downloadDesignProposal = async (selfMongo, logger = null) => {
              try {
                  const targetRoot = staticConst + "/designProposal/image"; // 파일을 저장할 기본 폴더 경로
                  const toNormal = true; // 디자이너 정보에서 평탄화된 객체로 변환할지 여부
                  const endPoint = "https://" + address.secondinfo.host + ":" + String(3003); // 외부 API 엔드포인트 주소
                  const config = { headers: { "Content-Type": "application/json" } }; // 요청에 사용할 헤더 설정
                  const userName = "ubuntu"; // 서버에 접속할 사용자 이름
                  const scpRoot = userName + "@" + address.secondinfo.host + ":"; // scp로 파일을 전송할 기본 경로
                  const scpPath = scpRoot + "/home/" + userName + "/static/photo/designer"; // 디자이너 파일 경로
                  const representativeFolderPath = "/representative"; // 대표 이미지 폴더 경로
                  const representativeRootPath = "/photo/designer" + representativeFolderPath; // 대표 이미지 루트 경로
                  const indexToken = "____index____"; // 파일 인덱싱을 위한 구분자
                  const digitStandard = 5; // 인덱스 생성 시 파일명에서 사용하는 자릿수
                  const designers = await back.getDesignersByQuery({}, { selfMongo, toNormal }); // 모든 디자이너 정보를 MongoDB에서 조회
                  let rootFolderStatus;
                  let desid;
                  let targetProjects;
                  let response;
                  let fileTargets;
                  let downloadPath;
                  let result0, result1, result2, result3;
                  let result0Path, result1Path, result2Path, result3Path;
                  let worksInfo;
                  let worksFiles;
                  let representativeFiles;
                  let worksFilesTargets;
                  let thisFileName;
                  let thisFilePureName;
                  let thisFileExe;
                  let thisFilePath;
                  let thisFolderPath;
                  let thisFolderContents_past, thisFolderContents;

                  // 기본 폴더의 상태를 확인하고, 디자이너별 폴더가 없는 경우 생성
                  rootFolderStatus = await fileSystem(`readFolder`, [ targetRoot ]);
                  for (let designer of designers) {
                      if (!rootFolderStatus.includes(designer.desid)) {
                          await shellExec(`mkdir`, [ `${targetRoot}/${designer.desid}` ]);
                      }
                  }

                  // 외부 API로부터 작업 정보를 받아옴
                  response = await requestSystem(endPoint + "/designerWorksList", { mode: "entire" }, config);
                  [ result0, result1, result2, result3, worksInfo ] = response.data;

                  // 각 작업의 파일 경로 설정
                  result0Path = worksInfo[1] + "/" + worksInfo[2][0];
                  result1Path = worksInfo[1] + "/" + worksInfo[2][1];
                  result2Path = worksInfo[1] + "/" + worksInfo[2][2];
                  result3Path = worksInfo[1] + "/" + worksInfo[2][3];

                  worksFiles = [];
                  // 작업 파일 리스트 생성
                  worksFiles = worksFiles.concat(result0.map((obj) => { return { desid: obj.desid, file: result0Path + "/" + obj.file.name } }));
                  worksFiles = worksFiles.concat(result1.map((obj) => { return { desid: obj.desid, file: result1Path + "/" + obj.file.name } }));
                  worksFiles = worksFiles.concat(result2.map((obj) => { return { desid: obj.desid, file: result2Path + "/" + obj.file.name } }));
                  worksFiles = worksFiles.concat(result3.map((obj) => { return { desid: obj.desid, file: result3Path + "/" + obj.file.name } }));

                  // 각 디자이너별로 작업을 수행
                  for (let designer of designers) {
                      desid = designer.desid; // 디자이너 ID
                      thisFolderPath = targetRoot + "/" + desid + "/"; // 디자이너별 폴더 경로 설정
                      thisFolderContents_past = await fileSystem(`readFolder`, [ thisFolderPath ]); // 해당 폴더의 기존 파일 목록 읽기
                      thisFolderContents_past = thisFolderContents_past.map((s) => {
                          let original;
                          let pureFileName;
                          let originalTempArr;

                          originalTempArr = s.split(indexToken); // 파일명을 인덱스 구분자로 분리
                          if (originalTempArr.length >= 2) {
                              original = originalTempArr[1];
                              if (original === undefined) {
                                  throw new Error("something wrong => " + desid + " / " + s);
                              }
                              pureFileName = original.split('.')[0];
                              pureFileName = pureFileName.slice(0, -1 * digitStandard);
                              return { original, pure: pureFileName };
                          } else {
                              original = originalTempArr[0];
                              pureFileName = original.split('.')[0];
                              pureFileName = pureFileName.slice(0, -1 * digitStandard);
                              return { original, pure: pureFileName };
                          }
                      });

                      // 프로젝트별로 파일을 다운로드
                      response = await requestSystem(endPoint + "/middlePhotoRead", { target: "/" + desid }, config);
                      targetProjects = response.data.filter((s) => { return /^p/gi.test(s); }); // 프로젝트 목록 필터링
                      for (let proid of targetProjects) {
                          response = await requestSystem(endPoint + "/middlePhotoRead", { target: "/" + desid + "/" + proid }, config);
                          fileTargets = response.data.filter((s) => { return !/^firstPhoto/gi.test(s); })
                                                    .filter((s) => { return !/^quarterPhoto/gi.test(s); })
                                                    .filter((s) => { return !/^middlePhoto/gi.test(s); })
                                                    .filter((s) => { return /jpg$/gi.test(s) || /jpeg$/gi.test(s) || /png$/gi.test(s) || /pdf$/gi.test(s); });
                          for (let fileName of fileTargets) {
                              thisFileName = fileName; // 파일 이름
                              thisFilePureName = thisFileName.split(".")[0]; // 확장자 없는 파일 이름
                              thisFileExe = thisFileName.split(".")[thisFileName.split(".").length - 1]; // 파일 확장자
                              thisFilePath = thisFolderPath + thisFileName; // 파일 전체 경로
                              downloadPath = scpPath + "/" + desid + "/" + proid + "/" + fileName; // 다운로드 경로 설정
                              // 해당 파일이 기존 폴더에 없는 경우 다운로드 및 PDF 변환
                              if (!thisFolderContents_past.map((o) => { return new RegExp(o.pure, "g"); }).some((r) => { return r.test(thisFilePureName); })) {
                                  await shellExec("scp", [ downloadPath, thisFolderPath ]);
                                  if (/pdf/gi.test(thisFileExe)) {
                                      try {
                                          await imageReader.pdfToJpg(thisFilePath, true); // PDF 파일을 JPG로 변환
                                      } catch {}
                                  }
                                  console.log("download", downloadPath);
                                  await sleep(500); // 다운로드 후 잠시 대기
                              }
                          }
                      }

                      // 대표 이미지 처리
                      response = await requestSystem(endPoint + "/readFolder", { path: representativeRootPath + "/" + desid }, config);
                      representativeFiles = response.data.filter((s) => { return /jpg$/gi.test(s) || /jpeg$/gi.test(s) || /png$/gi.test(s) || /pdf$/gi.test(s); })
                                                        .map((s) => { return scpPath + representativeFolderPath + "/" + desid + "/" + s; });
                      for (let downloadPath of representativeFiles) {
                          thisFileName = downloadPath.split("/")[downloadPath.split("/").length - 1];
                          thisFilePureName = thisFileName.split(".")[0];
                          thisFileExe = thisFileName.split(".")[thisFileName.split(".").length - 1];
                          thisFilePath = thisFolderPath + thisFileName;
                          if (!thisFolderContents_past.map((o) => { return new RegExp(o.pure, "g"); }).some((r) => { return r.test(thisFilePureName); })) {
                              await shellExec("scp", [ downloadPath, thisFolderPath ]);
                              if (/pdf/gi.test(thisFileExe)) {
                                  try {
                                      await imageReader.pdfToJpg(thisFilePath, true);
                                  } catch {}
                              }
                              console.log("download", downloadPath);
                              await sleep(500);
                          }
                      }

                      // 작업 파일 처리
                      worksFilesTargets = worksFiles.filter((o) => { return o.desid === desid; });
                      worksFilesTargets = worksFilesTargets.map((o) => { return scpRoot + o.file; });
                      for (let downloadPath of worksFilesTargets) {
                          thisFileName = downloadPath.split("/")[downloadPath.split("/").length - 1];
                          thisFilePureName = thisFileName.split(".")[0];
                          thisFileExe = thisFileName.split(".")[thisFileName.split(".").length - 1];
                          thisFilePath = thisFolderPath + thisFileName;
                          if (!thisFolderContents_past.map((o) => { return new RegExp(o.pure, "g"); }).some((r) => { return r.test(thisFilePureName); })) {
                              await shellExec("scp", [ downloadPath, thisFolderPath ]);
                              if (/pdf/gi.test(thisFileExe)) {
                                  try {
                                      await imageReader.pdfToJpg(thisFilePath, true);
                                  } catch {}
                              }
                              console.log("download", downloadPath);
                              await sleep(500);
                          }
                      }

                      // 폴더 정리 및 파일 이름 정렬
                      thisFolderContents = await fileSystem(`readFolder`, [ thisFolderPath ]);
                      thisFolderContents = thisFolderContents.map((s) => {
                          let arr, dateString;
                          let newString;
                          let thisDate;
                          let pastBoo;
                          newString = "";
                          if ((new RegExp(indexToken, "gi")).test(s)) {
                              newString = s.split(indexToken)[1];
                              if (/__split__/gi.test(s)) {
                                  arr = newString.split("__split__");
                                  dateString = arr[2];
                              } else {
                                  arr = newString.split("_");
                                  dateString = arr[1];
                              }
                              pastBoo = true;
                          } else {
                              if (/__split__/gi.test(s)) {
                                  arr = s.split("__split__");
                                  dateString = arr[2];
                              } else {
                                  arr = s.split("_");
                                  dateString = arr[1];
                              }
                              pastBoo = false;
                          }
                          thisDate = new Date(Number(dateString.replace(/[^0-9]/gi, '')));
                          return {
                              original: s,
                              past: pastBoo,
                              fileName: pastBoo ? newString : s,
                              date: thisDate,
                          };
                      });
                      thisFolderContents.sort((a, b) => { return a.date.valueOf() - b.date.valueOf(); });
                      thisFolderContents = thisFolderContents.map((obj, index) => {
                          obj.index = index;
                          return obj;
                      });
                      for (let obj of thisFolderContents) {
                          if (thisFolderPath + obj.original !== thisFolderPath + String(obj.index) + indexToken + obj.fileName) {
                              await shellExec("mv", [ thisFolderPath + obj.original, thisFolderPath + String(obj.index) + indexToken + obj.fileName ]);
                          }
                      }

                      console.log(desid, designer.designer, "sync success");
                      await sleep(1000);
                  }

                  return true;
              } catch (e) {
                  logger.error(e, req).catch((e) => { console.log(e); });
                  console.log(e);
                  return false;
              }
          }

          // 비동기 작업 시작 후 완료 또는 실패 시 로그 기록
          downloadDesignProposal(selfMongo, logger).then((boo) => {
              if (boo) {
                  return logger.cron("sync design proposal success : " + JSON.stringify(new Date()));
              } else {
                  return logger.alert("sync design proposal fail");
              }
          }).catch((err) => {
              logger.error(err, req).catch((e) => { console.log(e); });
          });

          // 클라이언트에게 완료 메시지 전송
          res.send(JSON.stringify({ message: "will do" }));
      } catch (e) {
          // 에러 발생 시 에러 메시지 전송
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @route POST /listDesignProposal
     * @description 디자이너 제안서의 파일 목록을 조회하는 라우터입니다.
     *              요청 모드에 따라 특정 디자이너의 파일 목록을 조회하거나, 
     *              모든 디자이너의 파일 목록을 조회할 수 있습니다.
     * @param {Object} req - 클라이언트의 요청 객체로, body에 모드와 필요한 추가 데이터를 포함합니다.
     * @param {Object} res - 서버의 응답 객체로, 처리 결과를 JSON 형식으로 반환합니다.
     */
    router.post([ "/listDesignProposal" ], async function (req, res) {
      // 응답 헤더 설정: 응답 데이터 형식과 CORS(Cross-Origin Resource Sharing) 설정
      res.set({
          "Content-Type": "application/json", // 응답 데이터 형식이 JSON임을 명시
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 요청을 허용
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 명시
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 명시
      });

      try {
          // 요청 바디에 mode가 정의되지 않은 경우 에러를 발생시킴
          if (req.body.mode === undefined) {
              throw new Error("invalid post"); // mode가 없으면 에러를 발생시킴
          }

          const { mode } = req.body; // 요청 바디에서 mode를 추출
          const targetPath = "/designProposal/image"; // 디자인 제안서 이미지 경로
          const targetRoot = staticConst + targetPath; // 파일 시스템에서 사용할 루트 경로
          let rows; // 파일 목록을 저장할 변수
          let resultObj; // 결과 객체를 저장할 변수
          let targetDesidArr; // 디자이너 ID 목록을 저장할 배열

          // mode가 "pick" 또는 "get"일 경우 특정 디자이너의 파일 목록을 반환
          if (mode === "pick" || mode === "get") {
              const { desid } = equalJson(req.body); // 요청 바디에서 desid 추출
              // 디자이너 폴더가 존재하지 않을 경우 빈 배열 반환
              if (!(await fileSystem("exist", [ targetRoot + "/" + desid ]))) {
                  res.send(JSON.stringify({ data: [] }));
              } else {
                  // 폴더가 존재할 경우 해당 폴더의 파일 목록을 읽어와 링크 형태로 변환 후 반환
                  rows = await fileSystem("readFolder", [ targetRoot + "/" + desid ]);
                  rows = rows.map((str) => { return linkToString(`${targetPath}/${desid}/${str}`); });
                  res.send(JSON.stringify({ data: objectDeepCopy(rows) })); // 안전하게 복사한 결과 반환
              }

          } else if (mode === "all") {
              // mode가 "all"일 경우 모든 디자이너의 파일 목록을 반환
              resultObj = {}; // 결과 객체 초기화
              targetDesidArr = await fileSystem("readFolder", [ targetRoot ]); // 루트 폴더에서 모든 디자이너 폴더를 읽어옴

              // 각 디자이너의 폴더를 순회하며 파일 목록을 읽어와 결과 객체에 저장
              for (let desid of targetDesidArr) {
                  resultObj[desid] = [];
                  rows = await fileSystem("readFolder", [ targetRoot + "/" + desid ]);
                  rows = rows.map((str) => { return linkToString(`${targetPath}/${str}`); });
                  resultObj[desid] = objectDeepCopy(rows); // 안전하게 복사한 결과를 객체에 저장
              }

              res.send(JSON.stringify({ data: resultObj })); // 결과 객체 반환

          } else {
              // 지원하지 않는 mode인 경우 에러를 발생시킴
              throw new Error("invalid post");
          }
      } catch (e) {
          // 에러가 발생한 경우 에러 메시지 반환
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @route POST /imageTransfer
     * @description 이미지 전송과 관련된 다양한 작업을 처리하는 라우터입니다. 
     *              모드에 따라 이미지를 저장, 복사, 조회, 목록 반환, 제안서와 연계, 전송 등의 작업을 수행합니다.
     * @param {Object} req - 클라이언트의 요청 객체로, body에 작업 모드와 필요한 데이터를 포함합니다.
     * @param {Object} res - 서버의 응답 객체로, 처리 결과를 JSON 형식으로 반환합니다.
     */
    router.post([ "/imageTransfer" ], async function (req, res) {
      // 응답 헤더 설정: 응답 데이터 형식과 CORS(Cross-Origin Resource Sharing) 설정
      res.set({
          "Content-Type": "application/json", // 응답 데이터 형식이 JSON임을 명시
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 요청을 허용
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 명시
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 명시
      });

      try {
          // 요청 바디에 mode가 정의되지 않은 경우 에러를 발생시킴
          if (req.body.mode === undefined) {
              throw new Error("invalid post"); // mode가 없으면 에러를 발생시킴
          }

          const { mode } = req.body; // 요청 바디에서 mode를 추출
          const collection = "imageTransfer"; // MongoDB 컬렉션 이름
          const selfCoreMongo = instance.mongo; // 코어 MongoDB 인스턴스
          const selfMongo = instance.mongolocal; // 로컬 MongoDB 인스턴스
          const idKeyword = "image_trans_"; // 이미지 전송 ID 생성 시 사용되는 키워드
          let json; // MongoDB에 저장될 JSON 객체
          let thisId; // 각 작업에서 고유하게 생성되는 ID
          let now; // 현재 시간 저장
          let imagesArr; // 이미지 배열을 저장할 변수
          let thisPath; // 각 이미지의 경로를 임시로 저장
          let finalPath; // 최종적으로 결정된 이미지 경로
          let thisDesigner, thisClient, thisMember; // 디자이너, 클라이언트, 멤버 정보를 저장할 변수
          let tempObj; // 임시 객체
          let thisSrc, finalSrc; // 이미지 소스 경로
          let rows; // 데이터베이스 쿼리 결과를 저장할 변수
          let targetJson; // 특정 작업에서 사용되는 대상 JSON 객체
          let client; // 클라이언트 정보
          let purpose; // 작업 목적
          let host; // 호스트 정보
          let path; // 경로 정보
          let cliid; // 클라이언트 ID
          let historyArr; // 작업 기록 배열
          let proidArr; // 제안서 ID 배열
          let designer, type; // 디자이너 정보와 타입

          // 모드가 "store"일 때: 이미지를 데이터베이스에 저장
          if (mode === "store") {
              // 필요한 필드들이 요청 바디에 모두 포함되지 않은 경우 에러를 발생시킴
              if (req.body.cliid === undefined || req.body.desid === undefined || req.body.info === undefined || req.body.purpose === undefined || req.body.description === undefined || req.body.member === undefined || req.body.images === undefined) {
                  throw new Error("invalid post 2"); // 필수 필드가 없으면 에러를 발생시킴
              }
              const { cliid, purpose, description, member, images, desid, info } = equalJson(req.body); // 요청 바디에서 필요한 데이터 추출
      
              now = new Date(); // 현재 시간 저장
              thisId = idKeyword + String(now.valueOf()) + "_" + uniqueValue("hex"); // 고유한 ID 생성

              imagesArr = []; // 이미지 배열 초기화
              for (let { absolute: rawPath, src: rawSrc } of images) {
                  thisPath = rawPath.replace(/^\//i, '').replace(/\/$/i, ''); // 이미지 경로에서 불필요한 슬래시 제거
                  if (thisPath.trim() === '') {
                      finalPath = sambaToken; // 경로가 빈 경우 기본 토큰을 사용
                  } else {
                      finalPath = thisPath;
                  }
                  if (!/^__/.test(finalPath)) {
                      finalPath = sambaToken + "/" + finalPath; // 경로가 "__"로 시작하지 않으면 토큰 추가
                  }

                  thisSrc = rawSrc.replace(/^\//i, '').replace(/\/$/i, ''); // 이미지 소스 경로에서 불필요한 슬래시 제거
                  if (thisSrc.trim() === '') {
                      finalSrc = sambaToken; // 소스 경로가 빈 경우 기본 토큰을 사용
                  } else {
                      finalSrc = thisSrc;
                  }
                  if (!/^__/.test(finalSrc)) {
                      finalSrc = sambaToken + "/" + finalSrc; // 소스 경로가 "__"로 시작하지 않으면 토큰 추가
                  }

                  // 모바일 경로가 포함된 경우 처리
                  if (/mobile\/mo/gi.test(finalSrc)) {
                      imagesArr.push({
                          original: finalPath.replace(new RegExp(sambaToken, "gi"), ""),
                          source: finalSrc.replace(/mobile\/mo/gi, "").replace(new RegExp(sambaToken, "gi"), ""),
                          link: finalSrc.replace(new RegExp(sambaToken, "gi"), ""),
                      });
                  } else {
                      imagesArr.push({
                          original: finalPath.replace(new RegExp(sambaToken, "gi"), ""),
                          source: finalSrc.replace(new RegExp(sambaToken, "gi"), ""),
                          link: finalSrc.replace(new RegExp(sambaToken, "gi"), ""),
                      });
                  }
              }
      
              thisMember = {
                  id: member, // 멤버 ID
                  name: "리에종", // 기본 이름
                  title: "봇", // 기본 타이틀
                  roles: [], // 역할 초기화
              }
      
              if (desid === "") {
                  thisDesigner = {
                      desid: desid, // 디자이너 ID
                      designer: "", // 디자이너 이름
                      phone: "", // 디자이너 전화번호
                  };
              } else {
                  // 디자이너 ID로 디자이너 정보 조회
                  tempObj = await back.getDesignerById(desid, { selfMongo: selfCoreMongo });
                  if (tempObj !== null) {
                      thisDesigner = {
                          desid: desid,
                          designer: tempObj.designer,
                          phone: tempObj.information.phone,
                      }
                  } else {
                      thisDesigner = {
                          desid: desid,
                          designer: "",
                          phone: "",
                      };
                  }
              }
      
              if (cliid === "") {
                  throw new Error("invalid cliid 0"); // 클라이언트 ID가 없을 경우 에러 발생
              }
              // 클라이언트 ID로 클라이언트 정보 조회
              tempObj = await back.getClientById(cliid, { selfMongo: selfCoreMongo });
              if (tempObj === null) {
                  throw new Error("invalid cliid 1"); // 클라이언트 정보가 없을 경우 에러 발생
              }
              thisClient = {
                  cliid: cliid,
                  name: tempObj.name,
                  phone: tempObj.phone,
              }
      
              proidArr = []; // 제안서 ID 배열 초기화
              if (typeof req.body.proid === "string") {
                  proidArr.push(req.body.proid); // 제안서 ID가 문자열이면 배열에 추가
              }
      
              json = {
                  id: thisId, // 생성된 ID
                  date: now, // 현재 날짜
                  from: thisMember, // 멤버 정보
                  target: thisClient, // 클라이언트 정보
                  contents: {
                      designer: thisDesigner,
                      purpose,
                      description,
                      info,
                  },
                  images: imagesArr, // 이미지 배열
                  history: [], // 히스토리 초기화
                  proposals: proidArr, // 제안서 ID 배열
              };
      
              await back.mongoCreate(collection, json, { selfMongo }); // 생성된 객체를 MongoDB에 저장
      
              res.send(JSON.stringify({ id: thisId })); // 생성된 ID를 응답으로 반환
      
          } else if (mode === "copy") {
              // 모드가 "copy"일 때: 기존 데이터를 복사하여 새로 저장
              const { cliid, id, purpose, description, member } = equalJson(req.body); // 요청 바디에서 필요한 데이터 추출
              [ targetJson ] = await back.mongoRead(collection, { id }, { selfMongo }); // 기존 데이터를 조회
      
              now = new Date(); // 현재 시간 저장
              thisId = idKeyword + String(now.valueOf()) + "_" + uniqueValue("hex"); // 고유한 ID 생성
      
              imagesArr = equalJson(JSON.stringify(targetJson.images)) // 이미지 배열 복사
      
              thisMember = {
                  id: member,
                  name: "리에종",
                  title: "봇",
                  roles: [],
              }
      
              if (cliid === "") {
                  throw new Error("invalid cliid 0"); // 클라이언트 ID가 없을 경우 에러 발생
              }
              // 클라이언트 ID로 클라이언트 정보 조회
              tempObj = await back.getClientById(cliid, { selfMongo: selfCoreMongo });
              if (tempObj === null) {
                  throw new Error("invalid cliid 1"); // 클라이언트 정보가 없을 경우 에러 발생
              }
              thisClient = {
                  cliid: cliid,
                  name: tempObj.name,
                  phone: tempObj.phone,
              }
      
              proidArr = []; // 제안서 ID 배열 초기화
              if (typeof req.body.proid === "string") {
                  proidArr.push(req.body.proid); // 제안서 ID가 문자열이면 배열에 추가
              }
      
              json = {
                  id: thisId, // 생성된 ID
                  date: now, // 현재 날짜
                  from: thisMember, // 멤버 정보
                  target: thisClient, // 클라이언트 정보
                  contents: {
                      designer: equalJson(JSON.stringify(targetJson.contents.designer)), // 디자이너 정보 복사
                      purpose,
                      description,
                      info: equalJson(JSON.stringify(targetJson.contents.info)), // 정보 복사
                  },
                  images: imagesArr, // 이미지 배열
                  history: [], // 히스토리 초기화
                  proposals: proidArr, // 제안서 ID 배열
              };
      
              await back.mongoCreate(collection, json, { selfMongo }); // 생성된 객체를 MongoDB에 저장
      
              res.send(JSON.stringify({ id: thisId })); // 생성된 ID를 응답으로 반환
      
          } else if (mode === "get") {
              // 모드가 "get"일 때: 특정 데이터를 조회하여 반환
              if (req.body.id === undefined) {
                  throw new Error("invalid post"); // ID가 없으면 에러 발생
              }
              const { id, view } = equalJson(req.body); // 요청 바디에서 필요한 데이터 추출
              rows = await back.mongoRead(collection, { id }, { selfMongo }); // 데이터 조회
              if (rows.length === 1) {
                  [ targetJson ] = rows; // 조회된 데이터 할당
      
                  thisDesigner = await back.getDesignerById(targetJson.contents.designer.desid, { selfMongo: selfCoreMongo, toNormal: true }); // 디자이너 정보 조회
                  thisClient = await back.getClientById(targetJson.target.cliid, { selfMongo: selfCoreMongo, toNormal: true }); // 클라이언트 정보 조회
      
                  if (view !== 1 && view !== "1") {
                      historyArr = equalJson(JSON.stringify(targetJson.history)); // 히스토리 복사
                      historyArr.unshift({
                          action: "view", // 뷰 액션 추가
                          date: new Date(),
                      });
                      await back.mongoUpdate(collection, [ { id }, { history: historyArr } ], { selfMongo }); // 히스토리 업데이트
                      targetJson.history = historyArr; // 업데이트된 히스토리 할당
                  }
      
                  res.send(JSON.stringify({
                      data: targetJson, // 조회된 데이터 반환
                      client: thisClient, // 클라이언트 정보 반환
                      designer: thisDesigner, // 디자이너 정보 반환
                  }));
              } else {
                  throw new Error("invalid id"); // 조회된 데이터가 없으면 에러 발생
              }
      
          } else if (mode === "list") {
              // 모드가 "list"일 때: 조건에 맞는 데이터 목록을 반환
              if (req.body.whereQuery === undefined) {
                  throw new Error("invalid post"); // 조건이 없으면 에러 발생
              }
              const { whereQuery } = equalJson(req.body); // 요청 바디에서 조건 추출
              rows = await back.mongoRead(collection, whereQuery, { selfMongo }); // 조건에 맞는 데이터 조회
              res.send(JSON.stringify({
                  data: rows, // 조회된 데이터 반환
              }));
      
          } else if (mode === "proposal") {
              // 모드가 "proposal"일 때: 특정 제안서와 연관된 데이터 반환
              if (req.body.proid === undefined) {
                  throw new Error("invalid post"); // 제안서 ID가 없으면 에러 발생
              }
              const { proid } = equalJson(req.body); // 요청 바디에서 제안서 ID 추출
              rows = await back.mongoRead(collection, { proposals: { $elemMatch: { $regex: proid } } }, { selfMongo }); // 제안서와 연관된 데이터 조회
              res.send(JSON.stringify(rows)); // 조회된 데이터 반환
      
          } else if (mode === "send") {
              // 모드가 "send"일 때: 데이터를 전송하고 관련 정보를 업데이트
              if (req.body.id === undefined) {
                  throw new Error("invalid post"); // ID가 없으면 에러 발생
              }
              const { id } = equalJson(req.body); // 요청 바디에서 ID 추출
              rows = await back.mongoRead(collection, { id }, { selfMongo }); // 데이터 조회
              if (rows.length === 1) {
                  [ targetJson ] = rows; // 조회된 데이터 할당
      
                  client = targetJson.target.name; // 클라이언트 이름 추출
                  designer = targetJson.contents.designer.designer; // 디자이너 이름 추출
                  purpose = targetJson.contents.designer.designer + " " + targetJson.contents.purpose; // 목적 설정
                  host = address.frontinfo.host; // 호스트 정보
                  path = "transfer"; // 경로 정보
                  cliid = targetJson.target.cliid; // 클라이언트 ID
                  type = (/포트폴리오/gi.test(targetJson.contents.purpose) ? "포트폴리오" : (/제안/gi.test(targetJson.contents.purpose) ? "디자인 제안" : targetJson.contents.purpose)); // 타입 설정
      
                  historyArr = equalJson(JSON.stringify(targetJson.history)); // 히스토리 복사
                  historyArr.unshift({
                      action: "send", // 전송 액션 추가
                      date: new Date(),
                  });
                  await back.mongoUpdate(collection, [ { id }, { history: historyArr } ], { selfMongo }); // 히스토리 업데이트
      
                  // 카카오톡 메시지 전송
                  kakao.sendTalk("imageTransfer", client, targetJson.target.phone, {
                      client,
                      designer,
                      type,
                      purpose,
                      host,
                      path,
                      cliid,
                      id,
                  }).catch((e) => { console.log(e); });
      
                  res.send(JSON.stringify({ message: "done" })); // 전송 완료 메시지 반환
      
              } else {
                  throw new Error("invalid id"); // 조회된 데이터가 없으면 에러 발생
              }
      
          } else {
              throw new Error("invalid mode"); // 지원하지 않는 모드일 경우 에러 발생
          }
      
      } catch (e) {
          // 에러가 발생한 경우 에러 메시지 반환
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @route POST /metaAccountCheck
     * @description Meta(페이스북) 계정 상태를 확인하는 라우터입니다. 계정 상태가 정상인지 확인하고, 에러 발생 시 에러 메시지를 반환합니다.
     * @param {Object} req - 클라이언트의 요청 객체입니다.
     * @param {Object} res - 서버의 응답 객체로, 계정 상태 확인 결과를 JSON 형식으로 반환합니다.
     */
    router.post([ "/metaAccountCheck" ], async function (req, res) {
      // 응답 헤더 설정: 응답 데이터 형식과 CORS(Cross-Origin Resource Sharing) 설정
      res.set({
          "Content-Type": "application/json", // 응답 데이터 형식이 JSON임을 명시
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 요청을 허용
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 명시
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 명시
      });

      try {
          // Facebook 계정 상태를 확인하는 메서드 호출
          // `facebook.accountStatusCheck(logger)`는 페이스북 계정의 상태를 확인하고 그 결과를 불리언 값으로 반환합니다.
          const boo = await facebook.accountStatusCheck(logger);

          // 계정 상태가 정상이 아닌 경우 에러를 발생시킴
          if (!boo) {
              throw new Error("meta account error"); // 계정 상태에 문제가 있으면 에러 발생
          }

          // 계정 상태가 정상이면 성공 메시지를 JSON 형식으로 응답
          res.send(JSON.stringify({ message: "done" }));
      } catch (e) {
          // 에러 발생 시, 에러를 로깅하고 클라이언트에 에러 메시지를 JSON 형식으로 응답
          logger.error(e, req).catch((e) => { console.log(e); }); // 에러를 로그에 기록, 에러 발생 시 추가 로그 처리
          res.send(JSON.stringify({ message: "error : " + e.message })); // 에러 메시지를 클라이언트에 반환
      }
    });
    
    /**
     * @route POST /orderPhotoSync
     * @description 주어진 포트폴리오 ID(pid)에 따라 사진을 동기화하는 라우터입니다. 주어진 데이터를 기반으로 사진 파일을 복사, 이동, 업로드 작업을 수행합니다.
     * @param {Object} req - 클라이언트의 요청 객체입니다. 요청 본문은 `pid`와 `data`를 포함합니다.
     * @param {Object} res - 서버의 응답 객체로, 작업 완료 여부를 JSON 형식으로 반환합니다.
     */
    router.post([ "/orderPhotoSync" ], async function (req, res) {
      // 응답 헤더 설정: 응답 데이터 형식과 CORS(Cross-Origin Resource Sharing) 설정
      res.set({
          "Content-Type": "application/json", // 응답 데이터 형식이 JSON임을 명시
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 요청을 허용
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 명시
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 명시
      });

      try {
          // 요청 본문에서 pid와 data를 추출합니다.
          const { pid, data } = equalJson(req.body);

          // 경로 설정: corePortfolio 폴더 내의 다양한 서브 디렉터리 경로를 설정합니다.
          const corePortfolio = staticConst + "/corePortfolio";
          const listImageDesktop = corePortfolio + "/" + "listImage" + "/" + pid;
          const listImageMobile = corePortfolio + "/" + "listImage" + "/" + pid + "/mobile";
          const original = corePortfolio + "/" + "original" + "/" + pid;
          const tempDir = process.env.HOME + "/temp" + uniqueValue("hex");
          const serverFolderPath = "corePortfolio/listImage";
          const serverFolderPathOriginal = "corePortfolio/original";

          let fromArr, toArr; // 파일 이동 시 사용할 경로 배열
          let originalList; // 원본 이미지 파일 목록
          let outputFolderList; // 출력된 이미지 폴더의 파일 목록
          let outputMobildFolderList; // 모바일 버전의 출력된 이미지 폴더의 파일 목록
          let numbers, num; // 이동할 파일 인덱스 배열

          // 이동할 파일 인덱스를 저장할 배열 초기화
          numbers = [];

          // 주어진 데이터에 따라 파일을 복사합니다.
          for (let { fromIndex, toIndex } of data) {
              // 원본, 데스크탑, 모바일 이미지를 각각 복사
              await shellExec("cp", [ (original + "/i" + String(fromIndex) + pid + ".jpg"), (original + "/middle_i" + String(toIndex) + pid + ".jpg") ]);
              await shellExec("cp", [ (listImageDesktop + "/t" + String(fromIndex) + pid + ".jpg"), (listImageDesktop + "/middle_t" + String(toIndex) + pid + ".jpg") ]);
              await shellExec("cp", [ (listImageMobile + "/mot" + String(fromIndex) + pid + ".jpg"), (listImageMobile + "/middle_mot" + String(toIndex) + pid + ".jpg") ]);
              numbers.push(toIndex);
          }

          // 복사된 파일들을 원본 위치로 이동시킵니다.
          for (let toIndex of numbers) {
              await shellExec("mv", [ (original + "/middle_i" + String(toIndex) + pid + ".jpg"), (original + "/i" + String(toIndex) + pid + ".jpg") ]);
              await shellExec("mv", [ (listImageDesktop + "/middle_t" + String(toIndex) + pid + ".jpg"), (listImageDesktop + "/t" + String(toIndex) + pid + ".jpg") ]);
              await shellExec("mv", [ (listImageMobile + "/middle_mot" + String(toIndex) + pid + ".jpg"), (listImageMobile + "/mot" + String(toIndex) + pid + ".jpg") ]);
          }

          // 임시 디렉터리를 생성하고, 데스크탑 이미지 폴더를 복사합니다.
          await shellExec("mkdir", [ tempDir ]);
          await shellExec("cp", [ "-r", listImageDesktop, tempDir + "/" ]);
          await shellExec("mv", [ tempDir + "/" + pid, tempDir + "/portp" + pid ]);

          // 복사한 폴더를 samba 폴더로 이동시킵니다.
          await shellExec(`cp -r ${shellLink(tempDir + "/portp" + pid)} /home/ubuntu/samba/list_image/`);

          // 작업이 끝난 후 임시 폴더를 삭제합니다.
          await shellExec("rm", [ "-rf", tempDir ]);

          // 이동할 파일의 경로를 설정합니다.
          fromArr = [];
          toArr = [];
          originalList = await fileSystem(`readFolder`, [ original ]); // 원본 이미지 파일 목록 읽기
          outputFolderList = await fileSystem(`readFolder`, [ listImageDesktop ]); // 데스크탑 이미지 파일 목록 읽기
          outputMobildFolderList = await fileSystem(`readFolder`, [ listImageMobile ]); // 모바일 이미지 파일 목록 읽기

          // 각 파일을 이동할 경로에 추가합니다.
          for (let i of originalList) {
              if (i !== `.DS_Store`) {
                  fromArr.push(original + "/" + i);
                  toArr.push(`${serverFolderPathOriginal}/${pid}/${i}`);
              }
          }
          for (let i of outputFolderList) {
              if (i !== `.DS_Store` && /^[bt]/.test(i)) {
                  fromArr.push(listImageDesktop + "/" + i);
                  toArr.push(`${serverFolderPath}/${pid}/${i}`);
              }
          }
          for (let i of outputMobildFolderList) {
              if (i !== `.DS_Store`) {
                  fromArr.push(listImageMobile + "/" + i);
                  toArr.push(`${serverFolderPath}/${pid}/mobile/${i}`);
              }
          }

          // 이동할 파일들을 원격 서버로 업로드합니다.
          await ghostFileUpload(fromArr, toArr);

          // 모든 작업이 완료되면 성공 메시지를 반환합니다.
          res.send(JSON.stringify({ message: "done" }));
      } catch (e) {
          // 에러가 발생하면 로그를 남기고, 클라이언트에 에러 메시지를 반환합니다.
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @route POST /rawToRaw
     * @description 업로드된 파일들을 지정된 경로로 이동시키고, 이미지 처리를 수행한 후 다른 서버에서 추가 작업을 실행하는 라우터입니다.
     * @param {Object} req - 클라이언트의 요청 객체. 파일 업로드와 경로 정보가 포함되어 있습니다.
     * @param {Object} res - 서버의 응답 객체로, 작업 완료 여부를 JSON 형식으로 반환합니다.
     */
    router.post([ "/rawToRaw" ], async function (req, res) {
      // 응답 헤더 설정: 응답 데이터 형식과 CORS(Cross-Origin Resource Sharing) 설정
      res.set({
          "Content-Type": "application/json", // 응답 데이터 형식이 JSON임을 명시
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 요청을 허용
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 명시
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 명시
      });

      try {
          // 인스턴스에서 필요한 상수와 모듈을 가져옵니다.
          const { portfolioConst } = instance; // 포트폴리오 저장 경로
          const hangul = instance.hangul; // 한글 경로 문제 해결을 위한 모듈
          const image = instance.imageReader; // 이미지 처리를 위한 모듈
          const form = instance.formidable({ multiples: true, encoding: "utf-8", maxFileSize: (9000 * 1024 * 1024) }); // 파일 업로드를 위한 formidable 설정

          // form.parse: 파일과 필드를 파싱합니다.
          form.parse(req, async function (err, fields, files) {
              try {
                  if (err) {
                      // 파일 파싱 중 에러가 발생한 경우 에러를 던집니다.
                      throw new Error(err);
                  } else {
                      // toArr: 파일들이 이동될 경로 목록을 가져와 한글 문제를 해결합니다.
                      const toArr = JSON.parse(fields.toArr).map((path) => { return hangul.fixString(path); });
                      let filesKey, fromArr, num;
                      let tempArr, tempString, tempDir;
                      let thisFileName;
                      let thisFileExe;
                      let targetFileName;
                      let designer, client;

                      // 업로드된 파일의 키를 가져오고 숫자 순서대로 정렬합니다.
                      filesKey = Object.keys(files);
                      filesKey.sort((a, b) => {
                          return Number(a.replace(/[^0-9]/gi, '')) - Number(b.replace(/[^0-9]/gi, ''));
                      });

                      // fromArr: 업로드된 파일들의 경로를 저장합니다.
                      fromArr = [];
                      for (let key of filesKey) {
                          fromArr.push(files[key]);
                      }

                      // 기존 포트폴리오 폴더를 삭제하고 새로 생성합니다.
                      await shellExec("rm", [ "-rf", portfolioConst ]);
                      await shellExec("mkdir", [ portfolioConst ]);

                      // fields에서 디자이너와 클라이언트 정보를 가져옵니다.
                      designer = fields.designer;
                      if (fields.client === undefined || fields.client === null) {
                          client = null; // 클라이언트 정보가 없을 경우 null로 설정
                      } else {
                          client = fields.client; // 클라이언트 정보가 있을 경우 설정
                      }

                      // 비동기 함수 내에서 파일 이동과 처리를 수행합니다.
                      (async () => {
                          num = 0;
                          for (let { filepath: path } of fromArr) {
                              // 각 파일의 경로를 분석하여 목적지 경로를 설정합니다.
                              tempArr = toArr[num].split("/");
                              thisFileName = tempArr[tempArr.length - 1]; // 파일명 추출
                              thisFileExe = thisFileName.split(".")[thisFileName.split(".").length - 1]; // 파일 확장자 추출
                              tempString = portfolioConst; // 파일이 저장될 기본 경로 설정

                              if (tempArr.length === 0) {
                                  // 목적지 배열이 비어 있는 경우 오류를 발생시킵니다.
                                  throw new Error("invaild to array");
                              }

                              // 목적지 경로의 각 디렉터리를 생성합니다.
                              for (let i = 0; i < tempArr.length - 1; i++) {
                                  tempDir = await fileSystem(`readDir`, [ tempString ]);
                                  if (!tempDir.includes(tempArr[i]) && tempArr[i] !== "") {
                                      await shellExec(`mkdir ${shellLink(tempString + "/" + tempArr[i])}`);
                                  }
                                  tempString += '/';
                                  tempString += tempArr[i];
                              }

                              // 최종 파일 경로를 설정하고 파일을 이동시킵니다.
                              targetFileName = tempString + "/" + toArr[num].replace(/^\//i, '');
                              await shellExec(`mv ${shellLink(path)} ${shellLink(targetFileName)}`);
                              await image.overOfficialImage(targetFileName); // 이미지 처리 수행
                              num++;
                          }

                          // 모든 작업이 완료된 후, 다른 서버에서 추가 작업을 실행합니다.
                          await requestSystem("https://" + address.officeinfo.ghost.host + ":" + String(3000) + "/rawToRawExcute", {
                              designer, client
                          }, { headers: { "Content-Type": "application/json" } });

                      })().catch((err) => {
                          // 비동기 작업 중 에러가 발생하면 로그를 기록합니다.
                          logger.error(err, req).catch((e) => { console.log(e); });
                      });

                      // 클라이언트에 작업이 시작되었음을 알립니다.
                      res.send(JSON.stringify({ "message": "will do" }));
                  }
              } catch (e) {
                  // 전체 작업 중 에러가 발생한 경우 로그를 기록하고 클라이언트에 에러 메시지를 반환합니다.
                  logger.error(e, req).catch((e) => { console.log(e); });
                  res.send(JSON.stringify({ message: "error : " + e.message }));
              }
          });
      } catch (e) {
          // 에러 발생 시 로그를 기록하고 클라이언트에 에러 메시지를 반환합니다.
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @route POST /rawToRawExcute
     * @description 원본 사진 처리 작업을 수행하는 라우터입니다. 요청에 따라 단일 또는 다중 처리를 수행하며, 처리 결과는 슬랙 채널에 알림을 전송합니다.
     * @param {Object} req - 클라이언트의 요청 객체. 처리할 데이터가 포함되어 있습니다.
     * @param {Object} res - 서버의 응답 객체로, 작업 완료 여부를 JSON 형식으로 반환합니다.
     */
    router.post([ "/rawToRawExcute" ], async function (req, res) {
      // 응답 헤더 설정: 응답 데이터 형식과 CORS(Cross-Origin Resource Sharing) 설정
      res.set({
          "Content-Type": "application/json", // 응답 데이터 형식이 JSON임을 명시
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 요청을 허용
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 명시
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 명시
      });

      try {
          // requestArr가 undefined일 경우 처리, 이는 단일 처리 요청임을 의미
          if (req.body.requestArr === undefined) {
              // 디자이너 정보가 없는 경우 오류를 발생시킴
              if (req.body.designer === undefined) {
                  throw new Error("invalid post");
              }

              // 슬랙 알림을 전송할 채널과 음성 알림 여부를 설정
              const channel = "#502_sns_contents"; // 알림이 전송될 슬랙 채널
              const voice = false; // 음성 알림을 사용하지 않음
              const { designer: designerRaw } = equalJson(req.body); // 요청에서 디자이너 정보를 파싱
              let client, designer, pay;
              let thisSetName;

              // 클라이언트와 디자이너 정보를 설정
              client = ((typeof req.body.client === "string" && req.body.client !== "null") ? req.body.client.trim() : null);
              designer = designerRaw.trim();
              pay = true; // 항상 pay를 true로 설정

              // 클라이언트가 있는 경우와 없는 경우에 따라 처리 이름을 설정
              if (client !== null) {
                  thisSetName = `${client} C, ${designer} D 현장 원본 사진`; // 클라이언트가 있는 경우
              } else {
                  thisSetName = `${designer} D 개인 포트폴리오 사진`; // 클라이언트가 없는 경우
              }

              // 처리 시작 알림을 슬랙에 전송
              await messageSend({ text: thisSetName + " 처리를 시작합니다. 슬렉에 처리 성공 또는 실패 알림이 올 때까지 다음 원본 사진 처리요청을 하지 말아주세요!", channel, voice });

              // 필터를 사용하여 원본 사진 처리 작업을 수행
              filter.rawToRaw([
                  {
                      client,
                      designer,
                      pay
                  }
              ]).then((boo) => {
                  // 작업이 성공적으로 완료된 경우
                  if (boo) {
                      return messageSend({ text: thisSetName + " 처리를 성공적으로 완료하였어요!", channel, voice });
                  } else {
                      // 작업이 실패한 경우
                      return messageSend({ text: thisSetName + " 처리에 실패하였어요, 다시 시도해주세요!", channel, voice });
                  }
              }).catch((err) => {
                  // 오류가 발생한 경우 로그를 기록
                  logger.error(err, req).catch((e) => { console.log(e); });
              });
          } else {
              // requestArr가 있는 경우, 이는 다중 처리 요청임을 의미
              const requestArr = equalJson(req.body.requestArr); // 요청에서 배열을 파싱
              let client, designer, pay;
              let tong;

              tong = []; // 처리할 작업을 담을 배열을 초기화
              for (let obj of requestArr) {
                  client = obj.client; // 각 요청의 클라이언트 정보를 설정
                  designer = obj.designer; // 각 요청의 디자이너 정보를 설정
                  pay = true; // 항상 pay를 true로 설정
                  tong.push(objectDeepCopy({
                      client,
                      designer,
                      pay
                  }));
              }

              // 필터를 사용하여 원본 사진 처리 작업을 수행
              filter.rawToRaw(tong).catch((err) => {
                  // 오류가 발생한 경우 로그를 기록
                  logger.error(err, req).catch((e) => { console.log(e); });
              });
          }
          // 클라이언트에 작업이 시작되었음을 알림
          res.send(JSON.stringify({ message: "will do" }));
      } catch (e) {
          // 에러 발생 시 로그를 기록하고 클라이언트에 에러 메시지를 반환
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @route POST /updateRawInfo
     * @description 원본 사진 처리를 업데이트하는 API 엔드포인트입니다. 이 함수는 클라이언트 요청을 받아 MongoDB와 상호작용하며, 파일 시스템 작업을 수행하고, 외부 API와 통신합니다.
     * @param {Object} req - 클라이언트 요청 객체입니다.
     * @param {Object} res - 서버 응답 객체입니다.
     */
    router.post([ "/updateRawInfo" ], async function (req, res) {
      // 클라이언트에게 JSON 형식으로 응답을 전송하기 위해 응답 헤더를 설정합니다.
      res.set({
          "Content-Type": "application/json", // 응답의 콘텐츠 타입을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 설정합니다.
      });
      try {
          // 원본 사진 처리 중에 중복 처리를 방지하기 위해 사용되는 토큰 파일의 경로를 정의합니다.
          const rawToRawProcessDoingToken = process.env.HOME + "/" + "__rawToRawProcessDoingToken__.token";
          // MongoDB 연결 객체를 변수에 할당합니다.
          const selfMongo = instance.mongo;
          // 슬랙 채널 ID를 정의합니다. 이 채널로 알림이 전송됩니다.
          const channel = "#502_sns_contents";
          // 음성 알림 사용 여부를 설정합니다. 이 경우 사용하지 않으므로 false로 설정합니다.
          const voice = false;
          // 클라이언트, 디자이너, 프로젝트 정보를 저장할 변수를 초기화합니다.
          let client, designer, project;
          // 현재 처리 중인 작업의 이름을 저장할 변수를 초기화합니다.
          let thisSetName;
          // 키 폴더 목록을 저장할 변수를 초기화합니다.
          let keyFolderList;
          // 키 폴더 경로를 저장할 변수를 초기화합니다.
          let keyFolder;
          // 현재 시간을 기반으로 생성된 값을 저장할 변수를 초기화합니다.
          let nowValue;

          // 만약 토큰 파일이 존재하면(즉, 다른 원본 사진 처리가 이미 진행 중이면)
          if (await fileSystem("exist", [ rawToRawProcessDoingToken ])) {
              // 요청 본문에서 key 값을 추출하여 키 폴더 경로를 설정합니다.
              const { key } = equalJson(req.body);
              keyFolder = `${staticConst}/temp/${key}`;
              // 잠시 대기한 후(500밀리초) 키 폴더를 삭제합니다.
              await sleep(500);
              await shellExec("rm", [ "-rf", keyFolder ]);
              // 슬랙 채널에 다른 원본 사진 처리가 진행 중이라는 메시지를 전송합니다.
              await messageSend({ text: "다른 원본 사진 처리가 진행중입니다. 끝날 때까지 기다려주세요!", channel, voice });
              // 클라이언트에게 'will do' 메시지를 JSON 형식으로 응답합니다.
              res.send(JSON.stringify({ message: "will do" }));
          } else {
              // 처리 중임을 나타내기 위해 토큰 파일을 생성하고 "doing" 문자열을 기록합니다.
              await fileSystem("writeString", [ rawToRawProcessDoingToken, "doing" ]);
              
              // 요청 본문에 디자이너 정보가 있고, 개별 처리로 설정된 경우
              if (req.body.designer !== undefined && req.body.individual === "true") {
                  // 요청 본문에서 key, designer, desid, rawBody 값을 추출합니다.
                  const { key, designer, desid, rawBody } = equalJson(req.body);
                  
                  // 키 폴더 경로를 설정합니다.
                  keyFolder = `${staticConst}/temp/${key}`;
                  // 작업의 이름을 설정합니다. 이 경우 디자이너 개인 포트폴리오 원본 사진으로 설정합니다.
                  thisSetName = `${designer} D 개인 포트폴리오 원본 사진`;
                  
                  // 현재 시간을 기반으로 nowValue를 생성합니다.
                  nowValue = dateToString(new Date(), true).replace(/[^0-9]/gi, '');
                  
                  // 외부 API에 요청을 보내 프로젝트 디자이너 원본 사진 정보를 업데이트합니다.
                  await requestSystem("https://" + instance.address.secondinfo.host + ":3003/projectDesignerRaw", {
                      mode: "update",
                      desid: desid,
                      proid: "individual_" + nowValue,
                      cliid: "individual_" + nowValue,
                      type: "web",
                      body: rawBody.trim(),
                  }, {
                      headers: { "Content-Type": "application/json" },
                  });

                  // 포트폴리오 디렉토리를 삭제하고 다시 생성합니다.
                  await shellExec("rm", [ "-rf", portfolioConst ]);
                  await shellExec("mkdir", [ portfolioConst ]);
                  
                  // 키 폴더에서 모든 파일을 읽어옵니다.
                  keyFolderList = await fileSystem("readFolder", [ keyFolder ]);
                  
                  // 읽어온 파일 중 JPEG 형식의 파일만 포트폴리오 디렉토리로 이동시킵니다.
                  for (let photoName of keyFolderList) {
                      if (/\.jp[e]?g$/gi.test(photoName)) {
                          await shellExec("mv", [ keyFolder + "/" + photoName, portfolioConst + "/" ]);
                      }
                  }
                  // 잠시 대기한 후(500밀리초) 키 폴더를 삭제합니다.
                  await sleep(500);
                  await shellExec("rm", [ "-rf", keyFolder ]);
                  
                  // 슬랙 채널에 처리 시작 메시지를 전송합니다.
                  await messageSend({ text: thisSetName + " 처리를 시작합니다. 슬렉에 처리 성공 또는 실패 알림이 올 때까지 다음 원본 사진 처리요청을 하지 말아주세요!", channel, voice });
                  
                  // 필터링 작업을 실행하여 원본 사진을 처리합니다.
                  filter.rawToRaw([
                      {
                          desid,
                          individual: true,
                      }
                  ]).then((pid) => {
                      // 처리 ID가 문자열인 경우, 외부 API에 요청을 보내 원본 업데이트 주제를 설정합니다.
                      if (typeof pid === "string") {
                          return requestSystem("https://" + instance.address.officeinfo.ghost.host + ":3000/rawUpdateSubject", {
                              pid,
                              individual: ("individual_" + nowValue),
                          }, { headers: { "Content-Type": "application/json" } });
                      } else {
                          // 그렇지 않은 경우 슬랙 채널에 실패 메시지를 전송합니다.
                          return messageSend({ text: thisSetName + " 처리에 실패하였어요, 다시 시도해주세요!", channel, voice });
                      }
                  }).then(() => {
                      // 3분 동안 대기한 후 토큰 파일을 삭제합니다.
                      return sleep(60 * 1000 * 3);
                  }).then(() => {
                      return shellExec("rm", [ "-rf", rawToRawProcessDoingToken ]);
                  }).then(() => {
                      // 권한을 재설정합니다.
                      return filter.chmodReload();
                  }).catch((err) => {
                      // 오류가 발생한 경우, 오류를 로깅하고 처리합니다.
                      logger.error(err, req).catch((e) => { console.log(e); });
                  });

                  // 클라이언트에게 'will do' 메시지를 JSON 형식으로 응답합니다.
                  res.send(JSON.stringify({ message: "will do" }));

              } else {
                  // 요청 본문에서 key, proid, desid, cliid, rawBody 값을 추출합니다.
                  const { key, proid, desid, cliid, rawBody } = equalJson(req.body);

                  // 키 폴더 경로를 설정합니다.
                  keyFolder = `${staticConst}/temp/${key}`;

                  // MongoDB에서 클라이언트, 디자이너, 프로젝트 정보를 조회합니다.
                  [ client ] = await back.mongoRead("client", { cliid }, { selfMongo });
                  [ designer ] = await back.mongoRead("designer", { desid }, { selfMongo });
                  [ project ] =  await back.mongoRead("project", { proid }, { selfMongo });
                  // 작업의 이름을 설정합니다. 이 경우 클라이언트와 디자이너 이름을 포함하여 설정합니다.
                  thisSetName = `${client.name} C, ${designer.designer} D 현장 원본 사진`;

                  // 외부 API에 요청을 보내 프로젝트 디자이너 원본 사진 정보를 업데이트합니다.
                  await requestSystem("https://" + instance.address.secondinfo.host + ":3003/projectDesignerRaw", {
                      mode: "update",
                      desid: designer.desid,
                      proid: project.proid,
                      cliid: client.cliid,
                      type: "web",
                      body: rawBody.trim(),
                  }, {
                      headers: { "Content-Type": "application/json" },
                  });

                  // 포트폴리오 디렉토리를 삭제하고 다시 생성합니다.
                  await shellExec("rm", [ "-rf", portfolioConst ]);
                  await shellExec("mkdir", [ portfolioConst ]);

                  // 키 폴더에서 모든 파일을 읽어옵니다.
                  keyFolderList = await fileSystem("readFolder", [ keyFolder ]);

                  // 읽어온 파일 중 JPEG 형식의 파일만 포트폴리오 디렉토리로 이동시킵니다.
                  for (let photoName of keyFolderList) {
                      if (/\.jp[e]?g$/gi.test(photoName)) {
                          await shellExec("mv", [ keyFolder + "/" + photoName, portfolioConst + "/" ]);
                      }
                  }
                  // 잠시 대기한 후(500밀리초) 키 폴더를 삭제합니다.
                  await sleep(500);
                  await shellExec("rm", [ "-rf", keyFolder ]);

                  // 슬랙 채널에 처리 시작 메시지를 전송합니다.
                  await messageSend({ text: thisSetName + " 처리를 시작합니다. 슬렉에 처리 성공 또는 실패 알림이 올 때까지 다음 원본 사진 처리요청을 하지 말아주세요!", channel, voice });

                  // 필터링 작업을 실행하여 원본 사진을 처리합니다.
                  filter.rawToRaw([
                      {
                          cliid,
                          desid,
                          proid,
                      }
                  ]).then((pid) => {
                      // 처리 ID가 문자열인 경우, 외부 API에 요청을 보내 원본 업데이트 주제를 설정합니다.
                      if (typeof pid === "string") {
                          return requestSystem("https://" + instance.address.officeinfo.ghost.host + ":3000/rawUpdateSubject", {
                              pid
                          }, { headers: { "Content-Type": "application/json" } });
                      } else {
                          // 그렇지 않은 경우 슬랙 채널에 실패 메시지를 전송합니다.
                          return messageSend({ text: thisSetName + " 처리에 실패하였어요, 다시 시도해주세요!", channel, voice });
                      }
                  }).then(() => {
                      // 3분 동안 대기한 후 토큰 파일을 삭제합니다.
                      return sleep(60 * 1000 * 3);
                  }).then(() => {
                      return shellExec("rm", [ "-rf", rawToRawProcessDoingToken ]);
                  }).then(() => {
                      // 권한을 재설정합니다.
                      return filter.chmodReload();
                  }).catch((err) => {
                      // 오류가 발생한 경우, 오류를 로깅하고 처리합니다.
                      logger.error(err, req).catch((e) => { console.log(e); });
                  });

                  // 클라이언트에게 'will do' 메시지를 JSON 형식으로 응답합니다.
                  res.send(JSON.stringify({ message: "will do" }));

              }

          }
      } catch (e) {
          // 오류가 발생한 경우, 오류를 로깅하고 클라이언트에게 오류 메시지를 JSON 형식으로 응답합니다.
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @route POST /rawUpdateSubject
     * @description 원본 데이터의 주제를 업데이트하는 API 엔드포인트입니다. 이 함수는 클라이언트 요청을 받아 필터링 작업을 수행하고, 결과를 슬랙 채널에 알립니다.
     * @param {Object} req - 클라이언트 요청 객체입니다.
     * @param {Object} res - 서버 응답 객체입니다.
     */
    router.post([ "/rawUpdateSubject" ], async function (req, res) {
      // 클라이언트에게 JSON 형식으로 응답을 전송하기 위해 응답 헤더를 설정합니다.
      res.set({
          "Content-Type": "application/json", // 응답의 콘텐츠 타입을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 설정합니다.
      });
      try {
          // 요청 본문에 pid 값이 정의되지 않은 경우 예외를 발생시킵니다.
          if (req.body.pid === undefined) {
              throw new Error("invalid post"); // 유효하지 않은 POST 요청에 대한 오류 메시지.
          }

          // 슬랙 채널 ID를 정의합니다. 이 채널로 알림이 전송됩니다.
          const channel = "#502_sns_contents";
          // 음성 알림 사용 여부를 설정합니다. 이 경우 사용하지 않으므로 false로 설정합니다.
          const voice = false;
          // 요청 본문에서 pid 값을 추출합니다. equalJson은 JSON.parse 업그레이드 버전으로, 객체를 깊은 복사(deepcopy)할 때 사용됩니다.
          const { pid } = equalJson(req.body);
          // 개인 키 값을 저장할 변수를 초기화합니다.
          let individualKey;

          // 개인 키를 null로 초기화합니다.
          individualKey = null;
          // 요청 본문에 individual 값이 정의된 경우, 이를 individualKey에 할당합니다.
          if (req.body.individual !== undefined) {
              individualKey = req.body.individual;
          }

          // 필터 객체의 updateSubject 메서드를 호출하여 주제를 업데이트합니다.
          filter.updateSubject(pid, individualKey).then((boo) => {
              // 업데이트가 성공한 경우 슬랙 채널에 성공 메시지를 전송합니다.
              if (boo) {
                  return messageSend({ text: pid + " update subject 성공", channel, voice });
              } else {
                  // 그렇지 않은 경우 슬랙 채널에 실패 메시지를 전송합니다.
                  return messageSend({ text: pid + " update subject 실패", channel, voice });
              }
          }).then(() => {
              // 권한을 재설정합니다.
              return filter.chmodReload();
          }).catch((err) => {
              // 오류가 발생한 경우, 오류를 로깅하고 처리합니다.
              logger.error(err, req).catch((e) => { console.log(e); });
          });

          // 클라이언트에게 'will do' 메시지를 JSON 형식으로 응답합니다.
          res.send(JSON.stringify({ message: "will do" }));
      } catch (e) {
          // 오류가 발생한 경우, 오류를 로깅하고 클라이언트에게 오류 메시지를 JSON 형식으로 응답합니다.
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @route POST /rawToContents
     * @description 원본 촬영 사진을 컨텐츠로 변환하는 API 엔드포인트입니다. 이 함수는 클라이언트 요청을 받아 필터링 작업을 수행하고, 결과를 슬랙 채널에 알립니다.
     * @param {Object} req - 클라이언트 요청 객체입니다.
     * @param {Object} res - 서버 응답 객체입니다.
     */
    router.post([ "/rawToContents" ], async function (req, res) {
      // 클라이언트에게 JSON 형식으로 응답을 전송하기 위해 응답 헤더를 설정합니다.
      res.set({
          "Content-Type": "application/json", // 응답의 콘텐츠 타입을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 설정합니다.
      });

      try {
          // 요청 본문에 pid 값이 정의되지 않은 경우 예외를 발생시킵니다.
          if (req.body.pid === undefined) {
              throw new Error("invalid post"); // 유효하지 않은 POST 요청에 대한 오류 메시지.
          }

          // 슬랙 채널 ID를 정의합니다. 이 채널로 알림이 전송됩니다.
          const channel = "#502_sns_contents";
          // 음성 알림 사용 여부를 설정합니다. 이 경우 사용하지 않으므로 false로 설정합니다.
          const voice = false;
          // 요청 본문에서 pid 값을 추출합니다. equalJson은 JSON.parse 업그레이드 버전으로, 객체를 깊은 복사(deepcopy)할 때 사용됩니다.
          const { pid } = equalJson(req.body);

          // 필터 객체의 rawToContents 메서드를 호출하여 원본 사진을 컨텐츠로 변환합니다.
          filter.rawToContents(pid, false, (req.body.proid === undefined ? null : req.body.proid)).then((desid) => {
              // 변환 작업이 성공적으로 완료되었고 desid가 문자열인 경우, 디자이너 설정을 적용합니다.
              if (typeof desid === "string") {
                  return filter.setDesignerSetting(desid, pid);
              } else {
                  // 그렇지 않은 경우 슬랙 채널에 실패 메시지를 전송합니다.
                  return messageSend({ text: pid + " 컨텐츠 자동 발행에 실패하였어요, 다시 시도해주세요!", channel, voice });
              }
          }).then((boo) => {
              // 디자이너 설정이 성공한 경우, 슬랙 채널에 성공 메시지를 전송합니다.
              if (boo) {
                  return messageSend({ text: pid + " 컨텐츠 자동 발행에 성공하였어요!", channel, voice });
              } else {
                  // 그렇지 않은 경우 슬랙 채널에 실패 메시지를 전송합니다.
                  return messageSend({ text: pid + " 컨텐츠 자동 발행에 실패하였어요, 다시 시도해주세요!", channel, voice });
              }
          }).then(() => {
              // 권한을 재설정합니다.
              return filter.chmodReload();
          }).catch((err) => {
              // 오류가 발생한 경우, 오류를 로깅하고 처리합니다.
              logger.error(err, req).catch((e) => { console.log(e); });
          });

          // 클라이언트에게 'will do' 메시지를 JSON 형식으로 응답합니다.
          res.send(JSON.stringify({ message: "will do" }));
      } catch (e) {
          // 오류가 발생한 경우, 오류를 로깅하고 클라이언트에게 오류 메시지를 JSON 형식으로 응답합니다.
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @route POST /rawRepairOrder
     * @description 컨텐츠의 사진 순서를 변경하는 API 엔드포인트입니다. 이 함수는 클라이언트 요청을 받아 필터링 작업을 수행하고, 결과를 슬랙 채널에 알립니다.
     * @param {Object} req - 클라이언트 요청 객체입니다.
     * @param {Object} res - 서버 응답 객체입니다.
     */
    router.post([ "/rawRepairOrder" ], async function (req, res) {
      // 클라이언트에게 JSON 형식으로 응답을 전송하기 위해 응답 헤더를 설정합니다.
      res.set({
          "Content-Type": "application/json", // 응답의 콘텐츠 타입을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 설정합니다.
      });

      try {
          // 요청 본문에 pid 값이 정의되지 않은 경우 예외를 발생시킵니다.
          if (req.body.pid === undefined) {
              throw new Error("invalid post"); // 유효하지 않은 POST 요청에 대한 오류 메시지.
          }

          // 슬랙 채널 ID를 정의합니다. 이 채널로 알림이 전송됩니다.
          const channel = "#502_sns_contents";
          // 음성 알림 사용 여부를 설정합니다. 이 경우 사용하지 않으므로 false로 설정합니다.
          const voice = false;
          // 요청 본문에서 pid 값을 추출합니다. equalJson은 JSON.parse 업그레이드 버전으로, 객체를 깊은 복사(deepcopy)할 때 사용됩니다.
          const { pid } = equalJson(req.body);

          // 필터 객체의 rawToContents 메서드를 호출하여 사진 순서를 조정합니다. 두 번째 인자는 true로 설정하여 순서 조정 작업임을 명시합니다.
          filter.rawToContents(pid, true, (req.body.proid === undefined ? null : req.body.proid)).then((boo) => {
              // 순서 조정 작업이 성공한 경우, 슬랙 채널에 성공 메시지를 전송합니다.
              if (boo) {
                  return messageSend({ text: pid + " 컨텐츠 순서 조정에 성공하였어요!", channel, voice });
              } else {
                  // 그렇지 않은 경우 슬랙 채널에 실패 메시지를 전송합니다.
                  return messageSend({ text: pid + " 컨텐츠 순서 조정에 실패하였어요, 다시 시도해주세요!", channel, voice });
              }
          }).catch((err) => {
              // 오류가 발생한 경우, 오류를 로깅하고 처리합니다.
              logger.error(err, req).catch((e) => { console.log(e); });
          });

          // 클라이언트에게 'will do' 메시지를 JSON 형식으로 응답합니다.
          res.send(JSON.stringify({ message: "will do" }));
      } catch (e) {
          // 오류가 발생한 경우, 오류를 로깅하고 클라이언트에게 오류 메시지를 JSON 형식으로 응답합니다.
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @route POST /syncEvaluationContents
     * @description 클라이언트 평가 내용을 콘텐츠에 동기화하는 API 엔드포인트입니다. 이 함수는 클라이언트 평가 데이터를 콘텐츠에 반영하여 업데이트합니다.
     * @param {Object} req - 클라이언트 요청 객체입니다.
     * @param {Object} res - 서버 응답 객체입니다.
     */
    router.post([ "/syncEvaluationContents" ], async function (req, res) {
      // 클라이언트에게 JSON 형식으로 응답을 전송하기 위해 응답 헤더를 설정합니다.
      res.set({
          "Content-Type": "application/json", // 응답의 콘텐츠 타입을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 설정합니다.
      });

      try {
          // 데이터베이스 컬렉션 이름을 설정합니다. 콘텐츠와 클라이언트 평가 데이터를 다룹니다.
          const collection = "contents";
          const evaluationCollection = "clientEvaluation";
          
          // 평가에 사용할 타이틀 샘플을 배열로 정의합니다.
          const titleSamples = [
              "전문가를 이용하는 것이, 확실히 편한 것 같아요.",
              "진짜 커스터마이징 된, 인테리어를 받을 수 있었어요.",
              "디자이너님 덕분에, 시간을 아낄 수 있었어요.",
              "맞춤형 디자인을 받으니, 집이 완전히 달라졌어요.",
              "디자이너님의 도움으로, 인테리어 과정이 순조로웠어요.",
              "직접 하려고 했다면, 이런 결과를 얻지 못했을 거예요.",
              "맞춤형 서비스로 스타일을, 완벽하게 구현했어요.",
              "디자이너님과 함께라면, 인테리어 두렵지 않아요.",
              "전문가의 섬세한 손길이, 공간마다 느껴져요.",
              "커스터마이징 솔루션 덕분에, 공간이 최적화되었어요.",
              "디자이너와 작업하는 과정이, 즐겁고 편안했어요.",
              "꼼꼼한 디자인으로 집안의, 분위기가 바뀌었어요.",
              "디자이너님 덕분에 인테리어, 과정이 즐거웠어요.",
              "맞춤형 접근 덕분에, 집 안이 완전히 바뀌었어요.",
              "처음엔 부담스러웠지만, 과정과 결과 모두 만족스러워요.",
              "디자이너와 함께 하며, 새로운 시각이 생겼어요.",
              "맞춤형 디자인 덕분에, 우리 집이 더 특별해졌어요.",
              "디자이너와 함께라서, 순조롭게 진행되었어요.",
              "디자이너의 제안으로, 시간 낭비를 피할 수 있었어요.",
              "확실히 인테리어에서, 질적인 차이를 느낄 수 있어요.",
              "작업이 초기 예상보다, 시간을 크게 단축시켰어요.",
              "디자이너님의 의견을, 듣는 것이 결정적이었어요.",
              "꿈에 그리던 공간을, 만들 수 있었어요.",
              "혼자 생각하던 것 이상의, 결과물을 얻을 수 있었어요.",
              "디자이너님 덕분에, 선택에서 안심할 수 있었어요",
              "커스터마이징으로 우리, 집만의 매력을 살렸어요.",
              "내 생각을 정확히, 반영한 결과물을 얻었어요.",
          ];

          (async () => {
              try {
                  // Mother 클래스의 인스턴스를 통해 MongoDB 연결을 설정합니다.
                  const selfMongo = instance.mongo; // 원격 MongoDB 연결 객체입니다.
                  const selfContentsMongo = instance.mongolocal; // 로컬 MongoDB 연결 객체입니다.
                  let contentsArr; // 콘텐츠 데이터를 저장할 배열입니다.
                  let rows; // 평가 데이터를 저장할 배열입니다.
                  let target; // 평가 데이터와 일치하는 콘텐츠를 저장할 변수입니다.
                  let jsonTarget; // 평가 데이터를 깊은 복사한 후 저장할 변수입니다.
                  let jsonString; // 평가 데이터를 JSON 문자열로 변환하여 저장할 변수입니다.
                  let conid; // 콘텐츠 ID를 저장할 변수입니다.
                  let num; // 타이틀 샘플 배열의 인덱스를 관리할 변수입니다.
                  let whereQuery, updateQuery; // MongoDB 업데이트 시 사용할 쿼리 객체입니다.
                  let contentsProjectQuery; // 콘텐츠 조회 시 사용할 쿼리 조건입니다.

                  // MongoDB에서 콘텐츠 데이터를 조회할 때 사용할 쿼리 조건을 정의합니다.
                  contentsProjectQuery = {
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

                  // MongoDB에서 콘텐츠 데이터를 조회합니다.
                  contentsArr = await back.mongoPick(collection, [ {}, contentsProjectQuery ], { selfMongo });
                  
                  // 프로젝트 ID가 존재하는 콘텐츠만 필터링합니다.
                  contentsArr = contentsArr.filter((o) => { return o.proid !== "" });
                  
                  // 리뷰 ID에 '999'가 포함된 콘텐츠만 필터링합니다.
                  contentsArr = contentsArr.filter((o) => { return /999/gi.test(o.contents.review.rid) });

                  // MongoDB에서 필터링된 프로젝트 ID와 일치하는 클라이언트 평가 데이터를 조회합니다.
                  rows = await back.mongoRead(evaluationCollection, {
                      $or: contentsArr.map((o) => { return { proid: o.proid } }),
                  }, { selfMongo: selfContentsMongo });

                  num = 0; // 타이틀 샘플 배열의 인덱스를 초기화합니다.
                  
                  // 필터링된 콘텐츠 배열을 순회하면서 평가 데이터를 반영합니다.
                  for (let contents of contentsArr) {
                      // 프로젝트 ID가 일치하는 평가 데이터를 찾습니다.
                      target = rows.find((o) => { return o.proid === contents.proid }) === undefined ? null : rows.find((o) => { return o.proid === contents.proid });
                      if (target !== null) {

                          // 평가 데이터를 깊은 복사하여 jsonTarget에 저장합니다.
                          jsonTarget = objectDeepCopy(target);
                          // 복사한 평가 데이터를 JSON 문자열로 변환하여 jsonString에 저장합니다.
                          jsonString = jsonToString(jsonTarget);

                          // 콘텐츠 ID를 conid에 저장합니다.
                          conid = contents.conid;

                          // MongoDB에서 업데이트할 조건(whereQuery)과 변경할 데이터(updateQuery)를 설정합니다.
                          whereQuery = { conid };
                          updateQuery = {};

                          // 리뷰 타이틀을 타이틀 샘플에서 선택하여 메인 및 서브 타이틀에 설정합니다.
                          updateQuery["contents.review.title.main"] = titleSamples[num % titleSamples.length];
                          updateQuery["contents.review.title.sub"] = titleSamples[num % titleSamples.length];
                          
                          // 리뷰 상세 정보를 업데이트합니다.
                          updateQuery["contents.review.contents.detail"] = [
                              {
                                  type: "init",
                                  photos: [],
                                  contents: [
                                      {
                                          question: "",
                                          answer: jsonString,
                                      }
                                  ]
                              }
                          ];

                          // 리뷰의 순서(order)가 1000 이하인 경우, 이를 새로운 값으로 업데이트합니다.
                          if (contents.contents.review.detailInfo.order <= 1000) {
                              updateQuery["contents.review.detailInfo.order"] = Math.round((Number(contents.contents.portfolio.pid.replace(/[^0-9]/gi, '')) * 1000000 / 1000));
                          }
                          
                          // 포트폴리오의 세부 정보 중 사진 데이터를 복사하여 리뷰에 반영합니다.
                          updateQuery["contents.review.detailInfo.photodae"] = objectDeepCopy(contents.contents.portfolio.detailInfo.photodae);

                          // MongoDB에 업데이트 쿼리를 실행합니다.
                          await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo });

                          num++; // 타이틀 샘플 인덱스를 증가시킵니다.
                      }
                  }

                  // 콘텐츠 업데이트 후, 시스템에 반영되도록 요청을 전송합니다.
                  await requestSystem("https://" + address.testinfo.host + ":" + String(3000) + "/frontReflection", { data: null }, { headers: { "Content-Type": "application/json" } });

              } catch (e) {
                  // 오류 발생 시 콘솔에 오류를 출력합니다.
                  logger.error(e, req).catch((e) => { console.log(e); });
              }
          })().catch((err) => {
              // 비동기 함수의 오류를 캐치하여 콘솔에 출력합니다.
              logger.error(err, req).catch((e) => { console.log(e); });
          })

          // 클라이언트에게 'will do' 메시지를 JSON 형식으로 응답합니다.
          res.send(JSON.stringify({ message: "will do" }));
      } catch (e) {
          // 오류가 발생한 경우, 클라이언트에게 오류 메시지를 JSON 형식으로 응답합니다.
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @route POST /styleCurationTotalMenu
     * @description 스타일 큐레이션의 총 메뉴를 관리하는 API 엔드포인트입니다. 클라이언트 요청에 따라 총 메뉴 데이터를 반환하거나, 분석 및 처리 결과를 제공합니다.
     * @param {Object} req - 클라이언트 요청 객체입니다.
     * @param {Object} res - 서버 응답 객체입니다.
     */
    router.post([ "/styleCurationTotalMenu" ], async function (req, res) {
      // 클라이언트에게 JSON 형식으로 응답을 전송하기 위해 응답 헤더를 설정합니다.
      res.set({
          "Content-Type": "application/json", // 응답의 콘텐츠 타입을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 설정합니다.
      });

      try {
          // Mother 클래스의 인스턴스를 통해 MongoDB 연결을 설정합니다.
          const selfMongo = instance.mongo; // 원격 MongoDB 연결 객체입니다.
          const selfCoreMongo = instance.mongo; // 동일한 MongoDB 연결 객체를 사용합니다.
          const unknown = "알 수 없음"; // 알 수 없는 데이터를 처리할 때 사용할 기본 값입니다.
          const selfLogMongo = instance.mongolocal; // 로컬 MongoDB 연결 객체입니다.

          // 스타일 큐레이션에 사용할 총 메뉴 데이터를 정의합니다.
          const totalMenu = [
              {
                  question: "생각하는 서비스 유형을 선택해 주세요!",
                  values: [
                      {
                          title: "홈퍼니싱",
                          english: "Homefurnishing",
                          description: [
                              "시공 없이 스타일링만!",
                              "가구 소품 패브릭 조명으로 진행",
                          ],
                          source: "/service_f.svg",
                          plus: false,
                          margin: false,
                          value: "s2011_aa01s",
                      },
                      {
                          title: "홈스타일링",
                          english: "Homestyling",
                          description: [
                              "부분 시공 (제작 가구 포함)",
                              "스타일링 (가구 소품 패브릭)",
                          ],
                          source: "/service_s.svg",
                          plus: true,
                          margin: true,
                          value: "s2011_aa02s",
                      },
                      {
                          title: "토탈 스타일링",
                          english: "Totalstyling",
                          description: [
                              "전체 시공 (주방, 화장실 포함)",
                              "스타일링 (가구 소품 패브릭)",
                          ],
                          source: "/service_t.svg",
                          plus: true,
                          margin: false,
                          value: "s2011_aa03s",
                      },
                  ],
              },
              {
                  question: "전체 공간을 철거하고 재시공을 원하시나요?",
                  values: [
                      {
                          title: "아니요",
                          value: "부분 철거",
                      },
                      {
                          title: "예",
                          value: "전체 철거",
                      },
                  ],
              },
              {
                  question: "생각하시는 시공을 모두 체크해 주세요.",
                  values: [
                      {
                          title: "철거",
                          value: "철거",
                          description: "철거, 기존에 있던 것을\n모두 제거하는 작업",
                          styling: true,
                          alert: true,
                          notice: "전체 철거는 토탈 스타일링에서만 가능합니다!",
                      },
                      {
                          title: "보양",
                          value: "보양",
                          description: "엘리베이터 등에 기스 나지\n않도록 비닐을 씌우는 작업",
                          styling: true,
                          alert: false,
                          notice: "",
                      },
                      {
                          title: "목공",
                          value: "목공",
                          description: "나무를 사용한 작업\n걸레받이, 몰딩, 문짝, 천정 평탄화 등",
                          styling: true,
                          alert: false,
                          notice: "",
                      },
                      {
                          title: "전기",
                          value: "전기",
                          description: "집 내부의 전기 배선\n구성을 바꾸는 작업",
                          styling: true,
                          alert: false,
                          notice: "",
                      },
                      {
                          title: "타일",
                          value: "타일",
                          description: "화장실, 주방 등에 타일을\n바꾸는 작업",
                          styling: true,
                          alert: true,
                          notice: "홈스타일링에서는 덧방 공사만 가능합니다!",
                      },
                      {
                          title: "바닥",
                          value: "바닥",
                          description: "집의 바닥 공사\n장판, 마루, 타일이 있음",
                          styling: true,
                          alert: true,
                          notice: "홈스타일링에서는 장판과 마루 공사만 가능합니다!",
                      },
                      {
                          title: "욕실",
                          value: "욕실",
                          description: "화장실 공사, 홈스타일링에선\n부분 악세사리 교체만 가능",
                          styling: true,
                          alert: true,
                          notice: "홈스타일링에서는 부분 악세사리 교체만 가능합니다!",
                      },
                      {
                          title: "주방",
                          value: "주방",
                          description: "주방 공사, 홈스타일링에선\n부분 악세사리 교체만 가능",
                          styling: true,
                          alert: true,
                          notice: "홈스타일링에서는 부분 악세사리 교체만 가능합니다!",
                      },
                      {
                          title: "필름",
                          value: "필름",
                          description: "필름지를 씌워 해당 면의\n색상이나 재질감을 바꾸는 제공",
                          styling: true,
                          alert: false,
                          notice: "",
                      },
                      {
                          title: "도배",
                          value: "도배",
                          description: "벽에 도배지를 바르는 작업\n합지와 실크가 있음",
                          styling: true,
                          alert: false,
                          notice: "",
                      },
                      {
                          title: "도장",
                          value: "도장",
                          description: "페인팅, 탄성코트 등\n면의 도료를 칠하는 공사",
                          styling: true,
                          alert: false,
                          notice: "",
                      },
                      {
                          title: "중문",
                          value: "중문",
                          description: "현관에 중문을\n새로 달거나 바꾸는 작업",
                          styling: true,
                          alert: false,
                          notice: "",
                      },
                      {
                          title: "발코니",
                          value: "발코니",
                          description: "발코니의 확장 및\n확장 부분 단열 공사",
                          styling: false,
                          alert: false,
                          notice: "",
                      },
                      {
                          title: "금속 샤시",
                          value: "금속 샤시",
                          description: "모든 금속 공사와\n샤시 교체 작업",
                          styling: false,
                          alert: false,
                          notice: "",
                      },
                      {
                          title: "조명",
                          value: "조명",
                          description: "스타일링을 위한 조명\n배치부터 조명 제품 선택",
                          styling: true,
                          alert: false,
                          notice: "",
                      },
                      {
                          title: "제작 가구",
                          value: "제작 가구",
                          description: "대가구, 소가구로 나뉘며\n제작이 필요한 모든 가구",
                          styling: true,
                          alert: false,
                          notice: "",
                      },
                  ],
              },
              {
                  question: "시공 당일의 주거 환경을 알려주세요.",
                  values: [
                      {
                          title: "거주 중이며 가구 있음",
                          value: "거주 중이며 가구 있음",
                      },
                      {
                          title: "거주 중이며 보관 이사 계획",
                          value: "거주 중이며 보관 이사 계획",
                      },
                      {
                          title: "거주하지 않으며 공실 상태",
                          value: "거주하지 않으며 공실 상태",
                      },
                  ],
              },
              {
                  question: "인테리어 전체 가용 예산을 알려주세요.",
                  values: [
                      { title: "500만원 이하", value: "500만원 이하" },
                      { title: "1,000만원", value: "1,000만원" },
                      { title: "1,500만원", value: "1,500만원" },
                      { title: "2,000만원", value: "2,000만원" },
                      { title: "3,000만원", value: "3,000만원" },
                      { title: "4,000만원", value: "4,000만원" },
                      { title: "5,000만원", value: "5,000만원 이상" },
                      { title: "6,000만원", value: "6,000만원 이상" },
                      { title: "7,000만원", value: "7,000만원 이상" },
                      { title: "8,000만원", value: "8,000만원 이상" },
                      { title: "9,000만원", value: "9,000만원 이상" },
                      { title: "1억원 이상", value: "1억원 이상" },
                  ],
              },
              {
                  question: "생각하는 가구 영역을 모두 체크해 주세요.",
                  values: [
                      {
                          title: "빌트인 제작 가구",
                          value: "빌트인 제작 가구",
                      },
                      {
                          title: "단순 붙박이장",
                          value: "단순 붙박이장",
                      },
                      {
                          title: "구매형 가구",
                          value: "구매형 가구",
                      },
                  ],
              },
              {
                  question: "생각하는 패브릭 영역을 모두 체크해 주세요.",
                  values: [
                      {
                          title: "커튼, 블라인드 등 외부 창문 패브릭",
                          value: "커튼, 블라인드 등 외부 창문 패브릭",
                      },
                      {
                          title: "제작 발주형 침구류 (쿠션, 이불, 베개 등)",
                          value: "제작 발주형 침구류 (쿠션, 이불, 베개 등)",
                      },
                      {
                          title: "구매형 침구류, 카펫 등 패브릭",
                          value: "구매형 침구류, 카펫 등 패브릭",
                      },
                  ],
              },
              {
                  question: "입주 예정 시기를 알려주세요.",
                  values: [
                      { title: "미정 / 거주중", value: "미정 / 거주중" },
                      { title: "1개월 이내", value: "1개월 이내" },
                      { title: "2개월 이내", value: "2개월 이내" },
                      { title: "3개월 이내", value: "3개월 이내" },
                      { title: "4개월 이내", value: "4개월 이내" },
                      { title: "5개월 이내", value: "5개월 이내" },
                      { title: "6개월 이내", value: "6개월 이내" },
                      { title: "1년 이내", value: "1년 이내" },
                      { title: "1년 이상", value: "1년 이상" },
                  ],
              },
              {
                  question: "가구 구매 정도를 알려주세요.",
                  values: [
                      {
                          title: "기존 가구 재배치",
                          value: "재배치",
                      },
                      {
                          title: "일부 신규 구매",
                          value: "일부 구매",
                      },
                      {
                          title: "전체 신규 구매",
                          value: "전체 구매",
                      },
                  ],
              },
              {
                  question: "해당 가족 구성원을 체크해 주세요!",
                  values: [
                      {
                          title: "1인 가구",
                          value: "1인 가구",
                      },
                      {
                          title: "부부, 자녀 없음",
                          value: "부부, 자녀 없음",
                      },
                      {
                          title: "부부, 유아기 자녀",
                          value: "부부, 유아기 자녀",
                      },
                      {
                          title: "부부, 학령기 자녀",
                          value: "부부, 학령기 자녀",
                      },
                      {
                          title: "기타",
                          value: "기타",
                      },
                  ],
              },
              {
                  question: "고객님의 연령대를 체크해 주세요!",
                  values: [
                      {
                          title: "29세 이하",
                          value: "29세 이하",
                      },
                      {
                          title: "30세 - 39세",
                          value: "30세 - 39세",
                      },
                      {
                          title: "40세 - 49세",
                          value: "40세 - 49세",
                      },
                      {
                          title: "50세 - 59세",
                          value: "50세 - 59세",
                      },
                      {
                          title: "60세 이상",
                          value: "60세 이상",
                      },
                  ],
              },
              {
                  question: "가능한 상담 시간을 모두 체크해 주세요.",
                  values: [
                      { title: "9:30 - 11:00", value: "9:30 - 11:00" },
                      { title: "11:00 - 12:30", value: "11:00 - 12:30" },
                      { title: "13:30 - 16:30", value: "13:30 - 16:30" },
                      { title: "16:30 - 18:30", value: "16:30 - 18:30" },
                  ],
              },
              {
                  question: "마음에 드는 사진을 3장씩 선택해주세요.",
                  values: [],
              },
              {
                  question: "현장 사진, 도면이 있다면 업로드해주세요.",
                  values: [],
              },
          ];

          // 더미 데이터를 정의합니다. 특정 모드에서 이 데이터가 반환됩니다.
          const dummyData = {
              cliid: unknown,
              selection: unknown,
              receive: unknown,
              image: unknown,
              service: unknown,
              serid: 's2011_aa02s',
              construct: unknown,
              constructItems: unknown,
              constructEnvironment: unknown,
              budget: unknown,
              furniture: unknown,
              fabric: unknown,
              expect: unknown,
              purchase: unknown,
              family: unknown,
              age: unknown,
              time: unknown,
          };

          // 클라이언트 히스토리 데이터를 저장하는 컬렉션 이름을 정의합니다.
          const collection = "clientHistory";
          const collection2 = "blackButtonsClick";
          const collection3 = "homeliaisonAnalytics";
          const defaultButton = "consulting"; // 기본 버튼 모드를 정의합니다.

          let whereQuery, projectQuery; // MongoDB 쿼리를 저장할 변수를 정의합니다.
          let rows, rows2; // 조회된 MongoDB 데이터를 저장할 배열을 정의합니다.
          let filteredBlack; // 필터링된 데이터를 저장할 변수를 정의합니다.
          let thisCliid, curation; // 현재 처리 중인 클라이언트 ID와 큐레이션 데이터를 저장할 변수를 정의합니다.
          let selection; // 선택된 버튼 모드를 저장할 변수를 정의합니다.
          let resultJson; // 최종 결과를 JSON 형식으로 저장할 변수를 정의합니다.
          let tong; // 최종 결과 데이터를 담을 배열을 정의합니다.
          let check; // 클라이언트의 선택 사항을 저장할 변수를 정의합니다.
          let receive; // 추천서 수신 상태를 저장할 변수를 정의합니다.
          let rows3; // 분석 데이터를 저장할 배열을 정의합니다.
          let start; // 큐레이션 시작 상태를 저장할 변수를 정의합니다.
          let target; // 최종 목표 상태를 저장할 변수를 정의합니다.
          let thisAnalytics; // 특정 클라이언트의 분석 데이터를 저장할 변수를 정의합니다.
          let thisStatus; // 현재 클라이언트의 상태를 저장할 변수를 정의합니다.
          let cliidStatusArr; // 클라이언트 상태 배열을 저장할 변수를 정의합니다.

          // 클라이언트 요청의 모드에 따라 처리 로직을 분기합니다.
          if (req.body.mode === undefined || req.body.mode === null || req.body.mode === "get") {
              // 모드가 정의되지 않았거나, "get"인 경우 전체 메뉴 데이터를 응답합니다.
              res.send(JSON.stringify({ totalMenu }));
          } else if (req.body.mode === "dummy") {
              // 모드가 "dummy"인 경우 더미 데이터를 응답합니다.
              res.send(JSON.stringify({ dummy: dummyData }));
          } else if (req.body.mode === "analytics" || req.body.mode === "parse" || req.body.mode === "parsing") {
              // 모드가 "analytics", "parse", "parsing"인 경우 클라이언트 평가 및 분석 데이터를 처리합니다.

              const { cliids, statusArr } = equalJson(req.body); // 요청 본문에서 클라이언트 ID와 상태 배열을 추출합니다.

              // MongoDB 쿼리를 작성하여 클라이언트 ID에 따라 데이터를 조회합니다.
              whereQuery = { $or: cliids.map((cliid) => { return { cliid } }) };
              projectQuery = { "cliid": 1, "curation.image": 1, "curation.check": 1 };

              // 클라이언트 히스토리 데이터를 MongoDB에서 조회합니다.
              rows = await back.mongoPick(collection, [ whereQuery, projectQuery ], { selfMongo });
              rows2 = await back.mongoRead(collection2, whereQuery, { selfMongo });

              // 행동 로그 데이터를 MongoDB에서 조회합니다.
              whereQuery = { $or: cliids.map((cliid) => { return { "data.cliid": cliid, "action": "pageInit" } }) };
              projectQuery = { "page": 1, "data": 1, "action": 1 };
              rows3 = await back.mongoPick(collection3, [ whereQuery, projectQuery ], { selfMongo: selfLogMongo });

              cliidStatusArr = []; // 클라이언트 상태 배열을 초기화합니다.
              for (let i = 0; i < cliids.length; i++) {
                  cliidStatusArr.push([ cliids[i], statusArr[i] ]); // 클라이언트 ID와 상태를 배열에 저장합니다.
              }

              tong = []; // 최종 결과를 저장할 배열을 초기화합니다.
              for (let obj of rows) {
                  thisCliid = obj.cliid; // 현재 처리 중인 클라이언트 ID를 저장합니다.
                  thisStatus = cliidStatusArr.find((arr) => { return arr[0] === thisCliid })[1]; // 현재 클라이언트의 상태를 조회합니다.

                  curation = objectDeepCopy(obj.curation); // 큐레이션 데이터를 깊은 복사하여 저장합니다.
                  check = curation.check; // 클라이언트의 선택 사항을 저장합니다.
                  thisAnalytics = rows3.filter((o) => { return o.data.cliid === thisCliid }); // 현재 클라이언트의 분석 데이터를 조회합니다.
                  filteredBlack = rows2.filter((o) => { return o.cliid === thisCliid }); // 필터링된 데이터를 조회합니다.

                  if (filteredBlack.length === 0) {
                      selection = defaultButton; // 필터링된 데이터가 없는 경우 기본 버튼 모드를 설정합니다.
                  } else {
                      filteredBlack.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() }); // 날짜를 기준으로 데이터를 정렬합니다.
                      selection = filteredBlack[0].mode; // 가장 최근의 모드를 선택합니다.
                  }

                  if (thisAnalytics.filter((o) => { return o.page === "styleCuration" }).length === 0) {
                      start = "스타일 체크 거부"; // 스타일 큐레이션 페이지에 진입하지 않은 경우 시작 상태를 설정합니다.
                      target = "단순 드랍 대상"; // 목표 상태를 설정합니다.
                  } else {
                      start = "스타일 체크 진입"; // 스타일 큐레이션 페이지에 진입한 경우 시작 상태를 설정합니다.
                      target = "1차 응대 대상"; // 목표 상태를 설정합니다.
                  }

                  if (/단순 드랍 대상/gi.test(target) || /드랍/gi.test(thisStatus)) {
                      // 단순 드랍 대상이거나 드랍 상태인 경우
                      selection = "응대 불필요"; // 응대가 필요 없음을 설정합니다.
                      receive = "추천 불필요"; // 추천이 필요 없음을 설정합니다.
                  } else {
                      // 상담 및 추천 상태에 따라 선택 사항을 설정합니다.
                      if (/consulting/gi.test(selection)) {
                          selection = "상담부터"; // 상담이 우선인 경우
                          receive = "추천서 받기 전"; // 추천서를 받기 전 상태로 설정합니다.
                          if (thisAnalytics.filter((o) => { return o.page === "designerProposal" }).length > 0) {
                              receive = "자동 추천 받음"; // 자동 추천을 받은 상태로 설정합니다.
                          }
                      } else {
                          selection = "추천부터"; // 추천이 우선인 경우
                          receive = "추천서 진입"; // 추천서에 진입한 상태로 설정합니다.
                          if (thisAnalytics.filter((o) => { return o.page === "designerProposal" }).length === 0) {
                              selection = "상담부터"; // 상담이 우선인 상태로 변경합니다.
                              receive = "자동 추천 받음"; // 자동 추천을 받은 상태로 설정합니다.
                          } else {
                              target = "자동 응대중"; // 자동 응대 중인 상태로 설정합니다.
                          }
                      }
                  }

                  // 최종 결과 데이터를 JSON 형식으로 저장합니다.
                  resultJson = { cliid: thisCliid, selection, receive };

                  if (curation.length === 0) {
                      resultJson.image = "이미지 선택 거부"; // 큐레이션 데이터가 없는 경우
                  } else {
                      if (thisAnalytics.filter((o) => { return o.page === "styleCuration" }).length === 0) {
                          resultJson.image = "이미지 선택 거부"; // 스타일 큐레이션 페이지에 진입하지 않은 경우
                      } else {
                          resultJson.image = "이미지 선택 진행"; // 스타일 큐레이션 페이지에 진입한 경우
                      }
                  }

                  // 각 선택 사항을 토대로 결과 데이터를 설정합니다.
                  resultJson.service = totalMenu[0].values[Number(check.serid.split("_")[1].replace(/[^0-9]/gi, '')) - 1].title;
                  resultJson.serid = check.serid;

                  if (typeof check.construct.entire === "boolean") {
                      resultJson.construct = totalMenu[1].values[check.construct.entire ? 1 : 0].value;
                  } else {
                      resultJson.construct = totalMenu[1].values[0].value;
                  }

                  resultJson.constructItems = totalMenu[2].values.filter((o, index) => { return check.construct.items.includes(index) }).map((o) => { return o.title }).join(", ").trim();

                  if (resultJson.constructItems === "") {
                      resultJson.constructItems = unknown; // 공사가 선택되지 않은 경우 "알 수 없음"으로 설정합니다.
                  }

                  if (typeof check.construct.environment === "number") {
                      resultJson.constructEnvironment = totalMenu[3].values[check.construct.environment].value;
                  } else {
                      resultJson.constructEnvironment = unknown;
                  }

                  if (typeof check.budget === "number") {
                      resultJson.budget = totalMenu[4].values[check.budget].value;
                  } else {
                      resultJson.budget = unknown;
                  }

                  resultJson.furniture = totalMenu[5].values.filter((o, index) => { return check.furniture.includes(index) }).map((o) => { return o.title }).join(", ").trim();

                  if (resultJson.furniture === "") {
                      resultJson.furniture = unknown;
                  }

                  resultJson.fabric = totalMenu[6].values.filter((o, index) => { return check.fabric.includes(index) }).map((o) => { return o.title }).join(", ").trim();

                  if (resultJson.fabric === "") {
                      resultJson.fabric = unknown;
                  }

                  if (typeof check.expect === "number") {
                      resultJson.expect = totalMenu[7].values[check.expect].value;
                  } else {
                      resultJson.expect = unknown;
                  }

                  if (typeof check.purchase === "number") {
                      resultJson.purchase = totalMenu[8].values[check.purchase].value;
                  } else {
                      resultJson.purchase = unknown;
                  }

                  if (typeof check.family === "number") {
                      resultJson.family = totalMenu[9].values[check.family].value;
                  } else {
                      resultJson.family = unknown;
                  }

                  if (typeof check.age === "number") {
                      resultJson.age = totalMenu[10].values[check.age].value;
                  } else {
                      resultJson.age = unknown;
                  }

                  resultJson.time = totalMenu[11].values.filter((o, index) => { return check.time.includes(index) }).map((o) => { return o.title }).join(", ").trim();

                  if (resultJson.time === "") {
                      resultJson.time = unknown;
                  }

                  tong.push(objectDeepCopy(resultJson)); // 결과 데이터를 깊은 복사하여 최종 배열에 추가합니다.
              }
              res.send(JSON.stringify({ data: tong, dummy: dummyData })); // 최종 데이터를 클라이언트에 응답합니다.
          }

      } catch (e) {
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error" })); // 오류가 발생한 경우 오류 메시지를 클라이언트에 응답합니다.
      }
    });
    
    /**
     * @route POST /replaceContentsPhoto
     * @description 콘텐츠의 사진을 교체하는 API 엔드포인트입니다. 사용자가 업로드한 사진을 받아 여러 사이즈로 변환한 후 기존 콘텐츠의 사진을 대체합니다.
     * @param {Object} req - 클라이언트 요청 객체입니다.
     * @param {Object} res - 서버 응답 객체입니다.
     */
    router.post([ "/replaceContentsPhoto" ], async function (req, res) {
      // 클라이언트에게 JSON 형식으로 응답을 전송하기 위해 응답 헤더를 설정합니다.
      res.set({
          "Content-Type": "application/json", // 응답의 콘텐츠 타입을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 설정합니다.
      });

      try {
          // 서버의 임시 폴더 경로를 정의합니다.
          const osTempFolder = "/tmp";
          // Mother 클래스의 인스턴스를 통해 백엔드 관련 기능과 상호작용합니다.
          const back = instance.back;
          // 서버의 주소를 참조하기 위한 객체입니다.
          const address = instance.address;
          // 이미지 처리 객체를 참조합니다.
          const image = instance.imageReader;
          // 이미지 품질을 95로 설정합니다.
          const qualityConst = 95;
          // 이미지 변환 시 사용할 사이즈 매트릭스를 정의합니다.
          const sizeMatrix = [
              [ 1200, 848 ], // 첫 번째 사이즈 매트릭스입니다.
              [ 800, 566 ],  // 두 번째 사이즈 매트릭스입니다.
          ];
          // MongoDB 컬렉션 이름을 설정합니다.
          const collection = "contents";
          // MongoDB 연결 객체를 설정합니다.
          const selfMongo = instance.mongo;
          // 업로드된 파일을 처리하기 위한 formidable 객체를 설정합니다.
          const form = instance.formidable({ multiples: true, encoding: "utf-8", maxFileSize: (9000 * 1024 * 1024) });

          // 요청으로 들어온 파일과 필드를 파싱합니다.
          form.parse(req, async function (err, fields, files) {
              try {
                  if (err) {
                      // 파싱 도중 오류가 발생한 경우 예외를 발생시킵니다.
                      throw new Error(err);
                  } else {
                      // 파일 키, 파일 처리에 사용할 변수를 선언합니다.
                      let filesKey;
                      let thisFile, thisFiles;
                      let tempName;
                      let thisTempFull;
                      let tempName2;
                      let thisTempFull2;
                      let tempName3;
                      let thisTempFull3;
                      let pid, gs, index;
                      let fileNum;
                      let targetInfo;
                      let whereQuery, updateQuery;
                      let photoDetailArr;
                      let thisOriginalContents;
                      let contentsDetailCopied;

                      // 필드에서 pid 값을 가져와 공백을 제거합니다.
                      pid = fields.pid.trim();
                      // MongoDB 쿼리 조건을 설정합니다.
                      whereQuery = { "contents.portfolio.pid": pid };
                      updateQuery = {};

                      // 단일 파일 교체인지 다중 파일 교체인지 확인합니다.
                      if (fields.multiple === "false" || fields.multiple === false) {

                          // 단일 파일 교체 시 처리 로직입니다.
                          gs = fields.gs.trim();
                          index = Number(fields.index);

                          // 파일 객체의 키를 배열로 가져옵니다.
                          filesKey = Object.keys(files);
                          // 파일 키를 숫자 순으로 정렬합니다.
                          filesKey.sort((a, b) => {
                              return Number(a.replace(/[^0-9]/gi, '')) - Number(b.replace(/[^0-9]/gi, ''));
                          });
                          thisFile = null;
                          // 정렬된 파일 키를 순회하며 마지막 파일을 선택합니다.
                          for (let key of filesKey) {
                              thisFile = files[key];
                          }

                          // 임시 파일 이름과 경로를 설정합니다.
                          tempName = "tempReplaceImage" + uniqueValue("hex") + ".jpg";
                          thisTempFull = osTempFolder + "/" + tempName;
                          tempName2 = "tempReplaceImage" + uniqueValue("hex") + ".jpg";
                          thisTempFull2 = osTempFolder + "/" + tempName2;
                          tempName3 = "tempReplaceImage" + uniqueValue("hex") + ".jpg";
                          thisTempFull3 = osTempFolder + "/" + tempName3;

                          // 파일을 임시 폴더로 이동시킵니다.
                          await shellExec("mv", [ thisFile.filepath, thisTempFull ]);
                          // 이미지를 공식 이미지 크기로 변환합니다.
                          await image.overOfficialImage(thisTempFull);

                          // 잠시 대기합니다.
                          await sleep(50);

                          // 임시 파일을 복사하여 다른 두 파일로 만듭니다.
                          await shellExec("cp", [ thisTempFull, thisTempFull2 ]);
                          await shellExec("cp", [ thisTempFull, thisTempFull3 ]);

                          // 이미지를 특정 경로로 이동시키고 사이즈 변환을 수행합니다.
                          await shellExec("mv", [ thisTempFull, osTempFolder + "/i" + String(index) + pid + ".jpg" ]);
                          await shellExec(`convert ${shellLink(thisTempFull2)} -resize ${gs === 's' ? String(sizeMatrix[0][1]) + "x" + String(sizeMatrix[0][0]) : String(sizeMatrix[0][0]) + "x" + String(sizeMatrix[0][1])} -quality ${String(qualityConst)} ${shellLink(osTempFolder + "/t" + String(index) + pid + ".jpg")}`);
                          await shellExec(`convert ${shellLink(thisTempFull3)} -resize ${gs === 's' ? String(sizeMatrix[1][1]) + "x" + String(sizeMatrix[1][0]) : String(sizeMatrix[1][0]) + "x" + String(sizeMatrix[1][1])} -quality ${String(qualityConst)} ${shellLink(osTempFolder + "/mot" + String(index) + pid + ".jpg")}`);

                          // 잠시 대기합니다.
                          await sleep(50);

                          // 변환된 파일을 최종 경로로 복사합니다.
                          await shellExec("cp", [ osTempFolder + "/i" + String(index) + pid + ".jpg", staticConst + "/corePortfolio/original/" + pid + "/i" + String(index) + pid + ".jpg" ]);
                          await shellExec("cp", [ osTempFolder + "/t" + String(index) + pid + ".jpg", staticConst + "/corePortfolio/listImage/" + pid + "/t" + String(index) + pid + ".jpg" ]);
                          await shellExec("cp", [ osTempFolder + "/mot" + String(index) + pid + ".jpg", staticConst + "/corePortfolio/listImage/" + pid + "/mobile/mot" + String(index) + pid + ".jpg" ]);

                          // 잠시 대기합니다.
                          await sleep(50);

                          // 복사된 파일을 다른 경로로 복사한 후, 임시 파일을 삭제합니다.
                          await shellExec("cp", [ "-r", (staticConst + "/corePortfolio/listImage/" + pid + "/t" + String(index) + pid + ".jpg"), staticConst + `/list_image/portp${pid}/` ]);
                          await shellExec("cp", [ "-r", (staticConst + "/corePortfolio/listImage/" + pid + "/mobile/mot" + String(index) + pid + ".jpg"), staticConst + `/list_image/portp${pid}/mobile/` ]);

                          // 임시 파일을 삭제합니다.
                          await shellExec("rm", [ "-rf", osTempFolder + "/i" + String(index) + pid + ".jpg" ]);
                          await shellExec("rm", [ "-rf", osTempFolder + "/t" + String(index) + pid + ".jpg" ]);
                          await shellExec("rm", [ "-rf", osTempFolder + "/mot" + String(index) + pid + ".jpg" ]);
                          await shellExec("rm", [ "-rf", thisTempFull2 ]);
                          await shellExec("rm", [ "-rf", thisTempFull3 ]);

                      } else {
                          // 다중 파일 교체 시 처리 로직입니다.
                          filesKey = Object.keys(files);
                          // 파일 키를 숫자 순으로 정렬합니다.
                          filesKey.sort((a, b) => {
                              return Number(a.replace(/[^0-9]/gi, '')) - Number(b.replace(/[^0-9]/gi, ''));
                          });
                          thisFiles = [];
                          // 모든 파일을 배열에 추가합니다.
                          for (let key of filesKey) {
                              thisFiles.push(files[key]);
                          }
                          (async () => {

                              fileNum = 1;
                              photoDetailArr = [];
                              // 모든 파일을 순차적으로 처리합니다.
                              for (let thisFile of thisFiles) {

                                  await sleep(500);
                                  // 이미지 정보를 읽어와 가로 세로 비율에 따라 gs 값을 설정합니다.
                                  targetInfo = await image.readImage(thisFile.filepath);
                                  if (targetInfo.geometry.width >= targetInfo.geometry.height) {
                                      gs = "g";
                                  } else if (targetInfo.geometry.width < targetInfo.geometry.height) {
                                      gs = "s";
                                  }
                                  await sleep(500);
                                  index = fileNum;
                                  photoDetailArr.push({ index: index, gs: gs });

                                  // 임시 파일 이름과 경로를 설정합니다.
                                  tempName = "tempReplaceImage" + uniqueValue("hex") + ".jpg";
                                  thisTempFull = osTempFolder + "/" + tempName;
                                  tempName2 = "tempReplaceImage" + uniqueValue("hex") + ".jpg";
                                  thisTempFull2 = osTempFolder + "/" + tempName2;
                                  tempName3 = "tempReplaceImage" + uniqueValue("hex") + ".jpg";
                                  thisTempFull3 = osTempFolder + "/" + tempName3;
                  
                                  // 파일을 임시 폴더로 이동시킵니다.
                                  await shellExec("mv", [ thisFile.filepath, thisTempFull ]);
                                  // 이미지를 공식 이미지 크기로 변환합니다.
                                  await image.overOfficialImage(thisTempFull);
                  
                                  await sleep(500);
                  
                                  // 임시 파일을 복사하여 다른 두 파일로 만듭니다.
                                  await shellExec("cp", [ thisTempFull, thisTempFull2 ]);
                                  await shellExec("cp", [ thisTempFull, thisTempFull3 ]);
                  
                                  // 이미지를 특정 경로로 이동시키고 사이즈 변환을 수행합니다.
                                  await shellExec("mv", [ thisTempFull, osTempFolder + "/i" + String(index) + pid + ".jpg" ]);
                                  await shellExec(`convert ${shellLink(thisTempFull2)} -resize ${gs === 's' ? String(sizeMatrix[0][1]) + "x" + String(sizeMatrix[0][0]) : String(sizeMatrix[0][0]) + "x" + String(sizeMatrix[0][1])} -quality ${String(qualityConst)} ${shellLink(osTempFolder + "/t" + String(index) + pid + ".jpg")}`);
                                  await shellExec(`convert ${shellLink(thisTempFull3)} -resize ${gs === 's' ? String(sizeMatrix[1][1]) + "x" + String(sizeMatrix[1][0]) : String(sizeMatrix[1][0]) + "x" + String(sizeMatrix[1][1])} -quality ${String(qualityConst)} ${shellLink(osTempFolder + "/mot" + String(index) + pid + ".jpg")}`);
                  
                                  await sleep(500);
                  
                                  // 변환된 파일을 최종 경로로 복사합니다.
                                  await shellExec("cp", [ osTempFolder + "/i" + String(index) + pid + ".jpg", staticConst + "/corePortfolio/original/" + pid + "/i" + String(index) + pid + ".jpg" ]);
                                  await shellExec("cp", [ osTempFolder + "/t" + String(index) + pid + ".jpg", staticConst + "/corePortfolio/listImage/" + pid + "/t" + String(index) + pid + ".jpg" ]);
                                  await shellExec("cp", [ osTempFolder + "/mot" + String(index) + pid + ".jpg", staticConst + "/corePortfolio/listImage/" + pid + "/mobile/mot" + String(index) + pid + ".jpg" ]);
                  
                                  await sleep(500);
                  
                                  // 복사된 파일을 다른 경로로 복사한 후, 임시 파일을 삭제합니다.
                                  await shellExec("cp", [ "-r", (staticConst + "/corePortfolio/listImage/" + pid + "/t" + String(index) + pid + ".jpg"), staticConst + `/list_image/portp${pid}/` ]);
                                  await shellExec("cp", [ "-r", (staticConst + "/corePortfolio/listImage/" + pid + "/mobile/mot" + String(index) + pid + ".jpg"), staticConst + `/list_image/portp${pid}/mobile/` ]);
                    
                                  await shellExec("rm", [ "-rf", osTempFolder + "/i" + String(index) + pid + ".jpg" ]);
                                  await shellExec("rm", [ "-rf", osTempFolder + "/t" + String(index) + pid + ".jpg" ]);
                                  await shellExec("rm", [ "-rf", osTempFolder + "/mot" + String(index) + pid + ".jpg" ]);
                                  await shellExec("rm", [ "-rf", thisTempFull2 ]);
                                  await shellExec("rm", [ "-rf", thisTempFull3 ]);
                  
                                  fileNum++;
                              }

                              // MongoDB 업데이트 쿼리를 설정합니다.
                              updateQuery = {};
                              updateQuery["photos.detail"] = photoDetailArr;
                              updateQuery["photos.first"] = 1;
                              updateQuery["photos.last"] = photoDetailArr.length;
                              updateQuery["contents.portfolio.detailInfo.photosg.first"] = 1;
                              updateQuery["contents.portfolio.detailInfo.photosg.last"] = photoDetailArr.length;

                              // MongoDB에서 기존 콘텐츠 데이터를 조회합니다.
                              [ thisOriginalContents ] = await back.mongoRead(collection, whereQuery, { selfMongo });
                              contentsDetailCopied = objectDeepCopy(thisOriginalContents.contents.portfolio.contents.detail);

                              // 콘텐츠 세부 정보가 1개 이상인 경우, 첫 번째와 두 번째 항목의 사진을 재설정합니다.
                              if (contentsDetailCopied.length > 1) {
                                  contentsDetailCopied[0].photo = [];
                                  contentsDetailCopied[1].photo = [];
                                  for (let i = 1; i < photoDetailArr.length + 1; i++) {
                                      contentsDetailCopied[1].photo.push(i);
                                  }
                                  for (let i = 2; i < contentsDetailCopied.length; i++) {
                                      contentsDetailCopied[i].photo = [];
                                  }
                                  updateQuery["contents.portfolio.contents.detail"] = objectDeepCopy(contentsDetailCopied);
                              }

                              // MongoDB에서 콘텐츠 데이터를 업데이트합니다.
                              await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo });
                              // 시스템에 콘텐츠 업데이트 요청을 보냅니다.
                              await requestSystem("https://" + instance.address.officeinfo.ghost.host + ":3000/frontReflection", { data: null }, { headers: { "Content-Type": "application/json" } });
                              // 슬랙 채널에 콘텐츠 보정 및 대치 완료 메시지를 전송합니다.
                              await messageSend({ text: pid + " 컨텐츠 보정본 업로드 및 대치를 완료하였어요, 순서 조정 및 에디팅을 해주세요\nlink : https://" + address.frontinfo.host + "/portdetail.php?pid=" + pid + "&edit=true", channel: "#502_sns_contents", voice: true });

                          })().catch((err) => { console.log(err); })
                      }

                      // 클라이언트에 완료 메시지를 응답합니다.
                      res.send(JSON.stringify({ "message": "done" }));
                  }
              } catch (e) {
                  // 오류가 발생한 경우, 오류를 로깅하고 클라이언트에게 오류 메시지를 응답합니다.
                  logger.error(e, req).catch((e) => { console.log(e); });
                  res.send(JSON.stringify({ message: "error : " + e.message }));
              }
          });
      } catch (e) {
          // 최종적으로 오류가 발생한 경우, 오류를 로깅하고 클라이언트에게 오류 메시지를 응답합니다.
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @route POST /frontReflection
     * @description MongoDB 데이터를 MySQL로 동기화하는 API 엔드포인트입니다. 이 라우터는 디자이너와 콘텐츠 데이터를 MySQL로 이동하여 프론트엔드에서 사용할 수 있게 합니다.
     * @param {Object} req - 클라이언트 요청 객체입니다.
     * @param {Object} res - 서버 응답 객체입니다.
     */
    router.post([ "/frontReflection" ], async function (req, res) {
      // 클라이언트에게 JSON 형식으로 응답을 전송하기 위해 응답 헤더를 설정합니다.
      res.set({
          "Content-Type": "application/json", // 응답의 콘텐츠 타입을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 설정합니다.
      });

      try {
          /**
           * @function mongoToFront
           * @description 디자이너와 콘텐츠 데이터를 MongoDB에서 MySQL로 동기화하는 함수입니다.
           */
          const mongoToFront = async function () {
              try {
                  /**
                   * @function designerToFront
                   * @description 디자이너 데이터를 MongoDB에서 MySQL로 동기화하는 함수입니다.
                   */
                  const designerToFront = async function () {
                      try {
                          // MongoDB에서 디자이너 데이터를 쿼리합니다.
                          const designers = await back.getDesignersByQuery({});
                          let queryArr, columns, table;
                          let createQuery;
                          let types;
                  
                          table = "designer"; // MySQL에서 사용할 테이블 이름입니다.
                  
                          columns = [
                              "desid", // 디자이너 ID
                              "designer", // 디자이너 이름
                              "introduction", // 디자이너 소개
                              "porlid", // 포트폴리오 ID
                              "tid", // 추가 정보 ID
                          ];
                  
                          types = [
                              "VARCHAR(255)", // 각 컬럼의 데이터 타입을 정의합니다.
                              "VARCHAR(255)",
                              "TEXT",
                              "VARCHAR(255)",
                              "VARCHAR(255)",
                          ];
                  
                          // MongoDB에서 가져온 디자이너 데이터를 MySQL로 변환할 쿼리를 생성합니다.
                          queryArr = designers.frontMode().filter((obj) => {
                              // 계약 상태가 '해지'가 아닌 디자이너를 필터링합니다.
                              return !/해지/gi.test(obj.information.contract.status);
                          }).filter((obj) => {
                              // 프론트에 표시할 소개글이 있는 디자이너만 필터링합니다.
                              return obj.setting.front.introduction.desktop.length > 0;
                          }).filter((obj) => {
                              // 포트폴리오 ID가 특정 패턴을 따르는 디자이너만 필터링합니다.
                              return /^[ap]/i.test(obj.setting.front.photo.porlid);
                          }).map((designer) => {
                              let value;
                              let query;
                  
                              value = [
                                  designer.desid,
                                  designer.designer,
                                  designer.setting.front.introduction.desktop.join(" "), // 소개글을 공백으로 구분하여 결합합니다.
                                  designer.setting.front.photo.porlid,
                                  designer.setting.front.photo.index
                              ];
                  
                              // INSERT 쿼리를 생성합니다.
                              query = "INSERT INTO ";
                              query += table;
                              query += " (";
                              for (let i of columns) {
                                  query += i + ','; // 컬럼 이름을 추가합니다.
                              }
                              query = query.slice(0, -1) + ") VALUES ("; // 마지막 콤마를 제거하고 VALUES 절을 추가합니다.
                              for (let i of value) {
                                  query += "'" + String(i).replace(/\'/g, '"') + "',"; // 각 값을 쿼리에 추가합니다.
                              }
                              query = query.slice(0, -1) + ");"; // 마지막 콤마를 제거하고 쿼리를 종료합니다.
                  
                              return query; // 생성된 쿼리를 반환합니다.
                          });
                  
                          // MySQL 테이블을 생성하는 쿼리를 만듭니다.
                          createQuery = "CREATE TABLE " + table + " (id INT(11) NOT NULL AUTO_INCREMENT,";
                          for (let i = 0; i < columns.length; i++) {
                              createQuery += columns[i] + ' ' + types[i] + ','; // 각 컬럼에 데이터 타입을 지정합니다.
                          }
                          createQuery += "PRIMARY KEY (id));"; // 기본 키를 설정하고 쿼리를 종료합니다.
                  
                          queryArr.unshift(createQuery); // 테이블 생성 쿼리를 가장 앞에 추가합니다.
                          queryArr.unshift("DROP TABLE " + table + ";"); // 기존 테이블을 삭제하는 쿼리를 추가합니다.
                  
                          // 생성된 쿼리 배열을 MySQL에 실행합니다.
                          await mysqlQuery(queryArr);
                  
                      } catch (e) {
                          console.log(e); // 오류가 발생하면 콘솔에 출력합니다.
                      }
                  }

                  /**
                   * @function contentsToFront
                   * @description 콘텐츠 데이터를 MongoDB에서 MySQL로 동기화하는 함수입니다.
                   */
                  const contentsToFront = async function () {
                      try {
                          // MongoDB에서 콘텐츠 데이터를 쿼리합니다.
                          const contents = await back.getContentsArrByQuery({});
                          let queryArr, columns, table;
                          let createQuery;
                          let types;
                  
                          table = "contents"; // MySQL에서 사용할 테이블 이름입니다.
                  
                          columns = [
                              "conid", // 콘텐츠 ID
                              "desid", // 디자이너 ID
                              "pid", // 포트폴리오 ID
                              "rid", // 리뷰 ID
                              "portfoliotitlemain", // 포트폴리오 메인 타이틀
                              "portfoliotitlesub", // 포트폴리오 서브 타이틀
                              "apart", // 아파트 정보
                              "reviewtitlemain", // 리뷰 메인 타이틀
                              "reviewtitlesub", // 리뷰 서브 타이틀
                              "portfoliocontents", // 포트폴리오 내용
                              "reviewcontents", // 리뷰 내용
                              "portfoliotid", // 포트폴리오 TID
                              "reivewtid" // 리뷰 TID
                          ];
                  
                          types = [
                              "VARCHAR(255)", // 각 컬럼의 데이터 타입을 정의합니다.
                              "VARCHAR(255)",
                              "VARCHAR(255)",
                              "VARCHAR(255)",
                              "VARCHAR(255)",
                              "VARCHAR(255)",
                              "VARCHAR(255)",
                              "VARCHAR(255)",
                              "VARCHAR(255)",
                              "TEXT",
                              "TEXT",
                              "VARCHAR(255)",
                              "VARCHAR(255)",
                          ];
                  
                          // MongoDB에서 가져온 콘텐츠 데이터를 MySQL로 변환할 쿼리를 생성합니다.
                          queryArr = contents.map((obj) => {
                              let value;
                              let query;
                  
                              value = [
                                  obj.conid,
                                  obj.desid,
                                  obj.contents.portfolio.pid,
                                  obj.contents.review.rid,
                                  obj.contents.portfolio.title.main,
                                  obj.contents.portfolio.title.sub.split(", ")[0],
                                  obj.contents.portfolio.title.sub.split(", ")[1],
                                  obj.contents.review.title.main,
                                  obj.contents.review.title.sub.replace(/,/gi, ''),
                                  obj.contents.portfolio.contents.detail.toNormal().map((o) => { return o.contents }).join("\n"),
                                  obj.contents.review.contents.detail.toNormal().map((o) => { return o.contents.map((k) => { return k.question + "\n" + k.answer }).join("\n") }).join("\n").slice(1),
                                  't' + String(obj.contents.portfolio.detailInfo.photodae[1]),
                                  't' + String(obj.contents.review.detailInfo.photodae[1]),
                              ];
                  
                              // INSERT 쿼리를 생성합니다.
                              query = "INSERT INTO ";
                              query += table;
                              query += " (";
                              for (let i of columns) {
                                  query += i + ','; // 컬럼 이름을 추가합니다.
                              }
                              query = query.slice(0, -1) + ") VALUES ("; // 마지막 콤마를 제거하고 VALUES 절을 추가합니다.
                              for (let i of value) {
                                  query += "'" + String(i).replace(/\'/g, '"') + "',"; // 각 값을 쿼리에 추가합니다.
                              }
                              query = query.slice(0, -1) + ");"; // 마지막 콤마를 제거하고 쿼리를 종료합니다.
                  
                              return query; // 생성된 쿼리를 반환합니다.
                          });
                  
                          // MySQL 테이블을 생성하는 쿼리를 만듭니다.
                          createQuery = "CREATE TABLE " + table + " (id INT(11) NOT NULL AUTO_INCREMENT,";
                          for (let i = 0; i < columns.length; i++) {
                              createQuery += columns[i] + ' ' + types[i] + ','; // 각 컬럼에 데이터 타입을 지정합니다.
                          }
                          createQuery += "PRIMARY KEY (id));"; // 기본 키를 설정하고 쿼리를 종료합니다.
                  
                          queryArr.unshift(createQuery); // 테이블 생성 쿼리를 가장 앞에 추가합니다.
                          queryArr.unshift("DROP TABLE " + table + ";"); // 기존 테이블을 삭제하는 쿼리를 추가합니다.
                  
                          // 생성된 쿼리 배열을 MySQL에 실행합니다.
                          await mysqlQuery(queryArr);
                        
                      } catch (e) {
                          console.log(e); // 오류가 발생하면 콘솔에 출력합니다.
                      }
                  }
                  
                  // 디자이너와 콘텐츠 데이터를 MySQL로 동기화합니다.
                  await designerToFront();
                  await contentsToFront();
              } catch (e) {
                  // 오류가 발생하면 로깅하고 콘솔에 출력합니다.
                  logger.error(e, req).catch((e) => { console.log(e); });
                  console.log(e);
              }
          }

          // MongoDB 데이터를 MySQL로 동기화하는 함수를 실행합니다.
          mongoToFront().catch((err) => {
              logger.error(err, req).catch((e) => { console.log(e); });
          });

          // 클라이언트에게 "will do" 메시지를 응답합니다.
          res.send(JSON.stringify({ message: "will do" }));
      } catch (e) {
          // 최종적으로 오류가 발생한 경우, 오류를 로깅하고 클라이언트에게 오류 메시지를 응답합니다.
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /searchContents
     * @description 주어진 검색 조건에 따라 콘텐츠를 필터링하여 결과를 반환하는 API 엔드포인트입니다.
     * @param {Object} req - 클라이언트 요청 객체입니다.
     * @param {Object} res - 서버 응답 객체입니다.
     */
    router.post([ "/searchContents" ], async function (req, res) {
      // 클라이언트에게 JSON 형식으로 응답을 전송하기 위해 응답 헤더를 설정합니다.
      res.set({
          "Content-Type": "application/json", // 응답의 콘텐츠 타입을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 설정합니다.
      });

      try {
          // MongoDB 연결 객체를 설정합니다.
          const selfMongo = instance.mongo;
          const selfCoreMongo = instance.mongo;
          // MongoDB 컬렉션 이름을 설정합니다.
          const collection = "contents";
          const hideContents = [];
          const toNormal = true;
          // 서비스 파싱 메서드를 호출하여 서비스 키워드와 이름을 가져옵니다.
          const { keywords: seridKeywords, name: serviceNames } = serviceParsing();
          let limit;
          let contentsArr_raw;
          let contentsArr, designers;
          let reviewArr, indexArr;
          let indexSliceNumber;
          let contentsProjectQuery;
          let sortQuery;
          let cliidArr;
          let proidArr;
          let whereQuery, projectQuery;
          let thisClients, thisProjects;
          let thisRequestNumber;
          let thisClient;
          let proposalDate;
          let projects;
          let thisProject;
          let thisDesigner;
          let thisSerid;
          let fromDate, toDate;
          let dateDelta;
          let regionArr;
          let reg0, reg1;
          let thisArr;

          // MongoDB에서 가져올 필드를 설정합니다.
          contentsProjectQuery = {
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

          // 정렬 기준을 설정합니다. 리뷰 기반인지 포트폴리오 기반인지에 따라 다르게 설정됩니다.
          sortQuery = {};
          if (req.body.from === "review") {
              sortQuery = { "contents.review.detailInfo.order": -1 }; // 리뷰 순으로 정렬
          } else {
              sortQuery = { "contents.portfolio.detailInfo.sort.key9": -1 }; // 포트폴리오 순으로 정렬
          }

          // MongoDB에서 콘텐츠 데이터를 가져옵니다.
          contentsArr = await back.mongoPick(collection, [ {}, contentsProjectQuery ], { selfMongo, sort: sortQuery });
          if (contentsArr.length === 0) {
              // 결과가 없을 경우 빈 배열을 응답합니다.
              res.send(JSON.stringify({ conids: [] }));
          } else {
              // 디자이너 데이터를 가져옵니다.
              designers = await back.getDesignersByQuery({ $or: contentsArr.map((obj) => { return { desid: obj.desid } }) }, { selfMongo });
              cliidArr = [ ...new Set(contentsArr.map((o) => { return o.cliid.trim() }).filter((s) => { return s !== "" })) ];
              proidArr = [ ...new Set(contentsArr.map((o) => { return o.proid.trim() }).filter((s) => { return s !== "" })) ];

              if (cliidArr.length > 0) {
                  // 클라이언트 데이터를 가져오기 위한 쿼리를 설정합니다.
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
                  thisClients = await back.mongoPick("client", [ objectDeepCopy(whereQuery), objectDeepCopy(projectQuery) ], { selfMongo: selfCoreMongo });

                  // 프로젝트 데이터를 가져오기 위한 쿼리를 설정합니다.
                  whereQuery = { $or: proidArr.map((proid) => { return { proid } }) };
                  projectQuery = {
                      proid: 1,
                      cliid: 1,
                      desid: 1,
                      "proposal.date": 1,
                      process: 1,
                  }
                  thisProjects = await back.mongoPick("project", [ objectDeepCopy(whereQuery), objectDeepCopy(projectQuery) ], { selfMongo: selfCoreMongo });

                  projects = [];
                  for (let project of thisProjects) {
                      // 제안 날짜를 파싱합니다.
                      proposalDate = new Date(JSON.stringify(project.proposal.date).slice(1, -1));
                      thisClient = thisClients.find((c) => { return c.cliid === project.cliid });

                      // 클라이언트의 요청을 시간순으로 비교하여 적절한 요청 번호를 찾습니다.
                      thisRequestNumber = 0;
                      for (let i = 0; i < thisClient.requests.length; i++) {
                          if (thisClient.requests[i].request.timeline.valueOf() <= proposalDate.valueOf()) {
                              thisRequestNumber = i;
                              break;
                          }
                      }

                      // 프로젝트에 클라이언트 정보와 요청 번호를 추가합니다.
                      project.requestNumber = thisRequestNumber;
                      project.client = {
                          name: thisClient.name,
                          cliid: thisClient.cliid,
                          request: objectDeepCopy(thisClient.requests[thisRequestNumber].request),
                      };
                      projects.push(project);
                  }

                  // 콘텐츠 배열을 순회하며 각 콘텐츠에 해당 프로젝트와 디자이너 정보를 추가합니다.
                  for (let contents of contentsArr) {
                      if (contents.proid !== "") {
                          thisProject = projects.find((p) => { return p.proid === contents.proid });
                          contents.project = objectDeepCopy(thisProject);
                      } else {
                          contents.project = { client: { request: {} } };
                      }
                      thisDesigner = designers.find((d) => { return d.desid === contents.desid });
                      contents.designer = thisDesigner.designer;
                  }

              } else {
                  // 클라이언트 ID가 없는 경우 기본값을 설정합니다.
                  for (let contents of contentsArr) {
                      contents.project = { client: { request: {} } };
                      thisDesigner = designers.find((d) => { return d.desid === contents.desid });
                      contents.designer = thisDesigner.designer;
                  }
              }

              // equalJson 메서드를 사용하여 요청에서 데이터를 파싱합니다.
              const { subject, value } = equalJson(req.body);

              // 주제(subject)에 따라 콘텐츠를 필터링합니다.
              if (subject === "평수") {
                  // 평수로 필터링합니다.
                  contentsArr = contentsArr.filter((c) => { return typeof c.contents.portfolio.spaceInfo.pyeong === "number" });
                  if (value === "10평 미만") {
                      contentsArr = contentsArr.filter((c) => {
                          const pyeong = c.contents.portfolio.spaceInfo.pyeong;
                          return pyeong < 10;
                      });
                  } else if (value === "60평 이상") {
                      contentsArr = contentsArr.filter((c) => {
                          const pyeong = c.contents.portfolio.spaceInfo.pyeong;
                          return pyeong >= 60;
                      });
                  } else {
                      contentsArr = contentsArr.filter((c) => {
                          const pyeong = c.contents.portfolio.spaceInfo.pyeong;
                          const standard = Number(value.replace(/[^0-9]/gi, ''))
                          return (pyeong >= standard && pyeong < (standard + 10));
                      });
                  }

                  // 필터링된 콘텐츠 ID 목록을 응답합니다.
                  res.send(JSON.stringify({ conids: contentsArr.map((c) => { return c.conid }) }));
              } else if (subject === "예산") {
                  // 예산으로 필터링합니다.
                  contentsArr = contentsArr.filter((c) => { return typeof c.project.client.request.budget === "string" });
                  if (value === "500만원 이하") {
                      contentsArr = contentsArr.filter((c) => {
                          const budget = Number(c.project.client.request.budget.replace(/[^0-9]/gi, ''));
                          return (budget > 50 && budget <= 500);
                      });
                  } else if (value === "6,000만원 이상") {
                      contentsArr = contentsArr.filter((c) => {
                          const budget = Number(c.project.client.request.budget.replace(/[^0-9]/gi, ''));
                          return (budget >= 6000 || budget <= 50);
                      });
                  } else {
                      contentsArr = contentsArr.filter((c) => {
                          const budget = Number(c.project.client.request.budget.replace(/[^0-9]/gi, ''));
                          const standard = Number(value.replace(/[^0-9]/gi, ''))
                          return (budget >= standard && budget < (standard + 1000));
                      });
                  }

                  // 필터링된 콘텐츠 ID 목록을 응답합니다.
                  res.send(JSON.stringify({ conids: contentsArr.map((c) => { return c.conid }) }));

              } else if (subject === "서비스 종류") {
                  // 서비스 종류로 필터링합니다.
                  thisSerid = seridKeywords + String(serviceNames.findIndex((s) => { return s === value }) + 1) + 's';
                  contentsArr = contentsArr.filter((c) => { return c.service.serid === thisSerid });

                  // 필터링된 콘텐츠 ID 목록을 응답합니다.
                  res.send(JSON.stringify({ conids: contentsArr.map((c) => { return c.conid }) }));

              } else if (subject === "서비스 기간") {
                  // 서비스 기간으로 필터링합니다.
                  contentsArr = contentsArr.filter((c) => { return typeof c.project.process === "object" });
                  contentsArr = contentsArr.filter((c) => {
                      fromDate = c.project.process.contract.form.date.from;
                      toDate = c.project.process.contract.form.date.to;
                      dateDelta = Math.floor(((((toDate.valueOf() - fromDate.valueOf()) / 1000) / 60) / 60) / 24);
                      if (value === "3주 이내") {
                          return dateDelta < 21;
                      } else if (value === "6주 이상") {
                          return dateDelta >= 42;
                      } else {
                          return (dateDelta >= 21 && dateDelta < 42);
                      }
                  });
                  // 필터링된 콘텐츠 ID 목록을 응답합니다.
                  res.send(JSON.stringify({ conids: contentsArr.map((c) => { return c.conid }) }));

              } else if (subject === "지역") {
                  // 지역으로 필터링합니다.
                  contentsArr = contentsArr.filter((c) => { return typeof c.project.client.request.space === "object" });
                  contentsArr = contentsArr.filter((c) => {
                      if (value === "서울 / 경기") {
                          // 서울 및 경기 지역을 포함하는 콘텐츠를 필터링합니다.
                          thisArr = [
                              "서울",
                              "남구",
                              "강동",
                              "강북",
                              "강서",
                              "관악",
                              "광진",
                              "구로",
                              "금천",
                              "노원",
                              "도봉",
                              "동대문",
                              "동작",
                              "마포",
                              "서대문",
                              "서초",
                              "성동",
                              "성북",
                              "송파",
                              "양천",
                              "영등포",
                              "용산",
                              "은평",
                              "종로",
                              "중구",
                              "중랑구",
                              "경기",
                              "의정부",
                              "포천",
                              "인천",
                          ];
                          return thisArr.some((str) => {
                              const thisReg = new RegExp("^[ ]*" + (str.trim()), "gi");
                              return thisReg.test(c.project.client.request.space.address.trim());
                          });

                      } else if (value === "충청 / 강원") {
                          // 충청 및 강원 지역을 포함하는 콘텐츠를 필터링합니다.
                          thisArr = [
                              "충청",
                              "충북",
                              "충남",
                              "세종",
                              "대전",
                              "청주",
                              "제천",
                              "천안",
                              "강원",
                              "강릉",
                              "원주",
                              "속초",
                          ];
                          return thisArr.some((str) => {
                              const thisReg = new RegExp("^[ ]*" + (str.trim()), "gi");
                              return thisReg.test(c.project.client.request.space.address.trim());
                          });

                      } else if (value === "전라 / 경상") {
                          // 전라 및 경상 지역을 포함하는 콘텐츠를 필터링합니다.
                          thisArr = [
                              "전라",
                              "경상",
                              "전남",
                              "전북",
                              "경북",
                              "경남",
                              "광주",
                              "대구",
                              "부산",
                              "울산",
                          ];
                          return thisArr.some((str) => {
                              const thisReg = new RegExp("^[ ]*" + (str.trim()), "gi");
                              return thisReg.test(c.project.client.request.space.address.trim());
                          });

                      } else if (value === "제주") {
                          // 제주 지역을 포함하는 콘텐츠를 필터링합니다.
                          thisArr = [
                              "제주",
                              "서귀포",
                          ];
                          return thisArr.some((str) => {
                              const thisReg = new RegExp("^[ ]*" + (str.trim()), "gi");
                              return thisReg.test(c.project.client.request.space.address.trim());
                          });

                      } else {
                          // 모든 지역을 포함하는 콘텐츠를 필터링합니다.
                          thisArr = [
                              "서울",
                              "남구",
                              "강동",
                              "강북",
                              "강서",
                              "관악",
                              "광진",
                              "구로",
                              "금천",
                              "노원",
                              "도봉",
                              "동대문",
                              "동작",
                              "마포",
                              "서대문",
                              "서초",
                              "성동",
                              "성북",
                              "송파",
                              "양천",
                              "영등포",
                              "용산",
                              "은평",
                              "종로",
                              "중구",
                              "중랑구",
                              "경기",
                              "의정부",
                              "포천",
                              "인천",
                              "충청",
                              "충북",
                              "충남",
                              "세종",
                              "대전",
                              "청주",
                              "제천",
                              "천안",
                              "강원",
                              "강릉",
                              "원주",
                              "속초",
                              "전라",
                              "경상",
                              "전남",
                              "전북",
                              "경북",
                              "경남",
                              "광주",
                              "대구",
                              "부산",
                              "울산",
                              "제주",
                              "서귀포",
                          ];

                          return thisArr.every((str) => {
                              const thisReg = new RegExp("^[ ]*" + (str.trim()), "gi");
                              return !thisReg.test(c.project.client.request.space.address.trim());
                          });
                      }
                  });
                  // 필터링된 콘텐츠 ID 목록을 응답합니다.
                  res.send(JSON.stringify({ conids: contentsArr.map((c) => { return c.conid }) }));

              } else if (subject === "전체") {
                  // 전체 콘텐츠 ID 목록을 응답합니다.
                  res.send(JSON.stringify({ conids: contentsArr.map((c) => { return c.conid }) }));
              } else {
                  // 기본적으로 전체 콘텐츠 ID 목록을 응답합니다.
                  res.send(JSON.stringify({ conids: contentsArr.map((c) => { return c.conid }) }));
              }
          }

      } catch (e) {
          // 오류가 발생하면 로깅하고 클라이언트에게 오류 메시지를 응답합니다.
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /hiddenContents
     * @description 숨겨진 콘텐츠 리스트를 관리하는 API 엔드포인트입니다. 콘텐츠를 가져오거나, 업데이트하거나, 추가하거나, 제거하는 기능을 제공합니다.
     * @param {Object} req - 클라이언트 요청 객체입니다.
     * @param {Object} res - 서버 응답 객체입니다.
     */
    router.post([ "/hiddenContents" ], async function (req, res) {
      // 클라이언트에게 JSON 형식으로 응답을 전송하기 위해 응답 헤더를 설정합니다.
      res.set({
          "Content-Type": "application/json", // 응답의 콘텐츠 타입을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 설정합니다.
      });

      try {
          // 로컬 MongoDB 연결 객체를 설정합니다.
          const selfMongo = instance.mongolocal;
          // 사용할 컬렉션 이름을 설정합니다.
          const collection = "hiddenContents";
          // equalJson 메서드를 사용하여 요청에서 데이터를 파싱합니다.
          const { mode } = equalJson(req.body); // mode는 'get', 'update', 'add', 'remove' 중 하나입니다.
          let target;
          let updateQuery, contents;
          let updatedContents;

          // 모드에 따라 다른 작업을 수행합니다.
          if (mode === "get") {
              // 모드가 'get'인 경우, 숨겨진 콘텐츠 리스트를 가져와 클라이언트에게 응답합니다.

              // MongoDB에서 데이터를 읽어옵니다.
              [ target ] = await back.mongoRead(collection, {}, { selfMongo });
              // 가져온 콘텐츠 리스트를 JSON 형식으로 클라이언트에게 전송합니다.
              res.send(JSON.stringify(target.contents));

          } else if (mode === "update") {
              // 모드가 'update'인 경우, 숨겨진 콘텐츠 리스트를 업데이트합니다.

              // 요청에서 업데이트 쿼리를 파싱합니다.
              const { updateQuery } = equalJson(req.body);
              // 업데이트 쿼리에 현재 날짜를 추가합니다.
              updateQuery["date"] = new Date();
              // MongoDB에서 해당 컬렉션을 업데이트합니다.
              await back.mongoUpdate(collection, [ {}, updateQuery ], { selfMongo });
              // 작업 완료 메시지를 클라이언트에게 응답합니다.
              res.send(JSON.stringify({ message: "done" }));

          } else if (mode === "add") {
              // 모드가 'add'인 경우, 새로운 콘텐츠를 숨겨진 리스트에 추가합니다.

              // 요청에서 pid를 파싱합니다.
              const { pid } = equalJson(req.body);
              // MongoDB에서 현재 숨겨진 콘텐츠 리스트를 가져옵니다.
              [ target ] = await back.mongoRead(collection, {}, { selfMongo });
              // 현재 콘텐츠 리스트를 복사합니다.
              contents = objectDeepCopy(target.contents);
              // 새로운 pid를 콘텐츠 리스트에 추가합니다.
              contents.push(pid);
              // 중복된 pid를 제거합니다.
              contents = [ ...new Set(contents) ];
              // 업데이트 쿼리를 생성하고, 현재 날짜와 새로운 콘텐츠 리스트를 포함시킵니다.
              updateQuery = { date: new Date(), contents };
              // MongoDB에서 해당 컬렉션을 업데이트합니다.
              await back.mongoUpdate(collection, [ {}, updateQuery ], { selfMongo });
              // 작업 완료 메시지를 클라이언트에게 응답합니다.
              res.send(JSON.stringify({ message: "done" }));

          } else if (mode === "remove") {
              // 모드가 'remove'인 경우, 콘텐츠를 숨겨진 리스트에서 제거합니다.

              // 요청에서 pid를 파싱합니다.
              const { pid } = equalJson(req.body);
              // MongoDB에서 현재 숨겨진 콘텐츠 리스트를 가져옵니다.
              [ target ] = await back.mongoRead(collection, {}, { selfMongo });
              // 현재 콘텐츠 리스트를 복사합니다.
              contents = objectDeepCopy(target.contents);
              // 콘텐츠 리스트에서 해당 pid를 제거합니다.
              updatedContents = [];
              for (let p of contents) {
                  if (p !== pid) {
                      updatedContents.push(p);
                  }
              }
              // 중복된 pid를 제거한 후, 콘텐츠 리스트를 업데이트합니다.
              contents = [ ...new Set(updatedContents) ];
              // 업데이트 쿼리를 생성하고, 현재 날짜와 새로운 콘텐츠 리스트를 포함시킵니다.
              updateQuery = { date: new Date(), contents };
              // MongoDB에서 해당 컬렉션을 업데이트합니다.
              await back.mongoUpdate(collection, [ {}, updateQuery ], { selfMongo });
              // 작업 완료 메시지를 클라이언트에게 응답합니다.
              res.send(JSON.stringify({ message: "done" }));

          } else {
              // 모드가 지정되지 않았거나 유효하지 않은 경우, 오류를 발생시킵니다.
              throw new Error("invalid mode");
          }

      } catch (e) {
          // 오류가 발생하면 로깅하고 클라이언트에게 오류 메시지를 응답합니다.
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /syncContentsTag
     * @description 콘텐츠의 태그를 동기화하는 API 엔드포인트입니다. 콘텐츠의 본문과 공간 정보를 기반으로 키워드를 생성하여 태그 필드에 저장합니다.
     * @param {Object} req - 클라이언트 요청 객체입니다.
     * @param {Object} res - 서버 응답 객체입니다.
     */
    router.post([ "/syncContentsTag" ], async function (req, res) {
      // 클라이언트에게 JSON 형식으로 응답을 전송하기 위해 응답 헤더를 설정합니다.
      res.set({
          "Content-Type": "application/json", // 응답의 콘텐츠 타입을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 설정합니다.
      });

      try {
          // 로컬 MongoDB와 코어 MongoDB 연결 객체를 설정합니다.
          const selfMongo = instance.mongolocal;
          const selfCoreMongo = instance.mongo;
          // 사용할 컬렉션 이름을 설정합니다.
          const collection = "contents";

          // 비동기 함수로 태그 동기화 작업을 실행합니다.
          (async () => {
              // 콘텐츠 데이터를 MongoDB에서 읽어옵니다.
              const targets = await back.mongoRead(collection, {}, { selfMongo: selfCoreMongo });
              // 각 콘텐츠의 키워드를 생성합니다.
              const keywordsArr = targets.map((c) => {
                  // 콘텐츠의 본문을 공백으로 분리하여 배열로 변환합니다.
                  const bodyArr = c.contents.portfolio.contents.detail[0].contents.split(" ");
                  // 본문과 관련된 키워드를 필터링하고 정제합니다.
                  const keywordsArr = [ ...new Set(
                      bodyArr
                          .map((s) => s.trim()) // 각 문자열의 양 끝 공백을 제거합니다.
                          .map((s) => s.replace(/[\n\t ]/gi, "")) // 줄바꿈, 탭, 공백을 제거합니다.
                          .map((s) => s.replace(/을$/gi, "").replace(/으로$/gi, "").replace(/하고$/gi, "")) // 불필요한 조사 및 어미를 제거합니다.
                          .map((s) => s.replace(/[^가-힣0-9]/gi, "")) // 한글과 숫자 이외의 문자 제거합니다.
                          .filter((s) => !/고객|스타일링|문의|의뢰/gi.test(s)) // 특정 단어를 포함하지 않는 키워드만 남깁니다.
                          .map((s) => s.replace(/[은는이가을를]$/, "").replace(/[와과]$/, "")) // 불필요한 조사를 제거합니다.
                          .map((s) => s.replace(/입니다$/, "")) // "입니다"로 끝나는 어미를 제거합니다.
                          .filter((s) => s !== "" && s.trim().length > 2) // 빈 문자열과 길이가 짧은 키워드를 제거합니다.
                  )]
                  // 콘텐츠의 공간 정보와 제목 등을 태그로 추가합니다.
                  return {
                      conid: c.conid, // 콘텐츠 ID를 설정합니다.
                      keywords: keywordsArr.concat([
                          "all", // 전체를 나타내는 기본 태그를 추가합니다.
                          c.contents.portfolio.spaceInfo.space, // 공간 정보를 태그로 추가합니다.
                          `${c.contents.portfolio.spaceInfo.pyeong}평`, // 평수를 태그로 추가합니다.
                          `${Math.floor(c.contents.portfolio.spaceInfo.pyeong / 10) * 10}평형`, // 평형을 태그로 추가합니다.
                          c.contents.portfolio.spaceInfo.region, // 지역 정보를 태그로 추가합니다.
                          ...c.contents.portfolio.spaceInfo.space.split(" "), // 공간 정보에서 공백으로 분리된 태그를 추가합니다.
                          ...c.contents.portfolio.spaceInfo.region.split(" "), // 지역 정보에서 공백으로 분리된 태그를 추가합니다.
                          serviceParsing(c.service).replace(/[^가-힣 ]/gi, "").trim(), // 서비스 정보를 태그로 추가합니다.
                          ...c.contents.portfolio.title.main.split(" ").map((s) => s.trim()).filter((s) => s !== "") // 제목의 단어를 태그로 추가합니다.
                      ])
                  };
              });

              // 각 콘텐츠에 대해 생성된 태그를 업데이트합니다.
              for (let { conid, keywords } of keywordsArr) {
                  await back.mongoUpdate(collection, [{ conid }, { "contents.portfolio.detailInfo.tag": keywords }], { selfMongo });
                  await back.mongoUpdate(collection, [{ conid }, { "contents.portfolio.detailInfo.tag": keywords }], { selfMongo: selfCoreMongo });
              }
          })().catch((err) => {
              // 비동기 작업 중 오류가 발생하면 로깅합니다.
              logger.error(err, req).catch((e) => { console.log(e); });
          });

          // 클라이언트에게 작업이 시작되었음을 알리는 메시지를 응답합니다.
          res.send(JSON.stringify({ message: "will do" }));

      } catch (e) {
          // 오류가 발생하면 로깅하고 클라이언트에게 오류 메시지를 응답합니다.
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /updateDesignerProposalSetting
     * @description 디자이너 제안 설정을 업데이트하는 API 엔드포인트입니다. 특정 디자이너의 제안 설정을 업데이트합니다.
     * @param {Object} req - 클라이언트 요청 객체입니다.
     * @param {Object} res - 서버 응답 객체입니다.
     */
    router.post([ "/updateDesignerProposalSetting" ], async function (req, res) {
      // 클라이언트에게 JSON 형식으로 응답을 전송하기 위해 응답 헤더를 설정합니다.
      res.set({
          "Content-Type": "application/json", // 응답의 콘텐츠 타입을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 설정합니다.
      });

      try {
          // 로컬 MongoDB와 코어 MongoDB 연결 객체를 설정합니다.
          const selfMongo = instance.mongolocal;
          const selfCoreMongo = instance.mongo;
          // 사용할 컬렉션 이름을 설정합니다.
          const collection = "designer";
          // equalJson 메서드를 사용하여 요청에서 데이터를 파싱합니다.
          const { desid, photo, description } = equalJson(req.body); // desid, photo, description을 파싱합니다.
          let dummy, proposalArr;

          // 기본 제안 설정 객체를 생성하는 함수입니다.
          dummy = () => {
              return {
                  name: "기본 세팅", // 기본 설정 이름을 설정합니다.
                  photo: objectDeepCopy(photo), // 요청에서 받은 photo 데이터를 깊은 복사합니다.
                  description: objectDeepCopy(description) // 요청에서 받은 description 데이터를 깊은 복사합니다.
              };
          };

          // 제안 설정 배열을 초기화합니다.
          proposalArr = [];
          // 기본 제안 설정을 5개의 배열 요소로 추가합니다.
          for (let i = 0; i < 5; i++) {
              proposalArr.push(objectDeepCopy(dummy()));
          }

          // 로컬 MongoDB의 디자이너 컬렉션을 업데이트합니다.
          await back.mongoUpdate(collection, [{ desid }, { "setting.proposal": proposalArr }], { selfMongo });
          // 코어 MongoDB의 디자이너 컬렉션을 업데이트합니다.
          await back.mongoUpdate(collection, [{ desid }, { "setting.proposal": proposalArr }], { selfMongo: selfCoreMongo });

          // 작업 완료 메시지를 클라이언트에게 응답합니다.
          res.send(JSON.stringify({ message: "done" }));

      } catch (e) {
          // 오류가 발생하면 로깅하고 클라이언트에게 오류 메시지를 응답합니다.
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /getContents
     * @description 홈리에종 프론트 웹에서 컨텐츠와 디자이너 정보를 가져오는 메인 라우트입니다.
     *              이 라우트는 포트폴리오, 리뷰, 디자이너 정보 등을 가져오기 위한 여러 모드를 지원합니다.
     * @param {Object} req - 클라이언트의 요청 객체입니다.
     * @param {Object} res - 서버의 응답 객체입니다.
     */
    router.post([ "/getContents" ], async function (req, res) {
      // 응답 헤더를 설정하여 클라이언트에게 JSON 형식의 데이터를 보내기 위한 준비를 합니다.
      res.set({
          "Content-Type": "application/json", // 응답의 콘텐츠 유형을 JSON으로 설정
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 요청 헤더를 설정
      });

      try {
          // MongoDB 인스턴스를 가져옵니다. 
          // selfMongo와 selfCoreMongo는 동일한 MongoDB 인스턴스를 참조합니다.
          const selfMongo = instance.mongo;
          const selfCoreMongo = instance.mongo;
          // 로컬에서 MongoDB 인스턴스를 가져옵니다. 이는 일부 로컬 데이터 작업에 사용됩니다.
          const selfLocalMongo = instance.mongolocal;

          // 숨겨진 컨텐츠를 담고 있는 콜렉션을 읽어옵니다.
          const hiddenCollection = "hiddenContents";
          const collection = "contents"; // 컨텐츠를 담고 있는 콜렉션입니다.

          // 숨겨진 컨텐츠 목록을 가져옵니다.
          const hideContents = (await back.mongoRead(hiddenCollection, {}, { selfMongo: selfLocalMongo }))[0].contents;
          
          // 기본 값을 설정합니다.
          const toNormal = true;
          const defaultDelta = 45; // 기본 기간 설정 값입니다.
          const moneyDelta = 2500000; // 기본 소비자 가격 설정 값입니다.

          // 이후 사용될 변수들을 선언합니다.
          let limit;
          let contentsArr_raw;
          let contentsArr, designers;
          let reviewArr, indexArr;
          let indexSliceNumber;
          let contentsProjectQuery;
          let sortQuery;
          let whereQuery;
          let thisProid;
          let period;
          let thisProject;
          let delta;
          let dayDelta;
      
          // 요청에서 mode가 "portfolio" 또는 "review"일 때 처리합니다.
          if (req.body.mode === "portfolio" || req.body.mode === "review") {
      
              // 요청에서 pid(포트폴리오 또는 리뷰 ID)가 주어졌을 경우 처리합니다.
              if (req.body.pid !== undefined) {
                  // pid가 리뷰 ID로 시작할 경우 (re로 시작)
                  if (/^re/.test(req.body.pid)) {
                      // 리뷰 ID에 해당하는 컨텐츠를 가져옵니다.
                      contentsArr = await back.mongoRead(collection, { "contents.review.rid": req.body.pid }, { selfMongo });
                      contentsArr = contentsArr.filter((obj) => {
                          return obj.contents.review.rid === req.body.pid; // 리뷰 ID가 일치하는지 확인합니다.
                      });
                  } else {
                      // 포트폴리오 ID에 해당하는 컨텐츠를 가져옵니다.
                      contentsArr = await back.mongoRead(collection, { "contents.portfolio.pid": req.body.pid }, { selfMongo });
                      contentsArr = contentsArr.filter((obj) => {
                          return obj.contents.portfolio.pid === req.body.pid; // 포트폴리오 ID가 일치하는지 확인합니다.
                      });
                  }
      
                  // 컨텐츠가 존재할 경우
                  if (contentsArr.length > 0) {
                      thisProid = contentsArr[0].proid; // 해당 컨텐츠의 프로젝트 ID를 가져옵니다.
                      contentsArr[0].consumer = moneyDelta; // 기본 소비자 가격을 설정합니다.

                      // 프로젝트 ID가 p로 시작하는 경우, 프로젝트 세부 정보를 가져옵니다.
                      if (/^p/gi.test(thisProid)) {
                          [ thisProject ] = await back.mongoPick("project", [ { proid: thisProid }, {
                              "process.contract.remain.calculation": 1,
                              "process.contract.form.date": 1,
                          } ], { selfMongo: selfCoreMongo });
                          
                          // 프로젝트가 존재할 경우 기간 계산 및 소비자 가격을 설정합니다.
                          if (thisProject !== undefined && thisProject !== null) {
                              delta = thisProject.process.contract.form.date.to.valueOf() - thisProject.process.contract.form.date.from.valueOf();
                              dayDelta = Math.floor((((delta / 1000) / 60) / 60) / 24); // 일 수 계산

                              // 기간이 10일 이상일 경우 계산된 기간을 사용하고, 그렇지 않을 경우 기본 기간을 사용합니다.
                              if (!Number.isNaN(Number(dayDelta)) && dayDelta > 10) {
                                  period = "약 " + String(dayDelta) + "일";
                              } else {
                                  period = "약 " + String(defaultDelta) + "일";
                              }

                              // 프로젝트의 소비자 가격을 설정합니다.
                              contentsArr[0].consumer = thisProject.process.contract.remain.calculation.amount.consumer;
                              // 소비자 가격이 유효하지 않을 경우 기본값을 사용합니다.
                              if (Number.isNaN(Number(contentsArr[0].consumer))) {
                                  contentsArr[0].consumer = moneyDelta;
                              }
                          } else {
                              period = "약 " + String(defaultDelta) + "일"; // 프로젝트가 없을 경우 기본 기간을 사용합니다.
                          }
                      } else {
                          period = "약 " + String(defaultDelta) + "일"; // 프로젝트 ID가 없을 경우 기본 기간을 사용합니다.
                      }

                      contentsArr[0].period = period; // 컨텐츠에 기간을 설정합니다.

                      // 디자이너 정보를 가져옵니다.
                      designers = await back.getDesignersByQuery({ $or: contentsArr.map((obj) => { return { desid: obj.desid } }) }, { selfMongo });

                      // 가져온 컨텐츠와 디자이너 정보를 JSON 형태로 클라이언트에게 응답합니다.
                      res.send(JSON.stringify({
                          contentsArr: contentsArr,
                          designers: designers.frontMode(),
                      }));
                  } else {
                      // 컨텐츠가 없을 경우 빈 배열을 응답합니다.
                      res.send(JSON.stringify({
                          contentsArr: contentsArr,
                          designers: [],
                      }));
                  }
      
              } else {
      
                  // 기본적으로 가져올 컨텐츠의 필드를 정의합니다.
                  contentsProjectQuery = {
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
      
                  sortQuery = {};
                  // 요청이 리뷰 모드인 경우 정렬을 리뷰 순서에 따라 설정합니다.
                  if (req.body.mode === "review") {
                      sortQuery = { "contents.review.detailInfo.order": -1 };
                  } else {
                      sortQuery = { "contents.portfolio.detailInfo.sort.key9": -1 }; // 기본 정렬 설정 (포트폴리오 정렬 기준)
                  }
      
                  // 숨겨진 컨텐츠를 제외하는 쿼리를 생성합니다.
                  whereQuery = { "$and": hideContents.map((pid) => { return { "contents.portfolio.pid": { "$not": { "$regex": "^" + pid + "$" } } } }) };
                  // 기본 제목이 아닌 컨텐츠만 가져옵니다.
                  whereQuery["$and"].push({ "contents.portfolio.title.main": { "$not": { "$regex": "제목을 입력해"} } });

                  // limit이 설정된 경우 limit만큼 컨텐츠를 가져옵니다.
                  if (req.body.limit !== undefined) {
                      contentsArr = await back.mongoPick(collection, [ whereQuery, contentsProjectQuery ], { selfMongo, sort: sortQuery, limit: Number(req.body.limit) });
                  } else {
                      contentsArr = await back.mongoPick(collection, [ whereQuery, contentsProjectQuery ], { selfMongo, sort: sortQuery });
                  }

                  // 숨겨진 컨텐츠를 필터링하여 최종 컨텐츠 배열을 만듭니다.
                  contentsArr = contentsArr.filter((obj) => { return !hideContents.includes(obj.contents.portfolio.pid); });
      
                  if (contentsArr.length > 0) {
                      // 디자이너 정보를 가져옵니다.
                      designers = await back.getDesignersByQuery({ $or: contentsArr.map((obj) => { return { desid: obj.desid } }) }, { selfMongo });
                      // 가져온 컨텐츠와 디자이너 정보를 JSON 형태로 클라이언트에게 응답합니다.
                      res.send(JSON.stringify({
                          contentsArr: contentsArr,
                          designers: designers.frontMode(),
                      }));
                  } else {
                      // 가져올 컨텐츠가 없을 경우 빈 배열을 응답합니다.
                      res.send(JSON.stringify({
                          contentsArr: contentsArr,
                          designers: [],
                      }));
                  }
              }
      
          } else if (req.body.mode === "designer") {
      
              // 디자이너 ID가 없는 경우 (디자이너 전체를 가져오는 경우)
              if (req.body.desid === undefined) {
      
                  // 기본적으로 가져올 컨텐츠의 필드를 정의합니다.
                  contentsProjectQuery = {
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
                  sortQuery = { "contents.portfolio.detailInfo.sort.key9": -1 }; // 기본 정렬 설정 (포트폴리오 정렬 기준)
      
                  // 디자이너 정보 전체를 가져옵니다.
                  designers = await back.getDesignersByQuery({}, { selfMongo });
                  // 숨겨진 컨텐츠를 제외하고 컨텐츠를 가져옵니다.
                  contentsArr = await back.mongoPick(collection, [ { "$and": hideContents.map((pid) => { return { "contents.portfolio.pid": { "$not": { "$regex": "^" + pid + "$" } } } }) }, contentsProjectQuery ], { selfMongo, sort: sortQuery });
                  contentsArr = contentsArr.filter((obj) => { return !hideContents.includes(obj.contents.portfolio.pid); });
      
                  // 가져온 컨텐츠와 디자이너 정보를 JSON 형태로 클라이언트에게 응답합니다.
                  res.send(JSON.stringify({
                      contentsArr: contentsArr,
                      designers: designers.frontMode(),
                  }));
      
              } else {
      
                  // 특정 디자이너 ID에 해당하는 컨텐츠를 가져옵니다.
                  contentsProjectQuery = {
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
                  sortQuery = { "contents.portfolio.detailInfo.sort.key9": -1 }; // 기본 정렬 설정 (포트폴리오 정렬 기준)
      
                  // 주어진 디자이너 ID에 해당하는 디자이너 정보를 가져옵니다.
                  designers = await back.getDesignersByQuery({ desid: req.body.desid }, { selfMongo });

                  // 숨겨진 컨텐츠를 제외하고, 특정 디자이너의 컨텐츠를 가져옵니다.
                  whereQuery = { "$and": hideContents.map((pid) => { return { "contents.portfolio.pid": { "$not": { "$regex": "^" + pid + "$" } } } }) };
                  whereQuery["$and"].push({ desid: req.body.desid });
                  contentsArr = await back.mongoPick(collection, [ whereQuery, contentsProjectQuery ], { selfMongo, sort: sortQuery });
      
                  // 가져온 컨텐츠와 디자이너 정보를 JSON 형태로 클라이언트에게 응답합니다.
                  res.send(JSON.stringify({
                      contentsArr: contentsArr,
                      designers: designers.frontMode(),
                  }));
      
              }
      
          } else if (req.body.mode === "index") {
      
              // 인덱스 모드일 경우, 가져올 컨텐츠의 최대 개수를 설정합니다.
              indexSliceNumber = 9;
      
              // 기본적으로 가져올 컨텐츠의 필드를 정의합니다.
              contentsProjectQuery = {
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
      
              // 숨겨진 컨텐츠를 제외하는 쿼리를 생성합니다.
              whereQuery = { "$and": hideContents.map((pid) => { return { "contents.portfolio.pid": { "$not": { "$regex": "^" + pid + "$" } } } }) };
              whereQuery["$and"].push({ "contents.portfolio.title.main": { "$not": { "$regex": "제목을 입력해"} } });
      
              // 기본 컨텐츠를 가져옵니다.
              contentsArr_raw = await back.mongoPick(collection, [ whereQuery, contentsProjectQuery ], { selfMongo });
              // 리뷰와 인덱스 컨텐츠를 필터링합니다.
              reviewArr = contentsArr_raw.filter((obj) => { return !hideContents.includes(obj.contents.portfolio.pid); }).filter((obj) => { return !/999/gi.test(obj.contents.review.rid); });
              indexArr = contentsArr_raw.filter((obj) => { return !hideContents.includes(obj.contents.portfolio.pid); });
      
              // 컨텐츠를 정렬합니다.
              contentsArr.sort((a, b) => {
                  return Number(b.contents.portfolio.detailInfo.sort.key9) - Number(a.contents.portfolio.detailInfo.sort.key9);
              });
              reviewArr.sort((a, b) => {
                  return b.contents.review.detailInfo.order - a.contents.review.detailInfo.order;
              });
              indexArr.sort((a, b) => {
                  return Number(b.contents.portfolio.detailInfo.sort.key8) - Number(a.contents.portfolio.detailInfo.sort.key8);
              });
      
              // 최대 9개의 컨텐츠, 리뷰, 인덱스를 가져옵니다.
              contentsArr = contentsArr.slice(0, indexSliceNumber);
              reviewArr = reviewArr.slice(0, indexSliceNumber);
              indexArr = indexArr.slice(0, indexSliceNumber * 2);
      
              // 가져온 컨텐츠, 리뷰, 인덱스 정보를 JSON 형태로 클라이언트에게 응답합니다.
              res.send(JSON.stringify({ contentsArr, reviewArr, indexArr }));
      
          }
      
      } catch (e) {
          // 에러 발생 시, 에러를 로깅하고 클라이언트에게 에러 메시지를 응답합니다.
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /getLength
     * @description 홈리에종의 주요 항목들(콘텐츠, 프로젝트, 디자이너)의 수치를 가져오는 라우트입니다.
     * @param {Object} req - 클라이언트의 요청 객체입니다.
     * @param {Object} res - 서버의 응답 객체입니다.
     */
    router.post([ "/getLength" ], async function (req, res) {
      // 응답 헤더를 설정하여 클라이언트에게 JSON 형식의 데이터를 보내기 위한 준비를 합니다.
      res.set({
        "Content-Type": "application/json", // 응답의 콘텐츠 유형을 JSON으로 설정
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 요청 헤더를 설정
      });

      try {
        // MongoDB 인스턴스를 가져옵니다. 
        const selfMongo = instance.mongo;
        const selfCoreMongo = instance.mongo; // Core Mongo 인스턴스 (일반 Mongo와 동일하게 설정)

        let whereQuery, projectQuery; // MongoDB 쿼리를 위한 변수를 선언합니다.
        let contentsLength, projectLength, designerLength; // 각각 콘텐츠, 프로젝트, 디자이너의 수를 저장할 변수를 선언합니다.
        let contentsArr, projectArr, designerArr; // MongoDB에서 가져온 결과를 저장할 배열을 선언합니다.

        // 콘텐츠의 길이를 가져오기 위한 쿼리 설정
        whereQuery = {}; // 콘텐츠에 대해 필터링 없이 모든 데이터를 가져오기 위한 빈 쿼리 설정
        projectQuery = {
          conid: 1, // 콘텐츠 ID만 가져옵니다.
        };

        // 콘텐츠 콜렉션에서 데이터를 가져옵니다.
        contentsArr = await back.mongoPick("contents", [ objectDeepCopy(whereQuery), objectDeepCopy(projectQuery) ], { selfMongo: selfMongo });
        contentsLength = contentsArr.length; // 콘텐츠 배열의 길이를 계산하여 저장합니다.

        // 프로젝트의 길이를 가져오기 위한 쿼리 설정
        whereQuery = { desid: { $regex: "^d" } }; // desid가 'd'로 시작하는 프로젝트만 필터링합니다.
        projectQuery = {
          proid: 1, // 프로젝트 ID와
          desid: 1, // 디자이너 ID만 가져옵니다.
        };

        // 프로젝트 콜렉션에서 데이터를 가져옵니다.
        projectArr = await back.mongoPick("project", [ objectDeepCopy(whereQuery), objectDeepCopy(projectQuery) ], { selfMongo: selfCoreMongo });
        projectLength = projectArr.length; // 프로젝트 배열의 길이를 계산하여 저장합니다.

        // 디자이너의 길이를 가져오기 위한 쿼리 설정
        whereQuery = {}; // 디자이너에 대해 필터링 없이 모든 데이터를 가져오기 위한 빈 쿼리 설정
        projectQuery = {
          desid: 1, // 디자이너 ID만 가져옵니다.
        };

        // 디자이너 콜렉션에서 데이터를 가져옵니다.
        designerArr = await back.mongoPick("designer", [ objectDeepCopy(whereQuery), objectDeepCopy(projectQuery) ], { selfMongo: selfMongo });
        designerLength = designerArr.length; // 디자이너 배열의 길이를 계산하여 저장합니다.

        // 계산된 콘텐츠, 프로젝트, 디자이너의 수를 JSON 형식으로 클라이언트에 응답합니다.
        res.send(JSON.stringify({
          contents: contentsLength, // 콘텐츠의 길이
          project: projectLength, // 프로젝트의 길이
          designer: designerLength, // 디자이너의 길이
        }));

      } catch (e) {
        // 에러 발생 시, 에러를 로깅하고 클라이언트에게 에러 메시지를 응답합니다.
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /updateImagesOrder
     * @description 홈리에종 콘텐츠의 이미지 순서 및 관련된 정보를 업데이트하는 라우트입니다.
     * @param {Object} req - 클라이언트의 요청 객체입니다.
     * @param {Object} res - 서버의 응답 객체입니다.
     */
    router.post([ "/updateImagesOrder" ], async function (req, res) {
      // 응답 헤더를 설정하여 클라이언트에게 JSON 형식의 데이터를 보내기 위한 준비를 합니다.
      res.set({
        "Content-Type": "application/json", // 응답의 콘텐츠 유형을 JSON으로 설정
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 요청 헤더를 설정
      });

      try {
        // 요청 본문에서 필요한 데이터를 equalJson 함수를 통해 파싱하여 가져옵니다.
        const { pid, data, contents, title, photo } = equalJson(req.body);
        const { apart, wording: titleWording, pyeong, service } = title; // 제목 정보에서 아파트명, 타이틀 문구, 평수, 서비스를 추출합니다.
        
        // 업데이트할 컬렉션 이름을 설정합니다.
        const collection = "contents";
        
        // MongoDB 로컬 및 코어 인스턴스를 가져옵니다.
        const selfMongo = instance.mongolocal;
        const selfCoreMongo = instance.mongo;
        
        // MongoDB 쿼리와 업데이트를 위한 변수를 선언합니다.
        let whereQuery, updateQuery;
        let updatedContents; // 업데이트된 콘텐츠 데이터를 저장할 변수
        let photoUpdateBoo; // 사진 업데이트 여부를 나타내는 부울 변수

        // photo가 1이거나 '1'인 경우 사진이 업데이트되었음을 나타냅니다.
        photoUpdateBoo = (photo === 1 || photo === '1');

        // 업데이트할 항목을 식별하기 위해 콘텐츠의 pid를 조건으로 설정합니다.
        whereQuery = { "contents.portfolio.pid": pid };
        
        // 업데이트할 데이터 구조를 정의합니다.
        updateQuery = {};
        updateQuery["contents.portfolio.contents.detail"] = contents; // 콘텐츠의 상세 정보를 업데이트합니다.
        
        // 사진 배열 중 "s"와 "g" 타입의 대표 사진 인덱스를 업데이트합니다.
        updateQuery["contents.portfolio.detailInfo.photodae"] = [
          data.filter((o) => { return o.gs === "s" }).filter((o) => { return o.dae })[0].fromIndex, 
          data.filter((o) => { return o.gs === "g" }).filter((o) => { return o.dae })[0].fromIndex
        ];
        
        // 공간 정보 (아파트명, 평수)를 업데이트합니다.
        updateQuery["contents.portfolio.spaceInfo.space"] = apart;
        updateQuery["contents.portfolio.spaceInfo.pyeong"] = pyeong;
        
        // 서비스 정보를 업데이트합니다.
        updateQuery["contents.portfolio.detailInfo.service"] = service;
        
        // 콘텐츠의 메인 제목을 업데이트합니다.
        updateQuery["contents.portfolio.title.main"] = titleWording + ", " + apart + " " + String(pyeong) + "py " + service;
        
        // 콘텐츠의 서브 제목을 업데이트합니다.
        updateQuery["contents.portfolio.title.sub"] = titleWording + ", " + apart + " " + service;
        
        // 로컬 MongoDB에서 콘텐츠 정보를 업데이트합니다.
        await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo });
        
        // 코어 MongoDB에서도 동일하게 콘텐츠 정보를 업데이트합니다.
        await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo: selfCoreMongo });

        // 업데이트된 콘텐츠 정보를 코어 MongoDB에서 다시 읽어옵니다.
        updatedContents = (await back.mongoRead(collection, whereQuery, { selfMongo: selfCoreMongo }))[0];
        
        // MongoDB 문서의 _id 필드를 제거하여 클라이언트에 반환할 데이터를 정리합니다.
        delete updatedContents._id;
        
        // 업데이트된 콘텐츠 정보를 클라이언트에게 JSON 형식으로 응답합니다.
        res.send(JSON.stringify({ contents: updatedContents }));

      } catch (e) {
        // 에러 발생 시, 에러를 로깅하고 클라이언트에게 에러 메시지를 응답합니다.
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /updateReviewInfo
     * @description 홈리에종 콘텐츠의 리뷰 정보를 업데이트하는 라우트입니다.
     * @param {Object} req - 클라이언트의 요청 객체입니다.
     * @param {Object} res - 서버의 응답 객체입니다.
     */
    router.post([ "/updateReviewInfo" ], async function (req, res) {
      // 응답 헤더를 설정하여 클라이언트에게 JSON 형식의 데이터를 보내기 위한 준비를 합니다.
      res.set({
        "Content-Type": "application/json", // 응답의 콘텐츠 유형을 JSON으로 설정
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 요청 헤더를 설정
      });

      try {
        // 요청 본문에서 필요한 데이터를 equalJson 함수를 통해 파싱하여 가져옵니다.
        const { pid, words, mode } = equalJson(req.body);

        // 업데이트할 컬렉션 이름을 설정합니다.
        const collection = "contents";
        
        // MongoDB 인스턴스를 가져옵니다.
        const selfMongo = instance.mongo; // 메인 MongoDB 인스턴스
        const selfCoreMongo = instance.mongo; // 코어 MongoDB 인스턴스

        // MongoDB 쿼리와 업데이트를 위한 변수를 선언합니다.
        let whereQuery, updateQuery;
        
        // 업데이트할 항목을 식별하기 위해 콘텐츠의 pid를 조건으로 설정합니다.
        whereQuery = { "contents.portfolio.pid": pid };
        
        // 업데이트할 데이터 구조를 정의합니다.
        updateQuery = {};
        
        // mode가 'title'일 경우, 리뷰의 제목과 서브제목을 업데이트합니다.
        if (mode === "title") {
          updateQuery["contents.review.title.main"] = words.trim(); // 리뷰 메인 제목 업데이트
          updateQuery["contents.review.title.sub"] = words.trim(); // 리뷰 서브 제목 업데이트
        } 
        // mode가 'story'일 경우, 포트폴리오 콘텐츠의 첫 번째 상세 내용을 업데이트합니다.
        else if (mode === "story") {
          updateQuery["contents.portfolio.contents.detail.0.contents"] = words.trim(); // 포트폴리오 스토리 업데이트
        }
        
        // 로컬 MongoDB에서 콘텐츠 정보를 업데이트합니다.
        await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo });
        
        // 코어 MongoDB에서도 동일하게 콘텐츠 정보를 업데이트합니다.
        await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo: selfCoreMongo });
        
        // 업데이트가 완료되었음을 클라이언트에게 알리는 메시지를 응답합니다.
        res.send(JSON.stringify({ message: "done" }));

      } catch (e) {
        // 에러 발생 시, 에러를 로깅하고 클라이언트에게 에러 메시지를 응답합니다.
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /updateAddressRegion
     * @description 홈리에종 콘텐츠의 주소 및 지역 정보를 업데이트하는 라우트입니다.
     * @param {Object} req - 클라이언트의 요청 객체입니다.
     * @param {Object} res - 서버의 응답 객체입니다.
     */
    router.post([ "/updateAddressRegion" ], async function (req, res) {
      // 응답 헤더를 설정하여 클라이언트에게 JSON 형식의 데이터를 보내기 위한 준비를 합니다.
      res.set({
        "Content-Type": "application/json", // 응답의 콘텐츠 유형을 JSON으로 설정
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 요청 헤더를 설정
      });

      try {
        // 요청 본문에서 필요한 데이터를 equalJson 함수를 통해 파싱하여 가져옵니다.
        const { pid, address: apart, region } = equalJson(req.body);

        // 업데이트할 컬렉션 이름을 설정합니다.
        const collection = "contents";
        
        // MongoDB 인스턴스를 가져옵니다.
        const selfMongo = instance.mongolocal; // 로컬 MongoDB 인스턴스
        const selfCoreMongo = instance.mongo; // 코어 MongoDB 인스턴스

        // MongoDB 쿼리와 업데이트를 위한 변수를 선언합니다.
        let whereQuery, updateQuery;
        let updatedContents; // 업데이트된 콘텐츠 정보를 담을 변수
        let titleWording; // 콘텐츠 제목의 앞부분을 담을 변수
        let originalContents; // 원래의 콘텐츠 데이터를 담을 변수
        let pyeong; // 평수 정보를 담을 변수
        let service; // 서비스 종류 정보를 담을 변수
        
        // 원래의 콘텐츠 정보를 MongoDB에서 읽어옵니다.
        [ originalContents ] = await back.mongoRead(collection, { "contents.portfolio.pid": pid }, { selfMongo: selfCoreMongo });
        
        // 콘텐츠 제목의 앞부분을 추출합니다. 예를 들어, "현대아파트"와 같은 제목의 일부를 추출합니다.
        titleWording = originalContents.contents.portfolio.title.main.split(", ")[0];
        
        // 콘텐츠의 평수 정보를 추출합니다.
        pyeong = originalContents.contents.portfolio.spaceInfo.pyeong;
        
        // 콘텐츠의 서비스 종류 정보를 추출합니다.
        service = originalContents.contents.portfolio.detailInfo.service;
        
        // 업데이트할 항목을 식별하기 위해 콘텐츠의 pid를 조건으로 설정합니다.
        whereQuery = { "contents.portfolio.pid": pid };
        
        // 업데이트할 데이터 구조를 정의합니다.
        updateQuery = {};
        updateQuery["contents.portfolio.spaceInfo.space"] = apart; // 업데이트할 아파트 이름을 설정합니다.
        updateQuery["contents.portfolio.spaceInfo.region"] = region; // 업데이트할 지역 정보를 설정합니다.
        updateQuery["contents.portfolio.title.main"] = titleWording + ", " + apart + " " + String(pyeong) + "py " + service; // 새로운 메인 제목을 설정합니다.
        updateQuery["contents.portfolio.title.sub"] = titleWording + ", " + apart + " " + service; // 새로운 서브 제목을 설정합니다.
        
        // 로컬 MongoDB에서 콘텐츠 정보를 업데이트합니다.
        await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo });
        
        // 코어 MongoDB에서도 동일하게 콘텐츠 정보를 업데이트합니다.
        await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo: selfCoreMongo });
        
        // 업데이트된 콘텐츠 정보를 다시 읽어옵니다.
        updatedContents = (await back.mongoRead(collection, whereQuery, { selfMongo: selfCoreMongo }))[0];
        
        // MongoDB의 기본 키 `_id`를 삭제하여 클라이언트에게 보낼 데이터를 준비합니다.
        delete updatedContents._id;
        
        // 업데이트된 콘텐츠 정보를 클라이언트에게 응답합니다.
        res.send(JSON.stringify({ contents: updatedContents }));

      } catch (e) {
        // 에러 발생 시, 에러를 로깅하고 클라이언트에게 에러 메시지를 응답합니다.
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /updateAddressRegion
     * @description 홈리에종 콘텐츠의 주소 및 지역 정보를 업데이트하는 라우트입니다.
     * @param {Object} req - 클라이언트의 요청 객체입니다.
     * @param {Object} res - 서버의 응답 객체입니다.
     */
    router.post([ "/updateAddressRegion" ], async function (req, res) {
      // 응답 헤더를 설정하여 클라이언트에게 JSON 형식의 데이터를 보내기 위한 준비를 합니다.
      res.set({
        "Content-Type": "application/json", // 응답의 콘텐츠 유형을 JSON으로 설정
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 요청 헤더를 설정
      });

      try {
        // 요청 본문에서 필요한 데이터를 equalJson 함수를 통해 파싱하여 가져옵니다.
        const { pid, address: apart, region } = equalJson(req.body);

        // 업데이트할 컬렉션 이름을 설정합니다.
        const collection = "contents";
        
        // MongoDB 인스턴스를 가져옵니다.
        const selfMongo = instance.mongolocal; // 로컬 MongoDB 인스턴스
        const selfCoreMongo = instance.mongo; // 코어 MongoDB 인스턴스

        // MongoDB 쿼리와 업데이트를 위한 변수를 선언합니다.
        let whereQuery, updateQuery;
        let updatedContents; // 업데이트된 콘텐츠 정보를 담을 변수
        let titleWording; // 콘텐츠 제목의 앞부분을 담을 변수
        let originalContents; // 원래의 콘텐츠 데이터를 담을 변수
        let pyeong; // 평수 정보를 담을 변수
        let service; // 서비스 종류 정보를 담을 변수
        
        // 원래의 콘텐츠 정보를 MongoDB에서 읽어옵니다.
        [ originalContents ] = await back.mongoRead(collection, { "contents.portfolio.pid": pid }, { selfMongo: selfCoreMongo });
        
        // 콘텐츠 제목의 앞부분을 추출합니다. 예를 들어, "현대아파트"와 같은 제목의 일부를 추출합니다.
        titleWording = originalContents.contents.portfolio.title.main.split(", ")[0];
        
        // 콘텐츠의 평수 정보를 추출합니다.
        pyeong = originalContents.contents.portfolio.spaceInfo.pyeong;
        
        // 콘텐츠의 서비스 종류 정보를 추출합니다.
        service = originalContents.contents.portfolio.detailInfo.service;
        
        // 업데이트할 항목을 식별하기 위해 콘텐츠의 pid를 조건으로 설정합니다.
        whereQuery = { "contents.portfolio.pid": pid };
        
        // 업데이트할 데이터 구조를 정의합니다.
        updateQuery = {};
        updateQuery["contents.portfolio.spaceInfo.space"] = apart; // 업데이트할 아파트 이름을 설정합니다.
        updateQuery["contents.portfolio.spaceInfo.region"] = region; // 업데이트할 지역 정보를 설정합니다.
        updateQuery["contents.portfolio.title.main"] = titleWording + ", " + apart + " " + String(pyeong) + "py " + service; // 새로운 메인 제목을 설정합니다.
        updateQuery["contents.portfolio.title.sub"] = titleWording + ", " + apart + " " + service; // 새로운 서브 제목을 설정합니다.
        
        // 로컬 MongoDB에서 콘텐츠 정보를 업데이트합니다.
        await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo });
        
        // 코어 MongoDB에서도 동일하게 콘텐츠 정보를 업데이트합니다.
        await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo: selfCoreMongo });
        
        // 업데이트된 콘텐츠 정보를 다시 읽어옵니다.
        updatedContents = (await back.mongoRead(collection, whereQuery, { selfMongo: selfCoreMongo }))[0];
        
        // MongoDB의 기본 키 `_id`를 삭제하여 클라이언트에게 보낼 데이터를 준비합니다.
        delete updatedContents._id;
        
        // 업데이트된 콘텐츠 정보를 클라이언트에게 응답합니다.
        res.send(JSON.stringify({ contents: updatedContents }));

      } catch (e) {
        // 에러 발생 시, 에러를 로깅하고 클라이언트에게 에러 메시지를 응답합니다.
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /updateSlideOrder
     * @description 홈리에종 콘텐츠의 슬라이드 순서를 업데이트하는 라우트입니다.
     * @param {Object} req - 클라이언트의 요청 객체입니다.
     * @param {Object} res - 서버의 응답 객체입니다.
     */
    router.post([ "/updateSlideOrder" ], async function (req, res) {
      // 응답 헤더를 설정하여 클라이언트에게 JSON 형식의 데이터를 보내기 위한 준비를 합니다.
      res.set({
        "Content-Type": "application/json", // 응답의 콘텐츠 유형을 JSON으로 설정
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 요청 헤더를 설정
      });

      try {
        // 요청 본문에서 필요한 데이터를 equalJson 함수를 통해 파싱하여 가져옵니다.
        // equalJson 함수는 JSON.parse의 업그레이드 버전으로, 깊은 복사나 Date 객체 복원을 처리할 수 있습니다.
        const { pid, order, index } = equalJson(req.body);
        
        // 업데이트할 MongoDB 컬렉션을 설정합니다.
        const collection = "contents";
        
        // MongoDB 인스턴스를 가져옵니다.
        const selfMongo = instance.mongolocal; // 로컬 MongoDB 인스턴스
        const selfCoreMongo = instance.mongo; // 코어 MongoDB 인스턴스
        
        // MongoDB 쿼리와 업데이트를 위한 변수를 선언합니다.
        let whereQuery, updateQuery;
        let updatedContents; // 업데이트된 콘텐츠 정보를 담을 변수
        
        // 쿼리 조건으로 콘텐츠의 pid를 설정합니다.
        whereQuery = { "contents.portfolio.pid": pid };
        
        // 업데이트할 데이터를 설정합니다.
        updateQuery = {};
        // 슬라이드 순서 배열에서 특정 순서를 업데이트합니다.
        updateQuery["contents.portfolio.detailInfo.slide." + String(Number(order) - 1)] = Number(index);
        
        // 로컬 MongoDB에서 슬라이드 순서 정보를 업데이트합니다.
        await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo });
        
        // 코어 MongoDB에서도 동일하게 슬라이드 순서 정보를 업데이트합니다.
        await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo: selfCoreMongo });
        
        // 클라이언트에게 작업이 완료되었음을 알리는 메시지를 응답합니다.
        res.send(JSON.stringify({ message: "done" }));

      } catch (e) {
        // 에러 발생 시, 에러를 로깅하고 클라이언트에게 에러 메시지를 응답합니다.
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /errorMessage
     * @description 클라이언트로부터 에러 메시지를 받아서 서버에 기록하는 라우터입니다.
     * @param {Object} req - 클라이언트의 요청 객체입니다.
     * @param {Object} res - 서버의 응답 객체입니다.
     */
    router.post([ "/errorMessage" ], async function (req, res) {
      // 응답 헤더를 설정하여 클라이언트에게 JSON 형식의 데이터를 전달할 준비를 합니다.
      res.set({
        "Content-Type": "application/json", // 응답의 콘텐츠 유형을 JSON으로 설정
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 요청 헤더를 설정
      });

      try {
        // 요청 본문에 text 필드가 존재하지 않으면 에러를 발생시킵니다.
        if (req.body.text === undefined) {
          throw new Error("invalid post, must be text"); // 텍스트가 없으면 에러를 던집니다.
        }

        // 요청 본문에서 text 필드를 추출합니다.
        const { text } = req.body;

        // logger.error 메서드를 사용하여 받은 에러 메시지를 로그에 기록합니다.
        await logger.error(text);

        // 작업이 완료되었음을 클라이언트에게 알리는 메시지를 응답합니다.
        res.send(JSON.stringify({ message: "done" }));

      } catch (e) {
        // 예외가 발생하면 에러를 로그에 기록하고, 클라이언트에게 에러 메시지를 응답합니다.
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @route POST /getAnalytics
     * @description 사용자의 분석 데이터를 수집하고 저장하는 라우터입니다.
     * @param {Object} req - 클라이언트의 요청 객체입니다.
     * @param {Object} res - 서버의 응답 객체입니다.
     */
    router.post([ "/getAnalytics" ], async function (req, res) {
      // 응답 헤더를 설정하여 클라이언트에게 JSON 형식의 데이터를 전달할 준비를 합니다.
      res.set({
        "Content-Type": "application/json", // 응답의 콘텐츠 유형을 JSON으로 설정
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 요청 헤더를 설정
      });

      try {
        // MongoDB 컬렉션 이름을 정의합니다.
        const collection = "homeliaisonAnalytics";

        // 사용자의 User-Agent 정보를 추출합니다.
        const rawUserAgent = req.useragent;

        // 빈 IP 주소를 기본값으로 설정합니다.
        const emptyIp = address.frontinfo.ip.outer;

        // User-Agent, 브라우저, 운영체제, 플랫폼 정보를 추출합니다.
        const { source: userAgent, browser, os, platform } = rawUserAgent;

        let name;
        let custom;
        let ip, referer;
        let thisData;
        let thisId;
        let ipObj;
        let safeNum;
        let parserResult;
        let user;
        let temp;

        // 요청 본문을 equalJson 메서드를 사용하여 파싱합니다.
        thisData = equalJson(req.body);

        // IP 주소를 초기화합니다.
        ip = null;

        // 요청 데이터에 info 객체가 있는지 확인합니다.
        if (typeof thisData.info === "object" && thisData.info !== null) {
          ip = thisData.info.ip; // info 객체에서 IP 주소를 추출합니다.
          referer = thisData.info.referer; // info 객체에서 referer를 추출합니다.
          user = thisData.info.userAgent; // info 객체에서 User-Agent를 추출합니다.
        } else {
          // info 객체가 없으면 요청 헤더에서 IP 주소를 추출합니다.
          temp = (req.headers["x-forwarded-for"] === undefined ? req.socket.remoteAddress : req.headers["x-forwarded-for"]);
          if (typeof temp !== "string") {
            ip = emptyIp; // IP 주소가 없으면 기본 IP로 설정합니다.
          } else {
            ip = temp.trim().replace(/[^0-9\.]/gi, ''); // IP 주소를 정제합니다.
          }
          referer = (req.headers.referer === undefined ? "" : req.headers.referer); // referer를 요청 헤더에서 추출합니다.
          user = userAgent; // User-Agent를 설정합니다.
        }

        // IP 주소가 문자열이 아닌 경우 기본 IP로 설정합니다.
        if (typeof ip !== "string") {
          ip = emptyIp;
        }

        // 요청 데이터에 id가 문자열로 존재하는지 확인합니다.
        if (typeof thisData.id === "string") {
          thisId = thisData.id; // id를 설정합니다.
        } else {
          thisId = "(not set)"; // id가 없으면 기본값을 설정합니다.
        }

        // 이벤트 이름을 설정합니다.
        name = "fromServer_" + thisData.action;

        // IP 주소를 기반으로 위치 정보를 파싱합니다.
        ipObj = await ipParsing(ip);

        // 위치 정보가 없으면 10번까지 재시도합니다.
        safeNum = 0;
        while (Object.keys(ipObj).length === 0) {
          if (safeNum > 10) {
            break;
          }
          await sleep(100); // 100ms 대기합니다.
          ipObj = await ipParsing(ip); // 위치 정보를 다시 파싱합니다.
          safeNum = safeNum + 1;
        }

        // 사용자 데이터를 포함하는 객체를 생성합니다.
        custom = {
          id: thisData.id,
          network: {
            ip,
            referer,
            userAgent,
            browser,
            os,
            platform,
            mobile: rawUserAgent.isMobile,
            ...ipObj
          },
          date: (new Date()).valueOf(),
          data: {
            page: thisData.page,
            action: thisData.action,
            raw: thisData.data,
          }
        };

        // 요청 데이터에 날짜와 네트워크 정보를 추가합니다.
        thisData.date = new Date();
        thisData.network = { ...ipObj };
        thisData.network.ip = ip;

        try {
          // User-Agent를 파싱하여 디바이스 정보를 얻습니다.
          parserResult = parser(user);

          // 불필요한 정보를 제거합니다.
          delete parserResult.cpu;
          delete parserResult.ua;
          delete parserResult.engine;

          // 브라우저 이름을 설정합니다.
          parserResult.browser = parserResult.browser.name;
          parserResult.os.browser = parserResult.browser;

          delete parserResult.browser;

          // 운영체제에 따라 디바이스 유형을 설정합니다.
          if (parserResult.os.name === "Windows") {
            if (parserResult.device.vendor === undefined) {
              parserResult.device.vendor = "Unknown";
            }
            if (parserResult.device.model === undefined) {
              parserResult.device.model = "Unknown";
            }
            parserResult.device.type = "desktop";
          } else if (/Mac OS/gi.test(parserResult.os.name)) {
            parserResult.device.type = "desktop";
          }

          // 디바이스 정보가 없을 경우 기본값을 설정합니다.
          if (parserResult.device.vendor === undefined) {
            parserResult.device.vendor = "Unknown";
          }
          if (parserResult.device.model === undefined) {
            parserResult.device.model = "Unknown";
          }
          if (parserResult.device.type === undefined) {
            parserResult.device.type = "desktop";
          }

          // 디바이스 정보를 요청 데이터에 추가합니다.
          thisData.device = equalJson(JSON.stringify(parserResult));
        } catch {
          // 파싱에 실패한 경우 빈 객체를 설정합니다.
          thisData.device = {};
        }

        // 네트워크 IP가 특정 IP와 일치하지 않으면 MongoDB에 데이터를 저장합니다.
        if (thisData.network.ip.trim().replace(/[^0-9\.]/gi, '') !== address.officeinfo.ghost.outer.trim().replace(/[^0-9\.]/gi, '')) {
          await back.mongoCreate(collection, thisData, { selfMongo: instance.mongolocal });
        }

        // Facebook Conversion API에 이벤트를 보냅니다.
        instance.facebook.conversionEvent({
          name,
          data: {
            ip: ip,
            userAgent: userAgent,
          },
          custom,
        }).catch((err) => {
          // 이벤트 전송에 실패하면 에러를 로그에 기록합니다.
          logger.error(err, req).catch((e) => { console.log(e); });
        });

        // 클라이언트에게 작업이 완료되었음을 알립니다.
        res.send(JSON.stringify({ message: "done" }));
      } catch (e) {
        // 예외가 발생하면 에러를 로그에 기록하고, 클라이언트에게 에러 메시지를 응답합니다.
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @route POST /updateContents
     * @description 클라이언트로부터 받은 쿼리를 통해 콘텐츠 정보를 업데이트하는 라우터입니다.
     * @param {Object} req - 클라이언트의 요청 객체입니다.
     * @param {Object} res - 서버의 응답 객체입니다.
     */
    router.post([ "/updateContents" ], async function (req, res) {
      // 응답 헤더를 설정하여 클라이언트에게 JSON 형식의 데이터를 전달할 준비를 합니다.
      res.set({
        "Content-Type": "application/json", // 응답의 콘텐츠 유형을 JSON으로 설정
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 요청 헤더를 설정
      });

      try {
        // 요청 본문에 whereQuery와 updateQuery가 있는지 확인합니다.
        if (req.body.whereQuery === undefined || req.body.updateQuery === undefined) {
          throw new Error("invalid post"); // 쿼리가 없을 경우 에러를 발생시킵니다.
        }

        // MongoDB 인스턴스를 가져옵니다.
        const selfMongo = instance.mongo;

        // equalJson 메서드를 사용하여 요청 본문에서 whereQuery와 updateQuery를 파싱합니다.
        const { whereQuery, updateQuery } = equalJson(req.body);
        let data;

        // whereQuery가 객체이며 null이 아닌지 확인합니다.
        if (typeof whereQuery !== "object" || whereQuery === null) {
          throw new Error("invalid query object"); // whereQuery가 유효하지 않을 경우 에러를 발생시킵니다.
        }

        // whereQuery가 비어있는지 확인하고, 비어있으면 에러를 발생시킵니다.
        if (Object.keys(whereQuery).length === 0) {
          throw new Error("query ban"); // whereQuery가 비어있으면 에러를 발생시킵니다.
        }

        // updateQuery가 객체이며 null이 아닌지 확인합니다.
        if (typeof updateQuery !== "object" || updateQuery === null) {
          throw new Error("invalid query object"); // updateQuery가 유효하지 않을 경우 에러를 발생시킵니다.
        }

        // MongoDB에서 콘텐츠를 업데이트합니다. 이때 로컬 MongoDB를 먼저 업데이트합니다.
        await back.updateContents([ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });

        // MongoDB에서 콘텐츠를 업데이트하고 결과를 data 변수에 저장합니다.
        data = await back.updateContents([ whereQuery, updateQuery ], { selfMongo });

        // 업데이트 결과를 클라이언트에 응답으로 보냅니다.
        res.send(JSON.stringify({ message: data }));

      } catch (e) {
        // 예외가 발생하면 에러를 로그에 기록하고, 클라이언트에게 에러 메시지를 응답합니다.
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /getClientReport
     * @description 클라이언트의 리포트를 가져오는 라우터입니다. 주어진 기간 내의 데이터를 MongoDB에서 조회하여 클라이언트에게 전달합니다.
     * @param {Object} req - 클라이언트의 요청 객체입니다.
     * @param {Object} res - 서버의 응답 객체입니다.
     */
    router.post([ "/getClientReport" ], async function (req, res) {
      // 응답 헤더를 설정하여 클라이언트에게 JSON 형식의 데이터를 전달할 준비를 합니다.
      res.set({
        "Content-Type": "application/json", // 응답의 콘텐츠 유형을 JSON으로 설정
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 요청 헤더를 설정
      });

      try {
        // 요청 본문에 fromYear, fromMonth, toYear, toMonth가 있는지 확인합니다.
        if (req.body.fromYear === undefined || req.body.fromMonth === undefined || req.body.toYear === undefined || req.body.toMonth === undefined) {
          throw new Error("invalid post"); // 필요한 데이터가 없으면 에러를 발생시킵니다.
        }

        // equalJson 메서드를 사용하여 요청 본문에서 필요한 데이터를 파싱합니다.
        const { fromYear, fromMonth, toYear, toMonth } = equalJson(req.body);
        
        // MongoDB 인스턴스를 가져옵니다.
        const selfMongo = instance.mongolocal;

        // fromDate와 toDate를 생성하여 지정된 기간의 시작과 끝을 설정합니다.
        let fromDate = new Date(fromYear, fromMonth - 1, 1); // 주어진 시작 연도와 월의 첫 날로 설정
        let toDate = new Date(toYear, toMonth, 1); // 주어진 끝 연도와 월의 첫 날로 설정

        // 지정된 기간 내의 복합 분석 데이터를 가져옵니다.
        let monthlyAnalytics = await back.mongoRead("complexAnalytics", {
          $and: [
            { "date.from": { $gte: fromDate } }, // fromDate 이후의 데이터 필터링
            { "date.to": { $lte: toDate } }, // toDate 이전의 데이터 필터링
          ]
        }, { selfMongo });

        // 가져온 데이터를 가공하여 표준 날짜 및 MAU 정보를 포함한 새로운 객체로 변환합니다.
        monthlyAnalytics = monthlyAnalytics.map((obj) => {
          let resultObj = {}; // 결과 객체를 초기화합니다.
          let copiedDate = new Date(JSON.stringify(obj.date.from).slice(1, -1)); // 날짜를 복사하여 변환합니다.
          
          // 날짜를 10일 추가하여 표준 날짜를 설정합니다.
          copiedDate.setDate(copiedDate.getDate() + 10); 

          // 결과 객체에 표준 날짜와 연도, 월, MAU를 저장합니다.
          resultObj.standard = copiedDate; 
          resultObj.year = copiedDate.getFullYear();
          resultObj.month = copiedDate.getMonth() + 1; // 월은 0부터 시작하므로 1을 더합니다.
          resultObj.mau = obj.data.users.total; // MAU 데이터를 저장합니다.

          return resultObj; // 변환된 객체를 반환합니다.
        });

        // 표준 날짜를 기준으로 데이터를 정렬합니다.
        monthlyAnalytics.sort((a, b) => {
          return a.standard.valueOf() - b.standard.valueOf();
        });

        // 각 월별 데이터를 순회하면서 추가 정보를 계산합니다.
        for (let obj of monthlyAnalytics) {
          // 각 월의 첫날과 다음 달의 첫날을 설정합니다.
          let thisFrom = new Date(obj.year, obj.month - 1, 1);
          let thisTo = new Date(obj.year, obj.month - 1, 1);
          thisTo.setMonth(thisTo.getMonth() + 1); // 다음 달로 이동

          // dailyClients 컬렉션에서 지정된 기간 내의 클라이언트 데이터를 읽어옵니다.
          let tempRows = await back.mongoRead("dailyClients", {
            $and: [
              { "date.from": { $gte: thisFrom } }, // thisFrom 이후의 데이터 필터링
              { "date.to": { $lte: thisTo } }, // thisTo 이전의 데이터 필터링
            ]
          }, { selfMongo });

          // 광고 클라이언트 수를 계산하여 obj에 추가합니다.
          obj.adClients = tempRows.map((obj) => { return obj.data.detail }).flat().filter((obj2) => {
            return obj2.users.some((obj3) => {
              if (obj3 === null) {
                return false; // 사용자가 null일 경우 제외합니다.
              } else {
                // 사용자의 캠페인 소스가 "(not set)"이 아닌 경우만 필터링
                return (obj3.source.campaign.filter((str) => { return str.trim() !== "(not set)"; }).length > 0);
              }
            });
          }).length;

          // dailyCampaign 컬렉션에서 지정된 기간 내의 캠페인 데이터를 읽어옵니다.
          let tempRows2 = await back.mongoRead("dailyCampaign", {
            $and: [
              { "date.from": { $gte: thisFrom } }, // thisFrom 이후의 데이터 필터링
              { "date.to": { $lte: thisTo } }, // thisTo 이전의 데이터 필터링
            ]
          }, { selfMongo });

          // 캠페인의 총 지출을 계산하여 obj에 추가합니다.
          obj.charge = tempRows2.map((obj2) => { return obj2.value.charge }).reduce((acc, curr) => { return acc + curr }, 0);
        }

        // 최종 데이터를 클라이언트에게 JSON 형태로 응답합니다.
        res.send(JSON.stringify(monthlyAnalytics));

      } catch (e) {
        // 예외가 발생하면 에러를 로그에 기록하고, 클라이언트에게 에러 메시지를 응답합니다.
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /clientAnalytics
     * @description 클라이언트 분석 데이터를 조회하는 라우터입니다. 클라이언트가 요청한 모드에 따라 데이터를 조회하고, 필터링된 데이터를 클라이언트에게 전달합니다.
     * @param {Object} req - 클라이언트의 요청 객체입니다.
     * @param {Object} req.body - 요청 본문입니다.
     * @param {string} req.body.mode - 처리할 모드를 지정합니다. 예: "get".
     * @param {Object} [req.body.whereQuery] - MongoDB에서 데이터를 조회할 때 사용할 조건 쿼리입니다.
     * @param {Object} [req.body.projectQuery] - 조회할 필드를 지정하는 쿼리입니다.
     * @param {Object} res - 서버의 응답 객체입니다.
     */
    router.post([ "/clientAnalytics" ], async function (req, res) {
      // 응답 헤더를 설정하여 JSON 형태의 데이터를 반환하고, CORS를 허용합니다.
      res.set({
        "Content-Type": "application/json", // 응답 콘텐츠 타입을 JSON으로 설정합니다.
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 정의합니다.
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 요청 헤더에서 허용할 항목을 지정합니다.
      });

      try {
        // 요청 본문에서 모드를 가져옵니다. 모드가 정의되지 않은 경우 예외를 발생시킵니다.
        if (req.body.mode === undefined) {
          throw new Error("invalid post");
        }

        const selfMongo = instance.mongolocal; // MongoDB 연결 객체를 가져옵니다.
        const { mode } = equalJson(req.body); // equalJson 메서드를 사용하여 요청 본문을 파싱하고 필요한 값을 추출합니다.
        const collection = "clientAnalytics"; // MongoDB에서 조회할 컬렉션을 지정합니다.
        let rows; // 조회된 데이터를 저장할 변수입니다.
        let projectKeys; // 프로젝트 쿼리의 키를 저장할 변수입니다.

        if (mode === "get") {
          // 모드가 "get"인 경우 데이터를 조회합니다.
          
          // whereQuery와 projectQuery가 요청 본문에 정의되지 않은 경우 예외를 발생시킵니다.
          if (req.body.whereQuery === undefined || req.body.projectQuery === undefined) {
            throw new Error("invalid post");
          }
          
          const { whereQuery, projectQuery } = equalJson(req.body); // equalJson 메서드를 사용하여 whereQuery와 projectQuery를 파싱합니다.
          
          // whereQuery와 projectQuery의 유효성을 검사합니다.
          if (typeof whereQuery !== "object" || whereQuery === null) {
            throw new Error("invalid where query");
          }
          if (typeof projectQuery !== "object" || projectQuery === null) {
            throw new Error("invalid project query");
          }

          projectKeys = Object.keys(projectQuery); // projectQuery의 키 목록을 가져옵니다.
          
          if (projectKeys.length === 0) {
            // projectQuery에 키가 없는 경우, 전체 데이터를 조회합니다.
            rows = await back.mongoRead(collection, whereQuery, { selfMongo });
          } else {
            // projectQuery에 키가 있는 경우, 해당 필드만 조회합니다.
            rows = await back.mongoPick(collection, [ whereQuery, projectQuery ], { selfMongo });
          }

          // 조회된 데이터를 클라이언트 요청 시간순으로 정렬합니다.
          rows.sort((a, b) => { 
            return b.client.requests[0].request.timeline.valueOf() - a.client.requests[0].request.timeline.valueOf(); 
          });

          // 정렬된 데이터를 JSON 형태로 클라이언트에게 응답합니다.
          res.send(JSON.stringify(rows));

        } else {
          // 모드가 "get"이 아닌 경우, 예외를 발생시킵니다.
          throw new Error("invalid mode");
        }

      } catch (e) {
        // 예외 발생 시 오류를 로그로 기록하고 클라이언트에게 오류 메시지를 응답합니다.
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /clientAnalytics2
     * @description 클라이언트 분석 데이터를 조회하고 처리하는 라우터입니다. 모드에 따라 클라이언트의 요청 데이터를 필터링하여 조회하거나, 특정 클라이언트의 데이터를 조회합니다.
     * @param {Object} req - 클라이언트의 요청 객체입니다.
     * @param {Object} req.body - 요청 본문입니다.
     * @param {string} req.body.mode - 처리할 모드를 지정합니다. 예: "get", "pick", "query".
     * @param {Object} res - 서버의 응답 객체입니다.
     */
    router.post([ "/clientAnalytics2" ], async function (req, res) {
      // 응답 헤더를 설정하여 JSON 형태의 데이터를 반환하고, CORS를 허용합니다.
      res.set({
        "Content-Type": "application/json", // 응답 콘텐츠 타입을 JSON으로 설정합니다.
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 정의합니다.
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 요청 헤더에서 허용할 항목을 지정합니다.
      });

      try {
        // 요청 본문에서 모드를 가져옵니다. 모드가 정의되지 않은 경우 예외를 발생시킵니다.
        if (req.body.mode === undefined) {
          throw new Error("invalid post");
        }

        const selfMongo = instance.mongolocal; // MongoDB 로컬 연결 객체를 가져옵니다.
        const selfCoreMongo = instance.mongo; // MongoDB 중앙 연결 객체를 가져옵니다.
        const { mode } = equalJson(req.body); // equalJson 메서드를 사용하여 요청 본문을 파싱하고 필요한 값을 추출합니다.
        const collection = "clientAnalytics"; // MongoDB에서 조회할 컬렉션을 지정합니다.
        const emptyDateValue = (new Date(2000, 0, 1)).valueOf(); // 빈 날짜 값의 기준을 설정합니다.
        let rows; // 조회된 데이터를 저장할 변수입니다.
        let projectKeys; // 프로젝트 쿼리의 키를 저장할 변수입니다.
        let startRequestTimeline; // 시작 요청 타임라인을 저장할 변수입니다.
        let coreWhereQuery; // 중앙 MongoDB에서 사용할 조회 쿼리입니다.
        let coreRows; // 중앙 MongoDB에서 조회한 클라이언트 데이터를 저장할 변수입니다.
        let thisClient; // 현재 클라이언트를 저장할 변수입니다.
        let finalRows; // 최종 처리된 데이터를 저장할 배열입니다.
        let tempObj; // 임시 객체를 저장할 변수입니다.
        let copiedObj; // 깊은 복사를 한 객체를 저장할 변수입니다.
        let projects, projects2; // 프로젝트 데이터를 저장할 변수입니다.
        let cliidArr_raw, cliidArr; // 클라이언트 ID 배열을 저장할 변수입니다.
        let thisProject; // 현재 프로젝트를 저장할 변수입니다.
        let projectArr; // 프로젝트 배열을 저장할 변수입니다.
        let startDate, endDate; // 시작 날짜와 종료 날짜를 저장할 변수입니다.
        let endDateCopied; // 복사된 종료 날짜를 저장할 변수입니다.
        let startDateCopied; // 복사된 시작 날짜를 저장할 변수입니다.
        let whereQuery; // 조회할 조건 쿼리를 저장할 변수입니다.

        if (mode === "get") {
          // 모드가 "get"인 경우 데이터를 조회합니다.
          
          // 날짜 정보가 있는지 확인하고, 없는 경우 예외를 발생시킵니다.
          if (req.body.standardDate === undefined) {
            if (req.body.startDate === undefined || req.body.endDate === undefined) {
              throw new Error("invalid post");
            }
            ({ startDate, endDate } = equalJson(req.body)); // 요청 본문에서 시작 날짜와 종료 날짜를 가져옵니다.
          } else {
            ({ standardDate: startDate } = equalJson(req.body)); // 요청 본문에서 기준 날짜를 가져옵니다.
            endDate = new Date(); // 종료 날짜를 현재 날짜로 설정합니다.
          }

          // 날짜를 UTC 기준으로 초기화합니다.
          startDateCopied = new Date(JSON.stringify(startDate).slice(1, -1));
          startDate = new Date(startDateCopied.getFullYear(), startDateCopied.getMonth(), startDateCopied.getDate(), 0, 0, 0);

          endDateCopied = new Date(JSON.stringify(endDate).slice(1, -1));
          endDate = new Date(endDateCopied.getFullYear(), endDateCopied.getMonth(), endDateCopied.getDate(), 0, 0, 0);
          endDate.setDate(endDate.getDate() + 1);

          // 요청된 날짜 범위에 맞는 클라이언트 데이터를 조회합니다.
          rows = await back.mongoPick(collection, [ {
            "client.requests": {
              $elemMatch: {
                "request.timeline": { $gte: startDate, $lt: endDate }
              }
            }
          }, {
            cliid: 1,
            sessions: 1,
            source: 1,
          } ], { selfMongo });
          
          // 타임라인 시작 날짜를 조정합니다.
          startRequestTimeline = new Date(JSON.stringify(startDate).slice(1, -1));
          startRequestTimeline.setDate(startRequestTimeline.getDate() - 3);

          // 조회된 데이터가 있는지 확인합니다.
          if (rows.length > 0) {
            coreWhereQuery = {
              $or: [
                ...rows.map((o) => { return { cliid: o.cliid } }),
                {
                  requests: {
                    $elemMatch: {
                      "request.timeline": { $gte: startRequestTimeline, $lt: endDate }
                    }
                  }
                }
              ]
            }
          } else {
            coreWhereQuery = {
              requests: {
                $elemMatch: {
                  "request.timeline": { $gte: startRequestTimeline, $lt: endDate }
                }
              }
            };
          }

          // 중앙 MongoDB에서 클라이언트 데이터를 조회합니다.
          coreRows = (await back.getClientsByQuery(coreWhereQuery, { selfMongo: selfCoreMongo })).toNormal();

          // 조회된 클라이언트 데이터를 처리합니다.
          for (let obj of rows) {
            thisClient = coreRows.find((c) => { return c.cliid === obj.cliid }) === undefined ? null : coreRows.find((c) => { return c.cliid === obj.cliid });
            if (thisClient !== null) {
              obj.client = equalJson(JSON.stringify(thisClient));
            } else {
              obj.client = (await back.getClientById(obj.cliid, { selfMongo: selfCoreMongo })).toNormal();
            }
          }

          cliidArr = [ ...new Set(rows.map((o) => { return o.cliid })) ];

          // 클라이언트 ID에 해당하는 프로젝트 데이터를 조회합니다.
          if (cliidArr.length > 0) {
            projects = await back.mongoPick("project", [
              {
                $or: cliidArr.map((cliid) => { return { cliid } })
              },
              {
                proid: 1,
                cliid: 1,
                desid: 1,
                service: 1,
                "proposal.date": 1,
                "process.status": 1,
                "process.contract": 1,
              }
            ], { selfMongo: selfCoreMongo });
          } else {
            projects = [];
          }

          // 프로젝트 데이터를 날짜 순으로 정렬합니다.
          projects.sort((a, b) => { return a.proposal.date.valueOf() - b.proposal.date.valueOf() });

          // 클라이언트 요청 데이터를 날짜 순으로 정렬합니다.
          rows.sort((a, b) => {
            return b.client.requests[0].request.timeline.valueOf() - a.client.requests[0].request.timeline.valueOf();
          });

          finalRows = [];
          for (let obj of rows) {
            if (obj.cliid !== "c1801_aa01s") {
              for (let i = 0; i < obj.client.requests.length; i++) {
                copiedObj = equalJson(JSON.stringify(obj));
                tempObj = { ...copiedObj };
                tempObj.cliid = obj.cliid;
                tempObj.client = equalJson(JSON.stringify(obj.client));
                tempObj.client.requests = [
                  equalJson(JSON.stringify(obj.client.requests[i]))
                ];
                tempObj.requestNumber = i;
                projectArr = projects.filter((p) => { return p.cliid === obj.cliid });
                projectArr.sort((a, b) => { return a.proposal.date.valueOf() - b.proposal.date.valueOf() });
                thisProject = null;
                for (let p of projectArr) {
                  if (obj.client.requests[i].request.timeline.valueOf() <= p.proposal.date.valueOf()) {
                    thisProject = equalJson(JSON.stringify(p));
                    break;
                  }
                }
                if (thisProject !== null) {
                  if (thisProject.process.contract.first.date.valueOf() > emptyDateValue) {
                    if (!/드랍/gi.test(thisProject.process.status)) {
                      tempObj.client.requests[0].analytics.response.status = "진행";
                    } else {
                      tempObj.client.requests[0].analytics.response.status = "드랍";
                    }
                  }
                }
                tempObj.project = equalJson(JSON.stringify(thisProject));

                finalRows.push(equalJson(JSON.stringify(tempObj)));
              }
            }
          }

          // 초기 요청이 아닌 경우, 요청 날짜 범위 내에서 필터링합니다.
          if (req.body.initRequest !== true && req.body.initRequest !== "true") {
            finalRows = finalRows.filter((o) => {
              return o.client.requests[0].request.timeline.valueOf() >= startDate.valueOf() && o.client.requests[0].request.timeline.valueOf() <= endDate.valueOf();
            });
            finalRows.sort((a, b) => {
              return b.client.requests[0].request.timeline.valueOf() - a.client.requests[0].request.timeline.valueOf();
            });
          }

          // 최종 데이터를 클라이언트에게 응답합니다.
          res.send(JSON.stringify(finalRows));

        } else if (mode === "pick") {
          // 모드가 "pick"인 경우, 특정 클라이언트의 데이터를 조회합니다.

          if (req.body.cliid === undefined) {
            throw new Error("invalid post");
          }
          const { cliid } = equalJson(req.body);
          
          if (req.body.projectQuery !== undefined) {
            const { projectQuery } = equalJson(req.body);
            rows = await back.mongoPick(collection, [ { cliid }, projectQuery ], { selfMongo });
          } else {
            rows = await back.mongoRead(collection, { cliid }, { selfMongo });
          }

          if (rows.length > 0) {
            res.send(JSON.stringify({ data: rows[rows.length - 1] }));
          } else {
            res.send(JSON.stringify({ data: null }));
          }

        } else if (mode === "query") {
          // 모드가 "query"인 경우, 특정 조건에 맞는 클라이언트 데이터를 조회합니다.

          if (req.body.whereQuery === undefined || req.body.coreWhereQuery === undefined) {
            throw new Error("invalid post");
          }
          ({ whereQuery, coreWhereQuery } = equalJson(req.body));

          rows = await back.mongoPick(collection, [ whereQuery, {
            cliid: 1,
            sessions: 1,
            source: 1,
          } ], { selfMongo });
          
          coreRows = (await back.getClientsByQuery(coreWhereQuery, { selfMongo: selfCoreMongo })).toNormal();
          for (let obj of rows) {
            thisClient = coreRows.find((c) => { return c.cliid === obj.cliid }) === undefined ? null : coreRows.find((c) => { return c.cliid === obj.cliid });
            if (thisClient !== null) {
              obj.client = equalJson(JSON.stringify(thisClient));
            } else {
              obj.client = (await back.getClientById(obj.cliid, { selfMongo: selfCoreMongo })).toNormal();
            }
          }

          cliidArr = [ ...new Set(rows.map((o) => { return o.cliid })) ];

          // 클라이언트 ID에 해당하는 프로젝트 데이터를 조회합니다.
          if (cliidArr.length > 0) {
            projects = await back.mongoPick("project", [
              {
                $or: cliidArr.map((cliid) => { return { cliid } })
              },
              {
                proid: 1,
                cliid: 1,
                desid: 1,
                service: 1,
                "proposal.date": 1,
                "process.status": 1,
                "process.contract": 1,
              }
            ], { selfMongo: selfCoreMongo });
          } else {
            projects = [];
          }

          // 프로젝트 데이터를 날짜 순으로 정렬합니다.
          projects.sort((a, b) => { return a.proposal.date.valueOf() - b.proposal.date.valueOf() });

          // 클라이언트 요청 데이터를 날짜 순으로 정렬합니다.
          rows.sort((a, b) => {
            return b.client.requests[0].request.timeline.valueOf() - a.client.requests[0].request.timeline.valueOf();
          });

          finalRows = [];
          for (let obj of rows) {
            if (obj.cliid !== "c1801_aa01s") {
              for (let i = 0; i < obj.client.requests.length; i++) {
                copiedObj = equalJson(JSON.stringify(obj));
                tempObj = { ...copiedObj };
                tempObj.cliid = obj.cliid;
                tempObj.client = equalJson(JSON.stringify(obj.client));
                tempObj.client.requests = [
                  equalJson(JSON.stringify(obj.client.requests[i]))
                ];
                tempObj.requestNumber = i;
                projectArr = projects.filter((p) => { return p.cliid === obj.cliid });
                projectArr.sort((a, b) => { return a.proposal.date.valueOf() - b.proposal.date.valueOf() });
                thisProject = null;
                for (let p of projectArr) {
                  if (obj.client.requests[i].request.timeline.valueOf() <= p.proposal.date.valueOf()) {
                    thisProject = equalJson(JSON.stringify(p));
                    break;
                  }
                }
                if (thisProject !== null) {
                  if (thisProject.process.contract.first.date.valueOf() > emptyDateValue) {
                    if (!/드랍/gi.test(thisProject.process.status)) {
                      tempObj.client.requests[0].analytics.response.status = "진행";
                    } else {
                      tempObj.client.requests[0].analytics.response.status = "드랍";
                    }
                  }
                }
                tempObj.project = equalJson(JSON.stringify(thisProject));

                finalRows.push(equalJson(JSON.stringify(tempObj)));
              }
            }
          }

          // 최종 데이터를 클라이언트에게 응답합니다.
          finalRows.sort((a, b) => {
            return b.client.requests[0].request.timeline.valueOf() - a.client.requests[0].request.timeline.valueOf();
          });

          res.send(JSON.stringify(finalRows));

        } else {
          throw new Error("invalid mode");
        }

      } catch (e) {
        // 예외 발생 시 오류를 로그로 기록하고 클라이언트에게 오류 메시지를 응답합니다.
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /extractAnalytics
     * @description 주어진 날짜 범위에 따라 다양한 유형의 분석 데이터를 추출하는 라우터입니다.
     * @param {Object} req - 클라이언트의 요청 객체입니다.
     * @param {Object} req.body - 요청 본문입니다.
     * @param {string} req.body.mode - 데이터 추출 모드 ("daily", "charge", "campaign")를 지정합니다.
     * @param {Date} req.body.fromDate - 조회를 시작할 날짜입니다.
     * @param {Date} req.body.toDate - 조회를 종료할 날짜입니다.
     * @param {Object} res - 서버의 응답 객체입니다.
     */
    router.post([ "/extractAnalytics" ], async function (req, res) {
      // 응답 헤더를 설정하여 JSON 형태의 데이터를 반환하고, CORS를 허용합니다.
      res.set({
          "Content-Type": "application/json", // 응답 콘텐츠 타입을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 정의합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 요청 헤더에서 허용할 항목을 지정합니다.
      });

      try {
          // 요청 본문에서 모드를 가져옵니다. 모드가 정의되지 않은 경우 예외를 발생시킵니다.
          if (req.body.mode === undefined) {
              throw new Error("invalid post");
          }

          const selfMongo = instance.mongolocal; // MongoDB 로컬 연결 객체를 가져옵니다.
          const { mode } = equalJson(req.body); // equalJson 메서드를 사용하여 요청 본문을 파싱하고 필요한 값을 추출합니다.
          let collection; // 사용할 MongoDB 컬렉션을 저장할 변수입니다.
          let fromDate, toDate; // 조회할 날짜 범위를 저장할 변수입니다.
          let whereQuery; // MongoDB에서 사용할 조회 쿼리입니다.
          let rows; // 조회된 데이터를 저장할 변수입니다.

          if (mode === "daily") {
              // 모드가 "daily"인 경우, 일별 분석 데이터를 조회합니다.

              // 날짜 정보가 정의되지 않은 경우 예외를 발생시킵니다.
              if (req.body.fromDate === undefined || req.body.toDate === undefined) {
                  throw new Error("invalid post 2");
              }

              // 요청 본문에서 시작 날짜와 종료 날짜를 가져옵니다.
              ({ fromDate, toDate } = equalJson(req.body));
              collection = "dailyAnalytics"; // 조회할 컬렉션을 지정합니다.

              // 날짜를 UTC 기준으로 초기화합니다.
              fromDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate(), 0, 0, 0);
              toDate = new Date(toDate.getFullYear(), toDate.getMonth(), toDate.getDate(), 0, 0, 0);

              // MongoDB에서 사용할 조회 조건을 설정합니다.
              whereQuery = {};
              whereQuery["$and"] = [];
              whereQuery["$and"].push({
                  "date.from": {
                      $gte: fromDate,
                  }
              });
              whereQuery["$and"].push({
                  "date.from": {
                      $gte: fromDate,
                  }
              });
              whereQuery["$and"].push({
                  "date.from": {
                      $lte: toDate,
                  }
              });

              // 설정된 조건으로 데이터를 조회합니다.
              rows = await back.mongoRead(collection, whereQuery, { selfMongo });
              // 조회된 데이터를 클라이언트에게 응답합니다.
              res.send(JSON.stringify(rows));

          } else if (mode === "charge" || mode === "campaign") {
              // 모드가 "charge" 또는 "campaign"인 경우, 해당 유형의 데이터를 조회합니다.

              // 날짜 정보가 정의되지 않은 경우 예외를 발생시킵니다.
              if (req.body.fromDate === undefined || req.body.toDate === undefined) {
                  throw new Error("invalid post 2");
              }

              // 요청 본문에서 시작 날짜와 종료 날짜를 가져옵니다.
              ({ fromDate, toDate } = equalJson(req.body));
              collection = "dailyCampaign"; // 조회할 컬렉션을 지정합니다.

              // 날짜를 UTC 기준으로 초기화합니다.
              fromDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate(), 0, 0, 0);
              toDate = new Date(toDate.getFullYear(), toDate.getMonth(), toDate.getDate(), 0, 0, 0);

              // MongoDB에서 사용할 조회 조건을 설정합니다.
              whereQuery = {};
              whereQuery["$and"] = [];
              whereQuery["$and"].push({
                  "date.from": {
                      $gte: fromDate,
                  }
              });
              whereQuery["$and"].push({
                  "date.from": {
                      $gte: fromDate,
                  }
              });
              whereQuery["$and"].push({
                  "date.from": {
                      $lte: toDate,
                  }
              });
              // 모드가 "charge"인 경우, 추가 조건을 설정합니다.
              if (mode === "charge") {
                  whereQuery["$and"].push({
                      "information.mother": {
                          $ne: "unknown"
                      }
                  });
              }

              // 설정된 조건으로 데이터를 조회합니다.
              rows = await back.mongoRead(collection, whereQuery, { selfMongo });
              // 조회된 데이터를 클라이언트에게 응답합니다.
              res.send(JSON.stringify(rows));

          } else {
              // 잘못된 모드가 전달된 경우 예외를 발생시킵니다.
              throw new Error("invalid mode");
          }

      } catch (e) {
          // 예외 발생 시 오류를 로그로 기록하고 클라이언트에게 오류 메시지를 응답합니다.
          logger.error(e, req).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /requestScript
     * @description 주어진 URL을 통해 스크립트를 요청하고 그 결과를 반환하는 라우터입니다.
     * @param {Object} req - 클라이언트의 요청 객체입니다.
     * @param {Object} req.body - 요청 본문입니다.
     * @param {string} req.body.url - 요청할 스크립트의 URL입니다.
     * @param {Object} res - 서버의 응답 객체입니다.
     */
    router.post([ "/requestScript" ], async function (req, res) {
      // 응답 헤더를 설정하여 JSON 형태의 데이터를 반환하고, CORS를 허용합니다.
      res.set({
          "Content-Type": "application/json", // 응답 콘텐츠 타입을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 정의합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 요청 헤더에서 허용할 항목을 지정합니다.
      });

      try {
          // 요청 본문에서 URL이 정의되지 않은 경우 예외를 발생시킵니다.
          if (req.body.url === undefined) {
              throw new Error("invalid post");
          }

          // 주어진 URL을 디코드하고 requestSystem 메서드를 통해 요청을 보냅니다.
          const responses = await requestSystem(global.decodeURIComponent(req.body.url));

          // 요청에 대한 응답 데이터를 JSON 형태로 클라이언트에게 전송합니다.
          res.send(JSON.stringify({ data: responses.data }));
      } catch (e) {
          // 예외 발생 시, 요청 정보를 콘솔에 출력합니다.
          console.log(req);

          // 예외 메시지를 JSON 형태로 클라이언트에게 응답합니다.
          res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /resetContentsPhotoStatus
     * @description 콘텐츠의 사진 상태를 초기화하는 라우터입니다. 주어진 콘텐츠 ID(pid)에 해당하는 콘텐츠의 사진 배열을 재설정합니다.
     * @param {Object} req - 클라이언트의 요청 객체입니다.
     * @param {Object} req.body - 요청 본문입니다.
     * @param {string} req.body.pid - 콘텐츠의 포트폴리오 ID입니다.
     * @param {Object} res - 서버의 응답 객체입니다.
     */
    router.post([ "/resetContentsPhotoStatus" ], async function (req, res) {
      // 응답 헤더를 설정하여 JSON 형태의 데이터를 반환하고, CORS를 허용합니다.
      res.set({
          "Content-Type": "application/json", // 응답 콘텐츠 타입을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용된 HTTP 메서드를 정의합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 요청 헤더에서 허용할 항목을 지정합니다.
      });

      try {
          // 요청 본문에서 pid가 정의되지 않은 경우 예외를 발생시킵니다.
          if (req.body.pid === undefined) {
              throw new Error("invalid post");
          }

          const { pid } = req.body; // 요청 본문에서 pid를 추출합니다.
          const collection = "contents"; // 사용할 MongoDB 컬렉션 이름을 정의합니다.
          const selfMongo = instance.mongo; // MongoDB 인스턴스를 가져옵니다.
          const selfLocalMongo = instance.mongo; // 로컬 MongoDB 인스턴스를 가져옵니다.
          let photo; // 사진 배열을 저장할 변수입니다.
          let thisContents; // 해당 pid에 대한 콘텐츠 데이터를 저장할 변수입니다.
          let contentsDetail; // 콘텐츠의 세부 사항을 저장할 변수입니다.
          let whereQuery; // MongoDB 쿼리를 저장할 변수입니다.

          // MongoDB에서 해당 pid의 콘텐츠를 읽어옵니다.
          [ thisContents ] = await back.mongoRead(collection, { "contents.portfolio.pid": pid }, { selfMongo });

          // 콘텐츠의 세부 사항을 깊은 복사하여 저장합니다.
          contentsDetail = objectDeepCopy(thisContents.contents.portfolio.contents.detail);

          // 콘텐츠의 사진 인덱스를 추출하여 photo 배열에 저장합니다.
          photo = thisContents.photos.detail.map((o) => { return o.index });
          
          // 첫 번째 세부 사항의 사진 배열을 초기화합니다.
          contentsDetail[0].photo = [];

          // 콘텐츠의 세부 사항이 2개 미만인 경우 두 번째 항목을 추가합니다.
          if (contentsDetail.length < 2) {
              contentsDetail.push({
                  photo: [], // 사진 배열을 초기화합니다.
                  title: "space", // 제목을 "space"로 설정합니다.
                  contents: "", // 내용을 빈 문자열로 설정합니다.
              });
          }

          // 두 번째 세부 사항의 사진 배열에 추출한 사진 인덱스를 설정합니다.
          contentsDetail[1].photo = photo;

          // 세 번째 이후의 세부 사항의 사진 배열을 모두 초기화합니다.
          for (let i = 2; i < contentsDetail.length; i++) {
              contentsDetail[i].photo = [];
          }

          // MongoDB에 업데이트 쿼리를 수행하여 콘텐츠의 세부 사항을 업데이트합니다.
          await back.mongoUpdate(collection, [ { "contents.portfolio.pid": pid }, { "contents.portfolio.contents.detail": contentsDetail } ], { selfMongo });
          await back.mongoUpdate(collection, [ { "contents.portfolio.pid": pid }, { "contents.portfolio.contents.detail": contentsDetail } ], { selfMongo: selfLocalMongo });

          // 클라이언트에게 작업 완료 메시지를 전송합니다.
          res.send(JSON.stringify({ message: "done" }));
      } catch (e) {
          // 예외 발생 시, 요청 정보를 콘솔에 출력합니다.
          console.log(req);

          // 예외 메시지를 JSON 형태로 클라이언트에게 응답합니다.
          res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /aspirantToDesigner
     * @description 지원자를 디자이너로 등록하는 라우터입니다. 클라이언트의 POST 요청을 처리하고, 요청된 지원자의 정보를 디자이너로 변환하여 MongoDB에 저장합니다.
     * @param {Object} req - 클라이언트 요청 객체입니다.
     * @param {Object} res - 서버 응답 객체입니다.
     */
    router.post([ "/aspirantToDesigner" ], async function (req, res) {

      // 응답 헤더를 설정하여 클라이언트의 요청에 대해 JSON 형식으로 응답합니다.
      res.set({
        "Content-Type": "application/json", // 응답의 콘텐츠 타입을 JSON으로 설정합니다.
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정합니다.
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 설정합니다.
      });

      try {
        // 클라이언트가 전달한 요청 본문에 aspid가 정의되지 않았을 경우 예외를 발생시킵니다.
        if (req.body.aspid === undefined) {
          throw new Error("invaild post"); // 유효하지 않은 POST 요청에 대한 오류 메시지.
        }

        // equalJson 메서드를 사용하여 요청 본문을 깊은 복사한 후, aspid를 추출합니다.
        // equalJson은 JSON.parse의 업그레이드된 버전으로, 객체를 깊은 복사할 때 사용됩니다.
        const { aspid } = equalJson(req.body);

        let aspirants, aspirant;
        let aspidArr;
        let designer;

        // 지원자 정보를 조회하기 위해 BackMaker 클래스의 getAspirantsByQuery 메서드를 호출합니다.
        // MongoDB에서 aspid에 해당하는 지원자 정보를 조회하며, 조회된 결과는 배열로 반환됩니다.
        aspirants = await back.getAspirantsByQuery({ aspid: aspid }, { selfMongo: instance.mongo });

        // 조회된 지원자 정보 중 첫 번째 지원자를 선택하고, 해당 지원자 객체를 일반 객체로 변환합니다.
        aspirant = aspirants[0].toNormal();

        // 지원자 객체에서 디자이너 이름을 가져옵니다.
        designer = aspirant.designer;

        // 지원자 ID와 계약 날짜를 포함한 객체를 배열로 생성합니다.
        aspidArr = [];
        aspidArr.push({ aspid: aspirant.aspid, contract: aspirant.contract.partnership.date });

        // BackWorker 클래스의 aspirantToDesigner 메서드를 호출하여 지원자를 디자이너로 변환합니다.
        // MongoDB에 디자이너 정보를 저장한 후, 메시지를 전송하여 디자이너 등록 완료를 알립니다.
        work.aspirantToDesigner(aspidArr, { selfMongo: instance.mongo }).then(() => {
          // messageSend 메서드를 사용하여 디자이너 등록 완료 메시지를 전송합니다.
          // 메시지는 지정된 텍스트와 채널로 전송되며, 음성 및 요정(fairy) 기능은 비활성화됩니다.
          return messageSend({ text: designer + " 디자이너 등록을 완료하였어요! DE 2번 콘솔에서 확인해주세요!", channel: "#300_designer", voice: false, fairy: false });
        }).catch((err) => {
          // 디자이너 등록 중 오류가 발생하면 콘솔에 오류를 출력합니다.
          console.log(err);
        });

        // 클라이언트에 'will do'라는 메시지를 JSON 형식으로 응답합니다.
        res.send(JSON.stringify({ message: "will do" }));
      } catch (e) {
        // 오류가 발생한 경우, 클라이언트 요청 객체를 콘솔에 출력합니다.
        console.log(req);

        // 오류 메시지를 JSON 형식으로 클라이언트에 응답합니다.
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /getContentsView
     * @description 콘텐츠 뷰 정보를 가져오는 라우터입니다. 클라이언트의 POST 요청을 처리하고, 요청된 모드에 따라 데이터를 조회하여 응답합니다.
     * @param {Object} req - 클라이언트 요청 객체입니다.
     * @param {Object} res - 서버 응답 객체입니다.
     */
    router.post([ "/getContentsView" ], async function (req, res) {

      // 응답 헤더를 설정하여 클라이언트의 요청에 대해 JSON 형식으로 응답합니다.
      res.set({
        "Content-Type": "application/json", // 응답의 콘텐츠 타입을 JSON으로 설정합니다.
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정합니다.
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 설정합니다.
      });

      try {
        // 클라이언트가 전달한 요청 본문에 mode가 정의되지 않았을 경우 예외를 발생시킵니다.
        if (req.body.mode === undefined) {
          throw new Error("invalid post"); // 유효하지 않은 POST 요청에 대한 오류 메시지.
        }

        // equalJson 메서드를 사용하여 요청 본문을 깊은 복사한 후, mode를 추출합니다.
        // equalJson은 JSON.parse의 업그레이드된 버전으로, 객체를 깊은 복사할 때 사용됩니다.
        const { mode } = equalJson(req.body);

        // 로컬 MongoDB 연결 객체를 selfMongo 변수에 할당합니다.
        const selfMongo = instance.mongolocal;

        // 조회할 MongoDB 컬렉션 이름을 설정합니다.
        const collection = "contentsView";

        let rows; // MongoDB에서 조회한 결과를 저장할 변수입니다.
        let data; // 특정 조건에 맞는 데이터를 저장할 변수입니다.

        // BackMaker 클래스의 mongoPick 메서드를 호출하여 지정된 컬렉션에서 데이터를 조회합니다.
        // 첫 번째 인자는 컬렉션 이름, 두 번째 인자는 조회할 필드, 세 번째 인자는 MongoDB 연결 정보입니다.
        rows = await back.mongoPick(collection, [ {}, { key: 1, date: 1 } ], { selfMongo });

        // 조회한 데이터를 날짜 기준으로 내림차순으로 정렬합니다.
        rows.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });

        // mode가 "pick" 또는 "get"인 경우에만 데이터를 처리합니다.
        if (mode === "pick" || mode === "get") {

          // 조회된 데이터가 있는 경우, 가장 최근 데이터를 가져와 MongoDB에서 읽어옵니다.
          if (rows.length > 0) {
            [ data ] = await back.mongoRead(collection, { key: rows[0].key }, { selfMongo });

            // 조회된 데이터를 JSON 형식으로 클라이언트에 응답합니다.
            res.send(JSON.stringify({ data, date: data.date }));
          } else {
            // 조회된 데이터가 없는 경우, null을 JSON 형식으로 클라이언트에 응답합니다.
            res.send(JSON.stringify({ data: null }));
          }
        } else {
          // mode가 "pick" 또는 "get"이 아닌 경우, 예외를 발생시킵니다.
          throw new Error("invalid mode");
        }

      } catch (e) {
        // 오류가 발생한 경우, logger.error 메서드를 통해 오류를 로깅합니다.
        // Mother 클래스의 메서드를 활용하여 오류를 기록하고 알림을 보낼 수 있습니다.
        logger.error(e, req).catch((e) => { console.log(e); });

        // 오류 메시지를 JSON 형식으로 클라이언트에 응답합니다.
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @route POST /storeContentsView
     * @description 웹 콘텐츠 뷰 정보를 저장하는 라우터입니다. 클라이언트의 POST 요청을 처리하고, 주어진 데이터를 MongoDB에 저장합니다.
     * @param {Object} req - 클라이언트 요청 객체입니다.
     * @param {Object} res - 서버 응답 객체입니다.
     */
    router.post([ "/storeContentsView" ], async function (req, res) {

      // 응답 헤더를 설정하여 클라이언트의 요청에 대해 JSON 형식으로 응답합니다.
      res.set({
        "Content-Type": "application/json", // 응답의 콘텐츠 타입을 JSON으로 설정합니다.
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정합니다.
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 설정합니다.
      });

      try {
        /**
         * @function storeContentsView
         * @description 웹 콘텐츠 뷰 정보를 MongoDB에 저장하는 비동기 함수입니다.
         * @param {Object} selfMongo - MongoDB 연결 객체입니다.
         * @param {Object} logger - 로깅을 처리하는 객체입니다.
         * @returns {Object} - 작업 결과 메시지를 반환합니다.
         */
        const storeContentsView = async function (selfMongo, logger) {
          try {
            const analyticsCollection = "homeliaisonAnalytics"; // 분석 데이터를 저장하는 컬렉션 이름을 정의합니다.
            const action = "contentsView"; // 작업 액션 이름을 정의합니다.
            const collection = "contentsView"; // 콘텐츠 뷰 데이터를 저장하는 컬렉션 이름을 정의합니다.
            let rows; // MongoDB에서 조회한 결과를 저장할 변수입니다.
            let whereQuery; // MongoDB 쿼리 조건을 저장할 변수입니다.
            let contentsArr; // 콘텐츠 배열을 저장할 변수입니다.
            let jsonModel; // 최종 JSON 모델을 저장할 변수입니다.
            let browserMap; // 브라우저 정보를 저장할 배열입니다.
            let foundTarget, foundTarget2, foundTarget3; // 특정 타겟을 찾기 위한 변수입니다.
            let osMap; // 운영체제 정보를 저장할 배열입니다.
            let timeMap; // 시간 정보를 저장할 배열입니다.
            let dateTypeString; // 날짜 문자열을 저장할 변수입니다.
            let finalJson; // 최종 JSON 데이터를 저장할 변수입니다.
            let finalRows, key; // 최종 행 데이터를 저장할 변수와 키 값입니다.

            // 키 값을 현재 날짜를 기준으로 생성합니다. 형식은 "YYYYMMDD_web"입니다.
            key = dateToString(new Date()).replace(/[^0-9]/gi, '') + "_web";

            // 최종 JSON 데이터를 초기화합니다.
            finalJson = {
              key, // 생성된 키 값을 할당합니다.
              date: new Date(), // 현재 날짜를 할당합니다.
              contents: [], // 콘텐츠 데이터를 저장할 배열을 초기화합니다.
            };

            // BackMaker 클래스의 getContentsArrByQuery 메서드를 호출하여 콘텐츠 배열을 가져옵니다.
            contentsArr = await back.getContentsArrByQuery({}, { selfMongo });

            // 가져온 각 콘텐츠에 대해 반복 작업을 수행합니다.
            for (let contents of contentsArr) {

              // 포트폴리오 ID를 추출합니다.
              thisPid = contents.contents.portfolio.pid;

              // MongoDB에서 데이터를 조회하기 위한 쿼리 조건을 정의합니다.
              whereQuery = { action, "data.contents_pid": thisPid };

              // BackMaker 클래스의 mongoRead 메서드를 사용하여 데이터를 조회합니다.
              rows = await back.mongoRead(analyticsCollection, whereQuery, { selfMongo });
          
              // 브라우저 정보를 필터링하고, 소문자로 변환한 후 중복을 제거합니다.
              browserMap = rows.filter((o) => { return typeof o.device.os.browser === "string" }).map((o) => { return o.device.os.browser.toLowerCase().trim(); });
              browserMap = [ ...new Set(browserMap) ];
              browserMap = browserMap.map((type) => { return { type, value: 0 } });
          
              // 운영체제 정보를 필터링하고, 소문자로 변환한 후 중복을 제거합니다.
              osMap = rows.filter((o) => { return typeof o.device.os.name === "string" }).map((o) => { return o.device.os.name.toLowerCase().trim(); });
              osMap = [ ...new Set(osMap) ];
              osMap = osMap.map((type) => { return { type, value: 0 } });
          
              // 시간 정보를 필터링하고, 날짜 문자열을 정규식으로 처리하여 중복을 제거합니다.
              timeMap = rows.map((o) => { return dateToString(o.date).replace(/[^0-9]/gi, '').slice(0, 6) });
              timeMap = [ ...new Set(timeMap) ];
              timeMap = timeMap.map((type) => { return { type, value: 0 } });
          
              // 조회된 각 데이터에 대해 브라우저, 운영체제, 시간 정보를 맵핑하여 값을 증가시킵니다.
              for (let obj of rows) {
                if (typeof obj.device.os.browser === "string") {
                  foundTarget = browserMap.find((o) => { return o.type === obj.device.os.browser.toLowerCase().trim() });
                  if (foundTarget !== undefined) {
                    foundTarget.value += 1;
                  }
                }
                if (typeof obj.device.os.name === "string") {
                  foundTarget2 = osMap.find((o) => { return o.type === obj.device.os.name.toLowerCase().trim() });
                  if (foundTarget2 !== undefined) {
                    foundTarget2.value += 1;
                  }
                }
                dateTypeString = dateToString(obj.date).replace(/[^0-9]/gi, '').slice(0, 6);
                foundTarget3 = timeMap.find((o) => { return o.type === dateTypeString });
                if (foundTarget3 !== undefined) {
                  foundTarget3.value += 1;
                }
              }
          
              // JSON 모델을 생성하여 포트폴리오, 디자이너, 프로젝트 등의 정보를 포함합니다.
              jsonModel = {
                pid: thisPid, // 포트폴리오 ID를 저장합니다.
                conid: contents.conid, // 콘텐츠 ID를 저장합니다.
                desid: contents.desid, // 디자이너 ID를 저장합니다.
                proid: contents.proid, // 프로젝트 ID를 저장합니다.
                date: new Date(JSON.stringify(contents.contents.portfolio.date).slice(1, -1)), // 포트폴리오 날짜를 저장합니다.
                data: {
                  view: {
                    total: rows.length, // 조회된 전체 데이터의 길이를 저장합니다.
                    portfolio: rows.filter((obj) => { return !/revdetail/gi.test(obj.info.requestUrl) }).length, // 포트폴리오 조회 수를 저장합니다.
                    review: rows.filter((obj) => { return /revdetail/gi.test(obj.info.requestUrl) }).length, // 리뷰 조회 수를 저장합니다.
                  },
                  device: {
                    mobile: rows.filter((obj) => { return /mobile/gi.test(obj.device.device.type) }).length, // 모바일 조회 수를 저장합니다.
                    desktop: rows.filter((obj) => { return /desktop/gi.test(obj.device.device.type) }).length, // 데스크탑 조회 수를 저장합니다.
                    tablet: rows.filter((obj) => { return /tablet/gi.test(obj.device.device.type) }).length, // 태블릿 조회 수를 저장합니다.
                  },
                  browser: equalJson(JSON.stringify(browserMap)), // 브라우저 맵 데이터를 저장합니다.
                  os: equalJson(JSON.stringify(osMap)), // 운영체제 맵 데이터를 저장합니다.
                  time: equalJson(JSON.stringify(timeMap)), // 시간 맵 데이터를 저장합니다.
                }
              };
          
              // 최종 JSON 데이터에 콘텐츠 정보를 추가합니다.
              finalJson.contents.push(equalJson(JSON.stringify(jsonModel)));

              // 각 콘텐츠 데이터를 처리한 후 일정 시간(1500ms)을 대기합니다.
              await sleep(1500);
            }
            
            // 동일한 키 값을 가진 데이터가 이미 존재하는지 확인하기 위해 조회합니다.
            finalRows = await back.mongoRead(collection, { key }, { selfMongo });
            if (finalRows.length > 0) {
              // 기존 데이터가 존재하면 삭제합니다.
              await back.mongoDelete(collection, { key }, { selfMongo });
            }
            // 새롭게 생성한 최종 JSON 데이터를 MongoDB에 저장합니다.
            await back.mongoCreate(collection, finalJson, { selfMongo });
        
            // 작업이 성공적으로 완료되었음을 로깅합니다.
            await logger.log("store web contents view success : " + JSON.stringify(new Date()));
            return { message: "done" }; // 작업 결과 메시지를 반환합니다.
          } catch (e) {
            // 오류가 발생하면 오류를 로깅하고, 콘솔에 출력합니다.
            logger.error(e).catch((e) => { console.log(e); });
            console.log(e);
            return null; // 오류 발생 시 null을 반환합니다.
          }
        }

        // storeContentsView 함수를 호출하여 작업을 수행하고, 결과 메시지를 처리합니다.
        storeContentsView(instance.mongo, logger).then((resultMessage) => {
          if (resultMessage.message !== "done") {
            throw new Error("store web contents view fail"); // 작업이 실패한 경우 예외를 발생시킵니다.
          }
          return sleep(500); // 작업이 성공하면 500ms 대기합니다.
        }).catch((err) => {
          // 오류가 발생하면 오류를 로깅하고, 콘솔에 출력합니다.
          logger.error(err, req).catch((e) => { console.log(e); });
        });

        // 클라이언트에 'will do'라는 메시지를 JSON 형식으로 응답합니다.
        res.send(JSON.stringify({ message: "will do" }));
      } catch (e) {
        // 오류가 발생한 경우, logger.error 메서드를 통해 오류를 로깅합니다.
        logger.error(e, req).catch((e) => { console.log(e); });

        // 오류 메시지를 JSON 형식으로 클라이언트에 응답합니다.
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @route POST /syncClientBudget
     * @description 클라이언트의 예산 정보를 동기화하는 라우터입니다. 클라이언트의 POST 요청을 처리하고, 요청된 데이터를 기반으로 클라이언트와 프로젝트의 예산 정보를 갱신합니다.
     * @param {Object} req - 클라이언트 요청 객체입니다.
     * @param {Object} res - 서버 응답 객체입니다.
     */
    router.post([ "/syncClientBudget" ], async function (req, res) {

      // 응답 헤더를 설정하여 클라이언트의 요청에 대해 JSON 형식으로 응답합니다.
      res.set({
        "Content-Type": "application/json", // 응답의 콘텐츠 타입을 JSON으로 설정합니다.
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정합니다.
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 설정합니다.
      });

      try {
        const toNormal = true; // 프로젝트 및 클라이언트 데이터를 일반 객체로 변환할지 여부를 결정하는 플래그입니다.
        const selfCoreMongo = instance.mongo; // 메인 MongoDB 연결 객체를 selfCoreMongo 변수에 할당합니다.
        const selfMongo = instance.mongolocal; // 로컬 MongoDB 연결 객체를 selfMongo 변수에 할당합니다.
        const collection = "clientEvaluation"; // 클라이언트 평가 데이터를 저장하는 컬렉션 이름을 정의합니다.

        // 예산 범위를 정의한 배열을 초기화합니다. 이 배열은 클라이언트의 예산을 특정 범위로 매핑하는 데 사용됩니다.
        const budgetArr = [
          "500만원 이하",
          "1,000만원",
          "1,500만원",
          "2,000만원",
          "3,000만원",
          "4,000만원",
          "5,000만원 이상",
          "6,000만원 이상",
          "7,000만원 이상",
          "8,000만원 이상",
          "9,000만원 이상",
          "1억원 이상",
        ];

        let rows; // MongoDB에서 조회한 클라이언트 평가 데이터를 저장할 변수입니다.
        let projects, clients; // MongoDB에서 조회한 프로젝트 및 클라이언트 데이터를 저장할 변수입니다.
        let proidArr, cliidArr; // 프로젝트 ID 및 클라이언트 ID 배열을 저장할 변수입니다.
        let thisProject, thisClient; // 현재 처리 중인 프로젝트 및 클라이언트를 저장할 변수입니다.
        let thisRequestNumber; // 현재 처리 중인 요청 번호를 저장할 변수입니다.
        let whereQuery, updateQuery; // MongoDB 쿼리 조건 및 갱신할 데이터를 저장할 변수입니다.
        let tempString; // 임시 문자열을 저장할 변수입니다.
        let thisIndex; // 예산 배열에서 매칭된 인덱스를 저장할 변수입니다.
        let ago; // 2개월 전 날짜를 저장할 변수입니다.
        let contentsRows; // MongoDB에서 조회한 콘텐츠 데이터를 저장할 변수입니다.

        (async function () {
          try {
            ago = new Date(); // 현재 날짜를 가져옵니다.
            ago.setMonth(ago.getMonth() - 2); // 현재 날짜에서 2개월을 뺀 날짜를 계산합니다.
        
            // 2개월 이내에 생성된 클라이언트 평가 데이터를 MongoDB에서 조회합니다.
            rows = await back.mongoRead(collection, { date: { $gte: ago } }, { selfMongo });
            
            // 조회한 데이터에서 프로젝트 ID(proid)와 클라이언트 ID(cliid)를 추출하여 배열로 만듭니다.
            proidArr = rows.map((o) => { return { proid: o.proid } });
            cliidArr = rows.map((o) => { return { cliid: o.cliid } });
        
            // 추출된 프로젝트 ID 배열을 이용해 프로젝트 데이터를 MongoDB에서 조회합니다.
            projects = await back.getProjectsByQuery({ $or: proidArr }, { selfMongo: selfCoreMongo, toNormal });
            
            // 추출된 클라이언트 ID 배열을 이용해 클라이언트 데이터를 MongoDB에서 조회합니다.
            clients = await back.getClientsByQuery({ $or: cliidArr }, { selfMongo: selfCoreMongo, toNormal });
        
            // 조회한 클라이언트 평가 데이터를 반복하면서 각 데이터를 처리합니다.
            for (let obj of rows) {
        
              // 현재 클라이언트 평가 데이터의 프로젝트와 클라이언트를 각각 찾습니다.
              thisProject = projects.find((p) => { return p.proid === obj.proid });
              thisClient = clients.find((c) => { return c.cliid === obj.cliid });
              
              // 현재 클라이언트의 요청 중, 프로젝트 제안 날짜 이전의 요청을 찾습니다.
              thisRequestNumber = 0;
              for (let i = 0; i < thisClient.requests.length; i++) {
                if (thisClient.requests[i].request.timeline.valueOf() <= thisProject.proposal.date.valueOf()) {
                  thisRequestNumber = i; // 해당 요청의 인덱스를 저장합니다.
                  break;
                }
              }
        
              // 클라이언트 ID를 기준으로 하는 쿼리 조건을 설정합니다.
              whereQuery = { cliid: obj.cliid };
              updateQuery = {}; // 업데이트할 데이터를 저장할 객체를 초기화합니다.
        
              // 총 예산과 스타일링 예산 중 더 큰 값을 선택하고, 이를 콤마 형식으로 변환합니다.
              tempString = autoComma(obj.spend.total >= obj.spend.styling ? obj.spend.total : obj.spend.styling, true);
              
              // 변환된 예산 문자열이 예산 배열의 어느 위치에 속하는지 찾습니다.
              thisIndex = budgetArr.findIndex((str) => { return (new RegExp(tempString, "gi")).test(str) });
        
              // 예산 배열에서 매칭된 값이 있을 경우, 해당 요청의 예산 정보를 업데이트합니다.
              if (thisIndex !== -1) {
                updateQuery["requests." + String(thisRequestNumber) + ".request.budget"] = budgetArr[thisIndex];
                // 업데이트된 예산 정보를 MongoDB에 반영합니다.
                await back.updateClient([ whereQuery, updateQuery ], { selfMongo: selfCoreMongo });
                
                // 해당 프로젝트의 콘텐츠 데이터를 조회합니다.
                contentsRows = await back.getContentsArrByQuery({ proid: thisProject.proid }, { selfMongo: selfCoreMongo });
                
                // 조회된 콘텐츠 데이터가 있을 경우, 콘텐츠의 예산 정보를 업데이트합니다.
                if (contentsRows.length > 0) {
                  await back.updateContents([ { conid: contentsRows[0].conid }, {
                    "contents.portfolio.spaceInfo.budget": budgetArr[thisIndex],
                  } ], { selfMongo: selfCoreMongo });
                }
              }
            }
        
            // 예산 동기화 작업이 완료되었음을 로깅합니다.
            logger.log("budget sync done").catch((err) => { console.log(err) });
        
          } catch (e) {
            // 오류가 발생한 경우, 콘솔에 오류를 출력합니다.
            console.log(e);
          }
        })().catch((err) => { console.log(err); }) // 비동기 함수 내에서 발생한 오류를 처리합니다.
        
        // 클라이언트에 'will do'라는 메시지를 JSON 형식으로 응답합니다.
        res.send(JSON.stringify({ message: "will do" }));

      } catch (e) {
        // 오류가 발생한 경우, logger.error 메서드를 통해 오류를 로깅합니다.
        logger.error(e, req).catch((e) => { console.log(e); });

        // 오류 메시지를 JSON 형식으로 클라이언트에 응답합니다.
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /shareGoogleId
     * @description Google ID를 저장하거나 조회하는 라우터입니다. 클라이언트의 요청에 따라 Google ID 정보를 MongoDB에 저장하거나, 저장된 정보를 조회합니다.
     * @param {Object} req - 클라이언트 요청 객체입니다.
     * @param {Object} res - 서버 응답 객체입니다.
     */
    router.post([ "/shareGoogleId" ], async function (req, res) {

      // 응답 헤더를 설정하여 클라이언트의 요청에 대해 JSON 형식으로 응답합니다.
      res.set({
        "Content-Type": "application/json", // 응답의 콘텐츠 타입을 JSON으로 설정합니다.
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정합니다.
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 설정합니다.
      });

      try {
        // 클라이언트가 전달한 요청 본문에 mode가 정의되지 않았을 경우 예외를 발생시킵니다.
        if (req.body.mode === undefined) {
          throw new Error("invalid post"); // 유효하지 않은 POST 요청에 대한 오류 메시지.
        }

        // 로컬 MongoDB 연결 객체를 selfMongo 변수에 할당합니다.
        const selfMongo = instance.mongolocal;

        // 공유할 Google ID 데이터를 저장할 컬렉션 이름을 설정합니다.
        const collection = "shareGoogleId";

        // equalJson 메서드를 사용하여 요청 본문을 깊은 복사한 후, mode를 추출합니다.
        // equalJson은 JSON.parse의 업그레이드된 버전으로, 객체를 깊은 복사할 때 사용됩니다.
        const { mode } = equalJson(req.body);

        let json; // 저장할 Google ID 정보를 담을 객체입니다.
        let rows; // MongoDB에서 조회한 결과를 저장할 변수입니다.
        let resultObj; // 클라이언트에 응답할 결과 객체를 저장할 변수입니다.

        // mode가 "store"인 경우, Google ID 정보를 저장합니다.
        if (mode === "store") {
          // 요청 본문에서 필요한 정보를 equalJson 메서드로 깊은 복사한 후 추출합니다.
          const { proid, cliid, desid, pid, zipIdDesigner, zipIdClient } = equalJson(req.body);

          // Google ID 정보를 담은 JSON 객체를 생성합니다.
          json = {
            proid, // 프로젝트 ID
            cliid, // 클라이언트 ID
            desid, // 디자이너 ID
            pid, // 포트폴리오 ID
            date: new Date(), // 현재 날짜
            google: {
              designer: zipIdDesigner, // 디자이너의 Google ID
              client: zipIdClient, // 클라이언트의 Google ID
              original: zipIdDesigner, // 원본 ID
              watermark: zipIdClient, // 워터마크 ID
            }
          };

          // 동일한 proid를 가진 기존 데이터가 있는지 조회합니다.
          rows = await back.mongoRead(collection, { proid }, { selfMongo });
          if (rows.length > 0) {
            // 기존 데이터가 있을 경우 삭제합니다.
            await back.mongoDelete(collection, { proid }, { selfMongo });
          }
          // 새로운 Google ID 정보를 MongoDB에 저장합니다.
          await back.mongoCreate(collection, json, { selfMongo });

          // 저장 완료 메시지를 설정합니다.
          resultObj = { message: "done" };

        // mode가 "get"인 경우, Google ID 정보를 조회합니다.
        } else if (mode === "get") {

          // 요청 본문에서 proid를 equalJson 메서드로 깊은 복사한 후 추출합니다.
          const { proid } = equalJson(req.body);

          // 지정된 proid에 해당하는 데이터를 MongoDB에서 조회합니다.
          rows = await back.mongoRead(collection, { proid }, { selfMongo });
          if (rows.length > 0) {
            // 조회된 데이터를 날짜 기준으로 내림차순 정렬하여 최신 데이터를 선택합니다.
            rows.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });
            // 최신 데이터를 resultObj에 저장합니다.
            resultObj = { data: rows[0] };
          } else {
            // 조회된 데이터가 없는 경우, null을 resultObj에 저장합니다.
            resultObj = { data: null };
          }

        // mode가 "store" 또는 "get"이 아닌 경우, 예외를 발생시킵니다.
        } else {
          throw new Error("invalid post");
        }

        // 결과 객체를 JSON 형식으로 클라이언트에 응답합니다.
        res.send(JSON.stringify(resultObj));

      } catch (e) {
        // 오류가 발생한 경우, logger.error 메서드를 통해 오류를 로깅합니다.
        logger.error(e, req).catch((e) => { console.log(e); });

        // 오류 메시지를 JSON 형식으로 클라이언트에 응답합니다.
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /storeHoliday
     * @description 공휴일 정보를 외부 API를 통해 조회하여 MongoDB에 저장하는 라우터입니다.
     * 클라이언트의 요청에 따라 공휴일 데이터를 가져와 저장합니다.
     * @param {Object} req - 클라이언트 요청 객체입니다.
     * @param {Object} res - 서버 응답 객체입니다.
     */
    router.post([ "/storeHoliday" ], async function (req, res) {

      // 응답 헤더를 설정하여 클라이언트의 요청에 대해 JSON 형식으로 응답합니다.
      res.set({
        "Content-Type": "application/json", // 응답의 콘텐츠 타입을 JSON으로 설정합니다.
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정합니다.
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 설정합니다.
      });

      try {
        const selfMongo = instance.mongolocal; // 로컬 MongoDB 연결 객체를 selfMongo 변수에 할당합니다.
        const collection = "holidayList"; // 공휴일 데이터를 저장할 컬렉션 이름을 설정합니다.
        const keyConst = "holiday_"; // 공휴일 데이터를 구분할 키의 접두사를 설정합니다.

        /**
         * @function returnHolidayArr
         * @description 외부 API를 호출하여 공휴일 데이터를 가져오는 비동기 함수입니다.
         * @returns {Array|null} - 공휴일 날짜 배열을 반환하거나 오류 발생 시 null을 반환합니다.
         */
        const returnHolidayArr = async () => {
          try {
            const endPoint0 = "http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo"; // 특정 공휴일 정보를 가져오는 API 엔드포인트
            const endPoint1 = "http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo"; // 공휴일 정보를 가져오는 API 엔드포인트
            const key = "7VuaiHtcKan1rHFT1huoXCufMJYJnmRl0Y5j5E5dyNnrDu2+bNqF2CzcA6M9RZ6n7GTO9xV74nwHxkNv9bkn/Q=="; // API 키
            const totalRange = 3; // 공휴일 데이터를 조회할 연도의 범위 (현재 연도부터 3년)
            let result; // API 호출 결과를 저장할 변수
            let holidayArr; // 공휴일 날짜를 저장할 배열
            let thisYear; // 현재 연도를 저장할 변수
      
            thisYear = (new Date()).getFullYear(); // 현재 연도를 thisYear 변수에 할당합니다.
            holidayArr = []; // 공휴일 날짜를 저장할 배열을 초기화합니다.
      
            // 지정된 연도 범위에 대해 API를 호출하여 공휴일 데이터를 수집합니다.
            for (let i = 0; i < totalRange; i++) {
              // 공휴일 정보를 가져오는 API 호출
              result = await requestSystem(endPoint0, {
                solYear: (thisYear + i), // 조회할 연도
                ServiceKey: key, // API 서비스 키
                _type: "json", // 응답 형식을 JSON으로 지정
                numOfRows: 300, // 한 번에 조회할 최대 행 수
              }, { method: "get" });

              // 응답 데이터에서 공휴일 정보를 추출하여 배열에 저장합니다.
              for (let { isHoliday, locdate } of result.data.response.body.items.item) {
                if (/Y/gi.test(isHoliday)) { // isHoliday 값이 'Y'인 경우 공휴일로 간주
                  holidayArr.push(locdate); // 공휴일 날짜를 배열에 추가
                }
              }

              // 휴일 정보를 가져오는 API 호출
              result = await requestSystem(endPoint1, {
                solYear: (thisYear + i), // 조회할 연도
                ServiceKey: key, // API 서비스 키
                _type: "json", // 응답 형식을 JSON으로 지정
                numOfRows: 300, // 한 번에 조회할 최대 행 수
              }, { method: "get" });

              // 응답 데이터에서 공휴일 정보를 추출하여 배열에 저장합니다.
              for (let { isHoliday, locdate } of result.data.response.body.items.item) {
                if (/Y/gi.test(isHoliday)) { // isHoliday 값이 'Y'인 경우 공휴일로 간주
                  holidayArr.push(locdate); // 공휴일 날짜를 배열에 추가
                }
              }
            }
      
            // 중복된 날짜를 제거하고 숫자 형식에서 문자열 형식으로 변환하여 정렬합니다.
            holidayArr = [ ...new Set(holidayArr.map((num) => { return String(num) })) ].map((str) => { return Number(str) });
            holidayArr.sort((a, b) => { return a - b }); // 날짜를 오름차순으로 정렬
            holidayArr = holidayArr.map((num) => { return String(num).slice(0, 4) + "-" + String(num).slice(4, 6) + "-" + String(num).slice(6, 8) }) // YYYY-MM-DD 형식으로 변환
      
            return holidayArr; // 공휴일 날짜 배열을 반환합니다.
          } catch (e) {
            console.log(e); // 오류가 발생하면 콘솔에 출력합니다.
            return null; // 오류 발생 시 null을 반환합니다.
          }
        }

        // 비동기 함수로 공휴일 데이터를 가져오고 MongoDB에 저장하는 작업을 수행합니다.
        (async () => {
          try {
            let resultHolidayArr; // API를 통해 가져온 공휴일 데이터를 저장할 변수
            let safeNum; // 재시도 횟수를 저장할 변수
            let resultJson; // MongoDB에 저장할 JSON 객체
            let key; // MongoDB에 저장할 데이터의 키
            let thisDateString; // 현재 날짜를 문자열 형식으로 저장할 변수
            let thisDateStringArr; // 날짜 문자열을 분리하여 배열로 저장할 변수
            let rows; // MongoDB에서 조회한 결과를 저장할 변수

            resultHolidayArr = await returnHolidayArr(); // 공휴일 데이터를 가져옵니다.
            console.log(resultHolidayArr);
            safeNum = 0; // 재시도 횟수를 초기화합니다.
            
            // 공휴일 데이터를 가져오는 데 실패한 경우 최대 100회까지 재시도합니다.
            while (!Array.isArray(resultHolidayArr)) {
              if (safeNum > 100) {
                break; // 재시도 횟수가 100회를 초과하면 루프를 종료합니다.
              }
              await sleep(1000); // 1초 대기 후 다시 시도합니다.
              resultHolidayArr = await returnHolidayArr(); // 공휴일 데이터를 다시 가져옵니다.
              console.log(resultHolidayArr);
              safeNum++;
            }

            thisDateString = dateToString(new Date()); // 현재 날짜를 문자열 형식으로 변환합니다.
            thisDateStringArr = thisDateString.split("-"); // 변환된 문자열을 '-' 기준으로 분리합니다.

            key = keyConst + thisDateStringArr[0] + thisDateStringArr[1]; // 'holiday_' 접두사와 함께 키를 생성합니다.

            // MongoDB에 저장할 JSON 객체를 생성합니다.
            resultJson = {
              key, // 생성된 키를 할당합니다.
              date: new Date(), // 현재 날짜를 저장합니다.
              data: resultHolidayArr, // 공휴일 데이터를 저장합니다.
            };

            // 동일한 키를 가진 데이터가 이미 존재하는지 확인합니다.
            rows = await back.mongoRead(collection, { key }, { selfMongo });
            if (rows.length !== 0) {
              // 기존 데이터가 존재하면 삭제합니다.
              await back.mongoDelete(collection, { key }, { selfMongo });
            }
            // 새로운 공휴일 데이터를 MongoDB에 저장합니다.
            await back.mongoCreate(collection, resultJson, { selfMongo });

            return true; // 작업이 성공적으로 완료되었음을 반환합니다.
          } catch (e) {
            // 오류가 발생하면 로깅하고 false를 반환합니다.
            logger.error(e, req).catch((e) => { console.log(e); });
            return false;
          }
        })().catch((err) => {
          // 비동기 함수 내에서 발생한 오류를 처리합니다.
          logger.error(err, req).catch((e) => { console.log(e); });
        });

        // 클라이언트에 'will do'라는 메시지를 JSON 형식으로 응답합니다.
        res.send(JSON.stringify({ message: "will do" }));

      } catch (e) {
        // 오류가 발생한 경우, logger.error 메서드를 통해 오류를 로깅합니다.
        logger.error(e, req).catch((e) => { console.log(e); });

        // 오류 메시지를 JSON 형식으로 클라이언트에 응답합니다.
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @route POST /getHoliday
     * @description MongoDB에서 공휴일 데이터를 조회하여 클라이언트에게 반환하는 라우터입니다.
     * 클라이언트의 요청에 따라 최근 1년 동안의 공휴일 데이터를 조회합니다.
     * @param {Object} req - 클라이언트 요청 객체입니다.
     * @param {Object} res - 서버 응답 객체입니다.
     */
    router.post([ "/getHoliday" ], async function (req, res) {

      // 응답 헤더를 설정하여 클라이언트의 요청에 대해 JSON 형식으로 응답합니다.
      res.set({
        "Content-Type": "application/json", // 응답의 콘텐츠 타입을 JSON으로 설정합니다.
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정합니다.
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 설정합니다.
      });

      try {
        const selfMongo = instance.mongolocal; // 로컬 MongoDB 연결 객체를 selfMongo 변수에 할당합니다.
        const collection = "holidayList"; // 공휴일 데이터를 저장한 컬렉션 이름을 설정합니다.
        let rows; // MongoDB에서 조회한 결과를 저장할 변수입니다.
        let oneYearsAgo; // 1년 전 날짜를 저장할 변수입니다.

        oneYearsAgo = new Date(); // 현재 날짜를 가져옵니다.
        oneYearsAgo.setFullYear(oneYearsAgo.getFullYear() - 1); // 현재 날짜에서 1년 전 날짜를 계산합니다.

        // MongoDB에서 1년 이내에 저장된 공휴일 데이터를 조회합니다.
        rows = await back.mongoRead(collection, { date: { $gte: oneYearsAgo } }, { selfMongo });

        // 조회한 데이터를 날짜 기준으로 내림차순 정렬합니다.
        rows.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });

        // 조회된 데이터가 있는지 확인합니다.
        if (rows.length > 0) {
          // 첫 번째 데이터의 공휴일 정보가 null인지 확인합니다.
          if (rows[0].data === null) {
            // null인 경우, 데이터가 배열인 항목을 찾아 클라이언트에 응답합니다.
            if (rows.find((o) => { return Array.isArray(o.data) }) !== undefined) {
              res.send(JSON.stringify({ holiday: rows.find((o) => { return Array.isArray(o.data) }).data }));
            } else {
              // 배열인 데이터가 없으면 데이터 오류로 간주하고 예외를 발생시킵니다.
              throw new Error("data error");
            }
          } else {
            // 공휴일 정보가 null이 아니면 해당 데이터를 클라이언트에 응답합니다.
            res.send(JSON.stringify({ holiday: rows[0].data }));
          }
        } else {
          // 조회된 데이터가 없는 경우, 빈 배열을 클라이언트에 응답합니다.
          res.send(JSON.stringify({ holiday: [] }));
        }

      } catch (e) {
        // 오류가 발생한 경우, logger.error 메서드를 통해 오류를 로깅합니다.
        logger.error(e, req).catch((e) => { console.log(e); });

        // 오류 메시지를 JSON 형식으로 클라이언트에 응답합니다.
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @route POST /foreContents
     * @description 다양한 모드에 따라 콘텐츠 데이터를 조회하거나 예외 처리를 관리하는 라우터입니다.
     * 클라이언트의 요청에 따라 foreContents 컬렉션에서 데이터를 조회하거나 업데이트합니다.
     * @param {Object} req - 클라이언트 요청 객체입니다.
     * @param {Object} res - 서버 응답 객체입니다.
     */
    router.post([ "/foreContents" ], async function (req, res) {

      // 응답 헤더를 설정하여 클라이언트의 요청에 대해 JSON 형식으로 응답합니다.
      res.set({
        "Content-Type": "application/json", // 응답의 콘텐츠 타입을 JSON으로 설정합니다.
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정합니다.
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 설정합니다.
      });

      try {
        // 클라이언트 요청 본문에 mode가 정의되지 않은 경우 예외를 발생시킵니다.
        if (req.body.mode === undefined) {
          throw new Error("invalid post"); // 유효하지 않은 POST 요청에 대한 오류 메시지.
        }

        // equalJson 메서드를 사용하여 요청 본문을 깊은 복사한 후, mode를 추출합니다.
        // equalJson은 JSON.parse의 업그레이드된 버전으로, 객체를 깊은 복사할 때 사용됩니다.
        const { mode } = equalJson(req.body);

        const selfMongo = instance.mongolocal; // 로컬 MongoDB 연결 객체를 selfMongo 변수에 할당합니다.
        const collection = "foreContents"; // foreContents 데이터를 저장한 컬렉션 이름을 설정합니다.
        let rows; // MongoDB에서 조회한 결과를 저장할 변수입니다.
        let desid; // 디자이너 ID를 저장할 변수입니다.

        // mode가 "get"인 경우, foreContents 데이터를 조회합니다.
        if (mode === "get") {
          // 클라이언트 요청에 desid가 정의되지 않은 경우 모든 foreContents 데이터를 조회합니다.
          if (req.body.desid === undefined) {
            rows = await back.mongoRead(collection, {}, { selfMongo });
          } else {
            // desid가 정의된 경우 해당 desid에 해당하는 데이터를 조회합니다.
            desid = req.body.desid;
            rows = await back.mongoRead(collection, { desid }, { selfMongo });
          }
          // 조회된 데이터를 클라이언트에 JSON 형식으로 응답합니다.
          res.send(JSON.stringify(rows));

        // mode가 "exceptionControl"인 경우, 특정 콘텐츠의 예외 처리 상태를 업데이트합니다.
        } else if (mode === "exceptionControl") {
          // 클라이언트 요청에 pid 또는 control이 정의되지 않은 경우 예외를 발생시킵니다.
          if (req.body.pid === undefined || req.body.control === undefined) {
            throw new Error("invalid post");
          }
          // equalJson 메서드를 사용하여 요청 본문에서 pid와 control을 깊은 복사한 후 추출합니다.
          const { pid, control } = equalJson(req.body);
          // 지정된 pid에 해당하는 콘텐츠의 예외 처리 상태를 업데이트합니다.
          await back.mongoUpdate(collection, [ { pid }, { exception: (control === "register") } ], { selfMongo });
          // 성공 메시지를 클라이언트에 JSON 형식으로 응답합니다.
          res.send(JSON.stringify({ message: "done" }));

        // mode가 "exceptionList"인 경우, 예외 처리된 콘텐츠 목록을 조회합니다.
        } else if (mode === "exceptionList") {
          // foreContents 컬렉션에서 모든 데이터를 조회합니다.
          rows = await back.mongoRead(collection, {}, { selfMongo });
          // 조회된 데이터 중 exception이 true인 항목만 필터링합니다.
          rows = rows.filter((o) => { return o.exception === true });
          // 클라이언트 요청에 type이 "string"인 경우, 예외 처리된 콘텐츠의 pid 목록을 응답합니다.
          if (req.body.type === "string") {
            res.send(JSON.stringify(rows.map((o) => { return o.pid })));
          } else {
            // 그렇지 않은 경우, 예외 처리된 전체 데이터를 클라이언트에 응답합니다.
            res.send(JSON.stringify(rows));
          }

        // mode가 정의되지 않거나 유효하지 않은 경우 예외를 발생시킵니다.
        } else {
          throw new Error("invalid mode");
        }

      } catch (e) {
        // 오류가 발생한 경우, logger.error 메서드를 통해 오류를 로깅합니다.
        logger.error(e, req).catch((e) => { console.log(e); });

        // 오류 메시지를 JSON 형식으로 클라이언트에 응답합니다.
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @route POST /metaComplex
     * @description 메타 데이터를 복합적으로 처리하는 라우터입니다. 클라이언트의 요청에 따라 Meta, Naver, Google 관련 작업을 수행합니다.
     * @param {Object} req - 클라이언트 요청 객체입니다.
     * @param {Object} res - 서버 응답 객체입니다.
     */
    router.post([ "/metaComplex" ], async function (req, res) {

      // 응답 헤더를 설정하여 클라이언트의 요청에 대해 JSON 형식으로 응답합니다.
      res.set({
        "Content-Type": "application/json", // 응답의 콘텐츠 타입을 JSON으로 설정합니다.
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정합니다.
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 설정합니다.
      });

      try {
        const selfMongo = instance.mongolocal; // 로컬 MongoDB 연결 객체를 selfMongo 변수에 할당합니다.
        const defaultDay = 3; // 기본적으로 3일 동안의 데이터를 처리하도록 설정합니다.
        
        // 클라이언트가 요청한 기간(day)을 확인하고, 유효하지 않은 경우 기본 값을 사용합니다.
        const dayConst = req.body.day === undefined ? defaultDay : (Number.isNaN(Number(req.body.day)) ? defaultDay : Number(req.body.day));
        let boo; // 작업 성공 여부를 저장할 변수입니다.

        // 비동기 함수를 통해 Meta, Naver, Google 데이터를 순차적으로 처리합니다.
        (async () => {
          try {
            // Meta 데이터를 처리하는 메서드를 호출합니다.
            await meta.metaComplex(selfMongo, 2, logger);
            await sleep(500); // 500ms 대기 후 다음 작업을 수행합니다.

            // Naver 데이터를 처리하는 메서드를 호출합니다.
            boo = await naver.naverComplex(selfMongo, dayConst, logger);
            
            // 만약 Naver 작업이 실패할 경우 최대 3번 재시도합니다.
            if (!boo) {
              await sleep(3000); // 3초 대기 후 재시도
              boo = await naver.naverComplex(selfMongo, dayConst, logger);
              if (!boo) {
                await sleep(3000); // 3초 대기 후 재시도
                boo = await naver.naverComplex(selfMongo, dayConst, logger);
                if (!boo) {
                  await sleep(3000); // 3초 대기 후 마지막 재시도
                  await naver.naverComplex(selfMongo, dayConst, logger);
                }
              }
            }

            await sleep(500); // 500ms 대기 후 다음 작업을 수행합니다.

            // Google 데이터를 처리하는 메서드를 호출합니다.
            boo = await google.googleComplex(selfMongo, dayConst, logger);
            
            // 만약 Google 작업이 실패할 경우 최대 3번 재시도합니다.
            if (!boo) {
              await sleep(3000); // 3초 대기 후 재시도
              boo = await google.googleComplex(selfMongo, dayConst, logger);
              if (!boo) {
                await sleep(3000); // 3초 대기 후 재시도
                boo = await google.googleComplex(selfMongo, dayConst, logger);
                if (!boo) {
                  await sleep(3000); // 3초 대기 후 마지막 재시도
                  await google.googleComplex(selfMongo, dayConst, logger);
                }
              }
            }

            await sleep(500); // 모든 작업이 끝난 후 500ms 대기합니다.

          } catch (e) {
            // 오류가 발생한 경우, logger.error 메서드를 통해 오류를 로깅하고 false를 반환합니다.
            logger.error(e, req).catch((e) => { console.log(e); });
            return false;
          }
        })().catch((err) => {
          // 비동기 함수 내에서 발생한 오류를 처리합니다.
          logger.error(err, req).catch((e) => { console.log(e); });
        });

        // 클라이언트에 'will do'라는 메시지를 JSON 형식으로 응답합니다.
        res.send(JSON.stringify({ message: "will do" }));

      } catch (e) {
        // 오류가 발생한 경우, logger.error 메서드를 통해 오류를 로깅합니다.
        logger.error(e, req).catch((e) => { console.log(e); });

        // 오류 메시지를 JSON 형식으로 클라이언트에 응답합니다.
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @route POST /metaInstant
     * @description 인스턴스 문의와 관련된 메타 데이터를 동기화하고, 이를 클라이언트에 전송하는 라우터입니다.
     * 클라이언트의 요청에 따라 지정된 기간 동안의 인스턴스 문의 데이터를 처리합니다.
     * @param {Object} req - 클라이언트 요청 객체입니다.
     * @param {Object} res - 서버 응답 객체입니다.
     */
    router.post([ "/metaInstant" ], async function (req, res) {

      // 응답 헤더를 설정하여 클라이언트의 요청에 대해 JSON 형식으로 응답합니다.
      res.set({
        "Content-Type": "application/json", // 응답의 콘텐츠 타입을 JSON으로 설정합니다.
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정합니다.
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 설정합니다.
      });

      try {
        const selfMongo = instance.mongolocal; // 로컬 MongoDB 연결 객체를 selfMongo 변수에 할당합니다.
        const selfCoreMongo = instance.mongo; // 메인 MongoDB 연결 객체를 selfCoreMongo 변수에 할당합니다.
        const defaultDay = 3; // 기본적으로 3일 동안의 데이터를 처리하도록 설정합니다.
        
        // 클라이언트가 요청한 기간(day)을 확인하고, 유효하지 않은 경우 기본 값을 사용합니다.
        const dayConst = req.body.day === undefined ? defaultDay : (Number.isNaN(Number(req.body.day)) ? defaultDay : Number(req.body.day));
        let boo; // 작업 성공 여부를 저장할 변수입니다.

        // 비동기 함수를 통해 인스턴스 문의 데이터를 동기화하고, 이를 클라이언트로 전송하는 작업을 수행합니다.
        (async () => {
          try {
            // 인스턴스 문의 양식을 동기화하는 메서드를 호출합니다.
            boo = await meta.syncMetaInstantForm(selfMongo, dayConst, logger);
            
            // 동기화 작업이 실패할 경우, 최대 3번까지 재시도합니다.
            if (!boo) {
              await sleep(3000); // 3초 대기 후 재시도
              boo = await meta.syncMetaInstantForm(selfMongo, dayConst, logger);
              if (!boo) {
                await sleep(60 * 1000); // 60초 대기 후 재시도
                boo = await meta.syncMetaInstantForm(selfMongo, dayConst, logger);
                if (!boo) {
                  await sleep(60 * 1000); // 60초 대기 후 마지막 재시도
                  await meta.syncMetaInstantForm(selfMongo, dayConst, logger);
                }
              }
            }

            // 동기화 작업이 성공하면 클라이언트로 데이터를 전송하는 작업을 수행합니다.
            if (boo) {
              await sleep(3000); // 3초 대기 후 다음 작업 수행
              await meta.metaInstantToClient(selfMongo, selfCoreMongo, logger);
            }

          } catch (e) {
            // 오류가 발생한 경우, logger.error 메서드를 통해 오류를 로깅하고 false를 반환합니다.
            logger.error(e, req).catch((e) => { console.log(e); });
            return false;
          }
        })().catch((err) => {
          // 비동기 함수 내에서 발생한 오류를 처리합니다.
          logger.error(err, req).catch((e) => { console.log(e); });
        });

        // 클라이언트에 'will do'라는 메시지를 JSON 형식으로 응답합니다.
        res.send(JSON.stringify({ message: "will do" }));

      } catch (e) {
        // 오류가 발생한 경우, logger.error 메서드를 통해 오류를 로깅합니다.
        logger.error(e, req).catch((e) => { console.log(e); });

        // 오류 메시지를 JSON 형식으로 클라이언트에 응답합니다.
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @route POST /getAdsComplex
     * @description 주어진 기간 동안의 광고 데이터를 조회하여 클라이언트에 반환하는 라우터입니다.
     * 클라이언트가 요청한 시작일과 종료일 사이의 Meta, Naver, Google, Kakao 광고 데이터를 MongoDB에서 조회합니다.
     * @param {Object} req - 클라이언트 요청 객체입니다.
     * @param {Object} res - 서버 응답 객체입니다.
     */
    router.post([ "/getAdsComplex" ], async function (req, res) {

      // 응답 헤더를 설정하여 클라이언트의 요청에 대해 JSON 형식으로 응답합니다.
      res.set({
        "Content-Type": "application/json", // 응답의 콘텐츠 타입을 JSON으로 설정합니다.
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정합니다.
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 설정합니다.
      });

      try {
        // 클라이언트 요청 본문에 startDate와 endDate가 정의되지 않은 경우 예외를 발생시킵니다.
        if (req.body.startDate === undefined || req.body.endDate === undefined) {
          throw new Error("invalid post"); // 유효하지 않은 POST 요청에 대한 오류 메시지.
        }

        // equalJson 메서드를 사용하여 요청 본문을 깊은 복사한 후, startDate와 endDate를 추출합니다.
        // equalJson은 JSON.parse의 업그레이드된 버전으로, 객체를 깊은 복사할 때 사용됩니다.
        const { startDate, endDate } = equalJson(req.body);
        const selfMongo = instance.mongolocal; // 로컬 MongoDB 연결 객체를 selfMongo 변수에 할당합니다.
        
        // 광고 데이터를 저장한 컬렉션 리스트를 정의합니다.
        const collectionList = [
          "metaComplex",
          "naverComplex",
          "googleComplex",
          "kakaoComplex",
        ];
        
        let resultObj = {}; // 최종적으로 클라이언트에 응답할 결과 객체를 초기화합니다.
        let startDateCopied; // 클라이언트에서 전달받은 startDate를 복사하여 저장할 변수입니다.
        let endDateCopied; // 클라이언트에서 전달받은 endDate를 복사하여 저장할 변수입니다.
        let start, end; // 검색할 기간의 시작일과 종료일을 저장할 변수입니다.
        let rows; // MongoDB에서 조회한 데이터를 저장할 변수입니다.
        let whereQuery; // MongoDB에서 데이터를 조회할 때 사용할 쿼리 조건을 저장할 변수입니다.

        // startDate를 복사하여 Date 객체로 변환한 후, 시작일의 시간을 00:00:00으로 설정합니다.
        startDateCopied = new Date(JSON.stringify(startDate).slice(1, -1));
        start = new Date(startDateCopied.getFullYear(), startDateCopied.getMonth(), startDateCopied.getDate(), 0, 0, 0);
        
        // endDate를 복사하여 Date 객체로 변환한 후, 종료일의 시간을 00:00:00으로 설정하고, 1일을 더해 실제 종료일의 끝을 나타냅니다.
        endDateCopied = new Date(JSON.stringify(endDate).slice(1, -1));
        end = new Date(endDateCopied.getFullYear(), endDateCopied.getMonth(), endDateCopied.getDate(), 0, 0, 0);
        end.setDate(end.getDate() + 1);

        // 검색할 기간을 기준으로 MongoDB 쿼리 조건을 설정합니다.
        whereQuery = {};
        whereQuery["date.from"] = {
          $gte: start, // 시작일보다 크거나 같은 데이터를 조회합니다.
          $lt: end, // 종료일보다 작은 데이터를 조회합니다.
        }

        // 각 광고 컬렉션(meta, naver, google, kakao)에 대해 데이터를 조회합니다.
        for (let collection of collectionList) {
          // 각 컬렉션에서 설정된 기간 동안의 데이터를 조회합니다.
          rows = await back.mongoRead(collection, whereQuery, { selfMongo });
          
          // 조회한 데이터를 equalJson 메서드로 깊은 복사한 후, 컬렉션 이름에서 'Complex'를 제거한 키로 resultObj에 저장합니다.
          resultObj[collection.replace(/Complex/g, '')] = equalJson(JSON.stringify(rows));
          
          // 조회한 데이터를 날짜 기준으로 내림차순 정렬합니다.
          resultObj[collection.replace(/Complex/g, '')].sort((a, b) => {
            return b.date.from.valueOf() - a.date.from.valueOf();
          });
        }

        // 최종 결과 객체를 클라이언트에 JSON 형식으로 응답합니다.
        res.send(JSON.stringify(resultObj));
      } catch (e) {
        // 오류가 발생한 경우, logger.error 메서드를 통해 오류를 로깅합니다.
        logger.error(e, req).catch((e) => { console.log(e); });

        // 오류 메시지를 JSON 형식으로 클라이언트에 응답합니다.
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @route POST /getSnsComplex
     * @description 주어진 기간 동안의 SNS 데이터를 조회하여 클라이언트에 반환하는 라우터입니다.
     * 클라이언트가 요청한 시작일과 종료일 사이의 Meta와 Google SNS 데이터를 MongoDB에서 조회합니다.
     * @param {Object} req - 클라이언트 요청 객체입니다.
     * @param {Object} res - 서버 응답 객체입니다.
     */
    router.post([ "/getSnsComplex" ], async function (req, res) {

      // 응답 헤더를 설정하여 클라이언트의 요청에 대해 JSON 형식으로 응답합니다.
      res.set({
        "Content-Type": "application/json", // 응답의 콘텐츠 타입을 JSON으로 설정합니다.
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정합니다.
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 설정합니다.
      });

      try {
        // 클라이언트 요청 본문에 startDate와 endDate가 정의되지 않은 경우 예외를 발생시킵니다.
        if (req.body.startDate === undefined || req.body.endDate === undefined) {
          throw new Error("invalid post"); // 유효하지 않은 POST 요청에 대한 오류 메시지.
        }

        // equalJson 메서드를 사용하여 요청 본문을 깊은 복사한 후, startDate와 endDate를 추출합니다.
        // equalJson은 JSON.parse의 업그레이드된 버전으로, 객체를 깊은 복사할 때 사용됩니다.
        const { startDate, endDate } = equalJson(req.body);
        const selfMongo = instance.mongolocal; // 로컬 MongoDB 연결 객체를 selfMongo 변수에 할당합니다.
        
        // SNS 데이터를 저장한 컬렉션 리스트를 정의합니다.
        const collectionList = [
          "metaComplex",
          "googleComplex",
        ];
        
        let resultObj = {}; // 최종적으로 클라이언트에 응답할 결과 객체를 초기화합니다.
        let startDateCopied; // 클라이언트에서 전달받은 startDate를 복사하여 저장할 변수입니다.
        let endDateCopied; // 클라이언트에서 전달받은 endDate를 복사하여 저장할 변수입니다.
        let start, end; // 검색할 기간의 시작일과 종료일을 저장할 변수입니다.
        let rows; // MongoDB에서 조회한 데이터를 저장할 변수입니다.
        let whereQuery; // MongoDB에서 데이터를 조회할 때 사용할 쿼리 조건을 저장할 변수입니다.

        // startDate를 복사하여 Date 객체로 변환한 후, 시작일의 시간을 00:00:00으로 설정합니다.
        startDateCopied = new Date(JSON.stringify(startDate).slice(1, -1));
        start = new Date(startDateCopied.getFullYear(), startDateCopied.getMonth(), startDateCopied.getDate(), 0, 0, 0);
        
        // endDate를 복사하여 Date 객체로 변환한 후, 종료일의 시간을 00:00:00으로 설정하고, 1일을 더해 실제 종료일의 끝을 나타냅니다.
        endDateCopied = new Date(JSON.stringify(endDate).slice(1, -1));
        end = new Date(endDateCopied.getFullYear(), endDateCopied.getMonth(), endDateCopied.getDate(), 0, 0, 0);
        end.setDate(end.getDate() + 1);

        // 검색할 기간을 기준으로 MongoDB 쿼리 조건을 설정합니다.
        whereQuery = {};
        whereQuery["date.from"] = {
          $gte: start, // 시작일보다 크거나 같은 데이터를 조회합니다.
          $lt: end, // 종료일보다 작은 데이터를 조회합니다.
        }

        // 각 SNS 컬렉션(meta, google)에 대해 데이터를 조회합니다.
        for (let collection of collectionList) {
          // 각 컬렉션에서 설정된 기간 동안의 데이터를 조회합니다.
          rows = await back.mongoRead(collection, whereQuery, { selfMongo });
          
          // 조회한 데이터를 equalJson 메서드로 깊은 복사한 후, 컬렉션 이름에서 'Complex'를 제거한 키로 resultObj에 저장합니다.
          resultObj[collection.replace(/Complex/g, '')] = equalJson(JSON.stringify(rows));
          
          // 조회한 데이터를 날짜 기준으로 내림차순 정렬합니다.
          resultObj[collection.replace(/Complex/g, '')].sort((a, b) => {
            return b.date.from.valueOf() - a.date.from.valueOf();
          });
        }

        // 최종 결과 객체를 클라이언트에 JSON 형식으로 응답합니다.
        res.send(JSON.stringify(resultObj));
      } catch (e) {
        // 오류가 발생한 경우, logger.error 메서드를 통해 오류를 로깅합니다.
        logger.error(e, req).catch((e) => { console.log(e); });

        // 오류 메시지를 JSON 형식으로 클라이언트에 응답합니다.
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @route POST /evaluationSubmit
     * @description 홈리에종 고객 서비스 평가를 제출하는 라우터입니다. 클라이언트가 제공한 데이터를 기반으로 평가 내용을 MongoDB에 저장하고, 해당 평가 내용을 다른 시스템과 동기화합니다.
     * @param {Object} req - 클라이언트 요청 객체입니다.
     * @param {Object} res - 서버 응답 객체입니다.
     */
    router.post([ "/evaluationSubmit" ], async function (req, res) {

      // 응답 헤더를 설정하여 클라이언트의 요청에 대해 JSON 형식으로 응답합니다.
      res.set({
        "Content-Type": "application/json", // 응답의 콘텐츠 타입을 JSON으로 설정합니다.
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정합니다.
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 설정합니다.
      });

      try {
        // 필수 필드가 누락된 경우 예외를 발생시킵니다.
        if (req.body.cliid === undefined || req.body.proid === undefined || req.body.desid === undefined || req.body.map === undefined) {
          throw new Error("invalid post"); // 유효하지 않은 POST 요청에 대한 오류 메시지.
        }

        // equalJson 메서드를 사용하여 요청 본문을 깊은 복사한 후, 각 필드를 추출합니다.
        const { cliid, proid, desid, map } = equalJson(req.body);
        const selfMongo = instance.mongolocal; // 로컬 MongoDB 연결 객체를 selfMongo 변수에 할당합니다.
        const selfCoreMongo = instance.mongo; // 메인 MongoDB 연결 객체를 selfCoreMongo 변수에 할당합니다.
        const collection = "clientEvaluation"; // 클라이언트 평가 데이터를 저장할 컬렉션 이름을 정의합니다.
        
        let constructAmount, constructPeriod, totalAmount, stylingAmount, furniture, productList, settingPeriod;
        let compliance, designSatisfaction, feedbackSatisfaction, operationSatisfaction; // 평가 항목을 저장할 변수들을 정의합니다.
        let json, rows, thisClient; // 평가 데이터를 저장할 JSON 객체 및 관련 변수를 정의합니다.
        
        // 클라이언트 정보를 조회하여 thisClient 변수에 저장합니다.
        [ thisClient ] = await back.mongoPick("client", [ { cliid }, { cliid: 1, name: 1 } ], { selfMongo: selfCoreMongo });
        
        // map에서 각 평가 항목의 값을 추출하거나 기본값을 설정합니다.
        constructAmount = map.find((o) => o.property === "constructamount")?.value || "";
        constructPeriod = map.find((o) => o.property === "constructperiod")?.value || "";
        totalAmount = map.find((o) => o.property === "totalamount")?.value || "";
        stylingAmount = map.find((o) => o.property === "stylingamount")?.value || "";
        furniture = map.find((o) => o.property === "furniture")?.value || "";
        productList = map.find((o) => o.property === "productlist")?.value || "";
        settingPeriod = map.find((o) => o.property === "settingperiod")?.value || "";
        compliance = map.find((o) => o.property === "compliance_ratio")?.value || 1;
        designSatisfaction = map.find((o) => o.property === "designsatisfaction")?.value || "";
        feedbackSatisfaction = map.find((o) => o.property === "feedbacksatisfaction")?.value || "";
        operationSatisfaction = map.find((o) => o.property === "operationsatisfaction")?.value || "";
        
        // 평가 데이터를 저장할 JSON 객체를 초기화합니다.
        json = {
          proid,
          desid,
          cliid,
          date: new Date(),
          construct: {
            level: 0,
            period: 0,
          },
          spend: {
            total: 0,
            construct: 0,
            styling: 0,
          },
          purchase: {
            list: 0,
            furniture: 0,
            period: 0,
            compliance: 0,
          },
          satisfaction: {
            design: 0,
            feedback: 0,
            operation: 0,
          }
        };
        
        // 시공 수준에 따라 construct.level 값을 설정합니다.
        if (/시공 없음/gi.test(constructAmount)) {
          json.construct.level = 0;
        } else if (/부분 시공/gi.test(constructAmount)) {
          json.construct.level = 1;
        } else if (/전체 시공/gi.test(constructAmount)) {
          json.construct.level = 2;
        } else {
          json.construct.level = 0;
        }
        
        // 시공 기간에 따라 construct.period 값을 설정합니다.
        if (/시공 없음/gi.test(constructPeriod)) {
          json.construct.period = 0;
        } else if (/2주 이하/gi.test(constructPeriod)) {
          json.construct.period = 14;
        } else if (/4주 이상/gi.test(constructPeriod)) {
          json.construct.period = 30;
        } else if (/[0-9]/gi.test(constructPeriod)) {
          json.construct.period = Math.ceil(constructPeriod.split("~").map((str) => Number(str.replace(/[^0-9]/gi, '')) * 7).reduce((acc, curr) => acc + curr, 0) / 2);
        } else {
          json.construct.period = 0;
        }
        
        // 총 예산에 따라 spend.total 값을 설정합니다.
        if (/1억/gi.test(totalAmount)) {
          json.spend.total = 100000000;
        } else if (/만원/gi.test(totalAmount)) {
          json.spend.total = Number(totalAmount.replace(/[^0-9]/gi, '')) * 10000;
        } else {
          json.spend.total = 0;
        }
        
        // 스타일링 예산에 따라 spend.styling 값을 설정합니다.
        if (/1억/gi.test(stylingAmount)) {
          json.spend.styling = 100000000;
        } else if (/만원/gi.test(stylingAmount)) {
          json.spend.styling = Number(stylingAmount.replace(/[^0-9]/gi, '')) * 10000;
        } else {
          json.spend.styling = 0;
        }
        
        // 시공 예산은 총 예산에서 스타일링 예산을 뺀 값으로 설정합니다.
        json.spend.construct = json.spend.total - json.spend.styling;
        
        // 제품 리스트 만족도에 따라 purchase.list 값을 설정합니다.
        if (/불만족/gi.test(productList)) {
          json.purchase.list = 0;
        } else if (/보통/gi.test(productList)) {
          json.purchase.list = 1;
        } else if (/만족/gi.test(productList)) {
          json.purchase.list = 2;
        } else {
          json.purchase.list = 1;
        }
        
        // 가구 재배치 상태에 따라 purchase.furniture 값을 설정합니다.
        if (/재배치/gi.test(furniture)) {
          json.purchase.furniture = 0;
        } else if (/일부/gi.test(furniture)) {
          json.purchase.furniture = 1;
        } else {
          json.purchase.furniture = 2;
        }
        
        // 세팅 기간에 따라 purchase.period 값을 설정합니다.
        if (/구매 없음/gi.test(settingPeriod)) {
          json.purchase.period = 0;
        } else if (/2주 이하/gi.test(settingPeriod)) {
          json.purchase.period = 14;
        } else if (/4주 이상/gi.test(settingPeriod)) {
          json.purchase.period = 30;
        } else if (/[0-9]/gi.test(constructPeriod)) {
          json.purchase.period = Math.ceil(settingPeriod.split("~").map((str) => Number(str.replace(/[^0-9]/gi, '')) * 7).reduce((acc, curr) => acc + curr, 0) / 2);
        } else {
          json.purchase.period = 0;
        }
        
        json.purchase.compliance = compliance; // 준수율 값을 설정합니다.
        
        // 디자인 만족도에 따라 satisfaction.design 값을 설정합니다.
        if (/불만족/gi.test(designSatisfaction)) {
          json.satisfaction.design = 0;
        } else if (/보통/gi.test(designSatisfaction)) {
          json.satisfaction.design = 1;
        } else if (/만족/gi.test(designSatisfaction)) {
          json.satisfaction.design = 2;
        } else {
          json.satisfaction.design = 1;
        }
        
        // 피드백 만족도에 따라 satisfaction.feedback 값을 설정합니다.
        if (/불만족/gi.test(feedbackSatisfaction)) {
          json.satisfaction.feedback = 0;
        } else if (/보통/gi.test(feedbackSatisfaction)) {
          json.satisfaction.feedback = 1;
        } else if (/만족/gi.test(feedbackSatisfaction)) {
          json.satisfaction.feedback = 2;
        } else {
          json.satisfaction.feedback = 1;
        }
        
        // 운영 만족도에 따라 satisfaction.operation 값을 설정합니다.
        if (/불만족/gi.test(operationSatisfaction)) {
          json.satisfaction.operation = 0;
        } else if (/보통/gi.test(operationSatisfaction)) {
          json.satisfaction.operation = 1;
        } else if (/만족/gi.test(operationSatisfaction)) {
          json.satisfaction.operation = 2;
        } else {
          json.satisfaction.operation = 1;
        }
        
        // 해당 프로젝트의 기존 평가 데이터를 삭제한 후 새로운 데이터를 저장합니다.
        rows = await back.mongoRead(collection, { proid }, { selfMongo });
        if (rows.length > 0) {
          await back.mongoDelete(collection, { proid }, { selfMongo });
        }
        await back.mongoCreate(collection, json, { selfMongo });
        
        // 평가 완료 메시지를 슬랙 채널로 전송하고, 평가 내용을 다른 시스템과 동기화합니다.
        messageSend({ text: thisClient.name + " 고객님께서 평가를 완료하였습니다!", channel: "#200_web", voice: false, fairy: false }).then(() => {
          return requestSystem("https://" + instance.address.officeinfo.ghost.host + ":3000/syncEvaluationContents", { message: "do it" }, { headers: { "Content-Type": "application/json" } });
        }).catch((err) => {
          logger.error(err, req).catch((e) => { console.log(e); });
        });
        
        // 클라이언트에 작업 완료 메시지를 JSON 형식으로 응답합니다.
        res.send(JSON.stringify({ message: "done" }));

      } catch (e) {
        // 오류가 발생한 경우, logger.error 메서드를 통해 오류를 로깅합니다.
        logger.error(e, req).catch((e) => { console.log(e); });

        // 오류 메시지를 JSON 형식으로 클라이언트에 응답합니다.
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @route POST /evaluationList
     * @description 홈리에종 고객 서비스 평가 데이터를 조회하는 라우터입니다. 요청 모드에 따라 특정 프로젝트의 평가를 조회하거나, 조건에 맞는 평가 목록을 반환합니다.
     * @param {Object} req - 클라이언트 요청 객체입니다.
     * @param {Object} res - 서버 응답 객체입니다.
     */
    router.post([ "/evaluationList" ], async function (req, res) {

      // 응답 헤더를 설정하여 클라이언트의 요청에 대해 JSON 형식으로 응답합니다.
      res.set({
        "Content-Type": "application/json", // 응답의 콘텐츠 타입을 JSON으로 설정합니다.
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정합니다.
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 설정합니다.
      });

      try {
        const selfMongo = instance.mongolocal; // 로컬 MongoDB 연결 객체를 selfMongo 변수에 할당합니다.
        const collection = "clientEvaluation"; // 클라이언트 평가 데이터를 저장한 컬렉션 이름을 정의합니다.
        
        // 요청 본문에서 mode를 추출합니다. mode가 정의되지 않은 경우 기본값으로 "pick"을 사용합니다.
        const mode = (req.body.mode === undefined ? "pick" : req.body.mode);
        let rows; // MongoDB에서 조회한 데이터를 저장할 변수입니다.
        let targetJson; // 최종적으로 클라이언트에 응답할 JSON 데이터를 저장할 변수입니다.

        // mode가 "pick"인 경우, 특정 프로젝트의 평가 데이터를 조회합니다.
        if (mode === "pick") {

          // 프로젝트 ID가 요청에 포함되지 않은 경우 예외를 발생시킵니다.
          if (req.body.proid === undefined) {
            throw new Error("invalid post"); // 유효하지 않은 POST 요청에 대한 오류 메시지.
          }
          const { proid } = equalJson(req.body); // equalJson 메서드를 사용하여 요청 본문에서 proid를 깊은 복사한 후 추출합니다.

          // 지정된 프로젝트 ID에 해당하는 평가 데이터를 MongoDB에서 조회합니다.
          rows = await back.mongoRead(collection, { proid }, { selfMongo });
          if (rows.length > 0) {
            // 조회된 데이터가 있을 경우, 최신 데이터를 정렬하여 가장 최근 데이터를 클라이언트에 응답합니다.
            rows.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });
            targetJson = equalJson(JSON.stringify(rows[0])); // 가장 최근 데이터를 깊은 복사하여 targetJson에 저장합니다.
            res.send(JSON.stringify({
              exist: true, // 평가 데이터가 존재함을 표시합니다.
              data: targetJson, // 평가 데이터를 응답합니다.
            }));
          } else {
            // 조회된 데이터가 없을 경우, 존재하지 않음을 표시합니다.
            res.send(JSON.stringify({
              exist: false, // 평가 데이터가 존재하지 않음을 표시합니다.
              data: null, // 데이터는 null로 설정합니다.
            }));
          }

        // mode가 "list"인 경우, 특정 조건에 맞는 평가 목록을 조회합니다.
        } else if (mode === "list") {

          // whereQuery가 요청에 포함되지 않은 경우 예외를 발생시킵니다.
          if (req.body.whereQuery === undefined) {
            throw new Error("invalid post"); // 유효하지 않은 POST 요청에 대한 오류 메시지.
          }
          const { whereQuery } = equalJson(req.body); // equalJson 메서드를 사용하여 요청 본문에서 whereQuery를 깊은 복사한 후 추출합니다.
          
          // 주어진 조건에 따라 평가 데이터를 MongoDB에서 조회합니다.
          rows = await back.mongoRead(collection, whereQuery, { selfMongo });
          targetJson = equalJson(JSON.stringify(rows)); // 조회된 데이터를 깊은 복사하여 targetJson에 저장합니다.
          
          // 평가 데이터에서 MongoDB의 고유 식별자인 _id 필드를 제거합니다.
          for (let obj of targetJson) {
            delete obj._id;
          }
          // 최종 결과를 클라이언트에 JSON 형식으로 응답합니다.
          res.send(JSON.stringify({ data: targetJson }));

        // mode가 정의되지 않거나 유효하지 않은 경우 예외를 발생시킵니다.
        } else {
          throw new Error("invalid mode"); // 유효하지 않은 mode에 대한 오류 메시지.
        }

      } catch (e) {
        // 오류가 발생한 경우, logger.error 메서드를 통해 오류를 로깅합니다.
        logger.error(e, req).catch((e) => { console.log(e); });

        // 오류 메시지를 JSON 형식으로 클라이언트에 응답합니다.
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @route POST /evaluationNotice
     * @description 홈리에종 고객 서비스 평가 알림을 처리하는 라우터입니다. 
     * 클라이언트의 요청에 따라 평가 알림을 생성하거나, 특정 기간의 평가 알림 목록을 조회합니다.
     * @param {Object} req - 클라이언트 요청 객체입니다.
     * @param {Object} res - 서버 응답 객체입니다.
     */
    router.post([ "/evaluationNotice" ], async function (req, res) {

      // 응답 헤더를 설정하여 클라이언트의 요청에 대해 JSON 형식으로 응답합니다.
      res.set({
        "Content-Type": "application/json", // 응답의 콘텐츠 타입을 JSON으로 설정합니다.
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정합니다.
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 설정합니다.
      });

      try {
        // 요청 본문에 mode가 정의되지 않은 경우 예외를 발생시킵니다.
        if (req.body.mode === undefined) {
          throw new Error("invalid post"); // 유효하지 않은 POST 요청에 대한 오류 메시지.
        }

        // equalJson 메서드를 사용하여 요청 본문을 깊은 복사한 후, mode를 추출합니다.
        const { mode } = equalJson(req.body);
        const selfMongo = instance.mongolocal; // 로컬 MongoDB 연결 객체를 selfMongo 변수에 할당합니다.
        const collection = "evaluationNotice"; // 평가 알림 데이터를 저장한 컬렉션 이름을 정의합니다.
        
        let json, rows, targetJson, thisJson; // 작업에 필요한 변수들을 정의합니다.

        // mode가 "send"인 경우, 평가 알림을 생성하거나 업데이트합니다.
        if (mode === "send") {

          // 필수 필드가 누락된 경우 예외를 발생시킵니다.
          if (req.body.proid === undefined || req.body.cliid === undefined || req.body.desid === undefined) {
            throw new Error("invalid post"); // 유효하지 않은 POST 요청에 대한 오류 메시지.
          }

          // equalJson 메서드를 사용하여 요청 본문에서 필요한 필드들을 깊은 복사한 후 추출합니다.
          const { cliid, desid, proid } = equalJson(req.body);
          
          // 새 평가 알림 데이터를 생성합니다.
          json = {
            proid, // 프로젝트 ID
            desid, // 디자이너 ID
            cliid, // 클라이언트 ID
            date: new Date(), // 현재 날짜를 저장합니다.
            history: [
              (new Date()), // 알림의 히스토리에 현재 날짜를 추가합니다.
            ]
          };

          // MongoDB에서 해당 프로젝트 ID에 대한 기존 평가 알림을 조회합니다.
          rows = await back.mongoRead(collection, { proid }, { selfMongo });
          
          // 기존 데이터가 있을 경우, 데이터를 업데이트합니다.
          if (rows.length > 0) {
            [ targetJson ] = rows; // 기존 데이터를 추출합니다.
            delete targetJson._id; // MongoDB의 고유 식별자 필드를 삭제합니다.
            thisJson = equalJson(JSON.stringify(targetJson)); // 데이터를 깊은 복사합니다.
            thisJson.date = new Date(); // 날짜를 현재 시간으로 업데이트합니다.
            thisJson.history.unshift(new Date()); // 히스토리에 새로운 날짜를 추가합니다.
            await back.mongoDelete(collection, { proid }, { selfMongo }); // 기존 데이터를 삭제합니다.
            await back.mongoCreate(collection, thisJson, { selfMongo }); // 업데이트된 데이터를 생성합니다.
          } else {
            // 기존 데이터가 없을 경우, 새 데이터를 생성합니다.
            await back.mongoCreate(collection, json, { selfMongo });
          }

          // 작업 완료 메시지를 클라이언트에 응답합니다.
          res.send(JSON.stringify({ message: "done" }));

        // mode가 "list"인 경우, 특정 기간의 평가 알림 목록을 조회합니다.
        } else if (mode === "list") {

          // 필수 필드가 누락된 경우 예외를 발생시킵니다.
          if (req.body.from === undefined) {
            throw new Error("invalid post"); // 유효하지 않은 POST 요청에 대한 오류 메시지.
          }

          // equalJson 메서드를 사용하여 요청 본문에서 from 필드를 깊은 복사한 후 추출합니다.
          const { from } = equalJson(req.body);
          
          // 지정된 기간 이후의 평가 알림 데이터를 MongoDB에서 조회합니다.
          rows = await back.mongoRead(collection, { date: { $gte: from } }, { selfMongo });
          
          // 조회된 데이터를 깊은 복사하여 targetJson에 저장합니다.
          targetJson = equalJson(JSON.stringify(rows));
          
          // 각 평가 알림 데이터에서 MongoDB의 고유 식별자인 _id 필드를 삭제합니다.
          for (let obj of targetJson) {
            delete obj._id;
          }

          // 조회된 평가 알림 목록을 클라이언트에 응답합니다.
          res.send(JSON.stringify({ data: targetJson }));

        // mode가 정의되지 않거나 유효하지 않은 경우 예외를 발생시킵니다.
        } else {
          throw new Error("invalid mode"); // 유효하지 않은 mode에 대한 오류 메시지.
        }

      } catch (e) {
        // 오류가 발생한 경우, logger.error 메서드를 통해 오류를 로깅합니다.
        logger.error(e, req).catch((e) => { console.log(e); });

        // 오류 메시지를 JSON 형식으로 클라이언트에 응답합니다.
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @route POST /getAllContents
     * @description 클라이언트가 요청한 조건에 따라 프로젝트, 디자이너, 클라이언트 등의 관련된 모든 콘텐츠 데이터를 조회하여 반환하는 라우터입니다.
     * 모드에 따라 전체 데이터를 조회하거나, 특정 검색어에 맞는 데이터를 필터링하여 반환합니다.
     * @param {Object} req - 클라이언트 요청 객체입니다.
     * @param {Object} res - 서버 응답 객체입니다.
     */
    router.post([ "/getAllContents" ], async function (req, res) {

      // 응답 헤더를 설정하여 클라이언트의 요청에 대해 JSON 형식으로 응답합니다.
      res.set({
        "Content-Type": "application/json", // 응답의 콘텐츠 타입을 JSON으로 설정합니다.
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정합니다.
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 설정합니다.
      });

      try {
        // 요청 본문에서 mode가 정의되지 않은 경우 예외를 발생시킵니다.
        if (req.body.mode === undefined) {
          throw new Error("invalid post"); // 유효하지 않은 POST 요청에 대한 오류 메시지.
        }

        // equalJson 메서드를 사용하여 요청 본문을 깊은 복사한 후, mode를 추출합니다.
        const { mode } = equalJson(req.body);
        const selfMongo = instance.mongo; // 메인 MongoDB 연결 객체를 selfMongo 변수에 할당합니다.
        const selfLocalMongo = instance.mongolocal; // 로컬 MongoDB 연결 객체를 selfLocalMongo 변수에 할당합니다.
        const collection = "foreContents"; // foreContents 컬렉션 이름을 정의합니다.
        const delta = 24; // 특정 기간을 계산하기 위한 델타 값(24개월)을 정의합니다.

        let contentsArr, projects, clients, designers; // 작업에 필요한 변수들을 정의합니다.
        let whereQuery0, whereQuery1; // MongoDB 쿼리 조건을 저장할 변수입니다.
        let resultObj; // 최종적으로 클라이언트에 응답할 결과 객체를 저장할 변수입니다.
        let foreContents; // foreContents 데이터를 저장할 변수입니다.
        let proidArr; // 프로젝트 ID 목록을 저장할 변수입니다.
        let coreWhereQuery; // 핵심 MongoDB 쿼리 조건을 저장할 변수입니다.
        let ago; // 기준 날짜를 저장할 변수입니다.
        let searchClients, searchProjects, cliidArr, searchProidArr, searchContents, searchForeContents, desidArr, thisDesignerName; // 검색 작업에 필요한 변수들을 정의합니다.

        // mode가 "all"인 경우, 모든 콘텐츠 데이터를 조회합니다.
        if (mode === "all") {

          // 요청 본문에서 whereQuery가 정의되지 않은 경우
          if (req.body.whereQuery === undefined) {
            // init 값이 정의된 경우, 특정 기간 내의 데이터를 조회합니다.
            if (req.body.init !== undefined) {
              ago = new Date();
              ago.setMonth(ago.getMonth() - delta); // 기준 날짜에서 24개월 이전으로 설정합니다.
              contentsArr = (await back.getContentsArrByQuery({
                "contents.portfolio.date": { $gte: ago }
              }, { selfMongo })).toNormal(); // 특정 기간 이후의 콘텐츠 데이터를 조회합니다.
            } else {
              // 그렇지 않은 경우, 모든 콘텐츠 데이터를 조회합니다.
              contentsArr = (await back.getContentsArrByQuery({}, { selfMongo })).toNormal();
            }
          } else {
            // whereQuery가 정의된 경우, 해당 조건에 맞는 데이터를 조회합니다.
            coreWhereQuery = equalJson(req.body.whereQuery);
            contentsArr = (await back.getContentsArrByQuery(coreWhereQuery, { selfMongo })).toNormal();
          }

          // 모든 디자이너 데이터를 조회합니다.
          designers = (await back.getDesignersByQuery({}, { selfMongo })).toNormal();

          // nonFore 값이 정의되지 않은 경우, foreContents 데이터를 조회합니다.
          if (req.body.nonFore !== undefined) {
            foreContents = [];
          } else {
            foreContents = await back.mongoRead(collection, {}, { selfMongo: selfLocalMongo });
            foreContents.sort((a, b) => { return Number(b.pid.replace(/[^0-9]/gi, '')) - Number(a.pid.replace(/[^0-9]/gi, '')); });
          }

          // 콘텐츠 데이터와 foreContents 데이터를 결합하여 proidArr에 저장합니다.
          proidArr = contentsArr.filter((c) => c.proid !== "").map((obj) => obj.proid);
          proidArr = proidArr.concat(foreContents.map((o) => o.proid));
          proidArr = [ ...new Set(proidArr) ]; // 중복을 제거한 proidArr 배열을 생성합니다.

          // proidArr을 사용하여 프로젝트 데이터를 조회합니다.
          whereQuery0 = {};
          whereQuery0["$or"] = proidArr.map((proid) => ({ proid }));
          projects = (await back.getProjectsByQuery(whereQuery0, { selfMongo })).toNormal();

          // 프로젝트 데이터에서 클라이언트 ID를 추출하여 클라이언트 데이터를 조회합니다.
          whereQuery1 = {};
          whereQuery1["$or"] = projects.map((obj) => ({ cliid: obj.cliid }));
          clients = (await back.getClientsByQuery(whereQuery1, { selfMongo })).toNormal();

          // 최종 결과 객체를 구성합니다.
          resultObj = { contentsArr, foreContents, projects, clients, designers };

          // 결과를 클라이언트에 응답합니다.
          res.send(JSON.stringify(resultObj));

        // mode가 "search"인 경우, 특정 검색어에 맞는 콘텐츠 데이터를 조회합니다.
        } else if (mode === "search") {

          // 검색어 값이 정의되지 않은 경우 예외를 발생시킵니다.
          if (req.body.value === undefined) {
            throw new Error("invalid post"); // 유효하지 않은 POST 요청에 대한 오류 메시지.
          }
          const { value } = equalJson(req.body); // equalJson 메서드를 사용하여 검색어를 추출합니다.

          // 검색어가 한글로 시작하는 경우, 디자이너 이름을 포함한 데이터를 검색합니다.
          if (/^[가-힣]/i.test(value)) {
            // 디자이너 이름에 검색어가 포함된 디자이너 목록을 가져옵니다.
            designers = (await back.getDesignersByQuery({ designer: { $regex: value } }, { selfMongo })).toNormal();

            // 디자이너 목록이 존재하는 경우
            if (designers.length > 0) {
                // 디자이너 ID 배열을 생성합니다.
                desidArr = designers.filter((d) => d.desid !== "").map((d) => d.desid);
                // 중복된 ID를 제거하여 고유한 ID 배열을 만듭니다.
                desidArr = [...new Set(desidArr)];

                // 해당 디자이너 ID에 연관된 프로젝트를 가져옵니다.
                projects = (await back.getProjectsByQuery({ $or: desidArr.map((desid) => ({ desid })) }, { selfMongo })).toNormal();

                // 프로젝트 ID 배열을 생성합니다.
                proidArr = projects.filter((d) => d.proid !== "").map((d) => d.proid);
                // 중복된 ID를 제거하여 고유한 프로젝트 ID 배열을 만듭니다.
                proidArr = [...new Set(proidArr)];

                // 검색된 콘텐츠와 선호 콘텐츠 배열을 초기화합니다.
                searchContents = [];
                searchForeContents = [];

                // 프로젝트 ID가 존재하는 경우에만 콘텐츠를 검색합니다.
                if (proidArr.length > 0) {
                    // 프로젝트 ID와 디자이너 ID로 콘텐츠를 검색합니다.
                    searchProidArr = proidArr.map((proid) => ({ proid })).concat(desidArr.map((desid) => ({ desid })));
                    searchContents = await back.getContentsArrByQuery({ $or: searchProidArr }, { selfMongo });
                    searchForeContents = await back.mongoRead(collection, { $or: searchProidArr }, { selfMongo: selfLocalMongo });
                }

                // 콘텐츠에서 프로젝트 ID를 추출하여 고유한 프로젝트 ID 배열을 만듭니다.
                proidArr = searchContents.filter((c) => c.proid !== "").map((obj) => obj.proid);
                proidArr = proidArr.concat(searchForeContents.map((o) => o.proid));
                proidArr = [...new Set(proidArr)];

                // 프로젝트 ID가 존재하는 경우에만 관련된 프로젝트와 클라이언트를 검색합니다.
                if (proidArr.length > 0) {
                    whereQuery0 = {};
                    whereQuery0["$or"] = proidArr.map((proid) => ({ proid }));
                    projects = (await back.getProjectsByQuery(whereQuery0, { selfMongo })).toNormal();
                    whereQuery1 = {};
                    whereQuery1["$or"] = projects.map((obj) => ({ cliid: obj.cliid }));
                    clients = (await back.getClientsByQuery(whereQuery1, { selfMongo })).toNormal();

                    // 최종 결과 객체에 콘텐츠, 선호 콘텐츠, 프로젝트, 클라이언트, 디자이너 정보를 담아 반환합니다.
                    resultObj = {
                        contentsArr: searchContents,
                        foreContents: searchForeContents,
                        projects,
                        clients,
                        designers
                    };
                } else {
                    // 프로젝트 ID가 없을 경우, 빈 프로젝트와 클라이언트 정보를 반환합니다.
                    projects = [];
                    clients = [];
                    resultObj = {
                        contentsArr: searchContents,
                        foreContents: searchForeContents,
                        projects,
                        clients,
                        designers
                    };
                }

            } else {
                // 검색된 디자이너가 없을 경우, 빈 결과를 반환합니다.
                resultObj = {
                    contentsArr: [],
                    foreContents: [],
                    projects: [],
                    clients: [],
                    designers: [],
                };
            }

            // 검색어가 "c: "로 시작하는 경우 클라이언트 이름을 검색합니다.
          } else if (/^c[ ]*\:[ ]*[가-힣]*/i.test(value)) {
            // 검색어에서 클라이언트 이름을 추출합니다.
            thisDesignerName = value.split(":").map((str) => str.trim())[1];

            // 검색된 콘텐츠와 선호 콘텐츠 배열을 초기화합니다.
            searchContents = [];
            searchForeContents = [];

            // 클라이언트 이름으로 클라이언트를 검색합니다.
            searchClients = await back.getClientsByQuery({
                name: { $regex: thisDesignerName }
            }, { selfMongo });

            // 검색된 클라이언트가 있는 경우
            if (searchClients.length > 0) {
                // 클라이언트 ID 배열을 생성합니다.
                cliidArr = searchClients.toNormal().map((c) => c.cliid).map((cliid) => ({ cliid }));
                // 해당 클라이언트와 연관된 프로젝트를 검색합니다.
                searchProjects = await back.getProjectsByQuery({
                    $or: cliidArr
                }, { selfMongo });

                // 프로젝트가 있는 경우
                if (searchProjects.length > 0) {
                    // 프로젝트 ID 배열을 생성합니다.
                    searchProidArr = searchProjects.toNormal().map((c) => c.proid).map((proid) => ({ proid }));
                    // 프로젝트 ID로 콘텐츠와 선호 콘텐츠를 검색합니다.
                    searchContents = await back.getContentsArrByQuery({ $or: searchProidArr }, { selfMongo });
                    searchForeContents = await back.mongoRead(collection, { $or: searchProidArr }, { selfMongo: selfLocalMongo });
                }
            }

            // 검색된 콘텐츠에서 프로젝트 ID를 추출하여 고유한 프로젝트 ID 배열을 만듭니다.
            proidArr = searchContents.filter((c) => c.proid !== "").map((obj) => obj.proid);
            proidArr = proidArr.concat(searchForeContents.map((o) => o.proid));
            proidArr = [...new Set(proidArr)];

            // 검색된 콘텐츠에서 디자이너 ID를 추출하여 고유한 디자이너 ID 배열을 만듭니다.
            desidArr = searchContents.filter((c) => c.desid !== "").map((obj) => obj.desid);
            desidArr = desidArr.concat(searchForeContents.map((o) => o.desid));
            desidArr = [...new Set(desidArr)];

            // 디자이너 ID가 존재하는 경우 관련된 디자이너를 검색합니다.
            if (desidArr.length > 0) {
                designers = (await back.getDesignersByQuery({ $or: desidArr.map((desid) => ({ desid })) }, { selfMongo })).toNormal();
            } else {
                designers = [];
            }

            // 프로젝트 ID가 존재하는 경우 관련된 프로젝트와 클라이언트를 검색합니다.
            if (proidArr.length > 0) {
                whereQuery0 = {};
                whereQuery0["$or"] = proidArr.map((proid) => ({ proid }));
                projects = (await back.getProjectsByQuery(whereQuery0, { selfMongo })).toNormal();
                whereQuery1 = {};
                whereQuery1["$or"] = projects.map((obj) => ({ cliid: obj.cliid }));
                clients = (await back.getClientsByQuery(whereQuery1, { selfMongo })).toNormal();

                // 최종 결과 객체에 콘텐츠, 선호 콘텐츠, 프로젝트, 클라이언트, 디자이너 정보를 담아 반환합니다.
                resultObj = {
                    contentsArr: searchContents,
                    foreContents: searchForeContents,
                    projects,
                    clients,
                    designers
                };
            } else {
                // 프로젝트 ID가 없을 경우, 빈 프로젝트와 클라이언트 정보를 반환합니다.
                projects = [];
                clients = [];
                resultObj = {
                    contentsArr: searchContents,
                    foreContents: searchForeContents,
                    projects,
                    clients,
                    designers
                };
            }

            // 검색어가 특정 형식(p, ap, t 등)으로 시작하는 경우 해당 데이터를 검색합니다.
          } else if (/^[ap][0-9]+$/i.test(value)) {
            // 포트폴리오 ID로 콘텐츠를 검색합니다.
            searchContents = await back.getContentsArrByQuery({ "contents.portfolio.pid": value.trim() }, { selfMongo });
            // 포트폴리오 ID로 선호 콘텐츠를 검색합니다.
            searchForeContents = await back.mongoRead(collection, { "pid": value.trim() }, { selfMongo: selfLocalMongo });

            // 콘텐츠에서 프로젝트 ID를 추출하여 고유한 프로젝트 ID 배열을 만듭니다.
            proidArr = searchContents.filter((c) => c.proid !== "").map((obj) => obj.proid);
            proidArr = proidArr.concat(searchForeContents.map((o) => o.proid));
            proidArr = [...new Set(proidArr)];

            // 콘텐츠에서 디자이너 ID를 추출하여 고유한 디자이너 ID 배열을 만듭니다.
            desidArr = searchContents.filter((c) => c.desid !== "").map((obj) => obj.desid);
            desidArr = desidArr.concat(searchForeContents.map((o) => o.desid));
            desidArr = [...new Set(desidArr)];

            // 디자이너 ID가 존재하는 경우 관련된 디자이너를 검색합니다.
            if (desidArr.length > 0) {
                designers = (await back.getDesignersByQuery({ $or: desidArr.map((desid) => ({ desid })) }, { selfMongo })).toNormal();
            } else {
                designers = [];
            }

            // 프로젝트 ID가 존재하는 경우 관련된 프로젝트와 클라이언트를 검색합니다.
            if (proidArr.length > 0) {
                whereQuery0 = {};
                whereQuery0["$or"] = proidArr.map((proid) => ({ proid }));
                projects = (await back.getProjectsByQuery(whereQuery0, { selfMongo })).toNormal();
                whereQuery1 = {};
                whereQuery1["$or"] = projects.map((obj) => ({ cliid: obj.cliid }));
                clients = (await back.getClientsByQuery(whereQuery1, { selfMongo })).toNormal();

                // 최종 결과 객체에 콘텐츠, 선호 콘텐츠, 프로젝트, 클라이언트, 디자이너 정보를 담아 반환합니다.
                resultObj = {
                    contentsArr: searchContents,
                    foreContents: searchForeContents,
                    projects,
                    clients,
                    designers
                };
            } else {
                // 프로젝트 ID가 없을 경우, 빈 프로젝트와 클라이언트 정보를 반환합니다.
                projects = [];
                clients = [];
                resultObj = {
                    contentsArr: searchContents,
                    foreContents: searchForeContents,
                    projects,
                    clients,
                    designers
                };
            }

            // 검색어가 프로젝트 ID 형식으로 시작하는 경우 해당 프로젝트를 검색합니다.
          } else if (/^p/i.test(value)) {
            // 프로젝트 ID로 콘텐츠를 검색합니다.
            searchContents = await back.getContentsArrByQuery({ "proid": value.trim() }, { selfMongo });
            // 프로젝트 ID로 선호 콘텐츠를 검색합니다.
            searchForeContents = await back.mongoRead(collection, { "proid": value.trim() }, { selfMongo: selfLocalMongo });

            // 콘텐츠에서 프로젝트 ID를 추출하여 고유한 프로젝트 ID 배열을 만듭니다.
            proidArr = searchContents.filter((c) => c.proid !== "").map((obj) => obj.proid);
            proidArr = proidArr.concat(searchForeContents.map((o) => o.proid));
            proidArr = [...new Set(proidArr)];

            // 콘텐츠에서 디자이너 ID를 추출하여 고유한 디자이너 ID 배열을 만듭니다.
            desidArr = searchContents.filter((c) => c.desid !== "").map((obj) => obj.desid);
            desidArr = desidArr.concat(searchForeContents.map((o) => o.desid));
            desidArr = [...new Set(desidArr)];

            // 디자이너 ID가 존재하는 경우 관련된 디자이너를 검색합니다.
            if (desidArr.length > 0) {
                designers = (await back.getDesignersByQuery({ $or: desidArr.map((desid) => ({ desid })) }, { selfMongo })).toNormal();
            } else {
                designers = [];
            }

            // 프로젝트 ID가 존재하는 경우 관련된 프로젝트와 클라이언트를 검색합니다.
            if (proidArr.length > 0) {
                whereQuery0 = {};
                whereQuery0["$or"] = proidArr.map((proid) => ({ proid }));
                projects = (await back.getProjectsByQuery(whereQuery0, { selfMongo })).toNormal();
                whereQuery1 = {};
                whereQuery1["$or"] = projects.map((obj) => ({ cliid: obj.cliid }));
                clients = (await back.getClientsByQuery(whereQuery1, { selfMongo })).toNormal();

                // 최종 결과 객체에 콘텐츠, 선호 콘텐츠, 프로젝트, 클라이언트, 디자이너 정보를 담아 반환합니다.
                resultObj = {
                    contentsArr: searchContents,
                    foreContents: searchForeContents,
                    projects,
                    clients,
                    designers
                };
            } else {
                // 프로젝트 ID가 없을 경우, 빈 프로젝트와 클라이언트 정보를 반환합니다.
                projects = [];
                clients = [];
                resultObj = {
                    contentsArr: searchContents,
                    foreContents: searchForeContents,
                    projects,
                    clients,
                    designers
                };
            }

            // 검색어가 콘텐츠 ID 형식으로 시작하는 경우 해당 콘텐츠를 검색합니다.
          } else if (/^t/i.test(value)) {
            // 콘텐츠 ID로 콘텐츠를 검색합니다.
            searchContents = await back.getContentsArrByQuery({ "conid": value.trim() }, { selfMongo });
            searchForeContents = [];

            // 콘텐츠에서 프로젝트 ID를 추출하여 고유한 프로젝트 ID 배열을 만듭니다.
            proidArr = searchContents.filter((c) => c.proid !== "").map((obj) => obj.proid);
            proidArr = proidArr.concat(searchForeContents.map((o) => o.proid));
            proidArr = [...new Set(proidArr)];

            // 콘텐츠에서 디자이너 ID를 추출하여 고유한 디자이너 ID 배열을 만듭니다.
            desidArr = searchContents.filter((c) => c.desid !== "").map((obj) => obj.desid);
            desidArr = desidArr.concat(searchForeContents.map((o) => o.desid));
            desidArr = [...new Set(desidArr)];

            // 디자이너 ID가 존재하는 경우 관련된 디자이너를 검색합니다.
            if (desidArr.length > 0) {
                designers = (await back.getDesignersByQuery({ $or: desidArr.map((desid) => ({ desid })) }, { selfMongo })).toNormal();
            } else {
                designers = [];
            }

            // 프로젝트 ID가 존재하는 경우 관련된 프로젝트와 클라이언트를 검색합니다.
            if (proidArr.length > 0) {
                whereQuery0 = {};
                whereQuery0["$or"] = proidArr.map((proid) => ({ proid }));
                projects = (await back.getProjectsByQuery(whereQuery0, { selfMongo })).toNormal();
                whereQuery1 = {};
                whereQuery1["$or"] = projects.map((obj) => ({ cliid: obj.cliid }));
                clients = (await back.getClientsByQuery(whereQuery1, { selfMongo })).toNormal();

                // 최종 결과 객체에 콘텐츠, 선호 콘텐츠, 프로젝트, 클라이언트, 디자이너 정보를 담아 반환합니다.
                resultObj = {
                    contentsArr: searchContents,
                    foreContents: searchForeContents,
                    projects,
                    clients,
                    designers
                };
            } else {
                // 프로젝트 ID가 없을 경우, 빈 프로젝트와 클라이언트 정보를 반환합니다.
                projects = [];
                clients = [];
                resultObj = {
                    contentsArr: searchContents,
                    foreContents: searchForeContents,
                    projects,
                    clients,
                    designers
                };
            }

            // 검색어가 디자이너 ID 형식으로 시작하는 경우 해당 디자이너를 검색합니다.
          } else if (/^d/i.test(value)) {
            // 디자이너 ID로 디자이너를 검색합니다.
            designers = (await back.getDesignersByQuery({ desid: { $regex: value } }, { selfMongo })).toNormal();

            // 디자이너 목록이 존재하는 경우
            if (designers.length > 0) {
                // 디자이너 ID 배열을 생성합니다.
                desidArr = designers.filter((d) => d.desid !== "").map((d) => d.desid);
                desidArr = [...new Set(desidArr)];

                // 해당 디자이너 ID에 연관된 프로젝트를 가져옵니다.
                projects = (await back.getProjectsByQuery({ $or: desidArr.map((desid) => ({ desid })) }, { selfMongo })).toNormal();

                // 프로젝트 ID 배열을 생성합니다.
                proidArr = projects.filter((d) => d.proid !== "").map((d) => d.proid);
                proidArr = [...new Set(proidArr)];

                // 검색된 콘텐츠와 선호 콘텐츠 배열을 초기화합니다.
                searchContents = [];
                searchForeContents = [];

                // 프로젝트 ID가 존재하는 경우에만 콘텐츠를 검색합니다.
                if (proidArr.length > 0) {
                    // 프로젝트 ID와 디자이너 ID로 콘텐츠를 검색합니다.
                    searchProidArr = proidArr.map((proid) => ({ proid })).concat(desidArr.map((desid) => ({ desid })));
                    searchContents = await back.getContentsArrByQuery({ $or: searchProidArr }, { selfMongo });
                    searchForeContents = await back.mongoRead(collection, { $or: searchProidArr }, { selfMongo: selfLocalMongo });
                }

                // 콘텐츠에서 프로젝트 ID를 추출하여 고유한 프로젝트 ID 배열을 만듭니다.
                proidArr = searchContents.filter((c) => c.proid !== "").map((obj) => obj.proid);
                proidArr = proidArr.concat(searchForeContents.map((o) => o.proid));
                proidArr = [...new Set(proidArr)];

                // 프로젝트 ID가 존재하는 경우에만 관련된 프로젝트와 클라이언트를 검색합니다.
                if (proidArr.length > 0) {
                    whereQuery0 = {};
                    whereQuery0["$or"] = proidArr.map((proid) => ({ proid }));
                    projects = (await back.getProjectsByQuery(whereQuery0, { selfMongo })).toNormal();
                    whereQuery1 = {};
                    whereQuery1["$or"] = projects.map((obj) => ({ cliid: obj.cliid }));
                    clients = (await back.getClientsByQuery(whereQuery1, { selfMongo })).toNormal();

                    // 최종 결과 객체에 콘텐츠, 선호 콘텐츠, 프로젝트, 클라이언트, 디자이너 정보를 담아 반환합니다.
                    resultObj = {
                        contentsArr: searchContents,
                        foreContents: searchForeContents,
                        projects,
                        clients,
                        designers
                    };
                } else {
                    // 프로젝트 ID가 없을 경우, 빈 프로젝트와 클라이언트 정보를 반환합니다.
                    projects = [];
                    clients = [];
                    resultObj = {
                        contentsArr: searchContents,
                        foreContents: searchForeContents,
                        projects,
                        clients,
                        designers
                    };
                }

            } else {
                // 검색된 디자이너가 없을 경우, 빈 결과를 반환합니다.
                resultObj = {
                    contentsArr: [],
                    foreContents: [],
                    projects: [],
                    clients: [],
                    designers: [],
                };
            }

          } else {
            // 검색어가 특정 형식에 맞지 않는 경우, 빈 결과를 반환합니다.
            resultObj = {
                contentsArr: [],
                foreContents: [],
                projects: [],
                clients: [],
                designers: [],
            };
          }

          // 검색 결과를 클라이언트에 응답합니다.
          res.send(JSON.stringify(resultObj));

        // mode가 정의되지 않거나 유효하지 않은 경우 예외를 발생시킵니다.
        } else {
          throw new Error("invalid mode"); // 유효하지 않은 mode에 대한 오류 메시지.
        }

      } catch (e) {
        // 오류가 발생한 경우, logger.error 메서드를 통해 오류를 로깅합니다.
        logger.error(e, req).catch((e) => { console.log(e); });

        // 오류 메시지를 JSON 형식으로 클라이언트에 응답합니다.
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    /**
     * @route POST /queryAnalytics
     * @description 특정 분석 데이터를 조회하기 위한 라우터입니다. 클라이언트 요청에 따라 지정된 모드와 쿼리를 기반으로 데이터를 가져옵니다.
     * @param {Object} req - 클라이언트 요청 객체로, body에 모드와 쿼리 조건을 포함합니다.
     * @param {Object} res - 서버 응답 객체로, 조회된 데이터를 JSON 형식으로 반환합니다.
     */
    router.post([ "/queryAnalytics" ], async function (req, res) {

      // 응답의 Content-Type을 JSON으로 설정하고, CORS를 허용하는 헤더를 추가합니다.
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });

      try {
        // 요청 본문(req.body)에 mode가 정의되지 않은 경우 에러를 발생시킵니다.
        if (req.body.mode === undefined) {
          throw new Error("invalid post"); // 유효하지 않은 요청에 대한 에러 메시지
        }

        // equalJson 메서드를 사용하여 요청 본문을 파싱하고, mode 변수를 추출합니다.
        const { mode } = equalJson(req.body);

        // MongoDB 인스턴스를 selfMongo 변수에 할당합니다.
        const selfMongo = instance.mongolocal;

        // 쿼리할 MongoDB 컬렉션 이름을 정의합니다.
        const collection = "queryAnalytics";

        let rows; // 쿼리 결과를 저장할 변수입니다.

        // mode가 "get"일 경우 데이터를 조회합니다.
        if (mode === "get") {

          // whereQuery가 요청 본문에 정의되지 않은 경우 에러를 발생시킵니다.
          if (req.body.whereQuery === undefined) {
            throw new Error("invalid post 2"); // 유효하지 않은 요청에 대한 추가 에러 메시지
          }

          // equalJson 메서드를 사용하여 요청 본문에서 whereQuery를 추출합니다.
          const { whereQuery } = equalJson(req.body);

          // MongoDB에서 whereQuery 조건에 맞는 데이터를 조회합니다.
          rows = await back.mongoRead(collection, whereQuery, { selfMongo });

          // 조회된 데이터에서 MongoDB 고유 ID 필드를 제거합니다.
          for (let obj of rows) {
            delete obj._id; // _id 필드를 삭제하여 응답 데이터에서 제외
          }

          // 최종적으로 조회된 데이터를 JSON 형식으로 클라이언트에 응답합니다.
          res.send(JSON.stringify(rows));

        } else {
          // mode가 "get"이 아닌 경우 에러를 발생시킵니다.
          throw new Error("invalid mode"); // 유효하지 않은 mode에 대한 에러 메시지
        }

      } catch (e) {
        // 에러가 발생한 경우, 에러를 로그로 기록하고 클라이언트에 에러 메시지를 응답합니다.
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });

    return router;
  }
}

module.exports = StaticRouter;
