/**
 * @class DateMatrix
 * @description 주어진 연도와 월을 기반으로 날짜 매트릭스를 생성하고 관리하는 클래스입니다.
 * 이 클래스는 날짜 매트릭스를 다양한 방식으로 변환하고, 이전/다음 달 및 연도와 같은 날짜 계산을 처리합니다.
 */
class DateMatrix {
  /**
   * @property {number} year
   * @description 관리할 연도를 저장합니다.
   */
  public year: number;

  /**
   * @property {number} month
   * @description 관리할 월을 저장합니다.
   */
  public month: number;

  /**
   * @property {any} matrix
   * @description 날짜 매트릭스를 저장하는 변수로, 기본적으로 null로 초기화됩니다.
   */
  public matrix: any;

  /**
   * @constructor
   * @description 주어진 연도와 월을 받아 DateMatrix를 초기화합니다.
   * @param {number} year - 연도
   * @param {number} month - 월
   */
  constructor(year: number, month: number) {
    this.year = year; // 연도를 설정합니다.
    this.month = month; // 월을 설정합니다.
    this.matrix = null; // 매트릭스를 초기화합니다.
  }

  /**
   * @method getYearString
   * @description 연도를 문자열로 변환하여 반환합니다.
   * @returns {string} - "년" 단위로 연도를 반환합니다.
   */
  public getYearString = (): string => {
    return String(this.year) + "년"; // 연도를 "년" 단위로 반환합니다.
  }

  /**
   * @method getMonthString
   * @description 월을 문자열로 변환하여 반환합니다.
   * @returns {string} - "월" 단위로 월을 반환합니다.
   */
  public getMonthString = (): string => {
    return String(this.month + 1) + "월"; // 월을 "월" 단위로 반환합니다.
  }

  /**
   * @method getMatrix
   * @description 현재 저장된 매트릭스를 반환합니다.
   * @returns {any} - 현재 매트릭스를 반환합니다.
   */
  public getMatrix = () => {
    return this.matrix; // 매트릭스를 반환합니다.
  }

  /**
   * @method getNormalMatrix
   * @description 매트릭스에서 날짜만 추출하여 2차원 배열로 반환합니다.
   * @returns {any[]} - 날짜만을 추출한 2차원 배열을 반환합니다.
   */
  public getNormalMatrix = (): any[] => {
    let justTong: any[], justArr: any[];
    justTong = [];
    justArr = [];

    // 매트릭스 배열을 순회하며 날짜를 추출합니다.
    for (let arr of this.matrix) {
      justArr = [];
      for (let obj of arr) {
        if (obj === null) {
          justArr.push(null); // null인 경우 null을 추가합니다.
        } else {
          justArr.push(obj.date); // 날짜를 추가합니다.
        }
      }
      justTong.push(justArr); // 추출된 배열을 최종 배열에 추가합니다.
    }
    return justTong;
  }

  /**
   * @method getDateArr
   * @description 매트릭스에서 날짜 객체만 추출하여 배열로 반환합니다.
   * @returns {any[]} - 날짜 객체를 모두 포함한 배열을 반환합니다.
   */
  public getDateArr = (): any[] => {
    let justTong: any[];
    justTong = [];

    // 매트릭스 배열을 순회하며 날짜 객체를 추출합니다.
    for (let arr of this.matrix) {
      for (let obj of arr) {
        if (obj !== null) {
          justTong.push(obj); // null이 아닌 객체만 배열에 추가합니다.
        }
      }
    }
    return justTong;
  }

  /**
   * @method nextMatrix
   * @description 다음 달의 DateMatrix 객체를 반환합니다.
   * @returns {DateMatrix} - 다음 달의 DateMatrix 객체를 반환합니다.
   */
  public nextMatrix = (): DateMatrix => {
    if (this.month === 11) {
      return getDateMatrix(this.year + 1, 0); // 12월인 경우 다음 해 1월을 반환합니다.
    } else {
      return getDateMatrix(this.year, this.month + 1); // 다음 달을 반환합니다.
    }
  }

