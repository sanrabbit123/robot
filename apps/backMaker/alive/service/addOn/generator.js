const ServiceSampleData = {
  "serid": "s2011_aa02s",
  "key": "homeStyling",
  "date": new Date("2021-11-01T04:48:27.122Z"),
  "kind": "service",
  "setting": {
    "coordinates": {
      "x": {
        "M": "mini",
        "B": "basic",
        "P": "premium"
      },
      "y": {
        "homeFurnishing": "홈퍼니싱",
        "homeStyling": "홈스타일링",
        "totalStyling": "토탈 스타일링",
        "extraStyling": "엑스트라 스타일링"
      },
      "z": {
        "online": "온라인",
        "offline": "오프라인"
      }
    },
    "period": 45,
    "schedule": [
      {
        "title": "1차 디자인 제안",
        "description": "컨셉 설정과 공간 기획을 포함한 첫 번째 디자인 제안입니다. 컨셉 설명과 공간 구성 시각화 자료, 배치도, 제품 리스트를 제공합니다.",
        "color": "#f05a24",
        "period": 10,
        "order": 0
      },
      {
        "title": "수정 디자인 제안",
        "description": "최대 3회까지 디자인 수정을 거쳐 고객님만의 맞춤 디자인이 확정됩니다. 컨셉을 최대 1회까지 수정 가능합니다.",
        "color": "#f05a24",
        "period": 6,
        "order": 1
      },
      {
        "title": "시공 디자인",
        "description": "디자인에 따라 시공 공정 선택과 범위를 정합니다. 공정이 선택되었다면, 전체 완성도와 예산을 고려하여 자재와 세부 디자인을 정합니다.",
        "color": "#cccccc",
        "period": 6,
        "order": 1
      },
      {
        "title": "시공 견적 안내",
        "description": "고객님은 홈리에종 시공사, 디자이너 시공사, 고객 지정 시공사로부터 견적서를 받고 비교하여 선택할 수 있습니다.",
        "color": "#cccccc",
        "period": 3,
        "order": 2
      },
      {
        "title": "시공 진행",
        "description": "철거, 전기, 설비, 목공, 도장, 타일, 금속, 마감 순으로 시공을 진행합니다. 구체적인 순서는 상황에 따라 달라질 수 있습니다.",
        "color": "#cccccc",
        "period": 15,
        "order": 2
      },
      {
        "title": "제품 구매",
        "description": "제품 리스트를 통해 제품의 스펙과 금액과 구매처를 안내드립니다. 구매처는 온라인 링크 또는 쇼룸 방문에 대한 정보를 제공합니다.",
        "color": "#29aae1",
        "period": 7,
        "order": 3
      },
      {
        "title": "패브릭 제작",
        "description": "패브릭을 제작할 때는 디자이너님이 직접 발주합니다. 결제는 상황에 따라 업체로 지불하거나 디자이너가 수령하여 발주와 함께 진행합니다.",
        "color": "#faaf3b",
        "period": 7,
        "order": 3
      },
      {
        "title": "제작 가구 발주",
        "description": "가구를 제작할 때는 디자이너님이 직접 발주합니다. 결제는 상황에 따라 업체로 지불하거나 디자이너가 수령하여 발주와 함께 진행합니다.",
        "color": "#faaf3b",
        "period": 7,
        "order": 3
      },
      {
        "title": "입주 청소",
        "description": "홈리에종에 연계된 업체를 통해 입주 청소를 제공 받으실 수 있습니다. 문의주시면 예약 가능 여부와 서비스 비용을 확인해드립니다.",
        "color": "#8bc53f",
        "period": 2,
        "order": 4
      },
      {
        "title": "설치 및 세팅",
        "description": "배치도를 통해 어떤 것을 어디에 둘 지에 대한 구체적인 가이드를 제공합니다. 디자이너가 직접 조립 및 설치를 도와드리지는 않습니다.",
        "color": "#e856ba",
        "period": 4,
        "order": 5
      },
      {
        "title": "정리 수납",
        "description": "홈리에종에 연계된 정리 수납 전문가가 방문 견적을 드립니다. 정리 수납을 진행하기에 적합한 시점은 현장에 따라 다를 수 있습니다.",
        "color": "#e856ba",
        "period": 4,
        "order": 5
      },
      {
        "title": "촬영 및 인터뷰",
        "description": "집의 가장 아름다운 모습을 사진으로 남기실 수 있습니다. 홈리에종을 통해 촬영 일자를 조율하며, 시간은 2시간 가량 소요됩니다.",
        "color": "#2fa678",
        "period": 1,
        "order": 6
      }
    ]
  }
}

