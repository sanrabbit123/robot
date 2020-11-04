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
  *{margin:0;padding:0;transition:all 0.5s ease;font-family:'sandoll'}
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



  .totalMother{
    display: block;
    position: fixed;
    top: 0px;
    left: 0px;
    height: calc(100% - 123px);
    width: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  .totalMother::-webkit-scrollbar{display:none;}
  .totalFather{
    width: 100%;
    position: relative;
    overflow-x: hidden;
    overflow-y: scroll;
    height: calc(100vh - 123px);
  }
  .totalFather::-webkit-scrollbar{display:none;}
  `;
  styleTag.textContent = css;
}

GeneralJs.prototype.greenBar = function () {
  let div_clone, div_clone2;
  let style = {};
  let ea = "px";
  let margin, start, colors, svgString;
  let arrowString, move;
  let moveEventLeft, moveEventRight;

  div_clone = GeneralJs.nodes.div.cloneNode(true);
  style = {
    display: "block",
    position: "fixed",
    background: "linear-gradient(222deg, rgba(89,175,137,0.9) 5%, rgba(0,156,106,0.9) 100%)",
    bottom: String(0),
    left: String(0),
    width: "100%",
    height: String(123) + ea,
    zIndex: String(1),
  };
  for (let i in style) {
    div_clone.style[i] = style[i];
  }
  this.below = div_clone;

  margin = 18;
  start = 7;
  colors = [
    "#59AF89",
    "#FFBD3D",
    "#FF5F57",
  ]
  svgString = function (position, color) {
    return `<svg class="circle" style="right:${position}"><circle cx="6px" cy="6px" r="6px" fill="${color}" /></svg>`;
  }

  for (let i = 0; i < colors.length; i++) {
    div_clone.insertAdjacentHTML(`beforeend`, svgString(String(start + (margin * i)) + ea, colors[i]));
  }

  arrowString = function (color) {
    return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 140.3158722 226.7716522" style="position:absolute;top:0;left:0;width:100%;" xml:space="preserve"><path style="fill:${color}" d="M139.3157501,110.4524536l-8.1448364-10.5556641c-0.0001831-0.0001831-0.0002441-0.0004272-0.0004272-0.0006104 l-53.7539062-69.664978l0.0002441-0.000061L56.3754845,2.9616106C54.9343452,1.0938948,52.7086105,0,50.3495331,0h-7.2148094 H28.4846973H1.8857865c-1.5630032,0-2.4450798,1.7947513-1.490254,3.032203l25.1439133,32.5864487 c0.0010986,0.0014038,0.0019531,0.0029907,0.0030518,0.0043945l58.6533508,76.0145111 c0.7948532,1.0301361,0.7948532,2.4667816,0,3.4969177l-41.8935814,54.2939911h-0.000061L0.3955295,223.7394714 c-0.9548249,1.237442-0.0727481,3.032196,1.4902546,3.032196h26.5989132h14.6500263h7.2148132 c2.3590775,0,4.5848083-1.0938873,6.0259514-2.9616089l4.3834419-5.6809082 c0.0001221-0.0001831,0.0002441-0.0003052,0.0003662-0.0004883l45.0211754-58.3474121v0.000061l2.3292847-3.0187988 l23.06073-29.8866577c0.0009766-0.0012817,0.0018311-0.0026855,0.0028076-0.0039673l8.1424866-10.5527649 C140.6492767,114.5908966,140.6492615,112.1806793,139.3157501,110.4524536z"/></svg>`;
  }

  move = 300;

  div_clone2 = GeneralJs.nodes.div.cloneNode(true);
  div_clone2.insertAdjacentHTML(`beforeend`, arrowString("#ffffff"));
  div_clone2.classList.add("hoverDefault");
  style = {
    display: "block",
    position: "absolute",
    width: String(28) + ea,
    height: String(46) + ea,
    top: String(35) + ea,
    right: String(36) + ea,
    cursor: "pointer",
  };
  for (let i in style) {
    div_clone2.style[i] = style[i];
  }

  moveEventLeft = function (e) {
    const targets = document.querySelectorAll(".moveTarget");
    const ea = "px";
    const translateFunc = function (past) {
      const newValue = Number(past.replace(/[^0-9\-]/g, '')) - move;
      return ("translateX(" + String(newValue) + ea + ")");
    }
    for (let target of targets) {
      if (target.style.transform === '') {
        target.style.transform = "translateX(" + String(-1 * move) + ea + ")";
      } else {
        target.style.transform = translateFunc(target.style.transform);
      }
      if (Number(target.style.transform.replace(/[^0-9\-]/g, '')) > 0) {
        target.style.transform = "translateX(0px)";
      } else if ((-1 * (Number(target.style.width.replace(/[^0-9]/g, '')) - (window.innerWidth - 20))) > Number(target.style.transform.replace(/[^0-9\-]/g, ''))) {
        target.style.transform = "translateX(" + String(-1 * (Number(target.style.width.replace(/[^0-9]/g, '')) - (window.innerWidth - 20))) + ea + ")";
      }
    }
  }

  div_clone2.addEventListener("click", moveEventLeft);
  this.belowButtons.arrow.left = div_clone2;
  div_clone.appendChild(div_clone2);

  div_clone2 = GeneralJs.nodes.div.cloneNode(true);
  div_clone2.insertAdjacentHTML(`beforeend`, arrowString("#ffffff"));
  div_clone2.classList.add("hoverDefault");
  for (let i in style) {
    div_clone2.style[i] = style[i];
  }
  div_clone2.style.top = String(34) + ea;
  div_clone2.style.right = String(83) + ea;
  div_clone2.style.transform = "rotate(180deg)";

  moveEventRight = function (e) {
    const targets = document.querySelectorAll(".moveTarget");
    const ea = "px";
    const translateFunc = function (past) {
      const newValue = Number(past.replace(/[^0-9\-]/g, '')) + move;
      return ("translateX(" + String(newValue) + ea + ")");
    }
    for (let target of targets) {
      if (target.style.transform === '') {
        target.style.transform = "translateX(" + String(move) + ea + ")";
      } else {
        target.style.transform = translateFunc(target.style.transform);
      }
      if (Number(target.style.transform.replace(/[^0-9\-]/g, '')) > 0) {
        target.style.transform = "translateX(0px)";
      } else if ((-1 * (Number(target.style.width.replace(/[^0-9]/g, '')) - (window.innerWidth - 20))) > Number(target.style.transform.replace(/[^0-9\-]/g, ''))) {
        target.style.transform = "translateX(" + String(-1 * (Number(target.style.width.replace(/[^0-9]/g, '')) - (window.innerWidth - 20))) + ea + ")";
      }
    }
  }

  div_clone2.addEventListener("click", moveEventRight);
  this.belowButtons.arrow.right = div_clone2;
  div_clone.appendChild(div_clone2);

  div_clone2 = GeneralJs.nodes.div.cloneNode(true);
  div_clone2.classList.add("hoverDefault");
  style = {
    display: "block",
    position: "absolute",
    width: String(20) + ea,
    height: String(20) + ea,
    top: String(34) + ea,
    right: String(127) + ea,
    cursor: "pointer",
    background: "#ffffff",
    borderRadius: String(3) + ea,
  };
  for (let i in style) {
    div_clone2.style[i] = style[i];
  }
  this.belowButtons.square.up = div_clone2;
  div_clone.appendChild(div_clone2);

  div_clone2 = GeneralJs.nodes.div.cloneNode(true);
  div_clone2.classList.add("hoverDefault");
  for (let i in style) {
    div_clone2.style[i] = style[i];
  }
  div_clone2.style.top = String(60) + ea;
  this.belowButtons.square.down = div_clone2;
  div_clone.appendChild(div_clone2);

  this.totalContents.appendChild(div_clone);
}
