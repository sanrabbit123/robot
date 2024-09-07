// designerForm : 인테리어 디자이너 신청자가 최종적으로 홈리에종과 협약하기로 계약할 때 쓰는 디자이너 계약서로 위드싸인으로부터 정보를 가져와 저장하는 db입니다.

/**
 * @constant
 * @type {Object}
 * @description 홈리에종과 디자이너 간의 서비스 제휴 계약서 정보를 저장한 샘플 데이터 0.
 */
const sampleData0 = {
  "id": "65b330def913cfac85fd4b21", // 계약서 고유 ID. DB에서 이 계약서를 식별하는 데 사용됩니다.
  "date": new Date("2024-01-26T04:11:10.000Z"), // 계약서가 작성된 날짜와 시간.
  "name": "2023디자인서비스제휴계약서_이효정디자이너_240126", // 계약서 이름. 디자이너 이름과 작성 날짜가 포함되어 있음.
  "aspid": "a2311_aa14s", // 디자이너의 고유 ID. 해당 계약이 관련된 디자이너를 식별하는 고유 ID.
  "confirm": true, // 계약서가 확정되었는지 여부. true면 계약이 완료된 상태.
  "detail": { // 계약서의 세부 정보를 포함하는 객체.
    "id": "65b330def913cfac85fd4b21", // 세부 정보와 관련된 계약서의 고유 ID.
    "name": "이효정", // 디자이너의 이름.
    "email": "leehyojoung1@gmail.com", // 디자이너의 이메일 주소.
    "mobile": "01063532366", // 디자이너의 휴대전화 번호.
    "password": null, // 계약서 접근 시 사용할 비밀번호. 이 경우 설정되지 않음.
    "send_url": "https://s.widsign.com/4782798375", // 디자이너에게 발송된 계약서 URL.
    "send_url_mobile": "https://s.widsign.com/b8e97d3816", // 모바일용 계약서 URL.
    "email_sent_date": "2024-01-26 13:11:10", // 계약서가 이메일로 발송된 날짜와 시간.
    "sms_sent_date": "2024-01-26 13:11:10", // 계약서가 SMS로 발송된 날짜와 시간.
    "doc_status": "END", // 계약서 상태. "END"는 모든 절차가 완료된 상태를 의미.
    "group_number": 1 // 그룹 번호. 동일한 계약서 그룹에 속하는 문서들을 구분하기 위한 번호.
  },
  "form": "6440daee985b3958acddbd4e", // 계약서의 양식 ID. 어떤 템플릿으로 작성되었는지를 나타냄.
  "history": [ // 계약서와 관련된 이력 정보 배열. 각 행동과 그에 따른 상태 변화를 기록함.
    {
      "action": "\"이효정\"님에게 문서를 전송했습니다.", // 이력의 세부 설명. 디자이너에게 문서가 전송되었음을 나타냄.
      "status": "WR", // 문서 전송 당시의 상태. "WR"은 전송을 의미.
      "ip": "::ffff:15.164.128.55", // 해당 작업이 수행된 IP 주소.
      "date": new Date("2024-01-26T04:11:10.000Z") // 해당 작업이 수행된 날짜와 시간.
    },
    {
      "action": "'이효정'님이 문서작성을 시작했습니다.", // 디자이너가 문서 작성을 시작한 시점의 기록.
      "status": "WS", // 문서 작성 상태. "WS"는 작성 시작을 의미.
      "ip": "223.38.90.28", // 해당 작업이 수행된 IP 주소.
      "date": new Date("2024-01-26T07:36:58.000Z") // 해당 작업이 수행된 날짜와 시간.
    },
    {
      "action": "'이효정'님이 문서작성을 시작했습니다.", // 동일한 상태 기록이 반복됨.
      "status": "WS", // 문서 작성 상태. "WS"는 작성 시작을 의미.
      "ip": "223.38.90.28", // 해당 작업이 수행된 IP 주소.
      "date": new Date("2024-01-26T08:09:26.000Z") // 해당 작업이 수행된 날짜와 시간.
    },
    {
      "action": "'이효정'님이 문서작성을 완료했습니다.", // 디자이너가 문서 작성을 완료한 시점의 기록.
      "status": "WE", // 문서 작성 완료 상태. "WE"는 완료를 의미.
      "ip": "223.38.90.28", // 해당 작업이 수행된 IP 주소.
      "date": new Date("2024-01-26T08:09:55.000Z") // 해당 작업이 수행된 날짜와 시간.
    },
    {
      "action": "모든 참여자의 서명이 완료되었습니다.", // 모든 계약 관련자들의 서명이 완료된 시점의 기록.
      "status": "FF", // 서명 완료 상태. "FF"는 최종 완료를 의미.
      "date": new Date("2024-01-26T08:10:16.000Z") // 해당 작업이 수행된 날짜와 시간.
    }
  ]
};

