// stylingForm : 고객이 홈리에종과 인테리어를 진행하겠다고 확정하고, 계약금을 낼 시 인테리어 디자인 계약서를 쓰게 되는데 그 계약서에 대한 정보가 담긴 db입니다. 위드싸인으로부터 추출하여 저장하는 collection입니다.

/**
 * 샘플 데이터 객체 sampleData0
 * 고객이 홈리에종과 인테리어 계약을 체결할 때 사용되는 디자인 계약서 정보를 담고 있습니다.
 */
const sampleData0 = {
  /**
   * id: 계약서 ID, 계약서를 식별하는 고유 문자열입니다.
   * 예: "666f89899d409d2d3fa1eea2"
   */
  "id": "666f89899d409d2d3fa1eea2",

  /**
   * date: 계약서 작성 날짜, Date 객체로 저장됩니다.
   * 예: 2024-06-17T00:55:37.000Z
   */
  "date": new Date("2024-06-17T00:55:37.000Z"),

  /**
   * name: 계약서의 이름, 주로 고객 이름과 계약서 유형을 포함한 문자열입니다.
   * 예: "2023디자인계약서_안지혜고객님_주홈리에종_240617"
   */
  "name": "2023디자인계약서_안지혜고객님_주홈리에종_240617",

  /**
   * proid: 프로젝트 ID, 계약서가 연결된 프로젝트를 식별하는 고유 문자열입니다.
   * 예: "p2312_aa89s"
   */
  "proid": "p2312_aa89s",

  /**
   * client: 고객 정보, 계약서를 작성한 고객의 ID와 요청 횟수를 포함합니다.
   */
  "client": {
    /**
     * cliid: 고객 ID, 고객을 식별하는 고유 문자열입니다.
     * 예: "c2312_ab02s"
     */
    "cliid": "c2312_ab02s",

    /**
     * requestNumber: 고객의 요청 횟수, 숫자로 기록됩니다.
     * 예: 0
     */
    "requestNumber": 0
  },

  /**
   * confirm: 계약서 확인 여부, 계약서가 확인되었는지를 나타내는 부울 값입니다.
   * true: 확인됨, false: 확인되지 않음
   */
  "confirm": false,

  /**
   * detail: 계약서의 세부 정보, 계약자(고객)와 관련된 정보를 포함합니다.
   */
  "detail": {
    /**
     * id: 세부 정보 ID, 계약서 세부 정보를 식별하는 고유 문자열입니다.
     * 예: "666f89899d409d2d3fa1eea2"
     */
    "id": "666f89899d409d2d3fa1eea2",

    /**
     * name: 계약자(고객)의 이름입니다.
     * 예: "안지혜"
     */
    "name": "안지혜",

    /**
     * email: 계약자(고객)의 이메일 주소입니다.
     * 예: "amonster@naver.com"
     */
    "email": "amonster@naver.com",

    /**
     * mobile: 계약자(고객)의 휴대폰 번호입니다.
     * 예: "01028895454"
     */
    "mobile": "01028895454",

    /**
     * password: 비밀번호 (현재 null로 설정되어 있음).
     */
    "password": null,

    /**
     * send_url: 계약서 서명을 위해 전송된 URL, 위드싸인과 연동된 URL입니다.
     * 예: "https://s.widsign.com/1ba23aedaa"
     */
    "send_url": "https://s.widsign.com/1ba23aedaa",

    /**
     * send_url_mobile: 계약서 서명을 위해 모바일로 전송된 URL, 위드싸인과 연동된 URL입니다.
     * 예: "https://s.widsign.com/8347a34a3f"
     */
    "send_url_mobile": "https://s.widsign.com/8347a34a3f",

    /**
     * email_sent_date: 계약서 전송일시 (이메일로), YYYY-MM-DD HH:mm:ss 형식의 문자열입니다.
     * 예: "2024-06-17 09:55:38"
     */
    "email_sent_date": "2024-06-17 09:55:38",

    /**
     * sms_sent_date: 계약서 전송일시 (SMS로), YYYY-MM-DD HH:mm:ss 형식의 문자열입니다.
     * 예: "2024-06-17 09:55:38"
     */
    "sms_sent_date": "2024-06-17 09:55:38",

    /**
     * doc_status: 계약서의 상태, 현재 "CANCEL"로 설정되어 있으며 이는 계약서가 취소되었음을 나타냅니다.
     */
    "doc_status": "CANCEL",

    /**
     * group_number: 그룹 번호, 계약서가 속한 그룹을 식별하는 숫자입니다.
     * 예: 1
     */
    "group_number": 1
  },

  /**
   * form: 계약서 양식의 ID, 계약서의 기본 양식을 식별하는 고유 문자열입니다.
   * 예: "661380de3e7c67bec0da7390"
   */
  "form": "661380de3e7c67bec0da7390",

  /**
   * history: 계약서 처리 이력, 계약서와 관련된 모든 주요 활동을 기록한 배열입니다.
   */
  "history": [
    {
      /**
       * action: 수행된 작업, 어떤 활동이 발생했는지를 설명하는 문자열입니다.
       * 예: "\"안지혜\"님에게 문서를 전송했습니다."
       */
      "action": "\"안지혜\"님에게 문서를 전송했습니다.",

      /**
       * status: 작업 상태 코드, 작업의 진행 상황을 나타내는 문자열입니다.
       * WR: 작성 전송, WS: 작성 시작, WE: 작성 완료, FF: 서명 완료
       * 예: "WR"
       */
      "status": "WR",

      /**
       * ip: 작업이 수행된 IP 주소, 사용자의 IP를 기록합니다.
       * 예: "::ffff:15.164.128.55"
       */
      "ip": "::ffff:15.164.128.55",

      /**
       * date: 작업이 수행된 날짜와 시간, Date 객체로 저장됩니다.
       * 예: 2024-06-17T00:55:38.000Z
       */
      "date": new Date("2024-06-17T00:55:38.000Z")
    },
    {
      "action": "'안지혜'님이 문서작성을 시작했습니다.",
      "status": "WS",
      "ip": "210.95.17.178",
      "date": new Date("2024-06-17T00:59:23.000Z")
    },
    {
      "action": "'안지혜'님이 문서작성을 시작했습니다.",
      "status": "WS",
      "ip": "210.95.17.178",
      "date": new Date("2024-06-18T05:27:28.000Z")
    }
  ]
}

