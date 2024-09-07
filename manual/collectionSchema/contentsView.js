/**
 * @const {string} collectionName - 콜렉션 이름
 * @description 하루 단위로 홈리에종 프론트 웹에서 각각의 콘텐츠들의 조회수 상태를 기록하는 데이터베이스
 */
const collectionName = "contentsView"; // 하루 단위로 콘텐츠 조회수 상태를 기록하는 콜렉션

/**
 * @const {string} collectionDescription - 콜렉션 설명
 * @description 하루 동안 홈리에종 웹에서 콘텐츠들의 조회수 상태를 기록한 데이터를 저장하는 데이터베이스
 */
const collectionDescription = "하루 단위로 그 날의 홈리에종 프론트 웹에서 각각의 컨텐츠들의 조회수 상태가 어땠는지를 기록한 디비";

/**
 * @typedef {Object} ContentsViewData
 * @property {string} pid - 프로젝트 ID (해당 콘텐츠가 연결된 프로젝트의 ID)
 * @property {string} conid - 콘텐츠 ID (해당 콘텐츠의 고유 ID)
 * @property {string} desid - 디자이너 ID (해당 콘텐츠와 연결된 디자이너의 ID)
 * @property {string} proid - 프로젝트 ID (연결된 프로젝트가 없으면 빈 문자열)
 * @property {string} date - 콘텐츠 조회가 기록된 날짜 (ISO 8601 형식)
 * @property {Object} data - 조회수 및 디바이스, 브라우저, 운영체제 정보 등을 포함하는 데이터
 * @property {Object} data.view - 조회수에 대한 데이터
 * @property {number} data.view.total - 콘텐츠의 전체 조회수
 * @property {number} data.view.portfolio - 포트폴리오 콘텐츠 조회수
 * @property {number} data.view.review - 리뷰 콘텐츠 조회수
 * @property {Object} data.device - 조회가 발생한 디바이스 정보
 * @property {number} data.device.mobile - 모바일 기기에서의 조회수
 * @property {number} data.device.desktop - 데스크탑에서의 조회수
 * @property {number} data.device.tablet - 태블릿에서의 조회수
 * @property {Array<{type: string, value: number}>} data.browser - 브라우저별 조회수
 * @property {Array<{type: string, value: number}>} data.os - 운영체제별 조회수
 * @property {Array<{type: string, value: number}>} data.time - 시간별 조회수
 */

/**
 * @typedef {Object} CollectionSampleData
 * @property {string} _id - MongoDB 고유 식별자
 * @property {string} key - 조회수 기록의 고유 키 (해당 날짜의 조회수 기록)
 * @property {string} date - 데이터가 기록된 날짜 (ISO 8601 형식)
 * @property {ContentsViewData[]} contents - 각각의 콘텐츠 조회수에 대한 데이터 목록
 */

/**
 * @type {CollectionSampleData}
 * @description 첫 번째 샘플 데이터
 */
const collectionSampleData0 = {
  _id: "66d5e799715228a4e339fde4", // MongoDB에서 자동 생성된 고유 식별자
  key: "20240903_web", // 조회수 기록에 대한 고유 키 (날짜 기반)
  date: "2024-09-02T16:10:18.048Z", // 조회수 기록이 생성된 날짜와 시간 (ISO 8601 형식)
  contents: [
    {
      pid: "a148", // 해당 콘텐츠와 연결된 프로젝트의 ID
      conid: "t2408_aa48s", // 콘텐츠의 고유 ID
      desid: "d2407_aa05s", // 디자이너의 고유 ID
      proid: "", // 연결된 프로젝트가 없으면 빈 문자열
      date: "2024-08-30T07:23:15.316Z", // 해당 콘텐츠 조회가 기록된 날짜와 시간 (ISO 8601 형식)
      data: {
        view: {
          total: 0, // 해당 콘텐츠의 총 조회수
          portfolio: 0, // 포트폴리오 조회수
          review: 0 // 리뷰 조회수
        },
        device: {
          mobile: 0, // 모바일에서의 조회수
          desktop: 0, // 데스크탑에서의 조회수
          tablet: 0 // 태블릿에서의 조회수
        },
        browser: [], // 조회에 사용된 브라우저 정보 (없음)
        os: [], // 조회에 사용된 운영체제 정보 (없음)
        time: [] // 조회가 발생한 시간 정보 (없음)
      }
    },
    {
      pid: "p449", // 프로젝트 ID
      conid: "t2408_aa47s", // 콘텐츠 고유 ID
      desid: "d2104_aa03s", // 디자이너 고유 ID
      proid: "p2404_aa25s", // 해당 콘텐츠와 연결된 프로젝트의 ID
      date: "2024-08-28T01:42:43.193Z", // 조회 기록이 생성된 날짜
      data: {
        view: {
          total: 147, // 전체 조회수
          portfolio: 0, // 포트폴리오 조회수
          review: 147 // 리뷰 조회수
        },
        device: {
          mobile: 130, // 모바일 기기에서의 조회수
          desktop: 16, // 데스크탑에서의 조회수
          tablet: 1 // 태블릿에서의 조회수
        },
        browser: [
          { type: "naver", value: 47 }, // 네이버 브라우저에서의 조회수
          { type: "instagram", value: 55 }, // 인스타그램에서의 조회수
          { type: "chrome", value: 12 }, // 크롬 브라우저에서의 조회수
          { type: "kakaotalk", value: 10 }, // 카카오톡에서의 조회수
          { type: "samsung internet", value: 12 }, // 삼성 인터넷 브라우저에서의 조회수
          { type: "edge", value: 4 }, // 엣지 브라우저에서의 조회수
          { type: "mobile safari", value: 2 }, // 모바일 사파리 브라우저에서의 조회수
          { type: "facebook", value: 5 } // 페이스북에서의 조회수
        ],
        os: [
          { type: "android", value: 90 }, // 안드로이드 운영체제에서의 조회수
          { type: "windows", value: 15 }, // 윈도우 운영체제에서의 조회수
          { type: "ios", value: 41 }, // iOS 운영체제에서의 조회수
          { type: "mac os", value: 1 } // Mac OS 운영체제에서의 조회수
        ],
        time: [
          { type: "202408", value: 93 }, // 2024년 8월의 조회수
          { type: "202409", value: 54 } // 2024년 9월의 조회수
        ]
      }
    },
  ]
};