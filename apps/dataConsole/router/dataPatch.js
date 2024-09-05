/**
 * @class DataPatch
 * @description 다양한 날짜 형식을 표준 형식으로 변환하는 역할을 담당하는 클래스입니다.
 */
const DataPatch = function () {}

/**
 * 주어진 날짜 문자열을 다양한 형식에서 표준 형식(YYYY-MM-DD)으로 변환하는 함수입니다.
 * 이 함수는 다양한 날짜 형식을 처리하여 표준화된 형식으로 변환합니다.
 * 
 * @function toolsDateFilter
 * @param {string} value - 변환할 날짜 문자열. 다양한 형식이 입력될 수 있습니다.
 * @returns {string} - 변환된 YYYY-MM-DD 형식의 문자열을 반환합니다.
 */
DataPatch.toolsDateFilter = function (value) {
  let filteredValue, temp, tempArr, today;

  // "YY-MM-DD" 형식의 날짜를 "20YY-MM-DD"로 변환합니다.
  if (/^[0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]/g.test(value)) {
    filteredValue = "20" + value;

  // "YY-M-DD" 형식의 날짜를 처리하여 "MM" 형식을 맞춥니다.
  } else if (/^[0-9][0-9]\-[0-9]\-[0-9][0-9]/g.test(value)) {
    tempArr = value.split("-");
    filteredValue = "20" + tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];

  // "YY-MM-D" 형식을 처리하여 "DD" 형식을 맞춥니다.
  } else if (/^[0-9][0-9]\-[0-9][0-9]\-[0-9]$/.test(value)) {
    tempArr = value.split("-");
    filteredValue = "20" + tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];

  // "YY-M-D" 형식을 처리하여 "MM"과 "DD" 형식을 맞춥니다.
  } else if (/^[0-9][0-9]\-[0-9]\-[0-9]$/.test(value)) {
    tempArr = value.split("-");
    filteredValue = "20" + tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];

  // "YYYY-M-DD" 형식을 처리하여 "MM" 형식을 맞춥니다.
  } else if (/^[0-9][0-9][0-9][0-9]\-[0-9]\-[0-9][0-9]/g.test(value)) {
    tempArr = value.split("-");
    filteredValue = tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];

  // "YYYY-MM-D" 형식을 처리하여 "DD" 형식을 맞춥니다.
  } else if (/^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9]$/.test(value)) {
    tempArr = value.split("-");
    filteredValue = tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];

  // "YYYY-M-D" 형식을 처리하여 "MM"과 "DD" 형식을 맞춥니다.
  } else if (/^[0-9][0-9][0-9][0-9]\-[0-9]\-[0-9]$/.test(value)) {
    tempArr = value.split("-");
    filteredValue = tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];

  // "YYYY.MM.DD" 형식의 날짜에서 "."를 "-"로 변경하여 변환합니다.
  } else if (/^[0-9][0-9][0-9][0-9]\.[0-9][0-9]\.[0-9][0-9]/g.test(value)) {
    tempArr = value.split(".");
    filteredValue = tempArr[0] + '-' + tempArr[1] + '-' + tempArr[2];

  // "YY.MM.DD" 형식을 처리하여 "20YY-MM-DD" 형식으로 변환합니다.
  } else if (/^[0-9][0-9]\.[0-9][0-9]\.[0-9][0-9]/g.test(value)) {
    tempArr = value.split(".");
    filteredValue = "20" + tempArr[0] + '-' + tempArr[1] + '-' + tempArr[2];

  // "YY.M.DD" 형식을 처리하여 "MM" 형식을 맞춥니다.
  } else if (/^[0-9][0-9]\.[0-9]\.[0-9][0-9]/g.test(value)) {
    tempArr = value.split(".");
    filteredValue = "20" + tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];

  // "YY.MM.D" 형식을 처리하여 "DD" 형식을 맞춥니다.
  } else if (/^[0-9][0-9]\.[0-9][0-9]\.[0-9]$/.test(value)) {
    tempArr = value.split(".");
    filteredValue = "20" + tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];

  // "YY.M.D" 형식을 처리하여 "MM"과 "DD" 형식을 맞춥니다.
  } else if (/^[0-9][0-9]\.[0-9]\.[0-9]$/.test(value)) {
    tempArr = value.split(".");
    filteredValue = "20" + tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];

  // "YYYY.M.DD" 형식을 처리하여 "MM" 형식을 맞춥니다.
  } else if (/^[0-9][0-9][0-9][0-9]\.[0-9]\.[0-9][0-9]/g.test(value)) {
    tempArr = value.split(".");
    filteredValue = tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];

  // "YYYY.MM.D" 형식을 처리하여 "DD" 형식을 맞춥니다.
  } else if (/^[0-9][0-9][0-9][0-9]\.[0-9][0-9]\.[0-9]$/.test(value)) {
    tempArr = value.split(".");
    filteredValue = tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];

  // "YYYY.M.D" 형식을 처리하여 "MM"과 "DD" 형식을 맞춥니다.
  } else if (/^[0-9][0-9][0-9][0-9]\.[0-9]\.[0-9]$/.test(value)) {
    tempArr = value.split(".");
    filteredValue = tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];

  // 날짜 형식이 "YYYY/MM/DD" 인 경우 "/"를 "-"로 변환합니다.
  } else if (/^[0-9][0-9][0-9][0-9]\/[0-9][0-9]\/[0-9][0-9]/g.test(value)) {
    tempArr = value.split("/");
    filteredValue = tempArr[0] + '-' + tempArr[1] + '-' + tempArr[2];

  // "YY/MM/DD" 형식을 처리하여 "20YY-MM-DD" 형식으로 변환합니다.
  } else if (/^[0-9][0-9]\/[0-9][0-9]\/[0-9][0-9]/g.test(value)) {
    tempArr = value.split("/");
    filteredValue = "20" + tempArr[0] + '-' + tempArr[1] + '-' + tempArr[2];

  // "YY/M/DD" 형식을 처리하여 "MM" 형식을 맞춥니다.
  } else if (/^[0-9][0-9]\/[0-9]\/[0-9][0-9]/g.test(value)) {
    tempArr = value.split("/");
    filteredValue = "20" + tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];

  // "YY/MM/D" 형식을 처리하여 "DD" 형식을 맞춥니다.
  } else if (/^[0-9][0-9]\/[0-9][0-9]\/[0-9]$/.test(value)) {
    tempArr = value.split("/");
    filteredValue = "20" + tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];

  // "YY/M/D" 형식을 처리하여 "MM"과 "DD" 형식을 맞춥니다.
  } else if (/^[0-9][0-9]\/[0-9]\/[0-9]$/.test(value)) {
    tempArr = value.split("/");
    filteredValue = "20" + tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];

  // "YYYY/M/DD" 형식을 처리하여 "MM" 형식을 맞춥니다.
  } else if (/^[0-9][0-9][0-9][0-9]\/[0-9]\/[0-9][0-9]/g.test(value)) {
    tempArr = value.split("/");
    filteredValue = tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];

  // "YYYY/MM/D" 형식을 처리하여 "DD" 형식을 맞춥니다.
  } else if (/^[0-9][0-9][0-9][0-9]\/[0-9][0-9]\/[0-9]$/.test(value)) {
    tempArr = value.split("/");
    filteredValue = tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];

  // "YYYY/M/D" 형식을 처리하여 "MM"과 "DD" 형식을 맞춥니다.
  } else if (/^[0-9][0-9][0-9][0-9]\/[0-9]\/[0-9]$/.test(value)) {
    tempArr = value.split("/");
    filteredValue = tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];

  // "YYYY MM DD" 형식의 날짜를 "-"로 변환하여 표준화된 형식으로 변환합니다.
  } else if (/^[0-9][0-9][0-9][0-9] [0-9][0-9] [0-9][0-9]/g.test(value)) {
    tempArr = value.split(" ");
    filteredValue = tempArr[0] + '-' + tempArr[1] + '-' + tempArr[2];

  // "YY MM DD" 형식을 "20YY-MM-DD" 형식으로 변환합니다.
  } else if (/^[0-9][0-9] [0-9][0-9] [0-9][0-9]/g.test(value)) {
    tempArr = value.split(" ");
    filteredValue = "20" + tempArr[0] + '-' + tempArr[1] + '-' + tempArr[2];

  // "YY M DD" 형식을 처리하여 "MM" 형식을 맞춥니다.
  } else if (/^[0-9][0-9] [0-9] [0-9][0-9]/g.test(value)) {
    tempArr = value.split(" ");
    filteredValue = "20" + tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];

  // "YY MM D" 형식을 처리하여 "DD" 형식을 맞춥니다.
  } else if (/^[0-9][0-9] [0-9][0-9] [0-9]$/.test(value)) {
    tempArr = value.split(" ");
    filteredValue = "20" + tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];

  // "YY M D" 형식을 처리하여 "MM"과 "DD" 형식을 맞춥니다.
  } else if (/^[0-9][0-9] [0-9] [0-9]$/.test(value)) {
    tempArr = value.split(" ");
    filteredValue = "20" + tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];

  // 날짜가 "MM-DD" 형식인 경우 현재 연도를 추가하여 "YYYY-MM-DD" 형식으로 변환합니다.
  } else if (/^[0-9][0-9]\-[0-9][0-9]$/.test(value)) {
    today = new Date();
    temp = String(today.getFullYear());
    tempArr = value.split("-");
    filteredValue = temp + '-' + tempArr[0] + '-' + tempArr[1];

  // "M-DD" 형식을 처리하여 "MM" 형식을 맞추고 현재 연도를 추가합니다.
  } else if (/^[0-9]\-[0-9][0-9]$/.test(value)) {
    today = new Date();
    temp = String(today.getFullYear());
    tempArr = value.split("-");
    filteredValue = temp + '-' + '0' + tempArr[0] + '-' + tempArr[1];

  // "MM-D" 형식을 처리하여 "DD" 형식을 맞추고 현재 연도를 추가합니다.
  } else if (/^[0-9][0-9]\-[0-9]$/.test(value)) {
    today = new Date();
    temp = String(today.getFullYear());
    tempArr = value.split("-");
    filteredValue = temp + '-' + tempArr[0] + '-' + '0' + tempArr[1];

  // "M-D" 형식을 처리하여 "MM"과 "DD" 형식을 맞추고 현재 연도를 추가합니다.
  } else if (/^[0-9]\-[0-9]$/.test(value)) {
    today = new Date();
    temp = String(today.getFullYear());
    tempArr = value.split("-");
    filteredValue = temp + '-' + '0' + tempArr[0] + '-' + '0' + tempArr[1];

  // "MM.DD" 형식을 처리하여 현재 연도를 추가하고 "-"로 변환합니다.
  } else if (/^[0-9][0-9]\.[0-9][0-9]$/.test(value)) {
    today = new Date();
    temp = String(today.getFullYear());
    tempArr = value.split(".");
    filteredValue = temp + '-' + tempArr[0] + '-' + tempArr[1];

  // "M.DD" 형식을 처리하여 "MM" 형식을 맞추고 현재 연도를 추가합니다.
  } else if (/^[0-9]\.[0-9][0-9]$/.test(value)) {
    today = new Date();
    temp = String(today.getFullYear());
    tempArr = value.split(".");
    filteredValue = temp + '-' + '0' + tempArr[0] + '-' + tempArr[1];

  // "MM.D" 형식을 처리하여 "DD" 형식을 맞추고 현재 연도를 추가합니다.
  } else if (/^[0-9][0-9]\.[0-9]$/.test(value)) {
    today = new Date();
    temp = String(today.getFullYear());
    tempArr = value.split(".");
    filteredValue = temp + '-' + tempArr[0] + '-' + '0' + tempArr[1];

  // "M.D" 형식을 처리하여 "MM"과 "DD" 형식을 맞추고 현재 연도를 추가합니다.
  } else if (/^[0-9]\.[0-9]$/.test(value)) {
    today = new Date();
    temp = String(today.getFullYear());
    tempArr = value.split(".");
    filteredValue = temp + '-' + '0' + tempArr[0] + '-' + '0' + tempArr[1];

  // "MM/DD" 형식을 처리하여 "/"를 "-"로 변환하고 현재 연도를 추가합니다.
  } else if (/^[0-9][0-9]\/[0-9][0-9]$/.test(value)) {
    today = new Date();
    temp = String(today.getFullYear());
    tempArr = value.split("/");
    filteredValue = temp + '-' + tempArr[0] + '-' + tempArr[1];

  // "M/DD" 형식을 처리하여 "MM" 형식을 맞추고 현재 연도를 추가합니다.
  } else if (/^[0-9]\/[0-9][0-9]$/.test(value)) {
    today = new Date();
    temp = String(today.getFullYear());
    tempArr = value.split("/");
    filteredValue = temp + '-' + '0' + tempArr[0] + '-' + tempArr[1];

  // "MM/D" 형식을 처리하여 "DD" 형식을 맞추고 현재 연도를 추가합니다.
  } else if (/^[0-9][0-9]\/[0-9]$/.test(value)) {
    today = new Date();
    temp = String(today.getFullYear());
    tempArr = value.split("/");
    filteredValue = temp + '-' + tempArr[0] + '-' + '0' + tempArr[1];

  // "M/D" 형식을 처리하여 "MM"과 "DD" 형식을 맞추고 현재 연도를 추가합니다.
  } else if (/^[0-9]\/[0-9]$/.test(value)) {
    today = new Date();
    temp = String(today.getFullYear());
    tempArr = value.split("/");
    filteredValue = temp + '-' + '0' + tempArr[0] + '-' + '0' + tempArr[1];

  // "MM DD" 형식을 처리하여 현재 연도를 추가하고 "-"로 변환합니다.
  } else if (/^[0-9][0-9] [0-9][0-9]$/.test(value)) {
    today = new Date();
    temp = String(today.getFullYear());
    tempArr = value.split(" ");
    filteredValue = temp + '-' + tempArr[0] + '-' + tempArr[1];

  // "M DD" 형식을 처리하여 "MM" 형식을 맞추고 현재 연도를 추가합니다.
  } else if (/^[0-9] [0-9][0-9]$/.test(value)) {
    today = new Date();
    temp = String(today.getFullYear());
    tempArr = value.split(" ");
    filteredValue = temp + '-' + '0' + tempArr[0] + '-' + tempArr[1];

  // "MM D" 형식을 처리하여 "DD" 형식을 맞추고 현재 연도를 추가합니다.
  } else if (/^[0-9][0-9] [0-9]$/.test(value)) {
    today = new Date();
    temp = String(today.getFullYear());
    tempArr = value.split(" ");
    filteredValue = temp + '-' + tempArr[0] + '-' + '0' + tempArr[1];

  // "M D" 형식을 처리하여 "MM"과 "DD" 형식을 맞추고 현재 연도를 추가합니다.
  } else if (/^[0-9] [0-9]$/.test(value)) {
    today = new Date();
    temp = String(today.getFullYear());
    tempArr = value.split(" ");
    filteredValue = temp + '-' + '0' + tempArr[0] + '-' + '0' + tempArr[1];

  // 값이 특정 문자, 공백 또는 알파벳으로만 구성된 경우 현재 날짜로 설정합니다.
  } else if (/^[ \/\.a-zA-Z]$/.test(value)) {
    today = new Date();
    filteredValue = String(today.getFullYear()) + '-' + ((today.getMonth() + 1 < 10) ? '0' + String(today.getMonth() + 1) : String(today.getMonth() + 1)) + '-' + ((today.getDate() < 10) ? '0' + String(today.getDate()) : String(today.getDate()));

  // 그 외의 경우, 값을 그대로 반환합니다.
  } else {
    filteredValue = value;
  }

  // 변환된 날짜 값을 반환합니다.
  return filteredValue;
}

