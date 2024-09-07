// cashReceipt : 홈리에종 이름으로 현금 영수증을 받거나 발급할 때 data를 홈택스로부터 가져와 저장하는 db입니다. method = 0 일 시, 현금영수증 매출, method = 1 일 시, 현금영수증 매입 

/**
 * @constant
 * @type {Object}
 * @description 홈리에종 이름으로 발급된 현금 영수증 데이터 샘플 0. 매출에 해당하며, 홈택스로부터 가져온 정보를 저장함.
 */
const sampleData0 = {
  "id": "Z52786231", // 현금 영수증의 고유 ID. 홈택스에서 제공하는 고유한 영수증 식별자.
  "date": new Date("2022-11-29T13:40:38.000Z"), // 현금 영수증이 발행된 날짜와 시간.
  "deal": true, // 거래가 성립되었는지 여부를 나타냄. true면 거래가 성립됨.
  "method": 0, // 현금 영수증의 종류를 나타냄. 0이면 매출(홈리에종에서 발행), 1이면 매입(홈리에종에서 수령).
  "amount": { // 금액 정보를 담고 있는 객체.
    "supply": 1079091, // 공급가액. 총 금액 중 부가세를 제외한 금액.
    "vat": 107909, // 부가가치세(VAT). 공급가액의 10%.
    "service": 0, // 서비스 수수료. 현금 영수증 발행 시 발생하는 추가 비용.
    "total": 1187000 // 총 금액. 공급가액 + 부가세 + 서비스 수수료의 합계.
  },
  "etc": { // 기타 정보를 담고 있는 객체.
    "business": "사업자", // 거래 상대방의 사업자 정보.
    "remark": "일반거래", // 거래에 대한 간단한 설명 또는 메모.
    "issuance": "3165" // 발행 번호 또는 코드. 홈택스에서 제공하는 발행 관련 코드.
  }
};

/**
 * @constant
 * @type {Object}
 * @description 홈리에종 이름으로 발급된 현금 영수증 데이터 샘플 1. 매출에 해당하며, 홈택스로부터 가져온 정보를 저장함.
 */
const sampleData1 = {
  "id": "Z52912385", // 현금 영수증의 고유 ID.
  "date": new Date("2022-12-01T03:20:32.000Z"), // 현금 영수증이 발행된 날짜와 시간.
  "deal": true, // 거래가 성립되었는지 여부.
  "method": 0, // 현금 영수증의 종류. 매출.
  "amount": { // 금액 정보를 담고 있는 객체.
    "supply": 300000, // 공급가액.
    "vat": 30000, // 부가가치세.
    "service": 0, // 서비스 수수료.
    "total": 330000 // 총 금액.
  },
  "etc": { // 기타 정보를 담고 있는 객체.
    "business": "사업자", // 거래 상대방의 사업자 정보.
    "remark": "일반거래", // 거래에 대한 설명 또는 메모.
    "issuance": "8502" // 발행 번호.
  }
};

/**
 * @constant
 * @type {Object}
 * @description 홈리에종이 수령한 현금 영수증 데이터 샘플 2. 매입에 해당하며, 홈택스로부터 가져온 정보를 저장함.
 */
const sampleData2 = {
  "id": "Z52914152", // 현금 영수증의 고유 ID.
  "date": new Date("2022-12-01T02:11:59.000Z"), // 현금 영수증이 발행된 날짜와 시간.
  "deal": true, // 거래가 성립되었는지 여부.
  "method": 1, // 현금 영수증의 종류. 매입.
  "who": { // 거래 상대방의 정보를 담고 있는 객체.
    "business": "694-03-01557", // 거래 상대방의 사업자 번호.
    "company": "공간의위로" // 거래 상대방 회사 이름.
  },
  "amount": { // 금액 정보를 담고 있는 객체.
    "supply": 1193790, // 공급가액.
    "vat": 0, // 부가가치세. 이 거래에서는 부가세가 없음.
    "service": 0, // 서비스 수수료.
    "total": 1193790 // 총 금액.
  },
  "etc": { // 기타 정보를 담고 있는 객체.
    "item": "인테리어 컨설팅", // 거래 품목 또는 서비스의 이름.
    "remark": "불공제", // 거래에 대한 메모. 이 경우 불공제로 표시됨.
    "issuance": "9759" // 발행 번호.
  }
};

