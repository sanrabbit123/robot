// constructForm : 고객이 시공사 선택을 홈리에종 시공사로 선택하였을 때, 인테리어 시공 계약서를 고객과 홈리에종이 쓰게 되는데, 그 때 계약서 정보를 위드싸인으로부터 가져와 저장하는 db입니다.

/**
 * @constant
 * @type {Object}
 * @description 홈리에종과 고객 간의 인테리어 시공 계약서 정보를 저장한 샘플 데이터 0.
 */
const sampleData0 = {
  "id": "64c32871f8891ca14dc4267a", // 계약서 고유 ID. DB에서 이 계약서를 식별하는 데 사용됩니다.
  "date": new Date("2023-07-28T02:31:13.000Z"), // 계약서가 작성된 날짜와 시간.
  "name": "시공계약서_이은영고객님_주홈리에종_230728", // 계약서 이름. 고객 이름과 작성 날짜가 포함되어 있음.
  "proid": "p2303_ab13s", // 프로젝트 ID. 해당 계약이 관련된 프로젝트를 식별하는 고유 ID.
  "client": { // 계약서와 관련된 고객 정보를 포함하는 객체.
    "cliid": "c2303_ab20s", // 고객 ID. 해당 계약서와 관련된 고객을 식별하는 고유 ID.
    "requestNumber": 0 // 고객이 요청한 상담문의 횟수. 이 계약서가 몇 번째 요청에 의한 것인지를 나타냄.
  },
  "confirm": true, // 계약서가 확인되었는지 여부. true면 계약이 확정된 상태.
  "detail": { // 계약서의 세부 정보를 포함하는 객체.
    "id": "64c32871f8891ca14dc4267a", // 세부 정보와 관련된 계약서의 고유 ID.
    "name": "이은영", // 고객의 이름.
    "email": "oolydioo@naver.com", // 고객의 이메일 주소.
    "mobile": "01084668009", // 고객의 휴대전화 번호.
    "password": null, // 계약서 접근 시 사용할 비밀번호. 이 경우 설정되지 않음.
    "send_url": "https://s.widsign.com/e17fc16887", // 고객에게 발송된 계약서 URL.
    "send_url_mobile": "https://s.widsign.com/7f721243b4", // 모바일용 계약서 URL.
    "email_sent_date": "2023-07-28 11:31:14", // 계약서가 이메일로 발송된 날짜와 시간.
    "sms_sent_date": "2023-07-28 11:31:14", // 계약서가 SMS로 발송된 날짜와 시간.
    "doc_status": "END", // 계약서 상태. "END"는 모든 절차가 완료된 상태를 의미.
    "group_number": 1 // 그룹 번호. 동일한 계약서 그룹에 속하는 문서들을 구분하기 위한 번호.
  },
  "form": "62eb773aa946c12c4847f930", // 계약서의 양식 ID. 어떤 템플릿으로 작성되었는지를 나타냄.
  "history": [ // 계약서와 관련된 이력 정보 배열. 각 행동과 그에 따른 상태 변화를 기록함.
    {
      "action": "\"이은영\"님에게 문서를 전송했습니다.", // 이력의 세부 설명. 고객에게 문서가 전송되었음을 나타냄.
      "status": "WR", // 문서 전송 당시의 상태. "WR"은 전송을 의미.
      "ip": "::ffff:15.164.218.152", // 해당 작업이 수행된 IP 주소.
      "date": new Date("2023-07-28T02:31:14.000Z") // 해당 작업이 수행된 날짜와 시간.
    },
    {
      "action": "'이은영'님이 문서작성을 시작했습니다.", // 고객이 문서 작성을 시작한 시점의 기록.
      "status": "WS", // 문서 작성 상태. "WS"는 작성 시작을 의미.
      "ip": "49.164.254.210", // 해당 작업이 수행된 IP 주소.
      "date": new Date("2023-07-28T05:11:02.000Z") // 해당 작업이 수행된 날짜와 시간.
    },
    {
      "action": "'이은영'님에게 문서를 재전송했습니다.", // 고객에게 문서를 다시 전송한 기록.
      "status": "WR", // 문서 재전송 상태. "WR"은 전송을 의미.
      "ip": "218.39.149.210", // 해당 작업이 수행된 IP 주소.
      "date": new Date("2023-07-31T06:39:30.000Z") // 해당 작업이 수행된 날짜와 시간.
    },
    {
      "action": "'이은영'님이 문서작성을 시작했습니다.", // 고객이 문서 작성을 시작한 시점의 기록 (재전송 후).
      "status": "WS", // 문서 작성 상태. "WS"는 작성 시작을 의미.
      "ip": "106.101.194.39", // 해당 작업이 수행된 IP 주소.
      "date": new Date("2023-07-31T06:40:22.000Z") // 해당 작업이 수행된 날짜와 시간.
    },
    {
      "action": "'이은영'님이 문서작성을 완료했습니다.", // 고객이 문서 작성을 완료한 시점의 기록.
      "status": "WE", // 문서 작성 완료 상태. "WE"는 완료를 의미.
      "ip": "106.101.194.39", // 해당 작업이 수행된 IP 주소.
      "date": new Date("2023-07-31T06:41:45.000Z") // 해당 작업이 수행된 날짜와 시간.
    },
    {
      "action": "모든 참여자의 서명이 완료되었습니다.", // 모든 계약 관련자들의 서명이 완료된 시점의 기록.
      "status": "FF", // 서명 완료 상태. "FF"는 최종 완료를 의미.
      "date": new Date("2023-07-31T06:41:55.000Z") // 해당 작업이 수행된 날짜와 시간.
    }
  ]
};

