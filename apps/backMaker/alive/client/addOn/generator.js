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

const ClientMap = {
  main: function () {
    let dummy;
    dummy = {
      structure: {
        name: "",
        phone: "",
        email: "",
        cliid: "",
        requests: [],
      },
    };
    return dummy;
  },
  sub: function (subject) {
    let dummy = null;
    if (subject === "requests") {
      dummy = {
        request: {
          timeline: new Date(1800, 0, 1),
          notionId: "",
          budget: "알 수 없음",
          furniture: "알 수 없음",
          family: "",
          space: {
            address: "",
            contract: "알 수 없음",
            pyeong: 0,
            naver: "",
            spec: {
              room: 0,
              bathroom: 0,
              valcony: false
            },
            resident: {
              living: false,
              expected: new Date(1800, 0, 1),
            },
            partial: {
              boo: false,
              pyeong: 0,
              detail: ""
            }
          },
          etc: {
            comment: "",
            channel: "",
          },
        },
        analytics: {
          response: {
            status: "응대중",
            action: "1차 응대 예정",
            outreason: [],
            kakao: false,
            service: {
              serid: "s2011_aa02s",
              xValue: "B",
              online: false,
            },
            designers: [],
            priority: "하",
            possible: "낮음",
            target: "해당 없음",
            memo: "",
          },
          date: {
            call: {
              next: new Date(1800, 0, 1),
              history: [],
              recommend: new Date(1800, 0, 1),
            },
            space: {
              precheck: new Date(1800, 0, 1),
              empty: new Date(1800, 0, 1),
              movein: new Date(1800, 0, 1),
            },
            calendar: {
              call: {
                mother: "clientCalendar",
                id: "",
              },
              precheck: {
                mother: "clientCalendar",
                id: "",
              },
              empty: {
                mother: "clientCalendar",
                id: "",
              },
              movein: {
                mother: "clientCalendar",
                id: "",
              }
            },
          },
          picture: {
            space: {
              boo: false,
              file: [],
            },
            prefer: {
              boo: false,
              file: [],
            },
          },
          proposal: [],
          session: []
        },
      };
    } else if (subject === "analytics.date.history") {
      dummy = {
        date: new Date(1800, 0, 1),
        who: "",
      };
    } else if (subject === "analytics.picture.space.file") {
      dummy = {
        date: new Date(1800, 0, 1),
        confirm: [],
        folderId: ""
      };
    } else if (subject === "analytics.picture.prefer.file") {
      dummy = {
        date: new Date(1800, 0, 1),
        confirm: [],
        folderId: ""
      };
    } else if (subject === "analytics.picture.space.file.confirm") {
      dummy = {
        date: new Date(1800, 0, 1),
        who: "",
      };
    } else if (subject === "analytics.picture.prefer.file.confirm") {
      dummy = {
        date: new Date(1800, 0, 1),
        who: "",
      };
    } else if (subject === "analytics.proposal") {
      dummy = {
        proid: "",
        date: new Date(1800, 0, 1),
        contract: false,
      };
    }
    return dummy;
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

class Address {
  constructor (rawString) {
    this.raw = rawString;
    this.value = rawString;
  }

  toNormal () {
    return this.value;
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

class Menu extends String {

  constructor (value, items, multiple = false) {
    if (Array.isArray(value)) {
      super('');
    } else {
      super(value);
    }
    this.value = null;
    this.values = null;
    this.items = items;
    let temp;
    if (!multiple) {
      if (items.includes(value)) {
        this.value = value;
      } else {
        this.value = "알 수 없음";
      }
    } else {
      temp = [];
      for (let i of value) {
        if (items.includes(i)) {
          temp.push(i);
        }
      }
      this.values = temp;
    }
  }

  toNormal () {
    if (this.values === null) {
      return this.value;
    } else {
      return this.values;
    }
  }
  
}

class Client {
  constructor(json) {
    this.name = json.name;
    this.phone = json.phone;
    this.email = json.email;
    this.cliid = this.#validateClientId(json.cliid);
    this.requests = this.#requestsMaker(json.requests);
  }

  #validateClientId(rawId) {
    if (!/^c/.test(rawId) || rawId.length !== 11) {
      throw new Error("invalid client id");
    }
    return rawId;
  }

  latestRequest() {
    return this.requests[0];
  }

  toJson() {
    return {
      name: this.name,
      phone: this.phone,
      email: this.email,
      cliid: this.cliid,
      requests: this.requests.toNormal(),
    };
  }

  toNormal() {
    return this.toJson();
  }

  toString() {
    return JSON.stringify(this.toJson(), null, 2);
  }

  toDeath() {
    return this.toString();
  }

  stringify() {
    return this.toString();
  }

  returnPyeongArr() {
    let pyeongArr;
    pyeongArr = [];
    for (let obj of this.requests) {
      pyeongArr.push(obj.request.space.pyeong.value);
    }
    return pyeongArr;
  }

  #requestsMaker (requests) {
    let result = new this.#Requests();
    let requestInstance;
    for (let i of requests) {
      requestInstance = new this.#Request(i);
      result.push(requestInstance);
    }
    return result;
  }

  #Request = class extends Array {
    constructor(_request) {
      super();
      const { request, analytics, proposal } = _request;
      this.request = new this.#WebRequest(request);
      this.analytics = new this.#HomeLiaisonAnalytics(analytics);
      this.push(this.request);
      this.push(this.analytics);
    }
  
    get space() {
      return this.request.space;
    }
  
    toNormal() {
      let obj = {};
      obj.request = this.request.toNormal();
      obj.analytics = this.analytics.toNormal();
      return obj;
    }
  
    #HomeLiaisonAnalytics = class {
      constructor (analytics) {
        this.response = new this.#Response(analytics.response);
        this.date = new this.#DateAnalytics(analytics.date);
        this.picture = new this.#Picture(analytics.picture);
        this.proposal = new this.#Proposal(analytics.proposal);
        this.session = new this.#Session(analytics.session);
      }
    
      toNormal () {
        let obj = {};
        obj.response = this.response.toNormal();
        obj.date = this.date.toNormal();
        obj.picture = this.picture.toNormal();
        obj.proposal = this.proposal.toNormal();
        obj.session = this.session.toNormal();
        return obj;
      }
    
      #Session = class extends Array {
        constructor(json) {
          super();
          for (let i of json) {
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
    
      #Response = class {
        constructor (response) {
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
      
        actionInfo = () => {
          const actionItems = [
            [ "1차 응대 예정" ],
            [ "1차 응대 후 대기", "부재중 알림 발송" ],
            [ "스타일 체크 대기", "상세 설문 대기" ],
            [ "제안 발송 예정", "부재중 제안 발송" ],
            [ "제안 피드백 예정", "피드백과 응대 예정" ],
            [ "피드백 부재중", "자동 피드백 부재중" ],
            [ "제안 피드백 완료", "피드백과 응대 완료" ],
            [ "디자이너 선택" ],
            [ "해당 없음" ],
          ];
        
          const position = [
            {
              value: actionItems[1][0],
              used: [
                {
                  file: "/apps/backMaker/backWorker.js",
                  method: "clientActionSync"
                }
              ]
            },
            {
              value: actionItems[1][1],
              used: [
                {
                  file: "/apps/dataConsole/router/source/local/client.js",
                  method: "communicationRender"
                }
              ]
            },
            {
              value: actionItems[2][0],
              used: [
                {
                  file: "/apps/dataConsole/router/source/local/client.js",
                  method: "communicationRender"
                }
              ]
            },
            {
              value: actionItems[3][0],
              used: [
                {
                  file: "/apps/dataConsole/router/fragments/router7_ghost_styleCuration.js",
                  method: "rou_post_styleCuration_updateCalculation"
                }
              ]
            },
            {
              value: actionItems[3][1],
              used: [
                {
                  file: "/apps/dataConsole/router/fragments/router7_ghost_styleCuration.js",
                  method: "rou_post_styleCuration_updateCalculation"
                }
              ]
            },
            {
              value: actionItems[4][0],
              used: [
                {
                  file: "/robot.js",
                  method: "proposalMaker",
                }
              ]
            },
            {
              value: actionItems[4][1],
              used: [
                {
                  file: "/robot.js",
                  method: "proposalMaker",
                }
              ]
            },
            {
              value: actionItems[7][0],
              used: [
                {
                  file: "/apps/dataConsole/router/fragments/router6_ghost_designerProposal.js",
                  method: "rou_post_designerProposal_submit"
                }
              ]
            },
            {
              value: actionItems[7][0],
              used: [
                {
                  file: "/apps/dataConsole/router/source/local/proposal.js",
                  method: "list_menuEvents",
                }
              ]
            },
          ];
        
          return new Flow(actionItems, position);
        }
        
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
      
        #PredictDesigners = class extends Array {
          constructor(json) {
            super();
            for (let i of json) {
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
        
        #ProjectService = class {
          constructor (json) {
            this.serid = json.serid;
            this.xValue = json.xValue;
            this.online = Boolean(json.online);
          }
        
          toNormal () {
            let obj = {};
            obj.serid = this.serid;
            obj.xValue = this.xValue;
            obj.online = this.online;
            return obj;
          }
        }
      
      }
    
      #Proposal = class extends Array {
        constructor(json) {
          super();
          for (let i of json) {
            this.push(new this.#ProposalDetail(i));
          }
        }
        toNormal() {
          let arr = [];
          for (let i of this) {
            arr.push(i.toNormal());
          }
          return arr;
        }
      
        #ProposalDetail = class {
          constructor (json) {
            this.proid = json.proid;
            this.date = new DateParse(json.date);
            this.contract = json.contract;
          }
      
          toNormal () {
            let obj = {};
            obj.proid = this.proid;
            obj.date = this.date.toNormal();
            obj.contract = this.contract;
            return obj;
          }
        }
      }
    
      #Picture = class {
        constructor(picture) {
          this.space = new this.#Space(picture.space);
          this.prefer = new this.#Prefer(picture.prefer);
        }
      
        toNormal() {
          return {
            space: this.space.toNormal(),
            prefer: this.prefer.toNormal(),
          };
        }
      
        #Prefer = class {
          constructor(json) {
            this.boo = Boolean(json.boo);
            this.file = new this.#PreferPicture(json.file);
          }
      
          toNormal() {
            return {
              boo: this.boo,
              file: this.file.toNormal(),
            };
          }
      
          #PreferPicture = class extends Array {
            constructor(json) {
              super();
              for (let i of json) {
                this.push(new this.#PreferPictureDetail(i));
              }
            }
        
            toNormal() {
              const arr = [];
              for (let i of this) {
                arr.push(i.toNormal());
              }
              return arr;
            }
        
            #PreferPictureDetail = class {
              constructor(json) {
                this.date = new DateParse(json.date);
                this.confirm = new this.#Confirms(json.confirm);
                this.folderId = json.folderId;
              }
          
              toNormal() {
                return {
                  date: this.date.toNormal(),
                  confirm: this.confirm.toNormal(),
                  folderId: this.folderId,
                };
              }
      
              #Confirms = class extends Array {
                constructor(json) {
                  super();
                  for (let i of json) {
                    this.push(new this.#Confirm(i));
                  }
                }
            
                toNormal() {
                  const arr = [];
                  for (let i of this) {
                    arr.push(i.toNormal());
                  }
                  return arr;
                }
            
                #Confirm = class {
                  constructor(json) {
                    this.date = new DateParse(json.date);
                    this.who = json.who;
                  }
              
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
      
        #Space = class {
          constructor(json) {
            this.boo = Boolean(json.boo);
            this.file = new this.#SpacePicture(json.file);
          }
      
          toNormal() {
            return {
              boo: this.boo,
              file: this.file.toNormal(),
            };
          }
      
          #SpacePicture = class extends Array {
            constructor(json) {
              super();
              for (let i of json) {
                this.push(new this.#SpacePictureDetail(i));
              }
            }
        
            toNormal() {
              const arr = [];
              for (let i of this) {
                arr.push(i.toNormal());
              }
              return arr;
            }
        
            #SpacePictureDetail = class {
              constructor(json) {
                this.date = new DateParse(json.date);
                this.confirm = new this.#Confirms(json.confirm);
                this.folderId = json.folderId;
              }
          
              toNormal() {
                return {
                  date: this.date.toNormal(),
                  confirm: this.confirm.toNormal(),
                  folderId: this.folderId,
                };
              }
        
              #Confirms = class extends Array {
                constructor(json) {
                  super();
                  for (let i of json) {
                    this.push(new this.#Confirm(i));
                  }
                }
            
                toNormal() {
                  const arr = [];
                  for (let i of this) {
                    arr.push(i.toNormal());
                  }
                  return arr;
                }
            
                #Confirm = class {
                  constructor(json) {
                    this.date = new DateParse(json.date);
                    this.who = json.who;
                  }
              
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
    
      #DateAnalytics = class {
        constructor(date) {
          this.call = new this.#DateCall(date.call);
          this.space = new this.#DateSpace(date.space);
          this.calendar = new this.#DateCalendar(date.calendar);
        }
      
        toNormal() {
          return {
            call: this.call.toNormal(),
            space: this.space.toNormal(),
            calendar: this.calendar.toNormal(),
          };
        }
      
        #DateCalendar = class {
          constructor(json) {
            this.call = new this.#Calendar(json.call);
            this.precheck = new this.#Calendar(json.precheck);
            this.empty = new this.#Calendar(json.empty);
            this.movein = new this.#Calendar(json.movein);
          }
      
          toNormal() {
            return {
              call: this.call.toNormal(),
              precheck: this.precheck.toNormal(),
              empty: this.empty.toNormal(),
              movein: this.movein.toNormal(),
            };
          }
      
          #Calendar = class {
            constructor(json) {
              this.mother = json.mother;
              this.id = json.id;
            }
        
            toNormal() {
              return {
                mother: this.mother,
                id: this.id,
              };
            }
          };
        };
      
        #DateSpace = class {
          constructor(json) {
            this.precheck = new DateParse(json.precheck);
            this.empty = new DateParse(json.empty);
            this.movein = new DateParse(json.movein);
          }
      
          toNormal() {
            return {
              precheck: this.precheck.toNormal(),
              empty: this.empty.toNormal(),
              movein: this.movein.toNormal(),
            };
          }
        };
      
        #DateCall = class {
          constructor(json) {
            this.next = new DateParse(json.next);
            this.history = new this.#DateCallHistory(json.history);
            this.recommend = new DateParse(json.recommend);
          }
      
          toNormal() {
            return {
              next: this.next.toNormal(),
              history: this.history.toNormal(),
              recommend: this.recommend.toNormal(),
            };
          }
      
          #DateCallHistory = class extends Array {
            constructor(json) {
              super();
              for (let i of json) {
                this.push(new this.#DateCallHistoryFactor(i));
              }
            }
        
            toNormal() {
              const arr = [];
              for (let i of this) {
                arr.push(i.toNormal());
              }
              return arr;
            }
        
            #DateCallHistoryFactor = class {
              constructor(json) {
                this.date = new DateParse(json.date);
                this.who = json.who;
              }
          
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

    #WebRequest = class {
      constructor (request) {
        this.timeline = new DateParse(request.timeline);
        this.notionId = request.notionId;
        this.budget = new Menu(request.budget, [ '500만원 이하', '1,000만원', '1,500만원', '2,000만원', '2,500만원', '3,000만원', '3,500만원', '4,000만원', '4,500만원', '5,000만원 이상', '6,000만원 이상', '7,000만원 이상', '8,000만원 이상', '9,000만원 이상', '1억원 이상', '1억 5,000만원 이상', '2억원 이상', '3억원 이상', '5억원 이상', '10억원 이상', ], false);
        this.family = new this.#Family(request.family);
        this.furniture = new Menu(request.furniture, [ "재배치", "일부 구매", "전체 구매" ], false);
        this.space = new this.#Space(request.space);
        this.etc = {};
        this.etc.comment = request.etc.comment;
        this.etc.channel = request.etc.channel;
      }
    
      toNormal () {
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
    
      #Family = class {
        constructor (rawString) {
          this.raw = rawString;
          this.value = rawString;
        }
      
        toNormal () {
          return this.value;
        }
      }
      
      #Space = class {
        constructor (space) {
          this.address = new Address(space.address);
          this.contract = new Menu(space.contract, [ '전월세', '자가' ], false);
          this.pyeong = new this.#Pyeong(space.pyeong);
          this.naver = space.naver;
          this.spec = new this.#SpaceSpec(space.spec);
          this.resident = new this.#Resident(space.resident);
          this.partial = new this.#Partial(space.partial);
        }
      
        toNormal () {
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
      
        #SpaceSpec = class {
          constructor (spec) {
            this.room = Number(spec.room);
            this.bathroom = Number(spec.bathroom);
            this.valcony = Boolean(spec.valcony);
          }
        
          toNormal () {
            let obj = {};
            obj.room = this.room;
            obj.bathroom = this.bathroom;
            obj.valcony = this.valcony;
            return obj;
          }
        
          toMessage () {
            return `방 ${this.room}개${this.room === 4 ? " 이상" : ""} / 화장실 ${this.bathroom}개${this.bathroom === 3 ? " 이상" : ""} / 발코니 확장${(this.valcony ? "" : " 없음")}`;
          }
        }
      
        #Resident = class {
          constructor (resident) {
            this.living = Boolean(resident.living);
            this.expected = new DateParse(resident.expected);
          }
        
          toNormal () {
            let obj = {};
            obj.living = this.living;
            obj.expected = this.expected.toNormal();
            return obj;
          }
        }
      
        #Partial = class {
          constructor (json) {
            this.boo = json.boo;
            this.pyeong = new this.#Pyeong(json.pyeong);
            this.detail = json.detail;
          }
        
          toNormal () {
            let obj = {};
            obj.boo = this.boo;
            obj.pyeong = this.pyeong.toNormal();
            obj.detail = this.detail;
            return obj;
          }
      
          #Pyeong = class {
            constructor (rawNumber) {
              this.raw = rawNumber;
              this.value = rawNumber;
            }
          
            toNormal () {
              return this.value;
            }
          
            toMessage () {
              return String(this.value) + "평";
            }
          }
        }
      
        #Pyeong = class {
          constructor (rawNumber) {
            this.raw = rawNumber;
            this.value = rawNumber;
          }
        
          toNormal () {
            return this.value;
          }
        
          toMessage () {
            return String(this.value) + "평";
          }
        }
      
      }
    }

  }

  #Requests = class extends Array {
    toNormal() {
      let arr = [];
      for (let i = 0; i < this.length; i++) {
        arr.push(this[i].toNormal());
      }
      return arr;
    }
  }
}

