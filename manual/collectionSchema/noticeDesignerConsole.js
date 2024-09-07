/**
 * 콜렉션 이름
 * @type {string}
 * @description 홈리에종 콘솔에서 협업 디자이너에게 콘솔 사용법 안내 내용을 전송한 알림톡 기록을 저장하는 데이터베이스.
 */
const collectionName = "noticeDesignerConsole";

/**
 * 콜렉션 설명
 * @type {string}
 * @description 협업 디자이너에게 콘솔 사용법 안내 알림톡을 전송한 기록을 저장하는 데이터베이스. 알림톡 발송 시간, 디자이너 정보, 발송 이력 등을 포함.
 */
const collectionDescription = "홈리에종 콘솔에서 협업 디자이너에게 콘솔 사용법 안내 내용을 전송한 알림톡 기록";

/**
 * @typedef {Object} NoticeDesignerConsole
 * @property {string} _id MongoDB에서 자동 생성된 고유 ID
 * @property {string} id 알림톡 발송의 고유 식별자
 * @property {string} type 알림톡의 유형 (ex: 'until', 'setting')
 * @property {string} date 알림톡이 전송된 날짜와 시간 (UTC 포맷)
 * @property {Object} designer 디자이너에 대한 정보
 * @property {string} designer.desid 디자이너의 고유 ID
 * @property {string} designer.designer 디자이너의 이름
 * @property {Array} history 알림톡 전송 이력, 날짜와 관련된 값을 포함
 */

/**
 * 샘플 데이터 0
 * @type {NoticeDesignerConsole}
 * @description 2024년 8월 10일에 'until' 유형의 알림톡을 디자이너 '배창규'에게 발송한 기록.
 */
const collectionSampleData0 = {
  _id: "66c0a4df8e915b93c82d52df", // MongoDB에서 자동 생성된 고유 ID
  id: "noticeDesignerConsoleSend_EE0D1723292902826AAA5E24C31914C1D69711EB", // 알림톡 발송에 대한 고유 식별자
  type: "until", // 알림톡 유형 ('until': 특정 기한까지의 안내)
  date: "2024-08-10T12:28:42.097Z", // 알림톡이 전송된 날짜와 시간 (UTC)
  designer: {
    desid: "d2408_aa01s", // 디자이너의 고유 ID
    designer: "배창규" // 디자이너의 이름
  },
  history: [
    "2024-08-10T12:28:42.097Z", // 첫 번째 알림톡 전송 이력 (날짜와 시간)
    "2024-08-10T12:28:22.828Z"  // 두 번째 알림톡 전송 이력 (날짜와 시간)
  ]
};

/**
 * 샘플 데이터 1
 * @type {NoticeDesignerConsole}
 * @description 2024년 8월 26일에 'until' 유형의 알림톡을 디자이너 '윤영은'에게 발송한 기록.
 */
const collectionSampleData1 = {
  _id: "66cc2c6c06355bce9a616e77", // MongoDB에서 자동 생성된 고유 ID
  id: "noticeDesignerConsoleSend_CD2B1724656748857A9398D8D8191698760CFB81", // 알림톡 발송에 대한 고유 식별자
  type: "until", // 알림톡 유형 ('until': 특정 기한까지의 안내)
  date: "2024-08-26T07:19:08.857Z", // 알림톡이 전송된 날짜와 시간 (UTC)
  designer: {
    desid: "d2408_aa03s", // 디자이너의 고유 ID
    designer: "윤영은" // 디자이너의 이름
  },
  history: [
    "2024-08-26T07:19:08.862Z" // 첫 번째 알림톡 전송 이력 (날짜와 시간)
  ]
};