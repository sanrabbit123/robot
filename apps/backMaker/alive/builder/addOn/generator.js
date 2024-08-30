const BuilderSampleData = {
  "buiid": "u2111_aa02s",
  "builder": "조호익",
  "information": {
    "contract": {
      "status": "협약 완료",
      "date": new Date(1800, 0, 1),
    },
    "phone": "010-5350-0527",
    "email": "chhi1106@naver.com",
    "address": [
      "경기도 의정부시 장암동 101-7"
    ],
    "business": {
      "company": "태호금속",
      "career": {
        "relatedY": 0,
        "relatedM": 0,
        "startY": 0,
        "startM": 0
      },
      "account": [
        {
          "bankName": "우리",
          "accountNumber": "1002731851156",
          "to": "태호금속"
        }
      ],
      "businessInfo": {
        "classification": "개인사업자(일반)",
        "businessNumber": ""
      },
      "service": {
        "cost": {
          "percentage": 5,
          "percentageHistory": []
        },
        "designer": {
          "partner": ""
        }
      }
    }
  },
  "analytics": {
    "region": {
      "transportation": "자동차",
      "range": 40,
      "expenses": 50
    },
    "construct": {
      "level": 1,
      "cost": 2,
      "available": []
    }
  }
};

/**
 * @typedef {Object} BuilderMap
 * @property {function} main - 기본 구조와 기본값을 가진 JSON 객체를 반환하는 함수
 * @property {function} sub - 특정 주제에 대한 기본 구조를 반환하는 함수
 */

/**
 * @description BuilderMap 객체는 시공 소장님의 기본 데이터를 생성하는 데 사용됩니다.
 * 이 객체는 두 가지 메서드를 가지고 있습니다:
 * - main: 기본 구조와 기본값을 가진 JSON 객체를 생성합니다.
 * - sub: 특정 주제에 대한 기본 구조를 생성합니다.
 */
const BuilderMap = {
  /**
   * @function main
   * @description 시공 소장님의 기본 데이터 구조를 생성하는 함수입니다.
   * - 이 함수는 기본값을 포함한 전체 구조를 반환합니다.
   * @returns {Object} 시공 소장님의 기본 데이터 구조와 기본값을 포함한 객체를 반환합니다.
   */
  main: function () {
    let dummy; // dummy 변수는 기본 데이터 구조를 담기 위한 임시 객체입니다.
    
    // 기본 구조를 정의하고 기본값을 설정합니다.
    dummy = {
      structure: {
        buiid: "", // buiid는 시공 소장님의 고유 식별자를 나타냅니다. 기본값은 빈 문자열입니다.
        builder: "", // builder는 시공 소장님의 이름을 나타냅니다. 기본값은 빈 문자열입니다.
        information: {
          contract: {
            status: "협약 완료", // 계약 상태를 나타내며, 기본값은 "협약 완료"입니다.
            date: new Date(1800, 0, 1), // 계약 날짜를 나타내며, 기본값은 1800년 1월 1일로 설정되어 있습니다.
          },
          phone: "", // 시공 소장님의 전화번호를 나타내며, 기본값은 빈 문자열입니다.
          email: "", // 시공 소장님의 이메일 주소를 나타내며, 기본값은 빈 문자열입니다.
          address: [], // 시공 소장님의 주소 목록을 나타내며, 기본값은 빈 배열입니다.
          business: {
            company: "", // 시공 소장님의 회사 이름을 나타내며, 기본값은 빈 문자열입니다.
            career: {
              relatedY: 0, // 시공 소장님의 관련 경력 연수를 나타내며, 기본값은 0입니다.
              relatedM: 0, // 시공 소장님의 관련 경력 개월수를 나타내며, 기본값은 0입니다.
              startY: 0, // 시공 소장님의 사업 시작 연도를 나타내며, 기본값은 0입니다.
              startM: 0, // 시공 소장님의 사업 시작 월을 나타내며, 기본값은 0입니다.
            },
            account: [], // 시공 소장님의 계좌 정보를 나타내며, 기본값은 빈 배열입니다.
            businessInfo: {
              classification: "개인사업자(일반)", // 시공 소장님의 사업자 유형을 나타내며, 기본값은 "개인사업자(일반)"입니다.
              businessNumber: "", // 시공 소장님의 사업자 등록번호를 나타내며, 기본값은 빈 문자열입니다.
            },
            service: {
              cost: {
                percentage: 5, // 서비스 비용의 비율을 나타내며, 기본값은 5%입니다.
                percentageHistory: [] // 서비스 비용 비율의 변경 이력을 나타내며, 기본값은 빈 배열입니다.
              },
              designer: {
                partner: "", // 협력 디자이너의 이름을 나타내며, 기본값은 빈 문자열입니다.
              },
            }
          }
        },
        analytics: {
          region: {
            transportation: "자동차", // 교통수단을 나타내며, 기본값은 "자동차"입니다.
            range: 40, // 서비스 제공 범위를 나타내며, 기본값은 40km입니다.
            expenses: 50, // 예상 경비를 나타내며, 기본값은 50입니다.
          },
          construct: {
            level: 1, // 시공 레벨을 나타내며, 기본값은 1입니다.
            cost: 1, // 시공 비용을 나타내며, 기본값은 1입니다.
            available: [], // 사용 가능 자원을 나타내며, 기본값은 빈 배열입니다.
          }
        }
      }
    };

    // 기본값을 포함한 구조를 반환합니다.
    return dummy;
  },

  /**
   * @function sub
   * @description 특정 주제에 대한 기본 구조를 반환하는 함수입니다.
   * @param {string} subject - 생성할 구조의 주제를 나타냅니다.
   * @returns {Object|null} 주제에 대한 기본 구조를 반환하거나, 기본값이 없을 경우 null을 반환합니다.
   */
  sub: function (subject) {
    let dummy = null; // 주제에 따라 반환할 기본 구조를 저장하기 위한 변수입니다. 기본값은 null입니다.

    // 주제가 빈 문자열인 경우, 빈 객체를 반환합니다.
    if (subject === "") {
      dummy = {}; // 주제가 빈 문자열이면 빈 객체를 생성하여 dummy 변수에 할당합니다.
    }

    // 생성된 구조를 반환합니다.
    return dummy; // 생성된 구조 또는 null을 반환합니다.
  }
};

