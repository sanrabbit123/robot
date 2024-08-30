const ClientSampleData = {
  "name": "곽숙영",
  "phone": "010-7276-7524",
  "email": "suying75@gmail.com",
  "cliid": "c2302_aa59s",
  "requests": [
    {
      "request": {
        "timeline": new Date("2023-02-13T01:45:21.532Z"),
        "notionId": "",
        "budget": "2,000만원",
        "furniture": "전체 구매",
        "family": "고객님, 자녀3(대학생,고등학생, 초등학생)",
        "space": {
          "address": "서울 서초구 잠원로 166-17 (잠원동, 강변아파트) 2-502호",
          "contract": "전월세",
          "pyeong": 30,
          "spec": {
            "room": 3,
            "bathroom": 2,
            "valcony": false
          },
          "resident": {
            "living": false,
            "expected": new Date("2023-03-16T15:00:00.000Z")
          },
          "partial": {
            "boo": false,
            "pyeong": 0,
            "detail": ""
          },
          "naver": "511"
        },
        "etc": {
          "comment": "이사 가면서 안방, 거실, 고등학생 아이방 , 식탁까지 거의 모든 가구의 교체를 원해요. 구축이라 수납공간 확보가 가장 중요합니다.",
          "channel": "인터넷 검색"
        }
      },
      "analytics": {
        "response": {
          "status": "드랍",
          "action": "제안 피드백 완료",
          "outreason": [
            "가벼운 문의",
            "기간 임박"
          ],
          "kakao": false,
          "service": {
            "serid": "s2011_aa01s",
            "xValue": "B",
            "online": false
          },
          "designers": [],
          "possible": "낮음",
          "priority": "상",
          "memo": "",
          "target": "타겟"
        },
        "date": {
          "call": {
            "next": new Date(-5364692872000),
            "history": [
              {
                "date": new Date("2023-02-14T07:02:43.000Z"),
                "who": ""
              },
              {
                "date": new Date("2023-02-15T09:08:45.000Z"),
                "who": ""
              },
              {
                "date": new Date("2023-02-16T04:26:30.000Z"),
                "who": ""
              }
            ],
            "recommend": new Date(-5364692872000)
          },
          "space": {
            "precheck": new Date(-5364692872000),
            "empty": new Date("2023-03-16T15:00:00.000Z"),
            "movein": new Date("2023-04-06T15:00:00.000Z")
          },
          "calendar": {
            "call": {
              "mother": "clientCalendar",
              "id": ""
            },
            "precheck": {
              "mother": "clientCalendar",
              "id": ""
            },
            "empty": {
              "mother": "clientCalendar",
              "id": ""
            },
            "movein": {
              "mother": "clientCalendar",
              "id": ""
            }
          }
        },
        "picture": {
          "space": {
            "boo": false,
            "file": []
          },
          "prefer": {
            "boo": false,
            "file": []
          }
        },
        "proposal": [
          {
            "proid": "p2302_aa55s",
            "date": new Date("2023-02-16T10:25:08.015Z"),
            "contract": false
          }
        ],
        "session": []
      }
    }
  ]
}

/**
 * @fileoverview 이 파일은 Client 스키마를 정의하고, 기본값을 설정하는 JSON 생성기 함수를 포함하고 있습니다.
 * ClientMap 객체는 고객 데이터의 구조를 초기화하는 데 사용됩니다. 특히 requests 필드는 상담 문의 데이터를 배열로 저장하며,
 * 한 고객이 여러 번 문의한 경우 배열의 요소로 각 문의 데이터가 저장됩니다.
 */

const ClientMap = {
  /**
   * main 메서드는 Client 객체의 기본 구조를 초기화합니다.
   * @returns {Object} 초기화된 Client 객체의 기본 구조를 반환합니다.
   */
  main: function () {
    let dummy; // 초기화된 Client 객체를 저장할 변수를 선언합니다.
    dummy = {
      structure: { // Client 객체의 기본 구조를 정의합니다.
        name: "", // 고객의 이름을 저장할 필드입니다. 기본값은 빈 문자열입니다.
        phone: "", // 고객의 전화번호를 저장할 필드입니다. 기본값은 빈 문자열입니다.
        email: "", // 고객의 이메일을 저장할 필드입니다. 기본값은 빈 문자열입니다.
        cliid: "", // 고객 ID를 저장할 필드입니다. 기본값은 빈 문자열입니다.
        requests: [], // 고객의 상담 문의 데이터를 저장할 배열입니다. 기본값은 빈 배열입니다.
      },
    };
    return dummy; // 초기화된 Client 객체를 반환합니다.
  },

  /**
   * sub 메서드는 주어진 subject에 따라 Client 객체의 특정 부분을 초기화합니다.
   * 주어진 subject 값에 따라 적절한 기본 구조를 반환합니다.
   * @param {string} subject - 초기화할 Client 객체의 특정 부분을 지정합니다.
   * @returns {Object|null} 초기화된 객체를 반환하거나, 알 수 없는 subject일 경우 null을 반환합니다.
   */
  sub: function (subject) {
    let dummy = null; // 초기화된 객체를 저장할 변수를 선언합니다. 기본값은 null입니다.
    if (subject === "requests") {
      // subject가 "requests"일 경우, 상담 문의 데이터를 위한 기본 구조를 초기화합니다.
      dummy = {
        request: {
          timeline: new Date(1800, 0, 1), // 문의가 발생한 시간을 저장하는 필드입니다. 기본값은 1800-01-01입니다.
          notionId: "", // Notion과 같은 시스템에서 사용될 수 있는 ID를 저장하는 필드입니다. 기본값은 빈 문자열입니다.
          budget: "알 수 없음", // 상담 시의 예산을 저장하는 필드입니다. 기본값은 "알 수 없음"입니다.
          furniture: "알 수 없음", // 구매할 가구의 범위를 저장하는 필드입니다. 기본값은 "알 수 없음"입니다.
          family: "", // 가족 구성원 정보를 저장하는 필드입니다. 기본값은 빈 문자열입니다.
          space: { // 상담 대상 공간의 정보를 저장하는 필드입니다.
            address: "", // 공간의 주소를 저장하는 필드입니다. 기본값은 빈 문자열입니다.
            contract: "알 수 없음", // 계약 형태를 저장하는 필드입니다. 기본값은 "알 수 없음"입니다.
            pyeong: 0, // 공간의 평수를 저장하는 필드입니다. 기본값은 0입니다.
            spec: { // 공간의 세부 사양을 저장하는 필드입니다.
              room: 0, // 방의 개수를 저장하는 필드입니다. 기본값은 0입니다.
              bathroom: 0, // 화장실의 개수를 저장하는 필드입니다. 기본값은 0입니다.
              valcony: false, // 발코니 확장 여부를 저장하는 필드입니다. 기본값은 false입니다.
            },
            resident: { // 현재 거주 여부 및 입주 예정일을 저장하는 필드입니다.
              living: false, // 현재 거주 여부를 저장하는 필드입니다. 기본값은 false입니다.
              expected: new Date(1800, 0, 1), // 입주 예정일을 저장하는 필드입니다. 기본값은 1800-01-01입니다.
            },
            partial: { // 부분 시공에 대한 정보를 저장하는 필드입니다.
              boo: false, // 부분 시공 여부를 저장하는 필드입니다. 기본값은 false입니다.
              pyeong: 0, // 부분 시공 평수를 저장하는 필드입니다. 기본값은 0입니다.
              detail: "", // 부분 시공에 대한 상세 설명을 저장하는 필드입니다. 기본값은 빈 문자열입니다.
            }
          },
          etc: { // 기타 요청 사항을 저장하는 필드입니다.
            comment: "", // 고객의 추가 요청 사항을 저장하는 필드입니다. 기본값은 빈 문자열입니다.
            channel: "", // 고객이 어떻게 서비스를 알게 되었는지를 저장하는 필드입니다. 기본값은 빈 문자열입니다.
          },
        },
        analytics: { // 상담 데이터에 대한 분석 결과를 저장하는 필드입니다.
          response: {
            status: "응대중", // 상담 상태를 저장하는 필드입니다. 기본값은 "응대중"입니다.
            action: "1차 응대 예정", // 현재 진행 중인 액션을 저장하는 필드입니다. 기본값은 "1차 응대 예정"입니다.
            outreason: [], // 상담 종료 사유를 저장하는 필드입니다. 기본값은 빈 배열입니다.
            kakao: false, // 카카오톡 등록 여부를 저장하는 필드입니다. 기본값은 false입니다.
            service: {
              serid: "s2011_aa02s", // 서비스 ID를 저장하는 필드입니다. 기본값은 "s2011_aa02s"입니다.
              xValue: "B", // 서비스의 추가 정보를 저장하는 필드입니다. 기본값은 "B"입니다.
              online: false, // 온라인 서비스 여부를 저장하는 필드입니다. 기본값은 false입니다.
            },
            designers: [], // 참여한 디자이너 목록을 저장하는 필드입니다. 기본값은 빈 배열입니다.
            priority: "하", // 우선순위를 저장하는 필드입니다. 기본값은 "하"입니다.
            possible: "낮음", // 가능성 평가를 저장하는 필드입니다. 기본값은 "낮음"입니다.
            target: "해당 없음", // 타겟 여부를 저장하는 필드입니다. 기본값은 "해당 없음"입니다.
            memo: "", // 추가 메모를 저장하는 필드입니다. 기본값은 빈 문자열입니다.
          },
          date: { // 상담과 관련된 날짜 정보를 저장하는 필드입니다.
            call: {
              next: new Date(1800, 0, 1), // 다음 연락 예정일을 저장하는 필드입니다. 기본값은 1800-01-01입니다.
              history: [], // 이전 연락 기록을 저장하는 필드입니다. 기본값은 빈 배열입니다.
              recommend: new Date(1800, 0, 1), // 추천 날짜를 저장하는 필드입니다. 기본값은 1800-01-01입니다.
            },
            space: {
              precheck: new Date(1800, 0, 1), // 사전 점검 날짜를 저장하는 필드입니다. 기본값은 1800-01-01입니다.
              empty: new Date(1800, 0, 1), // 공간 비우기 날짜를 저장하는 필드입니다. 기본값은 1800-01-01입니다.
              movein: new Date(1800, 0, 1), // 입주 날짜를 저장하는 필드입니다. 기본값은 1800-01-01입니다.
            },
            calendar: { // 캘린더와 관련된 정보를 저장하는 필드입니다.
              call: {
                mother: "clientCalendar", // 캘린더의 모듈 이름을 저장하는 필드입니다. 기본값은 "clientCalendar"입니다.
                id: "", // 캘린더 ID를 저장하는 필드입니다. 기본값은 빈 문자열입니다.
              },
              precheck: {
                mother: "clientCalendar", // 사전 점검 캘린더의 모듈 이름을 저장하는 필드입니다. 기본값은 "clientCalendar"입니다.
                id: "", // 사전 점검 캘린더 ID를 저장하는 필드입니다. 기본값은 빈 문자열입니다.
              },
              empty: {
                mother: "clientCalendar", // 공간 비우기 캘린더의 모듈 이름을 저장하는 필드입니다. 기본값은 "clientCalendar"입니다.
                id: "", // 공간 비우기 캘린더 ID를 저장하는 필드입니다. 기본값은 빈 문자열입니다.
              },
              movein: {
                mother: "clientCalendar", // 입주 캘린더의 모듈 이름을 저장하는 필드입니다. 기본값은 "clientCalendar"입니다.
                id: "", // 입주 캘린더 ID를 저장하는 필드입니다. 기본값은 빈 문자열입니다.
              }
            },
          },
          picture: { // 상담과 관련된 사진 데이터를 저장하는 필드입니다.
            space: {
              boo: false, // 공간 사진 여부를 저장하는 필드입니다. 기본값은 false입니다.
              file: [], // 공간 사진 파일 리스트를 저장하는 필드입니다. 기본값은 빈 배열입니다.
            },
            prefer: {
              boo: false, // 선호 사진 여부를 저장하는 필드입니다. 기본값은 false입니다.
              file: [], // 선호 사진 파일 리스트를 저장하는 필드입니다. 기본값은 빈 배열입니다.
            },
          },
          proposal: [], // 제안서 데이터를 저장하는 필드입니다. 기본값은 빈 배열입니다.
          session: [] // 상담 세션 데이터를 저장하는 필드입니다. 기본값은 빈 배열입니다.
        },
      };
    } else if (subject === "analytics.date.history") {
      // subject가 "analytics.date.history"일 경우, 연락 기록 데이터를 위한 기본 구조를 초기화합니다.
      dummy = {
        date: new Date(1800, 0, 1), // 연락 날짜를 저장하는 필드입니다. 기본값은 1800-01-01입니다.
        who: "", // 연락한 사람을 저장하는 필드입니다. 기본값은 빈 문자열입니다.
      };
    } else if (subject === "analytics.picture.space.file") {
      // subject가 "analytics.picture.space.file"일 경우, 공간 사진 파일 데이터를 위한 기본 구조를 초기화합니다.
      dummy = {
        date: new Date(1800, 0, 1), // 파일 날짜를 저장하는 필드입니다. 기본값은 1800-01-01입니다.
        confirm: [], // 파일 확인 여부를 저장하는 필드입니다. 기본값은 빈 배열입니다.
        folderId: "" // 파일이 저장된 폴더 ID를 저장하는 필드입니다. 기본값은 빈 문자열입니다.
      };
    } else if (subject === "analytics.picture.prefer.file") {
      // subject가 "analytics.picture.prefer.file"일 경우, 선호 사진 파일 데이터를 위한 기본 구조를 초기화합니다.
      dummy = {
        date: new Date(1800, 0, 1), // 파일 날짜를 저장하는 필드입니다. 기본값은 1800-01-01입니다.
        confirm: [], // 파일 확인 여부를 저장하는 필드입니다. 기본값은 빈 배열입니다.
        folderId: "" // 파일이 저장된 폴더 ID를 저장하는 필드입니다. 기본값은 빈 문자열입니다.
      };
    } else if (subject === "analytics.picture.space.file.confirm") {
      // subject가 "analytics.picture.space.file.confirm"일 경우, 공간 사진 파일의 확인 데이터를 위한 기본 구조를 초기화합니다.
      dummy = {
        date: new Date(1800, 0, 1), // 파일 확인 날짜를 저장하는 필드입니다. 기본값은 1800-01-01입니다.
        who: "", // 파일을 확인한 사람을 저장하는 필드입니다. 기본값은 빈 문자열입니다.
      };
    } else if (subject === "analytics.picture.prefer.file.confirm") {
      // subject가 "analytics.picture.prefer.file.confirm"일 경우, 선호 사진 파일의 확인 데이터를 위한 기본 구조를 초기화합니다.
      dummy = {
        date: new Date(1800, 0, 1), // 파일 확인 날짜를 저장하는 필드입니다. 기본값은 1800-01-01입니다.
        who: "", // 파일을 확인한 사람을 저장하는 필드입니다. 기본값은 빈 문자열입니다.
      };
    } else if (subject === "analytics.proposal") {
      // subject가 "analytics.proposal"일 경우, 제안서 데이터를 위한 기본 구조를 초기화합니다.
      dummy = {
        proid: "", // 제안서 ID를 저장하는 필드입니다. 기본값은 빈 문자열입니다.
        date: new Date(1800, 0, 1), // 제안서 작성 날짜를 저장하는 필드입니다. 기본값은 1800-01-01입니다.
        contract: false, // 제안서의 계약 여부를 저장하는 필드입니다. 기본값은 false입니다.
      };
    }
    return dummy; // 초기화된 객체를 반환합니다.
  }
}

