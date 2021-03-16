module.exports = function () {
  let html = `
  @font-face {
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: local('Noto Sans KR Regular'), local('NotoSansKR-Regular'), url('/notoSans.woff2') format('woff2');
  unicode-range: U+20-22, U+27-2a, U+2c-38, U+3a-3b, U+3f, U+41-47, U+4a-4c, U+4f-5d, U+61-7b, U+7d, U+a1, U+ab, U+ae, U+b7, U+bb, U+bf, U+2013-2014, U+201c-201d, U+2122, U+ac00, U+ace0, U+ae30, U+b2e4, U+b85c, U+b9ac, U+c0ac, U+c2a4, U+c2dc, U+c774, U+c778, U+c9c0, U+d558;}
  html{font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale}
  *{-webkit-tap-highlight-color: transparent;}
  body{margin:0}
  body,div{font-size:0;-ms-overflow-style: none;}
  body::-webkit-scrollbar{display:none;}
  div::-webkit-scrollbar{display:none;}
  sup{font-size:inherit;vertical-align:baseline;position:relative;top:-0.4em}
  sub{font-size:inherit;vertical-align:baseline;position:relative;top:0.4em}
  form{display:inline-block}
  a{text-decoration:inherit;color:inherit;-webkit-tap-highlight-color:rgba(0,0,0,0);background:0 0;outline:0}
  textarea{resize:none;-ms-overflow-style: none}
  audio,video{display:inline-block;vertical-align:baseline}
  audio:not([controls]){display:none;height:0}[hidden],template{display:none}
  b,strong{font-weight:700}
  h1,h2,h3,h4,h5,h6{font-size:1em;line-height:1;margin:0em 0}
  img{border:0}
  svg:not(:root){overflow:hidden}
  button,input,optgroup,select,textarea{color:inherit;font:inherit;margin:0}
  button{overflow:visible}button,select{text-transform:none}
  button,html input[type=button],input[type=submit]{-webkit-appearance:button;cursor:pointer;box-sizing:border-box;white-space: normal}
  input[type=text],input[type=password],textarea{-webkit-appearance:none;appearance: none;box-sizing:border-box}
  button[disabled],html input[disabled]{cursor:default}
  button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0}
  input{line-height:normal}
  input[type=checkbox],input[type=radio]{box-sizing:border-box;padding:0}
  input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{height:auto}input[type=search]{-webkit-appearance:textfield;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box}
  input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration{-webkit-appearance:none}
  svg{shape-rendering:geometricPrecision}
  *::-webkit-scrollbar{display:none;}

  @keyframes fadeInmain0821 {from { opacity: 0; } 50% { opacity: 0; } to { opacity: 1; }}
  @keyframes fadeInmainout0821 {from { opacity: 1; } 50% { opacity: 1; } to { opacity: 0; }}
  @keyframes loadingrotate{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
  @keyframes justfadein {from{opacity:0;}to{opacity:1;}}
  @keyframes justfadeout {from{opacity:1;}to{opacity:0;}}
  @keyframes talkfade {from,30%{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0px)}}
  @keyframes talkwhitefade {from,85%{opacity:0;transform:translateX(8px)} to{opacity:1;transform:translateX(0px)}}
  @keyframes talkwhitefadeout {from{opacity:1;transform:translateX(0px)} to{opacity:0;transform:translateX(-12px)}}
  @keyframes talkwhitefadeconvert {from,10%{opacity:0;transform:translateX(12px)} to{opacity:1;transform:translateX(0px)}}
  @keyframes fadecancel{from{opacity:0}to{opacity:0.2}}
  @keyframes fadeout{from,50%{opacity:1;}to{opacity:0;}}
  @keyframes fadein{from,30%{opacity:0;}to{opacity:1;}}
  @keyframes fadedown{from,50%{opacity:1;transform:translateY(0px);}to{opacity:0;transform:translateY(10px);}}
  @keyframes fadeup{from,30%{opacity:0;transform: translateY(9px);}to{opacity:1;transform:translateY(0px);}}

  .fadeInmaininit{opacity:0;}
  .fadeInmainclass{animation:fadeInmain0821 1.1s ease forwards;}
  #loader{position:fixed;width:100%;height:100vh;top:0;left:0;}
  .loaderfadeout{animation:fadeInmainout0821 1.1s ease forwards;}
  .loading{position:absolute;left:50%;transform:rotate(0deg);transform-origin:50% 50%;animation:loadingrotate 1.7s linear 50;}
  @media (min-width:1611px) {.loaderc{width:60px;height:60px;margin-left:-30px;top:46vh;}}
  @media (min-width:901px) and (max-width:1610px) {.loaderc{width:50px;height:50px;margin-left:-25px;top:46vh;}}
  @media (max-width:900px) {.loaderc{width:40px;height:40px;margin-left:-20px;top:46vh;}}

  .hiddenobject{display:none;opacity:0;width:0;height:0;overflow:hidden;font-size:0;}
  #mobilenavihome,#menuBtn2bae0612{display:none;}

  #footergreenback0817{display:block;position:relative;width:100%;height:300px;background-color:#2fa678;}
  #hiddentextmain0817{display:block;position:absolute;top:0;left:0;width:100%;height:auto;color:transparent;font-size:15px;line-height:27px;opacity:0;z-index:-1;}
  #desknavihome{display:block;position:fixed;top:0;width:100%;height:72px;z-index:1000;background-color:#fff;overflow-x:hidden}
  #desknaviframe{display:block;position:relative;height:72px;top:0;transition:all 0.5s ease;text-align:center}
  .desknaviclick{position:absolute;opacity:1;transition:all 0.5s ease;cursor:pointer;}
  .desknaviclick:hover{opacity:0.5;}
  .desknavihover{transition:all 0.5s ease;}
  .desknavihover:hover{opacity:1;}
  .desknavimenuframe{display:inline-block;position:relative;margin-left:auto;margin-right:auto;top:24px}

  .maindeskfooter{display:block;position:absolute;top:64px;height:170px;left:50%;transition:all 0.5s ease;}
  .footerbutton{position:absolute;opacity:0;transition:all .5s ease;background-color:#2fa678;left:50%;cursor:pointer;}
  .footerbutton:hover{opacity:0.5;}
  .absolutedefault{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .hoverdefault{
    opacity: 1;
    transition:all 0.5s ease;
    cursor: pointer;
  }
  .hoverdefault:hover{ opacity: 0.5; }
  .mouseoverdefault{
    opacity: 0;
    transition:all 0.5s ease;
    cursor: pointer;
  }
  .hoverdefault_reverse{
    opacity: 0;
    transition:all 0.5s ease;
    cursor: pointer;
  }
  .hoverdefault_reverse:hover{ opacity: 0.4; }
  .mouseoverdefault{
    opacity: 0;
    transition:all 0.5s ease;
    cursor: pointer;
  }
  .mouseoverdefault:hover{ opacity: 0.5; }

  .inputdefault{
    width:100%;
    height:100%;
    border:0;
    outline:0;
    background-color:transparent;
    font-family:'Noto Sans KR', sans-serif;
    font-size:14px;
    height:28.5px;
    text-decoration:none;
    text-transform:none;
    color:#303030;
    line-height:17px;
    letter-spacing:-0.50px;
    text-shadow:none;
    padding:0;
    padding-bottom:3px;
    text-indent: 8px;
  }

  #loginbox_back{
    animation:fadecancel 0.4s ease forwards;
    transition:all 0.3s ease;
    position: fixed;
    top: 71px;
    left: 0;
    width: 100%;
    height: calc(100% - 71px);
    background: #606060;
    opacity: 0.2;
    z-index: 1;
  }
  #loginbox{
    animation: fadeup .4s ease forwards;
    transition:all 0.3s ease;
    position: fixed;
    top: calc(50% - 113px);
    left: calc(50% - 283.5px);
    width: 567px;
    height: 226px;
    box-shadow: 0px 5px 15px -14px #404040;
    z-index: 1;
  }


  @media (min-width:1611px) {
    #desknaviframe{width:1400px;left:calc(50% - 700px);}
    .maindeskfooterLeft{margin-left:-700px}
    .maindeskfooterRight{width:546px;margin-left:154px;}
    .f18home{width:225px;margin-left:-700px;top:66px;height:73px;}
    .f18faq{width:80px;margin-left:180px;top:120px;height:18px;}
    .f18card{width:70px;margin-left:264px;top:120px;height:18px;}
    .f18terms{width:190px;margin-left:145px;top:153px;height:17px;}
    .f18about{width:78px;margin-left:392px;top:120px;height:18px;}
    .f18port{width:72px;margin-left:398px;top:153px;height:17px;}
    .f18designer{width:62px;margin-left:410px;top:184px;height:17px;}
    .f18blog{width:64px;margin-left:409px;top:213px;height:17px;}
    .f18channel{width:163px;margin-left:539px;top:66px;height:25px;}
    .f18naverblog{width:52px;margin-left:558px;top:95px;height:25px;}
    .f18instagram{width:80px;margin-left:624px;top:95px;height:25px;}
    .f18designersubmit{width:100px;margin-left:604px;top:125px;height:25px;}
    .f18partnershipsubmit{width:60px;margin-left:531px;top:125px;height:25px;}

  }
  @media (min-width:901px) and (max-width:1610px) {
    #desknaviframe{width:1050px;left:calc(50% - 525px);}
    .maindeskfooterLeft{margin-left:-525px}
    .maindeskfooterRight{width:546px;margin-left:-20px;}
    .f18home{width:225px;margin-left:-525px;top:66px;height:73px;}
    .f18faq{width:74px;margin-left:10px;top:120px;height:18px;}
    .f18card{width:62px;margin-left:94px;top:120px;height:18px;}
    .f18terms{width:190px;margin-left:-28px;top:153px;height:17px;}
    .f18about{width:78px;margin-left:218px;top:120px;height:18px;}
    .f18port{width:72px;margin-left:224px;top:153px;height:17px;}
    .f18designer{width:62px;margin-left:235px;top:184px;height:17px;}
    .f18blog{width:64px;margin-left:234px;top:213px;height:17px;}
    .f18channel{width:163px;margin-left:365px;top:66px;height:25px;}
    .f18naverblog{width:50px;margin-left:384px;top:95px;height:25px;}
    .f18instagram{width:81px;margin-left:448px;top:95px;height:25px;}
    .f18designersubmit{width:100px;margin-left:428px;top:125px;height:25px;}
    .f18partnershipsubmit{width:60px;margin-left:356px;top:125px;height:25px;}

  }
  @media (max-width:900px) {
  #maindeskfooter0817,#desknavihome,#footergreenback0817{display:none;}
  #hiddentextmain0817{display:block;position:absolute;top:0;left:0;width:100%;height:auto;color:transparent;font-size:12px;line-height:15px;opacity:0;z-index:-1;}
  #mobilenavihome{display:block;position:-webkit-sticky;position:sticky;width:100%;top:0;height:60px;background-color:#fff;z-index:1000;}


  .mofooterbelow,.momafooter{display:block;position:relative;width:100%}
  .mfbelbutton{position:absolute;height:10vw;top:8vw;}
  .mfbelbu1{left:17vw;width:20vw;}
  .mfbelbu2{left:41vw;width:20vw;}
  .mfbelbu3{left:64vw;width:20vw;}
  .moblockrela{display:block;position:relative;}
  .mocenter{margin-left:auto;margin-right:auto;}


  .inputdefault{width:100%;height:100%;border:0;outline:0;background-color:transparent;font-family:'Noto Sans KR', sans-serif;font-size:3.5vw;height:6.4vw;text-decoration:none;text-transform:none;color:#303030;line-height:1.7;letter-spacing:-0.50px;text-shadow:none;padding:0;padding-bottom:0.5vw;}


  #mologinbox_back{
    animation:fadecancel 0.4s ease forwards;
    transition:all 0.3s ease;
    position: fixed;
    top: 60px;
    left: 0;
    width: 100%;
    height: calc(100% - 60px);
    background: #606060;
    opacity: 0.2;
    z-index: 1;
  }
  #mologinbox{
    animation: fadeup .4s ease forwards;
    transition:all 0.3s ease;
    position: fixed;
    top: calc(50% - 32vw);
    left: calc(50% - 39vw);
    width: 78vw;
    height: 62vw;
    box-shadow: 0px 5px 15px -14px #404040;
    z-index: 1;
  }




  }
  `;
  return html;
}