const sampleData1 = {
  "id": "667112089d409d2d3fa2c1f3",
  "date": new Date("2024-06-18T04:50:16.000Z"),
  "name": "2023디자인계약서_최은주고객님_주홈리에종_240618",
  "proid": "p2404_aa28s",
  "client": {
    "cliid": "c2404_aa26s",
    "requestNumber": 0
  },
  "confirm": true,
  "detail": {
    "id": "667112089d409d2d3fa2c1f3",
    "name": "최은주",
    "email": "n91153193@nate.com",
    "mobile": "01091153193",
    "password": null,
    "send_url": "https://s.widsign.com/c85016fba7",
    "send_url_mobile": "https://s.widsign.com/78e11cf98e",
    "email_sent_date": "2024-06-18 13:50:16",
    "sms_sent_date": "2024-06-18 13:50:16",
    "doc_status": "END",
    "group_number": 1
  },
  "form": "661380de3e7c67bec0da7390",
  "history": [
    {
      "action": "\"최은주\"님에게 문서를 전송했습니다.",
      "status": "WR",
      "ip": "::ffff:15.164.128.55",
      "date": new Date("2024-06-18T04:50:16.000Z")
    },
    {
      "action": "'최은주'님이 문서작성을 시작했습니다.",
      "status": "WS",
      "ip": "223.39.244.183",
      "date": new Date("2024-06-18T05:09:17.000Z")
    },
    {
      "action": "'최은주'님이 문서작성을 시작했습니다.",
      "status": "WS",
      "ip": "223.39.244.183",
      "date": new Date("2024-06-18T05:11:44.000Z")
    },
    {
      "action": "'최은주'님이 문서작성을 시작했습니다.",
      "status": "WS",
      "ip": "211.226.17.165",
      "date": new Date("2024-06-18T13:45:58.000Z")
    },
    {
      "action": "'최은주'님이 문서작성을 시작했습니다.",
      "status": "WS",
      "ip": "211.234.205.8",
      "date": new Date("2024-06-18T13:47:48.000Z")
    },
    {
      "action": "'최은주'님이 문서작성을 시작했습니다.",
      "status": "WS",
      "ip": "211.226.17.165",
      "date": new Date("2024-06-18T13:56:13.000Z")
    },
    {
      "action": "'최은주'님이 문서작성을 완료했습니다.",
      "status": "WE",
      "ip": "211.226.17.165",
      "date": new Date("2024-06-18T13:59:02.000Z")
    },
    {
      "action": "모든 참여자의 서명이 완료되었습니다.",
      "status": "FF",
      "date": new Date("2024-06-18T13:59:20.000Z")
    }
  ]
}