class Flow {
  constructor (matrix, position) {
    let tempObj, positionTarget;
    this.flow = [];
    for (let arr of matrix) {
      tempObj = {};
      tempObj.length = arr.length;
      tempObj.values = JSON.parse(JSON.stringify(arr));
      tempObj.position =[];
      for (let i = 0; i < arr.length; i++) {
        positionTarget = null;
        for (let obj of position) {
          if (obj.value === tempObj.values[i]) {
            positionTarget = obj;
            break;
          }
        }
        tempObj.position.push({
          value: tempObj.values[i],
          used: positionTarget === null ? [] : positionTarget.used,
        });
      }
      this.flow.push(tempObj);
    }
  }

  toNormal () {
    return this.value;
  }
}

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
 * @fileoverview 이 파일은 고객(Client) JSON 데이터를 처리하는 JavaScript 클래스를 정의합니다.
 * 이 클래스는 고객 데이터를 다루는 여러 메서드와 유틸리티를 포함하고 있습니다.
 */

class Client {
  /**
   * Client 클래스의 생성자입니다.
   * @param {Object} json - 초기화할 JSON 데이터를 입력받습니다.
   */
  constructor(json) {
    /**
     * 고객의 이름을 초기화합니다.
     * @type {string}
     */
    this.name = json.name;

    /**
     * 고객의 전화번호를 초기화합니다.
     * @type {string}
     */
    this.phone = json.phone;

    /**
     * 고객의 이메일을 초기화합니다.
     * @type {string}
     */
    this.email = json.email;

    /**
     * 고객 ID를 초기화합니다. 유효성을 검사하여 잘못된 ID일 경우 에러를 발생시킵니다.
     * @type {string}
     */
    this.cliid = this.#validateClientId(json.cliid);

    /**
     * 고객의 상담 문의 데이터를 초기화합니다.
     * @type {Array}
     */
    this.requests = this.#requestsMaker(json.requests);
  }