/**
 * @class Address
 * @description 주소 데이터를 관리하는 클래스입니다. 주어진 문자열을 기반으로 주소 정보를 초기화하고, 이를 변환하는 기능을 제공합니다.
 */
class Address {
  /**
   * @constructor
   * @param {string} rawString - 주소를 나타내는 원본 문자열입니다.
   * @description 생성자는 주소의 원본 문자열을 받아 내부 속성에 저장합니다.
   */
  constructor(rawString) {
    this.raw = rawString; // 원본 주소 문자열을 raw 속성에 저장합니다.
    this.value = rawString; // 원본 주소 문자열을 value 속성에 저장합니다. 이는 변환된 값을 저장하기 위해 사용됩니다.
  }

  /**
   * @method toNormal
   * @description Address 객체의 값을 일반 문자열 형태로 반환합니다.
   * @returns {string} 주소 문자열을 반환합니다.
   */
  toNormal() {
    return this.value; // 변환된 주소 값을 반환합니다. 이 경우 변환 작업 없이 그대로 반환됩니다.
  }
}

/**
 * @class DateParse
 * Date 클래스를 확장하여 날짜 처리 기능을 제공하는 클래스입니다.
 * 문자열 형식의 날짜를 Date 객체로 변환하거나, Date 객체를 다양한 형식으로 변환할 수 있습니다.
 */
class DateParse extends Date {

  /**
   * @constructor
   * 주어진 dateObject를 Date 객체로 변환하여 초기화합니다.
   * 문자열 형식의 날짜가 주어진 경우, 해당 문자열을 분석하여 Date 객체로 변환합니다.
   * @param {string|Date} dateObject - 변환할 날짜 문자열 또는 Date 객체
   * @throws {Error} 유효하지 않은 날짜 형식이 주어진 경우 예외를 발생시킵니다.
   */
  constructor(dateObject) {
    // 임시 배열 변수를 선언합니다.
    let tempArr0, tempArr1, tempArr2;

    // dateObject가 문자열인 경우
    if (typeof dateObject === "string") {
      // 날짜 문자열이 "YYYY-MM-DD HH:MM:SS" 형식인 경우
      if (dateObject.length === 19) {
        // 날짜와 시간을 분리하여 tempArr0에 저장합니다.
        tempArr0 = dateObject.split(" ");
        // 날짜 부분을 "-"로 분리하여 tempArr1에 저장합니다.
        tempArr1 = tempArr0[0].split("-");
        // 시간 부분을 ":"로 분리하여 tempArr2에 저장합니다.
        tempArr2 = tempArr0[1].split(":");
        // 분리된 연, 월, 일, 시, 분, 초 정보를 이용해 Date 객체를 생성하고, 상위 클래스(Date)의 생성자를 호출합니다.
        super(new Date(
          Number(tempArr1[0]), 
          Number(tempArr1[1]) - 1, 
          Number(tempArr1[2]), 
          Number(tempArr2[0]), 
          Number(tempArr2[1]), 
          Number(tempArr2[2])
        ));
      } 
      // 날짜 문자열이 "YYYY-MM-DD" 형식인 경우
      else if (dateObject.length === 10) {
        // 날짜를 "-"로 분리하여 tempArr1에 저장합니다.
        tempArr1 = dateObject.split("-");
        // 분리된 연, 월, 일 정보를 이용해 Date 객체를 생성하고, 상위 클래스(Date)의 생성자를 호출합니다.
        super(new Date(
          Number(tempArr1[0]), 
          Number(tempArr1[1]) - 1, 
          Number(tempArr1[2])
        ));
      } 
      // 유효하지 않은 날짜 형식인 경우
      else {
        // 예외를 발생시킵니다.
        throw new Error("invalid date object");
      }
    } 
    // dateObject가 문자열이 아닌 경우
    else {
      // dateObject를 ISO 문자열로 변환한 후 Date 객체로 초기화합니다.
      super(dateObject.toISOString());
    }
  }

  /**
   * @method zeroAddition
   * 숫자가 10보다 작은 경우 앞에 0을 추가하여 2자리 문자열로 반환합니다.
   * @param {number} number - 2자리로 변환할 숫자
   * @returns {string} 2자리 숫자 문자열
   */
  static zeroAddition(number) {
    // 숫자가 10보다 큰 경우 그대로 문자열로 반환합니다.
    if (number > 9) {
      return String(number);
    } 
    // 숫자가 10보다 작은 경우 앞에 0을 추가하여 문자열로 반환합니다.
    else {
      return '0' + String(number);
    }
  }

