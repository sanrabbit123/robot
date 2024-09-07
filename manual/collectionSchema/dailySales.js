/**
 * 콜렉션 이름
 * @type {string}
 * @description 해당 영업일 기준 세일즈 대상(고객 아이디 배열)을 추리는 연산 결과를 저장하는 데이터베이스
 */
const collectionName = "dailySales";

/**
 * 콜렉션 설명
 * @type {string}
 * @description 영업일 기준 세일즈 대상 고객 ID 배열의 연산 결과를 저장
 */
const collectionDescription = "해당 영업일 기준 세일즈 대상 (고객 아이디 배열) 추리는 연산 결과를 저장하는 디비";

/**
 * 샘플 데이터 0
 * @type {Object}
 * @property {string} _id MongoDB에서 자동 생성된 고유 ID
 * @property {string} id 세일즈 기록의 고유 식별자, 날짜와 관련됨 (예: "sales_20240902")
 * @property {Date} date 해당 세일즈 기록의 날짜 (UTC 기준)
 * @property {Object} range 해당 세일즈 기간의 범위
 * @property {Date} range.from 세일즈 기간 시작 날짜 (UTC 기준)
 * @property {Date} range.to 세일즈 기간 종료 날짜 (UTC 기준)
 * @property {Array<Object>} cliids 해당 기간 내 세일즈 대상이 된 고객 리스트
 * @property {string} cliids[].cliid 고객의 고유 식별자
 * @property {number} cliids[].possible 고객의 세일즈 가능성 (0 = 낮음)
 * @property {number} cliids[].priority 고객의 우선순위 (0 = 낮음)
 * @property {number} cliids[].target 고객이 세일즈 대상으로 설정되었는지 여부 (0 = 대상 아님)
 */
const collectionSampleData0 = {
  _id: "66db92d671210d45f3faed9d",  // MongoDB에서 자동 생성된 고유 ID
  id: "sales_20240902",  // 세일즈 기록의 고유 식별자, 날짜와 관련됨
  date: "2024-09-02T00:00:00.000Z",  // 해당 세일즈 기록의 날짜 (UTC 기준)
  range: {
    from: "2024-08-30T00:00:00.000Z",  // 세일즈 기간 시작 날짜 (UTC 기준)
    to: "2024-09-02T00:00:00.000Z"  // 세일즈 기간 종료 날짜 (UTC 기준)
  },
  cliids: [
    {
      cliid: "c2409_aa08s",  // 첫 번째 고객의 고유 식별자
      possible: 0,  // 세일즈 가능성 (0 = 낮음)
      priority: 0,  // 세일즈 우선순위 (0 = 낮음)
      target: 0  // 세일즈 대상으로 설정 여부 (0 = 대상 아님)
    },
    {
      cliid: "c2408_ab52s",  // 두 번째 고객의 고유 식별자
      possible: 0,  // 세일즈 가능성 (0 = 낮음)
      priority: 0,  // 세일즈 우선순위 (0 = 낮음)
      target: 0  // 세일즈 대상으로 설정 여부 (0 = 대상 아님)
    },
    {
      cliid: "c2409_aa07s",  // 세 번째 고객의 고유 식별자
      possible: 0,  // 세일즈 가능성 (0 = 낮음)
      priority: 0,  // 세일즈 우선순위 (0 = 낮음)
      target: 0  // 세일즈 대상으로 설정 여부 (0 = 대상 아님)
    }
  ]
};