/**
 * 콜렉션 이름
 * @type {string}
 * @description 홈리에종 서비스 촬영이 완료된 후, 고객에게 전송된 평가 기록을 저장하는 컬렉션
 */
const collectionName = "evaluationNotice";

/**
 * 콜렉션 설명
 * @type {string}
 * @description 홈리에종이 촬영이 끝난 고객에게 보낸 홈리에종 서비스 평가지를 전송한 기록을 저장하는 컬렉션
 */
const collectionDescription = "홈리에종이 촬영이 끝난 고객에게 보낸 홈리에종 서비스 평가지를 전송한 기록";

/**
 * 샘플 데이터 0
 * @typedef {Object} EvaluationNotice
 * @property {string} _id MongoDB에서 자동 생성된 고유 ID
 * @property {string} proid 프로젝트 ID, 홈리에종에서 관리하는 프로젝트의 고유 식별자
 * @property {string} desid 디자이너 ID, 해당 프로젝트를 담당한 디자이너의 고유 식별자
 * @property {string} cliid 고객 ID, 해당 프로젝트의 고객의 고유 식별자
 * @property {string} date 전송 날짜, 평가지가 고객에게 전송된 날짜와 시간을 기록
 * @property {Array<string>} history 전송 내역, 평가지가 전송된 기록을 저장한 배열 (날짜와 시간 형식)
 */
const collectionSampleData0 = {
  _id: "66da69071b4d4a684931d54b", // MongoDB에서 자동 생성된 고유 ID
  proid: "p2402_ab59s", // 프로젝트 ID, 해당 서비스 평가가 전송된 프로젝트의 고유 식별자
  desid: "d2401_aa01s", // 디자이너 ID, 해당 프로젝트를 담당한 디자이너의 고유 식별자
  cliid: "c2402_ab75s", // 고객 ID, 해당 프로젝트의 고객의 고유 식별자
  date: "2024-09-06T02:29:27.557Z", // 평가지가 전송된 날짜와 시간
  history: [
    "2024-09-06T02:29:27.557Z" // 전송된 시간 기록 (첫 전송 시간)
  ]
};

/**
 * 샘플 데이터 1
 * @typedef {Object} EvaluationNotice
 * @property {string} _id MongoDB에서 자동 생성된 고유 ID
 * @property {string} proid 프로젝트 ID, 홈리에종에서 관리하는 프로젝트의 고유 식별자
 * @property {string} desid 디자이너 ID, 해당 프로젝트를 담당한 디자이너의 고유 식별자
 * @property {string} cliid 고객 ID, 해당 프로젝트의 고객의 고유 식별자
 * @property {string} date 전송 날짜, 평가지가 고객에게 전송된 날짜와 시간을 기록
 * @property {Array<string>} history 전송 내역, 평가지가 전송된 기록을 저장한 배열 (날짜와 시간 형식)
 */
const collectionSampleData1 = {
  _id: "65d3da7b1348908be957356a", // MongoDB에서 자동 생성된 고유 ID
  proid: "p2306_aa16s", // 프로젝트 ID, 해당 서비스 평가가 전송된 프로젝트의 고유 식별자
  desid: "d2206_aa01s", // 디자이너 ID, 해당 프로젝트를 담당한 디자이너의 고유 식별자
  cliid: "c2306_aa16s", // 고객 ID, 해당 프로젝트의 고객의 고유 식별자
  date: "2024-02-19T22:47:23.529Z", // 평가지가 전송된 날짜와 시간
  history: [
    "2024-02-19T22:47:23.529Z" // 전송된 시간 기록 (첫 전송 시간)
  ]
};