  /**
   * @method previousMatrix
   * @description 이전 달의 DateMatrix 객체를 반환합니다.
   * @returns {DateMatrix} - 이전 달의 DateMatrix 객체를 반환합니다.
   */
  public previousMatrix = (): DateMatrix => {
    if (this.month === 0) {
      return getDateMatrix(this.year - 1, 11); // 1월인 경우 이전 해 12월을 반환합니다.
    } else {
      return getDateMatrix(this.year, this.month - 1); // 이전 달을 반환합니다.
    }
  }

  /**
   * @method nextSundayMatrix
   * @description 다음 달의 DateMatrix 객체를 일요일을 기준으로 변환하여 반환합니다.
   * @returns {DateMatrix} - 다음 달의 일요일 기준으로 변환된 DateMatrix 객체를 반환합니다.
   */
  public nextSundayMatrix = (): DateMatrix => {
    if (this.month === 11) {
      return getDateMatrix(this.year + 1, 0).sundayConvert(); // 12월인 경우 다음 해 1월로 변환 후 반환합니다.
    } else {
      return getDateMatrix(this.year, this.month + 1).sundayConvert(); // 다음 달로 변환 후 반환합니다.
    }
  }

  /**
   * @method previousSundayMatrix
   * @description 이전 달의 DateMatrix 객체를 일요일을 기준으로 변환하여 반환합니다.
   * @returns {DateMatrix} - 이전 달의 일요일 기준으로 변환된 DateMatrix 객체를 반환합니다.
   */
  public previousSundayMatrix = (): DateMatrix => {
    if (this.month === 0) {
      return getDateMatrix(this.year - 1, 11).sundayConvert(); // 1월인 경우 이전 해 12월로 변환 후 반환합니다.
    } else {
      return getDateMatrix(this.year, this.month - 1).sundayConvert(); // 이전 달로 변환 후 반환합니다.
    }
  }

  /**
   * @method yearMatrix
   * @description 주어진 연도의 모든 월에 대한 DateMatrix 배열을 반환합니다.
   * @returns {any[]} - 해당 연도의 모든 월에 대한 DateMatrix 배열을 반환합니다.
   */
  public yearMatrix = (): any[] => {
    let arr: any[] = [];
    let tempObj: any;

    // 12개월에 대한 DateMatrix 객체를 배열에 저장합니다.
    for (let i = 0; i < 12; i++) {
      tempObj = getDateMatrix(this.year, i);
      arr.push(tempObj);
    }
    return arr;
  }

  /**
   * @method nextYearMatrix
   * @description 다음 연도의 모든 월에 대한 DateMatrix 배열을 반환합니다.
   * @returns {any[]} - 다음 연도의 모든 월에 대한 DateMatrix 배열을 반환합니다.
   */
  public nextYearMatrix = () => {
    let arr: any[] = [];

    // 다음 연도의 12개월에 대한 DateMatrix 객체를 배열에 저장합니다.
    for (let i = 0; i < 12; i++) {
      arr.push(getDateMatrix(this.year + 1, i));
    }
    return arr;
  }

  /**
   * @method previousYearMatrix
   * @description 이전 연도의 모든 월에 대한 DateMatrix 배열을 반환합니다.
   * @returns {any[]} - 이전 연도의 모든 월에 대한 DateMatrix 배열을 반환합니다.
   */
  public previousYearMatrix = () => {
    let arr: any[] = [];

    // 이전 연도의 12개월에 대한 DateMatrix 객체를 배열에 저장합니다.
    for (let i = 0; i < 12; i++) {
      arr.push(getDateMatrix(this.year - 1, i));
    }
    return arr;
  }

