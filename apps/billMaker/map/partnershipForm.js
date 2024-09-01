// partnershipForm : 인테리어 디자이너 신청자가 최종적으로 홈리에종과 협약하기로 계약할 때 쓰는 파트너십 계약서로 위드싸인으로부터 정보를 가져와 저장하는 db입니다.

/**
 * 샘플 데이터 객체 sampleData0
 * 인테리어 디자이너가 홈리에종과 계약을 맺기 위해 사용하는 파트너십 계약서 데이터를 나타냅니다.
 * 각 필드는 계약서의 세부 정보를 설명합니다.
 */
const sampleData0 = {
  /**
   * id: 계약서 ID, 계약서를 식별하는 고유 문자열입니다.
   * 예: "65b330dbf913cfac85fd4b08"
   */
  "id": "65b330dbf913cfac85fd4b08",

  /**
   * date: 계약서 작성 날짜, Date 객체로 저장됩니다.
   * 예: 2024-01-26T04:11:07.000Z
   */
  "date": new Date("2024-01-26T04:11:07.000Z"),

  /**
   * name: 계약서의 이름, 주로 디자이너 이름과 계약서 유형을 포함한 문자열입니다.
   * 예: "2023디자이너파트너십계약서_이효정디자이너_240126"
   */
  "name": "2023디자이너파트너십계약서_이효정디자이너_240126",

  /**
   * aspid: ASP(응용 서비스 제공자) ID, 계약서와 관련된 고유 문자열입니다.
   * 예: "a2311_aa14s"
   */
  "aspid": "a2311_aa14s",

  /**
   * confirm: 계약서의 확인 여부, 계약서가 최종적으로 확인되었는지를 나타내는 부울 값입니다.
   * true: 확인됨, false: 확인되지 않음
   */
  "confirm": true,

  /**
   * detail: 계약서의 세부 정보, 계약자(디자이너)와 관련된 정보를 포함합니다.
   */
  "detail": {
    /**
     * id: 세부 정보 ID, 계약서 세부 정보를 식별하는 고유 문자열입니다.
     * 예: "65b330dbf913cfac85fd4b08"
     */
    "id": "65b330dbf913cfac85fd4b08",

    /**
     * name: 계약자(디자이너)의 이름입니다.
     * 예: "이효정"
     */
    "name": "이효정",

    /**
     * email: 계약자(디자이너)의 이메일 주소입니다.
     * 예: "leehyojoung1@gmail.com"
     */
    "email": "leehyojoung1@gmail.com",

    /**
     * mobile: 계약자(디자이너)의 휴대폰 번호입니다.
     * 예: "01063532366"
     */
    "mobile": "01063532366",

    /**
     * password: 비밀번호 (현재 null로 설정되어 있음).
     */
    "password": null,

    /**
     * send_url: 계약서 서명을 위해 전송된 URL, 위드싸인과 연동된 URL입니다.
     * 예: "https://s.widsign.com/596e9c3d64"
     */
    "send_url": "https://s.widsign.com/596e9c3d64",

    /**
     * send_url_mobile: 계약서 서명을 위해 모바일로 전송된 URL, 위드싸인과 연동된 URL입니다.
     * 예: "https://s.widsign.com/61d343737f"
     */
    "send_url_mobile": "https://s.widsign.com/61d343737f",

    /**
     * email_sent_date: 계약서 전송일시 (이메일로), YYYY-MM-DD HH:mm:ss 형식의 문자열입니다.
     * 예: "2024-01-26 13:11:07"
     */
    "email_sent_date": "2024-01-26 13:11:07",

    /**
     * sms_sent_date: 계약서 전송일시 (SMS로), YYYY-MM-DD HH:mm:ss 형식의 문자열입니다.
     * 예: "2024-01-26 13:11:07"
     */
    "sms_sent_date": "2024-01-26 13:11:07",

    /**
     * doc_status: 계약서의 상태, 현재 "END"로 설정되어 있으며 이는 계약서 작성이 완료되었음을 나타냅니다.
     */
    "doc_status": "END",

    /**
     * group_number: 그룹 번호, 계약서가 속한 그룹을 식별하는 숫자입니다.
     * 예: 1
     */
    "group_number": 1
  },

  /**
   * form: 계약서 양식의 ID, 계약서의 기본 양식을 식별하는 고유 문자열입니다.
   * 예: "6441eed767cf783fd02f0c5c"
   */
  "form": "6441eed767cf783fd02f0c5c",

  /**
   * history: 계약서 처리 이력, 계약서와 관련된 모든 주요 활동을 기록한 배열입니다.
   */
  "history": [
    {
      /**
       * action: 수행된 작업, 어떤 활동이 발생했는지를 설명하는 문자열입니다.
       * 예: "\"이효정\"님에게 문서를 전송했습니다."
       */
      "action": "\"이효정\"님에게 문서를 전송했습니다.",

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
       * 예: 2024-01-26T04:11:07.000Z
       */
      "date": new Date("2024-01-26T04:11:07.000Z")
    },
    {
      "action": "'이효정'님이 문서작성을 시작했습니다.",
      "status": "WS",
      "ip": "223.38.90.28",
      "date": new Date("2024-01-26T08:06:03.000Z")
    },
    {
      "action": "'이효정'님이 문서작성을 완료했습니다.",
      "status": "WE",
      "ip": "223.38.90.28",
      "date": new Date("2024-01-26T08:08:32.000Z")
    },
    {
      "action": "모든 참여자의 서명이 완료되었습니다.",
      "status": "FF",
      "date": new Date("2024-01-26T08:09:08.000Z")
    }
  ]
}