/**
 * @function clientMap
 * @description 고객 데이터를 매핑하고 상태를 변환하는 함수입니다. 고객의 상태를 처리하고, 유효성 검사를 수행합니다.
 *              상태를 변환하여 반환하는 내부 유틸리티 함수 `statusToObject`를 포함합니다.
 */
DataPatch.prototype.clientMap = function () {
  
  /**
   * 주어진 상태 값을 확인하여 유효성을 검증하고, 기존 값과 비교해 최종 상태를 결정하는 함수입니다.
   * 
   * @function statusToObject
   * @param {string} value - 현재의 상태 값입니다.
   * @param {string} pastValue - 이전 상태 값입니다.
   * @param {boolean} vaildMode - 유효성 검사를 위한 모드입니다. true인 경우 검사를 수행합니다.
   * @returns {Object|String} - 유효성 검사가 true인 경우 boolean과 null을 반환하고, 그렇지 않으면 최종 상태 값을 반환합니다.
   */
  const statusToObject = function (value, pastValue, vaildMode) {
    // 유효성 검사 모드일 경우, boo 값을 반전시키고 null을 반환합니다.
    let boo = false;
    let finalValue;
    let targetArr;

    // 유효성 검사 모드가 활성화된 경우, 항상 false로 반환하고 null 값을 반환합니다.
    if (vaildMode) {
      return { boo: !boo, value: null };
    }

    // 처리할 상태 값 목록을 정의합니다. ('드랍', '진행', '응대중', '장기')
    targetArr = [ '드랍', '진행', '응대중', '장기' ];

    // 상태 값이 targetArr 배열에 포함되어 있으면 해당 값을 반환하고,
    // 그렇지 않으면 기존 상태 값(pastValue)을 유지합니다.
    if (targetArr.includes(value)) {
      finalValue = value;
    } else {
      finalValue = pastValue;
    }

    // 최종 상태 값을 반환합니다.
    return finalValue;
  };

  /**
   * @function managerToObject
   * @description 매니저의 상태를 처리하는 함수입니다. 주어진 값(value)을 기존 값과 비교하여 상태 값을 설정하고, 유효성 검사를 수행합니다.
   * @param {string} value - 현재 상태 값입니다.
   * @param {string} pastValue - 이전 상태 값입니다.
   * @param {boolean} vaildMode - 유효성 검사 모드입니다. true인 경우 유효성 검사를 수행합니다.
   * @returns {Object|string} - 유효성 검사가 true일 경우 객체를 반환하고, 그렇지 않으면 최종 상태 값을 반환합니다.
   */
  const managerToObject = function (value, pastValue, vaildMode) {
    // 유효성 검사 모드를 처리하기 위한 변수입니다. 기본값은 false로 설정됩니다.
    let boo = false;

    // 최종적으로 반환할 상태 값을 저장할 변수입니다.
    let finalValue;

    // CX 역할을 가진 멤버의 이름 목록을 저장할 배열입니다.
    let targetArr;

    // 유효성 검사 모드가 true인 경우, boolean 값을 반전시키고 null 값을 반환합니다.
    if (vaildMode) {
      return { boo: !boo, value: null };
    }

    // XMLHttpRequest가 사용 가능한 환경인 경우, CX 역할을 가진 멤버 목록을 가져옵니다.
    if (typeof globalThis.XMLHttpRequest === "function") {
      targetArr = GeneralJs.stacks.members
        .filter((obj) => { return obj.roles.includes("CX"); }) // CX 역할을 가진 멤버만 필터링
        .map((obj) => { return obj.name }); // 필터링된 멤버의 이름만 추출하여 배열로 저장
    } else {
      // XMLHttpRequest가 없으면 빈 배열을 설정합니다.
      targetArr = [];
    }

    // 현재 상태 값이 CX 멤버 목록에 포함되어 있으면 해당 값을 최종 상태 값으로 설정합니다.
    if (targetArr.includes(value)) {
      finalValue = value;
    } else {
      // 포함되지 않으면 기존 상태 값(pastValue)을 최종 상태 값으로 설정합니다.
      finalValue = pastValue;
    }

    // 최종 상태 값을 반환합니다.
    return finalValue;
  };

  /**
   * @function actionToObject
   * @description 주어진 액션 값을 처리하고 유효성 검사를 통해 결과를 반환하는 함수입니다.
   *              상태 값이 유효하면 해당 값을 반환하고, 유효성 검사 모드가 활성화된 경우 기본 결과를 반환합니다.
   * @param {string} value - 현재 액션 값입니다.
   * @param {string} pastValue - 이전 액션 값입니다.
   * @param {boolean} vaildMode - 유효성 검사 모드입니다. true인 경우 유효성 검사를 수행합니다.
   * @returns {Object|string} - 유효성 검사 모드가 true일 경우 객체를 반환하고, 그렇지 않으면 액션 값을 반환합니다.
   */
  const actionToObject = function (value, pastValue, vaildMode) {
    
    // 유효성 검사 모드가 활성화된 경우, boolean 값과 null을 반환합니다.
    if (vaildMode) {
      return { boo: true, value: null };  // 유효성 검사가 필요한 경우 항상 true와 null을 반환
    }

    // 유효성 검사가 필요하지 않은 경우, 주어진 값을 문자열로 변환하고 양쪽 공백을 제거한 값을 반환합니다.
    return String(value).trim();  // 입력된 액션 값을 문자열로 변환한 후 trim() 메서드를 사용하여 양쪽 공백을 제거한 결과를 반환
  };

  /**
   * @function callHistoryToObject
   * @description 콜 히스토리 데이터를 처리하여 날짜 목록을 반환하는 함수입니다.
   *              입력된 값을 유효성 검사한 후, 과거 값을 반영하여 최종적으로 날짜 객체 배열을 반환합니다.
   * @param {string} value - 현재 입력된 콜 히스토리 값입니다. 날짜 형식의 문자열로 들어옵니다.
   * @param {string} pastValue - 이전에 저장된 콜 히스토리 값입니다.
   * @param {boolean} vaildMode - 유효성 검사 모드입니다. true인 경우 유효성 검사를 수행합니다.
   * @returns {Array|Object} - 유효성 검사 모드일 경우 boolean과 값을 반환하며, 일반 모드에서는 날짜 객체 배열을 반환합니다.
   */
  const callHistoryToObject = function (value, pastValue, vaildMode) {
    let arr = [];  // 반환할 날짜 객체 배열
    let filteredValue;  // 필터링된 날짜 값
    let filteredArr = [];  // 필터링된 날짜 값들의 배열
    let obj;  // 날짜 객체를 저장할 변수
    let temp, temp2;
    let boo = false;  // 유효성 검사를 위한 변수, 기본값은 false

    // 입력된 값을 ', '로 구분하여 배열로 만듭니다.
    temp = value.split(", ");

    // 입력된 값 배열을 순회하면서 각 날짜 값을 필터링하고, 유효성 검사를 수행합니다.
    for (let i of temp) {
      filteredValue = DataPatch.toolsDateFilter(i);  // DataPatch의 toolsDateFilter 메서드를 사용하여 날짜를 필터링
      filteredArr.push(filteredValue);  // 필터링된 날짜 값을 배열에 추가
      // 필터링된 날짜 값이 유효한 날짜 형식인지 확인합니다.
      if (!/^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]/.test(filteredValue)) {
        boo = true;  // 유효하지 않은 경우 boo 값을 true로 설정
      }
    }

    // 유효성 검사 결과에 따라 처리된 값을 선택합니다.
    if (!boo) {
      temp = filteredArr;  // 유효한 경우 필터링된 값을 사용
    } else {
      temp = pastValue.split(", ");  // 유효하지 않은 경우 과거 값을 사용
    }

    // 유효성 검사 모드가 활성화된 경우, boolean 값과 함께 필터링된 값을 반환합니다.
    if (vaildMode) {
      return { boo: !boo, value: filteredArr.join(", ") };  // 유효성 검사가 통과되지 않은 경우 결과를 반환
    }

    // 첫 번째 값이 비어 있으면 빈 배열을 반환합니다.
    if (temp[0] === '') {
      return [];
    }

    // 배열을 역순으로 정렬합니다.
    temp.reverse();

    // 각 날짜 값을 날짜 객체로 변환하여 배열에 추가합니다.
    for (let i of temp) {
      temp2 = i.split("-");  // 날짜 문자열을 '-'로 분리
      obj = new Date(Number(temp2[0]), Number(temp2[1].replace(/^0/, '') - 1), Number(temp2[2].replace(/^0/, '')));  // Date 객체 생성
      arr.push({ date: obj, who: "" });  // 날짜 객체를 배열에 추가
    }

    // 최종 날짜 객체 배열을 반환합니다.
    return arr;
  };

  /**
   * @function serviceToObject
   * @description 서비스 이름을 해석하여 서비스 ID, 옵션, 온라인 여부 등을 객체로 변환하는 함수입니다.
   * @param {string} value - 현재 서비스 이름입니다.
   * @param {string} pastValue - 이전 서비스 이름입니다.
   * @param {boolean} vaildMode - 유효성 검사 모드입니다. true인 경우 유효성 검사를 수행합니다.
   * @returns {Object} - 서비스 정보가 포함된 객체를 반환합니다.
   */
  const serviceToObject = function (value, pastValue, vaildMode) {
    let obj;  // 서비스 정보 객체
    let temp;
    let boo = false;  // 유효성 검사를 위한 변수

    // 유효성 검사 모드가 활성화된 경우, 기본 값을 반환합니다.
    if (vaildMode) {
      return { boo: !boo, value: null };
    }

    // 서비스 정보를 저장할 객체를 초기화합니다.
    obj = {};

    // 서비스 이름에 따른 서비스 ID 설정
    if (/홈퍼/g.test(value)) {
      obj.serid = "s2011_aa01s";  // '홈퍼' 서비스 ID
    } else if (/홈스/g.test(value)) {
      obj.serid = "s2011_aa02s";  // '홈스' 서비스 ID
    } else if (/토탈/g.test(value)) {
      obj.serid = "s2011_aa03s";  // '토탈' 서비스 ID
    } else if (/설계/g.test(value)) {
      obj.serid = "s2011_aa04s";  // '설계' 서비스 ID
    }

    // 서비스 옵션(미니, 베이직, 프리미엄)을 설정합니다.
    if (/mini/gi.test(value)) {
      obj.xValue = 'M';  // 미니 옵션
    } else if (/basic/gi.test(value)) {
      obj.xValue = 'B';  // 베이직 옵션
    } else if (/premium/gi.test(value)) {
      obj.xValue = 'P';  // 프리미엄 옵션
    }

    // 온라인 서비스 여부를 설정합니다.
    if (/온라인/gi.test(value)) {
      obj.online = true;  // 온라인 서비스
    } else {
      obj.online = false;  // 오프라인 서비스
    }

    // 최종 서비스 정보 객체를 반환합니다.
    return obj;
  };

  /**
   * @function designerToObject
   * @description 디자이너 데이터를 처리하여 유효성을 검사하고, 디자이너 ID를 추출하는 함수입니다.
   *              입력된 디자이너 값이 유효한 형식인지 확인한 후, 해당 값을 반환합니다.
   * @param {string} value - 현재 입력된 디자이너 값입니다.
   * @param {string} pastValue - 이전 디자이너 값입니다.
   * @param {boolean} vaildMode - 유효성 검사 모드입니다. true인 경우 유효성 검사를 수행합니다.
   * @returns {Array|Object} - 유효성 검사 모드일 경우 객체를 반환하며, 그렇지 않으면 디자이너 ID 값을 반환합니다.
   */
  const designerToObject = function (value, pastValue, vaildMode) {
    let boo = false;  // 유효성 검사를 위한 변수, 기본값은 false
    let finalValueObj, finalValue;  // 최종적으로 반환할 디자이너 값과 객체

    // 유효성 검사 모드가 활성화된 경우, 기본 값을 반환합니다.
    if (vaildMode) {
      return { boo: !boo, value: null };
    }

    // 현재 입력된 값을 콘솔에 출력하여 디버깅에 사용합니다.
    console.log(value);

    // 정규 표현식을 사용하여 'dXXXX_aaXXa' 형식의 디자이너 ID를 추출합니다.
    finalValueObj = /d[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]/.exec(value);

    // 정규 표현식에 매칭되는 값이 없을 경우, 빈 문자열을 반환합니다.
    if (finalValueObj === null) {
      finalValue = "";  // 매칭되지 않으면 빈 값 설정
    } else {
      // 매칭되는 경우, 추출된 디자이너 ID 값을 finalValue에 저장합니다.
      finalValue = finalValueObj[0];
    }

    // 결과를 배열 형태로 반환합니다. (이 경우 빈 배열을 반환)
    return [];
  };

  /**
   * @function designerToString
   * @description 디자이너 ID 값을 기반으로 디자이너의 이름과 ID를 문자열로 변환하는 함수입니다.
   *              서버로부터 디자이너 정보를 비동기적으로 받아와 해당 디자이너의 이름과 ID를 반환합니다.
   * @param {string} value - 디자이너의 ID 값입니다. 공백을 제거한 후 서버에 전달됩니다.
   * @returns {Promise<string>} - 디자이너의 이름과 ID를 결합한 문자열을 반환합니다.
   */
  const designerToString = async function (value) {
    try {
      // 서버에 디자이너 ID를 사용해 디자이너 정보를 요청합니다.
      const designer = (await GeneralJs.ajaxJson({ noFlat: true, whereQuery: { desid: value.trim() } }, "/getDesigners"))[0];

      // 디자이너의 이름과 ID를 결합한 문자열을 반환합니다.
      return designer.designer + " " + designer.desid;
    } catch (e) {
      // 오류가 발생한 경우 콘솔에 오류 메시지를 출력합니다.
      console.log(e);
    }
  };

  /**
   * @function hahaToObject
   * @description 유효성 검사를 수행한 후 기본 값을 반환하는 함수입니다. 
   *              유효성 검사 모드가 활성화된 경우에는 고정된 값('-')을 반환합니다.
   * @param {string} value - 현재 입력된 값입니다.
   * @param {string} pastValue - 이전에 저장된 값입니다.
   * @param {boolean} vaildMode - 유효성 검사 모드입니다. true인 경우 유효성 검사를 수행합니다.
   * @returns {Object|string} - 유효성 검사 모드일 경우 객체를 반환하며, 그렇지 않으면 기본 값을 반환합니다.
   */
  const hahaToObject = function (value, pastValue, vaildMode) {
    // 유효성 검사 모드가 활성화된 경우, boolean 값과 null을 반환합니다.
    if (vaildMode) {
      return { boo: true, value: null };
    }
    
    // 기본 값 '-'을 반환합니다.
    return '-';
  };

  /**
   * @function naverToObject
   * @description 네이버 관련 데이터를 처리하는 함수입니다. 
   *              유효성 검사 모드일 경우 boolean 값과 값을 반환하고, 그렇지 않으면 입력 값을 그대로 반환합니다.
   * @param {string} value - 현재 입력된 값입니다.
   * @param {string} pastValue - 이전에 저장된 값입니다.
   * @param {boolean} vaildMode - 유효성 검사 모드입니다. true인 경우 유효성 검사를 수행합니다.
   * @returns {Object|string} - 유효성 검사 모드일 경우 객체를 반환하며, 일반 모드에서는 입력된 값을 반환합니다.
   */
  const naverToObject = function (value, pastValue, vaildMode) {
    let boo = false;  // 유효성 검사를 위한 변수, 기본값은 false

    // 유효성 검사 모드가 활성화된 경우, boolean 값과 입력된 값을 반환합니다.
    if (vaildMode) {
      return { boo: !boo, value };  // 유효성 검사 통과 여부에 따라 boolean 값을 반전하고, 입력된 값을 반환
    }

    // 유효성 검사가 필요하지 않은 경우, 입력된 값을 그대로 반환합니다.
    return value;
  };

  /**
   * @constant {Object} map
   * @description 이 객체는 고객 데이터 필드와 그 필드에 대한 메타데이터를 정의한 맵 객체입니다. 
   *              각 필드는 클라이언트 요청과 관련된 정보로, 검색 가능 여부(searchBoo), 필드의 데이터베이스 내 위치(position), 
   *              데이터 타입(type) 등을 정의합니다. 각 필드는 클라이언트 데이터의 조회 및 분석에 사용되며, 
   *              'objectFunction'과 같은 함수가 포함될 경우 해당 필드의 데이터를 가공하여 반환하는 역할을 합니다.
   */
  const map = {
    name: { name: "성함", position: "name", type: "string", searchBoo: true, },
    cliid: { name: "아이디", position: "cliid", type: "string", searchBoo: true, },
    phone: { name: "연락처", position: "phone", type: "string", searchBoo: true, },
    email: { name: "이메일", position: "email", type: "string", searchBoo: true, },
    timeline: { name: "문의일", position: "requests.0.request.timeline", type: "date", searchBoo: true, },
    budget: { name: "예산", position: "requests.0.request.budget", type: "string", items: [ '500만원 이하', '1,000만원', '1,500만원', '2,000만원', '2,500만원', '3,000만원', '3,500만원', '4,000만원', '4,500만원', '5,000만원 이상', '6,000만원 이상', '7,000만원 이상', '8,000만원 이상', '9,000만원 이상', '1억원 이상', '1억 5,000만원 이상', '2억원 이상', '3억원 이상', '5억원 이상', '10억원 이상', ], searchBoo: true, },
    family: { name: "가족 구성원", position: "requests.0.request.family", type: "string", searchBoo: true, },
    furniture: { name: "가구 구매", position: "requests.0.request.furniture", type: "string", items: [ "재배치", "일부 구매", "전체 구매" ], searchBoo: true, },
    address: { name: "주소", position: "requests.0.request.space.address", type: "string", address: true, searchBoo: true, },
    contract: { name: "계약 상태", position: "requests.0.request.space.contract", type: "string", items: [ "자가", "전월세" ], searchBoo: true, },
    pyeong: { name: "평수", position: "requests.0.request.space.pyeong", type: "number", searchBoo: true, },
    naver: { name: "네이버 부동산", position: "requests.0.request.space.naver", type: "object", objectFunction: naverToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: true, },
    room: { name: "방", position: "requests.0.request.space.spec.room", type: "number", searchBoo: false, },
    bathroom: { name: "화장실", position: "requests.0.request.space.spec.bathroom", type: "number", searchBoo: false, },
    valcony: { name: "발코니", position: "requests.0.request.space.spec.valcony", type: "boolean", items: [ "true", "false" ], searchBoo: false, },
    living: { name: "거주중", position: "requests.0.request.space.resident.living", type: "boolean", items: [ "true", "false" ], searchBoo: false, },
    comment: { name: "요청 사항", position: "requests.0.request.etc.comment", type: "string", searchBoo: false, },
    channel: { name: "유입 채널", position: "requests.0.request.etc.channel", type: "string", searchBoo: true, },
    status: { name: "상태", position: "requests.0.analytics.response.status", type: "object", items: [ "드랍", "진행", "응대중", "장기" ], objectFunction: statusToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: true, },
    action: { name: "응대", position: "requests.0.analytics.response.action", type: "object", items: [
      "1차 응대 예정",
      "1차 응대 후 대기",
      "스타일 체크 대기",
      "제안 발송 예정",
      "제안 피드백 예정",
      "피드백 부재중",
      "제안 피드백 완료",
      "부재중 알림 발송",
      "상세 설문 대기",
      "부재중 제안 발송",
      "피드백과 응대 예정",
      "자동 피드백 부재중",
      "피드백과 응대 완료",
      "디자이너 선택",
      "해당 없음"
    ], itemMap: [
      [
        "1차 응대",
        [
          [ "1차 응대 예정" ],
          [ "1차 응대 후 대기", "부재중 알림 발송" ],
          [ "스타일 체크 대기", "상세 설문 대기" ],
          [ "제안 발송 예정", "부재중 제안 발송" ],
          [ "제안 피드백 예정", "피드백과 응대 예정" ],
          [ "피드백 부재중", "자동 피드백 부재중" ],
          [ "제안 피드백 완료", "피드백과 응대 완료" ],
          [ "디자이너 선택" ],
          [ "해당 없음" ],
        ]
      ]
    ], divisionStart: 1, divisionLength: 6, objectFunction: actionToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: true, },
    outreason: { name: "유출 이유", position: "requests.0.analytics.response.outreason", type: "array", items: [
      "연결 안 됨",
      "가벼운 문의",
      "고객 미션 미응답",
      "직접 진행",
      "고객 상황 변동",
      "가족 의견 불일치",
      "기간 임박",
      "장기 고객",
      "시공만 필요",
      "거주중 시공",
      "일단 견적 먼저",
      "시공 문제",
      "서비스 불일치",
      "타사 계약",
      "지역 이슈",
      "총 예산 문제",
      "디자인비 문제",
      "프로세스 문제",
      "디자이너 부족",
      "제안서 매력도",
    ], multiple: true, searchBoo: true, },
    kakao: { name: "채널 등록", position: "requests.0.analytics.response.kakao", type: "boolean", items: [ "등록", "미등록" ], searchBoo: false, },
    service: { name: "예상 서비스", position: "requests.0.analytics.response.service", type: "object", objectFunction: serviceToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: true, },
    next: { name: "1차 응대", position: "requests.0.analytics.date.call.next", type: "date", searchBoo: false, yesNo: [ "Y", "N" ], },
    recommend: { name: "피드백 통화", position: "requests.0.analytics.date.call.recommend", type: "date", searchBoo: false, yesNo: [ "Y", "N" ], },
    callHistory: { name: "연락 기록", position: "requests.0.analytics.date.call.history", type: "object", objectFunction: callHistoryToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: false, },
    precheck: { name: "사전 점검일", position: "requests.0.analytics.date.space.precheck", type: "date", searchBoo: false, yesNo: [ "Y", "N" ], },
    empty: { name: "집 비는 날", position: "requests.0.analytics.date.space.empty", type: "date", searchBoo: false, yesNo: [ "Y", "N" ], },
    movein: { name: "예상 종료일", position: "requests.0.analytics.date.space.movein", type: "date", searchBoo: false, yesNo: [ "Y", "N" ], },
    expected: { name: "입주 예정일", position: "requests.0.request.space.resident.expected", type: "date", searchBoo: false, yesNo: [ "Y", "N" ], },
    spacePicture: { name: "사진", position: "requests.0.analytics.picture.space.boo", type: "boolean", items: [ "제출", "미제출" ], searchBoo: false },
    partialBoo: { name: "부분 여부", position: "requests.0.request.space.partial.boo", type: "boolean", items: [ "부분", "전체" ], searchBoo: false, },
    partialPyeong: { name: "부분 평수", position: "requests.0.request.space.partial.pyeong", type: "number", searchBoo: true, },
    partialDetail: { name: "부분 공간", position: "requests.0.request.space.partial.detail", type: "string", searchBoo: true, },
    designers: { name: "예상 디자이너", position: "requests.0.analytics.response.designers", type: "object", objectFunction: designerToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), stringFunction: designerToString.toString().replace(/\}$/, '').replace(/async function \(value\) \{/gi, ''), stringFunctionAsync: true, searchBoo: true, },
    manager: { name: "담당자", position: "null", type: "object", items: (typeof globalThis.XMLHttpRequest === "function") ? (GeneralJs.stacks.members.filter((obj) => { return obj.roles.includes("CX"); }).map((obj) => { return obj.name })) : [], objectFunction: managerToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: false },
    proposalSend: { name: "추천서 발송", position: "null", type: "constant", searchBoo: false },
    aboutSend: { name: "서비스 소개 발송", position: "null", type: "constant", searchBoo: false },
    pureSend: { name: "부재중 발송", position: "null", type: "constant", searchBoo: false },
    hahaSend: { name: "하하 발송", position: "null", type: "object", items: [ "하하 발송" ], objectFunction: hahaToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: false },
    proposalDesigners: { name: "추천한 디자이너", position: "null", type: "constant", searchBoo: false },
    possible: { name: "계약 가능성", position: "requests.0.analytics.response.possible", type: "string", items: [ "낮음", "애매", "높음" ], searchBoo: false },
    priority: { name: "우선 순위", position: "requests.0.analytics.response.priority", type: "string", items: [ "하", "중", "상" ], searchBoo: false },
    target: { name: "타겟 고객", position: "requests.0.analytics.response.target", type: "string", items: [ "타겟", "애매", "해당 없음" ], searchBoo: false },
    memo: { name: "응대 후 피드백", position: "requests.0.analytics.response.memo", type: "string", searchBoo: false },
    standardDate: { name: "기준일", position: "null", type: "constant", searchBoo: false },
    wantsService: { name: "희망 서비스", position: "null", type: "constant", searchBoo: false },
    selectConstruct: { name: "선택한 시공", position: "null", type: "constant", searchBoo: false },
    curationSelection: { name: "선택 상태", position: "null", type: "constant", searchBoo: false },
    curationReceive: { name: "추천서 상태", position: "null", type: "constant", searchBoo: false },
    curationImage: { name: "이미지 선택 상태", position: "null", type: "constant", searchBoo: false },
    curationBudget: { name: "예산", position: "null", type: "constant", searchBoo: false },
    curationFamily: { name: "가족 구성원", position: "null", type: "constant", searchBoo: false },
    curationAge: { name: "나이대", position: "null", type: "constant", searchBoo: false },
    curationConstruct: { name: "전체 철거 여부", position: "null", type: "constant", searchBoo: false },
    curationConstructEnvironment: { name: "시공 당일 환경", position: "null", type: "constant", searchBoo: false },
    curationConstructItems: { name: "선택한 시공 항목", position: "null", type: "constant", searchBoo: false },
    curationExpect: { name: "선택한 입주 예정", position: "null", type: "constant", searchBoo: false },
    curationFabric: { name: "생각하는 패브릭", position: "null", type: "constant", searchBoo: false },
    curationFurniture: { name: "생각하는 가구", position: "null", type: "constant", searchBoo: false },
    curationPurchase: { name: "가구 구매", position: "null", type: "constant", searchBoo: false },
    curationTime: { name: "희망 상담 시간", position: "null", type: "constant", searchBoo: false },
    curationService: { name: "선택한 서비스", position: "null", type: "constant", searchBoo: false },
  };
  return map;
}

