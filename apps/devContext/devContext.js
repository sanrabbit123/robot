/**
 * 현재 작업 디렉토리 경로를 저장합니다.
 * @constant {string}
 */
const ROBOT_PATH = process.cwd(); // Node.js에서 현재 프로세스의 작업 디렉토리 경로를 반환하는 메서드입니다.

/**
 * 앱 폴더 경로를 설정합니다. 
 * @constant {string}
 */
const APP_PATH = ROBOT_PATH + "/apps"; // 현재 작업 디렉토리 경로에 "/apps"를 추가하여 앱 폴더의 경로를 만듭니다.

/**
 * Mother 클래스를 불러옵니다.
 * Mother는 MongoDB 연결 및 기타 유틸리티 메서드를 제공하는 클래스입니다.
 * @constant {Mother}
 */
const Mother = require(APP_PATH + "/mother.js"); // apps 폴더에서 Mother 클래스를 불러와 MongoDB 관련 유틸리티를 사용할 수 있게 합니다. Mother는 다양한 유틸리티 메서드를 제공합니다. 

/**
 * BackMaker 클래스를 불러옵니다.
 * BackMaker는 백엔드 작업을 관리하는 클래스입니다.
 * @constant {BackMaker}
 */
const BackMaker = require(APP_PATH + "/backMaker/backMaker.js"); // backMaker 모듈을 불러옵니다. 이 클래스는 백엔드 관련 작업을 관리하고, MongoDB와 관련된 다양한 기능을 수행합니다.

/**
 * BackReport 클래스를 불러옵니다.
 * BackReport는 백엔드에서 보고서를 생성하고 관리하는 기능을 담당하는 클래스입니다.
 * @constant {BackReport}
 */
const BackReport = require(APP_PATH + "/backMaker/backReport.js"); // backReport 모듈을 불러와 백엔드 보고서 관련 작업을 수행합니다.

/**
 * BackWorker 클래스를 불러옵니다.
 * 백그라운드에서 처리되는 작업을 관리합니다.
 * @constant {BackWorker}
 */
const BackWorker = require(APP_PATH + "/backMaker/backWorker.js"); // 백그라운드 작업을 관리하는 BackWorker 클래스를 불러옵니다.

/**
 * GoogleSheet 클래스를 불러옵니다.
 * 구글 시트와의 연동을 위해 사용되는 클래스입니다.
 * @constant {GoogleSheet}
 */
const GoogleSheet = require(APP_PATH + "/googleAPIs/googleSheet.js"); // Google Sheet API와 통신하는 클래스입니다. 스프레드시트 데이터를 읽거나 쓰는 작업을 할 수 있습니다.

/**
 * GoogleCalendar 클래스를 불러옵니다.
 * 구글 캘린더와의 연동을 위한 클래스입니다.
 * @constant {GoogleCalendar}
 */
const GoogleCalendar = require(APP_PATH + "/googleAPIs/googleCalendar.js"); // 구글 캘린더 API와 통신하는 클래스입니다. 일정 관리 및 이벤트 추가 작업을 할 수 있습니다.

/**
 * GoogleChrome 클래스를 불러옵니다.
 * 구글 크롬과 연동하는 기능을 제공합니다.
 * @constant {GoogleChrome}
 */
const GoogleChrome = require(APP_PATH + "/googleAPIs/googleChrome.js"); // 구글 크롬을 통해 스크립트를 실행하거나 자동화하는 작업을 수행할 수 있는 클래스입니다.

/**
 * NaverAPIs 클래스를 불러옵니다.
 * 네이버 API를 활용한 다양한 작업을 수행하는 클래스입니다.
 * @constant {NaverAPIs}
 */
const NaverAPIs = require(APP_PATH + "/naverAPIs/naverAPIs.js"); // 네이버 API와 통신하기 위한 클래스입니다. 검색, 번역 등 네이버의 다양한 API 기능을 사용할 수 있습니다.

/**
 * KakaoTalk 클래스를 불러옵니다.
 * 카카오톡 API를 활용한 메시지 전송 등의 작업을 수행하는 클래스입니다.
 * @constant {KakaoTalk}
 */
const KakaoTalk = require(APP_PATH + "/kakaoTalk/kakaoTalk.js"); // 카카오톡 API와 통신하여 템플릿 메시지를 보내거나 채팅방을 관리하는 기능을 수행할 수 있습니다.

