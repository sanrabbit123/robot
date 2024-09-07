/**
 * 콜렉션 이름
 * @type {string}
 * @description 디자이너가 디자이너 콘솔을 통해 촬영비 등을 결제할 때 (특히 계좌이체에서) 사용되는 중간 데이터를 저장하는 컬렉션
 */
const collectionName = "designerTransfer";

/**
 * 콜렉션 설명
 * @type {string}
 * @description 디자이너 결제 프로세스에서 사용되는 중간 데이터, 특히 계좌이체와 관련된 정보를 저장
 */
const collectionDescription = "디자이너가 디자이너 콘솔을 통해 촬영비 등을 결제할 때 (특히 계좌이체에서) 쓰이는 중간 데이터";

/**
 * 샘플 데이터 0
 * @typedef {Object} DesignerTransfer
 * @property {string} _id MongoDB에서 자동 생성된 고유 ID
 * @property {number} requestNumber 요청 번호 (계좌이체에 대한 요청 순번)
 * @property {string} proid 프로젝트 ID
 * @property {string} cliid 고객 ID
 * @property {string} desid 디자이너 ID
 * @property {string} goodname 결제 항목 이름 (예: '홈리에종 촬영비')
 * @property {string} date 요청 생성 시간 (ISO 형식)
 * @property {string} name 디자이너의 이름
 * @property {string} phone 디자이너의 전화번호
 * @property {number} amount 결제 금액
 * @property {number} complete 결제 완료 여부 (0: 미완료, 1: 완료)
 */
const collectionSampleData0 = {
  _id: "66c09c1d7d20f00155a02359",  // MongoDB에서 자동 생성된 고유 ID
  requestNumber: 0,  // 계좌이체에 대한 요청 순번 (초기값: 0)
  proid: "p2404_aa80s",  // 해당 프로젝트의 고유 ID
  cliid: "c2404_aa81s",  // 고객 고유 ID
  desid: "d2402_aa01s",  // 디자이너 고유 ID
  goodname: "홈리에종 촬영비",  // 결제 항목 이름, 이 경우 '홈리에종 촬영비'
  date: "2024-04-25T01:02:51.116Z",  // 요청이 생성된 날짜와 시간 (ISO 형식)
  name: "조예경",  // 결제 요청한 디자이너의 이름
  phone: "010-7611-5291",  // 디자이너의 전화번호
  amount: 165000,  // 결제 금액 (단위: 원)
  complete: 0  // 결제 완료 여부 (0: 미완료)
};

/**
 * 샘플 데이터 1
 * @typedef {Object} DesignerTransfer
 * @property {string} _id MongoDB에서 자동 생성된 고유 ID
 * @property {number} requestNumber 요청 번호 (계좌이체에 대한 요청 순번)
 * @property {string} proid 프로젝트 ID
 * @property {string} cliid 고객 ID
 * @property {string} desid 디자이너 ID
 * @property {string} goodname 결제 항목 이름 (예: '홈리에종 촬영비')
 * @property {string} date 요청 생성 시간 (ISO 형식)
 * @property {string} name 디자이너의 이름
 * @property {string} phone 디자이너의 전화번호
 * @property {number} amount 결제 금액
 * @property {number} complete 결제 완료 여부 (0: 미완료, 1: 완료)
 */
const collectionSampleData1 = {
  _id: "66c09c1d7d20f00155a02354",  // MongoDB에서 자동 생성된 고유 ID
  requestNumber: 0,  // 계좌이체에 대한 요청 순번 (초기값: 0)
  proid: "p2310_aa82s",  // 해당 프로젝트의 고유 ID
  cliid: "c2310_aa83s",  // 고객 고유 ID
  desid: "d2202_aa04s",  // 디자이너 고유 ID
  goodname: "홈리에종 촬영비",  // 결제 항목 이름, 이 경우 '홈리에종 촬영비'
  date: "2024-03-14T07:58:30.356Z",  // 요청이 생성된 날짜와 시간 (ISO 형식)
  name: "정민재",  // 결제 요청한 디자이너의 이름
  phone: "010-8691-3704",  // 디자이너의 전화번호
  amount: 165000,  // 결제 금액 (단위: 원)
  complete: 1  // 결제 완료 여부 (1: 완료)
};