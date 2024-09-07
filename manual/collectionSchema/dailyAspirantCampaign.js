/**
 * 콜렉션 이름
 * @type {string}
 * @description 디자이너 신청자 캠페인에 대한 일일 기록을 저장한 콜렉션
 */
const collectionName = "dailyAspirantCampaign";

/**
 * 콜렉션 설명
 * @type {string}
 * @description 매일 디자이너 신청자 캠페인이 실행 중인 모든 채널에 대한 캠페인 정보 기록
 */
const collectionDescription = "매일 그 날 디자이너 신청자 캠패인이 돌아가고 있는 모든 채널에 대한 캠패인 정보 기록";

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
 * @property {number} value.performance.reach 도달한 사용자 수
 * @property {number} value.performance.impressions 노출 횟수
 * @property {number} value.performance.clicks 클릭 수
 * @property {Object} information 캠페인 관련 추가 정보
 * @property {string} information.mother 캠페인이 실행된 메인 플랫폼 (예: "facebook")
 * @property {string} information.type 캠페인이 실행된 세부 플랫폼 (예: "instagram")
 * @property {Object} information.id 캠페인의 고유 ID 정보
 * @property {string} information.id.account 광고 계정 ID
 * @property {string} information.id.campaign 캠페인의 고유 식별자
 * @property {string} information.name 캠페인 이름
 */
const collectionSampleData0 = {
  _id: "66c1c4ff2a8f1a7f290e804c",  // MongoDB의 고유 식별자
  camid: "g2408_fa17s",  // 캠페인의 고유 식별자
  key: "20240817_23854725673120375",  // 해당 캠페인의 날짜별 고유 키
  date: {
    from: "2024-08-16T15:00:00.000Z",  // 캠페인이 시작된 날짜
    to: "2024-08-17T15:00:00.000Z"  // 캠페인이 종료된 날짜
  },
  value: {
    charge: 9057,  // 캠페인에 사용된 금액 (단위: 원)
    performance: {
      reach: 448,  // 캠페인을 통해 도달한 사용자 수
      impressions: 506,  // 캠페인이 노출된 횟수
      clicks: 23  // 캠페인 클릭 수
    }
  },
  information: {
    mother: "facebook",  // 캠페인이 실행된 메인 플랫폼
    type: "instagram",  // 캠페인이 실행된 세부 플랫폼
    id: {
      account: "505249990112820",  // 광고 계정 ID
      campaign: "23854725673120375"  // 캠페인의 고유 식별자
    },
    name: "전환_관심사타겟_디자이너_2306"  // 캠페인 이름
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
 * @property {number} value.performance.reach 도달한 사용자 수
 * @property {number} value.performance.impressions 노출 횟수
 * @property {number} value.performance.clicks 클릭 수
 * @property {Object} information 캠페인 관련 추가 정보
 * @property {string} information.mother 캠페인이 실행된 메인 플랫폼 (예: "facebook")
 * @property {string} information.type 캠페인이 실행된 세부 플랫폼 (예: "instagram")
 * @property {Object} information.id 캠페인의 고유 ID 정보
 * @property {string} information.id.account 광고 계정 ID
 * @property {string} information.id.campaign 캠페인의 고유 식별자
 * @property {string} information.name 캠페인 이름
 */
const collectionSampleData1 = {
  _id: "668356dc0ed0b64e52f05202",  // MongoDB의 고유 식별자
  camid: "g2406_fa06s",  // 캠페인의 고유 식별자
  key: "20240606_23854725673120375",  // 해당 캠페인의 날짜별 고유 키
  date: {
    from: "2024-06-05T15:00:00.000Z",  // 캠페인이 시작된 날짜
    to: "2024-06-06T15:00:00.000Z"  // 캠페인이 종료된 날짜
  },
  value: {
    charge: 12252,  // 캠페인에 사용된 금액 (단위: 원)
    performance: {
      reach: 852,  // 캠페인을 통해 도달한 사용자 수
      impressions: 975,  // 캠페인이 노출된 횟수
      clicks: 46  // 캠페인 클릭 수
    }
  },
  information: {
    mother: "facebook",  // 캠페인이 실행된 메인 플랫폼
    type: "instagram",  // 캠페인이 실행된 세부 플랫폼
    id: {
      account: "505249990112820",  // 광고 계정 ID
      campaign: "23854725673120375"  // 캠페인의 고유 식별자
    },
    name: "전환_관심사타겟_디자이너_2306"  // 캠페인 이름
  }
};