  /**
   * @method toString
   * Date 객체를 "YYYY-MM-DD" 또는 "YYYY-MM-DD HH:MM:SS" 형식의 문자열로 변환합니다.
   * @param {boolean} [detail=false] - 시간 정보까지 포함할지 여부
   * @returns {string} 변환된 날짜 문자열
   */
  toString(detail = false) {
    // 연도, 월, 일, 시, 분, 초 정보를 각각 추출합니다.
    const year = this.getFullYear();
    const month = this.getMonth() + 1;
    const day = this.getDate();
    const hours = this.getHours();
    const minutes = this.getMinutes();
    const seconds = this.getSeconds();

    // detail이 true인 경우 "YYYY-MM-DD HH:MM:SS" 형식으로 변환합니다.
    if (detail) {
      // 연도가 1800년인 경우 "1800-01-01"로 반환합니다.
      if (year === 1800) {
        return "1800-01-01";
      } 
      // 그렇지 않으면 연, 월, 일, 시, 분, 초를 모두 포함한 문자열을 반환합니다.
      else {
        return (
          DateParse.zeroAddition(year) + "-" + 
          DateParse.zeroAddition(month) + "-" + 
          DateParse.zeroAddition(day) + " " + 
          DateParse.zeroAddition(hours) + ":" + 
          DateParse.zeroAddition(minutes) + ":" + 
          DateParse.zeroAddition(seconds)
        );
      }
    } 
    // detail이 false인 경우 "YYYY-MM-DD" 형식으로 변환합니다.
    else {
      // 연도가 1800년인 경우 "1800-01-01"로 반환합니다.
      if (year === 1800) {
        return "1800-01-01";
      } 
      // 그렇지 않으면 연, 월, 일만 포함한 문자열을 반환합니다.
      else {
        return (
          DateParse.zeroAddition(year) + "-" + 
          DateParse.zeroAddition(month) + "-" + 
          DateParse.zeroAddition(day)
        );
      }
    }
  }

  /**
   * @method toNormal
   * DateParse 객체를 일반 Date 객체로 변환합니다.
   * @returns {Date} 변환된 Date 객체
   */
  toNormal() {
    // 현재 객체의 ISO 문자열 표현을 사용하여 새로운 Date 객체를 반환합니다.
    return new Date(this.toISOString());
  }

  /**
   * @method toSixString
   * Date 객체를 "YYMMDD" 형식의 6자리 문자열로 변환합니다.
   * @returns {string} 변환된 6자리 날짜 문자열
   */
  toSixString() {
    // 날짜를 "YYYY-MM-DD" 형식의 문자열로 변환한 후, 앞 두 자리를 제외한 "YYMMDD" 형식으로 잘라서 반환합니다.
    let date = this.toString(false);
    return (date.slice(2, 4) + date.slice(5, 7) + date.slice(8, 10));
  }

}

/**
 * @class Menu
 * @extends String
 * @description 주어진 값들 중 하나 또는 여러 개를 선택하여 관리하는 클래스입니다. Enum과 유사한 역할을 하며, 단일 선택 또는 다중 선택 모드를 지원합니다.
 */
class Menu extends String {

  /**
   * @constructor
   * @param {string|string[]} value - 초기 값 또는 값들의 배열입니다.
   * @param {string[]} items - 선택 가능한 값들의 배열입니다.
   * @param {boolean} [multiple=false] - 다중 선택 모드 여부를 지정합니다. 기본값은 false입니다.
   * @description 주어진 값이 유효한지 검사하고, 유효하다면 해당 값을 설정합니다. 다중 선택 모드인 경우, 유효한 값들만 필터링하여 저장합니다.
   */
  constructor(value, items, multiple = false) {
    // value가 배열인 경우 빈 문자열로 초기화하고, 그렇지 않으면 해당 값을 상위 클래스(String)로 전달하여 초기화합니다.
    if (Array.isArray(value)) {
      super(''); // 다중 선택 모드에서 상위 클래스(String)를 빈 문자열로 초기화합니다.
    } else {
      super(value); // 단일 선택 모드에서 상위 클래스(String)를 주어진 값으로 초기화합니다.
    }

    this.value = null; // 단일 선택된 값을 저장하기 위한 속성입니다. 초기값은 null입니다.
    this.values = null; // 다중 선택된 값들을 저장하기 위한 속성입니다. 초기값은 null입니다.
    this.items = items; // 선택 가능한 값들의 목록을 items 속성에 저장합니다.

    let temp; // 임시 배열을 선언합니다. 다중 선택 모드에서 사용됩니다.

    // 단일 선택 모드인 경우
    if (!multiple) {
      // 주어진 값이 선택 가능한 값 목록에 포함되어 있는지 확인합니다.
      if (items.includes(value)) {
        this.value = value; // 포함되어 있다면 해당 값을 value 속성에 저장합니다.
      } else {
        this.value = "알 수 없음"; // 포함되어 있지 않다면 "알 수 없음"을 value 속성에 저장합니다.
      }
    }
    // 다중 선택 모드인 경우
    else {
      temp = []; // 임시 배열을 빈 배열로 초기화합니다.
      for (let i of value) { // 주어진 값 배열에서 각 값을 반복합니다.
        if (items.includes(i)) { // 각 값이 선택 가능한 값 목록에 포함되어 있는지 확인합니다.
          temp.push(i); // 포함되어 있다면 임시 배열에 추가합니다.
        }
      }
      this.values = temp; // 필터링된 값을 values 속성에 저장합니다.
    }
  }