  /**
   * 주어진 고객 ID의 유효성을 검사합니다. 유효하지 않은 ID일 경우 에러를 발생시킵니다.
   * @param {string} rawId - 검사할 고객 ID입니다.
   * @returns {string} 유효한 고객 ID를 반환합니다.
   * @throws {Error} 유효하지 않은 고객 ID일 경우 에러를 발생시킵니다.
   */
  #validateClientId(rawId) {
    if (!/^c/.test(rawId) || rawId.length !== 11) {
      throw new Error("invalid client id");
    }
    return rawId;
  }

  /**
   * 가장 최신의 상담 문의 데이터를 반환합니다.
   * @returns {Object} 가장 최신의 상담 문의 데이터입니다.
   */
  latestRequest() {
    return this.requests[0];
  }

  /**
   * Client 객체를 JSON 형식으로 변환합니다.
   * @returns {Object} JSON 형식으로 변환된 객체입니다.
   */
  toJson() {
    return {
      name: this.name,
      phone: this.phone,
      email: this.email,
      cliid: this.cliid,
      requests: this.requests.toNormal(),
    };
  }

  /**
   * Client 객체를 일반적인 객체 형식으로 변환합니다.
   * @returns {Object} 일반적인 객체 형식으로 변환된 객체입니다.
   */
  toNormal() {
    return this.toJson();
  }

  /**
   * Client 객체를 JSON 문자열 형식으로 변환합니다.
   * @returns {string} JSON 문자열 형식으로 변환된 객체입니다.
   */
  toString() {
    return JSON.stringify(this.toJson(), null, 2);
  }

  /**
   * Client 객체를 JSON 문자열 형식으로 변환하여 반환합니다.
   * @returns {string} JSON 문자열 형식으로 변환된 객체입니다.
   */
  toDeath() {
    return this.toString();
  }

  /**
   * Client 객체를 JSON 문자열 형식으로 변환하여 반환합니다.
   * @returns {string} JSON 문자열 형식으로 변환된 객체입니다.
   */
  stringify() {
    return this.toString();
  }

  /**
   * 고객이 문의한 평수를 배열로 반환합니다.
   * @returns {Array<number>} 고객이 문의한 평수의 배열입니다.
   */
  returnPyeongArr() {
    let pyeongArr;
    pyeongArr = [];
    for (let obj of this.requests) {
      pyeongArr.push(obj.request.space.pyeong.value);
    }
    return pyeongArr;
  }

  /**
   * 상담 문의 데이터를 초기화하고, 배열 형태로 반환합니다.
   * @param {Array} requests - 초기화할 상담 문의 데이터 배열입니다.
   * @returns {Array} 초기화된 상담 문의 데이터 배열입니다.
   */
  #requestsMaker(requests) {
    let result = new this.#Requests();
    let requestInstance;
    for (let i of requests) {
      requestInstance = new this.#Request(i);
      result.push(requestInstance);
    }
    return result;
  }

  /**
   * 각 상담 문의 데이터를 처리하는 내부 클래스입니다.
   */
  #Request = class extends Array {
    /**
     * Request 클래스의 생성자입니다.
     * @param {Object} _request - 초기화할 상담 문의 데이터입니다.
     */
    constructor(_request) {
      super();
      const { request, analytics, proposal } = _request;

      /**
       * 상담 문의 데이터를 초기화합니다.
       * @type {Object}
       */
      this.request = new this.#WebRequest(request);

      /**
       * 상담 분석 데이터를 초기화합니다.
       * @type {Object}
       */
      this.analytics = new this.#HomeLiaisonAnalytics(analytics);

      this.push(this.request);
      this.push(this.analytics);
    }

    /**
     * 상담 대상 공간의 정보를 반환합니다.
     * @returns {Object} 상담 대상 공간 정보입니다.
     */
    get space() {
      return this.request.space;
    }

    /**
     * 상담 문의 데이터를 일반적인 객체 형식으로 변환합니다.
     * @returns {Object} 일반적인 객체 형식으로 변환된 상담 문의 데이터입니다.
     */
    toNormal() {
      let obj = {};
      obj.request = this.request.toNormal();
      obj.analytics = this.analytics.toNormal();
      return obj;
    }

    /**
     * 상담 분석 데이터를 처리하는 내부 클래스입니다.
     */
    #HomeLiaisonAnalytics = class {
      /**
       * HomeLiaisonAnalytics 클래스의 생성자입니다.
       * @param {Object} analytics - 초기화할 상담 분석 데이터입니다.
       */
      constructor(analytics) {
        this.response = new this.#Response(analytics.response);
        this.date = new this.#DateAnalytics(analytics.date);
        this.picture = new this.#Picture(analytics.picture);
        this.proposal = new this.#Proposal(analytics.proposal);
        this.session = new this.#Session(analytics.session);
      }

      /**
       * 상담 분석 데이터를 일반적인 객체 형식으로 변환합니다.
       * @returns {Object} 일반적인 객체 형식으로 변환된 상담 분석 데이터입니다.
       */
      toNormal() {
        let obj = {};
        obj.response = this.response.toNormal();
        obj.date = this.date.toNormal();
        obj.picture = this.picture.toNormal();
        obj.proposal = this.proposal.toNormal();
        obj.session = this.session.toNormal();
        return obj;
      }

      /**
       * 상담 세션 데이터를 처리하는 내부 클래스입니다.
       */
      #Session = class extends Array {
        /**
         * Session 클래스의 생성자입니다.
         * @param {Array} json - 초기화할 상담 세션 데이터입니다.
         */
        constructor(json) {
          super();
          for (let i of json) {
            this.push(i);
          }
        }

        /**
         * 상담 세션 데이터를 일반적인 객체 형식으로 변환합니다.
         * @returns {Array} 일반적인 객체 형식으로 변환된 상담 세션 데이터입니다.
         */
        toNormal() {
          let arr = [];
          for (let i of this) {
            arr.push(i);
          }
          return arr;
        }
      }

      /**
       * 상담 응답 데이터를 처리하는 내부 클래스입니다.
       */
      #Response = class {
        /**
         * Response 클래스의 생성자입니다.
         * @param {Object} response - 초기화할 상담 응답 데이터입니다.
         */
        constructor(response) {
          this.status = new Menu(response.status, [
            "드랍",
            "진행",
            "응대중",
            "장기",
          ], false);
          this.action = new Menu(response.action, [
            "1차 응대 예정",
            "1차 응대 후 대기",
            "스타일 체크 대기",
            "제안 발송 예정",
            "제안 피드백 예정",
            "피드백 부재중",
            "제안 피드백 완료",
            "부재중 알림 발송",
            "상세 설문 대기",
            "부재중 제안 발송",
            "피드백과 응대 예정",
            "자동 피드백 부재중",
            "피드백과 응대 완료",
            "디자이너 선택",
            "해당 없음",
          ], false);
          this.outreason = new Menu(response.outreason, [
            "연결 안 됨",
            "가벼운 문의",
            "고객 미션 미응답",
            "직접 진행",
            "고객 상황 변동",
            "가족 의견 불일치",
            "기간 임박",
            "장기 고객",
            "시공만 필요",
            "거주중 시공",
            "일단 견적 먼저",
            "시공 문제",
            "서비스 불일치",
            "타사 계약",
            "지역 이슈",
            "총 예산 문제",
            "디자인비 문제",
            "프로세스 문제",
            "디자이너 부족",
            "제안서 매력도",
          ], true);
          this.kakao = response.kakao;
          this.service = new this.#ProjectService(response.service);
          this.designers = new this.#PredictDesigners(response.designers);
          this.priority = new Menu(response.priority, [
            "상",
            "중",
            "하",
          ], false);
          this.possible = new Menu(response.possible, [
            "높음",
            "애매",
            "낮음",
          ], false);
          this.target = new Menu(response.target, [
            "타겟",
            "애매",
            "해당 없음",
          ], false);
          this.memo = response.memo;
        }

        /**
         * 상담 응답 데이터를 일반적인 객체 형식으로 변환합니다.
         * @returns {Object} 일반적인 객체 형식으로 변환된 상담 응답 데이터입니다.
         */
        toNormal = () => {
          let obj = {};
          obj.status = this.status.toNormal();
          obj.action = this.action.toNormal();
          obj.outreason = this.outreason.toNormal();
          obj.kakao = this.kakao;
          obj.service = this.service.toNormal();
          obj.designers = this.designers.toNormal();
          obj.priority = this.priority.toNormal();
          obj.possible = this.possible.toNormal();
          obj.target = this.target.toNormal();
          obj.memo = this.memo;
          return obj;
        }

        /**
         * 상담 응답 데이터를 처리하는 내부 클래스입니다.
         */
        #PredictDesigners = class extends Array {
          /**
           * PredictDesigners 클래스의 생성자입니다.
           * @param {Array} json - 초기화할 디자이너 데이터입니다.
           */
          constructor(json) {
            super();
            for (let i of json) {
              this.push(i);
            }
          }

          /**
           * 디자이너 데이터를 일반적인 객체 형식으로 변환합니다.
           * @returns {Array} 일반적인 객체 형식으로 변환된 디자이너 데이터입니다.
           */
          toNormal() {
            let arr = [];
            for (let i of this) {
              arr.push(i);
            }
            return arr;
          }
        }

        /**
         * 상담 서비스 데이터를 처리하는 내부 클래스입니다.
         */
        #ProjectService = class {
          /**
           * ProjectService 클래스의 생성자입니다.
           * @param {Object} json - 초기화할 서비스 데이터입니다.
           */
          constructor(json) {
            this.serid = json.serid;
            this.xValue = json.xValue;
            this.online = Boolean(json.online);
          }

          /**
           * 상담 서비스 데이터를 일반적인 객체 형식으로 변환합니다.
           * @returns {Object} 일반적인 객체 형식으로 변환된 상담 서비스 데이터입니다.
           */
          toNormal() {
            let obj = {};
            obj.serid = this.serid;
            obj.xValue = this.xValue;
            obj.online = this.online;
            return obj;
          }
        }
      }

      /**
       * 상담 제안 데이터를 처리하는 내부 클래스입니다.
       */
      #Proposal = class extends Array {
        /**
         * Proposal 클래스의 생성자입니다.
         * @param {Array} json - 초기화할 제안 데이터입니다.
         */
        constructor(json) {
          super();
          for (let i of json) {
            this.push(new this.#ProposalDetail(i));
          }
        }

        /**
         * 제안 데이터를 일반적인 객체 형식으로 변환합니다.
         * @returns {Array} 일반적인 객체 형식으로 변환된 제안 데이터입니다.
         */
        toNormal() {
          let arr = [];
          for (let i of this) {
            arr.push(i.toNormal());
          }
          return arr;
        }

        /**
         * 개별 제안 데이터를 처리하는 내부 클래스입니다.
         */
        #ProposalDetail = class {
          /**
           * ProposalDetail 클래스의 생성자입니다.
           * @param {Object} json - 초기화할 제안 데이터입니다.
           */
          constructor(json) {
            this.proid = json.proid;
            this.date = new DateParse(json.date);
            this.contract = json.contract;
          }

          /**
           * 개별 제안 데이터를 일반적인 객체 형식으로 변환합니다.
           * @returns {Object} 일반적인 객체 형식으로 변환된 제안 데이터입니다.
           */
          toNormal() {
            let obj = {};
            obj.proid = this.proid;
            obj.date = this.date.toNormal();
            obj.contract = this.contract;
            return obj;
          }
        }
      }

      /**
       * 상담 사진 데이터를 처리하는 내부 클래스입니다.
       */
      #Picture = class {
        /**
         * Picture 클래스의 생성자입니다.
         * @param {Object} picture - 초기화할 사진 데이터입니다.
         */
        constructor(picture) {
          this.space = new this.#Space(picture.space);
          this.prefer = new this.#Prefer(picture.prefer);
        }

        /**
         * 사진 데이터를 일반적인 객체 형식으로 변환합니다.
         * @returns {Object} 일반적인 객체 형식으로 변환된 사진 데이터입니다.
         */
        toNormal() {
          return {
            space: this.space.toNormal(),
            prefer: this.prefer.toNormal(),
          };
        }

        /**
         * 선호 사진 데이터를 처리하는 내부 클래스입니다.
         */
        #Prefer = class {
          /**
           * Prefer 클래스의 생성자입니다.
           * @param {Object} json - 초기화할 선호 사진 데이터입니다.
           */
          constructor(json) {
            this.boo = Boolean(json.boo);
            this.file = new this.#PreferPicture(json.file);
          }

          /**
           * 선호 사진 데이터를 일반적인 객체 형식으로 변환합니다.
           * @returns {Object} 일반적인 객체 형식으로 변환된 선호 사진 데이터입니다.
           */
          toNormal() {
            return {
              boo: this.boo,
              file: this.file.toNormal(),
            };
          }

          /**
           * 선호 사진 파일 데이터를 처리하는 내부 클래스입니다.
           */
          #PreferPicture = class extends Array {
            /**
             * PreferPicture 클래스의 생성자입니다.
             * @param {Array} json - 초기화할 선호 사진 파일 데이터입니다.
             */
            constructor(json) {
              super();
              for (let i of json) {
                this.push(new this.#PreferPictureDetail(i));
              }
            }

            /**
             * 선호 사진 파일 데이터를 일반적인 객체 형식으로 변환합니다.
             * @returns {Array} 일반적인 객체 형식으로 변환된 선호 사진 파일 데이터입니다.
             */
            toNormal() {
              const arr = [];
              for (let i of this) {
                arr.push(i.toNormal());
              }
              return arr;
            }

            /**
             * 개별 선호 사진 파일 데이터를 처리하는 내부 클래스입니다.
             */
            #PreferPictureDetail = class {
              /**
               * PreferPictureDetail 클래스의 생성자입니다.
               * @param {Object} json - 초기화할 선호 사진 파일 데이터입니다.
               */
              constructor(json) {
                this.date = new DateParse(json.date);
                this.confirm = new this.#Confirms(json.confirm);
                this.folderId = json.folderId;
              }

              /**
               * 개별 선호 사진 파일 데이터를 일반적인 객체 형식으로 변환합니다.
               * @returns {Object} 일반적인 객체 형식으로 변환된 선호 사진 파일 데이터입니다.
               */
              toNormal() {
                return {
                  date: this.date.toNormal(),
                  confirm: this.confirm.toNormal(),
                  folderId: this.folderId,
                };
              }

              /**
               * 선호 사진 파일의 확인 데이터를 처리하는 내부 클래스입니다.
               */
              #Confirms = class extends Array {
                /**
                 * Confirms 클래스의 생성자입니다.
                 * @param {Array} json - 초기화할 확인 데이터입니다.
                 */
                constructor(json) {
                  super();
                  for (let i of json) {
                    this.push(new this.#Confirm(i));
                  }
                }

                /**
                 * 확인 데이터를 일반적인 객체 형식으로 변환합니다.
                 * @returns {Array} 일반적인 객체 형식으로 변환된 확인 데이터입니다.
                 */
                toNormal() {
                  const arr = [];
                  for (let i of this) {
                    arr.push(i.toNormal());
                  }
                  return arr;
                }

                /**
                 * 개별 확인 데이터를 처리하는 내부 클래스입니다.
                 */
                #Confirm = class {
                  /**
                   * Confirm 클래스의 생성자입니다.
                   * @param {Object} json - 초기화할 확인 데이터입니다.
                   */
                  constructor(json) {
                    this.date = new DateParse(json.date);
                    this.who = json.who;
                  }

                  /**
                   * 개별 확인 데이터를 일반적인 객체 형식으로 변환합니다.
                   * @returns {Object} 일반적인 객체 형식으로 변환된 확인 데이터입니다.
                   */
                  toNormal() {
                    return {
                      date: this.date.toNormal(),
                      who: this.who,
                    };
                  }
                };
              };
            };
          };
        };

        /**
         * 공간 사진 데이터를 처리하는 내부 클래스입니다.
         */
        #Space = class {
          /**
           * Space 클래스의 생성자입니다.
           * @param {Object} json - 초기화할 공간 사진 데이터입니다.
           */
          constructor(json) {
            this.boo = Boolean(json.boo);
            this.file = new this.#SpacePicture(json.file);
          }

          /**
           * 공간 사진 데이터를 일반적인 객체 형식으로 변환합니다.
           * @returns {Object} 일반적인 객체 형식으로 변환된 공간 사진 데이터입니다.
           */
          toNormal() {
            return {
              boo: this.boo,
              file: this.file.toNormal(),
            };
          }

          /**
           * 공간 사진 파일 데이터를 처리하는 내부 클래스입니다.
           */
          #SpacePicture = class extends Array {
            /**
             * SpacePicture 클래스의 생성자입니다.
             * @param {Array} json - 초기화할 공간 사진 파일 데이터입니다.
             */
            constructor(json) {
              super();
              for (let i of json) {
                this.push(new this.#SpacePictureDetail(i));
              }
            }

            /**
             * 공간 사진 파일 데이터를 일반적인 객체 형식으로 변환합니다.
             * @returns {Array} 일반적인 객체 형식으로 변환된 공간 사진 파일 데이터입니다.
             */
            toNormal() {
              const arr = [];
              for (let i of this) {
                arr.push(i.toNormal());
              }
              return arr;
            }

            /**
             * 개별 공간 사진 파일 데이터를 처리하는 내부 클래스입니다.
             */
            #SpacePictureDetail = class {
              /**
               * SpacePictureDetail 클래스의 생성자입니다.
               * @param {Object} json - 초기화할 공간 사진 파일 데이터입니다.
               */
              constructor(json) {
                this.date = new DateParse(json.date);
                this.confirm = new this.#Confirms(json.confirm);
                this.folderId = json.folderId;
              }

              /**
               * 개별 공간 사진 파일 데이터를 일반적인 객체 형식으로 변환합니다.
               * @returns {Object} 일반적인 객체 형식으로 변환된 공간 사진 파일 데이터입니다.
               */
              toNormal() {
                return {
                  date: this.date.toNormal(),
                  confirm: this.confirm.toNormal(),
                  folderId: this.folderId,
                };
              }

              /**
               * 공간 사진 파일의 확인 데이터를 처리하는 내부 클래스입니다.
               */
              #Confirms = class extends Array {
                /**
                 * Confirms 클래스의 생성자입니다.
                 * @param {Array} json - 초기화할 확인 데이터입니다.
                 */
                constructor(json) {
                  super();
                  for (let i of json) {
                    this.push(new this.#Confirm(i));
                  }
                }

                /**
                 * 확인 데이터를 일반적인 객체 형식으로 변환합니다.
                 * @returns {Array} 일반적인 객체 형식으로 변환된 확인 데이터입니다.
                 */
                toNormal() {
                  const arr = [];
                  for (let i of this) {
                    arr.push(i.toNormal());
                  }
                  return arr;
                }

                /**
                 * 개별 확인 데이터를 처리하는 내부 클래스입니다.
                 */
                #Confirm = class {
                  /**
                   * Confirm 클래스의 생성자입니다.
                   * @param {Object} json - 초기화할 확인 데이터입니다.
                   */
                  constructor(json) {
                    this.date = new DateParse(json.date);
                    this.who = json.who;
                  }

                  /**
                   * 개별 확인 데이터를 일반적인 객체 형식으로 변환합니다.
                   * @returns {Object} 일반적인 객체 형식으로 변환된 확인 데이터입니다.
                   */
                  toNormal() {
                    return {
                      date: this.date.toNormal(),
                      who: this.who,
                    };
                  }
                };
              };
            };
          };
        };
      }

      /**
       * 상담 날짜 데이터를 처리하는 내부 클래스입니다.
       */
      #DateAnalytics = class {
        /**
         * DateAnalytics 클래스의 생성자입니다.
         * @param {Object} date - 초기화할 날짜 데이터입니다.
         */
        constructor(date) {
          this.call = new this.#DateCall(date.call);
          this.space = new this.#DateSpace(date.space);
          this.calendar = new this.#DateCalendar(date.calendar);
        }

        /**
         * 날짜 데이터를 일반적인 객체 형식으로 변환합니다.
         * @returns {Object} 일반적인 객체 형식으로 변환된 날짜 데이터입니다.
         */
        toNormal() {
          return {
            call: this.call.toNormal(),
            space: this.space.toNormal(),
            calendar: this.calendar.toNormal(),
          };
        }

        /**
         * 캘린더 관련 날짜 데이터를 처리하는 내부 클래스입니다.
         */
        #DateCalendar = class {
          /**
           * DateCalendar 클래스의 생성자입니다.
           * @param {Object} json - 초기화할 캘린더 데이터입니다.
           */
          constructor(json) {
            this.call = new this.#Calendar(json.call);
            this.precheck = new this.#Calendar(json.precheck);
            this.empty = new this.#Calendar(json.empty);
            this.movein = new this.#Calendar(json.movein);
          }

          /**
           * 캘린더 데이터를 일반적인 객체 형식으로 변환합니다.
           * @returns {Object} 일반적인 객체 형식으로 변환된 캘린더 데이터입니다.
           */
          toNormal() {
            return {
              call: this.call.toNormal(),
              precheck: this.precheck.toNormal(),
              empty: this.empty.toNormal(),
              movein: this.movein.toNormal(),
            };
          }

          /**
           * 개별 캘린더 데이터를 처리하는 내부 클래스입니다.
           */
          #Calendar = class {
            /**
             * Calendar 클래스의 생성자입니다.
             * @param {Object} json - 초기화할 캘린더 데이터입니다.
             */
            constructor(json) {
              this.mother = json.mother;
              this.id = json.id;
            }

            /**
             * 개별 캘린더 데이터를 일반적인 객체 형식으로 변환합니다.
             * @returns {Object} 일반적인 객체 형식으로 변환된 캘린더 데이터입니다.
             */
            toNormal() {
              return {
                mother: this.mother,
                id: this.id,
              };
            }
          };
        };

        /**
         * 공간 관련 날짜 데이터를 처리하는 내부 클래스입니다.
         */
        #DateSpace = class {
          /**
           * DateSpace 클래스의 생성자입니다.
           * @param {Object} json - 초기화할 공간 날짜 데이터입니다.
           */
          constructor(json) {
            this.precheck = new DateParse(json.precheck);
            this.empty = new DateParse(json.empty);
            this.movein = new DateParse(json.movein);
          }

          /**
           * 공간 날짜 데이터를 일반적인 객체 형식으로 변환합니다.
           * @returns {Object} 일반적인 객체 형식으로 변환된 공간 날짜 데이터입니다.
           */
          toNormal() {
            return {
              precheck: this.precheck.toNormal(),
              empty: this.empty.toNormal(),
              movein: this.movein.toNormal(),
            };
          }
        };

        /**
         * 연락 관련 날짜 데이터를 처리하는 내부 클래스입니다.
         */
        #DateCall = class {
          /**
           * DateCall 클래스의 생성자입니다.
           * @param {Object} json - 초기화할 연락 날짜 데이터입니다.
           */
          constructor(json) {
            this.next = new DateParse(json.next);
            this.history = new this.#DateCallHistory(json.history);
            this.recommend = new DateParse(json.recommend);
          }

          /**
           * 연락 날짜 데이터를 일반적인 객체 형식으로 변환합니다.
           * @returns {Object} 일반적인 객체 형식으로 변환된 연락 날짜 데이터입니다.
           */
          toNormal() {
            return {
              next: this.next.toNormal(),
              history: this.history.toNormal(),
              recommend: this.recommend.toNormal(),
            };
          }

          /**
           * 연락 기록 데이터를 처리하는 내부 클래스입니다.
           */
          #DateCallHistory = class extends Array {
            /**
             * DateCallHistory 클래스의 생성자입니다.
             * @param {Array} json - 초기화할 연락 기록 데이터입니다.
             */
            constructor(json) {
              super();
              for (let i of json) {
                this.push(new this.#DateCallHistoryFactor(i));
              }
            }

            /**
             * 연락 기록 데이터를 일반적인 객체 형식으로 변환합니다.
             * @returns {Array} 일반적인 객체 형식으로 변환된 연락 기록 데이터입니다.
             */
            toNormal() {
              const arr = [];
              for (let i of this) {
                arr.push(i.toNormal());
              }
              return arr;
            }

            /**
             * 개별 연락 기록 데이터를 처리하는 내부 클래스입니다.
             */
            #DateCallHistoryFactor = class {
              /**
               * DateCallHistoryFactor 클래스의 생성자입니다.
               * @param {Object} json - 초기화할 연락 기록 데이터입니다.
               */
              constructor(json) {
                this.date = new DateParse(json.date);
                this.who = json.who;
              }

              /**
               * 개별 연락 기록 데이터를 일반적인 객체 형식으로 변환합니다.
               * @returns {Object} 일반적인 객체 형식으로 변환된 연락 기록 데이터입니다.
               */
              toNormal() {
                return {
                  date: this.date.toNormal(),
                  who: this.who,
                };
              }
            };
          };
        };
      }
    }

    /**
     * 상담 요청 데이터를 처리하는 내부 클래스입니다.
     */
    #WebRequest = class {
      /**
       * WebRequest 클래스의 생성자입니다.
       * @param {Object} request - 초기화할 상담 요청 데이터입니다.
       */
      constructor(request) {
        this.timeline = new DateParse(request.timeline);
        this.notionId = request.notionId;
        this.budget = new Menu(request.budget, [
          '500만원 이하', '1,000만원', '1,500만원', '2,000만원',
          '2,500만원', '3,000만원', '3,500만원', '4,000만원',
          '4,500만원', '5,000만원 이상', '6,000만원 이상',
          '7,000만원 이상', '8,000만원 이상', '9,000만원 이상',
          '1억원 이상', '1억 5,000만원 이상', '2억원 이상',
          '3억원 이상', '5억원 이상', '10억원 이상',
        ], false);
        this.family = new this.#Family(request.family);
        this.furniture = new Menu(request.furniture, [
          "재배치", "일부 구매", "전체 구매"
        ], false);
        this.space = new this.#Space(request.space);
        this.etc = {};
        this.etc.comment = request.etc.comment;
        this.etc.channel = request.etc.channel;
      }

      /**
       * 상담 요청 데이터를 일반적인 객체 형식으로 변환합니다.
       * @returns {Object} 일반적인 객체 형식으로 변환된 상담 요청 데이터입니다.
       */
      toNormal() {
        let obj = {};
        obj.timeline = this.timeline.toNormal();
        obj.notionId = this.notionId;
        obj.budget = this.budget.toNormal();
        obj.family = this.family.toNormal();
        obj.furniture = this.furniture.toNormal();
        obj.space = this.space.toNormal();
        obj.etc = this.etc;
        return obj;
      }

      /**
       * 가족 정보를 처리하는 내부 클래스입니다.
       */
      #Family = class {
        /**
         * Family 클래스의 생성자입니다.
         * @param {string} rawString - 초기화할 가족 정보 문자열입니다.
         */
        constructor(rawString) {
          this.raw = rawString;
          this.value = rawString;
        }

        /**
         * 가족 정보를 일반적인 객체 형식으로 변환합니다.
         * @returns {string} 가족 정보 문자열입니다.
         */
        toNormal() {
          return this.value;
        }
      }

      /**
       * 상담 공간 정보를 처리하는 내부 클래스입니다.
       */
      #Space = class {
        /**
         * Space 클래스의 생성자입니다.
         * @param {Object} space - 초기화할 상담 공간 데이터입니다.
         */
        constructor(space) {
          this.address = new Address(space.address);
          this.contract = new Menu(space.contract, ['전월세', '자가'], false);
          this.pyeong = new this.#Pyeong(space.pyeong);
          this.naver = space.naver;
          this.spec = new this.#SpaceSpec(space.spec);
          this.resident = new this.#Resident(space.resident);
          this.partial = new this.#Partial(space.partial);
        }

        /**
         * 상담 공간 데이터를 일반적인 객체 형식으로 변환합니다.
         * @returns {Object} 일반적인 객체 형식으로 변환된 상담 공간 데이터입니다.
         */
        toNormal() {
          let obj = {};
          obj.address = this.address.toNormal();
          obj.contract = this.contract.toNormal();
          obj.pyeong = this.pyeong.toNormal();
          obj.naver = this.naver;
          obj.spec = this.spec.toNormal();
          obj.resident = this.resident.toNormal();
          obj.partial = this.partial.toNormal();
          return obj;
        }

        /**
         * 공간 사양 정보를 처리하는 내부 클래스입니다.
         */
        #SpaceSpec = class {
          /**
           * SpaceSpec 클래스의 생성자입니다.
           * @param {Object} spec - 초기화할 공간 사양 데이터입니다.
           */
          constructor(spec) {
            this.room = Number(spec.room);
            this.bathroom = Number(spec.bathroom);
            this.valcony = Boolean(spec.valcony);
          }

          /**
           * 공간 사양 데이터를 일반적인 객체 형식으로 변환합니다.
           * @returns {Object} 일반적인 객체 형식으로 변환된 공간 사양 데이터입니다.
           */
          toNormal() {
            let obj = {};
            obj.room = this.room;
            obj.bathroom = this.bathroom;
            obj.valcony = this.valcony;
            return obj;
          }

          /**
           * 공간 사양 데이터를 메시지 형식으로 변환합니다.
           * @returns {string} 메시지 형식으로 변환된 공간 사양 데이터입니다.
           */
          toMessage() {
            return `방 ${this.room}개${this.room === 4 ? " 이상" : ""} / 화장실 ${this.bathroom}개${this.bathroom === 3 ? " 이상" : ""} / 발코니 확장${(this.valcony ? "" : " 없음")}`;
          }
        }

        /**
         * 거주자 정보를 처리하는 내부 클래스입니다.
         */
        #Resident = class {
          /**
           * Resident 클래스의 생성자입니다.
           * @param {Object} resident - 초기화할 거주자 데이터입니다.
           */
          constructor(resident) {
            this.living = Boolean(resident.living);
            this.expected = new DateParse(resident.expected);
          }

          /**
           * 거주자 데이터를 일반적인 객체 형식으로 변환합니다.
           * @returns {Object} 일반적인 객체 형식으로 변환된 거주자 데이터입니다.
           */
          toNormal() {
            let obj = {};
            obj.living = this.living;
            obj.expected = this.expected.toNormal();
            return obj;
          }
        }

        /**
         * 부분 시공 정보를 처리하는 내부 클래스입니다.
         */
        #Partial = class {
          /**
           * Partial 클래스의 생성자입니다.
           * @param {Object} json - 초기화할 부분 시공 데이터입니다.
           */
          constructor(json) {
            this.boo = json.boo;
            this.pyeong = new this.#Pyeong(json.pyeong);
            this.detail = json.detail;
          }

          /**
           * 부분 시공 데이터를 일반적인 객체 형식으로 변환합니다.
           * @returns {Object} 일반적인 객체 형식으로 변환된 부분 시공 데이터입니다.
           */
          toNormal() {
            let obj = {};
            obj.boo = this.boo;
            obj.pyeong = this.pyeong.toNormal();
            obj.detail = this.detail;
            return obj;
          }

          /**
           * 평수 데이터를 처리하는 내부 클래스입니다.
           */
          #Pyeong = class {
            /**
             * Pyeong 클래스의 생성자입니다.
             * @param {number} rawNumber - 초기화할 평수 값입니다.
             */
            constructor(rawNumber) {
              this.raw = rawNumber;
              this.value = rawNumber;
            }

            /**
             * 평수 데이터를 일반적인 객체 형식으로 변환합니다.
             * @returns {number} 일반적인 객체 형식으로 변환된 평수 값입니다.
             */
            toNormal() {
              return this.value;
            }

            /**
             * 평수 데이터를 메시지 형식으로 변환합니다.
             * @returns {string} 메시지 형식으로 변환된 평수 값입니다.
             */
            toMessage() {
              return String(this.value) + "평";
            }
          }
        }

        /**
         * 평수 데이터를 처리하는 내부 클래스입니다.
         */
        #Pyeong = class {
          /**
           * Pyeong 클래스의 생성자입니다.
           * @param {number} rawNumber - 초기화할 평수 값입니다.
           */
          constructor(rawNumber) {
            this.raw = rawNumber;
            this.value = rawNumber;
          }

          /**
           * 평수 데이터를 일반적인 객체 형식으로 변환합니다.
           * @returns {number} 일반적인 객체 형식으로 변환된 평수 값입니다.
           */
          toNormal() {
            return this.value;
          }

          /**
           * 평수 데이터를 메시지 형식으로 변환합니다.
           * @returns {string} 메시지 형식으로 변환된 평수 값입니다.
           */
          toMessage() {
            return String(this.value) + "평";
          }
        }
      }
    }
  }

  /**
   * 여러 상담 요청 데이터를 처리하는 내부 클래스입니다.
   */
  #Requests = class extends Array {
    /**
     * 상담 요청 데이터를 일반적인 객체 형식으로 변환합니다.
     * @returns {Array} 일반적인 객체 형식으로 변환된 상담 요청 데이터 배열입니다.
     */
    toNormal() {
      let arr = [];
      for (let i = 0; i < this.length; i++) {
        arr.push(this[i].toNormal());
      }
      return arr;
    }
  }
}

