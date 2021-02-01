module.exports = function () {
  function css_degeneral(){
    let html = '';
    html += "@keyframes fadeout{from,50%{opacity:1;}to{opacity:0;}}";
    html += "@keyframes fadein{from,30%{opacity:0;}to{opacity:1;}}";
    html += "@keyframes fadeingray{from,30%{opacity:0;}to{opacity:0.3;}}";
    html += "@keyframes fadedown{from,50%{opacity:1;transform:translateY(0px);}to{opacity:0;transform:translateY(10px);}}";
    html += "@keyframes fadeup{from,30%{opacity:0;transform: translateY(9px);}to{opacity:1;transform:translateY(0px);}}";
    html += "#bodymain0817{position:relative;top:0px;width:100%;}";
    html += "#totalcontents{display:block;position:relative;width:100%;height:auto;padding-top:362px;}";
    html += "#mototalcontents{display:none;}";
    html += "#paymentback{display:block;position:absolute;top:72px;width:100%;height:560px;background-size: 100% auto;background-position: 50% 50%;transition:all 1.2s ease;}";
    html += "#paymentgrayback{display:block;position:absolute;top:632px;width:100%;height:1535px;background-color:#f7f7f7;}";
    html += "#paymenttitle{display:block;position:absolute;top:157px;width:1200px;height:128px;left:50%;margin-left:-600px;}";
    html += "#paymentbase{display:block;position:relative;padding-bottom:10px;margin-bottom:180px;left:50%;width:1050px;margin-left:-526px;border-radius:7px;background:white;box-shadow:0px 4px 16px -14px #808080;}";
    html += "#paymentbox{position:relative;width:100%;padding-top:95px;transition:all 0.5s ease;}";
    html += ".paymentblock{display:block;position:relative;background:white;margin-bottom:105px;width:83.8%;margin-left:8.1%;border-bottom: 1px solid #ececec;}";
    html += ".paymentblock_detail{display:block;position:relative;background-repeat:no-repeat;background-size: 100% auto;top:0;left:0;}";
    html += ".below_box_submit_box{transition:all 0.5s ease;position:absolute;top:0;left:50%;width:136px;height:100%;margin-left:-68px;border-radius:3px;background:#2fa678;cursor:pointer;}";
    html += ".below_box_submit{position:absolute;height:22px;left:50%;margin-left:-40.5px;top:17px;transition:opacity 0.5s ease;}";
    html += ".below_box_submit:hover{opacity:0.5;}";
    html += "#termsmenu{margin-top:-240px;}";
    html += "#termsmenu,#terms0,#terms1,#terms2{display:block;position:relative;width:1400px;left:50%;margin-left:-700px;}";
    html += "#terms0,#terms1,#terms2{margin-bottom:200px;}";
    html += ".termslabel{display:inline;font-size:15.8px;cursor:pointer;}";
    html += ".termslabel > b{color:#dddddd;}";
    html += ".termsh1,.termsh2,.termsh3,.termparagraph{font-size:15px;font-family:'Noto Sans KR', sans-serif;text-decoration:none;text-transform:none;color:#404040;line-height:17px;letter-spacing:-0.50px;text-shadow:none;line-height:1.8;text-align:left;}";
    html += ".termsh1{display:block;position:relative;left:-1.5px;font-size:36px;color:#404040;margin-top:60px;margin-bottom:-2px;}";
    html += ".termsh2{display:block;position:relative;font-size:15.8px;text-align:left;}";
    html += ".termsh3{display:block;position:relative;font-size:17px;margin-top:42px;}";
    html += ".termsgreenbar{display:block;position:relative;height:2px;left:1px;background-color:#2fa678;margin-bottom:45px;}";
    html += ".termsgreenbara0{width:275px;}";
    html += ".termsgreenbara1{width:126px;}";
    html += ".termsgreenbara2{width:63px;}";
    html += "#cancel_back{position:fixed;width:100%;height:100%;top:0;left:0;z-index:1;background:#202020;opacity:0;animation:fadeingray 0.4s ease forwards;}";
    html += "#paymentwhite{width:832px;border:0px solid;left:calc(50% - 441px);top:21%;position:fixed;z-index:1;padding:25px;padding-top:29px;padding-bottom:29px;background:white;box-shadow:0px 2px 9px -4px #a0a0a0;border-radius: 5px;animation:fadeup 0.4s ease forwards;}";
    html += ".paymentwhitetitle{display:block;position:relative;top:0;width:100%;height:178px;}";
    html += ".paymentwhitediv{position:absolute;background-repeat:no-repeat;}";
    html += ".paymentwhiteinputbox{display:block;position:relative;top:0;width:100%;height:300px;}";
    html += ".paymentwhiteinput{position:absolute;background:#f7f7f7;border-radius:4px;}";
    html += ".paymentwhiteinput_text{text-align:center;width:100%;height:100%;border:0;outline:0;background-color:transparent;font-family:'Noto Sans KR', sans-serif;font-size:14px;height:29.5px;text-decoration:none;text-transform:none;color:#303030;line-height:17px;letter-spacing:-0.50px;text-shadow:none;padding:0;padding-bottom:3px;}";
    html += ".paymentwhiteinput_img{position:absolute;top:0;left:0;width:100%;height:100%;opacity:0;transition:opacity 0.5s ease;}";
    html += ".paymentwhiteinput_img_check:checked ~ .paymentwhiteinput_img{opacity:1;}";
    html += ".paymentwhiteinput_policy{position:relative;text-align: left;overflow-y:scroll;height:152px;width:95%;top:17px;padding-left:2.5%;color:#404040;line-height:165%;letter-spacing:-0.3px;word-spacing:-0.5px;font-family:'Noto Sans KR', sans-serif;font-size:11px;-ms-overflow-style:none;}";
    html += ".paymentwhiteinput_policy::-webkit-scrollbar{display:none;}";
    html += ".thankyou_block{position:relative;display:block;width:86%;padding-left:7%;margin-bottom:93px;animation:fadeup 0.6s ease forwards;}";
    html += ".thankyou_block_title{position:relative;height:242px;background-repeat:no-repeat;background-size:100% auto;width:100%;}";
    html += ".thankyou_block_image{position:absolute;top:50px;left:320px;width:408px;}";
    html += ".thankyou_block_imagebox{position:relative;width:100%;}";
    html += ".thankyou_block_imagebox_detail{background-repeat:no-repeat;background-size:auto 100%;width:24.25%;height:100%;background-position:50% 50%;overflow:hidden;display:inline-block;margin-right:1%;border-radius:4px;box-shadow:0px 4px 16px -8px #808080;}";

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
    html += "#mopaymentback{display:block;position:relative;width:100%;height:255px;background-size: auto 100%;background-position: 44% 65%;transition:all 1.2s ease;}";
    html += "#mopaymenttitle{display:block;position:absolute;top:59px;width:320px;height:auto;left:50%;margin-left:-160px;}";
    html += "#mopaymentbox{display:block;position:relative;margin-top:2.2vw;margin-bottom:6vw;left:0;width:100%;background:white;padding-bottom:0.1vw;opacity:1;padding-top:9.6vw;text-align:center;}";
    html += ".mopaymentblock{display:block;position:relative;background:white;margin-bottom:13.6vw;width:87.8%;margin-left:auto;margin-right:auto;}";
    html += ".mothankyou_block{position:relative;display:block;width:96%;padding-left:2%;margin-bottom:10vw;padding-top:5.5vw;animation:fadeup 0.6s ease forwards;}";
    html += ".mothankyou_block_title{position:relative;height:23vw;background-repeat:no-repeat;background-size:100% auto;width:100%;}";
    html += ".mothankyou_block_image{position:relative;left:0;width:90vw;}";
    html += ".mothankyou_block_imagebox{position:relative;width:100%;}";
    html += ".mothankyou_block_imagebox_detail{background-repeat:no-repeat;background-size:auto 101%;margin-top:6.5vw;width:41%;height:62vw;background-position:50% 50%;overflow:hidden;display:inline-block;margin-right:2%;border-radius:4px;box-shadow:0px 4px 16px -8px #808080;}";
    html += ".mothankyou_block:nth-child(1){margin-top:-4.2vw;}";
    html += ".mothankyou_block:nth-child(2){background-color:#f7f7f7;padding-bottom:18vw;padding-top:14vw;margin-top:-3vw;}";
    html += ".mothankyou_block:nth-child(3){margin-top:-1vw;}";
    html += "#motermsmenu,#moterms0,#moterms1,#moterms2{display:block;position:relative;width:87.9vw;left:50%;margin-left:-43.95vw;}";
    html += "#moterms0,#moterms1,#moterms2{margin-bottom:25vw;}";
    html += ".termslabel{display:inline;font-size:15.8px;cursor:pointer;}";
    html += ".termslabel > b{color:#dddddd;}";
    html += ".termsh1,.termsh2,.termsh3,.termparagraph{font-size:13px;font-family:'Noto Sans KR', sans-serif;text-decoration:none;text-transform:none;color:#404040;line-height:17px;letter-spacing:-0.50px;text-shadow:none;line-height:1.8;text-align:left;}";
    html += ".termsh1{display:block;position:relative;left:-1.5px;font-size:28px;color:#404040;margin-top:40px;margin-bottom:-2px;}";
    html += ".termsh2{display:block;position:relative;font-size:15px;top:18px;transform:scale(0.9);transform-origin:0% 0%;text-align:left;}";
    html += ".termsh3{display:block;position:relative;font-size:15px;margin-top:42px;}";
    html += ".termsgreenbar{display:block;position:relative;height:2px;left:1px;background-color:#2fa678;margin-bottom:25px;}";
    html += ".termsgreenbara0{width:213px;}";
    html += ".termsgreenbara1{width:99px;}";
    html += ".termsgreenbara2{width:48px;}";
    html += ".mobelow_box_submit_box{transition:all 0.5s ease;position:absolute;top:0;left:50%;width:26vw;height:100%;margin-left:-13vw;border-radius:3px;background:#2fa678;cursor:pointer;margin-top: 2vw;}";
    html += ".mobelow_box_submit{position:absolute;height:4.3vw;left:50%;margin-left:-8vw;top:3.7vw;transition:opacity 0.5s ease;}";
    html += ".mobelow_box_submit:hover{opacity:0.5;}";
    html += "#mopaymentwhite{width:80vw;border:0px solid;left:4vw;top:18%;position:fixed;z-index:1;padding:6vw;padding-top:7vw;padding-bottom:7vw;background:white;box-shadow:0px 2px 9px -4px #a0a0a0;border-radius: 5px;animation:fadeup 0.4s ease forwards;}";
    html += ".mopaymentwhitetitle{display:block;position:relative;top:0;width:100%;height:49vw;}";
    html += ".mopaymentwhitediv{position:absolute;background-repeat:no-repeat;background-position:50%;}";
    html += ".mopaymentwhiteinputbox{display:block;position:relative;top:0;width:100%;height:56vw;}";
    html += ".mopaymentwhiteinput{position:absolute;background:#f7f7f7;border-radius:4px;}";
    html += ".mopaymentwhiteinput_text{text-align:center;width:100%;height:100%;border:0;outline:0;background-color:transparent;font-family:'Noto Sans KR', sans-serif;font-size:3.2vw;text-decoration:none;text-transform:none;color:#303030;line-height:1.7;letter-spacing:-0.50px;text-shadow:none;padding:0;padding-bottom:0.8vw;}";
    html += ".mopaymentwhiteinput_img{position:absolute;top:0;left:0;width:100%;height:100%;opacity:0;transition:opacity 0.5s ease;}";
    html += ".mopaymentwhiteinput_img_check:checked ~ .mopaymentwhiteinput_img{opacity:1;}";
    html += ".mopaymentwhiteinput_policy{position:relative;text-align:left;overflow-y:scroll;height:73%;width:90%;top:13%;padding-left:5%;color:#404040;line-height:1.4;letter-spacing:-0.3px;word-spacing:-0.5px;font-family:'Noto Sans KR', sans-serif;font-size:3vw;-ms-overflow-style:none;}";
    html += ".mopaymentwhiteinput_policy::-webkit-scrollbar{display:none;}";
    html += '}';
    return html;
  }

  return (css_degeneral() + css_mogeneral());
}
