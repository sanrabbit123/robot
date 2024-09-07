/**
 * 콜렉션 이름
 * @type {string}
 * @description 홈리에종과 협약 계약을 맺은 인테리어 디자이너에 대한 추가적인 정보를 기록한 데이터베이스
 */
const collectionName = "designerHistory";

/**
 * 콜렉션 설명
 * @type {string}
 * @description 홈리에종과 계약을 맺은 인테리어 디자이너들의 추가적인 정보를 기록하는 디비
 */
const collectionDescription = "홈리에종과 협약 계약을 맺은 인테리어 디자이너님들에 대한 추가적인 정보";

/**
 * 샘플 데이터 0
 * @type {Object}
 * @property {string} _id MongoDB에서 자동 생성된 고유 ID
 * @property {string} desid 디자이너의 고유 식별자
 * @property {boolean} important 중요한 디자이너 여부
 * @property {string} history 디자이너와의 히스토리 (상세 대화나 업무 관련 메모)
 * @property {string} career 디자이너의 경력 정보
 * @property {string} issue 특별한 이슈 사항
 * @property {string} manager 디자이너를 담당하는 매니저 이름
 * @property {Object} console 디자이너 콘솔 관련 정보
 * @property {Object} console.analytics 콘솔의 분석 관련 기록
 * @property {Array} console.analytics.page 디자이너가 접근한 페이지 기록
 * @property {Array} console.analytics.update 페이지 업데이트 기록
 * @property {Array} console.analytics.send 전송 기록
 * @property {Object} checklist 체크리스트 관련 정보
 * @property {Object} report 보고서 관련 정보
 * @property {Object} request 요청 관련 정보
 * @property {Object} possible 가능성 관련 정보
 * @property {Object} project 프로젝트 관련 정보
 * @property {Object} schedule 일정 관련 정보
 * @property {string} craft 공예 관련 정보
 * @property {string} etc 기타 사항
 * @property {string} family 가족 관련 정보
 * @property {string} partner 협력 파트너 정보
 * @property {string} reception 접수 관련 정보
 * @property {string} styling 스타일링 관련 정보
 */