/**
 * @function designerMap
 * @memberof DataPatch
 * @description 디자이너 데이터를 처리하여 클라이언트 정보에 매핑하는 함수입니다. 
 *              클라이언트 요청과 관련된 디자이너 데이터를 유효성 검사 및 변환하여 적절한 형식으로 저장합니다.
 *              이 함수는 데이터를 처리하면서 다양한 내부 유틸리티 메서드를 호출해 데이터를 가공합니다.
 */
DataPatch.prototype.designerMap = function () {
  /**
   * @function snsToObject
   * @description SNS 데이터를 처리하여 객체 배열로 변환하는 함수입니다. 
   *              입력된 SNS 정보를 파싱하여 'kind'와 'href'로 나눈 후 배열에 저장합니다.
   *              유효성 검사를 통해 올바른 형식의 값을 반환하며, 잘못된 형식일 경우 과거 데이터를 사용합니다.
   * @param {string} value - 현재 SNS 데이터입니다. 'kind href' 형식으로 입력됩니다.
   * @param {string} pastValue - 이전 SNS 데이터입니다. 유효성 검사에서 실패할 경우 사용할 이전 데이터입니다.
   * @param {boolean} vaildMode - 유효성 검사 모드입니다. true인 경우 유효성 검사를 수행합니다.
   * @returns {Array|Object} - 유효성 검사 모드일 경우 객체를 반환하며, 일반 모드에서는 SNS 객체 배열을 반환합니다.
   */
  const snsToObject = function (value, pastValue, vaildMode) {
    let arr = [];  // 반환할 SNS 객체 배열
    let obj;  // SNS 객체
    let temp, temp2;
    let boo = false;  // 유효성 검사를 위한 플래그

    // ' / '로 구분된 SNS 정보를 분리하여 처리합니다.
    if (/ \/ /g.test(value)) {
      temp = value.split(" / ");
      for (let i of temp) {
        temp2 = i.split(" ");  // 'kind href' 형식으로 나눈 배열
        if (temp2.length !== 2) {  // 잘못된 형식일 경우 유효성 검사 실패
          boo = true;
        }
      }
    } else {
      temp2 = value.split(" ");  // ' / ' 없이 입력된 경우에도 분리
      if (temp2.length !== 2) {  // 잘못된 형식일 경우 유효성 검사 실패
        boo = true;
      }
    }

    // 값이 비어있는 경우 유효성 검사를 통과시킵니다.
    if (value === '') {
      boo = false;
    }

    // 유효성 검사가 통과되지 않은 경우 이전 값을 사용합니다.
    if (!boo) {
      temp = value.split(" / ");  // 유효한 값
    } else {
      temp = pastValue.split(" / ");  // 유효하지 않으면 과거 값 사용
    }

    // 유효성 검사 모드가 활성화된 경우, 결과와 함께 반환합니다.
    if (vaildMode) {
      return { boo: !boo, value: null };
    }

    // 값이 비어있으면 빈 배열을 반환합니다.
    if (value === '' || temp[0] === '') {
      return [];
    }

    // 'kind href' 형식으로 객체를 생성하여 배열에 추가합니다.
    for (let i of temp) {
      obj = {};
      temp2 = i.split(" ");
      obj.kind = temp2[0];  // SNS 종류 ('kind')
      obj.href = temp2[1];  // SNS 링크 ('href')
      arr.push(obj);  // 객체를 배열에 추가
    }

    // 최종 SNS 객체 배열을 반환합니다.
    return arr;
  };

  /**
   * @function careerToObject
   * @description 경력 데이터를 처리하여 연도와 월을 추출해 객체로 반환하는 함수입니다.
   *              입력된 문자열을 '년'과 '월'로 구분하여 연도와 월을 추출한 뒤, 유효성을 검사하여 반환합니다.
   *              유효하지 않은 값이 입력될 경우 과거 값을 사용하거나 오류를 발생시킵니다.
   * @param {string} value - 현재 입력된 경력 값입니다. 예: "2022년 3월"
   * @param {string} pastValue - 유효성 검사를 통과하지 못할 경우 사용할 이전 경력 값입니다.
   * @param {boolean} vaildMode - 유효성 검사 모드입니다. true인 경우 유효성 검사를 수행합니다.
   * @returns {Object} 경력 정보를 담은 객체로 반환됩니다. { startY: 시작 연도, startM: 시작 월 }
   * @throws {Error} 유효하지 않은 값이 입력되었을 때 오류를 던집니다.
   */
  const careerToObject = function (value, pastValue, vaildMode) {
    let obj = {};  // 결과를 저장할 객체
    let boo = false;  // 유효성 검사를 위한 플래그
    let temp;  // 임시로 값을 저장할 배열

    // 입력된 값이 '년 월' 형식으로 정확히 2개의 항목으로 분리되는지 확인
    if (value.split(' ').length === 2) {
      boo = false;  // 유효한 형식일 경우
    } else {
      boo = true;  // 유효하지 않은 형식일 경우
    }

    // 유효하지 않은 경우 이전 값으로 대체
    if (!boo) {
      temp = value.split(' ');  // 유효한 경우 입력된 값을 분리
    } else {
      temp = pastValue.split(' ');  // 유효하지 않으면 과거 값으로 분리
    }

    // 유효성 검사 모드일 경우 결과를 반환
    if (vaildMode) {
      return { boo: !boo, value: null };
    }

    // 값이 비어있을 경우 오류 발생
    if (temp[0] === '') {
      throw new Error("유효하지 않은 값입니다.");  // 유효하지 않은 값일 경우 오류 던짐
    }

    // 시작 연도와 월을 추출하여 숫자로 변환
    obj.startY = Number(temp[0].replace(/년/g, '').replace(/[^0-9\.\-]/g, ''));  // '년'을 제거하고 숫자로 변환
    obj.startM = Number(temp[1].replace(/월/g, '').replace(/[^0-9\.\-]/g, ''));  // '월'을 제거하고 숫자로 변환

    // 연도 또는 월이 숫자가 아닌 경우 유효성 검사 실패
    if (Number.isNaN(obj.startY) || Number.isNaN(obj.startM)) {
      boo = true;
    }

    // 유효하지 않은 경우 과거 값을 다시 사용
    obj = {};  // 객체 초기화
    if (!boo) {
      temp = value.split(' ');  // 유효한 경우 현재 값을 다시 사용
    } else {
      temp = pastValue.split(' ');  // 유효하지 않으면 과거 값을 사용
    }

    // 다시 연도와 월을 추출하여 객체에 저장
    obj.startY = Number(temp[0].replace(/년/g, '').replace(/[^0-9\.\-]/g, ''));
    obj.startM = Number(temp[1].replace(/월/g, '').replace(/[^0-9\.\-]/g, ''));

    // 최종적으로 경력 데이터를 담은 객체 반환
    return obj;
  };

  /**
   * @function accountToObject
   * @description 계좌 정보를 처리하여 객체 배열로 변환하는 함수입니다. 
   *              입력된 계좌 정보를 '은행명 계좌번호 소유자' 형식으로 분리하여 각 항목을 객체로 저장하고, 유효성 검사를 통해 올바른 형식으로 변환합니다.
   *              유효하지 않은 데이터가 입력될 경우 과거 값을 사용하여 처리합니다.
   * @param {string} value - 현재 입력된 계좌 정보입니다. 예: "국민은행 123456789 홍길동"
   * @param {string} pastValue - 유효성 검사를 통과하지 못할 경우 사용할 이전 계좌 정보입니다.
   * @param {boolean} vaildMode - 유효성 검사 모드입니다. true인 경우 유효성 검사를 수행합니다.
   * @returns {Array|Object} - 유효성 검사 모드일 경우 boolean 값과 null을 반환하며, 그렇지 않으면 계좌 정보가 담긴 객체 배열을 반환합니다.
   */
  const accountToObject = function (value, pastValue, vaildMode) {
    let arr = [];  // 결과로 반환할 계좌 정보 객체 배열
    let obj;  // 계좌 정보를 담을 임시 객체
    let temp, temp2;  // 임시로 데이터를 저장할 변수들
    let boo = false;  // 유효성 검사를 위한 플래그

    // 입력된 값이 여러 계좌일 경우 ' / '로 분리하여 각각의 계좌를 처리
    if (/ \/ /g.test(value)) {
      temp = value.split(" / ");
      // 각 계좌를 '은행명 계좌번호 소유자' 형식으로 나누고 유효성 검사
      for (let i of temp) {
        temp2 = i.split(" ");
        if (temp2.length !== 3) {  // 계좌 정보가 3개의 요소(은행명, 계좌번호, 소유자)로 나누어지지 않으면 유효성 검사 실패
          boo = true;
        }
      }
    } else {
      // 계좌가 하나일 경우에도 동일하게 처리
      temp2 = value.split(" ");
      if (temp2.length !== 3) {  // 계좌 정보가 3개의 요소로 나누어지지 않으면 유효성 검사 실패
        boo = true;
      }
    }

    // 값이 비어 있는 경우 유효성 검사를 통과시킴
    if (value === '') {
      boo = false;
    }

    // 유효성 검사가 실패한 경우 과거 값으로 대체
    if (!boo) {
      temp = value.split(" / ");  // 유효한 경우 현재 값을 사용
    } else {
      temp = pastValue.split(" / ");  // 유효하지 않은 경우 과거 값을 사용
    }

    // 유효성 검사 모드일 경우 결과 반환
    if (vaildMode) {
      return { boo: !boo, value: null };
    }

    // 값이 비어 있거나 첫 번째 값이 비어 있으면 빈 배열 반환
    if (value === '' || temp[0] === '') {
      return [];
    }

    // 각 계좌 정보를 객체로 변환하여 배열에 추가
    for (let i of temp) {
      obj = {};
      temp2 = i.split(" ");  // 계좌 정보를 '은행명 계좌번호 소유자'로 분리
      obj.bankName = temp2[0];  // 은행명 저장
      obj.accountNumber = temp2[1];  // 계좌번호 저장
      obj.to = temp2[2];  // 소유자 이름 저장
      arr.push(obj);  // 결과 배열에 추가
    }

    // 최종적으로 계좌 정보 객체 배열 반환
    return arr;
  };

  /**
   * @function filesToObject
   * @description 파일 업로드 상태 데이터를 처리하여 객체로 변환하는 함수입니다.
   *              '사업자등록증', '통장사본', '등록카드'의 업로드 상태를 확인하고, 
   *              각 항목이 유효한지 검사한 뒤 그 결과를 객체로 반환합니다.
   * @param {string} value - 현재 파일 업로드 상태 데이터입니다. '유/무' 형식으로 입력됩니다. 예: "유 / 무 / 유"
   * @param {string} pastValue - 유효성 검사를 통과하지 못할 경우 사용할 이전 값입니다.
   * @param {boolean} vaildMode - 유효성 검사 모드입니다. true인 경우 유효성 검사를 수행합니다.
   * @returns {Object|boolean} - 유효성 검사 모드일 경우 객체를 반환하며, 일반 모드에서는 파일 업로드 상태가 담긴 객체를 반환합니다.
   * @throws {Error} 유효하지 않은 값이 입력되었을 때 오류를 던집니다.
   */
  const filesToObject = function (value, pastValue, vaildMode) {
    let obj;  // 결과로 반환할 객체
    let temp;  // 임시로 값을 저장할 배열
    let boo = false;  // 유효성 검사를 위한 플래그
    let target = [ "businessRegistration", "bankBook", "registrationCard" ];  // 각 파일 항목의 이름

    // 입력된 파일 상태를 ' / '로 분리하여 처리
    temp = value.split(" / ");
    
    // 파일 상태가 3개의 항목으로 나누어지지 않으면 유효성 검사 실패
    if (temp.length !== 3) {
      boo = true;  // 유효하지 않은 형식일 경우 유효성 검사 실패 플래그 설정
    }

    // 유효성 검사가 실패한 경우 과거 값으로 대체
    if (!boo) {
      temp = value.split(" / ");  // 유효한 경우 입력된 값을 분리
    } else {
      temp = pastValue.split(" / ");  // 유효하지 않으면 과거 값을 사용
    }

    // 유효성 검사 모드일 경우 결과를 반환
    if (vaildMode) {
      return { boo: !boo, value: null };
    }

    // 첫 번째 값이 비어있으면 오류 발생
    if (temp[0] === '') {
      throw new Error("유효하지 않은 값입니다.");  // 유효하지 않은 값일 경우 오류 던짐
    }

    // 결과 객체를 초기화
    obj = {};

    // 각 파일 상태를 확인하여 '유'가 있으면 true, '무'면 false로 변환
    for (let i = 0; i < target.length; i++) {
      obj[target[i]] = /유/gi.test(temp[i]) ? true : false;  // '유'가 있으면 true, 없으면 false
    }

    // 최종적으로 파일 업로드 상태 객체 반환
    return obj;
  };

  /**
   * @function statusToObject
   * @description 디자이너 상태 데이터를 처리하여 유효한 상태로 변환하는 함수입니다.
   *              주어진 상태 값이 미리 정의된 상태 목록에 포함되어 있는지 확인하고, 포함되어 있지 않은 경우 이전 값을 반환합니다.
   *              유효성 검사가 활성화된 경우, 유효성 검사를 통과하지 못하면 null을 반환합니다.
   * @param {string} value - 현재 입력된 상태 값입니다. 예: "협약 완료"
   * @param {string} pastValue - 유효성 검사를 통과하지 못할 경우 사용할 이전 상태 값입니다.
   * @param {boolean} vaildMode - 유효성 검사 모드입니다. true인 경우 유효성 검사를 수행합니다.
   * @returns {string|Object} - 유효성 검사 모드일 경우 유효성 검사 결과를 포함한 객체를 반환하며, 일반 모드에서는 최종 상태 값을 반환합니다.
   */
  const statusToObject = function (value, pastValue, vaildMode) {
    let boo = false;  // 유효성 검사를 위한 플래그
    let finalValue;  // 최종 반환할 상태 값
    let targetArr;  // 허용된 상태 값 목록

    // 유효성 검사 모드일 경우, 유효성 검사 결과와 함께 반환
    if (vaildMode) {
      return { boo: !boo, value: null };
    }

    // 허용된 상태 목록을 정의
    targetArr = [ "협약 완료", "협약 휴직", "협약 해지", "신청 대기", "컨택중" ];

    // 현재 상태 값이 허용된 목록에 포함되어 있는지 확인
    if (targetArr.includes(value)) {
      finalValue = value;  // 상태 값이 유효한 경우, 그대로 반환
    } else {
      finalValue = pastValue;  // 유효하지 않은 경우, 이전 상태 값을 반환
    }

    // 최종 상태 값을 반환
    return finalValue;
  };

  /**
   * @constant {Object} map
   * @description 디자이너 정보와 관련된 필드들을 정의한 맵 객체입니다. 
   *              각 필드는 디자이너의 다양한 정보를 포함하며, 클라이언트 요청 시 검색 가능 여부, 데이터베이스 내 위치, 
   *              데이터 타입 등을 정의하고 있습니다. 또한, 몇몇 필드는 추가적인 유효성 검사 및 변환을 위해 함수와 연결되어 있습니다.
   */
  const map = {
    designer: { name: "성함", position: "designer", type: "string", searchBoo: true, },
    desid: { name: "아이디", position: "desid", type: "string", searchBoo: true, },
    did: { name: "별칭", position: "information.did", type: "string", searchBoo: true, },
    status: { name: "계약 상태", position: "information.contract.status", type: "object", items: [ "협약 완료", "협약 휴직", "협약 해지", "신청 대기", "컨택중" ], objectFunction: statusToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: true, },
    date: { name: "계약일", position: "information.contract.date", type: "date", searchBoo: true, },
    phone: { name: "연락처", position: "information.phone", type: "string", searchBoo: true, },
    email: { name: "이메일", position: "information.email", type: "string", searchBoo: true, },
    address: { name: "주소", position: "information.address", type: "array", address: true, searchBoo: true, },
    showRoom: { name: "쇼룸", position: "information.personalSystem.showRoom", type: "boolean", items: [ "true", "false" ], searchBoo: true, },
    webPage: { name: "웹페이지", position: "information.personalSystem.webPage", type: "array", searchBoo: true, },
    sns: { name: "SNS", position: "information.personalSystem.sns", type: "object", objectFunction: snsToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: true, },
    career: { name: "경력", position: "information.business.career", type: "object", objectFunction: careerToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: true, },
    account: { name: "계좌번호", position: "information.business.account", type: "object", objectFunction: accountToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: true, },
    classification: { name: "사업자 분류", position: "information.business.businessInfo.classification", items: [ "법인사업자(일반)", "법인사업자(간이)", "개인사업자(일반)", "개인사업자(간이)", "프리랜서" ], type: "string", searchBoo: true, },
    businessNumber: { name: "사업자 등록번호", position: "information.business.businessInfo.businessNumber", type: "string", searchBoo: true, },
    files: { name: "파일 유무", position: "information.business.businessInfo.files", type: "object", objectFunction: filesToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: true, },
    percentage: { name: "수수료", position: "information.business.service.cost.percentage", type: "number", searchBoo: true, },
    partner: { name: "시공사", position: "information.business.service.construct.partner", type: "string", searchBoo: true, },
    method: { name: "시공 방식", position: "information.business.service.construct.method", type: "string", searchBoo: true, },
  };
  return map;
}

