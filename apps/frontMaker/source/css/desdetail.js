module.exports = function () {
  const orderarray = [[1,700/655],[1,7/6],[1200,1050],[1400,1050],['display:inline-block;','display:none;'],[18,12],['about.php','consulting.php']];
  const porlistratio = [0.238,0.016,0.41,0.045];

  function css_deflexible() {
    let html = '';
    html += '@media (min-width:1611px) {';
    html += '.porlicontent{display:block;position:relative;top:-' + String(orderarray[3][0]*porlistratio[3]*(3/4)) + 'px;left:50%;margin-left:-' + String(orderarray[3][0]/2) + 'px;width:' + String(orderarray[3][0]+(porlistratio[1]*orderarray[3][0])) + 'px;height:auto;}';
    html += '.psero{width:' + String(orderarray[3][0]*porlistratio[0]) + 'px;}';
    html += '.pgaro{width:' + String(orderarray[3][0]*((porlistratio[0]*2)+porlistratio[1])) + 'px;}';
    html += '#dedetaildesignerbox{margin-bottom:65px;}';
    html += '}';
    html += '@media (min-width:901px) and (max-width:1610px) {';
    html += '.porlicontent{display:block;position:relative;top:-' + String(orderarray[3][1]*porlistratio[3]) + 'px;left:50%;margin-left:-' + String(orderarray[3][1]/2) + 'px;width:' + String(orderarray[3][1]+((porlistratio[1]*2)*orderarray[3][1])) + 'px;height:auto;}';
    html += '.psero{width:' + String(orderarray[3][0]*(porlistratio[0]*1.005)) + 'px;}';
    html += '.pgaro{width:' + String(orderarray[3][0]*((porlistratio[0]*2.01)+porlistratio[1])) + 'px;}';
    html += '#dedetaildesignerbox{margin-bottom:45px;}';
    html += '}';
    return html;
  }

  function css_degeneral() {
    let html = '#bodymain0817{position:relative;top:0px;width:100%;}';
    html += '#porli2s0position{display:block;position:absolute;top:157px;width:600px;height:128px;left:50%;margin-left:-300px;}';
    html += '#totalcontents{display:block;position:relative;padding-top:259px;width:100%;height:auto;}';
    html += '#mototalcontents{display:none;}';
    //portfolio
    html += '.porporporimg{position:absolute;top:0;left:0;width:100%;height:100%}';
    html += '.porporporimgh{position:absolute;top:0;left:0;height:100%}';
    html += '.portliblock1{display:block;position:relative;background-color:#f7f7f7;background-size:100% 100%;background-position:50% 50%;background-repeat:no-repeat;width:100%;height:470px;border-radius:3px;overflow:hidden;}';
    html += '.portliblock2{display:block;position:relative;margin-top:24px;width:100%;height:80px;}';
    html += '.piho{opacity:0;transition:all 0.5s ease;}';
    html += '.piho:hover{opacity:1;}';
    html += '.pwho{background-color:#f7f7f7;opacity:0;transition:all 0.5s ease;border-radius:3px;overflow:hidden;}';
    html += '.pwho:hover{opacity:0.6;}';
    html += '.porhoverblack{position:absolute;top:0;width:100%;height:100%;background-color:#000;opacity:0.5;}';
    html += '.portliblock{display:inline-block;position:relative;margin-top:' + String(orderarray[3][0]*porlistratio[3]) + 'px;margin-right:' + String(orderarray[3][0]*porlistratio[1]) + 'px;height:' + String(orderarray[3][0]*porlistratio[2]) + 'px;}';
    //designer
    html += "#modede2s1,#modeli2s1position,#modelibelow,#modedetaildesignerbox{display:none;}";
    html += "#dedeback0{display:block;position:absolute;top:72px;width:100%;height:365px;background-color:#f2f2f2;}";
    html += "#dedeback1{display:block;position:absolute;top:0px;width:100%;height:100%;background-color:#f7f7f7;}";
    html += "#dedetail2s0position{display:block;position:absolute;top:175px;width:216px;height:40px;left:50%;margin-left:-108px;}";
    html += "#dedetaildesignerbox{display:block;position:relative;width:1050px;height:339px;left:50%;margin-left:-525px;background-color:#fff;}";
    html += "#dedeshadow1{position:absolute;width:1200px;left:50%;margin-left:-600px;top:287px;opacity:0.5;height:370px;}";
    html += ".dedemainimg{position:absolute;top:70px;left:73px;width:273px;height:193px;border-radius:3px;}";
    html += ".dedegray{position:absolute;background-color:#ececec;height:1px;border-radius:0.5px;}.dgybar1{top:85.5px;left:496px;width:455px;}.dgybar2{top:230px;left:395px;width:127px;}";
    html += ".dedesvgname{position:absolute;top:70px;left:394px;width:91px;height:33.5px;}";
    html += ".dedesvgmeth{position:absolute;left:395px;width:96px;height:16.5px;}.ddsmethod1{top:175px;}.ddsmethod2{top:199px;}";
    html += ".dedesvgdesc{position:absolute;top:174px;left:553px;width:407px;height:88px;}";
    html += ".dedegyeongbox{position:absolute;top:244px;left:395px;width:140px;height:15.5px;}";
    html += ".dedegyeongword{display:inline;position:relative;font-family:'Roboto',sans-serif;font-size:16px;margin-right:1px;top:-2px;color:#303030;letter-spacing:-0.5px;}.ddword1{margin-left:6px;}.ddword2{margin-left:2px;}";
    html += ".dedegyeong{display:inline-block;height:100%;}";
    html += ".ddgetc0{margin-left:6px;}.ddgetc1{margin-left:1px;    margin-right: 2px;}";
    html += "#dedebelowback{display:block;position:relative;width:100%;height:278px;background-color:#ffffff;margin-top:160px;}";
    html += "#dedebelowbox{display:block;position:relative;top:22px;width:875px;height:auto;left:50%;margin-left:-437.5px;}";
    html += ".dedebelowsvg{position:absolute;top:0;left:0;width:100%;}";
    html += ".dedebelowbubu{position:absolute;top:75px;width:135px;height:58px;background-color:#fff;opacity:0;transition:all 0.5s ease;}";
    html += ".dedebelowbubu:hover{opacity:0.6;}";
    html += "#dedebelowbutton1{left:72px;}#dedebelowbutton2{left:368px;}#dedebelowbutton3{left:663px;}";
    return html;
  }

  function css_mogeneral() {
    let html = "@media (max-width:900px) {";
    // general
    html += "#totalcontents{display:none;}";
    html += "#mototalcontents{display:block;position:relative;width:100%;padding-top:54px;}";
    html += ".mofooterbelow,.momafooter{display:block;position:relative;width:100%}";
    html += ".mfbelbutton{position:absolute;height:10vw;top:8vw;}";
    html += ".mfbelbu1{left:17vw;width:20vw;}";
    html += ".mfbelbu2{left:41vw;width:20vw;}";
    html += ".mfbelbu3{left:64vw;width:20vw;}";
    html += ".moblockrela{display:block;position:relative;}";
    html += ".mocenter{margin-left:auto;margin-right:auto;}";
    //local
    html += "#modedeback0{display:block;position:absolute;top:0;width:100%;height:310px;background-color:#f2f2f2;}";
    html += "#modedeback1{display:block;position:absolute;top:0;width:100%;height:100%;background-color:#f7f7f7;}";
    html += "#dedetail2s0position{display:block;position:absolute;top:108px;width:36vw;height:6vw;left:50vw;margin-left:-18vw;}";
    html += "#dedetail2stotal,#dedetaildesignerbox,#dedebelowback,#dedebelowbox,.dedemargin0,#dedeshadow1{display:none;}";
    html += "#modedetaildesignerbox{display:block;position:relative;width:87.9vw;margin-left:auto;margin-right:auto;margin-bottom:8.5vw;border-radius:1vw;padding-top:55vw;background-color: #fff;box-shadow: 0px 4.5px 14px -12px #606060}";
    html += ".modedegaro{display:block;position:relative;width:87.9vw;margin-left:auto;margin-right:auto;height:62.3vw;overflow:hidden;border-radius:3px;}";
    html += ".modedetigaro{display:block;position:relative;width:87.9vw;margin-left:auto;margin-right:auto;height:13vw;overflow:hidden;border-radius:3px;}";
    html += ".modedesero1{position:absolute;top:0;width:48.4%;height:100%;left:0;overflow:hidden;border-radius:3px;}";
    html += ".modedesero2{position:absolute;top:0;width:48.4%;height:100%;right:0;overflow:hidden;border-radius:3px;}";
    html += ".modededeimg{position:absolute;top:0;left:0;width:100%;height:auto}";
    html += ".modedemainimg{position:absolute;top:9.8vw;left:9.1vw;width:37.2vw;height:37.2vw;border-radius:18.6vw;}";
    html += ".modedesvgname{position:absolute;top:14.8vw;left:51.4vw;width:16vw;height:6vw;}";
    html += ".modedesvgmeth{position:absolute;left:51.5vw;width:20vw;height:3.5vw;}.moddsmethod1{top:25.2vw;}.moddsmethod2{top:29.8vw;}";
    html += ".modedegyeongbox{position:absolute;top:36.1vw;left:51.5vw;width:30vw;height:3vw;}";
    html += ".modedegyeongib{display:inline-block;height:100%;}.mogca1{margin-left:1vw;}.mogca2{margin-left:0.2vw;}";
    html += ".modedegyeongword{display:inline;position:relative;font-family:'Roboto',sans-serif;font-size:3.4vw;top:-0.2vw;color:#303030;margin-left:1vw}";
    html += ".modetail{display:block;position:relative;width:74.9vw;height:33vw;margin-left:auto;margin-right:auto;}";
    html += ".modivclass1{display:block;position:relative;height:17vw;}";
    html += ".modivclass2{position:absolute;background-color:#ececec;top:25%;left:50%;width:10vw;height:0.5vw;margin-left:-5vw;}";
    html += '#porli2s0back0817,#porli2s0position,#totalcontents{display:none;}';
    html += '#moporli2s0position{display:block;position:absolute;top:121px;width:320px;height:auto;left:50%;margin-left:-160px;}';
    html += '.moporlicontent{display:block;position:relative;top:-2.4vw;left:50%;margin-left:-43.9vw;width:90.7vw;height:auto;margin-bottom: 13vw;}';
    html += '.moportliblock{display:inline-block;position:relative;margin-top:3.6vw;margin-right:2.8vw;height:78.7vw;}';
    html += '.mopsero{width:42.5vw;}';
    html += '.mopgaro{width:87.9vw;}';
    html += '.moportliblock1{display:block;position:relative;background-color:#f7f7f7;background-size:100% 100%;background-position:50% 50%;background-repeat:no-repeat;width:100%;height:62.3vw;border-radius:3px;overflow:hidden;}';
    html += '.moportliblock2{display:block;position:relative;margin-top:1.6vw;width:100%;height:13vw;}';
    html += '.moporlimargin0{display:block;width:100%;height:8.6vw;background-color:transparent;opacity:0;}';
    html += '.moporlimargin1{display:block;width:100%;height:3.4vw;background-color:transparent;opacity:0;}';
    html += '.moporlimargin2{display:block;width:100%;height:2.4vw;background-color:transparent;opacity:0;}';
    html += '#moporli2s1position{display:block;position:relative;width:87.5vw;height:11vw;margin-left:auto;margin-right:auto;}';
    html += '.moporporporimg{position:absolute;top:0;left:0;width:100%;height:auto}';
    html += '}';
    return html;
  }
  return (css_deflexible() + css_degeneral() + css_mogeneral());
}
