/**
 * @const {string} collectionName - 콜렉션 이름
 * @description 홈리에종에서 발행한 콘텐츠의 발행 날짜 정보를 저장하는 콜렉션 (현재 사용되지 않음)
 */
const collectionName = "contentsStatus"; // 콘텐츠 발행 날짜 정보를 기록하는 콜렉션

/**
 * @const {string} collectionDescription - 콜렉션 설명
 * @description 홈리에종에서 발행한 콘텐츠의 발행 날짜에 대한 정보를 저장하는 데이터베이스. 현재는 사용되지 않음.
 */
const collectionDescription = "홈리에종에서 발행한 컨텐츠에 대한 발행 날짜에 대한 정보 (사용되지 않음)"; // 발행 날짜 정보를 설명하는 콜렉션 설명

/**
 * @typedef {Object} CollectionSampleData
 * @property {string} _id - MongoDB 고유 식별자
 * @property {string} conid - 콘텐츠의 고유 식별자 (홈리에종 콘텐츠의 ID)
 * @property {string} pid - 프로젝트 ID (콘텐츠와 연결된 프로젝트 ID)
 * @property {boolean} complete - 콘텐츠 발행 여부 (true: 발행 완료, false: 발행 미완료)
 * @property {string} date - 콘텐츠가 발행된 날짜와 시간 (ISO 8601 형식)
 */

/**
 * @type {CollectionSampleData}
 * @description 첫 번째 샘플 데이터
 */
const collectionSampleData0 = {
  _id: "66c09c147d20f001559fe458", // MongoDB에서 자동 생성된 고유 식별자
  conid: "t2308_aa06s", // 콘텐츠의 고유 ID (예: t2308_aa06s)
  pid: "p286", // 프로젝트 ID (예: p286)
  complete: true, // 콘텐츠가 발행 완료된 상태
  date: "2023-08-28T02:55:51.817Z" // 발행된 날짜와 시간 (ISO 8601 형식)
};

/**
 * @type {CollectionSampleData}
 * @description 두 번째 샘플 데이터
 */
const collectionSampleData1 = {
  _id: "66c09c147d20f001559fe446", // MongoDB에서 자동 생성된 고유 식별자
  conid: "t2110_aa07s", // 콘텐츠의 고유 ID (예: t2110_aa07s)
  pid: "p130", // 프로젝트 ID (예: p130)
  complete: true, // 콘텐츠가 발행 완료된 상태
  date: "2023-07-18T09:50:11.234Z" // 발행된 날짜와 시간 (ISO 8601 형식)
};

/**
 * @type {CollectionSampleData}
 * @description 세 번째 샘플 데이터
 */
const collectionSampleData2 = {
  _id: "66c09c147d20f001559fe435", // MongoDB에서 자동 생성된 고유 식별자
  conid: "", // 콘텐츠 고유 ID가 아직 지정되지 않음 (빈 문자열)
  pid: "", // 프로젝트 ID가 아직 지정되지 않음 (빈 문자열)
  complete: false, // 콘텐츠 발행이 아직 완료되지 않음
  date: "2023-07-18T09:36:56.386Z" // 콘텐츠 발행 예정일 또는 기록된 날짜 (ISO 8601 형식)
};