// Mother 모듈을 현재 작업 디렉토리에서 불러옵니다. 
// 이 모듈은 다양한 백엔드 유틸리티 기능을 제공합니다.
const Mother = require(process.cwd() + "/apps/mother.js");

// BackMaker 모듈을 현재 작업 디렉토리에서 불러옵니다. 
// 이 모듈은 백엔드 관련 추가 기능을 제공합니다.
const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js");

// ADDRESS 모듈을 현재 작업 디렉토리에서 불러옵니다. 
// 이 모듈은 주소 관련 정보를 관리하는 객체를 제공합니다.
const ADDRESS = require(process.cwd() + "/apps/infoObj.js");
const mother = new Mother();
const back = new BackMaker();
const address = ADDRESS;

/**
 * BillMaker 클래스는 청구서와 관련된 여러 기능을 수행하는 클래스입니다.
 * @constructor
 */
const BillMaker = function () {
  // mother 속성에 Mother 클래스의 인스턴스를 생성하여 할당합니다.
  this.mother = new Mother();

  // back 속성에 BackMaker 클래스의 인스턴스를 생성하여 할당합니다.
  this.back = new BackMaker();

  // address 속성에 ADDRESS 객체를 할당합니다.
  this.address = ADDRESS;

  // dir 속성에 현재 작업 디렉토리의 경로와 billMaker 경로를 결합하여 할당합니다.
  this.dir = process.cwd() + "/apps/billMaker";

  // mapDir 속성에 dir 속성의 값과 map 경로를 결합하여 할당합니다.
  this.mapDir = this.dir + "/map";

  // tempDir 속성에 현재 작업 디렉토리의 경로와 temp 경로를 결합하여 할당합니다.
  this.tempDir = process.cwd() + "/temp";
}

/**
 * billCollections 배열은 처리해야 하는 청구서 컬렉션의 이름을 담고 있습니다.
 * @type {string[]}
 */
BillMaker.billCollections = [
  "accountTransfer",  // 계좌 이체 청구서
  "cashReceipt",      // 현금 영수증
  "taxBill",          // 세금 계산서
  "stylingForm",      // 스타일링 계약서
  "constructForm",    // 시공 계약서
];

/**
 * 디자이너의 계산을 처리하는 함수입니다.
 * @param {number} supply - 공급가액
 * @param {string|object} classification - 계산 유형 (또는 계산 정보를 담은 객체)
 * @param {number|object} percentage - 수수료 비율 (또는 클라이언트 정보)
 * @param {object|null} client - 클라이언트 정보 (또는 null)
 * @param {object} option - 추가 옵션
 * @returns {object|array} 계산 결과 (계산된 값과 커미션이 포함된 객체 또는 배열)
 */
BillMaker.designerCalculation = function (supply, classification, percentage, client, option) {
  // 부가가치세 비율을 정의합니다.
  const vatRatio = 0.1;

  // 소비자 비율 (부가가치세 포함)을 정의합니다.
  const consumerRatio = 1 + vatRatio;

  // 자유비율을 정의합니다.
  const freeRatio = 0.967;

  // 표준 평수를 정의합니다.
  const pyeongStandard = 15;

  // 최소 공급 금액을 정의합니다.
  const pyeongMinAmount = 130 * (10000);

  // 최소 평수 상수 값을 정의합니다.
  const pyeongMinConst = 0.5;

  // 최소 수수료 비율을 정의합니다.
  const minimumPercentage = 20;

  // 초기 평수를 정의합니다.
  const initialPyeong = 34;

  // 계산 유형의 정규 표현식을 정의합니다.
  const classRegExpCase = [ "일반", "간이", "프리" ];

  // 금액 절단 상수를 정의합니다.
  const moneyCuttingConst = 10;

  let thisMode;   // 현재 모드를 저장할 변수입니다.
  let pyeong;     // 평수 정보를 저장할 변수입니다.
  let calculate, commission;   // 계산된 값과 커미션을 저장할 변수입니다.

  // 인자의 유형에 따라 서로 다른 초기화를 수행합니다.
  if (typeof supply === "number" && typeof classification === "string" && typeof percentage === "number" && (typeof client === "object" || client === null) && typeof option === "object") {
    // 첫 번째 조건이 만족되면 thisMode를 0으로 설정합니다.
    thisMode = 0;

  } else if (typeof supply === "number" && typeof classification === "object" && typeof percentage === "number" && (typeof client === "object" || client === null) && typeof option === "object") {

    // 두 번째 조건이 만족되면 classification의 value 값을 사용합니다.
    if (classification.value !== undefined) {
      classification = classification.value;
      if (typeof classification === "string") {
        // 조건이 만족되면 thisMode를 0으로 설정합니다.
        thisMode = 0;
      } else {
        throw new Error("invaild input");
      }
    } else {
      throw new Error("invaild input");
    }

  } else if (typeof supply === "number" && typeof classification === "object" && (typeof percentage === "object" || percentage === null) && typeof client === "object" && option === undefined) {
    
    // 세 번째 조건이 만족되면 classification의 proid 값을 확인합니다.
    if (classification.proid !== undefined) {
      // 프로젝트와 클라이언트 관련 초기화
      option = client;
      client = percentage;
      percentage = classification.process.calculation.percentage;
      classification = classification.process.calculation.method;
      thisMode = 1;

    } else if (classification.desid !== undefined) {
      // 디자이너와 클라이언트 관련 초기화
      option = client;
      client = percentage;
      percentage = classification.information.business.service.cost.percentage;
      classification = classification.information.business.businessInfo.classification;
      thisMode = 2;

    } else {
      throw new Error("invaild input");
    }
  } else if (typeof supply === "object" && (typeof classification === "object" || classification === null) && typeof percentage === "object" && client === undefined && option === undefined) {
    
    // 네 번째 조건이 만족되면 프로젝트와 클라이언트 관련 초기화를 수행합니다.
    option = percentage;
    client = classification;
    percentage = supply.process.calculation.percentage;
    classification = supply.process.calculation.method;
    supply = supply.process.contract.remain.calculation.amount.supply;
    thisMode = 3;

  } else {
    throw new Error("invaild input");
  }

  // classification이 객체일 때 처리
  if (typeof classification === "object" && classification.value !== undefined) {
    classification = classification.value;
  }

  // 최종 입력 값 검증
  if (typeof supply !== "number" || typeof classification !== "string" || typeof percentage !== "number" || typeof option !== "object") {
    throw new Error("invaild input");
  }

  pyeong = null;
  // 클라이언트가 null일 때 처리
  if (client === null) {
    pyeong = null;
  } else if (typeof client === "object" && !Array.isArray(client)) {
    // 클라이언트가 객체일 때 처리
    if (client.cliid !== undefined && client.name !== undefined && client.requests !== undefined) {
      if (Array.isArray(client.requests)) {
        if (client.requests.length !== 0) {
          pyeong = [];
          for (let r of client.requests) {
            pyeong.push(r.request.space.pyeong);
          }
        } else {
          throw new Error("invaild client input");
        }
      } else {
        throw new Error("invaild client input");
      }
    } else {
      throw new Error("invaild client input");
    }
  } else {
    throw new Error("invaild client input");
  }

  // pyeong이 null일 경우 초기화
  if (pyeong === null) {
    pyeong = initialPyeong;
  }

  // pyeong 값의 최종 검증
  if (typeof pyeong !== "number" && !Array.isArray(pyeong)) {
    throw new Error("invaild pyeong input");
  }

  // classification 값 검증
  if (!(new RegExp(classRegExpCase[0], "gi")).test(classification) && !(new RegExp(classRegExpCase[1], "gi")).test(classification) && !(new RegExp(classRegExpCase[2], "gi")).test(classification)) {
    throw new Error("invaild classification : " + classification);
  }

  // pyeong 값이 배열일 때 처리
  if (Array.isArray(pyeong)) {
    if (pyeong.length === 0) {
      throw new Error("invaild pyeong");
    }
    if (!pyeong.every((n) => { return (typeof n === "number"); })) {
      if (pyeong.every((obj) => { return (typeof obj === "object"); })) {
        pyeong = pyeong.map((obj) => { return obj.value; });
        if (!pyeong.every((n) => { return (typeof n === "number"); })) {
          throw new Error("invaild pyeong");
        }
      } else {
        throw new Error("invaild pyeong");
      }
    }
    if (pyeong.length === 1) {
      pyeong = pyeong[0];
      if (typeof pyeong !== "number") {
        throw new Error("invaild pyeong");
      }
    }
  }

  // pyeong 값이 배열일 때 표준 평수를 기준으로 적합한 값을 선택
  if (Array.isArray(pyeong)) {
    if (pyeong.every((n) => { return n >= pyeongStandard; })) {
      pyeong = pyeong[0];
    } else {
      if (supply < pyeongMinAmount) {
        pyeong = pyeong.find((n) => { return n < pyeongStandard });
      } else {
        if (pyeong.every((n) => { return n < pyeongStandard; })) {
          pyeong = pyeong[0];
        } else {
          if (supply <= pyeongMinAmount * (1 + pyeongMinConst)) {
            pyeong = pyeong[0];
          } else {
            pyeong = pyeong.find((n) => { return n >= pyeongStandard });
          }
        }
      }
    }
  }

  // 옵션에 따른 percentage 조정
  if (option.forcePercentage !== true) {
    if (pyeong < pyeongStandard) {
      percentage = minimumPercentage;
    }
    if (percentage <= minimumPercentage) {
      percentage = minimumPercentage;
    }
  }

  // classification에 따른 계산 로직
  if ((new RegExp(classRegExpCase[0], "gi")).test(classification)) {
    calculate = Math.floor((supply * consumerRatio) * (1 - (percentage / 100)));
  } else if ((new RegExp(classRegExpCase[1], "gi")).test(classification)) {
    calculate = Math.floor(supply * (1 - (percentage / 100)));
  } else if ((new RegExp(classRegExpCase[2], "gi")).test(classification)) {
    calculate = Math.floor((supply - (supply * (percentage / 100))) * freeRatio);
  }
  calculate = Math.floor(calculate / moneyCuttingConst) * moneyCuttingConst;

  // 커미션 계산
  commission = supply * (percentage / 100);
  commission = Math.floor(commission / moneyCuttingConst) * moneyCuttingConst;

  // 옵션에 따라 결과를 배열 또는 객체로 반환
  if (option.toArray === true) {
    return [ calculate, commission ];
  } else {
    return { calculate, commission };
  }
}

/**
 * BillMaker 인스턴스에서 디자이너의 계산을 처리하는 함수입니다.
 * @param {number} supply - 공급가액
 * @param {string|object} classification - 계산 유형 (또는 계산 정보를 담은 객체)
 * @param {number|object} percentage - 수수료 비율 (또는 클라이언트 정보)
 * @param {object|null} client - 클라이언트 정보 (또는 null)
 * @param {object} option - 추가 옵션
 * @returns {object|array} 계산 결과 (계산된 값과 커미션이 포함된 객체 또는 배열)
 */
BillMaker.prototype.designerCalculation = function (supply, classification, percentage, client, option) {
  // static 메서드인 BillMaker.designerCalculation을 호출하여 결과를 반환합니다.
  return BillMaker.designerCalculation(supply, classification, percentage, client, option);
}

/**
 * BillMaker 클래스의 billDictionary 속성으로, 다양한 청구서 항목에 대한 정의와 계산 방법을 포함한 객체입니다.
 * 이 객체는 스타일링, 시공, 정산 등의 다양한 청구서 항목을 정의하고 각 항목에 대한 정보를 반환하는 메서드를 포함하고 있습니다.
 */
BillMaker.billDictionary = {
  styling: {
    // 스타일링에 관련된 청구서 항목을 정의하는 객체.
    class: "style", // 클래스명으로 'style'로 정의.
    name: "스타일링", // 스타일링 청구서의 이름.
    requests: {
      /**
       * 첫 번째 결제 항목을 정의하는 객체입니다.
       * 이 객체는 고객이 계약을 체결할 때 지불해야 하는 계약금에 대한 정보를 관리합니다.
       */
      firstPayment: {
        // 결제 항목의 이름을 지정합니다.
        name: "홈리에종 계약금",

        /**
         * 계약금에 대한 정보를 생성하는 메서드입니다.
         * 
         * @param {Object} client - 고객 정보를 포함하는 객체입니다.
         * @param {Object} designer - 디자이너 정보를 포함하는 객체입니다.
         * @param {Object} project - 프로젝트 정보를 포함하는 객체입니다.
         * @param {string} method - 결제 방법을 나타내는 문자열입니다.
         * @param {Object} [subObj={}] - 추가적인 정보를 포함하는 선택적 객체입니다.
         * @returns {Array} info - 계약금 정보가 포함된 배열입니다.
         */
        info: (client, designer, project, method, subObj = {}) => {
          let info; // 반환할 정보 배열을 선언합니다.
          info = []; // 정보 배열을 초기화합니다.

          // 고객의 첫 번째 요청에 대한 공간 주소를 배열에 추가합니다.
          info.push({ address: client.requests[0].request.space.address.value });

          // 고객의 첫 번째 요청에 대한 평수를 배열에 추가합니다.
          info.push({ pyeong: client.requests[0].request.space.pyeong.value });

          // 결제 방법을 배열에 추가합니다.
          info.push({ method });

          // 구성된 정보 배열을 반환합니다.
          return info;
        },

        /**
         * 계약금 항목을 생성하는 메서드입니다.
         * 
         * @param {Object} feeObject - 요금 정보를 포함하는 객체입니다.
         * @param {Object} subObj - 추가적인 정보를 포함하는 객체입니다.
         * @returns {Array} - 계약금 항목이 포함된 배열입니다.
         */
        item: (feeObject, subObj) => {
          // subObj에서 프로젝트, 부가가치세 비율, 계약 금액을 추출합니다.
          let { project, vatRatio, contractAmount } = subObj;

          // 만약 첫 번째 계약의 금액이 0이 아니라면, 부가가치세를 제외한 계약 금액을 계산합니다.
          if (project.process.contract.first.calculation.amount !== 0) {
            contractAmount = project.process.contract.first.calculation.amount * (1 / (1 + vatRatio));
          }

          // "designerTime"과 계산된 계약 금액을 포함하는 배열을 반환합니다.
          return [
            [ "designerTime", contractAmount ]
          ];
        },

        /**
         * 계약금의 대상이 되는 고객 정보를 생성하는 메서드입니다.
         * 
         * @param {Object} client - 고객 정보를 포함하는 객체입니다.
         * @param {Object} designer - 디자이너 정보를 포함하는 객체입니다.
         * @param {Object} project - 프로젝트 정보를 포함하는 객체입니다.
         * @param {string} method - 결제 방법을 나타내는 문자열입니다.
         * @param {Object} [subObj={}] - 추가적인 정보를 포함하는 선택적 객체입니다.
         * @returns {Object} - 고객의 ID, 이름, 전화번호, 이메일이 포함된 객체입니다.
         */
        target: (client, designer, project, method, subObj = {}) => {
          // 고객의 ID, 이름, 전화번호, 이메일 정보를 포함하는 객체를 반환합니다.
          return {
            id: client.cliid,
            name: client.name,
            phone: client.phone,
            email: client.email,
          };
        },

        // 계약금에 대한 추가적인 설명을 포함하는 배열입니다.
        comments: [
          "계약금은 전체 서비스 금액에 포함됩니다.", // 계약금이 전체 서비스 금액에 포함된다는 설명입니다.
          "계약금을 입금하시면 담당 디자이너에게 고객님 정보가 전달되며, 현장 미팅이 진행됩니다.", // 계약금을 입금한 후 디자이너에게 고객 정보가 전달되고, 현장 미팅이 진행된다는 설명입니다.
          "현장 미팅 후 계약금을 제외한 잔금을 입금하시면 디자인 서비스가 계속 진행됩니다.", // 현장 미팅 후 잔금을 입금하면 서비스가 계속 진행된다는 설명입니다.
          "현장 미팅 진행 후 디자인 서비스를 더 진행하지 않더라도, 계약금은 환불되지 않습니다.", // 현장 미팅 후 서비스를 취소해도 계약금은 환불되지 않는다는 설명입니다.
        ]
      },
      /**
       * 두 번째 결제 항목을 정의하는 객체입니다.
       * 이 객체는 고객이 디자인 작업의 잔금을 지불해야 하는 상황에 대한 정보를 관리합니다.
       */
      secondPayment: {
        // 결제 항목의 이름을 지정합니다.
        name: "홈리에종 잔금",

        /**
         * 잔금에 대한 정보를 생성하는 메서드입니다.
         * 
         * @param {Object} client - 고객 정보를 포함하는 객체입니다.
         * @param {Object} designer - 디자이너 정보를 포함하는 객체입니다.
         * @param {Object} project - 프로젝트 정보를 포함하는 객체입니다.
         * @param {string} method - 결제 방법을 나타내는 문자열입니다.
         * @param {Object} [subObj={}] - 추가적인 정보를 포함하는 선택적 객체입니다.
         * @returns {Array} info - 잔금 정보가 포함된 배열입니다.
         */
        info: (client, designer, project, method, subObj = {}) => {
            let info; // 반환할 정보 배열을 선언합니다.
            info = []; // 정보 배열을 초기화합니다.

            // 고객의 첫 번째 요청에 대한 공간 주소를 배열에 추가합니다.
            info.push({ address: client.requests[0].request.space.address.value });

            // 고객의 첫 번째 요청에 대한 평수를 배열에 추가합니다.
            info.push({ pyeong: client.requests[0].request.space.pyeong.value });

            // 결제 방법을 배열에 추가합니다.
            info.push({ method });

            // 구성된 정보 배열을 반환합니다.
            return info;
        },

        /**
         * 잔금 항목을 생성하는 메서드입니다.
         * 
         * @param {Object} feeObject - 요금 정보를 포함하는 객체입니다.
         * @param {Object} subObj - 추가적인 정보를 포함하는 객체입니다.
         * @returns {Array} - 잔금 항목이 포함된 배열입니다.
         */
        item: (feeObject, subObj) => {
            // subObj에서 프로젝트, 부가가치세 비율, 계약 금액을 추출합니다.
            let { project, vatRatio, contractAmount } = subObj;
            let finalNumber; // 계산된 잔금을 저장할 변수를 선언합니다.

            // 첫 번째 계약의 금액이 0이 아니라면, 부가가치세를 제외한 계약 금액을 계산합니다.
            if (project.process.contract.first.calculation.amount !== 0) {
                contractAmount = project.process.contract.first.calculation.amount * (1 / (1 + vatRatio));
            }

            // 남은 금액이 0이 아니라면, 계약 금액을 뺀 최종 금액을 계산합니다.
            if (project.process.contract.remain.calculation.amount.supply !== 0) {
                finalNumber = project.process.contract.remain.calculation.amount.supply - contractAmount;
            } else {
                // 그렇지 않다면, 전체 요금에서 계약 금액을 뺀 금액을 최종 금액으로 설정합니다.
                finalNumber = feeObject.amount - contractAmount;
            }

            // "designerTime"과 계산된 최종 금액을 포함하는 배열을 반환합니다.
            return [
                ["designerTime", finalNumber]
            ];
        },

        /**
         * 잔금의 대상이 되는 고객 정보를 생성하는 메서드입니다.
         * 
         * @param {Object} client - 고객 정보를 포함하는 객체입니다.
         * @param {Object} designer - 디자이너 정보를 포함하는 객체입니다.
         * @param {Object} project - 프로젝트 정보를 포함하는 객체입니다.
         * @param {string} method - 결제 방법을 나타내는 문자열입니다.
         * @param {Object} [subObj={}] - 추가적인 정보를 포함하는 선택적 객체입니다.
         * @returns {Object} - 고객의 ID, 이름, 전화번호, 이메일이 포함된 객체입니다.
         */
        target: (client, designer, project, method, subObj = {}) => {
            // 고객의 ID, 이름, 전화번호, 이메일 정보를 포함하는 객체를 반환합니다.
            return {
                id: client.cliid,
                name: client.name,
                phone: client.phone,
                email: client.email,
            };
        },

        // 잔금에 대한 추가적인 설명을 포함하는 배열입니다.
        comments: [
            "잔금은 총 디자인비에서 계약금을 제외한 금액입니다.", // 잔금이 총 디자인비에서 계약금을 제외한 금액임을 설명합니다.
            "잔금을 입금해주시면 홈스타일링 서비스가 계속 진행됩니다.", // 잔금을 입금하면 서비스가 계속 진행됨을 설명합니다.
            "결제해주신 디자인비는 서비스 정책상, 홈스타일링이 끝날 때까지 홈리에종에서 보관합니다.", // 잔금은 서비스가 종료될 때까지 보관됨을 설명합니다.
            "홈스타일링이 모두 끝나게 되면 고객님께 확인을 받게 되며, 컨펌 후 디자이너에게 정산합니다.", // 서비스 종료 후 고객의 확인 후 디자이너에게 정산됨을 설명합니다.
        ]
      },
      /**
       * 세 번째 결제 항목을 정의하는 객체입니다.
       * 이 객체는 디자이너 출장비에 대한 정보를 관리합니다.
       */
      travelPayment: {
        // 결제 항목의 이름을 지정합니다.
        name: "디자이너 출장비",

        /**
         * 출장비에 대한 정보를 생성하는 메서드입니다.
         * 
         * @param {Object} client - 고객 정보를 포함하는 객체입니다.
         * @param {Object} designer - 디자이너 정보를 포함하는 객체입니다.
         * @param {Object} project - 프로젝트 정보를 포함하는 객체입니다.
         * @param {string} method - 결제 방법을 나타내는 문자열입니다.
         * @param {Object} [subObj={}] - 추가적인 정보를 포함하는 선택적 객체입니다.
         * @returns {Array} info - 출장비 정보가 포함된 배열입니다.
         */
        info: (client, designer, project, method, subObj = {}) => {
            let info; // 반환할 정보 배열을 선언합니다.
            let feeObject, distance; // 요금 정보와 거리를 저장할 변수를 선언합니다.

            // 프로젝트 제안서에서 디자이너의 ID와 일치하는 제안을 찾습니다.
            for (let proposal of project.proposal.detail) {
                if (proposal.desid === designer.desid) {
                    // 제안서의 결제 방법이 현재 결제 방법과 일치하는 요금 객체를 찾습니다.
                    for (let obj of proposal.fee) {
                        if (obj.method === method) {
                            feeObject = obj;
                        }
                    }
                }
            }

            // 찾은 요금 객체에서 거리 정보를 추출합니다.
            distance = feeObject.distance;
            info = []; // 정보 배열을 초기화합니다.

            // 고객의 첫 번째 요청에 대한 공간 주소를 배열에 추가합니다.
            info.push({ address: client.requests[0].request.space.address.value });

            // 고객의 첫 번째 요청에 대한 평수를 배열에 추가합니다.
            info.push({ pyeong: client.requests[0].request.space.pyeong.value });

            // 거리 정보를 배열에 추가합니다.
            info.push({ distance: distance.distance });
            info.push({ time: distance.time });
            info.push({ number: distance.number });
            info.push({ limit: distance.limit });

            // 결제 방법과 디자이너 ID를 배열에 추가합니다.
            info.push({ method });
            info.push({ desid: designer.desid });

            // 구성된 정보 배열을 반환합니다.
            return info;
        },

        /**
         * 출장비 항목을 생성하는 메서드입니다.
         * 
         * @param {Object} feeObject - 요금 정보를 포함하는 객체입니다.
         * @param {Object} subObj - 추가적인 정보를 포함하는 객체입니다.
         * @returns {Array} - 출장비 항목이 포함된 배열입니다.
         */
        item: (feeObject, subObj) => {
            // "travelExpenses"와 기본값 0을 포함하는 배열을 반환합니다.
            return [
                ["travelExpenses", 0]
            ];
        },

        /**
         * 출장비의 대상이 되는 고객 정보를 생성하는 메서드입니다.
         * 
         * @param {Object} client - 고객 정보를 포함하는 객체입니다.
         * @param {Object} designer - 디자이너 정보를 포함하는 객체입니다.
         * @param {Object} project - 프로젝트 정보를 포함하는 객체입니다.
         * @param {string} method - 결제 방법을 나타내는 문자열입니다.
         * @param {Object} [subObj={}] - 추가적인 정보를 포함하는 선택적 객체입니다.
         * @returns {Object} - 고객의 ID, 이름, 전화번호, 이메일이 포함된 객체입니다.
         */
        target: (client, designer, project, method, subObj = {}) => {
            // 고객의 ID, 이름, 전화번호, 이메일 정보를 포함하는 객체를 반환합니다.
            return {
                id: client.cliid,
                name: client.name,
                phone: client.phone,
                email: client.email,
            };
        },

        // 출장비에 대한 추가적인 설명을 포함하는 배열입니다.
        comments: [
            // 이 항목에서는 추가적인 설명이 없으므로 빈 배열로 설정되어 있습니다.
        ]
      },
      /**
       * 네 번째 결제 항목을 정의하는 객체입니다.
       * 이 객체는 시공 계약금에 대한 정보를 관리합니다.
       */
      constructFirst: {
        // 결제 항목의 이름을 지정합니다.
        name: "시공 계약금",

        /**
         * 시공 계약금에 대한 정보를 생성하는 메서드입니다.
         * 
         * @param {Object} client - 고객 정보를 포함하는 객체입니다.
         * @param {Object} designer - 디자이너 정보를 포함하는 객체입니다.
         * @param {Object} project - 프로젝트 정보를 포함하는 객체입니다.
         * @param {string} method - 결제 방법을 나타내는 문자열입니다.
         * @param {Object} [subObj={}] - 추가적인 정보를 포함하는 선택적 객체입니다.
         * @returns {Array} info - 시공 계약금 정보가 포함된 배열입니다.
         */
        info: (client, designer, project, method, subObj = {}) => {
            let info; // 반환할 정보 배열을 선언합니다.
            info = []; // 정보 배열을 초기화합니다.

            // 고객의 첫 번째 요청에 대한 공간 주소를 배열에 추가합니다.
            info.push({ address: client.requests[0].request.space.address.value });

            // 고객의 첫 번째 요청에 대한 평수를 배열에 추가합니다.
            info.push({ pyeong: client.requests[0].request.space.pyeong.value });

            // 구성된 정보 배열을 반환합니다.
            return info;
        },

        /**
         * 시공 계약금 항목을 생성하는 메서드입니다.
         * 
         * @param {Object} amountObject - 금액 정보를 포함하는 객체입니다.
         * @param {Object} subObj - 추가적인 정보를 포함하는 객체입니다.
         * @returns {Array} - 시공 계약금 항목이 포함된 배열입니다.
         */
        item: (amountObject, subObj) => {
            // "constructTimeFirst"와 전달된 첫 번째 계약금액을 포함하는 배열을 반환합니다.
            return [
                ["constructTimeFirst", amountObject.first]
            ];
        },

        /**
         * 시공 계약금의 대상이 되는 고객 정보를 생성하는 메서드입니다.
         * 
         * @param {Object} client - 고객 정보를 포함하는 객체입니다.
         * @param {Object} designer - 디자이너 정보를 포함하는 객체입니다.
         * @param {Object} project - 프로젝트 정보를 포함하는 객체입니다.
         * @param {string} method - 결제 방법을 나타내는 문자열입니다.
         * @param {Object} [subObj={}] - 추가적인 정보를 포함하는 선택적 객체입니다.
         * @returns {Object} - 고객의 ID, 이름, 전화번호, 이메일이 포함된 객체입니다.
         */
        target: (client, designer, project, method, subObj = {}) => {
            // 고객의 ID, 이름, 전화번호, 이메일 정보를 포함하는 객체를 반환합니다.
            return {
                id: client.cliid,
                name: client.name,
                phone: client.phone,
                email: client.email,
            };
        },

        // 시공 계약금에 대한 추가적인 설명을 포함하는 배열입니다.
        comments: [
            "계약금은 전체 시공 금액에 포함됩니다.", // 계약금이 전체 시공 금액에 포함된다는 설명입니다.
            "계약금을 입금하시면 해당 시공사에게 고객님 정보가 전달되며, 현장 미팅을 할 수 있습니다.", // 계약금을 입금한 후 시공사에게 고객 정보가 전달되고 현장 미팅이 가능하다는 설명입니다.
        ]
      },
      /**
       * 다섯 번째 결제 항목을 정의하는 객체입니다.
       * 이 객체는 시공 착수금에 대한 정보를 관리합니다.
       */
      constructStart: {
        // 결제 항목의 이름을 지정합니다.
        name: "시공 착수금",

        /**
         * 시공 착수금에 대한 정보를 생성하는 메서드입니다.
         * 
         * @param {Object} client - 고객 정보를 포함하는 객체입니다.
         * @param {Object} designer - 디자이너 정보를 포함하는 객체입니다.
         * @param {Object} project - 프로젝트 정보를 포함하는 객체입니다.
         * @param {string} method - 결제 방법을 나타내는 문자열입니다.
         * @param {Object} [subObj={}] - 추가적인 정보를 포함하는 선택적 객체입니다.
         * @returns {Array} info - 시공 착수금 정보가 포함된 배열입니다.
         */
        info: (client, designer, project, method, subObj = {}) => {
            let info; // 반환할 정보 배열을 선언합니다.
            info = []; // 정보 배열을 초기화합니다.

            // 고객의 첫 번째 요청에 대한 공간 주소를 배열에 추가합니다.
            info.push({ address: client.requests[0].request.space.address.value });

            // 고객의 첫 번째 요청에 대한 평수를 배열에 추가합니다.
            info.push({ pyeong: client.requests[0].request.space.pyeong.value });

            // 구성된 정보 배열을 반환합니다.
            return info;
        },

        /**
         * 시공 착수금 항목을 생성하는 메서드입니다.
         * 
         * @param {Object} amountObject - 금액 정보를 포함하는 객체입니다.
         * @param {Object} subObj - 추가적인 정보를 포함하는 객체입니다.
         * @returns {Array} - 시공 착수금 항목이 포함된 배열입니다.
         */
        item: (amountObject, subObj) => {
            // "constructTimeStart"와 전달된 착수금액을 포함하는 배열을 반환합니다.
            return [
                ["constructTimeStart", amountObject.start]
            ];
        },

        /**
         * 시공 착수금의 대상이 되는 고객 정보를 생성하는 메서드입니다.
         * 
         * @param {Object} client - 고객 정보를 포함하는 객체입니다.
         * @param {Object} designer - 디자이너 정보를 포함하는 객체입니다.
         * @param {Object} project - 프로젝트 정보를 포함하는 객체입니다.
         * @param {string} method - 결제 방법을 나타내는 문자열입니다.
         * @param {Object} [subObj={}] - 추가적인 정보를 포함하는 선택적 객체입니다.
         * @returns {Object} - 고객의 ID, 이름, 전화번호, 이메일이 포함된 객체입니다.
         */
        target: (client, designer, project, method, subObj = {}) => {
            // 고객의 ID, 이름, 전화번호, 이메일 정보를 포함하는 객체를 반환합니다.
            return {
                id: client.cliid,
                name: client.name,
                phone: client.phone,
                email: client.email,
            };
        },

        // 시공 착수금에 대한 추가적인 설명을 포함하는 배열입니다.
        comments: [
            "착수금은 공사를 시작하기 위한 금액입니다. 전체 시공 금액에 포함됩니다.", // 착수금이 공사를 시작하기 위한 금액이며 전체 시공 금액에 포함된다는 설명입니다.
            "착수금 입금하시면 본격적인 시공이 진행됩니다.", // 착수금이 입금된 후 본격적인 시공이 진행된다는 설명입니다.
        ]
      },
      /**
       * 여섯 번째 결제 항목을 정의하는 객체입니다.
       * 이 객체는 시공 중도금에 대한 정보를 관리합니다.
       */
      constructMiddle: {
        // 결제 항목의 이름을 지정합니다.
        name: "시공 중도금",

        /**
         * 시공 중도금에 대한 정보를 생성하는 메서드입니다.
         * 
         * @param {Object} client - 고객 정보를 포함하는 객체입니다.
         * @param {Object} designer - 디자이너 정보를 포함하는 객체입니다.
         * @param {Object} project - 프로젝트 정보를 포함하는 객체입니다.
         * @param {string} method - 결제 방법을 나타내는 문자열입니다.
         * @param {Object} [subObj={}] - 추가적인 정보를 포함하는 선택적 객체입니다.
         * @returns {Array} info - 시공 중도금 정보가 포함된 배열입니다.
         */
        info: (client, designer, project, method, subObj = {}) => {
            let info; // 반환할 정보 배열을 선언합니다.
            info = []; // 정보 배열을 초기화합니다.

            // 고객의 첫 번째 요청에 대한 공간 주소를 배열에 추가합니다.
            info.push({ address: client.requests[0].request.space.address.value });

            // 고객의 첫 번째 요청에 대한 평수를 배열에 추가합니다.
            info.push({ pyeong: client.requests[0].request.space.pyeong.value });

            // 구성된 정보 배열을 반환합니다.
            return info;
        },

        /**
         * 시공 중도금 항목을 생성하는 메서드입니다.
         * 
         * @param {Object} amountObject - 금액 정보를 포함하는 객체입니다.
         * @param {Object} subObj - 추가적인 정보를 포함하는 객체입니다.
         * @returns {Array} - 시공 중도금 항목이 포함된 배열입니다.
         */
        item: (amountObject, subObj) => {
            // "constructTimeMiddle"와 전달된 중도금액을 포함하는 배열을 반환합니다.
            return [
                ["constructTimeMiddle", amountObject.middle]
            ];
        },

        /**
         * 시공 중도금의 대상이 되는 고객 정보를 생성하는 메서드입니다.
         * 
         * @param {Object} client - 고객 정보를 포함하는 객체입니다.
         * @param {Object} designer - 디자이너 정보를 포함하는 객체입니다.
         * @param {Object} project - 프로젝트 정보를 포함하는 객체입니다.
         * @param {string} method - 결제 방법을 나타내는 문자열입니다.
         * @param {Object} [subObj={}] - 추가적인 정보를 포함하는 선택적 객체입니다.
         * @returns {Object} - 고객의 ID, 이름, 전화번호, 이메일이 포함된 객체입니다.
         */
        target: (client, designer, project, method, subObj = {}) => {
            // 고객의 ID, 이름, 전화번호, 이메일 정보를 포함하는 객체를 반환합니다.
            return {
                id: client.cliid,
                name: client.name,
                phone: client.phone,
                email: client.email,
            };
        },

        // 시공 중도금에 대한 추가적인 설명을 포함하는 배열입니다.
        comments: [
            "중도금 공사가 한창 진행하고 있는 중간에 내시는 금액입니다. 전체 시공 금액에 포함됩니다.", // 중도금이 공사가 진행 중인 중간에 내는 금액이며 전체 시공 금액에 포함된다는 설명입니다.
            "중도금을 입금하시면 시공이 다음 단계로 진행됩니다.", // 중도금이 입금된 후 시공이 다음 단계로 진행된다는 설명입니다.
        ]
      },
      /**
       * 일곱 번째 결제 항목을 정의하는 객체입니다.
       * 이 객체는 시공 잔금에 대한 정보를 관리합니다.
       */
      constructRemain: {
        // 결제 항목의 이름을 지정합니다.
        name: "시공 잔금",

        /**
         * 시공 잔금에 대한 정보를 생성하는 메서드입니다.
         * 
         * @param {Object} client - 고객 정보를 포함하는 객체입니다.
         * @param {Object} designer - 디자이너 정보를 포함하는 객체입니다.
         * @param {Object} project - 프로젝트 정보를 포함하는 객체입니다.
         * @param {string} method - 결제 방법을 나타내는 문자열입니다.
         * @param {Object} [subObj={}] - 추가적인 정보를 포함하는 선택적 객체입니다.
         * @returns {Array} info - 시공 잔금 정보가 포함된 배열입니다.
         */
        info: (client, designer, project, method, subObj = {}) => {
            let info; // 반환할 정보 배열을 선언합니다.
            info = []; // 정보 배열을 초기화합니다.

            // 고객의 첫 번째 요청에 대한 공간 주소를 배열에 추가합니다.
            info.push({ address: client.requests[0].request.space.address.value });

            // 고객의 첫 번째 요청에 대한 평수를 배열에 추가합니다.
            info.push({ pyeong: client.requests[0].request.space.pyeong.value });

            // 구성된 정보 배열을 반환합니다.
            return info;
        },

        /**
         * 시공 잔금 항목을 생성하는 메서드입니다.
         * 
         * @param {Object} amountObject - 금액 정보를 포함하는 객체입니다.
         * @param {Object} subObj - 추가적인 정보를 포함하는 객체입니다.
         * @returns {Array} - 시공 잔금 항목이 포함된 배열입니다.
         */
        item: (amountObject, subObj) => {
            // "constructTimeRemain"과 전달된 잔금액을 포함하는 배열을 반환합니다.
            return [
                ["constructTimeRemain", amountObject.remain]
            ];
        },

        /**
         * 시공 잔금의 대상이 되는 고객 정보를 생성하는 메서드입니다.
         * 
         * @param {Object} client - 고객 정보를 포함하는 객체입니다.
         * @param {Object} designer - 디자이너 정보를 포함하는 객체입니다.
         * @param {Object} project - 프로젝트 정보를 포함하는 객체입니다.
         * @param {string} method - 결제 방법을 나타내는 문자열입니다.
         * @param {Object} [subObj={}] - 추가적인 정보를 포함하는 선택적 객체입니다.
         * @returns {Object} - 고객의 ID, 이름, 전화번호, 이메일이 포함된 객체입니다.
         */
        target: (client, designer, project, method, subObj = {}) => {
            // 고객의 ID, 이름, 전화번호, 이메일 정보를 포함하는 객체를 반환합니다.
            return {
                id: client.cliid,
                name: client.name,
                phone: client.phone,
                email: client.email,
            };
        },

        // 시공 잔금에 대한 추가적인 설명을 포함하는 배열입니다.
        comments: [
            "잔금은 공사가 마무리된 후, 내시는 금액입니다. 전체 시공 금액에 포함됩니다.", // 잔금이 공사가 마무리된 후 내는 금액이며, 전체 시공 금액에 포함된다는 설명입니다.
            "잔금을 내시면 공사가 마무리되고, 홈스타일링 과정상 시공 다음 단계가 진행됩니다.", // 잔금을 낸 후 공사가 마무리되고, 시공의 다음 단계가 진행된다는 설명입니다.
        ]
      },
    },
    responses: {
      /**
       * 첫 번째 정산 항목을 정의하는 객체입니다.
       * 이 객체는 홈리에종 선금 정산에 대한 정보를 관리합니다.
       */
      firstDesignFee: {
        // 정산 항목의 이름을 지정합니다.
        name: "홈리에종 선금 정산",

        /**
         * 선금 정산에 대한 정보를 생성하는 메서드입니다.
         * 
         * @param {Object} client - 고객 정보를 포함하는 객체입니다.
         * @param {Object} designer - 디자이너 정보를 포함하는 객체입니다.
         * @param {Object} project - 프로젝트 정보를 포함하는 객체입니다.
         * @param {string} method - 결제 방법을 나타내는 문자열입니다.
         * @param {Object} [subObj={}] - 추가적인 정보를 포함하는 선택적 객체입니다.
         * @returns {Array} info - 선금 정산 정보가 포함된 배열입니다.
         */
        info: (client, designer, project, method, subObj = {}) => {
            let info; // 반환할 정보 배열을 선언합니다.
            info = []; // 정보 배열을 초기화합니다.

            // 고객의 첫 번째 요청에 대한 공간 주소를 배열에 추가합니다.
            info.push({ address: client.requests[0].request.space.address.value });

            // 고객의 첫 번째 요청에 대한 평수를 배열에 추가합니다.
            info.push({ pyeong: client.requests[0].request.space.pyeong.value });

            // 결제 방법을 배열에 추가합니다.
            info.push({ method });

            // 디자이너의 ID를 배열에 추가합니다.
            info.push({ desid: designer.desid });

            // 구성된 정보 배열을 반환합니다.
            return info;
        },

        /**
         * 선금 정산 항목을 생성하는 메서드입니다.
         * 
         * @param {Object} feeObject - 요금 정보를 포함하는 객체입니다.
         * @param {Object} subObj - 추가적인 정보를 포함하는 객체입니다.
         * @returns {Array} - 선금 정산 항목이 포함된 배열입니다.
         */
        item: (feeObject, subObj) => {
            // subObj에서 프로젝트 정보를 추출합니다.
            let { project } = subObj;
            let finalNumber; // 계산된 정산 금액을 저장할 변수를 선언합니다.

            // 남은 금액이 0이 아니라면, 그 금액을 최종 금액으로 설정합니다.
            if (project.process.contract.remain.calculation.amount.supply !== 0) {
                finalNumber = project.process.contract.remain.calculation.amount.supply;
            } else {
                // 그렇지 않다면, feeObject에서 제공된 금액을 최종 금액으로 설정합니다.
                finalNumber = feeObject.amount;
            }

            // "designerFeeFirst"와 계산된 최종 금액을 포함하는 배열을 반환합니다.
            return [
                ["designerFeeFirst", finalNumber]
            ];
        },

        /**
         * 선금 정산의 대상이 되는 디자이너 정보를 생성하는 메서드입니다.
         * 
         * @param {Object} client - 고객 정보를 포함하는 객체입니다.
         * @param {Object} designer - 디자이너 정보를 포함하는 객체입니다.
         * @param {Object} project - 프로젝트 정보를 포함하는 객체입니다.
         * @param {string} method - 결제 방법을 나타내는 문자열입니다.
         * @param {Object} [subObj={}] - 추가적인 정보를 포함하는 선택적 객체입니다.
         * @returns {Object} - 디자이너의 ID, 이름, 전화번호, 이메일이 포함된 객체입니다.
         */
        target: (client, designer, project, method, subObj = {}) => {
            // 디자이너의 ID, 이름, 전화번호, 이메일 정보를 포함하는 객체를 반환합니다.
            return {
                id: designer.desid,
                name: designer.designer,
                phone: designer.information.phone,
                email: designer.information.email,
            };
        },

        // 선금 정산에 대한 추가적인 설명을 포함하는 배열입니다.
        comments: [
            "홈리에종 선금 정산은 디자이너님께 드리는 총 정산 비용의 50%입니다.", // 선금 정산이 총 정산 비용의 50%임을 설명합니다.
            "프로젝트가 모두 완료되고 고객님의 컨펌이 있은 후, 잔금 정산이 될 예정입니다.", // 프로젝트 완료 후 고객 확인 후 잔금 정산이 이루어짐을 설명합니다.
            "총 정산 비용은 전체 디자인비에서 해당 디자이너님의 수수료 비율을 제한 금액입니다.", // 총 정산 비용이 디자인비에서 디자이너 수수료를 제한 금액임을 설명합니다.
            "해당 디자이너님의 사업자 유형에 따라 정산의 방식이 다를 수 있습니다.", // 디자이너의 사업자 유형에 따라 정산 방식이 다를 수 있음을 설명합니다.
        ]
      },
      /**
       * 두 번째 정산 항목을 정의하는 객체입니다.
       * 이 객체는 홈리에종 잔금 정산에 대한 정보를 관리합니다.
       */
      secondDesignFee: {
        // 정산 항목의 이름을 지정합니다.
        name: "홈리에종 잔금 정산",

        /**
         * 잔금 정산에 대한 정보를 생성하는 메서드입니다.
         * 
         * @param {Object} client - 고객 정보를 포함하는 객체입니다.
         * @param {Object} designer - 디자이너 정보를 포함하는 객체입니다.
         * @param {Object} project - 프로젝트 정보를 포함하는 객체입니다.
         * @param {string} method - 결제 방법을 나타내는 문자열입니다.
         * @param {Object} [subObj={}] - 추가적인 정보를 포함하는 선택적 객체입니다.
         * @returns {Array} info - 잔금 정산 정보가 포함된 배열입니다.
         */
        info: (client, designer, project, method, subObj = {}) => {
            let info; // 반환할 정보 배열을 선언합니다.
            info = []; // 정보 배열을 초기화합니다.

            // 고객의 첫 번째 요청에 대한 공간 주소를 배열에 추가합니다.
            info.push({ address: client.requests[0].request.space.address.value });

            // 고객의 첫 번째 요청에 대한 평수를 배열에 추가합니다.
            info.push({ pyeong: client.requests[0].request.space.pyeong.value });

            // 결제 방법을 배열에 추가합니다.
            info.push({ method });

            // 디자이너의 ID를 배열에 추가합니다.
            info.push({ desid: designer.desid });

            // 구성된 정보 배열을 반환합니다.
            return info;
        },

        /**
         * 잔금 정산 항목을 생성하는 메서드입니다.
         * 
         * @param {Object} feeObject - 요금 정보를 포함하는 객체입니다.
         * @param {Object} subObj - 추가적인 정보를 포함하는 객체입니다.
         * @returns {Array} - 잔금 정산 항목이 포함된 배열입니다.
         */
        item: (feeObject, subObj) => {
            // subObj에서 프로젝트 정보를 추출합니다.
            let { project } = subObj;
            let finalNumber; // 계산된 정산 금액을 저장할 변수를 선언합니다.

            // 남은 금액이 0이 아니라면, 그 금액을 최종 금액으로 설정합니다.
            if (project.process.contract.remain.calculation.amount.supply !== 0) {
                finalNumber = project.process.contract.remain.calculation.amount.supply;
            } else {
                // 그렇지 않다면, feeObject에서 제공된 금액을 최종 금액으로 설정합니다.
                finalNumber = feeObject.amount;
            }

            // "designerFeeRemain"과 계산된 최종 금액을 포함하는 배열을 반환합니다.
            return [
                ["designerFeeRemain", finalNumber]
            ];
        },

        /**
         * 잔금 정산의 대상이 되는 디자이너 정보를 생성하는 메서드입니다.
         * 
         * @param {Object} client - 고객 정보를 포함하는 객체입니다.
         * @param {Object} designer - 디자이너 정보를 포함하는 객체입니다.
         * @param {Object} project - 프로젝트 정보를 포함하는 객체입니다.
         * @param {string} method - 결제 방법을 나타내는 문자열입니다.
         * @param {Object} [subObj={}] - 추가적인 정보를 포함하는 선택적 객체입니다.
         * @returns {Object} - 디자이너의 ID, 이름, 전화번호, 이메일이 포함된 객체입니다.
         */
        target: (client, designer, project, method, subObj = {}) => {
            // 디자이너의 ID, 이름, 전화번호, 이메일 정보를 포함하는 객체를 반환합니다.
            return {
                id: designer.desid,
                name: designer.designer,
                phone: designer.information.phone,
                email: designer.information.email,
            };
        },

        // 잔금 정산에 대한 추가적인 설명을 포함하는 배열입니다.
        comments: [
            "홈리에종 잔금 정산은 디자이너님께 드리는 총 정산 비용의 50%입니다.", // 잔금 정산이 총 정산 비용의 50%임을 설명합니다.
            "프로젝트가 모두 완료되고 고객님의 컨펌이 있은 후, 잔금 정산이 될 예정입니다.", // 프로젝트 완료 후 고객 확인 후 잔금 정산이 이루어짐을 설명합니다.
            "총 정산 비용은 전체 디자인비에서 해당 디자이너님의 수수료 비율을 제한 금액입니다.", // 총 정산 비용이 디자인비에서 디자이너 수수료를 제한 금액임을 설명합니다.
            "해당 디자이너님의 사업자 유형에 따라 정산의 방식이 다를 수 있습니다.", // 디자이너의 사업자 유형에 따라 정산 방식이 다를 수 있음을 설명합니다.
        ]
      },
      /**
       * 세 번째 정산 항목을 정의하는 객체입니다.
       * 이 객체는 디자이너 출장비 정산에 대한 정보를 관리합니다.
       */
      designerTravelFee: {
        // 정산 항목의 이름을 지정합니다.
        name: "출장비 정산",

        /**
         * 출장비 정산에 대한 정보를 생성하는 메서드입니다.
         * 
         * @param {Object} client - 고객 정보를 포함하는 객체입니다.
         * @param {Object} designer - 디자이너 정보를 포함하는 객체입니다.
         * @param {Object} project - 프로젝트 정보를 포함하는 객체입니다.
         * @param {string} method - 결제 방법을 나타내는 문자열입니다.
         * @param {Object} [subObj={}] - 추가적인 정보를 포함하는 선택적 객체입니다.
         * @returns {Array} info - 출장비 정산 정보가 포함된 배열입니다.
         */
        info: (client, designer, project, method, subObj = {}) => {
            let info; // 반환할 정보 배열을 선언합니다.
            let feeObject, distance; // 요금 정보와 거리를 저장할 변수를 선언합니다.

            // 프로젝트 제안서에서 디자이너의 ID와 일치하는 제안을 찾습니다.
            for (let proposal of project.proposal.detail) {
                if (proposal.desid === designer.desid) {
                    // 제안서의 결제 방법이 현재 결제 방법과 일치하는 요금 객체를 찾습니다.
                    for (let obj of proposal.fee) {
                        if (obj.method === method) {
                            feeObject = obj;
                        }
                    }
                }
            }

            // 찾은 요금 객체에서 거리 정보를 추출합니다.
            distance = feeObject.distance;
            info = []; // 정보 배열을 초기화합니다.

            // 고객의 첫 번째 요청에 대한 공간 주소를 배열에 추가합니다.
            info.push({ address: client.requests[0].request.space.address.value });

            // 고객의 첫 번째 요청에 대한 평수를 배열에 추가합니다.
            info.push({ pyeong: client.requests[0].request.space.pyeong.value });

            // 거리 정보를 배열에 추가합니다.
            info.push({ distance: distance.distance });
            info.push({ time: distance.time });
            info.push({ number: distance.number });
            info.push({ limit: distance.limit });

            // 결제 방법과 디자이너 ID를 배열에 추가합니다.
            info.push({ method });
            info.push({ desid: designer.desid });

            // 구성된 정보 배열을 반환합니다.
            return info;
        },

        /**
         * 출장비 정산 항목을 생성하는 메서드입니다.
         * 
         * @param {Object} feeObject - 요금 정보를 포함하는 객체입니다.
         * @param {Object} subObj - 추가적인 정보를 포함하는 객체입니다.
         * @returns {Array} - 출장비 정산 항목이 포함된 배열입니다.
         */
        item: (feeObject, subObj) => {
            // "travelExpenses"와 계산된 출장비를 포함하는 배열을 반환합니다.
            return [
                ["travelExpenses", feeObject.amount]
            ];
        },

        /**
         * 출장비 정산의 대상이 되는 디자이너 정보를 생성하는 메서드입니다.
         * 
         * @param {Object} client - 고객 정보를 포함하는 객체입니다.
         * @param {Object} designer - 디자이너 정보를 포함하는 객체입니다.
         * @param {Object} project - 프로젝트 정보를 포함하는 객체입니다.
         * @param {string} method - 결제 방법을 나타내는 문자열입니다.
         * @param {Object} [subObj={}] - 추가적인 정보를 포함하는 선택적 객체입니다.
         * @returns {Object} - 디자이너의 ID, 이름, 전화번호, 이메일이 포함된 객체입니다.
         */
        target: (client, designer, project, method, subObj = {}) => {
            // 디자이너의 ID, 이름, 전화번호, 이메일 정보를 포함하는 객체를 반환합니다.
            return {
                id: designer.desid,
                name: designer.designer,
                phone: designer.information.phone,
                email: designer.information.email,
            };
        },

        // 출장비 정산에 대한 추가적인 설명을 포함하는 배열입니다.
        comments: [
            // 이 항목에서는 추가적인 설명이 없으므로 빈 배열로 설정되어 있습니다.
        ]
      },
      /**
       * 네 번째 정산 항목을 정의하는 객체입니다.
       * 이 객체는 시공 계약금 정산에 대한 정보를 관리합니다.
       */
      firstConstructFee: {
        // 정산 항목의 이름을 지정합니다.
        name: "시공 계약금 정산",

        /**
         * 시공 계약금에 대한 정보를 생성하는 메서드입니다.
         * 
         * @param {Object} client - 고객 정보를 포함하는 객체입니다.
         * @param {Object} designer - 디자이너 정보를 포함하는 객체입니다.
         * @param {Object} project - 프로젝트 정보를 포함하는 객체입니다.
         * @param {string} method - 결제 방법을 나타내는 문자열입니다.
         * @param {Object} [subObj={}] - 추가적인 정보를 포함하는 선택적 객체입니다.
         * @returns {Array} info - 시공 계약금 정보가 포함된 배열입니다.
         */
        info: (client, designer, project, method, subObj = {}) => {
            let info; // 반환할 정보 배열을 선언합니다.
            info = []; // 정보 배열을 초기화합니다.

            // 고객의 첫 번째 요청에 대한 공간 주소를 배열에 추가합니다.
            info.push({ address: client.requests[0].request.space.address.value });

            // 고객의 첫 번째 요청에 대한 평수를 배열에 추가합니다.
            info.push({ pyeong: client.requests[0].request.space.pyeong.value });

            // 구성된 정보 배열을 반환합니다.
            return info;
        },

        /**
         * 시공 계약금 정산 항목을 생성하는 메서드입니다.
         * 
         * @param {Object} amountObject - 금액 정보를 포함하는 객체입니다.
         * @param {Object} subObj - 추가적인 정보를 포함하는 객체입니다.
         * @returns {Array} - 시공 계약금 정산 항목이 포함된 배열입니다.
         */
        item: (amountObject, subObj) => {
            // "constructExpenses"와 전달된 계약금액을 포함하는 배열을 반환합니다.
            return [
                ["constructExpenses", amountObject.first]
            ];
        },

        /**
         * 시공 계약금 정산의 대상이 되는 시공사 정보를 생성하는 메서드입니다.
         * 
         * @param {Object} client - 고객 정보를 포함하는 객체입니다.
         * @param {Object} designer - 디자이너 정보를 포함하는 객체입니다.
         * @param {Object} project - 프로젝트 정보를 포함하는 객체입니다.
         * @param {string} method - 결제 방법을 나타내는 문자열입니다.
         * @param {Object} subObj - 추가적인 정보를 포함하는 객체입니다.
         * @returns {Object} - 시공사의 ID, 이름, 전화번호, 이메일이 포함된 객체입니다.
         */
        target: (client, designer, project, method, subObj) => {
            const { builder } = subObj; // subObj에서 시공사 정보를 추출합니다.
            // 시공사의 ID, 이름, 전화번호, 이메일 정보를 포함하는 객체를 반환합니다.
            return {
                id: builder.buiid,
                name: builder.builder,
                phone: builder.information.phone,
                email: builder.information.email,
            };
        },

        // 시공 계약금 정산에 대한 추가적인 설명을 포함하는 배열입니다.
        comments: [
            // 이 항목에서는 추가적인 설명이 없으므로 빈 배열로 설정되어 있습니다.
        ]
      },
      /**
       * 다섯 번째 정산 항목을 정의하는 객체입니다.
       * 이 객체는 시공 착수금 정산에 대한 정보를 관리합니다.
       */
      startConstructFee: {
        // 정산 항목의 이름을 지정합니다.
        name: "시공 착수금 정산",

        /**
         * 시공 착수금에 대한 정보를 생성하는 메서드입니다.
         * 
         * @param {Object} client - 고객 정보를 포함하는 객체입니다.
         * @param {Object} designer - 디자이너 정보를 포함하는 객체입니다.
         * @param {Object} project - 프로젝트 정보를 포함하는 객체입니다.
         * @param {string} method - 결제 방법을 나타내는 문자열입니다.
         * @param {Object} [subObj={}] - 추가적인 정보를 포함하는 선택적 객체입니다.
         * @returns {Array} info - 시공 착수금 정보가 포함된 배열입니다.
         */
        info: (client, designer, project, method, subObj = {}) => {
            let info; // 반환할 정보 배열을 선언합니다.
            info = []; // 정보 배열을 초기화합니다.

            // 고객의 첫 번째 요청에 대한 공간 주소를 배열에 추가합니다.
            info.push({ address: client.requests[0].request.space.address.value });

            // 고객의 첫 번째 요청에 대한 평수를 배열에 추가합니다.
            info.push({ pyeong: client.requests[0].request.space.pyeong.value });

            // 구성된 정보 배열을 반환합니다.
            return info;
        },

        /**
         * 시공 착수금 정산 항목을 생성하는 메서드입니다.
         * 
         * @param {Object} amountObject - 금액 정보를 포함하는 객체입니다.
         * @param {Object} subObj - 추가적인 정보를 포함하는 객체입니다.
         * @returns {Array} - 시공 착수금 정산 항목이 포함된 배열입니다.
         */
        item: (amountObject, subObj) => {
            // "constructExpenses"와 전달된 착수금액을 포함하는 배열을 반환합니다.
            return [
                ["constructExpenses", amountObject.start]
            ];
        },

        /**
         * 시공 착수금 정산의 대상이 되는 시공사 정보를 생성하는 메서드입니다.
         * 
         * @param {Object} client - 고객 정보를 포함하는 객체입니다.
         * @param {Object} designer - 디자이너 정보를 포함하는 객체입니다.
         * @param {Object} project - 프로젝트 정보를 포함하는 객체입니다.
         * @param {string} method - 결제 방법을 나타내는 문자열입니다.
         * @param {Object} subObj - 추가적인 정보를 포함하는 객체입니다.
         * @returns {Object} - 시공사의 ID, 이름, 전화번호, 이메일이 포함된 객체입니다.
         */
        target: (client, designer, project, method, subObj) => {
            const { builder } = subObj; // subObj에서 시공사 정보를 추출합니다.
            // 시공사의 ID, 이름, 전화번호, 이메일 정보를 포함하는 객체를 반환합니다.
            return {
                id: builder.buiid,
                name: builder.builder,
                phone: builder.information.phone,
                email: builder.information.email,
            };
        },

        // 시공 착수금 정산에 대한 추가적인 설명을 포함하는 배열입니다.
        comments: [
            // 이 항목에서는 추가적인 설명이 없으므로 빈 배열로 설정되어 있습니다.
        ]
      },
      /**
       * 여섯 번째 정산 항목을 정의하는 객체입니다.
       * 이 객체는 시공 중도금 정산에 대한 정보를 관리합니다.
       */
      middleConstructFee: {
        // 정산 항목의 이름을 지정합니다.
        name: "시공 중도금 정산",

        /**
         * 시공 중도금에 대한 정보를 생성하는 메서드입니다.
         * 
         * @param {Object} client - 고객 정보를 포함하는 객체입니다.
         * @param {Object} designer - 디자이너 정보를 포함하는 객체입니다.
         * @param {Object} project - 프로젝트 정보를 포함하는 객체입니다.
         * @param {string} method - 결제 방법을 나타내는 문자열입니다.
         * @param {Object} [subObj={}] - 추가적인 정보를 포함하는 선택적 객체입니다.
         * @returns {Array} info - 시공 중도금 정보가 포함된 배열입니다.
         */
        info: (client, designer, project, method, subObj = {}) => {
            let info; // 반환할 정보 배열을 선언합니다.
            info = []; // 정보 배열을 초기화합니다.

            // 고객의 첫 번째 요청에 대한 공간 주소를 배열에 추가합니다.
            info.push({ address: client.requests[0].request.space.address.value });

            // 고객의 첫 번째 요청에 대한 평수를 배열에 추가합니다.
            info.push({ pyeong: client.requests[0].request.space.pyeong.value });

            // 구성된 정보 배열을 반환합니다.
            return info;
        },

        /**
         * 시공 중도금 정산 항목을 생성하는 메서드입니다.
         * 
         * @param {Object} amountObject - 금액 정보를 포함하는 객체입니다.
         * @param {Object} subObj - 추가적인 정보를 포함하는 객체입니다.
         * @returns {Array} - 시공 중도금 정산 항목이 포함된 배열입니다.
         */
        item: (amountObject, subObj) => {
            // "constructExpenses"와 전달된 중도금액을 포함하는 배열을 반환합니다.
            return [
                ["constructExpenses", amountObject.middle]
            ];
        },

        /**
         * 시공 중도금 정산의 대상이 되는 시공사 정보를 생성하는 메서드입니다.
         * 
         * @param {Object} client - 고객 정보를 포함하는 객체입니다.
         * @param {Object} designer - 디자이너 정보를 포함하는 객체입니다.
         * @param {Object} project - 프로젝트 정보를 포함하는 객체입니다.
         * @param {string} method - 결제 방법을 나타내는 문자열입니다.
         * @param {Object} subObj - 추가적인 정보를 포함하는 객체입니다.
         * @returns {Object} - 시공사의 ID, 이름, 전화번호, 이메일이 포함된 객체입니다.
         */
        target: (client, designer, project, method, subObj) => {
            const { builder } = subObj; // subObj에서 시공사 정보를 추출합니다.
            // 시공사의 ID, 이름, 전화번호, 이메일 정보를 포함하는 객체를 반환합니다.
            return {
                id: builder.buiid,
                name: builder.builder,
                phone: builder.information.phone,
                email: builder.information.email,
            };
        },

        // 시공 중도금 정산에 대한 추가적인 설명을 포함하는 배열입니다.
        comments: [
            // 이 항목에서는 추가적인 설명이 없으므로 빈 배열로 설정되어 있습니다.
        ]
      },
      /**
       * 일곱 번째 정산 항목을 정의하는 객체입니다.
       * 이 객체는 시공 잔금 정산에 대한 정보를 관리합니다.
       */
      remainConstructFee: {
        // 정산 항목의 이름을 지정합니다.
        name: "시공 잔금 정산",

        /**
         * 시공 잔금에 대한 정보를 생성하는 메서드입니다.
         * 
         * @param {Object} client - 고객 정보를 포함하는 객체입니다.
         * @param {Object} designer - 디자이너 정보를 포함하는 객체입니다.
         * @param {Object} project - 프로젝트 정보를 포함하는 객체입니다.
         * @param {string} method - 결제 방법을 나타내는 문자열입니다.
         * @param {Object} [subObj={}] - 추가적인 정보를 포함하는 선택적 객체입니다.
         * @returns {Array} info - 시공 잔금 정보가 포함된 배열입니다.
         */
        info: (client, designer, project, method, subObj = {}) => {
            let info; // 반환할 정보 배열을 선언합니다.
            info = []; // 정보 배열을 초기화합니다.

            // 고객의 첫 번째 요청에 대한 공간 주소를 배열에 추가합니다.
            info.push({ address: client.requests[0].request.space.address.value });

            // 고객의 첫 번째 요청에 대한 평수를 배열에 추가합니다.
            info.push({ pyeong: client.requests[0].request.space.pyeong.value });

            // 구성된 정보 배열을 반환합니다.
            return info;
        },

        /**
         * 시공 잔금 정산 항목을 생성하는 메서드입니다.
         * 
         * @param {Object} amountObject - 금액 정보를 포함하는 객체입니다.
         * @param {Object} subObj - 추가적인 정보를 포함하는 객체입니다.
         * @returns {Array} - 시공 잔금 정산 항목이 포함된 배열입니다.
         */
        item: (amountObject, subObj) => {
            // "constructExpenses"와 전달된 잔금액을 포함하는 배열을 반환합니다.
            return [
                ["constructExpenses", amountObject.remain]
            ];
        },

        /**
         * 시공 잔금 정산의 대상이 되는 시공사 정보를 생성하는 메서드입니다.
         * 
         * @param {Object} client - 고객 정보를 포함하는 객체입니다.
         * @param {Object} designer - 디자이너 정보를 포함하는 객체입니다.
         * @param {Object} project - 프로젝트 정보를 포함하는 객체입니다.
         * @param {string} method - 결제 방법을 나타내는 문자열입니다.
         * @param {Object} subObj - 추가적인 정보를 포함하는 객체입니다.
         * @returns {Object} - 시공사의 ID, 이름, 전화번호, 이메일이 포함된 객체입니다.
         */
        target: (client, designer, project, method, subObj) => {
            const { builder } = subObj; // subObj에서 시공사 정보를 추출합니다.
            // 시공사의 ID, 이름, 전화번호, 이메일 정보를 포함하는 객체를 반환합니다.
            return {
                id: builder.buiid,
                name: builder.builder,
                phone: builder.information.phone,
                email: builder.information.email,
            };
        },

        // 시공 잔금 정산에 대한 추가적인 설명을 포함하는 배열입니다.
        comments: [
            // 이 항목에서는 추가적인 설명이 없으므로 빈 배열로 설정되어 있습니다.
        ]
      },
      /**
       * 여덟 번째 정산 항목을 정의하는 객체입니다.
       * 이 객체는 홈리에종 시공 정산에 대한 정보를 관리합니다.
       */
      generalConstructFee: {
        // 정산 항목의 이름을 지정합니다.
        name: "홈리에종 시공 정산",

        /**
         * 홈리에종 시공 정산에 대한 정보를 생성하는 메서드입니다.
         * 
         * @param {Object} client - 고객 정보를 포함하는 객체입니다.
         * @param {Object} designer - 디자이너 정보를 포함하는 객체입니다.
         * @param {Object} project - 프로젝트 정보를 포함하는 객체입니다.
         * @param {string} method - 결제 방법을 나타내는 문자열입니다.
         * @param {Object} [subObj={}] - 추가적인 정보를 포함하는 선택적 객체입니다.
         * @returns {Array} info - 홈리에종 시공 정산 정보가 포함된 배열입니다.
         */
        info: (client, designer, project, method, subObj = {}) => {
            let info; // 반환할 정보 배열을 선언합니다.
            info = []; // 정보 배열을 초기화합니다.

            // 고객의 첫 번째 요청에 대한 공간 주소를 배열에 추가합니다.
            info.push({ address: client.requests[0].request.space.address.value });

            // 고객의 첫 번째 요청에 대한 평수를 배열에 추가합니다.
            info.push({ pyeong: client.requests[0].request.space.pyeong.value });

            // 구성된 정보 배열을 반환합니다.
            return info;
        },

        /**
         * 홈리에종 시공 정산 항목을 생성하는 메서드입니다.
         * 
         * @param {Object} amountObject - 금액 정보를 포함하는 객체입니다.
         * @param {Object} subObj - 추가적인 정보를 포함하는 객체입니다.
         * @returns {Array} - 홈리에종 시공 정산 항목이 포함된 배열입니다.
         */
        item: (amountObject, subObj) => {
            // "generalExpenses"와 전달된 정산 금액을 포함하는 배열을 반환합니다.
            return [
                ["generalExpenses", amountObject.amount]
            ];
        },

        /**
         * 홈리에종 시공 정산의 대상이 되는 정보를 생성하는 메서드입니다.
         * 
         * @param {Object} client - 고객 정보를 포함하는 객체입니다.
         * @param {Object} designer - 디자이너 정보를 포함하는 객체입니다.
         * @param {Object} project - 프로젝트 정보를 포함하는 객체입니다.
         * @param {string} method - 결제 방법을 나타내는 문자열입니다.
         * @param {Object} subObj - 추가적인 정보를 포함하는 객체입니다.
         * @returns {Object} - 이름, 전화번호, 이메일이 포함된 객체입니다.
         */
        target: (client, designer, project, method, subObj) => {
            let name; // 대상의 이름을 저장할 변수를 선언합니다.
            if (subObj === null) {
                name = ""; // subObj가 null이면 이름을 빈 문자열로 설정합니다.
            } else {
                name = subObj.name; // 그렇지 않으면 subObj에서 이름을 가져옵니다.
            }
            // 이름, 전화번호, 이메일 정보를 포함하는 객체를 반환합니다.
            return {
                id: "",
                name,
                phone: "",
                email: "",
            };
        },

        // 홈리에종 시공 정산에 대한 추가적인 설명을 포함하는 배열입니다.
        comments: [
            // 이 항목에서는 추가적인 설명이 없으므로 빈 배열로 설정되어 있습니다.
        ]
      },
    },
    goods: {
      /**
       * 디자이너 작업 시간을 나타내는 상품입니다.
       * 이 항목은 디자이너가 인테리어 디자인 작업을 진행하는 비용을 관리합니다.
       */
      designerTime: {
          id: "_idte", // 상품의 고유 ID를 지정합니다.
          name: "디자인비", // 상품의 이름을 지정합니다.
          description: "디자이너가 인테리어 디자인 작업을 진행하는 비용입니다.", // 상품에 대한 설명을 제공합니다.
          ea: null, // 개수 단위를 null로 설정합니다.
          
          /**
           * 디자이너 작업 시간의 개수를 계산하는 메서드입니다.
           * @param {string} method - 결제 방법을 나타내는 문자열입니다.
           * @param {Object} distance - 거리 정보를 포함하는 객체입니다.
           * @param {Object} subObj - 추가적인 정보를 포함하는 객체입니다.
           * @returns {number} - 작업 시간의 개수를 반환합니다.
           */
          number: (method, distance, subObj) => { return 1; },
          
          /**
           * 디자이너 작업 시간의 금액을 계산하는 메서드입니다.
           * @param {string} method - 결제 방법을 나타내는 문자열입니다.
           * @param {number} amount - 금액을 나타내는 숫자입니다.
           * @param {Object} distance - 거리 정보를 포함하는 객체입니다.
           * @param {Object} subObj - 추가적인 정보를 포함하는 객체입니다.
           * @returns {number} - 계산된 금액을 반환합니다.
           */
          amount: (method, amount, distance, subObj) => { return amount; },
          comments: [] // 추가적인 설명이 없으므로 빈 배열로 설정합니다.
      },
  
      /**
       * 출장비를 나타내는 상품입니다.
       * 이 항목은 디자이너가 출장 시 발생하는 왕복 비용을 관리합니다.
       */
      travelExpenses: {
          id: "_ites", // 상품의 고유 ID를 지정합니다.
          name: "출장비", // 상품의 이름을 지정합니다.
          description: "디자이너가 출장 시 발생되는 왕복 비용입니다.", // 상품에 대한 설명을 제공합니다.
          ea: "회", // 개수 단위를 "회"로 설정합니다.
          
          /**
           * 출장비의 개수를 계산하는 메서드입니다.
           * @param {string} method - 결제 방법을 나타내는 문자열입니다.
           * @param {Object} distance - 거리 정보를 포함하는 객체입니다.
           * @param {Object} subObj - 추가적인 정보를 포함하는 객체입니다.
           * @returns {number} - 출장비의 개수를 반환합니다.
           */
          number: (method, distance, subObj) => { return distance.number; },
          
          /**
           * 출장비의 금액을 계산하는 메서드입니다.
           * @param {string} method - 결제 방법을 나타내는 문자열입니다.
           * @param {number} amount - 금액을 나타내는 숫자입니다.
           * @param {Object} distance - 거리 정보를 포함하는 객체입니다.
           * @param {Object} subObj - 추가적인 정보를 포함하는 객체입니다.
           * @returns {number} - 계산된 금액을 반환합니다.
           */
          amount: (method, amount, distance, subObj) => { return distance.amount; },
  
          // 출장비에 대한 추가적인 설명을 포함하는 배열입니다.
          comments: [
              "출장비는 디자이너가 고객님의 집까지 이동하는 데에 발생하는 비용입니다.", // 출장비의 기본 개념을 설명합니다.
              "출장비는 도달 거리와 시간을 측정하여 계산되며, 왕복 비용으로 청구됩니다.", // 출장비의 계산 방법을 설명합니다.
              "출장비는 대중 교통이 아닌 차량의 이동 거리 및 시간으로 측정됩니다.", // 출장비 계산 시 고려 사항을 설명합니다.
              "출장비에는 디자이너의 미팅 시간이 감안된 디자인 인건비가 함께 포함되어 있습니다.", // 출장비에 포함된 항목을 설명합니다.
          ]
      },
  
      /**
       * 시공 계약금을 나타내는 상품입니다.
       * 이 항목은 견적에 따른 인테리어 공사를 진행하는 비용 중 계약금을 관리합니다.
       */
      constructTimeFirst: {
          id: "_ictf", // 상품의 고유 ID를 지정합니다.
          name: "시공 계약금", // 상품의 이름을 지정합니다.
          description: "견적에 따른 인테리어 공사를 진행하는 비용 중 계약금입니다.", // 상품에 대한 설명을 제공합니다.
          ea: null, // 개수 단위를 null로 설정합니다.
          
          /**
           * 시공 계약금의 개수를 계산하는 메서드입니다.
           * @param {Object} subObj - 추가적인 정보를 포함하는 객체입니다.
           * @returns {number} - 계약금의 개수를 반환합니다.
           */
          number: (subObj) => { return 1; },
          
          /**
           * 시공 계약금의 금액을 계산하는 메서드입니다.
           * @param {number} amount - 금액을 나타내는 숫자입니다.
           * @param {Object} subObj - 추가적인 정보를 포함하는 객체입니다.
           * @returns {number} - 계산된 금액을 반환합니다.
           */
          amount: (amount, subObj) => { return amount; },
          comments: [] // 추가적인 설명이 없으므로 빈 배열로 설정합니다.
      },
  
      /**
       * 시공 착수금을 나타내는 상품입니다.
       * 이 항목은 견적에 따른 인테리어 공사를 진행하는 비용 중 착수금을 관리합니다.
       */
      constructTimeStart: {
          id: "_icts", // 상품의 고유 ID를 지정합니다.
          name: "시공 착수금", // 상품의 이름을 지정합니다.
          description: "견적에 따른 인테리어 공사를 진행하는 비용 중 착수금입니다.", // 상품에 대한 설명을 제공합니다.
          ea: null, // 개수 단위를 null로 설정합니다.
          
          /**
           * 시공 착수금의 개수를 계산하는 메서드입니다.
           * @param {Object} subObj - 추가적인 정보를 포함하는 객체입니다.
           * @returns {number} - 착수금의 개수를 반환합니다.
           */
          number: (subObj) => { return 1; },
          
          /**
           * 시공 착수금의 금액을 계산하는 메서드입니다.
           * @param {number} amount - 금액을 나타내는 숫자입니다.
           * @param {Object} subObj - 추가적인 정보를 포함하는 객체입니다.
           * @returns {number} - 계산된 금액을 반환합니다.
           */
          amount: (amount, subObj) => { return amount; },
          comments: [] // 추가적인 설명이 없으므로 빈 배열로 설정합니다.
      },
  
      /**
       * 시공 중도금을 나타내는 상품입니다.
       * 이 항목은 견적에 따른 인테리어 공사를 진행하는 비용 중 중도금을 관리합니다.
       */
      constructTimeMiddle: {
          id: "_ictm", // 상품의 고유 ID를 지정합니다.
          name: "시공 중도금", // 상품의 이름을 지정합니다.
          description: "견적에 따른 인테리어 공사를 진행하는 비용 중 중도금입니다.", // 상품에 대한 설명을 제공합니다.
          ea: null, // 개수 단위를 null로 설정합니다.
          
          /**
           * 시공 중도금의 개수를 계산하는 메서드입니다.
           * @param {Object} subObj - 추가적인 정보를 포함하는 객체입니다.
           * @returns {number} - 중도금의 개수를 반환합니다.
           */
          number: (subObj) => { return 1; },
          
          /**
           * 시공 중도금의 금액을 계산하는 메서드입니다.
           * @param {number} amount - 금액을 나타내는 숫자입니다.
           * @param {Object} subObj - 추가적인 정보를 포함하는 객체입니다.
           * @returns {number} - 계산된 금액을 반환합니다.
           */
          amount: (amount, subObj) => { return amount; },
          comments: [] // 추가적인 설명이 없으므로 빈 배열로 설정합니다.
      },
  
      /**
       * 시공 잔금을 나타내는 상품입니다.
       * 이 항목은 견적에 따른 인테리어 공사를 진행하는 비용 중 잔금을 관리합니다.
       */
      constructTimeRemain: {
          id: "_ictr", // 상품의 고유 ID를 지정합니다.
          name: "시공 잔금", // 상품의 이름을 지정합니다.
          description: "견적에 따른 인테리어 공사를 진행하는 비용 중 잔금입니다.", // 상품에 대한 설명을 제공합니다.
          ea: null, // 개수 단위를 null로 설정합니다.
          
          /**
           * 시공 잔금의 개수를 계산하는 메서드입니다.
           * @param {Object} subObj - 추가적인 정보를 포함하는 객체입니다.
           * @returns {number} - 잔금의 개수를 반환합니다.
           */
          number: (subObj) => { return 1; },
          
          /**
           * 시공 잔금의 금액을 계산하는 메서드입니다.
           * @param {number} amount - 금액을 나타내는 숫자입니다.
           * @param {Object} subObj - 추가적인 정보를 포함하는 객체입니다.
           * @returns {number} - 계산된 금액을 반환합니다.
           */
          amount: (amount, subObj) => { return amount; },
          comments: [] // 추가적인 설명이 없으므로 빈 배열로 설정합니다.
      },
    },
    calculation: {
      designerFeeFirst: {
        id: "_edff",
        name: "디자인비 선금",
        description: "디자인 비용에 대한 선금입니다.",
        ea: null,
        number: (method, distance, subObj) => { return 1; },
        amount: (method, amount, distance, subObj) => {
          const { client, designer, freeRatio } = subObj;
          let classification, percentage, calculate, commission;
          classification = designer.information.business.businessInfo.classification;
          percentage = designer.information.business.service.cost.percentage;
          [ calculate, commission ] = BillMaker.designerCalculation(amount, classification, percentage, client, { toArray: true });
          return { amount: Math.floor((calculate / 2) / 10) * 10, commission: Math.floor((commission / 2) / 10) * 10 };
        },
        comments: []
      },
      designerFeeRemain: {
        id: "_edfr",
        name: "디자인비 잔금",
        description: "디자인 비용에 대한 잔금입니다.",
        ea: null,
        number: (method, distance, subObj = {}) => { return 1; },
        amount: (method, amount, distance, subObj) => {
          const { client, designer, freeRatio } = subObj;
          let classification, percentage, calculate, commission;
          classification = designer.information.business.businessInfo.classification;
          percentage = designer.information.business.service.cost.percentage;
          [ calculate, commission ] = BillMaker.designerCalculation(amount, classification, percentage, client, { toArray: true });
          return { amount: Math.floor((calculate / 2) / 10) * 10, commission: Math.floor((commission / 2) / 10) * 10 };
        },
        comments: []
      },
      travelExpenses: {
        id: "_edte",
        name: "디자이너 출장비",
        description: "디자이너가 출장시 발생되는 왕복 비용입니다.",
        ea: "회",
        number: (method, distance, subObj = {}) => { return distance.number; },
        amount: (method, amount, distance, subObj) => {
          const { designer, freeRatio, distancePercentage } = subObj;
          let classification, calculate, commission, distanceFinalAmount;
          if (distance.number !== 0) {
            distanceFinalAmount = distance.amount * distance.number;
            classification = designer.information.business.businessInfo.classification;
            [ calculate, commission ] = BillMaker.designerCalculation(distanceFinalAmount, classification, distancePercentage, null, { toArray: true, forcePercentage: true });
            calculate = Math.floor(calculate / distance.number);
          } else {
            distanceFinalAmount = distance.amount * 1;
            classification = designer.information.business.businessInfo.classification;
            [ calculate, commission ] = BillMaker.designerCalculation(distanceFinalAmount, classification, distancePercentage, null, { toArray: true, forcePercentage: true });
            calculate = Math.floor(calculate / 1);
          }
          return { amount: calculate, commission };
        },
        comments: [
          "출장비는 디자이너님이 고객님의 집까지 이동하는 데에 발생하는 비용입니다.",
          "출장비는 도달 거리와 시간을 측정하여 계산되며, 왕복 비용으로 고객님께 받습니다.",
          "출장비는 대중 교통이 아닌 차량의 이동 거리 및 시간으로 측정됩니다.",
          "출장비에는 디자이너님의 미팅 시간이 감안된 디자인 인건비가 함께 포함되어 있습니다.",
        ]
      },
      constructExpenses: {
        id: "_eces",
        name: "시공 비용",
        description: "시공 비용입니다.",
        ea: null,
        number: (subObj) => { return 1; },
        amount: (amount, subObj) => {
          const { client, designer, freeRatio, builder } = subObj;
          let classification, percentage, calculate, commission;
          classification = builder.information.business.businessInfo.classification;
          percentage = builder.information.business.service.cost.percentage;
          [ calculate, commission ] = BillMaker.designerCalculation(amount, classification, percentage, client, { toArray: true, forcePercentage: true });
          return { amount: Math.floor((calculate / 1) / 10) * 10, commission: Math.floor((commission / 1) / 10) * 10 };
        },
        comments: []
      },
      generalExpenses: {
        id: "_ecgs",
        name: "시공 비용",
        description: "시공 비용입니다.",
        ea: null,
        number: (subObj) => { return 1; },
        amount: (amount, subObj) => {
          return { amount, commission: 0 };
        },
        comments: []
      },
    },
    etc: {
      contractAmount: 150000,
      vatRatio: 0.1,
      freeRatio: 0.967,
      distancePercentage: 7,
      designerCancel: {
        id: "_edcl",
        class: "designerCancel",
        name: "디자이너 1회 미팅 비용",
        description: "취소된 디자이너의 1회 미팅에 대한 비용입니다.",
        unit: {
          ea: null,
          price: 100000,
          number: 1
        },
        amount: {
          pure: 100000,
          commission: 0,
        },
        comments: [
          "디자이너 변경으로 인해 미팅을 하신 프로젝트가 취소되었습니다.",
          "1회 미팅에 대한 금액을 정산해드리는 비용입니다."
        ],
        total: 100000,
      }
    }
  }
};

/**
 * BillMaker 클래스의 정적 메서드인 returnBankCode는 
 * 은행 이름을 입력받아 해당하는 은행 코드 또는 은행 매트릭스를 반환하는 함수입니다.
 * @param {string} name - 은행의 이름을 나타내는 문자열입니다.
 * @param {string} [mode="code"] - 반환 모드를 설정하는 문자열로, "code"일 경우 은행 코드를 반환하고, "matrix"일 경우 은행의 이름과 코드 매트릭스를 반환합니다.
 * @returns {string|Array} 은행 코드 또는 은행 코드 매트릭스를 반환합니다.
 * @throws {Error} 입력이 문자열이 아닌 경우 예외를 발생시킵니다.
 */
BillMaker.returnBankCode = function (name, mode = "code") {
  // 입력된 name이 문자열이 아닌 경우, 예외를 발생시킵니다.
  if (typeof name !== "string") {
      throw new Error("invaild input"); // 잘못된 입력이 발생했음을 알리는 에러 메시지를 출력합니다.
  }

  // 입력된 은행 이름에서 "은행"이라는 단어를 제거하고, 공백을 제거한 후 name에 다시 저장합니다.
  name = name.trim() // 문자열의 앞뒤 공백을 제거합니다.
               .replace(/은행/gi, '').trim() // "은행"이라는 단어를 대소문자 구분 없이 제거합니다.
               .replace(/ /gi, '').trim(); // 남아있는 모든 공백을 제거합니다.

  // 은행 이름과 은행 코드를 매칭시키는 매트릭스를 정의합니다.
  const bankMatrix = [
      [ "농협중앙회", "11" ], // 농협중앙회 은행의 코드
      [ "단위농협", "12" ], // 단위농협 은행의 코드
      [ "축협중앙회", "16" ], // 축협중앙회 은행의 코드
      [ "우리", "20" ], // 우리은행의 코드
      [ "조흥", "21" ], // 조흥은행의 코드
      [ "상업", "22" ], // 상업은행의 코드
      [ "SC제일", "23" ], // SC제일은행의 코드
      [ "한일", "24" ], // 한일은행의 코드
      [ "서울", "25" ], // 서울은행의 코드
      [ "신한", "88" ], // 신한은행의 코드
      [ "구신한", "26" ], // 구신한은행의 코드
      [ "한미", "27" ], // 한미은행의 코드
      [ "대구", "31" ], // 대구은행의 코드
      [ "부산", "32" ], // 부산은행의 코드
      [ "광주", "34" ], // 광주은행의 코드
      [ "제주", "35" ], // 제주은행의 코드
      [ "전북", "37" ], // 전북은행의 코드
      [ "강원", "38" ], // 강원은행의 코드
      [ "경남", "39" ], // 경남은행의 코드
      [ "비씨카드", "41" ], // 비씨카드의 코드
      [ "새마을금고", "45" ], // 새마을금고의 코드
      [ "신협", "48" ], // 신협의 코드
      [ "상호저축", "50" ], // 상호저축은행의 코드
      [ "한국씨티", "53" ], // 한국씨티은행의 코드
      [ "홍콩상하이", "54" ], // 홍콩상하이은행의 코드
      [ "도이치", "55" ], // 도이치은행의 코드
      [ "ABN암로", "56" ], // ABN암로은행의 코드
      [ "JP모건", "57" ], // JP모건의 코드
      [ "미쓰비시도쿄", "59" ], // 미쓰비시도쿄은행의 코드
      [ "BOA", "60" ], // BOA은행의 코드
      [ "산림조합", "64" ], // 산림조합의 코드
      [ "신안상호저축", "70" ], // 신안상호저축은행의 코드
      [ "우체국", "71" ], // 우체국의 코드
      [ "하나", "81" ], // 하나은행의 코드
      [ "평화", "83" ], // 평화은행의 코드
      [ "신세계", "87" ], // 신세계은행의 코드
      [ "케이뱅크", "89" ], // 케이뱅크의 코드
      [ "카카오뱅크", "90" ], // 카카오뱅크의 코드
      [ "네이버포인트", "91" ], // 네이버포인트의 코드
      [ "토스뱅크", "92" ], // 토스뱅크의 코드
      [ "토스머니", "93" ], // 토스머니의 코드
      [ "SSG머니", "94" ], // SSG머니의 코드
      [ "엘포인트", "96" ], // 엘포인트의 코드
      [ "카카오머니", "97" ], // 카카오머니의 코드
      [ "페이코", "98" ], // 페이코의 코드
      [ "한국산업", "02" ], // 한국산업은행의 코드
      [ "기업", "03" ], // 기업은행의 코드
      [ "국민", "04" ], // 국민은행의 코드
      [ "외환", "05" ], // 외환은행의 코드
      [ "주택", "06" ], // 주택은행의 코드
      [ "수협중앙회", "07" ], // 수협중앙회의 코드
      [ "유안타증권", "D1" ], // 유안타증권의 코드
      [ "현대증권", "D2" ], // 현대증권의 코드
      [ "미래에셋증권", "D3" ], // 미래에셋증권의 코드
      [ "한국투자증권", "D4" ], // 한국투자증권의 코드
      [ "우리투자증권", "D5" ], // 우리투자증권의 코드
      [ "하이투자증권", "D6" ], // 하이투자증권의 코드
      [ "HMC투자증권", "D7" ], // HMC투자증권의 코드
      [ "SK증권", "D8" ], // SK증권의 코드
      [ "대신증권", "D9" ], // 대신증권의 코드
      [ "하나대투증권", "DA" ], // 하나대투증권의 코드
      [ "굿모닝신한증권", "DB" ], // 굿모닝신한증권의 코드
      [ "동부증권", "DC" ], // 동부증권의 코드
      [ "유진투자증권", "DD" ], // 유진투자증권의 코드
      [ "메리츠증권", "DE" ], // 메리츠증권의 코드
      [ "신영증권", "DF" ], // 신영증권의 코드
      [ "대우증권", "DG" ], // 대우증권의 코드
      [ "삼성증권", "DH" ], // 삼성증권의 코드
      [ "교보증권", "DI" ], // 교보증권의 코드
      [ "키움증권", "DJ" ], // 키움증권의 코드
      [ "이트레이드", "DK" ], // 이트레이드증권의 코드
      [ "솔로몬증권", "DL" ], // 솔로몬증권의 코드
      [ "한화증권", "DM" ], // 한화증권의 코드
      [ "NH증권", "DN" ], // NH증권의 코드
      [ "부국증권", "DO" ], // 부국증권의 코드
      [ "LIG증권", "DP" ], // LIG증권의 코드
      [ "뱅크월렛", "BW" ] // 뱅크월렛의 코드
  ];

  let result; // 결과를 저장할 변수를 선언합니다.

  // mode가 "code"인 경우, 은행 코드를 반환하기 위한 로직을 실행합니다.
  if (mode === "code") {
      result = "00"; // 기본값으로 "00"을 설정합니다.

      // 은행 이름과 매트릭스에서 일치하는 은행을 찾아 해당 코드를 result에 저장합니다.
      for (let arr of bankMatrix) {
          if (name === arr[0]) { // name과 매트릭스의 은행 이름이 일치하는지 확인합니다.
              result = arr[1]; // 일치할 경우 해당 은행의 코드를 result에 저장합니다.
              break; // 일치하는 은행을 찾았으므로 루프를 종료합니다.
          }
      }

      return result; // 결과로 은행 코드를 반환합니다.
  } else if (mode === "matrix") {
      // mode가 "matrix"인 경우, 전체 은행 매트릭스를 반환합니다.
      return bankMatrix; // 은행 이름과 코드의 매트릭스를 반환합니다.
  }
}

/**
 * BillMaker 클래스의 createBill 메서드는 청구서를 생성하고 MongoDB에 저장하는 비동기 함수입니다.
 * 두 가지 방식으로 사용할 수 있으며, 컬렉션 이름과 업데이트 쿼리를 기반으로 청구서를 생성합니다.
 * @param {string|object} collection - 청구서 컬렉션의 이름이거나 업데이트 쿼리 객체입니다.
 * @param {Array|object} updateQueryArr - 업데이트할 쿼리 배열이거나 옵션 객체입니다.
 * @param {object} [option={ selfMongo: null }] - 추가 옵션 객체로, selfMongo를 통해 기존 MongoDB 연결을 재사용할 수 있습니다.
 * @returns {Promise<string|void>} 생성된 청구서의 ID를 반환하거나, 오류가 발생할 경우 콘솔에 출력합니다.
 * @throws {Error} 입력이 올바르지 않은 경우 예외를 발생시킵니다.
 */
BillMaker.prototype.createBill = async function (collection, updateQueryArr, option = { selfMongo: null }) {
  // 현재 BillMaker 인스턴스를 instance 변수에 할당합니다.
  const instance = this;

  // Mother 클래스에서 mongo와 mongoinfo를 추출합니다.
  // mongo는 MongoDB와 연결을 관리하는 모듈이며, mongoinfo는 연결 정보입니다.
  const { mongo, mongoinfo } = this.mother;

  // collection이 객체이고 updateQueryArr이 객체이며 배열이 아닌 경우,
  // 이 경우는 updateQueryArr이 실제로 옵션 객체로 사용됩니다.
  if (typeof collection === "object" && typeof updateQueryArr === "object" && !Array.isArray(updateQueryArr)) {
      const updateQuery = collection; // collection을 updateQuery로 할당합니다.
      option = updateQueryArr; // updateQueryArr을 option으로 할당합니다.
      collection = "generalBill"; // collection을 기본값으로 "generalBill"로 설정합니다.

      // 해당 컬렉션에 대한 매핑 파일을 불러옵니다.
      const map = require(`${this.mapDir}/${collection}.js`);

      try {
          let MONGOC; // MongoDB 연결 객체를 저장할 변수입니다.
          let selfBoo; // selfMongo 옵션의 존재 여부를 확인하는 불리언 변수입니다.
          let rows; // MongoDB에서 가져온 행 데이터를 저장할 변수입니다.
          let dummy; // 새로운 청구서의 초기 데이터를 저장할 변수입니다.
          let pastId; // 이전 청구서 ID를 저장할 변수입니다.
          let newId; // 생성된 새로운 청구서 ID를 저장할 변수입니다.

          // selfMongo 옵션이 정의되지 않았거나 null인 경우, selfBoo를 false로 설정합니다.
          if (option.selfMongo === undefined || option.selfMongo === null) {
              selfBoo = false;
          } else {
              selfBoo = true; // selfMongo 옵션이 존재하면 selfBoo를 true로 설정합니다.
          }

          // selfBoo가 false인 경우, 새로운 MongoDB 연결을 생성하고 연결합니다.
          if (!selfBoo) {
              MONGOC = new mongo(mongoinfo);
              await MONGOC.connect();
          } else {
              // selfBoo가 true인 경우, 기존 MongoDB 연결을 사용합니다.
              MONGOC = option.selfMongo;
          }

          // 새로운 청구서의 기본 구조를 생성합니다.
          dummy = map.main();

          // 가장 최근의 청구서 ID를 찾기 위해 MongoDB에서 청구서를 조회합니다.
          rows = await MONGOC.db(`miro81`).collection(collection)
              .find({}).sort({ "date": -1 }).limit(1).toArray();

          // 청구서가 없는 경우, 초기 ID를 설정합니다.
          if (rows.length === 0) {
              pastId = "b2111_aa01s";
          } else {
              // 있는 경우, 가장 최근 청구서의 ID를 가져옵니다.
              pastId = rows[0].bilid;
          }

          // 새로운 청구서 ID를 생성합니다.
          dummy.bilid = this.back.idMaker(pastId, false);
          newId = dummy.bilid;

          // 생성한 청구서를 MongoDB에 삽입합니다.
          await MONGOC.db(`miro81`).collection(collection).insertOne(dummy);

          // updateQuery가 null이 아니고, 업데이트할 내용이 있는 경우,
          // 해당 청구서 ID로 데이터를 업데이트합니다.
          if (updateQuery !== null && Object.keys(updateQuery).length > 0) {
              await MONGOC.db(`miro81`).collection(collection)
                  .updateOne({ bilid: newId }, { $set: updateQuery });
          }

          // selfBoo가 false인 경우, MongoDB 연결을 종료합니다.
          if (!selfBoo) {
              await MONGOC.close();
          }

          // 생성된 청구서의 ID를 반환합니다.
          return newId;

      } catch (e) {
          // 오류가 발생한 경우, 콘솔에 오류 메시지를 출력합니다.
          console.log(e);
      }
  } else if (typeof collection === "string" && Array.isArray(updateQueryArr) && typeof option === "object") {
      // collection이 문자열이고 updateQueryArr이 배열이며 option이 객체인 경우,
      // 이 경우에는 일반적인 청구서 생성 절차를 따릅니다.

      // collection이 "generalBill"인 경우, 오류를 발생시킵니다.
      if (collection === "generalBill") {
          throw new Error("generalBill must use no collection name use");
      }

      // updateQueryArr 내의 모든 요소가 객체인지 확인하고, 그렇지 않으면 오류를 발생시킵니다.
      if (!updateQueryArr.every((o) => { return typeof o === "object"; })) {
          throw new Error("input must be String: bill collection, Array: updateQueryArr, Object: option");
      }

      // 해당 컬렉션에 대한 매핑 파일을 불러옵니다.
      const map = require(`${this.mapDir}/${collection}.js`);

      try {
          const { main, alive } = map;

          // main과 alive 함수가 존재하는지 확인하고, 그렇지 않으면 오류를 발생시킵니다.
          if (typeof main !== "function" || typeof alive !== "function") {
              throw new Error("invaild collection model");
          }

          let MONGOC; // MongoDB 연결 객체를 저장할 변수입니다.
          let selfBoo; // selfMongo 옵션의 존재 여부를 확인하는 불리언 변수입니다.
          let tong; // 처리할 청구서 항목을 저장할 변수입니다.
          let rows; // MongoDB에서 가져온 행 데이터를 저장할 변수입니다.

          // selfMongo 옵션이 정의되지 않았거나 null인 경우, selfBoo를 false로 설정합니다.
          if (option.selfMongo === undefined || option.selfMongo === null) {
              selfBoo = false;
          } else {
              selfBoo = true; // selfMongo 옵션이 존재하면 selfBoo를 true로 설정합니다.
          }

          // selfBoo가 false인 경우, 새로운 MongoDB 연결을 생성하고 연결합니다.
          if (!selfBoo) {
              MONGOC = new mongo(mongoinfo);
              await MONGOC.connect();
          } else {
              // selfBoo가 true인 경우, 기존 MongoDB 연결을 사용합니다.
              MONGOC = option.selfMongo;
          }

          // main 함수를 호출하여 청구서 생성에 필요한 데이터를 준비합니다.
          tong = main(alive, updateQueryArr, instance.mother);

          // tong의 각 항목을 순회하며, 청구서를 생성하거나 업데이트합니다.
          for (let { fresh, findQuery, insertEvent } of tong) {
              // findQuery로 MongoDB에서 해당 항목을 찾습니다.
              rows = await MONGOC.db(`miro81`).collection(collection).find(findQuery).toArray();

              // 해당 항목이 존재하지 않는 경우, 새로 삽입합니다.
              if (rows.length === 0) {
                  await insertEvent(fresh);
                  await MONGOC.db(`miro81`).collection(collection).insertOne(fresh);
              } else {
                  // updateMode가 true인 경우, 기존 항목을 삭제하고 새로 삽입합니다.
                  if (option.updateMode === true) {
                      await MONGOC.db(`miro81`).collection(collection).deleteOne(findQuery);
                      await insertEvent(fresh);
                      await MONGOC.db(`miro81`).collection(collection).insertOne(fresh);
                  }
              }
          }

          // selfBoo가 false인 경우, MongoDB 연결을 종료합니다.
          if (!selfBoo) {
              await MONGOC.close();
          }

      } catch (e) {
          // 오류가 발생한 경우, 콘솔에 오류 메시지를 출력합니다.
          console.log(e);
      }
  } else {
      // 입력이 올바르지 않은 경우, 오류를 발생시킵니다.
      throw new Error("input must be String: bill collection, Array: updateQueryArr, Object: option");
  }
}

/**
 * BillMaker 클래스의 readBill 메서드는 MongoDB에서 청구서 데이터를 조회하는 비동기 함수입니다.
 * 컬렉션 이름과 조회 조건을 기반으로 청구서를 검색하여 반환합니다.
 * @param {string} collection - 청구서 컬렉션의 이름입니다.
 * @param {object} whereQuery - 조회할 조건을 포함한 객체입니다.
 * @param {object} [option={ selfMongo: null }] - 추가 옵션 객체로, selfMongo를 통해 기존 MongoDB 연결을 재사용할 수 있으며, 정렬 및 제한 옵션을 포함할 수 있습니다.
 * @returns {Promise<Array|void>} 조회된 청구서의 배열을 반환하거나, 오류가 발생할 경우 콘솔에 출력합니다.
 * @throws {Error} 입력이 올바르지 않은 경우 예외를 발생시킵니다.
 */
BillMaker.prototype.readBill = async function (collection, whereQuery, option = { selfMongo: null }) {
  // 입력된 collection이 문자열이 아니거나, whereQuery 또는 option이 객체가 아닌 경우 오류를 발생시킵니다.
  if (typeof collection !== "string" || typeof whereQuery !== "object" || typeof option !== "object") {
      throw new Error("input must be String: bill collection, Object: whereQuery, Object: option");
  }

  // collection이 BillMaker의 billCollections 배열에 포함되지 않은 경우 오류를 발생시킵니다.
  if (!BillMaker.billCollections.includes(collection)) {
      throw new Error("generalBill must use getBillById or getBillsByQuery");
  }

  // 현재 BillMaker 인스턴스를 instance 변수에 할당합니다.
  const instance = this;

  // Mother 클래스에서 mongo와 mongoinfo를 추출합니다.
  // mongo는 MongoDB와 연결을 관리하는 모듈이며, mongoinfo는 연결 정보입니다.
  const { mongo, mongoinfo } = this.mother;

  // 해당 컬렉션에 대한 매핑 파일을 불러옵니다.
  const map = require(`${this.mapDir}/${collection}.js`);

  try {
      // 매핑 파일에서 alive와 wrap 함수를 추출합니다.
      const { alive, wrap } = map;
      let MONGOC; // MongoDB 연결 객체를 저장할 변수입니다.
      let selfBoo; // selfMongo 옵션의 존재 여부를 확인하는 불리언 변수입니다.
      let rows; // MongoDB에서 가져온 행 데이터를 저장할 변수입니다.
      let sortQuery; // 정렬 조건을 저장할 변수입니다.

      // option.sort가 정의되지 않은 경우, 기본 정렬 조건을 날짜 기준으로 내림차순으로 설정합니다.
      if (option.sort === undefined) {
          sortQuery = { "date": -1 };
      } else {
          // 정의된 경우, option.sort 값을 정렬 조건으로 사용합니다.
          sortQuery = option.sort;
      }

      // selfMongo 옵션이 정의되지 않았거나 null인 경우, selfBoo를 false로 설정합니다.
      if (option.selfMongo === undefined || option.selfMongo === null) {
          selfBoo = false;
      } else {
          // selfMongo 옵션이 존재하면 selfBoo를 true로 설정합니다.
          selfBoo = true;
      }

      // selfBoo가 false인 경우, 새로운 MongoDB 연결을 생성하고 연결합니다.
      if (!selfBoo) {
          MONGOC = new mongo(mongoinfo);
          await MONGOC.connect();
      } else {
          // selfBoo가 true인 경우, 기존 MongoDB 연결을 사용합니다.
          MONGOC = option.selfMongo;
      }

      // option.limit가 정의된 경우, 조회 결과를 제한합니다.
      if (option.limit !== undefined) {
          rows = await MONGOC.db(`miro81`).collection(collection)
              .find(whereQuery).sort(sortQuery).limit(Number(option.limit)).toArray();
      } else {
          // 정의되지 않은 경우, 조회 결과를 제한하지 않고 가져옵니다.
          rows = await MONGOC.db(`miro81`).collection(collection)
              .find(whereQuery).sort(sortQuery).toArray();
      }

      // selfBoo가 false인 경우, MongoDB 연결을 종료합니다.
      if (!selfBoo) {
          await MONGOC.close();
      }

      // wrap 함수를 사용하여 조회된 데이터를 적절한 형식으로 래핑하여 반환합니다.
      return map.wrap(alive, rows, this.mother);

  } catch (e) {
      // 오류가 발생한 경우, 콘솔에 오류 메시지를 출력합니다.
      console.log(e);
  }
}

/**
 * BillMaker 클래스의 returnDummies 메서드는 특정 컬렉션과 주제(subject)에 해당하는 더미 데이터를 반환하는 함수입니다.
 * 이 메서드는 주로 테스트 또는 기본 데이터를 생성하는 데 사용됩니다.
 * @param {string} collection - 데이터를 가져올 MongoDB 컬렉션의 이름입니다.
 * @param {string} subject - 반환할 더미 데이터를 결정하는 주제 또는 키워드입니다.
 * @returns {object} 더미 데이터 객체를 반환합니다.
 */
BillMaker.prototype.returnDummies = function (collection, subject) {
  // 현재 BillMaker 인스턴스를 instance 변수에 할당합니다.
  const instance = this;

  // collection에 해당하는 매핑 파일을 불러옵니다.
  // 이 매핑 파일은 해당 컬렉션의 데이터 구조 및 관련 메서드를 포함하고 있습니다.
  const map = require(`${this.mapDir}/${collection}.js`);

  let dummy; // 더미 데이터를 저장할 변수를 선언합니다.

  // 매핑 파일에서 제공하는 sub 메서드를 호출하여, 
  // 주어진 subject에 해당하는 더미 데이터를 가져옵니다.
  dummy = map.sub(subject);

  // 가져온 더미 데이터를 반환합니다.
  return dummy;
}

/**
 * BillMaker 클래스의 returnBillDummies 메서드는 'generalBill' 컬렉션에서 특정 주제(subject)에 해당하는 더미 데이터를 반환하는 함수입니다.
 * 이 메서드는 주로 청구서 관련 테스트 또는 기본 데이터를 생성하는 데 사용됩니다.
 * @param {string} subject - 반환할 더미 데이터를 결정하는 주제 또는 키워드입니다.
 * @returns {object} 더미 데이터 객체를 반환합니다.
 */
BillMaker.prototype.returnBillDummies = function (subject) {
  // 현재 BillMaker 인스턴스를 instance 변수에 할당합니다.
  const instance = this;

  // 'generalBill' 컬렉션에 해당하는 매핑 파일을 불러옵니다.
  // 이 매핑 파일은 'generalBill'의 데이터 구조 및 관련 메서드를 포함하고 있습니다.
  const map = require(`${this.mapDir}/generalBill.js`);

  let dummy; // 더미 데이터를 저장할 변수를 선언합니다.

  // 매핑 파일에서 제공하는 sub 메서드를 호출하여,
  // 주어진 subject에 해당하는 더미 데이터를 가져옵니다.
  dummy = map.sub(subject);

  // 가져온 더미 데이터를 반환합니다.
  return dummy;
}

/**
 * BillMaker 클래스의 getBillById 메서드는 주어진 청구서 ID(bilid)를 사용하여 MongoDB에서 특정 청구서를 조회하는 비동기 함수입니다.
 * 조회된 청구서는 매핑된 wrap 함수를 통해 포맷팅되어 반환됩니다.
 * @param {string} bilid - 조회할 청구서의 ID입니다.
 * @param {object} [option={ selfMongo: null }] - 추가 옵션 객체로, selfMongo를 통해 기존 MongoDB 연결을 재사용할 수 있습니다.
 * @returns {Promise<object|null>} 조회된 청구서를 반환하거나, 찾지 못한 경우 null을 반환합니다.
 * @throws {Error} 오류가 발생할 경우 콘솔에 오류 메시지를 출력합니다.
 */
BillMaker.prototype.getBillById = async function (bilid, option = { selfMongo: null }) {
  // 현재 BillMaker 인스턴스를 instance 변수에 할당합니다.
  const instance = this;

  // Mother 클래스에서 mongo와 mongoinfo를 추출합니다.
  // mongo는 MongoDB와의 연결을 관리하는 모듈이며, mongoinfo는 연결 정보입니다.
  const { mongo, mongoinfo } = this.mother;

  try {
      // 'generalBill' 컬렉션에 해당하는 매핑 파일을 불러옵니다.
      const map = require(`${this.mapDir}/generalBill.js`);

      let MONGOC; // MongoDB 연결 객체를 저장할 변수를 선언합니다.
      let selfBoo; // selfMongo 옵션의 존재 여부를 확인하는 불리언 변수입니다.
      let arr; // MongoDB에서 가져온 조회 결과 배열을 저장할 변수입니다.
      let result, target; // 결과를 저장할 변수와, 최종적으로 반환할 청구서를 저장할 변수를 선언합니다.

      // selfMongo 옵션이 정의되지 않았거나 null인 경우, selfBoo를 false로 설정합니다.
      if (option.selfMongo === undefined || option.selfMongo === null) {
          selfBoo = false;
      } else {
          selfBoo = true; // selfMongo 옵션이 존재하면 selfBoo를 true로 설정합니다.
      }

      // selfBoo가 false인 경우, 새로운 MongoDB 연결을 생성하고 연결합니다.
      if (!selfBoo) {
          MONGOC = new mongo(mongoinfo);
          await MONGOC.connect(); // MongoDB에 연결을 시도합니다.
      } else {
          // selfBoo가 true인 경우, 기존 MongoDB 연결을 사용합니다.
          MONGOC = option.selfMongo;
      }

      // 주어진 bilid에 해당하는 청구서를 MongoDB에서 조회합니다.
      arr = await MONGOC.db(`miro81`).collection(`generalBill`).find({ bilid }).toArray();

      // 조회된 데이터를 매핑 파일의 wrap 함수로 포맷팅하여 result 변수에 저장합니다.
      result = map.wrap(map.alive, arr, this.mother);

      // 조회된 청구서가 있는 경우, 그 첫 번째 항목을 target 변수에 저장합니다.
      if (result.length > 0) {
          target = result[0];
      } else {
          // 조회된 청구서가 없는 경우, target을 null로 설정합니다.
          target = null;
      }

      // selfBoo가 false인 경우, MongoDB 연결을 종료합니다.
      if (!selfBoo) {
          await MONGOC.close();
      }

      // 최종적으로 조회된 청구서 또는 null을 반환합니다.
      return target;

  } catch (e) {
      // 오류가 발생한 경우, 콘솔에 오류 메시지를 출력합니다.
      console.log(e);
  }
}

/**
 * BillMaker 클래스의 getBillsByQuery 메서드는 주어진 쿼리(whereQuery)를 사용하여 MongoDB에서 여러 청구서를 조회하는 비동기 함수입니다.
 * 조회된 청구서들은 매핑된 wrap 함수를 통해 포맷팅되어 반환됩니다.
 * @param {object} whereQuery - 조회할 조건을 포함한 객체입니다.
 * @param {object} [option={ selfMongo: null }] - 추가 옵션 객체로, selfMongo를 통해 기존 MongoDB 연결을 재사용할 수 있으며, 정렬 및 제한 옵션을 포함할 수 있습니다.
 * @returns {Promise<Array|void>} 조회된 청구서 배열을 반환하거나, 오류가 발생할 경우 콘솔에 오류 메시지를 출력합니다.
 * @throws {Error} 오류가 발생할 경우 예외를 발생시킵니다.
 */
BillMaker.prototype.getBillsByQuery = async function (whereQuery, option = { selfMongo: null }) {
  // 현재 BillMaker 인스턴스를 instance 변수에 할당합니다.
  const instance = this;

  // Mother 클래스에서 mongo와 mongoinfo를 추출합니다.
  // mongo는 MongoDB와의 연결을 관리하는 모듈이며, mongoinfo는 연결 정보입니다.
  const { mongo, mongoinfo } = this.mother;

  try {
      // 'generalBill' 컬렉션에 해당하는 매핑 파일을 불러옵니다.
      const map = require(`${this.mapDir}/generalBill.js`);

      let MONGOC; // MongoDB 연결 객체를 저장할 변수를 선언합니다.
      let selfBoo; // selfMongo 옵션의 존재 여부를 확인하는 불리언 변수입니다.
      let sortQuery; // 정렬 조건을 저장할 변수입니다.
      let tong; // MongoDB에서 조회한 청구서 데이터를 저장할 변수입니다.

      // selfMongo 옵션이 정의되지 않았거나 null인 경우, selfBoo를 false로 설정합니다.
      if (option.selfMongo === undefined || option.selfMongo === null) {
          selfBoo = false;
      } else {
          selfBoo = true; // selfMongo 옵션이 존재하면 selfBoo를 true로 설정합니다.
      }

      // selfBoo가 false인 경우, 새로운 MongoDB 연결을 생성하고 연결합니다.
      if (!selfBoo) {
          MONGOC = new mongo(mongoinfo);
          await MONGOC.connect(); // MongoDB에 연결을 시도합니다.
      } else {
          // selfBoo가 true인 경우, 기존 MongoDB 연결을 사용합니다.
          MONGOC = option.selfMongo;
      }

      // option.sort가 정의되지 않은 경우, 기본 정렬 조건을 날짜 기준으로 내림차순으로 설정합니다.
      if (option.sort === undefined) {
          sortQuery = { "date": -1 };
      } else {
          // 정의된 경우, option.sort 값을 정렬 조건으로 사용합니다.
          sortQuery = option.sort;
      }

      // option.limit가 정의된 경우, 조회 결과를 제한합니다.
      if (option.limit !== undefined) {
          tong = await MONGOC.db(`miro81`).collection(`generalBill`)
              .find(whereQuery).sort(sortQuery).limit(Number(option.limit)).toArray();
      } else {
          // 정의되지 않은 경우, 조회 결과를 제한하지 않고 가져옵니다.
          tong = await MONGOC.db(`miro81`).collection(`generalBill`)
              .find(whereQuery).sort(sortQuery).toArray();
      }

      // selfBoo가 false인 경우, MongoDB 연결을 종료합니다.
      if (!selfBoo) {
          await MONGOC.close();
      }

      // wrap 함수를 사용하여 조회된 데이터를 적절한 형식으로 래핑하여 반환합니다.
      return map.wrap(map.alive, tong, this.mother);

  } catch (e) {
      // 오류가 발생한 경우, 콘솔에 오류 메시지를 출력합니다.
      console.log(e);
  }
}

/**
 * BillMaker 클래스의 updateBill 메서드는 MongoDB에서 특정 청구서를 업데이트하는 비동기 함수입니다.
 * 주어진 조건(whereQuery)에 해당하는 문서를 찾아 업데이트(updateQuery)를 수행합니다.
 * @param {Array} queryArr - 업데이트할 쿼리 객체 배열로, [whereQuery, updateQuery] 형식을 가집니다.
 * @param {object} [option={ selfMongo: null }] - 추가 옵션 객체로, selfMongo를 통해 기존 MongoDB 연결을 재사용할 수 있습니다.
 * @returns {Promise<string|void>} 업데이트가 성공적으로 이루어졌다면 "success" 문자열을 반환합니다. 오류가 발생할 경우 콘솔에 오류 메시지를 출력합니다.
 * @throws {Error} 입력된 인자가 유효하지 않을 경우 예외를 발생시킵니다.
 */
BillMaker.prototype.updateBill = async function (queryArr, option = { selfMongo: null }) {
  // queryArr 배열의 길이가 2가 아닌 경우, 오류를 발생시킵니다.
  if (queryArr.length !== 2) {
      throw new Error("invaild arguments : query object must be Array: [ Object: whereQuery, Object: updateQuery ]");
  }

  // 현재 BillMaker 인스턴스를 instance 변수에 할당합니다.
  const instance = this;

  // Mother 클래스에서 mongo와 mongoinfo를 추출합니다.
  // mongo는 MongoDB와의 연결을 관리하는 모듈이며, mongoinfo는 연결 정보입니다.
  const { mongo, mongoinfo } = this.mother;

  try {
      // queryArr 배열을 구조 분해 할당하여 whereQuery와 updateQuery로 나눕니다.
      const [ whereQuery, updateQuery ] = queryArr;

      // whereQuery와 updateQuery가 객체가 아닌 경우, 오류를 발생시킵니다.
      if (typeof whereQuery !== "object" || typeof updateQuery !== "object") {
          throw new Error("invaild arguments : query object must be Array: [ Object: whereQuery, Object: updateQuery ]");
      }

      let MONGOC; // MongoDB 연결 객체를 저장할 변수를 선언합니다.
      let selfBoo; // selfMongo 옵션의 존재 여부를 확인하는 불리언 변수입니다.

      // selfMongo 옵션이 정의되지 않았거나 null인 경우, selfBoo를 false로 설정합니다.
      if (option.selfMongo === undefined || option.selfMongo === null) {
          selfBoo = false;
      } else {
          selfBoo = true; // selfMongo 옵션이 존재하면 selfBoo를 true로 설정합니다.
      }

      // selfBoo가 false인 경우, 새로운 MongoDB 연결을 생성하고 연결합니다.
      if (!selfBoo) {
          MONGOC = new mongo(mongoinfo);
          await MONGOC.connect(); // MongoDB에 연결을 시도합니다.
      } else {
          // selfBoo가 true인 경우, 기존 MongoDB 연결을 사용합니다.
          MONGOC = option.selfMongo;
      }

      // updateQuery가 null이 아니고, 업데이트할 내용이 있는 경우에만 업데이트를 실행합니다.
      if (updateQuery !== null && Object.keys(updateQuery).length > 0) {
          // whereQuery에 해당하는 문서를 찾아 updateQuery로 업데이트를 수행합니다.
          await MONGOC.db(`miro81`).collection(`generalBill`).updateOne(whereQuery, { $set: updateQuery });
      }

      // selfBoo가 false인 경우, MongoDB 연결을 종료합니다.
      if (!selfBoo) {
          await MONGOC.close();
      }

      // 업데이트가 성공적으로 완료된 경우 "success"를 반환합니다.
      return "success";

  } catch (e) {
      // 오류가 발생한 경우, 콘솔에 오류 메시지를 출력합니다.
      console.log(e);
  }
}

/**
 * BillMaker 클래스의 deleteBill 메서드는 주어진 청구서 ID(bilid)를 사용하여 MongoDB에서 해당 청구서를 삭제하는 비동기 함수입니다.
 * @param {string} bilid - 삭제할 청구서의 ID입니다.
 * @param {object} [option={ selfMongo: null }] - 추가 옵션 객체로, selfMongo를 통해 기존 MongoDB 연결을 재사용할 수 있습니다.
 * @returns {Promise<string|void>} 삭제가 성공적으로 이루어졌다면 "success" 문자열을 반환합니다. 오류가 발생할 경우 콘솔에 오류 메시지를 출력합니다.
 */
BillMaker.prototype.deleteBill = async function (bilid, option = { selfMongo: null }) {
  // 현재 BillMaker 인스턴스를 instance 변수에 할당합니다.
  const instance = this;

  // Mother 클래스에서 mongo와 mongoinfo를 추출합니다.
  // mongo는 MongoDB와의 연결을 관리하는 모듈이며, mongoinfo는 연결 정보입니다.
  const { mongo, mongoinfo } = this.mother;

  try {
      let MONGOC; // MongoDB 연결 객체를 저장할 변수를 선언합니다.
      let selfBoo; // selfMongo 옵션의 존재 여부를 확인하는 불리언 변수입니다.

      // selfMongo 옵션이 정의되지 않았거나 null인 경우, selfBoo를 false로 설정합니다.
      if (option.selfMongo === undefined || option.selfMongo === null) {
          selfBoo = false;
      } else {
          selfBoo = true; // selfMongo 옵션이 존재하면 selfBoo를 true로 설정합니다.
      }

      // selfBoo가 false인 경우, 새로운 MongoDB 연결을 생성하고 연결합니다.
      if (!selfBoo) {
          MONGOC = new mongo(mongoinfo);
          await MONGOC.connect(); // MongoDB에 연결을 시도합니다.
      } else {
          // selfBoo가 true인 경우, 기존 MongoDB 연결을 사용합니다.
          MONGOC = option.selfMongo;
      }

      // 주어진 bilid에 해당하는 청구서를 MongoDB에서 삭제합니다.
      await MONGOC.db(`miro81`).collection(`generalBill`).deleteOne({ bilid });

      // selfBoo가 false인 경우, MongoDB 연결을 종료합니다.
      if (!selfBoo) {
          await MONGOC.close();
      }

      // 삭제가 성공적으로 완료된 경우 "success"를 반환합니다.
      return "success";

  } catch (e) {
      // 오류가 발생한 경우, 콘솔에 오류 메시지를 출력합니다.
      console.log(e);
  }
}

/**
 * BillMaker 클래스의 createStylingBill 메서드는 특정 프로젝트(proid)에 대한 스타일링 청구서를 생성하는 비동기 함수입니다.
 * 이 함수는 주어진 프로젝트 ID를 기반으로 청구서를 생성하고, 관련 정보를 MongoDB에 저장합니다.
 * @param {string} proid - 청구서를 생성할 프로젝트의 ID입니다.
 * @param {object} [option={ selfMongo: null, selfCoreMongo: null, selfConsoleMongo: null }] - 추가 옵션 객체로, 기존 MongoDB 연결을 재사용할 수 있습니다.
 * @returns {Promise<Array|string|void>} 생성된 청구서 ID 배열을 반환하며, 오류가 발생할 경우 콘솔에 오류 메시지를 출력합니다.
 * @throws {Error} 유효하지 않은 프로젝트 ID가 입력된 경우 예외를 발생시킵니다.
 */
BillMaker.prototype.createStylingBill = async function (proid, option = { selfMongo: null, selfCoreMongo: null, selfConsoleMongo: null }) {
  // 입력된 proid가 문자열이 아닌 경우, 오류를 발생시킵니다.
  if (typeof proid !== "string") {
      throw new Error("must be proid");
  }

  // proid가 유효한 형식인지 정규 표현식을 사용하여 검사하고, 유효하지 않으면 오류를 발생시킵니다.
  if (!/^p[0-9]{4}_[a-z]{2}[0-9]{2}[a-z]$/.test(proid)) {
      throw new Error("must be proid");
  }

  // 현재 BillMaker 인스턴스를 instance 변수에 할당합니다.
  const instance = this;
  const back = this.back;

  // Mother 클래스에서 필요한 모듈과 함수를 추출합니다.
  // mongo는 MongoDB와의 연결을 관리하는 모듈, mongoinfo와 mongoconsoleinfo는 각각 MongoDB 연결 정보입니다.
  // sleep은 비동기 작업을 잠시 지연시키는 함수, equalJson은 객체를 비교하는 함수입니다.
  const { mongo, mongoinfo, mongoconsoleinfo, sleep, equalJson } = this.mother;

  // BillMaker.billDictionary의 styling 클래스와 이름을 constNames 변수에 저장합니다.
  const constNames = {
      class: BillMaker.billDictionary.styling.class,
      name: BillMaker.billDictionary.styling.name,
  };

  try {
      let MONGOC, MONGOCOREC, MONGOCONSOLEC; // MongoDB 연결 객체를 저장할 변수를 선언합니다.
      let selfBoo, selfCoreBoo, selfConsoleBoo; // 각 MongoDB 연결 옵션의 존재 여부를 확인하는 불리언 변수를 선언합니다.

      // selfMongo 옵션이 정의되지 않았거나 null인 경우, selfBoo를 false로 설정합니다.
      if (option.selfMongo === undefined || option.selfMongo === null) {
          selfBoo = false;
      } else {
          selfBoo = true; // selfMongo 옵션이 존재하면 selfBoo를 true로 설정합니다.
      }

      // selfCoreMongo 옵션이 정의되지 않았거나 null인 경우, selfCoreBoo를 false로 설정합니다.
      if (option.selfCoreMongo === undefined || option.selfCoreMongo === null) {
          selfCoreBoo = false;
      } else {
          selfCoreBoo = true; // selfCoreMongo 옵션이 존재하면 selfCoreBoo를 true로 설정합니다.
      }

      // selfConsoleMongo 옵션이 정의되지 않았거나 null인 경우, selfConsoleBoo를 false로 설정합니다.
      if (option.selfConsoleMongo === undefined || option.selfConsoleMongo === null) {
          selfConsoleBoo = false;
      } else {
          selfConsoleBoo = true; // selfConsoleMongo 옵션이 존재하면 selfConsoleBoo를 true로 설정합니다.
      }

      // 각 selfBoo, selfCoreBoo, selfConsoleBoo 값에 따라 새로운 MongoDB 연결을 생성하거나 기존 연결을 사용합니다.
      if (!selfBoo) {
          MONGOC = new mongo(mongoinfo);
          await MONGOC.connect(); // MongoDB에 연결을 시도합니다.
      } else {
          MONGOC = option.selfMongo;
      }
      if (!selfCoreBoo) {
          MONGOCOREC = new mongo(mongoinfo);
          await MONGOCOREC.connect(); // Core MongoDB에 연결을 시도합니다.
      } else {
          MONGOCOREC = option.selfCoreMongo;
      }
      if (!selfConsoleBoo) {
          MONGOCONSOLEC = new mongo(mongoconsoleinfo);
          await MONGOCONSOLEC.connect(); // Console MongoDB에 연결을 시도합니다.
      } else {
          MONGOCONSOLEC = option.selfConsoleMongo;
      }

      // 프로젝트의 멤버 정보를 가져오고, 유효한 멤버 정보가 없으면 오류를 발생시킵니다.
      const members = await back.setMemberObj({ selfMongo: MONGOCOREC, getMode: true });
      if (!Array.isArray(members) || members.length === 0) {
          throw new Error("no member error");
      }

      // 프로젝트 ID를 사용하여 프로젝트 정보를 가져오고, 유효한 프로젝트가 없으면 오류를 발생시킵니다.
      const project = await back.getProjectById(proid, { selfMongo: MONGOCOREC });
      if (project === null) {
          throw new Error("no project error");
      }

      // 프로젝트에 연결된 클라이언트 정보를 가져오고, 유효한 클라이언트가 없으면 오류를 발생시킵니다.
      const client = await back.getClientById(project.cliid, { selfMongo: MONGOCOREC });
      if (client === null) {
          throw new Error("no client error");
      }

      let targetProposals;
      let designerHistory;
      let thisMember;
      let bilid, bilidArr = []; // 청구서 ID와 청구서 ID 배열을 초기화합니다.
      let whereQuery, updateQuery;
      let tempObj, tempObj2, tempArr;
      let res;
      let temp;
      let updateMode;
      let thisBill;
      let designer;

      // 프로젝트에 연결된 디자이너의 제안서를 필터링합니다.
      if (/^d/.test(project.desid)) {
          targetProposals = [];
          for (let proposal of project.proposal.detail) {
              if (proposal.desid === project.desid) {
                  targetProposals.push(proposal);
              }
          }
      } else {
          targetProposals = project.proposal.detail;
      }

      // 옵션에서 강제로 설정된 desid가 있는 경우, 해당 디자이너의 제안서만 선택합니다.
      if (option.forceDesid !== undefined) {
          targetProposals = [];
          for (let proposal of project.proposal.detail) {
              if (proposal.desid === option.forceDesid) {
                  targetProposals.push(proposal);
              }
          }
      }

      // 선택된 각 제안서에 대해 청구서를 생성합니다.
      for (let { desid, fee } of targetProposals) {

          // 디자이너의 히스토리를 가져오고, 유효한 히스토리가 없으면 오류를 발생시킵니다.
          designerHistory = await back.getHistoryById("designer", desid, { selfMongo: MONGOCONSOLEC });
          if (designerHistory === null) {
              throw new Error("designer history error");
          }

          // 디자이너 정보를 가져옵니다.
          designer = await back.getDesignerById(desid, { selfMongo: MONGOCOREC });

          // 멤버 정보에서 디자이너의 매니저를 찾습니다. 없으면 첫 번째 멤버를 기본으로 설정합니다.
          thisMember = null;
          for (let obj of members) {
              if (obj.name === designerHistory.manager) {
                  thisMember = obj;
              }
          }
          if (thisMember === null) {
              thisMember = members[0];
          }

          // 각 비용 항목에 대해 청구서를 생성하거나 업데이트합니다.
          for (let { method, partial, amount, distance } of fee) {

              // 동일한 프로젝트와 디자이너, 결제 방법으로 이미 생성된 청구서가 있는지 확인합니다.
              temp = await this.getBillsByQuery({ "links.proid": project.proid, "links.desid": desid, "links.method": method }, { selfMongo: MONGOC });
              if (temp.length === 0) {
                  bilid = await this.createBill({}, { selfMongo: MONGOC });
                  updateMode = false; // 새로 생성된 청구서일 경우 updateMode를 false로 설정합니다.
              } else {
                  thisBill = temp[0];
                  bilid = thisBill.bilid; // 이미 존재하는 청구서 ID를 가져옵니다.
                  updateMode = true; // 기존 청구서를 업데이트할 경우 updateMode를 true로 설정합니다.
              }

              // 청구서 업데이트 쿼리를 구성합니다.
              whereQuery = { bilid };
              updateQuery = {};
              updateQuery["class"] = constNames.class;
              updateQuery["name"] = client.name + "_" + client.phone + "_" + constNames.name;
              updateQuery["date"] = new Date();

              // 매니저 정보를 설정합니다.
              tempObj = this.returnBillDummies("managers");
              tempObj.id = thisMember.id;
              tempObj.name = thisMember.name;
              tempObj.phone = thisMember.phone;
              tempObj.email = thisMember.email[0];
              updateQuery["participant.managers"] = [ equalJson(JSON.stringify(tempObj)) ];

              // 클라이언트 정보를 설정합니다.
              updateQuery["participant.customer.id"] = client.cliid;
              updateQuery["participant.customer.name"] = client.name;
              updateQuery["participant.customer.phone"] = client.phone;
              updateQuery["participant.customer.email"] = client.email;

              // 디자이너 정보를 설정합니다.
              updateQuery["participant.designer.id"] = designer.desid;
              updateQuery["participant.designer.name"] = designer.designer;
              updateQuery["participant.designer.phone"] = designer.information.phone;
              updateQuery["participant.designer.email"] = designer.information.email;

              // 링크 정보를 설정합니다.
              updateQuery["links.proid"] = project.proid;
              updateQuery["links.cliid"] = client.cliid;
              updateQuery["links.desid"] = desid;
              updateQuery["links.method"] = method;

              // 청구서가 새로 생성된 경우, 요청과 응답을 삽입합니다.
              if (!updateMode) {

                  // 청구서를 업데이트합니다.
                  res = await this.updateBill([ whereQuery, updateQuery ], { selfMongo: MONGOC });

                  // 요청 및 응답 항목을 청구서에 삽입합니다.
                  await this.requestInjection(bilid, "firstPayment", client, designer, project, method, { selfMongo: MONGOC });
                  await this.requestInjection(bilid, "secondPayment", client, designer, project, method, { selfMongo: MONGOC });
                  // await this.requestInjection(bilid, "travelPayment", client, designer, project, method, { selfMongo: MONGOC, number: { travelExpenses: 5 } });

                  await this.responseInjection(bilid, "firstDesignFee", client, designer, project, method, { selfMongo: MONGOC });
                  await this.responseInjection(bilid, "secondDesignFee", client, designer, project, method, { selfMongo: MONGOC });
                  // await this.responseInjection(bilid, "designerTravelFee", client, designer, project, method, { selfMongo: MONGOC, number: { travelExpenses: 5 } });

                  // 성공적으로 업데이트된 청구서 ID를 배열에 추가합니다.
                  if (res === "success") {
                      bilidArr.push(bilid);
                  }

              }

          }

      }

      // 각 MongoDB 연결이 새로 생성된 경우, 연결을 종료합니다.
      if (!selfBoo) {
          await MONGOC.close();
      }
      if (!selfCoreBoo) {
          await MONGOCOREC.close();
      }
      if (!selfConsoleBoo) {
          await MONGOCONSOLEC.close();
      }

      // 생성된 청구서 ID 배열을 반환합니다.
      return bilidArr;

  } catch (e) {
      // 오류가 발생한 경우, 콘솔에 오류 메시지를 출력합니다.
      console.log(e);
  }
}

/**
 * BillMaker 클래스의 requestInjection 메서드는 특정 청구서에 요청(request)을 삽입하는 비동기 함수입니다.
 * 이 함수는 주어진 청구서 ID와 관련된 프로젝트, 클라이언트, 디자이너 정보를 기반으로 요청을 구성하고, 
 * 이를 MongoDB에 업데이트합니다.
 * @param {string} bilid - 요청을 추가할 청구서의 ID입니다.
 * @param {string} requestKey - 삽입할 요청의 키입니다.
 * @param {object} client - 클라이언트 정보 객체입니다.
 * @param {object} designer - 디자이너 정보 객체입니다.
 * @param {object} project - 프로젝트 정보 객체입니다.
 * @param {string} method - 결제 방식입니다.
 * @param {object} [option={ selfMongo: null }] - 추가 옵션 객체로, selfMongo를 통해 기존 MongoDB 연결을 재사용할 수 있습니다.
 * @returns {Promise<void>} 함수는 데이터를 삽입하고 종료됩니다. 오류가 발생할 경우 콘솔에 오류 메시지를 출력합니다.
 * @throws {Error} 입력이 유효하지 않은 경우 예외를 발생시킵니다.
 */
BillMaker.prototype.requestInjection = async function (bilid, requestKey, client, designer, project, method, option = { selfMongo: null }) {
  // 함수 인자들이 유효한 타입인지 확인하고, 유효하지 않으면 오류를 발생시킵니다.
  if (typeof bilid !== "string" || typeof requestKey !== "string" || typeof client !== "object" || typeof designer !== "object" || typeof project !== "object" || typeof method !== "string") {
      throw new Error("invaild input");
  }

  // 현재 BillMaker 인스턴스를 instance 변수에 할당합니다.
  const instance = this;

  // Mother 클래스에서 필요한 모듈과 함수를 추출합니다.
  // mongo는 MongoDB와의 연결을 관리하는 모듈, mongoinfo는 연결 정보,
  // equalJson은 객체를 비교하는 함수, sleep은 비동기 작업을 잠시 지연시키는 함수입니다.
  const { mongo, mongoinfo, equalJson, sleep } = this.mother;

  // BillMaker.billDictionary에서 스타일링 청구서에 대한 항목과 요청을 가져옵니다.
  const stylingItems = BillMaker.billDictionary.styling.goods;
  const stylingRequests = BillMaker.billDictionary.styling.requests;
  const { contractAmount, vatRatio, freeRatio, distancePercentage } = BillMaker.billDictionary.styling.etc;
  const requestConst = "_r";

  try {
      let requestObject; // 새로 삽입할 요청 객체를 저장할 변수를 선언합니다.
      let MONGOC; // MongoDB 연결 객체를 저장할 변수를 선언합니다.
      let selfBoo; // selfMongo 옵션의 존재 여부를 확인하는 불리언 변수를 선언합니다.
      let thisBill; // 현재 청구서 객체를 저장할 변수를 선언합니다.
      let thisRequest; // 현재 요청 객체를 저장할 변수를 선언합니다.
      let feeObject; // 비용 객체를 저장할 변수를 선언합니다.
      let itemMatrix; // 항목 행렬을 저장할 변수를 선언합니다.
      let item, itemFactor; // 각 항목과 항목의 세부 정보를 저장할 변수를 선언합니다.
      let distance; // 거리 값을 저장할 변수를 선언합니다.
      let tempArr; // 임시 배열을 저장할 변수를 선언합니다.
      let whereQuery, updateQuery; // MongoDB 업데이트에 사용될 쿼리를 저장할 변수를 선언합니다.
      let commentsArr; // 주석 배열을 저장할 변수를 선언합니다.
      let itemSupply, itemVat, itemConsumer; // 항목 공급가액, 부가가치세, 소비자가액을 저장할 변수를 선언합니다.

      // 요청 키(requestKey)가 유효한지 확인하고, 유효하지 않으면 오류를 발생시킵니다.
      if (stylingRequests[requestKey] === undefined) {
          throw new Error("invaild request key");
      }
      thisRequest = stylingRequests[requestKey];

      // selfMongo 옵션이 정의되지 않았거나 null인 경우, selfBoo를 false로 설정합니다.
      if (option.selfMongo === undefined || option.selfMongo === null) {
          selfBoo = false;
      } else {
          selfBoo = true; // selfMongo 옵션이 존재하면 selfBoo를 true로 설정합니다.
      }

      // selfBoo가 false인 경우, 새로운 MongoDB 연결을 생성하고 연결합니다.
      if (!selfBoo) {
          MONGOC = new mongo(mongoinfo);
          await MONGOC.connect(); // MongoDB에 연결을 시도합니다.
      } else {
          // selfBoo가 true인 경우, 기존 MongoDB 연결을 사용합니다.
          MONGOC = option.selfMongo;
      }

      // 청구서 ID를 사용하여 해당 청구서를 MongoDB에서 가져옵니다.
      thisBill = await this.getBillById(bilid, { selfMongo: MONGOC });
      if (thisBill === null) {
          throw new Error("invaild bilid");
      }

      // 새로운 요청 객체를 생성하고, 기본 정보들을 설정합니다.
      requestObject = this.returnBillDummies("requests");
      requestObject.id = bilid + requestConst + String(thisBill.requests.length);
      requestObject.info = thisRequest.info(client, designer, project, method, null);

      // 옵션에 customAmount가 정의되지 않은 경우, 프로젝트에서 비용 정보를 가져옵니다.
      if (typeof option.customAmount !== "object" || option.customAmount === null) {

          feeObject = null;
          for (let proposal of project.proposal.detail) {
              if (proposal.desid === designer.desid) {
                  for (let obj of proposal.fee) {
                      if (obj.method === method) {
                          feeObject = obj;
                      }
                  }
              }
          }

          // 유효한 feeObject가 없는 경우, 옵션에서 가져오거나 오류를 발생시킵니다.
          if (feeObject === null) {
              if (option.feeObject !== undefined && option.feeObject !== null && typeof option.feeObject === "object") {
                  feeObject = option.feeObject;
              } else {
                  throw new Error("cannot find fee object");
              }
          }
          distance = feeObject.distance;

          // 요청 항목을 기반으로 항목 행렬(itemMatrix)을 생성합니다.
          itemMatrix = thisRequest.item(feeObject, { client, designer, project, contractAmount, vatRatio, freeRatio, distancePercentage });
          commentsArr = thisRequest.comments;

          // 각 항목에 대해 필요한 정보를 설정하고 계산합니다.
          for (let [ property, thisAmount ] of itemMatrix) {
              await sleep(100); // 각 항목 사이에 지연 시간을 추가합니다.
              if (stylingItems[property] === undefined) {
                  throw new Error("item property error");
              }
              item = stylingItems[property];
              itemFactor = this.returnBillDummies("items");
              itemFactor.id = bilid + item.id;
              itemFactor.class = property;
              itemFactor.name = item.name;
              itemFactor.description = item.description;
              itemFactor.unit.ea = item.ea;

              // 소비자가액이 아닌 공급가액을 계산할 경우
              if (option.consumerMode !== true) {
                  itemSupply = Math.round(item.amount(method, thisAmount, distance, { client, designer, project, contractAmount, vatRatio, freeRatio, distancePercentage }));
                  itemVat = Math.round(itemSupply * vatRatio);
                  itemConsumer = itemSupply + itemVat;
              } else {
                  // 소비자가액을 기준으로 계산할 경우
                  itemConsumer = Math.round(item.amount(method, thisAmount, distance, { client, designer, project, contractAmount, vatRatio, freeRatio, distancePercentage }));
                  itemVat = Math.floor(itemConsumer / ((1 + vatRatio) * 10));
                  itemSupply = itemConsumer - itemVat;
              }

              itemFactor.unit.price = itemSupply;

              // 항목의 개수를 설정합니다.
              if (typeof option.number === "object" && option.number !== null) {
                  if (typeof option.number[property] === "number") {
                      itemFactor.unit.number = option.number[property];
                  } else {
                      itemFactor.unit.number = Math.floor(item.number(method, distance, { client, designer, project, contractAmount, vatRatio, freeRatio, distancePercentage }));
                  }
              } else {
                  itemFactor.unit.number = Math.floor(item.number(method, distance, { client, designer, project, contractAmount, vatRatio, freeRatio, distancePercentage }));
              }

              // 항목의 공급가액, 부가가치세, 소비자가액을 계산하여 설정합니다.
              itemFactor.amount.supply = itemSupply * itemFactor.unit.number;
              itemFactor.amount.vat = itemVat * itemFactor.unit.number;
              itemFactor.amount.consumer = itemConsumer * itemFactor.unit.number;

              // 계산된 항목을 요청 객체에 추가합니다.
              requestObject.items.push(equalJson(JSON.stringify(itemFactor)));
              commentsArr = commentsArr.concat(item.comments);
          }

      } else {
          // customAmount가 정의된 경우, 이를 사용하여 항목 행렬을 생성합니다.
          itemMatrix = thisRequest.item(option.customAmount, { client, designer, project, contractAmount, vatRatio, freeRatio, distancePercentage });
          commentsArr = thisRequest.comments;

          // 각 항목에 대해 필요한 정보를 설정하고 계산합니다.
          for (let [ property, thisAmount ] of itemMatrix) {
              await sleep(100); // 각 항목 사이에 지연 시간을 추가합니다.
              if (stylingItems[property] === undefined) {
                  throw new Error("item property error");
              }
              item = stylingItems[property];
              itemFactor = this.returnBillDummies("items");
              itemFactor.id = bilid + item.id;
              itemFactor.class = property;
              itemFactor.name = item.name;
              itemFactor.description = item.description;
              itemFactor.unit.ea = item.ea;

              // 소비자가액이 아닌 공급가액을 계산할 경우
              if (option.consumerMode !== true) {
                  itemSupply = Math.round(item.amount(thisAmount, { client, designer, project, contractAmount, vatRatio, freeRatio }));
                  itemVat = Math.round(itemSupply * vatRatio);
                  itemConsumer = itemSupply + itemVat;
              } else {
                  // 소비자가액을 기준으로 계산할 경우
                  itemConsumer = Math.round(item.amount(thisAmount, { client, designer, project, contractAmount, vatRatio, freeRatio }));
                  itemVat = Math.floor(itemConsumer / ((1 + vatRatio) * 10));
                  itemSupply = itemConsumer - itemVat;
              }

              itemFactor.unit.price = itemSupply;

              // 항목의 개수를 설정합니다.
              if (typeof option.number === "object" && option.number !== null) {
                  if (typeof option.number[property] === "number") {
                      itemFactor.unit.number = option.number[property];
                  } else {
                      itemFactor.unit.number = Math.floor(item.number({ client, designer, project, contractAmount, vatRatio, freeRatio }));
                  }
              } else {
                  itemFactor.unit.number = Math.floor(item.number({ client, designer, project, contractAmount, vatRatio, freeRatio }));
              }

              // 항목의 공급가액, 부가가치세, 소비자가액을 계산하여 설정합니다.
              itemFactor.amount.supply = itemSupply * itemFactor.unit.number;
              itemFactor.amount.vat = itemVat * itemFactor.unit.number;
              itemFactor.amount.consumer = itemConsumer * itemFactor.unit.number;

              // 계산된 항목을 요청 객체에 추가합니다.
              requestObject.items.push(equalJson(JSON.stringify(itemFactor)));
              commentsArr = commentsArr.concat(item.comments);
          }
      }

      // 요청 객체에 이름과 주석을 추가합니다.
      requestObject.name = thisRequest.name;
      for (let c of commentsArr) {
          requestObject.comments.push(c);
      }

      // 요청 대상(target)을 설정합니다.
      requestObject.target = thisRequest.target(client, designer, project, method, null);

      // 기존 요청 배열에 새 요청을 추가합니다.
      tempArr = thisBill.requests.toNormal();
      tempArr.unshift(requestObject);
      whereQuery = { bilid };
      updateQuery = {};
      updateQuery["requests"] = equalJson(JSON.stringify(tempArr));

      // MongoDB에 업데이트를 수행합니다.
      await this.updateBill([ whereQuery, updateQuery ], { selfMongo: MONGOC });

      // selfBoo가 false인 경우, MongoDB 연결을 종료합니다.
      if (!selfBoo) {
          await MONGOC.close();
      }

  } catch (e) {
      // 오류가 발생한 경우, 콘솔에 오류 메시지를 출력합니다.
      console.log(e);
  }
}

/**
 * BillMaker 클래스의 requestEjection 메서드는 특정 청구서에서 요청(request)을 제거하는 비동기 함수입니다.
 * 이 함수는 주어진 청구서 ID와 요청 인덱스 또는 ID를 기반으로 요청을 삭제하고, 변경된 청구서를 MongoDB에 업데이트합니다.
 * @param {string} bilid - 요청을 제거할 청구서의 ID입니다.
 * @param {number|string} requestIndex - 제거할 요청의 인덱스(숫자) 또는 ID(문자열)입니다.
 * @param {object} [option={ selfMongo: null }] - 추가 옵션 객체로, selfMongo를 통해 기존 MongoDB 연결을 재사용할 수 있습니다.
 * @returns {Promise<void>} 함수는 데이터를 업데이트하고 종료됩니다. 오류가 발생할 경우 콘솔에 오류 메시지를 출력합니다.
 * @throws {Error} 입력이 유효하지 않은 경우 예외를 발생시킵니다.
 */
BillMaker.prototype.requestEjection = async function (bilid, requestIndex, option = { selfMongo: null }) {
  // bilid가 문자열이 아닌 경우, 오류를 발생시킵니다.
  if (typeof bilid !== "string") {
      throw new Error("invaild input");
  }

  let mode, thisId; // 모드와 현재 청구서 ID를 저장할 변수를 선언합니다.

  // bilid가 특정 형식을 따른 경우(언더바로 구분된 세 부분), ID 기반 모드로 전환합니다.
  if (bilid.split("_").length === 3) {
      mode = "id"; // 모드를 "id"로 설정합니다.
      option = requestIndex; // requestIndex를 옵션으로 간주합니다.
      thisId = bilid; // thisId에 원래 bilid를 저장합니다.
      bilid = thisId.split("_").slice(0, 2).join("_"); // bilid를 앞부분만 남기고 재설정합니다.
  } else {
      // 그렇지 않으면 인덱스 기반 모드로 처리합니다.
      if (typeof requestIndex !== "number") {
          throw new Error("invaild input");
      }
      mode = "index"; // 모드를 "index"로 설정합니다.
  }

  // 현재 BillMaker 인스턴스를 instance 변수에 할당합니다.
  const instance = this;

  // Mother 클래스에서 필요한 모듈과 함수를 추출합니다.
  // mongo는 MongoDB와의 연결을 관리하는 모듈, mongoinfo는 연결 정보, equalJson은 객체를 비교하는 함수입니다.
  const { mongo, mongoinfo, equalJson } = this.mother;

  try {
      let MONGOC; // MongoDB 연결 객체를 저장할 변수를 선언합니다.
      let selfBoo; // selfMongo 옵션의 존재 여부를 확인하는 불리언 변수를 선언합니다.
      let thisBill; // 현재 청구서 객체를 저장할 변수를 선언합니다.
      let tempArr, finalArr; // 임시 배열과 최종 배열을 저장할 변수를 선언합니다.
      let whereQuery, updateQuery; // MongoDB 업데이트에 사용될 쿼리를 저장할 변수를 선언합니다.

      // selfMongo 옵션이 정의되지 않았거나 null인 경우, selfBoo를 false로 설정합니다.
      if (option.selfMongo === undefined || option.selfMongo === null) {
          selfBoo = false;
      } else {
          selfBoo = true; // selfMongo 옵션이 존재하면 selfBoo를 true로 설정합니다.
      }

      // selfBoo가 false인 경우, 새로운 MongoDB 연결을 생성하고 연결합니다.
      if (!selfBoo) {
          MONGOC = new mongo(mongoinfo);
          await MONGOC.connect(); // MongoDB에 연결을 시도합니다.
      } else {
          // selfBoo가 true인 경우, 기존 MongoDB 연결을 사용합니다.
          MONGOC = option.selfMongo;
      }

      // 청구서 ID를 사용하여 해당 청구서를 MongoDB에서 가져옵니다.
      thisBill = await this.getBillById(bilid, { selfMongo: MONGOC });
      if (thisBill === null) {
          throw new Error("invaild bilid");
      }

      // 현재 청구서의 요청 배열을 일반 배열로 변환합니다.
      tempArr = thisBill.requests.toNormal();

      // 모드가 "index"인 경우, 주어진 인덱스의 요청을 제거합니다.
      if (mode === "index") {
          tempArr.splice(requestIndex, 1); // 해당 인덱스의 요청을 배열에서 제거합니다.
          finalArr = equalJson(JSON.stringify(tempArr)); // 최종 배열을 JSON 문자열로 변환하여 저장합니다.
      } else {
          // 모드가 "id"인 경우, 주어진 ID와 일치하지 않는 요청만을 남깁니다.
          finalArr = [];
          for (let obj of tempArr) {
              if (obj.id !== thisId) {
                  finalArr.push(obj); // ID가 일치하지 않는 객체만 최종 배열에 추가합니다.
              }
          }
      }

      // MongoDB 업데이트 쿼리를 구성합니다.
      whereQuery = { bilid };
      updateQuery = {};
      updateQuery["requests"] = finalArr;

      // 청구서의 요청 배열을 업데이트합니다.
      await this.updateBill([ whereQuery, updateQuery ], { selfMongo: MONGOC });

      // selfBoo가 false인 경우, MongoDB 연결을 종료합니다.
      if (!selfBoo) {
          await MONGOC.close();
      }

  } catch (e) {
      // 오류가 발생한 경우, 콘솔에 오류 메시지를 출력합니다.
      console.log(e);
  }
}

/**
 * BillMaker 클래스의 responseInjection 메서드는 특정 청구서에 응답(response)을 삽입하는 비동기 함수입니다.
 * 이 함수는 주어진 청구서 ID와 관련된 프로젝트, 클라이언트, 디자이너 정보를 기반으로 응답을 구성하고,
 * 이를 MongoDB에 업데이트합니다.
 * @param {string} bilid - 응답을 추가할 청구서의 ID입니다.
 * @param {string} responseKey - 삽입할 응답의 키입니다.
 * @param {object} client - 클라이언트 정보 객체입니다.
 * @param {object} designer - 디자이너 정보 객체입니다.
 * @param {object} project - 프로젝트 정보 객체입니다.
 * @param {string} method - 결제 방식입니다.
 * @param {object} [option={ selfMongo: null }] - 추가 옵션 객체로, selfMongo를 통해 기존 MongoDB 연결을 재사용할 수 있습니다.
 * @returns {Promise<void>} 함수는 데이터를 삽입하고 종료됩니다. 오류가 발생할 경우 콘솔에 오류 메시지를 출력합니다.
 * @throws {Error} 입력이 유효하지 않은 경우 예외를 발생시킵니다.
 */
BillMaker.prototype.responseInjection = async function (bilid, responseKey, client, designer, project, method, option = { selfMongo: null }) {
  // 함수 인자들이 유효한 타입인지 확인하고, 유효하지 않으면 오류를 발생시킵니다.
  if (typeof bilid !== "string" || typeof responseKey !== "string" || typeof client !== "object" || typeof designer !== "object" || typeof project !== "object" || typeof method !== "string") {
      throw new Error("invaild input");
  }

  // 현재 BillMaker 인스턴스를 instance 변수에 할당합니다.
  const instance = this;

  // Mother 클래스에서 필요한 모듈과 함수를 추출합니다.
  // mongo는 MongoDB와의 연결을 관리하는 모듈, mongoinfo는 연결 정보,
  // equalJson은 객체를 비교하는 함수, sleep은 비동기 작업을 잠시 지연시키는 함수입니다.
  const { mongo, mongoinfo, equalJson, sleep } = this.mother;

  // BillMaker.billDictionary에서 디자이너 계산과 스타일링 응답 항목을 가져옵니다.
  const designerCalculation = BillMaker.billDictionary.styling.calculation;
  const stylingResponses = BillMaker.billDictionary.styling.responses;
  const { contractAmount, vatRatio, freeRatio, distancePercentage } = BillMaker.billDictionary.styling.etc;
  const responseConst = "_s"; // 응답 ID에 추가될 접미사입니다.

  try {
      let responseObject; // 새로 삽입할 응답 객체를 저장할 변수를 선언합니다.
      let MONGOC; // MongoDB 연결 객체를 저장할 변수를 선언합니다.
      let selfBoo; // selfMongo 옵션의 존재 여부를 확인하는 불리언 변수를 선언합니다.
      let thisBill; // 현재 청구서 객체를 저장할 변수를 선언합니다.
      let thisResponse; // 현재 응답 객체를 저장할 변수를 선언합니다.
      let feeObject; // 비용 객체를 저장할 변수를 선언합니다.
      let itemMatrix; // 항목 행렬을 저장할 변수를 선언합니다.
      let item, itemFactor; // 각 항목과 항목의 세부 정보를 저장할 변수를 선언합니다.
      let distance; // 거리 값을 저장할 변수를 선언합니다.
      let tempArr; // 임시 배열을 저장할 변수를 선언합니다.
      let whereQuery, updateQuery; // MongoDB 업데이트에 사용될 쿼리를 저장할 변수를 선언합니다.
      let commentsArr; // 주석 배열을 저장할 변수를 선언합니다.
      let tempObject, tempAmount, tempCommission; // 임시 계산값을 저장할 변수를 선언합니다.
      let optionObject; // 옵션 객체를 저장할 변수를 선언합니다.

      // 응답 키(responseKey)가 유효한지 확인하고, 유효하지 않으면 오류를 발생시킵니다.
      if (stylingResponses[responseKey] === undefined) {
          throw new Error("invaild response key");
      }
      thisResponse = stylingResponses[responseKey];

      // selfMongo 옵션이 정의되지 않았거나 null인 경우, selfBoo를 false로 설정합니다.
      if (option.selfMongo === undefined || option.selfMongo === null) {
          selfBoo = false;
      } else {
          selfBoo = true; // selfMongo 옵션이 존재하면 selfBoo를 true로 설정합니다.
      }

      // selfBoo가 false인 경우, 새로운 MongoDB 연결을 생성하고 연결합니다.
      if (!selfBoo) {
          MONGOC = new mongo(mongoinfo);
          await MONGOC.connect(); // MongoDB에 연결을 시도합니다.
      } else {
          // selfBoo가 true인 경우, 기존 MongoDB 연결을 사용합니다.
          MONGOC = option.selfMongo;
      }

      // 청구서 ID를 사용하여 해당 청구서를 MongoDB에서 가져옵니다.
      thisBill = await this.getBillById(bilid, { selfMongo: MONGOC });
      if (thisBill === null) {
          throw new Error("invaild bilid");
      }

      // 새로운 응답 객체를 생성하고, 기본 정보들을 설정합니다.
      responseObject = this.returnBillDummies("responses");
      responseObject.id = bilid + responseConst + String(thisBill.responses.length);
      responseObject.info = thisResponse.info(client, designer, project, method, null);

      // 옵션에 customAmount가 정의되지 않은 경우, 프로젝트에서 비용 정보를 가져옵니다.
      if (typeof option.customAmount !== "object" || option.customAmount === null) {

          feeObject = null;
          for (let proposal of project.proposal.detail) {
              if (proposal.desid === designer.desid) {
                  for (let obj of proposal.fee) {
                      if (obj.method === method) {
                          feeObject = obj;
                      }
                  }
              }
          }

          // 유효한 feeObject가 없는 경우, 옵션에서 가져오거나 오류를 발생시킵니다.
          if (feeObject === null) {
              if (option.feeObject !== undefined && option.feeObject !== null && typeof option.feeObject === "object") {
                  feeObject = option.feeObject;
              } else {
                  throw new Error("cannot find fee object");
              }
          }
          distance = feeObject.distance;

          // 응답 항목을 기반으로 항목 행렬(itemMatrix)을 생성합니다.
          itemMatrix = thisResponse.item(feeObject, { client, designer, project, contractAmount, vatRatio, freeRatio, distancePercentage });
          commentsArr = thisResponse.comments;

          // 각 항목에 대해 필요한 정보를 설정하고 계산합니다.
          for (let [ property, thisAmount ] of itemMatrix) {
              await sleep(100); // 각 항목 사이에 지연 시간을 추가합니다.
              if (designerCalculation[property] === undefined) {
                  throw new Error("item property error");
              }
              item = designerCalculation[property];
              itemFactor = this.returnBillDummies("responseItems");
              itemFactor.id = bilid + item.id;
              itemFactor.class = property;
              itemFactor.name = item.name;
              itemFactor.description = item.description;
              itemFactor.unit.ea = item.ea;

              // 소비자가액 모드일 경우, 소비자가액에서 VAT를 제외한 금액으로 설정합니다.
              if (option.consumerMode === true) {
                  thisAmount = thisAmount - Math.floor(thisAmount * (1 / ((1 + vatRatio) * 10)));
              }

              // 항목의 계산된 값들을 임시 객체에 저장합니다.
              tempObject = item.amount(method, thisAmount, distance, { client, designer, project, contractAmount, vatRatio, freeRatio, distancePercentage });
              tempAmount = tempObject.amount;
              tempCommission = tempObject.commission;
              itemFactor.unit.price = tempAmount;

              // 항목의 개수를 설정합니다.
              if (typeof option.number === "object" && option.number !== null) {
                  if (typeof option.number[property] === "number") {
                      itemFactor.unit.number = option.number[property];
                  } else {
                      itemFactor.unit.number = item.number(method, distance, { client, designer, project, contractAmount, vatRatio, freeRatio, distancePercentage });
                  }
              } else {
                  itemFactor.unit.number = item.number(method, distance, { client, designer, project, contractAmount, vatRatio, freeRatio, distancePercentage });
              }

              // 여행 경비 항목의 경우, 커미션을 다시 계산합니다.
              if (property === "travelExpenses") {
                  tempCommission = (tempCommission / distance.number) * itemFactor.unit.number;
              }

              // 항목의 순수 금액과 커미션을 계산하여 설정합니다.
              itemFactor.amount.pure = Math.floor(itemFactor.unit.price * itemFactor.unit.number);
              itemFactor.amount.commission = tempCommission;

              // 계산된 항목을 응답 객체에 추가합니다.
              responseObject.items.push(equalJson(JSON.stringify(itemFactor)));
              commentsArr = commentsArr.concat(item.comments);
          }

      } else {
          // customAmount가 정의된 경우, 이를 사용하여 항목 행렬을 생성합니다.
          itemMatrix = thisResponse.item(option.customAmount, { client, designer, project, contractAmount, vatRatio, freeRatio, distancePercentage });
          commentsArr = thisResponse.comments;

          // 각 항목에 대해 필요한 정보를 설정하고 계산합니다.
          for (let [ property, thisAmount ] of itemMatrix) {
              await sleep(100); // 각 항목 사이에 지연 시간을 추가합니다.
              if (designerCalculation[property] === undefined) {
                  throw new Error("item property error");
              }
              item = designerCalculation[property];
              itemFactor = this.returnBillDummies("responseItems");
              itemFactor.id = bilid + item.id;
              itemFactor.class = property;
              itemFactor.name = item.name;
              itemFactor.description = item.description;
              itemFactor.unit.ea = item.ea;

              // 소비자가액 모드일 경우, 소비자가액에서 VAT를 제외한 금액으로 설정합니다.
              if (option.consumerMode === true) {
                  thisAmount = thisAmount - Math.floor(thisAmount * (1 / ((1 + vatRatio) * 10)));
              }

              // customSub 옵션이 정의된 경우, 추가된 옵션을 포함한 계산 객체를 설정합니다.
              if (typeof option.customSub === "object" && option.customSub !== null) {
                  optionObject = { client, designer, project, contractAmount, vatRatio, freeRatio, ...option.customSub };
              } else {
                  optionObject = { client, designer, project, contractAmount, vatRatio, freeRatio };
              }

              // 항목의 계산된 값들을 임시 객체에 저장합니다.
              tempObject = item.amount(thisAmount, optionObject);
              tempAmount = tempObject.amount;
              tempCommission = tempObject.commission;
              itemFactor.unit.price = tempAmount;

              // 항목의 개수를 설정합니다.
              if (typeof option.number === "object" && option.number !== null) {
                  if (typeof option.number[property] === "number") {
                      itemFactor.unit.number = option.number[property];
                  } else {
                      itemFactor.unit.number = item.number(optionObject);
                  }
              } else {
                  itemFactor.unit.number = item.number(optionObject);
              }

              // 항목의 순수 금액과 커미션을 계산하여 설정합니다.
              itemFactor.amount.pure = Math.floor(itemFactor.unit.price * itemFactor.unit.number);
              itemFactor.amount.commission = tempCommission;

              // 계산된 항목을 응답 객체에 추가합니다.
              responseObject.items.push(equalJson(JSON.stringify(itemFactor)));
              commentsArr = commentsArr.concat(item.comments);
          }
      }

      // 응답 객체에 이름과 주석을 추가합니다.
      responseObject.name = thisResponse.name;
      for (let c of commentsArr) {
          responseObject.comments.push(c);
      }

      // 응답 대상(target)을 설정합니다.
      responseObject.target = thisResponse.target(client, designer, project, method, typeof option.customSub === "object" ? option.customSub : null);

      // 기존 응답 배열에 새 응답을 추가합니다.
      tempArr = thisBill.responses.toNormal();
      tempArr.unshift(responseObject);
      whereQuery = { bilid };
      updateQuery = {};
      updateQuery["responses"] = equalJson(JSON.stringify(tempArr));

      // MongoDB에 업데이트를 수행합니다.
      await this.updateBill([ whereQuery, updateQuery ], { selfMongo: MONGOC });

      // selfBoo가 false인 경우, MongoDB 연결을 종료합니다.
      if (!selfBoo) {
          await MONGOC.close();
      }

  } catch (e) {
      // 오류가 발생한 경우, 콘솔에 오류 메시지를 출력합니다.
      console.log(e);
  }
}

/**
 * BillMaker 클래스의 responseEjection 메서드는 특정 청구서에서 응답(response)을 제거하는 비동기 함수입니다.
 * 이 함수는 주어진 청구서 ID와 응답 인덱스 또는 ID를 기반으로 응답을 삭제하고, 변경된 청구서를 MongoDB에 업데이트합니다.
 * @param {string} bilid - 응답을 제거할 청구서의 ID입니다.
 * @param {number|string} responseIndex - 제거할 응답의 인덱스(숫자) 또는 ID(문자열)입니다.
 * @param {object} [option={ selfMongo: null }] - 추가 옵션 객체로, selfMongo를 통해 기존 MongoDB 연결을 재사용할 수 있습니다.
 * @returns {Promise<void>} 함수는 데이터를 업데이트하고 종료됩니다. 오류가 발생할 경우 콘솔에 오류 메시지를 출력합니다.
 * @throws {Error} 입력이 유효하지 않은 경우 예외를 발생시킵니다.
 */
BillMaker.prototype.responseEjection = async function (bilid, responseIndex, option = { selfMongo: null }) {
  // bilid가 문자열이 아닌 경우, 오류를 발생시킵니다.
  if (typeof bilid !== "string") {
      throw new Error("invaild input");
  }

  let mode, thisId; // 모드와 현재 청구서 ID를 저장할 변수를 선언합니다.

  // bilid가 특정 형식을 따른 경우(언더바로 구분된 세 부분), ID 기반 모드로 전환합니다.
  if (bilid.split("_").length === 3) {
      mode = "id"; // 모드를 "id"로 설정합니다.
      option = responseIndex; // responseIndex를 옵션으로 간주합니다.
      thisId = bilid; // thisId에 원래 bilid를 저장합니다.
      bilid = thisId.split("_").slice(0, 2).join("_"); // bilid를 앞부분만 남기고 재설정합니다.
  } else {
      // 그렇지 않으면 인덱스 기반 모드로 처리합니다.
      if (typeof responseIndex !== "number") {
          throw new Error("invaild input");
      }
      mode = "index"; // 모드를 "index"로 설정합니다.
  }

  // 현재 BillMaker 인스턴스를 instance 변수에 할당합니다.
  const instance = this;

  // Mother 클래스에서 필요한 모듈과 함수를 추출합니다.
  // mongo는 MongoDB와의 연결을 관리하는 모듈, mongoinfo는 연결 정보, equalJson은 객체를 비교하는 함수입니다.
  const { mongo, mongoinfo, equalJson } = this.mother;

  try {
      let MONGOC; // MongoDB 연결 객체를 저장할 변수를 선언합니다.
      let selfBoo; // selfMongo 옵션의 존재 여부를 확인하는 불리언 변수를 선언합니다.
      let thisBill; // 현재 청구서 객체를 저장할 변수를 선언합니다.
      let tempArr, finalArr; // 임시 배열과 최종 배열을 저장할 변수를 선언합니다.
      let whereQuery, updateQuery; // MongoDB 업데이트에 사용될 쿼리를 저장할 변수를 선언합니다.

      // selfMongo 옵션이 정의되지 않았거나 null인 경우, selfBoo를 false로 설정합니다.
      if (option.selfMongo === undefined || option.selfMongo === null) {
          selfBoo = false;
      } else {
          selfBoo = true; // selfMongo 옵션이 존재하면 selfBoo를 true로 설정합니다.
      }

      // selfBoo가 false인 경우, 새로운 MongoDB 연결을 생성하고 연결합니다.
      if (!selfBoo) {
          MONGOC = new mongo(mongoinfo);
          await MONGOC.connect(); // MongoDB에 연결을 시도합니다.
      } else {
          // selfBoo가 true인 경우, 기존 MongoDB 연결을 사용합니다.
          MONGOC = option.selfMongo;
      }

      // 청구서 ID를 사용하여 해당 청구서를 MongoDB에서 가져옵니다.
      thisBill = await this.getBillById(bilid, { selfMongo: MONGOC });
      if (thisBill === null) {
          throw new Error("invaild bilid");
      }

      // 현재 청구서의 응답 배열을 일반 배열로 변환합니다.
      tempArr = thisBill.responses.toNormal();

      // 모드가 "index"인 경우, 주어진 인덱스의 응답을 제거합니다.
      if (mode === "index") {
          tempArr.splice(responseIndex, 1); // 해당 인덱스의 응답을 배열에서 제거합니다.
          finalArr = equalJson(JSON.stringify(tempArr)); // 최종 배열을 JSON 문자열로 변환하여 저장합니다.
      } else {
          // 모드가 "id"인 경우, 주어진 ID와 일치하지 않는 응답만을 남깁니다.
          finalArr = [];
          for (let obj of tempArr) {
              if (obj.id !== thisId) {
                  finalArr.push(obj); // ID가 일치하지 않는 객체만 최종 배열에 추가합니다.
              }
          }
      }

      // MongoDB 업데이트 쿼리를 구성합니다.
      whereQuery = { bilid };
      updateQuery = {};
      updateQuery["responses"] = finalArr;

      // 청구서의 응답 배열을 업데이트합니다.
      await this.updateBill([ whereQuery, updateQuery ], { selfMongo: MONGOC });

      // selfBoo가 false인 경우, MongoDB 연결을 종료합니다.
      if (!selfBoo) {
          await MONGOC.close();
      }

  } catch (e) {
      // 오류가 발생한 경우, 콘솔에 오류 메시지를 출력합니다.
      console.log(e);
  }
}

/**
 * BillMaker 클래스의 itemInjection 메서드는 특정 청구서의 요청(request) 또는 응답(response)에 항목(item)을 추가하는 비동기 함수입니다.
 * 이 함수는 주어진 ID, 항목 키(itemKey), 그리고 관련된 프로젝트, 클라이언트, 디자이너 정보를 기반으로 항목을 생성하고,
 * 이를 MongoDB에 업데이트합니다.
 * @param {string} id - 항목을 추가할 요청 또는 응답의 ID입니다.
 * @param {string} itemKey - 삽입할 항목의 키입니다.
 * @param {object} client - 클라이언트 정보 객체입니다.
 * @param {object} designer - 디자이너 정보 객체입니다.
 * @param {object} project - 프로젝트 정보 객체입니다.
 * @param {string} method - 결제 방식입니다.
 * @param {object} [option={ selfMongo: null }] - 추가 옵션 객체로, selfMongo를 통해 기존 MongoDB 연결을 재사용할 수 있습니다.
 * @returns {Promise<void>} 함수는 항목을 삽입하고 종료됩니다. 오류가 발생할 경우 콘솔에 오류 메시지를 출력합니다.
 * @throws {Error} 유효하지 않은 ID 또는 itemKey가 입력된 경우 예외를 발생시킵니다.
 */
BillMaker.prototype.itemInjection = async function (id, itemKey, client, designer, project, method, option = { selfMongo: null }) {
  // 입력된 id와 itemKey가 문자열인지 확인하고, 유효하지 않으면 오류를 발생시킵니다.
  if (typeof id !== "string" || typeof itemKey !== "string") {
      throw new Error("must be request or response id");
  }

  // id가 유효한 형식을 따르는지 확인하고, 유효하지 않으면 오류를 발생시킵니다.
  if (!/_/gi.test(id)) {
      throw new Error("must be request or response id");
  }
  if (!(id.split('_').length === 3 && /^[rs]/.test(id.split('_')[2]))) {
      throw new Error("must be request or response id");
  }

  // 현재 BillMaker 인스턴스를 instance 변수에 할당합니다.
  const instance = this;

  // Mother 클래스에서 필요한 모듈과 함수를 추출합니다.
  // mongo는 MongoDB와의 연결을 관리하는 모듈, mongoinfo는 연결 정보,
  // equalJson은 객체를 비교하는 함수, sleep은 비동기 작업을 잠시 지연시키는 함수입니다.
  const { mongo, mongoinfo, equalJson, sleep } = this.mother;

  // 청구서 ID를 설정합니다. ID에서 앞부분만 남기고 bilid를 재설정합니다.
  const bilid = id.split('_')[0] + "_" + id.split('_')[1];

  // toggle 변수는 요청인지 응답인지를 결정합니다. "r"로 시작하면 true, 그렇지 않으면 false입니다.
  const toggle = /^r/.test(id.split('_')[2]) ? true : false;

  // BillMaker.billDictionary에서 스타일링 항목과 계산 항목을 가져옵니다.
  const stylingItems = BillMaker.billDictionary.styling.goods;
  const stylingRequests = BillMaker.billDictionary.styling.requests;
  const designerCalculation = BillMaker.billDictionary.styling.calculation;
  const stylingResponses = BillMaker.billDictionary.styling.responses;
  const { contractAmount, vatRatio, freeRatio, distancePercentage } = BillMaker.billDictionary.styling.etc;

  try {
      let MONGOC; // MongoDB 연결 객체를 저장할 변수를 선언합니다.
      let feeObject; // 비용 객체를 저장할 변수를 선언합니다.
      let selfBoo; // selfMongo 옵션의 존재 여부를 확인하는 불리언 변수를 선언합니다.
      let thisBill; // 현재 청구서 객체를 저장할 변수를 선언합니다.
      let distance; // 거리 값을 저장할 변수를 선언합니다.
      let item; // 추가할 항목을 저장할 변수를 선언합니다.
      let targetR, targetIndex; // 타겟 요청 또는 응답과 그 인덱스를 저장할 변수를 선언합니다.
      let itemFactor; // 항목의 세부 정보를 저장할 변수를 선언합니다.
      let num; // 요청 또는 응답의 인덱스를 저장할 변수를 선언합니다.
      let amount; // 금액 값을 저장할 변수를 선언합니다.
      let whereQuery, updateQuery; // MongoDB 업데이트에 사용될 쿼리를 저장할 변수를 선언합니다.
      let itemsArr, commentsArr; // 항목 배열과 주석 배열을 저장할 변수를 선언합니다.
      let tempObject, tempAmount, tempCommission; // 임시 계산값을 저장할 변수를 선언합니다.

      // toggle 값에 따라 추가할 항목을 설정합니다.
      if (toggle) {
          // 요청(request) 모드일 때
          if (stylingItems[itemKey] === undefined) {
              throw new Error("invaild item key");
          }
          item = stylingItems[itemKey];
      } else {
          // 응답(response) 모드일 때
          if (designerCalculation[itemKey] === undefined) {
              throw new Error("invaild item key");
          }
          item = designerCalculation[itemKey];
      }

      // 프로젝트에서 해당 디자이너와 결제 방식에 맞는 비용 객체를 찾습니다.
      feeObject = null;
      for (let proposal of project.proposal.detail) {
          if (proposal.desid === designer.desid) {
              for (let obj of proposal.fee) {
                  if (obj.method === method) {
                      feeObject = obj;
                  }
              }
          }
      }

      // 유효한 feeObject가 없는 경우, 옵션에서 가져오거나 오류를 발생시킵니다.
      if (feeObject === null) {
          if (option.feeObject !== undefined && option.feeObject !== null && typeof option.feeObject === "object") {
              feeObject = option.feeObject;
          } else {
              throw new Error("cannot find fee object");
          }
      }
      distance = feeObject.distance;
      amount = feeObject.amount;

      // selfMongo 옵션이 정의되지 않았거나 null인 경우, selfBoo를 false로 설정합니다.
      if (option.selfMongo === undefined || option.selfMongo === null) {
          selfBoo = false;
      } else {
          selfBoo = true; // selfMongo 옵션이 존재하면 selfBoo를 true로 설정합니다.
      }

      // selfBoo가 false인 경우, 새로운 MongoDB 연결을 생성하고 연결합니다.
      if (!selfBoo) {
          MONGOC = new mongo(mongoinfo);
          await MONGOC.connect(); // MongoDB에 연결을 시도합니다.
      } else {
          // selfBoo가 true인 경우, 기존 MongoDB 연결을 사용합니다.
          MONGOC = option.selfMongo;
      }

      // 청구서 ID를 사용하여 해당 청구서를 MongoDB에서 가져옵니다.
      thisBill = await this.getBillById(bilid, { selfMongo: MONGOC });
      if (thisBill === null) {
          throw new Error("invaild bilid");
      }

      // 요청 또는 응답을 찾아 targetR과 targetIndex에 저장합니다.
      targetR = null;
      num = 0;
      if (toggle) {
          // 요청(request) 모드일 때
          for (let obj of thisBill.requests) {
              if (id === obj.id) {
                  targetR = obj;
                  targetIndex = num;
              }
              num++;
          }
      } else {
          // 응답(response) 모드일 때
          for (let obj of thisBill.responses) {
              if (id === obj.id) {
                  targetR = obj;
                  targetIndex = num;
              }
              num++;
          }
      }
      if (targetR === null) {
          throw new Error("invaild request or response id");
      }

      // 타겟 요청 또는 응답의 항목 배열과 주석 배열을 가져옵니다.
      itemsArr = targetR.items.toNormal();
      commentsArr = targetR.comments.toNormal();

      // 추가할 항목의 세부 정보를 설정합니다.
      if (toggle) {
          // 요청(request) 모드일 때
          itemFactor = this.returnBillDummies("items");
          itemFactor.id = bilid + item.id;
          itemFactor.class = itemKey;
          itemFactor.name = item.name;
          itemFactor.description = item.description;
          itemFactor.unit.ea = item.ea;
          itemFactor.unit.price = Math.round(item.amount(method, amount, distance, { client, designer, project, contractAmount, vatRatio, freeRatio, distancePercentage }));
          if (typeof option.number === "number") {
              itemFactor.unit.number = option.number;
          } else {
              itemFactor.unit.number = item.number(method, distance, { client, designer, project, contractAmount, vatRatio, freeRatio, distancePercentage });
          }
          itemFactor.amount.supply = Math.round(itemFactor.unit.price * itemFactor.unit.number);
          itemFactor.amount.vat = Math.round(itemFactor.amount.supply * vatRatio);
          itemFactor.amount.consumer = Math.round(itemFactor.amount.supply * (1 + vatRatio));
      } else {
          // 응답(response) 모드일 때
          itemFactor = this.returnBillDummies("responseItems");
          itemFactor.id = bilid + item.id;
          itemFactor.class = itemKey;
          itemFactor.name = item.name;
          itemFactor.description = item.description;
          itemFactor.unit.ea = item.ea;
          tempObject = item.amount(method, amount, distance, { client, designer, project, contractAmount, vatRatio, freeRatio, distancePercentage });
          tempAmount = tempObject.amount;
          tempCommission = tempObject.commission;
          itemFactor.unit.price = tempAmount;
          if (typeof option.number === "number") {
              itemFactor.unit.number = option.number;
          } else {
              itemFactor.unit.number = item.number(method, distance, { client, designer, project, contractAmount, vatRatio, freeRatio, distancePercentage });
          }
          itemFactor.amount.pure = Math.floor(itemFactor.unit.price * itemFactor.unit.number);
          itemFactor.amount.commission = tempCommission;
      }

      // 항목을 항목 배열에 추가하고, 주석 배열에 주석을 추가합니다.
      itemsArr.push(equalJson(JSON.stringify(itemFactor)));
      for (let c of item.comments) {
          if (!commentsArr.includes(c)) {
              commentsArr.push(c);
          }
      }

      // MongoDB 업데이트 쿼리를 구성합니다.
      whereQuery = { bilid };
      updateQuery = {};
      updateQuery[(toggle ? "requests." : "responses.") + String(targetIndex) + ".items"] = equalJson(JSON.stringify(itemsArr));
      updateQuery[(toggle ? "requests." : "responses.") + String(targetIndex) + ".comments"] = equalJson(JSON.stringify(commentsArr));

      // 청구서의 요청 또는 응답 배열을 업데이트합니다.
      await this.updateBill([ whereQuery, updateQuery ], { selfMongo: MONGOC });

      // selfBoo가 false인 경우, MongoDB 연결을 종료합니다.
      if (!selfBoo) {
          await MONGOC.close();
      }

  } catch (e) {
      // 오류가 발생한 경우, 콘솔에 오류 메시지를 출력합니다.
      console.log(e);
  }
}

/**
 * BillMaker 클래스의 itemEjection 메서드는 특정 청구서의 요청(request) 또는 응답(response)에서 항목(item)을 제거하는 비동기 함수입니다.
 * 이 함수는 주어진 ID와 항목 키(itemKey)를 기반으로 해당 항목을 삭제하고, 변경된 청구서를 MongoDB에 업데이트합니다.
 * @param {string} id - 항목을 제거할 요청 또는 응답의 ID입니다.
 * @param {string} itemKey - 제거할 항목의 키입니다.
 * @param {object} [option={ selfMongo: null }] - 추가 옵션 객체로, selfMongo를 통해 기존 MongoDB 연결을 재사용할 수 있습니다.
 * @returns {Promise<void>} 함수는 항목을 제거하고 종료됩니다. 오류가 발생할 경우 콘솔에 오류 메시지를 출력합니다.
 * @throws {Error} 유효하지 않은 ID 또는 itemKey가 입력된 경우 예외를 발생시킵니다.
 */
BillMaker.prototype.itemEjection = async function (id, itemKey, option = { selfMongo: null }) {
  // id와 itemKey가 문자열인지 확인하고, 유효하지 않으면 오류를 발생시킵니다.
  if (typeof id !== "string" || typeof itemKey !== "string") {
      throw new Error("must be request or response id");
  }

  // id가 유효한 형식을 따르는지 확인하고, 유효하지 않으면 오류를 발생시킵니다.
  if (!/_/gi.test(id)) {
      throw new Error("must be request or response id");
  }
  if (!(id.split('_').length === 3 && /^[rs]/.test(id.split('_')[2]))) {
      throw new Error("must be request or response id");
  }

  // 현재 BillMaker 인스턴스를 instance 변수에 할당합니다.
  const instance = this;

  // Mother 클래스에서 필요한 모듈과 함수를 추출합니다.
  // mongo는 MongoDB와의 연결을 관리하는 모듈, mongoinfo는 연결 정보, equalJson은 객체를 비교하는 함수, sleep은 비동기 작업을 잠시 지연시키는 함수입니다.
  const { mongo, mongoinfo, equalJson, sleep } = this.mother;

  // 청구서 ID를 설정합니다. ID에서 앞부분만 남기고 bilid를 재설정합니다.
  const bilid = id.split('_')[0] + "_" + id.split('_')[1];

  // toggle 변수는 요청인지 응답인지를 결정합니다. "r"로 시작하면 true, 그렇지 않으면 false입니다.
  const toggle = /^r/.test(id.split('_')[2]) ? true : false;

  // BillMaker.billDictionary에서 스타일링 항목과 계산 항목을 가져옵니다.
  const stylingItems = BillMaker.billDictionary.styling.goods;
  const stylingRequests = BillMaker.billDictionary.styling.requests;
  const designerCalculation = BillMaker.billDictionary.styling.calculation;
  const stylingResponses = BillMaker.billDictionary.styling.responses;

  try {
      let MONGOC; // MongoDB 연결 객체를 저장할 변수를 선언합니다.
      let selfBoo; // selfMongo 옵션의 존재 여부를 확인하는 불리언 변수를 선언합니다.
      let thisBill; // 현재 청구서 객체를 저장할 변수를 선언합니다.
      let item; // 제거할 항목을 저장할 변수를 선언합니다.
      let targetR, targetIndex; // 타겟 요청 또는 응답과 그 인덱스를 저장할 변수를 선언합니다.
      let num; // 요청 또는 응답의 인덱스를 저장할 변수를 선언합니다.
      let whereQuery, updateQuery; // MongoDB 업데이트에 사용될 쿼리를 저장할 변수를 선언합니다.
      let itemsArr, commentsArr; // 항목 배열과 주석 배열을 저장할 변수를 선언합니다.
      let newItemArr, newCommentsArr; // 새로운 항목 배열과 주석 배열을 저장할 변수를 선언합니다.

      // toggle 값에 따라 제거할 항목을 설정합니다.
      if (toggle) {
          // 요청(request) 모드일 때
          if (stylingItems[itemKey] === undefined) {
              throw new Error("invaild item key");
          }
          item = stylingItems[itemKey];
      } else {
          // 응답(response) 모드일 때
          if (designerCalculation[itemKey] === undefined) {
              throw new Error("invaild item key");
          }
          item = designerCalculation[itemKey];
      }

      // selfMongo 옵션이 정의되지 않았거나 null인 경우, selfBoo를 false로 설정합니다.
      if (option.selfMongo === undefined || option.selfMongo === null) {
          selfBoo = false;
      } else {
          selfBoo = true; // selfMongo 옵션이 존재하면 selfBoo를 true로 설정합니다.
      }

      // selfBoo가 false인 경우, 새로운 MongoDB 연결을 생성하고 연결합니다.
      if (!selfBoo) {
          MONGOC = new mongo(mongoinfo);
          await MONGOC.connect(); // MongoDB에 연결을 시도합니다.
      } else {
          // selfBoo가 true인 경우, 기존 MongoDB 연결을 사용합니다.
          MONGOC = option.selfMongo;
      }

      // 청구서 ID를 사용하여 해당 청구서를 MongoDB에서 가져옵니다.
      thisBill = await this.getBillById(bilid, { selfMongo: MONGOC });
      if (thisBill === null) {
          throw new Error("invaild bilid");
      }

      // 요청 또는 응답을 찾아 targetR과 targetIndex에 저장합니다.
      targetR = null;
      num = 0;
      if (toggle) {
          // 요청(request) 모드일 때
          for (let obj of thisBill.requests) {
              if (id === obj.id) {
                  targetR = obj;
                  targetIndex = num;
              }
              num++;
          }
      } else {
          // 응답(response) 모드일 때
          for (let obj of thisBill.responses) {
              if (id === obj.id) {
                  targetR = obj;
                  targetIndex = num;
              }
              num++;
          }
      }
      if (targetR === null) {
          throw new Error("invaild request or response id");
      }

      // 타겟 요청 또는 응답의 항목 배열과 주석 배열을 가져옵니다.
      itemsArr = targetR.items.toNormal();
      commentsArr = targetR.comments.toNormal();

      // 항목 배열에서 제거할 항목을 제외한 새로운 항목 배열을 생성합니다.
      newItemArr = [];
      for (let i of itemsArr) {
          if (i.class !== itemKey) {
              newItemArr.push(i);
          }
      }

      // 주석 배열에서 제거할 항목의 주석을 제외한 새로운 주석 배열을 생성합니다.
      newCommentsArr = [];
      for (let i of commentsArr) {
          if (!item.comments.includes(i)) {
              newCommentsArr.push(i);
          }
      }

      // MongoDB 업데이트 쿼리를 구성합니다.
      whereQuery = { bilid };
      updateQuery = {};
      updateQuery[(toggle ? "requests." : "responses.") + String(targetIndex) + ".items"] = newItemArr;
      updateQuery[(toggle ? "requests." : "responses.") + String(targetIndex) + ".comments"] = newCommentsArr;

      // 청구서의 요청 또는 응답 배열을 업데이트합니다.
      await this.updateBill([ whereQuery, updateQuery ], { selfMongo: MONGOC });

      // selfBoo가 false인 경우, MongoDB 연결을 종료합니다.
      if (!selfBoo) {
          await MONGOC.close();
      }

  } catch (e) {
      // 오류가 발생한 경우, 콘솔에 오류 메시지를 출력합니다.
      console.log(e);
  }
}

/**
 * BillMaker 클래스의 passiveSync 메서드는 특정 청구서의 요청(request)에 대해 결제 정보를 동기화하는 비동기 함수입니다.
 * 이 함수는 주어진 청구서 ID, 클라이언트 이름, 요청 번호, 결제 금액, 결제 날짜, 결제 방법, 결제 증명을 기반으로 
 * 결제 상태를 업데이트하고, MongoDB에 저장합니다.
 * @param {string} bilid - 결제 정보를 동기화할 청구서의 ID입니다.
 * @param {string} clientName - 결제를 진행한 클라이언트의 이름입니다.
 * @param {number} requestNumber - 동기화할 요청의 인덱스 번호입니다.
 * @param {number} amount - 결제된 금액입니다.
 * @param {Date} payDate - 결제된 날짜입니다.
 * @param {string} method - 결제 방법입니다 (예: "CARD", "CASH").
 * @param {string} proof - 결제 증명 정보입니다.
 * @param {object} [option={ selfMongo: null }] - 추가 옵션 객체로, selfMongo를 통해 기존 MongoDB 연결을 재사용할 수 있습니다.
 * @returns {Promise<string>} 결제가 완료되었을 경우 "done" 문자열을 반환합니다.
 * @throws {Error} 입력이 유효하지 않은 경우 예외를 발생시킵니다.
 */
BillMaker.prototype.passiveSync = async function (bilid, clientName, requestNumber, amount, payDate, method, proof, option = { selfMongo: null }) {
  // 함수 인자들이 유효한 타입인지 확인하고, 유효하지 않으면 오류를 발생시킵니다.
  if (typeof bilid !== "string" || typeof clientName !== "string") {
      throw new Error("invaild input");
  }
  if (typeof requestNumber !== "number" || typeof amount !== "number") {
      throw new Error("invaild input");
  }
  if (!(payDate instanceof Date)) {
      throw new Error("invaild input");
  }
  if (typeof method !== "string" || typeof proof !== "string") {
      throw new Error("invaild input");
  }

  // 현재 BillMaker 인스턴스를 instance 변수에 할당합니다.
  const instance = this;

  // Mother 클래스에서 필요한 모듈과 함수를 추출합니다.
  // mongo는 MongoDB와의 연결을 관리하는 모듈, mongoinfo는 연결 정보,
  // equalJson은 객체를 비교하는 함수입니다.
  const { mongo, mongoinfo, equalJson } = this.mother;

  // 주소 정보(address)를 가져옵니다.
  const address = this.address;

  let selfMongo, selfBoo; // MongoDB 연결 객체와 selfMongo 옵션 여부를 확인하는 변수를 선언합니다.

  // selfMongo 옵션이 정의되지 않았거나 null인 경우, 새로운 MongoDB 연결을 생성합니다.
  if (option.selfMongo === undefined || option.selfMongo === null) {
      selfMongo = new mongo(mongoinfo);
      selfBoo = false; // selfMongo가 새로 생성되었음을 나타냅니다.
  } else {
      // selfMongo 옵션이 존재하면 기존 MongoDB 연결을 사용합니다.
      selfMongo = option.selfMongo;
      selfBoo = true; // 기존 MongoDB 연결을 사용 중임을 나타냅니다.
  }

  try {
      // selfBoo가 false인 경우, MongoDB 연결을 시작합니다.
      if (!selfBoo) {
          await selfMongo.connect();
      }

      let whereQuery, updateQuery; // MongoDB 업데이트에 사용될 쿼리를 저장할 변수를 선언합니다.
      let itemArr, payArr, cancelArr; // 요청의 항목, 결제, 취소 정보를 저장할 배열을 선언합니다.
      let infoArr; // 요청의 정보 배열을 저장할 변수를 선언합니다.
      let payObject; // 새로 추가할 결제 객체를 저장할 변수를 선언합니다.
      let proofs; // 결제 증명 객체를 저장할 변수를 선언합니다.
      let thisBill; // 현재 청구서 객체를 저장할 변수를 선언합니다.

      // 청구서 ID를 사용하여 해당 청구서를 MongoDB에서 가져옵니다.
      thisBill = await this.getBillById(bilid, { selfMongo });

      // whereQuery는 청구서를 식별하는 쿼리입니다.
      whereQuery = { bilid };
      updateQuery = {}; // 업데이트할 쿼리를 초기화합니다.

      // 기존의 요청 정보 배열을 가져와 equalJson으로 비교합니다.
      infoArr = equalJson(JSON.stringify(thisBill.requests[Number(requestNumber)].info));

      // 새로운 결제 정보를 요청 정보 배열의 맨 앞에 추가합니다.
      infoArr.unshift({
          data: {
              "mid": address.officeinfo.inicis.mid,
              "tid": "",
              "TotPrice": amount,
              "MOID": "",
              "payMethod": (/card/gi.test(method) || /카드/gi.test(method)) ? "CARD" : "CASH",
              "vactBankName": method,
              "P_FN_NM": method
          }
      });

      // 업데이트할 요청 정보 배열을 updateQuery에 추가합니다.
      updateQuery["requests." + String(requestNumber) + ".info"] = infoArr;

      // 기존의 요청 항목 배열을 가져와 equalJson으로 비교합니다.
      itemArr = equalJson(JSON.stringify(thisBill.requests[Number(requestNumber)].items));

      // 기존의 결제 및 취소 배열을 가져와 equalJson으로 비교합니다.
      payArr = equalJson(JSON.stringify(thisBill.requests[Number(requestNumber)].pay));
      cancelArr = equalJson(JSON.stringify(thisBill.requests[Number(requestNumber)].cancel));

      // 새 결제 객체를 생성합니다.
      payObject = this.returnBillDummies("pay");
      payObject.date = payDate;
      payObject.amount = amount;
      payObject.oid = "";

      // 결제 배열의 맨 앞에 새 결제 객체를 추가합니다.
      payArr.unshift(payObject);

      // 결제가 완료되었음을 표시하기 위해 요청의 상태를 업데이트합니다.
      updateQuery["requests." + String(requestNumber) + ".status"] = "결제 완료";
      updateQuery["requests." + String(requestNumber) + ".pay"] = payArr;

      // 결제 증명 객체를 생성합니다.
      proofs = this.returnBillDummies("proofs");
      proofs.date = payDate;
      proofs.method = method;
      proofs.proof = proof;
      proofs.to = clientName;

      // 결제 증명 배열의 맨 앞에 새 증명 객체를 추가합니다.
      thisBill.requests[Number(requestNumber)].proofs.unshift(proofs);

      // 업데이트할 결제 증명 배열을 updateQuery에 추가합니다.
      updateQuery["requests." + String(requestNumber) + ".proofs"] = thisBill.requests[Number(requestNumber)].proofs;

      // MongoDB에 업데이트를 수행합니다.
      await this.updateBill([ whereQuery, updateQuery ], { selfMongo });

      return "done"; // 성공적으로 완료되었음을 반환합니다.
  } catch (e) {
      // 오류가 발생한 경우, 콘솔에 오류 메시지를 출력합니다.
      console.log(e);
  } finally {
      // selfBoo가 false인 경우, MongoDB 연결을 종료합니다.
      if (!selfBoo) {
          await selfMongo.close();
      }
  }
}

/**
 * BillMaker 클래스의 passiveSyncAll 메서드는 모든 프로젝트의 계약 및 잔금 정보를 동기화하는 비동기 함수입니다.
 * 이 함수는 각 프로젝트의 청구서를 조회하고, 결제 상태가 아직 업데이트되지 않은 경우 passiveSync 메서드를 호출하여 동기화합니다.
 * @returns {Promise<object>} 동기화된 청구서 ID들을 포함한 로그 객체를 반환합니다.
 * @throws {Error} 동기화 중 오류가 발생한 경우 예외를 발생시킵니다.
 */
BillMaker.prototype.passiveSyncAll = async function () {
  // 현재 BillMaker 인스턴스를 instance 변수에 할당합니다.
  const instance = this;
  // 백엔드 관련 기능을 수행하는 back 객체를 this에서 가져옵니다.
  const back = this.back;

  // Mother 클래스에서 필요한 모듈과 함수를 추출합니다.
  // mongo는 MongoDB와의 연결을 관리하는 모듈, mongoinfo는 연결 정보입니다.
  const { mongo, mongoinfo } = this.mother;

  // MongoDB 연결 객체를 생성합니다.
  const MONGOC = new mongo(mongoinfo);
  const MONGOPYTHONC = new mongo(mongoinfo);

  try {
      // MongoDB에 연결을 시도합니다.
      await MONGOC.connect();
      await MONGOPYTHONC.connect();

      const selfMongo = MONGOC;
      const selfPythonMongo = MONGOPYTHONC;

      let projects; // 동기화할 프로젝트 리스트를 저장할 변수를 선언합니다.
      let thisBills, thisBill; // 현재 처리 중인 청구서 리스트와 청구서를 저장할 변수를 선언합니다.
      let whereQuery; // MongoDB에서 청구서를 조회할 쿼리를 저장할 변수를 선언합니다.
      let client; // 클라이언트 정보를 저장할 변수를 선언합니다.
      let method; // 결제 방법을 저장할 변수를 선언합니다.
      let bilid; // 청구서 ID를 저장할 변수를 선언합니다.
      let bilidLog; // 동기화된 청구서 ID들을 로그로 저장할 변수를 선언합니다.
      let proof; // 결제 증명 정보를 저장할 변수를 선언합니다.
      let requestNumber; // 요청의 번호를 저장할 변수를 선언합니다.

      // 동기화된 청구서 ID들을 로그로 저장할 객체를 초기화합니다.
      bilidLog = {
          contract: [], // 계약 관련 청구서 ID를 저장합니다.
          left: [], // 잔금 관련 청구서 ID를 저장합니다.
      };

      // 첫 번째 쿼리: 계약 관련 청구서를 가져옵니다.
      projects = await back.getProjectsByQuery({
          $and: [
              { "desid": { $regex: "^d" } }, // 디자이너 ID가 'd'로 시작하는 프로젝트
              { "process.contract.first.date": { $gte: new Date(2000, 0, 1) } }, // 첫 계약 날짜가 2000년 이후인 프로젝트
              { "process.status": { $regex: "^[대진홀]" } } // 특정 상태를 가진 프로젝트
          ]
      }, { selfMongo });

      // 계약 관련 프로젝트들에 대해 반복 작업을 수행합니다.
      for (let project of projects) {
          whereQuery = {}; // 청구서를 조회할 쿼리를 초기화합니다.
          whereQuery["links.proid"] = project.proid;
          whereQuery["links.desid"] = project.desid;
          whereQuery["links.method"] = project.service.online ? "online" : "offline";

          // 해당 프로젝트에 관련된 청구서를 조회합니다.
          thisBills = await this.getBillsByQuery(whereQuery, { selfMongo: selfPythonMongo });
          // 프로젝트에 관련된 클라이언트 정보를 조회합니다.
          client = await back.getClientById(project.cliid, { selfMongo });

          if (thisBills.length >= 1) {
              [thisBill] = thisBills;

              // 청구서에서 '계약'과 관련된 요청의 인덱스를 찾습니다.
              for (let i = 0; i < thisBill.requests.length; i++) {
                  if (/계약/gi.test(thisBill.requests[i].name)) {
                      requestNumber = i;
                      break;
                  }
              }

              // 해당 요청이 아직 결제되지 않은 경우, 결제 정보를 동기화합니다.
              if (thisBill.requests[requestNumber].pay.length === 0) {
                  bilid = thisBill.bilid;
                  method = project.process.contract.first.calculation.info.method.trim();
                  if (method === '' || method === '-') {
                      method = "계좌";
                  }
                  proof = project.process.contract.first.calculation.info.proof.trim();
                  if (proof === '' || proof === '-') {
                      if (/계좌/gi.test(method)) {
                          proof = "현금영수증";
                      } else if (/카드/gi.test(method)) {
                          proof = "이니시스";
                      } else {
                          proof = "현금영수증";
                      }
                  }

                  // 로그를 출력하고, passiveSync 메서드를 호출하여 결제 정보를 동기화합니다.
                  console.log(bilid, client.name, requestNumber, project.process.contract.first.calculation.amount, project.process.contract.first.date, method, proof);
                  await this.passiveSync(bilid, client.name, requestNumber, project.process.contract.first.calculation.amount, project.process.contract.first.date, method, proof, { selfMongo: selfPythonMongo });

                  // 동기화된 청구서 ID를 로그에 추가합니다.
                  bilidLog.contract.push(bilid);
              }
          }
      }

      // 두 번째 쿼리: 잔금 관련 청구서를 가져옵니다.
      projects = await back.getProjectsByQuery({
          $and: [
              { "desid": { $regex: "^d" } }, // 디자이너 ID가 'd'로 시작하는 프로젝트
              { "process.contract.remain.date": { $gte: new Date(2000, 0, 1) } }, // 잔금 계약 날짜가 2000년 이후인 프로젝트
              { "process.status": { $regex: "^[대진홀]" } } // 특정 상태를 가진 프로젝트
          ]
      }, { selfMongo });

      // 잔금 관련 프로젝트들에 대해 반복 작업을 수행합니다.
      for (let project of projects) {
          whereQuery = {}; // 청구서를 조회할 쿼리를 초기화합니다.
          whereQuery["links.proid"] = project.proid;
          whereQuery["links.desid"] = project.desid;
          whereQuery["links.method"] = project.service.online ? "online" : "offline";

          // 해당 프로젝트에 관련된 청구서를 조회합니다.
          thisBills = await this.getBillsByQuery(whereQuery, { selfMongo: selfPythonMongo });
          // 프로젝트에 관련된 클라이언트 정보를 조회합니다.
          client = await back.getClientById(project.cliid, { selfMongo });

          if (thisBills.length >= 1) {
              [thisBill] = thisBills;

              // 청구서에서 '잔금'과 관련된 요청의 인덱스를 찾습니다.
              for (let i = 0; i < thisBill.requests.length; i++) {
                  if (/잔금/gi.test(thisBill.requests[i].name)) {
                      requestNumber = i;
                      break;
                  }
              }

              // 해당 요청이 아직 결제되지 않은 경우, 결제 정보를 동기화합니다.
              if (thisBill.requests[requestNumber].pay.length === 0) {
                  bilid = thisBill.bilid;
                  method = project.process.contract.remain.calculation.info.method.trim();
                  if (method === '' || method === '-') {
                      method = "계좌";
                  }
                  proof = project.process.contract.remain.calculation.info.proof.trim();
                  if (proof === '' || proof === '-') {
                      if (/계좌/gi.test(method)) {
                          proof = "현금영수증";
                      } else if (/카드/gi.test(method)) {
                          proof = "이니시스";
                      } else {
                          proof = "현금영수증";
                      }
                  }

                  // 로그를 출력하고, passiveSync 메서드를 호출하여 결제 정보를 동기화합니다.
                  console.log(bilid, client.name, requestNumber, project.process.contract.remain.calculation.amount.consumer - project.process.contract.first.calculation.amount, project.process.contract.remain.date, method, proof);
                  await this.passiveSync(bilid, client.name, requestNumber, project.process.contract.remain.calculation.amount.consumer - project.process.contract.first.calculation.amount, project.process.contract.remain.date, method, proof, { selfMongo: selfPythonMongo });

                  // 동기화된 청구서 ID를 로그에 추가합니다.
                  bilidLog.left.push(bilid);
              }
          }
      }

      // 최종 로그를 출력합니다.
      console.log(bilidLog);

      // 동기화된 청구서 ID 로그 객체를 반환합니다.
      return bilidLog;

  } catch (e) {
      // 오류가 발생한 경우, 콘솔에 오류 메시지를 출력합니다.
      console.log(e);
  } finally {
      // MongoDB 연결을 종료합니다.
      await MONGOC.close();
      await MONGOPYTHONC.close();
  }
}

/**
 * BillMaker 클래스의 passiveCashReceipt 메서드는 특정 클라이언트에 대한 현금 영수증 발행을 처리하는 비동기 함수입니다.
 * 이 함수는 이니시스 API를 사용하여 클라이언트의 정보를 기반으로 현금 영수증을 발행하고, 요청을 전송합니다.
 * @param {string} cliid - 현금 영수증을 발행할 클라이언트의 ID입니다.
 * @param {string} goodName - 구매한 상품의 이름입니다.
 * @param {number} supply - 공급 금액입니다.
 * @returns {Promise<void>} 함수는 현금 영수증 발행을 요청하고 종료됩니다. 오류가 발생할 경우 콘솔에 오류 메시지를 출력합니다.
 * @throws {Error} 유효하지 않은 입력이 있는 경우 예외를 발생시킵니다.
 */
BillMaker.prototype.passiveCashReceipt = async function (cliid, goodName, supply) {
  // 현재 BillMaker 인스턴스를 instance 변수에 할당합니다.
  const instance = this;

  // Mother 클래스에서 필요한 모듈과 함수를 추출합니다.
  // cryptoString은 암호화된 문자열을 생성하는 함수,
  // requestSystem은 HTTP 요청을 처리하는 함수,
  // equalJson은 객체를 비교하는 함수입니다.
  const { cryptoString, requestSystem, equalJson } = this.mother;

  // back 객체를 통해 백엔드 관련 기능을 수행합니다.
  const back = this.back;

  // Node.js의 crypto 모듈을 가져옵니다.
  const crypto = require("crypto");

  // 이니시스 API의 URL과 요청에 필요한 헤더를 설정합니다.
  const url = "https://iniapi.inicis.com/api/v1/receipt";
  const headers = { "Content-type": "application/x-www-form-urlencoded;charset=utf-8" };

  // 날짜를 타임스탬프 형식으로 변환하는 유틸리티 함수입니다.
  const dateToTimestamp = (date) => {
      const zeroAddition = (num) => { return (num < 10 ? `0${String(num)}` : String(num)); };
      return `${String(date.getFullYear())}${zeroAddition(date.getMonth() + 1)}${zeroAddition(date.getDate())}${zeroAddition(date.getHours())}${zeroAddition(date.getMinutes())}${zeroAddition(date.getSeconds())}`;
  };

  try {
      // 클라이언트 ID를 사용하여 클라이언트 정보를 백엔드에서 가져옵니다.
      const client = await back.getClientById(cliid);
      const now = new Date(); // 현재 날짜와 시간을 가져옵니다.
      const type = "Issue"; // 현금 영수증 발행 타입을 설정합니다.
      const paymethod = "Receipt"; // 결제 방법을 현금 영수증으로 설정합니다.
      const timestamp = dateToTimestamp(new Date()); // 현재 시간을 타임스탬프로 변환합니다.
      const clientIp = address.officeinfo.ip.outer; // 클라이언트의 외부 IP 주소를 가져옵니다.
      const currency = "WON"; // 통화를 원화로 설정합니다.
      const useOpt = "0"; // 현금 영수증 옵션을 설정합니다.
      const algorithm = "aes-128-cbc"; // 암호화 알고리즘을 설정합니다.
      const digest = "base64"; // 암호화된 데이터의 출력 형식을 설정합니다.
      const sha = "sha512"; // 해시 알고리즘을 설정합니다.
      const hashType = "hex"; // 해시 데이터의 출력 형식을 설정합니다.
      const vatRatio = 0.1; // 부가가치세 비율을 설정합니다.
      const mid = address.officeinfo.inicis.mid; // 상점 ID를 가져옵니다.
      const srcvPrice = String(0); // 서비스 가격을 0으로 설정합니다 (필요한 경우 수정 가능).
      let crPrice; // 총 결제 금액을 저장할 변수를 선언합니다.
      let supPrice; // 공급 금액을 저장할 변수를 선언합니다.
      let tax; // 세금 금액을 저장할 변수를 선언합니다.
      let buyerName; // 구매자의 이름을 저장할 변수를 선언합니다.
      let buyerEmail; // 구매자의 이메일을 저장할 변수를 선언합니다.
      let buyerTel; // 구매자의 전화번호를 저장할 변수를 선언합니다.
      let regNum; // 암호화된 전화번호를 저장할 변수를 선언합니다.
      let hashData; // 해시된 데이터를 저장할 변수를 선언합니다.
      let requestObj; // API 요청 객체를 저장할 변수를 선언합니다.

      // 클라이언트 정보를 할당합니다.
      buyerName = client.name;
      buyerEmail = client.email;
      buyerTel = client.phone;

      // 공급 금액, 세금, 총 금액을 계산합니다.
      supPrice = String(Math.floor(supply));
      tax = String(Math.floor(supply * vatRatio));
      crPrice = String(Math.floor(supply + (supply * vatRatio)));

      // 클라이언트 전화번호를 암호화하여 등록 번호(regNum)를 생성합니다.
      regNum = await cryptoString(address.officeinfo.inicis.key, buyerTel.replace(/[^0-9]/gi, ''), { algorithm, makeKey: false, iv: address.officeinfo.inicis.iv, digest });

      // 해시 데이터를 생성하여 이니시스 API의 요청에 사용할 데이터의 무결성을 확인합니다.
      hashData = crypto.createHash(sha).update(address.officeinfo.inicis.key + type + paymethod + timestamp + clientIp + mid + crPrice + supPrice + srcvPrice + regNum).digest(hashType);

      // 이니시스 API에 전송할 요청 객체를 생성합니다.
      requestObj = {
          type,
          paymethod,
          timestamp,
          clientIp,
          mid,
          goodName,
          crPrice,
          supPrice,
          tax,
          srcvPrice,
          buyerName,
          buyerEmail,
          buyerTel,
          currency,
          regNum,
          useOpt,
          hashData
      };
      console.log(requestObj); // 생성된 요청 객체를 콘솔에 출력합니다.

      // requestSystem 함수를 사용하여 이니시스 API에 요청을 전송합니다.
      await requestSystem(url, requestObj, { headers });

  } catch (e) {
      // 오류가 발생한 경우, 콘솔에 오류 메시지를 출력합니다.
      console.log(e);
  }
}

/**
 * BillMaker 클래스의 travelInjection 메서드는 특정 프로젝트에 대해 여행 경비를 청구서에 추가하거나 갱신하는 비동기 함수입니다.
 * 이 함수는 요청된 여행 경비를 청구서에 삽입하거나 기존 청구서의 항목을 업데이트하여 MongoDB에 저장합니다.
 * @param {string} injectionCase - "request", "first", 또는 "remain" 중 하나로, 청구서에 삽입할 케이스를 지정합니다.
 * @param {string} proid - 프로젝트 ID로, 여행 경비를 삽입할 대상 프로젝트의 ID입니다.
 * @param {string} method - "offline" 또는 "online" 중 하나로, 청구서의 결제 방법을 지정합니다.
 * @param {number} number - 여행 경비에 해당하는 숫자 값으로, 0부터 20 사이의 값이어야 합니다.
 * @param {object} [option={ selfMongo: null, selfCoreMongo: null }] - 추가 옵션 객체로, selfMongo 및 selfCoreMongo를 통해 기존 MongoDB 연결을 재사용할 수 있습니다.
 * @returns {Promise<object>} 업데이트된 청구서 객체를 반환합니다.
 * @throws {Error} 유효하지 않은 입력이 있는 경우 예외를 발생시킵니다.
 */
BillMaker.prototype.travelInjection = async function (injectionCase, proid, method, number, option = { selfMongo: null, selfCoreMongo: null }) {
  // 입력된 매개변수들이 유효한지 확인합니다. 유효하지 않은 경우 오류를 발생시킵니다.
  if (typeof injectionCase !== "string" || typeof proid !== "string" || typeof method !== "string" || typeof number !== "number") {
      throw new Error("invaild input");
  }
  if (!([ "request", "first", "remain" ]).includes(injectionCase)) {
      throw new Error("injection case must be request or first or remain");
  }
  if (!/p[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]/.test(proid)) {
      throw new Error("invaild proid");
  }
  if (method !== "offline" && method !== "online") {
      throw new Error("invaild method");
  }
  if (number < 0 || 20 < number) {
      throw new Error("invaild travel number");
  }

  // 현재 BillMaker 인스턴스를 instance 변수에 할당합니다.
  const instance = this;

  // 백엔드 관련 기능을 수행하는 back 객체를 this에서 가져옵니다.
  const back = this.back;

  // Mother 클래스에서 필요한 모듈과 함수를 추출합니다.
  const { mongo, mongoinfo, equalJson, sleep } = this.mother;

  // BillMaker의 billDictionary에서 필요한 항목들을 가져옵니다.
  const stylingItems = BillMaker.billDictionary.styling.goods;
  const stylingRequests = BillMaker.billDictionary.styling.requests;
  const designerCalculation = BillMaker.billDictionary.styling.calculation;
  const stylingResponses = BillMaker.billDictionary.styling.responses;

  // 여행 경비와 관련된 키를 설정합니다.
  const itemKey = "travelExpenses";
  const requestKey = "travelPayment";
  const responseKey = "designerTravelFee";

  try {
      let MONGOC, MONGOCOREC; // MongoDB 연결 객체를 선언합니다.
      let selfBoo, selfCoreBoo; // selfMongo 및 selfCoreMongo 옵션 여부를 확인하는 변수를 선언합니다.
      let client, designer, project; // 클라이언트, 디자이너, 프로젝트 정보를 저장할 변수를 선언합니다.
      let thisBill, bilid; // 현재 처리 중인 청구서와 청구서 ID를 저장할 변수를 선언합니다.
      let targetIndex; // 목표 인덱스를 저장할 변수를 선언합니다.
      let updatedBill; // 업데이트된 청구서를 저장할 변수를 선언합니다.

      // selfMongo 옵션이 정의되지 않았거나 null인 경우, 새로운 MongoDB 연결을 생성합니다.
      if (option.selfMongo === undefined || option.selfMongo === null) {
          selfBoo = false;
      } else {
          selfBoo = true; // selfMongo 옵션이 존재하면 true로 설정합니다.
      }
      if (!selfBoo) {
          MONGOC = new mongo(mongoinfo);
          await MONGOC.connect(); // MongoDB에 연결을 시도합니다.
      } else {
          MONGOC = option.selfMongo;
      }

      // selfCoreMongo 옵션이 정의되지 않았거나 null인 경우, 새로운 MongoDB 연결을 생성합니다.
      if (option.selfCoreMongo === undefined || option.selfCoreMongo === null) {
          selfCoreBoo = false;
      } else {
          selfCoreBoo = true; // selfCoreMongo 옵션이 존재하면 true로 설정합니다.
      }
      if (!selfCoreBoo) {
          MONGOCOREC = new mongo(mongoinfo);
          await MONGOCOREC.connect(); // MongoDB에 연결을 시도합니다.
      } else {
          MONGOCOREC = option.selfCoreMongo;
      }

      // 프로젝트 ID를 사용하여 해당 프로젝트 정보를 백엔드에서 가져옵니다.
      project = await back.getProjectById(proid, { selfMongo: MONGOCOREC });
      if (project === null) {
          throw new Error("invaild proid");
      }
      if (!/^d/.test(project.desid)) {
          throw new Error("unable in this project");
      }

      // 디자이너와 클라이언트 정보를 가져옵니다.
      designer = await back.getDesignerById(project.desid, { selfMongo: MONGOCOREC });
      client = await back.getClientById(project.cliid, { selfMongo: MONGOCOREC });

      // 프로젝트와 관련된 청구서를 가져옵니다.
      thisBill = await this.getBillsByQuery({
          $and: [
              { "links.proid": project.proid },
              { "links.cliid": client.cliid },
              { "links.desid": designer.desid },
              { "links.method": method },
          ]
      }, { selfMongo: MONGOC });
      if (thisBill.length === 0) {
          throw new Error("cannot found bill");
      }
      thisBill = thisBill[0];
      bilid = thisBill.bilid;

      // injectionCase에 따라 처리 방식을 결정합니다.
      if (injectionCase === "request") {
          // request 케이스: 여행 경비 요청 및 디자이너 비용을 삽입합니다.
          await this.requestInjection(bilid, requestKey, client, designer, project, method, { selfMongo: MONGOC, number: { travelExpenses: number } });
          await this.responseInjection(bilid, responseKey, client, designer, project, method, { selfMongo: MONGOC, number: { travelExpenses: number } });

      } else {
          // first 또는 remain 케이스: 기존 항목을 갱신하고, 디자이너 비용을 삽입합니다.
          targetIndex = null;
          if (typeof option.index === "number" && thisBill.requests[option.index] !== undefined) {
              targetIndex = option.index;
          } else {
              for (let i = 0; i < thisBill.requests.length; i++) {
                  if (thisBill.requests[i].name.trim() === stylingRequests[injectionCase === "first" ? "firstPayment" : "secondPayment"].name) {
                      targetIndex = i;
                      break;
                  }
              }
          }
          if (targetIndex !== null) {
              // 기존 항목을 삭제하고 새로운 여행 경비 항목을 삽입합니다.
              await this.itemEjection(thisBill.requests[targetIndex].id, itemKey, { selfMongo: MONGOC });
              await this.itemInjection(thisBill.requests[targetIndex].id, itemKey, client, designer, project, method, { selfMongo: MONGOC, number });
          }
          // 디자이너의 여행 경비를 삽입합니다.
          await this.responseInjection(bilid, responseKey, client, designer, project, method, { selfMongo: MONGOC, number: { travelExpenses: number } });
      }

      // 업데이트된 청구서를 가져옵니다.
      updatedBill = await this.getBillById(thisBill.bilid, { selfMongo: MONGOC });

      // MongoDB 연결을 종료합니다.
      if (!selfBoo) {
          await MONGOC.close();
      }
      if (!selfCoreBoo) {
          await MONGOCOREC.close();
      }

      // 업데이트된 청구서를 반환합니다.
      return updatedBill;

  } catch (e) {
      // 오류가 발생한 경우, 콘솔에 오류 메시지를 출력합니다.
      console.log(e);
  }
}

/**
 * BillMaker 클래스의 travelEjection 메서드는 특정 프로젝트에 대해 여행 경비 항목을 청구서에서 삭제하는 비동기 함수입니다.
 * 이 함수는 요청된 여행 경비를 청구서에서 제거하고, 관련된 디자이너 비용도 함께 제거합니다.
 * @param {string} injectionCase - "request", "first", 또는 "remain" 중 하나로, 청구서에서 삭제할 케이스를 지정합니다.
 * @param {string} proid - 프로젝트 ID로, 여행 경비를 제거할 대상 프로젝트의 ID입니다.
 * @param {string} method - "offline" 또는 "online" 중 하나로, 청구서의 결제 방법을 지정합니다.
 * @param {number} index - 제거할 청구서 요청 항목의 인덱스입니다.
 * @param {object} [option={ selfMongo: null, selfCoreMongo: null }] - 추가 옵션 객체로, selfMongo 및 selfCoreMongo를 통해 기존 MongoDB 연결을 재사용할 수 있습니다.
 * @returns {Promise<object>} 업데이트된 청구서 객체를 반환합니다.
 * @throws {Error} 유효하지 않은 입력이 있는 경우 예외를 발생시킵니다.
 */
BillMaker.prototype.travelEjection = async function (injectionCase, proid, method, index, option = { selfMongo: null, selfCoreMongo: null }) {
  // 입력된 매개변수들이 유효한지 확인합니다. 유효하지 않은 경우 오류를 발생시킵니다.
  if (typeof injectionCase !== "string" || typeof proid !== "string" || typeof method !== "string" || typeof index !== "number") {
      throw new Error("invaild input");
  }
  if (!([ "request", "first", "remain" ]).includes(injectionCase)) {
      throw new Error("injection case must be request or first or remain");
  }
  if (!/p[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]/.test(proid)) {
      throw new Error("invaild proid");
  }
  if (method !== "offline" && method !== "online") {
      throw new Error("invaild method");
  }

  // 현재 BillMaker 인스턴스를 instance 변수에 할당합니다.
  const instance = this;

  // 백엔드 관련 기능을 수행하는 back 객체를 this에서 가져옵니다.
  const back = this.back;

  // Mother 클래스에서 필요한 모듈과 함수를 추출합니다.
  const { mongo, mongoinfo, equalJson, sleep } = this.mother;

  // BillMaker의 billDictionary에서 필요한 항목들을 가져옵니다.
  const stylingItems = BillMaker.billDictionary.styling.goods;
  const stylingRequests = BillMaker.billDictionary.styling.requests;
  const designerCalculation = BillMaker.billDictionary.styling.calculation;
  const stylingResponses = BillMaker.billDictionary.styling.responses;

  // 여행 경비와 관련된 키를 설정합니다.
  const itemKey = "travelExpenses";
  const requestKey = "travelPayment";
  const responseKey = "designerTravelFee";

  try {
      let MONGOC, MONGOCOREC; // MongoDB 연결 객체를 선언합니다.
      let selfBoo, selfCoreBoo; // selfMongo 및 selfCoreMongo 옵션 여부를 확인하는 변수를 선언합니다.
      let client, designer, project; // 클라이언트, 디자이너, 프로젝트 정보를 저장할 변수를 선언합니다.
      let thisBill, bilid; // 현재 처리 중인 청구서와 청구서 ID를 저장할 변수를 선언합니다.
      let targetIndex; // 목표 인덱스를 저장할 변수를 선언합니다.
      let targetItem, targetNumber, targetResponse, targetResponseIndex; // 삭제할 항목과 그에 관련된 응답 정보를 저장할 변수를 선언합니다.
      let num; // 반복문에서 사용될 인덱스를 저장할 변수를 선언합니다.
      let updatedBill; // 업데이트된 청구서를 저장할 변수를 선언합니다.

      // selfMongo 옵션이 정의되지 않았거나 null인 경우, 새로운 MongoDB 연결을 생성합니다.
      if (option.selfMongo === undefined || option.selfMongo === null) {
          selfBoo = false;
      } else {
          selfBoo = true; // selfMongo 옵션이 존재하면 true로 설정합니다.
      }
      if (!selfBoo) {
          MONGOC = new mongo(mongoinfo);
          await MONGOC.connect(); // MongoDB에 연결을 시도합니다.
      } else {
          MONGOC = option.selfMongo;
      }

      // selfCoreMongo 옵션이 정의되지 않았거나 null인 경우, 새로운 MongoDB 연결을 생성합니다.
      if (option.selfCoreMongo === undefined || option.selfCoreMongo === null) {
          selfCoreBoo = false;
      } else {
          selfCoreBoo = true; // selfCoreMongo 옵션이 존재하면 true로 설정합니다.
      }
      if (!selfCoreBoo) {
          MONGOCOREC = new mongo(mongoinfo);
          await MONGOCOREC.connect(); // MongoDB에 연결을 시도합니다.
      } else {
          MONGOCOREC = option.selfCoreMongo;
      }

      // 프로젝트 ID를 사용하여 해당 프로젝트 정보를 백엔드에서 가져옵니다.
      project = await back.getProjectById(proid, { selfMongo: MONGOCOREC });
      if (project === null) {
          throw new Error("invaild proid");
      }
      if (!/^d/.test(project.desid)) {
          throw new Error("unable in this project");
      }

      // 디자이너와 클라이언트 정보를 가져옵니다.
      designer = await back.getDesignerById(project.desid, { selfMongo: MONGOCOREC });
      client = await back.getClientById(project.cliid, { selfMongo: MONGOCOREC });

      // 프로젝트와 관련된 청구서를 가져옵니다.
      thisBill = await this.getBillsByQuery({
          $and: [
              { "links.proid": project.proid },
              { "links.cliid": client.cliid },
              { "links.desid": designer.desid },
              { "links.method": method },
          ]
      }, { selfMongo: MONGOC });
      if (thisBill.length === 0) {
          throw new Error("cannot found bill");
      }
      thisBill = thisBill[0];
      bilid = thisBill.bilid;

      // injectionCase에 따라 처리 방식을 결정합니다.
      if (injectionCase === "request") {
          // request 케이스: 여행 경비 요청 및 디자이너 비용을 제거합니다.
          for (let i of thisBill.requests[index].items) {
              if (i.class === itemKey) {
                  targetItem = i;
              }
          }
          targetNumber = targetItem.unit.number;
          num = 0;
          targetResponse = null;
          for (let r of thisBill.responses) {
              if (r.name === stylingResponses[responseKey].name) {
                  for (let i of r.items) {
                      if (i.class === itemKey) {
                          if (i.unit.number === targetNumber) {
                              targetResponse = r;
                              targetResponseIndex = num;
                              break;
                          }
                      }
                  }
                  if (targetResponse !== null) {
                      break;
                  }
              }
              num++;
          }

          // 해당 요청과 응답 항목을 삭제합니다.
          await this.requestEjection(bilid, index, { selfMongo: MONGOC });
          await this.responseEjection(bilid, targetResponseIndex, { selfMongo: MONGOC });

      } else {
          // first 또는 remain 케이스: 기존 항목을 삭제하고 관련된 디자이너 비용을 제거합니다.
          targetIndex = null;
          for (let i = 0; i < thisBill.requests.length; i++) {
              if (thisBill.requests[i].name.trim() === stylingRequests[injectionCase === "first" ? "firstPayment" : "secondPayment"].name) {
                  targetIndex = i;
                  break;
              }
          }

          if (targetIndex !== null) {
              for (let i of thisBill.requests[targetIndex].items) {
                  if (i.class === itemKey) {
                      targetItem = i;
                  }
              }
              targetNumber = targetItem.unit.number;
              num = 0;
              targetResponse = null;
              for (let r of thisBill.responses) {
                  if (r.name === stylingResponses[responseKey].name) {
                      for (let i of r.items) {
                          if (i.class === itemKey) {
                              if (i.unit.number === targetNumber) {
                                  targetResponse = r;
                                  targetResponseIndex = num;
                                  break;
                              }
                          }
                      }
                      if (targetResponse !== null) {
                          break;
                      }
                  }
                  num++;
              }

              // 해당 요청과 응답 항목을 삭제합니다.
              await this.itemEjection(thisBill.requests[targetIndex].id, itemKey, { selfMongo: MONGOC });
              await this.responseEjection(bilid, targetResponseIndex, { selfMongo: MONGOC });

          }
      }

      // 업데이트된 청구서를 가져옵니다.
      updatedBill = await this.getBillById(thisBill.bilid, { selfMongo: MONGOC });

      // MongoDB 연결을 종료합니다.
      if (!selfBoo) {
          await MONGOC.close();
      }
      if (!selfCoreBoo) {
          await MONGOCOREC.close();
      }

      // 업데이트된 청구서를 반환합니다.
      return updatedBill;

  } catch (e) {
      // 오류가 발생한 경우, 콘솔에 오류 메시지를 출력합니다.
      console.log(e);
  }
}

/**
 * 특정 청구서의 여행 경비 항목 순서를 위아래로 이동시키는 비동기 함수입니다.
 * @param {string} order - "up" 또는 "down"을 지정하여 항목을 위 또는 아래로 이동시킵니다.
 * @param {string} proid - 프로젝트 ID로, 청구서가 속한 프로젝트를 식별합니다.
 * @param {string} method - 결제 방법을 나타내며, "offline" 또는 "online"을 지정합니다.
 * @param {number} index - 이동시킬 항목의 현재 인덱스 위치입니다.
 * @param {object} [option={ selfMongo: null, selfCoreMongo: null }] - 추가 옵션으로 MongoDB 연결을 재사용할 수 있습니다.
 * @returns {Promise<object>} 업데이트된 청구서 객체를 반환합니다.
 * @throws {Error} 유효하지 않은 입력이 있는 경우 오류를 발생시킵니다.
 */
BillMaker.prototype.travelUpDown = async function (order, proid, method, index, option = { selfMongo: null, selfCoreMongo: null }) {
  // 입력값 검증: order, proid, method, index의 타입과 값이 유효한지 확인합니다.
  if (typeof order !== "string" || typeof proid !== "string" || typeof method !== "string" || typeof index !== "number") {
    throw new Error("invaild input");
  }

  // order가 "up" 또는 "down"이 아니면 오류를 발생시킵니다.
  if (!([ "down", "up" ]).includes(order)) {
    throw new Error("injection case must be request or first or remain");
  }

  // proid가 유효한 형식인지 확인합니다. 프로젝트 ID는 특정 패턴을 따라야 합니다.
  if (!/p[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]/.test(proid)) {
    throw new Error("invaild proid");
  }

  // method가 "offline" 또는 "online" 중 하나인지 확인합니다.
  if (method !== "offline" && method !== "online") {
    throw new Error("invaild method");
  }

  // 인스턴스 및 필수 메서드와 속성을 초기화합니다.
  const instance = this;
  const back = this.back;
  const { mongo, mongoinfo, equalJson, sleep } = this.mother;
  const stylingItems = BillMaker.billDictionary.styling.goods;
  const stylingRequests = BillMaker.billDictionary.styling.requests;
  const designerCalculation = BillMaker.billDictionary.styling.calculation;
  const stylingResponses = BillMaker.billDictionary.styling.responses;
  const itemKey = "travelExpenses";  // 항목 키
  const requestKey = "travelPayment"; // 요청 키
  const responseKey = "designerTravelFee"; // 응답 키

  try {
    let MONGOC, MONGOCOREC;
    let selfBoo, selfCoreBoo;
    let client, designer, project;
    let thisBill, bilid;
    let targetIndex;
    let targetItem, targetNumber, targetResponse, targetResponseIndex;
    let num;
    let updatedBill;
    let tempArr;
    let finalArr;
    let targetObj;
    let whereQuery, updateQuery;

    // selfMongo 옵션이 정의되지 않은 경우 MongoDB 연결을 새로 만듭니다.
    if (option.selfMongo === undefined || option.selfMongo === null) {
      selfBoo = false;
    } else {
      selfBoo = true;
    }
    if (!selfBoo) {
      MONGOC = new mongo(mongoinfo); // MongoDB 연결 생성
      await MONGOC.connect(); // MongoDB 연결을 엽니다.
    } else {
      MONGOC = option.selfMongo; // selfMongo 옵션을 사용하여 연결을 재사용합니다.
    }

    // selfCoreMongo 옵션이 정의되지 않은 경우 MongoDB Core 연결을 새로 만듭니다.
    if (option.selfCoreMongo === undefined || option.selfCoreMongo === null) {
      selfCoreBoo = false;
    } else {
      selfCoreBoo = true;
    }
    if (!selfCoreBoo) {
      MONGOCOREC = new mongo(mongoinfo); // MongoDB Core 연결 생성
      await MONGOCOREC.connect(); // MongoDB Core 연결을 엽니다.
    } else {
      MONGOCOREC = option.selfCoreMongo; // selfCoreMongo 옵션을 사용하여 연결을 재사용합니다.
    }

    // 주어진 프로젝트 ID로 프로젝트를 가져옵니다.
    project = await back.getProjectById(proid, { selfMongo: MONGOCOREC });
    if (project === null) {
      throw new Error("invaild proid");
    }
    if (!/^d/.test(project.desid)) {
      throw new Error("unable in this project");
    }

    // 프로젝트의 디자이너와 클라이언트를 가져옵니다.
    designer = await back.getDesignerById(project.desid, { selfMongo: MONGOCOREC });
    client = await back.getClientById(project.cliid, { selfMongo: MONGOCOREC });

    // 주어진 조건으로 청구서를 가져옵니다.
    thisBill = await this.getBillsByQuery({
      $and: [
        { "links.proid": project.proid },
        { "links.cliid": client.cliid },
        { "links.desid": designer.desid },
        { "links.method": method },
      ]
    }, { selfMongo: MONGOC });
    if (thisBill.length === 0) {
      throw new Error("cannot found bill");
    }
    thisBill = thisBill[0];
    bilid = thisBill.bilid;

    // 현재 청구서의 요청 배열을 가져옵니다.
    tempArr = thisBill.requests.toNormal();
    // 이동할 항목을 배열에서 제거합니다.
    targetObj = equalJson(JSON.stringify(tempArr[index]));
    tempArr.splice(index, 1);
    finalArr = equalJson(JSON.stringify(tempArr));

    // order에 따라 항목을 위로 또는 아래로 이동시킵니다.
    if (order === "down") {
      if (index + 1 === thisBill.requests.toNormal().length) {
        finalArr.push(targetObj);
      } else {
        finalArr.splice(index + 1, 0, targetObj);
      }
    } else {
      if (index - 1 < 0) {
        finalArr.unshift(targetObj);
      } else {
        finalArr.splice(index - 1, 0, targetObj);
      }
    }

    // 업데이트할 청구서의 쿼리 및 데이터를 준비합니다.
    whereQuery = { bilid };
    updateQuery = {};
    updateQuery["requests"] = finalArr;

    // 청구서를 업데이트합니다.
    await this.updateBill([ whereQuery, updateQuery ], { selfMongo: MONGOC });

    // 업데이트된 청구서를 가져옵니다.
    updatedBill = await this.getBillById(thisBill.bilid, { selfMongo: MONGOC });

    // MongoDB 연결을 닫습니다.
    if (!selfBoo) {
      await MONGOC.close();
    }
    if (!selfCoreBoo) {
      await MONGOCOREC.close();
    }

    // 업데이트된 청구서를 반환합니다.
    return updatedBill;

  } catch (e) {
    console.log(e);
  }
}

/**
 * 특정 청구서의 여행 경비 항목을 재구성하는 비동기 함수입니다.
 * @param {string} injectionCase - "request", "first", "remain" 중 하나를 지정하여 처리할 케이스를 나타냅니다.
 * @param {string} proid - 프로젝트 ID로, 청구서가 속한 프로젝트를 식별합니다.
 * @param {string} method - 결제 방법을 나타내며, "offline" 또는 "online"을 지정합니다.
 * @param {number} index - 재구성할 항목의 현재 인덱스 위치입니다.
 * @param {number} number - 재구성할 여행 경비 항목의 수량입니다.
 * @param {object} [option={ selfMongo: null, selfCoreMongo: null }] - 추가 옵션으로 MongoDB 연결을 재사용할 수 있습니다.
 * @returns {Promise<object>} 업데이트된 청구서 객체를 반환합니다.
 * @throws {Error} 유효하지 않은 입력이 있는 경우 오류를 발생시킵니다.
 */
BillMaker.prototype.travelReconfig = async function (injectionCase, proid, method, index, number, option = { selfMongo: null, selfCoreMongo: null }) {
  // 입력값 검증: injectionCase, proid, method, index, number의 타입과 값이 유효한지 확인합니다.
  if (typeof injectionCase !== "string" || typeof proid !== "string" || typeof method !== "string" || typeof index !== "number" || typeof number !== "number") {
    throw new Error("invaild input");
  }

  // injectionCase가 "request", "first", "remain" 중 하나인지 확인합니다.
  if (!([ "request", "first", "remain" ]).includes(injectionCase)) {
    throw new Error("injection case must be request or first or remain");
  }

  // proid가 유효한 형식인지 확인합니다. 프로젝트 ID는 특정 패턴을 따라야 합니다.
  if (!/p[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]/.test(proid)) {
    throw new Error("invaild proid");
  }

  // method가 "offline" 또는 "online" 중 하나인지 확인합니다.
  if (method !== "offline" && method !== "online") {
    throw new Error("invaild method");
  }

  // number가 0 이상 20 이하의 유효한 숫자인지 확인합니다.
  if (number < 0 || 20 < number) {
    throw new Error("invaild travel number");
  }

  // 인스턴스 및 필수 메서드와 속성을 초기화합니다.
  const instance = this;
  const back = this.back;
  const { mongo, mongoinfo, equalJson, sleep } = this.mother;
  const stylingItems = BillMaker.billDictionary.styling.goods;
  const stylingRequests = BillMaker.billDictionary.styling.requests;
  const designerCalculation = BillMaker.billDictionary.styling.calculation;
  const stylingResponses = BillMaker.billDictionary.styling.responses;
  const vatRatio = BillMaker.billDictionary.styling.etc.vatRatio;
  const distancePercentage = BillMaker.billDictionary.styling.etc.distancePercentage;
  const itemKey = "travelExpenses";  // 항목 키
  const requestKey = "travelPayment"; // 요청 키
  const responseKey = "designerTravelFee"; // 응답 키

  try {
    let MONGOC, MONGOCOREC;
    let selfBoo, selfCoreBoo;
    let client, designer, project;
    let thisBill, bilid;
    let targetIndex;
    let targetItem, targetItemIndex, targetNumber, targetResponse, targetResponseIndex, targetResponseItemIndex;
    let num;
    let whereQuery, updateQuery;
    let itemArr, oppositeItemArr;
    let feeObject, distance;
    let updatedBill;

    // selfMongo 옵션이 정의되지 않은 경우 MongoDB 연결을 새로 만듭니다.
    if (option.selfMongo === undefined || option.selfMongo === null) {
      selfBoo = false;
    } else {
      selfBoo = true;
    }
    if (!selfBoo) {
      MONGOC = new mongo(mongoinfo); // MongoDB 연결 생성
      await MONGOC.connect(); // MongoDB 연결을 엽니다.
    } else {
      MONGOC = option.selfMongo; // selfMongo 옵션을 사용하여 연결을 재사용합니다.
    }

    // selfCoreMongo 옵션이 정의되지 않은 경우 MongoDB Core 연결을 새로 만듭니다.
    if (option.selfCoreMongo === undefined || option.selfCoreMongo === null) {
      selfCoreBoo = false;
    } else {
      selfCoreBoo = true;
    }
    if (!selfCoreBoo) {
      MONGOCOREC = new mongo(mongoinfo); // MongoDB Core 연결 생성
      await MONGOCOREC.connect(); // MongoDB Core 연결을 엽니다.
    } else {
      MONGOCOREC = option.selfCoreMongo; // selfCoreMongo 옵션을 사용하여 연결을 재사용합니다.
    }

    // 주어진 프로젝트 ID로 프로젝트를 가져옵니다.
    project = await back.getProjectById(proid, { selfMongo: MONGOCOREC });
    if (project === null) {
      throw new Error("invaild proid");
    }
    if (!/^d/.test(project.desid)) {
      throw new Error("unable in this project");
    }

    // 프로젝트의 디자이너와 클라이언트를 가져옵니다.
    designer = await back.getDesignerById(project.desid, { selfMongo: MONGOCOREC });
    client = await back.getClientById(project.cliid, { selfMongo: MONGOCOREC });

    // 프로젝트에서 해당 디자이너와 결제 방법에 맞는 수수료 객체를 찾습니다.
    feeObject = null;
    for (let proposal of project.proposal.detail) {
      if (proposal.desid === designer.desid) {
        for (let obj of proposal.fee) {
          if (obj.method === method) {
            feeObject = obj;
          }
        }
      }
    }
    if (feeObject === null) {
      throw new Error("cannot find fee object");
    }
    distance = feeObject.distance;

    // 주어진 조건으로 청구서를 가져옵니다.
    thisBill = await this.getBillsByQuery({
      $and: [
        { "links.proid": project.proid },
        { "links.cliid": client.cliid },
        { "links.desid": designer.desid },
        { "links.method": method },
      ]
    }, { selfMongo: MONGOC });
    if (thisBill.length === 0) {
      throw new Error("cannot found bill");
    }
    thisBill = thisBill[0];
    bilid = thisBill.bilid;

    // injectionCase가 "request"가 아닌 경우, 첫 번째 또는 남은 지불 항목의 인덱스를 찾습니다.
    if (injectionCase !== "request") {
      targetIndex = null;
      for (let i = 0; i < thisBill.requests.length; i++) {
        if (thisBill.requests[i].name.trim() === stylingRequests[injectionCase === "first" ? "firstPayment" : "secondPayment"].name) {
          targetIndex = i;
          break;
        }
      }
      index = targetIndex;
    }

    // 지정된 인덱스에 있는 요청 항목에서 여행 경비 항목을 찾습니다.
    for (let i = 0; i < thisBill.requests[index].items.length; i++) {
      if (thisBill.requests[index].items[i].class === itemKey) {
        targetItem = thisBill.requests[index].items[i];
        targetItemIndex = i;
      }
    }
    targetNumber = targetItem.unit.number;

    // 해당 요청 항목에 대응하는 응답 항목을 찾습니다.
    num = 0;
    targetResponse = null;
    for (let r of thisBill.responses) {
      if (r.name === stylingResponses[responseKey].name) {
        for (let i = 0; i < r.items.length; i++) {
          if (r.items[i].class === itemKey) {
            if (r.items[i].unit.number === targetNumber) {
              targetResponse = r;
              targetResponseIndex = num;
              targetResponseItemIndex = i;
              break;
            }
          }
        }
        if (targetResponse !== null) {
          break;
        }
      }
      num++;
    }

    // 요청 항목과 응답 항목의 여행 경비를 재구성합니다.
    itemsArr = thisBill.requests[index].items.toNormal();
    itemsArr[targetItemIndex].unit.number = number;
    itemsArr[targetItemIndex].amount.supply = itemsArr[targetItemIndex].unit.price * itemsArr[targetItemIndex].unit.number;
    itemsArr[targetItemIndex].amount.vat = Math.round(itemsArr[targetItemIndex].amount.supply * vatRatio);
    itemsArr[targetItemIndex].amount.consumer = Math.round(itemsArr[targetItemIndex].amount.supply + itemsArr[targetItemIndex].amount.vat);

    oppositeItemArr = thisBill.responses[targetResponseIndex].items.toNormal();
    oppositeItemArr[targetResponseItemIndex].unit.number = number;
    oppositeItemArr[targetResponseItemIndex].amount.pure = oppositeItemArr[targetResponseItemIndex].unit.price * oppositeItemArr[targetResponseItemIndex].unit.number;
    oppositeItemArr[targetResponseItemIndex].amount.commission = distance.amount * oppositeItemArr[targetResponseItemIndex].unit.number * (distancePercentage / 100);

    // MongoDB에 업데이트할 쿼리와 데이터를 준비합니다.
    whereQuery = { bilid };
    updateQuery = {};
    updateQuery["requests." + String(index) + ".items"] = equalJson(JSON.stringify(itemsArr));
    updateQuery["responses." + String(targetResponseIndex) + ".items"] = equalJson(JSON.stringify(oppositeItemArr));

    // 청구서를 업데이트합니다.
    await this.updateBill([ whereQuery, updateQuery ], { selfMongo: MONGOC });

    // 업데이트된 청구서를 가져옵니다.
    updatedBill = await this.getBillById(thisBill.bilid, { selfMongo: MONGOC });

    // MongoDB 연결을 닫습니다.
    if (!selfBoo) {
      await MONGOC.close();
    }
    if (!selfCoreBoo) {
      await MONGOCOREC.close();
    }

    // 업데이트된 청구서를 반환합니다.
    return updatedBill;

  } catch (e) {
    console.log(e);
  }
}

/**
 * 프로젝트에서 디자이너를 선택하고, 선택되지 않은 디자이너의 청구서를 삭제하는 비동기 함수입니다.
 * @param {string} proid - 프로젝트 ID로, 청구서가 속한 프로젝트를 식별합니다.
 * @param {string} desid - 디자이너 ID로, 선택된 디자이너를 식별합니다.
 * @param {object} [option={ selfMongo: null }] - 추가 옵션으로 MongoDB 연결을 재사용할 수 있습니다.
 * @returns {Promise<void>} 함수는 반환값이 없습니다.
 * @throws {Error} 유효하지 않은 입력이 있는 경우 오류를 발생시킵니다.
 */
BillMaker.prototype.designerSelect = async function (proid, desid, option = { selfMongo: null }) {
  // 입력값 검증: proid, desid의 타입과 형식이 유효한지 확인합니다.
  if (typeof proid !== "string" || typeof desid !== "string" || typeof option !== "object") {
    throw new Error("must be proid, desid");
  }
  
  // proid와 desid가 각각 유효한 형식인지 확인합니다. 프로젝트와 디자이너 ID는 특정 패턴을 따라야 합니다.
  if (!/^p[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]$/.test(proid) || !/^d[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]$/.test(desid)) {
    throw new Error("must be proid, desid");
  }

  // 인스턴스 및 Mother 메서드를 호출하여 필요한 속성을 초기화합니다.
  const instance = this;
  const { mongo, mongoinfo, equalJson } = this.mother;

  try {
    let MONGOC;  // MongoDB 연결을 위한 변수
    let selfBoo; // MongoDB 연결 재사용 여부를 나타내는 변수
    let thisBill; // 선택된 디자이너의 청구서를 저장할 변수
    let targets; // 해당 프로젝트의 모든 청구서를 저장할 배열

    // selfMongo 옵션이 정의되지 않은 경우 MongoDB 연결을 새로 만듭니다.
    if (option.selfMongo === undefined || option.selfMongo === null) {
      selfBoo = false;
    } else {
      selfBoo = true;
    }
    
    // MongoDB 연결을 엽니다. selfMongo 옵션이 있으면 이를 사용하고, 그렇지 않으면 새로 생성합니다.
    if (!selfBoo) {
      MONGOC = new mongo(mongoinfo);
      await MONGOC.connect();
    } else {
      MONGOC = option.selfMongo;
    }

    // 주어진 프로젝트 ID로 해당 프로젝트의 모든 청구서를 가져옵니다.
    targets = await this.getBillsByQuery({ "links.proid": proid }, { selfMongo: MONGOC });
    thisBill = null; // 선택된 디자이너의 청구서를 초기화합니다.

    // 청구서 목록에서 선택된 디자이너의 청구서를 찾습니다.
    for (let b of targets) {
      if (b.links.desid === desid) {
        thisBill = b; // 선택된 디자이너의 청구서를 저장합니다.
      }
    }

    // 선택된 디자이너의 청구서가 존재하는 경우, 나머지 디자이너의 청구서를 삭제합니다.
    if (thisBill !== null) {
      for (let b of targets) {
        if (b.links.desid !== desid) {
          await this.deleteBill(b.bilid, { selfMongo: MONGOC }); // 선택되지 않은 디자이너의 청구서를 삭제합니다.
        }
      }
    }

    // MongoDB 연결을 닫습니다. selfMongo 옵션이 없을 때만 연결을 닫습니다.
    if (!selfBoo) {
      await MONGOC.close();
    }

  } catch (e) {
    // 오류가 발생하면 콘솔에 오류를 출력합니다.
    console.log(e);
  }
}

/**
 * `convertingDummy` 메서드는 빈 객체를 반환하며, 이는 서비스, 디자이너, 요청, 응답에 대한 기본 구조를 포함합니다.
 * 이 객체는 나중에 데이터를 변환하거나 초기화할 때 사용될 수 있습니다.
 * @returns {Object} 변환 작업을 위한 기본 구조를 가진 객체를 반환합니다.
 */
BillMaker.prototype.convertingDummy = function () {
  // 기본 구조를 담고 있는 객체를 반환합니다.
  return {
    service: {  // 서비스 관련 데이터를 저장할 객체
      from: {  // 변환 이전의 서비스 데이터
        serid: "",  // 서비스 ID를 저장할 빈 문자열
        xValue: "",  // 서비스와 관련된 추가 값을 저장할 빈 문자열
        online: false  // 서비스가 온라인인지 여부를 나타내는 불리언 값 (기본값은 false)
      },
      to: {  // 변환 이후의 서비스 데이터를 저장할 객체
        serid: "",  // 변환된 서비스 ID를 저장할 빈 문자열
        xValue: ""  // 변환된 서비스와 관련된 값을 저장할 빈 문자열
      }
    },
    designer: {  // 디자이너 관련 데이터를 저장할 객체
      from: {  // 변환 이전의 디자이너 데이터
        id: "",  // 디자이너 ID를 저장할 빈 문자열
        name: "",  // 디자이너 이름을 저장할 빈 문자열
        phone: "",  // 디자이너 전화번호를 저장할 빈 문자열
        email: ""  // 디자이너 이메일을 저장할 빈 문자열
      },
      to: {  // 변환 이후의 디자이너 데이터를 저장할 객체
        id: "",  // 변환된 디자이너 ID를 저장할 빈 문자열
        name: "",  // 변환된 디자이너 이름을 저장할 빈 문자열
        phone: "",  // 변환된 디자이너 전화번호를 저장할 빈 문자열
        email: ""  // 변환된 디자이너 이메일을 저장할 빈 문자열
      }
    },
    request: {  // 요청 관련 데이터를 저장할 객체
      from: {  // 변환 이전의 요청 데이터
        supply: 0,  // 공급가액을 저장할 숫자 (기본값 0)
        vat: 0,  // 부가가치세를 저장할 숫자 (기본값 0)
        consumer: 0  // 소비자가를 저장할 숫자 (기본값 0)
      },
      to: {  // 변환 이후의 요청 데이터를 저장할 객체
        supply: 0,  // 변환된 공급가액을 저장할 숫자 (기본값 0)
        vat: 0,  // 변환된 부가가치세를 저장할 숫자 (기본값 0)
        consumer: 0  // 변환된 소비자가를 저장할 숫자 (기본값 0)
      },
      additional: false  // 추가 요청 여부를 나타내는 불리언 값 (기본값은 false)
    },
    response: {  // 응답 관련 데이터를 저장할 객체
      from: {  // 변환 이전의 응답 데이터
        total: 0,  // 총액을 저장할 숫자 (기본값 0)
        first: 0,  // 첫 번째 금액을 저장할 숫자 (기본값 0)
        remain: 0  // 남은 금액을 저장할 숫자 (기본값 0)
      },
      to: {  // 변환 이후의 응답 데이터를 저장할 객체
        total: 0,  // 변환된 총액을 저장할 숫자 (기본값 0)
        first: 0,  // 변환된 첫 번째 금액을 저장할 숫자 (기본값 0)
        remain: 0  // 변환된 남은 금액을 저장할 숫자 (기본값 0)
      },
      additional: false  // 추가 응답 여부를 나타내는 불리언 값 (기본값은 false)
    }
  };
}

/**
 * 서비스 변환 및 디자인 비용 재계산을 수행하는 메서드입니다.
 * 이 메서드는 주어진 프로젝트 ID(proid)와 새로운 서비스 ID(serid)를 기반으로, 기존 서비스에서 새로운 서비스로 변환하고,
 * 이에 따라 디자인 비용을 재계산합니다.
 * @param {string} proid - 프로젝트 ID.
 * @param {string} method - 서비스 방식(온라인/오프라인).
 * @param {string} serid - 새롭게 적용할 서비스 ID.
 * @param {Object} [option={ selfMongo: null, selfCoreMongo: null }] - 선택적인 MongoDB 연결 정보.
 * @returns {Object} 서비스 변환 결과를 포함하는 객체를 반환합니다.
 * @throws {Error} 유효하지 않은 입력값이 제공된 경우 오류를 발생시킵니다.
 */
BillMaker.prototype.serviceConverting = async function (proid, method, serid, option = { selfMongo: null, selfCoreMongo: null }) {
  // 입력 값이 유효한지 확인합니다.
  if (typeof proid !== "string" || typeof method !== "string" || typeof serid !== "string") {
    throw new Error("invaild input");
  }

  // 현재 객체(this)를 instance 변수에 저장합니다.
  const instance = this;

  // BackWorker 모듈을 불러와서 새로운 인스턴스를 생성합니다.
  const BackWorker = require(`${process.cwd()}/apps/backMaker/backWorker.js`);
  const doingSignature = "billMaker_serviceConvertingDoing_" + proid; // 작업 중임을 나타내는 파일 이름을 설정합니다.
  const work = new BackWorker(); // BackWorker의 인스턴스를 생성합니다.
  const back = this.back; // 백엔드와의 통신을 위해 this.back을 사용합니다.
  const { mongo, mongoinfo, equalJson, sleep, fileSystem, errorLog } = this.mother; // Mother 메서드에서 필요한 모듈을 가져옵니다.
  const vatRatio = BillMaker.billDictionary.styling.etc.vatRatio; // 부가가치세 비율을 불러옵니다.
  const freeRatio = BillMaker.billDictionary.styling.etc.freeRatio; // 자유 비율을 불러옵니다.

  try {
    let MONGOC, MONGOCOREC; // MongoDB 연결을 위한 변수 선언
    let selfBoo, selfCoreBoo; // 자체 MongoDB 연결 여부를 나타내는 불리언 변수
    let project; // 현재 작업 중인 프로젝트를 저장할 변수
    let thisBill, bilid; // 프로젝트에 연결된 Bill과 그 ID를 저장할 변수
    let pastSerid; // 기존 서비스 ID를 저장할 변수
    let xValue; // 서비스와 관련된 추가적인 값을 저장할 변수
    let remain; // 남은 금액 계산에 사용될 객체
    let totalNum, payNum, cancelNum; // 총 금액, 지불 금액, 취소 금액을 저장할 변수
    let totalNumR0, payNumR0, cancelNumR0; // 1차 디자인 비용과 관련된 총 금액, 지불 금액, 취소 금액
    let totalNumR1, payNumR1, cancelNumR1; // 2차 디자인 비용과 관련된 총 금액, 지불 금액, 취소 금액
    let desid, cliid; // 디자이너 ID와 클라이언트 ID를 저장할 변수
    let designer, client; // 디자이너와 클라이언트 정보를 저장할 변수
    let feeObject; // 새로운 서비스의 요금 객체를 저장할 변수
    let pastFeeObject; // 기존 서비스의 요금 객체를 저장할 변수
    let newFeeObject; // 새로운 서비스의 요금 객체를 저장할 변수
    let remainIndex, remainItemIndex; // 남은 금액에 해당하는 항목의 인덱스
    let num; // 반복문에서 사용될 카운터 변수
    let pastRemainArr; // 기존 서비스의 남은 금액 배열을 저장할 변수
    let proposalIndex0, proposalIndex1; // 프로젝트 제안서의 인덱스를 저장할 변수
    let projectWhereQuery, projectUpdateQuery; // 프로젝트를 업데이트하기 위한 MongoDB 쿼리
    let whereQuery, updateQuery; // Bill을 업데이트하기 위한 MongoDB 쿼리
    let newResponses; // 새로운 응답 객체 배열을 저장할 변수
    let pastResponses; // 기존 응답 객체 배열을 저장할 변수
    let newSupply; // 새로운 공급 금액을 저장할 변수
    let classification, percentage; // 디자이너의 분류와 수수료 비율을 저장할 변수
    let calculate, commission; // 계산된 금액과 수수료를 저장할 변수
    let pastRemainPrice; // 기존 서비스의 남은 금액을 저장할 변수
    let newRequestAmount; // 새로운 요청 금액을 저장할 변수
    let firstResponse, secondResponse; // 첫 번째와 두 번째 응답 객체를 저장할 변수
    let firstBoo, remainBoo; // 첫 번째와 두 번째 응답의 유효성을 확인하기 위한 불리언 변수
    let newRequestPrice; // 새로운 요청 금액을 저장할 변수
    let remainResponse; // 남은 금액 응답 객체를 저장할 변수
    let remainResponseIndex; // 남은 금액 응답 객체의 인덱스
    let remainResponseRemainItem; // 남은 금액 응답 항목을 저장할 변수
    let remainResponseRemainItemIndex; // 남은 금액 응답 항목의 인덱스
    let responseBetween; // 응답 간의 차이를 계산하는 변수
    let newCommission; // 새로운 수수료를 저장할 변수
    let firstResponseIndex; // 첫 번째 응답 객체의 인덱스
    let firstResponseFirstItemIndex; // 첫 번째 응답 항목의 인덱스
    let returnObject; // 최종 반환할 객체를 저장할 변수
    let unknownDesignerFee, newDesignerFeeObject; // 새로운 디자이너 요금을 저장할 변수
    let safeNum; // 안전 검사 루프 카운터 변수

    safeNum = 0;
    // 작업 중인지 확인하고, 작업 중이라면 기다립니다.
    while ((await fileSystem(`exist`, [ `${process.cwd()}/temp/${doingSignature}.json` ])) && safeNum < 100) {
      await sleep(300);
      safeNum++;
    }
    // 작업 시작을 기록합니다.
    await fileSystem(`write`, [ `${process.cwd()}/temp/${doingSignature}.json`, `{ "doing": 1 }` ]);

    // 반환 객체를 초기화합니다.
    returnObject = this.convertingDummy();

    // MongoDB 연결 설정을 처리합니다.
    if (option.selfMongo === undefined || option.selfMongo === null) {
      selfBoo = false;
    } else {
      selfBoo = true;
    }
    if (!selfBoo) {
      MONGOC = new mongo(mongoinfo);
      await MONGOC.connect();
    } else {
      MONGOC = option.selfMongo;
    }

    // Core MongoDB 연결 설정을 처리합니다.
    if (option.selfCoreMongo === undefined || option.selfCoreMongo === null) {
      selfCoreBoo = false;
    } else {
      selfCoreBoo = true;
    }
    if (!selfCoreBoo) {
      MONGOCOREC = new mongo(mongoinfo);
      await MONGOCOREC.connect();
    } else {
      MONGOCOREC = option.selfCoreMongo;
    }

    // 프로젝트 정보를 불러옵니다.
    project = await back.getProjectById(proid, { selfMongo: MONGOCOREC });
    if (project === null) {
      throw new Error("invaild proid");
    }
    if (!/^d/.test(project.desid)) {
      throw new Error("unable in this project");
    }
    desid = project.desid; // 디자이너 ID 설정
    cliid = project.cliid; // 클라이언트 ID 설정
    pastSerid = project.service.serid; // 기존 서비스 ID 설정
    xValue = project.service.xValue; // 서비스 관련 추가 값 설정
    designer = await back.getDesignerById(desid, { selfMongo: MONGOCOREC }); // 디자이너 정보를 불러옵니다.
    client = await back.getClientById(cliid, { selfMongo: MONGOCOREC }); // 클라이언트 정보를 불러옵니다.
    feeObject = null; // 새로운 요금 객체를 초기화합니다.
    
    // 프로젝트 제안서에서 해당 디자이너와 방법에 맞는 요금 객체를 찾습니다.
    for (let i = 0; i < project.proposal.detail.length; i++) {
      if (project.proposal.detail[i].desid === designer.desid) {
        for (let j = 0; j < project.proposal.detail[i].fee.length; j++) {
          if (project.proposal.detail[i].fee[j].method === method) {
            feeObject = project.proposal.detail[i].fee[j];
            proposalIndex0 = i;
            proposalIndex1 = j;
          }
        }
      }
    }
    // 만약 요금 객체가 존재하지 않을 경우, 새롭게 계산된 요금 객체를 설정합니다.
    if (feeObject === null) {
      feeObject = project.proposal.detail[0].fee[0];
      proposalIndex0 = 0;
      proposalIndex1 = 0;
      unknownDesignerFee = await work.getDesignerFee(desid, cliid, serid, xValue, { selfMongo: MONGOCOREC, selfLocalMongo: null });
      newDesignerFeeObject = {
        method: feeObject.method,
        partial: feeObject.partial,
        amount: feeObject.amount,
        discount: feeObject.discount,
        distance: {
          number: (unknownDesignerFee.detail.distance === 0 ? 0 : feeObject.distance.number),
          amount: unknownDesignerFee.detail.distance,
          distance: unknownDesignerFee.detail.travel.distance,
          time: unknownDesignerFee.detail.travel.time,
          limit: feeObject.distance.limit
        }
      };
      feeObject = equalJson(JSON.stringify(newDesignerFeeObject));
    }
    // 기존 서비스 요금과 새로운 서비스 요금을 불러옵니다.
    pastFeeObject = await work.getDesignerFee(desid, cliid, pastSerid, xValue, { selfMongo: MONGOCOREC, selfLocalMongo: null });
    newFeeObject = await work.getDesignerFee(desid, cliid, serid, xValue, { selfMongo: MONGOCOREC, selfLocalMongo: null });

    // 새롭게 설정된 요금이 유효하지 않을 경우, 작업을 종료합니다.
    if (newFeeObject.detail[method] === 0) {
      await fileSystem(`remove`, [ `${process.cwd()}/temp/${doingSignature}.json` ]);
      return { error: "unable in this service : " + newFeeObject.comment };
    } else {
      // 서비스 변경에 따른 데이터를 반환 객체에 설정합니다.
      returnObject.service.from.serid = project.service.serid;
      returnObject.service.from.xValue = project.service.xValue;
      returnObject.service.from.online = project.service.online;

      returnObject.service.to.serid = serid;
      returnObject.service.to.xValue = project.service.xValue;
      returnObject.service.to.online = project.service.online;

      returnObject.designer.from.id = designer.desid;
      returnObject.designer.from.name = designer.designer;
      returnObject.designer.from.phone = designer.information.phone;
      returnObject.designer.from.email = designer.information.email;

      returnObject.designer.to.id = designer.desid;
      returnObject.designer.to.name = designer.designer;
      returnObject.designer.to.phone = designer.information.phone;
      returnObject.designer.to.email = designer.information.email;

      returnObject.request.from.supply = project.process.contract.remain.calculation.amount.supply;
      returnObject.request.from.vat = project.process.contract.remain.calculation.amount.vat;
      returnObject.request.from.consumer = project.process.contract.remain.calculation.amount.consumer;

      returnObject.response.from.total = project.process.calculation.payments.totalAmount;
      returnObject.response.from.first = project.process.calculation.payments.first.amount;
      returnObject.response.from.remain = project.process.calculation.payments.remain.amount;

      // Bill 데이터를 불러와서, 해당 프로젝트의 Bill이 있는지 확인합니다.
      thisBill = await this.getBillsByQuery({
        $and: [
          { "links.proid": project.proid },
          { "links.cliid": cliid },
          { "links.desid": desid },
          { "links.method": method },
        ]
      }, { selfMongo: MONGOC });
      if (thisBill.length === 0) {
        throw new Error("cannot found bill");
      }
      thisBill = thisBill[0];
      bilid = thisBill.bilid;
      num = 0;
      for (let request of thisBill.requests) {
        if (request.name === BillMaker.billDictionary.styling.requests.secondPayment.name) {
          remain = request;
          remainIndex = num;
        }
        num++;
      }
      num = thisBill.requests.length;
      totalNum = 0;
      for (let { amount: { consumer } } of remain.items) {
        totalNum += consumer;
      }
      payNum = 0;
      for (let { amount } of remain.pay) {
        payNum += amount;
      }
      cancelNum = 0;
      for (let { amount } of remain.cancel) {
        cancelNum += amount;
      }

      // 이전 서비스에서 남은 금액의 항목을 찾아서 설정합니다.
      pastRemainArr = thisBill.requests[remainIndex].items.toNormal();
      for (let i = 0; i < pastRemainArr.length; i++) {
        if (pastRemainArr[i].class === "designerTime") {
          remainItemIndex = i;
        }
      }
      pastRemainPrice = pastRemainArr[remainItemIndex].unit.price;

      // 새로운 공급 금액을 설정합니다.
      if (typeof option.newPrice === "number") {
        newSupply = option.newPrice;
        newRequestPrice = newSupply - Math.round(project.process.contract.first.calculation.amount * (1 / (1 + vatRatio)));
        newRequestAmount = newRequestPrice - pastRemainPrice;
      } else {
        newRequestAmount = newFeeObject.detail[method] - pastFeeObject.detail[method];
        newRequestPrice = pastRemainPrice + newRequestAmount;
        newSupply = newRequestPrice + Math.round(project.process.contract.first.calculation.amount * (1 / (1 + vatRatio)));
      }

      // 프로젝트에 대한 업데이트를 준비합니다.
      projectWhereQuery = { proid };
      projectUpdateQuery = {};
      projectUpdateQuery["service.serid"] = serid;
      projectUpdateQuery["service.online"] = !/off/gi.test(method);
      projectUpdateQuery["process.contract.remain.calculation.amount.supply"] = Math.round(newSupply);
      projectUpdateQuery["process.contract.remain.calculation.amount.vat"] = Math.round(newSupply * vatRatio);
      projectUpdateQuery["process.contract.remain.calculation.amount.consumer"] = Math.round(newSupply * (1 + vatRatio));
      classification = designer.information.business.businessInfo.classification;
      percentage = designer.information.business.service.cost.percentage;
      [ calculate ] = BillMaker.designerCalculation(newSupply, classification, percentage, client, { toArray: true });
      projectUpdateQuery["process.calculation.payments.first.amount"] = Math.floor((calculate / 2) / 10) * 10;
      projectUpdateQuery["process.calculation.payments.remain.amount"] = Math.floor((calculate / 2) / 10) * 10;
      projectUpdateQuery["process.calculation.payments.totalAmount"] = projectUpdateQuery["process.calculation.payments.first.amount"] * 2;

      // 최종적으로 사용자가 변경 사항을 확인하기 위한 confirmMode가 활성화된 경우, 작업을 종료하고 변경 사항을 반환합니다.
      if (typeof option.confirmMode === "boolean" && option.confirmMode) {
        if (!selfBoo) {
          await MONGOC.close();
        }
        if (!selfCoreBoo) {
          await MONGOCOREC.close();
        }
        await fileSystem(`remove`, [ `${process.cwd()}/temp/${doingSignature}.json` ]);

        return {
          price: {
            supply: {
              from: project.process.contract.remain.calculation.amount.supply,
              to: newSupply,
            },
            remain: {
              from: project.process.contract.remain.calculation.amount.consumer - project.process.contract.first.calculation.amount,
              to: newRequestPrice * (1 + vatRatio),
            },
            between: {
              supply: newRequestAmount,
              consumer: newRequestAmount * (1 + vatRatio),
            }
          },
          calculate: {
            total: {
              from: project.process.calculation.payments.totalAmount,
              to: projectUpdateQuery["process.calculation.payments.totalAmount"]
            },
            first: {
              from: project.process.calculation.payments.first.amount,
              to: (project.process.calculation.payments.first.date.valueOf() > (new Date(2000, 0, 1).valueOf()) ? project.process.calculation.payments.first.amount : projectUpdateQuery["process.calculation.payments.first.amount"]),
            },
            remain: {
              from: project.process.calculation.payments.remain.amount,
              to: (project.process.calculation.payments.first.date.valueOf() > (new Date(2000, 0, 1).valueOf()) ? (projectUpdateQuery["process.calculation.payments.totalAmount"] - project.process.calculation.payments.first.amount) : projectUpdateQuery["process.calculation.payments.remain.amount"])
            }
          }
        };
      }

      // 프로젝트 업데이트를 수행합니다.
      await back.updateProject([ projectWhereQuery, projectUpdateQuery ], { selfMongo: MONGOCOREC });

      // 새로운 요금 객체를 설정하고, 프로젝트의 데이터를 업데이트합니다.
      feeObject.amount = newSupply;
      project.proposal.detail[proposalIndex0].fee[proposalIndex1].amount = newSupply;
      project.service.serid = projectUpdateQuery["service.serid"];
      project.service.online = projectUpdateQuery["service.online"];
      project.process.contract.remain.calculation.amount.supply = projectUpdateQuery["process.contract.remain.calculation.amount.supply"];
      project.process.contract.remain.calculation.amount.vat = projectUpdateQuery["process.contract.remain.calculation.amount.vat"];
      project.process.contract.remain.calculation.amount.consumer = projectUpdateQuery["process.contract.remain.calculation.amount.consumer"];
      project.process.calculation.payments.first.amount = projectUpdateQuery["process.calculation.payments.first.amount"];
      project.process.calculation.payments.remain.amount = projectUpdateQuery["process.calculation.payments.remain.amount"];
      project.process.calculation.payments.totalAmount = projectUpdateQuery["process.calculation.payments.totalAmount"];

      // 반환 객체에 새로운 데이터를 설정합니다.
      returnObject.request.to.supply = projectUpdateQuery["process.contract.remain.calculation.amount.supply"];
      returnObject.request.to.vat = projectUpdateQuery["process.contract.remain.calculation.amount.vat"];
      returnObject.request.to.consumer = projectUpdateQuery["process.contract.remain.calculation.amount.consumer"];

      returnObject.response.to.total = projectUpdateQuery["process.calculation.payments.totalAmount"];
      returnObject.response.to.first = projectUpdateQuery["process.calculation.payments.first.amount"];
      returnObject.response.to.remain = projectUpdateQuery["process.calculation.payments.remain.amount"];

      newCommission = Math.floor((newSupply * (percentage / 100)) / 10) * 10;

      // Bill 업데이트를 위한 쿼리 설정
      whereQuery = { bilid };
      updateQuery = {};

      // 첫 번째 지불이 없는 경우, 요청 및 응답 객체를 재설정합니다.
      if (payNum === 0) {
        pastRemainArr[remainItemIndex].unit.price = newRequestPrice;
        pastRemainArr[remainItemIndex].amount.supply = newRequestPrice * pastRemainArr[remainItemIndex].unit.number;
        pastRemainArr[remainItemIndex].amount.vat = Math.round(pastRemainArr[remainItemIndex].amount.supply * vatRatio);
        pastRemainArr[remainItemIndex].amount.consumer = Math.round(pastRemainArr[remainItemIndex].amount.supply * (1 + vatRatio));
        updateQuery["requests." + String(remainIndex) + ".items"] = equalJson(JSON.stringify(pastRemainArr));

        pastResponses = thisBill.responses.toNormal();
        newResponses = [];
        for (let res of pastResponses) {
          if (res.name !== BillMaker.billDictionary.styling.responses.firstDesignFee.name && res.name !== BillMaker.billDictionary.styling.responses.secondDesignFee.name) {
            newResponses.push(res);
          }
        }
        updateQuery["responses"] = equalJson(JSON.stringify(newResponses));

        await this.updateBill([ whereQuery, updateQuery ], { selfMongo: MONGOC });
        await this.responseInjection(bilid, "firstDesignFee", client, designer, project, method, { selfMongo: MONGOC, feeObject });
        await this.responseInjection(bilid, "secondDesignFee", client, designer, project, method, { selfMongo: MONGOC, feeObject });

      } else {

        // 두 번째 지불 요청을 추가해야 하는 경우
        if (newRequestAmount < 0) {
          pastRemainArr[remainItemIndex].unit.price = newRequestPrice;
          pastRemainArr[remainItemIndex].amount.supply = newRequestPrice * pastRemainArr[remainItemIndex].unit.number;
          pastRemainArr[remainItemIndex].amount.vat = Math.round(pastRemainArr[remainItemIndex].amount.supply * vatRatio);
          pastRemainArr[remainItemIndex].amount.consumer = Math.round(pastRemainArr[remainItemIndex].amount.supply * (1 + vatRatio));
          updateQuery["requests." + String(remainIndex) + ".items"] = equalJson(JSON.stringify(pastRemainArr));
        } else if (newRequestAmount > 0) {
          returnObject.request.additional = true;
          await this.requestInjection(bilid, "secondPayment", client, designer, project, method, { selfMongo: MONGOC, feeObject });
          pastRemainArr[remainItemIndex].unit.price = newRequestAmount;
          pastRemainArr[remainItemIndex].amount.supply = newRequestAmount * pastRemainArr[remainItemIndex].unit.number;
          pastRemainArr[remainItemIndex].amount.vat = Math.round(pastRemainArr[remainItemIndex].amount.supply * vatRatio);
          pastRemainArr[remainItemIndex].amount.consumer = Math.round(pastRemainArr[remainItemIndex].amount.supply * (1 + vatRatio));
          updateQuery["requests." + String(0) + ".items." + String(0)] = equalJson(JSON.stringify(pastRemainArr[remainItemIndex]));
        }
        await this.updateBill([ whereQuery, updateQuery ], { selfMongo: MONGOC });
        updateQuery = {};

        // 첫 번째 및 두 번째 응답 객체를 찾습니다.
        firstResponse = null;
        secondResponse = null;
        for (let res of thisBill.responses) {
          if (res.name === BillMaker.billDictionary.styling.responses.firstDesignFee.name) {
            firstResponse = res;
            break;
          }
        }
        for (let res of thisBill.responses) {
          if (res.name === BillMaker.billDictionary.styling.responses.secondDesignFee.name) {
            secondResponse = res;
            break;
          }
        }
        if (firstResponse === null || secondResponse === null) {
          throw new Error("invaild response structure");
        }
        firstBoo = false;
        remainBoo = false;
        totalNumR0 = 0;
        for (let { amount: { pure } } of firstResponse.items) {
          totalNumR0 += pure;
        }
        payNumR0 = 0;
        for (let { amount } of firstResponse.pay) {
          payNumR0 += amount;
        }
        cancelNumR0 = 0;
        for (let { amount } of firstResponse.cancel) {
          cancelNumR0 += amount;
        }
        firstBoo = (Math.floor(totalNumR0) <= Math.floor(payNumR0 - cancelNumR0));
        totalNumR1 = 0;
        for (let { amount: { pure } } of secondResponse.items) {
          totalNumR1 += pure;
        }
        payNumR1 = 0;
        for (let { amount } of secondResponse.pay) {
          payNumR1 += amount;
        }
        cancelNumR1 = 0;
        for (let { amount } of secondResponse.cancel) {
          cancelNumR1 += amount;
        }
        remainBoo = (Math.floor(totalNumR1) <= Math.floor(payNumR1 - cancelNumR1));

        // 첫 번째와 두 번째 응답이 유효하지 않은 경우, 응답 객체를 재설정합니다.
        if (!firstBoo && !remainBoo) {

          pastResponses = thisBill.responses.toNormal();
          newResponses = [];
          for (let res of pastResponses) {
            if (res.name !== BillMaker.billDictionary.styling.responses.firstDesignFee.name && res.name !== BillMaker.billDictionary.styling.responses.secondDesignFee.name) {
              newResponses.push(res);
            }
          }
          updateQuery = {};
          updateQuery["responses"] = equalJson(JSON.stringify(newResponses));
          await this.updateBill([ whereQuery, updateQuery ], { selfMongo: MONGOC });
          await this.responseInjection(bilid, "firstDesignFee", client, designer, project, method, { selfMongo: MONGOC, feeObject });
          await this.responseInjection(bilid, "secondDesignFee", client, designer, project, method, { selfMongo: MONGOC, feeObject });

        } else {
          // 첫 번째 및 두 번째 응답을 업데이트합니다.
          pastResponses = thisBill.responses.toNormal();
          for (let i = 0; i < pastResponses.length; i++) {
            if (pastResponses[i].name === BillMaker.billDictionary.styling.responses.secondDesignFee.name) {
              remainResponse = pastResponses[i];
              remainResponseIndex = i;
              break;
            }
          }
          for (let i = 0; i < pastResponses.length; i++) {
            if (pastResponses[i].name === BillMaker.billDictionary.styling.responses.firstDesignFee.name) {
              firstResponse = pastResponses[i];
              firstResponseIndex = i;
              break;
            }
          }
          for (let i = 0; i < remainResponse.items.length; i++) {
            if (remainResponse.items[i].class === "designerFeeRemain") {
              remainResponseRemainItem = remainResponse.items[i];
              remainResponseRemainItemIndex = i;
            }
          }
          for (let i = 0; i < firstResponse.items.length; i++) {
            if (firstResponse.items[i].class === "designerFeeFirst") {
              firstResponseFirstItemIndex = i;
            }
          }

          responseBetween = projectUpdateQuery["process.calculation.payments.totalAmount"] - (pastResponses[remainResponseIndex].items[remainResponseRemainItemIndex].unit.price + pastResponses[firstResponseIndex].items[firstResponseFirstItemIndex].unit.price);
          pastResponses[remainResponseIndex].items[remainResponseRemainItemIndex].unit.price = pastResponses[remainResponseIndex].items[remainResponseRemainItemIndex].unit.price + responseBetween;
          pastResponses[remainResponseIndex].items[remainResponseRemainItemIndex].amount.pure = pastResponses[remainResponseIndex].items[remainResponseRemainItemIndex].unit.price;
          pastResponses[remainResponseIndex].items[remainResponseRemainItemIndex].amount.commission = newCommission - pastResponses[firstResponseIndex].items[firstResponseFirstItemIndex].amount.commission;
          updateQuery = {};
          updateQuery["responses." + String(remainResponseIndex) + ".items"] = pastResponses[remainResponseIndex].items;
          await this.updateBill([ whereQuery, updateQuery ], { selfMongo: MONGOC });

          projectUpdateQuery = {};
          projectUpdateQuery["process.calculation.payments.first.amount"] = pastResponses[firstResponseIndex].items[firstResponseFirstItemIndex].unit.price;
          projectUpdateQuery["process.calculation.payments.remain.amount"] = pastResponses[remainResponseIndex].items[remainResponseRemainItemIndex].unit.price;
          projectUpdateQuery["process.calculation.payments.totalAmount"] = pastResponses[firstResponseIndex].items[firstResponseFirstItemIndex].unit.price + pastResponses[remainResponseIndex].items[remainResponseRemainItemIndex].unit.price;
          await back.updateProject([ projectWhereQuery, projectUpdateQuery ], { selfMongo: MONGOCOREC });

          returnObject.response.to.total = projectUpdateQuery["process.calculation.payments.totalAmount"];
          returnObject.response.to.first = projectUpdateQuery["process.calculation.payments.first.amount"];
          returnObject.response.to.remain = projectUpdateQuery["process.calculation.payments.remain.amount"];
        }
      }
    }

    // MongoDB 연결을 닫습니다.
    if (!selfBoo) {
      await MONGOC.close();
    }
    if (!selfCoreBoo) {
      await MONGOCOREC.close();
    }

    // 작업 파일을 삭제하고 최종 결과를 반환합니다.
    await fileSystem(`remove`, [ `${process.cwd()}/temp/${doingSignature}.json` ]);
    return returnObject;

  } catch (e) {
    // 오류 발생 시 작업 파일을 삭제하고 오류 로그를 기록합니다.
    await fileSystem(`remove`, [ `${process.cwd()}/temp/${doingSignature}.json` ]);
    await errorLog("BillMaker.prototype.serviceConverting error : " + e.message);
    console.log(e);
  }
}

/**
 * @async
 * @method
 * @name designerConverting
 * @description 프로젝트의 디자이너를 변환하고 관련된 금액 및 데이터를 재계산하는 메서드입니다.
 * @param {string} proid - 프로젝트 ID입니다.
 * @param {string} method - 변환할 방법(온라인 또는 오프라인)입니다.
 * @param {string} desid - 새로운 디자이너 ID입니다.
 * @param {Object} [option={selfMongo: null, selfCoreMongo: null}] - MongoDB 연결 옵션입니다.
 * @throws {Error} - 입력값이 유효하지 않은 경우 오류를 발생시킵니다.
 * @returns {Object} - 변환된 데이터를 반환합니다.
 */
BillMaker.prototype.designerConverting = async function (proid, method, desid, option = { selfMongo: null, selfCoreMongo: null }) {
  // 프로덕션 ID, 메서드, 디자이너 ID의 타입이 문자열인지 확인하고, 유효하지 않은 경우 오류를 발생시킵니다.
  if (typeof proid !== "string" || typeof method !== "string" || typeof desid !== "string") {
      throw new Error("invaild input");
  }

  // 현재 인스턴스를 instance 변수에 저장합니다.
  const instance = this;

  // BackWorker 모듈을 가져옵니다.
  const BackWorker = require(`${process.cwd()}/apps/backMaker/backWorker.js`);

  // 고유한 작업 식별자 생성
  const doingSignature = "billMaker_designerConvertingDoing_" + proid;

  // BackWorker 클래스의 인스턴스를 생성합니다.
  const work = new BackWorker();

  // back 객체를 this 인스턴스에서 가져옵니다.
  const back = this.back;

  // Mother 객체에서 MongoDB 관련 유틸리티 함수들과 기타 도구를 가져옵니다.
  const { mongo, mongoinfo, equalJson, sleep, fileSystem, errorLog } = this.mother;

  // 부가세 비율, 무료 비율, 디자이너 취소 관련 데이터를 가져옵니다.
  const { vatRatio, freeRatio, designerCancel } = BillMaker.billDictionary.styling.etc;

  try {
      let MONGOC, MONGOCOREC;
      let selfBoo, selfCoreBoo;
      let project;
      let thisBill, bilid;
      let serid;
      let xValue;
      let remain, contract;
      let totalNumContract, payNumContract, cancelNumContract;
      let totalNum, payNum, cancelNum;
      let totalNumR0, payNumR0, cancelNumR0;
      let totalNumR1, payNumR1, cancelNumR1;
      let pastDesid, cliid;
      let pastDesigner;
      let designer, client;
      let feeObject;
      let pastFeeObject;
      let newFeeObject;
      let remainIndex, remainItemIndex, contractIndex, contractItemIndex;
      let num;
      let pastRemainArr;
      let proposalIndex0, proposalIndex1;
      let projectWhereQuery, projectUpdateQuery;
      let whereQuery, updateQuery;
      let newResponses;
      let pastResponses;
      let newSupply;
      let classification, percentage;
      let calculate, commission;
      let pastRemainPrice;
      let newRequestAmount;
      let firstResponse, secondResponse;
      let firstBoo, remainBoo;
      let newRequestPrice;
      let remainResponse;
      let remainResponseIndex;
      let remainResponseRemainItem;
      let remainResponseRemainItemIndex;
      let responseBetween;
      let newCommission;
      let firstResponseIndex;
      let firstResponseFirstItemIndex;
      let returnObject;
      let bankName;
      let bankTo;
      let newDesignerFeeObject;
      let safeNum;
      let designerCancelObject;
      let designerCancelCalculate;
      let newFeeObjectInProposal;

      // 안전한 실행을 위해 작업이 이미 진행 중인지 확인하고, 최대 100회까지 대기합니다.
      safeNum = 0;
      while ((await fileSystem(`exist`, [`${process.cwd()}/temp/${doingSignature}.json`])) && safeNum < 100) {
          await sleep(300);
          safeNum++;
      }

      // 작업 진행 중임을 나타내는 파일을 생성합니다.
      await fileSystem(`write`, [`${process.cwd()}/temp/${doingSignature}.json`, `{ "doing": 1 }`]);

      // 반환할 객체의 초기 구조를 설정합니다.
      returnObject = this.convertingDummy();

      // MongoDB 연결 옵션을 설정합니다.
      if (option.selfMongo === undefined || option.selfMongo === null) {
          selfBoo = false;
      } else {
          selfBoo = true;
      }

      // MongoDB에 연결합니다.
      if (!selfBoo) {
          MONGOC = new mongo(mongoinfo);
          await MONGOC.connect();
      } else {
          MONGOC = option.selfMongo;
      }

      // Core MongoDB 연결 옵션을 설정합니다.
      if (option.selfCoreMongo === undefined || option.selfCoreMongo === null) {
          selfCoreBoo = false;
      } else {
          selfCoreBoo = true;
      }

      // Core MongoDB에 연결합니다.
      if (!selfCoreBoo) {
          MONGOCOREC = new mongo(mongoinfo);
          await MONGOCOREC.connect();
      } else {
          MONGOCOREC = option.selfCoreMongo;
      }

      // 프로젝트 정보를 조회합니다.
      project = await back.getProjectById(proid, { selfMongo: MONGOCOREC });
      if (project === null) {
          throw new Error("invaild proid");
      }

      // 프로젝트의 디자이너 ID가 올바른지 확인합니다.
      if (!/^d/.test(project.desid)) {
          throw new Error("unable in this project");
      }

      // 기존 디자이너 ID와 클라이언트 ID를 가져옵니다.
      pastDesid = project.desid;
      cliid = project.cliid;
      serid = project.service.serid;
      xValue = project.service.xValue;

      // 기존 디자이너, 새로운 디자이너, 클라이언트 정보를 조회합니다.
      pastDesigner = await back.getDesignerById(pastDesid, { selfMongo: MONGOCOREC });
      designer = await back.getDesignerById(desid, { selfMongo: MONGOCOREC });
      client = await back.getClientById(cliid, { selfMongo: MONGOCOREC });

      // 프로젝트의 수수료 객체를 가져옵니다.
      feeObject = null;
      for (let i = 0; i < project.proposal.detail.length; i++) {
          if (project.proposal.detail[i].desid === pastDesid) {
              for (let j = 0; j < project.proposal.detail[i].fee.length; j++) {
                  if (project.proposal.detail[i].fee[j].method === method) {
                      feeObject = project.proposal.detail[i].fee[j];
                      proposalIndex0 = i;
                      proposalIndex1 = j;
                  }
              }
          }
      }
      if (feeObject === null) {
          feeObject = project.proposal.detail[0].fee[0];
          proposalIndex0 = 0;
          proposalIndex1 = 0;
      }

      // 새로운 디자이너의 수수료 객체를 찾습니다.
      newFeeObjectInProposal = null;
      for (let i = 0; i < project.proposal.detail.length; i++) {
          if (project.proposal.detail[i].desid === desid) {
              for (let j = 0; j < project.proposal.detail[i].fee.length; j++) {
                  if (project.proposal.detail[i].fee[j].method === method) {
                      newFeeObjectInProposal = project.proposal.detail[i].fee[j];
                  }
              }
          }
      }

      // 기존 디자이너와 새로운 디자이너의 수수료를 계산합니다.
      pastFeeObject = await work.getDesignerFee(pastDesid, cliid, serid, xValue, { selfMongo: MONGOCOREC, selfLocalMongo: null });
      newFeeObject = await work.getDesignerFee(desid, cliid, serid, xValue, { selfMongo: MONGOCOREC, selfLocalMongo: null });

      // 새로운 디자이너의 수수료가 0이면 이 디자이너를 사용할 수 없으므로 오류를 반환합니다.
      if (newFeeObject.detail[method] === 0) {
        return { error: "unable in this designer" };
      } else {
        // 반환할 객체에 이전 및 새로운 서비스와 디자이너 정보를 설정합니다.
        returnObject.service.from.serid = serid;  // 이전 서비스 ID를 설정합니다.
        returnObject.service.from.xValue = project.service.xValue;  // 이전 서비스의 xValue 값을 설정합니다.
        returnObject.service.from.online = project.service.online;  // 이전 서비스의 온라인 상태를 설정합니다.
        returnObject.service.to.serid = serid;  // 새로운 서비스 ID를 설정합니다.
        returnObject.service.to.xValue = project.service.xValue;  // 새로운 서비스의 xValue 값을 설정합니다.
        returnObject.service.to.online = project.service.online;  // 새로운 서비스의 온라인 상태를 설정합니다.

        // 이전 디자이너의 정보를 설정합니다.
        returnObject.designer.from.id = pastDesigner.desid;  // 이전 디자이너 ID를 설정합니다.
        returnObject.designer.from.name = pastDesigner.designer;  // 이전 디자이너 이름을 설정합니다.
        returnObject.designer.from.phone = pastDesigner.information.phone;  // 이전 디자이너 전화번호를 설정합니다.
        returnObject.designer.from.email = pastDesigner.information.email;  // 이전 디자이너 이메일을 설정합니다.

        // 새로운 디자이너의 정보를 설정합니다.
        returnObject.designer.to.id = designer.desid;  // 새로운 디자이너 ID를 설정합니다.
        returnObject.designer.to.name = designer.designer;  // 새로운 디자이너 이름을 설정합니다.
        returnObject.designer.to.phone = designer.information.phone;  // 새로운 디자이너 전화번호를 설정합니다.
        returnObject.designer.to.email = designer.information.email;  // 새로운 디자이너 이메일을 설정합니다.

        // 이전 요청의 금액 정보를 설정합니다.
        returnObject.request.from.supply = project.process.contract.remain.calculation.amount.supply;  // 공급 금액을 설정합니다.
        returnObject.request.from.vat = project.process.contract.remain.calculation.amount.vat;  // VAT 금액을 설정합니다.
        returnObject.request.from.consumer = project.process.contract.remain.calculation.amount.consumer;  // 최종 소비자 금액을 설정합니다.

        // 이전 응답의 총 금액 정보를 설정합니다.
        returnObject.response.from.total = project.process.calculation.payments.totalAmount;  // 총 금액을 설정합니다.
        returnObject.response.from.first = project.process.calculation.payments.first.amount;  // 첫 번째 지불 금액을 설정합니다.
        returnObject.response.from.remain = project.process.calculation.payments.remain.amount;  // 잔금 금액을 설정합니다.

        // 현재 프로젝트와 관련된 청구서를 조회합니다.
        thisBill = await this.getBillsByQuery({
            $and: [
                { "links.proid": project.proid },  // 프로젝트 ID가 일치하는 청구서를 찾습니다.
                { "links.cliid": cliid },  // 클라이언트 ID가 일치하는 청구서를 찾습니다.
                { "links.desid": pastDesid },  // 이전 디자이너 ID가 일치하는 청구서를 찾습니다.
                { "links.method": method },  // 요청된 방법이 일치하는 청구서를 찾습니다.
            ]
        }, { selfMongo: MONGOC });
        
        // 청구서를 찾지 못하면 오류를 던집니다.
        if (thisBill.length === 0) {
            throw new Error("cannot found bill");
        }

        // 첫 번째 청구서 항목을 선택합니다.
        thisBill = thisBill[0];
        bilid = thisBill.bilid;

        // 청구서에서 계약과 잔금 요청을 찾습니다.
        num = 0;
        for (let request of thisBill.requests) {
            if (request.name === BillMaker.billDictionary.styling.requests.firstPayment.name) {
                contract = request;  // 첫 번째 계약 요청을 찾습니다.
                contractIndex = num;  // 해당 요청의 인덱스를 저장합니다.
                break;
            }
            num++;
        }

        num = 0;
        for (let request of thisBill.requests) {
            if (request.name === BillMaker.billDictionary.styling.requests.secondPayment.name) {
                remain = request;  // 두 번째 잔금 요청을 찾습니다.
                remainIndex = num;  // 해당 요청의 인덱스를 저장합니다.
            }
            num++;
        }

        // 계약과 잔금의 총 금액, 지불 금액, 취소 금액을 계산합니다.
        totalNumContract = 0;
        for (let { amount: { consumer } } of contract.items) {
            totalNumContract += consumer;  // 계약 항목의 소비자 금액을 합산합니다.
        }
        payNumContract = 0;
        for (let { amount } of contract.pay) {
            payNumContract += amount;  // 계약 항목의 지불 금액을 합산합니다.
        }
        cancelNumContract = 0;
        for (let { amount } of contract.cancel) {
            cancelNumContract += amount;  // 계약 항목의 취소 금액을 합산합니다.
        }

        totalNum = 0;
        for (let { amount: { consumer } } of remain.items) {
            totalNum += consumer;  // 잔금 항목의 소비자 금액을 합산합니다.
        }
        payNum = 0;
        for (let { amount } of remain.pay) {
            payNum += amount;  // 잔금 항목의 지불 금액을 합산합니다.
        }
        cancelNum = 0;
        for (let { amount } of remain.cancel) {
            cancelNum += amount;  // 잔금 항목의 취소 금액을 합산합니다.
        }

        // 잔금 항목에서 디자이너의 시간을 기준으로 금액을 계산합니다.
        pastRemainArr = thisBill.requests[remainIndex].items.toNormal();
        for (let i = 0; i < pastRemainArr.length; i++) {
            if (pastRemainArr[i].class === "designerTime") {
                remainItemIndex = i;  // 디자이너 시간 항목의 인덱스를 찾습니다.
            }
        }
        pastRemainPrice = pastRemainArr[remainItemIndex].unit.price;  // 이전 디자이너 시간의 단가를 가져옵니다.

        if (newFeeObjectInProposal !== null) {
            newRequestAmount = newFeeObjectInProposal.amount - pastRemainPrice - Math.round(project.process.contract.first.calculation.amount * (1 / (1 + vatRatio)));
        } else {
            newRequestAmount = newFeeObject.detail[method] - pastFeeObject.detail[method];
        }
        newRequestPrice = pastRemainPrice + newRequestAmount;  // 새로운 요청 금액을 계산합니다.
        newSupply = newRequestPrice + Math.round(project.process.contract.first.calculation.amount * (1 / (1 + vatRatio)));  // 새로운 공급 금액을 계산합니다.

        // 프로젝트 업데이트를 위한 쿼리를 생성합니다.
        projectWhereQuery = { proid };  // 업데이트할 프로젝트를 식별하기 위한 조건입니다.
        projectUpdateQuery = {};  // 업데이트 쿼리 객체를 초기화합니다.
        projectUpdateQuery["desid"] = desid;  // 새로운 디자이너 ID를 업데이트합니다.
        projectUpdateQuery["process.contract.remain.calculation.amount.supply"] = Math.round(newSupply);  // 새로운 공급 금액을 설정합니다.
        projectUpdateQuery["process.contract.remain.calculation.amount.vat"] = Math.round(newSupply * vatRatio);  // 새로운 VAT 금액을 설정합니다.
        projectUpdateQuery["process.contract.remain.calculation.amount.consumer"] = Math.round(newSupply * (1 + vatRatio));  // 새로운 최종 소비자 금액을 설정합니다.
        classification = designer.information.business.businessInfo.classification;  // 디자이너의 사업자 분류를 가져옵니다.
        percentage = designer.information.business.service.cost.percentage;  // 디자이너의 서비스 비용 비율을 가져옵니다.

        // 새로운 수수료 계산을 수행합니다.
        [calculate] = BillMaker.designerCalculation(newSupply, classification, percentage, client, { toArray: true });

        projectUpdateQuery["process.calculation.method"] = classification.toNormal().replace(/법인/gi, '').replace(/개인/gi, '');  // 계산 방법을 설정합니다.
        projectUpdateQuery["process.calculation.percentage"] = percentage;  // 수수료 비율을 설정합니다.
        
        if (designer.information.business.account.length > 0) {
            bankName = designer.information.business.account[0].bankName + " " + String(designer.information.business.account[0].accountNumber);  // 은행 이름과 계좌 번호를 설정합니다.
            bankTo = designer.information.business.account[0].to === undefined ? designer.designer : designer.information.business.account[0].to;  // 수익자 이름을 설정합니다.
            projectUpdateQuery["process.calculation.info.account"] = bankName;  // 계좌 정보를 설정합니다.
            projectUpdateQuery["process.calculation.info.proof"] = bankTo;  // 계좌 소유자를 설정합니다.
            projectUpdateQuery["process.calculation.info.to"] = bankTo;  // 송금 받을 이름을 설정합니다.
        }

        projectUpdateQuery["process.calculation.payments.first.amount"] = Math.floor((calculate / 2) / 10) * 10;  // 첫 번째 지불 금액을 설정합니다.
        projectUpdateQuery["process.calculation.payments.remain.amount"] = Math.floor((calculate / 2) / 10) * 10;  // 잔금 금액을 설정합니다.
        projectUpdateQuery["process.calculation.payments.totalAmount"] = projectUpdateQuery["process.calculation.payments.first.amount"] * 2;  // 총 금액을 설정합니다.

        // 프로젝트의 정보를 업데이트합니다.
        await back.updateProject([projectWhereQuery, projectUpdateQuery], { selfMongo: MONGOCOREC });

        project.proposal.detail[proposalIndex0].fee[proposalIndex1].amount = newSupply;  // 새로운 공급 금액을 제안서에 업데이트합니다.
        project.service.serid = projectUpdateQuery["service.serid"];  // 서비스 ID를 업데이트합니다.
        project.service.online = projectUpdateQuery["service.online"];  // 서비스 온라인 상태를 업데이트합니다.
        project.process.contract.remain.calculation.amount.supply = projectUpdateQuery["process.contract.remain.calculation.amount.supply"];  // 계약의 새로운 공급 금액을 업데이트합니다.
        project.process.contract.remain.calculation.amount.vat = projectUpdateQuery["process.contract.remain.calculation.amount.vat"];  // 계약의 새로운 VAT 금액을 업데이트합니다.
        project.process.contract.remain.calculation.amount.consumer = projectUpdateQuery["process.contract.remain.calculation.amount.consumer"];  // 계약의 새로운 소비자 금액을 업데이트합니다.
        project.process.calculation.payments.first.amount = projectUpdateQuery["process.calculation.payments.first.amount"];  // 첫 번째 지불 금액을 업데이트합니다.
        project.process.calculation.payments.remain.amount = projectUpdateQuery["process.calculation.payments.remain.amount"];  // 잔금 금액을 업데이트합니다.
        project.process.calculation.payments.totalAmount = projectUpdateQuery["process.calculation.payments.totalAmount"];  // 총 금액을 업데이트합니다.
        project.process.calculation.method = projectUpdateQuery["process.calculation.method"];  // 계산 방법을 업데이트합니다.
        project.process.calculation.percentage = projectUpdateQuery["process.calculation.percentage"];  // 수수료 비율을 업데이트합니다.

        // 반환 객체에 새로운 요청 금액과 응답 금액을 설정합니다.
        returnObject.request.to.supply = projectUpdateQuery["process.contract.remain.calculation.amount.supply"];  // 새로운 공급 금액을 설정합니다.
        returnObject.request.to.vat = projectUpdateQuery["process.contract.remain.calculation.amount.vat"];  // 새로운 VAT 금액을 설정합니다.
        returnObject.request.to.consumer = projectUpdateQuery["process.contract.remain.calculation.amount.consumer"];  // 새로운 소비자 금액을 설정합니다.

        returnObject.response.to.total = projectUpdateQuery["process.calculation.payments.totalAmount"];  // 새로운 총 금액을 설정합니다.
        returnObject.response.to.first = projectUpdateQuery["process.calculation.payments.first.amount"];  // 새로운 첫 번째 지불 금액을 설정합니다.
        returnObject.response.to.remain = projectUpdateQuery["process.calculation.payments.remain.amount"];  // 새로운 잔금 금액을 설정합니다.

        newCommission = Math.floor((newSupply * (percentage / 100)) / 10) * 10;  // 새로운 수수료를 계산합니다.

        // 새로운 디자이너의 수수료 객체를 생성합니다.
        newDesignerFeeObject = {
            method: feeObject.method,  // 수수료 계산 방법을 설정합니다.
            partial: feeObject.partial,  // 부분 수수료 여부를 설정합니다.
            amount: newSupply,  // 새로운 공급 금액을 설정합니다.
            discount: feeObject.discount,  // 할인 금액을 설정합니다.
            distance: {
                number: (newFeeObject.detail.distance === 0 ? 0 : feeObject.distance.number),  // 거리 수수료를 설정합니다.
                amount: newFeeObject.detail.distance,  // 거리 수수료 금액을 설정합니다.
                distance: newFeeObject.detail.travel.distance,  // 이동 거리 정보를 설정합니다.
                time: newFeeObject.detail.travel.time,  // 이동 시간 정보를 설정합니다.
                limit: feeObject.distance.limit  // 거리 수수료 한도를 설정합니다.
            }
        };

        whereQuery = { bilid };  // 청구서 ID를 사용하여 업데이트할 항목을 찾습니다.
        updateQuery = {};  // 업데이트 쿼리 객체를 초기화합니다.
        updateQuery["participant.designer.id"] = designer.desid;  // 새로운 디자이너 ID를 설정합니다.
        updateQuery["participant.designer.name"] = designer.designer;  // 새로운 디자이너 이름을 설정합니다.
        updateQuery["participant.designer.phone"] = designer.information.phone;  // 새로운 디자이너 전화번호를 설정합니다.
        updateQuery["participant.designer.email"] = designer.information.email;  // 새로운 디자이너 이메일을 설정합니다.

        // 이전 디자이너 ID를 기록하기 위해 기존의 pastDesid 배열을 업데이트하거나, 배열이 없는 경우 새로 만듭니다.
        if (Array.isArray(thisBill.links.pastDesid)) {
            updateQuery["links.pastDesid"] = equalJson(JSON.stringify(thisBill.links.pastDesid.unshift(pastDesid)));
        } else {
            updateQuery["links.pastDesid"] = [pastDesid];  // 새로운 과거 디자이너 ID 배열을 만듭니다.
        }
        updateQuery["links.desid"] = desid;  // 새로운 디자이너 ID를 링크에 설정합니다.

        // 만약 지불 금액이 0이라면 새로운 요청과 응답을 처리합니다.
        if (payNum === 0) {

            pastRemainArr[remainItemIndex].unit.price = newRequestPrice;  // 잔금 항목의 새로운 단가를 설정합니다.
            pastRemainArr[remainItemIndex].amount.supply = newRequestPrice * pastRemainArr[remainItemIndex].unit.number;  // 새로운 공급 금액을 설정합니다.
            pastRemainArr[remainItemIndex].amount.vat = Math.round(pastRemainArr[remainItemIndex].amount.supply * vatRatio);  // 새로운 VAT 금액을 설정합니다.
            pastRemainArr[remainItemIndex].amount.consumer = Math.round(pastRemainArr[remainItemIndex].amount.supply * (1 + vatRatio));  // 새로운 소비자 금액을 설정합니다.
            updateQuery["requests." + String(remainIndex) + ".items"] = equalJson(JSON.stringify(pastRemainArr));  // 요청 항목을 업데이트합니다.

            pastResponses = thisBill.responses.toNormal();  // 이전 응답 항목을 배열로 변환합니다.
            newResponses = [];  // 새로운 응답 항목을 저장할 배열을 초기화합니다.
            if (payNumContract === 0) {  // 만약 계약 지불 금액이 0이라면
                for (let res of pastResponses) {
                    if (res.name !== BillMaker.billDictionary.styling.responses.firstDesignFee.name && res.name !== BillMaker.billDictionary.styling.responses.secondDesignFee.name) {
                        newResponses.push(res);  // 첫 번째 및 두 번째 디자인 수수료가 아닌 응답 항목을 새로운 배열에 추가합니다.
                    }
                }
            } else {
                returnObject.response.additional = true;  // 추가 응답이 필요함을 표시합니다.
                for (let res of pastResponses) {
                    if (res.name !== BillMaker.billDictionary.styling.responses.secondDesignFee.name) {
                        if (res.name === BillMaker.billDictionary.styling.responses.firstDesignFee.name) {

                            designerCancelObject = equalJson(JSON.stringify(designerCancel));  // 디자이너 취소 객체를 복사합니다.
                            [designerCancelCalculate] = BillMaker.designerCalculation(designerCancelObject.unit.price, classification, 0, null, { toArray: true, forcePercentage: true });  // 취소 금액을 계산합니다.
                            designerCancelObject.unit.price = designerCancelCalculate;  // 취소 금액을 설정합니다.
                            designerCancelObject.amount.pure = designerCancelCalculate;  // 취소 순수 금액을 설정합니다.
                            designerCancelObject.amount.commission = designerCancelObject.total - designerCancelCalculate;  // 취소 수수료를 설정합니다.

                            res.items = res.items.slice(0, 1);  // 응답 항목을 하나로 줄입니다.
                            res.items[0].id = thisBill.bilid + designerCancelObject.id;  // 항목 ID를 설정합니다.
                            res.items[0].class = designerCancelObject.class;  // 항목 클래스를 설정합니다.
                            res.items[0].name = designerCancelObject.name;  // 항목 이름을 설정합니다.
                            res.items[0].description = designerCancelObject.description;  // 항목 설명을 설정합니다.
                            res.items[0].unit = designerCancelObject.unit;  // 항목 단위 정보를 설정합니다.
                            res.items[0].amount = designerCancelObject.amount;  // 항목 금액 정보를 설정합니다.
                            res.comments = designerCancelObject.comments;  // 항목에 대한 코멘트를 설정합니다.

                        }
                        newResponses.push(res);  // 새로운 응답 항목을 배열에 추가합니다.
                        break;
                    }
                }
            }
            updateQuery["responses"] = equalJson(JSON.stringify(newResponses));  // 응답 항목을 업데이트합니다.
            await this.updateBill([whereQuery, updateQuery], { selfMongo: MONGOC });  // 청구서를 업데이트합니다.
            await this.responseInjection(bilid, "firstDesignFee", client, designer, project, method, { selfMongo: MONGOC, feeObject: newDesignerFeeObject });  // 첫 번째 디자인 수수료를 추가합니다.
            await this.responseInjection(bilid, "secondDesignFee", client, designer, project, method, { selfMongo: MONGOC, feeObject: newDesignerFeeObject });  // 두 번째 디자인 수수료를 추가합니다.

        } else {

            // 요청 금액이 0보다 작을 경우, 잔금 항목의 금액을 업데이트합니다.
            if (newRequestAmount < 0) {
                pastRemainArr[remainItemIndex].unit.price = newRequestPrice;  // 새로운 단가를 설정합니다.
                pastRemainArr[remainItemIndex].amount.supply = newRequestPrice * pastRemainArr[remainItemIndex].unit.number;  // 새로운 공급 금액을 설정합니다.
                pastRemainArr[remainItemIndex].amount.vat = Math.round(pastRemainArr[remainItemIndex].amount.supply * vatRatio);  // 새로운 VAT 금액을 설정합니다.
                pastRemainArr[remainItemIndex].amount.consumer = Math.round(pastRemainArr[remainItemIndex].amount.supply * (1 + vatRatio));  // 새로운 소비자 금액을 설정합니다.
                updateQuery["requests." + String(remainIndex) + ".items"] = equalJson(JSON.stringify(pastRemainArr));  // 요청 항목을 업데이트합니다.
            } else if (newRequestAmount > 0) {  // 요청 금액이 0보다 클 경우
                returnObject.request.additional = true;  // 추가 요청이 필요함을 표시합니다.
                await this.requestInjection(bilid, "secondPayment", client, designer, project, method, { selfMongo: MONGOC, feeObject: newDesignerFeeObject });  // 두 번째 결제 요청을 삽입합니다.
                pastRemainArr[remainItemIndex].unit.price = newRequestAmount;  // 새로운 단가를 설정합니다.
                pastRemainArr[remainItemIndex].amount.supply = newRequestAmount * pastRemainArr[remainItemIndex].unit.number;  // 새로운 공급 금액을 설정합니다.
                pastRemainArr[remainItemIndex].amount.vat = Math.round(pastRemainArr[remainItemIndex].amount.supply * vatRatio);  // 새로운 VAT 금액을 설정합니다.
                pastRemainArr[remainItemIndex].amount.consumer = Math.round(pastRemainArr[remainItemIndex].amount.supply * (1 + vatRatio));  // 새로운 소비자 금액을 설정합니다.
                updateQuery["requests." + String(0) + ".items." + String(0)] = equalJson(JSON.stringify(pastRemainArr[remainItemIndex]));  // 첫 번째 요청 항목을 업데이트합니다.
            }
            await this.updateBill([whereQuery, updateQuery], { selfMongo: MONGOC });  // 청구서를 업데이트합니다.
            updateQuery = {};  // 업데이트 쿼리 객체를 초기화합니다.

            // 응답 구조를 확인하고 업데이트합니다.
            firstResponse = null;
            secondResponse = null;
            for (let res of thisBill.responses) {
                if (res.name === BillMaker.billDictionary.styling.responses.firstDesignFee.name) {
                    firstResponse = res;  // 첫 번째 디자인 수수료 응답을 찾습니다.
                    break;
                }
            }
            for (let res of thisBill.responses) {
                if (res.name === BillMaker.billDictionary.styling.responses.secondDesignFee.name) {
                    secondResponse = res;  // 두 번째 디자인 수수료 응답을 찾습니다.
                    break;
                }
            }
            if (firstResponse === null || secondResponse === null) {
                throw new Error("invaild response structure");  // 응답 구조가 올바르지 않으면 오류를 던집니다.
            }
            firstBoo = false;  // 첫 번째 응답의 지불 완료 상태를 초기화합니다.
            remainBoo = false;  // 잔금 응답의 지불 완료 상태를 초기화합니다.
            totalNumR0 = 0;
            for (let { amount: { pure } } of firstResponse.items) {
                totalNumR0 += pure;  // 첫 번째 응답 항목의 총 순수 금액을 계산합니다.
            }
            payNumR0 = 0;
            for (let { amount } of firstResponse.pay) {
                payNumR0 += amount;  // 첫 번째 응답 항목의 총 지불 금액을 계산합니다.
            }
            cancelNumR0 = 0;
            for (let { amount } of firstResponse.cancel) {
                cancelNumR0 += amount;  // 첫 번째 응답 항목의 총 취소 금액을 계산합니다.
            }
            firstBoo = (Math.floor(totalNumR0) <= Math.floor(payNumR0 - cancelNumR0));  // 첫 번째 응답의 지불 완료 여부를 확인합니다.
            totalNumR1 = 0;
            for (let { amount: { pure } } of secondResponse.items) {
                totalNumR1 += pure;  // 두 번째 응답 항목의 총 순수 금액을 계산합니다.
            }
            payNumR1 = 0;
            for (let { amount } of secondResponse.pay) {
                payNumR1 += amount;  // 두 번째 응답 항목의 총 지불 금액을 계산합니다.
            }
            cancelNumR1 = 0;
            for (let { amount } of secondResponse.cancel) {
                cancelNumR1 += amount;  // 두 번째 응답 항목의 총 취소 금액을 계산합니다.
            }
            remainBoo = (Math.floor(totalNumR1) <= Math.floor(payNumR1 - cancelNumR1));  // 잔금 응답의 지불 완료 여부를 확인합니다.

            // 두 응답 모두 지불이 완료되지 않았을 경우, 응답 항목을 업데이트하고 새로운 응답을 삽입합니다.
            if (!firstBoo && !remainBoo) {

                returnObject.response.additional = true;  // 추가 응답이 필요함을 표시합니다.
                pastResponses = thisBill.responses.toNormal();  // 이전 응답 항목을 배열로 변환합니다.
                newResponses = [];  // 새로운 응답 항목을 저장할 배열을 초기화합니다.
                for (let res of pastResponses) {
                    if (res.name !== BillMaker.billDictionary.styling.responses.secondDesignFee.name) {
                        if (res.name === BillMaker.billDictionary.styling.responses.firstDesignFee.name) {

                            designerCancelObject = equalJson(JSON.stringify(designerCancel));  // 디자이너 취소 객체를 복사합니다.
                            [designerCancelCalculate] = BillMaker.designerCalculation(designerCancelObject.unit.price, classification, 0, null, { toArray: true, forcePercentage: true });  // 취소 금액을 계산합니다.
                            designerCancelObject.unit.price = designerCancelCalculate;  // 취소 금액을 설정합니다.
                            designerCancelObject.amount.pure = designerCancelCalculate;  // 취소 순수 금액을 설정합니다.
                            designerCancelObject.amount.commission = designerCancelObject.total - designerCancelCalculate;  // 취소 수수료를 설정합니다.

                            res.items = res.items.slice(0, 1);  // 응답 항목을 하나로 줄입니다.
                            res.items[0].id = thisBill.bilid + designerCancelObject.id;  // 항목 ID를 설정합니다.
                            res.items[0].class = designerCancelObject.class;  // 항목 클래스를 설정합니다.
                            res.items[0].name = designerCancelObject.name;  // 항목 이름을 설정합니다.
                            res.items[0].description = designerCancelObject.description;  // 항목 설명을 설정합니다.
                            res.items[0].unit = designerCancelObject.unit;  // 항목 단위 정보를 설정합니다.
                            res.items[0].amount = designerCancelObject.amount;  // 항목 금액 정보를 설정합니다.
                            res.comments = designerCancelObject.comments;  // 항목에 대한 코멘트를 설정합니다.

                        }
                        newResponses.push(res);  // 새로운 응답 항목을 배열에 추가합니다.
                        break;
                    }
                }
                updateQuery = {};  // 업데이트 쿼리 객체를 초기화합니다.
                updateQuery["responses"] = equalJson(JSON.stringify(newResponses));  // 응답 항목을 업데이트합니다.
                await this.updateBill([whereQuery, updateQuery], { selfMongo: MONGOC });  // 청구서를 업데이트합니다.
                await this.responseInjection(bilid, "firstDesignFee", client, designer, project, method, { selfMongo: MONGOC, feeObject: newDesignerFeeObject });  // 첫 번째 디자인 수수료를 추가합니다.
                await this.responseInjection(bilid, "secondDesignFee", client, designer, project, method, { selfMongo: MONGOC, feeObject: newDesignerFeeObject });  // 두 번째 디자인 수수료를 추가합니다.

            } else {

                // 잔금 응답이 완료되지 않은 경우, 응답 항목을 업데이트합니다.
                if (!remainBoo) {
                    pastResponses = thisBill.responses.toNormal();  // 이전 응답 항목을 배열로 변환합니다.
                    newResponses = [];  // 새로운 응답 항목을 저장할 배열을 초기화합니다.
                    for (let res of pastResponses) {
                        if (res.name !== BillMaker.billDictionary.styling.responses.secondDesignFee.name) {
                            newResponses.push(res);  // 새로운 응답 항목을 배열에 추가합니다.
                        }
                    }
                    updateQuery = {};  // 업데이트 쿼리 객체를 초기화합니다.
                    updateQuery["responses"] = equalJson(JSON.stringify(newResponses));  // 응답 항목을 업데이트합니다.
                    await this.updateBill([whereQuery, updateQuery], { selfMongo: MONGOC });  // 청구서를 업데이트합니다.
                }

                returnObject.response.additional = true;  // 추가 응답이 필요함을 표시합니다.
                await this.responseInjection(bilid, "firstDesignFee", client, designer, project, method, { selfMongo: MONGOC, feeObject: newDesignerFeeObject });  // 첫 번째 디자인 수수료를 추가합니다.
                await this.responseInjection(bilid, "secondDesignFee", client, designer, project, method, { selfMongo: MONGOC, feeObject: newDesignerFeeObject });  // 두 번째 디자인 수수료를 추가합니다.

            }

        }

      }

      if (!selfBoo) {
          await MONGOC.close();
      }
      if (!selfCoreBoo) {
          await MONGOCOREC.close();
      }

      await fileSystem(`remove`, [`${process.cwd()}/temp/${doingSignature}.json`]);

      return returnObject;

  } catch (e) {
      await fileSystem(`remove`, [`${process.cwd()}/temp/${doingSignature}.json`]);
      await errorLog(e.message);
      console.log(e);
  }
}

/**
 * 청구서의 금액을 변환하는 비동기 함수입니다.
 * 
 * @param {string} bilid - 청구서 ID입니다.
 * @param {object} option - 옵션 객체로, MongoDB 연결 정보를 포함할 수 있습니다.
 * @param {object} [option.selfMongo=null] - 외부에서 제공된 MongoDB 연결 객체입니다.
 * @param {object} [option.selfCoreMongo=null] - 외부에서 제공된 코어 MongoDB 연결 객체입니다.
 * @throws {Error} 입력이 유효하지 않은 경우 예외를 던집니다.
 */
BillMaker.prototype.amountConverting = async function (bilid, option = { selfMongo: null, selfCoreMongo: null }) {
  // bilid가 문자열이 아닌 경우 오류를 발생시킵니다.
  if (typeof bilid !== "string") {
      throw new Error("invaild input");
  }

  const instance = this; // 현재 BillMaker 인스턴스를 참조하는 상수를 정의합니다.
  const BackWorker = require(`${process.cwd()}/apps/backMaker/backWorker.js`); // 백엔드 작업자를 동적으로 로드합니다.
  const doingSignature = "billMaker_amountConvertingDoing_" + bilid; // 현재 작업의 고유 식별자를 생성합니다.
  const work = new BackWorker(); // BackWorker 인스턴스를 생성합니다.
  const back = this.back; // 현재 인스턴스의 백엔드 참조를 가져옵니다.
  const { mongo, mongoinfo, equalJson, sleep, fileSystem } = this.mother; // Mother 메서드에서 필요한 기능들을 가져옵니다.
  const vatRatio = BillMaker.billDictionary.styling.etc.vatRatio; // VAT 비율을 가져옵니다.
  const freeRatio = BillMaker.billDictionary.styling.etc.freeRatio; // 무료 비율을 가져옵니다.
  const emptyDateValue = (new Date(2000, 0, 1)).valueOf(); // 비교에 사용할 빈 날짜 값을 정의합니다.

  try {
      // 변수들을 초기화합니다.
      let MONGOC, MONGOCOREC;
      let proid;
      let selfBoo, selfCoreBoo;
      let project;
      let thisBill;
      let serid;
      let xValue;
      let desid, cliid;
      let designer, client;
      let remain, contract;
      let first, second;
      let remainIndex, contractIndex;
      let firstIndex, secondIndex;
      let remainIndexItem, contractIndexItem;
      let firstIndexItem, secondIndexItem;
      let requestsCopied, responsesCopied;
      let whereQuery, updateQuery;
      let contractAmount;
      let supply, vat, consumer;
      let contractAmountSupply;
      let firstAmount, secondAmount;
      let percentage;
      let remainBoo, firstBoo;
      let totalNum, payNum, cancelNum;
      let feeObject, newDesignerFeeObject, unknownDesignerFee;
      let proposalIndex0, proposalIndex1;
      let method;
      let pastRemainArr;
      let newRequestAmount;
      let totalAmount;
      let safeNum;
      let payObject;
      let tempQuery;
      let payArr;

      safeNum = 0; // 안전한 루프를 위한 카운터를 초기화합니다.
      
      // 이미 작업이 진행 중인지 확인하고, 그렇다면 100번까지 시도하며 대기합니다.
      while ((await fileSystem(`exist`, [ `${process.cwd()}/temp/${doingSignature}.json` ])) && safeNum < 100) {
          await sleep(300); // 300ms 대기
          safeNum++; // 카운터 증가
      }
      
      // 작업 시작을 알리는 파일을 생성합니다.
      await fileSystem(`write`, [ `${process.cwd()}/temp/${doingSignature}.json`, `{ "doing": 1 }` ]);

      // 옵션에 selfMongo가 없으면 새 MongoDB 연결을 엽니다.
      if (option.selfMongo === undefined || option.selfMongo === null) {
          selfBoo = false;
      } else {
          selfBoo = true;
      }
      if (!selfBoo) {
          MONGOC = new mongo(mongoinfo); // 새로운 MongoDB 연결을 생성합니다.
          await MONGOC.connect(); // MongoDB에 연결합니다.
      } else {
          MONGOC = option.selfMongo; // 외부에서 제공된 MongoDB 연결을 사용합니다.
      }

      // 옵션에 selfCoreMongo가 없으면 새 Core MongoDB 연결을 엽니다.
      if (option.selfCoreMongo === undefined || option.selfCoreMongo === null) {
          selfCoreBoo = false;
      } else {
          selfCoreBoo = true;
      }
      if (!selfCoreBoo) {
          MONGOCOREC = new mongo(mongoinfo); // 새로운 Core MongoDB 연결을 생성합니다.
          await MONGOCOREC.connect(); // Core MongoDB에 연결합니다.
      } else {
          MONGOCOREC = option.selfCoreMongo; // 외부에서 제공된 Core MongoDB 연결을 사용합니다.
      }

      // 청구서 ID로 청구서를 가져옵니다.
      thisBill = await this.getBillById(bilid, { selfMongo: MONGOC });
      if (thisBill === null) {
          throw new Error("invaild bilid"); // 청구서가 존재하지 않으면 오류를 발생시킵니다.
      }

      // 청구서에서 프로젝트 ID를 가져옵니다.
      proid = thisBill.links.proid;

      // 프로젝트 ID로 프로젝트를 가져옵니다.
      project = await back.getProjectById(proid, { selfMongo: MONGOCOREC });
      if (project === null) {
          throw new Error("invaild proid"); // 프로젝트가 존재하지 않으면 오류를 발생시킵니다.
      }
      if (!/^d/.test(project.desid)) {
          throw new Error("unable in this project"); // 프로젝트 디자이너 ID가 유효하지 않으면 오류를 발생시킵니다.
      }

      // 프로젝트 정보에서 여러 값을 추출합니다.
      method = project.service.online ? "online" : "offline";
      desid = project.desid;
      cliid = project.cliid;
      designer = await back.getDesignerById(desid, { selfMongo: MONGOCOREC });
      client = await back.getClientById(cliid, { selfMongo: MONGOCOREC });
      serid = project.service.serid;
      xValue = project.service.xValue;
      contractAmount = project.process.contract.first.calculation.amount;
      contractAmountSupply = contractAmount * (1 / (1 + vatRatio));
      supply = project.process.contract.remain.calculation.amount.supply;
      vat = project.process.contract.remain.calculation.amount.vat;
      consumer = project.process.contract.remain.calculation.amount.consumer;
      firstAmount = project.process.calculation.payments.first.amount;
      secondAmount = project.process.calculation.payments.remain.amount;
      percentage = project.process.calculation.percentage;
      totalAmount = firstAmount + secondAmount;

      // 프로젝트 제안 세부 사항에서 수수료 객체를 찾습니다.
      feeObject = null;
      for (let i = 0; i < project.proposal.detail.length; i++) {
          if (project.proposal.detail[i].desid === designer.desid) {
              for (let j = 0; j < project.proposal.detail[i].fee.length; j++) {
                  if (project.proposal.detail[i].fee[j].method === method) {
                      feeObject = project.proposal.detail[i].fee[j];
                      proposalIndex0 = i;
                      proposalIndex1 = j;
                  }
              }
          }
      }
      
      // 수수료 객체가 없으면 새로 생성합니다.
      if (feeObject === null) {
          feeObject = project.proposal.detail[0].fee[0];
          proposalIndex0 = 0;
          proposalIndex1 = 0;
          unknownDesignerFee = await work.getDesignerFee(desid, cliid, serid, xValue, { selfMongo: MONGOCOREC, selfLocalMongo: null });
          newDesignerFeeObject = {
              method: feeObject.method,
              partial: feeObject.partial,
              amount: feeObject.amount,
              discount: feeObject.discount,
              distance: {
                  number: (unknownDesignerFee.detail.distance === 0 ? 0 : feeObject.distance.number),
                  amount: unknownDesignerFee.detail.distance,
                  distance: unknownDesignerFee.detail.travel.distance,
                  time: unknownDesignerFee.detail.travel.time,
                  limit: feeObject.distance.limit
              }
          };
          feeObject = equalJson(JSON.stringify(newDesignerFeeObject));
      }
      feeObject.amount = supply; // 수수료 금액을 공급 금액으로 설정합니다.

      // 청구서의 요청과 응답을 복사합니다.
      requestsCopied = thisBill.requests.toNormal();
      responsesCopied = thisBill.responses.toNormal();

      // 첫 번째 결제 요청을 찾습니다.
      for (let i = 0; i < requestsCopied.length; i++) {
          if (requestsCopied[i].name === BillMaker.billDictionary.styling.requests.firstPayment.name) {
              contract = requestsCopied[i];
              contractIndex = i;
              break;
          }
      }
      // 첫 번째 결제 요청에서 디자이너 시간을 찾습니다.
      for (let i = 0; i < contract.items.length; i++) {
          if (contract.items[i].class === "designerTime") {
              contractIndexItem = i;
              break;
          }
      }
      // 두 번째 결제 요청을 찾습니다.
      for (let i = 0; i < requestsCopied.length; i++) {
          if (requestsCopied[i].name === BillMaker.billDictionary.styling.requests.secondPayment.name) {
              remain = requestsCopied[i];
              remainIndex = i;
          }
      }
      // 두 번째 결제 요청에서 디자이너 시간을 찾습니다.
      for (let i = 0; i < remain.items.length; i++) {
          if (remain.items[i].class === "designerTime") {
              remainIndexItem = i;
              break;
          }
      }
      // 첫 번째 디자인 수수료 응답을 찾습니다.
      for (let i = 0; i < responsesCopied.length; i++) {
          if (responsesCopied[i].name === BillMaker.billDictionary.styling.responses.firstDesignFee.name) {
              first = responsesCopied[i];
              firstIndex = i;
              break;
          }
      }
      // 첫 번째 디자인 수수료 응답에서 첫 번째 항목을 찾습니다.
      for (let i = 0; i < first.items.length; i++) {
          if (first.items[i].class === "designerFeeFirst") {
              firstIndexItem = i;
              break;
          }
      }
      // 두 번째 디자인 수수료 응답을 찾습니다.
      for (let i = 0; i < responsesCopied.length; i++) {
          if (responsesCopied[i].name === BillMaker.billDictionary.styling.responses.secondDesignFee.name) {
              second = responsesCopied[i];
              secondIndex = i;
              break;
          }
      }
      // 두 번째 디자인 수수료 응답에서 두 번째 항목을 찾습니다.
      for (let i = 0; i < second.items.length; i++) {
          if (second.items[i].class === "designerFeeRemain") {
              secondIndexItem = i;
              break;
          }
      }

      // 잔금의 지불 상태를 계산합니다.
      remainBoo = false;
      totalNum = 0;
      for (let { amount: { consumer } } of remain.items) {
          totalNum += consumer;
      }
      payNum = 0;
      for (let { amount } of remain.pay) {
          payNum += amount;
      }
      cancelNum = 0;
      for (let { amount } of remain.cancel) {
          cancelNum += amount;
      }
      remainBoo = (Math.floor(totalNum) <= Math.floor(payNum + cancelNum));

      // 첫 번째 결제의 지불 상태를 계산합니다.
      firstBoo = false;
      totalNum = 0;
      for (let { amount: { pure } } of first.items) {
          totalNum += consumer;
      }
      payNum = 0;
      for (let { amount } of first.pay) {
          payNum += amount;
      }
      cancelNum = 0;
      for (let { amount } of first.cancel) {
          cancelNum += amount;
      }
      firstBoo = (Math.floor(totalNum) <= Math.floor(payNum + cancelNum));


      whereQuery = { bilid }; // 청구서 ID를 기준으로 업데이트 쿼리를 만듭니다.
      
      // 잔금과 첫 번째 결제 모두 완료되지 않은 경우
      if (!remainBoo && !firstBoo) {

          updateQuery = {}; // 업데이트 쿼리 객체를 초기화합니다.
          updateQuery["requests." + String(remainIndex) + ".items." + String(remainIndexItem) + ".unit.price"] = supply - contractAmountSupply;
          updateQuery["requests." + String(remainIndex) + ".items." + String(remainIndexItem) + ".amount.supply"] = supply - contractAmountSupply;
          updateQuery["requests." + String(remainIndex) + ".items." + String(remainIndexItem) + ".amount.vat"] = (supply - contractAmountSupply) * vatRatio;
          updateQuery["requests." + String(remainIndex) + ".items." + String(remainIndexItem) + ".amount.consumer"] = (supply - contractAmountSupply) * (1 + vatRatio);
          updateQuery["responses." + String(firstIndex) + ".items." + String(firstIndexItem) + ".unit.price"] = firstAmount;
          updateQuery["responses." + String(firstIndex) + ".items." + String(firstIndexItem) + ".amount.pure"] = firstAmount;
          updateQuery["responses." + String(firstIndex) + ".items." + String(firstIndexItem) + ".amount.commission"] = (supply * (percentage / 100)) / 2;
          updateQuery["responses." + String(secondIndex) + ".items." + String(secondIndexItem) + ".unit.price"] = secondAmount;
          updateQuery["responses." + String(secondIndex) + ".items." + String(secondIndexItem) + ".amount.pure"] = secondAmount;
          updateQuery["responses." + String(secondIndex) + ".items." + String(secondIndexItem) + ".amount.commission"] = (supply * (percentage / 100)) / 2;

      } else if (remainBoo && !firstBoo) {

          updateQuery = {}; // 업데이트 쿼리 객체를 초기화합니다.
          updateQuery["requests." + String(remainIndex) + ".items." + String(remainIndexItem) + ".unit.price"] = supply - contractAmountSupply;
          updateQuery["requests." + String(remainIndex) + ".items." + String(remainIndexItem) + ".amount.supply"] = supply - contractAmountSupply;
          updateQuery["requests." + String(remainIndex) + ".items." + String(remainIndexItem) + ".amount.vat"] = (supply - contractAmountSupply) * vatRatio;
          updateQuery["requests." + String(remainIndex) + ".items." + String(remainIndexItem) + ".amount.consumer"] = (supply - contractAmountSupply) * (1 + vatRatio);

          updateQuery["responses." + String(firstIndex) + ".items." + String(firstIndexItem) + ".unit.price"] = firstAmount;
          updateQuery["responses." + String(firstIndex) + ".items." + String(firstIndexItem) + ".amount.pure"] = firstAmount;
          updateQuery["responses." + String(firstIndex) + ".items." + String(firstIndexItem) + ".amount.commission"] = (supply * (percentage / 100)) / 2;
          updateQuery["responses." + String(secondIndex) + ".items." + String(secondIndexItem) + ".unit.price"] = secondAmount;
          updateQuery["responses." + String(secondIndex) + ".items." + String(secondIndexItem) + ".amount.pure"] = secondAmount;
          updateQuery["responses." + String(secondIndex) + ".items." + String(secondIndexItem) + ".amount.commission"] = (supply * (percentage / 100)) / 2;

      } else if (remainBoo && firstBoo) {

          updateQuery = {}; // 업데이트 쿼리 객체를 초기화합니다.
          updateQuery["requests." + String(remainIndex) + ".items." + String(remainIndexItem) + ".unit.price"] = supply - contractAmountSupply;
          updateQuery["requests." + String(remainIndex) + ".items." + String(remainIndexItem) + ".amount.supply"] = supply - contractAmountSupply;
          updateQuery["requests." + String(remainIndex) + ".items." + String(remainIndexItem) + ".amount.vat"] = (supply - contractAmountSupply) * vatRatio;
          updateQuery["requests." + String(remainIndex) + ".items." + String(remainIndexItem) + ".amount.consumer"] = (supply - contractAmountSupply) * (1 + vatRatio);

          updateQuery["responses." + String(firstIndex) + ".items." + String(firstIndexItem) + ".amount.commission"] = (supply * (percentage / 100)) * (first.items[firstIndexItem].amount.pure / totalAmount);
          updateQuery["responses." + String(secondIndex) + ".items." + String(secondIndexItem) + ".unit.price"] = totalAmount - first.items[firstIndexItem].amount.pure;
          updateQuery["responses." + String(secondIndex) + ".items." + String(secondIndexItem) + ".amount.pure"] = totalAmount - first.items[firstIndexItem].amount.pure;
          updateQuery["responses." + String(secondIndex) + ".items." + String(secondIndexItem) + ".amount.commission"] = (supply * (percentage / 100)) * ((totalAmount - first.items[firstIndexItem].amount.pure) / totalAmount);

      } else {
          throw new Error("invaild case"); // 유효하지 않은 경우 오류를 발생시킵니다.
      }

      // 첫 번째 결제의 날짜가 유효하면 지불 객체를 생성하여 업데이트합니다.
      if (project.process.calculation.payments.first.date.valueOf() > emptyDateValue) {
          payObject = this.returnBillDummies("pay");
          payObject.date = project.process.calculation.payments.first.date.toNormal();
          payObject.amount = project.process.calculation.payments.first.amount;
          payArr = [ payObject ];
          updateQuery["responses." + String(firstIndex) + ".pay"] = payArr;
      }

      // 잔금 결제의 날짜가 유효하면 지불 객체를 생성하여 업데이트합니다.
      if (project.process.calculation.payments.remain.date.valueOf() > emptyDateValue) {
          payObject = this.returnBillDummies("pay");
          payObject.date = project.process.calculation.payments.remain.date.toNormal();
          payObject.amount = project.process.calculation.payments.remain.amount;
          payArr = [ payObject ];
          updateQuery["responses." + String(secondIndex) + ".pay"] = payArr;
      }

      // 첫 번째 결제의 취소 날짜가 유효하면 취소 객체를 생성하여 업데이트합니다.
      if (project.process.calculation.payments.first.cancel.valueOf() > emptyDateValue) {
          payObject = this.returnBillDummies("pay");
          payObject.date = project.process.calculation.payments.first.cancel.toNormal();
          payObject.amount = project.process.calculation.payments.first.refund;
          payArr = [ payObject ];
          updateQuery["responses." + String(firstIndex) + ".cancel"] = payArr;
      }

      // 잔금 결제의 취소 날짜가 유효하면 취소 객체를 생성하여 업데이트합니다.
      if (project.process.calculation.payments.remain.cancel.valueOf() > emptyDateValue) {
          payObject = this.returnBillDummies("pay");
          payObject.date = project.process.calculation.payments.remain.cancel.toNormal();
          payObject.amount = project.process.calculation.payments.remain.refund;
          payArr = [ payObject ];
          updateQuery["responses." + String(secondIndex) + ".cancel"] = payArr;
      }

      // 업데이트 쿼리를 MongoDB에 적용하여 청구서를 업데이트합니다.
      await this.updateBill([ whereQuery, updateQuery ], { selfMongo: MONGOC });

      // MongoDB 연결을 닫습니다.
      if (!selfBoo) {
          await MONGOC.close();
      }
      if (!selfCoreBoo) {
          await MONGOCOREC.close();
      }

      // 작업 완료 파일을 삭제합니다.
      await fileSystem(`remove`, [ `${process.cwd()}/temp/${doingSignature}.json` ]);

  } catch (e) {
      // 오류가 발생한 경우 콘솔에 출력합니다.
      console.log(e);
  }
}

/**
 * @function requestRefund
 * @description 환불 요청을 처리하는 비동기 함수입니다. 청구서 ID, 요청 인덱스, 결제 인덱스를 받아 환불을 처리합니다.
 * @param {string} method - 환불 방법을 지정하는 문자열입니다. (예: "cardEntire", "cardPartial", "vaccountEntire", "vaccountPartial")
 * @param {string} bilid - 환불을 처리할 청구서의 ID입니다.
 * @param {number} requestIndex - 청구서 내의 요청 인덱스입니다.
 * @param {number} payIndex - 청구서 내의 결제 인덱스입니다.
 * @param {object} [option={ selfMongo: null, selfCoreMongo: null }] - 환불에 필요한 추가 옵션입니다.
 * @throws {Error} 입력된 값이 유효하지 않을 때 오류를 발생시킵니다.
 */
BillMaker.prototype.requestRefund = async function (method, bilid, requestIndex, payIndex, option = { selfMongo: null, selfCoreMongo: null }) {
  
  // 입력된 값들의 유형이 올바른지 확인합니다.
  if (typeof method !== "string" || typeof bilid !== "string" || typeof requestIndex !== "number" || typeof payIndex !== "number") {
    throw new Error(`invaild input : method => ${String(method)}, bilid => ${String(bilid)}, requestIndex => ${String(requestIndex)} / ${typeof requestIndex}, payIndex => ${String(payIndex)}, ${typeof payIndex}`);
  }
  
  // 유효한 환불 방법인지 확인합니다.
  if (!([ "cardEntire", "cardPartial", "vaccountEntire", "vaccountPartial" ]).includes(method)) {
    throw new Error("invaild method, must be : [ cardEntire, cardPartial, vaccountEntire, vaccountPartial ]");
  }
  
  // "Partial"이 포함된 환불 방법일 경우, 옵션에 percentage가 있는지 확인합니다.
  if (/Partial/gi.test(method)) {
    if (typeof option.percentage !== "number") {
      throw new Error("invaild option");
    }
  }
  
  // "vaccount"가 포함된 환불 방법일 경우, 계좌 정보가 올바르게 입력되었는지 확인합니다.
  if (/vaccount/gi.test(method)) {
    if (typeof option.accountNumber !== "string" || typeof option.bankName !== "string" || typeof option.accountName !== "string") {
      throw new Error("invaild option");
    }
  }

  const instance = this; // 현재 객체의 참조를 변수에 저장합니다.
  const address = this.address; // 객체의 address 속성을 가져옵니다.
  const back = this.back; // 객체의 back 속성을 가져옵니다.
  const crypto = require("crypto"); // crypto 모듈을 가져와 암호화 작업에 사용합니다.

  // mother 속성의 메서드들을 가져옵니다. 이 메서드들은 다양한 유틸리티 기능을 제공합니다.
  const { mongo, mongoinfo, cryptoString, requestSystem, ipCheck, equalJson, errorLog, emergencyAlarm } = this.mother;

  // 날짜를 타임스탬프 형식의 문자열로 변환하는 함수입니다.
  const dateToTimestamp = (date) => {
    const zeroAddition = (num) => { return (num < 10 ? `0${String(num)}` : String(num)); }
    return `${String(date.getFullYear())}${zeroAddition(date.getMonth() + 1)}${zeroAddition(date.getDate())}${zeroAddition(date.getHours())}${zeroAddition(date.getMinutes())}${zeroAddition(date.getSeconds())}`;
  }

  const url = "https://iniapi.inicis.com/v2/pg/refund"; // 이니시스 환불 API의 URL입니다.
  const msg = "콘솔로부터 환불 요청"; // 환불 요청 메시지입니다.
  const currency = "WON"; // 통화 단위는 "WON"입니다.
  const sha = "sha512"; // 해시 알고리즘은 sha512를 사용합니다.
  const algorithm = "aes-128-cbc"; // 암호화 알고리즘은 aes-128-cbc를 사용합니다.
  const digest = "base64"; // 암호화 결과를 base64 형식으로 인코딩합니다.
  const contentType = "application/json"; // 요청의 Content-Type 헤더입니다.
  const hashType = "hex"; // 해시 값을 hex 형식으로 변환합니다.
  const status = /Partial/gi.test(method) ? "부분 환불" : "전체 환불"; // 환불 상태를 설정합니다.
  const now = new Date(); // 현재 날짜와 시간을 저장합니다.
  const freeRatio = BillMaker.billDictionary.styling.etc.freeRatio; // BillMaker의 설정에서 freeRatio를 가져옵니다.
  const clientIp = instance.address.officeinfo.ip.outer; // 가맹점 요청 서버 IP
  const inicisKey = "Zp57ZixWL2v6sppd";
  const inicisIv = "6CGcDrnQl8jdus==";
  const mid = "MOIhomeli1";

  try {
    let type, paymethod, timestamp;
    let clientIp;
    let mid, tid;
    let price, confirmPrice;
    let hash;
    let accountNumber, bankName;
    let refundAcctNum, refundBankCode, refundAcctName;
    let response;
    let thisBill, thisRequest, thisData;
    let MONGOC, MONGOCOREC;
    let selfBoo, selfCoreBoo;
    let infoCopied, infoCopiedCopied;
    let originalPrice;
    let percentage;
    let whereQuery, updateQuery;
    let cancelArr;
    let proofsArr;
    let resultObj;
    let client, project;
    let projectWhereQuery, projectUpdateQuery;
    let totalNumR0, payNumR0, cancelNumR0;
    let totalNumR1, payNumR1, cancelNumR1;
    let firstBoo, remainBoo;
    let firstResponse, secondResponse;
    let firstResponseIndex, secondResponseIndex;
    let firstResponseIndexItemIndex, secondResponseIndexItemIndex;
    let refreshTotalAmount, refreshTotalAmountRaw;
    let calculate;
    let commission;
    let classification;
    let num;
    let refreshRemainAmount;
    let oid;
    let tempObj;
    let allCancelPrice;
    let data;

    // 옵션에 selfMongo가 지정되지 않은 경우 false로 설정하고, 지정되었을 경우 true로 설정합니다.
    if (option.selfMongo === undefined || option.selfMongo === null) {
      selfBoo = false;
    } else {
      selfBoo = true;
    }

    // selfMongo가 false일 경우, 새 MongoDB 연결을 생성하고 연결합니다.
    if (!selfBoo) {
      MONGOC = new mongo(mongoinfo);
      await MONGOC.connect();
    } else {
      MONGOC = option.selfMongo;
    }

    // 옵션에 selfCoreMongo가 지정되지 않은 경우 false로 설정하고, 지정되었을 경우 true로 설정합니다.
    if (option.selfCoreMongo === undefined || option.selfCoreMongo === null) {
      selfCoreBoo = false;
    } else {
      selfCoreBoo = true;
    }

    // selfCoreMongo가 false일 경우, 새 Core MongoDB 연결을 생성하고 연결합니다.
    if (!selfCoreBoo) {
      MONGOCOREC = new mongo(mongoinfo);
      await MONGOCOREC.connect();
    } else {
      MONGOCOREC = option.selfCoreMongo;
    }

    // 주어진 청구서 ID를 기반으로 청구서를 조회합니다.
    thisBill = await this.getBillById(bilid, { selfMongo: MONGOC });
    if (thisBill === null) {
      throw new Error("invaild bilid");
    }

    // 주어진 요청 인덱스가 유효한지 확인합니다.
    if (thisBill.requests[requestIndex] === undefined) {
      throw new Error("invaild request index");
    }

    thisRequest = thisBill.requests[requestIndex];

    // 주어진 결제 인덱스가 유효한지 확인합니다.
    if (thisRequest.pay[payIndex] === undefined) {
      throw new Error("invaild pay index");
    }

    // 첫 번째 및 두 번째 응답 항목을 초기화합니다.
    firstResponse = null;
    secondResponse = null;
    firstResponseIndexItemIndex = null;
    secondResponseIndexItemIndex = null;

    num = 0;
    // 첫 번째 디자인 수수료 응답을 찾습니다.
    for (let res of thisBill.responses) {
      if (res.name === BillMaker.billDictionary.styling.responses.firstDesignFee.name) {
        firstResponse = res;
        firstResponseIndex = num;
        break;
      }
      num++;
    }

    num = 0;
    // 첫 번째 디자인 수수료 응답에서 첫 번째 항목을 찾습니다.
    for (let item of thisBill.responses[firstResponseIndex].items) {
      if (item.class === "designerFeeFirst") {
        firstResponseIndexItemIndex = num;
      }
      num++;
    }

    num = 0;
    // 두 번째 디자인 수수료 응답을 찾습니다.
    for (let res of thisBill.responses) {
      if (res.name === BillMaker.billDictionary.styling.responses.secondDesignFee.name) {
        secondResponse = res;
        secondResponseIndex = num;
        break;
      }
      num++;
    }

    num = 0;
    // 두 번째 디자인 수수료 응답에서 두 번째 항목을 찾습니다.
    for (let item of thisBill.responses[secondResponseIndex].items) {
      if (item.class === "designerFeeRemain") {
        secondResponseIndexItemIndex = num;
      }
      num++;
    }

    // 응답 구조가 유효하지 않을 경우 오류를 발생시킵니다.
    if (firstResponse === null || secondResponse === null || firstResponseIndexItemIndex === null || secondResponseIndexItemIndex === null) {
      throw new Error("invaild response structure");
    }

    // 첫 번째 응답의 상태를 계산합니다.
    firstBoo = false;
    remainBoo = false;
    totalNumR0 = 0;
    for (let { amount: { pure } } of firstResponse.items) {
      totalNumR0 += pure;
    }

    payNumR0 = 0;
    for (let { amount } of firstResponse.pay) {
      payNumR0 += amount;
    }

    cancelNumR0 = 0;
    for (let { amount } of firstResponse.cancel) {
      cancelNumR0 += amount;
    }

    firstBoo = (Math.floor(totalNumR0) <= Math.floor(payNumR0 - cancelNumR0));

    // 두 번째 응답의 상태를 계산합니다.
    totalNumR1 = 0;
    for (let { amount: { pure } } of secondResponse.items) {
      totalNumR1 += pure;
    }

    payNumR1 = 0;
    for (let { amount } of secondResponse.pay) {
      payNumR1 += amount;
    }

    cancelNumR1 = 0;
    for (let { amount } of secondResponse.cancel) {
      cancelNumR1 += amount;
    }

    remainBoo = (Math.floor(totalNumR1) <= Math.floor(payNumR1 - cancelNumR1));

    // 클라이언트 및 프로젝트 정보를 가져옵니다.
    client = await back.getClientById(thisBill.links.cliid, { selfMongo: MONGOCOREC });
    project = await back.getProjectById(thisBill.links.proid, { selfMongo: MONGOCOREC });

    // 현재 요청의 정보를 복사합니다.
    infoCopied = thisRequest.info.toNormal();
    infoCopiedCopied = equalJson(JSON.stringify(infoCopied));

    // 특정 데이터를 필터링합니다.
    infoCopiedCopied = infoCopiedCopied.filter((obj) => {
      return (typeof obj.data === "object");
    }).filter((obj) => {
      return (obj.data.mid !== undefined && obj.data.tid !== undefined && obj.data.TotPrice !== undefined && obj.data.MOID !== undefined);
    });

    // 요청의 OID와 일치하는 데이터를 찾습니다.
    thisData = infoCopiedCopied.find((obj) => {
      return obj.data.MOID === thisRequest.pay[payIndex].oid;
    });

    // OID 데이터가 유효하지 않을 경우 오류를 발생시킵니다.
    if (thisData === undefined) {
      throw new Error("invaild oid data");
    }

    // 원래 가격을 숫자 형식으로 변환합니다.
    originalPrice = Number(thisData.data.TotPrice.replace(/[^0-9\.\-]/gi, ''));

    // 옵션에 percentage가 지정된 경우 이를 사용하고, 그렇지 않으면 100%를 사용합니다.
    if (typeof option.percentage === "number") {
      percentage = option.percentage;
    } else {
      percentage = 100;
    }

    // 환불 금액과 확인 금액을 계산합니다.
    price = Math.floor((originalPrice * (percentage / 100)) / 10) * 10;
    confirmPrice = originalPrice - price;

    // 옵션에 환불 금액이 지정된 경우 이를 사용합니다.
    if (typeof option.refundPrice === "number") {
      price = Math.floor(option.refundPrice);
      confirmPrice = originalPrice - price;
      percentage = Math.floor(((option.refundPrice / originalPrice) * 100) * 100) / 100;
    }

    timestamp = dateToTimestamp(now); // 현재 시간을 타임스탬프 형식으로 변환합니다.
    clientIp = (await ipCheck()).ip; // 클라이언트 IP를 확인합니다.
    mid = address.officeinfo.inicis.mid; // 이니시스 MID를 가져옵니다.
    tid = thisData.data.tid; // 거래 ID를 가져옵니다.
    oid = thisData.data.MOID; // 주문 ID를 가져옵니다.

    // 카드 전체 환불을 처리합니다.
    if (method === "cardEntire") {

      type = "refund";
      paymethod = "Card";
      data = { tid, msg: "취소" };
      hash = crypto.createHash(sha).update(inicisKey + mid + type + timestamp + JSON.stringify(data)).digest(hashType);
      res = await requestSystem("https://iniapi.inicis.com/v2/pg/refund", { mid, type, timestamp, clientIp, hashData: hash, data }, { "Content-Type": contentType });
      price = originalPrice;

    } 
    // 카드 부분 환불을 처리합니다.
    else if (method === "cardPartial") {

      type = "partialRefund";
      paymethod = "Card";
      data = { tid, msg: "취소", price, confirmPrice, currency, };
      hash = crypto.createHash(sha).update(inicisKey + mid + type + timestamp + JSON.stringify(data)).digest(hashType);
      res = await requestSystem("https://iniapi.inicis.com/v2/pg/partialRefund", { mid, type, timestamp, clientIp, hashData: hash, data }, { "Content-Type": contentType });

    } 
    // 가상 계좌 전체 환불을 처리합니다.
    else if (method === "vaccountEntire") {

      type = "refund";
      paymethod = "Vacct";
      data = {
        tid,
        msg: "취소",
        refundAcctNum: (await cryptoString(address.officeinfo.inicis.key, option.accountNumber, { algorithm, makeKey: false, iv: address.officeinfo.inicis.iv, digest })),
        refundBankCode: BillMaker.returnBankCode(option.bankName),
        refundAcctName: option.accountName
      };
      hash = crypto.createHash(sha).update(inicisKey + mid + type + timestamp + JSON.stringify(data)).digest(hashType);
      res = await requestSystem("https://iniapi.inicis.com/v2/pg/refund/vacct", { mid, type, timestamp, clientIp, hashData: hash, data }, { "Content-Type": contentType });
      price = originalPrice;

    } 
    // 가상 계좌 부분 환불을 처리합니다.
    else if (method === "vaccountPartial") {

      type = "partialRefund";
      paymethod = "Vacct";
      data = {
        tid,
        msg: "취소",
        price,
        confirmPrice,
        refundAcctNum: (await cryptoString(address.officeinfo.inicis.key, option.accountNumber, { algorithm, makeKey: false, iv: address.officeinfo.inicis.iv, digest })),
        refundBankCode: BillMaker.returnBankCode(option.bankName),
        refundAcctName: option.accountName
      };
      hash = crypto.createHash(sha).update(inicisKey + mid + type + timestamp + JSON.stringify(data)).digest(hashType);
      res = await requestSystem("https://iniapi.inicis.com/v2/pg/partialRefund/vacct", { mid, type, timestamp, clientIp, hashData: hash, data }, { "Content-Type": contentType });

    }

    // 환불 요청이 성공적으로 완료되었을 경우 처리합니다.
    if (res.status === 200 && typeof res.data === "object" && res.data.resultCode === "00") {

      // 가상 계좌 환불의 경우 계좌 정보를 응답 데이터에 포함시킵니다.
      if (/vaccount/gi.test(method)) {
        res.data.refundAcctNum = option.accountNumber;
        res.data.refundBankCode = option.bankName;
        res.data.refundAcctName = option.accountName;
      }

      // 환불 결과를 저장할 객체를 생성합니다.
      resultObj = { bilid };
      resultObj.bill = thisBill;
      resultObj.proid = project.proid;
      resultObj.cliid = project.cliid;
      resultObj.desid = thisBill.links.desid;
      resultObj.project = project;
      resultObj.client = client;
      resultObj.method = method;
      resultObj.price = {};
      resultObj.price.partial = (price !== originalPrice);
      resultObj.price.refund = price;
      resultObj.price.original = originalPrice;
      resultObj.price.percentage = percentage;
      resultObj.rawData = res.data;

      // MongoDB 업데이트 쿼리를 준비합니다.
      whereQuery = { bilid };
      updateQuery = {};
      projectWhereQuery = { proid: project.proid };
      projectUpdateQuery = {};

      infoCopied.unshift(res.data); // 환불 데이터를 info에 추가합니다.
      cancelArr = thisRequest.cancel.toNormal(); // 취소 배열을 가져옵니다.
      tempObj = this.returnBillDummies("pay"); // 지불 객체의 더미 데이터를 가져옵니다.
      tempObj.date = now;
      tempObj.amount = price;
      tempObj.oid = oid;
      cancelArr.unshift(tempObj); // 취소 배열에 새 항목을 추가합니다.

      proofsArr = thisRequest.proofs.toNormal(); // 증명서 배열을 가져옵니다.
      tempObj = this.returnBillDummies("proofs"); // 증명서 객체의 더미 데이터를 가져옵니다.
      tempObj.date = now;
      tempObj.method = ((/vaccount/gi.test(method) ? "무통장 입금" : "카드") + (thisData.data.P_FN_NM !== undefined ? "(" + thisData.data.P_FN_NM.replace(/카드/gi, '').replace(/은행/gi, '') + ")" : "(" + thisData.data.vactBankName.replace(/카드/gi, '').replace(/은행/gi, '') + ")") + " 취소");
      tempObj.proof = "이니시스";
      tempObj.to = client.name;
      proofsArr.unshift(tempObj); // 증명서 배열에 새 항목을 추가합니다.

      // 모든 취소 금액을 계산합니다.
      allCancelPrice = 0;
      for (let { amount } of cancelArr) {
        allCancelPrice += amount;
      }

      // 프로젝트 계산 관련 데이터를 새로고침합니다.
      refreshTotalAmountRaw = project.process.contract.remain.calculation.amount.supply - Math.round(allCancelPrice * (10 / 11));
      if (refreshTotalAmountRaw < 10) {
        refreshTotalAmountRaw = 0;
      }

      classification = project.process.calculation.method;
      [ calculate, commission ] = BillMaker.designerCalculation(refreshTotalAmountRaw, classification, project.process.calculation.percentage, client, { toArray: true });
      refreshTotalAmount = Math.floor(calculate / 10) * 10;

      // 홈리에종 관련 환불 요청일 경우의 처리입니다.
      if (/홈리에종 계약금/gi.test(thisBill.requests[requestIndex].name) || /홈리에종 잔금/gi.test(thisBill.requests[requestIndex].name)) {
        if (!firstBoo && !remainBoo) {

          updateQuery["responses." + String(firstResponseIndex) + ".items." + String(firstResponseIndexItemIndex) + ".unit.price"] = (refreshTotalAmount / 2);
          updateQuery["responses." + String(firstResponseIndex) + ".items." + String(firstResponseIndexItemIndex) + ".amount.pure"] = (refreshTotalAmount / 2);
          updateQuery["responses." + String(firstResponseIndex) + ".items." + String(firstResponseIndexItemIndex) + ".amount.commission"] = (commission / 2);
          updateQuery["responses." + String(secondResponseIndex) + ".items." + String(secondResponseIndexItemIndex) + ".unit.price"] = (refreshTotalAmount / 2);
          updateQuery["responses." + String(secondResponseIndex) + ".items." + String(secondResponseIndexItemIndex) + ".amount.pure"] = (refreshTotalAmount / 2);
          updateQuery["responses." + String(secondResponseIndex) + ".items." + String(secondResponseIndexItemIndex) + ".amount.commission"] = (commission / 2);

          projectUpdateQuery["process.calculation.payments.totalAmount"] = refreshTotalAmount;
          projectUpdateQuery["process.calculation.payments.first.amount"] = (refreshTotalAmount / 2);
          projectUpdateQuery["process.calculation.payments.remain.amount"] = (refreshTotalAmount / 2);

        } else {

          refreshRemainAmount = refreshTotalAmount - thisBill.responses[firstResponseIndex].items[firstResponseIndexItemIndex].unit.price;
          commission = commission - thisBill.responses[firstResponseIndex].items[firstResponseIndexItemIndex].amount.commission;
          updateQuery["responses." + String(secondResponseIndex) + ".items." + String(secondResponseIndexItemIndex) + ".unit.price"] = refreshRemainAmount;
          updateQuery["responses." + String(secondResponseIndex) + ".items." + String(secondResponseIndexItemIndex) + ".amount.pure"] = refreshRemainAmount;
          updateQuery["responses." + String(secondResponseIndex) + ".items." + String(secondResponseIndexItemIndex) + ".amount.commission"] = commission;

          projectUpdateQuery["process.calculation.payments.totalAmount"] = refreshTotalAmount;
          projectUpdateQuery["process.calculation.payments.remain.amount"] = refreshRemainAmount;

        }
      }

      // 청구서의 요청 정보와 취소 정보를 업데이트합니다.
      updateQuery["requests." + String(requestIndex) + ".info"] = equalJson(JSON.stringify(infoCopied));
      updateQuery["requests." + String(requestIndex) + ".cancel"] = cancelArr;
      updateQuery["requests." + String(requestIndex) + ".proofs"] = proofsArr;
      updateQuery["requests." + String(requestIndex) + ".status"] = status;

      if (/홈리에종 계약금/gi.test(thisBill.requests[requestIndex].name) || /홈리에종 잔금/gi.test(thisBill.requests[requestIndex].name)) {
        projectUpdateQuery["process.contract." + (/계약/gi.test(thisBill.requests[requestIndex].name) ? "first" : "remain") + ".cancel"] = now;
        projectUpdateQuery["process.contract." + (/계약/gi.test(thisBill.requests[requestIndex].name) ? "first" : "remain") + ".calculation.refund"] = allCancelPrice;
        projectUpdateQuery["process.contract.form.date.cancel"] = now;
      }

      // MongoDB에 청구서 업데이트 쿼리를 실행합니다.
      await this.updateBill([ whereQuery, updateQuery ], { selfMongo: MONGOC });

      // MongoDB에 프로젝트 업데이트 쿼리를 실행합니다.
      await back.updateProject([ projectWhereQuery, projectUpdateQuery ], { selfMongo: MONGOCOREC });

      // 결과 객체에 업데이트된 청구서와 프로젝트를 저장합니다.
      resultObj.bill = await this.getBillById(bilid, { selfMongo: MONGOC });
      resultObj.pastProject = resultObj.project;
      resultObj.project = await back.getProjectById(thisBill.links.proid, { selfMongo: MONGOCOREC });

    } else {
      // 환불 요청이 실패했을 경우 오류를 기록하고 알림을 보냅니다.
      resultObj = null;
      console.log("error : " + JSON.stringify(res.data, null, 2));
      await emergencyAlarm("error : " + JSON.stringify(res.data, null, 2));
    }

    // MongoDB 연결을 닫습니다.
    if (!selfBoo) {
      await MONGOC.close();
    }
    if (!selfCoreBoo) {
      await MONGOCOREC.close();
    }

    return resultObj; // 최종 결과 객체를 반환합니다.

  } catch (e) {
    console.log(e); // 오류가 발생했을 경우 콘솔에 출력합니다.
  }
}

/**
 * @method BillMaker.prototype.cashRefund
 * @description 현금 환불을 처리하는 메서드입니다. 환불 요청 또는 실행 모드를 처리하며, MongoDB를 통해 청구서 및 프로젝트 정보를 업데이트합니다.
 * @param {string} mode - "request" 또는 "execute" 모드로, 환불 요청 또는 실제 환불 실행을 결정합니다.
 * @param {string} bilid - 환불할 청구서의 ID입니다.
 * @param {number} requestIndex - 청구서 내에서 환불할 요청의 인덱스입니다.
 * @param {number} payIndex - 청구서 요청 내에서 환불할 지불 항목의 인덱스입니다.
 * @param {Object} [option={ selfMongo: null, selfCoreMongo: null }] - MongoDB 인스턴스 옵션입니다. `selfMongo`와 `selfCoreMongo`를 통해 외부 MongoDB 인스턴스를 전달할 수 있습니다.
 * @returns {Object} resultObj - 환불 결과 객체를 반환합니다.
 */

BillMaker.prototype.cashRefund = async function (mode, bilid, requestIndex, payIndex, option = { selfMongo: null, selfCoreMongo: null }) {
  const instance = this; // 현재 BillMaker 인스턴스를 참조합니다.
  const address = this.address; // BillMaker의 address 정보를 참조합니다.
  const back = this.back; // BillMaker의 back 정보를 참조합니다.
  // Mother 메서드에 접근하기 위해 mother 객체에서 필요한 메서드를 추출합니다.
  const { mongo, mongoinfo, cryptoString, requestSystem, ipCheck, equalJson, errorLog, autoComma, messageSend } = this.mother;

  try {
    let selfBoo; // selfMongo 사용 여부를 나타냅니다.
    let selfCoreBoo; // selfCoreMongo 사용 여부를 나타냅니다.
    let thisBill; // 현재 처리 중인 청구서를 저장합니다.
    let thisRequest; // 청구서 내의 특정 요청을 저장합니다.
    let MONGOC, MONGOCOREC; // MongoDB 연결 인스턴스를 저장합니다.
    let status; // 환불 상태를 저장합니다.
    let whereQuery; // MongoDB에서 청구서를 찾기 위한 쿼리 객체입니다.
    let updateQuery; // MongoDB에서 청구서를 업데이트하기 위한 쿼리 객체입니다.
    let projectWhereQuery; // 프로젝트를 찾기 위한 쿼리 객체입니다.
    let projectUpdateQuery; // 프로젝트를 업데이트하기 위한 쿼리 객체입니다.
    let infoCopied; // 청구서 요청의 정보 필드를 복사한 것입니다.
    let thisData; // 현재 요청에서 찾은 특정 데이터를 저장합니다.
    let infoCopiedCopied; // 복사된 청구서 요청 정보를 추가로 필터링한 결과를 저장합니다.
    let originalPrice; // 환불 전 원래 지불 금액을 저장합니다.
    let percentage, price; // 환불 비율과 금액을 저장합니다.
    let infoCopiedUnshift; // 업데이트된 청구서 요청 정보를 저장합니다.
    let slackMessage; // Slack 알림 메시지를 저장합니다.
    let resultObj; // 최종 결과 객체를 저장합니다.
    let accountNumber; // 환불받을 계좌번호를 저장합니다.
    let bankName; // 환불받을 은행명을 저장합니다.
    let accountName; // 환불받을 계좌명의를 저장합니다.
    let cancelCopied, proofsCopied; // 취소 및 증명 정보를 저장합니다.
    let now; // 현재 시간을 저장합니다.
    let proid; // 프로젝트 ID를 저장합니다.
    let client; // 클라이언트 정보를 저장합니다.
    let project; // 프로젝트 정보를 저장합니다.
    let firstResponse; // 첫 번째 응답 객체를 저장합니다.
    let secondResponse; // 두 번째 응답 객체를 저장합니다.
    let firstResponseIndexItemIndex; // 첫 번째 응답 항목의 인덱스를 저장합니다.
    let secondResponseIndexItemIndex; // 두 번째 응답 항목의 인덱스를 저장합니다.
    let num; // 반복문에서 사용되는 임시 변수입니다.
    let firstBoo; // 첫 번째 응답이 완전히 지불되었는지 여부를 나타냅니다.
    let remainBoo; // 두 번째 응답이 완전히 지불되었는지 여부를 나타냅니다.
    let totalNumR0; // 첫 번째 응답 항목의 총 금액을 저장합니다.
    let payNumR0; // 첫 번째 응답 항목의 지불된 금액을 저장합니다.
    let cancelNumR0; // 첫 번째 응답 항목의 취소된 금액을 저장합니다.
    let totalNumR1; // 두 번째 응답 항목의 총 금액을 저장합니다.
    let payNumR1; // 두 번째 응답 항목의 지불된 금액을 저장합니다.
    let cancelNumR1; // 두 번째 응답 항목의 취소된 금액을 저장합니다.
    let allCancelPrice; // 모든 취소된 금액의 총합을 저장합니다.
    let refreshTotalAmountRaw; // 환불 후 새로 계산된 총 금액을 저장합니다.
    let classification; // 디자이너의 분류 정보를 저장합니다.
    let calculate; // 계산된 총 금액을 저장합니다.
    let commission; // 수수료를 저장합니다.
    let refreshTotalAmount; // 새로 계산된 총 금액을 저장합니다.

    // selfMongo 옵션이 지정되지 않은 경우 false로 설정합니다.
    if (option.selfMongo === undefined || option.selfMongo === null) {
      selfBoo = false;
    } else {
      selfBoo = true;
    }

    // selfCoreMongo 옵션이 지정되지 않은 경우 false로 설정합니다.
    if (option.selfCoreMongo === undefined || option.selfCoreMongo === null) {
      selfCoreBoo = false;
    } else {
      selfCoreBoo = true;
    }

    // selfMongo 옵션이 false인 경우 새로운 MongoDB 연결을 생성합니다.
    if (!selfBoo) {
      MONGOC = new mongo(mongoinfo);
      await MONGOC.connect();
    } else {
      MONGOC = option.selfMongo;
    }

    // selfCoreMongo 옵션이 false인 경우 새로운 CoreMongo 연결을 생성합니다.
    if (!selfCoreBoo) {
      MONGOCOREC = new mongo(mongoinfo);
      await MONGOCOREC.connect();
    } else {
      MONGOCOREC = option.selfCoreMongo;
    }

    // 청구서를 ID로 조회합니다.
    thisBill = await this.getBillById(bilid, { selfMongo: MONGOC });
    if (thisBill === null) {
      throw new Error("invaild bilid"); // 청구서 ID가 유효하지 않으면 오류를 발생시킵니다.
    }

    // 요청 인덱스가 유효한지 확인합니다.
    if (thisBill.requests[requestIndex] === undefined) {
      throw new Error("invaild request index"); // 요청 인덱스가 유효하지 않으면 오류를 발생시킵니다.
    }
    thisRequest = thisBill.requests[requestIndex]; // 유효한 요청을 가져옵니다.

    // 지불 인덱스가 유효한지 확인합니다.
    if (thisRequest.pay[payIndex] === undefined) {
      throw new Error("invaild pay index"); // 지불 인덱스가 유효하지 않으면 오류를 발생시킵니다.
    }

    // 현재 요청의 정보를 복사합니다.
    infoCopied = thisRequest.info.toNormal();
    infoCopiedCopied = equalJson(JSON.stringify(infoCopied));

    // 특정 조건을 만족하는 데이터를 필터링합니다.
    infoCopiedCopied = infoCopiedCopied.filter((obj) => {
      return (typeof obj.data === "object");
    }).filter((obj) => {
      return (obj.data.mid !== undefined && obj.data.tid !== undefined && obj.data.TotPrice !== undefined && obj.data.MOID !== undefined);
    });

    // 현재 요청에서 특정 OID와 일치하는 데이터를 찾습니다.
    thisData = infoCopiedCopied.find((obj) => {
      return obj.data.MOID === thisRequest.pay[payIndex].oid;
    });
    if (thisData === undefined) {
      throw new Error("invaild oid data"); // OID 데이터가 유효하지 않으면 오류를 발생시킵니다.
    }

    // 원래 지불 금액을 숫자 형식으로 변환합니다.
    originalPrice = Number(thisData.data.TotPrice.replace(/[^0-9\.\-]/gi, ''));

    // 옵션에서 percentage를 가져오고, 없으면 100%로 설정합니다.
    if (typeof option.percentage === "number") {
      percentage = option.percentage;
    } else {
      percentage = 100;
    }

    // 환불 금액을 계산합니다.
    price = Math.floor((originalPrice * (percentage / 100)) / 10) * 10;

    // 옵션에서 환불 금액이 지정된 경우 이를 사용합니다.
    if (typeof option.refundPrice === "number") {
      price = Math.floor(option.refundPrice);
      percentage = Math.floor(((option.refundPrice / originalPrice) * 100) * 100) / 100;
    }

    // 환불할 계좌 정보를 가져옵니다.
    accountNumber = option.accountNumber;
    bankName = option.bankName;
    accountName = option.accountName;

    // 기본적으로 성공 메시지를 설정합니다.
    resultObj = { message: "success" };

    // 환불 모드가 "request"인 경우
    if (mode === "request") {

      // 청구서 요청 정보를 업데이트합니다.
      infoCopiedUnshift = equalJson(JSON.stringify(infoCopied));
      infoCopiedUnshift.unshift({
        key: "refundReceipt",
        oid: thisRequest.pay[payIndex].oid,
        data: {
          original: originalPrice,
          refund: price,
          info: { accountNumber, bankName, accountName }
        }
      });

      whereQuery = { bilid };
      updateQuery = {};
      status = "환불 요청"; // 상태를 "환불 요청"으로 설정합니다.

      // MongoDB 업데이트 쿼리를 설정합니다.
      updateQuery["requests." + String(requestIndex) + ".status"] = status;
      updateQuery["requests." + String(requestIndex) + ".info"] = infoCopiedUnshift;

      // MongoDB에서 청구서를 업데이트합니다.
      await this.updateBill([ whereQuery, updateQuery ], { selfMongo: MONGOC });

      // Slack에 환불 요청 메시지를 보냅니다.
      slackMessage = [
        thisBill.participant.customer.name + " 고객님, ",
        thisBill.participant.designer.name + " 디자이너님 현장의 ",
        thisRequest.name + " ",
        String(percentage) + "% 환불을 ",
        "요청합니다! => ",
        autoComma(price) + "원 환불",
      ].join("");
      messageSend({ text: slackMessage, channel: "#700_operation", voice: true }).catch((err) => { console.log(err); });

      // 업데이트된 청구서를 반환 객체에 저장합니다.
      resultObj.bill = await this.getBillById(bilid, { selfMongo: MONGOC });

    } else if (mode === "execute") { // 환불 모드가 "execute"인 경우

      // 프로젝트 ID를 가져옵니다.
      proid = thisBill.links.proid;

      // 클라이언트와 프로젝트 정보를 가져옵니다.
      client = await back.getClientById(thisBill.links.cliid, { selfMongo: MONGOCOREC });
      project = await back.getProjectById(thisBill.links.proid, { selfMongo: MONGOCOREC });

      whereQuery = { bilid };
      updateQuery = {};
      status = (percentage !== 100 ? "부분 환불" : "전체 환불"); // 상태를 "부분 환불" 또는 "전체 환불"로 설정합니다.

      // 취소 및 증명서 정보를 복사합니다.
      cancelCopied = equalJson(JSON.stringify(thisRequest.cancel.toNormal()));
      proofsCopied = equalJson(JSON.stringify(thisRequest.proofs.toNormal()));

      now = new Date(); // 현재 시간을 가져옵니다.

      // 취소 배열에 새 항목을 추가합니다.
      cancelCopied.unshift({
        date: now,
        amount: price,
        oid: thisRequest.pay[payIndex].oid
      });

      // 증명서 배열에 새 항목을 추가합니다.
      proofsCopied.unshift({
        date: now,
        method: "계좌 이체 취소",
        proof: "현금영수증",
        to: thisBill.participant.customer.name
      });

      // 청구서 업데이트 쿼리를 설정합니다.
      updateQuery["requests." + String(requestIndex) + ".status"] = status;
      updateQuery["requests." + String(requestIndex) + ".cancel"] = cancelCopied;
      updateQuery["requests." + String(requestIndex) + ".proofs"] = proofsCopied;

      // 프로젝트 업데이트가 필요한 경우
      if (/홈리에종 계약금/gi.test(thisRequest.name) || /홈리에종 잔금/gi.test(thisRequest.name)) {

        firstResponse = null;
        secondResponse = null;
        firstResponseIndexItemIndex = null;
        secondResponseIndexItemIndex = null;
        num = 0;

        // 첫 번째 응답을 찾습니다.
        for (let res of thisBill.responses) {
          if (res.name === BillMaker.billDictionary.styling.responses.firstDesignFee.name) {
            firstResponse = res;
            firstResponseIndex = num;
            break;
          }
          num++;
        }

        num = 0;
        // 첫 번째 응답 항목의 인덱스를 찾습니다.
        for (let item of thisBill.responses[firstResponseIndex].items) {
          if (item.class === "designerFeeFirst") {
            firstResponseIndexItemIndex = num;
          }
          num++;
        }

        num = 0;
        // 두 번째 응답을 찾습니다.
        for (let res of thisBill.responses) {
          if (res.name === BillMaker.billDictionary.styling.responses.secondDesignFee.name) {
            secondResponse = res;
            secondResponseIndex = num;
            break;
          }
          num++;
        }

        num = 0;
        // 두 번째 응답 항목의 인덱스를 찾습니다.
        for (let item of thisBill.responses[secondResponseIndex].items) {
          if (item.class === "designerFeeRemain") {
            secondResponseIndexItemIndex = num;
          }
          num++;
        }

        // 첫 번째 응답과 두 번째 응답의 지불 상태를 확인합니다.
        firstBoo = false;
        remainBoo = false;
        totalNumR0 = 0;
        for (let { amount: { pure } } of firstResponse.items) {
          totalNumR0 += pure;
        }
        payNumR0 = 0;
        for (let { amount } of firstResponse.pay) {
          payNumR0 += amount;
        }
        cancelNumR0 = 0;
        for (let { amount } of firstResponse.cancel) {
          cancelNumR0 += amount;
        }
        firstBoo = (Math.floor(totalNumR0) <= Math.floor(payNumR0 - cancelNumR0));
        totalNumR1 = 0;
        for (let { amount: { pure } } of secondResponse.items) {
          totalNumR1 += pure;
        }
        payNumR1 = 0;
        for (let { amount } of secondResponse.pay) {
          payNumR1 += amount;
        }
        cancelNumR1 = 0;
        for (let { amount } of secondResponse.cancel) {
          cancelNumR1 += amount;
        }
        remainBoo = (Math.floor(totalNumR1) <= Math.floor(payNumR1 - cancelNumR1));

        // 모든 취소된 금액을 계산합니다.
        allCancelPrice = 0;
        for (let { amount } of cancelCopied) {
          allCancelPrice += amount;
        }

        // 총 금액을 새로 계산합니다.
        refreshTotalAmountRaw = project.process.contract.remain.calculation.amount.supply - Math.round(allCancelPrice * (10 / 11));
        if (refreshTotalAmountRaw < 10) {
          refreshTotalAmountRaw = 0;
        }
        classification = project.process.calculation.method;
        [calculate, commission] = BillMaker.designerCalculation(refreshTotalAmountRaw, classification, project.process.calculation.percentage, client, { toArray: true });
        refreshTotalAmount = Math.floor(calculate / 10) * 10;

        // 프로젝트 업데이트 쿼리를 설정합니다.
        projectWhereQuery = { proid };
        projectUpdateQuery = {};

        // 첫 번째 응답 항목과 두 번째 응답 항목의 지불 상태가 모두 완료되지 않은 경우
        if (!firstBoo && !remainBoo) {

          // 첫 번째 응답 항목의 가격, 순수 금액, 수수료를 새로 계산된 금액의 절반으로 설정합니다.
          updateQuery["responses." + String(firstResponseIndex) + ".items." + String(firstResponseIndexItemIndex) + ".unit.price"] = (refreshTotalAmount / 2);
          updateQuery["responses." + String(firstResponseIndex) + ".items." + String(firstResponseIndexItemIndex) + ".amount.pure"] = (refreshTotalAmount / 2);
          updateQuery["responses." + String(firstResponseIndex) + ".items." + String(firstResponseIndexItemIndex) + ".amount.commission"] = (commission / 2);

          // 두 번째 응답 항목의 가격, 순수 금액, 수수료를 새로 계산된 금액의 절반으로 설정합니다.
          updateQuery["responses." + String(secondResponseIndex) + ".items." + String(secondResponseIndexItemIndex) + ".unit.price"] = (refreshTotalAmount / 2);
          updateQuery["responses." + String(secondResponseIndex) + ".items." + String(secondResponseIndexItemIndex) + ".amount.pure"] = (refreshTotalAmount / 2);
          updateQuery["responses." + String(secondResponseIndex) + ".items." + String(secondResponseIndexItemIndex) + ".amount.commission"] = (commission / 2);

          // 프로젝트 계산에서 총 금액과 첫 번째, 두 번째 지불 금액을 새로 계산된 금액의 절반으로 업데이트합니다.
          projectUpdateQuery["process.calculation.payments.totalAmount"] = refreshTotalAmount;
          projectUpdateQuery["process.calculation.payments.first.amount"] = (refreshTotalAmount / 2);
          projectUpdateQuery["process.calculation.payments.remain.amount"] = (refreshTotalAmount / 2);

        } else {
          // 첫 번째 응답 항목은 완료되었지만, 두 번째 응답 항목은 아직 완료되지 않은 경우

          // 두 번째 응답 항목의 잔여 금액을 첫 번째 응답 항목의 금액을 제외한 값으로 계산합니다.
          refreshRemainAmount = refreshTotalAmount - thisBill.responses[firstResponseIndex].items[firstResponseIndexItemIndex].unit.price;

          // 두 번째 응답 항목의 수수료도 첫 번째 응답 항목의 수수료를 제외한 값으로 계산합니다.
          commission = commission - thisBill.responses[firstResponseIndex].items[firstResponseIndexItemIndex].amount.commission;

          // 두 번째 응답 항목의 가격, 순수 금액, 수수료를 새로 계산된 잔여 금액으로 설정합니다.
          updateQuery["responses." + String(secondResponseIndex) + ".items." + String(secondResponseIndexItemIndex) + ".unit.price"] = refreshRemainAmount;
          updateQuery["responses." + String(secondResponseIndex) + ".items." + String(secondResponseIndexItemIndex) + ".amount.pure"] = refreshRemainAmount;
          updateQuery["responses." + String(secondResponseIndex) + ".items." + String(secondResponseIndexItemIndex) + ".amount.commission"] = commission;

          // 프로젝트 계산에서 총 금액과 잔여 금액을 업데이트된 값으로 설정합니다.
          projectUpdateQuery["process.calculation.payments.totalAmount"] = refreshTotalAmount;
          projectUpdateQuery["process.calculation.payments.remain.amount"] = refreshRemainAmount;
        }

        // 프로젝트의 계약금 또는 잔금에 대한 환불 정보를 업데이트합니다.
        if (/홈리에종 계약금/gi.test(thisRequest.name)) {
          projectUpdateQuery["process.contract.first.cancel"] = now;
          projectUpdateQuery["process.contract.first.calculation.refund"] = price;
        } else if (/홈리에종 잔금/gi.test(thisRequest.name)) {
          projectUpdateQuery["process.contract.remain.cancel"] = now;
          projectUpdateQuery["process.contract.remain.calculation.refund"] = price;
        }

        // 프로젝트 계약서의 취소 날짜를 현재 시간으로 업데이트합니다.
        projectUpdateQuery["process.contract.form.date.cancel"] = now;

        // 업데이트된 프로젝트 정보를 MongoDB에 저장합니다.
        await back.updateProject([projectWhereQuery, projectUpdateQuery], { selfMongo: MONGOCOREC });

      }

      await this.updateBill([whereQuery, updateQuery], { selfMongo: MONGOC });

      resultObj.bill = await this.getBillById(bilid, { selfMongo: MONGOC });
      resultObj.bilid = resultObj.bill.bilid;
      resultObj.proid = project.proid;
      resultObj.cliid = project.cliid;
      resultObj.desid = resultObj.bill.links.desid;
      resultObj.project = project;
      resultObj.client = client;
      resultObj.price = {};
      resultObj.price.refund = price;
      resultObj.price.original = originalPrice;
      resultObj.price.percentage = percentage;

    }

    if (!selfBoo) {
      await MONGOC.close();
    }
    if (!selfCoreBoo) {
      await MONGOCOREC.close();
    }

    return resultObj; // 최종 결과 객체를 반환합니다.

  } catch (e) {
    console.log(e); // 오류 발생 시 콘솔에 로그를 남깁니다.
    return { message: "error : " + e.message }; // 오류 메시지를 반환합니다.
  }
}

/**
 * 계약을 취소하고, 이에 따른 프로젝트와 청구서의 상태를 업데이트합니다.
 *
 * @param {string} bilid - 취소할 계약에 대한 청구서 ID.
 * @param {object} [option={ selfMongo: null, selfCoreMongo: null }] - MongoDB 연결 옵션.
 * @throws {Error} 유효하지 않은 청구서 ID가 제공되었을 때 예외를 발생시킵니다.
 */
BillMaker.prototype.contractCancel = async function (bilid, option = { selfMongo: null, selfCoreMongo: null }) {
  // bilid가 문자열이 아니면 오류를 발생시킵니다.
  if (typeof bilid !== "string") {
    throw new Error("invaild input");
  }
  
  // 인스턴스 참조를 상수로 저장합니다.
  const instance = this;
  // 백엔드 관련 메서드를 담고 있는 객체를 가져옵니다.
  const back = this.back;
  // Mother 객체로부터 필요한 메서드들을 구조 분해 할당으로 가져옵니다.
  const { mongo, mongoinfo, requestSystem, ipCheck, equalJson } = this.mother;
  // 현재 날짜와 시간을 저장합니다.
  const now = new Date();
  // 디자이너 취소와 관련된 설정 값을 가져옵니다.
  const designerCancel = BillMaker.billDictionary.styling.etc.designerCancel;

  try {
    // 변수 선언
    let response;
    let thisBill, thisData;
    let MONGOC, MONGOCOREC;
    let selfBoo, selfCoreBoo;
    let whereQuery, updateQuery;
    let resultObj;
    let project;
    let projectWhereQuery, projectUpdateQuery;
    let firstBoo, remainBoo;
    let firstResponse, secondResponse;
    let firstResponseIndex, secondResponseIndex;
    let firstResponseIndexItemIndex, secondResponseIndexItemIndex;
    let num;
    let tempObj;
    let cancelItem;
    let designer;
    let designerCancelObject;
    let classification;
    let designerCancelCalculate;

    // 옵션에서 selfMongo가 설정되지 않았으면 false로 설정하고, 아니면 true로 설정합니다.
    if (option.selfMongo === undefined || option.selfMongo === null) {
      selfBoo = false;
    } else {
      selfBoo = true;
    }

    // selfMongo가 설정되지 않았을 경우, 새로운 MongoDB 연결을 만듭니다.
    if (!selfBoo) {
      MONGOC = new mongo(mongoinfo);
      await MONGOC.connect();  // MongoDB에 연결합니다.
    } else {
      MONGOC = option.selfMongo;
    }

    // selfCoreMongo도 위와 동일한 방식으로 처리합니다.
    if (option.selfCoreMongo === undefined || option.selfCoreMongo === null) {
      selfCoreBoo = false;
    } else {
      selfCoreBoo = true;
    }
    if (!selfCoreBoo) {
      MONGOCOREC = new mongo(mongoinfo);
      await MONGOCOREC.connect();
    } else {
      MONGOCOREC = option.selfCoreMongo;
    }

    // 주어진 청구서 ID(bilid)를 기반으로 청구서 데이터를 가져옵니다.
    thisBill = await this.getBillById(bilid, { selfMongo: MONGOC });
    if (thisBill === null) {
      throw new Error("invaild bilid");  // 유효하지 않은 청구서 ID일 경우 예외를 발생시킵니다.
    }

    // 첫 번째와 두 번째 응답 항목을 초기화하고, 응답 항목과 인덱스를 추출합니다.
    firstResponse = null;
    secondResponse = null;
    firstResponseIndexItemIndex = null;
    secondResponseIndexItemIndex = null;
    num = 0;

    // 첫 번째 응답 항목과 그 인덱스를 찾습니다.
    for (let res of thisBill.responses) {
      if (res.name === BillMaker.billDictionary.styling.responses.firstDesignFee.name) {
        firstResponse = res;
        firstResponseIndex = num;
        break;
      }
      num++;
    }
    
    // 첫 번째 응답 항목 내의 각 아이템을 검사하여 해당 클래스명을 가진 항목의 인덱스를 찾습니다.
    num = 0;
    for (let item of thisBill.responses[firstResponseIndex].items) {
      if (item.class === "designerFeeFirst") {
        firstResponseIndexItemIndex = num;
      }
      num++;
    }

    // 두 번째 응답 항목과 그 인덱스를 찾습니다.
    num = 0;
    for (let res of thisBill.responses) {
      if (res.name === BillMaker.billDictionary.styling.responses.secondDesignFee.name) {
        secondResponse = res;
        secondResponseIndex = num;
        break;
      }
      num++;
    }

    // 두 번째 응답 항목 내의 각 아이템을 검사하여 해당 클래스명을 가진 항목의 인덱스를 찾습니다.
    num = 0;
    for (let item of thisBill.responses[secondResponseIndex].items) {
      if (item.class === "designerFeeRemain") {
        secondResponseIndexItemIndex = num;
      }
      num++;
    }

    // 필요한 응답 항목이 없거나 구조가 잘못된 경우 오류를 발생시킵니다.
    if (firstResponse === null || secondResponse === null || firstResponseIndexItemIndex === null || secondResponseIndexItemIndex === null) {
      throw new Error("invaild response structure");
    }

    // 프로젝트와 디자이너 정보를 가져옵니다.
    project = await back.getProjectById(thisBill.links.proid, { selfMongo: MONGOCOREC });
    designer = await back.getDesignerById(project.desid, { selfMongo: MONGOCOREC });
    classification = designer.information.business.businessInfo.classification;

    // 보고서용 객체를 초기화합니다.
    resultObj = { bilid };
    resultObj.bill = thisBill;
    resultObj.proid = project.proid;
    resultObj.cliid = project.cliid;
    resultObj.desid = thisBill.links.desid;
    resultObj.project = project;

    // MongoDB 업데이트를 위한 쿼리 객체를 초기화합니다.
    whereQuery = { bilid };
    updateQuery = {};
    projectWhereQuery = { proid: project.proid };
    projectUpdateQuery = {};

    // 취소 항목 객체를 초기화합니다.
    cancelItem = this.returnBillDummies("responseItems");

    // 디자이너 취소 정보를 JSON 형식으로 변환하고, 취소 금액을 계산합니다.
    designerCancelObject = equalJson(JSON.stringify(designerCancel));
    [ designerCancelCalculate ] = BillMaker.designerCalculation(designerCancelObject.unit.price, classification, 0, null, { toArray: true, forcePercentage: true });
    designerCancelObject.unit.price = designerCancelCalculate;
    designerCancelObject.amount.pure = designerCancelCalculate;
    designerCancelObject.amount.commission = designerCancelObject.total - designerCancelCalculate;

    // 취소 항목에 필요한 정보를 설정합니다.
    cancelItem.id = thisBill.bilid + designerCancelObject.id;
    cancelItem.class = designerCancelObject.class;
    cancelItem.name = designerCancelObject.name;
    cancelItem.description = designerCancelObject.description;
    cancelItem.unit = designerCancelObject.unit;
    cancelItem.amount = designerCancelObject.amount;

    // 첫 번째 응답 항목에 취소 항목을 설정하고, 주석을 추가합니다.
    updateQuery["responses." + String(firstResponseIndex) + ".items"] = [ cancelItem ];
    updateQuery["responses." + String(firstResponseIndex) + ".comments"] = designerCancelObject.comments;

    // 두 번째 응답 항목의 상태를 초기화합니다.
    updateQuery["responses." + String(secondResponseIndex) + ".removal"] = now;
    updateQuery["responses." + String(secondResponseIndex) + ".items." + String(secondResponseIndexItemIndex) + ".unit.price"] = 0;
    updateQuery["responses." + String(secondResponseIndex) + ".items." + String(secondResponseIndexItemIndex) + ".amount.pure"] = 0;
    updateQuery["responses." + String(secondResponseIndex) + ".items." + String(secondResponseIndexItemIndex) + ".amount.commission"] = 0;

    // 프로젝트의 계약 취소 및 금액 정보를 업데이트합니다.
    projectUpdateQuery["process.contract.first.cancel"] = now;
    projectUpdateQuery["process.contract.form.date.cancel"] = now;
    projectUpdateQuery["process.calculation.payments.totalAmount"] = designerCancelObject.amount.pure;
    projectUpdateQuery["process.calculation.payments.first.amount"] = designerCancelObject.amount.pure;
    projectUpdateQuery["process.calculation.payments.remain.amount"] = 0;

    // 청구서와 프로젝트 정보를 업데이트합니다.
    await this.updateBill([ whereQuery, updateQuery ], { selfMongo: MONGOC });
    await back.updateProject([ projectWhereQuery, projectUpdateQuery ], { selfMongo: MONGOCOREC });

    // 최신 청구서와 프로젝트 정보를 가져옵니다.
    resultObj.bill = await this.getBillById(bilid, { selfMongo: MONGOC });
    resultObj.pastProject = resultObj.project;
    resultObj.project = await back.getProjectById(thisBill.links.proid, { selfMongo: MONGOCOREC });

    // MongoDB 연결을 닫습니다.
    if (!selfBoo) {
      await MONGOC.close();
    }
    if (!selfCoreBoo) {
      await MONGOCOREC.close();
    }

    // 최종 결과 객체를 반환합니다.
    return resultObj;

  } catch (e) {
    // 오류가 발생한 경우 오류 메시지를 콘솔에 출력합니다.
    console.log(e);
  }
}

/**
 * 주어진 청구서(bilid)와 빌더(buiid)에 대해 각 공사 단계에 맞춘 금액을 주입합니다.
 *
 * @param {string} bilid - 청구서 ID.
 * @param {string} buiid - 빌더 ID.
 * @param {object} amountObject - 공사 각 단계의 금액을 포함하는 객체.
 * @param {number} amountObject.first - 첫 번째 공사 단계의 금액.
 * @param {number} amountObject.start - 공사 시작 단계의 금액.
 * @param {number} amountObject.middle - 공사 중간 단계의 금액.
 * @param {number} amountObject.remain - 공사 잔금 단계의 금액.
 * @param {object} [option={ selfMongo: null, selfCoreMongo: null }] - MongoDB 연결 옵션.
 * @throws {Error} 유효하지 않은 입력이 제공되었을 때 예외를 발생시킵니다.
 */
BillMaker.prototype.constructInjection = async function (bilid, buiid, amountObject, option = { selfMongo: null, selfCoreMongo: null }) {
  // bilid, buiid가 문자열이고 amountObject가 객체 타입인지 확인합니다.
  if (typeof bilid !== "string" || typeof buiid !== "string" || typeof amountObject !== "object") {
    throw new Error("invaild input");  // 유효하지 않은 입력이 있을 경우 예외를 발생시킵니다.
  }

  // amountObject의 각 속성이 숫자인지 확인합니다.
  if (typeof amountObject.first !== "number" || typeof amountObject.start !== "number" || typeof amountObject.middle !== "number" || typeof amountObject.remain !== "number") {
    throw new Error("invaild input");  // 금액이 숫자가 아닐 경우 예외를 발생시킵니다.
  }

  // 현재 인스턴스를 instance 변수에 저장합니다.
  const instance = this;
  // 백엔드 관련 메서드를 담고 있는 객체를 가져옵니다.
  const back = this.back;
  // Mother 객체에서 MongoDB, JSON 비교, sleep 메서드를 가져옵니다.
  const { mongo, mongoinfo, equalJson, sleep } = this.mother;

  try {
    // amountObject에서 각 공사 단계의 금액을 추출합니다.
    const { first, start, middle, remain } = amountObject;
    let thisBill;  // 청구서 데이터를 저장할 변수입니다.
    let selfBoo, selfCoreBoo;  // MongoDB 연결 상태를 나타낼 변수입니다.
    let MONGOC, MONGOCOREC;  // MongoDB 연결 객체를 저장할 변수입니다.
    let client, designer, project;  // 클라이언트, 디자이너, 프로젝트 데이터를 저장할 변수입니다.
    let builder;  // 빌더 데이터를 저장할 변수입니다.

    // 옵션에서 selfMongo가 설정되지 않았으면 false로 설정하고, 그렇지 않으면 true로 설정합니다.
    if (option.selfMongo === undefined || option.selfMongo === null) {
      selfBoo = false;
    } else {
      selfBoo = true;
    }

    // selfMongo가 설정되지 않았을 경우, 새로운 MongoDB 연결을 만듭니다.
    if (!selfBoo) {
      MONGOC = new mongo(mongoinfo);
      await MONGOC.connect();  // MongoDB에 연결합니다.
    } else {
      MONGOC = option.selfMongo;  // 옵션에서 selfMongo를 가져옵니다.
    }

    // selfCoreMongo도 selfMongo와 동일한 방식으로 처리합니다.
    if (option.selfCoreMongo === undefined || option.selfCoreMongo === null) {
      selfCoreBoo = false;
    } else {
      selfCoreBoo = true;
    }
    if (!selfCoreBoo) {
      MONGOCOREC = new mongo(mongoinfo);
      await MONGOCOREC.connect();  // Core MongoDB에 연결합니다.
    } else {
      MONGOCOREC = option.selfCoreMongo;  // 옵션에서 selfCoreMongo를 가져옵니다.
    }

    // 주어진 청구서 ID(bilid)를 이용해 청구서 데이터를 가져옵니다.
    thisBill = await this.getBillById(bilid, { selfMongo: MONGOC });
    if (thisBill === null) {
      throw new Error("invaild bilid");  // 청구서를 찾지 못했을 경우 예외를 발생시킵니다.
    }

    // 청구서에서 관련된 클라이언트 ID, 디자이너 ID, 프로젝트 ID, 결제 방법을 가져옵니다.
    const { cliid, desid, proid, method } = thisBill.links;
    // 클라이언트, 디자이너, 프로젝트, 빌더의 데이터를 각각 가져옵니다.
    client = await back.getClientById(cliid, { selfMongo: MONGOCOREC });
    designer = await back.getDesignerById(desid, { selfMongo: MONGOCOREC });
    project = await back.getProjectById(proid, { selfMongo: MONGOCOREC });
    builder = await back.getBuilderById(buiid, { selfMongo: MONGOCOREC });

    // 첫 번째 공사 단계의 금액이 0이 아닐 경우, 첫 번째 공사 요청을 생성합니다.
    if (first !== 0) {
      await this.requestInjection(bilid, "constructFirst", client, designer, project, method, { customAmount: amountObject, consumerMode: true, selfMongo: MONGOC });
    }

    // 공사 시작 단계의 금액이 0이 아닐 경우, 공사 시작 요청을 생성합니다.
    if (start !== 0) {
      await this.requestInjection(bilid, "constructStart", client, designer, project, method, { customAmount: amountObject, consumerMode: true, selfMongo: MONGOC });
    }

    // 공사 중간 단계의 금액이 0이 아닐 경우, 공사 중간 요청을 생성합니다.
    if (middle !== 0) {
      await this.requestInjection(bilid, "constructMiddle", client, designer, project, method, { customAmount: amountObject, consumerMode: true, selfMongo: MONGOC });
    }

    // 공사 잔금 단계의 금액이 0이 아닐 경우, 공사 잔금 요청을 생성합니다.
    if (remain !== 0) {
      await this.requestInjection(bilid, "constructRemain", client, designer, project, method, { customAmount: amountObject, consumerMode: true, selfMongo: MONGOC });
    }

  } catch (e) {
    // 오류가 발생한 경우, 콘솔에 오류 메시지를 출력합니다.
    console.log(e);
  }
}

/**
 * BillMaker 클래스의 taxBill 메서드는 홈택스에서 받은 세금 계산서 데이터를 처리하고, MongoDB에 저장하는 비동기 함수입니다.
 * 세금 계산서와 관련된 이메일을 읽고, HTML 파싱 및 데이터를 추출하여 DB에 저장하는 역할을 합니다.
 * @async
 * @function
 */
BillMaker.prototype.taxBill = async function () {
  // this 인스턴스를 instance 변수에 저장합니다.
  const instance = this;

  // back 객체는 this.back에서 가져옵니다.
  const back = this.back;

  // 여러 유틸리티 함수와 모듈들을 this.mother에서 가져옵니다.
  const { mongo, mongoinfo, fileSystem, shellExec, shellLink, pythonExecute, requestSystem, decryptoHash, autoComma, messageLog, messageSend, errorLog, curlRequest, equalJson, zeroAddition } = this.mother;

  // MONGOLOCALC는 MongoDB 로컬 데이터베이스에 연결하기 위한 객체를 생성합니다.
  const MONGOLOCALC = new mongo(mongoinfo);

  // HumanPacket 클래스는 사람이 처리하는 작업을 대신 수행하는 모듈로, 해당 경로에서 가져옵니다.
  const HumanPacket = require(`${process.cwd()}/apps/humanPacket/humanPacket.js`);
  
  // human 변수에 HumanPacket 클래스의 인스턴스를 생성하여 저장합니다.
  const human = new HumanPacket();

  // 로컬 MongoDB 데이터베이스에 연결을 시도합니다.
  await MONGOLOCALC.connect();
  const selfMongo = MONGOLOCALC;

  try {

    // jsdom 모듈을 가져와 HTML을 파싱하고 DOM 구조로 변환하는 데 사용합니다.
    const jsdom = require("jsdom");
    const { JSDOM } = jsdom;

    // 여러 작업에 사용될 상수들을 정의합니다.
    const mailBoxName = "mailBox"; // 메일박스 이름
    const moduleName = "getMail.py"; // 파이썬 모듈 이름
    const areaToken = "____split____"; // 데이터를 분할하기 위한 토큰
    const returnToken = "____return____"; // 라인별로 데이터를 구분하기 위한 토큰
    const nameToken = "____name____"; // 이름 구분을 위한 토큰
    const targetEmail = "hometaxadmin@hometax.go.kr"; // 타겟 이메일 주소
    const collection = "taxBill"; // MongoDB 컬렉션 이름

    // 디렉토리 관련 정보를 this에서 가져옵니다.
    const { dir, mapDir } = this;

    // 호스트 정보를 this.address에서 가져옵니다.
    const host = this.address.frontinfo.host;

    // 현재 날짜를 가져옵니다.
    const today = new Date();

    // mapDir에서 taxBill 컬렉션에 해당하는 맵핑 정보를 가져옵니다.
    const map = require(`${mapDir}/${collection}.js`);
    const { TaxBill } = map.alive(this.mother);

    // FindIndex 클래스는 배열에서 특정 패턴을 찾고 그 인덱스를 반환하는 기능을 제공합니다.
    class FindIndex extends Array {
      constructor(arr) {
        super();
        for (let i of arr) {
          this.push(i);
        }
      }

      // 특정 단어를 배열 내에서 모두 찾고, 그 인덱스를 배열로 반환하는 메서드입니다.
      findIndexAll(word, regxp = false, between = 0, start = 0) {
        let result;
        result = [];
        if (regxp) {
          for (let i = 0; i < this.length; i++) {
            if ((new RegExp(word, "gi")).test(this[i])) {
              result.push(i);
            }
          }
        } else {
          for (let i = 0; i < this.length; i++) {
            if (this[i] === word) {
              result.push(i);
            }
          }
        }
        result = result.slice(start);
        if (result.length > 1 && between > 0) {
          result.splice(1, between);
        }
        return result;
      }
    }

    // 여러 작업에 사용될 변수를 선언합니다.
    let id0, password0;
    let id1, password1;
    let mailBoxDir;
    let finalScript;
    let res;
    let mailTargets;
    let raw;
    let rawArr;
    let html;
    let search;
    let localScript;
    let res2;
    let newHtml;
    let dom;
    let finalText;
    let textArr;
    let spotTargets;
    let resultObj;
    let tempArr;
    let itemStart;
    let itemEnd;
    let startNums;
    let orderArr;
    let items;
    let supplySum;
    let vatSum;
    let tempObj;
    let minus;
    let tempNum;
    let rows;
    let num;
    let resultObjTong;
    let finalRows;
    let newMail;
    let client;
    let count;
    let readTaxBill;

    // 초기 사용자 ID와 비밀번호를 설정합니다.
    id0 = "help";
    password0 = "hlofwis83!";

    // HumanPacket을 이용하여 홈리에종 시스템에 로그인하고, 클라이언트 객체를 가져옵니다.
    client = await human.homeliaisonLogin(id0, password0);

    // 메일박스에서 총 메일 수를 가져옵니다.
    ({ count } = await client.list());

    // 세금 계산서 읽기 기능을 정의합니다.
    readTaxBill = async (newMail) => {
      try {
        // 특정 이메일 주소로부터의 메일인지 확인합니다.
        if ((new RegExp(targetEmail, "gi")).test(newMail.from)) {

          // 메일의 본문 데이터를 HTML로 디코딩합니다.
          html = Buffer.from(newMail.data.raw.map((str) => { return str === '' ? areaToken : str }).join(returnToken).split(areaToken).filter((str) => { return str !== returnToken })[5].split(returnToken).join(""), "base64").toString("utf8");
          
          // HTML에서 모든 script 태그를 검색합니다.
          search = [ ...html.matchAll(/\<script src\=\"([^\"]+)\"\>\<\/script\>/gi) ];
    
          // 로컬에서 실행할 스크립트를 초기화합니다.
          localScript = '';
          for (let arr of search) {
            res2 = await curlRequest(arr[1]); // 스크립트를 다운로드합니다.
            localScript += res2; // 스크립트를 추가합니다.
            localScript += "\n\n";
          }
    
          // 스크립트 태그를 로컬 스크립트로 대체합니다.
          localScript = `<script>\n\n${localScript}\n\n</script>`;
    
          // HTML에서 원래 스크립트 태그를 제거하고 로컬 스크립트를 추가합니다.
          newHtml = html.replace(/\<script src\=\"([^\"]+)\"\>\<\/script\>/gi, '');
          newHtml = newHtml.replace(/\<\/head\>/g, localScript + "</head>").replace(/src\=\"[^\"]+\"/gi, "").replace(/href\=\"[^\"]+\"/gi, "");
          newHtml = newHtml.replace(/\<script defer\>[^\<]+\<\/script\>/gi, '');
          
          // 복호화와 관련된 스크립트를 추가합니다.
          newHtml += `\n\n<script>
          var s = document.getElementById("idCriHeader").value;
          var decodeHeader = CryptoJS.enc.Base64.parse(s);
          var words = decodeHeader.words;
          var decHeader="";
          for(i=0; i < decodeHeader.sigBytes; i++)
          {
            var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
            var bite2 = bite ^ 0x6b;
            decHeader = decHeader + String.fromCharCode(bite2);
          }
          decHeader = decHeader.replace(/\\r\\n/gi, '||');
          decHeader = decHeader.replace(/\\n/gi, '||');
          Cri_Header_parser(decHeader);
          Cri_Check_Pwd("2218149759");
          CriDisplayBody();
          </script>`;
    
          // 새로운 HTML을 DOM으로 파싱하여 실행합니다.
          dom = new JSDOM(newHtml, { runScripts: "dangerously" });

          // DOM에서 세금 계산서 정보를 추출합니다.
          finalText = dom.window.document.getElementById('CriMsgPosition').contentWindow.document.querySelector("table").textContent;
          textArr = finalText.split("\n");
          textArr = textArr.filter((i) => { return (i.trim() !== ""); });
          textArr = new FindIndex(textArr.map((i) => { return i.trim(); }));
    
          // 세금 계산서 데이터 추출에 필요한 타겟 정보들을 설정합니다.
          spotTargets = [
            { word: "번호", not: "상호", regxp: true, between: 1, start: 1, column: "business" },
            { word: "상호\\(", not: "성명", regxp: true, between: 0, start: 0, column: "company" },
            { word: "성명", not: "사업장", regxp: false, between: 0, start: 0, column: "name" },
            { word: "사업장", not: "업태", regxp: false, between: 0, start: 0, column: "address" },
            { word: "업태", not: "종목", regxp: false, between: 0, start: 0, column: "status" },
            { word: "종목", not: "이메일", regxp: false, between: 0, start: 0, column: "detail" },
            { word: "이메일", not: "이메일", regxp: false, between: 0, start: 0, column: "email" },
          ];

          // 새로운 TaxBill 객체를 생성하고, 메일의 날짜와 함께 초기화합니다.
          resultObj = new TaxBill(null);
          resultObj.make(textArr[2], newMail.date);
    
          // 위에서 정의한 spotTargets 정보를 사용하여, 이메일에서 필요한 정보를 추출합니다.
          for (let { word, not, regxp, between, start, column } of spotTargets) {
            tempArr = textArr.findIndexAll(word, regxp, between, start);
            if (tempArr.length < 2) {
              throw new Error("invaild text");
            }
            resultObj.who.from[column] = textArr[tempArr[0] + 1] === not ? "" : textArr[tempArr[0] + 1];
            resultObj.who.to[column] = textArr[tempArr[1] + 1] === not ? "" : textArr[tempArr[1] + 1];
          }
    
          // 비고(remark) 항목을 찾아서 그 다음부터 품목(item) 정보를 추출합니다.
          tempArr = textArr.findIndexAll("비고");
          if (tempArr.length < 2) {
            throw new Error("invaild text");
          }
          itemStart = tempArr[1] + 1;
          tempArr = textArr.findIndexAll("합계금액");
          if (tempArr.length < 1) {
            throw new Error("invaild text");
          }
          itemEnd = tempArr[0] - 1;
    
          textArr = Array.from(textArr);
          textArr = textArr.slice(itemStart, itemEnd + 1);
    
          // 품목 정보의 시작 인덱스를 추출합니다.
          startNums = [];
          for (let i = 0; i < textArr.length; i++) {
            if (i !== textArr.length - 1) {
              if (/^[0-1][0-9]$/.test(textArr[i].trim())) {
                if (/^[0-9][0-9]$/.test(textArr[i + 1].trim())) {
                  startNums.push(i);
                }
              }
            }
          }
    
          // 각 품목 정보의 범위를 설정합니다.
          orderArr = [];
          for (let i = 0; i < startNums.length; i++) {
            if (i === startNums.length - 1) {
              orderArr.push([ startNums[i], textArr.length ]);
            } else {
              orderArr.push([ startNums[i], startNums[i + 1] ]);
            }
          }
    
          // 각 품목 정보를 배열로 저장합니다.
          items = [];
          for (let i = 0; i < orderArr.length; i++) {
            tempArr = [];
            num = 0;
            for (let j = orderArr[i][0]; j < orderArr[i][1]; j++) {
              if (num === 0) {
                if (/^[0-1][0-9]$/.test(textArr[j].trim())) {
                  tempArr.push(textArr[j].trim());
                } else {
                  throw new Error("item month error");
                }
              } else if (num === 1) {
                if (/^[0-4][0-9]$/.test(textArr[j].trim())) {
                  tempArr.push(textArr[j].trim());
                } else {
                  throw new Error("item date error");
                }
              } else if (num === 2) {
    
                tempNum = orderArr[i][1] - orderArr[i][0];
                if (tempNum === 9) {
                  for (let k = 0; k < 7; k++) {
                    tempArr.push(textArr[j + k]);
                  }
                } else if (tempNum === 8) {
                  if (/[0-9\,\-]/g.test(textArr[orderArr[i][1] - 1].trim()) && textArr[orderArr[i][1] - 1].replace(/[0-9\,\-]/g, '') === '') {
                    for (let k = 0; k < 6; k++) {
                      tempArr.push(textArr[j + k]);
                    }
                    tempArr.push("");
                  } else {
                    tempArr.push("");
                    for (let k = 0; k < 6; k++) {
                      tempArr.push(textArr[j + k]);
                    }
                  }
                } else if (tempNum === 7 || tempNum === 6 || tempNum === 5) {
                  if (/[0-9\,\-]/g.test(textArr[orderArr[i][1] - 1].trim()) && textArr[orderArr[i][1] - 1].replace(/[0-9\,\-]/g, '') === '') {
                    tempArr.push(textArr[j].replace(/[0-9\,\-]/g, '') === '' ? "" : textArr[j]);
                    tempArr.push(textArr[j + 1].replace(/[0-9\,\-]/g, '') === '' ? "" : textArr[j + 1]);
                    tempArr.push(1);
                    tempArr.push(textArr[orderArr[i][1] - 2]);
                    tempArr.push(textArr[orderArr[i][1] - 2]);
                    tempArr.push(textArr[orderArr[i][1] - 1]);
                    tempArr.push("");
                  } else {
                    tempArr.push(textArr[j].replace(/[0-9\,\-]/g, '') === '' ? "" : textArr[j]);
                    tempArr.push(textArr[j + 1].replace(/[0-9\,\-]/g, '') === '' ? "" : textArr[j + 1]);
                    tempArr.push(1);
                    tempArr.push(textArr[orderArr[i][1] - 3]);
                    tempArr.push(textArr[orderArr[i][1] - 3]);
                    tempArr.push(textArr[orderArr[i][1] - 2]);
                    tempArr.push(textArr[orderArr[i][1] - 1]);
                  }
                } else if (tempNum === 4) {
                  tempArr.push("");
                  tempArr.push("");
                  tempArr.push(1);
                  tempArr.push(textArr[j]);
                  tempArr.push(textArr[j]);
                  tempArr.push(textArr[j + 1]);
                  tempArr.push("");
                } else {
                  throw new Error("item error");
                }
              }
              num++;
            }
            items.push(tempArr);
          }
    
          // 공급가액과 부가세 합계를 초기화합니다.
          supplySum = 0;
          vatSum = 0;
    
          // 각 품목 데이터를 추출하여 계산합니다.
          for (let arr of items) {
            tempObj = {
              month: Number(arr[0].replace(/^0/, '')),
              date: Number(arr[1]),
              name: arr[2],
              ea: arr[3],
              amount: Number(arr[4]),
              unit: Number(arr[5].replace(/[^0-9\-]/g, '')),
              supply: Number(arr[6].replace(/[^0-9\-]/g, '')),
              vat: Number(arr[7].replace(/[^0-9\-]/g, '')),
              etc: arr[8]
            };
            resultObj.items.push(tempObj);
            supplySum += tempObj.supply;
            vatSum += tempObj.vat;
          }
    
          // 최종 합계를 계산하여 TaxBill 객체에 저장합니다.
          resultObj.sum.total = supplySum + vatSum;
          resultObj.sum.supply = supplySum;
          resultObj.sum.vat = vatSum;
    
          // MongoDB에 저장된 동일한 ID의 문서를 검색합니다.
          finalRows = await back.mongoRead(collection, { id: resultObj.id }, { selfMongo });

          // 해당 문서가 없으면 새로운 문서를 생성하고 알림을 보냅니다.
          if (finalRows.length === 0) {
            await back.mongoCreate(collection, resultObj, { selfMongo });
            console.log("mongo insert");
            await messageSend({ text: resultObj.toMessage(), channel: "#701_taxbill" });
          }
    
        } else {
          throw new Error("invail index arr");
        }
      } catch(e) {
        // 오류가 발생하면 로그를 기록합니다.
        await errorLog(e.message);
        console.log(e);
      }
    }

    // 메일박스에서 각 메일을 하나씩 읽어들입니다.
    for (let i = 0; i < count; i++) {
      [ newMail ] = await human.getMails(id0, password0, [ count - i ]);
      if ((new RegExp(targetEmail, "gi")).test(newMail.from)) {
        try {
          await readTaxBill(newMail);
        } catch (e) {
          console.log(e);
        }
      }
    }

    // MongoDB 연결을 종료하고, 작업이 성공적으로 완료되었음을 로그에 기록합니다.
    await MONGOLOCALC.close();
    await client.quit();
    return true;

  } catch (e) {
    // 오류가 발생하면 로그를 기록합니다.
    try {
      await MONGOLOCALC.close();
    } catch {}
    await errorLog(e.message);
    console.log(e);
    return false;
  }
}

/**
 * BillMaker 클래스의 parsingCashReceipt 메서드
 * 
 * 이 메서드는 홈택스에서 현금영수증 데이터를 가져와서 파싱한 후, 외부 시스템으로 전송하는 작업을 수행합니다.
 * 
 * @param {boolean} noHeadlessMode - 브라우저를 헤드리스 모드로 실행할지 여부 (기본값은 false)
 * @returns {boolean} - 작업 성공 여부를 반환
 */
BillMaker.prototype.parsingCashReceipt = async function (noHeadlessMode = false) {
  // 인스턴스 참조를 위해 this를 instance에 할당
  const instance = this;
  // 주소 정보를 가져오기 위해 address 변수에 this.address 할당
  const address = this.address;
  // Mother 클래스에서 여러 유틸리티 함수들을 destructuring으로 할당
  const { errorLog, emergencyAlarm, dateToString, stringToDate, equalJson, requestSystem } = this.mother;
  // GoogleChrome 모듈을 로드하여 크롬 브라우저를 조작하기 위한 객체를 생성할 준비
  const GoogleChrome = require(`${process.cwd()}/apps/googleAPIs/googleChrome.js`);
  // xml2json 모듈을 로드하여 XML 데이터를 JSON으로 변환할 준비
  const xmlParser = require("xml2json");
  
  try {
    // GoogleChrome 객체를 생성하여 크롬 브라우저 조작을 시작
    const chrome = new GoogleChrome();
    // chrome 객체의 scriptChain 메서드를 사용해 지정된 웹사이트에서 스크립트를 실행하고 결과를 가져옴
    const frontResult = await chrome.scriptChain([
      {
        // 홈택스 로그인 페이지로 이동하고 로그인 스크립트를 실행
        link: "https://www.hometax.go.kr/websquare/websquare.wq?w2xPath=/ui/comm/a/b/UTXPPABA01.xml&w2xHome=/ui/pp/&w2xDocumentRoot=",
        func: async function () {
          try {
            // 지정된 시간 동안 대기하는 함수를 정의 (비동기 함수)
            const waitSleep = function (time) {
              let timeoutId = null;
              return new Promise(function (resolve, reject) {
                timeoutId = setTimeout(function () {
                  resolve('awake');
                  clearTimeout(timeoutId);
                }, time);
              });
            }

            // 로그인 버튼 및 입력 필드의 ID를 변수로 선언
            const idLoginButtonId = "anchor15";
            const returnButtonId = "anchor25";
            const inputs = {
              id: "iptUserId",
              pwd: "iptUserPw"
            };

            // 로그인 버튼 클릭 전 대기
            await waitSleep(500);

            // 로그인 버튼 클릭
            document.getElementById(idLoginButtonId).click();

            // 로그인 후 대기
            await waitSleep(2000);

            // 사용자 ID와 비밀번호를 입력하고 제출 버튼을 클릭
            document.getElementById(inputs.id).value = INFO.officeinfo.hometax.user;
            document.getElementById(inputs.pwd).value = INFO.officeinfo.hometax.password;
            document.getElementById(returnButtonId).click();

            return 1; // 성공적으로 실행되면 1을 반환
          } catch (e) {
            return 0; // 오류 발생 시 0을 반환
          }
        },
      },
      {
        // 홈택스 현금영수증 조회 페이지로 이동하고 데이터를 요청하는 스크립트 실행
        link: "https://tecr.hometax.go.kr/websquare/websquare.html?w2xPath=/ui/cr/c/b/UTECRCB013.xml",
        func: async function () {
          try {
            // 데이터 요청에 필요한 변수들을 정의
            const actionId = "ATECRCBA001R03";
            const screenId = "UTECRCB013";
            const pageInfoId = "pageInfoVO";
            const txprDscmNo = INFO.officeinfo.hometax.business.replace(/[^0-9]/gi, '');
            const pblClCd = "all";
            const tinNumber = INFO.officeinfo.hometax.tin;
            const fromDate = new Date();
            const toDate = new Date();
            const headers = {
              "Content-Type": "application/xml; charset=UTF-8",
              "Host": `tecr.hometax.go.kr`,
              "Origin": `https://tecr.hometax.go.kr`,
              "Referer": `https://tecr.hometax.go.kr/websquare/websquare.html?w2xPath=/ui/cr/c/b/UTECRCB013.xml`,
              "Sec-Ch-Ua": `"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"`,
              "Sec-Ch-Ua-Mobile": `?0`,
              "Sec-Ch-Ua-Platform": `"macOS"`,
              "Sec-Fetch-Dest": `empty`,
              "Sec-Fetch-Mode": `cors`,
              "Sec-Fetch-Site": `same-origin`,
              "User-Agent": `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36`,
            };

            // 조회 기간을 설정 (지난 달의 1일부터 현재 날짜까지)
            fromDate.setMonth(fromDate.getMonth() - 1);
            fromDate.setDate(1);

            // 홈택스 API에 현금영수증 데이터를 요청
            const res = await fetch("https://tecr.hometax.go.kr/wqAction.do?actionId=" + actionId + "&screenId=" + screenId + "&popupYn=false&realScreenId=", {
              method: "POST",
              headers,
              body: `<map id="${actionId}">
              <sumTotaTrsAmt/><tin>${tinNumber}</tin><txprDscmNo/>
              <trsDtRngStrt>${GeneralJs.dateToString(fromDate).replace(/[^0-9]/gi, '')}</trsDtRngStrt>
              <trsDtRngEnd>${GeneralJs.dateToString(toDate).replace(/[^0-9]/gi, '')}</trsDtRngEnd>
              <pblClCd>${pblClCd}</pblClCd>
              </map>`
            });

            // 응답을 텍스트로 변환하여 XML 파싱
            const text = await res.text();
            const xml = (new window.DOMParser()).parseFromString(text, "text/xml");
            const pageSize = Number(xml.querySelector("pageSize") === null ? 10 : xml.querySelector("pageSize").textContent);
            const countArr = [ ...xml.querySelectorAll("totalCount") ].map((dom) => { return Number(dom.textContent) }).filter((n) => { return n !== 0 && !Number.isNaN(n) });
            countArr.sort((a, b) => { return b - a });
            const [ totalCount ] = countArr.length > 0 ? countArr : [ 0 ];
            const length = Math.ceil(totalCount / pageSize);
            let thisResponse;
            let thisText;
            let xmlArr;

            // 전체 페이지에서 데이터를 수집하여 xmlArr 배열에 저장
            xmlArr = [];
            for (let i = 0; i < length; i++) {
              thisResponse = await fetch("https://tecr.hometax.go.kr/wqAction.do?actionId=" + actionId + "&screenId=" + screenId + "&popupYn=false&realScreenId=", {
                method: "POST",
                headers,
                body: `<map id="${actionId}">
                <sumTotaTrsAmt/>
                <tin>${tinNumber}</tin>
                <txprDscmNo/>
                <trsDtRngStrt>${GeneralJs.dateToString(fromDate).replace(/[^0-9]/gi, '')}</trsDtRngStrt>
                <trsDtRngEnd>${GeneralJs.dateToString(toDate).replace(/[^0-9]/gi, '')}</trsDtRngEnd>
                <pblClCd>${pblClCd}</pblClCd>
                <map id="${pageInfoId}">
                <pageSize>${String(pageSize)}</pageSize>
                <pageNum>${String(i + 1)}</pageNum>
                <totalCount>${String(totalCount)}</totalCount>
                </map></map>`,
              });
              thisText = await thisResponse.text();
              xmlArr.push(thisText);
            }

            return xmlArr; // 모든 페이지에서 수집된 XML 데이터를 반환
          } catch (e) {
            return "error : " + e.message; // 오류가 발생하면 오류 메시지를 반환
          }
        }
      },
      {
        // 홈택스 현금영수증 상세 페이지로 이동하고 데이터를 요청하는 스크립트 실행
        link: "https://tecr.hometax.go.kr/websquare/websquare.html?w2xPath=/ui/cr/c/b/UTECRCB005.xml",
        func: async function () {
          try {
            // 데이터 요청에 필요한 변수들을 정의
            const actionId = "ATECRCBA001R02";
            const screenId = "UTECRCB005";
            const pageInfoId = "pageInfoVO";
            const txprDscmNo = INFO.officeinfo.hometax.business.replace(/[^0-9]/gi, '');
            const spjbTrsYn = "all";
            const pubcUserNo = "all";
            const spstCnfrId = "all";
            const tinNumber = INFO.officeinfo.hometax.tin;
            const fromDate = new Date();
            const toDate = new Date();
            const headers = {
              "Content-Type": "application/xml; charset=UTF-8",
              "Host": `tecr.hometax.go.kr`,
              "Origin": `https://tecr.hometax.go.kr`,
              "Referer": `https://tecr.hometax.go.kr/websquare/websquare.html?w2xPath=/ui/cr/c/b/UTECRCB005.xml`,
              "Sec-Ch-Ua": `"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"`,
              "Sec-Ch-Ua-Mobile": `?0`,
              "Sec-Ch-Ua-Platform": `"macOS"`,
              "Sec-Fetch-Dest": `empty`,
              "Sec-Fetch-Mode": `cors`,
              "Sec-Fetch-Site": `same-origin`,
              "User-Agent": `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36`,
            };

            // 조회 기간을 설정 (지난 달의 1일부터 현재 날짜까지)
            fromDate.setMonth(fromDate.getMonth() - 1);
            fromDate.setDate(1);

            // 홈택스 API에 현금영수증 상세 데이터를 요청
            const res = await fetch("https://tecr.hometax.go.kr/wqAction.do?actionId=" + actionId + "&screenId=" + screenId + "&popupYn=false&realScreenId=", {
              method: "POST",
              headers,
              body: `<map id="${actionId}">
              <tin>${tinNumber}</tin>
              <spjbTrsYn>${spjbTrsYn}</spjbTrsYn>
              <pubcUserNo>${pubcUserNo}</pubcUserNo>
              <spstCnfrId>${spstCnfrId}</spstCnfrId>
              <sumTotaTrsAmt/>
              <mrntTxprDscmNoEncCntn/>
              <trsDtRngStrt>${GeneralJs.dateToString(fromDate).replace(/[^0-9]/gi, '')}</trsDtRngStrt>
              <trsDtRngEnd>${GeneralJs.dateToString(toDate).replace(/[^0-9]/gi, '')}</trsDtRngEnd>
              <txprDscmNo>${txprDscmNo}</txprDscmNo>
              </map>`
            });

            // 응답을 텍스트로 변환하여 XML 파싱
            const text = await res.text();
            const xml = (new window.DOMParser()).parseFromString(text, "text/xml");
            const pageSize = Number(xml.querySelector("pageSize") === null ? 10 : xml.querySelector("pageSize").textContent);
            const countArr = [ ...xml.querySelectorAll("totalCount") ].map((dom) => { return Number(dom.textContent) }).filter((n) => { return n !== 0 && !Number.isNaN(n) });
            countArr.sort((a, b) => { return b - a });
            const [ totalCount ] = countArr.length > 0 ? countArr : [ 0 ];
            const length = Math.ceil(totalCount / pageSize);
            let thisResponse;
            let thisText;
            let xmlArr;

            // 전체 페이지에서 데이터를 수집하여 xmlArr 배열에 저장
            xmlArr = [];
            for (let i = 0; i < length; i++) {
              thisResponse = await fetch("https://tecr.hometax.go.kr/wqAction.do?actionId=" + actionId + "&screenId=" + screenId + "&popupYn=false&realScreenId=", {
                method: "POST",
                headers,
                body: `<map id="${actionId}">
                <tin>${tinNumber}</tin>
                <spjbTrsYn>${spjbTrsYn}</spjbTrsYn>
                <pubcUserNo>${pubcUserNo}</pubcUserNo>
                <spstCnfrId>${spstCnfrId}</spstCnfrId>
                <sumTotaTrsAmt/>
                <mrntTxprDscmNoEncCntn/>
                <trsDtRngStrt>${GeneralJs.dateToString(fromDate).replace(/[^0-9]/gi, '')}</trsDtRngStrt>
                <trsDtRngEnd>${GeneralJs.dateToString(toDate).replace(/[^0-9]/gi, '')}</trsDtRngEnd>
                <txprDscmNo>${txprDscmNo}</txprDscmNo>
                <map id="${pageInfoId}">
                <pageSize>${String(pageSize)}</pageSize>
                <pageNum>${String(i + 1)}</pageNum>
                <totalCount>${String(totalCount)}</totalCount>
                </map></map>`,
              });
              thisText = await thisResponse.text();
              xmlArr.push(thisText);
            }

            return xmlArr; // 모든 페이지에서 수집된 XML 데이터를 반환
          } catch (e) {
            return "error : " + e.message; // 오류가 발생하면 오류 메시지를 반환
          }
        }
      }
    ], 2500, {}, noHeadlessMode); // 각 스크립트를 실행하고 결과를 수집 (기본 대기 시간은 2500ms)

    if (!Array.isArray(frontResult)) {
      throw new Error(frontResult.message); // frontResult가 배열이 아니면 오류 발생
    }

    const [ one, outXml, inXml ] = frontResult; // frontResult 배열에서 XML 데이터를 추출

    if (!Array.isArray(outXml)) {
      throw new Error(outXml); // outXml이 배열이 아니면 오류 발생
    }

    if (!Array.isArray(inXml)) {
      throw new Error(inXml); // inXml이 배열이 아니면 오류 발생
    }

    // outXml을 JSON으로 변환하여 outObject 배열에 저장
    const outObject = outXml.map((text) => {
      return JSON.parse(xmlParser.toJson(text));
    });

    // outObject에서 필요한 정보를 추출하여 outList 배열에 저장
    const outList = [];
    for (let obj of outObject) {
      if (Array.isArray(obj.map.list.map)) {
        for (let obj2 of obj.map.list.map) {
          outList.push(obj2);
        }
      } else {
        outList.push(obj.map.list.map);
      }
    }

    // inXml을 JSON으로 변환하여 inObject 배열에 저장
    const inObject = inXml.map((text) => {
      return JSON.parse(xmlParser.toJson(text));
    });

    // inObject에서 필요한 정보를 추출하여 inList 배열에 저장
    const inList = [];
    for (let obj of inObject) {
      if (Array.isArray(obj.map.list.map)) {
        for (let obj2 of obj.map.list.map) {
          inList.push(obj2);
        }
      } else {
        inList.push(obj.map.list.map);
      }
    }

    // 현금영수증 정보들을 중간 가공하여 outMiddle 배열에 저장
    let outMiddle = [];
    for (let obj of outList) {
      outMiddle.push({
        method: obj.pblClCd,
        time: stringToDate(obj.trsDtm.trim()),
        supply: Number(obj.splCft),
        vat: Number(obj.vaTxamt),
        service: Number(obj.tip),
        total: Number(obj.totaTrsAmt),
        id: obj.aprvNo,
        issuance: obj.spstCnfrPartNo,
        deal: /승인/gi.test(obj.trsClNm),
        etc: obj.cshptUsgClNm,
      });
    }

    // 현금영수증 상세 정보들을 중간 가공하여 inMiddle 배열에 저장
    let inMiddle = [];
    for (let obj of inList) {
      inMiddle.push({
        time: stringToDate(obj.trsDtTime.trim()),
        business: obj.mrntTxprDscmNoEncCntn,
        from: obj.mrntTxprNm,
        item: obj.itmNm,
        supply: Number(obj.splCft),
        vat: Number(obj.vaTxamt),
        service: Number(obj.tip),
        total: Number(obj.totaTrsAmt),
        id: obj.aprvNo,
        issuance: obj.spstCnfrPartNo,
        deal: /승인/gi.test(obj.trsClNm),
        etc: obj.prhTxamtDdcClNm,
      });
    }

    // 가공된 현금영수증 데이터를 외부 시스템에 전송
    await requestSystem("https://" + address.officeinfo.host + ":3002/cashReceipt", { json: JSON.stringify({ cashOut: [ outMiddle ] }) }, { headers: { "Content-Type": "application/json" } });
    await requestSystem("https://" + address.officeinfo.host + ":3002/cashReceipt", { json: JSON.stringify({ cashIn: [ inMiddle ] }) }, { headers: { "Content-Type": "application/json" } });

    return true; // 작업이 성공적으로 완료되면 true 반환

  } catch (e) {
    // 오류가 발생하면 긴급 경고 메시지 발송
    await emergencyAlarm("cashReceipt fail : " + e.message + " / " + JSON.stringify(new Date()));
    console.log(e); // 오류 로그 출력
    return false; // 작업 실패 시 false 반환
  }
}

/**
 * BillMaker 클래스의 메서드로, 홈택스를 통해 자동으로 현금영수증을 발행합니다.
 * @async
 * @function BillMaker.prototype.issueCashReceipt
 * @param {number} amount - 현금영수증 발행 금액.
 * @param {string} phone - 현금영수증 발행 대상자의 전화번호.
 * @returns {Promise<boolean>} - 발행 성공 여부를 나타내는 boolean 값. 발행이 성공하면 true, 실패하면 false.
 */
BillMaker.prototype.issueCashReceipt = async function (amount, phone) {
  // this를 통해 BillMaker 인스턴스를 instance 변수에 저장. 메서드 내부에서 사용하기 위함.
  const instance = this;
  // 홈택스 관련 주소 정보를 담고 있는 address 객체를 가져옴.
  const address = this.address;
  // Mother 메서드에서 필요한 유틸리티 함수들을 가져옴.
  const { errorLog, emergencyAlarm, dateToString, stringToDate, equalJson, requestSystem } = this.mother;
  // Google Chrome을 제어하기 위한 모듈을 가져옴.
  const GoogleChrome = require(`${process.cwd()}/apps/googleAPIs/googleChrome.js`);
  // XML 데이터를 JSON으로 변환하기 위한 xml2json 모듈을 가져옴.
  const xmlParser = require("xml2json");

  try {
    // Google Chrome 인스턴스를 생성하여 제어할 준비를 함.
    const chrome = new GoogleChrome();

    // scriptChain 메서드를 사용하여 홈택스 웹사이트에서 자동으로 스크립트를 실행하여 현금영수증을 발행함.
    const frontResult = await chrome.scriptChain([
      {
        // 첫 번째 스크립트: 홈택스 로그인 페이지에 접속하여 로그인 절차를 수행.
        link: "https://www.hometax.go.kr/websquare/websquare.wq?w2xPath=/ui/comm/a/b/UTXPPABA01.xml&w2xHome=/ui/pp/&w2xDocumentRoot=",
        func: async function () {
          try {
            // 일정 시간(밀리초 단위) 동안 대기하는 함수.
            const waitSleep = function (time) {
              let timeoutId = null;
              return new Promise(function (resolve) {
                timeoutId = setTimeout(function () {
                  resolve('awake');
                  clearTimeout(timeoutId);
                }, time);
              });
            }

            // 로그인 페이지에서 사용할 HTML 요소들의 ID를 정의.
            const idLoginButtonId = "anchor15"; // 로그인 버튼 ID
            const returnButtonId = "anchor25"; // 로그인 완료 후 반환 버튼 ID
            const inputs = {
              id: "iptUserId", // 사용자 ID 입력 필드 ID
              pwd: "iptUserPw"  // 비밀번호 입력 필드 ID
            };

            // 0.5초 대기 후 로그인 버튼 클릭.
            await waitSleep(500);
            document.getElementById(idLoginButtonId).click();

            // 2초 대기 후 ID와 비밀번호 입력 필드에 값 설정.
            await waitSleep(2000);
            document.getElementById(inputs.id).value = INFO.officeinfo.hometax.user; // 사용자 ID 입력
            document.getElementById(inputs.pwd).value = INFO.officeinfo.hometax.password; // 비밀번호 입력
            document.getElementById(returnButtonId).click(); // 로그인 후 다음 단계로 넘어가기 위해 버튼 클릭
  
            return 1; // 성공 시 1 반환
          } catch (e) {
            return 0; // 실패 시 0 반환
          }
        },
      },
      {
        // 두 번째 스크립트: 현금영수증 발행 페이지에 접속하여 발행 절차를 수행.
        link: "https://tecr.hometax.go.kr/websquare/websquare.wq?w2xPath=/ui/cr/c/b/UTECRCB041.xml",
        func: async function () {
          try {
            // 일정 시간 대기하는 함수 재정의.
            const waitSleep = function (time) {
              let timeoutId = null;
              return new Promise(function (resolve) {
                timeoutId = setTimeout(function () {
                  resolve('awake');
                  clearTimeout(timeoutId);
                }, time);
              });
            }

            // 현금영수증 발행에 필요한 정보 설정.
            const actionId = "ATECRCBA003C01"; // 액션 ID
            const screenId = "UTECRCB041"; // 스크린 ID
            const txprDscmNo = INFO.officeinfo.hometax.business.replace(/[^0-9]/gi, ''); // 사업자 등록번호에서 숫자만 추출
            const tinNumber = INFO.officeinfo.hometax.tin; // 사업자의 TIN 번호
            const mapId = "cshptIsfIsnPubcDVO"; // 맵 ID
            const headers = {
              "Content-Type": "application/xml; charset=UTF-8",
              "Host": `tecr.hometax.go.kr`,
              "Origin": `https://tecr.hometax.go.kr`,
              "Referer": `https://tecr.hometax.go.kr/websquare/websquare.html?w2xPath=/ui/cr/c/b/UTECRCB013.xml`,
              "Sec-Ch-Ua": `"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"`,
              "Sec-Ch-Ua-Mobile": `?0`,
              "Sec-Ch-Ua-Platform": `"macOS"`,
              "Sec-Fetch-Dest": `empty`,
              "Sec-Fetch-Mode": `cors`,
              "Sec-Fetch-Site": `same-origin`,
              "User-Agent": `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36`,
            };

            let res, amount;
            let phone;
            let supply, vat;
            let time, date;
            let now;
            let tip;

            // 1초 대기 후 현재 시점의 날짜와 시간 정보 설정.
            await waitSleep(1000);

            // 전역 객체 TONG에서 금액과 전화번호를 가져옴.
            amount = TONG.amount;
            supply = Math.ceil(amount / 1.1); // 부가세 포함 금액에서 공급가액 계산.
            vat = amount - supply; // 부가세 계산.
            phone = TONG.phone; // 대상 전화번호 설정.
            tip = 0; // 팁 초기화.
            now = GeneralJs.dateToString(new Date(), true); // 현재 날짜와 시간을 문자열로 변환.
            date = now.split(" ")[0].replace(/[^0-9]/gi, ''); // 날짜 부분에서 숫자만 추출.
            time = now.split(" ")[1].replace(/[^0-9]/gi, ''); // 시간 부분에서 숫자만 추출.

            // 홈택스 API를 호출하여 현금영수증 발행 요청을 전송.
            res = await fetch("https://tecr.hometax.go.kr/wqAction.do?actionId=" + actionId + "&screenId=" + screenId + "&popupYn=false&realScreenId=", {
              method: "POST",
              headers: headers,
              body: `
              <map id="${actionId}">
              <bmanTin/><tin>${tinNumber}</tin>
              <cshptTrsTypeCd>01</cshptTrsTypeCd>
              <map id="${mapId}">
              <cshptUsgClCd>0</cshptUsgClCd>
              <spstCnfrClCd>03</spstCnfrClCd>
              <trsDt>${date}</trsDt>
              <trsTime>${time}</trsTime>
              <cshptInptClCd>1</cshptInptClCd>
              <tip>${String(tip)}</tip>
              <spstCnfrNoEncCntn>${phone.replace(/[^0-9]/gi, '')}</spstCnfrNoEncCntn>
              <rcprTin></rcprTin>
              <totaTrsAmt>${String(amount)}</totaTrsAmt>
              <splCft>${String(supply)}</splCft>
              <vaTxamt>${String(vat)}</vaTxamt>
              <trsClCd>0</trsClCd>
              <cshptIsnMmoCntn></cshptIsnMmoCntn></map></map>`
            });

            // API 호출 결과에서 발행 완료 여부를 확인하여 true 또는 false 반환.
            const text = await res.text();
            return (/발급/gi.test(text) && /완료/gi.test(text));
          } catch (e) {
            // 예외 발생 시 에러를 콘솔에 출력.
            console.log(e);
          }
        }
      }
    ], 2500, { amount, phone });

    // 발행 실패 시 예외 발생 처리.
    if (!Array.isArray(frontResult)) {
      throw new Error("issue cash receipt fail");
    }
    if (frontResult.length <= 1) {
      throw new Error("issue cash receipt fail");
    }

    // 현금영수증 발행이 성공했음을 반환.
    return frontResult[1];
  } catch (e) {
    // 발행 과정 중 에러가 발생할 경우, 비상 알람을 보내고 에러 메시지를 기록.
    await emergencyAlarm("issue cashReceipt fail : " + e.message + " / " + JSON.stringify(new Date()));
    console.log(e);
    return false;
  }
}

module.exports = BillMaker;
