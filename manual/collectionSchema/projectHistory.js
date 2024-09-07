/**
 * 콜렉션 이름
 * @type {string}
 * @description 홈리에종에서 진행 중인 인테리어 프로젝트에 대한 추가적인 정보를 기록하는 데이터베이스
 */
const collectionName = "projectHistory";

/**
 * 콜렉션 설명
 * @type {string}
 * @description 각 인테리어 프로젝트의 진행 상황과 관련된 세부 정보를 추가 기록한 데이터베이스
 */
const collectionDescription = "홈리에종에서 진행하고 있는 인테리어 프로젝트에 대한 정보에 대한 추가적인 기록";

/**
 * @typedef {Object} ProjectHistory
 * @property {string} _id MongoDB에서 자동 생성된 고유 ID
 * @property {string} proid 프로젝트의 고유 ID
 * @property {string} history 프로젝트와 관련된 기록 (현재 빈 값)
 * @property {string} designer 프로젝트에 참여한 디자이너 정보 (현재 빈 값)
 * @property {string} client 프로젝트와 관련된 클라이언트 정보 (현재 빈 값)
 * @property {string} photo 프로젝트 관련 사진 (현재 빈 값)
 * @property {Object} contents 프로젝트의 블로그와 인스타그램 관련 정보
 * @property {boolean} important 해당 프로젝트가 중요한지 여부
 * @property {string} issue 프로젝트와 관련된 특별한 문제나 이슈
 * @property {Object} request 프로젝트 요청 사항에 대한 세부 정보
 * @property {Object} construct 시공과 관련된 세부 정보
 * @property {Object} schedule 프로젝트 일정과 관련된 정보
 * @property {Object} purchase 프로젝트 구매와 관련된 정보
 * @property {string} manager 프로젝트 매니저 이름 (현재 값은 "-")
 */

/**
 * 샘플 데이터 0
 * @type {ProjectHistory}
 * @description 프로젝트 'p2409_aa25s'와 관련된 상세 기록.
 */
