GeneralJs.timeouts = {};

GeneralJs.confirmKeyCode = [
  13,
  9,
];

GeneralJs.updateHistoryTong = [];

GeneralJs.objectToQuery = function (dataObj) {
  let dataString;

  dataString = '';
  for (let i in dataObj) {
    dataString += i.replace(/\=\&/g, '');
    dataString += '=';
    dataString += String(dataObj[i]).replace(/\=\&/g, '');
    dataString += '&';
  }
  dataString = dataString.slice(0, -1);

  return dataString;
}

GeneralJs.updateValue = async function (dataObj) {
  if (dataObj === undefined) {
    throw new Error("invaild arguments");
  }
  const instance = this;
  try {
    let dataString, response;

    GeneralJs.updateHistoryTong.unshift(dataObj);
    dataString = GeneralJs.objectToQuery(dataObj);
    response = JSON.parse(await GeneralJs.ajaxPromise(dataString, "/updateClient"));
    if (response.message !== "success") {
      throw new Error("update error");
    }

    return response.message;
  } catch (e) {
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
      dataString = GeneralJs.objectToQuery(copiedObj);
      response = JSON.parse(await GeneralJs.ajaxPromise(dataString, "/updateClient"));
      if (response.message !== "success") {
        throw new Error("return error");
      }

      return copiedObj;
    }

  } catch (e) {
    console.log(e);
  }
}

GeneralJs.prototype.belowButtons = {
  arrow: {
    left: null,
    right: null,
  },
  square: {
    up: null,
    down: null,
  }
}

GeneralJs.prototype.totalContents = document.getElementById("totalcontents");

GeneralJs.prototype.generalCss = function () {
  const styleTag = document.querySelector("style");
  const css = `
  html{-webkit-text-size-adjust:100%;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing: grayscale}
  *{margin:0;padding:0;transition:all 0.4s ease;font-family:'sandoll'}
  input::placeholder {color:white;opacity:0.5;}
  body,div{font-size:0;color:#404040;margin:0;}
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
  #totalcontents,#secondcontents{display:block;position:relative;left:0;}
  .hiddenp,.switch{display:none;}
  .circle{position:absolute;cursor:pointer;width:15px;height:15px;opacity:0.95;z-index:101;top:-20px}
  .hoverDefault{cursor:pointer;opacity:1}
  .hoverDefault:hover{opacity:0.5;}
  @keyframes justfadeinoriginal{from{opacity:0;}to{opacity:1;}}
  @keyframes justfadeoutoriginal{from{opacity:1;}to{opacity:0;}}
  @keyframes justfadein{from{opacity:0;}to{opacity:0.3;}}
  @keyframes justfadeout{from{opacity:0.3;}to{opacity:0;}}
  @keyframes fadedown{from{opacity:1;transform:translateY(0px);}to{opacity:0;transform:translateY(20px);}}
  @keyframes fadeup{from{opacity:0;transform:translateY(20px);}to{opacity:0.95;transform:translateY(0px);}}
  @keyframes fadeout{from{opacity:1;transform:translateX(0px);}to{opacity:0;transform:translateX(-30px);}}
  @keyframes fadein{from{opacity:0;transform:translateX(30px);}to{opacity:1;transform:translateX(0px);}}
  .justfadeinoriginal{animation:justfadeinoriginal 0.4s ease forwards;}
  .justfadeoutoriginal{animation:justfadeoutoriginal 0.4s ease forwards;}
  .justfadein{animation:justfadein 0.4s ease forwards;}
  .justfadeout{animation:justfadeout 0.4s ease forwards;}
  .fadeout{animation:fadeout 0.4s ease forwards;}
  .fadein{animation:fadein 0.4s ease forwards;}
  .fadedown{animation:fadedown 0.4s ease forwards;}
  .fadeup{animation:fadeup 0.4s ease forwards;}
  .totalMother{display:block;position:fixed;top:0px;left:0px;height:calc(100% - 123px);width:100%;overflow-x:hidden;overflow-y:scroll;}
  .totalMother::-webkit-scrollbar{display:none;}
  .totalFather{width:100%;position:relative;overflow-x:hidden;overflow-y:scroll;height:calc(100vh - 123px);background:white}
  .totalFather::-webkit-scrollbar{display:none;}
  `;
  styleTag.textContent = css;
}

