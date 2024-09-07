/**
 * @const {string} collectionName - 콜렉션의 이름을 정의
 * @description 홈리에종에 상담 신청을 남긴 고객님들의 응대 기록과 큐레이션 기록을 저장하는 콜렉션
 */
const collectionName = "clientHistory"; // 'clientHistory'는 상담과 큐레이션 기록을 저장하는 콜렉션 이름

/**
 * @const {string} collectionDescription - 콜렉션 설명
 * @description 고객이 남긴 상담 신청 기록과 관련된 응대 기록 및 큐레이션 데이터가 저장된 데이터베이스 콜렉션
 */
const collectionDescription = "홈리에종에 상담 신청을 남긴 고객님들의 응대 기록과 큐레이션 기록"; // 콜렉션의 설명

/**
 * @const {Object} collectionSampleData0 - 첫 번째 샘플 데이터
 * @property {string} _id - MongoDB 고유 식별자
 * @property {string} cliid - 고객 ID
 * @property {string} history - 고객과의 응대 이력
 * @property {string} space - 고객이 최초로 남긴 주소 정보
 * @property {string} construct - 공사 관련 정보
 * @property {string} styling - 스타일링 관련 정보
 * @property {string} budget - 예산 정보
 * @property {string} progress - 진행 상황
 * @property {boolean} important - 중요 여부
 * @property {string} issue - 이슈 사항
 * @property {string} manager - 담당 관리자
 * @property {Object} curation - 큐레이션 관련 정보
 * @property {Object} curation.analytics - 큐레이션 관련 분석 데이터
 */
const collectionSampleData0 = {
  _id: "66dc0265db65fbaadef97e49", // MongoDB의 고유 식별자
  cliid: "c2409_aa42s", // 해당 고객의 고유 ID
  history: "", // 응대 기록 (초기값은 빈 문자열)
  space: "최초 고객이 적은 주소 : 서울 광진구 아차산로69길 19 (광장동, 현대아파트) 902동  204호", // 고객이 처음 남긴 주소 정보
  construct: "", // 공사 관련 정보 (초기값은 빈 문자열)
  styling: "", // 스타일링 관련 정보 (초기값은 빈 문자열)
  budget: "", // 예산 정보 (초기값은 빈 문자열)
  progress: "", // 진행 상황 (초기값은 빈 문자열)
  important: false, // 중요 여부를 나타내는 불리언 값
  issue: "", // 이슈 사항 (초기값은 빈 문자열)
  manager: "-", // 담당 관리자를 나타내는 필드, 초기값은 "-"
  curation: {
    analytics: {
      page: [
        {
          page: "styleCuration", // 페이지 이름
          date: "2024-09-07T07:36:19.607Z", // 큐레이션 실행 시간
          referrer: "https://home-liaison.com/", // 이전 페이지 URL
          userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)...", // 사용자 브라우저 정보
          browser: "Edge", // 브라우저 종류
          os: "Windows 10.0", // 운영체제 정보
          platform: "Microsoft Windows", // 플랫폼 정보
          mobile: false, // 모바일 여부 (false는 데스크탑)
          ip: "112.172.224.200", // 클라이언트의 IP 주소
          city: "Seoul", // 접속한 도시
          region: "Seoul", // 접속한 지역
          country: "KR", // 접속한 국가 (한국)
          loc: "37.5660,126.9784", // 위도, 경도 정보
          org: "AS4766 Korea Telecom", // 인터넷 서비스 제공자 정보
          postal: "03141", // 우편번호
          timezone: "Asia/Seoul" // 타임존 정보
        }
      ],
      update: [
        {
          page: "styleCuration", // 업데이트된 페이지
          date: "2024-09-07T07:40:41.817Z", // 업데이트된 날짜 및 시간
          update: {
            x: "style", // 큐레이션에서 업데이트된 카테고리
            y: 0, // 상태 값
            value: [ // 선택된 디자이너 ID 목록
              "d2202_aa04s", "d2405_aa05s", "d2202_aa02s",
            ]
          }
        }
      ],
      submit: [
        {
          page: "styleCuration", // 제출된 페이지
          date: "2024-09-07T07:40:56.452Z" // 제출된 날짜 및 시간
        }
      ],
      send: [], // 전송 내역
      call: {
        out: [], // 발신 통화 내역
        in: [] // 수신 통화 내역
      },
      full: false // 큐레이션이 완료되었는지 여부 (false는 미완료)
    },
    style: [], // 스타일 큐레이션 정보 (초기값은 빈 배열)
    image: [ // 이미지 정보
      "t11p58.jpg", "t11p58.jpg", "t3a81.jpg",
    ],
    service: {
      serid: ["s2011_aa02s"] // 서비스 ID
    },
    building: {
      type: "" // 건물 유형 (초기값은 빈 문자열)
    },
    furniture: {
      ratio: 50, // 가구 비율
      makeNeeds: {
        furniture: false, // 가구 필요 여부
        fabric: false // 패브릭 필요 여부
      }
    },
    construct: {
      living: false, // 현재 거주 여부
      items: [] // 공사 항목 리스트 (초기값은 빈 배열)
    },
    check: {
      serid: "s2011_aa02s", // 체크된 서비스 ID
      construct: {
        entire: true, // 공사가 전체인지 여부
        items: [], // 공사 항목 리스트 (초기값은 빈 배열)
        environment: 2 // 환경 상태 (2로 설정됨)
      },
      budget: 5, // 예산 상태 (5로 설정됨)
      furniture: [], // 가구 관련 정보 (초기값은 빈 배열)
      fabric: [], // 패브릭 관련 정보 (초기값은 빈 배열)
      expect: 2, // 기대 수준
      purchase: null, // 구매 관련 정보 (초기값은 null)
      family: null, // 가족 구성 정보 (초기값은 null)
      age: null, // 나이 정보 (초기값은 null)
      time: [] // 시간 정보 (초기값은 빈 배열)
    }
  }
};