/**
 * @function projectMap
 * @memberof DataPatch
 * @description 프로젝트 데이터를 처리하여 매핑하는 함수입니다. 
 *              클라이언트 프로젝트 정보와 관련된 데이터를 유효성 검사 및 변환하여 매핑하는 역할을 합니다.
 *              이 함수는 프로젝트 데이터를 가공하고 필요에 따라 유효성 검사를 수행합니다.
 */
DataPatch.prototype.projectMap = function () {
  /**
   * @function accountToObject
   * @description 계좌 정보를 처리하여 객체로 변환하는 함수입니다. 
   *              '계좌번호', '수신자', '증빙' 정보를 포함하는 문자열을 파싱하여 해당 항목들을 객체로 변환합니다.
   *              유효성 검사를 수행하고, 유효하지 않으면 이전 값을 사용하거나 오류를 발생시킵니다.
   * @param {string} value - 현재 입력된 계좌 정보 문자열입니다. 예: "계좌번호 123-456-789 / 수신자 홍길동 / 증빙 전자문서"
   * @param {string} pastValue - 유효성 검사를 통과하지 못할 경우 사용할 이전 값입니다.
   * @param {boolean} vaildMode - 유효성 검사 모드입니다. true인 경우 유효성 검사를 수행합니다.
   * @returns {Object|boolean} - 유효성 검사 모드일 경우 유효성 검사 결과를 포함한 객체를 반환하며, 일반 모드에서는 계좌 정보를 담은 객체를 반환합니다.
   * @throws {Error} - 유효하지 않은 값이 입력되었을 때 오류를 던집니다.
   */
  const accountToObject = function (value, pastValue, vaildMode) {
    let obj;  // 결과로 반환할 객체
    let temp;  // 입력값을 분리하여 임시로 저장할 배열
    let boo = false;  // 유효성 검사를 위한 플래그

    // 입력값이 여러 계좌일 경우 ' / '로 구분하여 처리
    if (/ \/ /g.test(value)) {
      temp = value.split(" / ");  // ' / '로 구분된 값을 배열로 분리
      if (temp.length !== 3) {  // 배열의 길이가 3이 아닌 경우 유효성 검사 실패
        boo = true;
      }
    } else {
      boo = true;  // 유효하지 않으면 true 설정
    }

    // 유효성 검사에 통과한 경우
    if (!boo) {
      temp = value.split(" / ");
    } else {
      temp = pastValue.split(" / ");  // 유효하지 않으면 이전 값을 사용
    }

    // 유효성 검사 모드일 경우 결과 반환
    if (vaildMode) {
      return { boo: !boo, value: null };
    }

    // 첫 번째 값이 비어있으면 오류 발생
    if (temp[0] === '') {
      throw new Error("유효하지 않은 값입니다.");
    }

    // 최종적으로 변환된 객체를 생성하여 반환
    obj = {};
    obj.account = temp[0].replace(/^계좌번호/, '').trim();  // '계좌번호'를 제거하고 정리
    obj.to = temp[1].replace(/^수신자/, '').trim();  // '수신자'를 제거하고 정리
    obj.proof = temp[2].replace(/^증빙/, '').trim();  // '증빙'을 제거하고 정리

    return obj;  // 최종적으로 계좌 정보를 담은 객체 반환
  };

  /**
   * @function accountToString
   * @description 계좌 정보 객체를 문자열로 변환하는 함수입니다. 
   *              '계좌번호', '수신자', '증빙' 정보를 포함하는 객체를 다시 문자열 형식으로 변환하여 반환합니다.
   * @param {Object} value - 계좌 정보를 담고 있는 객체입니다. { account: '123-456-789', to: '홍길동', proof: '전자문서' }
   * @returns {string} - 변환된 계좌 정보 문자열. 예: "계좌번호 123-456-789 / 수신자 홍길동 / 증명 전자문서"
   */
  const accountToString = function (value) {
    return ("계좌번호 " + value.account + " / 수신자 " + value.to + " / 증명 " + value.proof);  // 객체의 각 항목을 문자열로 변환하여 반환
  };

  /**
   * @function methodToObject
   * @description 결제 방법 데이터를 처리하여 객체로 변환하는 함수입니다.
   *              '결제방법', '수신자', '증빙' 정보를 포함하는 문자열을 파싱하여 해당 항목들을 객체로 변환합니다.
   *              유효성 검사를 수행하고, 유효하지 않으면 이전 값을 사용하거나 오류를 발생시킵니다.
   * @param {string} value - 현재 입력된 결제 방법 정보 문자열입니다. 예: "결제방법 카드 / 수신자 홍길동 / 증빙 전자문서"
   * @param {string} pastValue - 유효성 검사를 통과하지 못할 경우 사용할 이전 값입니다.
   * @param {boolean} vaildMode - 유효성 검사 모드입니다. true인 경우 유효성 검사를 수행합니다.
   * @returns {Object|boolean} - 유효성 검사 모드일 경우 유효성 검사 결과를 포함한 객체를 반환하며, 일반 모드에서는 결제 방법 정보를 담은 객체를 반환합니다.
   * @throws {Error} - 유효하지 않은 값이 입력되었을 때 오류를 던집니다.
   */
  const methodToObject = function (value, pastValue, vaildMode) {
    let obj;  // 결과로 반환할 객체
    let temp;  // 입력값을 분리하여 임시로 저장할 배열
    let boo = false;  // 유효성 검사를 위한 플래그

    // 입력값이 여러 결제 방법일 경우 ' / '로 구분하여 처리
    if (/ \/ /g.test(value)) {
      temp = value.split(" / ");  // ' / '로 구분된 값을 배열로 분리
      if (temp.length !== 3) {  // 배열의 길이가 3이 아닌 경우 유효성 검사 실패
        boo = true;
      }
    } else {
      boo = true;  // 유효하지 않으면 true 설정
    }

    // 유효성 검사에 통과한 경우
    if (!boo) {
      temp = value.split(" / ");
    } else {
      temp = pastValue.split(" / ");  // 유효하지 않으면 이전 값을 사용
    }

    // 유효성 검사 모드일 경우 결과 반환
    if (vaildMode) {
      return { boo: !boo, value: null };
    }

    // 첫 번째 값이 비어있으면 오류 발생
    if (temp[0] === '') {
      throw new Error("유효하지 않은 값입니다.");
    }

    // 최종적으로 변환된 객체를 생성하여 반환
    obj = {};
    obj.method = temp[0].replace(/^결제방법/, '').trim();  // '결제방법'을 제거하고 정리
    obj.to = temp[1].replace(/^수신자/, '').trim();  // '수신자'를 제거하고 정리
    obj.proof = temp[2].replace(/^증빙/, '').trim();  // '증빙'을 제거하고 정리

    return obj;  // 최종적으로 결제 방법 정보를 담은 객체 반환
  };

  /**
   * @function serviceToObject
   * @description 서비스 종류 데이터를 처리하여 객체로 변환하는 함수입니다. 
   *              주어진 서비스 이름을 분석하고, 서비스 ID와 추가적인 옵션들을 객체 형태로 변환하여 반환합니다.
   *              '홈퍼', '홈스', '토탈', '설계' 서비스 종류와 함께 'mini', 'basic', 'premium' 등의 옵션을 처리합니다.
   *              또한, 온라인 서비스 여부도 처리하여 결과 객체에 포함됩니다.
   * @param {string} value - 현재 입력된 서비스 정보 문자열입니다. 예: "홈퍼 mini 온라인"
   * @param {string} pastValue - 유효성 검사를 통과하지 못할 경우 사용할 이전 값입니다.
   * @param {boolean} vaildMode - 유효성 검사 모드입니다. true인 경우 유효성 검사를 수행합니다.
   * @returns {Object} - 서비스 정보를 담은 객체를 반환합니다. { serid: 's2011_aa01s', xValue: 'M', online: true }
   */
  const serviceToObject = function (value, pastValue, vaildMode) {
    let obj;  // 결과로 반환할 객체
    let temp;  // 임시로 값을 저장할 변수
    let boo = false;  // 유효성 검사를 위한 플래그

    // 유효성 검사 모드일 경우 결과 반환
    if (vaildMode) {
      return { boo: !boo, value: null };
    }

    obj = {};  // 최종 결과 객체 초기화

    // 서비스 종류에 따라 서비스 ID를 설정
    if (/홈퍼/g.test(value)) {
      obj.serid = "s2011_aa01s";  // 홈퍼 서비스 ID
    } else if (/홈스/g.test(value)) {
      obj.serid = "s2011_aa02s";  // 홈스 서비스 ID
    } else if (/토탈/g.test(value)) {
      obj.serid = "s2011_aa03s";  // 토탈 서비스 ID
    } else if (/설계/g.test(value)) {
      obj.serid = "s2011_aa04s";  // 설계 서비스 ID
    }

    // 서비스 옵션에 따른 값 설정 ('mini', 'basic', 'premium')
    if (/mini/gi.test(value)) {
      obj.xValue = 'M';  // mini 옵션
    } else if (/basic/gi.test(value)) {
      obj.xValue = 'B';  // basic 옵션
    } else if (/premium/gi.test(value)) {
      obj.xValue = 'P';  // premium 옵션
    }

    // 온라인 서비스 여부 확인
    if (/온라인/gi.test(value)) {
      obj.online = true;  // 온라인 서비스
    } else {
      obj.online = false;  // 오프라인 서비스
    }

    // 최종적으로 변환된 서비스 정보 객체 반환
    return obj;
  };

  /**
   * @function serviceToString
   * @description 서비스 정보를 문자열로 변환하는 함수입니다. 
   *              서비스 객체에 포함된 온라인/오프라인 여부, 서비스 종류, 그리고 서비스 옵션을 문자열로 변환하여 반환합니다.
   *              서비스 ID에 따라 "홈퍼니싱", "홈스타일링", "토탈 스타일링", "설계 변경"과 같은 이름을 붙이며, 
   *              서비스 옵션에 따라 "mini", "basic", "premium"을 추가합니다.
   * @param {Object} value - 서비스 정보를 담고 있는 객체입니다. 
   *                         예: { serid: 's2011_aa01s', xValue: 'M', online: true }
   * @returns {string} - 변환된 서비스 정보 문자열을 반환합니다. 
   *                     예: "온라인 홈퍼니싱 mini"
   */
  const serviceToString = function (value) {
    let str;  // 최종적으로 반환할 문자열

    // 온라인 여부에 따라 문자열 시작
    if (value.online) {
      str = "온라인 ";  // 온라인 서비스일 경우
    } else {
      str = "오프라인 ";  // 오프라인 서비스일 경우
    }

    // 서비스 ID에 따라 서비스 이름 추가
    if (value.serid === "s2011_aa01s") {
      str += "홈퍼니싱 ";  // 홈퍼니싱 서비스
    } else if (value.serid === "s2011_aa02s") {
      str += "홈스타일링 ";  // 홈스타일링 서비스
    } else if (value.serid === "s2011_aa03s") {
      str += "토탈 스타일링 ";  // 토탈 스타일링 서비스
    } else if (value.serid === "s2011_aa04s") {
      str += "설계 변경 ";  // 설계 변경 서비스
    }

    // 서비스 옵션에 따라 추가 정보 추가
    if (value.xValue === 'M') {
      str += "mini";  // mini 옵션
    } else if (value.xValue === 'B') {
      str += "basic";  // basic 옵션
    } else if (value.xValue === 'P') {
      str += "premium";  // premium 옵션
    }

    return str;  // 최종적으로 변환된 문자열 반환
  };

  /**
   * @function designerToObject
   * @description 디자이너 ID를 처리하여 유효성을 검사하고, 유효한 ID를 반환하는 함수입니다.
   *              디자이너 ID 패턴을 확인한 후, 유효한 경우 해당 ID를 반환하며, 유효하지 않은 경우 빈 문자열을 반환합니다.
   * @param {string} value - 입력된 디자이너 ID 문자열입니다.
   * @param {string} pastValue - 유효성 검사를 통과하지 못할 경우 사용할 이전 값입니다.
   * @param {boolean} vaildMode - 유효성 검사 모드입니다. true인 경우 유효성 검사를 수행합니다.
   * @returns {string} - 유효한 디자이너 ID를 반환하거나, 유효하지 않은 경우 빈 문자열을 반환합니다.
   */
  const designerToObject = function (value, pastValue, vaildMode) {
    let boo = false;  // 유효성 검사 플래그
    let finalValueObj, finalValue;  // 결과로 반환할 값과 유효성 검사 객체

    // 유효성 검사 모드일 경우
    if (vaildMode) {
      return { boo: !boo, value: null };  // 검사 실패 시 false, null 반환
    }

    // 디자이너 ID 정규 표현식을 사용하여 값 추출
    finalValueObj = /d[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]/.exec(value);
    if (finalValueObj === null) {
      finalValue = "";  // 유효하지 않으면 빈 문자열 반환
    } else {
      finalValue = finalValueObj[0];  // 유효한 경우 ID 값 반환
    }

    return finalValue;  // 최종 디자이너 ID 반환
  };

  /**
   * @async
   * @function designerToString
   * @description 디자이너 ID를 입력받아 디자이너 이름과 ID를 포함한 문자열로 변환하는 비동기 함수입니다.
   *              디자이너 정보를 서버에서 받아와 디자이너 이름과 ID를 함께 반환합니다.
   * @param {string} value - 입력된 디자이너 ID입니다.
   * @returns {Promise<string>} - 디자이너 이름과 ID가 포함된 문자열을 반환합니다. 예: "홍길동 d1234_aa01a"
   */
  const designerToString = async function (value) {
    try {
      // 서버에서 디자이너 정보를 가져오기 위한 AJAX 호출
      const designer = (await GeneralJs.ajaxJson({ noFlat: true, whereQuery: { desid: value.trim() } }, "/getDesigners"))[0];

      // 디자이너 이름과 ID를 합쳐서 반환
      return designer.designer + " " + designer.desid;
    } catch (e) {
      console.log(e);  // 오류 발생 시 로그 출력
    }
  };

  /**
   * @function statusToObject
   * @description 프로젝트 상태 값을 처리하여 유효성을 검사하고, 유효한 상태 값을 반환하는 함수입니다.
   *              '대기', '진행중', '완료', '홀딩', '드랍' 상태만 유효한 값으로 인정되며, 
   *              유효하지 않은 값이 입력된 경우 이전 값을 반환합니다.
   * @param {string} value - 입력된 프로젝트 상태 값입니다. 예: "진행중"
   * @param {string} pastValue - 유효성 검사를 통과하지 못할 경우 사용할 이전 값입니다.
   * @param {boolean} vaildMode - 유효성 검사 모드입니다. true인 경우 유효성 검사를 수행합니다.
   * @returns {Object} - 유효성 검사 모드일 경우 유효성 검사 결과를 포함한 객체를 반환하며, 일반 모드에서는 최종 상태 값을 반환합니다.
   */
  const statusToObject = function (value, pastValue, vaildMode) {
    let boo = false;  // 유효성 검사를 위한 플래그
    let finalValue;  // 결과로 반환할 상태 값
    let targetArr;  // 유효한 상태 값을 포함하는 배열

    // 유효성 검사 모드일 경우 결과 반환
    if (vaildMode) {
      return { boo: !boo, value: null };
    }

    // 유효한 상태 값의 배열 정의
    targetArr = [ '대기', '진행중', '완료', '홀딩', '드랍' ];

    // 입력된 값이 유효한 상태 값에 포함되는지 확인
    if (targetArr.includes(value)) {
      finalValue = value;  // 유효하면 입력된 값 그대로 반환
    } else {
      finalValue = pastValue;  // 유효하지 않으면 이전 값 반환
    }

    return finalValue;  // 최종 상태 값 반환
  };

  /**
   * @function remainPureToObject
   * @description 문자열 또는 숫자 형태로 입력된 값에서 숫자만 추출하여 결과로 반환하는 함수입니다.
   *              유효성 검사 모드일 경우, 유효성을 확인한 후 결과를 반환하며, 일반 모드에서는 입력된 값에 165,000을 더한 값을 반환합니다.
   *              값이 유효하지 않으면 이전 값을 기반으로 처리됩니다.
   * @param {string|number} value - 입력된 값입니다. 숫자 또는 숫자가 포함된 문자열일 수 있습니다.
   *                                예: "12345", 12345
   * @param {string|number} pastValue - 유효성 검사를 통과하지 못할 경우 사용할 이전 값입니다.
   * @param {boolean} vaildMode - 유효성 검사 모드입니다. true인 경우 유효성 검사를 수행합니다.
   * @returns {number|Object} - 유효성 검사 모드일 경우, 유효성 검사 결과와 함께 값을 반환하며,
   *                            일반 모드에서는 입력 값에 165,000을 더한 숫자를 반환합니다.
   */
  const remainPureToObject = function (value, pastValue, vaildMode) {
    let result;  // 최종 결과 값을 저장할 변수
    let boo = false;  // 유효성 검사를 위한 플래그
    let num;  // 숫자 변환 후 값을 저장할 변수

    // 입력된 값이 문자열일 경우, 숫자만 추출하여 num 변수에 저장
    if (typeof value === "string") {
      num = Number(value.replace(/[^0-9\.\-]/g, ''));  // 숫자가 아닌 문자를 제거하고 숫자로 변환
    } else {
      num = value;  // 숫자일 경우 그대로 저장
    }

    // num이 NaN일 경우 유효하지 않다고 판단
    if (Number.isNaN(num)) {
      boo = true;  // 유효성 검사 실패 플래그 설정
      if (typeof pastValue === "string") {
        result = Number(pastValue.replace(/[^0-9\.\-]/g, ''));  // 이전 값에서 숫자만 추출하여 result에 저장
      } else {
        result = pastValue;  // 이전 값이 숫자일 경우 그대로 사용
      }
    } else {
      boo = false;  // 유효성 검사 성공 플래그 설정
      if (typeof value === "string") {
        result = Number(value.replace(/[^0-9\.\-]/g, ''));  // 입력된 값에서 숫자만 추출하여 result에 저장
      } else {
        result = value;  // 숫자일 경우 그대로 result에 저장
      }
    }

    // 유효성 검사 모드일 경우 결과 반환
    if (vaildMode) {
      return { boo: !boo, value: result };  // 유효성 검사 결과와 값을 함께 반환
    }

    // 일반 모드에서는 결과 값에 165,000을 더한 값을 반환
    return Number(result + 165000);
  };

  /**
   * @function callHistoryToObject
   * @description 콜 히스토리를 문자열로 받아 유효성을 검사하고, 유효한 날짜 값으로 변환하여 반환하는 함수입니다.
   *              입력된 날짜 형식을 확인하고, 올바르지 않은 경우 이전 값을 사용하여 처리합니다.
   * @param {string} value - 입력된 콜 히스토리 값입니다. 여러 날짜가 콤마(", ")로 구분되어 있습니다.
   *                         예: "2023-05-01, 2023-04-28"
   * @param {string} pastValue - 유효성 검사를 통과하지 못할 경우 사용할 이전 값입니다.
   * @param {boolean} vaildMode - 유효성 검사 모드입니다. true인 경우 유효성 검사를 수행하고 결과를 반환합니다.
   * @returns {Array|Object} - 유효성 검사 모드일 경우 유효성 검사 결과를 포함한 객체를 반환하며, 일반 모드에서는 날짜 객체 배열을 반환합니다.
   */
  const callHistoryToObject = function (value, pastValue, vaildMode) {
    let arr = [];  // 최종적으로 반환할 콜 히스토리 배열
    let filteredValue;  // 날짜 필터링 후의 값
    let filteredArr = [];  // 필터링된 날짜 값들을 저장할 배열
    let obj;  // 각 날짜를 Date 객체로 변환한 값
    let temp, temp2;  // 날짜 값을 분리하여 저장할 임시 변수
    let boo = false;  // 유효성 검사를 위한 플래그

    // 입력된 콜 히스토리를 콤마로 구분하여 배열로 분리
    temp = value.split(", ");
    
    // 각 날짜 값을 필터링하여 유효성을 검사하고 필터링된 값을 배열에 저장
    for (let i of temp) {
      filteredValue = DataPatch.toolsDateFilter(i);  // DataPatch의 toolsDateFilter 메서드를 사용하여 날짜 필터링
      filteredArr.push(filteredValue);  // 필터링된 값을 배열에 저장

      // 필터링된 값이 유효한 날짜 형식인지 검사 (YYYY-MM-DD 형식)
      if (!/^[0-9]{4}\-[0-9]{2}\-[0-9]{2}$/.test(filteredValue)) {
        boo = true;  // 유효하지 않으면 플래그 설정
      }
    }

    // 유효하지 않으면 이전 값을 사용하여 처리
    if (!boo) {
      temp = filteredArr;  // 유효하면 필터링된 값을 사용
    } else {
      temp = pastValue.split(", ");  // 유효하지 않으면 이전 값을 사용
    }

    // 유효성 검사 모드일 경우 결과를 객체로 반환
    if (vaildMode) {
      return { boo: !boo, value: filteredArr.join(", ") };  // 유효성 검사 결과와 필터링된 값 반환
    }

    // 유효하지 않은 경우 빈 배열 반환
    if (temp[0] === '') {
      return [];
    }

    // 콜 히스토리를 역순으로 정렬
    temp.reverse();

    // 각 날짜 값을 Date 객체로 변환하여 배열에 추가
    for (let i of temp) {
      temp2 = i.split("-");  // 날짜 값을 연, 월, 일로 분리
      obj = new Date(Number(temp2[0]), Number(temp2[1].replace(/^0/, '') - 1), Number(temp2[2].replace(/^0/, '')));  // Date 객체로 변환
      arr.push({ date: obj, who: "" });  // Date 객체와 추가 정보(who)를 함께 배열에 저장
    }

    return arr;  // 최종 콜 히스토리 배열 반환
  };

  /**
   * @function discountToObject
   * @description 할인율 값을 문자열로 받아, 해당 값에서 % 기호를 제거하고 숫자로 변환하여 반환하는 함수입니다.
   *              유효성 검사 모드일 경우, 유효성 검사 결과를 반환합니다.
   * @param {string} value - 입력된 할인율 값입니다. 예: "20%" 또는 "15%"
   * @param {string} pastValue - 유효성 검사를 통과하지 못할 경우 사용할 이전 값입니다.
   * @param {boolean} vaildMode - 유효성 검사 모드입니다. true인 경우 유효성 검사를 수행하고 결과를 반환합니다.
   * @returns {number|Object} - 유효성 검사 모드일 경우 유효성 검사 결과를 포함한 객체를 반환하며, 일반 모드에서는 할인율을 숫자로 반환합니다.
   */
  const discountToObject = function (value, pastValue, vaildMode) {
    let boo = false;  // 유효성 검사를 위한 플래그
    
    // 유효성 검사 모드일 경우 유효성 검사 결과와 값을 반환
    if (vaildMode) {
      return { boo: !boo, value: null };  // 유효성 검사 결과 반환, 기본값 null
    }
    
    // 입력된 문자열에서 % 기호를 제거하고, 숫자만 추출하여 100으로 나눈 후 할인율 값으로 변환
    return (Number((value.split('%')[0]).replace(/[^0-9]/gi, '')) / 100);
  };

  /**
   * @function discountDesignerToObject
   * @description 디자이너 할인율 값을 문자열로 받아, 해당 값에서 % 기호를 제거하고 숫자로 변환하여 반환하는 함수입니다.
   *              유효성 검사 모드일 경우, 유효성 검사 결과를 반환합니다.
   * @param {string} value - 입력된 디자이너 할인율 값입니다. 예: "30%" 또는 "25%"
   * @param {string} pastValue - 유효성 검사를 통과하지 못할 경우 사용할 이전 값입니다.
   * @param {boolean} vaildMode - 유효성 검사 모드입니다. true인 경우 유효성 검사를 수행하고 결과를 반환합니다.
   * @returns {number|Object} - 유효성 검사 모드일 경우 유효성 검사 결과를 포함한 객체를 반환하며, 일반 모드에서는 디자이너 할인율을 숫자로 반환합니다.
   */
  const discountDesignerToObject = function (value, pastValue, vaildMode) {
    let boo = false;  // 유효성 검사를 위한 플래그
    
    // 유효성 검사 모드일 경우 유효성 검사 결과와 값을 반환
    if (vaildMode) {
      return { boo: !boo, value: null };  // 유효성 검사 결과 반환, 기본값 null
    }
    
    // 입력된 문자열에서 % 기호를 제거하고, 숫자만 추출하여 100으로 나눈 후 디자이너 할인율 값으로 변환
    return (Number((value.split('%')[0]).replace(/[^0-9]/gi, '')) / 100);
  };

  /**
   * 프로젝트 데이터를 정의하는 맵입니다. 
   * 각 항목은 프로젝트의 특정 속성에 해당하며, 속성의 이름, 데이터 위치, 데이터 유형, 검색 가능 여부 등을 포함합니다.
   * 이 맵은 프로젝트 관련 데이터의 처리 및 검증을 담당합니다.
   * @constant
   * @type {Object}
   */
  const map = {
    proid: { name: "아이디", position: "proid", type: "string", searchBoo: true, },
    cliid: { name: "고객", position: "cliid", type: "string", searchBoo: true, },
    desid: { name: "디자이너", position: "desid", type: "string", searchBoo: true, },
    designer: { name: "디자이너", position: "desid", type: "object", objectFunction: designerToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), stringFunction: designerToString.toString().replace(/\}$/, '').replace(/async function \(value\) \{/gi, ''), stringFunctionAsync: true, searchBoo: true, },
    service: { name: "서비스", position: "service", type: "object", objectFunction: serviceToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), stringFunction: serviceToString.toString().replace(/\}$/, '').replace(/function \(value\) \{/gi, ''), searchBoo: true, },
    status: { name: "진행 상태", position: "process.status", type: "object", items: [ '대기', '진행중', '완료', '홀딩', '드랍' ], objectFunction: statusToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: true, },
    action: { name: "응대", position: "process.action", type: "string", items: [
      "계약금 안내",
      "현장미팅 조율",
      "현장미팅 확정",
      "의뢰서 공유",
      "현장미팅 피드백",
      "잔금 안내",
      "시작 대기",
      "1차 제안",
      "수정 제안",
      "시공 진행",
      "제품 구매",
      "추가 제안",
      "배송중",
      "세팅 마무리",
      "촬영 컨택",
      "사진 업로드",
      "디자이너글 업로드",
      "증빙 처리",
      "정산 대기",
      "프로젝트 완료",
      "해당 없음"
    ], itemMap: [
      [
        "계약 대기",
        [
          [ "계약금 안내" ],
          [ "현장미팅 조율", "현장미팅 확정" ],
          [ "의뢰서 공유" ],
          [ "현장미팅 피드백", "잔금 안내" ],
        ]
      ],
      [
        "프로젝트 진행중",
        [
          [ "시작 대기" ],
          [ "1차 제안", "수정 제안" ],
          [ "시공 진행" ],
          [ "제품 구매", "추가 제안", "배송중" ],
          [ "세팅 마무리", "촬영 컨택" ],
          [ "사진 업로드", "디자이너글 업로드" ],
          [ "증빙 처리", "정산 대기" ],
          [ "프로젝트 완료" ],
        ]
      ],
      [
        "해당 없음",
        [
          [ "해당 없음" ]
        ]
      ]
    ], itemDescription: [
      {
        name: "계약금 안내",
        description: "아직 계약금을 내지 않는 고객님께 계약금 결제 안내를 진행하는 단계입니다.",
        pannel: []
      },
      {
        name: "현장미팅 조율",
        description: "고객님이 계약금을 지불하시면, 현장 미팅을 위해 디자이너와 시간과 장소를 맞추는 단계입니다.",
        pannel: []
      },
      {
        name: "현장미팅 확정",
        description: "현장 미팅의 시간과 공간이 조율되고 확정되어 현장 미팅을 대기하고 있는 단계입니다.",
        pannel: []
      },
      {
        name: "의뢰서 공유",
        description: "홈리에종에서 홈스타일링 의뢰서를 작성하여 해당 디자이너님께 의뢰서를 전송해드리는 단계입니다.",
        pannel: [
          {
            name: "의뢰서 확인",
            event: (function (e) {
              const { proid, cliid, desid, action, requestNumber, thisUrl } = e.__data__;
              const { blankHref } = GeneralJs;
              blankHref(thisUrl + "&mode=request&cliid=" + cliid);
            }).toString().trim().replace(/^function[^\(]*\([^\)]*\)[^\{]*\{\n?/i, '').replace(/\n?[ ]*\}$/i, '').trim()
          }
        ]
      },
      {
        name: "현장미팅 피드백",
        description: "현장 미팅이 끝나고 고객님과 디자이너님의 피드백과 진행 여부를 홈리에종이 받는 단계입니다.",
        pannel: []
      },
      {
        name: "잔금 안내",
        description: "현장 미팅 후 진행을 결정하신 고객님께 디자인비 잔금을 요청드리는 단계입니다.",
        pannel: []
      },
      {
        name: "시작 대기",
        description: "고객님의 잔금 결제가 모두 완료되고 프로젝트 시작 전까지 대기하고 있는 단계입니다.",
        pannel: [
          {
            name: "상세 일정 기입",
            event: (function (e) {
              const { proid, cliid, desid, action, requestNumber, thisUrl } = e.__data__;
              const { blankHref } = GeneralJs;
              blankHref(thisUrl + "&mode=schedule&cliid=" + cliid);
            }).toString().trim().replace(/^function[^\(]*\([^\)]*\)[^\{]*\{\n?/i, '').replace(/\n?[ ]*\}$/i, '').trim()
          }
        ]
      },
      {
        name: "1차 제안",
        description: "프로젝트가 시작되고 디자이너가 본격적인 디자인 작업을 하는 기간과 제안을 드리는 단계입니다.",
        pannel: []
      },
      {
        name: "수정 제안",
        description: "디자인 제안에 대해서 고객님과 디자이너가 소통을 통해 수정 작업을 거치는 단계입니다.",
        pannel: []
      },
      {
        name: "시공 진행",
        description: "디자인에 의해 정해진 시공 리스트에 맞춰 고객님이 시공사를 선택하고 계약을 진행하는 단계입니다.",
        pannel: []
      },
      {
        name: "제품 구매",
        description: "디자이너가 제품 리스트를 고객님께 드리고, 그 리스트에 맞춰 제품 구매를 진행하는 단계입니다.",
        pannel: []
      },
      {
        name: "배송중",
        description: "제품의 배송을 기다리고, 제작 제품의 완성을 기다리고 세팅을 대기하고 있는 단계입니다.",
        pannel: []
      },
      {
        name: "세팅 마무리",
        description: "제품 배송과 제작이 모두 끝나고 디자인안대로 모든 제품의 세팅을 완료하는 단계입니다.",
        pannel: []
      },
      {
        name: "촬영 컨택",
        description: "세팅의 완료 후 촬영을 위해 디자이너와 작가, 고객님의 일정을 조율하는 단계입니다.",
        pannel: []
      },
      {
        name: "해당 없음",
        description: "해당 없음"
      },
    ], searchBoo: true, },
    next: { name: "전화 예정일", position: "process.call.next", type: "date", searchBoo: false, yesNo: [ "Y", "N" ], },
    callHistory: { name: "연락 기록", position: "process.call.history", type: "object", objectFunction: callHistoryToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: false, },
    firstDate: { name: "계약금 입금", position: "process.contract.first.date", type: "date", searchBoo: true, yesNo: [ "Y", "N" ], },
    firstCancel: { name: "계약금 취소", position: "process.contract.first.cancel", type: "date", searchBoo: true, yesNo: [ "Y", "N" ], },
    firstAmount: { name: "계약금", position: "process.contract.first.calculation.amount", type: "number", searchBoo: true, moneyBoo: true, constant: true },
    firstInfo: { name: "계약금 정보", position: "process.contract.first.calculation.info", type: "object", objectFunction: methodToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: true, },
    firstRefund: { name: "계약금 환불액", position: "process.contract.first.calculation.refund", type: "number", searchBoo: true, moneyBoo: true },
    meetingDate: { name: "1차 미팅", position: "process.contract.meeting.date", type: "date", detailDate: true, searchBoo: true, yesNo: [ "Y", "N" ], calendar: function (thisCase) {
      const id = thisCase.proid;
      const to = "designerMeeting";
      const designer = ((thisCase.designer.split(" "))[0]).trim();
      const title = "현장 미팅 W " + thisCase.name + "C " + designer + "D " + thisCase.proid;
      return { id: id, to: to, title: title };
    }, },
    remainDate: { name: "잔금 입금", position: "process.contract.remain.date", type: "date", searchBoo: true, yesNo: [ "Y", "N" ], constant: true },
    remainCancel: { name: "잔금 취소", position: "process.contract.remain.cancel", type: "date", searchBoo: true, yesNo: [ "Y", "N" ], },
    remainSupply: { name: "공급가", position: "process.contract.remain.calculation.amount.supply", type: "number", searchBoo: true, moneyBoo: true },
    remainVat: { name: "VAT", position: "process.contract.remain.calculation.amount.vat", type: "number", searchBoo: true, moneyBoo: true },
    remainConsumer: { name: "소비자가", position: "process.contract.remain.calculation.amount.consumer", type: "number", searchBoo: true, moneyBoo: true },
    address: { name: "고객 주소", position: "null", type: "constant", searchBoo: false },
    spaceContract: { name: "계약 상태", position: "null", type: "constant", searchBoo: false },
    pyeong: { name: "평형", position: "null", type: "constant", searchBoo: false },
    evaluationSend: { name: "평가 전송", position: "null", type: "constant", searchBoo: false },
    evaluationResult: { name: "평가 완료", position: "null", type: "constant", searchBoo: false },
    remainPure: { name: "잔금", position: "process.contract.remain.calculation.amount.consumer", type: "object", objectFunction: remainPureToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: false, moneyBoo: true },
    remainInfo: { name: "잔금 정보", position: "process.contract.remain.calculation.info", type: "object", objectFunction: methodToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: true, },
    remainRefund: { name: "계약금 환불액", position: "process.contract.remain.calculation.refund", type: "number", searchBoo: true, moneyBoo: true },
    discount: { name: "할인율(홈)", position: "process.contract.remain.calculation.discount", type: "object", objectFunction: discountToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: true },
    discountDesigner: { name: "할인율(디)", position: "process.contract.remain.calculation.discount", type: "object", objectFunction: discountDesignerToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: true },
    formDateFrom: { name: "프로젝트 시작일", position: "process.contract.form.date.from", type: "date", searchBoo: true, yesNo: [ "Y", "N" ], },
    formDateTo: { name: "프로젝트 종료일", position: "process.contract.form.date.to", type: "date", searchBoo: true, yesNo: [ "Y", "N" ], },
    formDateCancel: { name: "계약 취소", position: "process.contract.form.date.cancel", type: "date", searchBoo: true, yesNo: [ "Y", "N" ], },
    method: { name: "정산 방식", position: "process.calculation.method", type: "string", items: [ "사업자(일반)", "사업자(간이)", "프리랜서" ], searchBoo: true, },
    percentage: { name: "수수료", position: "process.calculation.percentage", type: "number", searchBoo: true, },
    calculationInfo: { name: "정산 정보", position: "process.calculation.info", type: "object", objectFunction: accountToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), stringFunction: accountToString.toString().replace(/\}$/, '').replace(/function \(value\) \{/gi, ''), searchBoo: true, },
    paymentsTotalAmount: { name: "정산 총금액", position: "process.calculation.payments.totalAmount", type: "number", searchBoo: true, moneyBoo: true },
    paymentsFirstAmount: { name: "디자이너 선금", position: "process.calculation.payments.first.amount", type: "number", searchBoo: true, moneyBoo: true },
    paymentsFirstDate: { name: "선금 지급일", position: "process.calculation.payments.first.date", type: "date", searchBoo: true, yesNo: [ "Y", "N" ], constant: true },
    paymentsFirstCancel: { name: "선금 환수일", position: "process.calculation.payments.first.cancel", type: "date", searchBoo: true, yesNo: [ "Y", "N" ], },
    paymentsFirstRefund: { name: "선금 환수액", position: "process.calculation.payments.first.refund", type: "number", searchBoo: true, moneyBoo: true },
    paymentsRemainAmount: { name: "디자이너 잔금", position: "process.calculation.payments.remain.amount", type: "number", searchBoo: true, moneyBoo: true },
    paymentsRemainDate: { name: "잔금 지급일", position: "process.calculation.payments.remain.date", type: "date", searchBoo: true, yesNo: [ "Y", "N" ], constant: true },
    paymentsRemainCancel: { name: "잔금 환수일", position: "process.calculation.payments.remain.cancel", type: "date", searchBoo: true, yesNo: [ "Y", "N" ], },
    paymentsRemainRefund: { name: "잔금 환수액", position: "process.calculation.payments.remain.refund", type: "number", searchBoo: true, moneyBoo: true },
    photoStatus: { name: "촬영 상태", position: "contents.photo.status", type: "string", items: [ '촬영 컨택 요망', '촬영 컨택중', '촬영 일정 확정', '촬영 완료', '촬영 홀딩', '해당 없음' ], searchBoo: true, },
    contentsPhotoDate: { name: "촬영일", position: "contents.photo.date", type: "date", searchBoo: true, yesNo: [ "Y", "N" ], },
  };
  return map;
}

module.exports = DataPatch;