/**
 * ParsingHangul 클래스를 불러옵니다.
 * 한글 텍스트 파싱을 위한 클래스입니다.
 * @constant {ParsingHangul}
 */
const ParsingHangul = require(APP_PATH + "/parsingHangul/parsingHangul.js"); // 한글 텍스트를 처리하거나 파싱하는 기능을 제공하는 클래스입니다.

/**
 * BillMaker 클래스를 불러옵니다.
 * 청구서 생성 기능을 제공하는 클래스입니다.
 * @constant {BillMaker}
 */
const BillMaker = require(APP_PATH + "/billMaker/billMaker.js"); // 청구서를 생성하거나 데이터를 바탕으로 청구 작업을 처리하는 클래스를 불러옵니다.

/**
 * HumanPacket 클래스를 불러옵니다.
 * 사용자 데이터를 관리하는 클래스입니다.
 * @constant {HumanPacket}
 */
const HumanPacket = require(APP_PATH + "/humanPacket/humanPacket.js"); // 사용자 데이터 처리 및 관리에 사용되는 클래스입니다.

/**
 * PortfolioFilter 클래스를 불러옵니다.
 * 포트폴리오 필터링 작업을 담당하는 클래스입니다.
 * @constant {PortfolioFilter}
 */
const PortfolioFilter = require(APP_PATH + "/portfolioFilter/portfolioFilter.js"); // 포트폴리오 데이터를 필터링하는 작업을 처리하는 클래스입니다.

/**
 * ImageReader 클래스를 불러옵니다.
 * 이미지 파일을 읽고 처리하는 클래스입니다.
 * @constant {ImageReader}
 */
const ImageReader = require(APP_PATH + "/imageReader/imageReader.js"); // 이미지 파일을 읽고 분석하는 기능을 제공하는 클래스입니다.

/**
 * DevContext 클래스는 개발자에게 편리한 환경을 제공하기 위한 클래스입니다.
 * MongoDB 연결과 파일 시스템 작업, 스크립트 실행, Google API 통합 등의 다양한 작업을 지원합니다.
 */
class DevContext {
  /**
   * DevContext 클래스의 인스턴스를 초기화합니다.
   * - Mother 클래스 인스턴스를 생성하여 MongoDB 및 다양한 유틸리티 메서드를 사용합니다.
   * - BackMaker 인스턴스를 생성하여 백엔드 작업을 처리할 수 있습니다.
   * - MongoDB 연결을 위한 MONGOC 인스턴스를 생성합니다.
   */
  constructor () {
    /**
     * Mother 클래스의 인스턴스를 생성하여 MongoDB 유틸리티 및 다양한 기능에 접근할 수 있게 합니다.
     * @type {Mother}
     */
    this.mother = new Mother(); // Mother 클래스의 인스턴스를 생성합니다. Mother 클래스는 MongoDB 연결 정보와 다양한 유틸리티 메서드를 제공합니다.
    
    /**
     * BackMaker 클래스의 인스턴스를 생성합니다.
     * 백엔드 작업을 관리하는 BackMaker 클래스입니다.
     * @type {BackMaker}
     */
    this.back = new BackMaker(); // BackMaker 클래스의 인스턴스를 생성합니다. 백엔드 작업을 관리하고, MongoDB와 관련된 다양한 기능을 수행합니다.

    /**
     * MongoDB와 관련된 정보 및 MongoDB 클라이언트를 Mother 클래스에서 가져옵니다.
     * 이를 통해 데이터베이스 연결을 설정할 수 있습니다.
     * @type {MongoClient}
     */
    const { mongo, mongoinfo, mongolocalinfo, mongoconsoleinfo, mongotestinfo } = this.mother; // Mother 클래스에서 MongoDB 관련 정보를 가져와서 MongoClient를 구성합니다.

    /**
     * MongoDB 연결 클라이언트 인스턴스를 생성합니다.
     * @type {MongoClient}
     */
    this.MONGOC = new mongo(mongoinfo); // Mother에서 가져온 MongoClient를 사용하여 MongoDB에 연결할 수 있습니다.

    /**
     * 애플리케이션에 필요한 정보를 가져옵니다.
     * @type {Object}
     */
    this.address = require(`${process.cwd()}/apps/infoObj.js`); // 애플리케이션의 정보 객체를 불러옵니다. 이 객체에는 다양한 설정 정보가 포함되어 있습니다.

    /**
     * DevContext 작업 디렉토리 경로를 설정합니다.
     * @type {string}
     */
    this.dir = `${process.cwd()}/apps/devContext`; // DevContext 클래스에서 사용되는 파일 및 데이터를 처리할 디렉토리 경로를 설정합니다.
  }
}