/**
 * @constant
 * @type {Object}
 * @description 홈리에종 이름으로 발급된 현금 영수증 데이터 샘플 3. 매출에 해당하며, 홈택스로부터 가져온 정보를 저장함.
 */
const sampleData3 = {
  "id": "Z52949017", // 현금 영수증의 고유 ID.
  "date": new Date("2022-12-02T01:21:37.000Z"), // 현금 영수증이 발행된 날짜와 시간.
  "deal": true, // 거래가 성립되었는지 여부.
  "method": 0, // 현금 영수증의 종류. 매출.
  "amount": { // 금액 정보를 담고 있는 객체.
    "supply": 2820750, // 공급가액.
    "vat": 282075, // 부가가치세.
    "service": 0, // 서비스 수수료.
    "total": 3102825 // 총 금액.
  },
  "etc": { // 기타 정보를 담고 있는 객체.
    "business": "사업자", // 거래 상대방의 사업자 정보.
    "remark": "일반거래", // 거래에 대한 설명 또는 메모.
    "issuance": "8502" // 발행 번호.
  }
};

/**
 * @constant
 * @type {Object}
 * @description 홈리에종 이름으로 발급된 현금 영수증 데이터 샘플 4. 매출에 해당하며, 홈택스로부터 가져온 정보를 저장함.
 */
const sampleData4 = {
  "id": "Z52996047", // 현금 영수증의 고유 ID.
  "date": new Date("2022-12-03T16:49:33.000Z"), // 현금 영수증이 발행된 날짜와 시간.
  "deal": true, // 거래가 성립되었는지 여부.
  "method": 0, // 현금 영수증의 종류. 매출.
  "amount": { // 금액 정보를 담고 있는 객체.
    "supply": 143000, // 공급가액.
    "vat": 14300, // 부가가치세.
    "service": 0, // 서비스 수수료.
    "total": 157300 // 총 금액.
  },
  "etc": { // 기타 정보를 담고 있는 객체.
    "business": "사업자", // 거래 상대방의 사업자 정보.
    "remark": "일반거래", // 거래에 대한 설명 또는 메모.
    "issuance": "5679" // 발행 번호.
  }
};

/**
 * @constant
 * @type {Object}
 * @description 홈리에종 이름으로 발급된 현금 영수증 데이터 샘플 5. 매출에 해당하며, 홈택스로부터 가져온 정보를 저장함.
 */
const sampleData5 = {
  "id": "Z56616861", // 현금 영수증의 고유 ID.
  "date": new Date("2023-03-09T02:00:07.000Z"), // 현금 영수증이 발행된 날짜와 시간.
  "deal": true, // 거래가 성립되었는지 여부.
  "method": 0, // 현금 영수증의 종류. 매출.
  "amount": { // 금액 정보를 담고 있는 객체.
    "supply": 300000, // 공급가액.
    "vat": 30000, // 부가가치세.
    "service": 0, // 서비스 수수료.
    "total": 330000 // 총 금액.
  },
  "etc": { // 기타 정보를 담고 있는 객체.
    "business": "사업자", // 거래 상대방의 사업자 정보.
    "remark": "소비자소득공제용", // 거래에 대한 설명 또는 메모. 소비자 소득공제용으로 발행됨.
    "issuance": "7900" // 발행 번호.
  }
};

/**
 * @module cashReceipt
 * @description cashReceipt 모듈은 홈리에종 이름으로 발급된 현금 영수증 데이터를 처리하는 시스템의 핵심 모듈입니다.
 */
