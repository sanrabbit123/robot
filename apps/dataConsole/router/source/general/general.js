

class DateParse extends Date {
  constructor(dateObject) {
    let tempArr0, tempArr1, tempArr2;
    if (typeof dateObject === "string") {
      if (dateObject.length === 19) {
        tempArr0 = dateObject.split(" ");
        tempArr1 = tempArr0[0].split("-");
        tempArr2 = tempArr0[1].split(":");
        super(new Date(Number(tempArr1[0]), Number(tempArr1[1]) - 1, Number(tempArr1[2]), Number(tempArr2[0]), Number(tempArr2[1]), Number(tempArr2[2])));
      } else if (dateObject.length === 10) {
        tempArr1 = dateObject.split("-");
        super(new Date(Number(tempArr1[0]), Number(tempArr1[1]) - 1, Number(tempArr1[2])));
      } else {
        throw new Error("invalid date object");
      }
    } else {
      super(dateObject.toISOString());
    }
  }
  static zeroAddition(number) {
    if (number > 9) {
      return String(number);
    } else {
      return '0' + String(number);
    }
  }
  toString(detail = false) {
    const year = this.getFullYear();
    const month = this.getMonth() + 1;
    const day = this.getDate();
    const hours = this.getHours();
    const minutes = this.getMinutes();
    const seconds = this.getSeconds();
    if (detail) {
      if (year === 1800) {
        return "1800-01-01";
      } else {
        return (DateParse.zeroAddition(year) + "-" + DateParse.zeroAddition(month) + "-" + DateParse.zeroAddition(day) + " " + DateParse.zeroAddition(hours) + ":" + DateParse.zeroAddition(minutes) + ":" + DateParse.zeroAddition(seconds));
      }
    } else {
      if (year === 1800) {
        return "1800-01-01";
      } else {
        return (DateParse.zeroAddition(year) + "-" + DateParse.zeroAddition(month) + "-" + DateParse.zeroAddition(day));
      }
    }
  }
}

GeneralJs.confirmKey = [
  "Enter",
  "Tab",
];

GeneralJs.updateHistoryTong = [];

GeneralJs.idOrderDecode = function (number) {
  const abc = `[ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z" ]`;
  const ABC = JSON.parse(abc);
  let text = '';
  let target, index0, index1, result;

  target = number.replace(/[a-z]$/, '').split("_")[1];

  index0 = 0;
  index1 = 0;
  for (let i = 0; i < ABC.length; i++) {
    if (ABC[i] === target[0]) {
      index0 = i;
    }
    if (ABC[i] === target[1]) {
      index1 = i;
    }
  }
  result = (index0 * 100 * 26) + (index1 * 100) + (Number(target[2]) * 10) + (Number(target[3]) * 1);
  result = (Number(number.split('_')[0].replace(/[^0-9]/g, '')) * 100000) + result;

  return result;
}

GeneralJs.vaildValue = function (column, value, pastValue) {
  const cookies = JSON.parse(window.localStorage.getItem("GoogleClientProfile"));
  try {
    let map;
    let filteredValue;
    let finalValue, valueTemp;
    let tempBoo, tempFunction;
  
    if (GeneralJs.stacks["homeliaisonMember"] === undefined) {
      throw new Error("member stacks error : " + JSON.stringify(cookies));
    }
    if (!GeneralJs.stacks["homeliaisonMember"].roles.includes("CX")){
      window.alert("CX 팀원 외에는 업데이트를 실행할 수 없습니다!");
      throw new Error("member roles error : " + JSON.stringify(cookies));
    }
  
    if (window.location.pathname === "/client") {
      map = DataPatch.clientMap();
    } else if (window.location.pathname === "/designer") {
      map = DataPatch.designerMap();
    } else if (window.location.pathname === "/project") {
      map = DataPatch.projectMap();
    } else if (window.location.pathname === "/contents") {
      map = DataPatch.contentsMap();
    }
  
    switch (map[column].type) {
      case "string":
        finalValue = String(value).replace(/[\&\=]/g, '').trim();
        break;
      case "number":
        if (typeof value !== "number") {
          if (Number.isNaN(Number(value.replace(/[^0-9\.\-]/g, '')))) {
            finalValue = Number(pastValue.replace(/[^0-9\.\-]/g, ''));
          } else {
            finalValue = Number(value.replace(/[^0-9\.\-]/g, ''));
          }
        } else {
          finalValue = value;
        }
        break;
      case "date":
        if (value === "-" || value === "") {
          filteredValue = "-";
          finalValue = "-";
        } else if (/예정/g.test(value)) {
          finalValue = "예정";
        } else {
          filteredValue = DataPatch.toolsDateFilter(value);
          if (map[column].detailDate === undefined) {
            if (/^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]/g.test(filteredValue)) {
              finalValue = filteredValue;
            } else {
              finalValue = pastValue;
            }
          } else {
            if (/^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]$/g.test(filteredValue)) {
              finalValue = filteredValue + " " + (pastValue.split(' '))[1];
            } else if (/^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9] [0-9][0-9]\:[0-9][0-9]\:[0-9][0-9]/g.test(filteredValue)) {
              finalValue = filteredValue;
            } else {
              finalValue = pastValue;
            }
          }
        }
        break;
      case "boolean":
        finalValue = value;
        break;
      case "array":
        finalValue = value;
        break;
      case "object":
        tempFunction = new Function("value", "pastValue", "vaildMode", map[column].objectFunction);
        tempBoo = tempFunction(value, pastValue, true);
        if (tempBoo.boo) {
          if (tempBoo.value !== null) {
            finalValue = tempBoo.value;
          } else {
            finalValue = value;
          }
        } else {
          finalValue = pastValue;
        }
        break;
      case "null":
        finalValue = pastValue;
      case "constant":
        finalValue = pastValue;
      case "link":
        if (/[\=\&]/g.test(value)) {
          finalValue = window.encodeURIComponent(value);
        } else {
          finalValue = value;
        }
        break;
      default:
        throw new Error("invaild type");
    }
  
    return finalValue;
  } catch (e) {
    GeneralJs.ajax("message=update ban : " + e.message + "&channel=#error_log", "/sendSlack", function () {});
    window.location.href = FRONTHOST;
  }
}

GeneralJs.updateValue = async function (dataObj) {
  if (dataObj === undefined) {
    throw new Error("invaild arguments");
  }
  if (window.localStorage.getItem("GoogleClientProfile") === null) {
    throw new Error("not allowed");
  }
  const instance = this;
  const cookies = JSON.parse(window.localStorage.getItem("GoogleClientProfile"));
  try {
    let dataString, response;

    if (cookies.homeliaisonConsoleLoginedName !== undefined && cookies.homeliaisonConsoleLoginedEmail !== undefined) {
      //set user
      dataObj.user = cookies.homeliaisonConsoleLoginedName + "__split__" + cookies.homeliaisonConsoleLoginedEmail;
    } else {
      //set user
      dataObj.user = "unknown" + "__split__" + "unknown@unknown";
    }

    if (GeneralJs.stacks["homeliaisonMember"] === undefined) {
      throw new Error("member stacks error : " + JSON.stringify(cookies));
    }
    if (!GeneralJs.stacks["homeliaisonMember"].roles.includes("CX")){
      window.alert("CX 팀원 외에는 업데이트를 실행할 수 없습니다!");
      throw new Error("member roles error : " + JSON.stringify(cookies));
    }

    GeneralJs.updateHistoryTong.unshift(dataObj);
    dataString = GeneralJs.objectToRawquery(dataObj);

    if (window.location.pathname === "/client") {
      response = JSON.parse(await GeneralJs.ajaxPromise(dataString, "/updateClient"));
    } else if (window.location.pathname === "/designer") {
      response = JSON.parse(await GeneralJs.ajaxPromise(dataString, "/updateDesigner"));
    } else if (window.location.pathname === "/project") {
      response = JSON.parse(await GeneralJs.ajaxPromise(dataString, "/updateProject"));
    } else if (window.location.pathname === "/contents") {
      response = JSON.parse(await GeneralJs.ajaxPromise(dataString, "/updateContents"));
    }

    if (response.message !== "success") {
      throw new Error("update error");
    }

    //gray left reload
    if (GeneralJs.stacks["grayLeftButton"] !== undefined && GeneralJs.stacks["grayLeftButton"] !== null) {
      if (GeneralJs.stacks["grayLeftButton"].getAttribute("set") !== "off") {
        if (GeneralJs.stacks["grayTitle"] !== null && GeneralJs.stacks["grayData"] !== null) {
          GeneralJs.grayLeftLaunching(true, GeneralJs.stacks["grayTitle"], GeneralJs.stacks["grayData"]).call(GeneralJs.stacks["grayLeftButton"], {});
        }
      }
    }

    //dashboard reload
    if (GeneralJs.stacks["dashboardBoxBoo"]) {
      let pathArr = window.location.pathname.split("?");
      let thisPathName = pathArr[0].replace(/\//g, '');
      const { standardColumn } = DataPatch.toolsDashboard(thisPathName);
      if (standardColumn.includes(dataObj.column)) {
        GeneralJs.timeouts["dashboardBoxUpdate"] = setTimeout(function () {
          GeneralJs.dashboardBoxLaunching(GeneralJs.stacks["dashboardBox"], true);
          clearTimeout(GeneralJs.timeouts["dashboardBoxUpdate"]);
          GeneralJs.timeouts["dashboardBoxUpdate"] = null;
        }, 301);
      }
    }

    return response.message;

  } catch (e) {
    GeneralJs.ajax("message=update ban : " + e.message + "&channel=#error_log", "/sendSlack", function () {});
    window.location.href = FRONTHOST;
  }
}

GeneralJs.returnValue = async function () {
  const instance = this;
  try {
    let pastObj, copiedObj;
    let dataString, response;

    if (GeneralJs.updateHistoryTong.length === 0) {
      return "pass";
    } else {
      pastObj = GeneralJs.updateHistoryTong.shift();
      copiedObj = JSON.parse(JSON.stringify(pastObj));
      delete copiedObj.value;
      copiedObj.value = copiedObj.pastValue;
      dataString = GeneralJs.objectToRawquery(copiedObj);

      if (window.location.pathname === "/client") {
        response = JSON.parse(await GeneralJs.ajaxPromise(dataString, "/updateClient"));
      } else if (window.location.pathname === "/designer") {
        response = JSON.parse(await GeneralJs.ajaxPromise(dataString, "/updateDesigner"));
      } else if (window.location.pathname === "/project") {
        response = JSON.parse(await GeneralJs.ajaxPromise(dataString, "/updateProject"));
      } else if (window.location.pathname === "/contents") {
        response = JSON.parse(await GeneralJs.ajaxPromise(dataString, "/updateContents"));
      }

      if (response.message !== "success") {
        throw new Error("return error");
      }

      return copiedObj;
    }

  } catch (e) {
    GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
    console.log(e);
  }
}

GeneralJs.queryFilter = function (str) {
  return str.replace(/ &/g, ',').replace(/&/g, ',').replace(/=/g, '');
}

GeneralJs.compareDate = function (date) {
  const today = new Date();
  let todayYear, todayMonth, todayDate;
  let targetYear, targetMonth, targetDate;
  let tempArr;

  todayYear = today.getFullYear();
  todayMonth = today.getMonth();
  todayDate = today.getDate();

  if (typeof date === "string") {
    tempArr = date.split('-');
    targetYear = Number(tempArr[0]);
    targetMonth = Number(tempArr[1].replace(/^0/, '')) - 1;
    targetDate = Number(tempArr[2].replace(/^0/, ''));
  } else {
    targetYear = date.getFullYear();
    targetMonth = date.getMonth();
    targetDate = date.getDate();
  }

  if (((todayYear * 12) + todayMonth) > ((targetYear * 12) + targetMonth)) {
    return false;
  } else if (((todayYear * 12) + todayMonth) === ((targetYear * 12) + targetMonth)) {
    if (todayDate > targetDate) {
      return false;
    } else {
      return true;
    }
  } else {
    return true;
  }
}

GeneralJs.tagParsing = function (target) {
  let arr0, arr1;
  let result_arr0 = []
  let result_arr1 = []
  let result_obj = {}

  function simple(str) {
    let obj = {}
    for (let i of str.split("__split1__")) {
      obj[i.split("__split2__")[0]] = i.split("__split2__")[1];
    }
    return obj;
  }

  if (target.search(/__split4__/g) !== -1) {
    arr0 = target.split("__split4__");
    for (let a of arr0) {
      arr1 = a.split("__split3__");
      for (let b of arr1) {
        result_arr1.push(simple(b));
      }
      result_arr0.push(result_arr1);
    }
    return result_arr0;

  } else if (target.search(/__split3__/g) !== -1) {
    arr0 = target.split("__split3__");
    for (let a of arr0) {
      result_arr0.push(simple(a));
    }
    return result_arr0;

  } else {
    return simple(target)
  }
}

GeneralJs.tagCoverting = function (obj) {
  let keyArr = Object.keys(obj);
  let str = '';
  for (let i of keyArr) {
    if (typeof obj[i] === "string") {
      str += i + "__split2__" + obj[i];
      str += "__split1__";
    } else if (typeof obj[i] === "number") {
      str += i + "__split2__" + String(obj[i]);
      str += "__split1__";
    }
  }
  str = str.slice(0, -10);
  return str;
}

GeneralJs.calculationWordWidth = function (fontSize, word, rawOption = false) {
  const filter = function (obj) {
    const { number, space, sub, word } = obj;
    return (word * 1) + (number * 0.6) + (space * 0.18) + (sub * 0.2);
  }
  let temp;

  temp = {};
  temp.total = word.length;
  temp.number = word.replace(/[^0-9a-z]/g, '').length;
  temp.space = word.replace(/[^ ]/g, '').length;
  temp.sub = word.replace(/[^\.\,\_\^\~\'\"\:\;\/\\\*\!\?]/g, '').length;
  temp.word = temp.total - temp.number - temp.space - temp.sub;

  if (!rawOption) {
    return (filter(temp) + 1.4) * fontSize;
  } else {
    return filter(temp) * fontSize;
  }
}

GeneralJs.calculationMenuWidth = function (fontSize, items) {
  let wordLengthArr;

  wordLengthArr = [];
  for (let i = 0; i < items.length; i++) {
    wordLengthArr.push(GeneralJs.calculationWordWidth(fontSize, items[i]));
  }
  wordLengthArr.sort((a, b) => { return b - a; });

  return wordLengthArr[0];
}

GeneralJs.moneyBoo = function (column) {
  let map;
  if (window.location.pathname === "/client") {
    map = DataPatch.clientMap();
  } else if (window.location.pathname === "/designer") {
    map = DataPatch.designerMap();
  } else if (window.location.pathname === "/project") {
    map = DataPatch.projectMap();
  } else if (window.location.pathname === "/contents") {
    map = DataPatch.contentsMap();
  }
  if (map[column] === undefined || map[column].moneyBoo === undefined) {
    return false;
  } else if (map[column].moneyBoo === true) {
    return true;
  } else {
    return false;
  }
}

GeneralJs.getUser = function () {
  const cookies = JSON.parse(window.localStorage.getItem("GoogleClientProfile"));
  return {
    name: cookies["homeliaisonConsoleLoginedName"],
    email: cookies["homeliaisonConsoleLoginedEmail"],
  };
}

GeneralJs.prototype.belowButtons = {
  arrow: {
    left: null,
    right: null,
  },
  square: {
    up: null,
    down: null,
    reportIcon: null,
    returnIcon: null,
  },
  naviIcons: {
    client: null,
    proposal: null,
    project: null,
    designer: null,
    contents: null,
    service: null
  },
  sub: {
    extractIcon: null,
    talkIcon: null,
  },
  moveArea: {
    left: null,
    right: null,
  }
}

GeneralJs.prototype.totalContents = document.getElementById("totalcontents");

GeneralJs.prototype.generalCss = function (justTextMode = false) {
  const styleTag = document.querySelector("style");
  const css = `
  @font-face {
      font-family: 'sandoll';
      src: url('/designSource/font/sandoll/AppleSDGothicNeoB00.woff2') format('woff2'),
          url('/designSource/font/sandoll/AppleSDGothicNeoB00.woff') format('woff');
      font-weight: 700;
      font-style: normal;
  }
  @font-face {
      font-family: 'sandoll';
      src: url('/designSource/font/sandoll/AppleSDGothicNeoR00.woff2') format('woff2'),
          url('/designSource/font/sandoll/AppleSDGothicNeoR00.woff') format('woff');
      font-weight: 400;
      font-style: normal;
  }
  @font-face {
      font-family: 'sandoll';
      src: url('/designSource/font/sandoll/AppleSDGothicNeoM00.woff2') format('woff2'),
          url('/designSource/font/sandoll/AppleSDGothicNeoM00.woff') format('woff');
      font-weight: 500;
      font-style: normal;
  }
  @font-face {
      font-family: 'sandoll';
      src: url('/designSource/font/sandoll/AppleSDGothicNeoEB00.woff2') format('woff2'),
          url('/designSource/font/sandoll/AppleSDGothicNeoEB00.woff') format('woff');
      font-weight: 800;
      font-style: normal;
  }
  @font-face {
      font-family: 'sandoll';
      src: url('/designSource/font/sandoll/AppleSDGothicNeoSB00.woff2') format('woff2'),
          url('/designSource/font/sandoll/AppleSDGothicNeoSB00.woff') format('woff');
      font-weight: 600;
      font-style: normal;
  }
  @font-face {
      font-family: 'sandoll';
      src: url('/designSource/font/sandoll/AppleSDGothicNeoUL00.woff2') format('woff2'),
          url('/designSource/font/sandoll/AppleSDGothicNeoUL00.woff') format('woff');
      font-weight: 200;
      font-style: normal;
  }
  @font-face {
      font-family: 'sandoll';
      src: url('/designSource/font/sandoll/AppleSDGothicNeoT00.woff2') format('woff2'),
          url('/designSource/font/sandoll/AppleSDGothicNeoT00.woff') format('woff');
      font-weight: 100;
      font-style: normal;
  }
  @font-face {
      font-family: 'sandoll';
      src: url('/designSource/font/sandoll/AppleSDGothicNeoH00.woff2') format('woff2'),
          url('/designSource/font/sandoll/AppleSDGothicNeoH00.woff') format('woff');
      font-weight: 900;
      font-style: normal;
  }
  @font-face {
      font-family: 'sandoll';
      src: url('/designSource/font/sandoll/AppleSDGothicNeoL00.woff2') format('woff2'),
          url('/designSource/font/sandoll/AppleSDGothicNeoL00.woff') format('woff');
      font-weight: 300;
      font-style: normal;
  }
  @font-face {
      font-family: 'Futura';
      src: url('/designSource/font/futura/Futura-Medium.woff2') format('woff2'),
          url('/designSource/font/futura/Futura-Medium.woff') format('woff');
      font-weight: 500;
      font-style: normal;
  }
  @font-face {
      font-family: 'Futura';
      src: url('/designSource/font/futura/Futura-Bold.woff2') format('woff2'),
          url('/designSource/font/futura/Futura-Bold.woff') format('woff');
      font-weight: 600;
      font-style: normal;
  }
  @font-face {
      font-family: 'graphik';
      src: url('/designSource/font/graphik/Graphik-Light.woff2') format('woff2'),
          url('/designSource/font/graphik/Graphik-Light.woff') format('woff');
      font-weight: 200;
      font-style: normal;
  }
  @font-face {
      font-family: 'graphik';
      src: url('/designSource/font/graphik/Graphik-LightItalic.woff2') format('woff2'),
          url('/designSource/font/graphik/Graphik-LightItalic.woff') format('woff');
      font-weight: 200;
      font-style: italic;
  }
  @font-face {
      font-family: 'graphik';
      src: url('/designSource/font/graphik/Graphik-Regular.woff2') format('woff2'),
          url('/designSource/font/graphik/Graphik-Regular.woff') format('woff');
      font-weight: 300;
      font-style: normal;
  }
  @font-face {
      font-family: 'graphik';
      src: url('/designSource/font/graphik/Graphik-RegularItalic.woff2') format('woff2'),
          url('/designSource/font/graphik/Graphik-RegularItalic.woff') format('woff');
      font-weight: 300;
      font-style: italic;
  }
  @font-face {
      font-family: 'graphik';
      src: url('/designSource/font/graphik/Graphik-Medium.woff2') format('woff2'),
          url('/designSource/font/graphik/Graphik-Medium.woff') format('woff');
      font-weight: 400;
      font-style: normal;
  }

  @font-face {
      font-family: 'graphik';
      src: url('/designSource/font/graphik/Graphik-MediumItalic.woff2') format('woff2'),
          url('/designSource/font/graphik/Graphik-MediumItalic.woff') format('woff');
      font-weight: 400;
      font-style: italic;
  }
  @font-face {
      font-family: 'graphik';
      src: url('/designSource/font/graphik/Graphik-Semibold.woff2') format('woff2'),
          url('/designSource/font/graphik/Graphik-Semibold.woff') format('woff');
      font-weight: 500;
      font-style: normal;
  }
  @font-face {
      font-family: 'graphik';
      src: url('/designSource/font/graphik/Graphik-SemiboldItalic.woff2') format('woff2'),
          url('/designSource/font/graphik/Graphik-SemiboldItalic.woff') format('woff');
      font-weight: 500;
      font-style: italic;
  }
  @font-face {
      font-family: 'graphik';
      src: url('/designSource/font/graphik/Graphik-Bold.woff2') format('woff2'),
          url('/designSource/font/graphik/Graphik-Bold.woff') format('woff');
      font-weight: 600;
      font-style: normal;
  }
  @font-face {
      font-family: 'graphik';
      src: url('/designSource/font/graphik/Graphik-BoldItalic.woff2') format('woff2'),
          url('/designSource/font/graphik/Graphik-BoldItalic.woff') format('woff');
      font-weight: 600;
      font-style: italic;
  }
  html{-webkit-text-size-adjust:100%;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing: grayscale;-ms-touch-action: manipulation;touch-action: manipulation;}
  *{margin:0;padding:0;transition:all 0.3s ease;font-family:'sandoll';-webkit-tap-highlight-color: transparent;}
  *::-webkit-scrollbar{display:none;}
  body{transition:all 0s ease;}
  input::placeholder {color:${(/home\-liaison\.com/gi.test(window.location.host) || /consulting/gi.test(window.location.pathname) || /evaluation/gi.test(window.location.pathname) || /reviewList/gi.test(window.location.pathname) ||  /portfolioList/gi.test(window.location.pathname) || /designerList/gi.test(window.location.pathname) || /designerBoard/gi.test(window.location.pathname) || /front/gi.test(window.location.pathname) || /miniAbout/gi.test(window.location.pathname) || /aspirantSubmit/gi.test(window.location.pathname)) ? GeneralJs.colorChip.black : GeneralJs.colorChip.white};opacity:0.5;}
  textarea::placeholder {color:${(/home\-liaison\.com/gi.test(window.location.host) || /consulting/gi.test(window.location.pathname) || /evaluation/gi.test(window.location.pathname) || /miniAbout/gi.test(window.location.pathname) || /frontAbout/gi.test(window.location.pathname) || /miniGuide/gi.test(window.location.pathname) || /miniRequest/gi.test(window.location.pathname) || /aspirantSubmit/gi.test(window.location.pathname)) ? GeneralJs.colorChip.black : GeneralJs.colorChip.white};opacity:0.5;}
  body,div{font-size:0;color:${GeneralJs.colorChip.black};margin:0;}
  a{text-decoration:inherit;color:inherit;-webkit-tap-highlight-color:rgba(0,0,0,0);background:0 0;outline:0}
  textarea{resize:none}
  b,strong{font-weight:inherit;display:inline;}
  img{border:0}
  button,input,optgroup,select,textarea{color:inherit;font:inherit;margin:0}
  button,html input[type=button],input[type=submit]{-webkit-appearance:button;cursor:pointer;box-sizing:border-box;white-space: normal}
  input[type=text],input[type=password],textarea{-webkit-appearance:none;appearance: none;box-sizing:border-box;background-color:${GeneralJs.colorChip.white}}
  input{line-height:normal}
  input[type=checkbox],input[type=radio]{box-sizing:border-box;padding:0}
  input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{height:auto}input[type=search]{-webkit-appearance:textfield;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box}
  input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration{-webkit-appearance:none}
  p{overflow:hidden;}
  b{color:${GeneralJs.colorChip.grayDeactive};}
  label{cursor:pointer}
  article,section{margin:0;}
  @keyframes in{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0px);}}
  @keyframes fa{from{opacity:0;}to{opacity:1;}}
  @keyframes flash{from,80%,to{opacity:0}30%,50%{opacity:0.85}}
  #totalcontents{display:block;position:relative;left:0;top:0;height:100vh;width:100%;background-color:${GeneralJs.colorChip.white};transition:all 0s ease;}
  #footergreenback0817{display:block;position:relative;width:100%;height:300px;background-color:${GeneralJs.colorChip.green};overflow:hidden}
  .footerbutton{position:absolute;opacity:0;transition:all .5s ease;left:50%;cursor:pointer}
  .footerbutton:hover{opacity:0.5;}
  .hiddenobject{display: none;position: absolute; opacity: 0;font-size:0px}
  @media (min-width:1061px) and (max-width:1610px) {
    #desknaviframe{width:1050px;left:calc(50% - 525px);}
  }
  @media (min-width:801px) and (max-width:1060px) {
    #desknaviframe{width:900px;left:calc(50% - 450px);}
  }
  @media (min-width:721px) and (max-width:900px) {
    #desknaviframe{width:720px;left:calc(50% - 360px);}
  }
  .hiddenp,.switch{display:none;}
  .circle{position:absolute;cursor:pointer;width:15px;height:15px;opacity:0.95;z-index:101;top:-20px}
  .hoverDefault_lite{cursor:pointer;opacity:1}
  .hoverDefault_lite:hover{opacity:0.75;}
  .hoverDefault{cursor:pointer;opacity:1}
  .hoverDefault:hover{opacity:0.5;}
  .hoverdefault_reverse{
    opacity: 0;
    transition:all 0.5s ease;
    cursor: pointer;
  }
  .hoverdefault_reverse:hover{ opacity: 0.4; }
  .hoverdefault_lite_reverse{
    opacity: 0.7;
    transition:all 0.5s ease;
    cursor: pointer;
  }
  .hoverdefault_lite_reverse:hover{ opacity: 0.95; }
  .backblurdefault {
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
  }
  .backblurdefault_lite {
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
  }
  .backblurwhite {
    -webkit-backdrop-filter: blur(4px);
    backdrop-filter: blur(4px);
    background: rgb(255, 255, 255, 0.8);
  }
  .backblurgray {
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    background: rgb(236, 236, 236, 0.9);
  }
  .backblurtransparent {
    -webkit-backdrop-filter: blur(4px);
    backdrop-filter: blur(4px);
    background: rgb(255, 255, 255, 0.3);
  }
  .backblurblack {
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
    background: linear-gradient(256deg, rgba(20, 20, 20, 0.65) 0%, rgba(28, 28, 28, 0.7) 100%);
  }
  @keyframes justfadeinoriginal{from{opacity:0;}to{opacity:1;}}
  @keyframes justfadeoutoriginal{from{opacity:1;}to{opacity:0;}}
  @keyframes justfadeinnine{from{opacity:0;}to{opacity:0.9;}}
  @keyframes justfadeoutnine{from{opacity:0.9;}to{opacity:0;}}
  @keyframes justfadeineight{from{opacity:0;}to{opacity:0.8;}}
  @keyframes justfadeouteight{from{opacity:0.8;}to{opacity:0;}}
  @keyframes justfadeinmiddle{from{opacity:0;}to{opacity:0.6;}}
  @keyframes justfadeoutmiddle{from{opacity:0.6;}to{opacity:0;}}
  @keyframes justfadeinsmall{from{opacity:0;}to{opacity:0.4;}}
  @keyframes justfadeoutsmall{from{opacity:0.4;}to{opacity:0;}}
  @keyframes justfadein{from{opacity:0;}to{opacity:0.3;}}
  @keyframes justfadeout{from{opacity:0.3;}to{opacity:0;}}
  @keyframes invisible{from{opacity:0;}to{opacity:0;}}
  @keyframes fadedown{from{opacity:1;transform:translateY(0px);}to{opacity:0;transform:translateY(20px);}}
  @keyframes fadeup{from{opacity:0;transform:translateY(20px);}to{opacity:0.95;transform:translateY(0px);}}
  @keyframes fadeuporiginal{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0px);}}
  @keyframes fadeupdelay{from,30%{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0px);}}
  @keyframes fadeupdelay2{from,30%{opacity:0;transform:translateY(30px);}to{opacity:1;transform:translateY(0px);}}
  @keyframes fadeuplite{from{opacity:0;transform:translateY(5px);}to{opacity:0.95;transform:translateY(0px);}}
  @keyframes fadeupnine{from{opacity:0;transform:translateY(5px);}to{opacity:0.91;transform:translateY(0px);}}
  @keyframes fadeuphard{from{opacity:0;transform:translateY(5px);}to{opacity:1;transform:translateY(0px);}}
  @keyframes fadedownlite{from{opacity:0.95;transform:translateY(0px);}to{opacity:0;transform:translateY(5px);}}
  @keyframes fadeupmiddle{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0px);}}
  @keyframes fadedownmiddle{from{opacity:1;transform:translateY(0px);}to{opacity:0;transform:translateY(10px);}}
  @keyframes fadeupbacklite{from{opacity:0;transform:translateY(5px);}to{opacity:0.2;transform:translateY(0px);}}
  @keyframes loginfadeup0{from{opacity:0;}to{opacity:0.1;}}
  @keyframes loginfadeup1{from{opacity:0;backdrop-filter: blur(0px);}to{opacity:0.6;backdrop-filter: blur(4px);}}
  @keyframes loginfadedown0{from{opacity:0.1;}to{opacity:0;}}
  @keyframes loginfadedown1{from{opacity:0.6;backdrop-filter: blur(4px);}to{opacity:0;backdrop-filter: blur(0px);}}
  @keyframes profilefadeup{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0px);}}
  @keyframes communicationfadeup{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0px);}}
  @keyframes fadedowndelay{from{opacity:1;transform:translateY(0px);}70%,to{opacity:0;transform:translateY(-5px);}}

  @keyframes fadeout{from{opacity:1;transform:translateX(0px);}to{opacity:0;transform:translateX(-30px);}}
  @keyframes fadein{from{opacity:0;transform:translateX(30px);}to{opacity:1;transform:translateX(0px);}}
  @keyframes fadeoutlite{from{opacity:1;transform:translateX(0px);}to{opacity:0;transform:translateX(-20px);}}
  @keyframes fadeoutlite2{from{opacity:1;transform:translateX(0px);}to{opacity:0;transform:translateX(20px);}}
  @keyframes fadeinlite{from{opacity:0;transform:translateX(20px);}to{opacity:1;transform:translateX(0px);}}
  @keyframes fadeinlite2{from{opacity:0;transform:translateX(-20px);}to{opacity:1;transform:translateX(0px);}}
  @keyframes loadingrotate{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
  @keyframes fadecancel{from{opacity:0}to{opacity:0.2}}

  @keyframes twinkle {
    from {
      opacity: 1;
    }
    49% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    99% {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes rotateProgress {
    from {
      transform: rotate(0deg);
      opacity: 1;
    }
    25% {
      transform: rotate(90deg);
    }
    50% {
      transform: rotate(180deg);
      opacity: 0.92;
    }
    75% {
      transform: rotate(270deg);
    }
    to {
      transform: rotate(360deg);
      opacity: 1;
    }
  }

  @keyframes frontmobileslideon{from{transform:translateX(100vw);}to{transform:translateX(0vw);}}
  @keyframes frontmobileslideoff{from{transform:translateX(0vw);}to{transform:translateX(-100vw);}}
  @keyframes talkfade {from,30%{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0px)}}
  @keyframes talkwhitefade {from,85%{opacity:0;transform:translateX(8px)} to{opacity:1;transform:translateX(0px)}}
  @keyframes talkwhitefadein {from{opacity:0;transform:translateX(8px)} to{opacity:1;transform:translateX(0px)}}
  @keyframes talkwhitefadeout {from{opacity:1;transform:translateX(0px)} 50%{opacity:0;transform:translateX(0px)} to{opacity:0;transform:translateX(8px)}}
  @keyframes talkwhitefadeconvert {from,10%{opacity:0;transform:translateX(12px)} to{opacity:1;transform:translateX(0px)}}
  @keyframes talksecondfadein {from,50%{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0px)}}
  @keyframes talksecondfadeout {from{opacity:1;transform:translateY(0px)} 50%{opacity:0;transform:translateY(0px)} to{opacity:0;transform:translateY(8px)}}

  .justfadeinoriginal{animation:justfadeinoriginal 0.3s ease forwards;}
  .justfadeoutoriginal{animation:justfadeoutoriginal 0.3s ease forwards;}
  .justfadein{animation:justfadein 0.3s ease forwards;}
  .justfadeout{animation:justfadeout 0.3s ease forwards;}
  .fadeout{animation:fadeout 0.3s ease forwards;}
  .fadein{animation:fadein 0.3s ease forwards;}
  .fadedown{animation:fadedown 0.3s ease forwards;}
  .fadeup{animation:fadeup 0.3s ease forwards;}
  .loading{position:absolute;left:50%;transform:rotate(0deg);transform-origin:50% 50%;animation:loadingrotate 1.7s linear infinite;}
  .totalMother{display:block;position:fixed;top:0px;left:0px;height:calc(100% - 123px);width:100%;overflow-x:hidden;overflow-y:scroll;}
  .totalMother::-webkit-scrollbar{display:none;}
  .totalFather{width:100%;position:relative;overflow-x:hidden;overflow-y:scroll;height:calc(100vh - 123px);background:${GeneralJs.colorChip.white}}
  .totalFather::-webkit-scrollbar{display:none;}
  .noScrollBar{}
  .noScrollBar::-webkit-scrollbar{display:none;}
  .font0{font-size:0}
  .font24{font-size:24px}

  .mofooterbelow,.momafooter{display:block;position:relative;width:100%}
  .mfbelbutton{position:absolute;height:10vw;top:8vw;}
  .mfbelbu1{left:17vw;width:20vw;}
  .mfbelbu2{left:41vw;width:20vw;}
  .mfbelbu3{left:64vw;width:20vw;}
  .moblockrela{display:block;position:relative;}
  .mocenter{margin-left:auto;margin-right:auto;}

  `;
  if (justTextMode) {
    return css;
  } else {
    styleTag.insertAdjacentHTML(`beforeend`, css);
    return "";
  }
}

GeneralJs.prototype.returnCircle = function (cssString, color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" class="circle" style="${cssString}"><circle cx="5.5px" cy="5.5px" r="5.5px" fill="${color}" /></svg>`;
}

GeneralJs.prototype.returnRound = function (radius, color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" class="circle"><circle cx="${radius}" cy="${radius}" r="${radius}" fill="${color}" /></svg>`;
}

GeneralJs.prototype.returnPoint = function (radius, color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><circle cx="15" cy="15" r="15" fill="${color}" /></svg>`;
}

GeneralJs.prototype.returnBigArrow = function (color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140.316 226.772"><path d="M139.316 110.452l-8.145-10.556c0 0 0 0 0-0.001l-53.754-69.665 0 0L56.375 2.962C54.934 1.094 52.709 0 50.35 0h-7.215H28.485 1.886c-1.563 0-2.445 1.795-1.49 3.032l25.144 32.586c0.001 0.001 0.002 0.003 0.003 0.004l58.653 76.015c0.795 1.03 0.795 2.467 0 3.497l-41.894 54.294h0L0.396 223.739c-0.955 1.237-0.073 3.032 1.49 3.032h26.599 14.65 7.215c2.359 0 4.585-1.094 6.026-2.962l4.383-5.681c0 0 0 0 0 0l45.021-58.347v0l2.329-3.019 23.061-29.887c0.001-0.001 0.002-0.003 0.003-0.004l8.142-10.553C140.649 114.591 140.649 112.181 139.316 110.452z" fill="${color}"/></svg>`;
}

GeneralJs.prototype.returnPlus = function (color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35.745 36.805"><path d="M14.19 21.85H0v-6.896h14.19V0h7.287v14.954h14.267v6.896H21.478v14.955h-7.287V21.85z" fill="${color}"/></svg>`;
}

GeneralJs.prototype.returnArrow = function (direction, color) {
  if (direction !== undefined && color === undefined) {
    color = direction;
    direction = "right";
  }
  const right = `<svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" viewBox="0 0 425.197 425.197"><path style="fill:${color};" d="M32.348 422.275l330.823-191.001c14.377-8.301 14.377-29.052 0-37.353L32.348 2.921C17.971-5.379 0 4.997 0 21.598v382.001C0 420.2 17.971 430.576 32.348 422.275z"/></svg>`;
  const left = `<svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" viewBox="0 0 425.197 425.197"><path style="fill:${color}" d="M392.849 2.921L62.026 193.922c-14.377 8.301-14.377 29.052 0 37.353l330.823 191.001c14.377 8.301 32.348-2.075 32.348-18.676V21.598C425.197 4.997 407.226-5.379 392.849 2.921z"/></svg>`;
  if (direction === "right") {
    return right;
  } else if (direction === "left") {
    return left;
  }
}

GeneralJs.prototype.returnLongArrow = function (color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 592.457 177.443"><path fill="${color}" class="st0" d="M590.823 93.32c0.002-0.002 0.003-0.004 0.005-0.007 0.148-0.182 0.287-0.371 0.417-0.566 0.034-0.051 0.062-0.104 0.094-0.155 0.094-0.149 0.186-0.298 0.268-0.454 0.037-0.07 0.068-0.143 0.103-0.214 0.069-0.141 0.139-0.282 0.199-0.428 0.033-0.08 0.058-0.161 0.088-0.242 0.052-0.141 0.106-0.281 0.149-0.426 0.027-0.09 0.046-0.182 0.07-0.273 0.036-0.138 0.074-0.274 0.101-0.414 0.023-0.117 0.036-0.235 0.054-0.352 0.017-0.116 0.039-0.231 0.05-0.349 0.047-0.478 0.047-0.959 0-1.437 -0.012-0.118-0.033-0.233-0.05-0.35 -0.017-0.117-0.031-0.235-0.054-0.351 -0.028-0.141-0.066-0.277-0.101-0.414 -0.024-0.091-0.043-0.183-0.07-0.273 -0.044-0.145-0.097-0.285-0.149-0.426 -0.03-0.08-0.055-0.161-0.088-0.241 -0.06-0.147-0.13-0.288-0.2-0.43 -0.035-0.071-0.065-0.143-0.102-0.212 -0.083-0.156-0.175-0.306-0.269-0.455 -0.032-0.051-0.06-0.104-0.094-0.154 -0.129-0.194-0.267-0.382-0.414-0.563 -0.003-0.003-0.005-0.007-0.008-0.01 -0.168-0.206-0.347-0.403-0.537-0.59l-81.391-81.398c-2.846-2.846-7.457-2.846-10.304 0s-2.846 7.457 0 10.304l68.99 68.996H7.287C3.259 81.435 0 84.694 0 88.721c0 4.028 3.259 7.287 7.287 7.287h560.294l-68.99 68.996c-2.846 2.846-2.846 7.458 0 10.304 1.423 1.423 3.288 2.135 5.152 2.135s3.729-0.712 5.152-2.135l81.39-81.397C590.475 93.724 590.654 93.527 590.823 93.32z"/></svg>`;
}

GeneralJs.prototype.returnSetting = function (color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 512.9863 526.2865" xml:space="preserve"><path fill="${color}" d="M103.543,52.1175c2.081,0.9305,4.3185,1.6158,6.2185,2.8297c17.124,10.9406,34.2023,21.953,51.2494,33.0131 c1.6664,1.0811,2.9053,1.2133,4.7211,0.2065c11.0291-6.1159,22.6236-10.9538,34.662-14.6977 c1.6555-0.5149,2.4143-1.281,2.7901-2.9917c4.5563-20.7406,9.2001-41.4619,13.8099-62.1907 c1.1024-4.9572,4.8512-8.2334,9.9073-8.247c19.748-0.053,39.4964-0.0545,59.2445,0.0058c5.0661,0.0155,8.7577,3.2817,9.8683,8.2807 c4.6228,20.8093,9.233,41.6216,13.9677,62.4055c0.2314,1.0159,1.442,2.2511,2.4568,2.5788 c12.24,3.9524,24.0614,8.8645,35.3101,15.1064c1.4818,0.8222,2.5106,0.6443,3.8484-0.2219 c17.0588-11.0438,34.1554-22.0292,51.2303-33.0483c6.0642-3.9135,10.3034-3.4893,15.3405,1.6715 c13.2652,13.5911,26.5221,27.1903,39.7736,40.7948c4.4557,4.5745,4.9806,9.3125,1.6769,14.7055 c-10.874,17.7511-21.7367,35.5092-32.6405,53.2419c-0.8248,1.3414-0.9726,2.4349-0.1998,3.9018 c6.0728,11.5275,10.9155,23.5638,14.553,36.0747c0.501,1.7231,1.4024,2.5582,3.179,2.9635 c14.2887,3.2594,28.5578,6.6046,42.8278,9.9457c5.9151,1.3849,11.8234,2.7998,17.7239,4.2455 c4.7671,1.168,7.884,5.0094,7.8939,9.9468c0.0405,20.3314,0.0408,40.663,0.0024,60.9944c-0.0095,5.0196-3.1241,8.8686-8.114,10.0508 c-13.7744,3.2636-27.5671,6.45-41.3513,9.6721c-6.5674,1.5352-13.1452,3.0297-19.6815,4.688 c-0.8476,0.2151-1.8889,1.1774-2.14,2.0058c-3.9005,12.8683-8.8825,25.2838-15.0081,37.2585 c-0.4511,0.8819-0.0374,2.5909,0.5531,3.5639c10.5851,17.4401,21.2589,34.8264,31.9152,52.2232 c4.0132,6.5516,3.5458,10.7183-1.8926,16.2983c-13.1378,13.4796-26.2849,26.9502-39.4359,40.4169 c-4.5985,4.7088-8.9868,5.1776-14.5333,1.602c-17.1493-11.0553-34.3102-22.0927-51.4333-33.1884 c-1.5034-0.9742-2.6964-1.1354-4.3275-0.2313c-11.0324,6.1152-22.6006,11.006-34.6502,14.7319 c-1.7785,0.5499-2.6782,1.3756-3.1029,3.3228c-4.5259,20.7477-9.1708,41.4695-13.796,62.1956 c-1.0436,4.6766-4.7787,7.9647-9.5983,7.9839c-19.9145,0.0796-39.8297,0.0811-59.7442-0.0044 c-4.911-0.0211-8.5311-3.3644-9.6207-8.2614c-4.6122-20.7284-9.2647-41.4478-13.804-62.192 c-0.3872-1.7694-1.2394-2.4904-2.8185-2.9748c-12.1413-3.7241-23.775-8.6707-34.8874-14.8111 c-1.6486-0.911-2.8399-0.7009-4.3265,0.2607c-17.2003,11.1268-34.4318,22.2053-51.6598,33.2891 c-5.2878,3.402-9.778,2.9194-14.141-1.5487c-13.2681-13.5875-26.5309-27.1802-39.7766-40.7895 c-5.2276-5.371-5.634-9.7041-1.6956-16.1254c10.6654-17.389,21.2869-34.805,31.999-52.1651 c1.0123-1.6406,0.9874-2.8936,0.1196-4.5525c-5.8828-11.2466-10.6752-22.9488-14.1713-35.1558 c-0.6059-2.1157-1.6517-2.9992-3.8442-3.5013c-19.8854-4.5543-39.7338-9.2699-59.5922-13.9419 c-5.199-1.2231-8.3607-5.0414-8.3703-10.3763c-0.0365-20.1648-0.0374-40.3297,0.0008-60.4946 c0.0099-5.2348,3.1058-9.0556,8.1659-10.2474c19.6963-4.6389,39.3859-9.3079,59.114-13.8078 c2.723-0.6211,3.9687-1.8202,4.7499-4.4918c3.4428-11.7745,7.9935-23.1342,13.7456-33.98c1.0638-2.0058,1.0158-3.5054-0.189-5.453 c-10.7335-17.3506-21.3692-34.7618-32.0168-52.1655c-3.5895-5.8671-3.0839-10.4565,1.6663-15.3293 c13.3151-13.6589,26.6535-27.295,39.9526-40.9695C97.4627,54.1286,99.9501,52.5041,103.543,52.1175z M254.0143,384.4631 c35.9556-0.5699,64.4068-12.8121,87.3302-37.091c40.8153-43.2289,44.9545-109.7653,9.1699-157.3098 c-27.218-36.1626-64.0588-52.1869-109.2199-47.0405c-26.5673,3.0275-49.1572,15.054-67.9178,34.0693 c-40.3733,40.9214-46.8352,105.7537-14.8032,153.6495C181.7802,365.4408,214.6885,383.2517,254.0143,384.4631z"/></svg>`;
}

GeneralJs.prototype.returnCinitial = function (color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 276.866 296.154"><path d="M0 169.978C0 73.134 61.481 0 157.52 0c68.717 0 116.133 34.957 119.346 104.478h-64.695c-4.42-34.557-21.298-53.442-56.661-53.442 -56.658 0-87.199 53.042-87.599 116.93 -0.403 45.809 20.895 76.353 68.314 76.353 34.957 0 59.068-20.498 69.114-55.855h63.894c-12.859 69.515-67.107 107.691-133.814 107.691C52.639 296.154 0 250.345 0 169.978z" fill="${color}"/></svg>`;
}

GeneralJs.prototype.returnTriangle = function (color) {
  return `<svg shape-rendering="geometricPrecision" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 425.197 373.954" xml:space="preserve"><path fill="${color}" d="M2.922,32.348l191.001,330.823c8.301,14.377,29.052,14.377,37.353,0l191-330.823C430.576,17.971,420.2,0,403.599,0H21.598 C4.997,0-5.379,17.971,2.922,32.348z"/></svg>`;
}

GeneralJs.prototype.returnCinitialGeneral = function (color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 51.851 56.198"><path d="M0 28.442v-0.61C0 11.285 11.59 0 27.069 0 40.185 0 49.945 6.405 51.241 19.826H38.584c-0.915-6.558-4.575-10.065-11.437-10.065 -8.617 0-14.107 6.71-14.107 17.995v0.61c0 11.285 5.185 17.843 14.183 17.843 6.786 0 11.514-3.431 12.505-10.446h12.123c-1.372 13.496-11.056 20.436-24.477 20.436C9.532 56.198 0 45.218 0 28.442z" fill="${color}"/></svg>`;
}

GeneralJs.prototype.returnRinitialItalic = function (color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 179.985 211.309"><path d="M33.395 0h73.589c46.4 0 73.295 20.985 72.998 57.629 0 36.648-23.052 57.629-53.196 64.131l44.329 89.548H121.761l-40.191-81.567H60.29L47.582 211.309H0L33.395 0zM93.685 97.23c25.417 0 39.307-10.934 39.307-34.872 0.294-17.734-10.936-25.711-31.623-25.711H75.361l-9.751 60.582H93.685z" fill="${color}"/></svg>`;
}

GeneralJs.prototype.returnHinitial = function (color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48.023 56.198"><path d="M0 0h12.733v22.951h22.558V0h12.732v56.198H35.291V33.011H12.733v23.187H0V0z" fill="${color}"/></svg>`;
}

GeneralJs.prototype.returnMinitial = function (color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 76.946 72.772"><path d="M0 0h21.781l16.997 45.291L55.572 0h21.374v72.772H60.558V21.679L40.407 72.772h-5.395L14.758 21.679v51.093H0V0z" fill="${color}"/></svg>`;
}

GeneralJs.prototype.returnAinitial = function (color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 69.005 72.772"><path d="M23.918 0h21.475l23.613 72.772H51.805l-4.987-16.183H20.457l-4.987 16.183H0L23.918 0zM24.02 44.884h19.236l-9.567-31.45L24.02 44.884z" fill="${color}"/></svg>`;
}

GeneralJs.prototype.returnRinitial = function (color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45.116 56.198"><path d="M0 0h20.121c13.283 0 21.693 5.423 21.693 17.056v0.314c0 8.488-4.952 12.969-11.554 14.933L45.116 56.198H31.596L18.156 34.505h-5.502v21.693H0V0zM19.807 25.859c6.366 0 9.589-2.672 9.589-8.095v-0.314c0-5.738-3.458-7.703-9.589-7.703h-7.152v16.113H19.807z" fill="${color}"/></svg>`;
}

GeneralJs.prototype.returnReturn = function (color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 475.449 413.43"><path style="fill:${color}" d="M201.159 62.683c-1.04 0 1.037 0.02 0 0.031l0-58.417c0-3.611-4.287-5.606-7.155-3.329L43.119 120.739c-3.724 2.956-3.755 8.501-0.065 11.497l150.913 120.542c2.859 2.322 7.193 0.334 7.193-3.299v-69.727l-3.111 0c120.242 0.588 163.157 53.466 163.157 118.639 0 55.465-52.965 102.031-124.531 115.039 107.786-13.319 190.203-93.841 190.203-181.851C426.877 143.35 361.043 62.683 201.159 62.683z"/></svg>`;
}

GeneralJs.prototype.returnReport = function (color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 138.205 174.702"><path d="M133.959 24.22l-18.454-19.689C112.786 1.63 109.098 0 105.253 0H13.1C5.865 0 0 6.258 0 13.977v146.748c0 7.719 5.865 13.977 13.1 13.977h112.005c7.235 0 13.1-6.258 13.1-13.977V35.158C138.205 31.055 136.678 27.121 133.959 24.22zM110.481 138.596H26.823c-2.529 0-4.579-2.187-4.579-4.886s2.05-4.886 4.579-4.886h83.658c2.529 0 4.579 2.187 4.579 4.886S113.01 138.596 110.481 138.596zM110.481 106.992H26.823c-2.529 0-4.579-2.187-4.579-4.886s2.05-4.886 4.579-4.886h83.658c2.529 0 4.579 2.187 4.579 4.886S113.01 106.992 110.481 106.992zM110.481 75.388H26.823c-2.529 0-4.579-2.187-4.579-4.886s2.05-4.886 4.579-4.886h83.658c2.529 0 4.579 2.187 4.579 4.886S113.01 75.388 110.481 75.388z" fill="${color}"/></svg>`;
}

GeneralJs.prototype.returnLink = function (color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 566.9291 566.3705" xml:space="preserve"><path style="fill:${color};" d="M310.0074,199.8997l-25.7186,25.6573c-1.1178,1.1177-2.1418,2.3093-3.1116,3.5333 c-0.292,0.3661-0.5589,0.7519-0.8383,1.1304c-0.6707,0.9068-1.2981,1.8388-1.8876,2.7943 c-0.2488,0.4164-0.5101,0.8257-0.7444,1.2493c-0.6526,1.143-1.2422,2.322-1.7704,3.5262c-0.0937,0.2127-0.2054,0.4057-0.292,0.6165 c-0.6023,1.4278-1.1124,2.9007-1.5414,4.397c-0.0308,0.1046-0.0559,0.2165-0.0795,0.3281 c11.7074,3.3226,22.4321,9.5962,31.1829,18.3849c12.733,12.7311,20.1478,29.6682,20.8816,47.6979 c0,0.0505,0.0181,0.0939,0.0181,0.1442c0,0.0307,0,0.054,0,0.0793c0,0.0072,0,0.0126,0,0.0126 c0.8708,20.0109-6.7876,39.681-21.0168,53.8599l-33.4273,33.3893c-0.056,0.0559-0.1298,0.092-0.1857,0.1552l-95.2537,95.05 c-13.5641,13.5641-31.6189,21.042-50.8348,21.042c-19.2412,0-37.3393-7.5032-50.9594-21.1305 c-13.5767-13.6002-21.042-31.6929-21.0186-50.9466c0.0197-19.2538,7.5158-37.332,21.1051-50.9033l88.3166-88.1363 c-0.2415-0.7643-0.4091-1.5468-0.64-2.3165c-0.4596-1.5343-0.8635-3.0864-1.2782-4.6403c-0.7715-2.8738-1.4656-5.7762-2.075-8.7003 c-0.3408-1.6404-0.6707-3.2792-0.9573-4.9307c-0.5336-3.0629-0.9429-6.1491-1.2979-9.2554 c-0.1677-1.4531-0.3787-2.9006-0.5032-4.3645c-0.3911-4.554-0.6327-9.1366-0.6327-13.7571 c0.0055-3.4415,0.1425-6.8758,0.3732-10.2993c0.0738-1.1537,0.2163-2.2966,0.3155-3.4469c0.2056-2.2787,0.4164-4.5574,0.7157-6.8181 c0.0488-0.3659,0.0668-0.7391,0.1172-1.1067l-120.2023,119.95c-48.9545,48.8589-49.0339,128.4446-0.1677,177.4154 c23.6813,23.7499,55.212,36.8308,88.789,36.8308c33.4506,0,64.9073-13.0178,88.5833-36.656L342.8504,401.166 c8.8193-8.7831,16.2414-18.7759,22.0733-29.7062c14.0744-26.4396,18.1487-56.7174,11.9362-85.5528 c-1.4404-6.6523-3.4217-13.2362-5.9545-19.6703c-6.2864-15.9618-15.6573-30.2578-27.8568-42.4878 C333.2867,213.9543,322.2068,205.9607,310.0074,199.8997L310.0074,199.8997z"/><path style="fill:${color};" d="M187.5694,245.3822c-0.1983,2.8303-0.3173,5.6626-0.3226,8.5073 c0,16.0375,2.9367,31.6009,8.7254,46.2468c6.2665,15.9042,15.6571,30.202,27.9359,42.506 c9.7332,9.7873,20.8006,17.7809,32.9981,23.8364l25.724-25.6753c1.1321-1.125,2.1632-2.3292,3.1368-3.5658 c0.3047-0.384,0.5786-0.7878,0.8634-1.179c0.6455-0.8888,1.2675-1.801,1.839-2.733c0.2848-0.4778,0.5661-0.9573,0.8329-1.4404 c0.5138-0.9321,0.986-1.8821,1.4278-2.852c0.2182-0.4778,0.4471-0.9501,0.64-1.4332c0.5085-1.2367,0.9429-2.4969,1.3233-3.7769 c0.0559-0.193,0.1371-0.3787,0.1857-0.5715c-11.6569-3.3225-22.3707-9.5836-31.1413-18.3524 c-12.5708-12.5708-19.9478-29.1907-20.8798-46.9102v-0.0072c-0.0126-0.2038-0.0505-0.4092-0.0559-0.6129 c-0.0937-1.1249-0.1117-2.2805-0.1117-3.3929c0.0486-19.2772,7.5518-37.35,21.1285-50.9214L390.7053,74.4802 c13.62-13.5642,31.6803-21.0294,50.8655-21.0294c19.2411,0,37.3393,7.503,50.9593,21.1231 c28.0225,28.1217,27.9559,73.7825-0.1297,101.8122l-88.3545,88.1795c0.3227,1.0132,0.5769,2.0317,0.8762,3.0503 c0.4399,1.4712,0.8816,2.944,1.2727,4.4348c0.3481,1.2981,0.6454,2.6087,0.9556,3.9121c0.3678,1.5288,0.7264,3.0502,1.0437,4.5845 c0.2669,1.2907,0.4977,2.5959,0.732,3.894c0.2812,1.5521,0.5534,3.0989,0.7896,4.6512c0.1928,1.3051,0.3533,2.6158,0.5156,3.9246 c0.1927,1.554,0.3786,3.0991,0.5283,4.653c0.1243,1.3232,0.2163,2.6446,0.3045,3.968c0.1046,1.5414,0.2037,3.0809,0.2597,4.6204 c0.0559,1.3485,0.081,2.6898,0.0991,4.0383c0.0199,1.5143,0.0253,3.0359,0,4.5519c-0.0181,1.3666-0.0613,2.7259-0.1172,4.087 c-0.0612,1.4963-0.1425,2.9998-0.2488,4.4962c-0.0991,1.372-0.2162,2.7384-0.3479,4.1121c-0.1425,1.4838-0.3102,2.962-0.4904,4.433 c-0.0939,0.7211-0.1425,1.4422-0.2416,2.1562l120.179-119.9248c23.6813-23.6128,36.7352-55.0948,36.773-88.6519 c0.0361-33.5498-12.9494-65.0569-36.5622-88.7257C506.6783,13.0809,475.1459,0,441.5708,0 c-33.4633,0-64.9398,13.0178-88.614,36.6632L224.0759,165.225c-8.8373,8.8445-16.2971,18.8373-22.1472,29.6936 c0,0.0072-0.0055,0.0072-0.0055,0.0126C193.6683,210.3956,188.7809,227.688,187.5694,245.3822L187.5694,245.3822z"/></svg>`;
}

GeneralJs.prototype.returnHash = function (color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24.955 38.301"><path d="M1.444 10.891h5.414L8.507 0h4.176l-1.701 10.891h5.723L18.407 0h4.176l-1.65 10.891h4.022v4.683h-4.847l-0.979 6.629h4.434v4.683h-5.156l-1.804 11.417h-4.177l1.805-11.417H8.507L6.703 38.301h-4.125l1.702-11.417H0v-4.683h5.053l1.031-6.629H1.444V10.891zM9.178 22.202h5.723l1.083-6.629h-5.671L9.178 22.202z" fill="${color}"/></svg>`;
}

GeneralJs.prototype.returnHamburger = function (color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 65.032 41.503"><path d="M63.272 6.046H1.76C0.788 6.046 0 5.258 0 4.286V1.76C0 0.788 0.788 0 1.76 0h61.513c0.972 0 1.76 0.788 1.76 1.76v2.526C65.032 5.258 64.244 6.046 63.272 6.046zM65.032 22.015v-2.526c0-0.972-0.788-1.76-1.76-1.76H1.76C0.788 17.729 0 18.516 0 19.488v2.526c0 0.972 0.788 1.76 1.76 1.76h61.513C64.244 23.774 65.032 22.986 65.032 22.015zM65.032 39.743v-2.526c0-0.972-0.788-1.76-1.76-1.76H1.76C0.788 35.457 0 36.245 0 37.217v2.526c0 0.972 0.788 1.76 1.76 1.76h61.513C64.244 41.503 65.032 40.715 65.032 39.743z" fill="${color}"/></svg>`;
}

GeneralJs.prototype.returnAddition = function (color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.853 34.853"><path d="M32.342 14.915H19.937V2.512c0-1.387-1.124-2.511-2.511-2.511 -1.387 0-2.511 1.124-2.511 2.511V14.915H2.512c-1.387 0-2.511 1.124-2.511 2.511 0 1.387 1.124 2.512 2.511 2.512h12.403v12.402c0 1.387 1.124 2.511 2.511 2.511 1.387 0 2.511-1.124 2.511-2.511V19.939h12.404c1.387 0 2.511-1.125 2.511-2.512C34.853 16.039 33.729 14.915 32.342 14.915z" fill="${color}"/></svg>`;
}

GeneralJs.prototype.returnSubtract = function (color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.853 34.853"><path d="M32.342 19.939H2.512c-1.387 0-2.511-1.125-2.511-2.512 0-1.387 1.124-2.511 2.511-2.511h29.83c1.387 0 2.511 1.124 2.511 2.511C34.853 18.813 33.729 19.939 32.342 19.939z" fill="${color}"/></svg>`;
}

GeneralJs.prototype.returnIncrease = function (color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.853 34.853"><path d="M9.963 0c0.64 0 1.279 0.244 1.768 0.733l14.926 14.926c0.977 0.976 0.977 2.559 0 3.536L11.731 34.12c-0.977 0.977-2.559 0.977-3.536 0 -0.977-0.976-0.977-2.559 0-3.536l13.158-13.158L8.196 4.268c-0.977-0.977-0.977-2.559 0-3.536C8.684 0.244 9.324 0 9.963 0z" fill="${color}"/></svg>`;
}

GeneralJs.prototype.returnDecrease = function (color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.853 34.853"><path d="M24.89 34.853c-0.64 0-1.279-0.244-1.768-0.733L8.196 19.194c-0.977-0.976-0.977-2.559 0-3.536L23.122 0.733c0.977-0.977 2.559-0.977 3.536 0 0.977 0.976 0.977 2.559 0 3.536l-13.158 13.158 13.158 13.158c0.977 0.977 0.977 2.559 0 3.536C26.169 34.609 25.529 34.853 24.89 34.853z" fill="${color}"/></svg>`;
}

GeneralJs.prototype.returnCheckCircle = function (color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 59.044 59.04"><path d="M29.524 0c-16.307 0-29.524 13.217-29.524 29.52 0 16.306 13.217 29.52 29.524 29.52 16.303 0 29.52-13.214 29.52-29.52C59.044 13.217 45.826 0 29.524 0zM44.092 23.517L25.984 41.569c-0.515 0.515-1.188 0.772-1.865 0.772 -0.659 0-1.315-0.243-1.827-0.733l-8.164-7.79c-1.058-1.005-1.097-2.68-0.088-3.738 1.005-1.054 2.684-1.093 3.738-0.085l6.298 6.009 16.282-16.232c1.033-1.033 2.712-1.026 3.742 0.007C45.129 20.812 45.129 22.487 44.092 23.517z" fill="${color}"/></svg>`;
}

GeneralJs.prototype.returnCheckIcon = function (color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 220.597 165.5255"><path fill="${color}" d="M88.387,165.5255c-5.4335,0-10.6357-2.235-14.364-6.2042L5.363,86.4128 c-7.4662-7.9286-7.0905-20.414,0.8381-27.8898c7.919-7.4469,20.4044-7.1097,27.8898,0.8381l53.9011,57.244L186.1411,6.6065 c7.2639-8.1598,19.7107-8.8438,27.8609-1.5896c8.1309,7.2542,8.8438,19.73,1.5799,27.8513L103.1074,158.936 c-3.6801,4.1233-8.9209,6.5125-14.4507,6.5895C88.5604,165.5255,88.4737,165.5255,88.387,165.5255z"/></svg>`;
}

GeneralJs.prototype.returnCancelCircle = function (color) {
  return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 59 59" style="enable-background:new 0 0 59 59;" xml:space="preserve"><path class="st0" d="M29.5,0C13.2,0,0,13.2,0,29.5S13.2,59,29.5,59S59,45.8,59,29.5S45.8,0,29.5,0z M44.5,40.9c1,1,1,2.6,0,3.6 c-0.5,0.5-1.2,0.8-1.8,0.8c-0.7,0-1.3-0.2-1.8-0.7L29.5,33.1L18.1,44.5c-0.5,0.5-1.2,0.7-1.8,0.7c-0.7,0-1.3-0.2-1.8-0.8 c-1-1-1-2.6,0-3.6l11.4-11.4L14.5,18.2c-1-1-1-2.6,0-3.6s2.6-1,3.6,0L29.5,26l11.4-11.4c1-1,2.6-1,3.6,0s1,2.6,0,3.6L33.1,29.5 L44.5,40.9z" fill="${color}" /></svg>`;
}

GeneralJs.prototype.returnMark = function (color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 72.7713 72.7716" xml:space="preserve"><path style="fill:${color}" d="M68.4153,37.8347c-0.5665-0.883-0.5665-2.0148,0-2.8978l3.9308-6.1321 c0.853-1.3311,0.3781-3.1078-1.0272-3.834l-6.4705-3.3449c-0.9317-0.4817-1.4983-1.4618-1.4492-2.5097l0.3381-7.2761 c0.0748-1.5796-1.226-2.8804-2.8055-2.8068l-7.2757,0.3384c-1.0479,0.0487-2.0286-0.5172-2.5113-1.4489l-3.3436-6.4705 c-0.7265-1.4047-2.5035-1.8806-3.834-1.0272l-6.1324,3.9311c-0.8827,0.5662-2.0157,0.5662-2.8984,0l-6.1324-3.9311 c-1.3305-0.8533-3.1075-0.3775-3.8327,1.0272l-3.3449,6.4705c-0.4826,0.9317-1.4621,1.4976-2.51,1.4489l-7.2757-0.3384 c-1.5796-0.0736-2.8804,1.2273-2.8068,2.8068l0.3381,7.2761c0.049,1.0479-0.5175,2.028-1.4492,2.5097l-6.4705,3.3449 c-1.404,0.7262-1.8802,2.5029-1.0272,3.834l3.9308,6.1321c0.5665,0.883,0.5665,2.0148,0,2.8978l-3.9308,6.1321 c-0.853,1.3311-0.3768,3.1078,1.0272,3.834l6.4705,3.3449c0.9317,0.4817,1.4983,1.4618,1.4492,2.5097l-0.3381,7.2761 c-0.0736,1.5796,1.2273,2.8804,2.8068,2.8068l7.2757-0.3384c1.0479-0.0487,2.0274,0.5172,2.51,1.4489l3.3449,6.4705 c0.7253,1.4047,2.5022,1.8806,3.8327,1.0272l6.1324-3.9311c0.8827-0.5662,2.0157-0.5662,2.8984,0l6.1324,3.9311 c1.3305,0.8533,3.1075,0.3775,3.834-1.0272l3.3436-6.4705c0.4826-0.9317,1.4634-1.4976,2.5113-1.4489l7.2757,0.3384 c1.5796,0.0736,2.8804-1.2272,2.8055-2.8068l-0.3381-7.2761c-0.049-1.0479,0.5175-2.028,1.4492-2.5097l6.4705-3.3449 c1.4053-0.7262,1.8802-2.5029,1.0272-3.834L68.4153,37.8347z M52.3669,28.5852L33.7465,47.6424 c-0.533,0.5439-1.2414,0.8211-1.9512,0.8211c-0.6478,0-1.2982-0.2291-1.8183-0.693l-9.4399-8.4182 c-1.1253-1.0027-1.2234-2.7278-0.2181-3.8556c1.0053-1.1201,2.7307-1.216,3.856-0.2187l7.49,6.6821l16.7982-17.1934 c1.053-1.0747,2.7784-1.0959,3.8611-0.0426C53.4018,25.7771,53.4238,27.505,52.3669,28.5852z"/></svg>`;
}

GeneralJs.prototype.returnMainMark = function (color) {
  return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 136.4795 66.3611" xml:space="preserve"><path fill="${color}" d="M63.5026,40.1354c0,1.4423,1.0174,2.6308,3.0971,2.6308c2.5029,0,4.5395-1.4855,4.9212-4.1163l0.2971-1.7394h-2.8847 C65.1989,36.9105,63.5026,37.7603,63.5026,40.1354z"/><path fill="${color}" d="M130.8652,0H5.6143C2.5137,0,0,2.5137,0,5.6143v55.1325c0,3.1006,2.5137,5.6143,5.6143,5.6143h125.2509 c3.1006,0,5.6143-2.5137,5.6143-5.6143V5.6143C136.4795,2.5137,133.9658,0,130.8652,0z M54.6154,32.8806l-2.1229,13.6616h-6.1511 l2.1212-13.2367c0.4664-3.0557-0.5096-4.4566-2.8-4.4566c-2.2905,0-4.4134,1.5702-4.9212,4.8383l-2.0365,12.8549h-6.0682 l2.0797-13.3645c0.4664-2.8847-0.5527-4.3287-2.8-4.3287c-2.4183,0-4.4134,1.698-4.9229,4.8383l-2.0365,12.8549h-6.1096 L21.224,31.395c0.5096-3.1386,0.6789-5.0905,0.7635-7.0424h5.8972c0,1.1452-0.0415,2.4597-0.2125,3.8606 c1.5287-2.5029,4.1163-4.3702,7.2981-4.3702c2.971,0,5.0922,1.4009,5.8125,4.3702c2.1212-3.1818,4.8798-4.3702,7.5952-4.3702 C52.6203,23.8431,55.6328,26.4738,54.6154,32.8806z M78.5219,33.0084l-1.0606,6.7453c-0.4664,2.8847-0.5942,4.9212-0.3817,6.7885 h-5.8557c-0.1693-1.0174-0.1693-2.1212-0.1261-3.0557c-1.4009,2.0797-3.5221,3.5221-6.5778,3.5221 c-4.2424,0-7.0856-2.3751-7.0856-6.2375c0-5.6847,4.6673-7.5088,11.3297-7.5088h3.6482l0.1278-0.9328 c0.4232-2.5893-0.2971-4.0316-3.1403-4.0316c-2.3336,0-3.5221,1.1884-3.9453,3.1403h-5.8557 c1.1038-5.3893,5.1769-7.5952,10.0981-7.5952C76.019,23.8431,79.5393,26.6431,78.5219,33.0084z M87.9118,46.5422h-6.1096 l3.5203-22.1895h6.1096L87.9118,46.5422z M89.2695,21.2969c-1.9519,0-3.4374-1.3992-3.4374-3.3096 c0-1.8655,1.527-3.3079,3.4789-3.3079c1.9519,0,3.4374,1.3992,3.4374,3.2664C92.7484,19.8546,91.2197,21.2969,89.2695,21.2969z  M116.344,33.2191l-2.1212,13.3231h-6.1096l2.0797-13.2799c0.5096-2.9693-0.5096-4.4134-2.971-4.4134 c-2.8415,0-5.0473,1.8258-5.5569,5.2201l-1.9951,12.4732h-6.1096l2.3768-15.1471c0.5096-3.1386,0.6788-5.0905,0.7635-7.0424h5.8972 c0,1.1452-0.0415,2.6308-0.2125,3.9885c1.5702-2.5461,4.0316-4.498,7.6384-4.498C114.3506,23.8431,117.4063,26.517,116.344,33.2191 z"/></svg>`;
}

GeneralJs.prototype.returnPlusCircle = function (color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.853 34.853"><path fill="${color}" d="M17.427,0.001c-9.624,0-17.425,7.801-17.425,17.425s7.801,17.425,17.425,17.425s17.425-7.801,17.425-17.425 S27.05,0.001,17.427,0.001z M25.821,19.341H19.34v6.48c0,1.056-0.858,1.914-1.914,1.914c-1.055,0-1.914-0.858-1.914-1.914V19.34 H9.031c-1.055,0-1.914-0.859-1.914-1.914s0.858-1.914,1.914-1.914h6.482V9.031c0-1.056,0.858-1.914,1.914-1.914 c1.056,0,1.914,0.858,1.914,1.914v6.482h6.483c0.512,0,0.992,0.199,1.354,0.561c0.36,0.361,0.56,0.842,0.559,1.353 C27.735,18.483,26.876,19.341,25.821,19.341z"/></svg>
`;
}

GeneralJs.prototype.returnLoading = function (color = GeneralJs.colorChip.green, color2 = GeneralJs.colorChip.darkGreen) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 566.929 566.929"><path d="M196.13 552.859c-23.91-7.75-37.01-33.409-29.26-57.31l0 0c7.74-23.9 33.4-37.01 57.31-29.26l0 0c23.9 7.74 37 33.399 29.26 57.31l0 0c-6.24 19.25-24.08 31.49-43.28 31.49l0 0C205.52 555.09 200.79 554.37 196.13 552.859z" fill="${color}"/><path d="M313.729 523.569C305.96 499.67 319.04 474 342.939 466.229l0 0c23.891-7.77 49.561 5.301 57.33 29.2l0 0c7.771 23.9-5.3 49.57-29.2 57.34l0 0c-4.67 1.521-9.409 2.24-14.069 2.24l0 0C337.819 555.01 319.979 542.79 313.729 523.569z" fill="${color2}"/><path d="M54.55 450.109c-14.81-20.3-10.35-48.76 9.96-63.569l0 0c20.3-14.8 48.77-10.34 63.57 9.97l0 0c14.8 20.3 10.34 48.76-9.96 63.56l0 0c-8.09 5.9-17.47 8.74-26.77 8.74l0 0C77.31 468.81 63.45 462.33 54.55 450.109z" fill="${color}"/><path d="M449 459.899c-20.33-14.779-24.82-43.239-10.03-63.56l0 0c14.78-20.32 43.23-24.81 63.561-10.03l0 0c20.319 14.78 24.81 43.24 10.029 63.561l0 0c-8.91 12.239-22.779 18.739-36.84 18.739l0 0C466.439 468.609 457.069 465.78 449 459.899z" fill="${color2}"/><path d="M0.33 283.77C0.3 258.64 20.65 238.25 45.78 238.22l0 0c25.13-0.03 45.52 20.32 45.55 45.45l0 0C91.35 308.8 71 329.189 45.88 329.22l0 0c-0.02 0-0.03 0-0.05 0l0 0C20.72 329.22 0.35 308.88 0.33 283.77z" fill="${color}"/><path d="M475.6 283.46L475.6 283.46c0-0.01 0-0.03 0-0.05l0 0c0-0.12 0-0.24 0-0.36l0 0C475.55 257.92 495.87 237.51 521 237.45l0 0c25.13-0.05 45.55 20.28 45.6 45.41l0 0c0 0.12 0 0.24 0 0.36l0 0c0 0.08 0 0.16 0 0.24l0 0c0 25.13-20.37 45.5-45.5 45.5l0 0C495.97 328.96 475.6 308.59 475.6 283.46z" fill="${color2}"/><path d="M0.33 283.76v0.01l0 0 0 0 0 0C0.33 283.76 0.33 283.76 0.33 283.76z" fill="${color}"/><path d="M64.29 180.85c-20.34-14.76-24.86-43.21-10.1-63.55l0 0C68.95 96.96 97.41 92.44 117.74 107.2l0 0c20.34 14.76 24.86 43.22 10.1 63.55l0 0c-8.9 12.27-22.78 18.78-36.86 18.78l0 0C81.71 189.53 72.36 186.71 64.29 180.85z" fill="${color}"/><path d="M438.729 170.26c-14.83-20.29-10.399-48.76 9.891-63.59l0 0c20.29-14.82 48.76-10.39 63.58 9.9l0 0 0 0 0 0c14.83 20.29 10.399 48.75-9.891 63.58l0 0c-8.1 5.92-17.5 8.77-26.81 8.77l0 0C461.47 188.92 447.64 182.45 438.729 170.26z" fill="${color}"/><path d="M166.43 71.62C158.63 47.73 171.67 22.05 195.57 14.25l0 0c23.89-7.8 49.57 5.25 57.37 29.14l0 0c7.79 23.89-5.26 49.57-29.14 57.37l0 0c-4.69 1.53-9.45 2.26-14.13 2.26l0 0C190.52 103.02 172.69 90.82 166.43 71.62z" fill="${color}"/><path d="M342.56 100.57h-0.01c-23.91-7.72-37.04-33.36-29.32-57.27l0 0C320.95 19.38 346.6 6.25 370.51 13.98l0 0 0 0 0 0C394.42 21.69 407.55 47.34 399.83 71.25l0 0c-6.221 19.27-24.07 31.54-43.29 31.54l0 0C351.91 102.79 347.2 102.07 342.56 100.57z" fill="${color}"/></svg>`;
}

GeneralJs.prototype.returnCheckBox = function (color, uncheck = false, forceUncheck = false) {
  const uncheckColorList = [
    GeneralJs.colorChip.gray0,
    GeneralJs.colorChip.gray1,
    GeneralJs.colorChip.gray2,
    GeneralJs.colorChip.gray3,
    GeneralJs.colorChip.gray4,
    GeneralJs.colorChip.deactive,
    GeneralJs.colorChip.gradientGray,
    GeneralJs.colorChip.black,
  ];
  if (!forceUncheck) {
    if (uncheckColorList.includes(color)) {
      uncheck = true;
    }
  }
  if (uncheck) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160.654 160.654"><path d="M145.66 0H14.993C6.713 0 0 6.713 0 14.993v130.667c0 8.281 6.713 14.993 14.993 14.993h130.667c8.281 0 14.993-6.713 14.993-14.993V14.993C160.654 6.713 153.941 0 145.66 0z" fill="${color}"/></svg>`;
  } else {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160.654 160.654"><path d="M145.66 0H14.993C6.713 0 0 6.713 0 14.993v130.667c0 8.281 6.713 14.993 14.993 14.993h130.667c8.281 0 14.993-6.713 14.993-14.993V14.993C160.654 6.713 153.941 0 145.66 0zM139.273 48.929l-71.955 77.279c-1.129 1.214-2.728 1.91-4.385 1.91 0 0-0.001 0-0.001 0 -1.658 0-3.257-0.696-4.387-1.909L19.522 84.299c-2.252-2.418-2.116-6.219 0.303-8.471l6.544-6.09c1.171-1.091 2.707-1.672 4.298-1.602 1.6 0.057 3.083 0.735 4.174 1.907l28.047 30.142 61.081-65.511 0 0 0 0c1.09-1.172 2.572-1.849 4.173-1.906 1.616-0.05 3.128 0.513 4.3 1.605l6.531 6.087c1.169 1.087 1.847 2.569 1.905 4.17C140.935 46.231 140.365 47.757 139.273 48.929z" fill="${color}"/></svg>`;
  }
}

GeneralJs.prototype.returnTitleArr = function (color, height = 23) {
  let arr, ratio;

  ratio = [
    1.2953488372093024,
    1.1699145661229966,
    1.5460354444679798,
    1.5304667090305726,
    1.6419896914495518,
    1.4650343118329119,
    1.6419896914495518,
    1.4650343118329119,
  ];

  arr = [
    `<svg xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 121.263 80.293"><path d="M0 54.668h16.902c0.764 6.978 3.708 12.758 15.266 12.758 7.743 0 12.868-4.253 12.868-10.36 0-6.215-3.271-8.396-14.721-10.141C10.36 44.308 2.181 38.31 2.181 23.262c0-13.304 11.123-23.227 28.352-23.227 17.557 0 27.807 7.851 29.224 23.336h-16.248c-1.09-7.088-5.234-10.359-12.977-10.359 -7.742 0-11.668 3.598-11.668 8.833 0 5.562 2.508 8.179 14.503 9.923 18.865 2.399 28.57 7.525 28.57 23.664 0 13.85-11.34 24.862-29.77 24.862C10.796 80.293 0.981 70.261 0 54.668z" fill="${color}"/><path d="M69.575 63.283c0-13.304 12.213-18.32 29.661-18.32h6.434v-2.29c0-6.762-2.072-10.469-9.269-10.469 -6.216 0-9.051 3.163-9.705 8.07H71.756c0.981-13.522 11.668-19.52 25.626-19.52s23.881 5.67 23.881 21.156v37.185h-15.375v-6.87c-3.272 4.58-8.287 8.069-17.23 8.069C78.299 80.293 69.575 75.277 69.575 63.283zM105.669 59.138v-4.798h-6.106c-9.16 0-14.503 1.964-14.503 8.07 0 4.144 2.508 6.871 8.287 6.871C100.326 69.28 105.669 65.463 105.669 59.138z" fill="${color}"/></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 93.937 80.293"><path d="M0 4.687h25.724c18.12 0 28.43 8.019 28.43 23.744v0.417c0 15.726-10.935 23.224-27.909 23.224h-9.478v27.077H0V4.687zM25.307 40.303c8.228 0 12.602-3.958 12.602-11.352V28.535c0-7.915-4.583-11.039-12.602-11.039h-8.54v22.807H25.307z" fill="${color}"/><path d="M61.236 24.682h15.101v10.414c3.437-7.29 8.748-11.143 17.6-11.247v14.059c-11.143-0.104-17.6 3.541-17.6 13.955v27.285H61.236V24.682z" fill="${color}"/></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 124.136 80.293"><path d="M0 42.386v-0.833C0 18.954 15.83 3.541 36.97 3.541c17.912 0 31.242 8.748 33.013 27.076H52.696c-1.25-8.956-6.249-13.746-15.622-13.746 -11.768 0-19.266 9.164-19.266 24.577V42.281c0 15.413 7.082 24.369 19.371 24.369 9.269 0 15.725-4.687 17.079-14.268H70.816c-1.875 18.434-15.1 27.91-33.429 27.91C13.018 80.293 0 65.297 0 42.386z" fill="${color}"/><path d="M74.773 64.047c0-12.705 11.664-17.496 28.327-17.496h6.145v-2.187c0-6.457-1.979-9.997-8.852-9.997 -5.936 0-8.644 3.02-9.269 7.706H76.856c0.938-12.914 11.143-18.642 24.473-18.642s22.807 5.416 22.807 20.204v35.512h-14.684v-6.561c-3.124 4.374-7.915 7.706-16.454 7.706C83.104 80.293 74.773 75.503 74.773 64.047zM109.244 60.09v-4.582h-5.832c-8.748 0-13.851 1.874-13.851 7.706 0 3.957 2.396 6.561 7.915 6.561C104.141 69.774 109.244 66.13 109.244 60.09z" fill="${color}"/></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.889 80.293"><path d="M0 4.687h24.369c26.14 0 39.053 14.163 39.053 36.449V41.969c0 22.286-13.018 37.179-39.156 37.179H0V4.687zM23.744 66.025c14.997 0 22.078-8.436 22.078-23.848V41.344c0-15.309-6.561-23.535-22.286-23.535h-6.665v48.217H23.744z" fill="${color}"/><path d="M68.318 52.592v-0.833c0-17.184 12.185-28.327 28.015-28.327 14.059 0 26.556 8.228 26.556 27.702v4.165H83.628c0.416 9.061 5.311 14.268 13.538 14.268 6.978 0 10.414-3.021 11.352-7.603h14.268c-1.771 11.769-11.144 18.329-26.036 18.329C80.295 80.293 68.318 69.983 68.318 52.592zM108.205 46.03c-0.521-8.227-4.687-12.185-11.872-12.185 -6.77 0-11.352 4.479-12.497 12.185H108.205z" fill="${color}"/></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 131.843 80.293"><path d="M0 42.386v-0.833C0 18.954 15.829 3.541 36.97 3.541c17.912 0 31.242 8.748 33.013 27.077H52.695c-1.25-8.956-6.249-13.747-15.621-13.747 -11.769 0-19.267 9.165-19.267 24.577V42.281c0 15.413 7.082 24.369 19.37 24.369 9.269 0 15.726-4.686 17.079-14.267h16.559c-1.874 18.433-15.101 27.91-33.429 27.91C13.018 80.293 0 65.297 0 42.386z" fill="${color}"/><path d="M74.462 52.487v-0.833c0-17.079 12.393-28.222 28.742-28.222 16.351 0 28.639 10.935 28.639 27.91v0.833c0 17.184-12.393 28.118-28.742 28.118C86.854 80.293 74.462 69.462 74.462 52.487zM116.534 52.279v-0.729c0-10.414-4.895-16.663-13.33-16.663 -8.331 0-13.33 6.041-13.33 16.455v0.833c0 10.414 4.791 16.663 13.33 16.663C111.64 68.837 116.534 62.589 116.534 52.279z" fill="${color}"/></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 117.632 80.293"><path fill="${color}" d="M0,4.687h24.369c26.14,0,39.053,14.163,39.053,36.449v0.833c0,22.286-13.018,37.179-39.156,37.179H0V4.687z M23.744,66.025 c14.997,0,22.078-8.436,22.078-23.848v-0.833c0-15.309-6.561-23.535-22.286-23.535h-6.665v48.217L23.744,66.025L23.744,66.025z"/><path fill="${color}" d="M68.318,64.006c0-12.692,11.652-17.478,28.298-17.478h6.139v-2.185c0-6.45-1.977-9.987-8.844-9.987 c-5.93,0-8.635,3.017-9.259,7.698H70.398c0.937-12.9,11.133-18.622,24.449-18.622s22.784,5.41,22.784,20.183v35.477h-14.67v-6.555 c-3.121,4.369-7.907,7.699-16.438,7.699C76.641,80.236,68.318,75.451,68.318,64.006z M102.755,60.053v-4.577h-5.826 c-8.739,0-13.837,1.872-13.837,7.698c0,3.953,2.393,6.555,7.907,6.555C97.657,69.729,102.755,66.087,102.755,60.053z"/></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 123.2188 80.293"><path d="M0,4.5593h22.2144l17.3354,46.1938L56.6777,4.5593h21.7988v74.2212H61.7642V26.6701L41.2104,78.7805H35.709 L15.0518,26.6701v52.1104H0V4.5593z" fill="${color}"/><path d="M90.624,24.4899h15.0518v10.3809c3.4258-7.2666,8.7197-11.1074,17.543-11.2109v14.0137 c-11.1074-0.104-17.543,3.5298-17.543,13.9097v27.1973H90.624V24.4899z" fill="${color}"/></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 112.0726 80.293"><path d="M0.0657,4.5593h25.6396c18.0625,0,28.3389,7.9932,28.3389,23.668v0.415c0,15.6743-10.8994,23.1489-27.8198,23.1489h-9.4463 v26.9893H0.0657V4.5593z M25.2903,40.0612c8.2007,0,12.5605-3.9448,12.5605-11.3149v-0.4155 c0-7.8892-4.5674-11.0034-12.5605-11.0034h-8.5122v22.7339H25.2903z" fill="${color}"/><path d="M61.1038-0.1116h15.0518v33.2178c2.6992-5.3979,8.6162-9.8618,17.6475-9.8618c10.6914,0,18.2695,6.436,18.2695,20.9688 v34.5674H97.0208V46.3928c0-7.3696-2.9072-10.8994-9.5508-10.8994c-6.4355,0-11.3145,3.9448-11.3145,11.9375v31.3496H61.1038 V-0.1116z" fill="${color}"/></svg>`,
  ];

  return { heightRatio: ratio, svg: arr };
}

GeneralJs.prototype.returnNavigator = function (color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8.181 7.908"><path d="M7.893 6.239h-7.604C0.129 6.239 0 6.368 0 6.527v1.092c0 0.159 0.129 0.289 0.289 0.289h7.604c0.159 0 0.289-0.129 0.289-0.289V6.527C8.181 6.368 8.052 6.239 7.893 6.239z" fill="${GeneralJs.colorChip.green}"/><path d="M0.276 5.519h7.63c0.231 0 0.359-0.28 0.214-0.468l-3.763-4.917c-0.136-0.178-0.396-0.178-0.532 0l-3.764 4.917C-0.083 5.239 0.045 5.519 0.276 5.519z" fill="${color}"/></svg>`;
}

GeneralJs.prototype.returnExtract = function (color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 314.679 388.43"><path d="M310.776 204.421h-67.473c-0.985 0-1.783 0.799-1.783 1.783v173.779c0 4.666-3.782 8.447-8.447 8.447H81.607c-4.665 0-8.447-3.782-8.447-8.447V206.204c0-0.985-0.799-1.783-1.783-1.783H3.903c-3.232 0-5.059-3.709-3.089-6.271L151.189 3.029c3.106-4.038 9.196-4.038 12.301 0l150.374 195.12C315.835 200.711 314.008 204.421 310.776 204.421z" fill="${color}"/></svg>`;
}

GeneralJs.prototype.returnInterAction = function (color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 446.1 446.1"><path class="st0" d="M446 437.3L414.4 193c-0.4-3.3-4.4-4.5-6.6-2.3L360 238.4c-0.7 0.7-1.8 0.7-2.5 0l-26.9-26.9 0 0L207.6 88.6c-0.7-0.7-0.7-1.8 0-2.5l47.7-47.7c2.3-2.3 1-6.2-2.3-6.6L8.8 0.1c-5-0.6-9.3 3.7-8.7 8.7l31.6 244.3c0.4 3.3 4.4 4.5 6.6 2.3L86 207.6c0.7-0.7 1.8-0.7 2.5 0l27 27 0 0 122.9 122.9c0.7 0.7 0.7 1.8 0 2.5l-47.7 47.7c-2.3 2.3-1 6.2 2.3 6.6L437.3 446C442.4 446.7 446.7 442.4 446 437.3z" fill="${color}"/></svg>`;
}

GeneralJs.prototype.returnTalk = function (color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 421.983 385.724"><path d="M45.862 380.211c-2.035 2.093-0.485 5.651 2.398 5.509 41.274-2.037 90.99-18.691 124.766-45.899 2.845-2.291 6.427-3.402 10.03-3.015 9.141 0.981 18.464 1.493 27.936 1.493 116.527 0 210.991-74.348 210.991-168.629S327.52 0 210.992 0 0 75.389 0 169.67c0 51.139 30.824 96.055 77.016 128.587 2.297 1.618 3.636 4.344 3.53 7.193C79.207 341.602 56.86 368.898 45.862 380.211z" fill="${color}"/></svg>`;
}

GeneralJs.prototype.returnProfile = function (color, circle = false) {
  if (circle) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 455 455"><path d="M227.5 0C101.855 0 0 101.855 0 227.5S101.855 455 227.5 455 455 353.145 455 227.5 353.145 0 227.5 0zM227.5 85.86c36.175 0 65.5 28.716 65.5 64.14 0 35.423-29.325 64.14-65.5 64.14 -36.175 0-65.5-28.716-65.5-64.14C162 114.577 191.325 85.86 227.5 85.86zM227.5 370c-63.789 0-115.5-19.252-115.5-43 0-34.357 1.24-80.277 57.093-117.897 1.78-1.199 4.149-1.065 5.759 0.353 6.299 5.551 24.124 19.215 52.648 19.215 28.504 0 46.345-13.669 52.649-19.218 1.61-1.417 3.978-1.55 5.756-0.352C341.76 246.722 343 292.643 343 327 343 350.748 291.289 370 227.5 370z" fill="${color}"/></svg>`;
  } else {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 369.906 455"><path d="M369.906 386.143c0 38.029-82.806 68.857-184.953 68.857S0 424.172 0 386.143c0-55.017 1.985-128.55 91.425-188.791 2.85-1.919 6.644-1.706 9.221 0.566 10.086 8.889 38.63 30.77 84.307 30.77 45.644 0 74.214-21.889 84.308-30.775 2.578-2.269 6.37-2.481 9.218-0.563C367.921 257.591 369.906 331.126 369.906 386.143zM184.953 205.417c57.928 0 104.887-45.984 104.887-102.709C289.84 45.984 242.881 0 184.953 0 127.026 0 80.066 45.984 80.066 102.709 80.066 159.433 127.026 205.417 184.953 205.417z" fill="${color}"/></svg>`;
  }
}

GeneralJs.prototype.returnLogout = function (color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 424.942 505.757"><path d="M278.583 326.277h19.269c2.611 0 4.728 2.117 4.728 4.728v108.305 16.073 7.924c0 2.611-2.117 4.728-4.728 4.728H178.201c-2.611 0-4.728-2.117-4.728-4.728v-19.269c0-2.611 2.117-4.728 4.728-4.728h90.926c2.611 0 4.728-2.117 4.728-4.728V331.005C273.855 328.393 275.972 326.277 278.583 326.277zM278.583 178.17h19.269c2.611 0 4.728-2.117 4.728-4.728V65.137 49.064v-7.924c0-2.611-2.117-4.728-4.728-4.728H178.201c-2.611 0-4.728 2.117-4.728 4.728v19.269c0 2.611 2.117 4.728 4.728 4.728h90.926c2.611 0 4.728 2.117 4.728 4.728v103.577C273.855 176.053 275.972 178.17 278.583 178.17zM422.434 247.537l-92.906-59.541c-1.99-1.276-4.604 0.154-4.604 2.518v15.979c0 1.17-0.949 2.119-2.119 2.119H178.921c-3.009 0-5.447 2.439-5.447 5.447v75.764c0 3.009 2.439 5.447 5.447 5.447h143.884c1.17 0 2.119 0.949 2.119 2.119v15.996c0 2.36 2.606 3.79 4.597 2.522l92.901-59.191C425.777 254.58 425.783 249.684 422.434 247.537zM149.64 24.761v454.666c0 18.688-18.941 31.415-36.243 24.353l-89.219-36.415C9.556 461.398 0 447.175 0 431.383V74.073C0 58.138 9.727 43.818 24.539 37.945l91.246-36.179C132.024-4.673 149.64 7.293 149.64 24.761zM122.286 250.815c0-8.442-6.844-15.286-15.286-15.286s-15.286 6.844-15.286 15.286c0 8.442 6.844 15.286 15.286 15.286S122.286 259.257 122.286 250.815z" fill="${color}"/></svg>`;
}

GeneralJs.prototype.returnTalkBoxTriangle = function (color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 259.582 443.73"><path d="M0 0v259.584V432.318c0 10.06 12.086 15.18 19.311 8.179l173.011-167.605c8.81-8.534 20.595-13.307 32.86-13.307h34.4V0H0z" fill="${color}"/></svg>`;
}

GeneralJs.prototype.returnFolder = function (color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 416.427 350.794"><path d="M173.206 29.54L133.756 4.781C128.779 1.657 123.022 0 117.145 0H23.61C10.57 0 0 10.57 0 23.61v303.92c0 12.849 10.416 23.265 23.265 23.265h373.314c10.962 0 19.848-8.886 19.848-19.848V55.293c0-11.583-9.389-20.972-20.972-20.972H189.817C183.94 34.321 178.183 32.664 173.206 29.54z" fill="${color}"/></svg>`;
}

GeneralJs.prototype.returnFilter = function (color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1206.412 1268.126"><path fill="${color}" d="M1154.367 0H52.045C5.759 0-17.41 59.19 15.334 93.785l419.086 442.77v403.991c0 23.315 9.28 45.671 25.791 62.132l256.736 255.967c20.34 20.279 55.045 5.873 55.045-22.849V536.555l419.086-442.77C1223.822 59.19 1200.653 0 1154.367 0z"/></svg>`;
}

GeneralJs.prototype.returnDownload = function (color, longMode = false) {
  if (longMode) {
    return `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 41.684 72.772"><path fill="${color}" d="M41.684,70.169c0,1.437-1.166,2.603-2.603,2.603H2.603C1.166,72.772,0,71.606,0,70.169 c0-1.437,1.166-2.603,2.603-2.603H39.08C40.518,67.565,41.684,68.731,41.684,70.169z M19.001,56.57 c0.508,0.508,1.173,0.759,1.84,0.759c0.668,0,1.332-0.251,1.84-0.759l18.239-18.235c1.017-1.017,1.017-2.671,0-3.688 c-1.017-1.017-2.664-1.017-3.681,0L23.445,48.442V2.603C23.445,1.166,22.279,0,20.842,0c-1.437,0-2.603,1.166-2.603,2.603v45.839 L4.444,34.647c-1.017-1.017-2.664-1.003-3.681,0c-1.017,1.017-1.017,2.671,0,3.688L19.001,56.57z"/></svg>`;
  } else {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.853 30.842"><path fill="${color}" d="M16.366 25.637c0.281 0.281 0.663 0.439 1.061 0.439s0.78-0.158 1.061-0.439L25.75 18.375c0.586-0.586 0.586-1.535 0-2.121s-1.535-0.586-2.121 0l-4.703 4.703V1.5c0-0.829-0.671-1.5-1.5-1.5s-1.5 0.671-1.5 1.5v19.456l-4.702-4.702c-0.586-0.586-1.535-0.586-2.121 0s-0.586 1.535 0 2.121L16.366 25.637z"/><path d="M25.45 27.83H9.403c-0.829 0-1.5 0.672-1.5 1.5s0.671 1.5 1.5 1.5h16.047c0.828 0 1.5-0.672 1.5-1.5S26.278 27.83 25.45 27.83z" fill="${color}"/></svg>`;
  }
}

GeneralJs.prototype.returnCancel = function (color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.219 32.219"><path d="M18.967 16.109L31.627 3.45c0.789-0.789 0.789-2.069 0-2.858 -0.788-0.789-2.069-0.789-2.858 0L16.109 13.252 3.45 0.592c-0.788-0.789-2.069-0.789-2.858 0 -0.789 0.789-0.789 2.069 0 2.858l12.66 12.66L0.592 28.769c-0.789 0.789-0.789 2.068 0 2.858 0.394 0.395 0.912 0.592 1.429 0.592s1.035-0.197 1.429-0.592l12.66-12.66 12.66 12.66c0.394 0.395 0.912 0.592 1.429 0.592 0.517 0 1.035-0.197 1.429-0.592 0.789-0.789 0.789-2.068 0-2.858L18.967 16.109z" fill="${color}"/></svg>`;
}

GeneralJs.prototype.returnSearch = function (color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 37.146 39.325"><path d="M13.308 2.882c6.582-0.834 12.616 3.843 13.45 10.425s-3.843 12.616-10.425 13.45 -12.616-3.843-13.45-10.425S6.725 3.716 13.308 2.882M12.958 0.119C4.839 1.148-0.909 8.563 0.119 16.682s8.444 13.867 16.563 12.839c8.119-1.028 13.867-8.444 12.839-16.563C28.492 4.839 21.077-0.909 12.958 0.119L12.958 0.119z" fill="${color}"/><path d="M35.929 39.314c-0.434 0.055-0.887-0.095-1.204-0.442l-11.032-12.096c-0.519-0.568-0.479-1.449 0.089-1.967 0.568-0.519 1.449-0.479 1.968 0.089l11.032 12.096c0.519 0.568 0.479 1.449-0.089 1.967C36.472 39.162 36.205 39.279 35.929 39.314z" fill="${color}"/></svg>`;
}

GeneralJs.prototype.returnDotdotdot = function (color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 336.215 72.772"><path d="M72.772,36.386c0,20.095-16.29,36.386-36.386,36.386S0,56.481,0,36.386S16.29,0,36.386,0S72.772,16.29,72.772,36.386z M168.109,0c-20.095,0-36.386,16.29-36.386,36.386s16.29,36.386,36.386,36.386s36.386-16.29,36.386-36.386S188.205,0,168.109,0z M299.829,0c-20.095,0-36.386,16.29-36.386,36.386s16.29,36.386,36.386,36.386s36.386-16.29,36.386-36.386S319.924,0,299.829,0z" fill="${color}"/></svg>`;
}

GeneralJs.prototype.returnLogo = function (color, type = 0) {
  let logos;
  logos = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 259.467 33.789"><path d="M22.801 33.27h9.746V32.9c-2.101-1.203-2.861-1.758-2.861-4.812V6.063c0-3.054 0.76-3.609 2.861-4.813v-0.37h-9.746v0.37c2.101 1.204 2.816 1.758 2.816 4.813v9.624H6.885V6.063c0-3.054 0.76-3.609 2.861-4.813v-0.37H0v0.37c2.102 1.204 2.817 1.758 2.817 4.813v22.025c0 3.053-0.715 3.609-2.817 4.812v0.37h9.746V32.9c-2.101-1.203-2.861-1.758-2.861-4.812V17.584h18.733v10.504c0 3.053-0.715 3.609-2.816 4.812V33.27zM51.62 22.025c0 6.062-2.235 9.81-6.572 9.81 -4.336 0-6.572-3.748-6.572-9.81 0-6.061 2.235-9.809 6.572-9.809C49.384 12.216 51.62 15.964 51.62 22.025M55.957 22.025c0-6.847-4.649-11.706-10.909-11.706 -6.259 0-10.908 4.858-10.908 11.706 0 6.848 4.649 11.707 10.908 11.707C51.308 33.733 55.957 28.874 55.957 22.025M85.78 33.269h8.986v-0.324c-1.922-1.248-2.502-1.666-2.502-4.72v-9.903c0-4.904-2.235-8.004-6.483-8.004 -3.621 0-6.392 2.313-7.556 6.2 -0.447-3.887-2.548-6.2-6.392-6.2 -3.621 0-6.171 2.22-7.466 6.061l-0.179-5.599h-6.706v0.278c1.699 1.111 2.996 1.989 2.996 4.488v12.678c0 3.054-0.627 3.471-2.548 4.72v0.324h8.986v-0.324c-1.922-1.248-2.548-1.666-2.548-4.72v-6.802c0-5.321 2.728-8.282 5.857-8.282 3.308 0 4.158 2.915 4.158 5.969v9.115c0 3.054-0.582 3.471-2.504 4.72v0.324h8.987v-0.324c-1.922-1.248-2.549-1.666-2.549-4.72v-6.802c0-5.321 2.683-8.282 5.858-8.282 3.263 0 4.157 2.915 4.157 5.969v9.115c0 3.054-0.626 3.471-2.548 4.72V33.269zM100.933 19.851c0.403-4.581 2.548-7.68 6.08-7.68 4.247 0 5.41 3.748 5.499 7.68H100.933zM100.845 21.61h15.871c0-7.126-3.532-11.29-9.658-11.29 -5.767 0-10.416 4.673-10.416 11.984 0 7.31 4.739 11.429 10.595 11.429 5.007 0 8.226-2.729 9.254-7.449l-0.939-0.324c-1.297 3.609-3.755 5.274-7.153 5.274C103.66 31.234 100.845 27.579 100.845 21.61M143.041 33.379l1.663-9.027h-0.36c-3.326 5.444-4.945 7.212-9.89 7.212h-7.778V6.019c0-3.071 0.764-3.629 2.878-4.838V0.808h-9.802v0.373c2.113 1.209 2.833 1.768 2.833 4.838v22.148c0 3.071-0.719 3.63-2.833 4.839v0.373H143.041zM153.444 2.915c0-1.619-1.252-2.915-2.817-2.915 -1.61 0-2.816 1.296-2.816 2.915 0 1.573 1.207 2.87 2.816 2.87C152.192 5.785 153.444 4.488 153.444 2.915M146.38 33.269h8.986v-0.324c-1.922-1.249-2.547-1.666-2.547-4.72V10.781h-6.885v0.278c1.698 1.111 2.995 1.989 2.995 4.488v12.678c0 3.054-0.626 3.471-2.548 4.72V33.269zM187.258 2.915c0-1.619-1.252-2.915-2.816-2.915 -1.61 0-2.817 1.296-2.817 2.915 0 1.573 1.207 2.87 2.817 2.87C186.006 5.785 187.258 4.488 187.258 2.915M171.138 23.933c0 4.952-3.218 7.45-6.035 7.45 -2.414 0-3.934-1.249-3.934-3.794 0-3.239 2.37-4.489 6.706-5.367l3.263-0.695V23.933zM180.393 33.285h8.986v-0.3c-1.923-1.249-2.548-1.648-2.548-4.703V10.838h-6.885v0.278c1.698 1.111 2.995 1.989 2.995 4.488l-0.004 12.91c0 2.225-1.742 4.029-3.892 4.029 -2.15 0-3.893-1.804-3.893-4.029 0 0 0.011-6.339 0.011-10.458 0-5.043-2.771-7.68-8.404-7.68 -5.41 0-8.674 2.684-8.674 5.645 0 1.758 1.029 2.683 2.504 2.683 0.804 0 1.743-0.277 2.19-0.694 -0.492-0.602-0.804-1.25-0.804-2.268 0-2.221 1.61-3.563 4.247-3.563 3.487 0 4.917 1.712 4.917 6.016v1.758l-3.576 0.648c-5.41 1.017-10.506 2.498-10.506 7.448 0 3.794 2.861 5.738 6.438 5.738 3.666 0 6.751-2.129 7.735-5.044 0.134 3.378 2.671 4.54 4.406 4.54 0.04 0 0.076-0.002 0.116-0.002h4.641L180.393 33.285zM196.315 15.697c0-2.036 1.52-3.424 4.158-3.424 3.219 0 5.544 2.499 7.511 5.737h0.491v-7.634h-0.314l-1.699 1.85c-1.52-0.972-3.398-1.85-6.035-1.85 -4.247 0-7.421 2.683-7.421 6.524 0 3.656 1.923 5.599 7.466 6.756 3.756 0.74 5.768 1.573 5.768 4.164 0 2.73-2.102 4.025-4.829 4.025 -3.398 0-6.08-2.267-8.36-6.616h-0.627l0.492 8.56h0.358l1.565-1.99c1.475 0.926 3.756 1.99 6.572 1.99 4.739 0 8.271-2.777 8.271-7.08 0-3.794-2.19-5.784-8.002-6.94C197.834 18.982 196.315 17.918 196.315 15.697M230.5 22.082c0 6.063-2.235 9.811-6.572 9.811 -4.336 0-6.572-3.748-6.572-9.811 0-6.061 2.235-9.809 6.572-9.809C228.266 12.273 230.5 16.021 230.5 22.082M234.837 22.082c0-6.847-4.649-11.706-10.908-11.706s-10.908 4.858-10.908 11.706c0 6.849 4.649 11.707 10.908 11.707S234.837 28.931 234.837 22.082M259.467 33.285V32.962c-1.923-1.249-2.548-1.666-2.548-4.72v-9.855c0-4.952-2.415-8.051-6.974-8.051 -3.756 0-6.573 2.175-7.869 6.061l-0.179-5.599h-6.705v0.278c1.698 1.111 2.995 1.989 2.995 4.488v12.678c0 3.054-0.626 3.471-2.547 4.72v0.324h8.985V32.962c-1.922-1.249-2.548-1.666-2.548-4.72v-6.801c0-5.322 2.907-8.237 6.26-8.237 3.532 0 4.694 2.822 4.694 5.876v9.161c0 3.054-0.626 3.471-2.547 4.72v0.324H259.467z" fill="${color}"/></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 259.467 66.972"><path d="M22.801 33.27h9.746v-0.37c-2.101-1.203-2.861-1.758-2.861-4.812V6.063c0-3.054 0.76-3.609 2.861-4.813v-0.37h-9.746v0.37c2.101 1.204 2.816 1.758 2.816 4.813v9.624H6.885v-9.624c0-3.054 0.76-3.609 2.861-4.813v-0.37H0v0.37c2.102 1.204 2.817 1.758 2.817 4.813v22.025c0 3.053-0.715 3.609-2.817 4.812v0.37h9.746v-0.37c-2.101-1.203-2.861-1.758-2.861-4.812V17.584h18.733v10.504c0 3.053-0.715 3.609-2.816 4.812V33.27zM51.62 22.025c0 6.062-2.235 9.81-6.572 9.81 -4.336 0-6.572-3.748-6.572-9.81 0-6.061 2.235-9.809 6.572-9.809C49.384 12.216 51.62 15.964 51.62 22.025M55.957 22.025c0-6.847-4.649-11.706-10.909-11.706 -6.259 0-10.908 4.858-10.908 11.706 0 6.848 4.649 11.707 10.908 11.707C51.308 33.733 55.957 28.874 55.957 22.025M85.78 33.269h8.986v-0.324c-1.922-1.249-2.502-1.666-2.502-4.72v-9.902c0-4.904-2.235-8.004-6.483-8.004 -3.621 0-6.392 2.313-7.556 6.2 -0.447-3.887-2.548-6.2-6.392-6.2 -3.621 0-6.171 2.221-7.466 6.062L64.187 10.781h-6.706v0.278c1.699 1.111 2.996 1.989 2.996 4.488V28.225c0 3.054-0.627 3.471-2.548 4.72v0.324h8.986v-0.324c-1.922-1.249-2.548-1.666-2.548-4.72v-6.802c0-5.321 2.728-8.282 5.857-8.282 3.308 0 4.158 2.915 4.158 5.969v9.115c0 3.054-0.582 3.471-2.504 4.72v0.324h8.987v-0.324c-1.922-1.249-2.549-1.666-2.549-4.72v-6.802c0-5.321 2.683-8.282 5.858-8.282 3.263 0 4.157 2.915 4.157 5.969v9.115c0 3.054-0.626 3.471-2.548 4.72V33.269zM100.933 19.851c0.403-4.581 2.548-7.68 6.08-7.68 4.247 0 5.41 3.748 5.499 7.68H100.933zM100.845 21.61h15.871c0-7.126-3.532-11.29-9.658-11.29 -5.767 0-10.416 4.673-10.416 11.984 0 7.31 4.739 11.429 10.595 11.429 5.007 0 8.226-2.73 9.254-7.449l-0.939-0.324c-1.297 3.609-3.755 5.274-7.153 5.274C103.66 31.234 100.845 27.579 100.845 21.61M143.041 33.379l1.663-9.027h-0.36c-3.326 5.444-4.945 7.212-9.89 7.212h-7.778V6.019c0-3.071 0.764-3.629 2.878-4.838v-0.373h-9.802v0.373c2.113 1.209 2.833 1.768 2.833 4.838v22.148c0 3.071-0.719 3.63-2.833 4.839v0.373H143.041zM153.444 2.915C153.444 1.296 152.192 0 150.627 0c-1.61 0-2.816 1.296-2.816 2.915 0 1.573 1.207 2.87 2.816 2.87C152.192 5.785 153.444 4.488 153.444 2.915M146.38 33.269h8.986v-0.324c-1.922-1.249-2.547-1.666-2.547-4.72V10.781h-6.885v0.278c1.698 1.111 2.995 1.989 2.995 4.488V28.225c0 3.054-0.626 3.471-2.548 4.72V33.269zM187.258 2.915C187.258 1.296 186.006 0 184.441 0c-1.61 0-2.817 1.296-2.817 2.915 0 1.573 1.207 2.87 2.817 2.87C186.006 5.785 187.258 4.488 187.258 2.915M171.138 23.933c0 4.952-3.218 7.45-6.035 7.45 -2.414 0-3.934-1.249-3.934-3.794 0-3.239 2.37-4.489 6.706-5.367l3.263-0.695V23.933zM180.393 33.285h8.986v-0.3c-1.923-1.249-2.548-1.648-2.548-4.703V10.838h-6.885v0.278c1.698 1.111 2.995 1.989 2.995 4.488l-0.004 12.91c0 2.225-1.742 4.029-3.892 4.029 -2.15 0-3.893-1.804-3.893-4.029 0 0 0.011-6.339 0.011-10.458 0-5.043-2.771-7.68-8.404-7.68 -5.41 0-8.674 2.684-8.674 5.645 0 1.758 1.029 2.683 2.504 2.683 0.804 0 1.743-0.277 2.19-0.694 -0.492-0.602-0.804-1.25-0.804-2.268 0-2.221 1.61-3.563 4.247-3.563 3.487 0 4.917 1.712 4.917 6.016v1.758l-3.576 0.648c-5.41 1.017-10.506 2.498-10.506 7.448 0 3.794 2.861 5.738 6.438 5.738 3.666 0 6.751-2.129 7.735-5.044 0.134 3.378 2.671 4.54 4.406 4.54 0.04 0 0.076-0.002 0.116-0.002h4.641L180.393 33.285zM196.315 15.697c0-2.036 1.52-3.424 4.158-3.424 3.219 0 5.544 2.499 7.511 5.737h0.491v-7.634h-0.314l-1.699 1.85c-1.52-0.972-3.398-1.85-6.035-1.85 -4.247 0-7.421 2.683-7.421 6.524 0 3.656 1.923 5.599 7.466 6.756 3.756 0.74 5.768 1.573 5.768 4.164 0 2.73-2.102 4.025-4.829 4.025 -3.398 0-6.08-2.267-8.36-6.617h-0.627l0.492 8.56h0.358l1.565-1.99c1.475 0.926 3.756 1.99 6.572 1.99 4.739 0 8.271-2.777 8.271-7.08 0-3.794-2.19-5.784-8.002-6.94C197.834 18.982 196.315 17.918 196.315 15.697M230.5 22.082c0 6.063-2.235 9.811-6.572 9.811 -4.336 0-6.572-3.748-6.572-9.811 0-6.061 2.235-9.809 6.572-9.809C228.266 12.273 230.5 16.021 230.5 22.082M234.837 22.082c0-6.847-4.649-11.706-10.908-11.706s-10.908 4.858-10.908 11.706c0 6.849 4.649 11.707 10.908 11.707S234.837 28.931 234.837 22.082M259.467 33.285V32.962c-1.923-1.249-2.548-1.666-2.548-4.72v-9.855c0-4.952-2.415-8.051-6.974-8.051 -3.756 0-6.573 2.175-7.869 6.061l-0.179-5.599h-6.705v0.278c1.698 1.111 2.995 1.989 2.995 4.488v12.678c0 3.054-0.626 3.471-2.547 4.72v0.324h8.985V32.962c-1.922-1.249-2.548-1.666-2.548-4.72v-6.801c0-5.322 2.907-8.237 6.26-8.237 3.532 0 4.694 2.822 4.694 5.876v9.161c0 3.054-0.626 3.471-2.547 4.72v0.324H259.467z" fill="${color}"/><path d="M102.077 57.768v1.458h7.55v1.143H93.24v-1.143h7.51v-1.458c-2.945-0.118-4.682-0.907-4.682-2.483 0-1.675 2.01-2.463 5.385-2.463 3.375 0 5.385 0.788 5.385 2.463C106.837 56.862 105.062 57.67 102.077 57.768zM94.273 52.113v-1.143h14.339v1.143H94.273zM95.444 66.656v-5.163h11.998v5.163H95.444zM106.115 62.636h-9.345v2.877h9.345V62.636zM101.453 53.946c-2.165 0-3.999 0.315-3.999 1.34 0 1.024 1.834 1.36 3.999 1.36 2.165 0 3.999-0.335 3.999-1.36C105.452 54.261 103.618 53.946 101.453 53.946zM98.429 49.827v-1.163h6.184v1.163H98.429z" fill="${color}"/><path d="M122.038 61.847c-2.185 0.316-4.643 0.611-10.593 0.611v-6.877h6.926v-4.119h-7.004v-1.143h8.331v6.404h-6.926v4.572c3.434 0.039 6.808-0.178 9.111-0.611L122.038 61.847zM123.793 66.932V48.605h1.327v18.327H123.793z" fill="${color}"/><path d="M135.02 55.916h2.399v-6.956h1.327v17.065h-1.327V57.059h-2.399c-0.137 3.429-1.483 5.537-3.804 5.537 -2.458 0-3.824-2.365-3.824-6.149s1.366-6.148 3.824-6.148C133.556 50.3 134.903 52.448 135.02 55.916zM131.216 51.462c-1.522 0-2.478 1.872-2.478 4.986 0 3.114 0.956 4.986 2.478 4.986s2.478-1.872 2.478-4.986C133.693 53.335 132.737 51.462 131.216 51.462zM140.931 66.932V48.605h1.327v18.327H140.931z" fill="${color}"/><path d="M144.075 58.832v-1.143h7.53v-2.72h1.327v2.72h7.53v1.143H144.075zM158.999 55.975c-3.18-0.572-5.892-2.227-6.731-3.863 -0.683 1.636-3.355 3.291-6.652 3.843l-0.624-1.103c2.926-0.316 6.34-1.951 6.593-4.335h-5.931v-1.143h13.188v1.143h-5.852c0.254 2.404 3.941 4.039 6.633 4.335L158.999 55.975zM152.269 66.972c-3.96 0-6.204-1.182-6.204-3.232 0-2.01 2.244-3.251 6.204-3.251 3.961 0 6.223 1.123 6.223 3.251C158.492 65.828 156.229 66.972 152.269 66.972zM147.431 63.739c0 1.341 1.834 2.069 4.838 2.069 3.024 0 4.858-0.729 4.858-2.069 0-1.32-1.834-2.088-4.858-2.088C149.265 61.651 147.431 62.419 147.431 63.739z" fill="${color}"/></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 147.041 66.999"><path d="M3.004 38.873V5.303c0-3.125-0.757-3.693-2.983-4.924V0h10.323v0.378C8.118 1.609 7.312 2.178 7.312 5.303v9.849h19.84V5.303c0-3.125-0.758-3.693-2.983-4.924V0h10.323v0.378c-2.226 1.231-3.03 1.799-3.03 4.924v22.539c0 3.125 0.805 3.693 3.03 4.924v0.378H24.17v-0.378c2.225-1.231 2.983-1.799 2.983-4.924V17.093H7.312L7.272 38.873" fill="${color}"/><path d="M48.599 11.6c-4.593 0-6.96 3.835-6.96 10.038s2.367 10.039 6.96 10.039c4.593 0 6.96-3.836 6.96-10.039S53.192 11.6 48.599 11.6M48.599 33.618c-6.629 0-11.554-4.972-11.554-11.98 0-7.008 4.924-11.979 11.554-11.979 6.629 0 11.554 4.972 11.554 11.979C60.153 28.647 55.229 33.618 48.599 33.618" fill="${color}"/><path d="M92.608 9.659c4.498 0 6.866 3.172 6.866 8.191v10.133c0 3.125 0.616 3.551 2.651 4.83v0.331h-9.517v-0.331c2.036-1.278 2.699-1.705 2.699-4.83v-9.329c0-3.124-0.947-6.108-4.403-6.108 -3.361 0-6.203 3.03-6.203 8.477v6.96c0 3.125 0.663 3.551 2.699 4.83v0.331H77.882v-0.331c2.036-1.278 2.651-1.705 2.651-4.83v-9.329c0-3.124-0.899-6.108-4.403-6.108 -3.315 0-6.203 3.03-6.203 8.477v6.96c0 3.125 0.663 3.551 2.699 4.83v0.331h-9.517v-0.331c2.036-1.278 2.699-1.705 2.699-4.83V15.009c0-2.557-1.373-3.456-3.172-4.593v-0.285h7.103l0.189 5.73c1.373-3.93 4.072-6.203 7.908-6.203 4.072 0 6.297 2.368 6.771 6.346C85.837 12.027 88.773 9.659 92.608 9.659" fill="${color}"/><path d="M120.92 19.413c-0.095-4.024-1.326-7.86-5.824-7.86 -3.741 0-6.014 3.172-6.439 7.86H120.92zM125.371 21.213h-16.809c0 6.108 2.982 9.849 8.001 9.849 3.599 0 6.204-1.705 7.577-5.398l0.995 0.331c-1.089 4.831-4.499 7.624-9.802 7.624 -6.202 0-11.222-4.214-11.222-11.696 0-7.481 4.924-12.264 11.033-12.264C121.631 9.659 125.371 13.92 125.371 21.213" fill="${color}"/><path d="M32.351 61.321c0 3.126 0.663 3.551 2.699 4.83v0.332h-9.517v-0.332c2.036-1.278 2.699-1.704 2.699-4.83V48.848c0-2.557-1.373-3.456-3.172-4.593v-0.285h7.292V61.321z" fill="${color}"/><path d="M78.42 48.485c0 2.273 1.61 3.362 5.683 4.167 6.155 1.184 8.475 3.22 8.475 7.102 0 4.403-3.741 7.245-8.76 7.245 -2.983 0-5.398-1.088-6.961-2.036l-1.657 2.036h-0.379l-0.521-8.76h0.664c2.414 4.451 5.255 6.77 8.854 6.77 2.888 0 5.114-1.325 5.114-4.118 0-2.652-2.131-3.504-6.109-4.263 -5.871-1.184-7.908-3.172-7.908-6.913 0-3.93 3.362-6.677 7.86-6.677 2.794 0 4.783 0.899 6.392 1.894l1.8-1.894h0.331v7.813H90.778c-2.083-3.315-4.545-5.872-7.955-5.872C80.03 44.981 78.42 46.401 78.42 48.485" fill="${color}"/><path d="M107.666 44.648c-4.593 0-6.96 3.835-6.96 10.038 0 6.204 2.367 10.039 6.96 10.039 4.593 0 6.96-3.835 6.96-10.039C114.626 48.483 112.259 44.648 107.666 44.648M107.666 66.999c-6.629 0-11.554-4.972-11.554-11.98 0-7.007 4.924-11.979 11.554-11.979 6.629 0 11.554 4.972 11.554 11.979C119.22 62.027 114.295 66.999 107.666 66.999" fill="${color}"/><path d="M144.342 61.337c0 3.126 0.663 3.551 2.699 4.83v0.331h-9.517v-0.331c2.036-1.278 2.699-1.704 2.699-4.83v-9.376c0-3.124-1.231-6.013-4.972-6.013 -3.551 0-6.629 2.982-6.629 8.429v6.96c0 3.126 0.663 3.551 2.699 4.83v0.331h-9.517v-0.331c2.036-1.278 2.699-1.704 2.699-4.83V48.363c0-2.557-1.373-3.456-3.172-4.593v-0.285h7.103l0.189 5.729c1.373-3.977 4.356-6.203 8.334-6.203 4.829 0 7.387 3.172 7.387 8.24V61.337z" fill="${color}"/><path d="M51.755 56.928c0 5.068-3.409 7.624-6.393 7.624 -2.557 0-4.166-1.278-4.166-3.882 0-3.314 2.509-4.593 7.102-5.493l3.457-0.711V56.928zM68.374 61.379V44.029h-7.292v0.285c1.799 1.137 3.172 2.036 3.172 4.593L64.25 61.616c0 2.278-1.846 4.123-4.123 4.123 -2.277 0-4.122-1.846-4.122-4.123 0 0 0.012-6.486 0.012-10.701 0-5.161-2.936-7.86-8.902-7.86 -5.729 0-9.186 2.747-9.186 5.777 0 1.798 1.089 2.746 2.652 2.746 0.852 0 1.847-0.284 2.319-0.71 -0.52-0.616-0.852-1.279-0.852-2.32 0-2.273 1.705-3.646 4.499-3.646 3.692 0 5.208 1.752 5.208 6.156v1.799l-3.788 0.663c-5.73 1.042-11.128 2.557-11.128 7.623 0 3.883 3.03 5.872 6.819 5.872 3.882 0 7.15-2.178 8.191-5.161 0.142 3.457 2.83 4.645 4.667 4.645 0.043 0 0.081-0.002 0.123-0.002h4.915l0.001 0.002h9.518v-0.307C69.036 64.913 68.374 64.505 68.374 61.379" fill="${color}"/><path d="M7.271 38.873v25.863h5.284c5.236 0 6.95-1.808 10.474-7.379h0.38l-1.761 9.237H-0.061v-0.381c2.238-1.237 3-1.808 3-4.951L3.003 38.873" fill="${color}"/></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 230.47 67.055"><path d="M3.064 38.873V5.304c0-3.125-0.757-3.693-2.983-4.924V0h10.323v0.379c-2.225 1.231-3.03 1.799-3.03 4.924v9.849h19.84V5.304c0-3.125-0.758-3.693-2.983-4.924V0h10.323v0.379c-2.226 1.231-3.03 1.799-3.03 4.924v22.539c0 3.125 0.805 3.693 3.03 4.924v0.378H24.23v-0.378c2.225-1.231 2.983-1.799 2.983-4.924v-10.749H7.373L7.332 38.873" fill="${color}"/><path d="M48.66 11.601c-4.593 0-6.96 3.835-6.96 10.038 0 6.204 2.367 10.039 6.96 10.039 4.593 0 6.96-3.835 6.96-10.039C55.62 15.436 53.253 11.601 48.66 11.601M48.66 33.619c-6.629 0-11.554-4.972-11.554-11.98 0-7.007 4.924-11.979 11.554-11.979 6.629 0 11.554 4.972 11.554 11.979C60.214 28.647 55.289 33.619 48.66 33.619" fill="${color}"/><path d="M92.668 9.66c4.498 0 6.866 3.172 6.866 8.191v10.133c0 3.126 0.616 3.552 2.651 4.831v0.331h-9.517v-0.331c2.036-1.278 2.699-1.705 2.699-4.831V18.657c0-3.126-0.947-6.109-4.403-6.109 -3.361 0-6.203 3.03-6.203 8.477v6.959c0 3.126 0.663 3.552 2.699 4.831v0.331h-9.517v-0.331c2.036-1.278 2.651-1.705 2.651-4.831V18.657c0-3.126-0.899-6.109-4.403-6.109 -3.314 0-6.203 3.03-6.203 8.477v6.959c0 3.126 0.663 3.552 2.699 4.831v0.331h-9.517v-0.331c2.036-1.278 2.699-1.705 2.699-4.831V15.011c0-2.558-1.373-3.457-3.172-4.593v-0.284h7.103l0.189 5.729c1.373-3.93 4.072-6.203 7.908-6.203 4.072 0 6.297 2.368 6.771 6.346C85.897 12.028 88.833 9.66 92.668 9.66" fill="${color}"/><path d="M120.98 19.414c-0.095-4.024-1.326-7.86-5.824-7.86 -3.741 0-6.014 3.172-6.439 7.86H120.98zM125.432 21.214h-16.809c0 6.108 2.982 9.848 8.001 9.848 3.599 0 6.204-1.704 7.577-5.397l0.995 0.332c-1.089 4.83-4.499 7.623-9.802 7.623 -6.202 0-11.222-4.214-11.222-11.696 0-7.48 4.924-12.263 11.033-12.263C121.691 9.66 125.432 13.921 125.432 21.214" fill="${color}"/><path d="M32.412 61.322c0 3.126 0.663 3.551 2.699 4.83v0.331h-9.517v-0.331c2.036-1.278 2.699-1.704 2.699-4.83V48.85c0-2.558-1.373-3.457-3.172-4.593v-0.285h7.292V61.322z" fill="${color}"/><path d="M78.48 48.486c0 2.272 1.61 3.361 5.683 4.167 6.155 1.183 8.475 3.219 8.475 7.102 0 4.403-3.741 7.245-8.76 7.245 -2.983 0-5.398-1.089-6.961-2.037l-1.657 2.037H74.881l-0.521-8.76h0.664c2.414 4.451 5.255 6.77 8.854 6.77 2.888 0 5.114-1.325 5.114-4.119 0-2.651-2.131-3.504-6.109-4.262 -5.871-1.184-7.908-3.172-7.908-6.913 0-3.931 3.362-6.677 7.86-6.677 2.794 0 4.783 0.899 6.392 1.894l1.8-1.894h0.331v7.813H90.839c-2.083-3.315-4.545-5.872-7.955-5.872C80.09 44.982 78.48 46.402 78.48 48.486" fill="${color}"/><path d="M107.727 44.649c-4.593 0-6.96 3.835-6.96 10.038 0 6.204 2.367 10.039 6.96 10.039 4.593 0 6.96-3.835 6.96-10.039C114.687 48.484 112.32 44.649 107.727 44.649M107.727 67c-6.629 0-11.554-4.972-11.554-11.98 0-7.007 4.924-11.979 11.554-11.979 6.629 0 11.554 4.972 11.554 11.979C119.28 62.028 114.356 67 107.727 67" fill="${color}"/><path d="M144.402 61.338c0 3.126 0.663 3.551 2.699 4.83v0.332h-9.517v-0.332c2.036-1.278 2.7-1.704 2.7-4.83v-9.376c0-3.124-1.232-6.013-4.973-6.013 -3.551 0-6.629 2.982-6.629 8.429v6.96c0 3.126 0.664 3.551 2.7 4.83v0.332h-9.517v-0.332c2.036-1.278 2.699-1.704 2.699-4.83V48.363c0-2.556-1.374-3.455-3.172-4.592v-0.285h7.102l0.189 5.73c1.374-3.977 4.356-6.202 8.334-6.202 4.83 0 7.387 3.171 7.387 8.239V61.338z" fill="${color}"/><path d="M51.815 56.929c0 5.067-3.409 7.624-6.392 7.624 -2.557 0-4.167-1.279-4.167-3.882 0-3.315 2.509-4.593 7.103-5.493l3.456-0.711V56.929zM68.435 61.38V44.031h-7.292v0.285c1.798 1.136 3.172 2.036 3.172 4.593l-0.005 12.709c0 2.277-1.846 4.122-4.122 4.122 -2.278 0-4.123-1.846-4.123-4.122 0 0 0.012-6.486 0.012-10.702 0-5.161-2.935-7.859-8.901-7.859 -5.73 0-9.186 2.746-9.186 5.776 0 1.799 1.089 2.747 2.651 2.747 0.853 0 1.847-0.285 2.32-0.711 -0.521-0.615-0.853-1.278-0.853-2.319 0-2.273 1.705-3.647 4.499-3.647 3.693 0 5.208 1.753 5.208 6.156v1.799l-3.788 0.664c-5.729 1.042-11.127 2.557-11.127 7.623 0 3.882 3.03 5.872 6.818 5.872 3.882 0 7.15-2.179 8.192-5.162 0.142 3.457 2.829 4.646 4.666 4.646 0.043 0 0.081-0.002 0.124-0.002h4.915l0.001 0.002h9.517v-0.307C69.097 64.914 68.435 64.506 68.435 61.38" fill="${color}"/><path d="M7.332 38.873v25.863h5.284c5.236 0 6.951-1.808 10.474-7.379h0.38l-1.761 9.237H0v-0.381c2.238-1.238 3-1.808 3-4.952l0.065-22.388" fill="${color}"/><path d="M172.085 57.851v1.458h7.55v1.143h-16.387v-1.143h7.51v-1.458c-2.945-0.118-4.682-0.907-4.682-2.483 0-1.675 2.01-2.463 5.385-2.463 3.375 0 5.385 0.788 5.385 2.463C176.845 56.945 175.07 57.753 172.085 57.851zM164.281 52.195V51.053h14.339v1.143H164.281zM165.451 66.739v-5.163h11.998v5.163H165.451zM176.123 62.719h-9.345v2.877h9.345V62.719zM171.46 54.029c-2.165 0-3.999 0.315-3.999 1.34 0 1.024 1.834 1.36 3.999 1.36 2.165 0 3.999-0.335 3.999-1.36C175.459 54.344 173.626 54.029 171.46 54.029zM168.437 49.91v-1.163h6.184v1.163H168.437z" fill="${color}"/><path d="M192.045 61.93c-2.185 0.316-4.643 0.611-10.593 0.611v-6.877h6.926v-4.119h-7.004v-1.143h8.331v6.404h-6.926v4.572c3.434 0.039 6.808-0.178 9.111-0.611L192.045 61.93zM193.801 67.015V48.688h1.327v18.327H193.801z" fill="${color}"/><path d="M205.028 55.999h2.399v-6.956h1.327v17.065h-1.327v-8.966h-2.399c-0.137 3.429-1.483 5.537-3.804 5.537 -2.458 0-3.824-2.365-3.824-6.149 0-3.784 1.366-6.148 3.824-6.148C203.564 50.383 204.91 52.531 205.028 55.999zM201.223 51.545c-1.522 0-2.478 1.872-2.478 4.986 0 3.114 0.956 4.986 2.478 4.986s2.478-1.872 2.478-4.986C203.701 53.418 202.745 51.545 201.223 51.545zM210.939 67.015V48.688h1.327v18.327H210.939z" fill="${color}"/><path d="M214.083 58.915v-1.143h7.53v-2.72h1.327v2.72h7.53v1.143H214.083zM229.007 56.058c-3.18-0.572-5.892-2.227-6.731-3.863 -0.683 1.636-3.355 3.291-6.652 3.843l-0.624-1.103c2.926-0.316 6.34-1.951 6.593-4.335h-5.931v-1.143h13.188v1.143h-5.852c0.254 2.404 3.941 4.039 6.633 4.335L229.007 56.058zM222.276 67.055c-3.96 0-6.204-1.182-6.204-3.232 0-2.01 2.244-3.251 6.204-3.251 3.961 0 6.223 1.123 6.223 3.251C228.5 65.911 226.237 67.055 222.276 67.055zM217.438 63.822c0 1.341 1.834 2.069 4.838 2.069 3.024 0 4.858-0.729 4.858-2.069 0-1.32-1.834-2.088-4.858-2.088C219.272 61.734 217.438 62.502 217.438 63.822z" fill="${color}"/></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46.029 31.668"><path d="M45.668 22.868c-3.344 5.287-4.972 7.005-9.943 7.005h-7.818V5.062c0-2.983 0.767-3.525 2.891-4.7V0h-9.852v0.362c2.125 1.175 2.848 1.717 2.848 4.7v9.433H6.96V5.094c0-2.984 0.768-3.525 2.891-4.701V0.032H0V0.394c2.124 1.176 2.847 1.717 2.847 4.701v21.512c0 2.983-0.723 3.526-2.847 4.701v0.361h9.852V31.307c-2.123-1.175-2.891-1.718-2.891-4.701V16.347h16.834v10.227c0 2.981-0.723 3.525-2.848 4.7v0.361h23.411l1.672-8.767H45.668z" fill="${color}"/></svg>`
  ];
  return logos[type];
}

GeneralJs.prototype.returnLoadingIcon = function (color = GeneralJs.colorChip.green, color2 = GeneralJs.colorChip.darkGreen) {
  let icon = SvgTong.stringParsing(this.returnLoading(color, color2));
  icon.classList.add("loading");
  return icon;
}

GeneralJs.prototype.searchInput = function (greenBox) {
  let div_clone, input_clone;
  let style = {};
  let ea = "px";
  let width, height, visualSpecific;
  let fontSize;

  width = 300;
  height = 60;
  visualSpecific = 4;
  div_clone = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "absolute",
    width: String(width) + ea,
    height: String(height) + ea,
    left: "calc(50% - " + String(width / 2) + ea + ")",
    top: "calc(50% - " + String((height / 2) + visualSpecific) + ea + ")",
  };
  for (let i in style) {
    div_clone.style[i] = style[i];
  }

  fontSize = 38;
  input_clone = GeneralJs.nodes.input.cloneNode(true);
  input_clone.setAttribute("type", "text");
  input_clone.setAttribute("placeholder", "검색어 입력");
  style = {
    width: "100%",
    height: "100%",
    fontSize: String(fontSize) + ea,
    background: "transparent",
    border: String(0),
    textAlign: "center",
    fontWeight: String(100),
    color: GeneralJs.colorChip.whiteIcon,
    outline: "none",
  };
  for (let i in style) {
    input_clone.style[i] = style[i];
  }
  div_clone.appendChild(input_clone);
  greenBox.appendChild(div_clone);
  this.searchInput = input_clone;
}

GeneralJs.grayLeftLaunching = function (reload = false, grayTitleAlready = null, grayDataAlready = null) {
  let pathArr = window.location.pathname.split("?");
  let thisPathName = pathArr[0].replace(/\//g, '');
  const { targetColumn, barWidth, barLeft, secondWidth, secondLeft, secondUpdateWidth, updateWidth, columnIndent } = DataPatch.toolsGrayLeftStandard(thisPathName);
  const UPDATE_WORD = "담당자";
  if (window.localStorage.getItem("GoogleClientProfile") === null) {
    throw new Error(window.location.href + " / not allowed");
    window.localStorage.clear();
    window.location.reload();
  }
  const cookies = JSON.parse(window.localStorage.getItem("GoogleClientProfile"));
  GeneralJs.stacks["grayTitle"] = null;
  GeneralJs.stacks["grayData"] = null;
  GeneralJs.stacks["grayDataDoms"] = null;
  return function (e) {
    const grayButton = document.getElementById("grayLeftOpenButton");
    const thisButton = this;
    let targetIndex;
    let grayData, grayTitle, grayTong;
    let style;
    let ea;
    let target;
    let dataLength;
    let idArr;
    let infoAreaTitleChildren;

    if (document.querySelector(".totalMother") !== null) {
      const [ standardBar, infoAreaTitle, infoAreaData ] = document.querySelector(".totalMother").children;

      ea = "px";
      infoAreaTitleChildren = infoAreaTitle.children;
      targetIndex = 0;
      for (let i = 0; i < infoAreaTitleChildren.length; i++) {
        if (infoAreaTitleChildren[i].getAttribute("column") === targetColumn) {
          targetIndex = i;
        }
      }
      dataLength = infoAreaData.children.length - 1;

      if (reload) {
        this.setAttribute("set", "off");
      }

      if (this.getAttribute("progress") !== "doing") {
        if (this.getAttribute("set") === "off") {

          idArr = [];
          for (let i = 2; i < standardBar.children.length; i++) {
            idArr.push(standardBar.children[i].firstChild.textContent);
          }

          thisButton.setAttribute("progress", "doing");

          if (!reload) {

            grayTitle = GeneralJs.nodes.div.cloneNode(true);
            grayTitle.id = "rightGrayPannel_title";
            style = {
              display: "block",
              position: "fixed",
              height: String(32) + ea,
              paddingTop: String(38) + ea,
              top: String(0) + ea,
              right: String(0) + ea,
              zIndex: String(2),
              width: String(barWidth) + ea,
              transition: "all 0.3s ease",
              transform: "translateX(" + String(barWidth) + ea + ")",
              cursor: "pointer",
              background: GeneralJs.colorChip.gray1,
              borderBottom: "1px dashed " + GeneralJs.colorChip.shadow,
            };
            for (let i in style) {
              grayTitle.style[i] = style[i];
            }
            document.querySelector(".totalMother").appendChild(grayTitle);

            grayData = GeneralJs.nodes.div.cloneNode(true);
            grayData.id = "rightGrayPannel_data";
            grayData.classList.add("backblurdefault_lite");
            style = {
              position: "absolute",
              background: GeneralJs.colorChip.gray1,
              top: String(0) + ea,
              right: String(0) + ea,
              width: String(barWidth) + ea,
              transform: "translateX(" + String(barWidth) + ea + ")",
              opacity: String(0.92),
              transition: "all 0.3s ease",
              zIndex: String(1),
            };
            for (let i in style) {
              grayData.style[i] = style[i];
            }
            document.querySelector(".totalMother").appendChild(grayData);

          } else {

            if (grayTitleAlready !== null && grayDataAlready !== null) {
              grayTitle = grayTitleAlready;
              grayData = grayDataAlready;
            } else {
              throw new Error("invaild input");
            }

          }

          GeneralJs.stacks["grayDataDoms"] = [];
          GeneralJs.stacks["grayTitle"] = grayTitle;
          GeneralJs.stacks["grayData"] = grayData;

          GeneralJs.ajaxPromise("idArr=" + JSON.stringify(idArr) + "&method=" + thisPathName + "&property=manager", "/getHistoryProperty").then(function (data) {
            let rawObj = JSON.parse(data);
            if (rawObj === null) {
              rawObj = {};
            }
            let personArr, temp_clone, pastClassName;
            let text_div;
            let sortEvent, memberEvent;

            personArr = [];
            for (let id of idArr) {
              if (rawObj[id] === undefined) {
                personArr.push('-');
              } else {
                personArr.push(rawObj[id]);
              }
            }

            if (reload) {
              while (grayTitle.firstChild) {
                grayTitle.removeChild(grayTitle.lastChild);
              }
              while (grayData.firstChild) {
                grayData.removeChild(grayData.lastChild);
              }
            }

            personArr.unshift("");

            sortEvent = function (e) {
              e.preventDefault();
              e.stopPropagation();
              const button = this;
              const id = this.parentNode.className.replace(/\_gray$/, '');
              let cancel_event, cancel_inputBack;
              let style;
              let ea = "px";

              cancel_event = function (e) {
                const removeTargets = document.querySelectorAll(".removeTarget");
                for (let i = 0; i < removeTargets.length; i++) {
                  removeTargets[i].parentNode.removeChild(removeTargets[i]);
                }
              }

              cancel_inputBack = GeneralJs.nodes.div.cloneNode(true);
              cancel_inputBack.classList.add("removeTarget");
              style = {
                position: "fixed",
                top: String(0) + ea,
                left: String(-1 * (window.innerWidth - barWidth - 210 - ((grayButton.getAttribute("set") === "first") ? 0 : secondUpdateWidth))) + ea,
                width: String(window.innerWidth - 210) + ea,
                height: String(document.querySelector('.totalMother').children[2].getBoundingClientRect().height) + ea,
                opacity: String(0.7),
                zIndex: String(3),
                background: "transparent",
              };
              for (let i in style) {
                cancel_inputBack.style[i] = style[i];
              }
              cancel_inputBack.addEventListener("click", cancel_event);
              this.parentNode.appendChild(cancel_inputBack);

              GeneralJs.ajax("type=get", "/getMembers", function (arr) {
                const members = JSON.parse(arr);
                let items = [];
                for (let { name } of members) {
                  items.push(name);
                }
                items.unshift("홀딩");
                items.unshift("미지정");
                items.unshift("전체");
                let button_clone, button_clone2, buttonStyle, buttonStyle2;
                let width, height, top;
                let margin;

                margin = 20;
                width = updateWidth - (margin * 2);
                height = 17.6;
                top = (height * 0.5) - 37;

                buttonStyle = {
                  position: "absolute",
                  left: String(barLeft + margin) + ea,
                  width: String(width) + ea,
                  paddingTop: String(height * (GeneralJs.isMac() ? 0.4 : 0.5)) + ea,
                  height: String(height * (GeneralJs.isMac() ? 1.4 : 1.3)) + ea,
                  background: GeneralJs.colorChip.green,
                  textAlign: "center",
                  fontSize: String(14) + ea,
                  fontWeight: String(400),
                  color: GeneralJs.colorChip.white,
                  borderRadius: String(3) + ea,
                  animation: "fadeuplite 0.3s ease forwards",
                  boxShadow: "0px 2px 11px -6px " + GeneralJs.colorChip.green,
                  zIndex: String(3),
                  cursor: "pointer",
                };

                buttonStyle2 = {
                  position: "absolute",
                  fontSize: "inherit",
                  fontWeight: String(400),
                  color: GeneralJs.colorChip.white,
                  zIndex: String(3),
                  textAlign: "center",
                  background: "transparent",
                  width: "100%",
                  height: "calc(100% - " + String(5) + ea + ")",
                  left: String(0) + ea,
                  top: String(GeneralJs.isMac() ? (height / 2.9) : (height / 2.3)) + ea,
                  borderRadius: String(3) + ea,
                  border: String(0),
                  cursor: "pointer",
                };

                for (let i = 0; i < items.length; i++) {
                  button_clone = GeneralJs.nodes.div.cloneNode(true);
                  button_clone.classList.add("removeTarget");
                  button_clone.setAttribute("buttonValue", items[i]);
                  for (let j in buttonStyle) {
                    button_clone.style[j] = buttonStyle[j];
                  }
                  button_clone.style.top = String(((height * 2) * (i + 1)) - top) + ea;

                  button_clone2 = GeneralJs.nodes.div.cloneNode(true);
                  button_clone2.classList.add("hoverDefault");
                  for (let j in buttonStyle2) {
                    button_clone2.style[j] = buttonStyle2[j];
                  }
                  button_clone2.textContent = items[i];
                  button_clone.appendChild(button_clone2);

                  button_clone.addEventListener("click", function (e) {
                    const [ standardDoms_raw, caseDomsTitle_raw, caseDoms_raw ] = document.querySelector(".totalMother").children;
                    let standardDoms, caseDoms;
                    let ea = "px";
                    standardDoms = [];
                    for (let i = 1; i < standardDoms_raw.children.length; i++) {
                      standardDoms.push(standardDoms_raw.children[i]);
                    }
                    caseDoms = caseDoms_raw.children;
                    if (/^전체/.test(this.textContent)) {
                      for (let j = 1; j < caseDoms.length; j++) {
                        standardDoms[j].style.display = "block";
                        caseDoms[j].style.display = "block";
                        GeneralJs.stacks["grayDataDoms"][j].style.display = "block";
                      }

                    } else if (/^미지정/.test(this.textContent)) {

                      for (let j = 1; j < caseDoms.length; j++) {
                        if (GeneralJs.stacks["grayDataDoms"][j].children[0].textContent === '-' || GeneralJs.stacks["grayDataDoms"][j].children[0].textContent === '') {

                          if (GeneralJs.stacks["latestSort"][0] === "member") {
                            standardDoms[j].style.display = "block";
                            caseDoms[j].style.display = "block";
                            GeneralJs.stacks["grayDataDoms"][j].style.display = "block";
                          } else {
                            if (caseDoms[j].style.display !== "none") {
                              standardDoms[j].style.display = "block";
                              caseDoms[j].style.display = "block";
                              GeneralJs.stacks["grayDataDoms"][j].style.display = "block";
                            }
                          }

                        } else {
                          standardDoms[j].style.display = "none";
                          caseDoms[j].style.display = "none";
                          GeneralJs.stacks["grayDataDoms"][j].style.display = "none";
                        }
                      }

                    } else {

                      for (let j = 1; j < caseDoms.length; j++) {

                        if (GeneralJs.stacks["grayDataDoms"][j].children[0].textContent !== this.textContent) {

                          standardDoms[j].style.display = "none";
                          caseDoms[j].style.display = "none";
                          GeneralJs.stacks["grayDataDoms"][j].style.display = "none";

                        } else {

                          if (GeneralJs.stacks["latestSort"][0] === "member") {

                            standardDoms[j].style.display = "block";
                            caseDoms[j].style.display = "block";
                            GeneralJs.stacks["grayDataDoms"][j].style.display = "block";

                          } else {

                            if (caseDoms[j].style.display !== "none") {
                              standardDoms[j].style.display = "block";
                              caseDoms[j].style.display = "block";
                              GeneralJs.stacks["grayDataDoms"][j].style.display = "block";
                            }

                          }

                        }
                      }

                    }
                    GeneralJs.stacks["grayData"].style.height = '';
                    if (GeneralJs.stacks["grayData"].getBoundingClientRect().height < window.innerHeight) {
                      GeneralJs.stacks["grayData"].style.height = String(window.innerHeight) + ea;
                    }

                    //dashboard reload
                    if (GeneralJs.stacks["dashboardBoxBoo"]) {
                      GeneralJs.timeouts["dashboardBoxUpdate"] = setTimeout(function () {
                        GeneralJs.dashboardBoxLaunching(GeneralJs.stacks["dashboardBox"], true);
                        clearTimeout(GeneralJs.timeouts["dashboardBoxUpdate"]);
                        GeneralJs.timeouts["dashboardBoxUpdate"] = null;
                      }, 201);
                    }

                    //set sort stack
                    GeneralJs.stacks["latestSort"].unshift("member");
                    if (GeneralJs.stacks["latestSort"].length > 10) {
                      GeneralJs.stacks["latestSort"] = GeneralJs.stacks["latestSort"].slice(0, 3);
                    }

                    cancel_event.call(cancel_inputBack, e);
                  });
                  button.parentNode.appendChild(button_clone);
                }

              });
            }

            memberEvent = function (e) {
              e.preventDefault();
              e.stopPropagation();
              const button = this;
              const id = this.parentNode.className.replace(/\_gray$/, '');
              let cancel_inputBack;
              let style;
              let ea = "px";

              cancel_inputBack = GeneralJs.nodes.div.cloneNode(true);
              cancel_inputBack.classList.add("removeTarget");
              style = {
                position: "fixed",
                top: String(0) + ea,
                left: String(-1 * (window.innerWidth - barWidth - 210 - ((grayButton.getAttribute("set") === "first") ? 0 : secondUpdateWidth))) + ea,
                width: String(window.innerWidth - 210) + ea,
                height: String(document.querySelector('.totalMother').children[2].getBoundingClientRect().height) + ea,
                opacity: String(0.7),
                zIndex: String(3),
              };
              for (let i in style) {
                cancel_inputBack.style[i] = style[i];
              }
              cancel_inputBack.addEventListener("click", function (e) {
                const removeTargets = document.querySelectorAll(".removeTarget");
                for (let i = 0; i < removeTargets.length; i++) {
                  removeTargets[i].parentNode.removeChild(removeTargets[i]);
                }
              });
              this.parentNode.appendChild(cancel_inputBack);

              GeneralJs.ajax("type=get", "/getMembers", function (arr) {
                const members = JSON.parse(arr);
                let items = [];
                for (let { name } of members) {
                  items.push(name);
                }
                items.unshift("홀딩");
                let button_clone, button_clone2, buttonStyle, buttonStyle2;
                let width, height, top;
                let margin;

                margin = 20;
                width = updateWidth - (margin * 2);
                height = 17.6;
                top = height * 0.5;

                buttonStyle = {
                  position: "absolute",
                  left: String(barLeft + margin) + ea,
                  width: String(width) + ea,
                  paddingTop: String(height * (GeneralJs.isMac() ? 0.4 : 0.5)) + ea,
                  height: String(height * (GeneralJs.isMac() ? 1.4 : 1.3)) + ea,
                  background: GeneralJs.colorChip.green,
                  textAlign: "center",
                  fontSize: String(14) + ea,
                  fontWeight: String(400),
                  color: GeneralJs.colorChip.white,
                  borderRadius: String(3) + ea,
                  animation: "fadeuplite 0.3s ease forwards",
                  boxShadow: "0px 2px 11px -6px " + GeneralJs.colorChip.green,
                  zIndex: String(3),
                  cursor: "pointer",
                };

                buttonStyle2 = {
                  position: "absolute",
                  fontSize: "inherit",
                  fontWeight: String(400),
                  color: GeneralJs.colorChip.white,
                  zIndex: String(3),
                  textAlign: "center",
                  background: "transparent",
                  width: "100%",
                  height: "calc(100% - " + String(5) + ea + ")",
                  left: String(0) + ea,
                  top: String(GeneralJs.isMac() ? (height / 2.9) : (height / 2.3)) + ea,
                  borderRadius: String(3) + ea,
                  border: String(0),
                  cursor: "pointer",
                };

                for (let i = 0; i < items.length; i++) {
                  button_clone = GeneralJs.nodes.div.cloneNode(true);
                  button_clone.classList.add("removeTarget");
                  button_clone.setAttribute("buttonValue", items[i]);
                  for (let j in buttonStyle) {
                    button_clone.style[j] = buttonStyle[j];
                  }
                  button_clone.style.top = String(((height * 2) * (i + 1)) - top) + ea;

                  button_clone2 = GeneralJs.nodes.div.cloneNode(true);
                  button_clone2.classList.add("hoverDefault");
                  for (let j in buttonStyle2) {
                    button_clone2.style[j] = buttonStyle2[j];
                  }
                  button_clone2.textContent = items[i];
                  button_clone.appendChild(button_clone2);

                  button_clone.addEventListener("click", function (e) {
                    const value = this.textContent;
                    const column = "manager";
                    const email = cookies.homeliaisonConsoleLoginedEmail;
                    const method = thisPathName;
                    GeneralJs.ajaxJson({ id, column, value, email, method }, "/updateHistory").then(() => {
                      button.textContent = value;
                      const removeTargets = document.querySelectorAll(".removeTarget");
                      for (let i = 0; i < removeTargets.length; i++) {
                        removeTargets[i].parentNode.removeChild(removeTargets[i]);
                      }
                    }).catch((err) => { console.log(err); });
                  });
                  button.parentNode.appendChild(button_clone);
                }
              });

            }

            temp_clone = infoAreaTitle.children[targetIndex].cloneNode(false);
            temp_clone.textContent = UPDATE_WORD;
            temp_clone.style.width = String(updateWidth) + ea;
            temp_clone.style.left = String(barLeft) + ea;
            temp_clone.addEventListener("click", sortEvent);
            temp_clone.addEventListener("contextmenu", sortEvent);
            grayTitle.appendChild(temp_clone);

            temp_clone = infoAreaTitle.children[targetIndex].cloneNode(true);
            temp_clone.style.left = String(barLeft + columnIndent) + ea;
            grayTitle.appendChild(temp_clone);

            for (let i = 0; i < dataLength + 1; i++) {
              grayTong = infoAreaData.children[i].cloneNode(false);
              pastClassName = grayTong.className;
              grayTong.className = pastClassName + "_gray";
              grayTong.style.width = String(100) + '%';
              if (i !== 0) {
                temp_clone = infoAreaData.children[i].children[targetIndex].cloneNode(false);
                temp_clone.setAttribute("column", "who");
                temp_clone.textContent = personArr[i];
                temp_clone.style.width = String(updateWidth) + ea;
                temp_clone.style.left = String(barLeft) + ea;
                temp_clone.style.color = GeneralJs.colorChip.black;
                temp_clone.addEventListener("click", memberEvent);
                temp_clone.addEventListener("contextmenu", memberEvent);
                grayTong.appendChild(temp_clone);

                temp_clone = infoAreaData.children[i].children[targetIndex].cloneNode(true);
                temp_clone.style.color = GeneralJs.colorChip.black;
                temp_clone.style.left = String(barLeft + columnIndent) + ea;
                grayTong.appendChild(temp_clone);
              }
              grayData.appendChild(grayTong);
              GeneralJs.stacks["grayDataDoms"].push(grayTong);
            }

            if (grayData.getBoundingClientRect().height < window.innerHeight) {
              grayData.style.height = String(window.innerHeight) + ea;
            }

            GeneralJs.timeouts["grayRightBarOn"] = setTimeout(function () {
              thisButton.setAttribute("progress", "done");
              thisButton.setAttribute("set", "first");
              grayTitle.style.transform = "translateX(0" + ea + ")";
              grayData.style.transform = "translateX(0" + ea + ")";
              thisButton.style.transform = "translateX(-" + String(barWidth) + ea + ")";
              thisButton.style.background = GeneralJs.colorChip.gray3;
              clearTimeout(GeneralJs.timeouts["grayRightBarOn"]);
              GeneralJs.timeouts["grayRightBarOn"] = null;
            }, 0);

          }).catch(function (e) {
            GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
            console.log(e);
          });


        } else if (this.getAttribute("set") === "first") {
          thisButton.setAttribute("progress", "doing");

          idArr = [];
          for (let i = 2; i < standardBar.children.length; i++) {
            idArr.push(standardBar.children[i].firstChild.textContent);
          }

          thisButton.setAttribute("progress", "doing");

          GeneralJs.ajaxPromise("idArr=" + JSON.stringify(idArr) + "&method=" + thisPathName + "&property=" + (pathArr[0].replace(/\//g, '') === "photo" ? "photo" : "issue"), "/getHistoryProperty").then(function (data) {
            const rawObj = JSON.parse(data);
            let personArr, temp_clone, pastClassName;
            let longUpdateEvent;

            personArr = [];
            for (let id of idArr) {
              if (rawObj[id] === undefined) {
                personArr.push('');
              } else {
                personArr.push(rawObj[id]);
              }
            }

            personArr.unshift("");

            temp_clone = infoAreaTitle.children[targetIndex].cloneNode(false);
            temp_clone.textContent = "메모";
            temp_clone.style.width = String(secondUpdateWidth) + ea;
            temp_clone.style.left = String(secondLeft + 18) + ea;
            GeneralJs.stacks["grayTitle"].appendChild(temp_clone);

            longUpdateEvent = function (e) {
              e.stopPropagation();
              e.preventDefault();

              if (this.querySelector("input") !== null) {
                return;
              }

              const id = this.parentNode.className.replace(/\_gray$/, '');
              const text_div = this.firstChild;
              let input_clone;
              let ea;
              let style;
              let cancel_event, cancel_inputBack;

              ea = "px";

              cancel_event = function (e) {
                e.stopPropagation();
                e.preventDefault();
                const removeTargets = document.querySelectorAll(".removeTarget");
                for (let i = 0; i < removeTargets.length; i++) {
                  removeTargets[i].parentNode.removeChild(removeTargets[i]);
                }
                text_div.style.opacity = String(1);
              }

              cancel_inputBack = GeneralJs.nodes.div.cloneNode(true);
              cancel_inputBack.classList.add("removeTarget");
              style = {
                position: "fixed",
                top: String(0) + ea,
                left: String(-1 * (window.innerWidth - barWidth - 210 - ((grayButton.getAttribute("set") === "first") ? 0 : secondUpdateWidth))) + ea,
                width: String(window.innerWidth - 210) + ea,
                height: String(document.querySelector('.totalMother').children[2].getBoundingClientRect().height) + ea,
                opacity: String(0.7),
                zIndex: String(3),
                background: "transparent",
              };
              for (let i in style) {
                cancel_inputBack.style[i] = style[i];
              }
              cancel_inputBack.addEventListener("click", cancel_event);
              this.appendChild(cancel_inputBack);

              input_clone = GeneralJs.nodes.input.cloneNode(true);
              input_clone.classList.add("removeTarget");
              input_clone.value = text_div.textContent;
              style = {
                position: "absolute",
                color: GeneralJs.colorChip.green,
                fontSize: text_div.style.fontSize,
                fontWeight: text_div.style.fontWeight,
                top: text_div.style.top,
                left: text_div.style.left,
                width: text_div.style.width,
                height: text_div.style.height,
                outline: String(0),
                border: String(0),
                background: "transparent",
                textAlign: "center",
                zIndex: String(3),
              };
              for (let i in style) {
                input_clone.style[i] = style[i];
              }
              input_clone.addEventListener("click", (e) => {
                e.stopPropagation();
                e.preventDefault();
              });
              input_clone.addEventListener("keypress", async function (e) {
                try {
                  if (e.key === "Enter") {
                    text_div.textContent = this.value;
                    await GeneralJs.ajaxPromise("id=" + id + "&column=issue&value=" + this.value + "&email=" + cookies.homeliaisonConsoleLoginedEmail + "&method=" + thisPathName, "/updateHistory");
                    cancel_event.call(this, e);
                  }
                } catch (e) {
                  GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
                  console.log(e);
                }
              });
              input_clone.addEventListener("contextmenu", cancel_event);

              text_div.style.transition = "all 0s ease";
              text_div.style.opacity = String(0);

              this.appendChild(input_clone);
            }

            for (let i = 0; i < dataLength + 1; i++) {
              grayTong = infoAreaData.children[i].cloneNode(false);
              pastClassName = grayTong.className;

              if (i !== 0) {
                temp_clone = infoAreaData.children[i].children[targetIndex].cloneNode(false);
                temp_clone.setAttribute("column", "issue");
                temp_clone.style.width = String(secondUpdateWidth) + ea;
                temp_clone.style.left = String(secondLeft) + ea;
                text_div = GeneralJs.nodes.div.cloneNode(true);
                text_div.textContent = personArr[i];
                text_div.style.fontSize = String(14) + ea;
                text_div.style.color = GeneralJs.colorChip.black;
                text_div.style.position = "absolute";
                text_div.style.top = String(0) + ea;
                text_div.style.left = String(34) + ea;
                text_div.style.width = "calc(100% - " + String(34) + ea + ")";
                temp_clone.appendChild(text_div);
                temp_clone.addEventListener("click", longUpdateEvent);
                temp_clone.addEventListener("contextmenu", longUpdateEvent);
                GeneralJs.stacks["grayData"].children[i].appendChild(temp_clone);
              }
            }

            if (GeneralJs.stacks["grayData"].getBoundingClientRect().height < window.innerHeight) {
              GeneralJs.stacks["grayData"].style.height = String(window.innerHeight) + ea;
            }

            document.getElementById("rightGrayPannel_title").style.width = String(secondWidth) + ea;
            document.getElementById("rightGrayPannel_data").style.width = String(secondWidth) + ea;
            thisButton.style.transform = "translateX(-" + String(secondWidth) + ea + ")";
            GeneralJs.timeouts["grayRightBarSecond"] = setTimeout(function () {
              thisButton.setAttribute("progress", "done");
              thisButton.setAttribute("set", "second");
              clearTimeout(GeneralJs.timeouts["grayRightBarSecond"]);
              GeneralJs.timeouts["grayRightBarSecond"] = null;
            }, 301);

          }).catch(function (e) {
            GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
            console.log(e);
          });


        } else if (this.getAttribute("set") === "second") {
          thisButton.setAttribute("progress", "doing");
          document.getElementById("rightGrayPannel_title").style.transform = "translateX(" + String(secondWidth) + ea + ")";
          document.getElementById("rightGrayPannel_data").style.transform = "translateX(" + String(secondWidth) + ea + ")";
          thisButton.style.transform = "translateX(0" + ea + ")";
          thisButton.style.background = GeneralJs.colorChip.green;
          GeneralJs.timeouts["grayRightBarOff"] = setTimeout(function () {
            thisButton.setAttribute("progress", "done");
            thisButton.setAttribute("set", "off");
            document.querySelector(".totalMother").removeChild(document.getElementById("rightGrayPannel_title"));
            document.querySelector(".totalMother").removeChild(document.getElementById("rightGrayPannel_data"));
            GeneralJs.stacks["grayTitle"] = null;
            GeneralJs.stacks["grayData"] = null;
            GeneralJs.stacks["grayDataDoms"] = null;
            clearTimeout(GeneralJs.timeouts["grayRightBarOff"]);
            GeneralJs.timeouts["grayRightBarOff"] = null;
          }, 301);

        }

      }
    }

  }
}

GeneralJs.dashboardBoxLaunching = function (dashboardBox, reload = false) {
  if (reload) {
    while (dashboardBox.firstChild) {
      dashboardBox.removeChild(dashboardBox.lastChild);
    }
  }
  const [ standardDoms_raw, caseDomsTitle_raw, caseDoms_raw ] = document.querySelector(".totalMother").children;
  let pathArr = window.location.pathname.split("?");
  let thisPathName = pathArr[0].replace(/\//g, '');
  const { standardColumn, titleStandard, buttons } = DataPatch.toolsDashboard(thisPathName);
  let mainWording;
  let div_clone, div_clone2;
  let style;
  let ea;
  let top, left, height;
  let size, size2;
  let lineHeight;
  let standardDoms, caseDoms;
  let standardIndex;
  let titleValue, values;

  const motherWidth = Number(GeneralJs.stacks["dashboardBoxMother"].style.width.replace(/[^0-9\.\-]/gi, ''));
  const motherHeight = Number(GeneralJs.stacks["dashboardBoxMother"].style.height.replace(/[^0-9\.\-]/gi, ''));

  standardDoms = [];
  for (let i = 1; i < standardDoms_raw.children.length; i++) {
    standardDoms.push(standardDoms_raw.children[i]);
  }
  caseDoms = caseDoms_raw.children;

  standardIndex = new Array(standardColumn.length);

  if (caseDoms.length > 1) {
    for (let z = 0; z < standardColumn.length; z++) {
      for (let i = 0; i < caseDoms[1].children.length; i++) {
        if (caseDoms[1].children[i].getAttribute("column") === standardColumn[z]) {
          standardIndex[z] = i;
          break;
        }
      }
    }
  }

  ea = "px";
  left = 24;
  height = 36;
  top = 15;
  values = [];
  for (let b of buttons) {
    values.push(0);
  }
  lineHeight = 26;
  titleValue = 0;
  size = 21;
  size2 = 14;

  for (let i = 1; i < caseDoms.length; i++) {
    if (caseDoms[i].children[standardIndex[0]].textContent === titleStandard) {
      if (caseDoms[i].style.display !== "none") {
        titleValue = titleValue + 1;
      }
    }
  }

  for (let j = 0; j < buttons.length; j++) {
    for (let i = 1; i < caseDoms.length; i++) {
      if (caseDoms[i].children[standardIndex[0]].textContent === titleStandard) {
        if (caseDoms[i].children[standardIndex[1]].textContent === buttons[j]) {
          if (caseDoms[i].style.display !== "none") {
            values[j] = values[j] + 1;
          }
        }
      }
    }
  }

  div_clone = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "absolute",
    width: String(motherWidth - (left * 2)) + ea,
    height: String(height) + ea,
    left: String(left) + ea,
    top: String(top) + ea,
  };
  for (let i in style) {
    div_clone.style[i] = style[i];
  }

  mainWording = GeneralJs.nodes.div.cloneNode(true);
  mainWording.textContent = titleStandard;
  style = {
    position: "absolute",
    fontSize: String(size) + ea,
    fontWeight: String(200),
    height: String(height) + ea,
    left: String(0) + ea,
    top: String(0) + ea,
  };
  for (let i in style) {
    mainWording.style[i] = style[i];
  }
  div_clone.appendChild(mainWording);

  div_clone2 = GeneralJs.nodes.div.cloneNode(true);
  div_clone2.textContent = String(titleValue);
  style = {
    position: "absolute",
    fontSize: String(size) + ea,
    fontWeight: String(200),
    height: String(height) + ea,
    top: String(0) + ea,
    color: GeneralJs.colorChip.green,
  };
  for (let i in style) {
    div_clone2.style[i] = style[i];
  }
  div_clone.appendChild(div_clone2);

  dashboardBox.appendChild(div_clone);

  div_clone2.style.left = String(mainWording.getBoundingClientRect().width + 8) + ea;

  for (let z = 0; z < buttons.length; z++) {

    div_clone = GeneralJs.nodes.div.cloneNode(true);
    style = {
      position: "absolute",
      width: String(((motherWidth - (left * 2)) / 2) - 8) + ea,
      height: String(height) + ea,
      left: String(left + ((z < (buttons.length / 2)) ? 0 : 154)) + ea,
      top: String(top + 15 + (z < (buttons.length / 2) ? (lineHeight * (z + 1)) : (lineHeight * (z + 1 - Math.floor(buttons.length / 2))))) + ea,
    };
    for (let i in style) {
      div_clone.style[i] = style[i];
    }

    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    div_clone2.textContent = buttons[z];
    style = {
      position: "absolute",
      fontSize: String(size2) + ea,
      fontWeight: String(500),
      height: String(height) + ea,
      left: String(0) + ea,
      top: String(0) + ea,
    };
    for (let i in style) {
      div_clone2.style[i] = style[i];
    }
    div_clone.appendChild(div_clone2);

    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    div_clone2.textContent = String(values[z]);
    style = {
      position: "absolute",
      fontSize: String(size2) + ea,
      fontWeight: String(300),
      height: String(height) + ea,
      right: String(0) + ea,
      top: String(0) + ea,
      color: GeneralJs.colorChip.green
    };
    for (let i in style) {
      div_clone2.style[i] = style[i];
    }
    div_clone.appendChild(div_clone2);

    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    div_clone2.textContent = String(42);
    div_clone.appendChild(div_clone2);
    dashboardBox.appendChild(div_clone);
  }

}

GeneralJs.prototype.imageTransferHistory = async function (e) {
  const instance = this;
  const promptAsideClassName = "promptAsideClassName";
  const { ajaxJson, blankHref, createNode, withOut, colorChip, dateToString, removeByClass, stringToDate, equalJson, sleep } = GeneralJs;
  const ea = "px";
  try {
    let response, ago, delta;
    let targets;
    let whiteTongBase;
    let whiteTong;
    let whiteWidth;
    let whiteHeight;
    let paddingTop;
    let paddingLeft;
    let paddingBottom;
    let size0;
    let size1;
    let inputSize;
    let marginLeft;
    let greenBarHeight;
    let bottomVisual;
    let inputBoxHeight;
    let inputIndent;
    let inputBottomVisual;
    let lineHeight;
    let wordingVisual;
    let targetsTong;
    let targetsTongMarginTop;
    let inputBoxBetween;
    let inputLength;
    let baseMother;
    let inputTextTop;
    let buttonBetween;
    let buttonTop;
    let buttonRight;
    let buttonHeight;
    let buttonPadding;
    let buttonWidth;
    let size2;
    let textTop;
    let buttonWidth2;
    let files;
    let loading;
    let absolute;
    let targetCliid;
    let purpose, description;
    let thisMemberId;
    let sendId;
    let thisPid;
    let thisDesid, thisInfo;
    let thisDesigner;
    let clientSearch;
    let clientResponse, clientResponseData;
    let purposeSelection;
    let preDescription;
    let thisClientName;
    let contentsResponse;
    let targetProposal;
    let proposalSearch;
    let thisProid;

    delta = 3;

    whiteWidth = 610;
    whiteHeight = 150;
    paddingTop = 17;
    paddingLeft = 23;
    paddingBottom = 62;
    size0 = 14;
    size1 = 15;
    inputSize = 13;
    marginLeft = 18;
    bottomVisual = 7;
    inputBoxHeight = 30;
    inputIndent = 9;
    inputBottomVisual = 0;
    lineHeight = 1.5;
    targetsTongMarginTop = 10;
    inputBoxBetween = 4;
    inputLength = 5;
    wordingVisual = GeneralJs.isMac() ? 0 : 2;
    inputTextTop = GeneralJs.isMac() ? -1 : 1;
    buttonBetween = 3;
    buttonTop = 5;
    buttonRight = 5;
    buttonHeight = 20;
    buttonPadding = 7;
    buttonWidth = 54;
    buttonWidth2 = 47;
    size2 = 9;
    textTop = GeneralJs.isMac() ? -1 : 1;
    greenBarHeight = Number(document.getElementById("greenBar").style.height.replace(/[^0-9\.\-]/gi, ''));

    ago = new Date();
    ago.setMonth(ago.getMonth() - delta);

    response = await ajaxJson({ mode: "list", whereQuery: { "from.id": instance.member.id, date: { $gte: ago } } }, S3HOST + ":3000/imageTransfer", { equal: true });
    ({ data: targets } = response);

    targets.sort((a, b) => {
      return b.date.valueOf() - a.date.valueOf();
    })

    whiteTongBase = createNode({
      mode: "aside",
      mother: document.body,
      class: [ promptAsideClassName ],
      event: {
        contextmenu: (e) => { e.stopPropagation(); },
        dblclick: (e) => { e.stopPropagation(); },
        drop: (e) => { e.stopPropagation(); },
        keyup: (e) => { e.stopPropagation(); },
        keydown: (e) => { e.stopPropagation(); },
        keypress: (e) => { e.stopPropagation(); },
        click: function (e) {
          const targets = [ ...document.querySelectorAll('.' + promptAsideClassName) ];
          for (let z = 0; z < targets.length; z++) {
            try {
              targets[z].remove();
            } catch {}
          }
        }
      },
      style: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        top: String(0) + "vh",
        left: String(1) + "vw",
        width: String(98) + "vw",
        height: "calc(100vh - " + String(greenBarHeight) + ea + ")",
        background: "transparent",
        zIndex: String(900)
      }
    });

    whiteTong = createNode({
      mother: whiteTongBase,
      event: {
        click: (e) => { e.stopPropagation(); },
      },
      style: {
        display: "block",
        position: "relative",
        width: String(whiteWidth - (paddingLeft * 2)) + ea,
        paddingTop: String(paddingTop) + ea,
        paddingBottom: String(paddingLeft) + ea,
        paddingLeft: String(paddingLeft) + ea,
        paddingRight: String(paddingLeft) + ea,
        borderRadius: String(5) + "px",
        boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
        background: colorChip.white,
        animation: "fadeuplite 0.4s ease forwards",
      }
    });

    createNode({
      mother: whiteTong,
      text: ">",
      style: {
        fontSize: String(size0) + ea,
        fontWeight: String(400),
        color: colorChip.green,
        fontFamily: "graphik",
        position: "absolute",
        top: String(paddingTop) + ea,
        left: String(paddingLeft) + ea,
        lineHeight: String(lineHeight),
      }
    });
  
    createNode({
      mother: whiteTong,
      text: "최근 3개월 간 이미지 전송 기록입니다.",
      style: {
        position: "relative",
        marginLeft: String(marginLeft) + ea,
        fontSize: String(size1) + ea,
        fontWeight: String(500),
        color: colorChip.black,
        lineHeight: String(lineHeight),
        top: String(wordingVisual) + ea,
      }
    });
  

    targetsTong = createNode({
      mother: whiteTong,
      style: {
        display: "inline-block",
        position: "relative",
        marginLeft: String(marginLeft) + ea,
        marginTop: String(targetsTongMarginTop) + ea,
        height: String((inputBoxHeight * inputLength) + (inputBoxBetween * (inputLength - 1))) + ea,
        width: withOut(marginLeft, ea),
        overflow: "scroll",
      },
      child: {
        style: {
          display: "block",
          position: "relative",
          width: withOut(0, ea),
          height: "auto",
        }
      }
    })

    for (let i = 0; i < targets.length; i++) {
      baseMother = createNode({
        mother: targetsTong.firstChild,
        style: {
          display: "flex",
          position: "relative",
          marginBottom: String(inputBoxBetween) + ea,
          width: withOut(0, ea),
          height: String(inputBoxHeight) + ea,
          borderRadius: String(5) + "px",
          background: colorChip.gray1,
          flexDirection: "row",
          alignItems: "center",
        }
      });

      // contents
      createNode({
        mother: baseMother,
        text: dateToString(targets[i].date, true).slice(2, -3),
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(inputSize) + ea,
          fontWeight: String(400),
          color: colorChip.black,
          top: String(inputTextTop) + ea,
          width: String(90) + ea,
          marginLeft: String(12) + ea,
        }
      });
      createNode({
        mother: baseMother,
        text: "|",
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(inputSize) + ea,
          fontWeight: String(400),
          color: colorChip.deactive,
          top: String(inputTextTop) + ea,
        }
      });
      createNode({
        mother: baseMother,
        text: targets[i].target.name.slice(0, 3),
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(inputSize) + ea,
          fontWeight: String(400),
          color: colorChip.black,
          top: String(inputTextTop) + ea,
          width: String(44) + ea,
          marginLeft: String(10) + ea,
        }
      });
      createNode({
        mother: baseMother,
        text: "|",
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(inputSize) + ea,
          fontWeight: String(400),
          color: colorChip.deactive,
          top: String(inputTextTop) + ea,
        }
      });
      createNode({
        mother: baseMother,
        text: targets[i].contents.designer.designer.slice(0, 3),
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(inputSize) + ea,
          fontWeight: String(400),
          color: colorChip.black,
          top: String(inputTextTop) + ea,
          width: String(44) + ea,
          marginLeft: String(10) + ea,
        }
      });
      createNode({
        mother: baseMother,
        text: "|",
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(inputSize) + ea,
          fontWeight: String(400),
          color: colorChip.deactive,
          top: String(inputTextTop) + ea,
        }
      });
      createNode({
        mother: baseMother,
        text: targets[i].contents.purpose,
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(inputSize) + ea,
          fontWeight: String(400),
          color: colorChip.black,
          top: String(inputTextTop) + ea,
          marginLeft: String(10) + ea,
        }
      });

      // buttons
      createNode({
        mother: baseMother,
        attribute: {
          cliid: targets[i].target.cliid,
          desid: targets[i].contents.designer.desid,
          id: targets[i].id,
        },
        event: {
          click: async function (e) {
            try {
              const id = this.getAttribute("id");
              const cliid = this.getAttribute("cliid");
              const desid = this.getAttribute("desid");

              removeByClass(promptAsideClassName);
  
              thisDesid = desid;
              [ thisDesigner ] = await ajaxJson({ noFlat: true, whereQuery: { desid: thisDesid } }, SECONDHOST + "/getDesigners", { equal: true });
  
              clientSearch = await GeneralJs.prompt("고객 이름, 또는 아이디를 입력해주세요!");
              if (clientSearch === null) {
                throw new Error("interrupt");
              }
              clientResponse = await ajaxJson({
                query: clientSearch
              }, BACKHOST + "/searchClients", { equal: true });
              clientResponseData = [];
              clientResponse.data.sort((a, b) => { return stringToDate(b.info.timeline).valueOf() - stringToDate(a.info.timeline).valueOf() });
              for (let obj of clientResponse.data) {
                if (!clientResponseData.map((o) => { return o.cliid }).includes(obj.standard.cliid)) {
                  clientResponseData.push({
                    cliid: obj.standard.cliid,
                    title: obj.standard.cliid + " - " + obj.standard.name + " : " + obj.info.timeline.split(" ")[0] + " 문의",
                    original: equalJson(JSON.stringify(obj)),
                  });
                }
              }
  
              if (clientResponseData.length === 0) {
  
                window.alert("고객을 찾을 수 없습니다!");
                throw new Error("invalid cliid");
  
              } else if (clientResponseData.length >= 1) {
  
                if (clientResponseData.length > 1) {
                  clientSearch = await GeneralJs.promptLongButtons("고객 이름, 또는 아이디를 선택해주세요!", clientResponseData.map((o) => { return o.title }));
                  if (clientSearch === null) {
                    throw new Error("invalid selection");
                  }
                  targetCliid = clientSearch.split(" ")[0];
                  thisClientName = clientSearch.split(" ")[2];
                } else {
                  targetCliid = clientResponseData[0].cliid;
                  thisClientName = clientResponseData[0].original.standard.name;
                }
                
                targetProposal = await ajaxJson({
                  query: targetCliid
                }, BACKHOST + "/searchProjects", { equal: true });

                if (targetProposal.data.length === 0) {
                  window.alert("추천서를 찾을 수 없습니다!");
                  throw new Error("invalid proposal");  
                }

                if (targetProposal.data.length !== 1) {
                  proposalSearch = await GeneralJs.promptButtons("추천서 아이디를 선택해주세요!", targetProposal.data.map((o) => { return o.standard.proid }));
                  if (proposalSearch === null) {
                    throw new Error("invalid selection");
                  }
                  thisProid = proposalSearch
                } else {
                  thisProid = targetProposal.data[0].standard.proid;
                }

                purposeSelection = await GeneralJs.promptLongButtons("전송 목적을 선택해주세요!", [
                  "포트폴리오 전송",
                  "비공개 사진 전송",
                  "디자인 제안 이미지 전송",
                  "직접 입력...",
                ]);
                if (purposeSelection === null) {
                  throw new Error("invalid selection");
                }
                if (/직접 입력/gi.test(purposeSelection)) {
                  purpose = await GeneralJs.prompt("전송 목적을 적어주세요!");
                  if (purpose === null) {
                    throw new Error("invalid purpose");
                  }
                } else {
                  purpose = purposeSelection;
                }
  
                if (/포트폴리오/gi.test(purpose)) {
                  preDescription = `${thisDesigner.designer} 디자이너 관련 포트폴리오 이미지 전송해드립니다.`;
                } else if (/제안 이미지/gi.test(purpose)) {
                  preDescription = `${thisDesigner.designer} 디자이너 관련 디자인 제안 방식 샘플 이미지 전송해드립니다.`;
                } else {
                  preDescription = `${thisDesigner.designer} 디자이너 관련 이미지 전송해드립니다.`;
                }
                description = await GeneralJs.promptLong("기타 안내 사항을 적어주세요!", preDescription);
                if (description === null || description === '') {
                  window.alert("안내 사항을 적어주세요!");
                  throw new Error("invalid description");
                }
  
                thisMemberId = instance.member.id;
                
                loading = instance.whiteProgressLoading(null, true);
  
                response = await ajaxJson({
                  mode: "copy",
                  id: id,
                  cliid: targetCliid,
                  purpose,
                  description,
                  member: thisMemberId,
                  proid: thisProid,
                }, S3HOST + ":3000/imageTransfer");
                sendId = response.id;
  
                if (typeof sendId !== "string") {
                  throw new Error("store fail");
                }
  
                await sleep(1 * 1000);
  
                loading.remove();
  
                instance.greenAlert("추천서 바인딩에 성공하였습니다!");
                removeByClass(promptAsideClassName);
              }

            } catch (e) {
              console.log(e);
              window.alert("전송에 실패하였습니다! 다시 시도해주세요!");
            }
          }
        },
        style: {
          display: "inline-flex",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: String(buttonTop) + ea,
          right: String(buttonRight) + ea,
          height: String(buttonHeight) + ea,
          paddingLeft: String(buttonPadding) + ea,
          paddingRight: String(buttonPadding) + ea,
          background: colorChip.gradientGray,
          borderRadius: String(5) + "px",
          zIndex: String(1),
        },
        child: {
          text: "추천서 묶기",
          style: {
            position: "relative",
            fontSize: String(size2) + ea,
            fontWeight: String(700),
            color: colorChip.white,
            top: String(textTop) + ea,
          }
        }
      });
      createNode({
        mother: baseMother,
        attribute: {
          cliid: targets[i].target.cliid,
          desid: targets[i].contents.designer.desid,
          id: targets[i].id,
        },
        event: {
          click: async function (e) {
            try {
              const id = this.getAttribute("id");
              const cliid = this.getAttribute("cliid");
              const desid = this.getAttribute("desid");

              removeByClass(promptAsideClassName);
  
              thisDesid = desid;
              [ thisDesigner ] = await ajaxJson({ noFlat: true, whereQuery: { desid: thisDesid } }, SECONDHOST + "/getDesigners", { equal: true });
  
              clientSearch = await GeneralJs.prompt("고객 이름, 또는 아이디를 입력해주세요!");
              if (clientSearch === null) {
                throw new Error("interrupt");
              }
              clientResponse = await ajaxJson({
                query: clientSearch
              }, BACKHOST + "/searchClients", { equal: true });
              clientResponseData = [];
              clientResponse.data.sort((a, b) => { return stringToDate(b.info.timeline).valueOf() - stringToDate(a.info.timeline).valueOf() });
              for (let obj of clientResponse.data) {
                if (!clientResponseData.map((o) => { return o.cliid }).includes(obj.standard.cliid)) {
                  clientResponseData.push({
                    cliid: obj.standard.cliid,
                    title: obj.standard.cliid + " - " + obj.standard.name + " : " + obj.info.timeline.split(" ")[0] + " 문의",
                    original: equalJson(JSON.stringify(obj)),
                  });
                }
              }
  
              if (clientResponseData.length === 0) {
  
                window.alert("고객을 찾을 수 없습니다!");
                throw new Error("invalid cliid");
  
              } else if (clientResponseData.length >= 1) {
  
                if (clientResponseData.length > 1) {
                  clientSearch = await GeneralJs.promptLongButtons("고객 이름, 또는 아이디를 선택해주세요!", clientResponseData.map((o) => { return o.title }));
                  if (clientSearch === null) {
                    throw new Error("invalid selection");
                  }
                  targetCliid = clientSearch.split(" ")[0];
                  thisClientName = clientSearch.split(" ")[2];
                } else {
                  targetCliid = clientResponseData[0].cliid;
                  thisClientName = clientResponseData[0].original.standard.name;
                }
                
                purposeSelection = await GeneralJs.promptLongButtons("전송 목적을 선택해주세요!", [
                  "포트폴리오 전송",
                  "비공개 사진 전송",
                  "디자인 제안 이미지 전송",
                  "직접 입력...",
                ]);
                if (purposeSelection === null) {
                  throw new Error("invalid selection");
                }
                if (/직접 입력/gi.test(purposeSelection)) {
                  purpose = await GeneralJs.prompt("전송 목적을 적어주세요!");
                  if (purpose === null) {
                    throw new Error("invalid purpose");
                  }
                } else {
                  purpose = purposeSelection;
                }
  
                if (/포트폴리오/gi.test(purpose)) {
                  preDescription = `${thisDesigner.designer} 디자이너 관련 포트폴리오 이미지 전송해드립니다.`;
                } else if (/제안 이미지/gi.test(purpose)) {
                  preDescription = `${thisDesigner.designer} 디자이너 관련 디자인 제안 방식 샘플 이미지 전송해드립니다.`;
                } else {
                  preDescription = `${thisDesigner.designer} 디자이너 관련 이미지 전송해드립니다.`;
                }
                description = await GeneralJs.promptLong("기타 안내 사항을 적어주세요!", preDescription);
                if (description === null || description === '') {
                  window.alert("안내 사항을 적어주세요!");
                  throw new Error("invalid description");
                }
  
                thisMemberId = instance.member.id;
                
                loading = instance.whiteProgressLoading(null, true);
  
                response = await ajaxJson({
                  mode: "copy",
                  id: id,
                  cliid: targetCliid,
                  purpose,
                  description,
                  member: thisMemberId,
                }, S3HOST + ":3000/imageTransfer");
                sendId = response.id;
  
                if (typeof sendId !== "string") {
                  throw new Error("store fail");
                }
  
                await sleep(1 * 1000);
  
                response = await ajaxJson({
                  mode: "send",
                  id: sendId,
                }, S3HOST + ":3000/imageTransfer");
  
                loading.remove();
  
                instance.greenAlert("전송에 성공하였습니다!");
                removeByClass(promptAsideClassName);
              }

            } catch (e) {
              console.log(e);
              window.alert("전송에 실패하였습니다! 다시 시도해주세요!");
            }
          }
        },
        style: {
          display: "inline-flex",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: String(buttonTop) + ea,
          right: String(buttonWidth + buttonBetween + buttonRight) + ea,
          height: String(buttonHeight) + ea,
          paddingLeft: String(buttonPadding) + ea,
          paddingRight: String(buttonPadding) + ea,
          background: colorChip.gradientGray,
          borderRadius: String(5) + "px",
          zIndex: String(1),
        },
        child: {
          text: "고객 전송",
          style: {
            position: "relative",
            fontSize: String(size2) + ea,
            fontWeight: String(700),
            color: colorChip.white,
            top: String(textTop) + ea,
          }
        }
      });
      createNode({
        mother: baseMother,
        attribute: {
          cliid: targets[i].target.cliid,
          id: targets[i].id,
        },
        event: {
          click: function (e) {
            const id = this.getAttribute("id");
            const cliid = this.getAttribute("cliid");
            blankHref(FRONTHOST + "/transfer.php?cliid=" + cliid + "&id=" + id + "&view=test");
          }
        },
        style: {
          display: "inline-flex",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: String(buttonTop) + ea,
          right: String(buttonWidth + buttonBetween + buttonWidth2 + buttonBetween + buttonRight) + ea,
          height: String(buttonHeight) + ea,
          paddingLeft: String(buttonPadding) + ea,
          paddingRight: String(buttonPadding) + ea,
          background: colorChip.gradientGreen,
          borderRadius: String(5) + "px",
          zIndex: String(1),
        },
        child: {
          text: "미리 보기",
          style: {
            position: "relative",
            fontSize: String(size2) + ea,
            fontWeight: String(700),
            color: colorChip.white,
            top: String(textTop) + ea,
          }
        }
      });
    }

    for (let i = 0; i < inputLength; i++) {
      baseMother = createNode({
        mother: targetsTong.firstChild,
        style: {
          display: "flex",
          position: "relative",
          marginBottom: String(inputBoxBetween) + ea,
          width: withOut(0, ea),
          height: String(inputBoxHeight) + ea,
          borderRadius: String(5) + "px",
          background: colorChip.gray1,
          flexDirection: "row",
          alignItems: "center",
        }
      });
    }

  } catch (e) {
    console.log(e);
  }
}

GeneralJs.prototype.greenBar = function () {
  const instance = this;
  let pathArr = window.location.pathname.split("?");
  let thisPathName = pathArr[0].replace(/\//g, '');

  let div_clone, div_clone2, div_clone3, svg_icon;
  let input_clone;
  let style = {};
  let additionalStyle = {};
  let ea = "px";
  let margin, start, colors;
  let move;
  let moveEventLeft, moveEventRight;
  let top, belowTop, right, iconRight;

  this.grayBarWidth = 210;
  this.belowHeight = 123;

  div_clone = GeneralJs.nodes.div.cloneNode(true);
  div_clone.id = "greenBar";
  style = {
    display: GeneralJs.returnGet().dataonly === "true" ? "none" : "block",
    position: "fixed",
    background: GeneralJs.colorChip.gradientGray,
    bottom: String(0),
    left: String(0),
    width: "100%",
    height: String(this.belowHeight) + ea,
    zIndex: String(2),
  };
  for (let i in style) {
    div_clone.style[i] = style[i];
  }
  div_clone.addEventListener("selectstart", function (e) {
    e.preventDefault();
  });
  this.below = div_clone;

  //circle
  margin = 18;
  start = 6;
  colors = [
    GeneralJs.colorChip.green,
  ];

  for (let i = 0; i < colors.length; i++) {
    div_clone.insertAdjacentHTML(`beforeend`, this.returnCircle("right:" + String(start + (margin * i)) + ea, colors[i]));
  }

  for (let dom of div_clone.children) {
    dom.lastChild.addEventListener("click", function (e) {
      if (GeneralJs.colorMode === "light") {
        GeneralJs.colorChip = JSON.parse(JSON.stringify(GeneralJs.colorSet.dark));
        GeneralJs.colorMode = "dark";
        window.localStorage.setItem("colorChip", JSON.stringify(GeneralJs.colorChip));
        window.localStorage.setItem("colorMode", GeneralJs.colorMode);
      } else {
        GeneralJs.colorChip = JSON.parse(JSON.stringify(GeneralJs.colorSet.light));
        GeneralJs.colorMode = "light";
        window.localStorage.setItem("colorChip", JSON.stringify(GeneralJs.colorChip));
        window.localStorage.setItem("colorMode", GeneralJs.colorMode);
      }
      window.location.reload();
    });
  }

  //arrow - left
  move = 300;
  top = 32;
  right = 38;

  div_clone2 = GeneralJs.nodes.div.cloneNode(true);
  div_clone2.appendChild(SvgTong.stringParsing(this.returnBigArrow(GeneralJs.colorChip.whiteIcon)));
  div_clone2.classList.add("hoverDefault");
  style = {
    display: "block",
    position: "absolute",
    width: String(34) + ea,
    height: String(53) + ea,
    top: String(top) + ea,
    right: String(right) + ea,
    cursor: "pointer",
  };
  for (let i in style) {
    div_clone2.style[i] = style[i];
  }

  moveEventLeft = function (e) {
    const ea = "px";
    const translateFunc = function (past) {
      const newValue = Number(past.replace(/[^0-9\-\.]/g, '')) - move;
      return ("translateX(" + String(newValue) + ea + ")");
    }
    let target, targets;
    if (document.querySelector(".moveTarget2") === null) {
      if (document.querySelector("iframe") !== null) {
        if (document.querySelector("iframe").contentWindow.document.querySelector(".moveTarget") !== null) {
          targets = document.querySelector("iframe").contentWindow.document.querySelectorAll(".moveTarget");
        } else {
          targets = document.querySelectorAll(".moveTarget");
        }
      } else {
        targets = document.querySelectorAll(".moveTarget");
      }
      for (let target of targets) {
        if (target.style.transform === '') {
          target.style.transform = "translateX(" + String(-1 * move) + ea + ")";
        } else {
          target.style.transform = translateFunc(target.style.transform);
        }
        if (Number(target.style.transform.replace(/[^0-9\-\.]/g, '')) > 0) {
          target.style.transform = "translateX(0px)";
        } else if ((-1 * (Number(target.style.width.replace(/[^0-9]/g, '')) - (window.innerWidth - 20))) > Number(target.style.transform.replace(/[^0-9\-\.]/g, '')) + instance.grayBarWidth) {
          target.style.transform = "translateX(" + String(-1 * (Number(target.style.width.replace(/[^0-9]/g, '')) - (window.innerWidth - 20) + instance.grayBarWidth)) + ea + ")";
        }
      }
    } else {
      target = document.querySelector(".moveTarget2");
      if (target.style.transform === '') {
        target.style.transform = "translateX(" + String(-1 * move) + ea + ")";
      } else {
        target.style.transform = translateFunc(target.style.transform);
      }
    }
  }

  div_clone2.addEventListener("click", moveEventLeft);
  this.belowButtons.arrow.left = div_clone2;
  div_clone.appendChild(div_clone2);

  //arrow - right
  div_clone2 = GeneralJs.nodes.div.cloneNode(true);
  div_clone2.appendChild(SvgTong.stringParsing(this.returnBigArrow(GeneralJs.colorChip.whiteIcon)));
  div_clone2.classList.add("hoverDefault");
  for (let i in style) {
    div_clone2.style[i] = style[i];
  }
  div_clone2.style.top = String(top + 2) + ea;
  div_clone2.style.right = String(right + 50) + ea;
  div_clone2.style.transform = "rotate(180deg)";

  moveEventRight = function (e) {
    const ea = "px";
    const translateFunc = function (past) {
      const newValue = Number(past.replace(/[^0-9\-\.]/g, '')) + move;
      return ("translateX(" + String(newValue) + ea + ")");
    }
    let target, targets;
    if (document.querySelector(".moveTarget2") === null) {
      if (document.querySelector("iframe") !== null) {
        if (document.querySelector("iframe").contentWindow.document.querySelector(".moveTarget") !== null) {
          targets = document.querySelector("iframe").contentWindow.document.querySelectorAll(".moveTarget");
        } else {
          targets = document.querySelectorAll(".moveTarget");
        }
      } else {
        targets = document.querySelectorAll(".moveTarget");
      }
      for (let target of targets) {
        if (target.style.transform === '') {
          target.style.transform = "translateX(" + String(move) + ea + ")";
        } else {
          target.style.transform = translateFunc(target.style.transform);
        }
        if (Number(target.style.transform.replace(/[^0-9\-\.]/g, '')) > 0) {
          target.style.transform = "translateX(0px)";
        } else if ((-1 * (Number(target.style.width.replace(/[^0-9]/g, '')) - (window.innerWidth - 20))) > Number(target.style.transform.replace(/[^0-9\-\.]/g, '')) + instance.grayBarWidth) {
          target.style.transform = "translateX(" + String(-1 * (Number(target.style.width.replace(/[^0-9]/g, '')) - (window.innerWidth - 20) + instance.grayBarWidth)) + ea + ")";
        }
      }
    } else {
      target = document.querySelector(".moveTarget2");
      if (target.style.transform === '') {
        target.style.transform = "translateX(" + String(-1 * move) + ea + ")";
      } else {
        target.style.transform = translateFunc(target.style.transform);
      }
      if (Number(target.style.transform.replace(/[^0-9\-\.]/g, '')) > 0) {
        target.style.transform = "translateX(0px)";
      }
    }
  }

  div_clone2.addEventListener("click", moveEventRight);
  this.belowButtons.arrow.right = div_clone2;
  div_clone.appendChild(div_clone2);

  iconRight = right + 102;
  top = top;
  belowTop = top + 34;

  //report
  svg_icon = SvgTong.stringParsing(this.returnReport(GeneralJs.colorChip.whiteIcon));
  svg_icon.classList.add("hoverDefault");
  style = {
    display: "block",
    position: "absolute",
    width: String(22) + ea,
    height: String(23) + ea,
    top: String(top) + ea,
    right: String(iconRight) + ea,
    cursor: "pointer",
  };
  for (let i in style) {
    svg_icon.style[i] = style[i];
  }
  this.belowButtons.square.reportIcon = svg_icon;
  div_clone.appendChild(svg_icon);

  //return
  svg_icon = SvgTong.stringParsing(this.returnReturn(GeneralJs.colorChip.whiteIcon));
  svg_icon.classList.add("hoverDefault");
  for (let i in style) {
    svg_icon.style[i] = style[i];
  }
  additionalStyle = {
    width: String(28) + ea,
    height: String(27) + ea,
    top: String(belowTop - 2) + ea,
    right: String(iconRight - 3) + ea,
  };
  for (let i in additionalStyle) {
    svg_icon.style[i] = additionalStyle[i];
  }
  this.belowButtons.square.returnIcon = svg_icon;
  svg_icon.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    e.stopPropagation();
    window.localStorage.clear();
    window.location.reload();
  });
  div_clone.appendChild(svg_icon);

  //button C
  svg_icon = SvgTong.stringParsing(this.returnCinitial(GeneralJs.colorChip.whiteIcon));
  svg_icon.classList.add("hoverDefault");
  for (let i in style) {
    svg_icon.style[i] = style[i];
  }
  additionalStyle = {
    width: String(21) + ea,
    height: String(24) + ea,
    top: String(top - 1) + ea,
    right: String(iconRight + 31) + ea,
  };
  for (let i in additionalStyle) {
    svg_icon.style[i] = additionalStyle[i];
  }
  this.belowButtons.square.up = svg_icon;
  div_clone.appendChild(svg_icon);

  //button R
  svg_icon = SvgTong.stringParsing(this.returnRinitialItalic(GeneralJs.colorChip.whiteIcon));
  svg_icon.classList.add("hoverDefault");
  for (let i in style) {
    svg_icon.style[i] = style[i];
  }
  additionalStyle = {
    width: String(22) + ea,
    height: String(22) + ea,
    top: String(belowTop) + ea,
    right: String(iconRight + 31) + ea,
  };
  for (let i in additionalStyle) {
    svg_icon.style[i] = additionalStyle[i];
  }
  this.belowButtons.square.down = svg_icon;
  div_clone.appendChild(svg_icon);

  //navigator icons
  const { heightRatio: naviIconsRatio, svg: naviIcons } = this.returnTitleArr(GeneralJs.colorChip.whiteIcon, 23);
  let naviIconsHost, naviIconsLeftException;
  let naviIconsLinks, naviIconsContextLinks;
  let naviIconsMap;
  let opacityMap;
  let opacityStandard;

  naviIconsHost = window.location.protocol + "//" + window.location.host;
  naviIconsLinks = [
    "/client",
    "/proposal",
    "/project",
    "/designer",
    "/designer?mode=contents",
    "/process",
    "/mpr",
    "/contents",
  ];
  naviIconsContextLinks = [
    "/client",
    "/process",
    "/builder?mode=construct",
    "/builder",
    "/designer?mode=contents",
    "/calculation",
    "/mpr",
    "/contents",
  ];
  naviIconsLeftException = [
    0,
    2,
    -2.5,
    -1.5,
    0,
    1,
    1.5,
    2.5,
  ];
  naviIconsMap = [
    [ "client" ],
    [ "proposal" ],
    [ "project" ],
    [ "designer" ],
    [ "designercontents" ],
    [ "process", "calculation" ],
    [ "mpr" ],
    [ "contents" ],
  ];
  opacityMap = {
    construct: "project",
    contents: "contents",
  };

  for (let i = 0; i < naviIcons.length; i++) {
    svg_icon = SvgTong.stringParsing(naviIcons[i]);
    svg_icon.classList.add("hoverDefault");
    for (let i in style) {
      svg_icon.style[i] = style[i];
    }
    additionalStyle = {
      right: "",
      width: String(naviIconsRatio[i] * 23) + ea,
      height: String(21.5) + ea,
      top: String(((i % 2) === 1) ? belowTop - 2 : top - 1) + ea,
      left: String(right + 12 + (Math.floor(i / 2) * 43.5) + (naviIconsLeftException[i])) + ea,
    };
    for (let i in additionalStyle) {
      svg_icon.style[i] = additionalStyle[i];
    }

    opacityStandard = thisPathName;
    if (/mode/gi.test(window.location.search) && window.location.search.split("&").map((str) => { return str.split("=") }).flat().map((str) => { return str.replace(/[\&\=\?]/gi, '') }).some((key) => { return Object.keys(opacityMap).includes(key) })) {
      opacityStandard = thisPathName + opacityMap[window.location.search.split("&").map((str) => { return str.split("=") }).flat().map((str) => { return str.replace(/[\&\=\?]/gi, '') }).find((key) => { return Object.keys(opacityMap).includes(key) })];
    }
    if (naviIconsMap[i].includes(opacityStandard)) {
      svg_icon.style.opacity = String(0.5);
    }

    GeneralJs.addHrefEvent(svg_icon, (naviIconsHost + naviIconsLinks[i]));
    svg_icon.addEventListener("contextmenu", function (e) {
      e.preventDefault();
      window.location.href = naviIconsHost + naviIconsContextLinks[i];
    });
    this.belowButtons.naviIcons[naviIconsLinks[i].replace(/^\//, '')] = svg_icon;
    div_clone.appendChild(svg_icon);
  }

  //extract icon
  svg_icon = SvgTong.stringParsing(this.returnExtract(GeneralJs.colorChip.whiteIcon));
  svg_icon.classList.add("hoverDefault");
  for (let i in style) {
    svg_icon.style[i] = style[i];
  }
  additionalStyle = {
    right: "",
    width: String(25) + ea,
    height: String(23) + ea,
    top: String(top - 1) + ea,
    left: String(iconRight + 87) + ea,
  };
  for (let i in additionalStyle) {
    svg_icon.style[i] = additionalStyle[i];
  }
  this.belowButtons.sub.extractIcon = svg_icon;
  div_clone.appendChild(svg_icon);

  //talk icon
  svg_icon = SvgTong.stringParsing(this.returnTalk(GeneralJs.colorChip.whiteIcon));
  svg_icon.classList.add("hoverDefault");
  for (let i in style) {
    svg_icon.style[i] = style[i];
  }
  additionalStyle = {
    right: "",
    width: String(25) + ea,
    height: String(24) + ea,
    top: String(belowTop - 2) + ea,
    left: String(iconRight + 87) + ea,
  };
  for (let i in additionalStyle) {
    svg_icon.style[i] = additionalStyle[i];
  }
  this.belowButtons.sub.talkIcon = svg_icon;
  div_clone.appendChild(svg_icon);

  //file manager icon
  svg_icon = SvgTong.stringParsing(this.returnFolder(GeneralJs.colorChip.whiteIcon));
  svg_icon.classList.add("hoverDefault");
  for (let i in style) {
    svg_icon.style[i] = style[i];
  }
  additionalStyle = {
    right: "",
    width: String(25) + ea,
    height: String(23) + ea,
    top: String(top - 1) + ea,
    left: String(iconRight + 124) + ea,
  };
  for (let i in additionalStyle) {
    svg_icon.style[i] = additionalStyle[i];
  }
  this.belowButtons.sub.folder = svg_icon;
  if (!/\/dashboard/gi.test(window.location.pathname)) {
    this.belowButtons.sub.folder.addEventListener("click", function (e) {
      GeneralJs.selfHref(window.location.protocol + "//" + window.location.host + "/file");
    });
  }
  this.belowButtons.sub.folder.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    GeneralJs.selfHref(window.location.protocol + "//" + window.location.host + "/file");
  });
  div_clone.appendChild(svg_icon);

  //email icon
  svg_icon = SvgTong.stringParsing(GeneralJs.svgMaker.mailIcon(GeneralJs.colorChip.whiteIcon));
  svg_icon.classList.add("hoverDefault");
  svg_icon.classList.add("emailTarget");
  for (let i in style) {
    svg_icon.style[i] = style[i];
  }
  additionalStyle = {
    right: "",
    width: String(26) + ea,
    height: String(26) + ea,
    top: String(belowTop - 2.5) + ea,
    left: String(iconRight + 123) + ea,
  };
  for (let i in additionalStyle) {
    svg_icon.style[i] = additionalStyle[i];
  }
  svg_icon.addEventListener("click", function (e) {
    const whitePopupClassName = "whitePopupClassName";
    const totalContents = document.getElementById("totalcontents");
    const zIndex = 99;
    let margin;
    let cancelBack, whitePrompt;
    margin = 30;
    GeneralJs.removeByClass(whitePopupClassName);
    
    cancelBack = GeneralJs.createNode({
      mother: totalContents,
      class: [ whitePopupClassName ],
      event: {
        click: (e) => {
          GeneralJs.removeByClass(whitePopupClassName);
        },
      },
      style: {
        display: "block",
        position: "fixed",
        top: String(0),
        left: String(0) + ea,
        width: GeneralJs.withOut(0, ea),
        height: GeneralJs.withOut(instance.belowHeight, ea),
        background: GeneralJs.colorChip.black,
        opacity: String(0.3),
        zIndex: String(zIndex),
      }
    });
  
    whitePrompt = GeneralJs.createNode({
      mother: totalContents,
      class: [ whitePopupClassName ],
      style: {
        display: "block",
        position: "fixed",
        top: String(margin) + ea,
        left: String(0 + margin) + ea,
        width: GeneralJs.withOut(0 + (margin * 2), ea),
        height: GeneralJs.withOut(instance.belowHeight + (margin * 2), ea),
        borderRadius: String(5) + "px",
        background: GeneralJs.colorChip.white,
        boxShadow: "0px 3px 15px -9px " + GeneralJs.colorChip.darkShadow,
        animation: "fadeuplite 0.3s ease forwards",
        overflow: "hidden",
        zIndex: String(zIndex),
      },
      child: {
        mode: "iframe",
        attribute: {
          src: BACKHOST + "/email?entire=true&dataonly=true" + (typeof GeneralJs.returnGet().emailtarget === "string" ? ("&target=" + GeneralJs.returnGet().emailtarget) : ""),
          width: String(100) + '%',
          height: String(100) + '%',
        },
        style: {
          display: "block",
          position: "relative",
          top: String(0),
          left: String(0),
          width: GeneralJs.withOut(0, ea),
          height: String(100) + '%',
          border: String(0),
        }
      }
    });
  });
  this.belowButtons.sub.profile = svg_icon;
  div_clone.appendChild(svg_icon);

  //search Input
  this.searchInput(div_clone);
  this.totalContents.appendChild(div_clone);
  this.searchInput.focus();

  //move right area
  div_clone2 = GeneralJs.nodes.div.cloneNode(true);
  div_clone2.id = "moveRightArea";
  style = {
    display: "block",
    position: "fixed",
    background: "transparent",
    top: String(0) + ea,
    right: String(0) + ea,
    width: String(15) + ea,
    height: "calc(100% - " + String(this.belowHeight) + ea + ")",
    cursor: "e-resize",
  };
  for (let i in style) {
    div_clone2.style[i] = style[i];
  }
  div_clone2.addEventListener("mouseenter", function (e) {
    if (GeneralJs.timeouts["scrollXAreaLeftInterval"] === undefined || GeneralJs.timeouts["scrollXAreaLeftInterval"] === null) {
      GeneralJs.timeouts["scrollXAreaLeftInterval"] = window.setInterval(function () {
        const targets = document.querySelectorAll(".moveTarget");
        const ea = "px";
        const translateFunc = function (past) {
          const newValue = Number(past.replace(/[^0-9\-\.]/g, '')) - move;
          return ("translateX(" + String(newValue) + ea + ")");
        }
        if (targets.length > 0) {
          if (Number(targets[0].style.width.replace(/[^0-9]/g, '')) >= window.innerWidth - 20) {
            for (let target of targets) {
              if (target.style.transform === '') {
                target.style.transform = "translateX(" + String(-1 * move) + ea + ")";
              } else {
                target.style.transform = translateFunc(target.style.transform);
              }
              if (Number(target.style.transform.replace(/[^0-9\-\.]/g, '')) > 0) {
                target.style.transform = "translateX(0px)";
                window.clearInterval(GeneralJs.timeouts["scrollXAreaLeftInterval"]);
                GeneralJs.timeouts["scrollXAreaLeftInterval"] = null;
              } else if ((-1 * (Number(target.style.width.replace(/[^0-9]/g, '')) - (window.innerWidth - 20))) > Number(target.style.transform.replace(/[^0-9\-\.]/g, '')) + instance.grayBarWidth) {
                target.style.transform = "translateX(" + String(-1 * (Number(target.style.width.replace(/[^0-9]/g, '')) - (window.innerWidth - 20) + instance.grayBarWidth)) + ea + ")";
                window.clearInterval(GeneralJs.timeouts["scrollXAreaLeftInterval"]);
                GeneralJs.timeouts["scrollXAreaLeftInterval"] = null;
              }
            }
          }
        }
      }, 400);
    }
  });
  div_clone2.addEventListener("mouseleave", function () {
    if (GeneralJs.timeouts["scrollXAreaLeftInterval"] !== undefined) {
      window.clearInterval(GeneralJs.timeouts["scrollXAreaLeftInterval"]);
      GeneralJs.timeouts["scrollXAreaLeftInterval"] = null;
    }
  })
  this.belowButtons.moveArea.right = div_clone2;
  this.below.appendChild(div_clone2);

  //move left area
  div_clone2 = GeneralJs.nodes.div.cloneNode(true);
  div_clone2.id = "moveLeftArea";
  style = {
    display: "block",
    position: "fixed",
    background: "transparent",
    top: String(0) + ea,
    left: String(210) + ea,
    width: String(15) + ea,
    height: "calc(100% - " + String(this.belowHeight) + ea + ")",
    cursor: "w-resize",
  };
  for (let i in style) {
    div_clone2.style[i] = style[i];
  }
  div_clone2.addEventListener("mouseenter", function (e) {
    if (GeneralJs.timeouts["scrollXAreaRightInterval"] === undefined || GeneralJs.timeouts["scrollXAreaRightInterval"] === null) {
      GeneralJs.timeouts["scrollXAreaRightInterval"] = window.setInterval(function () {
        const targets = document.querySelectorAll(".moveTarget");
        const ea = "px";
        const translateFunc = function (past) {
          const newValue = Number(past.replace(/[^0-9\-\.]/g, '')) + move;
          return ("translateX(" + String(newValue) + ea + ")");
        }
        if (targets.length > 0) {
          if (Number(targets[0].style.width.replace(/[^0-9]/g, '')) >= window.innerWidth - 20) {
            for (let target of targets) {
              if (target.style.transform === '') {
                target.style.transform = "translateX(" + String(move) + ea + ")";
              } else {
                target.style.transform = translateFunc(target.style.transform);
              }
              if (Number(target.style.transform.replace(/[^0-9\-\.]/g, '')) > 0) {
                target.style.transform = "translateX(0px)";
                window.clearInterval(GeneralJs.timeouts["scrollXAreaRightInterval"]);
                GeneralJs.timeouts["scrollXAreaRightInterval"] = null;
              } else if ((-1 * (Number(target.style.width.replace(/[^0-9]/g, '')) - (window.innerWidth - 20))) > Number(target.style.transform.replace(/[^0-9\-\.]/g, '')) + instance.grayBarWidth) {
                target.style.transform = "translateX(" + String(-1 * (Number(target.style.width.replace(/[^0-9]/g, '')) - (window.innerWidth - 20) + instance.grayBarWidth)) + ea + ")";
                window.clearInterval(GeneralJs.timeouts["scrollXAreaRightInterval"]);
                GeneralJs.timeouts["scrollXAreaRightInterval"] = null;
              }
            }
          }
        }
      }, 400);
    }
  });
  div_clone2.addEventListener("mouseleave", function () {
    if (GeneralJs.timeouts["scrollXAreaRightInterval"] !== undefined) {
      window.clearInterval(GeneralJs.timeouts["scrollXAreaRightInterval"]);
      GeneralJs.timeouts["scrollXAreaRightInterval"] = null;
    }
  })
  this.belowButtons.moveArea.left = div_clone2;
  this.below.appendChild(div_clone2);

  //sub pannel button
  div_clone2 = GeneralJs.nodes.div.cloneNode(true);
  div_clone2.id = "grayLeftOpenButton";
  div_clone2.classList.add("hoverdefault_lite_reverse");
  style = {
    position: "fixed",
    background: GeneralJs.colorChip.green,
    right: String(0) + ea,
    width: String(19) + ea,
    height: String(60) + ea,
    top: "calc(calc(calc(100vh - " + String(this.belowHeight) + ea + ") / 2) - " + String(60 / 2) + ea + ")",
    borderTopLeftRadius: String(5) + ea,
    borderBottomLeftRadius: String(5) + ea,
    transition: "all 0.3s ease",
  };
  for (let i in style) {
    div_clone2.style[i] = style[i];
  }
  div_clone2.setAttribute("progress", "done");
  div_clone2.setAttribute("set", "off");
  div_clone2.insertAdjacentHTML(`beforeend`, this.returnCircle("transform:scale(0.5);left:4px;top:" + String((11) + ((12) * 0)) + ea, GeneralJs.colorChip.white));
  div_clone2.insertAdjacentHTML(`beforeend`, this.returnCircle("transform:scale(0.5);left:4px;top:" + String((11) + ((12) * 1)) + ea, GeneralJs.colorChip.white));
  div_clone2.insertAdjacentHTML(`beforeend`, this.returnCircle("transform:scale(0.5);left:4px;top:" + String((11) + ((12) * 2)) + ea, GeneralJs.colorChip.white));
  div_clone2.addEventListener("click", GeneralJs.grayLeftLaunching());
  GeneralJs.stacks["grayLeftButton"] = div_clone2;
  this.below.appendChild(div_clone2);

  GeneralJs.setQueue(() => {
    if (typeof GeneralJs.returnGet().emailtarget === "string") {
      const iconTarget = instance.below.querySelector('.' + "emailTarget");
      if (iconTarget !== null) {
        iconTarget.dispatchEvent(new Event("click", { bubbles: true }));
      }
    }
  }, 200);

}

GeneralJs.prototype.dashboardBox = function () {
  const instance = this;
  let pathArr = window.location.pathname.split("?");
  let thisPathName = pathArr[0].replace(/\//g, '');
  const { vaildTargets, standardColumn, titleStandard, buttons } = DataPatch.toolsDashboard(thisPathName);
  const { createNode, createNodes, colorChip, withOut, isMac } = GeneralJs;
  let ea = "px";
  let width, height;
  let dashboardBox, dashboardWindow;
  let right, bottom;
  let topBarHeight;
  let dragRatio;

  GeneralJs.stacks["dashboardBoxBoo"] = false;
  GeneralJs.stacks["dashboardBox"] = null;
  GeneralJs.stacks["dashboardBoxMother"] = null;
  GeneralJs.stacks["dashboardBoxHeight"] = 0;

  if (vaildTargets.includes(thisPathName)) {

    width = 340;
    height = (25 * (buttons.length / 2)) + 94;
    right = 20;
    bottom = 158;
    topBarHeight = 14;
    dragRatio = 1;

    dashboardWindow = createNode({
      mother: this.below,
      class: [ "backblurdefault_lite" ],
      style: {
        position: "fixed",
        background: colorChip.white,
        right: String(right) + ea,
        width: String(width) + ea,
        height: String(height) + ea,
        borderRadius: String(5) + "px",
        bottom: String(bottom) + ea,
        overflow: "hidden",
        opacity: String(0.9),
        boxShadow: "-1px 4px 15px -9px " + colorChip.shadow,
        transition: "all 0s ease",
        zIndex: String(102),
        animation: "fadeuplite 0.3s ease forwards",
      },
      events: [
        {
          type: "dragover",
          event: function (e) {
            e.preventDefault();
            const that = this;
            that.style.bottom = String(window.innerHeight - (e.y + (height * dragRatio))) + ea;
            that.style.right = String(window.innerWidth - e.x - width + GeneralJs.stacks["windowDragStartPoint"]) + ea;
          }
        }
      ],
      children: [
        {
          attribute: [
            { draggable: "true" }
          ],
          style: {
            position: "absolute",
            width: String(100) + "%",
            height: String(topBarHeight) + ea,
            top: String(0),
            left: String(0),
            background: colorChip.gray2,
            cursor: "move",
            transition: "all 0s ease",
          },
          events: [
            {
              type: "dragstart",
              event: function (e) {
                const that = this.parentNode;
                let div;
                let style, ea;

                GeneralJs.stacks["windowDragStartPoint"] = 0;
                GeneralJs.stacks["windowDragStartPoint"] = e.x - that.offsetLeft;
                ea = "px";

                div = GeneralJs.nodes.div.cloneNode(true);
                style = {
                  position: "fixed",
                  background: "transparent",
                  width: String(100) + '%',
                  height: String(100) + '%',
                  top: String(0),
                  left: String(0)
                };
                for (let i in style) {
                  div.style[i] = style[i];
                }
                div.addEventListener("dragover", function (e) {
                  that.style.bottom = String(window.innerHeight - e.y - (height * dragRatio)) + ea;
                  that.style.right = String(window.innerWidth - e.x - width + GeneralJs.stacks["windowDragStartPoint"]) + ea;
                  e.preventDefault();
                });
                GeneralJs.stacks["windowDragBack"] = div;
                that.parentNode.insertBefore(div, that);

                e.dataTransfer.setData("dragData", that);
                const img = new Image();
                e.dataTransfer.setDragImage(img, 1, 1);
              }
            },
            {
              type: "dragend",
              event: function (e) {
                e.preventDefault();
                GeneralJs.stacks["windowDragBack"].parentElement.removeChild(GeneralJs.stacks["windowDragBack"]);
                GeneralJs.stacks["windowDragBack"] = null;
              }
            },
            {
              type: "dragenter",
              event: (e) => { e.preventDefault(); }
            },
            {
              type: "dragleave",
              event: (e) => { e.preventDefault(); }
            },
            {
              type: "dragover",
              event: function (e) {
                e.preventDefault();
                const that = this.parentNode;
                that.style.bottom = String(window.innerHeight - (e.y + (height * dragRatio))) + ea;
                that.style.right = String(window.innerWidth - e.x - width + GeneralJs.stacks["windowDragStartPoint"]) + ea;
              }
            },
            {
              type: "drop",
              event: (e) => { e.preventDefault(); e.stopPropagation(); }
            },
            {
              type: "contextmenu",
              event: function (e) {
                e.stopPropagation();
                e.preventDefault();
                if (GeneralJs.stacks["dashboardBoxMother"] !== null) {
                  instance.below.removeChild(GeneralJs.stacks["dashboardBoxMother"]);
                  GeneralJs.stacks["dashboardBoxBoo"] = false;
                  GeneralJs.stacks["dashboardBox"] = null;
                  GeneralJs.stacks["dashboardBoxMother"] = null;
                }
              }
            }
          ]
        }
      ]
    });

    dashboardBox = createNode({
      mother: dashboardWindow,
      style: {
        position: "relative",
        width: String(100) + "%",
        height: withOut(topBarHeight, ea),
        marginTop: String(topBarHeight + ((isMac()) ? 0 : 3)) + ea,
        background: colorChip.white,
        transition: "all 0s ease",
      }
    });

    GeneralJs.stacks["dashboardBoxBoo"] = true;
    GeneralJs.stacks["dashboardBox"] = dashboardBox;
    GeneralJs.stacks["dashboardBoxMother"] = dashboardWindow;
    GeneralJs.stacks["dashboardBoxHeight"] = height;

    GeneralJs.dashboardBoxLaunching(dashboardBox);
  }
}

GeneralJs.prototype.memberView = function () {
  const instance = this;
  return async function (e) {
    try {
      const { createNode, colorChip, withOut, ajaxJson, setCookie, isMac } = GeneralJs;
      const totalContents = document.getElementById("totalcontents");
      const member = instance.member;
      const ea = "px";
      const zIndex = 3;
      let allMembers;
      let width, height;
      let bottom, left;
      let logOutBottom, logOutRight, logOutWidth;
      let whiteTong;
      let whitePaddingLeft, whitePaddingTop, whitePaddingBottom;
      let buttonBottom;
      let secondButtonIndent;
      let between;
      let size;
      let tempDom, tong;
      let buttonSize;
      let firstButtonIndent;

      width = 200;
      bottom = 66;
      left = 220;

      whitePaddingLeft = 20;
      whitePaddingTop = isMac() ? 18 : 20;
      whitePaddingBottom = isMac () ? 54 : 52;

      logOutBottom = 22;
      buttonBottom = 19.5;
      logOutRight = 17.5;
      logOutWidth = 16;

      between = 8;

      firstButtonIndent = 2;
      secondButtonIndent = 46;
      size = 13;

      buttonSize = 13;

      tong = [];

      allMembers = (await ajaxJson({ type: "get" }, "/getMembers", { equal: true })).filter((obj) => { return obj.alive });
      // dev needs
      for (let member of allMembers) {
        member.online = false;
      }

      instance.memberBox = {};
      instance.memberBox.cancel = createNode({
        mother: totalContents,
        event: {
          click: function (e) {
            instance.memberBox.cancel.remove();
            instance.memberBox.contents.remove();
          }
        },
        style: {
          position: "fixed",
          width: String(98) + "vw",
          height: String(98) + "vh",
          bottom: String(0) + ea,
          left: String(0) + ea,
          background: "transparent",
          opacity: String(0),
          zIndex: String(zIndex),
        }
      });
      instance.memberBox.contents = createNode({
        mother: totalContents,
        style: {
          position: "fixed",
          width: String(width) + ea,
          bottom: String(bottom) + ea,
          left: String(left) + ea,
          background: colorChip.white,
          borderRadius: String(4) + "px",
          boxShadow: "0px 6px 18px -9px " + colorChip.darkDarkShadow,
          animation: "profilefadeup 0.4s ease forwards",
          zIndex: String(zIndex),
          paddingLeft: String(whitePaddingLeft) + ea,
          paddingRight: String(whitePaddingLeft) + ea,
          paddingTop: String(whitePaddingTop) + ea,
          paddingBottom: String(whitePaddingBottom) + ea,
        },
        children: [
          {
            mode: "svg",
            source: instance.returnLogout(colorChip.green),
            class: [ "hoverDefault" ],
            event: {
              click: function (e) {
                let obj = {};
                obj["homeliaisonConsoleLoginedName"] = '';
                obj["homeliaisonConsoleLoginedEmail"] = '';
                obj["homeliaisonConsoleLoginedBoolean"] = '';
                setCookie(obj, true);
                window.localStorage.removeItem("GoogleClientProfile");
                window.location.reload();
              }
            },
            style: {
              position: "absolute",
              bottom: String(logOutBottom) + ea,
              right: String(logOutRight) + ea,
              width: String(logOutWidth) + ea,
            }
          },
          {
            style: {
              position: "relative",
              top: String(0),
              left: String(0),
              width: String(100) + '%',
            }
          },
          {
            text: "alarm",
            event: {
              click: async function (e) {
                try {
                  const option = { alarm: true };
                  const zIndex = 3;
                  const px = "px";
                  let targetMembers;
                  let thisMemid;
                  let message;
                  let cancelBack, whitePrompt;
                  let width, height;
                  let greenBarHeight;

                  greenBarHeight = document.getElementById("greenBar") !== null ? Number(document.getElementById("greenBar").style.height.replace(/[^0-9\.\-]/gi, '')) : 0;

                  width = 600;
                  height = 200;

                  targetMembers = [];
                  for (let dom of tong) {
                    if (dom.getAttribute("toggle") === "on") {
                      targetMembers.push(dom.getAttribute("memid"));
                    }
                  }

                  thisMemid = instance.member.id;

                  cancelBack = createNode({
                    mother: document.body,
                    event: {
                      click: (e) => { e.stopPropagation(); },
                      contextmenu: (e) => { e.stopPropagation(); },
                      dblclick: (e) => { e.stopPropagation(); },
                      drop: (e) => { e.stopPropagation(); },
                      keyup: (e) => { e.stopPropagation(); },
                      keydown: (e) => { e.stopPropagation(); },
                      keypress: (e) => { e.stopPropagation(); },
                    },
                    style: {
                      position: "fixed",
                      top: String(0),
                      left: String(0),
                      width: String(100) + '%',
                      height: String(99) + "vh",
                      background: "transparent",
                      zIndex: String(zIndex),
                    }
                  });

                  whitePrompt = createNode({
                    mother: document.body,
                    event: {
                      click: (e) => { e.stopPropagation(); },
                      contextmenu: (e) => { e.stopPropagation(); },
                      dblclick: (e) => { e.stopPropagation(); },
                      drop: (e) => { e.stopPropagation(); },
                      keyup: (e) => { e.stopPropagation(); },
                      keydown: (e) => { e.stopPropagation(); },
                      keypress: (e) => { e.stopPropagation(); },
                    },
                    style: {
                      position: "fixed",
                      width: String(width) + px,
                      height: String(height) + px,
                      left: withOut(50, width / 2, px),
                      top: "calc(calc(50vh - " + String(greenBarHeight) + ea + ") - " + String(height / 2) + px + ")",
                      background: colorChip.white,
                      borderRadius: String(5) + "px",
                      boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
                      animation: "fadeuplite 0.4s ease forwards",
                      zIndex: String(zIndex),
                    }
                  });

                } catch (e) {
                  console.log(e);
                }
              }
            },
            class: [ "hoverDefault_lite" ],
            style: {
              position: "absolute",
              bottom: String(buttonBottom) + ea,
              left: String(logOutRight + firstButtonIndent) + ea,
              fontSize: String(buttonSize) + ea,
              fontWeight: String(400),
              fontFamily: "graphik",
              color: colorChip.green,
            }
          },
          {
            text: "alert",
            event: {
              click: async function (e) {
                try {

                  //dev


                } catch (e) {
                  console.log(e);
                }
              }
            },
            class: [ "hoverDefault_lite" ],
            style: {
              position: "absolute",
              bottom: String(buttonBottom) + ea,
              left: String(logOutRight + secondButtonIndent) + ea,
              fontSize: String(buttonSize) + ea,
              fontWeight: String(400),
              fontFamily: "graphik",
              color: colorChip.green,
            }
          },
        ]
      });
      whiteTong = instance.memberBox.contents.children[1];

      for (let member of allMembers) {
        // if (member.id !== instance.member.id) {
          tempDom = createNode({
            mother: whiteTong,
            attribute: {
              memid: member.id,
              toggle: "off",
            },
            style: {
              display: "block",
              position: "relative",
              marginBottom: String(between) + ea,
            },
            children: [
              {
                text: member.name + " " + member.title + "님",
                event: {
                  click: function (e) {
                    const toggle = this.parentElement.getAttribute("toggle");
                    if (toggle === "on") {
                      this.style.color = colorChip.black;
                      this.parentElement.setAttribute("toggle", "off");
                    } else if (toggle === "off") {
                      this.style.color = colorChip.green;
                      this.parentElement.setAttribute("toggle", "on");
                    }
                  }
                },
                class: [ "hoverDefault_lite" ],
                style: {
                  display: "inline-block",
                  fontSize: String(size) + ea,
                  fontWeight: String(400),
                  color: colorChip.black,
                }
              },
              {
                text: member.online ? "online" : "offline",
                style: {
                  position: "absolute",
                  fontSize: String(size) + ea,
                  fontWeight: String(300),
                  color: member.online ? colorChip.green : colorChip.deactive,
                  right: String(0),
                  top: String(0),
                }
              }
            ]
          });
          tong.push(tempDom);
        // }
      }

    } catch (e) {
      console.log(e);
    }
  }
}

GeneralJs.prototype.getWhitePrompt = function (size = "big", callback = function (white, cancelBox) {}) {
  if (typeof size === "object") {
    callback = size;
    size = "big";
  }
  const instance = this;
  let cancelBox;
  let div_clone;
  let style;
  let ea = "px";

  cancelBox = GeneralJs.nodes.div.cloneNode(true);
  cancelBox.classList.add("whitePrompt");
  style = {
    position: "fixed",
    width: "100%",
    height: "100%",
    borderRadius: String(5) + ea,
    top: String(0) + ea,
    left: String(0) + ea,
    background: GeneralJs.colorChip.black,
    opacity: String(0.2),
    zIndex: String(4),
    cursor: "pointer",
  };
  for (let i in style) {
    cancelBox.style[i] = style[i];
  }
  cancelBox.addEventListener("click", function (e) {
    while (document.querySelectorAll(".whitePrompt").length !== 0) {
      document.body.removeChild(document.querySelector(".whitePrompt"));
    }
  });
  document.body.appendChild(cancelBox);

  div_clone = GeneralJs.nodes.div.cloneNode(true);
  div_clone.classList.add("whitePrompt");
  if (size === "big") {
    style = {
      position: "fixed",
      width: "50%",
      height: "50%",
      borderRadius: String(5) + ea,
      top: "calc(25% - 61.5px)",
      left: "25%",
      background: GeneralJs.colorChip.white,
      boxShadow: "0px 4px 13px -8px " + GeneralJs.colorChip.shadow,
      opacity: String(0.95),
      zIndex: String(4),
      animation: "fadeup 0.4s ease forwards",
    };
  } else {
    style = {
      position: "fixed",
      width: "30%",
      height: "30%",
      borderRadius: String(5) + ea,
      top: "calc(35% - 61.5px)",
      left: "35%",
      background: GeneralJs.colorChip.white,
      boxShadow: "0px 4px 13px -8px " + GeneralJs.colorChip.shadow,
      opacity: String(0.95),
      zIndex: String(4),
      animation: "fadeup 0.4s ease forwards",
    };
  }
  for (let i in style) {
    div_clone.style[i] = style[i];
  }
  document.body.appendChild(div_clone);

  callback(div_clone, cancelBox);
}

GeneralJs.prototype.greenAlert = async function (message, blackMode = false) {
  const instance = this;
  try {
    let div_clone, div_clone2;
    let style;
    let ea;
    let margin;
    let wordWidth, width;

    if (GeneralJs.timeouts["greenAlertLevel0_TimeOut"] !== undefined && GeneralJs.timeouts["greenAlertLevel0_TimeOut"] !== null) {
      GeneralJs.stacks["greenAlert_greenBox"].style.animation = "fadedowndelay 0.4s ease forwards";
      await GeneralJs.sleep(401);
      document.body.removeChild(GeneralJs.stacks["greenAlert_greenBox"]);
      clearTimeout(GeneralJs.timeouts["greenAlertLevel1_TimeOut"]);
      clearTimeout(GeneralJs.timeouts["greenAlertLevel0_TimeOut"]);
      GeneralJs.timeouts["greenAlertLevel1_TimeOut"] = null;
      GeneralJs.timeouts["greenAlertLevel0_TimeOut"] = null;
    }

    ea = "px";
    margin = 21;

    div_clone = GeneralJs.nodes.div.cloneNode(true);
    GeneralJs.stacks["greenAlert_greenBox"] = div_clone;
    style = {
      position: "fixed",
      background: blackMode ? GeneralJs.colorChip.darkDarkShadow : GeneralJs.colorChip.gradientGreen,
      borderRadius: String(5) + ea,
      height: String(40) + ea,
      bottom: String((this.belowHeight === undefined ? 0 : this.belowHeight) + 22) + ea,
      boxShadow: "0px 5px 12px -8px " + blackMode ? GeneralJs.colorChip.gray4 : GeneralJs.colorChip.green,
      opacity: String(0),
      width: String(2000) + ea,
      transition: "all 0s ease",
      zIndex: String(400),
    };
    for (let i in style) {
      div_clone.style[i] = style[i];
    }

    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    style = {
      position: "absolute",
      textAlign: "center",
      color: GeneralJs.colorChip.whiteBlack,
      height: String(28) + ea,
      fontSize: String(19) + ea,
      fontWeight: String(300),
      top: String(GeneralJs.isMac() ? 6 : 8) + ea,
    };
    for (let i in style) {
      div_clone2.style[i] = style[i];
    }
    div_clone2.textContent = message;

    div_clone.appendChild(div_clone2);
    document.body.appendChild(div_clone);

    wordWidth = div_clone2.getBoundingClientRect().width;
    width = wordWidth + (margin * 2);

    div_clone.style.width = String(width) + ea;
    div_clone.style.left = "calc(50% - " + String(width / 2) + ea + ")";
    div_clone2.style.width = String(100) + '%';
    div_clone.style.animation = "fadeupdelay 0.5s ease forwards";

    GeneralJs.timeouts["greenAlertLevel0_TimeOut"] = setTimeout(function () {
      div_clone.style.animation = "fadedowndelay 0.4s ease forwards";
      GeneralJs.timeouts["greenAlertLevel1_TimeOut"] = setTimeout(function () {
        div_clone.removeChild(div_clone2);
        document.body.removeChild(div_clone);
        clearTimeout(GeneralJs.timeouts["greenAlertLevel1_TimeOut"]);
        GeneralJs.timeouts["greenAlertLevel1_TimeOut"] = null;
        clearTimeout(GeneralJs.timeouts["greenAlertLevel0_TimeOut"]);
        GeneralJs.timeouts["greenAlertLevel0_TimeOut"] = null;
      }, 410);
    }, 2400);

  } catch (e) {
    GeneralJs.ajax("message=" + (typeof e === "object" ? JSON.stringify(e) : String(e)).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
    console.log(e);
  }
}

GeneralJs.prototype.loginBox = async function () {
  const instance = this;
  try {
    let div_clone;
    let style;
    let ea = "px";
    let googleAuth, client, profile;
    let name, email, id;
    let memberBoo, thisMember;
    let tempObj;
    let loginBox;
    let storage;
    let response;
    let storageCookie;


    storage = window.localStorage.getItem("GoogleClientProfile");
    storageCookie = null;

    if (storage === null) {
      memberBoo = false;
      thisMember = null;
    } else {
      storageCookie = JSON.parse(storage);
      response = await GeneralJs.ajaxJson({
        type: "boo",
        value: storageCookie.homeliaisonConsoleLoginedEmail
      }, "/getMembers");
      if (response.result !== null) {
        memberBoo = true;
        thisMember = response.result;
      } else {
        memberBoo = false;
        thisMember = null;
      }
    }

    loginBox = null;

    if (memberBoo) {

      tempObj = JSON.parse(await GeneralJs.ajaxPromise("type=boo&value=" + storageCookie.homeliaisonConsoleLoginedEmail, "/getMembers"));
      thisMember = tempObj.result;
      this.member = GeneralJs.equalJson(JSON.stringify(thisMember));
      GeneralJs.stacks["homeliaisonMember"] = GeneralJs.equalJson(JSON.stringify(thisMember));

    } else {

      div_clone = GeneralJs.nodes.div.cloneNode(true);
      style = {
        position: "fixed",
        top: String(0),
        left: String(0),
        width: String(100) + '%',
        height: String(100) + '%',
        background: GeneralJs.colorChip.gradientGreen4,
        opacity: String(0),
        zIndex: String(5),
        animation: "justfadeinoriginal 0.2s ease forwards",
      };
      for (let i in style) {
        div_clone.style[i] = style[i];
      }
      document.body.appendChild(div_clone);
      loginBox = div_clone;

      if (GeneralJs.stacks["GoogleAuth"] !== undefined && GeneralJs.stacks["GoogleAuth"] !== null) {
        googleAuth = GeneralJs.stacks["GoogleAuth"];
      } else {
        googleAuth = await GeneralJs.googleLogInInit();
      }

      client = await googleAuth.signIn();
      profile = client.getBasicProfile();

      name = profile.getName();
      email = profile.getEmail();
      id = profile.getId();

      GeneralJs.stacks["GoogleClient"] = client;
      GeneralJs.stacks["GoogleClientProfile"] = {
        homeliaisonConsoleLoginedName: name,
        homeliaisonConsoleLoginedEmail: email,
        homeliaisonConsoleLoginedBoolean: true
      };

      window.localStorage.setItem("GoogleClientProfile", JSON.stringify(GeneralJs.stacks["GoogleClientProfile"]));

      tempObj = JSON.parse(await GeneralJs.ajaxPromise("type=boo&value=" + email, "/getMembers"));
      if (tempObj.result !== null) {
        thisMember = tempObj.result;
        this.member = GeneralJs.equalJson(JSON.stringify(thisMember));
        GeneralJs.stacks["homeliaisonMember"] = GeneralJs.equalJson(JSON.stringify(thisMember));
        loginBox.style.animation = "justfadeoutoriginal 0.2s ease forwards";
        GeneralJs.timeouts["login"] = setTimeout(() => {
          document.body.removeChild(loginBox);
          clearTimeout(GeneralJs.timeouts["login"]);
          GeneralJs.timeouts["login"] = null;
        }, 201);
      } else {
        window.alert("허가된 멤버가 아닙니다.");
        window.location.href = FRONTHOST;
      }
    }

  } catch (e) {
    console.log(e);
  }
}

GeneralJs.prototype.makeCalendar = function (date, callback, option = {}) {
  const instance = this;
  const thisMatrix = GeneralJs.getDateMatrix(date);
  this.dateMatrix = thisMatrix;
  let thisDate;
  if (typeof date === "string") {
    if (date.length === 10) {
      thisDate = Number(((date.split("-"))[2]).replace(/^0/, ''));
    } else {
      thisDate = Number((((date.split(" ")[0]).split("-"))[2]).replace(/^0/, ''));
    }
  } else if (typeof date === "object") {
    thisDate = date.getDate();
  }
  const CalendarMatrix = function (matrix) {
    this.calendarBase = null;
    this.titleZone = null;
    this.contentsZone = null;
    this.matrix = matrix;
    this.calendarHeight = 0;
  }
  CalendarMatrix.prototype.setHeight = function (calendarHeight) {
    this.calendarHeight = calendarHeight;
  }
  CalendarMatrix.prototype.setDoms = function (calendarBase, titleZone, contentsZone) {
    this.calendarBase = calendarBase;
    this.titleZone = titleZone;
    this.contentsZone = contentsZone;
  }
  const { year, month, matrix } = this.dateMatrix;
  let width, height;
  let calendarBase, titleZone, contentsZone;
  let div_clone, div_clone2, svg_clone, svg_zone;
  let style;
  let titleZoneStyle, contentsZoneStyle;
  let ea;
  let titleHeight;
  let arrowWidth;
  let arrowBottom;
  let arrowLeft;
  let arrowZoneWidth;
  let arrowZoneBottom;
  let arrowZoneLeft;
  let leftMargin;
  let finalHeight0, finalHeight1, finalHeight2;
  let resultObj;
  let mobile, desktop;
  let motherRatio, ratio;
  let titleBottom;
  let contentsMarginTop;

  mobile = (option.mobile === true);
  desktop = !mobile;
  ea = desktop ? "px" : "vw";
  ratio = 0.38;

  width = 260;
  height = 280;
  motherRatio = (num) => { return (num / 260); };
  if (typeof option.width === "number") {
    width = option.width;
    height = width * motherRatio(height);
  }
  if (option.scaleUp !== undefined) {
    width = width * option.scaleUp;
    height = height * option.scaleUp;
  }

  resultObj = new CalendarMatrix(this.dateMatrix);
  if (option.bigMode === true) {
    titleHeight = desktop ? 48 : 8;
  } else {
    titleHeight = height * 0.2;
  }
  finalHeight0 = titleHeight;
  finalHeight2 = finalHeight0 * ratio;
  if (option.titleBottom !== undefined) {
    titleBottom = width * motherRatio(option.titleBottom);
  } else {
    titleBottom = width * motherRatio(desktop ? 9 : 9);
  }

  arrowWidth = width * motherRatio(9);
  if (option.arrow !== undefined) {
    if (option.arrow.width !== undefined) {
      arrowWidth = width * motherRatio(option.arrow.width);
    }
  }
  if (option.bigMode === true) {
    arrowWidth = desktop ? 11 : 2;
  }
  if (option.bigMode === true) {
    arrowBottom = desktop ? 24.5 : 3.6;
  } else {
    arrowBottom = width * motherRatio(desktop ? 17 : 16);
  }
  if (option.bigMode === true) {
    arrowLeft = (desktop ? 1 : 0.2);
  } else {
    arrowLeft = width * motherRatio(desktop ? 23 : 24);
  }
  arrowZoneWidth = arrowWidth + (width * motherRatio(desktop ? 15 : 6));
  if (option.bigMode === true) {
    arrowZoneBottom = desktop ? 16.5 : 2.6;
  } else {
    arrowZoneBottom = width * motherRatio(desktop ? 9 : 13);
  }
  if (option.bigMode === true) {
    arrowZoneLeft = (desktop ? 1 : 0.2);
  } else {
    arrowZoneLeft = width * motherRatio(desktop ? 16 : 22);
  }

  if (option.margin !== undefined) {
    contentsMarginTop = option.margin;
  } else {
    contentsMarginTop = desktop ? 6 : 1.2;
  }
  if (option.bigMode === true) {
    contentsMarginTop = 0;
  }

  //matrix make function
  const matrixMaker = function (mother, year, month, matrix, thisDate, width, height, titleHeight) {
    const dateToString = function (year, month, date) {
      let str = '';
      str += String(year);
      str += '-';
      str += ((month < 9) ? '0' + String(month + 1) : String(month + 1));
      str += '-';
      str += ((date < 10) ? '0' + String(date) : String(date));
      return str;
    }
    let div_clone, div_clone2, div_clone3;
    let svg_clone;
    let style;
    let ea;
    let leftMargin;
    let indexNumber;
    let lineHeight;
    let matrixField;
    let eventStyle, circleEventStyle;
    let eventInitTop, eventLeft;
    let circleEventInitTop, circleEventLeft;
    let mobile, desktop;
    let headHeight;
    let childrenDoms;
    let childrenDomsEmpty;
    let setDateEvents;

    mobile = (option.mobile === true);
    desktop = !mobile;

    ea = desktop ? "px" : "vw";
    leftMargin = desktop ? 12 : 3;
    lineHeight = 20;

    indexNumber = 0;
    circleEventInitTop = 38.5;
    circleEventLeft = 13;
    eventInitTop = 32.5;
    eventLeft = 20;

    headHeight = desktop ? 36 : 7;

    circleEventStyle = {
      position: "absolute",
      transformOrigin: "0 0",
      transform: "scale(0.3)",
      top: String(circleEventInitTop + (lineHeight * indexNumber)) + ea,
      left: String(circleEventLeft) + ea,
    };

    eventStyle = {
      position: "absolute",
      fontSize: String(desktop ? 12 : 2) + ea,
      fontWeight: String(400),
      textAlign: "left",
      color: GeneralJs.colorChip.black,
      cursor: "pointer",
      top: String(eventInitTop + (lineHeight * indexNumber)) + ea,
      left: String(eventLeft) + ea,
    };

    setDateEvents = function (eventArr, hourOutput = true) {
      const year = Number(this.getAttribute("year"));
      const month = Number(this.getAttribute("month"));
      const thisDate = Number(this.getAttribute("date"));
      const that = this;
      let svg_clone;
      let div_clone3;
      let indexNumber;
      let ea = "px";
      let date, title, eventFunc;

      eventArr.sort((a, b) => {
        return a.date.valueOf() - b.date.valueOf();
      });

      if (this.indexNumber !== undefined) {
        indexNumber = this.indexNumber;
      } else {
        indexNumber = 0;
      }

      if (this.getAttribute("date") !== null) {
        for (let obj of eventArr) {

          date = obj.date;
          title = obj.title;
          eventFunc = obj.eventFunc;

          if (date.getFullYear() === year && date.getMonth() === month && date.getDate() === thisDate) {
            svg_clone = SvgTong.stringParsing(instance.returnCircle("", GeneralJs.colorChip.green));
            for (let k in circleEventStyle) {
              svg_clone.style[k] = circleEventStyle[k];
            }
            svg_clone.style.top = String(circleEventInitTop + (lineHeight * indexNumber)) + ea;
            this.appendChild(svg_clone);

            div_clone3 = GeneralJs.nodes.div.cloneNode(true);
            div_clone3.classList.add("hoverDefault_lite");
            for (let k in eventStyle) {
              div_clone3.style[k] = eventStyle[k];
            }
            div_clone3.style.top = String(eventInitTop + (lineHeight * indexNumber)) + ea;
            if (hourOutput) {
              if (obj.hours !== undefined) {
                div_clone3.textContent = title;
              } else {
                div_clone3.textContent = String(date.getHours()) + '시' + " : " + title;
              }
            } else {
              div_clone3.textContent = title;
            }
            div_clone3.addEventListener("click", function (e) {
              e.stopPropagation();
              eventFunc.call(this, e);
            });
            div_clone3.addEventListener("contextmenu", function (e) {
              e.stopPropagation();
              e.preventDefault();
              this.parentNode.removeChild(this.previousElementSibling);
              this.parentNode.removeChild(this);
              that.indexNumber = that.indexNumber - 1;
            });
            this.appendChild(div_clone3);

            indexNumber++;
          }
        }
        this.indexNumber = indexNumber;
      }
    };

    for (let i = 0; i < matrix.length + 1; i++) {
      div_clone = GeneralJs.nodes.div.cloneNode(true);
      style = {
        position: "relative",
        height: ((option.bigMode !== true) ? String(height / 9) + ea : "calc(calc(100% - " + String(headHeight) + ea + ") / " + String(matrix.length) + ")"),
        background: GeneralJs.colorChip.white,
        width: "calc(100% - " + String(leftMargin * 2) + ea + ")",
        left: String(leftMargin * 1) + ea,
      };
      if (option.bigMode === true) {
        style.width = String(100) + '%';
        style.left = String(0) + ea;
      }
      for (let j in style) {
        div_clone.style[j] = style[j];
      }
      if (option.bigMode === true && i === 0) {
        div_clone.style.height = String(headHeight) + ea;
      }

      for (let j = 0; j < 7; j++) {
        div_clone2 = GeneralJs.nodes.div.cloneNode(true);
        div_clone2.setAttribute("year", String(year));
        div_clone2.setAttribute("month", String(month));
        style = {
          display: "inline-block",
          position: "relative",
          width: "calc(100% / 7)",
          height: ((option.bigMode !== true) ? String(height / 8) + ea : String(100) + '%'),
          background: GeneralJs.colorChip.white,
          cursor: "pointer",
          overflow: "scroll",
          borderBottom: ((option.bigMode !== true) ? String(0) : "1px solid " + GeneralJs.colorChip.gray3),
          borderRight: ((option.bigMode !== true) ? String(0) : "1px solid " + GeneralJs.colorChip.gray3),
          boxSizing: ((option.bigMode !== true) ? "initial" : "border-box"),
          transition: "all 0.2s ease",
        };
        for (let k in style) {
          div_clone2.style[k] = style[k];
        }

        if (option.bigMode === true && i === 0) {
          div_clone2.style.background = GeneralJs.colorChip.gray0;
          div_clone2.style.borderTop = "1px solid " + GeneralJs.colorChip.gray3;
          if (j === 0) {
            div_clone2.style.borderTopLeftRadius = String(5) + "px";
          } else if (j === 6) {
            div_clone2.style.borderTopRightRadius = String(5) + "px";
          }
        }

        if (option.bigMode === true && j === 0) {
          div_clone2.style.borderLeft = "1px solid " + GeneralJs.colorChip.gray3;
        }

        if (option.bigMode === true && i === matrix.length) {
          if (j === 0) {
            div_clone2.style.borderBottomLeftRadius = String(5) + "px";
          } else if (j === 6) {
            div_clone2.style.borderBottomRightRadius = String(5) + "px";
          }
        }

        if (i !== 0 && matrix[i - 1][j] !== null) {
          div_clone2.setAttribute("date", String(matrix[i - 1][j].date));
          div_clone2.setAttribute("buttonValue", dateToString(year, month, matrix[i - 1][j].date));
          div_clone2.setAttribute("dateEventMethod", "true");
          div_clone2.addEventListener("click", callback);
        }

        div_clone3 = GeneralJs.nodes.div.cloneNode(true);
        style = {
          position: "absolute",
          fontFamily: "graphik",
          fontSize: String(titleHeight * 0.25 * ((option.factorFont !== undefined) ? option.factorFont : 1)) + ea,
          fontWeight: ((i === 0) ? String(500) : String(option.bigMode === true ? 300 : 200)),
          width: "100%",
          textAlign: ((option.bigMode !== true) ? "center" : "left"),
          color: ((j < 5) ? GeneralJs.colorChip.black : GeneralJs.colorChip.green),
          cursor: "pointer",
          transition: "all 0.2s ease",
        };
        for (let k in style) {
          div_clone3.style[k] = style[k];
        }

        if (i === 0) {
          div_clone3.textContent = ([ 'M', 'T', 'W', 'T', 'F', 'S', 'S' ])[j];
          if (option.bigMode === true) {
            div_clone3.style.textAlign = "center";
            div_clone3.style.fontSize = String(desktop ? 14 : 3) + ea;
            div_clone3.style.top = desktop ? String(5.5) + ea : "calc(50% - 2.5vw)";
          }
        } else {
          div_clone3.textContent = (matrix[i - 1][j] !== null) ? String(matrix[i - 1][j].date) : '';
          if (option.bigMode === true) {
            div_clone3.style.fontSize = String(desktop ? 15 : 3) + ea;
            div_clone3.style.top = desktop ? String(5) + ea : "calc(50% - 2.5vw)";
            if (desktop) {
              div_clone3.style.textIndent = String(12) + "px";
            } else {
              div_clone3.style.textAlign = "center";
            }
          }
          if (matrix[i - 1][j] !== null) {
            if (thisDate === matrix[i - 1][j].date) {
              div_clone3.style.color = GeneralJs.colorChip.green;
              div_clone3.style.fontWeight = String(400);
            }
          }
        }
        div_clone2.appendChild(div_clone3);

        if (option.events !== undefined) {
          if (i !== 0) {
            if (matrix[i - 1][j] !== null) {
              setDateEvents.call(div_clone2, option.events);
            }
          }
        }

        div_clone.appendChild(div_clone2);
      }

      mother.appendChild(div_clone);
    }

    if (option.bigMode === true && typeof option.grayMode === "function") {
      childrenDoms = Array.from(mother.children);
      childrenDoms.shift();
      childrenDoms = childrenDoms.map((dom) => {
        return Array.from(dom.children);
      });
      childrenDoms = childrenDoms.flat();
      childrenDoms = childrenDoms.filter((dom) => {
        return dom.hasAttribute("date");
      })

      option.grayMode(year, month + 1).then((booArr) => {
        childrenDoms = Array.from(mother.children);
        childrenDoms.shift();
        childrenDoms = childrenDoms.map((dom) => {
          return Array.from(dom.children);
        });
        childrenDoms = childrenDoms.flat();
        childrenDomsEmpty = childrenDoms.filter((dom) => {
          return !dom.hasAttribute("date");
        });
        childrenDoms = childrenDoms.filter((dom) => {
          return dom.hasAttribute("date");
        });

        if (booArr.length !== childrenDoms.length) {
          throw new Error("invaild boolean array");
        }

        for (let i = 0; i < booArr.length; i++) {
          childrenDoms[i].setAttribute("color", childrenDoms[i].firstChild.style.color);
          if (!booArr[i]) {
            childrenDoms[i].setAttribute("deactive", "true");
            childrenDoms[i].style.background = GeneralJs.colorChip.gray0;
            childrenDoms[i].firstChild.style.color = GeneralJs.colorChip.deactive;
          } else {
            childrenDoms[i].setAttribute("deactive", "false");
          }
        }

        for (let dom of childrenDomsEmpty) {
          dom.style.background = GeneralJs.colorChip.gray0;
        }

      }).catch((err) => {
        console.log(err);
      });

    }
  }

  //base maker
  calendarBase = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "relative",
    top: String(0) + ea,
    left: String(option.left !== undefined ? option.left : 0) + ea,
    width: ((option.bigMode !== true) ? String(width) + ea : option.width),
    height: ((option.bigMode !== true) ? String(height) + ea : option.height),
  };
  for (let i in style) {
    calendarBase.style[i] = style[i];
  }

  //style
  titleZoneStyle = {
    position: "relative",
    height: String(titleHeight) + ea,
  };
  contentsZoneStyle = {
    position: "relative",
    height: "calc(100% - " + String(titleHeight) + ea + ")",
    marginTop: String(contentsMarginTop) + ea,
  };

  //title zone -------------------------------------------------------------- start
  titleZone = GeneralJs.nodes.div.cloneNode(true);
  for (let i in titleZoneStyle) {
    titleZone.style[i] = titleZoneStyle[i];
  }

  //year month number
  div_clone = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "absolute",
    height: String(titleHeight / 2) + ea,
    fontFamily: "graphik",
    fontSize: String(titleHeight * ratio * ((option.title !== undefined) ? option.title : 1)) + ea,
    fontWeight: String(300),
    bottom: String(titleBottom) + ea,
    width: "100%",
    textAlign: "center",
  };
  for (let i in style) {
    div_clone.style[i] = style[i];
  }

  if (option.bigMode === true) {
    div_clone.style.bottom = "";
    div_clone.style.top = String(desktop ? -6 : 0) + ea;
    div_clone.style.fontSize = String(desktop ? 29 : 4.2) + ea;
  }

  div_clone.textContent = String(year) + '.' + ((month < 9) ? '0' + String(month + 1) : String(month + 1));
  titleZone.appendChild(div_clone);

  //previous arrow
  svg_clone = SvgTong.stringParsing(this.returnArrow("left", GeneralJs.colorChip.green));
  style = {
    position: "absolute",
    width: String(arrowWidth) + ea,
    height: String(arrowWidth * SvgTong.getRatio(svg_clone)) + ea,
    bottom: String(arrowBottom) + ea,
    left: String(arrowLeft) + ea,
  };
  if (option.arrow !== undefined) {
    if (option.arrow.bottom !== undefined) {
      style.bottom = option.arrow.bottom;
    }
    if (option.arrow.left !== undefined) {
      style.left = option.arrow.left;
    }
  }
  for (let i in style) {
    svg_clone.style[i] = style[i];
  }
  titleZone.appendChild(svg_clone);

  svg_zone = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "absolute",
    width: String(arrowZoneWidth) + ea,
    height: String(arrowZoneWidth) + ea,
    bottom: String(arrowZoneBottom) + ea,
    left: String(arrowZoneLeft) + ea,
    cursor: "pointer",
  };
  for (let i in style) {
    svg_zone.style[i] = style[i];
  }
  svg_zone.addEventListener("click", function (e) {
    const whiteBox = calendarBase.parentNode;
    instance.dateMatrix = instance.dateMatrix.previousMatrix();
    const { year, month, matrix } = instance.dateMatrix;
    titleZone.firstChild.textContent = String(year) + '.' + ((month < 9) ? '0' + String(month + 1) : String(month + 1));
    calendarBase.removeChild(contentsZone);

    contentsZone = GeneralJs.nodes.div.cloneNode(true);
    for (let i in contentsZoneStyle) {
      contentsZone.style[i] = contentsZoneStyle[i];
    }
    matrixMaker(contentsZone, year, month, matrix, null, width, height, titleHeight);
    finalHeight1 = (height / 9) * (matrix.length + 1);
    contentsZone.style.height = String(finalHeight1) + ea;
    calendarBase.appendChild(contentsZone);
    calendarBase.style.height = String(finalHeight0 + finalHeight1 + finalHeight2) + ea;

    resultObj.contentsZone = contentsZone;
    resultObj.calendarHeight = finalHeight0 + finalHeight1 + finalHeight2;
    resultObj.matrix = instance.dateMatrix;

    whiteBox.style.height = String(finalHeight0 + finalHeight1 + finalHeight2) + ea;
  });
  titleZone.appendChild(svg_zone);

  //next arrow
  svg_clone = SvgTong.stringParsing(this.returnArrow("right", GeneralJs.colorChip.green));
  style = {
    position: "absolute",
    width: String(arrowWidth) + ea,
    height: String(arrowWidth * SvgTong.getRatio(svg_clone)) + ea,
    bottom: String(arrowBottom) + ea,
    right: String(arrowLeft) + ea,
  };
  if (option.arrow !== undefined) {
    if (option.arrow.bottom !== undefined) {
      style.bottom = option.arrow.bottom;
    }
    if (option.arrow.left !== undefined) {
      style.right = option.arrow.left;
    }
  }
  for (let i in style) {
    svg_clone.style[i] = style[i];
  }
  titleZone.appendChild(svg_clone);

  svg_zone = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "absolute",
    width: String(arrowZoneWidth) + ea,
    height: String(arrowZoneWidth) + ea,
    bottom: String(arrowZoneBottom) + ea,
    right: String(arrowZoneLeft) + ea,
    cursor: "pointer",
  };
  for (let i in style) {
    svg_zone.style[i] = style[i];
  }
  svg_zone.addEventListener("click", function (e) {
    const whiteBox = calendarBase.parentNode;
    instance.dateMatrix = instance.dateMatrix.nextMatrix();
    const { year, month, matrix } = instance.dateMatrix;
    titleZone.firstChild.textContent = String(year) + '.' + ((month < 9) ? '0' + String(month + 1) : String(month + 1));
    calendarBase.removeChild(contentsZone);
    contentsZone = GeneralJs.nodes.div.cloneNode(true);
    for (let i in contentsZoneStyle) {
      contentsZone.style[i] = contentsZoneStyle[i];
    }
    matrixMaker(contentsZone, year, month, matrix, null, width, height, titleHeight);
    finalHeight1 = (height / 9) * (matrix.length + 1);
    contentsZone.style.height = String(finalHeight1) + ea;
    calendarBase.appendChild(contentsZone);
    calendarBase.style.height = String(finalHeight0 + finalHeight1 + finalHeight2) + ea;

    resultObj.contentsZone = contentsZone;
    resultObj.calendarHeight = finalHeight0 + finalHeight1 + finalHeight2;
    resultObj.matrix = instance.dateMatrix;

    whiteBox.style.height = String(finalHeight0 + finalHeight1 + finalHeight2) + ea;
  });
  titleZone.appendChild(svg_zone);

  calendarBase.appendChild(titleZone);
  //title zone -------------------------------------------------------------- end

  //contents zone ----------------------------------------------------------- start
  contentsZone = GeneralJs.nodes.div.cloneNode(true);
  for (let i in contentsZoneStyle) {
    contentsZone.style[i] = contentsZoneStyle[i];
  }

  matrixMaker(contentsZone, year, month, matrix, thisDate, width, height, titleHeight);
  if (option.bigMode !== true) {
    finalHeight1 = (height / 9) * (matrix.length + 1);
    contentsZone.style.height = String(finalHeight1) + ea;
  }
  calendarBase.appendChild(contentsZone);
  //contents zone -------------------------------------------------------------- end

  if (option.bigMode !== true) {
    calendarBase.style.height = String(finalHeight0 + finalHeight1 + finalHeight2) + ea;
  }
  resultObj.setHeight(finalHeight0 + finalHeight1 + finalHeight2);
  resultObj.setDoms(calendarBase, titleZone, contentsZone);

  return resultObj;
}

GeneralJs.prototype.makeTable = function (matrix, option = {}) {
  const instance = this;
  const { createNode, colorChip, withOut, equalJson, isMac } = GeneralJs;
  if (!Array.isArray(matrix)) {
    throw new Error("input must be matrix");
  }
  if (!matrix.every((arr) => { return Array.isArray(arr); })) {
    throw new Error("input must be matrix");
  }
  if (typeof option !== "object") {
    throw new Error("invaild option");
  }
  if (typeof option.style !== "object") {
    option.style = {};
  }
  const heightVisualRatio = 1 / 4;
  let columns;
  let columnsLength;
  let dataLength;
  let totalLength;
  let table, mother;
  let ea;
  let blockWidth, blockHeight;
  let size, titleSize;
  let rows, all, rowBlock, eachBlock;
  let domMatrix;
  let tempArr;
  let innerMargin, innerMarginLeft, innerMarginTitleLeft;
  let innerMarginVisual;
  let borderWeight;
  let textTop;
  let mergeMap;
  let titleMap;
  let widthRatio;
  let num, num2, num3, num4;
  let index;
  let pastArr;
  let titleBackground, titleColor;
  let generalBackground, generalColor;
  let borderColor;
  let callbackMap;
  let temp;
  let boldMap;
  let boldWeight, generalWeight;
  let boldBackground;
  let whiteMode;
  let whiteModePaddingTop, whiteModePaddingBottom;
  let whiteModeDoubleLineMargin;
  let doubleLineMode;

  [ columns ] = matrix;
  columnsLength = columns.length;
  dataLength = matrix.length - 1;
  totalLength = dataLength + 1;

  mergeMap = [];
  for (let i = 0; i < totalLength; i++) {
    temp = [];
    for (let j = 0; j < columnsLength; j++) {
      temp.push(null);
    }
    mergeMap.push(temp);
  }
  if (Array.isArray(option.mergeMap)) {
    mergeMap = option.mergeMap;
  }

  titleMap = [];
  for (let i = 0; i < totalLength; i++) {
    if (i === 0) {
      titleMap.push(1);
    } else {
      titleMap.push(0);
    }
  }
  if (Array.isArray(option.titleMap)) {
    titleMap = option.titleMap;
  }

  callbackMap = [];
  for (let i = 0; i < totalLength; i++) {
    temp = [];
    for (let j = 0; j < columnsLength; j++) {
      temp.push((e) => {});
    }
    callbackMap.push(temp);
  }
  if (Array.isArray(option.callbackMap)) {
    callbackMap = option.callbackMap;
  }
  callbackMap = callbackMap.map((arr) => {
    return arr.map((a) => {
      if (typeof a !== "function") {
        return (e) => {};
      } else {
        return a;
      }
    });
  });

  boldMap = [];
  for (let i = 0; i < totalLength; i++) {
    temp = [];
    for (let j = 0; j < columnsLength; j++) {
      temp.push(0);
    }
    boldMap.push(temp);
  }
  if (Array.isArray(option.boldMap)) {
    boldMap = option.boldMap;
  }

  widthRatio = (new Array(columnsLength)).fill(1, 0);
  if (Array.isArray(option.widthRatio)) {
    widthRatio = option.widthRatio;
  }
  if (widthRatio.length !== columnsLength) {
    throw new Error("invaild width ratio 1");
  }
  if (!widthRatio.every((i) => { return typeof i === "number"; })) {
    throw new Error("invaild width ratio 2");
  }
  if (!widthRatio.every((i) => { return i === 1; })) {

    widthRatio = widthRatio.map((i) => { return i - 1; });

    for (let arr of matrix) {
      num = 0;
      for (let i of widthRatio) {
        for (let j = 0; j < i; j++) {
          arr.splice(num + 1, 0, arr[num]);
        }
        num += (i + 1);
      }
    }

    for (let arr of callbackMap) {
      num = 0;
      for (let i of widthRatio) {
        for (let j = 0; j < i; j++) {
          arr.splice(num + 1, 0, arr[num]);
        }
        num += (i + 1);
      }
    }

    for (let arr of boldMap) {
      num = 0;
      for (let i of widthRatio) {
        for (let j = 0; j < i; j++) {
          arr.splice(num + 1, 0, arr[num]);
        }
        num += (i + 1);
      }
    }

    index = 0;
    for (let arr of mergeMap) {
      num = 0;
      pastArr = equalJson(JSON.stringify(arr));

      for (let i of widthRatio) {
        for (let j = 0; j < i; j++) {
          if (arr[num] === null) {
            arr.splice(num + 1, 0, null);
          } else {
            arr.splice(num + 1, 0, equalJson(JSON.stringify(arr[num])));
          }
        }
        num += (i + 1);
      }

      for (let i = 0; i < pastArr.length; i++) {
        if (Array.isArray(pastArr[i])) {
          if (pastArr[i][0] === index) {
            num2 = 0;
            for (let j = 0; j < i; j++) {
              num2 += widthRatio[j];
            }
            num3 = 0;
            for (let j = 0; j < i - 1; j++) {
              num3 += widthRatio[j];
            }
            for (let j = 0; j < widthRatio[i]; j++) {
              arr[i + num2 + j] = null;
            }
            arr[i + num2 + widthRatio[i]][1] = i - 1 + num3;
          }
        }
        num4 = 0;
        for (let j = 0; j < i; j++) {
          num4 += widthRatio[j];
        }
        if (arr[i + num4 + widthRatio[i]] === null) {
          arr[i + num4 + widthRatio[i]] = [ index, i + num4 ];
        }
      }

      for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
          if (arr[i][0] !== index) {
            arr[i][1] = i;
          }
        }
      }

      index++;
    }

    [ columns ] = matrix;
    columnsLength = columns.length;
    dataLength = matrix.length - 1;
    totalLength = dataLength + 1;
  }

  if (columnsLength === 0 || totalLength === 0 || dataLength === 0) {
    throw new Error("invaild matrix");
  }
  if (totalLength !== mergeMap.length || !mergeMap.every((arr) => { return Array.isArray(arr); })) {
    throw new Error("invaild merge map");
  }
  if (!mergeMap.every((arr) => { return arr.length === columnsLength; })) {
    throw new Error("invaild merge map");
  }
  if (!mergeMap.every((arr) => { return arr.every((i) => { return (i === null || Array.isArray(i)); }); })) {
    throw new Error("invaild merge map");
  }
  if (totalLength !== titleMap.length || !titleMap.every((i) => { return (i === 1 || i === 0); })) {
    throw new Error("invaild title map");
  }
  if (totalLength !== callbackMap.length || !callbackMap.every((arr) => { return Array.isArray(arr); })) {
    throw new Error("invaild callback map");
  }
  if (!callbackMap.every((arr) => { return arr.length === columnsLength; })) {
    throw new Error("invaild callback map");
  }
  if (!callbackMap.every((arr) => { return arr.every((i) => { return typeof i === "function"; }); })) {
    throw new Error("invaild callback map");
  }
  if (totalLength !== boldMap.length || !boldMap.every((arr) => { return Array.isArray(arr); })) {
    throw new Error("invaild bold map");
  }
  if (!boldMap.every((arr) => { return arr.length === columnsLength; })) {
    throw new Error("invaild bold map");
  }
  if (!boldMap.every((arr) => { return arr.every((i) => { return (i === 1 || i === 0); }); })) {
    throw new Error("invaild bold map");
  }

  whiteMode = false;
  if (option.whiteMode === true) {
    whiteMode = true;
  }
  doubleLineMode = false;
  if (option.doubleLineMode === true) {
    doubleLineMode = true;
  }

  ea = <%% "px", "px", "px", "px", "vw" %%>;

  blockWidth = <%% 120, 120, 120, 120, 14 %%>;
  if (typeof option.style.width === "number") {
    blockWidth = option.style.width;
  }
  if (typeof option.style.blockWidth === "number") {
    blockWidth = option.style.blockWidth;
  }
  if (typeof option.style.totalWidth === "number") {
    blockWidth = option.style.totalWidth / columnsLength;
  }

  blockHeight = <%% 52, 52, 52, 52, 11.3 %%>;
  if (typeof option.style.height === "number") {
    blockHeight = option.style.height;
  }
  if (typeof option.style.blockHeight === "number") {
    blockHeight = option.style.blockHeight;
  }
  if (typeof option.style.totalHeight === "number") {
    blockWidth = option.style.totalHeight / totalLength;
  }

  borderWeight = <%% 1, 1, 1, 1, 1 %%>;

  size = <%% 15, 14, 13, 12, 2.6 %%>;
  if (typeof option.style.size === "number") {
    size = option.style.size;
  }
  if (typeof option.style.fontSize === "number") {
    size = option.style.fontSize;
  }

  titleSize = <%% 15, 14, 13, 11, 3.1 %%>;
  if (typeof option.style.titleSize === "number") {
    titleSize = option.style.titleSize;
  }

  innerMargin = <%% 8, 8, 7, 6, 2 %%>;
  innerMarginVisual = <%% (isMac() ? 0 : 1), (isMac() ? 0 : 1), (isMac() ? 0 : 1), (isMac() ? 0 : 1), 0 %%>;
  if (typeof option.style.innerMargin === "number") {
    innerMargin = option.style.innerMargin;
  }

  if (whiteMode) {
    innerMarginLeft = <%% 35, 18, 14, 6, 2 %%>;
  } else {
    innerMarginLeft = <%% 15, 10, 10, 6, 3 %%>;
  }
  if (typeof option.style.innerMarginLeft === "number") {
    innerMarginLeft = option.style.innerMarginLeft;
  }

  innerMarginTitleLeft = <%% 15, 10, 10, 6, 2 %%>;
  if (typeof option.style.innerMarginTitleLeft === "number") {
    innerMarginTitleLeft = option.style.innerMarginTitleLeft;
  }

  textTop = <%% (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), -0.2 %%>;
  if (typeof option.style.textTop === "number") {
    textTop = option.style.textTop;
  }

  titleBackground = "darkDarkShadow";
  if (typeof option.style.titleBackground === "string") {
    titleBackground = option.style.titleBackground;
  }

  titleColor = "whiteBlack";
  if (typeof option.style.titleColor === "string") {
    titleBackground = option.style.titleColor;
  }

  generalBackground = "white";
  if (typeof option.style.generalBackground === "string") {
    titleBackground = option.style.generalBackground;
  }

  generalColor = "black";
  if (typeof option.style.generalColor === "string") {
    titleBackground = option.style.generalColor;
  }

  borderColor = whiteMode ? "gray2" : "gray3";
  if (typeof option.style.borderColor === "string") {
    titleBackground = option.style.borderColor;
  }

  boldWeight = 700;
  if (typeof option.style.boldWeight === "number") {
    boldWeight = option.style.boldWeight;
  }

  generalWeight = 400;
  if (typeof option.style.generalWeight === "number") {
    generalWeight = option.style.generalWeight;
  }

  boldBackground = "gray0";
  if (typeof option.style.boldBackground === "string") {
    boldBackground = option.style.boldBackground;
  }

  whiteModePaddingTop = <%% (isMac() ? 2 : 0), (isMac() ? 2 : 0), (isMac() ? 2 : 0), (isMac() ? 1 : 0), 0 %%>;
  whiteModePaddingBottom =  <%% (isMac() ? 7 : 5), (isMac() ? 7 : 5), (isMac() ? 6 : 4), (isMac() ? 4 : 2), 1 %%>;
  whiteModeDoubleLineMargin = 2;

  mother = document.createDocumentFragment();
  if (!whiteMode) {
    table = createNode({
      mother,
      style: {
        position: "relative",
        display: "block",
        width: String(blockWidth * columnsLength) + ea,
        overflow: "hidden",
        border: String(borderWeight) + "px solid " + colorChip[borderColor],
        boxSizing: "border-box",
        borderRadius: String(5) + "px",
      }
    });
  } else {
    table = createNode({
      mother,
      style: {
        position: "relative",
        display: "block",
        width: String(blockWidth * columnsLength) + ea,
        overflow: "hidden",
        borderTop: String(borderWeight) + "px solid " + colorChip.shadow,
        borderBottom: String(borderWeight) + "px solid " + colorChip.shadow,
        boxSizing: "border-box",
        borderRadius: String(0) + "px",
        paddingTop: String(whiteModePaddingTop) + ea,
        paddingBottom: String(whiteModePaddingBottom) + ea,
      }
    });
  }

  rows = [];
  all = [];
  domMatrix = [];
  for (let i = 0; i < totalLength; i++) {
    rowBlock = createNode({
      mother: table,
      style: {
        position: "relative",
        display: "block",
        width: String(100) + '%',
        height: String(blockHeight) + ea,
        borderTop: String(borderWeight) + "px solid " + colorChip[borderColor],
        boxSizing: "border-box",
        overflow: "visible",
        background: !whiteMode ? colorChip[titleMap[i] === 1 ? titleBackground : (boldMap[i][0] === 1 ? boldBackground : generalBackground)] : colorChip.white,
      }
    });
    if (i === 0) {
      rowBlock.style.borderTop = "";
    }

    tempArr = [];
    for (let j = 0; j < columnsLength; j++) {
      eachBlock = createNode({
        mother: rowBlock,
        events: [
          {
            type: "click",
            event: callbackMap[i][j],
          }
        ],
        style: {
          position: "relative",
          display: "inline-block",
          width: "calc(100% / " + String(columnsLength) + ")",
          height: String(blockHeight) + ea,
          borderRight: !whiteMode ? String(borderWeight) + "px solid " + colorChip[borderColor] : "",
          boxSizing: "border-box",
          overflow: "hidden",
          background: !whiteMode ? colorChip[titleMap[i] === 1 ? titleBackground : (boldMap[i][j] === 1 ? boldBackground : generalBackground)] : colorChip.white,
          verticalAlign: "top",
        },
        children: [
          {
            style: {
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginTop: String(innerMargin - innerMarginVisual) + ea,
              marginLeft: String(titleMap[i] === 1 ? innerMarginTitleLeft : (boldMap[i][j] === 1 ? innerMarginTitleLeft : innerMarginLeft)) + ea,
              width: (titleMap[i] === 1 ? withOut(innerMarginTitleLeft * 2, ea) : (boldMap[i][j] === 1 ? withOut(innerMarginTitleLeft * 2, ea) : withOut(innerMarginLeft * 2, ea))),
              height: withOut(innerMargin * 2, ea),
              overflow: "scroll",
            },
            children: [
              {
                text: String(matrix[i][j]),
                style: {
                  position: "relative",
                  display: "block",
                  width: String(100) + '%',
                  textAlign: "center",
                  fontSize: String(titleMap[i] === 1 ? titleSize : size) + ea,
                  fontWeight: String(titleMap[i] === 1 ? (whiteMode ? 700 : boldWeight) : (boldMap[i][j] === 1 ? boldWeight : generalWeight)),
                  color: !whiteMode ? colorChip[titleMap[i] === 1 ? titleColor : generalColor] : colorChip.black,
                  top: String(textTop) + ea,
                }
              }
            ]
          }
        ],
      });
      if (j === columnsLength - 1) {
        eachBlock.style.borderRight = "";
      }
      all.push(eachBlock);
      tempArr.push(eachBlock);
    }
    domMatrix.push(tempArr);
    rows.push(rowBlock);
  }

  if (doubleLineMode) {
    createNode({
      mother: table,
      style: {
        position: "absolute",
        top: String(whiteModeDoubleLineMargin) + ea,
        left: String(0),
        width: String(100) + '%',
        height: withOut(whiteModeDoubleLineMargin * 2, ea),
        borderTop: String(borderWeight) + "px solid " + colorChip.shadow,
        borderBottom: String(borderWeight) + "px solid " + colorChip.shadow,
        boxSizing: "border-box",
        borderRadius: String(0) + "px",
      }
    });
  }

  for (let i = 0; i < totalLength; i++) {
    for (let j = 0; j < columnsLength; j++) {
      if (mergeMap[i][j] !== null) {
        if (!Array.isArray(mergeMap[i][j])) {
          throw new Error("invaild merge map");
        }
        if (mergeMap[i][j].length !== 2) {
          throw new Error("invaild merge map");
        }
        if (!(mergeMap[i][j][0] === i && mergeMap[i][j][1] === j)) {
          if (mergeMap[i][j][0] === i || mergeMap[i][j][1] === j) {
            if (mergeMap[i][j][0] === i) {
              if (mergeMap[i][j][1] < j) {
                for (let k = mergeMap[i][j][1]; k < j; k++) {
                  if (domMatrix[i][k + 1] !== undefined) {
                    domMatrix[i][k + 1].remove();
                  }
                }
                domMatrix[i][mergeMap[i][j][1]].style.width = "calc(calc(100% / " + String(columnsLength) + ") * " + String(j - mergeMap[i][j][1] + 1) + ")";
                if (j === columnsLength - 1) {
                  domMatrix[i][mergeMap[i][j][1]].style.borderRight = "";
                }
              }
            } else if (mergeMap[i][j][1] === j) {
              if (mergeMap[i][j][0] < i) {
                domMatrix[mergeMap[i][j][0]][j].style.zIndex = String(1);
                domMatrix[mergeMap[i][j][0]][j].style.height = String((blockHeight * (i - mergeMap[i][j][0] + 1)) - (borderWeight * (i - mergeMap[i][j][0]))) + ea;
              }
            }
          }
        }
      }
    }
  }

  return mother;
}

GeneralJs.prototype.generalStacks = function () {
  const instance = this;
  GeneralJs.stacks["latestSort"] = [ null ];
}

GeneralJs.prototype.loadingRun = function () {
  const instance = this;
  let loading;
  let style;
  let ea = "px";
  let width, height;

  loading = this.returnLoadingIcon();
  width = 50;
  height = 50;
  style = {
    width: String(width) + ea,
    height: String(height) + ea,
    top: "calc(calc(100% - " + String((this.belowHeight !== undefined && this.belowHeight !== null) ? this.belowHeight : 0) + ea + ") / 2 - " + String(width / 2) + ea + ")",
    left: "calc(50% - " + String(height / 2) + ea + ")",
  };

  for (let i in style) {
    loading.style[i] = style[i];
  }

  this.totalContents.appendChild(loading);

  return new Promise(function (resolve, reject) {
    resolve(loading);
  });
}

GeneralJs.prototype.certificationBox = function (name, phone, callback) {
  const instance = this;
  const boo = (window.innerWidth < 1000) ? "mobile" : "desktop";
  let pending;
  let certification;
  let loader;
  let randomArr;
  let randomValue;
  let randomValueAjaxData;
  let randomKey;
  let randomStr;
  let div_back, div_clone, div_clone2, svg_clone;
  let input_back, input_clone;
  let height, width, ea = (boo === "desktop") ? "px" : "vw";
  let wordWidth, whiteWidth, whiteHeight;
  let style = {};
  let endEvent;

  pending = "pending_svgIcon";
  certification = "certification_svgIcon";
  loader = "loader_svgIcon";

  SvgTong["pending_svgIcon"] = '<svg xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 129.704 20.881"><path d="M0.798 1.519h10.759v1.98H7.46v0.616c0 3.058 2.264 5.5 4.636 6.271l-1.293 1.914c-1.704-0.682-3.666-2.464-4.549-4.4 -0.604 2.024-2.803 4.202-4.851 4.973L0 11.002c2.868-1.078 5.045-3.741 5.045-6.799V3.499H0.798V1.519zM3.579 20.265v-6.534h2.329v4.599h11.449v1.936H3.579zM14.554 15.16v-7.547h-3.299V5.611h3.299V0h2.35v15.16H14.554z" fill="' + GeneralJs.colorChip.darkShadow + '"/><path d="M19.382 11.794V9.857h8.042V6.997h2.35v2.86h8.064v1.937H19.382zM36.027 8.229c-2.933-0.484-6.404-2.377-7.396-4.643 -0.97 2.266-4.226 4.093-7.396 4.62l-1.013-1.87c3.407-0.374 7.201-2.442 7.201-5.522V0.176h2.437v0.639c0 3.08 4.312 5.324 7.201 5.522L36.027 8.229zM28.632 20.881c-4.528 0-7.093-1.474-7.093-3.807 0-2.354 2.565-3.851 7.072-3.851s7.093 1.497 7.093 3.851C35.704 19.407 33.117 20.881 28.632 20.881zM28.61 15.16c-2.868 0-4.657 0.727-4.657 1.914 0 1.211 1.79 1.915 4.657 1.915 2.889 0 4.679-0.704 4.679-1.915C33.289 15.887 31.5 15.16 28.61 15.16z" fill="' + GeneralJs.colorChip.darkShadow + '"/><path d="M47.928 20.859c-4.484 0-7.093-1.475-7.093-3.807 0-2.112 2.134-3.521 5.864-3.785v-1.76h-8.021V9.571h18.456v1.937h-8.085v1.76c3.773 0.221 5.951 1.673 5.951 3.785C55 19.385 52.391 20.859 47.928 20.859zM55.15 8.449C52.089 8.075 49.027 6.315 47.928 4.313c-0.992 2.156-3.859 3.763-7.244 4.137l-1.014-1.87c3.234-0.22 6.274-1.694 6.921-4.026h-6.015V0.616h14.704v1.937h-5.994c0.733 2.332 4.14 3.851 6.899 4.026L55.15 8.449zM47.906 15.16c-2.846 0-4.657 0.66-4.657 1.893 0 1.254 1.811 1.87 4.657 1.87 2.868 0 4.679-0.616 4.679-1.87C52.585 15.82 50.752 15.16 47.906 15.16z" fill="' + GeneralJs.colorChip.darkShadow + '"/><path d="M63.774 10.605c-2.954 0-5.218-1.804-5.218-4.73 0-2.86 2.264-4.929 5.218-4.929 2.976 0 5.239 2.002 5.239 4.929S66.75 10.605 63.774 10.605zM63.774 2.927c-1.617 0-2.868 1.122-2.868 2.904 0 1.76 1.272 2.794 2.868 2.794 1.617 0 2.889-1.034 2.889-2.794C66.663 4.005 65.434 2.927 63.774 2.927zM61.467 20.595v-8.295h2.35v2.179h8.646v-2.223h2.35v8.339H61.467zM72.463 16.393h-8.646v2.267h8.646V16.393zM72.441 11.156V0h2.351v11.156H72.441z" fill="' + GeneralJs.colorChip.darkShadow + '"/><path d="M90.078 14.83c-2.501 0.616-6.921 0.99-9.486 1.013l-2.135 0.021V2.156h2.328v11.596c2.717 0.088 6.749-0.374 9.013-0.902L90.078 14.83zM91.673 20.859V0h2.35v20.859H91.673z" fill="' + GeneralJs.colorChip.darkShadow + '"/><path d="M108.468 15.051c-2.221 0.483-5.498 0.704-8.927 0.704h-2.156V1.958h9.293v1.959h-6.964v9.835c2.522 0.044 5.843-0.109 8.452-0.66L108.468 15.051zM112.414 9.989V20.859h-2.351V0h2.351v7.987h3.083v2.002H112.414z" fill="' + GeneralJs.colorChip.darkShadow + '"/><path d="M116.79 15.755h2.522v2.53h-2.522V15.755z" fill="' + GeneralJs.colorChip.darkShadow + '"/><path d="M121.985 15.755h2.522v2.53h-2.522V15.755z" fill="' + GeneralJs.colorChip.darkShadow + '"/><path d="M127.181 15.755h2.522v2.53h-2.522V15.755z" fill="' + GeneralJs.colorChip.darkShadow + '"/></svg>';

  SvgTong["certification_svgIcon"] = '<svg xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 284.934 20.903"><path d="M4.485 20.837v-5.391H0v-1.914h18.456v1.914h-4.571v5.391h-2.35v-5.391H6.835v5.391H4.485zM1.1 5.148V3.234h16.3v1.914H1.1zM9.271 12.476c-3.751 0-6.425-1.254-6.425-3.256 0-2.003 2.673-3.278 6.425-3.278s6.425 1.275 6.425 3.278C15.696 11.222 13.022 12.476 9.271 12.476zM9.271 7.768c-2.091 0-3.945 0.418-3.945 1.452 0 1.012 1.854 1.43 3.945 1.43 2.07 0 3.924-0.418 3.924-1.43C13.195 8.186 11.341 7.768 9.271 7.768zM5.67 0.176h7.137v1.959H5.67V0.176z" fill="' + GeneralJs.colorChip.darkShadow + '"/><path d="M28.847 15.183c-1.703 0.396-4.355 0.572-6.834 0.572h-2.048V2.53h7.697v1.937c-1.768 0-3.579-0.022-5.326-0.022v9.33c2.566 0 4.657-0.177 6.209-0.528L28.847 15.183zM34.259 20.859V10.298h-2.07v9.549h-2.221V0.418h2.221v7.877h2.07V0h2.264v20.859H34.259z" fill="' + GeneralJs.colorChip.darkShadow + '"/><path d="M38.592 13.202v-1.914h7.999V9.22H40.403V7.283h3.083L42.925 3.696l2.307-0.264 0.453 3.851h4.162l0.517-3.873 2.329 0.353 -0.647 3.521h3.105v1.937H48.941v2.068h8.107v1.914H38.592zM40.36 2.751V0.836H55.172v1.915H40.36zM40.963 20.265V14.5h2.35v3.829h11.6v1.936H40.963z" fill="' + GeneralJs.colorChip.darkShadow + '"/><path d="M69.229 11.75c-3.126 0-5.261-2.112-5.261-5.083s2.113-5.127 5.261-5.127c3.126 0 5.239 2.135 5.239 5.105C74.468 9.615 72.355 11.75 69.229 11.75zM69.229 3.543c-1.746 0-2.911 1.342-2.911 3.103 0 1.716 1.165 3.08 2.911 3.08 1.79 0 2.889-1.364 2.889-3.08C72.118 4.818 71.018 3.543 69.229 3.543zM66.685 20.265v-6.557h2.35v4.621h11.643v1.936H66.685zM77.853 15.139V0h2.35v15.139H77.853z" fill="' + GeneralJs.colorChip.darkShadow + '"/><path d="M101.138 11.882H82.682V9.945h18.456V11.882zM99.197 8.625c-3.062-0.374-6.167-2.134-7.266-4.114 -0.949 2.046-3.881 3.763-7.266 4.137l-1.013-1.893c3.212-0.198 6.274-1.672 6.942-3.982h-6.059V0.836h14.791v1.937h-6.016c0.755 2.311 4.161 3.784 6.921 3.961L99.197 8.625zM91.931 20.793c-4.528 0-7.093-1.518-7.093-3.807 0-2.288 2.565-3.828 7.072-3.828s7.093 1.54 7.093 3.828C99.003 19.275 96.416 20.793 91.931 20.793zM91.91 15.095c-2.868 0-4.657 0.704-4.657 1.892 0 1.211 1.79 1.87 4.657 1.87 2.889 0 4.679-0.659 4.679-1.87C96.588 15.799 94.799 15.095 91.91 15.095z" fill="' + GeneralJs.colorChip.darkShadow + '"/><path d="M102.71 11.706V1.32h2.372v3.389h4.765V1.299h2.35v10.407H102.71zM109.847 6.602h-4.765v3.212h4.765V6.602zM105.47 20.265v-6.513h2.35v4.577h11.449v1.936H105.47zM113.254 7.701V5.699h3.191V0h2.35v15.16h-2.35V7.701H113.254z" fill="' + GeneralJs.colorChip.darkShadow + '"/><path d="M121.273 18.373v-1.937h8.021v-2.332c-3.191-0.286-5.174-1.65-5.174-3.675 0-2.288 2.522-3.763 6.403-3.763s6.382 1.475 6.382 3.763c0 2.046-2.026 3.433-5.261 3.675v2.332h8.085v1.937H121.273zM122.416 5.809V3.873h16.17v1.936H122.416zM130.523 8.516c-2.134 0-4.032 0.616-4.032 1.914 0 1.276 1.897 1.914 4.032 1.914 2.135 0 4.01-0.638 4.01-1.914C134.533 9.132 132.658 8.516 130.523 8.516zM126.857 0.639h7.266v1.914h-7.266V0.639z" fill="' + GeneralJs.colorChip.darkShadow + '"/><path d="M140.57 11.376V9.571h18.456v1.805H140.57zM142.92 20.705v-4.818h11.406v-1.408h-11.47v-1.738h13.82v4.818h-11.405v1.431h11.944v1.716H142.92zM143.006 8.317V3.631h11.189V2.311h-11.233V0.55h13.583v4.709H145.356v1.298h11.644v1.761H143.006z" fill="' + GeneralJs.colorChip.darkShadow + '"/><path d="M171.165 10.605c-2.954 0-5.218-1.804-5.218-4.73 0-2.86 2.264-4.929 5.218-4.929 2.975 0 5.238 2.002 5.238 4.929S174.139 10.605 171.165 10.605zM171.165 2.927c-1.617 0-2.868 1.122-2.868 2.904 0 1.76 1.272 2.794 2.868 2.794 1.616 0 2.889-1.034 2.889-2.794C174.053 4.005 172.825 2.927 171.165 2.927zM168.857 20.595v-8.295h2.351v2.179h8.646v-2.223h2.351v8.339H168.857zM179.853 16.393h-8.646v2.267h8.646V16.393zM179.832 11.156V0h2.35v11.156H179.832z" fill="' + GeneralJs.colorChip.darkShadow + '"/><path d="M195.505 11.244c-2.437 0.483-4.484 0.527-7.396 0.527h-2.674V5.325h6.598V3.059h-6.619V1.166h8.97v6.007h-6.598v2.685c2.264 0 4.938 0 7.417-0.484L195.505 11.244zM201.5 13.752v7.151h-2.351v-5.237h-11.535v-1.914H201.5zM195.85 2.904h3.277V0h2.35v12.608h-2.35V9.264h-3.277V7.306h3.277V4.863h-3.277V2.904z" fill="' + GeneralJs.colorChip.darkShadow + '"/><path d="M203.762 4.973h10.177V6.953H203.762V4.973zM208.958 16.129c-2.609 0-4.398-1.738-4.398-4.049 0-2.509 1.789-4.093 4.398-4.093 2.608 0 4.398 1.628 4.398 4.093C213.357 14.522 211.567 16.129 208.958 16.129zM206.177 1.563h5.541v2.002h-5.541V1.563zM208.958 9.901c-1.315 0-2.243 0.88-2.243 2.179 0 1.276 0.928 2.134 2.243 2.134 1.293 0 2.242-0.901 2.242-2.134C211.201 10.781 210.251 9.901 208.958 9.901zM218.941 20.859V10.496h-2.027v9.373h-2.221V0.418h2.221v8.075h2.027V0h2.242v20.859H218.941z" fill="' + GeneralJs.colorChip.darkShadow + '"/><path d="M231.273 20.837V13.422h-8.021v-1.914h18.455v1.914h-8.085v7.415H231.273zM233.774 2.795c0.409 2.574 4.01 4.466 7.071 4.796l-1.057 1.893c-2.867-0.418-6.252-2.376-7.287-4.312 -0.992 2.046-4.291 3.938-7.309 4.4l-1.122-1.892c3.148-0.33 6.771-2.289 7.18-4.885h-6.295V0.858h15.027v1.937H233.774z" fill="' + GeneralJs.colorChip.darkShadow + '"/><path d="M251.539 15.688c-1.444-0.946-3.277-3.146-3.881-5.303 -0.496 2.267-2.135 4.576-4.097 5.853l-1.423-1.65c2.479-1.649 4.377-4.95 4.377-9.241V2.068h2.264v3.257c0 3.982 1.725 7.194 4.118 8.691L251.539 15.688zM253.522 19.869V9.285h-2.932V7.283h2.932V0.418h2.221v19.451H253.522zM257.533 20.859V0h2.242v20.859H257.533z" fill="' + GeneralJs.colorChip.darkShadow + '"/><path d="M261.844 18.219v-1.914h4.269v-3.631l2.372-0.021v3.652h5.109v-3.652l2.351 0.021v3.631h4.354V18.219H261.844zM271.072 12.124c-4.441 0-7.396-2.2-7.396-5.347s2.954-5.369 7.396-5.369c4.484 0 7.417 2.223 7.417 5.369S275.556 12.124 271.072 12.124zM271.072 3.389c-3.019 0-5.002 1.364-5.002 3.389 0 2.002 1.983 3.366 5.002 3.366s5.023-1.364 5.023-3.366C276.095 4.753 274.112 3.389 271.072 3.389z" fill="' + GeneralJs.colorChip.darkShadow + '"/><path d="M282.304 1.452h2.63l-0.28 11.948h-2.048L282.304 1.452zM282.369 15.755h2.522v2.53h-2.522V15.755z" fill="' + GeneralJs.colorChip.darkShadow + '"/></svg>';

  SvgTong["loader_svgIcon"] = '<svg xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 566.929 566.929"><path d="M196.13 552.859c-23.91-7.75-37.01-33.409-29.26-57.31l0 0c7.74-23.9 33.4-37.01 57.31-29.26l0 0c23.9 7.74 37 33.399 29.26 57.31l0 0c-6.24 19.25-24.08 31.49-43.28 31.49l0 0C205.52 555.09 200.79 554.37 196.13 552.859z" fill="' + GeneralJs.colorChip.green + '"/><path d="M313.729 523.569C305.96 499.67 319.04 474 342.939 466.229l0 0c23.891-7.77 49.561 5.301 57.33 29.2l0 0c7.771 23.9-5.3 49.57-29.2 57.34l0 0c-4.67 1.521-9.409 2.24-14.069 2.24l0 0C337.819 555.01 319.979 542.79 313.729 523.569z" fill="' + GeneralJs.colorChip.green + '"/><path d="M54.55 450.109c-14.81-20.3-10.35-48.76 9.96-63.569l0 0c20.3-14.8 48.77-10.34 63.57 9.97l0 0c14.8 20.3 10.34 48.76-9.96 63.56l0 0c-8.09 5.9-17.47 8.74-26.77 8.74l0 0C77.31 468.81 63.45 462.33 54.55 450.109z" fill="' + GeneralJs.colorChip.green + '"/><path d="M449 459.899c-20.33-14.779-24.82-43.239-10.03-63.56l0 0c14.78-20.32 43.23-24.81 63.561-10.03l0 0c20.319 14.78 24.81 43.24 10.029 63.561l0 0c-8.91 12.239-22.779 18.739-36.84 18.739l0 0C466.439 468.609 457.069 465.78 449 459.899z" fill="' + GeneralJs.colorChip.green + '"/><path d="M0.33 283.77C0.3 258.64 20.65 238.25 45.78 238.22l0 0c25.13-0.03 45.52 20.32 45.55 45.45l0 0C91.35 308.8 71 329.189 45.88 329.22l0 0c-0.02 0-0.03 0-0.05 0l0 0C20.72 329.22 0.35 308.88 0.33 283.77z" fill="' + GeneralJs.colorChip.green + '"/><path d="M475.6 283.46L475.6 283.46c0-0.01 0-0.03 0-0.05l0 0c0-0.12 0-0.24 0-0.36l0 0C475.55 257.92 495.87 237.51 521 237.45l0 0c25.13-0.05 45.55 20.28 45.6 45.41l0 0c0 0.12 0 0.24 0 0.36l0 0c0 0.08 0 0.16 0 0.24l0 0c0 25.13-20.37 45.5-45.5 45.5l0 0C495.97 328.96 475.6 308.59 475.6 283.46z" fill="' + GeneralJs.colorChip.green + '"/><path d="M0.33 283.76v0.01l0 0 0 0 0 0C0.33 283.76 0.33 283.76 0.33 283.76z" fill="' + GeneralJs.colorChip.green + '"/><path d="M64.29 180.85c-20.34-14.76-24.86-43.21-10.1-63.55l0 0C68.95 96.96 97.41 92.44 117.74 107.2l0 0c20.34 14.76 24.86 43.22 10.1 63.55l0 0c-8.9 12.27-22.78 18.78-36.86 18.78l0 0C81.71 189.53 72.36 186.71 64.29 180.85z" fill="' + GeneralJs.colorChip.green + '"/><path d="M438.729 170.26c-14.83-20.29-10.399-48.76 9.891-63.59l0 0c20.29-14.82 48.76-10.39 63.58 9.9l0 0 0 0 0 0c14.83 20.29 10.399 48.75-9.891 63.58l0 0c-8.1 5.92-17.5 8.77-26.81 8.77l0 0C461.47 188.92 447.64 182.45 438.729 170.26z" fill="' + GeneralJs.colorChip.green + '"/><path d="M166.43 71.62C158.63 47.73 171.67 22.05 195.57 14.25l0 0c23.89-7.8 49.57 5.25 57.37 29.14l0 0c7.79 23.89-5.26 49.57-29.14 57.37l0 0c-4.69 1.53-9.45 2.26-14.13 2.26l0 0C190.52 103.02 172.69 90.82 166.43 71.62z" fill="' + GeneralJs.colorChip.green + '"/><path d="M342.56 100.57h-0.01c-23.91-7.72-37.04-33.36-29.32-57.27l0 0C320.95 19.38 346.6 6.25 370.51 13.98l0 0 0 0 0 0C394.42 21.69 407.55 47.34 399.83 71.25l0 0c-6.221 19.27-24.07 31.54-43.29 31.54l0 0C351.91 102.79 347.2 102.07 342.56 100.57z" fill="' + GeneralJs.colorChip.green + '"/><rect width="566.929" height="566.929" fill="none"/></svg>';

  try {
    if (GeneralJs.isIE()) {
      randomArr = window.msCrypto.getRandomValues(new Uint32Array(10));
    } else {
      randomArr = window.crypto.getRandomValues(new Uint32Array(10));
    }

    randomKey = randomArr[Math.floor(Math.random() * 10)];
    randomStr = String(randomKey);

    if (randomStr.length > 6) {
      randomValue = randomStr.slice(0, 6);
    } else {
      randomValue = randomStr;
      for (let i = randomStr.length; i < 6; i++) {
        randomValue += String(Math.floor(Math.random() * 10));
      }
      randomValue = randomStr;
    }
  } catch (e) {
    randomValue = '';
    for (let i = 0; i < 6; i++) {
      randomValue += String(Math.floor(Math.random() * 10));
    }
  }

  whiteWidth = (boo === "desktop") ? 334 : 77;
  whiteHeight = (boo === "desktop") ? 132 : 31;

  div_back = GeneralJs.nodes.div.cloneNode(true);
  style = {
    transition: "all 0.3s ease",
    position: "fixed",
    top: String(0),
    left: String(0),
    width: "100%",
    height: "100%",
    background: GeneralJs.colorChip.black,
    opacity: String(0.3),
    zIndex: String(200),
  };
  for (let i in style) {
    div_back.style[i] = style[i];
  }
  document.body.appendChild(div_back);

  div_clone = GeneralJs.nodes.div.cloneNode(true);
  if (boo === "desktop") {
    style = {
      animation: "fadeup 0.4s ease forwards",
      transition: "all 0.3s ease",
      position: "fixed",
      top: "calc(50% - " + String(66) + ea + ")",
      left: "calc(50% - " + String(120) + ea + ")",
      width: String(240) + ea,
      height: String(130) + ea,
      background: GeneralJs.colorChip.white,
      borderRadius: String(5) + "px",
      boxShadow: "0px 5px 15px -14px " + GeneralJs.colorChip.black,
      zIndex: String(200),
    };
  } else {
    style = {
      animation: "fadeup 0.4s ease forwards",
      transition: "all 0.3s ease",
      position: "fixed",
      top: "calc(50% - " + String(17) + ea + ")",
      left: "calc(50% - " + String(26) + ea + ")",
      width: String(52) + ea,
      height: String(34) + ea,
      background: GeneralJs.colorChip.white,
      borderRadius: String(5) + "px",
      boxShadow: "0px 5px 15px -14px " + GeneralJs.colorChip.black,
      zIndex: String(200),
    };
  }
  for (let i in style) {
    div_clone.style[i] = style[i];
  }
  style = {
    width: String(whiteWidth) + ea,
    height: String(whiteHeight) + ea,
    left: "calc(50% - " + String(whiteWidth / 2) + ea + ")",
  };
  for (let i in style) {
    div_clone.style[i] = style[i];
  }
  height = (boo === "desktop") ? 19 : 4.5;

  GeneralJs.ajaxJson({
    name,
    phone,
    certification: randomValue
  }, BACKHOST + "/sendCertification").then((obj) => {
    if (obj.message === "office") {
      GeneralJs.setQueue(() => {
        callback(div_back, div_clone);
      }, 100);
    }
  }).catch((err) => {
    GeneralJs.ajaxJson({
      text: "인증번호 오류 (브라우저) => " + err.message,
    }, LOGHOST + "/errorMessage").catch((err) => {});
    GeneralJs.ajaxJson({
      name,
      phone,
      certification: randomValue
    }, BACKHOST + "/sendCertification").catch((err) => {
      GeneralJs.ajaxJson({
        name,
        phone,
        certification: randomValue
      }, BACKHOST + "/sendCertification").catch((err) => {
        window.alert("오류가 발생하였습니다! 다시 시도해주세요!");
        window.location.reload();
      });
    });
  });

  svg_clone = SvgTong.stringParsing(SvgTong["certification_svgIcon"]);
  wordWidth = SvgTong.getRatio(svg_clone) * height;
  style = {
    position: "absolute",
    top: String((boo === "desktop") ? 31 : 7) + ea,
    left: "calc(50% - " + String(wordWidth / 2) + ea + ")",
    width: String(wordWidth) + ea,
    height: String(height) + ea,
  };
  for (let i in style) {
    svg_clone.style[i] = style[i];
  }
  div_clone2 = svg_clone;
  div_clone.appendChild(div_clone2);

  height = (boo === "desktop") ? 30 : 7.6;
  svg_clone = SvgTong.stringParsing(SvgTong["loader_svgIcon"]);
  svg_clone.classList.add("loading");
  svg_clone.classList.add("loaderc");
  width = SvgTong.getRatio(svg_clone) * height;
  style = {
    top: String((boo === "desktop") ? 67 : 15.5) + ea,
    left: "calc(50% - " + String((wordWidth / 2) + ((boo === "desktop") ? 1 : 0.5)) + ea + ")",
    marginLeft: String(0) + ea,
    width: String(width) + ea,
    height: String(height) + ea,
  };
  for (let i in style) {
    svg_clone.style[i] = style[i];
  }
  div_clone.appendChild(svg_clone);

  input_back = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "absolute",
    bottom: String((boo === "desktop") ? 32 : 7.5) + ea,
    left: String((boo === "desktop") ? (GeneralJs.isMac() ? 80 : 79) : 18) + ea,
    borderRadius: String((boo === "desktop") ? 4 : 1) + ea,
    width: String((boo === "desktop") ? 218 : 51.4) + ea,
    height: String((boo === "desktop") ? 34 : 8) + ea,
    background: GeneralJs.colorChip.gray1,
  };
  for (let i in style) {
    input_back.style[i] = style[i];
  }

  input_clone = GeneralJs.nodes.input.cloneNode(true);
  input_clone.setAttribute("type", "text");
  style = {
    width: "100%",
    border: String(0) + ea,
    fontSize: String((boo === "desktop") ? 15 : 3.8) + ea,
    outline: String(0) + ea,
    fontFamily: "Noto Sans KR",
    background: "transparent",
    height: String((boo === "desktop") ? 34 : 6.8) + ea,
    textAlign: "center",
  };
  for (let i in style) {
    input_clone.style[i] = style[i];
  }
  input_back.appendChild(input_clone);
  div_clone.appendChild(input_back);

  document.body.appendChild(div_clone);

  input_clone.focus();
  setTimeout(function () {
    window.location.reload();
  }, (10 * 60 * 1000));

  endEvent = function (e) {
    let svg_clone, div_clone2;
    let style;
    let width, height;
    let whiteWidth, whiteHeight;
    let ea;

    ea = (boo === "desktop") ? "px" : "vw";

    if (this.value.length > 5) {
      if (this.value === randomValue) {
        while (div_clone.firstChild) {
          div_clone.removeChild(div_clone.lastChild);
        }

        whiteWidth = (boo === "desktop") ? 200 : 46;
        whiteHeight = (boo === "desktop") ? 132 : 31;

        height = (boo === "desktop") ? 19 : 4.5;
        svg_clone = SvgTong.stringParsing(SvgTong["pending_svgIcon"]);
        width = SvgTong.getRatio(svg_clone) * height;
        style = {
          position: "absolute",
          top: String((boo === "desktop") ? 31 : 7) + ea,
          left: "calc(50% - " + String(width / 2) + ea + ")",
          width: String(width) + ea,
          height: String(height) + ea,
        };
        for (let i in style) {
          svg_clone.style[i] = style[i];
        }
        div_clone2 = svg_clone;
        div_clone.appendChild(div_clone2);

        height = (boo === "desktop") ? 39 : 9.6;

        svg_clone = SvgTong.stringParsing(SvgTong["loader_svgIcon"]);
        svg_clone.classList.add("loading");
        svg_clone.classList.add("loaderc");
        width = SvgTong.getRatio(svg_clone) * height;
        style = {
          top: String((boo === "desktop") ? 63 : 14.5) + ea,
          left: "50%",
          marginLeft: '-' + String(width / 2) + ea,
          width: String(width) + ea,
          height: String(height) + ea,
        };
        for (let i in style) {
          svg_clone.style[i] = style[i];
        }
        div_clone.appendChild(svg_clone);

        div_clone.style.width = String(whiteWidth) + ea;
        div_clone.style.left = "calc(50% - " + String(whiteWidth / 2) + ea + ")";
        div_clone.style.height = String(whiteHeight) + ea;

        callback(div_back, div_clone);

      } else {
        window.alert("인증번호를 정확히 입력해주세요!");
        this.value = '';
      }
    }
  }

  if (boo === "desktop") {
    input_clone.addEventListener("keyup", endEvent);
  } else {
    input_clone.addEventListener("keyup", function (e) {
      if (this.value.length > 5) {
        this.blur();
      }
    });
    input_clone.addEventListener("blur", endEvent);
  }

}

GeneralJs.prototype.communicationBox = function () {
  const instance = this;
  if (this.belowButtons !== undefined && this.belowButtons !== null && typeof this.belowButtons !== "object") {
    throw new Error("below button first");
  }
  if (this.belowButtons.sub === undefined || this.belowButtons.sub === null) {
    throw new Error("below button first");
  }
  if (this.belowButtons.sub.talkIcon === undefined || this.belowButtons.sub.talkIcon === null) {
    throw new Error("below button first");
  }
  const { belowButtons: { sub: { talkIcon } } } = this;
  class Communication extends Array {
    constructor(arr) {
      super();
      if (!Array.isArray(arr)) {
        throw new Error("input must be array");
      }
      for (let f of arr) {
        if (typeof f !== "function") {
          throw new Error("input must be only function array");
        }
      }
      if (arr.length !== 3) {
        throw new Error("input must be visualFunc, vaildFunc, actionFunc");
      }
      for (let f of arr) {
        this.push(f);
      }
      this.visual = arr[0];
      this.vaild = arr[1];
      this.action = arr[2];
    }
  }
  class CommunicationBox extends Array {
    setItem(arr) {
      if (!Array.isArray(arr)) {
        throw new Error("input must be array");
      }
      let obj = new Communication(arr);
      this.push(obj);
    }
  }
  class WidthArray extends Array {
    sum() {
      let num;
      num = 0;
      for (let i of this) {
        num += i;
      }
      return num;
    }
  }

  GeneralJs.stacks.communication = new CommunicationBox();
  this.communication = GeneralJs.stacks.communication;
  this.communicationBox = {};

  const renderItem = function (mother, name, callback) {
    const { createNode, colorChip, withOut, isMac } = GeneralJs;
    const ea = "px";
    let size;
    let width, height;
    let textTop;
    let innerMargin;
    let block;
    let renderWidth;

    size = 14;
    width = 300;
    height = 33;
    textTop = isMac() ? 6 : 8.5;
    innerMargin = 10;

    block = createNode({
      mother,
      class: [ "hoverDefault_lite" ],
      events: [
        {
          type: [ "click", "contextmenu" ],
          event: function (e) {
            e.preventDefault();
            e.stopPropagation();
            const whiteTarget = this.parentElement.parentElement;
            let width;

            width = 40;

            createNode({
              mother: whiteTarget,
              style: {
                position: "absolute",
                top: String(0),
                left: String(0),
                width: String(100) + '%',
                height: String(100) + '%',
                background: colorChip.white,
              }
            });

            createNode({
              mother: whiteTarget,
              mode: "svg",
              source: instance.returnLoading(),
              class: [ "loading" ],
              style: {
                position: "absolute",
                top: withOut(50, (width / 2), ea),
                left: withOut(50, (width / 2), ea),
                width: String(width) + ea,
                background: colorChip.white,
              }
            });

            callback(e).then((result) => {
              instance.communicationBox.cancel.click();
            }).catch((err) => {
              throw new Error(err);
            });
          }
        }
      ],
      style: {
        display: "inline-block",
        position: "relative",
        width: String(width) + ea,
        height: String(height) + ea,
        borderRadius: String(4) + "px",
        marginRight: String(innerMargin / 2) + ea,
        marginBottom: String(innerMargin / 2) + ea,
        background: colorChip.greenGray,
        transition: "all 0s ease",
      },
      children: [
        {
          text: name,
          style: {
            position: "absolute",
            fontSize: String(size) + ea,
            fontWeight: String(500),
            color: colorChip.whiteBlack,
            top: String(textTop) + ea,
          }
        }
      ]
    });

    renderWidth = block.firstChild.getBoundingClientRect().width + (innerMargin * 2);
    block.style.width = String(renderWidth) + ea
    block.firstChild.style.width = String(100) + '%';
    block.firstChild.style.textAlign = "center";

    return { width: renderWidth, margin: innerMargin / 2, height: height, block: block };
  }

  talkIcon.addEventListener("click", function (e) {
    if (!(GeneralJs.stacks.communication instanceof CommunicationBox)) {
      throw new Error("communication box error");
    }
    const { createNode, colorChip, withOut } = GeneralJs;
    const { communication } = instance;
    const ea = "px";
    const zIndex = 5;
    const mother = document.getElementById("totalcontents");
    let visual, vaild, action;
    let cancelBox, whiteBox;
    let cancelWidth, cancelHeight;
    let width, height, top, left, bottom;
    let size;
    let emptyWidth, emptyHeight;
    let emptyTextTop;
    let innerMargin;
    let blockWidth, blockMargin, blockHeight;
    let tempObj, tempArr;
    let num;
    let widthArr;
    let lastBlocksNumber;
    let refreshHeight;
    let itemArr;

    cancelWidth = 98.5;
    cancelHeight = 98;

    bottom = 66;
    width = 2026;
    height = 160;
    left = 184;
    size = 15;

    emptyWidth = 250;
    emptyHeight = 48;
    emptyTextTop = 12;

    innerMargin = 14;

    cancelBox = createNode({
      mother,
      events: [
        {
          type: "click",
          event: function (e) {
            instance.communicationBox.cancel.remove();
            instance.communicationBox.contents.remove();
            instance.communicationBox.cancel = null;
            instance.communicationBox.contents = null;
          }
        }
      ],
      style: {
        position: "fixed",
        width: String(cancelWidth) + "vw",
        height: String(cancelHeight) + "vh",
        bottom: String(0) + ea,
        left: String(0) + ea,
        background: "transparent",
        opacity: String(0),
        zIndex: String(zIndex),
      }
    });

    whiteBox = createNode({
      mother,
      style: {
        position: "fixed",
        width: String(width) + ea,
        height: String(height) + ea,
        bottom: String(bottom) + ea,
        left: String(left) + ea,
        borderRadius: String(4) + "px",
        boxShadow: "0px 6px 18px -9px " + colorChip.shadow,
        animation: "communicationfadeup 0.4s ease forwards",
        overflow: "hidden",
        transition: "all 0s ease",
        zIndex: String(zIndex),
      },
      children: [
        {
          style: {
            position: "absolute",
            width: String(100) + '%',
            height: String(100) + '%',
            top: String(0),
            left: String(0),
            background: colorChip.white,
            opacity: String(0.92),
            transition: "all 0s ease",
          }
        },
        {
          style: {
            position: "relative",
            width: withOut(innerMargin * 2, ea),
            height: withOut(innerMargin * 2, ea),
            top: String(0) + ea,
            left: String(0) + ea,
            padding: String(innerMargin) + ea,
            transition: "all 0s ease",
          },
          children: [
            {
              style: {
                position: "relative",
                width: String(100) + '%',
                height: String(100) + '%',
                top: String(0),
                left: String(0),
                transition: "all 0s ease",
              }
            }
          ]
        }
      ]
    });

    instance.communicationBox.cancel = cancelBox;
    instance.communicationBox.contents = whiteBox;

    if (communication.length === 0) {

      whiteBox.style.width = String(emptyWidth) + ea;
      whiteBox.style.height = String(emptyHeight) + ea;

      createNode({
        mother: whiteBox.lastChild,
        text: "이 곳에는 할 수 있는 것이 없어요.",
        style: {
          position: "absolute",
          fontSize: String(size) + ea,
          fontWeight: String(600),
          color: colorChip.green,
          width: String(100) + '%',
          textAlign: "center",
          top: String(emptyTextTop) + ea,
          left: String(0) + ea,
        }
      });

    } else {

      widthArr = [];
      itemArr = [];

      num = 0;
      for (let arr of communication) {
        [ visual, vaild, action ] = arr;
        if (vaild()) {
          if (num % 3 === 0) {
            tempArr = new WidthArray();
          }
          tempObj = renderItem(whiteBox.lastChild.firstChild, visual(), action);
          blockWidth = tempObj.width;
          blockMargin = tempObj.margin;
          blockHeight = tempObj.height;
          tempArr.margin = blockMargin;
          tempArr.height = blockHeight;
          tempArr.push(blockWidth + blockMargin);
          if (num % 3 === 2) {
            widthArr.push(tempArr);
          }
          tempObj.block.setAttribute("margin", String(blockMargin));
          itemArr.push(tempObj.block);
          num++;
        }
      }

      if (tempArr.length !== 3 && tempArr.length !== 0) {
        widthArr.push(tempArr);
      }

      if (widthArr.length === 0) {
        throw new Error("invaild blocks");
      }

      widthArr.sort((a, b) => { return b.sum() - a.sum() });
      whiteBox.style.width = String(widthArr[0].sum() - widthArr[0].margin + (innerMargin * 2)) + ea;
      whiteBox.children[1].style.paddingRight = String(innerMargin - widthArr[0].margin) + ea;
      whiteBox.children[1].style.width = withOut(innerMargin + innerMargin - widthArr[0].margin, ea);
      whiteBox.children[1].style.paddingBottom = String(innerMargin - widthArr[0].margin) + ea;
      whiteBox.children[1].style.height = withOut(innerMargin + innerMargin - widthArr[0].margin, ea);

      refreshHeight = (widthArr.length * widthArr[0].height) + ((widthArr.length - 1) * widthArr[0].margin) + (innerMargin * 2);
      whiteBox.style.height = String(refreshHeight) + ea;

    }

  });

  talkIcon.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    e.stopPropagation();
    const { createNode, colorChip, withOut } = GeneralJs;
    const { belowHeight } = instance;
    const ea = "px";
    const zIndex = 5;
    const mother = document.getElementById("totalcontents");
    let margin;

    margin = 30;

    createNode({
      mother,
      style: {
        position: "fixed",
        top: String(0),
        left: String(0),
        width: String(100) + '%',
        height: withOut(belowHeight, ea),
        background: colorChip.black,
        zIndex: String(zIndex),
        animation: "justfadein 0.3s ease forwards",
      }
    });

    createNode({
      mother,
      style: {
        position: "fixed",
        top: String(margin) + ea,
        left: String(margin) + ea,
        width: withOut(margin * 2, ea),
        height: withOut(belowHeight + (margin * 2), ea),
        background: colorChip.black,
        zIndex: String(zIndex),
        animation: "fadeup 0.3s ease forwards",
        borderRadius: String(5) + "px",
        boxShadow: "0px 3px 15px -9px " + colorChip.black,
        overflow: "hidden",
      },
      children: [
        {
          mode: "iframe",
          attribute: [
            { src: window.location.protocol + "//" + window.location.host + "/service" }
          ],
          style: {
            position: "relative",
            width: String(100) + '%',
            height: String(100) + '%',
            border: String(0),
          }
        }
      ]
    });

  });

}

GeneralJs.prototype.grayLoading = function (mother = null, whiteMode = false) {
  if (typeof mother !== "object" || mother !== null) {
    throw new Error("input must be dom");
  }
  const instance = this;
  const { createNode, colorChip, withOut } = GeneralJs;
  let width, ea;
  let cancel, loading;

  ea = <%% "px", "px", "px", "px", "px" %%>;
  width = <%% 50, 50, 50, 50, 50 %%>;

  const GrayLoading = function (cancel, loading) {
    this.cancel = cancel;
    this.loading = loading;
  }

  GrayLoading.prototype.remove = function () {
    this.loading.parentElement.removeChild(this.loading);
    this.cancel.parentElement.removeChild(this.cancel);
  }

  if (mother === null || mother === undefined) {
    mother = document.body;
  }

  cancel = createNode({
    mother,
    style: {
      position: "fixed",
      top: String(0),
      left: String(0),
      width: String(100) + '%',
      height: String(100) + '%',
      background: !whiteMode ? colorChip.black : "transparent",
      zIndex: String(300),
      opacity: String(0.3),
    }
  });

  loading = createNode({
    mother,
    mode: "svg",
    source: this.returnLoading(),
    class: [ "loading" ],
    style: {
      position: "fixed",
      top: withOut(50, width / 2, ea),
      left: withOut(50, width / 2, ea),
      width: String(width) + ea,
      height: String(width) + ea,
      zIndex: String(300),
    }
  });

  return (new GrayLoading(cancel, loading));
}

GeneralJs.prototype.whiteProgressLoading = function (mother = null, emptyProgress = false, transparentBackground = false, frontMode = false) {
  const instance = this;
  const { createNode, colorChip, withOut } = GeneralJs;
  let width, ea;
  let cancel, loading;
  let progressBox;
  let progressWidth;
  let zIndex;
  let progressSize, progressWeight;
  let progressHeight;
  let progressPadding;

  zIndex = 300;

  ea = <%% "px", "px", "px", "px", "vw" %%>;
  width = <%% 50, 50, 48, 40, 10 %%>;
  progressWidth = <%% 200, 200, 200, 200, 20 %%>;
  progressHeight = <%% 40, 40, 36, 32, 4 %%>;
  progressSize = <%% 17, 17, 17, 15, 3.5 %%>;
  progressWeight = <%% 400, 400, 400, 400, 400 %%>;
  progressPadding = <%% 20, 20, 20, 17, 3.9 %%>;

  const WhiteLoading = function (cancel, loading, progress) {
    this.cancel = cancel;
    this.loading = loading;
    this.progress = progress;
  }

  WhiteLoading.prototype.remove = function () {
    this.loading.parentElement.removeChild(this.loading);
    this.cancel.parentElement.removeChild(this.cancel);
    this.progress.parentElement.removeChild(this.progress);
  }

  if (mother === null || mother === undefined) {
    mother = document.body;
  }

  cancel = createNode({
    mother,
    style: {
      position: "fixed",
      top: String(0),
      left: String(0),
      width: String(100) + '%',
      height: String(100) + '%',
      background: transparentBackground ? "transparent" : colorChip.white,
      zIndex: String(zIndex),
      opacity: String(0.7),
    }
  });

  loading = createNode({
    mother,
    mode: "svg",
    source: this.returnLoading(),
    class: [ "loading" ],
    style: {
      position: "fixed",
      top: !frontMode ? withOut(50, (width / 2) + progressPadding, ea) : "calc(" + String(instance.naviHeight) + "px" + " + calc(calc(calc(100% - " + String(instance.naviHeight) + "px" + ") / 2) - " + String((width / 2) + progressPadding) + ea + "))",
      left: withOut(50, width / 2, ea),
      width: String(width) + ea,
      height: String(width) + ea,
      zIndex: String(zIndex),
    }
  });

  progressBox = createNode({
    mother,
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "fixed",
      height: String(progressHeight) + ea,
      width: String(progressWidth) + ea,
      top: !frontMode ? withOut(50, (progressHeight / 2) - progressPadding, ea) : "calc(" + String(instance.naviHeight) + "px" + " + calc(calc(calc(100% - " + String(instance.naviHeight) + "px" + ") / 2) - " + String((progressHeight / 2) - progressPadding) + ea + "))",
      left: withOut(50, progressWidth / 2, ea),
      zIndex: String(zIndex),
    },
    child: {
      text: "0%",
      style: {
        display: emptyProgress ? "none" : "inline-block",
        position: "relative",
        fontSize: String(progressSize) + ea,
        fontWeight: String(progressWeight),
        fontFamily: "graphik",
        color: colorChip.green,
      }
    }
  })

  return (new WhiteLoading(cancel, loading, progressBox));
}

GeneralJs.prototype.setMemory = async function (obj) {
  const instance = this;
  try {
    if (typeof obj !== "object" || obj === null) {
      throw new Error("invalid input");
    }
    if (obj.property === undefined) {
      throw new Error("invalid preperty");
    }
    const memoryKeywords = "____memory____";
    const thisKey = memoryKeywords + obj.property;
    window.localStorage.setItem(thisKey, JSON.stringify(obj));
  } catch (e) {
    console.log(e);
  }
}

GeneralJs.prototype.getMemory = async function () {
  class MemoryArr extends Array {
    constructor() {
      super();
    }
    findProperty(property) {
      let result;
      result = null;
      for (let obj of this) {
        if (obj.property === property) {
          result = obj;
          break;
        }
      }
      return result;
    }
  }
  try {
    const storage = window.localStorage;
    let result, thisValue;
    result = new MemoryArr();
    for (let key in storage) {
      if (/^____memory____/g.test(key)) {
        thisValue = JSON.parse(window.localStorage.getItem(key));
        result.push(thisValue)
      }
    }
    return result;
  } catch (e) {
    console.log(e);
    return null;
  }
}

GeneralJs.prototype.insertMemory = async function (property, popupMode = false) {
  const instance = this;
  const baseBlockClassName = "baseBlockClassName";
  const inputClassName = "inputClassName";
  const variableBarClassName = "variableBarClassName";
  const whitePopupBaseBlockClassName = "whitePopupBaseBlockClassName";
  const whitePopupInputClassName = "whitePopupInputClassName";
  const dom = GeneralJs.findByAttribute((!popupMode ? document.querySelectorAll('.' + baseBlockClassName) : document.querySelectorAll('.' + whitePopupBaseBlockClassName)), "baseclass", property);
  try {
    let nodeName;
    let target;
    let valueMemory;
    let targetMemory;
    let targetsAll, targets;
    let valuesArr, ratio, bar;
  
    valueMemory = await instance.getMemory();
    if (valueMemory !== null && typeof valueMemory.findProperty === "function") {
      targetMemory = valueMemory.findProperty(property);
      nodeName = dom.nodeName;
    
      if (targetMemory !== null) {
    
        if (targetMemory.type === "text") {
          if (/INPUT/gi.test(nodeName) || /TEXTAREA/gi.test(nodeName)) {
            target = dom;
          } else {
            target = dom.querySelector('.' + (!popupMode ? inputClassName : whitePopupInputClassName));
          }

          target.value = targetMemory.value;
        } else if (targetMemory.type === "radio") {
    
          targetsAll = [ ...dom.querySelectorAll("." + (!popupMode ? inputClassName : whitePopupInputClassName)) ];
          targets = targetsAll.filter((d) => { return d.getAttribute("property") === property });
    
          for (let i = 0; i < targets.length; i++) {
            if (targetMemory.value[i] === 1) {
              targets[i].setAttribute("toggle", "on");
              targets[i].children[0].style.opacity = String(0);
              targets[i].children[1].style.opacity = String(1);
              targets[i].children[2].style.color = GeneralJs.colorChip.green;
            } else {
              targets[i].setAttribute("toggle", "off");
              targets[i].children[0].style.opacity = String(1);
              targets[i].children[1].style.opacity = String(0);
              targets[i].children[2].style.color = GeneralJs.colorChip.black;
            }
          }
    
        } else if (targetMemory.type === "bar") {
    
          if (/ASIDE/gi.test(nodeName)) {
            target = dom;
          } else {
            target = dom.querySelector('.' + (!popupMode ? inputClassName : whitePopupInputClassName));
          }
    
          ({ valuesArr, ratio } = targetMemory.value);
          bar = target.querySelector("." + variableBarClassName);
    
          bar.style.width = String(ratio * 100) + '%';
          target.setAttribute("ratio", String(ratio));
          target.setAttribute("value", valuesArr[Math.round((valuesArr.length - 1) * ratio)].value);
    
        }
    
      } else {
        if (/INPUT/gi.test(nodeName) || /TEXTAREA/gi.test(nodeName)) {
          target = dom;
        } else {
          target = dom.querySelector('.' + (!popupMode ? inputClassName : whitePopupInputClassName));
        }
        if (/INPUT/gi.test(target.nodeName) || /TEXTAREA/gi.test(target.nodeName)) {
          target.value = "";
        }
      }
    }

  } catch (e) {
    console.log(e);
  }
}

GeneralJs.prototype.insertMemories = async function (propertyArr, popupMode = false) {
  const instance = this;
  try {
    GeneralJs.setQueue(async () => {
      try {
        for (let property of propertyArr) {
          try {
            await instance.insertMemory(property, popupMode);
          } catch {}
        }
      } catch (e) {
        console.log(e);
      }
    });
  } catch (e) {
    console.log(e);
  }
}

GeneralJs.prototype.consultingPopup = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, ajaxJson, homeliaisonAnalytics, equalJson } = GeneralJs;
  const { ea, naviHeight } = this;
  const media = GeneralJs.stacks.updateMiddleMedialQueryConditions;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const whitePopupClassName = "whitePopupClassName";
  const whitePopupBaseBlockClassName = "whitePopupBaseBlockClassName";
  const inputClassName = "whitePopupInputClassName";
  const agreeTargetClassName = "agreeTargetClassName";
  const variableBarClassName = "variableBarClassName";
  const totalContents = document.getElementById("totalcontents");
  const zIndex = 4;
  return (e) => {
    let grayBack, whiteBase;
    let whiteWidth;
    let whiteMargin;
    let innerMargin;
    let contentsTong;
    let titleArea, formArea, paymentArea;
    let titleHeight, formHeight, paymentHeight;
    let titleSize, titleWeight, titleLineHeight, titleTop;
    let formPaddingTop;
    let formBox;
    let circleRadius;
    let circleTop;
    let circleBetween;
    let grayTop;
    let grayInputTop;
    let grayHeight;
    let grayBigHeight;
    let grayTextAreaTop;
    let grayTextAreaWidth;
    let moduleHeight;
    let blockMarginBottom;
    let mainSize;
    let mainWeight;
    let mainTop;
    let inputSize;
    let inputWeight;
    let inputIndent;
    let leftGrayType0;
    let leftGrayType1;
    let leftGrayType2;
    let leftGrayType3;
    let widthGrayType0;
    let widthGrayType1;
    let widthGrayType2;
    let widthGrayType3;
    let addressWidth;
    let addressSize;
    let addressWeight;
    let addressTop;
    let marginRatio;
    let textareaTop;
    let textareaLeft;
    let grayLineBlockFontSize;
    let grayLineBlockFontWeight;
    let grayLineBlockFontTop;
    let policyInnerPadding;
    let policyTong;
    let policyTextSize;
    let agreeSize, agreeWeight, agreeCircleBetween, agreeCircleTop;
    let paymentAmountSize, paymentAmountWeight, paymentAmountTop, paymentAmountBetween;
    let paymentButtonSize, paymentButtonWeight, paymentButtonTop, paymentButtonPaddingTop, paymentButtonPaddingBottom, paymentButtonPaddingLeft;
    let whiteMaxHeight;
    let addressPromptWidth;
    let addressPromptHeight;
    let agreeEvent;
    let oidConst;
    let paymentAmountSizeSub;
    let checkboxWidth;
    let checkboxTop;
    let checkboxBetween;
    let checkboxWeight;
    let leftCheck0;
    let leftCheck1;
    let pyeongNumberEvent;
    let pyeongBlurEvent;
    let pyeongFocusEvent;
    let livingDownEvent;
    let livingAlertEvent;
    let checkboxClickEvent0;
    let calendarViewEvent;
    let calendarWidth;
    let calendarTop;
    let mobileTongPaddingTop;
    let mobileFactorPaddingLeft;
    let mobileFactorCheckWidth;
    let mobileFactorCheckTop;
    let mobileFactorBetween;
    let mobileFactorBetween2;
    let mobileFactorBetween3;
    let mobileFactorPaddingBotom;
    let mobileCheckBoxLeft1;
    let mobileCheckBoxLeft2;
    let mobileCheckBoxLeft3;
    let mobileCheckBoxLeft4;
    let mobileCheckBoxMainSize;
    let mobileCheckBoxMainTop;
    let greenNoticeSize;
    let greenNoticeWeight;
    let greenNoticePaddingTop;
    let greenNoticePaddingBottom;
    let greenNoticePaddingLeft;
    let greenNoticeBottom;
    let greenNoticeBottom2;
    let greenNoticeLineHeight;
    let greenNoticeWidth0;
    let greenNoticeWidth1;
    let addressButtonEvent;
    let addressBlurEvent;
    let addressFocusEvent;
    let commentsFocusEvent;
    let commentsBlurEvent;
    let greenNoticeWidth3;
    let greenNoticeBottom3;
    let barDescriptionLingHeight;
    let barDescriptionTextTop;
    let barDescriptionSubSize;
    let barTongHeight;
    let barTongMarginTop;
    let barTop;
    let barHeight;
    let barFactorWeight;
    let barFactorTop;
    let barCircleTop;
    let barCircleRadius;
    let barFactorA0Left;
    let barFactorA1Left;
    let barFactorA2Left;
    let barFactorB0Left;
    let mobileGrayTextAreaTop;
    let defaultRatio;
    let budgetValues;
    let furnitureValues;
    let barClickEvent;
    let descriptionSize;
    let descriptionWeight;
    let descriptionLineHeight;
    let descriptionMarginTop;
    let descriptionBoldWeight;
    let textAreaBlockHeight;

    whiteWidth = <%% 990, 980, 710, 660, 88 %%>;
    whiteMargin = <%% 54, 54, 54, 54, 6 %%>;
    innerMargin = <%% 54, 54, 54, 54, 6 %%>;

    whiteMaxHeight = 900;

    titleHeight = <%% 41, 39, 37, 28, 8 %%>;
    paymentHeight = <%% 70, 70, 70, 70, 14 %%>;

    titleSize = <%% 27, 26, 24, 21, 4 %%>;
    titleWeight = <%% 700, 700, 700, 700, 700 %%>;
    titleLineHeight = <%% 1.4, 1.4, 1.4, 1.4, 1.4 %%>;
    titleTop = <%% (isMac() ? -10 : -7), (isMac() ? -10 : -7), (isMac() ? -10 : -7), (isMac() ? -10 : -7), -0.2 %%>;

    formPaddingTop = <%% 40, 40, 40, 40, 6 %%>;

    circleRadius = <%% 2.5, 2.5, 2, 2, 0.5 %%>;
    circleTop = <%% 12, 12, 11, 10.5, (isIphone() ? 2.9 : 2.7) %%>;
    circleBetween = <%% 6, 6, 5, 5, 1.3 %%>;

    grayTop = <%% 0, 0, 0, 0, 0 %%>;
    grayInputTop = <%% (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), -0.2 %%>;
    grayHeight = <%% 32, 32, 31, 31, 7 %%>;
    grayBigHeight = <%% 156, 137, 136, 135, 38 %%>;
    grayTextAreaTop = <%% 0, 0, 0, 0, 0 %%>;
    grayTextAreaWidth = <%% 51.7, 51.7, 51.7, 390, 51.7 %%>;

    moduleHeight = grayTop + grayHeight;
    blockMarginBottom = <%% 12, 12, 9, 9, 2 %%>;

    mainSize = <%% 20, 18, 17, 16, 4 %%>;
    mainWeight = <%% 500, 500, 500, 500, 500 %%>;
    mainTop = <%% (isMac() ? 0 : 3), (isMac() ? 2 : 4), (isMac() ? 2 : 4), (isMac() ? 2 : 4), 0.5 %%>;
    inputSize = <%% 13, 13, 12, 12, 3 %%>;
    inputWeight = <%% 400, 400, 400, 400, 400 %%>;
    inputIndent = <%% 10, 10, 10, 10, 2.5 %%>;

    leftGrayType0 = <%% 101, 90, 78, 78, 18 %%>;
    leftGrayType1 = <%% 418, 361, 318, 96, 22.8 %%>;
    leftGrayType2 = <%% 125, 115, 99, 98, 22.8 %%>;
    leftGrayType3 = <%% 164, 151, 130, 129, 30.5 %%>;

    widthGrayType0 = <%% 160, 140, 130, 150, 34 %%>;
    widthGrayType1 = <%% 455, 329, 283, 403, 58 %%>;
    widthGrayType2 = <%% 757, 757, 503, 454, 53.2 %%>;
    widthGrayType3 = <%% 392, 268, 231, 352, 45.5 %%>;

    addressWidth = <%% 54, 54, 46, 46, 11 %%>;
    addressSize = <%% 13, 13, 12, 12, 3 %%>;
    addressWeight = <%% 600, 600, 600, 600, 600 %%>;
    addressTop = <%% (isMac() ? 5 : 7), (isMac() ? 5 : 7), (isMac() ? 5 : 7), (isMac() ? 5 : 7), 1.2 %%>;

    marginRatio = <%% 0.5, 0.5, 0.5, 0.5, 0.5 %%>;

    textareaTop = <%% 10, 10, 10, 10, 2 %%>;
    textareaLeft = <%% 15, 15, 15, 15, 2.5 %%>;

    grayLineBlockFontSize = <%% 14, 12, 12, 12, 3 %%>;
    grayLineBlockFontWeight = <%% 400, 400, 400, 300, 400 %%>;
    grayLineBlockFontTop = <%% 15, 15, 15, 15, 15 %%>;

    policyInnerPadding = <%% 16, 16, 16, 16, 4 %%>;
    policyTextSize = <%% 10, 10, 10, 10, 2.5 %%>;

    agreeCircleBetween = <%% 5, 5, 5, 5, 1 %%>;
    agreeCircleTop = <%% 8, 8, 8, 8, 1.7 %%>;
    agreeSize = <%% 14, 14, 14, 14, 3 %%>;
    agreeWeight = <%% 600, 600, 600, 600, 600 %%>;

    paymentButtonSize = <%% 17, 17, 16, 16, 3.2 %%>;
    paymentButtonWeight = <%% 600, 600, 600, 600, 600 %%>;
    paymentButtonTop = <%% 12, 12, 12, 12, 3 %%>;
    paymentButtonPaddingTop = <%% (isMac() ? 8 : 10), (isMac() ? 8 : 10), (isMac() ? 8 : 10), (isMac() ? 8 : 10), 2 %%>;
    paymentButtonPaddingBottom = <%% (isMac() ? 10 : 9), (isMac() ? 10 : 9), (isMac() ? 10 : 9), (isMac() ? 10 : 9), 2.5 %%>;
    paymentButtonPaddingLeft = <%% 18, 18, 18, 18, 3.5 %%>;

    addressPromptWidth = <%% 600, 520, 480, 400, 80 %%>;
    addressPromptHeight = <%% 450, 450, 450, 450, 90 %%>;

    checkboxWidth = <%% 9, 9, 9, 8, 2 %%>;
    checkboxTop = <%% (isMac() ? 9 : 10), (isMac() ? 9 : 9), (isMac() ? 9 : 9), (isMac() ? 9 : 9), (isIphone() ? 2.5 : 2.5) %%>;
    checkboxBetween = <%% 8, 8, 8, 6, 1.5 %%>;
    checkboxWeight = <%% 300, 300, 300, 300, 300 %%>;

    leftCheck0 = <%% 125, 115, 99, 98, 22.8 %%>;
    leftCheck1 = <%% 195, 179, 157, 152, 36.5 %%>;

    calendarWidth = <%% 260, 250, 230, 210, 56 %%>;
    calendarTop = <%% 41, 41, 41, 40, 8.2 %%>;

    mobileTongPaddingTop = <%% 0.7, 0.7, 0.7, 0.7, 0.7 %%>;
    mobileFactorPaddingLeft = <%% 3, 3, 3, 15, 3 %%>;
    mobileFactorCheckWidth = <%% 1.8, 1.8, 1.8, 8, 1.8 %%>;
    mobileFactorCheckTop = <%% 1.35, 1.35, 1.35, 6, (isIphone() ? 1.6 : 1.4) %%>;
    mobileFactorBetween = <%% 4.2, 4.2, 4.2, 19, 4.2 %%>;
    mobileFactorBetween2 = <%% 3.2, 3.2, 3.2, 36.5, 3.2 %%>;
    mobileFactorBetween3 = <%% 4.6, 4.6, 4.6, 16.5, 4.6 %%>;
    mobileFactorPaddingBotom = <%% 1.9, 1.9, 1.9, 6, 1.9 %%>;

    mobileCheckBoxLeft1 = <%% 34, 34, 34, 145, 34 %%>;
    mobileCheckBoxLeft2 = <%% 46, 46, 46, 197, 46 %%>;
    mobileCheckBoxLeft3 = <%% 58, 58, 58, 250, 58 %%>;
    mobileCheckBoxLeft4 = <%% 45, 45, 45, 181, 45 %%>;

    mobileCheckBoxMainSize = <%% 3.8, 3.8, 3.8, 15, 3.8 %%>;
    mobileCheckBoxMainTop = <%% 0.7, 0.7, 0.7, 1.5, 1 %%>;

    greenNoticeSize = <%% 12, 12, 11, 11, 2.8 %%>;
    greenNoticeWeight = <%% 600, 600, 600, 600, 600 %%>;
    greenNoticePaddingTop = <%% (isMac() ? 8 : 9), (isMac() ? 8 : 9), (isMac() ? 7 : 9), (isMac() ? 7 : 9), 1.9 %%>;
    greenNoticePaddingBottom = <%% (isMac() ? 9 : 7), (isMac() ? 9 : 7), (isMac() ? 8 : 7), (isMac() ? 8 : 7), 2.3 %%>;
    greenNoticePaddingLeft = <%% 11, 11, 10, 10, 2.4 %%>;
    greenNoticeBottom = <%% 40, 40, 40, 40, 9 %%>;
    greenNoticeBottom2 = <%% 36, 36, 36, 36, 9 %%>;
    greenNoticeLineHeight = <%% 1.4, 1.4, 1.4, 1.4, 1.4 %%>;
    greenNoticeWidth0 = <%% 96, 96, 96, 96, 28 %%>;
    greenNoticeWidth1 = <%% 120, 120, 120, 120, 28 %%>;
    greenNoticeWidth3 = <%% 210, 210, 190, 190, 48.5 %%>;
    greenNoticeBottom3 = <%% 164, 144, 144, 142, 40 %%>;

    descriptionSize = <%% 15, 15, 13, 13, 3 %%>;
    descriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
    descriptionLineHeight = <%% 1.7, 1.7, 1.7, 1.7, 1.66 %%>;
    descriptionMarginTop = <%% 10, 10, 8, 6, 10 %%>;
    descriptionBoldWeight = <%% 700, 700, 700, 700, 700 %%>;  

    barDescriptionLingHeight = <%% 1.4, 1.4, 1.4, 1.4, 1.4 %%>
    barDescriptionTextTop = <%% (isMac() ? 0 : 2), (isMac() ? 1 : 3), (isMac() ? 2 : 4), (isMac() ? 1 : 3), (isIphone() ? 0.8 : 0.6) %%>;
    barDescriptionSubSize = <%% 13, 13, 11, 11, 2.6 %%>;
  
    barTongHeight = <%% 50, 48, 40, 40, 12 %%>;
    barTongMarginTop = <%% 12, 10, 10, 8, 3.4 %%>;
  
    barTop = <%% 28, 28, 24, 21, 5 %%>;
    barHeight = <%% 9, 9, 9, 9, 2 %%>;
    barFactorWeight = <%% 700, 700, 700, 700, 700 %%>;
    barFactorTop = <%% (isMac() ? 3 : 4), (isMac() ? 3 : 4), (isMac() ? 2 : 3), (isMac() ? 1 : 2), 0 %%>;
  
    barCircleTop = <%% 26, 26, 23, 20, 4.7 %%>;
    barCircleRadius = <%% 6, 6, 5, 5, 1.2 %%>
  
    barFactorA0Left = <%% 183, 183, 122, 109, 18.6 %%>;
    barFactorA1Left = <%% 349, 349, 227, 200, 33.6 %%>;
    barFactorA2Left = <%% 518, 518, 341, 299, 49.4 %%>;
  
    barFactorB0Left = <%% 332, 332, 211, 186, 28.6 %%>;
  
    mobileGrayTextAreaTop = 7.8;
  
    defaultRatio = 0.5;

    textAreaBlockHeight = <%% 156, 136, 133, 130, 44.2 %%>;

    budgetValues = [
      { title: (desktop ? "1,000만원 이하" : "1천만원 이하"), value: "1,000만원", },
      { title: (desktop ? "2,000만원" : "2천만원"), value: "2,000만원", },
      { title: (desktop ? "3,000만원" : "3천만원"), value: "3,000만원", },
      { title: (desktop ? "4,000만원" : "4천만원"), value: "4,000만원", },
      { title: (desktop ? "5,000만원" : "5천만원"), value: "5,000만원 이상", },
      { title: (desktop ? "6,000만원" : "6천만원"), value: "6,000만원 이상", },
      { title: (desktop ? "7,000만원" : "7천만원"), value: "7,000만원 이상", },
      { title: (desktop ? "8,000만원" : "8천만원"), value: "8,000만원 이상", },
      { title: "1억원 이상", value: "1억원 이상", },
    ];
  
    furnitureValues = [
      { title: "재배치", value: "재배치", },
      { title: "재배치 + 일부 구매", value: "일부 구매", },
      { title: "전체 구매", value: "전체 구매", },
    ];
  
    barClickEvent = (arr, property) => {
      const valuesArr = equalJson(JSON.stringify(arr));
      return function (e) {
        const bar = this.querySelector("." + variableBarClassName);
        const box = this.getBoundingClientRect();
        let thisLength;
        let ratio;
  
        thisLength = e.x - box.x;
        ratio = Math.round((thisLength / box.width) * 1000000) / 1000000;
  
        bar.style.width = String(ratio * 100) + '%';
        this.setAttribute("ratio", String(ratio));
        this.setAttribute("value", valuesArr[Math.round((valuesArr.length - 1) * ratio)].value);

        instance.setMemory({
          property: property,
          type: "bar",
          value: { valuesArr, ratio },
        }).catch((err) => { console.log(err) });
      }
    }

    homeliaisonAnalytics({
      page: instance.pageName,
      standard: instance.firstPageViewTime,
      action: "popupOpen",
      data: {
        href: window.encodeURIComponent(window.location.href),
        date: dateToString(new Date(), true),
      },
    }).catch((err) => {
      console.log(err);
    });

    addressButtonEvent = async function (e) {
      try {
        const totalContents = document.getElementById("totalcontents");
        const removeTargets = "removeTargets";
        const zIndex = 4;
        let cancelBack, whitePrompt;

        GeneralJs.stacks["addressEvent"] = async function (e) {
          try {
            if (typeof e.data === "string") {
              findByAttribute(document.querySelectorAll('.' + inputClassName), "property", "address0").value = e.data.trim();
              findByAttribute(document.querySelectorAll('.' + inputClassName), "property", "address1").value = '';
              findByAttribute(document.querySelectorAll('.' + inputClassName), "property", "address1").focus();
              instance.setMemory({
                property: "address0",
                type: "text",
                value: e.data.trim(),
              }).catch((err) => { console.log(err) });
            }
            const targets = document.querySelectorAll('.' + removeTargets);
            for (let dom of targets) {
              dom.remove();
            }
            window.removeEventListener("message", GeneralJs.stacks["addressEvent"]);
            GeneralJs.stacks["addressEvent"] = null;
          } catch (e) {
            await GeneralJs.ajaxJson({ message: "ClientConsultingJs.addressEvent : " + e.message }, BACKHOST + "/errorLog");
          }
        }
        window.addEventListener("message", GeneralJs.stacks["addressEvent"]);

        cancelBack = createNode({
          mother: totalContents,
          class: [ removeTargets ],
          event: {
            click: (e) => {
              const targets = document.querySelectorAll('.' + removeTargets);
              for (let dom of targets) {
                dom.remove();
              }
              if (GeneralJs.stacks["addressEvent"] !== null && GeneralJs.stacks["addressEvent"] !== undefined) {
                window.removeEventListener("message", GeneralJs.stacks["addressEvent"]);
                GeneralJs.stacks["addressEvent"] = null;
              }
            }
          },
          style: {
            position: "fixed",
            top: String(0),
            left: String(0),
            zIndex: String(zIndex),
            width: String(100) + '%',
            height: String(100) + '%',
            background: "transparent",
          }
        });

        whitePrompt = createNode({
          mother: totalContents,
          class: [ removeTargets ],
          event: {
            click: (e) => { e.stopPropagation() }
          },
          style: {
            position: "fixed",
            left: "calc(50% - " + String(addressPromptWidth / 2) + ea + ")",
            top: "calc(50% - " + String(addressPromptHeight / 2) + ea + ")",
            width: String(addressPromptWidth) + ea,
            height: String(addressPromptHeight) + ea,
            zIndex: String(zIndex),
            background: colorChip.white,
            borderRadius: String(3) + "px",
            boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
            animation: "fadeuphard 0.3s ease forwards",
            overflow: "hidden",
          },
          children: [
            {
              mode: "iframe",
              attribute: [
                { src: FRONTHOST + "/engine/address.php" },
                { width: String(100) + '%' },
                { height: String(100) + '%' },
              ],
              style: {
                position: "absolute",
                top: String(0) + ea,
                left: String(0) + ea,
                border: String(0),
              }
            }
          ]
        });

      } catch (e) {
        console.log(e);
      }
    }

    addressBlurEvent = function (e) {
      const self = this;
      const mother = this.previousElementSibling;
      const targets = [ ...mother.children ];
      for (let dom of targets) {
        dom.remove();
      }
      instance.setMemory({
        property: "address1",
        type: "text",
        value: this.value,
      }).catch((err) => { console.log(err) });
      if (this.value !== '') {
        homeliaisonAnalytics({
          page: instance.pageName,
          standard: instance.firstPageViewTime,
          action: "inputBlur",
          data: {
            property: "address1",
            value: this.value,
            date: dateToString(new Date(), true),
          },
        }).catch((err) => {
          console.log(err);
        });
      }
    }

    addressFocusEvent = function (e) {
      const self = this;
      const mother = this.previousElementSibling;

      this.value = this.value.replace(/[\=\+\?\#\&]/gi, '');

      createNode({
        mode: "aside",
        mother,
        style: {
          position: "relative",
          top: String(0),
          left: String(0),
          width: String(100) + '%',
          height: String(100) + '%',
          textAlign: "center",
        },
        children: [
          {
            text: "주소는 인테리어를 받으실 곳으로 적어주세요!",
            style: {
              position: "absolute",
              width: String(greenNoticeWidth1) + ea,
              left: "calc(50% - " + String((greenNoticeWidth1 / 2) + greenNoticePaddingLeft) + ea + ")",
              background: colorChip.gradientGreen,
              fontSize: String(greenNoticeSize) + ea,
              fontWeight: String(greenNoticeWeight),
              color: colorChip.white,
              paddingTop: String(greenNoticePaddingTop) + ea,
              paddingBottom: String(greenNoticePaddingBottom) + ea,
              paddingLeft: String(greenNoticePaddingLeft) + ea,
              paddingRight: String(greenNoticePaddingLeft) + ea,
              bottom: String(greenNoticeBottom) + ea,
              borderRadius: String(5) + "px",
              boxShadow: "0px 3px 13px -9px " + colorChip.shadow,
              animation: "fadeuplite 0.3s ease forwards",
              lineHeight: String(greenNoticeLineHeight),
            }
          }
        ]
      });

    }

    commentsFocusEvent = function (e) {
      const self = this;
      const mother = this.previousElementSibling;
  
      this.value = this.value.replace(/[\=\+\?\#\&]/gi, '');
  
      createNode({
        mode: "aside",
        mother,
        style: {
          position: "relative",
          top: String(0),
          left: String(0),
          width: String(100) + '%',
          height: String(100) + '%',
          textAlign: "center",
        },
        children: [
          {
            text: "(예시)\n=> 시공: 도배, 조명만 부분적으로 원해요.\n=> 스타일링: 가구, 패브릭, 소품 전체 구매\n=> 예산: 최대 00만원 이내로 하고 싶어요.",
            style: {
              position: "absolute",
              width: String(greenNoticeWidth3) + ea,
              left: "calc(50% - " + String((greenNoticeWidth3 / 2) + greenNoticePaddingLeft) + ea + ")",
              background: colorChip.gradientGreen,
              fontSize: String(greenNoticeSize) + ea,
              fontWeight: String(greenNoticeWeight),
              color: colorChip.white,
              paddingTop: String(greenNoticePaddingTop) + ea,
              paddingBottom: String(greenNoticePaddingBottom) + ea,
              paddingLeft: String(greenNoticePaddingLeft) + ea,
              paddingRight: String(greenNoticePaddingLeft) + ea,
              bottom: String(greenNoticeBottom3) + ea,
              borderRadius: String(5) + "px",
              boxShadow: "0px 3px 13px -9px " + colorChip.shadow,
              animation: "fadeuplite 0.3s ease forwards",
              lineHeight: String(greenNoticeLineHeight),
              textAlign: "left",
            }
          }
        ]
      });
  
    }
  
    commentsBlurEvent = function (e) {
      const self = this;
      const mother = this.previousElementSibling;
      const targets = [ ...mother.children ];
      for (let dom of targets) {
        dom.remove();
      }
      this.value = this.value.replace(/[\=\+\?\#\&]/gi, '');
      instance.setMemory({
        property: "etc",
        type: "text",
        value: this.value,
      }).catch((err) => { console.log(err) });
      if (this.value !== '') {
        homeliaisonAnalytics({
          page: instance.pageName,
          standard: instance.firstPageViewTime,
          action: "inputBlur",
          data: {
            property: "etc",
            value: this.value,
            date: dateToString(new Date(), true),
          },
        }).catch((err) => {
          console.log(err);
        });
      }
    }

    pyeongNumberEvent = function (e) {
      this.value = this.value.replace(/[^0-9\.]/gi, '');
    }

    pyeongBlurEvent = function (e) {
      const self = this;
      const mother = this.previousElementSibling;
      const targets = [ ...mother.children ];
      for (let dom of targets) {
        dom.remove();
      }
      if (this.value.replace(/[^0-9\.]/gi, '').trim() === '') {
        this.value = "00평";
      } else {
        this.value = this.value.replace(/[^0-9\.]/gi, '') + "평";
      }
      instance.setMemory({
        property: "pyeong",
        type: "text",
        value: this.value,
      }).catch((err) => { console.log(err) });
      if (this.value !== "00평" && this.value !== '') {
        homeliaisonAnalytics({
          page: instance.pageName,
          standard: instance.firstPageViewTime,
          action: "inputBlur",
          data: {
            property: "pyeong",
            value: this.value,
            date: dateToString(new Date(), true),
          },
        }).catch((err) => {
          console.log(err);
        });
      }
    }

    pyeongFocusEvent = function (e) {
      const self = this;
      const mother = this.previousElementSibling;

      this.value = this.value.replace(/[^0-9\.]/gi, '');

      createNode({
        mode: "aside",
        mother,
        style: {
          position: "relative",
          top: String(0),
          left: String(0),
          width: String(100) + '%',
          height: String(100) + '%',
          textAlign: "center",
        },
        children: [
          {
            text: "평수는 반드시 분양 평수(공급 평수)로 적어주세요!",
            style: {
              position: "absolute",
              width: String(greenNoticeWidth0) + ea,
              left: "calc(50% - " + String((greenNoticeWidth0 / 2) + greenNoticePaddingLeft) + ea + ")",
              background: colorChip.gradientGreen,
              fontSize: String(greenNoticeSize) + ea,
              fontWeight: String(greenNoticeWeight),
              color: colorChip.white,
              paddingTop: String(greenNoticePaddingTop) + ea,
              paddingBottom: String(greenNoticePaddingBottom) + ea,
              paddingLeft: String(greenNoticePaddingLeft) + ea,
              paddingRight: String(greenNoticePaddingLeft) + ea,
              bottom: String(greenNoticeBottom) + ea,
              borderRadius: String(5) + "px",
              boxShadow: "0px 3px 13px -9px " + colorChip.shadow,
              animation: "fadeuplite 0.3s ease forwards",
              lineHeight: String(greenNoticeLineHeight),
            }
          }
        ]
      });

    }

    livingDownEvent = function (id) {
      GeneralJs.stacks["currentLivingAlertId"] = null;
      if (document.getElementById(id) !== null) {
        document.getElementById(id).style.animation = "fadedownlite 0.3s ease forwards";
        setQueue(() => {
          if (document.getElementById(id) !== null) {
            document.getElementById(id).parentElement.removeChild(document.getElementById(id));
          }
        }, 301);
      }
    }

    livingAlertEvent = function (mother) {

      // const tempId = uniqueValue("hex");
      const moveinTarget = [ ...document.querySelectorAll("." + inputClassName) ].find((dom) => { return dom.getAttribute("property") === "movein" });
      // createNode({
      //   mode: "aside",
      //   mother,
      //   id: tempId,
      //   style: {
      //     position: "absolute",
      //     top: String(0),
      //     left: String(0),
      //     width: String(100) + '%',
      //     height: String(100) + '%',
      //     textAlign: "center",
      //   },
      //   children: [
      //     {
      //       text: "거주중일 시, 보관 이사가 없다면 도배와 필름 제외 시공이 어렵습니다!",
      //       style: {
      //         position: "absolute",
      //         width: String(greenNoticeWidth1) + ea,
      //         left: "calc(50% - " + String((greenNoticeWidth1 / 2) + (greenNoticePaddingLeft / 2)) + ea + ")",
      //         background: colorChip.gradientGreen,
      //         fontSize: String(greenNoticeSize) + ea,
      //         fontWeight: String(greenNoticeWeight),
      //         color: colorChip.white,
      //         paddingTop: String(greenNoticePaddingTop) + ea,
      //         paddingBottom: String(greenNoticePaddingBottom) + ea,
      //         paddingLeft: String(greenNoticePaddingLeft) + ea,
      //         paddingRight: String(greenNoticePaddingLeft) + ea,
      //         bottom: String(greenNoticeBottom2) + ea,
      //         borderRadius: String(5) + "px",
      //         boxShadow: "0px 3px 13px -9px " + colorChip.shadow,
      //         animation: "fadeuplite 0.3s ease forwards",
      //         lineHeight: String(greenNoticeLineHeight),
      //       }
      //     }
      //   ]
      // });
      if (moveinTarget.value.trim() === '') {
        moveinTarget.value = dateToString(new Date());
      }
      // GeneralJs.stacks["currentLivingAlertId"] = tempId;
      // setQueue(() => {
      //   livingDownEvent(tempId);
      // }, 5 * 1000);

    }

    checkboxClickEvent0 = async function (e) {
      try {
        const property = this.getAttribute("property");
        const toggle = this.getAttribute("toggle");
        const targetsAll = [ ...document.querySelectorAll("." + inputClassName) ];
        const targets = targetsAll.filter((dom) => { return dom.getAttribute("property") === property });
        let valueArr, index;
        valueArr = new Array(targets.length);
        index = 0;
        for (let dom of targets) {
          if (dom === this) {
            if (/거주중/gi.test(dom.children[2].textContent)) {
              livingAlertEvent(dom);
            }
            dom.setAttribute("toggle", "on");
            dom.children[0].style.opacity = String(0);
            dom.children[1].style.opacity = String(1);
            dom.children[2].style.color = colorChip.green;
            valueArr[index] = 1;
          } else {
            dom.setAttribute("toggle", "off");
            dom.children[0].style.opacity = String(1);
            dom.children[1].style.opacity = String(0);
            dom.children[2].style.color = colorChip.black;
            valueArr[index] = 0;
          }
          index++;
        }
        instance.setMemory({
          property: property,
          type: "radio",
          value: valueArr,
        }).catch((err) => { console.log(err) });
      } catch (e) {
        console.log(e);
      }
    }

    calendarViewEvent = async function (e) {
      try {
        this.blur();
        const mother = this.previousElementSibling;
        const removeTargets = "removeTargets";
        const zIndex = 4;
        let cancelBack, whitePrompt;
        let calendar;

        cancelBack = createNode({
          mother,
          class: [ removeTargets ],
          event: {
            click: (e) => {
              const targets = document.querySelectorAll('.' + removeTargets);
              for (let dom of targets) {
                dom.remove();
              }
            }
          },
          style: {
            position: "fixed",
            top: String(0),
            left: String(0),
            zIndex: String(zIndex),
            width: String(100) + '%',
            height: String(100) + '%',
            background: "transparent",
          }
        });

        whitePrompt = createNode({
          mother,
          class: [ removeTargets ],
          style: {
            position: "relative",
            top: String(0),
            left: String(0),
            width: String(100) + '%',
            height: String(100) + '%',
          },
          children: [
            {
              style: {
                position: "absolute",
                left: "calc(50% - " + String(calendarWidth / 2) + ea + ")",
                top: String(calendarTop) + ea,
                width: String(calendarWidth) + ea,
                zIndex: String(zIndex),
                background: colorChip.white,
                borderRadius: String(3) + "px",
                boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
                animation: "fadeuphard 0.3s ease forwards",
                transition: "all 0s ease",
              },
            }
          ]
        }).firstChild;

        calendar = instance.makeCalendar(stringToDate(new Date()), function (e) {
          const self = findByAttribute(document.querySelectorAll('.' + inputClassName), "property", "movein");
          let targets;
          self.value = this.getAttribute("buttonValue");
          instance.setMemory({
            property: "movein",
            type: "text",
            value: self.value,
          }).catch((err) => { console.log(err) });
          homeliaisonAnalytics({
            page: instance.pageName,
            standard: instance.firstPageViewTime,
            action: "inputBlur",
            data: {
              property: "movein",
              value: self.value,
              date: dateToString(new Date(), true),
            },
          }).catch((err) => {
            console.log(err);
          });
          targets = document.querySelectorAll('.' + removeTargets);
          for (let dom of targets) {
            dom.remove();
          }
        }, { width: calendarWidth, mobile });
        whitePrompt.appendChild(calendar.calendarBase);

      } catch (e) {
        console.log(e);
      }
    }

    agreeEvent = function (e) {
      const targets = document.querySelectorAll('.' + agreeTargetClassName);
      for (let dom of targets) {
        if (dom.getAttribute("circle") === "true") {
          if (dom.getAttribute("toggle") === "on") {
            dom.style.background = colorChip.gray4;
            dom.setAttribute("toggle", "off");
          } else {
            dom.style.background = colorChip.green;
            dom.setAttribute("toggle", "on");
          }
        } else {
          if (dom.getAttribute("toggle") === "on") {
            dom.style.color = colorChip.deactive;
            dom.setAttribute("toggle", "off");
          } else {
            dom.style.color = colorChip.green;
            dom.setAttribute("toggle", "on");
          }
        }
      }
    }

    grayBack = createNode({
      mother: totalContents,
      event: {
        click: (e) => {
          const removeTargets = document.querySelectorAll('.' + whitePopupClassName);
          for (let dom of removeTargets) {
            dom.remove();
          }
        }
      },
      class: [ whitePopupClassName ],
      style: {
        position: "fixed",
        top: String(0),
        left: String(0),
        width: withOut(0),
        height: withOut(0),
        opacity: String(0.3),
        background: colorChip.black,
        zIndex: String(zIndex),
      }
    });

    whiteBase = createNode({
      mother: totalContents,
      class: [ whitePopupClassName ],
      style: {
        position: "fixed",
        width: String(whiteWidth) + ea,
        height: "calc(calc(100% - " + String(naviHeight) + "px" + ") - " + String((whiteMargin * 2) + innerMargin) + ea + ")",
        top: "calc(" + String(naviHeight) + "px" + " + " + String(whiteMargin) + ea + ")",
        left: "calc(50% - " + String(whiteWidth / 2) + ea + ")",
        borderRadius: String(5) + "px",
        background: colorChip.white,
        boxShadow: "0px 3px 15px -9px " + colorChip.darkShadow,
        animation: "fadeuporiginal 0.3s ease forwards",
        paddingTop: String(innerMargin) + ea,
        zIndex: String(zIndex),
      }
    });

    contentsTong = createNode({
      mother: whiteBase,
      style: {
        display: "block",
        position: "relative",
        width: withOut(innerMargin * 2, ea),
        height: withOut(innerMargin, ea),
        marginLeft: String(innerMargin) + ea,
        marginRight: String(innerMargin) + ea,
      }
    });

    // title
    titleArea = createNode({
      mother: contentsTong,
      style: {
        display: "block",
        position: "relative",
        width: withOut(0, ea),
        height: String(titleHeight) + ea,
        borderBottom: "1px solid " + colorChip.black,
      },
      children: [
        {
          text: "서비스 신청",
          style: {
            textAlign: "left",
            position: "absolute",
            fontSize: String(titleSize) + ea,
            fontWeight: String(titleWeight),
            color: colorChip.black,
            lineHeight: String(titleLineHeight),
            top: String(titleTop) + ea,
            left: String(0),
          }
        }
      ]
    });

    //form
    formArea = createNode({
      mother: contentsTong,
      style: {
        display: "block",
        position: "relative",
        width: withOut(0),
        height: withOut(titleHeight + paymentHeight + formPaddingTop, ea),
        paddingTop: String(formPaddingTop) + ea,
        overflow: "scroll",
      }
    });

    formBox = createNode({
      mother: formArea,
      style: {
        display: "block",
        position: "relative",
        width: withOut(0),
      }
    });

    // 1
    createNode({
      mother: formBox,
      class: [ whitePopupBaseBlockClassName ],
      attribute: { baseclass: "name" },
      style: {
        display: "block",
        position: "relative",
        marginBottom: String(blockMarginBottom) + ea,
        height: String(moduleHeight) + ea,
      },
      children: [
        {
          style: {
            display: "inline-block",
            position: "relative",
            width: String(circleRadius * 2) + ea,
            height: String(circleRadius * 2) + ea,
            marginRight: String(circleBetween) + ea,
            borderRadius: String(circleRadius) + ea,
            background: colorChip.green,
            top: String(circleTop) + ea,
            verticalAlign: "top",
          }
        },
        {
          text: "성함",
          style: {
            display: "inline-block",
            position: "relative",
            top: String(mainTop) + ea,
            fontSize: String(mainSize) + ea,
            fontWeight: String(mainWeight),
            color: colorChip.black,
            verticalAlign: "top",
          }
        },
        {
          style: {
            position: "absolute",
            top: String(grayTop) + ea,
            left: String(leftGrayType0) + ea,
            width: String(widthGrayType0) + ea,
            height: String(grayHeight) + ea,
            background: colorChip.gray1,
            borderRadius: String(3) + "px",
          }
        },
        {
          mode: "input",
          class: [ inputClassName ],
          attribute: {
            type: "text",
            placeholder: "성함",
            property: "name",
            value: "",
          },
          event: {
            blur: function (e) {
              this.value = this.value.replace(/[^a-zA-Z가-힣]/gi, '');
              instance.setMemory({
                property: "name",
                type: "text",
                value: this.value,
              }).catch((err) => { console.log(err) });
              if (this.value !== '') {
                homeliaisonAnalytics({
                  page: instance.pageName,
                  standard: instance.firstPageViewTime,
                  action: "inputBlur",
                  data: {
                    property: "name",
                    value: this.value,
                    date: dateToString(new Date(), true),
                  },
                }).catch((err) => {
                  console.log(err);
                });
              }
            }
          },
          style: {
            position: "absolute",
            top: String(grayInputTop) + ea,
            left: String(leftGrayType0) + ea,
            width: String(widthGrayType0) + ea,
            height: String(grayHeight) + ea,
            outline: String(0),
            border: String(0),
            fontSize: String(inputSize) + ea,
            fontWeight: String(inputWeight),
            color: colorChip.black,
            textAlign: "center",
            background: "transparent",
          }
        },
      ]
    });
    // 2
    createNode({
      mother: formBox,
      class: [ whitePopupBaseBlockClassName ],
      attribute: { baseclass: "phone" },
      style: {
        display: "block",
        position: "relative",
        marginBottom: String(blockMarginBottom) + ea,
        height: String(moduleHeight) + ea,
      },
      children: [
        {
          style: {
            display: "inline-block",
            position: "relative",
            width: String(circleRadius * 2) + ea,
            height: String(circleRadius * 2) + ea,
            marginRight: String(circleBetween) + ea,
            borderRadius: String(circleRadius) + ea,
            background: colorChip.green,
            top: String(circleTop) + ea,
            verticalAlign: "top",
          }
        },
        {
          text: "연락처",
          style: {
            display: "inline-block",
            position: "relative",
            top: String(mainTop) + ea,
            fontSize: String(mainSize) + ea,
            fontWeight: String(mainWeight),
            color: colorChip.black,
            verticalAlign: "top",
          }
        },
        {
          style: {
            position: "absolute",
            top: String(grayTop) + ea,
            left: String(leftGrayType0) + ea,
            width: String(widthGrayType0) + ea,
            height: String(grayHeight) + ea,
            background: colorChip.gray1,
            borderRadius: String(3) + "px",
          }
        },
        {
          mode: "input",
          class: [ inputClassName ],
          attribute: {
            type: "text",
            placeholder: "010-0000-0000",
            property: "phone",
            value: "",
          },
          event: {
            keyup: function (e) {
              this.value = autoHypenPhone(this.value);
            },
            blur: function (e) {
              this.value = this.value.replace(/[^0-9\-]/gi, '');
              this.value = autoHypenPhone(this.value);
              instance.setMemory({
                property: "phone",
                type: "text",
                value: this.value,
              }).catch((err) => { console.log(err) });
              if (this.value !== '') {
                homeliaisonAnalytics({
                  page: instance.pageName,
                  standard: instance.firstPageViewTime,
                  action: "inputBlur",
                  data: {
                    property: "phone",
                    value: this.value,
                    date: dateToString(new Date(), true),
                  },
                }).catch((err) => {
                  console.log(err);
                });
              }
            }
          },
          style: {
            position: "absolute",
            top: String(grayInputTop) + ea,
            left: String(leftGrayType0) + ea,
            width: String(widthGrayType0) + ea,
            height: String(grayHeight) + ea,
            outline: String(0),
            border: String(0),
            fontSize: String(inputSize) + ea,
            fontWeight: String(inputWeight),
            color: colorChip.black,
            textAlign: "center",
            background: "transparent",
          }
        },
      ]
    });
    // 3
    createNode({
      mother: formBox,
      class: [ whitePopupBaseBlockClassName ],
      attribute: { baseclass: "email" },
      style: {
        display: "block",
        position: "relative",
        marginBottom: String(blockMarginBottom) + ea,
        height: String(moduleHeight) + ea,
      },
      children: [
        {
          style: {
            display: "inline-block",
            position: "relative",
            width: String(circleRadius * 2) + ea,
            height: String(circleRadius * 2) + ea,
            marginRight: String(circleBetween) + ea,
            borderRadius: String(circleRadius) + ea,
            background: colorChip.green,
            top: String(circleTop) + ea,
            verticalAlign: "top",
          }
        },
        {
          text: "이메일",
          style: {
            display: "inline-block",
            position: "relative",
            top: String(mainTop) + ea,
            fontSize: String(mainSize) + ea,
            fontWeight: String(mainWeight),
            color: colorChip.black,
            verticalAlign: "top",
          }
        },
        {
          style: {
            position: "absolute",
            top: String(grayTop) + ea,
            left: String(leftGrayType0) + ea,
            width: String(widthGrayType1) + ea,
            height: String(grayHeight) + ea,
            background: colorChip.gray1,
            borderRadius: String(3) + "px",
          }
        },
        {
          mode: "input",
          class: [ inputClassName ],
          attribute: {
            type: "text",
            placeholder: "example@home-liaison.com",
            property: "email",
            value: "",
          },
          event: {
            keyup: function (e) {
              this.value = this.value.replace(/[\=\+\?\#\&\(\)]/gi, '');
            },
            blur: function (e) {
              if (!/\@/.test(this.value) || !/\./.test(this.value)) {
                window.alert("올바른 형태의 이메일로 적어주세요!");
                this.value = this.value.replace(/[\=\+\?\#\&\(\)]/gi, '');
              }
              instance.setMemory({
                property: "email",
                type: "text",
                value: this.value,
              }).catch((err) => { console.log(err) });
              if (this.value !== '') {
                homeliaisonAnalytics({
                  page: instance.pageName,
                  standard: instance.firstPageViewTime,
                  action: "inputBlur",
                  data: {
                    property: "email",
                    value: this.value,
                    date: dateToString(new Date(), true),
                  },
                }).catch((err) => {
                  console.log(err);
                });
              }
            }
          },
          style: {
            position: "absolute",
            top: String(grayInputTop) + ea,
            left: String(leftGrayType0) + ea,
            width: String(widthGrayType1) + ea,
            height: String(grayHeight) + ea,
            outline: String(0),
            border: String(0),
            fontSize: String(inputSize) + ea,
            fontWeight: String(inputWeight),
            color: colorChip.black,
            textAlign: "left",
            background: "transparent",
            textIndent: String(inputIndent) + ea,
          }
        },
      ]
    });
    // 4
    createNode({
      mother: formBox,
      class: [ whitePopupBaseBlockClassName ],
      attribute: { baseclass: "address0" },
      style: {
        display: "block",
        position: "relative",
        marginBottom: String(blockMarginBottom) + ea,
        height: String(moduleHeight) + ea,
      },
      children: [
        {
          style: {
            display: "inline-block",
            position: "relative",
            width: String(circleRadius * 2) + ea,
            height: String(circleRadius * 2) + ea,
            marginRight: String(circleBetween) + ea,
            borderRadius: String(circleRadius) + ea,
            background: colorChip.green,
            top: String(circleTop) + ea,
            verticalAlign: "top",
          }
        },
        {
          text: "주소",
          style: {
            display: "inline-block",
            position: "relative",
            top: String(mainTop) + ea,
            fontSize: String(mainSize) + ea,
            fontWeight: String(mainWeight),
            color: colorChip.black,
            verticalAlign: "top",
          }
        },
        {
          event: {
            click: addressButtonEvent
          },
          style: {
            position: "absolute",
            top: String(grayTop) + ea,
            left: String(leftGrayType0) + ea,
            width: String(addressWidth) + ea,
            height: String(grayHeight) + ea,
            background: colorChip.gradientGreen,
            borderRadius: String(3) + "px",
            cursor: "pointer",
          },
          children: [
            {
              text: "검색",
              style: {
                width: String(100) + '%',
                textAlign: "center",
                fontSize: String(addressSize) + ea,
                fontWeight: String(addressWeight),
                color: colorChip.white,
                position: "relative",
                top: String(addressTop) + ea,
              }
            }
          ]
        },
        {
          style: {
            position: "absolute",
            top: String(grayTop) + ea,
            left: String(leftGrayType3) + ea,
            width: String(widthGrayType3) + ea,
            height: String(grayHeight) + ea,
            background: colorChip.gray1,
            borderRadius: String(3) + "px",
          }
        },
        {
          mode: "input",
          class: [ inputClassName ],
          event: {
            keyup: function (e) {
              this.value = this.value.replace(/[\=\+\?\#\&]/gi, '');
            },
            blur: function (e) {
              instance.setMemory({
                property: "address0",
                type: "text",
                value: this.value,
              }).catch((err) => { console.log(err) });
              if (this.value !== '') {
                homeliaisonAnalytics({
                  page: instance.pageName,
                  standard: instance.firstPageViewTime,
                  action: "inputBlur",
                  data: {
                    property: "address0",
                    value: this.value,
                    date: dateToString(new Date(), true),
                  },
                }).catch((err) => {
                  console.log(err);
                });
              }
            }
          },
          attribute: {
            type: "text",
            placeholder: "인테리어 받을 곳의 주소",
            property: "address0",
            value: "",
          },
          style: {
            position: "absolute",
            top: String(grayInputTop) + ea,
            left: String(leftGrayType3) + ea,
            width: String(widthGrayType3) + ea,
            height: String(grayHeight) + ea,
            outline: String(0),
            border: String(0),
            fontSize: String(inputSize) + ea,
            fontWeight: String(inputWeight),
            color: colorChip.black,
            textAlign: "left",
            background: "transparent",
            textIndent: String(inputIndent) + ea,
          }
        },
      ]
    });
    // 5
    createNode({
      mother: formBox,
      class: [ whitePopupBaseBlockClassName ],
      attribute: { baseclass: "address1" },
      style: {
        display: "block",
        position: "relative",
        marginBottom: String(blockMarginBottom) + ea,
        height: String(moduleHeight) + ea,
      },
      children: [
        {
          style: {
            position: "absolute",
            top: String(grayTop) + ea,
            left: String(leftGrayType0) + ea,
            width: String(widthGrayType1) + ea,
            height: String(grayHeight) + ea,
            background: colorChip.gray1,
            borderRadius: String(3) + "px",
          }
        },
        {
          mode: "input",
          class: [ inputClassName ],
          event: {
            focus: addressFocusEvent,
            blur: addressBlurEvent,
          },
          attribute: {
            type: "text",
            placeholder: "인테리어 받을 곳의 상세 주소",
            property: "address1",
            value: "",
          },
          style: {
            position: "absolute",
            top: String(grayInputTop) + ea,
            left: String(leftGrayType0) + ea,
            width: String(widthGrayType1) + ea,
            height: String(grayHeight) + ea,
            outline: String(0),
            border: String(0),
            fontSize: String(inputSize) + ea,
            fontWeight: String(inputWeight),
            color: colorChip.black,
            textAlign: "left",
            background: "transparent",
            textIndent: String(inputIndent) + ea,
          }
        },
      ]
    });

    // 6 : margin
    createNode({
      mother: formBox,
      style: {
        display: "block",
        position: "relative",
        marginBottom: String(blockMarginBottom) + ea,
        height: String(moduleHeight * marginRatio) + ea,
      }
    });

    // 7
    createNode({
      mother: formBox,
      class: [ whitePopupBaseBlockClassName ],
      attribute: { baseclass: "pyeong" },
      style: {
        display: "block",
        position: "relative",
        marginBottom: String(blockMarginBottom) + ea,
        height: String(moduleHeight) + ea,
      },
      children: [
        {
          style: {
            display: "inline-block",
            position: "relative",
            width: String(circleRadius * 2) + ea,
            height: String(circleRadius * 2) + ea,
            marginRight: String(circleBetween) + ea,
            borderRadius: String(circleRadius) + ea,
            background: colorChip.green,
            top: String(circleTop) + ea,
            verticalAlign: "top",
          }
        },
        {
          text: "분양 평수",
          style: {
            display: "inline-block",
            position: "relative",
            top: String(mainTop) + ea,
            fontSize: String(mainSize) + ea,
            fontWeight: String(mainWeight),
            color: colorChip.black,
            verticalAlign: "top",
          }
        },
        {
          style: {
            position: "absolute",
            top: String(grayTop) + ea,
            left: String(leftGrayType2) + ea,
            width: String(widthGrayType0) + ea,
            height: String(grayHeight) + ea,
            background: colorChip.gray1,
            borderRadius: String(3) + "px",
          }
        },
        {
          mode: "input",
          class: [ inputClassName ],
          attribute: {
            type: "text",
            placeholder: "00평 (분양 평수)",
            property: "pyeong",
            value: "",
          },
          event: {
            keyup: pyeongNumberEvent,
            blur: pyeongBlurEvent,
            focus: pyeongFocusEvent,
          },
          style: {
            position: "absolute",
            top: String(grayInputTop) + ea,
            left: String(leftGrayType2) + ea,
            width: String(widthGrayType0) + ea,
            height: String(grayHeight) + ea,
            outline: String(0),
            border: String(0),
            fontSize: String(inputSize) + ea,
            fontWeight: String(inputWeight),
            color: colorChip.black,
            textAlign: "center",
            background: "transparent",
          }
        }
      ]
    });
    // 8
    createNode({
      mother: formBox,
      class: [ whitePopupBaseBlockClassName ],
      attribute: { baseclass: "living" },
      style: {
        display: "block",
        position: "relative",
        marginBottom: String(blockMarginBottom) + ea,
        height: String(moduleHeight) + ea,
      },
      children: [
        {
          style: {
            display: "inline-block",
            position: "relative",
            width: String(circleRadius * 2) + ea,
            height: String(circleRadius * 2) + ea,
            marginRight: String(circleBetween) + ea,
            borderRadius: String(circleRadius) + ea,
            background: colorChip.green,
            top: String(circleTop) + ea,
            verticalAlign: "top",
          }
        },
        {
          text: "거주 여부",
          style: {
            display: "inline-block",
            position: "relative",
            top: String(mainTop) + ea,
            fontSize: String(mainSize) + ea,
            fontWeight: String(mainWeight),
            color: colorChip.black,
            verticalAlign: "top",
          }
        },
        {
          class: [ inputClassName ],
          attribute: {
            toggle: "on",
            property: "living",
          },
          event: {
            click: checkboxClickEvent0
          },
          style: {
            position: "absolute",
            top: String(0),
            left: String(leftCheck0) + ea,
            height: String(100) + '%',
            verticalAlign: "top",
            cursor: "pointer",
          },
          children: [
            {
              mode: "svg",
              source: instance.returnCheckBox(colorChip.gray3),
              style: {
                display: "inline-block",
                position: "relative",
                width: String(checkboxWidth) + ea,
                top: String(checkboxTop) + ea,
                verticalAlign: "top",
                cursor: "pointer",
                opacity: String(0),
              }
            },
            {
              mode: "svg",
              source: instance.returnCheckBox(colorChip.green),
              style: {
                position: "absolute",
                width: String(checkboxWidth) + ea,
                top: String(checkboxTop) + ea,
                left: String(0),
                verticalAlign: "top",
                cursor: "pointer",
                opacity: String(1),
              }
            },
            {
              text: "이사",
              style: {
                display: "inline-block",
                position: "relative",
                marginLeft: String(checkboxBetween) + ea,
                top: String(mainTop) + ea,
                fontSize: String(mainSize) + ea,
                fontWeight: String(checkboxWeight),
                color: colorChip.green,
                verticalAlign: "top",
                cursor: "pointer",
              }
            },
          ]
        },
        {
          class: [ inputClassName ],
          attribute: {
            toggle: "off",
            property: "living",
          },
          event: {
            click: checkboxClickEvent0
          },
          style: {
            position: "absolute",
            top: String(0),
            left: String(leftCheck1) + ea,
            height: String(100) + '%',
            verticalAlign: "top",
            cursor: "pointer",
          },
          children: [
            {
              mode: "svg",
              source: instance.returnCheckBox(colorChip.gray3),
              style: {
                display: "inline-block",
                position: "relative",
                width: String(checkboxWidth) + ea,
                top: String(checkboxTop) + ea,
                verticalAlign: "top",
                cursor: "pointer",
                opacity: String(1),
              }
            },
            {
              mode: "svg",
              source: instance.returnCheckBox(colorChip.green),
              style: {
                position: "absolute",
                width: String(checkboxWidth) + ea,
                top: String(checkboxTop) + ea,
                left: String(0),
                verticalAlign: "top",
                cursor: "pointer",
                opacity: String(0),
              }
            },
            {
              text: "거주중",
              style: {
                display: "inline-block",
                position: "relative",
                marginLeft: String(checkboxBetween) + ea,
                top: String(mainTop) + ea,
                fontSize: String(mainSize) + ea,
                fontWeight: String(checkboxWeight),
                color: colorChip.black,
                verticalAlign: "top",
                cursor: "pointer",
              }
            },
          ]
        },


      ]
    });
    // 9
    createNode({
      mother: formBox,
      class: [ whitePopupBaseBlockClassName ],
      attribute: { baseclass: "movein" },
      style: {
        display: "block",
        position: "relative",
        marginBottom: String(blockMarginBottom) + ea,
        height: String(moduleHeight) + ea,
      },
      children: [
        {
          style: {
            display: "inline-block",
            position: "relative",
            width: String(circleRadius * 2) + ea,
            height: String(circleRadius * 2) + ea,
            marginRight: String(circleBetween) + ea,
            borderRadius: String(circleRadius) + ea,
            background: colorChip.green,
            top: String(circleTop) + ea,
            verticalAlign: "top",
          }
        },
        {
          text: "입주일",
          style: {
            display: "inline-block",
            position: "relative",
            top: String(mainTop) + ea,
            fontSize: String(mainSize) + ea,
            fontWeight: String(mainWeight),
            color: colorChip.black,
            verticalAlign: "top",
          }
        },
        {
          style: {
            position: "absolute",
            top: String(grayTop) + ea,
            left: String(leftGrayType2) + ea,
            width: String(widthGrayType0) + ea,
            height: String(grayHeight) + ea,
            background: colorChip.gray1,
            borderRadius: String(3) + "px",
          }
        },
        {
          mode: "input",
          class: [ inputClassName ],
          attribute: {
            type: "text",
            placeholder: dateToString(new Date()),
            property: "movein",
            value: "",
          },
          event: {
            click: calendarViewEvent,
            blur: function () {
              instance.setMemory({
                property: "movein",
                type: "text",
                value: this.value,
              }).catch((err) => { console.log(err) });
              if (this.value !== '') {
                homeliaisonAnalytics({
                  page: instance.pageName,
                  standard: instance.firstPageViewTime,
                  action: "inputBlur",
                  data: {
                    property: "movein",
                    value: this.value,
                    date: dateToString(new Date(), true),
                  },
                }).catch((err) => {
                  console.log(err);
                });
              }
            }
          },
          style: {
            position: "absolute",
            top: String(grayInputTop) + ea,
            left: String(leftGrayType2) + ea,
            width: String(widthGrayType0) + ea,
            height: String(grayHeight) + ea,
            outline: String(0),
            border: String(0),
            fontSize: String(inputSize) + ea,
            fontWeight: String(inputWeight),
            color: colorChip.black,
            textAlign: "center",
            background: "transparent",
          }
        }
      ]
    });
    // 10
    createNode({
      mother: formBox,
      class: [ whitePopupBaseBlockClassName ],
      attribute: { baseclass: "contract" },
      style: {
        display: "block",
        position: "relative",
        marginBottom: String(blockMarginBottom) + ea,
        height: String(moduleHeight) + ea,
      },
      children: [
        {
          style: {
            display: "inline-block",
            position: "relative",
            width: String(circleRadius * 2) + ea,
            height: String(circleRadius * 2) + ea,
            marginRight: String(circleBetween) + ea,
            borderRadius: String(circleRadius) + ea,
            background: colorChip.green,
            top: String(circleTop) + ea,
            verticalAlign: "top",
          }
        },
        {
          text: "계약 형태",
          style: {
            display: "inline-block",
            position: "relative",
            top: String(mainTop) + ea,
            fontSize: String(mainSize) + ea,
            fontWeight: String(mainWeight),
            color: colorChip.black,
            verticalAlign: "top",
          }
        },
        {
          class: [ inputClassName ],
          attribute: {
            toggle: "on",
            property: "contract",
          },
          event: {
            click: checkboxClickEvent0
          },
          style: {
            position: "absolute",
            top: String(0),
            left: String(leftCheck0) + ea,
            height: String(100) + '%',
            verticalAlign: "top",
            cursor: "pointer",
          },
          children: [
            {
              mode: "svg",
              source: instance.returnCheckBox(colorChip.gray3),
              style: {
                display: "inline-block",
                position: "relative",
                width: String(checkboxWidth) + ea,
                top: String(checkboxTop) + ea,
                verticalAlign: "top",
                cursor: "pointer",
                opacity: String(0),
              }
            },
            {
              mode: "svg",
              source: instance.returnCheckBox(colorChip.green),
              style: {
                position: "absolute",
                width: String(checkboxWidth) + ea,
                top: String(checkboxTop) + ea,
                left: String(0),
                verticalAlign: "top",
                cursor: "pointer",
                opacity: String(1),
              }
            },
            {
              text: "자가",
              style: {
                display: "inline-block",
                position: "relative",
                marginLeft: String(checkboxBetween) + ea,
                top: String(mainTop) + ea,
                fontSize: String(mainSize) + ea,
                fontWeight: String(checkboxWeight),
                color: colorChip.green,
                verticalAlign: "top",
                cursor: "pointer",
              }
            },
          ]
        },
        {
          class: [ inputClassName ],
          attribute: {
            toggle: "off",
            property: "contract",
          },
          event: {
            click: checkboxClickEvent0
          },
          style: {
            position: "absolute",
            top: String(0),
            left: String(leftCheck1) + ea,
            height: String(100) + '%',
            verticalAlign: "top",
            cursor: "pointer",
          },
          children: [
            {
              mode: "svg",
              source: instance.returnCheckBox(colorChip.gray3),
              style: {
                display: "inline-block",
                position: "relative",
                width: String(checkboxWidth) + ea,
                top: String(checkboxTop) + ea,
                verticalAlign: "top",
                cursor: "pointer",
                opacity: String(1),
              }
            },
            {
              mode: "svg",
              source: instance.returnCheckBox(colorChip.green),
              style: {
                position: "absolute",
                width: String(checkboxWidth) + ea,
                top: String(checkboxTop) + ea,
                left: String(0),
                verticalAlign: "top",
                cursor: "pointer",
                opacity: String(0),
              }
            },
            {
              text: "전월세",
              style: {
                display: "inline-block",
                position: "relative",
                marginLeft: String(checkboxBetween) + ea,
                top: String(mainTop) + ea,
                fontSize: String(mainSize) + ea,
                fontWeight: String(checkboxWeight),
                color: colorChip.black,
                verticalAlign: "top",
                cursor: "pointer",
              }
            },
          ]
        },
      ]
    });

    /*

    // 11 : margin
    createNode({
      mother: formBox,
      style: {
        display: "block",
        position: "relative",
        marginBottom: String(blockMarginBottom) + ea,
        height: String(moduleHeight * marginRatio) + ea,
      }
    });

    // 12
    createNode({
      mother: formBox,
      class: [ whitePopupBaseBlockClassName ],
      attribute: { baseclass: "budget" },
      style: {
        display: "block",
        position: "relative",
        marginBottom: String(blockMarginBottom) + ea,
        height: String(moduleHeight * 3) + ea,
      },
      children: [
        {
          style: {
            display: "inline-block",
            position: "relative",
            width: String(circleRadius * 2) + ea,
            height: String(circleRadius * 2) + ea,
            marginRight: String(circleBetween) + ea,
            borderRadius: String(circleRadius) + ea,
            background: colorChip.green,
            top: String(circleTop) + ea,
            verticalAlign: "top",
          }
        },
        {
          text: "예산",
          style: {
            display: "inline-block",
            position: "relative",
            top: String(mainTop) + ea,
            fontSize: String(mainSize) + ea,
            fontWeight: String(mainWeight),
            color: colorChip.black,
            verticalAlign: "top",
          }
        },
        {
          style: {
            display: "inline-flex",
            position: "absolute",
            top: String(0) + ea,
            left: String(leftGrayType2) + ea,
            width: withOut(leftGrayType2, ea),
            height: "auto",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "start",
          },
          children: [
            {
              text: [
                "인테리어에 사용할 <b%전체 예산을 알려주세요!%b>",
                desktop ? "<u%* 스타일링, 시공을 모두 포함하는 예산 / 가전 예산은 제외%u>" : "<u%* 스타일링, 시공 모두 포함 예산 / 가전 제외%u>"
              ].join("\n"),
              style: {
                display: "block",
                position: "relative",
                fontSize: String(descriptionSize) + ea,
                fontWeight: String(descriptionWeight),
                lineHeight: String(barDescriptionLingHeight),
                color: colorChip.black,
                top: String(barDescriptionTextTop) + ea,
              },
              bold: {
                fontSize: String(descriptionSize) + ea,
                fontWeight: String(descriptionBoldWeight),
                color: colorChip.black
              },
              under: {
                fontSize: String(barDescriptionSubSize) + ea,
                fontWeight: String(descriptionWeight),
                color: colorChip.green
              },
            },
            {
              mode: "aside",
              class: [ inputClassName ],
              attribute: {
                ratio: String(defaultRatio),
                value: budgetValues[Math.round((budgetValues.length - 1) * defaultRatio)].value,
                property: "budget",
              },
              event: {
                click: barClickEvent(budgetValues, "budget"),
              },
              style: {
                display: "block",
                position: "relative",
                height: String(barTongHeight) + ea,
                cursor: "pointer",
                width: desktop ? withOut(0, ea) : withOut(-1 * leftGrayType2, ea),
                marginTop: String(barTongMarginTop) + ea,
                left: mobile ? String(-1 * leftGrayType2) + ea : "",
              },
              children: [
                {
                  style: {
                    position: "absolute",
                    top: String(barTop) + ea,
                    height: String(barHeight) + ea,
                    borderRadius: String(barHeight + 1) + ea,
                    background: colorChip.gray3,
                    width: withOut(0, ea),
                    left: String(0) + ea,
                  }
                },
                {
                  text: budgetValues[0].title,
                  style: {
                    display: "inline-block",
                    position: "relative",
                    fontSize: String(barDescriptionSubSize) + ea,
                    fontWeight: String(barFactorWeight),
                    color: colorChip.black,
                    top: String(barFactorTop) + ea,
                  }
                },
                {
                  text: budgetValues[2].title,
                  style: {
                    position: "absolute",
                    fontSize: String(barDescriptionSubSize) + ea,
                    fontWeight: String(barFactorWeight),
                    color: colorChip.black,
                    top: String(barFactorTop) + ea,
                    left: String(barFactorA0Left) + ea,
                  }
                },
                {
                  text: budgetValues[4].title,
                  style: {
                    position: "absolute",
                    fontSize: String(barDescriptionSubSize) + ea,
                    fontWeight: String(700),
                    color: colorChip.black,
                    top: String(barFactorTop) + ea,
                    left: String(barFactorA1Left) + ea,
                  }
                },
                {
                  text: budgetValues[6].title,
                  style: {
                    position: "absolute",
                    fontSize: String(barDescriptionSubSize) + ea,
                    fontWeight: String(barFactorWeight),
                    color: colorChip.black,
                    top: String(barFactorTop) + ea,
                    left: String(barFactorA2Left) + ea,
                  }
                },
                {
                  text: budgetValues[8].title,
                  style: {
                    position: "absolute",
                    fontSize: String(barDescriptionSubSize) + ea,
                    fontWeight: String(barFactorWeight),
                    color: colorChip.black,
                    top: String(barFactorTop) + ea,
                    right: String(0) + ea,
                  }
                },
                {
                  class: [ variableBarClassName ],
                  style: {
                    position: "absolute",
                    left: String(0) + ea,
                    top: String(0) + ea,
                    width: String(defaultRatio * 100) + '%',
                    height: String(100) + '%',
                    transition: "all 0.3s ease",
                  },
                  children: [
                    {
                      style: {
                        position: "absolute",
                        top: String(barTop) + ea,
                        height: String(barHeight) + ea,
                        borderRadius: String(barHeight + 1) + ea,
                        background: colorChip.black,
                        width: withOut(0, ea),
                        left: String(0) + ea,
                      }
                    },
                    {
                      style: {
                        position: "absolute",
                        top: String(barCircleTop) + ea,
                        right: String(-1 * barCircleRadius) + ea,
                        width: String(barCircleRadius * 2) + ea,
                        height: String(barCircleRadius * 2) + ea,
                        borderRadius: String(barCircleRadius + 1) + ea,
                        background: colorChip.white,
                        border: "1px solid " + colorChip.gray4,
                        cursor: "pointer",
                      }
                    }
                  ]
                }
              ]
            },
          ]
        },
      ]
    });

    // 13 : margin
    createNode({
      mother: formBox,
      style: {
        display: (media[2] || media[3]) ? "none" : "block",
        position: "relative",
        marginBottom: String(blockMarginBottom) + ea,
        height: String(moduleHeight * marginRatio) + ea,
      }
    });

    // 14
    createNode({
      mother: formBox,
      class: [ whitePopupBaseBlockClassName ],
      attribute: { baseclass: "furniture" },
      style: {
        display: "block",
        position: "relative",
        marginBottom: String(blockMarginBottom) + ea,
        height: String(moduleHeight * 3) + ea,
      },
      children: [
        {
          style: {
            display: "inline-block",
            position: "relative",
            width: String(circleRadius * 2) + ea,
            height: String(circleRadius * 2) + ea,
            marginRight: String(circleBetween) + ea,
            borderRadius: String(circleRadius) + ea,
            background: colorChip.green,
            top: String(circleTop) + ea,
            verticalAlign: "top",
          }
        },
        {
          text: "가구",
          style: {
            display: "inline-block",
            position: "relative",
            top: String(mainTop) + ea,
            fontSize: String(mainSize) + ea,
            fontWeight: String(mainWeight),
            color: colorChip.black,
            verticalAlign: "top",
          }
        },
        {
          style: {
            display: "inline-flex",
            position: "absolute",
            top: String(0) + ea,
            left: String(leftGrayType2) + ea,
            width: withOut(leftGrayType2, ea),
            height: "auto",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "start",
          },
          children: [
            {
              text: [
                "가구의 <b%재사용과 구매의 비율을 알려주세요!%b>",
                desktop ? "<u%* 재배치 = 기존 가구를 재사용 / 구매 = 새로운 가구를 구매%u>" : "<u%* 재배치 = 기존 가구 재사용 / 구매 = 새로 구매%u>",
              ].join("\n"),
              style: {
                display: "block",
                position: "relative",
                fontSize: String(descriptionSize) + ea,
                fontWeight: String(descriptionWeight),
                lineHeight: String(barDescriptionLingHeight),
                color: colorChip.black,
                top: String(barDescriptionTextTop) + ea,
              },
              bold: {
                fontSize: String(descriptionSize) + ea,
                fontWeight: String(descriptionBoldWeight),
                color: colorChip.black
              },
              under: {
                fontSize: String(barDescriptionSubSize) + ea,
                fontWeight: String(descriptionWeight),
                color: colorChip.green
              },
            },
            {
              mode: "aside",
              class: [ inputClassName ],
              attribute: {
                ratio: String(defaultRatio),
                value: furnitureValues[Math.round((furnitureValues.length - 1) * defaultRatio)].value,
                property: "furniture",
              },
              event: {
                click: barClickEvent(furnitureValues, "furniture"),
              },
              style: {
                display: "block",
                position: "relative",
                height: String(barTongHeight) + ea,
                cursor: "pointer",
                width: desktop ? withOut(0, ea) : withOut(-1 * leftGrayType2, ea),
                marginTop: String(barTongMarginTop) + ea,
                left: mobile ? String(-1 * leftGrayType2) + ea : "",
              },
              children: [
                {
                  style: {
                    position: "absolute",
                    top: String(barTop) + ea,
                    height: String(barHeight) + ea,
                    borderRadius: String(barHeight + 1) + ea,
                    background: colorChip.gray3,
                    width: withOut(0, ea),
                    left: String(0) + ea,
                  }
                },
                {
                  text: furnitureValues[0].title,
                  style: {
                    display: "inline-block",
                    position: "relative",
                    fontSize: String(barDescriptionSubSize) + ea,
                    fontWeight: String(barFactorWeight),
                    color: colorChip.black,
                    top: String(barFactorTop) + ea,
                  }
                },
                {
                  text: furnitureValues[1].title,
                  style: {
                    position: "absolute",
                    fontSize: String(barDescriptionSubSize) + ea,
                    fontWeight: String(barFactorWeight),
                    color: colorChip.black,
                    top: String(barFactorTop) + ea,
                    left: String(barFactorB0Left) + ea,
                  }
                },
                {
                  text: furnitureValues[2].title,
                  style: {
                    position: "absolute",
                    fontSize: String(barDescriptionSubSize) + ea,
                    fontWeight: String(barFactorWeight),
                    color: colorChip.black,
                    top: String(barFactorTop) + ea,
                    right: String(0) + ea,
                  }
                },
                {
                  class: [ variableBarClassName ],
                  style: {
                    position: "absolute",
                    left: String(0) + ea,
                    top: String(0) + ea,
                    width: String(defaultRatio * 100) + '%',
                    height: String(100) + '%',
                    transition: "all 0.3s ease",
                  },
                  children: [
                    {
                      style: {
                        position: "absolute",
                        top: String(barTop) + ea,
                        height: String(barHeight) + ea,
                        borderRadius: String(barHeight + 1) + ea,
                        background: colorChip.gradientGreen,
                        width: withOut(0, ea),
                        left: String(0) + ea,
                      }
                    },
                    {
                      style: {
                        position: "absolute",
                        top: String(barCircleTop) + ea,
                        right: String(-1 * barCircleRadius) + ea,
                        width: String(barCircleRadius * 2) + ea,
                        height: String(barCircleRadius * 2) + ea,
                        borderRadius: String(barCircleRadius + 1) + ea,
                        background: colorChip.white,
                        border: "1px solid " + colorChip.gray4,
                        cursor: "pointer",
                      }
                    }
                  ]
                }
              ]
            },
          ]
        },
      ]
    });

    // 15 : margin
    createNode({
      mother: formBox,
      style: {
        display: "block",
        position: "relative",
        marginBottom: String(blockMarginBottom) + ea,
        height: String(moduleHeight * marginRatio) + ea,
      }
    });

    */

    // 16
    createNode({
      mother: formBox,
      class: [ whitePopupBaseBlockClassName ],
      attribute: { baseclass: "etc" },
      style: {
        display: "block",
        position: "relative",
        marginBottom: String(blockMarginBottom) + ea,
        height: String(textAreaBlockHeight) + ea,
      },
      children: [
        {
          style: {
            display: "inline-block",
            position: "relative",
            width: String(circleRadius * 2) + ea,
            height: String(circleRadius * 2) + ea,
            marginRight: String(circleBetween) + ea,
            borderRadius: String(circleRadius) + ea,
            background: colorChip.green,
            top: String(circleTop) + ea,
            verticalAlign: "top",
          }
        },
        {
          text: "요청 사항",
          style: {
            display: "inline-block",
            position: "relative",
            top: String(mainTop) + ea,
            fontSize: String(mainSize) + ea,
            fontWeight: String(mainWeight),
            color: colorChip.black,
            verticalAlign: "top",
          }
        },
        {
          style: {
            position: "absolute",
            top: String(desktop ? grayTextAreaTop : mobileGrayTextAreaTop) + ea,
            left: String(desktop ? leftGrayType2 : 0) + ea,
            width: desktop ? String(widthGrayType2) + ea : withOut(0, ea),
            height: String(grayBigHeight) + ea,
            background: colorChip.gray1,
            borderRadius: String(3) + "px",
          }
        },
        {
          mode: "textarea",
          class: [ inputClassName ],
          attribute: {
            placeholder: (desktop ? [
              "스타일링, 예산, 시공 등의 요청사항을 적어주세요!",
              "홈리에종은 스타일링 없이 시공만 하지 않습니다. 문의 전 고려해 주세요 :)",
              "(예시)",
              "=> 시공: 도배, 조명만 부분적으로 원해요.",
              "=> 스타일링: 가구, 패브릭, 소품은 전체 구매를 해야 해요.",
              "=> 예산: 최대 00만원 이내로 하고 싶어요.",
            ].join("\n") : [
              "스타일링, 예산, 시공 등의 요청사항을 적어주세요!",
              "홈리에종은 스타일링 없이 시공만 하지 않습니다.",
              "문의 전 고려해 주세요 :)",
              "(예시)",
              "시공: 도배, 조명만 부분적으로 원해요.",
              "스타일링: 가구, 패브릭, 소품은 전체 구매를 해야 해요.",
              "예산: 최대 00만원 이내로 하고 싶어요.",
            ].join("\n")),
            property: "etc",
          },
          event: {
            focus: commentsFocusEvent,
            blur: commentsBlurEvent,
          },
          style: {
            position: "absolute",
            top: String((desktop ? grayTextAreaTop : mobileGrayTextAreaTop) + textareaTop) + ea,
            left: String((desktop ? leftGrayType2 : 0) + textareaLeft) + ea,
            width: desktop ? String(widthGrayType2 - (textareaLeft * 2)) + ea : withOut(textareaLeft * 2, ea),
            height: String(grayBigHeight - (textareaTop * 1)) + ea,
            fontSize: String(grayLineBlockFontSize) + ea,
            fontWeight: String(grayLineBlockFontWeight),
            border: String(0),
            background: "transparent",
            outline: String(0),
            overflow: "scroll",
            lineHeight: String(1.6),
            color: colorChip.black,
          }
        }
      ]
    });

    // 17 : margin
    createNode({
      mother: formBox,
      style: {
        display: "block",
        position: "relative",
        marginBottom: String(blockMarginBottom) + ea,
        height: String(moduleHeight * marginRatio) + ea,
      }
    });

    instance.insertMemories([
      "name",
      "phone",
      "email",
      "address0",
      "address1",
      "pyeong",
      "living",
      "movein",
      "contract",
      // "budget",
      // "furniture",
      "etc",
    ], true).catch((err) => { console.log(err); });

    // 12
    policyTong = createNode({
      mother: formBox,
      style: {
        display: "block",
        position: "relative",
        marginBottom: String(blockMarginBottom) + ea,
      },
      children: [
        {
          style: {
            position: "relative",
            top: String(grayTextAreaTop) + ea,
            left: String(0) + ea,
            width: String(100) + '%',
            paddingTop: String(policyInnerPadding) + ea,
            height: String(grayBigHeight) + ea,
            background: colorChip.gray1,
            borderRadius: String(3) + "px",
          },
          children: [
            {
              style: {
                display: "block",
                position: "relative",
                width: withOut(policyInnerPadding * 2, ea),
                marginLeft: String(policyInnerPadding) + ea,
                height: withOut(policyInnerPadding, ea),
                overflow: "scroll",
              },
              children: [
                {
                  style: {
                    display: "block",
                    position: "relative",
                    fontSize: String(policyTextSize) + ea,
                    color: colorChip.black,
                  }
                }
              ]
            }
          ]
        },
      ]
    }).firstChild.firstChild.firstChild;

    ajaxJson({}, BACKHOST + "/designerProposal_policy").then(function (res) {
      const { policy, button } = res;
      let bTags;

      policyTong.insertAdjacentHTML("beforeend", policy);
      bTags = policyTong.querySelectorAll("b");
      for (let b of bTags) {
        b.style.color = colorChip.black;
        b.style.fontWeight = String(600);
      }

    }).catch(function (err) {
      throw new Error(err);
    });

    // 13
    createNode({
      mother: formBox,
      style: {
        display: "block",
        position: "relative",
        textAlign: "right",
      },
      children: [
        {
          class: [ agreeTargetClassName ],
          event: { click: agreeEvent },
          attribute: {
            toggle: "on",
            circle: "true",
          },
          style: {
            display: "inline-block",
            position: "relative",
            width: String(circleRadius * 2) + ea,
            height: String(circleRadius * 2) + ea,
            marginRight: String(agreeCircleBetween) + ea,
            borderRadius: String(circleRadius) + ea,
            background: colorChip.green,
            top: String(agreeCircleTop) + ea,
            verticalAlign: "top",
            cursor: "pointer",
          }
        },
        {
          text: "상기 개인정보 취급 방침에 동의합니다.",
          class: [ agreeTargetClassName ],
          event: { click: agreeEvent },
          attribute: {
            toggle: "on",
          },
          style: {
            display: "inline-block",
            fontSize: String(agreeSize) + ea,
            fontWeight: String(agreeWeight),
            color: colorChip.green,
            cursor: "pointer",
          }
        }
      ]
    });

    // 14 : margin
    createNode({
      mother: formBox,
      style: {
        display: "block",
        position: "relative",
        marginBottom: String(blockMarginBottom) + ea,
        height: String(moduleHeight * marginRatio) + ea,
      }
    });


    // payment
    paymentArea = createNode({
      mother: contentsTong,
      style: {
        display: "block",
        position: "relative",
        width: withOut(0, ea),
        height: String(paymentHeight) + ea,
        borderTop: "1px dashed " + colorChip.gray4,
        textAlign: "right",
      }
    });
    createNode({
      mother: paymentArea,
      class: [ "consultingPopupAnywhereSubmit" ],
      event: {
        click: instance.finalSubmit(),
      },
      text: "신청하기",
      style: {
        display: "inline-block",
        position: "relative",
        fontSize: String(paymentButtonSize) + ea,
        fontWeight: String(paymentButtonWeight),
        color: colorChip.white,
        top: String(paymentButtonTop) + ea,
        background: colorChip.gradientGreen,
        paddingTop: String(paymentButtonPaddingTop) + ea,
        paddingBottom: String(paymentButtonPaddingBottom) + ea,
        paddingLeft: String(paymentButtonPaddingLeft) + ea,
        paddingRight: String(paymentButtonPaddingLeft) + ea,
        borderRadius: String(5) + "px",
        cursor: "pointer",
      }
    });

  }
}

GeneralJs.prototype.finalSubmit = function () {
  const instance = this;
  const inputClassName = "whitePopupInputClassName";
  const agreeTargetClassName = "agreeTargetClassName";
  const { ajaxJson, colorChip, findByAttribute, scrollTo, dateToString, sleep, selfHref, homeliaisonAnalytics } = GeneralJs;
  return async function (e) {
    try {
      const property = "property";
      const targets = [ ...document.querySelectorAll('.' + inputClassName) ];
      let properties;
      let map;
      let tempObj;
      let nodeName;
      let firstDom;
      let visualSpecific;
      let name, phone;
      let tempTargets;
      let onValue;
      let boo;

      homeliaisonAnalytics({
        page: instance.pageName,
        standard: instance.firstPageViewTime,
        action: "submitLaunching",
        data: {
          date: dateToString(new Date(), true),
        },
      }).catch((err) => { console.log(err); });
      
      if (document.querySelector('.' + agreeTargetClassName).getAttribute("toggle") === "off") {
        window.alert("개인정보 취급 방침에 동의해주세요!");
      } else {

        visualSpecific = 150;

        properties = [];
        for (let dom of targets) {
          properties.push(dom.getAttribute(property));
        }
        properties = [ ...new Set(properties) ];

        map = [];
        boo = true;
        for (let p of properties) {
          tempObj = {};
          tempObj.property = p;

          firstDom = findByAttribute(targets, property, p);
          nodeName = firstDom.nodeName;
          if (/INPUT/gi.test(nodeName) || /TEXTAREA/gi.test(nodeName)) {
            try {

              if (p === "name") {
                firstDom.value = firstDom.value.replace(/[^a-zA-Z가-힣]/gi, '');
                if (firstDom.value.trim() === '') {
                  throw new Error("성함을 입력해주세요!");
                }
                name = firstDom.value.trim();
              } else if (p === "phone") {
                firstDom.value = firstDom.value.replace(/[^0-9\-]/gi, '');
                if (firstDom.value.trim() === '') {
                  throw new Error("연락처를 입력해주세요!");
                }
                phone = firstDom.value.trim();
              } else if (p === "address0") {
                firstDom.value = firstDom.value.trim();
                if (firstDom.value.trim() === '') {
                  throw new Error("주소를 검색하여 입력해주세요!");
                }
              } else if (p === "address1") {
                firstDom.value = firstDom.value.trim();
                if (firstDom.value.trim() === '') {
                  throw new Error("상세 주소를 적어주세요!");
                }
              } else if (p === "pyeong") {
                firstDom.value = firstDom.value.replace(/[^0-9\.]/gi, '');
                if (firstDom.value.trim() === '' || Number.isNaN(Number(firstDom.value.trim())) || Number(firstDom.value.trim()) === 0) {
                  throw new Error("분양 평수를 알려주세요!");
                }
              } else if (p === "movein") {
                firstDom.value = firstDom.value.replace(/[^0-9\-]/gi, '').trim();
                if (!/[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]/gi.test(firstDom.value.trim())) {
                  throw new Error("입주 예정일을 알려주세요! (정해지지 않았을 경우, 예상되는 날짜를 찍어주세요!)");
                }
              } else if (p === "etc") {
                firstDom.value = firstDom.value.trim().replace(/[\=\+\&\>\<\/\\\{\}\[\]\`\-]/gi, '');
                if (firstDom.value.trim() === '') {
                  throw new Error("예시를 보시고 요청 사항을 최대한 자세하게 적어주세요!");
                }
                if (firstDom.value.length < 5) {
                  throw new Error("예시를 보시고 요청 사항을 최대한 자세하게 적어주세요!");
                }
              }
              tempObj.value = firstDom.value.replace(/[\=\+\&\>\<\/\\\{\}\[\]\`]/gi, '');

            } catch (e) {
              window.alert(e.message);
              boo = false;
              await homeliaisonAnalytics({
                page: instance.pageName,
                standard: instance.firstPageViewTime,
                action: "errorOccur",
                data: {
                  error: e.message,
                  date: dateToString(new Date(), true),
                },
              });
              scrollTo(window, firstDom, visualSpecific);
              firstDom.previousElementSibling.style.border = "1px solid " + colorChip.green;
              if (typeof firstDom.focus === "function") {
                firstDom.focus();
              }
              break;
            }
          } else if (/DIV/gi.test(nodeName)) {

            tempTargets = [];
            for (let dom of targets) {
              if (dom.getAttribute(property) === p) {
                tempTargets.push(dom);
              }
            }

            onValue = '';
            for (let dom of tempTargets) {
              if (dom.getAttribute("toggle") === "on") {
                onValue = dom.textContent.trim();
                break;
              }
            }
            tempObj.value = onValue;

          } else if (/ASIDE/gi.test(nodeName)) {

            tempObj.value = firstDom.getAttribute("value");

          }

          map.push(tempObj);
        }

        if (typeof instance.clientSessionId === "string") {
          map.push({
            property: "sessionId",
            value: instance.clientSessionId,
          });
        } else {
          if (typeof window.homeliaisonSessionId === "string") {
            map.push({
              property: "sessionId",
              value: window.homeliaisonSessionId,
            });
          } else {
            window.location.href = FRONTHOST + "/sessionClear.php";
          }
        }

        if (boo) {
          instance.certificationBox(name, phone, async function (back, box) {
            try {
              const { cliid } = await ajaxJson({ map }, BACKHOST + "/clientSubmit");
              if (typeof window.gtag === "function" && typeof window.gadsConverting === "string") {
                window.gtag("event", "conversion", {
                  "send_to": window.gadsConverting,
                  "value": 1.0,
                  "currency": 'KRW'
                });
              }
              if (typeof window.kakaoPixel === "function" && typeof window.kakaoPixelHlId === "string") {
                window.kakaoPixel(window.kakaoPixelHlId).signUp();
              }
              homeliaisonAnalytics({
                page: instance.pageName,
                standard: instance.firstPageViewTime,
                action: "login",
                data: {
                  cliid,
                  date: dateToString(new Date(), true),
                },
              }).then(() => {
                document.body.removeChild(box);
                document.body.removeChild(back);
                selfHref(FRONTHOST + "/curation.php?cliid=" + cliid);
              }).catch((err) => {
                document.body.removeChild(box);
                document.body.removeChild(back);
                selfHref(FRONTHOST + "/curation.php?cliid=" + cliid);
              });
            } catch (e) {
              await ajaxJson({ message: "FrontAboutJs.certificationBox : " + e.message }, BACKHOST + "/errorLog");
            }
          });
        }
      }

    } catch (e) {
      console.log(e);
      await homeliaisonAnalytics({
        page: instance.pageName,
        standard: instance.firstPageViewTime,
        action: "errorOccur",
        data: {
          error: e.message,
          date: dateToString(new Date(), true),
        },
      });
      window.location.reload();
    }
  }
}