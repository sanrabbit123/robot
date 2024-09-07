// accountTransfer : 홈리에종의 계좌 이체 시스템을 위해 만들어진 중간 Databse로 고객이 계좌 이체 신청을 하고, 계좌 안내를 받는 시점에 생기는 json collection으로 이 데이터들을 기반으로 통장에 돈이 들어 왔을 때 누구가 어떤 목적으로 돈을 냈는지를 알 수 있습니다.

/**
 * @constant
 * @type {Object}
 * @description 샘플 계좌 이체 데이터 0. 고객이 홈리에종에서 인테리어 작업을 의뢰한 후, 잔금을 이체한 정보가 담겨있음.
 */
const sampleData0 = {
  "bilid": "b23bf_aa02s", // 계좌 이체 요청의 고유 ID. 계좌 이체 트랜잭션을 고유하게 식별하는 값.
  "requestNumber": 1, // 고객이 상담 신청을 한 횟수. 이체와 관련된 문의가 몇 번째인지 나타냄.
  "proid": "p2311_aa74s", // 프로젝트 ID. 이체와 관련된 프로젝트를 고유하게 식별함.
  "cliid": "c2311_aa77s", // 고객 ID. 이체를 요청한 고객을 고유하게 식별함.
  "desid": "d2307_aa01s", // 디자이너 ID. 이 프로젝트를 담당한 디자이너를 고유하게 식별함.
  "goodname": "홈리에종 잔금", // 이체와 관련된 품목이나 서비스의 이름.
  "date": new Date("2023-12-01T04:34:57.634Z"), // 이체 요청이 생성된 날짜와 시간.
  "name": "심훈정", // 이체를 요청한 고객의 이름.
  "phone": "010-3101-0287", // 고객의 전화번호.
  "amount": 4249740, // 이체된 금액. 해당 작업에 대한 잔금이 이체된 것임.
  "accountInfo": { // 계좌 정보 객체. 이체 관련 세부 정보들을 담고 있음.
    "no_tid": "realAccount", // 거래의 고유 ID.
    "no_oid": "homeliaisonBill_1701405297634", // 주문의 고유 ID.
    "cd_bank": "00", // 은행 코드. 이체된 은행의 코드를 나타냄.
    "nm_inputbank": "unknown", // 입금된 은행 이름. 일반적으로 'unknown'으로 표시됨.
    "nm_input": "심훈정", // 입금한 사람의 이름. 고객이름과 동일하게 설정됨.
    "amt_input": "4249740", // 입금된 금액.
    "real_account": "true" // 실제 계좌 여부를 나타내는 불리언 값. 'true'로 설정됨.
  }
};

/**
 * @constant
 * @type {Object}
 * @description 샘플 계좌 이체 데이터 1. 또 다른 고객의 잔금 이체 정보가 담겨있음.
 */
const sampleData1 = {
  "bilid": "b23aa_aa02s", // 계좌 이체 요청의 고유 ID.
  "requestNumber": 0, // 고객이 상담 신청을 한 횟수. 이 경우 첫 번째 문의.
  "proid": "p2309_ab35s", // 프로젝트 ID.
  "cliid": "c2309_ab52s", // 고객 ID.
  "desid": "d2309_aa04s", // 디자이너 ID.
  "goodname": "홈리에종 잔금", // 이체와 관련된 품목 또는 서비스의 이름.
  "date": new Date("2023-12-01T08:17:23.843Z"), // 이체 요청이 생성된 날짜와 시간.
  "name": "이현아", // 이체를 요청한 고객의 이름.
  "phone": "5161501376", // 고객의 전화번호.
  "amount": 2192520, // 이체된 금액.
  "accountInfo": { // 계좌 정보 객체.
    "no_tid": "realAccount", // 거래의 고유 ID.
    "no_oid": "homeliaisonBill_1701418643843", // 주문의 고유 ID.
    "cd_bank": "00", // 은행 코드.
    "nm_inputbank": "unknown", // 입금된 은행 이름. 일반적으로 'unknown'으로 표시됨.
    "nm_input": "이현아", // 입금한 사람의 이름. 고객이름과 동일하게 설정됨.
    "amt_input": "2192520", // 입금된 금액.
    "real_account": "true" // 실제 계좌 여부를 나타내는 불리언 값.
  }
};