  /**
   * @method toNormal
   * @description 현재 선택된 값을 반환합니다. 단일 선택 모드인 경우 단일 값을 반환하고, 다중 선택 모드인 경우 선택된 값들의 배열을 반환합니다.
   * @returns {string|string[]} 선택된 값 또는 값들의 배열을 반환합니다.
   */
  toNormal() {
    if (this.values === null) { // 다중 선택된 값이 없는 경우 (단일 선택 모드)
      return this.value; // 단일 값을 반환합니다.
    } else {
      return this.values; // 다중 선택된 값들의 배열을 반환합니다.
    }
  }
  
}

/**
 * @class Builder
 * @description 홈리에종과 계약한 인테리어 시공 소장님들의 정보를 담는 클래스입니다.
 * JSON 데이터를 받아 내부적으로 각 정보를 관리하고, 이를 일반 객체로 변환하는 기능을 제공합니다.
 */
class Builder {
  /**
   * @constructor
   * @param {Object} json - 소장님의 정보를 담은 JSON 객체입니다.
   * @description 전달받은 JSON 데이터를 기반으로 클래스의 속성을 초기화합니다.
   */
  constructor(json) {
    this.builder = json.builder; // 소장님의 이름을 builder 속성에 저장합니다.
    this.buiid = json.buiid; // 소장님의 고유 식별자를 buiid 속성에 저장합니다.
    this.information = new this.#BuilderInformation(json.information); // 소장님의 세부 정보를 BuilderInformation 클래스로 초기화합니다.
    this.analytics = new this.#HomeLiaisonAnalytics(json.analytics); // 소장님의 분석 정보를 HomeLiaisonAnalytics 클래스로 초기화합니다.
  }

  /**
   * @method toNormal
   * @description 클래스에 저장된 데이터를 일반 객체 형태로 변환하여 반환합니다.
   * @returns {Object} 일반 객체 형태로 변환된 소장님의 정보를 반환합니다.
   */
  toNormal() {
    return {
      builder: this.builder, // 소장님의 이름을 반환합니다.
      buiid: this.buiid, // 소장님의 고유 식별자를 반환합니다.
      information: this.information.toNormal(), // BuilderInformation 클래스를 일반 객체로 변환하여 반환합니다.
      analytics: this.analytics.toNormal(), // HomeLiaisonAnalytics 클래스를 일반 객체로 변환하여 반환합니다.
    };
  }

  /**
   * @class BuilderInformation
   * @description 소장님의 세부 정보를 관리하는 내부 클래스입니다.
   */
  #BuilderInformation = class {
    /**
     * @constructor
     * @param {Object} json - 소장님의 세부 정보를 담은 JSON 객체입니다.
     * @description 소장님의 계약 정보, 연락처, 주소, 사업 정보를 초기화합니다.
     */
    constructor(json) {
      this.contract = new this.#Contract(json.contract); // 계약 정보를 Contract 클래스로 초기화합니다.
      this.phone = json.phone; // 소장님의 전화번호를 phone 속성에 저장합니다.
      this.email = json.email; // 소장님의 이메일을 email 속성에 저장합니다.
      this.address = new this.#Addresses(json.address); // 소장님의 주소 정보를 Addresses 클래스로 초기화합니다.
      this.business = new this.#Business(json.business); // 소장님의 사업 정보를 Business 클래스로 초기화합니다.
    }

    /**
     * @method toNormal
     * @description BuilderInformation 데이터를 일반 객체로 변환하여 반환합니다.
     * @returns {Object} 일반 객체 형태로 변환된 소장님의 세부 정보를 반환합니다.
     */
    toNormal() {
      return {
        contract: this.contract.toNormal(), // Contract 클래스를 일반 객체로 변환하여 반환합니다.
        phone: this.phone, // 소장님의 전화번호를 반환합니다.
        email: this.email, // 소장님의 이메일을 반환합니다.
        address: this.address.toNormal(), // Addresses 클래스를 일반 객체로 변환하여 반환합니다.
        business: this.business.toNormal(), // Business 클래스를 일반 객체로 변환하여 반환합니다.
      };
    }

    /**
     * @class Contract
     * @description 소장님의 계약 정보를 관리하는 내부 클래스입니다.
     */
    #Contract = class {
      /**
       * @constructor
       * @param {Object} json - 계약 정보를 담은 JSON 객체입니다.
       * @description 계약 상태와 계약 날짜를 초기화합니다.
       */
      constructor(json) {
        this.status = new Menu(json.status, ["협약 완료", "협약 휴직", "협약 해지", "신청 대기", "컨택중"], false); // 계약 상태를 관리하는 Menu 클래스로 초기화합니다.
        this.date = new DateParse(json.date); // 계약 날짜를 관리하는 DateParse 클래스로 초기화합니다.
      }