class Clients extends Array {

  latestRequests() {
    let arr = [];
    for (let i of this) {
      arr.push(i.latestRequest());
    }
    return arr;
  }

  getRequests() {
    let arr = [];
    let tempArr;
    for (let i of this) {
      tempArr = i.requests;
      for (let j of tempArr) {
        arr.push(j);
      }
    }
    return arr;
  }

  get requests() {
    return this.getRequests();
  }

  get name() {
    let arr = [];
    for (let i of this) {
      arr.push(i.name);
    }
    return arr.join(',');
  }

  toNormal() {
    let tong;
    tong = [];
    for (let i of this) {
      tong.push(i.toNormal());
    }
    return tong;
  }

}

class ClientTypeCases extends Array {
  parsingCases(client) {
    const requestTypes = client.getType();
    let arr = [], result = [];
    for (let i of requestTypes) {
      arr.push(`${i.budget.type}_${i.address.type}_${i.pyeong.type}_${i.contract.type}_${i.living.type}`);
    }
    for (let i of arr) {
      for (let obj of this) {
        if (obj.name === i) {
          result.push(obj);
        }
      }
    }
    return result;
  }

  parsingProid(client) {
    const caseArray = this.parsingCases(client);
    let targetProid;

    targetProid = null;

    for (let i = 0; i < caseArray.length; i++) {
      caseArray[caseArray.length - 1 - i].proidArr.sort();
      caseArray[caseArray.length - 1 - i].contractArr.sort();
      for (let j = 0; j < caseArray[caseArray.length - 1 - i].proidArr.length; j++) {
        targetProid = caseArray[caseArray.length - 1 - i].proidArr[j];
      }
      for (let j = 0; j < caseArray[caseArray.length - 1 - i].contractArr.length; j++) {
        targetProid = caseArray[caseArray.length - 1 - i].contractArr[j];
      }
    }

    return targetProid;
  }
}

