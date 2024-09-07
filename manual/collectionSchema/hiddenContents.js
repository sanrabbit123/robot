/**
 * 콜렉션 이름
 * @type {string}
 * @description 홈리에종 PH콘솔을 통해 의도적으로 숨긴 포트폴리오 데이터를 기록하는 콜렉션
 */
const collectionName = "hiddenContents";

/**
 * 콜렉션 설명
 * @type {string}
 * @description 홈리에종에서 포트폴리오를 컨텐츠로 사용한 데이터를 숨김 처리한 기록을 담은 데이터베이스
 */
const collectionDescription = "홈리에종에서 PH콘솔을 통해 포트폴리오를 컨텐츠를 의도적으로 숨김 처리한 포트폴리오 데이터에 대한 기록";

/**
 * 샘플 데이터 0
 * @typedef {Object} HiddenContents
 * @property {string} _id MongoDB에서 자동 생성된 고유 ID
 * @property {string} date 포트폴리오가 숨겨진 날짜 (ISO 8601 형식)
 * @property {Array<string>} contents 숨김 처리된 포트폴리오 ID 리스트
 */
const collectionSampleData0 = {
  _id: "66b1571a8848cee430add03e", // MongoDB에서 자동 생성된 고유 ID
  date: "2024-08-06T02:58:32.524Z", // 포트폴리오가 숨김 처리된 날짜 (ISO 8601 형식)
  contents: [
    "p61", // 숨김 처리된 포트폴리오 ID
    "p36", // 숨김 처리된 포트폴리오 ID
    "a51", // 숨김 처리된 아트워크 ID
    "a104", // 숨김 처리된 아트워크 ID
    "a105", // 숨김 처리된 아트워크 ID
    "a115" // 숨김 처리된 아트워크 ID
  ]
};