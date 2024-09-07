/**
 * 콜렉션 이름
 * @type {string}
 * @description 매일 홈리에종의 인스타그램, 메타, 유튜브 등 채널의 조회수와 클릭수에 대한 정보를 기록하는 콜렉션
 */
const collectionName = "dailyChannel";

/**
 * 콜렉션 설명
 * @type {string}
 * @description 매일 홈리에종 인스타그램, 메타, 유튜브 조회수 및 클릭수 등의 정보 기록
 */
const collectionDescription = "매일 홈리에종 인스타와 메타, 그리고 유튜브 조회수와 클릭수 등에 대한 정보 기록";

/**
 * 샘플 데이터 0
 * @type {Object}
 * @property {string} _id MongoDB의 고유 식별자
 * @property {string} chaid 채널 고유 식별자
 * @property {string} key 해당 데이터의 고유 키 (날짜와 플랫폼 정보 포함)
 * @property {Object} date 데이터 기록 기간
 * @property {Date} date.from 데이터 기록 시작 날짜 (UTC 기준)
 * @property {Date} date.to 데이터 기록 종료 날짜 (UTC 기준)
 * @property {Object} value 채널의 성과와 프로필 정보
 * @property {Object} value.profile 프로필 정보
 * @property {number} value.profile.subscribers 해당 기간 동안의 구독자 수
 * @property {Object} value.performance 채널 성과
 * @property {number} value.performance.views 조회수
 * @property {number} value.performance.likes 좋아요 수
 * @property {Object} information 채널에 대한 추가 정보
 * @property {string} information.mother 채널이 속한 메인 플랫폼 (예: "google")
 * @property {string} information.type 채널의 세부 플랫폼 (예: "youtube")
 */
const collectionSampleData0 = {
  _id: "66c1c52d2a8f1a7f290e8076",  // MongoDB의 고유 식별자
  chaid: "h2408_gy15s",  // 채널의 고유 식별자
  key: "20240815_youtube",  // 데이터의 고유 키 (해당 날짜와 플랫폼 정보 포함)
  date: {
    from: "2024-08-14T15:00:00.000Z",  // 데이터 기록 시작 날짜 (UTC 기준)
    to: "2024-08-15T15:00:00.000Z"  // 데이터 기록 종료 날짜 (UTC 기준)
  },
  value: {
    profile: {
      subscribers: 17  // 해당 기간 동안의 유튜브 채널 구독자 수
    },
    performance: {
      views: 6241,  // 해당 기간 동안의 조회수
      likes: 31  // 해당 기간 동안의 좋아요 수
    }
  },
  information: {
    mother: "google",  // 채널이 속한 메인 플랫폼 (구글)
    type: "youtube"  // 채널의 세부 플랫폼 (유튜브)
  }
};

/**
 * 샘플 데이터 1
 * @type {Object}
 * @property {string} _id MongoDB의 고유 식별자
 * @property {string} chaid 채널 고유 식별자
 * @property {string} key 해당 데이터의 고유 키 (날짜와 플랫폼 정보 포함)
 * @property {Object} date 데이터 기록 기간
 * @property {Date} date.from 데이터 기록 시작 날짜 (UTC 기준)
 * @property {Date} date.to 데이터 기록 종료 날짜 (UTC 기준)
 * @property {Object} value 채널의 성과와 프로필 정보
 * @property {Object} value.profile 프로필 정보
 * @property {number} value.profile.subscribers 해당 기간 동안의 구독자 수
 * @property {Object} value.performance 채널 성과
 * @property {number} value.performance.views 조회수
 * @property {number} value.performance.likes 좋아요 수
 * @property {Object} information 채널에 대한 추가 정보
 * @property {string} information.mother 채널이 속한 메인 플랫폼 (예: "google")
 * @property {string} information.type 채널의 세부 플랫폼 (예: "youtube")
 */
const collectionSampleData1 = {
  _id: "668fc022f101037e1a044439",  // MongoDB의 고유 식별자
  chaid: "h2407_gy05s",  // 채널의 고유 식별자
  key: "20240705_youtube",  // 데이터의 고유 키 (해당 날짜와 플랫폼 정보 포함)
  date: {
    from: "2024-07-04T15:00:00.000Z",  // 데이터 기록 시작 날짜 (UTC 기준)
    to: "2024-07-05T15:00:00.000Z"  // 데이터 기록 종료 날짜 (UTC 기준)
  },
  value: {
    profile: {
      subscribers: 17  // 해당 기간 동안의 유튜브 채널 구독자 수
    },
    performance: {
      views: 5746,  // 해당 기간 동안의 조회수
      likes: 34  // 해당 기간 동안의 좋아요 수
    }
  },
  information: {
    mother: "google",  // 채널이 속한 메인 플랫폼 (구글)
    type: "youtube"  // 채널의 세부 플랫폼 (유튜브)
  }
};