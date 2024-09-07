/**
 * @const {string} collectionName - 콜렉션의 이름을 정의
 * @description 홈리에종이 촬영이 끝난 고객에게 보낸 홈리에종 서비스 평가지에 대해 고객이 기입한 평가 기록
 */
const collectionName = "clientEvaluation"; // 'clientEvaluation'은 고객의 서비스 평가 기록을 저장하는 콜렉션 이름

/**
 * @const {string} collectionDescription - 콜렉션 설명
 * @description 홈리에종 서비스 완료 후 고객이 작성한 평가 데이터를 기록한 디비
 */
const collectionDescription = "홈리에종이 촬영이 끝난 고객에게 보낸 홈리에종 서비스 평가지에 대해 고객이 기입한 평가 기록"; // 콜렉션의 용도와 내용을 설명

/**
 * @const {Object} collectionSampleData0 - 첫 번째 샘플 데이터
 * @property {string} _id - MongoDB 고유 식별자
 * @property {string} proid - 프로젝트 ID
 * @property {string} desid - 디자이너 ID
 * @property {string} cliid - 고객 ID
 * @property {Date} date - 평가 작성 일시
 * @property {Object} construct - 시공 관련 정보
 * @property {number} construct.level - 시공 난이도
 * @property {number} construct.period - 시공 기간
 * @property {Object} spend - 비용 관련 정보
 * @property {number} spend.total - 총 지출 금액
 * @property {number} spend.construct - 시공 관련 지출 금액
 * @property {number} spend.styling - 스타일링 관련 지출 금액
 * @property {Object} purchase - 구매 관련 정보
 * @property {number} purchase.list - 구매 목록 수
 * @property {number} purchase.furniture - 가구 구매 여부 (1: 구매, 0: 구매 안 함)
 * @property {number} purchase.period - 구매 기간
 * @property {number} purchase.compliance - 약속 이행율 (0~1 사이 값)
 * @property {Object} satisfaction - 고객 만족도
 * @property {number} satisfaction.design - 디자인 만족도 (0~5)
 * @property {number} satisfaction.feedback - 피드백 만족도 (0~5)
 * @property {number} satisfaction.operation - 운영 만족도 (0~5)
 */
const collectionSampleData0 = {
  _id: "66d7b4b99ccf37ed63ecc745", // 고유 식별자 (MongoDB에서 자동 생성)
  proid: "p2407_aa29s", // 해당 프로젝트의 고유 ID
  desid: "d2310_aa07s", // 해당 디자이너의 고유 ID
  cliid: "c2107_aa93s", // 해당 고객의 고유 ID
  date: "2024-09-04T01:15:37.203Z", // 평가가 작성된 날짜 및 시간
  construct: {
    level: 0, // 시공 난이도, 0은 기본 난이도
    period: 0, // 시공 기간, 0은 정보 없음
  },
  spend: {
    total: 10000000, // 총 지출 금액, 1천만 원
    construct: 0, // 시공 관련 지출 금액, 정보 없음
    styling: 10000000, // 스타일링에 지출한 금액, 1천만 원
  },
  purchase: {
    list: 2, // 구매 목록 수, 총 2건
    furniture: 1, // 가구 구매 여부, 1은 구매한 것
    period: 0, // 구매 기간, 정보 없음
    compliance: 0.659357, // 약속 이행율, 65.9% 정도
  },
  satisfaction: {
    design: 2, // 디자인 만족도, 2점
    feedback: 2, // 피드백 만족도, 2점
    operation: 2, // 운영 만족도, 2점
  },
};

/**
 * @const {Object} collectionSampleData1 - 두 번째 샘플 데이터
 * @property {string} _id - MongoDB 고유 식별자
 * @property {string} proid - 프로젝트 ID
 * @property {string} desid - 디자이너 ID
 * @property {string} cliid - 고객 ID
 * @property {Date} date - 평가 작성 일시
 * @property {Object} construct - 시공 관련 정보
 * @property {number} construct.level - 시공 난이도
 * @property {number} construct.period - 시공 기간
 * @property {Object} spend - 비용 관련 정보
 * @property {number} spend.total - 총 지출 금액
 * @property {number} spend.construct - 시공 관련 지출 금액
 * @property {number} spend.styling - 스타일링 관련 지출 금액
 * @property {Object} purchase - 구매 관련 정보
 * @property {number} purchase.list - 구매 목록 수
 * @property {number} purchase.furniture - 가구 구매 여부 (1: 구매, 0: 구매 안 함)
 * @property {number} purchase.period - 구매 기간
 * @property {number} purchase.compliance - 약속 이행율 (0~1 사이 값)
 * @property {Object} satisfaction - 고객 만족도
 * @property {number} satisfaction.design - 디자인 만족도 (0~5)
 * @property {number} satisfaction.feedback - 피드백 만족도 (0~5)
 * @property {number} satisfaction.operation - 운영 만족도 (0~5)
 */
const collectionSampleData1 = {
  _id: "65c1af8aedbbcf0d484c5758", // 고유 식별자 (MongoDB에서 자동 생성)
  proid: "p2307_ab27s", // 해당 프로젝트의 고유 ID
  desid: "d2201_aa01s", // 해당 디자이너의 고유 ID
  cliid: "c2307_ab37s", // 해당 고객의 고유 ID
  date: "2024-02-06T04:03:22.085Z", // 평가가 작성된 날짜 및 시간
  construct: {
    level: 1, // 시공 난이도, 1은 비교적 낮은 난이도
    period: 25, // 시공 기간, 25일 소요
  },
  spend: {
    total: 60000000, // 총 지출 금액, 6천만 원
    construct: 50000000, // 시공 관련 지출 금액, 5천만 원
    styling: 10000000, // 스타일링에 지출한 금액, 1천만 원
  },
  purchase: {
    list: 1, // 구매 목록 수, 1건
    furniture: 1, // 가구 구매 여부, 1은 구매한 것
    period: 18, // 구매 기간, 18일 소요
    compliance: 0.743323, // 약속 이행율, 74.3% 정도
  },
  satisfaction: {
    design: 2, // 디자인 만족도, 2점
    feedback: 2, // 피드백 만족도, 2점
    operation: 2, // 운영 만족도, 2점
  },
};