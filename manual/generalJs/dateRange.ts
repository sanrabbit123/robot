/**
 * @class DateRange
 * @description 시작 날짜와 종료 날짜를 관리하고, 주어진 날짜가 해당 범위 내에 있는지 확인하는 클래스입니다.
 */
class DateRange {
  /**
   * @property {Date} start
   * @description 범위의 시작 날짜를 저장합니다.
   */
  public start: Date;

  /**
   * @property {Date} end
   * @description 범위의 종료 날짜를 저장합니다.
   */
  public end: Date;

  /**
   * @property {Date} endNext
   * @description 범위의 다음 날 자정을 저장합니다.
   * 종료 날짜의 다음 날 00:00:00을 저장하여 날짜 범위 검사를 용이하게 합니다.
   */
  public endNext: Date;

  /**
   * @constructor
   * @description DateRange 클래스의 생성자입니다. 시작 날짜와 종료 날짜를 받아, endNext를 종료 날짜의 다음 날 자정으로 설정합니다.
   * @param {Date} start - 범위의 시작 날짜입니다.
   * @param {Date} end - 범위의 종료 날짜입니다.
   */
  constructor(start: Date, end: Date) {
    this.start = start; // 시작 날짜를 설정합니다.
    this.end = end; // 종료 날짜를 설정합니다.

    /**
     * @description 종료 날짜의 다음 날 00:00:00을 설정하여 endNext에 저장합니다.
     * endNext는 종료 날짜의 다음 날 자정을 나타내며, 이를 통해 범위 검사 시 포함되지 않는 날짜를 처리할 수 있습니다.
     */
    this.endNext = new Date(end.getFullYear(), end.getMonth(), end.getDate(), 0, 0, 0);
    this.endNext.setDate(this.endNext.getDate() + 1); // 종료 날짜에 1일을 더하여 endNext를 설정합니다.
  }

  /**
   * @method rangeMatch
   * @description 주어진 날짜가 설정된 날짜 범위 내에 있는지 확인하는 메서드입니다.
   * @param {Date} targetDate - 확인할 대상 날짜입니다.
   * @returns {boolean} - 대상 날짜가 범위 내에 있으면 true, 그렇지 않으면 false를 반환합니다.
   */
  rangeMatch = (targetDate: Date): boolean => {
    /**
     * @description boo0는 시작 날짜보다 대상 날짜가 크거나 같은지 확인합니다.
     * @type {boolean}
     */
    let boo0: boolean = (this.start.valueOf() <= targetDate.valueOf());

    /**
     * @description boo1은 종료 날짜의 다음 날 자정보다 대상 날짜가 작은지 확인합니다.
     * @type {boolean}
     */
    let boo1: boolean = (this.endNext.valueOf() > targetDate.valueOf());

    /**
     * @returns {boolean} 시작 날짜보다 크거나 같고, 종료 날짜의 다음 날 자정보다 작으면 true를 반환합니다.
     */
    return (boo0 && boo1); // 대상 날짜가 범위 내에 있는지 여부를 반환합니다.
  }
}

export { DateRange };