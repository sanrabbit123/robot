/**
 * 콜렉션 이름
 * @type {string}
 * @description 고객 대상으로 실행된 일일 캠페인 기록을 저장하는 콜렉션
 */
const collectionName = "dailyCampaign";

/**
 * 콜렉션 설명
 * @type {string}
 * @description 매일 고객을 대상으로 캠페인이 실행 중인 모든 채널에 대한 정보 기록
 */
const collectionDescription = "매일 그 날 고객 대상으로 캠패인이 돌아가고 있는 모든 채널에 대한 캠패인 정보 기록";

/**
 * 샘플 데이터 0
 * @type {Object}
 * @property {string} _id MongoDB의 고유 식별자
 * @property {string} camid 캠페인의 고유 식별자
 * @property {string} key 해당 캠페인의 날짜별 고유 키
 * @property {Object} date 캠페인 실행 기간
 * @property {Date} date.from 캠페인이 시작된 날짜
 * @property {Date} date.to 캠페인이 종료된 날짜
 * @property {Object} value 캠페인 비용 및 성과 정보
 * @property {number} value.charge 캠페인에 사용된 금액 (단위: 원)
 * @property {Object} value.performance 캠페인의 성과
 * @property {number} value.performance.impressions 캠페인이 노출된 횟수
 * @property {number} value.performance.clicks 캠페인 클릭 수
 * @property {Object} information 캠페인 관련 추가 정보
 * @property {string} information.mother 캠페인이 실행된 메인 플랫폼 (예: "naver")
 * @property {string} information.type 캠페인이 실행된 세부 플랫폼 (예: "PLACE")
 * @property {Object} information.id 캠페인의 고유 ID 정보
 * @property {string} information.id.account 광고 계정 ID
 * @property {string} information.id.campaign 캠페인의 고유 식별자
 * @property {string} information.name 캠페인 이름
 */
const collectionSampleData0 = {
  _id: "66c1c5132a8f1a7f290e806a",  // MongoDB의 고유 식별자
  camid: "g2408_nd17s",  // 캠페인의 고유 식별자
  key: "20240817_cmp-a001-06-000000005250582",  // 캠페인의 날짜별 고유 키
  date: {
    from: "2024-08-16T15:00:00.000Z",  // 캠페인이 시작된 날짜 (UTC 기준)
    to: "2024-08-17T15:00:00.000Z"  // 캠페인이 종료된 날짜 (UTC 기준)
  },
  value: {
    charge: 0,  // 해당 캠페인에서 소모된 비용 (0 원)
    performance: {
      impressions: 18,  // 캠페인 광고가 노출된 횟수
      clicks: 0  // 캠페인에서 발생한 클릭 수
    }
  },
  information: {
    mother: "naver",  // 캠페인이 실행된 메인 플랫폼
    type: "PLACE",  // 캠페인이 실행된 세부 플랫폼 ("PLACE")
    id: {
      account: "1608132",  // 광고 계정 ID
      campaign: "cmp-a001-06-000000005250582"  // 캠페인의 고유 식별자
    },
    name: "PL 홈리에종 지역"  // 캠페인 이름
  }
};

/**
 * 샘플 데이터 1
 * @type {Object}
 * @property {string} _id MongoDB의 고유 식별자
 * @property {string} camid 캠페인의 고유 식별자
 * @property {string} key 해당 캠페인의 날짜별 고유 키
 * @property {Object} date 캠페인 실행 기간
 * @property {Date} date.from 캠페인이 시작된 날짜
 * @property {Date} date.to 캠페인이 종료된 날짜
 * @property {Object} value 캠페인 비용 및 성과 정보
 * @property {number} value.charge 캠페인에 사용된 금액 (단위: 원)
 * @property {Object} value.performance 캠페인의 성과
 * @property {number} value.performance.impressions 캠페인이 노출된 횟수
 * @property {number} value.performance.clicks 캠페인 클릭 수
 * @property {Object} information 캠페인 관련 추가 정보
 * @property {string} information.mother 캠페인이 실행된 메인 플랫폼 (예: "naver")
 * @property {string} information.type 캠페인이 실행된 세부 플랫폼 (예: "WEB_SITE")
 * @property {Object} information.id 캠페인의 고유 ID 정보
 * @property {string} information.id.account 광고 계정 ID
 * @property {string} information.id.campaign 캠페인의 고유 식별자
 * @property {string} information.name 캠페인 이름
 */
const collectionSampleData1 = {
  _id: "6688012aeb99ed80a95c27d0",  // MongoDB의 고유 식별자
  camid: "g2406_na28s",  // 캠페인의 고유 식별자
  key: "20240628_cmp-a001-01-000000003101395",  // 캠페인의 날짜별 고유 키
  date: {
    from: "2024-06-27T15:00:00.000Z",  // 캠페인이 시작된 날짜 (UTC 기준)
    to: "2024-06-28T15:00:00.000Z"  // 캠페인이 종료된 날짜 (UTC 기준)
  },
  value: {
    charge: 24585,  // 캠페인에서 사용된 비용 (24585 원)
    performance: {
      impressions: 1660,  // 캠페인 광고가 노출된 횟수
      clicks: 9  // 캠페인에서 발생한 클릭 수
    }
  },
  information: {
    mother: "naver",  // 캠페인이 실행된 메인 플랫폼
    type: "WEB_SITE",  // 캠페인이 실행된 세부 플랫폼 ("WEB_SITE")
    id: {
      account: "1608132",  // 광고 계정 ID
      campaign: "cmp-a001-01-000000003101395"  // 캠페인의 고유 식별자
    },
    name: "PO 홈리에종 : 특성"  // 캠페인 이름
  }
};