  /**
   * @method rangeMatrix
   * @description 현재 달을 기준으로 일정 범위의 DateMatrix 배열을 반환합니다.
   * @param {number} [range=3] - 범위를 설정하는 매개변수입니다.
   * @returns {any[]} - 설정된 범위에 해당하는 DateMatrix 배열을 반환합니다.
   */
  public rangeMatrix = (range: number = 3): any[] => {
    let arr: any[] = [];
    let tempMatrix: DateMatrix;

    // 이전 달의 매트릭스를 추가합니다.
    tempMatrix = this.previousMatrix();
    arr.unshift(tempMatrix);
    for (let i = 1; i < range; i++) {
      tempMatrix = tempMatrix.previousMatrix();
      arr.unshift(tempMatrix);
    }

    // 현재 달을 추가합니다.
    arr.push(this);

    // 다음 달의 매트릭스를 추가합니다.
    tempMatrix = this.nextMatrix();
    arr.push(tempMatrix);
    for (let i = 1; i < range; i++) {
      tempMatrix = tempMatrix.nextMatrix();
      arr.push(tempMatrix);
    }

    return arr; // 범위에 해당하는 매트릭스를 반환합니다.
  }

  /**
   * @method returnSundayMatrix
   * @description 매트릭스를 일요일 기준으로 변환하여 반환합니다.
   * @returns {any[]} - 일요일 기준으로 변환된 매트릭스를 반환합니다.
   */
  public returnSundayMatrix = (): any[] => {
    let arr: any[], boo: boolean;
    let tempArr: any[];
    let tong: any[];
    let length: number;

    // 매트릭스를 배열로 변환하여 저장합니다.
    tempArr = [];
    arr = [];
    for (let matrix of this.matrix) {
      for (let i of matrix) {
        arr.push(i);
      }
    }
    arr.unshift(null); // 첫 번째 요소를 null로 설정합니다.

    // 첫 번째 주가 모두 null인지 확인하고, 그렇다면 해당 주를 제거합니다.
    boo = true;
    for (let i = 0; i < 7; i++) {
      if (arr[i] !== null) {
        boo = false;
      }
    }
    if (boo) {
      for (let i = 0; i < 7; i++) {
        arr.shift();
      }
    }

    // 일주일 단위로 배열을 생성합니다.
    tong = [];
    for (let i = 0; i < arr.length; i++) {
      if (i % 7 === 0) {
        tempArr = [];
      }
      tempArr.push(arr[i]);
      if (i % 7 === 6 || i === arr.length - 1) {
        tong.push(tempArr);
      }
    }

    // 마지막 주가 빈 배열이면 제거합니다.
    if (tong[tong.length - 1].length === 0) {
      tong.pop();
    }

    // 마지막 주가 7일이 안 되는 경우 null을 추가하여 7일로 맞춥니다.
    length = tong[tong.length - 1].length;
    if (length !== 7) {
      for (let i = 0; i < 7 - length; i++) {
        tong[tong.length - 1].push(null);
      }
    }

    // 마지막 주가 모두 null이면 제거합니다.
    boo = true;
    for (let i = 0; i < 7; i++) {
      if (tong[tong.length - 1][i] !== null) {
        boo = false;
      }
    }
    if (boo) {
      tong.pop();
    }

    return tong; // 일요일 기준으로 변환된 매트릭스를 반환합니다.
  }

  /**
   * @method sundayConvert
   * @description 현재 매트릭스를 일요일 기준으로 변환한 새 DateMatrix 객체를 반환합니다.
   * @returns {DateMatrix} - 일요일 기준으로 변환된 DateMatrix 객체를 반환합니다.
   */
  public sundayConvert = (): DateMatrix => {
    const newObj: DateMatrix = new DateMatrix(this.year, this.month); // 새 DateMatrix 객체를 생성합니다.
    newObj.matrix = this.returnSundayMatrix(); // 현재 매트릭스를 일요일 기준으로 변환한 매트릭스를 설정합니다.
    return newObj; // 변환된 DateMatrix 객체를 반환합니다.
  }
}

