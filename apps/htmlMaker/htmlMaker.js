const HtmlMaker = function (mother = null, back = null, address = null) {
  if (mother !== null && back !== null && address !== null) {
    this.mother = mother;
    this.back = back;
    this.address = address;
  } else {
    const Mother = require(process.cwd() + "/apps/mother.js");
    const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js");
    const ADDRESS = require(process.cwd() + "/apps/infoObj.js");
    this.mother = new Mother();
    this.back = new BackMaker();
    this.address = ADDRESS;
  }
  this.dir = process.cwd() + "/apps/htmlMaker";
}

HtmlMaker.prototype.returnHtml = async function (func) {
  if (typeof func !== "function") {
    throw new Error("invaild input");
  }
  const instance = this;
  const jsdom = require("jsdom");
  const { JSDOM } = jsdom;
  const address = this.address;
  const { mediaQuery, fileSystem } = this.mother;
  const S3HOST = "https://" + this.address.officeinfo.ghost.host;
  const SSEHOST = address.host;
  const SSEHOST_CONSOLE = this.address.backinfo.host;
  const FILEHOST = this.address.officeinfo.ghost.host;
  const BRIDGEHOST = "https://" + this.address.transinfo.host + ":3000";
  const PYTHONHOST = "https://" + this.address.pythoninfo.host + ":3000";
  const LOGHOST = "https://" + this.address.testinfo.host + ":3000";
  const FRONTHOST = "https://" + this.address.frontinfo.host;
  const BACKHOST = "https://" + this.address.backinfo.host + ":3000";
  const SECONDHOST = "https://" + this.address.secondinfo.host + ":3000";
  try {
    let rawHtml, html, dom;
    let s3String;
    let sseString;
    let sseConsoleString;
    let pythonString;
    let bridgeString;
    let logString;
    let frontWebString;
    let backString;
    let secondString;
    let officeString;
    let svgTongString;
    let generalString;
    let consoleGeneralString;
    let generalCode;
    let localCode;
    let code0, code1;

    s3String = "const S3HOST = \"" + S3HOST + "\";";
    sseString = "const SSEHOST = \"" + SSEHOST + "\";";
    sseConsoleString = "const SSEHOST_CONSOLE = \"" + SSEHOST_CONSOLE + "\";";
    pythonString = "const PYTHONHOST = \"" + PYTHONHOST + "\";";
    bridgeString = "const BRIDGEHOST = \"" + BRIDGEHOST + "\";";
    logString = "const LOGHOST = \"" + LOGHOST + "\";";
    frontWebString = "const FRONTHOST = \"" + FRONTHOST + "\";";
    backString = "const BACKHOST = \"" + BACKHOST + "\";";
    secondString = "const SECONDHOST = \"" + SECONDHOST + "\";";
    officeString = "const FILEHOST = \"" + FILEHOST + "\";";
    svgTongString = await fileSystem(`readString`, [ `${process.cwd()}/apps/frontMaker/string/svgTong.js` ]);
    generalString = await fileSystem(`readString`, [ `${process.cwd()}/apps/frontMaker/source/jsGeneral/general.js` ]);
    consoleGeneralString = await fileSystem(`readString`, [ `${process.cwd()}/apps/dataConsole/router/source/general/general.js` ]);

    code0 = svgTongString + "\n\n" + s3String + "\n\n" + sseString + "\n\n" + sseConsoleString + "\n\n" + pythonString + "\n\n" + bridgeString + "\n\n" + logString + "\n\n" + backString + "\n\n" + secondString + "\n\n" + frontWebString + "\n\n" + officeString + "\n\n";
    code1 = generalString + "\n\n" + consoleGeneralString;

    generalCode = mediaQuery(code0 + "\n\n" + code1);

    localCode = `
    const LocalJs = function () { this.mother = new GeneralJs(); };
    LocalJs.prototype.launching = ${func.toString()};
    const app = new LocalJs();app.launching().catch((err) => { console.log(err); });`;

    rawHtml = `<!DOCTYPE html><html><head><style></style></head><body><div id="totalcontents">
    <style>
    @font-face {
      font-family: 'sandoll';
      src: url('${FRONTHOST}/designSource/font/sandoll/AppleSDGothicNeoB00.woff2') format('woff2'),
          url('${FRONTHOST}/designSource/font/sandoll/AppleSDGothicNeoB00.woff') format('woff');
      font-weight: 700;
      font-style: normal;
    }
    @font-face {
        font-family: 'sandoll';
        src: url('${FRONTHOST}/designSource/font/sandoll/AppleSDGothicNeoR00.woff2') format('woff2'),
            url('${FRONTHOST}/designSource/font/sandoll/AppleSDGothicNeoR00.woff') format('woff');
        font-weight: 400;
        font-style: normal;
    }
    @font-face {
        font-family: 'sandoll';
        src: url('${FRONTHOST}/designSource/font/sandoll/AppleSDGothicNeoM00.woff2') format('woff2'),
            url('${FRONTHOST}/designSource/font/sandoll/AppleSDGothicNeoM00.woff') format('woff');
        font-weight: 500;
        font-style: normal;
    }
    @font-face {
        font-family: 'sandoll';
        src: url('${FRONTHOST}/designSource/font/sandoll/AppleSDGothicNeoEB00.woff2') format('woff2'),
            url('${FRONTHOST}/designSource/font/sandoll/AppleSDGothicNeoEB00.woff') format('woff');
        font-weight: 800;
        font-style: normal;
    }
    @font-face {
        font-family: 'sandoll';
        src: url('${FRONTHOST}/designSource/font/sandoll/AppleSDGothicNeoSB00.woff2') format('woff2'),
            url('${FRONTHOST}/designSource/font/sandoll/AppleSDGothicNeoSB00.woff') format('woff');
        font-weight: 600;
        font-style: normal;
    }
    @font-face {
        font-family: 'sandoll';
        src: url('${FRONTHOST}/designSource/font/sandoll/AppleSDGothicNeoUL00.woff2') format('woff2'),
            url('${FRONTHOST}/designSource/font/sandoll/AppleSDGothicNeoUL00.woff') format('woff');
        font-weight: 200;
        font-style: normal;
    }
    @font-face {
        font-family: 'sandoll';
        src: url('${FRONTHOST}/designSource/font/sandoll/AppleSDGothicNeoT00.woff2') format('woff2'),
            url('${FRONTHOST}/designSource/font/sandoll/AppleSDGothicNeoT00.woff') format('woff');
        font-weight: 100;
        font-style: normal;
    }
    @font-face {
        font-family: 'sandoll';
        src: url('${FRONTHOST}/designSource/font/sandoll/AppleSDGothicNeoH00.woff2') format('woff2'),
            url('${FRONTHOST}/designSource/font/sandoll/AppleSDGothicNeoH00.woff') format('woff');
        font-weight: 900;
        font-style: normal;
    }
    @font-face {
        font-family: 'sandoll';
        src: url('${FRONTHOST}/designSource/font/sandoll/AppleSDGothicNeoL00.woff2') format('woff2'),
            url('${FRONTHOST}/designSource/font/sandoll/AppleSDGothicNeoL00.woff') format('woff');
        font-weight: 300;
        font-style: normal;
    }
    @font-face {
        font-family: 'Futura';
        src: url('${FRONTHOST}/designSource/font/futura/Futura-Medium.woff2') format('woff2'),
            url('${FRONTHOST}/designSource/font/futura/Futura-Medium.woff') format('woff');
        font-weight: 500;
        font-style: normal;
    }
    @font-face {
        font-family: 'Futura';
        src: url('${FRONTHOST}/designSource/font/futura/Futura-Bold.woff2') format('woff2'),
            url('${FRONTHOST}/designSource/font/futura/Futura-Bold.woff') format('woff');
        font-weight: 600;
        font-style: normal;
    }
    @font-face {
        font-family: 'graphik';
        src: url('${FRONTHOST}/designSource/font/graphik/Graphik-Light.woff2') format('woff2'),
            url('${FRONTHOST}/designSource/font/graphik/Graphik-Light.woff') format('woff');
        font-weight: 200;
        font-style: normal;
    }
    @font-face {
        font-family: 'graphik';
        src: url('${FRONTHOST}/designSource/font/graphik/Graphik-LightItalic.woff2') format('woff2'),
            url('${FRONTHOST}/designSource/font/graphik/Graphik-LightItalic.woff') format('woff');
        font-weight: 200;
        font-style: italic;
    }
    @font-face {
        font-family: 'graphik';
        src: url('${FRONTHOST}/designSource/font/graphik/Graphik-Regular.woff2') format('woff2'),
            url('${FRONTHOST}/designSource/font/graphik/Graphik-Regular.woff') format('woff');
        font-weight: 300;
        font-style: normal;
    }
    @font-face {
        font-family: 'graphik';
        src: url('${FRONTHOST}/designSource/font/graphik/Graphik-RegularItalic.woff2') format('woff2'),
            url('${FRONTHOST}/designSource/font/graphik/Graphik-RegularItalic.woff') format('woff');
        font-weight: 300;
        font-style: italic;
    }
    @font-face {
        font-family: 'graphik';
        src: url('${FRONTHOST}/designSource/font/graphik/Graphik-Medium.woff2') format('woff2'),
            url('${FRONTHOST}/designSource/font/graphik/Graphik-Medium.woff') format('woff');
        font-weight: 400;
        font-style: normal;
    }

    @font-face {
        font-family: 'graphik';
        src: url('${FRONTHOST}/designSource/font/graphik/Graphik-MediumItalic.woff2') format('woff2'),
            url('${FRONTHOST}/designSource/font/graphik/Graphik-MediumItalic.woff') format('woff');
        font-weight: 400;
        font-style: italic;
    }
    @font-face {
        font-family: 'graphik';
        src: url('${FRONTHOST}/designSource/font/graphik/Graphik-Semibold.woff2') format('woff2'),
            url('${FRONTHOST}/designSource/font/graphik/Graphik-Semibold.woff') format('woff');
        font-weight: 500;
        font-style: normal;
    }
    @font-face {
        font-family: 'graphik';
        src: url('${FRONTHOST}/designSource/font/graphik/Graphik-SemiboldItalic.woff2') format('woff2'),
            url('${FRONTHOST}/designSource/font/graphik/Graphik-SemiboldItalic.woff') format('woff');
        font-weight: 500;
        font-style: italic;
    }
    @font-face {
        font-family: 'graphik';
        src: url('${FRONTHOST}/designSource/font/graphik/Graphik-Bold.woff2') format('woff2'),
            url('${FRONTHOST}/designSource/font/graphik/Graphik-Bold.woff') format('woff');
        font-weight: 600;
        font-style: normal;
    }
    @font-face {
        font-family: 'graphik';
        src: url('${FRONTHOST}/designSource/font/graphik/Graphik-BoldItalic.woff2') format('woff2'),
            url('${FRONTHOST}/designSource/font/graphik/Graphik-BoldItalic.woff') format('woff');
        font-weight: 600;
        font-style: italic;
    }
    html{-webkit-text-size-adjust:100%;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing: grayscale;-ms-touch-action: manipulation;touch-action: manipulation;}
    *{margin:0;padding:0;transition:all 0.3s ease;font-family:'sandoll';-webkit-tap-highlight-color: transparent;}
    *::-webkit-scrollbar{display:none;}
    body{transition:all 0s ease;}
    body,div{font-size:0;color:#202020;margin:0;}
    a{text-decoration:inherit;color:inherit;-webkit-tap-highlight-color:rgba(0,0,0,0);background:0 0;outline:0}
    textarea{resize:none}
    b,strong{font-weight:inherit;display:inline;}
    img{border:0}
    button,input,optgroup,select,textarea{color:inherit;font:inherit;margin:0}
    button,html input[type=button],input[type=submit]{-webkit-appearance:button;cursor:pointer;box-sizing:border-box;white-space: normal}
    input[type=text],input[type=password],textarea{-webkit-appearance:none;appearance: none;box-sizing:border-box;background-color:#ffffff}
    input{line-height:normal}
    input[type=checkbox],input[type=radio]{box-sizing:border-box;padding:0}
    input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{height:auto}input[type=search]{-webkit-appearance:textfield;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box}
    input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration{-webkit-appearance:none}
    p{overflow:hidden;}
    label{cursor:pointer}
    article,section{margin:0;}
    @keyframes in{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0px);}}
    @keyframes fa{from{opacity:0;}to{opacity:1;}}
    @keyframes flash{from,80%,to{opacity:0}30%,50%{opacity:0.85}}
    #totalcontents{display:block;position:relative;left:0;top:0;height:100vh;width:100%;background-color:#ffffff;transition:all 0s ease;}
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
    </style>
    </div><script>const totalContents = document.getElementById("totalcontents");const ea = "px";\n\n${generalCode.code};\n\nconst { createNode, createNodes, withOut, colorChip, ajaxJson, ajaxForm, serviceParsing, stringToDate, dateToString, cleanChildren, isMac, isIphone, autoComma, downloadFile, blankHref, removeByClass, equalJson, svgMaker } = GeneralJs;\n\n${ mediaQuery(localCode).code};</script></body></html>`;

    dom = new JSDOM(rawHtml, { runScripts: "dangerously" });
    html = dom.window.document.getElementById("totalcontents").innerHTML;

    return html;

  } catch (e) {
    console.log(e);
  }
}

HtmlMaker.prototype.htmlView = async function (func) {
  if (typeof func !== "function") {
    throw new Error("invaild input");
  }
  const instance = this;
  const { fileSystem, shellExec, shellLink, uniqueValue } = this.mother;
  const tempDir = process.cwd() + "/temp";
  try {
    const html = await this.returnHtml(func);
    const fullHtml = `<!DOCTYPE html><html><head><style></style></head><body>${html}</body></html>`;
    let tempName;
    let tempFullName;

    console.log(html);

    tempName = "tempHtml_" + uniqueValue("hex") + ".html";
    tempFullName = tempDir + "/" + tempName;
    await fileSystem(`write`, [ tempFullName, fullHtml ]);
    await shellExec(`open`, [ tempFullName ]);

  } catch (e) {
    console.log(e);
  }
}

module.exports = HtmlMaker;