const sampleData1 = {
  "id": "65b744b2014615c79a7e1536",
  "date": new Date("2024-01-29T06:24:50.000Z"),
  "name": "2023디자이너파트너십계약서_조예경디자이너_240129",
  "aspid": "a2312_aa01s",
  "confirm": true,
  "detail": {
    "id": "65b744b2014615c79a7e1536",
    "name": "조예경",
    "email": "choyes0412@naver.com",
    "mobile": "01076115291",
    "password": null,
    "send_url": "https://s.widsign.com/6ac50a1838",
    "send_url_mobile": "https://s.widsign.com/992f4cf57d",
    "email_sent_date": "2024-01-29 15:24:50",
    "sms_sent_date": "2024-01-29 15:24:50",
    "doc_status": "END",
    "group_number": 1
  },
  "form": "6441eed767cf783fd02f0c5c",
  "history": [
    {
      "action": "\"조예경\"님에게 문서를 전송했습니다.",
      "status": "WR",
      "ip": "::ffff:15.164.218.152",
      "date": new Date("2024-01-29T06:24:50.000Z")
    },
    {
      "action": "'조예경'님이 문서작성을 시작했습니다.",
      "status": "WS",
      "ip": "106.101.197.101",
      "date": new Date("2024-01-29T06:35:28.000Z")
    },
    {
      "action": "'조예경'님이 문서작성을 완료했습니다.",
      "status": "WE",
      "ip": "106.101.197.101",
      "date": new Date("2024-01-29T06:37:14.000Z")
    },
    {
      "action": "모든 참여자의 서명이 완료되었습니다.",
      "status": "FF",
      "date": new Date("2024-01-29T06:37:33.000Z")
    }
  ]
}

const sampleData2 = {
  "id": "65e1552fb136bd4d281f2a16",
  "date": new Date("2024-03-01T04:10:23.000Z"),
  "name": "2023디자이너파트너십계약서_김효진디자이너_240301",
  "aspid": "a2312_aa11s",
  "confirm": true,
  "detail": {
    "id": "65e1552fb136bd4d281f2a16",
    "name": "김효진",
    "email": "jessicakim05@naver.com",
    "mobile": "01036708126",
    "password": null,
    "send_url": "https://s.widsign.com/a20fa830b4",
    "send_url_mobile": "https://s.widsign.com/800d2a9ac0",
    "email_sent_date": "2024-03-01 13:10:23",
    "sms_sent_date": "2024-03-01 13:10:23",
    "doc_status": "END",
    "group_number": 1
  },
  "form": "6441eed767cf783fd02f0c5c",
  "history": [
    {
      "action": "\"김효진\"님에게 문서를 전송했습니다.",
      "status": "WR",
      "ip": "::ffff:15.164.218.152",
      "date": new Date("2024-03-01T04:10:23.000Z")
    },
    {
      "action": "'김효진'님이 문서작성을 시작했습니다.",
      "status": "WS",
      "ip": "219.251.135.246",
      "date": new Date("2024-03-05T05:13:58.000Z")
    },
    {
      "action": "'김효진'님이 문서작성을 완료했습니다.",
      "status": "WE",
      "ip": "219.251.135.246",
      "date": new Date("2024-03-05T05:14:41.000Z")
    },
    {
      "action": "모든 참여자의 서명이 완료되었습니다.",
      "status": "FF",
      "date": new Date("2024-03-05T05:14:50.000Z")
    }
  ]
}

