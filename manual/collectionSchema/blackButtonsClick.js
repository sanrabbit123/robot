const collectionName = "blackButtonsClick";

const collectionDescription = "고객님들이 스타일 체크를 모두 진행 완료했을 시 자동 추천 버튼을 눌렀는지에 대한 여부"

/**
 * blackButtonsClick 컬렉션: 고객님들이 스타일 체크를 모두 완료한 후, 자동 추천 버튼을 눌렀는지에 대한 여부를 기록한 데이터
 * 이 컬렉션은 고객의 행동 이력을 추적하며, 버튼 클릭 이벤트에 대한 정보를 포함합니다.
 */

/**
 * 첫 번째 샘플 데이터: 이유리 고객의 자동 추천 버튼 클릭 기록
 */
const collectionSampleData0 = {
  /**
   * 고유 식별자 (_id)
   * @type {string}
   */
  "_id": "66c09c277d20f00155a1f4dd",  // MongoDB에서 자동 생성된 ObjectId로 이 문서의 고유 식별자입니다.

  /**
   * 고객 ID (cliid)
   * @type {string}
   */
  "cliid": "c2408_aa66s",  // 고객의 고유 ID, "cliid"는 Homeliezon의 고객 식별자입니다.

  /**
   * 고객 이름 (name)
   * @type {string}
   */
  "name": "이유리",  // 스타일 체크를 완료한 고객의 이름입니다.

  /**
   * 버튼 클릭 시간 (date)
   * @type {string}
   */
  "date": "2024-08-07T07:38:48.110Z",  // 고객이 자동 추천 버튼을 누른 날짜와 시간입니다.

  /**
   * 모드 (mode)
   * @type {string}
   */
  "mode": "consulting"  // 이 기록이 생성된 시점에서의 모드, "consulting"은 상담 모드를 나타냅니다.
}

/**
 * 두 번째 샘플 데이터: 임순임 고객의 자동 추천 버튼 클릭 기록
 */
const collectionSampleData1 = {
  "_id": "66c09c277d20f00155a1f4b2",  // MongoDB에서 자동 생성된 고유 ObjectId입니다.
  "cliid": "c2406_aa50s",  // 고객의 고유 ID입니다.
  "name": "임순임",  // 고객 이름입니다.
  "date": "2024-06-04T01:24:31.843Z",  // 고객이 자동 추천 버튼을 누른 날짜와 시간입니다.
  "mode": "consulting"  // 고객이 버튼을 누른 시점에서의 모드입니다.
}

/**
 * 세 번째 샘플 데이터: 배창규 고객의 자동 추천 버튼 클릭 기록
 */
const collectionSampleData2 = {
  "_id": "66c09c277d20f00155a1f488",  // MongoDB에서 자동 생성된 고유 ObjectId입니다.
  "cliid": "c1801_aa01s",  // 고객의 고유 ID입니다.
  "name": "배창규",  // 고객 이름입니다.
  "date": "2024-05-27T01:39:31.458Z",  // 고객이 자동 추천 버튼을 누른 날짜와 시간입니다.
  "mode": "consulting"  // 버튼 클릭 시점의 모드입니다.
}