/**
 * @constant
 * @type {Object}
 * @description 샘플 계좌 이체 데이터 2. 디자이너 출장비 이체 정보가 담겨있음.
 */
const sampleData2 = {
  "bilid": "b23bg_aa01s", // 계좌 이체 요청의 고유 ID.
  "requestNumber": 0, // 고객이 상담 신청을 한 횟수.
  "proid": "p2311_aa82s", // 프로젝트 ID.
  "cliid": "c2311_aa87s", // 고객 ID.
  "desid": "d2104_aa02s", // 디자이너 ID.
  "goodname": "디자이너 출장비", // 이체와 관련된 품목 또는 서비스의 이름.
  "date": new Date("2023-12-01T10:13:47.095Z"), // 이체 요청이 생성된 날짜와 시간.
  "name": "양희영", // 이체를 요청한 고객의 이름.
  "phone": "010-2489-4464", // 고객의 전화번호.
  "amount": 71500, // 이체된 금액.
  "accountInfo": { // 계좌 정보 객체.
    "no_tid": "realAccount", // 거래의 고유 ID.
    "no_oid": "homeliaisonBill_1701425627095", // 주문의 고유 ID.
    "cd_bank": "00", // 은행 코드.
    "nm_inputbank": "unknown", // 입금된 은행 이름.
    "nm_input": "양희영", // 입금한 사람의 이름. 고객이름과 동일하게 설정됨.
    "amt_input": "71500", // 입금된 금액.
    "real_account": "true" // 실제 계좌 여부를 나타내는 불리언 값.
  }
};

/**
 * @constant
 * @type {Object}
 * @description 샘플 계좌 이체 데이터 3. 시공 착수금 이체 정보가 담겨있음.
 */
const sampleData3 = {
  "bilid": "b235b_aa03s", // 계좌 이체 요청의 고유 ID.
  "requestNumber": 2, // 고객이 상담 신청을 한 횟수.
  "proid": "p2305_aa40s", // 프로젝트 ID.
  "cliid": "c2305_aa48s", // 고객 ID.
  "desid": "d2104_aa09s", // 디자이너 ID.
  "goodname": "시공 착수금", // 이체와 관련된 품목 또는 서비스의 이름.
  "date": new Date("2023-12-05T01:39:39.872Z"), // 이체 요청이 생성된 날짜와 시간.
  "name": "정현주", // 이체를 요청한 고객의 이름.
  "phone": "010-3268-5796", // 고객의 전화번호.
  "amount": 9221000, // 이체된 금액.
  "accountInfo": { // 계좌 정보 객체.
    "no_tid": "realAccount", // 거래의 고유 ID.
    "no_oid": "homeliaisonBill_1701740379872", // 주문의 고유 ID.
    "cd_bank": "00", // 은행 코드.
    "nm_inputbank": "unknown", // 입금된 은행 이름.
    "nm_input": "정현주", // 입금한 사람의 이름.
    "amt_input": "9221000", // 입금된 금액.
    "real_account": "true" // 실제 계좌 여부를 나타내는 불리언 값.
  }
};

/**
 * @constant
 * @type {Object}
 * @description 샘플 계좌 이체 데이터 4. 시공 잔금 이체 정보가 담겨있음.
 */
