/**
 * 이 worker는 특정 dayId에 해당하는 크론 작업을 정의하고 있습니다.
 * 이 worker는 지정된 날짜에 실행되어야 하는 작업을 수행합니다.
 */

/**
 * dayId 배열은 이 worker가 실행되어야 하는 특정 날짜의 ID를 저장합니다.
 * 각 ID는 날짜별로 실행될 작업을 구분하는 데 사용됩니다.
 * @type {Array<string>}
 */
const dayId = [
  "d092", // 'd092'는 매일 오전 9시 20분에 실행되어야 함을 나타냅니다.
  "d131", // 'd131'은 매일 오후 1시 10분에 실행되어야 함을 나타냅니다.
];

/**
 * hourId 배열은 이 worker가 실행되어야 하는 특정 시간의 ID를 저장합니다.
 * 현재 이 worker는 특정 시간에 실행되지 않으므로, 이 배열은 비어 있습니다.
 * @type {Array<string>}
 */
const hourId = [];

/**
 * worker 함수는 이 크론 작업이 실행될 때 수행되는 주요 작업을 정의합니다.
 * 이 함수는 비동기로 실행되며, 지정된 서버에 HTTP 요청을 보내고 그 결과를 처리합니다.
 * @param {Object} package - 크론 작업 실행에 필요한 객체들을 포함한 패키지입니다.
 * @param {Object} package.mother - Mother 클래스의 인스턴스입니다. 유틸리티 메서드와 시스템 함수들을 포함합니다.
 * @param {Object} package.address - 서버 주소 정보 객체입니다.
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
   * Mother 클래스에서 제공하는 messageLog, errorLog, requestSystem, emergencyAlarm 메서드를 추출합니다.
   * 이 메서드들은 각각 메시지 로깅, 오류 로깅, 시스템 요청, 비상 알람을 처리하는 데 사용됩니다.
   * @type {Function}
   */
  const { messageLog, errorLog, requestSystem, emergencyAlarm } = mother;

  try {
    /**
     * requestSystem 메서드를 사용하여 특정 URL에 HTTP POST 요청을 보냅니다.
     * 이 요청은 'analyticsToday' 작업을 처리하기 위한 것입니다.
     * - URL: address 객체의 officeinfo.ghost.host에 정의된 호스트를 사용합니다.
     * - 엔드포인트: /analyticsToday
     * - 요청 본문: { report: 1 } - 요청에 포함될 보고서 데이터를 전송합니다.
     * - 요청 헤더: Content-Type을 application/json으로 설정하여 JSON 형식의 데이터를 주고받음을 명시합니다.
     * @returns {Promise<void>}
     */
    await requestSystem("https://" + address.officeinfo.ghost.host + "/analyticsToday", { report: 1 }, { headers: { "Content-Type": "application/json" } });

    /**
     * 작업이 성공적으로 완료된 경우, errorLog 메서드를 호출하여 완료 메시지를 로깅합니다.
     * - 로그 메시지: "marketing reporting done" - 마케팅 보고서 작업이 완료되었음을 알립니다.
     * @returns {Promise<boolean>} 작업이 성공적으로 완료되었음을 나타내는 true 값을 반환합니다.
     */
    await errorLog("marketing reporting done");
    return true;
  } catch (e) {
    /**
     * 요청이 실패한 경우, catch 블록에서 예외를 처리합니다.
     * emergencyAlarm 메서드를 사용하여 비상 알람을 트리거하고, 오류 메시지를 로깅합니다.
     * - 오류 메시지: "marketing reporting error : " + e.message - 발생한 오류의 메시지를 포함합니다.
     * @returns {Promise<boolean>} 요청이 실패하면 false 값을 반환합니다.
     */
    await emergencyAlarm("marketing reporting error : " + e.message);
    return false;
  }
}

/**
 * module.exports를 사용하여 dayId, hourId, worker를 외부에서 사용할 수 있도록 내보냅니다.
 * 다른 모듈에서 이 worker를 불러와 크론 작업을 설정할 수 있게 합니다.
 */
module.exports = { dayId, hourId, worker };