/**
 * @namespace ServiceMap
 * 홈리에종 서비스에 대한 스키마를 정의하고 기본값을 설정하는 JSON 생성기 함수입니다.
 * 이 함수는 'service' 및 'checklist' 두 가지 유형의 스키마를 처리할 수 있습니다.
 */
const ServiceMap = {

  /**
   * @function main
   * 서비스 또는 체크리스트에 대한 기본 구조를 생성합니다.
   * @param {string} [kind="service"] - 생성할 스키마의 종류를 지정합니다. "service" 또는 "checklist"를 사용할 수 있습니다.
   * @returns {object} 스키마 구조를 포함한 객체를 반환합니다.
   * @throws {Error} 유효하지 않은 kind 값이 입력된 경우 예외를 발생시킵니다.
   */
  main: function (kind = "service") {
    // "kind"가 "service" 또는 "checklist"가 아닌 경우, 오류를 발생시킵니다.
    if (kind !== "service" && kind !== "checklist") {
      throw new Error("invalid kind");
    }

    // 결과를 저장할 dummy 변수를 선언합니다.
    let dummy;

    // "kind"가 "service"인 경우
    if (kind === "service") {
      // 서비스 구조에 대한 기본값을 정의합니다.
      dummy = {
        structure: {
          serid: "", // 서비스의 고유 ID (string)
          key: "", // 서비스의 종류를 나타내는 키 (string)
          date: new Date(), // 서비스 생성 또는 수정 날짜 (Date)
          kind, // 서비스의 유형 ("service")
          setting: {
            coordinates: {
              x: { // x축 좌표 설정 (서비스 등급)
                M: "mini", // M등급 (string)
                B: "basic", // B등급 (string)
                P: "premium" // P등급 (string)
              },
              y: { // y축 좌표 설정 (서비스 종류)
                homeFurnishing: "홈퍼니싱", // 홈퍼니싱 서비스 (string)
                homeStyling: "홈스타일링", // 홈스타일링 서비스 (string)
                totalStyling: "토탈 스타일링", // 토탈 스타일링 서비스 (string)
                extraStyling: "엑스트라 스타일링" // 엑스트라 스타일링 서비스 (string)
              },
              z: { // z축 좌표 설정 (서비스 제공 방식)
                online: "온라인", // 온라인 서비스 (string)
                offline: "오프라인" // 오프라인 서비스 (string)
              },
            },
            period: 0, // 서비스 기간 (number)
            schedule: [], // 서비스 일정 배열 (array)
          },
        }
      };
    } 
    // "kind"가 "checklist"인 경우
    else if (kind === "checklist") {
      // 체크리스트 구조에 대한 기본값을 정의합니다.
      dummy = {
        structure: {
          serid: "", // 체크리스트의 고유 ID (string)
          key: "", // 체크리스트의 종류를 나타내는 키 (string)
          date: new Date(), // 체크리스트 생성 또는 수정 날짜 (Date)
          kind, // 체크리스트의 유형 ("checklist")
          setting: {
            target: {
              collection: "", // 타겟 컬렉션 (string)
              action: "", // 타겟 액션 (string)
            },
            contents: {
              title: "", // 체크리스트 제목 (string)
              checklist: [], // 체크리스트 항목 배열 (array)
            }
          }
        }
      };
    }
    // 생성된 스키마 구조를 반환합니다.
    return dummy;
  },

  /**
   * @function sub
   * 특정 스키마 하위 요소에 대한 기본 구조를 생성합니다.
   * @param {string} subject - 하위 요소의 경로를 나타내는 문자열입니다.
   * @returns {object|null} 하위 요소에 대한 기본 구조를 반환합니다. 해당 subject가 없을 경우 null을 반환합니다.
   */
  sub: function (subject) {
    // 결과를 저장할 dummy 변수를 선언하고 초기화합니다.
    let dummy = null;

    // subject가 "setting.contents.checklist"인 경우
    if (subject === "setting.contents.checklist") {
      // 체크리스트 항목에 대한 기본 구조를 정의합니다.
      dummy = {
        title: "", // 체크리스트 항목의 제목 (string)
        children: [], // 하위 항목 배열 (array)
      };
    } 
    // subject가 "setting.contents.checklist.children"인 경우
    else if (subject === "setting.contents.checklist.children") {
      // 체크리스트 하위 항목에 대한 기본 구조를 정의합니다.
      dummy = {
        title: "", // 하위 항목의 제목 (string)
        contents: "", // 하위 항목의 내용 (string)
      };
    } 
    // subject가 "setting.schedule"인 경우
    else if (subject === "setting.schedule") {
      // 일정 항목에 대한 기본 구조를 정의합니다.
      dummy = {
        title: "", // 일정 항목의 제목 (string)
        description: "", // 일정 항목의 설명 (string)
        color: "#000000", // 일정 항목의 색상 (string, 기본값: 검정색)
        period: 0, // 일정 항목의 기간 (number)
        order: 0 // 일정 항목의 순서 (number)
      };
    }

    // 생성된 하위 요소 구조를 반환합니다.
    return dummy;
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
 * @class Service
 * 홈리에종 서비스 데이터를 관리하는 클래스입니다.
 * 서비스 데이터를 JSON 형식으로 받아, 이를 클래스 인스턴스로 변환합니다.
 */
class Service {

  /**
   * @constructor
   * 주어진 JSON 데이터를 기반으로 Service 인스턴스를 초기화합니다.
   * @param {object} json - 서비스 데이터를 포함한 JSON 객체
   */
  constructor(json) {
    // 서비스의 고유 ID를 저장합니다.
    this.serid = json.serid;

    // 서비스의 키(종류)를 저장합니다.
    this.key = json.key;

    // 서비스의 날짜를 저장합니다. DateParse 클래스를 사용하여 처리합니다.
    this.date = new DateParse(json.date);

    // 서비스의 종류를 저장합니다.
    this.kind = json.kind;

    // 서비스 종류에 따라 설정을 초기화합니다.
    if (this.kind === "service") {
      // 서비스 유형일 경우 CoreSetting 클래스 사용
      this.setting = new this.#CoreSetting(json.setting);
    } else if (this.kind === "checklist") {
      // 체크리스트 유형일 경우 ChecklistSetting 클래스 사용
      this.setting = new this.#ChecklistSetting(json.setting);
    } else {
      // 유효하지 않은 종류의 경우 오류를 발생시킵니다.
      throw new Error("invalid kind");
    }
  }

  /**
   * @method toNormal
   * 서비스 데이터를 일반 JSON 형식으로 변환합니다.
   * @returns {object} 변환된 JSON 객체
   */
  toNormal() {
    return {
      serid: this.serid, // 서비스의 고유 ID
      key: this.key, // 서비스의 키(종류)
      date: this.date.toNormal(), // DateParse 객체를 일반 Date 객체로 변환
      kind: this.kind, // 서비스의 종류
      setting: this.setting.toNormal() // 설정 데이터를 일반 JSON 형식으로 변환
    };
  }

  /**
   * @method toMatrix
   * 체크리스트 데이터를 행렬(Matrix) 형식으로 변환합니다.
   * @returns {Array} 변환된 행렬 데이터
   */
  toMatrix() {
    // 체크리스트 내용을 구조 분해 할당으로 추출
    const { title, checklist } = this.setting.contents;

    // 행렬의 첫 번째 행에 제목 추가
    const matrix = [[title, ""]];
    
    // 체크리스트 항목 번호 초기화
    let num = 0;

    // 체크리스트 항목을 순회하며 행렬에 추가
    for (let { title, children } of checklist) {
      matrix.push([String(num + 1), title]); // 번호와 제목 추가
      for (let obj of children) {
        // HTML 태그를 제거한 후 행렬에 추가
        matrix.push([obj.title, obj.contents.replace(/\<[ub]\%/gi, '').replace(/\%[ub]\>/gi, '')]);
      }
      num++; // 번호 증가
    }
    return matrix;
  }

  /**
   * @class ChecklistSetting
   * 체크리스트 설정을 관리하는 클래스입니다.
   */
  #ChecklistSetting = class {
    /**
     * @constructor
     * 주어진 JSON 데이터를 기반으로 ChecklistSetting 인스턴스를 초기화합니다.
     * @param {object} json - 체크리스트 설정 데이터를 포함한 JSON 객체
     */
    constructor(json) {
      // 체크리스트 대상(Target)을 초기화합니다.
      this.target = new this.#ChecklistTarget(json.target);

      // 체크리스트 내용을 초기화합니다.
      this.contents = new this.#ChecklistContents(json.contents);
    }

    /**
     * @method toNormal
     * 체크리스트 설정 데이터를 일반 JSON 형식으로 변환합니다.
     * @returns {object} 변환된 JSON 객체
     */
    toNormal() {
      let obj = {};
      obj.target = this.target.toNormal(); // 타겟 데이터를 변환하여 저장
      obj.contents = this.contents.toNormal(); // 내용 데이터를 변환하여 저장
      return obj;
    }

    /**
     * @class ChecklistTarget
     * 체크리스트 대상(Target)을 관리하는 클래스입니다.
     */
    #ChecklistTarget = class {
      /**
       * @constructor
       * 주어진 JSON 데이터를 기반으로 ChecklistTarget 인스턴스를 초기화합니다.
       * @param {object} json - 체크리스트 대상 데이터를 포함한 JSON 객체
       */
      constructor(json) {
        // 컬렉션 정보를 초기화합니다.
        this.collection = json.collection;

        // 액션 데이터를 초기화합니다.
        this.action = new this.#Action(json.action);
      }

      /**
       * @method toNormal
       * 체크리스트 대상 데이터를 일반 JSON 형식으로 변환합니다.
       * @returns {object} 변환된 JSON 객체
       */
      toNormal() {
        let obj = {};
        obj.collection = this.collection; // 컬렉션 정보를 저장
        obj.action = this.action.toNormal(); // 액션 데이터를 변환하여 저장
        return obj;
      }

      /**
       * @class Action
       * 체크리스트의 액션(Action)을 관리하는 클래스입니다.
       * Array 클래스를 확장하여 사용합니다.
       */
      #Action = class extends Array {
        /**
         * @constructor
         * 주어진 배열을 기반으로 Action 인스턴스를 초기화합니다.
         * @param {Array} arr - 액션 데이터를 포함한 배열
         */
        constructor(arr) {
          super();
          // 배열의 각 항목을 초기화
          for (let i of arr) {
            this.push(i);
          }
        }

        /**
         * @method toNormal
         * 액션 데이터를 일반 배열 형식으로 변환합니다.
         * @returns {Array} 변환된 배열
         */
        toNormal() {
          let arr = [];
          // 배열의 각 항목을 변환하여 저장
          for (let i of this) {
            arr.push(i);
          }
          return arr;
        }
      }
    }

    /**
     * @class ChecklistContents
     * 체크리스트 내용을 관리하는 클래스입니다.
     */
    #ChecklistContents = class {
      /**
       * @constructor
       * 주어진 JSON 데이터를 기반으로 ChecklistContents 인스턴스를 초기화합니다.
       * @param {object} json - 체크리스트 내용 데이터를 포함한 JSON 객체
       */
      constructor(json) {
        // 체크리스트의 제목을 초기화합니다.
        this.title = json.title;

        // 체크리스트 항목을 초기화합니다.
        this.checklist = new this.#Checklist(json.checklist);
      }

      /**
       * @method toNormal
       * 체크리스트 내용을 일반 JSON 형식으로 변환합니다.
       * @returns {object} 변환된 JSON 객체
       */
      toNormal() {
        let obj = {};
        obj.title = this.title; // 제목을 저장
        obj.checklist = this.checklist.toNormal(); // 체크리스트 항목을 변환하여 저장
        return obj;
      }

      /**
       * @class Checklist
       * 체크리스트 항목을 관리하는 클래스입니다.
       * Array 클래스를 확장하여 사용합니다.
       */
      #Checklist = class extends Array {
        /**
         * @constructor
         * 주어진 배열을 기반으로 Checklist 인스턴스를 초기화합니다.
         * @param {Array} arr - 체크리스트 항목 데이터를 포함한 배열
         */
        constructor(arr) {
          super();
          // 배열의 각 항목을 초기화합니다.
          for (let obj of arr) {
            this.push(new this.#ChecklistFactor(obj));
          }
        }

        /**
         * @method toNormal
         * 체크리스트 항목 데이터를 일반 배열 형식으로 변환합니다.
         * @returns {Array} 변환된 배열
         */
        toNormal() {
          let arr = [];
          // 배열의 각 항목을 변환하여 저장합니다.
          for (let i of this) {
            arr.push(i.toNormal());
          }
          return arr;
        }

        /**
         * @class ChecklistFactor
         * 개별 체크리스트 항목을 관리하는 클래스입니다.
         */
        #ChecklistFactor = class {
          /**
           * @constructor
           * 주어진 JSON 데이터를 기반으로 ChecklistFactor 인스턴스를 초기화합니다.
           * @param {object} json - 체크리스트 항목 데이터를 포함한 JSON 객체
           */
          constructor(json) {
            // 항목의 제목을 초기화합니다.
            this.title = json.title;

            // 하위 항목(children)을 초기화합니다.
            this.children = new this.#ChecklistChildren(json.children);
          }

          /**
           * @method toNormal
           * 개별 체크리스트 항목 데이터를 일반 JSON 형식으로 변환합니다.
           * @returns {object} 변환된 JSON 객체
           */
          toNormal() {
            let obj = {};
            obj.title = this.title; // 제목을 저장
            obj.children = this.children.toNormal(); // 하위 항목을 변환하여 저장
            return obj;
          }

          /**
           * @class ChecklistChildren
           * 하위 체크리스트 항목을 관리하는 클래스입니다.
           * Array 클래스를 확장하여 사용합니다.
           */
          #ChecklistChildren = class extends Array {
            /**
             * @constructor
             * 주어진 배열을 기반으로 ChecklistChildren 인스턴스를 초기화합니다.
             * @param {Array} arr - 하위 항목 데이터를 포함한 배열
             */
            constructor(arr) {
              super();
              // 배열의 각 하위 항목을 초기화합니다.
              for (let obj of arr) {
                this.push(new this.#ChecklistChildrenFactor(obj));
              }
            }

            /**
             * @method toNormal
             * 하위 항목 데이터를 일반 배열 형식으로 변환합니다.
             * @returns {Array} 변환된 배열
             */
            toNormal() {
              let arr = [];
              // 배열의 각 하위 항목을 변환하여 저장합니다.
              for (let i of this) {
                arr.push(i.toNormal());
              }
              return arr;
            }

            /**
             * @class ChecklistChildrenFactor
             * 개별 하위 항목을 관리하는 클래스입니다.
             */
            #ChecklistChildrenFactor = class {
              /**
               * @constructor
               * 주어진 JSON 데이터를 기반으로 ChecklistChildrenFactor 인스턴스를 초기화합니다.
               * @param {object} json - 하위 항목 데이터를 포함한 JSON 객체
               */
              constructor(json) {
                // 하위 항목의 제목을 초기화합니다.
                this.title = json.title;

                // 하위 항목의 내용을 초기화합니다.
                this.contents = json.contents;
              }

              /**
               * @method toNormal
               * 하위 항목 데이터를 일반 JSON 형식으로 변환합니다.
               * @returns {object} 변환된 JSON 객체
               */
              toNormal() {
                let obj = {};
                obj.title = this.title; // 제목을 저장
                obj.contents = this.contents; // 내용을 저장
                return obj;
              }
            }
          }
        }
      }
    }
  }

  /**
   * @class CoreSetting
   * 서비스 설정(CoreSetting)을 관리하는 클래스입니다.
   */
  #CoreSetting = class {
    /**
     * @constructor
     * 주어진 JSON 데이터를 기반으로 CoreSetting 인스턴스를 초기화합니다.
     * @param {object} json - 서비스 설정 데이터를 포함한 JSON 객체
     */
    constructor(json) {
      // 좌표(coordinates)를 초기화합니다.
      this.coordinates = new this.#Coordinates(json.coordinates);

      // 서비스 기간(period)을 초기화합니다.
      this.period = new this.#Period(json.period);

      // 서비스 일정(schedule)을 초기화합니다.
      this.schedule = new this.#Schedule(json.schedule);
    }

    /**
     * @method toNormal
     * 서비스 설정 데이터를 일반 JSON 형식으로 변환합니다.
     * @returns {object} 변환된 JSON 객체
     */
    toNormal() {
      let obj = {};
      obj.coordinates = this.coordinates.toNormal(); // 좌표 데이터를 변환하여 저장
      obj.period = this.period.toNormal(); // 기간 데이터를 변환하여 저장
      obj.schedule = this.schedule.toNormal(); // 일정 데이터를 변환하여 저장
      return obj;
    }

    /**
     * @class Period
     * 서비스 기간을 관리하는 클래스입니다.
     * Number 클래스를 확장하여 사용합니다.
     */
    #Period = class extends Number {
      /**
       * @constructor
       * 주어진 숫자를 기반으로 Period 인스턴스를 초기화합니다.
       * @param {number} num - 서비스 기간
       */
      constructor(num) {
        super(num);
        this.value = num; // 기간 값을 저장
      }

      /**
       * @method toNormal
       * 기간 데이터를 일반 숫자 형식으로 변환합니다.
       * @returns {number} 변환된 숫자
       */
      toNormal() {
        return Number(this.value); // 저장된 기간 값을 반환
      }
    }

    /**
     * @class Coordinates
     * 서비스 좌표(coordinates)를 관리하는 클래스입니다.
     */
    #Coordinates = class {
      /**
       * @constructor
       * 주어진 JSON 데이터를 기반으로 Coordinates 인스턴스를 초기화합니다.
       * @param {object} json - 좌표 데이터를 포함한 JSON 객체
       */
      constructor(json) {
        // x축 좌표 데이터를 초기화합니다.
        this.x = new this.#CoordinatesX(json.x);

        // y축 좌표 데이터를 초기화합니다.
        this.y = new this.#CoordinatesY(json.y);

        // z축 좌표 데이터를 초기화합니다.
        this.z = new this.#CoordinatesZ(json.z);
      }

      /**
       * @method toNormal
       * 좌표 데이터를 일반 JSON 형식으로 변환합니다.
       * @returns {object} 변환된 JSON 객체
       */
      toNormal() {
        let obj = {};
        obj.x = this.x.toNormal(); // x축 데이터를 변환하여 저장
        obj.y = this.y.toNormal(); // y축 데이터를 변환하여 저장
        obj.z = this.z.toNormal(); // z축 데이터를 변환하여 저장
        return obj;
      }

      /**
       * @class CoordinatesX
       * x축 좌표를 관리하는 클래스입니다.
       * Array 클래스를 확장하여 사용합니다.
       */
      #CoordinatesX = class extends Array {
        /**
         * @constructor
         * 주어진 JSON 데이터를 기반으로 CoordinatesX 인스턴스를 초기화합니다.
         * @param {object} json - x축 좌표 데이터를 포함한 JSON 객체
         */
        constructor(json) {
          super();
          this.push('M'); // M등급을 추가
          this.push('B'); // B등급을 추가
          this.push('P'); // P등급을 추가
          this.M = json.M; // M등급의 실제 값을 저장
          this.B = json.B; // B등급의 실제 값을 저장
          this.P = json.P; // P등급의 실제 값을 저장
        }

        /**
         * @method toNormal
         * x축 좌표 데이터를 일반 JSON 형식으로 변환합니다.
         * @returns {object} 변환된 JSON 객체
         */
        toNormal() {
          return {
            M: this.M, // M등급 데이터를 저장
            B: this.B, // B등급 데이터를 저장
            P: this.P // P등급 데이터를 저장
          };
        }
      }

      /**
       * @class CoordinatesY
       * y축 좌표를 관리하는 클래스입니다.
       * Array 클래스를 확장하여 사용합니다.
       */
      #CoordinatesY = class extends Array {
        /**
         * @constructor
         * 주어진 JSON 데이터를 기반으로 CoordinatesY 인스턴스를 초기화합니다.
         * @param {object} json - y축 좌표 데이터를 포함한 JSON 객체
         */
        constructor(json) {
          super();
          this.push("homeFurnishing"); // 홈퍼니싱을 추가
          this.push("homeStyling"); // 홈스타일링을 추가
          this.push("totalStyling"); // 토탈 스타일링을 추가
          this.push("extraStyling"); // 엑스트라 스타일링을 추가
          this.homeFurnishing = json.homeFurnishing; // 홈퍼니싱 데이터 저장
          this.homeStyling = json.homeStyling; // 홈스타일링 데이터 저장
          this.totalStyling = json.totalStyling; // 토탈 스타일링 데이터 저장
          this.extraStyling = json.extraStyling; // 엑스트라 스타일링 데이터 저장
        }

        /**
         * @method toNormal
         * y축 좌표 데이터를 일반 JSON 형식으로 변환합니다.
         * @returns {object} 변환된 JSON 객체
         */
        toNormal() {
          return {
            homeFurnishing: this.homeFurnishing, // 홈퍼니싱 데이터를 저장
            homeStyling: this.homeStyling, // 홈스타일링 데이터를 저장
            totalStyling: this.totalStyling, // 토탈 스타일링 데이터를 저장
            extraStyling: this.extraStyling // 엑스트라 스타일링 데이터를 저장
          };
        }
      }

      /**
       * @class CoordinatesZ
       * z축 좌표를 관리하는 클래스입니다.
       * Array 클래스를 확장하여 사용합니다.
       */
      #CoordinatesZ = class extends Array {
        /**
         * @constructor
         * 주어진 JSON 데이터를 기반으로 CoordinatesZ 인스턴스를 초기화합니다.
         * @param {object} json - z축 좌표 데이터를 포함한 JSON 객체
         */
        constructor(json) {
          super();
          this.push("online"); // 온라인 서비스를 추가
          this.push("offline"); // 오프라인 서비스를 추가
          this.online = json.online; // 온라인 데이터 저장
          this.offline = json.offline; // 오프라인 데이터 저장
        }

        /**
         * @method toNormal
         * z축 좌표 데이터를 일반 JSON 형식으로 변환합니다.
         * @returns {object} 변환된 JSON 객체
         */
        toNormal() {
          return {
            online: this.online, // 온라인 데이터를 저장
            offline: this.offline, // 오프라인 데이터를 저장
          };
        }
      }
    }

    /**
     * @class Schedule
     * 서비스 일정을 관리하는 클래스입니다.
     * Array 클래스를 확장하여 사용합니다.
     */
    #Schedule = class extends Array {
      /**
       * @constructor
       * 주어진 JSON 데이터를 기반으로 Schedule 인스턴스를 초기화합니다.
       * @param {Array} json - 일정 데이터를 포함한 JSON 배열
       */
      constructor(json) {
        super();
        // JSON 배열의 각 항목을 초기화합니다.
        for (let i of json) {
          this.push(new this.#ScheduleTask(i));
        }
      }

      /**
       * @method toNormal
       * 일정 데이터를 일반 JSON 형식으로 변환합니다.
       * @returns {Array} 변환된 JSON 배열
       */
      toNormal() {
        let arr = [];
        // 배열의 각 일정 항목을 변환하여 저장합니다.
        for (let i of this) {
          arr.push(i.toNormal());
        }
        return arr;
      }

      /**
       * @class ScheduleTask
       * 개별 일정 항목을 관리하는 클래스입니다.
       */
      #ScheduleTask = class {
        /**
         * @constructor
         * 주어진 JSON 데이터를 기반으로 ScheduleTask 인스턴스를 초기화합니다.
         * @param {object} json - 일정 항목 데이터를 포함한 JSON 객체
         */
        constructor(json) {
          this.title = json.title; // 일정 항목의 제목을 저장
          this.description = json.description; // 일정 항목의 설명을 저장
          this.color = json.color; // 일정 항목의 색상을 저장
          this.period = json.period; // 일정 항목의 기간을 저장
          this.order = json.order; // 일정 항목의 순서를 저장
        }

        /**
         * @method toNormal
         * 일정 항목 데이터를 일반 JSON 형식으로 변환합니다.
         * @returns {object} 변환된 JSON 객체
         */
        toNormal() {
          let obj = {};
          obj.title = this.title; // 제목을 저장
          obj.description = this.description; // 설명을 저장
          obj.color = this.color; // 색상을 저장
          obj.period = this.period; // 기간을 저장
          obj.order = this.order; // 순서를 저장
          return obj;
        }
      }
    }
  }
}