const collectionSampleData0 = {
  _id: "66c09c0b7d20f001559ef040",  // MongoDB에서 자동 생성된 고유 ID
  desid: "d2202_aa01s",  // 디자이너의 고유 식별자
  important: true,  // 중요한 디자이너 여부 (true = 중요)
  history: "한성아이디 \n박보영이랑 비슷한 급\n장식가?\n퇴사할 생각 있고\n...",  // 디자이너와의 히스토리 (업무 관련 메모와 대화)
  career: "전공 :영화과\n\n무관 :백화점 방송실\n\n유관/스타일링 :인테리어디자이너...",  // 디자이너의 경력 정보
  issue: "",  // 특별한 이슈 사항이 없을 때 빈 문자열
  manager: "임지민",  // 디자이너를 담당하는 매니저 이름
  console: {
    analytics: {
      page: [
        {
          page: "checklist",  // 디자이너가 방문한 페이지 ("checklist" 페이지)
          date: "2022-02-25T05:58:13.515Z",  // 해당 페이지에 접근한 날짜와 시간
          who: "010-8894-8141",  // 해당 페이지를 방문한 디자이너의 연락처
          referrer: "https://home-liaison.servehttp.com/middle/console?desid=d2202_aa01s&mode=checklist",  // 페이지의 referrer 정보
          userAgent: "Mozilla/5.0 (Linux; Android 12; SM-G981N Build/SP1A.210812.016; wv)...",  // 사용자의 User-Agent 정보
          browser: "Chrome",  // 사용자가 사용한 브라우저 ("Chrome")
          os: "Linux",  // 사용자가 사용한 운영체제 ("Linux")
          platform: "Android",  // 사용자가 사용한 플랫폼 ("Android")
          mobile: true,  // 사용자가 모바일 기기를 사용했는지 여부 (true = 모바일)
          ip: "211.202.26.47",  // 사용자가 접속한 IP 주소
          city: "Seoul",  // 접속한 사용자의 도시 ("Seoul")
          region: "Seoul",  // 접속한 사용자의 지역 ("Seoul")
          country: "KR",  // 접속한 사용자의 국가 ("KR")
          loc: "37.5660,126.9784",  // 접속한 사용자의 위치 (위도와 경도)
          org: "AS9318 SK Broadband Co Ltd",  // 네트워크 제공자 정보
          postal: "03141",  // 접속한 사용자의 우편번호
          timezone: "Asia/Seoul"  // 접속한 사용자의 시간대
        }
      ],
      update: [],
      send: []
    }
  },
  checklist: {
    analytics: {
      page: [
        {
          page: "checklist",  // 체크리스트 페이지 접근 기록
          date: "2022-02-25T06:02:29.979Z",  // 페이지 접근 시간
          who: "010-8894-8141",  // 접근한 사람의 연락처
          referrer: "https://home-liaison.servehttp.com/middle/console?desid=d2202_aa01s&mode=checklist",  // 페이지의 referrer 정보
          userAgent: "Mozilla/5.0 (Linux; Android 12; SM-G981N Build/SP1A.210812.016; wv)...",  // 사용자의 User-Agent 정보
          browser: "Chrome",  // 브라우저 정보
          os: "Linux",  // 운영체제 정보
          platform: "Android",  // 플랫폼 정보
          mobile: true,  // 모바일 기기 여부
          ip: "211.202.26.47",  // 접속 IP
          city: "Seoul",  // 접속한 도시
          region: "Seoul",  // 접속한 지역
          country: "KR",  // 국가 정보
          loc: "37.5660,126.9784",  // 위치 정보 (위도, 경도)
          org: "AS9318 SK Broadband Co Ltd",  // 네트워크 제공자 정보
          postal: "03141",  // 우편번호
          timezone: "Asia/Seoul"  // 시간대 정보
        }
      ],
      update: [
        {
          page: "checklist",  // 업데이트한 페이지 정보
          who: "jinijini0311@gmail.com",  // 업데이트한 사용자
          date: "2022-02-15T09:17:55.328Z",  // 업데이트가 일어난 시간
          update: [
            [
              "analytics.region.transportation"  // 업데이트된 항목
            ],
            [
              "대중교통"  // 업데이트된 내용
            ]
          ]
        }
      ],
      send: [
        {
          page: "checklist",  // 전송된 페이지 정보
          date: "2022-02-15T09:50:13.704Z",  // 전송된 날짜 및 시간
          who: "jinijini0311@gmail.com",  // 전송한 사람의 이메일
          referrer: "https://home-liaison.servehttp.com/designer?mode=checklist",  // 전송된 페이지의 referrer 정보
          userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.82 Safari/537.36",  // 전송 시 사용된 User-Agent
          browser: "Chrome",  // 사용된 브라우저
          os: "Windows 10.0",  // 사용된 운영체제
          platform: "Microsoft Windows",  // 사용된 플랫폼
          mobile: false,  // 모바일 기기 여부
          ip: "121.130.214.221",  // 접속한 IP
          city: "Seoul",  // 접속한 도시
          region: "Seoul",  // 접속한 지역
          country: "KR",  // 국가 정보
          loc: "37.5426,127.0580",  // 위치 정보
          org: "AS4766 Korea Telecom",  // 네트워크 제공자 정보
          postal: "04783",  // 우편번호
          timezone: "Asia/Seoul"  // 시간대 정보
        }
      ]
    }
  },
  report: {
    analytics: {
      page: [],
      update: [],
      send: []
    }
  },
  request: {
    analytics: {
      page: [],
      send: []
    }
  },
  possible: {
    analytics: {
      page: [
        {
          page: "possible",  // "possible" 페이지 접근 기록
          date: "2022-02-25T06:02:26.132Z",  // 페이지 접근 시간
          who: "010-8894-8141",  // 접근한 사람의 연락처
          referrer: "https://home-liaison.servehttp.com/middle/console?desid=d2202_aa01s&mode=checklist",  // 페이지의 referrer 정보
          userAgent: "Mozilla/5.0 (Linux; Android 12; SM-G981N Build/SP1A.210812.016; wv)...",  // 사용자의 User-Agent 정보
          browser: "Chrome",  // 브라우저 정보
          os: "Linux",  // 운영체제 정보
          platform: "Android",  // 플랫폼 정보
          mobile: true,  // 모바일 기기 여부
          ip: "211.202.26.47",  // 접속 IP
          city: "Seoul",  // 접속한 도시
          region: "Seoul",  // 접속한 지역
          country: "KR",  // 국가 정보
          loc: "37.5660,126.9784",  // 위치 정보
          org: "AS9318 SK Broadband Co Ltd",  // 네트워크 제공자 정보
          postal: "03141",  // 우편번호
          timezone: "Asia/Seoul"  // 시간대 정보
        }
      ],
      update: [],
      send: []
    }
  },
  project: {
    analytics: {
      page: [
        {
          page: "project",  // "project" 페이지 접근 기록
          date: "2022-02-25T06:02:32.534Z",  // 페이지 접근 시간
          who: "010-8894-8141",  // 접근한 사람의 연락처
          referrer: "https://home-liaison.servehttp.com/middle/console?desid=d2202_aa01s&mode=checklist",  // 페이지의 referrer 정보
          userAgent: "Mozilla/5.0 (Linux; Android 12; SM-G981N Build/SP1A.210812.016; wv)...",  // 사용자의 User-Agent 정보
          browser: "Chrome",  // 브라우저 정보
          os: "Linux",  // 운영체제 정보
          platform: "Android",  // 플랫폼 정보
          mobile: true,  // 모바일 기기 여부
          ip: "211.202.26.47",  // 접속 IP
          city: "Seoul",  // 접속한 도시
          region: "Seoul",  // 접속한 지역
          country: "KR",  // 국가 정보
          loc: "37.5660,126.9784",  // 위치 정보
          org: "AS9318 SK Broadband Co Ltd",  // 네트워크 제공자 정보
          postal: "03141",  // 우편번호
          timezone: "Asia/Seoul"  // 시간대 정보
        }
      ],
      update: [],
      send: []
    }
  },
  schedule: {
    analytics: {
      page: [],
      update: [],
      send: []
    }
  },
  craft: "",  // 제작 가구 관련 정보
  etc: "",  // 기타 정보
  family: "",  // 가족 관련 정보
  partner: "",  // 협력 파트너 정보
  reception: "",  // 접수 관련 정보
  styling: ""  // 스타일링 관련 정보
};