/**
 * @class DateFactor
 * @description 날짜 정보를 관리하는 클래스입니다. 연도, 월, 일, 요일 및 Date 객체를 저장하고 관리합니다.
 */
class DateFactor {
  /**
   * @property {any} year
   * @description 연도를 저장합니다.
   */
  public year: any;

  /**
   * @property {any} month
   * @description 월을 저장합니다.
   */
  public month: any;

  /**
   * @property {any} date
   * @description 일을 저장합니다.
   */
  public date: any;

  /**
   * @property {string} day
   * @description 요일을 저장합니다. 요일은 '월', '화', '수', '목', '금', '토', '일' 중 하나입니다.
   */
  public day: string;

  /**
   * @property {Date} dateObject
   * @description 실제 날짜를 저장하는 Date 객체입니다.
   */
  public dateObject: Date;

  /**
   * @property {number} dayday
   * @description 요일을 숫자로 저장합니다. (0 = 일요일, 6 = 토요일)
   */
  public dayday: number;

  /**
   * @constructor
   * @description 연도, 월, 일, 요일을 받아 DateFactor를 초기화합니다.
   * @param {any} year - 연도
   * @param {any} month - 월
   * @param {any} date - 일
   * @param {number} index - 요일을 나타내는 인덱스 (0 = 월요일, 6 = 일요일)
   */
  constructor(year: any, month: any, date: any, index: number) {
    this.year = year; // 연도를 설정합니다.
    this.month = month; // 월을 설정합니다.
    this.date = date; // 일을 설정합니다.
    this.day = ([ '월', '화', '수', '목', '금', '토', '일' ])[index]; // 요일을 인덱스를 통해 설정합니다.
    this.dateObject = new Date(year, month, date); // Date 객체를 생성하여 저장합니다.
    this.dayday = this.dateObject.getDay(); // Date 객체를 통해 요일을 숫자로 설정합니다.
  }

  /**
   * @method getDateString
   * @description 현재 DateFactor의 날짜 정보를 문자열 형식으로 반환합니다.
   * @returns {string} - "YYYY-MM-DD" 형식의 날짜 문자열을 반환합니다.
   */
  public getDateString = (): string => {
    /**
     * @function zeroAddition
     * @description 숫자가 10 미만일 경우 앞에 0을 추가하는 함수입니다.
     * @param {number | string} num - 처리할 숫자 또는 문자열
     * @returns {string} - 10 미만이면 앞에 0이 추가된 문자열, 10 이상이면 그대로 반환
     * @throws {Error} - 유효하지 않은 문자열 입력 시 오류를 발생시킵니다.
     */
    const zeroAddition = (num: number | string): string => {
      if (typeof num === 'string') {
        if (Number.isNaN(Number(num))) {
          throw new Error("invaild type"); // 유효하지 않은 문자열 입력 시 오류 발생
        } else {
          num = Number(num);
        }
      }
      if (num < 10) {
        return '0' + String(num); // 10 미만이면 앞에 0 추가
      } else {
        return String(num); // 10 이상이면 그대로 반환
      }
    }

    // 연도, 월, 일을 결합하여 "YYYY-MM-DD" 형식의 문자열을 반환합니다.
    return (String(this.year) + '-' + zeroAddition(this.month + 1) + '-' + zeroAddition(this.date));  
  }
}

/**
 * @function getDateMatrix
 * @description 주어진 연도와 월을 기반으로 DateMatrix 객체를 생성하는 함수입니다.
 * 오늘 날짜나 문자열 형식의 날짜를 처리하여 DateMatrix 객체로 변환합니다.
 * @param {any} year - 연도 또는 "today" 문자열
 * @param {any} month - 월
 * @returns {DateMatrix} - 생성된 DateMatrix 객체를 반환합니다.
 */
