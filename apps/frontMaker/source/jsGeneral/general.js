const GeneralJs = function () {
  this.map = /<%generalMap%>/;
  this.loader = null;
  this.navigator = null;
  this.footer = null;
  this.talkIcon = null;
}

GeneralJs.sourceLink = "/list_image/general";

GeneralJs.universalLink = "/list_image/universal";

GeneralJs.events = {};

GeneralJs.stacks = {};

GeneralJs.timeouts = {};

GeneralJs.boos = {
  scroll: true,
};

GeneralJs.svgMaker = {
  horizontalArrow: function (width, height, color = GeneralJs.colorChip.green) {
    if (typeof width !== "number" || typeof height !== "number" || typeof color !== "string") {
      throw new Error("input must be { width, height, color }");
    }
    if (height === 0) {
      throw new Error("zero height ban");
    }
    const ratio = width / height;
    const y = 6.721;
    const x = (ratio * y);
    const calcul = (num) => { return String(Math.round(num * 1000) / 1000); }
    const constValues = [ 3.095, 1.655, 3.626, 0.042 ];
    return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${calcul(x)} ${calcul(y)}" xml:space="preserve"><path fill="${color}" d="M${calcul(x)},3.36c0-0.103-0.042-0.196-0.109-0.263c0,0,0-0.001-0.001-0.002L${calcul(x - constValues[0])},0.11c-0.146-0.146-0.385-0.146-0.531,0c-0.146,0.146-0.146,0.384,0,0.53l2.346,2.345H0.375C0.168,2.985,0,3.153,0,3.36s0.168,0.375,0.375,0.375h${calcul(x - constValues[1])}L${calcul(x - constValues[2])},6.08c-0.146,0.146-0.146,0.385,0,0.531c0.073,0.073,0.17,0.109,0.266,0.109s0.192-0.036,0.266-0.109l2.985-2.986c0,0,0-0.001,0.001-0.002C${calcul(x - constValues[3])},3.556,${calcul(x)},3.463,${calcul(x)},3.36z"/></svg>`;
  },
  verticalArrow: function (width, height, color = GeneralJs.colorChip.green) {
    if (typeof width !== "number" || typeof height !== "number" || typeof color !== "string") {
      throw new Error("input must be { width, height, color }");
    }
    if (width === 0) {
      throw new Error("zero width ban");
    }
    const ratio = height / width;
    const y = 6.72;
    const x = (ratio * y);
    const calcul = (num) => { return String(Math.round(num * 1000) / 1000); }
    const constValues = [ 1.655, 3.553, 3.456, 3.36, 0.042 ]
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${calcul(y)} ${calcul(x)}" xml:space="preserve"><path fill="${color}" d="M3.36,${calcul(x)}c0.103,0,0.196-0.042,0.263-0.109c0,0,0.001,0,0.002-0.001l2.985-2.985c0.146-0.146,0.146-0.385,0-0.531s-0.384-0.146-0.53,0l-2.345,2.346V0.375C3.735,0.168,3.567,0,3.36,0S2.985,0.168,2.985,0.375v${calcul(x - constValues[0])}l-2.345-2.346c-0.146-0.146-0.385-0.146-0.531,0C0.036,${calcul(x - constValues[1])},0,${calcul(x - constValues[2])},0,${calcul(x - constValues[3])}c0,0.096,0.036,0.192,0.109,0.266l2.986,2.985c0,0,0.001,0,0.002,0.001C3.164,${calcul(x - constValues[4])},3.257,${calcul(x)},3.36,${calcul(x)}z"/></svg>`;
  },
  bentArrow: function (width, height, zMultiple = 1, color = GeneralJs.colorChip.green) {
    if (typeof width !== "number" || typeof height !== "number" || typeof zMultiple !== "number" || typeof color !== "string") {
      throw new Error("input must be { width, height, zMultiple, color }");
    }
    if (height === 0) {
      throw new Error("zero height ban");
    }
    const ratio = width / height;
    const y = 6.721 * zMultiple;
    const x = (ratio * y);
    const calcul = (num) => { return String(Math.round(num * 1000) / 1000); }
    const constXValues = [ 0.029, 4.156, 0.01, 0.029 ];
    const constYValues = [ 3.506, 5.862, 3.411, 3.461, 3.506 ];
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${calcul(x)} ${calcul(y)}" xml:space="preserve"><path d="M${calcul(x - constXValues[0])},${calcul(y - constYValues[0])}c-0.019-0.045-0.046-0.086-0.081-0.121l-2.983-2.984c-0.146-0.146-0.384-0.146-0.53,0s-0.146,0.384,0,0.53l2.344,2.344H2.876c-1.172,0-2.126-0.954-2.126-2.126V0H0v${calcul(y - constYValues[1])}c0,1.586,1.29,2.876,2.876,2.876h${calcul(x - constXValues[1])}l-2.344,2.343c-0.146,0.146-0.146,0.385,0,0.531c0.073,0.073,0.169,0.109,0.265,0.109s0.192-0.036,0.265-0.109l2.984-2.984c0.034-0.034,0.062-0.075,0.081-0.121c0.019-0.045,0.029-0.094,0.029-0.144C${calcul(x)},${calcul(y - constYValues[2])},${calcul(x - constXValues[2])},${calcul(y - constYValues[3])},${calcul(x - constXValues[3])},${calcul(y - constYValues[4])}z"/></svg>`;
  },
  doubleQuote: function (color) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56.785 49.482"><path d="M1.404 41.51C-3.883 27.672 6.229 7.036 23.924 0l1.608 2.581c-8.272 4.924-13.097 10.083-14.936 15.947 -1.379 4.22 0.69 6.799 3.446 7.034 6.205 0.47 10.8 5.862 10.8 11.492 0 6.801-5.054 12.428-11.718 12.428C7.837 49.482 3.242 46.2 1.404 41.51zM32.657 41.51C27.37 27.672 37.482 7.036 55.177 0l1.608 2.581c-8.272 4.924-13.097 10.083-14.936 15.947 -1.379 4.22 0.69 6.799 3.446 7.034 6.205 0.47 10.802 5.862 10.802 11.492 0 6.801-5.056 12.428-11.72 12.428C39.09 49.482 34.495 46.2 32.657 41.51z" fill="${color}"/></svg>`;
  },
  calendarIcon: function (color) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1343.66 1279.127"><path fill="${color}" d="M1343.66 90.609c0-35.574-20.504-66.354-50.336-81.182 -1.354-0.673-2.728-1.313-4.12-1.92 -1.225-0.534-2.463-1.041-3.715-1.521 -0.873-0.335-1.753-0.657-2.639-0.965 -2.514-0.875-5.077-1.643-7.686-2.298C1268.085 0.947 1260.679 0 1253.051 0H90.609C72.315 0 55.29 5.427 41.048 14.751c-0.976 0.639-1.942 1.291-2.891 1.966 -0.849 0.604-1.683 1.227-2.51 1.859 -3.773 2.883-7.317 6.052-10.59 9.482 -0.046 0.048-0.092 0.098-0.138 0.146 -0.908 0.955-1.794 1.931-2.66 2.925 -1.069 1.227-2.105 2.484-3.107 3.768C7.152 50.264 0 69.601 0 90.609v169.702h0v928.208c0 50.042 40.567 90.609 90.609 90.609h1162.442c50.042 0 90.609-40.567 90.609-90.609V260.311h0V90.609zM1291.361 1188.518c0 21.158-17.152 38.311-38.311 38.311H90.609c-21.158 0-38.311-17.152-38.311-38.311V280.009c0-10.879 8.819-19.699 19.699-19.699h1199.666c10.879 0 19.699 8.819 19.699 19.699V1188.518z"/><path fill="${color}" d="M358.2 576.714h-161.176c-9.348 0-16.927-7.578-16.927-16.927V398.612c0-9.348 7.578-16.927 16.927-16.927h161.176c9.348 0 16.927 7.578 16.927 16.927v161.176C375.127 569.136 367.548 576.714 358.2 576.714z"/><path fill="${color}" d="M620.995 576.714H459.82c-9.348 0-16.927-7.578-16.927-16.927V398.612c0-9.348 7.578-16.927 16.927-16.927h161.176c9.348 0 16.927 7.578 16.927 16.927v161.176C637.922 569.136 630.344 576.714 620.995 576.714z"/><path fill="${color}" d="M883.792 576.714H722.616c-9.348 0-16.927-7.578-16.927-16.927V398.612c0-9.348 7.578-16.927 16.927-16.927h161.176c9.348 0 16.927 7.578 16.927 16.927v161.176C900.718 569.136 893.14 576.714 883.792 576.714z"/><path fill="${color}" d="M1146.588 576.714H985.412c-9.348 0-16.927-7.578-16.927-16.927V398.612c0-9.348 7.578-16.927 16.927-16.927h161.176c9.348 0 16.927 7.578 16.927 16.927v161.176C1163.515 569.136 1155.936 576.714 1146.588 576.714z"/><path fill="${color}" d="M358.2 839.509h-161.176c-9.348 0-16.927-7.578-16.927-16.927V661.407c0-9.348 7.578-16.927 16.927-16.927h161.176c9.348 0 16.927 7.578 16.927 16.927v161.176C375.127 831.931 367.548 839.509 358.2 839.509z"/><path fill="${color}" d="M620.995 839.509H459.82c-9.348 0-16.927-7.578-16.927-16.927V661.407c0-9.348 7.578-16.927 16.927-16.927h161.176c9.348 0 16.927 7.578 16.927 16.927v161.176C637.922 831.931 630.344 839.509 620.995 839.509z"/><path fill="${color}" d="M883.792 839.509H722.616c-9.348 0-16.927-7.578-16.927-16.927V661.407c0-9.348 7.578-16.927 16.927-16.927h161.176c9.348 0 16.927 7.578 16.927 16.927v161.176C900.718 831.931 893.14 839.509 883.792 839.509z"/><path fill="${color}" d="M1146.588 839.509H985.412c-9.348 0-16.927-7.578-16.927-16.927V661.407c0-9.348 7.578-16.927 16.927-16.927h161.176c9.348 0 16.927 7.578 16.927 16.927v161.176C1163.515 831.931 1155.936 839.509 1146.588 839.509z"/><path fill="${color}" d="M358.2 1102.305h-161.176c-9.348 0-16.927-7.578-16.927-16.927V924.202c0-9.348 7.578-16.927 16.927-16.927h161.176c9.348 0 16.927 7.578 16.927 16.927v161.176C375.127 1094.726 367.548 1102.305 358.2 1102.305z"/><path fill="${color}" d="M620.995 1102.305H459.82c-9.348 0-16.927-7.578-16.927-16.927V924.202c0-9.348 7.578-16.927 16.927-16.927h161.176c9.348 0 16.927 7.578 16.927 16.927v161.176C637.922 1094.726 630.344 1102.305 620.995 1102.305z"/><path fill="${color}" d="M883.792 1102.305H722.616c-9.348 0-16.927-7.578-16.927-16.927V924.202c0-9.348 7.578-16.927 16.927-16.927h161.176c9.348 0 16.927 7.578 16.927 16.927v161.176C900.718 1094.726 893.14 1102.305 883.792 1102.305z"/><path fill="${color}" d="M1146.588 1102.305H985.412c-9.348 0-16.927-7.578-16.927-16.927V924.202c0-9.348 7.578-16.927 16.927-16.927h161.176c9.348 0 16.927 7.578 16.927 16.927v161.176C1163.515 1094.726 1155.936 1102.305 1146.588 1102.305z"/></svg>`;
  },
  interactionIcon: function (color) {
    return `<svg xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 157.123 136.627"><path d="M129.909 100.943c-0.036-0.942 0.417-1.842 1.193-2.377 15.607-10.751 26.021-25.595 26.021-42.495C157.123 24.914 125.206 0 85.836 0S14.549 24.914 14.549 56.071s31.916 55.727 71.287 55.727c3.2 0 6.35-0.169 9.439-0.493 1.217-0.128 2.427 0.239 3.388 0.997 11.411 8.991 28.209 14.495 42.154 15.168 0.974 0.047 1.498-1.129 0.81-1.821C137.912 121.911 130.361 112.89 129.909 100.943z" fill="${color}"/><path d="M33.147 98.552C20.886 89.012 13.323 76.646 11.353 63.176 4.268 69.82 0 78.401 0 87.817 0 99.343 7.088 109.47 17.718 116.814c0.567 0.392 0.907 1.042 0.879 1.731 -0.34 8.333-5.726 14.574-8.186 17.004 -0.408 0.403-0.109 1.101 0.464 1.077 9.433-0.395 20.845-4.059 28.709-10.09 0.906-0.695 2.032-1.031 3.169-0.921 1.956 0.19 3.948 0.289 5.969 0.289 13.053 0 24.907-3.952 33.654-10.453C63.758 114.795 46.388 108.854 33.147 98.552z" fill="${color}"/></svg>`;
  }
}

GeneralJs.colorSet = {
  light: {
    white: "#ffffff",
    whiteIcon: "#ffffff",
    whiteBlack: "#ffffff",
    whiteGray: "#fbfbfb",
    gray0: "#f7f7f7",
    gray1: "#f2f2f2",
    gray2: "#ececec",
    gray3: "#dddddd",
    gray4: "#cccccc",
    gray5: "#aaaaaa",
    gray6: "#e2e2e2",
    grayDeactive: "#c2c2c2",
    deactive: "#bbbbbb",
    liteShadow: "#bbbbbb",
    shadow: "#808080",
    shadowWhite: "#808080",
    darkShadow: "#606060",
    darkDarkShadow: "#505050",
    liteBlack: "#aaaaaa",
    black: "#404040",
    darkBlack: "#303030",
    realBlack: "#202020",
    gradientGreen: "linear-gradient(222deg, rgba(89, 175, 137, 0.9) 5%, rgba(0, 156, 106, 0.9) 100%)",
    gradientGreen2: "linear-gradient(222deg, rgba(89, 175, 137, 0.8) 5%, rgba(0, 156, 106, 0.9) 100%)",
    gradientGreen3: "linear-gradient(172deg, rgba(89, 175, 137, 0.9) 5%, rgba(0, 156, 106, 0.9) 100%)",
    gradientGreen4: "linear-gradient(222deg, rgba(89, 175, 137, 1) 5%, rgba(0, 156, 106, 1) 100%)",
    gradientGreenWhite: "linear-gradient(222deg, rgba(89, 175, 137, 0.9) 5%, rgba(0, 156, 106, 0.9) 100%)",
    greenGray: "#2fa678",
    greenWhite: "#2fa678",
    greenBlack: "#2fa678",
    cancelBlack: "#404040",
    green: "#2fa678",
    darkGreen: "#009b6a",
    whiteGreen: "#bedacb",
    middleGreen: "#83cea7",
    liteGreen: "#f0f9f5",
    gradientGray: "linear-gradient(256deg, rgba(20, 20, 20, 0.65) 0%, rgba(28, 28, 28, 0.7) 100%)",
    gradientBlack: "linear-gradient(256deg, rgba(15, 15, 15, 0.9) 0%, rgba(20, 20, 20, 0.75) 100%)",
    red: "#ff5f57",
    yellow: "#ffbd3d",
    purple: "#ba7dd7",
    darkRed: "#d13939",
  },
  dark: {
    white: "#181818",
    whiteIcon: "#dddddd",
    whiteBlack: "#ececec",
    whiteGray: "#040404",
    gray0: "#0f0f0f",
    gray1: "#0d0d0d",
    gray2: "#040404",
    gray3: "#040404",
    gray4: "#333333",
    gray5: "#555555",
    gray6: "#1d1d1d",
    grayDeactive: "#3d3d3d",
    deactive: "#808080",
    liteShadow: "#000000",
    shadow: "#000000",
    shadowWhite: "#dddddd",
    darkShadow: "#ececec",
    darkDarkShadow: "#000000",
    liteBlack: "#bbbbbb",
    black: "#ececec",
    darkBlack: "#f2f2f2",
    realBlack: "#ffffff",
    gradientGreen: "linear-gradient(222deg, rgba(36, 36, 36, 1) 5%, rgba(32, 32, 32, 1) 100%)",
    gradientGreen2: "linear-gradient(222deg, rgba(36, 36, 36, 1) 5%, rgba(32, 32, 32, 1) 100%)",
    gradientGreen3: "linear-gradient(172deg, rgba(89, 175, 137, 0.9) 5%, rgba(0, 156, 106, 0.9) 100%)",
    gradientGreen4: "linear-gradient(222deg, rgba(36, 36, 36, 1) 5%, rgba(32, 32, 32, 1) 100%)",
    gradientGreenWhite: "#dddddd",
    greenGray: "#303030",
    greenWhite: "#ececec",
    greenBlack: "#0b0b0b",
    cancelBlack: "#303030",
    green: "#2fa678",
    darkGreen: "#bedacb",
    whiteGreen: "#009b6a",
    middleGreen: "#83cea7",
    liteGreen: "#1a221f",
    gradientGray: "linear-gradient(256deg, rgba(20, 20, 20, 0.65) 0%, rgba(28, 28, 28, 0.7) 100%)",
    gradientBlack: "linear-gradient(256deg, rgba(15, 15, 15, 0.9) 0%, rgba(20, 20, 20, 0.75) 100%)",
    red: "#ff5f57",
    yellow: "#ffbd3d",
    purple: "#ba7dd7",
    darkRed: "#d13939",
  }
}

GeneralJs.colorMode = "light";

GeneralJs.colorChip = {
  white: "#ffffff",
  whiteIcon: "#ffffff",
  whiteBlack: "#ffffff",
  whiteGray: "#fbfbfb",
  gray0: "#f7f7f7",
  gray1: "#f2f2f2",
  gray2: "#ececec",
  gray3: "#dddddd",
  gray4: "#cccccc",
  gray5: "#aaaaaa",
  gray6: "#e2e2e2",
  grayDeactive: "#c2c2c2",
  deactive: "#bbbbbb",
  liteShadow: "#bbbbbb",
  shadow: "#808080",
  shadowWhite: "#808080",
  darkShadow: "#606060",
  darkDarkShadow: "#505050",
  liteBlack: "#aaaaaa",
  black: "#404040",
  darkBlack: "#303030",
  realBlack: "#202020",
  gradientGreen: "linear-gradient(222deg, rgba(89, 175, 137, 0.9) 5%, rgba(0, 156, 106, 0.9) 100%)",
  gradientGreen2: "linear-gradient(222deg, rgba(89, 175, 137, 0.8) 5%, rgba(0, 156, 106, 0.9) 100%)",
  gradientGreen3: "linear-gradient(172deg, rgba(89, 175, 137, 0.9) 5%, rgba(0, 156, 106, 0.9) 100%)",
  gradientGreen4: "linear-gradient(222deg, rgba(89, 175, 137, 1) 5%, rgba(0, 156, 106, 1) 100%)",
  gradientGreenWhite: "linear-gradient(222deg, rgba(89, 175, 137, 0.9) 5%, rgba(0, 156, 106, 0.9) 100%)",
  greenGray: "#2fa678",
  greenWhite: "#2fa678",
  greenBlack: "#2fa678",
  cancelBlack: "#404040",
  green: "#2fa678",
  darkGreen: "#009b6a",
  whiteGreen: "#bedacb",
  middleGreen: "#83cea7",
  liteGreen: "#f0f9f5",
  gradientGray: "linear-gradient(256deg, rgba(20, 20, 20, 0.65) 0%, rgba(28, 28, 28, 0.7) 100%)",
  gradientBlack: "linear-gradient(256deg, rgba(15, 15, 15, 0.9) 0%, rgba(20, 20, 20, 0.75) 100%)",
  red: "#ff5f57",
  yellow: "#ffbd3d",
  purple: "#ba7dd7",
  darkRed: "#d13939",
};

GeneralJs.colorParsing = function (str) {
  if (typeof str === "string") {
    if (/^\#/.test(str) && str.length === 7) {
      str = str.slice(1);
    }
    if (str.length !== 6 && str.replace(/[^0-9a-f]/gi, '') === '') {
      throw new Error("invaild input");
    }
    let colorArr;
    colorArr = [ str.slice(0, 2), str.slice(2, 4), str.slice(4) ];
    colorArr = colorArr.map((s) => {
      let num;
      num = 0;
      if (/[a-z]/gi.test(s[1])) {
        num += s[1].charCodeAt(0) - 97 + 10;
      } else {
        num += Number(s[1]);
      }
      if (/[a-z]/gi.test(s[0])) {
        num += (s[0].charCodeAt(0) - 97 + 10) * 16;
      } else {
        num += (Number(s[0])) * 16;
      }
      return num;
    });
    return colorArr;
  } else if (Array.isArray(str)) {
    if (str.length !== 3) {
      throw new Error("invaild input");
    }
    if (typeof str[0] !== "number" || typeof str[1] !== "number" || typeof str[2] !== "number") {
      throw new Error("invaild input");
    }
    if (Number.isNaN(str[0]) || Number.isNaN(str[1]) || Number.isNaN(str[2])) {
      throw new Error("invaild input");
    }
    const convertNum = (num) => {
      const convertStr = (n) => {
        if (n < 10) {
          return String(n);
        } else {
          return String.fromCharCode(n + 87);
        }
      }
      let first, second;
      second = num % 16;
      first = (num - second) / 16;
      return convertStr(first) + convertStr(second);
    }
    str = str.map(convertNum);
    return '#' + str.join('');
  } else {
    throw new Error("invaild input");
  }
}

GeneralJs.mimeTypes = { aac: "audio/aac", abw: "application/x-abiword", arc: "application/octet-stream", avi: "video/x-msvideo", azw: "application/vnd.amazon.ebook", bin: "application/octet-stream", bz: "application/x-bzip", bz2: "application/x-bzip2", csh: "application/x-csh", css: "text/css", csv: "text/csv", doc: "application/msword", epub: "application/epub+zip", gif: "image/gif", htm: "text/html", html: "text/html", ico: "image/x-icon", ics: "text/calendar", jar: "application/java-archive", jpeg: "image/jpeg", jpg: "image/jpeg", mjs: "application/js", js: "application/js", json: "application/json", mid: "audio/midi", midi: "audio/midi", mpeg: "video/mpeg", mpkg: "application/vnd.apple.installer+xml", odp: "application/vnd.oasis.opendocument.presentation", ods: "application/vnd.oasis.opendocument.spreadsheet", odt: "application/vnd.oasis.opendocument.text", oga: "audio/ogg", ogv: "video/ogg", ogx: "application/ogg", pdf: "application/pdf", ppt: "application/vnd.ms-powerpoint", rar: "application/x-rar-compressed", rtf: "application/rtf", sh: "application/x-sh", svg: "image/svg+xml", swf: "application/x-shockwave-flash", tar: "application/x-tar", tif: "image/tiff", tiff: "image/tiff", ttf: "application/x-font-ttf", vsd: "application/vnd.visio", wav: "audio/x-wav", weba: "audio/webm", webm: "video/webm", webp: "image/webp", woff: "application/x-font-woff", xhtml: "application/xhtml+xml", xls: "application/vnd.ms-excel", xml: "application/xml", xul: "application/vnd.mozilla.xul+xml", zip: "application/zip", "3gp": "video/3gpp", "3g2": "video/3gpp2", "7z": "application/x-7z-compressed" };

GeneralJs.postWall = function (xhr) {
  if (!(xhr instanceof XMLHttpRequest)) {
    throw new Error("invaild input");
  }
  const target = "879617562858";
  let res = '';
  for (let i = target.length - 1; i > -1; i--) {
    if (i % 2 === 1) {
      res += String.fromCharCode(Number(target.slice(((i - 1) * 1), ((i + 1) * 1))[1] + target.slice(((i - 1) * 1), ((i + 1) * 1))[0]));
    }
  }
  xhr.setRequestHeader("Authorization", "Basic " + SvgTong["___" + res + "___"]);
}

