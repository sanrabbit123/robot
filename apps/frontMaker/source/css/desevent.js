module.exports = function () {
  function css_degeneral() {
    let html = '';
    html += "@keyframes fadeout{from,50%{opacity:1;}to{opacity:0;}}";
    html += "@keyframes fadein{from,30%{opacity:0;}to{opacity:1;}}";
    html += "@keyframes fadeingray{from,30%{opacity:0;}to{opacity:0.3;}}";
    html += "@keyframes fadedown{from,50%{opacity:1;transform:translateY(0px);}to{opacity:0;transform:translateY(3px);}}";
    html += "@keyframes fadeup{from,30%{opacity:0;transform: translateY(5px);}to{opacity:1;transform:translateY(0px);}}";
    html += "#bodymain0817{position:relative;top:0px;width:100%;}";
    html += "#totalcontents{display:block;position:relative;width:100%;height:auto;padding-top:362px;}";
    html += "#mototalcontents{display:none;}";
    html += "#cancel_back{position:fixed;width:100%;height:100%;top:0;left:0;z-index:1;}";
    html += "#postEvent_div{width:50%;height:45.5%;border:0px solid;left:calc(25% - 25px);top:27%;position:fixed;z-index:1;padding:25px;padding-bottom:30px;background:white;box-shadow:0px 2px 9px -4px #a0a0a0;border-radius: 5px;animation:fadeup 0.4s ease forwards;}";
    html += `
    #submit_pendingbox_back{
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
    #submit_pendingbox{
      animation: fadeup .4s ease forwards;
      transition:all 0.3s ease;
      position: fixed;
      top: calc(50% - 66px);
      left: calc(50% - 120px);
      width: 240px;
      height: 130px;
      background: #fff;
      border-radius: 5px;
      box-shadow: 0px 5px 15px -14px #404040;
      z-index: 1;
    }
    `;
    return html;
  }

  function css_mogeneral() {
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
    html += "#mopostEvent_div{width:75vw;height:90vw;border:0px;left:8vw;top:45vw;position:fixed;z-index:1;padding:4.2vw;padding-bottom:6vw;background:white;box-shadow:0px 2px 9px -4px #a0a0a0;border-radius:5px;animation:fadeup 0.4s ease forwards;}";
    html += `
    #mosubmit_pendingbox_back{
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
    #mosubmit_pendingbox{
      animation: fadeup .4s ease forwards;
      transition:all 0.3s ease;
      position: fixed;
      top: calc(50% - 17vw);
      left: calc(50% - 26vw);
      width: 52vw;
      height: 34vw;
      background: #fff;
      border-radius: 5px;
      box-shadow: 0px 5px 15px -14px #404040;
      z-index: 1;
    }
    `;
    return html;
  }

  return (css_degeneral() + css_mogeneral());
}
