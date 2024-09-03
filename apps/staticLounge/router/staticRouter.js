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
  binaryRequest, zeroAddition, autoHypenPhone, processSystem, messageSend, cryptoString, objectDeepCopy, 
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
    
    router.post([ "/designerAboutComplete" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        if (req.body.mode === undefined) {
          throw new Error("invalid post");
        }
        const selfMongo = instance.mongolocal;
        const collection = "homeliaisonAnalytics";
        const completeStandardNumber = 10;
        const targetPageName = "designerAbout";
        const { mode } = equalJson(req.body);
        let rows;
        let profileComplete, workComplete, aboutUpdateComplete;
        let resultObj;
        let desidToResult;
        let finalObj;
    
        desidToResult = async (desid, preRows = null) => {
          try {
            if (preRows === null) {
              rows = await back.mongoPick(collection, [ {
                $and: [
                  {
                    page: targetPageName,
                  },
                  {
                    "data.desid": desid,
                  }
                ]
              }, {
                page: 1,
                action: 1,
                data: 1,
                id: 1,
                date: 1,
              } ], { selfMongo });
            } else {
              rows = preRows.filter((o) => { return o.data.desid === desid });
            }
    
            profileComplete = rows.filter((o) => { return o.action === "profilePhotoUpload" }).length > 0;
            workComplete = [ ...new Set(rows.filter((o) => { return o.action === "workPhotoUpload" }).map((o) => { return o.data.index })) ].length >= 4;
            aboutUpdateComplete = [ ...new Set(rows.filter((o) => { return o.action === "designerAboutUpdate" }).map((o) => { return o.data.property })) ].length >= completeStandardNumber;
    
            resultObj = {
              profileComplete: profileComplete ? 1 : 0,
              workComplete: workComplete ? 1 : 0,
              aboutUpdateComplete: aboutUpdateComplete ? 1 : 0,
            };
    
            return resultObj;
    
          } catch (e) {
            return null;
          }
        }
    
        if (mode === "total") {
          const designers = await back.mongoPick("designer", [ {}, { desid: 1 } ], { selfMongo });
          finalObj = {};
          preRows = await back.mongoPick(collection, [ {
            page: targetPageName,
          }, {
            page: 1,
            action: 1,
            data: 1,
            id: 1,
            date: 1,
          } ], { selfMongo });
          for (let { desid } of designers) {
            finalObj[desid] = await desidToResult(desid, preRows);
          }
          res.send(JSON.stringify(finalObj));
        } else if (mode === "pick") {
          const { desid } = equalJson(req.body);
          const targetResult = await desidToResult(desid);
          res.send(JSON.stringify(targetResult));
        } else {
          throw new Error("invalid mode");
        }
    
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/filesToZip" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        if (req.body.files === undefined) {
          throw new Error("invalid post");
        }
        const home = process.env.HOME;
        const uniqueValueFileName = "homeliaisonCloud_" + uniqueValue("string");
        const tempFileFolderName = "temp";
        const tempFileFolder = `${home}/${tempFileFolderName}`;
        const { files } = equalJson(req.body);
        let targetFiles;
    
        if (await fileSystem(`exist`, [ tempFileFolder ])) {
          await shellExec(`rm`, [ `-rf`, tempFileFolder ]);
        }
        await shellExec(`mkdir`, [ tempFileFolder ]);
    
        targetFiles = files.map((obj) => { return { absolute: obj.absolute.replace(/__samba__/gi, address.officeinfo.ghost.file.static).replace(/\/$/, ''), type: obj.type } });
    
        for (let { absolute, type } of targetFiles) {
          if (type === "file") {
            await shellExec(`cp`, [ absolute, tempFileFolder ]);
          } else {
            await shellExec(`cp`, [ `-r`, absolute, tempFileFolder ]);
          }
        }
    
        await shellExec(`mv`, [ tempFileFolder, `${home}/${uniqueValueFileName}` ]);
        await shellExec(`cd ${home};zip -r ${uniqueValueFileName}.zip ./${uniqueValueFileName}`);
        await shellExec(`mv`, [ `${home}/${uniqueValueFileName}.zip`, `${address.officeinfo.ghost.file.static}/${uniqueValueFileName}.zip` ]);
        await shellExec(`rm`, [ `-rf`, `${home}/${uniqueValueFileName}` ]);
    
        setTimeout(async () => {
          try {
            await shellExec(`rm`, [ `-rf`, `${address.officeinfo.ghost.file.static}/${uniqueValueFileName}.zip` ]);
          } catch (e) {
            console.log(e);
          }
        }, 1000 * 60 * 60 * 5);
    
        res.send(JSON.stringify({ link: "__samba__/" + uniqueValueFileName + ".zip" }));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/renameFile" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        if (req.body.path === undefined || req.body.name === undefined) {
          throw new Error("invalid post");
        }
        const { path, name } = equalJson(req.body);
        let targetFile;
        let targetPlace;
        let thisExe;
        let thisFinal;
    
        targetFile = path.replace(/__samba__/gi, address.officeinfo.ghost.file.static).replace(/\/$/, '');
        targetPlace = targetFile.split("/").slice(0, -1).join("/");
        thisExe = targetFile.split("/").slice(-1)[0].split(".")[1];
        if (thisExe === undefined) {
          thisFinal = "";
        } else {
          thisFinal = "." + thisExe;
        }
        await shellExec(`mv`, [ targetFile, targetPlace.replace(/\/$/, '') + "/" + name.replace(/^\//, '').replace(/\/$/, '') + thisFinal ]);
        res.send(JSON.stringify({ message: "done" }));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/deleteFile" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        if (req.body.files === undefined) {
          throw new Error("invalid post");
        }
        const { files } = equalJson(req.body);
        const allowedPath = [
          address.officeinfo.ghost.file.static + "/drive/# 홈리에종",
          address.officeinfo.ghost.file.static + address.officeinfo.ghost.file.office + "/고객/",
          address.officeinfo.ghost.file.static + address.officeinfo.ghost.file.office + "/디자이너/",
          address.officeinfo.ghost.file.static + address.officeinfo.ghost.file.office + "/일시적",
        ];
        let targetFiles;
    
        targetFiles = files.map((obj) => { return { absolute: obj.absolute.replace(/__samba__/gi, address.officeinfo.ghost.file.static).replace(/\/$/, ''), type: obj.type } });
    
        for (let { absolute, type } of targetFiles) {
          if (type === "file") {
            if (allowedPath.some((reg) => { return (new RegExp("^" + reg)).test(absolute) })) {
              await shellExec(`rm`, [ `-f`, absolute ]);
            }
          } else {
            if (absolute !== address.officeinfo.ghost.file.static) {
              if (allowedPath.some((reg) => { return (new RegExp("^" + reg)).test(absolute) })) {
                await shellExec(`rm`, [ `-rf`, absolute ]);
              }
            }
          }
        }
    
        res.send(JSON.stringify({ message: "done" }));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/callHistory" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        const url = "https://centrex.uplus.co.kr/RestApi/callhistory";
        const { officeinfo: { phone: { numbers: phoneNumbers, password: pass } } } = address;
        const callConst = "c_";
        const successStandardSec = 200;
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
      
            calltype = "outbound";
            tong = {};
            for (let id of phoneNumbers) {
              page = 0;
              do {
                page++;
                query = { id, pass, calltype, page };
                res = await requestSystem(url + "?" + querystring.stringify(query), query, { headers: { "Content-Type": "application/json" } });
                data = res.data;
                if (data.DATAS === null) {
                  break;
                }
                for (let obj of data.DATAS) {
                  if (!Array.isArray(tong[callConst + obj.SRC])) {
                    tong[callConst + obj.SRC] = [];
                  }
                  tong[callConst + obj.SRC].push(JSON.parse(JSON.stringify(obj)));
                }
              } while (data.SVC_RT === '0000');
            }
      
            for (let c in tong) {
              tong[c].sort((a, b) => { return a.NO - b.NO; });
              tong[c] = { out: JSON.parse(JSON.stringify(tong[c])), in: [] };
            }
      
            calltype = "inbound";
            for (let id of phoneNumbers) {
              page = 0;
              do {
                page++;
                query = { id, pass, calltype, page };
                res = await requestSystem(url + "?" + querystring.stringify(query), query, { headers: { "Content-Type": "application/json" } });
                data = res.data;
                if (data.DATAS === null) {
                  break;
                }
                for (let obj of data.DATAS) {
                  if (tong[callConst + obj.DST] !== undefined) {
                    tong[callConst + obj.DST].in.push(JSON.parse(JSON.stringify(obj)));
                  }
                }
              } while (data.SVC_RT === '0000');
            }
      
            outArr = [];
            inArr = [];
            for (let c in tong) {
              for (let obj of tong[c].out) {
                tempObj = {};
                tempObj.date = stringToDate(obj.TIME);
                tempObj.to = autoHypenPhone(obj.DST);
                tempObj.duration = Number.isNaN(Number(obj.DURATION.replace(/[^0-9]/gi, ''))) ? 0 : Number(obj.DURATION.replace(/[^0-9]/gi, ''));
                if (obj.STATUS === "OK") {
                  if (tempObj.duration >= successStandardSec) {
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
                tempObj.date = stringToDate(obj.TIME);
                tempObj.from = autoHypenPhone(obj.SRC);
                tempObj.duration = Number.isNaN(Number(obj.DURATION.replace(/[^0-9]/gi, ''))) ? 0 : Number(obj.DURATION.replace(/[^0-9]/gi, ''));
                if (obj.STATUS === "OK") {
                  if (tempObj.duration >= successStandardSec) {
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
      
            outArr.sort((a, b) => { return a.date.valueOf() - b.date.valueOf(); });
            inArr.sort((a, b) => { return a.date.valueOf() - b.date.valueOf(); });
      
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
                if (boo) {
                  historyObj.curation.analytics.call.out.push({ date, success, duration });
                  whereQuery = { cliid };
                  updateQuery = {};
                  updateQuery["curation.analytics.call.out"] = historyObj.curation.analytics.call.out;
                  await back.updateHistory("client", [ whereQuery, updateQuery ], { selfMongo: selfConsoleInfo });
                } else {
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
                if (boo) {
                  historyObj.curation.analytics.call.in.push({ date, success, duration });
                  whereQuery = { cliid };
                  updateQuery = {};
                  updateQuery["curation.analytics.call.in"] = historyObj.curation.analytics.call.in;
                  await back.updateHistory("client", [ whereQuery, updateQuery ], { selfMongo: selfConsoleInfo });
                } else {
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
    
        parsingCallHistory(instance.mongo).then((boo) => {
          if (boo) {
            return logger.cron("callHistory update sync success : " + JSON.stringify(new Date()));
          } else {
            return logger.alert("call history fail");
          }
        }).catch((err) => {
          logger.error(err, req).catch((e) => { console.log(e); });
        });
        res.send(JSON.stringify({ message: "will do" }));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/calendarSync" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
    
        const calendarSyncFunc = async (MONGOC, index) => {
          try {
            const selfMongo = MONGOC;
            const today = new Date();
            const standardDay = new Date();
            const pastConst = 3;
            standardDay.setDate(standardDay.getDate() - pastConst);
            let projects, from;
            let clients, designers;
            let client, designer;
            let title, list;
            let allEvents;
      
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
              allEvents = await calendar.listEvents(from);
      
              for (let project of projects) {
                if (!/디자이너/gi.test(project.contents.photo.info.photographer) && !/고객/gi.test(project.contents.photo.info.photographer)) {
                  client = clients.toNormal().find((obj) => { return obj.cliid === project.cliid });
                  designer = designers.toNormal().find((obj) => { return obj.desid === project.desid });
                  title = `촬영 W ${client.name}C ${designer.designer}D ${project.contents.photo.info.photographer}P ${project.contents.photo.info.interviewer}I ${project.proid}`;
                  list = allEvents.filter((obj) => { return (new RegExp(project.proid, "gi")).test(obj.title) });
                  if (list.length === 1) {
                    await calendar.updateSchedule(from, list[0].eventId, { start: project.contents.photo.date.toNormal(), title });
                  } else if (list.length === 0) {
                    await calendar.makeSchedule(from, title, '', project.contents.photo.date.toNormal());
                  } else {
                    for (let i = 0; i < list.length; i++) {
                      if (i === 0) {
                        await calendar.updateSchedule(from, list[i].eventId, { start: project.contents.photo.date.toNormal(), title });
                      } else {
                        await calendar.deleteSchedule(from, list[i].eventId);
                      }
                    }
                  }
                } else {
                  list = allEvents.filter((obj) => { return (new RegExp(project.proid, "gi")).test(obj.title) });
                  if (list.length !== 0) {
                    for (let i = 0; i < list.length; i++) {
                      await calendar.deleteSchedule(from, list[i].eventId);
                    }
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
              allEvents = await calendar.listEvents(from);
      
              for (let project of projects) {
                client = clients.toNormal().find((obj) => { return obj.cliid === project.cliid });
                designer = designers.toNormal().find((obj) => { return obj.desid === project.desid });
                title = `현장 미팅 W ${client.name}C ${designer.designer}D ${project.proid}`;
                list = allEvents.filter((obj) => { return (new RegExp(project.proid, "gi")).test(obj.title) });
                if (list.length === 1) {
                  await calendar.updateSchedule(from, list[0].eventId, { start: project.process.contract.meeting.date.toNormal(), title });
                } else if (list.length === 0) {
                  await calendar.makeSchedule(from, title, '', project.process.contract.meeting.date.toNormal());
                } else {
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
            return false;
          }
        }
    
        calendarSyncFunc(instance.mongo, 0).then((boo) => {
          if (boo) {
            logger.cron("calendar sync success " + String(0) + " : " + JSON.stringify(new Date())).catch((err) => { console.log(err) });
          }
          return calendarSyncFunc(instance.mongo, 1);
        }).then((boo) => {
          if (boo) {
            return logger.cron("calendar sync success " + String(1) + " : " + JSON.stringify(new Date()));
          }
        }).catch((err) => {
          logger.error(err, req).catch((e) => { console.log(e); });
        });
        res.send(JSON.stringify({ message: "will do" }));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/workProposalToClient" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        work.setProposalToClient("cron", { selfMongo: instance.mongo }).then(() => {
          return logger.cron("proposal to client sync done : " + JSON.stringify(new Date()));
        }).catch((err) => {
          logger.error(err, req).catch((e) => { console.log(e); });
        });
        res.send(JSON.stringify({ message: "will do" }));
      } catch (e) {
         
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/workProjectActionSync" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        work.projectActionSync({ selfMongo: instance.mongo, selfConsoleMongo: instance.mongo, updateMongo: instance.mongo }).then(() => {
          return logger.cron("project action sync done : " + JSON.stringify(new Date()));
        }).catch((err) => {
          logger.error(err, req).catch((e) => { console.log(e); });
        });
        res.send(JSON.stringify({ message: "will do" }));
      } catch (e) {
         
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/photoStatusSync" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        const photoStatusSyncFunc = async (MONGOC) => {
          try {
            const selfMongo = MONGOC;
            const dummny = {
              status: "결제 대기",
              date: new Date(1800, 0, 1),
              cancel: new Date(1800, 0, 1),
              calculation: {
                amount: 165000,
                info: {
                  method: "",
                  proof: "",
                  to: "",
                },
                refund: 0,
              },
            };
            const collection = "project";
            let allDesigners;
            let whereQuery, updateQuery;
            let rawProjects;
            let proid;
            let thisDummy;
            let thisDesigner;
            let thisProof;
      
            allDesigners = (await back.getDesignersByQuery({}, { selfMongo })).toNormal();
      
            rawProjects = await selfMongo.db("miro81").collection(collection).find({}).toArray();
            for (let rawProject of rawProjects) {
              proid = rawProject.proid;
              thisDesigner = null;
              if (rawProject.desid !== '') {
                thisDesigner = allDesigners.find((designer) => { return designer.desid === rawProject.desid });
                if (thisDesigner === undefined) {
                  thisDesigner = null;
                }
              }
      
              whereQuery = { proid };
              updateQuery = {};
              thisDummy = equalJson(JSON.stringify(dummny));
      
              if (rawProject.contents.photo.boo) {
      
                if ((new Date(2000, 0, 1)).valueOf() <= rawProject.contents.photo.date.valueOf() && (new Date(3000, 0, 1)).valueOf() > rawProject.contents.photo.date.valueOf()) {
                  if ((new Date()).valueOf() >= rawProject.contents.photo.date.valueOf()) {
      
                    if (rawProject.contents.photo.info.photographer !== "디자이너" && rawProject.contents.photo.info.photographer !== "고객") {
      
                      if (rawProject.contents.photo.info.photographer !== "미정") {
                        updateQuery["contents.photo.status"] = "촬영 완료";
                      }
      
                    } else {
      
                      updateQuery["contents.photo.status"] = "해당 없음";
                      thisDummy.status = "해당 없음";
                      thisDummy.calculation.amount = 0;
                      updateQuery["contents.payment"] = thisDummy;
      
                    }
      
                  }
                } else {
      
                  if (/완료/gi.test(rawProject.contents.photo.status)) {
                    if (rawProject.contents.photo.info.photographer === "디자이너" || rawProject.contents.photo.info.photographer === "고객") {
                      if (rawProject.process.calculation.payments.remain.date > (new Date(2000, 0, 1)).valueOf()) {
                        updateQuery["contents.photo.status"] = "해당 없음";
                        updateQuery["contents.photo.date"] = rawProject.process.calculation.payments.remain.date;
                        thisDummy.status = "해당 없음";
                        thisDummy.calculation.amount = 0;
                        updateQuery["contents.payment"] = thisDummy;
                      }
                    }
                  }
      
                }
      
              } else {
                updateQuery["contents.photo.status"] = "해당 없음";
                thisDummy.status = "해당 없음";
                thisDummy.calculation.amount = 0;
                updateQuery["contents.payment"] = thisDummy;
              }
      
              if (Object.keys(updateQuery).length > 0) {
                await selfMongo.db("miro81").collection(collection).updateOne(whereQuery, { $set: updateQuery });
              }
      
            }
      
            return true;
          } catch (e) {
            return false;
          }
        }
        photoStatusSyncFunc(instance.mongo).then((boo) => {
          if (boo) {
            return logger.cron("photoStatus sync done : " + JSON.stringify(new Date()));
          }
        }).catch((err) => {
          logger.error(err, req).catch((e) => { console.log(e); });
        });
        res.send(JSON.stringify({ message: "will do" }));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/logBasicReport" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        report.dailyReports().then((boo) => {
          if (boo) {
            logger.cron("marketing reporting done").catch((err) => { console.log(err) });
          }
        }).catch((err) => {
          logger.error(err, req).catch((e) => { console.log(e); });
        });
        res.send(JSON.stringify({ message: "will do" }));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    router.post([ "/readHomeliaisonAnalytics" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        if (req.body.whereQuery === undefined) {
          throw new Error("invalid post");
        }
        const selfMongo = instance.mongo;
        const { whereQuery } = equalJson(JSON.stringify(req.body));
        const collection = "homeliaisonAnalytics";
        let rows, projectQuery;
        let projectBoo;
    
        if (req.body.projectQuery === undefined) {
          projectBoo = false;
          projectQuery = null;
        } else {
          projectBoo = true;
          ({ projectQuery } = equalJson(JSON.stringify(req.body)));
        }
    
        if (projectBoo) {
          rows = await back.mongoPick(collection, [ whereQuery, projectQuery ], { selfMongo });
        } else {
          rows = await back.mongoRead(collection, whereQuery, { selfMongo });
        }
    
        if (!Array.isArray(rows)) {
          rows = [];
        }
    
        res.send(JSON.stringify({ data: rows }));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    router.post([ "/storeClientAnalytics" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        const selfCoreMongo = instance.mongo;
        const fromDate = new Date(2023, 4, 4, 0, 0, 0);
        const fastMode = ((req.body.fast === "true" || req.body.fast === true) ? true : false);
        let agoDate;
        let targetClients;
        let agoClients;
        let targets;
        let finalTargets;
        let delta;
        let targetClients2;
        let fiveMonthAgo;
    
        if (!fastMode) {
    
          delta = 7;
          agoDate = new Date();
          agoDate.setDate(agoDate.getDate() - delta);
    
          fiveMonthAgo = new Date();
          fiveMonthAgo.setMonth(fiveMonthAgo.getMonth() - 5);
    
          targetClients = (await back.getClientsByQuery({
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
    
          targetClients2 = (await back.getClientsByQuery({
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
    
          agoClients = (await back.getClientsByQuery({
            "requests": {
              $elemMatch: {
                "request.timeline": {
                  $gte: agoDate,
                }
              }
            }
          }, { selfMongo: selfCoreMongo })).toNormal();
    
          targets = targetClients.concat(agoClients);
          targets = targets.concat(targetClients2);
          finalTargets = [];
          for (let client of targets) {
            if (!finalTargets.map((c) => { return c.cliid }).includes(client.cliid)) {
              finalTargets.push(client);
            }
          }
    
          analytics.clientsMetric(finalTargets, instance.mongo, instance.mongo, instance.mongo, true, false).then((result) => {
            if (Array.isArray(result)) {
              logger.cron("client analytics store success : " + JSON.stringify(new Date())).catch((err) => { console.log(err) });
            }
          }).catch((err) => {
            logger.error(err, req).catch((e) => { console.log(e); });
          })
    
          res.send(JSON.stringify({ message: "will do" }));
    
        } else {
    
          targetClients = (await back.getClientsByQuery({
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
    
          finalTargets = [];
          for (let client of targetClients) {
            finalTargets.push(client);
          }
    
          analytics.clientsMetric(finalTargets, instance.mongo, instance.mongo, instance.mongo, true, true).then((result) => {
            if (Array.isArray(result)) {
              logger.cron("client analytics store success (fast) : " + JSON.stringify(new Date())).catch((err) => { console.log(err) });
            }
          }).catch((err) => {
            logger.error(err, req).catch((e) => { console.log(e); });
          });
    
          res.send(JSON.stringify({ message: "will do" }));
        }
    
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    router.post([ "/fixClientAnalytics" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        const selfLogMongo = instance.mongolocal;
        analytics.fixClientMetric(selfLogMongo).then((result) => {
          if (result.message === "done") {
            logger.cron("client analytics fix done : " + JSON.stringify(new Date())).catch((err) => { console.log(err) });
          }
        }).catch((err) => {
          logger.error(err, req).catch((e) => { console.log(e); });
        });
        res.send(JSON.stringify({ message: "will do" }));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    router.post([ "/getClientAnalytics" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        if (req.body.cliid === undefined) {
          throw new Error("invalid post");
        }
        const { cliid } = equalJson(req.body);
        const textMode = ((req.body.textMode === "true" || req.body.textMode === true) ? true : false);
        const collection = analytics.clientAnalyticsCollection;
        let textResult;
        let rows;
    
        if (textMode) {
          textResult = await analytics.clientMessage(cliid, instance.mongo, instance.mongolocal);
          if (typeof textResult === "string") {
            res.send(JSON.stringify({ report: textResult }));
          } else {
            res.send(JSON.stringify({ report: "" }));
          }
        } else {
          if (req.body.projectQuery !== undefined) {
            const { projectQuery } = equalJson(req.body);
            rows = await back.mongoPick(collection, [ { cliid }, projectQuery ], { selfMongo: instance.mongolocal });
          } else {
            rows = await back.mongoRead(collection, { cliid }, { selfMongo: instance.mongolocal });
          }
          if (rows.length > 0) {
            res.send(JSON.stringify({ data: rows[rows.length - 1] }));
          } else {
            res.send(JSON.stringify({ data: null }));
          }
        }
    
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ report: "" }));
      }
    });
    
    router.post([ "/storeRealtimeAnalytics" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        analytics.realtimeMetric(instance.mongo, instance.mongolocal, true).then((result) => {
          if (Array.isArray(result)) {
            logger.cron("realtime analytics store success : " + JSON.stringify(new Date())).catch((err) => { console.log(err) });
          }
        }).catch((err) => {
          logger.error(err, req).catch((e) => { console.log(e); });
        });
        res.send(JSON.stringify({ message: "will do" }));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    router.post([ "/checkInsyncStatus" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        const processList = await processSystem("list");
        const result = processList.some(({ process: str }) => { return /insync/gi.test(str); });
        if (!result) {
           throw new Error("process fail");
        }
        res.send(JSON.stringify({ result }));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    router.post([ "/naverComplex" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        if (req.body.id === undefined) {
          throw new Error("invalid post");
        }
        const selfMongo = instance.mongolocal;
        const collection = "addressComplex";
        const { id } = equalJson(req.body);
        let result;
        let rows;
        let naverResult;
    
        if (typeof id !== "string") {
          throw new Error("invalid post");
        }
        if (id.trim() === '') {
          throw new Error("invalid id");
        }
    
        rows = await back.mongoRead(collection, { naver: id.trim() }, { selfMongo });
        if (rows.length > 0) {
          result = rows[0];
          res.send(JSON.stringify(result));
        } else if (rows.length === 0) {
          naverResult = await naver.complexModeling(id);
          if (naverResult === null) {
            throw new Error("invalid id : " + id + ", no result");
          } else {
            await back.mongoCreate(collection, naverResult, { selfMongo });
            res.send(JSON.stringify(naverResult));
          }
        }
    
      } catch (e) {
         
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    router.post([ "/naverComplexes" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        if (req.body.idArr === undefined) {
          throw new Error("invalid post");
        }
        const { idArr } = equalJson(req.body);
        if (idArr.length === 0) {
          throw new Error("invalid post 2");
        }
        const selfMongo = instance.mongolocal;
        const collection = "addressComplex";
        let rows;
        let result;
    
        rows = await back.mongoRead(collection, { $or: idArr.map((id) => { return { naver: id } }) }, { selfMongo });
        result = idArr.map((id) => {
          return rows.find((o) => { return o.naver === id }) === undefined ? null : rows.find((o) => { return o.naver === id });
        });
    
        res.send(JSON.stringify(result));
    
      } catch (e) {
         
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    router.post([ "/printComplex" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        if (req.body.text === undefined || req.body.cliid === undefined || req.body.requestNumber === undefined) {
          throw new Error("invalid post");
        }
        const selfMongo = instance.mongo;
        const bar = "========================================================================";
        const { text, cliid } = equalJson(req.body);
        const mode = (req.body.mode === undefined ? "general" : req.body.mode );
        const requestNumber = Number(req.body.requestNumber);
        const client = await back.getClientById(cliid, { selfMongo });
        const targetAddress = client.requests[requestNumber].request.space.address.value.trim();
        const now = new Date();
        let finalText;
        let dateValue;
        let howLong;
        let naverId;
        let whereQuery, updateQuery;
        let originalArr, foundArr;
    
        const searchId = (client, requestNumber) => {
          if (client.requests[requestNumber].request.space.naver !== "") {
            return new Promise((resolve, reject) => {
              resolve(client.requests[requestNumber].request.space.naver);
            });
          } else {
            return naver.complexSearch(targetAddress, true);
          }
        }
    
        finalText = text;
        naverId = "";
    
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
    
                originalArr = targetAddress.split(" ").map((str) => { return str.trim().replace(/[시도군구]$/gi, '') })
                foundArr = searchResult.data.address.value.split(" ").map((str) => { return str.trim().replace(/[시도군구]$/gi, '') })
    
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
    
          whereQuery = { cliid };
          updateQuery = {};
          updateQuery["requests." + String(requestNumber) + ".request.space.naver"] = naverId;
    
          return back.updateClient([ whereQuery, updateQuery ], { selfMongo });
        }).then(() => {
          if (mode === "general") {

          } else if (mode === "update") {
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
          logger.error(err, req).catch((e) => { console.log(e); });
        });
    
        res.send(JSON.stringify({ message: "will do" }));
    
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    router.post([ "/complexReport" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        if (req.body.fromDate === undefined || req.body.toDate === undefined) {
          throw new Error("invalid post");
        }
        const { fromDate, toDate } = equalJson(req.body);
        const selfMongo = instance.mongo;
        const selfLocalMongo = instance.mongo;
        const selfConsoleMongo = instance.mongo;
        const selfLogMongo = instance.mongo;
        const unknownKeyword = "unknown";
        const proposalStandardDate = new Date(2021, 8, 1);
        const proposalStandardDateValue = proposalStandardDate.valueOf();
        const fromAgoDate = new Date(JSON.stringify(fromDate).slice(1, -1));
        fromAgoDate.setMonth(fromAgoDate.getMonth() - 3);
        const motherClients_rawRaw = await back.getClientsByQuery({
          $and: [
            {
              requests: {
                $elemMatch: {
                  "request.timeline": { $gte: fromAgoDate }
                }
              }
            },
            {
              requests: {
                $elemMatch: {
                  "request.timeline": { $lt: toDate }
                }
              }
            }
          ]
        }, { selfMongo, withTools: true });
        const motherClients_raw = motherClients_rawRaw.getRequestsTong().map((arr) => { let obj = arr[0].toNormal(); obj.cliid = arr.cliid; obj.name = arr.name; obj.analytics = arr[1].toNormal(); return obj; });
        const motherClients = motherClients_raw.filter((obj) => {
          return obj.timeline.valueOf() >= fromDate.valueOf() && obj.timeline.valueOf() < toDate.valueOf();
        });
        const motherClientHistories = await back.mongoPick("clientHistory", [ {
          $or: motherClients.map((o) => { return { cliid: o.cliid } }),
        }, { cliid: 1, manager: 1, curation: 1 } ], { selfMongo: selfConsoleMongo });
        const motherProjects_raw = (await back.getProjectsByQuery({
          $or: motherClients.map((o) => { return { cliid: o.cliid } }).concat([
            {
              "process.contract.first.date": {
                $gte: fromDate
              }
            }
          ]),
        }, { selfMongo })).toNormal();
        const motherProjects = motherProjects_raw.filter((obj) => {  return obj.process.contract.first.date.valueOf() >= fromDate.valueOf() && obj.process.contract.first.date.valueOf() < toDate.valueOf() });
        motherProjects.sort((a, b) => { return a.proposal.date.valueOf() - b.proposal.date.valueOf() });
        const standardDate = new Date(JSON.stringify(motherProjects[0].proposal.date).slice(1, -1));
        standardDate.setMonth(standardDate.getMonth() - 3);
        const motherContracts = motherClients_raw.filter((obj) => {
          return motherProjects.map((o) => { return o.cliid }).includes(obj.cliid);
        }).filter((obj) => {
          return obj.analytics.response.status === "진행" && obj.timeline.valueOf() > standardDate.valueOf();
        });
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
    
        thisIdArr = motherClients.map((obj) => { return obj.space.naver }).filter((obj) => { return obj.trim() !== "" });
        response = await requestSystem("https://office.home-liaison.net:3000/naverComplexes", { idArr: thisIdArr }, { headers: { "Content-Type": "application/json" } });
        consultingAparts = equalJson(JSON.stringify(response.data.filter((str) => { return str !== null })));
    
        thisIdArr = motherContracts.map((obj) => { return obj.space.naver }).filter((obj) => { return obj.trim() !== "" });
        response = await requestSystem("https://office.home-liaison.net:3000/naverComplexes", { idArr: thisIdArr }, { headers: { "Content-Type": "application/json" } });
        contractAparts = equalJson(JSON.stringify(response.data.filter((str) => { return str !== null })));
    
        usersArr = equalJson(JSON.stringify(motherClientsAnalytics.map((o) => { return o.data.detail }).flat()));
    
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
    
        for (let clientObj of finalContractSet.original) {
          foundProject = motherProjects.find((o) => { return o.proposal.date.valueOf() >= clientObj.timeline.valueOf() && o.cliid === clientObj.cliid });
          clientObj.thisProject = foundProject === undefined ? null : foundProject;
        }
        finalContractSet.original = finalContractSet.original.filter((c) => { return c.thisProject !== null });
    
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
    
        res.send(JSON.stringify(finalObject));
    
      } catch (e) {
         
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    router.post([ "/receiveSms" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      const selfMongo = instance.mongolocal;
      const idKeyword = "sms_";
      const collection = "accountSms";
      try {
        const { date, amount, name } = equalJson(req.body);
        const obj = {
          id: idKeyword + String(date.valueOf()) + "_" + String(amount),
          date,
          amount,
          name
        }
        rows = await back.mongoRead(collection, { id: obj.id }, { selfMongo });
        if (rows.length === 0) {
          await requestSystem("https://" + instance.address.officeinfo.host + ":3002/smsParsing", { date: obj.date, amount: obj.amount, name: obj.name }, { headers: { "Content-Type": "application/json" } });
          await back.mongoCreate(collection, obj, { selfMongo });
          await sleep(500);
        }
        res.send(JSON.stringify({ message: "done" }));
    
      } catch (e) {
         
    
        const { date, amount, name } = equalJson(req.body);
        const obj = {
          id: idKeyword + String(date.valueOf()) + "_" + String(amount),
          date,
          amount,
          name
        }
        rows = await back.mongoRead(collection, { id: obj.id }, { selfMongo });
        if (rows.length === 0) {
          await requestSystem("https://" + instance.address.officeinfo.host + ":3002/smsParsing", { date: obj.date, amount: obj.amount, name: obj.name }, { headers: { "Content-Type": "application/json" } });
          await back.mongoCreate(collection, obj, { selfMongo });
          await sleep(500);
        }
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    router.post([ "/refreshDesignerCareer" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      const selfMongo = instance.mongo;
      try {
        const designers = await back.getDesignersByQuery({}, { selfMongo });
        const future = new Date(3000, 0, 1);
        const futureValue = future.valueOf();
        let targetDate;
        let targetYear, targetMonth;
        let whereQuery, updateQuery;
        let updateQuery2;
        let relatedY, relatedM;
        let dateValue;
        let monthDelta;
        for (let designer of designers) {
    
          targetDate = new Date(JSON.stringify(designer.information.contract.date).slice(1, -1));
          targetYear = targetDate.getFullYear();
          targetMonth = targetDate.getMonth() + 1;
          whereQuery = {};
          whereQuery["desid"] = designer.desid;
          updateQuery = {};
          updateQuery["information.business.career.startY"] = targetYear;
          updateQuery["information.business.career.startM"] = targetMonth;
          await back.updateDesigner([ whereQuery, updateQuery ], { selfMongo });
    
          if (designer.information.business.career.detail.length > 0) {
            dateValue = 0;
            for (let obj of designer.information.business.career.detail) {
              if (!/기타 업무/gi.test(obj.tag)) {
                if (obj.date.end.valueOf() > futureValue) {
                  dateValue += (new Date()).valueOf() - obj.date.start.valueOf();
                } else {
                  dateValue += obj.date.end.valueOf() - obj.date.start.valueOf();
                }
              }
            }
            monthDelta = Math.floor(((((dateValue / 1000) / 60) / 60) / 24) / 30);
            relatedY = Math.floor(monthDelta / 12);
            relatedM = monthDelta % 12;
            updateQuery2 = {};
            updateQuery2["information.business.career.relatedY"] = relatedY;
            updateQuery2["information.business.career.relatedM"] = relatedM;
            await back.updateDesigner([ whereQuery, updateQuery2 ], { selfMongo });
          }
    
        }
    
        await logger.cron("refresh designer career success : " + JSON.stringify(new Date()));
        res.send(JSON.stringify({ message: "done" }));
    
      } catch (e) {
         
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    router.post([ "/mysqlReflection" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        const selfMongo = instance.mongo;
        const intoMysql = async (thisSqueeze) => {
          let tableReady;
          let boo;
          let safeNum;
          let injectionValues;
          let injectionBoo;
          let retryBoo;
          try {
      
            tableReady = async (model) => {
              let res;
              try {
                res = await mysqlQuery(model.getDropSql(), { center: true });
                if (res.message === "done") {
                  res = await mysqlQuery(model.getCreateSql(), { center: true });
                  if (res.message !== "done") {
                    throw new Error("create fail");
                  }
                } else {
                  throw new Error("drop fail");
                }
                return true;
              } catch (e) {
                if (e.message === "create fail") {
                  console.log(e);
                  return false;
                } else {
                  try {
                    res = await mysqlQuery(model.getCreateSql(), { center: true });
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
            injectionValues = async (data) => {
              let queryList;
              let queryResult;
              try {
                queryList = data.getInsertSql();
                queryResult = await mysqlQuery(queryList, { center: true });
                if (queryResult.message !== "done") {
                  throw new Error("insert fail");
                }
                return true;
              } catch (e) {
                console.log(e);
                return false;
              }
            }
      
            boo = await tableReady(thisSqueeze.model);
            safeNum = 0;
            while (!boo) {
              if (safeNum > 10) {
                break;
              }
              await sleep(3000);
              boo = await tableReady(thisSqueeze.model);
              safeNum++;
            }
      
            if (boo) {
              injectionBoo = await injectionValues(thisSqueeze.data);
              if (!injectionBoo) {
                await sleep(3000);
                retryBoo = await intoMysql(thisSqueeze);
                if (retryBoo) {
                  return true;
                } else {
                  throw new Error("retry fail");
                }
              }
            }
      
            return true;
          } catch (e) {
            console.log(e);
            return false;
          }
        }
    
        (async () => {
          try {
            let clients, designers, projects, aspirants;
            let resultBoo;
    
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
    
            await logger.cron("core db mysql reflection success : " + JSON.stringify(new Date()));
    
            return true;
          } catch (e) {
            logger.error(e, req).catch((e) => { console.log(e); });
            return false;
          }
        })().catch((err) => {
          logger.error(err, req).catch((e) => { console.log(e); });
          console.log(err);
        });
    
        res.send(JSON.stringify({ message: "will do" }));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    router.post([ "/hahaDropClients" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        const selfMongo = instance.mongo;
        const selfConsoleMongo = instance.mongo;
        const targetClients = await back.getClientsByQuery({
          requests: {
            $elemMatch: {
              "analytics.response.status": {
                $regex: "^[응]"
              }
            }
          }
        }, { selfMongo });
        const now = new Date();
        const ago = new Date();
        const delta = 14;
        const emptyDate = new Date(2000, 0, 1);
        const emptyDateValue = emptyDate.valueOf();
        let thisHistories;
        let historyWhereQuery;
        let resultArr;
        let hahaTargetClients;
        let thisHistory;
        let hahaList;
        let index;
        let proposals;
        let totalProposals;
        let boo;
        let whereQuery, updateQuery;
    
        ago.setDate(ago.getDate() - delta);
    
        if (targetClients.length > 0) {
    
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
              haha: send.filter((obj) => { return obj.page === "lowLowPush" }),
            })
          }
    
          hahaTargetClients = targetClients.toNormal().filter((client) => { return resultArr.filter((o) => { return o.haha.length > 0 }).map((c) => { return c.cliid }).includes(client.cliid) });
    
          for (let client of hahaTargetClients) {
            thisHistory = resultArr.find((c) => { return c.cliid === client.cliid });
            thisHistory.haha.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });
            client.haha = equalJson(JSON.stringify(thisHistory.haha));
            client.manager = thisHistory.manager;
          }
    
          if (hahaTargetClients.length > 0) {
            totalProposals = await back.getProjectsByQuery({ $or: hahaTargetClients.map((c) => { return { cliid: c.cliid } }) }, { selfMongo });
    
            for (let client of hahaTargetClients) {
              index = 0;
              for (let { request, analytics } of client.requests) {
                hahaList = client.haha.filter((o) => { return o.date.valueOf() >= request.timeline.valueOf() });
                if (hahaList.length > 0) {
                  if (client.requests[index - 1] !== undefined) {
                    hahaList = hahaList.filter((o) => { return o.date.valueOf() <= client.requests[index - 1].request.timeline.valueOf() });
                  }
                  if (hahaList.length > 0) {
                    if (hahaList[0].date.valueOf() <= ago.valueOf()) {
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
                        proposals = proposals.filter((p) => { return p.process.contract.first.date.valueOf() > emptyDateValue && !/드랍/gi.test(p.process.status) })
                        boo = (proposals.length === 0);
                      }
    
                      if (boo) {
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
    
        await logger.cron("haha drop clints success : " + JSON.stringify(new Date()));
    
        res.send(JSON.stringify({ message: "done" }));
      } catch (e) {
         
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    router.post([ "/syncDesignProposal" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        const selfMongo = instance.mongo;
        const downloadDesignProposal = async (selfMongo, logger = null) => {
          try {
            const targetRoot = staticConst + "/designProposal/image";
            const toNormal = true;
            const endPoint = "https://" + address.secondinfo.host + ":" + String(3003);
            const config = { headers: { "Content-Type": "application/json" } };
            const userName = "ubuntu";
            const scpRoot = userName + "@" + address.secondinfo.host + ":"
            const scpPath = scpRoot + "/home/" + userName + "/static/photo/designer";
            const representativeFolderPath = "/representative";
            const representativeRootPath = "/photo/designer" + representativeFolderPath;
            const indexToken = "____index____";
            const digitStandard = 5;
            const designers = await back.getDesignersByQuery({}, { selfMongo, toNormal });
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
      
            rootFolderStatus = await fileSystem(`readFolder`, [ targetRoot ]);
            for (let designer of designers) {
              if (!rootFolderStatus.includes(designer.desid)) {
                await shellExec(`mkdir`, [ `${targetRoot}/${designer.desid}` ]);
              }
            }
      
            response = await requestSystem(endPoint + "/designerWorksList", { mode: "entire" }, config);
            [ result0, result1, result2, result3, worksInfo ] = response.data;
      
            result0Path = worksInfo[1] + "/" + worksInfo[2][0]
            result1Path = worksInfo[1] + "/" + worksInfo[2][1]
            result2Path = worksInfo[1] + "/" + worksInfo[2][2]
            result3Path = worksInfo[1] + "/" + worksInfo[2][3]
      
            worksFiles = [];
            worksFiles = worksFiles.concat(result0.map((obj) => { return { desid: obj.desid, file: result0Path + "/" + obj.file.name } }));
            worksFiles = worksFiles.concat(result1.map((obj) => { return { desid: obj.desid, file: result1Path + "/" + obj.file.name } }));
            worksFiles = worksFiles.concat(result2.map((obj) => { return { desid: obj.desid, file: result2Path + "/" + obj.file.name } }));
            worksFiles = worksFiles.concat(result3.map((obj) => { return { desid: obj.desid, file: result3Path + "/" + obj.file.name } }));
      
            for (let designer of designers) {
              desid = designer.desid;
              thisFolderPath = targetRoot + "/" + desid + "/";
              thisFolderContents_past = await fileSystem(`readFolder`, [ thisFolderPath ]);
              thisFolderContents_past = thisFolderContents_past.map((s) => {
                let original;
                let pureFileName;
                let originalTempArr;
      
                originalTempArr = s.split(indexToken);
                if (originalTempArr.length >= 2) {
                  original = originalTempArr[1];
                  if (original === undefined) {
                    throw new Error("something wrong => " + desid + " / " + s)
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
      
              // projects
              response = await requestSystem(endPoint + "/middlePhotoRead", { target: "/" + desid }, config);
              targetProjects = response.data.filter((s) => { return /^p/gi.test(s) });
              for (let proid of targetProjects) {
                response = await requestSystem(endPoint + "/middlePhotoRead", { target: "/" + desid + "/" + proid }, config);
                fileTargets = response.data.filter((s) => { return !/^firstPhoto/gi.test(s) }).filter((s) => { return !/^quarterPhoto/gi.test(s) }).filter((s) => { return !/^middlePhoto/gi.test(s) }).filter((s) => { return /jpg$/gi.test(s) || /jpeg$/gi.test(s) || /png$/gi.test(s) || /pdf$/gi.test(s) });
                for (let fileName of fileTargets) {
                  thisFileName = fileName;
                  thisFilePureName = thisFileName.split(".")[0];
                  thisFileExe = thisFileName.split(".")[thisFileName.split(".").length - 1];
                  thisFilePath = thisFolderPath + thisFileName;
                  downloadPath = scpPath + "/" + desid + "/" + proid + "/" + fileName;
                  if (!thisFolderContents_past.map((o) => { return new RegExp(o.pure, "g") }).some((r) => { return r.test(thisFilePureName) })) {
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
              }
      
              // representative
              response = await requestSystem(endPoint + "/readFolder", { path: representativeRootPath + "/" + desid }, config);
              representativeFiles = response.data.filter((s) => { return /jpg$/gi.test(s) || /jpeg$/gi.test(s) || /png$/gi.test(s) || /pdf$/gi.test(s) }).map((s) => { return scpPath + representativeFolderPath + "/" + desid + "/" + s });
              for (let downloadPath of representativeFiles) {
                thisFileName = downloadPath.split("/")[downloadPath.split("/").length - 1];
                thisFilePureName = thisFileName.split(".")[0];
                thisFileExe = thisFileName.split(".")[thisFileName.split(".").length - 1];
                thisFilePath = thisFolderPath + thisFileName;
                if (!thisFolderContents_past.map((o) => { return new RegExp(o.pure, "g") }).some((r) => { return r.test(thisFilePureName) })) {
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
      
              // works files
              worksFilesTargets = worksFiles.filter((o) => { return o.desid === desid });
              worksFilesTargets = worksFilesTargets.map((o) => { return scpRoot + o.file });
              for (let downloadPath of worksFilesTargets) {
                thisFileName = downloadPath.split("/")[downloadPath.split("/").length - 1];
                thisFilePureName = thisFileName.split(".")[0];
                thisFileExe = thisFileName.split(".")[thisFileName.split(".").length - 1];
                thisFilePath = thisFolderPath + thisFileName;
                if (!thisFolderContents_past.map((o) => { return new RegExp(o.pure, "g") }).some((r) => { return r.test(thisFilePureName) })) {
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
                    arr = newString.split("__split__")
                    dateString = arr[2];
                  } else {
                    arr = newString.split("_")
                    dateString = arr[1];
                  }
                  pastBoo = true;
                } else {
                  if (/__split__/gi.test(s)) {
                    arr = s.split("__split__")
                    dateString = arr[2];
                  } else {
                    arr = s.split("_")
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
                }
              })
              thisFolderContents.sort((a, b) => { return a.date.valueOf() - b.date.valueOf() });
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
        downloadDesignProposal(selfMongo, logger).then((boo) => {
          if (boo) {
            return logger.cron("sync design proposal success : " + JSON.stringify(new Date()));
          } else {
            return logger.alert("sync design proposal fail");
          }
        }).catch((err) => {
          logger.error(err, req).catch((e) => { console.log(e); });
        });
        res.send(JSON.stringify({ message: "will do" }));
      } catch (e) {
         
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    router.post([ "/listDesignProposal" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        if (req.body.mode === undefined) {
          throw new Error("invalid post");
        }
        const { mode } = req.body;
        const targetPath = "/designProposal/image";
        const targetRoot = staticConst + targetPath;
        let rows;
        let resultObj;
        let targetDesidArr;
    
        if (mode === "pick" || mode === "get") {
          const { desid } = equalJson(req.body);
          if (!(await fileSystem("exist", [ targetRoot + "/" + desid ]))) {
            res.send(JSON.stringify({ data: [] }));
          } else {
            rows = await fileSystem("readFolder", [ targetRoot + "/" + desid ]);
            rows = rows.map((str) => { return linkToString(`${targetPath}/${desid}/${str}`) });
            res.send(JSON.stringify({ data: objectDeepCopy(rows) }));
          }
    
        } else if (mode === "all") {
    
          resultObj = {};
          targetDesidArr = await fileSystem("readFolder", [ targetRoot ]);
    
          for (let desid of targetDesidArr) {
            resultObj[desid] = [];
            rows = await fileSystem("readFolder", [ targetRoot + "/" + desid ]);
            rows = rows.map((str) => { return linkToString(`${targetPath}/${str}`) });
            resultObj[desid] = objectDeepCopy(rows);
          }
    
          res.send(JSON.stringify({ data: resultObj }));
    
        } else {
          throw new Error("invalid post");
        }
      } catch (e) {
         
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    router.post([ "/imageTransfer" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        if (req.body.mode === undefined) {
          throw new Error("invalid post");
        }
        const { mode } = req.body;
        const collection = "imageTransfer";
        const selfCoreMongo = instance.mongo;
        const selfMongo = instance.mongolocal;
        const idKeyword = "image_trans_";
        let json;
        let thisId;
        let now;
        let imagesArr;
        let thisPath;
        let finalPath;
        let thisDesigner, thisClient, thisMember;
        let tempObj;
        let thisSrc, finalSrc;
        let rows;
        let targetJson;
        let client;
        let purpose;
        let host;
        let path;
        let cliid;
        let historyArr;
        let proidArr;
        let designer, type;
    
        if (mode === "store") {
          if (req.body.cliid === undefined || req.body.desid === undefined || req.body.info === undefined || req.body.purpose === undefined || req.body.description === undefined || req.body.member === undefined || req.body.images === undefined) {
            throw new Error("invalid post 2");
          }
          const { cliid, purpose, description, member, images, desid, info } = equalJson(req.body);
    
          now = new Date();
          thisId = idKeyword + String(now.valueOf()) + "_" + uniqueValue("hex");
    
          imagesArr = [];
          for (let { absolute: rawPath, src: rawSrc } of images) {
            thisPath = rawPath.replace(/^\//i, '').replace(/\/$/i, '');
            if (thisPath.trim() === '') {
              finalPath = sambaToken;
            } else {
              finalPath = thisPath;
            }
            if (!/^__/.test(finalPath)) {
              finalPath = sambaToken + "/" + finalPath;
            }
    
            thisSrc = rawSrc.replace(/^\//i, '').replace(/\/$/i, '');
            if (thisSrc.trim() === '') {
              finalSrc = sambaToken;
            } else {
              finalSrc = thisSrc;
            }
            if (!/^__/.test(finalSrc)) {
              finalSrc = sambaToken + "/" + finalSrc;
            }
    
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
            id: member,
            name: "리에종",
            title: "봇",
            roles: [],
          }
    
          if (desid === "") {
            thisDesigner = {
              desid: desid,
              designer: "",
              phone: "",
            };
          } else {
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
            throw new Error("invalid cliid 0");
          }
          tempObj = await back.getClientById(cliid, { selfMongo: selfCoreMongo });
          if (tempObj === null) {
            throw new Error("invalid cliid 1");
          }
          thisClient = {
            cliid: cliid,
            name: tempObj.name,
            phone: tempObj.phone,
          }
    
          proidArr = [];
          if (typeof req.body.proid === "string") {
            proidArr.push(req.body.proid);
          }
    
          json = {
            id: thisId,
            date: now,
            from: thisMember,
            target: thisClient,
            contents: {
              designer: thisDesigner,
              purpose,
              description,
              info,
            },
            images: imagesArr,
            history: [],
            proposals: proidArr,
          };
    
          await back.mongoCreate(collection, json, { selfMongo });
    
          res.send(JSON.stringify({ id: thisId }));
    
        } else if (mode === "copy") {
    
          const { cliid, id, purpose, description, member } = equalJson(req.body);
          [ targetJson ] = await back.mongoRead(collection, { id }, { selfMongo });
    
          now = new Date();
          thisId = idKeyword + String(now.valueOf()) + "_" + uniqueValue("hex");
    
          imagesArr = equalJson(JSON.stringify(targetJson.images))
    
          thisMember = {
            id: member,
            name: "리에종",
            title: "봇",
            roles: [],
          }
    
          if (cliid === "") {
            throw new Error("invalid cliid 0");
          }
          tempObj = await back.getClientById(cliid, { selfMongo: selfCoreMongo });
          if (tempObj === null) {
            throw new Error("invalid cliid 1");
          }
          thisClient = {
            cliid: cliid,
            name: tempObj.name,
            phone: tempObj.phone,
          }
    
          proidArr = [];
          if (typeof req.body.proid === "string") {
            proidArr.push(req.body.proid);
          }
    
          json = {
            id: thisId,
            date: now,
            from: thisMember,
            target: thisClient,
            contents: {
              designer: equalJson(JSON.stringify(targetJson.contents.designer)),
              purpose,
              description,
              info: equalJson(JSON.stringify(targetJson.contents.info)),
            },
            images: imagesArr,
            history: [],
            proposals: proidArr,
          };
    
          await back.mongoCreate(collection, json, { selfMongo });
    
          res.send(JSON.stringify({ id: thisId }));
    
        } else if (mode === "get") {
    
          if (req.body.id === undefined) {
            throw new Error("invalid post");
          }
          const { id, view } = equalJson(req.body);
          rows = await back.mongoRead(collection, { id }, { selfMongo });
          if (rows.length === 1) {
            [ targetJson ] = rows;
    
            thisDesigner = await back.getDesignerById(targetJson.contents.designer.desid, { selfMongo: selfCoreMongo, toNormal: true });
            thisClient = await back.getClientById(targetJson.target.cliid, { selfMongo: selfCoreMongo, toNormal: true });
    
            if (view !== 1 && view !== "1") {
              historyArr = equalJson(JSON.stringify(targetJson.history));
              historyArr.unshift({
                action: "view",
                date: new Date(),
              });
              await back.mongoUpdate(collection, [ { id }, { history: historyArr } ], { selfMongo });
              targetJson.history = historyArr;
            }
    
            res.send(JSON.stringify({
              data: targetJson,
              client: thisClient,
              designer: thisDesigner,
            }));
          } else {
            throw new Error("invalid id");
          }
    
        } else if (mode === "list") {
    
          if (req.body.whereQuery === undefined) {
            throw new Error("invalid post");
          }
          const { whereQuery } = equalJson(req.body);
          rows = await back.mongoRead(collection, whereQuery, { selfMongo });
          res.send(JSON.stringify({
            data: rows,
          }));
    
        } else if (mode === "proposal") {
    
          if (req.body.proid === undefined) {
            throw new Error("invalid post");
          }
          const { proid } = equalJson(req.body);
          rows = await back.mongoRead(collection, { proposals: { $elemMatch: { $regex: proid } } }, { selfMongo });
          res.send(JSON.stringify(rows));
    
        } else if (mode === "send") {
    
          if (req.body.id === undefined) {
            throw new Error("invalid post");
          }
          const { id } = equalJson(req.body);
          rows = await back.mongoRead(collection, { id }, { selfMongo });
          if (rows.length === 1) {
            [ targetJson ] = rows;
    
            client = targetJson.target.name;
            designer = targetJson.contents.designer.designer;
            purpose = targetJson.contents.designer.designer + " " + targetJson.contents.purpose;
            host = address.frontinfo.host;
            path = "transfer";
            cliid = targetJson.target.cliid;
            type = (/포트폴리오/gi.test(targetJson.contents.purpose) ? "포트폴리오" : (/제안/gi.test(targetJson.contents.purpose) ? "디자인 제안" : targetJson.contents.purpose));
    
            historyArr = equalJson(JSON.stringify(targetJson.history));
            historyArr.unshift({
              action: "send",
              date: new Date(),
            });
            await back.mongoUpdate(collection, [ { id }, { history: historyArr } ], { selfMongo });
    
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
    
            res.send(JSON.stringify({ message: "done" }));
    
          } else {
            throw new Error("invalid id");
          }
    
        } else {
          throw new Error("invalid mode");
        }
    
      } catch (e) {
         
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    router.post([ "/metaAccountCheck" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        const boo = await facebook.accountStatusCheck(logger);
        if (!boo) {
          throw new Error("meta account error");
        }
        res.send(JSON.stringify({ message: "done" }));
      } catch (e) {
         
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    router.post([ "/orderPhotoSync" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        const { pid, data } = equalJson(req.body);
        const corePortfolio = staticConst + "/corePortfolio";
        const listImageDesktop = corePortfolio + "/" + "listImage" + "/" + pid;
        const listImageMobile = corePortfolio + "/" + "listImage" + "/" + pid + "/mobile";
        const original = corePortfolio + "/" + "original" + "/" + pid;
        const tempDir = process.env.HOME + "/temp" + uniqueValue("hex");
        const serverFolderPath = "corePortfolio/listImage";
        const serverFolderPathOriginal = "corePortfolio/original";
        let fromArr, toArr;
        let originalList;
        let outputFolderList;
        let outputMobildFolderList;
        let numbers, num;
    
        numbers = [];
        for (let { fromIndex, toIndex } of data) {
          await shellExec("cp", [ (original + "/i" + String(fromIndex) + pid + ".jpg"), (original + "/middle_i" + String(toIndex) + pid + ".jpg") ]);
          await shellExec("cp", [ (listImageDesktop + "/t" + String(fromIndex) + pid + ".jpg"), (listImageDesktop + "/middle_t" + String(toIndex) + pid + ".jpg") ]);
          await shellExec("cp", [ (listImageMobile + "/mot" + String(fromIndex) + pid + ".jpg"), (listImageMobile + "/middle_mot" + String(toIndex) + pid + ".jpg") ]);
          numbers.push(toIndex);
        }
        for (let toIndex of numbers) {
          await shellExec("mv", [ (original + "/middle_i" + String(toIndex) + pid + ".jpg"), (original + "/i" + String(toIndex) + pid + ".jpg") ]);
          await shellExec("mv", [ (listImageDesktop + "/middle_t" + String(toIndex) + pid + ".jpg"), (listImageDesktop + "/t" + String(toIndex) + pid + ".jpg") ]);
          await shellExec("mv", [ (listImageMobile + "/middle_mot" + String(toIndex) + pid + ".jpg"), (listImageMobile + "/mot" + String(toIndex) + pid + ".jpg") ]);
        }
        await shellExec("mkdir", [ tempDir ]);
        await shellExec("cp", [ "-r", listImageDesktop, tempDir + "/" ]);
        await shellExec("mv", [ tempDir + "/" + pid, tempDir + "/portp" + pid ]);
        await shellExec(`cp -r ${shellLink(tempDir + "/portp" + pid)} /home/ubuntu/samba/list_image/`);
        await shellExec("rm", [ "-rf", tempDir ]);
    
        fromArr = [];
        toArr = [];
        originalList = await fileSystem(`readFolder`, [ original ]);
        outputFolderList = await fileSystem(`readFolder`, [ listImageDesktop ]);
        outputMobildFolderList = await fileSystem(`readFolder`, [ listImageMobile ]);
        
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
    
        await ghostFileUpload(fromArr, toArr);
    
        res.send(JSON.stringify({ message: "done" }));
      } catch (e) {
         
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    router.post([ "/rawToRaw" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        const { portfolioConst } = instance;
        const hangul = instance.hangul;
        const image = instance.imageReader;
        const form = instance.formidable({ multiples: true, encoding: "utf-8", maxFileSize: (9000 * 1024 * 1024) });
        form.parse(req, async function (err, fields, files) {
          try {
            if (err) {
              throw new Error(err);
            } else {
              const toArr = JSON.parse(fields.toArr).map((path) => { return hangul.fixString(path); });
              let filesKey, fromArr, num;
              let tempArr, tempString, tempDir;
              let thisFileName;
              let thisFileExe;
              let targetFileName;
              let designer, client;
    
              filesKey = Object.keys(files);
              filesKey.sort((a, b) => {
                return Number(a.replace(/[^0-9]/gi, '')) - Number(b.replace(/[^0-9]/gi, ''));
              });
    
              fromArr = [];
              for (let key of filesKey) {
                fromArr.push(files[key]);
              }
              await shellExec("rm", [ "-rf", portfolioConst ]);
              await shellExec("mkdir", [ portfolioConst ]);
    
              designer = fields.designer;
              if (fields.client === undefined || fields.client === null) {
                client = null;
              } else {
                client = fields.client;
              }
    
              (async () => {
                num = 0;
                for (let { filepath: path } of fromArr) {
                  tempArr = toArr[num].split("/");
                  thisFileName = tempArr[tempArr.length - 1];
                  thisFileExe = thisFileName.split(".")[thisFileName.split(".").length - 1];
                  tempString = portfolioConst;
                  if (tempArr.length === 0) {
                    throw new Error("invaild to array");
                  }
                  for (let i = 0; i < tempArr.length - 1; i++) {
                    tempDir = await fileSystem(`readDir`, [ tempString ]);
                    if (!tempDir.includes(tempArr[i]) && tempArr[i] !== "") {
                      await shellExec(`mkdir ${shellLink(tempString + "/" + tempArr[i])}`);
                    }
                    tempString += '/';
                    tempString += tempArr[i];
                  }
    
                  targetFileName = tempString + "/" + toArr[num].replace(/^\//i, '');
                  await shellExec(`mv ${shellLink(path)} ${shellLink(targetFileName)}`);
                  await image.overOfficialImage(targetFileName);
                  num++;
                }
    
                await requestSystem("https://" + address.officeinfo.ghost.host + ":" + String(3000) + "/rawToRawExcute", {
                  designer, client
                }, { headers: { "Content-Type": "application/json" } });
    
              })().catch((err) => {
                logger.error(err, req).catch((e) => { console.log(e); });
              })
    
              res.send(JSON.stringify({ "message": "will do" }));
            }
          } catch (e) {
            logger.error(e, req).catch((e) => { console.log(e); });
            res.send(JSON.stringify({ message: "error : " + e.message }));
          }
        });
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    router.post([ "/rawToRawExcute" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        if (req.body.requestArr === undefined) {
          if (req.body.designer === undefined) {
            throw new Error("invalid post");
          }
          const channel = "#502_sns_contents";
          const voice = false;
          const { designer: designerRaw } = equalJson(req.body);
          let client, designer, pay;
          let thisSetName;
    
          client = ((typeof req.body.client === "string" && req.body.client !== "null") ? req.body.client.trim() : null);
          designer = designerRaw.trim();
          pay = true;
    
          if (client !== null) {
            thisSetName = `${client} C, ${designer} D 현장 원본 사진`;
          } else {
            thisSetName = `${designer} D 개인 포트폴리오 사진`;
          }
    
          await messageSend({ text: thisSetName + " 처리를 시작합니다. 슬렉에 처리 성공 또는 실패 알림이 올 때까지 다음 원본 사진 처리요청을 하지 말아주세요!", channel, voice });
          filter.rawToRaw([
            {
              client,
              designer,
              pay
            }
          ]).then((boo) => {
            if (boo) {
              return messageSend({ text: thisSetName + " 처리를 성공적으로 완료하였어요!", channel, voice });
            } else {
              return messageSend({ text: thisSetName + " 처리에 실패하였어요, 다시 시도해주세요!", channel, voice });
            }
          }).catch((err) => {
            logger.error(err, req).catch((e) => { console.log(e); });
          });
        } else {
          const requestArr = equalJson(req.body.requestArr);
          let client, designer, pay;
          let tong;
    
          tong = [];
          for (let obj of requestArr) {
            client = obj.client;
            deisnger = obj.deisnger;
            pay = true;
            tong.push(objectDeepCopy({
              client,
              deisnger,
              pay
            }));
          }
    
          filter.rawToRaw([
            {
              client,
              deisnger,
              pay
            }
          ]).catch((err) => {
            logger.error(err, req).catch((e) => { console.log(e); });
          });
        }
        res.send(JSON.stringify({ message: "will do" }));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    router.post([ "/updateRawInfo" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        const rawToRawProcessDoingToken = process.env.HOME + "/" + "__rawToRawProcessDoingToken__.token";
        const selfMongo = instance.mongo;
        const channel = "#502_sns_contents";
        const voice = false;
        let client, designer, project;
        let thisSetName;
        let keyFolderList;
        let keyFolder;
        let nowValue;
    
        if (await fileSystem("exist", [ rawToRawProcessDoingToken ])) {
          const { key } = equalJson(req.body);
          keyFolder = `${staticConst}/temp/${key}`;
          await sleep(500);
          await shellExec("rm", [ "-rf", keyFolder ]);
          await messageSend({ text: "다른 원본 사진 처리가 진행중입니다. 끝날 때까지 기다려주세요!", channel, voice });
          res.send(JSON.stringify({ message: "will do" }));
        } else {
    
          await fileSystem("writeString", [ rawToRawProcessDoingToken, "doing" ]);
          if (req.body.designer !== undefined && req.body.individual === "true") {
    
            const { key, designer, desid, rawBody } = equalJson(req.body);
    
            keyFolder = `${staticConst}/temp/${key}`;
            thisSetName = `${designer} D 개인 포트폴리오 원본 사진`;
      
            nowValue = dateToString(new Date(), true).replace(/[^0-9]/gi, '');
    
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
      
            await shellExec("rm", [ "-rf", portfolioConst ]);
            await shellExec("mkdir", [ portfolioConst ]);
            keyFolderList = await fileSystem("readFolder", [ keyFolder ]);
            for (let photoName of keyFolderList) {
              if (/\.jp[e]?g$/gi.test(photoName)) {
                await shellExec("mv", [ keyFolder + "/" + photoName, portfolioConst + "/" ]);
              }
            }
            await sleep(500);
            await shellExec("rm", [ "-rf", keyFolder ]);
            await messageSend({ text: thisSetName + " 처리를 시작합니다. 슬렉에 처리 성공 또는 실패 알림이 올 때까지 다음 원본 사진 처리요청을 하지 말아주세요!", channel, voice });
            filter.rawToRaw([
              {
                desid,
                individual: true,
              }
            ]).then((pid) => {
              if (typeof pid === "string") {
                return requestSystem("https://" + instance.address.officeinfo.ghost.host + ":3000/rawUpdateSubject", {
                  pid,
                  individual: ("individual_" + nowValue),
                }, { headers: { "Content-Type": "application/json" } });
              } else {
                return messageSend({ text: thisSetName + " 처리에 실패하였어요, 다시 시도해주세요!", channel, voice });
              }
            }).then(() => {
              return sleep(60 * 1000 * 3);
            }).then(() => {
              return shellExec("rm", [ "-rf", rawToRawProcessDoingToken ]);
            }).then(() => {
              return filter.chmodReload();
            }).catch((err) => {
              logger.error(err, req).catch((e) => { console.log(e); });
            });
      
            res.send(JSON.stringify({ message: "will do" }));
    
          } else {
    
            const { key, proid, desid, cliid, rawBody } = equalJson(req.body);
    
            keyFolder = `${staticConst}/temp/${key}`;
    
            [ client ] = await back.mongoRead("client", { cliid }, { selfMongo });
            [ designer ] = await back.mongoRead("designer", { desid }, { selfMongo });
            [ project ] =  await back.mongoRead("project", { proid }, { selfMongo });
            thisSetName = `${client.name} C, ${designer.designer} D 현장 원본 사진`;
    
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
    
            await shellExec("rm", [ "-rf", portfolioConst ]);
            await shellExec("mkdir", [ portfolioConst ]);
            keyFolderList = await fileSystem("readFolder", [ keyFolder ]);
            for (let photoName of keyFolderList) {
              if (/\.jp[e]?g$/gi.test(photoName)) {
                await shellExec("mv", [ keyFolder + "/" + photoName, portfolioConst + "/" ]);
              }
            }
            await sleep(500);
            await shellExec("rm", [ "-rf", keyFolder ]);
            await messageSend({ text: thisSetName + " 처리를 시작합니다. 슬렉에 처리 성공 또는 실패 알림이 올 때까지 다음 원본 사진 처리요청을 하지 말아주세요!", channel, voice });
            filter.rawToRaw([
              {
                cliid,
                desid,
                proid,
              }
            ]).then((pid) => {
              if (typeof pid === "string") {
                return requestSystem("https://" + instance.address.officeinfo.ghost.host + ":3000/rawUpdateSubject", {
                  pid
                }, { headers: { "Content-Type": "application/json" } });
              } else {
                return messageSend({ text: thisSetName + " 처리에 실패하였어요, 다시 시도해주세요!", channel, voice });
              }
            }).then(() => {
              return sleep(60 * 1000 * 3);
            }).then(() => {
              return shellExec("rm", [ "-rf", rawToRawProcessDoingToken ]);
            }).then(() => {
              return filter.chmodReload();
            }).catch((err) => {
              logger.error(err, req).catch((e) => { console.log(e); });
            });
    
            res.send(JSON.stringify({ message: "will do" }));
    
          }
    
        }
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    router.post([ "/rawUpdateSubject" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        if (req.body.pid === undefined) {
          throw new Error("invalid post");
        }
        const channel = "#502_sns_contents";
        const voice = false;
        const { pid } = equalJson(req.body);
        let individualKey;
    
        individualKey = null;
        if (req.body.individual !== undefined) {
          individualKey = req.body.individual;
        }
    
        filter.updateSubject(pid, individualKey).then((boo) => {
          if (boo) {
            return messageSend({ text: pid + " update subject 성공", channel, voice });
          } else {
            return messageSend({ text: pid + " update subject 실패", channel, voice });
          }
        }).then(() => {
          return filter.chmodReload();
        }).catch((err) => {
          logger.error(err, req).catch((e) => { console.log(e); });
        });
    
        res.send(JSON.stringify({ message: "will do" }));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    router.post([ "/rawToContents" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        if (req.body.pid === undefined) {
          throw new Error("invalid post");
        }
        const channel = "#502_sns_contents";
        const voice = false;
        const { pid } = equalJson(req.body);
    
        filter.rawToContents(pid, false, (req.body.proid === undefined ? null : req.body.proid)).then((desid) => {
          if (typeof desid === "string") {
            return filter.setDesignerSetting(desid, pid);
          } else {
            return messageSend({ text: pid + " 컨텐츠 자동 발행에 실패하였어요, 다시 시도해주세요!", channel, voice });
          }
        }).then((boo) => {
          if (boo) {
            return messageSend({ text: pid + " 컨텐츠 자동 발행에 성공하였어요!", channel, voice });
          } else {
            return messageSend({ text: pid + " 컨텐츠 자동 발행에 실패하였어요, 다시 시도해주세요!", channel, voice });
          }
        }).then(() => {
          return filter.chmodReload();
        }).catch((err) => {
          logger.error(err, req).catch((e) => { console.log(e); });
        });
        res.send(JSON.stringify({ message: "will do" }));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    router.post([ "/rawRepairOrder" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        if (req.body.pid === undefined) {
          throw new Error("invalid post");
        }
        const channel = "#502_sns_contents";
        const voice = false;
        const { pid } = equalJson(req.body);
    
        filter.rawToContents(pid, true, (req.body.proid === undefined ? null : req.body.proid)).then((boo) => {
          if (boo) {
            return messageSend({ text: pid + " 컨텐츠 순서 조정에 성공하였어요!", channel, voice });
          } else {
            return messageSend({ text: pid + " 컨텐츠 순서 조정에 실패하였어요, 다시 시도해주세요!", channel, voice });
          }
        }).catch((err) => {
          logger.error(err, req).catch((e) => { console.log(e); });
        });
        res.send(JSON.stringify({ message: "will do" }));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    router.post([ "/syncEvaluationContents" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        const collection = "contents";
        const evaluationCollection = "clientEvaluation";
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
            const selfMongo = instance.mongo;
            const selfContentsMongo = instance.mongolocal;
            let contentsArr;
            let rows;
            let target;
            let jsonTarget;
            let jsonString;
            let conid;
            let num;
            let whereQuery, updateQuery;
            let contentsProjectQuery;
    
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
    
            contentsArr = await back.mongoPick(collection, [ {}, contentsProjectQuery ], { selfMongo });
            contentsArr = contentsArr.filter((o) => { return o.proid !== "" });
            contentsArr = contentsArr.filter((o) => { return /999/gi.test(o.contents.review.rid) })
    
            rows = await back.mongoRead(evaluationCollection, {
              $or: contentsArr.map((o) => { return { proid: o.proid } }),
            }, { selfMongo: selfContentsMongo });
    
            num = 0;
            for (let contents of contentsArr) {
              target = rows.find((o) => { return o.proid === contents.proid }) === undefined ? null : rows.find((o) => { return o.proid === contents.proid });
              if (target !== null) {
    
                jsonTarget = objectDeepCopy(target);
                jsonString = jsonToString(jsonTarget);
    
                conid = contents.conid;
    
                whereQuery = { conid };
                updateQuery = {};
    
                updateQuery["contents.review.title.main"] = titleSamples[num % titleSamples.length];
                updateQuery["contents.review.title.sub"] = titleSamples[num % titleSamples.length];
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
    
                if (contents.contents.review.detailInfo.order <= 1000) {
                  updateQuery["contents.review.detailInfo.order"] = Math.round((Number(contents.contents.portfolio.pid.replace(/[^0-9]/gi, '')) * 1000000 / 1000));
                }
                updateQuery["contents.review.detailInfo.photodae"] = objectDeepCopy(contents.contents.portfolio.detailInfo.photodae);
    
                await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo });
    
                num++;
              }
            }
    
            await requestSystem("https://" + address.testinfo.host + ":" + String(3000) + "/frontReflection", { data: null }, { headers: { "Content-Type": "application/json" } });
    
          } catch (e) {
            console.log(e);
          }
        })().catch((err) => {
          console.log(err);
        })
    
        res.send(JSON.stringify({ message: "will do" }));
      } catch (e) {
         
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    router.post([ "/styleCurationTotalMenu" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        const selfMongo = instance.mongo;
        const selfCoreMongo = instance.mongo;
        const unknown = "알 수 없음";
        const selfLogMongo = instance.mongolocal;
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
        const collection = "clientHistory";
        const collection2 = "blackButtonsClick";
        const collection3 = "homeliaisonAnalytics";
        const defaultButton = "consulting";
        let whereQuery, projectQuery;
        let rows, rows2;
        let filteredBlack;
        let thisCliid, curation;
        let selection;
        let resultJson;
        let tong;
        let check;
        let receive;
        let rows3;
        let start;
        let target;
        let thisAnalytics;
        let thisStatus;
        let cliidStatusArr;
    
        if (req.body.mode === undefined || req.body.mode === null || req.body.mode === "get") {
          res.send(JSON.stringify({ totalMenu }));
        } else if (req.body.mode === "dummy") {
          res.send(JSON.stringify({ dummy: dummyData }));
        } else if (req.body.mode === "analytics" || req.body.mode === "parse" || req.body.mode === "parsing") {
          const { cliids, statusArr } = equalJson(req.body);
    
          whereQuery = { $or: cliids.map((cliid) => { return { cliid } }) };
          projectQuery = { "cliid": 1, "curation.image": 1, "curation.check": 1 };
    
          rows = await back.mongoPick(collection, [ whereQuery, projectQuery ], { selfMongo });
          rows2 = await back.mongoRead(collection2, whereQuery, { selfMongo });
    
          whereQuery = { $or: cliids.map((cliid) => { return { "data.cliid": cliid, "action": "pageInit" } }) };
          projectQuery = { "page": 1, "data": 1, "action": 1 };
          rows3 = await back.mongoPick(collection3, [ whereQuery, projectQuery ], { selfMongo: selfLogMongo });
    
          cliidStatusArr = [];
          for (let i = 0; i < cliids.length; i++) {
            cliidStatusArr.push([ cliids[i], statusArr[i] ]);
          }
    
          tong = [];
          for (let obj of rows) {
            thisCliid = obj.cliid;
            thisStatus = cliidStatusArr.find((arr) => { return arr[0] === thisCliid })[1];
    
            curation = objectDeepCopy(obj.curation);
            check = curation.check;
            thisAnalytics = rows3.filter((o) => { return o.data.cliid === thisCliid });
            filteredBlack = rows2.filter((o) => { return o.cliid === thisCliid });
    
            if (filteredBlack.length === 0) {
              selection = defaultButton;
            } else {
              filteredBlack.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });
              selection = filteredBlack[0].mode;
            }
    
            if (thisAnalytics.filter((o) => { return o.page === "styleCuration" }).length === 0) {
              start = "스타일 체크 거부";
              target = "단순 드랍 대상";
            } else {
              start = "스타일 체크 진입";
              target = "1차 응대 대상";
            }
    
            if (/단순 드랍 대상/gi.test(target) || /드랍/gi.test(thisStatus)) {
    
              selection = "응대 불필요";
              receive = "추천 불필요";
    
            } else {
    
              if (/consulting/gi.test(selection)) {
                selection = "상담부터";
                receive = "추천서 받기 전";
                if (thisAnalytics.filter((o) => { return o.page === "designerProposal" }).length > 0) {
                  receive = "자동 추천 받음";
                }
              } else {
                selection = "추천부터";
                receive = "추천서 진입";
                if (thisAnalytics.filter((o) => { return o.page === "designerProposal" }).length === 0) {
                  selection = "상담부터";
                  receive = "자동 추천 받음";
                } else {
                  target = "자동 응대중";
                }
              }
    
            }
    
            resultJson = { cliid: thisCliid, selection, receive };
    
            if (curation.length === 0) {
              resultJson.image = "이미지 선택 거부";
            } else {
              if (thisAnalytics.filter((o) => { return o.page === "styleCuration" }).length === 0) {
                resultJson.image = "이미지 선택 거부";
              } else {
                resultJson.image = "이미지 선택 진행";
              }
            }
            resultJson.service = totalMenu[0].values[Number(check.serid.split("_")[1].replace(/[^0-9]/gi, '')) - 1].title
            resultJson.serid = check.serid;
            if (typeof check.construct.entire === "boolean") {
              resultJson.construct = totalMenu[1].values[check.construct.entire ? 1 : 0].value;
            } else {
              resultJson.construct = totalMenu[1].values[0].value;
            }
            resultJson.constructItems = totalMenu[2].values.filter((o, index) => { return check.construct.items.includes(index) }).map((o) => { return o.title }).join(", ").trim();
            if (resultJson.constructItems === "") {
              resultJson.constructItems = unknown;
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
            tong.push(objectDeepCopy(resultJson));
          }
          res.send(JSON.stringify({ data: tong, dummy: dummyData }));
    
        }
    
      } catch (e) {
         
        res.send(JSON.stringify({ message: "error" }));
      }
    });
    
    router.post([ "/replaceContentsPhoto" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        const osTempFolder = "/tmp";
        const back = instance.back;
        const address = instance.address;
        const image = instance.imageReader;
        const qualityConst = 95;
        const sizeMatrix = [
          [ 1200, 848 ],
          [ 800, 566 ],
        ];
        const collection = "contents";
        const selfMongo = instance.mongo;
        const form = instance.formidable({ multiples: true, encoding: "utf-8", maxFileSize: (9000 * 1024 * 1024) });
        form.parse(req, async function (err, fields, files) {
          try {
            if (err) {
              throw new Error(err);
            } else {
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
    
              pid = fields.pid.trim();
              whereQuery = { "contents.portfolio.pid": pid };
              updateQuery = {};
    
              if (fields.multiple === "false" || fields.multiple === false) {
    
                gs = fields.gs.trim();
                index = Number(fields.index);
    
                filesKey = Object.keys(files);
                filesKey.sort((a, b) => {
                  return Number(a.replace(/[^0-9]/gi, '')) - Number(b.replace(/[^0-9]/gi, ''));
                });
                thisFile = null;
                for (let key of filesKey) {
                  thisFile = files[key];
                }
    
                tempName = "tempReplaceImage" + uniqueValue("hex") + ".jpg";
                thisTempFull = osTempFolder + "/" + tempName;
                tempName2 = "tempReplaceImage" + uniqueValue("hex") + ".jpg";
                thisTempFull2 = osTempFolder + "/" + tempName2;
                tempName3 = "tempReplaceImage" + uniqueValue("hex") + ".jpg";
                thisTempFull3 = osTempFolder + "/" + tempName3;
    
                await shellExec("mv", [ thisFile.filepath, thisTempFull ]);
                await image.overOfficialImage(thisTempFull);
    
                await sleep(50);
    
                await shellExec("cp", [ thisTempFull, thisTempFull2 ]);
                await shellExec("cp", [ thisTempFull, thisTempFull3 ]);
    
                await shellExec("mv", [ thisTempFull, osTempFolder + "/i" + String(index) + pid + ".jpg" ]);
                await shellExec(`convert ${shellLink(thisTempFull2)} -resize ${gs === 's' ? String(sizeMatrix[0][1]) + "x" + String(sizeMatrix[0][0]) : String(sizeMatrix[0][0]) + "x" + String(sizeMatrix[0][1])} -quality ${String(qualityConst)} ${shellLink(osTempFolder + "/t" + String(index) + pid + ".jpg")}`);
                await shellExec(`convert ${shellLink(thisTempFull3)} -resize ${gs === 's' ? String(sizeMatrix[1][1]) + "x" + String(sizeMatrix[1][0]) : String(sizeMatrix[1][0]) + "x" + String(sizeMatrix[1][1])} -quality ${String(qualityConst)} ${shellLink(osTempFolder + "/mot" + String(index) + pid + ".jpg")}`);
    
                await sleep(50);
    
                await shellExec("cp", [ osTempFolder + "/i" + String(index) + pid + ".jpg", staticConst + "/corePortfolio/original/" + pid + "/i" + String(index) + pid + ".jpg" ]);
                await shellExec("cp", [ osTempFolder + "/t" + String(index) + pid + ".jpg", staticConst + "/corePortfolio/listImage/" + pid + "/t" + String(index) + pid + ".jpg" ]);
                await shellExec("cp", [ osTempFolder + "/mot" + String(index) + pid + ".jpg", staticConst + "/corePortfolio/listImage/" + pid + "/mobile/mot" + String(index) + pid + ".jpg" ]);
    
                await sleep(50);
    
                await shellExec("cp", [ "-r", (staticConst + "/corePortfolio/listImage/" + pid + "/t" + String(index) + pid + ".jpg"), staticConst + `/list_image/portp${pid}/` ]);
                await shellExec("cp", [ "-r", (staticConst + "/corePortfolio/listImage/" + pid + "/mobile/mot" + String(index) + pid + ".jpg"), staticConst + `/list_image/portp${pid}/mobile/` ]);
    
                await shellExec("rm", [ "-rf", osTempFolder + "/i" + String(index) + pid + ".jpg" ]);
                await shellExec("rm", [ "-rf", osTempFolder + "/t" + String(index) + pid + ".jpg" ]);
                await shellExec("rm", [ "-rf", osTempFolder + "/mot" + String(index) + pid + ".jpg" ]);
                await shellExec("rm", [ "-rf", thisTempFull2 ]);
                await shellExec("rm", [ "-rf", thisTempFull3 ]);
    
              } else {
                filesKey = Object.keys(files);
                filesKey.sort((a, b) => {
                  return Number(a.replace(/[^0-9]/gi, '')) - Number(b.replace(/[^0-9]/gi, ''));
                });
                thisFiles = [];
                for (let key of filesKey) {
                  thisFiles.push(files[key]);
                }
                (async () => {
    
                  fileNum = 1;
                  photoDetailArr = [];
                  for (let thisFile of thisFiles) {
    
                    await sleep(500);
                    targetInfo = await image.readImage(thisFile.filepath);
                    if (targetInfo.geometry.width >= targetInfo.geometry.height) {
                      gs = "g";
                    } else if (targetInfo.geometry.width < targetInfo.geometry.height) {
                      gs = "s";
                    }
                    await sleep(500);
                    index = fileNum;
                    photoDetailArr.push({ index: index, gs: gs });
    
                    tempName = "tempReplaceImage" + uniqueValue("hex") + ".jpg";
                    thisTempFull = osTempFolder + "/" + tempName;
                    tempName2 = "tempReplaceImage" + uniqueValue("hex") + ".jpg";
                    thisTempFull2 = osTempFolder + "/" + tempName2;
                    tempName3 = "tempReplaceImage" + uniqueValue("hex") + ".jpg";
                    thisTempFull3 = osTempFolder + "/" + tempName3;
        
                    await shellExec("mv", [ thisFile.filepath, thisTempFull ]);
                    await image.overOfficialImage(thisTempFull);
        
                    await sleep(500);
        
                    await shellExec("cp", [ thisTempFull, thisTempFull2 ]);
                    await shellExec("cp", [ thisTempFull, thisTempFull3 ]);
        
                    await shellExec("mv", [ thisTempFull, osTempFolder + "/i" + String(index) + pid + ".jpg" ]);
                    await shellExec(`convert ${shellLink(thisTempFull2)} -resize ${gs === 's' ? String(sizeMatrix[0][1]) + "x" + String(sizeMatrix[0][0]) : String(sizeMatrix[0][0]) + "x" + String(sizeMatrix[0][1])} -quality ${String(qualityConst)} ${shellLink(osTempFolder + "/t" + String(index) + pid + ".jpg")}`);
                    await shellExec(`convert ${shellLink(thisTempFull3)} -resize ${gs === 's' ? String(sizeMatrix[1][1]) + "x" + String(sizeMatrix[1][0]) : String(sizeMatrix[1][0]) + "x" + String(sizeMatrix[1][1])} -quality ${String(qualityConst)} ${shellLink(osTempFolder + "/mot" + String(index) + pid + ".jpg")}`);
        
                    await sleep(500);
        
                    await shellExec("cp", [ osTempFolder + "/i" + String(index) + pid + ".jpg", staticConst + "/corePortfolio/original/" + pid + "/i" + String(index) + pid + ".jpg" ]);
                    await shellExec("cp", [ osTempFolder + "/t" + String(index) + pid + ".jpg", staticConst + "/corePortfolio/listImage/" + pid + "/t" + String(index) + pid + ".jpg" ]);
                    await shellExec("cp", [ osTempFolder + "/mot" + String(index) + pid + ".jpg", staticConst + "/corePortfolio/listImage/" + pid + "/mobile/mot" + String(index) + pid + ".jpg" ]);
        
                    await sleep(500);
        
                    await shellExec("cp", [ "-r", (staticConst + "/corePortfolio/listImage/" + pid + "/t" + String(index) + pid + ".jpg"), staticConst + `/list_image/portp${pid}/` ]);
                    await shellExec("cp", [ "-r", (staticConst + "/corePortfolio/listImage/" + pid + "/mobile/mot" + String(index) + pid + ".jpg"), staticConst + `/list_image/portp${pid}/mobile/` ]);
          
                    await shellExec("rm", [ "-rf", osTempFolder + "/i" + String(index) + pid + ".jpg" ]);
                    await shellExec("rm", [ "-rf", osTempFolder + "/t" + String(index) + pid + ".jpg" ]);
                    await shellExec("rm", [ "-rf", osTempFolder + "/mot" + String(index) + pid + ".jpg" ]);
                    await shellExec("rm", [ "-rf", thisTempFull2 ]);
                    await shellExec("rm", [ "-rf", thisTempFull3 ]);
        
                    fileNum++;
                  }
    
                  updateQuery = {};
                  updateQuery["photos.detail"] = photoDetailArr;
                  updateQuery["photos.first"] = 1;
                  updateQuery["photos.last"] = photoDetailArr.length;
                  updateQuery["contents.portfolio.detailInfo.photosg.first"] = 1;
                  updateQuery["contents.portfolio.detailInfo.photosg.last"] = photoDetailArr.length;
    
                  [ thisOriginalContents ] = await back.mongoRead(collection, whereQuery, { selfMongo });
                  contentsDetailCopied = objectDeepCopy(thisOriginalContents.contents.portfolio.contents.detail);
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
    
                  await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo });
                  await requestSystem("https://" + instance.address.officeinfo.ghost.host + ":3000/frontReflection", { data: null }, { headers: { "Content-Type": "application/json" } });
                  await messageSend({ text: pid + " 컨텐츠 보정본 업로드 및 대치를 완료하였어요, 순서 조정 및 에디팅을 해주세요\nlink : https://" + address.frontinfo.host + "/portdetail.php?pid=" + pid + "&edit=true", channel: "#502_sns_contents", voice: true });
    
                })().catch((err) => { console.log(err); })
    
              }
    
              res.send(JSON.stringify({ "message": "done" }));
            }
          } catch (e) {
            console.log(e);
            logger.error(e, req).catch((e) => { console.log(e); });
            res.send(JSON.stringify({ message: "error : " + e.message }));
          }
        });
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    router.post([ "/frontReflection" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        const mongoToFront = async function () {
          try {
            const designerToFront = async function () {
              try {
                const designers = await back.getDesignersByQuery({});
                let queryArr, columns, table;
                let createQuery;
                let types;
        
                table = "designer";
        
                columns = [
                  "desid",
                  "designer",
                  "introduction",
                  "porlid",
                  "tid",
                ];
        
                types = [
                  "VARCHAR(255)",
                  "VARCHAR(255)",
                  "TEXT",
                  "VARCHAR(255)",
                  "VARCHAR(255)",
                ];
        
                queryArr = designers.frontMode().filter((obj) => {
                  return !/해지/gi.test(obj.information.contract.status);
                }).filter((obj) => {
                  return obj.setting.front.introduction.desktop.length > 0;
                }).filter((obj) => {
                  return /^[ap]/i.test(obj.setting.front.photo.porlid);
                }).map((designer) => {
                  let value;
                  let query;
        
                  value = [
                    designer.desid,
                    designer.designer,
                    designer.setting.front.introduction.desktop.join(" "),
                    designer.setting.front.photo.porlid,
                    designer.setting.front.photo.index
                  ];
        
                  query = "INSERT INTO ";
                  query += table;
                  query += " (";
                  for (let i of columns) {
                    query += i + ',';
                  }
                  query = query.slice(0, -1) + ") VALUES (";
                  for (let i of value) {
                    query += "'" + String(i).replace(/\'/g, '"') + "',";
                  }
                  query = query.slice(0, -1) + ");";
        
                  return query;
                });
        
                createQuery = "CREATE TABLE " + table + " (id INT(11) NOT NULL AUTO_INCREMENT,";
                for (let i = 0; i < columns.length; i++) {
                  createQuery += columns[i] + ' ' + types[i] + ',';
                }
                createQuery += "PRIMARY KEY (id));";
        
                queryArr.unshift(createQuery);
                queryArr.unshift("DROP TABLE " + table + ";");
        
                await mysqlQuery(queryArr);
        
              } catch (e) {
                console.log(e);
              }
            }
            const contentsToFront = async function () {
              try {
                const contents = await back.getContentsArrByQuery({});
                let queryArr, columns, table;
                let createQuery;
                let types;
        
                table = "contents";
        
                columns = [
                  "conid",
                  "desid",
                  "pid",
                  "rid",
                  "portfoliotitlemain",
                  "portfoliotitlesub",
                  "apart",
                  "reviewtitlemain",
                  "reviewtitlesub",
                  "portfoliocontents",
                  "reviewcontents",
                  "portfoliotid",
                  "reivewtid"
                ];
        
                types = [
                  "VARCHAR(255)",
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
        
                  query = "INSERT INTO ";
                  query += table;
                  query += " (";
                  for (let i of columns) {
                    query += i + ',';
                  }
                  query = query.slice(0, -1) + ") VALUES (";
                  for (let i of value) {
                    query += "'" + String(i).replace(/\'/g, '"') + "',";
                  }
                  query = query.slice(0, -1) + ");";
        
                  return query;
                });
        
                createQuery = "CREATE TABLE " + table + " (id INT(11) NOT NULL AUTO_INCREMENT,";
                for (let i = 0; i < columns.length; i++) {
                  createQuery += columns[i] + ' ' + types[i] + ',';
                }
                createQuery += "PRIMARY KEY (id));";
        
                queryArr.unshift(createQuery);
                queryArr.unshift("DROP TABLE " + table + ";");
        
                await mysqlQuery(queryArr);
              
              } catch (e) {
                console.log(e);
              }
            }
            await designerToFront();
            await contentsToFront();
          } catch (e) {
            console.log(e);
          }
        }
        mongoToFront().catch((err) => {
          logger.error(err, req).catch((e) => { console.log(e); });
        });
        res.send(JSON.stringify({ message: "will do" }));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/searchContents" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        const selfMongo = instance.mongo;
        const selfCoreMongo = instance.mongo;
        const collection = "contents";
        const hideContents = [];
        const toNormal = true;
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
        if (req.body.from === "review") {
          sortQuery = { "contents.review.detailInfo.order": -1 };
        } else {
          sortQuery = { "contents.portfolio.detailInfo.sort.key9": -1 };
        }
    
        contentsArr = await back.mongoPick(collection, [ {}, contentsProjectQuery ], { selfMongo, sort: sortQuery });
        if (contentsArr.length === 0) {
          res.send(JSON.stringify({ conids: [] }));
        } else {
          designers = await back.getDesignersByQuery({ $or: contentsArr.map((obj) => { return { desid: obj.desid } }) }, { selfMongo });
          cliidArr = [ ...new Set(contentsArr.map((o) => { return o.cliid.trim() }).filter((s) => { return s !== "" })) ];
          proidArr = [ ...new Set(contentsArr.map((o) => { return o.proid.trim() }).filter((s) => { return s !== "" })) ];
    
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
            thisClients = await back.mongoPick("client", [ objectDeepCopy(whereQuery), objectDeepCopy(projectQuery) ], { selfMongo: selfCoreMongo });
    
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
              proposalDate = new Date(JSON.stringify(project.proposal.date).slice(1, -1));
              thisClient = thisClients.find((c) => { return c.cliid === project.cliid });
    
              thisRequestNumber = 0;
              for (let i = 0; i < thisClient.requests.length; i++) {
                if (thisClient.requests[i].request.timeline.valueOf() <= proposalDate.valueOf()) {
                  thisRequestNumber = i;
                  break;
                }
              }
    
              project.requestNumber = thisRequestNumber;
              project.client = {
                name: thisClient.name,
                cliid: thisClient.cliid,
                request: objectDeepCopy(thisClient.requests[thisRequestNumber].request),
              };
              projects.push(project);
            }
    
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
            for (let contents of contentsArr) {
              contents.project = { client: { request: {} } };
              thisDesigner = designers.find((d) => { return d.desid === contents.desid });
              contents.designer = thisDesigner.designer;
            }
          }
    
          const { subject, value } = equalJson(req.body);
    
          if (subject === "평수") {
    
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
    
            res.send(JSON.stringify({ conids: contentsArr.map((c) => { return c.conid }) }));
          } else if (subject === "예산") {
    
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
    
            res.send(JSON.stringify({ conids: contentsArr.map((c) => { return c.conid }) }));
    
          } else if (subject === "서비스 종류") {
    
            thisSerid = seridKeywords + String(serviceNames.findIndex((s) => { return s === value }) + 1) + 's';
            contentsArr = contentsArr.filter((c) => { return c.service.serid === thisSerid });
    
            res.send(JSON.stringify({ conids: contentsArr.map((c) => { return c.conid }) }));
    
          } else if (subject === "서비스 기간") {
    
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
            res.send(JSON.stringify({ conids: contentsArr.map((c) => { return c.conid }) }));
    
          } else if (subject === "지역") {
    
            contentsArr = contentsArr.filter((c) => { return typeof c.project.client.request.space === "object" });
            contentsArr = contentsArr.filter((c) => {
              if (value === "서울 / 경기") {
    
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
    
                thisArr = [
                  "제주",
                  "서귀포",
                ];
                return thisArr.some((str) => {
                  const thisReg = new RegExp("^[ ]*" + (str.trim()), "gi");
                  return thisReg.test(c.project.client.request.space.address.trim());
                });
    
              } else {
    
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
            res.send(JSON.stringify({ conids: contentsArr.map((c) => { return c.conid }) }));
    
          } else if (subject === "전체") {
            res.send(JSON.stringify({ conids: contentsArr.map((c) => { return c.conid }) }));
          } else {
            res.send(JSON.stringify({ conids: contentsArr.map((c) => { return c.conid }) }));
          }
        }
    
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/hiddenContents" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        const selfMongo = instance.mongolocal;
        const collection = "hiddenContents";
        const { mode } = equalJson(req.body);
        let target;
        let updateQuery, contents;
        let updatedContents;
    
        if (mode === "get") {
    
          [ target ] = await back.mongoRead(collection, {}, { selfMongo });
          res.send(JSON.stringify(target.contents));
    
        } else if (mode === "update") {
    
          const { updateQuery } = equalJson(req.body);
          updateQuery["date"] = new Date();
          await back.mongoUpdate(collection, [ {}, updateQuery ], { selfMongo });
          res.send(JSON.stringify({ message: "done" }));
    
        } else if (mode === "add") {
    
          const { pid } = equalJson(req.body);
          [ target ] = await back.mongoRead(collection, {}, { selfMongo });
          contents = objectDeepCopy(target.contents);
          contents.push(pid);
          contents = [ ...new Set(contents) ];
          updateQuery = { date: new Date(), contents };
          await back.mongoUpdate(collection, [ {}, updateQuery ], { selfMongo });
          res.send(JSON.stringify({ message: "done" }));
    
        } else if (mode === "remove") {
    
          const { pid } = equalJson(req.body);
          [ target ] = await back.mongoRead(collection, {}, { selfMongo });
          contents = objectDeepCopy(target.contents);
          updatedContents = [];
          for (let p of contents) {
            if (p !== pid) {
              updatedContents.push(p);
            }
          }
          contents = [ ...new Set(updatedContents) ];
          updateQuery = { date: new Date(), contents };
          await back.mongoUpdate(collection, [ {}, updateQuery ], { selfMongo });
          res.send(JSON.stringify({ message: "done" }));
    
        } else {
          throw new Error("invalid mode");
        }
    
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/syncContentsTag" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        const selfMongo = instance.mongolocal;
        const selfCoreMongo = instance.mongo;
        const collection = "contents";
    
        (async () => {
          
          const targets = await back.mongoRead(collection, {}, { selfMongo: selfCoreMongo });
          const keywordsArr = (targets.map((c) => {
            const bodyArr = c.contents.portfolio.contents.detail[0].contents.split(" ");
            const keywordsArr = [ ...new Set(bodyArr.map((s) => { return s.trim() }).map((s) => {
              return s.replace(/[\n\t ]/gi, "").replace(/을$/gi, "").replace(/으로$/gi, "").replace(/하고$/gi, "").replace(/[^가-힣0-9]/gi, "");
            }).filter((s) => {
              return !/고객/gi.test(s) && !/스타일링/gi.test(s) && !/문의/gi.test(s) && !/의뢰/gi.test(s)
            }).map((s) => {
              return s.replace(/[은는이가을를]$/, "").replace(/[와과]$/, "").replace(/습니다$/, "").replace(/그리고/, "").replace(/그래서/, "").replace(/어떻게/, "").replace(/하지만/, "");
            }).map((s) => {
              return s.replace(/[에의]$/, "");
            }).filter((s) => {
              return !/하였/gi.test(s) && !/하셨/gi.test(s) && !/야겠다고/gi.test(s) && !/이에요/gi.test(s) && !/었죠/gi.test(s) && !/어요/gi.test(s) && !/했[고구]요/gi.test(s)
            }).filter((s) => {
              return !/아실까요/gi.test(s) && !/계셨구요/gi.test(s) && !/해드렸/gi.test(s) && !/봅시다/gi.test(s);
            }).filter((s) => {
              return !/진행/gi.test(s) && !/홈리에종/gi.test(s) && !/디자이너/gi.test(s) && !/소개/gi.test(s);
            }).map((s) => {
              return s.replace(/[에의]$/, "");
            }).map((s) => {
              return s.replace(/이다$/, "");
            }).map((s) => {
              return s.replace(/있으셨죠$/, "");
            }).map((s) => {
              return s.replace(/추천드렸$/, "");
            }).filter((s) => {
              return !/하시겠다고/gi.test(s) && !/현장이었/gi.test(s) && !/해드리겠다고/gi.test(s) && !/이었기/gi.test(s) && !/됐으면/gi.test(s);
            }).filter((s) => {
              return !/있도록/gi.test(s) && !/싶으셨죠/gi.test(s) && !/바뀌었답니다/gi.test(s) && !/이야기/gi.test(s) && !/현장입니다/gi.test(s);
            }).filter((s) => { return s !== "" }).filter((s) => { return s.trim().length > 2 })) ].concat([ "all" ]).concat([
              c.contents.portfolio.spaceInfo.space,
              String(c.contents.portfolio.spaceInfo.pyeong) + "평",
              String(Math.floor(c.contents.portfolio.spaceInfo.pyeong / 10) * 10) + "평형",
              c.contents.portfolio.spaceInfo.region,
              ...c.contents.portfolio.spaceInfo.space.split(" "),
              ...c.contents.portfolio.spaceInfo.region.split(" "),
              serviceParsing(c.service).replace(/[^가-힣 ]/gi, "").trim().replace(/^(온라인|오프라인)/, "").trim(),
              ...c.contents.portfolio.title.main.split(" ").map((s) => { return s.trim() }).filter((s) => { return s !== "" }),
            ])
            return {
              conid: c.conid,
              keywords: keywordsArr.concat(),
            }
          }));
          for (let { conid, keywords } of keywordsArr) {
            await back.mongoUpdate(collection, [ { conid }, { "contents.portfolio.detailInfo.tag": keywords } ], { selfMongo });
            await back.mongoUpdate(collection, [ { conid }, { "contents.portfolio.detailInfo.tag": keywords } ], { selfMongo: selfCoreMongo });
          }
    
        })().catch((err) => {
          logger.error(err, req).catch((e) => { console.log(e); });
        })
    
        res.send(JSON.stringify({ message: "will do" }));
    
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/updateDesignerProposalSetting" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        const selfMongo = instance.mongolocal;
        const selfCoreMongo = instance.mongo;
        const collection = "designer";
        const { desid, photo, description } = equalJson(req.body);
        let dummy, proposalArr;
    
        dummy = () => {
          return { name: "기본 세팅", photo: objectDeepCopy(photo), description: objectDeepCopy(description) };
        }
        proposalArr = [];
        for (let i = 0; i < 5; i++) {
          proposalArr.push(objectDeepCopy(dummy()));
        }
    
        await back.mongoUpdate(collection, [ { desid }, { "setting.proposal": proposalArr } ], { selfMongo });
        await back.mongoUpdate(collection, [ { desid }, { "setting.proposal": proposalArr } ], { selfMongo: selfCoreMongo });
    
        res.send(JSON.stringify({ message: "done" }));
    
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/getContents" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        const selfMongo = instance.mongo;
        const selfCoreMongo = instance.mongo;
        const selfLocalMongo = instance.mongolocal;
        const hiddenCollection = "hiddenContents";
        const collection = "contents";
        const hideContents = (await back.mongoRead(hiddenCollection, {}, { selfMongo: selfLocalMongo }))[0].contents;
        const toNormal = true;
        const defaultDelta = 45;
        const moneyDelta = 2500000;
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
    
        if (req.body.mode === "portfolio" || req.body.mode === "review") {
    
          if (req.body.pid !== undefined) {
            if (/^re/.test(req.body.pid)) {
              contentsArr = await back.mongoRead(collection, { "contents.review.rid": req.body.pid }, { selfMongo });
              contentsArr = contentsArr.filter((obj) => {
                return obj.contents.review.rid === req.body.pid;
              });
            } else {
              contentsArr = await back.mongoRead(collection, { "contents.portfolio.pid": req.body.pid }, { selfMongo });
              contentsArr = contentsArr.filter((obj) => {
                return obj.contents.portfolio.pid === req.body.pid;
              });
            }
    
            if (contentsArr.length > 0) {
              thisProid = contentsArr[0].proid;
              contentsArr[0].consumer = moneyDelta;
              if (/^p/gi.test(thisProid)) {
                [ thisProject ] = await back.mongoPick("project", [ { proid: thisProid }, {
                  "process.contract.remain.calculation": 1,
                  "process.contract.form.date": 1,
                } ], { selfMongo: selfCoreMongo });
                if (thisProject !== undefined && thisProject !== null) {
                  delta = thisProject.process.contract.form.date.to.valueOf() - thisProject.process.contract.form.date.from.valueOf();
                  dayDelta = Math.floor((((delta / 1000) / 60) / 60) / 24);
                  if (!Number.isNaN(Number(dayDelta)) && dayDelta > 10) {
                    period = "약 " + String(dayDelta) + "일";
                  } else {
                    period = "약 " + String(defaultDelta) + "일";
                  }
                  contentsArr[0].consumer = thisProject.process.contract.remain.calculation.amount.consumer;
                  if (Number.isNaN(Number(contentsArr[0].consumer))) {
                    contentsArr[0].consumer = moneyDelta;
                  }
                } else {
                  period = "약 " + String(defaultDelta) + "일";
                }
              } else {
                period = "약 " + String(defaultDelta) + "일";
              }
              contentsArr[0].period = period;
    
              designers = await back.getDesignersByQuery({ $or: contentsArr.map((obj) => { return { desid: obj.desid } }) }, { selfMongo });
              res.send(JSON.stringify({
                contentsArr: contentsArr,
                designers: designers.frontMode(),
              }));
            } else {
              res.send(JSON.stringify({
                contentsArr: contentsArr,
                designers: [],
              }));
            }
    
          } else {
    
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
            if (req.body.mode === "review") {
              sortQuery = { "contents.review.detailInfo.order": -1 };
            } else {
              sortQuery = { "contents.portfolio.detailInfo.sort.key9": -1 };
            }
    
            whereQuery = { "$and": hideContents.map((pid) => { return { "contents.portfolio.pid": { "$not": { "$regex": "^" + pid + "$" } } } }) };
            whereQuery["$and"].push({ "contents.portfolio.title.main": { "$not": { "$regex": "제목을 입력해"} } });
            if (req.body.limit !== undefined) {
              contentsArr = await back.mongoPick(collection, [ whereQuery, contentsProjectQuery ], { selfMongo, sort: sortQuery, limit: Number(req.body.limit) });
            } else {
              contentsArr = await back.mongoPick(collection, [ whereQuery, contentsProjectQuery ], { selfMongo, sort: sortQuery });
            }
    
            contentsArr = contentsArr.filter((obj) => { return !hideContents.includes(obj.contents.portfolio.pid); });
    
            if (contentsArr.length > 0) {
              designers = await back.getDesignersByQuery({ $or: contentsArr.map((obj) => { return { desid: obj.desid } }) }, { selfMongo });
              res.send(JSON.stringify({
                contentsArr: contentsArr,
                designers: designers.frontMode(),
              }));
            } else {
              res.send(JSON.stringify({
                contentsArr: contentsArr,
                designers: [],
              }));
            }
    
          }
    
        } else if (req.body.mode === "designer") {
    
          if (req.body.desid === undefined) {
    
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
            sortQuery = { "contents.portfolio.detailInfo.sort.key9": -1 };
    
            designers = await back.getDesignersByQuery({}, { selfMongo });
            contentsArr = await back.mongoPick(collection, [ { "$and": hideContents.map((pid) => { return { "contents.portfolio.pid": { "$not": { "$regex": "^" + pid + "$" } } } }) }, contentsProjectQuery ], { selfMongo, sort: sortQuery });
            contentsArr = contentsArr.filter((obj) => { return !hideContents.includes(obj.contents.portfolio.pid); });
    
            res.send(JSON.stringify({
              contentsArr: contentsArr,
              designers: designers.frontMode(),
            }));
    
          } else {
    
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
            sortQuery = { "contents.portfolio.detailInfo.sort.key9": -1 };
    
            designers = await back.getDesignersByQuery({ desid: req.body.desid }, { selfMongo });
            whereQuery = { "$and": hideContents.map((pid) => { return { "contents.portfolio.pid": { "$not": { "$regex": "^" + pid + "$" } } } }) };
            whereQuery["$and"].push({ desid: req.body.desid });
            contentsArr = await back.mongoPick(collection, [ whereQuery, contentsProjectQuery ], { selfMongo, sort: sortQuery });
    
            res.send(JSON.stringify({
              contentsArr: contentsArr,
              designers: designers.frontMode(),
            }));
    
          }
    
        } else if (req.body.mode === "index") {
    
          indexSliceNumber = 9;
    
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
    
          whereQuery = { "$and": hideContents.map((pid) => { return { "contents.portfolio.pid": { "$not": { "$regex": "^" + pid + "$" } } } }) };
          whereQuery["$and"].push({ "contents.portfolio.title.main": { "$not": { "$regex": "제목을 입력해"} } });
    
          contentsArr_raw = await back.mongoPick(collection, [ whereQuery, contentsProjectQuery ], { selfMongo });
          reviewArr = contentsArr_raw.filter((obj) => { return !hideContents.includes(obj.contents.portfolio.pid); }).filter((obj) => { return !/999/gi.test(obj.contents.review.rid); });
          indexArr = contentsArr_raw.filter((obj) => { return !hideContents.includes(obj.contents.portfolio.pid); });
    
          contentsArr.sort((a, b) => {
            return Number(b.contents.portfolio.detailInfo.sort.key9) - Number(a.contents.portfolio.detailInfo.sort.key9);
          });
          reviewArr.sort((a, b) => {
            return b.contents.review.detailInfo.order - a.contents.review.detailInfo.order;
          });
          indexArr.sort((a, b) => {
            return Number(b.contents.portfolio.detailInfo.sort.key8) - Number(a.contents.portfolio.detailInfo.sort.key8);
          });
    
          contentsArr = contentsArr.slice(0, indexSliceNumber);
          reviewArr = reviewArr.slice(0, indexSliceNumber);
          indexArr = indexArr.slice(0, indexSliceNumber * 2);
    
          res.send(JSON.stringify({ contentsArr, reviewArr, indexArr }));
    
        } else if (req.body.mode === "magazine") {
    
          contentsArr_raw = await back.mongoRead("magazine", {}, { selfMongo });
          contentsArr_raw.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });
    
          if (req.body.mid !== undefined) {
            contentsArr = contentsArr_raw.filter((obj) => {
              return obj.mid === req.body.mid;
            });
          } else {
            contentsArr = contentsArr_raw.map((obj) => {
              let contents;
              contents = equalJson(JSON.stringify(obj.contents));
              contents.detail = contents.detail.slice(0, 2);
              return {
                magid: obj.magid,
                mid: obj.mid,
                date: obj.date,
                editor: obj.editor,
                contents
              }
            })
          }
    
          res.send(JSON.stringify({
            contentsArr: contentsArr,
          }));
    
        }
    
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/getLength" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        const selfMongo = instance.mongo;
        const selfCoreMongo = instance.mongo;
        let whereQuery, projectQuery;
        let contentsLength, projectLength, designerLength;
        let contentsArr, projectArr, designerArr;
    
        whereQuery = {};
        projectQuery = {
          conid: 1,
        };
        contentsArr = await back.mongoPick("contents", [ objectDeepCopy(whereQuery), objectDeepCopy(projectQuery) ], { selfMongo: selfMongo });
        contentsLength = contentsArr.length;
    
        whereQuery = { desid: { $regex: "^d" } };
        projectQuery = {
          proid: 1,
          desid: 1,
        };
        projectArr = await back.mongoPick("project", [ objectDeepCopy(whereQuery), objectDeepCopy(projectQuery) ], { selfMongo: selfCoreMongo });
        projectLength = projectArr.length;
    
        whereQuery = {};
        projectQuery = {
          desid: 1,
        };
        designerArr = await back.mongoPick("designer", [ objectDeepCopy(whereQuery), objectDeepCopy(projectQuery) ], { selfMongo: selfMongo });
        designerLength = designerArr.length;
    
        res.send(JSON.stringify({
          contents: contentsLength,
          project: projectLength,
          designer: designerLength,
        }));
    
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/updateImagesOrder" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        const { pid, data, contents, title, photo } = equalJson(req.body);
        const { apart, wording: titleWording, pyeong, service } = title;
        const collection = "contents";
        const selfMongo = instance.mongolocal;
        const selfCoreMongo = instance.mongo;
        let whereQuery, updateQuery;
        let updatedContents;
        let photoUpdateBoo;
    
        photoUpdateBoo = (photo === 1 || photo === '1');
        whereQuery = { "contents.portfolio.pid": pid };
        updateQuery = {};
        updateQuery["contents.portfolio.contents.detail"] = contents;
        updateQuery["contents.portfolio.detailInfo.photodae"] = [ data.filter((o) => { return o.gs === "s" }).filter((o) => { return o.dae })[0].fromIndex, data.filter((o) => { return o.gs === "g" }).filter((o) => { return o.dae })[0].fromIndex ];
        updateQuery["contents.portfolio.spaceInfo.space"] = apart;
        updateQuery["contents.portfolio.spaceInfo.pyeong"] = pyeong;
        updateQuery["contents.portfolio.detailInfo.service"] = service;
        updateQuery["contents.portfolio.title.main"] = titleWording + ", " + apart + " " + String(pyeong) + "py " + service;
        updateQuery["contents.portfolio.title.sub"] = titleWording + ", " + apart + " " + service;
    
        await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo });
        await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo: selfCoreMongo });
    
        updatedContents = (await back.mongoRead(collection, whereQuery, { selfMongo: selfCoreMongo }))[0];
        delete updatedContents._id;
    
        res.send(JSON.stringify({ contents: updatedContents }));
    
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/updateReviewInfo" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        const { pid, words, mode } = equalJson(req.body);
        const collection = "contents";
        const selfMongo = instance.mongo;
        const selfCoreMongo = instance.mongo;
        let whereQuery, updateQuery;
    
        whereQuery = { "contents.portfolio.pid": pid };
        updateQuery = {};
    
        if (mode === "title") {
          updateQuery["contents.review.title.main"] = words.trim();
          updateQuery["contents.review.title.sub"] = words.trim();
        } else if (mode === "story") {
          updateQuery["contents.portfolio.contents.detail.0.contents"] = words.trim();
        }
    
        await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo });
        await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo: selfCoreMongo });
        res.send(JSON.stringify({ message: "done" }));
    
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/updateAddressRegion" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        const { pid, address: apart, region } = equalJson(req.body);
        const collection = "contents";
        const selfMongo = instance.mongolocal;
        const selfCoreMongo = instance.mongo;
        let whereQuery, updateQuery;
        let updatedContents;
        let titleWording;
        let originalContents;
        let pyeong;
        let service;
    
        [ originalContents ] = await back.mongoRead(collection, { "contents.portfolio.pid": pid }, { selfMongo: selfCoreMongo });
        titleWording = originalContents.contents.portfolio.title.main.split(", ")[0];
        pyeong = originalContents.contents.portfolio.spaceInfo.pyeong;
        service = originalContents.contents.portfolio.detailInfo.service;
    
        whereQuery = { "contents.portfolio.pid": pid };
        updateQuery = {};
        updateQuery["contents.portfolio.spaceInfo.space"] = apart;
        updateQuery["contents.portfolio.spaceInfo.region"] = region;
        updateQuery["contents.portfolio.title.main"] = titleWording + ", " + apart + " " + String(pyeong) + "py " + service;
        updateQuery["contents.portfolio.title.sub"] = titleWording + ", " + apart + " " + service;
    
        await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo });
        await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo: selfCoreMongo });
    
        updatedContents = (await back.mongoRead(collection, whereQuery, { selfMongo: selfCoreMongo }))[0];
        delete updatedContents._id;
    
        res.send(JSON.stringify({ contents: updatedContents }));
    
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/updateKey9Order" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        const { pid, order } = equalJson(req.body);
        const collection = "contents";
        const selfMongo = instance.mongolocal;
        const selfCoreMongo = instance.mongo;
        let whereQuery, updateQuery;
        let updatedContents;
        let titleWording;
    
        whereQuery = { "contents.portfolio.pid": pid };
        updateQuery = {};
        updateQuery["contents.portfolio.detailInfo.sort.key9"] = String(order).replace(/[^0-9]/gi, '');
    
        await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo });
        await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo: selfCoreMongo });
    
        updatedContents = (await back.mongoRead(collection, whereQuery, { selfMongo: selfCoreMongo }))[0];
        delete updatedContents._id;
    
        res.send(JSON.stringify({ contents: updatedContents }));
    
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/updateSlideOrder" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        const { pid, order, index } = equalJson(req.body);
        const collection = "contents";
        const selfMongo = instance.mongolocal;
        const selfCoreMongo = instance.mongo;
        let whereQuery, updateQuery;
        let updatedContents;
    
        whereQuery = { "contents.portfolio.pid": pid };
        updateQuery = {};
        updateQuery["contents.portfolio.detailInfo.slide." + String(Number(order) - 1)] = Number(index);
    
        await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo });
        await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo: selfCoreMongo });
    
        res.send(JSON.stringify({ message: "done" }));
    
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/errorMessage" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        if (req.body.text === undefined) {
          throw new Error("invaild post, must be text");
        }
        const { text } = req.body;
        await logger.error(text);
        res.send(JSON.stringify({ message: "done" }));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    router.post([ "/getAnalytics" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        const collection = "homeliaisonAnalytics";
        const rawUserAgent = req.useragent;
        const emptyIp = address.frontinfo.ip.outer;
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
    
        thisData = equalJson(req.body);
    
        ip = null;
        if (typeof thisData.info === "object" && thisData.info !== null) {
          ip = thisData.info.ip;
          referer = thisData.info.referer;
          user = thisData.info.userAgent;
        } else {
          temp = (req.headers["x-forwarded-for"] === undefined ? req.socket.remoteAddress : req.headers["x-forwarded-for"]);
          if (typeof temp !== "string") {
            ip = emptyIp;
          } else {
            ip = temp.trim().replace(/[^0-9\.]/gi, '');
          }
          referer = (req.headers.referer === undefined ? "" : req.headers.referer);
          user = userAgent;
        }
    
        if (typeof ip !== "string") {
          ip = emptyIp;
        }
    
        if (typeof thisData.id === "string") {
          thisId = thisData.id;
        } else {
          thisId = "(not set)";
        }
    
        name = "fromServer_" + thisData.action;
    
        ipObj = await ipParsing(ip);
    
        safeNum = 0;
        while (Object.keys(ipObj).length === 0) {
          if (safeNum > 10) {
            break;
          }
          await sleep(100);
          ipObj = await ipParsing(ip);
          safeNum = safeNum + 1;
        }
    
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
    
        thisData.date = new Date();
        thisData.network = { ...ipObj };
        thisData.network.ip = ip;
    
        try {
          parserResult = parser(user);
    
          delete parserResult.cpu;
          delete parserResult.ua;
          delete parserResult.engine;
    
          parserResult.browser = parserResult.browser.name;
          parserResult.os.browser = parserResult.browser;
    
          delete parserResult.browser;
    
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
    
          if (parserResult.device.vendor === undefined) {
            parserResult.device.vendor = "Unknown";
          }
          if (parserResult.device.model === undefined) {
            parserResult.device.model = "Unknown";
          }
          if (parserResult.device.type === undefined) {
            parserResult.device.type = "desktop";
          }
    
          thisData.device = equalJson(JSON.stringify(parserResult));
        } catch {
          thisData.device = {};
        }
        if (thisData.network.ip.trim().replace(/[^0-9\.]/gi, '') !== address.officeinfo.ghost.outer.trim().replace(/[^0-9\.]/gi, '')) {
          await back.mongoCreate(collection, thisData, { selfMongo: instance.mongolocal });
        }
        instance.facebook.conversionEvent({
          name,
          data: {
            ip: ip,
            userAgent: userAgent,
          },
          custom,
        }).catch((err) => {
          logger.error(err, req).catch((e) => { console.log(e); });
        });
    
        res.send(JSON.stringify({ message: "done" }));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    router.post([ "/updateContents" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        if (req.body.whereQuery === undefined || req.body.updateQuery === undefined) {
          throw new Error("invaild post");
        }
    
        const selfMongo = instance.mongo;
        const { whereQuery, updateQuery } = equalJson(req.body);
        let data;
    
        if (typeof whereQuery !== "object" || whereQuery === null) {
          throw new Error("invaild query object");
        }
        if (Object.keys(whereQuery).length === 0) {
          throw new Error("query ban");
        }
        if (typeof updateQuery !== "object" || updateQuery === null) {
          throw new Error("invaild query object");
        }
    
        await back.updateContents([ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });
        data = await back.updateContents([ whereQuery, updateQuery ], { selfMongo });
        res.send(JSON.stringify({ message: data }));
    
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/getClientReport" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        if (req.body.fromYear === undefined || req.body.fromMonth === undefined || req.body.toYear === undefined || req.body.toMonth === undefined) {
          throw new Error("invalid post");
        }
        const { fromYear, fromMonth, toYear, toMonth } = equalJson(req.body);
        const selfMongo = instance.mongolocal;
        let fromDate, toDate;
        let monthlyAnalytics;
        let thisFrom, thisTo;
        let tempRows;
        let tempRows2;
    
        fromDate = new Date(fromYear, fromMonth - 1, 1);
        toDate = new Date(toYear, toMonth, 1);
    
        monthlyAnalytics = await back.mongoRead("complexAnalytics", {
          $and: [
            { "date.from": { $gte: fromDate }, },
            { "date.to": { $lte: toDate } },
          ]
        }, { selfMongo });
    
        monthlyAnalytics = monthlyAnalytics.map((obj) => {
          let resultObj;
          let copiedDate;
    
          copiedDate = new Date(JSON.stringify(obj.date.from).slice(1, -1));
          copiedDate.setDate(copiedDate.getDate() + 10);
    
          resultObj = {};
    
          resultObj.standard = copiedDate;
          resultObj.year = copiedDate.getFullYear();
          resultObj.month = copiedDate.getMonth() + 1;
          resultObj.mau = obj.data.users.total;
    
          return resultObj;
        })
    
        monthlyAnalytics.sort((a, b) => {
          return a.standard.valueOf() - b.standard.valueOf();
        })
    
        for (let obj of monthlyAnalytics) {
          thisFrom = new Date(obj.year, obj.month - 1, 1);
          thisTo = new Date(obj.year, obj.month - 1, 1);
          thisTo.setMonth(thisTo.getMonth() + 1);
    
          tempRows = await back.mongoRead("dailyClients", {
            $and: [
              { "date.from": { $gte: thisFrom }, },
              { "date.to": { $lte: thisTo } },
            ]
          }, { selfMongo });
    
          obj.adClients = tempRows.map((obj) => { return obj.data.detail }).flat().filter((obj2) => {
            return obj2.users.some((obj3) => {
              if (obj3 === null) {
                return false;
              } else {
                return (obj3.source.campaign.filter((str) => { return str.trim() !== "(not set)"; }).length > 0);
              }
            })
          }).length;
    
          tempRows2 = await back.mongoRead("dailyCampaign", {
            $and: [
              { "date.from": { $gte: thisFrom }, },
              { "date.to": { $lte: thisTo } },
            ]
          }, { selfMongo });
    
          obj.charge = tempRows2.map((obj2) => { return obj2.value.charge }).reduce((acc, curr) => { return acc + curr }, 0);
        }
    
        res.send(JSON.stringify(monthlyAnalytics));
    
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/clientAnalytics" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        if (req.body.mode === undefined) {
          throw new Error("invalid post");
        }
        const selfMongo = instance.mongolocal;
        const { mode } = equalJson(req.body);
        const collection = "clientAnalytics";
        let rows;
        let projectKeys;
    
        if (mode === "get") {
    
          if (req.body.whereQuery === undefined || req.body.projectQuery === undefined) {
            throw new Error("invalid post");
          }
          const { whereQuery, projectQuery } = equalJson(req.body);
          if (typeof whereQuery !== "object" || whereQuery === null) {
            throw new Error("invalid where query");
          }
          if (typeof projectQuery !== "object" || projectQuery === null) {
            throw new Error("invalid project query");
          }
    
          projectKeys = Object.keys(projectQuery);
          if (projectKeys.length === 0) {
            rows = await back.mongoRead(collection, whereQuery, { selfMongo });
          } else {
            rows = await back.mongoPick(collection, [ whereQuery, projectQuery ], { selfMongo });
          }
    
          rows.sort((a, b) => { return b.client.requests[0].request.timeline.valueOf() - a.client.requests[0].request.timeline.valueOf() });
    
          res.send(JSON.stringify(rows));
    
        } else {
          throw new Error("invalid mode");
        }
    
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/clientAnalytics2" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        if (req.body.mode === undefined) {
          throw new Error("invalid post");
        }
        const selfMongo = instance.mongolocal;
        const selfCoreMongo = instance.mongo;
        const { mode } = equalJson(req.body);
        const collection = "clientAnalytics";
        const emptyDateValue = (new Date(2000, 0, 1)).valueOf();
        let rows;
        let projectKeys;
        let startRequestTimeline;
        let coreWhereQuery;
        let coreRows;
        let thisClient;
        let finalRows;
        let tempObj;
        let copiedObj;
        let projects, projects2;
        let cliidArr_raw, cliidArr;
        let thisProject;
        let projectArr;
        let startDate, endDate;
        let endDateCopied;
        let startDateCopied;
        let whereQuery;
    
        if (mode === "get") {
    
          if (req.body.standardDate === undefined) {
            if (req.body.startDate === undefined || req.body.endDate === undefined) {
              throw new Error("invalid post");
            }
            ({ startDate, endDate } = equalJson(req.body));
          } else {
            ({ standardDate: startDate } = equalJson(req.body));
            endDate = new Date();
          }
    
          startDateCopied = new Date(JSON.stringify(startDate).slice(1, -1));
          startDate = new Date(startDateCopied.getFullYear(), startDateCopied.getMonth(), startDateCopied.getDate(), 0, 0, 0);
    
          endDateCopied = new Date(JSON.stringify(endDate).slice(1, -1));
          endDate = new Date(endDateCopied.getFullYear(), endDateCopied.getMonth(), endDateCopied.getDate(), 0, 0, 0);
          endDate.setDate(endDate.getDate() + 1);
    
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
          
          startRequestTimeline = new Date(JSON.stringify(startDate).slice(1, -1));
          startRequestTimeline.setDate(startRequestTimeline.getDate() - 3);
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
    
          projects.sort((a, b) => { return a.proposal.date.valueOf() - b.proposal.date.valueOf() });
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
    
          if (req.body.initRequest !== true && req.body.initRequest !== "true") {
            finalRows = finalRows.filter((o) => {
              return o.client.requests[0].request.timeline.valueOf() >= startDate.valueOf() && o.client.requests[0].request.timeline.valueOf() <= endDate.valueOf();
            });
            finalRows.sort((a, b) => {
              return b.client.requests[0].request.timeline.valueOf() - a.client.requests[0].request.timeline.valueOf();
            });
          }
    
          res.send(JSON.stringify(finalRows));
    
        } else if (mode === "pick") {
    
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
    
          projects.sort((a, b) => { return a.proposal.date.valueOf() - b.proposal.date.valueOf() });
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
    
          finalRows.sort((a, b) => {
            return b.client.requests[0].request.timeline.valueOf() - a.client.requests[0].request.timeline.valueOf();
          });
    
          res.send(JSON.stringify(finalRows));
    
        } else {
          throw new Error("invalid mode");
        }
    
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/extractAnalytics" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        if (req.body.mode === undefined) {
          throw new Error("invalid post");
        }
        const selfMongo = instance.mongolocal;
        const { mode } = equalJson(req.body);
        let collection;
        let fromDate, toDate;
        let whereQuery;
        let rows;
    
        if (mode === "daily") {
    
          if (req.body.fromDate === undefined || req.body.toDate === undefined) {
            throw new Error("invalid post 2");
          }
    
          ({ fromDate, toDate } = equalJson(req.body));
          collection = "dailyAnalytics";
    
          fromDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate(), 0, 0, 0);
          toDate = new Date(toDate.getFullYear(), toDate.getMonth(), toDate.getDate(), 0, 0, 0);
    
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
    
          rows = await back.mongoRead(collection, whereQuery, { selfMongo });
          res.send(JSON.stringify(rows));
    
        } else if (mode === "charge" || mode === "campaign") {
    
          if (req.body.fromDate === undefined || req.body.toDate === undefined) {
            throw new Error("invalid post 2");
          }
    
          ({ fromDate, toDate } = equalJson(req.body));
          collection = "dailyCampaign";
    
          fromDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate(), 0, 0, 0);
          toDate = new Date(toDate.getFullYear(), toDate.getMonth(), toDate.getDate(), 0, 0, 0);
    
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
          if (mode === "charge") {
            whereQuery["$and"].push({
              "information.mother": {
                $ne: "unknown"
              }
            });
          }
    
          rows = await back.mongoRead(collection, whereQuery, { selfMongo });
          res.send(JSON.stringify(rows));
    
        } else {
          throw new Error("invalid mode");
        }
    
    
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/requestScript" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        if (req.body.url === undefined) {
          throw new Error("invaild post");
        }
        const responses = await requestSystem(global.decodeURIComponent(req.body.url));
        res.send(JSON.stringify({ data: responses.data }));
      } catch (e) {
        console.log(req);
         
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/resetContentsPhotoStatus" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        if (req.body.pid === undefined) {
          throw new Error("invaild post");
        }
        const { pid } = req.body;
        const collection = "contents";
        const selfMongo = instance.mongo;
        const selfLocalMongo = instance.mongo;
        let photo;
        let thisContents;
        let contentsDetail;
        let whereQuery;
    
        [ thisContents ] = await back.mongoRead(collection, { "contents.portfolio.pid": pid }, { selfMongo });
        contentsDetail = objectDeepCopy(thisContents.contents.portfolio.contents.detail);
    
        photo = thisContents.photos.detail.map((o) => { return o.index });
        contentsDetail[0].photo = [];
        if (contentsDetail.length < 2) {
          contentsDetail.push({
            photo: [],
            title: "space",
            contents: "",
          })
        }
        contentsDetail[1].photo = photo;
        for (let i = 2; i < contentsDetail.length; i++) {
          contentsDetail[i].photo = [];
        }
    
        await back.mongoUpdate(collection, [ { "contents.portfolio.pid": pid }, { "contents.portfolio.contents.detail": contentsDetail } ], { selfMongo });
        await back.mongoUpdate(collection, [ { "contents.portfolio.pid": pid }, { "contents.portfolio.contents.detail": contentsDetail } ], { selfMongo: selfLocalMongo });
    
        res.send(JSON.stringify({ message: "done" }));
      } catch (e) {
        console.log(req);
         
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/aspirantToDesigner" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        if (req.body.aspid === undefined) {
          throw new Error("invaild post");
        }
        const { aspid } = equalJson(req.body);
        let aspirants, aspirant;
        let aspidArr;
        let designer;
    
        aspirants = await back.getAspirantsByQuery({ aspid: aspid }, { selfMongo: instance.mongo });
        aspirant = aspirants[0].toNormal();
    
        designer = aspirant.designer;
    
        aspidArr = [];
        aspidArr.push({ aspid: aspirant.aspid, contract: aspirant.contract.partnership.date });
    
        work.aspirantToDesigner(aspidArr, { selfMongo: instance.mongo }).then(() => {
          return messageSend({ text: designer + " 디자이너 등록을 완료하였어요! DE 2번 콘솔에서 확인해주세요!", channel: "#300_designer", voice: false, fairy: false });
        }).catch((err) => {
          console.log(err);
        });
    
        res.send(JSON.stringify({ message: "will do" }));
      } catch (e) {
        console.log(req);
         
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/getContentsView" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        if (req.body.mode === undefined) {
          throw new Error("invalid post");
        }
        const { mode } = equalJson(req.body);
        const selfMongo = instance.mongolocal;
        const collection = "contentsView";
        let rows;
        let data;
        rows = await back.mongoPick(collection, [ {}, { key: 1, date: 1 } ], { selfMongo });
        rows.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });
    
        if (mode === "pick" || mode === "get") {
          if (rows.length > 0) {
            [ data ] = await back.mongoRead(collection, { key: rows[0].key }, { selfMongo });
            res.send(JSON.stringify({ data, date: data.date }));
          } else {
            res.send(JSON.stringify({ data: null }));
          }
        } else {
          throw new Error("invalid mode");
        }
    
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    router.post([ "/storeContentsView" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        const storeContentsView = async function (selfMongo, logger) {
          try {
            const analyticsCollection = "homeliaisonAnalytics";
            const action = "contentsView";
            const collection = "contentsView";
            let rows;
            let whereQuery;
            let contentsArr;
            let jsonModel;
            let browserMap;
            let foundTarget, foundTarget2, foundTarget3;
            let osMap;
            let timeMap;
            let dateTypeString;
            let finalJson;
            let finalRows, key;
        
            key = dateToString(new Date()).replace(/[^0-9]/gi, '') + "_web";
            finalJson = {
              key,
              date: new Date(),
              contents: [],
            };
        
            contentsArr = await back.getContentsArrByQuery({}, { selfMongo });
            for (let contents of contentsArr) {
        
              thisPid = contents.contents.portfolio.pid;
              whereQuery = { action, "data.contents_pid": thisPid };
              rows = await back.mongoRead(analyticsCollection, whereQuery, { selfMongo });
          
              browserMap = rows.filter((o) => { return typeof o.device.os.browser === "string" }).map((o) => { return o.device.os.browser.toLowerCase().trim(); });
              browserMap = [ ...new Set(browserMap) ];
              browserMap = browserMap.map((type) => { return { type, value: 0 } })
          
              osMap = rows.filter((o) => { return typeof o.device.os.name === "string" }).map((o) => { return o.device.os.name.toLowerCase().trim(); });
              osMap = [ ...new Set(osMap) ];
              osMap = osMap.map((type) => { return { type, value: 0 } })
          
              timeMap = rows.map((o) => { return dateToString(o.date).replace(/[^0-9]/gi, '').slice(0, 6) });
              timeMap = [ ...new Set(timeMap) ];
              timeMap = timeMap.map((type) => { return { type, value: 0 } })
          
              for (let obj of rows) {
                if (typeof obj.device.os.browser === "string") {
                  foundTarget = browserMap.find((o) => { return o.type === obj.device.os.browser.toLowerCase().trim() });
                  if (foundTarget !== undefined) {
                    foundTarget.value = foundTarget.value + 1;
                  }
                }
                if (typeof obj.device.os.name === "string") {
                  foundTarget2 = osMap.find((o) => { return o.type === obj.device.os.name.toLowerCase().trim() });
                  if (foundTarget2 !== undefined) {
                    foundTarget2.value = foundTarget2.value + 1;
                  }
                }
                dateTypeString = dateToString(obj.date).replace(/[^0-9]/gi, '').slice(0, 6)
                foundTarget3 = timeMap.find((o) => { return o.type === dateTypeString });
                if (foundTarget3 !== undefined) {
                  foundTarget3.value = foundTarget3.value + 1;
                }
              }
          
              jsonModel = {
                pid: thisPid,
                conid: contents.conid,
                desid: contents.desid,
                proid: contents.proid,
                date: new Date(JSON.stringify(contents.contents.portfolio.date).slice(1, -1)),
                data: {
                  view: {
                    total: rows.length,
                    portfolio: rows.filter((obj) => { return !/revdetail/gi.test(obj.info.requestUrl) }).length,
                    review: rows.filter((obj) => { return /revdetail/gi.test(obj.info.requestUrl) }).length,
                  },
                  device: {
                    mobile: rows.filter((obj) => { return /mobile/gi.test(obj.device.device.type) }).length,
                    desktop: rows.filter((obj) => { return /desktop/gi.test(obj.device.device.type) }).length,
                    tablet: rows.filter((obj) => { return /tablet/gi.test(obj.device.device.type) }).length,
                  },
                  browser: equalJson(JSON.stringify(browserMap)),
                  os: equalJson(JSON.stringify(osMap)),
                  time: equalJson(JSON.stringify(timeMap)),
                }
              };
          
              finalJson.contents.push(equalJson(JSON.stringify(jsonModel)));
        
              await sleep(1500);
            }
            
            finalRows = await back.mongoRead(collection, { key }, { selfMongo });
            if (finalRows.length > 0) {
              await back.mongoDelete(collection, { key }, { selfMongo });
            }
            await back.mongoCreate(collection, finalJson, { selfMongo });
        
            await logger.log("store web contents view success : " + JSON.stringify(new Date()));
            return { message: "done" };
          } catch (e) {
            logger.error(e).catch((e) => { console.log(e); });
            console.log(e);
            return null;
          }
        }
        storeContentsView(instance.mongo, logger).then((resultMessage) => {
          if (resultMessage.message !== "done") {
            throw new Error("store web contents view fail");
          }
          return sleep(500);
        }).catch((err) => {
          logger.error(err, req).catch((e) => { console.log(e); });
        });
    
        res.send(JSON.stringify({ message: "will do" }));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    router.post([ "/syncClientBudget" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        const toNormal = true;
        const selfCoreMongo = instance.mongo;
        const selfMongo = instance.mongolocal;
        const collection = "clientEvaluation";
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
        let rows;
        let projects, clients;
        let proidArr, cliidArr;
        let thisProject, thisClient;
        let thisRequestNumber;
        let whereQuery, updateQuery;
        let tempString;
        let thisIndex;
        let ago;
        let contentsRows;
    
        (async function () {
          try {
            ago = new Date();
            ago.setMonth(ago.getMonth() - 2);
        
            rows = await back.mongoRead(collection, { date: { $gte: ago } }, { selfMongo });
            proidArr = rows.map((o) => { return { proid: o.proid } });
            cliidArr = rows.map((o) => { return { cliid: o.cliid } });
        
            projects = await back.getProjectsByQuery({ $or: proidArr }, { selfMongo: selfCoreMongo, toNormal });
            clients = await back.getClientsByQuery({ $or: cliidArr }, { selfMongo: selfCoreMongo, toNormal });
        
            for (let obj of rows) {
        
              thisProject = projects.find((p) => { return p.proid === obj.proid });
              thisClient = clients.find((c) => { return c.cliid === obj.cliid });
              thisRequestNumber = 0;
              for (let i = 0; i < thisClient.requests.length; i++) {
                if (thisClient.requests[i].request.timeline.valueOf() <= thisProject.proposal.date.valueOf()) {
                  thisRequestNumber = i;
                  break;
                }
              }
        
              whereQuery = { cliid: obj.cliid };
              updateQuery = {};
        
              tempString = autoComma(obj.spend.total >= obj.spend.styling ? obj.spend.total : obj.spend.styling, true);
              thisIndex = budgetArr.findIndex((str) => { return (new RegExp(tempString, "gi")).test(str) });
        
              if (thisIndex !== -1) {
                updateQuery["requests." + String(thisRequestNumber) + ".request.budget"] = budgetArr[thisIndex];
                await back.updateClient([ whereQuery, updateQuery ], { selfMongo: selfCoreMongo });
                contentsRows = await back.getContentsArrByQuery({ proid: thisProject.proid }, { selfMongo: selfCoreMongo });
                if (contentsRows.length > 0) {
                  await back.updateContents([ { conid: contentsRows[0].conid }, {
                    "contents.portfolio.spaceInfo.budget": budgetArr[thisIndex],
                  } ], { selfMongo: selfCoreMongo });
                }
              }
            }
    
            logger.log("budget sync done").catch((err) => { console.log(err) });
    
          } catch (e) {
            console.log(e);
          }
        })().catch((err) => { console.log(err); })
    
        res.send(JSON.stringify({ message: "will do" }));
    
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/shareGoogleId" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        if (req.body.mode === undefined) {
          throw new Error("invalid post");
        }
        const selfMongo = instance.mongolocal;
        const collection = "shareGoogleId";
        const { mode } = equalJson(req.body);
        let json;
        let rows;
        let resultObj;
    
        if (mode === "store") {
          const { proid, cliid, desid, pid, zipIdDesigner, zipIdClient } = equalJson(req.body);
    
          json = {
            proid,
            cliid,
            desid,
            pid,
            date: new Date(),
            google: {
              designer: zipIdDesigner,
              client: zipIdClient,
              original: zipIdDesigner,
              watermark: zipIdClient,
            }
          };
    
          rows = await back.mongoRead(collection, { proid }, { selfMongo });
          if (rows.length > 0) {
            await back.mongoDelete(collection, { proid }, { selfMongo });
          }
          await back.mongoCreate(collection, json, { selfMongo });
    
          resultObj = { message: "done" };
    
        } else if (mode === "get") {
    
          const { proid } = equalJson(req.body);
          rows = await back.mongoRead(collection, { proid }, { selfMongo });
          if (rows.length > 0) {
            rows.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });
            resultObj = { data: rows[0] };
          } else {
            resultObj = { data: null };
          }
    
        } else {
          throw new Error("invalid post");
        }
    
        res.send(JSON.stringify(resultObj));
    
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/storeHoliday" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        const selfMongo = instance.mongolocal;
        const collection = "holidayList";
        const keyConst = "holiday_";
    
        const returnHolidayArr = async () => {
          try {
            const endPoint0 = "http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo";
            const endPoint1 = "http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo";
            const key = "7VuaiHtcKan1rHFT1huoXCufMJYJnmRl0Y5j5E5dyNnrDu2+bNqF2CzcA6M9RZ6n7GTO9xV74nwHxkNv9bkn/Q==";
            const totalRange = 3;
            let result;
            let holidayArr;
            let thisYear;
      
            thisYear = (new Date()).getFullYear();
            holidayArr = [];
      
            for (let i = 0; i < totalRange; i++) {
              result = await requestSystem(endPoint0, {
                solYear: (thisYear + i),
                ServiceKey: key,
                _type: "json",
                numOfRows: 300,
              }, { method: "get" });
              for (let { isHoliday, locdate } of result.data.response.body.items.item) {
                if (/Y/gi.test(isHoliday)) {
                  holidayArr.push(locdate);
                }
              }
              result = await requestSystem(endPoint1, {
                solYear: (thisYear + i),
                ServiceKey: key,
                _type: "json",
                numOfRows: 300,
              }, { method: "get" });
              for (let { isHoliday, locdate } of result.data.response.body.items.item) {
                if (/Y/gi.test(isHoliday)) {
                  holidayArr.push(locdate);
                }
              }
            }
      
            holidayArr = [ ...new Set(holidayArr.map((num) => { return String(num) })) ].map((str) => { return Number(str) });
            holidayArr.sort((a, b) => { return a - b });
            holidayArr = holidayArr.map((num) => { return String(num).slice(0, 4) + "-" + String(num).slice(4, 6) + "-" + String(num).slice(6, 8) })
      
            return holidayArr;
          } catch (e) {
            console.log(e);
            return null;
          }
        }
    
        (async () => {
          try {
            let resultHolidayArr;
            let safeNum;
            let resultJson;
            let key;
            let thisDateString;
            let thisDateStringArr;
            let rows;
    
            resultHolidayArr = await returnHolidayArr();
            console.log(resultHolidayArr);
            safeNum = 0;
            while (!Array.isArray(resultHolidayArr)) {
              if (safeNum > 100) {
                break;
              }
              await sleep(1000);
              resultHolidayArr = await returnHolidayArr();
              console.log(resultHolidayArr);
              safeNum++;
            }
    
            thisDateString = dateToString(new Date());
            thisDateStringArr = thisDateString.split("-");
    
            key = keyConst + thisDateStringArr[0] + thisDateStringArr[1];
    
            resultJson = {
              key,
              date: new Date(),
              data: resultHolidayArr,
            };
    
            rows = await back.mongoRead(collection, { key }, { selfMongo });
            if (rows.length !== 0) {
              await back.mongoDelete(collection, { key }, { selfMongo });
            }
            await back.mongoCreate(collection, resultJson, { selfMongo });
    
            return true;
          } catch (e) {
            logger.error(e, req).catch((e) => { console.log(e); });
            return false;
          }
        })().catch((err) => {
          logger.error(err, req).catch((e) => { console.log(e); });
        });
    
        res.send(JSON.stringify({ message: "will do" }));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    router.post([ "/getHoliday" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        const selfMongo = instance.mongolocal;
        const collection = "holidayList";
        let rows;
        let oneYearsAgo;
    
        oneYearsAgo = new Date();
        oneYearsAgo.setFullYear(oneYearsAgo.getFullYear() - 1);
    
        rows = await back.mongoRead(collection, { date: { $gte: oneYearsAgo } }, { selfMongo });
        rows.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });
    
        if (rows.length > 0) {
          if (rows[0].data === null) {
            if (rows.find((o) => { return Array.isArray(o.data) }) !== undefined) {
              res.send(JSON.stringify({ holiday: rows.find((o) => { return Array.isArray(o.data) }).data }));
            } else {
              throw new Error("data error");
            }
          } else {
            res.send(JSON.stringify({ holiday: rows[0].data }));
          }
        } else {
          res.send(JSON.stringify({ holiday: [] }));
        }
    
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    router.post([ "/foreContents" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        if (req.body.mode === undefined) {
          throw new Error("invaild post");
        }
        const { mode } = equalJson(req.body);
        const selfMongo = instance.mongolocal;
        const collection = "foreContents";
        let rows;
        let desid;
    
        if (mode === "get") {
          if (req.body.desid === undefined) {
            rows = await back.mongoRead(collection, {}, { selfMongo });
          } else {
            desid = req.body.desid;
            rows = await back.mongoRead(collection, { desid }, { selfMongo });
          }
          res.send(JSON.stringify(rows));
    
        } else if (mode === "exceptionControl") {
    
          if (req.body.pid === undefined || req.body.control === undefined) {
            throw new Error("invalid post");
          }
          const { pid, control } = equalJson(req.body);
          await back.mongoUpdate(collection, [ { pid }, { exception: (control === "register") } ], { selfMongo });
    
          res.send(JSON.stringify({ message: "done" }));
    
        } else if (mode === "exceptionList") {
    
          rows = await back.mongoRead(collection, {}, { selfMongo });
          rows = rows.filter((o) => { return o.exception === true });
          if (req.body.type === "string") {
            res.send(JSON.stringify(rows.map((o) => { return o.pid })));
          } else {
            res.send(JSON.stringify(rows));
          }
    
        } else {
          throw new Error("invaild mode");
        }
    
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    router.post([ "/metaComplex" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        const selfMongo = instance.mongolocal;
        const defaultDay = 3;
        const dayConst = req.body.day === undefined ? defaultDay : (Number.isNaN(Number(req.body.day)) ? defaultDay : Number(req.body.day));
        let boo;
    
        (async () => {
          try {
    
            await meta.metaComplex(selfMongo, 2, logger);
            await sleep(500);
    
            boo = await naver.naverComplex(selfMongo, dayConst, logger);
            if (!boo) {
              await sleep(3000);
              boo = await naver.naverComplex(selfMongo, dayConst, logger);
              if (!boo) {
                await sleep(3000);
                boo = await naver.naverComplex(selfMongo, dayConst, logger);
                if (!boo) {
                  await sleep(3000);
                  await naver.naverComplex(selfMongo, dayConst, logger);
                }
              }
            }
    
            await sleep(500);
    
            boo = await google.googleComplex(selfMongo, dayConst, logger);
            if (!boo) {
              await sleep(3000);
              boo = await google.googleComplex(selfMongo, dayConst, logger);
              if (!boo) {
                await sleep(3000);
                boo = await google.googleComplex(selfMongo, dayConst, logger);
                if (!boo) {
                  await sleep(3000);
                  await google.googleComplex(selfMongo, dayConst, logger);
                }
              }
            }
    
            await sleep(500);
    
          } catch (e) {
            logger.error(e, req).catch((e) => { console.log(e); });
            return false;
          }
        })().catch((err) => {
          logger.error(err, req).catch((e) => { console.log(e); });
        });
    
        res.send(JSON.stringify({ message: "will do" }));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    router.post([ "/metaInstant" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        const selfMongo = instance.mongolocal;
        const selfCoreMongo = instance.mongo;
        const defaultDay = 3;
        const dayConst = req.body.day === undefined ? defaultDay : (Number.isNaN(Number(req.body.day)) ? defaultDay : Number(req.body.day));
        let boo;
    
        (async () => {
          try {
            boo = await meta.syncMetaInstantForm(selfMongo, dayConst, logger);
            if (!boo) {
              await sleep(3000);
              boo = await meta.syncMetaInstantForm(selfMongo, dayConst, logger);
              if (!boo) {
                await sleep(60 * 1000);
                boo = await meta.syncMetaInstantForm(selfMongo, dayConst, logger);
                if (!boo) {
                  await sleep(60 * 1000);
                  await meta.syncMetaInstantForm(selfMongo, dayConst, logger);
                }
              }
            }
    
            if (boo) {
              await sleep(3000);
              await meta.metaInstantToClient(selfMongo, selfCoreMongo, logger);
            }
    
          } catch (e) {
            logger.error(e, req).catch((e) => { console.log(e); });
            return false;
          }
        })().catch((err) => {
          logger.error(err, req).catch((e) => { console.log(e); });
        });
    
        res.send(JSON.stringify({ message: "will do" }));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    router.post([ "/getAdsComplex" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        if (req.body.startDate === undefined || req.body.endDate === undefined) {
          throw new Error("invalid post");
        }
        const { startDate, endDate } = equalJson(req.body);
        const selfMongo = instance.mongolocal;
        const collectionList = [
          "metaComplex",
          "naverComplex",
          "googleComplex",
          "kakaoComplex",
        ];
        let resultObj;
        let startDateCopied;
        let endDateCopied;
        let start, end;
        let rows;
        let whereQuery;
    
        resultObj = {};
    
        startDateCopied = new Date(JSON.stringify(startDate).slice(1, -1));
        start = new Date(startDateCopied.getFullYear(), startDateCopied.getMonth(), startDateCopied.getDate(), 0, 0, 0);
    
        endDateCopied = new Date(JSON.stringify(endDate).slice(1, -1));
        end = new Date(endDateCopied.getFullYear(), endDateCopied.getMonth(), endDateCopied.getDate(), 0, 0, 0);
        end.setDate(end.getDate() + 1);
    
        whereQuery = {};
        whereQuery["date.from"] = {
          $gte: start,
          $lt: end,
        }
    
        for (let collection of collectionList) {
          rows = await back.mongoRead(collection, whereQuery, { selfMongo });
          resultObj[collection.replace(/Complex/g, '')] = equalJson(JSON.stringify(rows));
          resultObj[collection.replace(/Complex/g, '')].sort((a, b) => {
            return b.date.from.valueOf() - a.date.from.valueOf();
          });
        }
    
        res.send(JSON.stringify(resultObj));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    router.post([ "/getSnsComplex" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        if (req.body.startDate === undefined || req.body.endDate === undefined) {
          throw new Error("invalid post");
        }
        const { startDate, endDate } = equalJson(req.body);
        const selfMongo = instance.mongolocal;
        const collectionList = [
          "metaComplex",
          "googleComplex",
        ];
        let resultObj;
        let startDateCopied;
        let endDateCopied;
        let start, end;
        let rows;
        let whereQuery;
    
        resultObj = {};
    
        startDateCopied = new Date(JSON.stringify(startDate).slice(1, -1));
        start = new Date(startDateCopied.getFullYear(), startDateCopied.getMonth(), startDateCopied.getDate(), 0, 0, 0);
    
        endDateCopied = new Date(JSON.stringify(endDate).slice(1, -1));
        end = new Date(endDateCopied.getFullYear(), endDateCopied.getMonth(), endDateCopied.getDate(), 0, 0, 0);
        end.setDate(end.getDate() + 1);
    
        whereQuery = {};
        whereQuery["date.from"] = {
          $gte: start,
          $lt: end,
        }
    
        for (let collection of collectionList) {
          rows = await back.mongoRead(collection, whereQuery, { selfMongo });
          resultObj[collection.replace(/Complex/g, '')] = equalJson(JSON.stringify(rows));
          resultObj[collection.replace(/Complex/g, '')].sort((a, b) => {
            return b.date.from.valueOf() - a.date.from.valueOf();
          });
        }
    
        res.send(JSON.stringify(resultObj));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    router.post([ "/evaluationSubmit" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        if (req.body.cliid === undefined || req.body.proid === undefined || req.body.desid === undefined || req.body.map === undefined) {
          throw new Error("invalid post");
        }
        const { cliid, proid, desid, map } = equalJson(req.body);
        const selfMongo = instance.mongolocal;
        const selfCoreMongo = instance.mongo;
        const collection = "clientEvaluation";
        let constructAmount;
        let constructPeriod;
        let totalAmount;
        let stylingAmount;
        let furniture;
        let productList;
        let settingPeriod;
        let compliance;
        let designSatisfaction;
        let feedbackSatisfaction;
        let operationSatisfaction;
        let json;
        let rows;
        let thisClient;
    
        [ thisClient ] = await back.mongoPick("client", [ { cliid }, { cliid: 1, name: 1 } ], { selfMongo: selfCoreMongo });
    
        constructAmount = map.find((o) => { return o.property === "constructamount" }) === undefined ? "" : map.find((o) => { return o.property === "constructamount" }).value;
        constructPeriod = map.find((o) => { return o.property === "constructperiod" }) === undefined ? "" : map.find((o) => { return o.property === "constructperiod" }).value;
        totalAmount = map.find((o) => { return o.property === "totalamount" }) === undefined ? "" : map.find((o) => { return o.property === "totalamount" }).value;
        stylingAmount = map.find((o) => { return o.property === "stylingamount" }) === undefined ? "" : map.find((o) => { return o.property === "stylingamount" }).value;
        furniture = map.find((o) => { return o.property === "furniture" }) === undefined ? "" : map.find((o) => { return o.property === "furniture" }).value;
        productList = map.find((o) => { return o.property === "productlist" }) === undefined ? "" : map.find((o) => { return o.property === "productlist" }).value;
        settingPeriod = map.find((o) => { return o.property === "settingperiod" }) === undefined ? "" : map.find((o) => { return o.property === "settingperiod" }).value;
        compliance = map.find((o) => { return o.property === "compliance_ratio" }) === undefined ? 1 : map.find((o) => { return o.property === "compliance_ratio" }).value;
        designSatisfaction = map.find((o) => { return o.property === "designsatisfaction" }) === undefined ? "" : map.find((o) => { return o.property === "designsatisfaction" }).value;
        feedbackSatisfaction = map.find((o) => { return o.property === "feedbacksatisfaction" }) === undefined ? "" : map.find((o) => { return o.property === "feedbacksatisfaction" }).value;
        operationSatisfaction = map.find((o) => { return o.property === "operationsatisfaction" }) === undefined ? "" : map.find((o) => { return o.property === "operationsatisfaction" }).value;
    
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
    
        if (/시공 없음/gi.test(constructAmount)) {
          json.construct.level = 0;
        } else if (/부분 시공/gi.test(constructAmount)) {
          json.construct.level = 1;
        } else if (/전체 시공/gi.test(constructAmount)) {
          json.construct.level = 2;
        } else {
          json.construct.level = 0;
        }
    
        if (/시공 없음/gi.test(constructPeriod)) {
          json.construct.period = 0;
        } else if (/2주 이하/gi.test(constructPeriod)) {
          json.construct.period = 14;
        } else if (/4주 이상/gi.test(constructPeriod)) {
          json.construct.period = 30;
        } else if (/[0-9]/gi.test(constructPeriod)) {
          json.construct.period = Math.ceil(constructPeriod.split("~").map((str) => { return Number(str.replace(/[^0-9]/gi, '')) * 7 }).reduce((acc, curr) => { return acc + curr }, 0) / 2);
        } else {
          json.construct.period = 0;
        }
    
        if (/1억/gi.test(totalAmount)) {
          json.spend.total = 100000000;
        } else if (/만원/gi.test(totalAmount)) {
          json.spend.total = Number(totalAmount.replace(/[^0-9]/gi, '')) * 10000;
        } else {
          json.spend.total = 0;
        }
    
        if (/1억/gi.test(stylingAmount)) {
          json.spend.styling = 100000000;
        } else if (/만원/gi.test(stylingAmount)) {
          json.spend.styling = Number(stylingAmount.replace(/[^0-9]/gi, '')) * 10000;
        } else {
          json.spend.styling = 0;
        }
    
        json.spend.construct = json.spend.total - json.spend.styling;
    
        if (/불만족/gi.test(productList)) {
          json.purchase.list = 0;
        } else if (/보통/gi.test(productList)) {
          json.purchase.list = 1;
        } else if (/만족/gi.test(productList)) {
          json.purchase.list = 2;
        } else {
          json.purchase.list = 1;
        }
    
        if (/재배치/gi.test(furniture)) {
          json.purchase.furniture = 0;
        } else if (/일부/gi.test(furniture)) {
          json.purchase.furniture = 1;
        } else {
          json.purchase.furniture = 2;
        }
    
        if (/구매 없음/gi.test(settingPeriod)) {
          json.purchase.period = 0;
        } else if (/2주 이하/gi.test(settingPeriod)) {
          json.purchase.period = 14;
        } else if (/4주 이상/gi.test(settingPeriod)) {
          json.purchase.period = 30;
        } else if (/[0-9]/gi.test(constructPeriod)) {
          json.purchase.period = Math.ceil(settingPeriod.split("~").map((str) => { return Number(str.replace(/[^0-9]/gi, '')) * 7 }).reduce((acc, curr) => { return acc + curr }, 0) / 2);
        } else {
          json.purchase.period = 0;
        }
    
        json.purchase.compliance = compliance;
    
        if (/불만족/gi.test(designSatisfaction)) {
          json.satisfaction.design = 0;
        } else if (/보통/gi.test(designSatisfaction)) {
          json.satisfaction.design = 1;
        } else if (/만족/gi.test(designSatisfaction)) {
          json.satisfaction.design = 2;
        } else {
          json.satisfaction.design = 1;
        }
    
        if (/불만족/gi.test(feedbackSatisfaction)) {
          json.satisfaction.feedback = 0;
        } else if (/보통/gi.test(feedbackSatisfaction)) {
          json.satisfaction.feedback = 1;
        } else if (/만족/gi.test(feedbackSatisfaction)) {
          json.satisfaction.feedback = 2;
        } else {
          json.satisfaction.feedback = 1;
        }
    
        if (/불만족/gi.test(operationSatisfaction)) {
          json.satisfaction.operation = 0;
        } else if (/보통/gi.test(operationSatisfaction)) {
          json.satisfaction.operation = 1;
        } else if (/만족/gi.test(operationSatisfaction)) {
          json.satisfaction.operation = 2;
        } else {
          json.satisfaction.operation = 1;
        }
    
        rows = await back.mongoRead(collection, { proid }, { selfMongo });
        if (rows.length > 0) {
          await back.mongoDelete(collection, { proid }, { selfMongo });
        }
        await back.mongoCreate(collection, json, { selfMongo });
    
        messageSend({ text: thisClient.name + " 고객님께서 평가를 완료하였습니다!", channel: "#200_web", voice: false, fairy: false }).then(() => {
          return requestSystem("https://" + instance.address.officeinfo.ghost.host + ":3000/syncEvaluationContents", { message: "do it" }, { headers: { "Content-Type": "application/json" } });
        }).catch((err) => {
          logger.error(err, req).catch((e) => { console.log(e); });
        });
    
        res.send(JSON.stringify({ message: "done" }));
    
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    router.post([ "/evaluationList" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        const selfMongo = instance.mongolocal;
        const collection = "clientEvaluation";
        const mode = (req.body.mode === undefined ? "pick" : req.body.mode);
        let rows;
        let targetJson;
    
        if (mode === "pick") {
    
          if (req.body.proid === undefined) {
            throw new Error("invalid post");
          }
          const { proid } = equalJson(req.body);
          
          rows = await back.mongoRead(collection, { proid }, { selfMongo });
          if (rows.length > 0) {
            rows.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });
            targetJson = equalJson(JSON.stringify(rows[0]));
            res.send(JSON.stringify({
              exist: true,
              data: targetJson,
            }));
          } else {
            res.send(JSON.stringify({
              exist: false,
              data: null,
            }));
          }
    
        } else if (mode === "list") {
    
          if (req.body.whereQuery === undefined) {
            throw new Error("invalid post");
          }
          const { whereQuery } = equalJson(req.body);
          rows = await back.mongoRead(collection, whereQuery, { selfMongo });
          targetJson = equalJson(JSON.stringify(rows));
          for (let obj of targetJson) {
            delete obj._id;
          }
          res.send(JSON.stringify({ data: targetJson }));
    
        } else {
          throw new Error("invalid mode");
        }
    
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    router.post([ "/evaluationNotice" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        if (req.body.mode === undefined) {
          throw new Error("invalid post");
        }
        const { mode } = equalJson(req.body);
        const selfMongo = instance.mongolocal;
        const collection = "evaluationNotice";
        let json;
        let rows;
        let targetJson;
        let thisJson;
    
        if (mode === "send") {
    
          if (req.body.proid === undefined || req.body.cliid === undefined || req.body.desid === undefined) {
            throw new Error("invalid post");
          }
          const { cliid, desid, proid } = equalJson(req.body);
          json = {
            proid,
            desid,
            cliid,
            date: new Date(),
            history: [
              (new Date()),
            ]
          };
          rows = await back.mongoRead(collection, { proid }, { selfMongo });
          if (rows.length > 0) {
            [ targetJson ] = rows;
            delete targetJson._id;
            thisJson = equalJson(JSON.stringify(targetJson));
            thisJson.date = new Date();
            thisJson.history.unshift(new Date());
            await back.mongoDelete(collection, { proid }, { selfMongo });
            await back.mongoCreate(collection, thisJson, { selfMongo });
          } else {
            await back.mongoCreate(collection, json, { selfMongo });
          }
          res.send(JSON.stringify({ message: "done" }));
    
        } else if (mode === "list") {
    
          if (req.body.from === undefined) {
            throw new Error("invalid post");
          }
          const { from } = equalJson(req.body);
          rows = await back.mongoRead(collection, { date: { $gte: from } }, { selfMongo });
          targetJson = equalJson(JSON.stringify(rows));
          for (let obj of targetJson) {
            delete obj._id;
          }
          res.send(JSON.stringify({ data: targetJson }));
    
        } else {
          throw new Error("invalid mode");
        }
    
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    router.post([ "/getAllContents" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        if (req.body.mode === undefined) {
          throw new Error("invalid post");
        }
        const { mode } = equalJson(req.body);
        const selfMongo = instance.mongo;
        const selfLocalMongo = instance.mongolocal;
        const collection = "foreContents";
        const delta = 24;
        let contentsArr, projects, clients, designers;
        let whereQuery0, whereQuery1;
        let resultObj;
        let foreContents;
        let proidArr;
        let coreWhereQuery;
        let ago;
        let searchClients;
        let searchProjects;
        let cliidArr;
        let searchProidArr;
        let searchContents;
        let searchForeContents;
        let desidArr;
        let thisDesignerName;
    
        if (mode === "all") {
    
          if (req.body.whereQuery === undefined) {
            if (req.body.init !== undefined) {
              ago = new Date();
              ago.setMonth(ago.getMonth() - delta);
              contentsArr = (await back.getContentsArrByQuery({
                "contents.portfolio.date": { $gte: ago }
              }, { selfMongo })).toNormal();
            } else {
              contentsArr = (await back.getContentsArrByQuery({}, { selfMongo })).toNormal();
            }
          } else {
            coreWhereQuery = equalJson(req.body.whereQuery);
            contentsArr = (await back.getContentsArrByQuery(coreWhereQuery, { selfMongo })).toNormal();
          }
    
          designers = (await back.getDesignersByQuery({}, { selfMongo })).toNormal();
    
          if (req.body.nonFore !== undefined) {
            foreContents = [];  
          } else {
            foreContents = await back.mongoRead(collection, {}, { selfMongo: selfLocalMongo });
            foreContents.sort((a, b) => { return Number(b.pid.replace(/[^0-9]/gi, '')) - Number(a.pid.replace(/[^0-9]/gi, '')); });  
          }
    
          proidArr = contentsArr.filter((c) => { return c.proid !== "" }).map((obj) => { return obj.proid });
          proidArr = proidArr.concat(foreContents.map((o) => { return o.proid }));
          proidArr = [ ...new Set(proidArr) ];
    
          whereQuery0 = {};
          whereQuery0["$or"] = proidArr.map((proid) => { return { proid } });
          projects = (await back.getProjectsByQuery(whereQuery0, { selfMongo })).toNormal();
    
          whereQuery1 = {};
          whereQuery1["$or"] = projects.map((obj) => { return { cliid: obj.cliid } });
          clients = (await back.getClientsByQuery(whereQuery1, { selfMongo })).toNormal();
    
          resultObj = { contentsArr, foreContents, projects, clients, designers };
    
          res.send(JSON.stringify(resultObj));
    
        } else if (mode === "search") {
    
          if (req.body.value === undefined) {
            throw new Error("invalid post");
          }
          const { value } = equalJson(req.body);
    
          if (/^[가-힣]/i.test(value)) {
    
            designers = (await back.getDesignersByQuery({ designer: { $regex: value } }, { selfMongo })).toNormal();
            if (designers.length > 0) {
    
              desidArr = designers.filter((d) => { return d.desid !== "" }).map((d) => { return d.desid });
              desidArr = [ ...new Set(desidArr) ];
              
              projects = (await back.getProjectsByQuery({ $or: desidArr.map((desid) => { return { desid } }) }, { selfMongo })).toNormal();
              proidArr = projects.filter((d) => { return d.proid !== "" }).map((d) => { return d.proid });
              proidArr = [ ...new Set(proidArr) ];
    
              searchContents = [];
              searchForeContents = [];
              if (proidArr.length > 0) {
                searchProidArr = proidArr.map((proid) => { return { proid } }).concat(desidArr.map((desid) => { return { desid } }));
                searchContents = await back.getContentsArrByQuery({ $or: searchProidArr }, { selfMongo });
                searchForeContents = await back.mongoRead(collection, { $or: searchProidArr }, { selfMongo: selfLocalMongo });  
              }
    
              proidArr = searchContents.filter((c) => { return c.proid !== "" }).map((obj) => { return obj.proid });
              proidArr = proidArr.concat(searchForeContents.map((o) => { return o.proid }));
              proidArr = [ ...new Set(proidArr) ];
              
              if (proidArr.length > 0) {
                whereQuery0 = {};
                whereQuery0["$or"] = proidArr.map((proid) => { return { proid } });
                projects = (await back.getProjectsByQuery(whereQuery0, { selfMongo })).toNormal();
                whereQuery1 = {};
                whereQuery1["$or"] = projects.map((obj) => { return { cliid: obj.cliid } });
                clients = (await back.getClientsByQuery(whereQuery1, { selfMongo })).toNormal();
                resultObj = {
                  contentsArr: searchContents,
                  foreContents: searchForeContents,
                  projects,
                  clients,
                  designers
                };
              } else {
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
              resultObj = {
                contentsArr: [],
                foreContents: [],
                projects: [],
                clients: [],
                designers: [],
              };
            }
    
          } else if (/^c[ ]*\:[ ]*[가-힣]*/i.test(value)) {
    
            thisDesignerName = value.split(":").map((str) => { return str.trim() })[1];
    
            searchContents = [];
            searchForeContents = [];
            searchClients = await back.getClientsByQuery({
              name: { $regex: thisDesignerName }
            }, { selfMongo });
            if (searchClients.length > 0) {
              cliidArr = searchClients.toNormal().map((c) => { return c.cliid }).map((cliid) => { return { cliid } });
              searchProjects = await back.getProjectsByQuery({
                $or: cliidArr
              }, { selfMongo });
              if (searchProjects.length > 0) {
                searchProidArr = searchProjects.toNormal().map((c) => { return c.proid }).map((proid) => { return { proid } });
                searchContents = await back.getContentsArrByQuery({ $or: searchProidArr }, { selfMongo });
                searchForeContents = await back.mongoRead(collection, { $or: searchProidArr }, { selfMongo: selfLocalMongo });
              }
            }
    
            proidArr = searchContents.filter((c) => { return c.proid !== "" }).map((obj) => { return obj.proid });
            proidArr = proidArr.concat(searchForeContents.map((o) => { return o.proid }));
            proidArr = [ ...new Set(proidArr) ];
      
            desidArr = searchContents.filter((c) => { return c.desid !== "" }).map((obj) => { return obj.desid });
            desidArr = desidArr.concat(searchForeContents.map((o) => { return o.desid }));
            desidArr = [ ...new Set(desidArr) ];
    
            if (desidArr.length > 0) {
              designers = (await back.getDesignersByQuery({ $or: desidArr.map((desid) => { return { desid } }) }, { selfMongo })).toNormal();
            } else {
              designers = [];
            }
    
            if (proidArr.length > 0) {
              whereQuery0 = {};
              whereQuery0["$or"] = proidArr.map((proid) => { return { proid } });
              projects = (await back.getProjectsByQuery(whereQuery0, { selfMongo })).toNormal();
              whereQuery1 = {};
              whereQuery1["$or"] = projects.map((obj) => { return { cliid: obj.cliid } });
              clients = (await back.getClientsByQuery(whereQuery1, { selfMongo })).toNormal();
              resultObj = {
                contentsArr: searchContents,
                foreContents: searchForeContents,
                projects,
                clients,
                designers
              };
            } else {
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
            if (/^[ap][0-9]+$/i.test(value)) {
    
              searchContents = await back.getContentsArrByQuery({ "contents.portfolio.pid": value.trim() }, { selfMongo });
              searchForeContents = await back.mongoRead(collection, { "pid": value.trim() }, { selfMongo: selfLocalMongo });
    
              proidArr = searchContents.filter((c) => { return c.proid !== "" }).map((obj) => { return obj.proid });
              proidArr = proidArr.concat(searchForeContents.map((o) => { return o.proid }));
              proidArr = [ ...new Set(proidArr) ];
        
              desidArr = searchContents.filter((c) => { return c.desid !== "" }).map((obj) => { return obj.desid });
              desidArr = desidArr.concat(searchForeContents.map((o) => { return o.desid }));
              desidArr = [ ...new Set(desidArr) ];
    
              if (desidArr.length > 0) {
                designers = (await back.getDesignersByQuery({ $or: desidArr.map((desid) => { return { desid } }) }, { selfMongo })).toNormal();
              } else {
                designers = [];
              }
    
              if (proidArr.length > 0) {
                whereQuery0 = {};
                whereQuery0["$or"] = proidArr.map((proid) => { return { proid } });
                projects = (await back.getProjectsByQuery(whereQuery0, { selfMongo })).toNormal();
                whereQuery1 = {};
                whereQuery1["$or"] = projects.map((obj) => { return { cliid: obj.cliid } });
                clients = (await back.getClientsByQuery(whereQuery1, { selfMongo })).toNormal();
                resultObj = {
                  contentsArr: searchContents,
                  foreContents: searchForeContents,
                  projects,
                  clients,
                  designers
                };
              } else {
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
    
            } else if (/^p/i.test(value)) {
    
              searchContents = await back.getContentsArrByQuery({ "proid": value.trim() }, { selfMongo });
              searchForeContents = await back.mongoRead(collection, { "proid": value.trim() }, { selfMongo: selfLocalMongo });
    
              proidArr = searchContents.filter((c) => { return c.proid !== "" }).map((obj) => { return obj.proid });
              proidArr = proidArr.concat(searchForeContents.map((o) => { return o.proid }));
              proidArr = [ ...new Set(proidArr) ];
        
              desidArr = searchContents.filter((c) => { return c.desid !== "" }).map((obj) => { return obj.desid });
              desidArr = desidArr.concat(searchForeContents.map((o) => { return o.desid }));
              desidArr = [ ...new Set(desidArr) ];
    
              if (desidArr.length > 0) {
                designers = (await back.getDesignersByQuery({ $or: desidArr.map((desid) => { return { desid } }) }, { selfMongo })).toNormal();
              } else {
                designers = [];
              }
    
              if (proidArr.length > 0) {
                whereQuery0 = {};
                whereQuery0["$or"] = proidArr.map((proid) => { return { proid } });
                projects = (await back.getProjectsByQuery(whereQuery0, { selfMongo })).toNormal();
                whereQuery1 = {};
                whereQuery1["$or"] = projects.map((obj) => { return { cliid: obj.cliid } });
                clients = (await back.getClientsByQuery(whereQuery1, { selfMongo })).toNormal();
                resultObj = {
                  contentsArr: searchContents,
                  foreContents: searchForeContents,
                  projects,
                  clients,
                  designers
                };
              } else {
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
    
            } else if (/^t/i.test(value)) {
    
              searchContents = await back.getContentsArrByQuery({ "conid": value.trim() }, { selfMongo });
              searchForeContents = [];
    
              proidArr = searchContents.filter((c) => { return c.proid !== "" }).map((obj) => { return obj.proid });
              proidArr = proidArr.concat(searchForeContents.map((o) => { return o.proid }));
              proidArr = [ ...new Set(proidArr) ];
        
              desidArr = searchContents.filter((c) => { return c.desid !== "" }).map((obj) => { return obj.desid });
              desidArr = desidArr.concat(searchForeContents.map((o) => { return o.desid }));
              desidArr = [ ...new Set(desidArr) ];
    
              if (desidArr.length > 0) {
                designers = (await back.getDesignersByQuery({ $or: desidArr.map((desid) => { return { desid } }) }, { selfMongo })).toNormal();
              } else {
                designers = [];
              }
    
              if (proidArr.length > 0) {
                whereQuery0 = {};
                whereQuery0["$or"] = proidArr.map((proid) => { return { proid } });
                projects = (await back.getProjectsByQuery(whereQuery0, { selfMongo })).toNormal();
                whereQuery1 = {};
                whereQuery1["$or"] = projects.map((obj) => { return { cliid: obj.cliid } });
                clients = (await back.getClientsByQuery(whereQuery1, { selfMongo })).toNormal();
                resultObj = {
                  contentsArr: searchContents,
                  foreContents: searchForeContents,
                  projects,
                  clients,
                  designers
                };
              } else {
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
    
            } else if (/^d/i.test(value)) {
    
              designers = (await back.getDesignersByQuery({ desid: { $regex: value } }, { selfMongo })).toNormal();
              if (designers.length > 0) {
    
                desidArr = designers.filter((d) => { return d.desid !== "" }).map((d) => { return d.desid });
                desidArr = [ ...new Set(desidArr) ];
                
                projects = (await back.getProjectsByQuery({ $or: desidArr.map((desid) => { return { desid } }) }, { selfMongo })).toNormal();
                proidArr = projects.filter((d) => { return d.proid !== "" }).map((d) => { return d.proid });
                proidArr = [ ...new Set(proidArr) ];
    
                searchContents = [];
                searchForeContents = [];
                if (proidArr.length > 0) {
                  searchProidArr = proidArr.map((proid) => { return { proid } }).concat(desidArr.map((desid) => { return { desid } }));
                  searchContents = await back.getContentsArrByQuery({ $or: searchProidArr }, { selfMongo });
                  searchForeContents = await back.mongoRead(collection, { $or: searchProidArr }, { selfMongo: selfLocalMongo });  
                }
    
                proidArr = searchContents.filter((c) => { return c.proid !== "" }).map((obj) => { return obj.proid });
                proidArr = proidArr.concat(searchForeContents.map((o) => { return o.proid }));
                proidArr = [ ...new Set(proidArr) ];
                
                if (proidArr.length > 0) {
                  whereQuery0 = {};
                  whereQuery0["$or"] = proidArr.map((proid) => { return { proid } });
                  projects = (await back.getProjectsByQuery(whereQuery0, { selfMongo })).toNormal();
                  whereQuery1 = {};
                  whereQuery1["$or"] = projects.map((obj) => { return { cliid: obj.cliid } });
                  clients = (await back.getClientsByQuery(whereQuery1, { selfMongo })).toNormal();
                  resultObj = {
                    contentsArr: searchContents,
                    foreContents: searchForeContents,
                    projects,
                    clients,
                    designers
                  };
                } else {
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
                resultObj = {
                  contentsArr: [],
                  foreContents: [],
                  projects: [],
                  clients: [],
                  designers: [],
                };
              }
    
            } else {
              resultObj = {
                contentsArr: [],
                foreContents: [],
                projects: [],
                clients: [],
                designers: [],
              };
            }
          }
    
          res.send(JSON.stringify(resultObj));
    
        } else {
          throw new Error("invalid mode");
        }
    
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });
    
    router.post([ "/queryAnalytics" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        if (req.body.mode === undefined) {
          throw new Error("invalid post");
        }
        const { mode } = equalJson(req.body);
        const selfMongo = instance.mongolocal;
        const collection = "queryAnalytics";
        let rows;
        if (mode === "get") {
          if (req.body.whereQuery === undefined) {
            throw new Error("invalid post 2");
          }
          const { whereQuery } = equalJson(req.body);
          rows = await back.mongoRead(collection, whereQuery, { selfMongo });
          for (let obj of rows) {
            delete obj._id;
          }
          res.send(JSON.stringify(rows));
        } else {
          throw new Error("invalid mode");
        }
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ message: "error : " + e.message }));
      }
    });

    return router;
  }
}

module.exports = StaticRouter;
