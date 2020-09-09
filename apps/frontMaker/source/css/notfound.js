module.exports = function () {
  function css_degeneral(){
    let html = '';
    html += "#bodymain0817{position:relative;top:0px;width:100%;}";
    html += "#totalcontents{display:block;position:relative;width:100%;height:100vh;}";
    html += "#mototalcontents{display:none;}";
    html += ".termsh1,.termsh3,.termparagraph{color:#404040;font-size:15px;font-family: 'Noto Sans KR', sans-serif;text-decoration:none;text-transform:none;color:#404040;line-height:17px;letter-spacing:-0.50px;text-shadow:none;line-height:1.8;text-align:left;}";
    html += "b{color:#dddddd;padding-bottom:1px;}";
    html += ".termstotalcontents{display:block;width:100%;margin-top:72px;overflow:hidden;-webkit-animation:fadeInmain0821 1s ease forwards;-moz-animation:fadeInmain0821 1s ease forwards;animation:fadeInmain0821 1s ease forwards;}";
    html += ".termsh1{display:block;position:relative;left:-1.5px;font-size:36px;color:#404040;margin-bottom:-2px;}";
    html += ".termsh2{display:block;position:relative;font-size:15.8px;top:58px;text-align:left;}";
    html += ".termsh3{display:block;position:relative;font-size:17px;margin-top:42px;}";
    html += ".greenbar{display:block;position:relative;height:2px;left:1px;background-color:#2fa678;margin-bottom:45px;}";
    html += ".a1{width:384px;}";
    html += ".termsmargin{display:block;height:500px;}";
    html += ".label{display:inline;font-size:15.8px;cursor:pointer;}";
    html += ".mobilefooter{display:none;}";
    html += ".termterm{display:block;position:relative;left:50%;top:90px;transform-origin:0% 0%;transform:scale(1.2);height:calc(92vh - 300px);padding-top:8vh;}";
    html += '@media (min-width:1611px){';
    html += ".termterm{width:1400px;margin-left:-700px;}";
    html += '}';
    html += '@media (min-width:901px) and (max-width:1610px) {';
    html += ".termterm{width:1050px;margin-left:-525px;}";
    html += '}';
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
    html += ".termsh1,.termsh3,.termparagraph{font-size:13px;}";
    html += ".termterm{display:block;top:0;padding-top:6vw;height:100vw;position:relative;width:87.9vw;left:50%;margin-left:-43.95vw;transform-origin:0% 0%;transform:scale(1);}";
    html += ".termsh1{display:block;position:relative;left:-1.5px;font-size:28px;color:#404040;margin-top:40px;margin-bottom:-2px;}";
    html += ".termsh2{display:block;position:relative;font-size:15px;top:18px;transform:scale(0.9);transform-origin:0% 0%;text-align:left;}";
    html += ".termsh3{display:block;position:relative;font-size:15px;margin-top:42px;}";
    html += ".greenbar{display:block;position:relative;height:2px;left:1px;background-color:#2fa678;margin-bottom:25px;}";
    html += ".a1{width:296px;}";
    html += ".termsmargin{display:block;height:400px;}";
    html += ".mobilefooter{display:block;position:relative;width:100%;}";
    html += '}';
    return html;
  }

  return (css_degeneral() + css_mogeneral());
}
