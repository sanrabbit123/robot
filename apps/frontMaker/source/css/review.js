module.exports = function () {
  const dewidthmw = [ 1400, 1050 ];
  const dewidthme = [ 0.238, 0.016, 0.29, 0.045 ];

  function css_deflexible(){
    let html = '';
    html += '.reviliblock{display:inline-block;position:relative;margin-top:' + String(dewidthmw[0]*dewidthme[3]) + 'px;margin-right:' + String(dewidthmw[0]*dewidthme[1]) + 'px;height:' + String(dewidthmw[0]*dewidthme[2]) + 'px;}';
    html += '@media (min-width:1611px) {';
    html += '.porlicontent{display:block;position:relative;top:-' + String(dewidthmw[0]*dewidthme[3]*(3/4)) + 'px;left:50%;margin-left:-' + String(dewidthmw[0]/2) + 'px;width:' + String(dewidthmw[0]+(dewidthme[1]*dewidthmw[0])) + 'px;height:auto;}';
    html += '.psero{width:' + String(dewidthmw[0]*dewidthme[0]) + 'px;}';
    html += '.pgaro{width:' + String(dewidthmw[0]*((dewidthme[0]*2)+dewidthme[1])) + 'px;}';
    html += '.porli2s1position{display:block;position:relative;width:1400px;height:66px;left:50%;margin-left:-699px;}';
    html += '.graybari{position:absolute;top:28px;left:138px;width:' + String(dewidthmw[0]-139) + 'px;height:1.5px;background-color:#f7f7f7;border-radius:1px;}';
    html += '}';
    html += '@media (min-width:901px) and (max-width:1610px) {';
    html += '.porlicontent{display:block;position:relative;top:-' + String(dewidthmw[1]*dewidthme[3]) + 'px;left:50%;margin-left:-' + String(dewidthmw[1]/2) + 'px;width:' + String(dewidthmw[1]+((dewidthme[1]*2)*dewidthmw[1])) + 'px;height:auto;}';
    html += '.psero{width:' + String(dewidthmw[0]*(dewidthme[0]*1.005)) + 'px;}';
    html += '.pgaro{width:' + String(dewidthmw[0]*((dewidthme[0]*2.01)+dewidthme[1])) + 'px;}';
    html += '.porli2s1position{display:block;position:relative;width:1050px;height:66px;left:50%;margin-left:-525px;}';
    html += '.graybari{position:absolute;top:28px;left:138px;width:' + String(dewidthmw[1]-139) + 'px;height:1.5px;background-color:#f7f7f7;border-radius:1px;}';
    html += '}';
    return html;
  }

  function css_degeneral(){
    let html = '#bodymain0817{position:relative;top:0px;width:100%;}';
    html += "#porli2s0back0817{display:block;position:relative;top:0;margin-bottom:56px;width:100%;height:336px;}";
    html += "#porli2s0position{display:block;position:absolute;top:157px;width:600px;height:128px;left:50%;margin-left:-300px;}";
    html += "#totalcontents{display:block;position:relative;padding-top: 71px;width:100%;height:auto;}";
    html += "#mototalcontents{display:none;}";
    html += ".revrevrevimg{position:absolute;top:0;left:0;width:100%;height:100%}";
    html += ".revrevrevimgti{position:absolute;top:0;left:19.2px;width:306.9px;height:100%}";
    html += ".revrevrevimgetc1{position:absolute;top:1px;left:0;width:13.2px;height:29%}";
    html += ".revrevrevimgetc2{position:absolute;bottom:3px;right:0.5px;width:48px;height:31%}";
    html += ".revibackdiv{background-size: auto 100%;background-position: 50% 50%;}";
    html += ".revibackdivg{background-size: 100% auto;background-position: 50% 50%;}";
    html += ".porporporimg{position:absolute;top:0;left:0;width:100%;height:100%}";
    html += ".porporporimgh{position:absolute;top:0;left:0;height:100%}";
    html += ".reviliblock1{display:block;position:relative;background-color:#f7f7f7;background-size:auto 100%;background-position:50% 50%;background-repeat:no-repeat;width:100%;height:333px;border-radius:3px;overflow:hidden;}";
    html += ".reviliblock2{display:block;position:relative;margin-top:24px;width:100%;height:43px;}";
    html += ".reviliblock3{display:block;position:relative;background-color:#f7f7f7;background-size:100% auto;background-position:50% 50%;background-repeat:no-repeat;width:100%;height:333px;border-radius:3px;overflow:hidden;}";
    html += ".piho{opacity:0;transition:all 0.5s ease;}";
    html += ".piho:hover{opacity:1;}";
    html += ".pwho{background-color:#fff;opacity:0;transition:all 0.5s ease;border-radius:3px;overflow:hidden;}";
    html += ".pwho:hover{opacity:0.6;}";
    html += ".porhoverblack{position:absolute;top:0;width:100%;height:100%;background-color:#000;opacity:0.5;}";
    html += ".porhoverwhite{position:absolute;top:0;width:100%;height:100%;background-color:#fff;opacity:0.5;}";
    html += "#porlibelowback{display:block;position:relative;width:100%;height:278px;background-color:#f7f7f7;margin-top:170px;}";
    html += ".polilabel{cursor:pointer;}";
    html += "#pordbelowback{display:block;position:relative;width:100%;height:278px;background-color:#f7f7f7;}";
    html += "#pordbelowbox{display:block;position:relative;top:22px;width:875px;height:auto;left:50%;margin-left:-437.5px;}";
    html += ".pordbelowsvg{position:absolute;top:0;left:0;width:100%;}";
    html += ".pordbelowbubu{position:absolute;top:75px;width:135px;height:58px;background-color:#f7f7f7;opacity:0;transition:all 0.5s ease;}";
    html += ".pordbelowbubu:hover{opacity:0.6;}";
    html += "#pordbelowbutton1{left:72px;}";
    html += "#pordbelowbutton2{left:368px;}";
    html += "#pordbelowbutton3{left:663px;}";
    return html;
  }

  function css_mogeneral(){
    let html = '@media (max-width:900px) {';
    // general
    html += "#totalcontents{display:none;}";
    html += "#mototalcontents{display:block;position:relative;width:100%;}";
    html += ".mofooterbelow,.momafooter{display:block;position:relative;width:100%}";
    html += ".mfbelbutton{position:absolute;height:10vw;top:8vw;}";
    html += ".mfbelbu1{left:17vw;width:20vw;}";
    html += ".mfbelbu2{left:41vw;width:20vw;}";
    html += ".mfbelbu3{left:64vw;width:20vw;}";
    html += ".moblockrela{display:block;position:relative;}";
    html += ".mocenter{margin-left:auto;margin-right:auto;}";
    // local
    html += "#moporli2s0back0817{display:block;position:relative;top:0;width:100%;height:255px;margin-bottom: 7vw;}";
    html += "#moporli2s0position{display:block;position:absolute;top:61px;width:320px;height:auto;left:50%;margin-left:-160px;}";
    html += ".moporlicontent{display:block;position:relative;left:50%;top:0.5vw;margin-left:-43.9vw;margin-bottom:15vw;width:90.7vw;height:auto;}";
    html += ".moreviliblock{display:inline-block;position:relative;margin-top:1.4vw;margin-right:2.8vw;height:58.5vw;}";
    html += ".mopsero{width:42.5vw;}";
    html += ".mopgaro{width:87.9vw;}";
    html += ".moportliblock1{display:block;position:relative;background-color:#f7f7f7;background-size:auto 100%;background-position:50% 50%;background-repeat:no-repeat;width:100%;height:42.5vw;border-radius:3px;overflow:hidden;}";
    html += ".moreviliblock2{display:block;position:relative;margin-top:3.2vw;width:100%;height:10vw;overflow:hidden;}";
    html += ".moportliblock3{display:block;position:relative;background-color:#f7f7f7;background-size:100% auto;background-position:50% 50%;background-repeat:no-repeat;width:100%;height:42.5vw;border-radius:3px;overflow:hidden;}";
    html += ".moporlimargin0{display:block;width:100%;height:8.6vw;background-color:transparent;opacity:0;}";
    html += ".moporlimargin1{display:block;width:100%;height:3.4vw;background-color:transparent;opacity:0;}";
    html += ".moporlimargin2{display:block;width:100%;height:2.4vw;background-color:transparent;opacity:0;}";
    html += "#moporli2s1position{display:block;position:relative;width:87.5vw;height:11vw;margin-left:auto;margin-right:auto;}";
    html += ".moporporporimg{position:absolute;top:0;left:0;width:100%;height:auto}";
    html += ".morevrevrevimgetc1{position:absolute;top:0;left:0;width:2.5vw;height:2.6vw}";
    html += ".morevrevrevimgetc2{position:absolute;bottom:4.9vw;right:0.2vw;width:6vw;height:2vw}";
    html += ".morevrevrevimg{position:absolute;top:0;left:3.6vw;width:46vw;height:auto}";
    html += "#moporlidelidediv{position:absolute;top:100%;left:59.4%;width:22%;height:250%;z-index:100;transform-origin:0 0;transition:all 0.1s ease;}";
    html += ".mplgimg1{background-position: 50% 50%;background-size:auto 100%;}";
    html += '}';
    return html;
  }

  return (css_deflexible() + css_degeneral() + css_mogeneral());
}