GeneralJs.prototype.returnCircle = function (cssString, color) {
  return `<svg class="circle" style="${cssString}"><circle cx="6px" cy="6px" r="6px" fill="${color}" /></svg>`;
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

GeneralJs.prototype.returnCinitial = function (color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 276.866 296.154"><path d="M0 169.978C0 73.134 61.481 0 157.52 0c68.717 0 116.133 34.957 119.346 104.478h-64.695c-4.42-34.557-21.298-53.442-56.661-53.442 -56.658 0-87.199 53.042-87.599 116.93 -0.403 45.809 20.895 76.353 68.314 76.353 34.957 0 59.068-20.498 69.114-55.855h63.894c-12.859 69.515-67.107 107.691-133.814 107.691C52.639 296.154 0 250.345 0 169.978z" fill="${color}"/></svg>`;
}

GeneralJs.prototype.returnRinitial = function (color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 179.985 211.309"><path d="M33.395 0h73.589c46.4 0 73.295 20.985 72.998 57.629 0 36.648-23.052 57.629-53.196 64.131l44.329 89.548H121.761l-40.191-81.567H60.29L47.582 211.309H0L33.395 0zM93.685 97.23c25.417 0 39.307-10.934 39.307-34.872 0.294-17.734-10.936-25.711-31.623-25.711H75.361l-9.751 60.582H93.685z" fill="${color}"/></svg>`;
}

GeneralJs.prototype.returnReturn = function (color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 475.449 413.43"><path style="fill:${color}" d="M201.159 62.683c-1.04 0 1.037 0.02 0 0.031l0-58.417c0-3.611-4.287-5.606-7.155-3.329L43.119 120.739c-3.724 2.956-3.755 8.501-0.065 11.497l150.913 120.542c2.859 2.322 7.193 0.334 7.193-3.299v-69.727l-3.111 0c120.242 0.588 163.157 53.466 163.157 118.639 0 55.465-52.965 102.031-124.531 115.039 107.786-13.319 190.203-93.841 190.203-181.851C426.877 143.35 361.043 62.683 201.159 62.683z"/></svg>`;
}

GeneralJs.prototype.returnReport = function (color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 138.205 174.702"><path d="M133.959 24.22l-18.454-19.689C112.786 1.63 109.098 0 105.253 0H13.1C5.865 0 0 6.258 0 13.977v146.748c0 7.719 5.865 13.977 13.1 13.977h112.005c7.235 0 13.1-6.258 13.1-13.977V35.158C138.205 31.055 136.678 27.121 133.959 24.22zM110.481 138.596H26.823c-2.529 0-4.579-2.187-4.579-4.886s2.05-4.886 4.579-4.886h83.658c2.529 0 4.579 2.187 4.579 4.886S113.01 138.596 110.481 138.596zM110.481 106.992H26.823c-2.529 0-4.579-2.187-4.579-4.886s2.05-4.886 4.579-4.886h83.658c2.529 0 4.579 2.187 4.579 4.886S113.01 106.992 110.481 106.992zM110.481 75.388H26.823c-2.529 0-4.579-2.187-4.579-4.886s2.05-4.886 4.579-4.886h83.658c2.529 0 4.579 2.187 4.579 4.886S113.01 75.388 110.481 75.388z" fill="${color}"/></svg>`;
}

GeneralJs.prototype.searchInput = function (greenBox) {
  let div_clone, input_clone;
  let style = {};
  let ea = "px";
  let width, height, visualSpecific;
  let fontSize;

  width = 300;
  height = 60;
  visualSpecific = 9;
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
    color: "white",
    outline: "none",
  };
  for (let i in style) {
    input_clone.style[i] = style[i];
  }
  div_clone.appendChild(input_clone);
  greenBox.appendChild(div_clone);
  this.searchInput = input_clone;
}

