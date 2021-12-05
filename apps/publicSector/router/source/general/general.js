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
  body{transition:all 0s ease;}
  input::placeholder {color:${GeneralJs.colorChip.whiteIcon};opacity:0.5;}
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
  @keyframes profilefadeup{from{opacity:0;transform:translateY(10px);}to{opacity:0.9;transform:translateY(0px);}}
  @keyframes communicationfadeup{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0px);}}
  @keyframes fadedowndelay{from{opacity:1;transform:translateY(0px);}70%,to{opacity:0;transform:translateY(-5px);}}

  @keyframes fadeout{from{opacity:1;transform:translateX(0px);}to{opacity:0;transform:translateX(-30px);}}
  @keyframes fadein{from{opacity:0;transform:translateX(30px);}to{opacity:1;transform:translateX(0px);}}
  @keyframes fadeoutlite{from{opacity:1;transform:translateX(0px);}to{opacity:0;transform:translateX(-20px);}}
  @keyframes fadeinlite{from{opacity:0;transform:translateX(20px);}to{opacity:1;transform:translateX(0px);}}
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