GeneralJs.ajax = function (data, url, callback) {
  if (data === undefined && url === undefined && callback === undefined) {
    throw new Error("must be arguments (data, url, callback)");
  } else if (data !== undefined && typeof url === "function" && callback === undefined) {
    callback = url;
    url = data;
    data = "";
  }
  let dataString;
  if (typeof data === "object") {
    dataString = "";
    for (let i in data) {
      dataString += i.replace(/[\=\&]/g, '');
      dataString += '=';
      if (typeof data[i] === "object") {
        if (data[i] instanceof Date) {
          dataString += JSON.stringify(data[i]).replace(/^\"/g, '').replace(/\"$/g, '');
        } else {
          dataString += JSON.stringify(data[i]).replace(/[\=\&]/g, '');
        }
      } else {
        dataString += String(data[i]).replace(/[\=\&]/g, '');
      }
      dataString += '&';
    }
    data = dataString.slice(0, -1);
  }
  const xhr = new XMLHttpRequest();
  xhr.open("POST", url);
  xhr.onload = function () {
    if (xhr.readyState !== 4) { return }
    if (xhr.status >= 200 && xhr.status < 300) {
      let response = xhr.response;
      if (!/Exception occur/g.test(response)) {
        callback(response);
      } else {
        alert("오류가 발생하였습니다. 다시 시도해주세요!");
        // window.location.reload();
      }
    } else if (xhr.status >= 500) {
      alert("오류가 발생하였습니다. 다시 시도해주세요!");
      // window.location.reload();
    } else if (xhr.status >= 402 && xhr.status <= 420) {
      alert("오류가 발생하였습니다. 다시 시도해주세요!");
      // window.location.reload();
    } else if(xhr.status === 400 || xhr.status === 401) {
      alert("오류가 발생하였습니다. 다시 시도해주세요!");
      // window.location.reload();
    }
  }
  xhr.onerror = function () {
    alert("오류가 발생하였습니다. 다시 시도해주세요!");
    // window.location.reload();
  }
  if (typeof data === "string") {
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  }
  xhr.send(data);
}

GeneralJs.ajaxPromise = function (data, url) {
  if (data === undefined && url === undefined) {
    throw new Error("must be arguments (data, url)");
  } else if (data !== undefined && url === undefined) {
    url = data;
    data = "";
  }
  let dataString;
  if (typeof data === "object") {
    dataString = "";
    for (let i in data) {
      dataString += i.replace(/[\=\&]/g, '');
      dataString += '=';
      if (typeof data[i] === "object") {
        if (data[i] instanceof Date) {
          dataString += JSON.stringify(data[i]).replace(/^\"/g, '').replace(/\"$/g, '');
        } else {
          dataString += JSON.stringify(data[i]).replace(/[\=\&]/g, '');
        }
      } else {
        dataString += String(data[i]).replace(/[\=\&]/g, '');
      }
      dataString += '&';
    }
    data = dataString.slice(0, -1);
  }
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.onload = function () {
     if (xhr.readyState !== 4) { return }
     if (xhr.status >= 200 && xhr.status < 300) {
       resolve(xhr.response);
     } else {
       reject({
         status: this.status,
         statusText: xhr.statusText
       });
     }
    };
    xhr.onerror = function () {
     reject({
       status: this.status,
       statusText: xhr.statusText
     });
    };
    if (typeof data === "string") {
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    }
    xhr.send(data);
  });
}

GeneralJs.ajaxForm = function (data, url) {
  if (data === undefined && url === undefined) {
    throw new Error("must be arguments (data, url)");
  } else if (data !== undefined && url === undefined) {
    url = data;
    data = "";
  }
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.onload = function () {
     if (xhr.readyState !== 4) { return }
     if (xhr.status >= 200 && xhr.status < 300) {
       resolve(xhr.response);
     } else {
       reject({
         status: this.status,
         statusText: xhr.statusText
       });
     }
    };
    xhr.onerror = function () {
     reject({
       status: this.status,
       statusText: xhr.statusText
     });
    };
    xhr.send(data);
  });
}

GeneralJs.ajaxJson = function (data, url, option = { equal: null }) {
  if (typeof option !== "object") {
    throw new Error("invaild input");
  }
  return new Promise(function (resolve, reject) {
    GeneralJs.ajaxPromise(data, url).then(function (jsonString) {
      let json, filtered, temp, tempFunc;
      try {
        temp = jsonString.trim();
        if (temp[0] !== '{' && temp[0] !== '[') {
          reject("server must send json");
        } else {
          if (option.equal !== undefined && option.equal !== null) {
            filtered = jsonString.replace(/(\"[0-9]+\-[0-9]+\-[0-9]+T[0-9]+\:[0-9]+\:[^Z]+Z\")/g, function (match, p1, offset, string) { return "new Date(" + p1 + ")"; });
            tempFunc = new Function("const obj = " + filtered + "; return obj;");
            json = tempFunc();
          } else {
            json = JSON.parse(jsonString);
          }
          resolve(json);
        }
      } catch (e) {
        reject(e);
      }
    }).catch(function (e) {
      reject(e);
    });
  });
}

GeneralJs.request = function (url, callback) {
  if (url === undefined && callback === undefined) {
    throw new Error("must be arguments (url, callback)");
  }
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.onload = function () {
    if (xhr.readyState !== 4) { return; }
    if (xhr.status >= 200 && xhr.status < 300) {
      let response = xhr.response;
      if (!/Exception occur/g.test(response)) {
        callback(response);
      } else {
        alert("오류가 발생하였습니다. 다시 시도해주세요!");
        window.location.reload();
      }
    } else if (xhr.status >= 500) {
      alert("오류가 발생하였습니다. 다시 시도해주세요!");
      window.location.reload();
    } else if (xhr.status >= 402 && xhr.status <= 420) {
      alert("오류가 발생하였습니다. 다시 시도해주세요!");
      window.location.reload();
    } else if(xhr.status === 400 || xhr.status === 401) {
      alert("오류가 발생하였습니다. 다시 시도해주세요!");
      window.location.reload();
    }
  }
  xhr.onerror = function () {
    alert("오류가 발생하였습니다. 다시 시도해주세요!");
    window.location.reload();
  }
  xhr.send();
}

GeneralJs.requestPromise = function (url) {
  if (url === undefined) {
    throw new Error("must be arguments (url)");
  }
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = function () {
     if (xhr.readyState !== 4) { return }
     if (xhr.status >= 200 && xhr.status < 300) {
       resolve(xhr.response);
     } else {
       reject({
         status: this.status,
         statusText: xhr.statusText
       });
     }
    };
    xhr.onerror = function () {
     reject({
       status: this.status,
       statusText: xhr.statusText
     });
    };
    xhr.send();
  });
}

GeneralJs.downloadFile = function (url, forceName = null) {
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "arraybuffer";
    xhr.onload = function () {
     if (xhr.readyState !== 4) { return; }
     if (xhr.status >= 200 && xhr.status < 300) {
       let fileName, fileType, blob, a, timeoutId;
       let execSearch;
       fileName = url.split("/")[url.split("/").length - 1];
       execSearch = /\.[^\.]+$/.exec(fileName);
       if (execSearch === null) {
         reject("invaild url");
         return;
       }
       fileType = GeneralJs.mimeTypes[execSearch[0].replace(/\./g, '').toLowerCase()];
       if (fileType === undefined) {
         fileType = "application/octet-stream";
       }
       if (forceName !== null && typeof forceName === "string") {
         fileName = forceName.replace(/\.[^\.]+$/, '') + '.' + execSearch[0].replace(/\./g, '').toLowerCase();
       }
       blob = new Blob([ xhr.response ], { type: fileType });
       a = document.createElement('A');
       a.download = fileName;
       a.href = URL.createObjectURL(blob);
       a.dataset.downloadurl = [ fileType, a.download, a.href ].join(':');
       a.style.display = "none";
       document.body.appendChild(a);
       a.click();
       document.body.removeChild(a);
       resolve(fileName);
       timeoutId = setTimeout(function() {
         URL.revokeObjectURL(a.href);
         clearTimeout(timeoutId);
       }, 1500);
     } else {
       reject({
         status: this.status,
         statusText: xhr.statusText
       });
     }
    };
    xhr.onerror = function () {
     reject({
       status: this.status,
       statusText: xhr.statusText
     });
    };
    xhr.send();
  });
}

GeneralJs.formtoAjax = function (id) {
  let dom = document.getElementById(id);
  let kids = dom.children;
  let result = '';
  for (let i = 0; i < kids.length; i++) {
    result += kids[i].getAttribute("name").replace(/[\=\&]/g, '') + '=' + kids[i].getAttribute("value").replace(/[\=\&]/g, '') + '&';
  }
  result = result.slice(0, -1);
  return result;
}

GeneralJs.nodes = {
  div: document.createElement("DIV"),
  img: document.createElement("IMG"),
  input: document.createElement("INPUT"),
  textarea: document.createElement("TEXTAREA"),
  a: document.createElement('A'),
  b: document.createElement('B'),
  label: document.createElement('LABEL'),
  iframe: document.createElement('IFRAME'),
  aside: document.createElement('ASIDE'),
  video: document.createElement('VIDEO'),
  source: document.createElement('SOURCE')
}

GeneralJs.scrollTo = function (from, valueOrTo, visualSpecific = 0) {
  if (from === undefined || valueOrTo === undefined || typeof visualSpecific !== "number") {
    throw new Error("invaild input");
  }
  if (from !== window) {
    if (typeof valueOrTo !== "number") {
      if (typeof valueOrTo === "object") {
        valueOrTo = from.scrollTop + valueOrTo.getBoundingClientRect().top;
      } else {
        throw new Error("invaild input");
      }
    }
    from.scrollTop = valueOrTo - visualSpecific;
  } else {
    if (typeof valueOrTo === "number") {
      window.scroll({ top: valueOrTo - visualSpecific, left: 0, behavior: "smooth" });
    } else {
      window.scroll({ top: Math.abs(document.body.getBoundingClientRect().top - valueOrTo.getBoundingClientRect().top) - visualSpecific, left: 0, behavior: "smooth" });
    }
  }
}

GeneralJs.createNode = function (mode, source, style, mother = null) {
  /* append style object properties */
  /*
  style = {
    mode: "div",
    source: "",
    mother: base,
    text: "안녕하세요!",
    class: [ "hoverdefault" ],
    id: "aaa",
    attribute: [
      { index: "b" },
    ],
    events: [
      { type: "click", event: new Function() }
    ],
    style: {},
    children: [
      ...nodeObject
    ]
  }
  */
  let dom_clone, targetStyle, ea, ratio, temp, boldObject, underObject, children, tempIndex;
  children = [];
  if (mode === undefined && source === undefined && style === undefined) {
    throw new Error("arguments must be mode(dom node name), style");
    return null;
  } else {
    if (mode !== undefined && typeof mode === "object") {
      style = mode;
      mode = "div";
      if (typeof source === "object" && source.nodeName !== undefined) {
        mother = source;
      } else {
        mother = null;
      }
      source = null;
    } else if (typeof mode === "string" && typeof source === "object") {
      mode = mode;
      if (typeof style === "object" && style.nodeName !== undefined) {
        mother = style;
        style = source;
        source = null;
      } else {
        style = source;
        mother = null;
        source = null;
      }
    } else if (typeof mode === "string" && typeof source === "string" && typeof style === "object") {
      mode = mode;
      style = style;
      source = source;
      mother = mother;
    } else {
      throw new Error("arguments must be mode(dom node name), svg source string, style object, dom mother");
      return null;
    }
  }
  if (Array.isArray(style)) {
    throw new Error("argument must be object, not array");
  }
  if (style.mode !== undefined) {
    if (typeof style.mode === "string") {
      mode = style.mode;
    }
    delete style.mode;
  }
  if (style.source !== undefined) {
    if (typeof style.source === "string") {
      source = style.source;
    }
    delete style.source;
  }
  if (style.mother !== undefined) {
    if (typeof style.mother === "object" && style.mother.nodeName !== undefined) {
      mother = style.mother;
    }
    delete style.mother;
  }
  if (style.children !== undefined) {
    if (Array.isArray(style.children)) {
      children = style.children;
    }
    delete style.children;
  }
  if (!/svg/gi.test(mode)) {
    if (GeneralJs.nodes[mode] === undefined || typeof style !== "object") {
      throw new Error("invaild arguments");
      return null;
    } else {
      dom_clone = GeneralJs.nodes[mode].cloneNode(true);
      if (style.text !== undefined) {
        if ((typeof style.text === "string" || Array.isArray(style.text)) && dom_clone.textContent !== undefined) {
          if (Array.isArray(style.text)) {
            style.text = style.text.join("<br>");
          }
          if (/\<b\%/gi.test(style.text)) {
            if (style.bold === undefined || typeof style.bold !== "object") {
              throw new Error("bold option needs");
            } else {
              boldObject = "";
              for (let b in style.bold) {
                if (/^font/.test(b) || /^padding/.test(b) || /^margin/.test(b)) {
                  tempIndex = null;
                  for (let z = 0; z < b.length; z++) {
                    if (b.charCodeAt(z) < "a".charCodeAt(0)) {
                      tempIndex = z;
                      break;
                    }
                  }
                  if (tempIndex !== null) {
                    boldObject += b.slice(0, tempIndex) + '-' + b.slice(tempIndex).toLowerCase();
                  } else {
                    boldObject += b;
                  }
                } else {
                  boldObject += b;
                }
                boldObject += ':';
                boldObject += style.bold[b];
                boldObject += ';';
              }
              style.text = style.text.replace(/\<b\%/gi, "<b style=\"" + boldObject + "\">");
              style.text = style.text.replace(/\%b\>/gi, "</b>");
            }
          }
          if (/\<u\%/gi.test(style.text)) {
            if (style.under === undefined || typeof style.under !== "object") {
              throw new Error("under option needs");
            } else {
              underObject = "";
              for (let b in style.under) {
                if (/^font/.test(b) || /^padding/.test(b) || /^margin/.test(b)) {
                  tempIndex = null;
                  for (let z = 0; z < b.length; z++) {
                    if (b.charCodeAt(z) < "a".charCodeAt(0)) {
                      tempIndex = z;
                      break;
                    }
                  }
                  if (tempIndex !== null) {
                    underObject += b.slice(0, tempIndex) + '-' + b.slice(tempIndex).toLowerCase();
                  } else {
                    underObject += b;
                  }
                } else {
                  underObject += b;
                }
                underObject += ':';
                underObject += style.under[b];
                underObject += ';';
              }
              style.text = style.text.replace(/\<u\%/gi, "<b style=\"" + underObject + "\">");
              style.text = style.text.replace(/\%u\>/gi, "</b>");
            }
          }
          if (mode !== "textarea") {
            dom_clone.insertAdjacentHTML("beforeend", style.text.replace(/\n/g, "<br>"));
          } else {
            dom_clone.textContent = style.text.replace(/\<br\>/g, "\n");
          }
        }
        delete style.text;
      }
      if (style.class !== undefined) {
        if (Array.isArray(style.class)) {
          for (let c of style.class) {
            dom_clone.classList.add(c);
          }
        }
        delete style.class;
      }
      if (style.id !== undefined) {
        if (typeof style.id === "string" && dom_clone.id !== undefined) {
          dom_clone.id = style.id;
        }
        delete style.id;
      }
      if (style.attribute !== undefined) {
        if (Array.isArray(style.attribute)) {
          for (let a of style.attribute) {
            if (typeof a === "object") {
              for (let key in a) {
                dom_clone.setAttribute(key, String(a[key]));
              }
            }
          }
        } else if (typeof style.attribute === "object" && style.attribute !== null) {
          for (let key in style.attribute) {
            dom_clone.setAttribute(key, String(style.attribute[key]));
          }
        }
        delete style.attribute;
      }
      if (style.style !== undefined) {
        if (typeof style.style === "object") {
          targetStyle = style.style;
        } else {
          throw new Error("invaild arguments");
        }
      } else {
        targetStyle = style;
      }
      if (targetStyle.wordSpacing === undefined) {
        targetStyle.wordSpacing = String(-1) + "px";
      }
      for (let i in targetStyle) {
        dom_clone.style[i] = targetStyle[i];
      }
      if (style.event !== undefined) {
        style.events = style.event;
      }
      if (style.events !== undefined) {
        if (Array.isArray(style.events)) {
          for (let obj of style.events) {
            if (Array.isArray(obj.type)) {
              for (let str of obj.type) {
                if (typeof obj.event === "function") {
                  if (str === "touch") {
                    if (/iPhone/gi.test(window.navigator.userAgent)) {
                      dom_clone.addEventListener("click", obj.event);
                      dom_clone.addEventListener("touchstart", obj.event);
                    } else {
                      dom_clone.addEventListener("click", obj.event);
                    }
                  } else {
                    dom_clone.addEventListener(str, obj.event);
                  }
                }
              }
            } else if (typeof obj.type === "string") {
              if (typeof obj.event === "function") {
                if (obj.type === "touch") {
                  if (/iPhone/gi.test(window.navigator.userAgent)) {
                    dom_clone.addEventListener("click", obj.event);
                    dom_clone.addEventListener("touchstart", obj.event);
                  } else {
                    dom_clone.addEventListener("click", obj.event);
                  }
                } else {
                  dom_clone.addEventListener(obj.type, obj.event);
                }
              }
            } else {
              throw new Error("invaild type");
            }
          }
        } else if (typeof style.events === "object" && style.events !== null) {
          for (let type in style.events) {
            if (typeof style.events[type] === "function") {
              if (type === "touch") {
                if (/iPhone/gi.test(window.navigator.userAgent)) {
                  dom_clone.addEventListener("click", style.events[type]);
                  dom_clone.addEventListener("touchstart", style.events[type]);
                } else {
                  dom_clone.addEventListener("click", style.events[type]);
                }
              } else {
                dom_clone.addEventListener(type, style.events[type]);
              }
            }
          }
        }
      }
      if (mother !== null && typeof mother.appendChild === "function") {
        if (style.before === undefined) {
          mother.appendChild(dom_clone);
        } else {
          mother.insertBefore(dom_clone, style.before);
        }
      }
      if (Array.isArray(children)) {
        if (children.length > 0) {
          for (let childObject of children) {
            childObject.mother = dom_clone;
            GeneralJs.createNode(childObject);
          }
        }
      }
      return dom_clone;
    }
  } else {
    if (typeof source === "string" && typeof style === "object") {
      dom_clone = SvgTong.stringParsing(source);
      if (style.text !== undefined) {
        delete style.text;
      }
      if (style.class !== undefined) {
        if (Array.isArray(style.class)) {
          for (let c of style.class) {
            dom_clone.classList.add(c);
          }
        }
        delete style.class;
      }
      if (style.id !== undefined) {
        if (typeof style.id === "string" && dom_clone.id !== undefined) {
          dom_clone.id = style.id;
        }
        delete style.id;
      }
      if (style.attribute !== undefined) {
        if (Array.isArray(style.attribute)) {
          for (let a of style.attribute) {
            if (typeof a === "object") {
              for (let key in a) {
                dom_clone.setAttribute(key, String(a[key]));
              }
            }
          }
        } else if (typeof style.attribute === "object" && style.attribute !== null) {
          for (let key in style.attribute) {
            dom_clone.setAttribute(key, String(style.attribute[key]));
          }
        }
        delete style.attribute;
      }
      if (style.style !== undefined) {
        if (typeof style.style === "object") {
          targetStyle = style.style;
        } else {
          throw new Error("invaild arguments");
        }
      } else {
        targetStyle = style;
      }
      if ((targetStyle.width === "auto" || targetStyle.width === undefined) && targetStyle.height !== undefined) {
        ratio = SvgTong.getRatio(dom_clone);
        ea = targetStyle.height.replace(/[\-\.0-9]/gi, '');
        temp = Number(targetStyle.height.replace(/[^\-\.0-9]/gi, ''));
        targetStyle.width = String(temp * ratio) + ea;
      }
      if ((targetStyle.height === "auto" || targetStyle.height === undefined) && targetStyle.width !== undefined) {
        ratio = SvgTong.getRatio(dom_clone);
        ea = targetStyle.width.replace(/[\-\.0-9]/gi, '');
        temp = Number(targetStyle.width.replace(/[^\-\.0-9]/gi, ''));
        targetStyle.height = String(temp / ratio) + ea;
      }
      for (let i in targetStyle) {
        dom_clone.style[i] = targetStyle[i];
      }
      if (style.event !== undefined) {
        style.events = style.event;
      }
      if (style.events !== undefined) {
        if (Array.isArray(style.events)) {
          for (let obj of style.events) {
            if (Array.isArray(obj.type)) {
              for (let str of obj.type) {
                if (typeof obj.event === "function") {
                  if (str === "touch") {
                    if (/iPhone/gi.test(window.navigator.userAgent)) {
                      dom_clone.addEventListener("click", obj.event);
                      dom_clone.addEventListener("touchstart", obj.event);
                    } else {
                      dom_clone.addEventListener("click", obj.event);
                    }
                  } else {
                    dom_clone.addEventListener(str, obj.event);
                  }
                }
              }
            } else if (typeof obj.type === "string") {
              if (typeof obj.event === "function") {
                if (obj.type === "touch") {
                  if (/iPhone/gi.test(window.navigator.userAgent)) {
                    dom_clone.addEventListener("click", obj.event);
                    dom_clone.addEventListener("touchstart", obj.event);
                  } else {
                    dom_clone.addEventListener("click", obj.event);
                  }
                } else {
                  dom_clone.addEventListener(obj.type, obj.event);
                }
              }
            } else {
              throw new Error("invaild type");
            }
          }
        } else if (typeof style.events === "object" && style.events !== null) {
          for (let type in style.events) {
            if (typeof style.events[type] === "function") {
              if (type === "touch") {
                if (/iPhone/gi.test(window.navigator.userAgent)) {
                  dom_clone.addEventListener("click", style.events[type]);
                  dom_clone.addEventListener("touchstart", style.events[type]);
                } else {
                  dom_clone.addEventListener("click", style.events[type]);
                }
              } else {
                dom_clone.addEventListener(type, style.events[type]);
              }
            }
          }
        }
      }
      if (mother !== null && typeof mother.appendChild === "function") {
        if (style.before === undefined) {
          mother.appendChild(dom_clone);
        } else {
          mother.insertBefore(dom_clone, style.before);
        }
      }
      return dom_clone;
    } else {
      throw new Error("invaild arguments");
      return null;
    }
  }
}

GeneralJs.createElement = GeneralJs.createNode;

GeneralJs.create = GeneralJs.createNode;

GeneralJs.createFragment = function () {
  return document.createDocumentFragment();
}

GeneralJs.createNodes = function (arr) {
  if (!Array.isArray(arr)) {
    throw new Error("arguments must be array");
  } else {
    let result, pastNode;

    pastNode = null;
    result = [];
    for (let i = 0; i < arr.length; i++) {
      if (typeof arr[i] !== "object") {
        throw new Error("arguments must be [ object, object, object... ]");
      } else {
        if (arr[i].mother === undefined) {
          throw new Error("mother must be exist");
        } else {
          if (typeof arr[i].mother === "string") {
            if (pastNode === null) {
              throw new Error("first mother can not be chain");
            }
            if (/ch/gi.test(arr[i].mother)) {
              arr[i].mother = pastNode;
            } else {
              throw new Error("invaild mother operation");
            }
          } else if (typeof arr[i].mother === "number") {
            if (pastNode === null) {
              throw new Error("first mother can not be chain");
            }
            if (arr[i].mother >= 0) {
              if (result[arr[i].mother] === undefined) {
                throw new Error("index out error");
              }
              arr[i].mother = result[arr[i].mother];
            } else {
              if (result[i + arr[i].mother] === undefined) {
                throw new Error("index out error");
              }
              arr[i].mother = result[i + arr[i].mother];
            }
          }
          pastNode = GeneralJs.createNode(arr[i]);
          result.push(pastNode);
        }
      }
    }

    return result;
  }
}