      /**
       * @method toNormal
       * @description Contract 데이터를 일반 객체로 변환하여 반환합니다.
       * @returns {Object} 일반 객체 형태로 변환된 계약 정보를 반환합니다.
       */
      toNormal() {
        return {
          status: this.status.toNormal(), // Menu 클래스를 일반 문자열로 변환하여 반환합니다.
          date: this.date.toNormal(), // DateParse 클래스를 일반 Date 객체로 변환하여 반환합니다.
        };
      }
    };

    /**
     * @class Addresses
     * @description 소장님의 주소 정보를 관리하는 내부 클래스입니다.
     * 이 클래스는 배열을 상속하여 다중 주소를 처리합니다.
     */
    #Addresses = class extends Array {
      /**
       * @constructor
       * @param {Array} arr - 주소 문자열 배열입니다.
       * @description 각 주소를 Address 클래스로 초기화하여 배열에 저장합니다.
       */
      constructor(arr) {
        super(); // Array 클래스를 상속합니다.
        for (let i of arr) {
          this.push(new Address(i)); // 각 주소 문자열을 Address 클래스로 초기화하여 배열에 추가합니다.
        }
      }

      /**
       * @method toNormal
       * @description Addresses 데이터를 일반 배열로 변환하여 반환합니다.
       * @returns {Array} 일반 배열 형태로 변환된 주소 정보를 반환합니다.
       */
      toNormal() {
        const arr = []; // 일반 배열을 저장할 변수입니다.
        for (let i of this) {
          arr.push(i.toNormal()); // 각 Address 객체를 일반 문자열로 변환하여 배열에 추가합니다.
        }
        return arr; // 변환된 배열을 반환합니다.
      }
    };

    /**
     * @class Business
     * @description 소장님의 사업 정보를 관리하는 내부 클래스입니다.
     */
    #Business = class {
      /**
       * @constructor
       * @param {Object} json - 사업 정보를 담은 JSON 객체입니다.
       * @description 회사 정보, 경력, 계좌, 사업자 정보, 서비스 정보를 초기화합니다.
       */
      constructor(json) {
        this.company = json.company; // 회사 이름을 company 속성에 저장합니다.
        this.career = new this.#Career(json.career); // 경력 정보를 Career 클래스로 초기화합니다.
        this.account = new this.#Accounts(json.account); // 계좌 정보를 Accounts 클래스로 초기화합니다.
        this.businessInfo = new this.#BusinessInfo(json.businessInfo); // 사업자 정보를 BusinessInfo 클래스로 초기화합니다.
        this.service = new this.#Service(json.service); // 서비스 정보를 Service 클래스로 초기화합니다.
      }

      /**
       * @method toNormal
       * @description Business 데이터를 일반 객체로 변환하여 반환합니다.
       * @returns {Object} 일반 객체 형태로 변환된 사업 정보를 반환합니다.
       */
      toNormal() {
        return {
          company: this.company, // 회사 이름을 반환합니다.
          career: this.career.toNormal(), // Career 클래스를 일반 객체로 변환하여 반환합니다.
          account: this.account.toNormal(), // Accounts 클래스를 일반 배열로 변환하여 반환합니다.
          businessInfo: this.businessInfo.toNormal(), // BusinessInfo 클래스를 일반 객체로 변환하여 반환합니다.
          service: this.service.toNormal(), // Service 클래스를 일반 객체로 변환하여 반환합니다.
        };
      }

      /**
       * @class Career
       * @description 소장님의 경력 정보를 관리하는 내부 클래스입니다.
       */
      #Career = class {
        /**
         * @constructor
         * @param {Object} json - 경력 정보를 담은 JSON 객체입니다.
         * @description 관련 연수, 개월수, 시작 연도와 월을 초기화합니다.
         */
        constructor(json) {
          this.relatedY = Number(json.relatedY); // 관련 연수를 숫자로 변환하여 relatedY 속성에 저장합니다.
          this.relatedM = Number(json.relatedM); // 관련 개월수를 숫자로 변환하여 relatedM 속성에 저장합니다.
          this.startY = Number(json.startY); // 시작 연도를 숫자로 변환하여 startY 속성에 저장합니다.
          this.startM = Number(json.startM); // 시작 월을 숫자로 변환하여 startM 속성에 저장합니다.
        }
  
        /**
         * @method toNormal
         * @description Career 데이터를 일반 객체로 변환하여 반환합니다.
         * @returns {Object} 일반 객체 형태로 변환된 경력 정보를 반환합니다.
         */
        toNormal() {
          return {
            relatedY: this.relatedY, // 관련 연수를 반환합니다.
            relatedM: this.relatedM, // 관련 개월수를 반환합니다.
            startY: this.startY, // 시작 연도를 반환합니다.
            startM: this.startM, // 시작 월을 반환합니다.
          };
        }
      };
  
      /**
       * @class Accounts
       * @description 소장님의 계좌 정보를 관리하는 내부 클래스입니다.
       * 이 클래스는 배열을 상속하여 다중 계좌를 처리합니다.
       */
      #Accounts = class extends Array {
        /**
         * @constructor
         * @param {Array} arr - 계좌 정보를 담은 JSON 객체 배열입니다.
         * @description 각 계좌 정보를 Account 클래스로 초기화하여 배열에 저장합니다.
         */
        constructor(arr) {
          super(); // Array 클래스를 상속합니다.
          for (let i of arr) {
            this.push(new this.#Account(i)); // 각 계좌 정보를 Account 클래스로 초기화하여 배열에 추가합니다.
          }
        }
  
        /**
         * @method toNormal
         * @description Accounts 데이터를 일반 배열로 변환하여 반환합니다.
         * @returns {Array} 일반 배열 형태로 변환된 계좌 정보를 반환합니다.
         */
        toNormal() {
          const arr = []; // 일반 배열을 저장할 변수입니다.
          for (let i of this) {
            arr.push(i.toNormal()); // 각 Account 객체를 일반 객체로 변환하여 배열에 추가합니다.
          }
          return arr; // 변환된 배열을 반환합니다.
        }
  
        /**
         * @class Account
         * @description 소장님의 단일 계좌 정보를 관리하는 내부 클래스입니다.
         */
        #Account = class {
          /**
           * @constructor
           * @param {Object} json - 단일 계좌 정보를 담은 JSON 객체입니다.
           * @description 계좌의 은행 이름, 계좌 번호, 수취인을 초기화합니다.
           */
          constructor(json) {
            this.bankName = json.bankName; // 은행 이름을 bankName 속성에 저장합니다.
            this.accountNumber = json.accountNumber; // 계좌 번호를 accountNumber 속성에 저장합니다.
            this.to = json.to; // 수취인을 to 속성에 저장합니다.
          }
    
          /**
           * @method toNormal
           * @description Account 데이터를 일반 객체로 변환하여 반환합니다.
           * @returns {Object} 일반 객체 형태로 변환된 계좌 정보를 반환합니다.
           */
          toNormal() {
            return {
              bankName: this.bankName, // 은행 이름을 반환합니다.
              accountNumber: this.accountNumber, // 계좌 번호를 반환합니다.
              to: this.to, // 수취인을 반환합니다.
            };
          }
        };
      };
  
      /**
       * @class BusinessInfo
       * @description 소장님의 사업자 정보를 관리하는 내부 클래스입니다.
       */
      #BusinessInfo = class {
        /**
         * @constructor
         * @param {Object} json - 사업자 정보를 담은 JSON 객체입니다.
         * @description 사업자 유형과 등록번호를 초기화합니다.
         */
        constructor(json) {
          this.classification = new Menu(json.classification, ["법인사업자(일반)", "법인사업자(간이)", "개인사업자(일반)", "개인사업자(간이)", "프리랜서"], false); // 사업자 유형을 Menu 클래스로 초기화합니다.
          this.businessNumber = json.businessNumber; // 사업자 등록번호를 businessNumber 속성에 저장합니다.
        }
  
        /**
         * @method toNormal
         * @description BusinessInfo 데이터를 일반 객체로 변환하여 반환합니다.
         * @returns {Object} 일반 객체 형태로 변환된 사업자 정보를 반환합니다.
         */
        toNormal() {
          return {
            classification: this.classification.toNormal(), // Menu 클래스를 일반 문자열로 변환하여 반환합니다.
            businessNumber: this.businessNumber, // 사업자 등록번호를 반환합니다.
          };
        }
      };
  
      /**
       * @class Service
       * @description 소장님의 서비스 정보를 관리하는 내부 클래스입니다.
       */
      #Service = class {
        /**
         * @constructor
         * @param {Object} json - 서비스 정보를 담은 JSON 객체입니다.
         * @description 서비스 비용과 디자이너 정보를 초기화합니다.
         */
        constructor(json) {
          this.cost = new this.#Cost(json.cost); // 서비스 비용 정보를 Cost 클래스로 초기화합니다.
          this.designer = new this.#Designer(json.designer); // 디자이너 정보를 Designer 클래스로 초기화합니다.
        }
  
        /**
         * @method toNormal
         * @description Service 데이터를 일반 객체로 변환하여 반환합니다.
         * @returns {Object} 일반 객체 형태로 변환된 서비스 정보를 반환합니다.
         */
        toNormal() {
          return {
            cost: this.cost.toNormal(), // Cost 클래스를 일반 객체로 변환하여 반환합니다.
            designer: this.designer.toNormal(), // Designer 클래스를 일반 객체로 변환하여 반환합니다.
          };
        }
  
        /**
         * @class Cost
         * @description 서비스 비용 정보를 관리하는 내부 클래스입니다.
         */
        #Cost = class {
          /**
           * @constructor
           * @param {Object} json - 비용 정보를 담은 JSON 객체입니다.
           * @description 비용 비율과 그 변경 이력을 초기화합니다.
           */
          constructor(json) {
            this.percentage = json.percentage; // 비용 비율을 percentage 속성에 저장합니다.
            this.percentageHistory = new this.#PercentageHistory(json.percentageHistory); // 비용 비율 변경 이력을 PercentageHistory 클래스로 초기화합니다.
          }
    
          /**
           * @method toNormal
           * @description Cost 데이터를 일반 객체로 변환하여 반환합니다.
           * @returns {Object} 일반 객체 형태로 변환된 비용 정보를 반환합니다.
           */
          toNormal() {
            return {
              percentage: this.percentage, // 비용 비율을 반환합니다.
              percentageHistory: this.percentageHistory.toNormal(), // PercentageHistory 클래스를 일반 배열로 변환하여 반환합니다.
            };
          }
    
          /**
           * @class PercentageHistory
           * @description 비용 비율 변경 이력을 관리하는 내부 클래스입니다.
           * 이 클래스는 배열을 상속하여 다중 이력을 처리합니다.
           */
          #PercentageHistory = class extends Array {
            /**
             * @constructor
             * @param {Array} arr - 비용 비율 변경 이력을 담은 JSON 객체 배열입니다.
             * @description 각 변경 이력을 PastPercentage 클래스로 초기화하여 배열에 저장합니다.
             */
            constructor(arr) {
              super(); // Array 클래스를 상속합니다.
              for (let i of arr) {
                this.push(new this.#PastPercentage(i)); // 각 변경 이력을 PastPercentage 클래스로 초기화하여 배열에 추가합니다.
              }
            }
      
            /**
             * @method toNormal
             * @description PercentageHistory 데이터를 일반 배열로 변환하여 반환합니다.
             * @returns {Array} 일반 배열 형태로 변환된 변경 이력을 반환합니다.
             */
            toNormal() {
              const arr = []; // 일반 배열을 저장할 변수입니다.
              for (let i of this) {
                arr.push(i.toNormal()); // 각 PastPercentage 객체를 일반 객체로 변환하여 배열에 추가합니다.
              }
              return arr; // 변환된 배열을 반환합니다.
            }
      
            /**
             * @class PastPercentage
             * @description 단일 비용 비율 변경 이력을 관리하는 내부 클래스입니다.
             */
            #PastPercentage = class {
              /**
               * @constructor
               * @param {Object} json - 단일 비용 비율 변경 이력을 담은 JSON 객체입니다.
               * @description 변경 시작 날짜, 종료 날짜와 비율을 초기화합니다.
               */
              constructor(json) {
                this.date = {
                  start: new DateParse(json.date.start), // 변경 시작 날짜를 DateParse 클래스로 초기화합니다.
                  end: new DateParse(json.date.end), // 변경 종료 날짜를 DateParse 클래스로 초기화합니다.
                };
                this.percentage = json.percentage; // 변경된 비율을 percentage 속성에 저장합니다.
              }
        
              /**
               * @method toNormal
               * @description PastPercentage 데이터를 일반 객체로 변환하여 반환합니다.
               * @returns {Object} 일반 객체 형태로 변환된 변경 이력을 반환합니다.
               */
              toNormal() {
                return {
                  date: {
                    start: this.date.start.toNormal(), // DateParse 클래스를 일반 Date 객체로 변환하여 반환합니다.
                    end: this.date.end.toNormal(), // DateParse 클래스를 일반 Date 객체로 변환하여 반환합니다.
                  },
                  percentage: this.percentage, // 변경된 비율을 반환합니다.
                };
              }
            };
          };
        };
    
        /**
         * @class Designer
         * @description 소장님의 협력 디자이너 정보를 관리하는 내부 클래스입니다.
         */
        #Designer = class {
          /**
           * @constructor
           * @param {Object} json - 협력 디자이너 정보를 담은 JSON 객체입니다.
           * @description 협력 디자이너의 이름을 초기화합니다.
           */
          constructor(json) {
            this.partner = json.partner; // 협력 디자이너의 이름을 partner 속성에 저장합니다.
          }
    
          /**
           * @method toNormal
           * @description Designer 데이터를 일반 객체로 변환하여 반환합니다.
           * @returns {Object} 일반 객체 형태로 변환된 디자이너 정보를 반환합니다.
           */
          toNormal() {
            return {
              partner: this.partner, // 협력 디자이너의 이름을 반환합니다.
            };
          }
        };
      };
    };
  };

  /**
   * @class HomeLiaisonAnalytics
   * @description 소장님의 지역 및 시공 분석 정보를 관리하는 내부 클래스입니다.
   */
  #HomeLiaisonAnalytics = class {
    /**
     * @constructor
     * @param {Object} json - 분석 정보를 담은 JSON 객체입니다.
     * @description 지역 분석 정보와 시공 분석 정보를 초기화합니다.
     */
    constructor(json) {
      this.region = new this.#RegionAnalytics(json.region); // 지역 분석 정보를 RegionAnalytics 클래스로 초기화합니다.
      this.construct = new this.#ConstructAnalytics(json.construct); // 시공 분석 정보를 ConstructAnalytics 클래스로 초기화합니다.
    }

    /**
     * @method toNormal
     * @description HomeLiaisonAnalytics 데이터를 일반 객체로 변환하여 반환합니다.
     * @returns {Object} 일반 객체 형태로 변환된 분석 정보를 반환합니다.
     */
    toNormal() {
      return {
        region: this.region.toNormal(), // RegionAnalytics 클래스를 일반 객체로 변환하여 반환합니다.
        construct: this.construct.toNormal(), // ConstructAnalytics 클래스를 일반 객체로 변환하여 반환합니다.
      };
    }

    /**
     * @class ConstructAnalytics
     * @description 소장님의 시공 분석 정보를 관리하는 내부 클래스입니다.
     */
    #ConstructAnalytics = class {
      /**
       * @constructor
       * @param {Object} json - 시공 분석 정보를 담은 JSON 객체입니다.
       * @description 시공 레벨, 비용, 사용 가능 자원을 초기화합니다.
       */
      constructor(json) {
        this.level = json.level; // 시공 레벨을 level 속성에 저장합니다.
        this.cost = json.cost; // 시공 비용을 cost 속성에 저장합니다.
        this.available = new this.#Available(json.available); // 사용 가능 자원을 Available 클래스로 초기화합니다.
      }

      /**
       * @method toNormal
       * @description ConstructAnalytics 데이터를 일반 객체로 변환하여 반환합니다.
       * @returns {Object} 일반 객체 형태로 변환된 시공 분석 정보를 반환합니다.
       */
      toNormal() {
        return {
          level: this.level, // 시공 레벨을 반환합니다.
          cost: this.cost, // 시공 비용을 반환합니다.
          available: this.available.toNormal(), // Available 클래스를 일반 배열로 변환하여 반환합니다.
        };
      }

      /**
       * @class Available
       * @description 시공에 사용 가능한 자원을 관리하는 내부 클래스입니다.
       * 이 클래스는 배열을 상속하여 다중 자원을 처리합니다.
       */
      #Available = class extends Array {
        /**
         * @constructor
         * @param {Array} arr - 사용 가능한 자원을 담은 JSON 객체 배열입니다.
         * @description 각 자원을 AvailableFactor 클래스로 초기화하여 배열에 저장합니다.
         */
        constructor(arr) {
          super(); // Array 클래스를 상속합니다.
          for (let i of arr) {
            this.push(new this.#AvailableFactor(i)); // 각 자원을 AvailableFactor 클래스로 초기화하여 배열에 추가합니다.
          }
        }
  
        /**
         * @method toNormal
         * @description Available 데이터를 일반 배열로 변환하여 반환합니다.
         * @returns {Array} 일반 배열 형태로 변환된 자원 정보를 반환합니다.
         */
        toNormal() {
          const arr = []; // 일반 배열을 저장할 변수입니다.
          for (let i of this) {
            arr.push(i.toNormal()); // 각 AvailableFactor 객체를 일반 객체로 변환하여 배열에 추가합니다.
          }
          return arr; // 변환된 배열을 반환합니다.
        }
  
        /**
         * @class AvailableFactor
         * @description 단일 사용 가능한 자원을 관리하는 내부 클래스입니다.
         */
        #AvailableFactor = class {
          /**
           * @constructor
           * @param {Object} json - 단일 자원을 담은 JSON 객체입니다.
           * @description 자원의 이름을 초기화합니다.
           */
          constructor(json) {
            this.name = json.name; // 자원의 이름을 name 속성에 저장합니다.
          }
    
          /**
           * @method toNormal
           * @description AvailableFactor 데이터를 일반 객체로 변환하여 반환합니다.
           * @returns {Object} 일반 객체 형태로 변환된 자원 정보를 반환합니다.
           */
          toNormal() {
            return {
              name: this.name, // 자원의 이름을 반환합니다.
            };
          }
        };
      };
    };

    /**
     * @class RegionAnalytics
     * @description 소장님의 지역 분석 정보를 관리하는 내부 클래스입니다.
     */
    #RegionAnalytics = class {
      /**
       * @constructor
       * @param {Object} json - 지역 분석 정보를 담은 JSON 객체입니다.
       * @description 교통수단, 서비스 범위, 예상 경비를 초기화합니다.
       */
      constructor(json) {
        this.transportation = new Menu(json.transportation, ["자동차", "대중교통"], false); // 교통수단을 Menu 클래스로 초기화합니다.
        this.range = json.range; // 서비스 범위를 range 속성에 저장합니다.
        this.expenses = json.expenses; // 예상 경비를 expenses 속성에 저장합니다.
      }

      /**
       * @method toNormal
       * @description RegionAnalytics 데이터를 일반 객체로 변환하여 반환합니다.
       * @returns {Object} 일반 객체 형태로 변환된 지역 분석 정보를 반환합니다.
       */
      toNormal() {
        return {
          transportation: this.transportation.toNormal(), // Menu 클래스를 일반 문자열로 변환하여 반환합니다.
          range: this.range, // 서비스 범위를 반환합니다.
          expenses: this.expenses, // 예상 경비를 반환합니다.
        };
      }
    };
  };
}