/**
 * @fileoverview 이 파일은 고객 인스턴스를 담는 배열 클래스인 Clients를 정의합니다.
 * 이 클래스는 여러 고객(Client) 객체를 배열 형태로 관리하고, 다양한 유틸리티 메서드를 제공합니다.
 */

 /**
  * Clients 클래스는 고객 객체들을 배열로 관리합니다.
  * @extends {Array}
  */
 class Clients extends Array {

  /**
   * 모든 고객의 가장 최신 상담 요청을 가져옵니다.
   * @returns {Array<Object>} 모든 고객의 가장 최신 상담 요청을 담은 배열을 반환합니다.
   */
  latestRequests() {
    let arr = []; // 결과를 저장할 배열을 초기화합니다.
    for (let i of this) { // Clients 배열의 각 고객(Client) 객체를 순회합니다.
      arr.push(i.latestRequest()); // 각 고객의 최신 상담 요청을 배열에 추가합니다.
    }
    return arr; // 최신 상담 요청 배열을 반환합니다.
  }

  /**
   * 모든 고객의 상담 요청들을 하나의 배열로 모읍니다.
   * @returns {Array<Object>} 모든 상담 요청을 담은 배열을 반환합니다.
   */
  getRequests() {
    let arr = []; // 결과를 저장할 배열을 초기화합니다.
    let tempArr; // 각 고객의 상담 요청을 임시로 저장할 변수를 선언합니다.
    for (let i of this) { // Clients 배열의 각 고객(Client) 객체를 순회합니다.
      tempArr = i.requests; // 현재 고객의 상담 요청 배열을 가져옵니다.
      for (let j of tempArr) { // 해당 고객의 각 상담 요청을 순회합니다.
        arr.push(j); // 상담 요청을 결과 배열에 추가합니다.
      }
    }
    return arr; // 모든 상담 요청이 담긴 배열을 반환합니다.
  }

  /**
   * 모든 고객의 상담 요청들을 반환하는 getter입니다.
   * @returns {Array<Object>} 모든 상담 요청을 담은 배열을 반환합니다.
   */
  get requests() {
    return this.getRequests(); // getRequests 메서드를 호출하여 상담 요청 배열을 반환합니다.
  }

  /**
   * 모든 고객의 이름을 콤마로 구분하여 반환합니다.
   * @returns {string} 모든 고객의 이름을 콤마로 구분하여 연결한 문자열을 반환합니다.
   */
  get name() {
    let arr = []; // 결과를 저장할 배열을 초기화합니다.
    for (let i of this) { // Clients 배열의 각 고객(Client) 객체를 순회합니다.
      arr.push(i.name); // 각 고객의 이름을 배열에 추가합니다.
    }
    return arr.join(','); // 배열의 이름들을 콤마로 구분하여 하나의 문자열로 연결합니다.
  }

  /**
   * 모든 고객 객체를 일반적인 객체 형식으로 변환합니다.
   * @returns {Array<Object>} 모든 고객 객체를 일반적인 객체 형식으로 변환한 배열을 반환합니다.
   */
  toNormal() {
    let tong; // 변환된 객체를 저장할 변수를 선언합니다.
    tong = []; // 변환된 객체들을 담을 배열을 초기화합니다.
    for (let i of this) { // Clients 배열의 각 고객(Client) 객체를 순회합니다.
      tong.push(i.toNormal()); // 각 고객 객체를 일반적인 객체 형식으로 변환하여 배열에 추가합니다.
    }
    return tong; // 변환된 객체 배열을 반환합니다.
  }
}

/**
 * @fileoverview 이 파일은 고객(Client) 클래스와 고객 배열(Clients) 클래스에 유용한 메서드를 추가하는 함수들을 정의합니다.
 * 각 메서드는 고객 데이터를 다루기 쉽게 하기 위한 도구 역할을 합니다.
 */

/**
 * ClientTypeCases 클래스는 고객 요청 유형에 따라 데이터를 처리하는 클래스입니다.
 * @extends {Array}
 */
class ClientTypeCases extends Array {
  
  /**
   * 주어진 고객의 요청 유형을 파싱하여 해당하는 유형을 반환합니다.
   * @param {Object} client - 요청 유형을 파싱할 고객 객체입니다.
   * @returns {Array<Object>} 파싱된 유형과 일치하는 객체들을 반환합니다.
   */
  parsingCases(client) {
    const requestTypes = client.getType(); // 고객의 요청 유형을 가져옵니다.
    let arr = [], result = []; // 유형과 일치하는 객체를 저장할 배열을 초기화합니다.
    for (let i of requestTypes) { // 각 요청 유형을 순회하며 처리합니다.
      arr.push(`${i.budget.type}_${i.address.type}_${i.pyeong.type}_${i.contract.type}_${i.living.type}`); // 각 유형을 문자열로 결합하여 배열에 추가합니다.
    }
    for (let i of arr) { // 결합된 문자열을 순회하며 처리합니다.
      for (let obj of this) { // ClientTypeCases 배열의 각 객체를 순회합니다.
        if (obj.name === i) { // 문자열이 일치하는 경우 해당 객체를 결과 배열에 추가합니다.
          result.push(obj);
        }
      }
    }
    return result; // 결과 배열을 반환합니다.
  }

  /**
   * 주어진 고객의 요청 유형에 따라 가장 최근의 제안 ID를 반환합니다.
   * @param {Object} client - 요청 유형을 파싱할 고객 객체입니다.
   * @returns {string|null} 가장 최근의 제안 ID를 반환합니다.
   */
  parsingProid(client) {
    const caseArray = this.parsingCases(client); // 고객의 요청 유형을 파싱하여 일치하는 객체들을 가져옵니다.
    let targetProid;

    targetProid = null; // 초기 값으로 null을 설정합니다.

    for (let i = 0; i < caseArray.length; i++) { // 파싱된 각 케이스를 순회하며 처리합니다.
      caseArray[caseArray.length - 1 - i].proidArr.sort(); // 각 케이스의 proidArr을 정렬합니다.
      caseArray[caseArray.length - 1 - i].contractArr.sort(); // 각 케이스의 contractArr을 정렬합니다.
      for (let j = 0; j < caseArray[caseArray.length - 1 - i].proidArr.length; j++) { // 정렬된 proidArr을 순회합니다.
        targetProid = caseArray[caseArray.length - 1 - i].proidArr[j]; // 가장 최근의 제안 ID를 설정합니다.
      }
      for (let j = 0; j < caseArray[caseArray.length - 1 - i].contractArr.length; j++) { // 정렬된 contractArr을 순회합니다.
        targetProid = caseArray[caseArray.length - 1 - i].contractArr[j]; // 가장 최근의 계약 ID를 설정합니다.
      }
    }

    return targetProid; // 최종적으로 설정된 제안 ID를 반환합니다.
  }
}