GeneralJs.createElements = GeneralJs.createNodes;

GeneralJs.withOut = function (percent, num, ea) {
  if (typeof percent === "number" && typeof num !== undefined && typeof ea === "string") {
    return ("calc(" + String(percent) + "% - " + String(num) + ea + ")");
  } else if (typeof percent !== undefined && typeof num === "string" && ea === undefined) {
    return ("calc(" + String(100) + "% - " + String(percent) + num + ")");
  } else if (typeof percent === "number" && num === undefined && ea === undefined) {
    return ("calc(" + String(100) + "% - " + String(percent) + "px" + ")");
  } else {
    throw new Error("invaild arguments");
  }
}

GeneralJs.vwConvert = function (num) {
  if (typeof num !== "number") {
    throw new Error("argument must be number");
  } else {
    return (num / 100) * window.innerWidth;
  }
}

GeneralJs.setTimeout = function (callback, time) {
  let propertyName;
  propertyName = "tempTimeout_" + String((new Date()).valueOf()) + String(Math.round(Math.random() * 10000));
  GeneralJs.timeouts[propertyName] = setTimeout(() => {
    callback();
    clearTimeout(propertyName);
    GeneralJs.timeouts[propertyName] = null;
  }, time);
}

GeneralJs.setQueue = function (callback, delay = 0) {
  if (typeof callback !== "function") {
    throw new Error("invaild input");
  }
  if (typeof delay !== "number") {
    delay = 0;
  }
  let propertyName;
  propertyName = "tempQueue_" + String((new Date()).valueOf()) + String(Math.round(Math.random() * 10000));
  GeneralJs.timeouts[propertyName] = setTimeout(() => {
    callback();
    clearTimeout(propertyName);
    GeneralJs.timeouts[propertyName] = null;
  }, delay);
}

GeneralJs.willDo = function (func) {
  GeneralJs.setTimeout(func, 0);
}

GeneralJs.setDebounce = function (callback, name = "__null__", delay = 300) {
  if (typeof callback !== "function" || typeof name !== "string" || typeof delay !== "number") {
    throw new Error("invaild input");
  }
  if (GeneralJs.timeouts[name] !== null || GeneralJs.timeouts[name] !== undefined) {
    clearTimeout(GeneralJs.timeouts[name]);
  }
  GeneralJs.timeouts[name] = setTimeout(() => {
    callback();
    clearTimeout(GeneralJs.timeouts[name]);
    GeneralJs.timeouts[name] = null;
  }, delay);
}

GeneralJs.setThrottle = function (callback, ms = 100) {
  if (typeof callback !== "function" || typeof ms !== "number") {
    throw new Error("invaild input");
  }
  let timeout, waiting;
  waiting = false;
  return function () {
    if (!waiting) {
      callback.apply(this, arguments);
      waiting = true;
      timeout = setTimeout(function () {
        waiting = false;
        clearTimeout(timeout);
      }, ms);
    }
  }
}

GeneralJs.delayLaunching = function (callback, ms) {
  let timer = 0;
  return function () {
    if (timer !== 0) {
      clearTimeout(timer);
    }
    timer = setTimeout(callback, ms);
  }
}

GeneralJs.totalDelete = function () {
  let desktop = document.getElementById("totalcontents");
  let mobile = document.getElementById("mototalcontents");
  while (desktop.firstChild) { desktop.removeChild(desktop.lastChild); }
  while (mobile.firstChild) { mobile.removeChild(mobile.lastChild); }
}

GeneralJs.autoHypenPhone = function (m) {
  let str = m.trim();
  str = str.replace(/[^0-9]/g, '');
  let tmp = '';
  if (str.length < 4) {
    return str;
  } else if (str.length < 7) {
    tmp += str.substr(0,3);
    tmp += '-';
    tmp += str.substr(3);
    return tmp;
  } else if (str.length < 11) {
    tmp += str.substr(0, 3);
    tmp += '-';
    tmp += str.substr(3, 3);
    tmp += '-';
    tmp += str.substr(6);
    return tmp;
  } else {
    tmp += str.substr(0, 3);
    tmp += '-';
    tmp += str.substr(3, 4);
    tmp += '-';
    tmp += str.substr(7);
    return tmp;
  }
}

GeneralJs.returnGet = function () {
  let obj = {};
  let target = document.location.search;
  target.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function (origin, name, value) {
    let decode = function (str) { return decodeURIComponent(str.split("+").join(" ")); }
    obj[decode(name)] = decode(value);
  });
  return obj;
}

GeneralJs.parseRatio = function (options) {
  let obj = options;
  let srcName = obj.source;
  let srcArr = srcName.split('_');
  let ratio_raw, number0, number1, result, result_return;
  let ratio = 0;
  for (let i = 0; i < srcArr.length; i++) {
    if (/^[0-9]+rspot/.test(srcArr[i])) {
      ratio_raw = srcArr[i].split("rspot");
      number0 = Number(ratio_raw[0]);
      if (ratio_raw[1] === undefined) {
        number1 = 0;
      } else if (ratio_raw[1].length === 0) {
        number1 = 0;
      } else if (ratio_raw[1].length === 1) {
        number1 = Number(ratio_raw[1]) / 10;
      } else if (ratio_raw[1].length === 2) {
        number1 = Number(ratio_raw[1]) / 100;
      } else if (ratio_raw[1].length === 3) {
        number1 = Number(ratio_raw[1]) / 1000;
      }
      ratio = number0 + number1;
    }
  }
  if (obj.method === "height") {
    result = (ratio * obj.target);
  } else {
    result = (obj.target / ratio);
  }
  result_return = result;
  if (obj.result === "string") {
    result_return = String(result);
  }
  return result_return;
}

GeneralJs.addHrefEvent = function (dom, to) {
  dom.addEventListener("click", function (e) {
    window.location.href = to;
  });
}

GeneralJs.objectToRawquery = function (dataObj) {
  if (typeof dataObj !== "object") {
    throw new Error("invaild input, must be object");
  }
  let dataString;
  dataString = '';
  for (let i in dataObj) {
    dataString += i.replace(/[\=\&]/gi, '');
    dataString += '=';
    if (typeof dataObj[i] === "object") {
      dataString += JSON.stringify(dataObj[i]).replace(/[\=\&]/g, '');
    } else {
      dataString += String(dataObj[i]).replace(/[\=\&]/g, '');
    }
    dataString += '&';
  }
  dataString = dataString.slice(0, -1);

  return dataString;
}

GeneralJs.objectToQuery = function (obj) {
  // obj = {
  //   collection: "",
  //   columns: [],
  //   where: [ [ [ column, value, notBoo ],[],[] ], [ [],[],[] ], [ [],[],[] ] ],
  //   sort: [ column, DESC/ASC ],
  //   limit: [],
  // }
  let data = "collection=";
  data += obj.collection;
  if (obj.columns !== undefined) {
    data += '&';
    data += "columns=";
    data += obj.columns.join(',');
  } else {
    data += '&';
    data += "columns=";
    data += "*";
  }
  if (obj.where !== undefined) {
    data += '&';
    data += "where=";
    data += JSON.stringify(obj.where);
  }
  if (obj.sort !== undefined) {
    data += '&';
    data += "sort=";
    data += JSON.stringify(obj.sort);
  }
  if (obj.limit !== undefined) {
    data += '&';
    data += "limit=";
    data += JSON.stringify(obj.limit);
  }
  return data;
}

GeneralJs.inputBackward = function (dom, text) {
  alert(text);
  dom.parentNode.style.border = "1px solid #59af89";
  let setTime = setTimeout(function () {
    dom.focus();
    clearTimeout(setTime);
  }, 0);
  dom.addEventListener("blur", function (e) {
    this.parentElement.style.border = "";
  }, { once: true });
}

