/**
 * @file dataRouter.js
 * @description 이 파일은 DataConsole 서버의 라우팅을 정의하며, 여러 모듈과의 상호작용을 처리합니다.
 */

const Mother = require(`${process.cwd()}/apps/mother.js`); // Mother 클래스의 인스턴스를 가져옴
const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`); // BackMaker 클래스 가져옴
const BackWorker = require(`${process.cwd()}/apps/backMaker/backWorker.js`); // 백엔드 작업을 위한 Worker 클래스
const BillMaker = require(`${process.cwd()}/apps/billMaker/billMaker.js`); // 청구서 처리 관련 클래스
const GoogleSheet = require(`${process.cwd()}/apps/googleAPIs/googleSheet.js`); // 구글 스프레드시트 API 모듈
const GoogleDrive = require(`${process.cwd()}/apps/googleAPIs/googleDrive.js`); // 구글 드라이브 API 모듈
const GoogleCalendar = require(`${process.cwd()}/apps/googleAPIs/googleCalendar.js`); // 구글 캘린더 API 모듈
const GoogleAnalytics = require(`${process.cwd()}/apps/googleAPIs/googleAnalytics.js`); // 구글 애널리틱스 API 모듈
const DataPatch = require(`${process.cwd()}/apps/dataConsole/router/dataPatch.js`); // 데이터 패치 및 저장 관련 클래스
const AddressParser = require(`${process.cwd()}/apps/addressParser/addressParser.js`); // 주소 파서
const ImageReader = require(process.cwd() + "/apps/imageReader/imageReader.js"); // 이미지 처리 모듈
const ParsingHangul = require(process.cwd() + "/apps/parsingHangul/parsingHangul.js"); // 한글 파싱 관련 모듈
const { resolve } = require('path'); // 경로 처리 유틸리티
const portoneAPIKey = "dvf4oiydUAucbFMS1EHKYnxptZmJYBRaIstCrKIK9RzXJTMQeaZWET2jGEUQwgvsDy3CchbGSXakklw9"; // 포트원 API 키
const channelKey = "channel-key-cc21b9f2-0c98-44a8-b5af-9cf62ae31f8f"; // 채널 키
const storeId = "store-90e0b405-610c-4964-8d0d-2701de0660b4"; // 스토어 ID
const MID = "MOIhomeli1"; // MID 값
const mother = new Mother(); // Mother 클래스의 인스턴스를 생성하여 라우터에서 사용
const back = new BackMaker(); // BackMaker 클래스의 인스턴스를 생성하여 라우터에서 사용
const { spawn } = require("child_process"); // 프로세스 스폰을 위한 모듈
const querystring = require("querystring"); // 쿼리스트링을 처리하기 위한 유틸리티
const parser = require("ua-parser-js"); // 사용자 에이전트 파싱
const url = require("url"); // URL 유틸리티
const address = require(process.cwd() + "/apps/infoObj.js"); // 서버 주소 정보를 불러옴
const host = address.officeinfo.ghost.host; // 호스트 정보
const work = new BackWorker(); // 백엔드 작업을 위한 BackWorker 인스턴스
const dir = process.cwd() + "/apps/dataConsole"; // 데이터 콘솔 디렉터리 경로
const bill = new BillMaker(); // 청구서 생성기 인스턴스
const patch = new DataPatch(); // 데이터 패치 모듈 인스턴스
const sheets = new GoogleSheet(); // 구글 스프레드시트 API 인스턴스
const drive = new GoogleDrive(); // 구글 드라이브 API 인스턴스
const calendar = new GoogleCalendar(); // 구글 캘린더 API 인스턴스
const analytics = new GoogleAnalytics(); // 구글 애널리틱스 API 인스턴스
const imageReader = new ImageReader(mother, back, address); // 이미지 리더 인스턴스, Mother와 BackMaker 사용
const hangul = new ParsingHangul(); // 한글 파싱 모듈 인스턴스
const bankCode = BillMaker.returnBankCode("", "matrix"); // 은행 코드 설정
const crypto = require("crypto"); // 암호화 모듈
const password = "homeliaison"; // 비밀번호 설정

// 로그 관련 설정
const bar = "============================================================"; // 로그 출력을 위한 구분선

// 여러 유틸리티 메서드와 Mother의 메서드를 가져옴
const { errorLog, alertLog, cronLog, aliveLog, emergencyAlarm, expressLog, errorLogSync, mysqlQuery, leafParsing, processSystem, linkToString, ghostFileUpload, jsonToString, tempReplaceImage } = mother;
const { diskReading, aliveMongo, equalJson, dateToString, serviceParsing, stringToDate, requestSystem, db, fileSystem, shellExec, shellLink, messageLog, zeroAddition, objectDeepCopy, messageSend, shell, homeliaisonAnalytics, sleep, stringToLink, autoHypenPhone, autoComma, mongo, mongoconsoleinfo, cryptoString, decryptoHash, ipParsing, uniqueValue, setQueue, binaryRequest, generalFileUpload } = mother;
const { consoleQ, copyToClipboard, http2InNode, orderSystem, stringToJson, chromeOpen, curlRequest, ajaxJson, getDateMatrix, promiseTimeout, headRequest, treeParsing, appleScript, copyJson, pythonExecute, ipCheck, s3FileDelete, sendMessage, hexaJson, promiseTogether, localUnique, sha256Hmac, variableArray, designerCareer, mediaQuery, getHoliday, capitalizeString } = mother;

/**
 * 로그와 에러 처리 관련 유틸리티 클래스
 * @class
 */
const logger = {
  /**
   * 비상 알림을 전송합니다.
   * @param {string} text - 전송할 텍스트
   */
  alert: async (text) => {
    try {
      await emergencyAlarm(text);
    } catch (e) {
      console.error(e);
    }
  },
  
  /**
   * 로그를 출력합니다.
   * @param {object} obj - 출력할 로그 객체
   * @param {object} req - 요청 객체 (기본값: {url: "unknown"})
   */
  log: async (obj, req = { url: "unknown" }) => {
    try {
      console.log(bar);
      console.log(new Date(), "log");
      console.log("in " + String(req.url));
      console.log(obj);
      console.log(bar);
    } catch (e) {
      console.error(e);
    }
  },

  /**
   * 에러를 출력합니다.
   * @param {object} obj - 출력할 에러 객체
   * @param {object} req - 요청 객체 (기본값: {url: "unknown"})
   */
  error: async (obj, req = { url: "unknown" }) => {
    try {
      console.log(bar);
      console.log(new Date(), "error");
      console.log("in " + String(req.url));
      console.log(obj);
      console.log(bar);
    } catch (e) {
      console.error(e);
    }
  },

  /**
   * 크론 로그를 기록합니다.
   * @param {string} text - 기록할 텍스트
   */
  cron: async (text) => {
    try {
      await cronLog(text);
    } catch (e) {
      console.error(e);
    }
  },

  /**
   * 서버 상태를 기록합니다.
   * @param {string} text - 기록할 상태 메시지
   */
  alive: async (text) => {
    try {
      await aliveLog(text);
    } catch (e) {
      console.error(e);
    }
  },
};

/**
 * 쿠키 파싱 함수
 * @function cookieParsing
 * @description 이 함수는 HTTP 요청에서 전달된 쿠키 문자열을 객체 형식으로 변환합니다. 
 *             쿠키가 없거나, 잘못된 형식일 경우 null을 반환합니다.
 * 
 * @param {object} req - HTTP 요청 객체. 쿠키 정보가 포함되어 있습니다.
 * @returns {object|null} - 쿠키 이름과 값을 key-value 형식으로 담은 객체를 반환하며, 
 *                          쿠키가 없거나 파싱에 실패하면 null을 반환합니다.
 */
const cookieParsing = (req) => {
  // 요청 헤더에 쿠키가 없을 경우 null을 반환
  if (req.headers.cookie === undefined) {
    return null;
  } else {
    // 쿠키가 문자열로 존재하며, "=" 기호가 있을 경우에만 처리
    if (typeof req.headers.cookie === "string" && /=/gi.test(req.headers.cookie)) {
      // 쿠키 문자열을 저장
      const str = req.headers.cookie;

      /**
       * @function tryDecode
       * @description 쿠키 값을 URL 디코딩 시도, 디코딩에 실패하면 원래 문자열 반환
       * 
       * @param {string} str - 디코딩할 쿠키 값
       * @returns {string} - 디코딩된 문자열, 실패하면 원래 문자열 반환
       */
      const tryDecode = (str) => {
        try {
          return decodeURIComponent(str); // URL 디코딩을 시도
        } catch (e) {
          return str; // 디코딩 실패 시 원래 값을 반환
        }
      }

      // 쿠키 문자열을 세미콜론(;) 기준으로 분리하여 각각의 쿠키 값으로 나눔
      const pairs = str.split(/; */);

      // 쿠키를 저장할 객체를 초기화
      let o;
      let key, val;
      o = {};

      // 쿠키 배열을 순회하며 키-값 쌍을 추출
      for (let pair of pairs) {
        // "=" 기호가 있는 위치를 찾음
        eq_idx = pair.indexOf('=');

        // "=" 기호가 없으면 잘못된 쿠키 포맷이므로 건너뜀
        if (eq_idx < 0) {
          continue;
        }

        // "=" 기호 앞부분을 키로, 뒷부분을 값으로 분리
        key = pair.slice(0, eq_idx).trim(); // 키를 추출하고 공백을 제거
        val = pair.slice(eq_idx + 1, pair.length).trim(); // 값을 추출하고 공백을 제거

        // 값이 큰따옴표로 감싸져 있을 경우 제거
        if (val[0] === '"') {
          val = val.slice(1, -1);
        }

        // 쿠키 객체에 키-값 쌍 추가 (중복되지 않는 경우에만)
        if (o[key] === undefined) {
          o[key] = tryDecode(val); // URL 디코딩된 값을 저장
        }
      }

      // 파싱된 쿠키 객체를 반환
      return o;
    } else {
      // 쿠키가 없거나 올바른 형식이 아닐 경우 null 반환
      return null;
    }
  }
};

/**
 * 쿼리 필터링 함수
 * @param {string} str - 필터링할 문자열
 * @returns {string} 필터링된 문자열
 */
const queryFilter = (str) => {
  str = str.replace(/[|\\\/\[\]\{\}\(\)\<\>!@#\$\%\^\&\*\=\+\?]/g, ''); // 특수문자를 제거
  str = str.replace(/\n/g, ''); // 줄바꿈 제거
  str = str.replace(/\t/g, ''); // 탭 제거
  return str;
}

/**
 * @class DataRouter
 * @classdesc 이 클래스는 Data Console 서버에서 MongoDB, Kakao API, AI 등과 같은 다양한 인스턴스를 초기화하고 관리하는 역할을 담당합니다.
 *
 * @param {object} MONGOC - MongoDB 커넥션 객체, 데이터베이스와의 통신을 담당합니다.
 * @param {object} kakaoInstance - 카카오톡 API 인스턴스, 카카오톡과의 통신을 처리합니다.
 * @param {object} humanInstance - 인공지능(AI) 처리 인스턴스, AI 관련 작업을 처리합니다.
 */
class DataRouter {

  /**
   * @constructor
   * @param {object} MONGOC - MongoDB 커넥션 객체
   * @param {object} kakaoInstance - 카카오톡 API 인스턴스
   * @param {object} humanInstance - AI 인스턴스
   */
  constructor(MONGOC, kakaoInstance, humanInstance) {
    this.mother = mother; // Mother 객체를 인스턴스로 할당, 로그 기록, 에러 처리 등을 담당.
    this.back = back; // BackMaker 객체를 인스턴스로 할당, 백엔드 작업 관련 기능을 제공.
    this.work = work; // BackWorker 객체를 인스턴스로 할당, 백그라운드 작업을 관리.
    this.dir = dir; // 데이터 콘솔 디렉터리 경로를 설정.
    this.address = address; // 서버 주소 정보가 담긴 객체.
    this.bill = bill; // BillMaker 객체, 송장 및 결제 관련 작업을 처리.
    this.patch = patch; // DataPatch 객체, 데이터 패치 및 업데이트 작업을 처리.
    this.sheets = sheets; // GoogleSheet 객체, 구글 시트와의 통신을 처리.
    this.drive = drive; // GoogleDrive 객체, 구글 드라이브 관련 작업을 처리.
    this.calendar = calendar; // GoogleCalendar 객체, 구글 캘린더와의 통신을 처리.
    this.analytics = analytics; // GoogleAnalytics 객체, 구글 애널리틱스 데이터를 관리.
    this.bankCode = bankCode; // 은행 코드 정보를 저장.
    this.mongo = MONGOC; // MongoDB와 연결된 커넥션 객체.
    this.mongolocal = MONGOC; // 로컬 MongoDB 커넥션, 동일한 MongoDB 객체를 사용.
    this.members = {}; // 서버 구성원 정보를 저장하는 객체.
    this.kakao = kakaoInstance; // 카카오톡 API 인스턴스를 할당.
    this.human = humanInstance; // 인공지능 처리 인스턴스를 할당.
  }

  // 데이터 라우터에서 사용하는 타임아웃 관리 객체
  static timeouts = {};

  /**
   * 개인정보 처리 방침(policy) 텍스트를 생성하는 함수
   * @returns {string} - 개인정보 처리 방침에 대한 HTML 텍스트를 반환.
   */
  static policy = function () {
    let text = '';
    text += "<b>개인정보 수집 및 이용 동의서</b><br><br>주식회사 홈리에종은 아래의 목적으로 수집, 이용하며 고객님의 소중한 개인정보를 보호함으로써 안심하고 법률서비스를 이용할 수 있도록 최선을 다합니다.<br><br>";
    text += "<b>개인정보 처리 방침</b><br><br><b>제1조 총칙</b><br><br>① 개인정보라 함은 생존하고 있는 개인에 관한 정보로써 성명, 주민등록번호 및 영상 등을 통하여 개인을 알아볼 수 있는 정보(해당 정보만으로는 특정 개인은 알아볼 수 없더라도 다른 정보와 쉽게 결합하여 알아볼 수 있는 것을 포함한다)를 말합니다.<br>";
    text += "② 개인정보 처리방침이란 회원의 개인정보를 보호함으로써 이용자가 안심하고 서비스를 이용할 수 있도록 홈리에종을 운영함에 있어 준수해야 할 지침을 의미합니다.<br>③ 홈리에종은 ‘정보통신망 ";
    text += "이용촉진 및 정보보호에 등에 관한 법률’과 ‘개인정보 보호법’ 및 관련 법령에 따라 개인정보 보호규정을 준수합니다.<br>④ 홈리에종은 회원(디자이너, 구매자)의 동의를 기반으로 개인정보를 수집, 이용 및 제공하고 있으며 회원의 권리(개인정보 자기결정권)를 적극적으로 보장합니다.";
    text += "<br>⑤ 개인정보 처리방침은 회원이 언제나 쉽게 열람할 수 있도록 홈리에종 웹사이트에 게시하며 개인정보 관련법령, 지침, 고시 또는 홈리에종의 서비스 정책의 변경에 따라 달라질 수 있습니다.<br><br><b>제2조 개인정보의 수집항목 및 목적</b><br><br>";
    text += "① 고객이 의뢰한 홈디자인 업무 수행 및 이와 관련하여 필요한 연락, 거래 관계의 설정과 유지와 이행과 관리, 분쟁해결, 민원 처리 및 기타 법령상 의무의 이행 홈리에종이 처리하고 있는 개인정보는 다음의 수집, 이용 목적 이외의 용도로는 활용되지 않으며, 수집, 이용목적이 변경되는 경우에는 개인정보보호법에 따라 별도의 동의를 받는 등의 필요한 조치를 이행합니다.";
    text += "<br>② 회원의 인권을 침해할 우려가 있는 민감한 정보(인증, 사상 및 신조, 정치적 성향이나 범죄기록, 의료정보 등)는 수집하지 않으며, 만약 법령에서 정한 의무가 따라 불가피하게 수집하는 경우에는 반드시 회원에게 사전동의를 받습니다.<br>③ 홈리에종은 다음과 같이 회원의 ";
    text += "개인정보를 수집합니다.<br>④ 회원 가입시, 문의사항 작성시 : 성명, 주소, E-mail, 연락처(전화번호), 비밀번호 이용자 식별을 통한 이용계약 이행 및 회원 상호간 계약체결을 위한 지원(문의사항에 대한 답변, 계약이행을 위한 연락, 구매자와 디자이너간 계약체결 지원, 회원간 정보 안내 등)";
    text += "<br>⑤ 상담 문의시 : 주거공간 특성 관련 정보(주거유형, 공간이미지, 공간면적, 주거공간 구성 등)<br>⑥ 디자이너 신청시 : 회사명, 사업자등록번호, 대표자이름, 개업일, 주소, 전화번호, 휴대전화번호, E-mail, Fax, 은행명, 예금주명, 계좌 번호 등";
    text += "디자이너 식별, 서비스 개설/제공, 각종 알림, 정산 등<br>⑦ 자동수집정보 : 기기정보, 로그정보, 위치정보, 애플리케이션번호, 로컬저장소 등 시스템 운영 관리<br>⑧ 개인정보의 이용목적<br>⑨ 회원관리 : 회원제 서비스 제공에 따른 개인식별, 가입의사 확인, 이용약관 위반 ";
    text += "회원에 대한 이용제한 조치, 가입 및 가입횟수 제한, 서비스 부정 이용 제재, 고충 처리 및 분쟁 조정을 위한 기록 보존, 고지사항 전달, 회원탈퇴 의사의 확인 등<br>⑩ 중개서비스 등 이용약관에 따른 서비스 제공(광고 포함) 및 서비스 개선 : 인구통계학적 분석, 서비스 방문 및 ";
    text += "이용기록의 분석, 개인정보 및 관심에 기반한 이용자간 관계의 형성, 지인 및 관심사 등에 기반한 맞춤형 서비스 제공 등 신규 서비스 요소의 발굴 및 기존 서비스 개선 등<br>⑪ 신규 서비스 개발 및 홍보 및 마케팅 광고에의 활용 : 홈디자인 서비스 정보 제공 목적, 신규 서비스 개발 및 맞춤 서비스 제공, 인구통계학적 ";
    text += "특성에 따른 서비스 제공 및 광고 게재, 서비스의 유효성 확인, 이벤트/광고성 정보 및 참여 기회 제공 등<br>⑫ 결제 시스템 제공 : 예약 및 요금 결제, 상품 및 서비스 제공 등<br>⑬ 정보보호 : 보안, 프라이버시, 안전 측면에서 이용자가 안심하고 이용할 수 있는 환경 ";
    text += "구축 등<br><br><b>제3조 개인정보 제3자 제공</b><br><br>① 홈리에종은 원칙적으로 회원의 동의 없이 개인정보를 제3자에게 제공하지 않으며 개인정보를 제3자에게 제공해야 하는 경우 법령에 따른 동의를 받고 있습니다.<br>② 홈리에종은 개인정보를  ‘개인정보 수집항목 ";
    text += "및 목적’에서 명시한 범위 내에서 사용하며 회원의 사전 동의 없이 개인정보 수집 이용 목적 범위를 초과하여 이용하거나 회원의 개인정보를 제공하지 않습니다.<br>③ 다만 아래와 같이 양질의 서비스 제공을 위해 이용자의 개인정보를 협력업체와 공유할 필요가 있는 경우 제공 ";
    text += "받는 자, 제공목적, 제공정보 항목, 이용 및 보유기간 등을 회원에게 고지하여 동의를 구하거나 관련법령에 따른 경우는 예외로 합니다.<br>④ 회원이 사전에 공개 또는 제3자 제공에 동의한 경우 : 대표적으로 구매자의 개인정보를 디자이너에게 제공하는 경우, 디자이너의 ";
    text += "개인정보를 구매자에게 제공하는 경우가 제3자제공의 예입니다. 디자이너의 개인정보는 일반적으로 회원을 포함한 제3자에게 공개되며(가입시 사전에 포괄적 제3자 제공동의를 받습니다.) 구매자의 개인정보는 디자이너의 물품(서비스) 구매결제가 완료된 이후 디자이너에게 제공됩니다.";
    text += "<br>⑤ 관계법령의 규정에 의거하거나, 수사목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우<br><br><b>제4조 개인정보 처리위탁</b><br><br>① 홈리에종은 서비스의 제공에 관한 계약을 이행하고 이용자의 편의증진 등을 위하여 개인정보를 타인에게 위탁 ";
    text += "처리할 수 있습니다. 타인에게 위탁업무를 하는 경우에는 다음의 내용을 이용자에게 알리고 동의를 받습니다. 다음의 내용에 대하여 어느 하나의 사항이 변경되는 경우에도 같습니다.<br>② 개인정보 처리위탁을 받는 자(이하 수탁자라 함)<br>③ 개인정보 처리위탁을 하는 업무의 내용";
    text += "<br>④ 홈리에종은 아래와 같이 개인정보를 위탁하고 있으며, 개인정보의 수탁자와 위탁업무의 범위는 아래와 같습니다.<br>⑤ PG사 : ㈜이니시스(결제대행 서비스 제공)<br>⑥ E-mail 및 문자 발송 : widsign, 알리고(서비스 운영관련 알림 및 정보 제공)<br>⑦ ";
    text += "배송대행업체 : 업체명(홈리에종이 직접 판매한 물품의 배송 위탁)<br><br><b>제5조 개인정보의 보유 및 이용기간</b><br><br>홈리에종의 개인 정보 보유 기간은 위임업무 종료 시 또는 목적 달성 시 또는 정부 주체의 동의 철회 시까지입니다. 단, 관계 법령에 따라 파기하지 않고 보존하여야 하는 경우에는 해당 기간까지 입니다.<br><br>① 홈리에종은 회원의 개인정보를 원칙적으로 보유/이용기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 ";
    text += "개인정보를 파기합니다.<br>② 원으로부터 동의받은 개인정보 보유기간이 경과하거나 처리목적이 달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는 경우에는 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.<br>③ ";
    text += "홈리에종은 1년동안 회사의 서비스를 이용하지 않은 회원의 개인정보는 ‘정보통신망 이용촉진 및 정보보호 등에 관한 법률 제 29조’에 근거하여 회원에게 사전통지하고 개인정보를 파기하거나 별도로 분리하여 저장합니다.(회사는 개인정보가 파기되거나 분리되어 저장/관리된다는 ";
    text += "사실, 서비스 미이용기간 만료일, 해당 개인정보의 항목을 E-mail 등의 방법으로 미이용기간 30일전에 회원에게 알립니다. 이를 위해 회원은 회사에게 정확한 연락처 정보를 알리거나 수정해야 합니다.<br>④ 관련 법률에 따른 정보보유 사유는 아래와 같습니다. 서비스 결제 ";
    text += "및 정산 발생시 관련 법률에 따라 개인정보를 포함한 결제, 정산 관련 정보가 5년간 보관이 됩니다.<br>⑤ 전자상거래 등에서의 소비자 보호에 관한 법률<br>⑥ 계약 또는 청약철회 등에 관한 기록 : 5년<br>⑦ 대금결제 및 재화 등의 공급에 관한 기록 : 5년<br>⑧ 소비자의 ";
    text += "불만 또는 분쟁처리에 관한 기록 : 3년<br>⑨ 통신비밀보호법 - 로그인 기록 : 3개월<br>⑩ 조세 관련 법령 - 매출 관련 기록 : 5년<br>⑪ 개인정보 파기절차 – 회사는 파기사유가 발생한 개인정보를 개인정보 보호책임자의 승인 절차를 거쳐 파기합니다.<br>⑫ 개인정보 ";
    text += "파기방법 – 회사는 전자적 파일형태로 기록/저장된 개인정보는 기록을 재생할 수 없도록 기술적인 방법 또는 물리적인 방법을 이용하여 파기하며, 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각 등을 통하여 파기합니다.<br><br><b>제6조 개인정보의 수집 및 이용을 ";
    text += "거부할 권리</b><br><br>개인정보 주체는 개인정보의 수집 및 이용을 거부할 권리가 있으나, 서비스 제공을 위한 필수적인 개인정보는 그 수집이용 동의를 거부할 시 회원가입을 할 수 없습니다.<br><br><b>제7조 링크 사이트에 대한 책임</b><br><br>홈리에종은 ";
    text += "회원에게 다른 웹사이트에 대한 링크를 제공할 수 있습니다. 다만, 링크되어 있는 웹사이트들이 개인정보를 수집하는 행위에 대해서는 본 \“개인정보처리방침\”이 적용되지 않습니다.<br><br><b>제8조 회원 및 법정대리인의 권리</b><br><br>① 회원 및 법정 대리인은 ";
    text += "언제든지 등록되어 있는 자신의 개인정보를 조회하거나 수정, 탈퇴를 요청할 수 있습니다. 다만, 이 경우 서비스의 일부 또는 전체 이용에 제한이 있을 수 있습니다.<br>② 회원 및 법정 대리인의 개인정보 조회, 수정, 탈퇴는 홈리에종 웹사이트에서 가능하며, 회사는 ";
    text += "이에 대해 지체없이 조치하겠습니다.<br>③ 회원이 개인정보의 오류에 대한 정정을 요청한 경우에는 정정을 완료하기 전까지 해당 개인정보를 이용 또는 제공하지 않습니다. 또한 잘못된 개인정보를 제3자에게 이미 제공한 경우에는 정정 처리결과를 제3자에게 지체없이 ";
    text += "통지하여 정정이 이루어지도록 하겠습니다.<br>④ 회원은 자신의 개인정보를 최신의 상태로 유지해야 하며, 회원의 부정확한 정보 입력으로 발생하는 문제의 책인은 이용자 자신에게 있습니다.<br>⑤ 타인의 개인정보를 도용한 회원가입의 경우 회원자격을 상실하거나 관련 ";
    text += "개인정보보호 법령에 의해 처벌 받을 수 있습니다.<br>⑥ 회원은 E-mail, 비밀번호 등에 대한 보안을 유지할 책임이 있으며 제3자에게 이를 양도하거나 대여할 수 없습니다.<br>⑦ 회원 또는 법정대리인의 요청에 의해 해지 또는 삭제된 개인정보는 \“개인정보의 보유 ";
    text += "및 이용기간\”에 명시된 바에 따라 처리하고 그 외의 용도로 열람 또는 이용할 수 없도록 처리하고 있습니다.<br><br><b>제9조 개인정보의 기술적, 관리적 보호대책</b><br><br>① 회사는 회원을 개인정보를 처리함에 있어 개인정보가 분실, 도난, 유출, 변조, 훼손 ";
    text += "등이 되지 않도록 안전성을 확보하기 위하여 다음과 같이 기술적, 관리적 보호대책을 강구하고 있습니다.<br>② 비밀번호의 암호화 – 이용자의 비밀번호는 일방향 암호화하여 저장 및 관리되고 있으며, 개인정보의 확인/변경은 비밀번호를 알고 있는 본인에 의해서만 가능합니다.";
    text += "<br>③ 해킹 등에 대비한 대책 - 해킹, 컴퓨터 바이러스 등 정보통신망 침입에 의해 회원의 개인정보가 유출되거나 훼손되는 것을 막기 위해 최선을 다하고 있습니다.<br>④ 만일의 사태에 대비하여 침입차단 시스템을 이용하여 보안에 최선을 다하고 있습니다.<br>⑤ ";
    text += "민감한 개인정보는 암호화 통신 등을 통하여 네트워크상에서 개인정보를 안전하게 전손할 수 있도록 하고 있습니다.<br>⑥ 개인정보 처리 최소화 및 교육 – 개인정보 관련 처리 담당자를 최소한으로 제한하고 개인정보 처리자에 대한 교육 등 관리적 조치를 통해 법령 및 ";
    text += "내부방침 등의 준수를 강조하고 있습니다.<br>⑦ 개인정보보호 전담담당부서 운영 – 개인정보의 보호를 위해 개인정보보호 전담부서를 운영하고 있으며, 개인정보처리방침의 이행사항 및 담당자의 준수여부를 확인하여 문제가 발견 될 경우 즉시 해결하고 바로 잡을 수 있도록 ";
    text += "최선을 다하고 있습니다.<br><br><b>제10조 개인정보보호 책임자</b><br><br>① 홈리에종은 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자 및 개인정보보호 전담담당부서를 ";
    text += "지정하고 있습니다.<br>② 개인정보보호 책임자 이름 : 박혜연 연락처 : 02-2039-2252<br>③ 회원은 서비스 이용 중 발생한 모든 개인정보와 관련된 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자 및 개인정보보호 전담 담당부서로 문의할 수 있습니다.";
    text += "홈리에종은 이용자의 문의에 대해 최대한 빠른 시간 내에 답변 및 처리합니다.<br><br><b>제11조 기타 개인정보침해에 대한 신고 및 상담</b><br><br>① 회원은 아래의 기관에 개인정보 침해에 대한 피해구제, 상담 등을 문의할 수 있습니다. 아래의 기관은 정부기관";
    text += "소속으로서, 홈리에종의 자체적인 개인정보 불만처리 또는 개인정보 피해구제 결과가 만족스럽지 않을 경우, 구체적인 도움이 필요한 경우에 문의하시면 됩니다.<br>② 개인정보침해신고센터 : http://privacy.kisa.or.kr/kor/mail.jsp (국번없이) 118<br>";
    text += "③ 개인정보분쟁조정위원회 : http://www.kopico.go.kr 02-2100-2499<br>④ 대검찰청 사이버수사과 : http://www.spo.go.kr/spo/index.jsp (국번없이) 130<br>⑤ 경찰청 사이버안전국 : http://cyberbureau.police.go.kr/index.do ";
    text += "(국번없이) 182<br><br><b>제12조 고지의 의무</b><br><br>현 개인정보 처리방침은 법령, 정부의 정책 또는 회사 내부정책 등 필요에 의하여 변경될 수 있으며, 변경시에는 개정 최소 7일전부터 홈페이지의 ‘공지사항’을 통해 고지할 것입니다. 다만, 회원에게 불리한 ";
    text += "내용으로 변경하는 경우에는 최소 30일 전에 고지합니다.<br><br>귀하는 위의 개인정보 수집과 이용에 대해 동의를 거부할 권리가 있습니다. 그러나 동의를 거부할 경우 당사의 서비스 이용이 어려울 수 있습니다.";
    text = text.replace(/[\=\&]/g, '');
    return text; // 처리된 개인정보 방침 텍스트를 반환.
  };

  /**
   * 개인정보 동의 버튼에 대한 SVG 이미지를 생성하는 함수
   * @returns {object} - 켜짐(on) 및 꺼짐(off) 상태에 대한 SVG 이미지를 포함한 객체를 반환.
   */
  static policyButton = function () {
    let obj;
    obj = {}; // 빈 객체를 생성.
    
    // 'off' 상태의 SVG 코드
    obj.off = '<svg xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 346.511 20.463"><rect width="346.511" height="20.463" fill="#FFF"/><path d="M29.108 10.848c-1.811-0.836-3.708-2.509-4.549-4.511 -0.604 2.156-2.63 4.07-4.808 5.127L18.5 9.835c2.868-1.254 4.98-3.718 4.98-6.931V0.946h2.07v1.87c0 3.234 2.458 5.61 4.744 6.403L29.108 10.848zM27.9 20.463c-4.226 0-6.748-1.54-6.748-4.005 0-2.464 2.522-4.004 6.748-4.004 4.248 0 6.77 1.54 6.77 4.004C34.67 18.923 32.148 20.463 27.9 20.463zM23.244 16.458c0 1.452 1.768 2.311 4.657 2.311 2.911 0 4.7-0.858 4.7-2.311s-1.789-2.31-4.7-2.31C25.011 14.148 23.244 15.006 23.244 16.458zM34.39 7.063v5.413h-2.026V0h2.026v5.347h2.997V7.063H34.39z" fill="#575757"/><path d="M48.792 2.179c-0.129 6.49-3.838 11.287-9.314 14.323l-1.25-1.584c4.744-2.311 7.999-6.579 8.366-11.001h-7.46V2.179H48.792zM52.63 20.463V0H54.656v20.463H52.63z" fill="#575757"/><path d="M71.473 2.509C71.408 8.56 68.972 12.938 64.077 16.282l-1.38-1.519c4.14-2.464 6.403-6.381 6.749-10.562h-5.865V2.509H71.473zM77.984 20.463V9.571h-2.35v9.88h-1.919V0.462h1.919v7.415h2.35V0h1.962v20.463H77.984z" fill="#575757"/><path d="M93.464 6.469c0 2.948-2.264 4.995-5.347 4.995 -3.083 0-5.347-2.047-5.347-4.973 0-2.949 2.264-5.105 5.347-5.105C91.2 1.386 93.464 3.542 93.464 6.469zM84.904 6.447c0 1.892 1.315 3.278 3.212 3.278 1.962 0 3.213-1.364 3.213-3.257 0-1.937-1.25-3.322-3.213-3.322C86.22 3.146 84.904 4.555 84.904 6.447zM85.573 19.825v-6.381h2.027v4.708h11.621v1.673H85.573zM96.72 14.853V0h2.026v14.853H96.72z" fill="#575757"/><path d="M102.066 1.65h10.953v1.694h-4.377v0.682c0 2.904 2.523 5.215 4.787 5.919l-1.121 1.65c-1.79-0.727-3.838-2.509-4.679-4.379 -0.647 1.958-2.976 4.115-5.045 4.973l-1.143-1.628c2.609-0.968 5.131-3.631 5.131-6.491V3.345h-4.506V1.65zM111.401 20.463c-4.291 0-6.749-1.519-6.749-3.961s2.458-3.982 6.749-3.982c4.334 0 6.77 1.54 6.77 3.982S115.735 20.463 111.401 20.463zM106.723 16.502c0 1.431 1.747 2.267 4.679 2.267 2.976 0 4.7-0.836 4.7-2.267 0-1.43-1.725-2.266-4.7-2.266C108.469 14.236 106.723 15.072 106.723 16.502zM112.264 6.843V5.148h3.751V0h2.026v12.674h-2.026V6.843H112.264z" fill="#575757"/><path d="M130.913 12.233v4.027h8.085v1.693H120.887v-1.693h7.999v-4.027h-5.8V1.43h2.027v3.719h9.659v-3.719h2.027v10.804H130.913zM134.772 6.821h-9.659v3.718h9.659V6.821z" fill="#575757"/><path d="M151.2 19.759v-6.535c-1.962 0.088-3.751 0.11-5.476 0.132l-0.302-1.782c2.35 0 4.593-0.044 6.813-0.132 2.695-0.109 5.11-0.264 6.792-0.462l0.151 1.65c-1.509 0.198-3.816 0.374-5.951 0.484v6.645H151.2zM147.104 3.454h10.5v1.717h-4.269c0.366 1.848 2.781 3.036 4.851 3.19l-0.841 1.76c-2.048-0.33-4.226-1.54-5.024-2.948 -0.69 1.563-2.803 2.927-5.131 3.345l-0.927-1.694c2.307-0.308 4.657-1.606 5.002-3.652h-4.161V3.454zM149.54 0.484h5.563v1.716h-5.563V0.484zM160.148 20.463V0h2.027v20.463H160.148z" fill="#575757"/><path d="M180.673 0.924c0 2.663-0.237 5.413-0.647 7.459h3.04v1.694h-18.111V8.383h13.109c0.323-1.54 0.539-4.246 0.539-5.786h-11.276V0.924H180.673zM167.262 20.177v-8.383h2.027v2.508h9.422V11.75h2.026v8.427H167.262zM178.711 15.931h-9.422v2.574h9.422V15.931z" fill="#575757"/><path d="M184.92 10.892V1.056h2.026v3.301h5.391V1.034h2.026v9.857H184.92zM193.328 20.419c-4.247 0-6.619-1.562-6.619-3.961 0-2.42 2.372-3.982 6.619-3.982 4.313 0 6.663 1.584 6.663 3.982S197.576 20.419 193.328 20.419zM192.337 6.028h-5.391v3.191h5.391V6.028zM188.779 16.458c0 1.408 1.703 2.289 4.549 2.289 2.933 0 4.593-0.858 4.593-2.289 0-1.408-1.66-2.31-4.593-2.31C190.461 14.148 188.779 15.072 188.779 16.458zM199.754 6.909v5.412h-2.027V0h2.027v5.192h2.997v1.717H199.754z" fill="#575757"/><path d="M214.694 11.728c-1.682-0.528-4.031-2.09-4.959-3.916 -0.668 1.848-2.716 3.74-4.915 4.51l-1.121-1.628c2.565-0.814 4.722-2.816 4.98-5.347h-4.291V3.652h10.953v1.694h-4.55c0.323 2.486 2.76 4.181 4.959 4.753L214.694 11.728zM206.911 20.177v-6.953h13.109v6.953H206.911zM207.084 2.156V0.462h5.434V2.156H207.084zM217.993 14.874h-9.055v3.652h9.055V14.874zM217.993 12.102V0h2.027v12.102H217.993z" fill="#575757"/><path d="M232.05 7.987h1.94V0.396h1.94v19.1h-1.94V9.682h-1.94c-0.193 3.63-1.639 6.271-4.398 6.271 -2.996 0-4.42-3.103-4.42-7.195 0-4.07 1.424-7.15 4.42-7.15C230.455 1.606 231.878 4.313 232.05 7.987zM227.651 3.366c-1.595 0-2.414 2.223-2.414 5.413s0.819 5.413 2.414 5.413c1.617 0 2.437-2.223 2.437-5.413S229.269 3.366 227.651 3.366zM237.872 20.463V0H239.813v20.463H237.872z" fill="#575757"/><path d="M257.707 7.723v2.442h8.063v1.673h-18.111v-1.673h8.021V7.723h-5.843V0.814h13.583v1.694h-11.557v3.52h11.708v1.694H257.707zM256.715 20.463c-4.398 0-6.921-1.364-6.921-3.652 0-2.244 2.522-3.631 6.921-3.631s6.921 1.32 6.921 3.631S261.113 20.463 256.715 20.463zM251.885 16.832c0 1.255 1.854 1.959 4.83 1.959 2.997 0 4.852-0.704 4.852-1.959 0-1.254-1.854-1.979-4.852-1.979C253.739 14.853 251.885 15.578 251.885 16.832z" fill="#575757"/><path d="M280.474 15.271c-1.833 0.241-4.786 0.439-7.33 0.571 -2.286 0.11-4.398 0.154-5.994 0.177l-0.323-1.761c1.919 0 4.269-0.021 6.641-0.154 2.824-0.109 5.196-0.264 6.791-0.462L280.474 15.271zM273.401 11.111c-2.953 0-5.217-1.892-5.217-4.664 0-2.816 2.285-4.819 5.217-4.819 2.976 0 5.262 1.893 5.262 4.819C278.663 9.285 276.334 11.111 273.401 11.111zM273.401 3.366c-1.768 0-3.212 1.299-3.212 3.059 0 1.761 1.444 2.948 3.212 2.948 1.747 0 3.256-1.166 3.256-2.948C276.657 4.555 275.213 3.366 273.401 3.366zM283.557 0v20.463h-2.005V0H283.557z" fill="#575757"/><path d="M286.144 4.709V3.08h11.664v1.629H286.144zM292.072 12.124c-2.781 0-4.636-1.32-4.636-3.279 0-2.002 1.854-3.3 4.636-3.3 2.76 0 4.636 1.298 4.636 3.3C296.708 10.781 294.832 12.124 292.072 12.124zM289.011 20.243v-7.394h2.026v2.003h8.689V12.828h2.005v7.415H289.011zM289.141 1.826V0.176h5.691v1.65H289.141zM292.072 7.107c-1.423 0-2.651 0.682-2.651 1.737 0 1.034 1.25 1.717 2.651 1.717s2.631-0.683 2.631-1.717C294.703 7.789 293.474 7.107 292.072 7.107zM299.727 16.502h-8.689v2.068h8.689V16.502zM301.731 7.481v4.334h-2.005V0h2.005v5.765h2.997v1.717H301.731z" fill="#575757"/><path d="M318.332 14.412c-2.35 0.594-6.855 0.946-9.702 0.99h-1.875V2.134h2.026v11.486c2.651 0 6.985-0.33 9.293-0.88L318.332 14.412zM321.977 20.463h-2.006V0h2.006V20.463z" fill="#575757"/><path d="M328.552 13.729c2.63 0 6.316-0.197 8.344-0.66l0.237 1.694c-2.092 0.44-5.541 0.683-9.186 0.704h-2.242V2.156h9.466v1.694h-7.46v9.879H328.552zM340.323 7.987h3.127V9.703h-3.127v10.76h-2.005V0h2.005V7.987z" fill="#575757"/><path d="M344.29 16.084h2.221v2.289h-2.221V16.084z" fill="#575757"/><circle cx="4.604" cy="10.231" r="4.604" fill="#ECECEC"/></svg>';
    
    // 'on' 상태의 SVG 코드
    obj.on = '<svg xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 346.511 20.463"><rect width="346.511" height="20.463" fill="#FFF"/><path d="M29.108 10.848c-1.811-0.836-3.708-2.509-4.549-4.511 -0.604 2.156-2.63 4.07-4.808 5.127L18.5 9.835c2.868-1.254 4.98-3.718 4.98-6.931V0.946h2.07v1.87c0 3.234 2.458 5.61 4.744 6.403L29.108 10.848zM27.9 20.463c-4.226 0-6.748-1.54-6.748-4.005 0-2.464 2.522-4.004 6.748-4.004 4.248 0 6.77 1.54 6.77 4.004C34.67 18.923 32.148 20.463 27.9 20.463zM23.244 16.458c0 1.452 1.768 2.311 4.657 2.311 2.911 0 4.7-0.858 4.7-2.311s-1.789-2.31-4.7-2.31C25.011 14.148 23.244 15.006 23.244 16.458zM34.39 7.063v5.413h-2.026V0h2.026v5.347h2.997V7.063H34.39z" fill="#9bbdd1"/><path d="M48.792 2.179c-0.129 6.49-3.838 11.287-9.314 14.323l-1.25-1.584c4.744-2.311 7.999-6.579 8.366-11.001h-7.46V2.179H48.792zM52.63 20.463V0H54.656v20.463H52.63z" fill="#9bbdd1"/><path d="M71.473 2.509C71.408 8.56 68.972 12.938 64.077 16.282l-1.38-1.519c4.14-2.464 6.403-6.381 6.749-10.562h-5.865V2.509H71.473zM77.984 20.463V9.571h-2.35v9.88h-1.919V0.462h1.919v7.415h2.35V0h1.962v20.463H77.984z" fill="#9bbdd1"/><path d="M93.464 6.469c0 2.948-2.264 4.995-5.347 4.995 -3.083 0-5.347-2.047-5.347-4.973 0-2.949 2.264-5.105 5.347-5.105C91.2 1.386 93.464 3.542 93.464 6.469zM84.904 6.447c0 1.892 1.315 3.278 3.212 3.278 1.962 0 3.213-1.364 3.213-3.257 0-1.937-1.25-3.322-3.213-3.322C86.22 3.146 84.904 4.555 84.904 6.447zM85.573 19.825v-6.381h2.027v4.708h11.621v1.673H85.573zM96.72 14.853V0h2.026v14.853H96.72z" fill="#9bbdd1"/><path d="M102.066 1.65h10.953v1.694h-4.377v0.682c0 2.904 2.523 5.215 4.787 5.919l-1.121 1.65c-1.79-0.727-3.838-2.509-4.679-4.379 -0.647 1.958-2.976 4.115-5.045 4.973l-1.143-1.628c2.609-0.968 5.131-3.631 5.131-6.491V3.345h-4.506V1.65zM111.401 20.463c-4.291 0-6.749-1.519-6.749-3.961s2.458-3.982 6.749-3.982c4.334 0 6.77 1.54 6.77 3.982S115.735 20.463 111.401 20.463zM106.723 16.502c0 1.431 1.747 2.267 4.679 2.267 2.976 0 4.7-0.836 4.7-2.267 0-1.43-1.725-2.266-4.7-2.266C108.469 14.236 106.723 15.072 106.723 16.502zM112.264 6.843V5.148h3.751V0h2.026v12.674h-2.026V6.843H112.264z" fill="#9bbdd1"/><path d="M130.913 12.233v4.027h8.085v1.693H120.887v-1.693h7.999v-4.027h-5.8V1.43h2.027v3.719h9.659v-3.719h2.027v10.804H130.913zM134.772 6.821h-9.659v3.718h9.659V6.821z" fill="#9bbdd1"/><path d="M151.2 19.759v-6.535c-1.962 0.088-3.751 0.11-5.476 0.132l-0.302-1.782c2.35 0 4.593-0.044 6.813-0.132 2.695-0.109 5.11-0.264 6.792-0.462l0.151 1.65c-1.509 0.198-3.816 0.374-5.951 0.484v6.645H151.2zM147.104 3.454h10.5v1.717h-4.269c0.366 1.848 2.781 3.036 4.851 3.19l-0.841 1.76c-2.048-0.33-4.226-1.54-5.024-2.948 -0.69 1.563-2.803 2.927-5.131 3.345l-0.927-1.694c2.307-0.308 4.657-1.606 5.002-3.652h-4.161V3.454zM149.54 0.484h5.563v1.716h-5.563V0.484zM160.148 20.463V0h2.027v20.463H160.148z" fill="#9bbdd1"/><path d="M180.673 0.924c0 2.663-0.237 5.413-0.647 7.459h3.04v1.694h-18.111V8.383h13.109c0.323-1.54 0.539-4.246 0.539-5.786h-11.276V0.924H180.673zM167.262 20.177v-8.383h2.027v2.508h9.422V11.75h2.026v8.427H167.262zM178.711 15.931h-9.422v2.574h9.422V15.931z" fill="#9bbdd1"/><path d="M184.92 10.892V1.056h2.026v3.301h5.391V1.034h2.026v9.857H184.92zM193.328 20.419c-4.247 0-6.619-1.562-6.619-3.961 0-2.42 2.372-3.982 6.619-3.982 4.313 0 6.663 1.584 6.663 3.982S197.576 20.419 193.328 20.419zM192.337 6.028h-5.391v3.191h5.391V6.028zM188.779 16.458c0 1.408 1.703 2.289 4.549 2.289 2.933 0 4.593-0.858 4.593-2.289 0-1.408-1.66-2.31-4.593-2.31C190.461 14.148 188.779 15.072 188.779 16.458zM199.754 6.909v5.412h-2.027V0h2.027v5.192h2.997v1.717H199.754z" fill="#9bbdd1"/><path d="M214.694 11.728c-1.682-0.528-4.031-2.09-4.959-3.916 -0.668 1.848-2.716 3.74-4.915 4.51l-1.121-1.628c2.565-0.814 4.722-2.816 4.98-5.347h-4.291V3.652h10.953v1.694h-4.55c0.323 2.486 2.76 4.181 4.959 4.753L214.694 11.728zM206.911 20.177v-6.953h13.109v6.953H206.911zM207.084 2.156V0.462h5.434V2.156H207.084zM217.993 14.874h-9.055v3.652h9.055V14.874zM217.993 12.102V0h2.027v12.102H217.993z" fill="#9bbdd1"/><path d="M232.05 7.987h1.94V0.396h1.94v19.1h-1.94V9.682h-1.94c-0.193 3.63-1.639 6.271-4.398 6.271 -2.996 0-4.42-3.103-4.42-7.195 0-4.07 1.424-7.15 4.42-7.15C230.455 1.606 231.878 4.313 232.05 7.987zM227.651 3.366c-1.595 0-2.414 2.223-2.414 5.413s0.819 5.413 2.414 5.413c1.617 0 2.437-2.223 2.437-5.413S229.269 3.366 227.651 3.366zM237.872 20.463V0H239.813v20.463H237.872z" fill="#9bbdd1"/><path d="M257.707 7.723v2.442h8.063v1.673h-18.111v-1.673h8.021V7.723h-5.843V0.814h13.583v1.694h-11.557v3.52h11.708v1.694H257.707zM256.715 20.463c-4.398 0-6.921-1.364-6.921-3.652 0-2.244 2.522-3.631 6.921-3.631s6.921 1.32 6.921 3.631S261.113 20.463 256.715 20.463zM251.885 16.832c0 1.255 1.854 1.959 4.83 1.959 2.997 0 4.852-0.704 4.852-1.959 0-1.254-1.854-1.979-4.852-1.979C253.739 14.853 251.885 15.578 251.885 16.832z" fill="#9bbdd1"/><path d="M280.474 15.271c-1.833 0.241-4.786 0.439-7.33 0.571 -2.286 0.11-4.398 0.154-5.994 0.177l-0.323-1.761c1.919 0 4.269-0.021 6.641-0.154 2.824-0.109 5.196-0.264 6.791-0.462L280.474 15.271zM273.401 11.111c-2.953 0-5.217-1.892-5.217-4.664 0-2.816 2.285-4.819 5.217-4.819 2.976 0 5.262 1.893 5.262 4.819C278.663 9.285 276.334 11.111 273.401 11.111zM273.401 3.366c-1.768 0-3.212 1.299-3.212 3.059 0 1.761 1.444 2.948 3.212 2.948 1.747 0 3.256-1.166 3.256-2.948C276.657 4.555 275.213 3.366 273.401 3.366zM283.557 0v20.463h-2.005V0H283.557z" fill="#9bbdd1"/><path d="M286.144 4.709V3.08h11.664v1.629H286.144zM292.072 12.124c-2.781 0-4.636-1.32-4.636-3.279 0-2.002 1.854-3.3 4.636-3.3 2.76 0 4.636 1.298 4.636 3.3C296.708 10.781 294.832 12.124 292.072 12.124zM289.011 20.243v-7.394h2.026v2.003h8.689V12.828h2.005v7.415H289.011zM289.141 1.826V0.176h5.691v1.65H289.141zM292.072 7.107c-1.423 0-2.651 0.682-2.651 1.737 0 1.034 1.25 1.717 2.651 1.717s2.631-0.683 2.631-1.717C294.703 7.789 293.474 7.107 292.072 7.107zM299.727 16.502h-8.689v2.068h8.689V16.502zM301.731 7.481v4.334h-2.005V0h2.005v5.765h2.997v1.717H301.731z" fill="#9bbdd1"/><path d="M318.332 14.412c-2.35 0.594-6.855 0.946-9.702 0.99h-1.875V2.134h2.026v11.486c2.651 0 6.985-0.33 9.293-0.88L318.332 14.412zM321.977 20.463h-2.006V0h2.006V20.463z" fill="#9bbdd1"/><path d="M328.552 13.729c2.63 0 6.316-0.197 8.344-0.66l0.237 1.694c-2.092 0.44-5.541 0.683-9.186 0.704h-2.242V2.156h9.466v1.694h-7.46v9.879H328.552zM340.323 7.987h3.127V9.703h-3.127v10.76h-2.005V0h2.005V7.987z" fill="#9bbdd1"/><path d="M344.29 16.084h2.221v2.289h-2.221V16.084z" fill="#9bbdd1"/><circle cx="4.604" cy="10.231" r="4.604" fill="#9bbdd1"/></svg>';
    return obj; // 켜짐(on)과 꺼짐(off) 상태의 SVG 이미지가 담긴 객체를 반환.
  };

  /**
   * DataRouter의 라우팅을 설정하는 함수
   * @function setRouter
   */
  setRouter () {
    // this 객체를 instance로 할당하여 내부에서 참조할 수 있도록 함
    const instance = this;

    // Express 모듈을 가져와서 express 변수에 할당
    const express = require("express");

    // Express 라우터 객체를 생성하여 router 변수에 할당
    const router = express.Router();

    // Mother 클래스의 인스턴스를 가져와서 mother 변수에 할당
    const mother = this.mother;

    // BackMaker 클래스의 인스턴스를 가져와서 back 변수에 할당
    const back = this.back;

    // Work 관련 유틸리티를 가져와서 work 변수에 할당
    const work = this.work;

    // 현재 디렉토리 경로를 가져와서 dir 변수에 할당
    const dir = this.dir;

    // 서버의 주소 정보를 가져와서 address 변수에 할당
    const address = this.address;

    // Bill 관련 유틸리티를 가져와서 bill 변수에 할당
    const bill = this.bill;

    // Patch 관련 유틸리티를 가져와서 patch 변수에 할당
    const patch = this.patch;

    // Google Sheets 관련 유틸리티를 가져와서 sheets 변수에 할당
    const sheets = this.sheets;

    // Google Drive 관련 유틸리티를 가져와서 drive 변수에 할당
    const drive = this.drive;

    // Google Calendar 관련 유틸리티를 가져와서 calendar 변수에 할당
    const calendar = this.calendar;

    // Google Analytics 관련 유틸리티를 가져와서 analytics 변수에 할당
    const analytics = this.analytics;

    // 은행 코드 데이터를 가져와서 bankCode 변수에 할당
    const bankCode = this.bankCode;

    // MongoDB 연결 객체를 가져와서 mongo 변수에 할당
    const mongo = this.mongo;

    // 로컬 MongoDB 연결 객체를 가져와서 mongolocal 변수에 할당
    const mongolocal = this.mongolocal;

    // 시스템 멤버 정보를 가져와서 members 변수에 할당
    const members = this.members;

    // Kakao API 유틸리티를 가져와서 kakao 변수에 할당
    const kakao = this.kakao;

    // Human 관련 유틸리티를 가져와서 human 변수에 할당
    const human = this.human;

    /**
     * @route GET /
     * @description 클라이언트의 IP 주소를 가져와 응답하는 루트 경로입니다.
     * @param {object} req - 클라이언트 요청 객체.
     * @param {object} req.headers - 요청 헤더 객체.
     * @param {string} req.headers.x-forwarded-for - 프록시를 거친 클라이언트의 실제 IP 주소.
     * @param {object} req.socket - 클라이언트의 소켓 정보.
     * @param {string} req.socket.remoteAddress - 클라이언트의 원격 주소.
     * @param {object} res - 서버 응답 객체.
     * @returns {string} 클라이언트의 IP 주소를 문자열로 반환.
     */
    router.get([ "/" ], async (req, res) => {
        try {
            // 클라이언트의 IP 주소를 가져옴
            // 'x-forwarded-for' 헤더가 존재하는 경우 프록시를 거친 IP 주소를 사용하고
            // 그렇지 않으면 소켓의 원격 주소를 사용함
            const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

            // 응답 헤더를 설정
            // 응답 콘텐츠 타입을 텍스트로 설정하고,
            // 모든 도메인에서 접근 가능하도록 Access-Control-Allow-Origin을 "*"로 설정
            res.set({
                "Content-Type": "text/plain", // 응답 본문이 텍스트임을 명시
                "Access-Control-Allow-Origin": "*", // 모든 도메인에서 접근 허용
                "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드 설정
                "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 요청 헤더 설정
            });

            // IP 주소에서 숫자와 '.'을 제외한 모든 문자를 제거하고 클라이언트에 응답으로 전송
            res.send(String(ip).replace(/[^0-9\.]/gi, ''));
        } catch (e) {
            // 오류가 발생한 경우, 로그에 오류 메시지를 기록하고, 클라이언트에 "error" 응답을 보냄
            logger.error(e, req).catch((e) => { console.log(e); });
            res.send("error");
        }
    });

    /**
     * @route GET /:id
     * @description 다양한 클라이언트 요청에 대해 맞춤 응답을 제공하는 라우터입니다.
     *              id 값에 따라 SSL, 디스크 상태, 블루프린트, 블랙프린트 등 다양한 정보를 제공합니다.
     * @param {object} req - 클라이언트 요청 객체.
     * @param {object} req.params.id - 요청된 경로의 id 파라미터.
     * @param {object} res - 서버 응답 객체.
     */
    router.get([ "/:id" ], async (req, res) => {
        try {
            let ip, pass;
            let target; // 사용되지 않은 변수이지만 추가 작업을 위해 준비됨
            let aliveMongoResult; // MongoDB 활성화 상태를 확인하는 변수
            let ipTong; // 허용된 IP 주소를 저장하는 배열

            // 허용된 IP 주소 배열 초기화 (로컬 IP 및 사내 IP 포함)
            ipTong = [ 1, 127001, 19216801, 192168090, 129918118 ];
            
            // 주소 정보에서 외부 IP와 내부 IP를 정수로 변환하여 ipTong에 추가
            for (let info in instance.address) {
                if (instance.address[info].ip.outer.length > 0) {
                    ipTong.push(Number(instance.address[info].ip.outer.replace(/[^0-9]/g, '')));
                }
                if (instance.address[info].ip.inner.length > 0) {
                    ipTong.push(Number(instance.address[info].ip.inner.replace(/[^0-9]/g, '')));
                }
            }
            // 중복된 IP를 제거한 후 배열로 변환
            ipTong = Array.from(new Set(ipTong));

            // 요청 헤더에서 클라이언트의 IP 주소를 가져옴 (x-forwarded-for가 우선)
            ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

            // IP가 문자열인지 확인하고, 아니라면 pass를 false로 설정
            if (typeof ip !== "string") {
                pass = false;
                ip = ''; // IP 주소가 없는 경우 빈 문자열로 설정
            } else {
                // IP가 허용된 목록에 있는지 확인하여 pass 값 설정
                if (ipTong.includes(Number(ip.trim().replace(/[^0-9]/g, '')))) {
                    pass = true;
                } else {
                    pass = false;
                }
            }

            // IP가 허용된 목록에 있는지 다시 확인하여 pass 값 설정
            if (!pass) {
                if (ipTong.includes(Number(ip.trim().replace(/[^0-9]/g, '')))) {
                    pass = true;
                } else {
                    pass = false;
                }
            }

            // id 파라미터가 "ssl"인 경우 SSL 상태 확인
            if (req.params.id === "ssl") {

                aliveMongoResult = false; // 초기값 설정
                // MongoDB 상태 확인
                aliveMongo().then((boo) => {
                    aliveMongoResult = boo; // MongoDB 상태를 aliveMongoResult에 저장
                    return diskReading(); // 디스크 상태를 읽음
                }).then((disk) => {
                    // 응답 헤더를 설정하고 MongoDB 및 디스크 상태를 JSON으로 전송
                    res.set({ "Content-Type": "application/json" });
                    res.send(JSON.stringify({ disk: disk.toArray(), mongo: aliveMongoResult }));
                }).catch((err) => {
                    // 오류가 발생하면 에러를 발생시킴
                    throw new Error(err);
                });

            // id 파라미터가 "disk"인 경우 디스크 상태를 전송
            } else if (req.params.id === "disk") {

                diskReading().then((disk) => {
                    // 응답 헤더를 설정하고 디스크 상태를 JSON으로 전송
                    res.set({ "Content-Type": "application/json" });
                    res.send(JSON.stringify({ disk: disk.toArray() }));
                }).catch((err) => {
                    // 오류가 발생하면 에러를 발생시킴
                    throw new Error(err);
                });

            // id 파라미터가 "bluePrint"인 경우 블루프린트 HTML 전송
            } else if (req.params.id === "bluePrint") {

                // HTML을 정의하여 클라이언트에 전송
                const html = `<!DOCTYPE html><html lang="ko" dir="ltr"><head><meta charset="utf-8"><style media="screen">*::-webkit-scrollbar{display:none;}html{overflow:hidden}body {position: absolute;top: 0px;left: 0px;width: 100vw;height: 100vh;background: #00ff00;}</style></head><body></body></html>`;
                res.set({
                    "Content-Type": "text/html",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
                    "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
                });
                res.send(html); // 블루프린트 HTML 전송

            // id 파라미터가 "blackPrint"인 경우 블랙프린트 HTML 전송
            } else if (req.params.id === "blackPrint") {

                // HTML을 정의하여 클라이언트에 전송
                const html = `<!DOCTYPE html><html lang="ko" dir="ltr"><head><meta charset="utf-8"><style media="screen">*::-webkit-scrollbar{display:none;}html{overflow:hidden}body {position: absolute;top: 0px;left: 0px;width: 100vw;height: 100vh;background: #000000;}</style></head><body></body></html>`;
                res.set({
                    "Content-Type": "text/html",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
                    "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
                });
                res.send(html); // 블랙프린트 HTML 전송

            // id 파라미터가 "isOffice"인 경우 사무실 IP 여부 확인
            } else if (req.params.id === "isOffice") {

                res.set({
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
                    "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
                });
                const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress; // 클라이언트 IP 가져오기
                // 클라이언트 IP가 사무실 IP와 일치하는지 확인하고 JSON으로 결과 반환
                res.send(JSON.stringify({ result: (String(ip).replace(/[^0-9\.]/gi, '').trim() === address.officeinfo.ip.outer.trim() ? 1 : 0) }));  

            // id 파라미터가 "code"인 경우 코드 페이지로 리디렉션
            } else if (req.params.id === "code") {
              
                res.set({
                    "Content-Type": "text/html",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
                    "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
                });
                // 클라이언트를 지정된 URL로 리디렉션하는 스크립트를 포함한 HTML 전송
                res.send((`<html><script>window.location.href = "https://${instance.address.officeinfo.host}:38080?folder=/home/ubuntu/robot";</script></html>`));

            // 그 외의 id 값을 처리하는 경우 기본 HTML 페이지 전송
            } else {

                res.set("Content-Type", "text/html");
                res.send(`<!DOCTYPE html>
                <html lang="ko" dir="ltr">
                    <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no,user-scalable=no">
                    <title>HomeLiaison Console: ${req.params.id}</title>
                    <style></style>
                    </head>
                    <body>
                    <div id="totalcontents"></div>
                    <script src="/${req.params.id}.js"></script>
                    </body>
                </html>`);
            }

        } catch (e) {
            // 에러 발생 시 로깅하고 "error" 메시지 전송
            logger.error(e, req).catch((e) => { console.log(e); });
            res.set({ "Content-Type": "text/plain" });
            res.send("error");
        }
    });

    /**
     * @route GET /middle/:id
     * @description middle 경로로 요청이 들어오면 해당 id를 사용해 HTML 파일을 생성하고 반환하는 라우터입니다.
     * @param {object} req - 클라이언트 요청 객체.
     * @param {object} req.params.id - 요청된 경로의 id 파라미터. HTML 제목과 스크립트 경로에 사용됩니다.
     * @param {object} res - 서버 응답 객체.
     */
    router.get([ "/middle/:id" ], async (req, res) => {
      try {
        // 응답 헤더를 설정. 컨텐츠 타입을 HTML로 지정
        res.set("Content-Type", "text/html");

        // 클라이언트에 반환할 HTML 파일 생성
        // req.params.id에서 ".js" 확장자를 제거한 값을 타이틀과 스크립트 경로에 사용
        res.send(`<!DOCTYPE html>
        <html lang="ko" dir="ltr"><head>
        <meta charset="utf-8"> <!-- 문서의 인코딩을 UTF-8로 설정 -->
        <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no,user-scalable=no"> <!-- 반응형 웹을 위한 설정 -->
        <title>${req.params.id.trim().replace(/\.js/gi, '')}</title><style></style> <!-- 페이지 타이틀을 요청한 id로 설정 -->
        </head><body><div id="totalcontents"></div><script src="/middle/${req.params.id.trim().replace(/\.js/gi, '')}.js"></script> <!-- 스크립트 파일을 로드 -->
        </body></html>`);
      } catch (e) {
        // 오류 발생 시 로그에 기록하고 클라이언트에 "error" 메시지 전송
        logger.error(e, req).catch((e) => { console.log(e); });
        // 응답 헤더를 설정하고 에러 메시지를 전송
        res.set({ "Content-Type": "text/plain" });
        res.send("error");
      }
    });

    /**
     * @route GET /tools/address
     * @description 다음 주소 검색 API를 이용하여 주소를 검색하고, 상세 주소를 입력받는 라우터입니다.
     * @param {object} req - 클라이언트 요청 객체.
     * @param {object} res - 서버 응답 객체.
     */
    router.get([ "/tools/address" ], async (req, res) => {
      try {
        // HTML 코드를 정의하여 주소 검색을 위한 페이지를 생성
        const html = `<!DOCTYPE html><html lang="ko" dir="ltr"><head><meta charset="utf-8">
          <style>*{margin:0}body{width:100vh;height:100vh;overflow:hidden}body::-webkit-scrollbar{display:none;}img{cursor:pointer;position:absolute;right:0px;top:-1px;z-index:1}div{border:0;width:100vw;height:100vh;position:relative}</style><script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script></head><body><script>
          let div_clone, img_clone;div_clone = document.createElement("DIV");img_clone = document.createElement("IMG");img_clone.setAttribute("src", "https://t1.daumcdn.net/postcode/resource/images/close.png");img_clone.setAttribute("id", "btnFoldWrap");div_clone.appendChild(img_clone);document.body.appendChild(div_clone);
          new daum.Postcode({
              oncomplete: function (data) {
                let addr = '', extraAddr = '';
                // 사용자가 선택한 주소 타입이 'R'(도로명 주소)일 경우 도로명 주소를 설정
                if (data.userSelectedType === 'R') {
                  addr = data.roadAddress;
                  // 선택된 주소에 동, 로, 가 등의 명칭이 포함된 경우 추가 주소 설정
                  if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) { extraAddr += data.bname; }
                  if (data.buildingName !== '' && data.apartment === 'Y') { extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName); }
                  if (extraAddr !== '') { extraAddr = ' (' + extraAddr + ')'; }
                } else {
                  // 도로명 주소가 아닌 경우 지번 주소를 설정
                  addr = data.jibunAddress;
                }
                // 상세 주소를 입력받기 위한 프롬프트를 실행하고 결과를 부모 창으로 전송
                const detail = prompt("상세주소를 입력해주세요! : " + addr + extraAddr);
                window.parent.postMessage(addr + extraAddr + " " + detail, '*');
              },
              width : '100%', // 검색창의 너비를 100%로 설정
              height : '100%' // 검색창의 높이를 100%로 설정
            }).embed(div_clone); // div_clone 요소에 주소 검색 기능을 임베드
          </script></body></html>`;

        // 응답 헤더를 설정하여 HTML 형식임을 명시
        res.set("Content-Type", "text/html");

        // 클라이언트에 HTML 페이지를 전송하여 주소 검색 화면을 제공
        res.send(html);
      } catch (e) {
        // 오류가 발생한 경우 로그에 기록하고 "error" 메시지를 전송
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set({ "Content-Type": "text/plain" });
        res.send("error");
      }
    });

    /**
     * @route GET /tools/addressLite
     * @description Daum 우편번호 API를 사용하여 주소를 검색하는 라이트 버전의 주소 검색 페이지를 제공하는 라우터입니다.
     * @param {object} req - 클라이언트 요청 객체.
     * @param {object} res - 서버 응답 객체.
     */
    router.get([ "/tools/addressLite" ], async (req, res) => {
      try {
        // 클라이언트에 제공할 HTML 코드 생성
        const html = `<!DOCTYPE html><html lang="ko" dir="ltr"><head><meta charset="utf-8">
          <style>*{margin:0}body{width:100vh;height:100vh;overflow:hidden}body::-webkit-scrollbar{display:none;}img{cursor:pointer;position:absolute;right:0px;top:-1px;z-index:1}div{border:0;width:100vw;height:100vh;position:relative}</style>
          <!-- Daum 우편번호 API 불러오기 -->
          <script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script></head><body><script>
          let div_clone, img_clone;
          // div 요소와 이미지 요소를 동적으로 생성하여 주소 검색 인터페이스 구성
          div_clone = document.createElement("DIV");
          img_clone = document.createElement("IMG");
          img_clone.setAttribute("src", "https://t1.daumcdn.net/postcode/resource/images/close.png");
          img_clone.setAttribute("id", "btnFoldWrap");
          div_clone.appendChild(img_clone); // 이미지 요소를 div에 추가
          document.body.appendChild(div_clone); // div 요소를 body에 추가
          
          // Daum 우편번호 API를 통해 주소 검색 기능 구현
          new daum.Postcode({
              oncomplete: function (data) {
                let addr = '', extraAddr = '';
                // 사용자가 도로명 주소를 선택했을 때 도로명 주소와 추가 정보를 설정
                if (data.userSelectedType === 'R') {
                  addr = data.roadAddress;
                  if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) { extraAddr += data.bname; }
                  if (data.buildingName !== '' && data.apartment === 'Y') { extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName); }
                  if (extraAddr !== '') { extraAddr = ' (' + extraAddr + ')'; }
                } else {
                  // 사용자가 지번 주소를 선택했을 때 지번 주소를 설정
                  addr = data.jibunAddress;
                }
                // 부모 창으로 선택한 주소 정보를 전달
                window.parent.postMessage(addr + extraAddr, '*');
              },
              width : '100%', // 주소 검색 창의 너비를 100%로 설정
              height : '100%' // 주소 검색 창의 높이를 100%로 설정
            }).embed(div_clone); // div_clone 요소에 주소 검색 기능을 임베드
          </script></body></html>`;

        // 응답 헤더 설정, HTML 형식임을 명시
        res.set("Content-Type", "text/html");

        // HTML 파일을 클라이언트에 전송
        res.send(html);
      } catch (e) {
        // 에러가 발생한 경우 로그에 기록하고 클라이언트에 "error" 응답을 전송
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set({ "Content-Type": "text/plain" });
        res.send("error");
      }
    });

    /**
     * @route GET /tools/trigger
     * @description 부모 창으로 메시지를 보내는 트리거 페이지를 제공하는 라우터입니다.
     * @param {object} req - 클라이언트 요청 객체.
     * @param {object} res - 서버 응답 객체.
     */
    router.get([ "/tools/trigger" ], async (req, res) => {
      try {
        // 클라이언트에 제공할 HTML 코드 생성
        const html = `<!DOCTYPE html><html lang="ko" dir="ltr"><head><meta charset="utf-8">
          <style>*{margin:0}body{width:100vh;height:100vh;overflow:hidden}body::-webkit-scrollbar{display:none;}img{cursor:pointer;position:absolute;right:0px;top:-1px;z-index:1}div{border:0;width:100vw;height:100vh;position:relative}</style>
          <!-- Daum 우편번호 API 스크립트를 불러옴 -->
          <script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script></head>
          <body>
          <!-- 부모 창으로 '안녕?' 메시지를 전송 -->
          <script>window.parent.postMessage("안녕?", '*');</script>
          </body></html>`;

        // 응답 헤더 설정: HTML 파일임을 명시
        res.set("Content-Type", "text/html");

        // HTML 파일을 클라이언트에 전송
        res.send(html);
      } catch (e) {
        // 오류 발생 시 로그에 기록하고 클라이언트에 'error' 응답 전송
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set({ "Content-Type": "text/plain" });
        res.send("error");
      }
    });


    /**
     * @route GET /tools/log
     * @description 서버 로그를 HTML 형식으로 반환하는 라우터입니다. 요청된 서버 ID에 따라 최근 3개월 이내의 로그를 MongoDB에서 조회하여 HTML로 변환하여 응답합니다.
     * @param {object} req - 클라이언트 요청 객체. params에 서버 ID가 포함되어야 합니다.
     * @param {object} res - 서버 응답 객체. 로그를 HTML 형식으로 반환합니다.
     */
    router.get([ "/tools/log" ], async function (req, res) {
      // 응답 헤더에 HTML 형식과 CORS 설정을 추가합니다.
      res.set({
          "Content-Type": "text/html",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });

      try {
          // 로그 출력을 위한 구분선을 정의합니다.
          const bar = "============================================================";

          // 로그를 조회할 MongoDB 컬렉션 이름을 정의합니다.
          const collection = "serverLog";

          // MongoDB 인스턴스를 가져옵니다.
          const selfMongo = instance.mongo;

          let rows;  // 로그 데이터를 저장할 배열
          let html;  // HTML 형식으로 변환된 로그 데이터를 저장할 변수
          let whereQuery;  // MongoDB에서 사용할 조회 조건을 저장할 변수
          let ago;  // 3개월 전의 날짜를 저장할 변수

          // 현재 날짜에서 3개월 전으로 설정합니다.
          ago = new Date();
          ago.setMonth(ago.getMonth() - 3);

          // 조회 조건을 초기화합니다.
          whereQuery = {};
          whereQuery["$and"] = [];

          // 조회 조건에 3개월 이내의 로그 데이터를 필터링합니다.
          whereQuery["$and"].push({ date: { $gte: ago } });

          // MongoDB에서 조회 조건에 맞는 로그 데이터를 가져옵니다.
          rows = await back.mongoRead(collection, whereQuery, { selfMongo });

          // 가져온 로그 데이터를 날짜 순서대로 내림차순 정렬합니다.
          rows.sort((a, b) => { return b.date.valueOf() - a.date.valueOf(); });

          // 로그 데이터를 HTML 형식으로 변환합니다.
          // 각 로그는 날짜 정보와 내용, 구분선을 포함한 HTML로 변환됩니다.
          html = "<body>" + rows.map((j) => { 
              return `<div style="color:red;">` + dateToString(j.date, true) + "</div>" + `<div style="color:green;">` + j.server + "</div>" + j.contents + `<div style="color:blue;">` + bar + "</div>";
          }).join("\n\n\n").replace(/\n/gi, "<br>") + "</body>";

          // 변환된 HTML 데이터를 클라이언트에 전송합니다.
          res.send(html);

      } catch (e) {
          // 에러가 발생한 경우 로그를 기록하고 클라이언트에게 에러 메시지를 응답합니다.
          logger.error(e, req).catch((e) => { console.log(e); });
          res.set("Content-Type", "application/json");
          res.send(JSON.stringify({ error: e.message }));
      }
    });

    /**
     * @route POST /getClients, /getDesigners, /getProjects, /getContents, /getBuilders
     * @description 클라이언트, 디자이너, 프로젝트, 콘텐츠, 빌더 정보를 가져오는 라우터입니다.
     * @param {object} req - 클라이언트 요청 객체.
     * @param {object} res - 서버 응답 객체.
     */
    router.post([ "/getClients", "/getDesigners", "/getProjects", "/getContents", "/getBuilders" ], async function (req, res) {
      // 응답 헤더 설정: JSON 형식으로 반환하며, 모든 도메인에서 접근을 허용함
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        // MongoDB 관련 설정, 로컬 및 중앙 MongoDB 인스턴스를 가져옴
        const selfMongo = instance.mongolocal;
        const selfCoreMongo = instance.mongo;
        
        // 각종 변수를 선언
        let standard, raw_data, data, optionQuery, whereQuery;
        let historyWhereQuery;
        let thisCliids;
        let thisHistories;
        let resultArr;
        let thisHistory;
        let proposalSend;
        let thisProjects;
        let allProjects;
        let allDesigners;
        let desidArr, designersArr;
        let thisDailySales;
        let dailySalesArr;
        let thisRequestIndex;
        let thisSalesDate;
        let allClients;
        let thisRequestNumber;
        let thisRequest;
        let evaluationSendRows;
        let evaluationResultRows;
        let thisEvaluationSendRow;
        let thisEvaluationResultRow;
    
        // 기본 설정
        standard = null;

        // 클라이언트가 보낸 whereQuery 값이 없으면 where를 대체로 사용
        if (req.body.where === undefined && req.body.whereQuery !== undefined) {
            req.body.where = req.body.whereQuery;
        }

        // 요청 경로가 "/getClients"일 경우 클라이언트 정보를 가져옴
        if (req.url === "/getClients") {
          // 쿼리 옵션을 설정 (withTools: true는 추가적인 도구 정보를 포함, selfMongo는 MongoDB 인스턴스)
          optionQuery = { withTools: true, selfMongo: instance.mongo };

          // 클라이언트가 정렬 조건을 보낸 경우, equalJson을 사용하여 정렬 조건을 적용
          if (req.body.sort !== undefined) {
              optionQuery.sort = equalJson(req.body.sort); // equalJson은 JSON을 깊은 복사하는 업그레이드된 버전
          }

          // where 조건이 없는 경우 모든 클라이언트 정보를 가져옴
          if (req.body.where === undefined) {
              if (req.body.limit !== undefined) {
                  // limit이 있을 경우 제한된 수의 클라이언트 정보를 가져옴
                  raw_data = await back.getClientsByQuery({}, { withTools: true, selfMongo: instance.mongo, limit: Number(req.body.limit) });
              } else {
                  // 제한이 없을 경우 모든 클라이언트 정보를 가져옴
                  raw_data = await back.getClientsByQuery({}, { withTools: true, selfMongo: instance.mongo });
              }
          } else {
              // where 조건이 있는 경우 해당 조건에 맞는 클라이언트 정보를 가져옴
              if (req.body.limit !== undefined) {
                  optionQuery.limit = Number(req.body.limit); // limit이 있을 경우 설정
              }
              // equalJson을 사용하여 클라이언트 정보 검색
              raw_data = await back.getClientsByQuery(equalJson(req.body.where), optionQuery);
          }

        // 요청 경로가 "/getDesigners"일 경우 디자이너 정보를 가져옴
        } else if (req.url === "/getDesigners") {
            // 쿼리 옵션을 설정
            optionQuery = { withTools: true, selfMongo: instance.mongo };

            // 정렬 조건이 있을 경우 equalJson을 사용하여 정렬 조건 적용
            if (req.body.sort !== undefined) {
                optionQuery.sort = equalJson(req.body.sort);
            }

            // where 조건이 없는 경우 모든 디자이너 정보를 가져옴
            if (req.body.where === undefined) {
                if (req.body.limit !== undefined) {
                    // limit이 있을 경우 제한된 수의 디자이너 정보를 가져옴
                    raw_data = await back.getDesignersByQuery({}, { withTools: true, selfMongo: instance.mongo, limit: Number(req.body.limit) });
                } else {
                    // 제한이 없을 경우 모든 디자이너 정보를 가져옴
                    raw_data = await back.getDesignersByQuery({}, { withTools: true, selfMongo: instance.mongo });
                }
            } else {
                // where 조건이 있을 경우 해당 조건에 맞는 디자이너 정보를 가져옴
                if (req.body.limit !== undefined) {
                    optionQuery.limit = Number(req.body.limit);
                }
                // equalJson을 사용하여 디자이너 정보 검색
                raw_data = await back.getDesignersByQuery(equalJson(req.body.where), optionQuery);
            }

        // 요청 경로가 "/getProjects"일 경우 프로젝트 정보를 가져옴
        } else if (req.url === "/getProjects") {
            // 쿼리 옵션을 설정
            optionQuery = { withTools: true, selfMongo: instance.mongo };

            // 정렬 조건이 있을 경우 equalJson을 사용하여 정렬 조건 적용
            if (req.body.sort !== undefined) {
                optionQuery.sort = equalJson(req.body.sort);
            }

            // where 조건이 없는 경우 모든 프로젝트 정보를 가져옴
            if (req.body.where === undefined) {
                if (req.body.limit !== undefined) {
                    // limit이 있을 경우 제한된 수의 프로젝트 정보를 가져옴
                    raw_data = await back.getProjectsByQuery({}, { withTools: true, selfMongo: instance.mongo, limit: Number(req.body.limit) });
                } else {
                    // 제한이 없을 경우 모든 프로젝트 정보를 가져옴
                    raw_data = await back.getProjectsByQuery({}, { withTools: true, selfMongo: instance.mongo });
                }
            } else {
                // where 조건이 있을 경우 해당 조건에 맞는 프로젝트 정보를 가져옴
                if (req.body.limit !== undefined) {
                    optionQuery.limit = Number(req.body.limit);
                }
                // where 조건을 equalJson으로 변환하여 프로젝트 검색
                whereQuery = equalJson(req.body.where);
                raw_data = await back.getProjectsByQuery(whereQuery, optionQuery);
            }

        // 요청 경로가 "/getContents"일 경우 콘텐츠 정보를 가져옴
        } else if (req.url === "/getContents") {
            // 쿼리 옵션을 설정
            optionQuery = { withTools: true, selfMongo: instance.mongo };

            // 정렬 조건이 있을 경우 equalJson을 사용하여 정렬 조건 적용
            if (req.body.sort !== undefined) {
                optionQuery.sort = equalJson(req.body.sort);
            }

            // where 조건이 없는 경우 모든 콘텐츠 정보를 가져옴
            if (req.body.where === undefined) {
                if (req.body.limit !== undefined) {
                    // limit이 있을 경우 제한된 수의 콘텐츠 정보를 가져옴
                    raw_data = await back.getContentsArrByQuery({}, { withTools: true, selfMongo: instance.mongo, limit: Number(req.body.limit) });
                } else {
                    // 제한이 없을 경우 모든 콘텐츠 정보를 가져옴
                    raw_data = await back.getContentsArrByQuery({}, { withTools: true, selfMongo: instance.mongo });
                }
            } else {
                // where 조건이 있을 경우 해당 조건에 맞는 콘텐츠 정보를 가져옴
                if (req.body.limit !== undefined) {
                    optionQuery.limit = Number(req.body.limit);
                }
                // where 조건을 equalJson으로 변환하여 콘텐츠 검색
                raw_data = await back.getContentsArrByQuery(equalJson(req.body.where), optionQuery);
            }

        // 요청 경로가 "/getBuilders"일 경우 빌더 정보를 가져옴
        } else if (req.url === "/getBuilders") {
            // 쿼리 옵션을 설정
            optionQuery = { withTools: true, selfMongo: instance.mongo };

            // 정렬 조건이 있을 경우 equalJson을 사용하여 정렬 조건 적용
            if (req.body.sort !== undefined) {
                optionQuery.sort = equalJson(req.body.sort);
            }

            // where 조건이 없는 경우 모든 빌더 정보를 가져옴
            if (req.body.where === undefined) {
                if (req.body.limit !== undefined) {
                    // limit이 있을 경우 제한된 수의 빌더 정보를 가져옴
                    raw_data = await back.getBuildersByQuery({}, { withTools: true, selfMongo: instance.mongo, limit: Number(req.body.limit) });
                } else {
                    // 제한이 없을 경우 모든 빌더 정보를 가져옴
                    raw_data = await back.getBuildersByQuery({}, { withTools: true, selfMongo: instance.mongo });
                }
            } else {
                // where 조건이 있을 경우 해당 조건에 맞는 빌더 정보를 가져옴
                if (req.body.limit !== undefined) {
                    optionQuery.limit = Number(req.body.limit);
                }
                // where 조건을 equalJson으로 변환하여 빌더 검색
                raw_data = await back.getBuildersByQuery(equalJson(req.body.where), optionQuery);
            }
        }
    
        // req.body.noFlat 값이 정의되지 않았을 때 데이터를 처리함
        if (req.body.noFlat === undefined) {
            // 데이터를 평탄화(정규화)함. flatDeath는 데이터를 평탄화하는 메서드
            data = raw_data.flatDeath();

            // 클라이언트 정보를 가져올 때
            if (req.url === "/getClients") {

                // 클라이언트 ID 배열을 만듦
                thisCliids = data.map((obj) => { return obj.standard.cliid });
                historyWhereQuery = {}; // 히스토리를 검색할 조건을 저장할 객체
                historyWhereQuery["$or"] = thisCliids.map((cliid) => { return { cliid } });

                // 클라이언트의 히스토리 데이터를 MongoDB에서 가져옴
                thisHistories = await back.mongoPick("clientHistory", [ historyWhereQuery, {
                    cliid: 1,
                    manager: 1,
                    "curation.analytics.send": 1,
                    "curation.service.serid": 1,
                    "curation.construct.items": 1,
                } ], { selfMongo });

                // 클라이언트와 관련된 매출 데이터를 MongoDB에서 가져옴
                thisDailySales = await back.mongoPick("dailySales", [
                    {
                        $or: thisCliids.map((thisCliid) => {
                            return {
                                cliids: {
                                    $elemMatch: {
                                        cliid: thisCliid
                                    }
                                }
                            }
                        })
                    },
                    { date: 1, cliids: 1, _id: 0 }
                ], { selfMongo });

                // 프로젝트 및 디자이너 데이터를 MongoDB에서 가져옴
                allProjects = await back.mongoPick("project", [ historyWhereQuery, { cliid: 1, proid: 1, proposal: 1 } ], { selfMongo: selfCoreMongo });
                allDesigners = await back.mongoPick("designer", [ {}, { desid: 1, designer: 1 } ], { selfMongo: selfCoreMongo });

                // 히스토리를 기반으로 결과 배열을 만듦
                resultArr = [];
                for (let { manager, cliid, curation: { analytics: { send }, service: { serid }, construct: { items } } } of thisHistories) {
                    resultArr.push({
                        cliid,
                        manager,
                        proposal: send.filter((obj) => { return obj.page === "designerProposal" }),
                        about: send.filter((obj) => { return obj.page === "finalPush" }),
                        pure: send.filter((obj) => { return obj.page === "pureOutOfClient" }),
                        haha: send.filter((obj) => { return obj.page === "lowLowPush" }),
                        serid,
                        construct: items,
                    });
                }

                // 데이터마다 히스토리와 연관된 정보를 처리
                for (let obj of data) {
                    thisHistory = resultArr.find((o) => { return o.cliid === obj.standard.cliid });

                    // 히스토리의 proposal, about, pure, haha 데이터를 날짜순으로 정렬
                    thisHistory.proposal.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });
                    thisHistory.about.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });
                    thisHistory.pure.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });
                    thisHistory.haha.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });

                    // 가장 최근의 proposal이 있을 경우, 해당 proposal의 날짜와 디자이너 정보를 가져옴
                    if (thisHistory.proposal.length > 0) {
                        proposalSend = dateToString(thisHistory.proposal[0].date);
                        thisProjects = allProjects.filter((project) => { return project.cliid === obj.standard.cliid });
                        thisProjects.sort((a, b) => { return b.proposal.date.valueOf() - a.proposal.date.valueOf() });
                        desidArr = thisProjects[0].proposal.detail.map((o) => { return o.desid });
                        designersArr = desidArr.map((desid) => { return allDesigners.find((d) => { return d.desid === desid }).designer; });
                    } else {
                        // proposal이 없을 경우 빈 문자열로 설정
                        proposalSend = '-';
                        desidArr = [];
                        designersArr = [];
                    }

                    // 각 클라이언트의 정보를 히스토리 데이터로 업데이트함
                    obj.info.manager = thisHistory.manager;
                    obj.info.proposalSend = proposalSend;
                    obj.info.pureSend = thisHistory.pure.length > 0 ? dateToString(thisHistory.pure[0].date) : '-';
                    obj.info.aboutSend = thisHistory.about.length > 0 ? dateToString(thisHistory.about[0].date) : '-';
                    obj.info.hahaSend = thisHistory.haha.length > 0 ? dateToString(thisHistory.haha[0].date) : '-';
                    obj.info.desids = desidArr.length > 0 ? desidArr.join(", ") : "-";
                    obj.info.proposalDesigners = designersArr.length > 0 ? designersArr.join(", ") : "-";
                    obj.info.wantsService = thisHistory.serid.length > 0 ? serviceParsing(thisHistory.serid[0]) : "-";
                    obj.info.selectConstruct = thisHistory.construct.length > 0 ? thisHistory.construct.map((str) => { return str.replace(/ 공사/gi, "").trim() }).join(", ") : "-";

                    // 클라이언트의 매출 기록을 필터링하고 날짜를 가져옴
                    dailySalesArr = thisDailySales.filter((s) => {
                        return s.cliids.findIndex((o) => { return o.cliid === obj.standard.cliid }) !== -1;
                    }).map((o) => { return o.date });

                    // 매출 데이터가 없을 경우 '-'로 설정
                    if (dailySalesArr.length === 0) {
                        obj.info.standardDate = '-';
                    } else if (dailySalesArr.length === 1) {
                        // 매출 데이터가 한 개만 있을 경우 그 날짜를 설정
                        obj.info.standardDate = dateToString(dailySalesArr[0]);
                    } else {
                        // 매출 데이터가 여러 개일 경우 최신 순으로 정렬
                        dailySalesArr.sort((a, b) => { return b.valueOf() - a.valueOf() });
                        thisRequestIndex = raw_data.find((client) => { return client.cliid === obj.standard.cliid }).requests.toNormal().map((re) => {
                            return dateToString(re.request.timeline, true).slice(0, 13);
                        }).findIndex((str) => { return str === obj.info.timeline.slice(0, 13) });
                        thisSalesDate = dailySalesArr[thisRequestIndex];
                        obj.info.standardDate = thisSalesDate === undefined ? '-' : dateToString(thisSalesDate);
                    }
                }

            // 프로젝트 정보를 가져올 때
            } else if (req.url === "/getProjects") {
                // 클라이언트 ID 배열을 만들고 히스토리 조건을 만듦
                thisCliids = data.map((obj) => { return obj.middle.cliid });
                historyWhereQuery = {};
                historyWhereQuery["$or"] = thisCliids.map((cliid) => { return { cliid } });

                // 클라이언트 데이터를 MongoDB에서 가져옴
                allClients = await back.mongoRead("client", historyWhereQuery, { selfMongo: selfCoreMongo });

                // 클라이언트 평가 전송 및 결과 데이터를 가져옴
                evaluationSendRows = (await requestSystem("https://" + instance.address.officeinfo.host + ":3002/justClientEvaluation", { mode: "all", cliid: "", proid: "" }, { headers: { "Content-Type": "application/json" } })).data;
                evaluationResultRows = (await requestSystem("https://" + instance.address.officeinfo.host + ":3002/justClientEvaluation", { mode: "resultAll", cliid: "", proid: "" }, { headers: { "Content-Type": "application/json" } })).data;

                // 각 프로젝트마다 평가 결과와 전송 여부를 설정
                for (let obj of data) {
                    thisHistory = allClients.find((o) => { return o.cliid === obj.middle.cliid });

                    // 클라이언트의 요청에 맞는 정보를 찾음
                    thisRequestNumber = 0;
                    for (let i = 0; i < thisHistory.requests.length; i++) {
                        if (thisHistory.requests[i].request.timeline.valueOf() <= stringToDate(obj.info.proposalDate).valueOf()) {
                            thisRequestNumber = i;
                            break;
                        }
                    }
                    thisRequest = thisHistory.requests[thisRequestNumber].request;

                    // 평가 전송 여부와 평가 결과를 확인
                    thisEvaluationSendRow = evaluationSendRows.map((r) => { return r.proid }).includes(obj.standard.proid) ? 1 : 0;
                    thisEvaluationResultRow = evaluationResultRows.map((r) => { return r.proid }).includes(obj.standard.proid) ? 1 : 0;

                    // 각 프로젝트의 정보를 히스토리 데이터로 업데이트함
                    obj.info.name = thisHistory.name;
                    obj.info.address = thisRequest.space.address;
                    obj.info.spaceContract = thisRequest.space.contract;
                    obj.info.pyeong = thisRequest.space.pyeong;
                    obj.info.evaluationSend = thisEvaluationSendRow === 1 ? "전송" : "미전송";
                    obj.info.evaluationResult = thisEvaluationResultRow === 1 ? "완료" : "미완료";
                }
            }

            // 데이터를 JSON 형태로 클라이언트에 응답
            res.send(JSON.stringify({ standard, data }));

        // flatDeath가 필요하지 않은 경우 원본 데이터를 반환
        } else {
            // 데이터를 JSON 형태로 클라이언트에 응답
            res.send(JSON.stringify(raw_data.toNormal()));
        }

      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        /**
         * 클라이언트에게 에러 메시지를 JSON 형태로 반환하는 부분
         * @param {object} res - 응답 객체
         * @param {string} e.message - 에러 메시지를 포함하여 응답을 보내고, 클라이언트가 에러 내용을 확인할 수 있도록 함
         */
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /searchClients, /searchProjects, /searchDesigners
     * @description 클라이언트, 프로젝트, 디자이너 데이터를 검색하는 라우터입니다.
     * @param {object} req - 클라이언트 요청 객체.
     * @param {string} req.body.query - 검색할 키워드 또는 ID.
     * @param {string} req.url - 요청 경로를 통해 검색 대상 결정.
     * @param {object} res - 서버 응답 객체.
     */
    router.post([ "/searchClients", "/searchProjects", "/searchDesigners" ], async function (req, res) {
      try {
        // 로컬 MongoDB와 중앙 MongoDB 인스턴스
        const selfMongo = instance.mongolocal;
        const selfCoreMongo = instance.mongo;
        const db = "miro81"; // 사용할 데이터베이스 이름
        let standard;  // 검색 기준 설정 변수
        let map, mapArr;  // 매핑 객체와 배열
        let searchQuery, searchArr, tempObj, tempObj2; // 검색 쿼리 관련 변수들
        let whereQuery; // 최종적으로 사용할 쿼리
        let data; // 최종 반환될 데이터
        let rawJson; // 원본 JSON 데이터
        let filteredArr; // 필터링된 데이터
        let idName; // ID 필드명
        let historyWhereQuery; // 히스토리 쿼리
        let thisCliids, thisHistories; // 클라이언트 ID와 히스토리
        let resultArr; // 결과 배열
        let thisHistory, proposalSend; // 히스토리와 제안 전송 데이터
        let thisProjects, allProjects; // 프로젝트 관련 데이터
        let allDesigners, desidArr, designersArr; // 디자이너 관련 데이터
        let thisDailySales, dailySalesArr; // 매출 관련 데이터
        let thisRequestIndex, thisSalesDate; // 요청 및 매출 관련 인덱스와 날짜
        let queryArr; // 검색 쿼리 배열
        let allClients; // 모든 클라이언트 데이터
        let thisRequestNumber, thisRequest; // 요청 번호 및 요청 데이터
        let evaluationSendRows, evaluationResultRows; // 평가 관련 데이터
        let thisEvaluationSendRow, thisEvaluationResultRow; // 각 평가 행들
    
        // standard 변수를 null로 초기화
        standard = null;

        // 요청된 URL에 따라 검색할 데이터 타입(클라이언트, 프로젝트, 디자이너)을 결정
        if (req.url === "/searchClients") {
            // 클라이언트 데이터 매핑을 가져옴
            map = instance.patch.clientMap();
            // 클라이언트 ID 필드명 설정
            idName = "cliid";
        } else if (req.url === "/searchProjects") {
            // 프로젝트 데이터 매핑을 가져옴
            map = instance.patch.projectMap();
            // 프로젝트 ID 필드명 설정
            idName = "proid";
        } else if (req.url === "/searchDesigners") {
            // 디자이너 데이터 매핑을 가져옴
            map = instance.patch.designerMap();
            // 디자이너 ID 필드명 설정
            idName = "desid";
        }

        // map 객체의 값을 배열로 변환하여 mapArr에 저장
        mapArr = Object.values(map);

        // searchQuery 객체를 빈 객체로 초기화
        searchQuery = {};

        // 검색 쿼리가 "id:"로 시작하는 경우
        if (/^id\:/gi.test(req.body.query)) {
            // "id:" 이후의 값을 가져와 쉼표로 구분하고 배열로 변환
            searchArr = req.body.query.slice(3).trim().split(',').map((str) => { return str.trim(); });
            // 각 값에 대해 ID 필드명을 키로 하는 객체를 생성하여 배열에 저장
            searchArr = searchArr.map((str) => { let o = {}; o[idName] = str; return o; });
        } else {
            // 그렇지 않으면 검색할 항목을 빈 배열로 초기화
            searchArr = [];
            // mapArr을 순회하면서 검색 가능한 필드에 대해 정규식을 적용한 쿼리 생성
            for (let { position, searchBoo } of mapArr) {
                if (searchBoo) {
                    // 정규식을 통해 입력된 검색어를 검색 조건으로 추가
                    tempObj = {};
                    tempObj2 = {};
                    if (req.body.query !== "") {
                        tempObj["$regex"] = new RegExp(queryFilter(req.body.query), 'gi');
                    } else {
                        // 검색어가 없을 경우 모든 항목을 대상으로 함
                        tempObj["$regex"] = new RegExp('.', 'gi');
                    }
                    tempObj2[position] = tempObj["$regex"];
                    // 쿼리 배열에 해당 필드의 검색 조건을 추가
                    searchArr.push(tempObj2);
                }
            }

            // URL이 "/searchDesigners"이고 검색어에 쉼표가 포함된 경우, 디자이너명을 별도로 검색
            if (req.url === "/searchDesigners" && /,/gi.test(req.body.query)) {
                // 쉼표로 구분된 각 검색어를 배열로 변환
                queryArr = req.body.query.split(",").map((s) => { return s.trim() });
                // 각 검색어에 대해 디자이너명을 검색하는 쿼리를 추가
                queryArr = queryArr.map((s) => { return { designer: { $regex: s } } });
                // 기존 searchArr에 디자이너 검색 쿼리 배열을 병합
                searchArr = searchArr.concat(queryArr);
            }
        }

        // 최종적으로 "$or" 조건을 사용하여 검색 배열을 searchQuery에 저장
        searchQuery["$or"] = searchArr;
    
        // 검색 대상이 클라이언트일 경우
        if (req.url === "/searchClients") {
            // 클라이언트 데이터를 검색하기 위한 쿼리 실행
            rawJson = await instance.back.getClientsByQuery(searchQuery, { withTools: true, selfMongo: instance.mongo });
        } 
        // 검색 대상이 프로젝트일 경우
        else if (req.url === "/searchProjects") {
            // 프로젝트 데이터를 검색하기 위한 쿼리 실행
            rawJson = await instance.back.getProjectsByQuery(searchQuery, { withTools: true, selfMongo: instance.mongo });

            // 프로젝트 화면에서 검색이 이루어졌을 경우
            if (/\/project/g.test(req.headers.referer)) {

                // 검색어가 "d"로 시작하는 경우, 디자인 관련 검색
                if (/^d/i.test(req.body.query)) {
                    // 검색어에서 특수문자 제거 및 정규식 생성
                    req.body.query = req.body.query.replace(/[\~\!\@\#\$\%\^\&\*\(\)\_\:\;\?\/\|\<\>\,\.\\\]\[\{\} \n\t]/g, '').replace(/^d/i, '');
                    
                    // 결과가 없을 경우 디자이너 데이터를 다시 검색
                    if (rawJson.length === 0) {
                        mapArr = Object.values(instance.patch.designerMap()); // 디자이너 데이터 매핑
                        searchQuery = {};
                        searchArr = [];
                        
                        // 디자이너 필드별로 정규식을 사용한 검색 쿼리 생성
                        for (let { position, searchBoo } of mapArr) {
                            if (searchBoo) {
                                tempObj = {};
                                tempObj2 = {};
                                tempObj["$regex"] = new RegExp(queryFilter(req.body.query), 'gi');
                                tempObj2[position] = tempObj["$regex"];
                                searchArr.push(tempObj2);
                            }
                        }
                        searchQuery["$or"] = searchArr;

                        // 디자이너 검색 실행
                        rawJson = await instance.back.getDesignersByQuery(searchQuery, { withTools: true, selfMongo: instance.mongo });

                        // 검색된 디자이너의 ID로 다시 프로젝트를 검색
                        whereQuery = {};
                        whereQuery["$or"] = [];
                        for (let designers of rawJson) {
                            whereQuery["$or"].push({ desid: designers.desid });
                        }

                        // 디자이너에 해당하는 프로젝트가 있을 경우 쿼리 실행
                        if (whereQuery["$or"].length > 0) {
                            rawJson = await instance.back.getProjectsByQuery(whereQuery, { withTools: true, selfMongo: instance.mongo });
                        } else {
                            rawJson = [];
                        }
                    }
                } 
                // 검색어가 "d"로 시작하지 않을 경우
                else {
                    // 클라이언트를 다시 검색
                    if (rawJson.length === 0) {
                        mapArr = Object.values(instance.patch.clientMap()); // 클라이언트 데이터 매핑
                        searchQuery = {};
                        searchArr = [];

                        // 클라이언트 필드별로 정규식을 사용한 검색 쿼리 생성
                        for (let { position, searchBoo } of mapArr) {
                            if (searchBoo) {
                                tempObj = {};
                                tempObj2 = {};
                                tempObj["$regex"] = new RegExp(queryFilter(req.body.query), 'gi');
                                tempObj2[position] = tempObj["$regex"];
                                searchArr.push(tempObj2);
                            }
                        }
                        searchQuery["$or"] = searchArr;

                        // 클라이언트 검색 실행
                        rawJson = await instance.back.getClientsByQuery(searchQuery, { withTools: true, selfMongo: instance.mongo });

                        // 검색된 클라이언트의 ID로 다시 프로젝트 검색
                        whereQuery = {};
                        whereQuery["$or"] = [];
                        for (let client of rawJson) {
                            whereQuery["$or"].push({ cliid: client.cliid });
                        }

                        // 클라이언트에 해당하는 프로젝트가 있을 경우 쿼리 실행
                        if (whereQuery["$or"].length > 0) {
                            rawJson = await instance.back.getProjectsByQuery(whereQuery, { withTools: true, selfMongo: instance.mongo });
                        } else {
                            rawJson = [];
                        }

                        // 여전히 결과가 없으면 디자이너를 검색하여 다시 프로젝트 검색
                        if (rawJson.length === 0) {
                            mapArr = Object.values(instance.patch.designerMap()); // 디자이너 데이터 매핑
                            searchQuery = {};
                            searchArr = [];

                            // 디자이너 필드별로 정규식을 사용한 검색 쿼리 생성
                            for (let { position, searchBoo } of mapArr) {
                                if (searchBoo) {
                                    tempObj = {};
                                    tempObj2 = {};
                                    tempObj["$regex"] = new RegExp(queryFilter(req.body.query), 'gi');
                                    tempObj2[position] = tempObj["$regex"];
                                    searchArr.push(tempObj2);
                                }
                            }
                            searchQuery["$or"] = searchArr;

                            // 디자이너 검색 실행
                            rawJson = await instance.back.getDesignersByQuery(searchQuery, { withTools: true, selfMongo: instance.mongo });

                            // 검색된 디자이너의 ID로 다시 프로젝트 검색
                            whereQuery = {};
                            whereQuery["$or"] = [];
                            for (let designers of rawJson) {
                                whereQuery["$or"].push({ desid: designers.desid });
                            }

                            // 디자이너에 해당하는 프로젝트가 있을 경우 쿼리 실행
                            if (whereQuery["$or"].length > 0) {
                                rawJson = await instance.back.getProjectsByQuery(whereQuery, { withTools: true, selfMongo: instance.mongo });
                            } else {
                                rawJson = [];
                            }
                        }
                    }
                }

                // 결과 필터링: 디자이너 ID가 있는 항목만 필터링
                filteredArr = [];
                for (let obj of rawJson) {
                    if (obj.desid !== "") {
                        filteredArr.push(obj);
                    }
                }

                // flatDeath 및 planeDeath 메서드로 필터링된 배열 변환
                filteredArr.flatDeath = function () {
                    let tong, tempArr;
                    tong = [];
                    for (let i of this) {
                        tempArr = i.flatDeath();
                        for (let j of tempArr) {
                            tong.push(j);
                        }
                    }
                    return tong;
                };

                filteredArr.planeDeath = function () {
                    let tong, tempArr;
                    tong = [];
                    for (let i of this) {
                        tempArr = i.planeDeath();
                        for (let j of tempArr) {
                            tong.push(j);
                        }
                    }
                    return tong;
                };

                // 최종 결과 저장
                rawJson = filteredArr;
            }
        } 
        // 디자이너 데이터를 검색할 경우
        else if (req.url === "/searchDesigners") {
            // 디자이너 데이터를 검색하기 위한 쿼리 실행
            rawJson = await instance.back.getDesignersByQuery(searchQuery, { withTools: true, selfMongo: instance.mongo });
        }
    
      // flatDeath를 사용하여 데이터를 평탄화함
      if (req.body.noFlat === undefined) {
        // 데이터를 평탄화(flatten)하여 변환
        data = rawJson.flatDeath();

        // 요청 경로가 '/searchClients'인 경우
        if (req.url === "/searchClients") {
            // 클라이언트 ID 리스트 생성
            thisCliids = data.map((obj) => { return obj.standard.cliid });

            // 클라이언트 히스토리를 조회하기 위한 쿼리 생성
            historyWhereQuery = {};
            historyWhereQuery["$or"] = thisCliids.map((cliid) => { return { cliid } });

            // 클라이언트 히스토리, 매출, 프로젝트 데이터 조회
            if (thisCliids.length > 0) {
                thisHistories = await selfMongo.db(db).collection("clientHistory")
                                .find(historyWhereQuery)
                                .project({ cliid: 1, manager: 1, "curation.analytics.send": 1, _id: 0 })
                                .toArray();
                thisDailySales = await selfMongo.db(db).collection("dailySales")
                                .find({
                                    $or: thisCliids.map((thisCliid) => {
                                        return {
                                            cliids: {
                                                $elemMatch: { cliid: thisCliid }
                                            }
                                        }
                                    })
                                })
                                .project({ date: 1, cliids: 1, _id: 0 })
                                .toArray();
                allProjects = await selfCoreMongo.db(db).collection("project")
                                .find(historyWhereQuery)
                                .project({ cliid: 1, proid: 1, proposal: 1, _id: 0 })
                                .toArray();
            } else {
                thisHistories = [];
                thisDailySales = [];
                allProjects = [];
            }

            // 디자이너 데이터 조회
            allDesigners = await selfCoreMongo.db(db).collection("designer")
                            .find({})
                            .project({ desid: 1, designer: 1, _id: 0 })
                            .toArray();
            resultArr = [];

            // 히스토리를 바탕으로 제안 및 히스토리 정보를 구성
            for (let { manager, cliid, curation: { analytics: { send } } } of thisHistories) {
                resultArr.push({
                    cliid,
                    manager,
                    proposal: send.filter((obj) => { return obj.page === "designerProposal" }),
                    about: send.filter((obj) => { return obj.page === "finalPush" }),
                    pure: send.filter((obj) => { return obj.page === "pureOutOfClient" }),
                    haha: send.filter((obj) => { return obj.page === "lowLowPush" }),
                });
            }

            // 검색된 데이터를 기반으로 클라이언트 히스토리 및 프로젝트 정보 처리
            for (let obj of data) {
                thisHistory = resultArr.find((o) => { return o.cliid === obj.standard.cliid });

                // 제안 정보를 날짜순으로 정렬
                thisHistory.proposal.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });

                // 제안 정보가 있을 경우 처리
                if (thisHistory.proposal.length > 0) {
                    proposalSend = dateToString(thisHistory.proposal[0].date);

                    // 해당 클라이언트의 프로젝트 데이터를 필터링하여 정렬
                    thisProjects = allProjects.filter((project) => { return project.cliid === obj.standard.cliid });
                    thisProjects.sort((a, b) => { return b.proposal.date.valueOf() - a.proposal.date.valueOf() });

                    // 디자이너 ID 및 디자이너 이름 배열 생성
                    desidArr = thisProjects[0].proposal.detail.map((o) => { return o.desid });
                    designersArr = desidArr.map((desid) => { return allDesigners.find((d) => { return d.desid === desid }).designer; });
                } else {
                    proposalSend = '-';
                    desidArr = [];
                    designersArr = [];
                }

                // 클라이언트 정보 업데이트
                obj.info.manager = thisHistory.manager;
                obj.info.proposalSend = proposalSend;
                obj.info.pureSend = thisHistory.pure.length > 0 ? dateToString(thisHistory.pure[0].date) : '-';
                obj.info.aboutSend = thisHistory.about.length > 0 ? dateToString(thisHistory.about[0].date) : '-';
                obj.info.hahaSend = thisHistory.haha.length > 0 ? dateToString(thisHistory.haha[0].date) : '-';
                obj.info.desids = desidArr.length > 0 ? desidArr.join(", ") : "-";
                obj.info.proposalDesigners = designersArr.length > 0 ? designersArr.join(", ") : "-";

                // 매출 정보를 가져와 정렬 및 처리
                dailySalesArr = thisDailySales.filter((s) => {
                    return s.cliids.findIndex((o) => { return o.cliid === obj.standard.cliid }) !== -1;
                }).map((o) => { return o.date });

                // 매출 정보가 없을 경우 처리
                if (dailySalesArr.length === 0) {
                    obj.info.standardDate = '-';
                } else if (dailySalesArr.length === 1) {
                    obj.info.standardDate = dateToString(dailySalesArr[0]);
                } else {
                    // 매출 정보를 정렬하고 적절한 날짜를 선택
                    dailySalesArr.sort((a, b) => { return b.valueOf() - a.valueOf() });
                    thisRequestIndex = rawJson.find((client) => { return client.cliid === obj.standard.cliid })
                                        .requests.toNormal()
                                        .map((re) => {
                                            return dateToString(re.request.timeline, true).slice(0, 13);
                                        }).findIndex((str) => { return str === obj.info.timeline.slice(0, 13) });
                    thisSalesDate = dailySalesArr[thisRequestIndex];

                    if (thisSalesDate === undefined) {
                        obj.info.standardDate = '-';
                    } else {
                        obj.info.standardDate = dateToString(thisSalesDate);
                    }
                }
            }
        } 
        // 요청 경로가 '/searchProjects'인 경우
        else if (req.url === "/searchProjects") {

            thisCliids = data.map((obj) => { return obj.middle.cliid });

            historyWhereQuery = {};
            historyWhereQuery["$or"] = thisCliids.map((cliid) => { return { cliid } });

            // 클라이언트와 평가 데이터를 조회
            allClients = await back.mongoRead("client", historyWhereQuery, { selfMongo: selfCoreMongo });
            evaluationSendRows = (await requestSystem("https://" + instance.address.officeinfo.host + ":3002/justClientEvaluation", 
                                { mode: "all", cliid: "", proid: "" }, 
                                { headers: { "Content-Type": "application/json" } })).data;
            evaluationResultRows = (await requestSystem("https://" + instance.address.officeinfo.host + ":3002/justClientEvaluation", 
                                { mode: "resultAll", cliid: "", proid: "" }, 
                                { headers: { "Content-Type": "application/json" } })).data;

            // 검색된 프로젝트 데이터 처리
            for (let obj of data) {
                thisHistory = allClients.find((o) => { return o.cliid === obj.middle.cliid });
                thisRequestNumber = 0;

                // 요청 번호를 타임라인에 맞게 선택
                for (let i = 0; i < thisHistory.requests.length; i++) {
                    if (thisHistory.requests[i].request.timeline.valueOf() <= stringToDate(obj.info.proposalDate).valueOf()) {
                        thisRequestNumber = i;
                        break;
                    }
                }
                thisRequest = thisHistory.requests[thisRequestNumber].request;

                // 평가 데이터를 처리하여 전송 여부 및 결과 여부 설정
                thisEvaluationSendRow = evaluationSendRows.map((r) => { return r.proid }).includes(obj.standard.proid) ? 1 : 0;
                thisEvaluationResultRow = evaluationResultRows.map((r) => { return r.proid }).includes(obj.standard.proid) ? 1 : 0;

                // 프로젝트 정보 업데이트
                obj.info.name = thisHistory.name;
                obj.info.address = thisRequest.space.address;
                obj.info.spaceContract = thisRequest.space.contract;
                obj.info.pyeong = thisRequest.space.pyeong;
                obj.info.evaluationSend = thisEvaluationSendRow === 1 ? "전송" : "미전송";
                obj.info.evaluationResult = thisEvaluationResultRow === 1 ? "완료" : "미완료";
            }
        }

        // JSON으로 변환 후 응답 전송
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ standard, data }));
      } else {
        // noFlat 조건이 없을 경우, 평탄화 없이 기본 데이터 응답
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify(rawJson.toNormal()));
      }

      } catch (e) {
        // 에러 발생 시 로깅하고, 클라이언트에 에러 메시지를 전송
        logger.error(e, req).catch((e) => { console.log(e); });
        // JSON 형식으로 응답을 설정
        res.set("Content-Type", "application/json");
        // 에러 메시지를 클라이언트에 전송
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /updateClient, /updateDesigner, /updateProject
     * @description 클라이언트, 디자이너, 프로젝트 데이터를 업데이트하는 라우터입니다.
     * @param {object} req - 클라이언트 요청 객체.
     * @param {object} res - 서버 응답 객체.
     */
    router.post([ "/updateClient", "/updateDesigner", "/updateProject" ], async function (req, res) {
      try {
        // 요청된 데이터를 equalJson으로 깊은 복사 및 JSON 파싱
        let { thisId, requestIndex, column, value, pastValue, user, thisCase } = equalJson(req.body);
        let thisPath; // 현재 처리할 데이터 경로 (클라이언트, 디자이너, 프로젝트)
        let map; // 데이터 매핑 객체
        let whereQuery, updateQuery; // 조건 쿼리 및 업데이트 쿼리
        let message; // 처리 결과 메시지
        let finalValue, valueTemp, pastFinalValue, pastValueTemp; // 최종 값 및 임시 값 저장 변수
        let temp, temp2, temp3; // 임시 변수를 사용하여 날짜 처리
        let tempFunction; // 객체 데이터 변환 함수
        let position; // 업데이트할 데이터의 위치 정보
        let userArr; // 사용자 배열 (추후 필요 시 사용)
        let today; // 현재 날짜
        let noUpdate; // 업데이트 필요 여부 플래그

        // 요청 URL에 따라 처리할 데이터 경로와 매핑 객체 설정
        if (req.url === "/updateClient") {
          thisPath = "client";
          map = instance.patch.clientMap();
        } else if (req.url === "/updateDesigner") {
          thisPath = "designer";
          map = instance.patch.designerMap();
        } else if (req.url === "/updateProject") {
          thisPath = "project";
          map = instance.patch.projectMap();
        }

        noUpdate = false; // 업데이트 플래그 초기화
    
        // 값이 문자열 타입이 아닌 경우에 대한 처리
        if (typeof value !== "string") {
            // 값이 Date 객체인 경우, dateToString 함수를 이용해 날짜 형식의 문자열로 변환 (ISO 형식 또는 기타 지정된 형식으로 변환)
            if (value instanceof Date) {
                value = dateToString(value, true); // true로 인해 시간까지 포함된 문자열로 변환
            }
        }

        // map 객체에서 가져온 column의 타입에 따라 값을 처리하는 switch문
        switch (map[column].type) {
            // column이 "string" 타입일 때 처리
            case "string":
                // 받은 값(value)을 문자열로 변환하고, 앞뒤 공백 및 탭(\t)을 제거
                finalValue = String(value).trim().replace(/\t/gi, '');
                // 이전 값(pastValue)도 동일하게 처리
                pastFinalValue = String(pastValue).trim().replace(/\t/gi, '');
                break;

            // column이 "number" 타입일 때 처리
            case "number":
                // 받은 값을 숫자로 변환하려고 시도, 실패 시에는 이전 값(pastValue)을 사용
                if (Number.isNaN(Number(value.replace(/[^0-9\.\-]/g, '')))) {
                    finalValue = Number(pastValue.replace(/[^0-9\.\-]/g, ''));
                } else {
                    finalValue = Number(value.replace(/[^0-9\.\-]/g, ''));
                }
                // 이전 값도 숫자로 변환
                pastFinalValue = Number(pastValue.replace(/[^0-9\.\-]/g, ''));
                break;

            // column이 "date" 타입일 때 처리
            case "date":
                // 값이 "-"나 빈 문자열인 경우 기본값으로 설정 (1800년 1월 1일)
                if (value === "-" || value === "") {
                    value = "1800-01-01";
                // "예정"이라는 문자열을 포함하는 경우, 미래의 날짜로 설정 (3800년 1월 1일)
                } else if (/예정/g.test(value)) {
                    value = "3800-01-01";
                }
                // 날짜 형식에 맞는 경우 처리 (yyyy-mm-dd 또는 yyyy-mm-dd hh:mm:ss)
                if (/^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]/g.test(value)) {
                    // 값의 길이가 10인 경우(날짜만 있는 경우)
                    if (value.length === 10) {
                        // 날짜 값을 '-'로 분리하여 각각 년, 월, 일을 추출하고, Date 객체로 변환
                        temp = value.split('-');
                        finalValue = new Date(Number(temp[0]), Number(temp[1].replace(/^0/, '')) - 1, Number(temp[2].replace(/^0/, '')));
                    // 값의 길이가 19인 경우(날짜와 시간 모두 있는 경우)
                    } else if (value.length === 19) {
                        // 날짜와 시간을 각각 분리하고, 시간을 ':'로 나눠 시, 분, 초를 추출
                        temp = value.split(' ');
                        temp2 = temp[0].split('-');
                        temp3 = temp[1].split(':');
                        // Date 객체로 변환
                        finalValue = new Date(Number(temp2[0]), Number(temp2[1].replace(/^0/, '')) - 1, Number(temp2[2].replace(/^0/, '')), Number(temp3[0].replace(/^0/, '')), Number(temp3[1].replace(/^0/, '')), Number(temp3[2].replace(/^0/, '')));
                    } else {
                        // 날짜 형식이 맞지 않으면 이전 값을 유지
                        finalValue = new Date(pastValue);
                    }
                } else {
                    // 날짜 형식이 아닌 경우 이전 값을 유지
                    finalValue = new Date(pastValue);
                }
                // 이전 값도 Date 객체로 변환
                pastFinalValue = new Date(pastValue);
                break;

            // column이 "boolean" 타입일 때 처리
            case "boolean":
                // 부정적인 의미를 가진 문자열이나 특정 값들을 false로 변환
                if (/^미/.test(value) || /^비/.test(value) || /^안/.test(value) || /no/gi.test(value) || value === "false" || value === "null" || value === "전체") {
                    pastFinalValue = false;
                    finalValue = false;
                } else {
                    // 그 외의 경우 true로 변환
                    pastFinalValue = true;
                    finalValue = true;
                }
                break;

            // column이 "array" 타입일 때 처리
            case "array":
                // 받은 값과 이전 값을 각각 배열로 변환하여 처리
                finalValue = [];
                pastFinalValue = [];
                // 값을 ", " 기준으로 나눠 배열로 변환
                valueTemp = value.split(", ");
                pastValueTemp = pastValue.split(", ");
                for (let i of valueTemp) {
                    finalValue.push(i);
                }
                for (let i of pastValueTemp) {
                    pastFinalValue.push(i);
                }
                break;

            // column이 "object" 타입일 때 처리
            case "object":
                // map에서 제공된 objectFunction을 사용해 객체 값을 처리
                tempFunction = new Function("value", "pastValue", "vaildMode", map[column].objectFunction);
                finalValue = tempFunction(value, pastValue, false);
                pastFinalValue = tempFunction(pastValue, pastValue, false);
                break;

            // column이 "null" 타입일 때 처리
            case "null":
                // 업데이트하지 않음을 표시하는 플래그 설정
                noUpdate = true;
                finalValue = null;
                pastFinalValue = null;
                break;

            // column이 "link" 타입일 때 처리
            case "link":
                // 링크 값을 문자열로 변환
                finalValue = String(value);
                break;

            // 처리할 수 없는 타입이 들어왔을 경우 오류 발생
            default:
                throw new Error("invaild type");
        }
    
        // 업데이트가 필요하지 않은 경우를 제외하고 업데이트 쿼리를 작성
        if (!noUpdate) {
          updateQuery = {}; // 업데이트할 내용을 담을 객체
          
          // map에서 column의 위치 값을 가져와 0번째 인덱스 대신 requestIndex로 대체
          position = map[column].position.replace(/\.0\./, ("." + requestIndex + "."));
          
          // position 값이 null이 아닐 때만 업데이트 진행
          if (position !== "null") {
            
            // 업데이트 쿼리에 위치와 최종 값을 추가
            updateQuery[position] = finalValue;
            
            whereQuery = {}; // 조건 쿼리 객체 초기화
            
            // 요청된 URL에 따라 클라이언트, 디자이너, 프로젝트 각각의 조건 설정
            if (req.url === "/updateClient") {
              whereQuery[map.cliid.position] = thisId; // 클라이언트 ID로 where 쿼리 설정
            } else if (req.url === "/updateDesigner") {
              whereQuery[map.desid.position] = thisId; // 디자이너 ID로 where 쿼리 설정
            } else if (req.url === "/updateProject") {
              whereQuery[map.proid.position] = thisId; // 프로젝트 ID로 where 쿼리 설정
            }

            // 히스토리 기록이 필요한 경우
            if (map[column].isHistory !== undefined && map[column].isHistory !== null) {
              // 요청된 URL에 따라 해당하는 히스토리 업데이트 메서드 호출
              if (req.url === "/updateClient") {
                message = await instance.back.updateHistory("client", [ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });
              } else if (req.url === "/updateDesigner") {
                message = await instance.back.updateHistory("designer", [ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });
              } else if (req.url === "/updateProject") {
                message = await instance.back.updateHistory("project", [ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });
              }
            } else {
              // 히스토리 기록이 필요 없는 경우, 직접 데이터 업데이트
              if (req.url === "/updateClient") {
                message = await instance.back.updateClient([ whereQuery, updateQuery ], { selfMongo: instance.mongo });
              } else if (req.url === "/updateDesigner") {
                message = await instance.back.updateDesigner([ whereQuery, updateQuery ], { selfMongo: instance.mongo });
              } else if (req.url === "/updateProject") {
                message = await instance.back.updateProject([ whereQuery, updateQuery ], { selfMongo: instance.mongo });
              }
            }

          } else {
            message = "success"; // position 값이 null인 경우 성공 메시지 반환
          }
        }

        // map에서 calendar 설정이 있을 경우 처리
        if (map[column].calendar !== undefined) {
          if (typeof map[column].calendar === "function") {
            let calendObj, start, id, to, title;
            
            // calendar 함수 호출하여 캘린더 객체 반환
            calendObj = map[column].calendar(equalJson(thisCase));
            id = calendObj.id; // 캘린더 이벤트 ID
            to = calendObj.to; // 대상 사용자 또는 팀
            title = calendObj.title; // 캘린더 이벤트 제목
            start = finalValue; // 이벤트 시작 시간
            
            // 캘린더에 해당 이벤트가 있는지 검색
            instance.calendar.listEvents(to, id).then((searchResult) => {
              // 이벤트가 없으면 새로운 이벤트 생성
              if (searchResult.length === 0) {
                instance.calendar.makeSchedule(to, title, "", start, null);
              } else {
                // 이벤트가 이미 있으면 해당 이벤트 업데이트
                instance.calendar.updateSchedule(to, searchResult[0].eventId, { start, title });
              }
            }).catch((err) => {
              // 에러가 발생할 경우 예외 처리
              throw new Error(err);
            });
          }
        }

        // Content-Type을 JSON으로 설정하고 결과 메시지를 전송
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ message }));

      } catch (e) {
        // 에러 발생 시 로깅하고, 클라이언트에 에러 메시지를 전송
        logger.error(e, req).catch((e) => { console.log(e); });
        // JSON 형식으로 응답을 설정
        res.set("Content-Type", "application/json");
        // 에러 메시지를 클라이언트에 전송
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /rawUpdateClient, /rawUpdateDesigner, /rawUpdateProject, /rawUpdateContents, /rawUpdateAspirant
     * @description 클라이언트, 디자이너, 프로젝트, 콘텐츠, 지원자 데이터를 업데이트하는 라우터입니다.
     * @param {object} req - 클라이언트 요청 객체.
     * @param {object} res - 서버 응답 객체.
     */
    router.post([ "/rawUpdateClient", "/rawUpdateDesigner", "/rawUpdateProject", "/rawUpdateContents", "/rawUpdateAspirant" ], async function (req, res) {
      // 응답 헤더 설정: JSON 형식으로 응답하고 모든 도메인에서 접근 허용
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });

      try {
        let raw_data; // 업데이트 결과 데이터를 담을 변수
        let whereQuery, updateQuery, dateQuery; // 조건, 업데이트 쿼리, 날짜 쿼리
        let cookies; // 쿠키 파싱을 위한 변수
        let updateTong; // 업데이트 로그 저장 객체

        // req.body에 'where' 또는 'whereQuery' 값이 있으면 해당 쿼리를 사용
        if (req.body.where !== undefined) {
          // equalJson 메서드를 사용해 쿼리 깊은 복사 및 Date 객체 복구
          whereQuery = equalJson(req.body.where);
        } else {
          whereQuery = equalJson(req.body.whereQuery);
        }

        // 업데이트 쿼리가 정의되지 않은 경우 처리
        if (req.body.updateQuery === undefined) {
          updateQuery = {};
          // updateValue가 JSON 객체나 배열로 시작하면 해당 값을 파싱하여 적용
          if (/^\{/.test(req.body.updateValue) || /^\[/.test(req.body.updateValue)) {
            updateQuery[req.body.target] = equalJson(req.body.updateValue);
          } else if (req.body.updateValue === "today") {
            // 'today' 값일 경우 현재 날짜(Date 객체)를 설정
            updateQuery[req.body.target] = new Date();
          } else {
            // 일반 값일 경우 해당 값을 설정
            updateQuery[req.body.target] = req.body.updateValue;
          }
        } else {
          // 이미 정의된 updateQuery가 있는 경우 equalJson으로 파싱하여 사용
          updateQuery = equalJson(req.body.updateQuery);
        }

        // 요청된 URL에 따라 각 데이터베이스에서 업데이트 처리
        if (req.url === "/rawUpdateClient") {
          raw_data = await back.updateClient([ whereQuery, updateQuery ], { selfMongo: instance.mongo });
        } else if (req.url === "/rawUpdateDesigner") {
          raw_data = await back.updateDesigner([ whereQuery, updateQuery ], { selfMongo: instance.mongo });
        } else if (req.url === "/rawUpdateProject") {
          raw_data = await back.updateProject([ whereQuery, updateQuery ], { selfMongo: instance.mongo });
        } else if (req.url === "/rawUpdateContents") {
          raw_data = await back.updateContents([ whereQuery, updateQuery ], { selfMongo: instance.mongo });
        } else if (req.url === "/rawUpdateAspirant") {
          raw_data = await back.updateAspirant([ whereQuery, updateQuery ], { selfMongo: instance.mongo });
        }

        // 업데이트 정보를 로그에 남기기 위한 객체 설정
        updateTong = {
          user: {
            name: "unknown",
            email: "unknown"
          },
          where: Object.values(whereQuery)[0], // 업데이트 조건 저장
          update: { updateQuery: JSON.stringify(updateQuery) }, // 업데이트 쿼리 저장
          date: new Date() // 로그 날짜 저장
        };

        // 요청의 쿠키에서 사용자 정보를 파싱
        cookies = cookieParsing(req);
        if (cookies !== null) {
          // 사용자 이름과 이메일이 쿠키에 존재할 경우 로그에 반영
          if (cookies.homeliaisonConsoleLoginedName !== undefined && cookies.homeliaisonConsoleLoginedEmail !== undefined) {
            updateTong.user.name = cookies.homeliaisonConsoleLoginedName;
            updateTong.user.email = cookies.homeliaisonConsoleLoginedEmail;
          }
        }

        // 업데이트 로그를 저장
        back.mongoCreate((req.url.replace(/^\/rawU/, 'u') + "Log"), updateTong, { selfMongo: instance.mongolocal }).catch(function (e) {
          throw new Error(e);
        });

        // 업데이트 결과를 클라이언트에 응답
        res.send(JSON.stringify({ message: raw_data }));

      } catch (e) {
        // 오류 발생 시 로그에 기록하고 클라이언트에 에러 메시지 응답
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /deleteClient, /deleteDesigner, /deleteProject, /deleteContents
     * @description 클라이언트, 디자이너, 프로젝트, 콘텐츠 정보를 삭제하는 라우터입니다.
     * @param {object} req - 클라이언트 요청 객체.
     * @param {string} req.url - 요청 경로에 따라 삭제할 데이터를 구분.
     * @param {string} req.body.id - 삭제할 데이터의 ID.
     * @param {object} res - 서버 응답 객체.
     */
    router.post([ "/deleteClient", "/deleteDesigner", "/deleteProject", "/deleteContents" ], async function (req, res) {
      try {
          // 요청 경로가 "/deleteClient"일 경우, 클라이언트 삭제 로직을 처리
          if (req.url === "/deleteClient") {
              // instance의 back 모듈을 사용해 MongoDB에서 클라이언트 데이터를 삭제
              await instance.back.deleteClient(req.body.id, { selfMongo: instance.mongo });
          }
          // 요청 경로가 "/deleteDesigner"일 경우, 디자이너 삭제 로직을 처리
          else if (req.url === "/deleteDesigner") {
              // instance의 back 모듈을 사용해 MongoDB에서 디자이너 데이터를 삭제
              await instance.back.deleteDesigner(req.body.id, { selfMongo: instance.mongo });
          }
          // 요청 경로가 "/deleteProject"일 경우, 프로젝트 삭제 로직을 처리
          else if (req.url === "/deleteProject") {
              // instance의 back 모듈을 사용해 MongoDB에서 프로젝트 데이터를 삭제
              await instance.back.deleteProject(req.body.id, { selfMongo: instance.mongo });
          }
          // 요청 경로가 "/deleteContents"일 경우, 콘텐츠 삭제 로직을 처리
          else if (req.url === "/deleteContents") {
              // instance의 back 모듈을 사용해 MongoDB에서 콘텐츠 데이터를 삭제
              await instance.back.deleteContents(req.body.id, { selfMongo: instance.mongo });
          }

          // JSON 형식으로 응답을 설정
          res.set("Content-Type", "application/json");
          // 삭제 성공 시 성공 메시지를 클라이언트에 전송
          res.send(JSON.stringify({ message: "success" }));
      } catch (e) {
          // 에러 발생 시 로깅하고, 클라이언트에 에러 메시지를 전송
          logger.error(e, req).catch((e) => { console.log(e); });
          // JSON 형식으로 응답을 설정
          res.set("Content-Type", "application/json");
          // 에러 메시지를 클라이언트에 전송
          res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /createClient, /createDesigner, /createProject, /createContents
     * @description 클라이언트, 디자이너, 프로젝트, 콘텐츠 데이터를 생성하는 라우터입니다.
     * @param {object} req - 클라이언트 요청 객체.
     * @param {object} req.body.updateQuery - 생성할 데이터에 대한 업데이트 쿼리.
     * @param {object} res - 서버 응답 객체.
     */
    router.post([ "/createClient", "/createDesigner", "/createProject", "/createContents" ], async function (req, res) {
      try {
        // req.body에 있는 updateQuery 데이터를 equalJson 메서드를 이용해 깊은 복사 후 JSON 파싱 처리
        const updateQuery = equalJson(req.body.updateQuery); 
        
        let id; // 생성된 데이터의 ID를 저장할 변수
        
        // 요청 URL에 따라 적절한 데이터 생성 메서드를 호출
        if (req.url === "/createClient") {
          // 클라이언트 생성 요청인 경우, createClient 메서드를 호출하여 새로운 클라이언트 데이터를 생성
          id = await instance.back.createClient(updateQuery, { selfMongo: instance.mongo });
        } else if (req.url === "/createDesigner") {
          // 디자이너 생성 요청인 경우, createDesigner 메서드를 호출하여 새로운 디자이너 데이터를 생성
          id = await instance.back.createDesigner(updateQuery, { selfMongo: instance.mongo });
        } else if (req.url === "/createProject") {
          // 프로젝트 생성 요청인 경우, 생성 시 proposal.date에 현재 날짜를 추가한 후 프로젝트 데이터를 생성
          updateQuery["proposal.date"] = new Date(); // 프로젝트 생성 시 제안 날짜를 현재 시간으로 설정
          id = await instance.back.createProject(updateQuery, { selfMongo: instance.mongo });
        } else if (req.url === "/createContents") {
          // 콘텐츠 생성 요청인 경우, createContents 메서드를 호출하여 새로운 콘텐츠 데이터를 생성
          id = await instance.back.createContents(updateQuery, { selfMongo: instance.mongo });
        }

        // 생성된 데이터의 ID를 JSON 형식으로 응답
        res.set("Content-Type", "application/json"); // 응답의 Content-Type을 JSON으로 설정
        res.send(JSON.stringify({ id: id })); // 생성된 ID를 JSON으로 변환하여 클라이언트에 응답

      } catch (e) {
        // 오류가 발생할 경우, 오류를 로깅하고 클라이언트에 오류 메시지를 응답
        logger.error(e, req).catch((e) => { console.log(e); }); // 오류가 발생하면 로깅
        res.set("Content-Type", "application/json"); // 응답의 Content-Type을 JSON으로 설정
        res.send(JSON.stringify({ error: e.message })); // 오류 메시지를 JSON으로 변환하여 클라이언트에 응답
      }
    });
    
    /**
     * @route POST /getServices, /getServiceByKey, /getServicesByKind
     * @description 서비스 데이터를 조회하는 라우터입니다. 여러 경로에 따라 서비스 데이터를 필터링해 가져옵니다.
     * @param {object} req - 클라이언트 요청 객체.
     * @param {object} res - 서버 응답 객체.
     */
    router.post([ "/getServices", "/getServiceByKey", "/getServicesByKind" ], async function (req, res) {
      // 응답 헤더 설정: Content-Type, CORS 설정
      res.set({
        "Content-Type": "text/plain", // 응답 콘텐츠 타입을 일반 텍스트로 설정
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용 (CORS 설정)
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용할 HTTP 메서드 설정
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용할 요청 헤더 설정
      });

      try {
        // 경로가 /getServices인 경우 서비스 데이터를 조회
        if (req.url === "/getServices") {
          // whereQuery가 없으면 오류를 발생시킴
          if (req.body.whereQuery === undefined) {
            throw new Error("invalid post"); // whereQuery가 없으면 잘못된 요청 오류 발생
          }
          // 요청 본문에서 whereQuery 데이터를 추출하고, 이를 JSON 형태로 파싱
          const { whereQuery } = equalJson(req.body);
          // MongoDB에서 whereQuery 조건에 맞는 서비스를 가져옴, 최신 순으로 정렬
          const services = await back.getServicesByQuery(whereQuery, { selfMongo: instance.mongo, sort: { date: -1 } });
          // 가져온 데이터를 JSON 형식으로 변환하여 응답
          res.send(JSON.stringify(services.toNormal()));

        // 경로가 /getServiceByKey인 경우
        } else if (req.url === "/getServiceByKey") {
          // key가 없으면 오류를 발생시킴
          if (req.body.key === undefined) {
            throw new Error("invalid post"); // key가 없으면 잘못된 요청 오류 발생
          }
          // 요청 본문에서 key 데이터를 추출하고, 이를 JSON 형태로 파싱
          const { key } = equalJson(req.body);
          // MongoDB에서 해당 key에 맞는 서비스를 가져옴
          const service = await back.getServiceByKey(key, { selfMongo: instance.mongo });
          // 가져온 데이터를 JSON 형식으로 변환하여 응답
          res.send(JSON.stringify(service.toNormal()));

        // 경로가 /getServicesByKind인 경우
        } else if (req.url === "/getServicesByKind") {
          // kind가 없으면 오류를 발생시킴
          if (req.body.kind === undefined) {
            throw new Error("invalid post"); // kind가 없으면 잘못된 요청 오류 발생
          }
          // 요청 본문에서 kind 데이터를 추출하고, 이를 JSON 형태로 파싱
          const { kind } = equalJson(req.body);
          // MongoDB에서 해당 kind에 맞는 서비스를 가져옴
          const services = await back.getServicesByKind(kind, { selfMongo: instance.mongo });
          // 가져온 데이터를 JSON 형식으로 변환하여 응답
          res.send(JSON.stringify(services.toNormal()));
        }
      } catch (e) {
        // 오류 발생 시 로깅하고 오류 메시지를 클라이언트에 응답
        logger.error(e, req).catch((e) => { console.log(e); }); // 오류가 발생하면 로깅
        res.send(JSON.stringify({ message: "error" })); // 클라이언트에 오류 메시지를 응답
      }
    });
    
    /**
     * @route POST /getClientReport
     * @description 클라이언트 보고서를 생성하여 반환하는 라우터입니다. 보고서는 클라이언트, 제안서, 계약 등의 다양한 지표를 포함하며, 월별 데이터를 기반으로 생성됩니다.
     * @param {object} req - 클라이언트 요청 객체. 본문에는 시작 연도/월, 종료 연도/월 등이 포함될 수 있습니다.
     * @param {object} res - 서버 응답 객체. 생성된 보고서 데이터를 JSON 형식으로 반환합니다.
     */
    router.post([ "/getClientReport" ], async function (req, res) {
      try {
        // instance에서 back(데이터 처리), address(서버 주소), port(포트 번호)를 가져옵니다.
        const back = instance.back;
        const address = instance.address;
        const port = 3000;

        /**
         * @function getDateMatrix
         * @description 주어진 기간 동안의 날짜 매트릭스를 생성하는 함수입니다. 월별로 시작일과 종료일을 계산하여 배열로 반환합니다.
         * @param {number} length - 기간을 설정하는 파라미터로, 몇 개월의 데이터를 가져올지 설정합니다. 기본값은 6개월입니다.
         * @returns {Promise<Array<any>>} - 월별로 시작일, 종료일, 다음 월의 첫째 날로 구성된 날짜 매트릭스 배열을 반환합니다.
         */
        const getDateMatrix = async (length = 6) => {
          // 내부적으로 날짜 매트릭스를 3중 배열로 구성합니다.
          const tripleMatrixByDate = (length = 6) => {
              // 각 연도와 월을 기준으로 날짜를 주별로 나눈 2차원 배열을 생성하는 함수입니다.
              const matrixCalendar = (year, month) => {
                  let matrix, weekArr;
                  let leftDates;
                  let weeks;
                  let weekLeft;
                  let first, last;
                  let firstDate, lastDate;
                  let firstDay;
                  let weekLength;
                  let firstWeekLength, middleWeekLength, finalWeekLength;

                  // 해당 월의 첫째 날과 마지막 날을 구합니다.
                  first = new Date(year, month - 1, 0);
                  last = new Date(year, month, 0);

                  firstDate = first.getDate();  // 첫째 날의 날짜
                  firstDay = first.getDay();    // 첫째 날의 요일
                  lastDate = last.getDate();    // 마지막 날의 날짜

                  // 첫째 주에서 남은 날짜 계산
                  leftDates = lastDate - (7 - firstDay);
                  weeks = Math.floor(leftDates / 7);  // 남은 주의 개수
                  weekLeft = leftDates % 7;  // 마지막 주에 남은 날짜

                  // 각 주의 날짜 수를 설정
                  firstWeekLength = lastDate - weekLeft - (weeks * 7);
                  middleWeekLength = weeks;
                  finalWeekLength = weekLeft;

                  // 주별 배열 생성
                  matrix = [];
                  weekArr = [];
                  for (let i = 0; i < firstWeekLength; i++) {
                      weekArr.push(i + 1);
                  }
                  matrix.push(objectDeepCopy(weekArr));

                  // 중간 주 배열 생성
                  for (let i = 0; i < middleWeekLength; i++) {
                      weekArr = [];
                      for (let j = 0; j < 7; j++) {
                          weekArr.push(matrix[0][matrix[0].length - 1] + 1 + j + (i * 7));
                      }
                      matrix.push(objectDeepCopy(weekArr));
                  }

                  // 마지막 주 배열 생성
                  weekArr = [];
                  for (let i = 0; i < finalWeekLength; i++) {
                      weekArr.unshift(lastDate - i);
                  }
                  if (weekArr.length !== 0) {
                      matrix.push(objectDeepCopy(weekArr));
                  }
                  return matrix;
              };

              // 오늘 날짜를 기준으로 length 만큼 과거의 날짜 매트릭스를 생성합니다.
              const today = new Date();
              let copiedDate;
              let year, month;
              let motherMatrix = [];

              for (let i = 0; i < length; i++) {
                  copiedDate = new Date(JSON.stringify(today).slice(1, -1));
                  copiedDate.setMonth(copiedDate.getMonth() - i);
                  year = copiedDate.getFullYear();
                  month = copiedDate.getMonth() + 1;
                  motherMatrix.push(objectDeepCopy(matrixCalendar(year, month)));
              }

              return motherMatrix;
          };
          try {
              // 주어진 기간 동안의 날짜 매트릭스를 반환합니다.
              const today = new Date();
              const dateMatrix = tripleMatrixByDate(length);

              let year, month;
              let day0, day1, day2;
              let resultArr = [];
              let middleResultArr, resultFactorArr;

              // 각 월에 대해 날짜 매트릭스를 생성합니다.
              for (let j = 0; j < dateMatrix.length; j++) {
                  year = today.getFullYear();
                  month = today.getMonth() + 1 - j;

                  year = today.getFullYear() + Math.floor(month / 12) + ((month % 12) === 0 ? -1 : 0);
                  month = (month % 12) > 0 ? (month % 12) : 12 + (month % 12);

                  middleResultArr = [];
                  for (let i = 0; i < dateMatrix[j].length; i++) {
                      resultFactorArr = [];

                      day0 = dateMatrix[j][i][0];  // 첫째 날
                      resultFactorArr.push(new Date(year, month - 1, day0));

                      day1 = dateMatrix[j][i][dateMatrix[j][i].length - 1];  // 마지막 날
                      resultFactorArr.push(new Date(year, month - 1, day1));

                      // 다음 주의 첫째 날을 추가
                      if (i !== dateMatrix[j].length - 1) {
                          day2 = dateMatrix[j][i + 1][0];
                          resultFactorArr.push(new Date(year, month - 1, day2));
                      } else {
                          day2 = 1;
                          if (month === 12) {
                              resultFactorArr.push(new Date(year + 1, 0, day2));
                          } else {
                              resultFactorArr.push(new Date(year, month, day2));
                          }
                      }
                      middleResultArr.push(resultFactorArr);
                  }
                  resultArr.push(middleResultArr);
              }

              return resultArr;
          } catch (e) {
              console.log(e);
              return [];
          }
        };

        /**
         * 현재 날짜(today)를 가져옵니다.
         * @const {Date} today - 현재 시스템 날짜를 저장하는 변수
         */
        const today = new Date();

        /**
         * 제안서 기준일(proposalStandardDate)을 2021년 9월 1일로 설정합니다.
         * @const {Date} proposalStandardDate - 제안서 관련 기준일로, 이 날짜 이후의 데이터만 처리합니다.
         */
        const proposalStandardDate = new Date(2021, 8, 1); // 8은 9월을 의미합니다.

        /**
         * proposalStandardDate의 밀리초 값을 저장합니다.
         * @const {number} proposalStandardDateValue - 제안서 기준일을 밀리초 값으로 변환한 값
         */
        const proposalStandardDateValue = proposalStandardDate.valueOf(); // 날짜를 숫자(밀리초)로 변환

        /**
         * 날짜 매트릭스를 저장하는 변수입니다.
         * @let {Array} dateMatrix - 주어진 기간의 날짜 매트릭스를 저장하는 배열
         */
        let dateMatrix;

        /**
         * 클라이언트, 제안서, 계약, 프로세스 데이터를 저장하는 변수를 정의합니다.
         * @let {Array} clients, proposals, contracts, process - 각각 클라이언트, 제안서, 계약, 프로세스 데이터를 저장할 변수들
         */
        let searchQuery, clients, proposals, contracts, process;

        /**
         * 프로세스 관련 데이터를 저장할 변수를 정의합니다.
         * @let {Array} processTong - 프로세스 데이터를 저장하는 배열
         */
        let processTong;

        /**
         * 클라이언트 ID 배열을 저장하는 변수를 정의합니다.
         * @let {Array} cliidArr, cliidArr_raw - 클라이언트 ID 배열 및 원본 배열을 저장할 변수들
         */
        let cliidArr, cliidArr_raw;

        /**
         * 최종 결과를 저장할 배열을 정의합니다.
         * @let {Array} resultArr - 결과 데이터를 저장할 배열
         */
        let resultArr;

        /**
         * 각종 임시 데이터를 저장하는 변수를 정의합니다.
         * @let {Object} obj - 임시 데이터를 저장할 객체
         */
        let obj;

        /**
         * 검색 여부를 결정하는 플래그 변수를 정의합니다.
         * @let {boolean} searchBoo - 검색이 필요한지 여부를 결정하는 플래그
         */
        let searchBoo;

        /**
         * 복수 프로세스를 처리하는 데이터를 정의합니다.
         * @let {Array} processTong_refined, processTong_past, processTong_double - 복수 프로세스를 처리하는 배열들
         */
        let processTong_refined, processTong_past, processTong_double;

        /**
         * 중복 객체를 처리하는 변수를 정의합니다.
         * @let {Object} doubleObject, doubleClient - 중복 객체 및 클라이언트 정보를 저장하는 객체
         */
        let doubleObject, doubleClient;

        /**
         * 최종 길이를 저장하는 변수를 정의합니다.
         * @let {number} finalLength - 최종 길이를 저장하는 변수
         */
        let finalLength;

        /**
         * 프로세스의 숫자를 저장하는 변수를 정의합니다.
         * @let {number} processNumber - 프로세스의 수를 저장하는 변수
         */
        let processNumber;

        /**
         * 과거 데이터를 처리하는 변수를 정의합니다.
         * @let {Array} pastTong - 과거 데이터를 저장하는 배열
         */
        let pastTong;

        /**
         * 제안서 데이터를 저장하는 배열을 정의합니다.
         * @let {Array} proposalsTong - 제안서 데이터를 저장하는 배열
         */
        let proposalsTong;

        /**
         * 클라이언트 ID와 프로젝트 ID 임시 배열을 정의합니다.
         * @let {Array} cliidTempArr, proidTempArr - 각각 클라이언트 ID 및 프로젝트 ID 임시 배열
         */
        let cliidTempArr, proidTempArr;

        /**
         * Mother 클래스에서 가져온 클라이언트, 프로젝트, 히스토리 데이터를 저장하는 변수를 정의합니다.
         * @let {Array} motherClients, motherProjects, motherProjects_raw, motherClientHistories - 각각 클라이언트, 프로젝트, 히스토리 데이터를 저장하는 배열들
         */
        let motherClients, motherProjects, motherProjects_raw, motherClientHistories;

        /**
         * 프로젝트 히스토리를 저장하는 변수를 정의합니다.
         * @let {Array} histories - 히스토리 데이터를 저장하는 배열
         */
        let histories;

        /**
         * 복사된 매트릭스를 저장하는 변수를 정의합니다.
         * @let {Array} copiedMatrix - 복사된 날짜 매트릭스를 저장하는 배열
         */
        let copiedMatrix;

        /**
         * 월 데이터를 저장하는 객체를 정의합니다.
         * @let {Object} monthObject - 월별 데이터를 저장하는 객체
         */
        let monthObject;

        /**
         * 또다시 복사된 매트릭스를 저장하는 변수를 정의합니다.
         * @let {Array} copiedCopiedMatrix - 또다시 복사된 매트릭스를 저장하는 배열
         */
        let copiedCopiedMatrix;

        /**
         * 연도와 월을 저장하는 배열을 정의합니다.
         * @let {Array} yearMonthArr - 연도와 월 데이터를 저장하는 배열
         */
        let yearMonthArr;

        /**
         * 로그 데이터를 저장하는 변수를 정의합니다.
         * @let {Object} logRes, logFound - 로그 결과 및 검색된 로그 데이터를 저장하는 객체들
         */
        let logRes, logFound;

        /**
         * 계약 데이터를 처리하는 변수를 정의합니다.
         * @let {Array} contractsPure, contractsAmount, contractsPureAmount - 각각 순수 계약 데이터, 계약 금액, 순수 계약 금액을 저장하는 배열들
         */
        let contractsPure, contractsAmount, contractsPureAmount;

        /**
         * 계산된 순수 금액을 저장하는 변수를 정의합니다.
         * @let {number} calculationPureAmount - 계산된 순수 금액을 저장하는 변수
         */
        let calculationPureAmount;

        /**
         * 월별 데이터를 저장하는 배열을 정의합니다.
         * @let {Array} monthArr - 월별 데이터를 저장하는 배열
         */
        let monthArr;

        /**
         * 요청 본문에서 month가 정의되지 않은 경우 처리하는 조건문입니다.
         * @if - month가 정의되지 않았다면 기본값으로 8개월을 설정하고, 검색 여부 플래그(searchBoo)를 false로 설정합니다.
         */
        if (req.body.month === undefined) {
            if (req.body.startYear === undefined) {
                req.body.month = 8;  // 기본값으로 8개월을 설정
                searchBoo = false;  // 검색 여부 플래그를 false로 설정
            } else {
                /**
                 * 시작 연도와 월, 종료 연도와 월이 정의된 경우, 주어진 기간 동안의 보고서를 생성합니다.
                 * 시작 연도/월과 종료 연도/월을 기반으로 전체 기간을 월 단위로 계산하여 저장합니다.
                 */
                let { startYear, startMonth, endYear, endMonth } = req.body;
                startYear = Number(startYear);  // 시작 연도를 숫자로 변환
                startMonth = Number(startMonth.replace(/^0/, ''));  // 시작 월에서 앞의 0을 제거하고 숫자로 변환
                endYear = Number(endYear);  // 종료 연도를 숫자로 변환
                endMonth = Number(endMonth.replace(/^0/, ''));  // 종료 월에서 앞의 0을 제거하고 숫자로 변환

                /**
                 * 현재 날짜에서 시작 연도/월을 뺀 후 전체 기간을 월 단위로 계산하여 month에 저장합니다.
                 * @example 오늘이 2024년 9월이라면, 2022년 1월부터 현재까지의 월 수를 계산하여 저장합니다.
                 */
                req.body.month = ((today.getFullYear() * 12) + today.getMonth() + 1) - ((startYear * 12) + startMonth) + 1;

                /**
                 * 종료 연도/월에서 현재 날짜를 뺀 후 종료 기간을 월 단위로 계산하여 endMonth에 저장합니다.
                 */
                req.body.endMonth = ((today.getFullYear() * 12) + today.getMonth() + 1) - ((endYear * 12) + endMonth);

                searchBoo = true;  // 검색 여부 플래그를 true로 설정
            }
        } else {
            searchBoo = false;  // month가 정의된 경우 검색 여부 플래그를 false로 설정
        }
    
        /**
         * 검색 플래그가 false일 때, 요청 본문에 포함된 월(month)을 기준으로 날짜 매트릭스를 가져옵니다.
         * @if - searchBoo가 false일 때의 조건문
         */
        if (!searchBoo) {
          /**
           * @function getDateMatrix
           * @description 요청된 기간 동안의 날짜 매트릭스를 생성합니다. 
           * req.body.month에 정의된 기간만큼의 매트릭스를 반환합니다.
           * @param {number} req.body.month - 요청 본문에서 가져온 월(month) 값을 인자로 넘깁니다.
           */
          dateMatrix = await getDateMatrix(Number(req.body.month));
        } else {
          /**
           * 검색 플래그가 true일 경우, 요청된 월(month)을 기준으로 매트릭스를 가져오고,
           * endMonth 값에 해당하는 기간을 제외한 나머지를 처리합니다.
           * @else - searchBoo가 true일 때의 조건문
           */
          dateMatrix = await getDateMatrix(Number(req.body.month));

          /**
           * @for - endMonth의 값만큼 날짜 매트릭스를 앞에서부터 제거하여 범위를 조정합니다.
           * @param {number} i - endMonth만큼 반복하면서 dateMatrix에서 해당 월을 제거합니다.
           */
          for (let i = 0; i < req.body.endMonth; i++) {
              dateMatrix.shift();  // endMonth에 해당하는 기간을 제거
          }
        }

        /**
        * @function equalJson
        * @description Mother 클래스의 equalJson 메서드를 사용하여 dateMatrix를 깊은 복사(deepcopy)합니다.
        * 이는 JSON.parse와 JSON.stringify를 사용하여 복사하는 방법을 개선한 버전으로, Date 객체와 같은 특수 객체를 보존합니다.
        * @param {string} JSON.stringify(dateMatrix) - dateMatrix를 문자열로 변환한 후 equalJson으로 깊은 복사합니다.
        * @returns {Array} - 깊은 복사가 완료된 배열을 반환합니다.
        */
        copiedMatrix = equalJson(JSON.stringify(dateMatrix));

        /**
        * 깊은 복사된 매트릭스를 1차원 배열로 변환하여 정렬할 수 있게 합니다.
        * @function Array.prototype.flat
        * @description 복사된 매트릭스를 1차원 배열로 변환합니다.
        */
        copiedMatrix = copiedMatrix.flat().flat();  // 2중 배열을 1차원 배열로 변환

        /**
        * @function Array.prototype.sort
        * @description 매트릭스 안의 날짜를 오름차순으로 정렬합니다.
        * Date 객체의 valueOf()를 사용하여 밀리초 단위로 날짜를 비교합니다.
        * @param {function} (a, b) - 두 날짜를 비교하여 오름차순으로 정렬
        */
        copiedMatrix.sort((a, b) => {
          return a.valueOf() - b.valueOf();  // 날짜를 오름차순으로 정렬
        });
    
        /**
         * @description MongoDB에서 클라이언트 데이터를 조회하여 요청 기간 내에 있는 클라이언트를 가져옵니다.
         * 조건은 클라이언트의 요청(request)의 타임라인(timeline)이 주어진 날짜 범위 내에 있어야 합니다.
         * @param {object} copiedMatrix - 날짜 매트릭스를 담고 있는 배열. 시작과 끝 날짜로 클라이언트의 타임라인을 필터링합니다.
         */
        motherClients = (await back.getClientsByQuery({
          // $and 조건으로 두 가지 조건을 모두 만족하는 데이터를 조회합니다.
          $and: [
              {
                  // 클라이언트 요청(request)의 타임라인이 copiedMatrix의 첫 번째 날짜보다 크거나 같은 경우를 필터링합니다.
                  requests: {
                      $elemMatch: {
                          "request.timeline": { $gte: copiedMatrix[0] }  // 시작 날짜 이상
                      }
                  }
              },
              {
                  // 클라이언트 요청(request)의 타임라인이 copiedMatrix의 마지막 날짜보다 작거나 같은 경우를 필터링합니다.
                  requests: {
                      $elemMatch: {
                          "request.timeline": { $lte: copiedMatrix[copiedMatrix.length - 1] }  // 종료 날짜 이하
                      }
                  }
              }
          ]
        }, { selfMongo: instance.mongo, withTools: true }))  // MongoDB 인스턴스와 추가 도구 옵션을 설정합니다.
        .getRequestsTong()  // 고객의 상담 문의(requests) 데이터를 가져옵니다.
        .map((arr) => { 
          let o = arr[0].toNormal();  // 요청 데이터의 첫 번째 항목을 일반 객체로 변환합니다.
          o.cliid = arr.cliid;  // 클라이언트 ID를 추가합니다.
          o.analytics = arr[1].toNormal();  // 두 번째 항목(분석 데이터)을 일반 객체로 변환합니다.
          return o;  // 변환된 객체를 반환합니다.
        });

        /**
        * @description 클라이언트의 히스토리 데이터를 조회하여 해당 클라이언트의 이력을 가져옵니다.
        * @param {Array} motherClients - 필터링된 클라이언트 리스트에서 cliid를 기준으로 히스토리를 조회합니다.
        */
        motherClientHistories = await back.mongoPick("clientHistory", [ 
          {
              // 클라이언트 ID를 기준으로 OR 조건으로 히스토리 데이터를 조회합니다.
              $or: motherClients.map((o) => { return { cliid: o.cliid } }),  // 클라이언트 ID 배열을 생성
          }, 
          { cliid: 1, manager: 1, curation: 1 }  // 반환할 필드들 (cliid, manager, curation)
        ], { selfMongo: instance.mongolocal });  // 로컬 MongoDB 인스턴스를 사용합니다.

        /**
        * @description 클라이언트의 프로젝트 데이터를 조회하여 주어진 기간 내에 해당하는 프로젝트를 필터링합니다.
        * 계약 날짜가 copiedMatrix의 첫 번째 날짜보다 크거나 같은 프로젝트를 가져옵니다.
        * @param {Array} motherClients - 조회된 클라이언트 데이터를 바탕으로 해당 클라이언트의 프로젝트 데이터를 필터링합니다.
        */
        motherProjects_raw = (await back.getProjectsByQuery({
          // OR 조건으로 클라이언트의 프로젝트 데이터 또는 계약 날짜를 기준으로 필터링합니다.
          $or: motherClients.map((o) => { return { cliid: o.cliid } })  // 클라이언트 ID에 해당하는 프로젝트를 가져옵니다.
          .concat([
              {
                  // 계약 첫 날짜가 copiedMatrix의 첫 번째 날짜 이상인 프로젝트를 가져옵니다.
                  "process.contract.first.date": { $gte: copiedMatrix[0] }  // 시작 날짜 이상
              }
          ]),
        }, { selfMongo: instance.mongo }))  // MongoDB 인스턴스 설정
        .toNormal();  // 프로젝트 데이터를 일반 객체로 변환합니다.

        /**
        * @description 필터링된 프로젝트 데이터에서 계약 첫 날짜가 2000년 1월 1일 이후인 프로젝트만 필터링하여 가져옵니다.
        * @param {Array} motherProjects_raw - 필터링된 프로젝트 데이터
        * @returns {Array} motherProjects - 계약 첫 날짜가 2000년 1월 1일 이후인 프로젝트 데이터
        */
        motherProjects = motherProjects_raw.filter((obj) => {  
          return obj.process.contract.first.date.valueOf() >= (new Date(2000, 0, 1)).valueOf();  // 계약 첫 날짜가 2000년 이후인 프로젝트 필터링
        });
        
        /**
         * @description yearMonthArr 배열에 연도와 월을 저장하고, resultArr 배열에 결과 데이터를 저장하기 위해 초기화합니다.
         * yearMonthArr는 연도와 월을 기반으로 데이터를 정렬하는 데 사용됩니다.
         * resultArr는 최종 결과 데이터를 저장합니다.
         */
        yearMonthArr = [];
        resultArr = [];

        /**
         * @description dateMatrix의 각 매트릭스에 대해 데이터를 처리합니다. 
         * monthObject 객체에 연도와 월을 저장하고, monthArr에 각 데이터를 추가합니다.
         * @param {Array} dateMatrix - 날짜 매트릭스 배열
         */
        for (let matrix of dateMatrix) {

            /**
             * @description 날짜 매트릭스를 깊은 복사하여 처리합니다. equalJson은 Mother 클래스의 메서드로, 깊은 복사 및 Date 객체를 보존하는 업그레이드된 JSON.parse/JSON.stringify 방식입니다.
             * @param {string} JSON.stringify(matrix) - matrix를 문자열로 변환 후 equalJson으로 깊은 복사합니다.
             */
            copiedCopiedMatrix = equalJson(JSON.stringify(matrix));
            
            /**
             * @description 깊은 복사된 날짜 매트릭스를 평탄화하여 1차원 배열로 변환합니다.
             * @function Array.prototype.flat - 2차원 배열을 1차원으로 변환합니다.
             */
            copiedCopiedMatrix = copiedCopiedMatrix.flat();

            /**
             * @description 날짜 매트릭스를 오름차순으로 정렬합니다.
             * @param {function} (a, b) - 날짜를 비교하여 오름차순으로 정렬합니다.
             */
            copiedCopiedMatrix.sort((a, b) => {
                return a.valueOf() - b.valueOf();
            });

            /**
             * @description 중간 날짜를 기준으로 연도와 월을 저장하는 monthObject 객체를 생성합니다.
             * @param {number} Math.round(copiedCopiedMatrix.length / 2) - 매트릭스 배열의 중간 인덱스를 사용하여 연도와 월을 계산합니다.
             */
            monthObject = {
                year: copiedCopiedMatrix[Math.round(copiedCopiedMatrix.length / 2)].getFullYear(),
                month: copiedCopiedMatrix[Math.round(copiedCopiedMatrix.length / 2)].getMonth() + 1,
            };

            /**
             * @description yearMonthArr 배열에 year와 month를 결합하여 연도와 월을 저장합니다.
             * @example yearMonthArr.push(202309) - 2023년 9월을 저장하는 예시입니다.
             */
            yearMonthArr.push((monthObject.year * 100) + monthObject.month);

            monthArr = [];
            
            /**
             * @description 매트릭스 내 각 배열(arr)에 대해 데이터를 처리하고 obj 객체에 클라이언트 및 프로젝트 데이터를 추가합니다.
             */
            for (let arr of matrix) {

                /**
                 * @description obj 객체에 클라이언트 ID(cliId)와 프로젝트 ID(proId) 데이터를 추가할 준비를 합니다.
                 */
                obj = {};
                obj.cliid = {};
                obj.proid = {};

                /**
                 * @description obj 객체에 시작일과 종료일을 저장합니다. zeroAddition 함수는 0을 추가하여 날짜 형식을 유지합니다.
                 */
                obj.startDay = `${zeroAddition(arr[0].getFullYear())}-${zeroAddition(arr[0].getMonth() + 1)}-${zeroAddition(arr[0].getDate())}`;
                obj.endDay = `${zeroAddition(arr[1].getFullYear())}-${zeroAddition(arr[1].getMonth() + 1)}-${zeroAddition(arr[1].getDate())}`;

                /**
                 * @description 클라이언트 데이터를 필터링하여 obj 객체에 클라이언트 수와 관련 데이터를 추가합니다.
                 * 타임라인이 시작일과 종료일 사이에 있는 클라이언트만 필터링합니다.
                 */
                clients = motherClients.filter((obj) => { return obj.timeline.valueOf() >= arr[0].valueOf() && obj.timeline.valueOf() < arr[2].valueOf() });
                obj.client = clients.length;
                obj.cliid.client = clients.map((obj) => { return obj.cliid; });
                obj.proid.client = [];

                /**
                 * @description 제안서 데이터를 처리하여 obj 객체에 제안서 수와 관련 데이터를 추가합니다.
                 * proposalStandardDateValue 기준으로 제안서 데이터를 처리합니다.
                 */
                if (arr[0].valueOf() > proposalStandardDateValue) {
                    cliidArr_raw = clients.map((obj) => { return obj.cliid; });
                    cliidArr_raw = Array.from(new Set(cliidArr_raw));  // 중복 제거
                    process = motherProjects_raw.filter((obj) => { return cliidArr_raw.includes(obj.cliid) });
                    histories = process;
                    obj.proposal = histories.length;
                    obj.cliid.proposal = [ ...new Set(histories.map((obj) => { return obj.cliid })) ];
                    obj.proid.proposal = [ ...new Set(process.map((obj) => { return obj.proid })) ];
                } else {
                    cliidArr_raw = clients.map((obj) => { return obj.cliid; });
                    cliidArr_raw = Array.from(new Set(cliidArr_raw));
                    process = motherProjects_raw.filter((obj) => { return cliidArr_raw.includes(obj.cliid) });
                    obj.proposal = process.length;
                    obj.cliid.proposal = [ ...new Set(process.map((obj) => { return obj.cliid })) ];
                    obj.proid.proposal = [ ...new Set(process.map((obj) => { return obj.proid })) ];
                }

                /**
                 * @description 추천 데이터를 처리하여 obj 객체에 추천 수를 추가합니다.
                 * 추천 데이터는 proposalStandardDateValue 이후와 그 이전에 따라 0으로 설정됩니다.
                 */
                if (arr[0].valueOf() > proposalStandardDateValue) {
                    obj.recommend = 0;
                    obj.cliid.recommend = [];
                    obj.proid.recommend = [];
                } else {
                    obj.recommend = 0;
                    obj.cliid.recommend = [];
                    obj.proid.recommend = [];
                }

                /**
                 * @description 계약 데이터를 필터링하여 obj 객체에 계약 수와 관련 데이터를 추가합니다.
                 * 계약 날짜가 매트릭스의 시작일과 종료일 사이에 있는 계약만 필터링합니다.
                 */
                contracts = motherProjects.filter((obj) => { return obj.process.contract.first.date.valueOf() >= arr[0].valueOf() && obj.process.contract.first.date.valueOf() < arr[2].valueOf() });
                obj.contract = contracts.length;
                obj.cliid.contract = [ ...new Set(contracts.map((obj) => { return obj.cliid; })) ];
                obj.proid.contract = contracts.map((obj) => { return obj.proid });

                /**
                 * @description 드랍되지 않은 순수 계약 데이터를 필터링하여 obj 객체에 추가합니다.
                 */
                contractsPure = contracts.filter((c) => { return !/드[랍롭]/gi.test(c.process.status) });
                obj.contractsPure = contractsPure.length;
                obj.cliid.contractsPure = [ ...new Set(contractsPure.map((obj) => { return obj.cliid; })) ];
                obj.proid.contractsPure = contractsPure.map((obj) => { return obj.proid });

                /**
                 * @description 소비자 금액을 계산하여 obj 객체에 추가합니다.
                 */
                contractsAmount = contractsPure.map((c) => { return c.process.contract.remain.calculation.amount.consumer });
                obj.contractsAmount = contractsAmount.reduce((acc, curr) => { return acc + curr }, 0);

                /**
                 * @description 공급자 금액을 계산하여 obj 객체에 추가합니다.
                 */
                contractsPureAmount = contractsPure.map((c) => { return c.process.contract.remain.calculation.amount.supply });
                obj.contractsPureAmount = contractsPureAmount.reduce((acc, curr) => { return acc + curr }, 0);

                /**
                 * @description 계약 금액에서 순수 금액을 빼서 계산 차액을 구합니다.
                 */
                calculationPureAmount = contractsPure.map((c) => { return c.process.calculation.payments.totalAmount });
                obj.contractAmountSubtract = obj.contractsPureAmount - calculationPureAmount.reduce((acc, curr) => { return acc + curr }, 0);

                /**
                 * @description 클라이언트 응답 상태가 '드랍'이 아닌 클라이언트를 필터링하여 프로세스 데이터를 처리합니다.
                 */
                cliidArr_raw = clients.filter((obj) => { return !/드[롭랍]/gi.test(obj.analytics.response.status) }).map((obj) => { return obj.cliid; });
                cliidArr_raw = Array.from(new Set(cliidArr_raw));
                process = motherProjects_raw.filter((obj) => { return cliidArr_raw.includes(obj.cliid) }).filter((obj) => {
                    return obj.desid.trim() !== '';
                });
                obj.process = process.length;
                obj.cliid.process = [ ...new Set(process.map((obj) => { return obj.cliid })) ];
                obj.proid.process = [ ...new Set(process.map((obj) => { return obj.proid })) ];

                // 월별 데이터를 monthArr 배열에 추가합니다.
                monthArr.push(obj);
            }

            /**
             * @description monthArr 데이터를 JSON으로 직렬화한 후 deep copy하여 monthObject에 저장합니다.
             * @param {string} JSON.stringify(monthArr) - monthArr 배열을 문자열로 변환 후 equalJson으로 복사합니다.
             */
            monthObject.data = equalJson(JSON.stringify(monthArr));

            /**
             * 월별 데이터를 집계하여 monthObject에 추가합니다.
             */
            monthObject.contractsPure = monthObject.data.reduce((acc, curr) => { return acc + curr.contractsPure }, 0);
            monthObject.contractsAmount = monthObject.data.reduce((acc, curr) => { return acc + curr.contractsAmount }, 0);
            monthObject.contractsPureAmount = monthObject.data.reduce((acc, curr) => { return acc + curr.contractsPureAmount }, 0);
            monthObject.contractAmountSubtract = monthObject.data.reduce((acc, curr) => { return acc + curr.contractAmountSubtract }, 0);

            // 최종 결과를 resultArr 배열에 추가합니다.
            resultArr.push(monthObject);
        }

        /**
         * @description yearMonthArr 배열을 정렬합니다.
         */
        yearMonthArr.sort();

        /**
         * @description 외부 시스템에 로그 데이터를 요청하여 MAU, 광고 클라이언트, 차지 등의 데이터를 조회합니다.
         */
        logRes = await requestSystem("https://" + address.testinfo.host + ":" + String(3000) + "/getClientReport", {
            fromYear: Math.floor(yearMonthArr[0] / 100),
            fromMonth: yearMonthArr[0] % 100,
            toYear: Math.floor(yearMonthArr[yearMonthArr.length - 1] / 100),
            toMonth: yearMonthArr[yearMonthArr.length - 1] % 100,
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        /**
         * @description 로그 데이터에서 연도와 월에 해당하는 데이터를 찾아서 obj 객체에 추가합니다.
         */
        for (let obj of resultArr) {
            logFound = logRes.data.find((obj2) => {
                return obj2.year === obj.year && obj2.month === obj.month;
            });
            if (logFound === undefined) {
                obj.mau = 0;
                obj.adClients = 0;
                obj.charge = 0;
            } else {
                obj.mau = logFound.mau;
                obj.adClients = logFound.adClients;
                obj.charge = logFound.charge;
            }
        }

        // 결과 데이터를 JSON 형식으로 응답합니다.
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify(resultArr));

      } catch (e) {
        // 에러가 발생한 경우 로그를 남기고 클라이언트에 에러 메시지를 보냅니다.
        logger.error(e, req).catch((e) => { console.log(e); });

        // 응답 헤더에 JSON 타입을 설정합니다.
        res.set("Content-Type", "application/json");

        // 에러 메시지를 클라이언트에 JSON 형식으로 보냅니다.
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /extractAnalytics
     * @description 클라이언트의 분석 데이터를 추출하는 라우터입니다. 기본 모드에서 클라이언트, 추천, 계약 정보를 날짜별로 분석하여 반환합니다.
     * @param {object} req - 클라이언트 요청 객체. 본문에는 분석 모드, 시작 날짜, 종료 날짜 등의 데이터가 포함됩니다.
     * @param {object} res - 서버 응답 객체. 추출된 데이터를 JSON 형식으로 반환합니다.
     */
    router.post([ "/extractAnalytics" ], async function (req, res) {
      // 응답 헤더에 JSON 형식과 CORS 설정을 추가합니다.
      res.set({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });

      try {
          // 요청 본문에 모드가 정의되지 않은 경우 에러를 발생시킵니다.
          if (req.body.mode === undefined) {
              throw new Error("invalid post");
          }

          // MongoDB 인스턴스와 로컬 MongoDB 인스턴스를 가져옵니다.
          const selfMongo = instance.mongo;
          const selfLocalMongo = instance.mongolocal;

          // 요청 본문에서 mode 값을 equalJson으로 깊은 복사하여 가져옵니다.
          const { mode } = equalJson(req.body);

          let collection;
          let fromDate, toDate;
          let whereQuery;
          let rows;  // 최종 데이터를 저장할 배열
          let motherClients;  // 클라이언트 데이터
          let clients;
          let cliidArr_raw;
          let process;
          let histories;
          let motherClientHistories;  // 클라이언트 히스토리
          let motherProjects_raw;
          let motherProjects;  // 프로젝트 데이터
          let obj;  // 결과 객체
          let contracts;
          let matrix;  // 날짜 매트릭스를 저장할 배열
          let fromDateCopied;
          let tomorrow;

          /**
           * @description 기본 모드에서 데이터를 처리합니다. 시작 날짜와 종료 날짜가 정의되지 않으면 에러를 발생시킵니다.
           */
          if (mode === "basic") {

              // 시작 날짜 또는 종료 날짜가 정의되지 않은 경우 에러를 발생시킵니다.
              if (req.body.fromDate === undefined || req.body.toDate === undefined) {
                  throw new Error("invalid post 2");
              }

              // 요청 본문에서 fromDate와 toDate 값을 equalJson으로 깊은 복사하여 가져옵니다.
              ({ fromDate, toDate } = equalJson(req.body));

              // 시작 날짜와 종료 날짜를 자정으로 설정합니다.
              fromDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate(), 0, 0, 0);
              fromDateCopied = new Date(JSON.stringify(fromDate).slice(1, -1));
              toDate = new Date(toDate.getFullYear(), toDate.getMonth(), toDate.getDate(), 0, 0, 0);
              toDate.setDate(toDate.getDate() + 1);  // 종료 날짜는 하루 더해줍니다.

              // 주어진 날짜 범위 내에서 클라이언트 데이터를 필터링합니다.
              motherClients = (await back.getClientsByQuery({
                  $and: [
                      {
                          requests: {
                              $elemMatch: {
                                  "request.timeline": { $gte: fromDate }
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
              }, { selfMongo, withTools: true })).getRequestsTong().map((arr) => { 
                  let o = arr[0].toNormal();  // 클라이언트 요청 데이터를 일반 객체로 변환합니다.
                  o.cliid = arr.cliid;  // 클라이언트 ID를 추가합니다.
                  o.analytics = arr[1].toNormal();  // 분석 데이터를 일반 객체로 변환합니다.
                  return o;
              });

              // 클라이언트 히스토리 데이터를 가져옵니다.
              motherClientHistories = await back.mongoPick("clientHistory", [ {
                  $or: motherClients.map((o) => { return { cliid: o.cliid } }),
              }, { cliid: 1, manager: 1, curation: 1 } ], { selfMongo: selfLocalMongo });

              // 프로젝트 데이터를 가져옵니다.
              motherProjects_raw = (await back.getProjectsByQuery({
                  $or: motherClients.map((o) => { return { cliid: o.cliid } }).concat([
                      {
                          "process.contract.first.date": { $gte: fromDate }
                      }
                  ]),
              }, { selfMongo })).toNormal();

              // 프로젝트 중 계약 날짜가 2000년 이후인 데이터만 필터링합니다.
              motherProjects = motherProjects_raw.filter((obj) => {  
                  return obj.process.contract.first.date.valueOf() >= (new Date(2000, 0, 1)).valueOf(); 
              });

              // 날짜 매트릭스를 생성합니다.
              matrix = [];
              while (fromDateCopied.valueOf() < toDate.valueOf()) {
                  tomorrow = new Date(JSON.stringify(fromDateCopied).slice(1, -1));
                  tomorrow.setDate(tomorrow.getDate() + 1);  // 다음 날로 설정
                  matrix.push([
                      new Date(JSON.stringify(fromDateCopied).slice(1, -1)),  // 시작 날짜
                      tomorrow,  // 종료 날짜
                  ]);
                  fromDateCopied.setDate(fromDateCopied.getDate() + 1);  // 날짜를 하루씩 더합니다.
              }

              // 최종 데이터를 저장할 rows 배열을 초기화합니다.
              rows = [];

              // 날짜 매트릭스를 순회하며 각 날짜에 대한 데이터를 처리합니다.
              for (let [ fromDate, toDate ] of matrix) {
                  obj = { fromDate, toDate };  // 결과 객체에 시작일과 종료일을 추가합니다.

                  // 클라이언트 데이터를 필터링하여 obj에 클라이언트 수를 추가합니다.
                  clients = motherClients.filter((obj) => { return obj.timeline.valueOf() >= fromDate && obj.timeline.valueOf() < toDate });
                  obj.client = clients.length;

                  // 추천 데이터를 필터링하여 obj에 추천 수를 추가합니다.
                  histories = motherClientHistories.map((obj) => { 
                      return obj.curation.analytics.send.filter((o) => { 
                          return /designerProposal/gi.test(o.page) && (o.date.valueOf() >= fromDate && o.date.valueOf() < toDate); 
                      });
                  }).flat();
                  obj.recommend = histories.length;

                  // 계약 데이터를 필터링하여 obj에 계약 수를 추가합니다.
                  contracts = motherProjects.filter((obj) => { 
                      return obj.process.contract.first.date.valueOf() >= fromDate && obj.process.contract.first.date.valueOf() < toDate; 
                  });
                  obj.contract = contracts.length;

                  // 처리된 데이터를 rows 배열에 추가합니다.
                  rows.push(obj);
              }

              // 최종 데이터를 JSON 형식으로 응답합니다.
              res.send(JSON.stringify(rows));

          } else {
              throw new Error("invalid mode");
          }

      } catch (e) {
          // 에러가 발생한 경우 에러 로그를 기록하고, 클라이언트에게 에러 메시지를 응답합니다.
          logger.error(e, req).catch((e) => { console.log(e); });
          res.set("Content-Type", "application/json");
          res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /getProjectReport
     * @description 프로젝트 보고서를 생성하여 반환하는 라우터입니다. 서비스 모드와 디자이너 모드를 지원하며, 시작 날짜와 종료 날짜를 기준으로 데이터를 필터링하여 클라이언트 및 프로젝트 정보를 반환합니다.
     * @param {object} req - 클라이언트 요청 객체. 본문에는 보고서 모드(mode), 시작 날짜(start), 종료 날짜(end)가 포함됩니다.
     * @param {object} res - 서버 응답 객체. 생성된 프로젝트 보고서 데이터를 JSON 형식으로 반환합니다.
     */
    router.post([ "/getProjectReport" ], async function (req, res) {
      // 응답 헤더에 JSON 형식으로 설정합니다.
      res.set("Content-Type", "application/json");

      try {
          // 요청 본문에서 mode, start, end 값을 equalJson으로 깊은 복사하여 가져옵니다.
          const { mode, start, end } = equalJson(req.body);

          let clients, clients2;
          let projects, projects2;
          let serviceArr;  // 서비스 배열
          let designers;
          let designerArr;
          let tempClient;  // 임시 클라이언트 객체
          let requestNumber;  // 요청 번호

          /**
           * @description 서비스 모드일 경우 프로젝트 및 클라이언트 데이터를 필터링하여 서비스별 데이터를 반환합니다.
           * 프로젝트 데이터는 계약 날짜와 디자이너 ID를 기준으로 필터링됩니다.
           */
          if (mode === "service") {

              // 서비스 배열을 초기화합니다. 4개의 서비스로 구분됩니다.
              serviceArr = new Array(4);

              // 프로젝트 데이터를 필터링하여 가져옵니다.
              projects = await back.getProjectsByQuery({
                  $and: [
                      {
                          // 계약 시작일이 요청된 시작 날짜 이후인 프로젝트
                          "process.contract.first.date": { $gte: start }
                      },
                      {
                          // 계약 시작일이 요청된 종료 날짜 이전인 프로젝트
                          "process.contract.first.date": { $lt: end }
                      },
                      {
                          // 디자이너 ID가 "d"로 시작하는 프로젝트만 필터링
                          "desid": { $regex: "^d" }
                      }
                  ]
              }, { selfMongo: instance.mongo });

              // 필터링된 프로젝트에 해당하는 클라이언트를 가져옵니다.
              clients = await back.getClientsByQuery({
                  $or: [
                      ...projects.toNormal().map((obj) => { return { cliid: obj.cliid } }),
                  ]
              }, { selfMongo: instance.mongo });

              // 각 서비스 유형에 맞게 프로젝트 데이터를 필터링하여 저장합니다.
              serviceArr[0] = projects.filter((obj) => { return /1/gi.test(obj.service.serid.split('_')[1]) }).map((obj) => { return { proid: obj.proid, cliid: obj.cliid } });
              serviceArr[1] = projects.filter((obj) => { return /2/gi.test(obj.service.serid.split('_')[1]) }).map((obj) => { return { proid: obj.proid, cliid: obj.cliid } });
              serviceArr[2] = projects.filter((obj) => { return /3/gi.test(obj.service.serid.split('_')[1]) }).map((obj) => { return { proid: obj.proid, cliid: obj.cliid } });
              serviceArr[3] = projects.filter((obj) => { return /4/gi.test(obj.service.serid.split('_')[1]) }).map((obj) => { return { proid: obj.proid, cliid: obj.cliid } });

              // 각 서비스 배열의 클라이언트 이름을 가져와서 객체에 추가합니다.
              for (let arr of serviceArr) {
                  for (let obj of arr) {
                      obj.name = clients.toNormal().find((c) => { return c.cliid === obj.cliid }).name;
                  }
              }

              // 결과 데이터를 JSON 형식으로 반환합니다.
              res.send(JSON.stringify({ start, end, numbers: { client: clients.length, project: projects.length }, serviceArr }));

          /**
           * @description 디자이너 모드일 경우 디자이너와 프로젝트 데이터를 필터링하여 각 디자이너별로 보고서를 생성합니다.
           */
          } else if (mode === "designer") {

              // 디자이너 데이터를 가져옵니다.
              designers = await back.getDesignersByQuery({}, { selfMongo: instance.mongo });

              // 프로젝트 데이터를 가져옵니다.
              projects = await back.getProjectsByQuery({}, { selfMongo: instance.mongo });

              // 프로젝트 데이터가 없을 경우 클라이언트 데이터를 빈 배열로 설정합니다.
              if (projects.length === 0) {
                  clients = [];
              } else {
                  // 프로젝트에 해당하는 클라이언트를 가져옵니다.
                  clients = (await back.getClientsByQuery({
                      $or: projects.toNormal().map((p) => { return { cliid: p.cliid } })
                  })).toNormal();
              }

              // 각 프로젝트에 대해 클라이언트 데이터를 매칭하고 요청 번호를 계산합니다.
              for (let p of projects) {
                  tempClient = clients.find((c) => { return p.cliid === c.cliid });
                  if (tempClient === undefined) {
                      tempClient = await back.getClientById(p.cliid, { selfMongo: instance.mongo, toNormal: true });
                  }
                  requestNumber = 0;
                  for (let i = 0; i < tempClient.requests.length; i++) {
                      if (tempClient.requests[i].request.timeline.valueOf() < p.proposal.date.valueOf()) {
                          requestNumber = i;
                          break;
                      }
                  }
                  p.name = tempClient.name;
                  p.pyeong = tempClient.requests[requestNumber].request.space.pyeong;
              }

              // 디자이너 배열을 생성하여 각 디자이너에 대한 프로젝트 데이터를 매칭합니다.
              designerArr = designers.toNormal().map((obj) => { return { desid: obj.desid, designer: obj.designer } });
              for (let obj of designerArr) {

                  // 제안서 데이터를 필터링하여 디자이너의 제안서 정보를 추가합니다.
                  obj.proposal = projects.filter((p) => {
                      return (p.proposal.detail.findIndex((z) => { return z.desid === obj.desid }) !== -1 && p.proposal.date.valueOf() >= start.valueOf() && p.proposal.date.valueOf() < end.valueOf());
                  }).map((p) => {
                      const thisProposal = p.proposal.detail.find((d) => { return d.desid === obj.desid });
                      let amount, thisFee;
                      if (thisProposal === undefined) {
                          amount = 0;
                      } else {
                          thisFee = thisProposal.fee.toNormal().findIndex((k) => { return k.method === (p.service.online ? "online" : "offline"); });
                          if (thisFee !== -1) {
                              amount = thisProposal.fee.toNormal()[thisFee].amount;
                          } else {
                              amount = 0;
                          }
                      }
                      return { proid: p.proid, status: (p.desid !== '' ? p.process.status.value : "드랍"), service: serviceParsing(p.service.toNormal()), date: p.proposal.date, name: p.name, pyeong: p.pyeong, amount, per: Math.floor((amount / p.pyeong) / 1000) * 1000 };
                  });

                  // 프로세스 데이터를 필터링하여 디자이너의 진행 상태 정보를 추가합니다.
                  obj.process = projects.filter((p) => {
                      return (p.desid === obj.desid && p.process.contract.first.date.valueOf() >= start.valueOf() && p.process.contract.first.date.valueOf() < end.valueOf());
                  }).map((p) => {
                      const thisProposal = p.proposal.detail.find((d) => { return d.desid === obj.desid });
                      let amount, thisFee;
                      if (thisProposal === undefined) {
                          amount = 0;
                      } else {
                          thisFee = thisProposal.fee.toNormal().findIndex((k) => { return k.method === (p.service.online ? "online" : "offline"); });
                          if (thisFee !== -1) {
                              amount = thisProposal.fee.toNormal()[thisFee].amount;
                          } else {
                              amount = 0;
                          }
                      }
                      return { proid: p.proid, status: p.process.status.value, service: serviceParsing(p.service.toNormal()), date: p.process.contract.first.date, name: p.name, pyeong: p.pyeong, amount, per: Math.floor((amount / p.pyeong) / 1000) * 1000 };
                  });

                  // 계산된 금액을 필터링하여 첫 번째 결제 정보를 추가합니다.
                  obj.first = projects.filter((p) => {
                      return (p.desid === obj.desid && p.process.calculation.payments.first.date.valueOf() >= start.valueOf() && p.process.calculation.payments.first.date.valueOf() < end.valueOf());
                  }).map((p) => {
                      return { proid: p.proid, service: serviceParsing(p.service.toNormal()), date: p.process.calculation.payments.first.date, name: p.name, pyeong: p.pyeong, amount: p.process.calculation.payments.first.amount - p.process.calculation.payments.first.refund };
                  });

                  // 계산된 금액을 필터링하여 남은 결제 정보를 추가합니다.
                  obj.remain = projects.filter((p) => {
                      return (p.desid === obj.desid && p.process.calculation.payments.remain.date.valueOf() >= start.valueOf() && p.process.calculation.payments.remain.date.valueOf() < end.valueOf());
                  }).map((p) => {
                      return { proid: p.proid, service: serviceParsing(p.service.toNormal()), date: p.process.calculation.payments.remain.date, name: p.name, pyeong: p.pyeong, amount: p.process.calculation.payments.remain.amount - p.process.calculation.payments.remain.refund };
                  });

              }

              // 결과 데이터를 JSON 형식으로 반환합니다.
              res.send(JSON.stringify({ start, end, designers: designerArr }));

          } else {
              throw new Error("invalid mode");  // 유효하지 않은 모드일 경우 에러를 발생시킵니다.
          }

      } catch (e) {
          // 에러가 발생한 경우 에러 로그를 기록하고 클라이언트에게 에러 메시지를 반환합니다.
          logger.error(e, req).catch((e) => { console.log(e); });
          res.set("Content-Type", "application/json");
          res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /getAspirants
     * @description 지원자 데이터를 조회하는 라우터입니다.
     * @param {object} req - 클라이언트 요청 객체.
     * @param {object} req.body - 요청 본문 데이터.
     * @param {object} req.body.whereQuery - 지원자 데이터를 필터링할 쿼리 객체.
     * @param {object} res - 서버 응답 객체.
     */
    router.post([ "/getAspirants" ], async function (req, res) {
      // 응답 헤더의 Content-Type을 JSON으로 설정
      res.set("Content-Type", "application/json");

      try {
        // whereQuery가 요청 본문에 없으면 에러 발생
        if (req.body.whereQuery === undefined) {
          throw new Error("invalid post"); // 요청 데이터가 유효하지 않다는 에러를 던짐
        }

        // 요청 본문에서 whereQuery 추출 및 equalJson으로 깊은 복사 및 JSON 파싱
        const { whereQuery } = equalJson(req.body);

        // 지원자 데이터를 저장할 변수
        let rows;

        // 지원자 데이터를 조회하는 경우, getAspirantsByQuery 메서드를 사용하여 MongoDB에서 데이터를 조회
        if (req.url === "/getAspirants") {
          rows = await back.getAspirantsByQuery(whereQuery, { selfMongo: instance.mongo });
        }

        // 조회된 지원자 데이터를 toNormal 메서드를 통해 평탄화한 후 JSON 형식으로 응답
        res.send(JSON.stringify(rows.toNormal()));

      } catch (e) {
        // 에러 발생 시 에러를 로깅하고 에러 메시지를 JSON 형식으로 응답
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json"); // 응답의 Content-Type을 JSON으로 설정
        res.send(JSON.stringify({ error: e.message })); // 에러 메시지를 JSON 형식으로 반환
      }
    });
    
    /**
     * @route POST /getDesignerReport
     * @description 특정 디자이너에 대한 프로젝트, 클라이언트, 콘텐츠, 가격 정보를 반환하는 라우터입니다.
     * @param {object} req - 클라이언트 요청 객체. 본문에는 desid(디자이너 ID)가 포함되어야 합니다.
     * @param {object} res - 서버 응답 객체. 프로젝트, 클라이언트, 콘텐츠 배열, 가격 정보를 JSON 형식으로 반환합니다.
     */
    router.post([ "/getDesignerReport" ], async function (req, res) {
      try {
          // 요청 본문에 desid(디자이너 ID)가 없는 경우 에러를 발생시킵니다.
          if (req.body.desid === undefined) {
              throw new Error("must be desid");
          }

          // 요청 본문에서 desid(디자이너 ID)를 추출합니다.
          const { desid } = req.body;

          // MongoDB 인스턴스를 가져옵니다.
          const selfMongo = instance.mongo;
          
          // 프로젝트 데이터를 저장할 변수를 초기화합니다.
          let projects;

          // 쿼리 객체를 정의하여 desid를 기준으로 프로젝트 데이터를 필터링합니다.
          let whereQuery;

          // 클라이언트 ID 배열을 저장할 변수를 정의합니다.
          let cliidArr_raw, cliidArr;

          // 클라이언트 데이터를 저장할 변수를 정의합니다.
          let clients;

          // 클라이언트 요청 데이터와 플래그 변수를 정의합니다.
          let requests, boo;

          // 콘텐츠 데이터를 저장할 배열을 정의합니다.
          let contentsArr;

          // 가격 데이터를 저장할 변수를 정의합니다.
          let price;

          // 응답 헤더에 JSON 형식으로 설정합니다.
          res.set("Content-Type", "application/json");

          /**
           * @description desid를 기준으로 프로젝트 데이터를 조회하는 쿼리입니다. desid가 포함된 프로젝트 또는 제안서의 세부 사항에서 desid를 포함하는 프로젝트를 조회합니다.
           */
          whereQuery = {
              $or: [
                  { desid },  // 디자이너 ID가 프로젝트의 desid와 일치하는 경우
                  { "proposal.detail": { $elemMatch: { desid } } }  // 제안서 세부 사항에서 desid가 일치하는 경우
              ]
          };

          // 쿼리를 사용하여 프로젝트 데이터를 MongoDB에서 가져옵니다.
          projects = await back.getProjectsByQuery(whereQuery, { selfMongo });

          // 프로젝트가 존재하는 경우 클라이언트 데이터를 처리합니다.
          if (projects.length > 0) {

              // 프로젝트 데이터를 순회하며 클라이언트 ID 배열을 생성합니다.
              cliidArr_raw = [];
              for (let p of projects) {
                  cliidArr_raw.push(p.cliid);
              }

              // 클라이언트 ID 배열에서 중복을 제거하고 배열 형태로 변환합니다.
              cliidArr_raw = Array.from(new Set(cliidArr_raw));
              cliidArr = cliidArr_raw.map((c) => { return { cliid: c }; });

              // 클라이언트 데이터를 가져오기 위한 whereQuery를 설정합니다.
              whereQuery = { $or: [] };
              for (let obj of cliidArr) {
                  whereQuery["$or"].push(obj);
              }

              // 쿼리를 사용하여 클라이언트 데이터를 MongoDB에서 가져옵니다.
              clients = (await back.getClientsByQuery(whereQuery, { selfMongo })).toNormal();

              // 각 프로젝트에 대해 클라이언트 데이터를 매칭합니다.
              for (let project of projects) {
                  for (let client of clients) {
                      if (project.cliid === client.cliid) {
                          project.name = client.name;  // 클라이언트 이름을 프로젝트에 추가
                          requests = client.requests;  // 클라이언트 요청 데이터를 가져옵니다.
                          boo = false;

                          // 클라이언트 요청 데이터를 순회하여 프로젝트 제안서 날짜 이전의 데이터를 찾습니다.
                          for (let { request } of requests) {
                              if (request.timeline.valueOf() <= project.proposal.date.valueOf()) {
                                  boo = true;
                                  project.pyeong = request.space.pyeong;  // 프로젝트 평수 데이터를 추가합니다.
                              }
                          }

                          // 제안서 이전의 데이터가 없는 경우 첫 번째 요청 데이터를 사용합니다.
                          if (!boo) {
                              project.pyeong = requests[0].request.space.pyeong;
                          }
                      }
                  }
              }

          } else {
              // 프로젝트가 없는 경우 빈 클라이언트 배열을 설정합니다.
              clients = [];
          }

          // 디자이너 ID에 해당하는 콘텐츠 데이터를 가져옵니다.
          contentsArr = await back.getContentsArrByQuery({ desid }, { selfMongo });

          // 콘텐츠 데이터를 순회하며 클라이언트 이름을 추가합니다.
          for (let c of contentsArr) {
              for (let client of clients) {
                  if (c.cliid === client.cliid) {
                      c.name = client.name;
                  }
              }
          }

          // 디자이너 가격 데이터를 MongoDB에서 읽어옵니다.
          price = await back.mongoRead("designerPrice", {}, { selfMongo: instance.mongolocal });

          // 프로젝트, 클라이언트, 콘텐츠, 가격 데이터를 JSON 형식으로 응답합니다.
          res.send(JSON.stringify({ projects, clients, contentsArr, price }));

      } catch (e) {
          // 에러가 발생한 경우 에러 로그를 기록하고 클라이언트에게 에러 메시지를 반환합니다.
          logger.error(e, req).catch((e) => { console.log(e); });
          res.set("Content-Type", "application/json");
          res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /getClientHistory, /getProjectHistory, /getHistoryProperty, /getHistoryTotal, /getClientsImportant, /getProjectsImportant, /getClientsManager, /getProjectsManager, /getClientsIssue, /getProjectsIssue
     * @description 클라이언트 및 프로젝트 히스토리 데이터를 처리하고 반환하는 라우터입니다. 요청 URL에 따라 각기 다른 히스토리 데이터를 반환합니다.
     * @param {object} req - 클라이언트 요청 객체. 본문에는 ID, rawMode, idArr 등의 데이터가 포함될 수 있습니다.
     * @param {object} res - 서버 응답 객체. 히스토리 데이터를 JSON 형식으로 반환합니다.
     */
    router.post([
      "/getClientHistory", "/getProjectHistory", "/getHistoryProperty", "/getHistoryTotal", 
      "/getClientsImportant", "/getProjectsImportant", "/getClientsManager", 
      "/getProjectsManager", "/getClientsIssue", "/getProjectsIssue"
    ], async function (req, res) {
        // 응답 헤더에 JSON 형식과 CORS 설정을 추가합니다.
        res.set({
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
            "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
        });

        try {
            // 히스토리 객체와 응답 배열을 초기화합니다.
            let historyObj, responseArr;
            let resultObj;
            let method;
            let temp, tempArr;

            responseArr = [];

            /**
             * @description 요청 URL이 "/getClientHistory"일 경우, 클라이언트 히스토리 데이터를 처리합니다.
             * 클라이언트 히스토리가 없을 경우 새로 생성한 후 데이터를 반환합니다.
             */
            if (req.url === "/getClientHistory") {
                // 클라이언트 히스토리 데이터를 가져옵니다.
                historyObj = await back.getHistoryById("client", req.body.id, { selfMongo: instance.mongolocal });

                // 클라이언트 히스토리가 없을 경우 새로 생성합니다.
                if (historyObj === null) {
                    await back.createHistory("client", { cliid: req.body.id }, { selfMongo: instance.mongolocal, secondMongo: instance.mongo });
                    historyObj = await back.getHistoryById("client", req.body.id, { selfMongo: instance.mongolocal });
                }

                // 각 히스토리 필드를 배열에 추가합니다.
                responseArr.push((historyObj.history === undefined ? '' : historyObj.history.replace(/\=/g, '').replace(/\&/g, ",")));
                responseArr.push((historyObj.space === undefined ? '' : historyObj.space.replace(/\=/g, '').replace(/\&/g, ",")));
                responseArr.push((historyObj.styling === undefined ? '' : historyObj.styling.replace(/\=/g, '').replace(/\&/g, ",")));
                responseArr.push((historyObj.construct === undefined ? '' : historyObj.construct.replace(/\=/g, '').replace(/\&/g, ",")));
                responseArr.push((historyObj.budget === undefined ? '' : historyObj.budget.replace(/\=/g, '').replace(/\&/g, ",")));
                responseArr.push((historyObj.progress === undefined ? '' : historyObj.progress.replace(/\=/g, '').replace(/\&/g, ",")));

                // rawMode가 설정된 경우 전체 히스토리 객체를 반환합니다.
                if (req.body.rawMode !== undefined) {
                    responseArr = historyObj;
                }

            /**
             * @description 요청 URL이 "/getProjectHistory"일 경우, 프로젝트 히스토리 데이터를 처리합니다.
             * 프로젝트 히스토리가 없을 경우 새로 생성한 후 데이터를 반환합니다.
             */
            } else if (req.url === "/getProjectHistory") {
                // 프로젝트 히스토리 데이터를 가져옵니다.
                historyObj = await back.getHistoryById("project", req.body.id, { selfMongo: instance.mongolocal });

                // 프로젝트 히스토리가 없을 경우 새로 생성합니다.
                if (historyObj === null) {
                    await back.createHistory("project", { proid: req.body.id }, { selfMongo: instance.mongolocal, secondMongo: instance.mongo });
                    historyObj = await back.getHistoryById("project", req.body.id, { selfMongo: instance.mongolocal });
                }

                // 각 히스토리 필드를 배열에 추가합니다.
                responseArr.push((historyObj.history === undefined ? '' : historyObj.history.replace(/\=/g, '').replace(/\&/g, ",")));
                responseArr.push((historyObj.designer === undefined ? '' : historyObj.designer.replace(/\=/g, '').replace(/\&/g, ",")));
                responseArr.push((historyObj.client === undefined ? '' : historyObj.client.replace(/\=/g, '').replace(/\&/g, ",")));
                responseArr.push((historyObj.photo === undefined ? '' : historyObj.photo.replace(/\=/g, '').replace(/\&/g, ",")));

                // rawMode가 설정된 경우 전체 히스토리 객체를 반환합니다.
                if (req.body.rawMode !== undefined) {
                    responseArr = historyObj;
                }

            /**
             * @description 요청 URL이 "/getHistoryProperty"일 경우, 지정된 속성(property)에 대한 히스토리 데이터를 가져옵니다.
             */
            } else if (req.url === "/getHistoryProperty") {
                // 요청된 ID 배열이 비어 있지 않은 경우 히스토리 데이터를 가져옵니다.
                if (equalJson(req.body.idArr).length > 0) {
                    const { method, property, idArr } = equalJson(req.body);
                    responseArr = await back.getHistoryProperty(method, property, idArr, { selfMongo: instance.mongolocal });
                } else {
                    responseArr = [];
                }

            /**
             * @description 요청 URL이 "/getHistoryTotal"일 경우, 모든 속성("$all")에 대한 히스토리 데이터를 가져옵니다.
             */
            } else if (req.url === "/getHistoryTotal") {
                // 요청된 ID 배열이 비어 있지 않은 경우 히스토리 데이터를 가져옵니다.
                if (equalJson(req.body.idArr).length > 0) {
                    const { method, idArr } = equalJson(req.body);
                    responseArr = await back.getHistoryProperty(method, "$all", idArr, { selfMongo: instance.mongolocal });
                } else {
                    responseArr = [];
                }
            }

            // 응답 배열이 null인 경우 빈 배열로 설정합니다.
            if (responseArr === null) {
                responseArr = [];
            }

            // 최종 결과를 JSON 형식으로 응답합니다.
            res.send(JSON.stringify(responseArr));

        } catch (e) {
            // 에러가 발생한 경우 에러 로그를 기록하고, 클라이언트에게 에러 메시지를 응답합니다.
            logger.error(e, req).catch((e) => { console.log(e); });
            res.set("Content-Type", "application/json");
            res.send(JSON.stringify({ error: e.message }));
        }
    });
    
    /**
     * @route POST /updateHistory, /updateClientHistory, /updateProjectHistory, /updateDesignerHistory
     * @description 클라이언트, 프로젝트, 디자이너의 히스토리 데이터를 업데이트하는 라우터입니다. 요청된 데이터에 따라 히스토리를 생성하거나 업데이트합니다.
     * @param {object} req - 클라이언트 요청 객체. 본문에는 id, column, value, email, send 등의 데이터가 포함됩니다.
     * @param {object} res - 서버 응답 객체. 성공 여부를 JSON 형식으로 반환합니다.
     */
    router.post([
      "/updateHistory", "/updateClientHistory", "/updateProjectHistory", "/updateDesignerHistory"
    ], async function (req, res) {
        // 응답 헤더에 JSON 형식과 CORS 설정을 추가합니다.
        res.set({
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
            "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
        });

        // 백엔드 로직 및 멤버 정보를 인스턴스에서 가져옵니다.
        const back = instance.back;
        const members = instance.members;

        try {
            // 현재 날짜를 가져옵니다.
            const today = new Date();

            // newMode가 정의되지 않았거나 0일 경우 기본 모드로 처리합니다.
            if (req.body.newMode === undefined || req.body.newMode === null || req.body.newMode === 0) {
                // 요청 본문에서 id, column, value, email을 equalJson으로 깊은 복사하여 가져옵니다.
                const { id, column, value, email } = equalJson(req.body);

                // 관리자 관련 상호작용 정보를 설정합니다.
                const managerInteraction = {
                    designer: {
                        to: "project",
                        toId: "proid",
                        method: "getProjectsByQuery",
                        whereQuery: { desid: id }
                    },
                };

                let historyObj;
                let whereQuery, updateQuery;
                let thisPerson;
                let method, standard;
                let managerArr;
                let managerIdArr;
                let managerToObj;
                let managerTargetArr;
                let page, query, dummy;

                // 멤버 이메일을 기반으로 현재 사용자의 이름을 찾습니다.
                thisPerson = null;
                if (email !== null) {
                    for (let member of members) {
                        if (member.email.includes(email)) {
                            thisPerson = member.name;
                            break;
                        }
                    }
                }

                // whereQuery 및 updateQuery 객체를 초기화합니다.
                whereQuery = {};
                updateQuery = {};

                // 요청 URL을 기반으로 method 값을 설정합니다.
                if (/Client/gi.test(req.url)) {
                    method = "client";
                } else if (/Project/gi.test(req.url)) {
                    method = "project";
                } else if (/Designer/gi.test(req.url)) {
                    method = "designer";
                } else {
                    if (req.body.method === undefined) {
                        throw new Error("invalid method");
                    } else {
                        method = req.body.method;
                    }
                }

                // method 값에 따라 표준 필드 이름(클라이언트 ID, 프로젝트 ID, 디자이너 ID 등)을 설정합니다.
                if (/client/gi.test(method)) {
                    standard = "cliid";
                } else if (/project/gi.test(method)) {
                    standard = "proid";
                } else if (/designer/gi.test(method)) {
                    standard = "desid";
                } else {
                    throw new Error("invalid method");
                }

                // 히스토리 데이터를 가져옵니다.
                historyObj = await back.getHistoryById(method, id, { selfMongo: instance.mongolocal });

                // 히스토리가 없는 경우 새로 생성합니다.
                if (historyObj === null) {
                    updateQuery = {};
                    updateQuery[standard] = id;

                    // important 열(column)의 값이 숫자인 경우 불리언으로 변환합니다.
                    if (column === "important") {
                        updateQuery[column] = (Number(value) === 1);
                    } else {
                        // 값이 true 또는 false 문자열인 경우 불리언으로 변환하고, 그 외에는 그대로 값을 설정합니다.
                        if (value === "true" || value === "false") {
                            updateQuery[column] = (value === "true");
                        } else {
                            updateQuery[column] = value;
                        }
                    }

                    // 새로운 히스토리 데이터를 생성합니다.
                    await back.createHistory(method, updateQuery, { selfMongo: instance.mongolocal, secondMongo: instance.mongo });

                    // 생성된 히스토리 데이터를 다시 가져옵니다.
                    historyObj = await back.getHistoryById(method, id, { selfMongo: instance.mongolocal });
                } else {
                    // whereQuery에 표준 필드를 설정합니다.
                    whereQuery[standard] = id;
                    updateQuery = {};

                    // important 열(column)의 값이 숫자인 경우 불리언으로 변환합니다.
                    if (column === "important") {
                        updateQuery[column] = (Number(value) === 1);
                    } else {
                        if (value === "true" || value === "false") {
                            updateQuery[column] = (value === "true");
                        } else {
                            updateQuery[column] = value;
                        }
                    }

                    // 업데이트할 내용이 있는 경우 히스토리 데이터를 업데이트합니다.
                    if (Object.keys(updateQuery).length > 0) {
                        await back.updateHistory(method, [ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });
                    }
                }

                // 관리자를 업데이트하는 경우 관련 프로젝트의 관리자를 업데이트합니다.
                if (column === "manager") {
                    if (managerInteraction[method] !== undefined) {
                        // 관련된 프로젝트 데이터를 가져옵니다.
                        managerArr = await back[managerInteraction[method].method](managerInteraction[method].whereQuery, { selfMongo: instance.mongo });
                        managerIdArr = managerArr.map(obj => obj[managerInteraction[method].toId]);

                        // 관련된 프로젝트의 관리자가 없는 경우 "manager" 필드를 업데이트합니다.
                        if (managerIdArr.length !== 0) {
                            managerToObj = await back.getHistoryProperty(managerInteraction[method].to, "manager", managerIdArr, { selfMongo: instance.mongolocal });
                            managerTargetArr = Object.entries(managerToObj).filter(([_, manager]) => manager === '' || manager === '-' || manager === "홀딩");

                            for (let [id] of managerTargetArr) {
                                whereQuery = {};
                                whereQuery[managerInteraction[method].toId] = id;
                                await back.updateHistory(managerInteraction[method].to, [whereQuery, { manager: value }], { selfMongo: instance.mongolocal });
                            }
                        }
                    }
                }

                // 요청에 "send"가 포함된 경우 클라이언트 히스토리의 curation 데이터를 업데이트합니다.
                if (typeof req.body.send === "string" && /Client/gi.test(req.url)) {
                    page = req.body.send.split('_')[0];
                    query = req.body.send.split('_').length > 1 ? req.body.send.split('_')[1] : null;

                    dummy = {
                        page,
                        date: new Date(),
                        mode: query,
                        who: {
                            name: null,
                            email: null,
                        }
                    };

                    if (Array.isArray(historyObj.curation.analytics.send)) {
                        historyObj.curation.analytics.send.push(dummy);
                    } else {
                        historyObj.curation.analytics.send = [dummy];
                    }

                    await back.updateHistory("client", [{ cliid: id }, { "curation.analytics.send": historyObj.curation.analytics.send }], { selfMongo: instance.mongolocal });
                }

            // newMode가 1인 경우 확장된 업데이트 로직을 처리합니다.
            } else {
                const { id, updateQuery, coreQuery } = equalJson(req.body);
                let historyObj;
                let method, standard;
                let createQuery;
                let whereQuery;
                let collection;

                // 요청 URL을 기반으로 method와 collection을 설정합니다.
                if (/Client/gi.test(req.url)) {
                    method = "client";
                    standard = "cliid";
                    collection = "client";
                } else if (/Project/gi.test(req.url)) {
                    method = "project";
                    standard = "proid";
                    collection = "project";
                } else if (/Designer/gi.test(req.url)) {
                    method = "designer";
                    standard = "desid";
                    collection = "designer";
                } else {
                    throw new Error("invalid method");
                }

                // whereQuery에 표준 필드를 설정합니다.
                whereQuery = {};
                whereQuery[standard] = id;

                // 히스토리 데이터를 가져옵니다.
                historyObj = await back.getHistoryById(method, id, { selfMongo: instance.mongolocal });

                // 히스토리가 없는 경우 새로 생성합니다.
                if (historyObj === null) {
                    createQuery = { ...updateQuery };
                    createQuery[standard] = id;
                    await back.createHistory(method, createQuery, { selfMongo: instance.mongolocal, secondMongo: instance.mongo });
                } else {
                    // 업데이트할 내용이 있는 경우 히스토리 데이터를 업데이트합니다.
                    if (Object.keys(updateQuery).length > 0) {
                        await back.updateHistory(method, [ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });
                    }
                }

                // coreQuery가 정의된 경우 MongoDB의 해당 컬렉션에서 데이터를 업데이트합니다.
                if (typeof coreQuery === "object" && coreQuery !== null) {
                    if (Object.keys(coreQuery).length > 0) {
                        await back.mongoUpdate(collection, [whereQuery, coreQuery], { selfMongo: instance.mongo });
                    }
                }
            }

            // 요청이 성공적으로 처리된 경우 응답으로 성공 메시지를 반환합니다.
            res.send(JSON.stringify({ message: "success" }));

        } catch (e) {
            // 에러가 발생한 경우 에러 로그를 기록하고 클라이언트에게 에러 메시지를 반환합니다.
            logger.error(e, req).catch((e) => { console.log(e); });
            res.set("Content-Type", "application/json");
            res.send(JSON.stringify({ error: e.message }));
        }
    });
    
    /**
     * @route POST /getContentsDetail
     * @description 콘텐츠의 세부 정보를 가져오는 라우터입니다.
     * @param {object} req - 클라이언트 요청 객체.
     * @param {object} res - 서버 응답 객체.
     */
    router.post([ "/getContentsDetail" ], async function (req, res) {
      try {
        let contents; // 콘텐츠 데이터를 담을 변수 선언

        // 요청 바디에서 전달된 ID로 콘텐츠 데이터를 가져옴
        contents = await back.getContentsById(req.body.id); 
        const { portfolio, review } = contents.getContentsFlatDetail(); // 콘텐츠의 요약 정보에서 포트폴리오와 리뷰 데이터를 추출

        // 응답의 Content-Type을 JSON으로 설정
        res.set("Content-Type", "application/json");

        // noFlat 값이 정의되지 않은 경우, 요약된 포트폴리오와 리뷰 데이터를 JSON 형식으로 응답
        if (req.body.noFlat === undefined) {
          res.send(JSON.stringify([ portfolio, review ]));
        } else {
          // noFlat 값이 정의된 경우, 상세 포트폴리오, 리뷰, 그리고 추가 데이터를 JSON 형식으로 응답
          res.send(JSON.stringify([ contents.getPortfolioDetail(), contents.getReviewDetail(), contents.getGsArr() ]));
        }
      } catch (e) {
        // 오류가 발생하면 로그에 남기고, 오류 메시지를 클라이언트에게 JSON 형식으로 응답
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /sendSlack
     * @description 이 라우트는 Slack으로 메시지를 전송하는 API를 정의합니다. 
     *              클라이언트로부터 메시지와 채널 정보를 받아 해당 채널로 메시지를 전송합니다.
     *              요청 본문에 필요한 필드가 없을 경우 에러를 발생시킵니다.
     * @param {object} req - 클라이언트 요청 객체
     * @param {object} req.body - 요청 본문에서 메시지와 채널 정보를 포함
     * @param {object} res - 서버 응답 객체
     */
    router.post([ "/sendSlack" ], async function (req, res) {
      
      // 응답 헤더를 설정합니다. JSON 형식의 응답을 설정하고, CORS 설정을 통해 모든 도메인에서의 접근을 허용합니다.
      res.set({
        "Content-Type": "application/json", // 응답 데이터의 형식을 JSON으로 설정
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 정의
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더를 정의
      });

      try {
        // message와 channel이 요청 본문에 없으면 에러를 발생시킵니다.
        if (req.body.message === undefined || req.body.channel === undefined) {
          throw new Error("invalid post"); // 에러 메시지를 출력
        }

        // 요청 본문에서 메시지와 채널 정보를 가져옵니다.
        const { message, channel } = req.body;

        let text; // 메시지를 처리한 후 저장할 변수
        let voiceBoo; // 음성 여부를 처리할 변수
        let ip, rawUserAgent; // 클라이언트의 IP 주소와 UserAgent를 저장할 변수들

        // 클라이언트의 IP 주소를 헤더에서 가져오거나, 없으면 소켓의 원격 주소를 사용합니다.
        ip = String(req.headers["x-forwarded-for"] === undefined ? req.socket.remoteAddress : req.headers["x-forwarded-for"])
          .trim() // 앞뒤 공백 제거
          .replace(/[^0-9\.]/gi, ''); // 숫자와 점 이외의 문자는 제거
        rawUserAgent = req.useragent; // 클라이언트의 UserAgent 정보를 가져옴

        // 메시지 문자열에서 특정 문자를 다른 문자로 대체합니다.
        text = message
          .replace(/__equal__/g, '=') // '__equal__'을 '='로 변경
          .replace(/__amper__/g, '&') // '__amper__'를 '&'로 변경
          .replace(/__query__/g, '?') // '__query__'를 '?'로 변경
          .replace(/__plus__/g, '+'); // '__plus__'를 '+'로 변경

        // 요청 본문에 voice 필드가 있으면 음성 여부를 처리합니다.
        if (req.body.voice !== undefined) {
          if (req.body.voice === null) {
            voiceBoo = false; // voice 값이 null이면 음성 사용 안함
          } else if (req.body.voice === "false") {
            voiceBoo = false; // voice 값이 "false"이면 음성 사용 안함
          } else if (req.body.voice === false) {
            voiceBoo = false; // voice 값이 false(boolean)이면 음성 사용 안함
          } else {
            voiceBoo = true; // 그 외의 경우는 음성 사용
          }
        } else {
          voiceBoo = false; // voice 필드가 없으면 음성 사용 안함
        }

        // 채널이 '#error_log'인 경우 에러 로그를 기록합니다.
        if (channel === "#error_log") {
          await logger.error(
            text + "\n\n" + "ip: " + String(ip) + "\n\n" + JSON.stringify(rawUserAgent, null, 2)
          ); // 에러 메시지에 IP와 UserAgent 정보를 추가하여 에러 로그에 기록
        } else {
          // 메시지를 보냅니다. target 필드가 있으면 equalJson 메서드를 사용하여 target 값을 가져옵니다.
          await messageSend({
            text, // 전송할 메시지 텍스트
            channel, // 전송할 채널
            voice: voiceBoo, // 음성 여부
            target: (req.body.target !== undefined ? equalJson(req.body).target : null), // target이 있으면 equalJson을 사용하여 처리
            fairy: false, // fairy는 false로 설정
          });
        }

        // 성공적으로 처리되었으면 클라이언트에 "success" 메시지를 JSON으로 보냅니다.
        res.send(JSON.stringify({ message: "success" }));

      } catch (e) {
        // 에러 발생 시 에러 로그를 기록하고, 클라이언트에 에러 메시지를 응답합니다.
        logger.error(e, req).catch((e) => {
          console.log(e); // 에러 로그 기록 실패 시 콘솔에 출력
        });

        // 에러 발생 시 Content-Type을 JSON으로 설정하고 에러 메시지를 응답합니다.
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message })); // 에러 메시지를 JSON 형식으로 클라이언트에 전송
      }
    });
    
    /**
     * @route POST /sendSheets
     * @description 클라이언트로부터 스프레드시트 관련 요청을 받아, 구글 스프레드시트에 데이터를 생성하고, 업데이트한 결과를 반환하는 라우터입니다.
     *              비동기 및 동기 방식으로 요청을 처리하며, 여러 시트 작업도 가능합니다.
     * @param {object} req - 클라이언트 요청 객체. 요청 본문에는 sheetName(스프레드시트 이름), parentId(부모 ID), values(업데이트할 데이터)가 포함되어야 합니다.
     * @param {object} res - 서버 응답 객체. 스프레드시트 생성 및 업데이트 결과를 반환합니다.
     */
    router.post([ "/sendSheets" ], async function (req, res) {
      // 응답 헤더에 JSON 타입을 설정합니다.
      res.set("Content-Type", "application/json");

      // instance에서 back, sheets, drive 객체를 가져옵니다. 각각 백엔드 작업, 스프레드시트 작업, 드라이브 접근을 담당합니다.
      const back = instance.back;
      const sheets = instance.sheets;
      const drive = instance.drive;

      // Mother 클래스에서 equalJson, messageSend 메서드를 가져옵니다.
      // equalJson은 깊은 복사 및 Date 객체를 처리할 때 사용하며, messageSend는 슬랙 채널 등에 메시지를 보낼 때 사용합니다.
      const { equalJson, messageSend } = instance.mother;

      /**
       * @function asyncFunc
       * @description 비동기 방식으로 스프레드시트를 생성하고 데이터를 입력한 후 결과를 반환하는 함수입니다.
       * @param {string} sheetName - 생성할 스프레드시트 이름입니다.
       * @param {string} parentId - 스프레드시트의 부모 폴더 ID입니다.
       * @param {object} values - 스프레드시트에 입력할 데이터 값입니다.
       * @param {string} [tapName] - 탭 이름을 변경할 경우 전달됩니다.
       * @returns {string} - 스프레드시트 작업 완료 후의 결과 URL 또는 에러 메시지를 반환합니다.
       */
      const asyncFunc = async (sheetName, parentId, values, tapName) => {
          let sheetsId, result;
          try {
              // Python API를 사용해 새로운 스프레드시트를 생성하고 그 ID를 받습니다.
              sheetsId = await sheets.create_newSheets_inPython(sheetName, parentId);

              // 만약 tapName이 정의되어 있다면 스프레드시트의 기본 탭 이름을 업데이트합니다.
              if (tapName !== undefined) {
                  await sheets.update_defaultSheetName_inPython(sheetsId, tapName);
              }

              // equalJson 메서드를 사용하여 values 객체를 깊은 복사하여 처리합니다.
              // equalJson은 JSON.parse와 달리 Date 객체와 함수 등을 그대로 보존합니다.
              values = equalJson(values);

              // Python API를 통해 스프레드시트에 데이터를 업데이트합니다.
              await sheets.update_value_inPython(sheetsId, (tapName !== undefined ? tapName : ''), values, [0, 0]);

              // 스프레드시트의 뷰를 깨끗하게 초기화합니다.
              await sheets.setting_cleanView_inPython(sheetsId);

              // Python API를 통해 스프레드시트의 웹 뷰 URL을 읽어옵니다.
              result = await drive.read_webView_inPython(sheetsId);

              // 최종적으로 결과 URL을 반환합니다.
              return result;
          } catch (e) {
              // 에러 발생 시 "error" 문자열을 반환합니다.
              result = "error";
              return result;
          }
      };

      try {
          // 필수적인 요청 데이터(sheetName, parentId, values)가 누락되었을 경우 에러를 발생시킵니다.
          if (req.body.sheetName === undefined || req.body.parentId === undefined || req.body.values === undefined) {
              throw new Error("must be sheetName, parentId");
          }

          let sheetsId, response, values, sheetsTargets, tempArr, async;

          // multiple이 undefined인 경우, 단일 스프레드시트 작업으로 간주합니다.
          if (req.body.multiple === undefined) {
              async = false;

              // async가 true로 설정된 경우 비동기 작업을 처리합니다.
              if (req.body.async !== undefined) {
                  async = true;
              }

              if (!async) {
                  // 비동기 작업이 아닌 경우, asyncFunc 함수를 호출하여 동기적으로 스프레드시트 작업을 수행합니다.
                  response = await asyncFunc(req.body.sheetName, req.body.parentId, req.body.values, req.body.tapName);
              } else {
                  // 비동기 작업인 경우, asyncFunc 함수를 호출한 후 결과를 슬랙 메시지로 보냅니다.
                  asyncFunc(req.body.sheetName, req.body.parentId, req.body.values, req.body.tapName).then((link) => {
                      // messageSend 메서드를 사용하여 슬랙 채널로 작업 결과를 보냅니다.
                      return messageSend({ text: req.body.sheetName + " => " + link, channel: (req.body.channel === undefined) ? "#general" : req.body.channel });
                  }).catch((err) => {
                      // 에러가 발생한 경우 콘솔에 에러를 출력합니다.
                      console.log(err);
                  });

                  // 비동기 작업이므로 "will do" 응답을 보냅니다.
                  response = "will do";
              }
          } else {
              // multiple이 설정된 경우 여러 시트 작업을 처리합니다.
              sheetsTargets = JSON.parse(req.body.values);
              sheetsId = "";
              response = "will do";
              tempArr = [];

              // 새로운 스프레드시트를 생성하고 그 ID를 받습니다.
              sheets.create_newSheets_inPython(req.body.sheetName, req.body.parentId).then((id) => {
                  sheetsId = id;

                  // 첫 번째 시트를 제외한 나머지 시트들을 tempArr에 저장합니다.
                  for (let i = 0; i < sheetsTargets.length; i++) {
                      if (i !== 0) {
                          tempArr.push(sheetsTargets[i].sheets);
                      }
                  }

                  // 첫 번째 시트의 이름을 업데이트합니다.
                  return sheets.update_defaultSheetName_inPython(sheetsId, sheetsTargets[0].sheets);
              }).then(() => {
                  // 나머지 시트들을 추가합니다.
                  return sheets.add_newSheet_inPython(sheetsId, tempArr);
              }).then(() => {
                  // 스프레드시트에 데이터를 업데이트합니다.
                  return sheets.update_values_inPython(sheetsId, sheetsTargets, [0, 0]);
              }).then((arr) => {
                  // 뷰를 깨끗하게 초기화합니다.
                  return sheets.setting_cleanView_inPython(sheetsId);
              }).then(() => {
                  // 웹 뷰 URL을 읽어옵니다.
                  return drive.read_webView_inPython(sheetsId);
              }).then((link) => {
                  // messageSend 메서드를 사용하여 슬랙에 작업 결과를 보냅니다.
                  return messageSend({ text: req.body.sheetName + " => " + link, channel: (req.body.channel === undefined) ? "#general" : req.body.channel });
              }).catch((err) => {
                  // 에러가 발생한 경우 콘솔에 에러를 출력합니다.
                  console.log(err);
              });
          }

          // 작업 완료 후 응답을 JSON 형식으로 클라이언트에 보냅니다.
          res.send(JSON.stringify({ link: response }));
      } catch (e) {
          // 에러가 발생한 경우 로그를 남기고 클라이언트에 에러 메시지를 보냅니다.
          logger.error(e, req).catch((e) => { console.log(e); });

          // 응답 헤더에 JSON 타입을 설정합니다.
          res.set("Content-Type", "application/json");

          // 에러 메시지를 클라이언트에 JSON 형식으로 보냅니다.
          res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /createProposalDocument
     * @description 클라이언트로부터 특정 프로젝트(proid)에 대한 제안서 생성 요청을 받아, 제안서를 생성하고 클라이언트에게 링크를 반환하는 라우터입니다.
     *              타이머 설정을 통해 특정 시간에 제안서를 생성할 수 있으며, 즉시 실행 옵션도 제공합니다.
     * @param {object} req - 클라이언트 요청 객체. 요청 본문에는 proid(프로젝트 ID), year, month, date, hour, minute, second 또는 instant(즉시 실행 여부)가 포함됩니다.
     * @param {object} res - 서버 응답 객체. 제안서 생성 후 해당 링크를 반환합니다.
     */
    router.post([ "/createProposalDocument" ], async function (req, res) {
      // 응답의 Content-Type을 JSON으로 설정합니다.
      res.set("Content-Type", "application/json");

      try {
          // 요청 본문에서 proid(프로젝트 ID)를 추출합니다.
          const { proid } = req.body;

          // 제안서 링크를 생성합니다. proid를 기반으로 URL이 만들어집니다.
          const proposalLink = "https://" + address.frontinfo.host + "/proposal.php?proid=" + proid + "&mode=test";

          // proid를 사용해 해당 프로젝트의 정보를 가져옵니다.
          const thisProject = await back.getProjectById(proid, { selfMongo: instance.mongo });

          // 프로젝트에 연결된 클라이언트 ID를 추출합니다.
          const cliid = thisProject.cliid;

          let page, dummy, historyObj;
          let future, now, delta;
          let year, month, date, hour, minute, second;

          // retryProposal이 없는 경우, 제안서의 날짜를 현재 날짜로 업데이트합니다.
          if (req.body.retryProposal === undefined) {
              await back.updateProject([ { proid }, { "proposal.date": new Date() } ], { selfMongo: instance.mongo });
          }

          // 클라이언트의 히스토리 정보를 가져옵니다. 히스토리 데이터가 없으면 생성합니다.
          historyObj = await back.getHistoryById("client", cliid, { selfMongo: instance.mongolocal });
          if (historyObj === null) {
              // 새로운 히스토리를 생성합니다.
              await back.createHistory("client", { cliid }, { selfMongo: instance.mongolocal, secondMongo: instance.mongo });
              historyObj = await back.getHistoryById("client", cliid, { selfMongo: instance.mongolocal });
          }

          // 제안서 관련 기록을 위한 페이지 정보와 더미 데이터를 설정합니다.
          page = "designerProposal";
          dummy = {
              page,
              date: new Date(),
              mode: null,
              who: {
                  name: null,
                  email: null,
              }
          };

          // 히스토리 객체에 새로운 제안서 전송 기록을 추가합니다.
          if (Array.isArray(historyObj.curation.analytics.send)) {
              historyObj.curation.analytics.send.push(dummy);
          } else {
              historyObj.curation.analytics.send = [dummy];
          }

          // 히스토리 정보를 업데이트합니다.
          await back.updateHistory("client", [ { cliid }, { "curation.analytics.send": historyObj.curation.analytics.send } ], { selfMongo: instance.mongolocal });

          // 클라이언트가 요청한 특정 시간(year, month, date, hour, minute, second)이 모두 정의된 경우
          if (req.body.year !== undefined && req.body.month !== undefined && req.body.date !== undefined && req.body.hour !== undefined && req.body.minute !== undefined && req.body.second !== undefined) {
              // 입력된 시간 정보를 Number 형식으로 변환합니다.
              year = Number(req.body.year);
              month = Number(req.body.month);
              date = Number(req.body.date);
              hour = Number(req.body.hour);
              minute = Number(req.body.minute);
              second = Number(req.body.second);

              // 미래의 시간을 설정합니다.
              future = new Date(year, month - 1, date, hour, minute, second);
              now = new Date();
              // 현재 시간과 미래 시간의 차이(delta)를 계산합니다.
              delta = future.valueOf() - now.valueOf();

              // 지정된 시간 후에 스크립트를 실행하도록 타이머를 설정합니다.
              setTimeout(async () => {
                  try {
                      // node 명령어로 웹 제안서 생성 작업을 실행합니다.
                      await shellExec("node", [ `${process.cwd()}/robot.js`, `webProposal`, proid ]);
                  } catch (e) {
                      // 에러 발생 시 콘솔에 에러를 출력합니다.
                      console.log(e);
                  }
              }, delta);
          } else if (req.body.instant !== undefined) {
              // instant가 정의된 경우, 즉시 제안서를 생성하는 작업을 실행합니다.
              shellExec("node", [ `${process.cwd()}/robot.js`, `webProposal`, proid ]).catch((err) => { console.log(err); });
          } else {
              // 유효하지 않은 요청이 들어온 경우 에러를 발생시킵니다.
              throw new Error("invaild post");
          }

          // 제안서 링크를 JSON 형식으로 클라이언트에 응답합니다.
          res.send(JSON.stringify({ link: proposalLink }));
      } catch (e) {
          // 에러 발생 시 에러 로그를 기록하고 클라이언트에 에러 메시지를 응답합니다.
          logger.error(e, req).catch((e) => { console.log(e); });
          res.set("Content-Type", "application/json");
          res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /proposalLog
     * @description 특정 프로젝트(proid)에 대한 제안서 로그를 조회하여 클라이언트에게 반환하는 라우터입니다.
     * @param {object} req - 클라이언트 요청 객체. 요청 본문에는 proid (프로젝트 ID)가 포함되어야 합니다.
     * @param {object} res - 서버 응답 객체. 제안서 로그 데이터를 반환합니다.
     */
    router.post([ "/proposalLog" ], async function (req, res) {
      // 응답 헤더 설정: JSON 형식 응답, CORS 허용
      res.set({
        "Content-Type": "application/json", // 응답 데이터 형식을 JSON으로 설정
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서 접근 허용
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용할 HTTP 메서드 설정
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용할 요청 헤더 설정
      });

      try {
        // 요청 본문에서 proid가 문자열 형식인지 확인, 아니라면 오류 발생
        if (typeof req.body.proid !== "string") {
          throw new Error("invalid post"); // proid가 없거나 잘못된 형식일 경우 에러 발생
        }

        // 요청 본문에서 proid를 추출
        const { proid } = req.body; // 프로젝트 ID를 추출
        const collection = "proposalLog"; // MongoDB의 제안서 로그 컬렉션 이름
        let rows; // MongoDB에서 조회한 데이터를 저장할 배열

        // MongoDB에서 해당 프로젝트 ID(proid)에 대한 로그 데이터를 조회
        rows = await back.mongoRead(collection, { proid }, { selfMongo: instance.mongolocal });

        // 로그 데이터를 날짜 기준으로 내림차순 정렬 (최신 로그가 위로 오도록 정렬)
        rows.sort((a, b) => { return b.date.valueOf() - a.date.valueOf(); });

        // 프로젝트 데이터를 JSON 형태로 클라이언트에 전송 (필요한 데이터만 추출하여 응답)
        res.send(JSON.stringify(rows.map((obj) => { return obj.project })));
      } catch (e) {
        // 오류가 발생했을 경우, 에러 로그를 기록하고 클라이언트에게 오류 메시지를 반환
        logger.error(e, req).catch((e) => { console.log(e); });
        
        // 오류 발생 시 응답 헤더를 JSON 형식으로 다시 설정
        res.set("Content-Type", "application/json");

        // 클라이언트에게 오류 메시지를 JSON 형식으로 전송
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /proposalReset, /proposalCreate
     * @description 클라이언트로부터 프로젝트 제안서 리셋 또는 생성 요청을 받아 처리하는 라우터입니다.
     *              /proposalReset에서는 기존 제안서를 리셋하며, /proposalCreate에서는 클라이언트 또는 프로젝트에 기반한 새로운 제안서를 생성합니다.
     * @param {object} req - 클라이언트 요청 객체. 요청 본문에는 cliid(클라이언트 ID) 또는 proid(프로젝트 ID)가 포함되어야 합니다.
     * @param {object} res - 서버 응답 객체. 작업 완료 메시지를 반환합니다.
     */
    router.post([ "/proposalReset", "/proposalCreate" ], async function (req, res) {
      // instance에서 back, work, address 객체를 가져옵니다. 각각 데이터 처리, 작업 실행, 서버 주소 관리 기능을 담당합니다.
      const back = instance.back;
      const work = instance.work;
      const address = instance.address;

      // Mother 클래스에서 requestSystem과 messageSend 메서드를 가져옵니다.
      // requestSystem은 외부 API 요청을 처리하며, messageSend는 메시지를 전송하는 기능을 수행합니다.
      const { requestSystem, messageSend } = instance.mother;

      try {
          let id, historyObj;
          let requestObj;

          // proid(프로젝트 ID)가 없는 경우, cliid(클라이언트 ID)를 ID로 설정합니다.
          if (req.body.proid === undefined) {
              id = req.body.cliid;
          }

          // cliid가 없는 경우, proid를 ID로 설정합니다.
          if (req.body.cliid === undefined) {
              id = req.body.proid;
          }

          // ID가 문자열 타입이 아닐 경우, 유효하지 않은 요청으로 간주하고 에러를 발생시킵니다.
          if (typeof id !== "string") {
              throw new Error("invaild post");
          }

          // ID가 c 또는 p로 시작하지 않으면 에러를 발생시킵니다. 이는 클라이언트 또는 프로젝트 ID의 형식을 검사합니다.
          if (!/^[cp]/.test(id)) {
              throw new Error("invaild post");
          }

          // 요청이 /proposalReset인 경우, 제안서를 리셋합니다.
          if (req.url === "/proposalReset") {
              // work 객체의 proposalReset 메서드를 호출하여 제안서를 리셋합니다.
              work.proposalReset(id, { selfMongo: instance.mongo, selfLocalBoo: instance.mongolocal }).catch((err) => {
                  console.log(err);
              });

          // 요청이 /proposalCreate인 경우, 새로운 제안서를 생성합니다.
          } else if (req.url === "/proposalCreate") {
              // 클라이언트 ID가 c로 시작하는 경우 처리합니다.
              if (/^c/.test(id)) {
                  // serid가 유효한 형식(서비스 ID)을 갖춘 경우 처리합니다.
                  if (typeof req.body.serid === "string") {
                      if (/^s[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]$/.test(req.body.serid)) {

                          // 해당 클라이언트의 히스토리 정보를 가져옵니다.
                          historyObj = await back.getHistoryById("client", id, { selfMongo: instance.mongolocal });

                          // 히스토리가 존재하고, curation 이미지가 있는 경우 제안서를 생성할 수 있습니다.
                          if (historyObj !== null && historyObj.curation.image.length > 0) {
                              
                              // 요청 객체를 설정합니다.
                              requestObj = {
                                  cliid: id, // 클라이언트 ID
                                  historyQuery: { "curation.service.serid": [req.body.serid] }, // 서비스 ID에 해당하는 히스토리 쿼리
                                  coreQuery: {}, // 추가 쿼리 설정
                                  mode: "create", // 모드는 create로 설정합니다.
                                  fromConsole: 1, // 콘솔에서 요청되었음을 표시합니다.
                              };

                              // silent(알림 비활성화)가 설정된 경우 이를 요청 객체에 추가합니다.
                              if (req.body.silent !== undefined) {
                                  requestObj.silent = true;
                              }

                              // 스타일 큐레이션 업데이트를 처리하기 위해 외부 API에 요청을 보냅니다.
                              requestSystem("https://" + address.officeinfo.host + ":3002/styleCuration_updateCalculation", requestObj, { 
                                  headers: { "origin": "https://" + address.officeinfo.host, "Content-Type": "application/json" } 
                              }).then(() => {
                                  // 성공적으로 요청이 완료된 경우 특별한 처리는 없습니다.
                              }).catch((err) => {
                                  // 에러가 발생한 경우 에러를 출력합니다.
                                  console.log(err);
                              });

                          } else {
                              // 스타일 체크가 완료되지 않은 경우, 메시지를 슬랙 채널에 전송합니다.
                              messageSend({ 
                                  text: id + " 고객님은 스타일 체크를 진행하지 않아 자동으로 제안서를 만들 수 없습니다!", 
                                  channel: "#403_proposal" 
                              }).catch((err) => {
                                  console.log(err);
                              });
                          }
                      }
                  }
              }
          }

          // 응답 헤더에 JSON 형식으로 응답을 설정하고, 작업 완료 메시지를 클라이언트에 전송합니다.
          res.set("Content-Type", "application/json");
          res.send(JSON.stringify({ message: "will do" }));
      } catch (e) {
          // 에러가 발생한 경우 로그를 남기고, 클라이언트에게 에러 메시지를 응답합니다.
          logger.error(e, req).catch((e) => { console.log(e); });
          res.set("Content-Type", "application/json");
          res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /getMembers
     * @description 멤버 정보를 요청하는 라우터입니다. 특정 타입에 따라 멤버 데이터를 반환합니다.
     * @param {object} req - 클라이언트 요청 객체. 본문에는 type, value, mac 등의 정보가 포함됩니다.
     * @param {object} res - 서버 응답 객체. 요청된 멤버 정보를 JSON 형식으로 반환합니다.
     */
    router.post([ "/getMembers" ], async function (req, res) {
      // 응답 헤더에 JSON 형식과 CORS 설정을 추가합니다.
      res.set({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });

      try {
          // 요청 본문에 type이 문자열이 아닌 경우 에러를 발생시킵니다.
          if (typeof req.body.type !== "string") {
              throw new Error("must be type");
          }

          // instance에서 멤버 정보를 가져옵니다.
          const membersArr = instance.members;

          // 이메일 정보를 저장할 배열을 초기화합니다.
          let emailArr = [];

          // 특정 멤버를 저장할 변수를 초기화합니다.
          let targetMember = null;

          /**
           * @description type이 "get"인 경우 모든 멤버 데이터를 응답으로 반환합니다.
           */
          if (req.body.type === "get") {
              res.send(JSON.stringify(membersArr));

          /**
           * @description type이 "boo"인 경우, 주어진 이메일로 멤버를 찾고, 해당 멤버가 존재하는지 확인합니다.
           */
          } else if (req.body.type === "boo") {
              // 모든 멤버의 이메일과 ID를 emailArr 배열에 저장합니다.
              for (let { id, email } of membersArr) {
                  for (let e of email) {
                      emailArr.push({ email: e, id });
                  }
              }

              // emailArr에서 요청된 이메일과 일치하는 멤버를 찾습니다.
              for (let i = 0; i < emailArr.length; i++) {
                  if (req.body.value === emailArr[i].email) {
                      for (let j = 0; j < membersArr.length; j++) {
                          if (emailArr[i].id === membersArr[j].id) {
                              targetMember = membersArr[j];
                          }
                      }
                  }
              }

              // 멤버가 존재하지 않거나 alive 상태가 아닌 경우 null을 응답으로 반환합니다.
              if (targetMember === undefined || targetMember === null) {
                  res.send(JSON.stringify({ result: null }));
              } else {
                  if (!targetMember.alive) {
                      res.send(JSON.stringify({ result: null }));
                  } else {
                      res.send(JSON.stringify({ result: targetMember }));
                  }
              }

          /**
           * @description type이 "this"인 경우, 요청된 MAC 주소로 멤버를 찾고 해당 멤버 정보를 반환합니다.
           */
          } else if (req.body.type === "this") {

              // MAC 배열이 존재하지 않으면 에러를 발생시킵니다.
              if (req.body.mac === undefined) {
                  throw new Error("must be mac array");
              }

              // 요청 본문에서 mac 값을 equalJson으로 깊은 복사하여 가져옵니다.
              const { mac } = equalJson(req.body);

              // mac이 배열이 아니거나 배열 내 요소가 문자열이 아닌 경우 에러를 발생시킵니다.
              if (!Array.isArray(mac)) {
                  throw new Error("invalid post");
              }
              if (!mac.every((str) => { return typeof str === "string" })) {
                  throw new Error("invalid post");
              }

              // 현재 멤버 ID와 관련된 변수를 정의합니다.
              let thisMemid, thisMap, thisMember;

              thisMemid = null;

              // officeinfo.map에서 주어진 MAC 주소와 일치하는 멤버 ID를 찾습니다.
              for (let obj of address.officeinfo.map) {
                  if (mac.includes(obj.mac) && typeof obj.memid === "string") {
                      thisMemid = obj.memid;
                      break;
                  }
              }

              // 일치하는 멤버 ID가 있는 경우, 해당 멤버의 정보를 반환합니다.
              if (thisMemid !== null) {
                  thisMap = address.officeinfo.map.find((obj) => { return obj.memid === thisMemid; });
                  thisMember = membersArr.find((obj) => { return obj.id === thisMemid });

                  // memid와 mac 필드를 멤버 객체에 추가합니다.
                  thisMember.memid = thisMember.id;
                  thisMember.mac = thisMap.mac;

                  // 멤버 정보를 JSON 형식으로 반환합니다.
                  res.send(JSON.stringify(thisMember));
              } else {
                  // 멤버가 없으면 null을 반환합니다.
                  res.send(JSON.stringify({ member: null }));
              }

          }
      } catch (e) {
          // 에러가 발생한 경우 에러 로그를 기록하고, 클라이언트에게 에러 메시지를 응답합니다.
          logger.error(e, req).catch((e) => { console.log(e); });
          res.set("Content-Type", "application/json");
          res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /parsingProposal
     * @description 특정 클라이언트의 디자이너 큐레이션 데이터를 기반으로 제안서를 파싱하여 반환하는 라우터입니다.
     * @param {object} req - 클라이언트 요청 객체. 본문에는 클라이언트 ID(cliid)와 서비스 ID(serid)가 포함되어야 합니다.
     * @param {object} res - 서버 응답 객체. 제안서 데이터를 JSON 형식으로 반환합니다.
     */
    router.post([ "/parsingProposal" ], async function (req, res) {
      try {
          // 요청 본문에서 클라이언트 ID와 서비스 ID가 제공되지 않은 경우 에러를 발생시킵니다.
          if (req.body.id === undefined || req.body.serid === undefined) {
              throw new Error("must be cliid, seridNumber");
          }

          // 디자이너 큐레이션 데이터를 가져옵니다. work.designerCuration 메서드를 호출하여 해당 클라이언트의 큐레이션 결과를 반환합니다.
          const selected = await work.designerCuration(
              req.body.id,        // 클라이언트 ID
              4,                  // 정해진 고정 값 (디자이너 수, 범위 또는 기타 목적)
              [ `s2011_aa0${req.body.serid}s` ],  // 서비스 ID 문자열을 기반으로 파싱
              { 
                  selfMongo: instance.mongo,     // MongoDB 인스턴스
                  selfLocalMongo: instance.mongolocal  // 로컬 MongoDB 인스턴스
              }
          );

          // 큐레이션 결과가 배열이 아닌 경우, 에러 메시지를 발생시킵니다.
          if (!Array.isArray(selected)) {
              throw new Error(selected);
          }

          // 응답 헤더에 JSON 형식으로 설정합니다.
          res.set("Content-Type", "application/json");

          // 큐레이션 결과가 비어 있는 경우, null을 반환합니다.
          if (selected.length === 0) {
              res.send(JSON.stringify({ result: null }));
          } else {
              // 큐레이션 결과가 있는 경우, 제안서를 반환합니다.
              res.send(JSON.stringify({ result: { proposal: selected } }));
          }

      } catch (e) {
          // 에러가 발생한 경우 에러 로그를 기록하고, 클라이언트에게 에러 메시지를 반환합니다.
          logger.error(e, req).catch((e) => { console.log(e); });
          res.set("Content-Type", "application/json");
          res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /alimTalk
     * @description 알림톡 메시지를 발송하는 라우터입니다. 발송할 방법(method), 수신자 이름(name), 수신자 전화번호(phone)를 받아 메시지를 발송합니다.
     * @param {object} req - 클라이언트 요청 객체. 본문에 method(메시지 발송 방법), name(수신자 이름), phone(수신자 전화번호), option(추가 옵션)이 포함됩니다.
     * @param {object} res - 서버 응답 객체. 발송 성공 여부를 JSON 형식으로 반환합니다.
     */
    router.post([ "/alimTalk" ], async function (req, res) {
      // 응답 헤더 설정: JSON 형식 및 CORS(Cross-Origin Resource Sharing) 설정을 추가합니다.
      res.set({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": '*',
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
          "Access-Control-Allow-Headers": '*',
      });

      try {
          // 필수 필드가 제공되지 않으면 에러를 발생시킵니다.
          if (req.body.method === undefined || req.body.name === undefined || req.body.phone === undefined) {
              throw new Error("must be method, name, phone");
          }

          // 요청 본문에서 method, name, phone 필드를 equalJson을 사용해 깊은 복사로 처리합니다.
          const { method, name, phone } = equalJson(req.body);

          // 추가 옵션을 처리할 변수를 선언합니다.
          let option;

          /**
           * @description option 필드가 제공되지 않았을 경우, 빈 객체로 초기화합니다. 제공된 경우는 equalJson을 사용하여 옵션 데이터를 처리합니다.
           */
          if (req.body.option === undefined) {
              option = {};  // 옵션이 없을 경우 기본값으로 빈 객체를 설정
          } else {
              // option 필드를 equalJson으로 깊은 복사하여 처리합니다.
              option = equalJson(req.body.option);

              // option의 host에 "ADDRESS[" 문자열이 포함된 경우, 주소 매핑을 처리합니다.
              if (/ADDRESS\[/g.test(option.host)) {
                  // host에 "(ghost)"가 포함된 경우, ghost 서버의 호스트 주소를 가져옵니다.
                  if (/\(ghost\)/gi.test(option.host)) {
                      option.host = instance.address[
                          option.host
                              .replace(/ADDRESS\[/gi, '')
                              .replace(/\]/g, '')
                              .replace(/\([^\(\)]+\)/g, '')
                      ].ghost.host;
                  } else {
                      // 그렇지 않으면 기본 호스트 주소를 가져옵니다.
                      option.host = instance.address[
                          option.host
                              .replace(/ADDRESS\[/gi, '')
                              .replace(/\]/g, '')
                              .replace(/\([^\(\)]+\)/g, '')
                      ].host;
                  }
              }
          }

          /**
           * @description Kakao 알림톡 메시지를 발송합니다. 메서드는 method, 수신자는 name과 phone, 옵션은 option을 통해 전달됩니다.
           * @function instance.kakao.sendTalk
           */
          await instance.kakao.sendTalk(method, name, phone, option);

          // 발송 성공 메시지를 JSON 형식으로 클라이언트에 전송합니다.
          res.send(JSON.stringify({ message: "success" }));

      } catch (e) {
          // 에러가 발생한 경우 에러 로그를 기록하고, 클라이언트에 에러 메시지를 반환합니다.
          logger.error(e, req).catch((e) => { console.log(e); });
          res.set("Content-Type", "application/json");
          res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /sendCertification
     * @description 휴대폰 인증번호를 요청하고, SMS와 카카오톡을 통해 인증번호를 전송하는 라우터입니다.
     * @param {object} req - 클라이언트 요청 객체. 본문에는 수신자 이름(name), 전화번호(phone), 인증번호(certification)가 포함됩니다.
     * @param {object} res - 서버 응답 객체. 인증번호 전송 성공 여부를 JSON 형식으로 반환합니다.
     */
    router.post([ "/sendCertification" ], async function (req, res) {
      // 응답 헤더 설정: JSON 형식 및 CORS 설정을 추가합니다.
      res.set({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });

      // 필요한 객체들을 instance에서 가져옵니다.
      const back = instance.back;  // 백엔드 관련 처리 로직
      const human = instance.human;  // 휴대폰 SMS 전송 로직
      const kakao = instance.kakao;  // 카카오톡 전송 로직
      const address = instance.address;  // 서버 주소 정보
      const { equalJson } = instance.mother;  // Mother 클래스의 equalJson 메서드

      try {
          // 클라이언트 요청에서 name, phone, certification 값을 추출합니다.
          const { name, phone, certification } = req.body;

          // 요청 헤더에서 IP 주소를 가져옵니다. 클라이언트가 프록시를 사용한 경우 "x-forwarded-for" 헤더를 사용하고, 그렇지 않으면 소켓의 remoteAddress를 사용합니다.
          const ip = String(req.headers["x-forwarded-for"] === undefined ? req.socket.remoteAddress : req.headers["x-forwarded-for"])
              .trim()
              .replace(/[^0-9\.]/gi, '');  // IP 주소에서 숫자와 '.' 외의 문자는 제거

          /**
           * @description IP 주소가 회사 외부 IP와 일치하는지 확인합니다.
           * 내부 IP에서 요청한 경우 "office" 메시지를 반환하고, 외부에서 요청한 경우 인증번호를 전송합니다.
           */
          if (address.officeinfo.ip.outer.replace(/[^0-9]/gi, '') === ip.replace(/[^0-9]/gi, '')) {
              // 회사 내부 IP에서 요청한 경우 "office" 메시지를 반환합니다.
              res.send(JSON.stringify({ message: "office" }));

          } else {

              /**
               * @description SMS 전송
               * human.sendSms 메서드를 사용해 수신자의 휴대폰 번호로 SMS 메시지를 전송합니다.
               */
              human.sendSms({
                  to: phone,  // 수신자의 전화번호
                  body: "[홈리에종] 안녕하세요! " + name + "님,\n휴대폰 인증번호를 보내드립니다.\n\n인증번호 : " + certification + "\n\n인증번호를 팝업창에 입력해주세요!"
              }).catch((e) => { console.log(e); });

              /**
               * @description 카카오톡 알림톡 전송
               * kakao.sendTalk 메서드를 사용해 수신자에게 카카오톡 메시지를 전송합니다.
               */
              kakao.sendTalk("certification", name, phone, {
                  company: "홈리에종",  // 발신 회사명
                  name,  // 수신자 이름
                  certification  // 인증번호
              }).catch((e) => { console.log(e); });

              // 작업 성공 메시지를 반환합니다.
              res.send(JSON.stringify({ message: "will do" }));
          }

      } catch (e) {
          // 에러가 발생한 경우 에러 로그를 기록하고, 클라이언트에게 에러 메시지를 반환합니다.
          logger.error(e, req).catch((e) => { console.log(e); });
          res.set("Content-Type", "application/json");
          res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /clientSubmit
     * @description 클라이언트 상담 요청을 처리하여 새로운 클라이언트를 생성하거나, 중복된 클라이언트의 경우 요청을 업데이트하는 라우터입니다.
     * @param {object} req - 클라이언트 요청 객체. 본문에는 클라이언트 정보가 포함됩니다.
     * @param {object} res - 서버 응답 객체. 처리 결과를 JSON 형식으로 반환합니다.
     */
    router.post([ "/clientSubmit" ], async function (req, res) {
      // 응답 헤더 설정: JSON 형식으로 반환하고, CORS 설정으로 모든 도메인에 대해 접근 허용
      res.set({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });

      try {
          // 필요한 인스턴스와 함수 로드
          const back = instance.back;  // 백엔드 데이터 처리 모듈
          const selfMongo = instance.mongo;  // 메인 MongoDB 인스턴스
          const { map } = equalJson(req.body);  // 요청 본문을 equalJson으로 안전하게 파싱

          // 예산, 가구, 계약 종류, 중복 감지 기준 시간 등의 기본값을 설정
          const budgetArr = [ '500만원 이하', '1,000만원', '1,500만원', '2,000만원', '2,500만원', '3,000만원', '3,500만원', '4,000만원', '4,500만원', '5,000만원 이상', '6,000만원 이상', '7,000만원 이상', '8,000만원 이상', '9,000만원 이상', '1억원 이상', '1억 5,000만원 이상', '2억원 이상', '3억원 이상', '5억원 이상', '10억원 이상' ];
          const furnitureArr = [ "재배치", "일부 구매", "전체 구매" ];
          const contractArr = [ "자가", "전월세" ];
          const ignorePhone = [ "010-2747-3403" ];  // 특정 번호는 무시
          const overlapStandardHours = 12;  // 중복 요청을 감지하는 기준 시간 (12시간)
          const defaultPyeong = 34;  // 기본 평수
          const moveinConst0 = 60;  // 입주 기준일 (60일)
          const moveinConst1 = 10;  // 예상 입주 기준일 (10일)

          let ifOverlap;  // 중복 여부 확인 변수
          let requestObject;  // 요청 객체 초기화
          let name, phone, address0, address1, email, pyeong, movein, living, etc, future;
          let contract, sessionId;
          let requestArr, pastRequests, cliid, message, thisClient, overlapTimeline, budget, furniture, expectedStart;

          // 맵에서 클라이언트 정보를 추출
          name = map.find((obj) => { return obj.property === "name" });
          phone = map.find((obj) => { return obj.property === "phone" });
          address0 = map.find((obj) => { return obj.property === "address0" });
          address1 = map.find((obj) => { return obj.property === "address1" });
          email = map.find((obj) => { return obj.property === "email" });
          pyeong = map.find((obj) => { return obj.property === "pyeong" });
          movein = map.find((obj) => { return obj.property === "movein" });
          living = map.find((obj) => { return obj.property === "living" });
          etc = map.find((obj) => { return obj.property === "etc" });
          contract = map.find((obj) => { return obj.property === "contract" });
          sessionId = map.find((obj) => { return obj.property === "sessionId" });

          // 필수 필드가 누락되었는지 확인
          if (name === undefined || phone === undefined || address0 === undefined || address1 === undefined || email === undefined || pyeong === undefined || movein === undefined || living === undefined || etc === undefined) {
              throw new Error("invaild post");
          }

          // 세션 ID 설정
          if (sessionId === undefined) {
              sessionId = [];
          } else {
              sessionId = [ sessionId.value.trim() ];
          }

          // 계약이 설정되지 않았을 경우 기본값으로 설정
          if (contract === undefined) {
              contract = { property: "contract", value: contractArr[0] };
          }

          // 입력받은 정보를 정리하고 불필요한 문자를 제거
          name = name.value.trim();
          phone = phone.value.trim();
          address0 = address0.value.trim();
          address1 = address1.value.trim();
          email = email.value.trim();
          pyeong = pyeong.value.trim();
          movein = movein.value.trim();
          living = living.value.trim();
          etc = etc.value.trim();
          contract = contract.value.trim();

          // 클라이언트 요청 객체 생성
          requestObject = {};
          requestObject["name"] = name.replace(/[^가-힣]/gi, '');  // 이름에서 한글만 남김
          requestObject["phone"] = phone.replace(/[^0-9\-]/gi, '');  // 전화번호에서 숫자와 하이픈만 남김
          requestObject["email"] = email;
          requestObject["requests.0.request.space.address"] = String(address0 + " " + address1).trim();  // 주소 결합

          // 평수 값이 숫자가 아니거나 0일 경우 기본 평수를 사용
          if (Number.isNaN(Number(pyeong.replace(/[^0-9\.]/gi, ''))) || Number(pyeong.replace(/[^0-9\.]/gi, '')) === 0) {
              requestObject["requests.0.request.space.pyeong"] = defaultPyeong;
          } else {
              requestObject["requests.0.request.space.pyeong"] = Number(pyeong.replace(/[^0-9\.]/gi, ''));
          }

          // 거주 여부에 따라 입주일 계산
          if (/거주중/gi.test(living)) {
              requestObject["requests.0.request.space.resident.living"] = true;  // 거주 중이면 true
              requestObject["requests.0.request.space.resident.expected"] = new Date();  // 현재 날짜
              future = new Date();
              future.setDate(future.getDate() + moveinConst0);  // 입주일은 현재로부터 60일 후로 설정
              requestObject["requests.0.analytics.date.space.movein"] = future;
          } else {
              requestObject["requests.0.request.space.resident.living"] = false;
              requestObject["requests.0.request.space.resident.expected"] = stringToDate(movein);  // 입주 날짜를 직접 설정
              future = stringToDate(movein);
              future.setDate(future.getDate() + moveinConst1);  // 입주일은 10일 후로 설정
              requestObject["requests.0.analytics.date.space.movein"] = future;
          }

          // 예상 입주 시작일 계산
          expectedStart = new Date(future.getFullYear(), future.getMonth(), future.getDate(), future.getHours(), future.getMinutes(), future.getSeconds());
          expectedStart = expectedStart.setDate(expectedStart.getDate() - moveinConst0);  // 입주일로부터 60일 전

          // 입주일이 현재 날짜보다 이전이면 거주 중으로 설정
          if (!requestObject["requests.0.request.space.resident.living"] && expectedStart.valueOf() <= (new Date()).valueOf()) {
              requestObject["requests.0.request.space.resident.expected"] = new Date();
              future = new Date();
              future.setDate(future.getDate() + moveinConst0);
              requestObject["requests.0.analytics.date.space.movein"] = future;
          }

          // 계약 종류, 기타 사항 설정
          requestObject["requests.0.request.space.contract"] = contract;
          requestObject["requests.0.request.space.spec.room"] = 3;
          requestObject["requests.0.request.space.spec.bathroom"] = 2;
          requestObject["requests.0.request.space.spec.valcony"] = false;
          requestObject["requests.0.request.etc.comment"] = etc;

          // 특정 문자열이 포함된 경우 채널을 설정
          if (/from meta instant ads/gi.test(etc)) {
              requestObject["requests.0.request.etc.channel"] = "메타 인스턴트";
          } else {
              requestObject["requests.0.request.etc.channel"] = "인터넷 검색";
          }

          // 요청 시간을 현재 시간으로 설정
          requestObject["requests.0.request.timeline"] = new Date();

          // 세션 ID 추가
          requestObject["requests.0.analytics.session"] = sessionId;

          // 중복된 클라이언트인지 확인하는 로직
          message = '';
          ifOverlap = await back.getClientsByQuery({ phone }, { selfMongo });
          if (ifOverlap.length > 0) {
              // 중복된 클라이언트가 있을 경우 요청을 업데이트
              cliid = ifOverlap[0].cliid;
              pastRequests = (ifOverlap[0].toNormal()).requests;
              overlapTimeline = new Date(JSON.stringify(pastRequests[0].request.timeline).slice(1, -1));
              overlapTimeline.setHours(overlapTimeline.getHours() + overlapStandardHours);

              // 중복 요청 시간이 지나면 새로운 요청을 추가
              if (overlapTimeline.valueOf() < (new Date()).valueOf()) {
                  requestArr = [];
                  for (let z = 0; z < pastRequests.length; z++) {
                      requestArr.push(pastRequests[z]);
                  }
                  requestArr.unshift(back.returnClientRequest());
                  await back.updateClient([ { cliid }, { "requests": requestArr } ], { selfMongo });
              }

              // 기존 클라이언트 요청을 업데이트
              await back.updateClient([ { cliid }, requestObject ], { selfMongo });
              message += "재문의가 왔습니다!\n";

          } else {
              // 새로운 클라이언트를 생성
              cliid = await back.createClient(requestObject, { selfMongo });
              await back.createHistory("client", { cliid, space: "최초 고객이 적은 주소 : " + requestObject["requests.0.request.space.address"] }, { selfMongo: instance.mongolocal });
              message += "새로운 상담 문의가 왔습니다!\n";
          }

          /**
           * @function parsingAddress
           * @description 주소를 파싱하고 결과에 따라 클라이언트 주소를 업데이트하는 함수입니다.
           * @param {string} id - 클라이언트 ID
           * @param {string} rawString - 파싱할 주소 문자열
           * @param {object} MONGOC - MongoDB 인스턴스
           * @param {object} logger - 로그 기록 객체
           * @returns {Promise<object>} - 주소 파싱 결과를 반환하는 Promise 객체
           */
          const parsingAddress = async (id, rawString, MONGOC, logger) => {
            // id와 rawString이 문자열이 아니거나 MONGOC가 정의되지 않은 경우 에러 발생
            if (typeof id !== "string" || typeof rawString !== "string" || MONGOC === undefined) {
                throw new Error("invaild input");  // 잘못된 입력에 대한 에러 처리
            }

            // AddressParser 인스턴스 생성
            const app = new AddressParser();

            try {
                let arr;
                // 주소 검사 함수 호출, 검사 결과 배열을 반환
                arr = await app.addressInspection([{ id, address: rawString }]);
                
                // 주소 검사 결과가 비어 있을 경우, 유효한 주소로 간주하고 true 반환
                if (arr.length === 0) {
                    return { result: true, id };  // 주소 검사가 성공적일 경우
                } else {
                    // 주소 정보를 얻기 위해 다시 getAddress 호출
                    const res = await app.getAddress(rawString);
                    
                    // getAddress가 null을 반환하면 잘못된 주소로 간주하고 false 반환
                    if (res === null) {
                        return { result: false, id };  // 주소를 찾지 못한 경우
                    } else {
                        // 주소가 유효하면 도로명 주소를 추출하고, 클라이언트 정보 업데이트
                        const { address: { road } } = res;
                        
                        // MongoDB에서 클라이언트의 주소를 업데이트
                        await back.updateClient([{ cliid: id }, { "requests.0.request.space.address": (road + " " + rawString) }], { selfMongo: MONGOC });
                        
                        // 업데이트 성공 시 true 반환
                        return { result: true, id };  // 주소 업데이트 완료
                    }
                }
            } catch (e) {
                // 에러 발생 시 로그 기록
                logger.error(e, req).catch((e) => { console.log(e); });
            }
          };

          // 파싱된 주소 업데이트를 비동기적으로 수행
          parsingAddress(cliid, requestObject["requests.0.request.space.address"], instance.mongo, logger).catch((err) => {
              // 에러 발생 시 로그 기록 및 콘솔 출력
              logger.error(err, req).catch((e) => { console.log(e); });
              console.log(err);  // 에러 내용을 콘솔에 출력
          });

          /**
           * 클라이언트 ID를 기반으로 케이스를 조회하고, 해당 클라이언트의 서비스 정보를 업데이트하는 함수입니다.
           * 
           * @param {string} cliid - 클라이언트 ID
           * @param {object} selfMongo - MongoDB 인스턴스
           */
          back.getCaseProidById(cliid, { selfMongo }).then((clientCase) => {
            // 클라이언트 케이스가 존재하는지 확인합니다.
            if (clientCase !== null) {
                // caseService 메서드를 호출하여 서비스 정보를 가져옵니다.
                const serviceCase = clientCase.caseService();

                // 서비스 정보가 존재하는 경우 처리합니다.
                if (serviceCase !== null) {
                    // 서비스 ID(serid)와 추가 정보(xValue)를 추출합니다.
                    const { serid, xValue } = serviceCase;
                    let whereQuery, updateQuery;

                    // 업데이트를 위한 쿼리 작성
                    whereQuery = { cliid };  // 클라이언트 ID를 기반으로 쿼리
                    updateQuery = {
                        "requests.0.analytics.response.service.serid": serid[0].serid,  // 첫 번째 serid를 사용
                        "requests.0.analytics.response.service.xValue": xValue[0].xValue  // 첫 번째 xValue 사용
                    };

                    // 클라이언트 정보를 업데이트
                    return back.updateClient([ whereQuery, updateQuery ], { selfMongo });
                } else {
                    // 서비스 정보가 없을 경우 "fail"을 반환하는 Promise
                    return new Promise((resolve, reject) => {
                        resolve("fail");
                    });
                }
            } else {
                // 클라이언트 케이스가 없을 경우 "fail"을 반환하는 Promise
                return new Promise((resolve, reject) => {
                    resolve("fail");
                });
            }
          })
          // 에러가 발생할 경우 이를 로그로 남깁니다.
          .catch((err) => {
            logger.error(err, req).catch((e) => { console.log(e); });
          });

          // 클라이언트 정보를 로드하고, 메시지 작성 후 알림 발송
          thisClient = await back.getClientById(cliid, { selfMongo, withTools: true });
          message += "\n" + thisClient.toMessage();
          messageSend({ text: message, channel: "#401_consulting" }).then(() => {
              return requestSystem("https://" + instance.address.officeinfo.ghost.host + ":" + String(3000) + "/storeClientAnalytics", { fast: true, talk: true, cliid: thisClient.cliid }, { headers: { "Content-Type": "application/json" } });
          }).catch((err) => { console.log(err); });

          // 응답으로 생성된 cliid 반환
          res.send(JSON.stringify({ cliid }));
      } catch (e) {
          // 에러 처리
          logger.error(e, req).catch((e) => { console.log(e); });
          res.set("Content-Type", "application/json");
          res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /aspirantSubmit
     * @description 디자이너 신청자가 파트너십 또는 포트폴리오 제출 요청을 처리하는 라우터입니다.
     * @param {object} req - 클라이언트 요청 객체. 요청 본문에 'map'과 'mode' 필수.
     * @param {object} res - 서버 응답 객체. 성공 시 aspid를 JSON 형식으로 반환합니다.
     */
    router.post([ "/aspirantSubmit" ], async function (req, res) {
      // 응답 헤더 설정: JSON 형식으로 응답을 보내며 모든 도메인에서 접근 가능하게 함.
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });

      // 필요한 인스턴스 선언
      const back = instance.back;
      const address = instance.address;
      const kakao = instance.kakao;

      try {
        // 필수 데이터 확인: 'map'과 'mode' 필수 확인
        if (req.body.map === undefined || req.body.mode === undefined) {
          throw new Error("invalid post");  // 필수 파라미터가 없으면 에러 발생
        }

        /**
         * @description 디자이너 파트너십 신청 및 포트폴리오 제출을 처리하는 부분으로, 제출된 데이터를 기반으로 MongoDB에서 업데이트하거나 새롭게 데이터를 생성합니다.
         */

        // MongoDB 인스턴스 선언 (디자이너 신청자 정보를 저장하는 곳)
        const selfMongo = instance.mongo;

        // 요청으로 전달받은 'map'과 'mode'를 파싱하여 사용
        const { map, mode } = equalJson(req.body);

        // 변수 선언 (디자이너 정보 및 파트너십 신청 관련 정보 저장)
        let name;  // 디자이너 이름
        let phone;  // 디자이너 연락처
        let email;  // 이메일
        let address0;  // 주소 (기본)
        let address1;  // 주소 (상세)
        let business;  // 사업자 구분 (개인, 법인 등)
        let company;  // 회사 이름
        let numbers;  // 사업자 등록 번호
        let start;  // 회사 설립일
        let representative;  // 대표자 이름
        let bankname;  // 은행명
        let banknumber;  // 계좌번호
        let bankto;  // 예금주
        let homepage;  // 홈페이지 URL
        let sns;  // SNS URL
        let sessionId;  // 세션 ID
        let whereQuery, updateQuery;  // MongoDB에서 사용할 쿼리
        let aspid;  // 신청자 ID
        let message;  // Slack 채널에 보낼 메시지
        let rows;  // DB에서 조회된 결과 저장
        let thisAspirant;  // 현재 신청자 정보
        let careerDetail, schoolDetail;  // 경력 및 학력 정보
        let gender;  // 성별
        let birth;  // 생년월일
        let birth_y, birth_m, birth_d;  // 생년월일 세부 정보 (년도, 월, 일)
        let etc;  // 기타 정보
        let ceoName, ceoId;  // CEO의 이름과 Slack ID

        // CEO 정보를 가져옴 (CEO 역할을 가진 멤버를 조회하여 이름과 Slack ID를 가져옴)
        ceoName = instance.members.find((o) => { return o.roles.includes("CEO") }).name;
        ceoId = instance.members.find((o) => { return o.roles.includes("CEO") }).slack.id;
    
        if (mode === "general") {
    
          // name 속성을 가진 객체를 찾아 변수 name에 할당합니다. map은 클라이언트에서 보내진 데이터 배열입니다.
          name = map.find((obj) => { return obj.property === "name" });

          // phone 속성을 가진 객체를 찾아 변수 phone에 할당합니다. 이는 신청자의 전화번호를 나타냅니다.
          phone = map.find((obj) => { return obj.property === "phone" });

          // gender 속성을 가진 객체를 찾아 변수 gender에 할당합니다. 이는 신청자의 성별을 나타냅니다.
          gender = map.find((obj) => { return obj.property === "gender" });

          // birth_y 속성을 가진 객체를 찾아 변수 birth_y에 할당합니다. 이는 신청자의 출생 연도를 나타냅니다.
          birth_y = map.find((obj) => { return obj.property === "birth_y" });

          // birth_m 속성을 가진 객체를 찾아 변수 birth_m에 할당합니다. 이는 신청자의 출생 월을 나타냅니다.
          birth_m = map.find((obj) => { return obj.property === "birth_m" });

          // birth_d 속성을 가진 객체를 찾아 변수 birth_d에 할당합니다. 이는 신청자의 출생 일을 나타냅니다.
          birth_d = map.find((obj) => { return obj.property === "birth_d" });

          // email 속성을 가진 객체를 찾아 변수 email에 할당합니다. 이는 신청자의 이메일 주소를 나타냅니다.
          email = map.find((obj) => { return obj.property === "email" });

          // address0 속성을 가진 객체를 찾아 변수 address0에 할당합니다. 이는 신청자의 기본 주소를 나타냅니다.
          address0 = map.find((obj) => { return obj.property === "address0" });

          // address1 속성을 가진 객체를 찾아 변수 address1에 할당합니다. 이는 신청자의 상세 주소를 나타냅니다.
          address1 = map.find((obj) => { return obj.property === "address1" });

          // business 속성을 가진 객체를 찾아 변수 business에 할당합니다. 이는 신청자의 사업 형태(개인, 법인 등)를 나타냅니다.
          business = map.find((obj) => { return obj.property === "business" });

          // company 속성을 가진 객체를 찾아 변수 company에 할당합니다. 이는 신청자의 회사명을 나타냅니다.
          company = map.find((obj) => { return obj.property === "company" });

          // numbers 속성을 가진 객체를 찾아 변수 numbers에 할당합니다. 이는 신청자의 사업자 등록번호를 나타냅니다.
          numbers = map.find((obj) => { return obj.property === "numbers" });

          // start 속성을 가진 객체를 찾아 변수 start에 할당합니다. 이는 신청자의 회사 설립일을 나타냅니다.
          start = map.find((obj) => { return obj.property === "start" });

          // representative 속성을 가진 객체를 찾아 변수 representative에 할당합니다. 이는 회사의 대표자 이름을 나타냅니다.
          representative = map.find((obj) => { return obj.property === "representative" });

          // bankname 속성을 가진 객체를 찾아 변수 bankname에 할당합니다. 이는 신청자의 은행명을 나타냅니다.
          bankname = map.find((obj) => { return obj.property === "bankname" });

          // banknumber 속성을 가진 객체를 찾아 변수 banknumber에 할당합니다. 이는 신청자의 계좌번호를 나타냅니다.
          banknumber = map.find((obj) => { return obj.property === "banknumber" });

          // bankto 속성을 가진 객체를 찾아 변수 bankto에 할당합니다. 이는 계좌의 예금주 이름을 나타냅니다.
          bankto = map.find((obj) => { return obj.property === "bankto" });

          // careerDetail 속성을 가진 객체를 찾아 변수 careerDetail에 할당합니다. 이는 신청자의 경력 정보를 나타냅니다.
          careerDetail = map.find((obj) => { return obj.property === "careerdetail" });

          // schoolDetail 속성을 가진 객체를 찾아 변수 schoolDetail에 할당합니다. 이는 신청자의 학력 정보를 나타냅니다.
          schoolDetail = map.find((obj) => { return obj.property === "schooldetail" });

          // homepage 속성을 가진 객체를 찾아 변수 homepage에 할당합니다. 이는 신청자의 홈페이지 URL을 나타냅니다.
          homepage = map.find((obj) => { return obj.property === "homepage" });

          // sns 속성을 가진 객체를 찾아 변수 sns에 할당합니다. 이는 신청자의 SNS URL을 나타냅니다.
          sns = map.find((obj) => { return obj.property === "sns" });

          // etc 속성을 가진 객체를 찾아 변수 etc에 할당합니다. 이는 기타 정보를 나타냅니다. undefined일 경우 빈 문자열을 할당합니다.
          etc = map.find((obj) => { return obj.property === "etc" }) || "";

          // sessionId 속성을 가진 객체를 찾아 변수 sessionId에 할당합니다. 세션 ID가 없으면 빈 배열로 초기화합니다.
          sessionId = map.find((obj) => { return obj.property === "sessionId" }) || [];
          sessionId = [sessionId.value.trim()];

          // 신청자 이름, 연락처, 주소 등의 문자열을 트리밍하여 정리
          name = name.value.trim();
          phone = phone.value.trim();
          address0 = address0.value.trim();
          address1 = address1.value.trim();
          email = email.value.trim();
          gender = gender.value.trim();
          birth_y = birth_y.value.trim();

          // 출생 연도가 1000보다 작으면 1900년대로 설정하여 출생 연도를 보정합니다.
          if (Number(birth_y) < 1000) {
            birth_y = "19" + birth_y;
          }

          // 출생 월과 일도 각각 트리밍하여 정리
          birth_m = birth_m.value.trim();
          birth_d = birth_d.value.trim();

          // 출생 연도, 월, 일 정보를 기반으로 Date 객체를 생성하여 birth 변수에 할당합니다.
          birth = new Date(Number(birth_y), Number(birth_m) - 1, Number(birth_d));
          etc = etc === undefined ? "" : etc.value.trim();
    
          // updateQuery 객체 생성. 이는 클라이언트가 제출한 정보를 업데이트하기 위한 객체입니다.
          updateQuery = {};

          // 신청자의 이름에서 한글만 추출하여 업데이트합니다.
          updateQuery["designer"] = name.replace(/[^가-힣]/gi, '');

          // 전화번호에서 숫자와 '-'만 남겨 저장합니다.
          updateQuery["phone"] = phone.replace(/[^0-9\-]/gi, '');

          // 성별을 업데이트합니다.
          updateQuery["gender"] = gender;

          // 이메일 주소를 업데이트합니다.
          updateQuery["email"] = email;

          // 주소를 두 개의 문자열(address0, address1)을 합쳐서 저장합니다.
          updateQuery["address"] = address0 + " " + address1;

          // 출생일 정보를 업데이트합니다. birth는 Date 객체입니다.
          updateQuery["birth"] = birth;

          // 파트너십 신청 날짜를 현재 날짜로 설정합니다.
          updateQuery["submit.partnership.date"] = new Date();

          // 파트너십 신청 상태를 true로 설정하여 신청 완료를 표시합니다.
          updateQuery["submit.partnership.boo"] = true;

          // 신청 출처를 빈 문자열로 설정합니다.
          updateQuery["submit.comeFrom"] = "";

          // 사업자가 개인사업자인지 법인사업자인지를 확인하고 이에 따라 분류를 설정합니다.
          if (/개인/gi.test(business.value.trim())) {
            if (/일반/gi.test(business.value.trim())) {
              updateQuery["information.company.classification"] = "개인사업자(일반)";
            } else {
              updateQuery["information.company.classification"] = "개인사업자(간이)";
            }
          } else if (/법인/gi.test(business.value.trim())) {
            if (/일반/gi.test(business.value.trim())) {
              updateQuery["information.company.classification"] = "법인사업자(일반)";
            } else {
              updateQuery["information.company.classification"] = "법인사업자(간이)";
            }
          } else {
            updateQuery["information.company.classification"] = "프리랜서";
          }

          // 회사 이름을 업데이트합니다.
          updateQuery["information.company.name"] = company.value.trim();

          // 사업자 등록번호를 업데이트합니다.
          updateQuery["information.company.businessNumber"] = numbers.value.trim();

          // 회사 설립일을 문자열에서 날짜로 변환하여 업데이트합니다.
          updateQuery["information.company.start"] = stringToDate(start.value.trim());

          // 회사 대표자의 이름을 업데이트합니다.
          updateQuery["information.company.representative"] = representative.value.trim();

          // 은행명, 계좌번호, 예금주를 업데이트합니다.
          updateQuery["information.account.bank"] = bankname.value.trim();
          updateQuery["information.account.number"] = banknumber.value.trim();
          updateQuery["information.account.to"] = bankto.value.trim();

          // 기타 정보를 빈 문자열로 초기화합니다.
          updateQuery["information.account.etc"] = "";

          // 경력과 학력 정보를 JSON 형태로 변환하여 저장합니다.
          updateQuery["information.career.detail"] = equalJson(careerDetail.value.trim());
          updateQuery["information.career.school"] = equalJson(schoolDetail.value.trim());

          // 자기 소개에 해당하는 정보를 저장합니다.
          updateQuery["information.career.about"] = etc;

          // 웹사이트, SNS, 클라우드 관련 채널을 배열로 초기화합니다.
          updateQuery["information.channel.web"] = [];
          updateQuery["information.channel.sns"] = [];
          updateQuery["information.channel.cloud"] = [];

          // 홈페이지 URL이 http로 시작하면 이를 웹 채널에 추가합니다.
          if (/^http/gi.test(homepage.value.trim())) {
            updateQuery["information.channel.web"].push(stringToLink(homepage.value.trim()));
          }

          // SNS URL이 http로 시작하면 이를 SNS 채널에 추가합니다.
          if (/^http/gi.test(sns.value.trim())) {
            updateQuery["information.channel.sns"].push(stringToLink(sns.value.trim()));
          }

          // 미팅 상태를 "검토중"으로 설정합니다.
          updateQuery["meeting.status"] = "검토중";

          // 미팅 날짜를 기본값으로 설정합니다. 1800년으로 설정된 것은 미팅 예정이 없는 상태를 나타냅니다.
          updateQuery["meeting.date"] = new Date(1800, 0, 1);

          // 최초 요청 날짜를 현재로 설정합니다.
          updateQuery["submit.firstRequest.date"] = new Date();

          // 최초 요청 방식을 파트너십으로 설정합니다.
          updateQuery["submit.firstRequest.method"] = "partnership";

          // 응답 담당자를 CEO로 설정합니다.
          updateQuery["response.manager"] = ceoName;

          // 응답 상태를 검토중으로 설정합니다.
          updateQuery["response.first.status"] = "검토중";

          // 전화번호로 이미 존재하는 신청자가 있는지 확인합니다.
          rows = await back.getAspirantsByQuery({ phone: phone.replace(/[^0-9\-]/gi, '') }, { selfMongo });
          message = '';

          // 신규 신청자일 경우 신청자 데이터를 생성하고 메시지를 생성합니다.
          if (rows.length === 0) {
            aspid = await back.createAspirant(updateQuery, { selfMongo });
            message += "새로운 디자이너 파트너십 신청이 왔습니다!\n";
          } else {
            // 기존 신청자일 경우 신청 데이터를 업데이트하고 메시지를 갱신합니다.
            [thisAspirant] = rows.toNormal();
            aspid = thisAspirant.aspid;
            await back.updateAspirant([{ aspid }, updateQuery], { selfMongo });
            message += "재문의 파트너십 신청이 왔습니다!\n";
          }

          // 메시지에 신청자 정보를 추가합니다.
          message += "문의일 : " + dateToString(new Date()) + "\n";
          message += "성함 : " + updateQuery.designer + "\n";
          message += "연락처 : " + updateQuery.phone + "\n";
          message += "성별 : " + updateQuery.gender + "\n";
          message += "생일 : " + dateToString(updateQuery.birth) + "\n";
          message += "이메일 : " + updateQuery.email + "\n";
          message += "주소 : " + updateQuery.address + "\n";
          message += "사업자 분류 : " + updateQuery["information.company.classification"] + "\n";
          message += "회사명 : " + updateQuery["information.company.name"] + "\n";
          message += "사업자 등록번호 : " + updateQuery["information.company.businessNumber"] + "\n";
          message += "개업일 : " + dateToString(updateQuery["information.company.start"]) + "\n";
          message += "대표자 성함 : " + updateQuery["information.company.representative"] + "\n";
          message += "은행명 : " + updateQuery["information.account.bank"] + "\n";
          message += "계좌번호 : " + updateQuery["information.account.number"] + "\n";
          message += "예금주 : " + updateQuery["information.account.to"] + "\n";
          message += "홈페이지 : " + updateQuery["information.channel.web"].join(", ") + "\n";
          message += "SNS 채널 : " + updateQuery["information.channel.sns"].join(", ") + "\n";
          message += "자기 소개 : " + etc + "\n";
          message += "세션 아이디 : " + sessionId.join(", ");

          // 메시지를 슬랙 채널에 전송합니다.
          await messageSend({ text: message, channel: "#301_apply", voice: false });
          await messageSend({ text: name + " 디자이너 신청자님의 검토를 부탁드리겠습니다!", channel: "#301_apply", voice: true });

          // 카카오톡 알림톡을 전송합니다.
          kakao.sendTalk("aspirantSubmit", updateQuery.designer, updateQuery.phone, {
            client: updateQuery.designer,
            host: address.frontinfo.host,
            path: "aspinformation",
            aspid: aspid,
          }).catch((err) => {
            console.log(err);
          });

          // 신청자 ID를 응답으로 전송합니다.
          res.send(JSON.stringify({ aspid }));
    
        } else if (mode === "portfolio") {
    
          /**
           * @description 디자이너 신청자의 정보를 업데이트하고 추가 포트폴리오 전송을 처리하는 라우터
           * @route POST /aspirantSubmit
           * @param {Object} req - 클라이언트 요청 객체 (포함된 정보: name, phone, careerDetail, schoolDetail, etc)
           * @param {Object} res - 서버 응답 객체
           */

          name = map.find((obj) => { return obj.property === "name" }); // 신청자의 이름 정보를 요청 데이터에서 찾습니다.
          phone = map.find((obj) => { return obj.property === "phone" }); // 신청자의 전화번호를 요청 데이터에서 찾습니다.
          careerDetail = map.find((obj) => { return obj.property === "careerdetail" }); // 신청자의 경력 정보를 요청 데이터에서 찾습니다.
          schoolDetail = map.find((obj) => { return obj.property === "schooldetail" }); // 신청자의 학력 정보를 요청 데이터에서 찾습니다.
          etc = map.find((obj) => { return obj.property === "etc" }); // 신청자의 추가 정보를 요청 데이터에서 찾습니다.

          name = name.value.trim(); // 이름 값에서 공백을 제거합니다.
          phone = phone.value.trim(); // 전화번호 값에서 공백을 제거합니다.
          etc = etc === undefined ? "" : etc.value.trim(); // etc가 없는 경우 빈 문자열로 설정하고, 있으면 공백을 제거합니다.

          updateQuery = {}; // 신청자의 정보를 업데이트할 객체를 생성합니다.
          updateQuery["designer"] = name.replace(/[^가-힣]/gi, ''); // 이름에서 한글만 남기고 저장합니다.

          /**
           * 경력 및 학력 정보를 JSON 형식으로 변환하여 저장합니다.
           * 이때, 제공된 정보는 `equalJson` 메서드를 통해 깊은 복사를 수행하며,
           * Date 객체와 같은 복잡한 데이터를 보존합니다.
           */
          updateQuery["information.career.detail"] = equalJson(careerDetail.value.trim());
          updateQuery["information.career.school"] = equalJson(schoolDetail.value.trim());
          updateQuery["information.career.about"] = etc; // 자기 소개 내용을 저장합니다.

          updateQuery["response.portfolio.plus.request"] = new Date(); // 포트폴리오 요청 날짜를 현재로 설정합니다.
          updateQuery["response.manager"] = ceoName; // 신청 처리 담당자를 CEO로 설정합니다.
          updateQuery["response.first.status"] = "검토중"; // 첫 번째 응답 상태를 검토중으로 설정합니다.
          updateQuery["meeting.status"] = "검토중"; // 미팅 상태를 검토중으로 설정합니다.

          /**
           * 전화번호를 기준으로 기존 신청자가 있는지 데이터베이스에서 조회합니다.
           * 전화번호에서 숫자와 '-'만 남깁니다.
           */
          rows = await back.getAspirantsByQuery({ phone: phone.replace(/[^0-9\-]/gi, '') }, { selfMongo });
          if (rows.length === 0) {
            throw new Error("invalid phone number"); // 신청자가 없는 경우 오류를 발생시킵니다.
          } else {
            [thisAspirant] = rows.toNormal(); // 기존 신청자를 가져옵니다.
            aspid = thisAspirant.aspid; // 신청자의 고유 ID를 가져옵니다.
          }

          /**
           * 신청자 정보를 업데이트합니다.
           * 기존의 신청자 정보에 새로 받은 포트폴리오 정보를 반영합니다.
           */
          await back.updateAspirant([{ aspid }, updateQuery], { selfMongo });

          /**
           * 슬랙에 메시지를 전송하여 신청자의 추가 포트폴리오 제출 사실을 알립니다.
           */
          await messageSend({
            text: thisAspirant.designer + " 디자이너 신청자님이 추가 포트폴리오를 전송하였습니다!",
            channel: "#301_apply",
            voice: true
          });
          await messageSend({
            text: thisAspirant.designer + " 디자이너 신청자님의 추가 포트폴리오 검토를 부탁드리겠습니다!",
            channel: "#301_apply",
            voice: false
          });

          /**
           * 5초 후에 카카오톡 알림톡을 전송하여 신청자에게 포트폴리오 전송 완료를 알립니다.
           */
          sleep(5000).then(() => {
            return kakao.sendTalk("aspirantPortfolio", name, phone, {
              client: name,
              host: address.frontinfo.host,
              path: "aspportfolio",
              aspid: aspid,
            });
          }).catch((err) => {
            console.log(err); // 에러 발생 시 콘솔에 로그를 남깁니다.
          });

          // 최종적으로 신청자의 ID를 응답으로 반환합니다.
          res.send(JSON.stringify({ aspid }));
          
        } else if (mode === "setting") {
    
          /**
           * @description 디자이너 신청자의 설정을 업데이트하고 알림톡을 전송하는 라우터
           * @route POST /aspirantSubmit
           * @param {Object} req - 클라이언트 요청 객체 (포함된 정보: name, aspid, type, phone)
           * @param {Object} res - 서버 응답 객체
           */

          // 요청 데이터에서 이름(name), 신청자 ID(aspid), 타입(type), 전화번호(phone)를 추출합니다.
          const { name, aspid, type, phone } = map;

          // 신청자 ID를 기준으로 데이터베이스에서 해당 신청자를 찾기 위한 whereQuery를 생성합니다.
          whereQuery = { aspid };

          // 업데이트할 데이터를 저장할 객체를 생성합니다. 포트폴리오에 추가된 사진의 업로드 시간을 현재 시간으로 설정합니다.
          updateQuery = {};
          updateQuery["response.portfolio.plus.photo"] = new Date();

          /**
           * 신청자 정보를 업데이트합니다.
           * `updateAspirant` 메서드를 사용해 신청자 정보를 업데이트하고,
           * 'response.portfolio.plus.photo' 항목에 새로운 날짜를 추가합니다.
           */
          await back.updateAspirant([whereQuery, updateQuery], { selfMongo });

          /**
           * 신청자에게 카카오톡 알림톡을 전송합니다.
           * 신청자의 이름(name)과 전화번호(phone)를 사용하여 알림톡을 전송하며,
           * 신청자의 고유 ID(aspid)를 포함한 설정 확인 경로를 알림톡 메시지로 보냅니다.
           */
          await kakao.sendTalk("aspirantSettingConfirm", name, phone, {
            client: name, // 신청자의 이름을 'client'로 전송합니다.
            host: address.frontinfo.host, // 호스트 정보를 알림에 포함시킵니다.
            path: "aspsetting", // 알림톡에서 설정 경로를 지정합니다.
            aspid: aspid, // 신청자의 고유 ID를 전달합니다.
          });

          /**
           * 최종적으로 신청자의 ID(aspid)를 응답으로 반환합니다.
           * 이를 통해 클라이언트는 신청자의 고유 ID를 확인할 수 있습니다.
           */
          res.send(JSON.stringify({ aspid }));
    
        } else {
          throw new Error("invalid mode");
        }
    
      } catch (e) {
        // 오류 발생 시 로그에 기록하고 클라이언트에 오류 메시지를 응답
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json"); // 오류 응답도 JSON 형식으로 설정
        res.send(JSON.stringify({ error: e.message })); // 오류 메시지 반환
      }
    });
    
    /**
     * @route POST /aspirantDocuments
     * @description 디자이너 신청자가 행정 서류를 업로드했을 때 처리하는 라우터입니다.
     * @param {object} req - 클라이언트 요청 객체. 요청 본문에 aspid가 필수로 포함되어야 합니다.
     * @param {object} res - 서버 응답 객체. 성공 시 메시지 'done'을 JSON 형식으로 반환합니다.
     */

    router.post([ "/aspirantDocuments" ], async function (req, res) {
      // 응답 헤더 설정: JSON 형식으로 응답을 보내며 모든 도메인에서 접근 가능하게 함.
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });

      // 필요한 인스턴스 선언
      const back = instance.back;
      const address = instance.address;
      const kakao = instance.kakao;

      try {
        // 필수 데이터 aspid가 없을 경우 예외 처리
        if (req.body.aspid === undefined) {
          throw new Error("invalid post");  // 필수 파라미터가 없으면 에러 발생
        }

        // MongoDB 인스턴스와 요청에서 aspid 추출
        const selfMongo = instance.mongo;
        const { aspid } = equalJson(req.body);

        // 신청자 정보 조회
        const [ aspirant ] = await back.getAspirantsByQuery({ aspid }, { selfMongo });

        let whereQuery, updateQuery;

        // 신청자 정보 업데이트 쿼리 작성: 서류 제출 날짜와 상태 업데이트
        whereQuery = { aspid };
        updateQuery = {};
        updateQuery["submit.documents.date"] = new Date();  // 서류 제출 날짜를 현재 시간으로 설정
        updateQuery["submit.documents.boo"] = true;  // 서류 제출 상태를 true로 설정

        // 신청자 정보를 업데이트
        await back.updateAspirant([ whereQuery, updateQuery ], { selfMongo });

        // 신청자에게 카카오톡 알림 전송
        await kakao.sendTalk("aspirantNoticeComplete", aspirant.designer, aspirant.phone, {
          client: aspirant.designer,  // 신청자 이름
          host: address.frontinfo.host,  // 호스트 주소
          path: "asppayment",  // 알림에서 열릴 페이지 경로
          aspid: aspid,  // 신청자 ID
        });

        // 신청서류 업로드 완료 메시지를 슬랙 채널에 전송
        await messageSend({
          text: aspirant.designer + " 디자이너 신청자님이 행정 서류를 업로드하셨습니다!",
          channel: "#301_apply",  // 알림이 전송될 채널
          voice: true,  // 음성 알림 여부
        });

        // 최종 응답 전송: 'done' 메시지를 JSON 형식으로 반환
        res.send(JSON.stringify({ message: "done" }));
      } catch (e) {
        // 에러 발생 시 로그로 기록하고 클라이언트에 에러 메시지 전송
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /aspirantPayment
     * @description 디자이너 신청자의 결제 처리 및 관련 알림을 처리하는 라우터입니다.
     * @param {object} req - 클라이언트 요청 객체. aspid, mode, status 필수.
     * @param {object} res - 서버 응답 객체. 결제 완료 후 JSON 형태로 응답.
     */
    router.post([ "/aspirantPayment" ], async function (req, res) {
      // 응답 헤더 설정: JSON 형식으로 응답을 보내며 모든 도메인에서 접근 가능하게 함.
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });

      // 필요한 인스턴스 및 외부 모듈 선언
      const back = instance.back;
      const address = instance.address;
      const kakao = instance.kakao;

      /**
       * @function paidCompleteFunc
       * @description 결제 완료 후 신청자에게 알림을 보내고 관련 설정을 업데이트하는 함수
       * @param {object} aspirant - 신청자 정보 객체
       * @param {object} logger - 로그 객체
       */
      const paidCompleteFunc = async (aspirant, logger) => {
        try {
          // 2초 대기 후 신청자 정보로 알림 전송
          await sleep(2000);
          await requestSystem("https://" + address.secondinfo.host + ":3003/noticeAspirantConsole", {
            mode: "send",
            aspid: aspirant.aspid,
            designer: aspirant.designer,
            phone: aspirant.phone,
            type: "setting",
          }, {
            headers: { "Content-Type": "application/json" },
          });
          // 추가 0.5초 대기 후 다른 알림 전송
          await sleep(500);
          await requestSystem("https://" + address.secondinfo.host + ":3003/noticeAspirantCommon", {
            aspid: aspirant.aspid,
            value: "default",
            mode: "send",
          }, {
            headers: { "Content-Type": "application/json" },
          });
        } catch (e) {
          console.log(e);  // 에러 발생 시 콘솔에 출력
        }
      };

      try {
        // 필수 데이터가 없을 경우 에러 처리
        if (req.body.aspid === undefined || req.body.mode === undefined || req.body.status === undefined) {
          throw new Error("invalid post");  // 필수 파라미터가 없을 경우 예외 처리
        }

        // MongoDB 인스턴스와 요청에서 필요한 데이터 추출
        const selfMongo = instance.mongo;
        const { aspid, mode, status } = equalJson(req.body);
        
        // 신청자 정보 가져오기
        const [ aspirant ] = await back.getAspirantsByQuery({ aspid }, { selfMongo });

        let whereQuery, updateQuery;
        let paidComplete = false;  // 결제 완료 여부 초기화

        // 결제 모드가 'card'일 때 처리
        if (mode === "card") {
          whereQuery = { aspid };
          updateQuery = {};
          updateQuery["submit.registration.date"] = new Date();  // 등록 날짜 설정
          updateQuery["submit.registration.boo"] = true;  // 등록 상태를 true로 설정
          updateQuery["meeting.status"] = "등록 완료";  // 미팅 상태 업데이트
          updateQuery["meeting.common.status"] = "미팅 조율";  // 미팅 조율 상태로 설정

          // 신청자 정보를 업데이트
          await back.updateAspirant([ whereQuery, updateQuery ], { selfMongo });

          // 결제 완료 알림 전송
          await messageSend({
            text: aspirant.designer + " 디자이너 신청자님이 디자이너 등록비를 카드 결제하셨습니다!",
            channel: "#301_apply",  // 알림 채널
            voice: true,  // 음성 알림 여부
          });
          await kakao.sendTalk("aspirantPaymentComplete", aspirant.designer, aspirant.phone, {
            client: aspirant.designer  // 카카오톡 알림 전송
          });
          paidComplete = true;  // 결제 완료 상태로 변경

        } else if (mode === "vbank") {  // 결제 모드가 'vbank'일 때 처리
          if (/ready/gi.test(status)) {
            // 가상계좌 생성 단계에서는 신청자에게 가상계좌 정보를 전송
            const { data } = equalJson(req.body);
            await kakao.sendTalk("designerAccount", aspirant.designer, aspirant.phone, {
              designer: aspirant.designer,
              goodName: data.name,
              bankName: data.vbank_name,
              account: data.vbank_num,
              to: data.vbank_holder,
              amount: (data.paid_amount === undefined || Number.isNaN(Number(data.paid_amount))) ? data.amount : data.paid_amount,  // 결제 금액 처리
            });
            paidComplete = false;  // 결제 완료 상태는 아님

          } else if (/paid/gi.test(status)) {
            // 무통장 입금 완료 시 상태 업데이트
            whereQuery = { aspid };
            updateQuery = {};
            updateQuery["submit.registration.date"] = new Date();  // 등록 날짜 업데이트
            updateQuery["submit.registration.boo"] = true;  // 등록 상태 true로 설정
            updateQuery["meeting.status"] = "등록 완료";  // 미팅 상태 업데이트
            updateQuery["meeting.common.status"] = "미팅 조율";  // 미팅 조율 상태로 설정

            // 신청자 정보를 업데이트
            await back.updateAspirant([ whereQuery, updateQuery ], { selfMongo });
            
            // 무통장 입금 완료 알림 전송
            await messageSend({
              text: aspirant.designer + " 디자이너 신청자님이 디자이너 등록비를 무통장 입금하셨습니다!",
              channel: "#301_apply",  // 알림 채널
              voice: true,  // 음성 알림 여부
            });
            await kakao.sendTalk("aspirantPaymentComplete", aspirant.designer, aspirant.phone, {
              client: aspirant.designer  // 카카오톡 알림 전송
            });
            paidComplete = true;  // 결제 완료 상태로 변경
          }
        } else {
          throw new Error("invalid mode");  // 유효하지 않은 결제 모드 처리
        }

        // 결제가 완료되었으면 추가 처리 진행
        if (paidComplete) {
          paidCompleteFunc(aspirant, logger).catch((err) => {
            // 에러 발생 시 로그 기록
            logger.error(err, req).catch((e) => { console.log(e); });
          });
        }

        // 최종 응답 전송
        res.send(JSON.stringify({ message: "done" }));
      } catch (e) {
        // 에러가 발생할 경우 이를 로그로 기록하고 클라이언트에 에러 응답 전송
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /getDesignerGhost
     * @description 디자이너의 고스트 데이터를 가져오는 라우터입니다.
     * @param {object} req - 클라이언트 요청 객체.
     * @param {object} res - 서버 응답 객체.
     */
    router.post([ "/getDesignerGhost" ], async function (req, res) {
      // 응답 헤더 설정: JSON 형식 응답, CORS 허용
      res.set({
        "Content-Type": "application/json", // 응답 데이터 형식을 JSON으로 설정
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서 접근 허용
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용할 HTTP 메서드 설정
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용할 요청 헤더 설정
      });

      try {
        // 요청 바디에서 디자이너 ID가 없는 경우 오류 발생
        if (req.body.desid === undefined) {
          throw new Error("must be desid"); // desid 필수 값이 없을 때 오류 처리
        }

        // 요청 바디에서 desid 값을 추출
        const { desid } = req.body;

        // 결과 변수 선언
        let result, final, tempArr, tempObj;
        let contentsResponse;

        // 외부 시스템에 요청을 보내어 콘텐츠 데이터를 가져옴
        contentsResponse = await requestSystem("https://" + address.contentsinfo.host + ":3000/foreContents", { mode: "get", desid }, { headers: { "Content-Type": "application/json" } });

        // 콘텐츠 데이터가 배열인지 확인하고, 아니면 빈 배열로 설정
        if (!Array.isArray(contentsResponse.data)) {
          result = [];
        } else {
          result = contentsResponse.data; // 배열일 경우 콘텐츠 데이터를 결과로 설정
        }

        // 최종 결과를 저장할 배열 초기화
        final = [];

        // 결과 배열을 순회하며 forecast 데이터를 처리
        for (let { forecast } of result) {
          tempArr = []; // 각 forecast마다 임시 배열 초기화

          // forecast 내부의 file과 gs 데이터를 처리
          for (let { file, gs } of forecast) {
            tempObj = {}; // 임시 객체 생성
            tempObj.link = file; // 파일 링크를 임시 객체에 저장
            tempObj.sgTrue = gs; // gs 값을 임시 객체에 저장
            tempArr.push(tempObj); // 임시 객체를 임시 배열에 추가
          }

          final.push(tempArr); // 처리된 임시 배열을 최종 결과 배열에 추가
        }

        // 요청 바디의 mode 값에 따라 응답 처리
        if (req.body.mode === undefined || req.body.mode === null || req.body.mode === "list") {
          // mode가 없거나 "list"인 경우 최종 결과 배열을 응답
          res.send(JSON.stringify(final));
        } else if (req.body.mode === "full") {
          // mode가 "full"인 경우 전체 result 데이터를 응답
          res.send(JSON.stringify(result));
        }

      } catch (e) {
        // 오류 발생 시 로그에 기록하고 클라이언트에 오류 메시지를 응답
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json"); // 오류 응답도 JSON 형식으로 설정
        res.send(JSON.stringify({ error: e.message })); // 오류 메시지 반환
      }
    });
    
    /**
     * @description 웹훅을 통해 결제 정보를 처리하는 라우터입니다. 결제 완료 시 클라이언트 정보와 프로젝트 상태를 업데이트하며, 결제 영수증 정보를 전송합니다.
     * @route POST /webHookPayment
     * @param {Object} req - 클라이언트의 결제 정보를 담은 요청 객체.
     * @param {Object} res - 서버 응답 객체.
     */
    router.post([ "/webHookPayment" ], async function (req, res) {
      // 응답의 Content-Type을 JSON으로 설정.
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        // MongoDB 인스턴스 가져오기.
        const selfMongo = instance.mongo;

        // 요청에서 결제 관련 정보 추출.
        const impId = req.body.imp_uid; // 결제 ID
        const oid = req.body.merchant_uid; // 상점 주문 ID
        const mid = address.officeinfo.inicis.mid; // 결제 MID (Merchant ID)
        const status = req.body.status; // 결제 상태
    
        // 결제 상태가 문자열인지 확인.
        if (typeof status === "string") {
          // 결제 상태가 'paid'라면 결제 성공 처리.
          if (/paid/gi.test(status) || /Paid/gi.test(status)) {
            // 결제 아이디가 존재하고 tx_id가 없는 경우 처리.
            if (req.body.imp_uid !== undefined && req.body.tx_id === undefined) {
              if (!/mini_/g.test(oid) && !/dreg_/g.test(oid)) {
    
                /**
                 * @description Iamport API를 통해 결제 정보를 가져와 청구서를 업데이트하는 코드입니다. 결제 정보와 프로젝트 상태를 확인 후, 관련 청구서를 업데이트하고 전송합니다.
                 * @param {string} impId - Iamport에서 제공된 결제 UID.
                 * @param {string} oid - 상점 주문 ID.
                 * @param {string} mid - 상점 ID (Merchant ID).
                 * @param {string} status - 결제 상태.
                 */
                const bill = new BillMaker();

                // Iamport API를 사용하여 액세스 토큰을 요청.
                const { data: { response: { access_token: accessToken } } } = 
                  (await requestSystem("https://api.iamport.kr/users/getToken", {
                    imp_key: address.officeinfo.import.key,
                    imp_secret: address.officeinfo.import.secret
                  }, { headers: { "Content-Type": "application/json" } }));

                // 결제 ID로 Iamport API에서 결제 데이터를 가져옴.
                const { data: { response: paymentData } } = await requestSystem("https://api.iamport.kr/payments/" + impId, {}, {
                  method: "get",
                  headers: { "Authorization": accessToken }
                });

                // 결제 정보에서 필요한 데이터 추출.
                const { buyer_tel, paid_at } = paymentData;
                const today = new Date();

                // 결제 데이터를 로깅.
                logger.alert(JSON.stringify(paymentData, null, 2)).catch((e) => { console.log(e); });

                // 청구서 데이터 변환.
                const convertingData = {
                  goodName: paymentData.name, // 상품명.
                  goodsName: paymentData.name, // 상품명.
                  resultCode: (paymentData.status.trim() === "paid" ? "0000" : "4000"), // 결제 성공 여부.
                  resultMsg: (paymentData.status.trim() === "paid" ? "성공적으로 처리 하였습니다." : "결제 실패 : " + String(paymentData.fail_reason)), // 결제 결과 메시지.
                  tid: paymentData.pg_tid, // PG사에서 제공한 거래 ID.
                  payMethod: "CARD", // 결제 수단.
                  applDate: `${String(today.getFullYear())}${zeroAddition(today.getMonth() + 1)}${zeroAddition(today.getDate())}${zeroAddition(today.getHours())}${zeroAddition(today.getMinutes())}${zeroAddition(today.getSeconds())}`, // 결제 일시.
                  mid: mid, // 상점 MID.
                  MOID: oid, // 상점 주문 ID.
                  TotPrice: String(paymentData.amount), // 총 결제 금액.
                  buyerName: paymentData.buyer_name, // 구매자 이름.
                  CARD_BankCode: paymentData.card_code, // 카드 코드.
                  CARD_Num: paymentData.card_number, // 카드 번호.
                  CARD_ApplPrice: String(paymentData.amount), // 결제 금액.
                  CARD_Code: paymentData.card_code, // 카드 코드.
                  vactBankName: paymentData.card_name, // 카드사 이름.
                  payDevice: "MOBILE", // 결제 디바이스.
                  P_FN_NM: paymentData.card_name // 카드사 이름.
                };

                // 클라이언트 정보를 전화번호로 조회.
                const clients = await back.getClientsByQuery({ phone: buyer_tel }, { selfMongo });
                let requestNumber, projects;

                // 클라이언트가 존재할 경우, 프로젝트 정보를 가져옴.
                if (clients.length > 0) {
                  const [ client ] = clients;

                  // 결제 항목이 잔금인지 여부에 따라 프로젝트를 필터링.
                  if (/잔금/gi.test(paymentData.name)) {
                    projects = (await back.getProjectsByQuery({ 
                      $and: [ { cliid: client.cliid }, { "process.status": { $regex: "^[대진]" } } ] 
                    }, { selfMongo })).toNormal().filter((p) => p.desid.trim() !== "");
                  } else {
                    projects = (await back.getProjectsByQuery({
                      $and: [ { cliid: client.cliid }, { "process.status": { $regex: "^[대진]" } } ]
                    }, { selfMongo })).toNormal();
                  }

                  // 프로젝트가 존재할 경우, 결제 금액에 가장 근접한 프로젝트를 선택.
                  if (projects.length > 0) {
                    projects.sort((a, b) => {
                      return Math.abs((a.process.contract.remain.calculation.amount.consumer - a.process.contract.first.calculation.amount) - paymentData.amount) - 
                            Math.abs((b.process.contract.remain.calculation.amount.consumer - b.process.contract.first.calculation.amount) - paymentData.amount);
                    });

                    const [ project ] = projects;
                    let bills;

                    // 프로젝트에 해당하는 청구서를 조회.
                    bills = await bill.getBillsByQuery({
                      $and: [
                        { "links.proid": project.proid }, // 프로젝트 ID.
                        { "links.cliid": client.cliid }, // 클라이언트 ID.
                        { "links.method": project.service.online ? "online" : "offline" } // 결제 방식.
                      ]
                    });

                    // 청구서가 존재하지 않으면 다시 조회.
                    if (bills.length === 0) {
                      bills = await bill.getBillsByQuery({
                        $and: [
                          { "links.proid": project.proid }, // 프로젝트 ID.
                          { "links.cliid": client.cliid } // 클라이언트 ID.
                        ]
                      });
                    }

                    // 청구서가 존재하면 해당 청구서를 업데이트.
                    if (bills.length > 0) {
                      const [ thisBill ] = bills;
                      requestNumber = 0;

                      // 청구서에서 요청 항목을 확인.
                      for (let i = 0; i < thisBill.requests.length; i++) {
                        if (convertingData.goodName === thisBill.requests[i].name) {
                          requestNumber = i;
                          break;
                        }
                      }

                      // 청구서 업데이트를 위한 API 요청.
                      await requestSystem("https://" + address.officeinfo.host + ":3002/ghostClientBill", {
                        bilid: thisBill.bilid, // 청구서 ID.
                        requestNumber, // 요청 번호.
                        data: convertingData // 변환된 결제 데이터.
                      }, { headers: { "Content-Type": "application/json" } });

                    } else {
                      // 청구서를 찾을 수 없는 경우 오류 처리.
                      throw new Error("cannot find bills (from links.proid and links.cliid)");
                    }
                  }
                }
    
              } else if (/dreg_/g.test(oid)) {

                /**
                 * @description Iamport API를 통해 결제 정보를 가져오고, 지원자 결제 상태를 업데이트하는 코드입니다.
                 * @param {string} impId - Iamport에서 제공된 결제 UID.
                 * @param {string} oid - 주문 ID. 이 값에서 지원자 ID를 추출.
                 * @param {string} aspid - 지원자 ID.
                 */
                const { data: { response: { access_token: accessToken } } } = 
                  // Iamport API를 사용해 액세스 토큰을 요청. 이 토큰은 결제 정보 요청 시 사용됨.
                  (await requestSystem("https://api.iamport.kr/users/getToken", {
                    imp_key: address.officeinfo.import.key, // Iamport API 키.
                    imp_secret: address.officeinfo.import.secret // Iamport API 시크릿.
                  }, { headers: { "Content-Type": "application/json" } }));

                // 결제 UID로 Iamport API를 호출해 결제 데이터를 가져옴.
                const { data: { response: paymentData } } = await requestSystem("https://api.iamport.kr/payments/" + impId, {}, {
                  method: "get",
                  headers: { "Authorization": accessToken } // 액세스 토큰을 사용해 결제 데이터를 요청.
                });

                // oid를 "_"로 분리하여 지원자 ID(asid)를 추출.
                const [ oidConst, aspid0, aspid1 ] = oid.split("_");
                const aspid = aspid0 + "_" + aspid1; // 지원자 ID 조합.

                // 결제 수단이 카드일 경우.
                if (paymentData.pay_method === "card") {
                  // 카드 결제 완료 후, 지원자의 결제 상태를 업데이트하기 위한 API 호출.
                  await requestSystem("https://" + address.officeinfo.host + ":3002/aspirantPayment", {
                    aspid, // 지원자 ID.
                    mode: "card", // 결제 방식: 카드.
                    status: "paid" // 결제 상태: 완료.
                  }, { headers: { "Content-Type": "application/json" } });

                } else {
                  // 가상계좌 입금일 경우.
                  await requestSystem("https://" + address.officeinfo.host + ":3002/aspirantPayment", {
                    aspid, // 지원자 ID.
                    mode: "vbank", // 결제 방식: 가상계좌.
                    status: "paid" // 결제 상태: 완료.
                  }, { headers: { "Content-Type": "application/json" } });
                }
              }

            } else {
              if (req.body.payment_id !== undefined) {
                
                /**
                 * @description PortOne API를 사용해 결제 정보를 가져오고, 결제 데이터 처리 후 고객 및 프로젝트 정보에 따라 결제를 기록하는 함수입니다.
                 * @param {string} oid - 주문 ID.
                 */
                const oid = req.body.payment_id; // 클라이언트로부터 받은 주문 ID.
                const bill = new BillMaker(); // BillMaker 인스턴스 생성.
                const url = "https://api.portone.io"; // PortOne API URL.
                const today = new Date(); // 현재 날짜를 저장.
                let config, accessToken, accessTokenResponse;
                let getPaymentInfoResponse; // 결제 정보 응답 데이터.
                let getPaymentInfoConfig; // 결제 정보 요청 설정.
                let paymentData; // 결제 데이터.
                let convertingData; // 변환된 결제 데이터.
                let buyer_tel; // 구매자 전화번호.
                let responseFromPG; // PG사 응답 데이터.
                let tempMatrix; // 임시 매트릭스 데이터.

                // 요청 설정 구성.
                config = { headers: { "Content-Type": "application/json" } };

                // PortOne API를 사용해 액세스 토큰을 요청.
                accessTokenResponse = await requestSystem(url + "/login/api-secret", { apiSecret: portoneAPIKey }, config);
                accessToken = accessTokenResponse.data.accessToken; // 토큰 값 저장.
                config.headers["Authorization"] = "Bearer " + accessToken; // 요청에 액세스 토큰 추가.

                // 결제 정보 요청 설정 복사 및 메서드 정의.
                getPaymentInfoConfig = objectDeepCopy(config);
                getPaymentInfoConfig.method = "get";

                // 주문 ID를 기반으로 결제 정보를 요청.
                getPaymentInfoResponse = await requestSystem(url + "/payments/" + oid, { storeId }, getPaymentInfoConfig);
                paymentData = getPaymentInfoResponse.data; // 결제 데이터를 저장.

                try {
                  // PG사로부터 받은 응답 데이터를 파싱하여 저장.
                  responseFromPG = JSON.parse(paymentData.pgResponse);
                } catch {
                  try {
                    // 만약 JSON 파싱에 실패할 경우, 문자열을 매트릭스로 변환하여 key-value 쌍으로 저장.
                    tempMatrix = paymentData.pgResponse.split("&").map((str) => { return str.split("=") });
                    responseFromPG = {};
                    for (let [key, value] of tempMatrix) {
                      responseFromPG[key] = value; // 매트릭스를 객체 형태로 변환.
                    }
                  } catch {
                    responseFromPG = {}; // 실패 시 빈 객체로 설정.
                  }
                }
    
                // 사용자 핸드폰 번호 하이픈 추가
                buyer_tel = autoHypenPhone(paymentData.customer.phoneNumber); // 결제 고객의 전화번호를 하이픈 형식으로 변환.

                // 결제 수단이 카드인 경우 처리.
                if (/card/gi.test(paymentData.method.type)) {
                  // 카드 결제 관련 데이터를 변환하여 `convertingData` 객체에 저장.
                  convertingData = {
                    goodName: paymentData.orderName, // 상품명.
                    goodsName: paymentData.orderName, // 상품명.
                    resultCode: ((typeof paymentData.status === "string" && paymentData.status.trim() === "PAID") ? "0000" : "4000"), // 결제 성공 여부에 따라 결과 코드 설정.
                    resultMsg: ((typeof paymentData.status === "string" && paymentData.status.trim() === "PAID") ? "성공적으로 처리 하였습니다." : "결제 실패"), // 결제 상태에 따른 메시지 설정.
                    tid: paymentData.pgTxId, // 결제 트랜잭션 ID.
                    payMethod: "CARD", // 결제 방식은 카드로 설정.
                    applDate: `${String(today.getFullYear())}${zeroAddition(today.getMonth() + 1)}${zeroAddition(today.getDate())}${zeroAddition(today.getHours())}${zeroAddition(today.getMinutes())}${zeroAddition(today.getSeconds())}`, // 결제 승인 날짜 및 시간 정보.
                    mid: mid, // 상점 ID.
                    MOID: paymentData.id, // 주문 ID.
                    TotPrice: String(paymentData.amount.total), // 총 결제 금액.
                    buyerName: paymentData.customer.name, // 구매자 이름.
                    CARD_BankCode: (typeof responseFromPG.CARD_BankCode === "string") ? responseFromPG.CARD_BankCode : responseFromPG.P_CARD_ISSUER_CODE, // 카드 발급사 코드.
                    CARD_Num: paymentData.method.card.number, // 카드 번호.
                    CARD_ApplPrice: String(paymentData.amount.total), // 카드 결제 금액.
                    CARD_Code: (typeof responseFromPG.CARD_Code === "string") ? responseFromPG.CARD_Code : responseFromPG.P_CARD_PURCHASE_CODE, // 카드 구매 코드.
                    vactBankName: paymentData.method.card.name, // 카드 발급사 이름.
                    payDevice: "MOBILE", // 결제 기기.
                    P_FN_NM: paymentData.method.card.name, // 카드 발급사 이름.
                  };
                } else {
                  // 카드 이외의 결제 수단인 경우 처리.
                  convertingData = {
                    goodName: paymentData.orderName, // 상품명.
                    goodsName: paymentData.orderName, // 상품명.
                    resultCode: ((typeof paymentData.status === "string" && paymentData.status.trim() === "PAID") ? "0000" : "4000"), // 결제 성공 여부에 따른 결과 코드.
                    resultMsg: ((typeof paymentData.status === "string" && paymentData.status.trim() === "PAID") ? "성공적으로 처리 하였습니다." : "결제 실패"), // 결제 상태에 따른 메시지.
                    tid: paymentData.pgTxId, // 결제 트랜잭션 ID.
                    payMethod: paymentData.method.type, // 결제 방식.
                    applDate: `${String(today.getFullYear())}${zeroAddition(today.getMonth() + 1)}${zeroAddition(today.getDate())}${zeroAddition(today.getHours())}${zeroAddition(today.getMinutes())}${zeroAddition(today.getSeconds())}`, // 결제 승인 날짜 및 시간.
                    mid: mid, // 상점 ID.
                    MOID: paymentData.id, // 주문 ID.
                    TotPrice: String(paymentData.amount.total), // 총 결제 금액.
                    buyerName: paymentData.customer.name, // 구매자 이름.
                    vactBankName: paymentData.method.bank, // 은행 이름 (무통장입금 등).
                    payDevice: "MOBILE", // 결제 기기.
                    P_FN_NM: paymentData.method.bank, // 은행 이름.
                    CARD_BankCode: paymentData.method.bank, // 결제 은행 코드.
                  };
                }
    
                // 고객 정보를 전화번호로 조회
                const clients = await back.getClientsByQuery({ phone: buyer_tel }, { selfMongo });
                let requestNumber, projects;
                if (clients.length > 0) {
                  const [ client ] = clients; // 조회된 고객 중 첫 번째 고객 선택

                  // 잔금 결제인지 확인
                  if (/잔금/gi.test(paymentData.orderName)) {
                    // '잔금' 결제일 경우, 특정 조건에 맞는 프로젝트들 필터링
                    projects = (await back.getProjectsByQuery({
                      $and: [
                        { cliid: client.cliid },
                        { "process.status": { $regex: "^[대진]" } } // '대진' 상태인 프로젝트만 선택
                      ]
                    }, { selfMongo }))
                    .toNormal()
                    .filter((p) => { return p.desid.trim() !== "" }); // 디자이너가 배정된 프로젝트만 선택
                  } else {
                    // 잔금 결제가 아닐 경우에도 동일한 조건으로 프로젝트 조회
                    projects = (await back.getProjectsByQuery({
                      $and: [
                        { cliid: client.cliid },
                        { "process.status": { $regex: "^[대진]" } } // '대진' 상태인 프로젝트만 선택
                      ]
                    }, { selfMongo })).toNormal();
                  }

                  // 프로젝트가 있는 경우
                  if (projects.length > 0) {
                    // 결제 금액 차이에 따라 프로젝트를 정렬 (가장 가까운 금액 차이를 우선 선택)
                    projects.sort((a, b) => {
                      return Math.abs((a.process.contract.remain.calculation.amount.consumer - a.process.contract.first.calculation.amount) - paymentData.amount) 
                            - Math.abs((b.process.contract.remain.calculation.amount.consumer - b.process.contract.first.calculation.amount) - paymentData.amount);
                    });

                    const [ project ] = projects; // 첫 번째 프로젝트 선택
                    let bills;

                    // 프로젝트와 연관된 청구서 조회
                    bills = await bill.getBillsByQuery({
                      $and: [
                        { "links.proid": project.proid }, // 프로젝트 ID
                        { "links.cliid": client.cliid },  // 고객 ID
                        { "links.method": project.service.online ? "online" : "offline" } // 온라인/오프라인 여부
                      ]
                    });

                    // 청구서가 없을 경우, 프로젝트 ID와 고객 ID로 다시 조회
                    if (bills.length === 0) {
                      bills = await bill.getBillsByQuery({
                        $and: [
                          { "links.proid": project.proid },
                          { "links.cliid": client.cliid }
                        ]
                      });
                    }

                    // 청구서가 존재하는 경우
                    if (bills.length > 0) {
                      const [ thisBill ] = bills; // 첫 번째 청구서 선택
                      requestNumber = 0;

                      // 요청 이름과 일치하는 청구서 요청 항목 찾기
                      for (let i = 0; i < thisBill.requests.length; i++) {
                        if (convertingData.goodName === thisBill.requests[i].name) {
                          requestNumber = i;
                          break;
                        }
                      }

                      // Ghost Client Bill API를 호출하여 청구서 데이터 업데이트
                      await requestSystem("https://" + address.officeinfo.host + ":3002/ghostClientBill", {
                        bilid: thisBill.bilid, // 청구서 ID
                        requestNumber, // 청구서 요청 번호
                        data: convertingData // 변환된 결제 데이터
                      }, { headers: { "Content-Type": "application/json" } });
                    } else {
                      // 청구서를 찾지 못한 경우 오류 처리
                      throw new Error("cannot find bills (from links.proid and links.cliid)");
                    }
                  }
                }
    
              }
            }
          }
        }
    
        res.send(JSON.stringify({ "message": "ok" }));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @description Google 웹훅을 처리하는 라우터입니다. MongoDB에 데이터를 업데이트하거나 읽는 등의 작업을 수행합니다.
     * @route POST /webHookGoogle
     * @param {Object} req - 클라이언트 요청 객체. 'who', 'where', 'mode', 'collection', 'queries' 등이 포함됩니다.
     * @param {Object} res - 서버 응답 객체.
     */
    router.post([ "/webHookGoogle" ], async function (req, res) {
      // MongoDB 및 기타 인스턴스를 가져옵니다.
      const back = instance.back;  // 백엔드 MongoDB 인스턴스를 가져옴.
      const { mongo, mongoconsoleinfo, requestSystem, messageLog } = instance.mother;  // Mother에서 필요한 메서드와 변수를 가져옴.
      
      // 보안 키값 설정 (이 키값을 통해 적절한 요청인지 확인함).
      const uragenGhostFinalRandomAccessKeyArraySubwayHomeLiaisonStyle = "a19OyoZjf9xQJXykapple3kE5ySgBW39IjxQJXyk3homeliaisonkE5uf9uuuySgBW3ULXHF1CdjxGGPCQJsubwayXyk3kE5ySgBW3f9y2Y2lotionpuk0dQF9ruhcs";
      
      // 작업 대상 컬렉션 목록. 이 컬렉션만 업데이트/읽기 등의 작업을 허용.
      const coreTargets = [ "designer", "project", "contents", "service" ];

      try {
          let boo;  // 유효성 검사 플래그.
          // 응답의 Content-Type을 JSON으로 설정합니다.
          res.set({ "Content-Type": "application/json" });
          
          // 요청이 유효한지 확인 (who, where, 키값 검증).
          if (req.body.who === "uragen" && req.body.where === "homeliaison" && req.body.uragenGhostFinalRandomAccessKeyArraySubwayHomeLiaisonStyle === uragenGhostFinalRandomAccessKeyArraySubwayHomeLiaisonStyle) {
              
              // 모드가 'read', 'update', 'create'인지 확인합니다.
              if (req.body.mode === "read" || req.body.mode === "update" || req.body.mode === "create") {
                  
                  // collection 값이 undefined 또는 null인지 확인하고 에러 처리.
                  if (req.body.collection === undefined || req.body.collection === null) {
                      res.send(JSON.stringify({ "message": "error" }));
                  
                  // collection이 문자열인지 확인.
                  } else {
                      if (typeof req.body.collection !== "string") {
                          res.send(JSON.stringify({ "message": "error" }));
                      
                      // queries가 배열인지 확인.
                      } else {
                          if (Array.isArray(req.body.queries)) {
                              boo = true;
                              
                              // 배열 안의 각 객체의 유효성 검사 (whereQuery, updateQuery가 모두 존재하고 객체인지 확인).
                              for (let obj of req.body.queries) {
                                  if (typeof obj !== "object") {
                                      boo = false;
                                  } else {
                                      if (obj.whereQuery === undefined || obj.updateQuery === undefined) {
                                          boo = false;
                                      } else {
                                          if (typeof obj.whereQuery !== "object" || typeof obj.updateQuery !== "object") {
                                              boo = false;
                                          } else {
                                              boo = true;
                                          }
                                      }
                                  }
                              }
                              
                              // 유효성 검사를 통과했을 경우.
                              if (boo) {
                                  // coreTargets 목록에 해당하는 컬렉션이라면 instance.mongo를 사용하여 업데이트 수행.
                                  if (coreTargets.includes(req.body.collection)) {
                                      for (let { whereQuery, updateQuery } of req.body.queries) {
                                          await back.mongoUpdate(req.body.collection, [ whereQuery, updateQuery ], { selfMongo: instance.mongo });
                                          console.log(whereQuery, updateQuery);  // 로그에 업데이트된 쿼리를 출력.
                                      }
                                  
                                  // coreTargets 외의 컬렉션에 대해서는 mongoconsoleinfo를 이용하여 MongoDB 연결.
                                  } else {
                                      const selfMongo = new mongo(mongoconsoleinfo);  // MongoDB 연결을 위한 새로운 인스턴스 생성.
                                      await selfMongo.connect();  // 데이터베이스 연결.
                                      
                                      for (let { whereQuery, updateQuery } of req.body.queries) {
                                          await back.mongoUpdate(req.body.collection, [ whereQuery, updateQuery ], { selfMongo });
                                      }
                                      
                                      await selfMongo.close();  // 데이터베이스 연결 종료.
                                  }

                                  // 업데이트 성공 메시지를 로그에 기록하고, 성공 응답 전송.
                                  messageLog("시트로부터의 업데이트 감지 : " + req.body.collection).catch((e) => { console.log(e); });
                                  res.send(JSON.stringify({ "message": "ok" }));
                              
                              } else {
                                  // 유효성 검사 실패 시 에러 메시지 전송.
                                  res.send(JSON.stringify({ "message": "error" }));
                              }
                          } else {
                              // queries가 배열이 아닌 경우 에러 메시지 전송.
                              res.send(JSON.stringify({ "message": "error" }));
                          }
                      }
                  }
              } else {
                  // 모드가 'read', 'update', 'create'가 아닌 경우 에러 메시지 전송.
                  res.send(JSON.stringify({ "message": "error" }));
              }
          } else {
              // 유효하지 않은 요청의 경우 에러 메시지 전송.
              res.send(JSON.stringify({ "message": "error" }));
          }
      } catch (e) {
          // 오류 발생 시 에러를 기록하고 에러 메시지 응답.
          logger.error(e, req).catch((e) => { console.log(e); });
          res.set("Content-Type", "application/json");
          res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /generalMongo
     * @description MongoDB 데이터베이스에 대한 일반적인 CRUD 작업을 수행하는 라우터입니다.
     * @param {object} req - 클라이언트 요청 객체. 본문에는 작업 모드(mode), 데이터베이스(db), 컬렉션 이름(collection) 등이 포함됩니다.
     * @param {object} res - 서버 응답 객체. 요청된 CRUD 작업의 결과를 JSON 형식으로 반환합니다.
     */
    router.post([ "/generalMongo" ], async function (req, res) {
      // 응답 헤더에 JSON 형식 및 CORS 설정을 추가합니다.
      res.set({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });

      try {
          // mode가 정의되지 않은 경우 에러를 발생시킵니다.
          if (req.body.mode === undefined) {
              throw new Error("must be mode => [ create, read, update, delete ]");
          }

          // collection이 정의되지 않은 경우 에러를 발생시킵니다.
          if (req.body.collection === undefined) {
              throw new Error("must be collection name");
          }

          // db가 정의되지 않은 경우 에러를 발생시킵니다.
          if (req.body.db === undefined) {
              throw new Error("must be db name => ( [ core, back, mongo ] => instance.mongo or [ sub, local, console ] => instance.mongolocal )");
          }

          // 요청 본문에서 mode, db, collection 값을 추출합니다.
          const { mode, db, collection } = req.body;

          // MongoDB 인스턴스를 저장할 변수를 선언합니다.
          let selfMongo, result;

          // 데이터베이스 선택에 따라 적절한 Mongo 인스턴스를 설정합니다.
          if (db === "core" || db === "back" || db === "mongo") {
              selfMongo = instance.mongo;  // 기본 데이터베이스
          } else if (db === "sub" || db === "local" || db === "console") {
              selfMongo = instance.mongolocal;  // 로컬 데이터베이스
          } else {
              throw new Error("must be db name => ( [ core, back, mongo ] => instance.mongo or [ sub, local, console ] => instance.mongolocal )");
          }

          /**
           * @description 요청된 mode가 "read"일 경우 데이터 조회를 처리합니다.
           */
          if (mode === "read") {
              // whereQuery가 정의되지 않은 경우 에러를 발생시킵니다.
              if (req.body.whereQuery === undefined) {
                  throw new Error("must be whereQuery");
              }

              // whereQuery를 equalJson을 사용해 깊은 복사로 처리합니다.
              whereQuery = equalJson(req.body.whereQuery);

              // 데이터를 조회하는 함수 호출
              result = await back.mongoRead(collection, whereQuery, { selfMongo });

          /**
           * @description 요청된 mode가 "update"일 경우 데이터를 수정합니다.
           */
          } else if (mode === "update") {
              // whereQuery 또는 updateQuery가 정의되지 않은 경우 에러를 발생시킵니다.
              if (req.body.whereQuery === undefined || req.body.updateQuery === undefined) {
                  throw new Error("must be whereQuery and updateQuery");
              }

              // whereQuery 및 updateQuery를 equalJson을 사용해 깊은 복사로 처리합니다.
              whereQuery = equalJson(req.body.whereQuery);
              updateQuery = equalJson(req.body.updateQuery);

              // 먼저 데이터를 읽어온 후, 수정 작업을 수행합니다.
              result = await back.mongoRead(collection, whereQuery, { selfMongo });
              if (result.length !== 0) {
                  await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo });
              }

              // 완료 메시지를 설정합니다.
              result = { message: "done" };

          /**
           * @description 요청된 mode가 "create"일 경우 데이터를 생성합니다.
           */
          } else if (mode === "create") {
              // updateQuery가 정의되지 않은 경우 에러를 발생시킵니다.
              if (req.body.updateQuery === undefined) {
                  throw new Error("must be updateQuery");
              }

              // updateQuery를 equalJson을 사용해 깊은 복사로 처리합니다.
              updateQuery = equalJson(req.body.updateQuery);

              // 데이터를 생성하는 함수 호출
              await back.mongoCreate(collection, updateQuery, { selfMongo });

              // 완료 메시지를 설정합니다.
              result = { message: "done" };

          /**
           * @description 요청된 mode가 "delete"일 경우 데이터를 삭제합니다.
           */
          } else if (mode === "delete") {
              // whereQuery가 정의되지 않은 경우 에러를 발생시킵니다.
              if (req.body.whereQuery === undefined) {
                  throw new Error("must be whereQuery");
              }

              // whereQuery를 equalJson을 사용해 깊은 복사로 처리합니다.
              whereQuery = equalJson(req.body.whereQuery);

              // 데이터를 삭제하는 함수 호출
              await back.mongoDelete(collection, whereQuery, { selfMongo });

              // 완료 메시지를 설정합니다.
              result = { message: "done" };

          } else {
              // 잘못된 mode가 요청된 경우 에러를 발생시킵니다.
              throw new Error("must be mode => [ create, read, update, delete ]" + " this mode => " + mode);
          }

          // 작업이 성공적으로 완료된 경우 결과를 JSON 형식으로 반환합니다.
          res.send(JSON.stringify(result));

      } catch (e) {
          // 에러가 발생한 경우 에러 로그를 기록하고, 클라이언트에게 에러 메시지를 반환합니다.
          logger.error(e, req).catch((e) => { console.log(e); });
          res.set("Content-Type", "application/json");
          res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /makeSchedule, /listSchedule, /updateSchedule, /deleteSchedule
     * @description 일정 관리를 위한 라우터로, 일정 생성, 조회, 수정, 삭제 기능을 처리합니다.
     * @param {object} req - 클라이언트 요청 객체. 본문에는 일정 관련 정보가 포함됩니다.
     * @param {object} res - 서버 응답 객체. 성공 또는 실패 메시지를 JSON 형식으로 반환합니다.
     */
    router.post([ "/makeSchedule", "/listSchedule", "/updateSchedule", "/deleteSchedule" ], async function (req, res) {
      try {
          // 결과 객체를 초기화합니다.
          let resultObj;

          /**
           * @description 요청 URL이 "/makeSchedule"일 경우, 새로운 일정을 생성합니다.
           * 요청 본문에 to(수신인), title(제목), start(시작 시간)이 포함되어야 합니다.
           */
          if (req.url === "/makeSchedule") {
              // 필수 필드가 제공되지 않았을 경우 에러를 발생시킵니다.
              if (req.body.to === undefined || req.body.title === undefined || req.body.start === undefined) {
                  throw new Error("invalid body");
              }

              // 요청 본문에서 필요한 데이터를 추출합니다.
              const { to, title } = req.body;
              const start = new Date(req.body.start.replace(/"/g, ''));  // 시작 시간을 Date 객체로 변환
              const end = (req.body.end !== undefined) ? new Date(req.body.end.replace(/"/g, '')) : null;  // 종료 시간이 있을 경우 변환
              const description = (req.body.description !== undefined) ? req.body.description : "";  // 설명이 있을 경우 설정

              // 일정 생성 로직을 호출하여 결과를 저장합니다.
              resultObj = await calendar.makeSchedule(to, title, description, start, end);

          /**
           * @description 요청 URL이 "/listSchedule"일 경우, 일정 목록을 조회합니다.
           * 본문에 from(시작 날짜)이 포함되어야 하며, 검색어가 있을 경우 search 필드를 통해 검색할 수 있습니다.
           */
          } else if (req.url === "/listSchedule") {
              // 필수 필드가 제공되지 않았을 경우 에러를 발생시킵니다.
              if (req.body.from === undefined) {
                  throw new Error("invalid body");
              }

              // 요청 본문에서 from(조회 시작일)과 search(검색어)를 추출합니다.
              const { from } = req.body;
              const search = (req.body.search !== undefined) ? req.body.search : null;

              // 일정 목록을 조회하는 로직을 호출하여 결과를 저장합니다.
              resultObj = await calendar.listEvents(from, search);

          /**
           * @description 요청 URL이 "/updateSchedule"일 경우, 기존 일정을 수정합니다.
           * 본문에 from(시작 날짜), id(일정 ID), updateQuery(수정할 내용)이 포함되어야 합니다.
           */
          } else if (req.url === "/updateSchedule") {
              // 필수 필드가 제공되지 않았을 경우 에러를 발생시킵니다.
              if (req.body.from === undefined || req.body.id === undefined || req.body.updateQuery === undefined) {
                  throw new Error("invalid body");
              }

              // 요청 본문에서 from, id, updateQuery를 추출합니다.
              const { from, id } = req.body;
              const updateQuery = equalJson(req.body.updateQuery);  // equalJson을 사용하여 깊은 복사 후 처리

              // 일정 수정 로직을 호출합니다.
              await calendar.updateSchedule(from, id, updateQuery);

              // 수정 완료 메시지를 설정합니다.
              resultObj = { "message": "done" };

          /**
           * @description 요청 URL이 "/deleteSchedule"일 경우, 기존 일정을 삭제합니다.
           * 본문에 from(시작 날짜), id(일정 ID)가 포함되어야 합니다.
           */
          } else {
              // 필수 필드가 제공되지 않았을 경우 에러를 발생시킵니다.
              if (req.body.from === undefined || req.body.id === undefined) {
                  throw new Error("invalid body");
              }

              // 요청 본문에서 from, id를 추출합니다.
              const { from, id } = req.body;

              // 일정 삭제 로직을 호출합니다.
              await calendar.deleteSchedule(from, id);

              // 삭제 완료 메시지를 설정합니다.
              resultObj = { "message": "done" };
          }

          // 응답 헤더에 JSON 형식으로 설정하고, 결과를 반환합니다.
          res.set({ "Content-Type": "application/json" });
          res.send(JSON.stringify(resultObj));

      } catch (e) {
          // 에러가 발생한 경우 에러 로그를 기록하고, 클라이언트에게 에러 메시지를 반환합니다.
          logger.error(e, req).catch((e) => { console.log(e); });
          res.set("Content-Type", "application/json");
          res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /parsingAddress
     * @description 주소를 파싱하거나 거리 계산을 수행하는 라우터.
     *              클라이언트 요청에 따라 주소 검증, 거리 계산, 샘플 데이터를 생성합니다.
     * @param {Object} req - 클라이언트 요청 객체, 주소 정보와 모드 등이 포함됩니다.
     * @param {Object} res - 서버 응답 객체, JSON 형식의 데이터를 반환합니다.
     */
    router.post([ "/parsingAddress" ], async function (req, res) {
      // 응답 헤더 설정: JSON 형식과 CORS를 허용하는 설정
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });

      try {
        // 주소 파싱 모듈 및 인스턴스에서 calendar, back 가져오기
        const addressApp = new AddressParser();
        const calendar = instance.calendar;
        const back = instance.back;

        // 요청 바디에서 mode가 정의되지 않았을 경우 오류 처리
        if (req.body.mode === undefined) {
          throw new Error("must be mode => inspection, distance");
        }

        const { mode } = req.body; // 요청 모드 추출
        let result; // 결과를 저장할 변수

        // 주소 검증 모드
        if (mode === "inspection") {
          // addressArr가 요청에 포함되지 않았을 경우 오류 처리
          if (req.body.addressArr === undefined) {
            throw new Error("must be addressArr");
          }

          const addressArr = equalJson(req.body.addressArr); // 요청으로 받은 주소 배열 파싱
          const liteMode = req.body.liteMode === undefined ? false : (typeof req.body.liteMode === "string" ? req.body.liteMode === "true" : req.body.liteMode); // liteMode 설정

          // 주소 배열의 각 요소에서 id와 address가 있는지 확인, 없을 경우 오류 처리
          for (let obj of addressArr) {
            if (obj.id === undefined || obj.address === undefined) {
              throw new Error("invalid address array => [ { id, address }... ]");
            }

            // 주소 검증 함수 호출, 결과 저장
            result = await addressApp.addressInspection(addressArr, liteMode);
          }
        }
        // 거리 계산 모드
        else if (mode === "distance") {
          // 요청 바디에 from 또는 to가 없을 경우 오류 처리
          if (req.body.from === undefined || req.body.to === undefined) {
            throw new Error("must be from, to");
          }

          const { from, to } = req.body; // 출발지와 목적지 추출
          // 거리 계산 함수 호출, MongoDB 정보를 전달하여 결과 계산
          result = await addressApp.getTravelExpenses(from, to, { selfMongo: instance.mongolocal });
        }
        // 샘플 데이터 모드
        else if (mode === "sample" || mode === "samples") {
          // 디자이너 가격 기준 정보를 MongoDB에서 읽어옴
          const priceStandard = await back.mongoRead(`designerPrice`, { key: 33 }, { selfMongo: instance.mongolocal });
          const { travel: { unit, consulting } } = priceStandard[0]; // 이동 및 컨설팅 단가 정보 추출

          let travelSamples_min, temp, amount, tong;
          travelSamples_min = await fileSystem(`readJson`, [ addressApp.samples.travelMin ]); // 최소 여행 샘플 읽기

          // 각 샘플에 대해 비용 계산 및 문자열 변환
          for (let obj of travelSamples_min) {
            temp = (unit.meters * obj.distance * 2) + (unit.seconds * obj.time * 2); // 거리와 시간 기반 비용 계산
            amount = (Math.round(temp / 1000) * 1000) + (consulting.hours * consulting.labor); // 컨설팅 비용 추가
            obj.amount = amount;
            obj.amountString = autoComma(amount) + '원'; // 금액에 쉼표 추가
          }

          tong = { standard: { unit, consulting } }; // 표준 정보 저장

          // 각 디자이너에 대한 샘플 데이터를 tong 객체에 저장
          for (let obj of travelSamples_min) {
            if (tong[obj.desid] === undefined) {
              tong[obj.desid] = {};
              tong[obj.desid].detail = [];
            }
            tong[obj.desid].detail.push(obj);
            tong[obj.desid].designer = obj.designer;
            tong[obj.desid].desid = obj.desid;
            tong[obj.desid].address = obj.from;
          }

          // 디자이너 리스트 생성
          tong.designers = [];
          for (let i in tong) {
            if (i !== "designers" && i !== "standard") {
              tong.designers.push(equalJson(JSON.stringify(tong[i])));
              delete tong[i];
            }
          }

          result = tong; // 최종 결과를 tong 객체에 저장
        }

        // 결과를 클라이언트에 JSON 형식으로 응답
        res.send(JSON.stringify(result));
      } catch (e) {
        // 오류 발생 시 로깅 및 오류 메시지 반환
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /realtimeClient
     * @description 실시간 고객 데이터를 처리하는 라우터. 고객 정보 조회, 업데이트, 표준 시간 조회, 매니저 조회 등을 수행합니다.
     * @param {Object} req - 클라이언트 요청 객체, method 및 날짜/업데이트 정보가 포함됩니다.
     * @param {Object} res - 서버 응답 객체, JSON 형식의 데이터를 반환합니다.
     */
    router.post([ "/realtimeClient" ], async function (req, res) {
      try {
        // 요청 바디에 method 속성이 없으면 에러를 발생시킴
        if (!req.body.hasOwnProperty("method")) {
          throw new Error("invalid post");
        }

        const selfMongo = instance.mongolocal; // 로컬 MongoDB 인스턴스
        const { method } = req.body; // 클라이언트로부터 받은 method 값을 추출
        const members = instance.members; // 멤버 리스트를 가져옴
        const emptyCliid = "c0000_aa00s"; // 비어있는 고객 ID를 나타내는 기본 값

        /**
         * 숫자가 한 자리일 경우 0을 추가하여 두 자리로 반환하는 함수
         * @param {Number} num - 숫자 값
         * @returns {String} 두 자리 문자열로 반환된 숫자
         */
        const zeroAddition = (num) => { return (num < 10 ? `0${String(num)}` : String(num)); }

        /**
         * Date 객체를 특정 형식의 키 값으로 변환하는 함수
         * @param {Date} date - 날짜 객체
         * @returns {Number} 연월일 형식의 숫자 (예: 20230925)
         * @throws {Error} date가 Date 객체가 아닌 경우 오류 발생
         */
        const dateToKey = function (date) {
          if (!(date instanceof Date)) {
            throw new Error("input => Date: date");
          }
          return Number(String(date.getFullYear()) + zeroAddition(date.getMonth() + 1) + zeroAddition(date.getDate()));
        }

        /**
         * 새로운 데이터 모델을 반환하는 함수
         * @param {Date} date - 기준 날짜
         * @param {Array} standard - 표준 시간 배열
         * @param {Array} clientSide - 고객 측 배열
         * @param {Array} manager - 매니저 배열
         * @returns {Object} 새로운 데이터 모델 (key, year, month, standard, clientSide, caution, manager, matrix)
         */
        const returnModel = function (date, standard, clientSide, manager) {
          if (!(date instanceof Date) || !Array.isArray(standard) || !Array.isArray(manager)) {
            throw new Error("input => Date: date, Array: standard, Array: manager");
          }
          let key, caution, matrix;
          key = dateToKey(date); // 날짜를 키로 변환
          caution = (new Array(standard.length)).fill(null, 0); // caution 배열을 null 값으로 초기화
          matrix = caution.map((i) => { return (new Array(manager.length).fill(null, 0)); }); // 매니저별로 null 값을 가진 2차원 배열 생성
          return { key, year: date.getFullYear(), month: date.getMonth() + 1, standard, clientSide, caution, manager, matrix };
        }

        // Array를 상속한 SearchArray 클래스, find 메서드를 이용하여 고객 ID를 찾음
        class SearchArray extends Array {
          find(q) {
            let target = null;
            for (let i of this) {
              if (i.cliid === q) {
                target = q;
                break;
              }
            }
            return target;
          }
        }

        // 미리 정의된 매니저 ID 배열
        const manager = [ "m1701_aa01s", "m1707_aa01s", "m1810_aa01s", "m2012_aa01s", "m2101_aa01s" ];
        const managerMain = [ 3, 4 ]; // 주 매니저 인덱스
        const clientSide = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0]; // 고객 측 설정 배열

        // 각 시간대를 정의한 표준 배열
        const standard = [
          [ [11, 0], [11, 30] ], [ [11, 30], [12, 0] ], [ [13, 30], [14, 0] ],
          [ [14, 0], [14, 30] ], [ [14, 30], [15, 0] ], [ [15, 0], [15, 30] ],
          [ [15, 30], [16, 0] ], [ [16, 0], [16, 30] ], [ [16, 30], [17, 0] ],
          [ [17, 0], [17, 30] ], [ [17, 30], [18, 0] ], [ [18, 0], [18, 30] ],
          [ [18, 30], [19, 0] ], [ [19, 0], [19, 30] ], [ [19, 30], [20, 0] ],
        ];

        const listKey = 99999999; // 리스트에 사용할 고정 키
        const collection = "realtimeClient"; // MongoDB 컬렉션명
        let result, rows, cliidArr, clients;
        let updateIdIndex, tempDate;
        let boo, boo2, thisObj;
        let bookList, tempRows, tempRow;
        let memberIndex;
    
        if (method === "get") {

          // 날짜 정보가 요청 객체에 없으면 오류를 발생시킴
          if (req.body.date === undefined) {
            throw new Error("invalid post");
          }

          // equalJson을 통해 요청 데이터에서 date 값을 추출하여 Date 객체를 깊은 복사함
          const { date } = equalJson(req.body);

          // MongoDB에서 해당 날짜에 대응하는 데이터를 조회함
          rows = await back.mongoRead(collection, { key: dateToKey(date) }, { selfMongo });

          // 만약 데이터가 존재하지 않는다면 새로운 모델을 생성하여 DB에 저장하고, 그렇지 않으면 조회된 데이터를 사용함
          if (rows.length === 0) {
            result = returnModel(date, standard, clientSide, manager);
            await back.mongoCreate(collection, result, { selfMongo });
          } else {
            result = rows[0];
          }

          // 표준 시간대 배열을 변환하여 시작과 종료 시간을 문자열 형식으로 변환함
          result.standard = result.standard.map((arr) => {
            const [ from, to ] = arr;
            const arrToString = (a) => { return zeroAddition(a[0]) + ':' + zeroAddition(a[1]); }
            return (arrToString(from) + "  ~  " + arrToString(to));
          });

          // 요청 객체에 매니저 정보가 없다면 기본적으로 매니저 메인 배열(managerMain)만 처리함
          if (req.body.member === undefined) {
            
            // 매니저 메인 배열의 각 번호에 대응하는 매트릭스 배열을 변환하여 반환함
            result.matrix = result.matrix.map((arr) => {
              let tong = [];
              for (let number of managerMain) {
                tong.push(arr[number]);
              }
              return tong;
            });

          } else {

            // 매니저 ID 배열에서 요청된 매니저를 찾아 해당 매니저의 인덱스를 가져옴
            memberIndex = manager.findIndex((i) => { return i === req.body.member; });
            
            // 매니저가 없으면 기본적으로 0으로 설정
            if (memberIndex === undefined) {
              memberIndex = 0;
            }

            // caution 배열을 검사하여 특정 클라이언트 ID가 있는지 확인 후, matrix 배열에 채움
            for (let i = 0; i < result.caution.length; i++) {
              if (typeof result.caution[i] === "string") {
                if (!result.matrix[i].includes(result.caution[i])) {
                  result.matrix[i].fill(result.caution[i]);
                }
              }
            }

            // 선택된 매니저에 대해 매트릭스 배열을 처리함
            result.matrix = result.matrix.map((arr) => {
              let tong = [];
              tong.push(arr[memberIndex]);
              return tong;
            });
          }

          // 매트릭스 배열에서 null이 아닌 값을 찾아 반환하고, null일 경우 'emptyCliid'를 반환함
          result.matrix = result.matrix.map((arr) => {
            let r = arr.find((z) => { return z !== null });
            if (r !== undefined && r !== null) {
              return r;
            } else {
              return emptyCliid;
            }
          });

          // 매트릭스에서 'emptyCliid'가 아닌 값을 필터링하여 클라이언트 ID 배열을 생성
          cliidArr = result.matrix.filter((i) => { return i !== emptyCliid; });

          // 각 클라이언트 ID를 MongoDB에서 검색하기 위한 형식으로 변환
          cliidArr = cliidArr.map((id) => { return { cliid: id }; });

          // 클라이언트 ID 배열이 비어 있지 않으면 MongoDB에서 해당 클라이언트를 조회하고, 비어 있으면 빈 배열로 처리함
          if (cliidArr.length !== 0) {
            clients = await back.getClientsByQuery({ $or: cliidArr }, { selfMongo: instance.mongo, withTools: true });
          } else {
            clients = new SearchArray();
          }

          // 매트릭스 배열을 클라이언트의 이름과 ID로 변환하여 반환함. 클라이언트가 없으면 "미정"으로 표시
          result.matrix = result.matrix.map((id) => {
            let client = clients.search(id);
            if (client !== undefined && client !== null) {
              return { name: client.name, cliid: client.cliid };
            } else {
              return { name: "미정", cliid: emptyCliid };
            }
          });
    
        } else if (method === "update") {
    
          if (req.body.date === undefined || req.body.update === undefined) {
            // 요청 객체에 date와 update가 없을 경우 오류 발생
            throw new Error("invalid post");
          }
          
          // equalJson을 사용하여 요청 데이터에서 date와 update를 추출
          let { date, update } = equalJson(req.body);
          update = equalJson(update);
          
          // update 객체에 cliid(클라이언트 ID)와 index가 없을 경우 오류 발생
          if (update.cliid === undefined || update.index === undefined) {
            throw new Error("invalid update object");
          }
          
          const { cliid, index } = update;
          // 매니저가 지정되지 않은 경우 null로 설정
          let member = (update.member !== undefined ? update.member : null);
          
          // MongoDB에서 listKey에 해당하는 예약 정보를 조회함
          tempRows = await back.mongoRead(collection, { key: listKey }, { selfMongo });
          if (tempRows.length === 0) {
            // listKey에 해당하는 정보가 없을 경우 오류 발생
            throw new Error("invalid db");
          }
          
          bookList = tempRows[0];
          
          // member가 null인 경우 예약 정보에서 해당 클라이언트를 제거
          if (member === null) {
            if (bookList.book[cliid] !== undefined) {
              // 클라이언트 ID가 존재할 경우 MongoDB에서 해당 날짜에 해당하는 예약 정보를 조회
              tempRows = await back.mongoRead(collection, { key: bookList.book[cliid] }, { selfMongo });
              if (tempRows.length === 0) {
                throw new Error("invalid db");
              }
              tempRow = tempRows[0];
              
              // caution 배열에서 해당 클라이언트를 null로 설정
              tempRow.caution = tempRow.caution.map((id) => {
                if (id === cliid) {
                  return null;
                } else {
                  return id;
                }
              });
              
              // matrix 배열에서도 클라이언트 ID를 null로 변경
              tempRow.matrix = tempRow.matrix.map((arr) => {
                if (arr.includes(cliid)) {
                  return arr.map((id) => {
                    if (id === cliid) {
                      return null;
                    } else {
                      return id;
                    }
                  });
                } else {
                  return arr;
                }
              });
              
              // 업데이트된 caution 및 matrix 배열을 MongoDB에 저장
              await back.mongoUpdate(collection, [ { key: bookList.book[cliid] }, { caution: tempRow.caution, matrix: tempRow.matrix } ], { selfMongo });
            }
          }
          
          // 해당 날짜의 예약 정보를 MongoDB에서 조회
          rows = await back.mongoRead(collection, { key: dateToKey(date) }, { selfMongo });
          if (rows.length !== 0) {
            result = rows[0];
          
            if (member !== null) {
              // 매니저가 지정된 경우 매니저의 인덱스를 찾고 matrix 배열을 업데이트
              updateIdIndex = result.manager.findIndex((m) => { return m === member; });
              if (updateIdIndex !== undefined && updateIdIndex !== null) {
                if (updateIdIndex >= 0) {
                  result.matrix[index][updateIdIndex] = cliid;
                  await back.mongoUpdate(collection, [ { key: dateToKey(date) }, { matrix: result.matrix } ], { selfMongo });
                }
              }
            } else {
              // 클라이언트가 예약을 요청한 경우
              if (update.name === undefined) {
                throw new Error("invalid post");
              }
              
              // 표준 시간대 정보를 변환하여 읽기 쉽게 만듦
              result.standard = result.standard.map((arr) => {
                const [ from, to ] = arr;
                const arrToString = (a) => { return zeroAddition(a[0]) + ':' + zeroAddition(a[1]); }
                return (arrToString(from) + " ~ " + arrToString(to));
              });
              
              // 예약 알림을 메시지로 전송
              await messageSend({ text: `${update.name}(${cliid}) 고객님이 ${String(date.getMonth() + 1)}월 ${String(date.getDate())}일 ${result.standard[index]}에 응대 예약을 하셨습니다! 담당자 지정을 부탁드리겠습니다!`, channel: "#400_customer" });
              
              // caution 배열에 클라이언트 ID를 추가하고 MongoDB에 저장
              result.caution[index] = cliid;
              await back.mongoUpdate(collection, [ { key: dateToKey(date) }, { caution: result.caution } ], { selfMongo });
            }
          
            // 예약 정보를 갱신하여 저장
            bookList.book[cliid] = dateToKey(date);
            await back.mongoUpdate(collection, [ { key: listKey }, { book: bookList.book } ], { selfMongo });
          
          } else {
            // DB에서 해당 날짜의 예약 정보를 찾을 수 없을 경우 오류 발생
            throw new Error("invalid db");
          }
          
          // 성공 메시지를 반환
          result = { message: "done" };
          
        } else if (method === "standard") {

          // 표준 시간대 배열을 문자열로 변환하여 반환
          result = standard.map((arr) => {
            const [from, to] = arr; // 시간 범위를 from과 to로 나눔
            // 시간을 "hh:mm" 형식의 문자열로 변환
            const arrToString = (a) => { return zeroAddition(a[0]) + ':' + zeroAddition(a[1]); };
            // from과 to 시간을 "hh:mm ~ hh:mm" 형식으로 반환
            return (arrToString(from) + "  ~  " + arrToString(to));
          });

        } else if (method === "range") {
    
          if (req.body.year === undefined || req.body.month === undefined) {
            // 요청에서 year(연도)와 month(월)이 누락된 경우 오류를 발생시킴
            throw new Error("invaild post");
          }
          
          const year = Number(req.body.year); // 요청에서 year 값을 숫자로 변환하여 할당
          const month = Number(req.body.month); // 요청에서 month 값을 숫자로 변환하여 할당
          const today = new Date(); // 현재 날짜를 today 변수에 저장
          
          // 데이터베이스에서 해당 연도와 월에 해당하는 데이터를 검색
          rows = await back.mongoRead(collection, { $and: [ { year }, { month } ] }, { selfMongo });
          
          // 결과를 저장할 빈 배열 생성
          result = [];
          
          // 해당 월의 날짜를 순회하며 각 날짜의 예약 가능 여부를 확인
          for (let i = 0; i < 31; i++) {
            // 각 날짜의 마지막 시간으로 tempDate를 설정
            tempDate = new Date(
              year, month - 1, i + 1, 
              standard.flat(2)[standard.flat(2).length - 2], 
              standard.flat(2)[standard.flat(2).length - 1]
            );
          
            // 날짜가 해당 월에 속하는지 확인
            if (tempDate.getMonth() + 1 === month) {
              
              // 해당 날짜가 주말이거나 오늘보다 이전의 날짜이면 예약 불가능으로 처리
              if (tempDate.getDay() === 0 || tempDate.getDay() === 6 || today.valueOf() > tempDate.valueOf()) {
                result.push(false);
              } else {
                // boo 변수를 false로 초기화하여 예약 가능 여부를 판단
                boo = false;
          
                // 데이터베이스에서 조회된 결과에서 해당 날짜의 키가 존재하는지 확인
                for (let r of rows) {
                  if (r.key === dateToKey(tempDate)) {
                    thisObj = r; // 해당 날짜의 객체를 thisObj에 저장
                    boo = true;  // 예약 가능 상태를 true로 설정
                  }
                }
          
                // 해당 날짜의 예약 가능 여부를 matrix에서 확인하여 result에 추가
                if (boo) {
                  boo2 = false;
                  // managerMain 배열에 있는 관리자의 예약 가능 상태를 확인
                  for (let number of managerMain) {
                    // matrix에서 해당 관리자의 예약 상태가 비어있는지 확인
                    boo2 = thisObj.matrix[number].includes(null);
                    if (boo2) {
                      break; // 예약 가능하면 반복 종료
                    }
                  }
                  result.push(boo2); // 예약 가능 여부를 결과 배열에 추가
                } else {
                  result.push(true); // 예약 가능한 상태로 기본값 설정
                }
              }
            }
          }
    
        } else if (method === "manager") {

          result = manager;

        } else if (method === "list") {

          // 데이터베이스에서 주어진 listKey 값으로 데이터를 조회
          tempRows = await back.mongoRead(collection, { key: listKey }, { selfMongo });

          // 조회 결과가 없는 경우 오류 발생
          if (tempRows.length === 0) {
            throw new Error("invaild db");  // 데이터베이스에 해당 키로 조회된 데이터가 없으면 'invaild db' 오류를 발생시킴
          }

          // 조회된 데이터에서 'book' 키의 값을 추출
          const { book } = tempRows[0];  // 조회된 결과(tempRows) 배열에서 첫 번째 항목의 book 객체를 추출

          // book 객체를 result에 저장하여 결과로 반환 준비
          result = book;  // 최종적으로 반환할 결과로 book 객체를 result에 할당

        }

        // 결과를 클라이언트에 JSON 형식으로 응답
        res.set({ "Content-Type": "application/json" });
        res.send(JSON.stringify(result));
      } catch (e) {
        // 오류 발생 시 로깅 및 오류 메시지 반환
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /realtimeDesigner
     * @description 디자이너의 실시간 상태를 관리하는 라우터. 'get', 'all', 'sync', 'update' 모드를 지원하여 디자이너의 상태 조회, 전체 디자이너 조회, 동기화, 업데이트 등의 작업을 수행합니다.
     * @param {Object} req - 클라이언트 요청 객체, mode, desid, proid, updateQuery 등의 정보가 포함됩니다.
     * @param {Object} res - 서버 응답 객체, JSON 형식으로 처리 결과를 반환합니다.
     * @throws {Error} 요청 데이터가 유효하지 않거나 데이터베이스 작업 중 오류가 발생한 경우 이를 처리합니다.
     */
    router.post([ "/realtimeDesigner" ], async function (req, res) {
      // 응답 헤더 설정
      res.set({
        "Content-Type": "application/json",  // 응답 데이터의 형식을 JSON으로 설정
        "Access-Control-Allow-Origin": "*",  // 모든 도메인에서의 요청을 허용
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",  // 허용되는 메서드를 설정
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",  // 허용되는 헤더 설정
      });

      try {
        // mode가 문자열 타입인지 확인
        if (typeof req.body.mode !== "string") {
          throw new Error("invaild post");  // 유효하지 않은 요청인 경우 예외 처리
        }

        // mode 값이 예상한 값 중 하나인지 확인
        if (![ "get", "all", "sync", "update" ].includes(req.body.mode)) {
          throw new Error("invaild post");  // 유효하지 않은 mode인 경우 예외 처리
        }

        const { mode } = req.body;  // mode 값을 추출
        const collection = "realtimeDesigner";  // MongoDB 컬렉션명 정의
        let rows;  // 조회된 결과를 저장할 변수
        let desid, proid;  // 디자이너 ID, 프로젝트 ID를 저장할 변수
        let result;  // 최종 응답 데이터를 저장할 변수
        let response;  // 작업 결과를 저장할 변수

        // mode가 'get'인 경우, 특정 디자이너 정보 조회
        if (mode === "get") {
          if (req.body.desid === undefined) {
            throw new Error("invaild post");  // desid가 없는 경우 예외 처리
          }
          desid = req.body.desid;  // desid를 요청 객체에서 추출
          rows = await back.mongoRead(collection, { desid }, { selfMongo: instance.mongolocal });  // MongoDB에서 desid로 데이터 조회
          if (rows.length > 0) {
            result = rows[0];  // 데이터가 있으면 첫 번째 결과를 반환
          } else {
            result = {};  // 데이터가 없으면 빈 객체 반환
          }

        // mode가 'all'인 경우, 모든 디자이너 정보 간략 조회
        } else if (mode === "all") {
          rows = await back.mongoPick(collection, [ {}, { desid: 1, possible: 1 } ], { selfMongo: instance.mongolocal });  // 모든 디자이너의 desid와 possible 필드만 선택
          result = {
            data: rows  // 조회 결과를 data 필드에 담아 반환
          };

        // mode가 'sync'인 경우, 특정 프로젝트와 디자이너 동기화 작업
        } else if (mode === "sync") {
          if (req.body.proid === undefined) {
            throw new Error("invaild post");  // proid가 없는 경우 예외 처리
          }
          proid = req.body.proid;  // proid를 요청 객체에서 추출
          response = await work.realtimeDesignerSync(proid, { selfMongo: instance.mongo, selfConsoleMongo: instance.mongolocal });  // 디자이너와 프로젝트 동기화 작업 수행
          if (response.message === "success") {
            result = { message: "success" };  // 동기화가 성공한 경우 성공 메시지 반환
          } else {
            throw new Error(JSON.stringify(response));  // 동기화 실패 시 오류 처리
          }

        // mode가 'update'인 경우, 디자이너 정보 업데이트
        } else if (mode === "update") {
          if (req.body.desid === undefined) {
            throw new Error("invaild post");  // desid가 없는 경우 예외 처리
          }
          if (req.body.updateQuery === undefined) {
            throw new Error("invaild post");  // updateQuery가 없는 경우 예외 처리
          }
          const { desid, updateQuery } = equalJson(req.body);  // 요청 데이터에서 desid와 updateQuery를 추출
          await back.mongoUpdate(collection, [ { desid }, updateQuery ], { selfMongo: instance.mongolocal });  // MongoDB에서 desid에 해당하는 데이터 업데이트
          result = { message: "done" };  // 업데이트 완료 메시지 반환
        }

        // 최종 결과를 JSON 형식으로 클라이언트에 응답
        res.send(JSON.stringify(result));
      } catch (e) {
        // 오류가 발생한 경우 로그에 기록하고, 클라이언트에 오류 메시지를 응답
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");  // 응답의 Content-Type을 JSON으로 설정
        res.send(JSON.stringify({ error: e.message }));  // 오류 메시지를 JSON 형식으로 응답
      }
    });
    
    /**
     * @route POST /designerFee
     * @description 디자이너의 수수료를 계산하고 반환하는 라우터입니다. 프로젝트나 디자이너 정보에 따라 수수료 정보를 조회하고 계산하여 클라이언트에게 반환합니다.
     * @param {Object} req - 클라이언트 요청 객체, matrix, frontMode 등의 정보가 포함됩니다.
     * @param {Object} res - 서버 응답 객체, JSON 형식으로 수수료 계산 결과를 반환합니다.
     * @throws {Error} 필수 요청 데이터가 누락되었거나 잘못된 형식일 경우 예외가 발생합니다.
     */
    router.post([ "/designerFee" ], async function (req, res) {
      try {
        // MongoDB 옵션 설정
        const option = { selfMongo: instance.mongo, selfLocalMongo: instance.mongolocal };

        // 요청에 matrix가 포함되지 않은 경우 예외 발생
        if (req.body.matrix === undefined) {
          throw new Error("must be matrix");
        }

        // 클라이언트 요청에서 matrix를 equalJson을 사용하여 깊은 복사로 처리
        const matrix = equalJson(req.body.matrix);

        const dateMargin = 10; // 날짜 마진 설정
        let resultObj, temp; // 결과 저장 객체와 임시 변수를 선언
        let project, thisProposal; // 프로젝트와 제안을 저장할 변수
        let designerRealtime; // 디자이너 실시간 상태를 저장할 변수

        // 요청에 frontMode가 1이면 옵션에 frontMode를 추가
        if (req.body.frontMode === 1 || req.body.frontMode === '1') {
          option.frontMode = 1;
        }

        // matrix가 배열이 아니면 예외 발생
        if (!Array.isArray(matrix)) {
          throw new Error("invaild post");
        }

        // matrix가 프로젝트 ID 문자열 배열인 경우
        if (matrix.every((a) => { return typeof a === "string" && /^p/.test(a); })) {
          resultObj = {};  // 결과 객체 생성
          for (let proid of matrix) {
            // 각 프로젝트에 대한 디자이너 수수료를 계산하여 저장
            resultObj[proid] = await work.getDesignerFee(proid, option);
          }

        // matrix가 각 요소가 5개의 값을 가진 배열인 경우
        } else if (matrix.every((a) => { return Array.isArray(a) && a.length === 5; })) {
          resultObj = [];  // 결과 배열 생성
          for (let [ desid, cliid, serid, xValue, proid ] of matrix) {
            // 디자이너 수수료 정보를 가져옴
            temp = await work.getDesignerFee(desid, cliid, serid, xValue, option);
            temp.detail.discount = {
              online: 0, // 온라인 할인 기본값 설정
              offline: 0, // 오프라인 할인 기본값 설정
            };

            // proid가 있는 경우 프로젝트에 대한 추가 정보를 가져옴
            if (proid !== null && proid !== undefined) {
              project = await back.getProjectById(proid, { selfMongo: instance.mongo });
              thisProposal = project.selectProposal(desid);  // 디자이너에 대한 제안 정보 선택
              if (thisProposal !== null) {
                // 각 제안서에 대한 할인 정보를 추가
                for (let { method, discount } of thisProposal.fee) {
                  if (/^off/gi.test(method)) {
                    temp.detail.discount.offline = discount;  // 오프라인 할인 정보 적용
                  } else {
                    temp.detail.discount.online = discount;  // 온라인 할인 정보 적용
                  }
                }
              }
              // 실시간 디자이너 상태 확인
              designerRealtime = await work.realtimeDesignerMatch(desid, proid, option);
            } else {
              // proid가 없는 경우 디자이너 실시간 상태를 다른 정보로 확인
              designerRealtime = await work.realtimeDesignerMatch(desid, cliid, serid, xValue, option);
            }

            // 실시간 상태가 불가능할 경우 메시지 추가
            if (!designerRealtime.result) {
              temp.comment = (req.body.frontMode === 1 || req.body.frontMode === '1') ? "일정 불가능" : "Unable schedule";
              temp.detail.travel.number = 0;  // 이동 횟수를 0으로 설정
            }

            temp.detail.travel.limit = 5;  // 이동 가능 한도를 5로 설정

            resultObj.push(temp);  // 결과 배열에 추가
          }

        // matrix가 위 두 조건에 해당하지 않는 경우 예외 발생
        } else {
          throw new Error("invaild matrix");
        }

        // 응답 헤더 설정 후 결과 반환
        res.set({ "Content-Type": "application/json" });
        res.send(JSON.stringify(resultObj));

      } catch (e) {
        // 오류가 발생한 경우 오류 메시지를 로그에 기록하고 클라이언트에 응답
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /inicisPayment
     * @description 이니시스 결제 처리를 위한 라우터입니다. 결제 스크립트 생성, 디크립션, 모바일 카드 결제 처리, 가상계좌 처리 등의 기능을 수행합니다.
     * @param {Object} req - 클라이언트 요청 객체, mode, cliid, desid, proid, method 등의 정보를 포함합니다.
     * @param {Object} res - 서버 응답 객체, JSON 형식으로 결제 결과를 반환합니다.
     * @throws {Error} 잘못된 요청이나 처리 중 오류가 발생한 경우 예외를 발생시킵니다.
     */
    router.post([ "/inicisPayment" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json", // 응답의 Content-Type을 JSON으로 설정
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서 요청을 허용
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 헤더를 설정
      });

      try {
        const password = "homeliaison"; // 고정된 암호 설정
        const now = new Date(); // 현재 날짜 및 시간을 저장
        const kakao = instance.kakao; // Kakao 알림 기능 설정

        // 'script' 모드 처리
        if (req.body.mode === "script") {
          const { cliid, kind, desid, proid, method, device, bilid } = req.body; // 요청에서 필요한 정보를 추출
          const oidConst = "homeliaisonBill_"; // 고유 결제 ID의 기본 상수 값
          const version = "1.0"; // 이니시스 결제 스크립트의 버전
          const gopaymethod = req.body.gopaymethod; // 결제 방식(Card, VBank 등)
          const mid = instance.address.officeinfo.inicis.mid; // 이니시스 MID 값
          const signkey = instance.address.officeinfo.inicis.signkey; // 이니시스 서명 키
          const timestamp = String(now.valueOf()); // 현재 타임스탬프를 생성
          const oid = oidConst + timestamp; // 고유 결제 ID 생성
          const price = Math.round(Number(req.body.price)); // 결제 가격을 정수로 변환
          const signature = crypto.createHash("sha256").update(`oid=${oid}&price=${String(price)}&timestamp=${timestamp}`).digest("hex"); // 결제 서명을 생성
          const mKey = crypto.createHash("sha256").update(signkey).digest("hex"); // 서명 키 해시 생성
          const currency = "WON"; // 결제 통화 설정
          const goodname = req.body.name; // 상품명 설정
          const buyername = req.body.buyerName; // 구매자 이름 설정
          const buyertel = req.body.buyerPhone; // 구매자 전화번호 설정
          const buyeremail = req.body.buyerEmail; // 구매자 이메일 설정
          let returnUrl, closeUrl; // 리턴 URL과 결제 종료 URL을 저장할 변수
          let pluginScript, formValue, acceptmethod; // 결제 스크립트 및 결제 폼 정보를 저장할 변수
          let future; // 가상 계좌 사용 시 사용할 미래 날짜
    
          if ((new RegExp(address.frontinfo.host, "gi")).test(req.body.currentPage)) {
            // 현재 페이지의 주소가 frontinfo의 호스트와 일치하는지 확인
            returnUrl = req.body.currentPage + "/inicisPayment?cliid=" + cliid + "&needs=" + ([kind, desid, proid, method]).join(',');
            // 리턴 URL 설정 (결제 완료 후 돌아갈 페이지)
            closeUrl = req.body.currentPage + "/tools/trigger.html"; // 종료 URL 설정
          } else {
            returnUrl = req.body.currentPage + "/inicisPayment?cliid=" + cliid + "&needs=" + ([kind, desid, proid, method]).join(',');
            closeUrl = req.body.currentPage + "/tools/trigger"; // 종료 URL 설정 (현재 페이지가 다를 경우)
          }
          
          if (gopaymethod === "Card") {
            // 결제 방식이 카드일 경우
            pluginScript = ''; // 결제 스크립트 초기화
            pluginScript += (await requestSystem("https://cdn.iamport.kr/v1/iamport.js")).data;
            // 아임포트 결제 스크립트를 가져와서 추가
            formValue = { version, gopaymethod, mid, oid, price, timestamp, signature, mKey, currency, goodname, buyername, buyertel, buyeremail, returnUrl, closeUrl };
            // 결제에 필요한 정보를 포함한 폼 값 생성
          } else if (gopaymethod !== "Account") {
            // 결제 방식이 가상 계좌(Account)가 아닐 경우
            pluginScript = (await requestSystem("https://stdpay.inicis.com/stdjs/INIStdPay.js")).data;
            // 이니시스 결제 스크립트를 가져와서 추가
            if (gopaymethod === "VBank") {
              // 가상 계좌 방식일 경우
              acceptmethod = "va_receipt"; // 가상 계좌 수신 모드 설정
            } else {
              acceptmethod = "below1000"; // 기타 결제 방식 처리
            }
            formValue = { version, gopaymethod, mid, oid, price, timestamp, signature, mKey, currency, goodname, buyername, buyertel, buyeremail, returnUrl, closeUrl, acceptmethod };
            // 결제에 필요한 정보를 포함한 폼 값 생성 (acceptmethod 포함)
          } else {
            // 결제 방식이 계좌 이체(Account)일 경우
            await requestSystem("https://" + instance.address.officeinfo.host + ":3002/accountTimeSet", {
              bilid,
              requestNumber: Number(req.body.requestNumber),
              proid,
              cliid,
              desid,
              goodname,
              date: new Date(),
              name: buyername,
              phone: buyertel,
              amount: price,
              accountInfo: {
                no_tid: "realAccount",
                no_oid: oid,
                cd_bank: "00",
                nm_inputbank: "unknown",
                nm_input: buyername,
                amt_input: String(price),
                real_account: "true"
              }
            }, {
              headers: { "Content-Type": "application/json" }
            });
            // accountTimeSet API에 결제 정보를 전송하여 가상 계좌를 설정
            future = new Date(); // 현재 날짜 및 시간을 가져옴
            future.setDate(future.getDate() + 7); // 가상 계좌 만료일을 7일 후로 설정
          
            pluginScript = await cryptoString(password, JSON.stringify({
              goodName: goodname,
              goodsName: goodname,
              resultCode: "0000", // 결제 성공 코드
              resultMsg: "성공적으로 처리 하였습니다.", // 결제 성공 메시지
              tid: "realAccount", // 거래 ID 설정
              payMethod: "ACCOUNT", // 결제 방식 설정
              applDate: dateToString(new Date(), true).replace(/[^0-9]/gi, ''), // 결제 날짜 설정
              mid,
              MOID: oid, // 결제 ID 설정
              TotPrice: String(price), // 총 결제 금액 설정
              buyerName: buyername, // 구매자 이름 설정
              CARD_Code: "", // 카드 코드 (계좌에서는 빈 값)
              vactBankName: "기업", // 계좌 은행 이름 설정
              VACT_Num: "049-085567-04-022", // 계좌 번호 설정
              VACT_Name: "(주)홈리에종", // 계좌 소유자 설정
              VACT_Date: dateToString(future).replace(/[^0-9]/gi, ''), // 계좌 만료일 설정
              payDevice: "", // 결제 기기 정보 (비워둠)
              P_FN_NM: "realAccount", // 결제 처리 결과
              REAL_Account: "true" // 실제 계좌 사용 여부 설정
            }));
            formValue = {}; // 계좌의 경우 폼 값이 필요하지 않음
          }
    
          res.send(JSON.stringify({ pluginScript, formValue }));
    
        } else if (req.body.mode === "decrypto") {
    
          // 'decrypto' 모드로 암호화된 데이터를 복호화하는 코드
          let result = await decryptoHash(password, req.body.hash.trim());
          // 클라이언트에서 전달받은 hash 값을 decryptoHash 메서드를 통해 복호화함

          try {
            result = JSON.parse(result); // 복호화된 결과를 JSON 형식으로 파싱            
            res.send(JSON.stringify(result));
            // 복호화 및 JSON 파싱이 성공했을 경우 결과를 JSON 형식으로 클라이언트에 응답
            
          } catch (e) { // 만약 복호화된 데이터가 JSON 형식이 아니거나 파싱 중 오류가 발생한 경우 예외 처리
            mother.errorLogSync(e);
            res.send(JSON.stringify({ result }));
            // 복호화는 성공했으나 파싱 중 오류가 발생했을 경우, 원본 복호화된 결과를 그대로 응답
          }
    
        } else if (req.body.mode === "mobileCard") {
    
          // 클라이언트로부터 전달된 요청(req.body)에서 'mid', 'oid', 'impId' 값을 추출합니다.
          // 'mid'는 상점 아이디, 'oid'는 주문 번호, 'impId'는 아임포트 결제 식별자입니다.
          const { mid, oid, impId } = req.body;

          /**
           * @description 아임포트 API로부터 액세스 토큰을 받아오는 요청입니다.
           * imp_key와 imp_secret을 사용하여 토큰을 요청하고, 반환된 토큰을 사용하여 이후 결제 정보를 가져옵니다.
           * @see https://api.iamport.kr/users/getToken
           */
          const { data: { response: { access_token: accessToken } } } = await requestSystem(
            "https://api.iamport.kr/users/getToken",
            {
              imp_key: address.officeinfo.import.key, // 아임포트에서 발급받은 API 키
              imp_secret: address.officeinfo.import.secret, // 아임포트에서 발급받은 API 시크릿
            },
            {
              headers: { "Content-Type": "application/json" }, // JSON 형식의 요청 헤더 설정
            }
          );

          /**
           * @description 아임포트 API에서 특정 결제(impId)에 대한 정보를 가져오는 요청입니다.
           * @param {string} impId - 아임포트 결제 식별자입니다.
           * @param {string} accessToken - 앞서 발급받은 액세스 토큰입니다.
           * @see https://api.iamport.kr/payments/{impId}
           */
          const { data: { response: paymentData } } = await requestSystem(
            "https://api.iamport.kr/payments/" + impId,
            {},
            {
              method: "get", // GET 요청을 통해 결제 정보 조회
              headers: { "Authorization": accessToken }, // 액세스 토큰을 헤더에 포함하여 인증 처리
            }
          );

          // 현재 날짜와 시간을 가져옵니다. 이후 결제 승인 날짜(applDate) 값으로 사용됩니다.
          const today = new Date();

          /**
           * @function zeroAddition
           * @description 숫자가 한 자리일 경우 앞에 0을 붙여 두 자리로 만듭니다.
           * @param {number} num - 0을 추가할 숫자
           * @returns {string} 두 자리 숫자로 변환된 문자열
           */
          const zeroAddition = (num) => (num < 10 ? `0${String(num)}` : String(num));

          /**
           * @description 결제 정보 및 상태를 클라이언트에 반환하기 위해 데이터를 가공한 객체입니다.
           * @param {Object} paymentData - 아임포트에서 받아온 결제 정보입니다.
           */
          const convertingData = {
            goodName: paymentData.name, // 상품명
            goodsName: paymentData.name, // 상품명 (복수형으로도 설정)
            resultCode: paymentData.status.trim() === "paid" ? "0000" : "4000", // 결제 성공 여부에 따른 결과 코드 ('0000'은 성공, '4000'은 실패)
            resultMsg: paymentData.status.trim() === "paid" ? "성공적으로 처리하였습니다." : `결제 실패 : ${String(paymentData.fail_reason)}`, // 결제 성공 또는 실패 메시지
            tid: paymentData.pg_tid, // 결제 거래 식별자 (TID)
            payMethod: "CARD", // 결제 방식은 카드로 고정
            applDate: `${String(today.getFullYear())}${zeroAddition(today.getMonth() + 1)}${zeroAddition(today.getDate())}${zeroAddition(today.getHours())}${zeroAddition(today.getMinutes())}${zeroAddition(today.getSeconds())}`, // 결제 승인 날짜 (YYYYMMDDHHmmss 형식)
            mid: mid, // 상점 아이디
            MOID: oid, // 주문 번호
            TotPrice: String(paymentData.amount), // 결제 금액 (총 금액)
            buyerName: paymentData.buyer_name, // 구매자 이름
            CARD_BankCode: paymentData.card_code, // 카드 발급사 코드
            CARD_Num: paymentData.card_number, // 카드 번호
            CARD_ApplPrice: String(paymentData.amount), // 결제 승인 금액
            CARD_Code: paymentData.card_code, // 카드 발급사 코드 (중복 설정)
            vactBankName: paymentData.card_name, // 카드 발급사 이름
            payDevice: "MOBILE", // 결제가 모바일 기기에서 발생한 것으로 설정
            P_FN_NM: paymentData.card_name, // 카드 발급사 이름
            "__ignorethis__": 1, // 테스트나 디버깅 용도로 무시할 필드
          };

          /**
           * @description 결제 상태에 따라 클라이언트로 결과를 전송합니다.
           * @param {Object} convertingData - 가공된 결제 정보입니다.
           */
          if (paymentData.status.trim() === "paid") {
            res.send(JSON.stringify({ convertingData })); // 결제가 성공했을 때의 응답
          } else {
            res.send(JSON.stringify({ convertingData: { error: "error" } })); // 결제가 실패했을 때의 응답
          }
    
        } else if (req.body.mode === "v2") {
    
          // 클라이언트로부터 전달된 요청(req.body)에서 'mid'와 'oid' 값을 추출합니다.
          // 'mid'는 상점 아이디, 'oid'는 주문 번호입니다.
          const { mid, oid } = req.body;

          // PortOne API의 기본 URL을 설정합니다.
          const url = "https://api.portone.io";

          // PortOne API 호출을 위한 설정 값들을 선언합니다.
          let config, accessToken, accessTokenResponse;
          let getPaymentInfoResponse;
          let getPaymentInfoConfig;
          let paymentData;
          let responseFromPG;
          let tempMatrix;

          // config 객체를 선언하고, Content-Type을 JSON으로 설정합니다.
          config = { headers: { "Content-Type": "application/json" } };

          /**
           * @description PortOne API로부터 액세스 토큰을 발급받기 위한 요청입니다.
           * apiSecret 값을 사용하여 토큰을 요청하고, 반환된 액세스 토큰을 이후 결제 정보를 조회하는 데 사용합니다.
           * @see https://api.portone.io/login/api-secret
           */
          accessTokenResponse = await requestSystem(
            url + "/login/api-secret", 
            { apiSecret: portoneAPIKey }, 
            config
          );

          // 발급받은 액세스 토큰을 저장합니다.
          accessToken = accessTokenResponse.data.accessToken;

          // Authorization 헤더에 액세스 토큰을 추가하여 API 호출 시 인증 처리가 되도록 설정합니다.
          config.headers["Authorization"] = "Bearer " + accessToken;

          /**
           * @description 결제 정보를 조회하기 위한 설정을 복사하여 새로운 객체로 만듭니다.
           * config 객체를 깊은 복사(deep copy)하여 재사용합니다.
           */
          getPaymentInfoConfig = objectDeepCopy(config);

          // 결제 정보를 가져오기 위해 HTTP GET 메서드를 사용합니다.
          getPaymentInfoConfig.method = "get";

          /**
           * @description PortOne API를 사용하여 특정 결제 정보(oid)를 조회합니다.
           * @param {string} oid - 주문 번호입니다.
           * @see https://api.portone.io/payments/{oid}
           */
          getPaymentInfoResponse = await requestSystem(
            url + "/payments/" + oid, 
            { storeId }, 
            getPaymentInfoConfig
          );

          // API로부터 받은 결제 정보를 paymentData에 저장합니다.
          paymentData = getPaymentInfoResponse.data;

          try {
            // pgResponse는 JSON 형식이므로, 이를 파싱하여 사용합니다.
            responseFromPG = JSON.parse(paymentData.pgResponse);
          } catch {
            try {
              // 만약 JSON 파싱이 실패하면, pgResponse를 '&'로 나누어 키-값 쌍으로 변환합니다.
              tempMatrix = paymentData.pgResponse.split("&").map((str) => str.split("="));
              
              // 키-값 쌍을 반복문으로 처리하여 객체로 변환합니다.
              responseFromPG = {};
              for (let [key, value] of tempMatrix) {
                responseFromPG[key] = value;
              }
            } catch {
              // 실패할 경우 빈 객체로 설정합니다.
              responseFromPG = {};
            }
          }

          // 결제 상태가 'PAID'이면 성공 처리하고, 결제 정보를 가공합니다.
          if (paymentData.status.trim() === "PAID") {
            const today = new Date();

            /**
             * @description 결제 정보를 가공하여 클라이언트에 반환할 객체를 생성합니다.
             * @param {Object} paymentData - PortOne API로부터 받은 결제 정보입니다.
             */
            const convertingData = {
              goodName: paymentData.orderName, // 상품명
              goodsName: paymentData.orderName, // 상품명 (복수형)
              resultCode: "0000", // 결제 성공 코드
              resultMsg: "성공적으로 처리 하였습니다.", // 결제 성공 메시지
              tid: paymentData.pgTxId, // 결제 거래 식별자(TID)
              payMethod: "CARD", // 결제 방식은 카드로 고정
              applDate: `${String(today.getFullYear())}${zeroAddition(today.getMonth() + 1)}${zeroAddition(today.getDate())}${zeroAddition(today.getHours())}${zeroAddition(today.getMinutes())}${zeroAddition(today.getSeconds())}`, // 결제 승인 날짜
              mid: mid, // 상점 아이디
              MOID: paymentData.id, // 주문 번호
              TotPrice: String(paymentData.amount.total), // 총 결제 금액
              buyerName: paymentData.customer.name, // 구매자 이름
              CARD_BankCode: (typeof responseFromPG.CARD_BankCode === "string") ? responseFromPG.CARD_BankCode : responseFromPG.P_CARD_ISSUER_CODE, // 카드 발급사 코드
              CARD_Num: paymentData.method.card !== undefined ? paymentData.method.card.number : "", // 카드 번호
              CARD_ApplPrice: String(paymentData.amount.total), // 결제 승인 금액
              CARD_Code: (typeof responseFromPG.CARD_Code === "string") ? responseFromPG.CARD_Code : responseFromPG.P_CARD_PURCHASE_CODE, // 카드 코드
              vactBankName: paymentData.method.card !== undefined ? paymentData.method.card.name : "", // 카드 발급사 이름
              payDevice: "MOBILE", // 결제 기기 (모바일로 설정)
              P_FN_NM: paymentData.method.card !== undefined ? paymentData.method.card.name : "", // 카드 발급사 이름
              "__ignorethis__": 1, // 디버깅이나 테스트 용도로 무시할 필드
            };

            // 가공된 결제 정보를 클라이언트에 JSON 형식으로 전송합니다.
            res.send(JSON.stringify({ convertingData }));
          } else {
            // 결제가 'PAID'가 아닐 경우, 가상계좌를 발급하는 처리를 진행합니다.
            const today = new Date();
            const expired = new Date();
            expired.setHours(expired.getHours() + 47); // 가상계좌 만료 시간을 47시간 후로 설정

            /**
             * @description KakaoTalk 알림 메시지를 발송하는 비동기 함수 호출
             * @param {string} paymentData.customer.name - 고객 이름
             * @param {string} paymentData.customer.phoneNumber - 고객의 전화번호
             * @param {Object} 가상계좌 정보
             */
            await kakao.sendTalk("virtualAccount", paymentData.customer.name, paymentData.customer.phoneNumber, {
              client: paymentData.customer.name, // 고객 이름
              goodName: paymentData.orderName, // 상품명
              bankName: paymentData.method.bank, // 은행 이름
              account: paymentData.method.accountNumber, // 계좌 번호
              to: paymentData.method.remitteeName, // 송금자 이름
              amount: autoComma(paymentData.amount.total), // 금액
              date: dateToString(expired, true), // 만료 날짜
            });

            /**
             * @description 가상계좌 발급 처리 시의 반환 데이터
             * 결제 방식은 VACCOUNT(가상계좌)이며, 발급된 가상계좌 정보를 클라이언트에 반환합니다.
             */
            const convertingData = {
              goodName: paymentData.orderName, // 상품명
              goodsName: paymentData.orderName, // 상품명 (복수형)
              resultCode: paymentData.status.trim(), // 결제 상태 코드
              resultMsg: "가상 계좌 번호 발급", // 가상 계좌 발급 메시지
              tid: paymentData.pgTxId, // 결제 거래 식별자(TID)
              payMethod: "VACCOUNT", // 결제 방식은 가상계좌로 설정
              applDate: `${String(today.getFullYear())}${zeroAddition(today.getMonth() + 1)}${zeroAddition(today.getDate())}${zeroAddition(today.getHours())}${zeroAddition(today.getMinutes())}${zeroAddition(today.getSeconds())}`, // 결제 승인 날짜
              mid: mid, // 상점 아이디
              MOID: paymentData.id, // 주문 번호
              raw: paymentData, // 원본 결제 데이터
              "__ignorethis__": 1, // 디버깅이나 테스트 용도로 무시할 필드
            };

            // 가상계좌 발급 정보를 클라이언트에 JSON 형식으로 전송합니다.
            res.send(JSON.stringify({ convertingData }));
          }
    
        } else if (req.body.mode === "cashPhone") {
    
          // 클라이언트로부터 전달된 요청(req.body)에서 phone, hash, bilid, proid, desid, cliid, name을 추출합니다.
          // equalJson은 JSON을 deep copy하거나 Date 객체를 살리는 JSON.parse 업그레이드 버전 메서드입니다.
          const { phone, hash, bilid, proid, desid, cliid, name } = equalJson(req.body);

          /**
           * @description decryptoHash 메서드를 사용하여 클라이언트에서 전달받은 hash 값을 복호화합니다.
           * 이때 trim()을 사용하여 문자열의 양 끝 공백을 제거한 후 복호화합니다.
           * @param {string} password - 복호화에 사용되는 비밀번호
           * @param {string} hash - 클라이언트에서 받은 암호화된 데이터
           * @returns {Object} 복호화된 데이터
           */
          const data = JSON.parse(await decryptoHash(password, hash.trim()));

          await requestSystem(
            "https://" + instance.address.officeinfo.host + ":3002/accountTimeUpdate", // 서버로 요청을 보내는 URL
            {
              whereQuery: {
                // MongoDB 쿼리 조건을 설정합니다. $and 연산자를 사용하여 여러 조건을 결합합니다.
                $and: [
                  { bilid }, // 빌링 ID가 일치하는 조건
                  { proid }, // 프로젝트 ID가 일치하는 조건
                  { "accountInfo.no_oid": data.MOID } // 복호화된 데이터에서 가져온 MOID가 일치하는 조건
                ]
              },
              updateQuery: { phone }, // 업데이트할 필드로 클라이언트의 전화번호를 설정
              name, // 클라이언트 이름을 전송 (name은 updateQuery와 별도로 포함되어 있음)
              phone // 클라이언트 전화번호도 전송
            },
            {
              headers: { "Content-Type": "application/json" } // 요청의 헤더를 JSON 형식으로 설정
            }
          );

          // 처리 완료 후 클라이언트에 JSON 형식으로 응답을 전송합니다.
          res.send(JSON.stringify({ message: "done" })); // 처리 성공 메시지 "done"을 전송
    
        } else {
    
          /**
           * @description 모바일 결제 데이터를 변환하기 위한 매핑 객체입니다.
           * @constant {Object} mobileConverting - 아임포트에서 제공하는 결제 데이터 필드를 클라이언트에서 사용하는 필드로 변환합니다.
           * @property {string} P_STATUS - 결제 결과 코드(resultCode)와 매핑
           * @property {string} P_RMESG1 - 결제 결과 메시지(resultMsg)와 매핑
           * @property {string} P_TID - 결제 거래 ID(tid)와 매핑
           * @property {string} P_TYPE - 결제 방식(payMethod)와 매핑
           * @property {string} P_AUTH_DT - 결제 승인 날짜(applDate)와 매핑
           * @property {string} P_MID - 상점 아이디(mid)와 매핑
           * @property {string} P_OID - 주문 번호(MOID)와 매핑
           * @property {string} P_AMT - 총 결제 금액(TotPrice)와 매핑
           * @property {string} P_UNAME - 구매자 이름(buyerName)과 매핑
           * @property {string} P_CARD_ISSUER_CODE - 카드 발급사 코드(CARD_BankCode)와 매핑
           * @property {string} P_CARD_NUM - 카드 번호(CARD_Num)와 매핑
           * @property {string} P_CARD_APPLPRICE - 결제 승인 금액(CARD_ApplPrice)와 매핑
           * @property {string} P_FN_CD1 - 카드 코드(CARD_Code)와 매핑
           * @property {string} P_FN_NM - 카드 발급사 이름(vactBankName)과 매핑
           * @property {string} P_VACT_NUM - 가상 계좌 번호(VACT_Num)와 매핑
           * @property {string} P_VACT_NAME - 가상 계좌 소유자 이름(VACT_Name)과 매핑
           * @property {string} P_VACT_DATE - 가상 계좌 만료일(VACT_Date)과 매핑
           */
          const mobileConverting = {
            P_STATUS: "resultCode",
            P_RMESG1: "resultMsg",
            P_TID: "tid",
            P_TYPE: "payMethod",
            P_AUTH_DT: "applDate",
            P_MID: "mid",
            P_OID: "MOID",
            P_AMT: "TotPrice",
            P_UNAME: "buyerName",
            P_CARD_ISSUER_CODE: "CARD_BankCode",
            P_CARD_NUM: "CARD_Num",
            P_CARD_APPLPRICE: "CARD_ApplPrice",
            P_FN_CD1: "CARD_Code",
            P_FN_NM: "vactBankName",
            P_VACT_NUM: "VACT_Num",
            P_VACT_NAME: "VACT_Name",
            P_VACT_DATE: "VACT_Date",
          };

          // 응답 데이터의 문자셋을 설정합니다. UTF-8로 설정하여 한글 등의 문자를 올바르게 처리합니다.
          const charset = "UTF-8";

          // 응답 데이터의 포맷을 JSON 형식으로 설정합니다.
          const format = "JSON";

          // 현재 시간을 밀리초로 변환하여 타임스탬프로 사용합니다. 주로 결제 요청 시의 시간을 나타냅니다.
          const timestamp = String(now.valueOf());

          let device; // 결제가 모바일 기기인지 데스크탑인지 판단하여 저장하는 변수
          let resultCode, authUrl, netCancelUrl, returnUrl, orderNumber, authToken, mid;
          let signature; // 결제 요청 시 사용되는 서명 값
          let response, responseData; // 응답 데이터를 저장할 변수
          let target; // 처리 대상 데이터를 저장할 임시 변수
          let targetArr, tong, convertTong; // 처리 과정에서 사용할 배열 및 객체
          let tempStr, tempArr; // 임시로 문자열과 배열을 저장할 변수

          // P_STATUS가 정의되지 않은 경우 데스크탑 결제 요청으로 처리합니다.
          if (req.body.P_STATUS === undefined) {
            device = "desktop"; // 데스크탑 결제
            resultCode = req.body.resultCode; // 결제 결과 코드
            authUrl = req.body.authUrl; // 인증 URL
            netCancelUrl = req.body.netCancelUrl; // 네트워크 취소 URL
            returnUrl = req.body.returnUrl; // 결제 후 돌아갈 URL
            orderNumber = req.body.orderNumber; // 주문 번호
            authToken = req.body.authToken; // 인증 토큰
            mid = req.body.mid; // 상점 아이디
          } else {
            // P_STATUS가 정의된 경우 모바일 결제 요청으로 처리합니다.
            device = "mobile"; // 모바일 결제
            resultCode = (req.body.P_STATUS === "00" ? "0000" : req.body.P_STATUS); // 결제 상태 코드
            authUrl = req.body.P_REQ_URL; // 모바일 인증 URL
            netCancelUrl = ""; // 모바일에서는 네트워크 취소 URL이 필요 없습니다.
            returnUrl = req.body.P_NOTI.split("__split__")[2]; // NOTI 값에서 결제 후 돌아갈 URL을 추출합니다.
            orderNumber = ""; // 모바일에서는 별도로 주문 번호를 처리하지 않음
            authToken = req.body.P_TID; // 모바일 인증 토큰
            mid = req.body.P_NOTI.split("__split__")[1]; // NOTI 값에서 상점 아이디를 추출
          }
  
          if (device === "desktop") {
            // 데스크탑에서 결제 요청을 한 경우 처리하는 로직입니다.

            /**
             * @description SHA256 해시 알고리즘을 사용하여 서명을 생성합니다. 서명은 authToken과 timestamp를 이용하여 만듭니다.
             * 서명은 결제 요청의 유효성을 확인하는 데 사용됩니다.
             */
            signature = crypto.createHash("sha256").update(`authToken=${authToken}&timestamp=${timestamp}`).digest("hex");

            // requestSystem을 사용하여 결제 인증 URL에 결제 정보를 요청합니다.
            response = await requestSystem(authUrl, { mid, authToken, timestamp, signature, charset, format });

            /**
             * @description 응답 데이터를 암호화하여 JSON 형식으로 변환한 후 반환합니다.
             * cryptoString은 Mother 클래스의 메서드로, 문자열을 암호화하는 역할을 합니다.
             */
            responseData = await cryptoString(password, JSON.stringify(response.data));

            // 결제 성공 시, 완료 페이지로 리다이렉트합니다.
            if (response.data.resultCode === "0000") {
              res.redirect("/middle/estimation?" + returnUrl.split('?')[1] + "&mode=complete" + "&hash=" + responseData);
            } else {
              // 결제가 실패한 경우 실패 페이지로 리다이렉트합니다.
              res.redirect("/middle/estimation?" + returnUrl.split('?')[1] + "&mode=fail" + "&hash=" + responseData);
            }
          } else {
            // 모바일에서 결제 요청을 한 경우 처리하는 로직입니다.

            if (resultCode === "0000") {
              // 결제가 성공했을 때 처리하는 로직입니다.

              // requestSystem을 사용하여 결제 인증 URL에 결제 정보를 요청합니다.
              response = await requestSystem(authUrl, { P_MID: mid, P_TID: authToken });

              // 응답 데이터를 가공하기 위한 준비를 합니다. 결제 데이터를 파싱하고 배열로 변환합니다.
              target = response.data;
              targetArr = target.split('&').map((q) => q.split('='));

              /**
               * @description 특정 키(needs, mode, cliid, desid, proid)들을 결합하여 처리합니다.
               * 해당 데이터들을 하나의 문자열로 연결하여 처리하기 위해 반복문을 사용합니다.
               */
              for (let i = 1; i < targetArr.length; i++) {
                if (["needs", "mode", "cliid", "desid", "proid"].includes(targetArr[i][0])) {
                  tempStr = targetArr[i - 1][targetArr[i - 1].length - 1] + "&" + targetArr[i].join('=');
                  targetArr[i - 1][targetArr[i - 1].length - 1] = tempStr;
                }
              }

              // 필터링을 통해 필요한 데이터만 남기고 불필요한 데이터(needs, mode 등)는 제거합니다.
              targetArr = targetArr.filter(arr => !["needs", "mode", "cliid", "desid", "proid"].includes(arr[0]));

              // 배열 안에서 여러 항목으로 나뉜 데이터를 다시 결합하여 올바른 형식으로 만듭니다.
              for (let i = 0; i < targetArr.length; i++) {
                if (targetArr[i].length > 2) {
                  tempArr = JSON.parse(JSON.stringify(targetArr[i]));
                  tempArr.shift();
                  targetArr[i] = [targetArr[i][0], tempArr.join('=')];
                }
              }

              // 파싱된 데이터를 객체 형식으로 변환합니다.
              tong = {};
              for (let arr of targetArr) {
                tong[arr[0]] = arr[1];
              }

              // 변환된 데이터를 다시 클라이언트에 맞는 형식으로 변환합니다.
              convertTong = {};
              convertTong.goodName = tong.P_NOTI.split("__split__")[0];
              convertTong.goodsName = tong.P_NOTI.split("__split__")[0];

              // mobileConverting 객체를 사용하여 응답 데이터를 변환합니다.
              for (let from in mobileConverting) {
                if (tong[from] !== undefined) {
                  convertTong[mobileConverting[from]] = tong[from];
                }
              }

              // 응답 코드가 "00"일 경우 "0000"으로 변환하여 처리합니다.
              if (convertTong.resultCode === "00") {
                convertTong.resultCode = "0000";
              }

              // 결제 기기를 모바일로 설정합니다.
              convertTong.payDevice = "MOBILE";
              convertTong.P_FN_NM = convertTong.vactBankName;

              // 변환된 데이터를 암호화한 후, JSON 형식으로 반환합니다.
              responseData = await cryptoString(password, JSON.stringify(convertTong));

              // 결제가 성공했을 때, 완료 페이지로 리다이렉트합니다.
              if (convertTong.resultCode === "0000") {
                res.redirect("/middle/estimation?" + returnUrl.split('?')[1] + "&mode=complete" + "&hash=" + responseData);
              } else {
                // 결제가 실패했을 때, 실패 페이지로 리다이렉트하며, 오류를 기록합니다.
                logger.alert("결제 문제 생김 (rou_post_inicisPayment) : " + JSON.stringify(convertTong, null, 2) + "\n" + JSON.stringify(req.body, null, 2)).catch((e) => { console.log(e); });
                res.redirect("/middle/estimation?" + returnUrl.split('?')[1] + "&mode=fail" + "&hash=" + responseData);
              }
            } else {
              // 결제가 실패했을 때, 실패 페이지로 리다이렉트하며, 오류를 기록합니다.
              logger.alert("결제 문제 생김 (rou_post_inicisPayment) : " + resultCode + "\n" + JSON.stringify(req.body, null, 2)).catch((e) => { console.log(e); });
              res.redirect("/middle/estimation?" + returnUrl.split('?')[1] + "&mode=fail");
            }
          }
    
        }
    
      } catch (e) {
        // 에러 발생 시 로그를 기록하고 에러 메시지 반환
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /callTo
     * @description 특정 사람에게 전화 요청을 처리하는 라우터입니다.
     * @param {object} req - 클라이언트 요청 객체.
     * @param {object} req.body - 요청 본문 데이터.
     * @param {string} [req.body.who] - 전화할 대상의 이메일 일부.
     * @param {string} [req.body.phone] - 전화할 대상의 전화번호.
     * @param {string} [req.body.proid] - 프로젝트 ID, 이를 통해 클라이언트의 전화번호를 조회합니다.
     * @param {object} res - 서버 응답 객체.
     */
    router.post([ "/callTo" ], async function (req, res) {
      // 응답의 Content-Type을 JSON으로 설정
      res.set({ "Content-Type": "application/json" });

      try {
        // who 필드가 없으면 기본 메시지를 반환하고 종료
        if (req.body.who === undefined) {
          res.send(JSON.stringify({ message: "OK" }));
        } else {
          // 인스턴스의 멤버 리스트를 가져옴
          const members = instance.members;
          let thisPerson, index, number, phone, who;

          // 요청 본문에서 who 값을 가져옴 (전화할 사람)
          who = req.body.who;

          // phone 필드가 있으면 이를 사용, 없으면 proid를 사용하여 전화번호를 조회
          if (req.body.phone !== undefined) {
            phone = req.body.phone; // 전화번호가 직접 전달된 경우
          } else if (req.body.proid !== undefined) {
            // 프로젝트 ID를 통해 클라이언트의 전화번호를 가져옴
            phone = (await back.getClientById(
              (await back.getProjectById(req.body.proid, { selfMongo: instance.mongo })).cliid,
              { selfMongo: instance.mongo }
            )).phone;
          } else {
            // phone이나 proid가 없으면 에러 발생
            throw new Error("invalid post");
          }

          // 멤버 리스트에서 이메일에 who 값을 포함한 멤버를 찾음
          for (let { id, email } of members) {
            if (email.includes(who)) {
              thisPerson = id;
              break;
            }
          }

          // 찾은 멤버의 index를 officeinfo.phone.members 배열에서 검색
          index = address.officeinfo.phone.members.indexOf(thisPerson);

          // 멤버의 전화번호가 없거나 유효하지 않은 경우 에러 처리
          if (index === -1 || address.officeinfo.phone.numbers[index] === undefined) {
            // 로그에 에러 메시지 기록
            logger.alert("Console 서버 문제 생김 (rou_post_callTo): cannot find member index => " +
              String(index) + ", " + thisPerson + ", " + who + ", " + JSON.stringify(req.body)
            ).catch((e) => { console.log(e); });

            // 에러 메시지 응답
            res.send(JSON.stringify({ message: "error" }));
          } else {
            // 유효한 멤버의 전화번호를 가져옴
            number = address.officeinfo.phone.numbers[index];

            // 전화 요청을 외부 시스템에 전달
            await requestSystem(
              "https://" + instance.address.secondinfo.host + ":3003/clickDial",
              { id: number, destnumber: phone.replace(/[^0-9]/g, '') }, // 숫자 외의 문자는 제거
              { headers: { "Content-Type": "application/json" } }
            );

            // 성공 메시지 반환
            res.send(JSON.stringify({ message: "true" }));
          }
        }
      } catch (e) {
        // 에러 발생 시 로그를 기록하고 에러 메시지 반환
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /ghostDesigner_updateAnalytics
     * @description 디자이너의 분석 데이터를 업데이트하는 라우터입니다. 페이지, 업데이트, 전송 모드에 따라 데이터를 기록합니다.
     * @param {object} req - 클라이언트 요청 객체.
     * @param {object} res - 서버 응답 객체.
     */
    router.post([ "/ghostDesigner_updateAnalytics" ], async function (req, res) {
      try {
        // 필수 요청 데이터가 없으면 오류 발생
        if (req.body.mode === undefined || req.body.desid === undefined || req.body.page === undefined || req.body.who === undefined) {
          throw new Error("invalid post"); // 필수 파라미터가 없으면 예외 처리
        }

        // 요청 본문에서 필요한 데이터 추출
        const { mode, desid, page, who } = req.body;

        // 클라이언트의 IP 주소를 가져와서 정리
        const ip = String(req.headers["x-forwarded-for"] === undefined ? req.socket.remoteAddress : req.headers["x-forwarded-for"]).trim().replace(/[^0-9\.]/gi, '');

        // 사용자 에이전트 정보 추출 (브라우저, OS, 플랫폼 등)
        const rawUserAgent = req.useragent;
        const { source: userAgent, browser, os, platform } = rawUserAgent;

        // 리퍼러(이전 페이지 URL)가 없는 경우 빈 문자열로 설정
        const referrer = (req.headers.referer === undefined ? "" : req.headers.referer);

        let whereQuery, updateQuery; // 조건 및 업데이트 쿼리
        let history; // 디자이너의 히스토리 데이터 저장 변수
        let update; // 업데이트 데이터
        let ipObj; // IP 관련 정보
        let updateObj; // 업데이트 객체
        
        // desid(디자이너 ID)를 사용하여 whereQuery 작성
        whereQuery = { desid };

        // 디자이너 히스토리 데이터를 가져옴
        history = await back.getHistoryById("designer", desid, { selfMongo: instance.mongolocal });

        // 히스토리가 없는 경우 새로 생성
        if (history === null) {
          await back.createHistory("designer", { desid }, { selfMongo: instance.mongolocal, secondMongo: instance.mongo });
          history = await back.getHistoryById("designer", desid, { selfMongo: instance.mongolocal });
        }

        // 요청된 모드가 'page'일 경우 페이지 방문 기록 업데이트
        if (mode === "page") {

          // IP 정보를 파싱하여 가져옴
          ipObj = await ipParsing(ip);
          if (Object.keys(ipObj).length === 0) {
            ipObj = { ip }; // IP 파싱 실패 시 원본 IP만 저장
          }

          // 페이지 방문 분석 데이터를 히스토리에 추가
          history[page].analytics.page.push({ page, date: new Date(), who, referrer, userAgent, browser, os, platform, mobile: rawUserAgent.isMobile, ...ipObj });

          // 업데이트할 쿼리 생성
          updateQuery = {};
          updateQuery[page + ".analytics.page"] = history[page].analytics.page;

          // 히스토리 업데이트
          await back.updateHistory("designer", [ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });

        } else if (mode === "update") {
          // 'update' 모드일 경우 업데이트 데이터를 히스토리에 추가

          // 요청 본문에서 업데이트 데이터를 파싱
          update = equalJson(req.body.update);

          // 업데이트 분석 데이터를 히스토리에 추가
          history[page].analytics.update.push({ page, who, date: new Date(), update });

          // 업데이트할 쿼리 생성
          updateQuery = {};
          updateQuery[page + ".analytics.update"] = history[page].analytics.update;

          // 히스토리 업데이트
          await back.updateHistory("designer", [ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });

        } else if (mode === "send") {
          // 'send' 모드일 경우 전송 관련 데이터를 기록

          // IP 정보를 파싱하여 가져옴
          ipObj = await ipParsing(ip);
          if (Object.keys(ipObj).length === 0) {
            ipObj = { ip }; // IP 파싱 실패 시 원본 IP만 저장
          }

          // 전송 데이터 객체 생성
          updateObj = { page, date: new Date(), who, referrer, userAgent, browser, os, platform, mobile: rawUserAgent.isMobile, ...ipObj };

          // 요청 본문에 cliid가 있으면 추가
          if (typeof req.body.cliid === "string") {
            updateObj.cliid = req.body.cliid.trim();
          }

          // 전송 데이터를 히스토리에 추가
          history[page].analytics.send.push(updateObj);

          // 업데이트할 쿼리 생성
          updateQuery = {};
          updateQuery[page + ".analytics.send"] = history[page].analytics.send;

          // 히스토리 업데이트
          await back.updateHistory("designer", [ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });

        } else {
          // mode 값이 유효하지 않으면 예외 발생
          throw new Error("invalid mode");
        }

        // 성공적으로 처리되면 응답 전송
        res.set({ "Content-Type": "application/json" });
        res.send(JSON.stringify({ message: "done" }));

      } catch (e) {
        // 오류 발생 시 로깅하고 클라이언트에 오류 메시지 응답
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /ghostDesigner_getAnalytics
     * @description 디자이너의 특정 분석 데이터를 가져오는 라우터입니다. 분석 데이터는 요청된 desid, mode, type에 따라 필터링됩니다.
     * @param {object} req - 클라이언트 요청 객체
     * @param {object} req.body - 요청의 본문 데이터
     * @param {string} req.body.desid - 디자이너 ID
     * @param {string} req.body.mode - 분석 데이터의 모드 (예: 페이지, 업데이트 등)
     * @param {string} req.body.type - 분석 데이터의 유형 (예: 페이지 방문, 업데이트 등)
     * @param {string} [req.body.cliid] - 클라이언트 ID (선택 사항)
     * @param {object} res - 서버 응답 객체
     */
    router.post([ "/ghostDesigner_getAnalytics" ], async function (req, res) {
      // 응답 헤더 설정: JSON 형식, CORS 허용
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서 접근 허용
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용할 HTTP 메서드
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용할 요청 헤더
      });

      try {
        // 필수 파라미터가 없는 경우 예외 발생
        if (req.body.desid === undefined || req.body.mode === undefined || req.body.type === undefined) {
          throw new Error("invalid post"); // 필수 요청 데이터가 누락되었을 때의 에러 처리
        }

        // 요청 본문에서 필요한 데이터 추출
        const { desid, mode, type } = req.body;

        // 로컬 MongoDB 인스턴스 가져오기
        const selfMongo = instance.mongolocal;
        const db = "miro81"; // 사용할 데이터베이스 이름
        const collection = "designerHistory"; // 사용할 컬렉션 이름
        let projectQuery; // MongoDB 프로젝션 쿼리
        let rows, row; // 결과로 받은 데이터
        let targetAnalytics; // 분석 데이터 저장 변수

        // MongoDB에서 가져올 필드 설정 (mode에 해당하는 필드만 1로 설정)
        projectQuery = {};
        projectQuery[mode] = 1;

        // desid에 해당하는 디자이너의 히스토리에서 특정 mode의 데이터를 찾음
        rows = await selfMongo.db(db).collection(collection).find({ desid }).project(projectQuery).toArray();

        // 데이터가 없는 경우 에러 처리
        if (rows.length === 0) {
          throw new Error("invalid desid"); // 잘못된 디자이너 ID일 때의 에러 처리
        }

        // 첫 번째 결과를 가져옴 (디자이너의 히스토리 데이터)
        [row] = rows;

        // mode와 type에 해당하는 분석 데이터를 가져옴
        targetAnalytics = row[mode].analytics[type];

        // cliid가 없는 경우 전체 분석 데이터를 응답, 있는 경우 해당 클라이언트의 분석 데이터만 필터링
        if (req.body.cliid === undefined) {
          res.send(JSON.stringify(targetAnalytics)); // 전체 분석 데이터를 반환
        } else {
          // cliid를 사용하여 필터링된 데이터를 반환
          res.send(JSON.stringify(targetAnalytics.filter((obj) => { return obj.cliid === req.body.cliid })));
        }

      } catch (e) {
        // 예외가 발생하면 로깅하고 오류 메시지를 클라이언트에 응답
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json"); // 응답의 Content-Type을 JSON으로 설정
        res.send(JSON.stringify({ error: e.message })); // 에러 메시지를 JSON 형식으로 반환
      }
    });
    
    /**
     * @route POST /errorLog
     * @description 에러 로그를 수집하는 라우터입니다.
     * @param {object} req - 클라이언트 요청 객체.
     * @param {object} res - 서버 응답 객체.
     */
    router.post([ "/errorLog" ], async function (req, res) {
      // 응답 헤더 설정: JSON 형식 응답 및 CORS 허용
      res.set({
        "Content-Type": "application/json", // 응답 데이터 형식을 JSON으로 설정
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서 접근 허용
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용할 HTTP 메서드 설정
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용할 요청 헤더 설정
      });

      try {
        let ip, rawUserAgent; // 클라이언트의 IP 주소와 유저 에이전트를 저장할 변수

        // req.body.message가 문자열이 아닌 경우 오류 처리
        if (typeof req.body.message !== "string") {
          throw new Error("invalid post"); // 잘못된 형식의 요청일 때 오류 발생
        }

        // 클라이언트의 IP 주소를 가져옵니다. 'x-forwarded-for' 헤더가 없으면 소켓의 원격 주소를 사용.
        ip = String(
          req.headers["x-forwarded-for"] === undefined 
          ? req.socket.remoteAddress // 클라이언트가 프록시 뒤에 없는 경우 소켓의 주소 사용
          : req.headers["x-forwarded-for"] // 프록시 서버가 존재할 경우 프록시 헤더에서 IP 주소 추출
        ).trim().replace(/[^0-9\.]/gi, ''); // IP 주소에서 숫자와 점(.)만 남기고 나머지 문자 제거

        // 클라이언트의 user agent 정보를 가져옵니다. 
        rawUserAgent = req.useragent;

        // 클라이언트에게 처리 완료 메시지 전송
        res.send(JSON.stringify({ message: "done" }));

      } catch (e) {
        // 오류가 발생했을 때 로그로 남기고 클라이언트에게 오류 메시지 전송
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json"); // 응답 헤더 다시 설정
        res.send(JSON.stringify({ error: e.message })); // 오류 메시지를 JSON 형식으로 클라이언트에게 전달
      }
    });
    
    /**
     * @route POST /constructInteraction
     * @description 프로젝트 시공 관련 다양한 작업을 처리하는 라우터입니다. 결제 업데이트, 계약서 전송, 금액 변경, 가상 계좌 동기화 등을 수행합니다.
     * @param {Object} req - 클라이언트 요청 객체로, 요청 본문에 다양한 작업 데이터를 포함합니다.
     * @param {Object} res - 서버 응답 객체로, 작업 처리 결과를 반환합니다.
     */
    router.post([ "/constructInteraction" ], async function (req, res) {
      // 응답 헤더를 설정하여 클라이언트로 반환합니다.
      res.set({
        "Content-Type": "text/plain", // 응답의 Content-Type을 plain 텍스트로 설정
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 요청을 허용
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 헤더를 설정
      });

      // instance 객체에서 back, kakao, mother 모듈을 불러옵니다.
      const back = instance.back; // 백엔드와 관련된 작업을 처리하는 객체
      const kakao = instance.kakao; // 카카오톡 관련 메시지 전송 기능을 담당하는 객체

      // Mother 클래스에서 여러 유틸리티 메서드를 불러옵니다.
      const { equalJson, dateToString, stringToDate, requestSystem, autoComma, messageSend } = instance.mother; 
      // equalJson: JSON 파싱 및 딥 카피를 수행하는 업그레이드된 메서드
      // dateToString: 날짜 객체를 문자열로 변환하는 메서드
      // stringToDate: 문자열을 날짜 객체로 변환하는 메서드
      // requestSystem: 외부 시스템으로 HTTP 요청을 보내는 메서드
      // autoComma: 숫자에 콤마를 자동으로 추가하는 메서드
      // messageSend: 메시지를 전송하는 메서드

      /**
       * @function numberToHangul
       * @description 숫자를 한글로 변환하는 함수입니다. 예를 들어 123은 '백이십삼'으로 변환됩니다.
       * @param {number} number - 변환할 정수 값입니다.
       * @returns {string} 변환된 한글 숫자 문자열입니다.
       * @throws {Error} 정수가 아닌 값이 입력될 경우 에러를 발생시킵니다.
       */
      const numberToHangul = (number) => {
        // 입력된 값이 숫자가 아니면 에러를 발생시킵니다.
        if (typeof number !== "number") {
          throw new Error("input must be integer");
        }

        // 한글 숫자 변환에 사용되는 배열을 정의합니다.
        const hangul0 = [ '', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구' ]; // 일의 자리 숫자
        const hangul1 = [ '', '십', '백', '천' ]; // 십, 백, 천의 자리 숫자
        const hangul2 = [ '', '만', '억', '조', '경', '해', '자', '양', '구', '간', '정', '재', '극' ]; // 만 단위 이후의 자리

        try {
          let numberStr, numberArr, hangul3, first;

          // 각 자리에 맞는 한글 표현을 조합하기 위한 배열을 생성합니다.
          hangul3 = [];
          for (let i = 0; i < hangul2.length; i++) {
            for (let j = 0; j < hangul1.length; j++) {
              hangul3.push(hangul1[j] + hangul2[i]); // 십, 백, 천 단위를 각 자리별로 결합
            }
          }

          // 입력된 숫자를 내림 처리하여 정수로 만듭니다.
          number = Math.floor(number);

          // 숫자를 문자열로 변환하여 각 자릿수를 배열로 변환한 후, 배열을 역순으로 바꿉니다.
          numberStr = String(number);
          numberArr = numberStr.split('').reverse();

          // 배열의 각 자릿수를 한글로 변환합니다.
          numberArr = numberArr.map((str, index) => {
            if (str === '0') {
              return ''; // 0일 경우 빈 문자열로 처리
            } else {
              return hangul0[Number(str)] + hangul3[index]; // 숫자에 해당하는 한글과 자릿수를 결합
            }
          });

          // 자릿수가 반복되는 경우, 중복된 자릿수를 제거합니다.
          for (let i = 1; i < hangul2.length; i++) {
            first = true;
            for (let j = 0; j < numberArr.length; j++) {
              if ((new RegExp(hangul2[i] + '$')).test(numberArr[j])) {
                if (first) {
                  first = false; // 첫 번째 반복은 유지
                } else {
                  numberArr[j] = numberArr[j].slice(0, -1); // 중복된 자릿수를 제거
                }
              }
            }
          }

          // 배열을 다시 원래 순서로 돌린 후 문자열로 결합합니다.
          numberArr.reverse();
          return numberArr.join(''); // 변환된 한글 숫자 문자열을 반환

        } catch (e) {
          // 오류가 발생할 경우 콘솔에 로그를 출력하고 null을 반환합니다.
          console.log(e);
          return null;
        }
      }
      try {

        // 클라이언트에서 보낸 요청의 body에서 mode와 proid가 문자열인지 확인합니다.
        // mode는 작업의 종류를 나타내며, proid는 프로젝트 ID입니다.
        if (typeof req.body.mode !== "string" || typeof req.body.proid !== "string") {
          throw new Error("invalid post 1"); // 둘 중 하나라도 문자열이 아니면 오류를 발생시킵니다.
        }

        // mode 값이 사전에 정의된 작업 목록에 포함되어 있는지 확인합니다.
        // "updatePayments", "inspection", "sendContract" 등 여러 작업 종류 중 하나여야 합니다.
        if (![ "updatePayments", "inspection", "sendContract", "constructOnoff", "amountSync", "chargeGuide", "changeAmount", "historyUpdate" ].includes(req.body.mode)) {
          throw new Error("invalid post 2"); // mode 값이 허용되지 않는 값이면 오류를 발생시킵니다.
        }

        // 요청 본문에서 mode와 proid를 추출합니다.
        // mode: 작업의 종류, proid: 프로젝트 ID
        const { mode, proid } = req.body;

        // 백엔드에서 프로젝트 정보를 가져옵니다.
        // back.getProjectById는 주어진 proid를 사용해 프로젝트 데이터를 가져오는 함수입니다.
        // selfMongo는 MongoDB 인스턴스를 나타냅니다.
        const project = await back.getProjectById(proid, { selfMongo: instance.mongo });

        // 프로젝트 기록(history) 데이터를 가져옵니다.
        // back.getHistoryById는 프로젝트의 히스토리 정보를 가져오는 함수입니다.
        const projectHistory = await back.getHistoryById("project", proid, { selfMongo: instance.mongolocal });

        // 프로젝트 객체에서 디자인 프로세스 내의 시공 정보(construct)를 추출합니다.
        const { process: { design: { construct } } } = project;

        // 결과(result)와 요약(summary)를 저장할 변수를 선언합니다.
        let result, summary;

        // mode가 "constructOnoff"가 아니고, construct 정보가 없는 경우 오류를 발생시킵니다.
        // construct가 null이면 프로젝트에 시공 정보가 없다는 의미입니다.
        if (mode !== "constructOnoff" && construct === null) {
          throw new Error("invalid proid"); // 잘못된 proid로 인해 시공 정보를 찾지 못한 경우 오류를 발생시킵니다.
        }
    
        if (mode === "updatePayments") {

          // first, start, middle, remain, total 값이 요청에서 제공되지 않으면 오류를 발생시킵니다.
          if (req.body.first === undefined || req.body.start === undefined || req.body.middle === undefined || req.body.remain === undefined || req.body.total === undefined) {
            throw new Error("invalid post"); // 필요한 데이터가 누락된 경우 에러를 발생시킵니다.
          }

          // 요청에서 받은 데이터를 equalJson을 통해 딥 카피 및 Date 객체 처리를 수행합니다.
          // total: 전체 결제 금액, first: 계약금, start: 착수금, middle: 중도금, remain: 잔금
          const { total, first, start, middle, remain } = equalJson(req.body);

          // 각 결제 항목을 저장할 객체를 선언합니다.
          let firstObj, startObj, middleObj, remainObj;

          // MongoDB에서 업데이트할 쿼리 변수를 선언합니다.
          let whereQuery, updateQuery;

          // 첫 번째 결제 항목이 존재하지 않을 경우, 기본 값을 반환하는 메서드를 사용해 초기화합니다.
          if (construct.contract.payments.first === null) {
            firstObj = back.returnProjectDummies("process.design.construct.contract.payments");
          } else {
            firstObj = construct.contract.payments.first; // 이미 존재하는 결제 정보가 있으면 그 값을 사용합니다.
          }

          // firstObj의 결제 금액을 계산합니다. 전체 금액(total)에서 first의 비율에 따라 금액을 산정합니다.
          firstObj.calculation.amount.consumer = Math.round(Math.floor(total * (first.ratio / 100)) / 1000) * 1000;
          // 부가세(vat)를 계산합니다. 소비자 금액의 1/11로 계산됩니다.
          firstObj.calculation.amount.vat = Math.floor(firstObj.calculation.amount.consumer / 11);
          // 공급가액(supply)은 소비자 금액에서 부가세를 뺀 값입니다.
          firstObj.calculation.amount.supply = firstObj.calculation.amount.consumer - firstObj.calculation.amount.vat;

          // 착수금(start)의 계산 방식도 위와 동일합니다.
          if (construct.contract.payments.start === null) {
            startObj = back.returnProjectDummies("process.design.construct.contract.payments");
          } else {
            startObj = construct.contract.payments.start;
          }
          startObj.calculation.amount.consumer = Math.round(Math.floor(total * (start.ratio / 100)) / 1000) * 1000;
          startObj.calculation.amount.vat = Math.floor(startObj.calculation.amount.consumer / 11);
          startObj.calculation.amount.supply = startObj.calculation.amount.consumer - startObj.calculation.amount.vat;

          // 중도금(middle)의 계산도 위와 동일하게 이루어집니다.
          if (construct.contract.payments.middle === null) {
            middleObj = back.returnProjectDummies("process.design.construct.contract.payments");
          } else {
            middleObj = construct.contract.payments.middle;
          }
          middleObj.calculation.amount.consumer = Math.round(Math.floor(total * (middle.ratio / 100)) / 1000) * 1000;
          middleObj.calculation.amount.vat = Math.floor(middleObj.calculation.amount.consumer / 11);
          middleObj.calculation.amount.supply = middleObj.calculation.amount.consumer - middleObj.calculation.amount.vat;

          // 잔금(remain)의 계산도 동일하게 수행됩니다.
          if (construct.contract.payments.remain === null) {
            remainObj = back.returnProjectDummies("process.design.construct.contract.payments");
          } else {
            remainObj = construct.contract.payments.remain;
          }
          remainObj.calculation.amount.consumer = Math.round(Math.floor(total * (remain.ratio / 100)) / 1000) * 1000;
          remainObj.calculation.amount.vat = Math.floor(remainObj.calculation.amount.consumer / 11);
          remainObj.calculation.amount.supply = remainObj.calculation.amount.consumer - remainObj.calculation.amount.vat;

          // 프로젝트의 결제 정보를 업데이트하기 위한 쿼리를 준비합니다.
          whereQuery = { proid }; // 프로젝트 ID를 기준으로 업데이트할 대상을 찾습니다.
          updateQuery = {};
          updateQuery["process.design.construct.contract.payments.first"] = firstObj;
          updateQuery["process.design.construct.contract.payments.start"] = startObj;
          updateQuery["process.design.construct.contract.payments.middle"] = middleObj;
          updateQuery["process.design.construct.contract.payments.remain"] = remainObj;

          // MongoDB에 업데이트 쿼리를 실행하여 결제 정보를 저장합니다.
          await back.updateProject([ whereQuery, updateQuery ], { selfMongo: instance.mongo });

          // 업데이트된 결제 정보를 결과로 반환합니다.
          result = {
            message: "success", // 성공 메시지
            core: {
              first: firstObj, // 계약금 정보
              start: startObj, // 착수금 정보
              middle: middleObj, // 중도금 정보
              remain: remainObj, // 잔금 정보
            }
          };
    
        } else if (mode === "inspection") {
    
          /**
           * @description 결제 내역을 바탕으로 각 결제 항목의 비율과 금액을 계산한 후 요약 정보를 생성하는 로직입니다.
           * 결제 내역이 모두 존재하지 않는 경우 실패 결과를 반환하며, 모든 항목이 있을 경우 계산하여 요약(summary)을 반환합니다.
           */

          // 클라이언트의 요청 본문에서 name, address, start, end 데이터를 equalJson으로 파싱하여 추출합니다.
          const { name, address, start, end } = equalJson(req.body);

          // 각 결제 항목의 금액과 비율을 저장할 변수를 선언합니다.
          let firstAmount, firstPercentage;
          let startAmount, startPercentage;
          let middleAmount, middlePercentage;
          let remainAmount, remainPercentage;
          let totalAmount; // 전체 금액을 저장할 변수

          // 만약 첫 번째 결제, 착수금, 중도금, 잔금 중 하나라도 null이면 요약 결과를 생성할 수 없으므로 실패를 반환합니다.
          if (construct.contract.payments.first === null || construct.contract.payments.start === null || construct.contract.payments.middle === null || construct.contract.payments.remain === null) {
            result = { result: false, summary: null }; // 결제 정보가 부족하면 요약 결과를 생성할 수 없음을 반환합니다.
          } else {

            // 각 결제 항목의 소비자 금액을 계산합니다.
            // Math.floor()를 사용하여 소수점을 내림 처리합니다.
            firstAmount = Math.floor(construct.contract.payments.first.calculation.amount.consumer);
            startAmount = Math.floor(construct.contract.payments.start.calculation.amount.consumer);
            middleAmount = Math.floor(construct.contract.payments.middle.calculation.amount.consumer);
            remainAmount = Math.floor(construct.contract.payments.remain.calculation.amount.consumer);

            // 전체 결제 금액을 계산합니다. 모든 결제 항목의 금액을 더하여 totalAmount에 저장합니다.
            totalAmount = (firstAmount + startAmount + middleAmount + remainAmount);

            // 각 항목의 비율(%)을 계산합니다. 전체 금액 대비 항목별 금액의 비율을 구하고, 반올림하여 백분율로 변환합니다.
            firstPercentage = Math.round((firstAmount / totalAmount) * 100);
            startPercentage = Math.round((startAmount / totalAmount) * 100);
            middlePercentage = Math.round((middleAmount / totalAmount) * 100);

            // 잔금 비율은 전체 100%에서 나머지 금액을 계산합니다.
            remainPercentage = 100 - (firstPercentage + startPercentage + middlePercentage);

            // 각 항목의 비율이 음수가 나오는 경우 오류로 간주하고, 실패 결과를 반환합니다.
            if (firstPercentage < 0 || startPercentage < 0 || middlePercentage < 0 || remainPercentage < 0) {
              result = { result: false, summary: null }; // 비율 계산 중 오류가 발생하면 실패 결과를 반환합니다.
            } else {

              // 각 결제 항목과 관련된 요약 정보를 생성합니다.
              summary = {
                total: Math.floor(totalAmount), // 전체 금액을 소수점 이하 버림 처리
                hangul: numberToHangul(Math.floor(totalAmount)) + '원', // 총 금액을 한글로 변환하여 표시
                name, // 클라이언트 이름
                address, // 클라이언트 주소
                date: { start, end }, // 시공 시작일과 종료일
                first: {
                  percentage: Math.floor(firstPercentage), // 첫 번째 결제 비율
                  amount: Math.floor(firstAmount), // 첫 번째 결제 금액
                  date: dateToString(projectHistory.construct.payments.first.date), // 첫 번째 결제일을 문자열로 변환
                  etc: projectHistory.construct.payments.first.etc // 기타 정보
                },
                start: {
                  percentage: Math.floor(startPercentage), // 착수금 비율
                  amount: Math.floor(startAmount), // 착수금 금액
                  date: dateToString(projectHistory.construct.payments.start.date), // 착수일을 문자열로 변환
                  etc: projectHistory.construct.payments.start.etc // 기타 정보
                },
                middle: {
                  percentage: Math.floor(middlePercentage), // 중도금 비율
                  amount: Math.floor(middleAmount), // 중도금 금액
                  date: dateToString(projectHistory.construct.payments.middle.date), // 중도금 날짜를 문자열로 변환
                  etc: projectHistory.construct.payments.middle.etc // 기타 정보
                },
                remain: {
                  percentage: Math.floor(remainPercentage), // 잔금 비율
                  amount: Math.floor(remainAmount), // 잔금 금액
                  date: dateToString(projectHistory.construct.payments.remain.date), // 잔금 날짜를 문자열로 변환
                  etc: projectHistory.construct.payments.remain.etc // 기타 정보
                },
              };

              // 요약 정보가 성공적으로 생성되면 결과와 요약 정보를 반환합니다.
              result = { result: true, summary };
            }
          }
    
        } else if (mode === "sendContract") {
    
          /**
           * @description 클라이언트 요청에서 전달된 요약 정보(summary)를 기반으로 계약서를 생성하고 프로젝트 데이터를 업데이트하는 로직입니다.
           */

          // 클라이언트 요청(req.body)에서 summary 데이터를 추출합니다. 
          // equalJson은 데이터를 딥 카피하면서 Date 객체를 포함한 JSON을 적절하게 처리합니다.
          const { summary } = equalJson(req.body);

          // MongoDB에서 프로젝트 데이터를 업데이트하기 위한 쿼리 객체를 선언합니다.
          let whereQuery, updateQuery;

          // whereQuery: 프로젝트 ID(proid)를 기반으로 업데이트할 대상을 지정합니다.
          whereQuery = { proid };

          // updateQuery: 업데이트할 항목을 정의합니다.
          // "process.design.construct.contract.form.guide" 필드에 현재 날짜를 삽입합니다.
          updateQuery = {};
          updateQuery["process.design.construct.contract.form.guide"] = new Date();

          // back.updateProject 메서드를 사용하여 MongoDB에서 프로젝트 데이터를 업데이트합니다.
          // selfMongo는 MongoDB 인스턴스를 나타냅니다.
          await back.updateProject([ whereQuery, updateQuery ], { selfMongo: instance.mongo });

          /**
           * @description requestSystem을 사용하여 외부 시스템에 HTTP POST 요청을 보냅니다. 
           * 계약서 생성을 요청하는 API로, 요청 본문에 proid와 summary를 포함하여 전송합니다.
           * @param {string} url - 계약서 생성 API의 URL
           * @param {Object} data - 전송할 데이터 객체 (proid와 summary를 포함)
           * @param {Object} options - 요청 헤더 옵션 (Content-type을 JSON으로 설정)
           */
          requestSystem("https://" + instance.address.officeinfo.host + ":3002/createConstructContract", 
            { proid, summary }, // 요청에 포함할 데이터: 프로젝트 ID(proid)와 요약 정보(summary)
            { headers: { "Content-type": "application/json" } } // 요청 헤더 설정: JSON 형식
          ).catch((err) => {
            // 만약 요청 중 오류가 발생하면 오류 메시지를 출력하고 새로운 오류를 발생시킵니다.
            throw new Error(err);
          });

          // 모든 작업이 성공적으로 완료되었을 경우 성공 메시지를 반환합니다.
          result = { message: "success" };
    
        } else if (mode === "constructOnoff") {

          /**
           * @description 클라이언트 요청에서 받은 액션(action)에 따라 프로젝트의 시공 상태를 업데이트하는 로직입니다.
           * 액션이 "on"이면 시공 정보를 초기화하고, "off"이면 시공 정보를 제거합니다.
           */

          // 클라이언트 요청(req.body)에서 action 값을 추출합니다. action은 시공 작업을 켜거나 끄는 역할을 합니다.
          const { action } = req.body;

          // MongoDB에서 프로젝트 데이터를 업데이트하기 위한 쿼리 객체를 선언합니다.
          let whereQuery, updateQuery;

          // whereQuery: 프로젝트 ID(proid)를 기준으로 업데이트할 대상을 지정합니다.
          whereQuery = { proid };

          // updateQuery: 프로젝트의 시공 정보를 업데이트할 객체를 선언합니다.
          updateQuery = {};

          // action 값이 "on"이면 시공 정보를 초기화합니다.
          // back.returnProjectDummies는 초기화된 시공 정보를 반환하는 메서드입니다.
          if (action === "on") {
            updateQuery["process.design.construct"] = back.returnProjectDummies("process.design.construct");
          } else {
            // action 값이 "on"이 아니면 시공 정보를 null로 설정하여 제거합니다.
            updateQuery["process.design.construct"] = null;
          }

          // back.updateProject 메서드를 사용하여 MongoDB에서 프로젝트 데이터를 업데이트합니다.
          // whereQuery는 업데이트할 프로젝트를 지정하며, updateQuery는 업데이트할 필드를 포함합니다.
          await back.updateProject([ whereQuery, updateQuery ], { selfMongo: instance.mongo });

          // 작업이 성공적으로 완료되었을 경우 성공 메시지를 반환합니다.
          result = { message: "success" };
    
        } else if (mode === "amountSync") {

          /**
           * @description 요청 본문에서 잔금(amount)을 받아서 공급가액(supply), 부가세(vat), 소비자 금액(consumer)을 계산하고, 이를 프로젝트에 업데이트하는 로직입니다.
           * 만약 잔금 정보가 존재할 경우, MongoDB에 업데이트하고 외부 시스템과 금액을 동기화합니다.
           */

          // 클라이언트 요청(req.body)에서 amount 값을 추출합니다. 
          // amountRaw는 문자열로 들어오므로 이를 숫자(Number)로 변환하여 amount에 저장합니다.
          const { amount: amountRaw } = req.body;
          const amount = Number(amountRaw); // 문자열을 숫자로 변환

          // MongoDB에서 업데이트할 쿼리 객체와 업데이트할 필드를 선언합니다.
          let whereQuery, updateQuery;

          // 공급가액(supply), 부가세(vat), 소비자 금액(consumer)을 저장할 변수를 선언합니다.
          let supply, vat, consumer;

          // construct.contract.payments.remain이 null이 아닐 경우, 잔금 정보가 존재한다고 판단하여 처리합니다.
          if (construct.contract.payments.remain !== null) {

            // consumer: 잔금의 소비자 금액을 Math.floor로 소수점을 버림 처리하여 저장합니다.
            consumer = Math.floor(amount);

            // 부가세(vat)를 계산합니다. 소비자 금액(consumer)의 1/11로 계산됩니다.
            vat = Math.floor(consumer / 11);

            // 공급가액(supply)는 소비자 금액에서 부가세를 뺀 금액입니다.
            supply = Math.floor(consumer - vat);

            // MongoDB에서 업데이트할 프로젝트 ID를 기준으로 whereQuery를 설정합니다.
            whereQuery = { proid };

            // updateQuery: 프로젝트의 잔금 정보를 업데이트하기 위한 필드들을 설정합니다.
            updateQuery = {};
            updateQuery["process.design.construct.contract.payments.remain.calculation.amount.supply"] = supply; // 공급가액
            updateQuery["process.design.construct.contract.payments.remain.calculation.amount.vat"] = vat; // 부가세
            updateQuery["process.design.construct.contract.payments.remain.calculation.amount.consumer"] = consumer; // 소비자 금액

            // back.updateProject 메서드를 사용하여 MongoDB에서 잔금 정보를 업데이트합니다.
            await back.updateProject([ whereQuery, updateQuery ], { selfMongo: instance.mongo });

            /**
             * @description requestSystem을 사용하여 외부 시스템과 잔금 정보를 동기화합니다.
             * @param {string} url - 잔금 동기화를 위한 API의 URL
             * @param {Object} data - 전송할 데이터 객체 (proid, cliid, desid, method, amount를 포함)
             * @param {Object} options - 요청 헤더 옵션 (Content-type을 JSON으로 설정)
             */
            requestSystem("https://" + instance.address.officeinfo.host + ":3002/constructAmountSync", 
              {
                proid, // 프로젝트 ID
                cliid: project.cliid, // 클라이언트 ID
                desid: project.desid, // 디자이너 ID
                method: (project.service.online ? "online" : "offline"), // 프로젝트 서비스가 온라인/오프라인인지 여부
                amount: { supply, vat, consumer } // 공급가액, 부가세, 소비자 금액 정보
              }, 
              { headers: { "Content-type": "application/json" } } // 요청 헤더: JSON 형식
            ).catch((err) => {
              // 외부 시스템과의 요청 중 오류가 발생하면 오류 메시지를 출력하고 새로운 오류를 발생시킵니다.
              throw new Error(err);
            });

          }

          // 작업 완료 후 빈 객체를 결과로 반환합니다.
          result = {};
    
        } else if (mode === "chargeGuide") {

          /**
           * @description 결제 안내 알림톡을 고객에게 전송하고, MongoDB에 결제 안내 시간을 업데이트하는 로직입니다.
           * 결제 항목(계약금, 착수금, 중도금, 잔금)에 따라 적절한 알림톡을 전송합니다.
           */

          // 요청 본문(req.body)에서 method 값을 추출합니다.
          // equalJson 메서드를 사용하여 딥 카피와 Date 객체를 포함한 JSON 데이터를 처리합니다.
          const { method } = equalJson(req.body);

          // 현재 시간을 now 변수에 저장합니다.
          const now = new Date(); 

          // MongoDB에서 고객 정보를 가져옵니다.
          // 프로젝트의 고객 ID(cliid)를 사용하여 고객 데이터를 조회합니다.
          const client = await back.getClientById(project.cliid, { selfMongo: instance.mongo });

          // 고객 ID와 관련된 데이터를 저장합니다.
          const cliid = client.cliid; // 클라이언트 ID
          const host = instance.address.frontinfo.host; // 서버의 호스트 주소
          const path = "estimation"; // 경로는 "estimation"으로 설정
          // 필요 항목(needs)은 스타일, 디자이너 ID, 프로젝트 ID, 온라인/오프라인 여부로 구성됩니다.
          const needs = "style," + project.desid + "," + project.proid + "," + (project.service.online ? "online" : "offline");

          // 고객 이름과 전화번호를 저장합니다.
          const name = client.name; // 고객 이름
          const phone = client.phone; // 고객 전화번호

          // MongoDB에서 업데이트할 쿼리 객체를 선언합니다.
          let whereQuery, updateQuery;
          let target; // 알림톡의 대상(계약금, 착수금 등)을 저장할 변수

          // whereQuery: 프로젝트 ID(proid)를 기준으로 업데이트할 대상을 설정합니다.
          whereQuery = { proid };

          // updateQuery: MongoDB에 업데이트할 필드를 선언합니다.
          updateQuery = {};

          // target: 결제 안내 알림톡의 대상 항목을 초기화합니다.
          target = "";

          // 결제 항목에 따라 알림톡을 전송합니다.
          if (method === "first") {
            // 계약금에 대한 안내 알림톡을 전송합니다.
            await kakao.sendTalk("constructFirst", name, phone, {
              client: name,
              amount: autoComma(project.process.design.construct.contract.payments.first.calculation.amount.consumer), // 계약금 금액을 콤마 형식으로 전송
              host, 
              path, 
              cliid, 
              needs // 필요한 항목 정보
            });
            // 계약금 안내 시간이 현재 시간으로 설정됩니다.
            updateQuery["process.design.construct.contract.payments.first.guide"] = now;
            target = "계약금"; // 안내 대상은 "계약금"
          } else if (method === "start") {
            // 착수금에 대한 안내 알림톡을 전송합니다.
            await kakao.sendTalk("constructStart", name, phone, {
              client: name,
              amount: autoComma(project.process.design.construct.contract.payments.start.calculation.amount.consumer), // 착수금 금액을 콤마 형식으로 전송
              host, 
              path, 
              cliid, 
              needs
            });
            // 착수금 안내 시간이 현재 시간으로 설정됩니다.
            updateQuery["process.design.construct.contract.payments.start.guide"] = now;
            target = "착수금"; // 안내 대상은 "착수금"
          } else if (method === "middle") {
            // 중도금에 대한 안내 알림톡을 전송합니다.
            await kakao.sendTalk("constructMiddle", name, phone, {
              client: name,
              amount: autoComma(project.process.design.construct.contract.payments.middle.calculation.amount.consumer), // 중도금 금액을 콤마 형식으로 전송
              host, 
              path, 
              cliid, 
              needs
            });
            // 중도금 안내 시간이 현재 시간으로 설정됩니다.
            updateQuery["process.design.construct.contract.payments.middle.guide"] = now;
            target = "중도금"; // 안내 대상은 "중도금"
          } else if (method === "remain") {
            // 잔금에 대한 안내 알림톡을 전송합니다.
            await kakao.sendTalk("constructRemain", name, phone, {
              client: name,
              amount: autoComma(project.process.design.construct.contract.payments.remain.calculation.amount.consumer), // 잔금 금액을 콤마 형식으로 전송
              host, 
              path, 
              cliid, 
              needs
            });
            // 잔금 안내 시간이 현재 시간으로 설정됩니다.
            updateQuery["process.design.construct.contract.payments.remain.guide"] = now;
            target = "잔금"; // 안내 대상은 "잔금"
          }

          // MongoDB에 결제 안내 시간을 업데이트합니다.
          await back.updateProject([ whereQuery, updateQuery ], { selfMongo: instance.mongo });

          // 고객에게 알림톡이 전송되었음을 시스템 메시지로 알립니다.
          // 메시지 채널은 "#400_customer"이며, 음성으로도 전달됩니다.
          messageSend({ 
            text: name + " 고객님께 시공 " + target + " 안내 알림톡을 전송했어요.", 
            channel: "#400_customer", 
            voice: true // 음성 알림 옵션 활성화
          }).catch((err) => {
            // 메시지 전송 중 오류가 발생하면 로그에 오류를 출력합니다.
            console.log(err);
          });

          // 작업 완료 후 결과로 현재 날짜(now)를 포함한 객체를 반환합니다.
          result = { date: dateToString(now), now };
    
        } else if (mode === "changeAmount") {
    
          /**
           * @description 클라이언트로부터 받은 결제 금액 정보를 기반으로 각 결제 항목(계약금, 착수금, 중도금, 잔금)을 업데이트하는 로직입니다.
           * MongoDB에 업데이트한 후, 외부 시스템과 금액을 동기화합니다.
           */

          // 요청 본문에서 map 값이 없으면 에러를 발생시킵니다.
          if (req.body.map === undefined) {
            throw new Error("invalid post"); // 요청 데이터가 없으면 에러 처리
          }

          // 요청에서 받은 데이터를 equalJson을 통해 처리하여 각 결제 항목을 추출합니다.
          // equalJson은 딥 카피와 Date 객체를 포함한 JSON 데이터를 적절하게 처리합니다.
          const { map: { first, start, middle, remain } } = equalJson(req.body);

          // 각 결제 항목을 저장할 객체를 선언합니다.
          let firstObj, startObj, middleObj, remainObj;

          // MongoDB에서 업데이트할 쿼리 객체와 필드를 선언합니다.
          let whereQuery, updateQuery;

          // 외부 시스템과 금액 정보를 동기화하기 위한 toPython 객체를 선언합니다.
          let toPython;

          // 첫 번째 결제 항목(first)이 존재하지 않을 경우 기본 값을 반환하는 메서드로 초기화합니다.
          if (construct.contract.payments.first === null) {
            firstObj = back.returnProjectDummies("process.design.construct.contract.payments");
          } else {
            firstObj = construct.contract.payments.first; // 존재하는 데이터가 있으면 해당 데이터를 사용
          }

          // 첫 번째 결제 금액의 소비자 금액(consumer), 부가세(vat), 공급가액(supply)을 계산합니다.
          firstObj.calculation.amount.consumer = first;
          firstObj.calculation.amount.vat = Math.floor(firstObj.calculation.amount.consumer / 11);
          firstObj.calculation.amount.supply = firstObj.calculation.amount.consumer - firstObj.calculation.amount.vat;

          // 착수금(start)도 위와 같은 방식으로 처리합니다.
          if (construct.contract.payments.start === null) {
            startObj = back.returnProjectDummies("process.design.construct.contract.payments");
          } else {
            startObj = construct.contract.payments.start;
          }
          startObj.calculation.amount.consumer = start;
          startObj.calculation.amount.vat = Math.floor(startObj.calculation.amount.consumer / 11);
          startObj.calculation.amount.supply = startObj.calculation.amount.consumer - startObj.calculation.amount.vat;

          // 중도금(middle)의 금액도 동일한 방식으로 처리됩니다.
          if (construct.contract.payments.middle === null) {
            middleObj = back.returnProjectDummies("process.design.construct.contract.payments");
          } else {
            middleObj = construct.contract.payments.middle;
          }
          middleObj.calculation.amount.consumer = middle;
          middleObj.calculation.amount.vat = Math.floor(middleObj.calculation.amount.consumer / 11);
          middleObj.calculation.amount.supply = middleObj.calculation.amount.consumer - middleObj.calculation.amount.vat;

          // 잔금(remain) 항목 역시 같은 방식으로 처리됩니다.
          if (construct.contract.payments.remain === null) {
            remainObj = back.returnProjectDummies("process.design.construct.contract.payments");
          } else {
            remainObj = construct.contract.payments.remain;
          }
          remainObj.calculation.amount.consumer = remain;
          remainObj.calculation.amount.vat = Math.floor(remainObj.calculation.amount.consumer / 11);
          remainObj.calculation.amount.supply = remainObj.calculation.amount.consumer - remainObj.calculation.amount.vat;

          // 외부 시스템과 금액 정보를 동기화하기 위해 toPython 객체에 결제 정보를 담습니다.
          toPython = {
            proid, // 프로젝트 ID
            cliid: project.cliid, // 클라이언트 ID
            desid: project.desid, // 디자이너 ID
            method: project.service.online ? "online" : "offline", // 온라인/오프라인 여부
            first: {
              consumer: firstObj.calculation.amount.consumer,
              vat: firstObj.calculation.amount.vat,
              supply: firstObj.calculation.amount.supply,
            },
            start: {
              consumer: startObj.calculation.amount.consumer,
              vat: startObj.calculation.amount.vat,
              supply: startObj.calculation.amount.supply,
            },
            middle: {
              consumer: middleObj.calculation.amount.consumer,
              vat: middleObj.calculation.amount.vat,
              supply: middleObj.calculation.amount.supply,
            },
            remain: {
              consumer: remainObj.calculation.amount.consumer,
              vat: remainObj.calculation.amount.vat,
              supply: remainObj.calculation.amount.supply,
            },
          };

          // requestSystem을 사용하여 외부 시스템에 금액 정보를 동기화합니다.
          requestSystem("https://" + instance.address.officeinfo.host + ":3002/constructAmountSync", toPython, { headers: { "Content-type": "application/json" } }).catch((err) => {
            // 요청 중 오류가 발생하면 에러를 발생시킵니다.
            throw new Error(err);
          });

          // MongoDB에서 프로젝트의 결제 정보를 업데이트하기 위한 whereQuery와 updateQuery를 선언합니다.
          whereQuery = { proid }; // 프로젝트 ID를 기준으로 업데이트 대상을 지정
          updateQuery = {}; // 업데이트할 항목들을 담을 객체
          updateQuery["process.design.construct.contract.payments.first"] = firstObj;
          updateQuery["process.design.construct.contract.payments.start"] = startObj;
          updateQuery["process.design.construct.contract.payments.middle"] = middleObj;
          updateQuery["process.design.construct.contract.payments.remain"] = remainObj;

          // back.updateProject 메서드를 사용하여 MongoDB에 결제 정보를 업데이트합니다.
          await back.updateProject([ whereQuery, updateQuery ], { selfMongo: instance.mongo });

          // 최종적으로 업데이트된 결제 정보를 결과로 반환합니다.
          result = {
            message: "success", // 성공 메시지
            core: {
              first: firstObj, // 업데이트된 계약금 정보
              start: startObj, // 업데이트된 착수금 정보
              middle: middleObj, // 업데이트된 중도금 정보
              remain: remainObj, // 업데이트된 잔금 정보
            }
          };
    
        } else if (mode === "historyUpdate") {

          /**
           * @description 클라이언트로부터 받은 결제 관련 데이터를 기반으로 프로젝트 히스토리 정보를 업데이트하는 로직입니다.
           * 결제 항목의 종류(kind), 값(value), 열(column)을 기준으로 MongoDB에서 프로젝트 히스토리를 수정합니다.
           */

          // 클라이언트 요청(req.body)에서 결제 항목의 종류(kind), 값(value), 열(column)을 추출합니다.
          // equalJson은 딥 카피와 Date 객체를 포함한 JSON 데이터를 처리하는 업그레이드된 메서드입니다.
          const { kind, value, column } = equalJson(req.body);

          // MongoDB에서 업데이트할 쿼리와 필드를 선언합니다.
          let whereQuery, updateQuery;

          // whereQuery: 프로젝트 ID(proid)를 기준으로 업데이트할 대상을 지정합니다.
          whereQuery = { proid };

          // updateQuery: 결제 항목의 종류(kind)와 열(column)에 따라 값을 설정합니다.
          // 만약 column이 "date"이면, stringToDate 메서드를 사용하여 문자열을 Date 객체로 변환합니다.
          // 그렇지 않으면 value 값을 그대로 사용합니다.
          updateQuery = {};
          updateQuery["construct.payments." + kind + "." + column] = (column === "date" ? stringToDate(value) : value);

          // back.updateHistory 메서드를 사용하여 MongoDB에서 프로젝트의 결제 히스토리를 업데이트합니다.
          // selfMongo는 MongoDB의 인스턴스를 나타냅니다.
          await back.updateHistory("project", [ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });

          // 작업 완료 후 결과로 빈 객체를 반환합니다.
          result = {};

        } else {
          result = {};
        }
    
        res.send(JSON.stringify(result));
      } catch (e) {
        // 예외가 발생하면 로깅하고 오류 메시지를 클라이언트에 응답
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json"); // 응답의 Content-Type을 JSON으로 설정
        res.send(JSON.stringify({ error: e.message })); // 에러 메시지를 JSON 형식으로 반환
      }
    });
    
    /**
     * @route POST /getOpenGraph
     * @description 주어진 URL에서 Open Graph 메타 데이터를 가져와 이미지를 반환하는 라우터입니다. URL이 유효하지 않으면 기본 이미지를 추출합니다.
     * @param {Object} req - 클라이언트 요청 객체로, URL과 mode, target 값을 포함합니다.
     * @param {Object} res - 서버 응답 객체로, JSON 형식의 결과를 반환합니다.
     */
    router.post([ "/getOpenGraph" ], async function (req, res) {
      // 응답 헤더 설정: 응답을 plain text로 반환하고, CORS를 허용합니다.
      res.set({
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });

      try {
        // 요청된 URL이 문자열이 아닌 경우 오류를 발생시킵니다.
        if (typeof req.body.url !== "string") {
          throw new Error("invalid post");
        }

        // 요청 본문에서 mode 값을 추출하고 URL을 디코딩합니다.
        const mode = req.body.mode;
        let url;
        let result;
        let urlArr;
        let resOpen, targets;
        let middleTarget, target;
        let imgTargets, imgTarget;
        let imgMiddleTarget;
        let protocol, host;
        let imgMiddleTargets;
        let requestHeaders;

        // 사용자 에이전트를 설정하여 HTTP 요청에 사용할 헤더를 정의합니다.
        requestHeaders = {
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
        };

        try {
          // URL 디코딩: 한글이나 공백이 포함된 URL을 처리합니다.
          url = global.decodeURI(req.body.url);
        } catch (e) {
          // URL 디코딩 중 오류가 발생하면 기본 빈 문자열로 설정합니다.
          logger.error(e, req).catch((e) => { console.log(e); });
          url = "";
        }

        // URL을 문자 단위로 배열로 변환하여 한글이나 공백을 인코딩합니다.
        urlArr = url.split("");
        urlArr = urlArr.map((char) => {
          if (/[가-힣]/i.test(char)) {
            return global.encodeURI(char);
          } else if (char.trim() === '') {
            return global.encodeURI(char);
          } else {
            return char;
          }
        });

        // 인코딩된 URL을 다시 문자열로 합칩니다.
        url = urlArr.join("");

        try {
          // requestSystem을 통해 URL에서 데이터를 GET 요청으로 가져옵니다.
          resOpen = await requestSystem(url, {}, { method: "get", headers: requestHeaders });

          // Open Graph 메타 태그에서 이미지 정보를 추출합니다.
          targets = [ ...resOpen.data.matchAll(/\<meta[^\>]+property=\"og\:image\"[^\>]+\>/gi) ].map((arr) => { return arr[0] });
        } catch (e) {
          // 요청 실패 시 이미지 정보는 빈 배열로 설정됩니다.
          targets = [];
        }

        // 이미지 대상(imgTarget)을 초기화합니다.
        imgTarget = null;

        // Open Graph 태그가 없을 경우 HTML 내의 img 태그를 찾아 대체 이미지를 가져옵니다.
        if (targets.length === 0) {
          try {
            resOpen = await requestSystem(url);
            imgMiddleTargets = [ ...resOpen.data.matchAll(/\<img[^\>]+src="[^\>]+\>/gi) ].map((arr) => { return arr[0] });
          } catch (e) {
            imgMiddleTargets = [];
          }

          // .svg 파일을 제외한 이미지 태그를 필터링합니다.
          imgTargets = imgMiddleTargets.filter((str) => { return !/\.svg/gi.test(str) });

          if (imgTargets.length > 0) {
            // src 속성에서 이미지 URL을 추출합니다.
            imgMiddleTarget = [ ...imgTargets[0].matchAll(/src\=\"[^\"]+\"/gi) ];
            if (imgMiddleTarget.length > 0) {
              imgTarget = imgMiddleTarget[0][0].trim().replace(/^src\=\"/gi, '').slice(0, -1);
              
              // URL이 상대 경로일 경우, 프로토콜과 호스트를 사용해 절대 경로로 변환합니다.
              if (/^\//.test(imgTarget)) {
                [ protocol, host ] = url.split('/').filter((str) => { return str.trim() !== '' })
                if (/^\/\//.test(imgTarget)) {
                  imgTarget = protocol + imgTarget;
                } else {
                  imgTarget = protocol + "//" + host + imgTarget;
                }
              }
            }
          }
        }

        // Open Graph 태그에서 추출된 이미지가 있을 경우 해당 이미지 URL을 처리합니다.
        middleTarget = [];
        target = null;
        if (targets.length > 0) {
          middleTarget = [ ...targets[targets.length - 1].matchAll(/content\=\"[^\"]+\"/gi) ];
          if (middleTarget.length > 0) {
            target = middleTarget[0][0].trim().replace(/^content\=\"/gi, '').slice(0, -1);

            // URL이 상대 경로일 경우 절대 경로로 변환합니다.
            if (/^\//.test(target)) {
              [ protocol, host ] = url.split('/').filter((str) => { return str.trim() !== '' });
              if (/^\/\//.test(target)) {
                target = protocol + target;
              } else {
                target = protocol + "//" + host + target;
              }
            }
          }
        }

        // 최종적으로 이미지 URL을 선택하여 결과로 반환합니다.
        if (target === null) {
          if (imgTarget === null) {
            result = { image: null };
          } else {
            result = { image: imgTarget };
          }
        } else {
          result = { image: target };
        }

        // 추가적으로 target 값이 요청에 포함된 경우 결과에 추가합니다.
        if (typeof req.body.target === "string") {
          result.target = req.body.target;
        }

        // JSON 형식으로 결과를 클라이언트에 응답합니다.
        res.send(JSON.stringify(result));
      } catch (e) {
        // 오류가 발생하면 에러 메시지를 JSON 형식으로 응답합니다.
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /generalImpPayment
     * @description 일반 결제 처리를 위한 라우터입니다. 결제 스크립트 생성, 결제 데이터 저장, 결제 정보 조회 등을 처리합니다.
     * @param {Object} req - 클라이언트 요청 객체로, mode, oid, oidKey, key 등의 정보를 포함합니다.
     * @param {Object} res - 서버 응답 객체로, JSON 형식으로 결과를 반환합니다.
     */
    router.post([ "/generalImpPayment" ], async function (req, res) {
      // 응답 헤더 설정: 응답을 JSON 형식으로 반환하고, CORS를 허용합니다.
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });

      try {
        // 요청의 mode가 문자열이 아닌 경우 오류를 발생시킵니다.
        if (typeof req.body.mode !== "string") {
          throw new Error("invalid post");
        }

        // mode 값을 추출합니다. 결제 처리 단계에 따라 mode가 달라집니다.
        const { mode } = req.body;

        // 결제 데이터가 임시로 저장되는 컬렉션 이름을 정의합니다.
        const storeCollection = "impPaymentTempStore";

        // 로컬 MongoDB 인스턴스를 정의합니다.
        const selfMongo = instance.mongolocal;

        // 결제 항목에 따라 OID의 접두어를 정의한 객체입니다.
        const oidConstDictionary = {
          mini: "mini_",
          designerPhoto: "dpho_",
          designerRegistration: "dreg_",
        };

        // 결제 플러그인 스크립트를 저장할 변수를 선언합니다.
        let pluginScript;

        // mode가 "script"일 경우, 결제 스크립트를 가져옵니다.
        if (mode === "script") {
          pluginScript = '';
          // Iamport 스크립트를 가져와 pluginScript에 추가합니다.
          pluginScript += (await requestSystem("https://cdn.iamport.kr/v1/iamport.js")).data;

          // 플러그인 스크립트와 oidConst 값을 JSON 형식으로 응답합니다.
          res.send(JSON.stringify({ pluginScript, oidConst: oidConstDictionary[req.body.oidKey] }));

        } else if (mode === "store") {
          // mode가 "store"일 경우, 결제 데이터를 저장합니다.

          // equalJson을 사용해 요청 데이터를 파싱하여 data 객체에 저장합니다.
          const data = equalJson(req.body.data);

          // 고유한 키를 생성하여 결제 데이터를 식별합니다.
          const key = "impKey_" + uniqueValue("hex");

          // MongoDB에 결제 데이터를 저장합니다.
          await back.mongoCreate(storeCollection, { key, data: JSON.stringify(data), oid: req.body.oid }, { selfMongo });

          // 생성된 키를 클라이언트에 응답합니다.
          res.send(JSON.stringify({ key }));

        } else if (mode === "open") {
          // mode가 "open"일 경우, 저장된 결제 데이터를 조회합니다.

          // 요청으로부터 키를 추출합니다.
          const key = req.body.key;

          // MongoDB에서 키를 기반으로 저장된 결제 데이터를 조회합니다.
          const rows = await back.mongoRead(storeCollection, { key }, { selfMongo });

          // 조회된 데이터가 없으면 빈 객체를 응답합니다.
          if (rows.length === 0) {
            res.send(JSON.stringify({}));
          } else {
            // 조회된 데이터를 기반으로 Iamport API에서 결제 정보를 조회합니다.
            const [ { key, data, oid } ] = rows;

            // Iamport API에서 액세스 토큰을 가져옵니다.
            const { response: { access_token } } = (await requestSystem("https://api.iamport.kr/users/getToken", {
              imp_key: address.officeinfo.import.key,
              imp_secret: address.officeinfo.import.secret,
            }, { headers: { "Content-Type": "application/json" } })).data;

            // 결제 ID(oid)를 사용해 결제 정보를 조회합니다.
            const { data: { response: rsp } } = await requestSystem("https://api.iamport.kr/payments/find/" + oid, {}, { method: "get", headers: { "Authorization": access_token } });

            // 조회된 결제 정보를 JSON 형식으로 클라이언트에 응답합니다.
            res.send(JSON.stringify({ data: equalJson(data), oid, rsp }));
          }

        } else if (mode === "oid") {
          // mode가 "oid"일 경우, oid를 기반으로 결제 정보를 조회합니다.

          // Iamport API에서 액세스 토큰을 가져옵니다.
          const { response: { access_token } } = (await requestSystem("https://api.iamport.kr/users/getToken", {
            imp_key: address.officeinfo.import.key,
            imp_secret: address.officeinfo.import.secret,
          }, { headers: { "Content-Type": "application/json" } })).data;

          // 요청에서 oid 값을 파싱합니다.
          const { oid } = equalJson(req.body);

          // oid를 사용해 Iamport API에서 결제 정보를 조회합니다.
          const { data: { response: rsp } } = await requestSystem("https://api.iamport.kr/payments/find/" + oid, {}, { method: "get", headers: { "Authorization": access_token } });

          // 조회된 결제 정보를 JSON 형식으로 응답합니다.
          res.send(JSON.stringify({ data: { oid }, oid, rsp }));

        } else {
          // mode가 유효하지 않은 경우 오류를 발생시킵니다.
          throw new Error("invalid mode");
        }

      } catch (e) {
        // 오류가 발생하면 에러 로그를 기록하고 JSON 형식으로 응답합니다.
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /designerFeeTable
     * @description 디자이너의 수수료 테이블 데이터를 가져오는 라우터입니다. 디자이너 ID를 기반으로 MongoDB에서 데이터를 조회하여 반환합니다.
     * @param {Object} req - 클라이언트 요청 객체로, 요청 본문에 desid(디자이너 ID)가 포함됩니다.
     * @param {Object} res - 서버 응답 객체로, JSON 형식으로 디자이너 수수료 데이터를 반환합니다.
     */
    router.post([ "/designerFeeTable" ], async function (req, res) {
      // 응답 헤더 설정: 응답을 JSON 형식으로 반환하고, CORS를 허용합니다.
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 요청을 허용
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 헤더를 설정
      });

      try {
        let json; // 디자이너 수수료 데이터를 저장할 변수

        // work.designerFeeTable 메서드를 호출하여 desid(디자이너 ID) 기반으로 수수료 데이터를 가져옵니다.
        // selfMongo 및 selfLocalMongo는 각각 MongoDB와 로컬 MongoDB를 나타냅니다.
        // jsonMode는 결과를 JSON 형식으로 반환하도록 지정합니다.
        json = await work.designerFeeTable(req.body.desid, { selfMongo: mongo, selfLocalMongo: mongolocal, jsonMode: true });

        // 수수료 데이터를 클라이언트에 JSON 형식으로 응답합니다.
        res.send(json);
      } catch (e) {
        // 오류가 발생하면 로그에 기록하고, 오류 메시지를 JSON 형식으로 응답합니다.
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /timeDeltaAlarm
     * @description 주기적으로 미팅 및 계약 시작 알람을 전송하는 라우터입니다. 첫 미팅과 계약 시작일에 대한 알람을 디자이너와 클라이언트에게 보냅니다.
     * @param {Object} req - 클라이언트 요청 객체
     * @param {Object} res - 서버 응답 객체로, JSON 형식으로 처리 결과를 반환합니다.
     */
    router.post([ "/timeDeltaAlarm" ], async function (req, res) {
      // 응답 헤더 설정: 응답을 JSON 형식으로 반환하고, CORS를 허용합니다.
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      /**
       * @function firstMeetingAlarmFunc
       * @description 첫 번째 미팅이 다가오면 클라이언트와 디자이너에게 알림을 전송하는 함수입니다. 미팅 1일 전과 7일 전에 알림을 보냅니다.
       * @param {Object} MONGOC - MongoDB 인스턴스를 나타내며, 데이터베이스에서 프로젝트와 클라이언트 정보를 가져오는 데 사용됩니다.
       * @param {Object} logger - 로그 기록을 위한 객체로, 작업 완료 시 로그를 기록합니다.
       */
      const firstMeetingAlarmFunc = async (MONGOC, logger) => {
        try {
          // MongoDB 인스턴스를 selfMongo로 정의
          const selfMongo = MONGOC;
          // 현재 날짜를 today로 설정하고 시간은 9시로 고정
          const today = new Date();
          // 요일을 나타내는 배열 정의 (일 ~ 토)
          const dayConst = [ '일', '월', '화', '수', '목', '금', '토' ];
          let projects; // 프로젝트 데이터를 저장할 변수
          let clients, client; // 클라이언트 데이터를 저장할 변수
          let clientIndex; // 클라이언트 배열에서 클라이언트의 인덱스를 저장할 변수
          let meetingDate; // 미팅 날짜를 저장할 변수
          let delta; // 미팅까지 남은 일수를 저장할 변수
          let todayValue; // 오늘 날짜의 타임스탬프 값을 저장
          let rawDelta; // 미팅 날짜와의 차이를 초 단위로 저장하는 변수
          let designer; // 디자이너 정보를 저장할 변수

          // 현재 날짜의 시간을 9시로 설정
          today.setHours(9);
          todayValue = today.valueOf(); // 오늘 날짜를 밀리초로 변환하여 저장

          // MongoDB에서 특정 조건을 만족하는 프로젝트들을 조회합니다.
          projects = await back.getProjectsByQuery({
            $and: [
              { "desid": { $regex: "^d" } }, // 디자이너 ID가 'd'로 시작하는 프로젝트
              { "process.status": { $regex: "^[대진]" } }, // 진행 상태가 '대진'으로 시작하는 프로젝트
              { "process.contract.meeting.date": { $gt: new Date() } }, // 미팅 날짜가 오늘 이후인 프로젝트
            ]
          }, { selfMongo });

          // 조회된 프로젝트가 있는 경우
          if (projects.length > 0) {
            // 해당 프로젝트에 포함된 클라이언트들을 조회
            clients = await back.getClientsByQuery({
              $or: [ ...new Set(projects.toNormal().map((pr) => { return pr.cliid; })) ].map((cliid) => { return { cliid } }),
            }, { selfMongo });

            // 각 프로젝트마다 클라이언트와 디자이너에게 미팅 알림을 전송
            for (let project of projects) {
              // 현재 프로젝트와 일치하는 클라이언트를 찾습니다.
              clientIndex = clients.toNormal().findIndex((obj) => { return obj.cliid === project.cliid });
              if (clientIndex !== -1) {
                meetingDate = project.process.contract.meeting.date; // 미팅 날짜를 설정
                client = clients.toNormal()[clientIndex]; // 해당 클라이언트 정보를 가져옴

                // 미팅 날짜와 오늘의 차이를 일(day) 단위로 계산
                rawDelta = (((Math.abs(meetingDate.valueOf() - todayValue) / 1000) / 60) / 60) / 24;
                delta = Math.floor(rawDelta); // 남은 일수를 정수로 변환

                // 미팅 1일 전 또는 7일 전일 때 알림 전송
                if (delta === 1 || delta === 7) {
                  // 디자이너 정보를 가져옴
                  designer = await back.getDesignerById(project.desid, { selfMongo });

                  // 클라이언트에게 미팅 알림톡 전송
                  await kakao.sendTalk("firstMeetingWeekAgo", client.name, client.phone, {
                    client: client.name,
                    date: String(meetingDate.getMonth() + 1) + "월 " + String(meetingDate.getDate()) + "일", // 미팅 날짜
                    day: dayConst[meetingDate.getDay()], // 미팅 요일
                    hour: String(meetingDate.getHours()), // 미팅 시간(시)
                    minute: String(meetingDate.getMinutes()), // 미팅 시간(분)
                    host: address.frontinfo.host, // 호스트 정보
                    path: "meeting", // 경로
                    proid: project.proid, // 프로젝트 ID
                  });

                  // 디자이너에게 미팅 알림톡 전송
                  await kakao.sendTalk("designerConsoleRequestFirstMeeting", designer.designer, designer.information.phone, {
                    designer: designer.designer,
                    client: client.name,
                    date: String(meetingDate.getMonth() + 1) + "월 " + String(meetingDate.getDate()) + "일", // 미팅 날짜
                    day: dayConst[meetingDate.getDay()], // 미팅 요일
                    hour: String(meetingDate.getHours()), // 미팅 시간(시)
                    minute: String(meetingDate.getMinutes()), // 미팅 시간(분)
                    host: address.frontinfo.host, // 호스트 정보
                    path: "process", // 경로
                    proid: project.proid, // 프로젝트 ID
                  });

                  // 슬랙에 메시지를 전송하여 미팅 알림 전송 완료를 알림
                  await messageSend(client.name + " 고객님과 " + designer.designer + " 실장님께 현장 미팅 알림을 전송하였어요.", "#400_customer", true);
                }
              }
            }
          }

          // 작업 완료 후 로그에 기록
          await logger.cron("first meeting alarm done");

        } catch (e) {
          // 오류 발생 시 콘솔에 로그 출력
          errorLogSync(e);
        }
      }
      /**
       * @function contractStartAlarmFunc
       * @description 계약 시작일이 도래한 프로젝트에 대해 클라이언트와 디자이너에게 알림을 전송하는 함수입니다. 2일 전부터 계약 시작일을 알립니다.
       * @param {Object} MONGOC - MongoDB 인스턴스를 나타내며, 데이터베이스에서 프로젝트와 클라이언트 정보를 가져오는 데 사용됩니다.
       * @param {Object} logger - 로그 기록을 위한 객체로, 작업 완료 시 로그를 기록합니다.
       */
      const contractStartAlarmFunc = async (MONGOC, logger) => {
        try {
          // MongoDB 인스턴스를 selfMongo로 정의
          const selfMongo = MONGOC;
          // 오늘 날짜를 today에 저장하고 시간을 9시로 설정
          const today = new Date();
          let projects; // 프로젝트 데이터를 저장할 변수
          let clients, client; // 클라이언트 데이터를 저장할 변수
          let clientIndex; // 클라이언트 배열에서 클라이언트의 인덱스를 저장할 변수
          let contractDate; // 계약 시작일을 저장할 변수
          let todayValue; // 오늘 날짜의 타임스탬프 값을 저장
          let designer; // 디자이너 정보를 저장할 변수
          let requestNumber; // 클라이언트 요청 중 타임라인에 맞는 요청의 인덱스를 저장할 변수
          let ago; // 2일 전을 나타내는 날짜를 저장할 변수

          // 오늘 날짜의 시간을 9시로 설정하고 밀리초로 변환해 저장
          today.setHours(9);
          todayValue = today.valueOf();

          // 2일 전 날짜를 설정하고 시간을 7시로 고정
          ago = new Date();
          ago.setHours(7);
          ago.setDate(ago.getDate() - 2);

          // MongoDB에서 특정 조건을 만족하는 프로젝트들을 조회
          projects = await back.getProjectsByQuery({
            $and: [
              { "desid": { $regex: "^d" } }, // 디자이너 ID가 'd'로 시작하는 프로젝트
              { "process.status": { $regex: "^[대진완홀]" } }, // 상태가 대진, 완결, 홀딩 중인 프로젝트
              { "process.contract.form.date.from": { $gte: ago } }, // 계약 시작일이 2일 전 이상인 프로젝트
              { "process.remain.date": { $gte: new Date(2000, 0, 1) } }, // 잔금이 남아있는 프로젝트
            ]
          }, { selfMongo });

          // 조회된 프로젝트가 있는 경우
          if (projects.length > 0) {
            // 해당 프로젝트에 포함된 클라이언트들을 조회
            clients = await back.getClientsByQuery({
              $or: [ ...new Set(projects.toNormal().map((pr) => { return pr.cliid; })) ].map((cliid) => { return { cliid } }),
            }, { selfMongo });

            // 각 프로젝트마다 클라이언트와 디자이너에게 계약 시작 알림을 전송
            for (let project of projects) {
              // 현재 프로젝트와 일치하는 클라이언트를 찾음
              clientIndex = clients.toNormal().findIndex((obj) => { return obj.cliid === project.cliid });
              if (clientIndex !== -1) {
                contractDate = project.process.contract.form.date.from; // 계약 시작일을 설정
                client = clients.toNormal()[clientIndex]; // 해당 클라이언트 정보를 가져옴
                requestNumber = 0;

                // 클라이언트 요청 중 프로젝트 타임라인과 일치하는 요청 번호를 찾음
                for (let z = 0; z < client.requests.length; z++) {
                  if (client.requests[z].request.timeline.valueOf() <= project.proposal.date.valueOf()) {
                    requestNumber = z;
                    break;
                  }
                }

                // 오늘 날짜가 계약 시작일과 일치할 경우 알림을 전송
                if (dateToString(contractDate) === dateToString(new Date())) {
                  // 디자이너 정보를 가져옴
                  designer = await back.getDesignerById(project.desid, { selfMongo });

                  // 디자이너에게 계약 시작일 알림톡 전송
                  await kakao.sendTalk("contractStartDesigner", designer.designer, designer.information.phone, {
                    designer: designer.designer,
                    client: client.name,
                    host: address.frontinfo.host, // 호스트 정보
                    proid: project.proid, // 프로젝트 ID
                  });

                  // 슬랙에 메시지를 전송하여 계약 시작일 알림 전송 완료를 알림
                  await messageSend(designer.designer + " 실장님께 " + client.name + " 고객님 프로젝트 계약 시작일 알림을 전송하였어요.", "#300_designer", false);
                }
              }
            }
          }

          // 작업 완료 후 로그에 기록
          await logger.cron("contract start designer alarm done");

        } catch (e) {
          // 오류 발생 시 콘솔에 로그 출력
          errorLogSync(e);
        }
      }
      try {
        // 첫 번째 미팅 알람 함수를 호출하고, 완료되면 계약 시작 알람 함수를 호출합니다.
        firstMeetingAlarmFunc(instance.mongo, logger)
          .then(() => {
            // 첫 번째 미팅 알람이 완료된 후 계약 시작 알람을 실행합니다.
            return contractStartAlarmFunc(instance.mongo, logger);
          })
          .then(() => {
            // 모든 작업이 완료되면 현재 시간을 로그에 기록합니다.
            return logger.cron("time delta alarm done : " + JSON.stringify(new Date()));
          })
          .catch((err) => {
            // 작업 중 오류가 발생하면 에러 로그를 기록하고, 클라이언트에 오류 메시지를 응답합니다.
            logger.error(err, req).catch((e) => { console.log(e); });
          });

        // 클라이언트에게 알림 작업이 실행될 것임을 응답합니다.
        res.send(JSON.stringify({ message: "will do" }));

      } catch (e) {
        // try 블록에서 오류가 발생하면 에러 로그를 기록하고, 클라이언트에 오류 메시지를 JSON 형식으로 응답합니다.
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /pushClient
     * @description 클라이언트에게 푸시 알림을 전송하는 라우터입니다.
     * @param {object} req - 클라이언트 요청 객체.
     * @param {object} res - 서버 응답 객체.
     */
    router.post([ "/pushClient" ], async function (req, res) {
      // 응답 헤더 설정: JSON 형식 응답, CORS 허용
      res.set({
        "Content-Type": "application/json", // 응답 데이터 형식을 JSON으로 설정
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서 접근 허용
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용할 HTTP 메서드 설정
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용할 요청 헤더 설정
      });

      /**
       * @function pushClientFunc
       * @description MongoDB에서 클라이언트 데이터를 가져와 필터링 후 카카오톡 메시지로 알림을 전송하는 비동기 함수입니다.
       * @param {object} MONGOC - MongoDB 연결 객체.
       * @param {object} logger - 로깅 객체.
       */
      const pushClientFunc = async (MONGOC, logger) => {
        try {
          const selfMongo = MONGOC; // MongoDB 연결 객체를 selfMongo에 할당
          const clients = await back.getClientsByQuery({}, { selfMongo, withTools: true }); // 클라이언트 데이터를 MongoDB에서 가져옴
          let today, ago;
          let requests;

          // 현재 시각을 기준으로 1시간 전으로 설정
          today = new Date();
          today.setHours(today.getHours() - 1);

          // 현재 시각을 기준으로 2일 전으로 설정
          ago = new Date();
          ago.setDate(ago.getDate() - 2);

          // 클라이언트의 요청 중 1차 응대가 예정된 요청만 필터링
          requests = clients.getRequestsTong().filter((request) => {
            return request.analytics.response.status.value === "응대중" && request.analytics.response.action.value === "1차 응대 예정";
          }).filter((request) => {
            // 타임라인이 today와 ago 사이에 있는 요청만 필터링
            return request.request.timeline.valueOf() < today.valueOf() && request.request.timeline.valueOf() >= ago.valueOf();
          });

          // 필터링된 요청들에 대해 카카오톡 메시지 전송 및 알림 로그 작성
          for (let request of requests) {
            await kakao.sendTalk("pushClient", request.name, request.phone, {
              client: request.name,
              host: address.frontinfo.host,
              path: "curation",
              cliid: request.cliid,
            });
            await messageSend({
              text: request.name + " 고객님께 신청 완료해달라고 부탁했어요.",
              channel: "#404_curation",
              voice: true
            });
            await sleep(1000); // 각 요청 간 1초 지연을 줌
          }

          await logger.cron("push client done"); // 작업이 완료된 후 로그 작성

        } catch (e) {
          console.log(e); // 오류 발생 시 콘솔에 오류 출력
        }
      }

      try {
        // 비동기 푸시 클라이언트 함수 실행
        pushClientFunc(instance.mongo, logger).catch((err) => {
          logger.error(err, req).catch((e) => { console.log(e); });
        });
        res.send(JSON.stringify({ message: "will do" })); // 클라이언트에게 작업 예정 메시지 전송
      } catch (e) {
        // 오류 발생 시 클라이언트에게 오류 메시지 전송
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /processConsole
     * @description 프로젝트, 클라이언트, 디자이너 및 히스토리 데이터를 처리하여 반환하는 라우터입니다. 검색 모드와 초기화 모드를 처리하며, 클라이언트와 프로젝트의 상태를 기반으로 데이터를 필터링합니다.
     * @param {Object} req - 클라이언트 요청 객체로, mode 및 기타 검색 필터를 포함합니다.
     * @param {Object} res - 서버 응답 객체로, JSON 형식으로 필터링된 데이터를 반환합니다.
     */
    router.post([ "/processConsole" ], async function (req, res) {
      // 응답 헤더를 설정하여 JSON 형식으로 응답하고, CORS를 허용
      res.set({
        "Content-Type": "application/json", // 응답의 Content-Type을 JSON으로 설정
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서 요청을 허용
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 헤더를 설정
      });

      try {
        // MongoDB 인스턴스를 selfMongo로 설정
        const selfMongo = instance.mongolocal;
        const selfCoreMongo = instance.mongo;
        const { mode } = req.body; // 요청에서 모드를 추출
        let projects, clients, designers, history;
        let preClients, clientHistory, proidArr;
        let secondRes;
        let values, clientValues, designerValues;
        let finalOr, searchMode, clientValue, designerValue;

        // NormalArray 클래스 정의: Array의 확장으로, 배열을 일반 배열로 변환하는 메서드를 제공
        class NormalArray extends Array {
          constructor(arr) {
            super();
            for (let i of arr) {
              this.push(i);
            }
          }
          toNormal() {
            let arr = [];
            for (let i of this) {
              arr.push(i);
            }
            return arr;
          }
        }

        // 'pre' 모드가 아닌 경우 처리 시작
        if (mode !== "pre") {
          if (mode === "init") {
            // 'init' 모드: 프로젝트 중 상태가 진행 중이거나 대기 중인 프로젝트를 가져옴
            projects = await back.getProjectsByQuery({
              $and: [
                { "process.contract.first.date": { $gte: new Date(2000, 0, 1) } }, // 2000년 이후 계약된 프로젝트
                { "process.status": { $regex: "^[진대]" } }, // 상태가 '진행', '대기'인 프로젝트
              ]
            }, { selfMongo: selfCoreMongo });

          } else if (mode === "search") {
            // 'search' 모드: 검색어가 주어졌을 때 필터링하여 프로젝트를 가져옴
            const { value } = req.body; // 검색어 추출

            // 검색어가 빈 문자열이거나 '.'일 경우 모든 프로젝트 가져오기
            if (value === '' || value === '.') {
              projects = await back.getProjectsByQuery({
                $and: [
                  { "process.contract.first.date": { $gte: new Date(2000, 0, 1) } },
                  { "process.status": { $regex: "^[진대]" } },
                ]
              }, { selfMongo: selfCoreMongo });

            } else {
              // 검색어에 ','가 포함된 경우 다중 검색어 처리
              if (/\,/gi.test(value)) {
                values = value.split(",").map((str) => { return str.trim() }); // 검색어를 ','로 분리 후 트림 처리
                clientValues = values.filter((str) => { return /^c\:/i.test(str) && str.length >= 3 }); // 'c:'로 시작하는 검색어는 클라이언트 필터
                designerValues = values.filter((str) => { return !(/^c\:/i.test(str) && str.length >= 3) }); // 나머지는 디자이너 필터

                // 클라이언트와 디자이너를 각각 필터링하여 가져옴
                if (clientValues.length > 0) {
                  preClients = await back.getClientsByQuery({ $or: clientValues.map((str) => { return str.split(":")[1].trim() }).map((str) => { return { name: { $regex: str } } }) }, { selfMongo: selfCoreMongo });
                } else {
                  preClients = new NormalArray([]);
                }
                if (designerValues.length > 0) {
                  preDesigners = await back.getDesignersByQuery({ $or: designerValues.map((str) => { return { designer: { $regex: str } } }) }, { selfMongo: selfCoreMongo });
                } else {
                  preDesigners = new NormalArray([]);
                }

                finalOr = preClients.toNormal().map((c) => { return { cliid: c.cliid } }).concat(preDesigners.toNormal().map((c) => { return { desid: c.desid } }));

                // 필터링된 클라이언트 및 디자이너 정보로 프로젝트 가져오기
                if (finalOr.length > 0) {
                  projects = await back.getProjectsByQuery({ $or: finalOr }, { selfMongo: selfCoreMongo });
                  projects = projects.filter((project) => {
                    return project.process.contract.first.date.valueOf() > (new Date(2000, 0, 1)).valueOf();
                  });
                } else {
                  projects = [];
                }

              } else if (/^c\:/i.test(value) && value.length >= 3) {
                // 'c:'로 시작하는 검색어는 클라이언트 이름으로 필터링
                clientValue = value.split(":")[1].trim();
                preClients = await back.getClientsByQuery({ name: { $regex: clientValue } }, { selfMongo: selfCoreMongo });

                // 클라이언트를 기준으로 프로젝트 필터링
                if (preClients.length === 0) {
                  projects = [];
                } else {
                  projects = await back.getProjectsByQuery({ $or: preClients.toNormal().map((c) => { return { cliid: c.cliid } }) }, { selfMongo: selfCoreMongo });
                  projects = projects.filter((project) => {
                    return project.process.contract.first.date.valueOf() > (new Date(2000, 0, 1)).valueOf();
                  });
                }

              } else {
                // 디자이너 이름으로 필터링
                designerValue = value;
                preDesigners = await back.getDesignersByQuery({ designer: { $regex: designerValue } }, { selfMongo: selfCoreMongo });

                // 디자이너를 기준으로 프로젝트 필터링
                if (preDesigners.length === 0) {
                  projects = [];
                } else {
                  projects = await back.getProjectsByQuery({ $or: preDesigners.toNormal().map((c) => { return { desid: c.desid } }) }, { selfMongo: selfCoreMongo });
                  projects = projects.filter((project) => {
                    return project.process.contract.first.date.valueOf() > (new Date(2000, 0, 1)).valueOf();
                  });
                }
              }
            }

          } else {
            // 기본 필터링: 진행 중이거나 대기 중인 프로젝트를 필터링
            projects = await back.getProjectsByQuery({
              $and: [
                { "process.contract.first.date": { $gte: new Date(2000, 0, 1) } },
                { "process.status": { $regex: "^[진대]" } }
              ]
            }, { selfMongo: selfCoreMongo });
          }

          // 프로젝트를 첫 계약 날짜에 따라 내림차순으로 정렬
          projects.sort((a, b) => { return b.process.contract.first.date.valueOf() - a.process.contract.first.date.valueOf() });

          if (projects.length > 0) {
            // 필터링된 프로젝트에 포함된 클라이언트와 디자이너 데이터를 가져옴
            clients = await back.getClientsByQuery({ $or: Array.from(new Set(projects.toNormal().map((p) => { return p.cliid }))).map((cliid) => { return { cliid } }) }, { selfMongo: selfCoreMongo });
            designers = await back.getDesignersByQuery({ $or: Array.from(new Set(projects.toNormal().map((p) => { return p.desid }))).map((desid) => { return { desid } }) }, { selfMongo: selfCoreMongo });

            // 프로젝트 히스토리와 클라이언트 히스토리도 가져옴
            history = await back.mongoRead("projectHistory", { $or: projects.toNormal().map((project) => { return { proid: project.proid } }) }, { selfMongo });
            clientHistory = await back.mongoRead("clientHistory", { $or: clients.toNormal().map((client) => { return { cliid: client.cliid } }) }, { selfMongo });

            // 추가적인 데이터 요청
            proidArr = projects.toNormal().map((p) => { return p.proid });
            secondRes = await requestSystem("https://" + address.secondinfo.host + ":3003/getProcessData", { proidArr }, {
              headers: {
                "Content-Type": "application/json",
                "origin": address.officeinfo.host
              }
            });

            // 결과를 클라이언트에게 JSON 형식으로 응답
            res.send(JSON.stringify({ projects: projects.toNormal(), clients: clients.toNormal(), designers: designers.toNormal(), history, clientHistory, rawContents: secondRes.data.rawContents, sendStatus: secondRes.data.sendStatus, sendSchedule: secondRes.data.sendSchedule, sendFile: secondRes.data.sendFile }));

          } else {
            // 필터링된 데이터가 없을 경우 빈 배열로 응답
            res.send(JSON.stringify({ projects: [], clients: [], designers: [], history: [], clientHistory: [], rawContents: [], sendStatus: [], sendSchedule: [], sendFile: [] }));
          }
        } else {
          // 'pre' 모드인 경우, 검색 모드를 확인하고 프로젝트 필터링 처리
          searchMode = (typeof req.body.searchMode === "string" && /^p/.test(req.body.searchMode));

          if (searchMode) {
            projects = await back.getProjectsByQuery({
              $and: [
                { "process.contract.first.date": { $gte: new Date(2000, 0, 1) } },
                { "proid": req.body.searchMode }
              ]
            }, { selfMongo: selfCoreMongo });
          } else {
            // 'careView' 모드 확인
            if (req.body.careView !== undefined && Number(req.body.careView) === 1) {
              projects = await back.getProjectsByQuery({
                $and: [
                  { "process.contract.first.date": { $gte: new Date(2000, 0, 1) } },
                  { "process.status": { $regex: "^[진]" } }
                ]
              }, { selfMongo: selfCoreMongo });
            } else {
              projects = await back.getProjectsByQuery({
                $and: [
                  { "process.contract.first.date": { $gte: new Date(2000, 0, 1) } },
                  { "process.status": { $regex: "^[진대]" } }
                ]
              }, { selfMongo: selfCoreMongo });
            }
          }

          // 필터링된 프로젝트 응답
          projects.sort((a, b) => { return b.process.contract.first.date.valueOf() - a.process.contract.first.date.valueOf() });
          if (projects.length > 0) {
            clients = await back.getClientsByQuery({ $or: Array.from(new Set(projects.toNormal().map((p) => { return p.cliid }))).map((cliid) => { return { cliid } }) }, { selfMongo: selfCoreMongo });
            res.send(JSON.stringify({ projects: projects.toNormal(), clients: clients.toNormal() }));
          } else {
            res.send(JSON.stringify({ projects: [], clients: [] }));
          }
        }

      } catch (e) {
        // 에러 처리: 에러를 로그로 기록하고, 클라이언트에게 JSON 형식으로 오류 메시지를 응답
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /salesClient
     * @description 클라이언트의 판매 데이터를 조회 및 관리하는 라우터입니다. 초기화, 검색, 업데이트 및 저우선순위 클라이언트 처리 모드를 지원합니다.
     * @param {Object} req - 클라이언트 요청 객체로, 모드와 데이터가 포함됩니다.
     * @param {Object} res - 서버 응답 객체로, 처리 결과를 JSON 형식으로 반환합니다.
     */
    router.post([ "/salesClient" ], async function (req, res) {
      // 응답 헤더 설정: JSON 형식으로 응답하고 CORS를 허용
      res.set({
        "Content-Type": "application/json", // 응답 Content-Type을 JSON으로 설정
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 요청을 허용
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 헤더를 설정
      });
      try {
        // 모드가 정의되지 않으면 오류 발생
        if (req.body.mode === undefined) {
          throw new Error("invalid post");
        }

        // MongoDB 인스턴스 설정
        const selfMongo = instance.mongo;
        const selfCoreMongo = instance.mongo;
        const collection = "dailySales";
        const { mode } = req.body;
        const monthAgo = 3;
        let basicRows;
        let pureCliids;
        let clients, clientHistories;
        let standard;
        let resultObj;
        let whereQuery, updateQuery;
        let filteredHistory;
        let ongoingClients;
        let ongoingClientsRequests;
        let ongoingClientsCliids;
        let orQuery;
        let newBasicRows;
        let copiedObj;
        let ago;
        let targetCliids;
        let targetClients;
        let targetHistories;
        let copiedSend;
    
        /**
         * 3개월 전을 기준으로 표준 날짜를 설정합니다.
         * @let {Date} standard - 기준 날짜를 현재로부터 3개월 전으로 설정.
         */
        standard = new Date();
        standard.setMonth(standard.getMonth() - monthAgo);

        /**
         * 결과 객체의 기본 메시지를 "done"으로 설정합니다.
         * @let {Object} resultObj - 결과 객체에 기본 메시지 설정.
         */
        resultObj = { message: "done" };
    
        if (mode === "init") {
    
          /**
           * 진행 중인 클라이언트를 조회합니다. 요청 데이터의 'analytics.response.status' 필드가 '응' 또는 '장'으로 시작하는 클라이언트만을 필터링합니다.
           * @const {Array} ongoingClients - 진행 중인 클라이언트 목록.
           * @const {Object} selfCoreMongo - MongoDB 로컬 인스턴스.
           */
          ongoingClients = await back.getClientsByQuery({
            requests: {
              $elemMatch: {
                "analytics.response.status": {
                  $regex: "^[응장]" // '응' 또는 '장'으로 시작하는 요청 상태만 필터링
                }
              }
            }
          }, { selfMongo: selfCoreMongo, withTools: true });

          /**
           * 진행 중인 클라이언트들의 요청 데이터를 추출하여 정렬합니다. 최근 날짜 순으로 정렬합니다.
           * @const {Array} ongoingClientsRequests - 진행 중인 클라이언트 요청 목록.
           */
          ongoingClientsRequests = ongoingClients.getRequestsTong(); // 클라이언트의 요청 데이터를 'getRequestsTong()' 메서드로 추출
          ongoingClientsRequests.sort((a, b) => {
            return a.request.timeline.valueOf() - b.request.timeline.valueOf(); // 요청의 타임라인을 기준으로 정렬
          });

          /**
           * 만약 진행 중인 클라이언트 요청이 없을 경우, 기본적인 데이터를 조회합니다. 그렇지 않으면, 첫 번째 요청의 타임라인을 기준으로 데이터를 가져옵니다.
           * @const {Array} basicRows - 조회된 기본 클라이언트 데이터 목록.
           */
          if (ongoingClientsRequests.length === 0) {
            basicRows = await back.mongoRead(collection, { date: { $gte: standard } }, { selfMongo }); // 기준 날짜보다 최신 데이터를 조회
          } else {
            basicRows = await back.mongoRead(collection, { date: { $gte: ongoingClientsRequests[0].request.timeline } }, { selfMongo }); // 첫 번째 요청의 타임라인을 기준으로 데이터 조회
          }

          /**
           * 가져온 기본 클라이언트 데이터를 최신순으로 정렬합니다.
           */
          basicRows.sort((a, b) => {
            return b.date.valueOf() - a.date.valueOf(); // 날짜를 기준으로 내림차순 정렬
          });

          /**
           * 기본 데이터의 클라이언트 ID 목록을 추출하여 배열로 만듭니다.
           * @const {Array} pureCliids - 각 클라이언트의 고유 ID 목록.
           */
          pureCliids = basicRows.map((o) => {
            return o.cliids.map((o2) => {
              return o2.cliid; // 클라이언트 ID를 배열로 추출
            })
          }).flat(); // 중첩 배열을 평탄화하여 단일 배열로 만듦

          /**
           * 추출된 클라이언트 ID를 기반으로 클라이언트 정보를 MongoDB에서 조회합니다.
           * @const {Array} clients - 조회된 클라이언트 정보 목록.
           */
          clients = await back.getClientsByQuery({ $or: pureCliids.map((cliid) => { return { cliid } }) }, { selfMongo: selfCoreMongo });

          /**
           * 클라이언트 히스토리를 조회합니다.
           * @const {Array} clientHistories - 조회된 클라이언트 히스토리 목록.
           */
          clientHistories = await back.mongoRead("clientHistory", { $or: pureCliids.map((cliid) => { return { cliid } }) }, { selfMongo });

          /**
           * 클라이언트 히스토리에서 필요한 필드를 필터링하여 저장합니다.
           * @const {Array} filteredHistory - 필터링된 클라이언트 히스토리 목록.
           */
          filteredHistory = [];
          for (let obj of clientHistories) {
            filteredHistory.push({
              cliid: obj.cliid, // 클라이언트 ID
              manager: obj.manager, // 담당 관리자
              curation: obj.curation, // 큐레이션 정보
            });
          }

          /**
           * 결과 객체를 생성하여, 조회된 클라이언트, 필터링된 히스토리 및 기본 데이터를 반환합니다.
           * @const {Object} resultObj - 결과를 담을 객체.
           */
          resultObj = {
            clients: clients.toNormal(), // 클라이언트 정보를 배열 형태로 반환
            histories: filteredHistory, // 필터링된 히스토리 반환
            sales: basicRows // 기본 데이터 반환
          };
    
        } else if (mode === "search") {
    
          /**
           * 클라이언트 요청 객체에서 검색 값(value)을 추출합니다.
           * @const {string} value - 검색어로 사용될 문자열.
           */
          const { value } = req.body;

          /**
           * 입력된 값이 빈 문자열이거나 '.'이면 기본 데이터를 조회합니다.
           */
          if (value.trim() === '' || value.trim() === '.') {

            /**
             * 진행 중인 클라이언트를 조회합니다. 요청 데이터의 'analytics.response.status' 필드가 '응' 또는 '장'으로 시작하는 클라이언트만을 필터링합니다.
             * @const {Array} ongoingClients - 진행 중인 클라이언트 목록.
             */
            ongoingClients = await back.getClientsByQuery({
              requests: {
                $elemMatch: {
                  "analytics.response.status": {
                    $regex: "^[응장]" // '응' 또는 '장'으로 시작하는 요청 상태만 필터링
                  }
                }
              }
            }, { selfMongo: selfCoreMongo, withTools: true });

            /**
             * 진행 중인 클라이언트들의 요청 데이터를 추출하여 정렬합니다. 최근 날짜 순으로 정렬합니다.
             * @const {Array} ongoingClientsRequests - 진행 중인 클라이언트 요청 목록.
             */
            ongoingClientsRequests = ongoingClients.getRequestsTong(); // 클라이언트의 요청 데이터를 'getRequestsTong()' 메서드로 추출
            ongoingClientsRequests.sort((a, b) => {
              return a.request.timeline.valueOf() - b.request.timeline.valueOf(); // 요청의 타임라인을 기준으로 정렬
            });

            /**
             * 만약 진행 중인 클라이언트 요청이 없을 경우, 기본적인 데이터를 조회합니다. 그렇지 않으면, 첫 번째 요청의 타임라인을 기준으로 데이터를 가져옵니다.
             * @const {Array} basicRows - 조회된 기본 클라이언트 데이터 목록.
             */
            if (ongoingClientsRequests.length === 0) {
              basicRows = await back.mongoRead(collection, { date: { $gte: standard } }, { selfMongo }); // 기준 날짜보다 최신 데이터를 조회
            } else {
              basicRows = await back.mongoRead(collection, { date: { $gte: ongoingClientsRequests[0].request.timeline } }, { selfMongo }); // 첫 번째 요청의 타임라인을 기준으로 데이터 조회
            }

            /**
             * 가져온 기본 클라이언트 데이터를 최신순으로 정렬합니다.
             */
            basicRows.sort((a, b) => {
              return b.date.valueOf() - a.date.valueOf(); // 날짜를 기준으로 내림차순 정렬
            });

            /**
             * 기본 데이터의 클라이언트 ID 목록을 추출하여 배열로 만듭니다.
             * @const {Array} pureCliids - 각 클라이언트의 고유 ID 목록.
             */
            pureCliids = basicRows.map((o) => {
              return o.cliids.map((o2) => {
                return o2.cliid; // 클라이언트 ID를 배열로 추출
              })
            }).flat(); // 중첩 배열을 평탄화하여 단일 배열로 만듦

            /**
             * 추출된 클라이언트 ID를 기반으로 클라이언트 정보를 MongoDB에서 조회합니다.
             * @const {Array} clients - 조회된 클라이언트 정보 목록.
             */
            clients = await back.getClientsByQuery({ $or: pureCliids.map((cliid) => { return { cliid } }) }, { selfMongo: selfCoreMongo });

            /**
             * 클라이언트 히스토리를 조회합니다.
             * @const {Array} clientHistories - 조회된 클라이언트 히스토리 목록.
             */
            clientHistories = await back.mongoRead("clientHistory", { $or: pureCliids.map((cliid) => { return { cliid } }) }, { selfMongo });

            /**
             * 클라이언트 히스토리에서 필요한 필드를 필터링하여 저장합니다.
             * @const {Array} filteredHistory - 필터링된 클라이언트 히스토리 목록.
             */
            filteredHistory = [];
            for (let obj of clientHistories) {
              filteredHistory.push({
                cliid: obj.cliid, // 클라이언트 ID
                manager: obj.manager, // 담당 관리자
                curation: obj.curation, // 큐레이션 정보
              });
            }

            /**
             * 결과 객체를 생성하여, 조회된 클라이언트, 필터링된 히스토리 및 기본 데이터를 반환합니다.
             * @const {Object} resultObj - 결과를 담을 객체.
             */
            resultObj = {
              clients: clients.toNormal(), // 클라이언트 정보를 배열 형태로 반환
              histories: filteredHistory, // 필터링된 히스토리 반환
              sales: basicRows // 기본 데이터 반환
            };

          } else {

            /**
             * 입력된 검색 값(value)을 기준으로 클라이언트 이름이 포함된 클라이언트를 조회합니다.
             * @const {Array} ongoingClients - 검색된 클라이언트 목록.
             */
            ongoingClients = await back.getClientsByQuery({
              name: { $regex: value } // 입력된 value 값으로 클라이언트 검색
            }, { selfMongo: selfCoreMongo });

            /**
             * 검색된 클라이언트 목록에서 각 클라이언트의 ID를 추출하여 배열로 만듭니다.
             * @const {Array} ongoingClientsCliids - 검색된 클라이언트의 ID 목록.
             */
            ongoingClientsCliids = ongoingClients.toNormal().map((c) => { return c.cliid });

            /**
             * 클라이언트 ID 목록을 기반으로 쿼리 조건을 만듭니다.
             * @const {Array} orQuery - MongoDB 쿼리 조건을 위한 배열.
             */
            orQuery = [];
            for (let cliid of ongoingClientsCliids) {
              orQuery.push({
                cliids: {
                  $elemMatch: { cliid } // 해당 클라이언트 ID가 일치하는 데이터를 찾기 위한 조건
                }
              });
            }

            /**
             * 만약 조건에 맞는 클라이언트가 없으면, 빈 데이터를 반환합니다.
             */
            if (orQuery.length === 0) {
              basicRows = [];
              resultObj = {
                clients: [], // 빈 클라이언트 목록
                histories: [], // 빈 히스토리 목록
                sales: basicRows // 빈 판매 데이터 목록
              };
            } else {
              /**
               * 조건에 맞는 클라이언트의 판매 데이터를 조회합니다.
               * @const {Array} basicRows - 조회된 기본 판매 데이터 목록.
               */
              basicRows = await back.mongoRead(collection, { $or: orQuery }, { selfMongo });

              /**
               * 조회된 데이터 중 필요한 클라이언트 ID만 남기고 새로운 데이터를 만듭니다.
               * @const {Array} newBasicRows - 필터링된 새로운 판매 데이터 목록.
               */
              newBasicRows = [];
              for (let obj of basicRows) {
                copiedObj = equalJson(JSON.stringify(obj));
                copiedObj.cliids = copiedObj.cliids.filter((o) => {
                  return ongoingClientsCliids.includes(o.cliid); // 진행 중인 클라이언트 ID만 남기기
                });
                newBasicRows.push(copiedObj); // 새로운 데이터를 배열에 추가
              }

              /**
               * 새로운 판매 데이터에서 클라이언트 ID 목록을 추출합니다.
               * @const {Array} pureCliids - 클라이언트 ID 목록.
               */
              pureCliids = newBasicRows.map((o) => {
                return o.cliids.map((o2) => {
                  return o2.cliid;
                });
              }).flat();

              /**
               * 만약 클라이언트 ID가 없으면, 빈 히스토리 데이터를 반환합니다.
               */
              if (pureCliids.length === 0) {
                filteredHistory = [];
              } else {
                /**
                 * 클라이언트 ID를 기반으로 클라이언트 히스토리를 조회하고, 필요한 필드를 필터링합니다.
                 * @const {Array} clientHistories - 조회된 클라이언트 히스토리 목록.
                 */
                clientHistories = await back.mongoRead("clientHistory", { $or: pureCliids.map((cliid) => { return { cliid } }) }, { selfMongo });
                filteredHistory = [];
                for (let obj of clientHistories) {
                  filteredHistory.push({
                    cliid: obj.cliid, // 클라이언트 ID
                    manager: obj.manager, // 담당 관리자
                    curation: obj.curation, // 큐레이션 정보
                  });
                }
              }

              /**
               * 결과 객체를 생성하여, 조회된 클라이언트, 필터링된 히스토리 및 새로운 데이터를 반환합니다.
               * @const {Object} resultObj - 결과를 담을 객체.
               */
              resultObj = {
                clients: ongoingClients.toNormal(), // 검색된 클라이언트 정보
                histories: filteredHistory, // 필터링된 히스토리 정보
                sales: newBasicRows // 필터링된 판매 데이터
              };
            }
          }
    
        } else if (mode === "update") {
    
          /**
           * 요청 본문(req.body)을 equalJson 메서드를 사용하여 whereQuery와 updateQuery로 변환합니다.
           * equalJson 메서드는 딥 카피와 JSON.parse의 업그레이드 버전입니다. 이를 통해 전달된 데이터를 안전하게 복사 및 변환합니다.
           * @const {Object} whereQuery - MongoDB 쿼리 조건.
           * @const {Object} updateQuery - MongoDB 업데이트 쿼리.
           */
          ({ whereQuery, updateQuery } = equalJson(req.body));

          /**
           * 백엔드의 mongoUpdate 메서드를 사용하여, MongoDB에서 해당 컬렉션을 업데이트합니다.
           * @param {string} collection - 업데이트할 MongoDB 컬렉션 이름 ("dailySales").
           * @param {Array} [whereQuery, updateQuery] - MongoDB의 쿼리 조건과 업데이트 조건을 배열로 전달.
           * @param {Object} selfMongo - 로컬 MongoDB 인스턴스.
           */
          await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo });

          /**
           * 업데이트가 완료되면, 클라이언트에게 성공 메시지를 담은 JSON 객체를 반환합니다.
           * @const {Object} resultObj - 응답 객체로, 메시지를 포함하여 업데이트 완료 상태를 반환합니다.
           */
          resultObj = { message: "done" };
    
        } else if (mode === "lowLow") {

          /**
           * 클라이언트 요청 본문에서 cliid가 문자열로 전달된 경우, 해당 cliid에 대한 타겟 클라이언트를 조회하고 알림톡을 전송합니다.
           * 또한, 클라이언트의 히스토리를 업데이트합니다.
           * @param {string} req.body.cliid - 조회할 클라이언트 ID.
           */
          if (typeof req.body.cliid === "string") {

            // MongoDB에서 해당 cliid를 가진 클라이언트를 조회합니다.
            targetClients = await back.getClientsByQuery({ cliid: req.body.cliid }, { selfMongo: selfCoreMongo });

            // 해당 클라이언트의 히스토리 데이터를 조회합니다.
            targetHistories = await back.mongoRead("clientHistory", { cliid: req.body.cliid }, { selfMongo });

            // 조회된 각 클라이언트에게 알림톡을 전송합니다.
            for (let client of targetClients) {
              await kakao.sendTalk("hahaClientSend", client.name, client.phone, { client: client.name, host: instance.address.frontinfo.host, cliid: client.cliid });

              // 알림톡 전송 후, 고객 채널에 메시지를 전송합니다.
              await messageSend({ text: client.name + " 고객님께 하하(타겟 하, 우선순위 하) 고객용 알림톡을 전송하였습니다!", channel: "#400_customer", voice: false });
            }

            // 클라이언트 히스토리 데이터를 업데이트합니다.
            for (let history of targetHistories) {

              whereQuery = { cliid: history.cliid };  // 업데이트할 클라이언트 ID에 대한 조건을 설정합니다.
              updateQuery = {};

              // 클라이언트 히스토리에서 curation.analytics.send 배열에 새로운 데이터를 추가하고 정렬합니다.
              copiedSend = equalJson(JSON.stringify(history.curation.analytics.send));
              copiedSend.push({
                page: "lowLowPush",
                date: new Date(),
                mode: null,
                who: {
                  name: null,
                  email: null,
                }
              });
              copiedSend.sort((a, b) => a.date.valueOf() - b.date.valueOf());

              updateQuery["curation.analytics.send"] = copiedSend;

              // MongoDB에 히스토리 업데이트를 반영합니다.
              await back.mongoUpdate("clientHistory", [whereQuery, updateQuery], { selfMongo });
            }

            resultObj = copiedSend;  // 클라이언트에게 업데이트된 히스토리 데이터를 반환합니다.

          } else {
            // cliid가 제공되지 않은 경우, 하루 전 데이터를 기준으로 타겟 클라이언트를 조회하고 알림톡을 전송합니다.

            ago = new Date();
            ago.setDate(ago.getDate() - 1);  // 하루 전 날짜 설정

            // MongoDB에서 하루 전 데이터를 조회합니다.
            basicRows = await back.mongoRead(collection, { date: { $gte: ago } }, { selfMongo });

            if (basicRows.length === 0) {
              resultObj = { message: "fail" };  // 조회된 데이터가 없으면 실패 메시지를 반환
            } else {
              targetCliids = basicRows[0].cliids;

              // 타겟 우선순위와 목표가 설정되지 않은 클라이언트만 필터링합니다.
              targetCliids = targetCliids.filter(obj => obj.priority === 0 && obj.target === 0);

              if (targetCliids.length === 0) {
                resultObj = { message: "done" };  // 필터링된 클라이언트가 없으면 완료 메시지를 반환
              } else {
                // 필터링된 클라이언트들에 대해 MongoDB에서 클라이언트를 조회하고 알림톡을 전송합니다.
                targetClients = await back.getClientsByQuery({ $or: targetCliids.map(obj => ({ cliid: obj.cliid })) }, { selfMongo: selfCoreMongo });

                targetHistories = await back.mongoRead("clientHistory", { $or: targetCliids.map(obj => ({ cliid: obj.cliid })) }, { selfMongo });

                for (let client of targetClients) {
                  await kakao.sendTalk("hahaClientSend", client.name, client.phone, { client: client.name, host: instance.address.frontinfo.host, cliid: client.cliid });
                  await messageSend({ text: client.name + " 고객님께 하하(타겟 하, 우선순위 하) 고객용 알림톡을 전송하였습니다!", channel: "#400_customer", voice: false });
                }

                for (let history of targetHistories) {
                  whereQuery = { cliid: history.cliid };
                  updateQuery = {};

                  copiedSend = equalJson(JSON.stringify(history.curation.analytics.send));
                  copiedSend.push({
                    page: "lowLowPush",
                    date: new Date(),
                    mode: null,
                    who: {
                      name: null,
                      email: null,
                    }
                  });
                  copiedSend.sort((a, b) => a.date.valueOf() - b.date.valueOf());

                  updateQuery["curation.analytics.send"] = copiedSend;
                  await back.mongoUpdate("clientHistory", [whereQuery, updateQuery], { selfMongo });
                }

                resultObj = { message: "done" };  // 완료 메시지를 반환
              }
            }
          }
        }
    
        res.send(JSON.stringify(resultObj));
    
      } catch (e) {
        // 에러가 발생하면 에러를 기록하고 클라이언트에 에러 메시지를 전송합니다.
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /dailySales
     * @description 최근 30일간의 클라이언트 요청을 분석하여 일일 매출 데이터를 생성하고 저장하는 라우터입니다.
     * @param {object} req - 클라이언트 요청 객체.
     * @param {object} res - 서버 응답 객체. 생성된 일일 매출 데이터를 반환합니다.
     */
    router.post([ "/dailySales" ], async function (req, res) {
      // 응답 헤더를 설정: JSON 형식으로 반환하며, CORS 설정으로 다양한 출처에서의 접근을 허용합니다.
      res.set({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });

      try {
          // MongoDB 인스턴스 초기화: selfMongo는 로컬 MongoDB, selfCoreMongo는 메인 MongoDB를 참조합니다.
          const selfMongo = instance.mongolocal;
          const selfCoreMongo = instance.mongo;

          // aMonthAgo는 30일 전의 날짜를 나타냅니다.
          const aMonthAgo = new Date();
          aMonthAgo.setDate(aMonthAgo.getDate() - 30);

          // 최근 30일 동안의 클라이언트 요청을 가져옵니다.
          const clients = await back.getClientsByQuery({
              requests: {
                  $elemMatch: {
                      "request.timeline": { $gte: aMonthAgo }  // 30일 전 이후의 요청을 가져옴
                  }
              }
          }, { selfMongo: selfCoreMongo, withTools: true });

          // 요청을 클라이언트별로 분류하여 가져옵니다.
          const requests = clients.getRequestsTong();

          // dailySales라는 컬렉션을 사용할 것입니다.
          const collection = "dailySales";

          // idMaker 함수는 날짜를 기반으로 ID를 생성합니다.
          const idMaker = (date) => {
              return `sales_${dateToString(date).replace(/\-/gi, '')}`;
          }

          let now, standard0From, standard1From, standard2From, standard3From, standard4From;
          let standard0To, standard1To, standard2To, standard3To, standard4To;
          let dummy, thisRequests, matrix, rows, resultObj;

          // 현재 시간을 기준으로 기준일을 설정합니다.
          now = new Date();

          // 월요일부터 금요일까지의 데이터를 계산하기 위한 날짜 설정입니다.
          standard0From = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0, 0, 0);
          while (standard0From.getDay() === 0 || standard0From.getDay() === 6) {
              standard0From.setDate(standard0From.getDate() - 1);  // 주말이면 하루씩 앞으로 이동
          }

          // 이전 날짜로 이동하며 평일을 찾는 작업을 반복합니다.
          standard1From = new Date(JSON.stringify(standard0From).slice(1, -1));
          standard1From.setDate(standard1From.getDate() - 1);
          while (standard1From.getDay() === 0 || standard1From.getDay() === 6) {
              standard1From.setDate(standard1From.getDate() - 1);
          }

          standard2From = new Date(JSON.stringify(standard1From).slice(1, -1));
          standard2From.setDate(standard2From.getDate() - 1);
          while (standard2From.getDay() === 0 || standard2From.getDay() === 6) {
              standard2From.setDate(standard2From.getDate() - 1);
          }

          standard3From = new Date(JSON.stringify(standard2From).slice(1, -1));
          standard3From.setDate(standard3From.getDate() - 1);
          while (standard3From.getDay() === 0 || standard3From.getDay() === 6) {
              standard3From.setDate(standard3From.getDate() - 1);
          }

          standard4From = new Date(JSON.stringify(standard3From).slice(1, -1));
          standard4From.setDate(standard4From.getDate() - 1);
          while (standard4From.getDay() === 0 || standard4From.getDay() === 6) {
              standard4From.setDate(standard4From.getDate() - 1);
          }

          // 'To' 값은 'From' 값을 기준으로 동일하게 설정합니다.
          standard0To = new Date(JSON.stringify(standard0From).slice(1, -1));
          standard1To = new Date(JSON.stringify(standard1From).slice(1, -1));
          standard2To = new Date(JSON.stringify(standard2From).slice(1, -1));
          standard3To = new Date(JSON.stringify(standard3From).slice(1, -1));
          standard4To = new Date(JSON.stringify(standard4From).slice(1, -1));

          // 각 기준일 사이에 공휴일이나 주말을 피해서 날짜를 설정합니다.
          standard0From.setDate(standard0From.getDate() - 1);
          while (standard0From.getDay() === 0 || standard0From.getDay() === 6) {
              standard0From.setDate(standard0From.getDate() - 1);
          }
          standard1From.setDate(standard1From.getDate() - 1);
          while (standard1From.getDay() === 0 || standard1From.getDay() === 6) {
              standard1From.setDate(standard1From.getDate() - 1);
          }
          standard2From.setDate(standard2From.getDate() - 1);
          while (standard2From.getDay() === 0 || standard2From.getDay() === 6) {
              standard2From.setDate(standard2From.getDate() - 1);
          }
          standard3From.setDate(standard3From.getDate() - 1);
          while (standard3From.getDay() === 0 || standard3From.getDay() === 6) {
              standard3From.setDate(standard3From.getDate() - 1);
          }
          standard4From.setDate(standard4From.getDate() - 1);
          while (standard4From.getDay() === 0 || standard4From.getDay() === 6) {
              standard4From.setDate(standard4From.getDate() - 1);
          }

          // 매트릭스 배열을 생성하여 각 기준일의 범위를 설정합니다.
          matrix = [
              [standard0From, standard0To],
              [standard1From, standard1To],
              [standard2From, standard2To],
              [standard3From, standard3To],
              [standard4From, standard4To],
          ];

          // 각 날짜 범위에 대해 데이터를 생성합니다.
          for (let [standardFrom, standardTo] of matrix) {
              // dummy 객체에 해당 날짜 범위의 데이터를 저장합니다.
              dummy = {
                  id: idMaker(standardTo),
                  date: new Date(JSON.stringify(standardTo).slice(1, -1)),
                  range: {
                      from: new Date(JSON.stringify(standardFrom).slice(1, -1)),
                      to: new Date(JSON.stringify(standardTo).slice(1, -1)),
                  },
                  cliids: [],
              };

              // 주어진 기간 동안의 요청을 필터링하여 해당 기간에 맞는 클라이언트 요청을 가져옵니다.
              thisRequests = requests.filter((request) => {
                  return request.request.timeline.valueOf() > standardFrom.valueOf() && request.request.timeline.valueOf() <= standardTo.valueOf();
              });

              // 각 요청을 반복하며 클라이언트 ID를 저장합니다.
              for (let obj of thisRequests) {
                  dummy.cliids.push({
                      cliid: obj.cliid,  // 클라이언트 ID
                      possible: 0,  // 예상 가능성 값 (임의 값)
                      priority: 0,  // 우선 순위 값 (임의 값)
                      target: 0,  // 목표 값 (임의 값)
                  });
              }

              // 동일한 ID의 데이터가 이미 있는지 확인하고, 있으면 삭제한 후 새로 저장합니다.
              rows = await back.mongoRead(collection, { id: dummy.id }, { selfMongo });
              if (rows.length !== 0) {
                  await back.mongoDelete(collection, { id: dummy.id }, { selfMongo });
              }
              await back.mongoCreate(collection, equalJson(JSON.stringify(dummy)), { selfMongo });
          }

          // 결과 객체를 생성하고 클라이언트에 반환합니다.
          resultObj = { message: "done" };

          // 클라이언트에 최종 결과를 JSON 형식으로 전송합니다.
          res.send(JSON.stringify(resultObj));

      } catch (e) {
          // 에러가 발생하면 에러를 기록하고 클라이언트에 에러 메시지를 전송합니다.
          logger.error(e, req).catch((e) => { console.log(e); });
          res.set("Content-Type", "application/json");
          res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /dailySalesReport
     * @description 지정된 기간 동안의 일일 판매 보고서를 생성하는 라우터입니다. 클라이언트의 요청에 따라 시작 연도/월과 종료 연도/월을 기준으로 데이터를 조회하고 보고서를 반환합니다.
     * @param {Object} req - 클라이언트 요청 객체로, 요청 본문에는 startYear, startMonth, endYear, endMonth가 포함됩니다.
     * @param {Object} res - 서버 응답 객체로, 처리된 판매 보고서를 JSON 형식으로 반환합니다.
     */
    router.post([ "/dailySalesReport" ], async function (req, res) {
      
      // 응답 헤더 설정: JSON 형식으로 응답하고 CORS를 허용
      res.set({
        "Content-Type": "application/json", // 응답 형식으로 JSON 설정
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 요청을 허용
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드 설정
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 헤더 설정
      });
      try {
        // 요청에 필요한 파라미터들이 누락되었을 경우 에러를 발생시킵니다.
        if (req.body.startYear === undefined || req.body.startMonth === undefined || req.body.endYear === undefined || req.body.endMonth === undefined) {
          throw new Error("invalid post");  // 파라미터가 없을 경우 잘못된 요청 처리
        }

        // 요청으로부터 필요한 파라미터들을 추출합니다.
        const { startYear, startMonth, endYear, endMonth } = req.body;

        // MongoDB와 관련된 인스턴스 설정
        const selfMongo = instance.mongolocal;  // 로컬 MongoDB 인스턴스
        const selfCoreMongo = instance.mongo;  // 메인 MongoDB 인스턴스
        const collection = "dailySales";  // 조회할 컬렉션 이름
        const historyCollection = "clientHistory";  // 클라이언트 기록이 저장된 컬렉션
        const proposalKeywords = "designerProposal";  // 제안 관련 키워드
        const db = "miro81";  // 데이터베이스 이름

        // 특정 row에서 cliids 값을 추출하여 클라이언트 ID 목록을 반환하는 함수
        const rowToCliids = (rows) => {
          const targetRows = equalJson(JSON.stringify(rows));  // deep copy를 위한 equalJson 사용
          return targetRows.map((o) => { return o.cliids.map(({ cliid }) => { return cliid }) }).flat();  // cliid 추출 및 플랫 처리
        }
        let rows;
        let rowsCopy;
        let whereQuery;
        let thisClients, thisHistories;
        let thisProjects;
        let reports;
        let reportObject;
        let managers;
        let targetRows;
        let targetCliids;
        let targetClients;
        let monthRows, monthCliids, monthClients;
        let fromDate;
        let toDate;
        let currentClients;
        let rowsFlat;
        let resultObj;
        let todayClients;
        let startDate, endDate;
        let allSendHistories;
        let monthFromDate;
        let toDateStandard;
        let contractProjects;
        let contractProjectsCliids;
        let contractProjectsCopied;
        let monthProjects;
        let thisDateCopied;
        let totalProjects;
    
        // 시작 날짜와 종료 날짜를 생성합니다.
        startDate = new Date(Number(startYear), Number(startMonth) - 1, 1, 8, 0, 0);  // 요청 받은 시작 연도와 월을 기반으로 시작 날짜 생성
        endDate = new Date(Number(endYear), Number(endMonth) - 1, 1, 10, 0, 0);  // 요청 받은 종료 연도와 월을 기반으로 종료 날짜 생성
        endDate.setMonth(endDate.getMonth() + 1);  // 종료 월을 한 달 증가시킴으로써 해당 월의 마지막 날을 찾습니다.
        endDate.setDate(endDate.getDate() - 1);  // 종료 월의 마지막 날짜를 설정

        // MongoDB에서 계약 프로젝트를 조회합니다.
        contractProjects = await back.getProjectsByQuery({
          $and: [  // 조회 조건 설정: 계약의 첫 날짜가 startDate와 endDate 사이에 있는 프로젝트를 찾습니다.
            {
              "process.contract.first.date": { $gte: startDate }  // 계약 시작일이 startDate 이상인 프로젝트
            },
            {
              "process.contract.first.date": { $lte: endDate }  // 계약 시작일이 endDate 이하인 프로젝트
            },
          ]
        }, { selfMongo: selfCoreMongo });  // 메인 MongoDB 인스턴스 사용

        // 조회한 프로젝트의 cliid(클라이언트 ID)를 배열로 만듭니다.
        contractProjectsCliids = contractProjects.toNormal().map((p) => { return p.cliid });  // toNormal 메서드를 통해 클라이언트 ID 배열 생성

        // dailySales 컬렉션에서 지정된 날짜 범위에 해당하는 데이터를 조회합니다.
        rows = await back.mongoRead(collection, {
          $and: [  // 조회 조건: startDate 이상, endDate 이하인 데이터
            {
              date: { $gte: startDate }  // date가 startDate 이상인 데이터
            },
            {
              date: { $lte: endDate }  // date가 endDate 이하인 데이터
            },
          ]
        }, { selfMongo });  // 로컬 MongoDB 인스턴스 사용

        // 조회한 데이터들을 날짜순으로 내림차순 정렬합니다.
        rows.sort((a, b) => {
          return b.date.valueOf() - a.date.valueOf();  // 가장 최근 날짜가 앞으로 오도록 정렬
        });

        // 조회한 rows 데이터를 깊은 복사합니다.
        rowsCopy = equalJson(JSON.stringify(rows));  // equalJson은 JSON.parse와 JSON.stringify를 결합한 깊은 복사 유틸리티 메서드
        rowsFlat = rowsCopy.map(({ cliids }) => { return cliids }).flat();  // 클라이언트 ID 배열을 평탄화(flat)하여 배열 생성

        // 계약 프로젝트에서 가져온 클라이언트 ID와 조회된 데이터에서의 클라이언트 ID를 결합합니다.
        whereQuery = rowToCliids(rows).concat(contractProjectsCliids);  // rowToCliids는 rows에서 cliid를 추출하는 함수
        whereQuery = { $or: [ ...new Set(whereQuery) ].map((cliid) => { return { cliid } }) }  // 중복 제거 후 MongoDB의 $or 연산자로 변환

        // clientHistory 컬렉션에서 curation.analytics.send 필드에 startDate 이후로 발송된 데이터를 조회합니다.
        allSendHistories = await selfMongo.db(db).collection(historyCollection).find({
          "curation.analytics.send": {
            $elemMatch: {  // startDate 이후에 발송된 항목이 있는지 확인
              date: { $gte: startDate }  // 발송 날짜가 startDate 이상인 항목
            }
          }
        }).project({ manager: 1, "curation.analytics.send": 1, _id: 0 }).toArray();  // 필요한 필드만 조회
    
        if (whereQuery["$or"].length > 0) {
    
          // 클라이언트 데이터를 MongoDB에서 조회하여 배열로 반환합니다.
          thisClients = (await back.getClientsByQuery(whereQuery, { selfMongo: selfCoreMongo })).toNormal(); 
          // whereQuery에 해당하는 프로젝트 데이터를 조회하여 배열로 변환합니다.
          thisProjects = (await back.getProjectsByQuery(whereQuery, { selfMongo: selfCoreMongo })).toNormal(); 
          // clientHistory 컬렉션에서 cliid와 매니저 정보를 조회하여 반환합니다.
          thisHistories = await selfMongo.db(db).collection(historyCollection).find(whereQuery).project({ cliid: 1, manager: 1, _id: 0 }).toArray(); 
          // 계약 프로젝트 데이터를 복사하여 새로운 배열로 생성합니다.
          contractProjectsCopied = contractProjects.toNormal();

          // 백엔드에서 setMemberObj 메서드를 호출하여 매니저 정보를 가져옵니다.
          managers = await back.setMemberObj({ getMode: true, selfMongo: selfCoreMongo });
          // CX 역할을 가진 매니저만 필터링하여 배열로 변환한 후, 이름 목록을 가져옵니다.
          managers = managers.filter((member) => { return member.roles.includes("CX") }).map((member) => { return member.name });
          // 미지정 및 total을 매니저 목록에 추가합니다.
          managers.push("미지정");
          managers.push("total");

          // 보고서 데이터를 저장할 배열을 초기화합니다.
          reports = [];
          
          for (let row of rows) {
    
            // reportObject는 보고서 데이터를 저장하는 객체입니다.
            reportObject = {};

            // reportObject에 기준 날짜를 추가합니다.
            reportObject.standard = row.date;

            // 오늘 날짜 기준으로 클라이언트 데이터를 매핑하여 가져옵니다.
            todayClients = row.cliids.map(({ cliid }) => { 
              return thisClients.find((c) => { return c.cliid === cliid });
            });

            // todayClients에 포함된 각 클라이언트에 대해 히스토리와 프로젝트 데이터를 추가합니다.
            for (let client of todayClients) {
              client.history = thisHistories.find((h) => { return h.cliid === client.cliid });  // 클라이언트의 히스토리 추가
              client.project = thisProjects.find((p) => { return p.cliid === client.cliid });   // 클라이언트의 프로젝트 추가
              client.row = rowsFlat.find((c) => { return c.cliid === client.cliid });           // 플랫하게 변환된 rows에서 클라이언트 데이터 추가
            }

            // total 기준으로 클라이언트 데이터를 가져옵니다.
            targetRows = rowsCopy.filter((o) => { return o.date.valueOf() <= row.date.valueOf() });
            targetCliids = rowToCliids(targetRows);

            // total 기준으로 클라이언트에 대한 히스토리와 프로젝트 데이터를 추가합니다.
            targetClients = targetCliids.map((cliid) => { 
              return thisClients.find((c) => { return c.cliid === cliid });
            });
            for (let client of targetClients) {
              client.history = thisHistories.find((h) => { return h.cliid === client.cliid });
              client.project = thisProjects.find((p) => { return p.cliid === client.cliid });
              client.row = rowsFlat.find((c) => { return c.cliid === client.cliid });
            }

            // 해당 월의 시작 날짜와 끝 날짜를 계산합니다.
            fromDate = new Date(row.date.getFullYear(), row.date.getMonth(), 1, 8, 0, 0);
            monthFromDate = new Date(JSON.stringify(fromDate).slice(1, -1));
            toDate = new Date(row.date.getFullYear(), row.date.getMonth() + 1, 1);

            // 해당 월의 클라이언트 데이터를 필터링하여 가져옵니다.
            monthRows = rowsCopy.filter((o) => {
              return (o.date.valueOf() > fromDate.valueOf() && o.date.valueOf() < toDate.valueOf()) && (o.date.valueOf() <= row.date.valueOf());
            });

            // 월별 클라이언트 데이터에서 클라이언트 ID를 추출하고 클라이언트 정보를 매핑합니다.
            monthCliids = rowToCliids(monthRows);
            monthClients = monthCliids.map((cliid) => { return thisClients.find((c) => { return c.cliid === cliid }) });

            // 각 클라이언트의 히스토리와 프로젝트 데이터를 추가합니다.
            for (let client of monthClients) {
              client.history = thisHistories.find((h) => { return h.cliid === client.cliid });
              client.project = thisProjects.find((p) => { return p.cliid === client.cliid });
              client.row = rowsFlat.find((c) => { return c.cliid === client.cliid });
            }

            // toDateStandard는 해당 row의 날짜에 해당하는 시간까지 설정합니다.
            toDateStandard = new Date(JSON.stringify(row.date).slice(1, -1));
            toDateStandard.setHours(23);
            toDateStandard.setMinutes(59);
            toDateStandard.setSeconds(59);

            // 월별 계약 프로젝트를 필터링하여 데이터를 가져옵니다.
            monthProjects = contractProjectsCopied.filter((obj) => {
              return (obj.process.contract.first.date.valueOf() > fromDate.valueOf() && obj.process.contract.first.date.valueOf() < toDate.valueOf()) && (obj.process.contract.first.date.valueOf() <= toDateStandard.valueOf());
            });

            // 각 프로젝트에 대한 히스토리 데이터를 추가합니다.
            for (let project of monthProjects) {
              project.history = thisHistories.find((h) => { return h.cliid === project.cliid });
            }

            // 전체 기간에 해당하는 계약 프로젝트를 필터링하여 데이터를 가져옵니다.
            totalProjects = contractProjectsCopied.filter((obj) => {
              return (obj.process.contract.first.date.valueOf() > startDate.valueOf() && obj.process.contract.first.date.valueOf() < toDate.valueOf()) && (obj.process.contract.first.date.valueOf() <= toDateStandard.valueOf());
            });

            // 각 프로젝트에 대한 히스토리 데이터를 추가합니다.
            for (let project of totalProjects) {
              project.history = thisHistories.find((h) => { return h.cliid === project.cliid });
            }
    
            // day clients: 오늘 날짜 기준으로 클라이언트 데이터를 관리별로 분류합니다.
            reportObject.dayClients = [];
            for (let manager of managers) {
              if (manager === "total") {
                // 전체 클라이언트 수를 추가
                reportObject.dayClients.push({
                  manager,  // 관리자 이름
                  value: row.cliids.length,  // 오늘의 전체 클라이언트 수
                });
              } else if (manager === "미지정") {
                // 관리자가 지정되지 않은 클라이언트 수를 필터링하여 추가
                reportObject.dayClients.push({
                  manager,
                  value: todayClients.filter((c) => { return !managers.includes(c.history.manager); }).length,
                });
              } else {
                // 특정 관리자에 속한 클라이언트 수를 추가
                reportObject.dayClients.push({
                  manager,
                  value: todayClients.filter((c) => { return c.history.manager === manager; }).length,
                });
              }
            }

            // total clients: 전체 기간 동안의 클라이언트 데이터를 관리별로 분류합니다.
            reportObject.totalClients = [];
            for (let manager of managers) {
              if (manager === "total") {
                // 전체 클라이언트 수를 추가
                reportObject.totalClients.push({
                  manager,
                  value: targetCliids.length,  // 전체 클라이언트 수
                });
              } else if (manager === "미지정") {
                // 관리자가 지정되지 않은 클라이언트 수를 필터링하여 추가
                reportObject.totalClients.push({
                  manager,
                  value: targetClients.filter((c) => { return !managers.includes(c.history.manager); }).length,
                });
              } else {
                // 특정 관리자에 속한 클라이언트 수를 추가
                reportObject.totalClients.push({
                  manager,
                  value: targetClients.filter((c) => { return c.history.manager === manager; }).length,
                });
              }
            }

            // monthly clients: 월간 기준으로 클라이언트 데이터를 관리별로 분류합니다.
            reportObject.monthClients = [];
            for (let manager of managers) {
              if (manager === "total") {
                // 해당 월의 전체 클라이언트 수를 추가
                reportObject.monthClients.push({
                  manager,
                  value: monthCliids.length,  // 월간 전체 클라이언트 수
                });
              } else if (manager === "미지정") {
                // 관리자가 지정되지 않은 클라이언트 수를 필터링하여 추가
                reportObject.monthClients.push({
                  manager,
                  value: monthClients.filter((c) => { return !managers.includes(c.history.manager); }).length,
                });
              } else {
                // 특정 관리자에 속한 클라이언트 수를 추가
                reportObject.monthClients.push({
                  manager,
                  value: monthClients.filter((c) => { return c.history.manager === manager; }).length,
                });
              }
            }

            // current clients: 현재 진행 중인 클라이언트 데이터 필터링
            currentClients = targetClients.filter((client) => {
              // 응답 상태가 "응장"인 클라이언트만 필터링
              return client.requests.some(({ analytics }) => { return /^[응장]/gi.test(analytics.response.status); });
            });
            reportObject.currentClients = [];
            for (let manager of managers) {
              if (manager === "total") {
                // 전체 진행 중인 클라이언트 수 추가
                reportObject.currentClients.push({
                  manager,
                  value: currentClients.length,
                });
              } else if (manager === "미지정") {
                // 관리자가 지정되지 않은 진행 중인 클라이언트 수 추가
                reportObject.currentClients.push({
                  manager,
                  value: currentClients.filter((c) => { return !managers.includes(c.history.manager); }).length,
                });
              } else {
                // 특정 관리자에 속한 진행 중인 클라이언트 수 추가
                reportObject.currentClients.push({
                  manager,
                  value: currentClients.filter((c) => { return c.history.manager === manager; }).length,
                });
              }
            }

            // contract possible clients: 계약 가능성이 높은 클라이언트 데이터를 필터링
            reportObject.contractPossible = [];
            for (let manager of managers) {
              if (manager === "total") {
                // 계약 가능성이 높은 전체 클라이언트 수 추가
                reportObject.contractPossible.push({
                  manager,
                  value: currentClients.filter((c) => { return c.requests[0].analytics.response.possible === "높음"; }).length,
                });
              } else if (manager === "미지정") {
                // 관리자가 지정되지 않은 계약 가능성이 높은 클라이언트 수 추가
                reportObject.contractPossible.push({
                  manager,
                  value: currentClients.filter((c) => { return c.requests[0].analytics.response.possible === "높음"; })
                                      .filter((c) => { return !managers.includes(c.history.manager); }).length,
                });
              } else {
                // 특정 관리자에 속한 계약 가능성이 높은 클라이언트 수 추가
                reportObject.contractPossible.push({
                  manager,
                  value: currentClients.filter((c) => { return c.requests[0].analytics.response.possible === "높음"; })
                                      .filter((c) => { return c.history.manager === manager; }).length,
                });
              }
            }
            
            // total contracts: 전체 계약 데이터를 관리별로 분류합니다.
            reportObject.totalContracts = [];
            for (let manager of managers) {
              if (manager === "total") {
                // 전체 계약 수 추가
                reportObject.totalContracts.push({
                  manager,
                  value: totalProjects.length,  // 전체 계약 프로젝트 수
                });
              } else if (manager === "미지정") {
                // 관리자가 지정되지 않은 계약 프로젝트 수 추가
                reportObject.totalContracts.push({
                  manager,
                  value: totalProjects.filter((p) => { return !managers.includes(p.history.manager); }).length,
                });
              } else {
                // 특정 관리자에 속한 계약 프로젝트 수 추가
                reportObject.totalContracts.push({
                  manager,
                  value: totalProjects.filter((p) => { return p.history.manager === manager; }).length,
                });
              }
            }

            // month contracts: 월간 계약 데이터를 관리별로 분류합니다.
            reportObject.monthContracts = [];
            for (let manager of managers) {
              if (manager === "total") {
                // 해당 월의 전체 계약 수 추가
                reportObject.monthContracts.push({
                  manager,
                  value: monthProjects.length,  // 월간 계약 프로젝트 수
                });
              } else if (manager === "미지정") {
                // 관리자가 지정되지 않은 월간 계약 프로젝트 수 추가
                reportObject.monthContracts.push({
                  manager,
                  value: monthProjects.filter((p) => { return !managers.includes(p.history.manager); }).length,
                });
              } else {
                // 특정 관리자에 속한 월간 계약 프로젝트 수 추가
                reportObject.monthContracts.push({
                  manager,
                  value: monthProjects.filter((p) => { return p.history.manager === manager; }).length,
                });
              }
            }

            // day proposal: 일일 제안서 데이터를 관리별로 분류합니다.
            reportObject.dayProposals = [];
            for (let manager of managers) {
              if (manager === "total") {
                // 전체 일일 제안서 수 추가
                reportObject.dayProposals.push({
                  manager,
                  value: allSendHistories.map(({ curation }) => {
                    return curation.analytics.send
                      .filter((obj) => { return dateToString(obj.date) === dateToString(row.date); })
                      .flat().filter((obj) => { return obj.page === proposalKeywords; }).length;
                  }),
                });
              } else if (manager === "미지정") {
                // 관리자가 지정되지 않은 일일 제안서 수 추가
                reportObject.dayProposals.push({
                  manager,
                  value: allSendHistories.filter((c) => { return !managers.includes(c.manager); })
                    .map(({ curation }) => {
                      return curation.analytics.send
                        .filter((obj) => { return dateToString(obj.date) === dateToString(row.date); })
                        .flat().filter((obj) => { return obj.page === proposalKeywords; }).length;
                    }),
                });
              } else {
                // 특정 관리자에 속한 일일 제안서 수 추가
                reportObject.dayProposals.push({
                  manager,
                  value: allSendHistories.filter((c) => { return c.manager === manager; })
                    .map(({ curation }) => {
                      return curation.analytics.send
                        .filter((obj) => { return dateToString(obj.date) === dateToString(row.date); })
                        .flat().filter((obj) => { return obj.page === proposalKeywords; }).length;
                    }),
                });
              }
            }

            // month proposal: 월간 제안서 데이터를 관리별로 분류합니다.
            reportObject.monthProposals = [];
            for (let manager of managers) {
              if (manager === "total") {
                // 전체 월간 제안서 수 추가
                reportObject.monthProposals.push({
                  manager,
                  value: allSendHistories.map(({ curation }) => {
                    return curation.analytics.send
                      .filter((obj) => { return obj.date.valueOf() >= monthFromDate.valueOf() && obj.date.valueOf() <= toDateStandard.valueOf(); })
                      .flat().filter((obj) => { return obj.page === proposalKeywords; }).length;
                  }),
                });
              } else if (manager === "미지정") {
                // 관리자가 지정되지 않은 월간 제안서 수 추가
                reportObject.monthProposals.push({
                  manager,
                  value: allSendHistories.filter((c) => { return !managers.includes(c.manager); })
                    .map(({ curation }) => {
                      return curation.analytics.send
                        .filter((obj) => { return obj.date.valueOf() >= monthFromDate.valueOf() && obj.date.valueOf() <= toDateStandard.valueOf(); })
                        .flat().filter((obj) => { return obj.page === proposalKeywords; }).length;
                    }),
                });
              } else {
                // 특정 관리자에 속한 월간 제안서 수 추가
                reportObject.monthProposals.push({
                  manager,
                  value: allSendHistories.filter((c) => { return c.manager === manager; })
                    .map(({ curation }) => {
                      return curation.analytics.send
                        .filter((obj) => { return obj.date.valueOf() >= monthFromDate.valueOf() && obj.date.valueOf() <= toDateStandard.valueOf(); })
                        .flat().filter((obj) => { return obj.page === proposalKeywords; }).length;
                    }),
                });
              }
            }

            // total proposal: 전체 제안서 데이터를 관리별로 분류합니다.
            reportObject.totalProposals = [];
            for (let manager of managers) {
              if (manager === "total") {
                // 전체 제안서 수 추가
                reportObject.totalProposals.push({
                  manager,
                  value: allSendHistories.map(({ curation }) => {
                    return curation.analytics.send
                      .filter((obj) => { return obj.date.valueOf() >= startDate.valueOf() && obj.date.valueOf() <= toDateStandard.valueOf(); })
                      .flat().filter((obj) => { return obj.page === proposalKeywords; }).length;
                  }),
                });
              } else if (manager === "미지정") {
                // 관리자가 지정되지 않은 제안서 수 추가
                reportObject.totalProposals.push({
                  manager,
                  value: allSendHistories.filter((c) => { return !managers.includes(c.manager); })
                    .map(({ curation }) => {
                      return curation.analytics.send
                        .filter((obj) => { return obj.date.valueOf() >= startDate.valueOf() && obj.date.valueOf() <= toDateStandard.valueOf(); })
                        .flat().filter((obj) => { return obj.page === proposalKeywords; }).length;
                    }),
                });
              } else {
                // 특정 관리자에 속한 제안서 수 추가
                reportObject.totalProposals.push({
                  manager,
                  value: allSendHistories.filter((c) => { return c.manager === manager; })
                    .map(({ curation }) => {
                      return curation.analytics.send
                        .filter((obj) => { return obj.date.valueOf() >= startDate.valueOf() && obj.date.valueOf() <= toDateStandard.valueOf(); })
                        .flat().filter((obj) => { return obj.page === proposalKeywords; }).length;
                    }),
                });
              }
            }

            // 보고서에 최종 결과 추가
            reports.push(reportObject);

          }
    
          resultObj = { reports };
        } else {
          resultObj = { reports: [] };
        }
    
        res.send(JSON.stringify(resultObj));
    
      } catch (e) {
        // 에러가 발생하면 에러를 기록하고 클라이언트에 에러 메시지를 전송합니다.
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /updateContentsStatus
     * @description 콘텐츠 상태를 업데이트하거나 조회하는 라우터입니다. 'get'과 'update' 모드를 지원하며, 새로운 콘텐츠 상태를 생성하거나 기존 상태를 업데이트합니다.
     * @param {Object} req - 클라이언트 요청 객체로, 요청 본문에 mode, whereQuery, updateQuery가 포함됩니다.
     * @param {Object} res - 서버 응답 객체로, 처리 결과를 JSON 형식으로 반환합니다.
     */
    router.post([ "/updateContentsStatus" ], async function (req, res) {
      // 응답 헤더 설정: JSON 형식으로 응답하고 CORS를 허용
      res.set({
        "Content-Type": "application/json",  // 응답의 형식을 JSON으로 설정
        "Access-Control-Allow-Origin": "*",  // 모든 도메인에서의 요청을 허용
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",  // 허용되는 HTTP 메서드를 설정
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",  // 허용되는 헤더를 설정
      });

      try {
        // 요청 본문에 mode가 없으면 오류 발생
        if (req.body.mode === undefined) {
          throw new Error("invalid post");  // 잘못된 요청 처리
        }

        const selfMongo = instance.mongolocal;  // MongoDB 로컬 인스턴스 설정
        const { mode } = equalJson(req.body);  // 요청 본문의 데이터를 equalJson으로 처리하여 mode 추출
        const collection = "contentsStatus";  // 사용할 컬렉션 이름 설정
        let whereQuery, updateQuery;  // whereQuery: 조회 조건, updateQuery: 업데이트할 내용
        let rows;  // 데이터베이스에서 조회된 결과 저장
        let resultObj;  // 최종 결과를 저장할 객체
        let dummy;  // 초기 상태 생성 시 사용할 더미 객체
        let emptyObject;  // 비어 있는 객체 생성용

        // 더미 객체: 새로운 콘텐츠 상태 생성 시 기본값으로 사용
        dummy = {
          conid: "",  // 콘텐츠 ID
          pid: "",  // 프로젝트 ID
          complete: false,  // 콘텐츠 완료 여부
          date: new Date(),  // 생성 날짜
        };

        // 모드가 'get'일 경우: 콘텐츠 상태 조회
        if (mode === "get") {
          ({ whereQuery } = equalJson(req.body));  // 요청에서 whereQuery 추출
          rows = await back.mongoRead(collection, whereQuery, { selfMongo });  // 조건에 맞는 데이터를 조회
          resultObj = rows;  // 조회된 결과를 반환 객체에 저장

        // 모드가 'update'일 경우: 콘텐츠 상태 업데이트
        } else if (mode === "update") {
          ({ whereQuery, updateQuery } = equalJson(req.body));  // 요청에서 whereQuery와 updateQuery 추출

          // 조회된 데이터가 없으면 새로 생성
          rows = await back.mongoRead(collection, whereQuery, { selfMongo });
          if (rows.length === 0) {
            // 데이터가 없을 경우 빈 객체 생성 후 업데이트
            emptyObject = equalJson(JSON.stringify(dummy));  // 더미 객체를 깊은 복사하여 빈 객체 생성
            emptyObject.conid = updateQuery.conid;  // 업데이트할 콘텐츠 ID 설정
            await back.mongoCreate(collection, emptyObject, { selfMongo });  // 새로운 콘텐츠 상태를 생성
            await sleep(300);  // 데이터베이스 처리 대기
            await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo });  // 콘텐츠 상태 업데이트
          } else {
            // 데이터가 있을 경우 바로 업데이트
            await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo });
          }
          resultObj = { message: "done" };  // 완료 메시지 반환

        } else {
          throw new Error("invalid mode");  // 잘못된 모드일 경우 오류 처리
        }

        res.send(JSON.stringify(resultObj));  // 결과를 JSON으로 응답

      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });  // 오류 발생 시 로깅
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));  // 오류 메시지를 JSON으로 응답
      }
    });
    
    /**
     * @route POST /proposalGeneration
     * @description 지정된 디자이너의 프로젝트 제안서를 생성하여 반환하는 라우터입니다. 제안서 내 특정 디자이너의 설정을 기반으로 데이터를 생성합니다.
     * @param {Object} req - 클라이언트 요청 객체로, 요청 본문에 desid가 포함됩니다.
     * @param {Object} res - 서버 응답 객체로, 처리된 제안서를 JSON 형식으로 반환합니다.
     */
    router.post([ "/proposalGeneration" ], async function (req, res) {
      // 응답 헤더 설정: JSON 형식으로 응답하고 CORS를 허용
      res.set({
        "Content-Type": "application/json",  // 응답의 형식을 JSON으로 설정
        "Access-Control-Allow-Origin": "*",  // 모든 도메인에서의 요청을 허용
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",  // 허용되는 HTTP 메서드를 설정
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",  // 허용되는 헤더를 설정
      });

      try {
        // desid가 요청 본문에 없으면 오류 발생
        if (req.body.desid === undefined) {
          throw new Error("invalid post");  // 잘못된 요청 처리
        }

        // 요청 본문에서 desid를 추출하고 equalJson으로 처리
        const { desid } = equalJson(req.body);

        // MongoDB 인스턴스 및 컬렉션 설정
        const selfMongo = instance.mongo;
        const collection = "project";

        // MongoDB에서 프로젝트 조회: 디자이너 ID가 제안서에 포함된 프로젝트만 조회
        const projects = await back.mongoPick(collection, [ 
          { "proposal.detail": { $elemMatch: { desid } } },  // 제안서 세부정보에서 desid를 검색
          { proid: 1, desid: 1, proposal: 1 }  // 필요한 필드만 선택
        ], { selfMongo });

        let targetProposals;

        // 프로젝트를 제안서 날짜 기준으로 내림차순 정렬
        projects.sort((a, b) => { return b.proposal.date.valueOf() - a.proposal.date.valueOf() });

        // 해당 디자이너의 제안서 세부정보 필터링
        targetProposals = projects.map((p) => { return p.proposal.detail }).flat().filter((o) => { return o.desid === desid });

        // 제안서의 pictureSettings를 추출하고 JSON 문자열로 변환 후 중복 제거
        targetProposals = targetProposals.map(({ pictureSettings }) => { return JSON.stringify(pictureSettings) });
        targetProposals = [ ...new Set(targetProposals) ].map((str) => { return equalJson(str) });

        // 제안서 결과를 JSON 형식으로 응답
        res.send(JSON.stringify(targetProposals));

      } catch (e) {
        // 에러 발생 시 로깅하고 클라이언트에 오류 메시지 응답
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /frontMemberParsing
     * @description 클라이언트에서 전달된 데이터를 기반으로 특정 멤버의 접속 기록을 저장하는 라우터입니다. 모드가 "store"일 경우, 전달받은 IP를 기준으로 멤버 데이터를 검색하여 저장합니다.
     * @param {Object} req - 클라이언트 요청 객체로, id, ip, href, mode가 포함됩니다.
     * @param {Object} res - 서버 응답 객체로, 저장된 결과를 JSON 형식으로 반환합니다.
     */
    router.post([ "/frontMemberParsing" ], async function (req, res) {
      // 응답 헤더 설정: JSON 형식으로 응답하고 CORS를 허용
      res.set({
        "Content-Type": "application/json", // 응답 형식으로 JSON 설정
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 요청을 허용
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드를 설정
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 헤더 설정
      });

      try {
        // 필수 데이터가 없을 경우 오류를 발생시킴
        if (req.body.id === undefined || req.body.ip === undefined || req.body.href === undefined || req.body.mode === undefined) {
          throw new Error("invalid input => " + JSON.stringify(req.body, null, 2));  // 누락된 입력값에 대한 오류 처리
        }

        // 요청 데이터에서 필요한 값들을 equalJson을 통해 깊은 복사 및 파싱
        const { id, ip, href, mode } = equalJson(req.body);

        // MongoDB와 관련된 설정
        const selfMongo = instance.mongolocal;  // 로컬 MongoDB 인스턴스
        const collection = "frontMemberHistory";  // 데이터를 저장할 컬렉션
        const members = instance.members;  // 서버에 저장된 멤버 리스트
        let json;  // 저장할 JSON 객체
        let targetMember;  // IP로 찾을 멤버 정보
        let memberId, memberName;  // 멤버 ID와 이름

        // 모드가 "store"인 경우에만 처리
        if (mode === "store") {

          // 전달받은 IP로 멤버를 찾아냄
          targetMember = members.find((o) => { return o.ip.includes(ip) });

          // 멤버가 존재하는 경우, 접속 기록을 저장할 데이터를 구성
          if (targetMember !== undefined && targetMember !== null) {
            memberId = targetMember.id;  // 멤버 ID
            memberName = targetMember.name;  // 멤버 이름

            // 저장할 JSON 객체를 구성
            json = {
              date: new Date(),  // 현재 날짜 및 시간
              member: {
                memid: memberId,  // 멤버 ID
                name: memberName,  // 멤버 이름
              },
              data: {
                session: id,  // 세션 ID
                ip: ip,  // 접속한 IP 주소
                href: href,  // 접속한 URL
              },
            };

            // MongoDB에 접속 기록을 저장
            await back.mongoCreate(collection, json, { selfMongo });
          } else {
            // 멤버를 찾지 못한 경우 null 데이터를 반환
            json = { data: null };
          }

          // 결과 데이터를 JSON 형식으로 클라이언트에 반환
          res.send(JSON.stringify(json));

        } else {
          // 모드가 "store"가 아닌 경우 오류 발생
          throw new Error("invalid mode");
        }

      } catch (e) {
        // 오류 발생 시 로깅하고 클라이언트에 오류 메시지 응답
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /blackButtonsClick
     * @description 고객이 '상담' 또는 '추천' 버튼을 클릭할 때 해당 정보를 기록하고 적절한 알림을 전송하는 라우터입니다. '추천' 모드 선택 시 일정 시간 후 자동 추천서를 생성하여 전송합니다.
     * @param {Object} req - 클라이언트 요청 객체로, cliid(고객 ID), name(고객 이름), mode(모드)가 포함됩니다.
     * @param {Object} res - 서버 응답 객체로, 처리된 결과를 JSON 형식으로 반환합니다.
     */
    router.post([ "/blackButtonsClick" ], async function (req, res) {
      // 응답 헤더 설정: JSON 형식으로 응답하고 CORS를 허용
      res.set({
        "Content-Type": "application/json", // 응답 형식을 JSON으로 설정
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 요청을 허용
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드 설정
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 헤더 설정
      });

      try {
        // 필수 파라미터가 없을 경우 오류 발생
        if (req.body.cliid === undefined || req.body.name === undefined || req.body.mode === undefined) {
          throw new Error("invalid input => " + JSON.stringify(req.body, null, 2));  // 누락된 입력값에 대한 오류 처리
        }

        // 요청에서 받은 데이터를 equalJson을 사용하여 깊은 복사 및 파싱
        const { cliid, name, mode } = equalJson(req.body);
        
        // MongoDB 인스턴스 설정
        const selfCoreMongo = instance.mongo;  // 메인 MongoDB 인스턴스
        const selfMongo = instance.mongolocal;  // 로컬 MongoDB 인스턴스
        const toNormal = true;  // 결과를 일반 객체로 변환하는 플래그
        const collection = "blackButtonsClick";  // 기록을 저장할 컬렉션
        const delta = Math.floor((1 + Math.random()) * 60 * 60 * 1000) - (10 * 60 * 1000);  // 최대 2시간 내로 자동 추천서 생성 시간을 설정
        const generalPort = 3000;  // 일반 포트 설정
        let proid, rows;  // 프로젝트 ID와 결과 데이터를 담을 변수
        let targetProposal;  // 타겟 제안서 객체

        // 상담 모드일 경우 처리
        if (mode === "consulting") {
          // 상담 요청에 대한 메시지를 전송
          await messageSend({ text: name + " 고객님(" + cliid + ")이 상담부터 원한다고 선택하셨어요!", channel: "#404_curation", voice: true });

          // MongoDB에 상담 요청을 기록
          await back.mongoCreate(collection, {
            cliid,
            name,
            date: new Date(),
            mode,
          }, { selfMongo });
        } else {
          // 추천 모드일 경우 처리
          await messageSend({ text: name + " 고객님(" + cliid + ")이 추천부터 원한다고 선택하셨어요! 2시간 이내로(" + String(Math.floor((delta / 1000) / 60)) + "분 뒤에) 자동 추천서가 발송될 예정입니다!", channel: "#404_curation", voice: true });

          // 일정 시간이 지난 후 자동 추천서 생성 및 전송
          setTimeout(async () => {
            try {
              // 고객의 프로젝트 목록을 가져옴
              rows = await back.getProjectsByQuery({ cliid }, { selfMongo: selfCoreMongo, toNormal });

              // 프로젝트가 없으면 10분 후 다시 시도
              while (rows.length === 0) {
                await sleep(10 * 60 * 1000);
                rows = await back.getProjectsByQuery({ cliid }, { selfMongo: selfCoreMongo, toNormal });
              }

              if (rows.length === 0) {
                throw new Error("cannot find proposal");  // 프로젝트가 없으면 오류 발생
              }

              // 최신 제안서를 가져옴
              rows.sort((a, b) => { return b.proposal.date.valueOf() - a.proposal.date.valueOf() });
              [targetProposal] = rows;
              proid = targetProposal.proid;

              // 자동 추천서 생성 요청
              await requestSystem("https://" + address.officeinfo.host + ":" + String(3002) + "/createProposalDocument", { instant: true, proid }, { headers: { "Content-Type": "application/json", "origin": "https://" + address.frontinfo.host } });

              // 추천서 전송 알림 전송
              await messageSend({ text: name + " 고객님(" + cliid + ")께 자동 추천서를 전송하였어요!", channel: "#404_curation", voice: true });
              await messageSend({ text: name + " 고객님(" + cliid + ")께 자동 추천서를 전송하였어요!", channel: "#403_proposal", voice: false });

              // MongoDB에 추천서 전송 기록을 저장
              await back.mongoCreate(collection, {
                cliid,
                name,
                date: new Date(),
                mode,
              }, { selfMongo });

            } catch (e) {
              console.log(e);

              // 오류가 발생하면 상담 모드로 처리
              await messageSend({ text: name + " 고객님(" + cliid + ")이 상담부터 원한다고 선택하셨어요!", channel: "#404_curation", voice: true });

              await back.mongoCreate(collection, {
                cliid,
                name,
                date: new Date(),
                mode: "consulting",
              }, { selfMongo });

              logger.error(e, req).catch((e) => { console.log(e); });
            }
          }, delta);
        }

        // 응답 데이터를 JSON 형식으로 반환
        res.send(JSON.stringify({ message: "done" }));

      } catch (e) {
        // 오류 발생 시 로깅하고 클라이언트에 오류 메시지 응답
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /justClientEvaluation
     * @description 고객 평가 관련 요청을 처리하는 라우터입니다. 모드에 따라 평가 요청을 보내거나 평가 데이터를 조회 및 저장합니다.
     * @param {Object} req - 클라이언트 요청 객체로, 평가 요청의 모드와 관련된 데이터가 포함됩니다.
     * @param {Object} res - 서버 응답 객체로, 처리된 결과를 JSON 형식으로 반환합니다.
     */
    router.post([ "/justClientEvaluation" ], async function (req, res) {
      // 응답 헤더 설정: JSON 형식으로 응답하고 CORS를 허용
      res.set({
        "Content-Type": "application/json", // 응답 형식을 JSON으로 설정
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 요청을 허용
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드 설정
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 헤더 설정
      });

      try {
        // 요청 모드가 없는 경우 오류 처리
        if (req.body.mode === undefined) {
          throw new Error("invalid input => " + JSON.stringify(req.body, null, 2)); // 잘못된 요청 오류
        }

        // 요청 데이터를 equalJson을 사용해 깊은 복사 및 파싱
        const { cliid, proid, mode } = equalJson(req.body);
        const selfCoreMongo = instance.mongo;  // 메인 MongoDB 인스턴스
        const selfMongo = instance.mongo;  // 로컬 MongoDB 인스턴스
        const selfOfficeMongo = instance.mongo;  // 오피스 MongoDB 인스턴스
        const collection = "clientEvaluationSendHistory";  // 평가 요청 기록 컬렉션
        const collection2 = "clientEvaluation";  // 평가 데이터 컬렉션
        let thisClient, method, name, phone, projects, rows, target, json; // 처리에 필요한 변수들 선언

        // 'send' 모드: 고객에게 평가 요청을 전송
        if (mode === "send") {
          // 고객 데이터를 조회
          [ thisClient ] = await back.mongoPick("client", [ { cliid }, { cliid: 1, name: 1, phone: 1 } ], { selfMongo: selfCoreMongo });
          ({ name, phone } = thisClient);

          // 해당 프로젝트 정보를 가져옴
          projects = await back.mongoRead("project", { proid }, { selfMongo: selfCoreMongo });
          // 진행 또는 완료된 프로젝트만 필터링
          projects = projects.filter((p) => { return p.desid !== "" }).filter((p) => {
            return (/진행/gi.test(p.process.status) || /완료/gi.test(p.process.status));
          });

          method = "justClientEvaluation";  // 메시지 발송 메서드 정의

          // 프로젝트가 존재할 경우 평가 요청을 전송
          if (projects.length > 0) {
            await kakao.sendTalk(method, name, phone, {
              client: name,
              host: address.frontinfo.host,
              path: "evaluation",
              proid
            });

            // 웹 채널에 알림 메시지 전송
            await messageSend({
              text: name + " 고객님께 서비스 평가 요청을 보냈어요!",
              channel: "#200_web",
              voice: false,
            });

            // 기존 기록이 있는지 조회하고 없으면 새로 생성, 있으면 업데이트
            rows = await back.mongoRead(collection, { proid }, { selfMongo });
            if (rows.length === 0) {
              json = {
                proid,
                cliid,
                date: new Date(),
                send: [ { date: new Date() } ],
              };
              await back.mongoCreate(collection, json, { selfMongo });
            } else {
              [ target ] = rows;
              target.send.unshift({ date: new Date() });
              target.date = new Date();
              json = objectDeepCopy(target);  // 기록을 깊은 복사한 후 삭제하고 새로 생성
              await back.mongoDelete(collection, { proid }, { selfMongo });
              await back.mongoCreate(collection, json, { selfMongo });
            }
            res.send(JSON.stringify({ message: "success" }));  // 성공 메시지 반환
          } else {
            res.send(JSON.stringify({ message: "fail" }));  // 프로젝트가 없으면 실패 메시지 반환
          }

        // 'list' 또는 'get' 모드: 특정 프로젝트의 평가 요청 내역을 조회
        } else if (mode === "list" || mode === "get") {
          rows = await back.mongoRead(collection, { proid }, { selfMongo });
          if (rows.length === 0) {
            res.send(JSON.stringify({ data: null }));  // 기록이 없으면 null 반환
          } else {
            res.send(JSON.stringify({ data: rows[0] }));  // 조회된 데이터를 반환
          }

        // 'all' 모드: 모든 평가 요청 내역을 조회
        } else if (mode === "all") {
          rows = await back.mongoRead(collection, {}, { selfMongo });
          res.send(JSON.stringify(rows));  // 모든 기록을 반환

        // 'store' 모드: 평가 요청 내역을 저장
        } else if (mode === "store") {
          [ thisClient ] = await back.mongoPick("client", [ { cliid }, { cliid: 1, name: 1, phone: 1 } ], { selfMongo: selfCoreMongo });
          ({ name, phone } = thisClient);

          projects = await back.mongoRead("project", { proid }, { selfMongo: selfCoreMongo });
          projects = projects.filter((p) => { return p.desid !== "" }).filter((p) => {
            return (/진행/gi.test(p.process.status) || /완료/gi.test(p.process.status));
          });

          method = "justClientEvaluation";

          if (projects.length > 0) {
            rows = await back.mongoRead(collection, { proid }, { selfMongo });
            if (rows.length === 0) {
              json = {
                proid,
                cliid,
                date: new Date(),
                send: [ { date: new Date() } ],
              };
              await back.mongoCreate(collection, json, { selfMongo });
            } else {
              [ target ] = rows;
              target.send.unshift({ date: new Date() });
              target.date = new Date();
              json = objectDeepCopy(target);
              await back.mongoDelete(collection, { proid }, { selfMongo });
              await back.mongoCreate(collection, json, { selfMongo });
            }
            res.send(JSON.stringify({ message: "success" }));
          } else {
            res.send(JSON.stringify({ message: "fail" }));
          }

        // 'result' 모드: 특정 프로젝트의 평가 결과를 조회
        } else if (mode === "result") {
          rows = await back.mongoRead(collection2, { proid }, { selfMongo: selfOfficeMongo });
          res.send(JSON.stringify({ data: rows.find((r) => { return r.proid === proid }) ? rows.find((r) => { return r.proid === proid }) : null }));

        // 'resultAll' 모드: 모든 프로젝트의 평가 결과를 조회
        } else if (mode === "resultAll") {
          rows = await back.mongoRead(collection2, {}, { selfMongo: selfOfficeMongo });
          res.send(JSON.stringify(rows));

        } else {
          throw new Error("invalid mode");  // 유효하지 않은 모드 처리
        }

      } catch (e) {
        // 오류 발생 시 로깅하고 클라이언트에 오류 메시지 응답
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /cashReceipt
     * @description 현금 영수증 데이터를 저장하는 라우터입니다.
     * @param {object} req - 클라이언트 요청 객체. 요청 바디에 json 필드가 포함되어야 합니다.
     * @param {object} res - 서버 응답 객체.
     */
    router.post([ "/cashReceipt" ], async function (req, res) {
      // 응답 헤더 설정: JSON 형식 응답, CORS 허용
      res.set({
        "Content-Type": "application/json", // 응답 데이터 형식을 JSON으로 설정
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서 접근 허용
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용할 HTTP 메서드 설정
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용할 요청 헤더 설정
      });

      try {
        // 필수 데이터(json)가 요청에 없으면 오류 처리
        if (req.body.json === undefined) {
          throw new Error("must be json"); // 오류 발생 시 메시지 출력
        }

        // 요청 바디에서 JSON 데이터 추출 및 equalJson 메서드로 안전하게 파싱
        const json = equalJson(req.body.json);

        // 현금 영수증 데이터를 저장할 MongoDB 컬렉션명 설정
        const collection = "cashReceipt";

        // MongoDB 인스턴스 가져오기 (로컬 데이터베이스 사용)
        const selfMongo = instance.mongolocal;

        // 현금 영수증 데이터를 저장할 배열 초기화
        let rows = [];

        // cashOut(출금) 데이터가 있으면 처리
        if (json.cashOut !== undefined) {
          const { cashOut: cashOut_raw } = json;
          
          // cashOut 배열 내의 데이터를 rows에 추가
          for (let arr of cashOut_raw) {
            for (let obj of arr) {
              rows.push(obj); // 각 객체를 rows 배열에 삽입
            }
          }
        
        // cashIn(입금) 데이터가 있으면 처리
        } else if (json.cashIn !== undefined) {
          const { cashIn: cashIn_raw } = json;

          // cashIn 배열 내의 데이터를 rows에 추가
          for (let arr of cashIn_raw) {
            for (let obj of arr) {
              rows.push(obj); // 각 객체를 rows 배열에 삽입
            }
          }
        }

        // 청구서를 생성하는 메서드 호출, MongoDB에 현금 영수증 데이터를 저장
        bill.createBill(collection, rows, { selfMongo: selfMongo }).catch((err) => {
          console.log(err); // 오류 발생 시 로그에 출력
        });

        // 성공적으로 처리된 경우 응답으로 "OK" 메시지 반환
        res.send(JSON.stringify({ message: "OK" }));

      } catch (e) {
        // 오류 발생 시 로그를 기록하고, 클라이언트에 오류 메시지 응답
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /createStylingContract
     * @description 스타일링 계약서를 생성하는 라우터입니다. 프로젝트 ID에 따라 새로운 스타일링 계약서를 생성하고 고객에게 전송합니다.
     * @param {Object} req - 클라이언트 요청 객체로, 요청 본문에 proid(프로젝트 ID), contractName(계약서에 표시할 이름), contractAddress(계약서에 표시할 주소)가 포함됩니다.
     * @param {Object} res - 서버 응답 객체로, 처리 결과를 JSON 형식으로 반환합니다.
     */
    router.post([ "/createStylingContract" ], async function (req, res) {
      
      // 응답 헤더 설정: JSON 형식으로 응답하고 CORS를 허용합니다.
      res.set({
        "Content-Type": "application/json",  // 응답 Content-Type을 JSON으로 설정
        "Access-Control-Allow-Origin": "*",  // 모든 도메인에서의 요청을 허용
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",  // 허용되는 HTTP 메서드를 설정
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",  // 허용되는 헤더를 설정
      });

      try {
        // 요청 본문에 proid, contractName, contractAddress가 없으면 오류 발생
        if (req.body.proid === undefined || req.body.contractName === undefined || req.body.contractAddress === undefined) {
          throw new Error("invalid post");  // 필수 값이 없는 경우 잘못된 요청 처리
        }

        // 요청 본문에서 proid, contractName, contractAddress 값을 추출
        const { proid, contractName, contractAddress } = req.body;

        // MongoDB에서 해당 proid로 스타일링 계약 데이터를 조회
        const rows = await back.mongoRead("stylingForm", { proid }, { selfMongo: instance.mongolocal });
        // 조회된 데이터가 없는 경우 새로운 계약서를 생성
        if (rows.length === 0) {
          const selfMongo = instance.mongo;
          const { officeinfo: { widsign: { id, key, endPoint } } } = address;  // Widsign API 정보를 불러옴
          const title = "2024디자인계약서_000고객님_주홈리에종_YYMMDD";  // 계약서 제목 설정
          const project = await back.getProjectById(proid, { selfMongo });  // 프로젝트 정보를 가져옴
          const client = await back.getClientById(project.cliid, { selfMongo });  // 클라이언트 정보를 가져옴
          const designer = await back.getDesignerById(project.desid, { selfMongo });  // 디자이너 정보를 가져옴
          const today = new Date();  // 현재 날짜를 today로 설정
          let url, requestNumber, proposalDate;
          let widsignRes, token, target, targetFormId, safeNum;
          let titleName, titleAddress, formTitle;
          let request, analytics;
          let tempArr;
          let map;
          let data;
          let todayYear, todayMonth ,todayDate;
          let delta;
    
          // 현재 연도를 문자열로 변환하여 저장
          todayYear = String(today.getFullYear());
          // 현재 월을 문자열로 변환하여 저장 (월은 0부터 시작하므로 1을 더함)
          todayMonth = String(today.getMonth() + 1);
          // 현재 날짜를 문자열로 변환하여 저장
          todayDate = String(today.getDate());

          // 프로젝트 제안서의 날짜를 가져와서 Unix 시간 값으로 변환
          proposalDate = project.proposal.date.valueOf();

          // 요청 배열에서 제안서 날짜와 일치하거나 더 이전의 요청을 찾기 위한 변수 초기화
          requestNumber = 0;
          // 클라이언트의 요청 배열을 순회하면서 해당 요청의 타임라인이 제안서 날짜보다 작거나 같은 경우 찾음
          for (let i = 0; i < client.requests.length; i++) {
            if (client.requests[i].request.timeline.valueOf() <= proposalDate) {
              // 해당 요청의 인덱스를 requestNumber에 저장하고 반복문을 종료
              requestNumber = i;
              break;
            }
          }

          // 클라이언트의 요청 배열에서 찾은 인덱스(requestNumber)에 해당하는 요청과 분석 데이터를 구조 분해 할당으로 추출
          ({ request, analytics } = client.toNormal().requests[requestNumber]);

          // 외부 API에 액세스 토큰을 요청하는 API 호출, method는 GET, 헤더에 API ID와 키를 포함
          widsignRes = await requestSystem(endPoint + "/v2/token", {}, { method: "get", headers: { "x-api-id": id, "x-api-key": key } });

          if (widsignRes.data.result_code !== 200) {
            throw new Error("access token error");
          } else {

            token = widsignRes.data.access_token;
            num = 1;
            safeNum = 0;
            do {
              // 계약서 양식 목록을 검색해서 제목이 일치하는 양식을 찾음
              widsignRes = await requestSystem(endPoint + "/v2/form", { page: num, page_size: 30, title }, { method: "get", headers: { "x-api-key": key, "x-access-token": token } });
              target = widsignRes.data.result.filter((obj) => { return obj.title === title });
              num++;
              safeNum++;
              if (safeNum > 1000) {
                throw new Error("title name error");  // 타이틀을 찾을 수 없는 경우 오류 발생
              }
            } while (target.length === 0);
    
            // 양식의 ID를 추출
            [ { id: targetFormId } ] = target;
    
            // 계약서에 표시할 이름을 설정
            titleName = client.name;
            if (contractName.trim() !== "") {
              titleName = contractName;
            }
    
            // 계약서에 표시할 주소를 설정
            titleAddress = request.space.address;
            if (contractAddress.trim() !== "") {
              titleAddress = contractAddress;
            }
    
            // 오늘 날짜를 "YYMMDD" 형식으로 변환하여 계약서 제목을 생성
            tempArr = dateToString(today).split('-');
            formTitle = "2024디자인계약서_" + titleName + "고객님_주홈리에종_";
            formTitle = formTitle + tempArr[0].slice(2) + tempArr[1] + tempArr[2];
    
            // 계약서에 필요한 필드들을 설정
            map = [
              { id: "66d16860fbe5f88a937b7968", value: todayYear },  // 연도 필드
              { id: "66d16860fbe5f88a937b7969", value: todayMonth },  // 월 필드
              { id: "66d16860fbe5f88a937b796a", value: todayDate },  // 일 필드
              { id: "66d16860fbe5f88a937b796b", value: titleName === '' ? '-' : titleName },  // 계약서에 표시할 고객 이름
              { id: "66d16860fbe5f88a937b796c", value: client.phone === '' ? '-' : client.phone },  // 고객의 전화번호
              { id: "66d16860fbe5f88a937b796d", value: request.family === '' ? "알 수 없음" : request.family },  // 가족 정보
              { id: "66d16860fbe5f88a937b796e", value: titleAddress === '' ? '-' : titleAddress },  // 계약서에 표시할 주소
              { id: "66d16860fbe5f88a937b796f", value: request.budget + " (디자이너 논의 및 조정)" },  // 예산 정보
              { id: "66d16860fbe5f88a937b7970", value: request.space.contract === '' ? '-' : request.space.contract },  // 계약 정보
              { id: "66d16860fbe5f88a937b7971", value: "방 " + String(request.space.spec.room) + "개 / 화장실 " + String(request.space.spec.bathroom) + "개" },  // 방/화장실 수
              { id: "66d16860fbe5f88a937b7972", value: String(request.space.pyeong) },  // 평수
              { id: "66d16860fbe5f88a937b7973", value: (/없/gi.test(dateToString(analytics.date.space.precheck)) ? '-' : dateToString(analytics.date.space.precheck)) },  // 사전 점검 날짜
              { id: "66d16860fbe5f88a937b7974", value: (/없/gi.test(dateToString(analytics.date.space.empty)) ? '-' : dateToString(analytics.date.space.empty)) },  // 공간 비우기 날짜
              { id: "66d16860fbe5f88a937b7975", value: (/없/gi.test(dateToString(request.space.resident.expected)) ? '-' : dateToString(request.space.resident.expected)) },  // 예상 입주 날짜
            ];
    
            map.push({ id: "66d16860fbe5f88a937b7976", value: serviceParsing(project.service) });  // 서비스 항목 추가
            map.push({ id: "66d16860fbe5f88a937b7977", value: designer.designer });  // 디자이너 정보 추가
    
            // 계약서의 날짜 정보
            map.push({ id: "66d16860fbe5f88a937b7978", value: todayYear });
            map.push({ id: "66d16860fbe5f88a937b7979", value: todayMonth });
            map.push({ id: "66d16860fbe5f88a937b797b", value: todayDate });
    
            map.push({ id: "66d16860fbe5f88a937b797a", value: String(project.process.contract.form.date.from.getFullYear()) });
            map.push({ id: "66d16860fbe5f88a937b797c", value: String(project.process.contract.form.date.from.getMonth() + 1) });
            map.push({ id: "66d16860fbe5f88a937b797d", value: String(project.process.contract.form.date.from.getDate()) });
    
            map.push({ id: "66d16860fbe5f88a937b797e", value: String(project.process.contract.form.date.to.getFullYear()) });
            map.push({ id: "66d16860fbe5f88a937b797f", value: String(project.process.contract.form.date.to.getMonth() + 1) });
            map.push({ id: "66d16860fbe5f88a937b7980", value: String(project.process.contract.form.date.to.getDate()) });
    
            // 계약 기간을 계산하여 필드에 추가
            delta = (((((project.process.contract.form.date.to.valueOf() - project.process.contract.form.date.from.valueOf()) / 1000) / 60) / 60) / 24) / 30;
            map.push({ id: "66d16860fbe5f88a937b7981", value: String(Math.round(delta * 10) / 10) });
    
            // 소비자 금액 계산
            map.push({ id: "66d16860fbe5f88a937b7982", value: autoComma(project.process.contract.remain.calculation.amount.consumer) === '' ? '-' : autoComma(project.process.contract.remain.calculation.amount.consumer) });
    
            // 계약 담당자 정보
            map.push({ id: "66d16860fbe5f88a937b7983", value: "박헌성" });
            map.push({ id: "66d16860fbe5f88a937b7984", value: "02-2039-2252" });
            map.push({ id: "66d16860fbe5f88a937b7985", value: "help@home-liaison.com" });
    
            // 계약서 전송일 관련 정보
            map.push({ id: "66d16860fbe5f88a937b7987", value: todayYear });
            map.push({ id: "66d16860fbe5f88a937b7988", value: todayMonth });
            map.push({ id: "66d16860fbe5f88a937b7989", value: todayDate });
    
            // 계약서에 표시할 추가 필드들
            map.push({ id: "66d16860fbe5f88a937b798a", value: titleName === '' ? '-' : titleName });
    
            map.push({ id: "66d16860fbe5f88a937b798c", value: titleName === '' ? '-' : titleName });
    
            // 계약서의 시작 날짜
            map.push({ id: "66d16860fbe5f88a937b798d", value: String(project.process.contract.form.date.from.getFullYear()) });
            map.push({ id: "66d16860fbe5f88a937b798f", value: String(project.process.contract.form.date.from.getMonth() + 1) });
            map.push({ id: "66d16860fbe5f88a937b7990", value: String(project.process.contract.form.date.from.getDate()) });
    
            // 계약서의 종료 날짜
            map.push({ id: "66d16860fbe5f88a937b798e", value: String(project.process.contract.form.date.to.getFullYear()) });
            map.push({ id: "66d16860fbe5f88a937b7992", value: String(project.process.contract.form.date.to.getMonth() + 1) });
            map.push({ id: "66d16860fbe5f88a937b7991", value: String(project.process.contract.form.date.to.getDate()) });
    
            // 소비자 금액 추가
            map.push({ id: "66d16860fbe5f88a937b7993", value: autoComma(project.process.contract.remain.calculation.amount.consumer) === '' ? '-' : autoComma(project.process.contract.remain.calculation.amount.consumer) });
    
            map.push({ id: "66d16860fbe5f88a937b7997", value: todayYear });
            map.push({ id: "66d16860fbe5f88a937b7998", value: todayMonth });
            map.push({ id: "66d16860fbe5f88a937b7999", value: todayDate });
    
            // 주소 및 이름 정보 추가
            map.push({ id: "66d16860fbe5f88a937b7994", value: titleAddress === '' ? '-' : titleAddress });
            map.push({ id: "66d16860fbe5f88a937b7995", value: titleName === '' ? '-' : titleName });
    
            // 클라이언트에게 전송할 데이터 구성
            data = {
              form_id: targetFormId,
              title: formTitle,
              send_type: "SAMETIME",
              auth_phone: "N",
              mail_title: "안녕하세요, " + client.name + " 고객님! 홈리에종입니다. 홈스타일링 계약서 보내드립니다.",
              receiver_list: [
                {
                  name: client.name,
                  email: client.email,
                  mobile: client.phone.replace(/\-/gi, '')
                }
              ],
              items: map
            }
    
            // 계약서를 전송
            widsignRes = await requestSystem(endPoint + "/v2/form/send", data, { headers: { "x-api-key": key, "x-access-token": token, "Content-Type": "application/json" } });
    
            // 계약서 관련 정보를 MongoDB에 저장
            await bill.createBill("stylingForm", [ {
              name: widsignRes.data.result[0].doc_name,
              id: widsignRes.data.result[0].receiver_meta_id,
              time: new Date(),
              requestNumber: requestNumber,
              cliid: client.cliid,
              proid: project.proid
            } ], { selfMongo: instance.mongolocal });
    
            // 고객에게 알림톡을 전송
            await kakao.sendTalk("stylingForm", client.name, client.phone, { client: client.name });
            messageSend({ text: client.name + " 계약서를 작성하고 알림톡을 전송했어요!", channel: "#400_customer", voice: true }).catch((err) => {
              console.log(err);
            });
    
          }
    
          res.send(JSON.stringify({ message: "OK" }));
        } else {
          // 스타일링 계약서가 이미 존재할 경우 처리하지 않음
          await messageSend({ text: "프로젝트 " + proid + "의 스타일링 계약서는 이미 만들어졌기에, 중복해서 만들지 않았습니다!", channel: "#400_customer", voice: true });
          res.send(JSON.stringify({ message: "ERROR" }));
        }
      } catch (e) {
        // 오류 발생 시 로그 기록 및 에러 메시지 반환
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ message: "ERROR" }));
      }
    });
    
    /**
     * @route POST /removeStylingContract
     * @description 스타일링 계약을 삭제하는 라우터입니다. 지정된 프로젝트 ID에 해당하는 모든 스타일링 계약 데이터를 제거합니다.
     * @param {Object} req - 클라이언트 요청 객체로, 요청 본문에는 proid(프로젝트 ID)가 포함됩니다.
     * @param {Object} res - 서버 응답 객체로, 처리 결과를 JSON 형식으로 반환합니다.
     */
    router.post([ "/removeStylingContract" ], async function (req, res) {
      
      // 응답 헤더 설정: JSON 형식으로 응답하고, CORS를 허용합니다.
      res.set({
        "Content-Type": "application/json",  // 응답 Content-Type을 JSON으로 설정
        "Access-Control-Allow-Origin": "*",  // 모든 도메인에서의 요청을 허용
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",  // 허용되는 HTTP 메서드를 설정
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",  // 허용되는 헤더를 설정
      });

      try {
        // 요청 본문에 proid(프로젝트 ID)가 없는 경우 오류 발생
        if (req.body.proid === undefined) {
          throw new Error("invalid post");  // 잘못된 요청 처리
        }

        // 요청 본문에서 proid를 추출합니다.
        const { proid } = req.body;

        // MongoDB에서 스타일링 계약 데이터를 조회합니다.
        const rows = await back.mongoRead("stylingForm", { proid }, { selfMongo: instance.mongolocal });

        // 조회된 각 데이터를 반복하여 삭제 작업을 수행합니다.
        for (let i = 0; i < rows.length; i++) {
          // MongoDB에서 해당 프로젝트 ID와 관련된 스타일링 계약을 삭제합니다.
          await back.mongoDelete("stylingForm", { proid }, { selfMongo: instance.mongolocal });
        }

        // 성공적으로 처리되었을 때 OK 메시지를 반환합니다.
        res.send(JSON.stringify({ message: "OK" }));

      } catch (e) {
        // 오류 발생 시 로깅하고 클라이언트에 오류 메시지 응답
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");  // 응답을 JSON 형식으로 설정
        res.send(JSON.stringify({ error: e.message }));  // 오류 메시지를 클라이언트에 반환
      }
    });
    
    /**
     * @route POST /removeConstructContract
     * @description 시공 계약을 삭제하는 라우터입니다. 해당 프로젝트 ID (proid)를 받아서 해당 프로젝트와 관련된 시공 양식을 삭제합니다.
     * @param {Object} req - 클라이언트 요청 객체로, 요청 본문에 proid가 포함되어야 합니다.
     * @param {Object} res - 서버 응답 객체로, 작업 결과를 JSON 형식으로 반환합니다.
     */
    router.post([ "/removeConstructContract" ], async function (req, res) {
      
      // 응답 헤더 설정: 응답을 JSON 형식으로 반환하고, CORS를 허용
      res.set({
        "Content-Type": "application/json", // 응답을 JSON 형식으로 설정
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서 요청을 허용
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드 설정
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 헤더 설정
      });

      try {
        // 요청 본문에 proid가 없으면 에러를 발생시킵니다.
        if (req.body.proid === undefined) {
          throw new Error("invalid post");  // proid가 없으면 잘못된 요청으로 처리
        }

        // 요청 본문에서 proid를 추출합니다.
        const { proid } = req.body;

        // MongoDB에서 해당 proid와 일치하는 스타일링 양식을 조회합니다.
        const rows = await back.mongoRead("stylingForm", { proid }, { selfMongo: instance.mongolocal });

        // 조회된 양식들을 반복하면서 해당 프로젝트 ID와 관련된 constructForm 데이터를 삭제합니다.
        for (let i = 0; i < rows.length; i++) {
          await back.mongoDelete("constructForm", { proid }, { selfMongo: instance.mongolocal });
        }

        // 작업이 성공적으로 끝나면 OK 메시지를 반환합니다.
        res.send(JSON.stringify({ message: "OK" }));

      } catch (e) {
        // 에러가 발생하면 로그를 기록하고, 클라이언트에 에러 메시지를 반환합니다.
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /createConstructContract
     * @description 시공 계약서를 생성하는 라우터입니다. 프로젝트 ID에 따라 새로운 시공 계약서를 생성하고 고객에게 전송합니다.
     * @param {Object} req - 클라이언트 요청 객체로, 요청 본문에 proid(프로젝트 ID)와 summary(계약 요약 정보)가 포함됩니다.
     * @param {Object} res - 서버 응답 객체로, 처리 결과를 JSON 형식으로 반환합니다.
     */
    router.post([ "/createConstructContract" ], async function (req, res) {
      // 응답 헤더 설정: JSON 형식으로 응답하고 CORS를 허용합니다.
      res.set({
        "Content-Type": "application/json",  // 응답 Content-Type을 JSON으로 설정
        "Access-Control-Allow-Origin": "*",  // 모든 도메인에서의 요청을 허용
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",  // 허용되는 HTTP 메서드를 설정
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",  // 허용되는 헤더를 설정
      });

      try {
        // 요청 본문에 proid와 summary가 없으면 오류 발생
        if (req.body.proid === undefined || req.body.summary === undefined) {
          throw new Error("invalid post");  // 필수 값이 없는 경우 잘못된 요청 처리
        }

        // 요청 본문에서 proid와 summary(계약 요약 정보)를 추출
        const { proid, summary } = req.body;
        const { contractName, contractAddress, contractPhone } = summary;

        // MongoDB에서 해당 proid로 시공 계약 데이터를 조회
        const rows = await back.mongoRead("constructForm", { proid }, { selfMongo: instance.mongolocal });

        if (rows.length === 0) {
          const selfMongo = instance.mongo;
          const { officeinfo: { widsign: { id, key, endPoint } } } = address;

          // 기본 계약서 제목 설정
          const title = "2023시공계약서_000고객님_주홈리에종_YYMMDD";
          const project = await back.getProjectById(proid, { selfMongo: instance.mongo });  // 프로젝트 정보 조회
          const client = await back.getClientById(project.cliid, { selfMongo: instance.mongo });  // 클라이언트 정보 조회
          const designer = await back.getDesignerById(project.desid, { selfMongo: instance.mongo });  // 디자이너 정보 조회
          const today = new Date();  // 현재 날짜 저장

          // 영수증 정보 조회
          const thisBills = await bill.getBillsByQuery({
            $and: [
              { "links.proid": project.proid },
              { "links.desid": project.desid },
              { "links.cliid": project.cliid },
              { "links.method": project.service.online ? "online" : "offline" }
            ]
          }, { selfMongo: instance.mongolocal });

          if (thisBills.length > 0) {
            const [ thisBill ] = thisBills;
            let url, requestNumber, proposalDate;
            let searchPoint0, searchPoint1;
            let tempArr;
            let projectNormal;
            let builders;
            let widsignRes, token, target, targetFormId, safeNum;
            let titleName, titleAddress, formTitle;
            let request, analytics;
            let map;
            let data;

            // 프로젝트 정보를 일반 객체로 변환
            projectNormal = project.toNormal();

            // 시공 계약서 작성에 필요한 시공 파트너 정보를 확인
            if (projectNormal.process.design.construct.contract.partner !== "") {

              // 시공 파트너 이름 파싱
              if (/_/gi.test(projectNormal.process.design.construct.contract.partner)) {
                tempArr = projectNormal.process.design.construct.contract.partner.split('_');
                searchPoint0 = tempArr[0].trim();
                searchPoint1 = tempArr[1].trim();
              } else {
                searchPoint0 = projectNormal.process.design.construct.contract.partner.trim();
                searchPoint1 = '';
              }

              // 시공사를 MongoDB에서 조회
              builders = await back.getBuildersByQuery({
                $and: [
                  { "builder": searchPoint0 },
                  { "information.business.company": searchPoint1 }
                ]
              }, { selfMongo: instance.mongo });

              if (builders.length !== 0) {
                const [ builder ] = builders;

                // 시공 정보에 기반하여 영수증에 시공 관련 정보를 추가
                await bill.constructInjection(thisBill.bilid, builder.buiid, {
                  first: summary.first.amount,
                  start: summary.start.amount,
                  middle: summary.middle.amount,
                  remain: summary.remain.amount,
                }, { selfMongo: instance.mongolocal, selfCoreMongo: instance.mongo });

                await messageLog(thisBill.bilid + " construct request, response set complete");

                // 클라이언트 요청의 타임라인에 맞는 요청을 찾음
                proposalDate = project.proposal.date.valueOf();
                requestNumber = 0;
                for (let i = 0; i < client.requests.length; i++) {
                  if (client.requests[i].request.timeline.valueOf() <= proposalDate) {
                    requestNumber = i;
                    break;
                  }
                }

                ({ request, analytics } = client.toNormal().requests[requestNumber]);

                // Widsign API를 통해 토큰을 요청
                widsignRes = await requestSystem(endPoint + "/v2/token", {}, { method: "get", headers: { "x-api-id": id, "x-api-key": key } });

                // Widsign API 호출 결과를 통해 토큰 값을 가져옴
                if (widsignRes.data.result_code !== 200) {
                  throw new Error("access token error");
                } else {
                  token = widsignRes.data.access_token;
                  num = 1;
                  safeNum = 0;
                  do {
                    // 계약서 양식 목록을 검색해서 제목이 일치하는 양식을 찾음
                    widsignRes = await requestSystem(endPoint + "/v2/form", { page: num, page_size: 30, title }, { method: "get", headers: { "x-api-key": key, "x-access-token": token } });
                    target = widsignRes.data.result.filter((obj) => { return obj.title === title });
                    num++;
                    safeNum++;
                    if (safeNum > 1000) {
                      throw new Error("title name error");  // 타이틀을 찾을 수 없는 경우 오류 발생
                    }
                  } while (target.length === 0);

                  // 양식의 ID를 추출
                  [ { id: targetFormId } ] = target;

                  // 계약서에 표시할 이름을 설정
                  titleName = client.name;
                  if (contractName.trim() !== "") {
                    titleName = contractName;
                  }

                  // 계약서에 표시할 주소를 설정
                  titleAddress = request.space.address;
                  if (contractAddress.trim() !== "") {
                    titleAddress = contractAddress;
                  }

                  // 오늘 날짜를 "YYMMDD" 형식으로 변환하여 계약서 제목을 생성
                  tempArr = dateToString(today).split('-');
                  formTitle = "2023시공계약서_" + titleName + "고객님_주홈리에종_";
                  formTitle = formTitle + tempArr[0].slice(2) + tempArr[1] + tempArr[2];

                  // 계약서에 필요한 필드들을 설정
                  map = [
                    { id: "651e7414fbcd2144a51009c2", value: titleName === '' ? '-' : titleName },  // 계약서에 표시할 이름
                    { id: "651e7414fbcd2144a51009c3", value: summary.name === '' ? '-' : summary.name },  // 계약자 이름
                    { id: "651e7414fbcd2144a51009c4", value: summary.address === '' ? '-' : summary.address },  // 계약자 주소
                    { id: "651e7414fbcd2144a51009c5", value: summary.date.start === '' ? '-' : summary.date.start.split('-')[0] },  // 계약 시작 연도
                    { id: "651e7414fbcd2144a51009c7", value: summary.date.start === '' ? '-' : summary.date.start.split('-')[1] },  // 계약 시작 월
                    { id: "651e7414fbcd2144a51009c9", value: summary.date.start === '' ? '-' : summary.date.start.split('-')[2] },  // 계약 시작 일
                    { id: "651e7414fbcd2144a51009c6", value: summary.date.end === '' ? '-' : summary.date.end.split('-')[0] },  // 계약 종료 연도
                    { id: "651e7414fbcd2144a51009c8", value: summary.date.end === '' ? '-' : summary.date.end.split('-')[1] },  // 계약 종료 월
                    { id: "651e7414fbcd2144a51009ca", value: summary.date.end === '' ? '-' : summary.date.end.split('-')[2] },  // 계약 종료 일
                    { id: "651e7414fbcd2144a51009cb", value: summary.hangul === '' ? '-' : summary.hangul.replace(/원$/, '') },  // 한글 금액
                    { id: "651e7414fbcd2144a51009cc", value: autoComma(summary.total) === '' ? '-' : autoComma(summary.total) },  // 계약 총 금액
                    { id: "651e7414fbcd2144a51009cd", value: String(summary.first.percentage) + '%' },  // 1차 계약 금액 비율
                    { id: "651e7414fbcd2144a51009d1", value: autoComma(summary.first.amount) === '' ? '-' : autoComma(summary.first.amount) },  // 1차 계약 금액
                    { id: "651e7414fbcd2144a51009d5", value: summary.first.date === '' ? '-' : summary.first.date },  // 1차 계약 날짜
                    { id: "651e7414fbcd2144a51009d9", value: summary.first.etc === '' ? '-' : summary.first.etc },  // 1차 계약 비고
                    { id: "651e7414fbcd2144a51009ce", value: String(summary.start.percentage) + '%' },  // 착공 금액 비율
                    { id: "651e7414fbcd2144a51009d2", value: autoComma(summary.start.amount) === '' ? '-' : autoComma(summary.start.amount) },  // 착공 금액
                    { id: "651e7414fbcd2144a51009d6", value: summary.start.date === '' ? '-' : summary.start.date },  // 착공 날짜
                    { id: "651e7414fbcd2144a51009da", value: summary.start.etc === '' ? '-' : summary.start.etc },  // 착공 비고
                    { id: "651e7414fbcd2144a51009cf", value: String(summary.middle.percentage) + '%' },  // 중도 금액 비율
                    { id: "651e7414fbcd2144a51009d3", value: autoComma(summary.middle.amount) === '' ? '-' : autoComma(summary.middle.amount) },  // 중도 금액
                    { id: "651e7414fbcd2144a51009d7", value: summary.middle.date === '' ? '-' : summary.middle.date },  // 중도 날짜
                    { id: "651e7414fbcd2144a51009db", value: summary.middle.etc === '' ? '-' : summary.middle.etc },  // 중도 비고
                    { id: "651e7414fbcd2144a51009d0", value: String(summary.remain.percentage) + '%' },  // 잔금 비율
                    { id: "651e7414fbcd2144a51009d4", value: autoComma(summary.remain.amount) === '' ? '-' : autoComma(summary.remain.amount) },  // 잔금 금액
                    { id: "651e7414fbcd2144a51009d8", value: summary.remain.date === '' ? '-' : summary.remain.date },  // 잔금 날짜
                    { id: "651e7414fbcd2144a51009dc", value: summary.remain.etc === '' ? '-' : summary.remain.etc },  // 잔금 비고
                    { id: "651e7414fbcd2144a51009e0", value: titleName === '' ? '-' : titleName },  // 계약서 이름
                    { id: "651e7414fbcd2144a51009de", value: contractPhone === '' ? '-' : contractPhone },  // 계약자 전화번호
                    { id: "651e7414fbcd2144a51009df", value: contractAddress === '' ? '-' : contractAddress },  // 계약자 주소
                  ];

                  // 전송할 데이터를 구성
                  data = {
                    form_id: targetFormId,
                    title: formTitle,
                    send_type: "SAMETIME",
                    auth_phone: "N",
                    mail_title: "안녕하세요, " + client.name + " 고객님! 홈리에종입니다. 시공 계약서 보내드립니다.",
                    receiver_list: [
                      {
                        name: client.name,
                        email: client.email,
                        mobile: client.phone.replace(/\-/gi, '')
                      }
                    ],
                    items: map
                  }

                  // Widsign API를 통해 계약서를 전송
                  widsignRes = await requestSystem(endPoint + "/v2/form/send", data, { headers: { "x-api-key": key, "x-access-token": token, "Content-Type": "application/json" } });

                  // 계약서 관련 정보를 MongoDB에 저장
                  await bill.createBill("constructForm", [ {
                    name: widsignRes.data.result[0].doc_name,
                    id: widsignRes.data.result[0].receiver_meta_id,
                    time: new Date(),
                    requestNumber: requestNumber,
                    cliid: client.cliid,
                    proid: project.proid
                  } ], { selfMongo: instance.mongolocal });

                  // 클라이언트에게 알림톡을 전송
                  await kakao.sendTalk("constructForm", client.name, client.phone, { client: client.name });
                  messageSend({ text: client.name + " 시공 계약서를 작성하고 알림톡을 전송했어요!", channel: "#400_customer", voice: true }).then(() => {
                    return requestSystem("https://" + instance.address.officeinfo.host + ":3002/constructInteraction", {
                      mode: "chargeGuide",
                      proid: project.proid,
                      method: "first",
                    }, { headers: { "Content-Type": "application/json", "origin": instance.address.officeinfo.host } });
                  }).catch((err) => {
                    console.log(err);
                  });

                  // 계약서 생성 완료 메시지 반환
                  res.send(JSON.stringify({ message: "OK" }));
                }

              } else {
                // 지정된 파트너 시공사가 없을 경우 오류 처리
                await messageSend({ text: "프로젝트 " + proid + "에서 지정된 파트서 시공사가 등록된 파트너가 아니에요. 계약서를 쓸 수가 없어요.", channel: "#400_customer", voice: true });
                res.send(JSON.stringify({ message: "ERROR" }));
              }
            } else {
              // 파트너 시공사가 지정되지 않은 경우 오류 처리
              await messageSend({ text: "프로젝트 " + proid + "는 파트서 시공사가 지정되지 않았어요. 계약서를 쓸 수가 없어요.", channel: "#400_customer", voice: true });
              res.send(JSON.stringify({ message: "ERROR" }));
            }
          } else {
            // 프로젝트 영수증이 없는 경우 오류 처리
            await messageSend({ text: "프로젝트 " + proid + "의 영수증을 찾을 수 없어요. 계약서를 쓸 수가 없어요.", channel: "#400_customer", voice: true });
            res.send(JSON.stringify({ message: "ERROR" }));
          }
        } else {
          // 시공 계약서가 이미 존재할 경우 처리하지 않음
          console.log("construct form cancel : " + proid);
          await messageSend({ text: "프로젝트 " + proid + "의 시공 계약서는 이미 만들어졌기에, 중복해서 만들지 않았습니다!", channel: "#400_customer", voice: true });
          res.send(JSON.stringify({ message: "ERROR" }));
        }
      } catch (e) {
        // 오류 발생 시 로그 기록 및 에러 메시지 반환
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ message: "ERROR" }));
      }
    });
    
    /**
     * @route POST /createPartnershipContract
     * @description 디자이너 파트너십 계약서를 생성하는 라우터입니다. 신청자 ID에 따라 새로운 파트너십 계약서를 생성하고 해당 디자이너에게 전송합니다.
     * @param {Object} req - 클라이언트 요청 객체로, 요청 본문에 aspid(신청자 ID)가 포함됩니다.
     * @param {Object} res - 서버 응답 객체로, 처리 결과를 JSON 형식으로 반환합니다.
     */
    router.post([ "/createPartnershipContract" ], async function (req, res) {
      // 응답 헤더 설정: JSON 형식으로 응답하고 CORS를 허용합니다.
      res.set({
        "Content-Type": "application/json",  // 응답 Content-Type을 JSON으로 설정
        "Access-Control-Allow-Origin": "*",  // 모든 도메인에서의 요청을 허용
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",  // 허용되는 HTTP 메서드를 설정
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",  // 허용되는 헤더를 설정
      });

      try {
        // 요청 본문에 aspid가 없으면 오류 발생
        if (req.body.aspid === undefined) {
          throw new Error("invalid post");  // 필수 값이 없는 경우 잘못된 요청 처리
        }

        // 요청 본문에서 aspid 값을 추출
        const { aspid } = req.body;

        // MongoDB에서 해당 aspid로 파트너십 계약 데이터를 조회
        const rows = await back.mongoRead("partnershipForm", { aspid }, { selfMongo: instance.mongolocal });

        if (rows.length === 0) {
          const selfMongo = instance.mongo;
          const { officeinfo: { widsign: { id, key, endPoint } } } = address;

          // 기본 계약서 제목 설정
          const title = "2023디자이너파트너십계약서_000디자이너_YYMMDD";
          const aspirant = await back.getAspirantById(aspid, { selfMongo });  // 신청자 정보 조회
          const today = new Date();  // 현재 날짜 저장
          const nextYear = new Date();  // 계약 종료일은 1년 후로 설정
          nextYear.setFullYear(nextYear.getFullYear() + 1);
          nextYear.setDate(nextYear.getDate() - 1);
          let url, requestNumber, proposalDate;
          let widsignRes, token, target, targetFormId, safeNum;
          let titleName, titleAddress, formTitle;
          let tempArr;
          let map;
          let data;
          let todayYear, todayMonth ,todayDate;

          // 오늘 날짜를 "YYMMDD" 형식으로 변환
          todayYear = String(today.getFullYear());
          todayMonth = String(today.getMonth() + 1);
          todayDate = String(today.getDate());

          // Widsign API를 통해 토큰을 요청
          widsignRes = await requestSystem(endPoint + "/v2/token", {}, { method: "get", headers: { "x-api-id": id, "x-api-key": key } });

          // Widsign API 호출 결과를 통해 토큰 값을 가져옴
          if (widsignRes.data.result_code !== 200) {
            throw new Error("access token error");
          } else {
            token = widsignRes.data.access_token;
            num = 1;
            safeNum = 0;
            do {
              // 계약서 양식 목록을 검색해서 제목이 일치하는 양식을 찾음
              widsignRes = await requestSystem(endPoint + "/v2/form", { page: num, page_size: 30, title }, { method: "get", headers: { "x-api-key": key, "x-access-token": token } });
              target = widsignRes.data.result.filter((obj) => { return obj.title === title });
              num++;
              safeNum++;
              if (safeNum > 1000) {
                throw new Error("title name error");  // 타이틀을 찾을 수 없는 경우 오류 발생
              }
            } while (target.length === 0);

            // 양식의 ID를 추출
            [ { id: targetFormId } ] = target;

            // 계약서에 표시할 이름과 주소를 설정
            titleName = aspirant.designer;
            titleAddress = aspirant.address;

            // 오늘 날짜를 "YYMMDD" 형식으로 변환하여 계약서 제목을 생성
            tempArr = dateToString(today).split('-');
            formTitle = "2023디자이너파트너십계약서_" + titleName + "디자이너_";
            formTitle = formTitle + tempArr[0].slice(2) + tempArr[1] + tempArr[2];

            // 계약서에 필요한 필드들을 설정
            map = [
              { id: "6441eeed39f14f6a53000001", value: aspirant.designer },  // 디자이너 이름
              { id: "6441ef0e39f14f6a53000002", value: dateToString(today) + " ~ " + dateToString(nextYear) },  // 계약 시작 및 종료 날짜
              { id: "6441ef2c39f14f6a53000003", value: aspirant.designer },  // 디자이너 이름
              { id: "6441ef4239f14f6a53000005", value: /프리/gi.test(aspirant.information.company.classification) ? "-" : aspirant.information.company.businessNumber },  // 사업자 번호 또는 프리랜서 여부
              { id: "6441ef4b39f14f6a53000006", value: dateToString(aspirant.birth) },  // 디자이너 생년월일
              { id: "6441ef3f39f14f6a53000004", value: dateToString(today) },  // 계약서 작성 날짜
              { id: "6441f02f39f14f6a53000009", value: titleAddress },  // 디자이너 주소
              { id: "6441f03e39f14f6a5300000a", value: /프리/gi.test(aspirant.information.company.classification) ? aspirant.designer : aspirant.information.company.name },  // 회사 이름 또는 프리랜서 여부
              { id: "6441f04b39f14f6a5300000b", value: /프리/gi.test(aspirant.information.company.classification) ? aspirant.designer : aspirant.information.company.representative },  // 회사 대표 또는 디자이너 이름
            ];

            // 전송할 데이터를 구성
            data = {
              form_id: targetFormId,
              title: formTitle,
              send_type: "SAMETIME",
              auth_phone: "N",
              mail_title: "안녕하세요, " + aspirant.designer + " 디자이너님! 홈리에종입니다. 디자이너 파트너십 계약서 보내드립니다.",
              receiver_list: [
                {
                  name: aspirant.designer,
                  email: aspirant.email,
                  mobile: aspirant.phone.replace(/\-/gi, '')
                }
              ],
              items: map
            }

            // Widsign API를 통해 계약서를 전송
            widsignRes = await requestSystem(endPoint + "/v2/form/send", data, { headers: { "x-api-key": key, "x-access-token": token, "Content-Type": "application/json" } });

            // 계약서 관련 정보를 MongoDB에 저장
            await bill.createBill("partnershipForm", [ {
              name: widsignRes.data.result[0].doc_name,
              id: widsignRes.data.result[0].receiver_meta_id,
              time: new Date(),
              aspid: aspid,
            } ], { selfMongo: instance.mongolocal });

            // 클라이언트에게 알림톡을 전송
            messageSend({ text: aspirant.designer + " 파트너십 계약서를 작성하고 알림톡을 전송했어요!", channel: "#301_apply", voice: true }).catch((err) => {
              console.log(err);
            });
          }

          // 계약서 생성 완료 메시지 반환
          res.send(JSON.stringify({ message: "OK" }));
        } else {
          // 파트너십 계약서가 이미 존재할 경우 처리하지 않음
          await messageSend({ text: "신청자 " + aspid + "의 파트너십 계약서는 이미 만들어졌기에, 중복해서 만들지 않았습니다!", channel: "#301_apply", voice: true });
          res.send(JSON.stringify({ message: "ERROR" }));
        }
      } catch (e) {
        // 오류 발생 시 로그 기록 및 에러 메시지 반환
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ message: "ERROR" }));
      }
    });
    
    /**
     * @route POST /createDesignerContract
     * @description 디자이너 서비스 제휴 계약서를 생성하는 라우터입니다. 신청자 ID에 따라 새로운 계약서를 생성하고 해당 디자이너에게 전송합니다.
     * @param {Object} req - 클라이언트 요청 객체로, 요청 본문에 aspid(신청자 ID)가 포함됩니다.
     * @param {Object} res - 서버 응답 객체로, 처리 결과를 JSON 형식으로 반환합니다.
     */
    router.post([ "/createDesignerContract" ], async function (req, res) {
      
      // 응답 헤더 설정: JSON 형식으로 응답하고 CORS를 허용
      res.set({
        "Content-Type": "application/json",  // 응답 Content-Type을 JSON으로 설정
        "Access-Control-Allow-Origin": "*",  // 모든 도메인에서의 요청을 허용
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",  // 허용되는 HTTP 메서드를 설정
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",  // 허용되는 헤더 설정
      });

      try {
        // 요청 본문에 aspid가 없으면 오류 발생
        if (req.body.aspid === undefined) {
          throw new Error("invalid post");  // 필수 값이 없는 경우 잘못된 요청 처리
        }

        // 요청 본문에서 aspid 값을 추출
        const { aspid } = req.body;

        // MongoDB에서 해당 aspid로 디자이너 계약서를 조회
        const rows = await back.mongoRead("designerForm", { aspid }, { selfMongo: instance.mongolocal });

        if (rows.length === 0) {
          const selfMongo = instance.mongo;
          const { officeinfo: { widsign: { id, key, endPoint } } } = address;

          // 계약서 제목 설정
          const title = "2023디자인서비스제휴계약서_000디자이너_YYMMDD";
          const aspirant = await back.getAspirantById(aspid, { selfMongo });  // 신청자 정보 조회
          const today = new Date();  // 현재 날짜 저장
          const nextYear = new Date();  // 계약 종료일을 1년 후로 설정
          nextYear.setFullYear(nextYear.getFullYear() + 1);
          nextYear.setDate(nextYear.getDate() - 1);
          let widsignRes, token, target, targetFormId, safeNum;
          let titleName, titleAddress, formTitle;
          let tempArr;
          let map;
          let data;
          let todayYear, todayMonth, todayDate;
          let percentage;

          // 오늘 날짜를 "YYMMDD" 형식으로 변환
          todayYear = String(today.getFullYear());
          todayMonth = String(today.getMonth() + 1);
          todayDate = String(today.getDate());

          // 서비스 수수료 비율 설정
          percentage = 30;

          // Widsign API를 통해 토큰을 요청
          widsignRes = await requestSystem(endPoint + "/v2/token", {}, { method: "get", headers: { "x-api-id": id, "x-api-key": key } });

          // Widsign API 호출 결과를 통해 토큰 값을 가져옴
          if (widsignRes.data.result_code !== 200) {
            throw new Error("access token error");
          } else {
            token = widsignRes.data.access_token;
            num = 1;
            safeNum = 0;
            do {
              // 계약서 양식 목록을 검색하여 제목이 일치하는 양식을 찾음
              widsignRes = await requestSystem(endPoint + "/v2/form", { page: num, page_size: 30, title }, { method: "get", headers: { "x-api-key": key, "x-access-token": token } });
              target = widsignRes.data.result.filter((obj) => { return obj.title === title });
              num++;
              safeNum++;
              if (safeNum > 1000) {
                throw new Error("title name error");  // 타이틀을 찾을 수 없는 경우 오류 발생
              }
            } while (target.length === 0);

            // 양식의 ID를 추출
            [ { id: targetFormId } ] = target;

            // 계약서에 표시할 이름과 주소를 설정
            titleName = aspirant.designer;
            titleAddress = aspirant.address;

            // 오늘 날짜를 "YYMMDD" 형식으로 변환하여 계약서 제목을 생성
            tempArr = dateToString(today).split('-');
            formTitle = "2023디자인서비스제휴계약서_" + titleName + "디자이너_";
            formTitle = formTitle + tempArr[0].slice(2) + tempArr[1] + tempArr[2];

            // 계약서에 필요한 필드들을 설정
            map = [
              { id: "6440dafad4a1496b82000005", value: aspirant.designer },  // 디자이너 이름
              { id: "6440db17d4a1496b82000006", value: todayYear },  // 계약 시작 연도
              { id: "6440db23d4a1496b82000007", value: todayMonth },  // 계약 시작 월
              { id: "6440db3dd4a1496b82000009", value: todayDate },  // 계약 시작 날짜
              { id: "6440db8fd4a1496b8200000a", value: String(percentage) },  // 서비스 수수료 비율
              { id: "6440dbc3d4a1496b8200000b", value: aspirant.information.account.to },  // 송금 계좌 정보
              { id: "6440dbe4d4a1496b8200000d", value: aspirant.information.account.bank },  // 은행 이름
              { id: "6440dc17d4a1496b8200000e", value: aspirant.information.account.number },  // 계좌 번호
              { id: "6440dddad4a1496b82000011", value: titleAddress },  // 디자이너 주소
              { id: "6440ddebd4a1496b82000012", value: /프리/gi.test(aspirant.information.company.classification) ? aspirant.designer : aspirant.information.company.name },  // 회사 이름 또는 프리랜서 여부
              { id: "6440ddfbd4a1496b82000013", value: /프리/gi.test(aspirant.information.company.classification) ? aspirant.designer : aspirant.information.company.representative },  // 회사 대표 또는 디자이너 이름
            ];

            // 전송할 데이터를 구성
            data = {
              form_id: targetFormId,
              title: formTitle,
              send_type: "SAMETIME",
              auth_phone: "N",
              mail_title: "안녕하세요, " + aspirant.designer + " 디자이너님! 홈리에종입니다. 디자이너 서비스 제휴 계약서 보내드립니다.",
              receiver_list: [
                {
                  name: aspirant.designer,
                  email: aspirant.email,
                  mobile: aspirant.phone.replace(/\-/gi, '')
                }
              ],
              items: map
            }

            // Widsign API를 통해 계약서를 전송
            widsignRes = await requestSystem(endPoint + "/v2/form/send", data, { headers: { "x-api-key": key, "x-access-token": token, "Content-Type": "application/json" } });

            // 계약서 관련 정보를 MongoDB에 저장
            await bill.createBill("designerForm", [ {
              name: widsignRes.data.result[0].doc_name,
              id: widsignRes.data.result[0].receiver_meta_id,
              time: new Date(),
              aspid: aspid,
            } ], { selfMongo: instance.mongolocal });

            // 클라이언트에게 알림톡을 전송
            messageSend({ text: aspirant.designer + " 서비스 제휴 계약서를 작성하고 알림톡을 전송했어요!", channel: "#301_apply", voice: true }).catch((err) => {
              console.log(err);
            });
          }

          // 계약서 생성 완료 메시지 반환
          res.send(JSON.stringify({ message: "OK" }));
        } else {
          // 디자이너 계약서가 이미 존재할 경우 처리하지 않음
          await messageSend({ text: "신청자 " + aspid + "의 서비스 제휴 계약서는 이미 만들어졌기에, 중복해서 만들지 않았습니다!", channel: "#301_apply", voice: true });
          res.send(JSON.stringify({ message: "ERROR" }));
        }
      } catch (e) {
        // 오류 발생 시 로그 기록 및 에러 메시지 반환
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ message: "ERROR" }));
      }
    });
    
    /**
     * @route POST /receiveConstructContract
     * @description 시공 계약서를 접수하고 처리하는 라우터입니다. 계약서 접수 후 알림톡을 발송하고, 관련 시스템에 요청을 전달합니다.
     * @param {object} req - 클라이언트 요청 객체.
     * @param {object} res - 서버 응답 객체.
     */
    router.post([ "/receiveConstructContract" ], async function (req, res) {
      try {
        // 요청 바디에서 json 필드가 존재하지 않으면 에러를 던짐
        if (req.body.json === undefined) {
          throw new Error("must be json"); // json 필드는 필수
        }

        // equalJson을 사용하여 req.body.json을 깊은 복사하여 json 변수에 할당
        const json = equalJson(req.body.json); // JSON.parse의 업그레이드 버전으로 깊은 복사 수행
        const collection = "constructForm"; // 사용할 MongoDB 컬렉션명 정의
        const selfMongo = instance.mongolocal; // 로컬 MongoDB 인스턴스
        let client; // 클라이언트 정보 변수

        // MongoDB에 시공 계약서 정보를 저장 (계약서를 저장하는 bill.createBill 호출)
        await bill.createBill(collection, [ json ], { selfMongo: instance.mongolocal });
        
        // 계약서에 기록된 cliid로 클라이언트 정보를 MongoDB에서 조회
        client = await back.getClientById(json.cliid, { selfMongo: instance.mongo });

        // 클라이언트가 존재할 경우 알림톡 발송 및 관련 메시지 처리
        if (client !== null) {
          // 카카오톡 알림톡 전송 (kakao.sendTalk 사용)
          await kakao.sendTalk(collection, client.name, client.phone, { client: client.name });

          // 메시지 전송: 고객 이름과 함께 시공 계약서 작성 완료 메시지 전송
          messageSend({
            text: client.name + " 시공 계약서를 작성하고 알림톡을 전송했어요!",
            channel: "#400_customer", // 고객 관련 메시지 채널
            voice: true // 음성 알림 활성화
          })
          .then(() => {
            // requestSystem 호출을 통해 constructInteraction 모드에서 chargeGuide 요청을 전송
            return requestSystem("https://" + instance.address.officeinfo.host + ":3002/constructInteraction", {
              mode: "chargeGuide", // 모드 설정: 'chargeGuide'
              proid: json.proid, // 프로젝트 ID 전달
              method: "first" // 첫 번째 가이드 요청
            }, {
              headers: {
                "Content-Type": "application/json", // 헤더 설정: JSON 형식
                "origin": instance.address.officeinfo.host // 요청의 출처 설정
              }
            });
          })
          .catch((err) => {
            console.log(err); // 요청 실패 시 에러를 콘솔에 기록
          });
        }

        // 응답 헤더 설정: JSON 형식 응답, CORS 허용
        res.set({
          "Content-Type": "application/json", // 응답 데이터 형식을 JSON으로 설정
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서 접근 허용
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용할 HTTP 메서드 설정
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용할 요청 헤더 설정
        });

        // 클라이언트에게 성공 응답 반환
        res.send(JSON.stringify({ message: "OK" }));

      } catch (e) {
        // 오류 발생 시 로그를 기록하고, 클라이언트에게 오류 응답 반환
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json"); // 오류 응답도 JSON 형식으로 설정
        res.send(JSON.stringify({ error: e.message })); // 오류 메시지 반환
      }
    });
    
    /**
     * @route POST /constructAmountSync
     * @description 시공 금액을 동기화하는 라우터입니다. 클라이언트에서 프로젝트 ID, 클라이언트 ID, 디자이너 ID, 결제 방식과 금액 정보를 받아 MongoDB에 업데이트합니다.
     * @param {Object} req - 클라이언트 요청 객체로, 요청 본문에 proid(프로젝트 ID), cliid(클라이언트 ID), desid(디자이너 ID), method(결제 방식), amount(금액 정보) 등이 포함됩니다.
     * @param {Object} res - 서버 응답 객체로, 처리 결과를 JSON 형식으로 반환합니다.
     */
    router.post([ "/constructAmountSync" ], async function (req, res) {
      // 응답 헤더 설정: JSON 형식으로 응답하고 CORS를 허용합니다.
      res.set({
        "Content-Type": "application/json",  // 응답의 Content-Type을 JSON으로 설정
        "Access-Control-Allow-Origin": "*",  // 모든 도메인에서의 요청 허용
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",  // 허용되는 HTTP 메서드를 설정
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",  // 허용되는 헤더를 설정
      });

      try {
        // 필수 요청 본문 값이 없으면 오류를 발생시킵니다.
        if (req.body.proid === undefined || req.body.cliid === undefined || req.body.desid === undefined || req.body.method === undefined) {
          throw new Error("invalid post");  // 필수 값이 없으면 오류 발생
        }

        // 요청 본문에서 필요한 데이터 추출 (equalJson을 사용해 깊은 복사 수행)
        const { proid, cliid, desid, method } = equalJson(req.body);

        // 찾을 키워드를 정의합니다.
        const find0 = "시공 잔금";
        const findFirst = "시공 계약금";
        const findStart = "시공 착수금";
        const findMiddle = "시공 중도금";
        const findRemain = "시공 잔금";
        const find1 = "시공";

        let bills, bilid, tempIndex, targetIndex, targetBill;
        let itemIndex;
        let whereQuery, updateQuery;

        // MongoDB에서 관련 청구서 데이터를 조회합니다.
        bills = await bill.getBillsByQuery({
          $and: [
            { "links.proid": proid },
            { "links.cliid": cliid },
            { "links.desid": desid },
            { "links.method": method },
          ]
        }, { selfMongo: instance.mongolocal });

        // 조회한 청구서가 있을 경우
        if (bills.length > 0) {
          bilid = null;
          targetBill = null;
          targetIndex = -1;

          // "시공 잔금" 항목이 포함된 청구서를 찾습니다.
          for (let i = 0; i < bills.length; i++) {
            tempIndex = bills[i].requests.findIndex((obj) => {
              return (new RegExp(find0, "gi")).test(obj.name);
            });
            if (tempIndex !== -1) {
              bilid = bills[i].bilid;
              targetBill = bills[i];
              targetIndex = tempIndex;
              break;
            }
          }

          // 시공 금액을 동기화할 청구서를 찾은 경우
          if (bilid !== null) {
            // 요청 본문에 금액 정보가 포함된 경우
            if (req.body.amount !== undefined) {
              const { amount: { supply, vat, consumer } } = equalJson(req.body);

              if (targetIndex !== -1) {
                itemIndex = -1;
                // "시공" 항목을 찾습니다.
                for (let i = 0; i < targetBill.requests[targetIndex].items.length; i++) {
                  if ((new RegExp(find1, "gi")).test(targetBill.requests[targetIndex].items[i].name)) {
                    itemIndex = i;
                    break;
                  }
                }

                // MongoDB에 업데이트할 쿼리를 구성합니다.
                whereQuery = { bilid };
                updateQuery = {};
                updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".unit.price"] = supply;
                updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".amount.supply"] = supply;
                updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".amount.vat"] = vat;
                updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".amount.consumer"] = consumer;

                // 청구서 업데이트
                await bill.updateBill([ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });
              }

            } else {
              // 각 금액 정보에 따라 해당 항목을 업데이트합니다.
              const { first, start, middle, remain } = equalJson(req.body);

              whereQuery = { bilid };
              updateQuery = {};

              // 시공 계약금 업데이트
              targetIndex = targetBill.requests.findIndex((obj) => {
                return (new RegExp(findFirst, "gi")).test(obj.name);
              });
              if (targetIndex !== -1) {
                itemIndex = -1;
                for (let i = 0; i < targetBill.requests[targetIndex].items.length; i++) {
                  if ((new RegExp(find1, "gi")).test(targetBill.requests[targetIndex].items[i].name)) {
                    itemIndex = i;
                    break;
                  }
                }
                updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".unit.price"] = first.supply;
                updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".amount.supply"] = first.supply;
                updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".amount.vat"] = first.vat;
                updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".amount.consumer"] = first.consumer;
              }

              // 시공 착수금 업데이트
              targetIndex = targetBill.requests.findIndex((obj) => {
                return (new RegExp(findStart, "gi")).test(obj.name);
              });
              if (targetIndex !== -1) {
                itemIndex = -1;
                for (let i = 0; i < targetBill.requests[targetIndex].items.length; i++) {
                  if ((new RegExp(find1, "gi")).test(targetBill.requests[targetIndex].items[i].name)) {
                    itemIndex = i;
                    break;
                  }
                }
                updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".unit.price"] = start.supply;
                updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".amount.supply"] = start.supply;
                updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".amount.vat"] = start.vat;
                updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".amount.consumer"] = start.consumer;
              }

              // 시공 중도금 업데이트
              targetIndex = targetBill.requests.findIndex((obj) => {
                return (new RegExp(findMiddle, "gi")).test(obj.name);
              });
              if (targetIndex !== -1) {
                itemIndex = -1;
                for (let i = 0; i < targetBill.requests[targetIndex].items.length; i++) {
                  if ((new RegExp(find1, "gi")).test(targetBill.requests[targetIndex].items[i].name)) {
                    itemIndex = i;
                    break;
                  }
                }
                updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".unit.price"] = middle.supply;
                updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".amount.supply"] = middle.supply;
                updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".amount.vat"] = middle.vat;
                updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".amount.consumer"] = middle.consumer;
              }

              // 시공 잔금 업데이트
              targetIndex = targetBill.requests.findIndex((obj) => {
                return (new RegExp(findRemain, "gi")).test(obj.name);
              });
              if (targetIndex !== -1) {
                itemIndex = -1;
                for (let i = 0; i < targetBill.requests[targetIndex].items.length; i++) {
                  if ((new RegExp(find1, "gi")).test(targetBill.requests[targetIndex].items[i].name)) {
                    itemIndex = i;
                    break;
                  }
                }
                updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".unit.price"] = remain.supply;
                updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".amount.supply"] = remain.supply;
                updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".amount.vat"] = remain.vat;
                updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".amount.consumer"] = remain.consumer;
              }

              // 청구서 업데이트
              await bill.updateBill([ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });
            }
          }
        }

        // 성공 메시지 응답
        res.send(JSON.stringify({ message: "success" }));

      } catch (e) {
        // 오류 처리 및 응답
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /stylingAmountSync
     * @description 클라이언트의 스타일링 금액 정보를 동기화하는 라우터입니다. 클라이언트가 특정 프로젝트와 관련된 금액 정보를 서버에 요청할 때 사용됩니다.
     * @param {Object} req - 클라이언트 요청 객체로, 요청 본문에 proid(프로젝트 ID)가 포함됩니다.
     * @param {Object} res - 서버 응답 객체로, 처리 결과를 JSON 형식으로 반환합니다.
     */
    router.post([ "/stylingAmountSync" ], async function (req, res) {
      // 응답 헤더를 설정합니다. 클라이언트가 JSON 데이터를 받을 수 있도록 설정하고, CORS 정책을 적용합니다.
      res.set({
          "Content-Type": "application/json", // 반환되는 데이터는 JSON 형식입니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용되는 HTTP 메서드 목록입니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용되는 HTTP 헤더 목록입니다.
      });

      try {
          // 요청 본문에 proid가 포함되지 않으면 예외를 발생시킵니다.
          if (req.body.proid === undefined) {
              throw new Error("invalid post");
          }

          // equalJson을 통해 요청 본문을 깊은 복사(deep copy)하고, proid 값을 추출합니다.
          const { proid } = equalJson(req.body);

          // 특정 값을 찾기 위한 상수 문자열입니다.
          const find0 = "홈리에종 잔금";
          const find1 = "디자인비";

          // 빈 날짜 값을 나타내는 상수입니다. 2000년 1월 1일을 기준으로 설정됩니다.
          const emptyDateValue = (new Date(2000, 0, 1)).valueOf();

          // 여러 변수를 선언합니다. 프로젝트와 관련된 결제 정보 및 잔액을 처리하기 위한 변수들입니다.
          let bills, bilid, tempIndex, targetIndex, targetBill;
          let itemIndex;
          let whereQuery, updateQuery;
          let project;
          let supply;
          let vat;
          let consumer;
          let firstTargetIndex, firstItemIndex;
          let firstConsumer;
          let firstVat;
          let firstSupply;
          let firstIndex;
          let remainIndex;

          // 프로젝트 정보를 MongoDB에서 가져옵니다. MongoDB 인스턴스를 사용하여 데이터베이스에 접근합니다.
          project = await back.getProjectById(proid, { selfMongo: instance.mongo });
          if (project === null) {
              throw new Error("invalid post");
          }

          // 관련된 청구서 목록을 조회합니다. 프로젝트 ID와 클라이언트 ID, 디자이너 ID, 서비스 방식을 기준으로 청구서를 찾습니다.
          bills = await bill.getBillsByQuery({
              $and: [
                  { "links.proid": proid }, // 프로젝트 ID로 필터링
                  { "links.cliid": project.cliid }, // 클라이언트 ID로 필터링
                  { "links.desid": project.desid }, // 디자이너 ID로 필터링
                  { "links.method": (project.service.online ? "online" : "offline") }, // 온라인 또는 오프라인 서비스 여부로 필터링
              ]
          }, { selfMongo: instance.mongolocal });
          if (bills.length === 0) {
              throw new Error("cannot find bill");
          }

          // 청구서에서 필요한 정보들을 추출합니다.
          bilid = null;
          targetBill = null;
          targetIndex = -1;

          // 청구서 목록을 순회하며 "홈리에종 잔금" 항목을 찾습니다.
          for (let i = 0; i < bills.length; i++) {
              tempIndex = bills[i].requests.findIndex((obj) => {
                  return (new RegExp(find0, "gi")).test(obj.name); // "홈리에종 잔금"이 포함된 항목을 찾습니다.
              });
              if (tempIndex !== -1) {
                  bilid = bills[i].bilid; // 청구서 ID를 설정합니다.
                  targetBill = bills[i]; // 해당 청구서를 타겟으로 설정합니다.
                  targetIndex = tempIndex; // 해당 항목의 인덱스를 설정합니다.
                  break;
              }
          }

          // 소비자 금액, 부가가치세(VAT), 공급가액을 계산합니다.
          consumer = Math.floor(project.process.contract.remain.calculation.amount.consumer - project.process.contract.first.calculation.amount);
          vat = Math.floor(consumer / 11);
          supply = Math.floor(consumer - vat);

          // 첫 번째 소비자 금액, 첫 번째 VAT, 첫 번째 공급가액을 계산합니다.
          firstConsumer = Math.floor(project.process.contract.first.calculation.amount);
          firstVat = Math.floor(firstConsumer / 11);
          firstSupply = Math.floor(firstConsumer - firstVat);

          // "디자인비" 항목을 찾기 위해 청구서의 요청 항목을 순회합니다.
          itemIndex = -1;
          for (let i = 0; i < targetBill.requests[targetIndex].items.length; i++) {
              if ((new RegExp(find1, "gi")).test(targetBill.requests[targetIndex].items[i].name)) {
                  itemIndex = i; // "디자인비" 항목의 인덱스를 설정합니다.
                  break;
              }
          }

          // "홈리에종 계약금" 항목을 찾기 위한 인덱스를 설정합니다.
          firstTargetIndex = -1;
          firstItemIndex = -1;
          for (let i = 0; i < targetBill.requests.length; i++) {
              if (/홈리에종 계약금/gi.test(targetBill.requests[i].name)) {
                  firstTargetIndex = i;
                  break;
              }
          }

          // "디자인비" 항목을 찾습니다.
          for (let i = 0; i < targetBill.requests[firstTargetIndex].items.length; i++) {
              if (/디자인비/gi.test(targetBill.requests[firstTargetIndex].items[i].name)) {
                  firstItemIndex = i;
                  break;
              }
          }

          // whereQuery와 updateQuery를 설정합니다.
          whereQuery = { bilid };
          updateQuery = {};

          // 계약금 항목이 있을 경우, 공급가액, VAT, 소비자 금액을 업데이트합니다.
          if (firstTargetIndex !== -1 && firstItemIndex !== -1) {
              updateQuery["requests." + String(firstTargetIndex) + ".items." + String(firstItemIndex) + ".unit.price"] = firstSupply;
              updateQuery["requests." + String(firstTargetIndex) + ".items." + String(firstItemIndex) + ".amount.supply"] = firstSupply;
              updateQuery["requests." + String(firstTargetIndex) + ".items." + String(firstItemIndex) + ".amount.vat"] = firstVat;
              updateQuery["requests." + String(firstTargetIndex) + ".items." + String(firstItemIndex) + ".amount.consumer"] = firstConsumer;
          }

          // 청구서의 금액 정보를 업데이트합니다.
          updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".unit.price"] = supply;
          updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".amount.supply"] = supply;
          updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".amount.vat"] = vat;
          updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".amount.consumer"] = consumer;

          // 잔금과 선금을 위한 인덱스를 설정합니다.
          remainIndex = 0;
          firstIndex = 0;
          for (let i = 0; i < targetBill.responses.length; i++) {
              if (/홈리에종 잔금/gi.test(targetBill.responses[i].name)) {
                  remainIndex = i;
              }
              if (/홈리에종 선금/gi.test(targetBill.responses[i].name)) {
                  firstIndex = i;
              }
          }

          // 선금 항목의 금액을 업데이트합니다.
          updateQuery["responses." + String(firstIndex) + ".items.0.unit.price"] = Math.floor(project.process.calculation.payments.first.amount);
          updateQuery["responses." + String(firstIndex) + ".items.0.amount.pure"] = Math.floor(project.process.calculation.payments.first.amount);
          updateQuery["responses." + String(firstIndex) + ".items.0.amount.commission"] = Math.floor((project.process.contract.remain.calculation.amount.supply - project.process.calculation.payments.totalAmount) / 2);

          // 잔금 항목의 금액을 업데이트합니다.
          updateQuery["responses." + String(remainIndex) + ".items.0.unit.price"] = Math.floor(project.process.calculation.payments.remain.amount);
          updateQuery["responses." + String(remainIndex) + ".items.0.amount.pure"] = Math.floor(project.process.calculation.payments.remain.amount);
          updateQuery["responses." + String(remainIndex) + ".items.0.amount.commission"] = Math.floor((project.process.contract.remain.calculation.amount.supply - project.process.calculation.payments.totalAmount) / 2);

          // 첫 번째 결제의 날짜가 유효한 경우, 결제 정보를 업데이트합니다.
          if (project.process.calculation.payments.first.date.valueOf() > emptyDateValue) {
              updateQuery["responses." + String(firstIndex) + ".pay"] = [
                  {
                      date: project.process.calculation.payments.first.date,
                      amount: Math.floor(project.process.calculation.payments.first.amount),
                      oid: "" // 결제 ID는 빈 문자열로 설정
                  }
              ];
              updateQuery["responses." + String(firstIndex) + ".proofs"] = [
                  {
                      date: project.process.calculation.payments.first.date,
                      method: "계좌 이체", // 결제 방법은 계좌 이체로 설정
                      proof: project.process.calculation.info.proof, // 증빙 정보
                      to: project.process.calculation.info.to // 수신자 정보
                  }
              ];
          }

          // 첫 번째 결제가 취소된 경우, 취소 정보를 업데이트합니다.
          if (project.process.calculation.payments.first.cancel.valueOf() > emptyDateValue) {
              updateQuery["responses." + String(firstIndex) + ".cancel"] = [
                  {
                      date: project.process.calculation.payments.first.cancel,
                      amount: Math.floor(project.process.calculation.payments.first.refund),
                      oid: "" // 취소 ID는 빈 문자열로 설정
                  }
              ];
          }

          // 잔금 결제의 날짜가 유효한 경우, 결제 정보를 업데이트합니다.
          if (project.process.calculation.payments.remain.date.valueOf() > emptyDateValue) {
              updateQuery["responses." + String(remainIndex) + ".pay"] = [
                  {
                      date: project.process.calculation.payments.remain.date,
                      amount: Math.floor(project.process.calculation.payments.remain.amount),
                      oid: "" // 결제 ID는 빈 문자열로 설정
                  }
              ];
              updateQuery["responses." + String(remainIndex) + ".proofs"] = [
                  {
                      date: project.process.calculation.payments.remain.date,
                      method: "계좌 이체", // 결제 방법은 계좌 이체로 설정
                      proof: project.process.calculation.info.proof, // 증빙 정보
                      to: project.process.calculation.info.to // 수신자 정보
                  }
              ];
          }

          // 잔금 결제가 취소된 경우, 취소 정보를 업데이트합니다.
          if (project.process.calculation.payments.remain.cancel.valueOf() > emptyDateValue) {
              updateQuery["responses." + String(remainIndex) + ".cancel"] = [
                  {
                      date: project.process.calculation.payments.remain.cancel,
                      amount: Math.floor(project.process.calculation.payments.remain.refund),
                      oid: "" // 취소 ID는 빈 문자열로 설정
                  }
              ];
          }

          // 업데이트된 청구서 정보를 MongoDB에 저장합니다.
          await bill.updateBill([ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });

          // 성공 메시지를 클라이언트에 전송합니다.
          res.send(JSON.stringify({ message: "success" }));
      } catch (e) {
          // 오류가 발생하면 로그를 기록하고, 클라이언트에 오류 메시지를 반환합니다.
          logger.error(e, req).catch((e) => { console.log(e); });
          res.set("Content-Type", "application/json");
          res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /smsParsing
     * @description 은행 문자를 파싱하여 고객의 입금 정보를 처리하는 라우터입니다. 고객이 입금한 정보를 분석하여 알림을 보내고 관련 데이터를 업데이트합니다.
     * @param {Object} req - 클라이언트 요청 객체로, 요청 본문에 date(날짜), amount(금액), name(이름)이 포함됩니다.
     * @param {Object} res - 서버 응답 객체로, 처리 결과를 JSON 형식으로 반환합니다.
     */
    router.post([ "/smsParsing" ], async function (req, res) {
      // 응답 헤더를 설정하여 클라이언트가 요청을 받아들이고 처리할 수 있게 합니다.
      res.set({
          "Content-Type": "application/json", // 반환할 데이터 형식을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 요청을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용할 HTTP 메서드를 명시합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 클라이언트에서 보내는 헤더 중 허용할 항목을 지정합니다.
      });

      // 컬렉션 이름을 정의합니다. 고객의 입금 정보와 관련된 데이터를 저장할 컬렉션입니다.
      const collection = "accountTransfer"; 
      const designerCollection = "designerTransfer"; // 디자이너와 관련된 계좌 이체 정보를 저장하는 컬렉션입니다.
      const standardDay = 7; // 기준 날짜로 7일을 설정합니다.

      try {
          // 필수 정보가 요청 본문에 포함되어 있지 않을 경우 에러를 발생시킵니다.
          if (req.body.date === undefined || req.body.amount === undefined || req.body.name === undefined) {
              throw new Error("invalid post");
          }

          // MongoDB 연결 정보와 equalJson 메서드를 사용하여 요청 본문을 처리합니다.
          const selfMongo = instance.mongolocal; 
          const { date, amount, name } = equalJson(req.body); // equalJson을 통해 요청 본문을 깊은 복사한 후 필요한 정보를 추출합니다.
          
          // 처리되지 않은 은행 문자를 기록할 때 사용할 메시지입니다.
          const errorMessage = "뭔가 은행 문자가 왔는데 찾을 수 없음 : " + name + " " + autoComma(amount) + "원";
          const ignoreMessage = "무시하는 리스트에 포함된 은행 문자 왔음 : " + name + " " + autoComma(amount) + "원"; // 무시할 메시지를 기록합니다.

          // 무시할 이름 리스트를 정의합니다. 특정 기업의 입금 내역은 처리하지 않도록 무시 리스트에 추가합니다.
          const ignoreList = [
              "KG이니시스",
          ];

          let rows, ago, target, rows2; // 필요한 변수들을 미리 선언합니다.
          let target2;
          let whereQuery;
          let updateQuery;
          let thisProject;
          let thisClient;

          // 만약 무시 리스트에 이름이 포함되지 않는다면 은행 문자를 처리합니다.
          if (!ignoreList.includes(name.trim())) {
              ago = new Date(); // 현재 날짜를 가져옵니다.
              ago.setDate(ago.getDate() - (standardDay * 2)); // 기준 날짜에서 14일 전으로 설정합니다.

              target = null; // 타겟을 null로 초기화합니다.
              rows = await back.mongoRead(collection, { amount }, { selfMongo }); // amount를 기준으로 계좌 이체 데이터를 읽어옵니다.
              if (rows.length > 0) {
                  // 날짜순으로 데이터를 정렬한 후, 기준 날짜 이후의 데이터만 필터링합니다.
                  rows.sort((a, b) => { return b.date.valueOf() - a.date.valueOf(); });
                  rows = rows.filter((obj) => {
                      return obj.date.valueOf() >= ago.valueOf(); // 기준 날짜 이후의 데이터만 필터링
                  }).filter((obj) => {
                      return (new RegExp(obj.name, "gi")).test(name); // 이름이 일치하는 데이터를 필터링
                  });

                  // 필터링된 데이터가 하나일 경우 그 데이터를 타겟으로 설정합니다.
                  if (rows.length > 0) {
                      if (rows.length === 1) {
                          [ target ] = rows;
                      } else {
                          rows2 = rows.filter((obj) => {
                              return obj.name.trim() === name.trim(); // 이름이 정확히 일치하는 데이터를 필터링
                          });
                          if (rows2.length > 0) {
                              [ target ] = rows2;
                          } else {
                              [ target ] = rows;
                          }
                      }
                  }
              }

              if (target !== null) {
                  // 타겟 데이터가 존재하면 500밀리초 대기 후 처리합니다.
                  await sleep(500); 

                  const { phone, amount, requestNumber } = target; // 타겟에서 필요한 데이터를 추출합니다.

                  target.accountInfo.requestNumber = requestNumber; // 요청 번호를 설정합니다.
                  // 입금 알림을 전송합니다.
                  messageSend(`${name} 고객님이 ${autoComma(amount)}원을 계좌에 입금하여 주셨어요.`, "#700_operation", (target === null)).catch((err) => { throw new Error(err.message); });

                  // 외부 시스템에 요청을 보내 입금 정보를 전송합니다.
                  await requestSystem("https://" + instance.address.officeinfo.host + ":3002/webHookVAccount", target.accountInfo, {
                      headers: { "Content-Type": "application/json" }
                  });

                  // 현금 영수증 관련 로그를 남깁니다.
                  logger.log("현금 영수증 관련 핸드폰 번호 감지 => " + phone).catch((e) => { console.log(e); });

                  // 휴대폰 번호가 010으로 시작하면 현금 영수증을 발행합니다.
                  if (/^010/.test(phone)) {
                      requestSystem("https://" + instance.address.officeinfo.ghost.host + ":" + String(3000) + "/issueCashReceipt", { amount: Number(amount), phone }, { headers: { "Content-Type": "application/json" } }).then(() => {
                          return messageSend(`${name} 고객님의 현금 영수증을 발행하였습니다!\n번호 : ${phone}\n가격 : ${autoComma(amount)}원`, "#700_operation", false);
                      }).catch((err) => {
                          logger.error(err, req).catch((e) => { console.log(e); });
                          throw new Error(err.message);
                      });
                  }

              } else {
                  // 타겟이 없을 경우 디자이너 계좌 이체 정보를 읽어옵니다.
                  target2 = null;
                  rows = await back.mongoRead(designerCollection, { amount }, { selfMongo }); // 디자이너의 계좌 이체 정보를 가져옵니다.
                  if (rows.length > 0) {
                      rows.sort((a, b) => { return b.date.valueOf() - a.date.valueOf(); });
                      rows = rows.filter((obj) => {
                          return obj.date.valueOf() >= ago.valueOf(); // 기준 날짜 이후의 데이터만 필터링
                      }).filter((obj) => {
                          return (new RegExp(obj.name, "gi")).test(name); // 이름이 일치하는 데이터를 필터링
                      }).filter((obj) => {
                          return obj.complete === 0; // 완료되지 않은 데이터를 필터링
                      });

                      // 필터링된 데이터를 타겟으로 설정합니다.
                      if (rows.length > 0) {
                          if (rows.length === 1) {
                              [ target2 ] = rows;
                          } else {
                              rows2 = rows.filter((obj) => {
                                  return obj.name.trim() === name.trim(); // 이름이 정확히 일치하는 데이터를 필터링
                              });
                              if (rows2.length > 0) {
                                  [ target2 ] = rows2;
                              } else {
                                  [ target2 ] = rows;
                              }
                          }
                      }
                  }

                  if (target2 !== null) {
                      // 타겟2가 있을 경우 결제 정보를 업데이트합니다.
                      if (/촬영/gi.test(target2.goodname)) {
                          thisProject = await back.getProjectById(target2.proid, { selfMongo: instance.mongo }); // 프로젝트 ID로 프로젝트를 조회합니다.
                          thisClient = await back.getClientById(target2.cliid, { selfMongo: instance.mongo }); // 클라이언트 ID로 클라이언트를 조회합니다.

                          // 알림 메시지를 전송합니다.
                          messageSend(`${target2.name} 실장님이 계좌 이체로 ${thisClient.name} 고객님 현장의 ${target2.goodname}를 결제하셨습니다.`, "#301_console", true).catch((err) => { throw new Error(err.message); });
                          messageSend(`${target2.name} 실장님이 계좌 이체로 ${thisClient.name} 고객님 현장의 ${target2.goodname}를 결제하셨습니다.`, "#700_operation", true).catch((err) => { throw new Error(err.message); });
                          
                          // 프로젝트의 결제 상태를 업데이트합니다.
                          whereQuery = { proid: target2.proid };
                          updateQuery = {};
                          updateQuery["contents.payment.status"] = "결제 완료";
                          updateQuery["contents.payment.date"] = new Date();
                          updateQuery["contents.payment.calculation.amount"] = amount;
                          updateQuery["contents.payment.calculation.info.method"] = "계좌 이체";

                          // 결제 방식에 따라 영수증 또는 세금계산서를 설정합니다.
                          if (/프리/gi.test(thisProject.process.calculation.method) || /간이/gi.test(thisProject.process.calculation.method)) {
                              updateQuery["contents.payment.calculation.info.proof"] = "현금영수증";
                          } else {
                              updateQuery["contents.payment.calculation.info.proof"] = "세금계산서";
                          }
                          updateQuery["contents.payment.calculation.info.to"] = target2.name;
                          await back.updateProject([ whereQuery, updateQuery ], { selfMongo: instance.mongo });

                          // 디자이너의 결제 상태를 업데이트합니다.
                          whereQuery = { proid: target2.proid, goodname: target2.goodname };
                          updateQuery = {};
                          updateQuery["complete"] = 1;
                          await selfMongo.db("miro81").collection(designerCollection).updateMany(whereQuery, { $set: updateQuery });

                      } else {
                          // 다른 결제일 경우 메시지를 전송하고 에러를 로그에 기록합니다.
                          messageSend(`${name} 고객님이 ${autoComma(amount)}원을 계좌에 입금하여 주셨어요.`, "#700_operation", (target === null)).catch((err) => { throw new Error(err.message); });
                          logger.alert(errorMessage).catch((e) => { console.log(e); });
                      }

                  } else {
                      // 타겟을 찾지 못할 경우 메시지를 전송하고 로그에 기록합니다.
                      messageSend(`${name} 고객님이 ${autoComma(amount)}원을 계좌에 입금하여 주셨어요.`, "#700_operation", (target === null)).catch((err) => { console.log(e); });
                      logger.alert(errorMessage).catch((e) => { console.log(e); });
                  }

              }
          } else {
              // 무시 리스트에 포함된 이름의 문자를 처리하지 않고 로그에 기록합니다.
              logger.log(ignoreMessage).catch((e) => { console.log(e); });
          }

          // 성공적으로 처리되었음을 클라이언트에 응답합니다.
          res.send(JSON.stringify({ message: "will do" }));
      } catch (e) {
          // 오류 발생 시 로그에 기록하고, 클라이언트에 오류 메시지를 응답합니다.
          logger.error(e, req).catch((e) => { console.log(e); });
          res.set("Content-Type", "application/json");
          res.send(JSON.stringify({ error: e.message }));
      }
    });

    /**
     * @route POST /passivePayment
     * @description 클라이언트의 수동 입금 처리를 담당하는 라우터입니다. 주어진 bilid(청구서 ID)와 금액(amount)를 기반으로 청구서 결제 상태를 업데이트합니다.
     * @param {Object} req - 클라이언트 요청 객체로, 요청 본문에 amount(금액), bilid(청구서 ID), index(요청 인덱스)가 포함됩니다.
     * @param {Object} res - 서버 응답 객체로, 처리 결과를 JSON 형식으로 반환합니다.
     */
    router.post([ "/passivePayment" ], async function (req, res) {
      // 응답 헤더를 설정하여 클라이언트가 요청을 올바르게 처리할 수 있도록 합니다.
      res.set({
          "Content-Type": "application/json", // 반환할 데이터 형식을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서 요청을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용할 HTTP 메서드를 설정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 클라이언트가 보낼 수 있는 헤더를 정의합니다.
      });

      try {
          // 요청 본문에 필수 정보(amount, bilid, index)가 누락된 경우 에러를 발생시킵니다.
          if (req.body.amount === undefined || req.body.bilid === undefined || req.body.index === undefined) {
              throw new Error("invalid post");
          }

          // MongoDB 연결 객체와 요청 본문에서 필요한 데이터를 가져옵니다.
          const selfMongo = instance.mongo; // MongoDB 인스턴스
          const amount = Number(req.body.amount); // 요청 본문에서 amount(금액)을 숫자로 변환하여 추출합니다.
          const bilid = req.body.bilid; // 청구서 ID
          const requestNumber = Number(req.body.index); // 요청 인덱스

          let bills; // 청구서 목록
          let thisBill; // 현재 처리 중인 청구서
          let client; // 클라이언트 정보
          let itemArr; // 청구서 항목 배열
          let payArr; // 결제 정보 배열
          let cancelArr; // 취소 정보 배열
          let payObject; // 결제 객체
          let updateQuery; // MongoDB 업데이트 쿼리
          let proofs; // 결제 증명 정보
          let message; // 알림 메시지
          let whereQuery; // MongoDB 쿼리 조건

          // 청구서 ID(bilid)를 사용하여 관련된 청구서를 가져옵니다.
          bills = await bill.getBillsByQuery({ "bilid": bilid }, { selfMongo });
          thisBill = bills[0]; // 가져온 청구서 중 첫 번째 항목을 현재 청구서로 설정합니다.

          // 청구서에 연결된 클라이언트 정보를 가져옵니다.
          client = await back.getClientById(thisBill.links.cliid, { selfMongo });
          client = client.toNormal(); // 클라이언트 정보를 일반 형식으로 변환합니다.

          // 해당 요청 번호(requestNumber)에 해당하는 청구서 항목, 결제 정보, 취소 정보를 깊은 복사합니다.
          itemArr = equalJson(JSON.stringify(thisBill.requests[Number(requestNumber)].items)); // 항목 배열을 깊은 복사
          payArr = equalJson(JSON.stringify(thisBill.requests[Number(requestNumber)].pay)); // 결제 정보 배열을 깊은 복사
          cancelArr = equalJson(JSON.stringify(thisBill.requests[Number(requestNumber)].cancel)); // 취소 정보 배열을 깊은 복사

          // 새로운 결제 객체(payObject)를 생성하고, 결제 정보를 추가합니다.
          payObject = bill.returnBillDummies("pay"); // 기본 결제 객체를 가져옵니다.
          payObject.oid = "real_" + uniqueValue("hex"); // 고유한 결제 ID(oid)를 설정합니다.
          payObject.amount = amount; // 결제 금액을 설정합니다.
          payArr.unshift(payObject); // 새로운 결제 정보를 결제 배열 앞에 추가합니다.

          // 청구서 ID를 기준으로 MongoDB에서 업데이트할 데이터를 설정합니다.
          whereQuery = { bilid: thisBill.bilid }; // 업데이트 조건으로 청구서 ID를 사용합니다.

          // 업데이트할 데이터를 정의합니다. 요청 상태를 "결제 완료"로 설정하고, 결제 정보를 추가합니다.
          updateQuery = {};
          updateQuery["requests." + String(requestNumber) + ".status"] = "결제 완료"; // 요청 상태를 결제 완료로 업데이트
          updateQuery["requests." + String(requestNumber) + ".pay"] = payArr; // 결제 정보를 업데이트

          // 결제 증명(proofs) 객체를 생성하여 필요한 정보를 추가합니다.
          proofs = bill.returnBillDummies("proofs"); // 기본 결제 증명 객체를 가져옵니다.
          proofs.method = "계좌 이체"; // 결제 방법을 계좌 이체로 설정
          proofs.proof = "이니시스"; // 결제 증명 방법을 "이니시스"로 설정
          proofs.to = client.name; // 결제 증명의 수신자를 클라이언트 이름으로 설정

          // 결제 증명 정보를 청구서 요청 항목에 추가합니다.
          thisBill.requests[requestNumber].proofs.unshift(proofs); // 결제 증명을 요청 항목에 추가
          updateQuery["requests." + String(requestNumber) + ".proofs"] = thisBill.requests[requestNumber].proofs; // MongoDB 업데이트 쿼리에 반영

          // 클라이언트에게 결제 완료 알림 메시지를 생성합니다.
          message = client.name + " 고객님이 " + proofs.method + "로 " + thisBill.requests[requestNumber].name.trim() + "을 결제하셨습니다!";

          // 결제 완료 메시지를 지정된 채널에 전송합니다.
          messageSend({ text: message, channel: "#700_operation", voice: true }).catch((err) => {
              console.log(err); // 메시지 전송 실패 시 오류를 로그에 출력합니다.
          });

          // 청구서 정보를 MongoDB에 업데이트합니다.
          await bill.updateBill([ whereQuery, updateQuery ], { selfMongo });

          // 클라이언트에게 성공적으로 처리되었음을 알립니다.
          res.send(JSON.stringify({ message: "will do" }));
      } catch (e) {
          // 오류가 발생한 경우 오류 메시지를 로그에 기록하고 클라이언트에게 오류를 전송합니다.
          logger.error(e, req).catch((e) => { console.log(e); }); // 로그에 오류 기록
          res.set("Content-Type", "application/json"); // 응답 데이터 형식을 JSON으로 설정
          res.send(JSON.stringify({ error: e.message })); // 오류 메시지를 클라이언트에 전송
      }
    });
    
    /**
     * @route POST /accountTimeSet
     * @description 고객에게 계좌 이체 안내를 전송하는 라우터입니다. 고객이 특정 금액을 입금할 때까지 대기하며, 계좌 이체 안내 정보를 MongoDB에 기록합니다.
     * @param {Object} req - 클라이언트 요청 객체로, 요청 본문에 amount(금액), name(고객 이름)이 포함됩니다.
     * @param {Object} res - 서버 응답 객체로, 처리 결과를 JSON 형식으로 반환합니다.
     */
    router.post([ "/accountTimeSet" ], async function (req, res) {
      // 클라이언트가 요청을 받아들이고, 요청에 대한 응답을 올바르게 처리할 수 있도록 응답 헤더를 설정합니다.
      res.set({
          "Content-Type": "application/json", // 반환할 데이터 형식을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용할 HTTP 메서드 목록을 설정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 클라이언트가 보낼 수 있는 헤더를 정의합니다.
      });

      // 계좌 이체 안내 정보를 저장할 MongoDB 컬렉션 이름을 정의합니다.
      const collection = "accountTransfer"; // 계좌 이체 관련 정보를 저장할 컬렉션

      try {
          // 요청 본문에 필수 값(amount 또는 name)이 포함되지 않으면 에러를 발생시킵니다.
          if (req.body.amount === undefined || req.body.name === undefined) {
              throw new Error("invalid post"); // 유효하지 않은 요청 에러 발생
          }

          // MongoDB에 연결할 로컬 인스턴스를 가져옵니다.
          const selfMongo = instance.mongolocal; 

          // equalJson을 사용해 요청 본문을 깊은 복사(deep copy)하여 amount(금액)와 name(고객 이름)을 추출합니다.
          const { amount, name } = equalJson(req.body);

          let rows, result; // 데이터를 처리하기 위한 변수들 선언

          // 고객에게 입금 안내 메시지를 전송합니다. 이 메시지는 입금이 아직 완료되지 않았음을 알립니다.
          messageSend(`${name} 고객님이 계좌에 입금을 위한 안내를 받으셨어요. 아직 입금한 건 아니에요.`, "#700_operation", true)
              .catch((err) => { throw new Error(err.message); }); // 메시지 전송 오류 시 예외 처리

          // MongoDB에 계좌 이체 정보를 저장합니다.
          await back.mongoCreate(collection, equalJson(req.body), { selfMongo }); // 요청 데이터를 MongoDB에 저장

          // 성공 메시지를 클라이언트에 응답으로 전송합니다.
          res.send(JSON.stringify({ message: "will do" }));
      } catch (e) {
          // 오류가 발생하면 오류 메시지를 로깅하고, 클라이언트에게 오류를 응답으로 전송합니다.
          logger.error(e, req).catch((e) => { console.log(e); }); // 오류 로그 기록
          res.set("Content-Type", "application/json"); // 응답 형식을 JSON으로 설정
          res.send(JSON.stringify({ error: e.message })); // 오류 메시지를 JSON으로 클라이언트에 전송
      }
    });
    
    /**
     * @route POST /designerTransfer
     * @description 디자이너에게 계좌 이체 안내를 전송하는 라우터입니다. 디자이너가 특정 결제를 위한 입금 안내를 받을 때 사용됩니다.
     * @param {Object} req - 클라이언트 요청 객체로, 요청 본문에 designer(디자이너 이름), desid(디자이너 ID), body(결제 정보)가 포함됩니다.
     * @param {Object} res - 서버 응답 객체로, 처리 결과를 JSON 형식으로 반환합니다.
     */
    router.post([ "/designerTransfer" ], async function (req, res) {

      // 응답 헤더 설정: JSON 형식으로 응답하고 CORS를 허용합니다.
      res.set({
        "Content-Type": "application/json",  // 응답 Content-Type을 JSON으로 설정
        "Access-Control-Allow-Origin": "*",  // 모든 도메인에서의 요청을 허용
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",  // 허용되는 HTTP 메서드 설정
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",  // 허용되는 헤더 설정
      });

      const collection = "designerTransfer";  // MongoDB 컬렉션 이름

      try {
        // 필수 필드가 누락되었는지 확인합니다.
        if (req.body.designer === undefined || req.body.desid === undefined || req.body.body === undefined) {
          throw new Error("invalid post");  // 필수 값이 없으면 에러 처리
        }

        // MongoDB 인스턴스 설정
        const selfMongo = instance.mongolocal;

        // 요청 본문에서 데이터를 추출합니다.
        const { designer, desid, body } = equalJson(req.body);

        // 디자이너의 ID로 디자이너 정보를 조회합니다.
        const thisDesigner = await back.getDesignerById(desid, { selfMongo: instance.mongo });

        // 메시지 전송: 디자이너에게 결제 안내 메시지를 전송합니다.
        messageSend(`${designer} 실장님이 ${body.goodname} 결제를 위해 계좌에 입금을 위한 안내를 받으셨어요. 아직 입금한 건 아니에요.`, "#700_operation", true)
          .catch((err) => { throw new Error(err.message); });

        // 카카오톡 전송: 디자이너에게 계좌 정보와 결제 금액을 카카오톡으로 전송합니다.
        kakao.sendTalk("designerAccount", designer, thisDesigner.information.phone, {
          designer,
          goodName: body.goodname,
          bankName: "기업",  // 은행 이름
          account: "049-085567-04-022",  // 계좌 번호
          to: designer,
          amount: autoComma(body.amount),  // 금액을 콤마로 구분하여 표시
        }).catch((err) => {
          console.log(err);  // 카카오톡 전송 실패 시 로그 출력
        });

        // 결제 정보를 MongoDB에 저장합니다.
        await back.mongoCreate(collection, body, { selfMongo });

        // 클라이언트에 응답 메시지 전송
        res.send(JSON.stringify({ message: "will do" }));

      } catch (e) {
        // 오류 발생 시 로그 기록 및 클라이언트에 에러 메시지 전송
        logger.error(e, req).catch((e) => { console.log(e); });
        
        // 에러 발생 시 JSON 형식으로 오류 메시지를 전송
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /accountTimeUpdate
     * @description MongoDB 컬렉션에서 조건에 맞는 데이터를 업데이트하는 라우터.
     *              클라이언트가 제공한 정보(whereQuery, updateQuery)를 기반으로 데이터를 수정하고, 전화번호에 따라 메시지를 전송합니다.
     * @param {Object} req - 클라이언트 요청 객체, whereQuery, updateQuery, name, phone 등의 정보가 포함됩니다.
     * @param {Object} res - 서버 응답 객체, JSON 형식으로 처리 결과를 반환합니다.
     * @throws {Error} MongoDB 업데이트 중 발생한 오류 또는 메시지 전송 오류가 발생할 경우 이를 처리합니다.
     */
    router.post([ "/accountTimeUpdate" ], async function (req, res) {
      // 응답의 헤더를 설정
      res.set({
        "Content-Type": "application/json",  // 응답의 Content-Type을 JSON으로 설정
        "Access-Control-Allow-Origin": "*",  // 모든 도메인에서의 접근을 허용
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",  // 허용된 HTTP 메서드를 정의
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",  // 허용된 헤더를 정의
      });

      const collection = "accountTransfer";  // 업데이트할 MongoDB 컬렉션명
      try {
        const selfMongo = instance.mongolocal;  // MongoDB의 인스턴스를 가져옴 (로컬 MongoDB 사용)
        const { whereQuery, updateQuery, name, phone } = equalJson(req.body);  // 클라이언트로부터 받은 요청 데이터를 파싱
        
        // 로그에 업데이트 요청 기록
        logger.log(`증빙 번호 업데이트 감지 => \n${JSON.stringify(whereQuery, null, 2)}\n${JSON.stringify(updateQuery, null, 2)}`)
          .catch((err) => { throw new Error(err.message); });

        // 전화번호가 010으로 시작하지 않는 경우 알림을 전송
        if (/^010/.test(phone)) {
          // 전화번호가 010으로 시작하면 아무 작업도 하지 않음
        } else {
          // 010으로 시작하지 않으면 알림 채널로 메시지 전송
          await messageSend({
            text: `${name} 고객님이 ${phone} 번호로 세금 계산서 신청을 하셨습니다!`,  // 고객명과 전화번호를 포함한 메시지
            channel: "#700_operation",  // 메시지를 보낼 슬랙 채널
            voice: true  // 음성 알림 여부
          });
        }

        // MongoDB에서 해당 whereQuery 조건을 만족하는 데이터를 updateQuery로 업데이트
        await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo });

        // 클라이언트에 성공 메시지를 JSON 형식으로 응답
        res.send(JSON.stringify({ message: "will do" }));
      } catch (e) {
        // 오류가 발생한 경우 로그에 기록하고, 클라이언트에 오류 메시지를 응답
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");  // 응답의 Content-Type을 JSON으로 설정
        res.send(JSON.stringify({ error: e.message }));  // 오류 메시지를 JSON 형식으로 응답
      }
    });
    
    /**
     * @route POST /createStylingBill
     * @description 스타일링 청구서를 생성하는 라우터입니다. 요청 본문에서 전달된 proid(프로젝트 ID)를 기반으로 청구서를 생성합니다.
     * @param {Object} req - 클라이언트 요청 객체로, 요청 본문에 proid(프로젝트 ID)가 포함됩니다.
     * @param {Object} res - 서버 응답 객체로, 처리 결과를 JSON 형식으로 반환합니다.
     */
    router.post([ "/createStylingBill" ], async function (req, res) {
      try {
          // 요청 본문에 proid(프로젝트 ID)가 포함되지 않으면 에러를 발생시킵니다.
          if (req.body.proid === undefined) {
              throw new Error("invalid post, must be { proid }"); // 유효하지 않은 요청 에러 발생
          }

          // 요청 본문에서 proid를 추출합니다.
          const { proid } = req.body;

          let option, bilidArr; // 옵션 객체와 청구서 ID 배열을 선언합니다.

          // MongoDB에 연결하기 위한 옵션 객체를 설정합니다.
          option = { selfCoreMongo: instance.mongo, selfMongo: instance.mongolocal };

          // 만약 요청 본문에 desid(디자이너 ID)가 포함되어 있으면, 옵션 객체에 추가합니다.
          if (req.body.desid !== undefined) {
              option.forceDesid = req.body.desid; // 디자이너 ID를 강제로 설정
          }

          // createStylingBill 메서드를 호출하여 스타일링 청구서를 생성하고, 생성된 청구서 ID 배열을 bilidArr에 저장합니다.
          bilidArr = await bill.createStylingBill(proid, option);

          // 응답 헤더를 설정하여 클라이언트가 요청에 대한 응답을 받을 수 있도록 합니다.
          res.set({
              "Content-Type": "application/json", // 반환할 데이터 형식을 JSON으로 설정
              "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용
              "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용할 HTTP 메서드 목록을 설정
              "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용할 요청 헤더를 설정
          });

          // 생성된 청구서 ID 배열을 JSON 형식으로 클라이언트에 응답합니다.
          res.send(JSON.stringify(bilidArr));
      } catch (e) {
          // 오류 발생 시 로그에 기록하고, 클라이언트에게 오류 메시지를 응답합니다.
          logger.error(e, req).catch((e) => { console.log(e); }); // 로그에 오류 기록
          res.set("Content-Type", "application/json"); // 응답 형식을 JSON으로 설정
          res.send(JSON.stringify({ error: e.message })); // 오류 메시지를 JSON으로 클라이언트에 전송
      }
    });
    
    /**
     * @route POST /generalBill
     * @description 일반 청구서(generalBill)를 처리하는 라우터입니다. 청구서를 생성, 읽기, 업데이트, 삭제 등의 작업을 수행합니다.
     *              요청 본문에서 mode(작업 모드)를 통해 수행할 작업을 지정합니다.
     * @param {Object} req - 클라이언트 요청 객체로, 요청 본문에 mode(작업 모드) 및 whereQuery, updateQuery 등의 정보가 포함됩니다.
     * @param {Object} res - 서버 응답 객체로, 처리 결과를 JSON 형식으로 반환합니다.
     */
    router.post([ "/generalBill" ], async function (req, res) {
      // 클라이언트가 요청을 올바르게 처리할 수 있도록 응답 헤더를 설정합니다.
      res.set({
          "Content-Type": "application/json", // 반환할 데이터 형식을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용할 HTTP 메서드를 설정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용할 요청 헤더를 설정합니다.
      });

      try {
          // 요청 본문에 mode가 정의되지 않았을 경우 에러를 발생시킵니다.
          if (req.body.mode === undefined) {
              throw new Error("must be mode => [ create, read, update, delete ]"); // mode는 필수 값입니다.
          }

          // MongoDB에서 사용할 컬렉션 이름을 정의합니다.
          const collection = "generalBill"; // 일반 청구서 컬렉션

          // 요청 본문에서 mode 값을 추출합니다.
          const { mode } = req.body;

          let selfMongo, result; // MongoDB 인스턴스와 결과를 저장할 변수를 선언합니다.
          let whereQuery, updateQuery; // whereQuery와 updateQuery 변수를 선언합니다.
          let option; // MongoDB 쿼리 옵션을 저장할 변수를 선언합니다.

          // MongoDB 로컬 인스턴스를 selfMongo로 설정합니다.
          selfMongo = instance.mongolocal;

          // mode가 "read"인 경우 청구서를 읽어오는 작업을 수행합니다.
          if (mode === "read") {
              // whereQuery가 정의되지 않았을 경우 에러를 발생시킵니다.
              if (req.body.whereQuery === undefined) {
                  throw new Error("must be whereQuery"); // whereQuery는 필수 값입니다.
              }

              // 요청 본문에서 whereQuery를 equalJson 메서드를 사용해 깊은 복사합니다.
              whereQuery = equalJson(req.body.whereQuery);

              // MongoDB 쿼리 옵션을 설정합니다.
              option = { selfMongo };

              // 요청 본문에 limit(제한)이 정의되어 있고 숫자일 경우 옵션에 limit을 추가합니다.
              if (req.body.limit !== undefined && !Number.isNaN(Number(req.body.limit))) {
                  option.limit = Number(req.body.limit); // limit 값을 설정
              }

              // whereQuery와 option을 사용하여 청구서 데이터를 조회합니다.
              result = await bill.getBillsByQuery(whereQuery, option);

          // mode가 "update"인 경우 청구서를 업데이트하는 작업을 수행합니다.
          } else if (mode === "update") {
              // whereQuery 또는 updateQuery가 정의되지 않았을 경우 에러를 발생시킵니다.
              if (req.body.whereQuery === undefined || req.body.updateQuery === undefined) {
                  throw new Error("must be whereQuery, updateQuery"); // whereQuery와 updateQuery는 필수 값입니다.
              }

              // 요청 본문에서 whereQuery와 updateQuery를 추출하여 equalJson 메서드를 사용해 깊은 복사합니다.
              ({ whereQuery, updateQuery } = equalJson(req.body));

              // whereQuery와 updateQuery를 사용하여 청구서를 업데이트합니다.
              await bill.updateBill([ whereQuery, updateQuery ], { selfMongo });

              // 성공 메시지를 결과에 저장합니다.
              result = { message: "success" };

          } else {
              // mode가 "read" 또는 "update"가 아닐 경우 에러를 발생시킵니다.
              throw new Error("must be mode => [ read, update ]");
          }

          // 처리된 결과를 클라이언트에 JSON 형식으로 응답합니다.
          res.send(JSON.stringify(result));

      } catch (e) {
          // 오류가 발생한 경우 로그에 기록하고, 클라이언트에게 오류 메시지를 JSON 형식으로 응답합니다.
          logger.error(e, req).catch((e) => { console.log(e); }); // 오류 로그 기록
          res.set("Content-Type", "application/json"); // 응답 형식을 JSON으로 설정
          res.send(JSON.stringify({ error: e.message })); // 오류 메시지를 클라이언트에 응답
      }
    });
  
    /**
     * @route POST /ghostClientBill
     * @description 고객이 가상 계좌를 발급받거나 결제를 처리하는 라우터입니다. 청구서 ID(bilid), 요청 번호(requestNumber), 결제 데이터(data)를 기반으로 처리합니다.
     *              결제가 완료되면 청구서와 결제 정보를 업데이트합니다.
     * @param {Object} req - 클라이언트 요청 객체로, 요청 본문에 bilid(청구서 ID), requestNumber(요청 번호), data(결제 정보)가 포함됩니다.
     * @param {Object} res - 서버 응답 객체로, 처리 결과를 JSON 형식으로 반환합니다.
     */
    router.post([ "/ghostClientBill" ], async function (req, res) {
      try {
          // 필수 파라미터(bilid, requestNumber, data)가 없을 경우 에러를 발생시킵니다.
          if (req.body.bilid === undefined || req.body.requestNumber === undefined || req.body.data === undefined) {
              throw new Error("invalid post"); // 유효하지 않은 요청 에러 발생
          }

          // MongoDB 로컬 인스턴스를 selfMongo로 설정합니다.
          const selfMongo = instance.mongolocal;

          // 요청 본문에서 bilid, requestNumber, data를 equalJson으로 깊은 복사하여 추출합니다.
          const { bilid, requestNumber, data } = equalJson(req.body);

          // data가 객체가 아니거나 MOID 필드가 없으면 에러를 발생시킵니다.
          if (typeof data !== "object") {
              throw new Error("invalid post: data must be object");
          }
          if (typeof data.MOID !== "string") {
              throw new Error("invalid post");
          }
          if (Number.isNaN(Number(requestNumber))) {
              throw new Error("invalid request number");
          }

          const oid = data.MOID; // 결제 고유 ID(MOID)
          const inisis = "이니시스"; // 결제 대행사 이름
          let whereQuery, updateQuery, method;
          let thisBill;
          let cliid, desid, proid;
          let client, designer, project;
          let proposal;
          let oidArr, infoArr;
          let index;
          let boo;
          let proofs;
          let projectQuery;
          let amount;
          let pureDesignFee;
          let vat, consumer;
          let classification, percentage;
          let businessMethod;
          let bankName, bankTo;
          let calculate;
          let itemArr, payArr, cancelArr;
          let itemNum, payNum, cancelNum;
          let payObject;
          let message;

          // 무시할 데이터가 아닌 경우 결제 처리를 진행합니다.
          if (data.__ignorethis__ !== 1) {

              // 청구서 ID로 청구서를 조회합니다.
              thisBill = await bill.getBillById(bilid, { selfMongo });
              if (thisBill === null) {
                  throw new Error("there is no bill"); // 청구서가 없으면 에러 발생
              }

              // 청구서에 클라이언트, 디자이너, 프로젝트 정보가 없으면 에러를 발생시킵니다.
              if (thisBill.links.cliid === undefined || thisBill.links.desid === undefined || thisBill.links.proid === undefined) {
                  throw new Error("invalid bill");
              }

              thisBill = thisBill.toNormal(); // 청구서 데이터를 일반 형식으로 변환
              cliid = thisBill.links.cliid;
              desid = thisBill.links.desid;
              proid = thisBill.links.proid;

              // 클라이언트, 디자이너, 프로젝트 정보를 MongoDB에서 조회합니다.
              client = await back.getClientById(cliid, { selfMongo: instance.mongo });
              designer = await back.getDesignerById(desid, { selfMongo: instance.mongo });
              project = await back.getProjectById(proid, { selfMongo: instance.mongo });

              // 프로젝트에서 디자이너와 관련된 제안서를 가져옵니다.
              proposal = project.selectProposal(desid);

              // 클라이언트, 디자이너, 프로젝트 정보가 없을 경우 에러 발생
              if (client === null || designer === null || project === null) {
                  throw new Error("invalid id");
              }

              // 청구서에 결제 고유 ID(oid) 배열이 있을 경우 중복을 확인하고, 중복되지 않으면 oid를 배열에 추가합니다.
              if (Array.isArray(thisBill.links.oid)) {
                  oidArr = equalJson(JSON.stringify(thisBill.links.oid)); // 깊은 복사
                  boo = false;
                  for (let o of oidArr) {
                      if (o === oid) {
                          boo = true;
                      }
                  }
                  if (!boo) {
                      oidArr.unshift(oid); // 중복되지 않으면 배열에 추가
                  }
              } else {
                  oidArr = [oid]; // oid 배열이 없으면 새로 생성
              }

              // 결제 정보 배열에 새로운 결제 데이터를 추가합니다.
              infoArr = equalJson(JSON.stringify(thisBill.requests[Number(requestNumber)].info));
              infoArr.unshift({ data });
              infoArr.unshift({ oid });

              // MongoDB 업데이트를 위한 쿼리와 데이터를 설정합니다.
              whereQuery = { bilid }; // 청구서 ID를 조건으로 설정
              updateQuery = {};
              updateQuery["links.oid"] = oidArr; // oid 배열 업데이트
              updateQuery["requests." + String(requestNumber) + ".info"] = infoArr; // 결제 정보 업데이트

              // 결제 금액을 추출하여 숫자로 변환합니다.
              amount = Number(data.TotPrice.replace(/[^0-9]/gi, ''));

              // 카드 결제 정보가 있을 경우
              if (data.CARD_BankCode !== undefined) {
                  // 청구서 항목, 결제 정보, 취소 정보를 깊은 복사하여 처리합니다.
                  itemArr = equalJson(JSON.stringify(thisBill.requests[Number(requestNumber)].items));
                  payArr = equalJson(JSON.stringify(thisBill.requests[Number(requestNumber)].pay));
                  cancelArr = equalJson(JSON.stringify(thisBill.requests[Number(requestNumber)].cancel));

                  // 새로운 결제 객체를 생성하고 결제 금액과 oid를 설정합니다.
                  payObject = bill.returnBillDummies("pay");
                  payObject.amount = amount;
                  payObject.oid = oid;
                  payArr.unshift(payObject); // 새로운 결제 정보를 배열에 추가

                  // 결제 상태를 "결제 완료"로 설정합니다.
                  updateQuery["requests." + String(requestNumber) + ".status"] = "결제 완료";

                  // 결제 배열을 업데이트합니다.
                  updateQuery["requests." + String(requestNumber) + ".pay"] = payArr;

                  // 결제 증명 정보를 생성하여 결제 방법과 증명 정보를 추가합니다.
                  proofs = bill.returnBillDummies("proofs");
                  if (/card/gi.test(data.payMethod)) {
                      if (typeof data.P_FN_NM === "string") {
                          proofs.method = "카드(" + data.P_FN_NM.replace(/카드/gi, '') + ")";
                      } else {
                          proofs.method = "카드(알 수 없음)";
                      }
                  } else {
                      proofs.method = "가상계좌";
                  }
                  proofs.proof = inisis; // 결제 대행사 정보를 추가
                  proofs.to = data.buyerName; // 결제자의 이름을 추가
                  thisBill.requests[Number(requestNumber)].proofs.unshift(proofs); // 결제 증명 정보를 추가
                  updateQuery["requests." + String(requestNumber) + ".proofs"] = thisBill.requests[Number(requestNumber)].proofs;

                  // 결제 완료 메시지를 생성하고 전송합니다.
                  message = client.name + " 고객님 (" + designer.designer + " 실장님) 이 " + proofs.method + "로 " + data.goodName.trim() + "을 결제하셨습니다!";
                  messageSend({ text: message, channel: "#700_operation", voice: true }).catch((err) => {
                      console.log(err); // 메시지 전송 오류 시 로그에 기록
                  });

                  // 청구서를 업데이트하고 결제 정보 동기화를 수행합니다.
                  await bill.updateBill([whereQuery, updateQuery], { selfMongo });
                  await instance.sync_paymentProject(bilid, requestNumber, data, amount, proofs, inisis, { thisBill, client, designer, project, proposal });

              } else {
                  // 가상계좌 결제 처리
                  if (data.REAL_Account === undefined) {
                      // 가상계좌 정보를 고객에게 전송하는 메시지를 전송합니다.
                      instance.kakao.sendTalk("virtualAccount", client.name, client.phone, {
                          client: client.name,
                          goodName: data.goodName,
                          bankName: data.vactBankName,
                          account: data.VACT_Num,
                          to: data.VACT_Name,
                          amount: autoComma(amount),
                          date: data.VACT_Date.slice(0, 4) + "년 " + data.VACT_Date.slice(4, -2) + "월 " + data.VACT_Date.slice(-2) + "일",
                      }).catch((err) => {
                          console.log(err); // 메시지 전송 오류 시 로그에 기록
                      });

                      // 가상계좌 발급 메시지를 전송합니다.
                      message = client.name + " 고객님이 " + data.goodName.trim() + " 결제를 위한 가상 계좌를 발급하셨습니다!";
                      messageSend({ text: message, channel: "#700_operation", voice: true }).catch((err) => {
                          console.log(err);
                      });

                  } else {
                      // 실계좌 결제 처리
                      instance.kakao.sendTalk("realAccount", client.name, client.phone, {
                          client: client.name,
                          goodName: data.goodName,
                          bankName: data.vactBankName,
                          account: data.VACT_Num,
                          to: data.VACT_Name,
                          amount: autoComma(amount),
                      }).catch((err) => {
                          console.log(err); // 메시지 전송 오류 시 로그에 기록
                      });
                  }

                  // 청구서를 업데이트합니다.
                  await bill.updateBill([whereQuery, updateQuery], { selfMongo });
              }

              // 성공적으로 처리되었음을 클라이언트에 응답합니다.
              res.set({
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*",
                  "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
                  "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
              });
              res.send(JSON.stringify({ message: "success" }));

          } else {
              // 데이터가 무시되는 경우에도 성공 응답을 보냅니다.
              res.set({
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*",
                  "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
                  "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
              });
              res.send(JSON.stringify({ message: "success" }));
          }
      } catch (e) {
          // 오류가 발생한 경우 오류 메시지를 로깅하고 클라이언트에게 오류 메시지를 전송합니다.
          logger.error(e, req).catch((e) => { console.log(e); }); // 오류를 로그에 기록
          res.set("Content-Type", "application/json"); // 응답 데이터 형식을 JSON으로 설정
          res.send(JSON.stringify({ error: e.message })); // 오류 메시지를 JSON 형식으로 클라이언트에 전송
      }
    });

    /**
     * @route POST /webHookVAccount
     * @description 가상 계좌 결제에 대한 웹훅을 처리하는 라우터입니다. 결제 완료 후 청구서 정보를 업데이트하고 관련 데이터를 동기화합니다.
     * @param {Object} req - 클라이언트 요청 객체로, 결제 관련 정보가 포함됩니다.
     * @param {Object} res - 서버 응답 객체로, 처리 결과를 반환합니다.
     */
    router.post([ "/webHookVAccount" ], async function (req, res) {
      try {
          // 아임포트 웹훅 URL입니다.
          const impWebhookUrl = "https://service.iamport.kr/inicis_payments/notice_vbank";

          // 결제 고유 ID(oid)와 현금 영수증 관련 정보를 요청 본문에서 추출합니다.
          const oid = req.body.no_oid; 
          const inisis = "현금 영수증"; // 결제 방식
          const bankFrom = req.body.nm_inputbank; // 입금 은행명
          const nameFrom = req.body.nm_input; // 입금자명
          const rawRequestNumber = Number(req.body.requestNumber); // 요청 번호

          let bills; // 청구서 목록
          let accountTransferCollection; // 계좌 이체 관련 데이터베이스 컬렉션
          let transferRows, transferRows2; // 계좌 이체 데이터 조회 결과
          let impId; // 아임포트 결제 ID

          // 결제 고유 ID가 "imp_"로 시작하지 않는 경우
          if (!/imp_/g.test(oid)) {

              // 결제 고유 ID로 청구서 목록을 MongoDB에서 조회합니다.
              bills = await bill.getBillsByQuery({ "links.oid": { $elemMatch: { $regex: oid } } }, { selfMongo: instance.mongolocal });

              // 청구서를 찾지 못한 경우 계좌 이체 데이터를 조회합니다.
              if (bills.length === 0) {
                  accountTransferCollection = "accountTransfer";
                  transferRows = await back.mongoRead(accountTransferCollection, { "accountInfo.no_oid": oid }, { selfMongo: instance.mongolocal });

                  // 계좌 이체 데이터가 존재하는 경우
                  if (transferRows.length > 0) {
                      transferRows2 = await back.mongoRead(accountTransferCollection, {
                          $and: [
                              { name: transferRows[0].name },
                              { phone: transferRows[0].phone },
                              { amount: transferRows[0].amount },
                              { goodname: transferRows[0].goodname },
                          ]
                      }, { selfMongo: instance.mongolocal });

                      // 가장 최근 계좌 이체 데이터를 기준으로 청구서를 조회합니다.
                      if (transferRows2.length > 0) {
                          transferRows2.sort((a, b) => { return b.date.valueOf() - a.date.valueOf(); });
                          for (let obj of transferRows2) {
                              bills = await bill.getBillsByQuery({ "links.oid": { $elemMatch: { $regex: obj.accountInfo.no_oid } } }, { selfMongo: instance.mongolocal });
                              if (bills.length !== 0) {
                                  break;
                              }
                          }

                          // 청구서를 찾지 못한 경우 에러 발생
                          if (bills.length === 0) {
                              bills = await bill.getBillsByQuery({ "bilid": transferRows[0].bilid }, { selfMongo: instance.mongolocal });
                              if (bills.length === 0) {
                                  throw new Error("invalid oid 3");
                              }
                          }
                      } else {
                          throw new Error("invalid oid 2");
                      }
                  } else {
                      throw new Error("invalid oid 1");
                  }
              }

              // 청구서에 프로젝트, 클라이언트, 디자이너 정보가 없으면 에러 발생
              if (bills[0].links.proid === undefined || bills[0].links.desid === undefined || bills[0].links.cliid === undefined) {
                  throw new Error("invalid bill");
              }

              // 청구서에서 필요한 정보를 추출합니다.
              const { proid, cliid, desid, method } = bills[0].links;
              let infoArr, index; // 결제 정보 배열
              let bilid; // 청구서 ID
              let client, designer, project, proposal; // 클라이언트, 디자이너, 프로젝트 정보
              let requestNumber; // 요청 번호
              let data; // 결제 데이터
              let thisBill; // 현재 청구서
              let amount; // 결제 금액

              // 청구서를 일반 형식으로 변환하고 필요한 정보를 추출합니다.
              thisBill = bills[0].toNormal();
              bilid = thisBill.bilid;

              // MongoDB에서 클라이언트, 디자이너, 프로젝트 정보를 조회합니다.
              client = await back.getClientById(cliid, { selfMongo: instance.mongo });
              designer = await back.getDesignerById(desid, { selfMongo: instance.mongo });
              project = await back.getProjectById(proid, { selfMongo: instance.mongo });
              proposal = project.selectProposal(desid);

              // 클라이언트, 디자이너, 프로젝트 정보가 없으면 에러 발생
              if (client === null || designer === null || project === null) {
                  throw new Error("invalid id");
              }

              // 결제 고유 ID를 기준으로 요청 번호를 찾습니다.
              requestNumber = null;
              for (let i = 0; i < thisBill.requests.length; i++) {
                  for (let obj of thisBill.requests[i].info) {
                      if (obj.oid === oid) {
                          requestNumber = i;
                          break;
                      }
                  }
              }

              // 요청 번호를 찾지 못한 경우 원시 요청 번호를 사용합니다.
              if (requestNumber === null) {
                  requestNumber = rawRequestNumber;
                  if (Number.isNaN(Number(requestNumber))) {
                      throw new Error("invalid request request number");
                  }
              }

              // 요청 정보에서 결제 데이터를 찾습니다.
              for (let obj of thisBill.requests[requestNumber].info) {
                  if (obj.data !== undefined && typeof obj.data === "object" && obj.data !== null) {
                      data = equalJson(JSON.stringify(obj.data));
                      break;
                  }
              }

              // 결제 데이터가 없으면 기본 데이터를 설정합니다.
              if (data === null || data === undefined) {
                  data = { goodName: thisBill.requests[transferRows[0].requestNumber].name };
              }

              // 결제 정보 배열을 업데이트합니다.
              infoArr = equalJson(JSON.stringify(thisBill.requests[requestNumber].info));
              infoArr.unshift({ virtualAccount: equalJson(JSON.stringify(req.body)) });

              // MongoDB 업데이트 쿼리와 데이터를 설정합니다.
              whereQuery = { bilid };
              updateQuery = {};
              updateQuery["requests." + String(requestNumber) + ".info"] = infoArr;

              // 결제 금액을 추출합니다.
              amount = Number(equalJson(JSON.stringify(req.body)).amt_input.replace(/[^0-9]/gi, ''));

              // 청구서 항목, 결제 정보, 취소 정보를 깊은 복사하여 처리합니다.
              itemArr = equalJson(JSON.stringify(thisBill.requests[Number(requestNumber)].items));
              payArr = equalJson(JSON.stringify(thisBill.requests[Number(requestNumber)].pay));
              cancelArr = equalJson(JSON.stringify(thisBill.requests[Number(requestNumber)].cancel));

              // 결제 객체를 생성하고 결제 정보를 추가합니다.
              payObject = bill.returnBillDummies("pay");
              payObject.oid = oid;
              payObject.amount = amount;
              payArr.unshift(payObject);

              // 결제 상태를 "결제 완료"로 업데이트합니다.
              updateQuery["requests." + String(requestNumber) + ".status"] = "결제 완료";
              updateQuery["requests." + String(requestNumber) + ".pay"] = payArr;

              // 결제 증명(proofs) 정보를 생성하여 결제 방식을 설정합니다.
              proofs = bill.returnBillDummies("proofs");

              if (!(typeof req.body.real_account === "string")) {
                  if (typeof bankFrom === "string") {
                      proofs.method = "무통장 입금(" + bankFrom.replace(/은행/gi, '') + ")";
                  } else {
                      proofs.method = "무통장 입금(알 수 없음)";
                  }
              } else {
                  proofs.method = "계좌 이체";
              }

              proofs.proof = inisis; // 결제 증명 정보를 설정
              proofs.to = nameFrom; // 입금자 이름을 설정
              thisBill.requests[requestNumber].proofs.unshift(proofs); // 결제 증명 정보를 추가
              updateQuery["requests." + String(requestNumber) + ".proofs"] = thisBill.requests[requestNumber].proofs;

              // 결제 완료 메시지를 생성하고 전송합니다.
              message = client.name + " 고객님 (" + designer.designer + " 실장님) 이 " + proofs.method + "로 " + data.goodName.trim() + "을 결제하셨습니다!";
              messageSend({ text: message, channel: "#700_operation", voice: true }).catch((err) => {
                  console.log(err);
              });

              // 청구서와 결제 정보를 업데이트하고 프로젝트 결제 정보를 동기화합니다.
              await bill.updateBill([whereQuery, updateQuery], { selfMongo: instance.mongolocal });
              await instance.sync_paymentProject(bilid, requestNumber, data, amount, proofs, inisis, { thisBill, client, designer, project, proposal });

          } else {
              // 아임포트 결제 ID를 가져와 아임포트 API를 통해 결제 정보를 조회합니다.
              const impId = req.body.no_oid;
              const { data: { response: { access_token: accessToken } } } = (await requestSystem("https://api.iamport.kr/users/getToken", {
                  imp_key: address.officeinfo.import.key,
                  imp_secret: address.officeinfo.import.secret
              }, { headers: { "Content-Type": "application/json" } }));

              const { data: { response: paymentData } } = await requestSystem("https://api.iamport.kr/payments/" + impId, {}, {
                  method: "get",
                  headers: { "Authorization": accessToken }
              });

              // 결제 고유 ID를 설정하고 결제 상태를 확인합니다.
              const oid = paymentData.merchant_uid;

              if (/dreg_/g.test(oid)) {
                  const [ oidConst, aspid0, aspid1 ] = oid.split("_");
                  const aspid = aspid0 + "_" + aspid1;

                  // 결제 상태가 완료된 경우 결제 정보를 동기화합니다.
                  if (/paid/g.test(paymentData.status)) {
                      if (paymentData.pay_method === "card") {
                          await requestSystem("https://" + address.officeinfo.host + ":3002/aspirantPayment", {
                              aspid,
                              mode: "card",
                              status: "paid"
                          }, { headers: { "Content-Type": "application/json" } });
                      } else {
                          await requestSystem("https://" + address.officeinfo.host + ":3002/aspirantPayment", {
                              aspid,
                              mode: "vbank",
                              status: "paid"
                          }, { headers: { "Content-Type": "application/json" } });
                      }
                  } else {
                      if (paymentData.pay_method !== "card") {
                          await requestSystem("https://" + address.officeinfo.host + ":3002/aspirantPayment", {
                              aspid,
                              mode: "vbank",
                              status: "paid"
                          }, { headers: { "Content-Type": "application/json" } });
                      }
                  }
              }
          }

          // 성공적으로 처리되었음을 응답합니다.
          res.set({ "Content-Type": "text/plain" });
          res.send("OK");

      } catch (e) {
          // 오류가 발생한 경우 오류를 로그에 기록하고, 실패 메시지를 응답합니다.
          logger.error(e, req).catch((e) => { console.log(e); });
          res.set({ "Content-Type": "text/plain" });
          res.send("FAIL");
      }
    });
    
    /**
     * @route POST /designerSelect
     * @description 특정 프로젝트(proid)에 대해 지정된 디자이너(desid)를 선택하는 라우터입니다.
     *              클라이언트에서 proid(프로젝트 ID)와 desid(디자이너 ID)를 제공하여 해당 디자이너를 프로젝트에 지정합니다.
     * @param {Object} req - 클라이언트 요청 객체로, 요청 본문에 proid(프로젝트 ID)와 desid(디자이너 ID)가 포함됩니다.
     * @param {Object} res - 서버 응답 객체로, 처리 결과를 JSON 형식으로 반환합니다.
     */
    router.post([ "/designerSelect" ], async function (req, res) {
      try {
          // 요청 본문에 proid(프로젝트 ID) 또는 desid(디자이너 ID)가 포함되지 않으면 에러를 발생시킵니다.
          if (req.body.proid === undefined || req.body.desid === undefined) {
              // 유효하지 않은 요청에 대한 에러 메시지를 발생시키고, 요청 본문을 포함하여 로그에 기록합니다.
              throw new Error("invalid post, must be proid / desid : " + JSON.stringify(req.body, null, 2));
          }

          // MongoDB의 로컬 인스턴스를 selfMongo로 설정합니다.
          const selfMongo = instance.mongolocal;

          // 요청 본문에서 proid(프로젝트 ID)와 desid(디자이너 ID)를 추출하고, equalJson으로 깊은 복사하여 사용합니다.
          const { proid, desid } = equalJson(req.body);

          // bill.designerSelect 메서드를 호출하여 프로젝트에 디자이너를 지정합니다.
          await bill.designerSelect(proid, desid, { selfMongo });

          // 응답 헤더를 설정하여 클라이언트가 요청에 대한 응답을 받을 수 있도록 설정합니다.
          res.set({
              "Content-Type": "application/json", // 반환할 데이터 형식을 JSON으로 설정합니다.
              "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용합니다.
              "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용할 HTTP 메서드 목록을 설정합니다.
              "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용할 요청 헤더를 설정합니다.
          });

          // 성공 메시지를 클라이언트에게 JSON 형식으로 응답합니다.
          res.send(JSON.stringify({ message: "success" }));

      } catch (e) {
          // 오류가 발생한 경우 오류 메시지를 로그에 기록하고, 클라이언트에게 오류 메시지를 응답합니다.
          logger.error(e, req).catch((e) => { console.log(e); }); // 오류 로그 기록
          res.set("Content-Type", "application/json"); // 응답 형식을 JSON으로 설정
          res.send(JSON.stringify({ error: e.message })); // 오류 메시지를 클라이언트에 응답
      }
    });
    
    /**
     * @route POST /travelInjection
     * @description 출장비 관련 결제 정보를 처리하는 라우터입니다. injectionCase, proid, method, number 등의 정보가 필요합니다.
     * @param {Object} req - 클라이언트 요청 객체로, 요청 본문에 injectionCase(케이스), proid(프로젝트 ID), method(결제 방법), number(횟수)가 포함됩니다.
     * @param {Object} res - 서버 응답 객체로, 처리 결과를 JSON 형식으로 반환합니다.
     */
    router.post([ "/travelInjection" ], async function (req, res) {
      try {
        // 필수 필드가 요청 본문에 포함되지 않았는지 확인합니다.
        if (req.body.injectionCase === undefined || req.body.proid === undefined || req.body.method === undefined || req.body.number === undefined) {
          throw new Error("invalid post");  // 필수 값이 누락된 경우 에러 발생
        }

        // MongoDB 인스턴스 설정
        const selfMongo = instance.mongolocal;

        // 요청 본문에서 데이터를 추출하고 equalJson을 사용해 깊은 복사를 합니다.
        const { injectionCase, proid, method, number: rawNumber } = equalJson(req.body);

        // 요청된 number 값을 숫자 형식으로 변환
        const number = Number(rawNumber);

        // 결제 정보를 처리하기 위해 travelInjection 메서드를 호출
        const thisBill = await bill.travelInjection(injectionCase, proid, method, number, { selfMongo });

        // 응답 헤더를 설정하여 CORS 허용 및 JSON 형식으로 응답
        res.set({
          "Content-Type": "application/json",  // 응답 형식을 JSON으로 설정
          "Access-Control-Allow-Origin": "*",  // 모든 도메인에서의 요청을 허용
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",  // 허용되는 HTTP 메서드 설정
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",  // 허용되는 헤더 설정
        });

        // 처리된 결제 정보를 클라이언트에 JSON 형식으로 반환
        res.send(JSON.stringify(thisBill.toNormal()));

      } catch (e) {
        // 오류 발생 시 로그 기록
        logger.error(e, req).catch((e) => { console.log(e); });

        // 오류 메시지를 클라이언트에 JSON 형식으로 전송
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /travelEjection
     * @description 출장비 관련 결제 정보를 취소하는 라우터입니다. injectionCase, proid, method, index 등의 정보가 필요합니다.
     * @param {Object} req - 클라이언트 요청 객체로, 요청 본문에 injectionCase(케이스), proid(프로젝트 ID), method(결제 방법), index(인덱스)가 포함됩니다.
     * @param {Object} res - 서버 응답 객체로, 처리 결과를 JSON 형식으로 반환합니다.
     */
    router.post([ "/travelEjection" ], async function (req, res) {

      try {
        // 요청 본문에 필수 필드들이 모두 포함되었는지 확인합니다.
        if (req.body.injectionCase === undefined || req.body.proid === undefined || req.body.method === undefined || req.body.index === undefined) {
          throw new Error("invalid post");  // 필수 값이 없을 경우 에러 발생
        }

        // MongoDB 인스턴스 설정
        const selfMongo = instance.mongolocal;

        // 요청 본문에서 필요한 데이터를 추출합니다. equalJson을 사용해 깊은 복사를 수행
        const { injectionCase, proid, method, index: rawIndex } = equalJson(req.body);

        // index 값을 숫자로 변환합니다.
        const index = Number(rawIndex);

        // 여행 결제 취소 관련 정보를 처리하기 위해 travelEjection 메서드를 호출
        const thisBill = await bill.travelEjection(injectionCase, proid, method, index, { selfMongo });

        // 응답 헤더 설정: JSON 형식으로 응답하고 CORS를 허용
        res.set({
          "Content-Type": "application/json",  // 응답 형식 JSON으로 설정
          "Access-Control-Allow-Origin": "*",  // 모든 도메인에서 요청 허용
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",  // 허용되는 HTTP 메서드 설정
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",  // 허용되는 헤더 설정
        });

        // 처리된 결제 취소 정보를 클라이언트에 JSON 형식으로 반환
        res.send(JSON.stringify(thisBill.toNormal()));

      } catch (e) {
        // 오류 발생 시 로그 기록 및 응답 처리
        logger.error(e, req).catch((e) => { console.log(e); });

        // 에러 발생 시 에러 메시지를 JSON 형식으로 응답
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /travelUpDown
     * @description 출장비 관련 결제 정보를 수정하는 라우터입니다. order, proid, method, index 등의 정보가 필요합니다.
     * @param {Object} req - 클라이언트 요청 객체로, 요청 본문에 order(상태 변경 명령), proid(프로젝트 ID), method(결제 방법), index(인덱스)가 포함됩니다.
     * @param {Object} res - 서버 응답 객체로, 처리 결과를 JSON 형식으로 반환합니다.
     */
    router.post([ "/travelUpDown" ], async function (req, res) {
      try {
        // 요청 본문에 필수 값들이 포함되어 있는지 확인
        if (req.body.order === undefined || req.body.proid === undefined || req.body.method === undefined || req.body.index === undefined) {
          throw new Error("invalid post");  // 필수 값이 없으면 에러 발생
        }

        // MongoDB 인스턴스 설정
        const selfMongo = instance.mongolocal;

        // 요청 본문에서 필요한 데이터 추출 (equalJson을 사용해 깊은 복사 수행)
        const { order, proid, method, index: rawIndex } = equalJson(req.body);

        // index 값을 숫자로 변환
        const index = Number(rawIndex);

        // 출장비 결제 상태를 변경하는 메서드 호출
        const thisBill = await bill.travelUpDown(order, proid, method, index, { selfMongo });

        // 응답 헤더 설정: JSON 형식으로 응답하고 CORS를 허용
        res.set({
          "Content-Type": "application/json",  // 응답 형식으로 JSON 설정
          "Access-Control-Allow-Origin": "*",  // 모든 도메인에서 요청 허용
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",  // 허용되는 HTTP 메서드 설정
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",  // 허용되는 헤더 설정
        });

        // 처리된 결제 상태 정보를 클라이언트에 JSON 형식으로 반환
        res.send(JSON.stringify(thisBill.toNormal()));

      } catch (e) {
        // 오류 발생 시 로그 기록 및 응답 처리
        logger.error(e, req).catch((e) => { console.log(e); });

        // 에러 발생 시 에러 메시지를 JSON 형식으로 응답
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /travelReconfig
     * @description 출장비 결제 관련 정보를 재구성하는 라우터입니다. injectionCase, proid, method, index, number 등의 정보가 필요합니다.
     * @param {Object} req - 클라이언트 요청 객체로, 요청 본문에 injectionCase(케이스), proid(프로젝트 ID), method(결제 방법), index(인덱스), number(금액)이 포함됩니다.
     * @param {Object} res - 서버 응답 객체로, 처리 결과를 JSON 형식으로 반환합니다.
     */
    router.post([ "/travelReconfig" ], async function (req, res) {
      try {
        // 요청 본문에 필요한 값들이 있는지 확인
        if (req.body.injectionCase === undefined || req.body.proid === undefined || req.body.method === undefined || req.body.index === undefined || req.body.number === undefined) {
          throw new Error("invalid post");  // 필수 값이 없으면 오류 발생
        }

        // MongoDB 인스턴스 설정
        const selfMongo = instance.mongolocal;

        // 요청 본문에서 필요한 데이터 추출 (equalJson을 사용해 깊은 복사 수행)
        const { injectionCase, proid, method, index: rawIndex, number: rawNumber } = equalJson(req.body);

        // index와 number 값을 숫자로 변환
        const index = Number(rawIndex);
        const number = Number(rawNumber);

        // 출장비 결제 정보를 재구성하는 메서드 호출
        const thisBill = await bill.travelReconfig(injectionCase, proid, method, index, number, { selfMongo });

        // 응답 헤더 설정: JSON 형식으로 응답하고 CORS를 허용
        res.set({
          "Content-Type": "application/json",  // 응답 형식으로 JSON 설정
          "Access-Control-Allow-Origin": "*",  // 모든 도메인에서 요청 허용
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",  // 허용되는 HTTP 메서드 설정
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",  // 허용되는 헤더 설정
        });

        // 재구성된 결제 정보를 클라이언트에 JSON 형식으로 반환
        res.send(JSON.stringify(thisBill.toNormal()));

      } catch (e) {
        // 오류 발생 시 로그 기록 및 응답 처리
        logger.error(e, req).catch((e) => { console.log(e); });

        // 에러 발생 시 에러 메시지를 JSON 형식으로 응답
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /serviceConverting
     * @description 프로젝트의 서비스 변경을 처리하는 라우터입니다. 프로젝트 ID(proid), 방법(method), 서비스 ID(serid)를 기반으로 서비스 변환을 처리합니다.
     *              요청에 따라 새 가격을 설정할 수 있으며, 추가 비용 발생 시 고객에게 알림톡을 보냅니다.
     * @param {Object} req - 클라이언트 요청 객체로, 요청 본문에 proid(프로젝트 ID), method(변경 방법), serid(서비스 ID) 및 추가 정보가 포함됩니다.
     * @param {Object} res - 서버 응답 객체로, 처리 결과를 반환합니다.
     */
    router.post([ "/serviceConverting" ], async function (req, res) {
      try {
          // 필수 파라미터(proid, method, serid)가 없으면 에러를 발생시킵니다.
          if (req.body.proid === undefined || req.body.method === undefined || req.body.serid === undefined) {
              throw new Error("invalid post"); // 유효하지 않은 요청 에러 발생
          }

          // MongoDB 로컬 인스턴스를 selfMongo로 설정합니다.
          const selfMongo = instance.mongolocal;

          // 요청 본문에서 proid, method, serid를 equalJson으로 깊은 복사한 후 추출합니다.
          const { proid, method, serid } = equalJson(req.body);

          // MongoDB에서 프로젝트와 클라이언트 정보를 가져옵니다.
          const project = await back.getProjectById(proid, { selfMongo: instance.mongo });
          const client = await back.getClientById(project.cliid, { selfMongo: instance.mongo });

          // 프로젝트 계약의 첫 번째 계산 금액을 추출합니다.
          const firstContract = project.process.contract.first.calculation.amount;

          // 과거 서비스 데이터를 복사하여 저장합니다.
          const pastService = equalJson(JSON.stringify(project.service));

          // 상수 값으로 410을 설정합니다.
          const timeConst = 410;

          let report, map; // 리포트와 맵 데이터를 저장할 변수
          let newPrice, confirmMode; // 새로운 가격과 확인 모드 여부를 저장할 변수

          // 요청 본문에 mode가 "confirm"이면 확인 모드로 동작합니다.
          if (req.body.mode === "confirm") {

              confirmMode = true; // 확인 모드를 true로 설정

              // 새 가격이 정의되지 않았으면 기본 서비스 변환을 수행합니다.
              if (req.body.newPrice === undefined) {
                  report = await bill.serviceConverting(proid, method, serid, { selfMongo, selfCoreMongo: instance.mongo, confirmMode });
              } else {
                  // 새 가격이 숫자가 아니면 에러를 발생시킵니다.
                  if (Number.isNaN(Number(req.body.newPrice))) {
                      throw new Error("must be newPrice(number) in confirm mode"); // 유효하지 않은 가격 에러 발생
                  }
                  // 새 가격을 반올림하여 설정하고 서비스 변환을 수행합니다.
                  newPrice = Math.round(Number(req.body.newPrice));
                  report = await bill.serviceConverting(proid, method, serid, { selfMongo, selfCoreMongo: instance.mongo, newPrice, confirmMode });
              }

              // 응답 헤더를 설정하고 리포트를 JSON 형식으로 반환합니다.
              res.set({
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*",
                  "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
                  "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
              });
              res.send(JSON.stringify(report));

          } else {
              // 새 가격이 정의되어 있으면 해당 가격을 반올림하여 서비스 변환을 수행합니다.
              if (req.body.newPrice !== undefined && !Number.isNaN(Number(req.body.newPrice))) {
                  newPrice = Math.round(Number(req.body.newPrice));
                  report = await bill.serviceConverting(proid, method, serid, { selfMongo, selfCoreMongo: instance.mongo, newPrice });
              } else {
                  // 새 가격이 없으면 기본 서비스 변환을 수행합니다.
                  report = await bill.serviceConverting(proid, method, serid, { selfMongo, selfCoreMongo: instance.mongo });
              }

              // 변환 후 프로젝트의 변경 사항을 맵(map) 배열로 저장합니다.
              map = [
                  {
                      column: "service",
                      position: "service",
                      pastValue: report.service.from,
                      finalValue: report.service.to,
                  },
                  {
                      column: "remainSupply",
                      position: "process.contract.remain.calculation.amount.supply",
                      pastValue: report.request.from.supply,
                      finalValue: report.request.to.supply,
                  },
                  {
                      column: "remainVat",
                      position: "process.contract.remain.calculation.amount.vat",
                      pastValue: report.request.from.vat,
                      finalValue: report.request.to.vat,
                  },
                  {
                      column: "remainConsumer",
                      position: "process.contract.remain.calculation.amount.consumer",
                      pastValue: report.request.from.consumer,
                      finalValue: report.request.to.consumer,
                  },
                  {
                      column: "remainPure",
                      position: "process.contract.remain.calculation.amount.consumer",
                      pastValue: report.request.from.consumer - firstContract,
                      finalValue: report.request.to.consumer - firstContract,
                  },
                  {
                      column: "paymentsTotalAmount",
                      position: "process.calculation.payments.totalAmount",
                      pastValue: report.response.from.total,
                      finalValue: report.response.to.total,
                  },
                  {
                      column: "paymentsFirstAmount",
                      position: "process.calculation.payments.first.amount",
                      pastValue: report.response.from.first,
                      finalValue: report.response.to.first,
                  },
                  {
                      column: "paymentsRemainAmount",
                      position: "process.calculation.payments.remain.amount",
                      pastValue: report.response.from.remain,
                      finalValue: report.response.to.remain,
                  },
              ];

              // 추가 요청이 있는 경우 카카오톡 알림톡을 전송하고 관련 메시지를 전송합니다.
              if (report.request.additional) {
                  await kakao.sendTalk("plusDesignFee", client.name, client.phone, {
                      client: client.name,
                      pastservice: serviceParsing(report.service.from),
                      newservice: serviceParsing(report.service.to),
                      total: autoComma(Math.abs(report.request.from.consumer - report.request.to.consumer)),
                      host: address.officeinfo.host + ":3002",
                      path: "estimation",
                      cliid: client.cliid,
                      needs: "style," + project.desid + "," + proid + "," + (report.service.to.online ? "online" : "offline"),
                  }).catch((err) => {
                      console.log(err); // 알림톡 전송 실패 시 에러 로그 기록
                  });
                  messageSend({ text: client.name + " 고객님의 추가 디자인비 요청 알림톡을 전송했어요!", channel: "#700_operation", voice: true }).catch((err) => {
                      console.log(err); // 메시지 전송 실패 시 로그에 기록
                  });
              }

              // 응답 헤더를 설정하고 성공 메시지를 JSON 형식으로 반환합니다.
              res.set({
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*",
                  "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
                  "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
              });
              res.send(JSON.stringify({ message: "success" }));

          }
      } catch (e) {
          // 오류가 발생한 경우 로그에 기록하고, 클라이언트에게 오류 메시지를 반환합니다.
          logger.error(e, req).catch((e) => { console.log(e); });
          res.set("Content-Type", "application/json");
          res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /designerConverting
     * @description 프로젝트에 할당된 디자이너를 변경하는 라우터입니다. 프로젝트 ID(proid), 변경할 방법(method), 새 디자이너 ID(desid)를 기반으로 디자이너를 변경합니다.
     *              필요 시 추가 디자인 비용이 발생할 경우 고객에게 알림톡을 전송합니다.
     * @param {Object} req - 클라이언트 요청 객체로, 요청 본문에 proid(프로젝트 ID), method(변경 방법), desid(새 디자이너 ID)가 포함됩니다.
     * @param {Object} res - 서버 응답 객체로, 처리 결과를 JSON 형식으로 반환합니다.
     */
    router.post([ "/designerConverting" ], async function (req, res) {
      try {
          // 필수 파라미터(proid, method, desid)가 없으면 에러를 발생시킵니다.
          if (req.body.proid === undefined || req.body.method === undefined || req.body.desid === undefined) {
              throw new Error("invalid post"); // 유효하지 않은 요청 에러 발생
          }

          // MongoDB의 로컬 인스턴스를 selfMongo로 설정합니다.
          const selfMongo = instance.mongolocal;

          // 요청 본문에서 proid, method, desid를 equalJson으로 깊은 복사한 후 추출합니다.
          const { proid, method, desid } = equalJson(req.body);

          // MongoDB에서 프로젝트와 클라이언트 정보를 가져옵니다. 프로젝트는 toNormal()로 일반 형식으로 변환합니다.
          const project = (await back.getProjectById(proid, { selfMongo: instance.mongo })).toNormal();
          const client = await back.getClientById(project.cliid, { selfMongo: instance.mongo });

          // MongoDB에서 현재 디자이너와 새 디자이너 정보를 가져옵니다.
          const pastDesigner = await back.getDesignerById(project.desid, { selfMongo: instance.mongo });
          const designer = await back.getDesignerById(desid, { selfMongo: instance.mongo });

          // 프로젝트 계약의 첫 번째 계산 금액을 추출합니다.
          const firstContract = project.process.contract.first.calculation.amount;

          // 디자이너 변경 작업을 수행하고 결과를 리포트에 저장합니다.
          const report = await bill.designerConverting(proid, method, desid, { selfMongo, selfCoreMongo: instance.mongo });

          // 변경 후 새로운 프로젝트 정보를 가져와서 일반 형식으로 변환합니다.
          const newProject = (await back.getProjectById(proid, { selfMongo: instance.mongo })).toNormal();

          // 추가 요청이 있는 경우 고객에게 알림톡을 전송하고 관련 메시지를 전송합니다.
          if (report.request.additional) {
              await kakao.sendTalk("plusDesignerFee", client.name, client.phone, {
                  client: client.name,
                  pastdesigner: pastDesigner.designer, // 이전 디자이너 이름
                  newdesigner: designer.designer, // 새 디자이너 이름
                  host: address.officeinfo.host + ":3002", // 호스트 주소
                  total: autoComma(Math.abs(report.request.from.consumer - report.request.to.consumer)), // 총액
                  path: "estimation", // 경로
                  cliid: client.cliid, // 클라이언트 ID
                  needs: "style," + project.desid + "," + proid + "," + (report.service.to.online ? "online" : "offline"), // 필요한 정보
              }).catch((err) => {
                  console.log(err); // 알림톡 전송 실패 시 에러 로그 기록
              });

              // 추가 디자인비 요청 알림톡 전송 후 메시지를 전송합니다.
              messageSend({ text: client.name + " 고객님의 추가 디자인비 요청 알림톡을 전송했어요!", channel: "#700_operation", voice: true }).catch((err) => {
                  console.log(err); // 메시지 전송 실패 시 로그에 기록
              });
          }

          // 응답 헤더를 설정하고 성공 메시지를 JSON 형식으로 반환합니다.
          res.set({
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
              "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
          });
          res.send(JSON.stringify({ message: "success" }));

      } catch (e) {
          // 오류가 발생한 경우 로그에 기록하고, 클라이언트에게 오류 메시지를 반환합니다.
          logger.error(e, req).catch((e) => { console.log(e); });
          res.set("Content-Type", "application/json");
          res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /amountConverting
     * @description 특정 청구서(bilid)를 기반으로 금액 변환 작업을 수행하는 라우터입니다. 청구서 ID(bilid)를 사용하여 MongoDB에서 청구서 데이터를 조회한 후,
     *              금액 변환 작업을 수행하고 그 결과를 클라이언트에 응답합니다.
     * @param {Object} req - 클라이언트 요청 객체로, 요청 본문에 bilid(청구서 ID)가 포함됩니다.
     * @param {Object} res - 서버 응답 객체로, 처리 결과를 JSON 형식으로 반환합니다.
     */
    router.post([ "/amountConverting" ], async function (req, res) {
      // 응답 헤더를 설정하여 클라이언트가 요청을 처리할 수 있도록 설정합니다.
      res.set({
          "Content-Type": "application/json", // 반환할 데이터 형식을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 요청을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용할 HTTP 메서드 목록을 설정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용할 요청 헤더를 설정합니다.
      });

      try {
          // 요청 본문에 bilid(청구서 ID)가 포함되지 않으면 에러를 발생시킵니다.
          if (req.body.bilid === undefined) {
              throw new Error("invalid post"); // 유효하지 않은 요청 에러 발생
          }

          // MongoDB의 로컬 인스턴스를 selfMongo로 설정합니다.
          const selfMongo = instance.mongolocal;

          // 요청 본문에서 bilid(청구서 ID)를 equalJson으로 깊은 복사한 후 추출합니다.
          const { bilid } = equalJson(req.body);

          // 청구서 ID를 기반으로 금액 변환 작업을 수행합니다.
          await bill.amountConverting(bilid, { selfMongo, selfCoreMongo: instance.mongo });

          // 성공 메시지를 JSON 형식으로 클라이언트에 응답합니다.
          res.send(JSON.stringify({ message: "success" }));

      } catch (e) {
          // 오류가 발생한 경우 로그에 기록하고, 클라이언트에게 오류 메시지를 반환합니다.
          logger.error(e, req).catch((e) => { console.log(e); }); // 로그에 오류 기록
          res.set("Content-Type", "application/json"); // 응답 데이터 형식을 JSON으로 설정
          res.send(JSON.stringify({ error: e.message })); // 오류 메시지를 JSON으로 클라이언트에 전송
      }
    });
    
    /**
     * @route POST /requestRefund
     * @description 특정 청구서(bilid)와 요청된 결제 방식(kind)을 기반으로 환불 처리를 수행하는 라우터입니다. 카드, 가상계좌, 현금 환불을 지원하며 요청에 따라 환불 금액, 계좌 정보 등을 설정할 수 있습니다.
     * @param {Object} req - 클라이언트 요청 객체로, 요청 본문에 kind(환불 방식), bilid(청구서 ID), requestIndex(요청 인덱스), payIndex(결제 인덱스) 및 추가 정보가 포함됩니다.
     * @param {Object} res - 서버 응답 객체로, 처리 결과를 JSON 형식으로 반환합니다.
     */
    router.post([ "/requestRefund" ], async function (req, res) {
      // 클라이언트 요청에 대한 응답 헤더를 설정합니다.
      res.set({
          "Content-Type": "application/json", // 반환할 데이터 형식을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용할 HTTP 메서드를 설정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 클라이언트 요청에 대한 허용 헤더 설정
      });

      try {
          // 요청 본문에 필수 필드가 존재하지 않으면 에러를 발생시킵니다.
          if (req.body.kind === undefined || req.body.bilid === undefined || req.body.requestIndex === undefined || req.body.payIndex === undefined) {
              throw new Error("invalid post 0"); // 필수 필드 누락 시 에러 발생
          }

          // MongoDB 로컬 인스턴스를 selfMongo로 설정합니다.
          const selfMongo = instance.mongolocal;

          // 요청 본문에서 kind(환불 방식), bilid(청구서 ID)를 equalJson으로 깊은 복사한 후 추출합니다.
          const { kind, bilid } = equalJson(req.body);

          // 요청 인덱스와 결제 인덱스를 숫자로 변환합니다.
          const requestIndex = Number(req.body.requestIndex);
          const payIndex = Number(req.body.payIndex);

          // kind 필드가 유효한 환불 방식인지 확인합니다.
          if (!([ "cardEntire", "cardPartial", "vaccountEntire", "vaccountPartial", "cashEntire", "cashPartial" ]).includes(kind)) {
              throw new Error("invalid post, kind must be: [ cardEntire, cardPartial, vaccountEntire, vaccountPartial, cashEntire, cashPartial ]");
          }

          // 요청 인덱스와 결제 인덱스가 유효한 숫자인지 확인합니다.
          if (Number.isNaN(requestIndex) || Number.isNaN(payIndex)) {
              throw new Error("invalid post 1");
          }

          let refundPrice; // 환불 금액
          let report, option, client, designer, project, pastProject, proid; // 리포트, 옵션, 클라이언트, 디자이너, 프로젝트, 과거 프로젝트 정보
          let timeConst, map; // 시간 상수 및 맵핑 변수

          // 환불 금액이 제공된 경우 처리합니다.
          if (req.body.refundPrice !== undefined) {
              refundPrice = Number(req.body.refundPrice);
              if (refundPrice === 0 || Number.isNaN(refundPrice)) {
                  refundPrice = null; // 유효하지 않은 금액일 경우 null로 설정
              }
          } else {
              refundPrice = null; // 환불 금액이 정의되지 않은 경우
          }

          // MongoDB 옵션을 설정합니다.
          option = { selfMongo, selfCoreMongo: instance.mongo };

          // 퍼센트 값이 요청에 존재하는 경우 처리합니다.
          if (req.body.percentage !== undefined) {
              if (typeof req.body.percentage === "string") {
                  if (!Number.isNaN(Number(req.body.percentage.replace(/[^0-9\.]/gi, '')))) {
                      option.percentage = Number(req.body.percentage); // 퍼센트 값을 숫자로 변환
                  }
              } else if (typeof req.body.percentage === "number") {
                  if (!Number.isNaN(req.body.percentage)) {
                      option.percentage = Number(req.body.percentage); // 퍼센트 값이 숫자인 경우 처리
                  }
              }
          }

          // 계좌 정보가 제공된 경우 옵션에 추가합니다.
          if (req.body.accountNumber !== undefined && req.body.bankName !== undefined && req.body.accountName !== undefined) {
              option.accountNumber = req.body.accountNumber;
              option.bankName = req.body.bankName;
              option.accountName = req.body.accountName;
          }

          // 환불 금액이 유효한 경우 옵션에 추가합니다.
          if (refundPrice !== undefined && refundPrice !== null) {
              if (typeof refundPrice === "number") {
                  option.refundPrice = refundPrice;
              }
          }

          // 현금 환불이 아닌 경우
          if (!/^cash/i.test(kind)) {
              // bill.requestRefund 메서드를 사용해 환불 요청을 처리합니다.
              report = await bill.requestRefund(kind, bilid, requestIndex, payIndex, option);

              // 환불 로그를 기록합니다.
              await messageLog("환불 감지: " + JSON.stringify(report, null, 2));

              // 청구서, 과거 프로젝트, 현재 프로젝트, 클라이언트 정보를 일반 형식으로 변환합니다.
              report.bill = report.bill.toNormal();
              report.pastProject = report.pastProject.toNormal();
              report.project = report.project.toNormal();
              report.client = report.client.toNormal();

              // 클라이언트, 프로젝트 및 디자이너 정보를 가져옵니다.
              client = report.client;
              pastProject = report.pastProject;
              project = report.project;
              proid = project.proid;
              designer = await back.getDesignerById(report.desid, { selfMongo: instance.mongo });

              // 카카오톡 알림을 전송하여 환불 완료를 알립니다.
              kakao.sendTalk((/card/gi.test(kind) ? "refundCard" : "refundVAccount"), client.name, client.phone, {
                  client: client.name,
                  designer: designer.designer,
                  percentage: (!Number.isNaN(Number(report.price.percentage)) ? report.price.percentage : 100),
                  amount: report.price.refund
              }).then(() => {
                  return messageSend({ text: client.name + " 고객님의 환불 요청이 완료되었습니다!", channel: "#700_operation", voice: true });
              }).catch((err) => {
                  console.log(err); // 알림톡 전송 실패 시 에러 로그 기록
              });

              // 처리된 결과를 클라이언트에게 JSON 형식으로 반환합니다.
              res.send(JSON.stringify(report));

          } else {
              // 현금 환불 처리
              if (req.body.mode === undefined || req.body.mode === null || req.body.mode === "request") {
                  // 현금 환불 요청 모드
                  report = await bill.cashRefund("request", bilid, requestIndex, payIndex, option);
              } else if (req.body.mode === "execute") {
                  // 현금 환불 실행 모드
                  report = await bill.cashRefund("execute", bilid, requestIndex, payIndex, option);

                  // 클라이언트와 디자이너 정보를 가져와 환불 완료 알림을 전송합니다.
                  client = report.client;
                  designer = await back.getDesignerById(report.desid, { selfMongo: instance.mongo });

                  // 환불 완료 알림톡을 전송합니다.
                  kakao.sendTalk("refundVAccount", client.name, client.phone, {
                      client: client.name,
                      designer: designer.designer,
                      percentage: (!Number.isNaN(Number(report.price.percentage)) ? report.price.percentage : 100),
                      amount: report.price.refund
                  }).then(() => {
                      return messageSend({ text: client.name + " 고객님의 환불 요청이 완료되었습니다!", channel: "#700_operation", voice: true });
                  }).catch((err) => {
                      console.log(err); // 알림톡 전송 실패 시 로그에 기록
                  });
              }

              // 성공적으로 처리되었는지 확인 후 클라이언트에 응답합니다.
              if (report.message === "success") {
                  res.send(JSON.stringify(report));
              } else {
                  throw new Error(report.message); // 처리 실패 시 에러 발생
              }
          }
      } catch (e) {
          // 오류가 발생한 경우 로그에 기록하고, 클라이언트에게 오류 메시지를 반환합니다.
          logger.error(e, req).catch((e) => { console.log(e); }); // 로그에 오류 기록
          res.set("Content-Type", "application/json"); // 응답 데이터 형식을 JSON으로 설정
          res.send(JSON.stringify({ error: e.message })); // 오류 메시지를 JSON으로 클라이언트에 전송
      }
    });
    
    /**
     * @route POST /contractCancel
     * @description 특정 청구서(bilid)를 기반으로 계약을 취소하는 라우터입니다. 청구서 ID(bilid)를 기반으로 MongoDB에서 관련 데이터를 가져와 계약 취소 처리를 수행합니다.
     * @param {Object} req - 클라이언트 요청 객체로, 요청 본문에 bilid(청구서 ID)가 포함됩니다.
     * @param {Object} res - 서버 응답 객체로, 처리 결과를 JSON 형식으로 반환합니다.
     */
    router.post([ "/contractCancel" ], async function (req, res) {
      // 클라이언트 요청에 대한 응답 헤더를 설정합니다.
      res.set({
          "Content-Type": "application/json", // 반환할 데이터 형식을 JSON으로 설정
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서 접근을 허용
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용할 HTTP 메서드를 설정
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용할 요청 헤더를 설정
      });

      try {
          // 요청 본문에 bilid(청구서 ID)가 없으면 에러를 발생시킵니다.
          if (req.body.bilid === undefined) {
              throw new Error("invalid post"); // 유효하지 않은 요청 에러 발생
          }

          // MongoDB의 로컬 인스턴스를 selfMongo로 설정합니다.
          const selfMongo = instance.mongolocal;

          // 요청 본문에서 bilid(청구서 ID)를 equalJson으로 깊은 복사한 후 추출합니다.
          const { bilid } = equalJson(req.body);

          let report, option, project, pastProject, proid; // 리포트, 옵션, 프로젝트, 과거 프로젝트, 프로젝트 ID 변수 선언
          let timeConst, map; // 시간 상수와 맵 변수 선언

          // MongoDB 옵션을 설정합니다.
          option = { selfMongo, selfCoreMongo: instance.mongo };

          // 계약 취소 작업을 수행하고 리포트에 저장합니다.
          report = await bill.contractCancel(bilid, option);

          // 리포트 내 청구서, 과거 프로젝트, 현재 프로젝트 데이터를 일반 형식으로 변환합니다.
          report.bill = report.bill.toNormal();
          report.pastProject = report.pastProject.toNormal();
          report.project = report.project.toNormal();

          // 과거 프로젝트와 현재 프로젝트 정보를 저장합니다.
          pastProject = report.pastProject;
          project = report.project;
          proid = project.proid; // 프로젝트 ID 추출

          // 처리된 리포트를 JSON 형식으로 클라이언트에 응답합니다.
          res.send(JSON.stringify(report));

      } catch (e) {
          // 오류가 발생한 경우 로그에 기록하고, 클라이언트에게 오류 메시지를 반환합니다.
          logger.error(e, req).catch((e) => { console.log(e); }); // 오류를 로그에 기록
          res.set("Content-Type", "application/json"); // 응답 데이터 형식을 JSON으로 설정
          res.send(JSON.stringify({ error: e.message })); // 오류 메시지를 JSON으로 클라이언트에 반환
      }
    });
    
    /**
     * @route POST /returnBankCode
     * @description 은행 코드를 반환하는 라우터입니다. 요청에 따라 서버에 저장된 은행 코드 데이터를 JSON 형식으로 반환합니다.
     * @param {object} req - 클라이언트 요청 객체. 요청 본문은 필요하지 않습니다.
     * @param {object} res - 서버 응답 객체. 은행 코드 데이터를 JSON 형식으로 반환합니다.
     */
    router.post([ "/returnBankCode" ], async function (req, res) {
      // 응답 헤더 설정: JSON 형식 및 CORS 설정을 추가합니다.
      res.set({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });

      try {
          // instance에서 bankCode 객체를 가져옵니다. 이 객체는 은행 코드 정보를 담고 있습니다.
          const bankCode = instance.bankCode;

          // 은행 코드를 JSON 형식으로 클라이언트에 반환합니다.
          res.send(JSON.stringify(bankCode));

      } catch (e) {
          // 에러가 발생한 경우 에러 로그를 기록하고, 클라이언트에 에러 메시지를 반환합니다.
          logger.error(e, req).catch((e) => { console.log(e); });
          res.set("Content-Type", "application/json");

          // 에러 메시지를 JSON 형식으로 클라이언트에 전송합니다.
          res.send(JSON.stringify({ error: e.message }));
      }
    });

    /**
     * @route POST /storeServerLog
     * @description 서버 로그를 읽고, 처리 후 MongoDB에 저장한 후, 로그 파일을 초기화하는 라우터입니다.
     *              서버 로그는 여러 서버에서 수집되며, 각 서버 로그 파일은 개별적으로 처리됩니다.
     * @param {object} req - 클라이언트 요청 객체.
     * @param {object} res - 서버 응답 객체. 로그 처리 결과를 반환합니다.
     */
    router.post([ "/storeServerLog" ], async function (req, res) {
      // 응답 헤더에 JSON 형식과 CORS 설정을 추가합니다.
      res.set({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });

      try {
          // 로그 출력을 위한 구분선입니다.
          const bar = "============================================================";

          // 로그를 저장할 MongoDB 컬렉션 이름을 설정합니다.
          const collection = "serverLog";

          // MongoDB 인스턴스를 가져옵니다.
          const selfMongo = instance.mongo;

          // 서버 로그 파일이 저장된 폴더 경로를 설정합니다.
          const rawLogTargetFolder = "/home/ubuntu/.pm2/logs";

          // 로그 폴더에서 파일 목록을 읽어옵니다.
          const rawLogFolderList = await fileSystem("readFolder", [rawLogTargetFolder]);

          // 서버별 로그 파일을 관리하는 객체를 설정합니다.
          const serverLogDictionary = {
              staticLounge: {
                  name: "robot",  // staticLounge 서버 이름
                  files: [],      // staticLounge 관련 로그 파일 목록
              },
              dataConsole: {
                  name: "robot2",  // dataConsole 서버 이름
                  files: [],       // dataConsole 관련 로그 파일 목록
              },
              transferLounge: {
                  name: "robot3",  // transferLounge 서버 이름
                  files: [],       // transferLounge 관련 로그 파일 목록
              }
          };

          let fileContents; // 로그 파일 내용을 저장할 변수
          let packetContents, packetDate, packetPlace;  // 로그의 각 패킷 내용, 날짜, 위치를 저장할 변수
          let logPacketJson;  // 로그 패킷을 JSON 형태로 저장할 변수
          let logPacketTong;  // 로그 패킷들을 저장할 배열

          // dataConsole 서버의 로그 파일 목록을 필터링합니다.
          serverLogDictionary.dataConsole.files = rawLogFolderList.filter((s) => { return /^robot2-out/g.test(s) });

          // 로그 파일의 내용을 초기화합니다.
          fileContents = "";
          for (let fileName of serverLogDictionary.dataConsole.files) {
              // 각 로그 파일의 내용을 읽어와 fileContents에 추가합니다.
              fileContents += (await fileSystem("readString", [rawLogTargetFolder + "/" + fileName]));
          }

          // 로그 패킷을 저장할 배열을 초기화합니다.
          logPacketTong = [];

          // 로그 파일에서 구분선을 기준으로 패킷을 분리하고 처리합니다.
          fileContents.replace(new RegExp(bar, "gi"), bar + "₩").replace(new RegExp(bar + "₩(" + "[^₩]+)", "gi"), (match, p1) => {
              packetContents = bar + p1;  // 패킷 내용을 저장합니다.
              try {
                  // 패킷에서 날짜 정보를 추출합니다.
                  packetDate = /[0-9]+\-[0-9]+\-[0-9]+T[0-9]+\:[0-9]+\:[^Z]+Z/gi.exec(packetContents)[0];
                  packetDate = new Date(packetDate);  // 문자열을 Date 객체로 변환합니다.

                  // 패킷의 서버 위치를 설정합니다.
                  packetPlace = "dataConsole";

                  // 패킷 정보를 JSON 객체로 변환합니다.
                  logPacketJson = {
                      date: packetDate,        // 패킷의 날짜
                      server: packetPlace,     // 서버 위치
                      contents: packetContents // 패킷 내용
                  };

                  // 패킷을 로그 패킷 배열에 추가합니다.
                  logPacketTong.push(logPacketJson);
              } catch {}  // 패킷 처리 중 오류가 발생하면 무시합니다.
              return "";
          });

          // MongoDB에 로그 패킷을 저장합니다.
          for (let j of logPacketTong) {
              await back.mongoCreate(collection, j, { selfMongo });
          }

          // 로그 파일 내용을 초기화합니다. (빈 문자열로 덮어씁니다.)
          for (let fileName of serverLogDictionary.dataConsole.files) {
              await fileSystem("writeString", [rawLogTargetFolder + "/" + fileName, ""]);
          }

          // staticLounge 서버의 로그 파일 목록을 필터링합니다.
          serverLogDictionary.staticLounge.files = rawLogFolderList.filter((s) => { return /^robot-out/g.test(s) });

          // 로그 파일 내용을 초기화합니다.
          fileContents = "";
          for (let fileName of serverLogDictionary.staticLounge.files) {
              fileContents += (await fileSystem("readString", [rawLogTargetFolder + "/" + fileName]));
          }

          // 로그 패킷을 다시 초기화합니다.
          logPacketTong = [];

          // 로그 파일에서 패킷을 분리하고 처리합니다.
          fileContents.replace(new RegExp(bar, "gi"), bar + "₩").replace(new RegExp(bar + "₩(" + "[^₩]+)", "gi"), (match, p1) => {
              packetContents = bar + p1;
              try {
                  packetDate = /[0-9]+\-[0-9]+\-[0-9]+T[0-9]+\:[0-9]+\:[^Z]+Z/gi.exec(packetContents)[0];
                  packetDate = new Date(packetDate);
                  packetPlace = "staticLounge";
                  logPacketJson = {
                      date: packetDate,
                      server: packetPlace,
                      contents: packetContents
                  };
                  logPacketTong.push(logPacketJson);
              } catch {}
              return "";
          });

          // MongoDB에 staticLounge 서버의 로그 패킷을 저장합니다.
          for (let j of logPacketTong) {
              await back.mongoCreate(collection, j, { selfMongo });
          }

          // staticLounge 로그 파일을 초기화합니다.
          for (let fileName of serverLogDictionary.staticLounge.files) {
              await fileSystem("writeString", [rawLogTargetFolder + "/" + fileName, ""]);
          }

          // transferLounge 서버의 로그 파일 목록을 필터링합니다.
          serverLogDictionary.transferLounge.files = rawLogFolderList.filter((s) => { return /^robot3-out/g.test(s) });

          // 로그 파일 내용을 초기화합니다.
          fileContents = "";
          for (let fileName of serverLogDictionary.transferLounge.files) {
              fileContents += (await fileSystem("readString", [rawLogTargetFolder + "/" + fileName]));
          }

          // 로그 패킷을 다시 초기화합니다.
          logPacketTong = [];

          // 로그 파일에서 패킷을 분리하고 처리합니다.
          fileContents.replace(new RegExp(bar, "gi"), bar + "₩").replace(new RegExp(bar + "₩(" + "[^₩]+)", "gi"), (match, p1) => {
              packetContents = bar + p1;
              try {
                  packetDate = /[0-9]+\-[0-9]+\-[0-9]+T[0-9]+\:[0-9]+\:[^Z]+Z/gi.exec(packetContents)[0];
                  packetDate = new Date(packetDate);
                  packetPlace = "transferLounge";
                  logPacketJson = {
                      date: packetDate,
                      server: packetPlace,
                      contents: packetContents
                  };
                  logPacketTong.push(logPacketJson);
              } catch {}
              return "";
          });

          // MongoDB에 transferLounge 서버의 로그 패킷을 저장합니다.
          for (let j of logPacketTong) {
              await back.mongoCreate(collection, j, { selfMongo });
          }

          // transferLounge 로그 파일을 초기화합니다.
          for (let fileName of serverLogDictionary.transferLounge.files) {
              await fileSystem("writeString", [rawLogTargetFolder + "/" + fileName, ""]);
          }

          // 로그 처리 완료 후 성공 메시지를 클라이언트에 반환합니다.
          res.send(JSON.stringify({ message: "success" }));
      } catch (e) {
          // 에러가 발생한 경우 로그를 기록하고 클라이언트에게 에러 메시지를 반환합니다.
          logger.error(e, req).catch((e) => { console.log(e); });
          res.set("Content-Type", "application/json");
          res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /designerCalculation
     * @description 클라이언트 또는 프로젝트 ID를 기반으로 디자이너의 계산(수수료 및 총계)을 수행하여 결과를 반환하는 라우터입니다.
     *              요청 본문에는 공급가, 분류, 퍼센티지, 그리고 클라이언트 또는 프로젝트 ID가 포함되어야 합니다.
     * @param {object} req - 클라이언트 요청 객체. 요청 본문에는 supply(공급가), classification(분류), percentage(퍼센티지), cliid(클라이언트 또는 프로젝트 ID)가 포함됩니다.
     * @param {object} res - 서버 응답 객체. 계산된 수수료 또는 총계를 반환합니다.
     */
    router.post([ "/designerCalculation" ], async function (req, res) {
      // 응답 헤더에 JSON 형식과 CORS 설정을 추가합니다.
      res.set({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });

      try {
          // 요청 본문에 필요한 필드가 모두 존재하는지 확인합니다.
          if (req.body.supply === undefined || req.body.classification === undefined || req.body.percentage === undefined || req.body.cliid === undefined) {
              throw new Error("invaild post");  // 필수 필드가 없을 경우 에러를 발생시킵니다.
          }

          // 요청 본문에서 equalJson 메서드를 사용하여 깊은 복사된 데이터를 추출합니다.
          // equalJson은 Date 객체를 포함한 모든 데이터를 정확하게 복사해주는 JSON.parse 업그레이드 버전입니다.
          const { classification, cliid } = equalJson(req.body);

          // 공급가와 퍼센티지를 숫자로 변환합니다.
          const supply = Number(req.body.supply);
          const percentage = Number(req.body.percentage);

          let calculate, commission;  // 계산 결과와 수수료를 저장할 변수
          let project, client;  // 프로젝트와 클라이언트 정보를 저장할 변수

          // 클라이언트 또는 프로젝트 ID가 "c"로 시작하는 경우 클라이언트 정보를 가져옵니다.
          if (/^c/.test(cliid)) {
              // MongoDB에서 해당 클라이언트 ID로 클라이언트 정보를 가져옵니다.
              client = await back.getClientById(cliid, { selfMongo: instance.mongo });

              // 클라이언트 정보가 없는 경우 에러를 발생시킵니다.
              if (client === null) {
                  throw new Error("invaild cliid");
              }
          } 
          // 클라이언트 또는 프로젝트 ID가 "p"로 시작하는 경우 프로젝트 정보를 가져옵니다.
          else if (/^p/.test(cliid)) {
              // MongoDB에서 해당 프로젝트 ID로 프로젝트 정보를 가져옵니다.
              project = await back.getProjectById(cliid, { selfMongo: instance.mongo });

              // 프로젝트 정보가 없는 경우 에러를 발생시킵니다.
              if (project === null) {
                  throw new Error("invaild proid");
              }

              // 프로젝트에 연결된 클라이언트 정보를 가져옵니다.
              client = await back.getClientById(project.cliid, { selfMongo: instance.mongo });

              // 클라이언트 정보가 없는 경우 에러를 발생시킵니다.
              if (client === null) {
                  throw new Error("invaild cliid");
              }
          } 
          // 그 외의 경우 유효하지 않은 cliid로 에러를 발생시킵니다.
          else {
              throw new Error("invaild cliid");
          }

          // bill.designerCalculation 메서드를 호출하여 디자이너 계산을 수행합니다.
          // supply(공급가), classification(분류), percentage(퍼센티지), client 정보를 인자로 넘겨줍니다.
          // toArray 옵션을 사용하여 배열로 결과를 반환합니다.
          [ calculate, commission ] = bill.designerCalculation(supply, classification, percentage, client, { toArray: true });

          // 요청 모드가 "commission"일 경우, 수수료만 응답으로 반환합니다.
          if (req.body.mode === "commission") {
              res.send(JSON.stringify({ commission }));
          } 
          // 요청 모드가 "total"일 경우, 총계와 수수료를 응답으로 반환합니다.
          else if (req.body.mode === "total") {
              res.send(JSON.stringify({ calculate, commission }));
          } 
          // 그 외의 경우, 계산된 총계만 응답으로 반환합니다.
          else {
              res.send(JSON.stringify({ calculate }));
          }
      } catch (e) {
          // 에러가 발생한 경우 로그를 기록하고 클라이언트에게 에러 메시지를 응답합니다.
          logger.error(e, req).catch((e) => { console.log(e); });
          res.set("Content-Type", "application/json");
          res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /returnDummy
     * @description 지정된 컬렉션과 주제에 대한 더미 데이터를 반환하는 라우터입니다.
     * @param {object} req - 클라이언트 요청 객체.
     * @param {object} res - 서버 응답 객체.
     */
    router.post([ "/returnDummy" ], async function (req, res) {
      // 응답 헤더 설정: JSON 형식 응답, CORS 허용
      res.set({
        "Content-Type": "application/json", // 응답 데이터 형식을 JSON으로 설정
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서 접근 허용
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용할 HTTP 메서드 설정
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용할 요청 헤더 설정
      });

      try {
        // 요청 바디에 collection 또는 subject 필드가 없으면 오류 발생
        if (req.body.collection === undefined || req.body.subject === undefined) {
          throw new Error("invaild post : must be { collection, subject }"); // 필수 값 누락 시 오류 처리
        }

        // 요청 바디에서 collection과 subject 값을 추출
        const { collection, subject } = req.body;

        // bill 객체의 returnDummies 메서드를 호출해 더미 데이터를 가져옴
        const dummy = bill.returnDummies(collection, subject);

        // 가져온 더미 데이터를 JSON 형식으로 클라이언트에 응답
        res.send(JSON.stringify(dummy));

      } catch (e) {
        // 오류 발생 시 로그에 기록하고 클라이언트에 오류 메시지를 응답
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json"); // 오류 응답도 JSON 형식으로 설정
        res.send(JSON.stringify({ error: e.message })); // 오류 메시지 반환
      }
    });
    
    /**
     * @route POST /taxBill
     * @description 세금 계산서를 발행하는 비동기 요청을 처리하는 라우터입니다. 요청이 들어오면 `bill.taxBill` 메서드를 호출하여 세금 계산서 발행 절차를 처리합니다.
     * @param {object} req - 클라이언트 요청 객체. 요청 본문에는 추가적인 정보가 포함될 수 있습니다.
     * @param {object} res - 서버 응답 객체. 세금 계산서 발행 절차가 시작되었음을 알리는 메시지를 반환합니다.
     */
    router.post([ "/taxBill" ], async function (req, res) {
      // 응답 헤더에 JSON 형식과 CORS 설정을 추가합니다.
      res.set({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });

      try {
          // 세금 계산서 발행을 위한 bill 객체의 taxBill 메서드를 호출합니다.
          // 비동기 메서드이므로 catch 블록을 통해 에러를 처리합니다.
          bill.taxBill().catch((err) => {
              // 에러 발생 시 에러 로그를 기록합니다.
              logger.error(err, req).catch((e) => { console.log(e); });
          });

          // 세금 계산서 발행 요청이 정상적으로 접수되었음을 클라이언트에 알립니다.
          res.send(JSON.stringify({ message: "will do" }));
      } catch (e) {
          // 에러가 발생한 경우 로그를 기록하고 클라이언트에게 에러 메시지를 응답합니다.
          logger.error(e, req).catch((e) => { console.log(e); });
          res.set("Content-Type", "application/json");
          res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /weeklyCalculation
     * @description 주간 디자이너 계산을 수행하는 라우터입니다. 주간 계산 작업이 완료되면 성공 로그를 기록하고, 오류가 발생하면 오류 로그를 기록합니다.
     * @param {Object} req - 클라이언트 요청 객체로, 요청 본문에 추가 정보가 포함될 수 있습니다.
     * @param {Object} res - 서버 응답 객체로, 처리 결과를 JSON 형식으로 반환합니다.
     */
    router.post([ "/weeklyCalculation" ], async function (req, res) {
      // 클라이언트 요청에 대한 응답 헤더를 설정합니다.
      res.set({
          "Content-Type": "application/json", // 반환할 데이터 형식을 JSON으로 설정
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서 접근을 허용
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용할 HTTP 메서드를 설정
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용할 요청 헤더를 설정
      });

      try {
          // 디자이너 계산 작업을 비동기적으로 수행합니다.
          work.designerCalculation()
              .then(() => {
                  // 계산 작업이 성공적으로 완료되면 성공 로그를 기록합니다.
                  return logger.cron("weeklyCalculation success");
              })
              .catch((e) => {
                  // 계산 작업 중 오류가 발생하면 오류 로그를 기록합니다.
                  logger.error(e, req).catch((e) => { console.log(e); });
              });

          // 클라이언트에게 작업이 실행 중임을 알리는 메시지를 JSON 형식으로 응답합니다.
          res.send(JSON.stringify({ message: "will do" }));

      } catch (e) {
          // try 블록에서 발생한 오류를 기록하고 클라이언트에게 오류 메시지를 반환합니다.
          logger.error(e, req).catch((e) => { console.log(e); }); // 오류 로그 기록
          res.set("Content-Type", "application/json"); // 응답 데이터 형식을 JSON으로 설정
          res.send(JSON.stringify({ error: e.message })); // 오류 메시지를 JSON 형식으로 반환
      }
    });
    
    /**
     * @route POST /nonPaidResponses
     * @description 디자이너의 미지급 응답 내역을 처리하는 라우터입니다. 디자이너의 계산서를 확인하여 미지급된 부분을 반환합니다.
     * @param {Object} req - 클라이언트 요청 객체.
     * @param {Object} res - 서버 응답 객체로, 처리 결과를 JSON 형식으로 반환합니다.
     */
    router.post([ "/nonPaidResponses" ], async function (req, res) {

      // 응답 헤더 설정: JSON 형식으로 응답하고 CORS를 허용합니다.
      res.set({
        "Content-Type": "application/json",  // 응답 Content-Type을 JSON으로 설정
        "Access-Control-Allow-Origin": "*",  // 모든 도메인에서의 요청을 허용
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",  // 허용되는 HTTP 메서드를 설정
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",  // 허용되는 헤더를 설정
      });

      try {
        // 디자이너 계산 내역에서 미지급 응답을 처리하는 메서드 호출
        const result = await work.designerCalculation(false);  // false는 미지급된 항목만을 대상으로 합니다.

        // 처리된 결과를 JSON 형식으로 클라이언트에 응답
        res.send(JSON.stringify(result));

      } catch (e) {
        // 오류 발생 시 로그 기록 및 클라이언트에게 에러 메시지 전송
        logger.error(e, req).catch((e) => { console.log(e); });  // 에러를 기록합니다.
        
        // 에러 발생 시 JSON 형식으로 오류 메시지 반환
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));  // 에러 메시지를 JSON 형식으로 전송
      }
    });
    
    /**
     * @route POST /excuteResponse
     * @description 청구서(bilid)의 응답(response)을 처리하는 라우터입니다. 청구서 ID, 응답 인덱스, 결제 날짜를 사용하여 청구서와 프로젝트 데이터를 업데이트하고, 
     *              선금 또는 잔금 결제 완료 시 디자이너에게 알림톡을 전송합니다.
     * @param {Object} req - 클라이언트 요청 객체로, bilid(청구서 ID), responseIndex(응답 인덱스), date(결제 날짜)가 포함됩니다.
     * @param {Object} res - 서버 응답 객체로, 처리 결과를 JSON 형식으로 반환합니다.
     */
    router.post([ "/excuteResponse" ], async function (req, res) {
      // 클라이언트 요청에 대한 응답 헤더를 설정합니다.
      res.set({
          "Content-Type": "application/json", // 반환할 데이터 형식을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 요청을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용할 HTTP 메서드 목록을 설정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용할 요청 헤더를 설정합니다.
      });

      try {
          // 필수 파라미터가 없을 경우 에러를 발생시킵니다.
          if (req.body.bilid === undefined || req.body.responseIndex === undefined || req.body.date === undefined) {
              throw new Error("invalid post"); // 유효하지 않은 요청 에러 발생
          }

          // 요청 본문에서 bilid, responseIndex, date를 equalJson으로 깊은 복사한 후 추출합니다.
          let { bilid, responseIndex, date } = equalJson(req.body);

          let thisBill; // 현재 처리 중인 청구서
          let oid; // 고유 ID
          let method; // 결제 방식
          let proid; // 프로젝트 ID
          let thisProject; // 현재 프로젝트
          let thisResponse; // 현재 응답
          let pay, name, target; // 결제 정보, 이름, 대상
          let whereQuery, updateQuery; // MongoDB에서 사용할 쿼리
          let projectWhereQuery, projectUpdateQuery; // 프로젝트 관련 쿼리
          let amount; // 결제 금액
          let type; // 결제 유형(선금 또는 잔금)
          let thisClient, thisDesigner; // 클라이언트, 디자이너 정보

          // 응답 인덱스를 숫자로 변환하고 유효한 값인지 확인합니다.
          responseIndex = Number(responseIndex);
          if (Number.isNaN(responseIndex)) {
              throw new Error("invalid post"); // 유효하지 않은 응답 인덱스일 경우 에러 발생
          }

          // 청구서 ID를 사용하여 해당 청구서를 MongoDB에서 가져옵니다.
          thisBill = await bill.getBillById(bilid, { selfMongo: instance.mongolocal });

          // 응답 인덱스가 유효하지 않으면 에러를 발생시킵니다.
          if (thisBill.responses[responseIndex] === undefined) {
              throw new Error("invalid index");
          }

          // 응답 정보에서 필요한 값을 추출합니다.
          oid = ""; // 고유 ID는 빈 문자열로 초기화
          method = "계좌 이체"; // 결제 방식은 기본적으로 계좌 이체로 설정
          proid = thisBill.links.proid; // 청구서에서 프로젝트 ID를 추출
          thisProject = await back.getProjectById(proid, { selfMongo: instance.mongo }); // 프로젝트 정보를 MongoDB에서 가져옴

          // 현재 응답 데이터를 가져옵니다.
          thisResponse = thisBill.responses[responseIndex];
          ({ pay, name, target } = thisResponse); // 결제 정보, 이름, 대상 추출

          // 응답 항목에서 결제 금액을 계산합니다.
          amount = Math.floor(thisResponse.items.reduce((acc, curr) => acc + curr.amount.pure, 0)); // 순수 금액 합산

          // MongoDB 업데이트를 위한 쿼리 설정
          whereQuery = { bilid };
          updateQuery = {};

          // 결제 배열이 비어 있을 경우 새 결제 정보와 증명 정보를 추가합니다.
          if (pay.length === 0) {
              updateQuery["responses." + String(responseIndex) + ".pay"] = [ { amount, date, oid } ]; // 새 결제 정보 추가
              updateQuery["responses." + String(responseIndex) + ".proofs"] = [ { date, method, proof: thisProject.process.calculation.info.proof, to: thisProject.process.calculation.info.to } ]; // 증명 정보 추가
          } else if (pay.length === 1) {
              // 결제 배열에 이미 데이터가 있는 경우 기존 데이터를 업데이트합니다.
              updateQuery["responses." + String(responseIndex) + ".pay." + String(0) + ".amount"] = amount;
              updateQuery["responses." + String(responseIndex) + ".pay." + String(0) + ".date"] = date;
              updateQuery["responses." + String(responseIndex) + ".proofs." + String(0) + ".date"] = date;
              updateQuery["responses." + String(responseIndex) + ".proofs." + String(0) + ".method"] = method;
              updateQuery["responses." + String(responseIndex) + ".proofs." + String(0) + ".proof"] = thisProject.process.calculation.info.proof;
              updateQuery["responses." + String(responseIndex) + ".proofs." + String(0) + ".to"] = thisProject.process.calculation.info.to;
          } else {
              // 결제 배열이 두 개 이상인 경우 다시 첫 번째 결제로 설정합니다.
              updateQuery["responses." + String(responseIndex) + ".pay"] = [ { amount, date, oid } ];
              updateQuery["responses." + String(responseIndex) + ".proofs"] = [ { date, method, proof: thisProject.process.calculation.info.proof, to: thisProject.process.calculation.info.to } ];
          }

          // 청구서 정보를 MongoDB에서 업데이트합니다.
          await bill.updateBill([ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });

          // 업데이트된 청구서를 다시 가져옵니다.
          thisBill = await bill.getBillById(bilid, { selfMongo: instance.mongolocal });

          // 선금 또는 잔금에 대한 결제라면 관련 프로젝트 정보를 업데이트합니다.
          if (/홈리에종 선금/gi.test(name) || /홈리에종 잔금/gi.test(name)) {

              // 프로젝트 업데이트를 위한 쿼리 설정
              projectWhereQuery = { proid };
              projectUpdateQuery = {};

              // 선금 결제일 경우
              if (/홈리에종 선금/gi.test(name)) {
                  projectUpdateQuery["process.calculation.payments.first.amount"] = Math.floor(amount); // 선금 금액 설정
                  projectUpdateQuery["process.calculation.payments.first.date"] = date; // 선금 결제 날짜 설정
                  projectUpdateQuery["process.calculation.payments.remain.amount"] = Math.floor(thisProject.process.calculation.payments.totalAmount - amount); // 잔액 설정
                  type = "first"; // 결제 유형을 선금으로 설정
              } else if (/홈리에종 잔금/gi.test(name)) {
                  // 잔금 결제일 경우
                  projectUpdateQuery["process.calculation.payments.remain.amount"] = Math.floor(amount); // 잔금 금액 설정
                  projectUpdateQuery["process.calculation.payments.remain.date"] = date; // 잔금 결제 날짜 설정
                  type = "remain"; // 결제 유형을 잔금으로 설정
              }

              // 프로젝트 정보를 업데이트합니다.
              await back.updateProject([ projectWhereQuery, projectUpdateQuery ], { selfMongo: instance.mongo });

              // 업데이트된 프로젝트와 클라이언트, 디자이너 정보를 가져옵니다.
              thisProject = await back.getProjectById(proid, { selfMongo: instance.mongo });
              thisClient = await back.getClientById(thisProject.cliid, { selfMongo: instance.mongo });
              thisDesigner = await back.getDesignerById(thisResponse.target.id, { selfMongo: instance.mongo });

              // 선금 또는 잔금에 따라 디자이너에게 알림톡을 전송합니다.
              if (type === "first") {
                  await kakao.sendTalk("paymentFirstDesigner", thisDesigner.designer, thisDesigner.information.phone, {
                      designer: thisDesigner.designer,
                      client: thisClient.name,
                      host: address.frontinfo.host,
                      proid: thisProject.proid,
                  });
                  await messageSend({ text: thisDesigner.designer + " 실장님께 선금 정산 완료 알림을 보냈습니다!", channel: "#700_operation", voice: false });
              } else {
                  await kakao.sendTalk("paymentRemainDesigner", thisDesigner.designer, thisDesigner.information.phone, {
                      designer: thisDesigner.designer,
                      client: thisClient.name,
                      host: address.frontinfo.host,
                      proid: thisProject.proid,
                  });
                  await messageSend({ text: thisDesigner.designer + " 실장님께 잔금 정산 완료 알림을 보냈습니다!", channel: "#700_operation", voice: false });
              }

          }

          // 처리 결과를 클라이언트에게 응답합니다.
          res.send(JSON.stringify({
              message: "success",
              bilid,
              proid,
              bill: thisBill.toNormal(),
              project: thisProject.toNormal(),
          }));

      } catch (e) {
          // 오류가 발생한 경우 로그에 기록하고, 클라이언트에게 오류 메시지를 반환합니다.
          logger.error(e, req).catch((e) => { console.log(e); });
          res.set("Content-Type", "application/json");
          res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /excuteRepay
     * @description 청구서(bilid)의 응답(response)에 대해 환불 처리를 수행하는 라우터입니다. 청구서 ID, 응답 인덱스, 결제 날짜 및 금액을 사용하여 청구서와 프로젝트 데이터를 업데이트하고, 선금 또는 잔금 환불을 처리합니다.
     * @param {Object} req - 클라이언트 요청 객체로, bilid(청구서 ID), responseIndex(응답 인덱스), date(결제 날짜), amount(환불 금액)가 포함됩니다.
     * @param {Object} res - 서버 응답 객체로, 처리 결과를 JSON 형식으로 반환합니다.
     */
    router.post([ "/excuteRepay" ], async function (req, res) {
      // 클라이언트 요청에 대한 응답 헤더를 설정합니다.
      res.set({
          "Content-Type": "application/json", // 반환할 데이터 형식을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용할 HTTP 메서드를 설정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용할 요청 헤더를 설정합니다.
      });

      try {
          // 필수 파라미터가 없을 경우 에러를 발생시킵니다.
          if (req.body.bilid === undefined || req.body.responseIndex === undefined || req.body.date === undefined || req.body.amount === undefined) {
              throw new Error("invalid post"); // 유효하지 않은 요청 에러 발생
          }

          // 요청 본문에서 bilid, responseIndex, date, amount를 equalJson으로 깊은 복사한 후 추출합니다.
          let { bilid, responseIndex, date, amount } = equalJson(req.body);

          let thisBill; // 현재 처리 중인 청구서
          let oid; // 고유 ID
          let method; // 결제 방식
          let proid; // 프로젝트 ID
          let thisProject; // 현재 프로젝트
          let thisResponse; // 현재 응답
          let cancel, name, target, proofs; // 취소 정보, 이름, 대상, 증명 정보
          let whereQuery, updateQuery; // MongoDB에서 사용할 쿼리
          let projectWhereQuery, projectUpdateQuery; // 프로젝트 관련 쿼리
          let cancelArr, proofsArr; // 취소 배열, 증명 배열
          let proof, to; // 증명 정보, 수취인

          // 응답 인덱스를 숫자로 변환하고 유효한 값인지 확인합니다.
          responseIndex = Number(responseIndex);
          if (Number.isNaN(responseIndex)) {
              throw new Error("invalid post"); // 유효하지 않은 응답 인덱스일 경우 에러 발생
          }

          // 환불 금액을 숫자로 변환하고 유효한 값인지 확인합니다.
          amount = Number(amount);
          if (Number.isNaN(amount)) {
              throw new Error("invalid post"); // 유효하지 않은 금액일 경우 에러 발생
          }

          // 청구서 ID를 사용하여 해당 청구서를 MongoDB에서 가져옵니다.
          thisBill = await bill.getBillById(bilid, { selfMongo: instance.mongolocal });

          // 응답 인덱스가 유효하지 않으면 에러를 발생시킵니다.
          if (thisBill.responses[responseIndex] === undefined) {
              throw new Error("invalid index");
          }

          // 응답 정보에서 필요한 값을 추출합니다.
          oid = ""; // 고유 ID는 빈 문자열로 초기화
          method = "계좌 이체 취소"; // 결제 취소 방식으로 설정
          proof = "현금 영수증"; // 증명 방식으로 현금 영수증 설정
          to = "주식회사 홈리에종"; // 수취인 설정

          // 청구서에서 프로젝트 ID를 추출합니다.
          proid = thisBill.links.proid;
          // 프로젝트 정보를 MongoDB에서 가져옵니다.
          thisProject = await back.getProjectById(proid, { selfMongo: instance.mongo });

          // 현재 응답 데이터를 가져옵니다.
          thisResponse = thisBill.responses[responseIndex];
          ({ cancel, proofs, name, target } = thisResponse); // 취소 정보, 증명 정보, 이름, 대상 추출

          // 취소 배열과 증명 배열을 깊은 복사하여 가져옵니다.
          cancelArr = equalJson(JSON.stringify(cancel));
          proofsArr = equalJson(JSON.stringify(proofs));

          // MongoDB 업데이트를 위한 쿼리 설정
          whereQuery = { bilid };
          updateQuery = {};

          // 취소 정보와 증명 정보를 배열의 맨 앞에 추가합니다.
          cancelArr.unshift({ date, amount, oid }); // 새로운 취소 데이터를 배열에 추가
          proofsArr.unshift({ date, method, proof, to }); // 새로운 증명 정보를 배열에 추가

          // 업데이트 쿼리에 취소 배열과 증명 배열을 추가합니다.
          updateQuery["responses." + String(responseIndex) + ".cancel"] = cancelArr;
          updateQuery["responses." + String(responseIndex) + ".proofs"] = proofsArr;

          // 청구서 정보를 MongoDB에서 업데이트합니다.
          await bill.updateBill([ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });

          // 업데이트된 청구서를 다시 가져옵니다.
          thisBill = await bill.getBillById(bilid, { selfMongo: instance.mongolocal });

          // 선금 또는 잔금에 대한 환불일 경우 프로젝트 정보를 업데이트합니다.
          if (/홈리에종 선금/gi.test(name) || /홈리에종 잔금/gi.test(name)) {

              // 프로젝트 업데이트를 위한 쿼리 설정
              projectWhereQuery = { proid };
              projectUpdateQuery = {};

              // 선금 환불일 경우
              if (/홈리에종 선금/gi.test(name)) {
                  projectUpdateQuery["process.calculation.payments.first.refund"] = Math.floor(amount); // 선금 환불 금액 설정
                  projectUpdateQuery["process.calculation.payments.first.cancel"] = date; // 선금 취소 날짜 설정
              } else if (/홈리에종 잔금/gi.test(name)) {
                  // 잔금 환불일 경우
                  projectUpdateQuery["process.calculation.payments.remain.refund"] = Math.floor(amount); // 잔금 환불 금액 설정
                  projectUpdateQuery["process.calculation.payments.remain.cancel"] = date; // 잔금 취소 날짜 설정
              }

              // 프로젝트 정보를 업데이트합니다.
              await back.updateProject([ projectWhereQuery, projectUpdateQuery ], { selfMongo: instance.mongo });

              // 업데이트된 프로젝트를 다시 가져옵니다.
              thisProject = await back.getProjectById(proid, { selfMongo: instance.mongo });
          }

          // 처리된 결과를 클라이언트에게 JSON 형식으로 응답합니다.
          res.send(JSON.stringify({
              message: "success",
              bilid,
              proid,
              bill: thisBill.toNormal(),
              project: thisProject.toNormal(),
          }));

      } catch (e) {
          // 오류가 발생한 경우 로그에 기록하고, 클라이언트에게 오류 메시지를 반환합니다.
          logger.error(e, req).catch((e) => { console.log(e); });
          res.set("Content-Type", "application/json");
          res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /passiveResponse
     * @description 특정 청구서의 응답 항목을 수정하는 라우터입니다. bilid, responseIndex, amount를 받아 해당 청구서 응답 항목의 가격을 업데이트합니다.
     * @param {Object} req - 클라이언트 요청 객체로, bilid, responseIndex, amount가 포함됩니다.
     * @param {Object} res - 서버 응답 객체로, 처리된 청구서 데이터를 JSON 형식으로 반환합니다.
     */
    router.post([ "/passiveResponse" ], async function (req, res) {
      // 응답 헤더 설정: JSON 형식으로 응답하고 CORS를 허용
      res.set({
        "Content-Type": "application/json",  // 응답 형식을 JSON으로 설정
        "Access-Control-Allow-Origin": "*",  // 모든 도메인에서의 요청을 허용
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",  // 허용되는 HTTP 메서드를 설정
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",  // 허용되는 헤더 설정
      });

      try {
        // 필수 파라미터가 없으면 오류 발생
        if (req.body.bilid === undefined || req.body.responseIndex === undefined || req.body.amount === undefined) {
          throw new Error("invalid post");  // 필수 데이터가 없으면 잘못된 요청 처리
        }

        // 요청 본문에서 데이터 추출 및 equalJson으로 deep copy 처리
        let { bilid, responseIndex, amount } = equalJson(req.body);
        let thisBill;  // 청구서 정보 저장 변수
        let whereQuery;  // 업데이트할 청구서 조회 쿼리
        let updateQuery;  // 청구서 업데이트 쿼리
        let thisResponse;  // 청구서 응답 항목
        let thisItems;  // 응답 항목의 세부 아이템들
        let thisItem;  // 특정 아이템

        // responseIndex와 amount를 숫자로 변환
        responseIndex = Number(responseIndex);
        if (Number.isNaN(responseIndex)) {
          throw new Error("invalid post");  // responseIndex가 숫자가 아니면 잘못된 요청 처리
        }

        amount = Number(amount);
        if (Number.isNaN(amount)) {
          throw new Error("invalid post");  // amount가 숫자가 아니면 잘못된 요청 처리
        }

        // MongoDB에서 bilid로 청구서 조회
        thisBill = await bill.getBillById(bilid, { selfMongo: instance.mongolocal });
        if (thisBill.responses[responseIndex] === undefined) {
          throw new Error("invalid index");  // 잘못된 responseIndex 처리
        }

        // 해당 청구서 응답 항목과 세부 아이템 가져오기
        thisResponse = thisBill.responses[responseIndex];
        thisItems = thisResponse.items;
        thisItem = thisItems[0];  // 첫 번째 아이템을 선택

        // MongoDB 쿼리 구성
        whereQuery = { bilid };  // 청구서를 조회할 조건
        updateQuery = {};  // 업데이트할 내용을 저장할 객체

        // 업데이트할 청구서 응답 항목 설정
        updateQuery["responses." + String(responseIndex) + ".items"] = [
          {
            id: thisItem.id,  // 아이템 ID
            class: thisItem.class,  // 아이템 클래스
            name: thisItem.name,  // 아이템 이름
            description: thisItem.description,  // 아이템 설명
            info: thisItem.info,  // 아이템 추가 정보
            unit: {
              ea: thisItem.unit.ea,  // 아이템 단위 수량
              price: amount,  // 요청 받은 금액으로 업데이트
              number: 1,  // 수량은 1로 설정
            },
            amount: {
              pure: amount,  // 순수 가격
              commission: 0,  // 수수료는 0으로 설정
            }
          }
        ];

        // MongoDB에 청구서 업데이트
        await bill.updateBill([ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });
        
        // 업데이트된 청구서 다시 조회
        thisBill = await bill.getBillById(bilid, { selfMongo: instance.mongolocal });

        // 업데이트된 청구서를 JSON 형식으로 응답
        res.send(JSON.stringify({
          bilid: thisBill.bilid,  // 청구서 ID
          proid: thisBill.links.proid,  // 프로젝트 ID
          bill: thisBill.toNormal()  // 청구서의 일반 객체 형태 반환
        }));

      } catch (e) {
        // 오류 발생 시 로깅하고 클라이언트에 오류 메시지 응답
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /stylingFormSync
     * @description 스타일링 폼 및 기타 폼 데이터를 동기화하는 라우터입니다. Widsign API에서 문서 데이터를 가져와 MongoDB에 업데이트합니다. 
     *              계약이 완료된 경우 클라이언트와 디자이너에게 알림을 보냅니다.
     * @param {Object} req - 클라이언트 요청 객체로, 동기화 작업을 트리거합니다.
     * @param {Object} res - 서버 응답 객체로, 처리 결과를 JSON 형식으로 반환합니다.
     */
    router.post([ "/stylingFormSync" ], async function (req, res) {
      // 클라이언트 요청에 대한 응답 헤더를 설정합니다.
      res.set({
          "Content-Type": "application/json", // 반환할 데이터 형식을 JSON으로 설정합니다.
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서 접근을 허용합니다.
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용할 HTTP 메서드를 설정합니다.
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용할 요청 헤더를 설정합니다.
      });
      // Mother 객체에서 여러 유틸리티 메서드와 주소 데이터를 가져옵니다.
      const { requestSystem, equalJson, stringToDate, messageLog, messageSend } = instance.mother;
      const address = instance.address;

      // Widsign API에 접근하기 위한 인증 정보(id, key, endPoint)를 설정합니다.
      const { officeinfo: { widsign: { id, key, endPoint } } } = address;

      // 동기화할 컬렉션 목록을 설정합니다.
      const collections = [ "stylingForm", "constructForm", "partnershipForm", "designerForm" ];

      // 백엔드 모듈 접근을 위한 인스턴스를 가져옵니다.
      const back = instance.back;

      /**
       * @function formSync
       * @description Widsign API에서 데이터를 동기화하여 MongoDB에 업데이트하는 함수입니다. 각 컬렉션에 대해 3개월 이내의 데이터를 가져오고, 
       *              프로젝트와 클라이언트 정보, 디자이너 정보를 동기화합니다.
       * @param {Object} MONGOC - MongoDB 연결 객체입니다.
       * @param {Object} MONGOPYTHONC - Python MongoDB 연결 객체입니다.
       * @returns {Promise<boolean>} 동기화 성공 여부를 반환합니다.
       */
      const formSync = async (MONGOC, MONGOPYTHONC) => {
        try {
            const selfMongo = MONGOPYTHONC; // MongoDB 연결 객체로 Python MongoDB 인스턴스를 사용
            let widsignResponse, token; // Widsign API 응답과 액세스 토큰을 저장할 변수
            let num; // 페이지 넘버 변수
            let forms, resultForms, finalForms; // 폼 데이터 관련 배열 변수
            let pageSize; // 한 번에 가져올 폼 데이터의 개수 설정
            let monthAgoValue; // 3개월 전의 날짜 값 저장
            let boo; // 중복 체크용 부울 변수
            let whereQuery, updateQuery; // MongoDB 쿼리 변수
            let dbForms; // 데이터베이스에서 가져온 폼 데이터 배열
            let target; // 대상 폼 데이터
            let formDetail; // 폼 세부 정보
            let thisClient; // 클라이언트 정보 저장
            let thisProject, thisDesigner; // 프로젝트 및 디자이너 정보 저장
            let text; // 알림 메시지 텍스트 변수

            // 각 컬렉션에 대해 반복하여 동기화 작업을 수행
            for (let collection of collections) {
                monthAgoValue = new Date(); // 현재 날짜를 기준으로
                monthAgoValue.setMonth(monthAgoValue.getMonth() - 3); // 3개월 전으로 설정
                monthAgoValue = monthAgoValue.valueOf(); // 타임스탬프 형식으로 변환

                pageSize = 30; // 한 페이지에 가져올 데이터 수를 30개로 설정

                // Widsign API에서 액세스 토큰을 가져옴
                widsignResponse = await requestSystem(endPoint + "/v2/token", {}, { method: "get", headers: { "x-api-id": id, "x-api-key": key } });
                
                // 액세스 토큰을 제대로 가져오지 못했을 경우 에러 발생
                if (widsignResponse.data.result_code !== 200) {
                    throw new Error("access token error");
                } else {
                    token = widsignResponse.data.access_token; // 정상적으로 가져온 액세스 토큰 저장
                    resultForms = []; // 결과 폼 배열 초기화
                    forms = [ null ]; // 폼 데이터 초기값 설정
                    num = 1; // 페이지 번호 초기화
                    
                    // 더 이상 폼 데이터가 없을 때까지 반복하여 문서 데이터를 가져옴
                    while (forms.length > 0) {
                        widsignResponse = await requestSystem(endPoint + "/v2/doc", { page: num, page_size: pageSize }, { method: "get", headers: { "x-api-key": key, "x-access-token": token } });
                        
                        // API에서 받은 폼 데이터를 equalJson으로 깊은 복사하여 배열에 저장
                        forms = equalJson(JSON.stringify(widsignResponse.data.result)).map((obj) => {
                            let newObj = {}; // 새로운 객체 생성
                            newObj.form = obj.form_id; // 폼 ID 저장
                            newObj.id = (obj.receiver_list.length > 0) ? obj.receiver_list[0] : null; // 수신자 ID 저장
                            newObj.name = obj.title; // 폼 이름(제목) 저장
                            newObj.date = stringToDate(obj.created_date); // 생성 날짜를 문자열에서 Date 객체로 변환
                            newObj.confirm = (obj.status === 'END'); // 폼 상태가 'END'이면 완료된 것으로 설정
                            return newObj; // 변환된 폼 데이터 반환
                        });

                        // 가져온 폼 데이터가 있으면
                        if (forms.length > 0) {
                            forms.sort((a, b) => a.date.valueOf() - b.date.valueOf()); // 날짜를 기준으로 오름차순 정렬
                            
                            // 폼의 가장 오래된 날짜가 3개월 이전이면 반복 종료
                            if (forms[0].date.valueOf() <= monthAgoValue) {
                                break;
                            }
                            
                            resultForms = resultForms.concat(forms); // 결과 배열에 폼 데이터 추가
                        }
                        num++; // 페이지 번호 증가
                    }

                    // 결과 폼 데이터를 최신 순으로 정렬
                    resultForms.sort((a, b) => b.date.valueOf() - a.date.valueOf());

                    finalForms = []; // 최종 폼 배열 초기화

                    // 중복된 폼을 제거하여 최종 배열에 저장
                    for (let f of resultForms) {
                        boo = (finalForms.find((obj) => obj.name === f.name) !== undefined); // 중복 여부 확인
                        if (!boo) {
                            finalForms.push(f); // 중복이 아닐 경우 최종 배열에 추가
                        }
                    }

                    // 액세스 토큰을 다시 가져옴 (세션 만료 가능성에 대비)
                    widsignResponse = await requestSystem(endPoint + "/v2/token", {}, { method: "get", headers: { "x-api-id": id, "x-api-key": key } });
                    if (widsignResponse.data.result_code !== 200) {
                        throw new Error("access token error");
                    }
                    token = widsignResponse.data.access_token;

                    // 스타일링 폼 또는 공사 폼에 대해 동기화 작업 수행
                    if (/styling/gi.test(collection) || /construct/gi.test(collection)) {
                        whereQuery = { $or: finalForms.map((obj) => ({ name: obj.name })) }; // MongoDB에서 조회할 쿼리 생성
                        dbForms = await back.mongoRead(collection, whereQuery, { selfMongo }); // MongoDB에서 폼 데이터를 읽음
                        
                        // 데이터베이스의 폼 데이터를 각각 처리
                        for (let f of dbForms) {
                            whereQuery = { proid: f.proid }; // 프로젝트 ID로 조회 쿼리 생성
                            updateQuery = {}; // 업데이트할 쿼리 초기화

                            // 최종 폼 배열에서 일치하는 폼 데이터를 찾음
                            target = null;
                            for (let i of finalForms) {
                                if (i.name === f.name) {
                                    target = i;
                                }
                            }

                            // 일치하는 폼이 있을 경우 세부 정보 및 이력을 업데이트
                            if (target !== null) {
                                // Widsign API에서 해당 폼의 세부 정보를 가져옴
                                widsignResponse = await requestSystem(endPoint + "/v2/doc/detail", { "receiver_meta_id": target.id }, { method: "get", headers: { "x-api-key": key, "x-access-token": token } });
                                if (typeof widsignResponse.data === "object" && widsignResponse.data.result !== undefined) {
                                    if (widsignResponse.data.result.receiver_list.length > 0) {
                                        updateQuery["id"] = target.id; // 폼 ID 업데이트
                                        updateQuery["date"] = target.date; // 폼 날짜 업데이트
                                        updateQuery["confirm"] = target.confirm; // 폼 완료 여부 업데이트
                                        updateQuery["form"] = target.form; // 폼 데이터 업데이트
                                        updateQuery["detail"] = widsignResponse.data.result.receiver_list[0]; // 수신자 정보 업데이트

                                        // 폼 이력을 가져와 업데이트
                                        widsignResponse = await requestSystem(endPoint + "/v2/doc/history", { "receiver_meta_id": target.id }, { method: "get", headers: { "x-api-key": key, "x-access-token": token } });
                                        if (typeof widsignResponse.data === "object" && Array.isArray(widsignResponse.data.result)) {
                                            updateQuery["history"] = widsignResponse.data.result.map((o) => {
                                                o.date = stringToDate(o.created_date); // 생성 날짜를 Date 객체로 변환
                                                delete o.created_date; // 원래 날짜 필드는 삭제
                                                return o;
                                            });

                                            // 계약 완료 여부를 확인하고 메시지를 전송
                                            if (f.confirm !== true && target.confirm === true) {
                                                thisProject = await back.getProjectById(f.proid, { selfMongo: MONGOC }); // 프로젝트 정보 가져오기
                                                thisClient = await back.getClientById(f.client.cliid, { selfMongo: MONGOC }); // 클라이언트 정보 가져오기
                                                thisDesigner = await back.getDesignerById(thisProject.desid, { selfMongo: MONGOC }); // 디자이너 정보 가져오기

                                                text = thisClient.name + " 고객님이 계약서에 서명을 완료하셨습니다!"; // 메시지 텍스트 생성
                                                await messageSend({ text, channel: "#400_customer", voice: true }); // 메시지 전송
                                            }

                                            // MongoDB에 폼 데이터 업데이트
                                            await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo });

                                            // 스타일링 폼일 경우 프로젝트의 계약 정보 업데이트
                                            if (/styling/gi.test(collection)) {
                                                await back.updateProject([ { proid: f.proid }, { "process.contract.form.id": target.id } ], { selfMongo: MONGOC });
                                            } else if (/construct/gi.test(collection)) {
                                                // 공사 폼일 경우 공사 계약 정보 업데이트
                                                await back.updateProject([ { proid: f.proid }, { "process.design.construct.contract.form.id": target.id } ], { selfMongo: MONGOC });
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        // 파트너십 폼 또는 디자이너 폼에 대해 동기화 작업 수행
                        whereQuery = { $or: finalForms.map((obj) => ({ name: obj.name })) }; // 조회 쿼리 생성
                        dbForms = await back.mongoRead(collection, whereQuery, { selfMongo }); // MongoDB에서 폼 데이터 읽기

                        // 각 폼 데이터를 처리
                        for (let f of dbForms) {
                            whereQuery = { aspid: f.aspid }; // 아스피란트 ID로 조회 쿼리 생성
                            updateQuery = {}; // 업데이트할 쿼리 초기화

                            // 최종 폼 배열에서 일치하는 폼을 찾음
                            target = null;
                            for (let i of finalForms) {
                                if (i.name === f.name) {
                                    target = i;
                                }
                            }

                            // 일치하는 폼이 있을 경우 세부 정보 및 이력을 업데이트
                            if (target !== null) {
                                widsignResponse = await requestSystem(endPoint + "/v2/doc/detail", { "receiver_meta_id": target.id }, { method: "get", headers: { "x-api-key": key, "x-access-token": token } });
                                if (typeof widsignResponse.data === "object" && widsignResponse.data.result !== undefined) {
                                    if (widsignResponse.data.result.receiver_list.length > 0) {
                                        updateQuery["id"] = target.id; // 폼 ID 업데이트
                                        updateQuery["date"] = target.date; // 폼 날짜 업데이트
                                        updateQuery["confirm"] = target.confirm; // 폼 완료 여부 업데이트
                                        updateQuery["form"] = target.form; // 폼 데이터 업데이트
                                        updateQuery["detail"] = widsignResponse.data.result.receiver_list[0]; // 수신자 정보 업데이트

                                        // 폼 이력을 가져와 업데이트
                                        widsignResponse = await requestSystem(endPoint + "/v2/doc/history", { "receiver_meta_id": target.id }, { method: "get", headers: { "x-api-key": key, "x-access-token": token } });
                                        if (typeof widsignResponse.data === "object" && Array.isArray(widsignResponse.data.result)) {
                                            updateQuery["history"] = widsignResponse.data.result.map((o) => {
                                                o.date = stringToDate(o.created_date); // 생성 날짜를 변환
                                                delete o.created_date; // 원래 필드를 삭제
                                                return o;
                                            });

                                            // MongoDB에 폼 데이터 업데이트
                                            await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo });

                                            // 계약이 완료되었을 경우 메시지 전송 및 MongoDB 업데이트
                                            if (f.confirm !== true && target.confirm === true) {
                                                thisDesigner = await back.getAspirantById(f.aspid, { selfMongo: MONGOC }); // 디자이너 정보 가져오기
                                                text = thisDesigner.designer + " 디자이너님이 계약서에 서명을 완료하셨습니다!"; // 메시지 텍스트 생성
                                                await messageSend({ text, channel: "#301_apply", voice: true }); // 메시지 전송

                                                // 파트너십 또는 디자이너 계약 정보 업데이트
                                                if (/partnership/gi.test(collection)) {
                                                    await back.updateAspirant([ { aspid: f.aspid }, { "contract.partnership.id": target.id, "contract.partnership.date": new Date() } ], { selfMongo: MONGOC });
                                                } else if (/designer/gi.test(collection)) {
                                                    await back.updateAspirant([ { aspid: f.aspid }, { "contract.designer.id": target.id, "contract.designer.date": new Date() } ], { selfMongo: MONGOC });
                                                }

                                                // 계약 완료 상태로 업데이트
                                                await back.updateAspirant([ { aspid: f.aspid }, { "meeting.status": "계약 완료" } ], { selfMongo: MONGOC });
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            return true; // 동기화 성공 시 true 반환

        } catch (e) {
            return false; // 오류 발생 시 false 반환
        }
      };
      try {
          // formSync 함수를 호출하여 MongoDB 인스턴스와 로컬 인스턴스를 전달
          formSync(instance.mongo, instance.mongolocal)
              .then((boo) => { // formSync가 성공적으로 동작하면
                  if (boo) { 
                      // boo가 true일 때 로그를 기록
                      // 성공적으로 스타일링 폼 동기화가 완료되었음을 나타내는 메시지와 현재 시간을 로그로 남김
                      logger.cron("styling form sync success : " + JSON.stringify(new Date()))
                          .catch((e) => { console.log(e); }); // 로그 기록 중 에러가 발생하면 콘솔에 출력
                  }
                  // 동기화가 완료된 후 특정 URL로 GET 요청을 보냄
                  // "https://{host}/stylingFormFile"로 요청을 보내며 데이터는 null
                  return requestSystem(
                      "https://" + address.officeinfo.host + ":3002/stylingFormFile", // URL 설정
                      { data: null }, // 요청 데이터는 null
                      { headers: { "Content-Type": "application/json" } } // 헤더에 JSON 형식을 지정
                  );
              })
              .catch((err) => { // formSync가 실패하거나 오류가 발생했을 경우 에러 처리
                  // 에러가 발생하면 로그 기록
                  logger.error(err, req).catch((e) => { console.log(e); }); // 에러 로그 기록 중 또 다른 에러가 발생하면 콘솔에 출력
              });
          // 클라이언트에 동기화 요청이 실행 중임을 알리는 메시지 응답
          // formSync가 완료되었는지 여부에 관계없이 이 메시지가 반환됨
          res.send(JSON.stringify({ message: "will do" })); // 클라이언트에게 성공적으로 요청이 처리 중임을 알리는 응답 반환
      } catch (e) { // formSync 실행 중 발생한 에러 처리
          // 에러가 발생하면 로그 기록
          logger.error(e, req).catch((e) => { console.log(e); }); // 에러 로그 기록 중 또 다른 에러가 발생하면 콘솔에 출력
          // 에러가 발생했음을 클라이언트에 알리는 응답 반환
          res.set("Content-Type", "application/json"); // 응답 헤더 설정: JSON 형식으로 반환
          res.send(JSON.stringify({ error: e.message })); // 에러 메시지를 JSON 형식으로 응답
      }
    });
    
    /**
     * @route POST /stylingFormFile
     * @description 스타일링 폼 파일을 다운로드하고 서버에 업로드하는 라우터입니다. Widsign API를 통해 서명된 계약서를 다운로드하고, 특정 경로에 파일을 업로드한 후 
     *              임시 파일을 삭제합니다.
     * @param {Object} req - 클라이언트 요청 객체로, 파일 다운로드 작업을 트리거합니다.
     * @param {Object} res - 서버 응답 객체로, 처리 결과를 JSON 형식으로 반환합니다.
     */
    router.post([ "/stylingFormFile" ], async function (req, res) {
      // 응답 헤더를 설정하여 클라이언트에게 JSON 형식의 응답을 보낼 수 있도록 허용합니다.
      res.set({
          "Content-Type": "application/json", // 응답 데이터 형식을 JSON으로 설정
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용할 HTTP 메서드 설정
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용할 헤더 설정
      });

      // Mother 객체에서 사용하는 다양한 유틸리티 메서드를 불러옴
      const { 
          requestSystem, binaryRequest, fileSystem, shellExec, sleep, generalFileUpload, equalJson, stringToDate, messageLog, messageSend 
      } = instance.mother; // Mother 메서드들이 사용됩니다.

      const address = instance.address; // 서버 주소 정보를 담고 있는 객체
      const { officeinfo: { widsign: { id, key, endPoint } } } = address; // Widsign API 사용을 위한 ID, key, endPoint 정보
      const back = instance.back; // 백엔드 처리 모듈 가져옴

      try {
          const selfMongo = instance.mongolocal; // 로컬 MongoDB 인스턴스
          const splitToken = "__split__"; // 파일 이름을 구성할 때 사용하는 구분자
          const collection = "stylingForm"; // MongoDB에서 읽을 컬렉션 이름
          let widsignResponse; // Widsign API 응답을 저장할 변수
          let token; // 액세스 토큰을 저장할 변수
          let rows; // MongoDB에서 읽어온 데이터를 저장할 변수
          let fileName; // 파일 이름을 저장할 변수
          let transRes; // 서버로부터의 응답을 저장할 변수
          let subtract; // 차집합 배열을 저장할 변수
          let fileList; // 파일 리스트를 저장할 배열
          let downloadTargets; // 다운로드 대상 파일들을 저장할 배열
          let fromArr, toArr; // 파일 경로 배열

          // MongoDB에서 스타일링 폼 데이터를 읽어옴
          rows = await back.mongoRead(collection, {}, { selfMongo });
          // 'confirm' 필드가 true인 데이터만 필터링
          rows = rows.filter((obj) => { return obj.confirm });

          // contractList 엔드포인트에서 데이터를 받아옴
          transRes = await requestSystem(
              "https://" + address.secondinfo.host + ":3003/contractList", 
              { data: null }, 
              { headers: { "Content-Type": "application/json" } }
          );

          // 서버에서 받은 데이터를 바탕으로 파일 리스트 생성
          fileList = transRes.data.map((obj) => { return obj.proid });

          // MongoDB에서 받은 데이터와 서버에서 받은 데이터의 차집합을 계산 (아직 다운로드되지 않은 데이터)
          subtract = rows.map((obj) => { return obj.proid }).filter((proid) => {
              return !fileList.includes(proid);
          });

          // 다운로드 대상 목록을 생성
          downloadTargets = rows.filter((obj) => {
              return subtract.includes(obj.proid);
          });

          // 각 다운로드 대상에 대해 Widsign API를 사용하여 문서 파일을 다운로드
          for (let { id: formId, proid, client: { cliid, requestNumber } } of downloadTargets) {
              // Widsign API로부터 액세스 토큰을 가져옴
              widsignResponse = await requestSystem(endPoint + "/v2/token", {}, { method: "get", headers: { "x-api-id": id, "x-api-key": key } });
              if (widsignResponse.data.result_code !== 200) {
                  throw new Error("access token error"); // 액세스 토큰 오류 시 예외 처리
              }

              token = widsignResponse.data.access_token; // 정상적으로 토큰을 받아옴

              // 다운로드할 파일 이름을 생성
              fileName = `${proid}${splitToken}${cliid}${splitToken}${requestNumber}${splitToken}${formId}.zip`;

              // Widsign API를 통해 서명된 문서 파일을 바이너리 형식으로 다운로드
              widsignResponse = await binaryRequest(
                  endPoint + "/v2/doc/download?receiver_meta_id=" + formId, 
                  null, 
                  { "x-api-key": key, "x-access-token": token }
              );

              // 다운로드한 파일을 임시 디렉토리에 저장
              await fileSystem(`writeBinary`, [ `${process.cwd()}/temp/${fileName}`, widsignResponse ]);

              // 업로드할 파일의 경로 설정
              fromArr = [ `${process.cwd()}/temp/${fileName}` ]; // 로컬 경로
              toArr = [ "/photo/contract/" + fileName ]; // 업로드할 서버 경로

              // 파일을 지정된 서버로 업로드
              await generalFileUpload("https://" + address.secondinfo.host + ":3003/generalFileUpload", fromArr, toArr);

              // 서버에 파일 업로드 후 300ms 대기
              await sleep(300);

              // 임시 디렉토리에서 파일 삭제
              await shellExec("rm", [ "-rf", `${process.cwd()}/temp/${fileName}` ]);
          }

          // 동기화 성공 시 로그 기록
          logger.cron("styling form file success : " + JSON.stringify(new Date())).catch((e) => { console.log(e); });

          // 클라이언트에 성공 메시지를 JSON 형식으로 응답
          res.send(JSON.stringify({ message: "done" }));

      } catch (e) {
          // 에러가 발생했을 때 에러 로그를 기록하고, 클라이언트에게 에러 메시지를 반환
          logger.error(e, req).catch((e) => { console.log(e); });
          res.set("Content-Type", "application/json");
          res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /responseInjection
     * @description 특정 빌링 ID에 대한 결제 응답을 처리하는 라우터입니다.
     * @param {object} req - 클라이언트 요청 객체. 요청 바디에 bilid, amount, name이 포함되어야 합니다.
     * @param {object} res - 서버 응답 객체.
     */
    router.post([ "/responseInjection" ], async function (req, res) {
      // 응답 헤더 설정: JSON 형식 응답, CORS 허용
      res.set({
        "Content-Type": "application/json", // 응답 데이터 형식을 JSON으로 설정
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서 접근 허용
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용할 HTTP 메서드 설정
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용할 요청 헤더 설정
      });

      try {
        // 필수 요청 값이 없을 경우 오류 처리
        if (req.body.bilid === undefined || req.body.amount === undefined || req.body.name === undefined) {
          throw new Error("invalid post"); // 필수 값이 누락되었을 때 오류 처리
        }

        // MongoDB 인스턴스 가져오기 (local MongoDB 사용)
        const selfMongo = instance.mongolocal;

        // 요청 바디에서 bilid, amount, name 추출
        const { bilid, amount, name } = equalJson(req.body);

        // 변수 선언: 현재 처리 중인 결제 정보 저장
        let thisBill;
        let cliid, desid, proid, method; // 클라이언트 ID, 디자이너 ID, 프로젝트 ID, 결제 방식 저장 변수
        let client, designer, project; // 각 객체 저장용 변수

        // bilid로 해당 청구서 정보를 MongoDB에서 가져옴
        thisBill = await bill.getBillById(bilid, { selfMongo });
        
        // 청구서가 존재하지 않을 경우 오류 처리
        if (thisBill === null) {
          throw new Error("invalid bilid");
        }

        // 청구서의 연결 정보에서 cliid, desid, proid, method를 가져옴
        ({ cliid, desid, proid, method } = thisBill.links);

        // 각 ID를 이용해 클라이언트, 디자이너, 프로젝트 정보를 MongoDB에서 가져옴
        client = await back.getClientById(cliid, { selfMongo: instance.mongo });
        designer = await back.getDesignerById(desid, { selfMongo: instance.mongo });
        project = await back.getProjectById(proid, { selfMongo: instance.mongo });

        // bill 모듈의 responseInjection 메서드를 호출하여 결제 응답 처리
        await bill.responseInjection(bilid, "generalConstructFee", client, designer, project, method, {
          customAmount: { amount: Number(amount) }, // 사용자 정의 금액 설정
          consumerMode: false, // 소비자 모드 설정
          customSub: { name }, // 추가 정보로 name을 전달
          selfMongo // MongoDB 인스턴스 전달
        });

        // 처리된 후 갱신된 청구서 정보 가져오기
        thisBill = await bill.getBillById(bilid, { selfMongo });

        // 갱신된 청구서 정보를 클라이언트에 JSON 형식으로 응답
        res.send(JSON.stringify({ bill: thisBill }));

      } catch (e) {
        // 오류 발생 시 로그에 기록하고, 클라이언트에게 오류 메시지 응답
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /calculationConsole
     * @description 프로젝트와 관련된 계산 정보를 제공하는 콘솔 라우터입니다.
     * @param {object} req - 클라이언트 요청 객체.
     * @param {object} res - 서버 응답 객체.
     */
    router.post([ "/calculationConsole" ], async function (req, res) {
      // 응답 헤더 설정: JSON 형식 응답, CORS 허용
      res.set({
        "Content-Type": "application/json", // 응답 데이터 형식을 JSON으로 설정
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서 접근 허용
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용할 HTTP 메서드 설정
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용할 요청 헤더 설정
      });

      try {
        // MongoDB 인스턴스 할당
        const selfMongo = instance.mongolocal; // 로컬 MongoDB 인스턴스
        const selfCoreMongo = instance.mongo; // 메인 MongoDB 인스턴스
        
        // 요청 바디에서 mode를 추출
        const { mode } = req.body;

        // 과거 날짜로 설정할 날짜 간격 (28일 전)
        const agoDateNumber = 28;
        
        // 변수 초기화
        let projects, clients, designers, bills; // 프로젝트, 클라이언트, 디자이너, 청구서 관련 변수들
        let ago; // 과거 날짜를 저장할 변수
        let preClients; // 검색된 클라이언트들

        // mode가 'init'인 경우, 최근 28일 동안의 프로젝트를 가져옴
        if (mode === "init") {
          ago = new Date(); // 현재 날짜를 가져옴
          ago.setDate(ago.getDate() - agoDateNumber); // 28일 전 날짜로 설정

          // 28일 전부터 계약이 진행된 프로젝트들을 가져옴
          projects = await back.getProjectsByQuery({
            "process.contract.first.date": { $gte: ago } // 계약 날짜가 28일 전 이후인 프로젝트
          }, { selfMongo: selfCoreMongo });

        // mode가 'search'인 경우, 클라이언트 이름으로 프로젝트를 검색
        } else if (mode === "search") {
          const { value } = req.body; // 검색할 클라이언트 이름 추출
          // 클라이언트 이름에 일치하는 클라이언트들을 가져옴
          preClients = await back.getClientsByQuery({ name: { $regex: value.replace(/[\\]/g, '') } }, { selfMongo: selfCoreMongo });
          
          // 클라이언트가 없을 경우 프로젝트는 빈 배열로 설정
          if (preClients.length === 0) {
            projects = [];
          } else {
            // 검색된 클라이언트들의 프로젝트들을 가져옴
            projects = await back.getProjectsByQuery({ $or: preClients.toNormal().map((c) => { return { cliid: c.cliid } }) }, { selfMongo: selfCoreMongo });

            // 2000년 이후에 진행된 프로젝트들만 필터링
            projects = projects.filter((project) => {
              return project.process.contract.first.date.valueOf() > (new Date(2000, 0, 1)).valueOf();
            });
          }

        // mode가 없는 경우, 2000년 이후의 모든 프로젝트를 가져옴
        } else {
          projects = await back.getProjectsByQuery({
            "process.contract.first.date": { $gte: new Date(2000, 0, 1) } // 2000년 이후의 프로젝트
          }, { selfMongo: selfCoreMongo });
        }

        // 프로젝트들을 계약 날짜 기준으로 내림차순 정렬
        projects.sort((a, b) => { return b.process.contract.first.date.valueOf() - a.process.contract.first.date.valueOf() });

        // 프로젝트가 있을 경우 관련 클라이언트, 디자이너, 청구서를 가져옴
        if (projects.length > 0) {
          // 프로젝트와 연관된 클라이언트들을 가져옴
          clients = await back.getClientsByQuery({ $or: Array.from(new Set(projects.toNormal().map((p) => { return p.cliid }))).map((cliid) => { return { cliid } }) }, { selfMongo: selfCoreMongo });

          // 프로젝트와 연관된 디자이너들을 가져옴
          designers = await back.getDesignersByQuery({ $or: Array.from(new Set(projects.toNormal().map((p) => { return p.desid }))).map((desid) => { return { desid } }) }, { selfMongo: selfCoreMongo });

          // 프로젝트와 연관된 청구서 데이터를 가져옴
          bills = await back.mongoRead("generalBill", {
            $or: projects.toNormal().map((project) => { return { "links.proid": project.proid } }) // 프로젝트와 연관된 청구서 필터링
          }, { selfMongo });

          // 클라이언트, 디자이너, 청구서 데이터를 응답으로 반환
          res.send(JSON.stringify({ projects: projects.toNormal(), clients: clients.toNormal(), designers: designers.toNormal(), bills }));

        } else {
          // 프로젝트가 없는 경우 빈 배열을 응답으로 반환
          res.send(JSON.stringify({ projects: [], clients: [], designers: [], bills: [] }));
        }

      } catch (e) {
        // 오류 발생 시 로그를 기록하고 오류 메시지를 반환
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json"); // 오류 응답도 JSON 형식으로 설정
        res.send(JSON.stringify({ error: e.message })); // 오류 메시지 반환
      }
    });
    
    /**
     * @route POST /ghostClient_updateAnalytics
     * @description 클라이언트의 분석 데이터를 업데이트하는 라우터입니다. 
     *              페이지 방문, 업데이트 정보, 제출, 이미지 등을 기반으로 분석 정보를 갱신합니다.
     * @param {Object} req - 클라이언트 요청 객체로, 업데이트할 데이터를 포함합니다.
     * @param {Object} res - 서버 응답 객체로, 처리 결과를 JSON 형식으로 반환합니다.
     */
    router.post([ "/ghostClient_updateAnalytics" ], async function (req, res) {
      // 응답 헤더 설정
      res.set({
          "Content-Type": "application/json", // 응답 데이터 형식을 JSON으로 설정
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서 접근 허용
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용할 HTTP 메서드 설정
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용할 요청 헤더 설정
      });

      try {
          // 필수 필드(mode, cliid, page)가 요청에 포함되어 있는지 확인
          if (req.body.mode === undefined || req.body.cliid === undefined || req.body.page === undefined) {
              throw new Error("invalid post"); // 필드가 없으면 에러를 던짐
          }

          // 요청에서 mode, cliid, page 값을 추출
          const { mode, cliid, page } = req.body;
          
          // 클라이언트의 IP 주소 추출 (헤더에 있으면 그 값을 사용, 없으면 소켓에서 추출)
          const ip = String(req.headers['x-forwarded-for'] === undefined ? req.socket.remoteAddress : req.headers['x-forwarded-for'])
              .trim().replace(/[^0-9\.]/gi, ''); // IP 형식에 맞게 정리

          // 사용자 에이전트 정보 추출
          const rawUserAgent = req.useragent; // 클라이언트의 사용자 에이전트 정보
          const { source: userAgent, browser, os, platform } = rawUserAgent; // 에이전트, 브라우저, OS, 플랫폼 정보 분리

          // 참조 URL (referer) 값을 설정, 없으면 빈 문자열로 설정
          const referrer = (req.headers.referer === undefined ? "" : req.headers.referer);
          
          let whereQuery, updateQuery; // MongoDB에서 사용할 조회 및 업데이트 쿼리
          let history; // 클라이언트 히스토리 저장 변수
          let update; // 업데이트 정보 저장 변수
          let image; // 이미지 정보 저장 변수
          let ipObj; // IP 관련 객체 저장 변수

          // 클라이언트 ID로 히스토리 조회
          whereQuery = { cliid }; 
          history = await back.getHistoryById("client", cliid, { selfMongo: instance.mongolocal }); // 클라이언트의 히스토리를 조회
          if (history === null) {
              // 히스토리가 없으면 새로 생성
              await back.createHistory("client", { cliid }, { selfMongo: instance.mongolocal, secondMongo: instance.mongo });
              history = await back.getHistoryById("client", cliid, { selfMongo: instance.mongolocal });
          }

          // mode에 따라 다른 처리 로직을 수행
          if (mode === "page") {
              // 페이지 방문 기록 업데이트 처리

              // IP 주소 분석
              ipObj = await ipParsing(ip); // IP 파싱 유틸리티 호출 (Mother 메서드가 사용될 수 있음)
              if (Object.keys(ipObj).length === 0) {
                  ipObj = { ip }; // IP 파싱 결과가 없으면 IP 주소만 저장
              }

              // 히스토리에 페이지 방문 정보 추가
              history.curation.analytics.page.push({ 
                  page, 
                  date: new Date(), 
                  referrer, 
                  userAgent, 
                  browser, 
                  os, 
                  platform, 
                  mobile: rawUserAgent.isMobile, 
                  ...ipObj // IP 관련 정보 추가
              });

              // 업데이트 쿼리 생성
              updateQuery = {};
              updateQuery["curation.analytics.page"] = history.curation.analytics.page; // 페이지 방문 정보 업데이트

              // 클라이언트 히스토리 업데이트
              await back.updateHistory("client", [ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });

          } else if (mode === "update") {
              // 업데이트 정보 기록 처리

              // 업데이트 데이터를 equalJson을 통해 파싱 (deep copy 처리)
              update = equalJson(req.body.update);

              // 히스토리에 업데이트 정보 추가
              history.curation.analytics.update.push({ page, date: new Date(), update });

              // 업데이트 쿼리 생성
              updateQuery = {};
              updateQuery["curation.analytics.update"] = history.curation.analytics.update; // 업데이트 정보 저장

              // 클라이언트 히스토리 업데이트
              await back.updateHistory("client", [ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });

              // 추가로 updateQuery가 제공되면, 히스토리와 클라이언트 정보도 함께 업데이트
              if (req.body.updateQuery !== undefined) {
                  const { history: historyQuery, core: coreQuery } = equalJson(req.body.updateQuery);

                  if (historyQuery !== null && typeof historyQuery === "object" && Object.keys(historyQuery).length > 0) {
                      // 히스토리 데이터 업데이트
                      await back.updateHistory("client", [ whereQuery, historyQuery ], { selfMongo: instance.mongolocal });
                  }
                  if (coreQuery !== null && typeof coreQuery === "object" && Object.keys(coreQuery).length > 0) {
                      // 클라이언트의 코어 데이터 업데이트
                      await back.updateClient([ { cliid }, coreQuery ], { selfMongo: instance.mongo });
                  }
              }

          } else if (mode === "submit") {
              // 제출 정보 기록 처리

              // 히스토리에 제출 정보 추가
              history.curation.analytics.submit.push({ page, date: new Date() });

              // 제출 정보 업데이트 쿼리 생성
              updateQuery = {};
              updateQuery["curation.analytics.submit"] = history.curation.analytics.submit;

              // 클라이언트 히스토리 업데이트
              await back.updateHistory("client", [ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });

          } else if (mode === "image") {
              // 이미지 정보 기록 처리

              // 이미지를 equalJson을 통해 파싱 (deep copy 처리)
              image = equalJson(req.body.image);

              // 이미지 정보 업데이트 쿼리 생성
              updateQuery = {};
              updateQuery["curation.image"] = image;

              // 클라이언트 히스토리 업데이트
              await back.updateHistory("client", [ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });

          } else {
              // 올바르지 않은 mode 값이 주어졌을 때 에러 발생
              throw new Error("invalid mode");
          }

          // 작업 완료 후 성공 메시지를 JSON 형식으로 응답
          res.send(JSON.stringify({ message: "done" }));

      } catch (e) {
          // 에러 발생 시 에러 로그 기록 후 클라이언트에 에러 메시지를 반환
          logger.error(e, req).catch((e) => { console.log(e); });
          res.set("Content-Type", "application/json");
          res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /designerProposal_submit
     * @description 클라이언트가 디자이너를 선택했을 때, 해당 디자이너의 제안서를 제출하는 라우터입니다.
     *              프로젝트와 클라이언트 정보를 업데이트하고, 카카오톡 알림을 보냅니다.
     * @param {Object} req - 클라이언트 요청 객체로, 프로젝트 ID(proid), 클라이언트 ID(cliid), 디자이너 ID(desid) 등의 정보를 포함합니다.
     * @param {Object} res - 서버 응답 객체로, 처리 결과를 JSON 형식으로 반환합니다.
     */
    router.post([ "/designerProposal_submit" ], async function (req, res) {
      // 응답 헤더 설정
      res.set({
          "Content-Type": "application/json", // 응답 데이터를 JSON 형식으로 설정
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서 접근 허용
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용할 HTTP 메서드를 설정
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용할 요청 헤더 설정
      });

      try {
          // 요청에서 필요한 데이터 추출
          let { cliid, proid, desid, name, phone, designer, method } = req.body; 
          let thisProject, thisClient, requestNumber;
          let action;

          // 프로젝트 ID로 프로젝트 정보를 가져옴
          thisProject = await back.getProjectById(proid, { selfMongo: instance.mongo }); 
          // 클라이언트 ID로 클라이언트 정보를 가져옴
          thisClient = await back.getClientById(cliid, { selfMongo: instance.mongo }); 
          
          // 클라이언트의 요청 중 프로젝트 타임라인과 일치하는 요청을 찾음
          requestNumber = 0; 
          for (let i = 0; i < thisClient.requests.length; i++) {
              // 클라이언트 요청의 타임라인이 프로젝트 제안서 날짜와 같거나 이전이면 해당 요청을 찾음
              if (thisClient.requests[i].request.timeline.valueOf() <= thisProject.proposal.date.valueOf()) {
                  requestNumber = i;
                  break;
              }
          }

          // 디자이너 선택에 따른 액션 명시
          action = "디자이너 선택"; 

          // 해당 디자이너에 대한 스타일링 청구서를 생성하기 위한 API 호출
          await requestSystem("https://" + address.officeinfo.host + ":3002/createStylingBill", { proid, desid }, { headers: { "Content-Type": "application/json" } });
          
          // 선택한 서비스가 온라인인지 여부에 따라 프로젝트 정보를 업데이트
          await back.updateProject([ { proid }, { "service.online": (method === "online") } ], { selfMongo: instance.mongo });

          // 메시지 전송: 클라이언트가 선택한 디자이너 정보를 알림
          messageSend({
              text: `${name} 고객님이 ${designer} 디자이너를 선택하셨어요.`, 
              channel: "#400_customer", // 알림을 보낼 채널
              voice: true // 음성 알림 설정
          }).then(() => {
              // 클라이언트 요청에 대한 응답 분석 업데이트
              let updateObj = {};
              updateObj["requests." + String(requestNumber) + ".analytics.response.action"] = action; // 선택한 디자이너 정보 업데이트
              return back.updateClient([ { cliid }, updateObj ], { selfMongo: instance.mongo });
          }).catch((err) => {
              // 오류 발생 시 로그 기록
              logger.error(err, req).catch((e) => { console.log(e); });
          });

          // 클라이언트에게 카카오톡 알림 전송 (디자이너 선택 관련)
          await instance.kakao.sendTalk("designerSelect", name, phone, {
              client: name, // 클라이언트 이름
              designer: designer, // 선택한 디자이너 이름
              host: address.frontinfo.host, // 프론트엔드 호스트 주소
              cliid: cliid, // 클라이언트 ID
              needs: ("style," + desid + "," + proid + "," + method), // 스타일링 요청 정보
          });

          // 작업 완료 후 성공 응답 반환
          res.send(JSON.stringify({ index: 0 }));

      } catch (e) {
          // 에러 발생 시 에러 로그 기록 후 클라이언트에 에러 메시지를 반환
          logger.error(e, req).catch((e) => { console.log(e); });
          res.set("Content-Type", "application/json");
          res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /designerProposal_policy
     * @description 디자이너 제안서와 관련된 정책(policy)과 버튼 상태(button)를 반환하는 라우터입니다.
     * @param {object} req - 클라이언트 요청 객체. 요청 본문은 필요하지 않습니다.
     * @param {object} res - 서버 응답 객체. 정책과 버튼 상태를 JSON 형식으로 반환합니다.
     */
    router.post([ "/designerProposal_policy" ], async function (req, res) {
      // 응답 헤더 설정: JSON 형식 및 CORS 설정을 추가하여 다양한 출처에서 이 API에 접근할 수 있도록 허용합니다.
      res.set({
          "Content-Type": "application/json",  // 응답 데이터를 JSON 형식으로 반환
          "Access-Control-Allow-Origin": "*",  // 모든 도메인에서의 접근을 허용
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",  // 허용된 HTTP 메서드 설정
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",  // 허용된 헤더 설정
      });

      try {
          let resultObj;

          /**
           * @description 정책과 버튼 상태를 객체로 반환합니다.
           * @returns {object} resultObj - policy와 button 정보를 담은 객체
           */
          resultObj = {
              policy: DataRouter.policy(),  // 정책을 가져오는 메서드 호출
              button: DataRouter.policyButton(),  // 버튼 상태를 가져오는 메서드 호출
          };

          // 정책과 버튼 상태를 포함한 객체를 JSON 형식으로 반환합니다.
          res.send(JSON.stringify(resultObj));

      } catch (e) {
          // 에러가 발생한 경우, 에러 로그를 기록합니다.
          logger.error(e, req).catch((e) => { console.log(e); });

          // 에러가 발생해도 정책과 버튼 상태를 반환합니다.
          res.send(JSON.stringify({
              policy: DataRouter.policy(),  // 정책을 가져오는 메서드 호출
              button: DataRouter.policyButton(),  // 버튼 상태를 가져오는 메서드 호출
          }));
      }
    });
    
    /**
     * @route POST /designerProposal_getDesigners
     * @description 클라이언트가 디자이너 목록을 요청할 때 사용되는 라우터입니다. 
     *              주어진 조건에 맞는 디자이너 목록을 반환하며, 실시간 매칭 상태를 확인할 수 있습니다.
     * @param {Object} req - 클라이언트 요청 객체로, 요청 본문에 proid(프로젝트 ID)와 whereQuery(디자이너 검색 조건)가 포함됩니다.
     * @param {Object} res - 서버 응답 객체로, 처리 결과를 JSON 형식으로 반환합니다.
     */
    router.post([ "/designerProposal_getDesigners" ], async function (req, res) {
      // 응답 헤더 설정
      res.set({
          "Content-Type": "application/json", // 응답 데이터를 JSON 형식으로 설정
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서 접근 허용
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용할 HTTP 메서드를 설정
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용할 요청 헤더 설정
      });

      try {
          // 요청에 필요한 데이터가 없으면 에러 처리
          if (req.body.whereQuery === undefined || req.body.proid === undefined) {
              throw new Error("invaild post"); // 필수 데이터가 없으면 오류를 던짐
          }

          // 요청 본문에서 데이터를 추출
          const { whereQuery, proid } = equalJson(req.body); // equalJson은 JSON 파싱 및 복사에 사용됨
          const thisProject = await back.getProjectById(proid, { selfMongo: instance.mongo }); // 프로젝트 ID로 프로젝트 데이터를 가져옴
          const designers = await back.getDesignersByQuery(whereQuery, { withTools: true, selfMongo: instance.mongo }); // 검색 조건에 맞는 디자이너 목록을 가져옴
          let designersNormal; // 최종적으로 반환할 디자이너 목록
          let designerNormal; // 개별 디자이너 데이터
          let realtime; // 실시간 매칭 상태
          let thisDesigner; // 현재 처리 중인 디자이너
          let designerMode; // 디자이너 모드 설정

          // 디자이너 모드 설정 (필수 입력이 아니며, 설정된 경우 그에 따라 처리)
          designerMode = false; 
          if (req.body.designerMode !== undefined) {
              if (req.body.designerMode === 1 || req.body.designerMode === '1') {
                  designerMode = true; // designerMode가 1이면 true로 설정
              }
          }

          // 디자이너 모드가 활성화되지 않은 경우
          if (!designerMode) {
              designersNormal = [];
              // 프로젝트 제안서의 디자이너 목록에서 각 디자이너에 대해 처리
              for (let { desid } of thisProject.proposal.detail) {
                  thisDesigner = designers.find((d) => { return d.desid === desid }); // 프로젝트의 디자이너를 검색
                  realtime = await work.realtimeDesignerMatch(desid, proid, { selfMongo: instance.mongo, selfConsoleMongo: instance.mongolocal }); // 실시간 매칭 상태 확인
                  designerNormal = thisDesigner.toNormal(); // 디자이너 데이터를 일반 형식으로 변환
                  designerNormal.end = !realtime.result; // 매칭 종료 여부 설정
                  designersNormal.push(designerNormal); // 최종 디자이너 목록에 추가
              }
              res.send(JSON.stringify(designersNormal)); // 처리된 디자이너 목록을 클라이언트에 전송
          } else {
              // 디자이너 모드가 활성화된 경우
              designersNormal = [];
              for (let { desid } of designers) {
                  thisDesigner = designers.find((d) => { return d.desid === desid }); // 디자이너 목록에서 각 디자이너를 처리
                  designerNormal = thisDesigner.toNormal(); // 디자이너 데이터를 일반 형식으로 변환
                  designerNormal.end = false; // 매칭 종료 여부 설정 (디자이너 모드에서는 항상 false)
                  designersNormal.push(designerNormal); // 최종 디자이너 목록에 추가
              }
              res.send(JSON.stringify(designersNormal)); // 처리된 디자이너 목록을 클라이언트에 전송
          }

      } catch (e) {
          // 에러 발생 시 에러 로그 기록 후 클라이언트에 에러 메시지를 반환
          logger.error(e, req).catch((e) => { console.log(e); });
          res.set("Content-Type", "application/json");
          res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /styleCuration_getPhotos
     * @description 스타일 큐레이션에서 사진을 가져오는 라우터입니다. 
     *              디자이너의 스타일 분석 데이터를 함께 반환하며, 특정 조건에 따라 사진을 필터링합니다.
     * @param {Object} req - 클라이언트 요청 객체로, 스타일 큐레이션 작업을 트리거합니다.
     * @param {Object} res - 서버 응답 객체로, 처리 결과를 JSON 형식으로 반환합니다.
     */
    router.post([ "/styleCuration_getPhotos" ], async function (req, res) {
      // 응답 헤더 설정
      res.set({
          "Content-Type": "application/json", // 응답 데이터를 JSON 형식으로 설정
          "Access-Control-Allow-Origin": "*", // 모든 도메인에서 접근 허용
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용할 HTTP 메서드를 설정
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용할 요청 헤더 설정
      });

      try {
          const selfMongo = instance.mongo; // MongoDB 인스턴스 참조
          // 콘텐츠 배열을 쿼리하여 가져옴
          const contentsArr = await back.getContentsArrByQuery({}, { selfMongo });
          // 모든 디자이너 목록을 가져옴
          const designers = await back.getDesignersByQuery({}, { selfMongo });

          // 예외 처리할 파일 리스트 (필터링 대상)
          const exceptionList = [
              "t16a41.jpg", "t1p36.jpg", "t1a33.jpg", "t1a20.jpg", "t2a33.jpg",
              "t5a27.jpg", "t8p9.jpg", "t13a27.jpg", "t19a41.jpg", "t1p12.jpg", 
              "t9a37.jpg"
          ];

          let photos, sendingDesigners, temp;

          // 콘텐츠 배열에서 모든 사진을 가져옴
          photos = contentsArr.getAllPhotos();

          // 디자이너 데이터를 담을 배열 초기화
          sendingDesigners = [];

          // 각 디자이너에 대해 처리
          for (let designer of designers) {
              temp = designer.toNormal(); // 디자이너 객체를 일반 형식으로 변환
              temp.tendency = designer.analytics.styling.tendency.toMatrix(); // 디자이너 스타일 분석 데이터를 행렬로 변환
              sendingDesigners.push(temp); // 변환된 디자이너 데이터를 추가
          }

          // 사진 배열에 각 디자이너의 스타일 분석 데이터를 추가
          for (let obj of photos) {
              for (let designer of designers) {
                  if (obj.desid === designer.desid) { // 사진과 디자이너 매칭
                      obj.tendency = designer.analytics.styling.tendency.toMatrix(); // 스타일 분석 데이터를 추가
                      break; // 해당 디자이너 찾으면 반복 종료
                  }
              }
          }

          // 예외 목록에 포함된 파일을 제외한 사진을 필터링
          photos = photos.filter((o) => {
              return !/before/gi.test(o.room) && !/withdesigner/gi.test(o.room) && !exceptionList.includes(o.file);
          });

          // 사진의 키워드에서 특정 키워드를 제외하는 필터링 처리
          photos = photos.map((o) => {
              o.keywords = o.keywords.filter((s) => {
                  return !/아파트|거주중|아기|아이|부부|가족|소품|거실|주방|신축|서재|톤앤|스타일링|조명|오피스텔|홈스타일링|홈퍼니싱|토탈|인테리어|인가구|다이닝|깔끔|인스타/gi.test(s);
              });
              return o; // 필터링된 사진 반환
          });

          // 스타일 분석 값이 모두 0인 사진을 제외하는 필터링 처리
          photos = photos.filter((obj) => {
              return !obj.tendency.every((num) => { return num === 0; });
          });

          // 처리된 사진, 콘텐츠 배열, 디자이너 목록을 클라이언트에 전송
          res.send(JSON.stringify({ photos, contentsArr, designers: sendingDesigners }));

      } catch (e) {
          // 에러 발생 시 에러 로그 기록 후 클라이언트에 에러 메시지를 반환
          logger.error(e, req).catch((e) => { console.log(e); });
          res.set("Content-Type", "application/json");
          res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /styleCuration_updateCalculation
     * @description 스타일 큐레이션 결과를 업데이트하는 라우터입니다. 클라이언트의 제안서 및 요청 데이터를 기반으로 처리합니다.
     * @param {object} req - 클라이언트 요청 객체. 본문에는 cliid(고객 ID), historyQuery(히스토리 업데이트 쿼리), coreQuery(코어 업데이트 쿼리), mode(작업 모드)가 포함됩니다.
     * @param {object} res - 서버 응답 객체. 업데이트된 서비스 및 클라이언트 데이터를 반환합니다.
     */
    router.post([ "/styleCuration_updateCalculation" ], async function (req, res) {
      // 응답 헤더 설정: JSON 형식으로 반환하고, CORS 설정을 추가하여 다양한 출처에서 이 API에 접근할 수 있도록 허용합니다.
      res.set({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });

      try {
          // 요청 본문에서 필수 값들이 존재하지 않는지 확인합니다.
          if (req.body.cliid === undefined || req.body.historyQuery === undefined || req.body.coreQuery === undefined || req.body.mode === undefined) {
              throw new Error("invalid post");
          }

          // 전달받은 데이터를 equalJson 메서드를 사용하여 깊은 복사합니다.
          const cliid = req.body.cliid;  // 클라이언트 ID
          const historyQuery = equalJson(req.body.historyQuery);  // 히스토리 업데이트 쿼리
          const coreQuery = equalJson(req.body.coreQuery);  // 코어 업데이트 쿼리
          const mode = req.body.mode;  // 작업 모드

          let client, history;

          // 타임아웃을 확인하고, 스타일 큐레이션 관련 타임아웃이 설정된 경우 이를 해제합니다.
          if (DataRouter.timeouts["styleCuration_styleCheckComplete_" + cliid] !== undefined && DataRouter.timeouts["styleCuration_styleCheckComplete_" + cliid] !== null) {
              clearTimeout(DataRouter.timeouts["styleCuration_styleCheckComplete_" + cliid]);
              DataRouter.timeouts["styleCuration_styleCheckComplete_" + cliid] = null;
          }

          if (DataRouter.timeouts["styleCuration_pageInitComplete_" + cliid] !== undefined && DataRouter.timeouts["styleCuration_pageInitComplete_" + cliid] !== null) {
              clearTimeout(DataRouter.timeouts["styleCuration_pageInitComplete_" + cliid]);
              DataRouter.timeouts["styleCuration_pageInitComplete_" + cliid] = null;
          }

          // 클라이언트의 히스토리를 조회하고, 없으면 생성합니다.
          history = await back.getHistoryById("client", cliid, { selfMongo: instance.mongolocal });
          if (history === null) {
              await back.createHistory("client", { cliid }, { selfMongo: instance.mongolocal, secondMongo: instance.mongo });
          }

          // coreQuery가 있는 경우 클라이언트 데이터를 업데이트합니다.
          if (Object.keys(coreQuery).length > 0) {
              await back.updateClient([ { cliid }, coreQuery ], { selfMongo: instance.mongo });
          }

          // historyQuery가 있는 경우 클라이언트의 히스토리 데이터를 업데이트합니다.
          if (Object.keys(historyQuery).length > 0) {
              await back.updateHistory("client", [ { cliid }, historyQuery ], { selfMongo: instance.mongolocal });
              history = await back.getHistoryById("client", cliid, { selfMongo: instance.mongolocal });
          }

          // 클라이언트의 케이스를 가져옵니다. 존재하지 않으면 에러를 반환합니다.
          const clientCase = await back.getCaseProidById(cliid, { selfMongo: instance.mongo });
          if (clientCase === null) {
              throw new Error("invalid client case");
          } else {
              const service = clientCase.caseService();  // 케이스 서비스 데이터를 가져옵니다.
              let detailUpdate = [], updateQuery = {}, newProid = null;
              let requestNumber = 0;
              let action;

              client = clientCase.client;  // 클라이언트 데이터를 가져옵니다.

              // 클라이언트의 요청 상태에 따라 action 값을 설정합니다.
              if ([ "부재중 알림 발송", "상세 설문 대기" ].includes(client.requests[requestNumber].analytics.response.action.value)) {
                  action = "부재중 제안 발송";
              } else {
                  action = "제안 발송 예정";
              }

              // 타겟 서비스 ID를 설정합니다.
              const targetSerid = (req.body.fromConsole !== undefined && Number(req.body.fromConsole) === 1) ? [ client.requests[requestNumber].analytics.response.service.serid ] : history.curation.service.serid;

              // 디자이너 큐레이션 작업을 수행합니다.
              work.designerCuration(cliid, 4, targetSerid, { selfMongo: instance.mongo, selfLocalMongo: instance.mongolocal }).then((detail) => {
                  for (let obj of detail) {
                      detailUpdate.push(obj);  // 큐레이션 세부 정보를 업데이트합니다.
                  }

                  // 제안서 상태 및 세부 정보 업데이트
                  updateQuery = {
                      desid: "",
                      "proposal.status": "작성중",
                      "proposal.date": new Date(),
                      cliid,
                      "service.serid": targetSerid[0],
                      "service.xValue": "B",
                      "service.online": false,
                      "proposal.detail": detailUpdate,
                  };

                  return back.getProjectsByQuery({ cliid }, { selfMongo: instance.mongo });

              }).then((rows) => {
                  // 기존 프로젝트가 있으면 업데이트하고, 없으면 새로 생성합니다.
                  if (detailUpdate.length > 0) {
                      if (rows.length > 0 && rows[0].desid === "") {
                          newProid = rows[0].proid;
                          return back.updateProject([ { proid: newProid }, updateQuery ], { selfMongo: instance.mongo });
                      } else {
                          return back.createProject(updateQuery, { selfMongo: instance.mongo });
                      }
                  } else {
                      return Promise.resolve(null);  // 세부 정보가 없으면 작업을 패스합니다.
                  }

              }).then((proid) => {
                  if (newProid === null) {
                      newProid = proid;
                  }
                  return Promise.resolve(null);  // 프로젝트가 생성되거나 업데이트된 후 처리합니다.

              }).then(() => {
                  // 콘솔에서 요청한 것이 아닌 경우 클라이언트 데이터를 업데이트합니다.
                  if (Number(req.body.fromConsole) !== 1) {
                      let updateObj = {};
                      updateObj["requests." + String(requestNumber) + ".analytics.response.action"] = action;

                      return back.updateClient([ { cliid }, updateObj ], { selfMongo: instance.mongo });
                  } else {
                      return Promise.resolve(null);  // 콘솔에서 요청한 경우 추가 작업 없음
                  }

              }).then(() => {
                  // 메시지를 전송하여 큐레이션 작업 완료 알림을 보냅니다.
                  if (detailUpdate.length > 0) {
                      return messageSend({ text: client.name + " 고객님의 디자이너 추천서가 자동으로 제작되었습니다!", channel: "#404_curation", voice: false });
                  } else {
                      return messageSend({ text: client.name + " 고객님의 디자이너 추천서를 자동으로 제작하려 했으나 매칭되는 경우가 없습니다!", channel: "#404_curation", voice: false });
                  }

              }).catch((err) => {
                  // 에러 발생 시 로그와 알림을 보냅니다.
                  console.log(err);
                  messageSend({ text: client.name + " 제안서 제작 중 문제 발생: " + err.message, channel: "#404_curation" }).catch((e) => { console.log(e); });
              });

              // 콘솔에서 요청한 것이 아닌 경우 추가 작업을 수행합니다.
              if (Number(req.body.fromConsole) !== 1) {
                  await instance.kakao.sendTalk("curationComplete", client.name, client.phone, {
                      client: client.name,
                      cliid: client.cliid,
                      host: instance.address.frontinfo.host,
                      path: "about",
                  });
                  await messageSend({ text: client.name + " 고객님께 큐레이션 완료 알림톡을 보냈습니다.", channel: "#404_curation" });
                  await requestSystem("https://" + instance.address.officeinfo.ghost.host + ":3000/storeClientAnalytics", { fast: true }, { headers: { "Content-Type": "application/json" } });
              }

              // 최종 응답을 클라이언트에 전송합니다.
              res.send(JSON.stringify({ service: [], client: client.toNormal(), history }));

          }
      } catch (e) {
          // 에러 발생 시 에러 로그를 기록하고, 에러 메시지를 반환합니다.
          logger.error(e, req).catch((e) => { console.log(e); });
          res.set("Content-Type", "application/json");
          res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /styleCuration_styleCheckComplete
     * @description 스타일 큐레이션 완료를 처리하는 라우터입니다.
     * @param {object} req - 클라이언트 요청 객체.
     * @param {object} res - 서버 응답 객체.
     */
    router.post([ "/styleCuration_styleCheckComplete" ], async function (req, res) {
      // 응답 헤더 설정: JSON 형식 응답, CORS 허용
      res.set({
        "Content-Type": "application/json", // 응답 데이터 형식을 JSON으로 설정
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서 접근 허용
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용할 HTTP 메서드 설정
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용할 요청 헤더 설정
      });

      try {
        // 클라이언트 요청의 필수 필드가 누락된 경우 오류 처리
        if (req.body.cliid === undefined || req.body.name === undefined || req.body.image === undefined) {
          throw new Error("invalid post"); // 필수 필드가 없을 때 오류 발생
        }

        // 요청 본문에서 cliid, name, image 필드를 추출 (equalJson을 통해 깊은 복사 및 Date 객체 처리)
        const { cliid, name, image } = equalJson(req.body);

        let text, channel; // 메시지 및 채널을 저장할 변수
        // 스타일 찾기 완료 메시지 설정
        text = name + " 고객님이 스타일 찾기를 완료하였어요.";
        channel = "#404_curation"; // 메시지를 전송할 채널 설정

        // 메시지 전송 (messageSend 함수 호출, 음성 기능 비활성화)
        messageSend({ text, channel, voice: false }).catch((e) => {
          console.log(e); // 오류 발생 시 콘솔에 출력
        });

        // 클라이언트에게 완료 응답 전송
        res.send(JSON.stringify({ message: "done" }));

      } catch (e) {
        // 오류 발생 시 로그에 기록하고 클라이언트에게 오류 메시지 전송
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    /**
     * @route POST /styleCuration_pageInitComplete
     * @description 클라이언트가 스타일 찾기 페이지에 진입한 후의 초기화 작업을 처리하는 라우터입니다.
     * @param {object} req - 클라이언트 요청 객체.
     * @param {object} req.body - 요청 본문 데이터.
     * @param {string} req.body.cliid - 클라이언트 ID.
     * @param {string} req.body.name - 클라이언트 이름.
     * @param {string} req.body.phone - 클라이언트 전화번호.
     * @param {object} res - 서버 응답 객체.
     */
    router.post([ "/styleCuration_pageInitComplete" ], async function (req, res) {
      // 응답 헤더 설정: JSON 형식의 응답, CORS 허용
      res.set({
        "Content-Type": "application/json", // 응답 데이터 형식을 JSON으로 설정
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근 허용
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용할 HTTP 메서드 설정
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용할 요청 헤더 설정
      });

      try {
        // 필수 필드(cliId, name, phone)가 없을 경우 에러 발생
        if (req.body.cliid === undefined || req.body.name === undefined || req.body.phone === undefined) {
          throw new Error("invalid post"); // 필드가 누락된 경우 에러 처리
        }

        // 요청 본문을 equalJson으로 파싱하여 데이터 변수 할당
        const { cliid, name, phone } = equalJson(req.body);

        // 슬랙에 보낼 텍스트 메시지 생성
        let text = name + " 고객님이 스타일 찾기 페이지에 진입하셨어요.";

        // 메세지 보낼 슬랙 채널 설정
        let channel = "#error_log";

        // 슬랙으로 메세지 전송, 비동기 처리
        messageSend({ text, channel, voice: false }).catch((e) => {
          console.log(e); // 에러 발생 시 콘솔에 출력
        });

        // 이전에 설정된 타이머가 있는지 확인 후, 있으면 해당 타이머 제거
        if (DataRouter.timeouts["styleCuration_pageInitComplete_" + cliid] !== undefined && DataRouter.timeouts["styleCuration_pageInitComplete_" + cliid] !== null) {
          clearTimeout(DataRouter.timeouts["styleCuration_pageInitComplete_" + cliid]); // 기존 타이머 제거
          DataRouter.timeouts["styleCuration_pageInitComplete_" + cliid] = null; // 타이머 초기화
        }

        // 새로운 타이머 설정: 30분 후 클라이언트 상태 확인 및 응대 작업 수행
        DataRouter.timeouts["styleCuration_pageInitComplete_" + cliid] = setTimeout(async () => {
          try {
            // 클라이언트 데이터를 MongoDB에서 가져옴
            const client = await back.getClientById(cliid, { selfMongo: instance.mongo });

            // 클라이언트의 응대 상태와 작업 상태를 확인
            if (client.requests[0].analytics.response.status.value === "응대중" && client.requests[0].analytics.response.action.value === "1차 응대 예정") {
              // 카카오톡 알림톡을 통해 클라이언트에게 요청 메시지 전송
              await kakao.sendTalk("pushClient", client.name, client.phone, {
                client: client.name,
                host: address.frontinfo.host,
                path: "curation",
                cliid: cliid,
              });

              // 슬랙 채널에 응대 완료 요청 알림 메시지 전송
              await messageSend({ text: client.name + " 고객님께 신청 완료해달라고 부탁했어요.", channel: "#404_curation", voice: true });
            }
          } catch (e) {
            console.log(e); // 에러 발생 시 콘솔 출력
          }
        }, 30 * 60 * 1000); // 30분(30 * 60 * 1000ms) 후에 타이머 동작

        // 성공 메시지 응답
        res.send(JSON.stringify({ message: "done" }));
      
      } catch (e) {
        // 에러 발생 시 에러 로그 기록 및 에러 메시지 응답
        logger.error(e, req).catch((e) => { console.log(e); }); // 에러를 로그에 기록
        res.set("Content-Type", "application/json"); // 응답 데이터 형식을 JSON으로 설정
        res.send(JSON.stringify({ error: e.message })); // 에러 메시지 클라이언트에 전송
      }
    });
    
    /**
     * @route POST /styleCuration_styleChecking
     * @description 클라이언트가 스타일 찾기 사진을 체크한 정보를 처리하는 라우터입니다.
     * @param {object} req - 클라이언트 요청 객체.
     * @param {object} req.body - 요청 본문 데이터.
     * @param {string} req.body.cliid - 클라이언트 ID.
     * @param {string} req.body.name - 클라이언트 이름.
     * @param {string} req.body.phone - 클라이언트 전화번호.
     * @param {array} req.body.photos - 클라이언트가 체크한 사진 리스트.
     * @param {object} res - 서버 응답 객체.
     */
    router.post([ "/styleCuration_styleChecking" ], async function (req, res) {
      // 응답 헤더 설정: JSON 형식의 응답, CORS 허용
      res.set({
        "Content-Type": "application/json", // 응답 본문의 데이터 형식을 JSON으로 설정
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서 접근 허용
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용할 HTTP 메서드 지정
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용할 요청 헤더 지정
      });

      try {
        // 요청 본문에서 필수 필드(cliId, name, phone, photos)가 모두 있는지 확인, 없으면 에러 발생
        if (req.body.cliid === undefined || req.body.name === undefined || req.body.phone === undefined || req.body.photos === undefined) {
          throw new Error("invalid post"); // 필수 필드가 없는 경우 에러 발생
        }

        // 요청 본문 데이터를 equalJson을 통해 파싱 및 깊은 복사하여 변수로 저장
        const { cliid, name, phone, photos } = equalJson(req.body);

        // 고객이 보낸 사진 정보로 메세지 텍스트 생성
        let text = name + " 고객님이 스타일 찾기 사진 체크를 함 => "  + String(photos.length);

        // 메세지를 전송할 슬랙 채널 설정
        let channel = "#error_log"; // 주로 에러 또는 로그를 기록하는 채널로 메세지를 전송함

        // messageSend 함수를 이용해 슬랙 채널로 메세지 전송, 비동기 처리 및 에러 핸들링
        messageSend({ text, channel, voice: false }).catch((e) => {
          console.log(e); // 전송 중 에러 발생 시 로그 출력
        });

        // 성공 메시지 응답
        res.send(JSON.stringify({ message: "done" }));
      } catch (e) {
        // 에러 발생 시 로그 기록 후 에러 메시지 응답
        logger.error(e, req).catch((e) => { console.log(e); }); // 에러를 로그로 남김
        res.set("Content-Type", "application/json"); // 에러 응답의 Content-Type 설정
        res.send(JSON.stringify({ error: e.message })); // 에러 메시지를 JSON 형식으로 클라이언트에 전송
      }
    });
    
    /**
     * @route POST /styleCuration_getTotalMenu
     * @description 스타일 큐레이션을 위한 메뉴를 불러오거나 분석 데이터를 제공하는 라우터입니다.
     * @param {object} req - 클라이언트 요청 객체.
     * @param {object} res - 서버 응답 객체.
     */
    router.post([ "/styleCuration_getTotalMenu" ], async function (req, res) {
      // 응답 헤더 설정: JSON 형식 응답, CORS 허용
      res.set({
        "Content-Type": "application/json", // 응답 데이터 형식을 JSON으로 설정
        "Access-Control-Allow-Origin": "*", // 모든 도메인에서 접근 허용
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD", // 허용할 HTTP 메서드 설정
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me", // 허용할 요청 헤더 설정
      });

      try {
        // MongoDB 인스턴스 및 기타 변수 초기화
        const selfMongo = instance.mongo; // 기본 Mongo 인스턴스
        const selfCoreMongo = instance.mongo; // 별도 Mongo 인스턴스
        const unknown = "알 수 없음"; // 기본 값으로 설정된 알 수 없는 값
        const selfLogMongo = instance.mongo; // 로그를 위한 Mongo 인스턴스
        
        // 제공할 메뉴 데이터 배열 정의
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
                source: "/service_f.png",
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
                source: "/service_s.png",
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
                source: "/service_t.png",
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
        /**
         * @constant {object} dummyData
         * @description 테스트나 초기화를 위한 더미 데이터 객체. 다양한 고객 정보를 기본 값으로 저장.
         */
        const dummyData = {
          cliid: unknown, // 클라이언트 ID, 기본 값으로 unknown 설정
          selection: unknown, // 선택 항목, 기본 값 unknown
          receive: unknown, // 응답 상태, 기본 값 unknown
          image: unknown, // 이미지 관련 정보, 기본 값 unknown
          service: unknown, // 제공되는 서비스 정보, 기본 값 unknown
          serid: 's2011_aa02s', // 서비스 ID, 기본 값 설정
          construct: unknown, // 시공 관련 정보, 기본 값 unknown
          constructItems: unknown, // 시공 항목 리스트, 기본 값 unknown
          constructEnvironment: unknown, // 시공 환경 정보, 기본 값 unknown
          budget: unknown, // 예산 정보, 기본 값 unknown
          furniture: unknown, // 가구 관련 정보, 기본 값 unknown
          fabric: unknown, // 패브릭(천) 관련 정보, 기본 값 unknown
          expect: unknown, // 예상되는 항목 정보, 기본 값 unknown
          purchase: unknown, // 구매 관련 정보, 기본 값 unknown
          family: unknown, // 가족 구성 정보, 기본 값 unknown
          age: unknown, // 나이 정보, 기본 값 unknown
          time: unknown, // 시간 정보, 기본 값 unknown
        };

        /**
         * @constant {string} collection
         * @description MongoDB의 "clientHistory" 컬렉션을 나타냄.
         */
        const collection = "clientHistory"; // MongoDB 컬렉션 이름 설정

        /**
         * @constant {string} collection2
         * @description "blackButtonsClick" 컬렉션을 참조하여 블랙 버튼 클릭 데이터를 저장.
         */
        const collection2 = "blackButtonsClick"; // 다른 MongoDB 컬렉션 이름 설정

        /**
         * @constant {string} collection3
         * @description "homeliaisonAnalytics" 컬렉션을 참조하여 홈 연계 분석 데이터를 저장.
         */
        const collection3 = "homeliaisonAnalytics"; // 또 다른 MongoDB 컬렉션 이름 설정

        /**
         * @constant {string} defaultButton
         * @description 기본 버튼 상태를 나타내는 상수. 기본 값은 "consulting"으로 설정.
         */
        const defaultButton = "consulting"; // 기본 버튼 상태 설정

        // 쿼리문, 프로젝트 쿼리 및 데이터들을 저장할 변수를 초기화
        let whereQuery, projectQuery;
        let rows, rows2; // MongoDB에서 반환된 결과들을 저장할 배열 변수
        let filteredBlack; // 필터링된 데이터
        let thisCliid, curation; // 클라이언트 ID와 큐레이션 데이터 저장 변수
        let selection; // 선택한 항목을 저장하는 변수
        let resultJson; // 최종적으로 반환할 JSON 객체
        let tong; // 결과 데이터 모음을 위한 배열
        let check; // 체크 항목에 대한 임시 저장 변수
        let receive; // 응답 관련 데이터를 저장하는 변수
        let rows3; // 추가 MongoDB 쿼리 결과 저장 변수
        let start; // 큐레이션의 시작 상태를 나타내는 변수
        let target; // 큐레이션의 목표 상태를 나타내는 변수
        let thisAnalytics; // 분석 데이터를 저장하는 변수
        let thisStatus; // 현재 상태를 저장하는 변수
        let cliidStatusArr; // 클라이언트 ID와 상태를 쌍으로 저장하는 배열
    
      // 클라이언트에서 요청한 모드 값이 undefined 또는 null이거나, 'get'일 경우
      if (req.body.mode === undefined || req.body.mode === null || req.body.mode === "get") {
        // 클라이언트에게 totalMenu 데이터를 JSON 형식으로 응답
        res.send(JSON.stringify({ totalMenu }));

      // 요청한 모드가 'dummy'일 경우
      } else if (req.body.mode === "dummy") {
        // 클라이언트에게 더미 데이터를 응답
        res.send(JSON.stringify({ dummy: dummyData }));

      // 모드가 'analytics', 'parse', 또는 'parsing'일 경우
      } else if (req.body.mode === "analytics" || req.body.mode === "parse" || req.body.mode === "parsing") {
        
        // 클라이언트 요청 데이터에서 cliids와 statusArr 추출 (equalJson은 깊은 복사를 수행하는 메서드)
        const { cliids, statusArr } = equalJson(req.body);
        
        // MongoDB에서 cliid에 해당하는 데이터를 찾기 위한 조건 쿼리 설정
        whereQuery = { $or: cliids.map((cliid) => { return { cliid } }) };
        
        // 필요한 필드를 추출하기 위한 프로젝트 쿼리 설정 (cliid, curation.image, curation.check)
        projectQuery = { "cliid": 1, "curation.image": 1, "curation.check": 1 };

        // MongoDB에서 데이터를 가져옴 (컬렉션과 쿼리, 프로젝트 쿼리를 사용하여 데이터 추출)
        rows = await back.mongoPick(collection, [whereQuery, projectQuery], { selfMongo });
        rows2 = await back.mongoRead(collection2, whereQuery, { selfMongo });

        // pageInit 액션과 관련된 데이터 필터링
        whereQuery = { $or: cliids.map((cliid) => { return { "data.cliid": cliid, "action": "pageInit" } }) };
        projectQuery = { "page": 1, "data": 1, "action": 1 };
        rows3 = await back.mongoPick(collection3, [whereQuery, projectQuery], { selfMongo: selfLogMongo });

        // cliid와 상태 배열 초기화
        cliidStatusArr = [];
        for (let i = 0; i < cliids.length; i++) {
          cliidStatusArr.push([cliids[i], statusArr[i]]);
        }

        tong = []; // 결과 데이터를 저장할 배열

        // MongoDB에서 가져온 데이터를 순회
        for (let obj of rows) {
          thisCliid = obj.cliid; // 현재 클라이언트 ID
          thisStatus = cliidStatusArr.find((arr) => { return arr[0] === thisCliid })[1]; // 현재 상태 찾기

          curation = objectDeepCopy(obj.curation); // 큐레이션 데이터를 깊은 복사
          check = curation.check; // 큐레이션 체크 정보 추출
          thisAnalytics = rows3.filter((o) => { return o.data.cliid === thisCliid }); // 분석 데이터 필터링
          filteredBlack = rows2.filter((o) => { return o.cliid === thisCliid }); // 블랙리스트 필터링

          // 필터링된 데이터가 없을 경우 기본 버튼 설정
          if (filteredBlack.length === 0) {
            selection = defaultButton;
          } else {
            filteredBlack.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });
            selection = filteredBlack[0].mode;
          }

          // 스타일 큐레이션 진입 여부에 따른 상태 설정
          if (thisAnalytics.filter((o) => { return o.page === "styleCuration" }).length === 0) {
            start = "스타일 체크 거부"; // 스타일 체크를 거부한 경우
            target = "단순 드랍 대상"; // 단순 드랍 대상으로 설정
          } else {
            start = "스타일 체크 진입"; // 스타일 체크에 진입한 경우
            target = "1차 응대 대상"; // 1차 응대 대상으로 설정
          }

          // 상태에 따라 응대 및 추천 여부 결정
          if (/단순 드랍 대상/gi.test(target) || /드랍/gi.test(thisStatus)) {
            selection = "응대 불필요"; // 응대가 필요하지 않은 경우
            receive = "추천 불필요"; // 추천이 필요하지 않은 경우
          } else {
            if (/consulting/gi.test(selection)) {
              selection = "상담부터"; // 상담이 먼저 필요한 경우
              receive = "추천서 받기 전"; // 추천서를 받기 전 상태
              if (thisAnalytics.filter((o) => { return o.page === "designerProposal" }).length > 0) {
                receive = "자동 추천 받음"; // 자동으로 추천을 받은 경우
              }
            } else {
              selection = "추천부터"; // 추천이 먼저 필요한 경우
              receive = "추천서 진입"; // 추천서에 진입한 상태
              if (thisAnalytics.filter((o) => { return o.page === "designerProposal" }).length === 0) {
                selection = "상담부터"; // 상담이 먼저 필요한 상태로 변경
                receive = "자동 추천 받음"; // 자동으로 추천을 받은 경우
              } else {
                target = "자동 응대중"; // 자동 응대 중인 상태로 설정
              }
            }
          }

          // 결과 데이터를 저장할 JSON 객체 생성
          resultJson = { cliid: thisCliid, selection, receive };

          // 큐레이션 이미지 선택 여부에 따른 설정
          if (curation.length === 0) {
            resultJson.image = "이미지 선택 거부"; // 이미지 선택을 거부한 경우
          } else {
            if (thisAnalytics.filter((o) => { return o.page === "styleCuration" }).length === 0) {
              resultJson.image = "이미지 선택 거부"; // 스타일 큐레이션을 거부한 경우
            } else {
              resultJson.image = "이미지 선택 진행"; // 스타일 큐레이션이 진행된 경우
            }
          }

          // 서비스 유형 설정
          resultJson.service = totalMenu[0].values[Number(check.serid.split("_")[1].replace(/[^0-9]/gi, '')) - 1].title;
          resultJson.serid = check.serid;

          // 시공 정보 설정
          if (typeof check.construct.entire === "boolean") {
            resultJson.construct = totalMenu[1].values[check.construct.entire ? 1 : 0].value;
          } else {
            resultJson.construct = totalMenu[1].values[0].value;
          }

          // 시공 항목 정보 설정
          resultJson.constructItems = totalMenu[2].values.filter((o, index) => { return check.construct.items.includes(index) }).map((o) => { return o.title }).join(", ").trim();
          if (resultJson.constructItems === "") {
            resultJson.constructItems = unknown;
          }

          // 시공 환경 설정
          if (typeof check.construct.environment === "number") {
            resultJson.constructEnvironment = totalMenu[3].values[check.construct.environment].value;
          } else {
            resultJson.constructEnvironment = unknown;
          }

          // 예산 정보 설정
          if (typeof check.budget === "number") {
            resultJson.budget = totalMenu[4].values[check.budget].value;
          } else {
            resultJson.budget = unknown;
          }

          // 가구, 패브릭 정보 설정
          resultJson.furniture = totalMenu[5].values.filter((o, index) => { return check.furniture.includes(index) }).map((o) => { return o.title }).join(", ").trim();
          if (resultJson.furniture === "") {
            resultJson.furniture = unknown;
          }

          resultJson.fabric = totalMenu[6].values.filter((o, index) => { return check.fabric.includes(index) }).map((o) => { return o.title }).join(", ").trim();
          if (resultJson.fabric === "") {
            resultJson.fabric = unknown;
          }

          // 기대 사항 설정
          if (typeof check.expect === "number") {
            resultJson.expect = totalMenu[7].values[check.expect].value;
          } else {
            resultJson.expect = unknown;
          }

          // 구매, 가족 구성, 나이, 시간 정보 설정
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

          // 결과 데이터를 tong 배열에 추가
          tong.push(objectDeepCopy(resultJson));
        }

        // 최종 결과를 클라이언트에게 응답
        res.send(JSON.stringify({ data: tong, dummy: dummyData }));
      }
    
      } catch (e) {
        // 에러 발생 시 에러를 로깅하고 에러 메시지를 JSON 형식으로 응답
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json"); // 응답의 Content-Type을 JSON으로 설정
        res.send(JSON.stringify({ error: e.message })); // 에러 메시지를 JSON 형식으로 반환
      }
    });

    return router;
  }

  /**
   * 결제 프로젝트 동기화 함수
   * @async
   * @function sync_paymentProject
   * @param {string} bilid - 청구서 ID
   * @param {string} requestNumber - 요청 번호
   * @param {Object} data - 결제 관련 데이터
   * @param {number} amount - 결제 금액
   * @param {Object} proofs - 결제 증빙 정보
   * @param {Object} inisis - 이니시스 결제 정보
   * @param {Object} needs - 추가로 필요한 데이터 (청구서, 클라이언트, 디자이너, 프로젝트, 제안서 등)
   */
  async sync_paymentProject (bilid, requestNumber, data, amount, proofs, inisis, needs) {
    // 인스턴스 참조를 위해 this를 instance에 할당
    const instance = this;
    try {
        // 필요한 데이터들 (청구서, 클라이언트, 디자이너, 프로젝트, 제안서) 추출
        const { thisBill, client, designer, project, proposal } = needs;
        // 클라이언트 ID, 디자이너 ID, 프로젝트 ID 추출
        const { cliid } = client;
        const { desid } = designer;
        const { proid } = project;
        let projectQuery; // 프로젝트 쿼리를 저장할 변수
        let pureDesignFee; // 순수 디자인 비용
        let vat, consumer; // 부가세 및 소비자 총액
        let classification, percentage; // 사업자 분류 및 퍼센트 정보
        let businessMethod; // 사업자 유형 (프리랜서, 일반, 간이)
        let bankName, bankTo; // 은행 정보
        let calculate; // 계산된 금액
        let discount; // 할인 금액
        let thisProposal; // 현재 제안서
        let thisMethod; // 현재 사용된 결제 방식
        let thisFeeObject; // 결제 정보 객체
        let billsDuplication; // 중복된 청구서 정보
        
        // '홈리에종 계약금' 또는 '홈리에종 잔금'이 포함된 경우
        if (/홈리에종 계약금/gi.test(data.goodName.trim()) || /홈리에종 잔금/gi.test(data.goodName.trim())) {
            projectQuery = {};
            // 제안서가 정의되어 있을 경우
            if (proposal !== undefined && proposal !== null) {
                if (proposal.fee.length === 1) {
                    pureDesignFee = Math.round(proposal.fee[0].amount); // 첫 번째 비용을 순수 디자인 비용으로 설정
                    discount = proposal.fee[0].discount; // 첫 번째 할인 정보를 설정
                } else {
                    // 여러 제안서가 있을 경우, 선택된 결제 방식과 일치하는 제안서를 찾음
                    for (let obj of proposal.fee) {
                        if (obj.method === thisBill.links.method) {
                            pureDesignFee = Math.round(obj.amount); // 순수 디자인 비용 설정
                            discount = obj.discount; // 해당 결제 방식의 할인 정보 설정
                        }
                    }
                }
            } else {
                pureDesignFee = 0; // 제안서가 없을 경우 비용 0으로 설정
                discount = 0; // 할인도 없음
            }

            // '계약금'이 포함된 경우
            if (/계약금/gi.test(data.goodName.trim())) {
                // 청구서 찾기
                billsDuplication = await bill.getBillsByQuery({ "links.proid": proid, "links.desid": desid, "links.method": thisBill.links.method }, { selfMongo: instance.mongolocal });
                
                // 청구서가 있을 경우
                if (billsDuplication.length > 1) {
                    for (let b of billsDuplication) {
                        if (b.bilid !== thisBill.bilid) {
                            if (typeof b.bilid === "string") {
                                // 중복된 청구서를 삭제
                                await bill.deleteBill(b.bilid, { selfMongo: instance.mongolocal });
                            }
                        }
                    }
                }

                // 계약 정보 갱신
                projectQuery["process.contract.first.date"] = new Date(); // 계약 날짜
                projectQuery["process.contract.first.calculation.amount"] = amount; // 계약 금액
                projectQuery["process.contract.first.calculation.info.method"] = proofs.method; // 결제 방식
                projectQuery["process.contract.first.calculation.info.proof"] = inisis; // 이니시스 정보
                projectQuery["process.contract.first.calculation.info.to"] = proofs.to; // 받는 사람 정보
                
                // 디자이너 및 서비스 관련 정보 업데이트
                projectQuery["desid"] = desid; // 디자이너 ID
                projectQuery["service.online"] = !/off/gi.test(thisBill.links.method); // 온라인 서비스 여부
                projectQuery["process.status"] = "대기"; // 계약 상태
                projectQuery["proposal.status"] = "고객 선택"; // 제안 상태
                
                // 부가세 및 소비자 총액 계산
                vat = Math.round(pureDesignFee * 0.1);
                consumer = Math.round(pureDesignFee * 1.1);
                
                // 남은 계약 금액 정보
                projectQuery["process.contract.remain.calculation.amount.supply"] = Number(pureDesignFee); // 순수 공급액
                projectQuery["process.contract.remain.calculation.amount.vat"] = Number(vat); // 부가세
                projectQuery["process.contract.remain.calculation.amount.consumer"] = Number(consumer); // 총액
                projectQuery["process.contract.remain.calculation.discount"] = Number(discount); // 할인액
                
                // 디자이너 사업자 분류 및 퍼센트 정보 설정
                classification = designer.information.business.businessInfo.classification;
                percentage = Number(designer.information.business.service.cost.percentage);
                businessMethod = "사업자(일반)";
                if (/사업자/g.test(classification)) {
                    if (/일반/g.test(classification)) {
                        businessMethod = "사업자(일반)";
                    } else {
                        businessMethod = "사업자(간이)";
                    }
                } else {
                    businessMethod = "프리랜서"; // 프리랜서인 경우
                }
                projectQuery["process.calculation.method"] = businessMethod; // 사업자 유형
                projectQuery["process.calculation.percentage"] = percentage; // 퍼센트 정보

                // 디자이너 은행 계좌 정보가 있을 경우
                if (designer.information.business.account.length > 0) {
                    bankName = designer.information.business.account[0].bankName + " " + String(designer.information.business.account[0].accountNumber); // 은행 이름 및 계좌 번호
                    bankTo = designer.information.business.account[0].to; // 받는 사람 정보
                    projectQuery["process.calculation.info.account"] = bankName; // 은행 정보 저장
                    projectQuery["process.calculation.info.proof"] = bankTo; // 결제 증빙 정보
                    projectQuery["process.calculation.info.to"] = bankTo; // 받는 사람 정보
                }
                
                // 디자이너 계산 정보 갱신
                [ calculate ] = bill.designerCalculation((pureDesignFee / (1 - discount)), businessMethod, percentage, client, { toArray: true });
                projectQuery["process.calculation.payments.totalAmount"] = calculate; // 총 계산 금액
                projectQuery["process.calculation.payments.first.amount"] = Math.round(calculate / 2); // 첫 번째 금액
                projectQuery["process.calculation.payments.remain.amount"] = Math.round(calculate / 2); // 남은 금액

                // 프로젝트 서비스 아이디 처리
                if (Number(project.service.serid.split("_")[1].replace(/[^0-9]/gi, '').replace(/^0/, '')) !== 1) {
                    projectQuery["process.design.construct"] = back.returnProjectDummies("process.design.construct"); // 프로젝트 더미 정보 반환
                }

                // 클라이언트 및 프로젝트 정보 업데이트
                await back.updateClient([ { cliid }, { "requests.0.analytics.response.status": "진행" } ], { selfMongo: instance.mongo });
                await bill.designerSelect(proid, desid, { selfMongo: instance.mongolocal });
                await back.updateProject([ { proid }, projectQuery ], { selfMongo: instance.mongo });
                await bill.amountConverting(thisBill.bilid, { selfMongo: instance.mongolocal });

                // 제안서 세부 정보 갱신
                thisProposal = project.proposal.detail.find((p) => { return p.desid === desid });
                thisMethod = (project.service.online ? "online" : "offline");
                if (thisProposal !== undefined) {
                    thisFeeObject = thisProposal.fee.find((f) => { return f.method === thisMethod });
                    if (thisFeeObject !== undefined) {
                        if (thisFeeObject.distance.amount !== 0) {
                            await bill.travelInjection("request", proid, thisMethod, 1, { selfMongo: instance.mongolocal });
                        }
                    }
                }

                // 프로젝트 이력 갱신
                requestSystem("https://" + instance.address.officeinfo.host + ":3002/getHistoryProperty", { idArr: [ desid ], method: "designer", property: "manager" }, {
                    headers: {
                        "Content-Type": "application/json",
                        "origin": "https://" + instance.address.officeinfo.host,
                    }
                }).then((res) => {
                    const { data } = res;
                    return requestSystem("https://" + instance.address.officeinfo.host + ":3002/updateHistory", {
                        method: "project",
                        id: proid,
                        column: "manager",
                        value: data[desid],
                        email: null
                    }, {
                        headers: {
                            "Content-Type": "application/json",
                            "origin": "https://" + instance.address.officeinfo.host,
                        }
                    });
                }).catch((err) => {
                    logger.error(err).catch((e) => { console.log(e); });
                });

                // 카카오톡 메시지 전송
                instance.kakao.sendTalk("paymentAndChannel", client.name, client.phone, {
                    client: client.name,
                    designer: designer.designer,
                    host: instance.address.frontinfo.host,
                    path: "caution",
                }).catch((err) => {
                    console.log(err);
                });

                // 실시간 디자이너 동기화
                requestSystem("https://" + instance.address.officeinfo.host + ":3002/realtimeDesigner", { mode: "sync", proid }, {
                    headers: {
                        "Content-Type": "application/json",
                        "origin": "https://" + instance.address.officeinfo.host
                    }
                }).then((obj) => {
                    if (obj.status >= 300) {
                        logger.error(obj).catch((e) => { console.log(e); });
                    }
                }).catch((err) => {
                    logger.error(err).catch((e) => { console.log(e); });
                });

            // '잔금'이 포함된 경우
            } else if (/잔금/gi.test(data.goodName.trim())) {
                projectQuery["process.status"] = "진행중"; // 진행 상태
                projectQuery["process.action"] = "시작 대기"; // 액션 상태
                projectQuery["process.contract.remain.date"] = new Date(); // 잔금 날짜
                projectQuery["process.contract.remain.calculation.info.method"] = proofs.method; // 잔금 결제 방식
                projectQuery["process.contract.remain.calculation.info.proof"] = inisis; // 잔금 결제 증빙
                projectQuery["process.contract.remain.calculation.info.to"] = proofs.to; // 잔금 받는 사람 정보
                
                // 프로젝트 정보 업데이트
                await back.updateProject([ { proid }, projectQuery ], { selfMongo: instance.mongo });

                // 카카오톡 메시지 전송 (잔금)
                instance.kakao.sendTalk("remainPaymentAndChannel", client.name, client.phone, {
                    client: client.name,
                    designer: designer.designer,
                    emoji: "(방긋)",
                }).catch((err) => {
                    console.log(err);
                });
            }

        // '시공' 관련 결제 처리
        } else if (/시공 계약금/gi.test(data.goodName.trim()) || /시공 착수금/gi.test(data.goodName.trim()) || /시공 중도금/gi.test(data.goodName.trim()) || /시공 잔금/gi.test(data.goodName.trim())) {
            projectQuery = {};

            // '시공 계약금'이 포함된 경우
            if (/계약금/gi.test(data.goodName.trim())) {
                projectQuery["process.design.construct.status"] = "계약금 입금"; // 계약금 입금 상태
                projectQuery["process.design.construct.contract.payments.first.date"] = new Date(); // 계약금 입금 날짜
                projectQuery["process.design.construct.contract.payments.first.calculation.info.method"] = proofs.method; // 결제 방식
                projectQuery["process.design.construct.contract.payments.first.calculation.info.proof"] = inisis; // 결제 증빙
                projectQuery["process.design.construct.contract.payments.first.calculation.info.to"] = proofs.to; // 받는 사람 정보
                await back.updateProject([ { proid }, projectQuery ], { selfMongo: instance.mongo }); // 프로젝트 정보 업데이트

            // '착수금'이 포함된 경우
            } else if (/착수금/gi.test(data.goodName.trim())) {
                projectQuery["process.design.construct.status"] = "착수금 입금"; // 착수금 입금 상태
                projectQuery["process.design.construct.contract.payments.start.date"] = new Date(); // 착수금 날짜
                projectQuery["process.design.construct.contract.payments.start.calculation.info.method"] = proofs.method; // 착수금 결제 방식
                projectQuery["process.design.construct.contract.payments.start.calculation.info.proof"] = inisis; // 착수금 증빙
                projectQuery["process.design.construct.contract.payments.start.calculation.info.to"] = proofs.to; // 받는 사람 정보
                await back.updateProject([ { proid }, projectQuery ], { selfMongo: instance.mongo }); // 프로젝트 정보 업데이트

            // '중도금'이 포함된 경우
            } else if (/중도금/gi.test(data.goodName.trim())) {
                projectQuery["process.design.construct.status"] = "중도금 입금"; // 중도금 입금 상태
                projectQuery["process.design.construct.contract.payments.middle.date"] = new Date(); // 중도금 날짜
                projectQuery["process.design.construct.contract.payments.middle.calculation.info.method"] = proofs.method; // 중도금 결제 방식
                projectQuery["process.design.construct.contract.payments.middle.calculation.info.proof"] = inisis; // 중도금 증빙
                projectQuery["process.design.construct.contract.payments.middle.calculation.info.to"] = proofs.to; // 받는 사람 정보
                await back.updateProject([ { proid }, projectQuery ], { selfMongo: instance.mongo }); // 프로젝트 정보 업데이트

            // '잔금'이 포함된 경우
            } else if (/잔금/gi.test(data.goodName.trim())) {
                projectQuery["process.design.construct.status"] = "잔금 입금"; // 잔금 입금 상태
                projectQuery["process.design.construct.contract.payments.remain.date"] = new Date(); // 잔금 날짜
                projectQuery["process.design.construct.contract.payments.remain.calculation.info.method"] = proofs.method; // 잔금 결제 방식
                projectQuery["process.design.construct.contract.payments.remain.calculation.info.proof"] = inisis; // 잔금 증빙
                projectQuery["process.design.construct.contract.payments.remain.calculation.info.to"] = proofs.to; // 받는 사람 정보
                await back.updateProject([ { proid }, projectQuery ], { selfMongo: instance.mongo }); // 프로젝트 정보 업데이트
            }

            // 결제 관련 카카오톡 메시지 전송
            instance.kakao.sendTalk("generalPayments", client.name, client.phone, {
                client: client.name,
                goods: data.goodName.trim(),
            }).catch((err) => {
                logger.error(err).catch((e) => { console.log(e); });
            });
        }

    } catch (e) {
        // 에러 발생 시 에러 로그 기록
        logger.error(e).catch((e) => { console.log(e); });
    }
  }

  /**
   * @function setMembers
   * @description 회사의 직원 정보를 데이터베이스에서 가져와 members 객체에 저장합니다.
   * 이 함수는 MongoDB를 이용하여 직원 데이터를 가져오며, 가져온 데이터를 객체로 변환합니다.
   * @returns {Promise<void>} - 비동기 작업을 처리하며 반환값이 없습니다.
   */
  async setMembers() {
    // 인스턴스의 this를 instance라는 변수에 할당 (this는 DataRouter 클래스의 인스턴스를 참조)
    const instance = this;
    
    // BackMaker 객체를 this.back에서 가져와 back 변수에 저장
    const back = this.back;
    
    try {
      // back 객체의 setMemberObj 메서드를 호출하여 회사 직원 정보를 가져옴
      // getMode: true로 설정하여 데이터베이스로부터 데이터를 가져오는 모드로 설정
      // selfMongo는 MongoDB 커넥션을 전달하여 데이터베이스 작업을 처리할 수 있도록 함
      // 가져온 직원 정보는 인스턴스의 members 객체에 저장
      instance.members = await back.setMemberObj({ getMode: true, selfMongo: instance.mongo });
      
    } catch (e) {
      // 예외가 발생했을 경우 에러 내용을 콘솔에 출력
      console.log(e);
    }
  }

}

module.exports = DataRouter;