/**
 * @method launching
 * @description 개발자가 사용하는 임시 스크립트를 실행하기 위한 메서드입니다. 
 * MongoDB 연결과 다양한 작업을 비동기 방식으로 처리합니다.
 * @returns {Promise<void>}
 */
DevContext.prototype.launching = async function () {
  /**
   * 현재 DevContext 인스턴스를 가리키는 변수입니다.
   * 이 메서드 내부에서 this의 참조를 유지하기 위해 사용됩니다.
   * @type {DevContext}
   */
  const instance = this; // DevContext의 인스턴스를 가리키는 변수입니다. 내부에서 this를 사용할 수 있도록 합니다.

  /**
   * Mother 클래스에서 가져온 MongoDB 관련 정보 및 메서드를 구조 분해 할당합니다.
   * 이 메서드는 mongoDB 연결 및 데이터를 다루는 다양한 기능을 제공합니다.
   */
  const { mongo, mongoinfo, mongolocalinfo, mongoconsoleinfo, mongotestinfo, mongoofficeinfo } = this.mother; // Mother 클래스에서 가져온 MongoDB 관련 유틸리티들을 구조 분해 할당합니다.

  /**
   * Mother 클래스의 여러 유틸리티 메서드를 구조 분해 할당합니다.
   * consoleQ, fileSystem, shellExec 등의 메서드를 사용할 수 있습니다.
   * equalJson: JSON.parse보다 강력한 메서드로, Date 객체를 살리면서 deepcopy를 할 수 있습니다.
   */
  const { consoleQ, fileSystem, copyToClipboard, setQueue, shellExec, shellLink, http2InNode, orderSystem, stringToJson, jsonToString, ghostFileUpload, chromeOpen, curlRequest, diskReading, requestSystem, objectDeepCopy, ajaxJson, uniqueValue, getDateMatrix, generalFileUpload, promiseTimeout, mysqlQuery, headRequest, binaryRequest, cryptoString, decryptoHash, treeParsing, appleScript, sleep, equalJson, copyJson, pythonExecute, autoComma, dateToString, stringToDate, ipParsing, ipCheck, leafParsing, errorLog, messageLog, messageSend, pureServer, s3FileDelete, sendMessage, hexaJson, promiseTogether, serviceParsing, localUnique, processSystem, sha256Hmac, variableArray, autoHypenPhone, designerCareer, emergencyAlarm, mediaQuery, zeroAddition, linkToString, stringToLink, aliveLog, cronLog, alertLog, homeliaisonAnalytics, aliveMongo, getHoliday, capitalizeString } = this.mother; // Mother 클래스에서 제공하는 다양한 유틸리티 메서드를 구조 분해 할당하여 사용합니다. 여기서 equalJson은 JSON 데이터를 깊이 복사하거나 Date 객체를 살릴 때 사용됩니다.

  try {
    /**
     * MongoDB에 연결합니다. MONGOC는 Mother 클래스에서 생성한 MongoClient 인스턴스입니다.
     * @async
     */
    await this.MONGOC.connect(); // MongoDB에 연결을 시도합니다. MongoClient를 이용해 데이터를 다루는 다양한 작업을 할 수 있습니다.
    /**
     * 주소 정보를 저장하는 변수입니다. 이 정보는 앱 전체에서 사용됩니다.
     * @type {Object}
     */
    const address = this.address; // 애플리케이션에서 사용되는 주소 정보를 가져옵니다.
    /**
     * 백엔드 작업을 처리하는 BackMaker 인스턴스입니다.
     * @type {BackMaker}
     */
    const back = this.back; // 백엔드 작업을 처리하는 BackMaker 인스턴스를 참조합니다.
    /**
     * 백그라운드에서 실행할 작업을 관리하는 BackWorker 인스턴스를 생성합니다.
     * @type {BackWorker}
     */
    const work = new BackWorker(); // 백그라운드 작업을 관리하는 BackWorker 인스턴스를 생성합니다.
    /**
     * 작업에 사용할 Google 드라이브의 부모 폴더 ID입니다.
     * @type {string}
     */
    const parent = "1XrxI7BRC8S9ZZ96ZtJf1cq5T_2rACjQJ"; // Google 드라이브에서 작업을 수행할 때 사용할 부모 폴더 ID입니다.
    /**
     * GoogleSheet 인스턴스를 생성하여 Google 스프레드시트와의 통신을 처리합니다.
     * @type {GoogleSheet}
     */
    const sheets = new GoogleSheet(); // Google 스프레드시트와 통신하는 인스턴스를 생성합니다.
    /**
     * BillMaker 인스턴스를 생성하여 청구서와 관련된 작업을 처리합니다.
     * @type {BillMaker}
     */
    const bill = new BillMaker(); // 청구서 관련 작업을 처리할 BillMaker 인스턴스를 생성합니다.
    /**
     * Google Chrome과의 통신을 처리하는 인스턴스를 생성합니다.
     * @type {GoogleChrome}
     */
    const chrome = new GoogleChrome(); // 구글 크롬을 통해 자동화 작업을 수행할 수 있는 GoogleChrome 인스턴스를 생성합니다.
    /**
     * findCode 메서드를 현재 컨텍스트로 바인딩하여 문자열 검색 기능을 수행합니다.
     * @method
     */
    const findCode = this.findCode.bind(this); // findCode 메서드를 현재 DevContext 인스턴스에 바인딩하여 문자열 검색을 수행할 수 있도록 합니다.




    // =====================================================================================================================
    // kakao template json 처리

    // const kakao = new KakaoTalk(); // KakaoTalk API를 통해 템플릿 메시지를 가져오는 기능입니다.
    // const json = await kakao.getTemplate(); // 템플릿을 가져옵니다.
    // await fileSystem(`writeJson`, [ `${process.cwd()}/temp/kakaoJson.json`, json ]); // 가져온 템플릿을 JSON 파일로 저장합니다.
    // await shellExec(`code`, [ `${process.cwd()}/temp/kakaoJson.json` ]); // 저장된 템플릿 파일을 코드 편집기로 엽니다.
    // =====================================================================================================================
    
    // =====================================================================================================================
    // certbot 작업 처리
    
    // await this.certRefreshing(); // certbot 인증서를 갱신하는 작업을 수행합니다.
    // =====================================================================================================================
    
















    /**
     * MongoDB 연결을 종료합니다. 이 작업은 스크립트가 끝날 때 반드시 수행되어야 합니다.
     * @async
     */
    await this.MONGOC.close(); // 작업이 완료되면 MongoDB 연결을 안전하게 종료합니다.
    console.log(`done`); // 작업이 성공적으로 완료되었음을 콘솔에 출력합니다.
  } catch (e) {
    /**
     * 오류가 발생하면 이를 콘솔에 출력합니다.
     * @param {Error} e - 발생한 오류 객체
     */
    console.log(e); // 작업 중 발생한 오류를 출력합니다.
    await this.MONGOC.close(); // 오류가 발생하더라도 MongoDB 연결을 종료합니다.
    console.log(`error`); // 오류 발생 후 이를 알리는 메시지를 출력합니다.
  }
}

