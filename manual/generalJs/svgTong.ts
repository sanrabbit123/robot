import { Dictionary, StringDictionary } from "./dictionary";
import { SvgTongHtmlParsingClass } from "./svgTongHtmlParsingClass";

/**
 * @class SvgTong
 * @description SVG DOM을 생성하고 관리하는 데 사용되는 클래스입니다. SVG 문자열을 파싱하고 비율을 계산하는 등의 작업을 수행합니다.
 */
class SvgTong {
  /**
   * @constructor
   * @description SvgTong 클래스의 생성자입니다. 이 클래스는 정적 메서드를 주로 사용하므로 생성자는 특별한 역할을 하지 않습니다.
   */
  constructor () {}

  /**
   * @method tongMaker
   * @description 새로운 SvgTongHtmlParsingClass 인스턴스를 생성하는 메서드입니다.
   * 이 메서드는 SVG 요소와 관련된 속성 및 이벤트를 관리하는 인스턴스를 반환합니다.
   * @returns {SvgTongHtmlParsingClass} - 새로운 SvgTongHtmlParsingClass 인스턴스를 반환합니다.
   */
  public static tongMaker(): SvgTongHtmlParsingClass {
    /**
     * @description SvgTongHtmlParsingClass의 인스턴스를 생성합니다.
     */
    let obj: SvgTongHtmlParsingClass = new SvgTongHtmlParsingClass();
    return obj; // 생성된 SvgTongHtmlParsingClass 인스턴스를 반환합니다.
  }
  
  /**
   * @method stringParsing
   * @description 주어진 SVG 문자열을 파싱하여 SVGElement로 변환하는 메서드입니다.
   * DOMParser를 사용하여 문자열을 파싱한 후 첫 번째 SVGElement를 반환합니다.
   * @param {string} str - 파싱할 SVG 문자열입니다.
   * @returns {SVGElement} - 파싱된 SVG 요소를 반환합니다.
   */
  public static stringParsing(str: string): SVGElement {
    /**
     * @description DOMParser를 사용하여 주어진 문자열을 SVG DOM으로 파싱합니다.
     */
    const resultDom = new DOMParser().parseFromString(str, "image/svg+xml");
    
    /**
     * @description 파싱된 결과의 첫 번째 자식 요소를 가져옵니다.
     * @type {HTMLCollection}
     */
    const children: HTMLCollection = resultDom.children;

    /**
     * @returns {SVGElement} 첫 번째 자식 요소를 SVGElement로 반환합니다.
     */
    return children[0] as SVGElement; // 첫 번째 SVGElement를 반환합니다.
  }
  
  /**
   * @method getRatio
   * @description 주어진 SVG 문자열 또는 SVGElement에서 viewBox 비율을 계산하는 메서드입니다.
   * viewBox 속성을 가져와 너비와 높이의 비율을 계산합니다.
   * @param {string | SVGElement} svgString - 비율을 계산할 SVG 문자열 또는 SVGElement입니다.
   * @returns {number} - viewBox의 너비와 높이의 비율을 반환합니다. viewBox가 없으면 -1을 반환합니다.
   */
  public static getRatio(svgString: string | SVGElement): number {
    /**
     * @description SVG 문자열이 주어지면 이를 SVGElement로 파싱하고, 그렇지 않으면 그대로 사용합니다.
     * @type {SVGElement}
     */
    let svgDom: SVGElement;

    /**
     * @description viewBox 속성을 문자열로 저장합니다.
     * @type {string}
     */
    let viewBoxString: string;

    /**
     * @description viewBox 속성을 배열로 저장합니다.
     * @type {Array<string>}
     */
    let viewBoxArr: Array<string>;

    // svgString이 문자열이면 파싱하여 SVGElement로 변환하고, 그렇지 않으면 그대로 사용합니다.
    if (typeof svgString === "string") {
      svgDom = SvgTong.stringParsing(svgString); // SVG 문자열을 파싱하여 SVGElement로 변환합니다.
    } else {
      svgDom = svgString; // 이미 SVGElement인 경우 그대로 사용합니다.
    }

    // viewBox 속성을 가져옵니다.
    viewBoxString = String(svgDom.getAttribute("viewBox"));
    if (viewBoxString === "null") {
      return -1; // viewBox 속성이 없으면 -1을 반환합니다.
    }

    // viewBox 문자열을 공백으로 분리하여 배열로 변환합니다.
    viewBoxArr = viewBoxString.split(' ');

    // 너비와 높이의 비율을 계산하여 반환합니다.
    return (Number(viewBoxArr[2]) / Number(viewBoxArr[3])); // viewBox의 너비와 높이의 비율을 반환합니다.
  }
}

export { SvgTong };