const sampleData1 = {
  "id": "64ca1707d7b2e9390c2bc020",
  "date": new Date("2023-08-02T08:42:47.000Z"),
  "name": "시공계약서_정재필고객님_주홈리에종_230802",
  "proid": "p2305_aa37s",
  "client": {
    "cliid": "c2305_aa46s",
    "requestNumber": 0
  },
  "confirm": true,
  "detail": {
    "id": "64ca1707d7b2e9390c2bc020",
    "name": "정재필",
    "email": "feelstay79@naver.com",
    "mobile": "01028129604",
    "password": null,
    "send_url": "https://s.widsign.com/feadaa73f9",
    "send_url_mobile": "https://s.widsign.com/dc1945a83f",
    "email_sent_date": "2023-08-02 17:42:48",
    "sms_sent_date": "2023-08-02 17:42:48",
    "doc_status": "END",
    "group_number": 1
  },
  "form": "62eb773aa946c12c4847f930",
  "history": [
    {
      "action": "\"정재필\"님에게 문서를 전송했습니다.",
      "status": "WR",
      "ip": "::ffff:15.164.218.152",
      "date": new Date("2023-08-02T08:42:48.000Z")
    },
    {
      "action": "'정재필'님이 문서작성을 시작했습니다.",
      "status": "WS",
      "ip": "175.193.75.91",
      "date": new Date("2023-08-02T08:53:30.000Z")
    },
    {
      "action": "'정재필'님이 문서작성을 완료했습니다.",
      "status": "WE",
      "ip": "175.193.75.91",
      "date": new Date("2023-08-02T08:54:11.000Z")
    },
    {
      "action": "모든 참여자의 서명이 완료되었습니다.",
      "status": "FF",
      "date": new Date("2023-08-02T08:54:18.000Z")
    }
  ]
}

const sampleData2 = {
  "id": "64ddca9383e8461a3b7452d1",
  "date": new Date("2023-08-17T07:21:55.000Z"),
  "name": "시공계약서_이주윤고객님_주홈리에종_230817",
  "proid": "p2307_ab18s",
  "client": {
    "cliid": "c2307_ab26s",
    "requestNumber": 0
  },
  "confirm": true,
  "detail": {
    "id": "64ddca9383e8461a3b7452d1",
    "name": "이주윤",
    "email": "jooyoon9212@naver.com",
    "mobile": "01073099212",
    "password": null,
    "send_url": "https://s.widsign.com/5452d9c5af",
    "send_url_mobile": "https://s.widsign.com/a93bf3fa99",
    "email_sent_date": "2023-08-17 16:21:55",
    "sms_sent_date": "2023-08-17 16:21:55",
    "doc_status": "END",
    "group_number": 1
  },
  "form": "62eb773aa946c12c4847f930",
  "history": [
    {
      "action": "\"이주윤\"님에게 문서를 전송했습니다.",
      "status": "WR",
      "ip": "::ffff:15.164.128.55",
      "date": new Date("2023-08-17T07:21:55.000Z")
    },
    {
      "action": "'이주윤'님이 문서작성을 시작했습니다.",
      "status": "WS",
      "ip": "61.82.8.194",
      "date": new Date("2023-08-17T07:24:57.000Z")
    },
    {
      "action": "'이주윤'님이 문서작성을 완료했습니다.",
      "status": "WE",
      "ip": "61.82.8.194",
      "date": new Date("2023-08-17T07:26:20.000Z")
    },
    {
      "action": "모든 참여자의 서명이 완료되었습니다.",
      "status": "FF",
      "date": new Date("2023-08-17T07:26:31.000Z")
    }
  ]
}