const sampleData4 = {
  "bilid": "b2398_aa02s", // 계좌 이체 요청의 고유 ID.
  "requestNumber": 0, // 고객이 상담 신청을 한 횟수.
  "proid": "p2309_aa33s", // 프로젝트 ID.
  "cliid": "c2309_aa41s", // 고객 ID.
  "desid": "d2105_aa02s", // 디자이너 ID.
  "goodname": "시공 잔금", // 이체와 관련된 품목 또는 서비스의 이름.
  "date": new Date("2023-12-05T04:31:58.008Z"), // 이체 요청이 생성된 날짜와 시간.
  "name": "김수연", // 이체를 요청한 고객의 이름.
  "phone": "010-7564-8180", // 고객의 전화번호.
  "amount": 1795000, // 이체된 금액.
  "accountInfo": { // 계좌 정보 객체.
    "no_tid": "realAccount", // 거래의 고유 ID.
    "no_oid": "homeliaisonBill_1701750718008", // 주문의 고유 ID.
    "cd_bank": "00", // 은행 코드.
    "nm_inputbank": "unknown", // 입금된 은행 이름.
    "nm_input": "김수연", // 입금한 사람의 이름.
    "amt_input": "1795000", // 입금된 금액.
    "real_account": "true" // 실제 계좌 여부를 나타내는 불리언 값.
  }
};

/**
 * @constant
 * @type {Object}
 * @description 샘플 계좌 이체 데이터 5. 또 다른 고객의 잔금 이체 정보가 담겨있음.
 */
const sampleData5 = {
  "bilid": "b2412_aa02s", // 계좌 이체 요청의 고유 ID.
  "requestNumber": 0, // 고객이 상담 신청을 한 횟수.
  "proid": "p2401_aa05s", // 프로젝트 ID.
  "cliid": "c2401_aa06s", // 고객 ID.
  "desid": "d1910_aa02s", // 디자이너 ID.
  "goodname": "홈리에종 잔금", // 이체와 관련된 품목 또는 서비스의 이름.
  "date": new Date("2024-03-04T07:25:00.597Z"), // 이체 요청이 생성된 날짜와 시간.
  "name": "한승연", // 이체를 요청한 고객의 이름.
  "phone": "010-3273-8713", // 고객의 전화번호.
  "amount": 2713260, // 이체된 금액.
  "accountInfo": { // 계좌 정보 객체.
    "no_tid": "realAccount", // 거래의 고유 ID.
    "no_oid": "homeliaisonBill_1709537100597", // 주문의 고유 ID.
    "cd_bank": "00", // 은행 코드.
    "nm_inputbank": "unknown", // 입금된 은행 이름.
    "nm_input": "한승연", // 입금한 사람의 이름.
    "amt_input": "2713260", // 입금된 금액.
    "real_account": "true" // 실제 계좌 여부를 나타내는 불리언 값.
  }
};

/**
 * @module accountTransfer
 * @description 계좌 이체 모듈로, accountTransfer 데이터베이스 컬렉션을 처리함.
 */
