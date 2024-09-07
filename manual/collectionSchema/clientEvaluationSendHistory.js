/**
 * @const {string} collectionName - 콜렉션의 이름을 정의
 * @description 고객에게 홈리에종 서비스 평가지를 보낸 기록에 대한 히스토리를 저장하는 콜렉션
 */
const collectionName = "clientEvaluationSendHistory"; // 'clientEvaluationSendHistory'는 서비스 평가지를 고객에게 보낸 기록을 저장하는 콜렉션 이름

/**
 * @const {string} collectionDescription - 콜렉션 설명
 * @description 홈리에종 서비스 평가지가 고객에게 전송된 기록을 담고 있는 데이터베이스 콜렉션
 */
const collectionDescription = "고객에게 홈리에종 서비스 평가지를 보낸 기록에 대한 히스토리"; // 콜렉션의 설명, 고객에게 평가지를 보낸 기록을 관리

/**
 * @const {Object} collectionSampleData0 - 첫 번째 샘플 데이터
 * @property {string} _id - MongoDB 고유 식별자
 * @property {string} proid - 프로젝트 ID
 * @property {string} cliid - 고객 ID
 * @property {Date} date - 평가지가 전송된 날짜 및 시간
 * @property {Array} send - 전송 기록 배열
 * @property {Object} send[0] - 첫 번째 전송 기록 객체
 * @property {Date} send[0].date - 평가지가 전송된 날짜 및 시간
 */
const collectionSampleData0 = {
  _id: "66da6907f09861c27dc41b2e", // 고유 식별자 (MongoDB에서 자동 생성)
  proid: "p2402_ab59s", // 해당 프로젝트의 고유 ID
  cliid: "c2402_ab75s", // 해당 고객의 고유 ID
  date: "2024-09-06T02:29:27.917Z", // 평가지가 처음 전송된 날짜와 시간
  send: [
    {
      date: "2024-09-06T02:29:27.917Z", // 평가지가 전송된 날짜 및 시간
    },
  ],
};

/**
 * @const {Object} collectionSampleData1 - 두 번째 샘플 데이터
 * @property {string} _id - MongoDB 고유 식별자
 * @property {string} proid - 프로젝트 ID
 * @property {string} cliid - 고객 ID
 * @property {Date} date - 평가지가 전송된 날짜 및 시간
 * @property {Array} send - 전송 기록 배열
 * @property {Object} send[0] - 첫 번째 전송 기록 객체
 * @property {Date} send[0].date - 평가지가 전송된 날짜 및 시간
 */
const collectionSampleData1 = {
  _id: "66c09c147d20f001559fe465", // 고유 식별자 (MongoDB에서 자동 생성)
  proid: "p2401_ab64s", // 해당 프로젝트의 고유 ID
  cliid: "c2401_ab73s", // 해당 고객의 고유 ID
  date: "2024-08-09T05:12:00.597Z", // 평가지가 전송된 날짜와 시간
  send: [
    {
      date: "2024-08-09T05:12:00.597Z", // 평가지가 전송된 날짜 및 시간
    },
  ],
};