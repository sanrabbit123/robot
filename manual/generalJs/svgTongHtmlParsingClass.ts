import { Dictionary, StringDictionary } from "./dictionary";
import { SvgTongListClass } from "./svgTongListClass";

/**
 * @class SvgTongHtmlParsingClass
 * @description HTML 요소와 관련된 속성(attribute), 이벤트(event), 클래스 리스트 등을 관리하는 클래스입니다.
 */
class SvgTongHtmlParsingClass {
  /**
   * @property {Dictionary} attribute
   * @description HTML 요소의 속성을 저장하는 객체입니다. key-value 쌍으로 속성을 정의합니다.
   */
  public attribute: Dictionary;

  /**
   * @property {string} src
   * @description 요소의 소스 URL을 저장하는 문자열입니다.
   */
  public src: string;

  /**
   * @property {string} id
   * @description 요소의 ID를 저장하는 문자열입니다.
   */
  public id: string;

  /**
   * @property {object} style
   * @description 요소의 스타일을 저장하는 객체입니다.
   */
  public style: object;

  /**
   * @property {Array<object>} events
   * @description 요소에 연결된 이벤트 객체들을 저장하는 배열입니다.
   */
  public events: Array<object>;

  /**
   * @property {SvgTongListClass} classList
   * @description HTML 요소의 클래스 리스트를 관리하는 SvgTongListClass 인스턴스입니다.
   */
  public classList: SvgTongListClass;

  /**
   * @constructor
   * @description 클래스의 생성자입니다. 속성(attribute), 소스(src), ID, 스타일, 이벤트 배열, 클래스 리스트를 초기화합니다.
   */
  constructor() {
    this.attribute = {}; // HTML 속성을 빈 객체로 초기화합니다.
    this.src = ""; // 요소의 소스 URL을 빈 문자열로 초기화합니다.
    this.id = ""; // 요소의 ID를 빈 문자열로 초기화합니다.
    this.style = {}; // 스타일 객체를 빈 객체로 초기화합니다.
    this.events = []; // 이벤트 배열을 빈 배열로 초기화합니다.
    this.classList = new SvgTongListClass(); // SvgTongListClass의 인스턴스를 생성하여 클래스 리스트를 관리합니다.
  }

  /**
   * @method setAttribute
   * @description 요소의 속성(attribute)을 설정하는 메서드입니다.
   * @param {string} key - 속성의 이름입니다.
   * @param {string} value - 속성의 값입니다.
   * @returns {void}
   */
  public setAttribute = (key: string, value: string): void => {
    this.attribute[key] = value; // 주어진 키와 값을 사용하여 속성을 설정합니다.
  }

  /**
   * @method getAttribute
   * @description 요소의 속성(attribute) 값을 가져오는 메서드입니다.
   * @param {string} key - 가져올 속성의 이름입니다.
   * @returns {string} - 해당 속성의 값입니다.
   */
  public getAttribute = (key: string): string => {
    return this.attribute[key]; // 주어진 키에 해당하는 속성 값을 반환합니다.
  }

  /**
   * @method addEventListener
   * @description 요소에 이벤트 리스너를 추가하는 메서드입니다.
   * @param {string} eventName - 이벤트 이름입니다.
   * @param {Function} callback - 이벤트 발생 시 실행할 콜백 함수입니다.
   * @returns {void}
   */
  public addEventListener = (eventName: string, callback: (event: object) => void): void => {
    /**
     * @interface ListedEvent
     * @description 이벤트 이름과 콜백 함수를 포함하는 객체입니다.
     */
    interface ListedEvent {
      name: string;
      callback(event: object): void;
    }

    // 이벤트 객체를 생성하여 이벤트 이름과 콜백 함수를 저장합니다.
    const obj: ListedEvent = {
      name: eventName, // 이벤트 이름을 저장합니다.
      callback: callback, // 이벤트 발생 시 실행할 콜백 함수를 저장합니다.
    };

    // 이벤트 객체를 events 배열에 추가합니다.
    this.events.push(obj);
  }
}

export { SvgTongHtmlParsingClass };