// taxBill : 홈리에종 이름으로 세금계산서를 받거나 발급할 때 data를 홈택스로부터 가져와 저장하는 db입니다.  

/**
 * 샘플 데이터 객체 sampleData0
 * 홈리에종 이름으로 발급되거나 받은 세금 계산서 정보를 저장한 객체입니다.
 */
const sampleData0 = {
  /**
   * id: 세금 계산서 ID, 고유하게 세금 계산서를 식별하는 문자열입니다.
   * 예: "20240520-10240520-52059058"
   */
  "id": "20240520-10240520-52059058",

  /**
   * date: 세금 계산서 발급 날짜, Date 객체로 저장됩니다.
   * 예: 2024-05-20T05:38:58.000Z
   */
  "date": new Date("2024-05-20T05:38:58.000Z"),

  /**
   * who: 세금 계산서 발신자와 수신자 정보를 담고 있는 객체입니다.
   */
  "who": {
    /**
     * from: 발신자 정보, 세금 계산서를 발행한 사업체와 관련된 정보를 포함합니다.
     */
    "from": {
      /**
       * business: 발신자의 사업자 등록번호입니다.
       * 예: "128-23-78576"
       */
      "business": "128-23-78576",

      /**
       * company: 발신자의 회사 이름입니다.
       * 예: "휴플랜"
       */
      "company": "휴플랜",

      /**
       * name: 발신자의 이름입니다.
       * 예: "노경아"
       */
      "name": "노경아",

      /**
       * address: 발신자의 주소입니다.
       * 예: "서울특별시 송파구 석촌호수로 135, 상가에이동 423호(잠실동, 레이크팰리스)"
       */
      "address": "서울특별시 송파구 석촌호수로 135, 상가에이동 423호(잠실동, 레이크팰리스)",

      /**
       * status: 발신자의 업태, 사업의 유형을 나타냅니다.
       * 예: "건설"
       */
      "status": "건설",

      /**
       * detail: 발신자의 업종, 구체적인 사업 내용을 설명합니다.
       * 예: "실내건축"
       */
      "detail": "실내건축",

      /**
       * email: 발신자의 이메일 주소입니다.
       * 예: "aaeon@daum.net"
       */
      "email": "aaeon@daum.net"
    },

    /**
     * to: 수신자 정보, 세금 계산서를 받는 홈리에종의 관련 정보를 포함합니다.
     */
    "to": {
      /**
       * business: 수신자의 사업자 등록번호입니다.
       * 예: "221-81-49759"
       */
      "business": "221-81-49759",

      /**
       * company: 수신자의 회사 이름입니다.
       * 예: "주식회사 홈리에종"
       */
      "company": "주식회사 홈리에종",

      /**
       * name: 수신자의 이름입니다.
       * 예: "박혜연"
       */
      "name": "박혜연",

      /**
       * address: 수신자의 주소입니다.
       * 예: "서울시 성동구 성수일로 10 6층 605호"
       */
      "address": "서울시 성동구 성수일로 10 6층 605호",

      /**
       * status: 수신자의 업태, 사업의 유형을 나타냅니다.
       * 예: "서비스업"
       */
      "status": "서비스업",

      /**
       * detail: 수신자의 업종, 구체적인 사업 내용을 설명합니다.
       * 예: "인테리어디자인업"
       */
      "detail": "인테리어디자인업",

      /**
       * email: 수신자의 이메일 주소입니다.
       * 예: "help@home-liaison.com"
       */
      "email": "help@home-liaison.com"
    }
  },

  /**
   * items: 세금 계산서에 포함된 품목 정보를 담고 있는 배열입니다.
   */
  "items": [
    {
      /**
       * month: 품목의 거래 월입니다.
       * 예: 5 (5월)
       */
      "month": 5,

      /**
       * date: 품목의 거래 일입니다.
       * 예: 20 (20일)
       */
      "date": 20,

      /**
       * name: 품목의 이름, 여기서는 비어 있습니다.
       */
      "name": "",

      /**
       * ea: 품목의 설명 또는 거래 내용을 나타냅니다.
       * 예: "미아 sk view 디자인 설계 및 스타일링 잔금"
       */
      "ea": "미아 sk view 디자인 설계 및 스타일링 잔금",

      /**
       * amount: 품목의 수량입니다. 여기서는 null로 설정되어 있습니다.
       */
      "amount": null,

      /**
       * unit: 품목의 단위입니다.
       * 예: 1
       */
      "unit": 1,

      /**
       * supply: 공급가액, 해당 품목의 금액입니다.
       * 예: 570982
       */
      "supply": 570982,

      /**
       * vat: 부가가치세, 해당 품목의 세액입니다.
       * 예: 57098
       */
      "vat": 57098,

      /**
       * etc: 기타 정보로, 담당자의 이름을 포함합니다.
       * 예: "최아선"
       */
      "etc": "최아선"
    },
    {
      "month": 5,
      "date": 20,
      "name": "",
      "ea": "광주 오포 아파트 레노베이션 디자인 설계,시공감리 및 스타일링 선금",
      "amount": null,
      "unit": 1,
      "supply": 1028650,
      "vat": 102865,
      "etc": "유영실"
    }
  ],

  /**
   * sum: 세금 계산서의 총액 정보를 담고 있는 객체입니다.
   */
  "sum": {
    /**
     * total: 총액, 공급가액과 부가가치세의 합계입니다.
     * 예: 1759595
     */
    "total": 1759595,

    /**
     * supply: 총 공급가액입니다.
     * 예: 1599632
     */
    "supply": 1599632,

    /**
     * vat: 총 부가가치세액입니다.
     * 예: 159963
     */
    "vat": 159963
  }
}

