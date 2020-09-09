module.exports = function () {
  function css_degeneral() {
    let html = "#bodymain0817{position:relative;top:0px;width:100%;}";
    html += "#mototalcontents{display:none;}";
    html += "#totalcontents{display:block;position:relative;width:100%;height:auto;}";
    html += "#deliback0{display:block;position:absolute;top:72px;width:100%;height:560px;}";
    html += "#deliback1{display:block;position:absolute;top:0;width:100%;height:2300px;background-color:#f7f7f7;}";
    html += "#deli2s0position{display:block;position:absolute;top:157px;width:1200px;height:128px;left:50%;margin-left:-600px;}";
    html += "#delist2stotal{display:block;position:relative;padding-top:362px;width:100%;height:auto;}";
    html += ".delicontent{display:block;position:relative;width:1050px;left:50%;margin-left:-525px;margin-bottom:104px;}";
    html += ".delishadow{position:absolute;width:100%;height:1444px;bottom:-45px;opacity:0.3}";
    html += ".deliwhitebox{position:relative;width:100%;padding-top:63px;padding-bottom:80px;background-color:#fff;border-radius:5px;}";
    html += ".delinameimg{display:block;width:49px;height:18px;margin-top:15px;left:0}";
    html += ".delimethodimg{display:block;width:66px;height:10px;margin-top:21px;left:0}.delimethodimg1{margin-top:21px;}.delimethodimg2{margin-top:5px;}";
    html += ".deligyeongbox{width:80px;height:13px;margin-top:17px;left:0}";
    html += ".deligetc{display:inline-block;position:relative;top:1px;height:10px;}.deligetc2{padding-left:1.5px;}";
    html += ".deligraybar{position:absolute;background-color:#ececec;width:72.5px;height:1px;top:87.5px;left:0.5px;}";
    html += ".deliwetc0{display:inline;font-family:'Roboto',sans-serif;font-size:11.5px;color:#303030;letter-spacing:-0.5px}";
    html += ".delibox0,.delibox1{display:inline-block;position:relative;width:26.6%;height:125px;margin-right:4.4%;}";
    html += ".delibox2{display:inline-block;position:relative;width:26.6%;height:125px;}";
    html += ".delimargin{display:inline-block;position:relative;width:5.7%;height:125px;opacity:0;}";
    html += ".deliblock{display:block;height:22px;opacity:0;}";
    html += ".insideimg{position:absolute;top:0;left:0;width:64%;height:100%;border-radius:2px;}";
    html += ".insidesvg{position:absolute;top:0;left:72.5%;width:27.5%;height:100%;}";
    html += ".delibutton{position:absolute;width:100%;height:100%;top:0;background-color:#fff;opacity:0;transition:all 0.5s ease;}";
    html += ".delibutton:hover{opacity:0.5;}";
    return html;
  }

  function css_mogeneral() {
    let html = "@media (max-width:900px) {";
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
    //local
    html += "#modeliback0{display:block;position:absolute;top:0px;width:100%;height:255px;}";
    html += "#modeli2s0{display:block;position:absolute;top:59px;width:320px;height:auto;left:50%;margin-left:-160px;}";
    html += "#modelist2s1{display:block;position:relative;padding-top:250px;padding-bottom:16vw;left:0;width:100%;}";
    html += ".modelimargin1{display:inline-block;width:3.1vw;height:26vw;opacity:0;}";
    html += ".modelimargin2{display:inline-block;width:0.5vw;height:26vw;opacity:0;}";
    html += ".modelimargin3{display:block;height:4vw;opacity:0;}";
    html += "#modeli2s1position{display:block;position:relative;width:87.5vw;margin-left:auto;margin-right:auto;margin-bottom:2vw;}";
    html += ".modelicontent{display:block;padding-top:10vw;position:relative;width:87.9vw;margin-left:auto;margin-right:auto;}";
    html += ".moinsideimg{display:inline-block;width:25vw;height:26vw;border-radius:0.75vw;background-size: auto 100%;background-position: 50% 50%;}";
    html += ".moinsidesvg{display:inline-block;position:relative;height:26vw;}";
    html += ".moinsidesvg0{width:16vw;}.moinsidesvg1{width:1vw;}";
    html += ".moinsidesvgab{position:absolute;width:16vw;height:26vw;top:0;left:0vw;}";
    html += ".modelinameimg{display:block;margin-top:2vw;height:6vw;width:10vw;}";
    html += ".modelimethod1img{display:block;margin-top:1.5vw;width:90%;height:4vw}";
    html += ".modelimethod2img{display:block;width:90%;height:3vw}";
    html += ".modeligraybar{display:block;background-color:#ececec;position:relative;left:0;width:30%;height:1.5%;margin-top:1.5vw;}";
    html += ".modeligyeongbox{display:block;position:relative;left:0;width:100%;height:3vw;margin-top:1.5vw;}";
    html += ".modeligyeong{display:inline;font-family:'Roboto',sans-serif;font-size:2.4vw;color:#303030;}";
    html += "#modelibelow{display:block;position:relative;width:100%;height:129vw;}";
    html += "#modelibelowdiv1{position:absolute;top:7%;left:17.5%;width:19.2%;height:6%;}";
    html += "#modelibelowdiv2{position:absolute;top:7%;left:43%;width:17%;height:6%;}";
    html += "#modelibelowdiv3{position:absolute;top:7%;left:65%;width:17.5%;height:6%;}";
    html += ".modelibox{display:inline-block;position:relative;}.modelibox0{width:46vw;}.modelibox1{width:41vw;}";
    html += ".modelibutton{position:absolute;top:0;width:100%;height:100%;opacity:0;}";
    html += '}';
    return html;
  }

  return (css_degeneral() + css_mogeneral());
}
