/**
 * 콜렉션 이름
 * @type {string}
 * @description 홈리에종 미니 서비스 결제 시 'imp' 정보를 임시로 저장하는 데이터베이스
 */
const collectionName = "impPaymentTempStore";

/**
 * 콜렉션 설명
 * @type {string}
 * @description 미니 서비스 결제 시 'imp' 결제 정보 (예: 아임포트 결제 데이터) 를 잠시 기록해 놓는 디비
 */
const collectionDescription = "홈리에종 미니 서비스 결제시 imp 정보에 대해 잠시 기록해 놓는 디비";

/**
 * 샘플 데이터 0
 * @typedef {Object} ImpPaymentTempStore
 * @property {string} _id MongoDB에서 자동 생성된 고유 ID
 * @property {string} key imp 결제 고유 키 (각 결제에 대해 고유한 식별자)
 * @property {string} data 결제에 대한 JSON 문자열 데이터
 * @property {string} oid 결제 요청의 고유 ID
 */
const collectionSampleData0 = {
  _id: "66c09c1d7d20f00155a02337", // MongoDB에서 자동 생성된 고유 ID
  key: "impKey_AF9E1723878389002AA05B82F5191B9885C2B059", // imp 결제 고유 키
  data: "{\"oid\":\"dpho_p2404_aa25s_1723878388906\"}", // 결제 요청의 고유 ID를 포함한 JSON 형식의 데이터
  oid: "dpho_p2404_aa25s_1723878388906" // 결제 요청의 고유 ID
};

/**
 * 샘플 데이터 1
 * @typedef {Object} ImpPaymentTempStoreSample2
 * @property {string} _id MongoDB에서 자동 생성된 고유 ID
 * @property {string} key imp 결제 고유 키 (각 결제에 대해 고유한 식별자)
 * @property {string} data 결제에 대한 JSON 문자열 데이터
 * @property {string} oid 결제 요청의 고유 ID
 */
const collectionSampleData1 = {
  _id: "66c09c1d7d20f00155a02310", // MongoDB에서 자동 생성된 고유 ID
  key: "impKey_DC2B1691401028561A1D38B5FC981A3774442AB5", // imp 결제 고유 키
  data: "{\"oid\":\"designerRegistration_a2101_aa01s_1691401028537\"}", // 결제 요청의 고유 ID를 포함한 JSON 형식의 데이터
  oid: "designerRegistration_a2101_aa01s_1691401028537" // 결제 요청의 고유 ID
};