const getDateMatrix = (year: any, month: any): DateMatrix => {
  let tempObj: any;
  let tempArr: any;
  let tempArr2: any;
  let tempArr3: any;

  // year가 "today"이거나 year와 month가 모두 undefined일 경우 오늘 날짜로 설정합니다.
  if (year === "today" || (year === undefined && month === undefined)) {
    tempObj = new Date();
    year = tempObj.getFullYear();
    month = tempObj.getMonth();
  } 
  // 문자열 형식으로 year가 주어졌을 때, 이를 날짜로 변환합니다.
  else if (typeof year === "string" && month === undefined && /\-/g.test(year)) {
    if (year.length === 10) {
      tempArr = year.split("-");
      tempObj = new Date(Number(tempArr[0]), Number(tempArr[1].replace(/^0/, '')) - 1, Number(tempArr[2].replace(/^0/, '')));
    } else {
      tempArr = year.split(" ");
      tempArr2 = tempArr[0].split("-");
      tempArr3 = tempArr[1].split(":");
      tempObj = new Date(Number(tempArr2[0]), Number(tempArr2[1].replace(/^0/, '')) - 1, Number(tempArr2[2].replace(/^0/, '')), Number(tempArr3[0].replace(/^0/, '')), Number(tempArr3[1].replace(/^0/, '')), Number(tempArr3[2].replace(/^0/, '')));
    }
    year = tempObj.getFullYear();
    month = tempObj.getMonth();
  } 
  // Date 객체로 year가 주어진 경우 이를 연도와 월로 변환합니다.
  else if (typeof year === "object") {
    month = year.getMonth();
    year = year.getFullYear();
  }

  /**
   * @function getLastDate
   * @description 주어진 연도와 월의 마지막 일을 계산하여 반환하는 함수입니다.
   * @param {number} year - 연도
   * @param {number} month - 월
   * @returns {number} - 해당 월의 마지막 일을 반환합니다.
   */
  const getLastDate = (year: number, month: number): number => {
    const today: Date = new Date(year, month, 1);
    let newMonth: number, lastDate: number;
    lastDate = -1;
    for (let i = 27; i < 33; i++) {
      today.setDate(i);
      newMonth = today.getMonth();
      if (month !== newMonth) {
        lastDate = i - 1; // 월이 변경되는 시점에서 마지막 일을 설정
        break;
      }
    }
    return lastDate;
  }

  const firstDate: number = 1;
  const firstDay: number = (new Date(year, month, 1)).getDay();
  const lastDate: number = getLastDate(year, month);

  let tempDate: Date;
  let arr: any[];
  let tong: any[];
  let pastLength: number;
  let result: DateMatrix;
  let num: number;

  result = new DateMatrix(year, month); // 새 DateMatrix 객체 생성
  tong = [];
  arr = [];

  // 첫 번째 주에 채워질 null 값 처리
  if (firstDay !== 0) {
    for (let i = 0; i < firstDay - 1; i++) {
      arr.push(null);
    }
  } else {
    for (let i = 0; i < 6; i++) {
      arr.push(null);
    }
  }

  // 날짜를 배열에 추가하고, 주 단위로 배열을 분리
  for (let i = firstDate; i < lastDate + 1; i++) {
    tempDate = new Date(year, month, i);
    arr.push(tempDate.getDay());
    if (arr.length % 7 === 0) {
      tong.push(arr);
      arr = [];
    }
  }

  // 마지막 주의 빈 칸을 채워 7일로 맞추기
  if (arr.length !== 7 && arr.length !== 0) {
    pastLength = arr.length;
    for (let i = 0; i < 7 - pastLength; i++) {
      arr.push(null);
    }
    tong.push(arr);
  }

  // DateFactor 객체를 생성하여 각 날짜를 처리
  num = 1;
  for (let arr of tong) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== null) {
        arr[i] = new DateFactor(year, month, num, i); // 각 날짜에 대해 DateFactor 생성
        num++;
      }
    }
  }

  result.matrix = tong; // 처리된 매트릭스를 설정

  return result; // 최종 DateMatrix 객체 반환
}

export { DateMatrix, DateFactor };