/**
 * ClientTypes 클래스는 여러 고객의 요청 유형을 관리하는 클래스입니다.
 * @extends {Array}
 */
class ClientTypes extends Array {

  /**
   * 모든 고객의 요청 유형을 결합하여 반환합니다.
   * @returns {Array<string>} 결합된 유형 문자열 배열을 반환합니다.
   */
  getCompositionWords() {
    let arr = []; // 결과를 저장할 배열을 초기화합니다.
    for (let i of this) { // 각 고객의 요청 유형을 순회합니다.
      arr.push(`${i.budget.type}_${i.address.type}_${i.pyeong.type}_${i.contract.type}_${i.living.type}`); // 각 유형을 결합하여 배열에 추가합니다.
    }
    return arr; // 결합된 유형 배열을 반환합니다.
  }

  /**
   * 고객의 요청 유형을 케이스별로 정리하여 반환합니다.
   * @param {Array<Object>|null} projects - 프로젝트 배열을 입력받아 프로젝트 ID와 계약 여부를 포함할 수 있습니다.
   * @returns {ClientTypeCases} 유형별로 정리된 ClientTypeCases 객체를 반환합니다.
   */
  getTypeCases(projects = null) {
    const typeSet = Array.from(new Set(this.getCompositionWords())); // 중복을 제거한 유형 문자열 배열을 생성합니다.
    typeSet.sort((a, b) => { // 예산 기준으로 유형 배열을 정렬합니다.
      return Number(a.split("_")[0]) - Number(b.split("_")[0]);
    });
    let resultArr, cliidArr, tempObj, tempArr, proidArr, contractArr;

    resultArr = new ClientTypeCases(); // 결과를 저장할 ClientTypeCases 객체를 초기화합니다.

    for (let i of typeSet) { // 각 유형 문자열을 순회하며 처리합니다.
      tempObj = { name: i, case: {} }; // 임시 객체를 생성합니다.
      tempArr = i.split('_'); // 유형 문자열을 '_'로 분리합니다.
      tempObj.case.budget = Number(tempArr[0]); // 예산 유형을 설정합니다.
      tempObj.case.address = tempArr[1]; // 주소 유형을 설정합니다.
      tempObj.case.pyeong = { from: Number(tempArr[2].split(" ~ ")[0]), to: Number(tempArr[2].split(" ~ ")[1]) }; // 평수 범위를 설정합니다.
      tempObj.case.contract = tempArr[3]; // 계약 유형을 설정합니다.
      tempObj.case.living = tempArr[4] === "거주중"; // 거주 여부를 설정합니다.
      cliidArr = []; // 고객 ID 배열을 초기화합니다.
      for (let j of this) { // 모든 고객을 순회하며 처리합니다.
        if (i === (`${j.budget.type}_${j.address.type}_${j.pyeong.type}_${j.contract.type}_${j.living.type}`)) { // 유형이 일치하는 경우
          cliidArr.push(j.cliid); // 고객 ID를 배열에 추가합니다.
        }
      }
      tempObj.cliidArr = cliidArr; // 고객 ID 배열을 임시 객체에 설정합니다.
      if (projects !== null) { // 프로젝트가 존재하는 경우
        proidArr = [];
        contractArr = [];
        for (let p of projects) { // 각 프로젝트를 순회하며 처리합니다.
          if (cliidArr.includes(p.cliid)) { // 프로젝트의 고객 ID가 유형에 포함된 경우
            proidArr.push(p.proid); // 제안 ID를 배열에 추가합니다.
            if (/^d/.test(p.desid)) { // 계약 ID가 존재하는 경우
              contractArr.push(p.proid); // 계약된 제안 ID를 배열에 추가합니다.
            }
          }
        }
        tempObj.proidArr = proidArr; // 제안 ID 배열을 설정합니다.
        tempObj.contractArr = contractArr; // 계약된 제안 ID 배열을 설정합니다.
      }
      resultArr.push(tempObj); // 임시 객체를 결과 배열에 추가합니다.
    }

    return resultArr; // 최종 결과 배열을 반환합니다.
  }
}

/**
 * ClientType 함수는 고객 데이터를 분석하여 유형을 지정합니다.
 * @param {Object} obj - 분석할 고객 데이터를 포함한 객체입니다.
 */
const ClientType = function (obj) {

  /**
   * 예산 범위를 분석하여 유형을 반환하는 함수입니다.
   * @param {number} number - 분석할 예산 값입니다.
   * @returns {number} 예산 유형을 반환합니다.
   */
  const budgetTypes = function (number) {
    if (number <= 500) {
      return 500;
    } else if (number > 500 && number < 1500) {
      return 1000;
    } else if (number >= 1500 && number < 2000) {
      return 1500;
    } else if (number >= 2000 && number < 3000) {
      return 2000;
    } else if (number >= 3000 && number < 4000) {
      return 3000;
    } else if (number >= 4000 && number < 5000) {
      return 4000;
    } else {
      return 5000;
    }
  }

  /**
   * 주소를 분석하여 지역 유형을 반환하는 함수입니다.
   * @param {Array<string>} arr - 주소를 분석할 배열입니다.
   * @returns {string} 지역 유형을 반환합니다.
   */
  const addressTypes = function (arr) {
    if ((new RegExp("^서울")).test(arr[0])) {
      return "서울";
    } else if ((new RegExp("^서울")).test(arr[0])) {
      return "수도권";
    } else if ((new RegExp("^서울")).test(arr[0])) {
      return "수도권";
    } else {
      return "지방";
    }
  }

  /**
   * 평수 범위를 분석하여 유형을 반환하는 함수입니다.
   * @param {number} number - 분석할 평수 값입니다.
   * @returns {string} 평수 범위 유형을 반환합니다.
   */
  const pyeongTypes = function (number) {
    if (number <= 10) {
      return "0 ~ 9";
    } else if (number >= 10 && number < 25) {
      return "10 ~ 24";
    } else if (number >= 25 && number < 30) {
      return "25 ~ 29";
    } else if (number >= 30 && number < 35) {
      return "30 ~ 34";
    } else if (number >= 35 && number < 40) {
      return "35 ~ 39";
    } else if (number >= 40 && number < 45) {
      return "40 ~ 44";
    } else if (number >= 45 && number < 50) {
      return "45 ~ 49";
    } else {
      return "50 ~ ";
    }
  }

  this.cliid = obj.cliid; // 고객 ID를 설정합니다.
  this.timeline = obj.timeline; // 타임라인을 설정합니다.

  this.budget = {
    value: Number(obj.budget.replace(/[^0-9\.\-]/g, '')), // 예산 값을 숫자로 변환합니다.
    type: budgetTypes(Number(obj.budget.replace(/[^0-9\.\-]/g, ''))), // 예산 유형을 설정합니다.
  };

  this.address = {
    value: obj.address.split(" "), // 주소 값을 공백으로 분리하여 배열로 저장합니다.
    type: addressTypes(obj.address.split(" ")), // 주소 유형을 설정합니다.
  };

  this.pyeong = {
    value: obj.pyeong, // 평수 값을 설정합니다.
    type: pyeongTypes(obj.pyeong), // 평수 유형을 설정합니다.
  };

  this.contract = {
    value: obj.contract, // 계약 형태를 설정합니다.
    type: obj.contract, // 계약 유형을 설정합니다.
  };

  this.living = {
    value: obj.living, // 거주 여부를 설정합니다.
    type: (obj.living ? "거주중" : "이사"), // 거주 유형을 설정합니다.
  };

}

/**
 * withTools 함수는 Client 클래스에 유용한 도구 메서드를 추가합니다.
 * @param {Function} Client - 수정할 Client 클래스입니다.
 * @returns {Function} 수정된 Client 클래스를 반환합니다.
 */
