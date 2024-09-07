/**
 * 콜렉션 이름
 * @type {string}
 * @description 홈리에종 콘솔에서 디자이너 신청자에게 콘솔 관련 안내 내용을 전송한 알림톡 기록을 저장하는 데이터베이스.
 */
const collectionName = "noticeAspirantConsole";

/**
 * 콜렉션 설명
 * @type {string}
 * @description 디자이너 신청자에게 콘솔 관련 안내 내용을 알림톡으로 전송한 기록을 저장하는 데이터베이스. 알림톡 발송 시간, 신청자 정보, 발송 이력 등을 포함.
 */
const collectionDescription = "홈리에종 콘솔에서 디자이너 신청자에게 콘솔 관련 안내 내용을 전송한 알림톡 기록";

/**
 * @typedef {Object} NoticeAspirantConsole
 * @property {string} _id MongoDB에서 자동 생성된 고유 ID
 * @property {string} id 알림톡 발송의 고유 식별자
 * @property {string} type 알림톡의 유형 (ex: 'setting', 'documents')
 * @property {string} date 알림톡이 전송된 날짜와 시간 (UTC 포맷)
 * @property {Object} aspirant 신청자에 대한 정보
 * @property {string} aspirant.aspid 신청자의 고유 ID
 * @property {string} aspirant.designer 신청자의 이름 (디자이너)
 * @property {Array} history 알림톡 전송 이력, 날짜와 관련된 값을 포함
 */

/**
 * 샘플 데이터 0
 * @type {NoticeAspirantConsole}
 * @description 2024년 9월 3일에 'setting' 유형의 알림톡을 디자이너 신청자 '강도경'에게 발송한 기록.
 */
const collectionSampleData0 = {
  _id: "66d7021cec1476a13f110bb5", // MongoDB에서 자동 생성된 고유 ID
  id: "noticeAspirantConsoleSend_EE4C1725366812078AEAD30E7B19130009ACD956", // 알림톡 발송에 대한 고유 식별자
  type: "setting", // 알림톡 유형 (설정 관련 안내)
  date: "2024-09-03T12:33:32.078Z", // 알림톡이 전송된 날짜와 시간 (UTC)
  aspirant: {
    aspid: "a2409_aa01s", // 신청자의 고유 ID
    designer: "강도경" // 신청자의 이름
  },
  history: [
    "2024-09-03T12:33:32.080Z" // 알림톡 전송 이력 (날짜와 시간)
  ]
};

/**
 * 샘플 데이터 1
 * @type {NoticeAspirantConsole}
 * @description 2024년 8월 30일에 'documents' 유형의 알림톡을 디자이너 신청자 '안혜리'에게 발송한 기록.
 */
const collectionSampleData1 = {
  _id: "66d173338476862c0859f212", // MongoDB에서 자동 생성된 고유 ID
  id: "noticeAspirantConsoleSend_BBBE1725002547214AE000A22A191DC6F44033FF", // 알림톡 발송에 대한 고유 식별자
  type: "documents", // 알림톡 유형 (서류 관련 안내)
  date: "2024-08-30T07:22:27.214Z", // 알림톡이 전송된 날짜와 시간 (UTC)
  aspirant: {
    aspid: "a2408_aa10s", // 신청자의 고유 ID
    designer: "안혜리" // 신청자의 이름
  },
  history: [
    "2024-08-30T07:22:27.218Z" // 알림톡 전송 이력 (날짜와 시간)
  ]
};