module.exports = {
  collection: "cashReceipt", // cashReceipt 컬렉션 이름을 지정함. 이 컬렉션에 데이터를 저장함.

  /**
   * 메인 함수로, 홈택스로부터 가져온 데이터를 바탕으로 현금 영수증 정보를 업데이트하고, 이를 저장합니다.
   * @function
   * @param {Function} alive - Mother 객체에서 필요한 메서드를 가져오는 함수.
   * @param {Array} updateQueryArr - 업데이트할 JSON 데이터 배열.
   * @param {Object} mother - Mother 클래스의 인스턴스. 데이터베이스와 상호작용하는 데 필요한 메서드를 제공함.
   * @returns {Array} tong - 업데이트된 데이터를 포함하는 객체 배열을 반환함.
   */
  main: function (alive, updateQueryArr, mother) {
    let map, fresh, findQuery, tong, insertEvent;

    // 데이터 구조를 정의한 객체입니다. out은 매출, in은 매입 데이터 구조를 나타냅니다.
    map = {
      out: { // 매출 데이터 구조
        id: "", // 현금 영수증 ID
        date: new Date(1800, 0, 1), // 기본 날짜 설정 (1800년 1월 1일)
        deal: false, // 거래 성립 여부
        method: 0, // 매출(0)
        amount: { // 금액 정보
          supply: 0, // 공급가액
          vat: 0, // 부가가치세
          service: 0, // 서비스 수수료
          total: 0 // 총 금액
        },
        etc: { // 기타 정보
          business: "", // 사업자 정보
          remark: "", // 메모
          issuance: "" // 발행 번호
        }
      },
      in: { // 매입 데이터 구조
        id: "", // 현금 영수증 ID
        date: new Date(1800, 0, 1), // 기본 날짜 설정
        deal: false, // 거래 성립 여부
        method: 1, // 매입(1)
        who: { // 거래 상대방 정보
          business: "", // 사업자 번호
          company: "" // 회사 이름
        },
        amount: { // 금액 정보
          supply: 0, // 공급가액
          vat: 0, // 부가가치세
          service: 0, // 서비스 수수료
          total: 0 // 총 금액
        },
        etc: { // 기타 정보
          item: "", // 거래 품목
          remark: "", // 메모
          issuance: "" // 발행 번호
        }
      },
      find: { // 매출과 매입 데이터를 조회하는 함수
        out: (fresh) => { return { $and: [ { method: 0 }, { id: fresh.id } ] }; }, // 매출 데이터를 찾는 쿼리
        in: (fresh) => { return { $and: [ { method: 1 }, { id: fresh.id } ] }; } // 매입 데이터를 찾는 쿼리
      },
      graphic: { // 시각화 데이터를 위한 구조
        out: {
          method: "", // 영수증 유형 (매출)
          time: new Date(1800, 0, 1), // 시간
          supply: 0, // 공급가액
          vat: 0, // 부가가치세
          service: 0, // 서비스 수수료
          total: 0, // 총 금액
          id: "", // 현금 영수증 ID
          issuance: "", // 발행 번호
          deal: false, // 거래 성립 여부
          etc: "", // 기타 정보
        },
        in: {
          time: new Date(1800, 0, 1), // 시간
          business: "", // 사업자 번호
          from: "", // 회사 이름
          item: "", // 거래 품목
          supply: 0, // 공급가액
          vat: 0, // 부가가치세
          service: 0, // 서비스 수수료
          total: 0, // 총 금액
          id: "", // 현금 영수증 ID
          issuance: "", // 발행 번호
          deal: false, // 거래 성립 여부
          etc: "", // 기타 정보
        }
      }
    };

    // alive 메서드를 통해 CashOut과 CashIn 클래스를 가져옴. 이들은 각각 매출과 매입 데이터를 처리함.
    const { CashOut, CashIn } = alive(mother);

    // 업데이트할 데이터를 담을 배열.
    tong = [];

    // 업데이트할 데이터를 순회하며 처리함.
    for (let updateQuery of updateQueryArr) {
      if (updateQuery.method !== undefined) { // method 값이 존재하는 경우 (매출)
        fresh = new CashOut(null); // 새로운 CashOut 객체 생성
        fresh.make(updateQuery); // 업데이트 쿼리 데이터를 이용해 객체 초기화
        findQuery = map.find.out(fresh); // 매출 데이터를 찾는 쿼리 생성
        insertEvent = async function (fresh) {} // 비동기 이벤트 함수 (추가 기능 필요 시 구현)
      } else { // method 값이 없는 경우 (매입)
        fresh = new CashIn(null); // 새로운 CashIn 객체 생성
        fresh.make(updateQuery); // 업데이트 쿼리 데이터를 이용해 객체 초기화
        findQuery = map.find.in(fresh); // 매입 데이터를 찾는 쿼리 생성
        insertEvent = async function (fresh) { // 비동기 이벤트 함수
          try {
            await mother.messageSend(fresh.toMessage()); // Mother의 messageSend 메서드를 호출해 메시지를 전송
          } catch (e) {
            console.log(e); // 오류 발생 시 콘솔에 출력
          }
        }
      }
      tong.push({ fresh, findQuery, insertEvent }); // fresh 객체와 쿼리, 이벤트를 배열에 추가
    }

    return tong; // 최종 업데이트된 데이터를 반환
  },

  /**
   * alive 함수는 CashOut 및 CashIn 클래스를 생성하여 반환합니다.
   * @function
   * @param {Object} mother - Mother 클래스의 인스턴스. 필요한 유틸리티 메서드를 포함함.
   * @returns {Object} CashOut과 CashIn 클래스를 포함하는 객체를 반환.
   */
  alive: function (mother) {
    // Mother 클래스에서 제공하는 dateToString, autoComma 메서드를 가져옴.
    const { dateToString, autoComma } = mother;

    /**
     * CashOut 클래스는 매출 관련 데이터를 처리하는 클래스입니다.
     * @class
     */
    class CashOut {
      /**
       * @constructor
       * @param {Object|null} o - 초기화할 객체 또는 null.
       */
      constructor(o) {
        if (o !== null) { // 객체가 null이 아닌 경우
          if (typeof o === "object") { // 객체 타입이 object인 경우
            this.id = o.id; // 현금 영수증 ID
            this.date = o.date; // 발행 날짜
            this.deal = o.deal; // 거래 성립 여부
            this.method = 0; // 매출 (method = 0)
            this.amount = o.amount; // 금액 정보
            this.etc = o.etc; // 기타 정보
          }
        }
      }

      /**
       * make 메서드는 객체의 데이터를 설정합니다.
       * @param {Object} o - 설정할 데이터 객체.
       */
      make(o) {
        this.id = o.id; // 현금 영수증 ID 설정
        this.date = o.time; // 발행 날짜 설정
        this.deal = o.deal; // 거래 성립 여부 설정
        this.method = 0; // 매출로 설정 (method = 0)
        this.amount = { // 금액 정보 설정
          supply: o.supply, // 공급가액 설정
          vat: o.vat, // 부가가치세 설정
          service: o.service, // 서비스 수수료 설정
          total: o.total, // 총 금액 설정
        };
        this.etc = { // 기타 정보 설정
          business: o.method, // 사업자 정보 설정
          remark: o.etc, // 메모 설정
          issuance: o.issuance // 발행 번호 설정
        };
      }

      /**
       * toMessage 메서드는 이 객체의 데이터를 메시지 형식으로 변환합니다.
       * @returns {Object} 메시지 객체를 반환.
       */
      toMessage() {
        let arr;
        arr = [
          `현금 영수증(${this.id}) ${dateToString(this.date, true)}`, // 현금 영수증 ID와 발행 날짜
          ``,
          `- 종류 : ${this.method === 0 ? "매출" : "매입"}`, // 영수증 종류 (매출/매입)
          `- 금액 : ${autoComma(this.amount.total)}원`, // 총 금액을 쉼표로 구분하여 표시
        ];
        return { text: arr.join("\n"), channel: "#701_taxbill" }; // 메시지 내용을 합쳐서 반환, 채널 지정
      }
    }

    /**
     * CashIn 클래스는 매입 관련 데이터를 처리하는 클래스입니다.
     * @class
     */
    class CashIn {
      /**
       * @constructor
       * @param {Object|null} o - 초기화할 객체 또는 null.
       */
      constructor(o) {
        if (o !== null) { // 객체가 null이 아닌 경우
          if (typeof o === "object") { // 객체 타입이 object인 경우
            this.id = o.id; // 현금 영수증 ID
            this.date = o.date; // 발행 날짜
            this.deal = o.deal; // 거래 성립 여부
            this.method = 1; // 매입 (method = 1)
            this.who = o.who; // 거래 상대방 정보
            this.amount = o.amount; // 금액 정보
            this.etc = o.etc; // 기타 정보
          }
        }
      }

      /**
       * make 메서드는 객체의 데이터를 설정합니다.
       * @param {Object} o - 설정할 데이터 객체.
       */
      make(o) {
        this.id = o.id; // 현금 영수증 ID 설정
        this.date = o.time; // 발행 날짜 설정
        this.deal = o.deal; // 거래 성립 여부 설정
        this.method = 1; // 매입으로 설정 (method = 1)
        this.who = { // 거래 상대방 정보 설정
          business: o.business, // 사업자 번호 설정
          company: o.from // 회사 이름 설정
        };
        this.amount = { // 금액 정보 설정
          supply: o.supply, // 공급가액 설정
          vat: o.vat, // 부가가치세 설정
          service: o.service, // 서비스 수수료 설정
          total: o.total, // 총 금액 설정
        };
        this.etc = { // 기타 정보 설정
          item: o.item, // 거래 품목 설정
          remark: o.etc, // 메모 설정
          issuance: o.issuance // 발행 번호 설정
        };
      }

      /**
       * toMessage 메서드는 이 객체의 데이터를 메시지 형식으로 변환합니다.
       * @returns {Object} 메시지 객체를 반환.
       */
      toMessage() {
        let arr;
        arr = [
          `현금 영수증(${this.id}) ${dateToString(this.date, true)}`, // 현금 영수증 ID와 발행 날짜
          ``,
          `- 종류 : ${this.method === 0 ? "매출" : "매입"}`, // 영수증 종류 (매출/매입)
          `- 발신자 : ${this.who.company} (${this.who.business})`, // 발신자 정보 (회사 이름 및 사업자 번호)
          `- 품목 : ${this.etc.item}`, // 거래 품목
          `- 금액 : ${autoComma(this.amount.total)}원`, // 총 금액을 쉼표로 구분하여 표시
        ];
        return { text: arr.join("\n"), channel: "#701_taxbill" }; // 메시지 내용을 합쳐서 반환, 채널 지정
      }
    }

    // CashOut 및 CashIn 클래스를 포함하는 객체를 반환.
    return { CashOut, CashIn };
  },

  /**
   * wrap 함수는 주어진 JSON 배열을 CashOut 또는 CashIn 객체로 변환하여 반환합니다.
   * @function
   * @param {Function} alive - Mother 객체에서 필요한 메서드를 가져오는 함수.
   * @param {Array} jsonArr - JSON 데이터 배열.
   * @param {Object} mother - Mother 클래스의 인스턴스.
   * @returns {Array} Cash 객체들을 포함하는 배열을 반환.
   */
  wrap: function (alive, jsonArr, mother) {
    // alive 메서드를 통해 CashOut과 CashIn 클래스를 가져옴
    const { CashOut, CashIn } = alive(mother);

    /**
     * Cash 클래스는 CashOut 및 CashIn 객체들을 관리하는 배열입니다.
     * @class
     */
    class Cash extends Array {
      /**
       * search 메서드는 주어진 ID를 기준으로 배열에서 특정 객체를 검색합니다.
       * @param {string} id - 검색할 객체의 ID.
       * @returns {Object|null} 검색된 객체를 반환하거나, 없으면 null을 반환.
       */
      search(id) {
        let target;
        target = null; // 검색된 객체를 저장할 변수, 초기값은 null.
        for (let o of this) { // 배열을 순회하면서 ID를 비교함.
          if (o.id === id) { // ID가 일치하는 경우
            target = o; // 해당 객체를 target에 저장.
            break; // 검색 완료, 반복문을 종료.
          }
        }
        return target; // 검색된 객체 또는 null을 반환.
      }
    }

    let arr, tempObj;
    arr = new Cash(); // Cash 배열을 생성함.

    // JSON 데이터를 순회하며 CashOut 또는 CashIn 객체를 생성하여 배열에 추가함.
    for (let json of jsonArr) {
      if (json.method === 1) { // method가 1이면 매입
        tempObj = new CashIn(json); // CashIn 객체를 생성
      } else { // method가 0이면 매출
        tempObj = new CashOut(json); // CashOut 객체를 생성
      }
      arr.push(tempObj); // 생성된 객체를 배열에 추가
    }

    return arr; // 최종 Cash 배열을 반환
  }
};