const withTools = function (Client) {

  /**
   * 고객의 요청 유형을 반환하는 메서드입니다.
   * @returns {ClientTypes} 고객의 요청 유형을 담은 배열을 반환합니다.
   */
  Client.prototype.getType = function () {
    let arr = new ClientTypes(); // 결과를 저장할 ClientTypes 객체를 초기화합니다.
    let tempObj; // 임시 객체를 선언합니다.
    for (let { request } of this.requests) { // 고객의 각 요청을 순회하며 처리합니다.
      tempObj = {}; // 새로운 임시 객체를 초기화합니다.
      tempObj.cliid = this.cliid; // 고객 ID를 설정합니다.
      tempObj.timeline = request.timeline; // 요청 타임라인을 설정합니다.
      tempObj.budget = request.budget.value; // 예산 값을 설정합니다.
      tempObj.address = request.space.address.value; // 주소 값을 설정합니다.
      tempObj.pyeong = request.space.pyeong.value; // 평수 값을 설정합니다.
      tempObj.contract = request.space.contract.value; // 계약 형태를 설정합니다.
      tempObj.living = request.space.resident.living; // 거주 여부를 설정합니다.
      arr.push(new ClientType(tempObj)); // 유형 정보를 ClientType 객체로 변환하여 배열에 추가합니다.
    }
    return arr; // 결과 배열을 반환합니다.
  };

  /**
   * 고객 정보를 메시지 형태로 반환하는 메서드입니다.
   * @returns {string} 메시지 형식으로 변환된 고객 정보입니다.
   */
  Client.prototype.toMessage = function () {
    const { request } = this.requests[0]; // 첫 번째 요청을 기준으로 데이터를 가져옵니다.
    let message = ""; // 메시지 문자열을 초기화합니다.

    // 각 정보 항목을 메시지 문자열에 추가합니다.
    message += "문의일 : " + request.timeline.toString(true) + "\n";
    message += "고객 아이디 : " + this.cliid + "\n";
    message += "성함 : " + this.name + "\n";
    message += "연락처 : " + this.phone + "\n";
    message += "이메일 : " + this.email + "\n";
    message += "주소 : " + request.space.address.value + "\n";
    message += "평수 : " + request.space.pyeong.toMessage() + "\n";
    
    // 거주 여부에 따라 입주 예정일을 추가합니다.
    if (!request.space.resident.living) {
      message += "입주 예정일 : " + request.space.resident.expected.toString() + "\n";
    } else {
      message += "입주 예정일 : " + "거주중" + "\n";
    }
    
    // 계약 형태와 요청 사항을 추가합니다.
    message += "계약 형태 : " + request.space.contract.value + "\n";
    message += "요청 사항 : " + request.etc.comment + "\n";

    return message.replace(/\n$/, ''); // 마지막 줄의 개행 문자를 제거하고 메시지를 반환합니다.
  };

  /**
   * 고객 정보를 출력하기 위한 포맷으로 변환하는 메서드입니다.
   * @param {Array<string>} addition - 추가할 정보가 담긴 배열입니다.
   * @param {number} requestNumber - 출력할 요청의 인덱스입니다.
   * @returns {string} 포맷된 문자열을 반환합니다.
   */
  Client.prototype.toPrint = function (addition = [], requestNumber = 0) {
    const { request, analytics } = this.requests[requestNumber]; // 요청과 분석 데이터를 가져옵니다.
    const indent = "    "; // 들여쓰기 문자열을 정의합니다.
    const bar = "============================================================="; // 구분선을 정의합니다.
    const wordEaLength = 70; // 한 줄에 출력할 최대 문자 수를 정의합니다.
    let documentArr, comment, commentArr;
    let tempStr;

    documentArr = []; // 결과 문서 배열을 초기화합니다.

    // 상담 신청서 제목과 기본 정보를 추가합니다.
    documentArr.push(`상담 신청서  /  ${this.cliid}  /  ${request.timeline.toString(true)}\n`);
    documentArr.push(bar + "\n");
    documentArr.push(`${this.name} (${this.phone})\n`);
    documentArr.push("주소 : " + request.space.address.value + "\n");
    documentArr.push("평수 : " + request.space.pyeong.toMessage() + "\n");
    
    // 거주 여부에 따라 입주 예정일을 추가합니다.
    if (!request.space.resident.living) {
      documentArr.push("입주 예정일 : " + request.space.resident.expected.toString() + "\n");
    } else {
      documentArr.push("입주 예정일 : " + "거주중" + "\n");
    }
    
    // 계약 형태와 예산, 가구 구매 여부를 추가합니다.
    documentArr.push("계약 형태 : " + request.space.contract.value + "\n");
    documentArr.push("예산 : " + request.budget.value + "\n");
    documentArr.push("가구 구매 : " + request.furniture.value + "\n");

    // 추가 정보가 있으면 이를 추가합니다.
    for (let text of addition) {
      documentArr.push(text + "\n");
    }

    // 요청 사항을 설정하고 줄바꿈하여 출력합니다.
    comment = "요청 사항 : " + request.etc.comment;
    commentArr = [];
    tempStr = '';
    for (let i = 0; i < comment.length; i++) {
      tempStr += comment[i];
      if (i % wordEaLength === wordEaLength - 1) {
        commentArr.push(tempStr);
        tempStr = '';
      }
    }
    commentArr.push(tempStr);

    commentArr = commentArr.filter((s) => s !== "").map((s) => s.trim() + "\n"); // 공백과 줄바꿈을 처리합니다.

    documentArr = documentArr.concat(commentArr); // 요청 사항을 문서 배열에 추가합니다.
    documentArr = documentArr.map((s) => indent + s); // 각 줄에 들여쓰기를 추가합니다.

    return documentArr.join("\n"); // 최종 문서를 반환합니다.
  };

  /**
   * 고객 데이터를 평평하게(flatten) 만들어 반환하는 메서드입니다.
   * @returns {Array<Object>} 평평하게 변환된 고객 데이터 배열을 반환합니다.
   */
  Client.prototype.flatDeath = function () {
    const client = this.toNormal(); // 고객 데이터를 일반 객체 형식으로 변환합니다.
    const { name, phone, email, cliid } = client;

    /**
     * Date 객체를 문자열로 변환하는 함수입니다.
     * @param {Date} dateObject - 변환할 Date 객체입니다.
     * @param {boolean} detail - 시간까지 포함할지 여부를 결정합니다.
     * @returns {string} 변환된 날짜 문자열입니다.
     */
    const dateToString = function (dateObject, detail = false) {
      let dayString = ''; // 날짜 문자열을 초기화합니다.

      // 년도, 월, 일 정보를 문자열로 변환하여 추가합니다.
      dayString += String(dateObject.getFullYear()).slice(0, 4);
      dayString += '-';
      if (dateObject.getMonth() + 1 < 10) {
        dayString += '0' + String(dateObject.getMonth() + 1);
      } else {
        dayString += String(dateObject.getMonth() + 1);
      }
      dayString += '-';
      if (dateObject.getDate() < 10) {
        dayString += '0' + String(dateObject.getDate());
      } else {
        dayString += String(dateObject.getDate());
      }

      // detail이 true인 경우 시간까지 변환하여 추가합니다.
      if (detail) {
        dayString += ' ';
        if (dateObject.getHours() < 10) {
          dayString += '0' + String(dateObject.getHours());
        } else {
          dayString += String(dateObject.getHours());
        }
        dayString += ':';
        if (dateObject.getMinutes() < 10) {
          dayString += '0' + String(dateObject.getMinutes());
        } else {
          dayString += String(dateObject.getMinutes());
        }
        dayString += ':';
        if (dateObject.getSeconds() < 10) {
          dayString += '0' + String(dateObject.getSeconds());
        } else {
          dayString += String(dateObject.getSeconds());
        }
      }

      // 특정 패턴에 맞는 경우 문자열을 변경합니다.
      if (/^1[678]/.test(dayString)) {
        dayString = '-';
      } else if (/^3/.test(dayString)) {
        dayString = '예정';
      }

      return dayString; // 최종 문자열을 반환합니다.
    };

    /**
     * 연락 기록을 문자열로 변환하는 함수입니다.
     * @param {Array<Object>} historyArr - 연락 기록 배열입니다.
     * @returns {string} 변환된 연락 기록 문자열입니다.
     */
    const callHistoryToString = function (historyArr) {
      let totalString = ''; // 결과 문자열을 초기화합니다.
      historyArr.reverse(); // 연락 기록을 역순으로 정렬합니다.
      for (let { date, who } of historyArr) { // 각 연락 기록을 순회하며 처리합니다.
        totalString += dateToString(date) + ", "; // 날짜를 문자열로 변환하여 추가합니다.
      }
      if (totalString !== '') {
        totalString = totalString.slice(0, -2); // 마지막의 ', '를 제거합니다.
      }
      return totalString; // 최종 문자열을 반환합니다.
    };

    /**
     * 서비스 데이터를 문자열로 변환하는 함수입니다.
     * @param {Object} serviceObj - 서비스 데이터를 포함한 객체입니다.
     * @returns {string} 변환된 서비스 설명 문자열입니다.
     */
    const serviceParsing = function (serviceObj) {
      let serviceWording = ''; // 서비스 설명을 저장할 변수를 초기화합니다.

      // 서비스 ID에 따라 설명을 설정합니다.
      if (serviceObj.serid === "s2011_aa01s") {
        serviceWording = "홈퍼니싱";
      } else if (serviceObj.serid === "s2011_aa02s") {
        serviceWording = "홈스타일링";
      } else if (serviceObj.serid === "s2011_aa03s") {
        serviceWording = "토탈 스타일링";
      } else {
        serviceWording = "설계 변경";
      }

      // xValue에 따라 설명을 추가합니다.
      if (serviceObj.xValue === 'M') {
        serviceWording += " mini";
      } else if (serviceObj.xValue === 'B') {
        serviceWording += " basic";
      } else if (serviceObj.xValue === 'P') {
        serviceWording += " premium";
      }

      // 온라인 여부에 따라 설명을 추가합니다.
      if (serviceObj.online) {
        serviceWording = "온라인 " + serviceWording;
      } else {
        serviceWording = "오프라인 " + serviceWording;
      }

      return serviceWording; // 최종 문자열을 반환합니다.
    };

    let tong = []; // 결과를 저장할 배열을 초기화합니다.
    let temp;

    // 고객의 각 요청 데이터를 순회하며 처리합니다.
    for (let { request: { timeline, budget, family, furniture, space: { address, contract, pyeong, naver, spec: { room, bathroom, valcony }, resident: { living, expected }, partial: { boo: partialBoo, pyeong: partialPyeong, detail: partialDetail } }, etc: { comment, channel } }, analytics: { response: { status, action, outreason, kakao, service, designers, priority, possible, target, memo }, date: { call: { next, history: callHistory, recommend }, space: { precheck, empty, movein } }, picture: { space: spacePicture, prefer: preferPicture } } } of client.requests) {

      temp = {}; // 임시 객체를 초기화합니다.
      temp.standard = {
        cliid, // 고객 ID를 설정합니다.
        name // 고객 이름을 설정합니다.
      };
      temp.info = {
        status, // 상태를 설정합니다.
        action, // 조치를 설정합니다.
        outreason: outreason.join(", "), // 이탈 이유를 문자열로 변환하여 설정합니다.
        kakao: (kakao ? "등록" : "미등록"), // 카카오톡 등록 여부를 설정합니다.
        service: serviceParsing(service), // 서비스 설명을 설정합니다.
        next: dateToString(next), // 다음 연락 일자를 설정합니다.
        recommend: dateToString(recommend), // 추천 일자를 설정합니다.
        callHistory: callHistoryToString(callHistory), // 연락 기록을 설정합니다.
        timeline: dateToString(timeline, true), // 타임라인을 설정합니다.
        spacePicture: (spacePicture.boo ? "제출" : "미제출"), // 공간 사진 제출 여부를 설정합니다.
        preferPicture: (preferPicture.boo ? "제출" : "미제출"), // 선호 사진 제출 여부를 설정합니다.
        phone, // 전화번호를 설정합니다.
        email, // 이메일을 설정합니다.
        budget, // 예산을 설정합니다.
        address, // 주소를 설정합니다.
        contract, // 계약 형태를 설정합니다.
        pyeong, // 평수를 설정합니다.
        naver, // 네이버 정보를 설정합니다.
        living, // 거주 여부를 설정합니다.
        precheck: dateToString(precheck), // 사전 확인 일자를 설정합니다.
        empty: dateToString(empty), // 비어 있는 일자를 설정합니다.
        movein: dateToString(movein), // 입주 일자를 설정합니다.
        expected: dateToString(expected), // 예상 입주 일자를 설정합니다.
        room, // 방 개수를 설정합니다.
        bathroom, // 욕실 개수를 설정합니다.
        valcony, // 발코니 개수를 설정합니다.
        family, // 가족 구성원을 설정합니다.
        furniture, // 가구 구매 여부를 설정합니다.
        comment, // 요청 사항을 설정합니다.
        channel, // 채널 정보를 설정합니다.
        partialBoo: (partialBoo ? "부분" : "전체"), // 부분/전체 여부를 설정합니다.
        partialPyeong, // 부분 평수를 설정합니다.
        partialDetail, // 부분 상세 정보를 설정합니다.
        designers: designers.join(", "), // 디자이너들을 문자열로 변환하여 설정합니다.
        priority, // 우선순위를 설정합니다.
        target, // 목표를 설정합니다.
        possible, // 가능성을 설정합니다.
        memo, // 메모를 설정합니다.
      };
      tong.push(temp); // 변환된 데이터를 결과 배열에 추가합니다.
    }
    return tong; // 최종 결과 배열을 반환합니다.
  };

  /**
   * 고객 데이터를 평평하게 만들고 각 필드를 병합하여 반환하는 메서드입니다.
   * @returns {Array<Object>} 병합된 고객 데이터 배열을 반환합니다.
   */
  Client.prototype.dimensionSqueeze = function () {
    const tong = this.flatDeath(); // 고객 데이터를 평평하게 만듭니다.
    let result, tempObj;

    result = []; // 결과 배열을 초기화합니다.
    for (let { standard, info } of tong) { // 각 평평한 데이터를 순회하며 처리합니다.
      tempObj = {}; // 임시 객체를 초기화합니다.
      for (let i in standard) { // standard 필드를 복사합니다.
        tempObj[i] = standard[i];
      }
      for (let i in info) { // info 필드를 복사합니다.
        tempObj[i] = info[i];
      }
      result.push(tempObj); // 병합된 데이터를 결과 배열에 추가합니다.
    }

    return result; // 최종 결과 배열을 반환합니다.
  };

  return Client; // 수정된 Client 클래스를 반환합니다.
};

/**
 * withToolsArr 함수는 Clients 배열에 유용한 메서드를 추가합니다.
 * @param {Function} Clients - 수정할 Clients 클래스입니다.
 * @returns {Function} 수정된 Clients 클래스를 반환합니다.
 */
