module.exports = function () {
  const flexible_media = ['@media (min-width:1611px){','@media (min-width:901px) and (max-width:1610px) {','}'];
  const mainmain = [900,875];
  const mainslide = [1098,1050];

  function css_deflexible() {
    let html = '';
    for (let i = 0; i < 2; i++) {
      html += flexible_media[i];
      html += '.pordbase0{display:block;width:100%;height:auto;margin-top:' + String((85/875)*mainmain[i]) + 'px;text-align:center;}';
      html += '.pordmargin0{display:block;width:100%;height:' + String((15/875)*mainmain[i]) + 'px;opacity:0}';
      html += '.pordbase1{display:block;width:100%;height:auto;margin-top:' + String((40/875)*mainmain[i]) + 'px;margin-bottom:' + String((124/875)*mainmain[i]) + 'px;}';
      html += '.pordeimgti{position:relative;top:0px;margin-left:auto;margin-right:auto;height:' + String((73/875)*mainmain[i]) + 'px;}';
      html += '.pordeimg0{position:relative;top:0px;margin-left:auto;margin-right:auto;height:' + String((28/875)*mainmain[i]) + 'px;}';
      html += '#pordmainbox{display:block;position:relative;top:110px;left:50%;margin-left:-525px;width:1050px;height:727px;transform-origin:50% 20%;transform:scale(' + String(mainslide[i]/1050) + ');z-index:1;animation:fadeInport0821 1s ease forwards;}';
      html += '#porddetailback{position:absolute;top:' + String(((727*(mainslide[i]/1050))-727)+977) + 'px;width:100%;height:436px;background-color:#f7f7f7;}';
      html += '#porddetail{position:absolute;top:' + String(((727*(mainslide[i]/1050))-727)+1080) + 'px;width:' + String((70/875)*mainmain[i]) + 'px;';
      html += 'height:' + String((7/175)*mainmain[i]) + 'px;left:50%;margin-left:-' + String((7/175)*mainmain[i]) + 'px;}';
      html += '#pordtotalcontent{display:block;position:relative;top:' + String(((727*(mainslide[i]/1050))-727)+1165) + 'px;width:100%;height:auto;}';
      html += '#pordcontent{position:relative;margin-top:450px;width:' + String(mainmain[i]) + 'px;height:auto;left:50%;margin-left:-' + String(mainmain[i]/2) + 'px;}';
      html += '.pordgaropicture{display:block;position:relative;width:100%;height:' + String((210/297)*mainmain[i]) + 'px;}';
      html += '.pordgarogray{display:block;position:relative;width:100%;height:' + String((210/297)*mainmain[i]) + 'px;background-color:#f7f7f7;}';
      html += '.pordtitlesvg{display:block;width:100%;height:auto;margin-top:' + String((91/875)*mainmain[i]) + 'px;margin-bottom:' + String((119/875)*mainmain[i]) + 'px;}';
      html += '.pordgenesvg{display:block;width:100%;height:auto;margin-top:' + String((83/875)*mainmain[i]) + 'px;margin-bottom:' + String((119/875)*mainmain[i]) + 'px;}';
      html += '.pordmargin{display:block;width:100%;height:' + String((7/875)*mainmain[i]) + 'px;background-color:transparent;opacity:0}';
      html += flexible_media[2];
    }
    return html;
  }

  function css_degeneral() {
    // general
    let html = "#bodymain0817{position:relative;top:0px;width:100%;}";
    html += "#mototalcontents{display:none;}";
    html += "#totalcontents{display:block;position:relative;width:100%;height:auto;}";
    html += "#pordslibox{position:absolute;top:0;left:0;width:795px;height:100%;overflow:hidden;}";
    html += ".porddesignerbox{position:relative;top:0;margin-left:842px;width:208px;height:303px;background-color:#f7f7f7;border-radius:5px;}";
    html += ".pordtitlebox{position:relative;margin-left:858px;margin-top:216px;width:192px;height:207px;}";
    html += ".deligmar{display:block;height:36px;}";
    html += ".deligimg{display:block;position:relative;width:120px;height:120px;border-radius:60px;margin-right:auto;margin-left:auto;background-size: auto 100%;background-position: 50% 50%;background-repeat:no-repeat;}";
    html += ".deligname{display:block;position:relative;width:50px;height:18px;margin-right:auto;margin-left:auto;margin-top:13px;}";
    html += ".deligmethod{display:block;position:relative;width:80px;height:12px;margin-right:auto;margin-left:auto;}.mtd1{margin-top:15px;}.mtd2{margin-top:6px;}";
    html += ".deligetc{display:inline-block;position:relative;top:1px;height:11px;}.deligetc2{padding-left:1.5px;}";
    html += ".deliwetc0{display:inline;font-family:'Roboto',sans-serif;font-size:12px;color:#303030;letter-spacing:-0.5px}";
    html += ".deligyeongbox{width:auto;height:15px;margin-top:17px;left:0;margin-left:auto;margin-right:auto;text-align:center;}";
    html += ".delibutton{position:absolute;width:100%;height:100%;top:0;background-color:#fff;opacity:0;transition:all 0.3s ease;}";
    html += ".delibutton:hover{opacity:0.3;}";
    html += ".pordtitlebutton{position:absolute;top:179px;left:109px;width:80px;height:27px;opacity:0;background-color:#FFFFFF;transition: .5s ease;}";
    html += ".pordtitlebutton:hover{opacity:0.5;}";
    html += ".porduppertitlesvg{position:absolute;top:-2px;width:100%;}";
    html += ".pordserosvg1{position:absolute;top:0;width:49.6%;height:100%;left:0;}";
    html += ".pordserosvg2{position:absolute;top:0;width:49.6%;height:100%;right:0;}";
    html += "#pordbelowback{display:block;position:relative;width:100%;height:278px;background-color:#f7f7f7;}";
    html += "#pordbelowbox{display:block;position:relative;top:22px;width:875px;height:auto;left:50%;margin-left:-437.5px;}";
    html += ".pordbelowsvg{position:absolute;top:0;left:0;width:100%;}";
    html += ".pordbelowbubu{position:absolute;top:75px;width:135px;height:58px;background-color:#f7f7f7;opacity:0;transition:all 0.5s ease;}";
    html += ".pordbelowbubu:hover{opacity:0.6;}";
    html += "#pordbelowbutton1{left:72px;}";
    html += "#pordbelowbutton2{left:368px;}";
    html += "#pordbelowbutton3{left:663px;}";
    html += '.hookbox{position:relative;height:404px;background-color:#f7f7f7;border-radius:3px;margin-top:-45px;margin-bottom:175px;}';
    html += '.hookport{position:absolute;top:50px;left:268px;width:348px;height:303px;border-radius:5px;overflow:hidden;}';
    html += '.pordgarodesktiti01{position:absolute;top:0;width:100%;height:100%;left:0;}';
    html += '.pordgarodesktiti02{position:absolute;top:0;width:50%;height:100%;left:0;}';
    html += ".hookdesigner{display:block;position:relative;top:50px;margin-left:50px;width:200px;height:303px;background-color:#fff;border-radius:5px;}";
    html += ".hooktitle0{position:absolute;top:48px;left:772px;width:52px;height:21px;}";
    html += ".hooktitle1{position:absolute;top:216px;left:648px;width:188px;height:137px;}";
    html += ".hookbutton{position:absolute;top:50px;left:267px;width:567px;height:303px;opacity:0;background-color:#f7f7f7;transition:all 0.5s ease;}";
    html += ".hookbutton:hover{opacity:0.5;}";
    html += "@keyframes pordfadeani2 {from {opacity:0;}10% {opacity:0;}11.1% {opacity:1;}21.1% {opacity:1;}22.2% {opacity:1;}to {opacity:0;}}";
    html += "@keyframes pordfadeani3 {from {opacity:0;}21.1% {opacity:0;}22.2% {opacity:1;}32.2% {opacity:1;}33.3% {opacity:1;}to {opacity:0;}}";
    html += "@keyframes pordfadeani4 {from {opacity:0;}32.2% {opacity:0;}33.3% {opacity:1;}43.3% {opacity:1;}44.4% {opacity:1;}to {opacity:0;}}";
    html += "@keyframes pordfadeani5 {from {opacity:0;}43.3% {opacity:0;}44.4% {opacity:1;}54.4% {opacity:1;}55.5% {opacity:1;}to {opacity:0;}}";
    html += "@keyframes pordfadeani6 {from {opacity:0;}54.4% {opacity:0;}55.5% {opacity:1;}65.5% {opacity:1;}66.6% {opacity:1;}to {opacity:0;}}";
    html += "@keyframes pordfadeani7 {from {opacity:0;}65.5% {opacity:0;}66.6% {opacity:1;}76.6% {opacity:1;}77.7% {opacity:1;}to {opacity:0;}}";
    html += "@keyframes pordfadeani8 {from {opacity:0;}76.6% {opacity:0;}77.7% {opacity:1;}87.7% {opacity:1;}88.8% {opacity:1;}to {opacity:0;}}";
    html += "@keyframes pordfadeani9 {from {opacity:0;}87.7% {opacity:0;}88.8% {opacity:1;}98.8% {opacity:1;}to {opacity:0;}}";
    html += "@keyframes fadeInport0821 {from { opacity: 0; } 15% { opacity: 0; } to { opacity: 1; }}";
    html += "@keyframes fadeInmain0821 {from { opacity: 0; } 15% { opacity: 0; } to { opacity: 1; }}";
    html += ".slidemain{position:absolute;top:0px;left:0px;width:795px;height:562px;background-color:#f7f7f7;transition:all 0.4s ease;}";
    html += ".pordpictureclass1{opacity:1;}";
    html += ".pordpictureclass2,.pordpictureclass3,.pordpictureclass4,.pordpictureclass5,.pordpictureclass6,.pordpictureclass7,.pordpictureclass8,.pordpictureclass9{opacity:0;}";
    html += ".slidethumb{position:absolute;top:603px;width:124px;height:124px;background-color:#f7f7f7;transform:translateX(0px);transition:transform 0.2s ease;left:0;}";
    html += ".slibutton{cursor:pointer;position:absolute;top:603px;width:124px;height:124px;opacity:0}";
    html += "#jari_l2{left:57px;}#jari_l1{left:196px;}#jari_r2{right:58px;}#jari_r1{right:197px;}#jari_ce{left:335px;}";
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
    // local
    html += ".mopordtitleclass{display:block;width:87.9vw;height:auto;margin-left:auto;margin-right:auto;margin-top:6.8%;margin-bottom:16%;}";
    html += ".mopordbase0{display:block;width:87.9vw;height:auto;margin-left:auto;margin-right:auto;margin-top:12.8%;text-align:center;}";
    html += ".mopordbase1{display:block;width:87.9vw;height:auto;margin-left:auto;margin-right:auto;margin-top:6.3%;margin-bottom:16%;}";
    html += ".mopordeimgti{position:relative;top:0px;margin-left:auto;margin-right:auto;height:16.5vw;}";
    html += ".mopordeimg0{position:relative;top:0px;margin-left:auto;margin-right:auto;height:6.4vw;}";
    html += ".moporddesigner{display:block;position:relative;width:87.5vw;margin-left:auto;margin-right:auto;background-color:#f7f7f7;border-radius:1vw}";
    html += ".modsub1{margin-top:15%;margin-bottom:2%;height:38vw;}";
    html += ".modsub2{margin-top:2%;margin-bottom:21%;}";
    html += ".modeligmar{display:block;height:6vw;}";
    html += ".modeligimg{display:block;position:relative;width:26vw;height:26vw;border-radius:13vw;margin-left:28.4vw;background-size: auto 110%;background-position: 50% 50%;background-repeat:no-repeat;}";
    html += ".modeligname{position:absolute;top:8vw;left:58.5vw;width:11.5vw;height:5vw;}";
    html += ".modeligmethod{position:absolute;left:58.6vw;width:19vw;height:3vw;}.momtd1{top:15vw;}.momtd2{top:19.5vw;}";
    html += ".modeligyeongbox{position:absolute;top:25vw;left:58.3vw;width:30vw;height:3vw;}";
    html += ".modedegyeongib{display:inline-block;height:95%;}.mogca1{margin-left:1vw;}.mogca2{margin-left:0.2vw;}";
    html += ".modedegyeongword{display:inline;position:relative;font-family:'Roboto',sans-serif;font-size:3.4vw;top:0vw;color:#303030;margin-left:1vw}";
    html += ".modeligdet1{position:absolute;top:15.1vw;left:6.8vw;width:15vw;height:5vw;}";
    html += ".modeligdet2{position:absolute;top:6.5vw;left:6.8vw;width:12.7vw;height:5vw;}";
    html += "#mopordsli1{display:block;position:relative;width:100%;height:70.7vw;}";
    html += ".mopordpictureclass1{position:absolute;top:0px;left:0px;width:100%;height:100%;background-color:#f7f7f7;opacity:1;}";
    html += ".mopordwonwon1{position:absolute;top:0;width:100%;opacity:1;}";
    html += ".mopordgray{display:block;width:100%;height:70.88vw;background-color:#f7f7f7;margin-left:auto;margin-right:auto;}";
    html += ".mopordgaro{display:block;position:relative;width:100%;height:70.88vw;margin-left:auto;margin-right:auto;}";
    html += ".mopordcon{display:block;width:87.9vw;height:auto;margin-left:auto;margin-right:auto;margin-top:10.7%;margin-bottom:14.4%;}";
    html += ".mopordmargin{display:block;width:100%;height:1.3vw;background-color:transparent;opacity:0;}";
    html += ".moporddesign{display:block;width:62.1%;height:43vw;margin-left:auto;margin-right:auto;margin-top:14.6%;margin-bottom:15.8%;}";
    html += ".morevgaro{display:block;position:relative;width:51.5vw;height:36.7vw;margin-left:29vw;overflow:hidden;border-radius:1vw;}";
    html += ".morevtigaro{display:block;position:relative;width:51.5vw;height:11.5vw;margin-left:28.5vw;margin-bottom:1vw;overflow:hidden;border-radius:3px;}";
    html += ".morerevmargin1{display:block;height:4vw;background-color:transparent;opacity:0;}";
    html += ".morerevmargin2{display:block;height:2.4vw;background-color:transparent;opacity:0;}";
    html += ".morevimg{position:absolute;top:0;left:0;width:100%;height:100%}";
    html += ".morevmainwhite{display:block;position:absolute;top:20.5vw;left:8vw;background-color:#ffffff;width:41vw;height:28vw;opacity:0;border-radius:1vw;animation:fadeInmain 1.2s ease 0.2s forwards;}";
    html += ".mopordsero1{position:absolute;top:0;width:49.4%;height:100%;left:0;}";
    html += ".mopordsero2{position:absolute;top:0;width:49.4%;height:100%;right:0;}";
    html += "#mopordwonsli1{display:block;position:relative;width:78%;height:4vw;margin-top:3%;margin-left:auto;margin-right:auto;}";
    html += ".morevrevrevimgetc1{position:absolute;top:0;left:0;width:2.5vw;height:2.6vw}";
    html += ".morevrevrevimgetc2{position:absolute;bottom:4.9vw;right:0.2vw;width:6vw;height:2vw}";
    html += ".morevrevrevimg{position:absolute;top:0;left:3.6vw;width:46vw;height:auto}";
    for (let i = 0; i < 8; i++) {
      html += '.mopordpictureclass' + String(i + 2) + '{position:absolute;top:0px;left:0px;width:100%;height:100%;background-color:#f7f7f7;opacity:0;animation:pordfadeani' + String(i + 2) + ' 23s ease infinite;}';
      html += '.mopordwonwon' + String(i + 2) + '{position:absolute;top:0;width:100%;opacity:0;animation:pordfadeani' + String(i + 2) + ' 23s ease infinite;}';
    }
    html += '}';
    return html;
  }

  return (css_deflexible() + css_degeneral() + css_mogeneral());
}
