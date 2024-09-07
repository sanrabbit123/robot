/**
 * @const {string} collectionName - 콜렉션 이름
 * @description 홈리에종에서 발행한 콘텐츠에 대한 추가적인 정보를 저장한 콜렉션
 */
const collectionName = "contentsHistory"; // 콘텐츠 추가 정보를 기록하는 콜렉션 이름

/**
 * @const {string} collectionDescription - 콜렉션 설명
 * @description 홈리에종에서 발행한 콘텐츠에 대한 추가 정보를 담고 있는 데이터베이스
 */
const collectionDescription = "홈리에종에서 발행한 컨텐츠에 대한 추가적인 정보"; // 콘텐츠 관련 추가 정보를 설명하는 콜렉션 설명

/**
 * @typedef {Object} CollectionSampleData
 * @property {string} _id - MongoDB 고유 식별자
 * @property {string} conid - 콘텐츠의 고유 식별자 (홈리에종 콘텐츠의 ID)
 * @property {boolean} important - 콘텐츠가 중요한지 여부 (true: 중요, false: 중요하지 않음)
 * @property {string} issue - 콘텐츠 관련 문제점 또는 이슈 (빈 문자열인 경우, 이슈 없음)
 * @property {string} manager - 콘텐츠 담당자 (담당자가 없는 경우 '-' 또는 빈 문자열)
 */

/**
 * @type {CollectionSampleData}
 * @description 첫 번째 샘플 데이터
 */
const collectionSampleData0 = {
  _id: "66c09c277d20f00155a1eff7", // MongoDB에서 자동 생성된 고유 식별자
  conid: "t2103_aa01s", // 콘텐츠의 고유 ID (예: t2103_aa01s)
  important: false, // 콘텐츠가 중요한지 여부를 나타내는 플래그 (false는 중요하지 않음을 의미)
  issue: "", // 현재 콘텐츠에 관련된 이슈가 없는 경우 빈 문자열
  manager: "-" // 콘텐츠 담당자가 지정되지 않은 경우 '-' 표시
};

/**
 * @type {CollectionSampleData}
 * @description 두 번째 샘플 데이터
 * @property {string} issuse - 오타로 작성된 이슈 필드 (실제는 "issue"여야 함)
 */
const collectionSampleData1 = {
  _id: "66c09c277d20f00155a1ef31", // MongoDB에서 자동 생성된 고유 식별자
  conid: "t1911_aa03s", // 콘텐츠의 고유 ID (예: t1911_aa03s)
  manager: "-", // 콘텐츠 담당자가 없는 경우 '-'로 표기
  issuse: "", // 오타로 작성된 필드 (issue와 동일하게 콘텐츠 관련 문제)
  important: false // 중요한 콘텐츠가 아니기 때문에 false로 설정
};

/**
 * @type {CollectionSampleData}
 * @description 세 번째 샘플 데이터
 * @property {string} issuse - 오타로 작성된 이슈 필드 (실제는 "issue"여야 함)
 */
const collectionSampleData2 = {
  _id: "66c09c277d20f00155a1ee6b", // MongoDB에서 자동 생성된 고유 식별자
  conid: "t2102_aa04s", // 콘텐츠의 고유 ID (예: t2102_aa04s)
  manager: "", // 콘텐츠 담당자가 없는 경우 빈 문자열로 표시
  issuse: "", // 오타로 작성된 필드 (issue와 동일)
  important: false // 중요한 콘텐츠가 아니기 때문에 false로 설정
};