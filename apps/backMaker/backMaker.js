/**
 * @class BackMaker
 * @description 이 클래스는 백엔드 관련 작업을 관리하기 위한 도구로, MongoDB 데이터베이스와 관련된 여러 기능을 제공합니다.
 */
class BackMaker {
  /**
   * @constructor
   * @description BackMaker 클래스의 인스턴스를 초기화합니다.
   * - Mother 클래스를 인스턴스화하여 이 클래스의 메서드와 속성에 접근할 수 있습니다.
   * - 다양한 디렉토리 경로를 설정합니다.
   */
  constructor() {
    // Mother 클래스를 현재 작업 디렉토리에서 가져옵니다.
    const Mother = require(process.cwd() + "/apps/mother.js");
    
    // 정보 객체를 가져옵니다.
    const ADDRESS = require(process.cwd() + "/apps/infoObj.js");
    
    // Mother 클래스의 인스턴스를 생성하여 mother 속성에 할당합니다.
    this.mother = new Mother();
    
    // 가져온 정보 객체를 address 속성에 할당합니다.
    this.address = ADDRESS;
    
    // backMaker 관련 작업 디렉토리 경로를 설정합니다.
    this.dir = process.cwd() + "/apps/backMaker";
    
    // map 디렉토리 경로를 설정합니다.
    this.mapDir = this.dir + "/alive";
    
    // 임시 파일을 저장할 temp 디렉토리 경로를 설정합니다.
    this.tempDir = process.cwd() + "/temp";
    
    // alive 관련 파일을 저장할 디렉토리 경로를 설정합니다.
    this.aliveDir = this.dir + "/alive";
    
    // id 필터 관련 파일을 저장할 디렉토리 경로를 설정합니다.
    this.idFilterDir = this.dir + "/idFilter";
  }

  /**
   * @static
   * @property {Array<string>} allDatabaseNames
   * @description 모든 데이터베이스의 이름을 포함하는 배열입니다.
   */
  static allDatabaseNames = [
    "mongoinfo",
  ];

  /**
   * @static
   * @property {Array<Array<string|Array<string>>>} coreDatabaseNames
   * @description 핵심 데이터베이스 이름과 관련된 컬렉션들의 이름을 포함하는 배열입니다.
   */
  static coreDatabaseNames = [
    [
      "mongoinfo",  // 데이터베이스 이름
      [
        "aspirant",
        "builder",
        "client",
        "project",
        "designer",
        "contents",
      ]
    ]
  ];

  /**
   * @static
   * @property {Array<Array<string|Array<string>>>} frontDatabaseNames
   * @description 프론트엔드와 관련된 데이터베이스 이름과 컬렉션들의 이름을 포함하는 배열입니다.
   */
  static frontDatabaseNames = [
    [
      "mongoinfo",  // 데이터베이스 이름
      [
        "designer",
        "contents"
      ]
    ]
  ];

  /**
   * @static
   * @property {Array<string>} flatDeathCollections
   * @description 삭제 또는 비활성화 상태의 컬렉션 이름들을 포함하는 배열입니다.
   */
  static flatDeathCollections = [
    "aspirant",
    "client",
    "contents",
    "designer",
    "project",
  ];

  /**
   * @static
   * @property {Object} filters
   * @description 여러 필터링 기능을 제공하는 메서드들을 포함하는 객체입니다.
   */
  static filters = {
    /**
     * @method emailFilter
     * @description 주어진 문자열에서 이메일 주소를 추출하는 필터입니다.
     * @param {string} str - 이메일 주소를 포함할 수 있는 문자열입니다.
     * @returns {string} 추출된 이메일 주소를 반환합니다. 없으면 빈 문자열을 반환합니다.
     */
    emailFilter: function (str) {
      let strArr, email;

      // 문자열을 공백을 기준으로 분할하여 배열로 변환합니다.
      strArr = str.split(' ');

      // 배열의 각 요소에서 이메일 형식에 맞는 부분을 찾습니다.
      for (let i of strArr) {
        if (/@/.test(i)) { email = i; }
      }

      // 이메일이 발견되면 공백을 제거하고 반환합니다.
      if (email !== undefined) {
        return email.trim();
      } else {
        // 이메일이 없으면 빈 문자열을 반환합니다.
        return '';
      }
    },

    /**
     * @method dateFilter
     * @description 주어진 날짜 문자열을 올바른 형식으로 변환하는 필터입니다.
     * @param {string} raw - 변환할 날짜 문자열입니다.
     * @param {Object} mother - Mother 클래스의 인스턴스입니다.
     * @returns {string} 변환된 날짜 문자열을 반환합니다.
     */
    dateFilter: function (raw, mother) {
      const EMPTYDATE = "9999-09-09";  // 날짜가 유효하지 않은 경우 반환할 기본 날짜
      const { a18_timeline } = mother;  // Mother 인스턴스에서 타임라인을 가져옵니다.
      
      // 현재 날짜를 배열로 변환합니다.
      const currentDateRAW = a18_timeline.slice(0, 10).split('-');
      let currentDate = [];
      for (let i of currentDateRAW) {
        currentDate.push(Number(i));
      }

      let temp, result;

      // 올바른 날짜 형식인지 확인합니다.
      if (!/^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]$/.test(raw)) {

        // 6자리 날짜 형식을 8자리로 변환합니다.
        if (/^[0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]$/.test(raw.trim())) {
          return "20" + raw.trim();

        // "월 초" 형식을 "YYYY-MM-01"로 변환합니다.
        } else if (/^[0-9]+월[초]/.test(raw.trim())) {
          temp = Number(raw.trim().replace(/[^0-9]/g, ''));
          if (temp >= currentDate[1]) {
            result = String(currentDate[0]) + '-' + String(((temp < 10) ? '0' + String(temp) : String(temp))) + '-' + '01';
          } else {
            result = String(currentDate[0] + 1) + '-' + String(((temp < 10) ? '0' + String(temp) : String(temp))) + '-' + '01';
          }
          return result;

        // "YYYY-MM-초" 형식을 "YYYY-MM-01"로 변환합니다.
        } else if (/\-[초]/.test(raw.trim())) {
          temp = raw.trim().split('-');
          result = '';
          if (temp[0].length === 2) {
            result += '20' + temp[0] + '-';
          } else {
            result += temp[0] + '-';
          }
          if (Number(temp[1]) < 10) {
            result += '0' + temp[1].replace(/0/g, '') + '-';
          } else {
            result += temp[1] + '-';
          }
          result += '01';
          return result;

        // "월 말" 형식을 "YYYY-MM-28"로 변환합니다.
        } else if (/^[0-9]+월[말]/.test(raw.trim())) {
          temp = Number(raw.trim().replace(/[^0-9]/g, ''));
          if (temp >= currentDate[1]) {
            result = String(currentDate[0]) + '-' + String(((temp < 10) ? '0' + String(temp) : String(temp))) + '-' + '28';
          } else {
            result = String(currentDate[0] + 1) + '-' + String(((temp < 10) ? '0' + String(temp) : String(temp))) + '-' + '28';
          }
          return result;

        // "YYYY-MM-말" 형식을 "YYYY-MM-28"로 변환합니다.
        } else if (/\-[말]/.test(raw.trim())) {
          temp = raw.trim().split('-');
          result = '';
          if (temp[0].length === 2) {
            result += '20' + temp[0] + '-';
          } else {
            result += temp[0] + '-';
          }
          if (Number(temp[1]) < 10) {
            result += '0' + temp[1].replace(/0/g, '') + '-';
          } else {
            result += temp[1] + '-';
          }
          result += '28';
          return result;

        // "월 중" 형식을 "YYYY-MM-15"로 변환합니다.
        } else if (/^[0-9]+월[중]/.test(raw.trim())) {
          temp = Number(raw.trim().replace(/[^0-9]/g, ''));
          if (temp >= currentDate[1]) {
            result = String(currentDate[0]) + '-' + String(((temp < 10) ? '0' + String(temp) : String(temp))) + '-' + '15';
          } else {
            result = String(currentDate[0] + 1) + '-' + String(((temp < 10) ? '0' + String(temp) : String(temp))) + '-' + '15';
          }
          return result;

        // "YYYY-MM-중" 형식을 "YYYY-MM-15"로 변환합니다.
        } else if (/\-[중]/.test(raw.trim())) {
          temp = raw.trim().split('-');
          result = '';
          if (temp[0].length === 2) {
            result += '20' + temp[0] + '-';
          } else {
            result += temp[0] + '-';
          }
          if (Number(temp[1]) < 10) {
            result += '0' + temp[1].replace(/0/g, '') + '-';
          } else {
            result += temp[1] + '-';
          }
          result += '15';
          return result;

        // "대기", "피드백" 등의 상태를 처리합니다.
        } else if (/wait/g.test(raw.trim()) || /대기/g.test(raw.trim()) || /피드백/g.test(raw.trim()) || /여유/g.test(raw.trim()) || /미정/g.test(raw.trim())) {
          return EMPTYDATE;

        // "지남", "이미", "비어", "asap" 등의 상태를 처리합니다.
        } else if (/지남/g.test(raw.trim()) || /이미/g.test(raw.trim()) || /비어/g.test(raw.trim()) || /asap/g.test(raw.trim())) {
          return a18_timeline.slice(0, 10);

        } else {
          return raw.replace(/\?/, '').trim();
        }
      } else {
        return raw.trim();
      }
    },

    /**
     * @method selectionFilter
     * @description 문자열에서 특정 패턴을 찾아 배열의 요소와 일치하는 값을 반환하는 필터입니다.
     * @param {string} str - 검사할 문자열입니다.
     * @param {Array<string>} arr - 패턴 배열입니다.
     * @returns {string} 일치하는 배열의 요소를 반환합니다. 일치하는 요소가 없으면 "알 수 없음"을 반환합니다.
     */
    selectionFilter: function (str, arr) {
      let tempReg;
      let index = 999;

      // 배열의 각 요소와 문자열을 비교하여 일치하는 패턴을 찾습니다.
      for (let i = 0; i < arr.length; i++) {
        tempReg = new RegExp(arr[i], "gi");
        if (tempReg.test(str.trim())) { index = i; }
      }

      // 일치하는 요소가 있으면 해당 요소를 반환합니다.
      if (index === 999) {
        return "알 수 없음";
      } else {
        return arr[index];
      }
    },

    /**
     * @method hypenFilter
     * @description 하이픈(-)만 포함된 문자열을 빈 문자열로 변환하는 필터입니다.
     * @param {string} str - 검사할 문자열입니다.
     * @returns {string} 하이픈만 포함된 문자열이면 빈 문자열을 반환하고, 그렇지 않으면 원래 문자열을 반환합니다.
     */
    hypenFilter: function (str) {
      if (str === '-') {
        return "";
      } else {
        return str;
      }
    },

    /**
     * @method emptyDate
     * @description 기본 날짜를 반환하는 필터입니다.
     * @returns {string} 기본 날짜 "9999-09-09"를 반환합니다.
     */
    emptyDate: function () {
      return "9999-09-09";
    },
  };
}

/**
 * @method getMap
 * @description 주어진 모드와 타입에 따라 ID와 관련된 데이터 조회 방법을 매핑한 객체 또는 배열을 반환합니다.
 * @param {string} [mode="id"] - 조회 모드를 설정합니다. 기본값은 "id"입니다.
 * @param {string} [type="array"] - 반환할 데이터 구조의 타입을 설정합니다. "array" 또는 "object"로 설정할 수 있으며, 기본값은 "array"입니다.
 * @returns {Array|Object} ID와 관련된 표준 및 메서드 이름을 매핑한 배열 또는 객체를 반환합니다.
 */
BackMaker.prototype.getMap = function (mode = "id", type = "array") {

  // 반환할 매핑 데이터를 저장할 변수를 선언합니다.
  let map;

  // 모드가 "id"인지 확인합니다.
  if (mode === "id") {

    // 타입이 "array"인지 확인합니다.
    if (type === "array") {
      // 배열 형식으로 매핑 데이터를 생성합니다.
      map = [
        { standard: "desid", method: "getDesignerById" }, // 디자이너 ID로 조회하는 방법
        { standard: "cliid", method: "getClientById" },   // 클라이언트 ID로 조회하는 방법
        { standard: "proid", method: "getProjectById" },  // 프로젝트 ID로 조회하는 방법
        { standard: "conid", method: "getContentsById" }, // 콘텐츠 ID로 조회하는 방법
        { standard: "aspid", method: "getAspirantById" }, // 지원자 ID로 조회하는 방법
        { standard: "serid", method: "getServiceById" },  // 서비스 ID로 조회하는 방법
        { standard: "nulid", method: "getNothingById" },  // 무효 ID로 조회하는 방법
      ];
    } else {
      // 객체 형식으로 매핑 데이터를 생성합니다.
      map = {
        client: { standard: "cliid", method: "getClientById" },   // 클라이언트 ID로 조회하는 방법
        designer: { standard: "desid", method: "getDesignerById" }, // 디자이너 ID로 조회하는 방법
        project: { standard: "proid", method: "getProjectById" },  // 프로젝트 ID로 조회하는 방법
        contents: { standard: "conid", method: "getContentsById" }, // 콘텐츠 ID로 조회하는 방법
        aspirant: { standard: "aspid", method: "getAspirantById" }, // 지원자 ID로 조회하는 방법
        service: { standard: "serid", method: "getServiceById" },  // 서비스 ID로 조회하는 방법
        nothing: { standard: "nulid", method: "getNothingById" },  // 무효 ID로 조회하는 방법
      };
    }

    // 생성된 매핑 데이터를 반환합니다.
    return map;
  }
}

/**
 * @method getNothingById
 * @description 주어진 ID(nulid)를 사용하여 "Nothing" 객체를 생성하려 하지만, 실제로는 아무런 동작도 수행하지 않고 null을 반환하는 메서드입니다.
 * @param {string} nulid - 처리할 무효 ID입니다.
 * @returns {null} 항상 null을 반환합니다.
 */
BackMaker.prototype.getNothingById = async function (nulid) {

  // 현재 BackMaker 인스턴스를 instance 변수에 저장합니다.
  const instance = this;

  try {
    /**
     * @constructor Nothing
     * @description 주어진 ID를 사용하여 "Nothing" 객체를 생성합니다.
     * @param {string} id - 무효 ID를 나타냅니다.
     */
    const Nothing = function (id) {
      // 생성된 Nothing 객체에 무효 ID(nulid)를 속성으로 저장합니다.
      this.nulid = id;
    }

    // 아무 작업도 하지 않고 null을 반환합니다.
    return null;

  } catch (e) {
    // 예외가 발생하면 콘솔에 오류를 출력합니다.
    console.log(e);
  }
}

/**
 * @method idMaker
 * @description 과거 ID를 기반으로 새로운 ID를 생성합니다. 일반 모드와 고급 모드 두 가지 방식으로 ID를 생성할 수 있습니다.
 * @param {string} pastId - 이전에 생성된 ID입니다.
 * @param {boolean} [generalMode=true] - true일 경우 일반 모드로 ID를 생성하고, false일 경우 고급 모드로 ID를 생성합니다.
 * @returns {string} 생성된 새로운 ID를 반환합니다.
 */
BackMaker.prototype.idMaker = function (pastId, generalMode = true) {

  // 현재 BackMaker 인스턴스를 instance 변수에 저장합니다.
  const instance = this;

  // Mother 클래스의 orderSystem 메서드를 destructuring을 통해 가져옵니다.
  // orderSystem 메서드는 문자열 인코딩 및 디코딩을 수행합니다.
  const { orderSystem } = this.mother;

  // 현재 날짜를 가져옵니다.
  const today = new Date();

  // 생성될 ID와 날짜 관련 변수를 선언합니다.
  let thisId;
  let year, month, date, dateString;
  let initial;

  // pastId의 첫 번째 문자를 초기값으로 설정합니다.
  initial = pastId.slice(0, 1);

  // 현재 연도, 월, 날짜를 가져옵니다.
  year = today.getFullYear();
  month = today.getMonth() + 1; // 월은 0부터 시작하므로 +1을 합니다.
  date = today.getDate();

  // 일반 모드일 경우
  if (generalMode) {

    // 연도의 마지막 두 자리를 가져옵니다.
    dateString = String(year).slice(2);

    // 월이 10보다 작은 경우 앞에 '0'을 추가합니다.
    if (month < 10) {
      dateString += '0' + String(month);
    } else {
      dateString += String(month);
    }

    // 이전 ID의 날짜 부분과 현재 날짜 부분을 비교합니다.
    if (pastId.slice(1, 5) === dateString) {
      // 날짜가 동일한 경우 orderSystem 메서드를 사용하여 새로운 ID를 생성합니다.
      // orderSystem 메서드는 주어진 문자열을 인코딩 또는 디코딩할 수 있는 메서드로, 이를 통해 ID를 증가시킵니다.
      thisId = initial + dateString + '_' + orderSystem("encode", orderSystem("decode", pastId) + 1);
    } else {
      // 날짜가 다를 경우, 1로 초기화된 ID를 생성합니다.
      thisId = initial + dateString + '_' + orderSystem("encode", 1);
    }

    // 생성된 ID를 반환합니다.
    return thisId;

  } else { // 고급 모드일 경우

    // 월을 인코딩하는 함수를 정의합니다.
    const monthEncode = (num) => {
      const aCode = 'a'.charCodeAt(0); // 'a'의 ASCII 코드 값을 가져옵니다.
      let arr = [];
      for (let i = 0; i < 12; i++) {
        if (i < 9) {
          arr.push(String(i + 1)); // 1부터 9까지는 숫자로 처리
        } else {
          arr.push(String.fromCharCode(i - 9 + aCode)); // 10부터 12는 'a', 'b', 'c'로 처리
        }
      }
      return arr[num];
    }

    // 날짜를 인코딩하는 함수를 정의합니다.
    const dateEncode = (num) => {
      const aCode = 'a'.charCodeAt(0); // 'a'의 ASCII 코드 값을 가져옵니다.
      let arr = [];
      for (let i = 0; i < 32; i++) {
        if (i < 9) {
          arr.push(String(i + 1)); // 1부터 9까지는 숫자로 처리
        } else {
          arr.push(String.fromCharCode(i - 9 + aCode)); // 10부터 31까지는 'a'에서 'v'까지의 문자로 처리
        }
      }
      return arr[num];
    }

    // 연도의 마지막 두 자리에 월과 날짜를 인코딩하여 추가합니다.
    dateString = String(year).slice(2);
    dateString += monthEncode(month - 1); // 월 인코딩 적용
    dateString += dateEncode(date - 1); // 날짜 인코딩 적용

    // 이전 ID의 날짜 부분과 현재 인코딩된 날짜 부분을 비교합니다.
    if (pastId.slice(1, 5) === dateString) {
      // 날짜가 동일한 경우 orderSystem 메서드를 사용하여 새로운 ID를 생성합니다.
      thisId = initial + dateString + '_' + orderSystem("encode", orderSystem("decode", pastId) + 1);
    } else {
      // 날짜가 다를 경우, 1로 초기화된 ID를 생성합니다.
      thisId = initial + dateString + '_' + orderSystem("encode", 1);
    }

    // 생성된 ID를 반환합니다.
    return thisId;
  }
}

/**
 * @method idFilter
 * @description 주어진 버튼 이름에 따라 해당 필터 모듈을 동적으로 불러옵니다. 필터 모듈은 특정 ID와 관련된 필터링 작업을 수행하는 역할을 합니다.
 * @param {string} button - 필터를 가져올 때 사용할 버튼 이름입니다.
 * @returns {Object|undefined} 버튼 이름에 해당하는 필터 모듈을 반환합니다. 오류가 발생하면 undefined를 반환합니다.
 */
BackMaker.prototype.idFilter = function (button) {

  // 현재 BackMaker 인스턴스를 instance 변수에 저장합니다.
  const instance = this;

  // 전달받은 button 매개변수를 this.button 속성에 할당합니다.
  this.button = button;

  try {
    // 지정된 버튼 이름을 사용하여 해당 필터 모듈을 동적으로 불러옵니다.
    const Filter = require(`${this.idFilterDir}/${this.button}.js`);

    // 불러온 필터 모듈을 반환합니다.
    return Filter;

  } catch (e) {
    // 오류가 발생한 경우, 콘솔에 오류 메시지를 출력합니다.
    console.log(e);
  }
}

/**
 * @method setAjaxAuthorization
 * @description AJAX 요청에 필요한 인증 문자열을 설정합니다. 이 메서드는 비동기적으로 동작합니다.
 * @returns {Promise<string>} 설정된 trapString 값을 반환합니다.
 */
BackMaker.prototype.setAjaxAuthorization = async function () {

  // 현재 BackMaker 인스턴스를 instance 변수에 저장합니다.
  const instance = this;

  // Mother 클래스의 cryptoString 메서드를 가져옵니다.
  // cryptoString 메서드는 문자열을 암호화하거나 복호화하는 기능을 제공합니다.
  const { cryptoString } = this.mother;

  try {
    // trapString 변수를 선언하고 초기화합니다. 이 변수는 나중에 인증 문자열로 사용될 수 있습니다.
    let trapString;
    trapString = "";

    // trapString 값을 반환합니다.
    return trapString;

  } catch (e) {
    // 예외가 발생하면, 발생한 오류를 콘솔에 출력합니다.
    console.log(e);
  }
}

/**
 * @method setInfoObj
 * @description 데이터베이스에서 info 객체를 가져와 `infoObj.js` 파일에 저장하거나, 옵션에 따라 가져온 객체를 반환합니다.
 * @param {Object} option - 설정 옵션 객체입니다.
 * @param {Object} [option.selfMongo=null] - 사용할 MongoDB 인스턴스입니다. 설정되지 않으면 기본 MongoDB 인스턴스를 사용합니다.
 * @param {boolean} [option.getMode=false] - true일 경우 info 객체를 반환하고, false일 경우 `infoObj.js` 파일에 저장합니다.
 * @returns {Promise<boolean|Object>} info 객체를 성공적으로 저장했으면 true, 가져왔으면 해당 객체를 반환하고, 오류가 발생하면 false를 반환합니다.
 */
BackMaker.prototype.setInfoObj = async function (option = { selfMongo: null, getMode: false }) {

  // 현재 BackMaker 인스턴스를 instance 변수에 저장합니다.
  const instance = this;

  // Mother 클래스에서 필요한 메서드와 MongoDB 정보를 가져옵니다.
  // mongo: MongoDB 클라이언트
  // mongoinfo: MongoDB 연결 정보
  // fileSystem: 파일 시스템 작업을 수행하는 메서드
  const { mongo, mongoinfo, fileSystem } = this.mother;

  // MongoDB 연결을 위한 클라이언트를 생성합니다.
  const MONGOC = new mongo(mongoinfo);

  try {
    // infoObj.js 파일 경로를 설정합니다.
    const infoPath = `${process.cwd()}/apps/infoObj.js`;

    // 데이터를 저장할 배열과 목표 데이터를 저장할 변수를 선언합니다.
    let arr, target;

    // selfMongo 옵션이 설정되지 않은 경우 기본 MongoDB 인스턴스를 사용하여 데이터베이스에 연결합니다.
    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();  // MongoDB에 연결합니다.
      
      // 데이터베이스에서 info 컬렉션에서 classification.id가 0인 문서들을 찾아 배열로 반환합니다.
      arr = await MONGOC.db(`miro81`).collection(`info`).find({ "classification.id": 0 }).toArray();

      // MongoDB 연결을 종료합니다.
      await MONGOC.close();
    } else {
      // selfMongo 옵션이 설정된 경우 해당 인스턴스를 사용하여 데이터베이스에서 데이터를 가져옵니다.
      arr = await option.selfMongo.db(`miro81`).collection(`info`).find({ "classification.id": 0 }).toArray();
    }

    // 데이터가 없는 경우, 콘솔에 메시지를 출력하고 false를 반환합니다.
    if (arr.length === 0) {
      console.log("\x1b[32m", "there is no info object");
      return false;
    }

    // 가져온 데이터를 날짜 순으로 정렬합니다. 최신 데이터가 첫 번째로 오도록 설정합니다.
    arr.sort((a, b) => { return b.date.valueOf() - a.date.valueOf(); });

    // 최신 데이터를 target 변수에 저장합니다.
    target = arr[0];

    // getMode 옵션이 true인 경우, info 객체를 반환합니다.
    if (option.getMode === true) {
      return target.info;
    } else {
      // getMode가 false인 경우, info 객체를 파일로 저장합니다.
      console.log("\x1b[32m%s\x1b[0m", "info set complete");

      // 파일 시스템을 사용하여 info 객체를 `infoObj.js` 파일에 저장합니다.
      await fileSystem(`write`, [ infoPath, `module.exports = ${JSON.stringify(target.info, null, 2)}` ]);

      // 작업이 완료되었음을 나타내는 true를 반환합니다.
      return true;
    }

  } catch (e) {
    // 오류가 발생하면, 콘솔에 오류 메시지를 출력하고 false를 반환합니다.
    console.log(e);
    return false;
  }
}

/**
 * @method updateInfoObj
 * @description 현재 `infoObj.js` 파일의 내용을 데이터베이스에 업데이트합니다. 데이터는 MongoDB의 `info` 컬렉션에 저장됩니다.
 * @param {Object} option - 설정 옵션 객체입니다.
 * @param {Object} [option.selfMongo=null] - 사용할 MongoDB 인스턴스입니다. 설정되지 않으면 기본 MongoDB 인스턴스를 사용합니다.
 * @returns {Promise<boolean>} 업데이트가 성공하면 true를 반환하고, 실패하면 오류를 출력합니다.
 */
BackMaker.prototype.updateInfoObj = async function (option = { selfMongo: null }) {

  // 현재 BackMaker 인스턴스를 instance 변수에 저장합니다.
  const instance = this;

  // Mother 클래스에서 필요한 메서드와 MongoDB 정보를 가져옵니다.
  // mongo: MongoDB 클라이언트
  // mongoinfo: MongoDB 연결 정보
  // fileSystem: 파일 시스템 작업을 수행하는 메서드
  // equalJson: JSON 문자열을 객체로 변환하는 메서드
  const { mongo, mongoinfo, fileSystem, equalJson } = this.mother;

  // MongoDB 연결을 위한 클라이언트를 생성합니다.
  const MONGOC = new mongo(mongoinfo);

  try {
    // infoObj.js 파일 경로를 설정합니다.
    const infoPath = `${process.cwd()}/apps/infoObj.js`;

    // 업데이트할 대상 객체와 JSON 데이터를 저장할 변수를 선언합니다.
    let target, json;

    // infoObj.js 파일의 내용을 가져와 JSON 문자열로 변환하고, 이를 equalJson 메서드를 사용하여 객체로 변환합니다.
    target = equalJson(JSON.stringify(require(infoPath)));

    // 데이터베이스에 저장할 JSON 객체를 구성합니다.
    json = {
      date: new Date(), // 현재 날짜와 시간을 설정합니다.
      classification: {
        id: 0, // 분류 ID를 0으로 설정합니다.
        name: "core", // 분류 이름을 "core"로 설정합니다.
      },
      info: target // 처리된 info 데이터를 설정합니다.
    };

    // selfMongo 옵션이 설정되지 않은 경우 기본 MongoDB 인스턴스를 사용하여 데이터베이스에 연결하고 데이터를 삽입합니다.
    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect(); // MongoDB에 연결합니다.
      await MONGOC.db(`miro81`).collection(`info`).insertOne(json); // 데이터베이스의 info 컬렉션에 JSON 데이터를 삽입합니다.
      await MONGOC.close(); // MongoDB 연결을 종료합니다.
    } else {
      // selfMongo 옵션이 설정된 경우 해당 인스턴스를 사용하여 데이터베이스에 연결하고 데이터를 삽입합니다.
      await option.selfMongo.db(`miro81`).collection(`info`).insertOne(json);
    }

    // 업데이트가 완료되었음을 알리는 메시지를 콘솔에 출력합니다.
    console.log("\x1b[32m%s\x1b[0m", "info update complete");

    // 업데이트가 성공적으로 완료되었음을 나타내는 true를 반환합니다.
    return true;

  } catch (e) {
    // 오류가 발생하면, 발생한 오류를 콘솔에 출력합니다.
    console.log(e);
  }
}

/**
 * @method setMemberObj
 * @description 데이터베이스에서 멤버 객체를 가져와 `memberObj.js` 파일에 저장하거나, 옵션에 따라 가져온 객체를 반환합니다.
 * @param {Object} option - 설정 옵션 객체입니다.
 * @param {Object} [option.selfMongo=null] - 사용할 MongoDB 인스턴스입니다. 설정되지 않으면 기본 MongoDB 인스턴스를 사용합니다.
 * @param {boolean} [option.getMode=false] - true일 경우 멤버 객체를 반환하고, false일 경우 `memberObj.js` 파일에 저장합니다.
 * @returns {Promise<boolean|Object>} 멤버 객체를 성공적으로 저장했으면 true, 가져왔으면 해당 객체를 반환하고, 오류가 발생하면 false를 반환합니다.
 */
BackMaker.prototype.setMemberObj = async function (option = { selfMongo: null, getMode: false }) {

  // 현재 BackMaker 인스턴스를 instance 변수에 저장합니다.
  const instance = this;

  // Mother 클래스에서 필요한 메서드와 MongoDB 정보를 가져옵니다.
  // mongo: MongoDB 클라이언트
  // mongoinfo: MongoDB 연결 정보
  // fileSystem: 파일 시스템 작업을 수행하는 메서드
  const { mongo, mongoinfo, fileSystem } = this.mother;

  // MongoDB 연결을 위한 클라이언트를 생성합니다.
  const MONGOC = new mongo(mongoinfo);

  try {
    // memberObj.js 파일 경로를 설정합니다.
    const infoPath = `${process.cwd()}/apps/memberObj.js`;

    // 데이터를 저장할 배열과 목표 데이터를 저장할 변수를 선언합니다.
    let arr, target;

    // selfMongo 옵션이 설정되지 않은 경우 기본 MongoDB 인스턴스를 사용하여 데이터베이스에 연결합니다.
    if (option.selfMongo === undefined || option.selfMongo === null) {
      // MongoDB에 연결합니다.
      await MONGOC.connect();

      // 데이터베이스에서 info 컬렉션에서 classification.id가 1인 문서들을 찾아 배열로 반환합니다.
      arr = await MONGOC.db(`miro81`).collection(`info`).find({ "classification.id": 1 }).toArray();

      // MongoDB 연결을 종료합니다.
      await MONGOC.close();
    } else {
      // selfMongo 옵션이 설정된 경우 해당 인스턴스를 사용하여 데이터베이스에서 데이터를 가져옵니다.
      arr = await option.selfMongo.db(`miro81`).collection(`info`).find({ "classification.id": 1 }).toArray();
    }

    // 데이터가 없는 경우, 콘솔에 메시지를 출력하고 false를 반환합니다.
    if (arr.length === 0) {
      console.log("\x1b[32m", "there is no member object");
      return false;
    }

    // 가져온 데이터를 날짜 순으로 정렬합니다. 최신 데이터가 첫 번째로 오도록 설정합니다.
    arr.sort((a, b) => { return b.date.valueOf() - a.date.valueOf(); });

    // 최신 데이터를 target 변수에 저장합니다.
    target = arr[0];

    // getMode 옵션이 true인 경우, 멤버 객체를 반환합니다.
    if (option.getMode === true) {
      return target.info;
    } else {
      // getMode가 false인 경우, 멤버 객체를 파일로 저장합니다.
      console.log("\x1b[32m%s\x1b[0m", "member set complete");

      // 파일 시스템을 사용하여 멤버 객체를 `memberObj.js` 파일에 저장합니다.
      await fileSystem(`write`, [ infoPath, `module.exports = ${JSON.stringify(target.info, null, 2)}` ]);

      // 작업이 완료되었음을 나타내는 true를 반환합니다.
      return true;
    }

  } catch (e) {
    // 오류가 발생하면, 콘솔에 오류 메시지를 출력하고 false를 반환합니다.
    console.log(e);
    return false;
  }
}

/**
 * @method updateMemberObj
 * @description 현재 `memberObj.js` 파일의 내용을 데이터베이스에 업데이트합니다. 데이터는 MongoDB의 `info` 컬렉션에 저장됩니다.
 * @param {Object} option - 설정 옵션 객체입니다.
 * @param {Object} [option.selfMongo=null] - 사용할 MongoDB 인스턴스입니다. 설정되지 않으면 기본 MongoDB 인스턴스를 사용합니다.
 * @returns {Promise<boolean>} 업데이트가 성공하면 true를 반환하고, 실패하면 오류를 출력합니다.
 */
BackMaker.prototype.updateMemberObj = async function (option = { selfMongo: null }) {

  // 현재 BackMaker 인스턴스를 instance 변수에 저장합니다.
  const instance = this;

  // Mother 클래스에서 필요한 메서드와 MongoDB 정보를 가져옵니다.
  // mongo: MongoDB 클라이언트
  // mongoinfo: MongoDB 연결 정보
  // fileSystem: 파일 시스템 작업을 수행하는 메서드
  // equalJson: JSON 문자열을 객체로 변환하는 메서드, JSON.parse와 유사하지만 Date 객체를 올바르게 처리합니다.
  const { mongo, mongoinfo, fileSystem, equalJson } = this.mother;

  // MongoDB 연결을 위한 클라이언트를 생성합니다.
  const MONGOC = new mongo(mongoinfo);

  try {
    // memberObj.js 파일 경로를 설정합니다.
    const infoPath = `${process.cwd()}/apps/memberObj.js`;

    // 업데이트할 대상 객체와 JSON 데이터를 저장할 변수를 선언합니다.
    let target, json;

    // infoObj.js 파일의 내용을 가져와 JSON 문자열로 변환한 후, 이를 equalJson 메서드를 사용하여 객체로 변환합니다.
    target = equalJson(JSON.stringify(require(infoPath)));

    // 데이터베이스에 저장할 JSON 객체를 구성합니다.
    json = {
      date: new Date(), // 현재 날짜와 시간을 설정합니다.
      classification: {
        id: 1, // 분류 ID를 1로 설정합니다.
        name: "member", // 분류 이름을 "member"로 설정합니다.
      },
      info: target // 변환된 info 데이터를 설정합니다.
    };

    // selfMongo 옵션이 설정되지 않은 경우 기본 MongoDB 인스턴스를 사용하여 데이터베이스에 연결하고 데이터를 삽입합니다.
    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect(); // MongoDB에 연결합니다.
      await MONGOC.db(`miro81`).collection(`info`).insertOne(json); // 데이터베이스의 info 컬렉션에 JSON 데이터를 삽입합니다.
      await MONGOC.close(); // MongoDB 연결을 종료합니다.
    } else {
      // selfMongo 옵션이 설정된 경우 해당 인스턴스를 사용하여 데이터베이스에 연결하고 데이터를 삽입합니다.
      await option.selfMongo.db(`miro81`).collection(`info`).insertOne(json);
    }

    // 업데이트가 완료되었음을 알리는 메시지를 콘솔에 출력합니다.
    console.log("\x1b[32m%s\x1b[0m", "member update complete");

    // 업데이트가 성공적으로 완료되었음을 나타내는 true를 반환합니다.
    return true;

  } catch (e) {
    // 오류가 발생하면, 발생한 오류를 콘솔에 출력합니다.
    console.log(e);
  }
}

// GET Client --------------------------------------------------------------------------------

/**
 * @method getClientById
 * @description 주어진 고객 ID(cliid)에 따라 '홈리에종' 고객 정보를 MongoDB에서 검색하여 반환합니다. 옵션에 따라 추가 도구를 포함하거나, 일반 객체로 변환할 수 있습니다.
 * @param {string} cliid - 검색할 고객의 고유 ID.
 * @param {Object} option - 설정 옵션 객체입니다.
 * @param {boolean} [option.withTools=false] - true일 경우 고객 객체에 추가 도구를 포함합니다.
 * @param {Object} [option.selfMongo=null] - 사용할 MongoDB 인스턴스입니다. 설정되지 않으면 기본 MongoDB 인스턴스를 사용합니다.
 * @param {boolean} [option.toNormal=false] - true일 경우 고객 객체를 일반 객체로 변환합니다.
 * @returns {Promise<Object|null>} 고객 정보를 포함한 객체 또는 null을 반환합니다.
 */
BackMaker.prototype.getClientById = async function (cliid, option = { withTools: false, selfMongo: null, toNormal: false }) {

  // 현재 BackMaker 인스턴스를 instance 변수에 저장합니다.
  const instance = this;

  // Mother 클래스에서 필요한 MongoDB 클라이언트(mongo)와 연결 정보(mongoinfo)를 가져옵니다.
  const { mongo, mongoinfo } = this.mother;

  // MongoDB 연결을 위한 클라이언트를 생성합니다.
  const MONGOC = new mongo(mongoinfo);

  // 검색할 컬렉션 이름을 "client"로 설정합니다.
  const button = "client";

  // 고객 관련 객체와 클래스를 가져옵니다.
  let { Client, Clients } = require(`${this.aliveDir}/${button}/addOn/generator.js`);

  try {
    // 고객 정보를 저장할 배열과 목표 데이터를 저장할 변수를 선언합니다.
    let arr, target;

    // selfMongo 옵션이 설정되지 않은 경우 기본 MongoDB 인스턴스를 사용하여 데이터베이스에 연결합니다.
    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect(); // MongoDB에 연결합니다.
      arr = await MONGOC.db(`miro81`).collection(button).find({ cliid }).toArray(); // 고객 ID(cliid)에 해당하는 문서를 검색하여 배열로 반환합니다.
      await MONGOC.close(); // MongoDB 연결을 종료합니다.
    } else {
      // selfMongo 옵션이 설정된 경우 해당 인스턴스를 사용하여 데이터를 가져옵니다.
      arr = await option.selfMongo.db(`miro81`).collection(button).find({ cliid }).toArray();
    }

    // withTools 옵션이 true인 경우, 고객 객체에 추가 도구를 포함합니다.
    if (option.withTools) {
      const { Tools } = require(`${this.aliveDir}/${button}/addOn/generator.js`);
      Client = Tools.withTools(Client);
    }

    // 고객 정보를 찾은 경우
    if (arr.length > 0) {
      // 검색된 첫 번째 고객 정보를 사용하여 Client 객체를 생성합니다.
      target = new Client(arr[0]);

      // toNormal 옵션이 true인 경우, 고객 객체를 일반 객체로 변환합니다.
      if (option.toNormal === true) {
        target = target.toNormal();
      }
    } else {
      // 고객 정보를 찾지 못한 경우 target을 null로 설정합니다.
      target = null;
    }

    // 고객 정보를 포함한 객체 또는 null을 반환합니다.
    return target;

  } catch (e) {
    // 오류가 발생하면, 발생한 오류를 콘솔에 출력합니다.
    console.log(e);
  }
}

/**
 * @method getClientsByQuery
 * @description '홈리에종' 고객 정보를 주어진 쿼리 조건에 따라 MongoDB에서 검색하여 반환합니다. 옵션에 따라 결과를 정렬하거나, 도구를 추가할 수 있습니다.
 * @param {Object} query - MongoDB에서 고객을 검색하기 위한 쿼리 조건입니다.
 * @param {Object} option - 설정 옵션 객체입니다.
 * @param {boolean} [option.withTools=false] - true일 경우 고객 객체에 추가 도구를 포함합니다.
 * @param {Object} [option.selfMongo=null] - 사용할 MongoDB 인스턴스입니다. 설정되지 않으면 기본 MongoDB 인스턴스를 사용합니다.
 * @param {boolean} [option.fromLocal=false] - true일 경우 로컬 MongoDB 인스턴스를 사용합니다.
 * @param {boolean} [option.toNormal=false] - true일 경우 고객 객체를 일반 객체로 변환합니다.
 * @param {Object} [option.sort] - 결과를 정렬할 때 사용할 정렬 조건입니다. 설정되지 않으면 기본 정렬 조건이 적용됩니다.
 * @param {number} [option.limit] - 가져올 고객 정보의 최대 개수입니다. 설정되지 않으면 제한 없이 가져옵니다.
 * @returns {Promise<Object|Array>} 고객 정보를 포함한 배열 또는 null을 반환합니다.
 */
BackMaker.prototype.getClientsByQuery = async function (query, option = { withTools: false, selfMongo: null, fromLocal: null, toNormal: false }) {

  // 현재 BackMaker 인스턴스를 instance 변수에 저장합니다.
  const instance = this;

  // Mother 클래스에서 필요한 MongoDB 클라이언트(mongo), 연결 정보(mongoinfo), 로컬 연결 정보(mongolocalinfo)를 가져옵니다.
  const { mongo, mongoinfo, mongolocalinfo } = this.mother;

  // 사용할 MongoDB 클라이언트를 선택합니다.
  let MONGOC;
  if (option.fromLocal === true) {
    MONGOC = new mongo(mongolocalinfo); // 로컬 MongoDB를 사용합니다.
  } else {
    MONGOC = new mongo(mongoinfo); // 기본 MongoDB를 사용합니다.
  }

  // 검색할 컬렉션 이름을 "client"로 설정합니다.
  const button = "client";

  // 고객 관련 객체와 클래스를 가져옵니다.
  let { Client, Clients } = require(`${this.aliveDir}/${button}/addOn/generator.js`);

  try {
    // 고객 정보를 저장할 배열과 목표 데이터를 저장할 변수를 선언합니다.
    let tong, clientsArr;
    let sortQuery;

    // 정렬 조건이 설정되지 않은 경우 기본 정렬 조건을 적용합니다.
    if (option.sort === undefined) {
      sortQuery = { "requests.0.request.timeline": -1 }; // 기본적으로 최신 요청 순으로 정렬합니다.
    } else {
      sortQuery = option.sort; // 옵션에 따라 정렬 조건을 설정합니다.
    }

    // selfMongo 옵션이 설정되지 않은 경우 기본 MongoDB 인스턴스를 사용하여 데이터베이스에 연결합니다.
    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect(); // MongoDB에 연결합니다.
      if (option.limit !== undefined) {
        tong = await MONGOC.db(`miro81`).collection(button).find(query).sort(sortQuery).limit(Number(option.limit)).toArray(); // 쿼리와 정렬 조건을 적용하여 데이터를 가져옵니다.
      } else {
        tong = await MONGOC.db(`miro81`).collection(button).find(query).sort(sortQuery).toArray(); // 쿼리와 정렬 조건만 적용하여 데이터를 가져옵니다.
      }
      await MONGOC.close(); // MongoDB 연결을 종료합니다.
    } else {
      // selfMongo 옵션이 설정된 경우 해당 인스턴스를 사용하여 데이터를 가져옵니다.
      if (option.limit !== undefined) {
        tong = await option.selfMongo.db(`miro81`).collection(button).find(query).sort(sortQuery).limit(Number(option.limit)).toArray();
      } else {
        tong = await option.selfMongo.db(`miro81`).collection(button).find(query).sort(sortQuery).toArray();
      }
    }

    // withTools 옵션이 false인 경우, 도구를 포함하지 않은 고객 객체 배열을 생성합니다.
    if (!option.withTools) {
      clientsArr = new Clients(); // 빈 Clients 배열을 생성합니다.
      for (let i of tong) {
        clientsArr.push(new Client(i)); // 각 고객 정보를 Client 객체로 변환하여 배열에 추가합니다.
      }
    } else {
      // withTools 옵션이 true인 경우, 도구를 포함한 고객 객체 배열을 생성합니다.
      const { Tools } = require(`${this.aliveDir}/${button}/addOn/generator.js`);
      Client = Tools.withTools(Client); // 도구를 포함한 Client 클래스를 생성합니다.
      Clients = Tools.withToolsArr(Clients); // 도구를 포함한 Clients 배열을 생성합니다.
      clientsArr = new Clients(); // 빈 Clients 배열을 생성합니다.
      for (let i of tong) {
        clientsArr.push(new Client(i)); // 각 고객 정보를 Client 객체로 변환하여 배열에 추가합니다.
      }
    }

    // toNormal 옵션이 true인 경우, 고객 객체 배열을 일반 객체 배열로 변환합니다.
    if (option.toNormal === true) {
      clientsArr = clientsArr.toNormal();
    }

    // 고객 정보를 포함한 배열을 반환합니다.
    return clientsArr;
  } catch (e) {
    // 오류가 발생하면, 발생한 오류를 콘솔에 출력합니다.
    console.log(e);
  }
}

/**
 * @method getClientsAll
 * @description '홈리에종' 고객 정보를 MongoDB에서 모두 검색하여 반환합니다. 옵션에 따라 추가 도구를 포함하거나, 일반 객체로 변환할 수 있습니다.
 * @param {Object} option - 설정 옵션 객체입니다.
 * @param {boolean} [option.withTools=false] - true일 경우 고객 객체에 추가 도구를 포함합니다.
 * @param {Object} [option.selfMongo=null] - 사용할 MongoDB 인스턴스입니다. 설정되지 않으면 기본 MongoDB 인스턴스를 사용합니다.
 * @param {boolean} [option.toNormal=false] - true일 경우 고객 객체를 일반 객체로 변환합니다.
 * @returns {Promise<Object|Array>} 고객 정보를 포함한 배열을 반환합니다.
 */
BackMaker.prototype.getClientsAll = async function (option = { withTools: false, selfMongo: null, toNormal: false }) {
  
  // 현재 BackMaker 인스턴스를 instance 변수에 저장합니다.
  const instance = this;
  
  // Mother 클래스에서 필요한 MongoDB 클라이언트(mongo)와 연결 정보(mongoinfo)를 가져옵니다.
  const { mongo, mongoinfo } = this.mother;
  
  // MongoDB 연결을 위한 클라이언트를 생성합니다.
  const MONGOC = new mongo(mongoinfo);
  
  // 검색할 컬렉션 이름을 "client"로 설정합니다.
  const button = "client";
  
  // 고객 관련 객체와 클래스를 가져옵니다.
  let { Client, Clients } = require(`${this.aliveDir}/${button}/addOn/generator.js`);
  
  try {
    // 고객 정보를 저장할 배열과 목표 데이터를 저장할 변수를 선언합니다.
    let tong, clientsArr;

    // selfMongo 옵션이 설정되지 않은 경우 기본 MongoDB 인스턴스를 사용하여 데이터베이스에 연결합니다.
    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect(); // MongoDB에 연결합니다.
      
      // "client" 컬렉션에서 모든 문서를 검색하여 배열로 반환합니다.
      tong = await MONGOC.db(`miro81`).collection(button).find({}).toArray();
      
      await MONGOC.close(); // MongoDB 연결을 종료합니다.
    } else {
      // selfMongo 옵션이 설정된 경우 해당 인스턴스를 사용하여 데이터를 가져옵니다.
      tong = await option.selfMongo.db(`miro81`).collection(button).find({}).toArray();
    }

    // withTools 옵션이 false인 경우, 도구를 포함하지 않은 고객 객체 배열을 생성합니다.
    if (!option.withTools) {
      clientsArr = new Clients(); // 빈 Clients 배열을 생성합니다.
      for (let i of tong) {
        clientsArr.push(new Client(i)); // 각 고객 정보를 Client 객체로 변환하여 배열에 추가합니다.
      }
    } else {
      // withTools 옵션이 true인 경우, 도구를 포함한 고객 객체 배열을 생성합니다.
      const { Tools } = require(`${this.aliveDir}/${button}/addOn/generator.js`);
      Client = Tools.withTools(Client); // 도구를 포함한 Client 클래스를 생성합니다.
      Clients = Tools.withToolsArr(Clients); // 도구를 포함한 Clients 배열을 생성합니다.
      clientsArr = new Clients(); // 빈 Clients 배열을 생성합니다.
      for (let i of tong) {
        clientsArr.push(new Client(i)); // 각 고객 정보를 Client 객체로 변환하여 배열에 추가합니다.
      }
    }

    // toNormal 옵션이 true인 경우, 고객 객체 배열을 일반 객체 배열로 변환합니다.
    if (option.toNormal === true) {
      clientsArr = clientsArr.toNormal();
    }

    // 고객 정보를 포함한 배열을 반환합니다.
    return clientsArr;
  } catch (e) {
    // 오류가 발생하면, 발생한 오류를 콘솔에 출력합니다.
    console.log(e);
  }
}

/**
 * @method updateClient
 * @description '홈리에종' 회사에 상담 문의를 남긴 고객의 정보를 업데이트합니다. 주어진 쿼리 배열을 사용하여 MongoDB에서 고객 데이터를 업데이트합니다.
 * @param {Array} queryArr - 업데이트를 위한 쿼리 배열입니다. [whereQuery, updateQuery] 형태로, 첫 번째 객체는 검색 조건, 두 번째 객체는 업데이트할 데이터입니다.
 * @param {Object} option - 설정 옵션 객체입니다.
 * @param {Object} [option.selfMongo=null] - 사용할 MongoDB 인스턴스입니다. 설정되지 않으면 기본 MongoDB 인스턴스를 사용합니다.
 * @returns {Promise<string>} 업데이트가 성공하면 "success", 실패하면 "fail"을 반환합니다.
 * @throws {Error} 쿼리 배열의 길이가 2가 아니거나, updateQuery가 유효하지 않을 경우 오류를 발생시킵니다.
 */
BackMaker.prototype.updateClient = async function (queryArr, option = { selfMongo: null }) {

  // 쿼리 배열의 길이가 2가 아닌 경우 오류를 발생시킵니다.
  if (queryArr.length !== 2) {
    throw new Error("invaild arguments : query object must be Array: [ Object: whereQuery, Object: updateQuery ]");
  }

  // 현재 BackMaker 인스턴스를 instance 변수에 저장합니다.
  const instance = this;

  // Mother 클래스에서 필요한 MongoDB 클라이언트(mongo)와 연결 정보(mongoinfo)를 가져옵니다.
  const { mongo, mongoinfo } = this.mother;

  // MongoDB 연결을 위한 클라이언트를 생성합니다.
  const MONGOC = new mongo(mongoinfo);

  // 업데이트할 컬렉션 이름을 "client"로 설정합니다.
  const button = "client";

  try {
    // 쿼리 배열에서 whereQuery와 updateQuery를 추출합니다.
    const [ whereQuery, updateQuery ] = queryArr;

    // updateQuery가 객체가 아니거나 null인 경우 오류를 발생시킵니다.
    if (typeof updateQuery !== "object" || updateQuery === null) {
      throw new Error("invalid updateQuery");
    }

    // updateQuery에 "null" 속성이 있는 경우 이를 삭제합니다.
    if (updateQuery["null"] !== undefined) {
      delete updateQuery["null"];
    }

    // selfMongo 옵션이 설정되지 않은 경우 기본 MongoDB 인스턴스를 사용하여 데이터베이스에 연결합니다.
    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect(); // MongoDB에 연결합니다.
      
      // "client" 컬렉션에서 whereQuery에 해당하는 문서를 updateQuery로 업데이트합니다.
      await MONGOC.db(`miro81`).collection(button).updateOne(whereQuery, { $set: updateQuery });
      
      await MONGOC.close(); // MongoDB 연결을 종료합니다.
    } else {
      // selfMongo 옵션이 설정된 경우 해당 인스턴스를 사용하여 데이터를 업데이트합니다.
      await option.selfMongo.db(`miro81`).collection(button).updateOne(whereQuery, { $set: updateQuery });
    }

    // 업데이트가 성공적으로 완료되었음을 나타내는 "success"를 반환합니다.
    return "success";

  } catch (e) {
    // 오류가 발생하면, 발생한 오류를 콘솔에 출력합니다.
    console.log(e);
    
    // 업데이트가 실패했음을 나타내는 "fail"을 반환합니다.
    return "fail";
  }
}

/**
 * @method deleteClient
 * @description '홈리에종' 회사에 상담 문의를 남긴 고객의 정보를 삭제합니다. 주어진 고객 ID(cliid)를 사용하여 MongoDB에서 고객 데이터를 삭제합니다.
 * @param {string} cliid - 삭제할 고객의 고유 ID.
 * @param {Object} option - 설정 옵션 객체입니다.
 * @param {Object} [option.selfMongo=null] - 사용할 MongoDB 인스턴스입니다. 설정되지 않으면 기본 MongoDB 인스턴스를 사용합니다.
 * @returns {Promise<string>} 삭제가 성공하면 "success"를 반환합니다.
 */
BackMaker.prototype.deleteClient = async function (cliid, option = { selfMongo: null }) {

  // 현재 BackMaker 인스턴스를 instance 변수에 저장합니다.
  const instance = this;

  // Mother 클래스에서 필요한 MongoDB 클라이언트(mongo)와 연결 정보(mongoinfo)를 가져옵니다.
  const { mongo, mongoinfo } = this.mother;

  // MongoDB 연결을 위한 클라이언트를 생성합니다.
  const MONGOC = new mongo(mongoinfo);

  // 삭제할 컬렉션 이름을 "client"로 설정합니다.
  const button = "client";

  try {
    // selfMongo 옵션이 설정되지 않은 경우 기본 MongoDB 인스턴스를 사용하여 데이터베이스에 연결합니다.
    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect(); // MongoDB에 연결합니다.
      
      // "client" 컬렉션에서 cliid에 해당하는 문서를 삭제합니다.
      await MONGOC.db(`miro81`).collection(button).deleteOne({ cliid });
      
      await MONGOC.close(); // MongoDB 연결을 종료합니다.
    } else {
      // selfMongo 옵션이 설정된 경우 해당 인스턴스를 사용하여 데이터를 삭제합니다.
      await option.selfMongo.db(`miro81`).collection(button).deleteOne({ cliid });
    }

    // 삭제가 성공적으로 완료되었음을 나타내는 "success"를 반환합니다.
    return "success";

  } catch (e) {
    // 오류가 발생하면, 발생한 오류를 콘솔에 출력합니다.
    console.log(e);
  }
}

/**
 * @method returnClientDummies
 * @description '홈리에종' 회사에 직접 상담 문의를 남긴 고객의 더미 데이터를 반환합니다. 주어진 주제(subject)에 따라 매핑된 더미 데이터를 가져옵니다.
 * @param {string} subject - 더미 데이터를 가져올 주제.
 * @returns {Object} 주제에 해당하는 더미 데이터를 반환합니다.
 */
BackMaker.prototype.returnClientDummies = function (subject) {

  // 현재 BackMaker 인스턴스를 instance 변수에 저장합니다.
  const instance = this;

  // 고객 데이터 맵핑을 위한 client.js 파일을 가져옵니다.
  const map = require(`${this.mapDir}/client/addOn/generator.js`).ClientMap;

  // 더미 데이터를 저장할 변수를 선언합니다.
  let dummy;

  // 주어진 주제(subject)에 해당하는 더미 데이터를 가져옵니다.
  dummy = map.sub(subject);

  // 가져온 더미 데이터를 반환합니다.
  return dummy;
}

/**
 * @method returnClientRequest
 * @description '홈리에종' 회사에 직접 상담 문의를 남긴 고객의 요청(request) 데이터를 반환합니다.
 * @returns {Object} 고객의 요청 데이터를 반환합니다.
 */
BackMaker.prototype.returnClientRequest = function () {

  // 현재 BackMaker 인스턴스를 instance 변수에 저장합니다.
  const instance = this;

  // 고객 데이터 맵핑을 위한 client.js 파일을 가져옵니다.
  const map = require(`${this.mapDir}/client/addOn/generator.js`).ClientMap;

  // 요청(request) 데이터를 저장할 변수를 선언합니다.
  let request;

  // "requests"에 해당하는 고객의 요청 데이터를 가져옵니다.
  request = map.sub("requests");

  // 가져온 요청 데이터를 반환합니다.
  return request;
}

/**
 * @method createClient
 * @description '홈리에종' 회사에 직접 상담 문의를 남긴 고객 정보를 생성합니다. 주어진 업데이트 쿼리(updateQuery)를 사용하여 새로운 고객 데이터를 생성하고, MongoDB에 저장합니다.
 * @param {Object} updateQuery - 새로 생성된 고객 정보를 업데이트하기 위한 쿼리입니다.
 * @param {Object} option - 설정 옵션 객체입니다.
 * @param {Object} [option.selfMongo=null] - 사용할 MongoDB 인스턴스입니다. 설정되지 않으면 기본 MongoDB 인스턴스를 사용합니다.
 * @returns {Promise<string>} 생성된 고객의 고유 ID(cliid)를 반환합니다.
 */
BackMaker.prototype.createClient = async function (updateQuery, option = { selfMongo: null }) {

  // 현재 BackMaker 인스턴스를 instance 변수에 저장합니다.
  const instance = this;

  // Mother 클래스에서 필요한 MongoDB 클라이언트(mongo)와 연결 정보(mongoinfo)를 가져옵니다.
  const { mongo, mongoinfo } = this.mother;

  // MongoDB 연결을 위한 클라이언트를 생성합니다.
  const MONGOC = new mongo(mongoinfo);

  // 생성할 컬렉션 이름을 "client"로 설정합니다.
  const button = "client";

  // 고객 데이터 맵핑을 위한 client.js 파일을 가져옵니다.
  const map = require(`${this.mapDir}/client/addOn/generator.js`).ClientMap;

  try {
    // 더미 데이터, 최신 고객, 최신 고객 배열을 저장할 변수를 선언합니다.
    let dummy, latestClient, latestClientArr;
    
    // 새로운 옵션 객체를 선언합니다.
    let newOption = {};
    
    // 요청(request) 더미 데이터를 저장할 변수를 선언합니다.
    let requestDummy;

    // selfMongo 옵션이 설정된 경우 이를 newOption에 복사합니다.
    if (option.selfMongo !== undefined && option.selfMongo !== null) {
      newOption.selfMongo = option.selfMongo;
    }
    
    // 도구를 포함하지 않은 상태로 설정합니다.
    newOption.withTools = false;

    // 고객 ID(cliid)를 기준으로 내림차순으로 정렬합니다.
    newOption.sort = { "cliid": -1 };

    // 최대 1개의 문서만 반환하도록 제한합니다.
    newOption.limit = 1;

    // 최신 고객 데이터를 가져옵니다.
    latestClientArr = await this.getClientsByQuery({}, newOption);
    
    // 최신 고객 데이터를 배열에서 추출합니다.
    latestClient = latestClientArr[0];
    
    // 고객 데이터의 기본 구조를 가져옵니다.
    dummy = map.main();
    
    // 요청(request) 더미 데이터를 가져와서 구조에 추가합니다.
    requestDummy = map.sub("requests");
    dummy.structure.requests.unshift(requestDummy);

    // 새로 생성할 고객의 ID를 설정합니다.
    dummy.structure.cliid = this.idMaker(latestClient.cliid);

    // MongoDB에 연결하여 새 고객 데이터를 삽입합니다.
    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect(); // MongoDB에 연결합니다.
      
      // "client" 컬렉션에 새 고객 데이터를 삽입합니다.
      await MONGOC.db(`miro81`).collection(button).insertOne(dummy.structure);
      
      await MONGOC.close(); // MongoDB 연결을 종료합니다.
    } else {
      // selfMongo 옵션이 설정된 경우 해당 인스턴스를 사용하여 새 고객 데이터를 삽입합니다.
      await option.selfMongo.db(`miro81`).collection(button).insertOne(dummy.structure);
    }

    // 새로 생성된 고객 데이터를 업데이트합니다.
    await this.updateClient([ { cliid: dummy.structure.cliid }, updateQuery ], option);

    // 생성된 고객의 고유 ID를 반환합니다.
    return dummy.structure.cliid;

  } catch (e) {
    // 오류가 발생하면, 발생한 오류를 콘솔에 출력합니다.
    console.log(e);
  }
}

/**
 * @method getClientReport
 * @description '홈리에종' 회사에 직접 상담 문의를 남긴 고객들의 정보를 바탕으로 리포트를 생성합니다. 
 * 고객 정보와 프로젝트 정보를 바탕으로 통계와 분석을 수행하여 리포트를 만듭니다.
 * @returns {Promise<Object>} 고객 리포트 객체를 반환합니다.
 */
BackMaker.prototype.getClientReport = async function () {
  // this를 instance 변수에 할당하여 BackMaker 클래스의 메서드 및 속성에 접근할 수 있도록 합니다.
  const instance = this;

  // Mother 클래스의 errorLog 메서드를 가져옵니다. 이 메서드는 오류를 로그로 기록하는 데 사용됩니다.
  const { errorLog } = this.mother;

  try {
    /**
     * @function ratioParsing
     * @description 숫자를 받아 퍼센트 형식의 문자열로 변환합니다. 소수점 한자리까지 반올림하여 표시됩니다.
     * @param {number} num - 퍼센트로 변환할 숫자
     * @returns {string} 퍼센트 형식의 문자열
     */
    const ratioParsing = (num) => { 
      return `${String(Math.round(num * 100 * 10) / 10)}%`; 
    }

    // 콘솔에 리포트 시작을 알리는 메시지를 출력합니다.
    console.log(`\x1b[36m\x1b[1m%s\x1b[0m`, `client report start ==================================================`);

    // 고객 정보를 쿼리하여 가져옵니다. withTools 옵션을 사용하여 도구와 함께 로드합니다.
    const clients = await this.getClientsByQuery({}, { withTools: true });

    // 고객 정보를 성공적으로 로드했음을 콘솔에 출력합니다.
    console.log(`load client success`);

    // 프로젝트 정보를 쿼리하여 가져옵니다. withTools 옵션을 사용하여 도구와 함께 로드합니다.
    const projects = await this.getProjectsByQuery({}, { withTools: true });

    // 프로젝트 정보를 성공적으로 로드했음을 콘솔에 출력합니다.
    console.log(`load project success`);

    // 고객 리포트를 월별로 생성하여 reportAll 메서드를 통해 분석합니다.
    const clientsReport = clients.getRequestsTongsMonthly().reportAll();

    let tempObj; // 임시 객체를 선언합니다.
    let proposalNum, contractNum; // 제안 수와 계약 수를 담을 변수를 선언합니다.

    // 고객 리포트의 각 항목을 순회하며 데이터를 파싱합니다.
    for (let report of clientsReport) {
      // 각 리포트의 날짜별로 파싱을 시작했다는 메시지를 콘솔에 출력합니다.
      console.log(`\x1b[33m%s\x1b[0m`, `parsing report : ${report.date}`);

      // 리포트의 각 키(key)를 순회합니다.
      for (let key in report) {
        // 리포트의 키가 객체 타입인지 확인합니다.
        if (typeof report[key] === "object") {
          // 객체가 Date 인스턴스가 아니고, detail 속성을 가지고 있는지 확인합니다.
          if (!(report[key] instanceof Date) && report[key].detail !== undefined) {

            // 제안 수와 계약 수를 0으로 초기화합니다.
            proposalNum = 0;
            contractNum = 0;

            // 리포트의 detail 배열을 순회하며 각 객체를 처리합니다.
            for (let obj of report[key].detail) {
              // 프로젝트 정보에서 해당 클라이언트 ID 배열을 사용해 평균 제안 및 계약 정보를 가져옵니다.
              tempObj = this.getProjectsByCliidArr(obj.cliidArr, { 
                withTools: true, 
                recycle: projects 
              }).returnAverage().averageReport();

              // 해당 객체에 프로젝트 ID 배열과 제안 수를 추가합니다.
              obj.proidArr = tempObj.proidArr;
              obj.proposal = tempObj.proposal;

              // 제안 수를 누적합니다.
              proposalNum += tempObj.proposal;

              // 제안율을 계산하여 객체에 추가합니다.
              if (obj.value !== 0) {
                obj.proposalRatio = ratioParsing(tempObj.proposal / obj.value);
              } else {
                obj.proposalRatio = ratioParsing(0);
              }

              // 계약 수를 누적합니다.
              obj.contract = tempObj.contract;
              contractNum += tempObj.contract;

              // 계약율을 계산하여 객체에 추가합니다.
              if (obj.value !== 0) {
                obj.contractRatio = ratioParsing(tempObj.contract / obj.value);
              } else {
                obj.contractRatio = ratioParsing(0);
              }

              // 평균 제안 및 계약 금액을 객체에 추가합니다.
              obj.average = tempObj.average;

              // 비율을 저장할 빈 객체를 생성합니다.
              obj.ratioObject = {};
            }

            // 리포트의 총 제안 수와 계약 수를 기록합니다.
            report.proposalTotal = proposalNum;
            report.contactTotal = contractNum;

            // detail 배열의 각 객체에 대해 비율 정보를 설정합니다.
            for (let obj of report[key].detail) {
              obj.ratioObject.value = obj.ratio;
              obj.ratioObject.proposal = ratioParsing(obj.proposal / proposalNum);
              obj.ratioObject.contract = ratioParsing(obj.contract / contractNum);
              obj.ratioObject.proposal_inValue = obj.proposalRatio;
              obj.ratioObject.contract_inValue = obj.contractRatio;

              // 기존 비율 속성을 삭제하고, 새로 계산된 비율 객체로 교체합니다.
              delete obj.ratio;
              delete obj.proposalRatio;
              delete obj.contractRatio;
              obj.ratio = JSON.parse(JSON.stringify(obj.ratioObject));
              delete obj.ratioObject;
            }
          }
        }
      }
    }

    /**
     * @method getMatrix
     * @description 리포트를 매트릭스 형식으로 변환하여 반환합니다.
     * 리포트의 다양한 항목들을 매트릭스 형식으로 정렬하여 시각적으로 보기 좋게 만듭니다.
     * @returns {Array<Array<string>> | null} 매트릭스 형식의 리포트 배열 또는 null 반환.
     */
    clientsReport.constructor.prototype.getMatrix = function () {
      const targetArr = [
        { name: "금액별", target: "budget" },
        { name: "지역별", target: "address" },
        { name: "평수별", target: "pyeong" },
        { name: "거주중", target: "living" },
        { name: "계약별", target: "contract" },
        { name: "이사일", target: "movingDay" },
      ];
      const constColumns = [
        { name: "문의", target: "value" },
        { name: "제안", target: "proposal" },
        { name: "진행", target: "contract" },
        { name: "제안 금액 평균", target: "average.proposal" },
        { name: "진행 제안 금액 평균", target: "average.contract" },
        { name: "문의율", target: "ratio.value" },
        { name: "제안율", target: "ratio.proposal" },
        { name: "진행률", target: "ratio.contract" },
        { name: "문의중 제안율", target: "ratio.proposal_inValue" },
        { name: "문의중 진행율", target: "ratio.contract_inValue" },
      ];
      let result = []; // 결과를 담을 배열을 선언합니다.
      let tempArr; // 임시 배열을 선언합니다.
      let tempColumnArr, finalObj; // 임시 컬럼 배열 및 최종 객체를 선언합니다.

      // 리포트가 비어있지 않다면 처리합니다.
      if (this.length > 0) {
        // 타겟 항목들을 순회합니다.
        for (let t = 0; t < targetArr.length; t++) {

          tempArr = [ targetArr[t].name ]; // 타겟 이름을 임시 배열에 추가합니다.
          for (let i = 0; i < this.length; i++) {
            for (let j = 0; j < constColumns.length; j++) {
              tempArr.push(""); // 각 컬럼에 대해 빈 문자열을 추가합니다.
            }
          }
          result.push(tempArr); // 결과 배열에 임시 배열을 추가합니다.

          tempArr = [ "기간" ]; // "기간" 문자열을 임시 배열에 추가합니다.
          for (let i = 0; i < this.length; i++) {
            tempArr.push(this[i].name); // 각 리포트의 이름을 추가합니다.
            for (let j = 0; j < constColumns.length - 1; j++) {
              tempArr.push(""); // 빈 문자열을 추가합니다.
            }
          }
          result.push(tempArr); // 결과 배열에 임시 배열을 추가합니다.

          tempArr = [ "항목" ]; // "항목" 문자열을 임시 배열에 추가합니다.
          for (let i = 0; i < this.length; i++) {
            for (let j = 0; j < constColumns.length; j++) {
              tempArr.push(constColumns[j].name); // 각 컬럼의 이름을 추가합니다.
            }
          }
          result.push(tempArr); // 결과 배열에 임시 배열을 추가합니다.

          // 각 타겟의 상세 항목을 순회합니다.
          for (let i = 0; i < this[0][targetArr[t].target].detail.length; i++) {
            tempArr = [ this[0][targetArr[t].target].detail[i].name ]; // 상세 항목의 이름을 임시 배열에 추가합니다.
            for (let j = 0; j < this.length; j++) {
              for (let k = 0; k < constColumns.length; k++) {
                tempColumnArr = constColumns[k].target.split('.'); // 컬럼 타겟을 '.'으로 분리합니다.
                finalObj = this[j][targetArr[t].target].detail[i]; // 타겟의 상세 객체를 가져옵니다.
                for (let z of tempColumnArr) {
                  finalObj = finalObj[z]; // 타겟 객체의 깊이를 탐색하여 최종 객체를 설정합니다.
                }
                tempArr.push(finalObj); // 최종 객체를 임시 배열에 추가합니다.
              }
            }
            result.push(tempArr); // 결과 배열에 임시 배열을 추가합니다.
          }

          tempArr = [ "평균값" ]; // "평균값" 문자열을 임시 배열에 추가합니다.
          for (let i = 0; i < this.length; i++) {
            tempArr.push(this[i][targetArr[t].target].average === null ? "" : this[i][targetArr[t].target].average); // 평균값을 추가합니다.
            for (let j = 0; j < constColumns.length - 1; j++) {
              tempArr.push(""); // 빈 문자열을 추가합니다.
            }
          }
          result.push(tempArr); // 결과 배열에 임시 배열을 추가합니다.

          tempArr = [ "문의" ]; // "문의" 문자열을 임시 배열에 추가합니다.
          for (let i = 0; i < this.length; i++) {
            tempArr.push(this[i].total); // 총 문의 수를 추가합니다.
            for (let j = 0; j < constColumns.length - 1; j++) {
              tempArr.push(""); // 빈 문자열을 추가합니다.
            }
          }
          result.push(tempArr); // 결과 배열에 임시 배열을 추가합니다.

          tempArr = [ "제안" ]; // "제안" 문자열을 임시 배열에 추가합니다.
          for (let i = 0; i < this.length; i++) {
            tempArr.push(this[i].proposalTotal); // 총 제안 수를 추가합니다.
            for (let j = 0; j < constColumns.length - 1; j++) {
              tempArr.push(""); // 빈 문자열을 추가합니다.
            }
          }
          result.push(tempArr); // 결과 배열에 임시 배열을 추가합니다.

          tempArr = [ "진행" ]; // "진행" 문자열을 임시 배열에 추가합니다.
          for (let i = 0; i < this.length; i++) {
            tempArr.push(this[i].contactTotal); // 총 계약 수를 추가합니다.
            for (let j = 0; j < constColumns.length - 1; j++) {
              tempArr.push(""); // 빈 문자열을 추가합니다.
            }
          }
          result.push(tempArr); // 결과 배열에 임시 배열을 추가합니다.

          // 빈 줄을 추가합니다.
          result.push([ "" ]);
          result.push([ "" ]);
        }
      } else {
        result = null; // 리포트가 비어있다면 null을 반환합니다.
      }

      return result; // 매트릭스 결과를 반환합니다.
    }

    // 콘솔에 리포트 종료를 알리는 메시지를 출력합니다.
    console.log(`\x1b[36m\x1b[1m%s\x1b[0m`, `client report end ====================================================`);

    // 생성된 고객 리포트를 반환합니다.
    return clientsReport;

  } catch (e) {
    // 오류가 발생하면, 발생한 오류 메시지를 로그에 기록합니다.
    await errorLog("리포트 분석 생김 : " + e.message);
  }
}

/**
 * @method getCaseProidById
 * @description 주어진 고객 ID(cliid)를 기준으로 해당 고객의 사례(Case) 정보를 조회합니다. 고객과 연관된 프로젝트를 포함한 다양한 정보를 분석하여 고객의 유형에 따른 제안 및 서비스 데이터를 반환합니다.
 * @param {string} id - 조회할 고객의 고유 ID(cliid)입니다.
 * @param {Object} option - 설정 옵션 객체입니다.
 * @param {Object} [option.selfMongo=null] - 사용할 MongoDB 인스턴스입니다. 기본값은 null입니다.
 * @returns {Promise<Object|null>} 고객의 사례 정보가 담긴 객체를 반환하거나, 해당 고객이 없을 경우 null을 반환합니다.
 */
BackMaker.prototype.getCaseProidById = async function (id, option = { selfMongo: null }) {

  // 현재 BackMaker 인스턴스를 instance 변수에 저장합니다.
  const instance = this;

  try {
    // 주어진 ID가 문자열이 아닌 경우 오류를 발생시킵니다.
    if (typeof id !== "string") {
      throw new Error("must be cliid");
    }

    // 옵션이 객체가 아니거나 배열일 경우 오류를 발생시킵니다.
    if (typeof option !== "object" || Array.isArray(option)) {
      throw new Error("invaild option input");
    }

    // withTools 옵션이 true로 설정되지 않은 경우 true로 강제 설정합니다.
    if (option.withTools !== true) {
      option.withTools = true;
    }

    // 24개월 전 날짜를 기준으로 하는 Date 객체를 생성합니다.
    const ago = new Date();
    ago.setMonth(ago.getMonth() - 24);

    // 24개월 이내에 문의한 고객 데이터를 가져옵니다.
    const clients = await this.getClientsByQuery({ "requests.0.request.timeline": { $gte: ago } }, { withTools: true, ...option });

    // 24개월 이내에 제안된 프로젝트 데이터를 가져옵니다.
    const projects = await this.getProjectsByQuery({ "proposal.date": { $gte: ago } }, { withTools: true, ...option });

    // 고객 데이터를 바탕으로 고객 유형에 따른 사례 정보를 가져옵니다.
    const cases = clients.getType().getTypeCases(projects);

    // 주어진 ID(cliid)에 해당하는 고객 데이터를 가져옵니다.
    const targetClient = await this.getClientById(id, option);

    // 고객 데이터가 없는 경우 null을 반환합니다.
    if (targetClient === null) {
      return null;
    } else {
      // ClientCase라는 내부 클래스를 정의하여 고객과 그 사례를 포함하는 객체를 생성합니다.
      const ClientCase = function (client, cases) {
        this.client = client;
        this.cases = cases;
      }

      /**
       * @method caseProposal
       * @description 고객 사례를 바탕으로 제안된 프로젝트와 계약된 프로젝트의 ID 목록을 반환합니다.
       * @returns {Array} 제안 및 계약된 프로젝트의 ID 목록을 반환합니다.
       */
      ClientCase.prototype.caseProposal = function () {
        const { cases } = this;
        let contract, proposal, final;
        contract = [];
        proposal = [];

        // 각 사례에서 제안된 프로젝트와 계약된 프로젝트의 ID를 수집합니다.
        for (let { proidArr, contractArr } of cases) {
          contract = contract.concat(contractArr);
          proposal = proposal.concat(proidArr);
        }

        // 제안된 프로젝트 ID와 계약된 프로젝트 ID를 중복 없이 정리합니다.
        contract = Array.from(new Set(contract));
        proposal = Array.from(new Set(proposal));

        // 계약된 프로젝트 ID를 제안된 프로젝트 ID에서 제외합니다.
        proposal = proposal.filter((p) => { return !contract.includes(p); });

        // 제안 및 계약된 프로젝트 ID를 정렬하고 합칩니다.
        contract.sort();
        proposal.sort();
        final = proposal.concat(contract).reverse();

        // 프로젝트 ID를 바탕으로 프로젝트 객체를 반환합니다.
        return final.map((proid) => { return projects.search(proid); });
      }

      /**
       * @method caseService
       * @description 고객 사례를 바탕으로 고객이 받은 서비스에 대한 평균 비용 정보를 반환합니다.
       * @returns {Object|null} 서비스 ID 및 서비스 유형에 따른 평균 비용 정보를 반환하거나, 데이터가 없는 경우 null을 반환합니다.
       */
      ClientCase.prototype.caseService = function () {
        const projectArr = this.caseProposal();

        // 각 프로젝트의 서비스 정보를 추출하여 평균 비용을 계산합니다.
        const serviceArr = projectArr.map((project) => {
          let serviceObj = JSON.parse(JSON.stringify(project.service));
          let length, total;
          let average;
          length = 0;
          total = 0;

          // 각 제안의 비용 정보를 합산하여 평균을 계산합니다.
          for (let { fee } of project.proposal.detail) {
            for (let { amount } of fee) {
              length = length + 1;
              total = total + amount;
            }
          }

          // 평균 비용을 계산합니다.
          if (length === 0) {
            average = 0;
          } else {
            average = Math.round((total / length) / 1000) * 1000;
          }
          serviceObj.average = average;
          return serviceObj;
        });

        // 서비스 배열이 비어 있는 경우 null을 반환합니다.
        if (serviceArr.length === 0) {
          return null;
        } else {
          let seridArr, xValueArr;
          let seridObj, xValueObj;
          let tempArr, tempNum;
          let average;

          // 서비스 ID와 xValue를 배열로 변환합니다.
          seridArr = serviceArr.map((obj) => { return obj.serid; });
          xValueArr = serviceArr.map((obj) => { return obj.xValue; });

          // 서비스 ID를 기준으로 개수를 계산합니다.
          seridObj = {};
          for (let s of seridArr) {
            if (seridObj[s] === undefined) {
              seridObj[s] = 1;
            } else {
              seridObj[s] = seridObj[s] + 1;
            }
          }

          // xValue를 기준으로 개수를 계산합니다.
          xValueObj = {};
          for (let s of xValueArr) {
            if (xValueObj[s] === undefined) {
              xValueObj[s] = 1;
            } else {
              xValueObj[s] = xValueObj[s] + 1;
            }
          }

          // 서비스 ID와 xValue를 정렬합니다.
          seridArr = [];
          for (let i in seridObj) {
            seridArr.push({ serid: i, number: seridObj[i] });
          }

          xValueArr = [];
          for (let i in xValueObj) {
            xValueArr.push({ xValue: i, number: xValueObj[i] });
          }

          seridArr.sort((a, b) => { return b.number - a.number; });
          xValueArr.sort((a, b) => { return b.number - a.number; });

          // 서비스 ID별 평균 비용을 계산합니다.
          for (let obj of seridArr) {
            tempArr = serviceArr.filter((s) => { return s.serid === obj.serid; });
            tempNum = 0;
            obj.fee = [];
            for (let t of tempArr) {
              tempNum += t.average;
              obj.fee.push(t.average);
            }
            average = 0;
            if (tempArr.length !== 0) {
              average = Math.round((tempNum / tempArr.length) / 1000) * 1000;
            }
            obj.average = average;
          }

          // 서비스 ID 또는 xValue 배열이 비어 있는 경우 null을 반환합니다.
          if (seridArr.length === 0 || xValueArr.length === 0) {
            return null;
          } else {
            return { serid: seridArr, xValue: xValueArr };
          }
        }
      }

      // 고객과 사례를 포함한 결과 객체를 반환합니다.
      const resultObj = new ClientCase(targetClient, cases.parsingCases(targetClient));
      return resultObj;
    }
  } catch (e) {
    // 오류 발생 시 오류 메시지를 콘솔에 출력합니다.
    console.log(e);
  }
}

// GET Contents --------------------------------------------------------------------------------

/**
 * @method getContentsById
 * @description '홈리에종' 회사가 진행한 인테리어 디자인 프로젝트를 웹 콘텐츠로 제작해 웹에 올린 데이터를 ID를 통해 가져오는 메서드입니다.
 * @param {string} conid - 콘텐츠의 고유 ID.
 * @param {Object} option - 추가적인 옵션을 지정하는 객체.
 * @param {boolean} option.withTools - 도구를 함께 사용할지 여부.
 * @param {Object} option.selfMongo - MongoDB 커넥션 객체를 직접 지정할 경우 사용.
 * @param {boolean} option.toNormal - 일반 객체 형식으로 변환할지 여부.
 * @returns {Promise<Object|null>} 콘텐츠 객체 또는 null을 반환합니다.
 */
BackMaker.prototype.getContentsById = async function (conid, option = { withTools: false, selfMongo: null, toNormal: false }) {
  // this를 instance 변수에 할당하여 BackMaker 클래스의 메서드 및 속성에 접근할 수 있도록 합니다.
  const instance = this;

  // Mother 클래스에서 mongo와 mongoinfo를 가져옵니다.
  // mongo는 MongoDB 클라이언트 객체, mongoinfo는 MongoDB 연결 정보를 담고 있습니다.
  const { mongo, mongoinfo } = this.mother;

  // MongoDB 연결을 위한 새로운 클라이언트 객체를 생성합니다.
  const MONGOC = new mongo(mongoinfo);

  // 컬렉션 이름을 "contents"로 지정합니다.
  const button = "contents";

  // Contents, ContentsArr, Tools 모듈을 해당 디렉토리에서 가져옵니다.
  // 이들은 콘텐츠 객체를 생성하고, 도구를 사용할 수 있는 기능을 제공합니다.
  let { Contents, ContentsArr, Tools } = require(`${this.aliveDir}/contents/addOn/generator.js`);

  try {
    let arr, target; // 데이터 배열과 타겟 콘텐츠를 저장할 변수를 선언합니다.

    // MongoDB 연결이 지정되지 않았거나 null인 경우
    if (option.selfMongo === undefined || option.selfMongo === null) {
      // MongoDB에 연결합니다.
      await MONGOC.connect();

      // conid에 해당하는 콘텐츠 데이터를 MongoDB에서 찾아 배열로 반환합니다.
      arr = await MONGOC.db(`miro81`).collection(button).find({ conid }).toArray();

      // MongoDB 연결을 닫습니다.
      await MONGOC.close();
    } else {
      // 지정된 MongoDB 연결을 사용하여 데이터를 찾습니다.
      arr = await option.selfMongo.db(`miro81`).collection(button).find({ conid }).toArray();
    }

    // withTools 옵션이 true인 경우 콘텐츠 객체에 도구 기능을 추가합니다.
    if (option.withTools) {
      Contents = Tools.withTools(Contents);
    }

    // 찾은 콘텐츠 데이터가 있는 경우
    if (arr.length > 0) {
      // 첫 번째 결과를 Contents 객체로 만듭니다.
      target = new Contents(arr[0]);

      // toNormal 옵션이 true인 경우 일반 객체로 변환합니다.
      if (option.toNormal === true) {
        target = target.toNormal();
      }
    } else {
      // 데이터를 찾지 못한 경우 null을 반환합니다.
      target = null;
    }

    // 결과로 target 객체를 반환합니다.
    return target;
  } catch (e) {
    // 오류가 발생한 경우 콘솔에 오류 메시지를 출력합니다.
    console.log(e);
  }
}

/**
 * @method getContentsByPid
 * @description '홈리에종' 회사가 진행한 인테리어 디자인 프로젝트를 웹 콘텐츠로 제작해 웹에 올린 데이터를 프로젝트 ID를 통해 가져오는 메서드입니다.
 * @param {string} pid - 프로젝트의 고유 ID.
 * @param {Object} option - 추가적인 옵션을 지정하는 객체.
 * @param {boolean} option.withTools - 도구를 함께 사용할지 여부.
 * @param {Object} option.selfMongo - MongoDB 커넥션 객체를 직접 지정할 경우 사용.
 * @param {boolean} option.toNormal - 일반 객체 형식으로 변환할지 여부.
 * @returns {Promise<Object|null>} 콘텐츠 객체 또는 null을 반환합니다.
 */
BackMaker.prototype.getContentsByPid = async function (pid, option = { withTools: false, selfMongo: null, toNormal: false }) {
  // 현재 객체의 참조를 instance 변수에 저장하여 이후 메서드 내에서 사용합니다.
  const instance = this;

  // Mother 클래스에서 mongo와 mongoinfo 속성을 가져옵니다.
  // mongo는 MongoDB 클라이언트 객체를 나타내고, mongoinfo는 MongoDB 연결 정보를 담고 있습니다.
  const { mongo, mongoinfo } = this.mother;

  // MongoDB 연결을 위한 새로운 클라이언트 객체를 생성합니다.
  const MONGOC = new mongo(mongoinfo);

  // 사용할 MongoDB 컬렉션 이름을 "contents"로 지정합니다.
  const button = "contents";

  // Contents, ContentsArr, Tools 모듈을 가져옵니다.
  // 이는 콘텐츠 데이터를 다루고, 추가 도구를 사용하는 데 사용됩니다.
  let { Contents, ContentsArr, Tools } = require(`${this.aliveDir}/contents/addOn/generator.js`);

  try {
    let arr, target; // 콘텐츠 데이터를 담을 배열과 선택된 콘텐츠를 담을 변수를 선언합니다.

    // MongoDB 연결이 지정되지 않았거나 null인 경우
    if (option.selfMongo === undefined || option.selfMongo === null) {
      // MongoDB에 연결합니다.
      await MONGOC.connect();

      // "contents.portfolio.pid" 필드가 주어진 pid와 일치하는 문서를 MongoDB에서 검색하여 배열로 반환합니다.
      arr = await MONGOC.db(`miro81`).collection(button).find({ "contents.portfolio.pid": pid }).toArray();

      // MongoDB 연결을 닫습니다.
      await MONGOC.close();
    } else {
      // 지정된 MongoDB 연결을 사용하여 검색합니다.
      arr = await option.selfMongo.db(`miro81`).collection(button).find({ "contents.portfolio.pid": pid }).toArray();
    }

    // withTools 옵션이 true인 경우 Contents 객체에 도구 기능을 추가합니다.
    if (option.withTools) {
      Contents = Tools.withTools(Contents);
    }

    // 검색된 콘텐츠 데이터가 있는 경우
    if (arr.length > 0) {
      // 첫 번째 결과를 Contents 객체로 만듭니다.
      target = new Contents(arr[0]);

      // toNormal 옵션이 true인 경우 일반 객체로 변환합니다.
      if (option.toNormal === true) {
        target = target.toNormal();
      }
    } else {
      // 데이터를 찾지 못한 경우 null을 반환합니다.
      target = null;
    }

    // 결과로 target 객체를 반환합니다.
    return target;
  } catch (e) {
    // 오류가 발생하면, 콘솔에 오류 메시지를 출력합니다.
    console.log(e);
  }
}

/**
 * @method getContentsArrByQuery
 * @description '홈리에종' 회사가 진행한 인테리어 디자인 프로젝트를 웹 콘텐츠로 제작해 웹에 올린 데이터 배열을 쿼리 조건에 따라 가져오는 메서드입니다.
 * @param {Object} query - MongoDB 쿼리 조건을 지정하는 객체.
 * @param {Object} option - 추가적인 옵션을 지정하는 객체.
 * @param {boolean} option.withTools - 도구를 함께 사용할지 여부.
 * @param {Object} option.selfMongo - MongoDB 커넥션 객체를 직접 지정할 경우 사용.
 * @param {boolean} option.fromLocal - 로컬 MongoDB를 사용할지 여부.
 * @param {boolean} option.toNormal - 일반 객체 형식으로 변환할지 여부.
 * @param {Object} option.sort - 결과를 정렬할 기준을 지정하는 객체.
 * @param {number} option.limit - 결과의 개수를 제한할 수 있는 옵션.
 * @returns {Promise<Array>} 콘텐츠 객체 배열을 반환합니다.
 */
BackMaker.prototype.getContentsArrByQuery = async function (query, option = { withTools: false, selfMongo: null, fromLocal: null, toNormal: false }) {
  // this를 instance 변수에 할당하여 BackMaker 클래스의 메서드 및 속성에 접근할 수 있도록 합니다.
  const instance = this;

  // Mother 클래스에서 mongo, mongoinfo, mongolocalinfo 속성을 가져옵니다.
  // mongo는 MongoDB 클라이언트 객체를 나타내며, mongoinfo와 mongolocalinfo는 각각 원격 및 로컬 MongoDB 연결 정보를 담고 있습니다.
  const { mongo, mongoinfo, mongolocalinfo } = this.mother;

  let MONGOC; // 사용할 MongoDB 클라이언트를 저장할 변수를 선언합니다.

  // fromLocal 옵션이 true이면 로컬 MongoDB를 사용하고, 그렇지 않으면 원격 MongoDB를 사용합니다.
  if (option.fromLocal === true) {
    MONGOC = new mongo(mongolocalinfo);
  } else {
    MONGOC = new mongo(mongoinfo);
  }

  // 사용할 MongoDB 컬렉션 이름을 "contents"로 지정합니다.
  const button = "contents";

  // Contents, ContentsArr, Tools 모듈을 가져옵니다.
  // 이는 콘텐츠 데이터를 다루고, 추가 도구를 사용하는 데 사용됩니다.
  let { Contents, ContentsArr, Tools } = require(`${this.aliveDir}/contents/addOn/generator.js`);

  try {
    let tong, contentsArr; // 데이터 배열과 콘텐츠 배열을 저장할 변수를 선언합니다.
    let sortQuery; // 정렬 기준을 저장할 변수를 선언합니다.

    // 정렬 옵션이 지정되지 않은 경우 기본 정렬 기준을 "contents.portfolio.date"로 설정합니다.
    if (option.sort === undefined) {
      sortQuery = { "contents.portfolio.date": -1 };
    } else {
      // 정렬 옵션이 지정된 경우 해당 옵션을 사용합니다.
      sortQuery = option.sort;
    }

    // selfMongo 옵션이 지정되지 않았거나 null인 경우
    if (option.selfMongo === undefined || option.selfMongo === null) {
      // MongoDB에 연결합니다.
      await MONGOC.connect();

      // limit 옵션이 지정된 경우, 지정된 개수만큼의 결과를 가져옵니다.
      if (option.limit !== undefined && option.limit !== null) {
        tong = await MONGOC.db(`miro81`).collection(button).find(query).sort(sortQuery).limit(Number(option.limit)).toArray();
      } else {
        // limit 옵션이 지정되지 않은 경우, 전체 결과를 가져옵니다.
        tong = await MONGOC.db(`miro81`).collection(button).find(query).sort(sortQuery).toArray();
      }

      // MongoDB 연결을 닫습니다.
      await MONGOC.close();
    } else {
      // selfMongo 옵션이 지정된 경우 해당 MongoDB 커넥션을 사용하여 데이터를 검색합니다.
      if (option.limit !== undefined && option.limit !== null) {
        tong = await option.selfMongo.db(`miro81`).collection(button).find(query).sort(sortQuery).limit(Number(option.limit)).toArray();
      } else {
        tong = await option.selfMongo.db(`miro81`).collection(button).find(query).sort(sortQuery).toArray();
      }
    }

    // withTools 옵션이 false인 경우
    if (!option.withTools) {
      contentsArr = new ContentsArr(); // ContentsArr 객체를 생성합니다.
      for (let i of tong) {
        try {
          contentsArr.push(new Contents(i)); // 각 콘텐츠를 Contents 객체로 만들어 배열에 추가합니다.
        } catch (e) {
          console.log(i); // 오류 발생 시 해당 콘텐츠 데이터를 출력합니다.
        }
      }
    } else {
      // withTools 옵션이 true인 경우, 도구 기능을 추가합니다.
      Contents = Tools.withTools(Contents);
      ContentsArr = Tools.withToolsArr(ContentsArr);
      contentsArr = new ContentsArr();
      for (let i of tong) {
        contentsArr.push(new Contents(i)); // 도구가 추가된 콘텐츠를 배열에 추가합니다.
      }
    }

    // toNormal 옵션이 true인 경우, 배열의 모든 콘텐츠를 일반 객체 형식으로 변환합니다.
    if (option.toNormal === true) {
      contentsArr = contentsArr.toNormal();
    }

    // 결과로 콘텐츠 배열을 반환합니다.
    return contentsArr;
  } catch (e) {
    // 오류가 발생한 경우 콘솔에 오류 메시지를 출력합니다.
    console.log(e);
  }
}

/**
 * @method getContentsArrAll
 * @description '홈리에종' 회사가 진행한 인테리어 디자인 프로젝트를 웹 콘텐츠로 제작하여 웹에 올린 모든 데이터를 가져오는 메서드입니다.
 * @param {Object} option - 추가적인 옵션을 지정하는 객체.
 * @param {boolean} option.withTools - 도구를 함께 사용할지 여부를 지정합니다.
 * @param {Object} option.selfMongo - MongoDB 커넥션 객체를 직접 지정할 경우 사용합니다.
 * @param {boolean} option.toNormal - 일반 객체 형식으로 변환할지 여부를 지정합니다.
 * @returns {Promise<Array>} 모든 콘텐츠 객체 배열을 반환합니다.
 */
BackMaker.prototype.getContentsArrAll = async function (option = { withTools: false, selfMongo: null, toNormal: false }) {
  // this를 instance 변수에 할당하여 BackMaker 클래스의 메서드 및 속성에 접근할 수 있도록 합니다.
  const instance = this;

  // Mother 클래스에서 mongo와 mongoinfo 속성을 가져옵니다.
  // mongo는 MongoDB 클라이언트 객체를 나타내며, mongoinfo는 MongoDB 연결 정보를 담고 있습니다.
  const { mongo, mongoinfo } = this.mother;

  // MongoDB 클라이언트 객체를 생성합니다.
  const MONGOC = new mongo(mongoinfo);

  // 사용할 MongoDB 컬렉션 이름을 "contents"로 지정합니다.
  const button = "contents";

  // Contents, ContentsArr, Tools 모듈을 가져옵니다.
  // 이는 콘텐츠 데이터를 다루고, 추가 도구를 사용하는 데 사용됩니다.
  let { Contents, ContentsArr, Tools } = require(`${this.aliveDir}/contents/addOn/generator.js`);

  try {
    let tong, projectsArr; // 데이터 배열과 콘텐츠 배열을 저장할 변수를 선언합니다.

    // selfMongo 옵션이 지정되지 않았거나 null인 경우
    if (option.selfMongo === undefined || option.selfMongo === null) {
      // MongoDB에 연결합니다.
      await MONGOC.connect();

      // 컬렉션에서 모든 콘텐츠 데이터를 가져옵니다.
      tong = await MONGOC.db(`miro81`).collection(button).find({}).toArray();

      // MongoDB 연결을 닫습니다.
      await MONGOC.close();
    } else {
      // selfMongo 옵션이 지정된 경우 해당 MongoDB 커넥션을 사용하여 모든 데이터를 가져옵니다.
      tong = await option.selfMongo.db(`miro81`).collection(button).find({}).toArray();
    }

    // withTools 옵션이 false인 경우
    if (!option.withTools) {
      // ContentsArr 객체를 생성합니다.
      projectsArr = new ContentsArr();

      // 가져온 각 콘텐츠 데이터를 Contents 객체로 만들어 배열에 추가합니다.
      for (let i of tong) {
        projectsArr.push(new Contents(i));
      }
    } else {
      // withTools 옵션이 true인 경우, 도구 기능을 추가합니다.
      Contents = Tools.withTools(Contents);
      ContentsArr = Tools.withToolsArr(ContentsArr);
      projectsArr = new ContentsArr();

      // 도구가 추가된 콘텐츠를 배열에 추가합니다.
      for (let i of tong) {
        projectsArr.push(new Contents(i));
      }
    }

    // toNormal 옵션이 true인 경우, 배열의 모든 콘텐츠를 일반 객체 형식으로 변환합니다.
    if (option.toNormal === true) {
      projectsArr = projectsArr.toNormal();
    }

    // 결과로 콘텐츠 배열을 반환합니다.
    return projectsArr;
  } catch (e) {
    // 오류가 발생한 경우 콘솔에 오류 메시지를 출력합니다.
    console.log(e);
  }
}

/**
 * @method updateContents
 * @description '홈리에종' 회사가 직접 진행한 인테리어 디자인 프로젝트를 웹 콘텐츠로 제작하여 웹에 올린 데이터를 업데이트하는 메서드입니다.
 * @param {Array} queryArr - 업데이트할 데이터를 지정하는 두 개의 쿼리 객체 배열입니다. [whereQuery, updateQuery] 형식이어야 합니다.
 * @param {Object} option - 추가적인 옵션을 지정하는 객체.
 * @param {Object|null} option.selfMongo - MongoDB 커넥션 객체를 직접 지정할 경우 사용합니다.
 * @returns {Promise<string>} 업데이트 작업이 성공하면 "success"를 반환하고, 실패하면 "fail"을 반환합니다.
 * @throws {Error} 쿼리 배열이 유효하지 않거나, 업데이트 쿼리가 객체가 아닌 경우 오류를 발생시킵니다.
 */
BackMaker.prototype.updateContents = async function (queryArr, option = { selfMongo: null }) {
  // 쿼리 배열의 길이가 2가 아닌 경우 오류를 발생시킵니다.
  if (queryArr.length !== 2) {
    throw new Error("invaild arguments : query object must be Array: [ Object: whereQuery, Object: updateQuery ]");
  }

  // this를 instance 변수에 할당하여 BackMaker 클래스의 메서드 및 속성에 접근할 수 있도록 합니다.
  const instance = this;

  // Mother 클래스에서 mongo와 mongoinfo 속성을 가져옵니다.
  // mongo는 MongoDB 클라이언트 객체를 나타내며, mongoinfo는 MongoDB 연결 정보를 담고 있습니다.
  const { mongo, mongoinfo } = this.mother;

  // MongoDB 클라이언트 객체를 생성합니다.
  const MONGOC = new mongo(mongoinfo);

  // 사용할 MongoDB 컬렉션 이름을 "contents"로 지정합니다.
  const button = "contents";

  try {
    // queryArr 배열에서 whereQuery와 updateQuery를 구조 분해 할당으로 추출합니다.
    const [ whereQuery, updateQuery ] = queryArr;

    // updateQuery가 객체가 아니거나 null인 경우 오류를 발생시킵니다.
    if (typeof updateQuery !== "object" || updateQuery === null) {
      throw new Error("invalid updateQuery");
    }

    // updateQuery에서 "null" 키가 존재할 경우 이를 삭제합니다.
    if (updateQuery["null"] !== undefined) {
      delete updateQuery["null"];
    }

    // selfMongo 옵션이 지정되지 않았거나 null인 경우
    if (option.selfMongo === undefined || option.selfMongo === null) {
      // MongoDB에 연결합니다.
      await MONGOC.connect();

      // whereQuery에 맞는 문서를 찾아 updateQuery로 업데이트합니다.
      await MONGOC.db(`miro81`).collection(button).updateOne(whereQuery, { $set: updateQuery });

      // MongoDB 연결을 닫습니다.
      await MONGOC.close();
    } else {
      // selfMongo 옵션이 지정된 경우 해당 MongoDB 커넥션을 사용하여 업데이트 작업을 수행합니다.
      await option.selfMongo.db(`miro81`).collection(button).updateOne(whereQuery, { $set: updateQuery });
    }

    // 작업이 성공하면 "success"를 반환합니다.
    return "success";
  } catch (e) {
    // 오류가 발생한 경우 콘솔에 오류 메시지를 출력하고 "fail"을 반환합니다.
    console.log(e);
    return "fail";
  }
}

/**
 * @method deleteContents
 * @description '홈리에종' 회사가 직접 진행한 인테리어 디자인 프로젝트를 웹 콘텐츠로 제작하여 웹에 올린 데이터를 삭제하는 메서드입니다.
 * @param {string} conid - 삭제할 콘텐츠의 고유 ID.
 * @param {Object} option - 추가적인 옵션을 지정하는 객체.
 * @param {Object|null} option.selfMongo - MongoDB 커넥션 객체를 직접 지정할 경우 사용합니다.
 * @returns {Promise<string>} 삭제 작업이 성공하면 "success"를 반환합니다.
 * @throws {Error} 오류가 발생할 경우 오류 메시지를 출력합니다.
 */
BackMaker.prototype.deleteContents = async function (conid, option = { selfMongo: null }) {
  // this를 instance 변수에 할당하여 BackMaker 클래스의 메서드 및 속성에 접근할 수 있도록 합니다.
  const instance = this;

  // Mother 클래스에서 mongo와 mongoinfo 속성을 가져옵니다.
  // mongo는 MongoDB 클라이언트 객체를 나타내며, mongoinfo는 MongoDB 연결 정보를 담고 있습니다.
  const { mongo, mongoinfo } = this.mother;

  // MongoDB 클라이언트 객체를 생성합니다.
  const MONGOC = new mongo(mongoinfo);

  // 사용할 MongoDB 컬렉션 이름을 "contents"로 지정합니다.
  const button = "contents";

  try {
    // selfMongo 옵션이 지정되지 않았거나 null인 경우
    if (option.selfMongo === undefined || option.selfMongo === null) {
      // MongoDB에 연결합니다.
      await MONGOC.connect();

      // conid에 해당하는 콘텐츠를 삭제합니다.
      await MONGOC.db(`miro81`).collection(button).deleteOne({ conid });

      // MongoDB 연결을 닫습니다.
      await MONGOC.close();
    } else {
      // selfMongo 옵션이 지정된 경우 해당 MongoDB 커넥션을 사용하여 삭제 작업을 수행합니다.
      await option.selfMongo.db(`miro81`).collection(button).deleteOne({ conid });
    }

    // 작업이 성공하면 "success"를 반환합니다.
    return "success";
  } catch (e) {
    // 오류가 발생한 경우 콘솔에 오류 메시지를 출력합니다.
    console.log(e);
  }
}

/**
 * @method createContents
 * @description '홈리에종' 회사가 직접 진행한 인테리어 디자인 프로젝트를 웹 콘텐츠로 제작하여 웹에 올린 데이터를 생성하는 메서드입니다.
 * @param {Object} updateQuery - 새로 생성할 콘텐츠의 속성을 업데이트하는 쿼리 객체.
 * @param {Object} option - 추가적인 옵션을 지정하는 객체.
 * @param {Object|null} option.selfMongo - MongoDB 커넥션 객체를 직접 지정할 경우 사용합니다.
 * @returns {Promise<string>} 생성된 콘텐츠의 고유 ID (conid)를 반환합니다.
 * @throws {Error} 오류가 발생할 경우 오류 메시지를 출력합니다.
 */
BackMaker.prototype.createContents = async function (updateQuery, option = { selfMongo: null }) {
  // this를 instance 변수에 할당하여 BackMaker 클래스의 메서드 및 속성에 접근할 수 있도록 합니다.
  const instance = this;

  // Mother 클래스에서 mongo와 mongoinfo 속성을 가져옵니다.
  // mongo는 MongoDB 클라이언트 객체를 나타내며, mongoinfo는 MongoDB 연결 정보를 담고 있습니다.
  const { mongo, mongoinfo } = this.mother;

  // MongoDB 클라이언트 객체를 생성합니다.
  const MONGOC = new mongo(mongoinfo);

  // 사용할 MongoDB 컬렉션 이름을 "contents"로 지정합니다.
  const button = "contents";

  // 콘텐츠 데이터를 위한 매핑 객체를 가져옵니다.
  const map = require(`${this.mapDir}/contents/addOn/generator.js`).ContentsMap;

  try {
    // 더미 데이터와 최신 콘텐츠 데이터를 저장할 변수를 선언합니다.
    let dummy, latestContents, latestContentsArr;

    // 새로운 옵션 객체를 생성합니다.
    let newOption = {};

    // selfMongo 옵션이 지정된 경우, 새 옵션 객체에 추가합니다.
    if (option.selfMongo !== undefined && option.selfMongo !== null) {
      newOption.selfMongo = option.selfMongo;
    }

    // 새 옵션에 도구 사용 여부와 정렬 옵션을 추가합니다.
    newOption.withTools = false;
    newOption.sort = { "conid": -1 };
    newOption.limit = 1;

    // 최신 콘텐츠 데이터를 쿼리합니다.
    latestContentsArr = await this.getContentsArrByQuery({}, newOption);

    // 가장 최신 콘텐츠 데이터를 가져옵니다.
    latestContents = latestContentsArr[0];

    // 콘텐츠 생성을 위한 더미 데이터를 가져옵니다.
    dummy = map.main();

    // ID 생성기를 사용하여 새로운 콘텐츠 ID(conid)를 생성합니다.
    dummy.structure.conid = this.idMaker(latestContents.conid);

    // MongoDB 연결을 확인하고 콘텐츠 데이터를 삽입합니다.
    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect();
      await MONGOC.db(`miro81`).collection(button).insertOne(dummy.structure);
      await MONGOC.close();
    } else {
      await option.selfMongo.db(`miro81`).collection(button).insertOne(dummy.structure);
    }

    // 생성된 콘텐츠에 대한 업데이트 쿼리를 실행합니다.
    await this.updateContents([ { conid: dummy.structure.conid }, updateQuery ], option);

    // 생성된 콘텐츠의 conid를 반환합니다.
    return dummy.structure.conid;
  } catch (e) {
    // 오류가 발생한 경우 콘솔에 오류 메시지를 출력합니다.
    console.log(e);
  }
}

// GET Service --------------------------------------------------------------------------------

/**
 * BackMaker 클래스의 getServiceById 메서드
 * 
 * 이 메서드는 '홈리에종' 서비스에 대한 정보를 serid(서비스 ID)를 통해 조회하는 기능을 담당합니다.
 * '홈리에종' 서비스는 홈퍼니싱, 홈스타일링, 토탈 스타일링, 엑스트라 스타일링의 네 가지로 구성되어 있으며, 각각의 ID는 다음과 같습니다:
 * - 홈퍼니싱: s2011_aa01s
 * - 홈스타일링: s2011_aa02s
 * - 토탈 스타일링: s2011_aa03s
 * - 엑스트라 스타일링: s2011_aa04s
 *
 * @param {string} serid - 조회할 서비스의 ID
 * @param {Object} option - 메서드 실행 시의 옵션을 지정하는 객체
 * @param {boolean} [option.withTools=false] - true로 설정하면 서비스 객체에 도구 메서드를 포함시킴
 * @param {Object|null} [option.selfMongo=null] - 자체적으로 사용할 MongoDB 연결 객체
 * @param {boolean} [option.toNormal=false] - true로 설정하면 서비스 객체를 일반 객체로 변환하여 반환
 * @returns {Object|null} - 조회된 서비스 객체 또는 null
 */
BackMaker.prototype.getServiceById = async function (serid, option = { withTools: false, selfMongo: null, toNormal: false }) {
  const instance = this; // 현재 BackMaker 인스턴스를 참조합니다.
  const { mongo, mongoinfo } = this.mother; // Mother 클래스의 mongo 및 mongoinfo 메서드를 불러옵니다.
  const MONGOC = new mongo(mongoinfo); // MongoDB 연결을 위한 MONGOC 객체를 생성합니다.
  const button = "service"; // 데이터베이스 컬렉션 이름을 "service"로 설정합니다.
  let { Service, Services, Tools } = require(`${this.aliveDir}/${button}/addOn/generator.js`); // Service, Services, Tools 객체를 가져옵니다.

  try {
    let arr, target;

    if (option.selfMongo === undefined || option.selfMongo === null) { // option.selfMongo가 undefined 또는 null인 경우
      await MONGOC.connect(); // MongoDB 연결을 시작합니다.
      arr = await MONGOC.db(`miro81`).collection(button).find({ serid }).toArray(); // serid를 기준으로 서비스 정보를 조회합니다.
      await MONGOC.close(); // MongoDB 연결을 종료합니다.
    } else { // option.selfMongo가 설정되어 있는 경우
      arr = await option.selfMongo.db(`miro81`).collection(button).find({ serid }).toArray(); // selfMongo를 사용하여 서비스 정보를 조회합니다.
    }

    if (option.withTools) { // withTools 옵션이 true인 경우
      Service = Tools.withTools(Service); // Service 객체에 도구 메서드를 포함시킵니다.
    }

    if (arr.length > 0) { // 조회된 서비스 정보가 있는 경우
      target = new Service(arr[0]); // 첫 번째 조회된 서비스를 Service 객체로 만듭니다.
      if (option.toNormal === true) { // toNormal 옵션이 true인 경우
        target = target.toNormal(); // Service 객체를 일반 객체로 변환합니다.
      }
    } else { // 조회된 서비스 정보가 없는 경우
      target = null; // target을 null로 설정합니다.
    }

    return target; // 조회된 서비스 객체 또는 null을 반환합니다.
  } catch (e) {
    console.log(e); // 오류가 발생한 경우 오류를 로그에 출력합니다.
  }
}

/**
 * BackMaker 클래스의 getServiceByKey 메서드
 * 
 * 이 메서드는 '홈리에종' 서비스에 대한 정보를 key를 통해 조회하는 기능을 담당합니다.
 * '홈리에종' 서비스는 홈퍼니싱, 홈스타일링, 토탈 스타일링, 엑스트라 스타일링의 네 가지로 구성되어 있으며, 각각의 ID는 다음과 같습니다:
 * - 홈퍼니싱: s2011_aa01s
 * - 홈스타일링: s2011_aa02s
 * - 토탈 스타일링: s2011_aa03s
 * - 엑스트라 스타일링: s2011_aa04s
 *
 * @param {string} key - 조회할 서비스의 키
 * @param {Object} option - 메서드 실행 시의 옵션을 지정하는 객체
 * @param {boolean} [option.withTools=false] - true로 설정하면 서비스 객체에 도구 메서드를 포함시킴
 * @param {Object|null} [option.selfMongo=null] - 자체적으로 사용할 MongoDB 연결 객체
 * @param {boolean} [option.toNormal=false] - true로 설정하면 서비스 객체를 일반 객체로 변환하여 반환
 * @returns {Object|null} - 조회된 서비스 객체 또는 null
 */
BackMaker.prototype.getServiceByKey = async function (key, option = { withTools: false, selfMongo: null, toNormal: false }) {
  const instance = this; // 현재 BackMaker 인스턴스를 참조합니다.
  const { mongo, mongoinfo } = this.mother; // Mother 클래스의 mongo 및 mongoinfo 메서드를 불러옵니다.
  const MONGOC = new mongo(mongoinfo); // MongoDB 연결을 위한 MONGOC 객체를 생성합니다.
  const button = "service"; // 데이터베이스 컬렉션 이름을 "service"로 설정합니다.
  let { Service, Services, Tools } = require(`${this.aliveDir}/${button}/addOn/generator.js`); // Service, Services, Tools 객체를 가져옵니다.

  try {
    let arr, target;

    if (option.selfMongo === undefined || option.selfMongo === null) { // option.selfMongo가 undefined 또는 null인 경우
      await MONGOC.connect(); // MongoDB 연결을 시작합니다.
      arr = await MONGOC.db(`miro81`).collection(button).find({ key }).sort({ date: -1 }).toArray(); // key를 기준으로 최신 순으로 서비스 정보를 조회합니다.
      await MONGOC.close(); // MongoDB 연결을 종료합니다.
    } else { // option.selfMongo가 설정되어 있는 경우
      arr = await option.selfMongo.db(`miro81`).collection(button).find({ key }).sort({ date: -1 }).toArray(); // selfMongo를 사용하여 서비스 정보를 조회합니다.
    }

    if (option.withTools) { // withTools 옵션이 true인 경우
      Service = Tools.withTools(Service); // Service 객체에 도구 메서드를 포함시킵니다.
    }

    if (arr.length > 0) { // 조회된 서비스 정보가 있는 경우
      target = new Service(arr[0]); // 첫 번째 조회된 서비스를 Service 객체로 만듭니다.
      if (option.toNormal === true) { // toNormal 옵션이 true인 경우
        target = target.toNormal(); // Service 객체를 일반 객체로 변환합니다.
      }
    } else { // 조회된 서비스 정보가 없는 경우
      target = null; // target을 null로 설정합니다.
    }

    return target; // 조회된 서비스 객체 또는 null을 반환합니다.
  } catch (e) {
    console.log(e); // 오류가 발생한 경우 오류를 로그에 출력합니다.
  }
}

/**
 * BackMaker 클래스의 getServicesByKind 메서드
 *
 * 이 메서드는 '홈리에종' 서비스에 대한 정보를 서비스 종류(kind)를 통해 조회하는 기능을 담당합니다.
 * '홈리에종' 서비스는 홈퍼니싱, 홈스타일링, 토탈 스타일링, 엑스트라 스타일링의 네 가지로 구성되어 있으며,
 * 각각의 ID는 다음과 같습니다:
 * - 홈퍼니싱: s2011_aa01s
 * - 홈스타일링: s2011_aa02s
 * - 토탈 스타일링: s2011_aa03s
 * - 엑스트라 스타일링: s2011_aa04s
 *
 * @param {string} kind - 조회할 서비스의 종류
 * @param {Object} option - 메서드 실행 시의 옵션을 지정하는 객체
 * @param {boolean} [option.withTools=false] - true로 설정하면 서비스 객체에 도구 메서드를 포함시킴
 * @param {Object|null} [option.selfMongo=null] - 자체적으로 사용할 MongoDB 연결 객체
 * @param {boolean} [option.fromLocal=false] - true로 설정하면 로컬 MongoDB를 사용
 * @param {boolean} [option.toNormal=false] - true로 설정하면 서비스 객체를 일반 객체로 변환하여 반환
 * @returns {Object|null} - 조회된 서비스 배열 객체 또는 null
 */
BackMaker.prototype.getServicesByKind = async function (kind, option = { withTools: false, selfMongo: null, fromLocal: null, toNormal: false }) {
  const instance = this; // 현재 BackMaker 인스턴스를 참조합니다.
  const { mongo, mongoinfo, mongolocalinfo } = this.mother; // Mother 클래스의 mongo 및 mongoinfo, mongolocalinfo 메서드를 불러옵니다.
  let MONGOC; // MongoDB 연결 객체를 저장할 변수입니다.

  if (option.fromLocal === true) { // fromLocal 옵션이 true인 경우
    MONGOC = new mongo(mongolocalinfo); // 로컬 MongoDB 연결 객체를 생성합니다.
  } else { // fromLocal 옵션이 false이거나 설정되지 않은 경우
    MONGOC = new mongo(mongoinfo); // 기본 MongoDB 연결 객체를 생성합니다.
  }

  const button = "service"; // 데이터베이스 컬렉션 이름을 "service"로 설정합니다.
  let { Service, Services, Tools } = require(`${this.aliveDir}/${button}/addOn/generator.js`); // Service, Services, Tools 객체를 가져옵니다.

  try {
    let tong, servicesArr; // 서비스 데이터 및 배열을 저장할 변수들입니다.
    let sortQuery; // 정렬 기준을 저장할 변수입니다.
    let keyArr; // 키 배열을 저장할 변수입니다.
    let newTong; // 정렬 및 필터링된 최종 서비스 데이터를 저장할 변수입니다.

    if (option.sort === undefined) { // 정렬 기준이 주어지지 않은 경우
      sortQuery = { "date": -1 }; // 기본적으로 날짜 기준 내림차순으로 정렬합니다.
    } else { // 정렬 기준이 주어진 경우
      sortQuery = option.sort; // 해당 정렬 기준을 사용합니다.
    }

    if (option.selfMongo === undefined || option.selfMongo === null) { // selfMongo가 undefined 또는 null인 경우
      await MONGOC.connect(); // MongoDB 연결을 시작합니다.
      if (option.limit !== undefined) { // limit 옵션이 설정된 경우
        tong = await MONGOC.db(`miro81`).collection(button).find({ kind }).sort(sortQuery).limit(Number(option.limit)).toArray(); // 제한된 수의 서비스 데이터를 조회합니다.
      } else { // limit 옵션이 설정되지 않은 경우
        tong = await MONGOC.db(`miro81`).collection(button).find({ kind }).sort(sortQuery).toArray(); // 모든 서비스 데이터를 조회합니다.
      }
      await MONGOC.close(); // MongoDB 연결을 종료합니다.
    } else { // selfMongo가 설정된 경우
      if (option.limit !== undefined) { // limit 옵션이 설정된 경우
        tong = await option.selfMongo.db(`miro81`).collection(button).find({ kind }).sort(sortQuery).limit(Number(option.limit)).toArray(); // 제한된 수의 서비스 데이터를 조회합니다.
      } else { // limit 옵션이 설정되지 않은 경우
        tong = await option.selfMongo.db(`miro81`).collection(button).find({ kind }).sort(sortQuery).toArray(); // 모든 서비스 데이터를 조회합니다.
      }
    }

    tong.sort((a, b) => {
      return b.date.valueOf() - a.date.valueOf(); // 조회된 서비스 데이터를 날짜 기준으로 내림차순 정렬합니다.
    });

    newTong = []; // 새로운 서비스를 저장할 배열입니다.
    keyArr = []; // 키 배열입니다.

    for (let obj of tong) { // 조회된 서비스 데이터를 순회합니다.
      if (!keyArr.includes(obj.key)) { // 현재 키가 keyArr에 포함되지 않은 경우
        newTong.push(obj); // 해당 서비스를 newTong에 추가합니다.
      }
      keyArr.push(obj.key); // 키를 keyArr에 추가합니다.
    }

    if (!option.withTools) { // withTools 옵션이 false인 경우
      servicesArr = new Services(); // 서비스 배열 객체를 생성합니다.
      for (let i of newTong) { // 필터링된 서비스 데이터를 순회합니다.
        servicesArr.push(new Service(i)); // 각 서비스를 서비스 배열에 추가합니다.
      }
    } else { // withTools 옵션이 true인 경우
      Service = Tools.withTools(Service); // Service 객체에 도구 메서드를 포함시킵니다.
      Services = Tools.withToolsArr(Services); // Services 배열 객체에 도구 메서드를 포함시킵니다.
      servicesArr = new Services(); // 서비스 배열 객체를 생성합니다.
      for (let i of newTong) { // 필터링된 서비스 데이터를 순회합니다.
        servicesArr.push(new Service(i)); // 각 서비스를 서비스 배열에 추가합니다.
      }
    }

    if (option.toNormal === true) { // toNormal 옵션이 true인 경우
      servicesArr = servicesArr.toNormal(); // 서비스 배열 객체를 일반 배열 객체로 변환합니다.
    }

    return servicesArr; // 최종 서비스 배열 객체를 반환합니다.
  } catch (e) {
    console.log(e); // 오류가 발생한 경우 오류를 로그에 출력합니다.
  }
}

/**
 * BackMaker 클래스의 getServicesByQuery 메서드
 *
 * 이 메서드는 '홈리에종' 서비스에 대한 정보를 주어진 쿼리(query)를 통해 조회하는 기능을 담당합니다.
 * '홈리에종' 서비스는 홈퍼니싱, 홈스타일링, 토탈 스타일링, 엑스트라 스타일링의 네 가지로 구성되어 있으며,
 * 각각의 ID는 다음과 같습니다:
 * - 홈퍼니싱: s2011_aa01s
 * - 홈스타일링: s2011_aa02s
 * - 토탈 스타일링: s2011_aa03s
 * - 엑스트라 스타일링: s2011_aa04s
 *
 * @param {Object} query - 조회할 서비스에 대한 MongoDB 쿼리 객체
 * @param {Object} option - 메서드 실행 시의 옵션을 지정하는 객체
 * @param {boolean} [option.withTools=false] - true로 설정하면 서비스 객체에 도구 메서드를 포함시킴
 * @param {Object|null} [option.selfMongo=null] - 자체적으로 사용할 MongoDB 연결 객체
 * @param {boolean} [option.fromLocal=false] - true로 설정하면 로컬 MongoDB를 사용
 * @param {boolean} [option.toNormal=false] - true로 설정하면 서비스 객체를 일반 객체로 변환하여 반환
 * @returns {Object|null} - 조회된 서비스 배열 객체 또는 null
 */
BackMaker.prototype.getServicesByQuery = async function (query, option = { withTools: false, selfMongo: null, fromLocal: null, toNormal: false }) {
  const instance = this; // 현재 BackMaker 인스턴스를 참조합니다.
  const { mongo, mongoinfo, mongolocalinfo } = this.mother; // Mother 클래스의 mongo, mongoinfo 및 mongolocalinfo 속성을 불러옵니다.
  let MONGOC; // MongoDB 연결 객체를 저장할 변수입니다.

  if (option.fromLocal === true) { // fromLocal 옵션이 true인 경우
    MONGOC = new mongo(mongolocalinfo); // 로컬 MongoDB 연결 객체를 생성합니다.
  } else { // fromLocal 옵션이 false이거나 설정되지 않은 경우
    MONGOC = new mongo(mongoinfo); // 기본 MongoDB 연결 객체를 생성합니다.
  }

  const button = "service"; // 데이터베이스 컬렉션 이름을 "service"로 설정합니다.
  let { Service, Services, Tools } = require(`${this.aliveDir}/${button}/addOn/generator.js`); // Service, Services, Tools 객체를 가져옵니다.

  try {
    let tong, servicesArr; // 서비스 데이터 및 배열을 저장할 변수들입니다.
    let sortQuery; // 정렬 기준을 저장할 변수입니다.

    if (option.sort === undefined) { // 정렬 기준이 주어지지 않은 경우
      sortQuery = { "date": -1 }; // 기본적으로 날짜 기준 내림차순으로 정렬합니다.
    } else { // 정렬 기준이 주어진 경우
      sortQuery = option.sort; // 해당 정렬 기준을 사용합니다.
    }

    if (option.selfMongo === undefined || option.selfMongo === null) { // selfMongo가 undefined 또는 null인 경우
      await MONGOC.connect(); // MongoDB 연결을 시작합니다.
      if (option.limit !== undefined) { // limit 옵션이 설정된 경우
        tong = await MONGOC.db(`miro81`).collection(button).find(query).sort(sortQuery).limit(Number(option.limit)).toArray(); // 제한된 수의 서비스 데이터를 조회합니다.
      } else { // limit 옵션이 설정되지 않은 경우
        tong = await MONGOC.db(`miro81`).collection(button).find(query).sort(sortQuery).toArray(); // 모든 서비스 데이터를 조회합니다.
      }
      await MONGOC.close(); // MongoDB 연결을 종료합니다.
    } else { // selfMongo가 설정된 경우
      if (option.limit !== undefined) { // limit 옵션이 설정된 경우
        tong = await option.selfMongo.db(`miro81`).collection(button).find(query).sort(sortQuery).limit(Number(option.limit)).toArray(); // 제한된 수의 서비스 데이터를 조회합니다.
      } else { // limit 옵션이 설정되지 않은 경우
        tong = await option.selfMongo.db(`miro81`).collection(button).find(query).sort(sortQuery).toArray(); // 모든 서비스 데이터를 조회합니다.
      }
    }

    if (!option.withTools) { // withTools 옵션이 false인 경우
      servicesArr = new Services(); // 서비스 배열 객체를 생성합니다.
      for (let i of tong) { // 조회된 서비스 데이터를 순회합니다.
        servicesArr.push(new Service(i)); // 각 서비스를 서비스 배열에 추가합니다.
      }
    } else { // withTools 옵션이 true인 경우
      Service = Tools.withTools(Service); // Service 객체에 도구 메서드를 포함시킵니다.
      Services = Tools.withToolsArr(Services); // Services 배열 객체에 도구 메서드를 포함시킵니다.
      servicesArr = new Services(); // 서비스 배열 객체를 생성합니다.
      for (let i of tong) { // 조회된 서비스 데이터를 순회합니다.
        servicesArr.push(new Service(i)); // 각 서비스를 서비스 배열에 추가합니다.
      }
    }

    if (option.toNormal === true) { // toNormal 옵션이 true인 경우
      servicesArr = servicesArr.toNormal(); // 서비스 배열 객체를 일반 배열 객체로 변환합니다.
    }

    return servicesArr; // 최종 서비스 배열 객체를 반환합니다.
  } catch (e) {
    console.log(e); // 오류가 발생한 경우 오류를 로그에 출력합니다.
  }
}

/**
 * BackMaker 클래스의 updateService 메서드
 *
 * 이 메서드는 '홈리에종' 서비스에 대한 정보를 업데이트하는 기능을 담당합니다.
 * '홈리에종' 서비스는 홈퍼니싱, 홈스타일링, 토탈 스타일링, 엑스트라 스타일링의 네 가지로 구성되어 있으며,
 * 각각의 ID는 다음과 같습니다:
 * - 홈퍼니싱: s2011_aa01s
 * - 홈스타일링: s2011_aa02s
 * - 토탈 스타일링: s2011_aa03s
 * - 엑스트라 스타일링: s2011_aa04s
 *
 * @param {Array} queryArr - [whereQuery, updateQuery] 형식의 쿼리 배열
 * @param {Object} option - 메서드 실행 시의 옵션을 지정하는 객체
 * @param {Object|null} [option.selfMongo=null] - 자체적으로 사용할 MongoDB 연결 객체
 * @returns {string} - 성공 시 "success" 반환, 실패 시 "fail" 반환
 */
BackMaker.prototype.updateService = async function (queryArr, option = { selfMongo: null }) {
  if (queryArr.length !== 2) { // queryArr가 [whereQuery, updateQuery] 형식이 아닌 경우
    throw new Error("invaild arguments : query object must be Array: [ Object: whereQuery, Object: updateQuery ]"); // 오류를 발생시킵니다.
  }
  const instance = this; // 현재 BackMaker 인스턴스를 참조합니다.
  const { mongo, mongoinfo } = this.mother; // Mother 클래스의 mongo 및 mongoinfo 속성을 불러옵니다.
  const MONGOC = new mongo(mongoinfo); // MongoDB 연결 객체를 생성합니다.
  const button = "service"; // 데이터베이스 컬렉션 이름을 "service"로 설정합니다.

  try {
    const [ whereQuery, updateQuery ] = queryArr; // whereQuery와 updateQuery를 queryArr에서 가져옵니다.
    let latestServiceArr, latestService; // 가장 최신의 서비스 데이터를 저장할 변수들입니다.
    let newOption, newId; // 새로운 옵션 및 ID를 저장할 변수들입니다.
    let targetDummyArr, targetDummy; // 업데이트할 서비스 데이터를 저장할 변수들입니다.

    newOption = {}; // 새 옵션 객체를 생성합니다.
    if (option.selfMongo !== undefined && option.selfMongo !== null) { // selfMongo 옵션이 설정된 경우
      newOption.selfMongo = option.selfMongo; // 해당 옵션을 새 옵션에 추가합니다.
    }
    newOption.withTools = false; // 도구 메서드는 사용하지 않도록 설정합니다.
    newOption.sort = { "serid": -1 }; // serid 기준 내림차순 정렬을 설정합니다.
    newOption.limit = 1; // 가장 최근의 하나만 가져오도록 제한합니다.

    latestServiceArr = await this.getServicesByQuery({}, newOption); // 가장 최신의 서비스를 가져옵니다.
    latestService = latestServiceArr[0]; // 최신 서비스 데이터를 선택합니다.

    newId = this.idMaker(latestService.serid); // 최신 서비스의 serid를 기반으로 새로운 ID를 생성합니다.

    targetDummyArr = await this.getServicesByQuery(whereQuery, { selfMongo: option.selfMongo, sort: { date: -1 }, limit: 1 }); // 업데이트할 서비스 데이터를 가져옵니다.
    if (targetDummyArr.length > 0) { // 해당 데이터가 존재하는 경우
      [ targetDummy ] = targetDummyArr; // 해당 데이터를 선택합니다.
      targetDummy = targetDummy.toNormal(); // 서비스 데이터를 일반 객체로 변환합니다.
      targetDummy.serid = newId; // 새로 생성한 serid로 대체합니다.
      updateQuery.date = new Date(); // 업데이트 날짜를 현재 날짜로 설정합니다.

      if (option.selfMongo === undefined || option.selfMongo === null) { // selfMongo가 설정되지 않은 경우
        await MONGOC.connect(); // MongoDB 연결을 시작합니다.
        await MONGOC.db(`miro81`).collection(button).insertOne(targetDummy); // 새 서비스 데이터를 삽입합니다.
        await MONGOC.db(`miro81`).collection(button).updateOne(whereQuery, { $set: updateQuery }); // 기존 서비스 데이터를 업데이트합니다.
        await MONGOC.close(); // MongoDB 연결을 종료합니다.
      } else { // selfMongo가 설정된 경우
        await option.selfMongo.db(`miro81`).collection(button).insertOne(targetDummy); // 새 서비스 데이터를 삽입합니다.
        await option.selfMongo.db(`miro81`).collection(button).updateOne(whereQuery, { $set: updateQuery }); // 기존 서비스 데이터를 업데이트합니다.
      }
    }
    return "success"; // 성공적으로 완료되었음을 나타내는 "success"를 반환합니다.
  } catch (e) {
    console.log(e); // 오류가 발생한 경우 오류를 로그에 출력합니다.
    return "fail"; // 실패 시 "fail"을 반환합니다.
  }
}

/**
 * BackMaker 클래스의 createService 메서드
 *
 * 이 메서드는 '홈리에종' 서비스에 대한 새로운 서비스를 생성하는 기능을 담당합니다.
 * '홈리에종' 서비스는 홈퍼니싱, 홈스타일링, 토탈 스타일링, 엑스트라 스타일링의 네 가지로 구성되어 있으며,
 * 각각의 ID는 다음과 같습니다:
 * - 홈퍼니싱: s2011_aa01s
 * - 홈스타일링: s2011_aa02s
 * - 토탈 스타일링: s2011_aa03s
 * - 엑스트라 스타일링: s2011_aa04s
 *
 * @param {Object} updateQuery - 새로 생성할 서비스의 속성을 담은 객체
 * @param {Object} option - 메서드 실행 시의 옵션을 지정하는 객체
 * @param {Object|null} [option.selfMongo=null] - 자체적으로 사용할 MongoDB 연결 객체
 * @returns {string} - 새로 생성된 서비스의 serid 반환
 */
BackMaker.prototype.createService = async function (updateQuery, option = { selfMongo: null }) {
  const instance = this; // 현재 BackMaker 인스턴스를 참조합니다.
  const { mongo, mongoinfo } = this.mother; // Mother 클래스의 mongo 및 mongoinfo 속성을 불러옵니다.
  const MONGOC = new mongo(mongoinfo); // MongoDB 연결 객체를 생성합니다.
  const button = "service"; // 데이터베이스 컬렉션 이름을 "service"로 설정합니다.
  const map = require(`${this.mapDir}/service/addOn/generator.js`).ServiceMap // 서비스 맵을 가져옵니다.

  try {
    let dummy, dummySetting, latestService, latestServiceArr; // 서비스 생성에 필요한 변수들입니다.
    let newOption = {}; // 새로운 옵션 객체를 생성합니다.
    let tempArr; // 임시 배열을 저장할 변수입니다.
    let target; // 업데이트할 대상 객체를 저장할 변수입니다.

    if (typeof updateQuery.kind !== "string") { // 서비스 종류가 문자열이 아닌 경우
      throw new Error("must be kind"); // 오류를 발생시킵니다.
    }

    if (option.selfMongo !== undefined && option.selfMongo !== null) { // selfMongo 옵션이 설정된 경우
      newOption.selfMongo = option.selfMongo; // 해당 옵션을 새 옵션에 추가합니다.
    }
    newOption.withTools = false; // 도구 메서드는 사용하지 않도록 설정합니다.
    newOption.sort = { "serid": -1 }; // serid 기준 내림차순 정렬을 설정합니다.
    newOption.limit = 1; // 가장 최근의 하나만 가져오도록 제한합니다.

    latestServiceArr = await this.getServicesByQuery({}, newOption); // 가장 최신의 서비스를 가져옵니다.
    latestService = latestServiceArr[0]; // 최신 서비스 데이터를 선택합니다.

    dummy = map.main(updateQuery.kind); // 새 서비스의 기본 구조를 생성합니다.
    dummy.structure.serid = this.idMaker(latestService.serid); // 최신 서비스의 serid를 기반으로 새로운 ID를 생성합니다.

    for (let i in updateQuery) { // updateQuery의 각 속성을 순회합니다.
      if (i !== "serid") { // serid는 제외합니다.
        tempArr = i.split('.'); // 속성명을 '.'을 기준으로 분리합니다.
        target = dummy.structure; // 업데이트할 대상 객체를 초기화합니다.
        for (let j = 0; j < tempArr.length - 1; j++) { // 속성명을 기반으로 대상 객체를 탐색합니다.
          target = target[tempArr[j]];
        }
        target[tempArr[tempArr.length - 1]] = updateQuery[i]; // 해당 속성에 값을 할당합니다.
      }
    }

    if (option.selfMongo === undefined || option.selfMongo === null) { // selfMongo가 설정되지 않은 경우
      await MONGOC.connect(); // MongoDB 연결을 시작합니다.
      await MONGOC.db(`miro81`).collection(button).insertOne(dummy.structure); // 새 서비스 데이터를 삽입합니다.
      await MONGOC.close(); // MongoDB 연결을 종료합니다.
    } else { // selfMongo가 설정된 경우
      await option.selfMongo.db(`miro81`).collection(button).insertOne(dummy.structure); // 새 서비스 데이터를 삽입합니다.
    }

    return dummy.structure.serid; // 새로 생성된 서비스의 serid를 반환합니다.
  } catch (e) {
    console.log(e); // 오류가 발생한 경우 오류를 로그에 출력합니다.
  }
}

/**
 * BackMaker 클래스의 deleteService 메서드
 *
 * 이 메서드는 '홈리에종' 서비스 중 특정 서비스를 삭제하는 기능을 담당합니다.
 * '홈리에종' 서비스는 홈퍼니싱, 홈스타일링, 토탈 스타일링, 엑스트라 스타일링의 네 가지로 구성되어 있으며,
 * 각각의 ID는 다음과 같습니다:
 * - 홈퍼니싱: s2011_aa01s
 * - 홈스타일링: s2011_aa02s
 * - 토탈 스타일링: s2011_aa03s
 * - 엑스트라 스타일링: s2011_aa04s
 *
 * @param {string} serid - 삭제할 서비스의 serid
 * @param {Object} option - 메서드 실행 시의 옵션을 지정하는 객체
 * @param {Object|null} [option.selfMongo=null] - 자체적으로 사용할 MongoDB 연결 객체
 * @returns {string} - 삭제 성공 시 "success" 반환
 */
BackMaker.prototype.deleteService = async function (serid, option = { selfMongo: null }) {
  const instance = this; // 현재 BackMaker 인스턴스를 참조합니다.
  const { mongo, mongoinfo } = this.mother; // Mother 클래스의 mongo 및 mongoinfo 속성을 불러옵니다.
  const MONGOC = new mongo(mongoinfo); // MongoDB 연결 객체를 생성합니다.
  const button = "service"; // 데이터베이스 컬렉션 이름을 "service"로 설정합니다.

  try {
    // selfMongo 옵션이 설정되지 않은 경우 기본 MongoDB 연결을 사용하여 데이터베이스 연결을 설정합니다.
    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect(); // MongoDB 연결을 시작합니다.
      await MONGOC.db(`miro81`).collection(button).deleteOne({ serid }); // 지정된 serid의 서비스를 삭제합니다.
      await MONGOC.close(); // MongoDB 연결을 종료합니다.
    } else { 
      // selfMongo 옵션이 설정된 경우 해당 MongoDB 연결 객체를 사용하여 서비스 삭제를 수행합니다.
      await option.selfMongo.db(`miro81`).collection(button).deleteOne({ serid }); // 지정된 serid의 서비스를 삭제합니다.
    }
    return "success"; // 삭제가 성공적으로 완료되면 "success"를 반환합니다.
  } catch (e) {
    console.log(e); // 오류가 발생한 경우 오류를 로그에 출력합니다.
  }
}

// GET Designer --------------------------------------------------------------------------------

/**
 * BackMaker 클래스의 getDesignerById 메서드
 *
 * 이 메서드는 '홈리에종'과 협약한 인테리어 디자이너의 정보를 가져오는 기능을 담당합니다.
 * 디자이너의 고유 ID (desid)를 이용하여 데이터베이스에서 디자이너 정보를 조회합니다.
 *
 * @param {string} desid - 조회할 디자이너의 고유 ID
 * @param {Object} option - 메서드 실행 시의 옵션을 지정하는 객체
 * @param {boolean} [option.withTools=false] - 도구를 사용할지 여부를 지정
 * @param {Object|null} [option.selfMongo=null] - 자체적으로 사용할 MongoDB 연결 객체
 * @param {boolean} [option.toNormal=false] - 결과를 일반 객체로 변환할지 여부를 지정
 * @returns {Object|null} - 조회된 디자이너 객체 또는 null
 */
BackMaker.prototype.getDesignerById = async function (desid, option = { withTools: false, selfMongo: null, toNormal: false }) {
  const instance = this; // 현재 BackMaker 인스턴스를 참조합니다.
  const { mongo, mongoinfo } = this.mother; // Mother 클래스의 mongo 및 mongoinfo 속성을 불러옵니다.
  const MONGOC = new mongo(mongoinfo); // MongoDB 연결 객체를 생성합니다.
  const button = "designer"; // 데이터베이스 컬렉션 이름을 "designer"로 설정합니다.
  let { Designer, Designers, Tools } = require(`${this.aliveDir}/${button}/addOn/generator.js`); // 디자이너 관련 객체 및 도구를 불러옵니다.

  try {
    let arr, target; // 조회된 결과를 저장할 변수들을 선언합니다.

    // selfMongo 옵션이 설정되지 않은 경우 기본 MongoDB 연결을 사용하여 데이터베이스 연결을 설정합니다.
    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect(); // MongoDB 연결을 시작합니다.
      arr = await MONGOC.db(`miro81`).collection(button).find({ desid }).toArray(); // 지정된 desid로 디자이너 정보를 조회합니다.
      await MONGOC.close(); // MongoDB 연결을 종료합니다.
    } else {
      // selfMongo 옵션이 설정된 경우 해당 MongoDB 연결 객체를 사용하여 디자이너 정보를 조회합니다.
      arr = await option.selfMongo.db(`miro81`).collection(button).find({ desid }).toArray();
    }

    // withTools 옵션이 true인 경우 디자이너 객체에 도구를 추가합니다.
    if (option.withTools) {
      Designer = Tools.withTools(Designer);
    }

    // 조회된 결과가 있는 경우, 새로운 디자이너 객체를 생성합니다.
    if (arr.length > 0) {
      target = new Designer(arr[0]);
      // toNormal 옵션이 true인 경우 디자이너 객체를 일반 객체로 변환합니다.
      if (option.toNormal === true) {
        target = target.toNormal();
      }
    } else {
      // 조회된 결과가 없는 경우 null을 반환합니다.
      target = null;
    }

    return target; // 조회된 디자이너 객체 또는 null을 반환합니다.
  } catch (e) {
    console.log(e); // 오류가 발생한 경우 오류를 로그에 출력합니다.
  }
}

/**
 * BackMaker 클래스의 getDesignersByQuery 메서드
 *
 * 이 메서드는 '홈리에종'과 협약한 인테리어 디자이너의 정보를 쿼리(query) 조건에 따라 조회하는 기능을 담당합니다.
 * 주어진 쿼리를 이용하여 데이터베이스에서 디자이너 목록을 조회하고, 옵션에 따라 추가적인 처리도 수행합니다.
 *
 * @param {Object} query - MongoDB에서 사용할 조회 쿼리
 * @param {Object} option - 메서드 실행 시의 옵션을 지정하는 객체
 * @param {boolean} [option.withTools=false] - 도구를 사용할지 여부를 지정
 * @param {Object|null} [option.selfMongo=null] - 자체적으로 사용할 MongoDB 연결 객체
 * @param {boolean} [option.fromLocal=false] - 로컬 MongoDB 정보를 사용할지 여부를 지정
 * @param {boolean} [option.toNormal=false] - 결과를 일반 객체로 변환할지 여부를 지정
 * @param {Object} [option.sort={"information.contract.date": -1}] - 정렬 조건을 지정
 * @param {number} [option.limit] - 조회할 데이터의 최대 개수를 지정
 * @returns {Array|Object} - 조회된 디자이너 객체 배열 또는 변환된 객체 배열
 */
BackMaker.prototype.getDesignersByQuery = async function (query, option = { withTools: false, selfMongo: null, fromLocal: null, toNormal: false }) {
  const instance = this; // 현재 BackMaker 인스턴스를 참조합니다.
  const { mongo, mongoinfo, mongolocalinfo } = this.mother; // Mother 클래스의 mongo, mongoinfo, mongolocalinfo 속성을 불러옵니다.
  let MONGOC; // 사용할 MongoDB 연결 객체를 선언합니다.

  // fromLocal 옵션에 따라 사용할 MongoDB 연결 객체를 설정합니다.
  if (option.fromLocal === true) {
    MONGOC = new mongo(mongolocalinfo); // 로컬 MongoDB를 사용하는 경우
  } else {
    MONGOC = new mongo(mongoinfo); // 기본 MongoDB를 사용하는 경우
  }

  const button = "designer"; // 데이터베이스 컬렉션 이름을 "designer"로 설정합니다.
  let { Designer, Designers, Tools } = require(`${this.aliveDir}/${button}/addOn/generator.js`); // 디자이너 관련 객체 및 도구를 불러옵니다.

  try {
    let tong, designersArr; // 조회된 결과를 저장할 변수들을 선언합니다.
    let sortQuery; // 정렬 조건을 저장할 변수를 선언합니다.

    // 정렬 조건이 지정되지 않은 경우, 기본값을 사용합니다.
    if (option.sort === undefined) {
      sortQuery = { "information.contract.date": -1 }; // 계약 날짜를 기준으로 내림차순 정렬
    } else {
      sortQuery = option.sort; // 지정된 정렬 조건을 사용합니다.
    }

    // selfMongo 옵션이 설정되지 않은 경우 기본 MongoDB 연결을 사용하여 데이터베이스 연결을 설정합니다.
    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect(); // MongoDB 연결을 시작합니다.
      // 데이터 조회 시 limit 옵션이 지정된 경우, 해당 개수만큼만 조회합니다.
      if (option.limit !== undefined) {
        tong = await MONGOC.db(`miro81`).collection(button).find(query).sort(sortQuery).limit(Number(option.limit)).toArray();
      } else {
        tong = await MONGOC.db(`miro81`).collection(button).find(query).sort(sortQuery).toArray(); // 지정된 쿼리와 정렬 조건으로 디자이너 정보를 조회합니다.
      }
      await MONGOC.close(); // MongoDB 연결을 종료합니다.
    } else {
      // selfMongo 옵션이 설정된 경우 해당 MongoDB 연결 객체를 사용하여 디자이너 정보를 조회합니다.
      if (option.limit !== undefined) {
        tong = await option.selfMongo.db(`miro81`).collection(button).find(query).sort(sortQuery).limit(Number(option.limit)).toArray();
      } else {
        tong = await option.selfMongo.db(`miro81`).collection(button).find(query).sort(sortQuery).toArray();
      }
    }

    // withTools 옵션이 false인 경우 디자이너 객체 배열을 생성합니다.
    if (!option.withTools) {
      designersArr = new Designers(); // Designers 배열 객체를 생성합니다.
      for (let i of tong) {
        designersArr.push(new Designer(i)); // 조회된 각 디자이너 정보를 Designer 객체로 변환하여 배열에 추가합니다.
      }
    } else {
      // withTools 옵션이 true인 경우 도구를 추가한 Designer 객체 배열을 생성합니다.
      Designer = Tools.withTools(Designer); // Designer 객체에 도구를 추가합니다.
      Designers = Tools.withToolsArr(Designers); // Designers 배열 객체에도 도구를 추가합니다.
      designersArr = new Designers();
      for (let i of tong) {
        designersArr.push(new Designer(i)); // 조회된 각 디자이너 정보를 도구가 추가된 Designer 객체로 변환하여 배열에 추가합니다.
      }
    }

    // toNormal 옵션이 true인 경우, 디자이너 객체 배열을 일반 객체 배열로 변환합니다.
    if (option.toNormal === true) {
      designersArr = designersArr.toNormal(); // Designers 배열을 일반 객체 배열로 변환합니다.
    }

    return designersArr; // 조회된 디자이너 객체 배열 또는 변환된 객체 배열을 반환합니다.
  } catch (e) {
    console.log(e); // 오류가 발생한 경우 오류를 로그에 출력합니다.
  }
}

/**
 * BackMaker 클래스의 getDesignersAll 메서드
 *
 * 이 메서드는 '홈리에종'과 협약한 모든 인테리어 디자이너의 정보를 조회하는 기능을 담당합니다.
 * 옵션에 따라 데이터베이스에서 디자이너 목록을 조회하고, 도구를 사용하거나 일반 객체로 변환하는 등의 추가적인 처리를 수행합니다.
 *
 * @param {Object} option - 메서드 실행 시의 옵션을 지정하는 객체
 * @param {boolean} [option.withTools=false] - 도구를 사용할지 여부를 지정
 * @param {Object|null} [option.selfMongo=null] - 자체적으로 사용할 MongoDB 연결 객체
 * @param {boolean} [option.toNormal=false] - 결과를 일반 객체로 변환할지 여부를 지정
 * @returns {Array|Object} - 조회된 디자이너 객체 배열 또는 변환된 객체 배열
 */
BackMaker.prototype.getDesignersAll = async function (option = { withTools: false, selfMongo: null, toNormal: false }) {
  const instance = this; // 현재 BackMaker 인스턴스를 참조합니다.
  const { mongo, mongoinfo } = this.mother; // Mother 클래스의 mongo, mongoinfo 속성을 불러옵니다.
  const MONGOC = new mongo(mongoinfo); // MongoDB 연결 객체를 생성합니다.
  const button = "designer"; // 데이터베이스 컬렉션 이름을 "designer"로 설정합니다.
  let { Designer, Designers, Tools } = require(`${this.aliveDir}/${button}/addOn/generator.js`); // 디자이너 관련 객체 및 도구를 불러옵니다.

  try {
    let tong, designersArr; // 조회된 결과를 저장할 변수들을 선언합니다.

    // selfMongo 옵션이 설정되지 않은 경우 기본 MongoDB 연결을 사용하여 데이터베이스 연결을 설정합니다.
    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect(); // MongoDB 연결을 시작합니다.
      tong = await MONGOC.db(`miro81`).collection(button).find({}).toArray(); // 모든 디자이너 정보를 조회합니다.
      await MONGOC.close(); // MongoDB 연결을 종료합니다.
    } else {
      // selfMongo 옵션이 설정된 경우 해당 MongoDB 연결 객체를 사용하여 디자이너 정보를 조회합니다.
      tong = await option.selfMongo.db(`miro81`).collection(button).find({}).toArray();
    }

    // withTools 옵션이 false인 경우 디자이너 객체 배열을 생성합니다.
    if (!option.withTools) {
      designersArr = new Designers(); // Designers 배열 객체를 생성합니다.
      for (let i of tong) {
        designersArr.push(new Designer(i)); // 조회된 각 디자이너 정보를 Designer 객체로 변환하여 배열에 추가합니다.
      }
    } else {
      // withTools 옵션이 true인 경우 도구를 추가한 Designer 객체 배열을 생성합니다.
      Designer = Tools.withTools(Designer); // Designer 객체에 도구를 추가합니다.
      Designers = Tools.withToolsArr(Designers); // Designers 배열 객체에도 도구를 추가합니다.
      designersArr = new Designers();
      for (let i of tong) {
        designersArr.push(new Designer(i)); // 조회된 각 디자이너 정보를 도구가 추가된 Designer 객체로 변환하여 배열에 추가합니다.
      }
    }

    // toNormal 옵션이 true인 경우, 디자이너 객체 배열을 일반 객체 배열로 변환합니다.
    if (option.toNormal === true) {
      designersArr = designersArr.toNormal(); // Designers 배열을 일반 객체 배열로 변환합니다.
    }

    return designersArr; // 조회된 디자이너 객체 배열 또는 변환된 객체 배열을 반환합니다.
  } catch (e) {
    console.log(e); // 오류가 발생한 경우 오류를 로그에 출력합니다.
  }
}

/**
 * BackMaker 클래스의 updateDesigner 메서드
 *
 * 이 메서드는 '홈리에종'과 협약한 인테리어 디자이너의 정보를 업데이트하는 기능을 담당합니다.
 * 쿼리 배열을 받아서 해당 조건에 맞는 디자이너 정보를 업데이트합니다.
 *
 * @param {Array} queryArr - 업데이트할 조건과 내용을 포함하는 배열 [whereQuery, updateQuery]
 * @param {Object} option - 메서드 실행 시의 옵션을 지정하는 객체
 * @param {Object|null} [option.selfMongo=null] - 자체적으로 사용할 MongoDB 연결 객체
 * @returns {string} - 업데이트 결과를 나타내는 문자열 ("success" 또는 "fail")
 * @throws {Error} - 잘못된 쿼리 배열이 전달된 경우 오류를 발생시킴
 */
BackMaker.prototype.updateDesigner = async function (queryArr, option = { selfMongo: null }) {
  // 쿼리 배열의 길이가 2가 아닌 경우 오류를 발생시킵니다.
  if (queryArr.length !== 2) {
    throw new Error("invaild arguments : query object must be Array: [ Object: whereQuery, Object: updateQuery ]");
  }

  const instance = this; // 현재 BackMaker 인스턴스를 참조합니다.
  const { mongo, mongoinfo } = this.mother; // Mother 클래스의 mongo, mongoinfo 속성을 불러옵니다.
  const MONGOC = new mongo(mongoinfo); // MongoDB 연결 객체를 생성합니다.
  const button = "designer"; // 데이터베이스 컬렉션 이름을 "designer"로 설정합니다.

  try {
    const [ whereQuery, updateQuery ] = queryArr; // 쿼리 배열에서 whereQuery와 updateQuery를 분해합니다.

    // updateQuery가 객체가 아니거나 null인 경우 오류를 발생시킵니다.
    if (typeof updateQuery !== "object" || updateQuery === null) {
      throw new Error("invalid updateQuery");
    }

    // updateQuery에 "null" 속성이 있는 경우 이를 제거합니다.
    if (updateQuery["null"] !== undefined) {
      delete updateQuery["null"];
    }

    // selfMongo 옵션이 설정되지 않은 경우 기본 MongoDB 연결을 사용하여 업데이트를 수행합니다.
    if (option.selfMongo === undefined || option.selfMongo === null) {
      await MONGOC.connect(); // MongoDB 연결을 시작합니다.
      await MONGOC.db(`miro81`).collection(button).updateOne(whereQuery, { $set: updateQuery }); // 해당 조건의 디자이너 정보를 업데이트합니다.
      await MONGOC.close(); // MongoDB 연결을 종료합니다.
    } else {
      // selfMongo 옵션이 설정된 경우 해당 MongoDB 연결 객체를 사용하여 업데이트를 수행합니다.
      await option.selfMongo.db(`miro81`).collection(button).updateOne(whereQuery, { $set: updateQuery });
    }

    return "success"; // 업데이트가 성공적으로 완료된 경우 "success"를 반환합니다.
  } catch (e) {
    console.log(e); // 오류가 발생한 경우 오류를 로그에 출력합니다.
    return "fail"; // 실패한 경우 "fail"을 반환합니다.
  }
}

/**
 * @method deleteDesigner
 * @description '홈리에종'과 협약한 인테리어 디자이너의 정보를 삭제하는 메서드입니다. 주어진 디자이너 ID를 사용하여 MongoDB에서 디자이너 데이터를 삭제합니다.
 * @param {string} desid - 삭제할 디자이너의 고유 ID.
 * @param {Object} option - 설정 옵션 객체입니다.
 * @param {Object} [option.selfMongo=null] - 사용할 MongoDB 인스턴스입니다. 설정되지 않으면 기본 MongoDB 인스턴스를 사용합니다.
 * @returns {Promise<string>} 삭제가 성공하면 "success"를 반환합니다.
 */
BackMaker.prototype.deleteDesigner = async function (desid, option = { selfMongo: null }) {
  // BackMaker 인스턴스를 instance 변수에 할당합니다. 
  // instance 변수를 사용하여 클래스의 다른 메서드나 속성에 접근할 수 있습니다.
  const instance = this;
  
  // Mother 클래스에서 필요한 mongo와 mongoinfo 객체를 가져옵니다.
  // mongo는 MongoDB 클라이언트이고, mongoinfo는 데이터베이스 연결 정보입니다.
  const { mongo, mongoinfo } = this.mother;
  
  // MongoDB 연결을 위한 클라이언트를 생성합니다.
  // MONGOC 변수에 mongo 클라이언트를 초기화합니다. 이 클라이언트를 사용하여 MongoDB와 상호작용합니다.
  const MONGOC = new mongo(mongoinfo);
  
  // 'designer' 컬렉션의 이름을 button 변수에 저장합니다. 이 컬렉션은 홈리에종과 협약한 인테리어 디자이너의 정보를 담고 있습니다.
  const button = "designer";
  
  try {
    // 옵션으로 전달된 selfMongo가 undefined이거나 null인지 확인합니다.
    // selfMongo가 설정되지 않은 경우, 기본 MongoDB 클라이언트를 사용하여 데이터베이스와 연결합니다.
    if (option.selfMongo === undefined || option.selfMongo === null) {
      
      // MongoDB에 연결합니다. MONGOC.connect()는 MongoDB 서버와의 연결을 설정하는 비동기 메서드입니다.
      await MONGOC.connect();
      
      // MongoDB의 'designer' 컬렉션에서 desid와 일치하는 문서를 삭제합니다.
      // deleteOne 메서드는 주어진 조건에 맞는 첫 번째 문서를 삭제합니다.
      await MONGOC.db(`miro81`).collection(button).deleteOne({ desid });
      
      // MongoDB 연결을 종료합니다. MONGOC.close()는 연결을 해제하는 비동기 메서드입니다.
      await MONGOC.close();
    } else {
      // 옵션으로 selfMongo가 설정된 경우, 그 인스턴스를 사용하여 MongoDB와 상호작용합니다.
      // MongoDB의 'designer' 컬렉션에서 desid와 일치하는 문서를 삭제합니다.
      await option.selfMongo.db(`miro81`).collection(button).deleteOne({ desid });
    }
    
    // 삭제 작업이 성공적으로 완료되었음을 나타내는 "success" 문자열을 반환합니다.
    return "success";
  } catch (e) {
    // 오류가 발생하면 오류 메시지를 콘솔에 출력합니다.
    console.log(e);
  }
}

/**
 * @method createDesigner
 * @description '홈리에종'과 협약한 인테리어 디자이너의 정보를 생성하는 메서드입니다. 새로 생성된 디자이너의 정보를 MongoDB에 저장합니다.
 * @param {Object} updateQuery - 새로 생성된 디자이너 정보를 업데이트하기 위한 쿼리입니다.
 * @param {Object} option - 설정 옵션 객체입니다.
 * @param {Object} [option.selfMongo=null] - 사용할 MongoDB 인스턴스입니다. 설정되지 않으면 기본 MongoDB 인스턴스를 사용합니다.
 * @returns {Promise<string>} 생성된 디자이너의 고유 ID(desid)를 반환합니다.
 */
BackMaker.prototype.createDesigner = async function (updateQuery, option = { selfMongo: null }) {
  // BackMaker 인스턴스를 instance 변수에 할당합니다.
  // instance 변수를 사용하여 클래스의 다른 메서드나 속성에 접근할 수 있습니다.
  const instance = this;

  // Mother 클래스에서 mongo와 mongoinfo 객체를 가져옵니다.
  // mongo는 MongoDB 클라이언트 객체이고, mongoinfo는 데이터베이스 연결 정보를 담고 있습니다.
  const { mongo, mongoinfo } = this.mother;

  // MongoDB 클라이언트를 초기화하여 MONGOC 변수에 할당합니다.
  // MONGOC를 통해 MongoDB와 상호작용할 수 있습니다.
  const MONGOC = new mongo(mongoinfo);

  // 'designer' 컬렉션의 이름을 button 변수에 할당합니다.
  // 이 컬렉션은 '홈리에종'과 협약한 인테리어 디자이너들의 정보를 저장합니다.
  const button = "designer";

  // 디자이너 데이터 맵핑을 위한 designer.js 파일을 가져옵니다.
  // map 객체를 통해 기본 데이터 구조 및 설정을 불러옵니다.
  const map = require(`${this.mapDir}/designer/addOn/generator.js`).DesignerMap;

  try {
    // 변수들을 선언합니다.
    // dummy: 새로 생성할 디자이너의 기본 데이터 구조를 저장할 변수입니다.
    // dummySetting: 설정 값을 초기화하는 함수입니다.
    // latestDesigner: 가장 최근에 생성된 디자이너의 정보를 저장할 변수입니다.
    // latestDesignerArr: 최신 디자이너 정보를 배열 형태로 저장할 변수입니다.
    let dummy, dummySetting, latestDesigner, latestDesignerArr;

    // 새로운 옵션 객체를 선언합니다.
    let newOption = {};

    // 임시 변수를 선언합니다.
    let temp0, temp1;

    // 프로젝트 매트릭스 표준을 저장할 변수들을 선언합니다.
    let matrixStandard0, matrixStandard1, matrixStandard2;

    // 옵션으로 selfMongo가 설정되어 있으면, 이를 새로운 옵션 객체에 할당합니다.
    if (option.selfMongo !== undefined && option.selfMongo !== null) {
      newOption.selfMongo = option.selfMongo;
    }

    // 도구를 포함하지 않는 설정으로 옵션을 구성합니다.
    newOption.withTools = false;

    // desid를 기준으로 내림차순으로 정렬하여 최신 디자이너를 찾기 위한 설정을 추가합니다.
    newOption.sort = { "desid": -1 };

    // 최대 1개의 문서만 반환하도록 제한을 설정합니다.
    newOption.limit = 1;

    // 최신 디자이너 데이터를 가져옵니다.
    // getDesignersByQuery 메서드를 사용하여 쿼리 조건에 맞는 디자이너 데이터를 가져옵니다.
    latestDesignerArr = await this.getDesignersByQuery({}, newOption);

    // 배열에서 최신 디자이너 데이터를 추출합니다.
    latestDesigner = latestDesignerArr[0];

    // 디자이너 데이터의 기본 구조를 가져옵니다.
    // map.main() 메서드를 사용하여 디자이너의 기본 구조를 가져옵니다.
    dummy = map.main();

    // dummySetting 함수는 기본 설정 값을 초기화하고 생성합니다.
    // num 값을 받아 설정 객체를 초기화하고 기본 세팅을 생성합니다.
    dummySetting = function (num) {
      let settingObj;

      // 설정 값을 맵핑하여 가져옵니다.
      // map.sub() 메서드를 사용하여 'setting.proposal' 경로의 데이터를 가져옵니다.
      settingObj = map.sub("setting.proposal");

      // 세팅 이름을 "기본 세팅"과 숫자를 조합하여 설정합니다.
      settingObj.name = "기본 세팅 " + String(num);

      // 객체를 JSON 형식으로 변환하고 다시 파싱하여 깊은 복사를 수행합니다.
      return JSON.parse(JSON.stringify(settingObj));
    };

    // 새로운 디자이너 ID를 생성하여 dummy 구조의 desid 속성에 할당합니다.
    // idMaker 메서드를 사용하여 고유 ID를 생성합니다.
    dummy.structure.desid = this.idMaker(latestDesigner.desid);

    // 새로운 디자이너의 DID를 생성하여 dummy 구조의 정보에 할당합니다.
    // DID는 기존 DID에서 숫자만 추출하고 1을 더한 후 다시 문자열로 변환하여 생성됩니다.
    dummy.structure.information.did = 'd' + String(Number(latestDesigner.information.did.replace(/[^0-9]/gi, '')) + 1);

    // 5개의 기본 세팅을 생성하여 dummy 구조의 설정 속성에 추가합니다.
    // for 루프를 사용하여 5개의 기본 세팅을 생성하고 설정 값에 추가합니다.
    for (let i = 0; i < 5; i++) {
      dummy.structure.setting.proposal.push(dummySetting(i));
    }

    // 프로젝트 매트릭스 표준을 설정합니다.
    // matrixStandard0과 matrixStandard1에 각각 표준 값을 할당합니다.
    matrixStandard0 = ['F', 'S', 'T', 'XT'];
    matrixStandard1 = ['mini', 'normal', 'premium'];

    // 프로젝트 매트릭스 표준에 따라 기본 값을 0으로 초기화합니다.
    // matrixStandard0과 matrixStandard1을 사용하여 2차원 배열을 초기화합니다.
    for (let i = 0; i < matrixStandard0.length; i++) {
      temp0 = [];
      for (let j = 0; j < matrixStandard1.length; j++) {
        temp0.push(0);
      }
      // 초기화된 배열을 dummy 구조의 분석 속성에 추가합니다.
      dummy.structure.analytics.project.matrix.push(temp0);
    }

    // 옵션에 따라 MongoDB에 연결하고 새로운 디자이너 데이터를 삽입합니다.
    if (option.selfMongo === undefined || option.selfMongo === null) {
      // selfMongo 옵션이 설정되지 않은 경우 기본 MongoDB 인스턴스를 사용합니다.
      await MONGOC.connect();

      // 'designer' 컬렉션에 새로운 디자이너 데이터를 삽입합니다.
      await MONGOC.db(`miro81`).collection(button).insertOne(dummy.structure);

      // MongoDB 연결을 종료합니다.
      await MONGOC.close();
    } else {
      // selfMongo 옵션이 설정된 경우 해당 MongoDB 인스턴스를 사용하여 데이터를 삽입합니다.
      await option.selfMongo.db(`miro81`).collection(button).insertOne(dummy.structure);
    }

    // 생성된 디자이너 정보를 업데이트합니다.
    // updateDesigner 메서드를 사용하여 생성된 디자이너 정보를 업데이트합니다.
    await this.updateDesigner([{ desid: dummy.structure.desid }, updateQuery], option);

    // 생성된 디자이너의 고유 ID를 반환합니다.
    return dummy.structure.desid;
  } catch (e) {
    // 오류가 발생하면 콘솔에 오류 메시지를 출력합니다.
    console.log(e);
  }
};

// GET Project --------------------------------------------------------------------------------

/**
 * @method getProjectById
 * @description '홈리에종'이 진행한 인테리어 디자인 프로젝트 정보를 프로젝트 ID로 검색하여 반환하는 메서드입니다.
 * @param {string} proid - 검색할 프로젝트의 고유 ID입니다.
 * @param {Object} option - 설정 옵션 객체입니다.
 * @param {boolean} [option.withTools=false] - 프로젝트 객체에 도구를 포함할지 여부를 설정합니다.
 * @param {Object} [option.selfMongo=null] - 사용할 MongoDB 인스턴스입니다. 설정되지 않으면 기본 MongoDB 인스턴스를 사용합니다.
 * @param {boolean} [option.toNormal=false] - 반환할 프로젝트 객체를 일반 객체로 변환할지 여부를 설정합니다.
 * @returns {Promise<Object|null>} 검색된 프로젝트 객체를 반환하며, 검색 결과가 없으면 null을 반환합니다.
 */
BackMaker.prototype.getProjectById = async function (proid, option = { withTools: false, selfMongo: null, toNormal: false }) {
  // BackMaker 인스턴스를 instance 변수에 할당합니다.
  // instance 변수를 통해 클래스의 다른 메서드나 속성에 접근할 수 있습니다.
  const instance = this;

  // Mother 클래스에서 mongo와 mongoinfo 객체를 가져옵니다.
  // mongo는 MongoDB 클라이언트 객체이며, mongoinfo는 데이터베이스 연결 정보를 담고 있습니다.
  const { mongo, mongoinfo } = this.mother;

  // MongoDB 클라이언트를 초기화하여 MONGOC 변수에 할당합니다.
  // MONGOC를 통해 MongoDB와 상호작용할 수 있습니다.
  const MONGOC = new mongo(mongoinfo);

  // 'project' 컬렉션의 이름을 button 변수에 할당합니다.
  // 이 컬렉션은 '홈리에종'이 진행한 인테리어 프로젝트들의 정보를 저장합니다.
  const button = "project";

  // 프로젝트와 관련된 클래스 및 도구들을 불러옵니다.
  // generator.js 파일에서 Project, Projects, Tools 객체를 가져옵니다.
  let { Project, Projects, Tools } = require(`${this.aliveDir}/${button}/addOn/generator.js`);

  try {
    // 배열 변수(arr)와 대상 변수(target)를 선언합니다.
    let arr, target;

    // selfMongo 옵션이 설정되지 않은 경우, 기본 MongoDB 인스턴스를 사용하여 연결을 설정합니다.
    if (option.selfMongo === undefined || option.selfMongo === null) {
      // MongoDB에 연결합니다.
      await MONGOC.connect();

      // 'project' 컬렉션에서 주어진 프로젝트 ID(proid)를 기준으로 문서를 찾고 배열로 반환합니다.
      arr = await MONGOC.db(`miro81`).collection(button).find({ proid }).toArray();

      // MongoDB 연결을 종료합니다.
      await MONGOC.close();
    } else {
      // selfMongo 옵션이 설정된 경우, 해당 MongoDB 인스턴스를 사용하여 데이터를 가져옵니다.
      arr = await option.selfMongo.db(`miro81`).collection(button).find({ proid }).toArray();
    }

    // withTools 옵션이 true인 경우, Project 객체에 도구를 포함시킵니다.
    if (option.withTools) {
      // Tools.withTools 메서드를 사용하여 도구를 포함한 Project 객체를 생성합니다.
      Project = Tools.withTools(Project);
    }

    // 검색된 프로젝트가 있는지 확인합니다.
    if (arr.length > 0) {
      // 검색된 첫 번째 프로젝트 데이터를 사용하여 Project 객체를 생성합니다.
      target = new Project(arr[0]);

      // toNormal 옵션이 true인 경우, 프로젝트 객체를 일반 객체로 변환합니다.
      if (option.toNormal === true) {
        target = target.toNormal();
      }
    } else {
      // 검색 결과가 없는 경우, target 변수에 null을 할당합니다.
      target = null;
    }

    // 최종적으로 target 변수를 반환합니다. 이 변수는 프로젝트 객체이거나 null입니다.
    return target;
  } catch (e) {
    // 오류가 발생한 경우, 콘솔에 오류 메시지를 출력합니다.
    console.log(e);
  }
};

/**
 * @method getProjectsByQuery
 * @description '홈리에종'이 진행한 인테리어 디자인 프로젝트들을 특정 쿼리로 검색하여 반환하는 메서드입니다.
 * @param {Object} query - MongoDB 쿼리 객체로, 검색 조건을 정의합니다.
 * @param {Object} option - 설정 옵션 객체입니다.
 * @param {boolean} [option.withTools=false] - 프로젝트 객체에 도구를 포함할지 여부를 설정합니다.
 * @param {Object} [option.selfMongo=null] - 사용할 MongoDB 인스턴스입니다. 설정되지 않으면 기본 MongoDB 인스턴스를 사용합니다.
 * @param {boolean} [option.fromLocal=null] - 로컬 MongoDB에서 데이터를 가져올지 여부를 설정합니다.
 * @param {boolean} [option.toNormal=false] - 반환할 프로젝트 객체를 일반 객체로 변환할지 여부를 설정합니다.
 * @param {Object} [option.sort] - 정렬 기준을 정의하는 객체입니다.
 * @param {number} [option.limit] - 검색 결과의 최대 개수를 설정합니다.
 * @returns {Promise<Object[]|null>} 검색된 프로젝트 객체 배열을 반환하며, 오류가 발생하면 null을 반환합니다.
 */
BackMaker.prototype.getProjectsByQuery = async function (query, option = { withTools: false, selfMongo: null, fromLocal: null, toNormal: false }) {
  // BackMaker 인스턴스를 instance 변수에 할당합니다.
  // instance 변수를 통해 클래스의 다른 메서드나 속성에 접근할 수 있습니다.
  const instance = this;

  // Mother 클래스에서 mongo, mongoinfo, mongolocalinfo 객체를 가져옵니다.
  // mongo는 MongoDB 클라이언트 객체이며, mongoinfo는 원격 데이터베이스 연결 정보를, mongolocalinfo는 로컬 데이터베이스 연결 정보를 담고 있습니다.
  const { mongo, mongoinfo, mongolocalinfo } = this.mother;

  // MONGOC 변수에 사용할 MongoDB 클라이언트를 할당합니다.
  // 로컬 데이터베이스를 사용할지 여부에 따라 MONGOC에 다른 MongoDB 클라이언트를 할당합니다.
  let MONGOC;
  if (option.fromLocal === true) {
    // 로컬 데이터베이스 연결 정보를 사용하여 MongoDB 클라이언트를 초기화합니다.
    MONGOC = new mongo(mongolocalinfo);
  } else {
    // 원격 데이터베이스 연결 정보를 사용하여 MongoDB 클라이언트를 초기화합니다.
    MONGOC = new mongo(mongoinfo);
  }

  // 'project' 컬렉션의 이름을 button 변수에 할당합니다.
  // 이 컬렉션은 '홈리에종'이 진행한 인테리어 프로젝트들의 정보를 저장합니다.
  const button = "project";

  // 프로젝트와 관련된 클래스 및 도구들을 불러옵니다.
  // generator.js 파일에서 Project, Projects, Tools 객체를 가져옵니다.
  let { Project, Projects, Tools } = require(`${this.aliveDir}/${button}/addOn/generator.js`);

  try {
    // tong과 projectsArr 변수를 선언합니다.
    // tong은 검색된 프로젝트 문서 배열을 저장하며, projectsArr는 최종 반환될 프로젝트 객체 배열을 저장합니다.
    let tong, projectsArr;

    // sortQuery 변수를 선언하고 정렬 기준을 할당합니다.
    if (option.sort === undefined) {
      // 정렬 기준이 주어지지 않은 경우, 기본적으로 제안 날짜(proposal.date) 기준으로 내림차순 정렬합니다.
      sortQuery = { "proposal.date": -1 };
    } else {
      // 주어진 정렬 기준을 사용합니다.
      sortQuery = option.sort;
    }

    // MongoDB에서 쿼리를 실행하여 프로젝트 문서를 검색합니다.
    if (option.selfMongo === undefined || option.selfMongo === null) {
      // selfMongo 옵션이 설정되지 않은 경우, 기본 MongoDB 인스턴스를 사용하여 연결을 설정합니다.
      await MONGOC.connect();
      if (option.limit !== undefined) {
        // limit 옵션이 설정된 경우, 결과 개수를 제한합니다.
        tong = await MONGOC.db(`miro81`).collection(button).find(query).sort(sortQuery).limit(Number(option.limit)).toArray();
      } else {
        // limit 옵션이 설정되지 않은 경우, 모든 결과를 가져옵니다.
        tong = await MONGOC.db(`miro81`).collection(button).find(query).sort(sortQuery).toArray();
      }
      // MongoDB 연결을 종료합니다.
      await MONGOC.close();
    } else {
      // selfMongo 옵션이 설정된 경우, 해당 MongoDB 인스턴스를 사용하여 데이터를 가져옵니다.
      if (option.limit !== undefined) {
        tong = await option.selfMongo.db(`miro81`).collection(button).find(query).sort(sortQuery).limit(Number(option.limit)).toArray();
      } else {
        tong = await option.selfMongo.db(`miro81`).collection(button).find(query).sort(sortQuery).toArray();
      }
    }

    // withTools 옵션이 false인 경우, Projects 배열을 초기화하고 Project 객체들을 추가합니다.
    if (!option.withTools) {
      projectsArr = new Projects();
      for (let i of tong) {
        projectsArr.push(new Project(i));
      }
    } else {
      // withTools 옵션이 true인 경우, 도구를 포함한 Project와 Projects 객체를 생성합니다.
      Project = Tools.withTools(Project);
      Projects = Tools.withToolsArr(Projects);
      projectsArr = new Projects();
      for (let i of tong) {
        projectsArr.push(new Project(i));
      }
    }

    // toNormal 옵션이 true인 경우, 프로젝트 배열을 일반 객체 배열로 변환합니다.
    if (option.toNormal === true) {
      projectsArr = projectsArr.toNormal();
    }

    // 최종적으로 projectsArr 변수를 반환합니다.
    return projectsArr;
  } catch (e) {
    // 오류가 발생한 경우, 콘솔에 오류 메시지를 출력합니다.
    console.log(e);
    // 오류가 발생하면 null을 반환합니다.
    return null;
  }
};

/**
 * @method getProjectsAll
 * @description '홈리에종'이 진행한 모든 인테리어 디자인 프로젝트들을 검색하여 반환하는 메서드입니다.
 * @param {Object} option - 설정 옵션 객체입니다.
 * @param {boolean} [option.withTools=false] - 프로젝트 객체에 도구를 포함할지 여부를 설정합니다.
 * @param {Object} [option.selfMongo=null] - 사용할 MongoDB 인스턴스입니다. 설정되지 않으면 기본 MongoDB 인스턴스를 사용합니다.
 * @param {boolean} [option.toNormal=false] - 반환할 프로젝트 객체를 일반 객체로 변환할지 여부를 설정합니다.
 * @returns {Promise<Object[]|null>} 검색된 모든 프로젝트 객체 배열을 반환하며, 오류가 발생하면 null을 반환합니다.
 */
BackMaker.prototype.getProjectsAll = async function (option = { withTools: false, selfMongo: null, toNormal: false }) {
  // BackMaker 인스턴스를 instance 변수에 할당합니다.
  // instance 변수를 통해 클래스의 다른 메서드나 속성에 접근할 수 있습니다.
  const instance = this;

  // Mother 클래스에서 mongo와 mongoinfo 객체를 가져옵니다.
  // mongo는 MongoDB 클라이언트 객체이며, mongoinfo는 데이터베이스 연결 정보를 담고 있습니다.
  const { mongo, mongoinfo } = this.mother;

  // MongoDB 클라이언트를 초기화하여 MONGOC 변수에 할당합니다.
  // MONGOC를 통해 MongoDB와 상호작용할 수 있습니다.
  const MONGOC = new mongo(mongoinfo);

  // 'project' 컬렉션의 이름을 button 변수에 할당합니다.
  // 이 컬렉션은 '홈리에종'이 진행한 인테리어 프로젝트들의 정보를 저장합니다.
  const button = "project";

  // 프로젝트와 관련된 클래스 및 도구들을 불러옵니다.
  // generator.js 파일에서 Project, Projects, Tools 객체를 가져옵니다.
  let { Project, Projects, Tools } = require(`${this.aliveDir}/${button}/addOn/generator.js`);

  try {
    // tong과 projectsArr 변수를 선언합니다.
    // tong은 검색된 프로젝트 문서 배열을 저장하며, projectsArr는 최종 반환될 프로젝트 객체 배열을 저장합니다.
    let tong, projectsArr;

    // MongoDB에서 모든 프로젝트 문서를 검색합니다.
    if (option.selfMongo === undefined || option.selfMongo === null) {
      // selfMongo 옵션이 설정되지 않은 경우, 기본 MongoDB 인스턴스를 사용하여 연결을 설정합니다.
      await MONGOC.connect();

      // 'project' 컬렉션에서 모든 문서를 검색하여 배열로 반환합니다.
      tong = await MONGOC.db(`miro81`).collection(button).find({}).toArray();

      // MongoDB 연결을 종료합니다.
      await MONGOC.close();
    } else {
      // selfMongo 옵션이 설정된 경우, 해당 MongoDB 인스턴스를 사용하여 데이터를 가져옵니다.
      tong = await option.selfMongo.db(`miro81`).collection(button).find({}).toArray();
    }

    // withTools 옵션이 false인 경우, Projects 배열을 초기화하고 Project 객체들을 추가합니다.
    if (!option.withTools) {
      // Projects 배열을 초기화합니다.
      projectsArr = new Projects();
      
      // 검색된 각 프로젝트 문서에 대해 Project 객체를 생성하고, Projects 배열에 추가합니다.
      for (let i of tong) {
        projectsArr.push(new Project(i));
      }
    } else {
      // withTools 옵션이 true인 경우, 도구를 포함한 Project와 Projects 객체를 생성합니다.
      Project = Tools.withTools(Project);
      Projects = Tools.withToolsArr(Projects);
      
      // Projects 배열을 초기화하고, 검색된 프로젝트 문서들을 추가합니다.
      projectsArr = new Projects();
      for (let i of tong) {
        projectsArr.push(new Project(i));
      }
    }

    // toNormal 옵션이 true인 경우, 프로젝트 배열을 일반 객체 배열로 변환합니다.
    if (option.toNormal === true) {
      projectsArr = projectsArr.toNormal();
    }

    // 최종적으로 projectsArr 변수를 반환합니다.
    return projectsArr;
  } catch (e) {
    // 오류가 발생한 경우, 콘솔에 오류 메시지를 출력합니다.
    console.log(e);
    // 오류가 발생하면 null을 반환합니다.
    return null;
  }
};

/**
 * @method getProjectsByCliidArr
 * @description 고객 아이디 배열(cliidArr)을 사용하여 해당 고객들의 인테리어 디자인 프로젝트 정보를 검색하여 반환하는 메서드입니다.
 * @param {Array<string>} cliidArr - 검색할 고객 아이디로 구성된 문자열 배열입니다.
 * @param {Object} option - 설정 옵션 객체입니다.
 * @param {boolean} [option.withTools=false] - 프로젝트 객체에 도구를 포함할지 여부를 설정합니다.
 * @param {Object} [option.selfMongo=null] - 사용할 MongoDB 인스턴스입니다. 설정되지 않으면 기본 MongoDB 인스턴스를 사용합니다.
 * @param {Array} [option.recycle=null] - 재사용할 프로젝트 배열을 지정합니다. 설정된 경우, 데이터베이스에서 새로 검색하지 않고 이 배열에서 데이터를 필터링합니다.
 * @param {boolean} [option.toNormal=false] - 반환할 프로젝트 객체를 일반 객체로 변환할지 여부를 설정합니다.
 * @returns {Promise<Array|Projects>} 검색된 프로젝트 객체 배열을 반환하며, 옵션에 따라 일반 객체 배열로 변환될 수 있습니다.
 */
BackMaker.prototype.getProjectsByCliidArr = function (cliidArr, option = { withTools: false, selfMongo: null, recycle: null, toNormal: false }) {
  // BackMaker 인스턴스를 instance 변수에 할당합니다.
  // instance 변수를 통해 클래스의 다른 메서드나 속성에 접근할 수 있습니다.
  const instance = this;

  // 'project' 컬렉션의 이름을 button 변수에 할당합니다.
  // 이 컬렉션은 '홈리에종'이 진행한 인테리어 프로젝트들의 정보를 저장합니다.
  const button = "project";

  // 프로젝트와 관련된 클래스 및 도구들을 불러옵니다.
  // generator.js 파일에서 Project, Projects, Tools 객체를 가져옵니다.
  let { Project, Projects, Tools } = require(`${this.aliveDir}/${button}/addOn/generator.js`);

  // 반환할 프로젝트 배열을 저장할 변수를 선언합니다.
  let projects;

  // 옵션으로 재활용할 프로젝트 배열(recycle)이 설정된 경우, 이 배열을 사용하여 작업을 수행합니다.
  if (option.recycle !== undefined && option.recycle !== null) {
    // option.recycle에 저장된 프로젝트 배열을 projects 변수에 할당합니다.
    projects = option.recycle;

    // withTools 옵션이 true로 설정된 경우, Projects 배열에 도구를 포함시킵니다.
    if (option.withTools === true) {
      Projects = Tools.withToolsArr(Projects);
    }

    // 반환할 결과 배열(result)을 초기화합니다. toNormal 옵션에 따라 일반 객체 배열 또는 Projects 객체로 초기화됩니다.
    let result = (option.toNormal === true) ? [] : new Projects();

    // 프로젝트 배열(projects)에서 각 프로젝트를 순회하며, 해당 프로젝트의 cliid가 cliidArr에 포함되어 있는지 확인합니다.
    for (let p of projects) {
      if (cliidArr.includes(p.cliid)) {
        // cliid가 일치하는 경우, 해당 프로젝트를 결과 배열에 추가합니다.
        result.push(p);
      }
    }

    // 필터링된 결과 배열을 반환합니다.
    return result;

  } else {
    // 재활용할 프로젝트 배열이 없는 경우, 데이터베이스에서 프로젝트를 새로 검색합니다.

    // Mother 클래스에서 mongo와 mongoinfo 객체를 가져옵니다.
    // mongo는 MongoDB 클라이언트 객체이며, mongoinfo는 데이터베이스 연결 정보를 담고 있습니다.
    const { mongo, mongoinfo } = this.mother;

    // MongoDB 클라이언트를 초기화하여 MONGOC 변수에 할당합니다.
    const MONGOC = new mongo(mongoinfo);

    // 새로운 Promise를 생성하여 비동기 작업을 수행합니다.
    return new Promise(function (resolve, reject) {
      // getProjectsByQuery 메서드를 호출하여 데이터베이스에서 모든 프로젝트를 검색합니다.
      instance.getProjectsByQuery({}, option).then((projects) => {
        // withTools 옵션이 true로 설정된 경우, Projects 배열에 도구를 포함시킵니다.
        if (option.withTools === true) {
          Projects = Tools.withToolsArr(Projects);
        }

        // 반환할 결과 배열(result)을 초기화합니다. toNormal 옵션에 따라 일반 객체 배열 또는 Projects 객체로 초기화됩니다.
        let result = (option.toNormal === true) ? [] : new Projects();

        // 검색된 프로젝트 배열(projects)에서 각 프로젝트를 순회하며, 해당 프로젝트의 cliid가 cliidArr에 포함되어 있는지 확인합니다.
        for (let p of projects) {
          if (cliidArr.includes(p.cliid)) {
            // cliid가 일치하는 경우, 해당 프로젝트를 결과 배열에 추가합니다.
            result.push(p);
          }
        }

        // 필터링된 결과 배열을 resolve를 통해 반환합니다.
        resolve(result);

      }).catch(function (e) {
        // 데이터베이스 작업 중 오류가 발생한 경우, reject를 통해 오류를 반환합니다.
        reject(e);
      });
    });
  }

};

/**
 * @method getProjectsByNames
 * @description 고객 이름과 디자이너 이름으로 '홈리에종'이 진행한 인테리어 디자인 프로젝트를 검색하여 반환하는 메서드입니다.
 * @param {Array<string>|Object} nameArr - 검색할 고객 이름과 디자이너 이름이 포함된 배열 또는 객체입니다. 
 *                                          배열 형식: [ '고객 이름', '디자이너 이름' ] 
 *                                          객체 형식: { client: '고객 이름', designer: '디자이너 이름' } 또는 { clientName: '고객 이름', designerName: '디자이너 이름' }
 * @param {Object} option - 설정 옵션 객체입니다.
 * @param {boolean} [option.withTools=false] - 프로젝트 객체에 도구를 포함할지 여부를 설정합니다.
 * @param {Object} [option.selfMongo=null] - 사용할 MongoDB 인스턴스입니다. 설정되지 않으면 기본 MongoDB 인스턴스를 사용합니다.
 * @param {boolean} [option.toNormal=false] - 반환할 프로젝트 객체를 일반 객체로 변환할지 여부를 설정합니다.
 * @returns {Promise<Object[]|null>} 검색된 프로젝트 객체 배열을 반환하며, 오류가 발생하면 null을 반환합니다.
 */
BackMaker.prototype.getProjectsByNames = async function (nameArr, option = { withTools: false, selfMongo: null, toNormal: false }) {
  // BackMaker 인스턴스를 instance 변수에 할당합니다.
  // instance 변수를 통해 클래스의 다른 메서드나 속성에 접근할 수 있습니다.
  const instance = this;

  // confirmMode 변수를 초기화합니다. 이 변수는 nameArr이 객체일 때, 이름을 확인하는 모드로 전환됩니다.
  let confirmMode = false;

  try {
    // nameArr이 배열인지 확인합니다.
    if (Array.isArray(nameArr)) {
      // nameArr이 배열일 경우, 요소의 개수가 2개 미만이면 오류를 발생시킵니다.
      if (nameArr.length < 2) {
        throw new Error("invaild arguments : nameArr must be Array: [ String: client name, String: designer name ]");
      }
    } 
    // nameArr이 객체인지 확인합니다.
    else if (typeof nameArr === "object") {
      // nameArr 객체가 client와 designer 속성을 가지고 있는지 확인합니다.
      if (nameArr.client !== undefined && nameArr.designer !== undefined) {
        // client와 designer 속성이 있으면 배열로 변환합니다.
        nameArr = [ nameArr.client, nameArr.designer ];
      } 
      // nameArr 객체가 clientName과 designerName 속성을 가지고 있는지 확인합니다.
      else if (nameArr.clientName !== undefined && nameArr.designerName !== undefined) {
        // clientName과 designerName 속성이 있으면 배열로 변환합니다.
        nameArr = [ nameArr.clientName, nameArr.designerName ];
      } else {
        // 위의 조건을 만족하지 않으면 오류를 발생시킵니다.
        throw new Error("invaild arguments : nameArr must be Array: [ String: client name, String: designer name ]");
      }
      // confirmMode를 true로 설정합니다.
      confirmMode = true;
    } else {
      // nameArr이 배열도 객체도 아니면 오류를 발생시킵니다.
      throw new Error("invaild arguments : nameArr must be Array: [ String: client name, String: designer name ]");
    }

    // 고객과 디자이너를 검색하기 위한 쿼리 객체를 초기화합니다.
    let searchQuery_client, searchQuery_designer;
    let clients, designers, projects;
    let allCases, tempArr;
    let whereQuery;

    // 고객 검색 쿼리 초기화
    searchQuery_client = {};
    searchQuery_client["$or"] = [];

    // 디자이너 검색 쿼리 초기화
    searchQuery_designer = {};
    searchQuery_designer["$or"] = [];

    // confirmMode가 false인 경우, nameArr 배열을 순회하여 고객과 디자이너 이름을 쿼리에 추가합니다.
    if (!confirmMode) {
      for (let i of nameArr) {
        // 고객 이름으로 검색하기 위한 쿼리를 생성합니다.
        searchQuery_client["$or"].push({ name: i });
        // 디자이너 이름으로 검색하기 위한 쿼리를 생성합니다.
        searchQuery_designer["$or"].push({ designer: i });
      }
    } 
    // confirmMode가 true인 경우, nameArr 배열의 첫 번째와 두 번째 요소를 사용하여 쿼리를 생성합니다.
    else {
      searchQuery_client = { name: nameArr[0] };
      searchQuery_designer = { designer: nameArr[1] };
    }

    // 고객을 검색합니다. getClientsByQuery 메서드를 사용하여 해당 조건의 고객을 가져옵니다.
    clients = await this.getClientsByQuery(searchQuery_client, option);

    // 디자이너를 검색합니다. getDesignersByQuery 메서드를 사용하여 해당 조건의 디자이너를 가져옵니다.
    designers = await this.getDesignersByQuery(searchQuery_designer, option);

    // 검색된 고객이나 디자이너가 없으면 빈 배열을 반환합니다.
    if (clients.length === 0 || designers.length === 0) {
      return [];
    }

    // 모든 고객과 디자이너의 조합을 생성합니다.
    allCases = [];
    for (let { cliid } of clients) {
      for (let { desid } of designers) {
        tempArr = [ cliid, desid ];
        allCases.push(tempArr);
      }
    }

    // 생성된 조합이 없으면 빈 배열을 반환합니다.
    if (allCases.length === 0) {
      return [];
    }

    // 프로젝트를 검색하기 위한 쿼리를 초기화합니다.
    whereQuery = {};
    whereQuery["$or"] = [];

    // 생성된 고객과 디자이너의 조합을 기반으로 프로젝트를 검색하기 위한 조건을 추가합니다.
    for (let [ cliid, desid ] of allCases) {
      whereQuery["$or"].push({ cliid, desid });
    }

    // 프로젝트를 검색합니다. getProjectsByQuery 메서드를 사용하여 조건에 맞는 프로젝트를 가져옵니다.
    projects = await this.getProjectsByQuery(whereQuery, option);

    // 검색된 프로젝트를 반환합니다.
    return projects;

  } catch (e) {
    // 오류가 발생한 경우, 콘솔에 오류 메시지를 출력합니다.
    console.log(e);
  }
}

/**
 * @method updateProject
 * @description '홈리에종'이 진행한 인테리어 프로젝트의 정보를 업데이트하는 메서드입니다.
 * @param {Array<Object>} queryArr - 업데이트를 위한 쿼리 객체 배열입니다. 
 *                                   [ Object: whereQuery, Object: updateQuery ] 형식으로 제공되어야 합니다.
 * @param {Object} option - 설정 옵션 객체입니다.
 * @param {Object} [option.selfMongo=null] - 사용할 MongoDB 인스턴스입니다. 설정되지 않으면 기본 MongoDB 인스턴스를 사용합니다.
 * @returns {Promise<string>} 업데이트가 성공하면 "success", 실패하면 "fail"을 반환합니다.
 */
BackMaker.prototype.updateProject = async function (queryArr, option = { selfMongo: null }) {
  // queryArr 배열의 길이가 2가 아닌 경우, 잘못된 인자로 간주하고 오류를 발생시킵니다.
  if (queryArr.length !== 2) {
    throw new Error("invaild arguments : query object must be Array: [ Object: whereQuery, Object: updateQuery ]");
  }

  // BackMaker 인스턴스를 instance 변수에 할당합니다.
  // instance 변수를 통해 클래스의 다른 메서드나 속성에 접근할 수 있습니다.
  const instance = this;

  // Mother 클래스에서 mongo와 mongoinfo 객체를 가져옵니다.
  // mongo는 MongoDB 클라이언트 객체이며, mongoinfo는 데이터베이스 연결 정보를 담고 있습니다.
  const { mongo, mongoinfo } = this.mother;

  // MongoDB 클라이언트를 초기화하여 MONGOC 변수에 할당합니다.
  // MONGOC를 통해 MongoDB와 상호작용할 수 있습니다.
  const MONGOC = new mongo(mongoinfo);

  // 'project' 컬렉션의 이름을 button 변수에 할당합니다.
  // 이 컬렉션은 '홈리에종'이 진행한 인테리어 프로젝트들의 정보를 저장합니다.
  const button = "project";

  try {
    // queryArr 배열에서 whereQuery와 updateQuery 객체를 추출합니다.
    const [ whereQuery, updateQuery ] = queryArr;

    // updateQuery가 객체가 아니거나 null인 경우, 잘못된 업데이트 쿼리로 간주하고 오류를 발생시킵니다.
    if (typeof updateQuery !== "object" || updateQuery === null) {
      throw new Error("invalid updateQuery");
    }

    // updateQuery 객체에 "null" 키가 존재하는 경우, 해당 키를 삭제합니다.
    if (updateQuery["null"] !== undefined) {
      delete updateQuery["null"];
    }

    // MongoDB에서 프로젝트 정보를 업데이트합니다.
    if (option.selfMongo === undefined || option.selfMongo === null) {
      // selfMongo 옵션이 설정되지 않은 경우, 기본 MongoDB 인스턴스를 사용하여 연결을 설정합니다.
      await MONGOC.connect();

      // 'project' 컬렉션에서 whereQuery 조건에 맞는 문서를 updateQuery 내용으로 업데이트합니다.
      await MONGOC.db(`miro81`).collection(button).updateOne(whereQuery, { $set: updateQuery });

      // MongoDB 연결을 종료합니다.
      await MONGOC.close();
    } else {
      // selfMongo 옵션이 설정된 경우, 해당 MongoDB 인스턴스를 사용하여 데이터를 업데이트합니다.
      await option.selfMongo.db(`miro81`).collection(button).updateOne(whereQuery, { $set: updateQuery });
    }

    // 업데이트가 성공적으로 완료되면 "success" 문자열을 반환합니다.
    return "success";
  } catch (e) {
    // 오류가 발생한 경우, 콘솔에 오류 메시지를 출력합니다.
    console.log(e);

    // 오류가 발생하면 "fail" 문자열을 반환합니다.
    return "fail";
  }
}

/**
 * @method deleteProject
 * @description '홈리에종'이 진행한 특정 인테리어 프로젝트를 삭제하는 메서드입니다.
 * @param {string} proid - 삭제할 프로젝트의 고유 ID입니다.
 * @param {Object} option - 설정 옵션 객체입니다.
 * @param {Object} [option.selfMongo=null] - 사용할 MongoDB 인스턴스입니다. 설정되지 않으면 기본 MongoDB 인스턴스를 사용합니다.
 * @returns {Promise<string>} 삭제가 성공하면 "success"를 반환합니다.
 */
BackMaker.prototype.deleteProject = async function (proid, option = { selfMongo: null }) {
  // BackMaker 인스턴스를 instance 변수에 할당합니다.
  // instance 변수를 사용하여 클래스의 다른 메서드나 속성에 접근할 수 있습니다.
  const instance = this;

  // Mother 클래스에서 mongo와 mongoinfo 객체를 가져옵니다.
  // mongo는 MongoDB 클라이언트 객체이며, mongoinfo는 데이터베이스 연결 정보를 담고 있습니다.
  const { mongo, mongoinfo } = this.mother;

  // MongoDB 클라이언트를 초기화하여 MONGOC 변수에 할당합니다.
  // MONGOC를 통해 MongoDB와 상호작용할 수 있습니다.
  const MONGOC = new mongo(mongoinfo);

  // 'project' 컬렉션의 이름을 button 변수에 할당합니다.
  // 이 컬렉션은 '홈리에종'이 진행한 인테리어 프로젝트들의 정보를 저장합니다.
  const button = "project";

  try {
    // selfMongo 옵션이 설정되지 않은 경우, 기본 MongoDB 인스턴스를 사용하여 연결을 설정합니다.
    if (option.selfMongo === undefined || option.selfMongo === null) {
      // MongoDB에 연결합니다.
      await MONGOC.connect();

      // 'project' 컬렉션에서 proid와 일치하는 문서를 삭제합니다.
      // deleteOne 메서드는 주어진 조건에 맞는 첫 번째 문서를 삭제합니다.
      await MONGOC.db(`miro81`).collection(button).deleteOne({ proid });

      // MongoDB 연결을 종료합니다.
      await MONGOC.close();
    } else {
      // selfMongo 옵션이 설정된 경우, 해당 MongoDB 인스턴스를 사용하여 데이터를 삭제합니다.
      await option.selfMongo.db(`miro81`).collection(button).deleteOne({ proid });
    }

    // 삭제 작업이 성공적으로 완료되었음을 나타내는 "success" 문자열을 반환합니다.
    return "success";
  } catch (e) {
    // 오류가 발생하면 오류 메시지를 콘솔에 출력합니다.
    console.log(e);
  }
}

/**
 * @method returnProjectDummies
 * @description 주어진 주제(subject)에 따라 '홈리에종'의 인테리어 프로젝트에 대한 더미 데이터를 반환하는 메서드입니다.
 * @param {string} subject - 더미 데이터를 가져올 주제입니다. 
 * @returns {Object} 주어진 주제에 해당하는 더미 데이터 객체를 반환합니다.
 */
BackMaker.prototype.returnProjectDummies = function (subject) {
  // BackMaker 인스턴스를 instance 변수에 할당합니다.
  // instance 변수를 사용하여 클래스의 다른 메서드나 속성에 접근할 수 있습니다.
  const instance = this;

  // 프로젝트 맵핑 데이터를 가져오기 위해 project.js 파일을 require로 불러옵니다.
  // map 객체는 project.js에서 내보내는 데이터를 포함합니다.
  const map = require(`${this.mapDir}/project/addOn/generator.js`).ProjectMap;

  // 주어진 subject(주제)에 해당하는 더미 데이터를 map 객체에서 가져옵니다.
  // map.sub 메서드를 사용하여 주제에 맞는 데이터를 불러옵니다.
  let dummy;
  dummy = map.sub(subject);

  // 더미 데이터를 반환합니다. 이 데이터는 주어진 주제에 맞게 생성된 데이터입니다.
  return dummy;
}

/**
 * @method createProject
 * @description '홈리에종'이 진행한 새로운 인테리어 프로젝트를 생성하는 메서드입니다. 생성된 프로젝트의 ID를 반환합니다.
 * @param {Object} updateQuery - 새로 생성된 프로젝트 정보를 업데이트하기 위한 쿼리 객체입니다.
 * @param {Object} option - 설정 옵션 객체입니다.
 * @param {Object} [option.selfMongo=null] - 사용할 MongoDB 인스턴스입니다. 설정되지 않으면 기본 MongoDB 인스턴스를 사용합니다.
 * @returns {Promise<string>} 생성된 프로젝트의 고유 ID(proid)를 반환합니다.
 */
BackMaker.prototype.createProject = async function (updateQuery, option = { selfMongo: null }) {
  // BackMaker 인스턴스를 instance 변수에 할당합니다.
  // instance 변수를 사용하여 클래스의 다른 메서드나 속성에 접근할 수 있습니다.
  const instance = this;

  // Mother 클래스에서 mongo와 mongoinfo 객체를 가져옵니다.
  // mongo는 MongoDB 클라이언트 객체이며, mongoinfo는 데이터베이스 연결 정보를 담고 있습니다.
  const { mongo, mongoinfo } = this.mother;

  // MongoDB 클라이언트를 초기화하여 MONGOC 변수에 할당합니다.
  // MONGOC를 통해 MongoDB와 상호작용할 수 있습니다.
  const MONGOC = new mongo(mongoinfo);

  // 'project' 컬렉션의 이름을 button 변수에 할당합니다.
  // 이 컬렉션은 '홈리에종'이 진행한 인테리어 프로젝트들의 정보를 저장합니다.
  const button = "project";

  // 프로젝트 맵핑 데이터를 가져오기 위해 project.js 파일을 require로 불러옵니다.
  // map 객체는 project.js에서 내보내는 데이터를 포함합니다.
  const map = require(`${this.mapDir}/project/addOn/generator.js`).ProjectMap;

  try {
    // 여러 변수를 선언합니다.
    let dummy, latestProject, latestProjectArr;
    let newOption = {};
    let temp;

    // selfMongo 옵션이 설정된 경우, 이를 newOption 객체에 할당합니다.
    if (option.selfMongo !== undefined && option.selfMongo !== null) {
      newOption.selfMongo = option.selfMongo;
    }

    // withTools 옵션을 false로 설정합니다.
    newOption.withTools = false;

    // proid를 기준으로 내림차순 정렬하고, 최신 프로젝트를 하나만 가져오기 위해 limit을 1로 설정합니다.
    newOption.sort = { "proid": -1 };
    newOption.limit = 1;

    // getProjectsByQuery 메서드를 사용하여 가장 최근에 생성된 프로젝트를 가져옵니다.
    latestProjectArr = await this.getProjectsByQuery({}, newOption);
    latestProject = latestProjectArr[0];

    // map.main() 메서드를 사용하여 프로젝트의 기본 구조를 가져옵니다.
    dummy = map.main();

    // 새로운 프로젝트 ID를 생성하여 dummy 구조에 할당합니다.
    dummy.structure.proid = this.idMaker(latestProject.proid);

    // MongoDB에 연결하고 새 프로젝트 데이터를 삽입합니다.
    if (option.selfMongo === undefined || option.selfMongo === null) {
      // 기본 MongoDB 인스턴스를 사용하여 연결을 설정합니다.
      await MONGOC.connect();

      // 'project' 컬렉션에 새로운 프로젝트 데이터를 삽입합니다.
      await MONGOC.db(`miro81`).collection(button).insertOne(dummy.structure);

      // MongoDB 연결을 종료합니다.
      await MONGOC.close();
    } else {
      // selfMongo 옵션이 설정된 경우, 해당 MongoDB 인스턴스를 사용하여 데이터를 삽입합니다.
      await option.selfMongo.db(`miro81`).collection(button).insertOne(dummy.structure);
    }

    // 생성된 프로젝트를 업데이트합니다. updateProject 메서드를 사용하여 추가 정보를 업데이트합니다.
    await this.updateProject([{ proid: dummy.structure.proid }, updateQuery], option);

    // 생성된 프로젝트의 고유 ID를 반환합니다.
    return dummy.structure.proid;
  } catch (e) {
    // 오류가 발생한 경우, 콘솔에 오류 메시지를 출력합니다.
    console.log(e);
  }
}

// GET Aspirant -------------------------------------------------------------------------------

/**
 * @method getAspirantById
 * @description '홈리에종'에 지원한 특정 인테리어 디자이너 신청자의 정보를 ID로 검색하여 반환하는 메서드입니다.
 * @param {string} aspid - 검색할 신청자의 고유 ID입니다.
 * @param {Object} option - 설정 옵션 객체입니다.
 * @param {boolean} [option.withTools=false] - 신청자 객체에 도구를 포함할지 여부를 설정합니다.
 * @param {Object} [option.selfMongo=null] - 사용할 MongoDB 인스턴스입니다. 설정되지 않으면 기본 MongoDB 인스턴스를 사용합니다.
 * @param {boolean} [option.portfolioReset=null] - 포트폴리오 리셋 여부를 설정합니다.
 * @param {boolean} [option.toNormal=false] - 반환할 신청자 객체를 일반 객체로 변환할지 여부를 설정합니다.
 * @returns {Promise<Object|null>} 검색된 신청자 객체를 반환하며, 결과가 없으면 null을 반환합니다.
 */
BackMaker.prototype.getAspirantById = async function (aspid, option = { withTools: false, selfMongo: null, portfolioReset: null, toNormal: false }) {
  // BackMaker 인스턴스를 instance 변수에 할당합니다.
  // instance 변수를 통해 클래스의 다른 메서드나 속성에 접근할 수 있습니다.
  const instance = this;

  // Mother 클래스에서 mongo와 mongoinfo 객체를 가져옵니다.
  // mongo는 MongoDB 클라이언트 객체이며, mongoinfo는 데이터베이스 연결 정보를 담고 있습니다.
  const { mongo, mongoinfo } = this.mother;

  // MongoDB 클라이언트를 초기화하여 MONGOC 변수에 할당합니다.
  // MONGOC를 통해 MongoDB와 상호작용할 수 있습니다.
  const MONGOC = new mongo(mongoinfo);

  // 'aspirant' 컬렉션의 이름을 button 변수에 할당합니다.
  // 이 컬렉션은 '홈리에종'에 지원한 인테리어 디자이너 신청자들의 정보를 저장합니다.
  const button = "aspirant";

  // 신청자와 관련된 클래스 및 도구들을 불러옵니다.
  // generator.js 파일에서 Aspirant, Aspirants, Tools 객체를 가져옵니다.
  let { Aspirant, Aspirants, Tools } = require(`${this.aliveDir}/${button}/addOn/generator.js`);

  try {
    // 배열 변수(arr)와 대상 변수(target)를 선언합니다.
    // arr는 검색된 신청자 문서 배열을 저장하며, target는 최종 반환될 신청자 객체를 저장합니다.
    let arr, target;

    // selfMongo 옵션이 설정되지 않은 경우, 기본 MongoDB 인스턴스를 사용하여 연결을 설정합니다.
    if (option.selfMongo === undefined || option.selfMongo === null) {
      // MongoDB에 연결합니다.
      await MONGOC.connect();

      // 'aspirant' 컬렉션에서 aspid와 일치하는 문서를 검색하여 배열로 반환합니다.
      arr = await MONGOC.db(`miro81`).collection(button).find({ aspid }).toArray();

      // MongoDB 연결을 종료합니다.
      await MONGOC.close();
    } else {
      // selfMongo 옵션이 설정된 경우, 해당 MongoDB 인스턴스를 사용하여 데이터를 가져옵니다.
      arr = await option.selfMongo.db(`miro81`).collection(button).find({ aspid }).toArray();
    }

    // withTools 옵션이 true인 경우, Aspirant 객체에 도구를 포함시킵니다.
    if (option.withTools) {
      Aspirant = Tools.withTools(Aspirant);
    }

    // 검색된 신청자가 있는지 확인합니다.
    if (arr.length > 0) {
      // 검색된 첫 번째 신청자 데이터를 사용하여 Aspirant 객체를 생성합니다.
      target = new Aspirant(arr[0]);

      // toNormal 옵션이 true인 경우, 신청자 객체를 일반 객체로 변환합니다.
      if (option.toNormal === true) {
        target = target.toNormal();
      }
    } else {
      // 검색 결과가 없는 경우, target 변수에 null을 할당합니다.
      target = null;
    }

    // 최종적으로 target 변수를 반환합니다. 이 변수는 신청자 객체이거나 null입니다.
    return target;
  } catch (e) {
    // 오류가 발생한 경우, 콘솔에 오류 메시지를 출력합니다.
    console.log(e);
  }
}

/**
 * @method getAspirantsByQuery
 * @description '홈리에종'에 지원한 인테리어 디자이너 신청자들의 정보를 특정 쿼리를 사용하여 검색하고 반환하는 메서드입니다.
 * @param {Object} query - MongoDB 쿼리 객체로, 검색 조건을 정의합니다.
 * @param {Object} option - 설정 옵션 객체입니다.
 * @param {boolean} [option.withTools=false] - 신청자 객체에 도구를 포함할지 여부를 설정합니다.
 * @param {Object} [option.selfMongo=null] - 사용할 MongoDB 인스턴스입니다. 설정되지 않으면 기본 MongoDB 인스턴스를 사용합니다.
 * @param {boolean} [option.portfolioReset=null] - 포트폴리오를 리셋할지 여부를 설정합니다.
 * @param {boolean} [option.fromLocal=null] - 로컬 MongoDB에서 데이터를 가져올지 여부를 설정합니다.
 * @param {boolean} [option.toNormal=false] - 반환할 신청자 객체를 일반 객체로 변환할지 여부를 설정합니다.
 * @returns {Promise<Object[]|null>} 검색된 신청자 객체 배열을 반환하며, 오류가 발생하면 null을 반환합니다.
 */
BackMaker.prototype.getAspirantsByQuery = async function (query, option = { withTools: false, selfMongo: null, portfolioReset: null, fromLocal: null, toNormal: false }) {
  // BackMaker 인스턴스를 instance 변수에 할당합니다.
  // instance 변수를 통해 클래스의 다른 메서드나 속성에 접근할 수 있습니다.
  const instance = this;

  // Mother 클래스에서 mongo, mongoinfo, mongolocalinfo 객체를 가져옵니다.
  // mongo는 MongoDB 클라이언트 객체이며, mongoinfo는 원격 데이터베이스 연결 정보를, mongolocalinfo는 로컬 데이터베이스 연결 정보를 담고 있습니다.
  const { mongo, mongoinfo, mongolocalinfo } = this.mother;

  // 사용할 MongoDB 클라이언트를 결정합니다.
  // 로컬 데이터베이스를 사용할지 여부에 따라 MONGOC에 다른 MongoDB 클라이언트를 할당합니다.
  let MONGOC;
  if (option.fromLocal === true) {
    MONGOC = new mongo(mongolocalinfo);
  } else {
    MONGOC = new mongo(mongoinfo);
  }

  // 'aspirant' 컬렉션의 이름을 button 변수에 할당합니다.
  // 이 컬렉션은 '홈리에종'에 지원한 인테리어 디자이너 신청자들의 정보를 저장합니다.
  const button = "aspirant";

  // 신청자와 관련된 클래스 및 도구들을 불러옵니다.
  // generator.js 파일에서 Aspirant, Aspirants, Tools 객체를 가져옵니다.
  let { Aspirant, Aspirants, Tools } = require(`${this.aliveDir}/${button}/addOn/generator.js`);

  try {
    // tong과 aspirantsArr 변수를 선언합니다.
    // tong은 검색된 신청자 문서 배열을 저장하며, aspirantsArr는 최종 반환될 신청자 객체 배열을 저장합니다.
    let tong, aspirantsArr;
    let sortQuery;
    let updateQuery;

    // sortQuery 변수를 선언하고 정렬 기준을 할당합니다.
    // 정렬 기준이 주어지지 않은 경우, 기본적으로 신청자의 첫 요청 날짜(submit.firstRequest.date) 기준으로 내림차순 정렬합니다.
    if (option.sort === undefined) {
      sortQuery = { "submit.firstRequest.date": -1 };
    } else {
      sortQuery = option.sort;
    }

    // MongoDB에서 쿼리를 실행하여 신청자 문서를 검색합니다.
    if (option.selfMongo === undefined || option.selfMongo === null) {
      // selfMongo 옵션이 설정되지 않은 경우, 기본 MongoDB 인스턴스를 사용하여 연결을 설정합니다.
      await MONGOC.connect();
      if (option.limit !== undefined) {
        // limit 옵션이 설정된 경우, 결과 개수를 제한합니다.
        tong = await MONGOC.db(`miro81`).collection(button).find(query).sort(sortQuery).limit(Number(option.limit)).toArray();
      } else {
        // limit 옵션이 설정되지 않은 경우, 모든 결과를 가져옵니다.
        tong = await MONGOC.db(`miro81`).collection(button).find(query).sort(sortQuery).toArray();
      }
      // MongoDB 연결을 종료합니다.
      await MONGOC.close();
    } else {
      // selfMongo 옵션이 설정된 경우, 해당 MongoDB 인스턴스를 사용하여 데이터를 가져옵니다.
      if (option.limit !== undefined) {
        tong = await option.selfMongo.db(`miro81`).collection(button).find(query).sort(sortQuery).limit(Number(option.limit)).toArray();
      } else {
        tong = await option.selfMongo.db(`miro81`).collection(button).find(query).sort(sortQuery).toArray();
      }
    }

    // portfolioReset 옵션이 설정된 경우, 포트폴리오를 리셋합니다.
    if (option.portfolioReset !== null && option.portfolioReset !== undefined) {
      if (option.selfMongo === undefined || option.selfMongo === null) {
        await MONGOC.connect();
      }
      for (let a of tong) {
        // 신청자의 포트폴리오가 비어 있는 경우, 포트폴리오를 추가합니다.
        if (a.portfolio.length === 0) {
          // 웹, SNS, 클라우드 채널에서 포트폴리오 링크를 생성하고 추가합니다.
          for (let i of a.information.channel.web) {
            a.portfolio.unshift({ date: a.submit.firstRequest.date, confirm: [], folderId: "__link__" + i.replace(/[\&\=]/g, '') });
          }
          for (let i of a.information.channel.sns) {
            a.portfolio.unshift({ date: a.submit.firstRequest.date, confirm: [], folderId: "__link__" + i.replace(/[\&\=]/g, '') });
          }
          for (let i of a.information.channel.cloud) {
            a.portfolio.unshift({ date: a.submit.firstRequest.date, confirm: [], folderId: "__link__" + i.replace(/[\&\=]/g, '') });
          }
          updateQuery = {};
          updateQuery["portfolio"] = a.portfolio;
          // 포트폴리오 업데이트 쿼리를 실행합니다.
          if (option.selfMongo === undefined || option.selfMongo === null) {
            await MONGOC.db(`miro81`).collection(button).updateOne({ aspid: a.aspid }, { "$set": updateQuery });
          } else {
            await option.selfMongo.db(`miro81`).collection(button).updateOne({ aspid: a.aspid }, { "$set": updateQuery });
          }
        }
      }
      // MongoDB 연결을 종료합니다.
      if (option.selfMongo === undefined || option.selfMongo === null) {
        await MONGOC.close();
      }
    }

    // withTools 옵션이 false인 경우, 신청자 객체 배열을 생성합니다.
    if (!option.withTools) {
      aspirantsArr = new Aspirants();
      for (let i of tong) {
        aspirantsArr.push(new Aspirant(i));
      }
    } else {
      // withTools 옵션이 true인 경우, 도구를 포함한 신청자 객체 배열을 생성합니다.
      Aspirant = Tools.withTools(Aspirant);
      Aspirants = Tools.withToolsArr(Aspirants);
      aspirantsArr = new Aspirants();
      for (let i of tong) {
        aspirantsArr.push(new Aspirant(i));
      }
    }

    // toNormal 옵션이 true인 경우, 신청자 객체 배열을 일반 객체 배열로 변환합니다.
    if (option.toNormal === true) {
      aspirantsArr = aspirantsArr.toNormal();
    }

    // 최종적으로 aspirantsArr 변수를 반환합니다.
    return aspirantsArr;
  } catch (e) {
    // 오류가 발생한 경우, 콘솔에 오류 메시지를 출력합니다.
    console.log(e);
  }
}

/**
 * @method updateAspirant
 * @description '홈리에종'에 지원한 인테리어 디자이너 신청자의 정보를 업데이트하는 메서드입니다.
 * @param {Array<Object>} queryArr - 업데이트를 위한 쿼리 객체 배열입니다. 
 *                                   [ Object: whereQuery, Object: updateQuery ] 형식으로 제공되어야 합니다.
 * @param {Object} option - 설정 옵션 객체입니다.
 * @param {Object} [option.selfMongo=null] - 사용할 MongoDB 인스턴스입니다. 설정되지 않으면 기본 MongoDB 인스턴스를 사용합니다.
 * @returns {Promise<string>} 업데이트가 성공하면 "success", 실패하면 "fail"을 반환합니다.
 */
BackMaker.prototype.updateAspirant = async function (queryArr, option = { selfMongo: null }) {
  // 쿼리 배열(queryArr)의 길이가 2가 아닌 경우, 잘못된 인자로 간주하고 오류를 발생시킵니다.
  if (queryArr.length !== 2) {
    throw new Error("invaild arguments : query object must be Array: [ Object: whereQuery, Object: updateQuery ]");
  }

  // BackMaker 인스턴스를 instance 변수에 할당합니다.
  // instance 변수를 통해 클래스의 다른 메서드나 속성에 접근할 수 있습니다.
  const instance = this;

  // Mother 클래스에서 mongo와 mongoinfo 객체를 가져옵니다.
  // mongo는 MongoDB 클라이언트 객체이며, mongoinfo는 데이터베이스 연결 정보를 담고 있습니다.
  const { mongo, mongoinfo } = this.mother;

  // MongoDB 클라이언트를 초기화하여 MONGOC 변수에 할당합니다.
  // MONGOC를 통해 MongoDB와 상호작용할 수 있습니다.
  const MONGOC = new mongo(mongoinfo);

  // 'aspirant' 컬렉션의 이름을 button 변수에 할당합니다.
  // 이 컬렉션은 '홈리에종'에 지원한 인테리어 디자이너 신청자들의 정보를 저장합니다.
  const button = "aspirant";

  try {
    // queryArr 배열에서 whereQuery와 updateQuery 객체를 추출합니다.
    const [ whereQuery, updateQuery ] = queryArr;

    // updateQuery가 객체가 아니거나 null인 경우, 잘못된 업데이트 쿼리로 간주하고 오류를 발생시킵니다.
    if (typeof updateQuery !== "object" || updateQuery === null) {
      throw new Error("invalid updateQuery");
    }

    // updateQuery 객체에 "null" 키가 존재하는 경우, 해당 키를 삭제합니다.
    if (updateQuery["null"] !== undefined) {
      delete updateQuery["null"];
    }

    // MongoDB에서 신청자 정보를 업데이트합니다.
    if (option.selfMongo === undefined || option.selfMongo === null) {
      // selfMongo 옵션이 설정되지 않은 경우, 기본 MongoDB 인스턴스를 사용하여 연결을 설정합니다.
      await MONGOC.connect();

      // 'aspirant' 컬렉션에서 whereQuery 조건에 맞는 문서를 updateQuery 내용으로 업데이트합니다.
      await MONGOC.db(`miro81`).collection(button).updateOne(whereQuery, { $set: updateQuery });

      // MongoDB 연결을 종료합니다.
      await MONGOC.close();
    } else {
      // selfMongo 옵션이 설정된 경우, 해당 MongoDB 인스턴스를 사용하여 데이터를 업데이트합니다.
      await option.selfMongo.db(`miro81`).collection(button).updateOne(whereQuery, { $set: updateQuery });
    }

    // 업데이트가 성공적으로 완료되면 "success" 문자열을 반환합니다.
    return "success";
  } catch (e) {
    // 오류가 발생한 경우, 콘솔에 오류 메시지를 출력합니다.
    console.log(e);

    // 오류가 발생하면 "fail" 문자열을 반환합니다.
    return "fail";
  }
}

/**
 * @method deleteAspirant
 * @description '홈리에종'에 지원한 특정 인테리어 디자이너 신청자의 정보를 삭제하는 메서드입니다.
 * @param {string} aspid - 삭제할 신청자의 고유 ID입니다.
 * @param {Object} option - 설정 옵션 객체입니다.
 * @param {Object} [option.selfMongo=null] - 사용할 MongoDB 인스턴스입니다. 설정되지 않으면 기본 MongoDB 인스턴스를 사용합니다.
 * @returns {Promise<string>} 삭제가 성공하면 "success"를 반환합니다.
 */
BackMaker.prototype.deleteAspirant = async function (aspid, option = { selfMongo: null }) {
  // BackMaker 인스턴스를 instance 변수에 할당합니다.
  // instance 변수를 사용하여 클래스의 다른 메서드나 속성에 접근할 수 있습니다.
  const instance = this;

  // Mother 클래스에서 mongo와 mongoinfo 객체를 가져옵니다.
  // mongo는 MongoDB 클라이언트 객체이며, mongoinfo는 데이터베이스 연결 정보를 담고 있습니다.
  const { mongo, mongoinfo } = this.mother;

  // MongoDB 클라이언트를 초기화하여 MONGOC 변수에 할당합니다.
  // MONGOC를 통해 MongoDB와 상호작용할 수 있습니다.
  const MONGOC = new mongo(mongoinfo);

  // 'aspirant' 컬렉션의 이름을 button 변수에 할당합니다.
  // 이 컬렉션은 '홈리에종'에 지원한 인테리어 디자이너 신청자들의 정보를 저장합니다.
  const button = "aspirant";

  try {
    // selfMongo 옵션이 설정되지 않은 경우, 기본 MongoDB 인스턴스를 사용하여 연결을 설정합니다.
    if (option.selfMongo === undefined || option.selfMongo === null) {
      // MongoDB에 연결합니다.
      await MONGOC.connect();

      // 'aspirant' 컬렉션에서 aspid와 일치하는 문서를 삭제합니다.
      // deleteOne 메서드는 주어진 조건에 맞는 첫 번째 문서를 삭제합니다.
      await MONGOC.db(`miro81`).collection(button).deleteOne({ aspid });

      // MongoDB 연결을 종료합니다.
      await MONGOC.close();
    } else {
      // selfMongo 옵션이 설정된 경우, 해당 MongoDB 인스턴스를 사용하여 데이터를 삭제합니다.
      await option.selfMongo.db(`miro81`).collection(button).deleteOne({ aspid });
    }

    // 삭제 작업이 성공적으로 완료되었음을 나타내는 "success" 문자열을 반환합니다.
    return "success";
  } catch (e) {
    // 오류가 발생하면 오류 메시지를 콘솔에 출력합니다.
    console.log(e);
  }
}

/**
 * @method createAspirant
 * @description '홈리에종'에 인테리어 디자이너로 지원한 새로운 신청자를 생성하는 메서드입니다. 생성된 신청자의 ID를 반환합니다.
 * @param {Object} updateQuery - 새로 생성된 신청자 정보를 업데이트하기 위한 쿼리 객체입니다.
 * @param {Object} option - 설정 옵션 객체입니다.
 * @param {Object} [option.selfMongo=null] - 사용할 MongoDB 인스턴스입니다. 설정되지 않으면 기본 MongoDB 인스턴스를 사용합니다.
 * @returns {Promise<string>} 생성된 신청자의 고유 ID(aspid)를 반환합니다.
 */
BackMaker.prototype.createAspirant = async function (updateQuery, option = { selfMongo: null }) {
  // BackMaker 인스턴스를 instance 변수에 할당합니다.
  // instance 변수를 사용하여 클래스의 다른 메서드나 속성에 접근할 수 있습니다.
  const instance = this;

  // Mother 클래스에서 mongo와 mongoinfo 객체를 가져옵니다.
  // mongo는 MongoDB 클라이언트 객체이며, mongoinfo는 데이터베이스 연결 정보를 담고 있습니다.
  const { mongo, mongoinfo } = this.mother;

  // MongoDB 클라이언트를 초기화하여 MONGOC 변수에 할당합니다.
  // MONGOC를 통해 MongoDB와 상호작용할 수 있습니다.
  const MONGOC = new mongo(mongoinfo);

  // 'aspirant' 컬렉션의 이름을 button 변수에 할당합니다.
  // 이 컬렉션은 '홈리에종'에 지원한 인테리어 디자이너 신청자들의 정보를 저장합니다.
  const button = "aspirant";

  // 프로젝트 맵핑 데이터를 가져오기 위해 aspirant.js 파일을 require로 불러옵니다.
  // map 객체는 aspirant.js에서 내보내는 데이터를 포함합니다.
  const map = require(`${this.mapDir}/aspirant/addOn/generator.js`).AspirantMap;

  try {
    // 여러 변수를 선언합니다.
    let dummy, latestAspirant, latestAspirantArr;
    let newOption = {};
    let temp;

    // selfMongo 옵션이 설정된 경우, 이를 newOption 객체에 할당합니다.
    if (option.selfMongo !== undefined && option.selfMongo !== null) {
      newOption.selfMongo = option.selfMongo;
    }

    // withTools 옵션을 false로 설정합니다.
    newOption.withTools = false;

    // aspid를 기준으로 내림차순 정렬하고, 최신 신청자를 하나만 가져오기 위해 limit을 1로 설정합니다.
    newOption.sort = { "aspid": -1 };
    newOption.limit = 1;

    // getAspirantsByQuery 메서드를 사용하여 가장 최근에 생성된 신청자를 가져옵니다.
    latestAspirantArr = await this.getAspirantsByQuery({}, newOption);
    latestAspirant = latestAspirantArr[0];

    // map.main() 메서드를 사용하여 신청자의 기본 구조를 가져옵니다.
    dummy = map.main();

    // 새로운 신청자 ID를 생성하여 dummy 구조에 할당합니다.
    dummy.structure.aspid = this.idMaker(latestAspirant.aspid);

    // MongoDB에 연결하고 새 신청자 데이터를 삽입합니다.
    if (option.selfMongo === undefined || option.selfMongo === null) {
      // 기본 MongoDB 인스턴스를 사용하여 연결을 설정합니다.
      await MONGOC.connect();

      // 'aspirant' 컬렉션에 새로운 신청자 데이터를 삽입합니다.
      await MONGOC.db(`miro81`).collection(button).insertOne(dummy.structure);

      // MongoDB 연결을 종료합니다.
      await MONGOC.close();
    } else {
      // selfMongo 옵션이 설정된 경우, 해당 MongoDB 인스턴스를 사용하여 데이터를 삽입합니다.
      await option.selfMongo.db(`miro81`).collection(button).insertOne(dummy.structure);
    }

    // 생성된 신청자를 업데이트합니다. updateAspirant 메서드를 사용하여 추가 정보를 업데이트합니다.
    await this.updateAspirant([{ aspid: dummy.structure.aspid }, updateQuery], option);

    // 생성된 신청자의 고유 ID를 반환합니다.
    return dummy.structure.aspid;
  } catch (e) {
    // 오류가 발생한 경우, 콘솔에 오류 메시지를 출력합니다.
    console.log(e);
  }
}

/**
 * @method unshiftAspirantPortfolioConfirm
 * @description '홈리에종'에 지원한 인테리어 디자이너 신청자의 포트폴리오에 새로운 확인 정보를 추가하는 메서드입니다.
 * @param {Object} whereQuery - 포트폴리오를 업데이트할 신청자를 찾기 위한 조건을 정의하는 쿼리 객체입니다.
 * @param {number} position - 포트폴리오 배열에서 확인 정보를 추가할 위치를 나타내는 인덱스입니다.
 * @param {Date} date - 확인 정보에 추가할 날짜 객체입니다.
 * @param {string} who - 확인 정보를 추가한 사람의 이름 또는 식별자입니다.
 * @param {Object} option - 설정 옵션 객체입니다.
 * @param {Object} [option.selfMongo=null] - 사용할 MongoDB 인스턴스입니다. 설정되지 않으면 기본 MongoDB 인스턴스를 사용합니다.
 * @returns {Promise<void>} 메서드는 값을 반환하지 않으며, 작업이 완료되면 종료됩니다.
 */
BackMaker.prototype.unshiftAspirantPortfolioConfirm = async function (whereQuery, position, date, who, option = { selfMongo: null }) {
  // BackMaker 인스턴스를 instance 변수에 할당합니다.
  // instance 변수를 사용하여 클래스의 다른 메서드나 속성에 접근할 수 있습니다.
  const instance = this;

  try {
    // whereQuery가 정의되지 않았을 경우, 오류를 발생시킵니다.
    if (whereQuery === undefined) {
      throw new Error("invaild where query : arguments must be { whereQuery: Object, position: number, date: Date, who: string ");
    }

    // position이 숫자 타입이 아닌 경우, 오류를 발생시킵니다.
    if (typeof position !== "number") {
      throw new Error("invaild position : arguments must be { whereQuery: Object, position: number, date: Date, who: string }");
    }

    // date가 Date 인스턴스가 아닌 경우, 오류를 발생시킵니다.
    if (!(date instanceof Date)) {
      throw new Error("invaild date : arguments must be { whereQuery: Object, position: number, date: Date, who: string }");
    }

    // who가 문자열 타입이 아닌 경우, 오류를 발생시킵니다.
    if (typeof who !== "string") {
      throw new Error("invaild who : arguments must be { whereQuery: Object, position: number, date: Date, who: string }");
    }

    // 신청자 데이터를 임시로 저장할 변수를 선언합니다.
    let tempAspirants, tempAspirant;

    // 포트폴리오 업데이트 쿼리를 저장할 변수를 선언합니다.
    let updateQuery;

    // whereQuery를 사용하여 해당 조건에 맞는 신청자들을 가져옵니다.
    tempAspirants = await this.getAspirantsByQuery(whereQuery, option);

    // updateQuery 객체를 초기화합니다.
    updateQuery = {};

    // 검색된 신청자가 1명인 경우, 포트폴리오에 확인 정보를 추가합니다.
    if (tempAspirants.length === 1) {
      // 첫 번째 신청자를 tempAspirant 변수에 할당합니다.
      tempAspirant = tempAspirants[0];

      // 포트폴리오가 존재하는 경우, 지정된 위치에 확인 정보를 추가합니다.
      if (tempAspirant.portfolio.length > 0) {
        // 포트폴리오의 지정된 위치에 새로운 확인 정보를 추가합니다.
        tempAspirant.portfolio[position].confirm.unshift({ date, who });

        // 업데이트할 쿼리를 정의합니다.
        updateQuery["portfolio." + String(position) + ".confirm"] = tempAspirant.portfolio[position].confirm;

        // updateAspirant 메서드를 사용하여 포트폴리오 정보를 업데이트합니다.
        await this.updateAspirant([ whereQuery, updateQuery ], option);
      }
    }
  } catch (e) {
    // 오류가 발생한 경우, 콘솔에 오류 메시지를 출력합니다.
    console.log(e);
  }
}

// GET builder --------------------------------------------------------------------------------

/**
 * @method getBuilderById
 * @description '홈리에종'과 계약을 맺은 특정 인테리어 시공사 소장님의 정보를 ID로 검색하여 반환하는 메서드입니다.
 * @param {string} buiid - 검색할 소장님의 고유 ID입니다.
 * @param {Object} option - 설정 옵션 객체입니다.
 * @param {boolean} [option.withTools=false] - 소장님 객체에 도구를 포함할지 여부를 설정합니다.
 * @param {Object} [option.selfMongo=null] - 사용할 MongoDB 인스턴스입니다. 설정되지 않으면 기본 MongoDB 인스턴스를 사용합니다.
 * @param {boolean} [option.portfolioReset=null] - 포트폴리오 리셋 여부를 설정합니다.
 * @param {boolean} [option.toNormal=false] - 반환할 소장님 객체를 일반 객체로 변환할지 여부를 설정합니다.
 * @returns {Promise<Object|null>} 검색된 소장님 객체를 반환하며, 결과가 없으면 null을 반환합니다.
 */
BackMaker.prototype.getBuilderById = async function (buiid, option = { withTools: false, selfMongo: null, portfolioReset: null, toNormal: false }) {
  // BackMaker 인스턴스를 instance 변수에 할당합니다.
  // instance 변수를 통해 클래스의 다른 메서드나 속성에 접근할 수 있습니다.
  const instance = this;

  // Mother 클래스에서 mongo와 mongoinfo 객체를 가져옵니다.
  // mongo는 MongoDB 클라이언트 객체이며, mongoinfo는 데이터베이스 연결 정보를 담고 있습니다.
  const { mongo, mongoinfo } = this.mother;

  // MongoDB 클라이언트를 초기화하여 MONGOC 변수에 할당합니다.
  // MONGOC를 통해 MongoDB와 상호작용할 수 있습니다.
  const MONGOC = new mongo(mongoinfo);

  // 'builder' 컬렉션의 이름을 button 변수에 할당합니다.
  // 이 컬렉션은 '홈리에종'과 계약을 맺은 인테리어 시공사 소장님의 정보를 저장합니다.
  const button = "builder";

  // 소장님과 관련된 클래스 및 도구들을 불러옵니다.
  // generator.js 파일에서 Builder, Builders, Tools 객체를 가져옵니다.
  let { Builder, Builders, Tools } = require(`${this.aliveDir}/${button}/addOn/generator.js`);

  try {
    // 배열 변수(arr)와 대상 변수(target)를 선언합니다.
    // arr는 검색된 소장님 문서 배열을 저장하며, target는 최종 반환될 소장님 객체를 저장합니다.
    let arr, target;

    // selfMongo 옵션이 설정되지 않은 경우, 기본 MongoDB 인스턴스를 사용하여 연결을 설정합니다.
    if (option.selfMongo === undefined || option.selfMongo === null) {
      // MongoDB에 연결합니다.
      await MONGOC.connect();

      // 'builder' 컬렉션에서 buiid와 일치하는 문서를 검색하여 배열로 반환합니다.
      arr = await MONGOC.db(`miro81`).collection(button).find({ buiid }).toArray();

      // MongoDB 연결을 종료합니다.
      await MONGOC.close();
    } else {
      // selfMongo 옵션이 설정된 경우, 해당 MongoDB 인스턴스를 사용하여 데이터를 가져옵니다.
      arr = await option.selfMongo.db(`miro81`).collection(button).find({ buiid }).toArray();
    }

    // withTools 옵션이 true인 경우, Builder 객체에 도구를 포함시킵니다.
    if (option.withTools) {
      Builder = Tools.withTools(Builder);
    }

    // 검색된 소장님이 있는지 확인합니다.
    if (arr.length > 0) {
      // 검색된 첫 번째 소장님 데이터를 사용하여 Builder 객체를 생성합니다.
      target = new Builder(arr[0]);

      // toNormal 옵션이 true인 경우, 소장님 객체를 일반 객체로 변환합니다.
      if (option.toNormal === true) {
        target = target.toNormal();
      }
    } else {
      // 검색 결과가 없는 경우, target 변수에 null을 할당합니다.
      target = null;
    }

    // 최종적으로 target 변수를 반환합니다. 이 변수는 소장님 객체이거나 null입니다.
    return target;
  } catch (e) {
    // 오류가 발생한 경우, 콘솔에 오류 메시지를 출력합니다.
    console.log(e);
    return null;
  }
}

/**
 * @method getBuildersByQuery
 * @description '홈리에종'과 계약을 맺은 인테리어 시공사 소장님들의 정보를 특정 쿼리를 사용하여 검색하고 반환하는 메서드입니다.
 * @param {Object} query - MongoDB 쿼리 객체로, 검색 조건을 정의합니다.
 * @param {Object} option - 설정 옵션 객체입니다.
 * @param {boolean} [option.withTools=false] - 소장님 객체에 도구를 포함할지 여부를 설정합니다.
 * @param {Object} [option.selfMongo=null] - 사용할 MongoDB 인스턴스입니다. 설정되지 않으면 기본 MongoDB 인스턴스를 사용합니다.
 * @param {boolean} [option.fromLocal=null] - 로컬 MongoDB에서 데이터를 가져올지 여부를 설정합니다.
 * @param {boolean} [option.toNormal=false] - 반환할 소장님 객체를 일반 객체로 변환할지 여부를 설정합니다.
 * @returns {Promise<Object[]|[]>} 검색된 소장님 객체 배열을 반환하며, 오류가 발생하면 빈 배열을 반환합니다.
 */
BackMaker.prototype.getBuildersByQuery = async function (query, option = { withTools: false, selfMongo: null, fromLocal: null, toNormal: false }) {
  // BackMaker 인스턴스를 instance 변수에 할당합니다.
  const instance = this;

  // Mother 클래스에서 mongo, mongoinfo, mongolocalinfo 객체를 가져옵니다.
  // mongo는 MongoDB 클라이언트 객체이며, mongoinfo는 원격 데이터베이스 연결 정보를, mongolocalinfo는 로컬 데이터베이스 연결 정보를 담고 있습니다.
  const { mongo, mongoinfo, mongolocalinfo } = this.mother;

  // 사용할 MongoDB 클라이언트를 결정합니다.
  // 로컬 데이터베이스를 사용할지 여부에 따라 MONGOC에 다른 MongoDB 클라이언트를 할당합니다.
  let MONGOC;
  if (option.fromLocal === true) {
    MONGOC = new mongo(mongolocalinfo);
  } else {
    MONGOC = new mongo(mongoinfo);
  }

  // 'builder' 컬렉션의 이름을 button 변수에 할당합니다.
  // 이 컬렉션은 '홈리에종'과 계약을 맺은 인테리어 시공사 소장님의 정보를 저장합니다.
  const button = "builder";

  // 소장님과 관련된 클래스 및 도구들을 불러옵니다.
  // generator.js 파일에서 Builder, Builders, Tools 객체를 가져옵니다.
  let { Builder, Builders, Tools } = require(`${this.aliveDir}/${button}/addOn/generator.js`);

  try {
    // tong과 buildersArr 변수를 선언합니다.
    // tong은 검색된 소장님 문서 배열을 저장하며, buildersArr는 최종 반환될 소장님 객체 배열을 저장합니다.
    let tong, buildersArr;
    let sortQuery;

    // sortQuery 변수를 선언하고 정렬 기준을 할당합니다.
    // 정렬 기준이 주어지지 않은 경우, 기본적으로 계약 날짜(information.contract.date) 기준으로 내림차순 정렬합니다.
    if (option.sort === undefined) {
      sortQuery = { "information.contract.date": -1 };
    } else {
      sortQuery = option.sort;
    }

    // MongoDB에서 쿼리를 실행하여 소장님 문서를 검색합니다.
    if (option.selfMongo === undefined || option.selfMongo === null) {
      // selfMongo 옵션이 설정되지 않은 경우, 기본 MongoDB 인스턴스를 사용하여 연결을 설정합니다.
      await MONGOC.connect();
      if (option.limit !== undefined) {
        // limit 옵션이 설정된 경우, 결과 개수를 제한합니다.
        tong = await MONGOC.db(`miro81`).collection(button).find(query).sort(sortQuery).limit(Number(option.limit)).toArray();
      } else {
        // limit 옵션이 설정되지 않은 경우, 모든 결과를 가져옵니다.
        tong = await MONGOC.db(`miro81`).collection(button).find(query).sort(sortQuery).toArray();
      }
      // MongoDB 연결을 종료합니다.
      await MONGOC.close();
    } else {
      // selfMongo 옵션이 설정된 경우, 해당 MongoDB 인스턴스를 사용하여 데이터를 가져옵니다.
      if (option.limit !== undefined) {
        tong = await option.selfMongo.db(`miro81`).collection(button).find(query).sort(sortQuery).limit(Number(option.limit)).toArray();
      } else {
        tong = await option.selfMongo.db(`miro81`).collection(button).find(query).sort(sortQuery).toArray();
      }
    }

    // withTools 옵션이 false인 경우, 소장님 객체 배열을 생성합니다.
    if (!option.withTools) {
      buildersArr = new Builders();
      for (let i of tong) {
        buildersArr.push(new Builder(i));
      }
    } else {
      // withTools 옵션이 true인 경우, 도구를 포함한 소장님 객체 배열을 생성합니다.
      Builder = Tools.withTools(Builder);
      Builders = Tools.withToolsArr(Builders);
      buildersArr = new Builders();
      for (let i of tong) {
        buildersArr.push(new Builder(i));
      }
    }

    // toNormal 옵션이 true인 경우, 소장님 객체 배열을 일반 객체 배열로 변환합니다.
    if (option.toNormal === true) {
      buildersArr = buildersArr.toNormal();
    }

    // 최종적으로 buildersArr 변수를 반환합니다.
    return buildersArr;
  } catch (e) {
    // 오류가 발생한 경우, 콘솔에 오류 메시지를 출력합니다.
    console.log(e);
    // 오류가 발생하면 빈 배열을 반환합니다.
    return [];
  }
}

/**
 * @method updateBuilder
 * @description '홈리에종'과 계약을 맺은 특정 인테리어 시공사 소장님의 정보를 업데이트하는 메서드입니다.
 * @param {Array<Object>} queryArr - 업데이트를 위한 쿼리 객체 배열입니다. 
 *                                   [ Object: whereQuery, Object: updateQuery ] 형식으로 제공되어야 합니다.
 * @param {Object} option - 설정 옵션 객체입니다.
 * @param {Object} [option.selfMongo=null] - 사용할 MongoDB 인스턴스입니다. 설정되지 않으면 기본 MongoDB 인스턴스를 사용합니다.
 * @returns {Promise<string>} 업데이트가 성공하면 "success", 실패하면 "fail"을 반환합니다.
 */
BackMaker.prototype.updateBuilder = async function (queryArr, option = { selfMongo: null }) {
  // 쿼리 배열(queryArr)의 길이가 2가 아닌 경우, 잘못된 인자로 간주하고 오류를 발생시킵니다.
  if (queryArr.length !== 2) {
    throw new Error("invaild arguments : query object must be Array: [ Object: whereQuery, Object: updateQuery ]");
  }

  // BackMaker 인스턴스를 instance 변수에 할당합니다.
  // instance 변수를 통해 클래스의 다른 메서드나 속성에 접근할 수 있습니다.
  const instance = this;

  // Mother 클래스에서 mongo와 mongoinfo 객체를 가져옵니다.
  // mongo는 MongoDB 클라이언트 객체이며, mongoinfo는 데이터베이스 연결 정보를 담고 있습니다.
  const { mongo, mongoinfo } = this.mother;

  // MongoDB 클라이언트를 초기화하여 MONGOC 변수에 할당합니다.
  // MONGOC를 통해 MongoDB와 상호작용할 수 있습니다.
  const MONGOC = new mongo(mongoinfo);

  // 'builder' 컬렉션의 이름을 button 변수에 할당합니다.
  // 이 컬렉션은 '홈리에종'과 계약을 맺은 인테리어 시공사 소장님들의 정보를 저장합니다.
  const button = "builder";

  try {
    // queryArr 배열에서 whereQuery와 updateQuery 객체를 추출합니다.
    const [ whereQuery, updateQuery ] = queryArr;

    // updateQuery가 객체가 아니거나 null인 경우, 잘못된 업데이트 쿼리로 간주하고 오류를 발생시킵니다.
    if (typeof updateQuery !== "object" || updateQuery === null) {
      throw new Error("invalid updateQuery");
    }

    // updateQuery 객체에 "null" 키가 존재하는 경우, 해당 키를 삭제합니다.
    if (updateQuery["null"] !== undefined) {
      delete updateQuery["null"];
    }

    // MongoDB에서 소장님 정보를 업데이트합니다.
    if (option.selfMongo === undefined || option.selfMongo === null) {
      // selfMongo 옵션이 설정되지 않은 경우, 기본 MongoDB 인스턴스를 사용하여 연결을 설정합니다.
      await MONGOC.connect();

      // 'builder' 컬렉션에서 whereQuery 조건에 맞는 문서를 updateQuery 내용으로 업데이트합니다.
      await MONGOC.db(`miro81`).collection(button).updateOne(whereQuery, { $set: updateQuery });

      // MongoDB 연결을 종료합니다.
      await MONGOC.close();
    } else {
      // selfMongo 옵션이 설정된 경우, 해당 MongoDB 인스턴스를 사용하여 데이터를 업데이트합니다.
      await option.selfMongo.db(`miro81`).collection(button).updateOne(whereQuery, { $set: updateQuery });
    }

    // 업데이트가 성공적으로 완료되면 "success" 문자열을 반환합니다.
    return "success";
  } catch (e) {
    // 오류가 발생한 경우, 콘솔에 오류 메시지를 출력합니다.
    console.log(e);

    // 오류가 발생하면 "fail" 문자열을 반환합니다.
    return "fail";
  }
}

/**
 * @method deleteBuilder
 * @description '홈리에종'과 계약을 맺은 특정 인테리어 시공사 소장님의 정보를 삭제하는 메서드입니다.
 * @param {string} buiid - 삭제할 소장님의 고유 ID입니다.
 * @param {Object} option - 설정 옵션 객체입니다.
 * @param {Object} [option.selfMongo=null] - 사용할 MongoDB 인스턴스입니다. 설정되지 않으면 기본 MongoDB 인스턴스를 사용합니다.
 * @returns {Promise<string>} 삭제가 성공하면 "success", 실패하면 "fail"을 반환합니다.
 */
BackMaker.prototype.deleteBuilder = async function (buiid, option = { selfMongo: null }) {
  // BackMaker 인스턴스를 instance 변수에 할당합니다.
  // instance 변수를 사용하여 클래스의 다른 메서드나 속성에 접근할 수 있습니다.
  const instance = this;

  // Mother 클래스에서 mongo와 mongoinfo 객체를 가져옵니다.
  // mongo는 MongoDB 클라이언트 객체이며, mongoinfo는 데이터베이스 연결 정보를 담고 있습니다.
  const { mongo, mongoinfo } = this.mother;

  // MongoDB 클라이언트를 초기화하여 MONGOC 변수에 할당합니다.
  // MONGOC를 통해 MongoDB와 상호작용할 수 있습니다.
  const MONGOC = new mongo(mongoinfo);

  // 'builder' 컬렉션의 이름을 button 변수에 할당합니다.
  // 이 컬렉션은 '홈리에종'과 계약을 맺은 인테리어 시공사 소장님들의 정보를 저장합니다.
  const button = "builder";

  try {
    // selfMongo 옵션이 설정되지 않은 경우, 기본 MongoDB 인스턴스를 사용하여 연결을 설정합니다.
    if (option.selfMongo === undefined || option.selfMongo === null) {
      // MongoDB에 연결합니다.
      await MONGOC.connect();

      // 'builder' 컬렉션에서 buiid와 일치하는 문서를 삭제합니다.
      // deleteOne 메서드는 주어진 조건에 맞는 첫 번째 문서를 삭제합니다.
      await MONGOC.db(`miro81`).collection(button).deleteOne({ buiid });

      // MongoDB 연결을 종료합니다.
      await MONGOC.close();
    } else {
      // selfMongo 옵션이 설정된 경우, 해당 MongoDB 인스턴스를 사용하여 데이터를 삭제합니다.
      await option.selfMongo.db(`miro81`).collection(button).deleteOne({ buiid });
    }

    // 삭제 작업이 성공적으로 완료되었음을 나타내는 "success" 문자열을 반환합니다.
    return "success";
  } catch (e) {
    // 오류가 발생하면 오류 메시지를 콘솔에 출력합니다.
    console.log(e);

    // 오류가 발생하면 "fail" 문자열을 반환합니다.
    return "fail";
  }
}

/**
 * @method createBuilder
 * @description '홈리에종'과 계약을 맺은 새로운 인테리어 시공사 소장님을 생성하고, 생성된 소장님의 ID를 반환하는 메서드입니다.
 * @param {Object} updateQuery - 새로 생성된 소장님 정보를 업데이트하기 위한 쿼리 객체입니다.
 * @param {Object} option - 설정 옵션 객체입니다.
 * @param {Object} [option.selfMongo=null] - 사용할 MongoDB 인스턴스입니다. 설정되지 않으면 기본 MongoDB 인스턴스를 사용합니다.
 * @returns {Promise<string|null>} 생성된 소장님의 고유 ID(buiid)를 반환하며, 오류 발생 시 null을 반환합니다.
 */
BackMaker.prototype.createBuilder = async function (updateQuery, option = { selfMongo: null }) {
  // BackMaker 인스턴스를 instance 변수에 할당합니다.
  // instance 변수를 사용하여 클래스의 다른 메서드나 속성에 접근할 수 있습니다.
  const instance = this;

  // Mother 클래스에서 mongo와 mongoinfo 객체를 가져옵니다.
  // mongo는 MongoDB 클라이언트 객체이며, mongoinfo는 데이터베이스 연결 정보를 담고 있습니다.
  const { mongo, mongoinfo } = this.mother;

  // MongoDB 클라이언트를 초기화하여 MONGOC 변수에 할당합니다.
  // MONGOC를 통해 MongoDB와 상호작용할 수 있습니다.
  const MONGOC = new mongo(mongoinfo);

  // 'builder' 컬렉션의 이름을 button 변수에 할당합니다.
  // 이 컬렉션은 '홈리에종'과 계약을 맺은 인테리어 시공사 소장님들의 정보를 저장합니다.
  const button = "builder";

  // 프로젝트 맵핑 데이터를 가져오기 위해 builder.js 파일을 require로 불러옵니다.
  // map 객체는 builder.js에서 내보내는 데이터를 포함합니다.
  const map = require(`${this.mapDir}/builder/addOn/generator.js`).BuilderMap;

  try {
    // 여러 변수를 선언합니다.
    let dummy, latestBuilder, latestBuilderArr;
    let newOption = {};
    let temp;

    // selfMongo 옵션이 설정된 경우, 이를 newOption 객체에 할당합니다.
    if (option.selfMongo !== undefined && option.selfMongo !== null) {
      newOption.selfMongo = option.selfMongo;
    }

    // withTools 옵션을 false로 설정합니다.
    newOption.withTools = false;

    // buiid를 기준으로 내림차순 정렬하고, 최신 소장님을 하나만 가져오기 위해 limit을 1로 설정합니다.
    newOption.sort = { "buiid": -1 };
    newOption.limit = 1;

    // getBuildersByQuery 메서드를 사용하여 가장 최근에 생성된 소장님을 가져옵니다.
    latestBuilderArr = await this.getBuildersByQuery({}, newOption);
    latestBuilder = latestBuilderArr[0];

    // map.main() 메서드를 사용하여 소장님의 기본 구조를 가져옵니다.
    dummy = map.main();

    // 새로운 소장님 ID를 생성하여 dummy 구조에 할당합니다.
    dummy.structure.buiid = this.idMaker(latestBuilder.buiid);

    // MongoDB에 연결하고 새 소장님 데이터를 삽입합니다.
    if (option.selfMongo === undefined || option.selfMongo === null) {
      // 기본 MongoDB 인스턴스를 사용하여 연결을 설정합니다.
      await MONGOC.connect();

      // 'builder' 컬렉션에 새로운 소장님 데이터를 삽입합니다.
      await MONGOC.db(`miro81`).collection(button).insertOne(dummy.structure);

      // MongoDB 연결을 종료합니다.
      await MONGOC.close();
    } else {
      // selfMongo 옵션이 설정된 경우, 해당 MongoDB 인스턴스를 사용하여 데이터를 삽입합니다.
      await option.selfMongo.db(`miro81`).collection(button).insertOne(dummy.structure);
    }

    // 생성된 소장님을 업데이트합니다. updateBuilder 메서드를 사용하여 추가 정보를 업데이트합니다.
    await this.updateBuilder([{ buiid: dummy.structure.buiid }, updateQuery], option);

    // 생성된 소장님의 고유 ID를 반환합니다.
    return dummy.structure.buiid;
  } catch (e) {
    // 오류가 발생한 경우, 콘솔에 오류 메시지를 출력합니다.
    console.log(e);

    // 오류가 발생하면 null을 반환합니다.
    return null;
  }
}

// GET history --------------------------------------------------------------------------------

/**
 * @method getHistoryById
 * @description 특정 고객, 디자이너, 프로젝트 또는 컨텐츠의 히스토리 데이터를 ID를 사용하여 검색하는 메서드입니다.
 * @param {string} method - 검색할 대상의 타입을 지정하는 문자열입니다. 예: "client", "designer", "project", "contents".
 * @param {string} id - 검색할 대상의 고유 ID입니다.
 * @param {Object} option - 설정 옵션 객체입니다.
 * @param {boolean} [option.fromConsole=false] - 콘솔에서 실행 여부를 설정하는 플래그입니다.
 * @param {Object} [option.selfMongo=null] - 사용할 MongoDB 인스턴스입니다. 설정되지 않으면 기본 MongoDB 인스턴스를 사용합니다.
 * @returns {Promise<Object|null>} 검색된 히스토리 객체를 반환하며, 결과가 없으면 null을 반환합니다.
 */
BackMaker.prototype.getHistoryById = async function (method, id, option = { fromConsole: false, selfMongo: null }) {
  // BackMaker 인스턴스를 instance 변수에 할당합니다.
  const instance = this;

  // Mother 클래스에서 mongo와 mongoinfo 객체를 가져옵니다.
  // mongo는 MongoDB 클라이언트 객체이며, mongoinfo는 데이터베이스 연결 정보를 담고 있습니다.
  const { mongo, mongoinfo } = this.mother;

  try {
    // MONGOLOCALC는 사용할 MongoDB 클라이언트를 저장하며, SELFMONGOBOO는 selfMongo 옵션이 사용되는지 여부를 나타냅니다.
    let MONGOLOCALC, SELFMONGOBOO;

    // selfMongo 옵션이 설정된 경우, SELFMONGOBOO를 true로 설정하고 MONGOLOCALC에 selfMongo 인스턴스를 할당합니다.
    if (option.selfMongo !== undefined && option.selfMongo !== null) {
      SELFMONGOBOO = true;
      MONGOLOCALC = option.selfMongo;
    } else {
      // selfMongo 옵션이 설정되지 않은 경우, SELFMONGOBOO를 false로 설정하고 MONGOLOCALC에 기본 MongoDB 클라이언트를 할당합니다.
      SELFMONGOBOO = false;
      MONGOLOCALC = new mongo(mongoinfo);
    }

    // arr와 target 변수를 선언합니다. arr는 검색된 히스토리 배열을 저장하며, target은 최종적으로 반환할 히스토리 객체를 저장합니다.
    let arr, target;

    // collection 변수와 whereQuery 변수를 선언하여, 검색할 컬렉션과 쿼리 조건을 설정합니다.
    let collection, whereQuery;

    // method 값에 따라 검색할 컬렉션과 쿼리 조건을 설정합니다.
    if (/client/gi.test(method)) {
      // method에 "client"가 포함된 경우, 고객 히스토리 컬렉션을 설정하고 cliid를 사용하여 검색합니다.
      collection = "clientHistory";
      whereQuery = { cliid: id };
    } else if (/designer/gi.test(method)) {
      // method에 "designer"가 포함된 경우, 디자이너 히스토리 컬렉션을 설정하고 desid를 사용하여 검색합니다.
      collection = "designerHistory";
      whereQuery = { desid: id };
    } else if (/project/gi.test(method)) {
      // method에 "project"가 포함된 경우, 프로젝트 히스토리 컬렉션을 설정하고 proid를 사용하여 검색합니다.
      collection = "projectHistory";
      whereQuery = { proid: id };
    } else if (/contents/gi.test(method)) {
      // method에 "contents"가 포함된 경우, 컨텐츠 히스토리 컬렉션을 설정하고 conid를 사용하여 검색합니다.
      collection = "contentsHistory";
      whereQuery = { conid: id };
    } else {
      // method 값이 유효하지 않은 경우, 오류를 발생시킵니다.
      throw new Error("invalid method");
    }

    // SELFMONGOBOO가 false인 경우, 기본 MongoDB 클라이언트를 사용하여 데이터베이스에 연결합니다.
    if (!SELFMONGOBOO) {
      await MONGOLOCALC.connect();
    }

    // 해당 컬렉션에서 whereQuery 조건에 맞는 히스토리 데이터를 검색하여 배열로 반환합니다.
    arr = await MONGOLOCALC.db(`miro81`).collection(collection).find(whereQuery).toArray();

    // SELFMONGOBOO가 false인 경우, MongoDB 연결을 종료합니다.
    if (!SELFMONGOBOO) {
      await MONGOLOCALC.close();
    }

    // 검색된 히스토리 데이터가 존재하는 경우, 첫 번째 요소를 반환합니다.
    if (arr.length > 0) {
      return arr[0];
    } else {
      // 검색 결과가 없는 경우, null을 반환합니다.
      return null;
    }
  } catch (e) {
    // 오류가 발생한 경우, 오류 메시지를 콘솔에 출력합니다.
    console.log(e);
  }
}

/**
 * @method getHistoriesByQuery
 * @description 고객, 디자이너, 프로젝트, 또는 컨텐츠의 히스토리 데이터를 특정 쿼리를 사용하여 검색하고, 해당 데이터를 반환하는 메서드입니다. 
 *              이 히스토리 데이터는 각 대상에 대한 응대 기록과 로그를 포함하는 서브 컬렉션에 저장되어 있습니다.
 * @param {string} method - 검색할 대상의 타입을 지정하는 문자열입니다. 예: "client", "designer", "project", "contents".
 * @param {Object} query - MongoDB 쿼리 객체로, 검색 조건을 정의합니다.
 * @param {Object} option - 설정 옵션 객체입니다.
 * @param {boolean} [option.fromConsole=false] - 콘솔에서 실행 여부를 설정하는 플래그입니다.
 * @param {Object} [option.selfMongo=null] - 사용할 MongoDB 인스턴스입니다. 설정되지 않으면 기본 MongoDB 인스턴스를 사용합니다.
 * @param {Object} [option.sort] - 검색 결과를 정렬하기 위한 정렬 조건입니다.
 * @param {number} [option.limit] - 검색 결과의 개수를 제한하는 옵션입니다.
 * @returns {Promise<Array>} 검색된 히스토리 객체 배열을 반환하며, 오류 발생 시 빈 배열을 반환합니다.
 */
BackMaker.prototype.getHistoriesByQuery = async function (method, query, option = { fromConsole: false, selfMongo: null }) {
  // BackMaker 인스턴스를 instance 변수에 할당합니다.
  const instance = this;

  // Mother 클래스에서 mongo와 mongoinfo 객체를 가져옵니다.
  // mongo는 MongoDB 클라이언트 객체이며, mongoinfo는 데이터베이스 연결 정보를 담고 있습니다.
  const { mongo, mongoinfo } = this.mother;

  try {
    // MONGOLOCALC는 사용할 MongoDB 클라이언트를 저장하며, SELFMONGOBOO는 selfMongo 옵션이 사용되는지 여부를 나타냅니다.
    let MONGOLOCALC, SELFMONGOBOO;

    // selfMongo 옵션이 설정된 경우, SELFMONGOBOO를 true로 설정하고 MONGOLOCALC에 selfMongo 인스턴스를 할당합니다.
    if (option.selfMongo !== undefined && option.selfMongo !== null) {
      SELFMONGOBOO = true;
      MONGOLOCALC = option.selfMongo;
    } else {
      // selfMongo 옵션이 설정되지 않은 경우, SELFMONGOBOO를 false로 설정하고 MONGOLOCALC에 기본 MongoDB 클라이언트를 할당합니다.
      SELFMONGOBOO = false;
      MONGOLOCALC = new mongo(mongoinfo);
    }

    // 히스토리 데이터를 저장할 tong 변수를 선언하고, 정렬 조건을 저장할 sortQuery 변수를 선언합니다.
    let tong, sortQuery;

    // 히스토리 데이터를 정렬할 기준과 검색할 컬렉션 이름을 설정하기 위한 변수를 선언합니다.
    let sortStandard, collection;

    // method 값에 따라 검색할 히스토리 컬렉션과 정렬 기준을 설정합니다.
    if (/client/gi.test(method)) {
      // method에 "client"가 포함된 경우, 고객 히스토리 컬렉션을 설정하고 cliid를 정렬 기준으로 설정합니다.
      collection = "clientHistory";
      sortStandard = "cliid";
    } else if (/designer/gi.test(method)) {
      // method에 "designer"가 포함된 경우, 디자이너 히스토리 컬렉션을 설정하고 desid를 정렬 기준으로 설정합니다.
      collection = "designerHistory";
      sortStandard = "desid";
    } else if (/project/gi.test(method)) {
      // method에 "project"가 포함된 경우, 프로젝트 히스토리 컬렉션을 설정하고 proid를 정렬 기준으로 설정합니다.
      collection = "projectHistory";
      sortStandard = "proid";
    } else if (/contents/gi.test(method)) {
      // method에 "contents"가 포함된 경우, 컨텐츠 히스토리 컬렉션을 설정하고 conid를 정렬 기준으로 설정합니다.
      collection = "contentsHistory";
      sortStandard = "conid";
    } else {
      // method 값이 유효하지 않은 경우, 오류를 발생시킵니다.
      throw new Error("invalid method");
    }

    // sort 옵션이 설정되지 않은 경우, 기본 정렬 기준을 설정합니다.
    if (option.sort === undefined) {
      sortQuery = {};
      sortQuery[sortStandard] = -1;
    } else {
      // sort 옵션이 설정된 경우, 해당 정렬 조건을 사용합니다.
      sortQuery = option.sort;
    }

    // SELFMONGOBOO가 false인 경우, 기본 MongoDB 클라이언트를 사용하여 데이터베이스에 연결합니다.
    if (!SELFMONGOBOO) {
      await MONGOLOCALC.connect();
    }

    // limit 옵션이 설정된 경우, 검색 결과의 개수를 제한합니다.
    if (option.limit !== undefined) {
      tong = await MONGOLOCALC.db(`miro81`).collection(collection).find(query).sort(sortQuery).limit(Number(option.limit)).toArray();
    } else {
      // limit 옵션이 설정되지 않은 경우, 모든 결과를 가져옵니다.
      tong = await MONGOLOCALC.db(`miro81`).collection(collection).find(query).sort(sortQuery).toArray();
    }

    // SELFMONGOBOO가 false인 경우, MongoDB 연결을 종료합니다.
    if (!SELFMONGOBOO) {
      await MONGOLOCALC.close();
    }

    // 최종적으로 검색된 히스토리 객체 배열을 반환합니다.
    return tong;
  } catch (e) {
    // 오류가 발생한 경우, 콘솔에 오류 메시지를 출력합니다.
    console.log(e);
    // 오류 발생 시 빈 배열을 반환합니다.
    return [];
  }
}

/**
 * @method getHistoriesAll
 * @description 고객, 디자이너, 프로젝트 또는 컨텐츠의 모든 히스토리 데이터를 검색하여 반환하는 메서드입니다. 
 *              이 히스토리 데이터는 각 대상에 대한 응대 기록과 로그를 포함하는 서브 컬렉션에 저장되어 있으며, 핵심 데이터와 연동됩니다.
 * @param {string} method - 검색할 대상의 타입을 지정하는 문자열입니다. 예: "client", "designer", "project", "contents".
 * @param {Object} option - 설정 옵션 객체입니다.
 * @param {boolean} [option.fromConsole=false] - 콘솔에서 실행 여부를 설정하는 플래그입니다.
 * @param {Object} [option.selfMongo=null] - 사용할 MongoDB 인스턴스입니다. 설정되지 않으면 기본 MongoDB 인스턴스를 사용합니다.
 * @param {Object} [option.sort] - 검색 결과를 정렬하기 위한 정렬 조건입니다.
 * @param {number} [option.limit] - 검색 결과의 개수를 제한하는 옵션입니다.
 * @returns {Promise<Array>} 검색된 히스토리 객체 배열을 반환하며, 오류 발생 시 빈 배열을 반환합니다.
 */
BackMaker.prototype.getHistoriesAll = async function (method, option = { fromConsole: false, selfMongo: null }) {
  // BackMaker 인스턴스를 instance 변수에 할당합니다.
  const instance = this;

  // Mother 클래스에서 mongo와 mongoinfo 객체를 가져옵니다.
  // mongo는 MongoDB 클라이언트 객체이며, mongoinfo는 데이터베이스 연결 정보를 담고 있습니다.
  const { mongo, mongoinfo } = this.mother;

  try {
    // MONGOLOCALC는 사용할 MongoDB 클라이언트를 저장하며, SELFMONGOBOO는 selfMongo 옵션이 사용되는지 여부를 나타냅니다.
    let MONGOLOCALC, SELFMONGOBOO;

    // selfMongo 옵션이 설정된 경우, SELFMONGOBOO를 true로 설정하고 MONGOLOCALC에 selfMongo 인스턴스를 할당합니다.
    if (option.selfMongo !== undefined && option.selfMongo !== null) {
      SELFMONGOBOO = true;
      MONGOLOCALC = option.selfMongo;
    } else {
      // selfMongo 옵션이 설정되지 않은 경우, SELFMONGOBOO를 false로 설정하고 MONGOLOCALC에 기본 MongoDB 클라이언트를 할당합니다.
      SELFMONGOBOO = false;
      MONGOLOCALC = new mongo(mongoinfo);
    }

    // 히스토리 데이터를 저장할 tong 변수를 선언하고, 정렬 조건을 저장할 sortQuery 변수를 선언합니다.
    let tong, sortQuery;

    // 히스토리 데이터를 정렬할 기준과 검색할 컬렉션 이름을 설정하기 위한 변수를 선언합니다.
    let sortStandard, collection;

    // method 값에 따라 검색할 히스토리 컬렉션과 정렬 기준을 설정합니다.
    if (/client/gi.test(method)) {
      // method에 "client"가 포함된 경우, 고객 히스토리 컬렉션을 설정하고 cliid를 정렬 기준으로 설정합니다.
      collection = "clientHistory";
      sortStandard = "cliid";
    } else if (/designer/gi.test(method)) {
      // method에 "designer"가 포함된 경우, 디자이너 히스토리 컬렉션을 설정하고 desid를 정렬 기준으로 설정합니다.
      collection = "designerHistory";
      sortStandard = "desid";
    } else if (/project/gi.test(method)) {
      // method에 "project"가 포함된 경우, 프로젝트 히스토리 컬렉션을 설정하고 proid를 정렬 기준으로 설정합니다.
      collection = "projectHistory";
      sortStandard = "proid";
    } else if (/contents/gi.test(method)) {
      // method에 "contents"가 포함된 경우, 컨텐츠 히스토리 컬렉션을 설정하고 conid를 정렬 기준으로 설정합니다.
      collection = "contentsHistory";
      sortStandard = "conid";
    } else {
      // method 값이 유효하지 않은 경우, 오류를 발생시킵니다.
      throw new Error("invalid method");
    }

    // sort 옵션이 설정되지 않은 경우, 기본 정렬 기준을 설정합니다.
    if (option.sort === undefined) {
      sortQuery = {};
      sortQuery[sortStandard] = -1; // 기본적으로 최신 항목이 먼저 오도록 내림차순 정렬합니다.
    } else {
      // sort 옵션이 설정된 경우, 해당 정렬 조건을 사용합니다.
      sortQuery = option.sort;
    }

    // SELFMONGOBOO가 false인 경우, 기본 MongoDB 클라이언트를 사용하여 데이터베이스에 연결합니다.
    if (!SELFMONGOBOO) {
      await MONGOLOCALC.connect();
    }

    // limit 옵션이 설정된 경우, 검색 결과의 개수를 제한합니다.
    if (option.limit !== undefined) {
      tong = await MONGOLOCALC.db(`miro81`).collection(collection).find({}).sort(sortQuery).limit(Number(option.limit)).toArray();
    } else {
      // limit 옵션이 설정되지 않은 경우, 모든 결과를 가져옵니다.
      tong = await MONGOLOCALC.db(`miro81`).collection(collection).find({}).sort(sortQuery).toArray();
    }

    // SELFMONGOBOO가 false인 경우, MongoDB 연결을 종료합니다.
    if (!SELFMONGOBOO) {
      await MONGOLOCALC.close();
    }

    // 최종적으로 검색된 히스토리 객체 배열을 반환합니다.
    return tong;
  } catch (e) {
    // 오류가 발생한 경우, 콘솔에 오류 메시지를 출력합니다.
    console.log(e);
    // 오류 발생 시 빈 배열을 반환합니다.
    return [];
  }
}

/**
 * @method getHistoryProperty
 * @description 히스토리 데이터가 매우 클 때 특정 프로퍼티만 추출하여 반환하는 메서드입니다. 
 *              히스토리 데이터는 각 고객(client), 디자이너(designer), 프로젝트(project), 컨텐츠(contents)에 대한 응대 기록과 로그를 포함하는 서브 컬렉션에 저장됩니다.
 * @param {string} method - 검색할 대상의 타입을 지정하는 문자열입니다. 예: "client", "designer", "project", "contents".
 * @param {string|Array<string>} property - 가져올 특정 프로퍼티 또는 프로퍼티의 배열입니다. "$all"을 사용하면 모든 프로퍼티를 가져옵니다.
 * @param {Array<string>|null} [idArr=null] - 검색할 대상의 ID 배열입니다. null일 경우 모든 데이터를 검색합니다.
 * @param {Object} option - 설정 옵션 객체입니다.
 * @param {boolean} [option.fromConsole=false] - 콘솔에서 실행 여부를 설정하는 플래그입니다.
 * @param {Object} [option.selfMongo=null] - 사용할 MongoDB 인스턴스입니다. 설정되지 않으면 기본 MongoDB 인스턴스를 사용합니다.
 * @param {Object} [option.sort] - 검색 결과를 정렬하기 위한 정렬 조건입니다.
 * @param {number} [option.limit] - 검색 결과의 개수를 제한하는 옵션입니다.
 * @returns {Promise<Object|null>} 특정 프로퍼티만을 포함하는 히스토리 객체를 반환하며, 오류 발생 시 null을 반환합니다.
 */
BackMaker.prototype.getHistoryProperty = async function (method, property, idArr = null, option = { fromConsole: false, selfMongo: null }) {
  // BackMaker 인스턴스를 instance 변수에 할당합니다.
  const instance = this;

  // Mother 클래스에서 mongo와 mongoinfo 객체를 가져옵니다.
  // mongo는 MongoDB 클라이언트 객체이며, mongoinfo는 데이터베이스 연결 정보를 담고 있습니다.
  const { mongo, mongoinfo } = this.mother;

  try {
    // MONGOLOCALC는 사용할 MongoDB 클라이언트를 저장하며, SELFMONGOBOO는 selfMongo 옵션이 사용되는지 여부를 나타냅니다.
    let MONGOLOCALC, SELFMONGOBOO;

    // selfMongo 옵션이 설정된 경우, SELFMONGOBOO를 true로 설정하고 MONGOLOCALC에 selfMongo 인스턴스를 할당합니다.
    if (option.selfMongo !== undefined && option.selfMongo !== null) {
      SELFMONGOBOO = true;
      MONGOLOCALC = option.selfMongo;
    } else {
      // selfMongo 옵션이 설정되지 않은 경우, SELFMONGOBOO를 false로 설정하고 MONGOLOCALC에 기본 MongoDB 클라이언트를 할당합니다.
      SELFMONGOBOO = false;
      MONGOLOCALC = new mongo(mongoinfo);
    }

    // tong 변수에 히스토리 데이터를 저장할 배열을 선언하고, 정렬 조건을 저장할 sortQuery 변수를 선언합니다.
    let tong, sortQuery;
    let finalTong;
    let findQuery, projectQuery;
    let sortStandard, collection;
    let tempObj;
    let tongLeft;
    let tongIds;
    let createQuery;
    let idKeywords;

    // method 값에 따라 검색할 히스토리 컬렉션과 정렬 기준, 그리고 ID 키워드를 설정합니다.
    if (/client/gi.test(method)) {
      collection = "clientHistory";
      sortStandard = "cliid";
      idKeywords = 'c';
    } else if (/designer/gi.test(method)) {
      collection = "designerHistory";
      sortStandard = "desid";
      idKeywords = 'd';
    } else if (/project/gi.test(method)) {
      collection = "projectHistory";
      sortStandard = "proid";
      idKeywords = 'p';
    } else if (/contents/gi.test(method)) {
      collection = "contentsHistory";
      sortStandard = "conid";
      idKeywords = 't';
    } else {
      // method 값이 유효하지 않은 경우, 오류를 발생시킵니다.
      throw new Error("invalid method");
    }

    // sort 옵션이 설정되지 않은 경우, 기본 정렬 기준을 설정합니다.
    if (option.sort === undefined) {
      sortQuery = {};
      sortQuery[sortStandard] = -1; // 기본적으로 최신 항목이 먼저 오도록 내림차순 정렬합니다.
    } else {
      // sort 옵션이 설정된 경우, 해당 정렬 조건을 사용합니다.
      sortQuery = option.sort;
    }

    // projectQuery 객체를 초기화합니다. 특정 프로퍼티를 가져오기 위한 쿼리를 설정합니다.
    projectQuery = {};
    if (property !== "$all") {
      // 특정 프로퍼티가 지정된 경우, 해당 프로퍼티만 가져오도록 설정합니다.
      projectQuery[sortStandard] = 1;
      if (typeof property === "string") {
        projectQuery[property] = 1;
      } else if (Array.isArray(property)) {
        for (let p of property) {
          projectQuery[p] = 1;
        }
      }
    }

    // findQuery 객체를 초기화합니다. 검색할 ID 조건을 설정합니다.
    findQuery = { "$or": [] };
    if (idArr === null) {
      // ID 배열이 null인 경우, 모든 데이터를 검색하도록 설정합니다.
      findQuery = {};
    } else if (Array.isArray(idArr)) {
      // ID 배열이 주어진 경우, 각 ID에 대한 검색 조건을 설정합니다.
      for (let c of idArr) {
        tempObj = {};
        tempObj[sortStandard] = c;
        findQuery["$or"].push(tempObj);
      }
    } else {
      // ID 배열이 유효하지 않은 경우, 오류를 발생시킵니다.
      throw new Error("invalid id arr");
    }

    // SELFMONGOBOO가 false인 경우, 기본 MongoDB 클라이언트를 사용하여 데이터베이스에 연결합니다.
    if (!SELFMONGOBOO) {
      await MONGOLOCALC.connect();
    }

    // limit 옵션이 설정된 경우, 검색 결과의 개수를 제한합니다.
    if (option.limit !== undefined) {
      tong = await MONGOLOCALC.db(`miro81`).collection(collection).find(findQuery).project(projectQuery).sort(sortQuery).limit(Number(option.limit)).toArray();
    } else {
      // limit 옵션이 설정되지 않은 경우, 모든 결과를 가져옵니다.
      tong = await MONGOLOCALC.db(`miro81`).collection(collection).find(findQuery).project(projectQuery).sort(sortQuery).toArray();
    }

    // SELFMONGOBOO가 false인 경우, MongoDB 연결을 종료합니다.
    if (!SELFMONGOBOO) {
      await MONGOLOCALC.close();
    }

    // 검색된 데이터의 ID 배열과 요청된 ID 배열을 비교하여 누락된 데이터가 있는지 확인합니다.
    if (idArr !== null) {
      if (idArr.length !== tong.length) {
        tongIds = [];
        for (let obj of tong) {
          tongIds.push(obj[sortStandard]);
        }
        tongLeft = [];
        for (let id of idArr) {
          if (!tongIds.includes(id)) {
            // 누락된 데이터에 대해 히스토리 항목을 생성합니다.
            if ((new RegExp("^" + idKeywords)).test(id)) {
              tongLeft.push(id);
            }
          }
        }
        for (let id of tongLeft) {
          createQuery = {};
          createQuery[sortStandard] = id;
          await this.createHistory(method, createQuery, option); // 누락된 히스토리 항목 생성
          tong.push(await this.getHistoryById(method, id, option)); // 새로 생성된 항목을 다시 가져옴
        }
      }
    }

    // 특정 프로퍼티만 포함하는 최종 결과를 생성합니다.
    if (tong.length > 0) {
      finalTong = {};
      for (let obj of tong) {
        if (property !== "$all") {
          if (typeof property === "string") {
            finalTong[obj[sortStandard]] = obj[property];
          } else {
            delete obj._id; // MongoDB의 _id 필드는 제외
            finalTong[obj[sortStandard]] = obj;
          }
        } else {
          delete obj._id; // MongoDB의 _id 필드는 제외
          finalTong[obj[sortStandard]] = obj;
        }
      }
      return finalTong;
    } else {
      // 결과가 없으면 null을 반환
      return null;
    }

  } catch (e) {
    // 오류가 발생한 경우, 콘솔에 오류 메시지를 출력합니다.
    console.log(e);
  }
}

/**
 * @method updateHistory
 * @description 고객, 디자이너, 프로젝트, 또는 컨텐츠에 대한 히스토리 데이터를 업데이트하는 메서드입니다. 
 *              히스토리 데이터는 각 대상에 대한 응대 기록과 로그를 포함하는 서브 컬렉션에 저장되며, core data와 연동됩니다.
 * @param {string} method - 업데이트할 대상의 타입을 지정하는 문자열입니다. 예: "client", "designer", "project", "contents".
 * @param {Array<Object>} queryArr - 업데이트할 데이터의 조건(whereQuery)과 업데이트할 내용(updateQuery)을 담은 배열입니다. 배열 길이는 2여야 합니다.
 * @param {Object} option - 설정 옵션 객체입니다.
 * @param {boolean} [option.fromConsole=false] - 콘솔에서 실행 여부를 설정하는 플래그입니다.
 * @param {Object} [option.selfMongo=null] - 사용할 MongoDB 인스턴스입니다. 설정되지 않으면 기본 MongoDB 인스턴스를 사용합니다.
 * @returns {Promise<string>} 업데이트가 성공하면 "success", 실패하면 "fail"을 반환합니다.
 */
BackMaker.prototype.updateHistory = async function (method, queryArr, option = { fromConsole: false, selfMongo: null }) {
  // queryArr의 길이가 2가 아니면 에러를 발생시킵니다. 
  // queryArr에는 whereQuery와 updateQuery 객체가 포함되어야 합니다.
  if (queryArr.length !== 2) {
    throw new Error("invaild arguments : query object must be Array: [ Object: whereQuery, Object: updateQuery ]");
  }

  // BackMaker 인스턴스를 instance 변수에 할당합니다.
  const instance = this;

  // Mother 클래스에서 mongo와 mongoinfo 객체를 가져옵니다.
  // mongo는 MongoDB 클라이언트 객체이며, mongoinfo는 데이터베이스 연결 정보를 담고 있습니다.
  const { mongo, mongoinfo } = this.mother;

  try {
    // MONGOLOCALC는 사용할 MongoDB 클라이언트를 저장하며, SELFMONGOBOO는 selfMongo 옵션이 사용되는지 여부를 나타냅니다.
    let MONGOLOCALC, SELFMONGOBOO;

    // selfMongo 옵션이 설정된 경우, SELFMONGOBOO를 true로 설정하고 MONGOLOCALC에 selfMongo 인스턴스를 할당합니다.
    if (option.selfMongo !== undefined && option.selfMongo !== null) {
      SELFMONGOBOO = true;
      MONGOLOCALC = option.selfMongo;
    } else {
      // selfMongo 옵션이 설정되지 않은 경우, SELFMONGOBOO를 false로 설정하고 MONGOLOCALC에 기본 MongoDB 클라이언트를 할당합니다.
      SELFMONGOBOO = false;
      MONGOLOCALC = new mongo(mongoinfo);
    }

    // queryArr 배열에서 whereQuery와 updateQuery 객체를 추출합니다.
    const [ whereQuery, updateQuery ] = queryArr;
    let collection;

    // updateQuery가 객체 타입이 아니거나 null이면 에러를 발생시킵니다.
    if (typeof updateQuery !== "object" || updateQuery === null) {
      throw new Error("invalid updateQuery");
    }

    // updateQuery에 "null"이라는 키가 있으면 이를 삭제합니다.
    if (updateQuery["null"] !== undefined) {
      delete updateQuery["null"];
    }

    // method 값에 따라 업데이트할 히스토리 컬렉션을 설정합니다.
    if (/client/gi.test(method)) {
      // 고객 히스토리 컬렉션 설정
      collection = "clientHistory";
    } else if (/designer/gi.test(method)) {
      // 디자이너 히스토리 컬렉션 설정
      collection = "designerHistory";
    } else if (/project/gi.test(method)) {
      // 프로젝트 히스토리 컬렉션 설정
      collection = "projectHistory";
    } else if (/contents/gi.test(method)) {
      // 컨텐츠 히스토리 컬렉션 설정
      collection = "contentsHistory";
    } else {
      // method 값이 유효하지 않은 경우, 오류를 발생시킵니다.
      throw new Error("invalid method");
    }

    // SELFMONGOBOO가 false인 경우, 기본 MongoDB 클라이언트를 사용하여 데이터베이스에 연결합니다.
    if (!SELFMONGOBOO) {
      await MONGOLOCALC.connect();
    }

    // whereQuery 조건에 맞는 히스토리 데이터를 updateQuery로 업데이트합니다.
    await MONGOLOCALC.db(`miro81`).collection(collection).updateOne(whereQuery, { $set: updateQuery });

    // SELFMONGOBOO가 false인 경우, MongoDB 연결을 종료합니다.
    if (!SELFMONGOBOO) {
      await MONGOLOCALC.close();
    }

    // 업데이트가 성공적으로 완료되었음을 나타내는 "success" 문자열을 반환합니다.
    return "success";
  } catch (e) {
    // 오류가 발생한 경우, 콘솔에 오류 메시지를 출력하고, "fail" 문자열을 반환합니다.
    console.log(e);
    return "fail";
  }
}

/**
 * @method deleteHistory
 * @description 고객, 디자이너, 프로젝트 또는 컨텐츠의 특정 히스토리 데이터를 삭제하는 메서드입니다. 
 *              히스토리 데이터는 각 대상에 대한 응대 기록과 로그를 포함하는 서브 컬렉션에 저장되며, core data와 연동됩니다.
 * @param {string} method - 삭제할 대상의 타입을 지정하는 문자열입니다. 예: "client", "designer", "project", "contents".
 * @param {string} id - 삭제할 히스토리 데이터의 고유 ID입니다.
 * @param {Object} option - 설정 옵션 객체입니다.
 * @param {boolean} [option.fromConsole=false] - 콘솔에서 실행 여부를 설정하는 플래그입니다.
 * @param {Object} [option.selfMongo=null] - 사용할 MongoDB 인스턴스입니다. 설정되지 않으면 기본 MongoDB 인스턴스를 사용합니다.
 * @returns {Promise<string>} 삭제가 성공하면 "success", 오류 발생 시 오류 메시지를 출력합니다.
 */
BackMaker.prototype.deleteHistory = async function (method, id, option = { fromConsole: false, selfMongo: null }) {
  // BackMaker 인스턴스를 instance 변수에 할당합니다.
  const instance = this;

  // Mother 클래스에서 mongo와 mongoinfo 객체를 가져옵니다.
  // mongo는 MongoDB 클라이언트 객체이며, mongoinfo는 데이터베이스 연결 정보를 담고 있습니다.
  const { mongo, mongoinfo } = this.mother;

  try {
    // MONGOLOCALC는 사용할 MongoDB 클라이언트를 저장하며, SELFMONGOBOO는 selfMongo 옵션이 사용되는지 여부를 나타냅니다.
    let MONGOLOCALC, SELFMONGOBOO;

    // selfMongo 옵션이 설정된 경우, SELFMONGOBOO를 true로 설정하고 MONGOLOCALC에 selfMongo 인스턴스를 할당합니다.
    if (option.selfMongo !== undefined && option.selfMongo !== null) {
      SELFMONGOBOO = true;
      MONGOLOCALC = option.selfMongo;
    } else {
      // selfMongo 옵션이 설정되지 않은 경우, SELFMONGOBOO를 false로 설정하고 MONGOLOCALC에 기본 MongoDB 클라이언트를 할당합니다.
      SELFMONGOBOO = false;
      MONGOLOCALC = new mongo(mongoinfo);
    }

    // 히스토리 데이터를 삭제하기 위한 기준인 sortStandard와 컬렉션 이름을 설정합니다.
    let sortStandard, collection, deleteQuery;

    // method 값에 따라 삭제할 히스토리 컬렉션과 ID 필드(sortStandard)를 설정합니다.
    if (/client/gi.test(method)) {
      // 고객 히스토리 컬렉션 설정
      collection = "clientHistory";
      sortStandard = "cliid";
    } else if (/designer/gi.test(method)) {
      // 디자이너 히스토리 컬렉션 설정
      collection = "designerHistory";
      sortStandard = "desid";
    } else if (/project/gi.test(method)) {
      // 프로젝트 히스토리 컬렉션 설정
      collection = "projectHistory";
      sortStandard = "proid";
    } else if (/contents/gi.test(method)) {
      // 컨텐츠 히스토리 컬렉션 설정
      collection = "contentsHistory";
      sortStandard = "conid";
    } else {
      // method 값이 유효하지 않은 경우, 오류를 발생시킵니다.
      throw new Error("invalid method");
    }

    // 삭제할 히스토리 데이터를 지정하기 위한 쿼리 객체를 생성합니다.
    deleteQuery = {};
    deleteQuery[sortStandard] = id;

    // SELFMONGOBOO가 false인 경우, 기본 MongoDB 클라이언트를 사용하여 데이터베이스에 연결합니다.
    if (!SELFMONGOBOO) {
      await MONGOLOCALC.connect();
    }

    // 지정된 컬렉션에서 deleteQuery에 해당하는 히스토리 데이터를 삭제합니다.
    await MONGOLOCALC.db(`miro81`).collection(collection).deleteOne(deleteQuery);

    // SELFMONGOBOO가 false인 경우, MongoDB 연결을 종료합니다.
    if (!SELFMONGOBOO) {
      await MONGOLOCALC.close();
    }

    // 삭제가 성공적으로 완료되었음을 나타내는 "success" 문자열을 반환합니다.
    return "success";
  } catch (e) {
    // 오류가 발생한 경우, 콘솔에 오류 메시지를 출력합니다.
    console.log(e);
  }
}

/**
 * @method returnHistoryDummies
 * @description 특정 주제(subject)에 대한 히스토리 데이터의 더미(dummy) 객체를 반환하는 메서드입니다. 
 *              이 메서드는 'History' 데이터의 서브 컬렉션에 포함되는 응대 기록과 로그 기록을 관리하기 위해 사용됩니다.
 * @param {string} subject - 더미 데이터를 생성할 히스토리 주제를 나타내는 문자열입니다. 예: "project.purchase.requests", "project.purchase.requests.items".
 * @returns {Object|null} 지정된 주제에 해당하는 더미 객체를 반환하며, 주제가 유효하지 않으면 null을 반환합니다.
 */
BackMaker.prototype.returnHistoryDummies = function (subject) {
  // BackMaker 인스턴스를 instance 변수에 할당합니다.
  const instance = this;

  // dummy 변수를 선언하여 더미 데이터를 저장할 객체를 초기화합니다.
  let dummy;

  // subject 값에 따라 특정 구조의 더미 데이터를 생성합니다.
  if (subject === "project.purchase.requests") {
    // 주제가 "project.purchase.requests"인 경우, 구매 요청에 대한 기본 구조를 가진 더미 객체를 생성합니다.
    dummy = {
      id: "",                        // 구매 요청의 고유 ID
      date: new Date(),              // 구매 요청 날짜 (현재 날짜로 초기화)
      name: "",                      // 구매 요청 이름
      description: "",               // 구매 요청 설명
      items: []                      // 구매 요청 항목들의 배열 (초기 상태는 빈 배열)
    }
  } else if (subject === "project.purchase.requests.items") {
    // 주제가 "project.purchase.requests.items"인 경우, 구매 요청 항목에 대한 기본 구조를 가진 더미 객체를 생성합니다.
    dummy = {
      id: "",                        // 항목의 고유 ID
      name: "",                      // 항목 이름
      description: "",               // 항목 설명
      detail: {                      // 항목 세부 정보 객체
        link: "",                    // 항목의 관련 링크
        location: "",                // 항목의 위치 정보
        option: "",                  // 항목의 옵션 정보
      },
      unit: {                        // 항목의 단위 정보 객체
        ea: null,                    // 단위 수량 (null로 초기화)
        price: 0,                    // 단가 (0으로 초기화)
        number: 0,                   // 총 수량 (0으로 초기화)
      },
      amount: {                      // 금액 정보 객체
        supply: 0,                   // 공급가액 (0으로 초기화)
        vat: 0,                      // 부가가치세 (0으로 초기화)
        consumer: 0,                 // 소비자가 (0으로 초기화)
        delivery: 0,                 // 배송비 (0으로 초기화)
      },
    }
  }

  // 생성된 더미 객체를 반환합니다. 주제가 유효하지 않은 경우, dummy는 undefined가 되며, 이 경우 null을 반환합니다.
  return dummy || null;
}

/**
 * @method createHistory
 * @description 고객(client), 디자이너(designer), 프로젝트(project), 또는 컨텐츠(contents)에 대한 히스토리 데이터를 생성하는 메서드입니다. 
 *              히스토리 데이터는 각 대상의 응대 기록과 로그를 포함하는 서브 컬렉션에 저장되며, core data와 연동됩니다.
 * @param {string} [method="client"] - 생성할 히스토리 데이터의 대상 유형을 지정하는 문자열입니다. 기본값은 "client"입니다. 예: "client", "designer", "project", "contents".
 * @param {Object} [updateQuery={}] - 히스토리 데이터를 생성할 때 사용할 기본 데이터입니다. 각 대상의 고유 ID를 포함합니다.
 * @param {Object} [option={}] - 추가 설정 옵션입니다.
 * @param {boolean} [option.fromConsole=false] - 콘솔에서 실행 여부를 설정하는 플래그입니다.
 * @param {Object} [option.selfMongo=null] - 사용할 MongoDB 인스턴스입니다. 설정되지 않으면 기본 MongoDB 인스턴스를 사용합니다.
 * @param {Object} [option.secondMongo=null] - 추가로 사용할 MongoDB 인스턴스입니다. 프로젝트 매니저를 검색할 때 사용됩니다.
 * @param {boolean} [option.defaultCheckMode=false] - 기본 검사 모드를 활성화할지 여부를 결정합니다. 활성화되면 기본 검사 객체를 반환합니다.
 * @returns {Promise<string|Object>} 생성된 히스토리 데이터의 ID를 반환하거나, 기본 검사 모드가 활성화된 경우 검사 객체를 반환합니다.
 */
BackMaker.prototype.createHistory = async function (method = "client", updateQuery = {}, option = { fromConsole: false, selfMongo: null, secondMongo: null, defaultCheckMode: false }) {
  // BackMaker 인스턴스를 instance 변수에 할당합니다.
  const instance = this;

  // Mother 클래스에서 필요한 유틸리티와 MongoDB 정보를 가져옵니다.
  const { mongo, mongoinfo, objectDeepCopy } = this.mother;

  // 기본 serid와 기본 검사 키, 기본 검사 객체를 정의합니다.
  const defaultSerid = "s2011_aa02s"; // 기본 서비스 ID를 나타냅니다.
  const defaultCheckKey = "curation.check"; // 기본 검사 객체의 키를 정의합니다.
  const defaultCheckObject = {
    serid: defaultSerid, // 서비스 ID
    construct: {
      entire: true, // 전체 구조의 상태를 나타냅니다.
      items: [], // 관련 항목들의 목록을 담는 배열입니다.
      environment: 2, // 환경 설정 값 (예: 1, 2, 3과 같은 숫자 값)
    },
    budget: 5, // 예산 (임의의 숫자 값)
    furniture: [], // 가구 관련 정보 목록
    fabric: [], // 패브릭 관련 정보 목록
    expect: 2, // 예상 결과 (임의의 숫자 값)
    purchase: null, // 구매 관련 정보 (초기값은 null)
    family: null, // 가족 정보 (초기값은 null)
    age: null, // 연령 정보 (초기값은 null)
    time: [], // 시간 관련 정보 목록
  };

  try {
    // MONGOLOCALC는 사용할 MongoDB 클라이언트를 저장하며, SELFMONGOBOO는 selfMongo 옵션이 사용되는지 여부를 나타냅니다.
    let MONGOLOCALC, SELFMONGOBOO;
    let dummy; // 히스토리 데이터 더미 객체를 저장할 변수입니다.
    let sortStandard, collection, whereQuery; // 정렬 기준, 컬렉션 이름, 쿼리 객체를 정의합니다.
    let temp, tempArr; // 임시 변수를 선언합니다.
    let projectManager; // 프로젝트 매니저 정보를 저장할 변수입니다.
    let resultObject; // 결과 객체를 저장할 변수입니다.

    // method가 문자열인지 확인하고, 그렇지 않으면 오류를 발생시킵니다.
    if (typeof method !== "string") {
      throw new Error("invalid method");
    }

    // updateQuery가 객체인지 확인하고, 그렇지 않으면 오류를 발생시킵니다.
    if (typeof updateQuery !== "object" || updateQuery === null) {
      throw new Error("invalid update query");
    }

    // option이 객체인지 확인하고, 그렇지 않으면 오류를 발생시킵니다.
    if (typeof option !== "object" || option === null) {
      throw new Error("invalid option");
    }

    // defaultCheckMode가 활성화된 경우, 기본 검사 객체를 반환합니다.
    if (option.defaultCheckMode === true || option.defaultCheckMode === 1) {
      if (option.keyMode === true || option.keyMode === 1) {
        resultObject = {};
        resultObject[defaultCheckKey] = objectDeepCopy(defaultCheckObject); // 기본 검사 객체의 딥 카피를 생성합니다.
        return resultObject;
      } else {
        return objectDeepCopy(defaultCheckObject); // 기본 검사 객체의 딥 카피를 반환합니다.
      }
    }

    // selfMongo 옵션이 설정된 경우, SELFMONGOBOO를 true로 설정하고 MONGOLOCALC에 selfMongo 인스턴스를 할당합니다.
    if (option.selfMongo !== undefined && option.selfMongo !== null) {
      SELFMONGOBOO = true;
      MONGOLOCALC = option.selfMongo;
    } else {
      // selfMongo 옵션이 설정되지 않은 경우, SELFMONGOBOO를 false로 설정하고 MONGOLOCALC에 기본 MongoDB 클라이언트를 할당합니다.
      SELFMONGOBOO = false;
      MONGOLOCALC = new mongo(mongoinfo);
    }

    // method 값에 따라 히스토리 컬렉션과 정렬 기준, 더미 데이터를 설정합니다.
    if (/client/gi.test(method)) {
      // 고객 히스토리 데이터 설정
      collection = "clientHistory";
      sortStandard = "cliid"; // 고객 ID를 정렬 기준으로 사용합니다.
      dummy = {
        cliid: updateQuery.cliid, // 고객 ID
        history: "", // 고객 히스토리 텍스트
        space: "", // 공간 정보
        construct: "", // 구조 정보
        styling: "", // 스타일링 정보
        budget: "", // 예산 정보
        progress: "", // 진행 상황
        important: false, // 중요한 여부
        issue: "", // 이슈 정보
        manager: "-", // 담당 매니저
        curation: { // 큐레이션 정보
          analytics: {
            page: [], // 페이지 분석 정보
            update: [], // 업데이트 분석 정보
            submit: [], // 제출 분석 정보
            send: [], // 발송 분석 정보
            call: {
              out: [], // 발신 통화 기록
              in: [] // 수신 통화 기록
            },
            full: false // 전체 분석 여부
          },
          style: [], // 스타일 정보
          image: [], // 이미지 정보
          service: {
            serid: [defaultSerid], // 서비스 ID 배열
          },
          building: {
            type: "", // 건물 유형
          },
          furniture: {
            ratio: 50, // 가구 비율
            makeNeeds: {
              furniture: false, // 가구 요구 사항
              fabric: false, // 패브릭 요구 사항
            }
          },
          construct: {
            living: false, // 생활 구조 정보
            items: [] // 관련 항목 목록
          },
          check: objectDeepCopy(defaultCheckObject), // 기본 검사 객체
        }
      };
    } else if (/designer/gi.test(method)) {
      // 디자이너 히스토리 데이터 설정
      collection = "designerHistory";
      sortStandard = "desid"; // 디자이너 ID를 정렬 기준으로 사용합니다.
      dummy = {
        desid: updateQuery.desid, // 디자이너 ID
        important: false, // 중요한 여부
        history: "", // 히스토리 텍스트
        career: "", // 경력 정보
        issue: "", // 이슈 정보
        family: "", // 가족 정보
        partner: "", // 파트너 정보
        craft: "", // 공예 정보
        styling: "", // 스타일링 정보
        reception: "", // 접수 정보
        etc: "", // 기타 정보
        manager: "-", // 담당 매니저
        console: { // 콘솔 관련 정보
          analytics: {
            page: [], // 페이지 분석 정보
            update: [], // 업데이트 분석 정보
            send: [], // 발송 분석 정보
          },
        },
        checklist: { // 체크리스트 관련 정보
          analytics: {
            page: [], // 페이지 분석 정보
            update: [], // 업데이트 분석 정보
            send: [], // 발송 분석 정보
          },
        },
        report: { // 보고서 관련 정보
          analytics: {
            page: [], // 페이지 분석 정보
            update: [], // 업데이트 분석 정보
            send: [], // 발송 분석 정보
          },
        },
        request: { // 요청 관련 정보
          analytics: {
            page: [], // 페이지 분석 정보
            send: [], // 발송 분석 정보
          }
        },
        possible: { // 가능성 관련 정보
          analytics: {
            page: [], // 페이지 분석 정보
            update: [], // 업데이트 분석 정보
            send: [], // 발송 분석 정보
          },
        },
        project: { // 프로젝트 관련 정보
          analytics: {
            page: [], // 페이지 분석 정보
            update: [], // 업데이트 분석 정보
            send: [], // 발송 분석 정보
          },
        },
        schedule: { // 일정 관련 정보
          analytics: {
            page: [], // 페이지 분석 정보
            update: [], // 업데이트 분석 정보
            send: [], // 발송 분석 정보
          },
        },
      };
    } else if (/project/gi.test(method)) {
      // 프로젝트 히스토리 데이터 설정
      collection = "projectHistory";
      sortStandard = "proid"; // 프로젝트 ID를 정렬 기준으로 사용합니다.
      projectManager = '-'; // 기본 프로젝트 매니저를 설정합니다.

      // 프로젝트 매니저 정보 설정 (옵션에 따라 secondMongo에서 가져올 수 있음)
      if (SELFMONGOBOO) {
        if (option.secondMongo !== undefined && option.secondMongo !== null) {
          temp = await this.getProjectById(updateQuery.proid, { selfMongo: option.secondMongo });
          if (temp !== null) {
            if (/^d/.test(temp)) {
              tempArr = await MONGOLOCALC.db("miro81").collection("designerHistory").find({ desid: temp.desid }).toArray();
              if (tempArr.length > 0) {
                projectManager = tempArr[0].manager;
              }
            }
          }
        }
      }

      dummy = {
        proid: updateQuery.proid, // 프로젝트 ID
        history: "", // 프로젝트 히스토리 텍스트
        designer: "", // 디자이너 정보
        client: "", // 고객 정보
        photo: "", // 사진 정보
        contents: { // 컨텐츠 정보
          blog: {
            portfolio: {
              boo: false, // 포트폴리오 여부
              date: new Date(1800, 0, 1), // 포트폴리오 날짜 (기본값: 1800년 1월 1일)
              link: "", // 포트폴리오 링크
            },
            review: {
              boo: false, // 리뷰 여부
              date: new Date(1800, 0, 1), // 리뷰 날짜 (기본값: 1800년 1월 1일)
              link: "", // 리뷰 링크
            }
          },
          instagram: {
            portfolio: {
              boo: false, // 포트폴리오 여부
              date: new Date(1800, 0, 1), // 포트폴리오 날짜 (기본값: 1800년 1월 1일)
              link: "", // 포트폴리오 링크
            },
            review: {
              boo: false, // 리뷰 여부
              date: new Date(1800, 0, 1), // 리뷰 날짜 (기본값: 1800년 1월 1일)
              link: "", // 리뷰 링크
            }
          }
        },
        important: false, // 중요한 여부
        issue: "", // 이슈 정보
        request: { // 요청 관련 정보
          analytics: {
            make: [], // 생성된 분석 정보
            page: [], // 페이지 분석 정보
            update: [], // 업데이트 분석 정보
            send: [], // 발송 분석 정보
          },
          client: {
            name: "", // 고객 이름
            phone: "", // 고객 전화번호
            family: "", // 고객 가족 정보
            address: "", // 고객 주소
            budget: "", // 고객 예산
            etc: "", // 기타 정보
          },
          space: {
            contract: "", // 계약 정보
            precheck: "", // 사전 검사 정보
            empty: "", // 빈 공간 정보
            movein: "", // 입주 정보
            special: "", // 특별 요구 사항
            composition: "", // 공간 구성
          },
          service: {
            service: "", // 서비스 정보
            concept: "", // 개념 정보
            construct: "", // 구조 정보
            styling: "" // 스타일링 정보
          },
          about: {
            when: [], // 시점 정보
            where: [], // 위치 정보
            site: [], // 사이트 정보
            construct: [], // 구조 정보
            styling: [], // 스타일링 정보
            budget: [], // 예산 정보
            progress: [], // 진행 상황
          }
        },
        construct: { // 구조 관련 정보
          name: "", // 이름
          address: "", // 주소
          payments: {
            first: {
              date: new Date(1800, 0, 1), // 첫 번째 결제 날짜
              etc: "", // 기타 정보
            },
            start: {
              date: new Date(1800, 0, 1), // 시작 결제 날짜
              etc: "", // 기타 정보
            },
            middle: {
              date: new Date(1800, 0, 1), // 중간 결제 날짜
              etc: "", // 기타 정보
            },
            remain: {
              date: new Date(1800, 0, 1), // 남은 결제 날짜
              etc: "", // 기타 정보
            },
          }
        },
        schedule: { // 일정 관련 정보
          analytics: {
            make: [], // 생성된 분석 정보
            page: [], // 페이지 분석 정보
            update: [], // 업데이트 분석 정보
            send: [], // 발송 분석 정보
          },
          progress: {
            start: new Date(1800, 0, 1), // 시작 날짜
            complete: new Date(1800, 0, 1), // 완료 날짜
            send: new Date(1800, 0, 1), // 발송 날짜
          },
          contents: {
            title: "", // 컨텐츠 제목
            description: "", // 컨텐츠 설명
            color: "", // 컨텐츠 색상
          },
          date: {
            start: new Date(1800, 0, 1), // 시작 날짜
            end: new Date(1800, 0, 1), // 종료 날짜
          },
          children: [] // 자식 일정 정보
        },
        purchase: { // 구매 관련 정보
          analytics: {
            make: [], // 생성된 분석 정보
            page: [], // 페이지 분석 정보
            update: [], // 업데이트 분석 정보
            send: [], // 발송 분석 정보
          },
          date: new Date(1800, 0, 1), // 구매 날짜
          requests: [] // 구매 요청 목록
        },
        manager: projectManager // 프로젝트 매니저 정보
      };
    } else if (/contents/gi.test(method)) {
      // 컨텐츠 히스토리 데이터 설정
      collection = "contentsHistory";
      sortStandard = "conid"; // 컨텐츠 ID를 정렬 기준으로 사용합니다.
      dummy = {
        conid: updateQuery.conid, // 컨텐츠 ID
        important: false, // 중요한 여부
        issue: "", // 이슈 정보
        manager: "-" // 담당 매니저
      };
    } else {
      // method 값이 유효하지 않은 경우, 오류를 발생시킵니다.
      throw new Error("invalid method");
    }

    // SELFMONGOBOO가 false인 경우, 기본 MongoDB 클라이언트를 사용하여 데이터베이스에 연결합니다.
    if (!SELFMONGOBOO) {
      await MONGOLOCALC.connect();
    }

    // 설정된 컬렉션에 히스토리 더미 데이터를 삽입합니다.
    await MONGOLOCALC.db(`miro81`).collection(collection).insertOne(dummy);

    // SELFMONGOBOO가 false인 경우, MongoDB 연결을 종료합니다.
    if (!SELFMONGOBOO) {
      await MONGOLOCALC.close();
    }

    // whereQuery 객체를 생성하여 업데이트할 히스토리 데이터를 지정합니다.
    whereQuery = {};
    whereQuery[sortStandard] = updateQuery[sortStandard];

    // 히스토리 데이터를 업데이트합니다.
    await this.updateHistory(method, [whereQuery, updateQuery], option);

    // 생성된 히스토리 데이터의 ID를 반환합니다.
    return updateQuery[sortStandard];
  } catch (e) {
    // 오류가 발생한 경우, 콘솔에 오류 메시지를 출력합니다.
    console.log(e);
  }
}

// general mongo CRUD  --------------------------------------------------------------------

/**
 * @method mongoCreate
 * @description MongoDB의 특정 컬렉션에 새로운 문서를 생성하기 위한 메서드입니다. 이 메서드는 JSON 객체를 받아 MongoDB에 삽입하며,
 *              옵션에 따라 JSON 객체 내의 JavaScript 함수를 인코딩하여 저장할 수 있습니다.
 * @param {string} collection - MongoDB 컬렉션의 이름을 지정하는 문자열입니다.
 * @param {Object} json - MongoDB에 삽입할 JSON 객체입니다. 이 객체 내에 JavaScript 함수가 포함된 경우, hexaJson 메서드를 통해 해당 함수가 인코딩될 수 있습니다.
 * @param {Object} [option={}] - 추가 옵션을 설정하는 객체입니다.
 * @param {Object} [option.selfMongo=null] - 사용자가 지정한 MongoDB 인스턴스입니다. 기본적으로 설정되지 않으면 내부적으로 생성된 MongoDB 인스턴스를 사용합니다.
 * @param {boolean} [option.hexaMode=false] - JSON 객체 내의 JavaScript 함수를 인코딩할지 여부를 결정합니다.
 * @returns {Promise<string>} 성공 시 "success" 문자열을 반환하며, 실패 시 "fail"을 반환합니다.
 */
BackMaker.prototype.mongoCreate = async function (collection, json, option = { selfMongo: null }) {
  // BackMaker 인스턴스를 instance 변수에 할당합니다.
  const instance = this;

  // Mother 클래스에서 필요한 MongoDB 유틸리티와 hexaJson 메서드를 가져옵니다.
  // hexaJson은 JSON 객체 내에 포함된 JavaScript 함수를 인코딩하거나 복호화할 때 사용됩니다.
  const { mongo, mongoinfo, hexaJson } = this.mother;

  try {
    // MONGOC 변수는 사용할 MongoDB 클라이언트를 저장할 변수입니다.
    let MONGOC;

    // selfMongo 옵션이 설정되지 않은 경우, 내부적으로 MongoDB 클라이언트를 생성합니다.
    if (option.selfMongo === undefined || option.selfMongo === null) {
      // Mother에서 제공한 mongoinfo를 사용하여 새로운 MongoDB 클라이언트를 생성합니다.
      MONGOC = new mongo(mongoinfo);
      // MongoDB에 연결합니다.
      await MONGOC.connect();

      // hexaMode가 true로 설정된 경우, JSON 객체 내의 JavaScript 함수를 인코딩합니다.
      // 이는 데이터베이스에 함수를 안전하게 저장하기 위해 필요합니다.
      if (option.hexaMode === true) {
        json = await hexaJson(json, true);
      }

      // 인코딩된 JSON 객체를 지정된 컬렉션에 삽입합니다.
      await MONGOC.db(`miro81`).collection(collection).insertOne(json);

      // 작업이 완료되면 MongoDB 연결을 닫습니다.
      await MONGOC.close();
    } else {
      // selfMongo 옵션이 설정된 경우, 해당 MongoDB 인스턴스를 사용하여 작업을 수행합니다.
      if (option.hexaMode === true) {
        json = await hexaJson(json, true); // JSON 객체 내의 JavaScript 함수를 인코딩합니다.
      }

      // 제공된 MongoDB 인스턴스를 사용하여 JSON 객체를 삽입합니다.
      await option.selfMongo.db(`miro81`).collection(collection).insertOne(json);
    }

    // 작업이 성공적으로 완료되면 "success"를 반환합니다.
    return "success";
  } catch (e) {
    // 작업 중 오류가 발생하면 오류 메시지를 콘솔에 출력하고 "fail"을 반환합니다.
    console.log(e);
    return "fail";
  }
}

/**
 * @method mongoRead
 * @description MongoDB의 특정 컬렉션에서 문서를 조회하기 위한 메서드입니다. 이 메서드는 조회 조건과 옵션을 받아
 *              MongoDB에서 데이터를 검색하고, 필요에 따라 결과 데이터를 인코딩할 수 있습니다.
 * @param {string} collection - MongoDB 컬렉션의 이름을 지정하는 문자열입니다.
 * @param {Object} query - MongoDB에서 데이터를 검색하기 위한 조회 조건을 담은 객체입니다.
 * @param {Object} [option={}] - 추가 옵션을 설정하는 객체입니다.
 * @param {Object} [option.selfMongo=null] - 사용자가 지정한 MongoDB 인스턴스입니다. 설정되지 않으면 내부적으로 생성된 MongoDB 인스턴스를 사용합니다.
 * @param {Object} [option.sort=null] - 데이터를 정렬하기 위한 정렬 조건입니다.
 * @param {Object} [option.sortQuery=null] - 정렬 조건이 따로 지정되지 않은 경우 사용할 정렬 조건입니다.
 * @param {number} [option.limit=null] - 검색된 데이터의 결과 수를 제한하기 위한 값입니다.
 * @param {boolean} [option.hexaMode=false] - hexaJson 메서드를 사용하여 조회된 데이터를 인코딩할지 여부를 결정합니다.
 * @returns {Promise<Array>} 검색된 문서의 배열을 반환합니다. 실패 시 빈 배열을 반환합니다.
 */
BackMaker.prototype.mongoRead = async function (collection, query, option = { selfMongo: null }) {
  // BackMaker 인스턴스를 instance 변수에 할당합니다.
  const instance = this;

  // Mother 클래스에서 필요한 MongoDB 유틸리티와 hexaJson 메서드를 가져옵니다.
  // hexaJson은 JSON 객체 내에 포함된 JavaScript 함수를 인코딩하거나 복호화할 때 사용됩니다.
  const { mongo, mongoinfo, hexaJson } = this.mother;

  try {
    // MONGOC 변수는 사용할 MongoDB 클라이언트를 저장할 변수입니다.
    let MONGOC;
    // tong 변수는 MongoDB에서 조회된 결과를 저장할 배열입니다.
    let tong;
    // sortQuery 변수는 정렬 조건을 저장합니다.
    let sortQuery;

    // sort 옵션이 지정되지 않은 경우, sortQuery를 확인하여 정렬 조건을 설정합니다.
    if (option.sort === undefined) {
      sortQuery = null; // 기본적으로 정렬 조건을 null로 설정
      if (option.sortQuery === undefined) {
        sortQuery = null; // sortQuery가 설정되지 않은 경우 null 유지
      } else {
        sortQuery = option.sortQuery; // sortQuery가 설정된 경우 이를 사용
      }
    } else {
      sortQuery = option.sort; // sort 옵션이 설정된 경우 이를 사용
    }

    // selfMongo 옵션이 설정되지 않은 경우, 내부적으로 MongoDB 클라이언트를 생성하여 사용합니다.
    if (option.selfMongo === undefined || option.selfMongo === null) {
      // Mother에서 제공한 mongoinfo를 사용하여 새로운 MongoDB 클라이언트를 생성합니다.
      MONGOC = new mongo(mongoinfo);
      // MongoDB에 연결합니다.
      await MONGOC.connect();

      // sortQuery가 null인 경우, 데이터를 정렬하지 않고 검색합니다.
      if (sortQuery === null) {
        if (option.limit !== undefined && option.limit !== null) {
          // limit 옵션이 설정된 경우, 검색된 결과 수를 제한합니다.
          tong = await MONGOC.db(`miro81`).collection(collection).find(query).limit(Number(option.limit)).toArray();
        } else {
          // limit 옵션이 설정되지 않은 경우, 전체 데이터를 검색합니다.
          tong = await MONGOC.db(`miro81`).collection(collection).find(query).toArray();
        }
      } else {
        // sortQuery가 설정된 경우, 해당 정렬 조건에 따라 데이터를 검색합니다.
        if (option.limit !== undefined && option.limit !== null) {
          tong = await MONGOC.db(`miro81`).collection(collection).find(query).sort(sortQuery).limit(Number(option.limit)).toArray();
        } else {
          tong = await MONGOC.db(`miro81`).collection(collection).find(query).sort(sortQuery).toArray();
        }
      }

      // 작업이 완료되면 MongoDB 연결을 닫습니다.
      await MONGOC.close();
    } else {
      // selfMongo 옵션이 설정된 경우, 해당 MongoDB 인스턴스를 사용하여 작업을 수행합니다.
      if (sortQuery === null) {
        if (option.limit !== undefined && option.limit !== null) {
          tong = await option.selfMongo.db(`miro81`).collection(collection).find(query).limit(Number(option.limit)).toArray();
        } else {
          tong = await option.selfMongo.db(`miro81`).collection(collection).find(query).toArray();
        }
      } else {
        if (option.limit !== undefined && option.limit !== null) {
          tong = await option.selfMongo.db(`miro81`).collection(collection).find(query).sort(sortQuery).limit(Number(option.limit)).toArray();
        } else {
          tong = await option.selfMongo.db(`miro81`).collection(collection).find(query).sort(sortQuery).toArray();
        }
      }
    }

    // hexaMode가 true로 설정된 경우, 조회된 데이터를 hexaJson 메서드를 통해 인코딩합니다.
    if (option.hexaMode === true) {
      tong = await hexaJson(JSON.stringify(tong)); // 데이터를 문자열로 변환한 후 인코딩
    }

    // 조회된 결과 데이터를 반환합니다.
    return tong;
  } catch (e) {
    // 작업 중 오류가 발생하면, 오류 메시지를 콘솔에 출력하고 빈 배열을 반환합니다.
    console.log(e);
    return [];
  }
}

/**
 * @method mongoPick
 * @description MongoDB의 특정 컬렉션에서 필요한 속성들만 선택하여 문서를 조회하기 위한 메서드입니다. 이 메서드는 조회 조건과 프로젝션을 받아,
 *              필요한 속성만을 선택하여 데이터를 검색합니다. 
 *              이는 전체 데이터를 가져오는 `mongoRead`와 달리 필요한 필드만 선택하여 효율적으로 데이터를 조회할 수 있는 방식입니다.
 *              `mongoPick`과 `mongoRead`의 차이점:
 *              `mongoRead`는 해당 컬렉션에서 문서를 통째로 가져오는 메서드입니다. 모든 필드를 포함한 전체 문서를 반환하기 때문에,
 *              데이터의 양이 많아질수록 성능에 영향을 미칠 수 있습니다.
 *              반면, `mongoPick`은 필요한 속성들만 선택하여 가져오는 메서드로, 불필요한 데이터를 제외하고 필요한 정보만을 선택하여 조회할 수 있습니다.
 *              이를 통해 데이터 전송량을 줄이고 성능을 최적화할 수 있습니다. 
 *              일반적으로 `mongoPick`이 더 효율적이고 권장됩니다.
 * @param {string} collection - MongoDB 컬렉션의 이름을 지정하는 문자열입니다.
 * @param {Array<Object>} queryArr - 첫 번째 객체는 검색 조건을, 두 번째 객체는 필요한 속성을 정의하는 프로젝션 객체입니다. 
 *                                   배열 형식이며, 첫 번째 요소는 `whereQuery`, 두 번째 요소는 `projectQuery`입니다.
 * @param {Object} [option={}] - 추가 옵션을 설정하는 객체입니다.
 * @param {Object} [option.selfMongo=null] - 사용자가 지정한 MongoDB 인스턴스입니다. 설정되지 않으면 내부적으로 생성된 MongoDB 인스턴스를 사용합니다.
 * @param {Object} [option.sort=null] - 데이터를 정렬하기 위한 정렬 조건입니다.
 * @param {Object} [option.sortQuery=null] - 정렬 조건이 따로 지정되지 않은 경우 사용할 정렬 조건입니다.
 * @param {number} [option.limit=null] - 검색된 데이터의 결과 수를 제한하기 위한 값입니다.
 * @param {boolean} [option.hexaMode=false] - hexaJson 메서드를 사용하여 조회된 데이터를 인코딩할지 여부를 결정합니다.
 * @returns {Promise<Array>} 검색된 문서의 배열을 반환합니다. 실패 시 빈 배열을 반환합니다.
 */
BackMaker.prototype.mongoPick = async function (collection, queryArr, option = { selfMongo: null }) {
  // BackMaker 인스턴스를 instance 변수에 할당합니다.
  const instance = this;

  // Mother 클래스에서 필요한 MongoDB 유틸리티와 hexaJson 메서드를 가져옵니다.
  // hexaJson은 JSON 객체 내에 포함된 JavaScript 함수를 인코딩하거나 복호화할 때 사용됩니다.
  const { mongo, mongoinfo, hexaJson } = this.mother;

  try {
    // MONGOC 변수는 사용할 MongoDB 클라이언트를 저장할 변수입니다.
    let MONGOC;
    // tong 변수는 MongoDB에서 조회된 결과를 저장할 배열입니다.
    let tong;
    // sortQuery 변수는 정렬 조건을 저장합니다.
    let sortQuery;

    // sort 옵션이 지정되지 않은 경우, sortQuery를 확인하여 정렬 조건을 설정합니다.
    if (option.sort === undefined) {
      sortQuery = null; // 기본적으로 정렬 조건을 null로 설정
      if (option.sortQuery === undefined) {
        sortQuery = null; // sortQuery가 설정되지 않은 경우 null 유지
      } else {
        sortQuery = option.sortQuery; // sortQuery가 설정된 경우 이를 사용
      }
    } else {
      sortQuery = option.sort; // sort 옵션이 설정된 경우 이를 사용
    }

    // queryArr가 배열인지 확인하고, 배열이 아니면 오류를 발생시킵니다.
    if (!Array.isArray(queryArr)) {
      throw new Error("queryArr는 [ whereQuery, projectQuery ] 형식의 배열이어야 합니다.");
    }
    // queryArr의 모든 요소가 객체인지 확인하고, 객체가 아닌 경우 오류를 발생시킵니다.
    if (!queryArr.every((o) => { return (typeof o === "object" && o !== null) })) {
      throw new Error("queryArr의 모든 요소는 객체이어야 합니다.");
    }
    // queryArr의 길이가 2가 아니면 오류를 발생시킵니다.
    if (queryArr.length !== 2) {
      throw new Error("queryArr는 [ whereQuery, projectQuery ] 형식의 배열이어야 합니다.");
    }

    // projectQuery에 "_id" 필드를 0으로 설정하여 기본적으로 MongoDB의 _id 필드를 제외시킵니다.
    queryArr[1]["_id"] = 0;

    // selfMongo 옵션이 설정되지 않은 경우, 내부적으로 MongoDB 클라이언트를 생성하여 사용합니다.
    if (option.selfMongo === undefined || option.selfMongo === null) {
      // Mother에서 제공한 mongoinfo를 사용하여 새로운 MongoDB 클라이언트를 생성합니다.
      MONGOC = new mongo(mongoinfo);
      // MongoDB에 연결합니다.
      await MONGOC.connect();

      // sortQuery가 null인 경우, 데이터를 정렬하지 않고 검색합니다.
      if (sortQuery === null) {
        if (option.limit !== undefined && option.limit !== null) {
          // limit 옵션이 설정된 경우, 검색된 결과 수를 제한합니다.
          tong = await MONGOC.db(`miro81`).collection(collection).find(queryArr[0]).project(queryArr[1]).limit(Number(option.limit)).toArray();
        } else {
          // limit 옵션이 설정되지 않은 경우, 전체 데이터를 검색합니다.
          tong = await MONGOC.db(`miro81`).collection(collection).find(queryArr[0]).project(queryArr[1]).toArray();
        }
      } else {
        // sortQuery가 설정된 경우, 해당 정렬 조건에 따라 데이터를 검색합니다.
        if (option.limit !== undefined && option.limit !== null) {
          tong = await MONGOC.db(`miro81`).collection(collection).find(queryArr[0]).project(queryArr[1]).sort(sortQuery).limit(Number(option.limit)).toArray();
        } else {
          tong = await MONGOC.db(`miro81`).collection(collection).find(queryArr[0]).project(queryArr[1]).sort(sortQuery).toArray();
        }
      }

      // 작업이 완료되면 MongoDB 연결을 닫습니다.
      await MONGOC.close();
    } else {
      // selfMongo 옵션이 설정된 경우, 해당 MongoDB 인스턴스를 사용하여 작업을 수행합니다.
      if (sortQuery === null) {
        if (option.limit !== undefined && option.limit !== null) {
          tong = await option.selfMongo.db(`miro81`).collection(collection).find(queryArr[0]).project(queryArr[1]).limit(Number(option.limit)).toArray();
        } else {
          tong = await option.selfMongo.db(`miro81`).collection(collection).find(queryArr[0]).project(queryArr[1]).toArray();
        }
      } else {
        if (option.limit !== undefined && option.limit !== null) {
          tong = await option.selfMongo.db(`miro81`).collection(collection).find(queryArr[0]).project(queryArr[1]).sort(sortQuery).limit(Number(option.limit)).toArray();
        } else {
          tong = await option.selfMongo.db(`miro81`).collection(collection).find(queryArr[0]).project(queryArr[1]).sort(sortQuery).toArray();
        }
      }
    }

    // hexaMode가 true로 설정된 경우, 조회된 데이터를 hexaJson 메서드를 통해 인코딩합니다.
    if (option.hexaMode === true) {
      tong = await hexaJson(JSON.stringify(tong)); // 데이터를 문자열로 변환한 후 인코딩
    }

    // 조회된 결과 데이터를 반환합니다.
    return tong;
  } catch (e) {
    // 작업 중 오류가 발생하면, 오류 메시지를 콘솔에 출력하고 빈 배열을 반환합니다.
    console.log(e);
    return [];
  }
}

/**
 * @method mongoUpdate
 * @description 이 메서드는 MongoDB의 특정 컬렉션에서 문서를 업데이트하기 위해 사용됩니다. `whereQuery`로 문서를 찾고, `updateQuery`로
 *              해당 문서를 업데이트합니다. 또한, `unset` 옵션을 통해 필드를 제거할 수 있습니다. `hexaJson`과 같은 Mother의 유틸리티 메서드를
 *              사용하는 경우, 데이터를 인코딩 또는 디코딩하여 저장할 수 있습니다.
 *              `mongoUpdate`는 MongoDB의 문서를 업데이트하기 위한 메서드로, 데이터베이스에서 특정 조건에 맞는 문서를 찾아 
 *              그 내용을 변경하거나, 경우에 따라 필드를 제거할 수 있는 기능을 제공합니다. 
 *              이 메서드에서는 `hexaJson`과 같은 Mother의 유틸리티 메서드를 사용하여 
 *              JSON 객체 내의 JavaScript 함수를 인코딩하거나 복호화할 수 있습니다. 
 *              이는 복잡한 데이터 구조를 안전하게 저장할 수 있도록 도와줍니다.
 * @param {string} collection - MongoDB 컬렉션의 이름을 지정하는 문자열입니다.
 * @param {Array<Object>} queryArr - 첫 번째 객체는 업데이트할 문서를 찾기 위한 `whereQuery`, 두 번째 객체는 문서 업데이트를 위한 `updateQuery`입니다.
 * @param {Object} [option={}] - 추가 옵션을 설정하는 객체입니다.
 * @param {Object} [option.selfMongo=null] - 사용자가 지정한 MongoDB 인스턴스입니다. 설정되지 않으면 내부적으로 생성된 MongoDB 인스턴스를 사용합니다.
 * @param {boolean} [option.unset=false] - true로 설정하면 필드를 제거하는 `$unset` 연산자를 사용합니다.
 * @returns {Promise<string>} 작업의 성공 여부에 따라 "success" 또는 "fail"을 반환합니다.
 */

BackMaker.prototype.mongoUpdate = async function (collection, queryArr, option = { selfMongo: null, unset: false }) {
  // BackMaker 인스턴스를 instance 변수에 할당합니다.
  const instance = this;

  // Mother 클래스에서 필요한 MongoDB 유틸리티를 가져옵니다.
  const { mongo, mongoinfo } = this.mother;

  try {
    // queryArr 배열에서 whereQuery와 updateQuery를 추출합니다.
    const [ whereQuery, updateQuery ] = queryArr;

    // MONGOC 변수는 사용할 MongoDB 클라이언트를 저장할 변수입니다.
    let MONGOC;

    // unsetBoo는 $unset 연산자를 사용할지 여부를 결정하는 부울 값입니다.
    let unsetBoo;

    // unset 옵션에 따라 unsetBoo를 설정합니다. 기본값은 false입니다.
    if (option.unset === null || option.unset === false || option.unset === undefined) {
      unsetBoo = false;
    } else if (option.unset === true) {
      unsetBoo = true;
    }

    // 최종적으로 사용할 업데이트 객체를 finalUpdateObj에 저장합니다.
    finalUpdateObj = {};
    if (!unsetBoo) {
      // unsetBoo가 false인 경우, $set 연산자를 사용하여 필드를 업데이트합니다.
      finalUpdateObj["$set"] = updateQuery;
    } else {
      // unsetBoo가 true인 경우, $unset 연산자를 사용하여 필드를 제거합니다.
      finalUpdateObj["$unset"] = updateQuery;
    }

    // selfMongo 옵션이 설정되지 않은 경우, 내부적으로 MongoDB 클라이언트를 생성하여 사용합니다.
    if (option.selfMongo === undefined || option.selfMongo === null) {
      // Mother에서 제공한 mongoinfo를 사용하여 새로운 MongoDB 클라이언트를 생성합니다.
      MONGOC = new mongo(mongoinfo);

      // MongoDB에 연결합니다.
      await MONGOC.connect();

      // MongoDB의 해당 컬렉션에서 whereQuery에 맞는 문서를 finalUpdateObj로 업데이트합니다.
      await MONGOC.db(`miro81`).collection(collection).updateOne(whereQuery, finalUpdateObj);

      // 작업이 완료되면 MongoDB 연결을 닫습니다.
      await MONGOC.close();
    } else {
      // selfMongo 옵션이 설정된 경우, 해당 MongoDB 인스턴스를 사용하여 작업을 수행합니다.
      await option.selfMongo.db(`miro81`).collection(collection).updateOne(whereQuery, finalUpdateObj);
    }

    // 작업이 성공적으로 완료되면 "success"를 반환합니다.
    return "success";
  } catch (e) {
    // 작업 중 오류가 발생하면, 오류 메시지를 콘솔에 출력하고 "fail"을 반환합니다.
    console.log(e);
    return "fail";
  }
}

/**
 * @method mongoDelete
 * @description 이 메서드는 MongoDB에서 특정 문서를 삭제하기 위해 사용됩니다. 컬렉션에서 `query`에 해당하는 문서를 찾아 삭제합니다. 
 *              이 과정에서 `hexaJson`과 같은 Mother의 유틸리티 메서드가 데이터의 보안을 위해 활용될 수 있습니다. 
 *              일반적으로, 삭제 작업은 신중하게 수행되어야 하며, 이 메서드는 필요한 경우 MongoDB 인스턴스를 재사용할 수 있도록
 *              `selfMongo` 옵션을 제공합니다. 작업이 성공적으로 완료되면 "success"를 반환하고, 오류가 발생하면 "fail"을 반환합니다.
 * @param {string} collection - MongoDB 컬렉션의 이름을 나타냅니다.
 * @param {Object} query - 삭제할 문서를 찾기 위한 조건을 담은 객체입니다.
 * @param {Object} [option={}] - 추가 옵션을 설정하는 객체입니다.
 * @param {Object} [option.selfMongo=null] - 사용자가 지정한 MongoDB 인스턴스를 사용합니다. 설정되지 않으면 내부적으로 생성된 MongoDB 인스턴스를 사용합니다.
 * @returns {Promise<string>} 작업의 성공 여부에 따라 "success" 또는 "fail"을 반환합니다.
 */

BackMaker.prototype.mongoDelete = async function (collection, query, option = { selfMongo: null }) {
  // BackMaker 인스턴스를 instance 변수에 할당합니다.
  const instance = this;

  // Mother 클래스에서 필요한 MongoDB 유틸리티를 가져옵니다.
  const { mongo, mongoinfo } = this.mother;

  try {
    // MONGOC 변수는 사용할 MongoDB 클라이언트를 저장할 변수입니다.
    let MONGOC;

    // selfMongo 옵션이 설정되지 않은 경우, 내부적으로 MongoDB 클라이언트를 생성하여 사용합니다.
    if (option.selfMongo === undefined || option.selfMongo === null) {
      // Mother에서 제공한 mongoinfo를 사용하여 새로운 MongoDB 클라이언트를 생성합니다.
      MONGOC = new mongo(mongoinfo);

      // MongoDB에 연결합니다.
      await MONGOC.connect();

      // MongoDB의 해당 컬렉션에서 query에 맞는 문서를 삭제합니다.
      await MONGOC.db(`miro81`).collection(collection).deleteOne(query);

      // 작업이 완료되면 MongoDB 연결을 닫습니다.
      await MONGOC.close();
    } else {
      // selfMongo 옵션이 설정된 경우, 해당 MongoDB 인스턴스를 사용하여 작업을 수행합니다.
      await option.selfMongo.db(`miro81`).collection(collection).deleteOne(query);
    }

    // 작업이 성공적으로 완료되면 "success"를 반환합니다.
    return "success";
  } catch (e) {
    // 작업 중 오류가 발생하면, 오류 메시지를 콘솔에 출력하고 "fail"을 반환합니다.
    console.log(e);
    return "fail";
  }
}

/**
 * @method mongoListCollections
 * @description 이 메서드는 MongoDB 데이터베이스 내의 모든 컬렉션 이름을 목록으로 반환합니다. 주어진 데이터베이스에 있는 모든 컬렉션의 이름을 가져오기 위해 사용되며, `selfMongo` 옵션이 설정된 경우 이를 통해 외부에서 지정된 MongoDB 인스턴스를 사용할 수 있습니다. 만약 `selfMongo` 옵션이 설정되지 않은 경우, 내부적으로 `mongo` 인스턴스를 생성하여 사용합니다. 이 메서드는 Mother의 MongoDB 연결 유틸리티를 사용하며, 연결 후 데이터를 가져온 뒤 연결을 닫습니다. 오류 발생 시 빈 배열을 반환합니다.
 * @param {Object} [option={}] - 추가 옵션을 설정하는 객체입니다.
 * @param {Object} [option.selfMongo=null] - 사용자가 지정한 MongoDB 인스턴스를 사용합니다. 설정되지 않으면 내부적으로 생성된 MongoDB 인스턴스를 사용합니다.
 * @returns {Promise<string[]>} - 데이터베이스 내의 모든 컬렉션 이름을 담은 배열을 반환합니다.
 */

BackMaker.prototype.mongoListCollections = async function (option = { selfMongo: null }) {
  // BackMaker 인스턴스를 instance 변수에 할당합니다.
  const instance = this;

  // Mother 클래스에서 필요한 MongoDB 유틸리티를 가져옵니다.
  const { mongo, mongoinfo } = this.mother;

  try {
    // MONGOC 변수는 사용할 MongoDB 클라이언트를 저장할 변수입니다.
    let MONGOC, allCollections_raw, allCollections;

    // selfMongo 옵션이 설정되지 않은 경우, 내부적으로 MongoDB 클라이언트를 생성하여 사용합니다.
    if (option.selfMongo === undefined || option.selfMongo === null) {
      // Mother에서 제공한 mongoinfo를 사용하여 새로운 MongoDB 클라이언트를 생성합니다.
      MONGOC = new mongo(mongoinfo);

      // MongoDB에 연결합니다.
      await MONGOC.connect();

      // MongoDB의 데이터베이스에서 모든 컬렉션의 목록을 가져옵니다.
      allCollections_raw = await MONGOC.db(`miro81`).listCollections().toArray();

      // 작업이 완료되면 MongoDB 연결을 닫습니다.
      await MONGOC.close();
    } else {
      // selfMongo 옵션이 설정된 경우, 해당 MongoDB 인스턴스를 사용하여 작업을 수행합니다.
      allCollections_raw = await option.selfMongo.db(`miro81`).listCollections().toArray();
    }

    // 모든 컬렉션 이름을 배열에 저장합니다.
    allCollections = [];
    for (let { name } of allCollections_raw) {
      allCollections.push(name);
    }

    // 모든 컬렉션 이름이 담긴 배열을 반환합니다.
    return allCollections;
  } catch (e) {
    // 작업 중 오류가 발생하면, 오류 메시지를 콘솔에 출력하고 빈 배열을 반환합니다.
    console.log(e);
    return [];
  }
}

module.exports = BackMaker;