class ClientTypes extends Array {

  getCompositionWords() {
    let arr = [];
    for (let i of this) {
      arr.push(`${i.budget.type}_${i.address.type}_${i.pyeong.type}_${i.contract.type}_${i.living.type}`);
    }
    return arr;
  }

  getTypeCases(projects = null) {
    const typeSet = Array.from(new Set(this.getCompositionWords()));
    typeSet.sort((a, b) => {
      return Number(a.split("_")[0]) - Number(b.split("_")[0]);
    });
    let resultArr, cliidArr, tempObj, tempArr, proidArr, contractArr;

    resultArr = new ClientTypeCases();

    for (let i of typeSet) {
      tempObj = { name: i, case: {} };
      tempArr = i.split('_');
      tempObj.case.budget = Number(tempArr[0]);
      tempObj.case.address = tempArr[1];
      tempObj.case.pyeong = { from: Number(tempArr[2].split(" ~ ")[0]), to: Number(tempArr[2].split(" ~ ")[1]) };
      tempObj.case.contract = tempArr[3];
      tempObj.case.living = tempArr[4] === "거주중";
      cliidArr = [];
      for (let j of this) {
        if (i === (`${j.budget.type}_${j.address.type}_${j.pyeong.type}_${j.contract.type}_${j.living.type}`)) {
          cliidArr.push(j.cliid);
        }
      }
      tempObj.cliidArr = cliidArr;
      if (projects !== null) {
        proidArr = [];
        contractArr = [];
        for (let p of projects) {
          if (cliidArr.includes(p.cliid)) {
            proidArr.push(p.proid);
            if (/^d/.test(p.desid)) {
              contractArr.push(p.proid);
            }
          }
        }
        tempObj.proidArr = proidArr;
        tempObj.contractArr = contractArr;
      }
      resultArr.push(tempObj);
    }

    return resultArr;
  }
}