const collectionSampleData0 = {
  _id: "66db0209fc7d5b7c96735ea0", // MongoDB에서 자동 생성된 고유 ID
  proid: "p2409_aa25s", // 프로젝트의 고유 ID
  history: "", // 프로젝트와 관련된 기록 (현재 없음)
  designer: "", // 프로젝트와 관련된 디자이너 정보 (현재 없음)
  client: "", // 프로젝트와 관련된 클라이언트 정보 (현재 없음)
  photo: "", // 프로젝트 관련 사진 (현재 없음)
  contents: {
    blog: {
      portfolio: {
        boo: false, // 블로그 포트폴리오가 있는지 여부
        date: "1799-12-31T15:32:08.000Z", // 포트폴리오가 게시된 날짜 (기본 값)
        link: "" // 포트폴리오 링크 (현재 없음)
      },
      review: {
        boo: false, // 블로그 리뷰가 있는지 여부
        date: "1799-12-31T15:32:08.000Z", // 리뷰가 게시된 날짜 (기본 값)
        link: "" // 리뷰 링크 (현재 없음)
      }
    },
    instagram: {
      portfolio: {
        boo: false, // 인스타그램 포트폴리오가 있는지 여부
        date: "1799-12-31T15:32:08.000Z", // 포트폴리오가 게시된 날짜 (기본 값)
        link: "" // 포트폴리오 링크 (현재 없음)
      },
      review: {
        boo: false, // 인스타그램 리뷰가 있는지 여부
        date: "1799-12-31T15:32:08.000Z", // 리뷰가 게시된 날짜 (기본 값)
        link: "" // 리뷰 링크 (현재 없음)
      }
    }
  },
  important: false, // 해당 프로젝트가 중요한지 여부 (기본 값: 중요하지 않음)
  issue: "", // 프로젝트와 관련된 이슈 (현재 없음)
  request: {
    analytics: {
      make: [], // 데이터 분석 생성과 관련된 정보
      page: [], // 페이지 분석 관련 정보
      update: [], // 업데이트와 관련된 정보
      send: [] // 발송과 관련된 정보
    },
    client: {
      name: "", // 클라이언트 이름 (현재 없음)
      phone: "", // 클라이언트 전화번호 (현재 없음)
      family: "", // 클라이언트의 가족 정보 (현재 없음)
      address: "", // 클라이언트 주소 (현재 없음)
      budget: "", // 클라이언트 예산 (현재 없음)
      etc: "" // 기타 클라이언트 정보 (현재 없음)
    },
    space: {
      contract: "", // 계약과 관련된 정보 (현재 없음)
      precheck: "", // 사전 점검 정보 (현재 없음)
      empty: "", // 빈 공간과 관련된 정보 (현재 없음)
      movein: "", // 이사와 관련된 정보 (현재 없음)
      special: "", // 특별한 요청 사항 (현재 없음)
      composition: "" // 구성과 관련된 정보 (현재 없음)
    },
    service: {
      service: "", // 제공 서비스 정보 (현재 없음)
      concept: "", // 컨셉과 관련된 정보 (현재 없음)
      construct: "", // 시공과 관련된 정보 (현재 없음)
      styling: "" // 스타일링과 관련된 정보 (현재 없음)
    },
    about: {
      when: [], // 프로젝트 진행 시기 정보
      where: [], // 프로젝트 진행 장소 정보
      site: [], // 현장 정보
      construct: [], // 시공 관련 정보
      styling: [], // 스타일링 관련 정보
      budget: [], // 예산 관련 정보
      progress: [] // 진행 상황 정보
    }
  },
  construct: {
    name: "", // 시공 업체 이름 (현재 없음)
    address: "", // 시공 업체 주소 (현재 없음)
    payments: {
      first: {
        date: "1799-12-31T15:32:08.000Z", // 첫 번째 결제 날짜 (기본 값)
        etc: "" // 기타 첫 번째 결제 관련 정보 (현재 없음)
      },
      start: {
        date: "1799-12-31T15:32:08.000Z", // 시공 시작 날짜 (기본 값)
        etc: "" // 기타 시공 시작 관련 정보 (현재 없음)
      },
      middle: {
        date: "1799-12-31T15:32:08.000Z", // 중간 결제 날짜 (기본 값)
        etc: "" // 기타 중간 결제 관련 정보 (현재 없음)
      },
      remain: {
        date: "1799-12-31T15:32:08.000Z", // 잔금 결제 날짜 (기본 값)
        etc: "" // 기타 잔금 결제 관련 정보 (현재 없음)
      }
    }
  },
  schedule: {
    analytics: {
      make: [], // 일정 생성 관련 정보
      page: [], // 페이지 분석 관련 정보
      update: [], // 업데이트 관련 정보
      send: [] // 발송 관련 정보
    },
    progress: {
      start: "1799-12-31T15:32:08.000Z", // 프로젝트 시작 날짜 (기본 값)
      complete: "1799-12-31T15:32:08.000Z", // 프로젝트 완료 날짜 (기본 값)
      send: "1799-12-31T15:32:08.000Z" // 프로젝트 완료 통보 날짜 (기본 값)
    },
    contents: {
      title: "", // 일정과 관련된 제목 (현재 없음)
      description: "", // 일정 설명 (현재 없음)
      color: "" // 일정 색상 (현재 없음)
    },
    date: {
      start: "1799-12-31T15:32:08.000Z", // 일정 시작 날짜 (기본 값)
      end: "1799-12-31T15:32:08.000Z" // 일정 종료 날짜 (기본 값)
    },
    children: [] // 하위 일정 항목 (현재 없음)
  },
  purchase: {
    analytics: {
      make: [], // 구매 관련 데이터 분석 정보
      page: [], // 구매 관련 페이지 정보
      update: [], // 구매 관련 업데이트 정보
      send: [] // 구매 관련 발송 정보
    },
    date: "1799-12-31T15:32:08.000Z", // 구매 날짜 (기본 값)
    requests: [] // 구매 요청 관련 정보 (현재 없음)
  },
  manager: "-" // 프로젝트 매니저 정보 (현재 없음)
};