module.exports = {
  collection: "accountTransfer", // accountTransfer 컬렉션 이름을 지정.
  
  /**
   * 메인 함수로, 새로운 계좌 이체 데이터를 업데이트함.
   * @function
   * @param {Function} alive - Mother 객체에서 필요한 메서드를 가져오는 함수.
   * @param {Array} updateQueryArr - 업데이트할 JSON 데이터 배열.
   * @param {Object} mother - Mother 클래스의 인스턴스. MongoDB와의 연결을 관리하는 메서드를 제공함.
   * @returns {Array} tong - 업데이트된 데이터를 포함하는 배열.
   */
  main: function (alive, updateQueryArr, mother) {
    let map, fresh, findQuery, tong, insertEvent;

    // 데이터 구조와 검색 메서드를 정의한 객체. bilid를 기준으로 데이터를 찾음.
    map = {
      structure: { // 데이터 구조 정의
        bilid: "", // 고유 ID
        requestNumber: 0, // 상담 신청 횟수
        proid: "", // 프로젝트 ID
        cliid: "", // 고객 ID
        desid: "", // 디자이너 ID
        goodname: "", // 서비스 이름
        date: new Date(), // 날짜
        name: "", // 고객 이름
        phone: "", // 전화번호
        amount: 0, // 금액
        accountInfo: {} // 계좌 정보
      },
      // bilid를 기반으로 fresh 데이터에서 동일한 bilid를 가진 데이터를 찾는 함수
      find: (fresh) => { return { bilid: fresh.bilid } }
    };

    // Mother 객체의 alive 메서드를 호출하여 AccountTransfer 클래스를 가져옴
    const { AccountTransfer } = alive(mother);

    // 업데이트할 데이터를 담을 배열
    tong = [];
    
    // 업데이트할 JSON 데이터를 순회하며 처리
    for (let json of updateQueryArr) {
      fresh = new AccountTransfer(null); // 새로운 AccountTransfer 객체 생성
      fresh.make(json); // json 데이터를 기반으로 객체를 초기화함
      findQuery = map.find(fresh); // 해당 객체의 bilid로 검색 쿼리 생성
      insertEvent = async function (fresh) {} // 비동기 이벤트 정의
      tong.push({ fresh, findQuery, insertEvent }); // 생성한 객체와 쿼리, 이벤트를 tong 배열에 추가
    }

    // 최종 업데이트된 데이터를 반환
    return tong;
  },

  /**
   * alive 함수로, 새로운 AccountTransfer 객체를 생성하는 클래스를 반환함.
   * @function
   * @param {Object} mother - Mother 클래스의 인스턴스.
   * @returns {Object} AccountTransfer 클래스 정의를 반환.
   */
  alive: function (mother) {
    // AccountTransfer 클래스를 정의. 이 클래스는 계좌 이체 데이터를 관리함.
    class AccountTransfer {
      constructor(json) {
        if (json !== null) {
          if (typeof json === "object") {
            this.bilid = json.bilid; // 고유 ID 설정
            this.requestNumber = json.requestNumber; // 상담 신청 횟수 설정
            this.proid = json.proid; // 프로젝트 ID 설정
            this.cliid = json.cliid; // 고객 ID 설정
            this.desid = json.desid; // 디자이너 ID 설정
            this.goodname = json.goodname; // 서비스 이름 설정
            this.date = json.date; // 날짜 설정
            this.name = json.name; // 고객 이름 설정
            this.phone = json.phone; // 전화번호 설정
            this.amount = json.amount; // 금액 설정
            this.accountInfo = json.accountInfo; // 계좌 정보 설정
          }
        }
      }
    }
    return { AccountTransfer };
  },

  /**
   * wrap 함수로, 여러 AccountTransfer 객체를 관리하는 AccountTransfers 배열을 반환함.
   * @function
   * @param {Function} alive - Mother 객체에서 필요한 메서드를 가져오는 함수.
   * @param {Array} jsonArr - JSON 데이터 배열.
   * @param {Object} mother - Mother 클래스의 인스턴스.
   * @returns {AccountTransfers} arr - AccountTransfer 객체들을 포함하는 배열.
   */
  wrap: function (alive, jsonArr, mother) {
    // AccountTransfer 클래스를 alive 메서드를 통해 가져옴
    const { AccountTransfer } = alive(mother);

    // AccountTransfers 배열 클래스를 정의함. 이 클래스는 AccountTransfer 객체들을 관리함.
    class AccountTransfers extends Array {
      // 주어진 ID를 기반으로 배열에서 특정 AccountTransfer 객체를 검색함
      search(id) {
        let target = null;
        for (let o of this) {
          if (o.id === id) {
            target = o;
            break;
          }
        }
        return target;
      }
    }

    let arr = new AccountTransfers(); // 새로운 AccountTransfers 배열 생성

    // JSON 데이터를 순회하며 AccountTransfer 객체를 생성하고 배열에 추가
    for (let json of jsonArr) {
      arr.push(new AccountTransfer(json));
    }

    // 최종 배열을 반환
    return arr;
  }
}