import { Dictionary, StringDictionary } from "./dictionary";
import { SvgTongHtmlParsingClass } from "./svgTongHtmlParsingClass";

class SvgTong {
  constructor () {}

  public static tongMaker (): SvgTongHtmlParsingClass {
    let obj: SvgTongHtmlParsingClass = new SvgTongHtmlParsingClass();
    return obj;
  }
  
  public static stringParsing (str: string): SVGElement {
    const resultDom = new DOMParser().parseFromString(str, "image/svg+xml");
    const children: HTMLCollection = resultDom.children;
    return children[0] as SVGElement;
  }
  
  public static getRatio (svgString: string | SVGElement): number {
    let svgDom: SVGElement;
    let viewBoxString: string;
    let viewBoxArr: Array<string>;

    if (typeof svgString === "string") {
      svgDom = SvgTong.stringParsing(svgString);
    } else {
      svgDom = svgString;
    }

    viewBoxString = String(svgDom.getAttribute("viewBox"));
    if (viewBoxString === "null") {
      return -1;
    }
    viewBoxArr = viewBoxString.split(' ');
  
    return (Number(viewBoxArr[2]) / Number(viewBoxArr[3]));
  }

}

export { SvgTong };