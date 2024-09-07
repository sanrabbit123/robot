/**
 * 콜렉션 이름
 * @type {string}
 * @description 매일 그날 문의한 고객들의 세션 번호와 웹 히스토리 데이터를 기록하는 신버전 콜렉션
 */
const collectionName = "dailyClients";

/**
 * 콜렉션 설명
 * @type {string}
 * @description 고객 세션과 웹 히스토리를 기록한 데이터베이스, 새로운 버전
 */
const collectionDescription = "매일 그날 문의한 고객들의 세션 번호와 웹 히스토리데 대한 기록 신버전";

/**
 * 샘플 데이터 0
 * @type {Object}
 * @property {string} _id MongoDB에서 자동 생성된 고유 ID
 * @property {string} ancid 해당 기록의 고유 식별자
 * @property {Object} date 데이터 기록 기간
 * @property {Date} date.from 데이터 기록 시작 날짜 (UTC 기준)
 * @property {Date} date.to 데이터 기록 종료 날짜 (UTC 기준)
 * @property {Object} data 고객 세션 및 상세 기록
 * @property {Array<string>} data.cliid 해당 날짜에 문의한 고객들의 고유 식별자 리스트
 * @property {Array<Object>} data.detail 고객별 세부 정보 기록
 * @property {string} data.detail.cliid 고객의 고유 식별자
 * @property {Array<Object>} data.detail.users 각 고객의 세션 및 사용자 데이터
 * @property {string} data.detail.users.id 세션 ID
 * @property {string} data.detail.users.type 방문자 유형 (예: "New Visitor")
 * @property {Array<Object>} data.detail.users.history 방문자의 웹 히스토리
 * @property {Date} data.detail.users.history.date 해당 이벤트 발생 시간
 * @property {string} data.detail.users.history.path 방문한 웹 페이지의 경로
 * @property {string} data.detail.users.history.referer 이전 페이지 (출처)
 * @property {string} data.detail.users.history.title 해당 페이지의 제목
 * @property {string} data.detail.users.history.event 발생한 이벤트 (예: "login", "pageInit", "scrollStop")
 * @property {Object} data.detail.users.source 방문자의 출처 정보
 * @property {Array<string>} data.detail.users.source.referrer 방문자가 들어온 경로
 * @property {Array<string>} data.detail.users.source.mother 메인 출처
 * @property {Array<string>} data.detail.users.source.medium 매체 정보
 * @property {Array<string>} data.detail.users.source.campaign 캠페인 정보
 * @property {Object} data.detail.users.device 방문자가 사용한 기기 정보
 * @property {string} data.detail.users.device.kinds 기기의 종류 (예: "desktop", "mobile")
 * @property {string} data.detail.users.device.os 사용된 운영체제 (예: "Linux", "iOS")
 * @property {string} data.detail.users.device.browser 사용된 브라우저 (예: "Chrome", "KAKAOTALK")
 * @property {Object} data.detail.users.region 방문자의 위치 정보
 * @property {string} data.detail.users.region.country 방문자가 속한 국가
 * @property {string} data.detail.users.region.city 방문자가 속한 도시
 */
const collectionSampleData0 = {
  _id: "668feb480b971c0343727756",  // MongoDB에서 자동 생성된 고유 ID
  ancid: "y2407_aa04s",  // 해당 기록의 고유 식별자
  date: {
    from: "2024-07-03T15:00:00.000Z",  // 데이터 기록 시작 날짜 (UTC 기준)
    to: "2024-07-04T15:00:00.000Z"  // 데이터 기록 종료 날짜 (UTC 기준)
  },
  data: {
    cliid: [
      "c2407_aa57s",  // 해당 날짜에 문의한 첫 번째 고객의 고유 식별자
      "c2407_aa56s"  // 해당 날짜에 문의한 두 번째 고객의 고유 식별자
    ],
    detail: [
      {
        cliid: "c2407_aa56s",  // 두 번째 고객의 고유 식별자
        users: [
          {
            id: "homeliaisonServer_6f691d6a2b2c9e02_1720100497_af38dc3a",  // 세션 ID
            type: "New Visitor",  // 방문자 유형 (새로운 방문자)
            history: [
              {
                date: "2024-07-04T13:41:37.729Z",  // 이벤트 발생 시간
                path: "",  // 방문한 페이지 경로 (빈 경로일 경우 메인 페이지로 해석)
                referer: "",  // 이전 페이지 출처 (빈 값은 직접 방문)
                title: "홈리에종 | 디자이너와 함께 하는 홈스타일링",  // 페이지 제목
                event: "login"  // 발생한 이벤트 (로그인)
              }
            ],
            source: {
              referrer: [""],  // 방문자의 참조 경로 (직접 방문일 경우 빈 값)
              mother: [],  // 메인 출처 (없음)
              medium: [],  // 매체 정보 (없음)
              campaign: []  // 캠페인 정보 (없음)
            },
            device: {
              kinds: "desktop",  // 사용된 기기의 종류 (데스크탑)
              os: "Linux",  // 사용된 운영체제 (리눅스)
              browser: "Chrome"  // 사용된 브라우저 (크롬)
            },
            region: {
              country: "South Korea",  // 방문자가 속한 국가 (대한민국)
              city: "Incheon"  // 방문자가 속한 도시 (인천)
            }
          },
          {
            id: "homeliaison_ae322d5d8277f555_1720100530_2e84d4c2",  // 두 번째 세션 ID
            type: "New Visitor",  // 방문자 유형 (새로운 방문자)
            history: [
              {
                date: "2024-07-04T13:42:16.392Z",  // 이벤트 발생 시간
                path: "/curation.php?cliid=c2407_aa56s",  // 큐레이션 페이지 경로
                referer: "(not set)",  // 참조 경로가 설정되지 않음
                title: "상세 큐레이션 | 홈리에종",  // 페이지 제목
                event: "pageInit"  // 발생한 이벤트 (페이지 초기화)
              },
              {
                date: "2024-07-04T13:42:19.876Z",  // 이벤트 발생 시간
                path: "/curation.php?cliid=c2407_aa56s",  // 큐레이션 페이지 경로
                referer: "(not set)",  // 참조 경로가 설정되지 않음
                title: "상세 큐레이션 | 홈리에종",  // 페이지 제목
                event: "scrollStop"  // 발생한 이벤트 (스크롤 정지)
              }
            ],
            source: {
              referrer: [],  // 참조 경로 (없음)
              mother: [],  // 메인 출처 (없음)
              medium: [],  // 매체 정보 (없음)
              campaign: []  // 캠페인 정보 (없음)
            },
            device: {
              kinds: "mobile",  // 사용된 기기 종류 (모바일)
              os: "iOS",  // 사용된 운영체제 (iOS)
              browser: "KAKAOTALK"  // 사용된 브라우저 (카카오톡)
            },
            region: {
              country: "South Korea",  // 방문자가 속한 국가 (대한민국)
              city: "Seoul"  // 방문자가 속한 도시 (서울)
            }
          }
        ]
      }
    ]
  }
};