const sampleData3 = {
  "id": "65e15536b136bd4d281f2a3b",
  "date": new Date("2024-03-01T04:10:30.000Z"),
  "name": "2023디자이너파트너십계약서_양주희디자이너_240301",
  "aspid": "a2311_aa05s",
  "confirm": false,
  "detail": {
    "id": "65e15536b136bd4d281f2a3b",
    "name": "양주희",
    "email": "design-roun@naver.com",
    "mobile": "01076202068",
    "password": null,
    "send_url": "https://s.widsign.com/0ca06e06a9",
    "send_url_mobile": "https://s.widsign.com/a1af03ca49",
    "email_sent_date": "2024-03-01 13:10:30",
    "sms_sent_date": "2024-03-01 13:10:30",
    "doc_status": "WRITING",
    "group_number": 1
  },
  "form": "6441eed767cf783fd02f0c5c",
  "history": [
    {
      "action": "\"양주희\"님에게 문서를 전송했습니다.",
      "status": "WR",
      "ip": "::ffff:15.164.128.55",
      "date": new Date("2024-03-01T04:10:30.000Z")
    },
    {
      "action": "'양주희'님이 문서작성을 시작했습니다.",
      "status": "WS",
      "ip": "211.118.94.168",
      "date": new Date("2024-03-05T10:06:49.000Z")
    },
    {
      "action": "'양주희'님이 문서작성을 시작했습니다.",
      "status": "WS",
      "ip": "211.118.94.168",
      "date": new Date("2024-03-05T14:11:20.000Z")
    },
    {
      "action": "'양주희'님이 문서작성을 시작했습니다.",
      "status": "WS",
      "ip": "211.118.94.168",
      "date": new Date("2024-03-25T05:11:18.000Z")
    }
  ]
}

const sampleData4 = {
  "id": "65e6aaafd66dd60d1eaa254b",
  "date": new Date("2024-03-05T05:16:31.000Z"),
  "name": "2023디자이너파트너십계약서_신혜진디자이너_240305",
  "aspid": "a2311_aa04s",
  "confirm": true,
  "detail": {
    "id": "65e6aaafd66dd60d1eaa254b",
    "name": "신혜진",
    "email": "shjiiin09@gmail.com",
    "mobile": "01051079102",
    "password": null,
    "send_url": "https://s.widsign.com/e1cf59d476",
    "send_url_mobile": "https://s.widsign.com/10e75229b5",
    "email_sent_date": "2024-03-05 14:16:32",
    "sms_sent_date": "2024-03-05 14:16:32",
    "doc_status": "END",
    "group_number": 1
  },
  "form": "6441eed767cf783fd02f0c5c",
  "history": [
    {
      "action": "\"신혜진\"님에게 문서를 전송했습니다.",
      "status": "WR",
      "ip": "::ffff:15.164.218.152",
      "date": new Date("2024-03-05T05:16:32.000Z")
    },
    {
      "action": "'신혜진'님이 문서작성을 시작했습니다.",
      "status": "WS",
      "ip": "61.73.49.30",
      "date": new Date("2024-03-05T07:19:50.000Z")
    },
    {
      "action": "'신혜진'님이 문서작성을 시작했습니다.",
      "status": "WS",
      "ip": "61.73.49.30",
      "date": new Date("2024-03-05T23:38:21.000Z")
    },
    {
      "action": "'신혜진'님이 문서작성을 시작했습니다.",
      "status": "WS",
      "ip": "220.72.232.241",
      "date": new Date("2024-03-06T02:24:39.000Z")
    },
    {
      "action": "'신혜진'님이 문서작성을 완료했습니다.",
      "status": "WE",
      "ip": "220.72.232.241",
      "date": new Date("2024-03-06T02:34:23.000Z")
    },
    {
      "action": "모든 참여자의 서명이 완료되었습니다.",
      "status": "FF",
      "date": new Date("2024-03-06T02:34:44.000Z")
    }
  ]
}

