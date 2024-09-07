/**
 * 콜렉션 이름
 * @type {string}
 * @description 홈리에종 콘솔에서 디자이너 신청자에게 공통 교육 날짜를 전송한 알림톡에 대한 기록을 저장하는 데이터베이스.
 */
const collectionName = "noticeAspirantCommon";

/**
 * 콜렉션 설명
 * @type {string}
 * @description 디자이너 신청자에게 전송된 공통 교육 날짜 알림톡에 대한 정보를 저장. 알림톡 발송 시간, 신청자 정보, 발송 이력 등을 포함.
 */
const collectionDescription = "홈리에종 콘솔에서 디자이너 신청자에게 공통 교육 날짜를 전송한 알림톡에 대한 기록";

/**
 * @typedef {Object} NoticeAspirantCommon
 * @property {string} _id MongoDB에서 자동 생성된 고유 ID
 * @property {string} id 알림톡 발송의 고유 식별자
 * @property {string} type 알림톡의 유형 (이 경우 'common')
 * @property {string} date 알림톡이 전송된 날짜와 시간 (UTC 포맷)
 * @property {Object} aspirant 신청자에 대한 정보
 * @property {string} aspirant.aspid 신청자의 고유 ID
 * @property {string} aspirant.designer 신청자의 이름 (디자이너)
 * @property {Array} history 알림톡 전송 이력, 날짜와 관련된 값을 포함
 */

/**
 * 샘플 데이터 0
 * @type {NoticeAspirantCommon}
 * @description 첫 번째 알림톡 기록 예시. 2024년 8월 30일에 발송된 알림톡.
 */
const collectionSampleData0 = {
  _id: "66d173338476862c0859f211", // MongoDB에서 자동 생성된 고유 ID
  id: "noticeAspirantCommonSend_EAFF1725002547036AC5FF922A191D9771F1B363", // 알림톡 발송에 대한 고유 식별자
  type: "common", // 알림톡 유형 (공통 교육 알림)
  date: "2024-08-30T07:22:27.036Z", // 알림톡이 전송된 날짜와 시간 (UTC)
  aspirant: {
    aspid: "a2408_aa10s", // 신청자의 고유 ID
    designer: "안혜리" // 신청자의 이름
  },
  history: [
    {
      date: "2024-08-30T07:22:27.036Z", // 알림톡 전송 이력의 날짜와 시간 (UTC)
      value: [
        1726722000000, // 첫 번째 교육 날짜 (타임스탬프 형식, 밀리초)
        1726722000000 // 두 번째 교육 날짜 (타임스탬프 형식, 밀리초)
      ]
    }
  ]
};

/**
 * 샘플 데이터 1
 * @type {NoticeAspirantCommon}
 * @description 두 번째 알림톡 기록 예시. 2024년 9월 3일에 발송된 알림톡.
 */
const collectionSampleData1 = {
  _id: "66d6cbd14ab4ccd016a398ca", // MongoDB에서 자동 생성된 고유 ID
  id: "noticeAspirantCommonSend_AD6E1725352913059A3A82C07B19166C6AF9CA74", // 알림톡 발송에 대한 고유 식별자
  type: "common", // 알림톡 유형 (공통 교육 알림)
  date: "2024-09-03T08:42:24.347Z", // 알림톡이 전송된 날짜와 시간 (UTC)
  aspirant: {
    aspid: "a2409_aa01s", // 신청자의 고유 ID
    designer: "강도경" // 신청자의 이름
  },
  history: [
    {
      date: "2024-09-03T08:42:24.346Z", // 첫 번째 알림톡 전송 이력 날짜와 시간
      value: [
        1726722000000, // 첫 번째 교육 날짜 (타임스탬프 형식)
        1726722000000 // 두 번째 교육 날짜 (타임스탬프 형식)
      ]
    },
    {
      date: "2024-09-03T08:41:53.059Z", // 두 번째 알림톡 전송 이력 날짜와 시간
      value: [
        1726722000000, // 첫 번째 교육 날짜 (타임스탬프 형식)
        1726722000000 // 두 번째 교육 날짜 (타임스탬프 형식)
      ]
    }
  ]
};