GeneralJs.escapeString = function (str, option = { number: false, hangul: false, queryString: false, noSpace: false, isPhone: false }) {
  if (option.number === undefined) { option.number = false; }
  if (option.hangul === undefined) { option.hangul = false; }
  if (option.queryString === undefined) { option.queryString = false; }
  if (option.noSpace === undefined) { option.noSpace = false; }
  if (option.isPhone === undefined) { option.isPhone = false; }

  const { number: numberOnly, hangul: hangulOnly, queryString, noSpace, isPhone } = option;

  str = str.replace(/[\*\^\:\&\<\>\;\=\#\$\[\]\\\|\(\)\`\'\"\{\}]/g, '');
  if (numberOnly) {
    str = str.replace(/[^0-9]/g, '');
  }
  if (hangulOnly) {
    str = str.replace(/[a-zA-Z]/g, '');
    str = str.replace(/[ㄱ-ㅎㅏ-ㅣ]/g, '');
    str = str.replace(/[0-9]/g, '');
  }
  if (noSpace) {
    str = str.replace(/ /g, '');
    str = str.replace(/\n/g, '');
    str = str.replace(/\t/g, '');
    str = str.trim();
  }
  if (isPhone) {
    str = GeneralJs.autoHypenPhone(str);
  }
  if (queryString) {
    str = encodeURIComponent(str);
  }

  return str;
}

GeneralJs.isClient = function (name, phone) {
  let n, p;

  if (typeof name === 'object') {
    if (Array.isArray(name)) {
      n = GeneralJs.escapeString(name[0], { hangul: true, noSpace: true });
      p = GeneralJs.escapeString(name[1], { isPhone: true });
    } else {
      throw new Error("invaild arguments");
    }
  } else if (typeof name === 'string') {
    n = GeneralJs.escapeString(name, { hangul: true, noSpace: true });
    p = GeneralJs.escapeString(phone, { isPhone: true });
  } else {
    throw new Error("invaild arguments");
  }

  return new Promise(function(resolve, reject) {
    GeneralJs.ajax("name=" + n + "&phone=" + p, "https://home-liaison.serveftp.com:3000/namephone", function (data) {
      if (data === "success") {
        resolve({ boo: true, name: n, phone: p });
      } else {
        resolve({ boo: false, name: n, phone: p });
      }
    });
  });

}

GeneralJs.toPhotoUpload = async function (name, phone) {
  try {
    const { boo, name: n, phone: p } = await GeneralJs.isClient(name, phone);
    if (boo) {
      window.location.href = window.location.protocol + "//" + window.location.host + "/consulting.php?name=" + GeneralJs.escapeString(n, { queryString: true }) + "&phone=" + GeneralJs.escapeString(p, { queryString: true });
    } else {
      alert("성함과 연락처를 정확히 입력해주세요!");
      window.location.href = window.location.protocol + "//" + window.location.host + "/consulting.php?login=true";
    }
  } catch (e) {
    console.log(e);
  }
}

GeneralJs.addScrollXEvent = function (node, name = "") {
  const today = new Date();
  const todayConst = String(today.getFullYear()) + String(today.getMonth() + 1) + String(today.getDate());

  if (name === "") {
    name = node.nodeName + "_" + String(today.getTime() + Math.round(Math.random() * 1000));
  }
  const keyName = name + "_" + todayConst;
  const variablesName = {
    isDown: "isDown" + '_' + keyName,
    startX: "startX" + '_' + keyName,
    scrollLeft: "scrollLeft" + '_' + keyName,
    mouseDown: "mouseDown" + '_' + keyName,
    mouseLeave: "mouseLeave" + '_' + keyName,
    mouseUp: "mouseUp" + '_' + keyName,
    mouseMove: "mouseMove" + '_' + keyName,
    events: [
      { target: "mousedown", name: "mouseDown" + '_' + keyName, },
      { target: "mouseleave", name: "mouseLeave" + '_' + keyName, },
      { target: "mouseup", name: "mouseUp" + '_' + keyName, },
      { target: "mousemove", name: "mouseMove" + '_' + keyName, },
    ],
  };

  GeneralJs.stacks[variablesName.isDown] = false;
  GeneralJs.stacks[variablesName.startX] = 0;
  GeneralJs.stacks[variablesName.scrollLeft] = 0;

  GeneralJs.events[variablesName.mouseDown] = function (e) {
    GeneralJs.stacks[variablesName.isDown] = true;
    GeneralJs.stacks[variablesName.startX] = e.pageX - node.offsetLeft;
    GeneralJs.stacks[variablesName.scrollLeft] = node.scrollLeft;
    node.style.cursor = "grabbing";
  }

  GeneralJs.events[variablesName.mouseLeave] = function (e) {
    GeneralJs.stacks[variablesName.isDown] = false;
    node.style.cursor = "pointer";
  }

  GeneralJs.events[variablesName.mouseUp] = function (e) {
    GeneralJs.stacks[variablesName.isDown] = false;
    node.style.cursor = "pointer";
  }

  GeneralJs.events[variablesName.mouseMove] = function (e) {
    let x, walk;
    if (!GeneralJs.stacks[variablesName.isDown]) {
      return;
    }
    e.preventDefault();
    x = e.pageX - node.offsetLeft;
    walk = x - GeneralJs.stacks[variablesName.startX];
    node.scrollLeft = GeneralJs.stacks[variablesName.scrollLeft] - walk;
    node.style.cursor = "grabbing";
  }

  node.addEventListener("mousedown", GeneralJs.events[variablesName.mouseDown]);
  node.addEventListener("mouseleave", GeneralJs.events[variablesName.mouseLeave]);
  node.addEventListener("mouseup", GeneralJs.events[variablesName.mouseUp]);
  node.addEventListener("mousemove", GeneralJs.events[variablesName.mouseMove]);

  return variablesName;
}

GeneralJs.getDateMatrix = function (year, month) {
  let tempObj, tempArr, tempArr2, tempArr3;

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

  const getLastDate = function (year, month) {
    const today = new Date(year, month, 1);
    let newMonth, lastDate;
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

  const firstDate = 1;
  const firstDay = (new Date(year, month, 1)).getDay();
  const lastDate = getLastDate(year, month);

  const DateMatrix = function (year, month) {
    this.year = year;
    this.month = month;
    this.matrix = null;
  }

  DateMatrix.prototype.getYearString = function () {
    return String(this.year) + "년";
  }

  DateMatrix.prototype.getMonthString = function () {
    return String(this.month + 1) + "월";
  }

  DateMatrix.prototype.getMatrix = function () {
    return this.matrix;
  }

  DateMatrix.prototype.getNormalMatrix = function () {
    let justTong, justArr;
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

  DateMatrix.prototype.getDateArr = function () {
    let justTong;
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

  DateMatrix.prototype.nextMatrix = function () {
    if (this.month === 11) {
      return GeneralJs.getDateMatrix(this.year + 1, 0);
    } else {
      return GeneralJs.getDateMatrix(this.year, this.month + 1);
    }
  }

  DateMatrix.prototype.previousMatrix = function () {
    if (this.month === 0) {
      return GeneralJs.getDateMatrix(this.year - 1, 11);
    } else {
      return GeneralJs.getDateMatrix(this.year, this.month - 1);
    }
  }

  DateMatrix.prototype.yearMatrix = function () {
    let arr = [];
    for (let i = 0; i < 12; i++) {
      arr.push(GeneralJs.getDateMatrix(this.year, i));
    }
    return arr;
  }

  DateMatrix.prototype.nextYearMatrix = function () {
    let arr = [];
    for (let i = 0; i < 12; i++) {
      arr.push(GeneralJs.getDateMatrix(this.year + 1, i));
    }
    return arr;
  }

  DateMatrix.prototype.previousYearMatrix = function () {
    let arr = [];
    for (let i = 0; i < 12; i++) {
      arr.push(GeneralJs.getDateMatrix(this.year - 1, i));
    }
    return arr;
  }

  DateMatrix.prototype.rangeMatrix = function (range = 3) {
    let arr = [];
    let tempMatrix;

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

  DateMatrix.prototype.returnSundayMatrix = function () {
    let arr, boo;
    let tempArr;
    let tong;
    let length;

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

  DateMatrix.prototype.sundayConvert = function () {
    const newObj = new DateMatrix(this.year, this.month);
    newObj.matrix = this.returnSundayMatrix();
    return newObj;
  }

  const DateFactor = function (year, month, date, index) {
    this.year = year;
    this.month = month;
    this.date = date;
    this.day = ([ '월', '화', '수', '목', '금', '토', '일' ])[index];
    this.dateObject = new Date(year, month, date);
    this.dayday = this.dateObject.getDay()
  }

  DateFactor.prototype.getDateString = function () {
    const zeroAddition = function (num) {
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

  let tempDate, arr;
  let tong;
  let pastLength;
  let result;
  let num;

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

GeneralJs.colorCalendar = function (mother, children, option = {}) {
  if (mother === null || typeof mother !== "object") {
    throw new Error("mother must be dom");
  }
  if (!Array.isArray(children)) {
    throw new Error("invaild input children");
  }
  if (children.length === 0) {
    throw new Error("invaild children");
  }
  if (!children.every((obj) => { return typeof obj === "object" && obj.contents !== undefined && obj.date !== undefined; })) {
    throw new Error("children model => { contents: { color: String, description: String, title: String }, date: { start: Date, end: Date } }");
  }
  const today = new Date();
  const zeroAddition = (num) => { return num < 10 ? `0${String(num)}` : String(num) }
  const dateToNumber = (date) => { return (date.getFullYear() * 100000) + ((date.getMonth() + 1) * 100) + date.getDate() }
  let ea;
  let childrenCopied;
  let sevenDeleteIndex;
  let sevenDeleteBooArr;
  let blockInsert;
  let dateMatrix;
  let bigCalendar;
  let bigCalendarTitleZone;
  let bigCalendarContentsZone;
  let firstDate;
  let calendarVisualLeft;
  let bigCalendarTitleBottom;
  let bigCalendarTitleSize;
  let bigCalendarTitleWeight;
  let arrowWidth, arrowTop;
  let weekBlockHeight, weekBlockSize, weekBlockWeight, weekBlockTextTop;
  let dateBlockHeight;
  let dateBlockPaddingTop;
  let dateBlockPaddingBottom;
  let dateBlockWeight;
  let datePositionTop;
  let datePositionLeft;
  let barMotherHeight;
  let colorSqureTop;
  let colorSqureHeight;
  let colorSqureIndent;
  let colorSqureWordingSize;
  let colorSqureWordingTop;
  let colorSqureWordingLeft;
  let colorSqureWordingWeight;
  let calendarTitleTop;
  let calendarTitleSize;
  let calendarTitlePaddingTop;
  let calendarTitlePaddingBottom;
  let calendarTitlePaddingLeft;
  let calendarTitlePaddingRight;

  if (option.heightMode !== true) {
    if (window.innerWidth > 1450) {
      ea = "px";
      calendarVisualLeft = 1;
      bigCalendarTitleBottom = 22;
      bigCalendarTitleSize = 36;
      bigCalendarTitleWeight = 300;
      weekBlockHeight = 48;
      weekBlockSize = 15;
      weekBlockWeight = 600;
      weekBlockTextTop = (GeneralJs.isMac() ? -2 : -1);
      arrowWidth = 12;
      arrowTop = 22;
      dateBlockHeight = 120;
      dateBlockPaddingTop = 40;
      dateBlockPaddingBottom = 20;
      dateBlockWeight = 300;
      datePositionTop = 10;
      datePositionLeft = 18;
      barMotherHeight = 25;
      colorSqureTop = 4;
      colorSqureHeight = 20;
      colorSqureIndent = 25;
      colorSqureWordingSize = 11;
      colorSqureWordingTop = (GeneralJs.isMac() ? 2 : 3);
      colorSqureWordingLeft = 7;
      colorSqureWordingWeight = 800;
      calendarTitleTop = -32;
      calendarTitleSize = 13;
      calendarTitlePaddingTop = (GeneralJs.isMac() ? 5 : 7);
      calendarTitlePaddingBottom = 6;
      calendarTitlePaddingLeft = 12;
      calendarTitlePaddingRight = 12;
    } else if (window.innerWidth <= 1450 && window.innerWidth > 1100) {
      ea = "px";
      calendarVisualLeft = 1;
      bigCalendarTitleBottom = 20;
      bigCalendarTitleSize = 34;
      bigCalendarTitleWeight = 300;
      weekBlockHeight = 48;
      weekBlockSize = 15;
      weekBlockWeight = 600;
      weekBlockTextTop = (GeneralJs.isMac() ? -2 : -1);
      arrowWidth = 12;
      arrowTop = 22;
      dateBlockHeight = 120;
      dateBlockPaddingTop = 40;
      dateBlockPaddingBottom = 20;
      dateBlockWeight = 300;
      datePositionTop = 10;
      datePositionLeft = 18;
      barMotherHeight = 25;
      colorSqureTop = 4;
      colorSqureHeight = 20;
      colorSqureIndent = 25;
      colorSqureWordingSize = 11;
      colorSqureWordingTop = (GeneralJs.isMac() ? 2 : 3);
      colorSqureWordingLeft = 7;
      colorSqureWordingWeight = 800;
      calendarTitleTop = -32;
      calendarTitleSize = 13;
      calendarTitlePaddingTop = (GeneralJs.isMac() ? 5 : 7);
      calendarTitlePaddingBottom = 6;
      calendarTitlePaddingLeft = 12;
      calendarTitlePaddingRight = 12;
    } else if (window.innerWidth <= 1100 && window.innerWidth > 900) {
      ea = "px";
      calendarVisualLeft = 1;
      bigCalendarTitleBottom = 18;
      bigCalendarTitleSize = 32;
      bigCalendarTitleWeight = 300;
      weekBlockHeight = 48;
      weekBlockSize = 15;
      weekBlockWeight = 600;
      weekBlockTextTop = (GeneralJs.isMac() ? -2 : -1);
      arrowWidth = 12;
      arrowTop = 18;
      dateBlockHeight = 120;
      dateBlockPaddingTop = 40;
      dateBlockPaddingBottom = 20;
      dateBlockWeight = 300;
      datePositionTop = 10;
      datePositionLeft = 18;
      barMotherHeight = 25;
      colorSqureTop = 4;
      colorSqureHeight = 20;
      colorSqureIndent = 25;
      colorSqureWordingSize = 11;
      colorSqureWordingTop = (GeneralJs.isMac() ? 2 : 3);
      colorSqureWordingLeft = 7;
      colorSqureWordingWeight = 800;
      calendarTitleTop = -32;
      calendarTitleSize = 12;
      calendarTitlePaddingTop = (GeneralJs.isMac() ? 5 : 7);
      calendarTitlePaddingBottom = 6;
      calendarTitlePaddingLeft = 12;
      calendarTitlePaddingRight = 12;
    } else if (window.innerWidth <= 900 && window.innerWidth > 760) {
      ea = "px";
      calendarVisualLeft = 1;
      bigCalendarTitleBottom = 16;
      bigCalendarTitleSize = 30;
      bigCalendarTitleWeight = 300;
      weekBlockHeight = 48;
      weekBlockSize = 15;
      weekBlockWeight = 600;
      weekBlockTextTop = (GeneralJs.isMac() ? -2 : -1);
      arrowWidth = 12;
      arrowTop = 18;
      dateBlockHeight = 120;
      dateBlockPaddingTop = 40;
      dateBlockPaddingBottom = 20;
      dateBlockWeight = 300;
      datePositionTop = 10;
      datePositionLeft = 18;
      barMotherHeight = 21;
      colorSqureTop = 4;
      colorSqureHeight = 18;
      colorSqureIndent = 25;
      colorSqureWordingSize = 9;
      colorSqureWordingTop = (GeneralJs.isMac() ? 1 : 2);
      colorSqureWordingLeft = 6;
      colorSqureWordingWeight = 800;
      calendarTitleTop = -32;
      calendarTitleSize = 11;
      calendarTitlePaddingTop = (GeneralJs.isMac() ? 5 : 7);
      calendarTitlePaddingBottom = 6;
      calendarTitlePaddingLeft = 12;
      calendarTitlePaddingRight = 12;
    } else if (window.innerWidth <= 760) {
      ea = "vw";
      calendarVisualLeft = 1;
      bigCalendarTitleBottom = 3;
      bigCalendarTitleSize = 5;
      bigCalendarTitleWeight = 300;
      weekBlockHeight = 8;
      weekBlockSize = 2.8;
      weekBlockWeight = 600;
      weekBlockTextTop = 0;
      arrowWidth = 2;
      arrowTop = 2.4;
      dateBlockHeight = 12;
      dateBlockPaddingTop = 5.5;
      dateBlockPaddingBottom = 1.5;
      dateBlockWeight = 300;
      datePositionTop = 1;
      datePositionLeft = 1;
      barMotherHeight = 5;
      colorSqureTop = 0.25;
      colorSqureHeight = 3.5;
      colorSqureIndent = 20;
      colorSqureWordingSize = 2.1;
      colorSqureWordingTop = 0;
      colorSqureWordingLeft = 1.4;
      colorSqureWordingWeight = 800;
      calendarTitleTop = -3.2;
      calendarTitleSize = 3;
      calendarTitlePaddingTop = 1;
      calendarTitlePaddingBottom = 6;
      calendarTitlePaddingLeft = 1.2;
      calendarTitlePaddingRight = 1.2;
    }
  } else {
    if (typeof option.height !== "number") {
      throw new Error("in height mode, must be standard height");
    }
    ea = "px";
    calendarVisualLeft = Math.floor(0.1 * (0.01 * option.height));
    bigCalendarTitleBottom = Math.floor(2.8 * (0.01 * option.height));
    bigCalendarTitleSize = Math.floor(4.7 * (0.01 * option.height));
    bigCalendarTitleWeight = 300;
    weekBlockHeight = Math.floor(7 * (0.01 * option.height));
    weekBlockSize = Math.floor(2.5 * (0.01 * option.height));
    weekBlockWeight = 600;
    weekBlockTextTop = Math.floor((GeneralJs.isMac() ? -0.1 : 0) * (0.01 * option.height));
    arrowWidth = Math.floor(1.7 * (0.01 * option.height));
    arrowTop = Math.floor(2.6 * (0.01 * option.height));
    dateBlockHeight = Math.floor(12 * (0.01 * option.height));
    dateBlockPaddingTop = Math.floor(6.6 * (0.01 * option.height));
    dateBlockPaddingBottom = Math.floor(4.5 * (0.01 * option.height));
    dateBlockWeight = 300;
    datePositionTop = Math.floor(1 * (0.01 * option.height));
    datePositionLeft = Math.floor(1.8 * (0.01 * option.height));
    barMotherHeight = Math.floor(4.3 * (0.01 * option.height));
    colorSqureTop = Math.floor(0.2 * (0.01 * option.height));
    colorSqureHeight = Math.floor(3.5 * (0.01 * option.height));
    colorSqureIndent = Math.floor(2.5 * (0.01 * option.height));
    colorSqureWordingSize = Math.floor(1.5 * (0.01 * option.height));
    colorSqureWordingTop = Math.floor(0.1 * (0.01 * option.height));
    colorSqureWordingLeft = Math.floor(1.1 * (0.01 * option.height));
    colorSqureWordingWeight = 800;
    calendarTitleTop = Math.floor(-3.2 * (0.01 * option.height));
    calendarTitleSize = Math.floor(1.5 * (0.01 * option.height));
    calendarTitlePaddingTop = Math.floor((GeneralJs.isMac() ? 0.5 : 0.7) * (0.01 * option.height));
    calendarTitlePaddingBottom = Math.floor(0.6 * (0.01 * option.height));
    calendarTitlePaddingLeft = Math.floor(1.2 * (0.01 * option.height));
    calendarTitlePaddingRight = Math.floor(1.2 * (0.01 * option.height));
  }

  GeneralJs.cleanChildren(mother);

  childrenCopied = GeneralJs.equalJson(JSON.stringify(children));
  childrenCopied.sort((a, b) => {
    return a.date.start.valueOf() - b.date.start.valueOf();
  });
  firstDate = childrenCopied[0].date.start;

  blockInsert = (dateMatrix, children, bigCalendarContentsZone) => {
    const weekWordings = [ '월', '화', '수', '목', '금', '토', '일' ];
    const calendarMethods = [
      "start",
      "end",
      "middle",
      "none",
      "startend",
      "blank"
    ];
    let scheduleTargets;
    let dateStart, dateEnd, wordingTitle, wordingDescription, barColor;
    let barMatrix, barMatrix_final;
    let dateBlocks;
    let tempArr, tempNumber;
    let block;
    let noneDeleteArr;
    let sevenArr;
    let sevenLength;
    let sevenDeleteIndex;
    let sevenDeleteBooArr;
    let barMother;

    GeneralJs.cleanChildren(bigCalendarContentsZone);

    scheduleTargets = [];
    for (let i = 0; i < children.length; i++) {
      ({ date: { start: dateStart, end: dateEnd }, contents: { title: wordingTitle, description: wordingDescription, color: barColor } } = children[i]);
      scheduleTargets.push({
        start: new Date(JSON.stringify(dateStart).slice(1, -1)),
        end: new Date(JSON.stringify(dateEnd).slice(1, -1)),
        title: wordingTitle,
        color: barColor,
      });
    }

    for (let i = 0; i < weekWordings.length; i++) {
      GeneralJs.createNode({
        mother: bigCalendarContentsZone,
        style: {
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "calc(100% / " + String(weekWordings.length) + ")",
          height: String(weekBlockHeight) + ea,
          background: GeneralJs.colorChip.gray1,
          boxSizing: "border-box",
          borderRight: i !== weekWordings.length - 1 ? "1px solid " + GeneralJs.colorChip.gray3 : "",
          borderBottom: "1px solid " + GeneralJs.colorChip.gray3,
        },
        children: [
          {
            text: weekWordings[i],
            style: {
              fontSize: String(weekBlockSize) + ea,
              fontWeight: String(weekBlockWeight),
              color: i < 5 ? GeneralJs.colorChip.black : GeneralJs.colorChip.red,
              position: "relative",
              top: String(weekBlockTextTop) + ea,
            }
          }
        ]
      });
    }

    barMatrix = [];
    dateBlocks = [];
    for (let i = 0; i < dateMatrix.matrix.length; i++) {
      for (let j = 0; j < dateMatrix.matrix[i].length; j++) {

        tempArr = [];
        for (let k = 0; k < scheduleTargets.length; k++) {
          if (dateMatrix.matrix[i][j] === null) {
            tempArr.push(calendarMethods[3]);
          } else {
            tempNumber = dateToNumber(new Date(dateMatrix.year, dateMatrix.month, dateMatrix.matrix[i][j].date));
            if (dateToNumber(scheduleTargets[k].start) === tempNumber) {
              if (dateToNumber(scheduleTargets[k].end) === tempNumber) {
                tempArr.push(calendarMethods[4]);
              } else {
                tempArr.push(calendarMethods[0]);
              }
            } else if (dateToNumber(scheduleTargets[k].start) < tempNumber && tempNumber < dateToNumber(scheduleTargets[k].end)) {
              tempArr.push(calendarMethods[2]);
            } else if (dateToNumber(scheduleTargets[k].end) === tempNumber) {
              tempArr.push(calendarMethods[1]);
            } else {
              tempArr.push(calendarMethods[3]);
            }
          }
        }

        block = GeneralJs.createNode({
          mother: bigCalendarContentsZone,
          style: {
            display: "inline-block",
            position: "relative",
            width: "calc(100% / " + String(dateMatrix.matrix[i].length) + ")",
            paddingTop: String(dateBlockPaddingTop) + ea,
            paddingBottom: String(dateBlockPaddingBottom) + ea,
            background: dateMatrix.matrix[i][j] !== null ? GeneralJs.colorChip.white : GeneralJs.colorChip.gray0,
            boxSizing: "border-box",
            borderRight: j !== dateMatrix.matrix[i].length - 1 ? "1px solid " + GeneralJs.colorChip.gray3 : "",
            borderBottom: i !== dateMatrix.matrix.length - 1 ? "1px solid " + GeneralJs.colorChip.gray3 : "",
          },
          children: [
            {
              text: dateMatrix.matrix[i][j] !== null ? String(dateMatrix.matrix[i][j].date) : "",
              style: {
                fontSize: String(weekBlockSize) + ea,
                fontWeight: String(dateBlockWeight),
                fontFamily: "graphik",
                color: j < 5 ? GeneralJs.colorChip.black : GeneralJs.colorChip.red,
                position: "absolute",
                top: String(datePositionTop) + ea,
                left: String(datePositionLeft) + ea,
              }
            }
          ]
        });
        dateBlocks.push(block);

        if (barMatrix.length > 0) {
          for (let z = 0; z < barMatrix[barMatrix.length - 1].length; z++) {
            for (let k = 0; k < barMatrix[barMatrix.length - 1].length; k++) {
              if (tempArr[k] === calendarMethods[3] && (tempArr[k + 1] === calendarMethods[2] || tempArr[k + 1] === calendarMethods[1] || tempArr[k + 1] === calendarMethods[5])) {
                if (barMatrix[barMatrix.length - 1][k] !== calendarMethods[3] && barMatrix[barMatrix.length - 1][k] !== calendarMethods[4]) {
                  tempArr[k] = calendarMethods[5];
                }
              }
            }
          }
        }
        barMatrix.push(tempArr);

      }
    }

    noneDeleteArr = (new Array(scheduleTargets.length)).fill(0, 0);
    for (let arr of barMatrix) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== calendarMethods[3]) {
          noneDeleteArr[i] = noneDeleteArr[i] + 1;
        }
        arr[i] = arr[i] + "_" + scheduleTargets[i].color + "_" + scheduleTargets[i].title;
      }
    }

    barMatrix_final = [];
    for (let arr of barMatrix) {
      for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i] + "_" + String(noneDeleteArr[i]);
      }
      barMatrix_final.push(arr.filter((str) => { return Number(str.split("_")[str.split("_").length - 1]) !== 0 }));
    }

    for (let z = 0; z < (barMatrix_final.length / 7); z++) {
      sevenArr = [];
      for (let i = 0; i < 7; i++) {
        sevenArr.push(barMatrix_final[(7 * z) + i]);
      }

      sevenLength = sevenArr[0].length;
      sevenDeleteIndex = [];
      for (let j = 0; j < sevenLength; j++) {
        sevenDeleteBooArr = [];
        for (let k = 0; k < sevenArr.length; k++) {
          sevenDeleteBooArr.push((new RegExp("^" + calendarMethods[3] + '|' + calendarMethods[5], 'i')).test(sevenArr[k][j]));
        }
        if (sevenDeleteBooArr.every((l) => { return l; })) {
          sevenDeleteIndex.push(j);
        }
      }

      sevenDeleteIndex.sort((a, b) => { return b - a; });
      for (let index of sevenDeleteIndex) {
        for (let seven of sevenArr) {
          seven.splice(index, 1);
        }
      }
    }

    for (let i = 0; i < barMatrix_final.length; i++) {
      for (let j = 0; j < barMatrix_final[i].length; j++) {
        const [ method, color, title ] = barMatrix_final[i][j].split('_');
        barMother = GeneralJs.createNode({
          mother: dateBlocks[i],
          style: {
            position: "relative",
            display: "block",
            height: String(barMotherHeight) + ea,
            width: String(100) + '%',
          }
        });

        if (method === "start") {
          GeneralJs.createNode({
            mother: barMother,
            attribute: { title, color, method },
            event: {
              mouseenter: function (e) {
                e.stopPropagation();
                GeneralJs.createNode({
                  mode: "aside",
                  mother: this.parentElement,
                  text: title,
                  style: {
                    position: "absolute",
                    top: String(calendarTitleTop) + ea,
                    width: String(100) + '%',
                    textAlign: "center",
                    zIndex: String(1),
                  },
                  children: [
                    {
                      text: title,
                      style: {
                        display: "inline-block",
                        position: "relative",
                        fontSize: String(calendarTitleSize) + ea,
                        fontWeight: String(600),
                        paddingTop: String(calendarTitlePaddingTop) + ea,
                        paddingBottom: String(calendarTitlePaddingBottom) + ea,
                        paddingLeft: String(calendarTitlePaddingLeft) + ea,
                        paddingRight: String(calendarTitlePaddingRight) + ea,
                        background: GeneralJs.colorChip.white,
                        borderRadius: String(5) + "px",
                        boxShadow: "0px 3px 16px -9px " + GeneralJs.colorChip.darkShadow,
                        color,
                        zIndex: String(1),
                      }
                    }
                  ]
                })
              },
              mouseleave: function (e) {
                e.stopPropagation();
                const targets = [ ...this.parentElement.querySelectorAll("aside") ];
                for (let target of targets) {
                  this.parentElement.removeChild(target);
                }
              },
            },
            style: {
              position: "relative",
              top: String(colorSqureTop) + ea,
              height: String(colorSqureHeight) + ea,
              width: String(100 - colorSqureIndent) + '%',
              marginLeft: String(colorSqureIndent) + '%',
              background: color,
              borderTopLeftRadius: String(5) + "px",
              borderBottomLeftRadius: String(5) + "px",
              cursor: "pointer",
            },
            children: [
              {
                text: title,
                style: {
                  position: "absolute",
                  top: String(colorSqureWordingTop) + ea,
                  textAlign: "left",
                  left: String(colorSqureWordingLeft) + ea,
                  fontSize: String(colorSqureWordingSize) + ea,
                  fontWeight: String(colorSqureWordingWeight),
                  color: GeneralJs.colorChip.white,
                  width: String(200) + '%',
                  zIndex: String(1),
                }
              }
            ]
          });
        } else if (method === "end") {
          GeneralJs.createNode({
            mother: barMother,
            attribute: { title, color, method },
            event: {
              mouseenter: function (e) {
                e.stopPropagation();
                GeneralJs.createNode({
                  mode: "aside",
                  mother: this.parentElement,
                  text: title,
                  style: {
                    position: "absolute",
                    top: String(calendarTitleTop) + ea,
                    width: String(100) + '%',
                    textAlign: "center",
                    zIndex: String(1),
                  },
                  children: [
                    {
                      text: title,
                      style: {
                        display: "inline-block",
                        position: "relative",
                        fontSize: String(calendarTitleSize) + ea,
                        fontWeight: String(600),
                        paddingTop: String(calendarTitlePaddingTop) + ea,
                        paddingBottom: String(calendarTitlePaddingBottom) + ea,
                        paddingLeft: String(calendarTitlePaddingLeft) + ea,
                        paddingRight: String(calendarTitlePaddingRight) + ea,
                        background: GeneralJs.colorChip.white,
                        borderRadius: String(5) + "px",
                        boxShadow: "0px 3px 16px -9px " + GeneralJs.colorChip.darkShadow,
                        color,
                        zIndex: String(1),
                      }
                    }
                  ]
                })
              },
              mouseleave: function (e) {
                e.stopPropagation();
                const targets = [ ...this.parentElement.querySelectorAll("aside") ];
                for (let target of targets) {
                  this.parentElement.removeChild(target);
                }
              },
            },
            style: {
              position: "relative",
              top: String(colorSqureTop) + ea,
              height: String(colorSqureHeight) + ea,
              width: String(100 - colorSqureIndent) + '%',
              left: String(0) + ea,
              background: color,
              borderTopRightRadius: String(5) + "px",
              borderBottomRightRadius: String(5) + "px",
              cursor: "pointer",
            },
            children: [
              {
                text: title,
                style: {
                  position: "absolute",
                  top: String(colorSqureWordingTop) + ea,
                  right: String(colorSqureWordingLeft) + ea,
                  textAlign: "right",
                  fontSize: String(colorSqureWordingSize) + ea,
                  fontWeight: String(colorSqureWordingWeight),
                  color: GeneralJs.colorChip.white,
                  width: String(200) + '%',
                  zIndex: String(1),
                }
              }
            ]
          });
        } else if (method === "middle") {
          GeneralJs.createNode({
            mother: barMother,
            attribute: { title, color, method },
            event: {
              mouseenter: function (e) {
                e.stopPropagation();
                GeneralJs.createNode({
                  mode: "aside",
                  mother: this.parentElement,
                  text: title,
                  style: {
                    position: "absolute",
                    top: String(calendarTitleTop) + ea,
                    width: String(100) + '%',
                    textAlign: "center",
                    zIndex: String(1),
                  },
                  children: [
                    {
                      text: title,
                      style: {
                        display: "inline-block",
                        position: "relative",
                        fontSize: String(calendarTitleSize) + ea,
                        fontWeight: String(600),
                        paddingTop: String(calendarTitlePaddingTop) + ea,
                        paddingBottom: String(calendarTitlePaddingBottom) + ea,
                        paddingLeft: String(calendarTitlePaddingLeft) + ea,
                        paddingRight: String(calendarTitlePaddingRight) + ea,
                        background: GeneralJs.colorChip.white,
                        borderRadius: String(5) + "px",
                        boxShadow: "0px 3px 16px -9px " + GeneralJs.colorChip.darkShadow,
                        color,
                        zIndex: String(1),
                      }
                    }
                  ]
                })
              },
              mouseleave: function (e) {
                e.stopPropagation();
                const targets = [ ...this.parentElement.querySelectorAll("aside") ];
                for (let target of targets) {
                  this.parentElement.removeChild(target);
                }
              },
            },
            style: {
              position: "absolute",
              top: String(colorSqureTop) + ea,
              height: String(colorSqureHeight) + ea,
              width: "calc(100% + " + String(1 * 2) + "px" + ")",
              left: String(-1) + "px",
              background: color,
              cursor: "pointer",
            }
          });
        } else if (method === "startend") {
          GeneralJs.createNode({
            mother: barMother,
            attribute: { title, color, method },
            event: {
              mouseenter: function (e) {
                e.stopPropagation();
                GeneralJs.createNode({
                  mode: "aside",
                  mother: this.parentElement,
                  text: title,
                  style: {
                    position: "absolute",
                    top: String(calendarTitleTop) + ea,
                    width: String(100) + '%',
                    textAlign: "center",
                    zIndex: String(1),
                  },
                  children: [
                    {
                      text: title,
                      style: {
                        display: "inline-block",
                        position: "relative",
                        fontSize: String(calendarTitleSize) + ea,
                        fontWeight: String(600),
                        paddingTop: String(calendarTitlePaddingTop) + ea,
                        paddingBottom: String(calendarTitlePaddingBottom) + ea,
                        paddingLeft: String(calendarTitlePaddingLeft) + ea,
                        paddingRight: String(calendarTitlePaddingRight) + ea,
                        background: GeneralJs.colorChip.white,
                        borderRadius: String(5) + "px",
                        boxShadow: "0px 3px 16px -9px " + GeneralJs.colorChip.darkShadow,
                        color,
                        zIndex: String(1),
                      }
                    }
                  ]
                })
              },
              mouseleave: function (e) {
                e.stopPropagation();
                const targets = [ ...this.parentElement.querySelectorAll("aside") ];
                for (let target of targets) {
                  this.parentElement.removeChild(target);
                }
              },
            },
            style: {
              position: "absolute",
              top: String(colorSqureTop) + ea,
              height: String(colorSqureHeight) + ea,
              width: String(100 - (colorSqureIndent * 2)) + '%',
              left: String(colorSqureIndent) + '%',
              background: color,
              borderRadius: String(5) + "px",
              cursor: "pointer",
            }
          });
        }
      }
    }

  }

  dateMatrix = GeneralJs.getDateMatrix(firstDate);
  bigCalendar = GeneralJs.createNode({
    mother,
    style: {
      display: "block",
      position: "relative",
      paddingLeft: String(calendarVisualLeft) + ea,
      paddingRight: String(calendarVisualLeft) + ea,
    }
  });
  bigCalendarTitleZone = GeneralJs.createNode({
    mother: bigCalendar,
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      marginBottom: String(bigCalendarTitleBottom) + ea,
    },
    children: [
      {
        text: GeneralJs.dateToString(firstDate).split('-').slice(0, 2).join(". "),
        style: {
          fontSize: String(bigCalendarTitleSize) + ea,
          fontWeight: String(bigCalendarTitleWeight),
          fontFamily: "graphik",
          color: GeneralJs.colorChip.black,
        }
      },
      {
        mode: "svg",
        class: [ "hoverDefault_lite" ],
        source: GeneralJs.prototype.returnArrow("left", GeneralJs.colorChip.green),
        event: {
          click: function (e) {
            dateMatrix = dateMatrix.previousMatrix();
            this.parentElement.firstChild.textContent = String(dateMatrix.year) + ". " + zeroAddition(dateMatrix.month + 1)
            blockInsert(dateMatrix, children, this.parentElement.nextElementSibling);
          }
        },
        style: {
          position: "absolute",
          top: String(arrowTop) + ea,
          left: String(0) + ea,
          width: String(arrowWidth) + ea,
        }
      },
      {
        mode: "svg",
        class: [ "hoverDefault_lite" ],
        source: GeneralJs.prototype.returnArrow("right", GeneralJs.colorChip.green),
        event: {
          click: function (e) {
            dateMatrix = dateMatrix.nextMatrix();
            this.parentElement.firstChild.textContent = String(dateMatrix.year) + ". " + zeroAddition(dateMatrix.month + 1)
            blockInsert(dateMatrix, children, this.parentElement.nextElementSibling);
          }
        },
        style: {
          position: "absolute",
          top: String(arrowTop) + ea,
          right: String(0) + ea,
          width: String(arrowWidth) + ea,
        }
      },
    ]
  });
  bigCalendarContentsZone = GeneralJs.createNode({
    mother: bigCalendar,
    style: {
      display: "block",
      position: "relative",
      border: "1px solid " + GeneralJs.colorChip.gray3,
      borderRadius: String(5) + "px",
      width: String(100) + '%',
      overflow: "hidden",
      boxSizing: "border-box",
    },
  });
  blockInsert(dateMatrix, children, bigCalendarContentsZone);
}

GeneralJs.sleep = function (time) {
  let timeoutId = null;
  return new Promise(function (resolve, reject) {
    timeoutId = setTimeout(function () {
      resolve('awake');
      clearTimeout(timeoutId);
      timeoutId = null;
    }, time);
  });
}

GeneralJs.downloadString = function (text, fileName, fileType = "plain") {
  if (/csv/gi.test(fileType)) {
    fileType = "text/csv"
  } else if (/csv/gi.test(fileType)) {
    fileType = "application/json"
  } else if (/csv/gi.test(fileType)) {
    fileType = "application/js"
  } else if (/svg/gi.test(fileType)) {
    fileType = "image/svg+xml"
  } else if (/xml/gi.test(fileType)) {
    fileType = "application/xml"
  } else if (/html/gi.test(fileType)) {
    fileType = "text/html"
  } else if (/pdf/gi.test(fileType)) {
    fileType = "application/pdf"
  } else {
    fileType = "text/plain"
  }

  let blob, a, timeoutId;

  blob = new Blob([ text ], { type: fileType });

  a = document.createElement('A');
  a.download = fileName;
  a.href = URL.createObjectURL(blob);
  a.dataset.downloadurl = [ fileType, a.download, a.href ].join(':');
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  timeoutId = setTimeout(function() {
    URL.revokeObjectURL(a.href);
    clearTimeout(timeoutId);
  }, 1500);
}

GeneralJs.blankHref = function (link, newWindow = false) {
  if (link === undefined) {
    throw new Error("must be link");
  }
  let a;
  if (/Electron/gi.test(window.navigator.userAgent)) {
    if (newWindow) {
      const { shell } = require("electron");
      shell.openExternal(link);
    } else {
      window.location.href = link;
    }
  } else {
    a = document.createElement("A");
    a.style.display = "none";
    a.href = link;
    a.setAttribute("target", "_blank");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}

GeneralJs.selfHref = function (link) {
  if (link === undefined) {
    throw new Error("must be link");
  }
  window.location.href = link;
}

GeneralJs.styleInjection = function (dom, styleObj) {
  if (dom === undefined || styleObj === undefined) {
    throw new Error("arguments must be dom, style object");
  }
  if (typeof styleObj !== "object") {
    throw new Error("style object type must be object");
  }
  for (let i in styleObj) {
    dom.style[i] = styleObj[i];
  }
}

GeneralJs.cssInjection = function (cssString) {
  if (typeof cssString !== "string") {
    throw new Error("invaild argument");
  }
  const style = document.querySelector("style");
  style.insertAdjacentHTML("beforeend", cssString);
}

GeneralJs.uniqueValue = function (type = "number") {
  if (type === "number") {
    return Number(String((new Date()).valueOf()) + String(Math.round(Math.random() * 10000)));
  } else if (type === "string") {
    return String((new Date()).valueOf()) + String(Math.round(Math.random() * 10000));
  } else if (type === "hex") {
    const x = 16;
    const length = 11;
    const uniqueNumber = (new Date()).valueOf();
    const hexChars = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F' ];
    const randomKeyWords = [ 'A', 'B', 'C', 'D', 'E', 'F' ];
    let uniqueNumber_copied;
    let maxExponent;
    let cArr;
    let temp;
    let hexString;
    uniqueNumber_copied = uniqueNumber;
    maxExponent = 0;
    while (Math.pow(x, maxExponent) <= uniqueNumber) {
      maxExponent++;
    }
    cArr = [];
    for (let i = 0; i < maxExponent; i++) {
      temp = ((uniqueNumber_copied / Math.pow(x, i)) % x);
      cArr.push(temp);
      uniqueNumber_copied = uniqueNumber_copied - (temp * Math.pow(x, i));
    }
    hexString = cArr.map((index) => { return hexChars[index] }).join('');
    for (let i = 0; i < length; i++) {
      hexString += hexChars[Math.floor(hexChars.length * Math.random())];
    }
    return randomKeyWords[Math.floor(randomKeyWords.length * Math.random())] + randomKeyWords[Math.floor(randomKeyWords.length * Math.random())] + hexChars[Math.floor(hexChars.length * Math.random())] + randomKeyWords[Math.floor(randomKeyWords.length * Math.random())] + String(uniqueNumber) + 'A' + hexString;
  } else {
    return String((new Date()).valueOf()) + String(Math.round(Math.random() * 10000));
  }
}

GeneralJs.cleanChildren = function (dom) {
  if (typeof dom !== "object") {
    throw new Error("argument must be dom");
  }
  if (Array.isArray(dom)) {
    for (let d of dom) {
      while (d.firstChild !== null && d.firstChild !== undefined) {
        d.removeChild(d.lastChild);
      }
    }
  } else {
    while (dom.firstChild !== null && dom.firstChild !== undefined) {
      dom.removeChild(dom.lastChild);
    }
  }
}

GeneralJs.protoPatch = async function (instance, modulePath, protoName = null) {
  try {
    const className = instance.constructor.name;
    let appendScript, protoFunc;
    if (typeof modulePath === "string") {
      appendScript = await GeneralJs.requestPromise(modulePath);
    } else if (Array.isArray(modulePath)) {
      appendScript = '';
      for (let script of modulePath) {
        if (typeof script !== "string") {
          throw new Error("invaild input");
        }
        appendScript += await GeneralJs.requestPromise(script);
        appendScript += "\n\n";
      }
    } else {
      throw new Error("invaild input");
    }
    if (protoName === null || protoName === undefined) {
      protoFunc = new Function(className, appendScript);
    } else if (typeof protoName === "string") {
      protoFunc = new Function(protoName, appendScript);
    } else {
      throw new Error("invaild input");
    }
    protoFunc(instance.constructor);
  } catch (e) {
    console.log(e);
  }
}

GeneralJs.equalJson = function (jsonString) {
  const equal = function (jsonString) {
    if (typeof jsonString === "object") {
      jsonString = JSON.stringify(jsonString);
    }
    if (typeof jsonString !== "string") {
      jsonString = String(jsonString);
    }
    let filtered;
    filtered = jsonString.replace(/(\"[0-9]+\-[0-9]+\-[0-9]+T[0-9]+\:[0-9]+\:[^Z]+Z\")/g, function (match, p1, offset, string) { return "new Date(" + p1 + ")"; });
    filtered = filtered.replace(/nbsp\;/g, "&nbsp;");
    const tempFunc = new Function("const obj = " + filtered + "; return obj;");
    const json = tempFunc();
    let temp, boo;
    if (typeof json === "object") {
      for (let i in json) {
        if (typeof json[i] === "string") {
          if (/^[\{\[]/.test(json[i].trim()) && /[\}\]]$/.test(json[i].trim())) {
            try {
              temp = JSON.parse(json[i]);
              boo = true;
            } catch (e) {
              boo = false;
            }
            if (boo) {
              json[i] = equal(json[i]);
            }
          }
        }
      }
      return json;
    } else {
      return jsonString;
    }
  }
  return equal(jsonString);
}

GeneralJs.copyJson = function (obj) {
  return GeneralJs.equalJson(JSON.stringify(obj));
}

GeneralJs.hexaJson = async function (input, middleMode = false) {
  const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
  const tokenStart = "__hexaFunctionStart__<<<";
  const tokenEnd = ">>>__hexaFunctionEnd__";
  const hexaFunction = async function (input) {
    try {
      const crypto = require("crypto");
      const password = "homeliaison";
      const algorithm = "aes-192-cbc";
      const iv = Buffer.alloc(16, 0);
      const digest = "hex";
      const toHex = (string) => {
        return new Promise((resolve, reject) => {
          crypto.scrypt(password, "salt", 24, (err, key) => {
            if (err) {
              reject(err);
            } else {
              const cipher = crypto.createCipheriv(algorithm, key, iv);
              let encrypted = '';
              cipher.setEncoding(digest);
              cipher.on("data", (chunk) => { encrypted += chunk; });
              cipher.on("end", () => { resolve(encrypted); });
              cipher.write(string);
              cipher.end();
            }
          });
        });
      }
      const toFunction = (hash) => {
        return new Promise((resolve, reject) => {
          crypto.scrypt(password, "salt", 24, (err, key) => {
            if (err) {
              reject(err);
            } else {
              const decipher = crypto.createDecipheriv(algorithm, key, iv);
              let decrypted = '';
              decipher.on("readable", () => {
                let chunk;
                chunk = decipher.read();
                while (chunk !== null) {
                  decrypted += chunk.toString("utf8");
                  chunk = decipher.read();
                }
              });
              decipher.on("end", () => { resolve(decrypted); });
              decipher.write(hash, digest);
              decipher.end();
            }
          });
        });
      }
      let functionString, functionString_copied;
      let argString;
      let argArr;
      let decodeFunction;
      let asyncBoo;

      if (typeof input === "function") {

        return tokenStart + (await toHex(input.toString())) + tokenEnd;

      } else if (typeof input === "string") {

        if ((new RegExp('^' + tokenStart)).test(input) && (new RegExp(tokenEnd + '$')).test(input)) {
          input = input.replace(new RegExp('^' + tokenStart), '').replace(new RegExp(tokenEnd + '$'), '');
          functionString = await toFunction(input);
          functionString_copied = String(functionString).trim();
          argString = '';
          asyncBoo = /^async/.test(functionString_copied);
          if (/^(async function|function)/i.test(functionString_copied)) {
            functionString_copied.replace(/^(async function|function) [^\(]*\(([^\)]*)\)[ ]*\{/, (match, p1, p2) => {
              argString = p2.trim();
              return '';
            });
          } else {
            functionString_copied.replace(/^(async \(|\()([^\)]*)\)[ ]*\=\>[ ]*\{/, (match, p1, p2) => {
              argString = p2.trim();
              return '';
            });
          }
          argString = argString.replace(/[ ]*\=[ ]*[\{\[][^\=]*[\}\]]/gi, '');
          argString = argString.replace(/[ ]*\=[ ]*[^,]+/gi, '');
          argArr = argString.split(',').map((str) => { return str.trim(); });
          if (argArr.some((str) => { return / /gi.test(str); })) {
            throw new Error("invaild argument name");
          }
          if (asyncBoo) {
            decodeFunction = new AsyncFunction(...argArr, functionString.trim().replace(/^(async function [^\(]*\([^\)]*\)[ ]*\{|async \([^\)]*\)[ ]*\=\>[ ]*\{)/, '').replace(/\}$/, ''));
          } else {
            decodeFunction = new Function(...argArr, functionString.trim().replace(/^(function [^\(]*\([^\)]*\)[ ]*\{|\([^\)]*\)[ ]*\=\>[ ]*\{)/, '').replace(/\}$/, ''));
          }
          return decodeFunction;
        } else {
          return input;
        }

      } else {
        throw new Error("invaild input");
      }
    } catch (e) {
      console.log(e);
    }
  }
  const equalJson = function (jsonString) {
    const equal = function (jsonString) {
      if (typeof jsonString === "object") {
        jsonString = JSON.stringify(jsonString);
      }
      if (typeof jsonString !== "string") {
        jsonString = String(jsonString);
      }
      const filtered = jsonString.replace(/(\"[0-9]+\-[0-9]+\-[0-9]+T[0-9]+\:[0-9]+\:[^Z]+Z\")/g, function (match, p1, offset, string) { return "new Date(" + p1 + ")"; });
      const tempFunc = new Function("const obj = " + filtered + "; return obj;");
      const json = tempFunc();
      let temp, boo;
      if (typeof json === "object") {
        for (let i in json) {
          if (typeof json[i] === "string") {
            if (/^[\{\[]/.test(json[i].trim()) && /[\}\]]$/.test(json[i].trim())) {
              try {
                temp = JSON.parse(json[i]);
                boo = true;
              } catch (e) {
                boo = false;
              }
              if (boo) {
                json[i] = equal(json[i]);
              }
            }
          }
        }
        return json;
      } else {
        return jsonString;
      }
    }
    return equal(jsonString);
  }
  try {
    if (typeof input === "function") {
      return await hexaFunction(input);
    } else if (typeof input === "object") {
      if (input === null) {
        return null;
      } else {
        const toJson = async function (obj) {
          try {
            for (let i in obj) {
              if (typeof obj[i] === "function") {
                obj[i] = await hexaFunction(obj[i]);
              } else if (typeof obj[i] === "object" && obj[i] !== null) {
                obj[i] = await toJson(obj[i]);
              }
            }
            return obj;
          } catch (e) {
            return obj;
          }
        }
        if (!middleMode) {
          return JSON.stringify(await toJson(input));
        } else {
          return await toJson(input);
        }
      }
    } else if (typeof input === "string") {
      if ((new RegExp('^' + tokenStart)).test(input)) {
        return await hexaFunction(input);
      } else {
        const toObj = async function (obj) {
          try {
            for (let i in obj) {
              if (typeof obj[i] === "string" && (new RegExp('^' + tokenStart)).test(obj[i])) {
                obj[i] = await hexaFunction(obj[i]);
              } else if (typeof obj[i] === "object" && obj[i] !== null) {
                obj[i] = await toObj(obj[i]);
              }
            }
            return obj;
          } catch (e) {
            return obj;
          }
        }
        return await toObj(equalJson(input));
      }
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
}

GeneralJs.autoComma = function (str) {
  let minus;
  let count, countArr;
  let temp, tempArr;
  if (typeof str === "number") {
    str = String(Math.floor(str));
  }
  if (/e/gi.test(str)) {
    throw new Error("is too heavy");
  }
  minus = /\-/g.test(str) ? /\-/g.exec(str)[0] : '';
  str = str.replace(/[^0-9]/g, '');
  if (str === '') {
    throw new Error("invaild number : emptyString");
  }
  count = Math.ceil(str.length / 3);
  countArr = [];
  for (let i = 0; i < count; i++) {
    countArr.push([ 3 * i, 3 * (i + 1) ]);
  }
  if (countArr.length === 0) {
    throw new Error("invaild number");
  }
  tempArr = [];
  for (let arr of countArr) {
    temp = '';
    for (let i = arr[0]; i < arr[1]; i++) {
      if (str.length - 1 - i < 0) {
        temp += '';
      } else {
        temp = str[str.length - 1 - i] + temp;
      }
    }
    if (temp !== '') {
      tempArr.unshift(temp);
    }
  }
  return (minus + tempArr.join(','));
}

GeneralJs.dateToString = function (date, detail = false, dayOption = false) {
  const dayday = [ '일', '월', '화', '수', '목', '금', '토' ];
  if (!(date instanceof Date)) {
    console.log(date);
    throw new Error("invaild input");
  }
  if (detail === undefined || detail === null) {
    detail = false;
  }
  if (typeof detail !== "boolean") {
    throw new Error("second input must be boolean");
  }
  const zeroAddition = (num) => { return (num < 10) ? `0${String(num)}` : String(num); }
  const emptyDateValue = (new Date(1999, 0, 1)).valueOf();
  const futureDateValue = (new Date(3000, 0, 1)).valueOf();
  if (date.valueOf() <= emptyDateValue) {
    return "해당 없음";
  } else if (date.valueOf() >= futureDateValue) {
    return "예정";
  } else {
    if (!detail) {
      return `${String(date.getFullYear())}-${zeroAddition(date.getMonth() + 1)}-${zeroAddition(date.getDate())}`;
    } else {
      if (dayOption) {
        return `${String(date.getFullYear())}-${zeroAddition(date.getMonth() + 1)}-${zeroAddition(date.getDate())} ${zeroAddition(date.getHours())}:${zeroAddition(date.getMinutes())}:${zeroAddition(date.getSeconds())} ${dayday[date.getDay()]}요일`;
      } else {
        return `${String(date.getFullYear())}-${zeroAddition(date.getMonth() + 1)}-${zeroAddition(date.getDate())} ${zeroAddition(date.getHours())}:${zeroAddition(date.getMinutes())}:${zeroAddition(date.getSeconds())}`;
      }
    }
  }
}

GeneralJs.stringToDate = function (str) {
  if (str instanceof Date) {
    return str;
  }
  if (typeof str !== "string") {
    throw new Error("invaild input");
  }
  if (str.trim() === '' || str.trim() === '-' || /없음/gi.test(str)) {
    return (new Date(1800, 0, 1));
  }
  if (str === "예정" || str === "진행중" || str === "미정") {
    return (new Date(3800, 0, 1));
  }
  str = str.trim();
  if (/T/g.test(str) && /Z$/.test(str) && /^[0-9]/.test(str) && /\-/g.test(str) && /\:/g.test(str)) {
    if (!Number.isNaN((new Date(str)).getTime())) {
      return new Date(str);
    }
  }
  if (!/^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]$/.test(str) && !/^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9] [0-9][0-9]\:[0-9][0-9]\:[0-9][0-9]$/.test(str)) {
    throw new Error("not date string : " + str);
  }
  let tempArr, tempArr2, tempArr3;
  if (/^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]$/.test(str)) {
    tempArr = str.split('-');
    return (new Date(Number(tempArr[0]), Number(tempArr[1]) - 1, Number(tempArr[2])));
  } else {
    tempArr = str.split(' ');
    tempArr2 = tempArr[0].split('-');
    tempArr3 = tempArr[1].split(':');
    return (new Date(Number(tempArr2[0]), Number(tempArr2[1]) - 1, Number(tempArr2[2]), Number(tempArr3[0]), Number(tempArr3[1]), Number(tempArr3[2])));
  }
}

GeneralJs.serviceParsing = function (serviceObj, startDateMode = false) {
  const onoffString = [ "온라인", "오프라인" ];
  const serviceString = [ "홈퍼니싱", "홈스타일링", "토탈 스타일링", "엑스트라 스타일링" ];
  const startDateNumbers = [ 30, 45, 60, 60 ];
  const xValueString = [ "mini", "basic", "premium" ];

  if (typeof serviceObj === "object") {
    if (serviceObj.online === undefined || serviceObj.serid === undefined || serviceObj.xValue === undefined) {
      throw new Error("invaild service object");
    }
    let { online, serid, xValue } = serviceObj;
    let finalWords;
    let startDateNumber;

    if (online) {
      finalWords = onoffString[0] + " ";
    } else {
      finalWords = onoffString[1] + " ";
    }

    if (/_/gi.test(serid) && serid.split('_').length === 2) {
      serid = serid.split('_')[1];
      if (/aa01s/gi.test(serid)) {
        finalWords += serviceString[0] + " ";
        startDateNumber = startDateNumbers[0];
      } else if (/aa02s/gi.test(serid)) {
        finalWords += serviceString[1] + " ";
        startDateNumber = startDateNumbers[1];
      } else if (/aa03s/gi.test(serid)) {
        finalWords += serviceString[2] + " ";
        startDateNumber = startDateNumbers[2];
      } else if (/aa04s/gi.test(serid)) {
        finalWords += serviceString[3] + " ";
        startDateNumber = startDateNumbers[3];
      } else {
        throw new Error("invaild service object");
      }
    } else {
      if (/1/gi.test(serid)) {
        finalWords += serviceString[0] + " ";
        startDateNumber = startDateNumbers[0];
      } else if (/2/gi.test(serid)) {
        finalWords += serviceString[1] + " ";
        startDateNumber = startDateNumbers[1];
      } else if (/3/gi.test(serid)) {
        finalWords += serviceString[2] + " ";
        startDateNumber = startDateNumbers[2];
      } else if (/4/gi.test(serid)) {
        finalWords += serviceString[3] + " ";
        startDateNumber = startDateNumbers[3];
      } else {
        throw new Error("invaild service object");
      }
    }

    if (/M/gi.test(xValue)) {
      finalWords += xValueString[0];
    } else if (/B/gi.test(xValue)) {
      finalWords += xValueString[1];
    } else if (/P/gi.test(xValue)) {
      finalWords += xValueString[2];
    } else {
      throw new Error("invaild service object");
    }

    if (!startDateMode) {
      return finalWords;
    } else {
      return startDateNumber;
    }

  } else if (typeof serviceObj === "string") {
    let tempArr, serviceNumber;
    tempArr = serviceObj.split('_');
    serviceNumber = Number(tempArr[1].replace(/[a-z]/gi, '').replace(/^0/g, '').replace(/^0/g, '')) - 1;
    return serviceString[serviceNumber];
  } else {
    return {
      onoff: onoffString,
      name: serviceString,
      date: startDateNumbers,
      xValue: xValueString
    };
  }
}

GeneralJs.designerMthParsing = function (methods) {
  if (!Array.isArray(methods)) {
    throw new Error("invaild input");
  }
  const map = {
    mth0: "홈스타일링",
    mth1: "상공간 스타일링",
    mth2: "패브릭 스타일링",
    mth3: "가구 디자인",
    mth4: "원룸 스타일링",
    mth5: "온라인 스타일링",
    mth6: "마감재 스타일링",
    mth7: "토탈 스타일링",
    mth8: "-",
  };
  return methods.map((str) => {
    return map[str];
  });
}

GeneralJs.designerCareer = function (designer, wordingMode = false) {
  const today = new Date();
  let careerSubtract;
  careerSubtract = ((today.getFullYear() * 12) + (today.getMonth() + 1)) - ((designer.information.business.career.startY * 12) + designer.information.business.career.startM);
  if (wordingMode) {
    return `경력&nbsp;&nbsp;<b%|%b>&nbsp;&nbsp;${String(Math.floor(careerSubtract / 12))}년 ${String(careerSubtract % 12)}개월`;
  } else {
    return [ Math.floor(careerSubtract / 12), (careerSubtract % 12) ];
  }
}

GeneralJs.findByAttribute = function (dom, attributeName, attributeValue) {
  if (typeof dom !== "string" && typeof dom !== "object") {
    throw new Error("input must be => [ HTMLCollections or className, attribute name, attribute value ]");
  }
  if (typeof attributeName !== "string" && !Array.isArray(attributeName)) {
    throw new Error("input must be => [ HTMLCollections or className, attribute name, attribute value ]");
  }
  if (typeof attributeValue !== "string" && !Array.isArray(attributeValue)) {
    attributeValue = String(attributeValue);
  }
  if (Array.isArray(attributeName)) {
    if (!Array.isArray(attributeValue)) {
      throw new Error("if multiple attribute name, attribute value must be same array");
    }
    if (attributeName.length !== attributeValue.length) {
      throw new Error("if multiple attribute name, attribute value must be same array");
    }
    if (!attributeName.every((s) => { return typeof s === "string"; })) {
      throw new Error("invalid attribute name array");
    }
    if (!attributeValue.every((s) => { return typeof s === "string"; })) {
      attributeValue = attributeValue.map((i) => { return String(i); });
    }
  }
  if (typeof dom === "string") {
    if (!/^\./.test(dom)) {
      throw new Error("input must be => [ HTMLCollections or className, attribute name, attribute value ]");
    } else {
      dom = document.querySelectorAll(dom);
    }
  } else {
    if (dom[Symbol.iterator] === undefined) {
      dom = dom.children;
    }
  }
  let targets, resultDom;

  targets = [ ...dom ];

  if (Array.isArray(attributeName)) {
    for (let i = 0; i < attributeName.length; i++) {
      targets = targets.filter((d) => { return d.getAttribute(attributeName[i]) === attributeValue[i]; });
    }
    if (targets.length !== 0) {
      return targets[0];
    } else {
      return null;
    }
  } else {
    resultDom = targets.find((d) => { return d.getAttribute(attributeName) === attributeValue; });
    if (resultDom === undefined) {
      return null;
    } else {
      return resultDom;
    }
  }
}

GeneralJs.swipePatch = function (direction, callback = function () {}) {
  const stackConst = "swipeStack_";
  const xDown = "xDown";
  const yDown = "yDown";
  const xDiff = "xDiff";
  const yDiff = "yDiff";
  const timeDown = "timeDown";
  const startElement = "startElement";
  const handleTouchEnd = "handleTouchEnd";
  const handleTouchStart = "handleTouchStart";
  const handleTouchMove = "handleTouchMove";
  const getNearestAttribute = function (el, attributeName, defaultValue) {
    let attributeValue;
    while (el && el !== document.documentElement) {
      attributeValue = el.getAttribute(attributeName);
      if (attributeValue) {
        return attributeValue;
      }
      el = el.parentNode;
    }
    return defaultValue;
  }

  if (typeof direction === "string") {
    if (!([ "up", "down", "left", "right" ].includes(direction))) {
      throw new Error("must be direction: [ up, down, left, right ]");
    }
    if (typeof callback !== "function") {
      throw new Error("must be function input");
    }
    GeneralJs.stacks[stackConst + direction] = callback;
  } else if (typeof direction === "object") {
    for (let i in direction) {
      if (!([ "up", "down", "left", "right" ].includes(i))) {
        throw new Error("must be direction: [ up, down, left, right ]");
      }
      if (typeof direction[i] !== "function") {
        throw new Error("must be function input");
      }
      GeneralJs.stacks[stackConst + i] = direction[i];
    }
  } else {
    throw new Error("invaild input");
  }

  if (typeof GeneralJs.stacks[stackConst + handleTouchStart] === "function") {
    document.removeEventListener("touchstart", GeneralJs.stacks[stackConst + handleTouchStart]);
  }
  if (typeof GeneralJs.stacks[stackConst + handleTouchMove] === "function") {
    document.removeEventListener("touchmove", GeneralJs.stacks[stackConst + handleTouchMove]);
  }
  if (typeof GeneralJs.stacks[stackConst + handleTouchEnd] === "function") {
    document.removeEventListener("touchend", GeneralJs.stacks[stackConst + handleTouchEnd]);
  }

  GeneralJs.stacks[stackConst + xDown] = null;
  GeneralJs.stacks[stackConst + yDown] = null;
  GeneralJs.stacks[stackConst + xDiff] = null;
  GeneralJs.stacks[stackConst + yDiff] = null;
  GeneralJs.stacks[stackConst + timeDown] = null;
  GeneralJs.stacks[stackConst + startElement] = null;

  GeneralJs.stacks[stackConst + handleTouchStart] = function (e) {
    GeneralJs.stacks[stackConst + startElement] = e.target;
    GeneralJs.stacks[stackConst + timeDown] = Date.now();
    GeneralJs.stacks[stackConst + xDown] = e.touches[0].clientX;
    GeneralJs.stacks[stackConst + yDown] = e.touches[0].clientY;
    GeneralJs.stacks[stackConst + xDiff] = 0;
    GeneralJs.stacks[stackConst + yDiff] = 0;
  }
  GeneralJs.stacks[stackConst + handleTouchMove] = function (e) {
    if (!GeneralJs.stacks[stackConst + xDown] || !GeneralJs.stacks[stackConst + yDown]) {
      return;
    }
    GeneralJs.stacks[stackConst + xDiff] = GeneralJs.stacks[stackConst + xDown] - e.touches[0].clientX;
    GeneralJs.stacks[stackConst + yDiff] = GeneralJs.stacks[stackConst + yDown] - e.touches[0].clientY;
  }
  GeneralJs.stacks[stackConst + handleTouchEnd] = function (e) {
    if (GeneralJs.stacks[stackConst + startElement] !== e.target) {
      return;
    }
    const thresholdKey = "data-swipe-threshold";
    const timeoutKey = "data-swipe-timeout";
    const thresholdValue = 20;
    const timeoutValue = 500;
    let swipeThreshold, swipeTimeout;
    let timeDiff;
    let direction;
    let changedTouches;
    let eventData;

    swipeThreshold = parseInt(getNearestAttribute(GeneralJs.stacks[stackConst + startElement], thresholdKey, String(thresholdValue)), 10);
    swipeTimeout = parseInt(getNearestAttribute(GeneralJs.stacks[stackConst + startElement], timeoutKey, String(timeoutValue)), 10);

    timeDiff = Date.now() - GeneralJs.stacks[stackConst + timeDown];
    changedTouches = e.changedTouches || e.touches || [];

    direction = null;
    if (Math.abs(GeneralJs.stacks[stackConst + xDiff]) > Math.abs(GeneralJs.stacks[stackConst + yDiff])) {
      if (Math.abs(GeneralJs.stacks[stackConst + xDiff]) > swipeThreshold && timeDiff < swipeTimeout) {
        if (GeneralJs.stacks[stackConst + xDiff] > 0) {
          direction = "left";
        } else {
          direction = "right";
        }
      }
    } else if (Math.abs(GeneralJs.stacks[stackConst + yDiff]) > swipeThreshold && timeDiff < swipeTimeout) {
      if (GeneralJs.stacks[stackConst + yDiff] > 0) {
        direction = "up";
      } else {
        direction = "down";
      }
    }

    if (direction !== null) {
      eventData = {
        direction,
        start: [ parseInt(GeneralJs.stacks[stackConst + xDown], 10), parseInt(GeneralJs.stacks[stackConst + yDown], 10) ],
        end: [ parseInt((changedTouches[0] || {}).clientX || -1, 10), parseInt((changedTouches[0] || {}).clientY || -1, 10) ],
      };
      if (typeof GeneralJs.stacks[stackConst + direction] === "function") {
        (GeneralJs.stacks[stackConst + direction])(eventData);
      }
    }

    GeneralJs.stacks[stackConst + xDown] = null;
    GeneralJs.stacks[stackConst + yDown] = null;
    GeneralJs.stacks[stackConst + timeDown] = null;
  }

  document.addEventListener("touchstart", GeneralJs.stacks[stackConst + handleTouchStart], false);
  document.addEventListener("touchmove", GeneralJs.stacks[stackConst + handleTouchMove], false);
  document.addEventListener("touchend", GeneralJs.stacks[stackConst + handleTouchEnd], false);
}

GeneralJs.xyConverting = function (original) {
  if (!Array.isArray(original)) {
    throw new Error("input must be array");
  }
  if (original.length > 0) {
    if (!original.every((arr) => { return Array.isArray(arr); })) {
      throw new Error("input must be matrix");
    }
  }
  let converted, tempArr;

  converted = [];
  if (original.length > 0) {
    for (let i = 0; i < original[0].length; i++) {
      tempArr = [];
      for (let arr of original) {
        tempArr.push(arr[i]);
      }
      converted.push(tempArr);
    }
  }

  return converted;
}

GeneralJs.appendQuery = function (obj) {
  if (typeof obj !== "object") {
    throw new Error("invaild input");
  }
  if (obj === null) {
    throw new Error("invaild input(null)");
  }
  if (!Object.values(obj).every((str) => { return typeof str === "string" })) {
    throw new Error("invaild object factor, must be string");
  }
  let now;
  let title;
  let original;

  now = new Date();
  title = String(now.valueOf()) + String(Math.round(Math.random() * 10000));
  original = window.location.href;

  if (/\?/gi.test(original)) {
    if (/\=/gi.test(original)) {
      if (!/\&$/gi.test(original)) {
        original += '&';
      }
    }
  } else {
    original += '?';
  }

  for (let key in obj) {
    original += key;
    original += '=';
    original += String(obj[key]);
    original += '&';
  }

  if (/\&$/gi.test(original)) {
    original = original.slice(0, -1);
  }

  window.history.replaceState({}, title, original);
}

GeneralJs.removeQuery = function (key) {
  if (typeof key !== "string") {
    throw new Error("invaild input");
  }
  let now;
  let title;
  let original;
  let obj;
  let newUrl;

  now = new Date();
  title = String(now.valueOf()) + String(Math.round(Math.random() * 10000));
  original = window.location.search;
  newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + "?";

  if (/\?/gi.test(original)) {

    obj = {};
    original.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function (origin, name, value) {
      let decode = function (str) { return decodeURIComponent(str.split("+").join(" ")); }
      obj[decode(name)] = decode(value);
    });

    for (let str in obj) {
      if (str !== key) {
        newUrl += str;
        newUrl += '=';
        newUrl += String(obj[str]);
        newUrl += '&';
      }
    }

    if (/\&$/gi.test(newUrl)) {
      newUrl = newUrl.slice(0, -1);
    }

    window.history.replaceState({}, title, newUrl);

  }
}

GeneralJs.hasQuery = function (key) {
  if (typeof key !== "string") {
    throw new Error("invaild input");
  }
  let original;
  let obj;
  let keys;

  original = window.location.search;

  if (original === '') {
    return false;
  } else {

    original = original.slice(1);

    obj = {};
    original.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function (origin, name, value) {
      let decode = function (str) { return decodeURIComponent(str.split("+").join(" ")); }
      obj[decode(name)] = decode(value);
    });

    keys = Object.keys(obj);

    return keys.includes(key);
  }
}

GeneralJs.alert = function (message) {
  window.alert(message);
}

GeneralJs.confirm = function (message) {
  return window.confirm(message);
}

GeneralJs.prompt = function (message) {
  const { createNode, colorChip, withOut } = GeneralJs;
  const ea = "px";
  let whiteTongBase;
  let whiteTong;
  let whiteWidth, whiteHeight;
  let paddingTop, paddingLeft;
  let paddingBottom;
  let size0, size1;
  let marginLeft;
  let bottomVisual;
  let inputBoxHeight;
  let input;
  let inputIndent;
  let inputBottomVisual;
  let greenBarHeight;
  let lineHeight;
  let wordingVisual;

  whiteWidth = 320;
  whiteHeight = 150;
  paddingTop = 16;
  paddingLeft = 23;
  paddingBottom = 62;
  size0 = 14;
  size1 = 15;
  marginLeft = 18;
  bottomVisual = 7;
  inputBoxHeight = 30;
  inputIndent = 9;
  inputBottomVisual = 0;
  lineHeight = 1.5;
  wordingVisual = GeneralJs.isMac() ? 0 : 2;

  greenBarHeight = document.getElementById("greenBar") !== null ? Number(document.getElementById("greenBar").style.height.replace(/[^0-9\.\-]/gi, '')) : 0;
  if (Number.isNaN(greenBarHeight)) {
    greenBarHeight = 0;
  }

  whiteTongBase = createNode({
    mode: "aside",
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
    style: {
      display: "block",
      position: "relative",
      width: String(whiteWidth - (paddingLeft * 2)) + ea,
      paddingTop: String(paddingTop) + ea,
      paddingBottom: String(paddingBottom) + ea,
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
    text: "Q",
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
    text: message,
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

  createNode({
    mother: whiteTong,
    style: {
      position: "absolute",
      bottom: String(paddingTop + bottomVisual) + ea,
      left: String(paddingLeft + marginLeft) + ea,
      width: withOut((paddingLeft * 2) + marginLeft, ea),
      height: String(inputBoxHeight) + ea,
      borderRadius: String(5) + "px",
      background: colorChip.gray1,
    }
  });

  input = createNode({
    mother: whiteTong,
    mode: "input",
    attribute: {
      type: "text",
    },
    style: {
      position: "absolute",
      bottom: String(paddingTop + bottomVisual + inputBottomVisual) + ea,
      left: String(paddingLeft + marginLeft + inputIndent) + ea,
      width: withOut((paddingLeft * 2) + marginLeft + (inputIndent * 2), ea),
      height: String(inputBoxHeight) + ea,
      background: "transparent",
      fontSize: String(13) + ea,
      fontWeight: String(400),
      color: colorChip.black,
      border: String(0),
      outline: String(0),
    }
  });

  input.focus();

  return new Promise((resolve, reject) => {
    input.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        const finalValue = this.value.trim();
        const topLevelTargets = [ ...document.body.children ];
        const asideTargets = topLevelTargets.filter((dom) => { return /ASIDE/gi.test(dom.nodeName) }).filter((dom) => { return [ ...dom.children ].length > 0 });
        this.parentNode.style.animation = "fadedownlite 0.2s ease forwards";
        setTimeout(() => {
          document.body.removeChild(asideTargets[asideTargets.length - 1]);
          resolve(finalValue);
        }, 201);
      }
    });
  });
}

GeneralJs.imageParsing = function (imageArr) {
  if (!Array.isArray(imageArr)) {
    throw new Error("invaild input");
  }
  if (imageArr.length === 0) {
    throw new Error("invaild input");
  }
  if (!imageArr.every((obj) => { return typeof obj === "object" })) {
    throw new Error("invaild input");
  }
  if (!imageArr.every((obj) => { return typeof obj.src === "string" && typeof obj.id === "string" })) {
    throw new Error("invaild input");
  }
  let div, img;
  let time;
  let width, height;
  let imgTong;
  let num;
  let loadedNum;
  let loadNeedsNum;

  width = 100;
  time = 300;

  div = GeneralJs.nodes.div.cloneNode(true);
  document.body.insertBefore(div, document.body.firstChild);
  div.style.position = "fixed";
  div.style.opacity = String(0);
  div.style.zIndex = String(-1);

  loadedNum = 0;
  loadNeedsNum = imageArr.length;

  return new Promise((resolve, reject) => {

    imgTong = [];
    for (let obj of imageArr) {
      img = GeneralJs.createNode({
        mother: div,
        mode: "img",
        attribute: { src: obj.src },
        event: {
          load: (e) => {
            loadedNum = loadedNum + 1;
            if (loadedNum === loadNeedsNum) {
              setTimeout(() => {
                num = 0;
                for (let obj of imageArr) {
                  img = imgTong[num];
                  height = img.getBoundingClientRect().height;
                  obj.ratio = width / height;
                  if (obj.ratio < 1) {
                    obj.gs = 's';
                  } else {
                    obj.gs = 'g'
                  }
                  num++;
                }
                imageArr = GeneralJs.equalJson(JSON.stringify(imageArr));
                document.body.removeChild(document.body.firstChild);
                resolve(imageArr);
              }, time);
            }
          }
        },
        style: {
          display: "inline-block",
          position: "relative",
          width: String(width) + "px",
          height: "auto"
        }
      });
      imgTong.push(img);
    }

  });
}

GeneralJs.prototype.resizeLaunching = function (callback) {
  const instance = this;
  this.resizeStack = 0;
  this.resizeFrom = 0;
  this.resizePopup = 0;
  const resizeDebounceEvent = function () {
    let timeout;
    const reEvent = function () {
      if ((instance.resizeFrom >= 1510 && window.innerWidth <= 1610) || (instance.resizeFrom <= 1610 && window.innerWidth >= 1610)) {
        GeneralJs.totalDelete();
        callback();
        instance.specialBan();
        instance.greenTalk();
      }
      instance.resizeStack = 0;
    }
    let immediate = null;
    return function (e) {
      if (instance.resizeStack === 0) {
        instance.resizeStack = 1;
        instance.resizeFrom = window.innerWidth;
      }
      let context = this;
      let args = arguments;
      function later() {
        timeout = null;
        if (!immediate) { reEvent.apply(context, args); };
      }
      let callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, 250);
      if (callNow) { reEvent.apply(context, args); };
    }
  }
  window.addEventListener('resize', resizeDebounceEvent());
}

GeneralJs.prototype.stateLaunching = function (callback) {
  window.addEventListener('popstate', function (e) {
    callback(e.state);
  });
}

GeneralJs.prototype.loadLaunching = function (callback) {
  window.addEventListener('load', callback);
}

GeneralJs.prototype.scrollAsyncLaunching = function (callback) {
  let tempArr = [];
  let num = 0;
  const filter = function (str) { return Number(str.replace(/[^0-9\.-]/g, '')); }
  for (let i in GeneralJs.events) {
    if (/scrollAsyncLaunching/.test(i)) { tempArr.push(i); }
  }
  if (tempArr.length > 0) {
    tempArr.sort((a, b) => { return filter(b) - filter(a); });
    num = filter(tempArr[0]) + 1;
  }
  GeneralJs.events["scrollAsyncLaunching" + String(num)] = function (e) {
    if (GeneralJs.boos.scroll) {
      callback(e);
      GeneralJs.boos.scroll = false;
    }
    window.removeEventListener("scroll", GeneralJs.events["scrollAsyncLaunching" + String(num)]);
  };
  window.addEventListener("scroll", GeneralJs.events["scrollAsyncLaunching" + String(num)], { once: true });
}

GeneralJs.prototype.fadeIn = function () {
  let fades = document.querySelectorAll(".fadeInmaininit");
  for (let i = 0; i < fades.length; i++){
    fades[i].classList.add("fadeInmainclass");
  }
  this.loader.classList.add("loaderfadeout");
}

GeneralJs.prototype.rightClick = function () {
  window.addEventListener("contextmenu", function (e) {
    alert("오른쪽버튼은 사용하실 수 없습니다 :)");
    e.preventDefault();
  });
}

GeneralJs.prototype.specialBan = function () {
  function specialban(e) {
    this.value = this.value.replace(/[\*\!\?\~\^\:\/\%\&\+\<\>\;\=\#\$\[\]\\\|\(\)\`\'\"\{\}]/g, '');
  }
  function specialban_lite(e) {
    this.value = this.value.replace(/[\*\^\:\&\<\>\;\=\#\$\[\]\\\|\(\)\`\'\"\{\}]/g, '');
  }
  let i;
  let inputs = document.querySelectorAll("input");
  for (i = 0; i < inputs.length; i++) {
    if (!inputs[i].hasAttribute("hypenboo")) {
      inputs[i].addEventListener("keyup", specialban);
    }
  }
  let textareas = document.querySelectorAll("textarea");
  for (i = 0; i < textareas.length; i++) { textareas[i].addEventListener("keyup", specialban_lite); }
}

GeneralJs.prototype.loaderMake = function () {
  const hiddenSpot = document.getElementById('hiddentextmain0817');

  const loader = GeneralJs.nodes.div.cloneNode(true);
  loader.id = "loader";

  const loaderImg = SvgTong.tongMaker();
  loaderImg.src = this.map.sub.loader;
  loaderImg.classList.add("loading");
  loaderImg.classList.add("loaderc");
  loader.appendChild(SvgTong.parsing(loaderImg));

  this.loader = loader;

  document.body.insertBefore(loader, hiddenSpot);
}

GeneralJs.prototype.navigatorMake = function () {
  const { menu, src } = this.map.main.navigator;
  let logo, search, hamburger, menuTong, menuItem, temp, height, marginLeft, thisLocationArr, thisLocation;

  //desktop
  const desktopNavigator = GeneralJs.nodes.div.cloneNode(true);
  const desktopNavigatorFrame = GeneralJs.nodes.div.cloneNode(true);
  desktopNavigator.id = "desknavihome";
  desktopNavigatorFrame.id = "desknaviframe";

  //logo
  logo = SvgTong.tongMaker();
  logo.src = src.logo;
  logo.classList.add("desknaviclick");
  GeneralJs.addHrefEvent(logo, "http://home-liaison.com");
  logo.style.width = "165px";
  logo.style.height = "23px";
  logo.style.top = "21.3px";
  logo.style.left = "0";
  desktopNavigatorFrame.appendChild(SvgTong.parsing(logo));

  //search icon
  search = SvgTong.tongMaker();
  search.src = src.icons.search;
  search.classList.add("desknaviclick");
  GeneralJs.addHrefEvent(search, "/portfolio.php");
  search.style.width = "24px";
  search.style.height = "24px";
  search.style.top = "22px";
  search.style.right = "0";
  desktopNavigatorFrame.appendChild(SvgTong.parsing(search));

  //menu
  height = 16.5;
  marginLeft = 33;
  thisLocationArr = window.location.href.split('/');
  thisLocation = thisLocationArr[thisLocationArr.length - 1].replace(/\?.+/, '');
  thisLocation = '/' + thisLocation;

  menuTong = GeneralJs.nodes.div.cloneNode(true);
  menuTong.classList.add("desknavimenuframe");
  menuTong.style.left = String(-1 * ((marginLeft / 2) + 4)) + "px"

  for (let i = 0; i < menu.length; i++) {
    menuItem = GeneralJs.nodes.div.cloneNode(true);
    menuItem.style.display = "inline-block";
    menuItem.style.position = "relative";
    menuItem.style.marginLeft = String(marginLeft) + "px";
    menuItem.style.cursor = "pointer";

    temp = SvgTong.tongMaker();
    temp.src = src.words.desktop[i].gray;
    menuItem.style.height = String(height) + "px";
    menuItem.style.width = GeneralJs.parseRatio({ source: temp.src, target: height, method: "height", result: "string" }) + "px";
    temp.style.position = "absolute";
    temp.style.top = "0";
    temp.style.left = "0";
    temp.style.width = "100%";
    temp.style.height = "100%";
    menuItem.appendChild(SvgTong.parsing(temp));

    temp = SvgTong.tongMaker();
    temp.src = src.words.desktop[i].green;
    temp.style.position = "absolute";
    temp.style.top = "0";
    temp.style.left = "0";
    temp.style.width = "100%";
    temp.style.height = "100%";
    temp.style.transition = "all 0.5s ease";
    if (thisLocation === menu[i].href) {
      temp.style.opacity = "1";
    } else {
      temp.style.opacity = "0";
    }
    menuItem.appendChild(SvgTong.parsing(temp));
    if (thisLocation !== menu[i].href) {
      menuItem.addEventListener("mouseleave", function (e) { this.lastChild.style.opacity = '0'; });
    }
    menuItem.addEventListener("mouseenter", function (e) { this.lastChild.style.opacity = '1'; });
    GeneralJs.addHrefEvent(menuItem, menu[i].href);
    menuTong.appendChild(menuItem);
  }
  desktopNavigatorFrame.appendChild(menuTong);
  desktopNavigator.appendChild(desktopNavigatorFrame);
  document.body.insertBefore(desktopNavigator, loader);

  //mobile
  let menuBack, menuButton, width, buttonHeight;
  const mobileNavigator = GeneralJs.nodes.div.cloneNode(true);
  mobileNavigator.id = "mobilenavihome";
  height = 210;

  //logo
  logo = SvgTong.tongMaker();
  logo.src = src.logo;
  GeneralJs.addHrefEvent(logo, "http://home-liaison.com");
  logo.style.position = "absolute";
  logo.style.left = "6.1vw";
  logo.style.top = "20px";
  logo.style.width = "123px";
  logo.style.height = "16px";
  logo.style.cursor = "pointer";
  mobileNavigator.appendChild(SvgTong.parsing(logo));

  //menu
  menuTong = GeneralJs.nodes.div.cloneNode(true);
  menuTong.style.width = "100%";
  menuTong.style.position = "relative";
  menuTong.style.height = String(0) + "px";
  menuTong.style.overflow = "hidden";
  menuTong.style.display = "block";
  menuTong.style.top = "59px";
  menuTong.style.transition = "all 0.5s ease";

  menuItem = GeneralJs.nodes.div.cloneNode(true);
  menuItem.style.width = "100%";
  menuItem.style.position = "absolute";
  menuItem.style.height = String(height) + "px";
  menuItem.style.backgroundColor = "white";
  menuItem.style.display = "block";
  menuItem.style.bottom = "0";

  menuBack = SvgTong.tongMaker();
  menuBack.src = src.words.mobile[0].group;
  menuBack.style.width = "100%";
  menuBack.style.position = "absolute";
  menuBack.style.height = String(height) + "px";
  width = GeneralJs.parseRatio({ source: menuBack.src, target: height, method: "height", result: "number" });
  menuBack.style.width = String(width) + "px";
  menuBack.style.left = "50%";
  menuBack.style.top = "-7px";
  menuBack.style.marginLeft = '-' + String(width / 2) + "px";
  menuItem.appendChild(SvgTong.parsing(menuBack));

  buttonHeight = (height - 22) / menu.length;
  for (let i = 0; i < menu.length; i++) {
    menuButton = GeneralJs.nodes.div.cloneNode(true);
    menuButton.style.width = "100%";
    menuButton.style.position = "absolute";
    menuButton.style.height = String(buttonHeight - 2.6) + "px";
    if (i === menu.length - 1) {
      menuButton.style.height = String(buttonHeight + 10 - 2.6) + "px";
    } else if (i === 0) {
      menuButton.style.height = String(buttonHeight + 10 - 2.6) + "px";
    }
    menuButton.style.cursor = "pointer";
    menuButton.style.top = String((buttonHeight * i) + 5) + "px";
    if (i === 0) {
      menuButton.style.top = String((buttonHeight * i) - 5) + "px";
    }
    GeneralJs.addHrefEvent(menuButton, menu[i].href);
    menuItem.appendChild(menuButton);
  }
  menuTong.appendChild(menuItem);
  menuTong.setAttribute("cus_open", "0");
  mobileNavigator.appendChild(menuTong);

  //hamburger icon
  hamburger = SvgTong.tongMaker();
  hamburger.src = src.icons.hamburger;
  hamburger.style.position = "absolute";
  hamburger.style.right = "6.1vw";
  hamburger.style.top = "21px";
  hamburger.style.width = "20px";
  hamburger.style.height = "13px";
  hamburger.style.cursor = "pointer";
  hamburger.addEventListener("click", function (e) {
    let open = menuTong.getAttribute("cus_open");
    if (Number(open) === 0) {
      menuTong.style.height = String(height) + "px";
      menuTong.setAttribute("cus_open", "1");
    } else {
      menuTong.style.height = "0" + "px";
      menuTong.setAttribute("cus_open", "0");
    }
  });
  mobileNavigator.appendChild(SvgTong.parsing(hamburger));

  document.body.insertBefore(mobileNavigator, loader);
  this.navigator = { desktop: desktopNavigator, mobile: mobileNavigator };
}

GeneralJs.prototype.footerMake = function () {
  const instance = this;
  const { createNode, createNodes, colorChip, withOut, ajaxJson, isMac, selfHref, blankHref } = GeneralJs;
  const media = GeneralJs.stacks.updateMiddleMedialQueryConditions;
  const mobile = media[4];
  const desktop = !mobile;
  const small = (media[3] || media[4]);
  const big = !small;
  const ea = desktop ? "px" : "vw";
  const totalContents = document.getElementById("totalcontents");
  let footerBase;
  let baseHeight;
  let logoWidth;
  let footerTong;
  let tongHeight;
  let basePaddingTop;
  let leftTong, rightTong;
  let leftTongWidth;
  let logoType;
  let contents;
  let logoMarginBottom;
  let leftSize;
  let leftWeight;
  let leftLineHeight;
  let finalTong;
  let supportTongWidth, menuTongWidth, finalTongWidth;
  let tongTopVisual;
  let titleMarginBottom;
  let titleSize, titleWeight, titleLineHeight;
  let titleBetween;
  let contentsSize, contentsWeight, contentsLineHeight;
  let descriptionSize, descriptionWeight, descriptionLineHeight;
  let buttonBox;
  let num;
  let finalMobileBottom;
  let mobileMargin;
  let mobileWordMarginTop;
  let mobileButtonBetween, mobileButtonTextTop;
  let mobileButtonHeight, mobileLogoMarginTop;
  let supportTong, menuTong;

  standardWidth = <%% 1400, 1050, 900, 720, 100 %%>;

  baseHeight = <%% 300, 300, 300, 240, 240 %%>;
  basePaddingTop = <%% 67, 67, 67, 52, 9 %%>;
  tongHeight = <%% 165, 165, 165, 135, 165 %%>;

  logoType = <%% 3, 3, 3, 3, 0 %%>;
  logoWidth = <%% 217, 217, 217, 176, 36 %%>;

  leftTongWidth = <%% 300, 300, 300, 300, 300 %%>;

  logoMarginBottom = <%% 28, 28, 28, 22, 28 %%>;

  leftSize = <%% 12, 12, 12, 10, 12 %%>;
  leftWeight = <%% 600, 600, 600, 600, 600 %%>;
  leftLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;

  supportTongWidth = <%% 200, 200, 200, 180, 200 %%>;
  menuTongWidth = <%% 150, 140, 130, 110, 150 %%>;
  finalTongWidth = <%% 245, 235, 215, 185, 245 %%>;

  tongTopVisual = <%% -5, -5, -5, -5, -5 %%>;
  titleMarginBottom = <%% 22, 22, 22, 18, 22 %%>;

  titleSize = <%% 19, 19, 19, 16, 19 %%>;
  titleWeight = <%% 700, 700, 700, 700, 700 %%>;
  titleLineHeight = <%% 1.4, 1.4, 1.4, 1.4, 1.4 %%>;
  titleBetween = <%% 4, 4, 4, 4, 4 %%>;

  contentsSize = <%% 16, 16, 16, 13, 3.5 %%>;
  contentsWeight = <%% 500, 500, 500, 500, 500 %%>;
  contentsLineHeight = <%% 2, 2, 2, 2, 1.7 %%>;

  descriptionSize = <%% 12, 12, 12, 10, 12 %%>;
  descriptionWeight = <%% 500, 500, 500, 500, 500 %%>;
  descriptionLineHeight = <%% 1.66, 1.66, 1.66, 1.66, 1.66 %%>;

  finalMobileBottom = 12;
  mobileMargin = 8;
  mobileWordMarginTop = 5;

  mobileButtonBetween = 2;
  mobileButtonTextTop = -0.3;

  mobileButtonHeight = 10;
  mobileLogoMarginTop = 8;

  contents = {
    left: [
      "CEO : 박혜연",
      "서울특별시 성동구 상원1길 26, 서울숲 A타워 1305호",
      "사업자등록번호 : 221 - 81 - 49759",
      "통신판매신고업 : 제 2020 - 서울성동 - 01563호",
    ],
    right: {
      support: {
        title: "INFO & SUPPROT",
        contents: [
          "홈리에종 FAQ",
          "이용 약관 및 개인정보 이용방침",
          "T : 02 - 2039 - 2252",
          "E : help@home-liaison.com",
        ],
        href: [
          "/faq.php",
          "/faq.php",
          null,
          null
        ]
      },
      menu: {
        title: "MENU",
        contents: [
          "서비스 소개",
          "포트폴리오",
          "고객 후기",
          "디자이너",
        ],
        href: [
          "/about.php",
          "/portfolio.php",
          "/review.php",
          "/designer.php",
        ]
      },
      final: {
        title: [
          { text: "서비스 신청", event: (e) => { selfHref("/consulting.php") } },
          { text: "블로그 & 인스타그램", event: (e) => { blankHref("https://blog.naver.com/homeliaison"); blankHref("https://www.instagram.com/homeliaison"); } },
          { text: "디자이너 신청", event: (e) => { selfHref("/aspirant.php") } },
        ],
        description: [
          "홈리에종의 모든 거래에 대한 책임과",
          "배송, 교환, 환불, 민원 등의 처리는",
          "홈리에종에서 진행합니다."
        ]
      }
    },
    mobile: [
      "포트폴리오",
      "고객 후기",
      "FAQ",
      "서비스 신청",
    ],
    mobileHref: [
      "/portfolio.php",
      "/review.php",
      "/faq.php",
      "/consulting.php"
    ],
    mobileInfo: [
      "02 - 2039 - 2252",
      "help@home-liaison.com",
    ]
  };

  footerBase = createNode({
    mother: totalContents,
    style: {
      display: "block",
      background: colorChip.gradientGreen,
      width: withOut(0, ea),
      position: "relative",
      height: desktop ? String(baseHeight - basePaddingTop) + ea : "",
      paddingTop: String(basePaddingTop) + ea,
      paddingBottom: desktop ? "" : String(finalMobileBottom) + ea,
    }
  });

  if (desktop) {

    footerTong = createNode({
      mother: footerBase,
      style: {
        display: "flex",
        position: "relative",
        flexDirection: "row",
        justifyContent: "right",
        alignItems: "center",
        textAlign: "right",
        width: String(standardWidth) + ea,
        left: withOut(50, standardWidth / 2, ea),
        height: String(tongHeight) + ea,
      }
    });

    // logo tong
    leftTong = createNode({
      mother: footerTong,
      style: {
        display: "inline-block",
        position: "absolute",
        left: String(0),
        top: String(0),
        width: String(leftTongWidth) + ea,
        height: withOut(0, ea),
      }
    });

    createNode({
      mother: leftTong,
      mode: "svg",
      source: this.returnLogo(colorChip.white, logoType),
      style: {
        display: "block",
        position: "relative",
        width: String(logoWidth) + ea,
        marginBottom: String(logoMarginBottom) + ea,
      }
    });

    for (let text of contents.left) {
      createNode({
        mother: leftTong,
        text,
        style: {
          display: "block",
          textAlign: "left",
          fontSize: String(leftSize) + ea,
          fontWeight: String(leftWeight),
          lineHeight: String(leftLineHeight),
          color: colorChip.white,
        }
      });
    }

    // support tong
    supportTong = createNode({
      mother: footerTong,
      style: {
        display: "inline-block",
        position: "relative",
        height: withOut(0, ea),
        width: String(supportTongWidth) + ea,
        textAlign: "right",
        top: String(tongTopVisual) + ea,
      },
      children: [
        {
          text: contents.right.support.title,
          style: {
            fontSize: String(titleSize) + ea,
            fontWeight: String(titleWeight),
            color: colorChip.white,
            position: "relative",
            display: "block",
            marginBottom: String(titleMarginBottom) + ea,
            lineHeight: String(titleLineHeight),
          }
        },
        {
          text: contents.right.support.contents.join("\n"),
          style: {
            fontSize: String(contentsSize) + ea,
            fontWeight: String(contentsWeight),
            lineHeight: String(contentsLineHeight),
            color: colorChip.white,
            position: "relative",
            display: "block",
            cursor: "pointer",
          }
        },
      ]
    }).children[1];

    for (let i = 0; i < contents.right.support.href.length; i++) {
      createNode({
        mother: supportTong,
        attribute: { index: String(i) },
        event: {
          click: function (e) {
            const index = Number(this.getAttribute("index"));
            if (contents.right.support.href[index] !== null) {
              selfHref(contents.right.support.href[index]);
            }
          }
        },
        style: {
          position: "absolute",
          display: "block",
          width: withOut(0),
          left: String(0),
          height: String(25) + '%',
          top: String(25 * i) + '%',
          background: "transparent",
          cursor: "pointer",
        }
      })
    }

    // menu tong
    menuTong = createNode({
      mother: footerTong,
      style: {
        display: "inline-block",
        position: "relative",
        height: withOut(0, ea),
        width: String(menuTongWidth) + ea,
        textAlign: "right",
        top: String(tongTopVisual) + ea,
      },
      children: [
        {
          text: contents.right.menu.title,
          style: {
            fontSize: String(titleSize) + ea,
            fontWeight: String(titleWeight),
            color: colorChip.white,
            position: "relative",
            display: "block",
            marginBottom: String(titleMarginBottom) + ea,
            lineHeight: String(titleLineHeight),
          }
        },
        {
          text: contents.right.menu.contents.join("\n"),
          style: {
            fontSize: String(contentsSize) + ea,
            fontWeight: String(contentsWeight),
            lineHeight: String(contentsLineHeight),
            color: colorChip.white,
            position: "relative",
            display: "block",
            cursor: "pointer",
          }
        },
      ]
    }).children[1];

    for (let i = 0; i < contents.right.menu.href.length; i++) {
      createNode({
        mother: menuTong,
        attribute: { index: String(i) },
        event: {
          click: function (e) {
            const index = Number(this.getAttribute("index"));
            if (contents.right.menu.href[index] !== null) {
              selfHref(contents.right.menu.href[index]);
            }
          }
        },
        style: {
          position: "absolute",
          display: "block",
          width: withOut(0),
          left: String(0),
          height: String(25) + '%',
          top: String(25 * i) + '%',
          background: "transparent",
          cursor: "pointer",
        }
      });
    }

    // final tong
    finalTong = createNode({
      mother: footerTong,
      style: {
        display: "inline-block",
        position: "relative",
        height: withOut(0, ea),
        width: String(finalTongWidth) + ea,
        textAlign: "right",
        top: String(tongTopVisual) + ea,
      }
    });
    for (let { text, event } of contents.right.final.title) {
      createNode({
        mother: finalTong,
        text,
        event: {
          click: event
        },
        style: {
          fontSize: String(titleSize) + ea,
          fontWeight: String(titleWeight),
          color: colorChip.white,
          position: "relative",
          display: "block",
          marginBottom: String(titleBetween) + ea,
          lineHeight: String(titleLineHeight),
          cursor: "pointer",
        }
      });
    }
    createNode({
      mother: finalTong,
      text: contents.right.final.description.join("\n"),
      style: {
        position: "relative",
        marginTop: String(titleMarginBottom) + ea,
        display: "block",
        fontSize: String(descriptionSize) + ea,
        fontWeight: String(descriptionWeight),
        color: colorChip.white,
        lineHeight: String(descriptionLineHeight),
      }
    });

  } else {

    buttonBox = createNode({
      mother: footerBase,
      style: {
        display: "block",
        position: "relative",
        marginLeft: String(mobileMargin) + ea,
        width: withOut((mobileMargin * 2), ea),
      }
    });

    num = 0;
    for (let text of contents.mobile) {
      createNode({
        mother: buttonBox,
        attribute: { index: String(num) },
        event: {
          click: function (e) {
            const index = Number(this.getAttribute("index"));
            selfHref(contents.mobileHref[index]);
          }
        },
        style: {
          display: "inline-flex",
          position: "relative",
          borderRadius: String(5) + "px",
          width: "calc(calc(100% - " + String(mobileButtonBetween) + ea + ") / 2)",
          height: String(mobileButtonHeight) + ea,
          marginRight: String(num % 2 === 1 ? 0 : mobileButtonBetween) + ea,
          marginBottom: String(mobileButtonBetween) + ea,
          background: colorChip.darkGreen,
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        },
        children: [
          {
            text,
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(contentsSize) + ea,
              fontWeight: String(800),
              color: colorChip.white,
              top: String(mobileButtonTextTop) + ea,
            }
          }
        ]
      });
      num++;
    }

    createNode({
      mother: footerBase,
      text: contents.left.join("\n"),
      style: {
        display: "block",
        position: "relative",
        marginLeft: String(mobileMargin) + ea,
        width: withOut((mobileMargin * 2), ea),
        fontSize: String(contentsSize) + ea,
        textAlign: "center",
        fontWeight: String(contentsWeight),
        lineHeight: String(contentsLineHeight),
        color: colorChip.white,
        marginTop: String(mobileWordMarginTop) + ea,
      }
    })

    createNode({
      mother: footerBase,
      text: contents.mobileInfo.join("&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;"),
      style: {
        display: "block",
        position: "relative",
        marginLeft: String(mobileMargin) + ea,
        width: withOut((mobileMargin * 2), ea),
        fontSize: String(contentsSize) + ea,
        textAlign: "center",
        fontWeight: String(contentsWeight),
        lineHeight: String(contentsLineHeight),
        color: colorChip.white,
        marginTop: String(mobileWordMarginTop) + ea,
      }
    })

    createNode({
      mother: footerBase,
      style: {
        display: "block",
        position: "relative",
        marginLeft: String(mobileMargin) + ea,
        width: withOut((mobileMargin * 2), ea),
        textAlign: "center",
        marginTop: String(mobileLogoMarginTop) + ea,
      },
      children: [
        {
          mode: "svg",
          source: this.returnLogo(colorChip.white, logoType),
          style: {
            display: "inline-block",
            width: String(logoWidth) + ea,
          }
        }
      ]
    })

  }

}

GeneralJs.prototype.greenTalk = function (input) {
  let text, event, second;
  if (input === undefined) {
    event = "consulting";
    text = "홈리에종을 통해 1:1 상담을 받아보세요!";
    second = false;
  } else if (typeof input === "object") {
    if (input === null) {
      event = "consulting";
      text = "홈리에종을 통해 1:1 상담을 받아보세요!";
      second = false;
    } else if (input !== null && typeof input.text === "string" && typeof input.event === "string") {
      event = input.event;
      text = input.text;
      if (typeof input.second === "boolean") {
        second = input.second;
      } else {
        second = false;
      }
    } else {
      throw new Error("invaild object input");
    }
  } else {
    throw new Error("invaild input");
  }

  const instance = this;
  const { createNode, createNodes, colorChip, withOut, ajaxJson, isMac, isIphone, blankHref, setDebounce, setQueue, selfHref } = GeneralJs;
  const media = GeneralJs.stacks.updateMiddleMedialQueryConditions;
  const mobile = media[4];
  const desktop = !mobile;
  const small = (media[3] || media[4]);
  const big = !small;
  const ea = desktop ? "px" : "vw";
  const totalContents = document.getElementById("totalcontents");
  const redDotClassName = "redDotClassName";
  const whitePopupClassName = "greenTalkWordsWhitePopupClassName";
  const eventClassName = "greenTalkEventClassName";
  const redDotTimeOutEventName = "redDotTimeOutEventName";
  const secondPopupClassName = "secondPopupClassName";
  const zIndex = 1;
  let baseWidth, right, bottom;
  let iconWidth;
  let greenBase;
  let iconVisualTop, iconVisualLeft;
  let talkIcon;
  let whitePopup;
  let whitePopupHeight, whitePopupTop;
  let triangleWidth;
  let whitePopupWidth, whitePopupLeft;
  let popupSize, popupWeight, popupTextTop;
  let whitePopupPaddingLeft;
  let whitePopupLeftBetween;
  let whitePopupWidthVisual;
  let width;
  let backgroundWidth;
  let opacity;
  let eventFunc;
  let redDot;
  let redDotRadius;
  let redDotTop, redDotLeft;
  let whitePopupBase;
  let secondPopup;
  let secondPopupBase;
  let secondPopupWidth, secondPopupHeight, secondPopupTop, secondPopupLeft;
  let secondPopupImageHeight;
  let secondSize, secondWeight, secondLineHeight, secondTextTop;
  let secondImage, secondWords;

  baseWidth = desktop ? 68 : 12;
  right = desktop ? 38 : 5.2;
  bottom = desktop ? 39 : 6.2;

  iconWidth = desktop ? 38 : 6;
  iconVisualTop = desktop ? -1 : -0.3;
  iconVisualLeft = desktop ? -0.5 : -0.2;

  whitePopupHeight = desktop ? 48 : 8;
  whitePopupTop = desktop ? 11 : 2;

  triangleWidth = desktop ? 8 : 1.6;

  popupTextTop = desktop ? (isMac() ? -1 : 1) : -0.2;
  popupSize = desktop ? 16 : 2.9;
  popupWeight = desktop ? 600 : 600;

  whitePopupPaddingLeft = desktop ? 19 : 3;
  whitePopupLeftBetween = desktop ? 20 : 3.2;

  whitePopupWidthVisual = desktop ? 2 : 2;

  backgroundWidth = desktop ? 1000 : 80;

  opacity = 0.95;

  redDotRadius = desktop ? 9 : 1;
  redDotTop = desktop ? 0 : 0;
  redDotLeft = desktop ? -6 : -0.6;

  secondPopupWidth = <%% 225, 225, 210, 200, 39.5 %%>;
  secondPopupHeight = <%% 195, 195, 180, 167, 33.5 %%>;
  secondPopupTop = <%% -215, -215, -197, -180, -36 %%>;
  secondPopupLeft = <%% -160, -160, -143, -133, -28.5 %%>;

  secondPopupImageHeight = <%% 125, 125, 115, 102, 20.5 %%>;

  secondSize = <%% 14, 14, 13, 12, 2.6 %%>;
  secondWeight = <%% 600, 600, 600, 600, 600 %%>;
  secondLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;
  secondTextTop = <%% (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isIphone() ? 0 : -0.3) %%>;

  secondImage = FRONTHOST + "/middle/about/c3.jpg";
  secondWords = "홈스타일링 디자이너와\n함께 인테리어를 진행해보세요!";

  secondPopup = null;

  if (event === "consulting") {
    eventFunc = instance.consultingPopup();
  } else if (event === "channel") {
    eventFunc = function (e) {
      blankHref("http://pf.kakao.com/_vxixkjxl/chat");
    }
  } else if (event === "review") {
    eventFunc = function (e) {
      selfHref("/review.php");
    }
  } else if (event === "portfolio") {
    eventFunc = function (e) {
      selfHref("/portfolio.php");
    }
  }

  greenBase = createNode({
    mother: totalContents,
    class: [ eventClassName ],
    event: {
      click: eventFunc,
    },
    style: {
      display: "flex",
      position: "fixed",
      cursor: "pointer",
      width: String(baseWidth) + ea,
      height: String(baseWidth) + ea,
      bottom: String(bottom) + ea,
      right: String(right) + ea,
      borderRadius: String(baseWidth) + ea,
      background: colorChip.gradientGreen,
      boxShadow: "0px 6px 20px -10px " + colorChip.shadow,
      animation: "talkfade 1.2s ease forwards",
      zIndex: String(zIndex),
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
    },
    children: [
      {
        style: {
          display: "flex",
          position: "relative",
          top: String(0),
          left: String(0),
          width: withOut(0),
          height: withOut(0),
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }
      }
    ]
  }).firstChild;

  redDot = createNode({
    mother: greenBase,
    class: [ redDotClassName ],
    attribute: {
      toggle: "off"
    },
    style: {
      position: "absolute",
      width: String(redDotRadius) + ea,
      height: String(redDotRadius) + ea,
      top: String(redDotTop) + ea,
      left: String(redDotLeft) + ea,
      borderRadius: String(redDotRadius) + ea,
      background: colorChip.red,
      transformOrigin: "50% 50%",
      transition: "all 0.2s ease",
      transform: "scale(0)",
    }
  });

  talkIcon = createNode({
    mother: greenBase,
    mode: "svg",
    source: GeneralJs.svgMaker.interactionIcon(colorChip.white),
    style: {
      display: "inline-block",
      position: "relative",
      width: String(iconWidth) + ea,
      top: String(iconVisualTop) + ea,
      left: String(iconVisualLeft) + ea,
      cursor: "pointer",
    }
  });

  whitePopupBase = createNode({
    mother: greenBase,
    event: {
      click: (e) => { e.preventDefault(); e.stopPropagation(); }
    },
    style: {
      display: "flex",
      position: "absolute",
      height: String(whitePopupHeight) + ea,
      top: String(whitePopupTop) + ea,
      background: "transparent",
      justifyContent: "right",
      alignItems: "center",
      textAlign: "right",
      width: String(backgroundWidth) + ea,
      left: String((backgroundWidth * -1) - whitePopupLeftBetween) + ea,
      transition: "all 0s ease",
      cursor: "default",
    },
  });

  whitePopup = createNode({
    mother: whitePopupBase,
    class: [ whitePopupClassName ],
    attribute: {
      toggle: "off"
    },
    event: {
      click: eventFunc,
    },
    style: {
      position: "relative",
      top: String(0),
      left: String(0),
      height: withOut(0),
      display: "inline-flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      paddingLeft: String(whitePopupPaddingLeft) + ea,
      paddingRight: String(whitePopupPaddingLeft) + ea,
      transition: "all 0s ease",
      cursor: "pointer",
      opacity: String(0),
      transform: "translateX(8px)",
    },
    children: [
      {
        style: {
          position: "absolute",
          top: String(0),
          left: String(0),
          width: withOut(0),
          height: withOut(0),
          background: "white",
          borderRadius: String(5) + "px",
          boxShadow: "2px 2px 18px -10px #a0a0a0",
          transition: "all 0s ease",
          opacity: String(opacity),
        }
      },
      {
        style: {
          position: "absolute",
          right: "calc(" + String(-1 * (triangleWidth / 2)) + ea + ")",
          top: withOut(50, triangleWidth / 2, ea),
          width: String(triangleWidth) + ea,
          height: String(triangleWidth) + ea,
          background: colorChip.white,
          transform: "rotate(45deg)",
          transition: "all 0s ease",
          opacity: String(opacity),
        }
      },
      {
        text,
        style: {
          position: "relative",
          top: String(popupTextTop) + ea,
          fontSize: String(popupSize) + ea,
          fontWeight: String(popupWeight),
          color: colorChip.black,
          transition: "all 0s ease",
        }
      }
    ]
  });

  if (second) {
    secondPopup = createNode({
      mother: greenBase,
      class: [ secondPopupClassName ],
      attribute: {
        toggle: "off"
      },
      event: {
        click: function (e) {
          e.stopPropagation();
          selfHref("/consulting.php");
        }
      },
      style: {
        position: "absolute",
        width: String(secondPopupWidth) + ea,
        height: String(secondPopupHeight) + ea,
        top: String(secondPopupTop) + ea,
        left: String(secondPopupLeft) + ea,
        borderRadius: String(8) + "px",
        background: colorChip.white,
        boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
        cursor: "pointer",
        opacity: String(0),
        transform: "translateY(8px)",
      }
    });

    secondPopupBase = createNode({
      mother: secondPopup,
      style: {
        display: "block",
        position: "relative",
        top: String(0),
        left: String(0),
        width: withOut(0),
        height: withOut(0),
        borderRadius: String(8) + "px",
        overflow: "hidden",
      },
      children: [
        {
          style: {
            display: "block",
            position: "relative",
            width: withOut(0),
            height: String(secondPopupImageHeight) + ea,
            background: colorChip.gray1,
            backgroundImage: "url('" + secondImage + "')",
            backgroundSize: "100% auto",
            backgroundPosition: "50% 50%",
          }
        },
        {
          style: {
            display: "flex",
            position: "relative",
            width: withOut(0),
            height: String(secondPopupHeight - secondPopupImageHeight) + ea,
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          },
          children: [
            {
              text: secondWords,
              style: {
                position: "relative",
                top: String(secondTextTop) + ea,
                fontSize: String(secondSize) + ea,
                fontWeight: String(secondWeight),
                color: colorChip.black,
                lineHeight: String(secondLineHeight),
                textAlign: "center",
              }
            }
          ]
        }
      ]
    });

  }

  window.addEventListener("scroll", (e) => {
    setDebounce(() => {
      let scrollMin, scrollSecondMin;
      let redDot, whitePopup;

      scrollMin = <%% 200, 200, 160, 100, 50 %%>;
      scrollSecondMin = <%% 3600, 3600, 3000, 2400, 2000 %%>;

      redDot = document.querySelector('.' + redDotClassName);
      whitePopup = document.querySelector('.' + whitePopupClassName);
      secondPopup = document.querySelector('.' + secondPopupClassName);

      if (window.scrollY > scrollMin) {
        if (whitePopup.getAttribute("toggle") === "off") {

          if (!second || window.scrollY <= scrollSecondMin) {
            redDot.style.transform = "scale(1)";
            whitePopup.style.animation = "talkwhitefadein 0.5s ease forwards";
            redDot.setAttribute("toggle", "on");
            whitePopup.setAttribute("toggle", "on");

            GeneralJs.stacks[redDotTimeOutEventName] = setTimeout(() => {
              redDot.style.transform = "scale(0)";
              redDot.setAttribute("toggle", "off");
              if (GeneralJs.stacks[redDotTimeOutEventName] !== null && GeneralJs.stacks[redDotTimeOutEventName] !== undefined) {
                clearTimeout(GeneralJs.stacks[redDotTimeOutEventName]);
                GeneralJs.stacks[redDotTimeOutEventName] = null;
              }
            }, 5000);
          }

        }
      }

      if (second) {
        if (window.scrollY > scrollSecondMin) {
          if (redDot.getAttribute("toggle") === "on") {
            redDot.style.transform = "scale(0)";
            redDot.setAttribute("toggle", "off");
          }
          if (whitePopup.getAttribute("toggle") === "on") {
            whitePopup.style.animation = "talkwhitefadeout 0.5s ease forwards";
            whitePopup.setAttribute("toggle", "off");
            redDot.style.transform = "scale(0)";
            redDot.setAttribute("toggle", "off");
          }
          if (secondPopup.getAttribute("toggle") === "off") {
            secondPopup.style.animation = "talksecondfadein 1s ease forwards";
            secondPopup.setAttribute("toggle", "on");
          }
        } else {
          if (secondPopup.getAttribute("toggle") === "on") {
            secondPopup.style.animation = "talksecondfadeout 1s ease forwards";
            secondPopup.setAttribute("toggle", "off");
          }
        }
      }


    }, "greenTalkSystemDebounce");
  });

  this.talkIcon = { dom: greenBase };
}

GeneralJs.prototype.whiteLogin = function (boo = "desktop") {
  const instance = this;
  const { main: { login: { flow } }, sub: { loader } } = this.map;
  const [ login, certification ] = flow;
  const { src: subtitle, title: { src: title }, children } = login;
  const [ nameSrc, phoneSrc ] = children;
  const { src: name } = nameSrc;
  const { src: phone } = phoneSrc;
  const mother = document.getElementById(((boo === "desktop") ? "" : "mo") + "totalcontents");

  let toggle = (boo === "desktop") ? true : false;
  let div_back, white_back, div_clone, div_clone2, svg_clone, input_clone;
  let height, width, top, left, right;
  let ea = toggle ? "px" : "vw";
  let style = {};
  let inputs = [];
  let inputsBack = [];
  let submitEvent, submitEventKey, cancelOrSubmitEvent;
  let targetDoms = {};

  //MAKE DOMS -----------------------------------------------------------------------------

  //gray back
  div_back = GeneralJs.nodes.div.cloneNode(true);
  div_back.id = ((boo === "desktop") ? "" : "mo") + "loginbox_back";
  mother.appendChild(div_back);


  //login box window (div_clone)
  div_clone = GeneralJs.nodes.div.cloneNode(true);
  div_clone.id = ((boo === "desktop") ? "" : "mo") + "loginbox";


  //white back
  white_back = GeneralJs.nodes.div.cloneNode(true);
  white_back.classList.add("absolutedefault");
  style = {
    background: "#ffffff",
    borderRadius: "5px",
  }
  for (let i in style) {
    white_back.style[i] = style[i];
  }
  div_clone.appendChild(white_back);


  //title
  height = toggle ? 68 : 15.5;
  top = toggle ? 41 : 9.2;
  left = toggle ? 41 : 0;

  svg_clone = SvgTong.tongMaker();
  svg_clone.src = title[boo];
  width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });

  style = {
    position: "absolute",
    top: String(top) + ea,
    left: String(left) + ea,
    width: String(width) + ea,
    height: String(height) + ea,
  };
  for (let i in style) {
    svg_clone.style[i] = style[i];
  }
  if (!toggle) {
    svg_clone.style.left = String((78 - width) / 2) + ea;
  }
  targetDoms.title = SvgTong.parsing(svg_clone);
  div_clone.appendChild(targetDoms.title);


  //sub title
  height = toggle ? 16 : 0;
  top = toggle ? 43 : 0;
  right = toggle ? 46 : 0;

  svg_clone = SvgTong.tongMaker();
  svg_clone.src = subtitle[boo];
  width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });

  style = {
    position: "absolute",
    top: String(top) + ea,
    right: String(right) + ea,
    width: String(width) + ea,
    height: String(height) + ea,
  };
  for (let i in style) {
    svg_clone.style[i] = style[i];
  }
  if (!toggle) {
    svg_clone.style.display = "none";
  }
  targetDoms.subTitle = SvgTong.parsing(svg_clone);
  div_clone.appendChild(targetDoms.subTitle);


  //name
  height = toggle ? 18 : 4.4;
  top = toggle ? 57 : 23.2;
  left = toggle ? 51 : 9;

  svg_clone = SvgTong.tongMaker();
  svg_clone.src = name[boo];
  width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });

  style = {
    position: "absolute",
    bottom: String(top) + ea,
    left: String(left) + ea,
    width: String(width) + ea,
    height: String(height) + ea,
  };
  for (let i in style) {
    svg_clone.style[i] = style[i];
  }

  targetDoms.name = SvgTong.parsing(svg_clone);
  div_clone.appendChild(targetDoms.name);


  //phone
  svg_clone = SvgTong.tongMaker();
  svg_clone.src = phone[boo];
  width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
  style.width = String(width) + ea;

  if (toggle) {
    style.left = String(290) + ea;
  } else {
    style.bottom = String(13) + ea;
  }

  for (let i in style) {
    svg_clone.style[i] = style[i];
  }

  targetDoms.phone = SvgTong.parsing(svg_clone);
  div_clone.appendChild(targetDoms.phone);


  //name input back
  height = toggle ? 33 : 8;
  width = toggle ? 151 : 39.5;
  top = toggle ? 48 : 21.5;
  left = toggle ? 115 : 30;

  div_clone2 = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "absolute",
    bottom: String(top) + ea,
    left: String(left) + ea,
    width: String(width) + ea,
    height: String(height) + ea,
    borderRadius: String(toggle ? 3 : 1) + ea,
    background: "#f2f2f2",
  };
  for (let i in style) {
    div_clone2.style[i] = style[i];
  }
  targetDoms.nameBack = div_clone2;
  div_clone.appendChild(div_clone2);
  inputsBack.push(div_clone2);


  //phone input back
  div_clone2 = GeneralJs.nodes.div.cloneNode(true);

  if (toggle) {
    style.left = String(371) + ea;
  } else {
    style.bottom = String(11) + ea;
  }

  for (let i in style) {
    div_clone2.style[i] = style[i];
  }
  targetDoms.phoneBack = div_clone2;
  div_clone.appendChild(div_clone2);
  inputsBack.push(div_clone2);


  //name input
  input_clone = GeneralJs.nodes.input.cloneNode(true);
  input_clone.classList.add("inputdefault");
  input_clone.setAttribute("type", "text");
  input_clone.setAttribute("placeholder", "성함");
  style = {
    position: "absolute",
    height: String(height) + ea,
    bottom: String(0) + ea,
    background: "transparent",
    width: String(width) + ea,
    left: String(0) + ea,
    textAlign: "center",
    textIndent: "0",
  };
  for (let j in style) {
    input_clone.style[j] = style[j];
  }
  input_clone.addEventListener("keyup", function (e) {
    this.value = GeneralJs.escapeString(this.value, { noSpace: true });
  });
  targetDoms.nameInput = div_clone2;
  inputsBack[0].appendChild(input_clone);
  inputs.push(input_clone);


  //phone input
  input_clone = GeneralJs.nodes.input.cloneNode(true);
  input_clone.classList.add("inputdefault");
  input_clone.setAttribute("placeholder", "010-0000-0000");
  for (let j in style) {
    input_clone.style[j] = style[j];
  }
  input_clone.setAttribute("hypenboo", "yes");
  input_clone.addEventListener("keyup", function (e) {
    this.value = GeneralJs.autoHypenPhone(this.value);
  });
  targetDoms.phoneInput = div_clone2;
  inputsBack[1].appendChild(input_clone);
  inputs.push(input_clone);


  //end
  mother.appendChild(div_clone);


  //EVENTS --------------------------------------------------------------------------------------

  //input submit event
  submitEvent = function (e) {

    //certification
    if (inputs[0].value === "") {
      GeneralJs.inputBackward(inputs[0], "성함을 입력해주세요!");
    } else if (inputs[1].value === "") {
      GeneralJs.inputBackward(inputs[1], "연락처를 입력해주세요!");
    } else {

      //question server
      GeneralJs.toPhotoUpload(inputs[0].value, inputs[1].value);

      //loading bar
      for (let i in targetDoms) {
        targetDoms[i].style.animation = "justfadeout 0.3s ease forwards";
      }
      const loaderImg = SvgTong.tongMaker();
      loaderImg.src = instance.map.sub.loader;
      loaderImg.classList.add("loading");
      loaderImg.classList.add("loaderc");
      loaderImg.style.top = String(toggle ? 73 : 23.5) + ea;
      div_clone.appendChild(SvgTong.parsing(loaderImg));

    }
  }


  //submit event to keypress event
  GeneralJs.stacks["whiteLoginBox"] = 0;
  submitEventKey = function (e) {
    if (e.key === "Enter" && GeneralJs.stacks["whiteLoginBox"] === 0) {
      submitEvent(e);
      GeneralJs.stacks["whiteLoginBox"] = 1;
    }
  }


  //focus on name and keypress event on
  inputs[0].focus();
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("keypress", submitEventKey);
  }


  //cancel or submit event (gray back and white back on)
  cancelOrSubmitEvent = function (cancelBoo) {
    return function (e) {
      if (GeneralJs.stacks["whiteLoginBox"] === 0 && inputs[0].value !== '' && inputs[1].value !== '') {
        submitEvent(e);
        GeneralJs.stacks["whiteLoginBox"] = 1;
      } else {
        if (cancelBoo) {
          mother.removeChild(document.getElementById(((boo === "desktop") ? "" : "mo") + "loginbox_back"));
          mother.removeChild(document.getElementById(((boo === "desktop") ? "" : "mo") + "loginbox"));
        }
      }
    }
  }


  //cancel or submit event on
  div_back.addEventListener("click", cancelOrSubmitEvent(true));
  white_back.addEventListener("click", cancelOrSubmitEvent(false));
}

GeneralJs.prototype.todayMaker = function (startPoint = "month") {
  const today = new Date();
  let dayString = '';
  if (startPoint === "month") {
    if (today.getMonth() + 1 < 10) {
      dayString += '0' + String(today.getMonth() + 1);
    } else {
      dayString += String(today.getMonth() + 1);
    }
    if (today.getDate() < 10) {
      dayString += '0' + String(today.getDate());
    } else {
      dayString += String(today.getDate());
    }
    if (today.getHours() < 10) {
      dayString += '0' + String(today.getHours());
    } else {
      dayString += String(today.getHours());
    }
  } else if (startPoint === "year") {
    dayString += String(today.getFullYear()).slice(2, 4);
    if (today.getMonth() + 1 < 10) {
      dayString += '0' + String(today.getMonth() + 1);
    } else {
      dayString += String(today.getMonth() + 1);
    }
    if (today.getDate() < 10) {
      dayString += '0' + String(today.getDate());
    } else {
      dayString += String(today.getDate());
    }
  } else {
    throw new Error("invaild option");
  }
  return dayString;
}

GeneralJs.prototype.returnPlus = function (color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8.388 8.388"><path d="M4.194 0C1.878 0 0 1.878 0 4.194s1.878 4.194 4.194 4.194 4.194-1.878 4.194-4.194S6.51 0 4.194 0zM6.469 4.606H4.606v1.863c0 0.228-0.185 0.412-0.412 0.412 -0.228 0-0.412-0.185-0.412-0.412V4.606H1.918c-0.228 0-0.412-0.185-0.412-0.412 0-0.228 0.185-0.412 0.412-0.412h1.863V1.918c0-0.228 0.185-0.412 0.412-0.412 0.228 0 0.412 0.185 0.412 0.412v1.863h1.863c0.228 0 0.412 0.185 0.412 0.412C6.881 4.421 6.697 4.606 6.469 4.606z" fill="${color}"/></svg>`;
}

GeneralJs.prototype.returnOk = function (color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 545.677 545.677"><path class="st0" d="M272.839 0c-150.685 0-272.839 122.154-272.839 272.839s122.154 272.839 272.839 272.839 272.839-122.154 272.839-272.839S423.523 0 272.839 0zM433.643 193.855L241.566 405.315c-4.247 4.676-10.264 7.352-16.581 7.372 -0.024 0-0.049 0-0.074 0 -6.291 0-12.294-2.633-16.555-7.263L99.241 286.872c-8.416-9.143-7.825-23.377 1.318-31.792 9.143-8.416 23.377-7.826 31.792 1.318l92.45 100.446 175.532-193.246c8.355-9.198 22.584-9.881 31.783-1.526C441.315 170.426 441.999 184.656 433.643 193.855z" fill="${color}"/></svg>`;
}

GeneralJs.setCookie = function (obj, day = 730, del = false) {
  if (typeof day === "boolean") {
    del = day;
    day = 730;
  }
  const today = new Date();
  let totalString, expires;

  today.setTime(today.getTime() + (day * 24 * 60 * 60 * 1000));
  if (!del) {
    expires = "expires=" + today.toUTCString();
  } else {
    expires = "expires=Thu, 01 Jan 1970 00:00:00 UTC";
  }

  for (let i in obj) {
    totalString = '';
    totalString += encodeURIComponent(i.replace(/\=\;/g, ''));
    totalString += '=';
    totalString += encodeURIComponent(String(obj[i]).replace(/\=\;/g, ''));
    totalString += ';';
    totalString += expires + ";path=/";
    document.cookie = totalString;
  }
}

GeneralJs.getCookiesAll = function () {
  const cookies = decodeURIComponent(document.cookie);
  let tempArr0, tempArr1;
  let resultObj;

  resultObj = {};
  tempArr0 = cookies.split(';');

  for (let i of tempArr0) {
    tempArr1 = i.split('=');
    if (tempArr1.length > 1) {
      resultObj[tempArr1[0].trim()] = tempArr1[1].trim();
    }
  }

  return resultObj;
}

GeneralJs.getCookieById = function (key) {
  const cookiesObj = GeneralJs.getCookiesAll();
  const cookiesKey = Object.keys(cookiesObj);
  if (cookiesKey.includes(key)) {
    return cookiesObj[key];
  } else {
    return null;
  }
}

GeneralJs.googleLogInInit = function () {
  GeneralJs.stacks["GoogleAuth"] = null;
  GeneralJs.stacks["GoogleClient"] = null;
  GeneralJs.stacks["GoogleClientProfile"] = {
    homeliaisonConsoleLoginedName: null,
    homeliaisonConsoleLoginedEmail: null,
    homeliaisonConsoleLoginedBoolean: false
  };
  return new Promise(function(resolve, reject) {
    GeneralJs.request("https://apis.google.com/js/platform.js?onload=googleLogInInit", function (response) {
      const googleCode = new Function(response);
      googleCode();
      gapi.load("auth2", function () {
        const googleAuth = gapi.auth2.init({
          client_id: "444967534334-r85i9pcnfd3oeschret07t465vcnv4gf.apps.googleusercontent.com",
        });
        googleAuth.then(function () {
          GeneralJs.stacks["GoogleAuth"] = googleAuth;
          console.log(googleAuth);
          resolve(googleAuth);
        }, function (e) {
          reject(e);
        });
      });
    });
  });
}

GeneralJs.isMac = function () {
  return !/Windows/gi.test(window.navigator.userAgent);
}

GeneralJs.isIphone = function () {
  return /iPhone/gi.test(window.navigator.userAgent);
}

GeneralJs.isIE = function () {
  let agent = window.navigator.userAgent.toLowerCase();
  if ((navigator.appName === 'Netscape' && agent.indexOf('trident') !== -1) || (agent.indexOf("msie") !== -1)) {
    return true;
  } else {
    return false;
  }
}

GeneralJs.orderSystem = function (type, number) {
  if (number === undefined) {
    number = type;
    type = "encode";
  }
  const ABC = [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z" ];
  let a1, a2, a0;
  let n1, n2;
  let target, index0, index1, result;
  let lastInitialArr, num;
  let a, s, z;

  lastInitialArr = [];
  a = 'a'.charCodeAt(0);
  s = 's'.charCodeAt(0);
  z = 'z'.charCodeAt(0);
  for (let i = a; i < z + 1; i++) {
    num = i + (s - a);
    if (num > z) {
      lastInitialArr.push(String.fromCharCode(num - z - 1 + a));
    } else {
      lastInitialArr.push(String.fromCharCode(num));
    }
  }

  if (type === "encode") {

    if (typeof number !== "number") {
      throw new Error("encode input must be number");
    }
    if (number >= ((ABC.length - 1) * 100 * (ABC.length)) + ((ABC.length - 1) * 100) + (9 * 10) + (9 * 1) + ((ABC.length - 1) * 100 * (ABC.length) * (ABC.length)) + 1) {
      throw new Error("too heavy number");
    }

    n2 = (number % 10);
    n1 = (((number - n2) % (10 * 10)) / 10);
    a2 = ABC[((number - n2 - (n1 * 10)) % (ABC.length * 10 * 10)) / (10 * 10)];
    a1 = ABC[((number - n2 - (n1 * 10) - (ABC.indexOf(a2) * 10 * 10)) % (ABC.length * ABC.length * 10 * 10)) / (ABC.length * 10 * 10)];
    a0 = lastInitialArr[((number - n2 - (n1 * 10) - (ABC.indexOf(a2) * 10 * 10) - (ABC.indexOf(a1) * ABC.length * 10 * 10)) % (ABC.length * ABC.length * ABC.length * 10 * 10)) / (ABC.length * ABC.length * 10 * 10)];

    return (a1 + a2 + String(n1) + String(n2) + a0);

  } else if (type === "decode") {

    if (typeof number !== "string") {
      throw new Error("decode input must be string");
    }

    if (number.length === 11) {
      target = number.split("_")[1].trim();
    } else if (number.length === 5) {
      target = number.trim();
    } else {
      throw new Error("invaild id");
    }

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
    result = (index0 * 100 * 26) + (index1 * 100) + (Number(target[2]) * 10) + (Number(target[3]) * 1) + (lastInitialArr.indexOf(target[4]) * 100 * 26 * 26);

    return result;

  } else {
    throw new Error("orderSystem type must be 'encode' or 'decode'");
  }
}

GeneralJs.promiseTogether = function (promiseArr) {
  if (!Array.isArray(promiseArr)) {
    throw new Error("invaild input");
  }
  if (!promiseArr.every((obj) => { return obj instanceof Promise })) {
    throw new Error("invaild input");
  }
  return new Promise((resolve, reject) => {
    const workLength = promiseArr.length;
    let promiseTong, interval, timeout;

    promiseTong = [];

    for (let i = 0; i < workLength; i++) {
      promiseArr[i].then(() => {
        promiseTong.push(true);
      }).catch((err) => {
        reject(err);
      })
    }

    interval = setInterval(() => {
      if (promiseTong.length >= workLength) {
        timeout = setTimeout(() => {
          resolve(true);
          clearTimeout(timeout);
        }, 0);
        clearInterval(interval);
      }
    }, 100);
  });
}

GeneralJs.homeliaisonAnalytics = function (obj) {
  const dbHost = "home-liaison.info";
  const analyticsReceivePath = "/receiveLog";
  const dbPort = 3000;
  return new Promise((resolve, reject) => {
    if (typeof window.gtag === "function") {
      if (typeof obj === "object" && obj !== null) {
        if (typeof obj.page === "string" && obj.standard instanceof Date && typeof obj.action === "string" && typeof obj.data === "object" && obj.data !== null) {
          window.gtag("get", window.gtagId, "client_id", (client_id) => {
            const json = {
              page: obj.page,
              action: obj.action,
              standard: obj.standard.valueOf(),
              date: (new Date()).valueOf(),
              googleId: client_id,
              id: client_id,
              ...obj.data
            };
            if (typeof window.fbq === "function") {
              window.fbq("trackCustom", obj.action, json);
            }
            window.gtag("event", obj.action, {
              "event_category": obj.page,
              "event_label": JSON.stringify(json),
            });
            GeneralJs.ajaxJson({
              data: { ...json, value: obj.data },
            }, "https://" + dbHost + ':' + String(dbPort) + analyticsReceivePath).then((obj) => {
              resolve(obj);
            }).catch((err) => {
              reject(err.message);
            });
          });
        } else {
          reject("input must be { page: String, standard: Date, action: String, data: Object } }");
        }
      }
    } else {
      reject("there is no gtag");
    }
  });
}