const sampleData1 = {
  "id": "20240520-70240520-52055553",
  "date": new Date("2024-05-20T05:37:39.000Z"),
  "who": {
    "from": {
      "business": "758-06-01298",
      "company": "예솔건축",
      "name": "이재혁",
      "address": "경기도 용인시 기흥구 강남서로 9, 7층 703호 b435(구갈동, 아카데미프라자)",
      "status": "건설업",
      "detail": "도배, 실내 장식 및 내장 목공사업",
      "email": "goqud908rl@gmail.com"
    },
    "to": {
      "business": "221-81-49759",
      "company": "주식회사 홈리에종",
      "name": "박혜연",
      "address": "서울특별시 성동구 성수일로 10, 6층 605호(성수동1가, 서울숲 ITCT 지식산업센터)",
      "status": "서비스",
      "detail": "온라인 정보제공업",
      "email": "help@home-liaison.com"
    }
  },
  "items": [
    {
      "month": 5,
      "date": 20,
      "name": "인테리어공사 외",
      "ea": "식",
      "amount": 1,
      "unit": 22500000,
      "supply": 22500000,
      "vat": 2250000,
      "etc": ""
    }
  ],
  "sum": {
    "total": 24750000,
    "supply": 22500000,
    "vat": 2250000
  }
}

const sampleData2 = {
  "id": "20240520-10240520-52185599",
  "date": new Date("2024-05-20T06:55:37.000Z"),
  "who": {
    "from": {
      "business": "128-23-78576",
      "company": "휴플랜",
      "name": "노경아",
      "address": "서울특별시 송파구 석촌호수로 135, 상가에이동 423호(잠실동, 레이크팰리스)",
      "status": "건설",
      "detail": "실내건축",
      "email": "aaeon@daum.net"
    },
    "to": {
      "business": "221-81-49759",
      "company": "주식회사 홈리에종",
      "name": "박혜연",
      "address": "서울 성동구 성수일로 10,6층 605호(성수동1가,서울숲 ITCT지식산업센터)",
      "status": "서비스업",
      "detail": "인테리어디자인업",
      "email": "help@home-liaison.com"
    }
  },
  "items": [
    {
      "month": 5,
      "date": 20,
      "name": "",
      "ea": "광주 오포자이 아파트 레노베이션 디자인 설계,감리,스타일링 선금",
      "amount": null,
      "unit": 1,
      "supply": 1028650,
      "vat": 102865,
      "etc": "유영실님"
    }
  ],
  "sum": {
    "total": 1131515,
    "supply": 1028650,
    "vat": 102865
  }
}