/**
 * @class Services
 * Service 객체를 담는 확장 배열 클래스입니다. Service 객체의 배열을 관리하고, 이를 다양한 형식으로 변환하는 기능을 제공합니다.
 * Array 클래스를 확장하여 사용합니다.
 */
class Services extends Array {
  
  /**
   * @method toNormal
   * Service 객체 배열을 일반 JSON 형식의 배열로 변환합니다.
   * @returns {Array} 변환된 JSON 배열
   */
  toNormal() {
    // 변환된 객체들을 담을 배열을 선언합니다.
    let tong;
    
    // 빈 배열로 초기화합니다.
    tong = [];
    
    // 현재 Services 배열에 있는 모든 Service 객체를 순회합니다.
    for (let i of this) {
      // 각 Service 객체를 일반 JSON 형식으로 변환한 후, tong 배열에 추가합니다.
      tong.push(i.toNormal());
    }
    
    // 변환된 JSON 객체들의 배열을 반환합니다.
    return tong;
  }

  /**
   * @method setting
   * Service 객체 배열의 setting 속성들을 배열로 반환합니다.
   * @returns {Array} 각 Service 객체의 setting 속성으로 이루어진 배열
   */
  get setting() {
    // Service 객체들의 setting 속성을 담을 배열을 선언합니다.
    let arr = [];
    
    // 현재 Services 배열에 있는 모든 Service 객체를 순회합니다.
    for (let i of this) {
      // 각 Service 객체의 setting 속성을 arr 배열에 추가합니다.
      arr.push(i.setting);
    }
    
    // setting 속성들의 배열을 반환합니다.
    return arr;
  }

  /**
   * @method toMatrix
   * Service 객체 배열을 행렬(Matrix) 형식의 배열로 변환합니다.
   * @returns {Array} 변환된 행렬 데이터의 배열
   */
  toMatrix() {
    // 변환된 행렬 데이터를 담을 배열을 선언합니다.
    let arr;
    
    // 빈 배열로 초기화합니다.
    arr = [];
    
    // 현재 Services 배열에 있는 모든 Service 객체를 순회합니다.
    for (let i of this) {
      // 각 Service 객체를 행렬 형식으로 변환한 후, arr 배열에 추가합니다.
      arr.push(i.toMatrix());
    }
    
    // 변환된 행렬 데이터를 담은 배열을 반환합니다.
    return arr;
  }
}

const withTools = function (Service) {
  return Service;
}

const withToolsArr = function (Services) {
  return Services;
}

module.exports = { ServiceMap, Service, Services, Tools: { withTools, withToolsArr } };