const sampleData1 = {
  "id": "65b744b5014615c79a7e154c",
  "date": new Date("2024-01-29T06:24:53.000Z"),
  "name": "2023디자인서비스제휴계약서_조예경디자이너_240129",
  "aspid": "a2312_aa01s",
  "confirm": true,
  "detail": {
    "id": "65b744b5014615c79a7e154c",
    "name": "조예경",
    "email": "choyes0412@naver.com",
    "mobile": "01076115291",
    "password": null,
    "send_url": "https://s.widsign.com/2fcc92a2a0",
    "send_url_mobile": "https://s.widsign.com/7d0f0f7d4d",
    "email_sent_date": "2024-01-29 15:24:53",
    "sms_sent_date": "2024-01-29 15:24:53",
    "doc_status": "END",
    "group_number": 1
  },
  "form": "6440daee985b3958acddbd4e",
  "history": [
    {
      "action": "\"조예경\"님에게 문서를 전송했습니다.",
      "status": "WR",
      "ip": "::ffff:15.164.218.152",
      "date": new Date("2024-01-29T06:24:53.000Z")
    },
    {
      "action": "'조예경'님이 문서작성을 시작했습니다.",
      "status": "WS",
      "ip": "106.101.197.101",
      "date": new Date("2024-01-29T06:33:38.000Z")
    },
    {
      "action": "'조예경'님이 문서작성을 완료했습니다.",
      "status": "WE",
      "ip": "106.101.197.101",
      "date": new Date("2024-01-29T06:35:04.000Z")
    },
    {
      "action": "모든 참여자의 서명이 완료되었습니다.",
      "status": "FF",
      "date": new Date("2024-01-29T06:35:17.000Z")
    }
  ]
}

const sampleData2 = {
  "id": "65e15532b136bd4d281f2a2a",
  "date": new Date("2024-03-01T04:10:26.000Z"),
  "name": "2023디자인서비스제휴계약서_김효진디자이너_240301",
  "aspid": "a2312_aa11s",
  "confirm": true,
  "detail": {
    "id": "65e15532b136bd4d281f2a2a",
    "name": "김효진",
    "email": "jessicakim05@naver.com",
    "mobile": "01036708126",
    "password": null,
    "send_url": "https://s.widsign.com/3800ca2f1e",
    "send_url_mobile": "https://s.widsign.com/edfbb9b221",
    "email_sent_date": "2024-03-01 13:10:27",
    "sms_sent_date": "2024-03-01 13:10:27",
    "doc_status": "END",
    "group_number": 1
  },
  "form": "6440daee985b3958acddbd4e",
  "history": [
    {
      "action": "\"김효진\"님에게 문서를 전송했습니다.",
      "status": "WR",
      "ip": "::ffff:15.164.218.152",
      "date": new Date("2024-03-01T04:10:27.000Z")
    },
    {
      "action": "'김효진'님이 문서작성을 시작했습니다.",
      "status": "WS",
      "ip": "219.251.135.246",
      "date": new Date("2024-03-01T05:30:10.000Z")
    },
    {
      "action": "'김효진'님이 문서작성을 완료했습니다.",
      "status": "WE",
      "ip": "219.251.135.246",
      "date": new Date("2024-03-01T05:39:12.000Z")
    },
    {
      "action": "모든 참여자의 서명이 완료되었습니다.",
      "status": "FF",
      "date": new Date("2024-03-01T05:39:29.000Z")
    }
  ]
}

const sampleData3 = {
  "id": "660536c8d8c2078dcb12844b",
  "date": new Date("2024-03-28T09:22:16.000Z"),
  "name": "2023디자인서비스제휴계약서_이상윤디자이너_240328",
  "aspid": "a2402_aa03s",
  "confirm": true,
  "detail": {
    "id": "660536c8d8c2078dcb12844b",
    "name": "이상윤",
    "email": "236factory@gmail.com",
    "mobile": "01036997626",
    "password": null,
    "send_url": "https://s.widsign.com/17a537b6d3",
    "send_url_mobile": "https://s.widsign.com/c8d3709671",
    "email_sent_date": "2024-03-28 18:22:16",
    "sms_sent_date": "2024-03-28 18:22:16",
    "doc_status": "END",
    "group_number": 1
  },
  "form": "6440daee985b3958acddbd4e",
  "history": [
    {
      "action": "\"이상윤\"님에게 문서를 전송했습니다.",
      "status": "WR",
      "ip": "::ffff:15.164.218.152",
      "date": new Date("2024-03-28T09:22:16.000Z")
    },
    {
      "action": "'이상윤'님이 문서작성을 시작했습니다.",
      "status": "WS",
      "ip": "223.38.47.186",
      "date": new Date("2024-04-27T03:57:32.000Z")
    },
    {
      "action": "'이상윤'님이 문서작성을 완료했습니다.",
      "status": "WE",
      "ip": "223.38.47.186",
      "date": new Date("2024-04-27T03:58:21.000Z")
    },
    {
      "action": "모든 참여자의 서명이 완료되었습니다.",
      "status": "FF",
      "date": new Date("2024-04-27T03:58:41.000Z")
    }
  ]
}

