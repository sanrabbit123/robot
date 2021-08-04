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
  let map;
  let filteredValue;
  let finalValue, valueTemp;
  let tempBoo, tempFunction;

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
}

GeneralJs.updateValue = async function (dataObj) {
  if (dataObj === undefined) {
    throw new Error("invaild arguments");
  }
  const instance = this;
  const cookies = GeneralJs.getCookiesAll();
  try {
    let dataString, response;

    if (cookies.homeliaisonConsoleLoginedName !== undefined && cookies.homeliaisonConsoleLoginedEmail !== undefined) {
      //set user
      dataObj.user = cookies.homeliaisonConsoleLoginedName + "__split__" + cookies.homeliaisonConsoleLoginedEmail;
      //contents lock
      if (window.location.pathname === "/contents") {
        if (cookies.homeliaisonConsoleLoginedEmail !== "uragenbooks@gmail.com") {
          dataObj.value = dataObj.pastValue;
        }
      }
    } else {
      //set user
      dataObj.user = "unknown" + "__split__" + "unknown@unknown";
      //contents lock
      if (window.location.pathname === "/contents") {
        dataObj.value = dataObj.pastValue;
      }
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
    GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
    console.log(e);
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
  const cookies = GeneralJs.getCookiesAll();
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

GeneralJs.prototype.generalCss = function () {
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
  input::placeholder {color:${GeneralJs.colorChip.white};opacity:0.5;}
  body,div{font-size:0;color:${GeneralJs.colorChip.black};margin:0;}
  a{text-decoration:inherit;color:inherit;-webkit-tap-highlight-color:rgba(0,0,0,0);background:0 0;outline:0}
  textarea{resize:none}
  b,strong{font-weight:inherit;display:inline;}
  img{border:0}
  button,input,optgroup,select,textarea{color:inherit;font:inherit;margin:0}
  button,html input[type=button],input[type=submit]{-webkit-appearance:button;cursor:pointer;box-sizing:border-box;white-space: normal}
  input[type=text],input[type=password],textarea{-webkit-appearance:none;appearance: none;box-sizing:border-box}
  input{line-height:normal}
  input[type=checkbox],input[type=radio]{box-sizing:border-box;padding:0}
  input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{height:auto}input[type=search]{-webkit-appearance:textfield;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box}
  input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration{-webkit-appearance:none}
  p{overflow:hidden;}
  b{color:#c0c0c0;}
  label{cursor:pointer}
  article,section{margin:0;}
  @keyframes in{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0px);}}
  @keyframes fa{from{opacity:0;}to{opacity:1;}}
  @keyframes flash{from,80%,to{opacity:0}30%,50%{opacity:0.85}}
  #totalcontents{display:block;position:relative;left:0;top:0;height:100vh;width:100%}
  #footergreenback0817{display:block;position:relative;width:100%;height:300px;background-color:#2fa678;overflow:hidden}
  .footerbutton{position:absolute;opacity:0;transition:all .5s ease;left:50%;cursor:pointer}
  .footerbutton:hover{opacity:0.5;}
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
  @keyframes justfadeinoriginal{from{opacity:0;}to{opacity:1;}}
  @keyframes justfadeoutoriginal{from{opacity:1;}to{opacity:0;}}
  @keyframes justfadeinnine{from{opacity:0;}to{opacity:0.9;}}
  @keyframes justfadeoutnine{from{opacity:0.9;}to{opacity:0;}}
  @keyframes justfadeineight{from{opacity:0;}to{opacity:0.8;}}
  @keyframes justfadeouteight{from{opacity:0.8;}to{opacity:0;}}
  @keyframes justfadeinmiddle{from{opacity:0;}to{opacity:0.6;}}
  @keyframes justfadeoutmiddle{from{opacity:0.6;}to{opacity:0;}}
  @keyframes justfadein{from{opacity:0;}to{opacity:0.3;}}
  @keyframes justfadeout{from{opacity:0.3;}to{opacity:0;}}
  @keyframes invisible{from{opacity:0;}to{opacity:0;}}
  @keyframes fadedown{from{opacity:1;transform:translateY(0px);}to{opacity:0;transform:translateY(20px);}}
  @keyframes fadeup{from{opacity:0;transform:translateY(20px);}to{opacity:0.95;transform:translateY(0px);}}
  @keyframes fadeupdelay{from,30%{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0px);}}
  @keyframes fadeuplite{from{opacity:0;transform:translateY(5px);}to{opacity:0.95;transform:translateY(0px);}}
  @keyframes fadedownlite{from{opacity:0.95;transform:translateY(0px);}to{opacity:0;transform:translateY(5px);}}
  @keyframes fadeupmiddle{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0px);}}
  @keyframes fadedownmiddle{from{opacity:1;transform:translateY(0px);}to{opacity:0;transform:translateY(10px);}}
  @keyframes fadeupbacklite{from{opacity:0;transform:translateY(5px);}to{opacity:0.2;transform:translateY(0px);}}
  @keyframes loginfadeup0{from{opacity:0;}to{opacity:0.1;}}
  @keyframes loginfadeup1{from{opacity:0;backdrop-filter: blur(0px);}to{opacity:0.6;backdrop-filter: blur(4px);}}
  @keyframes loginfadedown0{from{opacity:0.1;}to{opacity:0;}}
  @keyframes loginfadedown1{from{opacity:0.6;backdrop-filter: blur(4px);}to{opacity:0;backdrop-filter: blur(0px);}}
  @keyframes profilefadeup{from{opacity:0;transform:translateY(10px);}to{opacity:0.9;transform:translateY(0px);}}
  @keyframes communicationfadeup{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0px);}}
  @keyframes fadedowndelay{from{opacity:1;transform:translateY(0px);}70%,to{opacity:0;transform:translateY(-5px);}}

  @keyframes fadeout{from{opacity:1;transform:translateX(0px);}to{opacity:0;transform:translateX(-30px);}}
  @keyframes fadein{from{opacity:0;transform:translateX(30px);}to{opacity:1;transform:translateX(0px);}}
  @keyframes fadeoutlite{from{opacity:1;transform:translateX(0px);}to{opacity:0;transform:translateX(-20px);}}
  @keyframes fadeinlite{from{opacity:0;transform:translateX(20px);}to{opacity:1;transform:translateX(0px);}}
  @keyframes loadingrotate{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
  @keyframes fadecancel{from{opacity:0}to{opacity:0.2}}

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
  styleTag.insertAdjacentHTML(`beforeend`, css);
}

GeneralJs.prototype.returnCircle = function (cssString, color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" class="circle" style="${cssString}"><circle cx="6px" cy="6px" r="6px" fill="${color}" /></svg>`;
}

GeneralJs.prototype.returnPoint = function (radius, color) {
  return `<svg xmlns="http://www.w3.org/2000/svg"><circle cx="${radius}" cy="${radius}" r="${radius}" fill="${color}" /></svg>`;
}

GeneralJs.prototype.returnBigArrow = function (color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140.316 226.772"><path d="M139.316 110.452l-8.145-10.556c0 0 0 0 0-0.001l-53.754-69.665 0 0L56.375 2.962C54.934 1.094 52.709 0 50.35 0h-7.215H28.485 1.886c-1.563 0-2.445 1.795-1.49 3.032l25.144 32.586c0.001 0.001 0.002 0.003 0.003 0.004l58.653 76.015c0.795 1.03 0.795 2.467 0 3.497l-41.894 54.294h0L0.396 223.739c-0.955 1.237-0.073 3.032 1.49 3.032h26.599 14.65 7.215c2.359 0 4.585-1.094 6.026-2.962l4.383-5.681c0 0 0 0 0 0l45.021-58.347v0l2.329-3.019 23.061-29.887c0.001-0.001 0.002-0.003 0.003-0.004l8.142-10.553C140.649 114.591 140.649 112.181 139.316 110.452z" fill="${color}"/></svg>`;
}

GeneralJs.prototype.returnPlus = function (color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35.745 36.805"><path d="M14.19 21.85H0v-6.896h14.19V0h7.287v14.954h14.267v6.896H21.478v14.955h-7.287V21.85z" fill="${color}"/></svg>`;
}