GeneralJs.prototype.greenBar = function () {
  let div_clone, div_clone2, svg_icon;
  let input_clone;
  let style = {};
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
    background: "linear-gradient(222deg, rgba(89,175,137,0.9) 5%, rgba(0,156,106,0.9) 100%)",
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
    "#59AF89",
    "#FFBD3D",
    "#FF5F57",
  ];

  for (let i = 0; i < colors.length; i++) {
    div_clone.insertAdjacentHTML(`beforeend`, this.returnCircle("right:" + String(start + (margin * i)) + ea, colors[i]));
  }

  move = 300;
  top = 32;
  right = 38;

  div_clone2 = GeneralJs.nodes.div.cloneNode(true);
  div_clone2.appendChild(SvgTong.stringParsing(this.returnBigArrow("#ffffff")));
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
      } else if ((-1 * (Number(target.style.width.replace(/[^0-9]/g, '')) - (window.innerWidth - 20))) > Number(target.style.transform.replace(/[^0-9\-\.]/g, ''))) {
        target.style.transform = "translateX(" + String(-1 * (Number(target.style.width.replace(/[^0-9]/g, '')) - (window.innerWidth - 20))) + ea + ")";
      }
    }
  }

  div_clone2.addEventListener("click", moveEventLeft);
  this.belowButtons.arrow.left = div_clone2;
  div_clone.appendChild(div_clone2);

  div_clone2 = GeneralJs.nodes.div.cloneNode(true);
  div_clone2.appendChild(SvgTong.stringParsing(this.returnBigArrow("#ffffff")));
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
      } else if ((-1 * (Number(target.style.width.replace(/[^0-9]/g, '')) - (window.innerWidth - 20))) > Number(target.style.transform.replace(/[^0-9\-\.]/g, ''))) {
        target.style.transform = "translateX(" + String(-1 * (Number(target.style.width.replace(/[^0-9]/g, '')) - (window.innerWidth - 20))) + ea + ")";
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
  svg_icon = SvgTong.stringParsing(this.returnReport("#ffffff"));
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
  svg_icon = SvgTong.stringParsing(this.returnReturn("#ffffff"));
  svg_icon.classList.add("hoverDefault");
  for (let i in style) {
    svg_icon.style[i] = style[i];
  }
  svg_icon.style.width = String(28) + ea;
  svg_icon.style.height = String(27) + ea;
  svg_icon.style.top = String(belowTop - 2) + ea;
  svg_icon.style.right = String(iconRight - 3) + ea;
  this.belowButtons.square.returnIcon = svg_icon;
  div_clone.appendChild(svg_icon);

  //button C
  svg_icon = SvgTong.stringParsing(this.returnCinitial("#ffffff"));
  svg_icon.classList.add("hoverDefault");
  for (let i in style) {
    svg_icon.style[i] = style[i];
  }
  svg_icon.style.width = String(21) + ea;
  svg_icon.style.height = String(24) + ea;
  svg_icon.style.top = String(top - 1) + ea;
  svg_icon.style.right = String(iconRight + 31) + ea;
  this.belowButtons.square.up = svg_icon;
  div_clone.appendChild(svg_icon);

  //button R
  svg_icon = SvgTong.stringParsing(this.returnRinitial("#ffffff"));
  svg_icon.classList.add("hoverDefault");
  for (let i in style) {
    svg_icon.style[i] = style[i];
  }
  svg_icon.style.width = String(22) + ea;
  svg_icon.style.height = String(22) + ea;
  svg_icon.style.top = String(belowTop) + ea;
  svg_icon.style.right = String(iconRight + 31) + ea;
  this.belowButtons.square.down = svg_icon;
  div_clone.appendChild(svg_icon);

  //search Input
  this.searchInput(div_clone);
  this.totalContents.appendChild(div_clone);
  this.searchInput.focus();
}