const sampleData3 = {
  "id": "6507dae6d54891a77535640f",
  "date": new Date("2023-09-18T05:06:46.000Z"),
  "name": "시공계약서_김수연고객님_주홈리에종_230918",
  "proid": "p2208_aa91s",
  "client": {
    "cliid": "c2208_aa88s",
    "requestNumber": 0
  },
  "confirm": true,
  "detail": {
    "id": "6507dae6d54891a77535640f",
    "name": "김수연",
    "email": "ksy150426@naver.com",
    "mobile": "01077553667",
    "password": null,
    "send_url": "https://s.widsign.com/cb9804e1af",
    "send_url_mobile": "https://s.widsign.com/9e1a0021e8",
    "email_sent_date": "2023-09-18 14:06:46",
    "sms_sent_date": "2023-09-18 14:06:46",
    "doc_status": "END",
    "group_number": 1
  },
  "form": "62eb773aa946c12c4847f930",
  "history": [
    {
      "action": "\"김수연\"님에게 문서를 전송했습니다.",
      "status": "WR",
      "ip": "218.39.149.210",
      "date": new Date("2023-09-18T05:06:46.000Z")
    },
    {
      "action": "'김수연'님이 문서작성을 시작했습니다.",
      "status": "WS",
      "ip": "219.255.229.29",
      "date": new Date("2023-09-18T05:08:49.000Z")
    },
    {
      "action": "'김수연'님이 문서작성을 완료했습니다.",
      "status": "WE",
      "ip": "219.255.229.29",
      "date": new Date("2023-09-18T05:13:35.000Z")
    },
    {
      "action": "모든 참여자의 서명이 완료되었습니다.",
      "status": "FF",
      "date": new Date("2023-09-18T05:13:42.000Z")
    }
  ]
}

const sampleData4 = {
  "id": "6583cd7ad5dd12fcfb20870f",
  "date": new Date("2023-12-21T05:30:34.000Z"),
  "name": "시공계약서_김은경고객님_주홈리에종_231221",
  "proid": "p2306_ab19s",
  "client": {
    "cliid": "c2306_ab27s",
    "requestNumber": 0
  },
  "confirm": true,
  "detail": {
    "id": "6583cd7ad5dd12fcfb20870f",
    "name": "김은경",
    "email": "Kimeunk13@naver.com",
    "mobile": "01026568489",
    "password": null,
    "send_url": "https://s.widsign.com/e2c4d53973",
    "send_url_mobile": "https://s.widsign.com/4b667c6794",
    "email_sent_date": "2023-12-21 14:30:34",
    "sms_sent_date": "2023-12-21 14:30:34",
    "doc_status": "END",
    "group_number": 1
  },
  "form": "651e7413fbcd2144a51009ba",
  "history": [
    {
      "action": "\"김은경\"님에게 문서를 전송했습니다.",
      "status": "WR",
      "ip": "::ffff:15.164.128.55",
      "date": new Date("2023-12-21T05:30:34.000Z")
    },
    {
      "action": "'김은경'님이 문서작성을 시작했습니다.",
      "status": "WS",
      "ip": "114.204.134.200",
      "date": new Date("2023-12-21T05:41:00.000Z")
    },
    {
      "action": "'김은경'님이 문서작성을 완료했습니다.",
      "status": "WE",
      "ip": "114.204.134.200",
      "date": new Date("2023-12-21T05:42:55.000Z")
    },
    {
      "action": "모든 참여자의 서명이 완료되었습니다.",
      "status": "FF",
      "date": new Date("2023-12-21T05:43:08.000Z")
    }
  ]
}

/**
 * @module constructForm
 * @description 고객과 홈리에종 간의 인테리어 시공 계약서를 관리하는 모듈.
 */