const withToolsArr = function (Clients) {

  /**
   * TongReports 클래스는 보고서를 저장하기 위한 배열 클래스입니다.
   * Array 클래스를 상속받아 사용됩니다.
   */
  class TongReports extends Array {}

  /**
   * TongReport 클래스는 개별 클라이언트의 보고서를 저장하는 클래스입니다.
   * @param {string} cliid - 클라이언트 ID입니다.
   * @param {*} value - 저장할 값입니다.
   */
  class TongReport {
    constructor(cliid, value) {
      this.cliid = cliid; // 클라이언트 ID를 저장합니다.
      this.value = value; // 해당 클라이언트의 값을 저장합니다.
    }
  }

  /**
   * RequestsTongs 클래스는 여러 요청을 담는 배열 클래스입니다.
   * Array 클래스를 상속받아 사용됩니다.
   */
  class RequestsTongs extends Array {

    /**
     * 모든 요청에 대해 보고서를 생성합니다.
     * @returns {Array} 모든 요청의 보고서를 배열로 반환합니다.
     */
    reportAll() {
      let arr = []; // 결과 배열을 초기화합니다.
      for (let i of this) {
        arr.push(i.reportAll()); // 각 요청의 보고서를 생성하여 배열에 추가합니다.
      }
      return arr; // 결과 배열을 반환합니다.
    }

    /**
     * 주어진 날짜에 해당하는 요청을 선택합니다.
     * @param {Date} dateObj - 선택할 날짜 객체입니다.
     * @returns {Object|null} 해당 날짜의 요청을 반환하거나, 없으면 null을 반환합니다.
     */
    select(dateObj) {
      if (!(dateObj instanceof Date)) {
        throw new Error("must be date object"); // 입력이 Date 객체가 아닐 경우 오류를 발생시킵니다.
      }
      let key, target;

      target = null; // 초기 target 값을 null로 설정합니다.
      key = (String(dateObj.getFullYear()).slice(2) + "년 " + String(dateObj.getMonth() + 1) + "월"); // key 값을 설정합니다.
      for (let obj of this) {
        if (obj.name === key) { // key와 일치하는 요청을 찾습니다.
          target = obj;
          break;
        }
      }

      return target; // 찾은 요청을 반환하거나 null을 반환합니다.
    }

  }

  /**
   * RequestsTongFactor 클래스는 개별 요청을 저장하는 클래스입니다.
   * @param {Object} obj - 요청 정보가 담긴 객체입니다.
   */
  class RequestsTongFactor {
    constructor(obj) {
      this.name = obj.name; // 요청 이름을 설정합니다.
      this.date = obj.date; // 요청 날짜를 설정합니다.
      this.tong = obj.tong; // 요청 데이터를 설정합니다.
    }

    /**
     * 비율을 퍼센트로 변환하는 정적 메서드입니다.
     * @param {number} num - 변환할 숫자입니다.
     * @returns {string} 변환된 퍼센트 문자열입니다.
     */
    static ratioParsing(num) {
      return `${String(Math.round(num * 100 * 10) / 10)}%`; // 비율을 퍼센트 형식으로 변환하여 반환합니다.
    }

    /**
     * 금액을 만원 단위로 변환하는 정적 메서드입니다.
     * @param {number} num - 변환할 금액입니다.
     * @returns {string} 변환된 금액 문자열입니다.
     */
    static moneyParsing(num) {
      let str = String(Math.round(num)); // 금액을 반올림하여 문자열로 변환합니다.
      if (str.length > 3) {
        str = str.slice(0, -3) + ',' + str.slice(-3); // 천 단위 구분을 추가합니다.
      }
      return `${str}만원`; // 최종 금액 문자열을 반환합니다.
    }

    /**
     * 평수를 변환하는 정적 메서드입니다.
     * @param {number} num - 변환할 평수입니다.
     * @returns {string} 변환된 평수 문자열입니다.
     */
    static pyeongParsing(num) {
      return `${String(Math.round(num * 100) / 100)}평`; // 평수를 소수점 두 자리로 변환하여 반환합니다.
    }

    /**
     * 일수를 변환하는 정적 메서드입니다.
     * @param {number} num - 변환할 일수입니다.
     * @returns {string} 변환된 일수 문자열입니다.
     */
    static dayParsing(num) {
      return `${String(Math.floor(num))}일`; // 일수를 정수로 변환하여 반환합니다.
    }

    /**
     * 요청들의 예산 보고서를 생성합니다.
     * @returns {Object} 예산에 대한 보고서 객체를 반환합니다.
     */
    reportBudget() {
      const tong = this.tong; // 현재 요청을 참조합니다.
      const reports = [
        { name: "500만원 이하", from: 0, to: 1000, value: 0, ratio: 0, cliidArr: [] },
        // 다양한 예산 범위를 정의합니다.
        // ...
        { name: "10억원 이상", from: 100000, to: 900000000, value: 0, ratio: 0, cliidArr: [] },
      ];
      const targetArr = tong.getBudget(); // 각 요청의 예산을 가져옵니다.
      let total = 0;
      for (let { value } of targetArr) {
        total += value; // 모든 요청의 예산을 합산합니다.
      }
      for (let obj of reports) {
        for (let { cliid, value } of targetArr) {
          if (obj.from <= value && obj.to > value) { // 각 예산 범위에 해당하는 요청을 분류합니다.
            obj.value = obj.value + 1;
            obj.cliidArr.push(cliid); // 클라이언트 ID를 배열에 추가합니다.
          }
        }
      }
      for (let obj of reports) {
        obj.ratio = RequestsTongFactor.ratioParsing(obj.value / tong.length); // 비율을 계산합니다.
        delete obj.from; // 필요 없는 데이터를 삭제합니다.
        delete obj.to;
      }
      return { total: tong.length, average: RequestsTongFactor.moneyParsing(total / tong.length), detail: reports }; // 최종 보고서를 반환합니다.
    }

    /**
     * 요청들의 주소 보고서를 생성합니다.
     * @returns {Object} 주소에 대한 보고서 객체를 반환합니다.
     */
    reportAddress() {
      const tong = this.tong; // 현재 요청을 참조합니다.
      const reports = [
        { name: "서울", regex: new RegExp("^서울"), value: 0, ratio: 0, cliidArr: [] },
        // 다양한 주소 범위를 정의합니다.
        // ...
        { name: "광주", regex: new RegExp("^광주"), value: 0, ratio: 0, cliidArr: [] },
      ];
      const targetArr = tong.getAddress(); // 각 요청의 주소를 가져옵니다.
      for (let obj of reports) {
        for (let { cliid, value } of targetArr) {
          if (obj.regex.test(value)) { // 각 주소 범위에 해당하는 요청을 분류합니다.
            obj.value = obj.value + 1;
            obj.cliidArr.push(cliid); // 클라이언트 ID를 배열에 추가합니다.
          }
        }
      }

      let num;
      let cliidArrAll, cliidArrLeft;
      num = 0;
      cliidArrAll = [];
      for (let obj of reports) {
        num = num + obj.value; // 모든 요청의 개수를 합산합니다.
        for (let c of obj.cliidArr) {
          cliidArrAll.push(c); // 모든 클라이언트 ID를 하나의 배열로 만듭니다.
        }
        obj.ratio = RequestsTongFactor.ratioParsing(obj.value / tong.length); // 비율을 계산합니다.
        delete obj.regex; // 필요 없는 데이터를 삭제합니다.
      }
      cliidArrLeft = [];
      for (let { cliid } of tong) {
        if (!cliidArrAll.includes(cliid)) {
          cliidArrLeft.push(cliid); // 범위에 포함되지 않는 클라이언트 ID를 저장합니다.
        }
      }
      if (cliidArrLeft.length > 0) {
        reports.push({
          name: "알 수 없음",
          value: tong.length - num,
          ratio: RequestsTongFactor.ratioParsing((tong.length - num) / tong.length),
          cliidArr: cliidArrLeft
        });
        throw new Error("problem in address : " + JSON.stringify(cliidArrLeft)); // 문제가 발생한 클라이언트 ID를 포함한 오류를 발생시킵니다.
      }
      return { total: tong.length, average: null, detail: reports }; // 최종 보고서를 반환합니다.
    }

    /**
     * 요청들의 평수 보고서를 생성합니다.
     * @returns {Object} 평수에 대한 보고서 객체를 반환합니다.
     */
    reportPyeong() {
      const tong = this.tong; // 현재 요청을 참조합니다.
      const reports = [
        { name: "0 ~ 9", from: 0, to: 10, value: 0, ratio: 0, cliidArr: [] },
        // 다양한 평수 범위를 정의합니다.
        // ...
        { name: "50 ~ ", from: 50, to: 900000000, value: 0, ratio: 0, cliidArr: [] },
      ];
      const targetArr = tong.getPyeong(); // 각 요청의 평수를 가져옵니다.
      let total = 0;
      for (let { value } of targetArr) {
        total += value; // 모든 요청의 평수를 합산합니다.
      }
      for (let obj of reports) {
        for (let { cliid, value } of targetArr) {
          if (obj.from <= value && obj.to > value) { // 각 평수 범위에 해당하는 요청을 분류합니다.
            obj.value = obj.value + 1;
            obj.cliidArr.push(cliid); // 클라이언트 ID를 배열에 추가합니다.
          }
        }
      }
      for (let obj of reports) {
        obj.ratio = RequestsTongFactor.ratioParsing(obj.value / tong.length); // 비율을 계산합니다.
        delete obj.from; // 필요 없는 데이터를 삭제합니다.
        delete obj.to;
      }
      return { total: tong.length, average: RequestsTongFactor.pyeongParsing(total / tong.length), detail: reports }; // 최종 보고서를 반환합니다.
    }

    /**
     * 요청들의 거주 상태 보고서를 생성합니다.
     * @returns {Object} 거주 상태에 대한 보고서 객체를 반환합니다.
     */
    reportLiving() {
      const tong = this.tong; // 현재 요청을 참조합니다.
      const reports = [
        { name: "거주중", boo: true, value: 0, ratio: 0, cliidArr: [] },
        { name: "이사 예정", boo: false, value: 0, ratio: 0, cliidArr: [] },
      ];
      const targetArr = tong.getLiving(); // 각 요청의 거주 상태를 가져옵니다.
      for (let obj of reports) {
        for (let { cliid, value } of targetArr) {
          if (obj.boo === value) { // 각 거주 상태에 해당하는 요청을 분류합니다.
            obj.value = obj.value + 1;
            obj.cliidArr.push(cliid); // 클라이언트 ID를 배열에 추가합니다.
          }
        }
      }
      for (let obj of reports) {
        obj.ratio = RequestsTongFactor.ratioParsing(obj.value / tong.length); // 비율을 계산합니다.
        delete obj.boo; // 필요 없는 데이터를 삭제합니다.
      }
      return { total: tong.length, average: null, detail: reports }; // 최종 보고서를 반환합니다.
    }

    /**
     * 요청들의 계약 상태 보고서를 생성합니다.
     * @returns {Object} 계약 상태에 대한 보고서 객체를 반환합니다.
     */
    reportContract() {
      const tong = this.tong; // 현재 요청을 참조합니다.
      const reports = [
        { name: "자가", regex: new RegExp("^자"), value: 0, ratio: 0, cliidArr: [] },
        { name: "전월세", regex: new RegExp("^[전월임]"), value: 0, ratio: 0, cliidArr: [] },
      ];
      const targetArr = tong.getContract(); // 각 요청의 계약 상태를 가져옵니다.
      for (let obj of reports) {
        for (let { cliid, value } of targetArr) {
          if (obj.regex.test(value)) { // 각 계약 상태에 해당하는 요청을 분류합니다.
            obj.value = obj.value + 1;
            obj.cliidArr.push(cliid); // 클라이언트 ID를 배열에 추가합니다.
          }
        }
      }

      let num;
      let cliidArrAll, cliidArrLeft;
      num = 0;
      cliidArrAll = [];
      for (let obj of reports) {
        num = num + obj.value; // 모든 요청의 개수를 합산합니다.
        for (let c of obj.cliidArr) {
          cliidArrAll.push(c); // 모든 클라이언트 ID를 하나의 배열로 만듭니다.
        }
        obj.ratio = RequestsTongFactor.ratioParsing(obj.value / tong.length); // 비율을 계산합니다.
        delete obj.regex; // 필요 없는 데이터를 삭제합니다.
      }
      cliidArrLeft = [];
      for (let { cliid } of tong) {
        if (!cliidArrAll.includes(cliid)) {
          cliidArrLeft.push(cliid); // 범위에 포함되지 않는 클라이언트 ID를 저장합니다.
        }
      }
      if (cliidArrLeft.length > 0) {
        reports.push({
          name: "알 수 없음",
          value: tong.length - num,
          ratio: RequestsTongFactor.ratioParsing((tong.length - num) / tong.length),
          cliidArr: cliidArrLeft
        });
        throw new Error("problem in contract : " + JSON.stringify(cliidArrLeft)); // 문제가 발생한 클라이언트 ID를 포함한 오류를 발생시킵니다.
      }
      return { total: tong.length, average: null, detail: reports }; // 최종 보고서를 반환합니다.
    }

    /**
     * 요청들의 이사 일수 보고서를 생성합니다.
     * @returns {Object} 이사 일수에 대한 보고서 객체를 반환합니다.
     */
    reportMovingDay() {
      const valuePasing = function (num) {
        return (((num / 1000) / 60) / 60) / 24; // 밀리초 단위의 시간을 일수로 변환합니다.
      };
      const tong = this.tong; // 현재 요청을 참조합니다.
      const reports = [
        { name: "30일 이하", from: 0, to: 30, value: 0, ratio: 0, cliidArr: [] },
        { name: "30일 이상", from: 30, to: 900000000, value: 0, ratio: 0, cliidArr: [] },
      ];
      const targetArr = tong.getMovingDay(); // 각 요청의 이사 일수를 가져옵니다.
      let total = 0;
      let exceptionList;
      exceptionList = [];
      for (let { value } of targetArr) {
        if (valuePasing(value) > 365) {
          exceptionList.push(valuePasing(value)); // 1년 이상의 일수는 예외 목록에 추가합니다.
        } else {
          total += valuePasing(value); // 이사 일수를 합산합니다.
        }
      }
      for (let obj of reports) {
        for (let { cliid, value } of targetArr) {
          if (obj.from <= valuePasing(value) && obj.to > valuePasing(value)) { // 각 이사 일수 범위에 해당하는 요청을 분류합니다.
            obj.value = obj.value + 1;
            obj.cliidArr.push(cliid); // 클라이언트 ID를 배열에 추가합니다.
          }
        }
      }
      for (let obj of reports) {
        obj.ratio = RequestsTongFactor.ratioParsing(obj.value / tong.length); // 비율을 계산합니다.
        delete obj.from; // 필요 없는 데이터를 삭제합니다.
        delete obj.to;
      }
      return { total: tong.length, average: RequestsTongFactor.dayParsing(total / (tong.length - exceptionList.length)), detail: reports }; // 최종 보고서를 반환합니다.
    }

    /**
     * 모든 유형의 보고서를 생성하여 반환합니다.
     * @returns {Object} 모든 유형의 보고서를 포함하는 객체를 반환합니다.
     */
    reportAll() {
      let finalReport, tempObj;

      finalReport = {};

      finalReport.name = this.name; // 보고서의 이름을 설정합니다.
      finalReport.date = this.date; // 보고서의 날짜를 설정합니다.

      tempObj = this.reportBudget(); // 예산 보고서를 생성합니다.
      finalReport.total = tempObj.total; // 총 요청 수를 설정합니다.
      finalReport.budget = {};
      finalReport.budget.average = tempObj.average; // 평균 예산을 설정합니다.
      finalReport.budget.detail = tempObj.detail; // 예산 세부 사항을 설정합니다.

      tempObj = this.reportAddress(); // 주소 보고서를 생성합니다.
      finalReport.address = {};
      finalReport.address.average = tempObj.average; // 평균 주소를 설정합니다.
      finalReport.address.detail = tempObj.detail; // 주소 세부 사항을 설정합니다.

      tempObj = this.reportPyeong(); // 평수 보고서를 생성합니다.
      finalReport.pyeong = {};
      finalReport.pyeong.average = tempObj.average; // 평균 평수를 설정합니다.
      finalReport.pyeong.detail = tempObj.detail; // 평수 세부 사항을 설정합니다.

      tempObj = this.reportLiving(); // 거주 상태 보고서를 생성합니다.
      finalReport.living = {};
      finalReport.living.average = tempObj.average; // 평균 거주 상태를 설정합니다.
      finalReport.living.detail = tempObj.detail; // 거주 상태 세부 사항을 설정합니다.

      tempObj = this.reportContract(); // 계약 상태 보고서를 생성합니다.
      finalReport.contract = {};
      finalReport.contract.average = tempObj.average; // 평균 계약 상태를 설정합니다.
      finalReport.contract.detail = tempObj.detail; // 계약 상태 세부 사항을 설정합니다.

      tempObj = this.reportMovingDay(); // 이사 일수 보고서를 생성합니다.
      finalReport.movingDay = {};
      finalReport.movingDay.average = tempObj.average; // 평균 이사 일수를 설정합니다.
      finalReport.movingDay.detail = tempObj.detail; // 이사 일수 세부 사항을 설정합니다.

      return finalReport; // 최종 보고서를 반환합니다.
    }

  }

  /**
   * RequestsTong 클래스는 여러 요청을 담는 배열 클래스입니다.
   * Array 클래스를 상속받아 사용됩니다.
   */
  class RequestsTong extends Array {

    /**
     * 주어진 기간 내의 요청을 검색합니다.
     * @param {Array} fromToArr - 검색할 기간을 나타내는 두 개의 날짜 객체를 가진 배열입니다.
     * @returns {RequestsTong} 검색된 요청들을 담은 RequestsTong 객체를 반환합니다.
     */
    search(fromToArr) {
      if (!Array.isArray(fromToArr)) {
        throw new Error("input must be array: [ from: Date, to: Date ]"); // 입력이 배열이 아닐 경우 오류를 발생시킵니다.
      } else {
        if (fromToArr.length !== 2) {
          throw new Error("input must be array: [ from: Date, to: Date ]"); // 입력 배열의 길이가 2가 아닐 경우 오류를 발생시킵니다.
        } else {
          const [from, to] = fromToArr; // from과 to 날짜를 분리합니다.
          let tong;
          tong = new RequestsTong(); // 새로운 RequestsTong 객체를 생성합니다.
          for (let i of this) {
            if (i.request.timeline.valueOf() >= from.valueOf()) {
              if (i.request.timeline.valueOf() < to.valueOf()) {
                tong.push(i); // 기간 내의 요청을 tong에 추가합니다.
              }
            }
          }
          tong.sort((a, b) => {
            return b.request.timeline.valueOf() - a.request.timeline.valueOf(); // 요청들을 타임라인 순서로 정렬합니다.
          });
          return tong; // 최종적으로 검색된 요청들을 반환합니다.
        }
      }
    }

    /**
     * 요청들의 예산을 가져옵니다.
     * @returns {TongReports} 요청들의 예산을 담은 TongReports 객체를 반환합니다.
     */
    getBudget() {
      let result = new TongReports();
      for (let { cliid, request } of this) {
        result.push(new TongReport(cliid, Number(request.budget.value.replace(/[^0-9]/g, '')))); // 예산 데이터를 정리하여 TongReport 객체로 추가합니다.
      }
      return result; // 최종 결과를 반환합니다.
    }

    /**
     * 요청들의 주소를 가져옵니다.
     * @returns {TongReports} 요청들의 주소를 담은 TongReports 객체를 반환합니다.
     */
    getAddress() {
      let result = new TongReports();
      for (let { cliid, request } of this) {
        result.push(new TongReport(cliid, request.space.address.value)); // 주소 데이터를 정리하여 TongReport 객체로 추가합니다.
      }
      return result; // 최종 결과를 반환합니다.
    }

    /**
     * 요청들의 평수를 가져옵니다.
     * @returns {TongReports} 요청들의 평수를 담은 TongReports 객체를 반환합니다.
     */
    getPyeong() {
      let result = new TongReports();
      for (let { cliid, request } of this) {
        result.push(new TongReport(cliid, request.space.pyeong.value)); // 평수 데이터를 정리하여 TongReport 객체로 추가합니다.
      }
      return result; // 최종 결과를 반환합니다.
    }

    /**
     * 요청들의 거주 상태를 가져옵니다.
     * @returns {TongReports} 요청들의 거주 상태를 담은 TongReports 객체를 반환합니다.
     */
    getLiving() {
      let result = new TongReports();
      for (let { cliid, request } of this) {
        result.push(new TongReport(cliid, request.space.resident.living)); // 거주 상태 데이터를 정리하여 TongReport 객체로 추가합니다.
      }
      return result; // 최종 결과를 반환합니다.
    }

    /**
     * 요청들의 계약 상태를 가져옵니다.
     * @returns {TongReports} 요청들의 계약 상태를 담은 TongReports 객체를 반환합니다.
     */
    getContract() {
      let result = new TongReports();
      for (let { cliid, request } of this) {
        result.push(new TongReport(cliid, request.space.contract.value)); // 계약 상태 데이터를 정리하여 TongReport 객체로 추가합니다.
      }
      return result; // 최종 결과를 반환합니다.
    }

    /**
     * 요청들의 이사 일수를 가져옵니다.
     * @returns {TongReports} 요청들의 이사 일수를 담은 TongReports 객체를 반환합니다.
     */
    getMovingDay() {
      let result = new TongReports();
      for (let { cliid, request } of this) {
        if (request.space.resident.living) {
          result.push(new TongReport(cliid, 0)); // 거주 중일 경우 이사 일수를 0으로 설정합니다.
        } else {
          if (request.space.resident.expected.getFullYear() > 2000) {
            if (request.space.resident.expected.valueOf() - request.timeline.valueOf() < 0) {
              result.push(new TongReport(cliid, 0)); // 이사 예정일이 타임라인 이전일 경우 0으로 설정합니다.
            } else {
              result.push(new TongReport(cliid, (request.space.resident.expected.valueOf() - request.timeline.valueOf()))); // 이사 일수를 계산하여 추가합니다.
            }
          } else {
            result.push(new TongReport(cliid, 0)); // 이사 일수를 0으로 설정합니다.
          }
        }
      }
      return result; // 최종 결과를 반환합니다.
    }

  }

  /**
   * Clients 클래스에 유형을 가져오는 메서드를 추가합니다.
   * @returns {ClientTypes} 유형 정보를 담은 ClientTypes 객체를 반환합니다.
   */
  Clients.prototype.getType = function () {
    let arr = new ClientTypes();
    let tempArr;
    for (let i of this) {
      tempArr = i.getType(); // 각 클라이언트의 유형을 가져옵니다.
      for (let j of tempArr) {
        arr.push(j); // 유형 정보를 arr에 추가합니다.
      }
    }
    return arr; // 최종 결과를 반환합니다.
  }

  /**
   * Clients 클래스에 메시지로 변환하는 메서드를 추가합니다.
   * @returns {Array} 각 클라이언트의 메시지를 담은 배열을 반환합니다.
   */
  Clients.prototype.toMessage = function () {
    let arr = [];
    for (let i of this) {
      arr.push(i.toMessage()); // 각 클라이언트의 메시지를 생성하여 배열에 추가합니다.
    }
    return arr; // 최종 결과를 반환합니다.
  }

  /**
   * Clients 클래스에 flatDeath 메서드를 추가합니다.
   * @returns {Array} 각 클라이언트의 평탄화된 정보를 담은 배열을 반환합니다.
   */
  Clients.prototype.flatDeath = function () {
    let tong, tempArr;
    tong = [];
    for (let i of this) {
      tempArr = i.flatDeath(); // 각 클라이언트의 flatDeath 결과를 가져옵니다.
      for (let j of tempArr) {
        tong.push(j); // 결과를 tong 배열에 추가합니다.
      }
    }
    return tong; // 최종 결과를 반환합니다.
  }

  /**
   * Clients 클래스에 dimensionSqueeze 메서드를 추가합니다.
   * @returns {Object|null} SQL 모델과 데이터를 담은 객체를 반환하거나 데이터가 없을 경우 null을 반환합니다.
   */
  Clients.prototype.dimensionSqueeze = function () {
    const TABLE_NAME = "client"; // 테이블 이름을 설정합니다.
    const LONG_TARGETS = [
      "comment"
    ]; // 긴 문자열로 처리할 필드를 정의합니다.

    /**
     * SqlModel 클래스는 SQL 테이블 모델을 정의합니다.
     * @param {Object} sample - 샘플 데이터입니다.
     */
    class SqlModel {
      constructor(sample) {
        for (let i in sample) {
          if (typeof sample[i] === "string") {
            this[i] = "VARCHAR(255)"; // 문자열 필드는 VARCHAR(255)로 설정합니다.
          } else if (typeof sample[i] === "number") {
            this[i] = "INT(11)"; // 숫자 필드는 INT(11)로 설정합니다.
          } else if (typeof sample[i] === "boolean") {
            this[i] = "INT(11)"; // 부울 필드는 INT(11)로 설정합니다.
          } else {
            this[i] = "VARCHAR(255)"; // 그 외의 필드는 VARCHAR(255)로 설정합니다.
          }
          if (LONG_TARGETS.includes(i)) {
            this[i] = "TEXT"; // 긴 문자열로 처리할 필드는 TEXT로 설정합니다.
          }
        }
      }

      getName() {
        return TABLE_NAME; // 테이블 이름을 반환합니다.
      }

      getCreateSql() {
        let sql = "CREATE TABLE `" + this.getName() + "` ("; // 테이블 생성 SQL 문을 작성합니다.
        sql += "id INT(11) NOT NULL AUTO_INCREMENT,";
        sql += " ";
        for (let i in this) {
          sql += "`";
          sql += i;
          sql += "`";
          sql += " ";
          sql += this[i];
          sql += ", ";
        }
        sql += "PRIMARY KEY (id));";
        return sql; // 테이블 생성 SQL 문을 반환합니다.
      }

      getDropSql() {
        let sql = "DROP TABLE " + this.getName() + ";";
        return sql; // 테이블 삭제 SQL 문을 반환합니다.
      }

    }

    /**
     * SqlTong 클래스는 SQL 데이터를 담는 배열 클래스입니다.
     * Array 클래스를 상속받아 사용됩니다.
     */
    class SqlTong extends Array {
      getName() {
        return TABLE_NAME; // 테이블 이름을 반환합니다.
      }

      getInsertSql() {
        let arr = [];
        for (let i of this) {
          arr.push(i.getInsertSql()); // 각 데이터를 삽입하는 SQL 문을 생성하여 배열에 추가합니다.
        }
        return arr; // 삽입 SQL 문 배열을 반환합니다.
      }

    }

    /**
     * SqlTongFactor 클래스는 개별 데이터를 SQL로 변환하는 클래스입니다.
     * @param {Object} sample - 데이터 샘플입니다.
     */
    class SqlTongFactor {
      constructor(sample) {
        for (let i in sample) {
          if (typeof sample[i] === "string") {
            this[i] = sample[i]; // 문자열 데이터를 그대로 저장합니다.
          } else if (typeof sample[i] === "number") {
            this[i] = sample[i]; // 숫자 데이터를 그대로 저장합니다.
          } else if (typeof sample[i] === "boolean") {
            if (sample[i]) {
              this[i] = 1; // true는 1로 변환합니다.
            } else {
              this[i] = 0; // false는 0으로 변환합니다.
            }
          } else {
            this[i] = JSON.stringify(sample[i]); // 그 외의 데이터는 JSON 문자열로 변환하여 저장합니다.
          }
        }
      }

      getName() {
        return TABLE_NAME; // 테이블 이름을 반환합니다.
      }

      getInsertSql() {
        let sql = "INSERT INTO `" + this.getName() + "` (";
        for (let i in this) {
          sql += "`";
          sql += i;
          sql += "`";
          sql += ",";
        }

        sql = sql.slice(0, -1);
        sql += ") VALUES (";

        for (let i in this) {
          if (typeof this[i] === "number") {
            sql += this[i]; // 숫자 데이터는 그대로 삽입합니다.
          } else {
            if (/^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]$/gi.test(this[i])) {
              sql += "STR_TO_DATE('";
              sql += this[i].replace(/'/g, '"');
              sql += "', '%Y-%m-%d')"; // 날짜 문자열을 날짜 형식으로 변환하여 삽입합니다.
            } else if (/^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9] [0-9][0-9]\:[0-9][0-9]\:[0-9][0-9]$/gi.test(this[i])) {
              sql += "STR_TO_DATE('";
              sql += this[i].replace(/'/g, '"');
              sql += "', '%Y-%m-%d %H:%i:%s')"; // 시간까지 포함된 날짜 문자열을 날짜 형식으로 변환하여 삽입합니다.
            } else {
              sql += "'";
              sql += this[i].replace(/'/g, '"');
              sql += "'";
            }
          }
          sql += ",";
        }

        sql = sql.slice(0, -1);
        sql += ");";

        return sql; // 최종 SQL 삽입 문을 반환합니다.
      }
    }

    let tong, tempArr;
    let sample, model;

    tong = new SqlTong();

    for (let i of this) {
      tempArr = i.dimensionSqueeze(); // 각 클라이언트의 데이터를 SQL로 변환합니다.
      for (let j of tempArr) {
        tong.push(new SqlTongFactor(j)); // 변환된 데이터를 SqlTong 배열에 추가합니다.
      }
    }

    if (tong.length > 0) {
      sample = tong[0]; // 첫 번째 데이터 샘플을 가져옵니다.
      model = new SqlModel(sample); // 해당 샘플을 바탕으로 SQL 모델을 생성합니다.
      return { model, data: tong }; // 모델과 데이터를 담은 객체를 반환합니다.
    } else {
      return null; // 데이터가 없는 경우 null을 반환합니다.
    }
  }

  /**
   * Clients 클래스에 getRequestsTong 메서드를 추가합니다.
   * @returns {RequestsTong} 모든 요청을 담은 RequestsTong 객체를 반환합니다.
   */
  Clients.prototype.getRequestsTong = function () {
    let tong, tempArr;
    tong = new RequestsTong();
    for (let i of this) {
      tempArr = i.requests; // 각 클라이언트의 요청을 가져옵니다.
      for (let j = 0; j < tempArr.length; j++) {
        tempArr[j].cliid = i.cliid;
        tempArr[j].name = i.name;
        tempArr[j].phone = i.phone;
        tempArr[j].index = j; // 각 요청에 인덱스와 클라이언트 정보를 추가합니다.
        tong.push(tempArr[j]); // 요청을 tong에 추가합니다.
      }
    }
    tong.sort((a, b) => {
      return b.request.timeline.valueOf() - a.request.timeline.valueOf(); // 타임라인을 기준으로 정렬합니다.
    });
    return tong; // 최종 RequestsTong 객체를 반환합니다.
  }

  /**
   * Clients 클래스에 getRequestsTongsMonthly 메서드를 추가합니다.
   * @returns {RequestsTongs} 월별로 요청을 정리한 RequestsTongs 객체를 반환합니다.
   */
  Clients.prototype.getRequestsTongsMonthly = function () {
    const today = new Date();
    const minimum = new Date(2019, 2, 1);
    if (today.valueOf() < minimum.valueOf()) {
      throw new Error("invaild date"); // 날짜가 최소 날짜보다 이전일 경우 오류를 발생시킵니다.
    }
    let tongs, tong, tongChild;
    let searchTargets;
    let monthNumber, monthConst;
    let tempObj, tempDateFrom, tempDateTo;

    monthNumber = ((today.getFullYear() * 12) + (today.getMonth() + 1)) - ((minimum.getFullYear() * 12) + (minimum.getMonth() + 1)); // 현재 날짜와 최소 날짜 사이의 월 수를 계산합니다.
    monthConst = 1000 * 60 * 60 * 24 * 32; // 월별 상수를 정의합니다.

    searchTargets = [];
    tempDateFrom = new Date(minimum.valueOf());
    tempDateFrom.setDate(1); // 첫 번째 날을 설정합니다.
    tempDateTo = new Date(tempDateFrom.valueOf() + monthConst);
    tempDateTo.setDate(1); // 다음 달의 첫 번째 날을 설정합니다.
    searchTargets.push([tempDateFrom, tempDateTo]); // 검색 기간을 설정합니다.

    for (let i = 0; i < monthNumber; i++) {
      tempDateFrom = new Date(tempDateFrom.valueOf() + monthConst);
      tempDateFrom.setDate(1);
      tempDateTo = new Date(tempDateFrom.valueOf() + monthConst);
      tempDateTo.setDate(1);
      searchTargets.push([tempDateFrom, tempDateTo]); // 각 월에 대한 검색 기간을 추가합니다.
    }

    tong = this.getRequestsTong(); // 모든 요청을 가져옵니다.
    tongs = new RequestsTongs();
    for (let [from, to] of searchTargets) {
      tongChild = tong.search([from, to]); // 기간 내의 요청을 검색합니다.
      tongs.push(new RequestsTongFactor({ name: `${String(from.getFullYear()).slice(2)}년 ${String(from.getMonth() + 1)}월`, date: from, tong: tongChild })); // 검색된 요청을 RequestsTongFactor 객체로 추가합니다.
    }

    tongs.sort((a, b) => {
      return b.date.valueOf() - a.date.valueOf(); // 날짜를 기준으로 정렬합니다.
    });

    return tongs; // 최종 RequestsTongs 객체를 반환합니다.
  }

  /**
   * Clients 클래스에 search 메서드를 추가합니다.
   * @param {string} cliid - 검색할 클라이언트 ID입니다.
   * @returns {Object|null} 해당 클라이언트를 반환하거나 없을 경우 null을 반환합니다.
   */
  Clients.prototype.search = function (cliid) {
    let result = null;
    for (let i of this) {
      if (i.cliid === cliid) { // 클라이언트 ID와 일치하는 클라이언트를 찾습니다.
        result = i;
        break;
      }
    }
    return result; // 찾은 클라이언트를 반환합니다.
  }

  /**
   * Clients 클래스에 pick 메서드를 추가합니다.
   * @param {string} cliid - 선택할 클라이언트 ID입니다.
   * @returns {Object|null} 선택된 클라이언트를 반환합니다.
   */
  Clients.prototype.pick = function (cliid) {
    return this.search(cliid); // search 메서드를 사용하여 클라이언트를 선택합니다.
  }

  return Clients; // 수정된 Clients 클래스를 반환합니다.
}

module.exports = { ClientMap, Client, Clients, Tools: { withTools, withToolsArr } };