/**
 * @class Builders
 * @extends Array
 * @description Builder 인스턴스를 담는 확장 배열 클래스입니다.
 * 이 클래스는 Builder 인스턴스를 다루기 위한 추가적인 메서드를 제공합니다.
 */
class Builders extends Array {

  /**
   * @method toNormal
   * @description 배열에 담긴 각 Builder 인스턴스를 일반 객체 형태로 변환하여 반환합니다.
   * @returns {Array} 일반 객체 형태로 변환된 Builder 인스턴스들의 배열을 반환합니다.
   */
  toNormal() {
    let tong; // 변환된 객체들을 담기 위한 임시 배열 변수입니다.
    tong = []; // 임시 배열 변수를 빈 배열로 초기화합니다.

    // this는 Builders 클래스의 인스턴스를 가리키며, 이는 Builder 인스턴스들의 배열입니다.
    for (let i of this) {
      // 배열의 각 요소(즉, 각 Builder 인스턴스)에 대해 toNormal() 메서드를 호출합니다.
      // toNormal() 메서드는 각 Builder 인스턴스를 일반 객체로 변환합니다.
      tong.push(i.toNormal()); // 변환된 객체를 임시 배열(tong)에 추가합니다.
    }

    // 변환된 객체들이 담긴 배열(tong)을 반환합니다.
    return tong; // 결과적으로, 각 Builder 인스턴스가 일반 객체로 변환된 배열을 반환합니다.
  }

}

const withTools = function (Builder) {
  return Builder;
}

const withToolsArr = function (Builders) {
  return Builders;
}

module.exports = { BuilderMap, Builder, Builders, Tools: { withTools, withToolsArr } };
