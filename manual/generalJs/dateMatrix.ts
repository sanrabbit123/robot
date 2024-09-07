class DateMatrix {
  public year: number;
  public month: number;
  public matrix: any;

  constructor (year: number, month: number) {
    this.year = year;
    this.month = month;
    this.matrix = null;
  }

  public getYearString = (): string => {
    return String(this.year) + "년";
  }
  
  public getMonthString = (): string => {
    return String(this.month + 1) + "월";
  }
  
  public getMatrix = () => {
    return this.matrix;
  }
  
  public getNormalMatrix = (): any[] => {
    let justTong: any[], justArr: any[];
    justTong = [];
    justArr = [];
    for (let arr of this.matrix) {
      justArr = [];
      for (let obj of arr) {
        if (obj === null) {
          justArr.push(null);
        } else {
          justArr.push(obj.date);
        }
      }
      justTong.push(justArr);
    }
    return justTong;
  }
  
  public getDateArr = (): any[] => {
    let justTong: any[];
    justTong = [];
    for (let arr of this.matrix) {
      for (let obj of arr) {
        if (obj !== null) {
          justTong.push(obj);
        }
      }
    }
    return justTong;
  }
  
  public nextMatrix = (): DateMatrix => {
    if (this.month === 11) {
      return getDateMatrix(this.year + 1, 0);
    } else {
      return getDateMatrix(this.year, this.month + 1);
    }
  }
  
  public previousMatrix = (): DateMatrix => {
    if (this.month === 0) {
      return getDateMatrix(this.year - 1, 11);
    } else {
      return getDateMatrix(this.year, this.month - 1);
    }
  }
  
  public nextSundayMatrix = (): DateMatrix => {
    if (this.month === 11) {
      return getDateMatrix(this.year + 1, 0).sundayConvert();
    } else {
      return getDateMatrix(this.year, this.month + 1).sundayConvert();
    }
  }
  
  public previousSundayMatrix = (): DateMatrix => {
    if (this.month === 0) {
      return getDateMatrix(this.year - 1, 11).sundayConvert();
    } else {
      return getDateMatrix(this.year, this.month - 1).sundayConvert();
    }
  }
  
  public yearMatrix = (): any[] => {
    let arr: any[] = [];
    let tempObj: any;
    for (let i = 0; i < 12; i++) {
      tempObj = getDateMatrix(this.year, i);
      arr.push(tempObj);
    }
    return arr;
  }
  
  public nextYearMatrix = () => {
    let arr: any[] = [];
    for (let i = 0; i < 12; i++) {
      arr.push(getDateMatrix(this.year + 1, i));
    }
    return arr;
  }
  
  public previousYearMatrix = () => {
    let arr: any[] = [];
    for (let i = 0; i < 12; i++) {
      arr.push(getDateMatrix(this.year - 1, i));
    }
    return arr;
  }
  
  public rangeMatrix = (range: number = 3): any[] => {
    let arr: any[] = [];
    let tempMatrix: DateMatrix;
  
    tempMatrix = this.previousMatrix();
    arr.unshift(tempMatrix);
    for (let i = 1; i < range; i++) {
      tempMatrix = tempMatrix.previousMatrix();
      arr.unshift(tempMatrix);
    }
  
    arr.push(this);
  
    tempMatrix = this.nextMatrix();
    arr.push(tempMatrix);
    for (let i = 1; i < range; i++) {
      tempMatrix = tempMatrix.nextMatrix();
      arr.push(tempMatrix);
    }
  
    return arr;
  }
  
  public returnSundayMatrix = (): any[] => {
    let arr: any[], boo: boolean;
    let tempArr: any[];
    let tong: any[];
    let length: number;
  
    tempArr = [];

    arr = [];
    for (let matrix of this.matrix) {
      for (let i of matrix) {
        arr.push(i);
      }
    }
    arr.unshift(null);
  
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
  
    if (tong[tong.length - 1].length === 0) {
      tong.pop();
    }
  
    length = tong[tong.length - 1].length;
    if (length !== 7) {
      for (let i = 0; i < 7 - length; i++) {
        tong[tong.length - 1].push(null);
      }
    }
  
    boo = true;
    for (let i = 0; i < 7; i++) {
      if (tong[tong.length - 1][i] !== null) {
        boo = false;
      }
    }
  
    if (boo) {
      tong.pop();
    }
  
    return tong;
  }
  
  public sundayConvert = (): DateMatrix => {
    const newObj: DateMatrix = new DateMatrix(this.year, this.month);
    newObj.matrix = this.returnSundayMatrix();
    return newObj;
  }
  
}

class DateFactor {
  public year: any;
  public month: any;
  public date: any;
  public day: string;
  public dateObject: Date;
  public dayday: number;

  constructor (year: any, month: any, date: any, index: number) {
    this.year = year;
    this.month = month;
    this.date = date;
    this.day = ([ '월', '화', '수', '목', '금', '토', '일' ])[index];
    this.dateObject = new Date(year, month, date);
    this.dayday = this.dateObject.getDay()
  }

  public getDateString = (): string => {
    const zeroAddition = (num: number | string): string => {
      if (typeof num === 'string') {
        if (Number.isNaN(Number(num))) {
          throw new Error("invaild type");
        } else {
          num = Number(num);
        }
      }
      if (num < 10) {
        return '0' + String(num);
      } else {
        return String(num);
      }
    }
    return (String(this.year) + '-' + zeroAddition(this.month + 1) + '-' + zeroAddition(this.date));  
  }
}

const getDateMatrix = (year: any, month: any): DateMatrix => {
  let tempObj: any;
  let tempArr: any;
  let tempArr2: any;
  let tempArr3: any;

  if (year === "today" || (year === undefined && month === undefined)) {
    tempObj = new Date();
    year = tempObj.getFullYear();
    month = tempObj.getMonth();
  } else if (typeof year === "string" && month === undefined && /\-/g.test(year)) {
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
  } else if (typeof year === "object") {
    month = year.getMonth();
    year = year.getFullYear();
  }

  const getLastDate = (year: number, month: number): number => {
    const today: Date = new Date(year, month, 1);
    let newMonth: number, lastDate: number;
    lastDate = -1;
    for (let i = 27; i < 33; i++) {
      today.setDate(i);
      newMonth = today.getMonth();
      if (month !== newMonth) {
        lastDate = i - 1;
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

  result = new DateMatrix(year, month);
  tong = [];
  arr = [];

  if (firstDay !== 0) {
    for (let i = 0; i < firstDay - 1; i++) {
      arr.push(null);
    }
  } else {
    for (let i = 0; i < 6; i++) {
      arr.push(null);
    }
  }

  for (let i = firstDate; i < lastDate + 1; i++) {
    tempDate = new Date(year, month, i);
    arr.push(tempDate.getDay());
    if (arr.length % 7 === 0) {
      tong.push(arr);
      arr = [];
    }
  }

  if (arr.length !== 7 && arr.length !== 0) {
    pastLength = arr.length;
    for (let i = 0; i < 7 - pastLength; i++) {
      arr.push(null);
    }
    tong.push(arr);
  }

  num = 1;
  for (let arr of tong) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== null) {
        arr[i] = new DateFactor(year, month, num, i);
        num++;
      }
    }
  }

  result.matrix = tong;

  return result;
}

export { DateMatrix, DateFactor };