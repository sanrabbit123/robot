class DateParse extends Date {
  constructor(dateString) {
    if (/^9/.test(dateString)) {
      super("1001/01/01");
    } else {
      super(dateString);
    }
  }

  static zeroAddition(number) {
    if (number > 9) {
      return String(number);
    } else {
      return '0' + String(number);
    }
  }

  toNormal(detail = false) {
    const year = this.getFullYear();
    const month = this.getMonth() + 1;
    const day = this.getDate();
    const hours = this.getHours();
    const minutes = this.getMinutes();
    const seconds = this.getSeconds();
    if (detail) {
      if (year === 1001) {
        return "9999-09-09";
      } else {
        return (DateParse.zeroAddition(year) + "-" + DateParse.zeroAddition(month) + "-" + DateParse.zeroAddition(day) + " " + DateParse.zeroAddition(hours) + ":" + DateParse.zeroAddition(minutes) + ":" + DateParse.zeroAddition(seconds));
      }
    } else {
      if (year === 1001) {
        return "9999-09-09";
      } else {
        return (DateParse.zeroAddition(year) + "-" + DateParse.zeroAddition(month) + "-" + DateParse.zeroAddition(day));
      }
    }
  }

  toSixString() {
    let date = this.toNormal(false);
    return (date.slice(2, 4) + date.slice(5, 7) + date.slice(8, 10));
  }



}

module.exports = DateParse;
