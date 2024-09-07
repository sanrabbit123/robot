/**
 * 콜렉션 이름
 * @type {string}
 * @description 구글 Analytics가 일시적으로 만든 보고서를 저장하는 데이터베이스
 */
const collectionName = "simpleAnalytics";

/**
 * 콜렉션 설명
 * @type {string}
 * @description 구글 API를 통해 일시적으로 생성된 구글 Analytics 보고서의 데이터를 저장하는 디비
 */
const collectionDescription = "구글 Analytics가 종합적인 연산을 할 때 잠시 구글 API를 통해 일시적으로 만든 보고서의 디비";

/**
 * @typedef {Object} SimpleAnalytics
 * @property {string} _id MongoDB에서 자동 생성된 고유 ID
 * @property {string} key 보고서의 키값, 분석 날짜 범위를 포함함
 * @property {Object} date 분석 기간, 시작일과 종료일이 포함됨
 * @property {string} date.from 분석 기간의 시작일 (ISO 8601 형식)
 * @property {string} date.to 분석 기간의 종료일 (ISO 8601 형식)
 * @property {Object} data 구글 Analytics 데이터 요약
 * @property {Object} data.users 사용자 데이터 요약
 * @property {number} data.users.total 전체 사용자 수
 * @property {Object} data.users.detail 사용자 세부 정보
 * @property {Object} data.users.detail.userType 사용자 유형별 통계
 * @property {Array.<Object>} data.users.detail.userType.cases 각 사용자 유형의 통계
 * @property {string} data.users.detail.userType.cases.case 사용자 유형 (예: 'New Visitor')
 * @property {number} data.users.detail.userType.cases.value 해당 유형의 사용자 수
 * @property {number} data.users.detail.userType.total 총 사용자 수
 * @property {number} data.users.detail.userType.kinds 사용자 유형 종류 수
 * @property {Object} data.users.detail.campaign 캠페인별 사용자 통계
 * @property {Object} data.users.detail.source 유입 경로별 사용자 통계
 * @property {Object} data.users.detail.sourceDetail 유입 경로 세부 통계
 * @property {Object} data.events 이벤트 데이터 요약
 * @property {number} data.events.total 전체 이벤트 수
 * @property {Object} data.events.detail 이벤트 세부 정보
 */

/**
 * 샘플 데이터 0
 * @type {SimpleAnalytics}
 * @description 2024년 8월 9일부터 2024년 8월 11일까지의 구글 Analytics 보고서
 */
const collectionSampleData0 = {
  _id: "66db9fd450474b7b47a8fba7", // MongoDB에서 자동 생성된 고유 ID
  key: "simple_analytics_20240809_20240811", // 분석 범위를 나타내는 키
  date: { 
    from: "2024-08-08T15:00:00.000Z", // 분석 시작일, 2024년 8월 8일 15:00 (UTC)
    to: "2024-08-11T15:00:00.000Z" // 분석 종료일, 2024년 8월 11일 15:00 (UTC)
  },
  data: {
    users: {
      total: 1066, // 전체 사용자 수: 1066명
      detail: {
        userType: {
          cases: [
            {
              case: "New Visitor", // 사용자 유형: 새 방문자
              value: 833 // 새 방문자 수: 833명
            }
          ],
          total: 1066, // 사용자 총합: 1066명
          kinds: 3 // 사용자 유형 종류: 3가지
        },
        campaign: {
          cases: [
            {
              case: "ads03", // 캠페인 유형: ads03
              value: 170 // 해당 캠페인 사용자 수: 170명
            }
          ],
          total: 1018, // 캠페인 관련 사용자 총합: 1018명
          kinds: 49 // 캠페인 종류 수: 49개
        },
        source: {
          cases: [
            {
              case: "meta", // 유입 경로: meta
              value: 280 // meta에서 유입된 사용자 수: 280명
            }
          ],
          total: 1013, // 유입 경로 관련 총 사용자 수: 1013명
          kinds: 22 // 유입 경로 종류 수: 22개
        },
        sourceDetail: {
          cases: [
            {
              case: "meta / interest_all_test", // 유입 경로 세부 사항: meta / interest_all_test
              value: 218 // 해당 경로에서 유입된 사용자 수: 218명
            }
          ],
          total: 1014, // 유입 경로 세부 사항 관련 총 사용자 수: 1014명
          kinds: 37 // 유입 경로 세부 사항 종류 수: 37개
        }
      }
    },
    events: {
      total: 25373, // 전체 이벤트 수: 25373개
      detail: {
        eventName: {
          cases: [
            {
              case: "page_view", // 이벤트 이름: 페이지 조회
              value: 4763 // 페이지 조회 이벤트 수: 4763회
            },
            {
              case: "pageInit", // 이벤트 이름: 페이지 초기화
              value: 4001 // 페이지 초기화 이벤트 수: 4001회
            }
          ],
          total: 25373, // 이벤트 총합: 25373회
          kinds: 44 // 이벤트 종류 수: 44개
        },
        campaign: {
          cases: [
            {
              case: "(organic)", // 캠페인 이름: organic
              value: 5721 // organic 캠페인 관련 이벤트 수: 5721회
            }
          ],
          total: 25373, // 캠페인 관련 총 이벤트 수: 25373회
          kinds: 49 // 캠페인 종류 수: 49개
        },
        source: {
          cases: [
            {
              case: "naver", // 유입 경로: 네이버
              value: 9135 // 네이버에서 유입된 이벤트 수: 9135회
            }
          ],
          total: 25373, // 유입 경로 관련 이벤트 총합: 25373회
          kinds: 22 // 유입 경로 종류 수: 22개
        },
        sourceDetail: {
          cases: [
            {
              case: "meta / interest_all_test", // 유입 경로 세부 사항: meta / interest_all_test
              value: 4631 // 해당 경로에서 유입된 이벤트 수: 4631회
            }
          ],
          total: 25373, // 유입 경로 세부 사항 관련 총 이벤트 수: 25373회
          kinds: 37 // 유입 경로 세부 사항 종류 수: 37개
        }
      }
    }
  }
};