GeneralJs.prototype.returnArrow = function (direction, color) {
  if (direction === undefined && color === undefined) {
    throw new Error("invaild arguments");
  }
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

GeneralJs.prototype.returnCinitial = function (color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 276.866 296.154"><path d="M0 169.978C0 73.134 61.481 0 157.52 0c68.717 0 116.133 34.957 119.346 104.478h-64.695c-4.42-34.557-21.298-53.442-56.661-53.442 -56.658 0-87.199 53.042-87.599 116.93 -0.403 45.809 20.895 76.353 68.314 76.353 34.957 0 59.068-20.498 69.114-55.855h63.894c-12.859 69.515-67.107 107.691-133.814 107.691C52.639 296.154 0 250.345 0 169.978z" fill="${color}"/></svg>`;
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

GeneralJs.prototype.returnHash = function (color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24.955 38.301"><path d="M1.444 10.891h5.414L8.507 0h4.176l-1.701 10.891h5.723L18.407 0h4.176l-1.65 10.891h4.022v4.683h-4.847l-0.979 6.629h4.434v4.683h-5.156l-1.804 11.417h-4.177l1.805-11.417H8.507L6.703 38.301h-4.125l1.702-11.417H0v-4.683h5.053l1.031-6.629H1.444V10.891zM9.178 22.202h5.723l1.083-6.629h-5.671L9.178 22.202z" fill="${color}"/></svg>`;
}

GeneralJs.prototype.returnHamburger = function (color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.853 27.878"><path d="M33.353 3H1.5C0.671 3 0 2.329 0 1.5S0.671 0 1.5 0h31.853c0.829 0 1.5 0.671 1.5 1.5S34.181 3 33.353 3zM34.853 13.939c0-0.829-0.671-1.5-1.5-1.5H1.5c-0.829 0-1.5 0.671-1.5 1.5 0 0.828 0.671 1.5 1.5 1.5h31.853C34.181 15.439 34.853 14.767 34.853 13.939zM34.853 26.378c0-0.828-0.671-1.5-1.5-1.5H1.5c-0.829 0-1.5 0.672-1.5 1.5s0.671 1.5 1.5 1.5h31.853C34.181 27.878 34.853 27.207 34.853 26.378z" fill="${color}"/></svg>`;
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

GeneralJs.prototype.returnLoading = function (color = GeneralJs.colorChip.green, color2 = GeneralJs.colorChip.darkGreen) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 566.929 566.929"><path d="M196.13 552.859c-23.91-7.75-37.01-33.409-29.26-57.31l0 0c7.74-23.9 33.4-37.01 57.31-29.26l0 0c23.9 7.74 37 33.399 29.26 57.31l0 0c-6.24 19.25-24.08 31.49-43.28 31.49l0 0C205.52 555.09 200.79 554.37 196.13 552.859z" fill="${color}"/><path d="M313.729 523.569C305.96 499.67 319.04 474 342.939 466.229l0 0c23.891-7.77 49.561 5.301 57.33 29.2l0 0c7.771 23.9-5.3 49.57-29.2 57.34l0 0c-4.67 1.521-9.409 2.24-14.069 2.24l0 0C337.819 555.01 319.979 542.79 313.729 523.569z" fill="${color2}"/><path d="M54.55 450.109c-14.81-20.3-10.35-48.76 9.96-63.569l0 0c20.3-14.8 48.77-10.34 63.57 9.97l0 0c14.8 20.3 10.34 48.76-9.96 63.56l0 0c-8.09 5.9-17.47 8.74-26.77 8.74l0 0C77.31 468.81 63.45 462.33 54.55 450.109z" fill="${color}"/><path d="M449 459.899c-20.33-14.779-24.82-43.239-10.03-63.56l0 0c14.78-20.32 43.23-24.81 63.561-10.03l0 0c20.319 14.78 24.81 43.24 10.029 63.561l0 0c-8.91 12.239-22.779 18.739-36.84 18.739l0 0C466.439 468.609 457.069 465.78 449 459.899z" fill="${color2}"/><path d="M0.33 283.77C0.3 258.64 20.65 238.25 45.78 238.22l0 0c25.13-0.03 45.52 20.32 45.55 45.45l0 0C91.35 308.8 71 329.189 45.88 329.22l0 0c-0.02 0-0.03 0-0.05 0l0 0C20.72 329.22 0.35 308.88 0.33 283.77z" fill="${color}"/><path d="M475.6 283.46L475.6 283.46c0-0.01 0-0.03 0-0.05l0 0c0-0.12 0-0.24 0-0.36l0 0C475.55 257.92 495.87 237.51 521 237.45l0 0c25.13-0.05 45.55 20.28 45.6 45.41l0 0c0 0.12 0 0.24 0 0.36l0 0c0 0.08 0 0.16 0 0.24l0 0c0 25.13-20.37 45.5-45.5 45.5l0 0C495.97 328.96 475.6 308.59 475.6 283.46z" fill="${color2}"/><path d="M0.33 283.76v0.01l0 0 0 0 0 0C0.33 283.76 0.33 283.76 0.33 283.76z" fill="${color}"/><path d="M64.29 180.85c-20.34-14.76-24.86-43.21-10.1-63.55l0 0C68.95 96.96 97.41 92.44 117.74 107.2l0 0c20.34 14.76 24.86 43.22 10.1 63.55l0 0c-8.9 12.27-22.78 18.78-36.86 18.78l0 0C81.71 189.53 72.36 186.71 64.29 180.85z" fill="${color}"/><path d="M438.729 170.26c-14.83-20.29-10.399-48.76 9.891-63.59l0 0c20.29-14.82 48.76-10.39 63.58 9.9l0 0 0 0 0 0c14.83 20.29 10.399 48.75-9.891 63.58l0 0c-8.1 5.92-17.5 8.77-26.81 8.77l0 0C461.47 188.92 447.64 182.45 438.729 170.26z" fill="${color}"/><path d="M166.43 71.62C158.63 47.73 171.67 22.05 195.57 14.25l0 0c23.89-7.8 49.57 5.25 57.37 29.14l0 0c7.79 23.89-5.26 49.57-29.14 57.37l0 0c-4.69 1.53-9.45 2.26-14.13 2.26l0 0C190.52 103.02 172.69 90.82 166.43 71.62z" fill="${color}"/><path d="M342.56 100.57h-0.01c-23.91-7.72-37.04-33.36-29.32-57.27l0 0C320.95 19.38 346.6 6.25 370.51 13.98l0 0 0 0 0 0C394.42 21.69 407.55 47.34 399.83 71.25l0 0c-6.221 19.27-24.07 31.54-43.29 31.54l0 0C351.91 102.79 347.2 102.07 342.56 100.57z" fill="${color}"/></svg>`;
}

GeneralJs.prototype.returnCheckBox = function (color, uncheck = false) {
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
  if (uncheckColorList.includes(color)) {
    uncheck = true;
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
    1.1608416295982489,
    1.1699145661229966,
    1.5460354444679798,
    1.5304667090305726,
    1.6419896914495518,
    1.4773000070606508,
  ];

  arr = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 93.208 80.293"><path d="M0 42.386v-0.833C0 18.954 15.83 3.541 36.97 3.541c17.912 0 31.242 8.748 33.013 27.077H52.696c-1.25-8.956-6.249-13.747-15.622-13.747 -11.768 0-19.266 9.165-19.266 24.577V42.281c0 15.413 7.082 24.369 19.371 24.369 9.269 0 15.725-4.686 17.079-14.267h16.559c-1.875 18.433-15.101 27.91-33.43 27.91C13.018 80.293 0 65.297 0 42.386z" fill="${color}"/><path d="M78.211 0h14.997v79.147h-14.997V0z" fill="${color}"/></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 93.937 80.293"><path d="M0 4.687h25.724c18.12 0 28.43 8.019 28.43 23.744v0.417c0 15.726-10.935 23.224-27.909 23.224h-9.478v27.077H0V4.687zM25.307 40.303c8.228 0 12.602-3.958 12.602-11.352V28.535c0-7.915-4.583-11.039-12.602-11.039h-8.54v22.807H25.307z" fill="${color}"/><path d="M61.236 24.682h15.101v10.414c3.437-7.29 8.748-11.143 17.6-11.247v14.059c-11.143-0.104-17.6 3.541-17.6 13.955v27.285H61.236V24.682z" fill="${color}"/></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 124.136 80.293"><path d="M0 42.386v-0.833C0 18.954 15.83 3.541 36.97 3.541c17.912 0 31.242 8.748 33.013 27.076H52.696c-1.25-8.956-6.249-13.746-15.622-13.746 -11.768 0-19.266 9.164-19.266 24.577V42.281c0 15.413 7.082 24.369 19.371 24.369 9.269 0 15.725-4.687 17.079-14.268H70.816c-1.875 18.434-15.1 27.91-33.429 27.91C13.018 80.293 0 65.297 0 42.386z" fill="${color}"/><path d="M74.773 64.047c0-12.705 11.664-17.496 28.327-17.496h6.145v-2.187c0-6.457-1.979-9.997-8.852-9.997 -5.936 0-8.644 3.02-9.269 7.706H76.856c0.938-12.914 11.143-18.642 24.473-18.642s22.807 5.416 22.807 20.204v35.512h-14.684v-6.561c-3.124 4.374-7.915 7.706-16.454 7.706C83.104 80.293 74.773 75.503 74.773 64.047zM109.244 60.09v-4.582h-5.832c-8.748 0-13.851 1.874-13.851 7.706 0 3.957 2.396 6.561 7.915 6.561C104.141 69.774 109.244 66.13 109.244 60.09z" fill="${color}"/></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.889 80.293"><path d="M0 4.687h24.369c26.14 0 39.053 14.163 39.053 36.449V41.969c0 22.286-13.018 37.179-39.156 37.179H0V4.687zM23.744 66.025c14.997 0 22.078-8.436 22.078-23.848V41.344c0-15.309-6.561-23.535-22.286-23.535h-6.665v48.217H23.744z" fill="${color}"/><path d="M68.318 52.592v-0.833c0-17.184 12.185-28.327 28.015-28.327 14.059 0 26.556 8.228 26.556 27.702v4.165H83.628c0.416 9.061 5.311 14.268 13.538 14.268 6.978 0 10.414-3.021 11.352-7.603h14.268c-1.771 11.769-11.144 18.329-26.036 18.329C80.295 80.293 68.318 69.983 68.318 52.592zM108.205 46.03c-0.521-8.227-4.687-12.185-11.872-12.185 -6.77 0-11.352 4.479-12.497 12.185H108.205z" fill="${color}"/></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 131.843 80.293"><path d="M0 42.386v-0.833C0 18.954 15.829 3.541 36.97 3.541c17.912 0 31.242 8.748 33.013 27.077H52.695c-1.25-8.956-6.249-13.747-15.621-13.747 -11.769 0-19.267 9.165-19.267 24.577V42.281c0 15.413 7.082 24.369 19.37 24.369 9.269 0 15.726-4.686 17.079-14.267h16.559c-1.874 18.433-15.101 27.91-33.429 27.91C13.018 80.293 0 65.297 0 42.386z" fill="${color}"/><path d="M74.462 52.487v-0.833c0-17.079 12.393-28.222 28.742-28.222 16.351 0 28.639 10.935 28.639 27.91v0.833c0 17.184-12.393 28.118-28.742 28.118C86.854 80.293 74.462 69.462 74.462 52.487zM116.534 52.279v-0.729c0-10.414-4.895-16.663-13.33-16.663 -8.331 0-13.33 6.041-13.33 16.455v0.833c0 10.414 4.791 16.663 13.33 16.663C111.64 68.837 116.534 62.589 116.534 52.279z" fill="${color}"/></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 118.618 80.293"><path d="M0 55.819h16.142c0.729 6.666 3.541 12.185 14.579 12.185 7.395 0 12.289-4.062 12.289-9.893 0-5.937-3.124-8.02-14.059-9.686C9.893 45.927 2.082 40.198 2.082 25.827c0-12.705 10.623-22.182 27.077-22.182 16.767 0 26.556 7.498 27.91 22.287H41.552c-1.041-6.77-4.999-9.894-12.393-9.894 -7.395 0-11.144 3.437-11.144 8.436 0 5.311 2.396 7.811 13.852 9.477 18.016 2.291 27.284 7.186 27.284 22.599 0 13.226-10.83 23.744-28.431 23.744C10.31 80.293 0.937 70.712 0 55.819z" fill="${color}"/><path d="M64.049 52.592v-0.833c0-17.184 12.184-28.327 28.014-28.327 14.059 0 26.556 8.228 26.556 27.702v4.165H79.357c0.416 9.061 5.311 14.268 13.538 14.268 6.978 0 10.414-3.021 11.352-7.603h14.268c-1.771 11.769-11.144 18.329-26.036 18.329C76.024 80.293 64.049 69.983 64.049 52.592zM103.935 46.03c-0.521-8.227-4.687-12.185-11.872-12.185 -6.77 0-11.352 4.479-12.497 12.185H103.935z" fill="${color}"/></svg>`,
  ];

  return { heightRatio: ratio, svg: arr };
}

GeneralJs.prototype.returnNavigator = function (color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8.181 7.908"><path d="M7.893 6.239h-7.604C0.129 6.239 0 6.368 0 6.527v1.092c0 0.159 0.129 0.289 0.289 0.289h7.604c0.159 0 0.289-0.129 0.289-0.289V6.527C8.181 6.368 8.052 6.239 7.893 6.239z" fill="#34A77A"/><path d="M0.276 5.519h7.63c0.231 0 0.359-0.28 0.214-0.468l-3.763-4.917c-0.136-0.178-0.396-0.178-0.532 0l-3.764 4.917C-0.083 5.239 0.045 5.519 0.276 5.519z" fill="${color}"/></svg>`;
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

GeneralJs.prototype.returnCalendar = function (color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1343.66 1279.127"><path fill="${color}" d="M1343.66 90.609c0-35.574-20.504-66.354-50.336-81.182 -1.354-0.673-2.728-1.313-4.12-1.92 -1.225-0.534-2.463-1.041-3.715-1.521 -0.873-0.335-1.753-0.657-2.639-0.965 -2.514-0.875-5.077-1.643-7.686-2.298C1268.085 0.947 1260.679 0 1253.051 0H90.609C72.315 0 55.29 5.427 41.048 14.751c-0.976 0.639-1.942 1.291-2.891 1.966 -0.849 0.604-1.683 1.227-2.51 1.859 -3.773 2.883-7.317 6.052-10.59 9.482 -0.046 0.048-0.092 0.098-0.138 0.146 -0.908 0.955-1.794 1.931-2.66 2.925 -1.069 1.227-2.105 2.484-3.107 3.768C7.152 50.264 0 69.601 0 90.609v169.702h0v928.208c0 50.042 40.567 90.609 90.609 90.609h1162.442c50.042 0 90.609-40.567 90.609-90.609V260.311h0V90.609zM1291.361 1188.518c0 21.158-17.152 38.311-38.311 38.311H90.609c-21.158 0-38.311-17.152-38.311-38.311V280.009c0-10.879 8.819-19.699 19.699-19.699h1199.666c10.879 0 19.699 8.819 19.699 19.699V1188.518z"/><path fill="${color}" d="M358.2 576.714h-161.176c-9.348 0-16.927-7.578-16.927-16.927V398.612c0-9.348 7.578-16.927 16.927-16.927h161.176c9.348 0 16.927 7.578 16.927 16.927v161.176C375.127 569.136 367.548 576.714 358.2 576.714z"/><path fill="${color}" d="M620.995 576.714H459.82c-9.348 0-16.927-7.578-16.927-16.927V398.612c0-9.348 7.578-16.927 16.927-16.927h161.176c9.348 0 16.927 7.578 16.927 16.927v161.176C637.922 569.136 630.344 576.714 620.995 576.714z"/><path fill="${color}" d="M883.792 576.714H722.616c-9.348 0-16.927-7.578-16.927-16.927V398.612c0-9.348 7.578-16.927 16.927-16.927h161.176c9.348 0 16.927 7.578 16.927 16.927v161.176C900.718 569.136 893.14 576.714 883.792 576.714z"/><path fill="${color}" d="M1146.588 576.714H985.412c-9.348 0-16.927-7.578-16.927-16.927V398.612c0-9.348 7.578-16.927 16.927-16.927h161.176c9.348 0 16.927 7.578 16.927 16.927v161.176C1163.515 569.136 1155.936 576.714 1146.588 576.714z"/><path fill="${color}" d="M358.2 839.509h-161.176c-9.348 0-16.927-7.578-16.927-16.927V661.407c0-9.348 7.578-16.927 16.927-16.927h161.176c9.348 0 16.927 7.578 16.927 16.927v161.176C375.127 831.931 367.548 839.509 358.2 839.509z"/><path fill="${color}" d="M620.995 839.509H459.82c-9.348 0-16.927-7.578-16.927-16.927V661.407c0-9.348 7.578-16.927 16.927-16.927h161.176c9.348 0 16.927 7.578 16.927 16.927v161.176C637.922 831.931 630.344 839.509 620.995 839.509z"/><path fill="${color}" d="M883.792 839.509H722.616c-9.348 0-16.927-7.578-16.927-16.927V661.407c0-9.348 7.578-16.927 16.927-16.927h161.176c9.348 0 16.927 7.578 16.927 16.927v161.176C900.718 831.931 893.14 839.509 883.792 839.509z"/><path fill="${color}" d="M1146.588 839.509H985.412c-9.348 0-16.927-7.578-16.927-16.927V661.407c0-9.348 7.578-16.927 16.927-16.927h161.176c9.348 0 16.927 7.578 16.927 16.927v161.176C1163.515 831.931 1155.936 839.509 1146.588 839.509z"/><path fill="${color}" d="M358.2 1102.305h-161.176c-9.348 0-16.927-7.578-16.927-16.927V924.202c0-9.348 7.578-16.927 16.927-16.927h161.176c9.348 0 16.927 7.578 16.927 16.927v161.176C375.127 1094.726 367.548 1102.305 358.2 1102.305z"/><path fill="${color}" d="M620.995 1102.305H459.82c-9.348 0-16.927-7.578-16.927-16.927V924.202c0-9.348 7.578-16.927 16.927-16.927h161.176c9.348 0 16.927 7.578 16.927 16.927v161.176C637.922 1094.726 630.344 1102.305 620.995 1102.305z"/><path fill="${color}" d="M883.792 1102.305H722.616c-9.348 0-16.927-7.578-16.927-16.927V924.202c0-9.348 7.578-16.927 16.927-16.927h161.176c9.348 0 16.927 7.578 16.927 16.927v161.176C900.718 1094.726 893.14 1102.305 883.792 1102.305z"/><path fill="${color}" d="M1146.588 1102.305H985.412c-9.348 0-16.927-7.578-16.927-16.927V924.202c0-9.348 7.578-16.927 16.927-16.927h161.176c9.348 0 16.927 7.578 16.927 16.927v161.176C1163.515 1094.726 1155.936 1102.305 1146.588 1102.305z"/></svg>`;
}

GeneralJs.prototype.returnQuotes = function (color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56.785 49.482"><path d="M1.404 41.51C-3.883 27.672 6.229 7.036 23.924 0l1.608 2.581c-8.272 4.924-13.097 10.083-14.936 15.947 -1.379 4.22 0.69 6.799 3.446 7.034 6.205 0.47 10.8 5.862 10.8 11.492 0 6.801-5.054 12.428-11.718 12.428C7.837 49.482 3.242 46.2 1.404 41.51zM32.657 41.51C27.37 27.672 37.482 7.036 55.177 0l1.608 2.581c-8.272 4.924-13.097 10.083-14.936 15.947 -1.379 4.22 0.69 6.799 3.446 7.034 6.205 0.47 10.802 5.862 10.802 11.492 0 6.801-5.056 12.428-11.72 12.428C39.09 49.482 34.495 46.2 32.657 41.51z" fill="${color}"/></svg>`;
}

GeneralJs.prototype.returnDownload = function (color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.853 30.842"><path fill="${color}" d="M16.366 25.637c0.281 0.281 0.663 0.439 1.061 0.439s0.78-0.158 1.061-0.439L25.75 18.375c0.586-0.586 0.586-1.535 0-2.121s-1.535-0.586-2.121 0l-4.703 4.703V1.5c0-0.829-0.671-1.5-1.5-1.5s-1.5 0.671-1.5 1.5v19.456l-4.702-4.702c-0.586-0.586-1.535-0.586-2.121 0s-0.586 1.535 0 2.121L16.366 25.637z"/><path d="M25.45 27.83H9.403c-0.829 0-1.5 0.672-1.5 1.5s0.671 1.5 1.5 1.5h16.047c0.828 0 1.5-0.672 1.5-1.5S26.278 27.83 25.45 27.83z" fill="${color}"/></svg>`;
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
    color: GeneralJs.colorChip.white,
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
  const cookies = GeneralJs.getCookiesAll();
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
              background: "rgb(247, 247, 247)",
              borderBottom: "1px dashed rgb(221, 221, 221)",
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
              background: "rgb(247, 247, 247)",
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
                    GeneralJs.ajax("id=" + id + "&column=manager&value=" + value + "&email=" + cookies.homeliaisonConsoleLoginedEmail + "&method=" + thisPathName, "/updateHistory", function () {
                      button.textContent = value;
                      const removeTargets = document.querySelectorAll(".removeTarget");
                      for (let i = 0; i < removeTargets.length; i++) {
                        removeTargets[i].parentNode.removeChild(removeTargets[i]);
                      }
                    });
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
  style = {
    display: "block",
    position: "fixed",
    background: GeneralJs.colorChip.gradientGreen,
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
  start = 7;
  colors = [
    GeneralJs.colorChip.green,
    GeneralJs.colorChip.yellow,
    GeneralJs.colorChip.red,
  ];

  for (let i = 0; i < colors.length; i++) {
    div_clone.insertAdjacentHTML(`beforeend`, this.returnCircle("right:" + String(start + (margin * i)) + ea, colors[i]));
  }

  div_clone.lastChild.addEventListener("click", function (e) {
    if (!GeneralJs.stacks["dashboardBoxBoo"]) {
      instance.dashboardBox();
    } else {
      instance.below.removeChild(GeneralJs.stacks["dashboardBoxMother"]);
      GeneralJs.stacks["dashboardBoxBoo"] = false;
      GeneralJs.stacks["dashboardBox"] = null;
      GeneralJs.stacks["dashboardBoxMother"] = null;
    }
  });

  //arrow - left
  move = 300;
  top = 32;
  right = 38;

  div_clone2 = GeneralJs.nodes.div.cloneNode(true);
  div_clone2.appendChild(SvgTong.stringParsing(this.returnBigArrow(GeneralJs.colorChip.white)));
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
    const targets = document.querySelectorAll(".moveTarget");
    const ea = "px";
    const translateFunc = function (past) {
      const newValue = Number(past.replace(/[^0-9\-\.]/g, '')) - move;
      return ("translateX(" + String(newValue) + ea + ")");
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
  }

  div_clone2.addEventListener("click", moveEventLeft);
  this.belowButtons.arrow.left = div_clone2;
  div_clone.appendChild(div_clone2);

  //arrow - right
  div_clone2 = GeneralJs.nodes.div.cloneNode(true);
  div_clone2.appendChild(SvgTong.stringParsing(this.returnBigArrow(GeneralJs.colorChip.white)));
  div_clone2.classList.add("hoverDefault");
  for (let i in style) {
    div_clone2.style[i] = style[i];
  }
  div_clone2.style.top = String(top + 2) + ea;
  div_clone2.style.right = String(right + 50) + ea;
  div_clone2.style.transform = "rotate(180deg)";

  moveEventRight = function (e) {
    const targets = document.querySelectorAll(".moveTarget");
    const ea = "px";
    const translateFunc = function (past) {
      const newValue = Number(past.replace(/[^0-9\-\.]/g, '')) + move;
      return ("translateX(" + String(newValue) + ea + ")");
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
  }

  div_clone2.addEventListener("click", moveEventRight);
  this.belowButtons.arrow.right = div_clone2;
  div_clone.appendChild(div_clone2);

  iconRight = right + 102;
  top = top;
  belowTop = top + 34;

  //report
  svg_icon = SvgTong.stringParsing(this.returnReport(GeneralJs.colorChip.white));
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
  svg_icon = SvgTong.stringParsing(this.returnReturn(GeneralJs.colorChip.white));
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
  svg_icon = SvgTong.stringParsing(this.returnCinitial(GeneralJs.colorChip.white));
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
  svg_icon = SvgTong.stringParsing(this.returnRinitialItalic(GeneralJs.colorChip.white));
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
  const { heightRatio: naviIconsRatio, svg: naviIcons } = this.returnTitleArr(GeneralJs.colorChip.white, 23);
  let naviIconsHost, naviIconsLeftException;
  let naviIconsLinks, naviIconsContextLinks;
  let naviIconsMap;

  naviIconsHost = window.location.protocol + "//" + window.location.host;
  naviIconsLinks = [
    "/client",
    "/proposal",
    "/project",
    "/designer",
    "/designer?mode=contents",
    "/service",
  ];
  naviIconsContextLinks = [
    "/analytics",
    "/proposal",
    "/designer?mode=contents",
    "/designer?mode=aspirant",
    "/contents",
    "/service",
  ];
  naviIconsLeftException = [
    0,
    2,
    -2.5,
    -1.5,
    2,
    3,
  ];
  naviIconsMap = [
    [ "client", "analytics" ],
    [ "proposal" ],
    [ "project" ],
    [ "designer", "aspirant" ],
    [ "contents" ],
    [ "service" ]
  ];

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
    if (naviIconsMap[i].includes(thisPathName)) {
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
  svg_icon = SvgTong.stringParsing(this.returnExtract(GeneralJs.colorChip.white));
  svg_icon.classList.add("hoverDefault");
  for (let i in style) {
    svg_icon.style[i] = style[i];
  }
  additionalStyle = {
    right: "",
    width: String(25) + ea,
    height: String(23) + ea,
    top: String(top - 1) + ea,
    left: String(iconRight + 46) + ea,
  };
  for (let i in additionalStyle) {
    svg_icon.style[i] = additionalStyle[i];
  }
  this.belowButtons.sub.extractIcon = svg_icon;
  div_clone.appendChild(svg_icon);

  //talk icon
  svg_icon = SvgTong.stringParsing(this.returnTalk(GeneralJs.colorChip.white));
  svg_icon.classList.add("hoverDefault");
  for (let i in style) {
    svg_icon.style[i] = style[i];
  }
  additionalStyle = {
    right: "",
    width: String(25) + ea,
    height: String(24) + ea,
    top: String(belowTop - 2) + ea,
    left: String(iconRight + 46) + ea,
  };
  for (let i in additionalStyle) {
    svg_icon.style[i] = additionalStyle[i];
  }
  this.belowButtons.sub.talkIcon = svg_icon;
  div_clone.appendChild(svg_icon);

  //file manager icon
  svg_icon = SvgTong.stringParsing(this.returnFolder(GeneralJs.colorChip.white));
  svg_icon.classList.add("hoverDefault");
  for (let i in style) {
    svg_icon.style[i] = style[i];
  }
  additionalStyle = {
    right: "",
    width: String(25) + ea,
    height: String(23) + ea,
    top: String(top - 1) + ea,
    left: String(iconRight + 82) + ea,
  };
  for (let i in additionalStyle) {
    svg_icon.style[i] = additionalStyle[i];
  }
  this.belowButtons.sub.folder = svg_icon;
  div_clone.appendChild(svg_icon);

  //profile icon
  svg_icon = SvgTong.stringParsing(this.returnProfile(GeneralJs.colorChip.white));
  svg_icon.classList.add("hoverDefault");
  for (let i in style) {
    svg_icon.style[i] = style[i];
  }
  additionalStyle = {
    right: "",
    width: String(26) + ea,
    height: String(24) + ea,
    top: String(belowTop - 2) + ea,
    left: String(iconRight + 81) + ea,
  };
  for (let i in additionalStyle) {
    svg_icon.style[i] = additionalStyle[i];
  }
  svg_icon.addEventListener("click", this.memberView());
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
        boxShadow: "-1px 4px 15px -9px " + colorChip.gray5,
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
  return function (e) {
    const member = instance.member;
    let div_clone, div_clone2;
    let svg_clone;
    let style;
    let ea = "px";
    let temp;

    instance.memberBox = {};

    //cancel back
    div_clone = GeneralJs.nodes.div.cloneNode(true);
    style = {
      position: "fixed",
      width: String(98.5) + "vw",
      height: String(98) + "vh",
      bottom: String(0) + ea,
      left: String(0) + ea,
      background: "transparent",
      opacity: String(0),
      zIndex: String(3),
    };
    for (let i in style) {
      div_clone.style[i] = style[i];
    }
    div_clone.addEventListener("click", function (e) {
      instance.memberBox.cancel.remove();
      instance.memberBox.contents.remove();
    });
    instance.memberBox.cancel = div_clone;
    document.getElementById("totalcontents").appendChild(div_clone);

    //white box
    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("backblurdefault_lite");
    style = {
      position: "fixed",
      width: String(326) + ea,
      height: String(160) + ea,
      bottom: String(66) + ea,
      left: String(220) + ea,
      background: GeneralJs.colorChip.white,
      borderRadius: String(4) + ea,
      opacity: String(0.9),
      boxShadow: "0px 6px 18px -9px #505050",
      animation: "profilefadeup 0.4s ease forwards",
      zIndex: String(3),
    };
    for (let i in style) {
      div_clone.style[i] = style[i];
    }

    //photo
    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    style = {
      position: "absolute",
      width: String(114) + ea,
      height: String(114) + ea,
      top: String(24) + ea,
      left: String(24) + ea,
      borderRadius: String(60) + ea,
    };
    for (let i in style) {
      div_clone2.style[i] = style[i];
    }
    if (member.photo !== undefined && member.photo !== null) {
      div_clone2.style.backgroundImage = 'url("' + S3HOST + member.photo + '")';
      div_clone2.style.backgroundSize = '102% 102%';
      div_clone2.style.backgroundPosition = '-1% -1%';
    } else {
      temp = SvgTong.stringParsing(instance.returnProfile(GeneralJs.colorChip.gray3, true));
      temp.style.position = "absolute";
      temp.style.width = "100%";
      temp.style.height = "100%";
      temp.style.top = "0" + ea;
      temp.style.left = "0" + ea;
      div_clone2.appendChild(temp);
    }
    div_clone.appendChild(div_clone2);

    //name
    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    style = {
      position: "absolute",
      top: String(30) + ea,
      left: String(157) + ea,
      fontSize: String(24) + ea,
      fontWeight: String(600),
    };
    for (let i in style) {
      div_clone2.style[i] = style[i];
    }
    div_clone2.textContent = member.name;
    div_clone.appendChild(div_clone2);

    //id
    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    style = {
      position: "absolute",
      top: String(45) + ea,
      left: String(227) + ea,
      fontSize: String(12) + ea,
      fontWeight: String(200),
      color: "#808080",
    };
    for (let i in style) {
      div_clone2.style[i] = style[i];
    }
    div_clone2.textContent = member.id;
    div_clone.appendChild(div_clone2);

    //bar
    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    style = {
      position: "absolute",
      top: String(66) + ea,
      left: String(158) + ea,
      width: String(139) + ea,
      borderBottom: "1px solid " + GeneralJs.colorChip.gray2,
    };
    for (let i in style) {
      div_clone2.style[i] = style[i];
    }
    div_clone.appendChild(div_clone2);

    //roles
    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    style = {
      position: "absolute",
      top: String(74) + ea,
      left: String(158) + ea,
      fontSize: String(12.5) + ea,
      fontWeight: String(400),
      color: GeneralJs.colorChip.green,
      width: String(137) + ea,
      overflow: "hidden",
    };
    for (let i in style) {
      div_clone2.style[i] = style[i];
    }
    div_clone2.textContent = member.roles.join(", ");
    div_clone.appendChild(div_clone2);

    //email
    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    style = {
      position: "absolute",
      top: String(91) + ea,
      left: String(158) + ea,
      fontSize: String(12.5) + ea,
      fontWeight: String(400),
      width: String(137) + ea,
      overflow: "hidden",
    };
    for (let i in style) {
      div_clone2.style[i] = style[i];
    }
    div_clone2.textContent = member.email[0];
    div_clone.appendChild(div_clone2);

    //phone
    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    style = {
      position: "absolute",
      top: String(109) + ea,
      left: String(158) + ea,
      fontSize: String(12.5) + ea,
      fontWeight: String(400),
      width: String(137) + ea,
      overflow: "hidden",
    };
    for (let i in style) {
      div_clone2.style[i] = style[i];
    }
    div_clone2.textContent = member.phone;
    div_clone.appendChild(div_clone2);

    //logout icon
    svg_clone = SvgTong.stringParsing(instance.returnLogout(GeneralJs.colorChip.green));
    svg_clone.classList.add("hoverDefault");
    style = {
      position: "absolute",
      bottom: String(17.5) + ea,
      right: String(11) + ea,
      width: String(16) + ea,
      height: String(16 / SvgTong.getRatio(svg_clone)) + ea,
    };
    for (let i in style) {
      svg_clone.style[i] = style[i];
    }
    svg_clone.addEventListener("click", function (e) {
      let obj = {};
      obj["homeliaisonConsoleLoginedName"] = '';
      obj["homeliaisonConsoleLoginedEmail"] = '';
      obj["homeliaisonConsoleLoginedBoolean"] = '';
      GeneralJs.setCookie(obj, true);
      window.location.reload();
    });
    div_clone.appendChild(svg_clone);

    instance.memberBox.contents = div_clone;
    document.getElementById("totalcontents").appendChild(div_clone);
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
      boxShadow: "0px 4px 13px -8px #808080",
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
      boxShadow: "0px 4px 13px -8px #808080",
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
      background: blackMode ? GeneralJs.colorChip.gradientGray : GeneralJs.colorChip.gradientGreen,
      borderRadius: String(5) + ea,
      height: String(40) + ea,
      bottom: String((this.belowHeight === undefined ? 0 : this.belowHeight) + 22) + ea,
      boxShadow: "0px 5px 12px -8px " + blackMode ? GeneralJs.colorChip.gray4 : GeneralJs.colorChip.green,
      opacity: String(0),
      width: String(2000) + ea,
      transition: "all 0s ease",
      zIndex: String(200),
    };
    for (let i in style) {
      div_clone.style[i] = style[i];
    }

    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    style = {
      position: "absolute",
      textAlign: "center",
      color: GeneralJs.colorChip.white,
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

    const cookies = GeneralJs.getCookiesAll();
    if (cookies.hasOwnProperty("homeliaisonConsoleLoginedEmail")) {
      let { result } = JSON.parse(await GeneralJs.ajaxPromise("type=boo&value=" + cookies["homeliaisonConsoleLoginedEmail"], "/getMembers"));
      if (result !== null) {
        memberBoo = true;
        thisMember = result;
      } else {
        memberBoo = false;
        thisMember = null;
      }
    }

    this.loginBox = [];

    if (memberBoo) {

      this.member = thisMember;

    } else {

      div_clone = GeneralJs.nodes.div.cloneNode(true);
      style = {
        position: "fixed",
        width: "100%",
        height: "100%",
        background: GeneralJs.colorChip.white,
        opacity: String(0),
        zIndex: String(3),
        backdropFilter: "invert(1)",
        animation: "loginfadeup0 0.5s ease forwards",
      };
      for (let i in style) {
        div_clone.style[i] = style[i];
      }
      this.totalContents.appendChild(div_clone);
      this.loginBox.push(div_clone);

      div_clone = GeneralJs.nodes.div.cloneNode(true);
      div_clone.classList.add("backblurdefault_lite");
      style = {
        position: "fixed",
        width: "100%",
        height: "100%",
        background: GeneralJs.colorChip.white,
        opacity: String(0),
        zIndex: String(3),
        animation: "loginfadeup1 0.5s ease forwards",
      };
      for (let i in style) {
        div_clone.style[i] = style[i];
      }

      this.totalContents.appendChild(div_clone);
      this.loginBox.push(div_clone);

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
      GeneralJs.stacks["GoogleClientProfile"].homeliaisonConsoleLoginedName = name;
      GeneralJs.stacks["GoogleClientProfile"].homeliaisonConsoleLoginedEmail = email;
      GeneralJs.stacks["GoogleClientProfile"].homeliaisonConsoleLoginedBoolean = true;

      GeneralJs.setCookie(GeneralJs.stacks["GoogleClientProfile"]);

      tempObj = JSON.parse(await GeneralJs.ajaxPromise("type=boo&value=" + email, "/getMembers"));
      if (tempObj.result !== null) {
        thisMember = tempObj.result;
        this.member = thisMember;
        this.loginBox[0].style.animation = "loginfadedown0 0.5s ease forwards";
        this.loginBox[1].style.animation = "loginfadedown1 0.5s ease forwards";
        GeneralJs.timeouts["login"] = setTimeout(function () {
          instance.totalContents.removeChild(instance.totalContents.lastChild);
          instance.totalContents.removeChild(instance.totalContents.lastChild);
          clearTimeout(GeneralJs.timeouts["login"]);
          GeneralJs.timeouts["login"] = null;
        }, 500);
      } else {
        alert("허가된 멤버가 아닙니다.");
        // window.location.href = "https://home-liaison.com";
      }
    }

  } catch (e) {
    // window.location.href = "https://home-liaison.com";
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

  SvgTong["pending_svgIcon"] = '<svg xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 129.704 20.881"><path d="M0.798 1.519h10.759v1.98H7.46v0.616c0 3.058 2.264 5.5 4.636 6.271l-1.293 1.914c-1.704-0.682-3.666-2.464-4.549-4.4 -0.604 2.024-2.803 4.202-4.851 4.973L0 11.002c2.868-1.078 5.045-3.741 5.045-6.799V3.499H0.798V1.519zM3.579 20.265v-6.534h2.329v4.599h11.449v1.936H3.579zM14.554 15.16v-7.547h-3.299V5.611h3.299V0h2.35v15.16H14.554z" fill="#5F5F5F"/><path d="M19.382 11.794V9.857h8.042V6.997h2.35v2.86h8.064v1.937H19.382zM36.027 8.229c-2.933-0.484-6.404-2.377-7.396-4.643 -0.97 2.266-4.226 4.093-7.396 4.62l-1.013-1.87c3.407-0.374 7.201-2.442 7.201-5.522V0.176h2.437v0.639c0 3.08 4.312 5.324 7.201 5.522L36.027 8.229zM28.632 20.881c-4.528 0-7.093-1.474-7.093-3.807 0-2.354 2.565-3.851 7.072-3.851s7.093 1.497 7.093 3.851C35.704 19.407 33.117 20.881 28.632 20.881zM28.61 15.16c-2.868 0-4.657 0.727-4.657 1.914 0 1.211 1.79 1.915 4.657 1.915 2.889 0 4.679-0.704 4.679-1.915C33.289 15.887 31.5 15.16 28.61 15.16z" fill="#5F5F5F"/><path d="M47.928 20.859c-4.484 0-7.093-1.475-7.093-3.807 0-2.112 2.134-3.521 5.864-3.785v-1.76h-8.021V9.571h18.456v1.937h-8.085v1.76c3.773 0.221 5.951 1.673 5.951 3.785C55 19.385 52.391 20.859 47.928 20.859zM55.15 8.449C52.089 8.075 49.027 6.315 47.928 4.313c-0.992 2.156-3.859 3.763-7.244 4.137l-1.014-1.87c3.234-0.22 6.274-1.694 6.921-4.026h-6.015V0.616h14.704v1.937h-5.994c0.733 2.332 4.14 3.851 6.899 4.026L55.15 8.449zM47.906 15.16c-2.846 0-4.657 0.66-4.657 1.893 0 1.254 1.811 1.87 4.657 1.87 2.868 0 4.679-0.616 4.679-1.87C52.585 15.82 50.752 15.16 47.906 15.16z" fill="#5F5F5F"/><path d="M63.774 10.605c-2.954 0-5.218-1.804-5.218-4.73 0-2.86 2.264-4.929 5.218-4.929 2.976 0 5.239 2.002 5.239 4.929S66.75 10.605 63.774 10.605zM63.774 2.927c-1.617 0-2.868 1.122-2.868 2.904 0 1.76 1.272 2.794 2.868 2.794 1.617 0 2.889-1.034 2.889-2.794C66.663 4.005 65.434 2.927 63.774 2.927zM61.467 20.595v-8.295h2.35v2.179h8.646v-2.223h2.35v8.339H61.467zM72.463 16.393h-8.646v2.267h8.646V16.393zM72.441 11.156V0h2.351v11.156H72.441z" fill="#5F5F5F"/><path d="M90.078 14.83c-2.501 0.616-6.921 0.99-9.486 1.013l-2.135 0.021V2.156h2.328v11.596c2.717 0.088 6.749-0.374 9.013-0.902L90.078 14.83zM91.673 20.859V0h2.35v20.859H91.673z" fill="#5F5F5F"/><path d="M108.468 15.051c-2.221 0.483-5.498 0.704-8.927 0.704h-2.156V1.958h9.293v1.959h-6.964v9.835c2.522 0.044 5.843-0.109 8.452-0.66L108.468 15.051zM112.414 9.989V20.859h-2.351V0h2.351v7.987h3.083v2.002H112.414z" fill="#5F5F5F"/><path d="M116.79 15.755h2.522v2.53h-2.522V15.755z" fill="#5F5F5F"/><path d="M121.985 15.755h2.522v2.53h-2.522V15.755z" fill="#5F5F5F"/><path d="M127.181 15.755h2.522v2.53h-2.522V15.755z" fill="#5F5F5F"/></svg>';

  SvgTong["certification_svgIcon"] = '<svg xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 284.934 20.903"><path d="M4.485 20.837v-5.391H0v-1.914h18.456v1.914h-4.571v5.391h-2.35v-5.391H6.835v5.391H4.485zM1.1 5.148V3.234h16.3v1.914H1.1zM9.271 12.476c-3.751 0-6.425-1.254-6.425-3.256 0-2.003 2.673-3.278 6.425-3.278s6.425 1.275 6.425 3.278C15.696 11.222 13.022 12.476 9.271 12.476zM9.271 7.768c-2.091 0-3.945 0.418-3.945 1.452 0 1.012 1.854 1.43 3.945 1.43 2.07 0 3.924-0.418 3.924-1.43C13.195 8.186 11.341 7.768 9.271 7.768zM5.67 0.176h7.137v1.959H5.67V0.176z" fill="#5F5F5F"/><path d="M28.847 15.183c-1.703 0.396-4.355 0.572-6.834 0.572h-2.048V2.53h7.697v1.937c-1.768 0-3.579-0.022-5.326-0.022v9.33c2.566 0 4.657-0.177 6.209-0.528L28.847 15.183zM34.259 20.859V10.298h-2.07v9.549h-2.221V0.418h2.221v7.877h2.07V0h2.264v20.859H34.259z" fill="#5F5F5F"/><path d="M38.592 13.202v-1.914h7.999V9.22H40.403V7.283h3.083L42.925 3.696l2.307-0.264 0.453 3.851h4.162l0.517-3.873 2.329 0.353 -0.647 3.521h3.105v1.937H48.941v2.068h8.107v1.914H38.592zM40.36 2.751V0.836H55.172v1.915H40.36zM40.963 20.265V14.5h2.35v3.829h11.6v1.936H40.963z" fill="#5F5F5F"/><path d="M69.229 11.75c-3.126 0-5.261-2.112-5.261-5.083s2.113-5.127 5.261-5.127c3.126 0 5.239 2.135 5.239 5.105C74.468 9.615 72.355 11.75 69.229 11.75zM69.229 3.543c-1.746 0-2.911 1.342-2.911 3.103 0 1.716 1.165 3.08 2.911 3.08 1.79 0 2.889-1.364 2.889-3.08C72.118 4.818 71.018 3.543 69.229 3.543zM66.685 20.265v-6.557h2.35v4.621h11.643v1.936H66.685zM77.853 15.139V0h2.35v15.139H77.853z" fill="#5F5F5F"/><path d="M101.138 11.882H82.682V9.945h18.456V11.882zM99.197 8.625c-3.062-0.374-6.167-2.134-7.266-4.114 -0.949 2.046-3.881 3.763-7.266 4.137l-1.013-1.893c3.212-0.198 6.274-1.672 6.942-3.982h-6.059V0.836h14.791v1.937h-6.016c0.755 2.311 4.161 3.784 6.921 3.961L99.197 8.625zM91.931 20.793c-4.528 0-7.093-1.518-7.093-3.807 0-2.288 2.565-3.828 7.072-3.828s7.093 1.54 7.093 3.828C99.003 19.275 96.416 20.793 91.931 20.793zM91.91 15.095c-2.868 0-4.657 0.704-4.657 1.892 0 1.211 1.79 1.87 4.657 1.87 2.889 0 4.679-0.659 4.679-1.87C96.588 15.799 94.799 15.095 91.91 15.095z" fill="#5F5F5F"/><path d="M102.71 11.706V1.32h2.372v3.389h4.765V1.299h2.35v10.407H102.71zM109.847 6.602h-4.765v3.212h4.765V6.602zM105.47 20.265v-6.513h2.35v4.577h11.449v1.936H105.47zM113.254 7.701V5.699h3.191V0h2.35v15.16h-2.35V7.701H113.254z" fill="#5F5F5F"/><path d="M121.273 18.373v-1.937h8.021v-2.332c-3.191-0.286-5.174-1.65-5.174-3.675 0-2.288 2.522-3.763 6.403-3.763s6.382 1.475 6.382 3.763c0 2.046-2.026 3.433-5.261 3.675v2.332h8.085v1.937H121.273zM122.416 5.809V3.873h16.17v1.936H122.416zM130.523 8.516c-2.134 0-4.032 0.616-4.032 1.914 0 1.276 1.897 1.914 4.032 1.914 2.135 0 4.01-0.638 4.01-1.914C134.533 9.132 132.658 8.516 130.523 8.516zM126.857 0.639h7.266v1.914h-7.266V0.639z" fill="#5F5F5F"/><path d="M140.57 11.376V9.571h18.456v1.805H140.57zM142.92 20.705v-4.818h11.406v-1.408h-11.47v-1.738h13.82v4.818h-11.405v1.431h11.944v1.716H142.92zM143.006 8.317V3.631h11.189V2.311h-11.233V0.55h13.583v4.709H145.356v1.298h11.644v1.761H143.006z" fill="#5F5F5F"/><path d="M171.165 10.605c-2.954 0-5.218-1.804-5.218-4.73 0-2.86 2.264-4.929 5.218-4.929 2.975 0 5.238 2.002 5.238 4.929S174.139 10.605 171.165 10.605zM171.165 2.927c-1.617 0-2.868 1.122-2.868 2.904 0 1.76 1.272 2.794 2.868 2.794 1.616 0 2.889-1.034 2.889-2.794C174.053 4.005 172.825 2.927 171.165 2.927zM168.857 20.595v-8.295h2.351v2.179h8.646v-2.223h2.351v8.339H168.857zM179.853 16.393h-8.646v2.267h8.646V16.393zM179.832 11.156V0h2.35v11.156H179.832z" fill="#5F5F5F"/><path d="M195.505 11.244c-2.437 0.483-4.484 0.527-7.396 0.527h-2.674V5.325h6.598V3.059h-6.619V1.166h8.97v6.007h-6.598v2.685c2.264 0 4.938 0 7.417-0.484L195.505 11.244zM201.5 13.752v7.151h-2.351v-5.237h-11.535v-1.914H201.5zM195.85 2.904h3.277V0h2.35v12.608h-2.35V9.264h-3.277V7.306h3.277V4.863h-3.277V2.904z" fill="#5F5F5F"/><path d="M203.762 4.973h10.177V6.953H203.762V4.973zM208.958 16.129c-2.609 0-4.398-1.738-4.398-4.049 0-2.509 1.789-4.093 4.398-4.093 2.608 0 4.398 1.628 4.398 4.093C213.357 14.522 211.567 16.129 208.958 16.129zM206.177 1.563h5.541v2.002h-5.541V1.563zM208.958 9.901c-1.315 0-2.243 0.88-2.243 2.179 0 1.276 0.928 2.134 2.243 2.134 1.293 0 2.242-0.901 2.242-2.134C211.201 10.781 210.251 9.901 208.958 9.901zM218.941 20.859V10.496h-2.027v9.373h-2.221V0.418h2.221v8.075h2.027V0h2.242v20.859H218.941z" fill="#5F5F5F"/><path d="M231.273 20.837V13.422h-8.021v-1.914h18.455v1.914h-8.085v7.415H231.273zM233.774 2.795c0.409 2.574 4.01 4.466 7.071 4.796l-1.057 1.893c-2.867-0.418-6.252-2.376-7.287-4.312 -0.992 2.046-4.291 3.938-7.309 4.4l-1.122-1.892c3.148-0.33 6.771-2.289 7.18-4.885h-6.295V0.858h15.027v1.937H233.774z" fill="#5F5F5F"/><path d="M251.539 15.688c-1.444-0.946-3.277-3.146-3.881-5.303 -0.496 2.267-2.135 4.576-4.097 5.853l-1.423-1.65c2.479-1.649 4.377-4.95 4.377-9.241V2.068h2.264v3.257c0 3.982 1.725 7.194 4.118 8.691L251.539 15.688zM253.522 19.869V9.285h-2.932V7.283h2.932V0.418h2.221v19.451H253.522zM257.533 20.859V0h2.242v20.859H257.533z" fill="#5F5F5F"/><path d="M261.844 18.219v-1.914h4.269v-3.631l2.372-0.021v3.652h5.109v-3.652l2.351 0.021v3.631h4.354V18.219H261.844zM271.072 12.124c-4.441 0-7.396-2.2-7.396-5.347s2.954-5.369 7.396-5.369c4.484 0 7.417 2.223 7.417 5.369S275.556 12.124 271.072 12.124zM271.072 3.389c-3.019 0-5.002 1.364-5.002 3.389 0 2.002 1.983 3.366 5.002 3.366s5.023-1.364 5.023-3.366C276.095 4.753 274.112 3.389 271.072 3.389z" fill="#5F5F5F"/><path d="M282.304 1.452h2.63l-0.28 11.948h-2.048L282.304 1.452zM282.369 15.755h2.522v2.53h-2.522V15.755z" fill="#5F5F5F"/></svg>';

  SvgTong["loader_svgIcon"] = '<svg xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 566.929 566.929"><path d="M196.13 552.859c-23.91-7.75-37.01-33.409-29.26-57.31l0 0c7.74-23.9 33.4-37.01 57.31-29.26l0 0c23.9 7.74 37 33.399 29.26 57.31l0 0c-6.24 19.25-24.08 31.49-43.28 31.49l0 0C205.52 555.09 200.79 554.37 196.13 552.859z" fill="#59AF89"/><path d="M313.729 523.569C305.96 499.67 319.04 474 342.939 466.229l0 0c23.891-7.77 49.561 5.301 57.33 29.2l0 0c7.771 23.9-5.3 49.57-29.2 57.34l0 0c-4.67 1.521-9.409 2.24-14.069 2.24l0 0C337.819 555.01 319.979 542.79 313.729 523.569z" fill="#009B6A"/><path d="M54.55 450.109c-14.81-20.3-10.35-48.76 9.96-63.569l0 0c20.3-14.8 48.77-10.34 63.57 9.97l0 0c14.8 20.3 10.34 48.76-9.96 63.56l0 0c-8.09 5.9-17.47 8.74-26.77 8.74l0 0C77.31 468.81 63.45 462.33 54.55 450.109z" fill="#59AF89"/><path d="M449 459.899c-20.33-14.779-24.82-43.239-10.03-63.56l0 0c14.78-20.32 43.23-24.81 63.561-10.03l0 0c20.319 14.78 24.81 43.24 10.029 63.561l0 0c-8.91 12.239-22.779 18.739-36.84 18.739l0 0C466.439 468.609 457.069 465.78 449 459.899z" fill="#009B6A"/><path d="M0.33 283.77C0.3 258.64 20.65 238.25 45.78 238.22l0 0c25.13-0.03 45.52 20.32 45.55 45.45l0 0C91.35 308.8 71 329.189 45.88 329.22l0 0c-0.02 0-0.03 0-0.05 0l0 0C20.72 329.22 0.35 308.88 0.33 283.77z" fill="#59AF89"/><path d="M475.6 283.46L475.6 283.46c0-0.01 0-0.03 0-0.05l0 0c0-0.12 0-0.24 0-0.36l0 0C475.55 257.92 495.87 237.51 521 237.45l0 0c25.13-0.05 45.55 20.28 45.6 45.41l0 0c0 0.12 0 0.24 0 0.36l0 0c0 0.08 0 0.16 0 0.24l0 0c0 25.13-20.37 45.5-45.5 45.5l0 0C495.97 328.96 475.6 308.59 475.6 283.46z" fill="#009B6A"/><path d="M0.33 283.76v0.01l0 0 0 0 0 0C0.33 283.76 0.33 283.76 0.33 283.76z" fill="#59AF89"/><path d="M64.29 180.85c-20.34-14.76-24.86-43.21-10.1-63.55l0 0C68.95 96.96 97.41 92.44 117.74 107.2l0 0c20.34 14.76 24.86 43.22 10.1 63.55l0 0c-8.9 12.27-22.78 18.78-36.86 18.78l0 0C81.71 189.53 72.36 186.71 64.29 180.85z" fill="#59AF89"/><path d="M438.729 170.26c-14.83-20.29-10.399-48.76 9.891-63.59l0 0c20.29-14.82 48.76-10.39 63.58 9.9l0 0 0 0 0 0c14.83 20.29 10.399 48.75-9.891 63.58l0 0c-8.1 5.92-17.5 8.77-26.81 8.77l0 0C461.47 188.92 447.64 182.45 438.729 170.26z" fill="#59AF89"/><path d="M166.43 71.62C158.63 47.73 171.67 22.05 195.57 14.25l0 0c23.89-7.8 49.57 5.25 57.37 29.14l0 0c7.79 23.89-5.26 49.57-29.14 57.37l0 0c-4.69 1.53-9.45 2.26-14.13 2.26l0 0C190.52 103.02 172.69 90.82 166.43 71.62z" fill="#59AF89"/><path d="M342.56 100.57h-0.01c-23.91-7.72-37.04-33.36-29.32-57.27l0 0C320.95 19.38 346.6 6.25 370.51 13.98l0 0 0 0 0 0C394.42 21.69 407.55 47.34 399.83 71.25l0 0c-6.221 19.27-24.07 31.54-43.29 31.54l0 0C351.91 102.79 347.2 102.07 342.56 100.57z" fill="#59AF89"/><rect width="566.929" height="566.929" fill="none"/></svg>';

  pending = "pending_svgIcon";
  certification = "certification_svgIcon";
  loader = "loader_svgIcon";

  let randomArr;
  if (GeneralJs.isIE()) {
    randomArr = window.msCrypto.getRandomValues(new Uint32Array(10));
  } else {
    randomArr = window.crypto.getRandomValues(new Uint32Array(10));
  }

  const randomKey = randomArr[Math.floor(Math.random() * 10)];
  const randomStr = String(randomKey);
  let randomValue;
  let randomValueAjaxData;

  if (randomStr.length > 6) {
    randomValue = randomStr.slice(0, 6);
  } else {
    randomValue = randomStr;
    for (let i = randomStr.length; i < 6; i++) {
      randomValue += String(Math.floor(Math.random() * 10));
    }
    randomValue = randomStr;
  }

  GeneralJs.ajaxJson({
    name,
    phone,
    subject: "휴대폰 인증",
    contents: "[홈리에종] 안녕하세요! " + name + "님,\n휴대폰 인증번호를 보내드립니다.\n\n인증번호 : " + randomValue + "\n\n인증번호를 팝업창에 입력해주세요!"
  }, "/sendSms");

  let div_back, div_clone, div_clone2, svg_clone;
  let input_back, input_clone;
  let height, width, ea = (boo === "desktop") ? "px" : "vw";
  let wordWidth, whiteWidth, whiteHeight;
  let style = {};
  let endEvent;

  whiteWidth = (boo === "desktop") ? 334 : 77;
  whiteHeight = (boo === "desktop") ? 132 : 31;

  div_back = GeneralJs.nodes.div.cloneNode(true);
  style = {
    animation: "fadecancel 0.4s ease forwards",
    transition: "all 0.3s ease",
    position: "fixed",
    top: String(0),
    left: String(0),
    width: "100%",
    height: "100%",
    background: "#606060",
    opacity: String(0.2),
    zIndex: String(1),
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
      boxShadow: "0px 5px 15px -14px #404040",
      zIndex: String(1),
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
      boxShadow: "0px 5px 15px -14px #404040",
      zIndex: String(1),
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
    background: "#f2f2f2",
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
        alert("인증번호를 정확히 입력해주세요!");
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
    textTop = isMac() ? 6 : 8;
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
        background: colorChip.green,
        transition: "all 0s ease",
      },
      children: [
        {
          text: name,
          style: {
            position: "absolute",
            fontSize: String(size) + ea,
            fontWeight: String(500),
            color: colorChip.white,
            top: String(textTop) + ea,
          }
        }
      ]
    });

    renderWidth = block.firstChild.getBoundingClientRect().width + (innerMargin * 2);
    block.style.width = String(renderWidth) + ea
    block.firstChild.style.width = String(100) + '%';
    block.firstChild.style.textAlign = "center";

    return { width: renderWidth, margin: innerMargin / 2, height: height };
  }

  talkIcon.addEventListener("click", function (e) {
    if (!(GeneralJs.stacks.communication instanceof CommunicationBox)) {
      throw new Error("communication box error");
    }
    const { createNode, colorChip, withOut } = GeneralJs;
    const { communication } = instance;
    const ea = "px";
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
        zIndex: String(3),
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
        zIndex: String(3),
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
      refreshHeight = (widthArr.length * widthArr[0].height) + ((widthArr.length - 1) * widthArr[0].margin) + (innerMargin * 2);
      whiteBox.style.height = String(refreshHeight) + ea;
      lastBlocksNumber = widthArr[widthArr.length - 1].length;
      for (let i = whiteBox.lastChild.firstChild.children.length - 1; i > whiteBox.lastChild.firstChild.children.length - 1 - lastBlocksNumber; i--) {
        whiteBox.lastChild.firstChild.children[i].style.marginBottom = String(0) + ea;
      }
      for (let i = 0; i < whiteBox.lastChild.firstChild.children.length; i++) {
        if (i % 3 === 2 || i === whiteBox.lastChild.firstChild.children.length - 1) {
          whiteBox.lastChild.firstChild.children[i].style.marginRight = String(0) + ea;
        }
      }

    }

  });

  talkIcon.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    e.stopPropagation();
    const { createNode, colorChip, withOut } = GeneralJs;
    const { belowHeight } = instance;
    const ea = "px";
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
        zIndex: String(3),
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
        zIndex: String(3),
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

GeneralJs.prototype.grayLoading = function (mother = null) {
  if (typeof mother !== "object" || mother !== null) {
    throw new Error("input must be dom");
  }
  const instance = this;
  const { createNode, colorChip, withOut } = GeneralJs;
  let width, ea;
  let cancel, loading;

  ea = <%% "px", "px", "px", "px", "vw" %%>;
  width = <%% 50, 50, 50, 40, 10 %%>;

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
      background: colorChip.black,
      zIndex: String(2),
      animation: "justfadein 0.3s ease forwards",
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
      zIndex: String(2),
    }
  });

  return (new GrayLoading(cancel, loading));
}
