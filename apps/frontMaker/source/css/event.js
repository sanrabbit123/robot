module.exports = function () {
  const flexible_media = ['@media (min-width:1611px){','@media (min-width:901px) and (max-width:1610px) {','}'];
  const orderarray = [[1,700/655],[1,7/6],[1200,1050],[1400,1050],['display:inline-block;','display:none;'],[18,12],['about.php','consulting.php']];

  function css_deflexible() {
    let html = '';
    for (let i = 0; i < 2; i++) {
      html += flexible_media[i];
      // general
      html += '.box1{margin-top:' + String(71/orderarray[1][i]) + 'px;height:' + String(708/orderarray[1][i]) + 'px;transition:all 0.5s ease;}';
      html += '.back{width:100%;height:' + String(370/orderarray[1][i]) + 'px;}';
      html += '.mainback2{display:block;position:relative;height:' + String(125/orderarray[1][i]) + 'px;}';
      html += '.mainmargin0{display:block;height:' + ((i === 0)?'180':'150') + 'px;}';
      html += '.main2s5{position:absolute;left:50%;}';
      html += '.main2s5sub1{top:' + String(47/orderarray[1][i]) + 'px;width:' + String(378/orderarray[1][i]) + 'px;margin-left:-' + String(700-(175*i)) + 'px;}';
      html += '.main2s5sub2{top:' + String(45.5/orderarray[1][i]) + 'px;width:' + String(369/orderarray[1][i]) + 'px;margin-left:' + String((700-(175*i))-(365/orderarray[1][i])) + 'px;}';
      html += '.copybut{position:absolute;background-color:#ececec;top:' + String(43/orderarray[1][i]) + 'px;left:50%;height:28px;opacity:0;transition:all 0.5s ease}';
      html += '.copybut:hover{opacity:0.6;}';
      html += '.copybut1{margin-left:-' + String(700-(175*i)) + 'px;width:' + String(80/orderarray[1][i]) + 'px;}';
      html += '.copybut2{margin-left:-' + String(575-(160*i)) + 'px;width:' + String(115/orderarray[1][i]) + 'px;}';
      html += '.copybut3{margin-left:-' + String(415-(133*i)) + 'px;width:' + String(100/orderarray[1][i]) + 'px;}';
      // box1
      html += '.box1shadow{width:' + String(orderarray[3][i]+60) + 'px;height:' + String(562/orderarray[1][i]) + 'px;top:' + ((i === 0)?'86.5':'80.5') + 'px;left:50%;margin-left:-' + String((orderarray[3][i]+55)/2) + 'px;opacity:0.4;transition:all 0.5s ease;}';
      html += '.box1contents{width:' + String(orderarray[3][i]) + 'px;height:' + String(560/orderarray[1][i]) + 'px;top:50px;left:50%;margin-left:-' + String(orderarray[3][i]/2) + 'px;border-radius:20px;overflow:hidden;background-color:#fbfbfb;transition:all 0.5s ease;}';
      // box2
      html += '.box2hwasal1{top:' + ((i === 0)?'169.8':'144.8') + 'px;border-top:1px solid #2fa678;width:calc(50% - ' + ((i === 0)?'316':'253') + 'px);left:0;}';
      html += '.box2hwasal2{left:50%;width:' + ((i === 0)?'19':'15') + 'px;top:' + ((i === 0)?'152':'131') + 'px;margin-left:-' + ((i === 0)?'334':'267') + 'px;}';
      html += '.box2contents{width:' + ((i === 0)?'1400':'1260') + 'px;margin-left:-' + ((i === 0)?'700':'630') + 'px;padding-top:' + String(130/orderarray[1][i]) + 'px;padding-bottom:' + String(160/orderarray[1][i]) + 'px;}';
      // box3
      html += '.box3totalcon{width:' + String(orderarray[2][i]) + 'px;margin-left:-' + String(orderarray[2][i]/2) + 'px;height:' + String(700/orderarray[1][i]) + 'px;padding-top:' + String(102/orderarray[1][i]) + 'px;}';
      html += '.box3shadow{top:' + ((i === 0)?'18':'16.9') + '%}';
      // box4
      html += '.box4{margin-top:' + ((i === 0)?'14':'12') + 'px;}';
      html += '.box4word1{width:' + String(370/orderarray[1][i]) + 'px;margin-left:-' + String(185/orderarray[1][i]) + 'px;}';
      html += '.box4word2{width:' + String(618/orderarray[1][i]) + 'px;margin-left:-' + String(309/orderarray[1][i]) + 'px;margin-top:' + ((i === 0)?'28':'26') + 'px;margin-bottom:' + ((i === 0)?'40':'38') + 'px;}';
      html += '.box4button{width:' + String(200/orderarray[1][i]) + 'px;height:' + String(48/orderarray[1][i]) + 'px;margin-left:-' + String(100/orderarray[1][i]) + 'px;border-radius:10px;background:linear-gradient(222deg, rgba(89,175,137,1) 5%, rgba(0,156,106,1) 100%);}';
      // box5
      html += '.box5{display:block;position:relative;width:' + String(orderarray[2][i]) + 'px;left:50%;margin-top:' + String(124/orderarray[1][i]) + 'px;margin-left:-' + String(orderarray[2][i]/2) + 'px;border-top:1px solid #2fa678}';
      html += '.box5terms{display:block;position:relative;width:100%;margin-top:' + String(52/orderarray[1][i]) + 'px;}';
      html += flexible_media[2];
    }
    return html;
  }

  function css_degeneral() {
    // general
    let html = '#bodymain0817{position:relative;top:0px;width:100%;}';
    html += '#mototalcontents{display:none;}';
    html += '#totalcontents{display:block;position:relative;width:100%;height:auto;}';
    html += '.maba3{background-color:#ececec;}';
    // general
    html += '.defalutbox{display:block;position:relative;width:100%;}';
    html += '.absol{position:absolute;}';
    html += '.blockrela{display:block;position:relative;left:50%;}';
    // box1
    html += '.box1gray{bottom:0;background-color:#f7f7f7;}';
    html += '.box1woimage{right:-1px;top:-4%;width:79%;height:auto;}';
    html += '.box1wo30{width:12.6%;height:auto;left:4.4%;top:12%;}';
    html += '.box1wotitle{width:12.9%;height:auto;left:4%;bottom:12.5%;}';
    // box2
    html += '.box2wo1{width:36.4%;margin-left:-18.2%;}';
    html += '.box2wo2{width:16.4%;margin-left:-8.2%;margin-top:1.5%;}';
    html += '.box2wo3{width:49.6%;margin-left:-24.8%;margin-top:3.1%;}';
    // box3
    html += '.box3green{top:0;background:linear-gradient(222deg, rgba(89,175,137,1) 5%, rgba(0,156,106,1) 100%);}';
    html += '.box3good{width:6.2%;top:7.5%;left:50%;}';
    html += '#good3a1{margin-left:-37.5%}';
    html += '#good3a2{margin-left:-3.3%}';
    html += '#good3a3{margin-left:30.2%}';
    html += '.box3shadow{width:35.4%;left:50%;opacity:0.5;}';
    html += '#shadow3a1{margin-left:-51.5%}';
    html += '#shadow3a2{margin-left:-18.5%}';
    html += '#shadow3a3{margin-left:16.5%}';
    html += '.box33dan{display:inline-block;position:relative;overflow:hidden;bottom:0;border-radius:15px;background-color:#fbfbfb;width:31.7%;height:87%;}';
    html += '.dan3margin{margin-right:2.45%}';
    html += '.dan3title{width:64%;margin-top:13.5%;margin-left:11.6%;}';
    html += '.dan3script{width:48%;margin-top:8.95%;margin-left:42.2%;margin-bottom:16%;}';
    html += '.dan3img{width:102%;}';
    html += '.dan3bar{top:31%;left:11.8%;width:27%;border-top:1px solid #2fa678;}';
    // box4
    html += '.box4buttonword{left:13.5%;width:73%;height:97%;opacity:1;transition:all 0.5s ease;}';
    html += '.box4buttonword:hover{opacity:0.7;}';
    return html;
  }

  function css_mogeneral() {
    let html = '@media (max-width:900px) {';
    // general
    html += '#totalcontents{display:none;}';
    html += '#mototalcontents{display:block;position:relative;width:100%;}';
    html += '.mofooterbelow,.momafooter{display:block;position:relative;width:100%}';
    html += '.mfbelbutton{position:absolute;height:10vw;top:8vw;}';
    html += '.mfbelbu1{left:17vw;width:20vw;}';
    html += '.mfbelbu2{left:41vw;width:20vw;}';
    html += '.mfbelbu3{left:64vw;width:20vw;}';
    html += '.moblockrela{display:block;position:relative;}';
    html += '.mocenter{margin-left:auto;margin-right:auto;}';
    // main image
    html += '.mowonmain{width:100%;}';
    html += '.mosamship{width:42vw;margin-top:9.5vw;}';
    // title/description
    html += '.motitle{width:57vw;margin-top:10.5vw;margin-left:21.5vw;}';
    html += '.motibar{border-top:1px solid #59af89;top:3vw;}';
    html += '.motibarleft{left:0;width:17.5vw;}';
    html += '.motibarright{right:0;width:17.5vw;}';
    html += '.modescrip{width:78vw;margin-top:6vw;margin-bottom:18vw;}';
    // green
    html += '.mogreen{background:linear-gradient(222deg, rgba(89,175,137,1) 5%, rgba(0,156,106,1) 100%);padding-top:6.5vw;padding-bottom:19vw;}';
    html += '.mobox3good{display:block;position:relative;margin-left:auto;margin-right:auto;width:20.5vw;margin-top:12vw;margin-bottom:4.5vw;}';
    html += '.mobox3shadow{position:absolute;width:93vw;left:5vw;}';
    html += '#moshadow3a1{top:44.5vw;}';
    html += '#moshadow3a2{top:207vw;}';
    html += '#moshadow3a3{top:370vw;}';
    html += '.mobox33dan{display:block;position:relative;margin-left:auto;margin-right:auto;overflow:hidden;border:0.3px solid #59af89;border-bottom:1px solid #009c6a;border-radius:8px;background-color:#fbfbfb;width:87.9vw;height:140.5vw;}';
    // sale/button
    html += '.mosale{width:87.9vw;margin-top:18vw}';
    html += '.mobutton{width:40vw;height:10vw;margin-top:8vw;border-radius:8px;background:linear-gradient(222deg, rgba(89,175,137,1) 5%, rgba(0,156,106,1) 100%);}';
    // terms
    html += '.moterms{width:87.7vw;margin-top:17vw;padding-top:7vw;margin-bottom:20.5vw;border-top:1px solid #59af89;}';
    html += '}';
    return html;
  }

  return (css_deflexible() + css_degeneral() + css_mogeneral());
}