module.exports = {
  collection: "constructForm", // DB에서 사용할 컬렉션 이름을 지정.
  
  /**
   * 메인 함수로, 새로운 계약서 데이터를 DB에 업데이트합니다.
   * @function
   * @param {Function} alive - Mother 객체에서 필요한 메서드를 가져오는 함수.
   * @param {Array} updateQueryArr - 업데이트할 계약서 JSON 데이터 배열.
   * @param {Object} mother - Mother 클래스의 인스턴스. 데이터베이스와의 상호작용을 관리.
   * @returns {Array} tong - 업데이트된 계약서 데이터를 포함하는 객체 배열.
   */
  main: function (alive, updateQueryArr, mother) {
    let map, fresh, findQuery, tong, insertEvent;

    // 계약서 데이터를 구조화하는 데 사용할 기본 스키마를 정의.
    map = {
      structure: {
        id: "", // 계약서의 고유 ID.
        date: new Date(), // 계약서 작성 날짜.
        name: "", // 계약서 이름.
        proid: "", // 프로젝트 ID.
        client: { // 고객 정보를 포함하는 객체.
          cliid: "", // 고객 ID.
          requestNumber: 0 // 상담 문의 횟수.
        }
      },
      // 주어진 계약서의 프로젝트 ID(proid)를 사용하여 데이터를 찾는 함수.
      find: (fresh) => { return { proid: fresh.proid } }
    };

    // Mother 객체로부터 ConstructForm 클래스를 가져옴.
    const { ConstructForm } = alive(mother);

    // 업데이트할 데이터를 저장할 배열.
    tong = [];

    // 업데이트할 계약서 데이터를 순회하면서 처리.
    for (let json of updateQueryArr) {
      fresh = new ConstructForm(null); // 새로운 ConstructForm 객체 생성.
      fresh.make(json); // 주어진 JSON 데이터를 사용하여 객체 초기화.
      findQuery = map.find(fresh); // 프로젝트 ID를 사용하여 데이터베이스에서 계약서를 찾음.
      insertEvent = async function (fresh) {} // 비동기 이벤트 함수. 현재 빈 함수로 정의됨.
      tong.push({ fresh, findQuery, insertEvent }); // 업데이트된 데이터를 배열에 추가.
    }

    return tong; // 최종 업데이트된 계약서 데이터를 반환.
  },

  /**
   * alive 함수는 ConstructForm 클래스를 생성하여 반환합니다.
   * @function
   * @param {Object} mother - Mother 클래스의 인스턴스.
   * @returns {Object} ConstructForm 클래스를 포함하는 객체를 반환.
   */
  alive: function (mother) {
    /**
     * ConstructForm 클래스는 개별 계약서 데이터를 관리하는 클래스입니다.
     * @class
     */
    class ConstructForm {
      /**
       * @constructor
       * @param {Object|null} json - 초기화할 데이터 객체 또는 null.
       */
      constructor(json) {
        if (json !== null) { // json 데이터가 null이 아닌 경우에만 초기화.
          if (typeof json === "object") { // json이 객체일 때만 처리.
            this.id = json.id; // 계약서 ID 설정.
            this.date = json.date; // 계약서 작성 날짜 설정.
            this.name = json.name; // 계약서 이름 설정.
            this.proid = json.proid; // 프로젝트 ID 설정.
            this.client = json.client; // 고객 정보 설정.
          }
        }
      }

      /**
       * make 메서드는 주어진 json 데이터를 사용하여 객체를 초기화합니다.
       * @param {Object} json - 초기화할 데이터 객체.
       */
      make(json) {
        this.id = json.id; // 계약서 ID 설정.
        this.date = new Date(); // 현재 날짜와 시간으로 계약서 작성 날짜 설정.
        this.name = json.name; // 계약서 이름 설정.
        this.proid = json.proid; // 프로젝트 ID 설정.
        this.client = {}; // 고객 정보 객체 초기화.
        this.client.cliid = json.cliid; // 고객 ID 설정.
        this.client.requestNumber = json.requestNumber; // 상담 문의 횟수 설정.
      }
    }
    return { ConstructForm }; // ConstructForm 클래스를 포함하는 객체 반환.
  },

  /**
   * wrap 함수는 주어진 JSON 배열을 ConstructForm 객체로 변환하여 반환합니다.
   * @function
   * @param {Function} alive - Mother 객체에서 필요한 메서드를 가져오는 함수.
   * @param {Array} jsonArr - JSON 데이터 배열.
   * @param {Object} mother - Mother 클래스의 인스턴스.
   * @returns {Array} ConstructForms 객체들을 포함하는 배열을 반환.
   */
  wrap: function (alive, jsonArr, mother) {
    // alive 메서드를 통해 ConstructForm 클래스를 가져옴.
    const { ConstructForm } = alive(mother);

    /**
     * ConstructForms 클래스는 여러 ConstructForm 객체를 관리하는 배열 클래스입니다.
     * @class
     */
    class ConstructForms extends Array {
      /**
       * search 메서드는 주어진 ID를 기준으로 배열에서 특정 객체를 검색합니다.
       * @param {string} id - 검색할 객체의 ID.
       * @returns {Object|null} 검색된 객체를 반환하거나, 없으면 null을 반환.
       */
      search(id) {
        let target;
        target = null; // 검색된 객체를 저장할 변수, 초기값은 null.
        for (let o of this) { // 배열을 순회하면서 ID를 비교함.
          if (o.id === id) { // ID가 일치하는 경우.
            target = o; // 해당 객체를 target에 저장.
            break; // 검색 완료, 반복문을 종료.
          }
        }
        return target; // 검색된 객체 또는 null을 반환.
      }
    }

    let arr;
    arr = new ConstructForms(); // ConstructForms 배열을 생성.

    // JSON 데이터를 순회하며 ConstructForm 객체를 생성하여 배열에 추가.
    for (let json of jsonArr) {
      arr.push(new ConstructForm(json)); // ConstructForm 객체 생성 후 배열에 추가.
    }

    return arr; // 최종 ConstructForms 배열을 반환.
  }
};
