/**
 * 이 worker는 특정 dayId에 해당하는 크론 작업을 정의하고 있습니다.
 * 해당 작업은 주어진 패키지를 통해 필요한 시스템 요청을 수행합니다.
 */

/**
 * dayId 배열은 이 worker가 실행되어야 하는 특정 날짜의 ID를 저장합니다.
 * 이 ID는 날짜별 크론 작업을 구분하는 데 사용됩니다.
 * @type {Array<string>}
 */
const dayId = [
  "d132", // 'd132'는 매일 오후 1시 20분에 실행되어야 함을 나타냅니다.
];

/**
 * hourId 배열은 이 worker가 실행되어야 하는 특정 시간의 ID를 저장합니다.
 * 이 ID는 시간별 크론 작업을 구분하는 데 사용됩니다.
 * 현재 배열이 비어있으므로, 시간별로 실행되는 작업은 없습니다.
 * @type {Array<string>}
 */
const hourId = [];

/**
 * worker 함수는 이 크론 작업이 실행될 때 수행되는 주요 작업을 정의합니다.
 * 이 함수는 비동기로 실행되며, 특정 시스템에 HTTP 요청을 보내고, 그 결과를 처리합니다.
 * @param {Object} package - 크론 작업 실행에 필요한 객체들을 포함한 패키지입니다.
 * @param {Object} package.mother - Mother 클래스의 인스턴스입니다. 유틸리티 메서드와 시스템 함수들을 포함합니다.
 * @param {Object} package.address - 주소 정보 객체입니다.
 * @param {Object} package.back - BackMaker 클래스의 인스턴스입니다.
 * @param {Object} package.mongo - MongoDB 클라이언트 객체입니다.
 * @param {Object} package.mongolocal - 로컬 MongoDB 클라이언트 객체입니다.
 * @returns {Promise<boolean>} 작업 성공 여부를 나타내는 boolean 값을 반환합니다.
 */
const worker = async function (package) {
  /**
   * package 객체에서 필요한 요소들을 비구조화 할당으로 추출합니다.
   * @type {Object}
   */
  const { mother, address, back, mongo, mongolocal } = package;

  /**
   * Mother 클래스에서 제공하는 requestSystem, errorLog, emergencyAlarm 메서드를 추출합니다.
   * 이 메서드들은 각각 시스템 요청, 오류 로깅, 비상 알람을 처리합니다.
   * @type {Function}
   */
  const { requestSystem, errorLog, emergencyAlarm } = mother;

  try {
    /**
     * requestSystem 메서드를 사용하여 특정 URL에 HTTP POST 요청을 보냅니다.
     * - 이 요청은 특정 작업을 수행하는데 사용되며, 요청이 성공하면 true를 반환합니다.
     * - URL: address 객체의 secondinfo.host에 정의된 호스트와 포트 3003을 사용합니다.
     * - 엔드포인트: /noticeAspirantOnBoarding
     * - 요청 본문: { data: null }
     * - 요청 헤더: Content-Type을 application/json으로 설정합니다.
     * @returns {Promise<boolean>} 요청이 성공하면 true를 반환합니다.
     */
    await requestSystem("https://" + address.secondinfo.host + ":3003/noticeAspirantOnBoarding", { data: null }, { headers: { "Content-Type": "application/json" } });
    return true;
  } catch (e) {
    /**
     * 요청이 실패하면 catch 블록에서 예외를 처리합니다.
     * emergencyAlarm 메서드를 사용하여 비상 알람을 트리거하고, 오류 메시지를 로깅합니다.
     * - 오류 메시지: "aspirant onboarding error : " + e.message
     * @returns {Promise<boolean>} 요청이 실패하면 false를 반환합니다.
     */
    await emergencyAlarm("aspirant onboarding error : " + e.message);
    return false;
  }
}

/**
 * module.exports를 사용하여 dayId, hourId, worker를 외부에서 사용할 수 있도록 내보냅니다.
 * 다른 모듈에서 이 worker를 불러와 크론 작업을 설정할 수 있습니다.
 */
module.exports = { dayId, hourId, worker };