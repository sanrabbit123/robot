/**
 * 콜렉션 이름
 * @type {string}
 * @description 홈리에종에서 자체적으로 만든 Analytics 데이터를 저장하는 데이터베이스
 */
const collectionName = "homeliaisonAnalytics";

/**
 * 콜렉션 설명
 * @type {string}
 * @description 구글 Analytics나 메타 픽셀과 비슷하게 홈리에종에서 자체적으로 구축한 Analytics 기록
 */
const collectionDescription = "구글 Analytics나 메타 픽셀처럼 자체적으로 만들어진 홈리에종 Analytics 중심 디비";

/**
 * 샘플 데이터 0
 * @typedef {Object} HomeliaisonAnalytics
 * @property {string} _id MongoDB에서 자동 생성된 고유 ID
 * @property {string} page Analytics가 기록된 페이지 이름
 * @property {string} standard 기준 시간 (ISO 8601 형식)
 * @property {string} action 사용자의 행동 (이벤트) 이름
 * @property {Object} data Analytics와 관련된 추가 데이터
 * @property {string} data.cliid 고객 ID (null로 표시되었음)
 * @property {string} data.href 방문한 페이지의 URL
 * @property {string} data.date 행동이 발생한 날짜와 시간 (YYYY-MM-DD HH:mm:ss 형식)
 * @property {string} id 해당 기록에 대한 고유 ID
 * @property {Object} info 사용자와 관련된 추가 정보
 * @property {string} info.ip 사용자의 IP 주소
 * @property {string} info.userAgent 사용자가 사용한 브라우저 및 운영 체제 정보
 * @property {string} info.referer 사용자가 방문하기 전 참조한 URL (리퍼러)
 * @property {string} info.requestUrl 요청된 URL
 * @property {string} info.pageTitle 페이지 제목
 * @property {string} date 기록이 저장된 날짜 (ISO 8601 형식)
 * @property {Object} network 네트워크와 관련된 정보
 * @property {string} network.ip 네트워크 IP 주소
 * @property {string} network.city 사용자가 접속한 도시
 * @property {string} network.region 사용자가 접속한 지역 (경기도 등)
 * @property {string} network.country 사용자가 접속한 국가 코드 (KR)
 * @property {string} network.loc 위도와 경도 정보
 * @property {string} network.org 네트워크 제공자 (예: SK Broadband)
 * @property {string} network.postal 우편번호
 * @property {string} network.timezone 접속 시간대 (예: Asia/Seoul)
 * @property {Object} device 사용자 기기 정보
 * @property {Object} device.os 사용자 운영 체제 정보
 * @property {string} device.os.name 운영 체제 이름 (Mac OS 등)
 * @property {string} device.os.version 운영 체제 버전 (예: 10.15.7)
 * @property {string} device.os.browser 사용자가 사용한 브라우저 (Chrome 등)
 * @property {Object} device.device 기기 정보
 * @property {string} device.device.vendor 기기 제조업체 (Apple 등)
 * @property {string} device.device.model 기기 모델 (Macintosh 등)
 * @property {string} device.device.type 기기 유형 (desktop, mobile 등)
 */
const collectionSampleData0 = {
  _id: "66dc129fbca57964267e2133", // MongoDB에서 자동 생성된 고유 ID
  page: "frontIndex", // 분석된 페이지 이름 (홈페이지 프론트 페이지)
  standard: "2024-09-06T19:42:24.859Z", // 기준 시간 (ISO 8601 형식)
  action: "readTimer", // 사용자가 수행한 행동 (페이지 읽기 타이머)
  data: {
    cliid: "null", // 고객 ID, 기록되지 않았음
    href: "https://home-liaison.com/", // 사용자가 방문한 URL
    date: "2024-09-07 17:45:18" // 사용자가 페이지에 접속한 시간 (YYYY-MM-DD HH:mm:ss 형식)
  },
  id: "homeliaison_35838da691ff93e1_1724400850_756fe992", // 이 기록에 대한 고유 식별자
  info: {
    ip: "219.250.255.92", // 사용자의 IP 주소
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36", // 사용자 브라우저 및 운영 체제 정보
    referer: "https://www.google.com/", // 사용자가 Google 검색에서 유입되었음을 나타냄
    requestUrl: "/", // 요청된 URL
    pageTitle: "홈리에종 | 디자이너와 함께 하는 홈스타일링" // 페이지 제목
  },
  date: "2024-09-07T08:45:19.243Z", // 데이터가 기록된 날짜와 시간
  network: {
    ip: "219.250.255.92", // 네트워크 IP 주소
    city: "Ansan-si", // 사용자가 접속한 도시
    region: "Gyeonggi-do", // 사용자가 접속한 지역
    country: "KR", // 접속한 국가 코드 (KR: 한국)
    loc: "37.3236,126.8219", // 위도와 경도 정보
    org: "AS9318 SK Broadband Co Ltd", // 네트워크 제공자 정보
    postal: "15271", // 우편번호
    timezone: "Asia/Seoul" // 접속 시간대
  },
  device: {
    os: {
      name: "Mac OS", // 운영 체제 이름
      version: "10.15.7", // 운영 체제 버전
      browser: "Chrome" // 사용자가 이용한 브라우저
    },
    device: {
      vendor: "Apple", // 기기 제조업체
      model: "Macintosh", // 기기 모델명
      type: "desktop" // 기기 유형 (데스크탑)
    }
  }
};