const ClientType = function (obj) {
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

  this.cliid = obj.cliid;
  this.timeline = obj.timeline;

  this.budget = {
    value: Number(obj.budget.replace(/[^0-9\.\-]/g, '')),
    type: budgetTypes(Number(obj.budget.replace(/[^0-9\.\-]/g, ''))),
  };

  this.address = {
    value: obj.address.split(" "),
    type: addressTypes(obj.address.split(" ")),
  };

  this.pyeong = {
    value: obj.pyeong,
    type: pyeongTypes(obj.pyeong),
  };

  this.contract = {
    value: obj.contract,
    type: obj.contract,
  };

  this.living = {
    value: obj.living,
    type: (obj.living ? "거주중" : "이사"),
  };

}

const withTools = function (Client) {

  Client.prototype.getType = function () {
    let arr = new ClientTypes();
    let tempObj;
    for (let { request } of this.requests) {
      tempObj = {};
      tempObj.cliid = this.cliid;
      tempObj.timeline = request.timeline;
      tempObj.budget = request.budget.value;
      tempObj.address = request.space.address.value;
      tempObj.pyeong = request.space.pyeong.value;
      tempObj.contract = request.space.contract.value;
      tempObj.living = request.space.resident.living;
      arr.push(new ClientType(tempObj));
    }
    return arr;
  }

  Client.prototype.toMessage = function () {
    const { request } = this.requests[0];
    let message = "";

    message += "문의일 : " + request.timeline.toString(true) + "\n";
    message += "고객 아이디 : " + this.cliid + "\n";
    message += "성함 : " + this.name + "\n";
    message += "연락처 : " + this.phone + "\n";
    message += "이메일 : " + this.email + "\n";
    message += "주소 : " + request.space.address.value + "\n";
    message += "평수 : " + request.space.pyeong.toMessage() + "\n";
    if (!request.space.resident.living) {
      message += "입주 예정일 : " + request.space.resident.expected.toString() + "\n";
    } else {
      message += "입주 예정일 : " + "거주중" + "\n";
    }
    message += "계약 형태 : " + request.space.contract.value + "\n";
    message += "요청 사항 : " + request.etc.comment + "\n";

    return message.replace(/\n$/, '');
  }

  Client.prototype.toPrint = function (addition = [], requestNumber = 0) {
    const { request, analytics } = this.requests[requestNumber];
    const indent = "    ";
    const bar = "=============================================================";
    const wordEaLength = 70;
    let documentArr, comment, commentArr;
    let tempStr;
    let thisSerid;

    documentArr = [];

    documentArr.push(`상담 신청서  /  ${this.cliid}  /  ${request.timeline.toString(true)}\n`);
    documentArr.push(bar + "\n");
    documentArr.push(`${this.name} (${this.phone})\n`);
    documentArr.push("주소 : " + request.space.address.value + "\n");
    documentArr.push("평수 : " + request.space.pyeong.toMessage() + "\n");
    if (!request.space.resident.living) {
      documentArr.push("입주 예정일 : " + request.space.resident.expected.toString() + "\n");
    } else {
      documentArr.push("입주 예정일 : " + "거주중" + "\n");
    }
    documentArr.push("계약 형태 : " + request.space.contract.value + "\n");
    documentArr.push("예산 : " + request.budget.value + "\n");
    documentArr.push("가구 구매 : " + request.furniture.value + "\n");
    for (let text of addition) {
      documentArr.push(text + "\n");
    }
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

    commentArr = commentArr.filter((s) => { return s !== ""; }).map((s) => { return s.trim() + "\n"; });

    documentArr = documentArr.concat(commentArr);
    documentArr = documentArr.map((s) => { return indent + s; });

    return documentArr.join("\n");
  }

  Client.prototype.flatDeath = function () {
    const client = this.toNormal();
    const { name, phone, email, cliid } = client;

    const dateToString = function (dateObject, detail = false) {
      let dayString = '';

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

      if (/^1[678]/.test(dayString)) {
        dayString = '-';
      } else if (/^3/.test(dayString)) {
        dayString = '예정';
      }

      return dayString;
    }

    const callHistoryToString = function (historyArr) {
      let totalString = '';
      historyArr.reverse();
      for (let { date, who } of historyArr) {
        totalString += dateToString(date) + ", ";
      }
      if (totalString !== '') {
        totalString = totalString.slice(0, -2);
      }
      return totalString;
    }

    const serviceParsing = function (serviceObj) {
      let serviceWording = '';

      if (serviceObj.serid === "s2011_aa01s") {
        serviceWording = "홈퍼니싱";
      } else if (serviceObj.serid === "s2011_aa02s") {
        serviceWording = "홈스타일링";
      } else if (serviceObj.serid === "s2011_aa03s") {
        serviceWording = "토탈 스타일링";
      } else {
        serviceWording = "설계 변경";
      }

      if (serviceObj.xValue === 'M') {
        serviceWording += " mini";
      } else if (serviceObj.xValue === 'B') {
        serviceWording += " basic";
      } else if (serviceObj.xValue === 'P') {
        serviceWording += " premium";
      }

      if (serviceObj.online) {
        serviceWording = "온라인 " + serviceWording;
      } else {
        serviceWording = "오프라인 " + serviceWording;
      }

      return serviceWording;
    }

    let tong = [];
    let temp;

    for (let { request: { timeline, budget, family, furniture, space: { address, contract, pyeong, naver, spec: { room, bathroom, valcony }, resident: { living, expected }, partial: { boo: partialBoo, pyeong: partialPyeong, detail: partialDetail } }, etc: { comment, channel } }, analytics: { response: { status, action, outreason, kakao, service, designers, priority, possible, target, memo }, date: { call: { next, history: callHistory, recommend }, space: { precheck, empty, movein } }, picture: { space: spacePicture, prefer: preferPicture } } } of client.requests) {

      temp = {};
      temp.standard = {
        cliid,
        name
      };
      temp.info = {
        status,
        action,
        outreason: outreason.join(", "),
        kakao: (kakao ? "등록" : "미등록"),
        service: serviceParsing(service),
        next: dateToString(next),
        recommend: dateToString(recommend),
        callHistory: callHistoryToString(callHistory),
        timeline: dateToString(timeline, true),
        spacePicture: (spacePicture.boo ? "제출" : "미제출"),
        preferPicture: (preferPicture.boo ? "제출" : "미제출"),
        phone,
        email,
        budget,
        address,
        contract,
        pyeong,
        naver,
        living,
        precheck: dateToString(precheck),
        empty: dateToString(empty),
        movein: dateToString(movein),
        expected: dateToString(expected),
        room,
        bathroom,
        valcony,
        family,
        furniture,
        comment,
        channel,
        partialBoo: (partialBoo ? "부분" : "전체"),
        partialPyeong,
        partialDetail,
        designers: designers.join(", "),
        priority,
        target,
        possible,
        memo,
      }
      tong.push(temp);
    }
    return tong;
  }

  Client.prototype.dimensionSqueeze = function () {
    const tong = this.flatDeath();
    let result, tempObj;

    result = [];
    for (let { standard, info } of tong) {
      tempObj = {};
      for (let i in standard) {
        tempObj[i] = standard[i];
      }
      for (let i in info) {
        tempObj[i] = info[i];
      }
      result.push(tempObj);
    }

    return result;
  }

  return Client;
}

