module.exports = function () {
  const flexible_media = ['@media (min-width:1611px){','@media (min-width:901px) and (max-width:1610px) {','}'];
  const mainmain = [900,875];

  function css_deflexible(){
    let html = '';
    for (let i = 0; i < 2; i++) {
      html += flexible_media[i];
      if (i === 0) {
        html += '.revmainboxsc{height:797px;}';
        html += '.revmainbacksc{height:253px;}';
        html += '.revmainpicturesc{top:71px;width:759px;height:645px;margin-left:-549px;}';
        html += '.revmainshadowsc{top:105px;left:50%;width:786px;height:640px;margin-left:-555px;}';
        html += '.rvmw1{top:71px;width:70px;height:14px;margin-left:478px;}';
        html += '.rvmw2{top:227px;width:189px;height:153px;margin-left:264px;}';
        html += '.rvmw3{top:364px;width:120px;height:2px;margin-left:426px;background-color:#f2f2f2;}';
        html += '.rvmw4{top:670px;width:150px;height:45px;margin-left:399px;}';
      } else {
        html += '.revmainboxsc{height:765px;}';
        html += '.revmainbacksc{height:273px;}';
        html += '.revmainpicturesc{top:60px;width:736px;height:638px;margin-left:-525px;}';
        html += '.revmainshadowsc{top:105px;left:50%;width:786px;height:630px;margin-left:-555px;}';
        html += '.rvmw1{top:60px;width:66px;height:13px;margin-left:459px;}';
        html += '.rvmw2{top:222px;width:181px;height:153px;margin-left:260px;}';
        html += '.rvmw3{top:358.5px;width:107px;height:2px;margin-left:418px;background-color:#f2f2f2;}';
        html += '.rvmw4{top:654px;width:145px;height:44px;margin-left:380px;}';
      }
      html += '.pordbase0{display:block;width:100%;height:auto;margin-top:' + String((108/875)*mainmain[i]) + 'px;text-align:center;}';
      html += '.revmargin0{display:block;width:100%;height:' + String((45/875)*mainmain[i]) + 'px;opacity:0}';
      html += '.pordbase1{display:block;width:100%;height:auto;margin-top:' + String((100/875)*mainmain[i]) + 'px;margin-bottom:' + String((124/875)*mainmain[i]) + 'px;}';
      html += '.pordtitleclass{display:block;width:100%;height:auto;margin-top:' + String((40/875)*mainmain[i]) + 'px;margin-bottom:' + String((124/875)*mainmain[i]) + 'px;}';
      html += '.pordeimgti{position:relative;top:0px;margin-left:auto;margin-right:auto;height:' + String((73/875)*mainmain[i]) + 'px;}';
      html += '.pordeimg0{position:relative;top:0px;margin-left:auto;margin-right:auto;height:' + String((28/875)*mainmain[i]) + 'px;}';
      html += '#pordcontent{position:relative;top:0;width:' + String(mainmain[i]) + 'px;height:auto;left:50%;margin-left:-' + String(mainmain[i]/2) + 'px;}';
      html += '.pordgaropicture{display:block;position:relative;width:100%;height:' + String((210/297)*mainmain[i]) + 'px;}';
      html += '.pordgray{display:block;position:relative;width:100%;height:' + String((210/297)*mainmain[i]) + 'px;background-color:#f7f7f7;}';
      html += '.pordtitlesvg{display:block;width:100%;height:auto;margin-top:' + String((91/875)*mainmain[i]) + 'px;margin-bottom:' + String((119/875)*mainmain[i]) + 'px;}';
      html += '.pordgenesvg{display:block;width:100%;height:auto;margin-top:' + String((83/875)*mainmain[i]) + 'px;margin-bottom:' + String((119/875)*mainmain[i]) + 'px;}';
      html += '.pordmargin{display:block;width:100%;height:' + String((7/875)*mainmain[i]) + 'px;background-color:transparent;opacity:0}';
      html += flexible_media[2];
    }
    return html;
  }

  function css_degeneral(){
    let html = '#bodymain0817{position:relative;top:0px;width:100%;}';
    html += "#totalcontents{display:block;position:relative;width:100%;height:auto;}";
    html += "#mototalcontents{display:none;}";
    html += '.revpictureposition{position:absolute;top:0px;left:0px;width:795px;height:727px;background-color:#f7f7f7;opacity:1;}';
    html += '#revmainbox{display:block;position:relative;background-color:#fbfbfb;margin-top:72px;width:100%;-webkit-animation:fadeInport0821 1s ease forwards;-moz-animation:fadeInport0821 1s ease forwards;animation:fadeInport0821 1s ease forwards;}';
    html += '.revmainback{position:absolute;bottom:0;width:100%;background-color:#f2f2f2;height:253px;}';
    html += '.revmainpicture{position:absolute;left:50%;border-radius:5px;overflow:hidden;background-size:auto 100%;background-position:50% 50%;background-color:#f7f7f7;}';
    html += '.revmainshadow{position:absolute;border-radius:5px;opacity:0.9}';
    html += '.revmwre{position:absolute;left:50%;}';
    html += '#pordbelowback{display:block;position:relative;width:100%;height:278px;background-color:#f7f7f7;}';
    html += '#pordbelowbox{display:block;position:relative;top:22px;width:875px;height:auto;left:50%;margin-left:-437.5px;}';
    html += '.pordsero1{position:absolute;top:0;width:49.6%;height:100%;left:0;}';
    html += '.pordsero2{position:absolute;top:0;width:49.6%;height:100%;right:0;}';
    html += '.pordbelowsvg{position:absolute;top:0;left:0;width:100%;}';
    html += '.pordbelowbubu{position:absolute;top:75px;width:135px;height:58px;background-color:#f7f7f7;opacity:0;transition:all 0.5s ease;}';
    html += '.pordbelowbubu:hover{opacity:0.6;}';
    html += '#pordbelowbutton1{left:72px;}#pordbelowbutton2{left:368px;}#pordbelowbutton3{left:663px;}';
    html += '.hookmargin{display:block;width:100%;height:50px;opacity:0}';
    html += '.hookdesigner{display:block;position:relative;top:0;margin-left:50px;width:200px;height:303px;background-color:#fff;border-radius:5px;}';
    html += '.hooktitle0{position:absolute;top:48px;left:766px;width:58px;height:21px;}';
    html += '.hooktitle1{position:absolute;top:216px;left:648px;width:188px;height:137px;}';
    html += '.hookbutton{position:absolute;top:50px;left:267px;width:567px;height:303px;opacity:0;background-color:#f7f7f7;transition:all 0.5s ease;}';
    html += '.hookbutton:hover{opacity:0.5;}';
    html += '.deligmar{display:block;height:36px;}';
    html += '.deligimg{display:block;position:relative;width:120px;height:120px;border-radius:60px;margin-right:auto;margin-left:auto;background-size: auto 110%;background-position: 50% 50%;background-repeat:no-repeat;}';
    html += '.deligname{display:block;position:relative;width:50px;height:18px;margin-right:auto;margin-left:auto;margin-top:13px;}';
    html += '.deligmethod{display:block;position:relative;width:80px;height:12px;margin-right:auto;margin-left:auto;}.mtd1{margin-top:15px;}.mtd2{margin-top:6px;}';
    html += '.deligetc{display:inline-block;position:relative;top:1px;height:11px;}.deligetc2{padding-left:1.5px;}';
    html += '.deliwetc0{display:inline;font-family:\'Roboto\',sans-serif;font-size:12px;color:#303030;letter-spacing:-0.5px}';
    html += '.deligyeongbox{width:100%;text-align:center;height:15px;margin-top:17px;left:0;margin-left:auto;margin-right:auto;}';
    html += '.delibutton{position:absolute;width:100%;height:100%;top:0;background-color:#fff;opacity:0;transition:all 0.3s ease;}';
    html += '.delibutton:hover{opacity:0.3;}';
    html += '.hookbox{position:relative;height:404px;background-color:#f7f7f7;border-radius:3px;margin-top:-45px;margin-bottom:175px;}';
    html += '.hookport{position:absolute;top:50px;left:268px;width:348px;height:303px;}';
    html += '.pordgarodesktiti01{position:absolute;top:0;width:100%;height:100%;left:0;}';
    html += '.pordgarodesktiti02{position:absolute;top:0;width:50%;height:100%;left:0;}';
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
    html += '#mopordsli1{display:block;position:relative;width:100%;height:70.7vw;}';
    html += '.mopordgray{display:block;width:100%;height:70.88vw;background-color:#f7f7f7;margin-left:auto;margin-right:auto;}';
    html += '.mopordgaropicture{display:block;position:relative;width:100%;height:70.88vw;margin-left:auto;margin-right:auto;}';
    html += '.mopordcon{display:block;width:87.9vw;height:auto;margin-left:auto;margin-right:auto;margin-top:10.7%;margin-bottom:14.4%;}';
    html += '.mopordmargin{display:block;width:100%;height:1.3vw;background-color:transparent;opacity:0;}';
    html += '.moporddesign{display:block;width:62.1%;height:43vw;margin-left:auto;margin-right:auto;margin-top:14.6%;margin-bottom:15.8%;}';
    html += '.mopordsero1{position:absolute;top:0;width:49.4%;height:100%;left:0;}';
    html += '.mopordsero2{position:absolute;top:0;width:49.4%;height:100%;right:0;}';
    html += '.mopordtitleclass{display:block;width:87.9vw;height:auto;margin-left:auto;margin-right:auto;margin-top:6.8%;margin-bottom:16%;}';
    html += '.mopordbase0{display:block;width:87.9vw;height:auto;margin-left:auto;margin-right:auto;margin-top:13%;text-align:center;}';
    html += '.mopordbase1{display:block;width:87.9vw;height:auto;margin-left:auto;margin-right:auto;margin-top:15%;margin-bottom:16%;}';
    html += '.mopordeimgti{position:relative;top:0px;margin-left:auto;margin-right:auto;height:16.5vw;}';
    html += '.mopordeimg0{position:relative;top:0px;margin-left:auto;margin-right:auto;height:6.4vw;}';
    html += '.moporddesigner{display:block;position:relative;width:87.5vw;margin-left:auto;margin-right:auto;background-color:#f7f7f7;border-radius:1vw}';
    html += '.modsub1{margin-top:15%;margin-bottom:2%;height:38vw;}';
    html += '.modsub2{margin-top:2%;margin-bottom:21%;}';
    html += '.modeligmar{display:block;height:6vw;}';
    html += '.modeligimg{display:block;position:relative;width:26vw;height:26vw;border-radius:13vw;margin-left:28.4vw;background-size: auto 110%;background-position: 50% 50%;background-repeat:no-repeat;}';
    html += '.modeligname{position:absolute;top:8vw;left:58.5vw;width:11.5vw;height:5vw;}';
    html += '.modeligmethod{position:absolute;left:58.6vw;width:19vw;height:3vw;}.momtd1{top:15vw;}.momtd2{top:19.5vw;}';
    html += '.modeligyeongbox{position:absolute;top:25vw;left:58.3vw;width:30vw;height:3vw;}';
    html += '.modedegyeongib{display:inline-block;height:95%;}.mogca1{margin-left:1vw;}.mogca2{margin-left:0.2vw;}';
    html += '.modedegyeongword{display:inline;position:relative;font-family:\'Roboto\',sans-serif;font-size:3.4vw;top:0vw;color:#303030;margin-left:1vw}';
    html += '.modeligdet1{position:absolute;top:15.1vw;left:6.8vw;width:15vw;height:5vw;}';
    html += '.modeligdet2{position:absolute;top:6.5vw;left:6.8vw;width:15vw;height:5vw;}';
    html += '.morevgaro{display:block;position:relative;width:51.5vw;height:36.7vw;margin-left:29vw;overflow:hidden;border-radius:1vw;}';
    html += '.morevtigaro{display:block;position:relative;width:51.5vw;height:15.2vw;margin-left:28.5vw;overflow:hidden;border-radius:3px;}';
    html += '.morerevmargin1{display:block;height:4vw;background-color:transparent;opacity:0;}';
    html += '.morerevmargin2{display:block;height:2.4vw;background-color:transparent;opacity:0;}';
    html += '.morevimg{position:absolute;top:0;left:0;width:100%;height:100%}';
    html += '@-webkit-keyframes fadeInmain{0%,30%{opacity:0;}100%{opacity:0.85;}} @-moz-keyframes fadeInmain{0%,30%{opacity:0;}100%{opacity:0.85;}} @keyframes fadeInmain{0%,30%{opacity:0;}100%{opacity:0.85;}}';
    html += '.morevmainwhite{display:block;position:absolute;top:20.5vw;left:8vw;background-color:#ffffff;width:41vw;height:28vw;opacity:0;border-radius:1vw;-webkit-animation:fadeInmain 1.2s ease 0.2s forwards;-moz-animation:fadeInmain 1.2s ease 0.2s forwards;animation:fadeInmain 1.2s ease 0.2s forwards;}';
    html += '.morevpictureclass{position:absolute;top:0px;left:0px;width:100%;height:100%;}';
    for (let i = 2; i < 10; i++) {
      html += '.mopordwonwon' + String(i) + '{position:absolute;top:0;width:100%;opacity:0;animation:pordfadeani' + String(i) + ' ease;animation-iteration-count:infinite;animation-duration:23s;}';
    }
    html += '}';
    return html;
  }

  return (css_deflexible() + css_degeneral() + css_mogeneral());
}