const sampleData2 = {
  "id": "6678c903b630a324b42b13d4",
  "date": new Date("2024-06-24T01:16:51.000Z"),
  "name": "2023디자인계약서_김남희고객님_주홈리에종_240624",
  "proid": "p2406_ab29s",
  "client": {
    "cliid": "c2406_ac09s",
    "requestNumber": 0
  },
  "confirm": true,
  "detail": {
    "id": "6678c903b630a324b42b13d4",
    "name": "김남희",
    "email": "nanh0000@gmail.com",
    "mobile": "01093151881",
    "password": null,
    "send_url": "https://s.widsign.com/4fa4b82942",
    "send_url_mobile": "https://s.widsign.com/6f9bfcf16d",
    "email_sent_date": "2024-06-24 10:16:52",
    "sms_sent_date": "2024-06-24 10:16:52",
    "doc_status": "END",
    "group_number": 1
  },
  "form": "661380de3e7c67bec0da7390",
  "history": [
    {
      "action": "\"김남희\"님에게 문서를 전송했습니다.",
      "status": "WR",
      "ip": "::ffff:54.180.106.91",
      "date": new Date("2024-06-24T01:16:52.000Z")
    },
    {
      "action": "'김남희'님에게 문서를 재전송했습니다.",
      "status": "WR",
      "ip": "1.229.181.6",
      "date": new Date("2024-06-24T01:29:12.000Z")
    },
    {
      "action": "'김남희'님이 문서작성을 시작했습니다.",
      "status": "WS",
      "ip": "116.39.126.210",
      "date": new Date("2024-06-24T01:38:06.000Z")
    },
    {
      "action": "'김남희'님이 문서작성을 완료했습니다.",
      "status": "WE",
      "ip": "116.39.126.210",
      "date": new Date("2024-06-24T01:40:41.000Z")
    },
    {
      "action": "모든 참여자의 서명이 완료되었습니다.",
      "status": "FF",
      "date": new Date("2024-06-24T01:40:57.000Z")
    }
  ]
}

const sampleData3 = {
  "id": "6678ccdd429ada5fbf417e3e",
  "date": new Date("2024-06-24T01:33:17.000Z"),
  "name": "2023디자인계약서_오정민고객님_주홈리에종_240624",
  "proid": "p2406_ab48s",
  "client": {
    "cliid": "c2406_ac36s",
    "requestNumber": 0
  },
  "confirm": false,
  "detail": {
    "id": "6678ccdd429ada5fbf417e3e",
    "name": "오정민",
    "email": "wjdals1676@naver.com",
    "mobile": "01086981676",
    "password": null,
    "send_url": "https://s.widsign.com/2a7f2a27d4",
    "send_url_mobile": "https://s.widsign.com/75c140ca66",
    "email_sent_date": "2024-06-24 10:33:17",
    "sms_sent_date": "2024-06-24 10:33:17",
    "doc_status": null,
    "group_number": 1
  },
  "form": "661380de3e7c67bec0da7390",
  "history": [
    {
      "action": "\"오정민\"님에게 문서를 전송했습니다.",
      "status": "WR",
      "ip": "::ffff:15.164.218.152",
      "date": new Date("2024-06-24T01:33:17.000Z")
    }
  ]
}