const sampleData3 = {
  "id": "20240520-10240520-52178895",
  "date": new Date("2024-05-20T06:50:53.000Z"),
  "who": {
    "from": {
      "business": "128-23-78576",
      "company": "휴플랜",
      "name": "노경아",
      "address": "서울특별시 송파구 석촌호수로 135, 상가에이동 423호(잠실동, 레이크팰리스)",
      "status": "건설",
      "detail": "실내건축",
      "email": "aaeon@daum.net"
    },
    "to": {
      "business": "221-81-49759",
      "company": "주식회사 홈리에종",
      "name": "박혜연",
      "address": "서울시 성동구 성수일로 10 6층 605호",
      "status": "서비스업",
      "detail": "인테리어디자인업",
      "email": "help@home-liaison.com"
    }
  },
  "items": [
    {
      "month": 5,
      "date": 20,
      "name": "",
      "ea": "미아 sk view 디자인 설계 및 스타일링 잔금",
      "amount": null,
      "unit": -1,
      "supply": -570982,
      "vat": -57098,
      "etc": "최아선"
    },
    {
      "month": 5,
      "date": 20,
      "name": "",
      "ea": "광주 오포 아파트 레노베이션 디자인 설계,시공감리 및 스타일링 선금",
      "amount": null,
      "unit": -1,
      "supply": -1028650,
      "vat": -102865,
      "etc": "유영실"
    }
  ],
  "sum": {
    "total": -1759595,
    "supply": -1599632,
    "vat": -159963
  }
}

const sampleData4 = {
  "id": "20240520-10240520-52178896",
  "date": new Date("2024-05-20T06:50:53.000Z"),
  "who": {
    "from": {
      "business": "128-23-78576",
      "company": "휴플랜",
      "name": "노경아",
      "address": "서울특별시 송파구 석촌호수로 135, 상가에이동 423호(잠실동, 레이크팰리스)",
      "status": "건설",
      "detail": "실내건축",
      "email": "aaeon@daum.net"
    },
    "to": {
      "business": "221-81-49759",
      "company": "주식회사 홈리에종",
      "name": "박혜연",
      "address": "서울시 성동구 성수일로 10 6층 605호",
      "status": "서비스업",
      "detail": "인테리어디자인업",
      "email": "help@home-liaison.com"
    }
  },
  "items": [
    {
      "month": 5,
      "date": 20,
      "name": "",
      "ea": "미아 sk view 디자인 설계 및 스타일링 잔금",
      "amount": null,
      "unit": 1,
      "supply": 570982,
      "vat": 57098,
      "etc": "최아선"
    }
  ],
  "sum": {
    "total": 628080,
    "supply": 570982,
    "vat": 57098
  }
}

/**
 * taxBill 모듈
 * 홈리에종의 세금 계산서 데이터를 처리하는 모듈입니다.
 */
