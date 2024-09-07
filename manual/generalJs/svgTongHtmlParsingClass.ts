import { Dictionary, StringDictionary } from "./dictionary";
import { SvgTongListClass } from "./svgTongListClass";

class SvgTongHtmlParsingClass {
  public attribute: Dictionary;
  public src: string;
  public id: string;
  public style: object;
  public events: Array<object>;
  public classList: SvgTongListClass;

  constructor () {
    this.attribute = {};
    this.src = "";
    this.id = "";
    this.style = {};
    this.events = [];
    this.classList = new SvgTongListClass();
  }

  public setAttribute = (key: string, value: string): void => {
    this.attribute[key] = value;
  }

  public getAttribute = (key: string): string => {
    return this.attribute[key];
  }

  public addEventListener = (eventName: string, callback: (event: object) => void): void => {
    interface ListedEvent {
      name: string;
      callback(event: object): void;
    }
    const obj: ListedEvent = {
      name: eventName,
      callback: callback,
    };
    this.events.push(obj);
  }
}

export { SvgTongHtmlParsingClass };