/**
 * 샘플 데이터 1
 * @typedef {Object} HomeliaisonAnalyticsSample2
 * @property {string} _id MongoDB에서 자동 생성된 고유 ID
 * @property {string} page Analytics가 기록된 페이지 이름
 * @property {string} standard 기준 시간 (ISO 8601 형식)
 * @property {string} action 사용자의 행동 (이벤트) 이름
 * @property {Object} data Analytics와 관련된 추가 데이터
 * @property {string} data.cliid 고객 ID (null로 표시됨)
 * @property {string} data.href 방문한 페이지의 URL
 * @property {string} data.date 행동이 발생한 날짜와 시간 (YYYY-MM-DD HH:mm:ss 형식)
 * @property {string} id 해당 기록에 대한 고유 ID
 * @property {Object} info 사용자와 관련된 추가 정보
 * @property {string} info.ip 사용자의 IP 주소
 * @property {string} info.userAgent 사용자가 사용한 브라우저 및 운영 체제 정보
 * @property {string} info.referer 사용자가 방문하기 전 참조한 URL (리퍼러)
 * @property {string} info.requestUrl 요청된 URL
 * @property {string} info.pageTitle 페이지 제목
 * @property {string} date 기록이 저장된 날짜 (ISO 8601 형식)
 * @property {Object} network 네트워크와 관련된 정보
 * @property {string} network.ip 네트워크 IP 주소
 * @property {string} network.city 사용자가 접속한 도시
 * @property {string} network.region 사용자가 접속한 지역 (서울 등)
 * @property {string} network.country 사용자가 접속한 국가 코드 (KR)
 * @property {string} network.loc 위도와 경도 정보
 * @property {string} network.org 네트워크 제공자 (Korea Telecom)
 * @property {string} network.postal 우편번호
 * @property {string} network.timezone 접속 시간대 (예: Asia/Seoul)
 * @property {Object} device 사용자 기기 정보
 * @property {Object} device.os 사용자 운영 체제 정보
 * @property {string} device.os.name 운영 체제 이름 (Mac OS 등)
 * @property {string} device.os.version 운영 체제 버전 (예: 10.15.7)
 * @property {string} device.os.browser 사용자가 사용한 브라우저 (Chrome 등)
 * @property {Object} device.device 기기 정보
 * @property {string} device.device.vendor 기기 제조업체 (Apple 등)
 * @property {string} device.device.model 기기 모델 (Macintosh 등)
 * @property {string} device.device.type 기기 유형 (desktop, mobile 등)
 */
const collectionSampleData1 = {
  _id: "66aa49ee5de1befa11d4a04f", // MongoDB에서 자동 생성된 고유 ID
  page: "frontIndex", // 기록된 페이지 이름 (프론트 페이지)
  standard: "2024-07-30T06:27:07.484Z", // 기준 시간 (ISO 8601 형식)
  action: "readTimer", // 사용자가 수행한 행동 (페이지 읽기 타이머)
  data: {
    cliid: "null", // 고객 ID가 없는 경우
    href: "https://home-liaison.com/index.php", // 방문한 페이지 URL
    date: "2024-07-31 23:27:57" // 행동이 발생한 시간 (YYYY-MM-DD HH:mm:ss)
  },
  id: "homeliaison_dc3f20a46b4783d4_1722320826_22c0825f", // 해당 기록의 고유 식별자
  info: {
    ip: "222.107.127.136", // 사용자의 IP 주소
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36", // 사용자가 사용한 브라우저 및 운영 체제 정보
    referer: "https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=%ED%99%88%EB%A6%AC%EC%97%90%EC%A2%85", // 사용자가 네이버 검색에서 방문함
    requestUrl: "/index.php", // 요청된 URL
    pageTitle: "홈리에종 | 디자이너와 함께 하는 홈스타일링" // 페이지 제목
  },
  date: "2024-07-31T14:27:58.471Z", // 데이터 기록 시간 (ISO 8601 형식)
  network: {
    ip: "222.107.127.136", // 네트워크 IP 주소
    city: "Seoul", // 사용자가 접속한 도시
    region: "Seoul", // 접속 지역 (서울)
    country: "KR", // 국가 코드 (KR: 한국)
    loc: "37.5660,126.9784", // 위도와 경도
    org: "AS4766 Korea Telecom", // 네트워크 제공자 정보 (KT)
    postal: "03141", // 우편번호
    timezone: "Asia/Seoul" // 접속 시간대 (Asia/Seoul)
  },
  device: {
    os: {
      name: "Mac OS", // 운영 체제 이름
      version: "10.15.7", // 운영 체제 버전
      browser: "Chrome" // 사용된 브라우저
    },
    device: {
      vendor: "Apple", // 기기 제조업체
      model: "Macintosh", // 기기 모델
      type: "desktop" // 기기 유형
    }
  }
};