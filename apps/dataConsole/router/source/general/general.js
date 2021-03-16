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

GeneralJs.confirmKeyCode = [
  13,
  9,
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

GeneralJs.colorChip = {
  white: "white",
  whiteIcon: "white",
  gray0: "#f7f7f7",
  gray1: "#f2f2f2",
  gray2: "#ececec",
  gray3: "#dddddd",
  deactive: "#bbbbbb",
  shadow: "#808080",
  black: "#404040",
  green: "#2fa678",
  gradientGreen: "linear-gradient(222deg, rgba(89, 175, 137, 0.9) 5%, rgba(0, 156, 106, 0.9) 100%)",
  red: "#ff5f57",
  yellow: "#ffbd3d",
};

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
  } else if (window.location.pathname === "/photo") {
    map = DataPatch.photoMap();
  }

  switch (map[column].type) {
    case "string":
      finalValue = String(value).replace(/[\&\=]/g, '');
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
        if (/^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]/g.test(filteredValue)) {
          finalValue = filteredValue;
        } else {
          finalValue = pastValue;
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
    } else if (window.location.pathname === "/photo") {
      response = JSON.parse(await GeneralJs.ajaxPromise(dataString, "/updatePhoto"));
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
      if (thisPathName === "photo") {
        thisPathName = "project";
      }
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
      } else if (window.location.pathname === "/photo") {
        response = JSON.parse(await GeneralJs.ajaxPromise(dataString, "/updatePhoto"));
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

GeneralJs.autoComma = function (str) {
  if (typeof str === "number") {
    str = String(str);
  }
  let minus, num, tmp;

  if (/\-/g.test(str)) {
    minus = /\-/g.exec(str)[0];
  } else {
    minus = '';
  }

  num = str.replace(/[^0-9]/g, '');
  tmp = '';

  if (num.length < 4) {
    return minus + num;
  } else if (num.length < 7) {
    tmp += num.slice(-6, -3) + ',' + num.slice(-3);
    return minus + tmp;
  } else if (num.length < 10) {
    tmp += num.slice(-9, -6) + ',' + num.slice(-6, -3) + ',' + num.slice(-3);
    return minus + tmp;
  } else {
    tmp += num.slice(-12, -9) + ',' + num.slice(-9, -6) + ',' + num.slice(-6, -3) + ',' + num.slice(-3);
    return minus + tmp;
  }
  return minus + num;
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
  } else if (window.location.pathname === "/photo") {
    map = DataPatch.photoMap();
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
  @keyframes justfadeinoriginal{from{opacity:0;}to{opacity:1;}}
  @keyframes justfadeoutoriginal{from{opacity:1;}to{opacity:0;}}
  @keyframes justfadeinmiddle{from{opacity:0;}to{opacity:0.6;}}
  @keyframes justfadeoutmiddle{from{opacity:0.6;}to{opacity:0;}}
  @keyframes justfadein{from{opacity:0;}to{opacity:0.3;}}
  @keyframes justfadeout{from{opacity:0.3;}to{opacity:0;}}
  @keyframes fadedown{from{opacity:1;transform:translateY(0px);}to{opacity:0;transform:translateY(20px);}}
  @keyframes fadeup{from{opacity:0;transform:translateY(20px);}to{opacity:0.95;transform:translateY(0px);}}
  @keyframes fadeupdelay{from,30%{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0px);}}
  @keyframes fadeuplite{from{opacity:0;transform:translateY(5px);}to{opacity:0.95;transform:translateY(0px);}}
  @keyframes fadeupbacklite{from{opacity:0;transform:translateY(5px);}to{opacity:0.2;transform:translateY(0px);}}
  @keyframes loginfadeup0{from{opacity:0;}to{opacity:0.1;}}
  @keyframes loginfadeup1{from{opacity:0;backdrop-filter: blur(0px);}to{opacity:0.6;backdrop-filter: blur(4px);}}
  @keyframes loginfadedown0{from{opacity:0.1;}to{opacity:0;}}
  @keyframes loginfadedown1{from{opacity:0.6;backdrop-filter: blur(4px);}to{opacity:0;backdrop-filter: blur(0px);}}
  @keyframes profilefadeup{from{opacity:0;transform:translateY(10px);}to{opacity:0.9;transform:translateY(0px);}}
  @keyframes fadedowndelay{from{opacity:1;transform:translateY(0px);}70%,to{opacity:0;transform:translateY(-5px);}}

  @keyframes fadeout{from{opacity:1;transform:translateX(0px);}to{opacity:0;transform:translateX(-30px);}}
  @keyframes fadein{from{opacity:0;transform:translateX(30px);}to{opacity:1;transform:translateX(0px);}}
  @keyframes fadeoutlite{from{opacity:1;transform:translateX(0px);}to{opacity:0;transform:translateX(-20px);}}
  @keyframes fadeinlite{from{opacity:0;transform:translateX(20px);}to{opacity:1;transform:translateX(0px);}}
  @keyframes loadingrotate{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
  @keyframes fadecancel{from{opacity:0}to{opacity:0.2}}

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
  `;
  styleTag.insertAdjacentHTML(`beforeend`, css);
}

GeneralJs.prototype.returnCircle = function (cssString, color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" class="circle" style="${cssString}"><circle cx="6px" cy="6px" r="6px" fill="${color}" /></svg>`;
}

GeneralJs.prototype.returnBigArrow = function (color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140.316 226.772"><path d="M139.316 110.452l-8.145-10.556c0 0 0 0 0-0.001l-53.754-69.665 0 0L56.375 2.962C54.934 1.094 52.709 0 50.35 0h-7.215H28.485 1.886c-1.563 0-2.445 1.795-1.49 3.032l25.144 32.586c0.001 0.001 0.002 0.003 0.003 0.004l58.653 76.015c0.795 1.03 0.795 2.467 0 3.497l-41.894 54.294h0L0.396 223.739c-0.955 1.237-0.073 3.032 1.49 3.032h26.599 14.65 7.215c2.359 0 4.585-1.094 6.026-2.962l4.383-5.681c0 0 0 0 0 0l45.021-58.347v0l2.329-3.019 23.061-29.887c0.001-0.001 0.002-0.003 0.003-0.004l8.142-10.553C140.649 114.591 140.649 112.181 139.316 110.452z" fill="${color}"/></svg>`;
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

GeneralJs.prototype.returnRinitialItalic = function (color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 179.985 211.309"><path d="M33.395 0h73.589c46.4 0 73.295 20.985 72.998 57.629 0 36.648-23.052 57.629-53.196 64.131l44.329 89.548H121.761l-40.191-81.567H60.29L47.582 211.309H0L33.395 0zM93.685 97.23c25.417 0 39.307-10.934 39.307-34.872 0.294-17.734-10.936-25.711-31.623-25.711H75.361l-9.751 60.582H93.685z" fill="${color}"/></svg>`;
}

GeneralJs.prototype.returnHinitial = function (color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48.023 56.198"><path d="M0 0h12.733v22.951h22.558V0h12.732v56.198H35.291V33.011H12.733v23.187H0V0z" fill="${color}"/></svg>`;
}

GeneralJs.prototype.returnMinitial = function (color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 76.946 72.772"><path d="M0 0h21.781l16.997 45.291L55.572 0h21.374v72.772H60.558V21.679L40.407 72.772h-5.395L14.758 21.679v51.093H0V0z" fill="${color}"/></svg>`;
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

GeneralJs.prototype.returnLoading = function () {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 566.929 566.929"><path d="M196.13 552.859c-23.91-7.75-37.01-33.409-29.26-57.31l0 0c7.74-23.9 33.4-37.01 57.31-29.26l0 0c23.9 7.74 37 33.399 29.26 57.31l0 0c-6.24 19.25-24.08 31.49-43.28 31.49l0 0C205.52 555.09 200.79 554.37 196.13 552.859z" fill="${GeneralJs.colorChip.green}"/><path d="M313.729 523.569C305.96 499.67 319.04 474 342.939 466.229l0 0c23.891-7.77 49.561 5.301 57.33 29.2l0 0c7.771 23.9-5.3 49.57-29.2 57.34l0 0c-4.67 1.521-9.409 2.24-14.069 2.24l0 0C337.819 555.01 319.979 542.79 313.729 523.569z" fill="#009B6A"/><path d="M54.55 450.109c-14.81-20.3-10.35-48.76 9.96-63.569l0 0c20.3-14.8 48.77-10.34 63.57 9.97l0 0c14.8 20.3 10.34 48.76-9.96 63.56l0 0c-8.09 5.9-17.47 8.74-26.77 8.74l0 0C77.31 468.81 63.45 462.33 54.55 450.109z" fill="${GeneralJs.colorChip.green}"/><path d="M449 459.899c-20.33-14.779-24.82-43.239-10.03-63.56l0 0c14.78-20.32 43.23-24.81 63.561-10.03l0 0c20.319 14.78 24.81 43.24 10.029 63.561l0 0c-8.91 12.239-22.779 18.739-36.84 18.739l0 0C466.439 468.609 457.069 465.78 449 459.899z" fill="#009B6A"/><path d="M0.33 283.77C0.3 258.64 20.65 238.25 45.78 238.22l0 0c25.13-0.03 45.52 20.32 45.55 45.45l0 0C91.35 308.8 71 329.189 45.88 329.22l0 0c-0.02 0-0.03 0-0.05 0l0 0C20.72 329.22 0.35 308.88 0.33 283.77z" fill="${GeneralJs.colorChip.green}"/><path d="M475.6 283.46L475.6 283.46c0-0.01 0-0.03 0-0.05l0 0c0-0.12 0-0.24 0-0.36l0 0C475.55 257.92 495.87 237.51 521 237.45l0 0c25.13-0.05 45.55 20.28 45.6 45.41l0 0c0 0.12 0 0.24 0 0.36l0 0c0 0.08 0 0.16 0 0.24l0 0c0 25.13-20.37 45.5-45.5 45.5l0 0C495.97 328.96 475.6 308.59 475.6 283.46z" fill="#009B6A"/><path d="M0.33 283.76v0.01l0 0 0 0 0 0C0.33 283.76 0.33 283.76 0.33 283.76z" fill="${GeneralJs.colorChip.green}"/><path d="M64.29 180.85c-20.34-14.76-24.86-43.21-10.1-63.55l0 0C68.95 96.96 97.41 92.44 117.74 107.2l0 0c20.34 14.76 24.86 43.22 10.1 63.55l0 0c-8.9 12.27-22.78 18.78-36.86 18.78l0 0C81.71 189.53 72.36 186.71 64.29 180.85z" fill="${GeneralJs.colorChip.green}"/><path d="M438.729 170.26c-14.83-20.29-10.399-48.76 9.891-63.59l0 0c20.29-14.82 48.76-10.39 63.58 9.9l0 0 0 0 0 0c14.83 20.29 10.399 48.75-9.891 63.58l0 0c-8.1 5.92-17.5 8.77-26.81 8.77l0 0C461.47 188.92 447.64 182.45 438.729 170.26z" fill="${GeneralJs.colorChip.green}"/><path d="M166.43 71.62C158.63 47.73 171.67 22.05 195.57 14.25l0 0c23.89-7.8 49.57 5.25 57.37 29.14l0 0c7.79 23.89-5.26 49.57-29.14 57.37l0 0c-4.69 1.53-9.45 2.26-14.13 2.26l0 0C190.52 103.02 172.69 90.82 166.43 71.62z" fill="${GeneralJs.colorChip.green}"/><path d="M342.56 100.57h-0.01c-23.91-7.72-37.04-33.36-29.32-57.27l0 0C320.95 19.38 346.6 6.25 370.51 13.98l0 0 0 0 0 0C394.42 21.69 407.55 47.34 399.83 71.25l0 0c-6.221 19.27-24.07 31.54-43.29 31.54l0 0C351.91 102.79 347.2 102.07 342.56 100.57z" fill="${GeneralJs.colorChip.green}"/></svg>`;
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

GeneralJs.prototype.returnLoadingIcon = function () {
  let icon = SvgTong.stringParsing(this.returnLoading());
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
  if (thisPathName === "photo") {
    thisPathName = "project";
  }
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
            style = {
              position: "absolute",
              background: "rgb(247, 247, 247)",
              top: String(0) + ea,
              right: String(0) + ea,
              width: String(barWidth) + ea,
              transform: "translateX(" + String(barWidth) + ea + ")",
              opacity: String(0.92),
              backdropFilter: "blur(4px)",
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
                  if (e.keyCode === 13) {
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
  if (thisPathName === "photo") {
    thisPathName = "project";
  }
  const { standardColumn, titleStandard, buttons } = DataPatch.toolsDashboard(thisPathName);
  let mainWording;
  let div_clone, div_clone2;
  let style;
  let ea;
  let top, left, height;
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
    fontSize: String(21) + ea,
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
    fontSize: String(21) + ea,
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
      fontSize: String(14) + ea,
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
      fontSize: String(14) + ea,
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
      } else if ((-1 * (Number(target.style.width.replace(/[^0-9]/g, '')) - (window.innerWidth - 20))) > Number(target.style.transform.replace(/[^0-9\-\.]/g, '')) + 210) {
        target.style.transform = "translateX(" + String(-1 * (Number(target.style.width.replace(/[^0-9]/g, '')) - (window.innerWidth - 20) + 210)) + ea + ")";
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
      } else if ((-1 * (Number(target.style.width.replace(/[^0-9]/g, '')) - (window.innerWidth - 20))) > Number(target.style.transform.replace(/[^0-9\-\.]/g, '')) + 210) {
        target.style.transform = "translateX(" + String(-1 * (Number(target.style.width.replace(/[^0-9]/g, '')) - (window.innerWidth - 20) + 210)) + ea + ")";
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
    "/contents",
    "/service",
  ];
  naviIconsContextLinks = [
    "/analytics",
    "/proposal",
    "/photo",
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
    [ "project", "photo" ],
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
            } else if ((-1 * (Number(target.style.width.replace(/[^0-9]/g, '')) - (window.innerWidth - 20))) > Number(target.style.transform.replace(/[^0-9\-\.]/g, '')) + 210) {
              target.style.transform = "translateX(" + String(-1 * (Number(target.style.width.replace(/[^0-9]/g, '')) - (window.innerWidth - 20) + 210)) + ea + ")";
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
            } else if ((-1 * (Number(target.style.width.replace(/[^0-9]/g, '')) - (window.innerWidth - 20))) > Number(target.style.transform.replace(/[^0-9\-\.]/g, '')) + 210) {
              target.style.transform = "translateX(" + String(-1 * (Number(target.style.width.replace(/[^0-9]/g, '')) - (window.innerWidth - 20) + 210)) + ea + ")";
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
  if (thisPathName === "photo") {
    thisPathName = "project";
  }
  const { vaildTargets, standardColumn, titleStandard, buttons } = DataPatch.toolsDashboard(thisPathName);
  let div_clone, div_clone2, div_clone3;
  let style = {};
  let ea = "px";
  let width, height;
  let dashboardBox;

  GeneralJs.stacks["dashboardBoxBoo"] = false;
  GeneralJs.stacks["dashboardBox"] = null;
  GeneralJs.stacks["dashboardBoxMother"] = null;

  if (vaildTargets.includes(thisPathName)) {
    width = 340;
    height = (25 * (buttons.length / 2)) + 94;
    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    style = {
      position: "fixed",
      background: GeneralJs.colorChip.white,
      right: String(20) + ea,
      width: String(width) + ea,
      height: String(height) + ea,
      borderRadius: String(5) + ea,
      bottom: String(158) + ea,
      overflow: "hidden",
      opacity: String(0.9),
      boxShadow: "-1px 4px 15px -9px #aaaaaa",
      backdropFilter: "blur(" + String(4) + ea + ")",
      transition: "all 0s ease",
      zIndex: String(102),
      animation: "fadeuplite 0.3s ease forwards",
    };
    for (let i in style) {
      div_clone2.style[i] = style[i];
    }

    div_clone3 = GeneralJs.nodes.div.cloneNode(true);
    style = {
      position: "absolute",
      width: String(100) + "%",
      height: String(14) + ea,
      top: String(0),
      left: String(0),
      background: GeneralJs.colorChip.gray2,
      cursor: "move",
      transition: "all 0s ease",
    };
    for (let i in style) {
      div_clone3.style[i] = style[i];
    }
    div_clone2.appendChild(div_clone3);

    div_clone3.setAttribute("draggable", "true");

    div_clone3.addEventListener("dragstart", function (e) {
      const that = this.parentNode;
      let div;
      let style, ea;

      GeneralJs.stacks["windowDragStartPoint"] = 0;
      GeneralJs.stacks["windowDragStartPoint"] = e.screenX - that.offsetLeft;
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
        that.style.bottom = String(window.innerHeight - e.screenY - (height * 0.58)) + ea;
        that.style.right = String(window.innerWidth - e.screenX - width + GeneralJs.stacks["windowDragStartPoint"]) + ea;
        e.preventDefault();
      });
      GeneralJs.stacks["windowDragBack"] = div;
      that.parentNode.insertBefore(div, that);

      e.dataTransfer.setData("dragData", that);
      const img = new Image();
      e.dataTransfer.setDragImage(img, 1, 1);
    });

    div_clone3.addEventListener("dragend", function (e) {
      GeneralJs.stacks["windowDragBack"].parentElement.removeChild(GeneralJs.stacks["windowDragBack"]);
      GeneralJs.stacks["windowDragBack"] = null;
      e.preventDefault();
    });

    div_clone3.addEventListener("dragenter", function (e) {
      e.preventDefault();
    });

    div_clone3.addEventListener("dragleave", function (e) {
      e.preventDefault();
    });

    div_clone3.addEventListener("dragover", function (e) {
      const that = this.parentNode;
      that.style.bottom = String(window.innerHeight - e.screenY - (height * 0.58)) + ea;
      that.style.right = String(window.innerWidth - e.screenX - width + GeneralJs.stacks["windowDragStartPoint"]) + ea;
      e.preventDefault();
    });

    div_clone2.addEventListener("dragover", function (e) {
      const that = this;
      that.style.bottom = String(window.innerHeight - e.screenY - (height * 0.58)) + ea;
      that.style.right = String(window.innerWidth - e.screenX - width + GeneralJs.stacks["windowDragStartPoint"]) + ea;
      e.preventDefault();
    });

    div_clone3.addEventListener("drop", function (e) {
      e.preventDefault();
      e.stopPropagation();
    });

    div_clone3.addEventListener("contextmenu", function (e) {
      e.stopPropagation();
      e.preventDefault();
      if (GeneralJs.stacks["dashboardBoxMother"] !== null) {
        instance.below.removeChild(GeneralJs.stacks["dashboardBoxMother"]);
        GeneralJs.stacks["dashboardBoxBoo"] = false;
        GeneralJs.stacks["dashboardBox"] = null;
        GeneralJs.stacks["dashboardBoxMother"] = null;
      }
    });

    dashboardBox = GeneralJs.nodes.div.cloneNode(true);
    style = {
      position: "relative",
      width: String(100) + "%",
      height: "calc(100% - " + String(14) + ea + ")",
      marginTop: String(14 + ((GeneralJs.isMac()) ? 0 : 3)) + ea,
      background: GeneralJs.colorChip.white,
      transition: "all 0s ease",
    };
    for (let i in style) {
      dashboardBox.style[i] = style[i];
    }
    div_clone2.appendChild(dashboardBox);
    this.below.appendChild(div_clone2);

    GeneralJs.stacks["dashboardBoxBoo"] = true;
    GeneralJs.stacks["dashboardBox"] = dashboardBox;
    GeneralJs.stacks["dashboardBoxMother"] = div_clone2;

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

    console.log(member);

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
    };
    for (let i in style) {
      div_clone.style[i] = style[i];
    }
    div_clone.addEventListener("click", function (e) {
      instance.below.removeChild(instance.memberBox.cancel);
      instance.below.removeChild(instance.memberBox.contents);
    });
    instance.memberBox.cancel = div_clone;
    this.parentElement.appendChild(div_clone);

    //white box
    div_clone = GeneralJs.nodes.div.cloneNode(true);
    style = {
      position: "absolute",
      width: String(326) + ea,
      height: String(160) + ea,
      top: String(-104) + ea,
      left: String(220) + ea,
      background: GeneralJs.colorChip.white,
      borderRadius: String(4) + ea,
      opacity: String(0.9),
      boxShadow: "0px 6px 18px -9px #505050",
      backdropFilter: "blur(4px)",
      animation: "profilefadeup 0.4s ease forwards",
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
    this.parentElement.appendChild(div_clone);
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

GeneralJs.prototype.greenAlert = async function (message) {
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
      background: GeneralJs.colorChip.gradientGreen,
      borderRadius: String(5) + ea,
      height: String(40) + ea,
      bottom: String((this.belowHeight === undefined ? 0 : this.belowHeight) + 22) + ea,
      boxShadow: "0px 5px 12px -8px " + GeneralJs.colorChip.green,
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
      style = {
        position: "fixed",
        width: "100%",
        height: "100%",
        background: GeneralJs.colorChip.white,
        opacity: String(0),
        zIndex: String(3),
        backdropFilter: "blur(4px)",
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
  let thisDate = null;
  if (typeof date === "string") {
    if (date.length === 10) {
      thisDate = Number(((date.split("-"))[2]).replace(/^0/, ''));
    } else {
      thisDate = Number((((date.split(" ")[0]).split("-"))[2]).replace(/^0/, ''));
    }
  } else if (typeof date === "object") {
    thisDate = date.getDate();
  }
  const { year, month, matrix } = this.dateMatrix;
  let [ width, height ] = [ 260, (280 * ((option.height !== undefined) ? option.height : 1)) ];

  if (option.scaleUp !== undefined) {
    width = width * option.scaleUp;
    height = height * option.scaleUp;
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

  let calendarBase, titleZone, contentsZone;
  let div_clone, div_clone2, svg_clone, svg_zone;
  let style;
  let titleZoneStyle, contentsZoneStyle;
  let ea;
  let titleHeight;
  let visualSpecific;
  let arrowWidth, leftMargin;
  let finalHeight0, finalHeight1, finalHeight2;
  let resultObj;

  resultObj = new CalendarMatrix(this.dateMatrix);
  ea = "px";
  titleHeight = (option.bigMode === undefined) ? height * 0.2 : 48;
  finalHeight0 = titleHeight;
  finalHeight2 = finalHeight0 * 0.38;

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

    ea = "px";
    leftMargin = 12;
    lineHeight = 20;

    indexNumber = 0;
    circleEventInitTop = 38.5;
    circleEventLeft = 14;
    eventInitTop = 32.5;
    eventLeft = 21;

    circleEventStyle = {
      position: "absolute",
      transformOrigin: "0 0",
      transform: "scale(0.3)",
      top: String(circleEventInitTop + (lineHeight * indexNumber)) + ea,
      left: String(circleEventLeft) + ea,
    };

    eventStyle = {
      position: "absolute",
      fontSize: String(12) + ea,
      fontWeight: String(400),
      textAlign: "left",
      color: GeneralJs.colorChip.black,
      cursor: "pointer",
      top: String(eventInitTop + (lineHeight * indexNumber)) + ea,
      left: String(eventLeft) + ea,
    };

    class MatrixDiv extends HTMLDivElement {

      constructor() {
        super();
      }

      setYear(year) {
        this.year = year;
      }

      setMonth(month) {
        this.month = month;
      }

      setDate(date) {
        this.date = date;
      }

      setDateEvents(eventArr, hourOutput = true) {
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

            if (date.getFullYear() === this.year && date.getMonth() === this.month && date.getDate() === this.date) {
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

      }

    }
    if (customElements.get("matrix-div") === undefined) {
      customElements.define("matrix-div", MatrixDiv, { extends: "div" });
    }
    matrixField = document.createElement("div", { is : "matrix-div" });

    for (let i = 0; i < matrix.length + 1; i++) {
      div_clone = GeneralJs.nodes.div.cloneNode(true);
      style = {
        position: "relative",
        height: ((option.bigMode === undefined) ? String(height / 9) + ea : "calc(calc(100% - " + String(36) + ea + ") / " + String(matrix.length) + ")"),
        background: GeneralJs.colorChip.white,
        width: "calc(100% - " + String(leftMargin * 2) + ea + ")",
        left: String(leftMargin * 1) + ea,
      };
      if (option.bigMode !== undefined) {
        style.width = String(100) + '%';
        style.left = String(0) + ea;
      }
      for (let j in style) {
        div_clone.style[j] = style[j];
      }
      if (option.bigMode !== undefined && i === 0) {
        div_clone.style.height = String(36) + ea;
      }

      for (let j = 0; j < 7; j++) {
        div_clone2 = matrixField.cloneNode(true);
        div_clone2.setYear(year);
        div_clone2.setMonth(month);
        style = {
          display: "inline-block",
          position: "relative",
          width: "calc(100% / 7)",
          height: ((option.bigMode === undefined) ? String(height / 8) + ea : String(100) + '%'),
          background: GeneralJs.colorChip.white,
          cursor: "pointer",
          overflow: "scroll",
          borderBottom: ((option.bigMode === undefined) ? String(0) : "1px solid " + GeneralJs.colorChip.gray3),
          borderRight: ((option.bigMode === undefined) ? String(0) : "1px solid " + GeneralJs.colorChip.gray3),
          boxSizing: ((option.bigMode === undefined) ? "initial" : "border-box"),
        };
        for (let k in style) {
          div_clone2.style[k] = style[k];
        }

        if (option.bigMode !== undefined && i === 0) {
          div_clone2.style.background = GeneralJs.colorChip.gray0;
          div_clone2.style.borderTop = "1px solid " + GeneralJs.colorChip.gray3;
          if (j === 0) {
            div_clone2.style.borderTopLeftRadius = String(5) + ea;
          } else if (j === 6) {
            div_clone2.style.borderTopRightRadius = String(5) + ea;
          }
        }

        if (option.bigMode !== undefined && j === 0) {
          div_clone2.style.borderLeft = "1px solid " + GeneralJs.colorChip.gray3;
        }

        if (option.bigMode !== undefined && i === matrix.length) {
          if (j === 0) {
            div_clone2.style.borderBottomLeftRadius = String(5) + ea;
          } else if (j === 6) {
            div_clone2.style.borderBottomRightRadius = String(5) + ea;
          }
        }

        if (i !== 0 && matrix[i - 1][j] !== null) {
          div_clone2.setDate(matrix[i - 1][j].date);
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
          fontWeight: ((i === 0) ? String(500) : String(200)),
          width: "100%",
          textAlign: ((option.bigMode === undefined) ? "center" : "left"),
          color: ((j < 5) ? GeneralJs.colorChip.black : GeneralJs.colorChip.green),
          cursor: "pointer",
        };
        for (let k in style) {
          div_clone3.style[k] = style[k];
        }
        if (i === 0) {
          div_clone3.textContent = ([ 'M', 'T', 'W', 'T', 'F', 'S', 'S' ])[j];
          if (option.bigMode !== undefined) {
            div_clone3.style.textAlign = "center";
            div_clone3.style.fontSize = String(14) + ea;
            div_clone3.style.top = String(5.5) + ea;
          }
        } else {
          div_clone3.textContent = (matrix[i - 1][j] !== null) ? String(matrix[i - 1][j].date) : '';
          if (option.bigMode !== undefined) {
            div_clone3.style.fontSize = String(16) + ea;
            div_clone3.style.top = String(6.5) + ea;
            div_clone3.style.textIndent = String(14) + ea;
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
              div_clone2.setDateEvents(option.events)
            }
          }
        }

        div_clone.appendChild(div_clone2);
      }

      mother.appendChild(div_clone);
    }
  }

  //base maker
  calendarBase = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "relative",
    top: String(0) + ea,
    left: String(option.left !== undefined ? option.left : 0) + ea,
    width: ((option.bigMode === undefined) ? String(width) + ea : option.width),
    height: ((option.bigMode === undefined) ? String(height) + ea : option.height),
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
    marginTop: String(6 * ((option.margin !== undefined) ? option.margin : 1)) + ea,
  };
  if (option.bigMode !== undefined) {
    contentsZoneStyle.marginTop = String(0) + ea;
  }

  //title zone -------------------------------------------------------------- start
  titleZone = GeneralJs.nodes.div.cloneNode(true);
  for (let i in titleZoneStyle) {
    titleZone.style[i] = titleZoneStyle[i];
  }

  //year month number
  visualSpecific = 1.5;
  div_clone = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "absolute",
    height: String(titleHeight / 2) + ea,
    fontFamily: "graphik",
    fontSize: String(titleHeight * 0.38 * ((option.title !== undefined) ? option.title : 1)) + ea,
    fontWeight: String(300),
    bottom: String(8 + ((option.titleBottom !== undefined) ? option.titleBottom : 1)) + ea,
    width: "100%",
    textAlign: "center",
  };
  for (let i in style) {
    div_clone.style[i] = style[i];
  }

  if (option.bigMode !== undefined) {
    div_clone.style.bottom = "";
    div_clone.style.top = String(-6) + ea;
    div_clone.style.fontSize = String(29) + ea;
  }

  div_clone.textContent = String(year) + '.' + ((month < 9) ? '0' + String(month + 1) : String(month + 1));
  titleZone.appendChild(div_clone);

  //previous arrow
  if (option.arrow !== undefined) {
    arrowWidth = (option.arrow.width !== undefined) ? option.arrow.width : 9;
  } else {
    arrowWidth = 9;
  }

  if (option.bigMode !== undefined) {
    arrowWidth = 11;
  }

  svg_clone = SvgTong.stringParsing(this.returnArrow("left", GeneralJs.colorChip.green));
  style = {
    position: "absolute",
    width: String(arrowWidth) + ea,
    height: String(arrowWidth * SvgTong.getRatio(svg_clone)) + ea,
    bottom: String(17 + ((option.bigMode === undefined) ? 0 : 7.5)) + ea,
    left: String((option.bigMode === undefined) ? 23 : 1) + ea,
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
    width: String(arrowWidth + 15) + ea,
    height: String(arrowWidth + 15) + ea,
    bottom: String(9 + ((option.bigMode === undefined) ? 0 : 7.5)) + ea,
    left: String((option.bigMode === undefined) ? 16 : 1) + ea,
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
    bottom: String(17 + ((option.bigMode === undefined) ? 0 : 7.5)) + ea,
    right: String((option.bigMode === undefined) ? 23 : 1) + ea,
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
    width: String(arrowWidth + 15) + ea,
    height: String(arrowWidth + 15) + ea,
    bottom: String(9 + ((option.bigMode === undefined) ? 0 : 7.5)) + ea,
    right: String((option.bigMode === undefined) ? 16 : 1) + ea,
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
  if (option.bigMode === undefined) {
    finalHeight1 = (height / 9) * (matrix.length + 1);
    contentsZone.style.height = String(finalHeight1) + ea;
  }
  calendarBase.appendChild(contentsZone);
  //contents zone -------------------------------------------------------------- end

  if (option.bigMode === undefined) {
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

  SvgTong["pending_svgIcon"] = '<svg xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 129.921 20.859"><path d="M0.819 1.673h10.78v2.244H7.676C7.719 7.107 9.875 9.418 12.225 10.188l-1.466 2.156C9.185 11.75 7.201 10.033 6.317 8.098c-0.604 2.046-2.781 4.137-4.743 4.818L0 10.781c2.954-1.1 4.916-3.63 4.916-6.799V3.917H0.819V1.673zM3.342 20.309v-6.578h2.695v4.422h11.406v2.156H3.342zM14.316 15.139V7.745h-3.062V5.545h3.062V0h2.695v15.139H14.316z" fill="#5F5F5F"/><path d="M19.404 12.102V9.924h7.891V7.239H29.969v2.685h7.891v2.178H19.404zM21.323 8.537l-1.121-2.134c3.428-0.353 7.072-2.244 7.072-5.391V0.396h2.781v0.616c0 3.146 4.14 5.236 7.072 5.391l-1.143 2.156c-2.738-0.396-6.295-2.091-7.331-4.489C27.619 6.469 24.276 8.119 21.323 8.537zM28.653 20.815c-4.528 0-7.137-1.475-7.137-3.873 0-2.376 2.609-3.872 7.115-3.872 4.528 0 7.115 1.496 7.115 3.872C35.747 19.341 33.16 20.815 28.653 20.815zM28.632 15.248c-2.652 0-4.355 0.66-4.355 1.717 0 1.056 1.704 1.694 4.355 1.694s4.377-0.639 4.377-1.694C33.009 15.908 31.284 15.248 28.632 15.248z" fill="#5F5F5F"/><path d="M49.221 11.815v1.343c3.816 0.264 5.994 1.672 5.994 3.74 0 2.332-2.674 3.763-7.288 3.763 -4.614 0-7.288-1.431-7.288-3.763 0-2.068 2.156-3.477 5.908-3.74v-1.343H38.7V9.615h18.456v2.2H49.221zM55.086 8.867C52.089 8.625 49.113 6.997 47.928 4.995c-1.035 2.068-3.902 3.608-7.137 3.872l-1.121-2.112c3.169-0.153 5.951-1.474 6.662-3.586H40.597V0.99h14.726v2.179h-5.756c0.819 2.112 3.924 3.41 6.662 3.542C55.84 7.415 55.474 8.142 55.086 8.867zM47.906 15.292c-2.76 0-4.528 0.595-4.528 1.629 0 1.012 1.768 1.605 4.528 1.605s4.571-0.594 4.571-1.605C52.477 15.887 50.666 15.292 47.906 15.292z" fill="#5F5F5F"/><path d="M64.076 0.902c3.105 0 5.412 2.068 5.412 4.973 0 2.948-2.307 4.774-5.412 4.774 -3.104 0-5.412-1.826-5.412-4.774C58.664 3.015 60.971 0.902 64.076 0.902zM64.076 8.405c1.488 0 2.716-0.924 2.716-2.553 0-1.737-1.186-2.684-2.716-2.684s-2.717 1.034-2.717 2.684C61.359 7.481 62.566 8.405 64.076 8.405zM61.381 20.595V12.234h2.695v2.067h8.15v-2.09h2.674v8.383H61.381zM72.226 16.414h-8.15v2.003h8.15V16.414zM72.204 11.134V0h2.674v11.134H72.204z" fill="#5F5F5F"/><path d="M89.775 14.698c-2.479 0.66-7.072 0.946-9.487 0.946h-1.875V2.091h2.651V13.313c2.781 0 6.123-0.265 8.365-0.814L89.775 14.698zM94.152 20.859H91.5V0h2.652V20.859z" fill="#5F5F5F"/><path d="M100.037 13.774c2.911 0 5.757-0.088 8.063-0.639l0.302 2.179c-1.983 0.506-5.066 0.704-9.055 0.704h-1.984V1.914h9.336v2.201h-6.662V13.774zM112.542 7.877h2.933v2.267h-2.933V20.859h-2.673V0h2.673V7.877z" fill="#5F5F5F"/><path d="M116.681 15.688h2.804v2.75h-2.804V15.688z" fill="#5F5F5F"/><path d="M121.898 15.688h2.804v2.75h-2.804V15.688z" fill="#5F5F5F"/><path d="M127.117 15.688h2.804v2.75h-2.804V15.688z" fill="#5F5F5F"/></svg>';
  SvgTong["certification_svgIcon"] = '<svg xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 285.128 20.881"><path d="M4.333 20.837v-4.73H0v-2.179h18.456v2.179h-4.42v4.73h-2.674v-4.73H7.007v4.73H4.333zM0.949 5.611v-2.156H17.55v2.156H0.949zM9.271 13.026c-3.989 0-6.641-1.211-6.641-3.345 0-2.156 2.652-3.345 6.641-3.345 4.01 0 6.662 1.188 6.662 3.345C15.933 11.815 13.281 13.026 9.271 13.026zM9.271 8.361c-2.199 0-3.816 0.44-3.816 1.342 0 0.837 1.617 1.299 3.816 1.299s3.838-0.462 3.838-1.299C13.109 8.802 11.47 8.361 9.271 8.361zM5.541 0.353h7.396v2.134H5.541V0.353z" fill="#5F5F5F"/><path d="M22.573 13.687c2.091 0.065 4.549-0.133 5.908-0.484l0.258 2.156c-1.531 0.418-4.527 0.572-6.899 0.572h-1.94V2.486h7.719v2.179c-1.682 0-3.342-0.022-5.045-0.022V13.687zM34.108 20.859V10.407H32.297v9.483h-2.522V0.374h2.522v7.855h1.811V0h2.566v20.859H34.108z" fill="#5F5F5F"/><path d="M49.113 9.373v1.805h7.935v2.179H38.592v-2.179h7.848V9.373h-6.016V7.195h2.803l-0.518-3.234 2.587-0.396L45.75 7.195h4.075l0.539-3.631 2.609 0.396 -0.625 3.234h2.803v2.178H49.113zM40.36 2.948v-2.156h14.833v2.156H40.36zM40.92 20.309v-5.853H43.594v3.696h11.319v2.156H40.92z" fill="#5F5F5F"/><path d="M69.552 1.563c3.363 0 5.541 2.178 5.541 5.148 0 2.992-2.178 5.127-5.541 5.127 -3.342 0-5.52-2.135-5.52-5.127C64.033 3.74 66.21 1.563 69.552 1.563zM66.555 20.309v-6.688h2.695v4.532h11.47v2.156H66.555zM69.552 9.571c1.768 0 2.803-1.21 2.803-2.86 0-1.606-1.035-2.816-2.803-2.816 -1.725 0-2.781 1.21-2.781 2.816C66.771 8.361 67.827 9.571 69.552 9.571zM77.594 15.139V0h2.673v15.139H77.594z" fill="#5F5F5F"/><path d="M101.138 12.124H82.682v-2.156h18.456V12.124zM99.068 8.802c-2.997-0.242-5.973-1.87-7.137-3.873 -1.035 2.068-3.924 3.608-7.158 3.873l-1.1-2.112c3.169-0.154 5.951-1.475 6.662-3.587h-5.756V0.924h14.726v2.179h-5.735c0.819 2.112 3.902 3.41 6.641 3.543L99.068 8.802zM91.931 20.859c-4.549 0-7.158-1.475-7.158-3.873 0-2.376 2.609-3.851 7.137-3.851s7.137 1.475 7.137 3.851C99.046 19.385 96.438 20.859 91.931 20.859zM91.91 15.292c-2.652 0-4.377 0.66-4.377 1.717 0 1.056 1.725 1.694 4.377 1.694 2.673 0 4.398-0.639 4.398-1.694C96.308 15.952 94.583 15.292 91.91 15.292z" fill="#5F5F5F"/><path d="M102.625 11.684V1.276h2.695v3.213h4.269V1.232h2.674v10.451H102.625zM109.588 6.623h-4.269v2.883h4.269V6.623zM105.406 20.309v-6.578h2.695v4.422H119.313v2.156H105.406zM113.275 7.812V5.567h2.911V0h2.673v15.139h-2.673V7.812H113.275z" fill="#5F5F5F"/><path d="M121.273 18.395v-2.178h7.848v-2.024c-3.169-0.33-5.153-1.782-5.153-3.807 0-2.332 2.587-3.873 6.554-3.873s6.533 1.541 6.533 3.873c0 2.046-2.026 3.521-5.261 3.828v2.003h7.935v2.178H121.273zM122.395 5.831v-2.156h16.214v2.156H122.395zM130.523 8.581c-2.07 0-3.816 0.616-3.816 1.805 0 1.21 1.747 1.782 3.816 1.782s3.795-0.572 3.795-1.782C134.318 9.197 132.593 8.581 130.523 8.581zM126.879 0.44h7.223v2.156h-7.223V0.44z" fill="#5F5F5F"/><path d="M140.57 11.552V9.527h18.456v2.024H140.57zM142.898 20.639v-4.862h11.104v-1.101h-11.19v-1.958h13.863v4.863h-11.082v1.078h11.557v1.979H142.898zM143.006 8.428V3.696h10.845V2.597h-10.888V0.66h13.583v4.753h-10.866v1.078h11.319v1.937H143.006z" fill="#5F5F5F"/><path d="M171.445 0.902c3.104 0 5.411 2.068 5.411 4.973 0 2.948-2.307 4.774-5.411 4.774 -3.105 0-5.412-1.826-5.412-4.774C166.033 3.015 168.339 0.902 171.445 0.902zM171.445 8.405c1.487 0 2.716-0.924 2.716-2.553 0-1.737-1.186-2.684-2.716-2.684 -1.531 0-2.717 1.034-2.717 2.684C168.728 7.481 169.935 8.405 171.445 8.405zM168.75 20.595V12.234h2.695v2.067h8.149v-2.09h2.674v8.383H168.75zM179.594 16.414h-8.149v2.003h8.149V16.414zM179.573 11.134V0h2.674v11.134H179.573z" fill="#5F5F5F"/><path d="M195.418 11.662c-1.789 0.418-4.656 0.572-7.395 0.572 -0.885 0-1.747-0.022-2.631-0.022V5.523h6.296V3.564h-6.296V1.387h8.991v6.204h-6.296v2.486c2.415 0 5.455-0.065 6.985-0.506L195.418 11.662zM201.564 13.884v6.997h-2.674V16.063h-11.255v-2.179H201.564zM198.869 12.828V9.638h-3.04V7.415h3.04v-2.156h-3.04V3.015h3.04V0h2.674v12.828H198.869z" fill="#5F5F5F"/><path d="M203.934 4.995h9.746v2.178h-9.746V4.995zM208.85 16.591c-2.651 0-4.484-1.826-4.484-4.312 0-2.663 1.854-4.335 4.484-4.335 2.652 0 4.463 1.716 4.463 4.335C213.313 14.896 211.502 16.591 208.85 16.591zM206.155 1.628h5.498v2.179h-5.498V1.628zM208.85 10.1c-1.186 0-2.048 0.88-2.048 2.179 0 1.298 0.862 2.178 2.048 2.178 1.187 0 2.049-0.924 2.049-2.178C210.899 10.979 210.037 10.1 208.85 10.1zM218.79 20.859V10.628h-1.682v9.263h-2.522V0.374h2.522v8.054h1.682V0h2.544v20.859H218.79z" fill="#5F5F5F"/><path d="M231.079 20.837v-7.261h-7.826v-2.179h18.455v2.179h-7.934v7.261H231.079zM224.071 7.745c3.084-0.33 6.469-2.2 6.943-4.664h-6.124V0.902h15.157v2.179h-6.102c0.475 2.464 3.881 4.246 6.942 4.576 -0.366 0.727-0.754 1.431-1.121 2.135 -2.651-0.309-6.166-2.201-7.287-4.181 -1.078 2.112-4.441 3.895-7.244 4.269L224.071 7.745z" fill="#5F5F5F"/><path d="M251.344 15.776c-1.336-0.836-3.169-2.927-3.708-4.973 -0.561 2.179-2.113 4.335-4.011 5.501l-1.573-1.87c2.587-1.717 4.269-4.863 4.269-9.308V2.024h2.588v3.08c0 4.049 1.487 7.218 3.967 8.735L251.344 15.776zM253.35 19.891V9.418h-2.76V7.195h2.76V0.396h2.501V19.891H253.35zM257.381 20.859V0h2.544v20.859H257.381z" fill="#5F5F5F"/><path d="M261.844 18.263V16.063h4.117v-3.543l2.695 0.11V16.063h4.787v-3.433l2.694-0.11V16.063h4.161v2.2H261.844zM271.093 12.036c-4.484 0-7.438-2.223-7.438-5.259 0-3.081 2.954-5.325 7.438-5.325s7.438 2.244 7.438 5.325C278.532 9.813 275.578 12.036 271.093 12.036zM271.093 3.719c-2.846 0-4.679 1.298-4.679 3.059 0 1.738 1.833 3.015 4.679 3.015 2.824 0 4.7-1.276 4.7-3.015C275.793 5.017 273.939 3.719 271.093 3.719z" fill="#5F5F5F"/><path d="M282.153 1.387h2.976l-0.323 12.014h-2.285L282.153 1.387zM282.283 15.645h2.76v2.729h-2.76V15.645z" fill="#5F5F5F"/></svg>';
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

  randomValueAjaxData = "name=" + name + "&phone=" + phone + "&certification=" + randomValue;

  GeneralJs.ajax(randomValueAjaxData, "/kakaoCertification", function (data) {});

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