module.exports = {
  /**
   * collection: 이 모듈이 다루는 데이터베이스 컬렉션 이름입니다.
   * "taxBill" 컬렉션에서 데이터를 다룹니다.
   */
  collection: "taxBill",

  /**
   * main 함수는 세금 계산서 데이터를 처리하고 기본적인 구조를 설정합니다.
   * @param {function} alive - 특정 클래스를 인스턴스화하는 함수로, mother 메서드를 통해 전달됩니다.
   * @param {Array} updateQueryArr - 업데이트할 데이터를 담고 있는 배열입니다.
   * @param {Object} mother - 다른 모듈들과의 상호작용을 관리하는 객체로, 메서드를 호출해 필요한 기능을 사용할 수 있습니다.
   * @returns {Array} 처리된 세금 계산서 데이터를 반환합니다.
   */
  main: function (alive, updateQueryArr, mother) {
    let map, fresh, findQuery, tong, insertEvent;

    /**
     * map 객체는 세금 계산서의 기본 구조와 품목 구조를 정의합니다.
     * main: 세금 계산서의 기본 구조를 정의합니다.
     * items: 품목의 기본 구조를 정의합니다.
     */
    map = {
      main: {
        id: "",
        date: new Date(1800, 0, 1),
        who: {
          from: {
            business: "",
            company: "",
            name: "",
            address: "",
            status: "",
            detail: "",
            email: ""
          },
          to: {
            business: "",
            company: "",
            name: "",
            address: "",
            status: "",
            detail: "",
            email: ""
          }
        },
        items: [],
        sum: {
          total: 0,
          supply: 0,
          vat: 0
        }
      },
      items: {
        month: 0,
        date: 0,
        name: "",
        ea: "",
        amount: 0,
        unit: 0,
        supply: 0,
        vat: 0,
        etc: ""
      }
    };

    /**
     * 기본적으로 빈 배열을 반환합니다. 이 부분은 실제 구현 시 데이터를 처리하는 로직으로 대체될 수 있습니다.
     */
    return [];
  },

  /**
   * alive 함수는 mother 객체를 사용하여 필요한 클래스들을 인스턴스화합니다.
   * @param {Object} mother - 다른 모듈들과의 상호작용을 관리하는 객체로, 메서드를 호출해 필요한 기능을 사용할 수 있습니다.
   * @returns {Object} TaxBill 클래스를 반환합니다.
   */
  alive: function (mother) {
    /**
     * mother 객체에서 dateToString, autoComma 메서드를 가져옵니다.
     * dateToString: 날짜를 문자열로 변환하는 유틸리티 함수입니다.
     * autoComma: 숫자에 콤마(,)를 추가하여 읽기 쉽게 만드는 유틸리티 함수입니다.
     */
    const { dateToString, autoComma } = mother;

    /**
     * TaxBill 클래스는 세금 계산서 데이터를 관리하는 클래스입니다.
     */
    class TaxBill {
      /**
       * constructor 메서드는 주어진 객체를 사용하여 TaxBill 인스턴스를 초기화합니다.
       * @param {Object|null} obj - 초기화할 객체입니다. null이면 빈 객체를 생성합니다.
       */
      constructor(obj) {
        if (obj !== null) {
          if (typeof obj === "object") {
            this.id = obj.id;
            this.date = obj.date;
            this.who = obj.who;
            this.items = obj.items;
            this.sum = obj.sum;
          }
        }
      }

      /**
       * make 메서드는 주어진 id와 date를 사용하여 TaxBill 인스턴스를 생성합니다.
       * @param {string} id - 세금 계산서 ID입니다.
       * @param {Date} date - 세금 계산서 발급 날짜입니다.
       * @throws {Error} id나 date가 주어지지 않았을 경우 예외를 발생시킵니다.
       */
      make(id, date) {
        if (id === undefined || date === undefined) {
          throw new Error("invaild input");
        }
        this.id = id;
        this.date = date;
        this.who = {};
        this.who.from = {};
        this.who.to = {};
        this.items = [];
        this.sum = {
          total: 0,
          supply: 0,
          vat: 0
        };
      }

      /**
       * toMessage 메서드는 세금 계산서 데이터를 문자열 형태로 변환하여 반환합니다.
       * @returns {string} 세금 계산서 정보를 포함한 문자열 메시지입니다.
       */
      toMessage() {
        /**
         * zeroAddition 함수는 숫자가 10보다 작을 경우 앞에 0을 추가하여 두 자리로 만듭니다.
         * @param {number} num - 숫자 값입니다.
         * @returns {string} 두 자리 문자열로 변환된 숫자입니다.
         */
        const zeroAddition = (num) => { return ((num < 10) ? '0' + String(num) : String(num)); }

        /**
         * 세금 계산서의 id, date, who, items, sum을 구조 분해 할당으로 가져옵니다.
         */
        const { id, date, who, items, sum } = this;

        /**
         * message 변수는 세금 계산서의 모든 정보를 담을 문자열입니다.
         */
        let message = '';
        message += "전자 세금 계산서(" + this.id + ") " + dateToString(date, true) + "\n";
        message += "\n";
        message += "발신자\n";
        message += "- 상호 : " + who.from.company + " (" + who.from.business + ")" + "\n";
        message += "- 이름 : " + who.from.name + "\n";
        message += "- 이메일 : " + who.from.email + "\n";
        message += "\n";
        message += "수신자\n";
        message += "- 상호 : " + who.to.company + " (" + who.to.business + ")" + "\n";
        message += "- 이름 : " + who.to.name + "\n";
        message += "- 이메일 : " + who.to.email + "\n";
        message += "\n";
        message += "내용\n";

        /**
         * items 배열을 순회하면서 각 품목의 정보를 메시지에 추가합니다.
         */
        for (let item of items) {
          message += "- 날짜 : " + String((new Date()).getFullYear()) + "-" + zeroAddition(item.month) + "-" + zeroAddition(item.date) + "\n";
          message += "- 품목 : " + item.name + "\n";
          message += "- 공급가 : " + autoComma(item.supply) + "원" + "\n";
          message += "- 세액 : " + autoComma(item.vat) + "원" + "\n";
          message += "\n";
        }

        /**
         * 합계 정보를 메시지에 추가합니다.
         */
        message += "합계\n";
        message += "- 소비자가 : " + autoComma(sum.total) + "원" + "\n";
        message += "- 공급가 : " + autoComma(sum.supply) + "원" + "\n";
        return message;
      }
    }

    /**
     * TaxBill 클래스를 반환합니다.
     */
    return { TaxBill };
  },

  /**
   * wrap 함수는 여러 TaxBill 인스턴스를 관리하는 배열 클래스를 생성합니다.
   * @param {function} alive - TaxBill 클래스를 인스턴스화하는 함수입니다.
   * @param {Array} jsonArr - json 데이터 배열로, 각 데이터를 개별 TaxBill 인스턴스로 변환합니다.
   * @param {Object} mother - 다른 모듈들과의 상호작용을 관리하는 객체입니다.
   * @returns {Array} TaxBills 클래스로 생성된 인스턴스 배열을 반환합니다.
   */
  wrap: function (alive, jsonArr, mother) {
    /**
     * alive 함수는 mother 객체를 통해 TaxBill 클래스를 인스턴스화합니다.
     */
    const { TaxBill } = alive(mother);

    /**
     * TaxBills 클래스는 여러 TaxBill 인스턴스를 관리하는 배열입니다.
     */
    class TaxBills extends Array {
      /**
       * search 메서드는 주어진 id를 기준으로 배열 내에서 특정 TaxBill 인스턴스를 찾습니다.
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
     * arr 배열은 TaxBills 인스턴스를 저장합니다.
     */
    let arr;
    arr = new TaxBills();

    /**
     * jsonArr 배열 내의 각 json 데이터를 TaxBill 인스턴스로 변환하여 arr 배열에 추가합니다.
     */
    for (let json of jsonArr) {
      arr.push(new TaxBill(json));
    }

    /**
     * 최종적으로 arr 배열을 반환하여 모든 TaxBill 인스턴스를 반환합니다.
     */
    return arr;
  }
}