const sampleData4 = {
  "id": "66063f4301520e5aff6975b5",
  "date": new Date("2024-03-29T04:10:43.000Z"),
  "name": "2023디자인서비스제휴계약서_방희수디자이너_240329",
  "aspid": "a2401_aa33s",
  "confirm": true,
  "detail": {
    "id": "66063f4301520e5aff6975b5",
    "name": "방희수",
    "email": "vingris@naver.com",
    "mobile": "01036248210",
    "password": null,
    "send_url": "https://s.widsign.com/556f41f72f",
    "send_url_mobile": "https://s.widsign.com/5b4ba90513",
    "email_sent_date": "2024-03-29 13:10:44",
    "sms_sent_date": "2024-03-29 13:10:44",
    "doc_status": "END",
    "group_number": 1
  },
  "form": "6440daee985b3958acddbd4e",
  "history": [
    {
      "action": "\"방희수\"님에게 문서를 전송했습니다.",
      "status": "WR",
      "ip": "::ffff:15.164.128.55",
      "date": new Date("2024-03-29T04:10:44.000Z")
    },
    {
      "action": "'방희수'님이 문서작성을 시작했습니다.",
      "status": "WS",
      "ip": "211.109.161.105",
      "date": new Date("2024-04-04T08:02:30.000Z")
    },
    {
      "action": "'방희수'님이 문서작성을 완료했습니다.",
      "status": "WE",
      "ip": "211.109.161.105",
      "date": new Date("2024-04-04T08:13:52.000Z")
    },
    {
      "action": "모든 참여자의 서명이 완료되었습니다.",
      "status": "FF",
      "date": new Date("2024-04-04T08:14:04.000Z")
    }
  ]
}

/**
 * @module designerForm
 * @description 인테리어 디자이너와 홈리에종 간의 계약서를 관리하는 모듈.
 */
module.exports = {
  collection: "designerForm", // DB에서 사용할 컬렉션 이름을 지정.
  
  /**
   * 메인 함수로, 새로운 디자이너 계약서 데이터를 DB에 업데이트합니다.
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
        aspid: "", // 디자이너 ID.
      },
      // 주어진 계약서의 디자이너 ID(aspid)를 사용하여 데이터를 찾는 함수.
      find: (fresh) => { return { aspid: fresh.aspid } }
    };

    // Mother 객체로부터 DesignerForm 클래스를 가져옴.
    const { DesignerForm } = alive(mother);

    // 업데이트할 데이터를 저장할 배열.
    tong = [];

    // 업데이트할 계약서 데이터를 순회하면서 처리.
    for (let json of updateQueryArr) {
      fresh = new DesignerForm(null); // 새로운 DesignerForm 객체 생성.
      fresh.make(json); // 주어진 JSON 데이터를 사용하여 객체 초기화.
      findQuery = map.find(fresh); // 디자이너 ID를 사용하여 데이터베이스에서 계약서를 찾음.
      insertEvent = async function (fresh) {} // 비동기 이벤트 함수. 현재 빈 함수로 정의됨.
      tong.push({ fresh, findQuery, insertEvent }); // 업데이트된 데이터를 배열에 추가.
    }

    return tong; // 최종 업데이트된 계약서 데이터를 반환.
  },

  /**
   * alive 함수는 DesignerForm 클래스를 생성하여 반환합니다.
   * @function
   * @param {Object} mother - Mother 클래스의 인스턴스.
   * @returns {Object} DesignerForm 클래스를 포함하는 객체를 반환.
   */
  alive: function (mother) {
    /**
     * DesignerForm 클래스는 개별 디자이너 계약서 데이터를 관리하는 클래스입니다.
     * @class
     */
    class DesignerForm {
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
            this.aspid = json.aspid; // 디자이너 ID 설정.
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
        this.aspid = json.aspid; // 디자이너 ID 설정.
      }
    }
    return { DesignerForm }; // DesignerForm 클래스를 포함하는 객체 반환.
  },

  /**
   * wrap 함수는 주어진 JSON 배열을 DesignerForm 객체로 변환하여 반환합니다.
   * @function
   * @param {Function} alive - Mother 객체에서 필요한 메서드를 가져오는 함수.
   * @param {Array} jsonArr - JSON 데이터 배열.
   * @param {Object} mother - Mother 클래스의 인스턴스.
   * @returns {Array} DesignerForms 객체들을 포함하는 배열을 반환.
   */
  wrap: function (alive, jsonArr, mother) {
    // alive 메서드를 통해 DesignerForm 클래스를 가져옴.
    const { DesignerForm } = alive(mother);

    /**
     * DesignerForms 클래스는 여러 DesignerForm 객체를 관리하는 배열 클래스입니다.
     * @class
     */
    class DesignerForms extends Array {
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
    arr = new DesignerForms(); // DesignerForms 배열을 생성.

    // JSON 데이터를 순회하며 DesignerForm 객체를 생성하여 배열에 추가.
    for (let json of jsonArr) {
      arr.push(new DesignerForm(json)); // DesignerForm 객체 생성 후 배열에 추가.
    }

    return arr; // 최종 DesignerForms 배열을 반환.
  }
};