/**
 * 파트너십 계약서 데이터를 처리하는 모듈입니다.
 * 이 모듈은 partnershipForm 컬렉션과 관련된 데이터를 관리합니다.
 */
module.exports = {
  /**
   * collection: 이 모듈이 처리하는 데이터베이스 컬렉션 이름입니다.
   * "partnershipForm" 컬렉션에서 데이터를 다룹니다.
   */
  collection: "partnershipForm",

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
     * find: 주어진 fresh 객체의 aspid를 기준으로 기존 데이터를 찾기 위한 쿼리를 생성합니다.
     */
    map = {
      structure: {
        id: "",
        date: new Date(),
        name: "",
        aspid: "",
      },
      find: (fresh) => { return { aspid: fresh.aspid } }
    };

    /**
     * alive 함수는 mother 객체를 통해 PartnershipForm 클래스를 생성하고 반환합니다.
     */
    const { PartnershipForm } = alive(mother);

    /**
     * tong 배열은 처리된 계약서 데이터를 저장합니다.
     */
    tong = [];

    /**
     * updateQueryArr 배열에 있는 각 json 데이터를 반복 처리합니다.
     */
    for (let json of updateQueryArr) {
      /**
       * fresh 변수는 PartnershipForm 클래스의 새 인스턴스를 저장합니다.
       */
      fresh = new PartnershipForm(null);

      /**
       * make 메서드를 호출하여 fresh 객체에 json 데이터를 할당합니다.
       */
      fresh.make(json);

      /**
       * findQuery 변수는 map 객체의 find 메서드를 호출하여 생성된 쿼리를 저장합니다.
       */
      findQuery = map.find(fresh);

      /**
       * insertEvent는 비동기 함수로, 실제로 데이터베이스에 이벤트를 삽입하는 작업을 할 수 있습니다.
       * 여기서는 아직 구현되지 않았습니다.
       */
      insertEvent = async function (fresh) {}

      /**
       * 처리된 fresh 객체와 findQuery, insertEvent를 tong 배열에 추가합니다.
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
   * @returns {Object} PartnershipForm 클래스를 반환합니다.
   */
  alive: function (mother) {
    /**
     * PartnershipForm 클래스는 파트너십 계약서 데이터를 관리하는 클래스입니다.
     */
    class PartnershipForm {
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
            this.aspid = json.aspid;
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
        this.aspid = json.aspid;
      }
    }

    /**
     * PartnershipForm 클래스를 포함한 객체를 반환합니다.
     */
    return { PartnershipForm };
  },

  /**
   * wrap 함수는 여러 PartnershipForm 인스턴스를 관리하는 배열 클래스를 생성합니다.
   * @param {function} alive - PartnershipForm 클래스를 인스턴스화하는 함수입니다.
   * @param {Array} jsonArr - json 데이터 배열로, 각 데이터를 개별 PartnershipForm 인스턴스로 변환합니다.
   * @param {Object} mother - 다른 모듈들과의 상호작용을 관리하는 객체입니다.
   * @returns {Array} PartnershipForms 클래스로 생성된 인스턴스 배열을 반환합니다.
   */
  wrap: function (alive, jsonArr, mother) {
    /**
     * alive 함수는 mother 객체를 통해 PartnershipForm 클래스를 인스턴스화합니다.
     */
    const { PartnershipForm } = alive(mother);

    /**
     * PartnershipForms 클래스는 여러 PartnershipForm 인스턴스를 관리하는 배열입니다.
     */
    class PartnershipForms extends Array {
      /**
       * search 메서드는 주어진 id를 기준으로 배열 내에서 특정 PartnershipForm 인스턴스를 찾습니다.
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
     * arr 배열은 PartnershipForms 인스턴스를 저장합니다.
     */
    let arr;
    arr = new PartnershipForms();

    /**
     * jsonArr 배열 내의 각 json 데이터를 PartnershipForm 인스턴스로 변환하여 arr 배열에 추가합니다.
     */
    for (let json of jsonArr) {
      arr.push(new PartnershipForm(json));
    }

    /**
     * 최종적으로 arr 배열을 반환하여 모든 PartnershipForm 인스턴스를 반환합니다.
     */
    return arr;
  }
}
