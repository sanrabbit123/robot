class DateRange {
  public start: Date;
  public end: Date;
  public endNext: Date;

  constructor (start: Date, end: Date) {
    this.start = start;
    this.end = end;
    this.endNext = new Date(end.getFullYear(), end.getMonth(), end.getDate(), 0, 0, 0);
    this.endNext.setDate(this.endNext.getDate() + 1);
  }

  rangeMatch = (targetDate: Date): boolean => {
    let boo0: boolean, boo1: boolean;
    boo0 = (this.start.valueOf() <= targetDate.valueOf());
    boo1 = (this.endNext.valueOf() > targetDate.valueOf());
    return (boo0 && boo1);
  }
}

export { DateRange };