module.exports = function () {
  const orderarray = [[1,700/655],[1,7/6],[1200,1050],[1400,1050],['display:inline-block;','display:none;'],[18,12],['about.php','consulting.php']];
  const porlistratio = [0.238,0.016,0.41,0.045];

  let html = `








  `;


  function css_deflexible() {
    let html = '';
    html += '.portliblock{display:inline-block;position:relative;margin-top:' + String(orderarray[3][0]*porlistratio[3]) + 'px;margin-right:' + String(orderarray[3][0]*porlistratio[1]) + 'px;height:' + String(orderarray[3][0]*porlistratio[2]) + 'px;}';
    html += '@media (min-width:1611px) {';
    html += '.porlicontent{display:block;position:relative;top:-' + String(orderarray[3][0]*porlistratio[3]*(3/4)) + 'px;left:50%;margin-left:-' + String(orderarray[3][0]/2) + 'px;width:' + String(orderarray[3][0]+(porlistratio[1]*orderarray[3][0])) + 'px;height:auto;}';
    html += '.psero{width:' + String(orderarray[3][0]*porlistratio[0]) + 'px;}';
    html += '.pgaro{width:' + String(orderarray[3][0]*((porlistratio[0]*2)+porlistratio[1])) + 'px;}';
    html += '.porli2s1position{display:block;position:relative;width:1400px;height:66px;left:50%;margin-left:-700px;}';
    html += '.graybari{position:absolute;top:28px;left:138px;width:' + String(orderarray[3][0]-139) + 'px;height:1.5px;background-color:#f7f7f7;border-radius:1px;}';
    html += '.polisearchbox{display:block;position:relative;top:0;left:50%;margin-left:-' + String(orderarray[3][0]/2) + 'px;height:55px;width:' + String(orderarray[3][0]) + 'px;}';
    html += '}';
    html += '@media (min-width:901px) and (max-width:1610px) {';
    html += '.porlicontent{display:block;position:relative;top:-' + String(orderarray[3][1]*porlistratio[3]) + 'px;left:50%;margin-left:-' + String(orderarray[3][1]/2) + 'px;width:' + String(orderarray[3][1]+((porlistratio[1]*2)*orderarray[3][1])) + 'px;height:auto;}';
    html += '.psero{width:' + String(orderarray[3][0]*(porlistratio[0]*1.005)) + 'px;}';
    html += '.pgaro{width:' + String(orderarray[3][0]*((porlistratio[0]*2.01)+porlistratio[1])) + 'px;}';
    html += '.porli2s1position{display:block;position:relative;width:1050px;height:66px;left:50%;margin-left:-525px;}';
    html += '.graybari{position:absolute;top:28px;left:138px;width:' + String(orderarray[3][1]-139) + 'px;height:1.5px;background-color:#f7f7f7;border-radius:1px;}';
    html += '.polisearchbox{display:block;position:relative;top:0;left:50%;margin-left:-' + String(orderarray[3][1]/2) + 'px;height:55px;width:' + String(orderarray[3][1]) + 'px;}';
    html += '}';
    return html;
  }

  function css_degeneral() {
    let html = '#bodymain0817{position:relative;top:0px;width:100%;}';
    html += '#totalcontents{display:block;position:relative;padding-top: 407px;width:100%;height:auto;}';
    html += '#polisearch{position:absolute;width:642px;height:42px;background-color:transparent;color:#303030;border:0;text-indent:12px;font-size:13pt;padding-bottom:4px;font-family: \'Noto Sans KR\', sans-serif;}';

    html += '.porporporimg{position:absolute;top:0;left:0;width:100%;height:100%}';
    html += '.porporporimgh{position:absolute;top:0;left:0;height:100%}';
    html += '.portliblock1{display:block;position:relative;background-color:#f7f7f7;background-size:100% 100%;background-position:50% 50%;background-repeat:no-repeat;width:100%;height:470px;border-radius:3px;overflow:hidden;}';
    html += '.portliblock2{display:block;position:relative;margin-top:24px;width:100%;height:80px;}';
    html += '.piho{opacity:0;transition:all 0.5s ease;}';
    html += '.piho:hover{opacity:1;}';
    html += '.pwho{background-color:#fff;opacity:0;transition:all 0.5s ease;border-radius:3px;overflow:hidden;}';
    html += '.pwho:hover{opacity:0.6;}';
    html += '.porhoverblack{position:absolute;top:0;width:100%;height:100%;background-color:#000;opacity:0.5;}';
    html += '#porlibelowback{display:block;position:relative;width:100%;height:278px;background-color:#f7f7f7;margin-top:190px;}';
    html += '#moporli2s0back0817,#moporli2s0position,#mototalcontents,#mopordbelow,.poliordered{display:none;}';
    html += '#polisearch01{display:block;position:relative;top:0;left:0;width:690px;height:42px;}';
    html += '#polisearch02{position:absolute;top:0;right:1px;width:182px;height:21px;}';
    html += '#polisearch03{position:absolute;top:21px;right:1px;width:182px;height:21px;}';
    html += '#porlidelidediv{position:absolute;top:42px;right:1px;width:107px;height:188px;z-index:100;transform-origin:0 0;transition:all 0.3s ease;overflow:hidden;}';
    html += '#porlidelideimg{top:-190px;transition:all 0.3s ease;}';
    html += '.polilabel{cursor:pointer;}';
    html += '#poliordered1div{position:absolute;top:0px;left:85px;width:44px;height:21px;opacity:0;}';
    html += '#poliordered2div{position:absolute;top:0px;left:138px;width:44px;height:21px;opacity:0;}';
    html += '.politypediv{position:absolute;left:0px;width:107px;height:27px;opacity:0;}';
    html += '.plt1{top:7px;}.plt2{top:35px;}.plt3{top:63px;}.plt4{top:93px;}.plt5{top:122px;}.plt6{top:151px;}';
    html += '#polisubmitdiv{position:absolute;top:0px;left:650px;width:40px;height:42px;opacity:0;background-color:#fff;transition:all 0.5s ease;}';
    html += '#polisubmitdiv:hover{opacity:0.6;}';
    html += '#politypebu{cursor:pointer;position:absolute;top:0;left:85px;width:97px;height:21px;opacity:0;}';
    html += '#poliorderedsvg2{opacity:0;}';
    html += '#politypesvg2,#politypesvg3,#politypesvg4,#politypesvg5,#politypesvg6{opacity:0;}';
    html += '#pordbelowback{display:block;position:relative;width:100%;height:278px;background-color:#f7f7f7;}';
    html += '#pordbelowbox{display:block;position:relative;top:22px;width:875px;height:auto;left:50%;margin-left:-437.5px;}';
    html += '.pordbelowsvg{position:absolute;top:0;left:0;width:100%;}';
    html += '.pordbelowbubu{position:absolute;top:75px;width:135px;height:58px;background-color:#f7f7f7;opacity:0;transition:all 0.5s ease;}';
    html += '.pordbelowbubu:hover{opacity:0.6;}';
    html += '#pordbelowbutton1{left:72px;}';
    html += '#pordbelowbutton2{left:368px;}';
    html += '#pordbelowbutton3{left:663px;}';
    return html;
  }

  function css_mogeneral() {
    let html = '@media (max-width:900px) {';
      html += '#bodymain0817{position:relative;top:0px;width:100%;}';
      html += '#porli2s0back0817,#porli2s0position,#totalcontents{display:none;}';
      html += '#moporli2s0back0817{display:block;position:absolute;top:60px;width:100%;height:255px;}';
      html += '#moporli2s0position{display:block;position:absolute;top:121px;width:320px;height:auto;left:50%;margin-left:-160px;}';
      html += '#mototalcontents{display:block;position:relative;top:255px;width:100%;}';
      html += '.moporlicontent{display:block;position:relative;top:-2.4vw;left:50%;margin-left:-43.9vw;width:90.7vw;height:auto;}';
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
      html += '.polisearchbox{display:block;position:relative;width:87.9vw;height:13.5vw;margin-left:auto;margin-right:auto;}';
      html += '#mopolisearch01{position:absolute;top:0;width:100%;height:9vw;}';
      html += '#mopolisearch02{position:absolute;bottom:0;left:0;width:47.554%;height:36%;}';
      html += '#mopolisearch03{position:absolute;bottom:0;left:47.554%;width:52.446%;height:36%;}';
      html += '#mopolisearch{position:absolute;top:0;left:0;width:90.16%;height:86%;background-color:transparent;color:#303030;border:0;text-indent:1vw;font-size:3.2vw;padding-bottom:1.07%;font-family: \'Noto Sans KR\', sans-serif;}';
      html += '#mopolisubmitdiv{position:absolute;top:0;left:90.16%;width:9.84%;height:86%;opacity:0;background-color:#fff;transition:all 0.5s ease;}';
      html += '#mopolisubmitdiv:hover{opacity:0.6;}';
      html += '#mopoliordered1div{position:absolute;top:4.5%;left:52.5%;width:21%;height:95.5%;}';
      html += '#mopoliordered2div{position:absolute;top:4.5%;left:77.5%;width:21%;height:95.5%;}';
      html += '#moporlidelidediv{position:absolute;top:100%;left:59.4%;width:22%;height:250%;z-index:100;transform-origin:0 0;transition:all 0.3s ease;overflow:hidden;}';
      html += '#moporlidelideimg{top:-35vw;transition:all 0.3s ease;}';
      html += '.mopolitypediv{position:absolute;left:0;width:100%;height:15%;opacity:0;}';
      html += '.moplt1{top:3%;}.moplt2{top:18%;}.moplt3{top:34%;}.moplt4{top:50%;}.moplt5{top:65%;}.moplt6{top:80%;}';
      html += '#mopolitypebu{cursor:pointer;position:absolute;top:0%;left:24%;width:40.8%;height:100%;opacity:0;}';
      html += '#mopoliorderedsvg2,#mopolitypesvg2,#mopolitypesvg3,#mopolitypesvg4,#mopolitypesvg5,#mopolitypesvg6{opacity:0;}';
      html += '#mopordbelow{display:block;position:relative;width:100%;height:129vw;}';
      html += '#mopordbelowdiv1{position:absolute;top:7%;left:17.5%;width:19.2%;height:6%;}';
      html += '#mopordbelowdiv2{position:absolute;top:7%;left:43%;width:17%;height:6%;}';
      html += '#mopordbelowdiv3{position:absolute;top:7%;left:65%;width:17.5%;height:6%;}';
    html += '}';
    return html;
  }

  return html + (css_deflexible() + css_degeneral() + css_mogeneral());
}
