/**
 * @class SvgTongListClass
 * @description svg source에 쓰이는 문자열 리스트를 관리하는 클래스입니다. 
 * 이 클래스는 문자열을 저장하고 추가하는 기능을 제공합니다.
 */
class SvgTongListClass {
  /**
   * @property {string[]} list
   * @description 문자열을 저장하는 배열입니다.
   * 클래스 인스턴스가 생성될 때 빈 배열로 초기화됩니다.
   */
  public list: string[];

  /**
   * @constructor
   * @description 클래스의 생성자입니다. list 배열을 빈 배열로 초기화합니다.
   */
  constructor () {
    this.list = []; // 문자열을 저장할 list 배열을 빈 배열로 초기화합니다.
  }

  /**
   * @method add
   * @description 리스트에 문자열을 추가하는 메서드입니다.
   * @param {string} str - 추가할 문자열입니다.
   * @returns {void}
   */
  add = (str: string): void => {
    /**
     * @description list 배열에 전달된 문자열을 추가합니다.
     */
    this.list.push(str); // 리스트 배열에 문자열을 추가합니다.
  }
}

export { SvgTongListClass };