const withToolsArr = function (Clients) {

  class TongReports extends Array {}

  class TongReport {
    constructor(cliid, value) {
      this.cliid = cliid;
      this.value = value;
    }
  }

  class RequestsTongs extends Array {

    reportAll() {
      let arr = [];
      for (let i of this) {
        arr.push(i.reportAll());
      }
      return arr;
    }

    select(dateObj) {
      if (!(dateObj instanceof Date)) {
        throw new Error("must be date object");
      }
      let key, target;

      target = null;
      key = (String(dateObj.getFullYear()).slice(2) + "년 " + String(dateObj.getMonth() + 1) + "월");
      for (let obj of this) {
        if (obj.name === key) {
          target = obj;
          break;
        }
      }

      return target;
    }

  }

  class RequestsTongFactor {
    constructor(obj) {
      this.name = obj.name;
      this.date = obj.date;
      this.tong = obj.tong;
    }

    static ratioParsing(num) {
      return `${String(Math.round(num * 100 * 10) / 10)}%`;
    }

    static moneyParsing(num) {
      let str = String(Math.round(num));
      if (str.length > 3) {
        str = str.slice(0, -3) + ',' + str.slice(-3);
      }
      return `${str}만원`;
    }

    static pyeongParsing(num) {
      return `${String(Math.round(num * 100) / 100)}평`;
    }

    static dayParsing(num) {
      return `${String(Math.floor(num))}일`;
    }

    reportBudget() {
      const tong = this.tong;
      const reports = [
        { name: "500만원 이하", from: 0, to: 1000, value: 0, ratio: 0, cliidArr: [] },
        { name: "1,000만원", from: 1000, to: 1500, value: 0, ratio: 0, cliidArr: [] },
        { name: "1,500만원", from: 1500, to: 2000, value: 0, ratio: 0, cliidArr: [] },
        { name: "2,000만원", from: 2000, to: 3000, value: 0, ratio: 0, cliidArr: [] },
        { name: "3,000만원", from: 3000, to: 4000, value: 0, ratio: 0, cliidArr: [] },
        { name: "4,000만원", from: 4000, to: 5000, value: 0, ratio: 0, cliidArr: [] },
        { name: "5,000만원 이상", from: 5000, to: 6000, value: 0, ratio: 0, cliidArr: [] },
        { name: "6,000만원 이상", from: 6000, to: 7000, value: 0, ratio: 0, cliidArr: [] },
        { name: "7,000만원 이상", from: 7000, to: 8000, value: 0, ratio: 0, cliidArr: [] },
        { name: "8,000만원 이상", from: 8000, to: 9000, value: 0, ratio: 0, cliidArr: [] },
        { name: "9,000만원 이상", from: 9000, to: 10000, value: 0, ratio: 0, cliidArr: [] },
        { name: "1억원 이상", from: 10000, to: 15000, value: 0, ratio: 0, cliidArr: [] },
        { name: "1억 5,000만원 이상", from: 15000, to: 20000, value: 0, ratio: 0, cliidArr: [] },
        { name: "2억원 이상", from: 20000, to: 30000, value: 0, ratio: 0, cliidArr: [] },
        { name: "3억원 이상", from: 30000, to: 50000, value: 0, ratio: 0, cliidArr: [] },
        { name: "5억원 이상", from: 50000, to: 100000, value: 0, ratio: 0, cliidArr: [] },
        { name: "10억원 이상", from: 100000, to: 900000000, value: 0, ratio: 0, cliidArr: [] },
      ];
      const targetArr = tong.getBudget();
      let total = 0;
      for (let { value } of targetArr) {
        total += value;
      }
      for (let obj of reports) {
        for (let { cliid, value } of targetArr) {
          if (obj.from <= value && obj.to > value) {
            obj.value = obj.value + 1;
            obj.cliidArr.push(cliid);
          }
        }
      }
      for (let obj of reports) {
        obj.ratio = RequestsTongFactor.ratioParsing(obj.value / tong.length);
        delete obj.from;
        delete obj.to;
      }
      return { total: tong.length, average: RequestsTongFactor.moneyParsing(total / tong.length), detail: reports };
    }

    reportAddress() {
      const tong = this.tong;
      const reports = [
        { name: "서울", regex: new RegExp("^서울"), value: 0, ratio: 0, cliidArr: [] },
        { name: "인천", regex: new RegExp("^인천"), value: 0, ratio: 0, cliidArr: [] },
        { name: "경기", regex: new RegExp("^경기"), value: 0, ratio: 0, cliidArr: [] },
        { name: "강원", regex: new RegExp("^강"), value: 0, ratio: 0, cliidArr: [] },
        { name: "충청", regex: new RegExp("^충"), value: 0, ratio: 0, cliidArr: [] },
        { name: "대전", regex: new RegExp("^대전"), value: 0, ratio: 0, cliidArr: [] },
        { name: "세종", regex: new RegExp("^세종"), value: 0, ratio: 0, cliidArr: [] },
        { name: "전라", regex: new RegExp("^전"), value: 0, ratio: 0, cliidArr: [] },
        { name: "경상", regex: new RegExp("^경[상북남]"), value: 0, ratio: 0, cliidArr: [] },
        { name: "제주", regex: new RegExp("^제주"), value: 0, ratio: 0, cliidArr: [] },
        { name: "부산", regex: new RegExp("^부산"), value: 0, ratio: 0, cliidArr: [] },
        { name: "대구", regex: new RegExp("^대구"), value: 0, ratio: 0, cliidArr: [] },
        { name: "울산", regex: new RegExp("^울산"), value: 0, ratio: 0, cliidArr: [] },
        { name: "광주", regex: new RegExp("^광주"), value: 0, ratio: 0, cliidArr: [] },
      ];
      const targetArr = tong.getAddress();
      for (let obj of reports) {
        for (let { cliid, value } of targetArr) {
          if (obj.regex.test(value)) {
            obj.value = obj.value + 1;
            obj.cliidArr.push(cliid);
          }
        }
      }

      let num;
      let cliidArrAll, cliidArrLeft;
      num = 0;
      cliidArrAll = [];
      for (let obj of reports) {
        num = num + obj.value;
        for (let c of obj.cliidArr) {
          cliidArrAll.push(c);
        }
        obj.ratio = RequestsTongFactor.ratioParsing(obj.value / tong.length);
        delete obj.regex;
      }
      cliidArrLeft = [];
      for (let { cliid } of tong) {
        if (!cliidArrAll.includes(cliid)) {
          cliidArrLeft.push(cliid);
        }
      }
      if (cliidArrLeft.length > 0) {
        reports.push({
          name: "알 수 없음",
          value: tong.length - num,
          ratio: RequestsTongFactor.ratioParsing((tong.length - num) / tong.length),
          cliidArr: cliidArrLeft
        });
        throw new Error("problem in address : " + JSON.stringify(cliidArrLeft));
      }
      return { total: tong.length, average: null, detail: reports };
    }

    reportPyeong() {
      const tong = this.tong;
      const reports = [
        { name: "0 ~ 9", from: 0, to: 10, value: 0, ratio: 0, cliidArr: [] },
        { name: "10 ~ 24", from: 10, to: 25, value: 0, ratio: 0, cliidArr: [] },
        { name: "25 ~ 29", from: 25, to: 30, value: 0, ratio: 0, cliidArr: [] },
        { name: "30 ~ 34", from: 30, to: 35, value: 0, ratio: 0, cliidArr: [] },
        { name: "35 ~ 39", from: 35, to: 40, value: 0, ratio: 0, cliidArr: [] },
        { name: "40 ~ 44", from: 40, to: 45, value: 0, ratio: 0, cliidArr: [] },
        { name: "45 ~ 49", from: 45, to: 50, value: 0, ratio: 0, cliidArr: [] },
        { name: "50 ~ ", from: 50, to: 900000000, value: 0, ratio: 0, cliidArr: [] },
      ];
      const targetArr = tong.getPyeong();
      let total = 0;
      for (let { value } of targetArr) {
        total += value;
      }
      for (let obj of reports) {
        for (let { cliid, value } of targetArr) {
          if (obj.from <= value && obj.to > value) {
            obj.value = obj.value + 1;
            obj.cliidArr.push(cliid);
          }
        }
      }
      for (let obj of reports) {
        obj.ratio = RequestsTongFactor.ratioParsing(obj.value / tong.length);
        delete obj.from;
        delete obj.to;
      }
      return { total: tong.length, average: RequestsTongFactor.pyeongParsing(total / tong.length), detail: reports };
    }

    reportLiving() {
      const tong = this.tong;
      const reports = [
        { name: "거주중", boo: true, value: 0, ratio: 0, cliidArr: [] },
        { name: "이사 예정", boo: false, value: 0, ratio: 0, cliidArr: [] },
      ];
      const targetArr = tong.getLiving();
      for (let obj of reports) {
        for (let { cliid, value } of targetArr) {
          if (obj.boo === value) {
            obj.value = obj.value + 1;
            obj.cliidArr.push(cliid);
          }
        }
      }
      for (let obj of reports) {
        obj.ratio = RequestsTongFactor.ratioParsing(obj.value / tong.length);
        delete obj.boo;
      }
      return { total: tong.length, average: null, detail: reports };
    }

    reportContract() {
      const tong = this.tong;
      const reports = [
        { name: "자가", regex: new RegExp("^자"), value: 0, ratio: 0, cliidArr: [] },
        { name: "전월세", regex: new RegExp("^[전월임]"), value: 0, ratio: 0, cliidArr: [] },
      ];
      const targetArr = tong.getContract();
      for (let obj of reports) {
        for (let { cliid, value } of targetArr) {
          if (obj.regex.test(value)) {
            obj.value = obj.value + 1;
            obj.cliidArr.push(cliid);
          }
        }
      }

      let num;
      let cliidArrAll, cliidArrLeft;
      num = 0;
      cliidArrAll = [];
      for (let obj of reports) {
        num = num + obj.value;
        for (let c of obj.cliidArr) {
          cliidArrAll.push(c);
        }
        obj.ratio = RequestsTongFactor.ratioParsing(obj.value / tong.length);
        delete obj.regex;
      }
      cliidArrLeft = [];
      for (let { cliid } of tong) {
        if (!cliidArrAll.includes(cliid)) {
          cliidArrLeft.push(cliid);
        }
      }
      if (cliidArrLeft.length > 0) {
        reports.push({
          name: "알 수 없음",
          value: tong.length - num,
          ratio: RequestsTongFactor.ratioParsing((tong.length - num) / tong.length),
          cliidArr: cliidArrLeft
        });
        throw new Error("problem in contract : " + JSON.stringify(cliidArrLeft));
      }
      return { total: tong.length, average: null, detail: reports };
    }

    reportMovingDay() {
      const valuePasing = function (num) {
        return (((num / 1000) / 60) / 60) / 24;
      }
      const tong = this.tong;
      const reports = [
        { name: "30일 이하", from: 0, to: 30, value: 0, ratio: 0, cliidArr: [] },
        { name: "30일 이상", from: 30, to: 900000000, value: 0, ratio: 0, cliidArr: [] },
      ];
      const targetArr = tong.getMovingDay();
      let total = 0;
      let exceptionList;
      exceptionList = [];
      for (let { value } of targetArr) {
        if (valuePasing(value) > 365) {
          exceptionList.push(valuePasing(value));
        } else {
          total += valuePasing(value);
        }
      }
      for (let obj of reports) {
        for (let { cliid, value } of targetArr) {
          if (obj.from <= valuePasing(value) && obj.to > valuePasing(value)) {
            obj.value = obj.value + 1;
            obj.cliidArr.push(cliid);
          }
        }
      }
      for (let obj of reports) {
        obj.ratio = RequestsTongFactor.ratioParsing(obj.value / tong.length);
        delete obj.from;
        delete obj.to;
      }
      return { total: tong.length, average: RequestsTongFactor.dayParsing(total / (tong.length - exceptionList.length)), detail: reports };
    }

    reportAll() {
      let finalReport, tempObj;

      finalReport = {};

      finalReport.name = this.name;
      finalReport.date = this.date;

      tempObj = this.reportBudget();
      finalReport.total = tempObj.total;
      finalReport.budget = {};
      finalReport.budget.average = tempObj.average;
      finalReport.budget.detail = tempObj.detail;

      tempObj = this.reportAddress();
      finalReport.address = {};
      finalReport.address.average = tempObj.average;
      finalReport.address.detail = tempObj.detail;

      tempObj = this.reportPyeong();
      finalReport.pyeong = {};
      finalReport.pyeong.average = tempObj.average;
      finalReport.pyeong.detail = tempObj.detail;

      tempObj = this.reportLiving();
      finalReport.living = {};
      finalReport.living.average = tempObj.average;
      finalReport.living.detail = tempObj.detail;

      tempObj = this.reportContract();
      finalReport.contract = {};
      finalReport.contract.average = tempObj.average;
      finalReport.contract.detail = tempObj.detail;

      tempObj = this.reportMovingDay();
      finalReport.movingDay = {};
      finalReport.movingDay.average = tempObj.average;
      finalReport.movingDay.detail = tempObj.detail;

      return finalReport;
    }

  }

  class RequestsTong extends Array {

    search(fromToArr) {
      if (!Array.isArray(fromToArr)) {
        throw new Error("input must be array: [ from: Date, to: Date ]");
      } else {
        if (fromToArr.length !== 2) {
          throw new Error("input must be array: [ from: Date, to: Date ]");
        } else {
          const [ from, to ] = fromToArr;
          let tong;
          tong = new RequestsTong();
          for (let i of this) {
            if (i.request.timeline.valueOf() >= from.valueOf()) {
              if (i.request.timeline.valueOf() < to.valueOf()) {
                tong.push(i);
              }
            }
          }
          tong.sort((a, b) => {
            return b.request.timeline.valueOf() - a.request.timeline.valueOf();
          });
          return tong;
        }
      }
    }

    getBudget() {
      let result = new TongReports();
      for (let { cliid, request } of this) {
        result.push(new TongReport(cliid, Number(request.budget.value.replace(/[^0-9]/g, ''))));
      }
      return result;
    }

    getAddress() {
      let result = new TongReports();
      for (let { cliid, request } of this) {
        result.push(new TongReport(cliid, request.space.address.value));
      }
      return result;
    }

    getPyeong() {
      let result = new TongReports();
      for (let { cliid, request } of this) {
        result.push(new TongReport(cliid, request.space.pyeong.value));
      }
      return result;
    }

    getLiving() {
      let result = new TongReports();
      for (let { cliid, request } of this) {
        result.push(new TongReport(cliid, request.space.resident.living));
      }
      return result;
    }

    getContract() {
      let result = new TongReports();
      for (let { cliid, request } of this) {
        result.push(new TongReport(cliid, request.space.contract.value));
      }
      return result;
    }

    getMovingDay() {
      let result = new TongReports();
      for (let { cliid, request } of this) {
        if (request.space.resident.living) {
          result.push(new TongReport(cliid, 0));
        } else {
          if (request.space.resident.expected.getFullYear() > 2000) {
            if (request.space.resident.expected.valueOf() - request.timeline.valueOf() < 0) {
              result.push(new TongReport(cliid, 0));
            } else {
              result.push(new TongReport(cliid, (request.space.resident.expected.valueOf() - request.timeline.valueOf())));
            }
          } else {
            result.push(new TongReport(cliid, 0));
          }
        }
      }
      return result;
    }

  }

  Clients.prototype.getType = function () {
    let arr = new ClientTypes();
    let tempArr;
    for (let i of this) {
      tempArr = i.getType();
      for (let j of tempArr) {
        arr.push(j);
      }
    }
    return arr;
  }

  Clients.prototype.toMessage = function () {
    let arr = [];
    for (let i of this) {
      arr.push(i.toMessage());
    }
    return arr;
  }

  Clients.prototype.flatDeath = function () {
    let tong, tempArr;
    tong = [];
    for (let i of this) {
      tempArr = i.flatDeath();
      for (let j of tempArr) {
        tong.push(j);
      }
    }
    return tong;
  }

  Clients.prototype.dimensionSqueeze = function () {
    const TABLE_NAME = "client";
    const LONG_TARGETS = [
      "comment"
    ]
    class SqlModel {
      constructor(sample) {
        for (let i in sample) {
          if (typeof sample[i] === "string") {
            this[i] = "VARCHAR(255)";
          } else if (typeof sample[i] === "number") {
            this[i] = "INT(11)";
          } else if (typeof sample[i] === "boolean") {
            this[i] = "INT(11)";
          } else {
            this[i] = "VARCHAR(255)";
          }
          if (LONG_TARGETS.includes(i)) {
            this[i] = "TEXT";
          }
        }
      }

      getName() {
        return TABLE_NAME;
      }

      getCreateSql() {
        let sql = "CREATE TABLE \`" + this.getName() + "\` (";
        sql += "id INT(11) NOT NULL AUTO_INCREMENT,";
        sql += " ";
        for (let i in this) {
          sql += "\`";
          sql += i;
          sql += "\`";
          sql += " ";
          sql += this[i];
          sql += ", ";
        }
        sql += "PRIMARY KEY (id));";
        return sql;
      }

      getDropSql() {
        let sql = "DROP TABLE " + this.getName() + ";";
        return sql;
      }

    }
    class SqlTong extends Array {
      getName() {
        return TABLE_NAME;
      }

      getInsertSql() {
        let arr = [];
        for (let i of this) {
          arr.push(i.getInsertSql());
        }
        return arr;
      }

    }
    class SqlTongFactor {
      constructor(sample) {
        for (let i in sample) {
          if (typeof sample[i] === "string") {
            this[i] = sample[i];
          } else if (typeof sample[i] === "number") {
            this[i] = sample[i];
          } else if (typeof sample[i] === "boolean") {
            if (sample[i]) {
              this[i] = 1;
            } else {
              this[i] = 0;
            }
          } else {
            this[i] = JSON.stringify(sample[i]);
          }
        }
      }

      getName() {
        return TABLE_NAME;
      }

      getInsertSql() {
        let sql = "INSERT INTO \`" + this.getName() + "\` (";
        for (let i in this) {
          sql += "\`";
          sql += i;
          sql += "\`";
          sql += ",";
        }

        sql = sql.slice(0, -1);
        sql += ") VALUES (";

        for (let i in this) {
          if (typeof this[i] === "number") {
            sql += this[i];
          } else {
            if (/^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]$/gi.test(this[i])) {
              sql += "STR_TO_DATE('";
              sql += this[i].replace(/'/g, '"');
              sql += "', '%Y-%m-%d')";
            } else if (/^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9] [0-9][0-9]\:[0-9][0-9]\:[0-9][0-9]$/gi.test(this[i])) {
              sql += "STR_TO_DATE('";
              sql += this[i].replace(/'/g, '"');
              sql += "', '%Y-%m-%d %H:%i:%s')";
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

        return sql;
      }
    }

    let tong, tempArr;
    let sample, model;

    tong = new SqlTong();

    for (let i of this) {
      tempArr = i.dimensionSqueeze();
      for (let j of tempArr) {
        tong.push(new SqlTongFactor(j));
      }
    }

    if (tong.length > 0) {
      sample = tong[0];
      model = new SqlModel(sample);
      return { model, data: tong };
    } else {
      return null;
    }
  }

  Clients.prototype.getRequestsTong = function () {
    let tong, tempArr;
    tong = new RequestsTong();
    for (let i of this) {
      tempArr = i.requests;
      for (let j = 0; j < tempArr.length; j++) {
        tempArr[j].cliid = i.cliid;
        tempArr[j].name = i.name;
        tempArr[j].phone = i.phone;
        tempArr[j].index = j;
        tong.push(tempArr[j]);
      }
    }
    tong.sort((a, b) => {
      return b.request.timeline.valueOf() - a.request.timeline.valueOf();
    });
    return tong;
  }

  Clients.prototype.getRequestsTongsMonthly = function () {
    const today = new Date();
    const minimum = new Date(2019, 2, 1);
    if (today.valueOf() < minimum.valueOf()) {
      throw new Error("invaild date");
    }
    let tongs, tong, tongChild;
    let searchTargets;
    let monthNumber, monthConst;
    let tempObj, tempDateFrom, tempDateTo;

    monthNumber = ((today.getFullYear() * 12) + (today.getMonth() + 1)) - ((minimum.getFullYear() * 12) + (minimum.getMonth() + 1));
    monthConst = 1000 * 60 * 60 * 24 * 32;

    searchTargets = [];
    tempDateFrom = new Date(minimum.valueOf());
    tempDateFrom.setDate(1);
    tempDateTo = new Date(tempDateFrom.valueOf() + monthConst);
    tempDateTo.setDate(1);
    searchTargets.push([ tempDateFrom, tempDateTo ]);

    for (let i = 0; i < monthNumber; i++) {
      tempDateFrom = new Date(tempDateFrom.valueOf() + monthConst);
      tempDateFrom.setDate(1);
      tempDateTo = new Date(tempDateFrom.valueOf() + monthConst);
      tempDateTo.setDate(1);
      searchTargets.push([ tempDateFrom, tempDateTo ]);
    }

    tong = this.getRequestsTong();
    tongs = new RequestsTongs();
    for (let [ from, to ] of searchTargets) {
      tongChild = tong.search([ from, to ]);
      tongs.push(new RequestsTongFactor({ name: `${String(from.getFullYear()).slice(2)}년 ${String(from.getMonth() + 1)}월`, date: from, tong: tongChild }));
    }

    tongs.sort((a, b) => {
      return b.date.valueOf() - a.date.valueOf();
    });

    return tongs;
  }

  Clients.prototype.search = function (cliid) {
    let result = null;
    for (let i of this) {
      if (i.cliid === cliid) {
        result = i;
        break;
      }
    }
    return result;
  }

  Clients.prototype.pick = function (cliid) {
    return this.search(cliid);
  }

  return Clients;
}

module.exports = { ClientMap, Client, Clients, Tools: { withTools, withToolsArr } };
