/**
 * 콜렉션 이름
 * @type {string}
 * @description 디자이너가 콘솔에서 고객에게 특정 파일이나 상태 정보를 알림톡을 통해 보낸 기록을 저장하는 데이터베이스
 */
const collectionName = "projectDesignerSend";

/**
 * 콜렉션 설명
 * @type {string}
 * @description 디자이너가 고객에게 특정 파일을 알림톡으로 전송한 기록을 보관하는 데이터베이스입니다. 이 데이터베이스는 전송된 파일 또는 상태 정보와 관련된 메타 데이터를 저장합니다.
 */
const collectionDescription = "디자이너가 디자이너 콘솔에서 고객에게 특정 파일을 알림톡을 통해 보낸 기록";

/**
 * @typedef {Object} Designer
 * @property {string} desid 디자이너의 고유 ID
 * @property {string} designer 디자이너의 이름
 */

/**
 * @typedef {Object} Client
 * @property {string} cliid 고객의 고유 ID
 * @property {string} name 고객의 이름
 */

/**
 * @typedef {Object} ProjectDesignerSend
 * @property {string} _id MongoDB에서 자동 생성된 고유 ID
 * @property {string} type 전송된 데이터의 유형 (파일인지 상태 정보인지)
 * @property {string} date 전송된 날짜 및 시간 (ISO 8601 형식)
 * @property {string} proid 프로젝트의 고유 ID
 * @property {Designer} designer 디자이너 정보 (디자이너의 ID와 이름)
 * @property {Client} client 고객 정보 (고객의 ID와 이름)
 */

/**
 * 샘플 데이터 0
 * @type {ProjectDesignerSend}
 * @description 프로젝트 'p2406_ab47s'와 관련된 디자이너 '김도현'이 고객 '김정현'에게 상태 정보를 알림톡으로 전송한 기록.
 */
const collectionSampleData0 = {
  _id: "66daabb72d2f704184c7ba91", // MongoDB에서 자동 생성된 고유 ID
  type: "status", // 전송된 데이터의 유형: 상태 정보 (status)
  date: "2024-09-06T07:13:59.903Z", // 전송된 날짜 및 시간: 2024년 9월 6일 07:13 (ISO 8601 형식)
  proid: "p2406_ab47s", // 프로젝트의 고유 ID ('p2406_ab47s')
  designer: {
    desid: "d2109_aa01s", // 디자이너의 고유 ID ('d2109_aa01s')
    designer: "김도현" // 디자이너의 이름 ('김도현')
  },
  client: {
    cliid: "c2406_ac34s", // 고객의 고유 ID ('c2406_ac34s')
    name: "김정현" // 고객의 이름 ('김정현')
  }
};

/**
 * 샘플 데이터 1
 * @type {ProjectDesignerSend}
 * @description 프로젝트 'p2311_aa55s'와 관련된 디자이너 '이지연'이 고객 '김주영'에게 파일을 알림톡으로 전송한 기록.
 */
const collectionSampleData1 = {
  _id: "66c0a4de8e915b93c82d4c30", // MongoDB에서 자동 생성된 고유 ID
  type: "file", // 전송된 데이터의 유형: 파일 (file)
  date: "2024-01-05T01:23:43.377Z", // 전송된 날짜 및 시간: 2024년 1월 5일 01:23 (ISO 8601 형식)
  proid: "p2311_aa55s", // 프로젝트의 고유 ID ('p2311_aa55s')
  designer: {
    desid: "d2309_aa07s", // 디자이너의 고유 ID ('d2309_aa07s')
    designer: "이지연" // 디자이너의 이름 ('이지연')
  },
  client: {
    cliid: "c2311_aa61s", // 고객의 고유 ID ('c2311_aa61s')
    name: "김주영" // 고객의 이름 ('김주영')
  }
};