/**
 * 콜렉션 이름
 * @type {string}
 * @description 현재 10분 동안 홈리에종 웹사이트에서 활동 중인 세션들을 기록하는 데이터베이스
 */
const collectionName = "realtimeAnalytics";

/**
 * 콜렉션 설명
 * @type {string}
 * @description 실시간으로 홈리에종 웹사이트에서 활동 중인 세션에 대한 정보를 기록하는 디비
 */
const collectionDescription = "지금 현재 10분간 어떤 세션이 홈리에종 웹에서 활동하고 있는지에 사용되는 디비";

/**
 * @typedef {Object} DeviceInfo
 * @property {string} name 운영체제의 이름 (예: 'iOS')
 * @property {string} version 운영체제의 버전 (예: '17.5.1')
 * @property {string} browser 사용 중인 브라우저 (예: 'NAVER')
 */

/**
 * @typedef {Object} Device
 * @property {string} vendor 디바이스 제조사 (예: 'Apple')
 * @property {string} model 디바이스 모델 (예: 'iPhone')
 * @property {string} type 디바이스 유형 (예: 'mobile')
 */

/**
 * @typedef {Object} NetworkInfo
 * @property {string} ip IP 주소 (예: '182.213.152.213')
 * @property {string} city 접속한 도시 (예: 'Gwangju')
 * @property {string} region 접속한 지역 (예: 'Gyeonggi-do')
 * @property {string} country 접속한 국가 (예: 'KR')
 * @property {string} loc 위도, 경도를 포함한 위치 정보 (예: '37.4100,127.2572')
 * @property {string} org 접속한 네트워크 제공자 (예: 'LG POWERCOMM')
 * @property {string} postal 우편번호 (예: '12741')
 * @property {string} timezone 접속한 타임존 (예: 'Asia/Seoul')
 */

/**
 * @typedef {Object} HistoryDetail
 * @property {string} page 사용자가 방문한 페이지 (예: 'portfolioDetail')
 * @property {string} action 사용자가 수행한 액션 (예: 'pageInit')
 * @property {Object} data 추가적인 데이터, 예: href, 클라이언트 ID (예: { cliid: "null", href: "https://home-liaison.com/portdetail.php?pid=p439" })
 * @property {string} id 세션 ID (예: 'homeliaison_07fb249e720e68d4_1724034356_2b44518b')
 * @property {Object} info 사용자 에이전트 정보, 리퍼러, 페이지 타이틀 등 (예: { ip: "182.213.152.213", userAgent: "Mozilla/5.0 (iPhone; ...)", ... })
 * @property {string} date 해당 액션이 발생한 시간 (ISO 포맷, 예: '2024-08-19T02:25:57.175Z')
 */

/**
 * @typedef {Object} History
 * @property {HistoryDetail[]} detail 사용자가 방문한 페이지와 그에 따른 액션의 세부 정보
 * @property {number} length 기록된 히스토리의 개수
 * @property {string} lastPage 사용자가 마지막으로 방문한 페이지의 이름
 * @property {string[]} summary 요약된 페이지 타이틀 목록
 */

/**
 * @typedef {Object} RealtimeAnalytics
 * @property {string} _id MongoDB에서 자동 생성된 고유 ID
 * @property {string} id 세션 ID (예: 'homeliaison_07fb249e720e68d4_1724034356_2b44518b')
 * @property {string|null} cliid 클라이언트 ID (없을 경우 'null')
 * @property {Object} device 사용 중인 디바이스 정보
 * @property {DeviceInfo} device.os 사용 중인 운영체제 정보
 * @property {Device} device.device 디바이스 상세 정보
 * @property {NetworkInfo} network 네트워크 정보
 * @property {History} history 사용자의 히스토리 정보
 * @property {string|null} client 고객 정보 (없을 경우 'null')
 */

/**
 * 샘플 데이터 0
 * @type {RealtimeAnalytics}
 * @description 2024년 8월 19일에 홈리에종 웹사이트에서 활동 중인 한 세션에 대한 실시간 분석 데이터
 */
const collectionSampleData0 = {
  _id: "66c2b0af36cda1f13d0775e2", // MongoDB에서 자동 생성된 고유 ID
  id: "homeliaison_07fb249e720e68d4_1724034356_2b44518b", // 세션 ID
  cliid: "null", // 클라이언트 ID가 없는 경우 'null'
  device: {
    os: {
      name: "iOS", // 사용 중인 운영체제 이름 (iOS)
      version: "17.5.1", // 운영체제 버전 (17.5.1)
      browser: "NAVER" // 사용 중인 브라우저 (네이버 앱)
    },
    device: {
      vendor: "Apple", // 디바이스 제조사 (Apple)
      model: "iPhone", // 디바이스 모델 (iPhone)
      type: "mobile" // 디바이스 유형 (모바일)
    }
  },
  network: {
    ip: "182.213.152.213", // 사용자의 IP 주소
    city: "Gwangju", // 사용자가 접속한 도시 (광주)
    region: "Gyeonggi-do", // 접속한 지역 (경기도)
    country: "KR", // 접속한 국가 (대한민국)
    loc: "37.4100,127.2572", // 접속 위치의 위도와 경도
    org: "AS17858 LG POWERCOMM", // 접속 네트워크 제공자 (LG POWERCOMM)
    postal: "12741", // 접속 위치의 우편번호
    timezone: "Asia/Seoul" // 접속 위치의 타임존 (서울)
  },
  history: {
    detail: [
      {
        page: "portfolioDetail", // 사용자가 방문한 페이지 ('포트폴리오 상세')
        action: "pageInit", // 사용자가 수행한 액션 ('페이지 초기화')
        data: {
          cliid: "null", // 클라이언트 ID가 없는 경우 'null'
          href: "https://home-liaison.com/portdetail.php?pid=p439", // 사용자가 방문한 페이지의 URL
          date: "2024-08-19 11:25:56" // 해당 액션이 발생한 시각 (로컬 시간)
        },
        id: "homeliaison_07fb249e720e68d4_1724034356_2b44518b", // 세션 ID
        info: {
          ip: "182.213.152.213", // 사용자의 IP 주소
          userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X)...", // 사용자 에이전트 정보
          referer: "(not set)", // 리퍼러 정보 (없음)
          requestUrl: "/portdetail.php?pid=p439", // 요청한 URL
          pageTitle: "오포자이 디 오브 홈스타일링 | 홈리에종" // 페이지 제목
        },
        date: "2024-08-19T02:25:57.175Z" // 해당 액션이 발생한 시각 (ISO 형식)
      },
    ],
    length: 2, // 기록된 히스토리의 개수 (2개)
    lastPage: "오포자이 디 오브 홈스타일링 | 홈리에종 (portfolioDetail)", // 마지막으로 방문한 페이지의 제목
    summary: [
      "오포자이 디 오브 홈스타일링 | 홈리에종", // 첫 번째 페이지 타이틀
      "오포자이 디 오브 홈스타일링 | 홈리에종" // 두 번째 페이지 타이틀
    ]
  },
  client: null // 클라이언트 정보가 없는 경우 'null'
};