/**
 * @const {Object} collectionSampleData1 - 두 번째 샘플 데이터
 * @property {string} _id - MongoDB 고유 식별자
 * @property {string} cliid - 고객 ID
 * @property {string} history - 고객과의 응대 이력
 * @property {string} space - 고객이 남긴 주소 정보
 * @property {string} construct - 공사 관련 정보
 * @property {string} styling - 스타일링 관련 정보
 * @property {string} budget - 예산 정보
 * @property {string} progress - 진행 상황
 * @property {boolean} important - 중요 여부
 * @property {string} issue - 이슈 사항
 * @property {string} manager - 담당 관리자
 * @property {Object} curation - 큐레이션 관련 정보
 */
const collectionSampleData1 = {
  _id: "66c09c1b7d20f00155a00591", // MongoDB의 고유 식별자
  cliid: "c1903_aa01s", // 해당 고객의 고유 ID
  history: "", // 응대 기록 (초기값은 빈 문자열)
  space: "", // 고객이 남긴 주소 정보 (초기값은 빈 문자열)
  construct: "", // 공사 관련 정보 (초기값은 빈 문자열)
  styling: "", // 스타일링 관련 정보 (초기값은 빈 문자열)
  budget: "", // 예산 정보 (초기값은 빈 문자열)
  progress: "", // 진행 상황 (초기값은 빈 문자열)
  important: false, // 중요 여부를 나타내는 불리언 값
  issue: "", // 이슈 사항 (초기값은 빈 문자열)
  manager: "-", // 담당 관리자를 나타내는 필드, 초기값은 "-"
  curation: {
    style: [], // 스타일 큐레이션 정보 (초기값은 빈 배열)
    service: {
      serid: [] // 서비스 ID (초기값은 빈 배열)
    },
    building: {
      type: "" // 건물 유형 (초기값은 빈 문자열)
    },
    furniture: {
      ratio: 50, // 가구 비율
      makeNeeds: {
        furniture: false, // 가구 필요 여부
        fabric: false // 패브릭 필요 여부
      }
    },
    construct: {
      living: false, // 현재 거주 여부
      items: [] // 공사 항목 리스트 (초기값은 빈 배열)
    },
    analytics: {
      page: [], // 방문한 페이지 정보 (초기값은 빈 배열)
      update: [], // 큐레이션 업데이트 정보 (초기값은 빈 배열)
      submit: [], // 제출된 큐레이션 정보 (초기값은 빈 배열)
      full: false, // 큐레이션 완료 여부 (초기값은 false)
      send: [], // 전송 내역 (초기값은 빈 배열)
      call: {
        out: [], // 발신 통화 내역 (초기값은 빈 배열)
        in: [] // 수신 통화 내역 (초기값은 빈 배열)
      }
    },
    image: [], // 이미지 정보 (초기값은 빈 배열)
    check: {
      serid: "s2011_aa02s", // 체크된 서비스 ID
      construct: {
        entire: true, // 공사가 전체인지 여부
        items: [], // 공사 항목 리스트 (초기값은 빈 배열)
        environment: 2 // 환경 상태 (2로 설정됨)
      },
      budget: 5, // 예산 상태 (5로 설정됨)
      furniture: [], // 가구 관련 정보 (초기값은 빈 배열)
      fabric: [], // 패브릭 관련 정보 (초기값은 빈 배열)
      expect: 2, // 기대 수준
      purchase: null, // 구매 관련 정보 (초기값은 null)
      family: null, // 가족 구성 정보 (초기값은 null)
      age: null, // 나이 정보 (초기값은 null)
      time: [] // 시간 정보 (초기값은 빈 배열)
    }
  }
};