/**
 * @method findCode
 * @description robot 앱 내에서 특정 단어나 문자열을 찾기 위한 메서드입니다. 주어진 문자열을 파일 내에서 검색하고, 그 결과를 반환합니다.
 * @param {string} str - 검색할 문자열입니다. 반드시 문자열이어야 하며, 그렇지 않으면 오류를 발생시킵니다.
 * @returns {Promise<Object>} - 검색 결과를 포함한 객체를 반환합니다.
 */
DevContext.prototype.findCode = async function (str) {
  /**
   * 주어진 입력값이 문자열인지 확인합니다. 문자열이 아니면 오류를 발생시킵니다.
   * @param {any} str - 입력된 값이 문자열인지 확인합니다.
   * @throws {Error} 문자열이 아닌 경우 "invalid input" 오류를 발생시킵니다.
   */
  if (typeof str !== "string") {
    throw new Error("invalid input"); // 입력값이 문자열이 아니면 오류를 발생시킵니다.
  }

  /**
   * DevContext 인스턴스를 가리키는 참조 변수입니다. 내부에서 this의 참조를 유지하기 위해 사용됩니다.
   * @type {DevContext}
   */
  const instance = this; // DevContext의 인스턴스를 가리키는 변수입니다.

  /**
   * Mother 클래스에서 가져온 유틸리티 메서드를 구조 분해 할당합니다.
   * treeParsing: 파일 트리를 파싱하는 메서드로, 디렉토리 내 파일을 탐색합니다.
   * fileSystem: 파일 시스템 작업을 수행하는 메서드입니다.
   * shellExec: 쉘 명령어를 실행하는 메서드입니다.
   * shellLink: 경로 문자열을 쉘에서 사용할 수 있도록 변환하는 메서드입니다.
   */
  const { treeParsing, fileSystem, shellExec, shellLink } = this.mother; // Mother 클래스에서 제공하는 유틸리티 메서드를 사용합니다.

  /**
   * 검색할 파일의 엔트리 포인트 배열입니다. robot.js와 setup.py 파일을 대상으로 검색을 수행합니다.
   * @constant {Array<string>}
   */
  const entryPoints = [ "robot.js", "setup.py" ]; // 특정 엔트리 포인트 파일들을 정의합니다. 이 파일들에서 문자열 검색을 수행합니다.

  /**
   * 주어진 문자열에서 특수 문자를 이스케이프 처리하는 함수입니다. 정규 표현식에서 사용할 수 있도록 특수 문자를 처리합니다.
   * @param {string} s - 이스케이프 처리할 문자열입니다.
   * @returns {string} - 이스케이프 처리된 문자열을 반환합니다.
   */
  const escapeReg = function (s) {
    s = s.replace(/\*/gi, "\\*"); // "*" 문자를 이스케이프 처리합니다.
    s = s.replace(/\+/gi, "\\+"); // "+" 문자를 이스케이프 처리합니다.
    s = s.replace(/\^/gi, "\\^"); // "^" 문자를 이스케이프 처리합니다.
    s = s.replace(/\(/gi, "\\("); // "(" 문자를 이스케이프 처리합니다.
    s = s.replace(/\)/gi, "\\)"); // ")" 문자를 이스케이프 처리합니다.
    s = s.replace(/\[/gi, "\\["); // "[" 문자를 이스케이프 처리합니다.
    s = s.replace(/\]/gi, "\\]"); // "]" 문자를 이스케이프 처리합니다.
    s = s.replace(/\./gi, "\\."); // "." 문자를 이스케이프 처리합니다.
    s = s.replace(/\=/gi, "\\="); // "=" 문자를 이스케이프 처리합니다.
    s = s.replace(/\&/gi, "\\&"); // "&" 문자를 이스케이프 처리합니다.
    s = s.replace(/\-/gi, "\\-"); // "-" 문자를 이스케이프 처리합니다.
    s = s.replace(/\$/gi, "\\$"); // "$" 문자를 이스케이프 처리합니다.
    s = s.replace(/\//gi, "\\/"); // "/" 문자를 이스케이프 처리합니다.
    return s; // 이스케이프 처리된 문자열을 반환합니다.
  };

  try {
    let targets, script, report; // 검색 대상 파일 목록, 스크립트 내용, 검색 결과 보고서 변수를 선언합니다.

    /**
     * 검색 문자열을 이스케이프 처리하여 정규 표현식에서 사용할 수 있도록 변환합니다.
     * @type {string}
     */
    str = escapeReg(str); // 검색 문자열을 이스케이프 처리합니다.

    /**
     * treeParsing 메서드를 사용하여 apps 디렉토리 내의 모든 파일을 검색 대상에 추가하고, entryPoints의 파일 경로도 함께 포함합니다.
     * treeParsing은 디렉토리 구조를 순회하며 파일 목록을 반환합니다.
     * flatDeath는 해당 디렉토리 내의 모든 파일 정보를 포함하는 배열입니다.
     * @type {Array<string>}
     */
    targets = (await treeParsing(`${process.cwd()}/apps`)).flatDeath.filter((obj) => { return !obj.directory; }).map((obj) => { return obj.absolute; }).concat(entryPoints.map((i) => { return process.cwd() + "/" + i; })); // apps 디렉토리 내 모든 파일과 엔트리 포인트 파일을 검색 대상으로 설정합니다.

    /**
     * 검색 결과를 저장할 객체입니다. 검색 문자열과 일치하는 파일을 기록합니다.
     * @type {Object}
     * @property {Date} date - 검색을 수행한 날짜입니다.
     * @property {string} input - 입력된 검색 문자열입니다.
     * @property {RegExp} target - 정규 표현식으로 변환된 검색 문자열입니다.
     * @property {Array<string>} scripts - 검색 문자열이 포함된 파일 경로 목록입니다.
     */
    report = {
      date: new Date(), // 현재 날짜를 기록합니다.
      input: str, // 사용자가 입력한 검색 문자열을 기록합니다.
      target: new RegExp(str, 'g'), // 입력된 문자열을 정규 표현식으로 변환하여 기록합니다.
      scripts: [] // 검색 문자열이 포함된 파일 목록을 저장할 배열입니다.
    };

    /**
     * 검색 대상 파일 목록을 순회하면서 각 파일에서 검색 문자열을 찾습니다.
     * fileSystem 메서드를 사용하여 파일의 내용을 읽어옵니다.
     */
    for (let absolute of targets) {
      script = await fileSystem(`readString`, [ absolute ]); // fileSystem 메서드를 사용해 파일 내용을 읽어옵니다.
      if ((new RegExp(str, 'g')).test(script)) { // 파일 내용에 검색 문자열이 포함되어 있는지 확인합니다.
        report.scripts.push(absolute.replace(new RegExp('^' + escapeReg(process.cwd())), '')); // 검색 문자열이 포함된 파일의 경로를 기록합니다.
      }
    }

    /**
     * 검색 결과를 콘솔에 출력합니다.
     * @type {void}
     */
    console.log(report); // 검색 결과를 콘솔에 출력합니다.

    /**
     * 검색 결과 객체를 반환합니다.
     * @returns {Object} - 검색된 파일 목록을 포함하는 객체입니다.
     */
    return report; // 검색 결과를 반환합니다.
  } catch (e) {
    /**
     * 오류가 발생한 경우 이를 콘솔에 출력합니다.
     * @param {Error} e - 발생한 오류 객체입니다.
     * @type {void}
     */
    console.log(e); // 오류가 발생하면 이를 출력합니다.
  }
};

/**
 * @method certRefreshing
 * @description 서버의 인증서를 갱신하는 메서드입니다. Certbot을 사용하여 SSL 인증서를 갱신하고, 서버에 필요한 인증 파일을 복사합니다.
 * @returns {Promise<void>}
 */
DevContext.prototype.certRefreshing = async function () {
  /**
   * 현재 DevContext 인스턴스를 참조하는 변수입니다.
   * 메서드 내부에서 this의 참조를 유지하기 위해 사용됩니다.
   * @type {DevContext}
   */
  const instance = this; // DevContext 인스턴스를 참조하는 변수입니다.

  /**
   * BackMaker 인스턴스를 참조하는 변수입니다. 백엔드 작업을 처리하기 위해 사용됩니다.
   * @type {BackMaker}
   */
  const back = this.back; // BackMaker 인스턴스를 참조하여 백엔드 작업을 처리합니다.

  /**
   * Mother 클래스에서 가져온 fileSystem, shell, shellLink 유틸리티 메서드를 구조 분해 할당합니다.
   * fileSystem: 파일 시스템 작업을 처리하는 메서드입니다.
   * shell: 쉘 명령어를 실행하는 메서드입니다.
   * shellLink: 파일 경로를 쉘에서 사용할 수 있도록 변환하는 메서드입니다.
   */
  const { fileSystem, shell, shellLink } = this.mother; // Mother 클래스에서 파일 시스템 작업과 쉘 명령어를 처리할 메서드를 불러옵니다.

  try {
    /**
     * Certbot 디렉토리 경로를 지정합니다. 환경 변수 HOME을 사용하여 사용자 홈 디렉토리를 기준으로 경로를 설정합니다.
     * @type {string}
     */
    const certbotFolder = process.env.HOME + "/certbot"; // Certbot 디렉토리의 경로를 설정합니다.

    /**
     * Certbot 폴더 내의 파일 및 디렉토리 목록을 가져오고, ".DS_Store" 파일은 제외한 목록을 생성합니다.
     * @type {Array<string>}
     */
    const certbotFolderList = (await fileSystem(`readDir`, [ certbotFolder ])).filter((i) => { return i !== ".DS_Store"; }); // Certbot 디렉토리에서 ".DS_Store" 파일을 제외한 모든 파일과 폴더 목록을 가져옵니다.

    /**
     * 각 Certbot 폴더의 설정을 처리하는 함수입니다. 폴더 내에서 필요한 인증서 파일을 찾고, 서버에 복사합니다.
     * @param {string} certFolder - Certbot 인증서 파일이 저장된 폴더 경로입니다.
     * @throws {Error} 입력된 certFolder가 유효하지 않으면 오류를 발생시킵니다.
     * @returns {Promise<void>}
     */
    const certSetting = async function (certFolder) {
      /**
       * 입력된 certFolder가 문자열이 아니면 오류를 발생시킵니다.
       * @throws {Error} 유효하지 않은 입력값에 대해 오류를 발생시킵니다.
       */
      if (typeof certFolder !== "string") {
        throw new Error("invalid input"); // certFolder가 문자열이 아닐 경우 오류를 발생시킵니다.
      }

      /**
       * certFolder 경로에 "/" 문자가 없으면 오류를 발생시킵니다.
       * @throws {Error} 경로가 올바르지 않으면 오류를 발생시킵니다.
       */
      if (!/\//gi.test(certFolder)) {
        throw new Error("invalid input"); // certFolder 경로가 올바르지 않으면 오류를 발생시킵니다.
      }

      try {
        /**
         * 현재 작업 디렉토리 경로를 가져옵니다.
         * @type {string}
         */
        const robotFolder = process.cwd(); // 현재 작업 디렉토리 경로를 가져옵니다.

        /**
         * 서버에서 인증서를 저장할 폴더 경로를 설정합니다.
         * @type {string}
         */
        const robotPems = robotFolder + "/" + "pems"; // 서버에서 인증서를 저장할 경로를 설정합니다.

        /**
         * Certbot 인증서 폴더 내의 파일 목록을 가져오고, ".DS_Store" 파일은 제외합니다.
         * @type {Array<string>}
         */
        const targetFolderList = (await fileSystem(`readDir`, [ certFolder ])).filter((i) => { return i !== ".DS_Store"; }); // Certbot 인증서 폴더 내에서 ".DS_Store" 파일을 제외한 파일 목록을 가져옵니다.

        /**
         * 인증서 폴더 이름에서 사이트 이름을 추출합니다.
         * @type {string}
         */
        const siteName = certFolder.split('/')[certFolder.split('/').length - 1]; // Certbot 폴더 이름에서 사이트 이름을 추출합니다.

        /**
         * Nginx에서 사용할 사이트 폴더 이름을 설정합니다.
         * @type {string}
         */
        const siteNginx = siteName + "_nginx"; // Nginx에서 사용할 사이트 폴더 이름을 설정합니다.

        /**
         * 인증서 파일을 복사할 하위 디렉토리 목록을 정의합니다.
         * @type {Array<Object>}
         */
        const children = [
          { name: "ca", regexp: "chain" }, // CA 체인 파일을 저장할 디렉토리
          { name: "cert", regexp: "cert" }, // 인증서 파일을 저장할 디렉토리
          { name: "key", regexp: "key" }, // 키 파일을 저장할 디렉토리
          { name: "etc", regexp: null } // 기타 파일을 저장할 디렉토리
        ];

        let tempArr; // 임시 배열을 선언합니다.
        let cert, chain, fullChain; // 인증서, 체인, 전체 체인 정보를 저장할 변수를 선언합니다.

        /**
         * Certbot 폴더 내의 각 디렉토리를 생성합니다.
         */
        shell.exec(`mkdir ${shellLink(certFolder + "/" + siteName)}`); // Certbot 폴더 내에 새로운 디렉토리를 생성합니다.
        shell.exec(`mkdir ${shellLink(certFolder + "/" + siteNginx)}`); // Nginx용 폴더도 생성합니다.

        /**
         * children 배열의 각 하위 디렉토리를 생성하고, 필요한 파일을 복사합니다.
         */
        for (let { name, regexp } of children) {
          shell.exec(`mkdir ${shellLink(certFolder + "/" + siteName + "/" + name)}`); // 각 하위 디렉토리를 생성합니다.
          shell.exec(`mkdir ${shellLink(certFolder + "/" + siteNginx + "/" + name)}`); // Nginx용 디렉토리도 생성합니다.
          if (regexp !== null) {
            tempArr = targetFolderList.filter((i) => { return (new RegExp(regexp, "gi")).test(i); }); // 정규식을 이용해 필요한 파일을 필터링합니다.
            for (let i of tempArr) {
              shell.exec(`cp ${shellLink(certFolder)}/${i} ${shellLink(certFolder + "/" + siteName + "/" + name)}`); // 파일을 복사합니다.
              shell.exec(`cp ${shellLink(certFolder)}/${i} ${shellLink(certFolder + "/" + siteNginx + "/" + name)}`); // Nginx 폴더로도 복사합니다.
            }
          }
        }

        /**
         * 인증서, 체인, 전체 체인 파일을 읽어와 trim()을 통해 불필요한 줄바꿈을 제거합니다.
         */
        cert = (await fileSystem(`readString`, [ certFolder + "/" + targetFolderList.find((i) => { return /^cert/.test(i); }) ])).trim().replace(/\n$/gi, '').replace(/\n$/gi, '').replace(/\n$/gi, '').trim(); // 인증서 파일을 읽고, 불필요한 줄바꿈을 제거합니다.
        chain = (await fileSystem(`readString`, [ certFolder + "/" + targetFolderList.find((i) => { return /^chain/.test(i); }) ])).trim().replace(/\n$/gi, '').replace(/\n$/gi, '').replace(/\n$/gi, '').trim(); // 체인 파일을 읽고, 줄바꿈을 제거합니다.
        fullChain = (await fileSystem(`readString`, [ certFolder + "/" + targetFolderList.find((i) => { return /^full/.test(i); }) ])).trim().replace(/\n$/gi, '').replace(/\n$/gi, '').replace(/\n$/gi, '').trim(); // 전체 체인 파일을 읽고, 줄바꿈을 제거합니다.

        /**
         * 인증서 파일에 전체 체인 정보를 추가하여 저장합니다.
         */
        await fileSystem(`write`, [ certFolder + "/" + targetFolderList.find((i) => { return /^cert/.test(i); }), (cert + "\n" + chain + "\n" + fullChain) ]); // 인증서 파일에 체인 정보를 추가하여 저장합니다.

        /**
         * 복사된 인증서 파일을 Nginx 폴더로 복사합니다.
         */
        shell.exec(`cp ${shellLink(certFolder)}/${targetFolderList.find((i) => { return /^cert/.test(i); })} ${shellLink(certFolder + "/" + siteNginx + "/cert")}`); // Nginx 폴더로 인증서 파일을 복사합니다.

        /**
         * 모든 인증서 파일을 서버의 pems 폴더로 복사합니다.
         */
        shell.exec(`cp -r ${shellLink(certFolder + "/" + siteName)} ${shellLink(robotPems)}`); // pems 폴더로 인증서 파일을 복사합니다.
        shell.exec(`cp -r ${shellLink(certFolder + "/" + siteNginx)} ${shellLink(robotPems)}`); // Nginx용 파일도 복사합니다.

        /**
         * 인증서 갱신이 완료되었음을 알리는 메시지를 출력합니다.
         */
        console.log(siteName, "done"); // 인증서 갱신 완료 메시지를 출력합니다.
      } catch (e) {
        /**
         * 인증서 설정 중 오류가 발생한 경우 이를 콘솔에 출력합니다.
         * @param {Error} e - 발생한 오류 객체입니다.
         */
        console.log(e); // 오류가 발생하면 이를 출력합니다.
      }
    };

    /**
     * Certbot 폴더 리스트를 순회하며 각 폴더에 대해 certSetting 함수를 호출하여 인증서를 갱신합니다.
     */
    for (let c of certbotFolderList) {
      await certSetting(certbotFolder + "/" + c); // 각 Certbot 폴더에 대해 인증서를 갱신합니다.
    }

  } catch (e) {
    /**
     * 전체 과정 중 오류가 발생한 경우 이를 콘솔에 출력합니다.
     * @param {Error} e - 발생한 오류 객체입니다.
     */
    console.log(e); // 오류가 발생하면 이를 출력합니다.
  }
};

module.exports = DevContext;
