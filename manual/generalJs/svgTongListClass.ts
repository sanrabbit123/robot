class SvgTongListClass {
  public list: string[];
  constructor () {
    this.list = [];
  }
  add = (str: string): void => {
    this.list.push(str);
  }
}

export { SvgTongListClass };