const sampleData4 = {
  "id": "667bdfa723847c5d36cfcf25",
  "date": new Date("2024-06-26T09:30:15.000Z"),
  "name": "2023디자인계약서_유경진고객님_주홈리에종_240626",
  "proid": "p2406_aa46s",
  "client": {
    "cliid": "c2406_aa83s",
    "requestNumber": 0
  },
  "confirm": true,
  "detail": {
    "id": "667bdfa723847c5d36cfcf25",
    "name": "유경진",
    "email": "tgth15@naver.com",
    "mobile": "01029320108",
    "password": null,
    "send_url": "https://s.widsign.com/448d43eca9",
    "send_url_mobile": "https://s.widsign.com/ad96f6895f",
    "email_sent_date": "2024-06-26 18:30:15",
    "sms_sent_date": "2024-06-26 18:30:15",
    "doc_status": "END",
    "group_number": 1
  },
  "form": "661380de3e7c67bec0da7390",
  "history": [
    {
      "action": "\"유경진\"님에게 문서를 전송했습니다.",
      "status": "WR",
      "ip": "::ffff:15.164.218.152",
      "date": new Date("2024-06-26T09:30:15.000Z")
    },
    {
      "action": "'유경진'님이 문서작성을 시작했습니다.",
      "status": "WS",
      "ip": "116.32.51.181",
      "date": new Date("2024-06-27T13:41:45.000Z")
    },
    {
      "action": "'유경진'님이 문서작성을 시작했습니다.",
      "status": "WS",
      "ip": "211.36.135.128",
      "date": new Date("2024-06-28T00:26:53.000Z")
    },
    {
      "action": "'유경진'님이 문서작성을 완료했습니다.",
      "status": "WE",
      "ip": "211.36.135.128",
      "date": new Date("2024-06-28T00:28:55.000Z")
    },
    {
      "action": "모든 참여자의 서명이 완료되었습니다.",
      "status": "FF",
      "date": new Date("2024-06-28T00:29:21.000Z")
    }
  ]
}

/**
 * 스타일링 계약서 데이터를 처리하는 모듈입니다.
 * 이 모듈은 stylingForm 컬렉션과 관련된 데이터를 관리합니다.
 */
