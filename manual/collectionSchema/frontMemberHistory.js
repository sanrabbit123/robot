/**
 * 콜렉션 이름
 * @type {string}
 * @description 홈리에종의 직원이 프론트 웹서버에 접속한 기록과 각 세션에 대한 정보를 저장하는 데이터베이스
 */
const collectionName = "frontMemberHistory";

/**
 * 콜렉션 설명
 * @type {string}
 * @description 홈리에종 프론트 웹서버에 직원이 로그인하여 활동한 기록을 저장한 데이터베이스
 */
const collectionDescription = "홈리에종의 직원이 홈리에종 프론트 웹서버에 접속한 기록과 세션에 대한 정보";

/**
 * 샘플 데이터 0
 * @typedef {Object} FrontMemberHistory
 * @property {string} _id MongoDB에서 자동 생성된 고유 ID
 * @property {string} date 직원이 접속한 날짜와 시간
 * @property {Object} member 접속한 직원 정보
 * @property {string} member.memid 직원 ID, 홈리에종에서 관리하는 직원의 고유 식별자
 * @property {string} member.name 직원 이름, 접속한 직원의 이름
 * @property {Object} data 접속 시 세션과 관련된 정보
 * @property {string} data.session 접속한 직원의 세션 ID, 해당 세션을 식별하는 값
 * @property {string} data.ip 접속한 IP 주소, 직원이 접속할 때 사용한 IP
 * @property {string} data.href 접속한 페이지의 URL, 직원이 접속한 프론트 웹페이지의 경로
 */
const collectionSampleData0 = {
  _id: "66c09c277d20f00155a1ee6a", // MongoDB에서 자동 생성된 고유 ID
  date: "2024-06-18T05:07:02.686Z", // 접속한 날짜와 시간
  member: {
    memid: "m2211_aa01s", // 직원 ID, "m2211_aa01s"라는 고유 식별자
    name: "박혜정" // 직원 이름, "박혜정"이라는 이름으로 기록
  },
  data: {
    session: "homeliaison_154ef8c572c9761f_1683081107_4c0e4979", // 세션 ID, 접속한 세션을 식별하는 값
    ip: "192.168.0.33", // 접속한 IP 주소, 직원이 사용한 네트워크 주소
    href: "https://home-liaison.com/review.php" // 접속한 URL, 해당 직원이 활동한 웹페이지 경로
  }
};

/**
 * 샘플 데이터 1
 * @typedef {Object} FrontMemberHistory
 * @property {string} _id MongoDB에서 자동 생성된 고유 ID
 * @property {string} date 직원이 접속한 날짜와 시간
 * @property {Object} member 접속한 직원 정보
 * @property {string} member.memid 직원 ID, 홈리에종에서 관리하는 직원의 고유 식별자
 * @property {string} member.name 직원 이름, 접속한 직원의 이름
 * @property {Object} data 접속 시 세션과 관련된 정보
 * @property {string} data.session 접속한 직원의 세션 ID, 해당 세션을 식별하는 값
 * @property {string} data.ip 접속한 IP 주소, 직원이 접속할 때 사용한 IP
 * @property {string} data.href 접속한 페이지의 URL, 직원이 접속한 프론트 웹페이지의 경로
 */
const collectionSampleData1 = {
  _id: "66c09c277d20f00155a1ec69", // MongoDB에서 자동 생성된 고유 ID
  date: "2024-05-23T06:10:00.720Z", // 접속한 날짜와 시간
  member: {
    memid: "m1701_aa01s", // 직원 ID, "m1701_aa01s"라는 고유 식별자
    name: "박혜연" // 직원 이름, "박혜연"이라는 이름으로 기록
  },
  data: {
    session: "homeliaison_48df34fbeedb5fab_1704183702_7c0daaa7", // 세션 ID, 접속한 세션을 식별하는 값
    ip: "192.168.0.32", // 접속한 IP 주소, 직원이 사용한 네트워크 주소
    href: "https://home-liaison.com/designer.php" // 접속한 URL, 해당 직원이 활동한 웹페이지 경로
  }
};