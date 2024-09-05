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
const { errorLog, alertLog, cronLog, aliveLog, emergencyAlarm, expressLog, mysqlQuery, leafParsing, processSystem, linkToString, ghostFileUpload, jsonToString, tempReplaceImage } = mother;
const { diskReading, aliveMongo, equalJson, dateToString, serviceParsing, stringToDate, requestSystem, db, fileSystem, shellExec, shellLink, messageLog, zeroAddition, objectDeepCopy, messageSend, shell, homeliaisonAnalytics, sleep, stringToLink, autoHypenPhone, autoComma, mongo, mongoconsoleinfo, cryptoString, decryptoHash, ipParsing, uniqueValue, setQueue, binaryRequest, generalFileUpload } = mother;
const { consoleQ, copyToClipboard, http2InNode, orderSystem, stringToJson, chromeOpen, curlRequest, ajaxJson, getDateMatrix, promiseTimeout, headRequest, treeParsing, appleScript, copyJson, pythonExecute, ipCheck, pureServer, s3FileDelete, sendMessage, hexaJson, promiseTogether, localUnique, sha256Hmac, variableArray, designerCareer, mediaQuery, getHoliday, capitalizeString } = mother;

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
    
    router.post([ "/getClientReport" ], async function (req, res) {
      try {
        const back = instance.back;
        const address = instance.address;
        const port = 3000;
        const getDateMatrix = async (length = 6) => {
          const tripleMatrixByDate = (length = 6) => {
            const matrixCalendar = (year, month) => {
              let matrix, weekArr;
              let leftDates;
              let weeks;
              let weekLeft;
              let first, last;
              let firstDate, lastDate;
              let firstDay;
              let weekLength;
              let firstWeekLength, middleWeekLength, fianlWeekLength;
        
              first = new Date(year, month - 1, 0);
              last = new Date(year, month, 0);
        
              firstDate = first.getDate();
              firstDay = first.getDay();
              lastDate = last.getDate();
        
              leftDates = lastDate - (7 - firstDay)
              weeks = Math.floor(leftDates / 7)
              weekLeft = leftDates % 7
        
              firstWeekLength = lastDate - weekLeft - (weeks * 7)
              middleWeekLength = weeks;
              fianlWeekLength = weekLeft;
        
              matrix = [];
              weekArr = [];
              for (let i = 0; i < firstWeekLength; i++) {
                weekArr.push(i + 1)
              }
              matrix.push(objectDeepCopy(weekArr));
              
              for (let i = 0; i < middleWeekLength; i++) {
                weekArr = [];
                for (let j = 0; j < 7; j++) {
                  weekArr.push(matrix[0][matrix[0].length - 1] + 1 + j + (i * 7));
                }
                matrix.push(objectDeepCopy(weekArr));
              }
        
              weekArr = [];
              for (let i = 0; i < fianlWeekLength; i++) {
                weekArr.unshift(lastDate - i);
              }
              if (weekArr.length !== 0) {
                matrix.push(objectDeepCopy(weekArr));
              }
              return matrix;
            }
        
            const today = new Date();
            let copiedDate;
            let year, month;
            let motherMatrix;
            
            motherMatrix = [];
            for (let i = 0; i < length; i++) {
              copiedDate = new Date(JSON.stringify(today).slice(1, -1));
              copiedDate.setMonth(copiedDate.getMonth() - i);
              year = copiedDate.getFullYear();
              month = copiedDate.getMonth() + 1;
              motherMatrix.push(objectDeepCopy(matrixCalendar(year, month)));
            }
        
            return motherMatrix;
          }
          try {
            const today = new Date();
            const dateMatrix = tripleMatrixByDate(length);
              
            let year, month;
            let day0, day1, day2;
            let dateString0, dateString1;
            let resultArr, middleResultArr, resultFactorArr;
        
            resultArr = [];
            for (let j = 0; j < dateMatrix.length; j++) {
        
              year = today.getFullYear();
              month = today.getMonth() + 1 - j;
        
              year = today.getFullYear() + Math.floor(month / 12) + ((month % 12) === 0 ? -1 : 0);
              month = (month % 12) > 0 ? (month % 12) : 12 + (month % 12);
        
              middleResultArr = [];
              for (let i = 0; i < dateMatrix[j].length; i++) {
                resultFactorArr = [];
        
                day0 = dateMatrix[j][i][0];
                resultFactorArr.push(new Date(year, month - 1, day0));
        
                day1 = dateMatrix[j][i][dateMatrix[j][i].length - 1];
                resultFactorArr.push(new Date(year, month - 1, day1));
        
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
        }
        const today = new Date();
        const proposalStandardDate = new Date(2021, 8, 1);
        const proposalStandardDateValue = proposalStandardDate.valueOf();
        let dateMatrix;
        let searchQuery, clients, proposals, contracts, process;
        let processTong;
        let cliidArr, cliidArr_raw;
        let resultArr;
        let obj;
        let searchBoo;
        let processTong_refined, processTong_past, processTong_double;
        let doubleObject;
        let doubleClient;
        let finalLength;
        let processNumber;
        let pastTong;
        let proposalsTong;
        let cliidTempArr, proidTempArr;
        let motherClients, motherProjects, motherProjects_raw;
        let motherClientHistories;
        let histories;
        let copiedMatrix;
        let monthObject;
        let copiedCopiedMatrix;
        let yearMonthArr;
        let logRes;
        let logFound;
        let contractsPure, contractsAmount, contractsPureAmount;
        let calculationPureAmount;
    
        if (req.body.month === undefined) {
          if (req.body.startYear === undefined) {
            req.body.month = 8;
            searchBoo = false;
          } else {
            let { startYear, startMonth, endYear, endMonth } = req.body;
            startYear = Number(startYear);
            startMonth = Number(startMonth.replace(/^0/, ''));
            endYear = Number(endYear);
            endMonth = Number(endMonth.replace(/^0/, ''));
            req.body.month = ((today.getFullYear() * 12) + today.getMonth() + 1) - ((startYear * 12) + startMonth) + 1;
            req.body.endMonth = ((today.getFullYear() * 12) + today.getMonth() + 1) - ((endYear * 12) + endMonth);
            searchBoo = true;
          }
        } else {
          searchBoo = false;
        }
    
        if (!searchBoo) {
          dateMatrix = await getDateMatrix(Number(req.body.month));
        } else {
          dateMatrix = await getDateMatrix(Number(req.body.month));
          for (let i = 0; i < req.body.endMonth; i++) {
            dateMatrix.shift();
          }
        }
    
        copiedMatrix = equalJson(JSON.stringify(dateMatrix));
        copiedMatrix = copiedMatrix.flat().flat();
        copiedMatrix.sort((a, b) => {
          return a.valueOf() - b.valueOf();
        });
    
        motherClients = (await back.getClientsByQuery({
          $and: [
            {
              requests: {
                $elemMatch: {
                  "request.timeline": { $gte: copiedMatrix[0] }
                }
              }
            },
            {
              requests: {
                $elemMatch: {
                  "request.timeline": { $lte: copiedMatrix[copiedMatrix.length - 1] }
                }
              }
            }
          ]
        }, { selfMongo: instance.mongo, withTools: true })).getRequestsTong().map((arr) => { let o = arr[0].toNormal(); o.cliid = arr.cliid; o.analytics = arr[1].toNormal(); return o; });
        motherClientHistories = await back.mongoPick("clientHistory", [ {
          $or: motherClients.map((o) => { return { cliid: o.cliid } }),
        }, { cliid: 1, manager: 1, curation: 1 } ], { selfMongo: instance.mongolocal });
        motherProjects_raw = (await back.getProjectsByQuery({
          $or: motherClients.map((o) => { return { cliid: o.cliid } }).concat([
            {
              "process.contract.first.date": {
                $gte: copiedMatrix[0]
              }
            }
          ]),
        }, { selfMongo: instance.mongo })).toNormal();
        motherProjects = motherProjects_raw.filter((obj) => {  return obj.process.contract.first.date.valueOf() >= (new Date(2000, 0, 1)).valueOf() });
    
        yearMonthArr = [];
        resultArr = [];
        for (let matrix of dateMatrix) {
    
          copiedCopiedMatrix = equalJson(JSON.stringify(matrix));
          copiedCopiedMatrix = copiedCopiedMatrix.flat();
          copiedCopiedMatrix.sort((a, b) => {
            return b.valueOf() - a.valueOf();
          });
    
          monthObject = {
            year: copiedCopiedMatrix[Math.round(copiedCopiedMatrix.length / 2)].getFullYear(),
            month: copiedCopiedMatrix[Math.round(copiedCopiedMatrix.length / 2)].getMonth() + 1,
          };
          yearMonthArr.push((monthObject.year * 100) + monthObject.month);
    
          monthArr = [];
          for (let arr of matrix) {
    
            obj = {};
    
            obj.cliid = {};
            obj.proid = {};
    
            obj.startDay = `${zeroAddition(arr[0].getFullYear())}-${zeroAddition(arr[0].getMonth() + 1)}-${zeroAddition(arr[0].getDate())}`;
            obj.endDay = `${zeroAddition(arr[1].getFullYear())}-${zeroAddition(arr[1].getMonth() + 1)}-${zeroAddition(arr[1].getDate())}`;
    
            //client
            clients = motherClients.filter((obj) => { return obj.timeline.valueOf() >= arr[0].valueOf() && obj.timeline.valueOf() < arr[2].valueOf() });
            obj.client = clients.length;
            obj.cliid.client = clients.map((obj) => { return obj.cliid; });
            obj.proid.client = [];
    
            //proposal
            if (arr[0].valueOf() > proposalStandardDateValue) {
              cliidArr_raw = clients.map((obj) => { return obj.cliid; });
              cliidArr_raw = Array.from(new Set(cliidArr_raw));
              process = motherProjects_raw.filter((obj) => { return cliidArr_raw.includes(obj.cliid) });
              histories = process
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
    
            //recommend
            if (arr[0].valueOf() > proposalStandardDateValue) {
              obj.recommend = 0;
              obj.cliid.recommend = [];
              obj.proid.recommend = [];
            } else {
              obj.recommend = 0;
              obj.cliid.recommend = [];
              obj.proid.recommend = [];
            }
    
            //contract
            contracts = motherProjects.filter((obj) => { return obj.process.contract.first.date.valueOf() >= arr[0].valueOf() && obj.process.contract.first.date.valueOf() < arr[2].valueOf() });
            obj.contract = contracts.length;
            obj.cliid.contract = [ ...new Set(contracts.map((obj) => { return obj.cliid; })) ];
            obj.proid.contract = contracts.map((obj) => { return obj.proid });
    
            //contract pure
            contractsPure = contracts.filter((c) => { return !/드[랍롭]/gi.test(c.process.status) });
            obj.contractsPure = contractsPure.length;
            obj.cliid.contractsPure = [ ...new Set(contractsPure.map((obj) => { return obj.cliid; })) ];
            obj.proid.contractsPure = contractsPure.map((obj) => { return obj.proid });
    
            //contract amount
            contractsAmount = contractsPure.map((c) => { return c.process.contract.remain.calculation.amount.consumer });
            obj.contractsAmount = contractsAmount.reduce((acc, curr) => { return acc + curr }, 0);
    
            //contract amount pure
            contractsPureAmount = contractsPure.map((c) => { return c.process.contract.remain.calculation.amount.supply });
            obj.contractsPureAmount = contractsPureAmount.reduce((acc, curr) => { return acc + curr }, 0);
    
            //calculation subtract
            calculationPureAmount = contractsPure.map((c) => { return c.process.calculation.payments.totalAmount });
            obj.contractAmountSubtract = obj.contractsPureAmount - calculationPureAmount.reduce((acc, curr) => { return acc + curr }, 0);
    
            //process start
            cliidArr_raw = clients.filter((obj) => { return !/드[롭랍]/gi.test(obj.analytics.response.status) }).map((obj) => { return obj.cliid; });
            cliidArr_raw = Array.from(new Set(cliidArr_raw));
            process = motherProjects_raw.filter((obj) => { return cliidArr_raw.includes(obj.cliid) }).filter((obj) => {
              return obj.desid.trim() !== '';
            });
            obj.process = process.length;
            obj.cliid.process = [ ...new Set(process.map((obj) => { return obj.cliid })) ];
            obj.proid.process = [ ...new Set(process.map((obj) => { return obj.proid })) ];
    
            monthArr.push(obj);
          }
          monthObject.data = equalJson(JSON.stringify(monthArr));
    
          monthObject.contractsPure = monthObject.data.reduce((acc, curr) => { return acc + curr.contractsPure }, 0);
          monthObject.contractsAmount = monthObject.data.reduce((acc, curr) => { return acc + curr.contractsAmount }, 0);
          monthObject.contractsPureAmount = monthObject.data.reduce((acc, curr) => { return acc + curr.contractsPureAmount }, 0);
          monthObject.contractAmountSubtract = monthObject.data.reduce((acc, curr) => { return acc + curr.contractAmountSubtract }, 0);
    
          resultArr.push(monthObject);
        }
    
        yearMonthArr.sort();
    
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
    
        for (let obj of resultArr) {
          logFound = logRes.data.find((obj2) => {
            return obj2.year === obj.year && obj2.month === obj.month
          });
          if (logFound === undefined) {
            obj.mau = 0;
            obj.adClients = 0;
            obj.charge = 0;
          } else {
            obj.mau = logFound.mau
            obj.adClients = logFound.adClients
            obj.charge = logFound.charge
          }
        }
    
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify(resultArr));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
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
        const selfMongo = instance.mongo;
        const selfLocalMongo = instance.mongolocal;
        const { mode } = equalJson(req.body);
        let collection;
        let fromDate, toDate;
        let whereQuery;
        let rows;
        let motherClients;
        let clients;
        let cliidArr_raw;
        let process;
        let histories;
        let motherClientHistories;
        let motherProjects_raw;
        let motherProjects;
        let obj;
        let contracts;
        let matrix;
        let fromDateCopied;
        let tomorrow;
    
        if (mode === "basic") {
    
          if (req.body.fromDate === undefined || req.body.toDate === undefined) {
            throw new Error("invalid post 2");
          }
    
          ({ fromDate, toDate } = equalJson(req.body));
    
          fromDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate(), 0, 0, 0);
          fromDateCopied = new Date(JSON.stringify(fromDate).slice(1, -1));
          toDate = new Date(toDate.getFullYear(), toDate.getMonth(), toDate.getDate(), 0, 0, 0);
          toDate.setDate(toDate.getDate() + 1);
    
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
          }, { selfMongo, withTools: true })).getRequestsTong().map((arr) => { let o = arr[0].toNormal(); o.cliid = arr.cliid; o.analytics = arr[1].toNormal(); return o; });
          motherClientHistories = await back.mongoPick("clientHistory", [ {
            $or: motherClients.map((o) => { return { cliid: o.cliid } }),
          }, { cliid: 1, manager: 1, curation: 1 } ], { selfMongo: selfLocalMongo });
          motherProjects_raw = (await back.getProjectsByQuery({
            $or: motherClients.map((o) => { return { cliid: o.cliid } }).concat([
              {
                "process.contract.first.date": {
                  $gte: fromDate
                }
              }
            ]),
          }, { selfMongo })).toNormal();
          motherProjects = motherProjects_raw.filter((obj) => {  return obj.process.contract.first.date.valueOf() >= (new Date(2000, 0, 1)).valueOf() });
    
          matrix = [];
          while (fromDateCopied.valueOf() < toDate.valueOf()) {
            tomorrow = new Date(JSON.stringify(fromDateCopied).slice(1, -1));
            tomorrow.setDate(tomorrow.getDate() + 1);
            matrix.push([
              new Date(JSON.stringify(fromDateCopied).slice(1, -1)),
              tomorrow,
            ]);
            fromDateCopied.setDate(fromDateCopied.getDate() + 1);
          }
    
          rows = [];
    
          for (let [ fromDate, toDate ] of matrix) {
    
            obj = { fromDate, toDate };
    
            //client
            clients = motherClients.filter((obj) => { return obj.timeline.valueOf() >= fromDate && obj.timeline.valueOf() < toDate });
            obj.client = clients.length;
    
            //recommend
            histories = motherClientHistories.map((obj) => { return obj.curation.analytics.send.filter((o) => { return /designerProposal/gi.test(o.page) && (o.date.valueOf() >= fromDate && o.date.valueOf() < toDate) }) }).flat();
            obj.recommend = histories.length;
    
            //contract
            contracts = motherProjects.filter((obj) => { return obj.process.contract.first.date.valueOf() >= fromDate && obj.process.contract.first.date.valueOf() < toDate });
            obj.contract = contracts.length;
    
            rows.push(obj);
          }
    
          //end
          res.send(JSON.stringify(rows));
    
        } else {
          throw new Error("invalid mode");
        }
    
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/getProjectReport" ], async function (req, res) {
      res.set("Content-Type", "application/json");
      try {
        const { mode, start, end } = equalJson(req.body);
        let clients, clients2;
        let projects, projects2;
        let serviceArr;
        let designers;
        let designerArr;
        let tempClient;
        let requestNumber;
    
        if (mode === "service") {
    
          serviceArr = new Array(4);
    
          projects = await back.getProjectsByQuery({
            $and: [
              {
                "process.contract.first.date": { $gte: start }
              },
              {
                "process.contract.first.date": { $lt: end }
              },
              {
                "desid": { $regex: "^d" }
              }
            ]
          }, { selfMongo: instance.mongo });
    
          clients = await back.getClientsByQuery({
            $or: [
              ...projects.toNormal().map((obj) => { return { cliid: obj.cliid } }),
            ]
          }, { selfMongo: instance.mongo });
    
          serviceArr[0] = projects.filter((obj) => { return /1/gi.test(obj.service.serid.split('_')[1]) }).map((obj) => { return { proid: obj.proid, cliid: obj.cliid } });
          serviceArr[1] = projects.filter((obj) => { return /2/gi.test(obj.service.serid.split('_')[1]) }).map((obj) => { return { proid: obj.proid, cliid: obj.cliid } });
          serviceArr[2] = projects.filter((obj) => { return /3/gi.test(obj.service.serid.split('_')[1]) }).map((obj) => { return { proid: obj.proid, cliid: obj.cliid } });
          serviceArr[3] = projects.filter((obj) => { return /4/gi.test(obj.service.serid.split('_')[1]) }).map((obj) => { return { proid: obj.proid, cliid: obj.cliid } });
    
          for (let arr of serviceArr) {
            for (let obj of arr) {
              obj.name = clients.toNormal().find((c) => { return c.cliid === obj.cliid }).name;
            }
          }
    
          res.send(JSON.stringify({ start, end, numbers: { client: clients.length, project: projects.length }, serviceArr }));
    
        } else if (mode === "designer") {
    
          designers = await back.getDesignersByQuery({}, { selfMongo: instance.mongo });
          projects = await back.getProjectsByQuery({}, { selfMongo: instance.mongo });
          if (projects.length === 0) {
            clients = [];
          } else {
            clients = (await back.getClientsByQuery({
              $or: projects.toNormal().map((p) => { return { cliid: p.cliid } })
            })).toNormal();
          }
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
    
          designerArr = designers.toNormal().map((obj) => { return { desid: obj.desid, designer: obj.designer } });
          for (let obj of designerArr) {
    
            // proposal
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
    
            // process
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
    
            // calculation first
            obj.first = projects.filter((p) => {
              return (p.desid === obj.desid && p.process.calculation.payments.first.date.valueOf() >= start.valueOf() && p.process.calculation.payments.first.date.valueOf() < end.valueOf());
            }).map((p) => {
              return { proid: p.proid, service: serviceParsing(p.service.toNormal()), date: p.process.calculation.payments.first.date, name: p.name, pyeong: p.pyeong, amount: p.process.calculation.payments.first.amount - p.process.calculation.payments.first.refund };
            });
    
            // calculation remain
            obj.remain = projects.filter((p) => {
              return (p.desid === obj.desid && p.process.calculation.payments.remain.date.valueOf() >= start.valueOf() && p.process.calculation.payments.remain.date.valueOf() < end.valueOf());
            }).map((p) => {
              return { proid: p.proid, service: serviceParsing(p.service.toNormal()), date: p.process.calculation.payments.remain.date, name: p.name, pyeong: p.pyeong, amount: p.process.calculation.payments.remain.amount - p.process.calculation.payments.remain.refund };
            });
    
          }
    
          res.send(JSON.stringify({ start, end, designers: designerArr }));
    
        } else {
          throw new Error("invaild mode");
        }
    
      } catch (e) {
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
    
    router.post([ "/getDesignerReport" ], async function (req, res) {
      try {
        if (req.body.desid === undefined) {
          throw new Error("must be desid");
        }
        const { desid } = req.body;
        const selfMongo = instance.mongo;
        let projects;
        let whereQuery;
        let cliidArr_raw, cliidArr;
        let clients;
        let requests, boo;
        let contentsArr;
        let price;
    
        res.set("Content-Type", "application/json");
    
        whereQuery = {
          $or: [
            { desid },
            { "proposal.detail": { $elemMatch: { desid } } }
          ]
        };
    
        projects = await back.getProjectsByQuery(whereQuery, { selfMongo });
        if (projects.length > 0) {
    
          cliidArr_raw = [];
          for (let p of projects) {
            cliidArr_raw.push(p.cliid);
          }
          cliidArr_raw = Array.from(new Set(cliidArr_raw));
          cliidArr = cliidArr_raw.map((c) => { return { cliid: c }; });
          whereQuery = { $or: [] };
          for (let obj of cliidArr) {
            whereQuery["$or"].push(obj);
          }
          clients = (await back.getClientsByQuery(whereQuery, { selfMongo })).toNormal();
    
          for (let project of projects) {
            for (let client of clients) {
              if (project.cliid === client.cliid) {
                project.name = client.name;
                requests = client.requests;
                boo = false;
                for (let { request } of requests) {
                  if (request.timeline.valueOf() <= project.proposal.date.valueOf()) {
                    boo = true;
                    project.pyeong = request.space.pyeong;
                  }
                }
                if (!boo) {
                  project.pyeong = requests[0].request.space.pyeong;
                }
              }
            }
          }
    
        } else {
          clients = [];
        }
    
        contentsArr = await back.getContentsArrByQuery({ desid }, { selfMongo });
        for (let c of contentsArr) {
          for (let client of clients) {
            if (c.cliid === client.cliid) {
              c.name = client.name;
            }
          }
        }
    
        price = await back.mongoRead("designerPrice", {}, { selfMongo: instance.mongolocal });
    
        res.send(JSON.stringify({ projects, clients, contentsArr, price }));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/getClientHistory", "/getProjectHistory", "/getHistoryProperty", "/getHistoryTotal", "/getClientsImportant", "/getProjectsImportant", "/getClientsManager", "/getProjectsManager", "/getClientsIssue", "/getProjectsIssue" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        let historyObj, responseArr;
        let resultObj;
        let method;
        let temp, tempArr;
    
        responseArr = [];
    
        if (req.url === "/getClientHistory") {
    
          historyObj = await back.getHistoryById("client", req.body.id, { selfMongo: instance.mongolocal });
          if (historyObj === null) {
            await back.createHistory("client", { cliid: req.body.id }, { selfMongo: instance.mongolocal, secondMongo: instance.mongo });
            historyObj = await back.getHistoryById("client", req.body.id, { selfMongo: instance.mongolocal });
          }
    
          responseArr.push((historyObj.history === undefined ? '' : historyObj.history.replace(/\=/g, '').replace(/\&/g, ",")));
          responseArr.push((historyObj.space === undefined ? '' : historyObj.space.replace(/\=/g, '').replace(/\&/g, ",")));
          responseArr.push((historyObj.styling === undefined ? '' : historyObj.styling.replace(/\=/g, '').replace(/\&/g, ",")));
          responseArr.push((historyObj.construct === undefined ? '' : historyObj.construct.replace(/\=/g, '').replace(/\&/g, ",")));
          responseArr.push((historyObj.budget === undefined ? '' : historyObj.budget.replace(/\=/g, '').replace(/\&/g, ",")));
          responseArr.push((historyObj.progress === undefined ? '' : historyObj.progress.replace(/\=/g, '').replace(/\&/g, ",")));
    
          if (req.body.rawMode !== undefined) {
            responseArr = historyObj;
          }
    
        } else if (req.url === "/getProjectHistory") {
    
          historyObj = await back.getHistoryById("project", req.body.id, { selfMongo: instance.mongolocal });
          if (historyObj === null) {
            await back.createHistory("project", { proid: req.body.id }, { selfMongo: instance.mongolocal, secondMongo: instance.mongo });
            historyObj = await back.getHistoryById("project", req.body.id, { selfMongo: instance.mongolocal });
          }
    
          responseArr.push((historyObj.history === undefined ? '' : historyObj.history.replace(/\=/g, '').replace(/\&/g, ",")));
          responseArr.push((historyObj.designer === undefined ? '' : historyObj.designer.replace(/\=/g, '').replace(/\&/g, ",")));
          responseArr.push((historyObj.client === undefined ? '' : historyObj.client.replace(/\=/g, '').replace(/\&/g, ",")));
          responseArr.push((historyObj.photo === undefined ? '' : historyObj.photo.replace(/\=/g, '').replace(/\&/g, ",")));
    
          if (req.body.rawMode !== undefined) {
            responseArr = historyObj;
          }
    
        } else if (req.url === "/getHistoryProperty") {
          if (equalJson(req.body.idArr).length > 0) {
            const { method, property, idArr } = equalJson(req.body);
            responseArr = await back.getHistoryProperty(method, property, idArr, { selfMongo: instance.mongolocal });
          } else {
            responseArr = [];
          }
        } else if (req.url === "/getHistoryTotal") {
          if (equalJson(req.body.idArr).length > 0) {
            const { method, idArr } = equalJson(req.body);
            responseArr = await back.getHistoryProperty(method, "$all", idArr, { selfMongo: instance.mongolocal });
          } else {
            responseArr = [];
          }
        }
    
        if (responseArr === null) {
          responseArr = [];
        }
        res.send(JSON.stringify(responseArr));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/updateHistory", "/updateClientHistory", "/updateProjectHistory", "/updateDesignerHistory" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      const back = instance.back;
      const members = instance.members;
      try {
        const today = new Date();
        if (req.body.newMode === undefined || req.body.newMode === null || req.body.newMode === 0) {
          const { id, column, value, email } = equalJson(req.body);
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
          let fileTarget;
          let method, standard;
          let managerArr;
          let managerIdArr;
          let managerToObj;
          let managerTargetArr;
          let page, query, dummy, cookies;
    
          thisPerson = null;
          if (email !== null) {
            for (let member of members) {
              if (member.email.includes(email)) {
                thisPerson = member.name;
                break;
              }
            }
          }
    
          whereQuery = {};
          updateQuery = {};
    
          if (/Client/gi.test(req.url)) {
            method = "client";
          } else if (/Project/gi.test(req.url)) {
            method = "project";
          } else if (/Designer/gi.test(req.url)) {
            method = "designer";
          } else if (/Contents/gi.test(req.url)) {
            method = "contents";
          } else {
            if (req.body.method === undefined) {
              throw new Error("invaild method");
            } else {
              method = req.body.method;
            }
          }
    
          if (/client/gi.test(method)) {
            standard = "cliid";
          } else if (/project/gi.test(method)) {
            standard = "proid";
          } else if (/designer/gi.test(method)) {
            standard = "desid";
          } else if (/contents/gi.test(method)) {
            standard = "conid";
          } else {
            throw new Error("invaild method");
          }
    
          historyObj = await back.getHistoryById(method, id, { selfMongo: instance.mongolocal });
          if (historyObj === null) {
            updateQuery = {};
            updateQuery[standard] = id;
            if (column === "important") {
              updateQuery[column] = (Number(value) === 1);
            } else {
              if (column !== null) {
                if (value === "true" || value === "false") {
                  updateQuery[column] = (value === "true");
                } else {
                  updateQuery[column] = value;
                }
              }
            }
            await back.createHistory(method, updateQuery, { selfMongo: instance.mongolocal, secondMongo: instance.mongo });
            historyObj = await back.getHistoryById(method, id, { selfMongo: instance.mongolocal });
          } else {
            whereQuery = {};
            whereQuery[standard] = id;
            updateQuery = {};
            if (column === "important") {
              updateQuery[column] = (Number(value) === 1);
            } else {
              if (column !== null) {
                if (value === "true" || value === "false") {
                  updateQuery[column] = (value === "true");
                } else {
                  updateQuery[column] = value;
                }
              }
            }
    
            if (Object.keys(updateQuery).length > 0) {
              await back.updateHistory(method, [ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });
            }
          }
    
          if (column === "manager") {
            if (managerInteraction[method] !== undefined) {
              managerArr = await back[managerInteraction[method].method](managerInteraction[method].whereQuery, { selfMongo: instance.mongo });
              managerIdArr = [];
              for (let obj of managerArr) {
                managerIdArr.push(obj[managerInteraction[method].toId]);
              }
              if (managerIdArr.length !== 0) {
                managerToObj = await back.getHistoryProperty(managerInteraction[method].to, "manager", managerIdArr, { selfMongo: instance.mongolocal });
                managerTargetArr = [];
                for (let i in managerToObj) {
                  managerTargetArr.push([ i, managerToObj[i] ]);
                }
                managerTargetArr = managerTargetArr.filter((a) => { return a[1] === '' || a[1] === '-' || a[1] === "홀딩"; });
                for (let [ id ] of managerTargetArr) {
                  whereQuery = {};
                  whereQuery[managerInteraction[method].toId] = id;
                  await back.updateHistory(managerInteraction[method].to, [ whereQuery, { manager: value } ], { selfMongo: instance.mongolocal });
                }
              }
            }
          }
    
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
              historyObj.curation.analytics.send = [ dummy ];
            }
            await back.updateHistory("client", [ { cliid: id }, { "curation.analytics.send": historyObj.curation.analytics.send } ], { selfMongo: instance.mongolocal });
          }
    
        } else {
          const { id, updateQuery, coreQuery } = equalJson(req.body);
          let historyObj;
          let method, standard;
          let createQuery;
          let whereQuery;
          let collection;
    
          if (/Client/gi.test(req.url)) {
            method = "client";
          } else if (/Project/gi.test(req.url)) {
            method = "project";
          } else if (/Designer/gi.test(req.url)) {
            method = "designer";
          } else if (/Contents/gi.test(req.url)) {
            method = "contents";
          } else {
            if (req.body.method === undefined) {
              throw new Error("invaild method");
            } else {
              method = req.body.method;
            }
          }
    
          if (/client/gi.test(method)) {
            standard = "cliid";
            collection = "client";
          } else if (/project/gi.test(method)) {
            standard = "proid";
            collection = "project";
          } else if (/designer/gi.test(method)) {
            standard = "desid";
            collection = "designer";
          } else if (/contents/gi.test(method)) {
            standard = "conid";
            collection = "contents";
          } else {
            throw new Error("invaild method");
          }
    
          whereQuery = {};
          whereQuery[standard] = id;
    
          historyObj = await back.getHistoryById(method, id, { selfMongo: instance.mongolocal });
          if (historyObj === null) {
            createQuery = { ...updateQuery };
            createQuery[standard] = id;
            await back.createHistory(method, createQuery, { selfMongo: instance.mongolocal, secondMongo: instance.mongo });
            historyObj = await back.getHistoryById(method, id, { selfMongo: instance.mongolocal });
          } else {
            if (Object.keys(updateQuery).length > 0) {
              await back.updateHistory(method, [ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });
            }
          }
    
          if (typeof coreQuery === "object" && coreQuery !== null) {
            if (Object.keys(coreQuery).length > 0) {
              await back.mongoUpdate(collection, [ whereQuery, coreQuery ], { selfMongo: instance.mongo });
            }
          }
    
        }
        res.send(JSON.stringify({ message: "success" }));
      } catch (e) {
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
    
    router.post([ "/sendSlack" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        if (req.body.message === undefined || req.body.channel === undefined) {
          throw new Error("invalid post");
        }
        const { message, channel } = req.body;
        let text;
        let voiceBoo;
        let ip, rawUserAgent;
    
        ip = String(req.headers["x-forwarded-for"] === undefined ? req.socket.remoteAddress : req.headers["x-forwarded-for"]).trim().replace(/[^0-9\.]/gi, '');
        rawUserAgent = req.useragent;
    
        text = message.replace(/__equal__/g, '=').replace(/__amper__/g, '&').replace(/__query__/g, '?').replace(/__plus__/g, '+');
        if (req.body.voice !== undefined) {
          if (req.body.voice === null) {
            voiceBoo = false;
          } else if (req.body.voice === "false") {
            voiceBoo = false;
          } else if (req.body.voice === false) {
            voiceBoo = false;
          } else {
            voiceBoo = true;
          }
        } else {
          voiceBoo = false;
        }
    
        if (channel === "#error_log") {
          await logger.error(text + "\n\n" + "ip: " + String(ip) + "\n\n" + JSON.stringify(rawUserAgent, null, 2));
        } else {
          await messageSend({ text, channel, voice: voiceBoo, target: (req.body.target !== undefined ? equalJson(req.body).target : null), fairy: false });
        }
    
        res.send(JSON.stringify({ message: "success" }));
    
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/sendSheets" ], async function (req, res) {
      res.set("Content-Type", "application/json");
      const back = instance.back;
      const sheets = instance.sheets;
      const drive = instance.drive;
      const { equalJson, messageSend } = instance.mother;
      const asyncFunc = async (sheetName, parentId, values, tapName) => {
        let sheetsId, result;
        try {
          sheetsId = await sheets.create_newSheets_inPython(sheetName, parentId);
          if (tapName !== undefined) {
            await sheets.update_defaultSheetName_inPython(sheetsId, tapName);
          }
          values = equalJson(values);
          await sheets.update_value_inPython(sheetsId, (tapName !== undefined ? tapName : ''), values, [ 0, 0 ]);
          await sheets.setting_cleanView_inPython(sheetsId);
          result = await drive.read_webView_inPython(sheetsId);
          return result;
        } catch (e) {
          result = "error";
          return result;
        }
      }
      try {
        if (req.body.sheetName === undefined || req.body.parentId === undefined || req.body.values === undefined) {
          throw new Error("must be sheetName, parentId");
        }
        let sheetsId, response, values, sheetsTargets, tempArr, async;
    
        if (req.body.multiple === undefined) {
          async = false;
          if (req.body.async !== undefined) {
            async = true;
          }
    
          if (!async) {
            response = await asyncFunc(req.body.sheetName, req.body.parentId, req.body.values, req.body.tapName);
          } else {
            asyncFunc(req.body.sheetName, req.body.parentId, req.body.values, req.body.tapName).then((link) => {
              return messageSend({ text: req.body.sheetName + " => " + link, channel: (req.body.channel === undefined) ? "#general" : req.body.channel });
            }).catch((err) => {
              console.log(err);
            });
            response = "will do";
          }
        } else {
          sheetsTargets = JSON.parse(req.body.values);
          sheetsId = "";
          response = "will do";
          tempArr = [];
          sheets.create_newSheets_inPython(req.body.sheetName, req.body.parentId).then((id) => {
            sheetsId = id;
            for (let i = 0; i < sheetsTargets.length; i++) {
              if (i !== 0) {
                tempArr.push(sheetsTargets[i].sheets);
              }
            }
            return sheets.update_defaultSheetName_inPython(sheetsId, sheetsTargets[0].sheets);
          }).then(() => {
            return sheets.add_newSheet_inPython(sheetsId, tempArr);
          }).then(() => {
            return sheets.update_values_inPython(sheetsId, sheetsTargets, [ 0, 0 ]);
          }).then((arr) => {
            return sheets.setting_cleanView_inPython(sheetsId);
          }).then(() => {
            return drive.read_webView_inPython(sheetsId);
          }).then((link) => {
            return messageSend({ text: req.body.sheetName + " => " + link, channel: (req.body.channel === undefined) ? "#general" : req.body.channel });
          }).catch((err) => {
            console.log(err);
          });
        }
    
        res.send(JSON.stringify({ link: response }));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/createProposalDocument" ], async function (req, res) {
      res.set("Content-Type", "application/json");
      try {
    
        const { proid } = req.body;
        const proposalLink = "https://" + address.frontinfo.host + "/proposal.php?proid=" + proid + "&mode=test";
        const thisProject = await back.getProjectById(proid, { selfMongo: instance.mongo });
        const cliid = thisProject.cliid;
        let page, dummy, historyObj;
        let future, now, delta;
        let year, month, date, hour, minute, second;
    
        if (req.body.retryProposal === undefined) {
          await back.updateProject([ { proid }, { "proposal.date": new Date() } ], { selfMongo: instance.mongo });
        }
    
        historyObj = await back.getHistoryById("client", cliid, { selfMongo: instance.mongolocal });
        if (historyObj === null) {
          await back.createHistory("client", { cliid }, { selfMongo: instance.mongolocal, secondMongo: instance.mongo });
          historyObj = await back.getHistoryById("client", cliid, { selfMongo: instance.mongolocal });
        }
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
        if (Array.isArray(historyObj.curation.analytics.send)) {
          historyObj.curation.analytics.send.push(dummy);
        } else {
          historyObj.curation.analytics.send = [ dummy ];
        }
        await back.updateHistory("client", [ { cliid }, { "curation.analytics.send": historyObj.curation.analytics.send } ], { selfMongo: instance.mongolocal });
    
        if (req.body.year !== undefined && req.body.month !== undefined && req.body.date !== undefined && req.body.hour !== undefined && req.body.minute !== undefined && req.body.second !== undefined) {
    
          year = Number(req.body.year);
          month = Number(req.body.month);
          date = Number(req.body.date);
          hour = Number(req.body.hour);
          minute = Number(req.body.minute);
          second = Number(req.body.second);
          future = new Date(year, month - 1, date, hour, minute, second);
          now = new Date();
          delta = future.valueOf() - now.valueOf();
          setTimeout(async () => {
            try {
              await shellExec("node", [ `${process.cwd()}/robot.js`, `webProposal`, proid ]);
            } catch (e) {
              console.log(e);
            }
          }, delta);
    
        } else if (req.body.instant !== undefined) {
    
          shellExec("node", [ `${process.cwd()}/robot.js`, `webProposal`, proid ]).catch((err) => { console.log(err); });
    
        } else {
    
          throw new Error("invaild post");
    
        }
    
        res.send(JSON.stringify({ link: proposalLink }));
    
      } catch (e) {
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
    
    router.post([ "/proposalReset", "/proposalCreate" ], async function (req, res) {
      const back = instance.back;
      const work = instance.work;
      const address = instance.address;
      const { requestSystem, messageSend } = instance.mother;
      try {
        let id, historyObj;
        let requestObj;
    
        if (req.body.proid === undefined) {
          id = req.body.cliid;
        }
        if (req.body.cliid === undefined) {
          id = req.body.proid;
        }
        if (typeof id !== "string") {
          throw new Error("invaild post");
        }
        if (!/^[cp]/.test(id)) {
          throw new Error("invaild post");
        }
    
        if (req.url === "/proposalReset") {
          work.proposalReset(id, { selfMongo: instance.mongo, selfLocalBoo: instance.mongolocal }).catch((err) => {
            console.log(err);
          });
    
        } else if (req.url === "/proposalCreate") {
          if (/^c/.test(id)) {
            if (typeof req.body.serid === "string") {
              if (/^s[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]$/.test(req.body.serid)) {
    
                historyObj = await back.getHistoryById("client", id, { selfMongo: instance.mongolocal });
                if (historyObj !== null && historyObj.curation.image.length > 0) {
    
                  requestObj = {
                    cliid: id,
                    historyQuery: { "curation.service.serid": [ req.body.serid ] },
                    coreQuery: {},
                    mode: "create",
                    fromConsole: 1,
                  };
                  if (req.body.silent !== undefined) {
                    requestObj.silent = true;
                  }
    
                  requestSystem("https://" + address.officeinfo.host + ":3002/styleCuration_updateCalculation", requestObj, { headers: { "origin": "https://" + address.officeinfo.host, "Content-Type": "application/json" } }).then(() => {
                    //pass
                  }).catch((err) => {
                    console.log(err);
                  });
                } else {
                  messageSend({ text: id + " 고객님은 스타일 체크를 진행하지 않아 자동으로 제안서를 만들 수 없습니다!", channel: "#403_proposal" }).catch((err) => {
                    console.log(err);
                  });
                }
    
              }
            }
          }
        }
    
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ message: "will do" }));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/getMembers" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        if (typeof req.body.type !== "string") {
          throw new Error("must be type");
        }
        const membersArr = instance.members;
        let emailArr = [];
        let targetMember = null;
    
        if (req.body.type === "get") {
          res.send(JSON.stringify(membersArr));
        } else if (req.body.type === "boo") {
          for (let { id, email } of membersArr) {
            for (let e of email) {
              emailArr.push({ email: e, id });
            }
          }
    
          for (let i = 0; i < emailArr.length; i++) {
            if (req.body.value === emailArr[i].email) {
              for (let j = 0; j < membersArr.length; j++) {
                if (emailArr[i].id === membersArr[j].id) {
                  targetMember = membersArr[j];
                }
              }
            }
          }
    
          if (targetMember === undefined || targetMember === null) {
            res.send(JSON.stringify({ result: null }));
          } else {
            if (!targetMember.alive) {
              res.send(JSON.stringify({ result: null }));
            } else {
              res.send(JSON.stringify({ result: targetMember }));
            }
          }
    
        } else if (req.body.type === "this") {
    
          if (req.body.mac === undefined) {
            throw new Error("must be mac array");
          }
          const { mac } = equalJson(req.body);
          if (!Array.isArray(mac)) {
            throw new Error("invaild post");
          }
          if (!mac.every((str) => { return typeof str === "string" })) {
            throw new Error("invaild post");
          }
          let thisMemid, thisMap, thisMember;
    
          thisMemid = null;
          for (let obj of address.officeinfo.map) {
            if (mac.includes(obj.mac) && typeof obj.memid === "string") {
              thisMemid = obj.memid;
              break;
            }
          }
    
          if (thisMemid !== null) {
            thisMap = address.officeinfo.map.find((obj) => { return obj.memid = thisMemid; })
            thisMember = membersArr.find((obj) => { return obj.id === thisMemid });
            thisMember.memid = thisMember.id;
            thisMember.mac = thisMap.mac;
    
            res.send((JSON.stringify(thisMember)));
          } else {
            res.send((JSON.stringify({ member: null })));
          }
    
        }
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/parsingProposal" ], async function (req, res) {
      try {
        if (req.body.id === undefined || req.body.serid === undefined) {
          throw new Error("must be cliid, seridNumber");
        }
        const selected = await work.designerCuration(req.body.id, 4, [ `s2011_aa0${req.body.serid}s` ], { selfMongo: instance.mongo, selfLocalMongo: instance.mongolocal });
        if (!Array.isArray(selected)) {
          throw new Error(selected);
        }
        res.set("Content-Type", "application/json");
        if (selected.length === 0) {
          res.send(JSON.stringify({ result: null }));
        } else {
          res.send(JSON.stringify({ result: { proposal: selected } }));
        }
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/alimTalk" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      try {
        if (req.body.method === undefined || req.body.name === undefined || req.body.phone === undefined) {
          throw new Error("must be method, name, phone");
        }
        const { method, name, phone } = equalJson(req.body);
        let option;
        if (req.body.option === undefined) {
          option = {};
        } else {
          option = equalJson(req.body.option);
          if (/ADDRESS\[/g.test(option.host)) {
            if (/\(ghost\)/gi.test(option.host)) {
              option.host = instance.address[option.host.replace(/ADDRESS\[/gi, '').replace(/\]/g, '').replace(/\([^\(\)]+\)/g, '')].ghost.host;
            } else {
              option.host = instance.address[option.host.replace(/ADDRESS\[/gi, '').replace(/\]/g, '').replace(/\([^\(\)]+\)/g, '')].host;
            }
          }
        }
        await instance.kakao.sendTalk(method, name, phone, option);
    
        res.send(JSON.stringify({ message: "success" }));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/sendCertification" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      const back = instance.back;
      const human = instance.human;
      const kakao = instance.kakao;
      const address = instance.address;
      const { equalJson } = instance.mother;
      try {
        const { name, phone, certification } = req.body;
        const ip = String(req.headers["x-forwarded-for"] === undefined ? req.socket.remoteAddress : req.headers["x-forwarded-for"]).trim().replace(/[^0-9\.]/gi, '');
    
        if (address.officeinfo.ip.outer.replace(/[^0-9]/gi, '') === ip.replace(/[^0-9]/gi, '')) {
    
          res.send(JSON.stringify({ message: "office" }));
    
        } else {
          logger.log("인증번호 요청 감지 : " + name + " / " + phone + " / " + certification).catch((e) => { console.log(e); });
          logger.alert("인증번호 요청 감지 : " + name + " / " + phone + " / " + certification).catch((e) => { console.log(e); });
    
          human.sendSms({
            to: phone,
            body: "[홈리에종] 안녕하세요! " + name + "님,\n휴대폰 인증번호를 보내드립니다.\n\n인증번호 : " + certification + "\n\n인증번호를 팝업창에 입력해주세요!"
          }).then(() => {
            return logger.log("인증번호 문자 전송 완료");
          }).catch((e) => { console.log(e); });
    
          kakao.sendTalk("certification", name, phone, {
            company: "홈리에종",
            name,
            certification
          }).then(() => {
            return logger.log("인증번호 카카오 전송 완료");
          }).catch((e) => { console.log(e); });
    
          res.send(JSON.stringify({ message: "will do" }));
        }
    
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/clientSubmit" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        const back = instance.back;
        const selfMongo = instance.mongo;
        const { map } = equalJson(req.body);
        const budgetArr = [ '500만원 이하', '1,000만원', '1,500만원', '2,000만원', '2,500만원', '3,000만원', '3,500만원', '4,000만원', '4,500만원', '5,000만원 이상', '6,000만원 이상', '7,000만원 이상', '8,000만원 이상', '9,000만원 이상', '1억원 이상', '1억 5,000만원 이상', '2억원 이상', '3억원 이상', '5억원 이상', '10억원 이상', ];
        const furnitureArr = [ "재배치", "일부 구매", "전체 구매" ];
        const contractArr = [ "자가", "전월세" ];
        const ignorePhone = [ "010-2747-3403" ];
        const overlapStandardHours = 12;
        const defaultPyeong = 34;
        const moveinConst0 = 60;
        const moveinConst1 = 10;
        let ifOverlap;
        let requestObject;
        let name;
        let phone;
        let address0;
        let address1;
        let email;
        let pyeong;
        let movein;
        let living;
        let etc;
        let future;
        let expectedStart;
        let requestArr;
        let pastRequests;
        let cliid;
        let message;
        let thisClient;
        let sessionId;
        let overlapTimeline;
        let budget;
        let furniture;
        let contract;
    
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
    
        if (name === undefined || phone === undefined || address0 === undefined || address1 === undefined || email === undefined || pyeong === undefined || movein === undefined || living === undefined || etc === undefined) {
          throw new Error("invaild post");
        }
    
        if (sessionId === undefined) {
          sessionId = [];
        } else {
          sessionId = [ sessionId.value.trim() ];
        }
    
        if (contract === undefined) {
          contract = { property: "contract", value: contractArr[0] };
        }
    
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
    
        // budget = budget.value.trim();
        // furniture = furniture.value.trim();
    
        requestObject = {};
    
        requestObject["name"] = name.replace(/[^가-힣]/gi, '')
        requestObject["phone"] = phone.replace(/[^0-9\-]/gi, '');
        requestObject["email"] = email;
    
        requestObject["requests.0.request.space.address"] = String(address0 + " " + address1).trim();
        requestObject["requests.0.request.family"] = "";
    
        // requestObject["requests.0.request.budget"] = budget;
        // requestObject["requests.0.request.furniture"] = furniture;
    
        if (Number.isNaN(Number(pyeong.replace(/[^0-9\.]/gi, ''))) || Number(pyeong.replace(/[^0-9\.]/gi, '')) === 0) {
          requestObject["requests.0.request.space.pyeong"] = defaultPyeong;
        } else {
          requestObject["requests.0.request.space.pyeong"] = Number(pyeong.replace(/[^0-9\.]/gi, ''));
        }
    
        if (/거주중/gi.test(living)) {
          requestObject["requests.0.request.space.resident.living"] = true;
          requestObject["requests.0.request.space.resident.expected"] = new Date();
          future = new Date();
          future.setDate(future.getDate() + moveinConst0);
          requestObject["requests.0.analytics.date.space.movein"] = future;
        } else {
          requestObject["requests.0.request.space.resident.living"] = false;
          requestObject["requests.0.request.space.resident.expected"] = stringToDate(movein);
          future = stringToDate(movein);
          future.setDate(future.getDate() + moveinConst1);
          requestObject["requests.0.analytics.date.space.movein"] = future;
        }
    
        expectedStart = new Date(future.getFullYear(), future.getMonth(), future.getDate(), future.getHours(), future.getMinutes(), future.getSeconds());
        expectedStart = expectedStart.setDate(expectedStart.getDate() - moveinConst0);
        if (!requestObject["requests.0.request.space.resident.living"] && expectedStart.valueOf() <= (new Date()).valueOf()) {
          // requestObject["requests.0.request.space.resident.living"] = true;
          requestObject["requests.0.request.space.resident.expected"] = new Date();
          future = new Date();
          future.setDate(future.getDate() + moveinConst0);
          requestObject["requests.0.analytics.date.space.movein"] = future;
        }
    
        requestObject["requests.0.request.space.contract"] = contract;
        requestObject["requests.0.request.space.spec.room"] = 3;
        requestObject["requests.0.request.space.spec.bathroom"] = 2;
        requestObject["requests.0.request.space.spec.valcony"] = false;
    
        requestObject["requests.0.request.etc.comment"] = etc;
        if (/from meta instant ads/gi.test(etc)) {
          requestObject["requests.0.request.etc.channel"] = "메타 인스턴트";
        } else {
          requestObject["requests.0.request.etc.channel"] = "인터넷 검색";
        }
        requestObject["requests.0.request.timeline"] = new Date();
    
        requestObject["requests.0.analytics.session"] = sessionId;
    
        message = '';
        ifOverlap = await back.getClientsByQuery({ phone }, { selfMongo });
        if (ifOverlap.length > 0) {
    
          cliid = ifOverlap[0].cliid;
    
          pastRequests = (ifOverlap[0].toNormal()).requests;
          overlapTimeline = new Date(JSON.stringify(pastRequests[0].request.timeline).slice(1, -1));
          overlapTimeline.setHours(overlapTimeline.getHours() + overlapStandardHours);
    
          if (overlapTimeline.valueOf() < (new Date()).valueOf()) {
            requestArr = [];
            for (let z = 0; z < pastRequests.length; z++) {
              requestArr.push(pastRequests[z]);
            }
            requestArr.unshift(back.returnClientRequest());
            await back.updateClient([ { cliid }, { "requests": requestArr } ], { selfMongo });
          }
    
          await back.updateClient([ { cliid }, requestObject ], { selfMongo });
    
          message += "재문의가 왔습니다!\n";
    
        } else {
    
          cliid = await back.createClient(requestObject, { selfMongo });
          await back.createHistory("client", { cliid, space: "최초 고객이 적은 주소 : " + requestObject["requests.0.request.space.address"] }, { selfMongo: instance.mongolocal });
          message += "새로운 상담 문의가 왔습니다!\n"
    
        }
    
        const parsingAddress = async (id, rawString, MONGOC, logger) => {
          if (typeof id !== "string" || typeof rawString !== "string" || MONGOC === undefined) {
            throw new Error("invaild input");
          }
          const app = new AddressParser();
          try {
            let arr;
            arr = await app.addressInspection([ { id, address: rawString } ]);
            if (arr.length === 0) {
              return { result: true, id };
            } else {
              const res = await app.getAddress(rawString);
              if (res === null) {
                return { result: false, id };
              } else {
                const { address: { road } } = res;
                await back.updateClient([ { cliid: id }, { "requests.0.request.space.address": (road + " " + rawString) } ], { selfMongo: MONGOC });
                return { result: true, id };
              }
            }
          } catch (e) {
            logger.error(e, req).catch((e) => { console.log(e); });
          }
        }
        parsingAddress(cliid, requestObject["requests.0.request.space.address"], instance.mongo, logger).catch((err) => {
          logger.error(err, req).catch((e) => { console.log(e); });
          console.log(err);
        });
    
        back.getCaseProidById(cliid, { selfMongo }).then((clientCase) => {
          if (clientCase !== null) {
            const serviceCase = clientCase.caseService();
            if (serviceCase !== null) {
              const { serid, xValue } = serviceCase;
              let whereQuery, updateQuery;
              whereQuery = { cliid };
              updateQuery = { "requests.0.analytics.response.service.serid": serid[0].serid, "requests.0.analytics.response.service.xValue": xValue[0].xValue };
              return back.updateClient([ whereQuery, updateQuery ], { selfMongo });
            } else {
              return (new Promise((resolve, reject) => { resolve("fail"); }));
            }
          } else {
            return (new Promise((resolve, reject) => { resolve("fail"); }));
          }
        }).then((message) => {
          logger.log(cliid, "case update " + message);
        }).catch((err) => {
          logger.error(err, req).catch((e) => { console.log(e); });
        });
    
        thisClient = await back.getClientById(cliid, { selfMongo, withTools: true });
        message += "\n" + thisClient.toMessage();
    
        messageSend({ text: message, channel: "#401_consulting" }).then(() => {
          return requestSystem("https://" + instance.address.officeinfo.ghost.host + ":" + String(3000) + "/storeClientAnalytics", { fast: true, talk: true, cliid: thisClient.cliid }, { headers: { "Content-Type": "application/json" } });
        }).catch((err) => { console.log(err); });
    
        res.send(JSON.stringify({ cliid }));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/aspirantSubmit" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      const back = instance.back;
      const address = instance.address;
      const kakao = instance.kakao;
      try {
        if (req.body.map === undefined || req.body.mode === undefined) {
          throw new Error("invalid post");
        }
        const selfMongo = instance.mongo;
        const { map, mode } = equalJson(req.body);
        let name;
        let phone;
        let email;
        let address0;
        let address1;
        let business;
        let company;
        let numbers;
        let start;
        let representative;
        let bankname;
        let banknumber;
        let bankto;
        let homepage;
        let sns;
        let sessionId;
        let whereQuery, updateQuery;
        let aspid;
        let message;
        let rows;
        let thisAspirant;
        let careerDetail, schoolDetail;
        let gender;
        let birth;
        let birth_y, birth_m, birth_d;
        let etc;
        let ceoName, ceoId;
    
        ceoName = instance.members.find((o) => { return o.roles.includes("CEO") }).name;
        ceoId = instance.members.find((o) => { return o.roles.includes("CEO") }).slack.id;
    
        if (mode === "general") {
    
          name = map.find((obj) => { return obj.property === "name" });
          phone = map.find((obj) => { return obj.property === "phone" });
          gender = map.find((obj) => { return obj.property === "gender" });
          birth_y = map.find((obj) => { return obj.property === "birth_y" });
          birth_m = map.find((obj) => { return obj.property === "birth_m" });
          birth_d = map.find((obj) => { return obj.property === "birth_d" });
          email = map.find((obj) => { return obj.property === "email" });
          address0 = map.find((obj) => { return obj.property === "address0" });
          address1 = map.find((obj) => { return obj.property === "address1" });
          business = map.find((obj) => { return obj.property === "business" });
          company = map.find((obj) => { return obj.property === "company" });
          numbers = map.find((obj) => { return obj.property === "numbers" });
          start = map.find((obj) => { return obj.property === "start" });
          representative = map.find((obj) => { return obj.property === "representative" });
          bankname = map.find((obj) => { return obj.property === "bankname" });
          banknumber = map.find((obj) => { return obj.property === "banknumber" });
          bankto = map.find((obj) => { return obj.property === "bankto" });
          careerDetail = map.find((obj) => { return obj.property === "careerdetail" });
          schoolDetail = map.find((obj) => { return obj.property === "schooldetail" });
          homepage = map.find((obj) => { return obj.property === "homepage" });
          sns = map.find((obj) => { return obj.property === "sns" });
          etc = map.find((obj) => { return obj.property === "etc" });
          sessionId = map.find((obj) => { return obj.property === "sessionId" });
    
          if (name === undefined || phone === undefined || email === undefined || address0 === undefined || address1 === undefined || business === undefined || company === undefined || numbers === undefined || start === undefined || representative === undefined || bankname === undefined || banknumber === undefined || bankto === undefined || homepage === undefined || sns === undefined || sessionId === undefined) {
            throw new Error("invalid map post");
          }
    
          if (sessionId === undefined) {
            sessionId = [];
          } else {
            sessionId = [ sessionId.value.trim() ];
          }
    
          name = name.value.trim();
          phone = phone.value.trim();
          address0 = address0.value.trim();
          address1 = address1.value.trim();
          email = email.value.trim();
          gender = gender.value.trim();
          birth_y = birth_y.value.trim();
          if (Number(birth_y) < 1000) {
            birth_y = "19" + birth_y;
          }
          birth_m = birth_m.value.trim();
          birth_d = birth_d.value.trim();
          birth = new Date(Number(birth_y), Number(birth_m) - 1, Number(birth_d));
          etc = etc === undefined ? "" : etc.value.trim();
    
          updateQuery = {};
    
          updateQuery["designer"] = name.replace(/[^가-힣]/gi, '')
          updateQuery["phone"] = phone.replace(/[^0-9\-]/gi, '');
          updateQuery["gender"] = gender;
          updateQuery["email"] = email;
          updateQuery["address"] = address0 + " " + address1;
          updateQuery["birth"] = birth;
    
          updateQuery["submit.partnership.date"] = new Date();
          updateQuery["submit.partnership.boo"] = true;
          updateQuery["submit.comeFrom"] = "";
    
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
          updateQuery["information.company.name"] = company.value.trim();
          updateQuery["information.company.businessNumber"] = numbers.value.trim();
          updateQuery["information.company.start"] = stringToDate(start.value.trim());
          updateQuery["information.company.representative"] = representative.value.trim();
    
          updateQuery["information.account.bank"] = bankname.value.trim();
          updateQuery["information.account.number"] = banknumber.value.trim();
          updateQuery["information.account.to"] = bankto.value.trim();
          updateQuery["information.account.etc"] = "";
    
          updateQuery["information.career.detail"] = equalJson(careerDetail.value.trim());
          updateQuery["information.career.school"] = equalJson(schoolDetail.value.trim());
          updateQuery["information.career.about"] = etc;
    
          updateQuery["information.channel.web"] = [];
          updateQuery["information.channel.sns"] = [];
          updateQuery["information.channel.cloud"] = [];
    
          if (/^http/gi.test(homepage.value.trim())) {
            updateQuery["information.channel.web"].push(stringToLink(homepage.value.trim()));
          }
          if (/^http/gi.test(sns.value.trim())) {
            updateQuery["information.channel.sns"].push(stringToLink(sns.value.trim()));
          }
    
          updateQuery["meeting.status"] = "검토중";
          updateQuery["meeting.date"] = new Date(1800, 0, 1);
          updateQuery["submit.firstRequest.date"] = new Date();
          updateQuery["submit.firstRequest.method"] = "partnership";
    
          updateQuery["response.manager"] = ceoName;
          updateQuery["response.first.status"] = "검토중";
    
          rows = await back.getAspirantsByQuery({ phone: phone.replace(/[^0-9\-]/gi, '') }, { selfMongo });
          message = '';
    
          if (rows.length === 0) {
            aspid = await back.createAspirant(updateQuery, { selfMongo });
            message += "새로운 디자이너 파트너십 신청이 왔습니다!\n";
          } else {
            [ thisAspirant ] = rows.toNormal();
            aspid = thisAspirant.aspid;
            await back.updateAspirant([ { aspid }, updateQuery ], { selfMongo });
            message += "재문의 파트너십 신청이 왔습니다!\n";
          }
    
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
    
          await messageSend({ text: message, channel: "#301_apply", voice: false });
          await messageSend({ text: name + " 디자이너 신청자님의 검토를 부탁드리겠습니다!", channel: "#301_apply", voice: true });
    
          kakao.sendTalk("aspirantSubmit", updateQuery.designer, updateQuery.phone, {
            client: updateQuery.designer,
            host: address.frontinfo.host,
            path: "aspinformation",
            aspid: aspid,
          }).catch((err) => {
            console.log(err);
          });
    
          res.send(JSON.stringify({ aspid }));
    
        } else if (mode === "portfolio") {
    
          name = map.find((obj) => { return obj.property === "name" });
          phone = map.find((obj) => { return obj.property === "phone" });
          careerDetail = map.find((obj) => { return obj.property === "careerdetail" });
          schoolDetail = map.find((obj) => { return obj.property === "schooldetail" });
          etc = map.find((obj) => { return obj.property === "etc" });
    
          name = name.value.trim();
          phone = phone.value.trim();
          etc = etc === undefined ? "" : etc.value.trim();
    
          updateQuery = {};
          updateQuery["designer"] = name.replace(/[^가-힣]/gi, '')
    
          updateQuery["information.career.detail"] = equalJson(careerDetail.value.trim());
          updateQuery["information.career.school"] = equalJson(schoolDetail.value.trim());
          updateQuery["information.career.about"] = etc;
    
          updateQuery["response.portfolio.plus.request"] = new Date();
          updateQuery["response.manager"] = ceoName;
          updateQuery["response.first.status"] = "검토중";
          updateQuery["meeting.status"] = "검토중";
    
          rows = await back.getAspirantsByQuery({ phone: phone.replace(/[^0-9\-]/gi, '') }, { selfMongo });
          if (rows.length === 0) {
            throw new Error("invalid phone number");
          } else {
            [ thisAspirant ] = rows.toNormal();
            aspid = thisAspirant.aspid;
          }
    
          await back.updateAspirant([ { aspid }, updateQuery ], { selfMongo });
          await messageSend({ text: thisAspirant.designer + " 디자이너 신청자님이 추가 포트폴리오를 전송하였습니다!", channel: "#301_apply", voice: true });
          await messageSend({ text: thisAspirant.designer + " 디자이너 신청자님의 추가 포트폴리오 검토를 부탁드리겠습니다!", channel: "#301_apply", voice: false });
    
          sleep(5000).then(() => {
            return kakao.sendTalk("aspirantPortfolio", name, phone, {
              client: name,
              host: address.frontinfo.host,
              path: "aspportfolio",
              aspid: aspid,
            })
          }).catch((err) => {
            console.log(err);
          });
    
          res.send(JSON.stringify({ aspid }));
    
        } else if (mode === "setting") {
    
          const { name, aspid, type, phone } = map;
    
          whereQuery = { aspid };
          updateQuery = {};
          updateQuery["response.portfolio.plus.photo"] = new Date();
    
          await back.updateAspirant([ whereQuery, updateQuery ], { selfMongo });
          await kakao.sendTalk("aspirantSettingConfirm", name, phone, {
            client: name,
            host: address.frontinfo.host,
            path: "aspsetting",
            aspid: aspid,
          });
    
          res.send(JSON.stringify({ aspid }));
    
        } else {
          throw new Error("invalid mode");
        }
    
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/aspirantDocuments" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      const back = instance.back;
      const address = instance.address;
      const kakao = instance.kakao;
      try {
        if (req.body.aspid === undefined) {
          throw new Error("invalid post");
        }
        const selfMongo = instance.mongo;
        const { aspid } = equalJson(req.body);
        const [ aspirant ] = await back.getAspirantsByQuery({ aspid }, { selfMongo });
        let whereQuery, updateQuery;
    
        whereQuery = { aspid };
        updateQuery = {};
        updateQuery["submit.documents.date"] = new Date();
        updateQuery["submit.documents.boo"] = true;
    
        await back.updateAspirant([ whereQuery, updateQuery ], { selfMongo });
        await kakao.sendTalk("aspirantNoticeComplete", aspirant.designer, aspirant.phone, {
          client: aspirant.designer,
          host: address.frontinfo.host,
          path: "asppayment",
          aspid: aspid,
        });
    
        await messageSend({ text: aspirant.designer + " 디자이너 신청자님이 행정 서류를 업로드하셨습니다!", channel: "#301_apply", voice: true });
    
        res.send(JSON.stringify({ message: "done" }));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/aspirantPayment" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      const back = instance.back;
      const address = instance.address;
      const kakao = instance.kakao;
      const paidCompleteFunc = async (aspirant, logger) => {
        try {
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
          await sleep(500);
          await requestSystem("https://" + address.secondinfo.host + ":3003/noticeAspirantCommon", {
            aspid: aspirant.aspid,
            value: "default",
            mode: "send",
          }, {
            headers: { "Content-Type": "application/json" },
          });
        } catch (e) {
          console.log(e);
        }
      }
      try {
        if (req.body.aspid === undefined || req.body.mode === undefined || req.body.status === undefined) {
          throw new Error("invalid post");
        }
        const selfMongo = instance.mongo;
        const { aspid, mode, status } = equalJson(req.body);
        const [ aspirant ] = await back.getAspirantsByQuery({ aspid }, { selfMongo });
        let whereQuery, updateQuery;
        let paidComplete;
    
        paidComplete = false;
    
        if (mode === "card") {
          whereQuery = { aspid };
          updateQuery = {};
          updateQuery["submit.registration.date"] = new Date();
          updateQuery["submit.registration.boo"] = true;
          updateQuery["meeting.status"] = "등록 완료";
          updateQuery["meeting.common.status"] = "미팅 조율";
    
          await back.updateAspirant([ whereQuery, updateQuery ], { selfMongo });
          await messageSend({ text: aspirant.designer + " 디자이너 신청자님이 디자이너 등록비를 카드 결제하셨습니다!", channel: "#301_apply", voice: true });
          await kakao.sendTalk("aspirantPaymentComplete", aspirant.designer, aspirant.phone, { client: aspirant.designer });
          paidComplete = true;
    
        } else if (mode === "vbank") {
          if (status === "ready") {
    
            const { data } = equalJson(req.body);
            await kakao.sendTalk("designerAccount", aspirant.designer, aspirant.phone, {
              designer: aspirant.designer,
              goodName: data.name,
              bankName: data.vbank_name,
              account: data.vbank_num,
              to: data.vbank_holder,
              amount: (data.paid_amount === undefined || Number.isNaN(Number(data.paid_amount))) ? data.amount : data.paid_amount,
            });
            paidComplete = false;
    
          } else if (status === "paid") {
    
            whereQuery = { aspid };
            updateQuery = {};
            updateQuery["submit.registration.date"] = new Date();
            updateQuery["submit.registration.boo"] = true;
            updateQuery["meeting.status"] = "등록 완료";
            updateQuery["meeting.common.status"] = "미팅 조율";
    
            await back.updateAspirant([ whereQuery, updateQuery ], { selfMongo });
            await messageSend({ text: aspirant.designer + " 디자이너 신청자님이 디자이너 등록비를 무통장 입금하셨습니다!", channel: "#301_apply", voice: true });
            await kakao.sendTalk("aspirantPaymentComplete", aspirant.designer, aspirant.phone, { client: aspirant.designer });
            paidComplete = true;
    
          }
        } else {
          throw new Error("invalid mode");
        }
    
        if (paidComplete) {
          paidCompleteFunc(aspirant, logger).catch((err) => {
            logger.error(err, req).catch((e) => { console.log(e); });
          });
        }
    
        res.send(JSON.stringify({ message: "done" }));
      } catch (e) {
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
    
    router.post([ "/webHookPayment" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        const selfMongo = instance.mongo;
        const impId = req.body.imp_uid;
        const oid = req.body.merchant_uid;
        const mid = address.officeinfo.inicis.mid;
        const status = req.body.status;
    
        if (typeof status === "string") {
          if (/paid/gi.test(status) || /Paid/gi.test(status)) {
            if (req.body.imp_uid !== undefined && req.body.tx_id === undefined) {
              if (!/mini_/g.test(oid) && !/dreg_/g.test(oid)) {
    
                const bill = new BillMaker();
                const { data: { response: { access_token: accessToken } } } = (await requestSystem("https://api.iamport.kr/users/getToken", {
                  imp_key: address.officeinfo.import.key,
                  imp_secret: address.officeinfo.import.secret
                }, { headers: { "Content-Type": "application/json" } }));
                const { data: { response: paymentData } } = await requestSystem("https://api.iamport.kr/payments/" + impId, {}, {
                  method: "get",
                  headers: { "Authorization": accessToken }
                });
                const { buyer_tel, paid_at } = paymentData;
                const today = new Date();
                logger.alert(JSON.stringify(paymentData, null, 2)).catch((e) => { console.log(e); });
                const convertingData = {
                  goodName: paymentData.name,
                  goodsName: paymentData.name,
                  resultCode: (paymentData.status.trim() === "paid" ? "0000" : "4000"),
                  resultMsg: (paymentData.status.trim() === "paid" ? "성공적으로 처리 하였습니다." : "결제 실패 : " + String(paymentData.fail_reason)),
                  tid: paymentData.pg_tid,
                  payMethod: "CARD",
                  applDate: `${String(today.getFullYear())}${zeroAddition(today.getMonth() + 1)}${zeroAddition(today.getDate())}${zeroAddition(today.getHours())}${zeroAddition(today.getMinutes())}${zeroAddition(today.getSeconds())}`,
                  mid: mid,
                  MOID: oid,
                  TotPrice: String(paymentData.amount),
                  buyerName: paymentData.buyer_name,
                  CARD_BankCode: paymentData.card_code,
                  CARD_Num: paymentData.card_number,
                  CARD_ApplPrice: String(paymentData.amount),
                  CARD_Code: paymentData.card_code,
                  vactBankName: paymentData.card_name,
                  payDevice: "MOBILE",
                  P_FN_NM: paymentData.card_name,
                };
                const clients = await back.getClientsByQuery({ phone: buyer_tel }, { selfMongo });
                let requestNumber, projects;
                if (clients.length > 0) {
                  const [ client ] = clients;
                  if (/잔금/gi.test(paymentData.name)) {
                    projects = (await back.getProjectsByQuery({ $and: [ { cliid: client.cliid }, { "process.status": { $regex: "^[대진]" } } ] }, { selfMongo })).toNormal().filter((p) => { return p.desid.trim() !== "" });
                  } else {
                    projects = (await back.getProjectsByQuery({ $and: [ { cliid: client.cliid }, { "process.status": { $regex: "^[대진]" } } ] }, { selfMongo })).toNormal();
                  }
                  if (projects.length > 0) {
                    projects.sort((a, b) => { return Math.abs((a.process.contract.remain.calculation.amount.consumer - a.process.contract.first.calculation.amount) - paymentData.amount) - Math.abs((b.process.contract.remain.calculation.amount.consumer - b.process.contract.first.calculation.amount) - paymentData.amount) });
                    const [ project ] = projects;
                    let bills;
                    bills = await bill.getBillsByQuery({ $and: [
                        { "links.proid": project.proid },
                        { "links.cliid": client.cliid },
                        { "links.method": project.service.online ? "online" : "offline" }
                      ]
                    });
                    if (bills.length === 0) {
                      bills = await bill.getBillsByQuery({ $and: [
                          { "links.proid": project.proid },
                          { "links.cliid": client.cliid },
                        ]
                      });
                    }
                    if (bills.length > 0) {
                      const [ thisBill ] = bills;
                      requestNumber = 0;
                      for (let i = 0; i < thisBill.requests.length; i++) {
                        if (convertingData.goodName === thisBill.requests[i].name) {
                          requestNumber = i;
                          break;
                        }
                      }
                      await requestSystem("https://" + address.officeinfo.host + ":3002/ghostClientBill", {
                        bilid: thisBill.bilid,
                        requestNumber,
                        data: convertingData
                      }, { headers: { "Content-Type": "application/json" } });
                    } else {
                      throw new Error("cannot find bills (from links.proid and links.cliid)");
                    }
                  }
                }
    
              } else if (/dreg_/g.test(oid)) {
                const { data: { response: { access_token: accessToken } } } = (await requestSystem("https://api.iamport.kr/users/getToken", {
                  imp_key: address.officeinfo.import.key,
                  imp_secret: address.officeinfo.import.secret
                }, { headers: { "Content-Type": "application/json" } }));
                const { data: { response: paymentData } } = await requestSystem("https://api.iamport.kr/payments/" + impId, {}, {
                  method: "get",
                  headers: { "Authorization": accessToken }
                });
                const [ oidConst, aspid0, aspid1 ] = oid.split("_");
                const aspid = aspid0 + "_" + aspid1;
    
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
              }
            } else {
              if (req.body.payment_id !== undefined) {
                
                const oid = req.body.payment_id;
                const bill = new BillMaker();
                const url = "https://api.portone.io";
                const today = new Date();
                let config, accessToken, accessTokenResponse;
                let getPaymentInfoResponse;
                let getPaymentInfoConfig;
                let paymentData;
                let convertingData;
                let buyer_tel;
                let responseFromPG;
                let tempMatrix;
    
                config = { headers: { "Content-Type": "application/json" } };
      
                accessTokenResponse = await requestSystem(url + "/login/api-secret", { apiSecret: portoneAPIKey }, config);
                accessToken = accessTokenResponse.data.accessToken;
                config.headers["Authorization"] = "Bearer " + accessToken;
            
                getPaymentInfoConfig = objectDeepCopy(config);
                getPaymentInfoConfig.method = "get";
            
                getPaymentInfoResponse = await requestSystem(url + "/payments/" + oid, { storeId }, getPaymentInfoConfig);
                paymentData = getPaymentInfoResponse.data;
                try {
                  responseFromPG = JSON.parse(paymentData.pgResponse);
                } catch {
                  try {
                    tempMatrix = paymentData.pgResponse.split("&").map((str) => { return str.split("=") });
                    responseFromPG = {};
                    for (let [ key, value ] of tempMatrix) {
                      responseFromPG[key] = value;
                    }
                  } catch {
                    responseFromPG = {};
                  }
                }
    
                buyer_tel = autoHypenPhone(paymentData.customer.phoneNumber);
                if (/card/gi.test(paymentData.method.type)) {
                  convertingData = {
                    goodName: paymentData.orderName,
                    goodsName: paymentData.orderName,
                    resultCode: ((typeof paymentData.status === "string" && paymentData.status.trim() === "PAID") ? "0000" : "4000"),
                    resultMsg: ((typeof paymentData.status === "string" && paymentData.status.trim() === "PAID") ? "성공적으로 처리 하였습니다." : "결제 실패"),
                    tid: paymentData.pgTxId,
                    payMethod: "CARD",
                    applDate: `${String(today.getFullYear())}${zeroAddition(today.getMonth() + 1)}${zeroAddition(today.getDate())}${zeroAddition(today.getHours())}${zeroAddition(today.getMinutes())}${zeroAddition(today.getSeconds())}`,
                    mid: mid,
                    MOID: paymentData.id,
                    TotPrice: String(paymentData.amount.total),
                    buyerName: paymentData.customer.name,
                    CARD_BankCode: (typeof responseFromPG.CARD_BankCode === "string") ? responseFromPG.CARD_BankCode : responseFromPG.P_CARD_ISSUER_CODE,
                    CARD_Num: paymentData.method.card.number,
                    CARD_ApplPrice: String(paymentData.amount.total),
                    CARD_Code: (typeof responseFromPG.CARD_Code === "string") ? responseFromPG.CARD_Code : responseFromPG.P_CARD_PURCHASE_CODE,
                    vactBankName: paymentData.method.card.name,
                    payDevice: "MOBILE",
                    P_FN_NM: paymentData.method.card.name,
                  };
                } else {
                  convertingData = {
                    goodName: paymentData.orderName,
                    goodsName: paymentData.orderName,
                    resultCode: ((typeof paymentData.status === "string" && paymentData.status.trim() === "PAID") ? "0000" : "4000"),
                    resultMsg: ((typeof paymentData.status === "string" && paymentData.status.trim() === "PAID") ? "성공적으로 처리 하였습니다." : "결제 실패"),
                    tid: paymentData.pgTxId,
                    payMethod: paymentData.method.type,
                    applDate: `${String(today.getFullYear())}${zeroAddition(today.getMonth() + 1)}${zeroAddition(today.getDate())}${zeroAddition(today.getHours())}${zeroAddition(today.getMinutes())}${zeroAddition(today.getSeconds())}`,
                    mid: mid,
                    MOID: paymentData.id,
                    TotPrice: String(paymentData.amount.total),
                    buyerName: paymentData.customer.name,
                    vactBankName: paymentData.method.bank,
                    payDevice: "MOBILE",
                    P_FN_NM: paymentData.method.bank,
                    CARD_BankCode: paymentData.method.bank,
                  };
                }
    
                const clients = await back.getClientsByQuery({ phone: buyer_tel }, { selfMongo });
                let requestNumber, projects;
                if (clients.length > 0) {
                  const [ client ] = clients;
                  if (/잔금/gi.test(paymentData.orderName)) {
                    projects = (await back.getProjectsByQuery({ $and: [ { cliid: client.cliid }, { "process.status": { $regex: "^[대진]" } } ] }, { selfMongo })).toNormal().filter((p) => { return p.desid.trim() !== "" });
                  } else {
                    projects = (await back.getProjectsByQuery({ $and: [ { cliid: client.cliid }, { "process.status": { $regex: "^[대진]" } } ] }, { selfMongo })).toNormal();
                  }
    
                  if (projects.length > 0) {
                    projects.sort((a, b) => { return Math.abs((a.process.contract.remain.calculation.amount.consumer - a.process.contract.first.calculation.amount) - paymentData.amount) - Math.abs((b.process.contract.remain.calculation.amount.consumer - b.process.contract.first.calculation.amount) - paymentData.amount) });
                    const [ project ] = projects;
                    let bills;
                    bills = await bill.getBillsByQuery({ $and: [
                        { "links.proid": project.proid },
                        { "links.cliid": client.cliid },
                        { "links.method": project.service.online ? "online" : "offline" }
                      ]
                    });
                    if (bills.length === 0) {
                      bills = await bill.getBillsByQuery({ $and: [
                          { "links.proid": project.proid },
                          { "links.cliid": client.cliid },
                        ]
                      });
                    }
                    if (bills.length > 0) {
                      const [ thisBill ] = bills;
                      requestNumber = 0;
                      for (let i = 0; i < thisBill.requests.length; i++) {
                        if (convertingData.goodName === thisBill.requests[i].name) {
                          requestNumber = i;
                          break;
                        }
                      }
    
                      await requestSystem("https://" + address.officeinfo.host + ":3002/ghostClientBill", {
                        bilid: thisBill.bilid,
                        requestNumber,
                        data: convertingData
                      }, { headers: { "Content-Type": "application/json" } });
                    } else {
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
    
    router.post([ "/webHookGoogle" ], async function (req, res) {
      const back = instance.back;
      const { mongo, mongoconsoleinfo, requestSystem, messageLog } = instance.mother;
      const uragenGhostFinalRandomAccessKeyArraySubwayHomeLiaisonStyle = "a19OyoZjf9xQJXykapple3kE5ySgBW39IjxQJXyk3homeliaisonkE5uf9uuuySgBW3ULXHF1CdjxGGPCQJsubwayXyk3kE5ySgBW3f9y2Y2lotionpuk0dQF9ruhcs";
      const coreTargets = [ "designer", "project", "contents", "service" ];
      try {
        let boo;
        res.set({ "Content-Type": "application/json" });
        if (req.body.who === "uragen" && req.body.where === "homeliaison" && req.body.uragenGhostFinalRandomAccessKeyArraySubwayHomeLiaisonStyle === uragenGhostFinalRandomAccessKeyArraySubwayHomeLiaisonStyle) {
          if (req.body.mode === "read" || req.body.mode === "update" || req.body.mode === "create") {
            if (req.body.collection === undefined || req.body.collection === null) {
              res.send(JSON.stringify({ "message": "error" }));
            } else {
              if (typeof req.body.collection !== "string") {
                res.send(JSON.stringify({ "message": "error" }));
              } else {
                if (Array.isArray(req.body.queries)) {
                  boo = true;
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
                  if (boo) {
                    if (coreTargets.includes(req.body.collection)) {
                      for (let { whereQuery, updateQuery } of req.body.queries) {
                        await back.mongoUpdate(req.body.collection, [ whereQuery, updateQuery ], { selfMongo: instance.mongo });
                        console.log(whereQuery, updateQuery);
                      }
                    } else {
                      const selfMongo = new mongo(mongoconsoleinfo);
                      await selfMongo.connect();
                      for (let { whereQuery, updateQuery } of req.body.queries) {
                        await back.mongoUpdate(req.body.collection, [ whereQuery, updateQuery ], { selfMongo });
                      }
                      await selfMongo.close();
                    }
                    messageLog("시트로부터의 업데이트 감지 : " + req.body.collection).catch((e) => { console.log(e); });
                    res.send(JSON.stringify({ "message": "ok" }));
                  } else {
                    res.send(JSON.stringify({ "message": "error" }));
                  }
                } else {
                  res.send(JSON.stringify({ "message": "error" }));
                }
              }
            }
          } else {
            res.send(JSON.stringify({ "message": "error" }));
          }
        } else {
          res.send(JSON.stringify({ "message": "error" }));
        }
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/generalMongo" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        if (req.body.mode === undefined) {
          throw new Error("must be mode => [ create, read, update, delete ]");
        }
        if (req.body.collection === undefined) {
          throw new Error("must be collection name");
        }
        if (req.body.db === undefined) {
          throw new Error("must be db name => ( [ core, back, mongo ] => instance.mongo or [ sub, local, console ] => instance.mongolocal )");
        }
        const { mode, db, collection } = req.body;
        let selfMongo, result;
        let whereQuery, updateQuery;
        let ip, device, logObject;
        let updateQueries;
        let order;
    
        if (db === "core" || db === "back" || db === "mongo") {
          selfMongo = instance.mongo;
        } else if (db === "sub" || db === "local" || db === "console") {
          selfMongo = instance.mongolocal;
        } else {
          throw new Error("must be db name => ( [ core, back, mongo ] => instance.mongo or [ sub, local, console ] => instance.mongolocal )");
        }
    
        if (mode === "read") {
          if (req.body.whereQuery === undefined) {
            throw new Error("must be whereQuery");
          }
          whereQuery = equalJson(req.body.whereQuery);
          result = await back.mongoRead(collection, whereQuery, { selfMongo });
        } else if (mode === "update") {
          if (req.body.whereQuery === undefined || req.body.updateQuery === undefined) {
            throw new Error("must be whereQuery and updateQuery");
          }
          whereQuery = equalJson(req.body.whereQuery);
          updateQuery = equalJson(req.body.updateQuery);
          result = await back.mongoRead(collection, whereQuery, { selfMongo });
          if (result.length !== 0) {
            await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo });
          }
          result = { message: "done" };
        } else if (mode === "create") {
          if (req.body.updateQuery === undefined) {
            throw new Error("must be updateQuery");
          }
          updateQuery = equalJson(req.body.updateQuery);
          await back.mongoCreate(collection, updateQuery, { selfMongo });
          result = { message: "done" };
        } else if (mode === "delete") {
          if (req.body.whereQuery === undefined) {
            throw new Error("must be whereQuery");
          }
          whereQuery = equalJson(req.body.whereQuery);
          await back.mongoDelete(collection, whereQuery, { selfMongo });
          result = { message: "done" };
        } else {
          throw new Error("must be mode => [ create, read, update, delete ]" + " this mode => " + mode);
        }
    
        res.send(JSON.stringify(result));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/makeSchedule", "/listSchedule", "/updateSchedule", "/deleteSchedule" ], async function (req, res) {
      try {
        let resultObj;
        if (req.url === "/makeSchedule") {
          if (req.body.to === undefined || req.body.title === undefined || req.body.start === undefined) {
            throw new Error("invaild body");
          }
          const { to, title } = req.body;
          const start = new Date(req.body.start.replace(/"/g, ''));
          const end = (req.body.end !== undefined) ? new Date(req.body.end.replace(/"/g, '')) : null;
          const description = (req.body.description !== undefined) ? req.body.description : "";
          resultObj = await calendar.makeSchedule(to, title, description, start, end);
        } else if (req.url === "/listSchedule") {
          if (req.body.from === undefined) {
            throw new Error("invaild body");
          }
          const { from } = req.body;
          const search = (req.body.search !== undefined) ? req.body.search : null;
          resultObj = await calendar.listEvents(from, search);
        } else if (req.url === "/updateSchedule") {
          if (req.body.from === undefined || req.body.id === undefined || req.body.updateQuery === undefined) {
            throw new Error("invaild body");
          }
          const { from, id } = req.body;
          const updateQuery = equalJson(req.body.updateQuery);
          await calendar.updateSchedule(from, id, updateQuery);
          resultObj = { "message": "done" };
        } else {
          if (req.body.from === undefined || req.body.id === undefined) {
            throw new Error("invaild body");
          }
          const { from, id } = req.body;
          await calendar.deleteSchedule(from, id);
          resultObj = { "message": "done" };
        }
    
        res.set({ "Content-Type": "application/json" });
        res.send(JSON.stringify(resultObj));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/parsingAddress" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        const addressApp = new AddressParser();
        const calendar = instance.calendar;
        const back = instance.back;
        if (req.body.mode === undefined) {
          throw new Error("must be mode => inspection, distance");
        }
        const { mode } = req.body;
        let result;
    
        if (mode === "inspection") {
          if (req.body.addressArr === undefined) {
            throw new Error("must be addressArr");
          }
          const addressArr = equalJson(req.body.addressArr);
          const liteMode = req.body.liteMode === undefined ? false : (typeof req.body.liteMode === "string" ? req.body.liteMode === "true" : req.body.liteMode);
          for (let obj of addressArr) {
            if (obj.id === undefined || obj.address === undefined) {
              throw new Error("invaild address array => [ { id, address }... ]");
            }
            result = await addressApp.addressInspection(addressArr, liteMode);
          }
        } else if (mode === "distance") {
          if (req.body.from === undefined || req.body.to === undefined) {
            throw new Error("must be from, to");
          }
          const { from, to } = req.body;
          result = await addressApp.getTravelExpenses(from, to, { selfMongo: instance.mongolocal });
        } else if (mode === "sample" || mode === "samples") {
          const priceStandard = await back.mongoRead(`designerPrice`, { key: 33 }, { selfMongo: instance.mongolocal });
          const { travel: { unit, consulting } } = priceStandard[0];
          let travelSamples_min, temp, amount, tong;
          travelSamples_min = await fileSystem(`readJson`, [ addressApp.samples.travelMin ]);
          for (let obj of travelSamples_min) {
            temp = (unit.meters * obj.distance * 2) + (unit.seconds * obj.time * 2);
            amount = (Math.round(temp / 1000) * 1000) + (consulting.hours * consulting.labor);
            obj.amount = amount;
            obj.amountString = autoComma(amount) + '원';
          }
          tong = { standard: {  unit, consulting } };
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
          tong.designers = [];
          for (let i in tong) {
            if (i !== "designers" && i !== "standard") {
              tong.designers.push(equalJson(JSON.stringify(tong[i])));
              delete tong[i];
            }
          }
          result = tong;
        }
    
        res.send(JSON.stringify(result));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/realtimeClient" ], async function (req, res) {
      try {
        if (!req.body.hasOwnProperty("method")) {
          throw new Error("invaild post");
        }
        const selfMongo = instance.mongolocal;
        const { method } = req.body;
        const members = instance.members;
        const emptyCliid = "c0000_aa00s";
        const zeroAddition = (num) => { return (num < 10 ? `0${String(num)}` : String(num)); }
        const dateToKey = function (date) {
          if (!(date instanceof Date)) {
            throw new Error("input => Date: date");
          }
          return Number(String(date.getFullYear()) + zeroAddition(date.getMonth() + 1) + zeroAddition(date.getDate()));
        }
        const returnModel = function (date, standard, clientSide, manager) {
          if (!(date instanceof Date) || !Array.isArray(standard) || !Array.isArray(manager)) {
            throw new Error("input => Date: date, Array: standard, Array: manager");
          }
          let key, caution, matrix;
          key = dateToKey(date);
          caution = (new Array(standard.length)).fill(null, 0);
          matrix = caution.map((i) => { return (new Array(manager.length).fill(null, 0)); });
          return { key, year: date.getFullYear(), month: date.getMonth() + 1, standard, clientSide, caution, manager, matrix };
        }
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
        const manager = [ "m1701_aa01s", "m1707_aa01s", "m1810_aa01s", "m2012_aa01s", "m2101_aa01s" ];
        const managerMain = [ 3, 4 ];
        const clientSide = [
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          0,
          0,
          0,
        ];
        const standard = [
          [
            [ 11, 0 ],
            [ 11, 30 ]
          ],
          [
            [ 11, 30 ],
            [ 12, 0 ]
          ],
          [
            [ 13, 30 ],
            [ 14, 0 ]
          ],
          [
            [ 14, 0 ],
            [ 14, 30 ]
          ],
          [
            [ 14, 30 ],
            [ 15, 0 ]
          ],
          [
            [ 15, 0 ],
            [ 15, 30 ]
          ],
          [
            [ 15, 30 ],
            [ 16, 0 ]
          ],
          [
            [ 16, 0 ],
            [ 16, 30 ]
          ],
          [
            [ 16, 30 ],
            [ 17, 0 ]
          ],
          [
            [ 17, 0 ],
            [ 17, 30 ]
          ],
          [
            [ 17, 30 ],
            [ 18, 0 ]
          ],
          [
            [ 18, 0 ],
            [ 18, 30 ]
          ],
          [
            [ 18, 30 ],
            [ 19, 0 ]
          ],
          [
            [ 19, 0 ],
            [ 19, 30 ]
          ],
          [
            [ 19, 30 ],
            [ 20, 0 ]
          ],
        ];
        const listKey = 99999999;
        const collection = "realtimeClient";
        let result, rows, cliidArr, clients;
        let updateIdIndex;
        let tempDate;
        let boo, boo2, thisObj;
        let bookList;
        let tempRows, tempRow;
        let memberIndex;
    
        if (method === "get") {
          if (req.body.date === undefined) {
            throw new Error("invaild post");
          }
          const { date } = equalJson(req.body);
          rows = await back.mongoRead(collection, { key: dateToKey(date) }, { selfMongo });
          if (rows.length === 0) {
            result = returnModel(date, standard, clientSide, manager);
            await back.mongoCreate(collection, result, { selfMongo });
          } else {
            result = rows[0];
          }
    
          result.standard = result.standard.map((arr) => {
            const [ from, to ] = arr;
            const arrToString = (a) => { return zeroAddition(a[0]) + ':' + zeroAddition(a[1]); }
            return (arrToString(from) + "  ~  " + arrToString(to));
          });
    
          if (req.body.member === undefined) {
    
            result.matrix = result.matrix.map((arr) => {
              let tong;
              tong = [];
              for (let number of managerMain) {
                tong.push(arr[number]);
              }
              return tong;
            });
    
          } else {
    
            memberIndex = manager.findIndex((i) => { return i === req.body.member; });
            if (memberIndex === undefined) {
              memberIndex = 0;
            }
    
            for (let i = 0; i < result.caution.length; i++) {
              if (typeof result.caution[i] === "string") {
                if (!result.matrix[i].includes(result.caution[i])) {
                  result.matrix[i].fill(result.caution[i]);
                }
              }
            }
    
            result.matrix = result.matrix.map((arr) => {
              let tong;
              tong = [];
              tong.push(arr[memberIndex]);
              return tong;
            });
    
          }
    
          result.matrix = result.matrix.map((arr) => {
            let r;
            r = arr.find((z) => { return z !== null });
            if (r !== undefined && r !== null) {
              return r;
            } else {
              return emptyCliid;
            }
          });
          cliidArr = result.matrix.filter((i) => { return i !== emptyCliid; });
          cliidArr = cliidArr.map((id) => { return { cliid: id }; });
          if (cliidArr.length !== 0) {
            clients = await back.getClientsByQuery({ $or: cliidArr }, { selfMongo: instance.mongo, withTools: true });
          } else {
            clients = new SearchArray();
          }
          result.matrix = result.matrix.map((id) => {
            let client;
            client = clients.search(id);
            if (client !== undefined && client !== null) {
              return { name: client.name, cliid: client.cliid };
            } else {
              return { name: "미정", cliid: emptyCliid };
            }
          });
    
        } else if (method === "update") {
    
          if (req.body.date === undefined || req.body.update === undefined) {
            throw new Error("invaild post");
          }
          let { date, update } = equalJson(req.body);
          update = equalJson(update);
          if (update.cliid === undefined || update.index === undefined) {
            throw new Error("invaild update object");
          }
    
          const { cliid, index } = update;
          let member = (update.member !== undefined ? update.member : null);
    
          tempRows = await back.mongoRead(collection, { key: listKey }, { selfMongo });
          if (tempRows.length === 0) {
            throw new Error("invaild db");
          }
          bookList = tempRows[0];
          if (member === null) {
            if (bookList.book[cliid] !== undefined) {
              tempRows = await back.mongoRead(collection, { key: bookList.book[cliid] }, { selfMongo });
              if (tempRows.length === 0) {
                throw new Error("invaild db");
              }
              tempRow = tempRows[0];
              tempRow.caution = tempRow.caution.map((id) => {
                if (id === cliid) {
                  return null;
                } else {
                  return id;
                }
              });
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
              await back.mongoUpdate(collection, [ { key: bookList.book[cliid] }, { caution: tempRow.caution, matrix: tempRow.matrix } ], { selfMongo });
            }
          }
    
          rows = await back.mongoRead(collection, { key: dateToKey(date) }, { selfMongo });
          if (rows.length !== 0) {
            result = rows[0];
            if (member !== null) {
              updateIdIndex = result.manager.findIndex((m) => { return m === member; });
              if (updateIdIndex !== undefined && updateIdIndex !== null) {
                if (updateIdIndex >= 0) {
                  result.matrix[index][updateIdIndex] = cliid;
                  await back.mongoUpdate(collection, [ { key: dateToKey(date) }, { matrix: result.matrix } ], { selfMongo });
                }
              }
            } else {
              if (update.name === undefined) {
                throw new Error("invaild post");
              }
    
              result.standard = result.standard.map((arr) => {
                const [ from, to ] = arr;
                const arrToString = (a) => { return zeroAddition(a[0]) + ':' + zeroAddition(a[1]); }
                return (arrToString(from) + " ~ " + arrToString(to));
              });
    
              await messageSend({ text: `${update.name}(${cliid}) 고객님이 ${String(date.getMonth() + 1)}월 ${String(date.getDate())}일 ${result.standard[index]}에 응대 예약을 하셨습니다! 담당자 지정을 부탁드리겠습니다!`, channel: "#400_customer" });
              result.caution[index] = cliid;
              await back.mongoUpdate(collection, [ { key: dateToKey(date) }, { caution: result.caution } ], { selfMongo });
            }
            bookList.book[cliid] = dateToKey(date);
            await back.mongoUpdate(collection, [ { key: listKey }, { book: bookList.book } ], { selfMongo });
    
          } else {
            throw new Error("invaild db");
          }
          result = { message: "done" };
    
        } else if (method === "standard") {
          result = standard.map((arr) => {
            const [ from, to ] = arr;
            const arrToString = (a) => { return zeroAddition(a[0]) + ':' + zeroAddition(a[1]); }
            return (arrToString(from) + "  ~  " + arrToString(to));
          });
        } else if (method === "range") {
    
          if (req.body.year === undefined || req.body.month === undefined) {
            throw new Error("invaild post");
          }
          const year = Number(req.body.year);
          const month = Number(req.body.month);
          const today = new Date();
          rows = await back.mongoRead(collection, { $and: [ { year }, { month } ] }, { selfMongo });
          result = [];
          for (let i = 0; i < 31; i++) {
            tempDate = new Date(year, month - 1, i + 1, standard.flat(2)[standard.flat(2).length - 2], standard.flat(2)[standard.flat(2).length - 1]);
            if (tempDate.getMonth() + 1 === month) {
    
              if (tempDate.getDay() === 0 || tempDate.getDay() === 6 || today.valueOf() > tempDate.valueOf()) {
                result.push(false);
              } else {
                boo = false;
                for (let r of rows) {
                  if (r.key === dateToKey(tempDate)) {
                    thisObj = r;
                    boo = true;
                  }
                }
                if (boo) {
                  boo2 = false;
                  for (let number of managerMain) {
                    boo2 = thisObj.matrix[number].includes(null);
                    if (boo2) {
                      break;
                    }
                  }
                  result.push(boo2);
                } else {
                  result.push(true);
                }
              }
            }
          }
    
        } else if (method === "manager") {
          result = manager;
        } else if (method === "list") {
          tempRows = await back.mongoRead(collection, { key: listKey }, { selfMongo });
          if (tempRows.length === 0) {
            throw new Error("invaild db");
          }
          const { book } = tempRows[0];
          result = book;
        }
    
        res.set({ "Content-Type": "application/json" });
        res.send(JSON.stringify(result));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/realtimeDesigner" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        if (typeof req.body.mode !== "string") {
          throw new Error("invaild post");
        }
        if (![ "get", "all", "sync", "update" ].includes(req.body.mode)) {
          throw new Error("invaild post");
        }
        const { mode } = req.body;
        const collection = "realtimeDesigner";
        let rows;
        let desid, proid;
        let result;
        let response;
    
        if (mode === "get") {
    
          if (req.body.desid === undefined) {
            throw new Error("invaild post");
          }
          desid = req.body.desid;
          rows = await back.mongoRead(collection, { desid }, { selfMongo: instance.mongolocal });
          if (rows.length > 0) {
            result = rows[0];
          } else {
            result = {};
          }
    
        } else if (mode === "all") {
    
          rows = await back.mongoPick(collection, [ {}, { desid: 1, possible: 1 } ], { selfMongo: instance.mongolocal });
          result = {
            data: rows
          };
    
        } else if (mode === "sync") {
    
          if (req.body.proid === undefined) {
            throw new Error("invaild post");
          }
          proid = req.body.proid;
          response = await work.realtimeDesignerSync(proid, { selfMongo: instance.mongo, selfConsoleMongo: instance.mongolocal });
          if (response.message === "success") {
            result = { message: "success" };
          } else {
            throw new Error(JSON.stringify(response));
          }
    
        } else if (mode === "update") {
    
          if (req.body.desid === undefined) {
            throw new Error("invaild post");
          }
          if (req.body.updateQuery === undefined) {
            throw new Error("invaild post");
          }
          const { desid, updateQuery } = equalJson(req.body);
          await back.mongoUpdate(collection, [ { desid }, updateQuery ], { selfMongo: instance.mongolocal });
          result = { message: "done" };
    
        }
    
        res.send(JSON.stringify(result));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/designerFee" ], async function (req, res) {
      try {
        const option = { selfMongo: instance.mongo, selfLocalMongo: instance.mongolocal };
        if (req.body.matrix === undefined) {
          throw new Error("must be matrix");
        }
        const matrix = equalJson(req.body.matrix);
        const dateMargin = 10;
        let resultObj, temp;
        let project, thisProposal;
        let designerRealtime;
    
        if (req.body.frontMode === 1 || req.body.frontMode === '1') {
          option.frontMode = 1;
        }
    
        if (!Array.isArray(matrix)) {
          throw new Error("invaild post");
        }
    
        if (matrix.every((a) => { return typeof a === "string" && /^p/.test(a); })) {
          resultObj = {};
          for (let proid of matrix) {
            resultObj[proid] = await work.getDesignerFee(proid, option);
          }
        } else if (matrix.every((a) => { return Array.isArray(a) && a.length === 5; })) {
          resultObj = [];
          for (let [ desid, cliid, serid, xValue, proid ] of matrix) {
            temp = await work.getDesignerFee(desid, cliid, serid, xValue, option);
            temp.detail.discount = {
              online: 0,
              offline: 0,
            };
            if (proid !== null && proid !== undefined) {
              project = await back.getProjectById(proid, { selfMongo: instance.mongo });
              thisProposal = project.selectProposal(desid);
              if (thisProposal !== null) {
                for (let { method, discount } of thisProposal.fee) {
                  if (/^off/gi.test(method)) {
                    temp.detail.discount.offline = discount;
                  } else {
                    temp.detail.discount.online = discount;
                  }
                }
              }
              designerRealtime = await work.realtimeDesignerMatch(desid, proid, option);
            } else {
              designerRealtime = await work.realtimeDesignerMatch(desid, cliid, serid, xValue, option);
            }
    
            if (!designerRealtime.result) {
              temp.comment = (req.body.frontMode === 1 || req.body.frontMode === '1') ? "일정 불가능" : "Unable schedule";
              temp.detail.travel.number = 0;
            }
    
            temp.detail.travel.limit = 5;
    
            resultObj.push(temp);
          }
        } else {
          throw new Error("invaild matrix");
        }
    
        res.set({ "Content-Type": "application/json" });
        res.send(JSON.stringify(resultObj));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/inicisPayment" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        const password = "homeliaison";
        const now = new Date();
        const kakao = instance.kakao;
    
        if (req.body.mode === "script") {
          const { cliid, kind, desid, proid, method, device, bilid } = req.body;
          const oidConst = "homeliaisonBill_";
          const version = "1.0";
          const gopaymethod = req.body.gopaymethod;
          const mid = instance.address.officeinfo.inicis.mid;
          const signkey = instance.address.officeinfo.inicis.signkey;
          const timestamp = String(now.valueOf());
          const oid = oidConst + timestamp;
          const price = Math.round(Number(req.body.price));
          const signature = crypto.createHash("sha256").update(`oid=${oid}&price=${String(price)}&timestamp=${timestamp}`).digest("hex");
          const mKey = crypto.createHash("sha256").update(signkey).digest("hex");
          const currency = "WON";
          const goodname = req.body.name;
          const buyername = req.body.buyerName;
          const buyertel = req.body.buyerPhone;
          const buyeremail = req.body.buyerEmail;
          let returnUrl, closeUrl;
          let pluginScript, formValue, acceptmethod;
          let future;
    
          if ((new RegExp(address.frontinfo.host, "gi")).test(req.body.currentPage)) {
            returnUrl = req.body.currentPage + "/inicisPayment?cliid=" + cliid + "&needs=" + ([ kind, desid, proid, method ]).join(',');
            closeUrl = req.body.currentPage + "/tools/trigger.html";
          } else {
            returnUrl = req.body.currentPage + "/inicisPayment?cliid=" + cliid + "&needs=" + ([ kind, desid, proid, method ]).join(',');
            closeUrl = req.body.currentPage + "/tools/trigger";
          }
    
          if (gopaymethod === "Card") {
            pluginScript = '';
            pluginScript += (await requestSystem("https://cdn.iamport.kr/v1/iamport.js")).data;
            formValue = { version, gopaymethod, mid, oid, price, timestamp, signature, mKey, currency, goodname, buyername, buyertel, buyeremail, returnUrl, closeUrl };
          } else if (gopaymethod !== "Account") {
            pluginScript = (await requestSystem("https://stdpay.inicis.com/stdjs/INIStdPay.js")).data;
            if (gopaymethod === "VBank") {
              acceptmethod = "va_receipt";
            } else {
              acceptmethod = "below1000";
            }
            formValue = { version, gopaymethod, mid, oid, price, timestamp, signature, mKey, currency, goodname, buyername, buyertel, buyeremail, returnUrl, closeUrl, acceptmethod };
          } else {
    
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
    
            future = new Date();
            future.setDate(future.getDate() + 7);
    
            pluginScript = await cryptoString(password, JSON.stringify({
              goodName: goodname,
              goodsName: goodname,
              resultCode: "0000",
              resultMsg: "성공적으로 처리 하였습니다.",
              tid: "realAccount",
              payMethod: "ACCOUNT",
              applDate: dateToString(new Date(), true).replace(/[^0-9]/gi, ''),
              mid,
              MOID: oid,
              TotPrice: String(price),
              buyerName: buyername,
              CARD_Code: "",
              vactBankName: "기업",
              VACT_Num: "049-085567-04-022",
              VACT_Name: "(주)홈리에종",
              VACT_Date: dateToString(future).replace(/[^0-9]/gi, ''),
              payDevice: "",
              P_FN_NM: "realAccount",
              REAL_Account: "true"
            }));
            formValue = {};
    
          }
    
          res.send(JSON.stringify({ pluginScript, formValue }));
    
        } else if (req.body.mode === "decrypto") {
    
          let result = await decryptoHash(password, req.body.hash.trim());
          try {
            result = JSON.parse(result);
            res.send(JSON.stringify(result));
          } catch (e) {
            res.send(JSON.stringify({ result }));
          }
    
        } else if (req.body.mode === "mobileCard") {
    
          const { mid, oid, impId } = req.body;
          const { data: { response: { access_token: accessToken } } } = (await requestSystem("https://api.iamport.kr/users/getToken", {
            imp_key: address.officeinfo.import.key,
            imp_secret: address.officeinfo.import.secret
          }, { headers: { "Content-Type": "application/json" } }));
          const { data: { response: paymentData } } = await requestSystem("https://api.iamport.kr/payments/" + impId, {}, {
            method: "get",
            headers: { "Authorization": accessToken }
          });
          const today = new Date();
          const zeroAddition = (num) => { return num < 10 ? `0${String(num)}` : String(num); }
          const convertingData = {
            goodName: paymentData.name,
            goodsName: paymentData.name,
            resultCode: ((typeof paymentData.status === "string" && paymentData.status.trim() === "paid") ? "0000" : "4000"),
            resultMsg: ((typeof paymentData.status === "string" && paymentData.status.trim() === "paid") ? "성공적으로 처리 하였습니다." : "결제 실패 : " + String(paymentData.fail_reason)),
            tid: paymentData.pg_tid,
            payMethod: "CARD",
            applDate: `${String(today.getFullYear())}${zeroAddition(today.getMonth() + 1)}${zeroAddition(today.getDate())}${zeroAddition(today.getHours())}${zeroAddition(today.getMinutes())}${zeroAddition(today.getSeconds())}`,
            mid: mid,
            MOID: oid,
            TotPrice: String(paymentData.amount),
            buyerName: paymentData.buyer_name,
            CARD_BankCode: paymentData.card_code,
            CARD_Num: paymentData.card_number,
            CARD_ApplPrice: String(paymentData.amount),
            CARD_Code: paymentData.card_code,
            vactBankName: paymentData.card_name,
            payDevice: "MOBILE",
            P_FN_NM: paymentData.card_name,
            "__ignorethis__": 1,
          };
    
          if (paymentData.status.trim() === "paid") {
            res.send(JSON.stringify({ convertingData }));
          } else {
            res.send(JSON.stringify({ convertingData: { error: "error" } }));
          }
    
        } else if (req.body.mode === "v2") {
    
          const { mid, oid } = req.body;
          const url = "https://api.portone.io";
          let config, accessToken, accessTokenResponse;
          let getPaymentInfoResponse;
          let getPaymentInfoConfig;
          let paymentData;
          let responseFromPG;
          let tempMatrix;
      
          config = { headers: { "Content-Type": "application/json" } };
      
          accessTokenResponse = await requestSystem(url + "/login/api-secret", { apiSecret: portoneAPIKey }, config);
          accessToken = accessTokenResponse.data.accessToken;
          config.headers["Authorization"] = "Bearer " + accessToken;
      
          getPaymentInfoConfig = objectDeepCopy(config);
          getPaymentInfoConfig.method = "get";
      
          getPaymentInfoResponse = await requestSystem(url + "/payments/" + oid, { storeId }, getPaymentInfoConfig);
          paymentData = getPaymentInfoResponse.data;
          try {
            responseFromPG = JSON.parse(paymentData.pgResponse);
          } catch {
            try {
              tempMatrix = paymentData.pgResponse.split("&").map((str) => { return str.split("=") });
              responseFromPG = {};
              for (let [ key, value ] of tempMatrix) {
                responseFromPG[key] = value;
              }
            } catch {
              responseFromPG = {};
            }
          }
    
          if (paymentData.status.trim() === "PAID") {
            const today = new Date();
            const convertingData = {
              goodName: paymentData.orderName,
              goodsName: paymentData.orderName,
              resultCode: ((typeof paymentData.status === "string" && paymentData.status.trim() === "PAID") ? "0000" : "4000"),
              resultMsg: ((typeof paymentData.status === "string" && paymentData.status.trim() === "PAID") ? "성공적으로 처리 하였습니다." : "결제 실패"),
              tid: paymentData.pgTxId,
              payMethod: "CARD",
              applDate: `${String(today.getFullYear())}${zeroAddition(today.getMonth() + 1)}${zeroAddition(today.getDate())}${zeroAddition(today.getHours())}${zeroAddition(today.getMinutes())}${zeroAddition(today.getSeconds())}`,
              mid: mid,
              MOID: paymentData.id,
              TotPrice: String(paymentData.amount.total),
              buyerName: paymentData.customer.name,
              CARD_BankCode: (typeof responseFromPG.CARD_BankCode === "string") ? responseFromPG.CARD_BankCode : responseFromPG.P_CARD_ISSUER_CODE,
              CARD_Num: paymentData.method.card.number,
              CARD_ApplPrice: String(paymentData.amount.total),
              CARD_Code: (typeof responseFromPG.CARD_Code === "string") ? responseFromPG.CARD_Code : responseFromPG.P_CARD_PURCHASE_CODE,
              vactBankName: paymentData.method.card.name,
              payDevice: "MOBILE",
              P_FN_NM: paymentData.method.card.name,
              "__ignorethis__": 1,
            };
            res.send(JSON.stringify({ convertingData }));
          } else {
            const today = new Date();
            const expired = new Date();
            expired.setHours(expired.getHours() + 47);
            await kakao.sendTalk("virtualAccount", paymentData.customer.name, paymentData.customer.phoneNumber, {
              client: paymentData.customer.name,
              goodName: paymentData.orderName,
              bankName: paymentData.method.bank,
              account: paymentData.method.accountNumber,
              to: paymentData.method.remitteeName,
              amount: autoComma(paymentData.amount.total),
              date: dateToString(expired, true),
            });
            const convertingData = {
              goodName: paymentData.orderName,
              goodsName: paymentData.orderName,
              resultCode: ((typeof paymentData.status === "string" && paymentData.status.trim() === "PAID") ? "0000" : "4000"),
              resultMsg: ((typeof paymentData.status === "string" && paymentData.status.trim() === "PAID") ? "성공적으로 처리 하였습니다." : "결제 실패"),
              tid: paymentData.pgTxId,
              payMethod: "VACCOUNT",
              applDate: `${String(today.getFullYear())}${zeroAddition(today.getMonth() + 1)}${zeroAddition(today.getDate())}${zeroAddition(today.getHours())}${zeroAddition(today.getMinutes())}${zeroAddition(today.getSeconds())}`,
              mid: mid,
              MOID: paymentData.id,
              raw: paymentData,
              "__ignorethis__": 1,
            };
            res.send(JSON.stringify({ convertingData }));
          }
    
        } else if (req.body.mode === "cashPhone") {
    
          const { phone, hash, bilid, proid, desid, cliid, name } = equalJson(req.body);
          const data = JSON.parse(await decryptoHash(password, hash.trim()));
          await requestSystem("https://" + instance.address.officeinfo.host + ":3002/accountTimeUpdate", {
            whereQuery: {
              $and: [
                { bilid },
                { proid },
                { "accountInfo.no_oid": data.MOID }
              ]
            },
            updateQuery: { phone },
            name,
            phone,
          }, {
            headers: { "Content-Type": "application/json" }
          });
          res.send(JSON.stringify({ message: "done" }));
    
        } else {
    
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
          const charset = "UTF-8";
          const format = "JSON";
          const timestamp = String(now.valueOf());
          let device;
          let resultCode, authUrl, netCancelUrl, returnUrl, orderNumber, authToken, mid;
          let signature;
          let response, responseData;
          let target;
          let targetArr, tong, convertTong;
          let tempStr, tempArr;
    
          if (req.body.P_STATUS === undefined) {
            device = "desktop";
            resultCode = req.body.resultCode;
            authUrl = req.body.authUrl;
            netCancelUrl = req.body.netCancelUrl;
            returnUrl = req.body.returnUrl;
            orderNumber = req.body.orderNumber;
            authToken = req.body.authToken;
            mid = req.body.mid;
          } else {
            device = "mobile";
            resultCode = (req.body.P_STATUS === "00" ? "0000" : req.body.P_STATUS);
            authUrl = req.body.P_REQ_URL;
            netCancelUrl = "";
            returnUrl = req.body.P_NOTI.split("__split__")[2];
            orderNumber = "";
            authToken = req.body.P_TID;
            mid = req.body.P_NOTI.split("__split__")[1];
          }
    
          if (device === "desktop") {
            signature = crypto.createHash("sha256").update(`authToken=${authToken}&timestamp=${timestamp}`).digest("hex");
            response = await requestSystem(authUrl, { mid, authToken, timestamp, signature, charset, format });
            responseData = await cryptoString(password, JSON.stringify(response.data));
            if (response.data.resultCode === "0000") {
              res.redirect("/middle/estimation?" + returnUrl.split('?')[1] + "&mode=complete" + "&hash=" + responseData);
            } else {
              res.redirect("/middle/estimation?" + returnUrl.split('?')[1] + "&mode=fail" + "&hash=" + responseData);
            }
          } else {
            if (resultCode === "0000") {
              response = await requestSystem(authUrl, { P_MID: mid, P_TID: authToken });
              target = response.data;
              targetArr = target.split('&').map((q) => { return q.split('='); });
              for (let i = 1; i < targetArr.length; i++) {
                if (targetArr[i][0] === "needs" || targetArr[i][0] === "mode" || targetArr[i][0] === "cliid" || targetArr[i][0] === "desid" || targetArr[i][0] === "proid") {
                  tempStr = targetArr[i - 1][targetArr[i - 1].length - 1] + "&" + targetArr[i].join('=');
                  targetArr[i - 1][targetArr[i - 1].length - 1] = tempStr;
                }
              }
              targetArr = targetArr.filter((arr) => { return arr[0] !== "needs" && arr[0] !== "mode" && arr[0] !== "cliid" && arr[0] !== "desid" && arr[0] !== "proid" });
              for (let i = 0; i < targetArr.length; i++) {
                if (targetArr[i].length > 2) {
                  tempArr = JSON.parse(JSON.stringify(targetArr[i]));
                  tempArr.shift();
                  targetArr[i] = [ targetArr[i][0], tempArr.join('=') ];
                }
              }
              tong = {};
              for (let arr of targetArr) {
                tong[arr[0]] = arr[1];
              }
    
              convertTong = {};
              convertTong.goodName = tong.P_NOTI.split("__split__")[0];
              convertTong.goodsName = tong.P_NOTI.split("__split__")[0];
              for (let from in mobileConverting) {
                if (tong[from] !== undefined) {
                  convertTong[mobileConverting[from]] = tong[from];
                }
              }
              if (convertTong.resultCode === "00") {
                convertTong.resultCode = "0000";
              }
              convertTong.payDevice = "MOBILE";
              convertTong.P_FN_NM = convertTong.vactBankName;
              responseData = await cryptoString(password, JSON.stringify(convertTong));
    
              if (convertTong.resultCode === "0000") {
                res.redirect("/middle/estimation?" + returnUrl.split('?')[1] + "&mode=complete" + "&hash=" + responseData);
              } else {
                logger.alert("결제 문제 생김 (rou_post_inicisPayment) : " + JSON.stringify(convertTong, null, 2) + "\n" + JSON.stringify(req.body, null, 2)).catch((e) => { console.log(e); });
                res.redirect("/middle/estimation?" + returnUrl.split('?')[1] + "&mode=fail" + "&hash=" + responseData);
              }
            } else {
              logger.alert("결제 문제 생김 (rou_post_inicisPayment) : " + resultCode + "\n" + JSON.stringify(req.body, null, 2)).catch((e) => { console.log(e); });
              res.redirect("/middle/estimation?" + returnUrl.split('?')[1] + "&mode=fail");
            }
          }
    
        }
    
      } catch (e) {
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
    
    router.post([ "/constructInteraction" ], async function (req, res) {
      res.set({
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      const back = instance.back;
      const kakao = instance.kakao;
      const { equalJson, dateToString, stringToDate, requestSystem, autoComma, messageSend } = instance.mother;
      const numberToHangul = (number) => {
        if (typeof number !== "number") {
          throw new Error("input must be integer");
        }
        const hangul0 = [ '', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구' ];
        const hangul1 = [ '', '십', '백', '천' ];
        const hangul2 = [ '', '만', '억', '조', '경', '해', '자', '양', '구', '간', '정', '재', '극' ];
        try {
          let numberStr, numberArr, hangul3, first;
    
          hangul3 = [];
          for (let i = 0; i < hangul2.length; i++) {
            for (let j = 0; j < hangul1.length; j++) {
              hangul3.push(hangul1[j] + hangul2[i]);
            }
          }
    
          number = Math.floor(number);
          numberStr = String(number);
          numberArr = numberStr.split('').reverse();
          numberArr = numberArr.map((str, index) => {
            if (str === '0') {
              return '';
            } else {
              return hangul0[Number(str)] + hangul3[index];
            }
          });
    
          for (let i = 1; i < hangul2.length; i++) {
            first = true;
            for (let j = 0; j < numberArr.length; j++) {
              if ((new RegExp(hangul2[i] + '$')).test(numberArr[j])) {
                if (first) {
                  first = false;
                } else {
                  numberArr[j] = numberArr[j].slice(0, -1);
                }
              }
            }
          }
          numberArr.reverse();
    
          return numberArr.join('');
    
        } catch (e) {
          console.log(e);
          return null;
        }
      }
      try {
        if (typeof req.body.mode !== "string" || typeof req.body.proid !== "string") {
          throw new Error("invalid post 1");
        }
        if (![ "updatePayments", "inspection", "sendContract", "constructOnoff", "amountSync", "chargeGuide", "changeAmount", "historyUpdate" ].includes(req.body.mode)) {
          throw new Error("invalid post 2");
        }
        const { mode, proid } = req.body;
        const project = await back.getProjectById(proid, { selfMongo: instance.mongo });
        const projectHistory = await back.getHistoryById("project", proid, { selfMongo: instance.mongolocal });
        const { process: { design: { construct } } } = project;
        let result, summary;
    
        if (mode !== "constructOnoff" && construct === null) {
          throw new Error("invaild proid");
        }
    
        if (mode === "updatePayments") {
          if (req.body.first === undefined || req.body.start === undefined || req.body.middle === undefined || req.body.remain === undefined || req.body.total === undefined) {
            throw new Error("invaild post");
          }
          const { total, first, start, middle, remain } = equalJson(req.body);
          let firstObj, startObj, middleObj, remainObj;
          let whereQuery, updateQuery;
    
          if (construct.contract.payments.first === null) {
            firstObj = back.returnProjectDummies("process.design.construct.contract.payments");
          } else {
            firstObj = construct.contract.payments.first;
          }
          firstObj.calculation.amount.consumer = Math.round(Math.floor(total * (first.ratio / 100)) / 1000) * 1000;
          firstObj.calculation.amount.vat = Math.floor(firstObj.calculation.amount.consumer / 11);
          firstObj.calculation.amount.supply = firstObj.calculation.amount.consumer - firstObj.calculation.amount.vat;
    
          if (construct.contract.payments.start === null) {
            startObj = back.returnProjectDummies("process.design.construct.contract.payments");
          } else {
            startObj = construct.contract.payments.start;
          }
          startObj.calculation.amount.consumer = Math.round(Math.floor(total * (start.ratio / 100)) / 1000) * 1000;
          startObj.calculation.amount.vat = Math.floor(startObj.calculation.amount.consumer / 11);
          startObj.calculation.amount.supply = startObj.calculation.amount.consumer - startObj.calculation.amount.vat;
    
          if (construct.contract.payments.middle === null) {
            middleObj = back.returnProjectDummies("process.design.construct.contract.payments");
          } else {
            middleObj = construct.contract.payments.middle;
          }
          middleObj.calculation.amount.consumer = Math.round(Math.floor(total * (middle.ratio / 100)) / 1000) * 1000;
          middleObj.calculation.amount.vat = Math.floor(middleObj.calculation.amount.consumer / 11);
          middleObj.calculation.amount.supply = middleObj.calculation.amount.consumer - middleObj.calculation.amount.vat;
    
          if (construct.contract.payments.remain === null) {
            remainObj = back.returnProjectDummies("process.design.construct.contract.payments");
          } else {
            remainObj = construct.contract.payments.remain;
          }
          remainObj.calculation.amount.consumer = Math.round(Math.floor(total * (remain.ratio / 100)) / 1000) * 1000;
          remainObj.calculation.amount.vat = Math.floor(remainObj.calculation.amount.consumer / 11);
          remainObj.calculation.amount.supply = remainObj.calculation.amount.consumer - remainObj.calculation.amount.vat;
    
          whereQuery = { proid };
          updateQuery = {};
          updateQuery["process.design.construct.contract.payments.first"] = firstObj;
          updateQuery["process.design.construct.contract.payments.start"] = startObj;
          updateQuery["process.design.construct.contract.payments.middle"] = middleObj;
          updateQuery["process.design.construct.contract.payments.remain"] = remainObj;
          await back.updateProject([ whereQuery, updateQuery ], { selfMongo: instance.mongo });
    
          result = {
            message: "success",
            core: {
              first: firstObj,
              start: startObj,
              middle: middleObj,
              remain: remainObj,
            }
          };
    
        } else if (mode === "inspection") {
    
          const { name, address, start, end } = equalJson(req.body);
          let firstAmount, firstPercentage;
          let startAmount, startPercentage;
          let middleAmount, middlePercentage;
          let remainAmount, remainPercentage;
          let totalAmount;
    
          if (construct.contract.payments.first === null || construct.contract.payments.start === null || construct.contract.payments.middle === null || construct.contract.payments.remain === null) {
            result = { result: false, summary: null };
          } else {
    
            firstAmount = Math.floor(construct.contract.payments.first.calculation.amount.consumer);
            startAmount = Math.floor(construct.contract.payments.start.calculation.amount.consumer);
            middleAmount = Math.floor(construct.contract.payments.middle.calculation.amount.consumer);
            remainAmount = Math.floor(construct.contract.payments.remain.calculation.amount.consumer);
    
            totalAmount = (firstAmount + startAmount + middleAmount + remainAmount);
    
            firstPercentage = Math.round((firstAmount / totalAmount) * 100);
            startPercentage = Math.round((startAmount / totalAmount) * 100);
            middlePercentage = Math.round((middleAmount / totalAmount) * 100);
            remainPercentage = 100 - (firstPercentage + startPercentage + middlePercentage);
    
            if (firstPercentage < 0 || startPercentage < 0 || middlePercentage < 0 || remainPercentage < 0) {
              result = { result: false, summary: null };
            } else {
    
              summary = {
                total: Math.floor(totalAmount),
                hangul: numberToHangul(Math.floor(totalAmount)) + '원',
                name,
                address,
                date: { start, end },
                first: {
                  percentage: Math.floor(firstPercentage),
                  amount: Math.floor(firstAmount),
                  date: dateToString(projectHistory.construct.payments.first.date),
                  etc: projectHistory.construct.payments.first.etc
                },
                start: {
                  percentage: Math.floor(startPercentage),
                  amount: Math.floor(startAmount),
                  date: dateToString(projectHistory.construct.payments.start.date),
                  etc: projectHistory.construct.payments.start.etc
                },
                middle: {
                  percentage: Math.floor(middlePercentage),
                  amount: Math.floor(middleAmount),
                  date: dateToString(projectHistory.construct.payments.middle.date),
                  etc: projectHistory.construct.payments.middle.etc
                },
                remain: {
                  percentage: Math.floor(remainPercentage),
                  amount: Math.floor(remainAmount),
                  date: dateToString(projectHistory.construct.payments.remain.date),
                  etc: projectHistory.construct.payments.remain.etc
                },
              }
              result = { result: true, summary };
    
            }
          }
    
        } else if (mode === "sendContract") {
    
          const { summary } = equalJson(req.body);
          let whereQuery, updateQuery;
    
          whereQuery = { proid };
          updateQuery = {};
          updateQuery["process.design.construct.contract.form.guide"] = new Date();
          await back.updateProject([ whereQuery, updateQuery ], { selfMongo: instance.mongo });
    
          requestSystem("https://" + instance.address.officeinfo.host + ":3002/createConstructContract", { proid, summary }, { headers: { "Content-type": "application/json" } }).catch((err) => {
            throw new Error(err);
          });
          result = { message: "success" };
    
        } else if (mode === "constructOnoff") {
          const { action } = req.body;
          let whereQuery, updateQuery;
    
          whereQuery = { proid };
          updateQuery = {};
    
          if (action === "on") {
            updateQuery["process.design.construct"] = back.returnProjectDummies("process.design.construct");
          } else {
            updateQuery["process.design.construct"] = null;
          }
    
          await back.updateProject([ whereQuery, updateQuery ], { selfMongo: instance.mongo });
          result = { message: "success" };
    
        } else if (mode === "amountSync") {
          const { amount: amountRaw } = req.body;
          const amount = Number(amountRaw);
          let whereQuery, updateQuery;
          let supply, vat, consumer;
          if (construct.contract.payments.remain !== null) {
    
            consumer = Math.floor(amount);
            vat = Math.floor(consumer / 11);
            supply = Math.floor(consumer - vat);
    
            whereQuery = { proid };
            updateQuery = {};
    
            updateQuery["process.design.construct.contract.payments.remain.calculation.amount.supply"] = supply;
            updateQuery["process.design.construct.contract.payments.remain.calculation.amount.vat"] = vat;
            updateQuery["process.design.construct.contract.payments.remain.calculation.amount.consumer"] = consumer;
    
            await back.updateProject([ whereQuery, updateQuery ], { selfMongo: instance.mongo });
    
            requestSystem("https://" + instance.address.officeinfo.host + ":3002/constructAmountSync", {
              proid,
              cliid: project.cliid,
              desid: project.desid,
              method: (project.service.online ? "online" : "offline"),
              amount: { supply, vat, consumer },
            }, { headers: { "Content-type": "application/json" } }).catch((err) => {
              throw new Error(err);
            });
    
          }
    
          result = {};
    
        } else if (mode === "chargeGuide") {
          const { method } = equalJson(req.body);
          const now = new Date();
          const client = await back.getClientById(project.cliid, { selfMongo: instance.mongo });
          const cliid = client.cliid;
          const host = instance.address.frontinfo.host;
          const path = "estimation";
          const needs = "style," + project.desid + "," + project.proid + "," + (project.service.online ? "online" : "offline");
          const name = client.name;
          const phone = client.phone;
          let whereQuery, updateQuery;
          let target;
          whereQuery = { proid };
          updateQuery = {};
          target = "";
          if (method === "first") {
            await kakao.sendTalk("constructFirst", name, phone, {
              client: name,
              amount: autoComma(project.process.design.construct.contract.payments.first.calculation.amount.consumer),
              host, path, cliid, needs
            });
            updateQuery["process.design.construct.contract.payments.first.guide"] = now;
            target = "계약금";
          } else if (method === "start") {
            await kakao.sendTalk("constructStart", name, phone, {
              client: name,
              amount: autoComma(project.process.design.construct.contract.payments.start.calculation.amount.consumer),
              host, path, cliid, needs
            });
            updateQuery["process.design.construct.contract.payments.start.guide"] = now;
            target = "착수금";
          } else if (method === "middle") {
            await kakao.sendTalk("constructMiddle", name, phone, {
              client: name,
              amount: autoComma(project.process.design.construct.contract.payments.middle.calculation.amount.consumer),
              host, path, cliid, needs
            });
            updateQuery["process.design.construct.contract.payments.middle.guide"] = now;
            target = "중도금";
          } else if (method === "remain") {
            await kakao.sendTalk("constructRemain", name, phone, {
              client: name,
              amount: autoComma(project.process.design.construct.contract.payments.remain.calculation.amount.consumer),
              host, path, cliid, needs
            });
            updateQuery["process.design.construct.contract.payments.remain.guide"] = now;
            target = "잔금";
          }
          await back.updateProject([ whereQuery, updateQuery ], { selfMongo: instance.mongo });
          messageSend({ text: name + " 고객님께 시공 " + target + " 안내 알림톡을 전송했어요.", channel: "#400_customer", voice: true }).catch((err) => {
            console.log(err);
          });
          result = { date: dateToString(now), now };
    
        } else if (mode === "changeAmount") {
    
          if (req.body.map === undefined) {
            throw new Error("invaild post");
          }
          const { map: { first, start, middle, remain } } = equalJson(req.body);
          let firstObj, startObj, middleObj, remainObj;
          let whereQuery, updateQuery;
          let toPython;
    
          if (construct.contract.payments.first === null) {
            firstObj = back.returnProjectDummies("process.design.construct.contract.payments");
          } else {
            firstObj = construct.contract.payments.first;
          }
          firstObj.calculation.amount.consumer = first;
          firstObj.calculation.amount.vat = Math.floor(firstObj.calculation.amount.consumer / 11);
          firstObj.calculation.amount.supply = firstObj.calculation.amount.consumer - firstObj.calculation.amount.vat;
    
          if (construct.contract.payments.start === null) {
            startObj = back.returnProjectDummies("process.design.construct.contract.payments");
          } else {
            startObj = construct.contract.payments.start;
          }
          startObj.calculation.amount.consumer = start;
          startObj.calculation.amount.vat = Math.floor(startObj.calculation.amount.consumer / 11);
          startObj.calculation.amount.supply = startObj.calculation.amount.consumer - startObj.calculation.amount.vat;
    
          if (construct.contract.payments.middle === null) {
            middleObj = back.returnProjectDummies("process.design.construct.contract.payments");
          } else {
            middleObj = construct.contract.payments.middle;
          }
          middleObj.calculation.amount.consumer = middle;
          middleObj.calculation.amount.vat = Math.floor(middleObj.calculation.amount.consumer / 11);
          middleObj.calculation.amount.supply = middleObj.calculation.amount.consumer - middleObj.calculation.amount.vat;
    
          if (construct.contract.payments.remain === null) {
            remainObj = back.returnProjectDummies("process.design.construct.contract.payments");
          } else {
            remainObj = construct.contract.payments.remain;
          }
          remainObj.calculation.amount.consumer = remain;
          remainObj.calculation.amount.vat = Math.floor(remainObj.calculation.amount.consumer / 11);
          remainObj.calculation.amount.supply = remainObj.calculation.amount.consumer - remainObj.calculation.amount.vat;
    
          toPython = {
            proid,
            cliid: project.cliid,
            desid: project.desid,
            method: project.service.online ? "online" : "offline",
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
    
          requestSystem("https://" + instance.address.officeinfo.host + ":3002/constructAmountSync", toPython, { headers: { "Content-type": "application/json" } }).catch((err) => {
            throw new Error(err);
          });
    
          whereQuery = { proid };
          updateQuery = {};
          updateQuery["process.design.construct.contract.payments.first"] = firstObj;
          updateQuery["process.design.construct.contract.payments.start"] = startObj;
          updateQuery["process.design.construct.contract.payments.middle"] = middleObj;
          updateQuery["process.design.construct.contract.payments.remain"] = remainObj;
          await back.updateProject([ whereQuery, updateQuery ], { selfMongo: instance.mongo });
    
          result = {
            message: "success",
            core: {
              first: firstObj,
              start: startObj,
              middle: middleObj,
              remain: remainObj,
            }
          };
    
        } else if (mode === "historyUpdate") {
          const { kind, value, column } = equalJson(req.body);
          let whereQuery, updateQuery;
          whereQuery = { proid };
          updateQuery = {};
          updateQuery["construct.payments." + kind + "." + column] = (column === "date" ? stringToDate(value) : value);
          await back.updateHistory("project", [ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });
          result = {};
        } else {
          result = {};
        }
    
        res.send(JSON.stringify(result));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/getOpenGraph" ], async function (req, res) {
      res.set({
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        if (typeof req.body.url !== "string") {
          throw new Error("invaild post");
        }
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
    
        requestHeaders = {
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
        };
    
        try {
          url = global.decodeURI(req.body.url);
        } catch (e) {
          logger.error(e, req).catch((e) => { console.log(e); });
          url = "";
        }
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
        url = urlArr.join("");
    
        try {
          resOpen = await requestSystem(url, {}, { method: "get", headers: requestHeaders });
          targets = [ ...resOpen.data.matchAll(/\<meta[^\>]+property=\"og\:image\"[^\>]+\>/gi) ].map((arr) => { return arr[0] });
        } catch (e) {
          targets = [];
        }
    
        imgTarget = null;
        if (targets.length === 0) {
          try {
            resOpen = await requestSystem(url);
            imgMiddleTargets = [ ...resOpen.data.matchAll(/\<img[^\>]+src="[^\>]+\>/gi) ].map((arr) => { return arr[0] });
          } catch (e) {
            imgMiddleTargets = [];
          }
          imgTargets = imgMiddleTargets.filter((str) => { return !/\.svg/gi.test(str) });
          if (imgTargets.length > 0) {
            imgMiddleTarget = [ ...imgTargets[0].matchAll(/src\=\"[^\"]+\"/gi) ];
            if (imgMiddleTarget.length > 0) {
              imgTarget = imgMiddleTarget[0][0].trim().replace(/^src\=\"/gi, '').slice(0, -1);
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
    
        middleTarget = [];
        target = null;
        if (targets.length > 0) {
          middleTarget = [ ...targets[targets.length - 1].matchAll(/content\=\"[^\"]+\"/gi) ];
          if (middleTarget.length > 0) {
            target = middleTarget[0][0].trim().replace(/^content\=\"/gi, '').slice(0, -1);
            if (/^\//.test(target)) {
              [ protocol, host ] = url.split('/').filter((str) => { return str.trim() !== '' })
              if (/^\/\//.test(target)) {
                target = protocol + target;
              } else {
                target = protocol + "//" + host + target;
              }
            }
          }
        }
    
        if (target === null) {
          if (imgTarget === null) {
            result = { image: null };
          } else {
            result = { image: imgTarget };
          }
        } else {
          result = { image: target };
        }
    
        if (typeof req.body.target === "string") {
          result.target = req.body.target;
        }
    
        res.send(JSON.stringify(result));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/generalImpPayment" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        if (typeof req.body.mode !== "string") {
          throw new Error("invaild post");
        }
        const { mode } = req.body;
        const storeCollection = "impPaymentTempStore";
        const selfMongo = instance.mongolocal;
        const oidConstDictionary = {
          mini: "mini_",
          designerPhoto: "dpho_",
          designerRegistration: "dreg_",
        };
        let pluginScript;
    
        if (mode === "script") {
          pluginScript = '';
          pluginScript += (await requestSystem("https://cdn.iamport.kr/v1/iamport.js")).data;
          res.send(JSON.stringify({ pluginScript, oidConst: oidConstDictionary[req.body.oidKey] }));
    
        } else if (mode === "store") {
    
          const data = equalJson(req.body.data);
          const key = "impKey_" + uniqueValue("hex");
          await back.mongoCreate(storeCollection, { key, data: JSON.stringify(data), oid: req.body.oid }, { selfMongo });
    
          res.send(JSON.stringify({ key }));
    
        } else if (mode === "open") {
    
          const key = req.body.key;
          const rows = await back.mongoRead(storeCollection, { key }, { selfMongo });
          if (rows.length === 0) {
            res.send(JSON.stringify({}));
          } else {
            const [ { key, data, oid } ] = rows;
            const { response: { access_token } } = (await requestSystem("https://api.iamport.kr/users/getToken", {
              imp_key: address.officeinfo.import.key,
              imp_secret: address.officeinfo.import.secret,
            }, { headers: { "Content-Type": "application/json" } })).data;
            const { data: { response: rsp } } = await requestSystem("https://api.iamport.kr/payments/find/" + oid, {}, { method: "get", headers: { "Authorization": access_token } });
            res.send(JSON.stringify({ data: equalJson(data), oid, rsp }));
          }
    
        } else if (mode === "oid") {
          const { response: { access_token } } = (await requestSystem("https://api.iamport.kr/users/getToken", {
            imp_key: address.officeinfo.import.key,
            imp_secret: address.officeinfo.import.secret,
          }, { headers: { "Content-Type": "application/json" } })).data;
          const { oid } = equalJson(req.body);
          const { data: { response: rsp } } = await requestSystem("https://api.iamport.kr/payments/find/" + oid, {}, { method: "get", headers: { "Authorization": access_token } });
          res.send(JSON.stringify({ data: { oid }, oid, rsp }));
    
        } else {
          throw new Error("invaild mode");
        }
    
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/designerFeeTable" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        let json;
        json = await work.designerFeeTable(req.body.desid, { selfMongo: mongo, selfLocalMongo: mongolocal, jsonMode: true });
        res.send(json);
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/timeDeltaAlarm" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      const firstMeetingAlarmFunc = async (MONGOC, logger) => {
        try {
          const selfMongo = MONGOC;
          const today = new Date();
          const dayConst = [ '일', '월', '화', '수', '목', '금', '토' ];
          let projects;
          let clients, client;
          let clientIndex;
          let meetingDate;
          let delta;
          let todayValue;
          let rawDelta;
          let designer;
    
          today.setHours(9);
          todayValue = today.valueOf();
    
          projects = await back.getProjectsByQuery({
            $and: [
              { "desid": { $regex: "^d" } },
              { "process.status": { $regex: "^[대진]" } },
              { "process.contract.meeting.date": { $gt: new Date() } },
            ]
          }, { selfMongo });
    
          if (projects.length > 0) {
    
            clients = await back.getClientsByQuery({
              $or: [ ...new Set(projects.toNormal().map((pr) => { return pr.cliid; })) ].map((cliid) => { return { cliid } }),
            }, { selfMongo });
    
            for (let project of projects) {
              clientIndex = clients.toNormal().findIndex((obj) => { return obj.cliid === project.cliid });
              if (clientIndex !== -1) {
                meetingDate = project.process.contract.meeting.date;
                client = clients.toNormal()[clientIndex];
    
                rawDelta = (((Math.abs(meetingDate.valueOf() - todayValue) / 1000) / 60) / 60) / 24;
                delta = Math.floor(rawDelta);
    
                if (delta === 1 || delta === 7) {
    
                  designer = await back.getDesignerById(project.desid, { selfMongo });
    
                  await kakao.sendTalk("firstMeetingWeekAgo", client.name, client.phone, {
                    client: client.name,
                    date: String(meetingDate.getMonth() + 1) + "월 " + String(meetingDate.getDate()) + "일",
                    day: dayConst[meetingDate.getDay()],
                    hour: String(meetingDate.getHours()),
                    minute: String(meetingDate.getMinutes()),
                    host: address.frontinfo.host,
                    path: "meeting",
                    proid: project.proid,
                  });
    
                  await kakao.sendTalk("designerConsoleRequestFirstMeeting", designer.designer, designer.information.phone, {
                    designer: designer.designer,
                    client: client.name,
                    date: String(meetingDate.getMonth() + 1) + "월 " + String(meetingDate.getDate()) + "일",
                    day: dayConst[meetingDate.getDay()],
                    hour: String(meetingDate.getHours()),
                    minute: String(meetingDate.getMinutes()),
                    host: address.frontinfo.host,
                    path: "process",
                    proid: project.proid,
                  });
    
                  await messageSend(client.name + " 고객님과 " + designer.designer + " 실장님께 현장 미팅 알림을 전송하였어요.", "#400_customer", true);
                }
    
              }
            }
          }
    
          await logger.cron("first meeting alarm done");
    
        } catch (e) {
          console.log(e);
        }
      }
      const contractStartAlarmFunc = async (MONGOC, logger) => {
        try {
          const selfMongo = MONGOC;
          const today = new Date();
          let projects;
          let clients, client;
          let clientIndex;
          let contractDate;
          let todayValue;
          let designer;
          let requestNumber;
          let ago;
    
          today.setHours(9);
          todayValue = today.valueOf();
    
          ago = new Date();
          ago.setHours(7);
          ago.setDate(ago.getDate() - 2);
    
          projects = await back.getProjectsByQuery({
            $and: [
              { "desid": { $regex: "^d" } },
              { "process.status": { $regex: "^[대진완홀]" } },
              { "process.contract.form.date.from": { $gte: ago } },
              { "process.remain.date": { $gte: new Date(2000, 0, 1) } },
            ]
          }, { selfMongo });
    
          if (projects.length > 0) {
    
            clients = await back.getClientsByQuery({
              $or: [ ...new Set(projects.toNormal().map((pr) => { return pr.cliid; })) ].map((cliid) => { return { cliid } }),
            }, { selfMongo });
    
            for (let project of projects) {
              clientIndex = clients.toNormal().findIndex((obj) => { return obj.cliid === project.cliid });
              if (clientIndex !== -1) {
                contractDate = project.process.contract.form.date.from;
                client = clients.toNormal()[clientIndex];
                requestNumber = 0;
                for (let z = 0; z < client.requests.length; z++) {
                  if (client.requests[z].request.timeline.valueOf() <= project.proposal.date.valueOf()) {
                    requestNumber = z;
                    break;
                  }
                }
                if (dateToString(contractDate) === dateToString(new Date())) {
    
                  designer = await back.getDesignerById(project.desid, { selfMongo });
    
                  await kakao.sendTalk("contractStartDesigner", designer.designer, designer.information.phone, {
                    designer: designer.designer,
                    client: client.name,
                    host: address.frontinfo.host,
                    proid: project.proid,
                  });
    
                  await messageSend(designer.designer + " 실장님께 " + client.name + " 고객님 프로젝트 계약 시작일 알림을 전송하였어요.", "#300_designer", false);
                }
              }
            }
          }
    
          await logger.cron("contract start designer alarm done");
    
        } catch (e) {
          console.log(e);
        }
      }
      try {
        firstMeetingAlarmFunc(instance.mongo, logger).then(() => {
          return contractStartAlarmFunc(instance.mongo, logger);
        }).then(() => {
          return logger.cron("time delta alarm done : " + JSON.stringify(new Date()));
        }).catch((err) => {
          logger.error(err, req).catch((e) => { console.log(e); });
        });
        res.send(JSON.stringify({ message: "will do" }));
      } catch (e) {
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
    
    router.post([ "/processConsole" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        const selfMongo = instance.mongolocal;
        const selfCoreMongo = instance.mongo;
        const { mode } = req.body;
        let projects, clients, designers, history;
        let ago;
        let preClients;
        let clientHistory;
        let proidArr;
        let secondRes;
        let values;
        let designerValue;
        let preDesigners;
        let clientValues, designerValues;
        let finalOr;
        let searchMode;
        let clientValue;
    
        class NormalArray extends Array {
          constructor(arr) {
            super();
            for (let i of arr) {
              this.push(i);
            }
          }
          toNormal() {
            let arr;
            arr = [];
            for (let i of this) {
              arr.push(i);
            }
            return arr;
          }
        }
    
        if (mode !== "pre") {
          if (mode === "init") {
    
            projects = await back.getProjectsByQuery({
              $and: [
                {
                  "process.contract.first.date": { $gte: new Date(2000, 0, 1) }
                },
                {
                  "process.status": { $regex: "^[진대]" }
                }
              ]
            }, { selfMongo: selfCoreMongo });
    
          } else if (mode === "search") {
    
            const { value } = req.body;
    
            if (value === '' || value === '.') {
              projects = await back.getProjectsByQuery({
                $and: [
                  {
                    "process.contract.first.date": { $gte: new Date(2000, 0, 1) }
                  },
                  {
                    "process.status": { $regex: "^[진대]" }
                  }
                ]
              }, { selfMongo: selfCoreMongo });
            } else {
              if (/\,/gi.test(value)) {
    
                values = value.split(",").map((str) => { return str.trim() });
                clientValues = values.filter((str) => { return /^c\:/i.test(str) && str.length >= 3 });
                designerValues = values.filter((str) => { return !(/^c\:/i.test(str) && str.length >= 3) });
    
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
    
                finalOr = preClients.toNormal().map((c) => { return { cliid: c.cliid } }).concat(preDesigners.toNormal().map((c) => { return { desid: c.desid } }))
    
                if (finalOr.length > 0) {
                  projects = await back.getProjectsByQuery({ $or: finalOr }, { selfMongo: selfCoreMongo });
                  projects = projects.filter((project) => {
                    return project.process.contract.first.date.valueOf() > (new Date(2000, 0, 1)).valueOf();
                  });
                } else {
                  projects = [];
                }
    
              } else if (/^c\:/i.test(value) && value.length >= 3) {
    
                clientValue = value.split(":")[1].trim();
                preClients = await back.getClientsByQuery({ name: { $regex: clientValue } }, { selfMongo: selfCoreMongo });
                if (preClients.length === 0) {
                  projects = [];
                } else {
                  projects = await back.getProjectsByQuery({ $or: preClients.toNormal().map((c) => { return { cliid: c.cliid } }) }, { selfMongo: selfCoreMongo });
                  projects = projects.filter((project) => {
                    return project.process.contract.first.date.valueOf() > (new Date(2000, 0, 1)).valueOf();
                  });
                }
    
              } else {
                designerValue = value;
                preDesigners = await back.getDesignersByQuery({ designer: { $regex: designerValue } }, { selfMongo: selfCoreMongo });
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
    
            projects = await back.getProjectsByQuery({
              $and: [
                {
                  "process.contract.first.date": { $gte: new Date(2000, 0, 1) }
                },
                {
                  "process.status": { $regex: "^[진대]" }
                }
              ]
            }, { selfMongo: selfCoreMongo });
    
          }
    
          projects.sort((a, b) => { return b.process.contract.first.date.valueOf() - a.process.contract.first.date.valueOf() });
    
          if (projects.length > 0) {
    
            clients = await back.getClientsByQuery({ $or: Array.from(new Set(projects.toNormal().map((p) => { return p.cliid }))).map((cliid) => { return { cliid } }) }, { selfMongo: selfCoreMongo });
            designers = await back.getDesignersByQuery({ $or: Array.from(new Set(projects.toNormal().map((p) => { return p.desid }))).map((desid) => { return { desid } }) }, { selfMongo: selfCoreMongo });
    
            history = await back.mongoRead("projectHistory", {
              $or: projects.toNormal().map((project) => { return { proid: project.proid } })
            }, { selfMongo });
    
            clientHistory = await back.mongoRead("clientHistory", {
              $or: clients.toNormal().map((client) => { return { cliid: client.cliid } })
            }, { selfMongo });
    
            proidArr = projects.toNormal().map((p) => { return p.proid })
            secondRes = await requestSystem("https://" + address.secondinfo.host + ":3003/getProcessData", { proidArr }, {
              headers: {
                "Content-Type": "application/json",
                "origin": address.officeinfo.host
              }
            });
    
            res.send(JSON.stringify({ projects: projects.toNormal(), clients: clients.toNormal(), designers: designers.toNormal(), history, clientHistory, rawContents: secondRes.data.rawContents, sendStatus: secondRes.data.sendStatus, sendSchedule: secondRes.data.sendSchedule, sendFile: secondRes.data.sendFile }));
    
          } else {
            res.send(JSON.stringify({ projects: [], clients: [], designers: [], history: [], clientHistory: [], rawContents: [], sendStatus: [], sendSchedule: [], sendFile: [] }));
          }
        } else {
    
          searchMode = (typeof req.body.searchMode === "string" && /^p/.test(req.body.searchMode));
    
          if (searchMode) {
            projects = await back.getProjectsByQuery({
              $and: [
                {
                  "process.contract.first.date": { $gte: new Date(2000, 0, 1) }
                },
                {
                  "proid": req.body.searchMode
                }
              ]
            }, { selfMongo: selfCoreMongo });
          } else {
            if (req.body.careView !== undefined && Number(req.body.careView) === 1) {
              projects = await back.getProjectsByQuery({
                $and: [
                  {
                    "process.contract.first.date": { $gte: new Date(2000, 0, 1) }
                  },
                  {
                    "process.status": { $regex: "^[진]" }
                  }
                ]
              }, { selfMongo: selfCoreMongo });
            } else {
              projects = await back.getProjectsByQuery({
                $and: [
                  {
                    "process.contract.first.date": { $gte: new Date(2000, 0, 1) }
                  },
                  {
                    "process.status": { $regex: "^[진대]" }
                  }
                ]
              }, { selfMongo: selfCoreMongo });
            }
          }
          projects.sort((a, b) => { return b.process.contract.first.date.valueOf() - a.process.contract.first.date.valueOf() });
          if (projects.length > 0) {
            clients = await back.getClientsByQuery({ $or: Array.from(new Set(projects.toNormal().map((p) => { return p.cliid }))).map((cliid) => { return { cliid } }) }, { selfMongo: selfCoreMongo });
            res.send(JSON.stringify({ projects: projects.toNormal(), clients: clients.toNormal() }));
          } else {
            res.send(JSON.stringify({ projects: [], clients: [] }));
          }
    
        }
    
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/salesClient" ], async function (req, res) {
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
    
        standard = new Date();
        standard.setMonth(standard.getMonth() - monthAgo);
    
        resultObj = { message: "done" };
    
        if (mode === "init") {
    
          ongoingClients = await back.getClientsByQuery({
            requests: {
              $elemMatch: {
                "analytics.response.status": {
                  $regex: "^[응장]"
                }
              }
            }
          }, { selfMongo: selfCoreMongo, withTools: true });
    
          ongoingClientsRequests = ongoingClients.getRequestsTong();
          ongoingClientsRequests.sort((a, b) => {
            return a.request.timeline.valueOf() - b.request.timeline.valueOf();
          });
    
          if (ongoingClientsRequests.length === 0) {
            basicRows = await back.mongoRead(collection, { date: { $gte: standard } }, { selfMongo });
          } else {
            basicRows = await back.mongoRead(collection, { date: { $gte: ongoingClientsRequests[0].request.timeline } }, { selfMongo });
          }
    
          basicRows.sort((a, b) => {
            return b.date.valueOf() - a.date.valueOf();
          })
    
          pureCliids = basicRows.map((o) => {
            return o.cliids.map((o2) => {
              return o2.cliid;
            })
          }).flat();
    
          clients = await back.getClientsByQuery({ $or: pureCliids.map((cliid) => { return { cliid } }) }, { selfMongo: selfCoreMongo });
          clientHistories = await back.mongoRead("clientHistory", { $or: pureCliids.map((cliid) => { return { cliid } }) }, { selfMongo });
    
          filteredHistory = [];
          for (let obj of clientHistories) {
            filteredHistory.push({
              cliid: obj.cliid,
              manager: obj.manager,
              curation: obj.curation,
            })
          }
    
          resultObj = {
            clients: clients.toNormal(),
            histories: filteredHistory,
            sales: basicRows
          };
    
        } else if (mode === "search") {
    
          const { value } = req.body;
          if (value.trim() === '' || value.trim() === '.') {
    
            ongoingClients = await back.getClientsByQuery({
              requests: {
                $elemMatch: {
                  "analytics.response.status": {
                    $regex: "^[응장]"
                  }
                }
              }
            }, { selfMongo: selfCoreMongo, withTools: true });
    
            ongoingClientsRequests = ongoingClients.getRequestsTong();
            ongoingClientsRequests.sort((a, b) => {
              return a.request.timeline.valueOf() - b.request.timeline.valueOf();
            });
    
            if (ongoingClientsRequests.length === 0) {
              basicRows = await back.mongoRead(collection, { date: { $gte: standard } }, { selfMongo });
            } else {
              basicRows = await back.mongoRead(collection, { date: { $gte: ongoingClientsRequests[0].request.timeline } }, { selfMongo });
            }
    
            pureCliids = basicRows.map((o) => {
              return o.cliids.map((o2) => {
                return o2.cliid;
              })
            }).flat();
    
            clients = await back.getClientsByQuery({ $or: pureCliids.map((cliid) => { return { cliid } }) }, { selfMongo: selfCoreMongo });
            clientHistories = await back.mongoRead("clientHistory", { $or: pureCliids.map((cliid) => { return { cliid } }) }, { selfMongo });
    
            filteredHistory = [];
            for (let obj of clientHistories) {
              filteredHistory.push({
                cliid: obj.cliid,
                manager: obj.manager,
                curation: obj.curation,
              })
            }
    
            resultObj = {
              clients: clients.toNormal(),
              histories: filteredHistory,
              sales: basicRows
            };
    
          } else {
    
            ongoingClients = await back.getClientsByQuery({
              name: { $regex: value }
            }, { selfMongo: selfCoreMongo });
            ongoingClientsCliids = ongoingClients.toNormal().map((c) => { return c.cliid });
    
            orQuery = [];
            for (let cliid of ongoingClientsCliids) {
              orQuery.push({
                cliids: {
                  $elemMatch: { cliid }
                }
              })
            }
    
            if (orQuery.length === 0) {
              basicRows = [];
              resultObj = {
                clients: [],
                histories: [],
                sales: basicRows
              };
            } else {
              basicRows = await back.mongoRead(collection, { $or: orQuery }, { selfMongo });
    
              newBasicRows = [];
              for (let obj of basicRows) {
                copiedObj = equalJson(JSON.stringify(obj));
                copiedObj.cliids = copiedObj.cliids.filter((o) => {
                  return ongoingClientsCliids.includes(o.cliid);
                })
                newBasicRows.push(copiedObj);
              }
    
              pureCliids = newBasicRows.map((o) => {
                return o.cliids.map((o2) => {
                  return o2.cliid;
                })
              }).flat();
    
              if (pureCliids.length === 0) {
                filteredHistory = [];
              } else {
                clientHistories = await back.mongoRead("clientHistory", { $or: pureCliids.map((cliid) => { return { cliid } }) }, { selfMongo });
                filteredHistory = [];
                for (let obj of clientHistories) {
                  filteredHistory.push({
                    cliid: obj.cliid,
                    manager: obj.manager,
                    curation: obj.curation,
                  })
                }
              }
    
              resultObj = {
                clients: ongoingClients.toNormal(),
                histories: filteredHistory,
                sales: newBasicRows
              };
    
            }
    
          }
    
        } else if (mode === "update") {
    
          ({ whereQuery, updateQuery } = equalJson(req.body));
          await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo });
          resultObj = { message: "done" };
    
        } else if (mode === "lowLow") {
          if (typeof req.body.cliid === "string") {
    
            targetClients = await back.getClientsByQuery({ cliid: req.body.cliid }, { selfMongo: selfCoreMongo });
            targetHistories = await back.mongoRead("clientHistory", { cliid: req.body.cliid }, { selfMongo });
    
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
              })
              copiedSend.sort((a, b) => { return a.date.valueOf() - b.date.valueOf() })
    
              updateQuery["curation.analytics.send"] = copiedSend;
    
              await back.mongoUpdate("clientHistory", [ whereQuery, updateQuery ], { selfMongo });
            }
    
            resultObj = copiedSend;
    
          } else {
    
            ago = new Date();
            ago.setDate(ago.getDate() - 1);
    
            basicRows = await back.mongoRead(collection, { date: { $gte: ago } }, { selfMongo });
            if (basicRows.length === 0) {
              resultObj = { message: "fail" };
            } else {
              targetCliids = basicRows[0].cliids;
              targetCliids = targetCliids.filter((obj) => {
                return obj.priority === 0 && obj.target === 0;
              });
              if (targetCliids.length === 0) {
                resultObj = { message: "done" };
              } else {
                targetClients = await back.getClientsByQuery({ $or: targetCliids.map((obj) => { return { cliid: obj.cliid } }) }, { selfMongo: selfCoreMongo });
                targetHistories = await back.mongoRead("clientHistory", { $or: targetCliids.map((obj) => { return { cliid: obj.cliid } }) }, { selfMongo });
    
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
                  })
                  copiedSend.sort((a, b) => { return a.date.valueOf() - b.date.valueOf() })
    
                  updateQuery["curation.analytics.send"] = copiedSend;
                  await back.mongoUpdate("clientHistory", [ whereQuery, updateQuery ], { selfMongo });
                }
    
                resultObj = { message: "done" };
              }
            }
    
          }
        }
    
        res.send(JSON.stringify(resultObj));
    
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/dailySales" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        const selfMongo = instance.mongolocal;
        const selfCoreMongo = instance.mongo;
        const aMonthAgo = new Date();
        aMonthAgo.setDate(aMonthAgo.getDate() - 30);
        const clients = await back.getClientsByQuery({
          requests: {
            $elemMatch: {
              "request.timeline": { $gte: aMonthAgo }
            }
          }
        }, { selfMongo: selfCoreMongo, withTools: true });
        const requests = clients.getRequestsTong();
        const collection = "dailySales";
        const idMaker = (date) => {
          return `sales_${dateToString(date).replace(/\-/gi, '')}`;
        }
        let now;
        let standard0From, standard1From, standard2From, standard3From, standard4From;
        let standard0To, standard1To, standard2To, standard3To, standard4To;
        let dummy;
        let thisRequests;
        let matrix;
        let rows;
        let resultObj;
    
        now = new Date();
    
        standard0From = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0, 0, 0);
        while (standard0From.getDay() === 0 || standard0From.getDay() === 6) {
          standard0From.setDate(standard0From.getDate() - 1);
        }
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
    
        standard0To = new Date(JSON.stringify(standard0From).slice(1, -1));
        standard1To = new Date(JSON.stringify(standard1From).slice(1, -1));
        standard2To = new Date(JSON.stringify(standard2From).slice(1, -1));
        standard3To = new Date(JSON.stringify(standard3From).slice(1, -1));
        standard4To = new Date(JSON.stringify(standard4From).slice(1, -1));
    
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
    
        matrix = [
          [ standard0From, standard0To ],
          [ standard1From, standard1To ],
          [ standard2From, standard2To ],
          [ standard3From, standard3To ],
          [ standard4From, standard4To ],
        ];
    
        for (let [ standardFrom, standardTo ] of matrix) {
    
          dummy = {
            id: idMaker(standardTo),
            date: new Date(JSON.stringify(standardTo).slice(1, -1)),
            range: {
              from: new Date(JSON.stringify(standardFrom).slice(1, -1)),
              to: new Date(JSON.stringify(standardTo).slice(1, -1)),
            },
            cliids: [],
          }
    
          thisRequests = requests.filter((request) => { return request.request.timeline.valueOf() > standardFrom.valueOf() && request.request.timeline.valueOf() <= standardTo.valueOf() })
    
          for (let obj of thisRequests) {
            dummy.cliids.push({
              cliid: obj.cliid,
              possible: 0,
              priority: 0,
              target: 0,
            })
          }
    
          rows = await back.mongoRead(collection, { id: dummy.id }, { selfMongo });
          if (rows.length !== 0) {
            await back.mongoDelete(collection, { id: dummy.id }, { selfMongo });
          }
          await back.mongoCreate(collection, equalJson(JSON.stringify(dummy)), { selfMongo });
    
        }
    
        resultObj = { message: "done" };
    
        res.send(JSON.stringify(resultObj));
    
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/dailySalesReport" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        if (req.body.startYear === undefined || req.body.startMonth === undefined || req.body.endYear === undefined || req.body.endMonth === undefined) {
          throw new Error("invalid post");
        }
        const { startYear, startMonth, endYear, endMonth } = req.body;
        const selfMongo = instance.mongolocal;
        const selfCoreMongo = instance.mongo;
        const collection = "dailySales";
        const historyCollection = "clientHistory";
        const proposalKeywords = "designerProposal";
        const db = "miro81";
        const rowToCliids = (rows) => {
          const targetRows = equalJson(JSON.stringify(rows));
          return targetRows.map((o) => { return o.cliids.map(({ cliid }) => { return cliid }) }).flat();
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
    
        startDate = new Date(Number(startYear), Number(startMonth) - 1, 1, 8, 0, 0);
        endDate = new Date(Number(endYear), Number(endMonth) - 1, 1, 10, 0, 0);
        endDate.setMonth(endDate.getMonth() + 1);
        endDate.setDate(endDate.getDate() - 1);
    
        contractProjects = await back.getProjectsByQuery({
          $and: [
            {
              "process.contract.first.date": { $gte: startDate }
            },
            {
              "process.contract.first.date": { $lte: endDate }
            },
          ]
        }, { selfMongo: selfCoreMongo });
        contractProjectsCliids = contractProjects.toNormal().map((p) => { return p.cliid });
    
        rows = await back.mongoRead(collection, {
          $and: [
            {
              date: { $gte: startDate }
            },
            {
              date: { $lte: endDate }
            },
          ]
        }, { selfMongo });
    
        rows.sort((a, b) => {
          return b.date.valueOf() - a.date.valueOf();
        });
    
        rowsCopy = equalJson(JSON.stringify(rows));
        rowsFlat = rowsCopy.map(({ cliids }) => { return cliids }).flat();
    
        whereQuery = rowToCliids(rows).concat(contractProjectsCliids);
        whereQuery = { $or: [ ...new Set(whereQuery) ].map((cliid) => { return { cliid } }) }
    
        allSendHistories = await selfMongo.db(db).collection(historyCollection).find({
          "curation.analytics.send": {
            $elemMatch: {
              date: { $gte: startDate }
            }
          }
        }).project({ manager: 1, "curation.analytics.send": 1, _id: 0 }).toArray();
    
        if (whereQuery["$or"].length > 0) {
    
          thisClients = (await back.getClientsByQuery(whereQuery, { selfMongo: selfCoreMongo })).toNormal();
          thisProjects = (await back.getProjectsByQuery(whereQuery, { selfMongo: selfCoreMongo })).toNormal();
          thisHistories = await selfMongo.db(db).collection(historyCollection).find(whereQuery).project({ cliid: 1, manager: 1, _id: 0 }).toArray();
          contractProjectsCopied = contractProjects.toNormal();
    
          managers = await back.setMemberObj({ getMode: true, selfMongo: selfCoreMongo });
          managers = managers.filter((member) => { return member.roles.includes("CX") }).map((member) => { return member.name });
          managers.push("미지정");
          managers.push("total");
    
          reports = [];
          for (let row of rows) {
    
            reportObject = {};
            reportObject.standard = row.date;
    
            // today stadard
            todayClients = row.cliids.map(({ cliid }) => { return thisClients.find((c) => { return c.cliid === cliid }) });
            for (let client of todayClients) {
              client.history = thisHistories.find((h) => { return h.cliid === client.cliid });
              client.project = thisProjects.find((p) => { return p.cliid === client.cliid });
              client.row = rowsFlat.find((c) => { return c.cliid === client.cliid });
            }
    
            // total standard
            targetRows = rowsCopy.filter((o) => { return o.date.valueOf() <= row.date.valueOf() });
            targetCliids = rowToCliids(targetRows);
            targetClients = targetCliids.map((cliid) => { return thisClients.find((c) => { return c.cliid === cliid }) });
            for (let client of targetClients) {
              client.history = thisHistories.find((h) => { return h.cliid === client.cliid });
              client.project = thisProjects.find((p) => { return p.cliid === client.cliid });
              client.row = rowsFlat.find((c) => { return c.cliid === client.cliid });
            }
    
            // month standard
            fromDate = new Date(row.date.getFullYear(), row.date.getMonth(), 1, 8, 0, 0);
            monthFromDate = new Date(JSON.stringify(fromDate).slice(1, -1));
            toDate = new Date(row.date.getFullYear(), row.date.getMonth() + 1, 1);
            monthRows = rowsCopy.filter((o) => {
              return (o.date.valueOf() > fromDate.valueOf() && o.date.valueOf() < toDate.valueOf()) && (o.date.valueOf() <= row.date.valueOf());
            });
            monthCliids = rowToCliids(monthRows);
            monthClients = monthCliids.map((cliid) => { return thisClients.find((c) => { return c.cliid === cliid }) });
            for (let client of monthClients) {
              client.history = thisHistories.find((h) => { return h.cliid === client.cliid });
              client.project = thisProjects.find((p) => { return p.cliid === client.cliid });
              client.row = rowsFlat.find((c) => { return c.cliid === client.cliid });
            }
            toDateStandard = new Date(JSON.stringify(row.date).slice(1, -1));
            toDateStandard.setHours(23);
            toDateStandard.setMinutes(59);
            toDateStandard.setSeconds(59);
            monthProjects = contractProjectsCopied.filter((obj) => {
              return (obj.process.contract.first.date.valueOf() > fromDate.valueOf() && obj.process.contract.first.date.valueOf() < toDate.valueOf()) && (obj.process.contract.first.date.valueOf() <= toDateStandard.valueOf());
            });
            for (let project of monthProjects) {
              project.history = thisHistories.find((h) => { return h.cliid === project.cliid });
            }
    
            totalProjects = contractProjectsCopied.filter((obj) => {
              return (obj.process.contract.first.date.valueOf() > startDate.valueOf() && obj.process.contract.first.date.valueOf() < toDate.valueOf()) && (obj.process.contract.first.date.valueOf() <= toDateStandard.valueOf());
            });
            for (let project of totalProjects) {
              project.history = thisHistories.find((h) => { return h.cliid === project.cliid });
            }
    
            // day clients
            reportObject.dayClients = [];
            for (let manager of managers) {
              if (manager === "total") {
                reportObject.dayClients.push({
                  manager,
                  value: row.cliids.length,
                })
              } else if (manager === "미지정") {
                reportObject.dayClients.push({
                  manager,
                  value: todayClients.filter((c) => { return !managers.includes(c.history.manager) }).length,
                })
              } else {
                reportObject.dayClients.push({
                  manager,
                  value: todayClients.filter((c) => { return c.history.manager === manager }).length,
                })
              }
            }
    
            // total clients
            reportObject.totalClients = [];
            for (let manager of managers) {
              if (manager === "total") {
                reportObject.totalClients.push({
                  manager,
                  value: targetCliids.length,
                })
              } else if (manager === "미지정") {
                reportObject.totalClients.push({
                  manager,
                  value: targetClients.filter((c) => { return !managers.includes(c.history.manager) }).length,
                })
              } else {
                reportObject.totalClients.push({
                  manager,
                  value: targetClients.filter((c) => { return c.history.manager === manager }).length,
                })
              }
            }
    
            // monthly clients
            reportObject.monthClients = [];
            for (let manager of managers) {
              if (manager === "total") {
                reportObject.monthClients.push({
                  manager,
                  value: monthCliids.length,
                })
              } else if (manager === "미지정") {
                reportObject.monthClients.push({
                  manager,
                  value: monthClients.filter((c) => { return !managers.includes(c.history.manager) }).length,
                })
              } else {
                reportObject.monthClients.push({
                  manager,
                  value: monthClients.filter((c) => { return c.history.manager === manager }).length,
                })
              }
            }
    
            // current clients
            currentClients = targetClients.filter((client) => {
              return client.requests.some(({ analytics }) => { return /^[응장]/gi.test(analytics.response.status) })
            });
            reportObject.currentClients = [];
            for (let manager of managers) {
              if (manager === "total") {
                reportObject.currentClients.push({
                  manager,
                  value: currentClients.length,
                })
              } else if (manager === "미지정") {
                reportObject.currentClients.push({
                  manager,
                  value: currentClients.filter((c) => { return !managers.includes(c.history.manager) }).length,
                })
              } else {
                reportObject.currentClients.push({
                  manager,
                  value: currentClients.filter((c) => { return c.history.manager === manager }).length,
                })
              }
            }
    
            // contract possible clients
            reportObject.contractPossible = [];
            for (let manager of managers) {
              if (manager === "total") {
                reportObject.contractPossible.push({
                  manager,
                  value: currentClients.filter((c) => { return c.requests[0].analytics.response.possible === "높음" }).length,
                })
              } else if (manager === "미지정") {
                reportObject.contractPossible.push({
                  manager,
                  value: currentClients.filter((c) => { return c.requests[0].analytics.response.possible === "높음" }).filter((c) => { return !managers.includes(c.history.manager) }).length,
                })
              } else {
                reportObject.contractPossible.push({
                  manager,
                  value: currentClients.filter((c) => { return c.requests[0].analytics.response.possible === "높음" }).filter((c) => { return c.history.manager === manager }).length,
                })
              }
            }
    
            // total contracts
            reportObject.totalContracts = [];
            for (let manager of managers) {
              if (manager === "total") {
                reportObject.totalContracts.push({
                  manager,
                  value: totalProjects.length,
                })
              } else if (manager === "미지정") {
                reportObject.totalContracts.push({
                  manager,
                  value: totalProjects.filter((p) => { return !managers.includes(p.history.manager) }).length,
                })
              } else {
                reportObject.totalContracts.push({
                  manager,
                  value: totalProjects.filter((p) => { return p.history.manager === manager }).length,
                })
              }
            }
    
            // month contracts
            reportObject.monthContracts = [];
            for (let manager of managers) {
              if (manager === "total") {
                reportObject.monthContracts.push({
                  manager,
                  value: monthProjects.length,
                })
              } else if (manager === "미지정") {
                reportObject.monthContracts.push({
                  manager,
                  value: monthProjects.filter((p) => { return !managers.includes(p.history.manager) }).length,
                })
              } else {
                reportObject.monthContracts.push({
                  manager,
                  value: monthProjects.filter((p) => { return p.history.manager === manager }).length,
                })
              }
            }
    
            // day proposal
            reportObject.dayProposals = [];
            for (let manager of managers) {
              if (manager === "total") {
                reportObject.dayProposals.push({
                  manager,
                  value: allSendHistories.map(({ curation }) => { return curation.analytics.send.filter((obj) => { return dateToString(obj.date) === dateToString(row.date) }) }).flat().filter((obj) => { return obj.page === proposalKeywords }).length,
                })
              } else if (manager === "미지정") {
                reportObject.dayProposals.push({
                  manager,
                  value: allSendHistories.filter((c) => { return !managers.includes(c.manager) }).map(({ curation }) => { return curation.analytics.send.filter((obj) => { return dateToString(obj.date) === dateToString(row.date) }) }).flat().filter((obj) => { return obj.page === proposalKeywords }).length,
                })
              } else {
                reportObject.dayProposals.push({
                  manager,
                  value: allSendHistories.filter((c) => { return c.manager === manager }).map(({ curation }) => { return curation.analytics.send.filter((obj) => { return dateToString(obj.date) === dateToString(row.date) }) }).flat().filter((obj) => { return obj.page === proposalKeywords }).length,
                })
              }
            }
    
            // month proposal
            reportObject.monthProposals = [];
            for (let manager of managers) {
              if (manager === "total") {
                reportObject.monthProposals.push({
                  manager,
                  value: allSendHistories.map(({ curation }) => { return curation.analytics.send.filter((obj) => { return obj.date.valueOf() >= monthFromDate.valueOf() && obj.date.valueOf() <= toDateStandard.valueOf() }) }).flat().filter((obj) => { return obj.page === proposalKeywords }).length,
                })
              } else if (manager === "미지정") {
                reportObject.monthProposals.push({
                  manager,
                  value: allSendHistories.filter((c) => { return !managers.includes(c.manager) }).map(({ curation }) => { return curation.analytics.send.filter((obj) => { return obj.date.valueOf() >= monthFromDate.valueOf() && obj.date.valueOf() <= toDateStandard.valueOf() }) }).flat().filter((obj) => { return obj.page === proposalKeywords }).length,
                })
              } else {
                reportObject.monthProposals.push({
                  manager,
                  value: allSendHistories.filter((c) => { return c.manager === manager }).map(({ curation }) => { return curation.analytics.send.filter((obj) => { return obj.date.valueOf() >= monthFromDate.valueOf() && obj.date.valueOf() <= toDateStandard.valueOf() }) }).flat().filter((obj) => { return obj.page === proposalKeywords }).length,
                })
              }
            }
    
            // total proposal
            reportObject.totalProposals = [];
            for (let manager of managers) {
              if (manager === "total") {
                reportObject.totalProposals.push({
                  manager,
                  value: allSendHistories.map(({ curation }) => { return curation.analytics.send.filter((obj) => { return obj.date.valueOf() >= startDate.valueOf() && obj.date.valueOf() <= toDateStandard.valueOf() }) }).flat().filter((obj) => { return obj.page === proposalKeywords }).length,
                })
              } else if (manager === "미지정") {
                reportObject.totalProposals.push({
                  manager,
                  value: allSendHistories.filter((c) => { return !managers.includes(c.manager) }).map(({ curation }) => { return curation.analytics.send.filter((obj) => { return obj.date.valueOf() >= startDate.valueOf() && obj.date.valueOf() <= toDateStandard.valueOf() }) }).flat().filter((obj) => { return obj.page === proposalKeywords }).length,
                })
              } else {
                reportObject.totalProposals.push({
                  manager,
                  value: allSendHistories.filter((c) => { return c.manager === manager }).map(({ curation }) => { return curation.analytics.send.filter((obj) => { return obj.date.valueOf() >= startDate.valueOf() && obj.date.valueOf() <= toDateStandard.valueOf() }) }).flat().filter((obj) => { return obj.page === proposalKeywords }).length,
                })
              }
            }
    
            reports.push(reportObject);
          }
    
          resultObj = { reports };
        } else {
          resultObj = { reports: [] };
        }
    
        res.send(JSON.stringify(resultObj));
    
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/updateContentsStatus" ], async function (req, res) {
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
        const collection = "contentsStatus";
        let whereQuery, updateQuery;
        let rows;
        let resultObj;
        let dummy;
        let emptyObject;
    
        dummy = {
          conid: "",
          pid: "",
          complete: false,
          date: new Date(),
        };
    
        if (mode === "get") {
          ({ whereQuery } = equalJson(req.body));
          rows = await back.mongoRead(collection, whereQuery, { selfMongo });
          resultObj = rows;
    
        } else if (mode === "update") {
          ({ whereQuery, updateQuery } = equalJson(req.body));
    
          rows = await back.mongoRead(collection, whereQuery, { selfMongo });
          if (rows.length === 0) {
            emptyObject = equalJson(JSON.stringify(dummy));
            emptyObject.conid = updateQuery.conid;
            await back.mongoCreate(collection, emptyObject, { selfMongo });
            await sleep(300);
            await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo });
          } else {
            await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo });
          }
          resultObj = { message: "done" };
    
        } else {
          throw new Error("invalid mode");
        }
    
        res.send(JSON.stringify(resultObj));
    
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/proposalGeneration" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        if (req.body.desid === undefined) {
          throw new Error("invalid post");
        }
        const { desid } = equalJson(req.body);
        const selfMongo = instance.mongo;
        const collection = "project";
        const projects = await back.mongoPick(collection, [ { "proposal.detail": { $elemMatch: { desid } } }, { proid: 1, desid: 1, proposal: 1 } ], { selfMongo });
        let targetProposals;
    
        projects.sort((a, b) => { return b.proposal.date.valueOf() - a.proposal.date.valueOf() })
        targetProposals = projects.map((p) => { return p.proposal.detail }).flat().filter((o) => { return o.desid === desid });
        targetProposals = targetProposals.map(({ pictureSettings }) => { return JSON.stringify(pictureSettings) });
        targetProposals = [ ...new Set(targetProposals) ].map((str) => { return equalJson(str) });
    
        res.send(JSON.stringify(targetProposals));
    
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/frontMemberParsing" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        if (req.body.id === undefined || req.body.ip === undefined || req.body.href === undefined || req.body.mode === undefined) {
          throw new Error("invalid input => " + JSON.stringify(req.body, null, 2));
        }
        const { id, ip, href, mode } = equalJson(req.body);
        const selfMongo = instance.mongolocal;
        const collection = "frontMemberHistory";
        const members = instance.members;
        let json;
        let targetMember;
        let memberId, memberName;
    
        if (mode === "store") {
    
          targetMember = members.find((o) => { return o.ip.includes(ip) });
          if (targetMember !== undefined && targetMember !== null) {
            memberId = targetMember.id;
            memberName = targetMember.name;
    
            json = {
              date: new Date(),
              member: {
                memid: memberId,
                name: memberName,
              },
              data: {
                session: id,
                ip: ip,
                href: href,
              },
            };
    
            await back.mongoCreate(collection, json, { selfMongo });
          } else {
            json = { data: null };
          }
    
          res.send(JSON.stringify(json));
    
        } else {
          throw new Error("invalid mode");
        }
    
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/blackButtonsClick" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        if (req.body.cliid === undefined || req.body.name === undefined || req.body.mode === undefined) {
          throw new Error("invalid input => " + JSON.stringify(req.body, null, 2));
        }
        const { cliid, name, mode } = equalJson(req.body);
        const selfCoreMongo = instance.mongo;
        const selfMongo = instance.mongolocal;
        const toNormal = true;
        const collection = "blackButtonsClick";
        const delta = Math.floor((1 + Math.random()) * 60 * 60 * 1000) - (10 * 60 * 1000);
        const generalPort = 3000;
        let proid, rows;
        let targetProposal;
    
        if (mode === "consulting") {
          await messageSend({ text: name + " 고객님(" + cliid + ")이 상담부터 원한다고 선택하셨어요!", channel: "#404_curation", voice: true });
          await back.mongoCreate(collection, {
            cliid,
            name,
            date: new Date(),
            mode,
          }, { selfMongo });
        } else {
          await messageSend({ text: name + " 고객님(" + cliid + ")이 추천부터 원한다고 선택하셨어요! 2시간 이내로(" + String(Math.floor((delta / 1000) / 60)) + "분 뒤에) 자동 추천서가 발송될 예정입니다!", channel: "#404_curation", voice: true });
    
          setTimeout(async () => {
            try {
              rows = await back.getProjectsByQuery({ cliid }, { selfMongo: selfCoreMongo, toNormal });
              while (rows.length === 0) {
                await sleep(10 * 60 * 1000);
                rows = await back.getProjectsByQuery({ cliid }, { selfMongo: selfCoreMongo, toNormal });
              }
    
              if (rows.length === 0) {
                throw new Error("cannot find proposal");
              }
    
              rows.sort((a, b) => { return b.proposal.date.valueOf() - a.proposal.date.valueOf() });
              [ targetProposal ] = rows;
              proid = targetProposal.proid;
    
              await requestSystem("https://" + address.officeinfo.host + ":" + String(3002) + "/createProposalDocument", { instant: true, proid }, { headers: { "Content-Type": "application/json", "origin": "https://" + address.frontinfo.host } });
              await messageSend({ text: name + " 고객님(" + cliid + ")께 자동 추천서를 전송하였어요!", channel: "#404_curation", voice: true });
              await messageSend({ text: name + " 고객님(" + cliid + ")께 자동 추천서를 전송하였어요!", channel: "#403_proposal", voice: false });
    
              await back.mongoCreate(collection, {
                cliid,
                name,
                date: new Date(),
                mode,
              }, { selfMongo });
    
            } catch(e) {
              console.log(e);
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
    
        res.send(JSON.stringify({ message: "done" }));
    
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/justClientEvaluation" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        if (req.body.mode === undefined) {
          throw new Error("invalid input => " + JSON.stringify(req.body, null, 2));
        }
        const { cliid, proid, mode } = equalJson(req.body);
        const selfCoreMongo = instance.mongo;
        const selfMongo = instance.mongo;
        const selfOfficeMongo = instance.mongo;
        const collection = "clientEvaluationSendHistory";
        const collection2 = "clientEvaluation";
        let thisClient;
        let method;
        let name, phone;
        let projects;
        let rows;
        let target;
        let json;
        
        if (mode === "send") {
    
          [ thisClient ] = await back.mongoPick("client", [ { cliid }, { cliid: 1, name: 1, phone: 1 } ], { selfMongo: selfCoreMongo });
          ({ name, phone } = thisClient);
    
          projects = await back.mongoRead("project", { proid }, { selfMongo: selfCoreMongo });
          projects = projects.filter((p) => { return p.desid !== "" }).filter((p) => {
            return (/진행/gi.test(p.process.status) || /완료/gi.test(p.process.status));
          });
          method = "justClientEvaluation";
    
          if (projects.length > 0) {
            await kakao.sendTalk(method, name, phone, {
              client: name,
              host: address.frontinfo.host,
              path: "evaluation",
              proid
            });
            await messageSend({
              text: name + " 고객님께 서비스 평가 요청을 보냈어요!",
              channel: "#200_web",
              voice: false,
            });
            rows = await back.mongoRead(collection, { proid }, { selfMongo })
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
    
        } else if (mode === "list" || mode === "get") {
    
          rows = await back.mongoRead(collection, { proid }, { selfMongo })
          if (rows.length === 0) {
            res.send(JSON.stringify({ data: null }));
          } else {
            res.send(JSON.stringify({ data: rows[0] }));
          }
    
        } else if (mode === "all") {
    
          rows = await back.mongoRead(collection, {}, { selfMongo })
          res.send(JSON.stringify(rows));
    
        } else if (mode === "store") {
    
          [ thisClient ] = await back.mongoPick("client", [ { cliid }, { cliid: 1, name: 1, phone: 1 } ], { selfMongo: selfCoreMongo });
          ({ name, phone } = thisClient);
    
          projects = await back.mongoRead("project", { proid }, { selfMongo: selfCoreMongo });
          projects = projects.filter((p) => { return p.desid !== "" }).filter((p) => {
            return (/진행/gi.test(p.process.status) || /완료/gi.test(p.process.status));
          });
          method = "justClientEvaluation";
    
          if (projects.length > 0) {
            rows = await back.mongoRead(collection, { proid }, { selfMongo })
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
    
        } else if (mode === "result") {
    
          rows = await back.mongoRead(collection2, { proid }, { selfMongo: selfOfficeMongo })
          res.send(JSON.stringify({ data: rows.find((r) => { return r.proid === proid }) ? rows.find((r) => { return r.proid === proid }) : null }));
    
        } else if (mode === "resultAll") {
    
          rows = await back.mongoRead(collection2, {}, { selfMongo: selfOfficeMongo })
          res.send(JSON.stringify(rows));
    
        } else {
          throw new Error("invalid mode");
        }
    
      } catch (e) {
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
    
    router.post([ "/createStylingContract" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        if (req.body.proid === undefined || req.body.contractName === undefined || req.body.contractAddress === undefined) {
          throw new Error("invaild post");
        }
        const { proid, contractName, contractAddress } = req.body;
        const rows = await back.mongoRead("stylingForm", { proid }, { selfMongo: instance.mongolocal });
        if (rows.length === 0) {
          const selfMongo = instance.mongo;
          const { officeinfo: { widsign: { id, key, endPoint } } } = address;
          const title = "2024디자인계약서_000고객님_주홈리에종_YYMMDD";
          const project = await back.getProjectById(proid, { selfMongo });
          const client = await back.getClientById(project.cliid, { selfMongo });
          const designer = await back.getDesignerById(project.desid, { selfMongo });
          const today = new Date();
          let url, requestNumber, proposalDate;
          let widsignRes, token, target, targetFormId, safeNum;
          let titleName, titleAddress, formTitle;
          let request, analytics;
          let tempArr;
          let map;
          let data;
          let todayYear, todayMonth ,todayDate;
          let delta;
    
          todayYear = String(today.getFullYear());
          todayMonth = String(today.getMonth() + 1);
          todayDate = String(today.getDate());
    
          proposalDate = project.proposal.date.valueOf();
    
          requestNumber = 0;
          for (let i = 0; i < client.requests.length; i++) {
            if (client.requests[i].request.timeline.valueOf() <= proposalDate) {
              requestNumber = i;
              break;
            }
          }
    
          ({ request, analytics } = client.toNormal().requests[requestNumber]);
    
          widsignRes = await requestSystem(endPoint + "/v2/token", {}, { method: "get", headers: { "x-api-id": id, "x-api-key": key } });
    
          if (widsignRes.data.result_code !== 200) {
            throw new Error("access token error");
          } else {
            token = widsignRes.data.access_token;
            num = 1;
            safeNum = 0;
            do {
              widsignRes = await requestSystem(endPoint + "/v2/form", { page: num, page_size: 30, title }, { method: "get", headers: { "x-api-key": key, "x-access-token": token } });
              target = widsignRes.data.result.filter((obj) => { return obj.title === title });
              num++;
              safeNum++;
              if (safeNum > 1000) {
                throw new Error("title name error");
              }
            } while (target.length === 0);
    
            [ { id: targetFormId } ] = target;
    
            titleName = client.name;
            if (contractName.trim() !== "") {
              titleName = contractName;
            }
    
            titleAddress = request.space.address;
            if (contractAddress.trim() !== "") {
              titleAddress = contractAddress;
            }
    
            tempArr = dateToString(today).split('-');
            formTitle = "2024디자인계약서_" + titleName + "고객님_주홈리에종_";
            formTitle = formTitle + tempArr[0].slice(2) + tempArr[1] + tempArr[2];
            map = [
              { id: "66d16860fbe5f88a937b7968", value: todayYear },
              { id: "66d16860fbe5f88a937b7969", value: todayMonth },
              { id: "66d16860fbe5f88a937b796a", value: todayDate },
              { id: "66d16860fbe5f88a937b796b", value: titleName === '' ? '-' : titleName },
              { id: "66d16860fbe5f88a937b796c", value: client.phone === '' ? '-' : client.phone },
              { id: "66d16860fbe5f88a937b796d", value: request.family === '' ? "알 수 없음" : request.family },
              { id: "66d16860fbe5f88a937b796e", value: titleAddress === '' ? '-' : titleAddress },
              { id: "66d16860fbe5f88a937b796f", value: request.budget + " (디자이너 논의 및 조정)" },
              { id: "66d16860fbe5f88a937b7970", value: request.space.contract === '' ? '-' : request.space.contract },
              { id: "66d16860fbe5f88a937b7971", value: "방 " + String(request.space.spec.room) + "개 / 화장실 " + String(request.space.spec.bathroom) + "개" },
              { id: "66d16860fbe5f88a937b7972", value: String(request.space.pyeong) },
              { id: "66d16860fbe5f88a937b7973", value: (/없/gi.test(dateToString(analytics.date.space.precheck)) ? '-' : dateToString(analytics.date.space.precheck)) },
              { id: "66d16860fbe5f88a937b7974", value: (/없/gi.test(dateToString(analytics.date.space.empty)) ? '-' : dateToString(analytics.date.space.empty)) },
              { id: "66d16860fbe5f88a937b7975", value: (/없/gi.test(dateToString(request.space.resident.expected)) ? '-' : dateToString(request.space.resident.expected)) },
            ];
    
            map.push({ id: "66d16860fbe5f88a937b7976", value: serviceParsing(project.service) });
    
            map.push({ id: "66d16860fbe5f88a937b7977", value: designer.designer });
    
            map.push({ id: "66d16860fbe5f88a937b7978", value: todayYear });
            map.push({ id: "66d16860fbe5f88a937b7979", value: todayMonth });
            map.push({ id: "66d16860fbe5f88a937b797b", value: todayDate });
    
            map.push({ id: "66d16860fbe5f88a937b797a", value: String(project.process.contract.form.date.from.getFullYear()) });
            map.push({ id: "66d16860fbe5f88a937b797c", value: String(project.process.contract.form.date.from.getMonth() + 1) });
            map.push({ id: "66d16860fbe5f88a937b797d", value: String(project.process.contract.form.date.from.getDate()) });
    
            map.push({ id: "66d16860fbe5f88a937b797e", value: String(project.process.contract.form.date.to.getFullYear()) });
            map.push({ id: "66d16860fbe5f88a937b797f", value: String(project.process.contract.form.date.to.getMonth() + 1) });
            map.push({ id: "66d16860fbe5f88a937b7980", value: String(project.process.contract.form.date.to.getDate()) });
    
            delta = (((((project.process.contract.form.date.to.valueOf() - project.process.contract.form.date.from.valueOf()) / 1000) / 60) / 60) / 24) / 30;
            map.push({ id: "66d16860fbe5f88a937b7981", value: String(Math.round(delta * 10) / 10) });
    
            map.push({ id: "66d16860fbe5f88a937b7982", value: autoComma(project.process.contract.remain.calculation.amount.consumer) === '' ? '-' : autoComma(project.process.contract.remain.calculation.amount.consumer) });
    
            map.push({ id: "66d16860fbe5f88a937b7983", value: "박헌성" });
            map.push({ id: "66d16860fbe5f88a937b7984", value: "02-2039-2252" });
            map.push({ id: "66d16860fbe5f88a937b7985", value: "help@home-liaison.com" });
    
            map.push({ id: "66d16860fbe5f88a937b7987", value: todayYear });
            map.push({ id: "66d16860fbe5f88a937b7988", value: todayMonth });
            map.push({ id: "66d16860fbe5f88a937b7989", value: todayDate });
            map.push({ id: "66d16860fbe5f88a937b798a", value: titleName === '' ? '-' : titleName });
    
            map.push({ id: "66d16860fbe5f88a937b798c", value: titleName === '' ? '-' : titleName });
    
            map.push({ id: "66d16860fbe5f88a937b798d", value: String(project.process.contract.form.date.from.getFullYear()) });
            map.push({ id: "66d16860fbe5f88a937b798f", value: String(project.process.contract.form.date.from.getMonth() + 1) });
            map.push({ id: "66d16860fbe5f88a937b7990", value: String(project.process.contract.form.date.from.getDate()) });
    
            map.push({ id: "66d16860fbe5f88a937b798e", value: String(project.process.contract.form.date.to.getFullYear()) });
            map.push({ id: "66d16860fbe5f88a937b7992", value: String(project.process.contract.form.date.to.getMonth() + 1) });
            map.push({ id: "66d16860fbe5f88a937b7991", value: String(project.process.contract.form.date.to.getDate()) });
    
            map.push({ id: "66d16860fbe5f88a937b7993", value: autoComma(project.process.contract.remain.calculation.amount.consumer) === '' ? '-' : autoComma(project.process.contract.remain.calculation.amount.consumer) });
    
            map.push({ id: "66d16860fbe5f88a937b7997", value: todayYear });
            map.push({ id: "66d16860fbe5f88a937b7998", value: todayMonth });
            map.push({ id: "66d16860fbe5f88a937b7999", value: todayDate });
    
            map.push({ id: "66d16860fbe5f88a937b7994", value: titleAddress === '' ? '-' : titleAddress });
            map.push({ id: "66d16860fbe5f88a937b7995", value: titleName === '' ? '-' : titleName });
    
            map.push({ id: "66d16860fbe5f88a937b799a", value: titleName === '' ? '-' : titleName });
            map.push({ id: "66d16860fbe5f88a937b799b", value: todayYear });
            map.push({ id: "66d16860fbe5f88a937b799c", value: todayMonth });
            map.push({ id: "66d16860fbe5f88a937b799d", value: todayDate });
    
            map.push({ id: "66d16860fbe5f88a937b79a1", value: todayYear });
            map.push({ id: "66d16860fbe5f88a937b79a2", value: todayMonth });
            map.push({ id: "66d16860fbe5f88a937b79a3", value: todayDate });
    
            map.push({ id: "66d16860fbe5f88a937b799e", value: titleAddress === '' ? '-' : titleAddress });
            map.push({ id: "66d16860fbe5f88a937b799f", value: titleName === '' ? '-' : titleName });
    
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
    
            widsignRes = await requestSystem(endPoint + "/v2/form/send", data, { headers: { "x-api-key": key, "x-access-token": token, "Content-Type": "application/json" } });
    
            await bill.createBill("stylingForm", [ {
              name: widsignRes.data.result[0].doc_name,
              id: widsignRes.data.result[0].receiver_meta_id,
              time: new Date(),
              requestNumber: requestNumber,
              cliid: client.cliid,
              proid: project.proid
            } ], { selfMongo: instance.mongolocal });
    
            await kakao.sendTalk("stylingForm", client.name, client.phone, { client: client.name });
            messageSend({ text: client.name + " 계약서를 작성하고 알림톡을 전송했어요!", channel: "#400_customer", voice: true }).catch((err) => {
              console.log(err);
            });
    
          }
    
          res.send(JSON.stringify({ message: "OK" }));
        } else {
          await messageSend({ text: "프로젝트 " + proid + "의 스타일링 계약서는 이미 만들어졌기에, 중복해서 만들지 않았습니다!", channel: "#400_customer", voice: true });
          res.send(JSON.stringify({ message: "ERROR" }));
        }
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ message: "ERROR" }));
      }
    });
    
    router.post([ "/removeStylingContract" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        if (req.body.proid === undefined) {
          throw new Error("invaild post");
        }
        const { proid } = req.body;
        const rows = await back.mongoRead("stylingForm", { proid }, { selfMongo: instance.mongolocal });
        for (let i = 0; i < rows.length; i++) {
          await back.mongoDelete("stylingForm", { proid }, { selfMongo: instance.mongolocal });
        }
        res.send(JSON.stringify({ message: "OK" }));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/removeConstructContract" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        if (req.body.proid === undefined) {
          throw new Error("invaild post");
        }
        const { proid } = req.body;
        const rows = await back.mongoRead("stylingForm", { proid }, { selfMongo: instance.mongolocal });
        for (let i = 0; i < rows.length; i++) {
          await back.mongoDelete("constructForm", { proid }, { selfMongo: instance.mongolocal });
        }
        res.send(JSON.stringify({ message: "OK" }));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/createConstructContract" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        if (req.body.proid === undefined || req.body.summary === undefined) {
          throw new Error("invaild post");
        }
        const { proid, summary } = req.body;
        const { contractName, contractAddress, contractPhone } = summary;
        const rows = await back.mongoRead("constructForm", { proid }, { selfMongo: instance.mongolocal });
    
        if (rows.length === 0) {
          const selfMongo = instance.mongo;
          const { officeinfo: { widsign: { id, key, endPoint } } } = address;
          const title = "2023시공계약서_000고객님_주홈리에종_YYMMDD";
          const project = await back.getProjectById(proid, { selfMongo: instance.mongo });
          const client = await back.getClientById(project.cliid, { selfMongo: instance.mongo });
          const designer = await back.getDesignerById(project.desid, { selfMongo: instance.mongo });
          const today = new Date();
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
    
            projectNormal = project.toNormal();
    
            if (projectNormal.process.design.construct.contract.partner !== "") {
    
              if (/_/gi.test(projectNormal.process.design.construct.contract.partner)) {
                tempArr = projectNormal.process.design.construct.contract.partner.split('_');
                searchPoint0 = tempArr[0].trim();
                searchPoint1 = tempArr[1].trim();
              } else {
                searchPoint0 = projectNormal.process.design.construct.contract.partner.trim();
                searchPoint1 = '';
              }
    
              builders = await back.getBuildersByQuery({
                $and: [
                  { "builder": searchPoint0 },
                  { "information.business.company": searchPoint1 }
                ]
              }, { selfMongo: instance.mongo });
    
              if (builders.length !== 0) {
                const [ builder ] = builders;
    
                await bill.constructInjection(thisBill.bilid, builder.buiid, {
                  first: summary.first.amount,
                  start: summary.start.amount,
                  middle: summary.middle.amount,
                  remain: summary.remain.amount,
                }, { selfMongo: instance.mongolocal, selfCoreMongo: instance.mongo });
                await messageLog(thisBill.bilid + " construct request, response set complete");
    
                proposalDate = project.proposal.date.valueOf();
                requestNumber = 0;
                for (let i = 0; i < client.requests.length; i++) {
                  if (client.requests[i].request.timeline.valueOf() <= proposalDate) {
                    requestNumber = i;
                    break;
                  }
                }
    
                ({ request, analytics } = client.toNormal().requests[requestNumber]);
    
                widsignRes = await requestSystem(endPoint + "/v2/token", {}, { method: "get", headers: { "x-api-id": id, "x-api-key": key } });
    
                if (widsignRes.data.result_code !== 200) {
                  throw new Error("access token error");
                } else {
                  token = widsignRes.data.access_token;
                  num = 1;
                  safeNum = 0;
                  do {
                    widsignRes = await requestSystem(endPoint + "/v2/form", { page: num, page_size: 30, title }, { method: "get", headers: { "x-api-key": key, "x-access-token": token } });
                    target = widsignRes.data.result.filter((obj) => { return obj.title === title });
                    num++;
                    safeNum++;
                    if (safeNum > 1000) {
                      throw new Error("title name error");
                    }
                  } while (target.length === 0);
    
                  [ { id: targetFormId } ] = target;
    
                  titleName = client.name;
                  if (contractName.trim() !== "") {
                    titleName = contractName;
                  }
    
                  titleAddress = request.space.address;
                  if (contractAddress.trim() !== "") {
                    titleAddress = contractAddress;
                  }
    
                  tempArr = dateToString(today).split('-');
                  formTitle = "2023시공계약서_" + titleName + "고객님_주홈리에종_";
                  formTitle = formTitle + tempArr[0].slice(2) + tempArr[1] + tempArr[2];
                  map = [
                    { id: "651e7414fbcd2144a51009c2", value: titleName === '' ? '-' : titleName },
                    { id: "651e7414fbcd2144a51009c3", value: summary.name === '' ? '-' : summary.name },
                    { id: "651e7414fbcd2144a51009c4", value: summary.address === '' ? '-' : summary.address },
                    { id: "651e7414fbcd2144a51009c5", value: summary.date.start === '' ? '-' : summary.date.start.split('-')[0] },
                    { id: "651e7414fbcd2144a51009c7", value: summary.date.start === '' ? '-' : summary.date.start.split('-')[1] },
                    { id: "651e7414fbcd2144a51009c9", value: summary.date.start === '' ? '-' : summary.date.start.split('-')[2] },
                    { id: "651e7414fbcd2144a51009c6", value: summary.date.end === '' ? '-' : summary.date.end.split('-')[0] },
                    { id: "651e7414fbcd2144a51009c8", value: summary.date.end === '' ? '-' : summary.date.end.split('-')[1] },
                    { id: "651e7414fbcd2144a51009ca", value: summary.date.end === '' ? '-' : summary.date.end.split('-')[2] },
                    { id: "651e7414fbcd2144a51009cb", value: summary.hangul === '' ? '-' : summary.hangul.replace(/원$/, '') },
                    { id: "651e7414fbcd2144a51009cc", value: autoComma(summary.total) === '' ? '-' : autoComma(summary.total) },
                    { id: "651e7414fbcd2144a51009cd", value: String(summary.first.percentage) + '%' },
                    { id: "651e7414fbcd2144a51009d1", value: autoComma(summary.first.amount) === '' ? '-' : autoComma(summary.first.amount) },
                    { id: "651e7414fbcd2144a51009d5", value: summary.first.date === '' ? '-' : summary.first.date },
                    { id: "651e7414fbcd2144a51009d9", value: summary.first.etc === '' ? '-' : summary.first.etc },
                    { id: "651e7414fbcd2144a51009ce", value: String(summary.start.percentage) + '%' },
                    { id: "651e7414fbcd2144a51009d2", value: autoComma(summary.start.amount) === '' ? '-' : autoComma(summary.start.amount) },
                    { id: "651e7414fbcd2144a51009d6", value: summary.start.date === '' ? '-' : summary.start.date },
                    { id: "651e7414fbcd2144a51009da", value: summary.start.etc === '' ? '-' : summary.start.etc },
                    { id: "651e7414fbcd2144a51009cf", value: String(summary.middle.percentage) + '%' },
                    { id: "651e7414fbcd2144a51009d3", value: autoComma(summary.middle.amount) === '' ? '-' : autoComma(summary.middle.amount) },
                    { id: "651e7414fbcd2144a51009d7", value: summary.middle.date === '' ? '-' : summary.middle.date },
                    { id: "651e7414fbcd2144a51009db", value: summary.middle.etc === '' ? '-' : summary.middle.etc },
                    { id: "651e7414fbcd2144a51009d0", value: String(summary.remain.percentage) + '%' },
                    { id: "651e7414fbcd2144a51009d4", value: autoComma(summary.remain.amount) === '' ? '-' : autoComma(summary.remain.amount) },
                    { id: "651e7414fbcd2144a51009d8", value: summary.remain.date === '' ? '-' : summary.remain.date },
                    { id: "651e7414fbcd2144a51009dc", value: summary.remain.etc === '' ? '-' : summary.remain.etc },
                    { id: "651e7414fbcd2144a51009e0", value: titleName === '' ? '-' : titleName },
                    { id: "651e7414fbcd2144a51009de", value: contractPhone === '' ? '-' : contractPhone },
                    { id: "651e7414fbcd2144a51009df", value: contractAddress === '' ? '-' : contractAddress },
                  ];
    
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
                  widsignRes = await requestSystem(endPoint + "/v2/form/send", data, { headers: { "x-api-key": key, "x-access-token": token, "Content-Type": "application/json" } });
    
                  await bill.createBill("constructForm", [ {
                    name: widsignRes.data.result[0].doc_name,
                    id: widsignRes.data.result[0].receiver_meta_id,
                    time: new Date(),
                    requestNumber: requestNumber,
                    cliid: client.cliid,
                    proid: project.proid
                  } ], { selfMongo: instance.mongolocal });
    
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
    
    
                  res.send(JSON.stringify({ message: "OK" }));
                }
    
              } else {
                await messageSend({ text: "프로젝트 " + proid + "에서 지정된 파트서 시공사가 등록된 파트너가 아니에요. 계약서를 쓸 수가 없어요.", channel: "#400_customer", voice: true });
                res.send(JSON.stringify({ message: "ERROR" }));
              }
            } else {
              await messageSend({ text: "프로젝트 " + proid + "는 파트서 시공사가 지정되지 않았어요. 계약서를 쓸 수가 없어요.", channel: "#400_customer", voice: true });
              res.send(JSON.stringify({ message: "ERROR" }));
            }
          } else {
            await messageSend({ text: "프로젝트 " + proid + "의 영수증을 찾을 수 없어요. 계약서를 쓸 수가 없어요.", channel: "#400_customer", voice: true });
            res.send(JSON.stringify({ message: "ERROR" }));
          }
        } else {
          console.log("styling form cancel : " + proid);
          await messageSend({ text: "프로젝트 " + proid + "의 시공 계약서는 이미 만들어졌기에, 중복해서 만들지 않았습니다!", channel: "#400_customer", voice: true });
          res.send(JSON.stringify({ message: "ERROR" }));
        }
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ message: "ERROR" }));
      }
    });
    
    router.post([ "/createPartnershipContract" ], async function (req, res) {
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
        const { aspid } = req.body;
        const rows = await back.mongoRead("partnershipForm", { aspid }, { selfMongo: instance.mongolocal });
        if (rows.length === 0) {
          const selfMongo = instance.mongo;
          const { officeinfo: { widsign: { id, key, endPoint } } } = address;
          const title = "2023디자이너파트너십계약서_000디자이너_YYMMDD";
          const aspirant = await back.getAspirantById(aspid, { selfMongo });
          const today = new Date();
          const nextYear = new Date();
          nextYear.setFullYear(nextYear.getFullYear() + 1);
          nextYear.setDate(nextYear.getDate() - 1);
          let url, requestNumber, proposalDate;
          let widsignRes, token, target, targetFormId, safeNum;
          let titleName, titleAddress, formTitle;
          let tempArr;
          let map;
          let data;
          let todayYear, todayMonth ,todayDate;
    
          todayYear = String(today.getFullYear());
          todayMonth = String(today.getMonth() + 1);
          todayDate = String(today.getDate());
    
          widsignRes = await requestSystem(endPoint + "/v2/token", {}, { method: "get", headers: { "x-api-id": id, "x-api-key": key } });
    
          if (widsignRes.data.result_code !== 200) {
            throw new Error("access token error");
          } else {
            token = widsignRes.data.access_token;
            num = 1;
            safeNum = 0;
            do {
              widsignRes = await requestSystem(endPoint + "/v2/form", { page: num, page_size: 30, title }, { method: "get", headers: { "x-api-key": key, "x-access-token": token } });
              target = widsignRes.data.result.filter((obj) => { return obj.title === title });
              num++;
              safeNum++;
              if (safeNum > 1000) {
                throw new Error("title name error");
              }
            } while (target.length === 0);
    
            [ { id: targetFormId } ] = target;
    
            titleName = aspirant.designer;
            titleAddress = aspirant.address;
    
            tempArr = dateToString(today).split('-');
            formTitle = "2023디자이너파트너십계약서_" + titleName + "디자이너_";
            formTitle = formTitle + tempArr[0].slice(2) + tempArr[1] + tempArr[2];
    
            map = [
              { id: "6441eeed39f14f6a53000001", value: aspirant.designer },
              { id: "6441ef0e39f14f6a53000002", value: dateToString(today) + " ~ " + dateToString(nextYear) },
              { id: "6441ef2c39f14f6a53000003", value: aspirant.designer },
              { id: "6441ef4239f14f6a53000005", value: /프리/gi.test(aspirant.information.company.classification) ? "-" : aspirant.information.company.businessNumber },
              { id: "6441ef4b39f14f6a53000006", value: dateToString(aspirant.birth) },
              { id: "6441ef3f39f14f6a53000004", value: dateToString(today) },
              { id: "6441f02f39f14f6a53000009", value: titleAddress },
              { id: "6441f03e39f14f6a5300000a", value: /프리/gi.test(aspirant.information.company.classification) ? aspirant.designer : aspirant.information.company.name },
              { id: "6441f04b39f14f6a5300000b", value: /프리/gi.test(aspirant.information.company.classification) ? aspirant.designer : aspirant.information.company.representative },
            ];
            
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
    
            widsignRes = await requestSystem(endPoint + "/v2/form/send", data, { headers: { "x-api-key": key, "x-access-token": token, "Content-Type": "application/json" } });
    
            await bill.createBill("partnershipForm", [ {
              name: widsignRes.data.result[0].doc_name,
              id: widsignRes.data.result[0].receiver_meta_id,
              time: new Date(),
              aspid: aspid,
            } ], { selfMongo: instance.mongolocal });
    
            messageSend({ text: aspirant.designer + " 파트너십 계약서를 작성하고 알림톡을 전송했어요!", channel: "#301_apply", voice: true }).catch((err) => {
              console.log(err);
            });
    
          }
    
          res.send(JSON.stringify({ message: "OK" }));
        } else {
          await messageSend({ text: "신청자 " + aspid + "의 파트너십 계약서는 이미 만들어졌기에, 중복해서 만들지 않았습니다!", channel: "#301_apply", voice: true });
          res.send(JSON.stringify({ message: "ERROR" }));
        }
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ message: "ERROR" }));
      }
    });
    
    router.post([ "/createDesignerContract" ], async function (req, res) {
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
        const { aspid } = req.body;
        const rows = await back.mongoRead("designerForm", { aspid }, { selfMongo: instance.mongolocal });
        if (rows.length === 0) {
          const selfMongo = instance.mongo;
          const { officeinfo: { widsign: { id, key, endPoint } } } = address;
          const title = "2023디자인서비스제휴계약서_000디자이너_YYMMDD";
          const aspirant = await back.getAspirantById(aspid, { selfMongo });
          const today = new Date();
          const nextYear = new Date();
          nextYear.setFullYear(nextYear.getFullYear() + 1);
          nextYear.setDate(nextYear.getDate() - 1);
          let url, requestNumber, proposalDate;
          let widsignRes, token, target, targetFormId, safeNum;
          let titleName, titleAddress, formTitle;
          let tempArr;
          let map;
          let data;
          let todayYear, todayMonth ,todayDate;
          let percentage;
    
          todayYear = String(today.getFullYear());
          todayMonth = String(today.getMonth() + 1);
          todayDate = String(today.getDate());
    
          percentage = 30;
    
          widsignRes = await requestSystem(endPoint + "/v2/token", {}, { method: "get", headers: { "x-api-id": id, "x-api-key": key } });
    
          if (widsignRes.data.result_code !== 200) {
            throw new Error("access token error");
          } else {
            token = widsignRes.data.access_token;
            num = 1;
            safeNum = 0;
            do {
              widsignRes = await requestSystem(endPoint + "/v2/form", { page: num, page_size: 30, title }, { method: "get", headers: { "x-api-key": key, "x-access-token": token } });
              target = widsignRes.data.result.filter((obj) => { return obj.title === title });
              num++;
              safeNum++;
              if (safeNum > 1000) {
                throw new Error("title name error");
              }
            } while (target.length === 0);
    
            [ { id: targetFormId } ] = target;
    
            titleName = aspirant.designer;
            titleAddress = aspirant.address;
    
            tempArr = dateToString(today).split('-');
            formTitle = "2023디자인서비스제휴계약서_" + titleName + "디자이너_";
            formTitle = formTitle + tempArr[0].slice(2) + tempArr[1] + tempArr[2];
    
            map = [
              { id: "6440dafad4a1496b82000005", value: aspirant.designer },
              { id: "6440db17d4a1496b82000006", value: todayYear },
              { id: "6440db23d4a1496b82000007", value: todayMonth },
              { id: "6440db3dd4a1496b82000009", value: todayDate },
              { id: "6440db8fd4a1496b8200000a", value: String(percentage) },
              { id: "6440dbc3d4a1496b8200000b", value: aspirant.information.account.to },
              { id: "6440dbe4d4a1496b8200000d", value: aspirant.information.account.bank },
              { id: "6440dc17d4a1496b8200000e", value: aspirant.information.account.number },
              { id: "6440dddad4a1496b82000011", value: titleAddress },
              { id: "6440ddebd4a1496b82000012", value: /프리/gi.test(aspirant.information.company.classification) ? aspirant.designer : aspirant.information.company.name },
              { id: "6440ddfbd4a1496b82000013", value: /프리/gi.test(aspirant.information.company.classification) ? aspirant.designer : aspirant.information.company.representative },
            ];
    
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
    
            widsignRes = await requestSystem(endPoint + "/v2/form/send", data, { headers: { "x-api-key": key, "x-access-token": token, "Content-Type": "application/json" } });
    
            await bill.createBill("designerForm", [ {
              name: widsignRes.data.result[0].doc_name,
              id: widsignRes.data.result[0].receiver_meta_id,
              time: new Date(),
              aspid: aspid,
            } ], { selfMongo: instance.mongolocal });
    
            messageSend({ text: aspirant.designer + " 서비스 제휴 계약서를 작성하고 알림톡을 전송했어요!", channel: "#301_apply", voice: true }).catch((err) => {
              console.log(err);
            });
    
          }
    
          res.send(JSON.stringify({ message: "OK" }));
        } else {
          await messageSend({ text: "신청자 " + aspid + "의 서비스 제휴 계약서는 이미 만들어졌기에, 중복해서 만들지 않았습니다!", channel: "#301_apply", voice: true });
          res.send(JSON.stringify({ message: "ERROR" }));
        }
      } catch (e) {
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
    
    router.post([ "/constructAmountSync" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        if (req.body.proid === undefined || req.body.cliid === undefined || req.body.desid === undefined || req.body.method === undefined) {
          throw new Error("invaild post");
        }
        const { proid, cliid, desid, method } = equalJson(req.body);
        const find0 = "시공 잔금";
        const findFirst = "시공 계약금";
        const findStart = "시공 착수금";
        const findMiddle = "시공 중도금";
        const findRemain = "시공 잔금";
        const find1 = "시공";
        let bills, bilid, tempIndex, targetIndex, targetBill;
        let itemIndex;
        let whereQuery, updateQuery;
    
        bills = await bill.getBillsByQuery({
          $and: [
            { "links.proid": proid },
            { "links.cliid": cliid },
            { "links.desid": desid },
            { "links.method": method },
          ]
        }, { selfMongo: instance.mongolocal });
        if (bills.length > 0) {
          bilid = null;
          targetBill = null;
          targetIndex = -1;
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
    
          if (bilid !== null) {
            if (req.body.amount !== undefined) {
              const { amount: { supply, vat, consumer } } = equalJson(req.body);
    
              if (targetIndex !== -1) {
                itemIndex = -1;
                for (let i = 0; i < targetBill.requests[targetIndex].items.length; i++) {
                  if ((new RegExp(find1, "gi")).test(targetBill.requests[targetIndex].items[i].name)) {
                    itemIndex = i;
                    break;
                  }
                }
                whereQuery = { bilid };
                updateQuery = {};
                updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".unit.price"] = supply;
                updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".amount.supply"] = supply;
                updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".amount.vat"] = vat;
                updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".amount.consumer"] = consumer;
                await bill.updateBill([ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });
              }
    
            } else {
              const { first, start, middle, remain } = equalJson(req.body);
    
              whereQuery = { bilid };
              updateQuery = {};
    
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
    
              await bill.updateBill([ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });
            }
    
          }
        }
    
        res.send(JSON.stringify({ message: "success" }));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/stylingAmountSync" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        if (req.body.proid === undefined) {
          throw new Error("invaild post");
        }
        const { proid } = equalJson(req.body);
        const find0 = "홈리에종 잔금";
        const find1 = "디자인비";
        const emptyDateValue = (new Date(2000, 0, 1)).valueOf();
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
    
    
        project = await back.getProjectById(proid, { selfMongo: instance.mongo });
        if (project === null) {
          throw new Error("invaild post");
        }
    
        bills = await bill.getBillsByQuery({
          $and: [
            { "links.proid": proid },
            { "links.cliid": project.cliid },
            { "links.desid": project.desid },
            { "links.method": (project.service.online ? "online" : "offline") },
          ]
        }, { selfMongo: instance.mongolocal });
        if (bills.length === 0) {
          throw new Error("cannot find bill");
        }
    
        bilid = null;
        targetBill = null;
        targetIndex = -1;
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
    
        consumer = Math.floor(project.process.contract.remain.calculation.amount.consumer - project.process.contract.first.calculation.amount);
        vat = Math.floor(consumer / 11);
        supply = Math.floor(consumer - vat);
    
        firstConsumer = Math.floor(project.process.contract.first.calculation.amount);
        firstVat = Math.floor(firstConsumer / 11);
        firstSupply = Math.floor(firstConsumer - firstVat);
    
    
        itemIndex = -1;
        for (let i = 0; i < targetBill.requests[targetIndex].items.length; i++) {
          if ((new RegExp(find1, "gi")).test(targetBill.requests[targetIndex].items[i].name)) {
            itemIndex = i;
            break;
          }
        }
    
        firstTargetIndex = -1;
        firstItemIndex = -1;
        for (let i = 0; i < targetBill.requests.length; i++) {
          if (/홈리에종 계약금/gi.test(targetBill.requests[i].name)) {
            firstTargetIndex = i;
            break;
          }
        }
    
        for (let i = 0; i < targetBill.requests[firstTargetIndex].items.length; i++) {
          if (/디자인비/gi.test(targetBill.requests[firstTargetIndex].items[i].name)) {
            firstItemIndex = i;
            break;
          }
        }
    
    
        whereQuery = { bilid };
        updateQuery = {};
    
        if (firstTargetIndex !== -1 && firstItemIndex !== -1) {
          updateQuery["requests." + String(firstTargetIndex) + ".items." + String(firstItemIndex) + ".unit.price"] = firstSupply;
          updateQuery["requests." + String(firstTargetIndex) + ".items." + String(firstItemIndex) + ".amount.supply"] = firstSupply;
          updateQuery["requests." + String(firstTargetIndex) + ".items." + String(firstItemIndex) + ".amount.vat"] = firstVat;
          updateQuery["requests." + String(firstTargetIndex) + ".items." + String(firstItemIndex) + ".amount.consumer"] = firstConsumer;
        }
    
        updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".unit.price"] = supply;
        updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".amount.supply"] = supply;
        updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".amount.vat"] = vat;
        updateQuery["requests." + String(targetIndex) + ".items." + String(itemIndex) + ".amount.consumer"] = consumer;
    
    
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
    
        updateQuery["responses." + String(firstIndex) + ".items.0.unit.price"] = Math.floor(project.process.calculation.payments.first.amount)
        updateQuery["responses." + String(firstIndex) + ".items.0.amount.pure"] = Math.floor(project.process.calculation.payments.first.amount)
        updateQuery["responses." + String(firstIndex) + ".items.0.amount.commission"] = Math.floor((project.process.contract.remain.calculation.amount.supply - project.process.calculation.payments.totalAmount) / 2)
    
        updateQuery["responses." + String(remainIndex) + ".items.0.unit.price"] = Math.floor(project.process.calculation.payments.remain.amount)
        updateQuery["responses." + String(remainIndex) + ".items.0.amount.pure"] = Math.floor(project.process.calculation.payments.remain.amount)
        updateQuery["responses." + String(remainIndex) + ".items.0.amount.commission"] = Math.floor((project.process.contract.remain.calculation.amount.supply - project.process.calculation.payments.totalAmount) / 2)
    
    
        if (project.process.calculation.payments.first.date.valueOf() > emptyDateValue) {
          updateQuery["responses." + String(firstIndex) + ".pay"] = [
            {
              date: project.process.calculation.payments.first.date,
              amount: Math.floor(project.process.calculation.payments.first.amount),
              oid: ""
            }
          ]
          updateQuery["responses." + String(firstIndex) + ".proofs"] = [
            {
              date: project.process.calculation.payments.first.date,
              method: "계좌 이체",
              proof: project.process.calculation.info.proof,
              to: project.process.calculation.info.to,
            }
          ]
        }
    
        if (project.process.calculation.payments.first.cancel.valueOf() > emptyDateValue) {
          updateQuery["responses." + String(firstIndex) + ".cancel"] = [
            {
              date: project.process.calculation.payments.first.cancel,
              amount: Math.floor(project.process.calculation.payments.first.refund),
              oid: ""
            }
          ]
        }
    
        if (project.process.calculation.payments.remain.date.valueOf() > emptyDateValue) {
          updateQuery["responses." + String(remainIndex) + ".pay"] = [
            {
              date: project.process.calculation.payments.remain.date,
              amount: Math.floor(project.process.calculation.payments.remain.amount),
              oid: ""
            }
          ]
          updateQuery["responses." + String(remainIndex) + ".proofs"] = [
            {
              date: project.process.calculation.payments.remain.date,
              method: "계좌 이체",
              proof: project.process.calculation.info.proof,
              to: project.process.calculation.info.to,
            }
          ]
        }
    
        if (project.process.calculation.payments.remain.cancel.valueOf() > emptyDateValue) {
          updateQuery["responses." + String(remainIndex) + ".cancel"] = [
            {
              date: project.process.calculation.payments.remain.cancel,
              amount: Math.floor(project.process.calculation.payments.remain.refund),
              oid: ""
            }
          ]
        }
        await bill.updateBill([ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });
        res.send(JSON.stringify({ message: "success" }));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/smsParsing" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      const collection = "accountTransfer";
      const designerCollection = "designerTransfer";
      const standardDay = 7;
      try {
        if (req.body.date === undefined || req.body.amount === undefined || req.body.name === undefined) {
          throw new Error("invaild post");
        }
        const selfMongo = instance.mongolocal;
        const { date, amount, name } = equalJson(req.body);
        const errorMessage = "뭔가 은행 문자가 왔는데 찾을 수 없음 : " + name + " " + autoComma(amount) + "원";
        const ignoreMessage = "무시하는 리스트에 포함된 은행 문자 왔음 : " + name + " " + autoComma(amount) + "원";
        const ignoreList = [
          "KG이니시스",
        ];
        let rows, ago, target, rows2;
        let target2;
        let whereQuery;
        let updateQuery;
        let thisProject;
        let thisClient;
    
        if (!ignoreList.includes(name.trim())) {
          ago = new Date();
          ago.setDate(ago.getDate() - (standardDay * 2));
    
          target = null;
          rows = await back.mongoRead(collection, { amount }, { selfMongo });
          if (rows.length > 0) {
            rows.sort((a, b) => { return b.date.valueOf() - a.date.valueOf(); });
            rows = rows.filter((obj) => {
              return obj.date.valueOf() >= ago.valueOf();
            }).filter((obj) => {
              return (new RegExp(obj.name, "gi")).test(name);
            });
            if (rows.length > 0) {
              if (rows.length === 1) {
                [ target ] = rows;
              } else {
                rows2 = rows.filter((obj) => {
                  return obj.name.trim() === name.trim();
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
    
            await sleep(500);
    
            const { phone, amount, requestNumber } = target;
    
            target.accountInfo.requestNumber = requestNumber;
            messageSend(`${name} 고객님이 ${autoComma(amount)}원을 계좌에 입금하여 주셨어요.`, "#700_operation", (target === null)).catch((err) => { throw new Error(err.message); });
    
            await requestSystem("https://" + instance.address.officeinfo.host + ":3002/webHookVAccount", target.accountInfo, {
              headers: { "Content-Type": "application/json" }
            });
            logger.log("현금 영수증 관련 핸드폰 번호 감지 => " + phone).catch((e) => { console.log(e); });
            if (/^010/.test(phone)) {
              requestSystem("https://" + instance.address.officeinfo.ghost.host + ":" + String(3000) + "/issueCashReceipt", { amount: Number(amount), phone }, { headers: { "Content-Type": "application/json" } }).then(() => {
                return messageSend(`${name} 고객님의 현금 영수증을 발행하였습니다!\n번호 : ${phone}\n가격 : ${autoComma(amount)}원`, "#700_operation", false);
              }).catch((err) => {
                logger.error(err, req).catch((e) => { console.log(e); });
                throw new Error(err.message);
              });
            }
    
          } else {
    
            target2 = null;
            rows = await back.mongoRead(designerCollection, { amount }, { selfMongo });
            if (rows.length > 0) {
              rows.sort((a, b) => { return b.date.valueOf() - a.date.valueOf(); });
              rows = rows.filter((obj) => {
                return obj.date.valueOf() >= ago.valueOf();
              }).filter((obj) => {
                return (new RegExp(obj.name, "gi")).test(name);
              }).filter((obj) => {
                return obj.complete === 0;
              });
              if (rows.length > 0) {
                if (rows.length === 1) {
                  [ target2 ] = rows;
                } else {
                  rows2 = rows.filter((obj) => {
                    return obj.name.trim() === name.trim();
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
    
              if (/촬영/gi.test(target2.goodname)) {
    
                thisProject = await back.getProjectById(target2.proid, { selfMongo: instance.mongo });
                thisClient = await back.getClientById(target2.cliid, { selfMongo: instance.mongo });
    
                messageSend(`${target2.name} 실장님이 계좌 이체로 ${thisClient.name} 고객님 현장의 ${target2.goodname}를 결제하셨습니다.`, "#301_console", true).catch((err) => { throw new Error(err.message); });
                messageSend(`${target2.name} 실장님이 계좌 이체로 ${thisClient.name} 고객님 현장의 ${target2.goodname}를 결제하셨습니다.`, "#700_operation", true).catch((err) => { throw new Error(err.message); });
                
                whereQuery = { proid: target2.proid };
                updateQuery = {};
                updateQuery["contents.payment.status"] = "결제 완료";
                updateQuery["contents.payment.date"] = new Date();
                updateQuery["contents.payment.calculation.amount"] = amount;
                updateQuery["contents.payment.calculation.info.method"] = "계좌 이체";
                if (/프리/gi.test(thisProject.process.calculation.method) || /간이/gi.test(thisProject.process.calculation.method)) {
                  updateQuery["contents.payment.calculation.info.proof"] = "현금영수증";
                } else {
                  updateQuery["contents.payment.calculation.info.proof"] = "세금계산서";
                }
                updateQuery["contents.payment.calculation.info.to"] = target2.name;
                await back.updateProject([ whereQuery, updateQuery ], { selfMongo: instance.mongo });
    
                whereQuery = { proid: target2.proid, goodname: target2.goodname };
                updateQuery = {};
                updateQuery["complete"] = 1;
                await selfMongo.db("miro81").collection(designerCollection).updateMany(whereQuery, { $set: updateQuery });
    
              } else {
                messageSend(`${name} 고객님이 ${autoComma(amount)}원을 계좌에 입금하여 주셨어요.`, "#700_operation", (target === null)).catch((err) => { throw new Error(err.message); });
                logger.alert(errorMessage).catch((e) => { console.log(e); });
              }
    
            } else {
              messageSend(`${name} 고객님이 ${autoComma(amount)}원을 계좌에 입금하여 주셨어요.`, "#700_operation", (target === null)).catch((err) => { throw new Error(err.message); });
              logger.alert(errorMessage).catch((e) => { console.log(e); });
            }
    
          }
        } else {
          logger.log(ignoreMessage).catch((e) => { console.log(e); });
        }
    
        res.send(JSON.stringify({ message: "will do" }));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });

    // 수동 입금 처리
    router.post([ "/passivePayment" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        if (req.body.amount === undefined || req.body.bilid === undefined || req.body.index === undefined) {
          throw new Error("invaild post");
        }
        const selfMongo = instance.mongo;
        const amount = Number(req.body.amount);
        const bilid = req.body.bilid;
        const requestNumber = Number(req.body.index);
        let bills;
        let thisBill;
        let client;
        let itemArr;
        let payArr;
        let cancelArr;
        let payObject;
        let updateQuery;
        let proofs;
        let message;
        let whereQuery;
        
        bills = await bill.getBillsByQuery({ "bilid": bilid }, { selfMongo });
        thisBill = bills[0];

        client = await back.getClientById(thisBill.links.cliid, { selfMongo });
        client = client.toNormal();

        itemArr = equalJson(JSON.stringify(thisBill.requests[Number(requestNumber)].items));
        payArr = equalJson(JSON.stringify(thisBill.requests[Number(requestNumber)].pay));
        cancelArr = equalJson(JSON.stringify(thisBill.requests[Number(requestNumber)].cancel));
        payObject = bill.returnBillDummies("pay");
        payObject.oid = "real_" + uniqueValue("hex");
        payObject.amount = amount;
        payArr.unshift(payObject);

        whereQuery = { bilid: thisBill.bilid };

        updateQuery = {};
        updateQuery["requests." + String(requestNumber) + ".status"] = "결제 완료";
        updateQuery["requests." + String(requestNumber) + ".pay"] = payArr;

        proofs = bill.returnBillDummies("proofs");
        proofs.method = "계좌 이체";
        proofs.proof = "이니시스";
        proofs.to = client.name;

        thisBill.requests[requestNumber].proofs.unshift(proofs);
        updateQuery["requests." + String(requestNumber) + ".proofs"] = thisBill.requests[requestNumber].proofs;

        message = client.name + " 고객님이 " + proofs.method + "로 " + thisBill.requests[requestNumber].name.trim() + "을 결제하셨습니다!";
        messageSend({ text: message, channel: "#700_operation", voice: true }).catch((err) => {
          console.log(err);
        });
        await bill.updateBill([ whereQuery, updateQuery ], { selfMongo });

        res.send(JSON.stringify({ message: "will do" }));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/accountTimeSet" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      const collection = "accountTransfer";
      try {
        if (req.body.amount === undefined || req.body.name === undefined) {
          throw new Error("invaild post");
        }
        const selfMongo = instance.mongolocal;
        const { amount, name } = equalJson(req.body);
        let rows, result;
    
        messageSend(`${name} 고객님이 계좌에 입금을 위한 안내를 받으셨어요. 아직 입금한 건 아니에요.`, "#700_operation", true).catch((err) => { throw new Error(err.message); });
        await back.mongoCreate(collection, equalJson(req.body), { selfMongo });
    
        res.send(JSON.stringify({ message: "will do" }));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/designerTransfer" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      const collection = "designerTransfer";
      try {
        if (req.body.designer === undefined || req.body.desid === undefined || req.body.body === undefined) {
          throw new Error("invaild post");
        }
        const selfMongo = instance.mongolocal;
        const { designer, desid, body } = equalJson(req.body);
        const thisDesigner = await back.getDesignerById(desid, { selfMongo: instance.mongo });
    
        messageSend(`${designer} 실장님이 ${body.goodname} 결제를 위해 계좌에 입금을 위한 안내를 받으셨어요. 아직 입금한 건 아니에요.`, "#700_operation", true).catch((err) => { throw new Error(err.message); });
    
        kakao.sendTalk("designerAccount", designer, thisDesigner.information.phone, {
          designer,
          goodName: body.goodname,
          bankName: "기업",
          account: "049-085567-04-022",
          to: designer,
          amount: autoComma(body.amount),
        }).catch((err) => {
          console.log(err);
        });
    
        await back.mongoCreate(collection, body, { selfMongo });
    
        res.send(JSON.stringify({ message: "will do" }));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/accountTimeUpdate" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      const collection = "accountTransfer";
      try {
        const selfMongo = instance.mongolocal;
        const { whereQuery, updateQuery, name, phone } = equalJson(req.body);
    
        logger.log(`증빙 번호 업데이트 감지 => \n${JSON.stringify(whereQuery, null, 2)}\n${JSON.stringify(updateQuery, null, 2)}`).catch((err) => { throw new Error(err.message); });
    
        if (/^010/.test(phone)) {
          // pass
        } else {
          await messageSend({ text: `${name} 고객님이 ${phone} 번호로 세금 계산서 신청을 하셨습니다!`, channel: "#700_operation", voice: true });
        }
        await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo });
    
        res.send(JSON.stringify({ message: "will do" }));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/createStylingBill" ], async function (req, res) {
      try {
        if (req.body.proid === undefined) {
          throw new Error("invaild post, must be { proid }");
        }
        const { proid } = req.body;
        let option, bilidArr;
        option = { selfCoreMongo: instance.mongo, selfMongo: instance.mongolocal };
        if (req.body.desid !== undefined) {
          option.forceDesid = req.body.desid;
        }
        bilidArr = await bill.createStylingBill(proid, option);
        res.set({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
        });
        res.send(JSON.stringify(bilidArr));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/generalBill" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        if (req.body.mode === undefined) {
          throw new Error("must be mode => [ create, read, update, delete ]");
        }
        const collection = "generalBill";
        const { mode } = req.body;
        let selfMongo, result;
        let whereQuery, updateQuery;
        let option;
    
        selfMongo = instance.mongolocal;
    
        if (mode === "read") {
          if (req.body.whereQuery === undefined) {
            throw new Error("must be whereQuery");
          }
          whereQuery = equalJson(req.body.whereQuery);
          option = { selfMongo };
          if (req.body.limit !== undefined && !Number.isNaN(Number(req.body.limit))) {
            option.limit = Number(req.body.limit);
          }
          result = await bill.getBillsByQuery(whereQuery, option);
    
        } else if (mode === "update") {
    
          if (req.body.whereQuery === undefined || req.body.updateQuery === undefined) {
            throw new Error("must be whereQuery, updateQuery");
          }
          ({ whereQuery, updateQuery } = equalJson(req.body));
          await bill.updateBill([ whereQuery, updateQuery ], { selfMongo });
          result = { message: "success" };
    
        } else {
          throw new Error("must be mode => [ read, update ]");
        }
    
        res.send(JSON.stringify(result));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/ghostClientBill" ], async function (req, res) {
      try {
        if (req.body.bilid === undefined || req.body.requestNumber === undefined || req.body.data === undefined) {
          throw new Error("invaild post");
        }
        const selfMongo = instance.mongolocal;
        const { bilid, requestNumber, data } = equalJson(req.body);
        if (typeof data !== "object") {
          throw new Error("invaild post : data must be object");
        }
        if (typeof data.MOID !== "string") {
          throw new Error("invaild post");
        }
        if (Number.isNaN(Number(requestNumber))) {
          throw new Error("invaild request number");
        }
        const oid = data.MOID;
        const inisis = "이니시스";
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
    
        if (data.__ignorethis__ !== 1) {
    
          thisBill = await bill.getBillById(bilid, { selfMongo });
          if (thisBill === null) {
            throw new Error("there is no bill");
          }
          if (thisBill.links.cliid === undefined || thisBill.links.desid === undefined || thisBill.links.proid === undefined) {
            throw new Error("invaild bill");
          }
          thisBill = thisBill.toNormal();
          cliid = thisBill.links.cliid;
          desid = thisBill.links.desid;
          proid = thisBill.links.proid;
          client = await back.getClientById(cliid, { selfMongo: instance.mongo });
          designer = await back.getDesignerById(desid, { selfMongo: instance.mongo });
          project = await back.getProjectById(proid, { selfMongo: instance.mongo });
          proposal = project.selectProposal(desid);
    
          if (client === null || designer === null || project === null) {
            throw new Error("invaild id");
          }
    
          if (Array.isArray(thisBill.links.oid)) {
            oidArr = equalJson(JSON.stringify(thisBill.links.oid));
            boo = false;
            for (let o of oidArr) {
              if (o === oid) {
                boo = true;
              }
            }
            if (!boo) {
              oidArr.unshift(oid);
            }
          } else {
            oidArr = [ oid ];
          }
    
          infoArr = equalJson(JSON.stringify(thisBill.requests[Number(requestNumber)].info));
          infoArr.unshift({ data });
          infoArr.unshift({ oid });
    
          whereQuery = { bilid };
          updateQuery = {};
          updateQuery["links.oid"] = oidArr;
          updateQuery["requests." + String(requestNumber) + ".info"] = infoArr;
    
          amount = Number(data.TotPrice.replace(/[^0-9]/gi, ''));
    
          if (data.CARD_BankCode !== undefined) {
    
            itemArr = equalJson(JSON.stringify(thisBill.requests[Number(requestNumber)].items));
            payArr = equalJson(JSON.stringify(thisBill.requests[Number(requestNumber)].pay));
            cancelArr = equalJson(JSON.stringify(thisBill.requests[Number(requestNumber)].cancel));
            payObject = bill.returnBillDummies("pay");
            payObject.amount = amount;
            payObject.oid = oid;
            payArr.unshift(payObject);
    
            updateQuery["requests." + String(requestNumber) + ".status"] = "결제 완료";
    
            updateQuery["requests." + String(requestNumber) + ".pay"] = payArr;
    
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
            proofs.proof = inisis;
            proofs.to = data.buyerName;
            thisBill.requests[Number(requestNumber)].proofs.unshift(proofs);
            updateQuery["requests." + String(requestNumber) + ".proofs"] = thisBill.requests[Number(requestNumber)].proofs;
    
            message = client.name + " 고객님 (" + designer.designer + " 실장님" + ") 이 " + proofs.method + "로 " + data.goodName.trim() + "을 결제하셨습니다!";
            messageSend({ text: message, channel: "#700_operation", voice: true }).catch((err) => {
              console.log(err);
            })
            await bill.updateBill([ whereQuery, updateQuery ], { selfMongo });
            await instance.sync_paymentProject(bilid, requestNumber, data, amount, proofs, inisis, { thisBill, client, designer, project, proposal });
    
          } else {
    
            if (data.REAL_Account === undefined) {
    
              instance.kakao.sendTalk("virtualAccount", client.name, client.phone, {
                client: client.name,
                goodName: data.goodName,
                bankName: data.vactBankName,
                account: data.VACT_Num,
                to: data.VACT_Name,
                amount: autoComma(amount),
                date: data.VACT_Date.slice(0, 4) + "년 " + data.VACT_Date.slice(4, -2) + "월 " + data.VACT_Date.slice(-2) + "일",
              }).catch((err) => {
                console.log(err);
              });
              message = client.name + " 고객님이 " + data.goodName.trim() + " 결제를 위한 가상 계좌를 발급하셨습니다!";
              messageSend({ text: message, channel: "#700_operation", voice: true }).catch((err) => {
                console.log(err);
              });
    
            } else {
    
              instance.kakao.sendTalk("realAccount", client.name, client.phone, {
                client: client.name,
                goodName: data.goodName,
                bankName: data.vactBankName,
                account: data.VACT_Num,
                to: data.VACT_Name,
                amount: autoComma(amount),
              }).catch((err) => {
                console.log(err);
              });
    
            }
    
            await bill.updateBill([ whereQuery, updateQuery ], { selfMongo });
    
          }
    
          res.set({
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
            "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
          });
          res.send(JSON.stringify({ message: "success" }));
    
        } else {
          res.set({
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
            "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
          });
          res.send(JSON.stringify({ message: "success" }));
        }
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/webHookVAccount" ], async function (req, res) {
      try {
        const impWebhookUrl = "https://service.iamport.kr/inicis_payments/notice_vbank";
        const oid = req.body.no_oid;
        const inisis = "현금 영수증";
        const bankFrom = req.body.nm_inputbank;
        const nameFrom = req.body.nm_input;
        const rawRequestNumber = Number(req.body.requestNumber);
        let bills;
        let accountTransferCollection;
        let transferRows, transferRows2;
        let impId;
    
        if (!/imp_/g.test(oid)) {
    
          bills = await bill.getBillsByQuery({ "links.oid": { $elemMatch: { $regex: oid } } }, { selfMongo: instance.mongolocal });
    
          if (bills.length === 0) {
            accountTransferCollection = "accountTransfer";
            transferRows = await back.mongoRead(accountTransferCollection, { "accountInfo.no_oid": oid }, { selfMongo: instance.mongolocal });
            if (transferRows.length > 0) {
              transferRows2 = await back.mongoRead(accountTransferCollection, {
                $and: [
                  { name: transferRows[0].name },
                  { phone: transferRows[0].phone },
                  { amount: transferRows[0].amount },
                  { goodname: transferRows[0].goodname },
                ]
              }, { selfMongo: instance.mongolocal });
              if (transferRows2.length > 0) {
                transferRows2.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });
                for (let obj of transferRows2) {
                  bills = await bill.getBillsByQuery({ "links.oid": { $elemMatch: { $regex: obj.accountInfo.no_oid } } }, { selfMongo: instance.mongolocal });
                  if (bills.length !== 0) {
                    break;
                  }
                }
                if (bills.length === 0) {
                  bills = await bill.getBillsByQuery({ "bilid": transferRows[0].bilid }, { selfMongo: instance.mongolocal });
                  if (bills.length === 0) {
                    throw new Error("invaild oid 3");
                  }
                }
              } else {
                throw new Error("invaild oid 2");
              }
            } else {
              throw new Error("invaild oid 1");
            }
          }
    
          if (bills[0].links.proid === undefined || bills[0].links.desid === undefined || bills[0].links.cliid === undefined) {
            throw new Error("invaild bill");
          }
    
          const { proid, cliid, desid, method } = bills[0].links;
          let infoArr, index;
          let bilid;
          let client, designer, project, proposal;
          let requestNumber;
          let data;
          let thisBill;
          let projectQuery;
          let amount;
          let pureDesignFee;
          let vat, consumer;
          let classification, percentage;
          let businessMethod;
          let bankName, bankTo;
          let calculate;
          let whereQuery, updateQuery;
          let proofs;
          let itemArr, payArr, cancelArr;
          let itemNum, payNum, cancelNum;
          let payObject;
          let message;
    
          thisBill = bills[0];
          thisBill = thisBill.toNormal();
          bilid = thisBill.bilid;
    
          client = await back.getClientById(cliid, { selfMongo: instance.mongo });
          designer = await back.getDesignerById(desid, { selfMongo: instance.mongo });
          project = await back.getProjectById(proid, { selfMongo: instance.mongo });
          proposal = project.selectProposal(desid);
    
          if (client === null || designer === null || project === null) {
            throw new Error("invaild id");
          }
    
          requestNumber = null;
          for (let i = 0; i < thisBill.requests.length; i++) {
            for (let obj of thisBill.requests[i].info) {
              if (obj.oid === oid) {
                requestNumber = i;
                break;
              }
            }
          }
    
          if (requestNumber === null) {
            requestNumber = rawRequestNumber;
            if (Number.isNaN(Number(requestNumber))) {
              throw new Error("invalid request request number")
            }
          }
    
          for (let obj of thisBill.requests[requestNumber].info) {
            if (obj.data !== undefined && typeof obj.data === "object" && obj.data !== null) {
              data = equalJson(JSON.stringify(obj.data));
              break;
            }
          }
          if (data === null || data === undefined) {
            data = { goodName: thisBill.requests[transferRows[0].requestNumber].name };
          }
    
          infoArr = equalJson(JSON.stringify(thisBill.requests[requestNumber].info));
          infoArr.unshift({ virtualAccount: equalJson(JSON.stringify(req.body)) });
    
          whereQuery = { bilid };
          updateQuery = {};
          updateQuery["requests." + String(requestNumber) + ".info"] = infoArr;
    
          amount = Number(equalJson(JSON.stringify(req.body)).amt_input.replace(/[^0-9]/gi, ''));
    
          itemArr = equalJson(JSON.stringify(thisBill.requests[Number(requestNumber)].items));
          payArr = equalJson(JSON.stringify(thisBill.requests[Number(requestNumber)].pay));
          cancelArr = equalJson(JSON.stringify(thisBill.requests[Number(requestNumber)].cancel));
          payObject = bill.returnBillDummies("pay");
          payObject.oid = oid;
          payObject.amount = amount;
          payArr.unshift(payObject);
    
          updateQuery["requests." + String(requestNumber) + ".status"] = "결제 완료";
          updateQuery["requests." + String(requestNumber) + ".pay"] = payArr;
    
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
    
          proofs.proof = inisis;
          proofs.to = nameFrom;
          thisBill.requests[requestNumber].proofs.unshift(proofs);
          updateQuery["requests." + String(requestNumber) + ".proofs"] = thisBill.requests[requestNumber].proofs;
    
          message = client.name + " 고객님 (" + designer.designer + " 실장님" + ") 이 " + proofs.method + "로 " + data.goodName.trim() + "을 결제하셨습니다!";
          messageSend({ text: message, channel: "#700_operation", voice: true }).catch((err) => {
            console.log(err);
          });
          await bill.updateBill([ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });
          await instance.sync_paymentProject(bilid, requestNumber, data, amount, proofs, inisis, { thisBill, client, designer, project, proposal });
    
        } else {
          const impId = req.body.no_oid;
          const { data: { response: { access_token: accessToken } } } = (await requestSystem("https://api.iamport.kr/users/getToken", {
            imp_key: address.officeinfo.import.key,
            imp_secret: address.officeinfo.import.secret
          }, { headers: { "Content-Type": "application/json" } }));
          const { data: { response: paymentData } } = await requestSystem("https://api.iamport.kr/payments/" + impId, {}, {
            method: "get",
            headers: { "Authorization": accessToken }
          });
    
          const oid = paymentData.merchant_uid;
    
          if (/dreg_/g.test(oid)) {
            const [ oidConst, aspid0, aspid1 ] = oid.split("_");
            const aspid = aspid0 + "_" + aspid1;
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
    
        res.set({ "Content-Type": "text/plain" });
        res.send("OK");
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set({ "Content-Type": "text/plain" });
        res.send("FAIL");
      }
    });
    
    router.post([ "/designerSelect" ], async function (req, res) {
      try {
        if (req.body.proid === undefined || req.body.desid === undefined) {
          throw new Error("invaild post, must be proid / desid : " + JSON.stringify(req.body, null, 2));
        }
        const selfMongo = instance.mongolocal;
        const { proid, desid } = equalJson(req.body);
        await bill.designerSelect(proid, desid, { selfMongo });
        res.set({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
        });
        res.send(JSON.stringify({ message: "success" }));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/travelInjection" ], async function (req, res) {
      try {
        if (req.body.injectionCase === undefined || req.body.proid === undefined || req.body.method === undefined || req.body.number === undefined) {
          throw new Error("invaild post");
        }
        const selfMongo = instance.mongolocal;
        const { injectionCase, proid, method, number: rawNumber } = equalJson(req.body);
        const number = Number(rawNumber);
        const thisBill = await bill.travelInjection(injectionCase, proid, method, number, { selfMongo });
        res.set({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
        });
        res.send(JSON.stringify(thisBill.toNormal()));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/travelEjection" ], async function (req, res) {
      try {
        if (req.body.injectionCase === undefined || req.body.proid === undefined || req.body.method === undefined || req.body.index === undefined) {
          throw new Error("invaild post");
        }
        const selfMongo = instance.mongolocal;
        const { injectionCase, proid, method, index: rawIndex } = equalJson(req.body);
        const index = Number(rawIndex);
        const thisBill = await bill.travelEjection(injectionCase, proid, method, index, { selfMongo });
        res.set({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
        });
        res.send(JSON.stringify(thisBill.toNormal()));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/travelUpDown" ], async function (req, res) {
      try {
        if (req.body.order === undefined || req.body.proid === undefined || req.body.method === undefined || req.body.index === undefined) {
          throw new Error("invaild post");
        }
        const selfMongo = instance.mongolocal;
        const { order, proid, method, index: rawIndex } = equalJson(req.body);
        const index = Number(rawIndex);
        const thisBill = await bill.travelUpDown(order, proid, method, index, { selfMongo });
        res.set({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
        });
        res.send(JSON.stringify(thisBill.toNormal()));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/travelReconfig" ], async function (req, res) {
      try {
        if (req.body.injectionCase === undefined || req.body.proid === undefined || req.body.method === undefined || req.body.index === undefined || req.body.number === undefined) {
          throw new Error("invaild post");
        }
        const selfMongo = instance.mongolocal;
        const { injectionCase, proid, method, index: rawIndex, number: rawNumber } = equalJson(req.body);
        const index = Number(rawIndex);
        const number = Number(rawNumber);
        const thisBill = await bill.travelReconfig(injectionCase, proid, method, index, number, { selfMongo });
        res.set({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
        });
        res.send(JSON.stringify(thisBill.toNormal()));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/serviceConverting" ], async function (req, res) {
      try {
        if (req.body.proid === undefined || req.body.method === undefined || req.body.serid === undefined) {
          throw new Error("invaild post");
        }
        const selfMongo = instance.mongolocal;
        const { proid, method, serid } = equalJson(req.body);
        const project = await back.getProjectById(proid, { selfMongo: instance.mongo });
        const client = await back.getClientById(project.cliid, { selfMongo: instance.mongo });
        const firstContract = project.process.contract.first.calculation.amount;
        const pastService = equalJson(JSON.stringify(project.service));
        const timeConst = 410;
        let report, map;
        let newPrice, confirmMode;
    
        if (req.body.mode === "confirm") {
    
          confirmMode = true;
          if (req.body.newPrice === undefined) {
            report = await bill.serviceConverting(proid, method, serid, { selfMongo, selfCoreMongo: instance.mongo, confirmMode });
          } else {
            if (Number.isNaN(Number(req.body.newPrice))) {
              throw new Error("must be newPrice(number) in confirm mode");
            }
            newPrice = Math.round(Number(req.body.newPrice));
            report = await bill.serviceConverting(proid, method, serid, { selfMongo, selfCoreMongo: instance.mongo, newPrice, confirmMode });
          }
    
          res.set({
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
            "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
          });
          res.send(JSON.stringify(report));
    
        } else {
    
          if (req.body.newPrice !== undefined && !Number.isNaN(Number(req.body.newPrice))) {
            newPrice = Math.round(Number(req.body.newPrice));
            report = await bill.serviceConverting(proid, method, serid, { selfMongo, selfCoreMongo: instance.mongo, newPrice });
          } else {
            report = await bill.serviceConverting(proid, method, serid, { selfMongo, selfCoreMongo: instance.mongo });
          }
    
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
              console.log(err);
            });
            messageSend({ text: client.name + " 고객님의 추가 디자인비 요청 알림톡을 전송했어요!", channel: "#700_operation", voice: true }).catch((err) => {
              console.log(err);
            });
          }
    
          res.set({
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
            "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
          });
          res.send(JSON.stringify({ message: "success" }));
    
        }
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/designerConverting" ], async function (req, res) {
      try {
        if (req.body.proid === undefined || req.body.method === undefined || req.body.desid === undefined) {
          throw new Error("invaild post");
        }
        const selfMongo = instance.mongolocal;
        const { proid, method, desid } = equalJson(req.body);
        const project = (await back.getProjectById(proid, { selfMongo: instance.mongo })).toNormal();
        const client = await back.getClientById(project.cliid, { selfMongo: instance.mongo });
        const pastDesigner = await back.getDesignerById(project.desid, { selfMongo: instance.mongo });
        const designer = await back.getDesignerById(desid, { selfMongo: instance.mongo });
        const firstContract = project.process.contract.first.calculation.amount;
        const report = await bill.designerConverting(proid, method, desid, { selfMongo, selfCoreMongo: instance.mongo });
        const newProject = (await back.getProjectById(proid, { selfMongo: instance.mongo })).toNormal();
    
        if (report.request.additional) {
          await kakao.sendTalk("plusDesignerFee", client.name, client.phone, {
            client: client.name,
            pastdesigner: pastDesigner.designer,
            newdesigner: designer.designer,
            host: address.officeinfo.host + ":3002",
            total: autoComma(Math.abs(report.request.from.consumer - report.request.to.consumer)),
            path: "estimation",
            cliid: client.cliid,
            needs: "style," + project.desid + "," + proid + "," + (report.service.to.online ? "online" : "offline"),
          }).catch((err) => {
            console.log(err);
          });
          messageSend({ text: client.name + " 고객님의 추가 디자인비 요청 알림톡을 전송했어요!", channel: "#700_operation", voice: true }).catch((err) => {
            console.log(err);
          });
        }
    
        res.set({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
        });
        res.send(JSON.stringify({ message: "success" }));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/amountConverting" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        if (req.body.bilid === undefined) {
          throw new Error("invaild post");
        }
        const selfMongo = instance.mongolocal;
        const { bilid } = equalJson(req.body);
        await bill.amountConverting(bilid, { selfMongo, selfCoreMongo: instance.mongo });
        res.send(JSON.stringify({ message: "success" }));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/requestRefund" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        if (req.body.kind === undefined || req.body.bilid === undefined || req.body.requestIndex === undefined || req.body.payIndex === undefined) {
          throw new Error("invaild post 0");
        }
        const selfMongo = instance.mongolocal;
        const { kind, bilid } = equalJson(req.body);
        const requestIndex = Number(req.body.requestIndex);
        const payIndex = Number(req.body.payIndex);
        if (!([ "cardEntire", "cardPartial", "vaccountEntire", "vaccountPartial", "cashEntire", "cashPartial" ]).includes(kind)) {
          throw new Error("invaild post, kind must be : [ cardEntire, cardPartial, vaccountEntire, vaccountPartial, cashEntire, cashPartial ]");
        }
        if (Number.isNaN(requestIndex) || Number.isNaN(payIndex)) {
          throw new Error("invaild post 1");
        }
        let refundPrice;
        let report, option, client, designer, project, pastProject, proid;
        let timeConst, map;
    
        if (req.body.refundPrice !== undefined) {
          refundPrice = Number(req.body.refundPrice);
          if (refundPrice === 0 || Number.isNaN(refundPrice)) {
            refundPrice = null;
          }
        } else {
          refundPrice = null;
        }
    
        option = { selfMongo, selfCoreMongo: instance.mongo };
        if (req.body.percentage !== undefined) {
          if (typeof req.body.percentage === "string") {
            if (!Number.isNaN(Number(req.body.percentage.replace(/[^0-9\.]/gi, '')))) {
              option.percentage = Number(req.body.percentage);
            }
          } else if (typeof req.body.percentage === "number") {
            if (!Number.isNaN(req.body.percentage)) {
              option.percentage = Number(req.body.percentage);
            }
          }
        }
        if (req.body.accountNumber !== undefined && req.body.bankName !== undefined && req.body.accountName !== undefined) {
          option.accountNumber = req.body.accountNumber;
          option.bankName = req.body.bankName;
          option.accountName = req.body.accountName;
        }
        if (refundPrice !== undefined && refundPrice !== null) {
          if (typeof refundPrice === "number") {
            option.refundPrice = refundPrice;
          }
        }
    
        if (!/^cash/i.test(kind)) {
          report = await bill.requestRefund(kind, bilid, requestIndex, payIndex, option);
          await messageLog("환불 감지 : " + JSON.stringify(report, null, 2));
          report.bill = report.bill.toNormal();
          report.pastProject = report.pastProject.toNormal();
          report.project = report.project.toNormal();
          report.client = report.client.toNormal();
          client = report.client;
          pastProject = report.pastProject;
          project = report.project;
          proid = project.proid;
          designer = await back.getDesignerById(report.desid, { selfMongo: instance.mongo });
    
          kakao.sendTalk((/card/gi.test(kind) ? "refundCard" : "refundVAccount"), client.name, client.phone, {
            client: client.name,
            designer: designer.designer,
            percentage: (!Number.isNaN(Number(report.price.percentage)) ? report.price.percentage : 100),
            amount: report.price.refund
          }).then(() => {
            return messageSend({ text: client.name + " 고객님의 환불 요청이 완료되었습니다!", channel: "#700_operation", voice: true });
          }).catch((err) => {
            console.log(err);
          });
    
          res.send(JSON.stringify(report));
    
        } else {
    
          if (req.body.mode === undefined || req.body.mode === null || req.body.mode === "request") {
            report = await bill.cashRefund("request", bilid, requestIndex, payIndex, option);
          } else if (req.body.mode === "execute") {
            report = await bill.cashRefund("execute", bilid, requestIndex, payIndex, option);
    
            client = report.client;
            designer = await back.getDesignerById(report.desid, { selfMongo: instance.mongo });
    
            kakao.sendTalk("refundVAccount", client.name, client.phone, {
              client: client.name,
              designer: designer.designer,
              percentage: (!Number.isNaN(Number(report.price.percentage)) ? report.price.percentage : 100),
              amount: report.price.refund
            }).then(() => {
              return messageSend({ text: client.name + " 고객님의 환불 요청이 완료되었습니다!", channel: "#700_operation", voice: true });
            }).catch((err) => {
              console.log(err);
            });
    
          }
          if (report.message === "success") {
            res.send(JSON.stringify(report));
          } else {
            throw new Error(report.message);
          }
        }
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/contractCancel" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        if (req.body.bilid === undefined) {
          throw new Error("invaild post");
        }
        const selfMongo = instance.mongolocal;
        const { bilid } = equalJson(req.body);
        let report, option, project, pastProject, proid;
        let timeConst, map;
    
        option = { selfMongo, selfCoreMongo: instance.mongo };
    
        report = await bill.contractCancel(bilid, option);
        report.bill = report.bill.toNormal();
        report.pastProject = report.pastProject.toNormal();
        report.project = report.project.toNormal();
    
        pastProject = report.pastProject;
        project = report.project;
        proid = project.proid;
    
        res.send(JSON.stringify(report));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/returnBankCode" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        const bankCode = instance.bankCode;
        res.send(JSON.stringify(bankCode));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/designerCalculation" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        if (req.body.supply === undefined || req.body.classification === undefined || req.body.percentage === undefined || req.body.cliid === undefined) {
          throw new Error("invaild post");
        }
        const { classification, cliid } = equalJson(req.body);
        const supply = Number(req.body.supply);
        const percentage = Number(req.body.percentage);
        let calculate, commission;
        let project, client;
    
        if (/^c/.test(cliid)) {
          client = await back.getClientById(cliid, { selfMongo: instance.mongo });
          if (client === null) {
            throw new Error("invaild cliid");
          }
        } else if (/^p/.test(cliid)) {
          project = await back.getProjectById(cliid, { selfMongo: instance.mongo });
          if (project === null) {
            throw new Error("invaild proid");
          }
          client = await back.getClientById(project.cliid, { selfMongo: instance.mongo });
          if (client === null) {
            throw new Error("invaild cliid");
          }
        } else {
          throw new Error("invaild cliid");
        }
    
        [ calculate, commission ] = bill.designerCalculation(supply, classification, percentage, client, { toArray: true });
    
        if (req.body.mode === "commission") {
          res.send(JSON.stringify({ commission }));
        } else if (req.body.mode === "total") {
          res.send(JSON.stringify({ calculate, commission }));
        } else {
          res.send(JSON.stringify({ calculate }));
        }
      } catch (e) {
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
    
    router.post([ "/taxBill" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        bill.taxBill().catch((err) => {
          logger.error(err, req).catch((e) => { console.log(e); });
        })
        res.send(JSON.stringify({ message: "will do" }));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/weeklyCalculation" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        work.designerCalculation().then(() => {
          return logger.cron("weeklyCalculation success");
        }).catch((e) => {
          logger.error(e, req).catch((e) => { console.log(e); });
        });
        res.send(JSON.stringify({ message: "will do" }));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/nonPaidResponses" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        const result = await work.designerCalculation(false);
        res.send(JSON.stringify(result));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/excuteResponse" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        if (req.body.bilid === undefined || req.body.responseIndex === undefined || req.body.date === undefined) {
          throw new Error("invaild post");
        }
        let { bilid, responseIndex, date } = equalJson(req.body);
        let thisBill;
        let oid;
        let method;
        let proid;
        let thisProject;
        let thisResponse;
        let pay, name, target;
        let whereQuery, updateQuery;
        let projectWhereQuery, projectUpdateQuery;
        let amount;
        let type;
        let thisClient, thisDesigner;
    
        responseIndex = Number(responseIndex);
        if (Number.isNaN(responseIndex)) {
          throw new Error("invaild post");
        }
    
        thisBill = await bill.getBillById(bilid, { selfMongo: instance.mongolocal });
        if (thisBill.responses[responseIndex] === undefined) {
          throw new Error("invaild index");
        }
    
        oid = "";
        method = "계좌 이체";
        proid = thisBill.links.proid;
        thisProject = await back.getProjectById(proid, { selfMongo: instance.mongo });
    
        thisResponse = thisBill.responses[responseIndex];
        ({ pay, name, target } = thisResponse);
    
        amount = Math.floor(thisResponse.items.reduce((acc, curr) => { return acc + curr.amount.pure }, 0));
    
        whereQuery = { bilid };
        updateQuery = {};
    
        if (pay.length === 0) {
          updateQuery["responses." + String(responseIndex) + ".pay"] = [ { amount, date, oid } ];
          updateQuery["responses." + String(responseIndex) + ".proofs"] = [ { date, method, proof: thisProject.process.calculation.info.proof, to: thisProject.process.calculation.info.to } ];
        } else if (pay.length === 1) {
          updateQuery["responses." + String(responseIndex) + ".pay." + String(0) + ".amount"] = amount;
          updateQuery["responses." + String(responseIndex) + ".pay." + String(0) + ".date"] = date;
          updateQuery["responses." + String(responseIndex) + ".proofs." + String(0) + ".date"] = date;
          updateQuery["responses." + String(responseIndex) + ".proofs." + String(0) + ".method"] = method;
          updateQuery["responses." + String(responseIndex) + ".proofs." + String(0) + ".proof"] = thisProject.process.calculation.info.proof;
          updateQuery["responses." + String(responseIndex) + ".proofs." + String(0) + ".to"] = thisProject.process.calculation.info.to;
        } else {
          updateQuery["responses." + String(responseIndex) + ".pay"] = [ { amount, date, oid } ];
          updateQuery["responses." + String(responseIndex) + ".proofs"] = [ { date, method, proof: thisProject.process.calculation.info.proof, to: thisProject.process.calculation.info.to } ];
        }
    
        await bill.updateBill([ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });
        thisBill = await bill.getBillById(bilid, { selfMongo: instance.mongolocal });
    
        if (/홈리에종 선금/gi.test(name) || /홈리에종 잔금/gi.test(name)) {
    
          projectWhereQuery = { proid };
          projectUpdateQuery = {};
    
          if (/홈리에종 선금/gi.test(name)) {
            projectUpdateQuery["process.calculation.payments.first.amount"] = Math.floor(amount);
            projectUpdateQuery["process.calculation.payments.first.date"] = date;
            projectUpdateQuery["process.calculation.payments.remain.amount"] = Math.floor(thisProject.process.calculation.payments.totalAmount - amount);
            type = "first";
          } else if (/홈리에종 잔금/gi.test(name)) {
            projectUpdateQuery["process.calculation.payments.remain.amount"] = Math.floor(amount);
            projectUpdateQuery["process.calculation.payments.remain.date"] = date;
            type = "remain";
          }
    
          await back.updateProject([ projectWhereQuery, projectUpdateQuery ], { selfMongo: instance.mongo });
          thisProject = await back.getProjectById(proid, { selfMongo: instance.mongo });
          thisClient = await back.getClientById(thisProject.cliid, { selfMongo: instance.mongo });
          thisDesigner = await back.getDesignerById(thisResponse.target.id, { selfMongo: instance.mongo });
    
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
    
        res.send(JSON.stringify({
          message: "success",
          bilid,
          proid,
          bill: thisBill.toNormal(),
          project: thisProject.toNormal(),
        }));
    
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/excuteRepay" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        if (req.body.bilid === undefined || req.body.responseIndex === undefined || req.body.date === undefined || req.body.amount === undefined) {
          throw new Error("invaild post");
        }
        let { bilid, responseIndex, date, amount } = equalJson(req.body);
        let thisBill;
        let oid;
        let method;
        let proid;
        let thisProject;
        let thisResponse;
        let cancel, name, target, proofs;
        let whereQuery, updateQuery;
        let projectWhereQuery, projectUpdateQuery;
        let cancelArr, proofsArr;
        let proof, to;
    
        responseIndex = Number(responseIndex);
        if (Number.isNaN(responseIndex)) {
          throw new Error("invaild post");
        }
    
        amount = Number(amount);
        if (Number.isNaN(amount)) {
          throw new Error("invaild post");
        }
    
        thisBill = await bill.getBillById(bilid, { selfMongo: instance.mongolocal });
        if (thisBill.responses[responseIndex] === undefined) {
          throw new Error("invaild index");
        }
    
        oid = "";
        method = "계좌 이체 취소";
        proof = "현금 영수증";
        to = "주식회사 홈리에종";
    
        proid = thisBill.links.proid;
        thisProject = await back.getProjectById(proid, { selfMongo: instance.mongo });
    
        thisResponse = thisBill.responses[responseIndex];
        ({ cancel, proofs, name, target } = thisResponse);
    
        cancelArr = equalJson(JSON.stringify(cancel));
        proofsArr = equalJson(JSON.stringify(proofs));
    
        whereQuery = { bilid };
        updateQuery = {};
    
        cancelArr.unshift({ date, amount, oid });
        proofsArr.unshift({ date, method, proof, to });
    
        updateQuery["responses." + String(responseIndex) + ".cancel"] = cancelArr;
        updateQuery["responses." + String(responseIndex) + ".proofs"] = proofsArr;
    
        await bill.updateBill([ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });
        thisBill = await bill.getBillById(bilid, { selfMongo: instance.mongolocal });
    
        if (/홈리에종 선금/gi.test(name) || /홈리에종 잔금/gi.test(name)) {
    
          projectWhereQuery = { proid };
          projectUpdateQuery = {};
    
          if (/홈리에종 선금/gi.test(name)) {
            projectUpdateQuery["process.calculation.payments.first.refund"] = Math.floor(amount);
            projectUpdateQuery["process.calculation.payments.first.cancel"] = date;
          } else if (/홈리에종 잔금/gi.test(name)) {
            projectUpdateQuery["process.calculation.payments.remain.refund"] = Math.floor(amount);
            projectUpdateQuery["process.calculation.payments.remain.cancel"] = date;
          }
    
          await back.updateProject([ projectWhereQuery, projectUpdateQuery ], { selfMongo: instance.mongo });
          thisProject = await back.getProjectById(proid, { selfMongo: instance.mongo });
    
        }
    
        res.send(JSON.stringify({
          message: "success",
          bilid,
          proid,
          bill: thisBill.toNormal(),
          project: thisProject.toNormal(),
        }));
    
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/passiveResponse" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        if (req.body.bilid === undefined || req.body.responseIndex === undefined || req.body.amount === undefined) {
          throw new Error("invaild post");
        }
        let { bilid, responseIndex, amount } = equalJson(req.body);
        let thisBill;
        let whereQuery;
        let updateQuery;
        let thisResponse;
        let thisItems;
        let thisItem;
    
        responseIndex = Number(responseIndex);
        if (Number.isNaN(responseIndex)) {
          throw new Error("invaild post");
        }
    
        amount = Number(amount);
        if (Number.isNaN(amount)) {
          throw new Error("invaild post");
        }
    
        thisBill = await bill.getBillById(bilid, { selfMongo: instance.mongolocal });
        if (thisBill.responses[responseIndex] === undefined) {
          throw new Error("invaild index");
        }
    
        thisResponse = thisBill.responses[responseIndex];
        thisItems = thisResponse.items;
        thisItem = thisItems[0];
    
        whereQuery = { bilid };
        updateQuery = {};
    
        updateQuery["responses." + String(responseIndex) + ".items"] = [
          {
            id: thisItem.id,
            class: thisItem.class,
            name: thisItem.name,
            description: thisItem.description,
            info: thisItem.info,
            unit: {
              ea: thisItem.unit.ea,
              price: amount,
              number: 1,
            },
            amount: {
              pure: amount,
              commission: 0,
            }
          }
        ];
    
        await bill.updateBill([ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });
        thisBill = await bill.getBillById(bilid, { selfMongo: instance.mongolocal });
    
        res.send(JSON.stringify({
          bilid: thisBill.bilid,
          proid: thisBill.links.proid,
          bill: thisBill.toNormal()
        }));
    
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/stylingFormSync" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      const { requestSystem, equalJson, stringToDate, messageLog, messageSend } = instance.mother;
      const address = instance.address;
      const { officeinfo: { widsign: { id, key, endPoint } } } = address;
      const collections = [ "stylingForm", "constructForm", "partnershipForm", "designerForm" ];
      const back = instance.back;
      const formSync = async (MONGOC, MONGOPYTHONC) => {
        try {
          const selfMongo = MONGOPYTHONC;
          let widsignResponse, token;
          let num;
          let forms, resultForms, finalForms;
          let pageSize;
          let monthAgoValue;
          let boo;
          let whereQuery, updateQuery;
          let dbForms;
          let target;
          let formDetail;
          let thisClient;
          let thisProject, thisDesigner;
          let text;
    
          for (let collection of collections) {
            monthAgoValue = new Date();
            monthAgoValue.setMonth(monthAgoValue.getMonth() - 3);
            monthAgoValue = monthAgoValue.valueOf();
    
            pageSize = 30;
            widsignResponse = await requestSystem(endPoint + "/v2/token", {}, { method: "get", headers: { "x-api-id": id, "x-api-key": key } });
    
            if (widsignResponse.data.result_code !== 200) {
              throw new Error("access token error");
            } else {
              token = widsignResponse.data.access_token;
              resultForms = [];
              forms = [ null ];
              num = 1;
              while (forms.length > 0) {
                widsignResponse = await requestSystem(endPoint + "/v2/doc", { page: num, page_size: pageSize }, { method: "get", headers: { "x-api-key": key, "x-access-token": token } });
                forms = equalJson(JSON.stringify(widsignResponse.data.result)).map((obj) => {
                  let newObj;
                  newObj = {};
                  newObj.form = obj.form_id;
                  newObj.id = (obj.receiver_list.length > 0) ? obj.receiver_list[0] : null;
                  newObj.name = obj.title;
                  newObj.date = stringToDate(obj.created_date);
                  newObj.confirm = (obj.status === 'END');
                  return newObj;
                });
                if (forms.length > 0) {
                  forms.sort((a, b) => { return a.date.valueOf() - b.date.valueOf(); });
                  if (forms[0].date.valueOf() <= monthAgoValue) {
                    break;
                  }
                  resultForms = resultForms.concat(forms);
                }
                num++;
              }
    
              resultForms.sort((a, b) => { return b.date.valueOf() - a.date.valueOf(); });
    
              finalForms = [];
              for (let f of resultForms) {
                boo = (finalForms.find((obj) => { return obj.name === f.name; }) !== undefined);
                if (!boo) {
                  finalForms.push(f);
                }
              }
    
              widsignResponse = await requestSystem(endPoint + "/v2/token", {}, { method: "get", headers: { "x-api-id": id, "x-api-key": key } });
              if (widsignResponse.data.result_code !== 200) {
                throw new Error("access token error");
              }
              token = widsignResponse.data.access_token;
    
              if (/styling/gi.test(collection) || /construct/gi.test(collection)) {
                whereQuery = { $or: finalForms.map((obj) => { return { name: obj.name } }) };
                dbForms = await back.mongoRead(collection, whereQuery, { selfMongo });
                for (let f of dbForms) {
                  whereQuery = { proid: f.proid };
                  updateQuery = {};
      
                  target = null;
                  for (let i of finalForms) {
                    if (i.name === f.name) {
                      target = i;
                    }
                  }
      
                  if (target !== null) {
                    widsignResponse = await requestSystem(endPoint + "/v2/doc/detail", { "receiver_meta_id": target.id }, { method: "get", headers: { "x-api-key": key, "x-access-token": token } });
                    if (typeof widsignResponse.data === "object") {
                      if (widsignResponse.data.result !== undefined) {
                        if (widsignResponse.data.result.receiver_list.length > 0) {
                          updateQuery["id"] = target.id;
                          updateQuery["date"] = target.date;
                          updateQuery["confirm"] = target.confirm;
                          updateQuery["form"] = target.form;
                          updateQuery["detail"] = widsignResponse.data.result.receiver_list[0];
                          widsignResponse = await requestSystem(endPoint + "/v2/doc/history", { "receiver_meta_id": target.id }, { method: "get", headers: { "x-api-key": key, "x-access-token": token } });
                          if (typeof widsignResponse.data === "object") {
                            if (Array.isArray(widsignResponse.data.result)) {
                              updateQuery["history"] = widsignResponse.data.result.map((o) => {
                                o.date = stringToDate(o.created_date);
                                delete o.created_date;
                                return o;
                              });
                              if (f.confirm !== true && target.confirm === true) {
      
                                thisProject = await back.getProjectById(f.proid, { selfMongo: MONGOC });
                                thisClient = await back.getClientById(f.client.cliid, { selfMongo: MONGOC });
                                thisDesigner = await back.getDesignerById(thisProject.desid, { selfMongo: MONGOC });
      
                                text = thisClient.name + " 고객님이 계약서에 서명을 완료하셨습니다!";
                                await messageSend({ text, channel: "#400_customer", voice: true });
      
                              }
                              await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo });
      
                              if (/styling/gi.test(collection)) {
                                await back.updateProject([ { proid: f.proid }, { "process.contract.form.id": target.id } ], { selfMongo: MONGOC });
                              } else if (/construct/gi.test(collection)) {
                                await back.updateProject([ { proid: f.proid }, { "process.design.construct.contract.form.id": target.id } ], { selfMongo: MONGOC });
                              }
      
                            }
                          }
                        }
                      }
                    }
                  }
      
                }
              } else {
    
                whereQuery = { $or: finalForms.map((obj) => { return { name: obj.name } }) };
                dbForms = await back.mongoRead(collection, whereQuery, { selfMongo });
                for (let f of dbForms) {
                  whereQuery = { aspid: f.aspid };
                  updateQuery = {};
      
                  target = null;
                  for (let i of finalForms) {
                    if (i.name === f.name) {
                      target = i;
                    }
                  }
      
                  if (target !== null) {
                    widsignResponse = await requestSystem(endPoint + "/v2/doc/detail", { "receiver_meta_id": target.id }, { method: "get", headers: { "x-api-key": key, "x-access-token": token } });
                    if (typeof widsignResponse.data === "object") {
                      if (widsignResponse.data.result !== undefined) {
                        if (widsignResponse.data.result.receiver_list.length > 0) {
                          updateQuery["id"] = target.id;
                          updateQuery["date"] = target.date;
                          updateQuery["confirm"] = target.confirm;
                          updateQuery["form"] = target.form;
                          updateQuery["detail"] = widsignResponse.data.result.receiver_list[0];
                          widsignResponse = await requestSystem(endPoint + "/v2/doc/history", { "receiver_meta_id": target.id }, { method: "get", headers: { "x-api-key": key, "x-access-token": token } });
                          if (typeof widsignResponse.data === "object") {
                            if (Array.isArray(widsignResponse.data.result)) {
                              updateQuery["history"] = widsignResponse.data.result.map((o) => {
                                o.date = stringToDate(o.created_date);
                                delete o.created_date;
                                return o;
                              });
                              await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo });
                              if (f.confirm !== true && target.confirm === true) {
                                thisDesigner = await back.getAspirantById(f.aspid, { selfMongo: MONGOC });
                                text = thisDesigner.designer + " 디자이너님이 계약서에 서명을 완료하셨습니다!";
                                await messageSend({ text, channel: "#301_apply", voice: true });
                                if (/partnership/gi.test(collection)) {
                                  await back.updateAspirant([ { aspid: f.aspid }, { "contract.partnership.id": target.id, "contract.partnership.date": new Date() } ], { selfMongo: MONGOC });
                                } else if (/designer/gi.test(collection)) {
                                  await back.updateAspirant([ { aspid: f.aspid }, { "contract.designer.id": target.id, "contract.designer.date": new Date() } ], { selfMongo: MONGOC });
                                }
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
    
            }
    
          }
        
          return true;
    
        } catch (e) {
          return false;
        }
      }
      try {
        formSync(instance.mongo, instance.mongolocal).then((boo) => {
          if (boo) {
            logger.cron("styling form sync success : " + JSON.stringify(new Date())).catch((e) => { console.log(e); });
          }
          return requestSystem("https://" + address.officeinfo.host + ":3002/stylingFormFile", { data: null }, { headers: { "Content-Type": "application/json" } });;
        }).catch((err) => {
          logger.error(err, req).catch((e) => { console.log(e); });
        });
        res.send(JSON.stringify({ message: "will do" }));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/stylingFormFile" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      const { requestSystem, binaryRequest, fileSystem, shellExec, sleep, generalFileUpload, equalJson, stringToDate, messageLog, messageSend } = instance.mother;
      const address = instance.address;
      const { officeinfo: { widsign: { id, key, endPoint } } } = address;
      const back = instance.back;
      try {
        const selfMongo = instance.mongolocal;
        const splitToken = "__split__";
        const collection = "stylingForm";
        let widsignResponse;
        let token;
        let rows;
        let fileName;
        let transRes;
        let subtract;
        let fileList;
        let downloadTargets;
        let fromArr, toArr;
    
        rows = await back.mongoRead(collection, {}, { selfMongo });
        rows = rows.filter((obj) => { return obj.confirm });
    
        transRes = await requestSystem("https://" + address.secondinfo.host + ":3003/contractList", { data: null }, { headers: { "Content-Type": "application/json" } });
    
        fileList = transRes.data.map((obj) => { return obj.proid });
        subtract = rows.map((obj) => { return obj.proid }).filter((proid) => {
          return !fileList.includes(proid);
        });
        downloadTargets = rows.filter((obj) => {
          return subtract.includes(obj.proid);
        });
    
        for (let { id: formId, proid, client: { cliid, requestNumber } } of downloadTargets) {
          widsignResponse = await requestSystem(endPoint + "/v2/token", {}, { method: "get", headers: { "x-api-id": id, "x-api-key": key } });
          if (widsignResponse.data.result_code !== 200) {
            throw new Error("access token error");
          }
          token = widsignResponse.data.access_token;
          fileName = `${proid}${splitToken}${cliid}${splitToken}${requestNumber}${splitToken}${formId}.zip`;
          widsignResponse = await binaryRequest(endPoint + "/v2/doc/download?receiver_meta_id=" + formId, null, { "x-api-key": key, "x-access-token": token });
          await fileSystem(`writeBinary`, [ `${process.cwd()}/temp/${fileName}`, widsignResponse ]);
    
          fromArr = [ `${process.cwd()}/temp/${fileName}` ];
          toArr = [ "/photo/contract/" + fileName ];
          await generalFileUpload("https://" + address.secondinfo.host + ":3003/generalFileUpload", fromArr, toArr);
    
          await sleep(300);
          await shellExec("rm", [ "-rf", `${process.cwd()}/temp/${fileName}` ]);
    
        }
    
        logger.cron("styling form file success : " + JSON.stringify(new Date())).catch((e) => { console.log(e); });
    
        res.send(JSON.stringify({ message: "done" }));
      } catch (e) {
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
    
    router.post([ "/ghostClient_updateAnalytics" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        if (req.body.mode === undefined || req.body.cliid === undefined || req.body.page === undefined) {
          throw new Error("invaild post");
        }
        const { mode, cliid, page } = req.body;
        const ip = String(req.headers['x-forwarded-for'] === undefined ? req.socket.remoteAddress : req.headers['x-forwarded-for']).trim().replace(/[^0-9\.]/gi, '');
        const rawUserAgent = req.useragent;
        const { source: userAgent, browser, os, platform } = rawUserAgent;
        const referrer = (req.headers.referer === undefined ? "" : req.headers.referer);
        let whereQuery, updateQuery;
        let history;
        let update;
        let image;
        let ipObj;
    
        whereQuery = { cliid };
        history = await back.getHistoryById("client", cliid, { selfMongo: instance.mongolocal });
        if (history === null) {
          await back.createHistory("client", { cliid }, { selfMongo: instance.mongolocal, secondMongo: instance.mongo });
          history = await back.getHistoryById("client", cliid, { selfMongo: instance.mongolocal });
        }
    
        if (mode === "page") {
    
          ipObj = await ipParsing(ip);
          if (Object.keys(ipObj).length === 0) {
            ipObj = { ip };
          }
    
          history.curation.analytics.page.push({ page, date: new Date(), referrer, userAgent, browser, os, platform, mobile: rawUserAgent.isMobile, ...ipObj });
          updateQuery = {};
          updateQuery["curation.analytics.page"] = history.curation.analytics.page;
          await back.updateHistory("client", [ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });
    
        } else if (mode === "update") {
    
          update = equalJson(req.body.update);
          history.curation.analytics.update.push({ page, date: new Date(), update });
          updateQuery = {};
          updateQuery["curation.analytics.update"] = history.curation.analytics.update;
          await back.updateHistory("client", [ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });
    
          if (req.body.updateQuery !== undefined) {
            const { history: historyQuery, core: coreQuery } = equalJson(req.body.updateQuery);
            if (historyQuery !== null && typeof historyQuery === "object" && Object.keys(historyQuery).length > 0) {
              await back.updateHistory("client", [ whereQuery, historyQuery ], { selfMongo: instance.mongolocal });
            }
            if (coreQuery !== null && typeof coreQuery === "object" && Object.keys(coreQuery).length > 0) {
              await back.updateClient([ { cliid }, coreQuery ], { selfMongo: instance.mongo });
            }
          }
    
        } else if (mode === "submit") {
    
          history.curation.analytics.submit.push({ page, date: new Date() });
          updateQuery = {};
          updateQuery["curation.analytics.submit"] = history.curation.analytics.submit;
          await back.updateHistory("client", [ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });
    
        } else if (mode === "image") {
    
          image = equalJson(req.body.image);
          updateQuery = {};
          updateQuery["curation.image"] = image;
          await back.updateHistory("client", [ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });
    
        } else {
          throw new Error("invaild mode");
        }
    
        res.send(JSON.stringify({ message: "done" }));
    
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/designerProposal_submit" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        let { cliid, proid, desid, name, phone, designer, method } = req.body;
        let thisProject, thisClient, requestNumber;
        let action;
    
        thisProject = await back.getProjectById(proid, { selfMongo: instance.mongo });
        thisClient = await back.getClientById(cliid, { selfMongo: instance.mongo });
        requestNumber = 0;
        for (let i = 0; i < thisClient.requests.length; i++) {
          if (thisClient.requests[i].request.timeline.valueOf() <= thisProject.proposal.date.valueOf()) {
            requestNumber = i;
            break;
          }
        }
        action = "디자이너 선택";
    
        await requestSystem("https://" + address.officeinfo.host + ":3002/createStylingBill", { proid, desid }, { headers: { "Content-Type": "application/json" } });
        await back.updateProject([ { proid }, { "service.online": (method === "online") } ], { selfMongo: instance.mongo });
    
        messageSend({ text: `${name} 고객님이 ${designer} 디자이너를 선택하셨어요.`, channel: "#400_customer", voice: true }).then(() => {
          let updateObj;
          updateObj = {};
          updateObj["requests." + String(requestNumber) + ".analytics.response.action"] = action;
          return back.updateClient([ { cliid }, updateObj ], { selfMongo: instance.mongo });
        }).catch((err) => {
          logger.error(err, req).catch((e) => { console.log(e); });
        });
    
        await instance.kakao.sendTalk("designerSelect", name, phone, {
          client: name,
          designer: designer,
          host: address.frontinfo.host,
          cliid: cliid,
          needs: ("style," + desid + "," + proid + "," + method),
        });
    
        res.send(JSON.stringify({ index: 0 }));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/designerProposal_policy" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        let resultObj;
        resultObj = {
          policy: DataRouter.policy(),
          button: DataRouter.policyButton(),
        };
        res.send(JSON.stringify(resultObj));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.send(JSON.stringify({
          policy: DataRouter.policy(),
          button: DataRouter.policyButton(),
        }));
      }
    });
    
    router.post([ "/designerProposal_getDesigners" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        if (req.body.whereQuery === undefined || req.body.proid === undefined) {
          throw new Error("invaild post");
        }
        const { whereQuery, proid } = equalJson(req.body);
        const thisProject = await back.getProjectById(proid, { selfMongo: instance.mongo });
        const designers = await back.getDesignersByQuery(whereQuery, { withTools: true, selfMongo: instance.mongo });
        let designersNormal;
        let designerNormal;
        let realtime;
        let thisDesigner;
        let designerMode;
    
        designerMode = false;
        if (req.body.designerMode !== undefined) {
          if (req.body.designerMode === 1 || req.body.designerMode === '1') {
            designerMode = true;
          }
        }
    
        if (!designerMode) {
          designersNormal = [];
          for (let { desid } of thisProject.proposal.detail) {
            thisDesigner = designers.find((d) => { return d.desid === desid });
            realtime = await work.realtimeDesignerMatch(desid, proid, { selfMongo: instance.mongo, selfConsoleMongo: instance.mongolocal });
            designerNormal = thisDesigner.toNormal();
            designerNormal.end = !realtime.result;
            designersNormal.push(designerNormal);
          }
          res.send(JSON.stringify(designersNormal));
        } else {
          designersNormal = [];
          for (let { desid } of designers) {
            thisDesigner = designers.find((d) => { return d.desid === desid });
            designerNormal = thisDesigner.toNormal();
            designerNormal.end = false;
            designersNormal.push(designerNormal);
          }
          res.send(JSON.stringify(designersNormal));
        }
    
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/styleCuration_getPhotos" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        const selfMongo = instance.mongo;
        const contentsArr = await back.getContentsArrByQuery({}, { selfMongo });
        const designers = await back.getDesignersByQuery({}, { selfMongo });
        const exceptionList = [
          "t16a41.jpg",
          "t1p36.jpg",
          "t1a33.jpg",
          "t1a20.jpg",
          "t2a33.jpg",
          "t5a27.jpg",
          "t8p9.jpg",
          "t13a27.jpg",
          "t19a41.jpg",
          "t1p12.jpg",
          "t9a37.jpg"
        ];
    
        let photos, sendingDesigners, temp;
    
        photos = contentsArr.getAllPhotos();
        sendingDesigners = [];
        for (let designer of designers) {
          temp = designer.toNormal();
          temp.tendency = designer.analytics.styling.tendency.toMatrix();
          sendingDesigners.push(temp);
        }
        for (let obj of photos) {
          for (let designer of designers) {
            if (obj.desid === designer.desid) {
              obj.tendency = designer.analytics.styling.tendency.toMatrix();
              break;
            }
          }
        }
        photos = photos.filter((o) => { return !/before/gi.test(o.room) && !/withdesigner/gi.test(o.room) && !exceptionList.includes(o.file) });
        photos = photos.map((o) => {
          o.keywords = o.keywords.filter((s) => { return !/아파트/gi.test(s) && !/거주중/gi.test(s) && !/아기/gi.test(s) && !/아이/gi.test(s) && !/부부/gi.test(s) && !/가족/gi.test(s) && !/소품/gi.test(s) && !/거실/gi.test(s) && !/주방/gi.test(s) && !/신축/gi.test(s) && !/서재/gi.test(s) && !/톤앤/gi.test(s) && !/스타일링/gi.test(s) && !/조명/gi.test(s) && !/오피스텔/gi.test(s) && !/홈스타일링/gi.test(s) && !/홈퍼니싱/gi.test(s) && !/토탈/gi.test(s) && !/인테리어/gi.test(s) && !/인가구/gi.test(s) && !/다이닝/gi.test(s) && !/깔끔/gi.test(s) && !/인스타/gi.test(s) && !/아이/gi.test(s); });
          return o;
        });
        photos = photos.filter((obj) => { return !obj.tendency.every((num) => { return num === 0; }); });
    
        res.send(JSON.stringify({ photos, contentsArr, designers: sendingDesigners }));
      } catch (e) {
        logger.error(e, req).catch((e) => { console.log(e); });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ error: e.message }));
      }
    });
    
    router.post([ "/styleCuration_updateCalculation" ], async function (req, res) {
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      try {
        if (req.body.cliid === undefined || req.body.historyQuery === undefined || req.body.coreQuery === undefined || req.body.mode === undefined) {
          throw new Error("invaild post");
        }
        const passPromise = () => { return new Promise((resolve, reject) => { resolve(null); }); }
        const cliid = req.body.cliid;
        const historyQuery = equalJson(req.body.historyQuery);
        const coreQuery = equalJson(req.body.coreQuery);
        const mode = req.body.mode;
        let client, history;
    
        if (DataRouter.timeouts["styleCuration_styleCheckComplete_" + cliid] !== undefined && DataRouter.timeouts["styleCuration_styleCheckComplete_" + cliid] !== null) {
          clearTimeout(DataRouter.timeouts["styleCuration_styleCheckComplete_" + cliid]);
          DataRouter.timeouts["styleCuration_styleCheckComplete_" + cliid] = null;
        }
    
        if (DataRouter.timeouts["styleCuration_pageInitComplete_" + cliid] !== undefined && DataRouter.timeouts["styleCuration_pageInitComplete_" + cliid] !== null) {
          clearTimeout(DataRouter.timeouts["styleCuration_pageInitComplete_" + cliid]);
          DataRouter.timeouts["styleCuration_pageInitComplete_" + cliid] = null;
        }
    
        history = await back.getHistoryById("client", cliid, { selfMongo: instance.mongolocal });
        if (history === null) {
          await back.createHistory("client", { cliid }, { selfMongo: instance.mongolocal, secondMongo: instance.mongo });
        }
    
        if (Object.keys(coreQuery).length > 0) {
          await back.updateClient([ { cliid }, coreQuery ], { selfMongo: instance.mongo });
        }
    
        if (Object.keys(historyQuery).length > 0) {
          await back.updateHistory("client", [ { cliid }, historyQuery ], { selfMongo: instance.mongolocal });
          history = await back.getHistoryById("client", cliid, { selfMongo: instance.mongolocal });
        }
    
        const clientCase = await back.getCaseProidById(cliid, { selfMongo: instance.mongo });
        if (clientCase === null) {
          throw new Error("invaild client case");
        } else {
          const service = clientCase.caseService();
          let detailUpdate, updateQuery;
          let newProid;
          let requestNumber;
          let action;
          let targetSerid;
    
          client = clientCase.client;
          requestNumber = 0;
    
          if ([ "부재중 알림 발송", "상세 설문 대기" ].includes(client.requests[requestNumber].analytics.response.action.value)) {
            action = "부재중 제안 발송";
          } else {
            action = "제안 발송 예정";
          }
    
          detailUpdate = [];
          updateQuery = {};
          newProid = null;
    
          targetSerid = (req.body.fromConsole !== undefined && Number(req.body.fromConsole) === 1) ? [ client.requests[requestNumber].analytics.response.service.serid ] : history.curation.service.serid;
    
          work.designerCuration(cliid, 4, targetSerid, { selfMongo: instance.mongo, selfLocalMongo: instance.mongolocal }).then((detail) => {
            for (let obj of detail) {
              detailUpdate.push(obj);
            }
    
            updateQuery["desid"] = "";
            updateQuery["proposal.status"] = "작성중";
            updateQuery["proposal.date"] = new Date();
            updateQuery["cliid"] = cliid;
            updateQuery["service.serid"] = targetSerid[0];
            if (service === null) {
              updateQuery["service.xValue"] = "B";
            } else {
              if (typeof service === "object") {
                if (Array.isArray(service.xValue)) {
                  updateQuery["service.xValue"] = (service.xValue.length === 0 ? "B" : service.xValue[0].xValue);
                  if (client.requests[requestNumber].analytics.response.service !== null && typeof client.requests[requestNumber].analytics.response.service.xValue === "string") {
                    updateQuery["service.xValue"] = client.requests[requestNumber].analytics.response.service.xValue;
                  }
                } else {
                  updateQuery["service.xValue"] = "B";
                }
              } else {
                updateQuery["service.xValue"] = "B";
              }
            }
            updateQuery["service.online"] = false;
            updateQuery["proposal.detail"] = detailUpdate;
            return back.getProjectsByQuery({ cliid }, { selfMongo: instance.mongo });
    
          }).then((rows) => {
    
            if (detailUpdate.length > 0) {
              if (rows.length > 0 && rows[0].desid === "") {
                newProid = rows[0].proid;
                return back.updateProject([ { proid: newProid }, updateQuery ], { selfMongo: instance.mongo });
              } else {
                return back.createProject(updateQuery, { selfMongo: instance.mongo });
              }
            } else {
              return passPromise();
            }
    
          }).then((proid) => {
    
            if (newProid === null) {
              newProid = proid;
            }
            return new Promise((resolve, rejects) => {
              resolve(null);
            });
    
          }).then(() => {
    
            if (Number(req.body.fromConsole) !== 1) {
              let updateObj, future, nextDate, nextNextDate;
              updateObj = {};
              updateObj["requests." + String(requestNumber) + ".analytics.response.action"] = action;
              nextDate = new Date();
              nextDate.setDate(nextDate.getDate() + 1);
              nextNextDate = new Date();
              nextNextDate.setDate(nextNextDate.getDate() + 2);
              if (client.requests[requestNumber].request.space.resident.living || client.requests[requestNumber].request.space.resident.expected.valueOf() <= nextNextDate.valueOf()) {
                updateObj["requests." + String(requestNumber) + ".request.space.resident.expected"] = nextDate;
                future = new Date();
                future.setDate(future.getDate() + serviceParsing({
                  serid: updateQuery["service.serid"],
                  xValue: updateQuery["service.xValue"],
                  online: updateQuery["service.online"],
                }, true) + 1);
                updateObj["requests." + String(requestNumber) + ".analytics.date.space.movein"] = future;
              }
    
              return back.updateClient([ { cliid }, updateObj ], { selfMongo: instance.mongo });
            } else {
              return passPromise();
            }
    
          }).then(() => {
    
            if (detailUpdate.length > 0) {
              return messageSend({ text: client.name + " 고객님의 디자이너 추천서가 자동으로 제작되었습니다!", channel: "#404_curation", voice: false });
            } else {
              return messageSend({ text: client.name + " 고객님의 디자이너 추천서를 자동으로 제작하려 했으나 매칭되는 경우가 없어요!", channel: "#404_curation", voice: false });
            }
    
          }).catch((err) => {
            console.log(err);
            messageSend({ text: client.name + " 제안서 제작 문제 생김 " + err.message, channel: "#404_curation" }).catch((e) => { console.log(e) });
          });
    
          if (Number(req.body.fromConsole) !== 1) {
            
            await instance.kakao.sendTalk("curationComplete", client.name, client.phone, {
              client: client.name,
              cliid: client.cliid,
              host: instance.address.frontinfo.host,
              path: "about",
            });
            await messageSend({ text: client.name + " 고객님께 큐레이션 완료 알림톡을 보냈어요.", channel: "#404_curation" });
            requestSystem("https://" + instance.address.officeinfo.ghost.host + ":" + String(3000) + "/storeClientAnalytics", { fast: true }, { headers: { "Content-Type": "application/json" } }).then(() => {
              return sleep(10 * 1000);
            }).then(() => {
              return requestSystem("https://" + instance.address.officeinfo.ghost.host + ":" + String(3000) + "/analyticsToday", { report: 0 }, { headers: { "Content-Type": "application/json" } });
            }).catch((err) => {
              logger.error(err, req).catch((e) => { console.log(e); });
            });
          }
          res.send(JSON.stringify({ service: [], client: client.toNormal(), history }));
        }
      } catch (e) {
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