module.exports = {
  /**
   * collection: 이 모듈이 처리하는 데이터베이스 컬렉션 이름입니다.
   * "stylingForm" 컬렉션에서 데이터를 다룹니다.
   */
  collection: "stylingForm",

  /**
   * main 함수는 계약서 데이터를 처리하고 업데이트된 데이터를 반환합니다.
   * @param {function} alive - 특정 클래스를 인스턴스화하는 함수로, mother 메서드를 통해 전달됩니다.
   * @param {Array} updateQueryArr - 업데이트할 데이터를 담고 있는 배열입니다.
   * @param {Object} mother - 다른 모듈들과의 상호작용을 관리하는 객체로, 메서드를 호출해 필요한 기능을 사용할 수 있습니다.
   * @returns {Array} 처리된 계약서 데이터를 포함한 객체의 배열을 반환합니다.
   */
  main: function (alive, updateQueryArr, mother) {
    let map, fresh, findQuery, tong, insertEvent;

    /**
     * map 객체는 계약서의 구조와 find 함수로 구성됩니다.
     * structure: 계약서의 기본 구조를 정의합니다.
     * find: 주어진 fresh 객체의 proid를 기준으로 기존 데이터를 찾기 위한 쿼리를 생성합니다.
     */
    map = {
      structure: {
        id: "",
        date: new Date(),
        name: "",
        proid: "",
        client: {
          cliid: "",
          requestNumber: 0
        }
      },
      find: (fresh) => { return { proid: fresh.proid } }
    };

    /**
     * alive 함수는 mother 객체를 통해 StylingForm 클래스를 생성하고 반환합니다.
     */
    const { StylingForm } = alive(mother);

    /**
     * tong 배열은 처리된 계약서 데이터를 저장합니다.
     */
    tong = [];

    /**
     * updateQueryArr 배열에 있는 각 json 데이터를 반복 처리합니다.
     */
    for (let json of updateQueryArr) {
      /**
       * fresh 변수는 StylingForm 클래스의 새 인스턴스를 저장합니다.
       */
      fresh = new StylingForm(null);

      /**
       * make 메서드는 json 데이터를 사용해 fresh 인스턴스의 속성을 설정합니다.
       */
      fresh.make(json);

      /**
       * findQuery 변수는 fresh 객체의 proid를 기반으로 데이터를 검색하는 쿼리를 저장합니다.
       */
      findQuery = map.find(fresh);

      /**
       * insertEvent는 비동기 함수로, 실제 데이터베이스에 이벤트를 삽입하는 작업을 할 수 있습니다.
       * 이 코드에서는 아직 구현되지 않았습니다.
       */
      insertEvent = async function (fresh) {}

      /**
       * fresh, findQuery, insertEvent를 tong 배열에 추가합니다.
       */
      tong.push({ fresh, findQuery, insertEvent });
    }

    /**
     * 최종적으로 tong 배열을 반환하여, 모든 처리된 계약서 데이터를 반환합니다.
     */
    return tong;
  },

  /**
   * alive 함수는 mother 객체를 사용하여 필요한 클래스들을 인스턴스화합니다.
   * @param {Object} mother - 다른 모듈들과의 상호작용을 관리하는 객체로, 메서드를 호출해 필요한 기능을 사용할 수 있습니다.
   * @returns {Object} StylingForm 클래스를 반환합니다.
   */
  alive: function (mother) {
    /**
     * StylingForm 클래스는 스타일링 계약서 데이터를 관리하는 클래스입니다.
     */
    class StylingForm {
      /**
       * constructor 메서드는 json 데이터를 사용하여 새 인스턴스를 초기화합니다.
       * @param {Object|null} json - 초기화할 json 데이터입니다. null이면 빈 객체를 생성합니다.
       */
      constructor(json) {
        if (json !== null) {
          if (typeof json === "object") {
            this.id = json.id;
            this.date = json.date;
            this.name = json.name;
            this.proid = json.proid;
            this.client = json.client;
          }
        }
      }

      /**
       * make 메서드는 json 데이터를 사용하여 인스턴스의 속성을 설정합니다.
       * @param {Object} json - 인스턴스에 설정할 json 데이터입니다.
       */
      make(json) {
        this.id = json.id;
        this.date = new Date();
        this.name = json.name;
        this.proid = json.proid;
        this.client = {};
        this.client.cliid = json.cliid;
        this.client.requestNumber = json.requestNumber;
      }
    }

    /**
     * StylingForm 클래스를 포함한 객체를 반환합니다.
     */
    return { StylingForm };
  },

  /**
   * wrap 함수는 여러 StylingForm 인스턴스를 관리하는 배열 클래스를 생성합니다.
   * @param {function} alive - StylingForm 클래스를 인스턴스화하는 함수입니다.
   * @param {Array} jsonArr - json 데이터 배열로, 각 데이터를 개별 StylingForm 인스턴스로 변환합니다.
   * @param {Object} mother - 다른 모듈들과의 상호작용을 관리하는 객체입니다.
   * @returns {Array} StylingForms 클래스로 생성된 인스턴스 배열을 반환합니다.
   */
  wrap: function (alive, jsonArr, mother) {
    /**
     * alive 함수는 mother 객체를 통해 StylingForm 클래스를 인스턴스화합니다.
     */
    const { StylingForm } = alive(mother);

    /**
     * StylingForms 클래스는 여러 StylingForm 인스턴스를 관리하는 배열입니다.
     */
    class StylingForms extends Array {
      /**
       * search 메서드는 주어진 id를 기준으로 배열 내에서 특정 StylingForm 인스턴스를 찾습니다.
       * @param {string} id - 검색할 id입니다.
       * @returns {Object|null} 해당 id를 가진 인스턴스가 있으면 반환하고, 없으면 null을 반환합니다.
       */
      search(id) {
        let target;
        target = null;
        for (let o of this) {
          if (o.id === id) {
            target = o;
            break;
          }
        }
        return target;
      }
    }

    /**
     * arr 배열은 StylingForms 인스턴스를 저장합니다.
     */
    let arr;
    arr = new StylingForms();

    /**
     * jsonArr 배열 내의 각 json 데이터를 StylingForm 인스턴스로 변환하여 arr 배열에 추가합니다.
     */
    for (let json of jsonArr) {
      arr.push(new StylingForm(json));
    }

    /**
     * 최종적으로 arr 배열을 반환하여 모든 StylingForm 인스턴스를 반환합니다.
     */
    return arr;
  }
}
