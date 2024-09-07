/**
 * 콜렉션 이름
 * @type {string}
 * @description 매일 그 날 홈리에종 웹사이트에 들어온 유저들이 어떤 검색어를 입력하고 들어왔는지 기록하는 데이터베이스
 */
const collectionName = "queryAnalytics";

/**
 * 콜렉션 설명
 * @type {string}
 * @description 홈리에종 웹에 접속한 유저들이 사용한 검색어와 그에 대한 기록을 저장하는 데이터베이스
 */
const collectionDescription = "매일 그 날 홈리에종 웹에 들어온 유저들이 어떤 검색어를 적고 들어왔는지에 대한 기록";

/**
 * @typedef {Object} QueryDetail
 * @property {string} case 검색어
 * @property {number} value 해당 검색어를 사용한 유저 수
 */

/**
 * @typedef {Object} QueryData
 * @property {number} total 총 검색어 입력 횟수
 * @property {QueryDetail[]} detail 각 검색어에 대한 세부 정보 배열
 */

/**
 * @typedef {Object} DateRange
 * @property {string} from 검색 데이터 기록 시작 시간 (ISO 포맷)
 * @property {string} to 검색 데이터 기록 종료 시간 (ISO 포맷)
 */

/**
 * @typedef {Object} QueryAnalytics
 * @property {string} _id MongoDB에서 자동 생성된 고유 ID
 * @property {string} key 기록의 날짜 키 (예: '20240907_query')
 * @property {DateRange} date 검색 데이터 기록 기간
 * @property {QueryData} data 검색 데이터의 세부 정보
 */

/**
 * 샘플 데이터 0
 * @type {QueryAnalytics}
 * @description 2024년 9월 7일에 홈리에종 웹사이트에 접속한 유저들이 사용한 검색어와 그에 대한 통계 기록
 */
const collectionSampleData0 = {
  _id: "66dbd2539c11e28c3a074ac3", // MongoDB에서 자동 생성된 고유 ID
  key: "20240907_query", // 날짜 키 (2024년 9월 7일의 검색 기록을 의미)
  date: {
    from: "2024-09-06T15:00:00.000Z", // 검색 데이터 기록 시작 시간 (9월 6일 오후 3시)
    to: "2024-09-07T15:00:00.000Z" // 검색 데이터 기록 종료 시간 (9월 7일 오후 3시)
  },
  data: {
    total: 18, // 총 검색어 입력 횟수 (18번)
    detail: [
      {
        case: "홈스타일링", // 검색어 '홈스타일링'
        value: 2 // 해당 검색어를 사용한 유저 수 (2명)
      },
      {
        case: "아파트인테리어", // 검색어 '아파트인테리어'
        value: 2 // 해당 검색어를 사용한 유저 수 (2명)
      },
      {
        case: "실내인테리어", // 검색어 '실내인테리어'
        value: 2 // 해당 검색어를 사용한 유저 수 (2명)
      },
      {
        case: "아파트 리모델링", // 검색어 '아파트 리모델링'
        value: 1 // 해당 검색어를 사용한 유저 수 (1명)
      },
      {
        case: "아파트 인테리어", // 검색어 '아파트 인테리어'
        value: 1 // 해당 검색어를 사용한 유저 수 (1명)
      }
    ]
  }
};