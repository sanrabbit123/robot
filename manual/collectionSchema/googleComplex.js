/**
 * 콜렉션 이름
 * @type {string}
 * @description 구글 채널에 대한 종합적인 정보 (광고 비용, 노출 수, 클릭 수 등) 를 날마다 기록한 데이터베이스
 */
const collectionName = "googleComplex";

/**
 * 콜렉션 설명
 * @type {string}
 * @description 구글 광고 채널의 다양한 정보 (광고 비용, 노출 수, 클릭 수 등)을 날짜별로 기록한 데이터베이스
 */
const collectionDescription = "구글 채널에 대해 종합적인 정보 (광고 비용부터 노출수, 클릭수 등) 를 날마다 기록한 디비";

/**
 * 샘플 데이터 0
 * @typedef {Object} GoogleComplex
 * @property {string} _id MongoDB에서 자동 생성된 고유 ID
 * @property {string} camid 캠페인 ID, 각 광고 캠페인을 구분하는 고유 식별자
 * @property {string} key 날짜와 플랫폼을 포함한 고유 키 (예: "20231224_google")
 * @property {Object} date 날짜 정보
 * @property {string} date.from 해당 기록의 시작 날짜
 * @property {string} date.to 해당 기록의 종료 날짜
 * @property {Object} advertisement 광고 정보
 * @property {Object} advertisement.value 광고 비용 및 성능 정보
 * @property {number} advertisement.value.charge 광고 비용
 * @property {Object} advertisement.value.performance 광고 성과
 * @property {number} advertisement.value.performance.interactions 상호작용 수
 * @property {number} advertisement.value.performance.impressions 노출 수
 * @property {number} advertisement.value.performance.clicks 클릭 수
 * @property {Object} advertisement.value.length 캠페인 길이 정보
 * @property {number} advertisement.value.length.campaign 캠페인 진행 일수
 * @property {Array} advertisement.campaign 광고 캠페인 리스트
 * @property {Object} youtube 유튜브 관련 정보
 * @property {Object} youtube.profile 유튜브 프로필 정보
 * @property {number} youtube.profile.followers 유튜브 구독자 수
 * @property {Object} youtube.performance 유튜브 성과
 * @property {number} youtube.performance.views 유튜브 조회 수
 * @property {number} youtube.performance.likes 유튜브 좋아요 수
 * @property {number} youtube.performance.shares 유튜브 공유 수
 * @property {Object} search 검색 광고 관련 정보
 * @property {number} search.clicks 검색 클릭 수
 * @property {number} search.impressions 검색 노출 수
 * @property {Array} search.detail 검색어별 세부 정보 리스트
 * @property {string} search.detail[].query 검색어
 * @property {number} search.detail[].clicks 해당 검색어에 대한 클릭 수
 * @property {number} search.detail[].impressions 해당 검색어에 대한 노출 수
 */
const collectionSampleData0 = {
  _id: "658ec72e69591eb6056d9988", // MongoDB에서 자동 생성된 고유 ID
  camid: "f2312_ga24s", // 광고 캠페인의 고유 ID
  key: "20231224_google", // 날짜와 플랫폼을 포함한 고유 키
  date: {
    from: "2023-12-23T15:00:00.000Z", // 기록 시작 날짜
    to: "2023-12-24T15:00:00.000Z" // 기록 종료 날짜
  },
  advertisement: {
    value: {
      charge: 0, // 광고 비용
      performance: {
        interactions: 0, // 상호작용 수
        impressions: 0, // 노출 수
        clicks: 0 // 클릭 수
      },
      length: {
        campaign: 0 // 캠페인 진행 일수
      }
    },
    campaign: [] // 광고 캠페인 리스트
  },
  youtube: {
    profile: {
      followers: 45 // 유튜브 채널 구독자 수
    },
    performance: {
      views: 14188, // 유튜브 조회 수
      likes: 61, // 유튜브 좋아요 수
      shares: 91 // 유튜브 공유 수
    }
  },
  search: {
    clicks: 4, // 검색 광고 클릭 수
    impressions: 118, // 검색 광고 노출 수
    detail: [
      {
        query: "광양 타운하우스 예약", // 검색어
        clicks: 0, // 해당 검색어의 클릭 수
        impressions: 1 // 해당 검색어의 노출 수
      },
      {
        query: "광양 트리하우스", // 검색어
        clicks: 0, // 해당 검색어의 클릭 수
        impressions: 1 // 해당 검색어의 노출 수
      },
      {
        query: "광주역 자연앤자이", // 검색어
        clicks: 0, // 해당 검색어의 클릭 수
        impressions: 1 // 해당 검색어의 노출 수
      }
    ]
  }
};