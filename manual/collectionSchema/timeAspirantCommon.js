/**
 * 콜렉션 이름
 * @type {string}
 * @description 디자이너 신청자들의 공통 교육 날짜를 지정하고, 신청자가 어떤 교육 날짜를 선택했는지에 대한 기록을 저장하는 데이터베이스
 */
const collectionName = "timeAspirantCommon";

/**
 * 콜렉션 설명
 * @type {string}
 * @description 공통 교육 날짜와 그 날짜에 참석할 디자이너 신청자들에 대한 정보를 저장하는 콜렉션. 교육 날짜가 여러 신청자들에게 할당되고, 신청자들이 해당 날짜를 선택했는지에 대한 기록을 포함.
 */
const collectionDescription = "디자이너 신청자들의 공통 교육 날짜 지정과 신청자가 어떤 것을 선택했는지에 대한 기록";

/**
 * @typedef {Object} TimeAspirantCommonTarget
 * @property {string} aspid 디자이너 신청자 ID (a2311_aa05s 형식)
 * @property {string} date 디자이너 신청자가 선택한 교육 날짜 (ISO 8601 형식)
 */

/**
 * @typedef {Object} TimeAspirantCommon
 * @property {string} _id MongoDB에서 자동 생성된 고유 ID
 * @property {string} date 교육 날짜 (ISO 8601 형식)
 * @property {TimeAspirantCommonTarget[]} targets 신청자 목록, 각각의 신청자 ID와 해당 신청자가 선택한 교육 날짜
 * @property {string} id 공통 교육 ID (commonMeeting_형식)
 * @property {string} log 마지막으로 업데이트된 날짜와 시간 (ISO 8601 형식)
 */

/**
 * 샘플 데이터 0
 * @type {TimeAspirantCommon}
 * @description 2024년 2월 28일에 설정된 공통 교육 날짜와 해당 교육에 참여할 신청자 목록
 */
const collectionSampleData0 = {
  _id: "66dc0f3e97529e9ed2ee0cda", // MongoDB에서 자동 생성된 고유 ID
  date: "2024-02-28T15:00:00.000Z", // 교육 날짜, 2024년 2월 28일 15:00 (UTC)
  targets: [ // 해당 교육에 참여할 신청자 목록
    {
      aspid: "a2311_aa05s", // 신청자 ID, a2311_aa05s는 해당 신청자를 구분하는 고유 식별자
      date: "2024-02-28T15:00:00.000Z" // 신청자가 선택한 교육 날짜, 2024년 2월 28일 15:00 (UTC)
    }
  ],
  id: "commonMeeting_20240229000000", // 공통 교육의 고유 ID, 시간 형식에 기반한 ID
  log: "2024-09-07T08:30:54.150Z" // 마지막 업데이트된 날짜와 시간, 2024년 9월 7일 08:30:54 (UTC)
};

/**
 * 샘플 데이터 1
 * @type {TimeAspirantCommon}
 * @description 2024년 4월 25일에 설정된 공통 교육 날짜와 해당 교육에 참여할 신청자 목록
 */
const collectionSampleData1 = {
  _id: "66dc0f3e97529e9ed2ee0cd3", // MongoDB에서 자동 생성된 고유 ID
  date: "2024-04-25T05:00:00.000Z", // 교육 날짜, 2024년 4월 25일 05:00 (UTC)
  targets: [ // 해당 교육에 참여할 신청자 목록
    {
      aspid: "a2403_aa27s", // 신청자 ID, a2403_aa27s는 해당 신청자를 구분하는 고유 식별자
      date: "2024-04-25T05:00:00.000Z" // 신청자가 선택한 교육 날짜, 2024년 4월 25일 05:00 (UTC)
    },
    {
      aspid: "a2403_aa10s", // 신청자 ID, a2403_aa10s는 해당 신청자를 구분하는 고유 식별자
      date: "2024-04-25T05:00:00.000Z" // 신청자가 선택한 교육 날짜, 2024년 4월 25일 05:00 (UTC)
    },
    {
      aspid: "a2403_aa02s", // 신청자 ID, a2403_aa02s는 해당 신청자를 구분하는 고유 식별자
      date: "2024-04-25T05:00:00.000Z" // 신청자가 선택한 교육 날짜, 2024년 4월 25일 05:00 (UTC)
    },
    {
      aspid: "a2402_aa05s", // 신청자 ID, a2402_aa05s는 해당 신청자를 구분하는 고유 식별자
      date: "2024-04-25T05:00:00.000Z" // 신청자가 선택한 교육 날짜, 2024년 4월 25일 05:00 (UTC)
    }
  ],
  id: "commonMeeting_20240425140000", // 공통 교육의 고유 ID, 시간 형식에 기반한 ID
  log: "2024-09-07T08:30:54.117Z" // 마지막 업데이트된 날짜와 시간, 2024년 9월 7일 08:30:54 (UTC)
};