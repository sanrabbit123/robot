/**
 * 콜렉션 이름
 * @type {string}
 * @description 홈리에종에서 발행한 컨텐츠의 스타일 경향성을 평가한 수치들을 저장하는 데이터베이스
 */
const collectionName = "styleEstimation";

/**
 * 콜렉션 설명
 * @type {string}
 * @description 홈리에종에서 발행한 각 컨텐츠의 스타일 평가 수치와 평가한 사람의 정보 등을 기록하는 콜렉션
 */
const collectionDescription = "홈리에종 발행 컨텐츠의 스타일 경향성을 평가한 수치가 저장되는 디비";

/**
 * @typedef {Object} StyleEstimation
 * @property {string} _id MongoDB에서 자동 생성된 고유 ID
 * @property {string} id 평가한 스타일 컨텐츠의 ID (p41_bathroom 형식)
 * @property {string} date 평가가 이루어진 날짜와 시간 (ISO 8601 형식)
 * @property {number} who 평가를 진행한 사람의 ID 또는 식별 번호
 * @property {number} index 스타일 경향성을 수치화한 평가 지수
 * @property {number[]} value 10개의 항목에 대한 스타일 평가 결과 (0 또는 1)
 */

/**
 * 샘플 데이터 0
 * @type {StyleEstimation}
 * @description p41_bathroom 컨텐츠에 대해 7번 사용자가 2021년 5월 14일에 평가한 스타일 경향성
 */
const collectionSampleData0 = {
  _id: "66c09c0d7d20f001559f3a26", // MongoDB에서 자동 생성된 고유 ID
  id: "p41_bathroom", // 평가된 컨텐츠의 ID, "p41_bathroom"은 해당 스타일 평가의 고유 식별자
  date: "2021-05-14T10:49:56.000Z", // 평가가 이루어진 날짜와 시간, 2021년 5월 14일 10:49:56 (UTC)
  who: 7, // 평가를 진행한 사람의 ID 또는 식별 번호
  index: 320, // 스타일 평가 지수, 컨텐츠의 경향성을 수치화한 값
  value: [ // 10개의 항목에 대해 각각 0 또는 1로 평가한 스타일 값
    0, // 첫 번째 항목: 0으로 평가
    1, // 두 번째 항목: 1로 평가
    1, // 세 번째 항목: 1로 평가
    1, // 네 번째 항목: 1로 평가
    1, // 다섯 번째 항목: 1로 평가
    0, // 여섯 번째 항목: 0으로 평가
    1, // 일곱 번째 항목: 1로 평가
    0, // 여덟 번째 항목: 0으로 평가
    1, // 아홉 번째 항목: 1로 평가
    0  // 열 번째 항목: 0으로 평가
  ]
};

/**
 * 샘플 데이터 1
 * @type {StyleEstimation}
 * @description p92_veranda 컨텐츠에 대해 1번 사용자가 2021년 5월 4일에 평가한 스타일 경향성
 */
const collectionSampleData1 = {
  _id: "66c09c0d7d20f001559f38e4", // MongoDB에서 자동 생성된 고유 ID
  id: "p92_veranda", // 평가된 컨텐츠의 ID, "p92_veranda"는 해당 스타일 평가의 고유 식별자
  date: "2021-05-04T11:59:19.273Z", // 평가가 이루어진 날짜와 시간, 2021년 5월 4일 11:59:19 (UTC)
  who: 1, // 평가를 진행한 사람의 ID 또는 식별 번호
  index: 11, // 스타일 평가 지수, 컨텐츠의 경향성을 수치화한 값
  value: [ // 10개의 항목에 대해 각각 0 또는 1로 평가한 스타일 값
    0, // 첫 번째 항목: 0으로 평가
    0, // 두 번째 항목: 0으로 평가
    1, // 세 번째 항목: 1로 평가
    1, // 네 번째 항목: 1로 평가
    1, // 다섯 번째 항목: 1로 평가
    0, // 여섯 번째 항목: 0으로 평가
    1, // 일곱 번째 항목: 1로 평가
    0, // 여덟 번째 항목: 0으로 평가
    1, // 아홉 번째 항목: 1로 평가
    0  // 열 번째 항목: 0으로 평가
  ]
};