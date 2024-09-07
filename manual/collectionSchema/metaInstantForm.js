/**
 * 콜렉션 이름
 * @type {string}
 * @description 메타 인스턴스 문의를 JSON으로 변환하여 저장해 놓은 기록을 관리하는 데이터베이스
 */
const collectionName = "metaInstantForm";

/**
 * 콜렉션 설명
 * @type {string}
 * @description 메타 인스턴트 광고를 통해 수집된 문의 데이터를 JSON 형식으로 변환하여 저장한 기록을 저장하는 데이터베이스
 */
const collectionDescription = "메타 인스턴스 문의를 JSON으로 변환하여 저장해놓은 기록";

/**
 * @typedef {Object} MetaInstantForm
 * @property {string} _id MongoDB에서 자동 생성된 고유 ID
 * @property {string} id 메타에서 제공된 고유 ID
 * @property {string} ad 광고 ID
 * @property {string} date 데이터가 수집된 날짜 및 시간 (ISO 포맷)
 * @property {number} injection 데이터가 주입되었는지를 나타내는 값 (1: 주입됨, 0: 주입되지 않음)
 * @property {Array<Object>} raw 원본 데이터 배열, 각각의 문의 필드와 그 값들을 포함
 * @property {Object} data 문의 데이터를 변환하여 저장한 최종 결과
 */

/**
 * 샘플 데이터 0
 * @type {MetaInstantForm}
 */
const collectionSampleData0 = {
  _id: "66d26dcf4e4783dad4284e14", // MongoDB에서 자동 생성된 고유 ID
  id: "795384742644905", // 메타에서 제공된 고유 ID
  ad: "120209589249670376", // 광고 ID
  date: "2024-07-31T01:58:51.000Z", // 데이터가 수집된 날짜 및 시간 (ISO 형식)
  injection: 1, // 데이터가 성공적으로 주입되었는지 여부를 나타내는 값 (1: 주입됨)
  raw: [
    {
      name: "serid", // 문의 필드 이름
      values: ["s2011_aa02s"] // 문의 필드 값
    },
    {
      name: "purchase", // 구매 계획 필드
      values: ["기존_가구_사용"] // 구매 계획에 대한 값 (기존 가구 사용)
    },
    {
      name: "budget", // 예산 필드
      values: ["1,000만원"] // 예산 값 (1,000만원)
    },
    {
      name: "contract", // 계약 유형 필드
      values: ["전월세"] // 계약 유형 값 (전월세)
    },
    {
      name: "time", // 선호 상담 시간 필드
      values: ["9:30_-_11:00"] // 선호 상담 시간 (9:30 - 11:00)
    },
    {
      name: "name", // 문의자의 이름
      values: ["신한진"] // 이름 값 (신한진)
    },
    {
      name: "phone", // 문의자의 전화번호
      values: ["01033728865"] // 전화번호 값 (010-3372-8865)
    },
    {
      name: "email", // 문의자의 이메일 주소
      values: ["shj9707@naver.com"] // 이메일 값 (shj9707@naver.com)
    },
    {
      name: "address", // 주소 필드
      values: ["잠실주공5단지 519동"] // 주소 값 (잠실주공 5단지 519동)
    },
    {
      name: "pyeong", // 평수 필드
      values: ["35b"] // 평수 값 (35평형)
    },
    {
      name: "expected", // 예상 입주일 필드
      values: ["24년 12월"] // 예상 입주일 값 (2024년 12월)
    }
  ],
  data: {
    serid: "s2011_aa02s", // 서비스 ID
    purchase: "기존_가구_사용", // 구매 계획
    budget: "1,000만원", // 예산
    name: "신한진", // 문의자의 이름
    phone: "01033728865", // 문의자의 전화번호
    address: "잠실주공5단지 519동", // 문의자의 주소
    pyeong: "35b", // 평수
    expected: "24년 12월", // 예상 입주일
    email: "shj9707@naver.com", // 문의자의 이메일
    contract: "전월세" // 계약 유형
  }
};