module.exports = function () {
  function css_degeneral(){
    let html = '';
    html += "#bodymain0817{position:relative;top:0px;width:100%;}";
    html += "#totalcontents{display:block;position:relative;width:100%;height:auto;padding-top:362px;}";
    html += "#mototalcontents{display:none;}";
    html += "#thankyouback{display:block;position:absolute;top:72px;width:100%;height:560px;background-size: 100% auto;background-position: 50% 50%;transition:all 1.2s ease;}";
    html += "#consultingback{display:block;position:absolute;top:72px;width:100%;height:560px;background-size: 100% auto;background-position: 50% 50%;transition:all 1.2s ease;}";
    html += "#consultinggrayback{display:block;position:absolute;top:632px;width:100%;height:1800px;background-color:#f7f7f7;}";
    html += "#consultingtitle{display:block;position:absolute;transition: all 0.5s ease}";
    html += "#consultingbase{display:block;position:relative;padding-bottom:10px;margin-bottom:120px;left:50%;width:1050px;margin-left:-526px;border-radius:7px;background:white;box-shadow:0px 4px 16px -14px #808080;}";
    html += "#consultingbox{position:relative;width:100%;padding-top:88px;transition:all 0.5s ease;}";
    html += ".consultingblock{display:block;position:relative;background:white;margin-bottom:86px;width:83.8%;margin-left:8.1%;}";


    html += ".consultingblock_title{display:block;position:relative;height:19px;}";
    html += ".consultingblock_titlegray{position:absolute;border-bottom:1px solid #dddddd;width:100%;top:6px;left:0;}";
    html += ".consultingblock_subtitle{position:absolute;height:18px;background-repeat:no-repeat;background-size: auto 100%;background-position:left;}";
    html += ".consulting_inputblock{background: #f2f2f2;border-radius:3px;position:absolute;transition:opacity 0.5s ease;}";
    html += ".consulting_input{width:100%;height:100%;border:0;outline:0;background-color:transparent;font-family:'Noto Sans KR', sans-serif;font-size:14px;height:28.5px;text-decoration:none;text-transform:none;color:#303030;line-height:17px;letter-spacing:-0.50px;text-shadow:none;padding:0;padding-bottom:3px;}";
    html += ".blocks_address_button{position:absolute;background:#2fa678;height:31px;border-radius:3px;cursor:pointer;}";
    html += ".blocks_address_button_img{position:absolute;left:50%;cursor:pointer;transition:opacity 0.5s ease;}";
    html += ".blocks_address_button_img:hover{opacity:0.7;}";
    html += ".blocks_budgetbox{top:48px;right:0;width:88.9%;height:84px;position:absolute;}";
    html += ".blocks_budgetbox_money{position:relative;display:inline-block;margin-right:36px;height:44px;cursor:pointer;}";
    html += ".blocks_budgetbox_money_gray{position:absolute;border-right:1.2px solid #dcdcdc;height:10px;top:12px;left:50%;}";
    html += "#blocks_budgetbox_arrow{position:absolute;top:0;left:0;transform:translateX(36px);transition:transform 0.5s ease;}";
    html += ".blocks_budgetbox_gray {position:absolute;border-bottom:1.2px solid #dcdcdc;width:100%;top:16px;}";
    html += ".blocks_budgetbox_money_on,.blocks_budgetbox_money_off{height:14px;left:0;top:29px;background-repeat:no-repeat;background-size:auto 100%;}";
    html += ".blocks_budgetbox_money_off{position:relative;}";
    html += ".blocks_budgetbox_money_on{position:absolute;opacity:0;background:white;transition:opacity 0.5s ease;}";
    html += ".blocks_budgetbox_money_input:checked ~ .blocks_budgetbox_money_on{opacity:1;}";
    html += ".blocks_budgetbox_gray{position:absolute;border-bottom:1.2px solid #dcdcdc;width:100%;top:16px;}";
    html += ".blocks_budgetbox_etc{position:absolute;bottom:1px;right:0;height:15px;width:408px;}";
    html += ".blocks_pyeong_word,.blocks_date_word,.blocks_space,.blocks_pyeong_sub{position:absolute;height:18px;background-repeat:no-repeat;background-size:auto 100%;width:100px;}";
    html += ".blocks_pyeong_sub{height:14px;}";
    html += ".blocks_date_resident,.blocks_contract{position:absolute;}";
    html += ".blocks_date_resident_on,.blocks_date_resident_off,.blocks_contract_off,.blocks_contract_on{height:18px;left:0;top:0;background-repeat:no-repeat;background-size:auto 100%;background-color:white;width:80px;cursor:pointer;}";
    html += ".blocks_date_resident_off,.blocks_contract_off{position:relative;}";
    html += ".blocks_date_resident_on,.blocks_contract_on{position:absolute;opacity:0;transition:opacity 0.5s ease;}";
    html += ".blocks_date_resident_checkbox:checked ~ .blocks_date_resident_on,.blocks_date_contract_radio:checked ~ .blocks_contract_on{opacity:1;}";
    html += ".blocks_space_bar{border-left:1.3px solid #2fa678;height:16px;position:absolute;}";
    html += ".blocks_space_box{position:relative;height:24px;overflow:visible;display:inline-block;}";
    html += ".blocks_space_box_arrow{top:0px;position:absolute;width:7px;left:0px;transition:transform 0.5s ease;}";
    html += ".blocks_space_box_div{position:absolute;height:24px;top:0;}";
    html += ".blocks_space_box_img{position:absolute;height:14px;cursor:pointer;bottom:0;background-repeat:no-repeat;background-size:auto 100%;width:60px;background-color:white;}";
    html += ".blocks_space_box_img_on{opacity:0;transition:opacity 0.5s ease;}";
    html += ".blocks_space_box_input:checked ~ .blocks_space_box_img_on{opacity:1;}";
    html += ".blocks_etc{position:absolute;top:100px;left:122px;width:758px;height:97px;border-radius:4px;background:#f2f2f2;}";
    html += ".blocks_etc_textarea{background-color:transparent;top:0;left:0;border:0;outline:0;font-family:'Noto Sans KR', sans-serif;font-size:14px;color:#404040;line-height:1.7;letter-spacing:-0.50px;text-shadow:none;text-decoration:none;text-transform:none;padding:9px;padding-top:10.5px;padding-left:15px;padding-right:15px;position:absolute;width:100%;height:100%;text-align:left;-ms-overflow-style:none;}";
    html += ".below_box{position:relative;display:block;border-radius:3px;margin-bottom:20px;background:white;}";
    html += ".below_servey{border:1px solid #ececec;}";
    html += ".below_box_policy{position:relative;text-align:left;overflow-y:scroll;height:105px;width:95%;padding-left:2.5%;color:#404040;line-height:165%;letter-spacing:-0.3px;word-spacing:-0.5px;font-family:'Noto Sans KR', sans-serif;font-size:11px;-ms-overflow-style:none;}";
    html += ".below_box_policy::-webkit-scrollbar{display:none;}";
    html += ".below_box_checkbox_div{position:relative;display:block;top:0;height:15px;cursor:pointer;}";
    html += ".below_box_checkbox{position:absolute;height:15px;right:0;}";
    html += ".below_box_checkbox_on{opacity:0;transition:opacity 0.5s ease;}";
    html += ".below_box_checkbox_input:checked ~ .below_box_checkbox_on{opacity:1;}";
    html += ".below_box_submit_box{position:absolute;top:0;left:50%;width:136px;height:100%;margin-left:-68px;border-radius:3px;background:#2fa678;cursor:pointer;}";
    html += ".below_box_submit{position:absolute;height:22px;left:50%;margin-left:-40.5px;top:17px;transition:opacity 0.5s ease;}";
    html += ".below_box_submit:hover{opacity:0.5;}";
    html += ".below_servey_question{position:absolute;display:block;width:100%;top:41px;height:17px;}";
    html += ".below_servey_detail_box{position:relative;display:inline-block;height:100%;cursor:pointer;}";
    html += ".below_servey_detail{position:absolute;height:100%;top:0;left:0;margin-right:20px;}";
    html += ".below_servey_detail_off{position:relative;}";
    html += ".below_servey_details{position:relative;display:inline-block;margin-left:auto;margin-right:auto;top:74px;left:0px;height:14px;}";
    html += ".below_servey_detail_on{opacity:0;transition:opacity 0.5s ease;}";
    html += ".below_servey_detail_input:checked ~ .below_servey_detail_on{opacity:1}";
    html += ".below_servey_title{position:absolute;width:74px;left:9px;top:-9px;height:18px;padding-left:9px;background:white;}";
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
    html += "#cancel_back{position:fixed;width:100%;height:100%;top:0;left:0;z-index:1;}";
    html += "#postEvent_div{width:50%;height:45.5%;border:0px solid;left:calc(25% - 25px);top:27%;position:fixed;z-index:1;padding:25px;padding-bottom:30px;background:white;box-shadow:0px 2px 9px -4px #a0a0a0;border-radius: 5px;animation:fadeup 0.4s ease forwards;}";
    html += ".thankyou_block{position:relative;display:block;width:86%;padding-left:7%;margin-bottom:35px;animation:fadeup 0.6s ease forwards;}";
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
    html += "#mothankyouback{display:block;position:absolute;width:100%;height:255px;background-size: auto 100%;background-position: 44% 65%;transition:all 1.2s ease;}";
    html += "#moconsultingback{display:block;position:relative;width:100%;height:255px;background-size: auto 100%;background-position: 44% 65%;transition:all 1.2s ease;}";
    html += "#moconsultingtitle{display:block;position:absolute;transition:all 0s ease;}";
    html += "#moconsultingbox{display:block;position:relative;margin-top:2.5vw;margin-bottom:6vw;left:0;width:100%;background:white;padding-bottom:0.1vw;opacity:1;padding-top:9.6vw;text-align:center;}";
    html += ".moconsultingblock{display:block;position:relative;background:white;margin-bottom:13.6vw;width:87.8%;margin-left:auto;margin-right:auto;}";


    html += ".moconsultingblock_titlegray{position:absolute;border-bottom:1px solid #dddddd;width:100%;top:1.4vw;left:0;}";
    html += ".moconsultingblock_subtitle{position:absolute;height:4vw;background-repeat:no-repeat;background-size: auto 100%;}";
    html += ".moconsulting_inputblock{background: #f2f2f2;border-radius:3px;position:absolute;transition:opacity 0s ease;}";
    html += ".moconsulting_input{width:100%;height:100%;border:0;outline:0;background-color:transparent;font-family:'Noto Sans KR', sans-serif;font-size:3.4vw;height:6.4vw;text-decoration:none;text-transform:none;color:#303030;line-height:1.7;letter-spacing:-0.50px;text-shadow:none;padding:0;padding-bottom:0.5vw;}";
    html += ".moblocks_address_button{position:absolute;background:#2fa678;height:7.1vw;border-radius:3px;cursor:pointer;}";
    html += ".moblocks_budgetbox{position:relative;top:11.8vw;text-align:left;padding-left:8vw;height:22vw;}";
    html += ".moblocks_budgetbox_money{position:relative;display:inline-block;margin-left:10.2vw;height:5.5vw;cursor:pointer;width:16vw;overflow:visible;}";
    html += ".moblocks_budgetbox_money_on,.moblocks_budgetbox_money_off{height:3vw;left:0;top:0;background-repeat:no-repeat;background-size:auto 100%;}";
    html += ".moblocks_budgetbox_money_off{position:relative;}";
    html += ".moblocks_budgetbox_money_on{position:absolute;opacity:0;top:0;background:white;transition:opacity 0s ease;}";
    html += ".moblocks_budgetbox_money_input:checked ~ .moblocks_budgetbox_money_on{opacity:1;}";
    html += ".moblocks_budgetbox_etc{position:absolute;bottom:0;right:0;height:2.99vw;}";
    html += ".moblocks_pyeong_word,.moblocks_date_word,.moblocks_space,.moblocks_pyeong_sub{position:absolute;height:3.8vw;background-repeat:no-repeat;background-size:auto 100%;width:7vw;}";
    html += ".moblocks_date_resident,.moblocks_contract{position:absolute;}";
    html += ".moblocks_date_resident_on,.moblocks_date_resident_off,.moblocks_contract_off,.moblocks_contract_on{height:3.9vw;left:0;top:0;background-repeat:no-repeat;background-size:auto 100%;background-color:white;width:20vw;cursor:pointer;}";
    html += ".moblocks_date_resident_off,.moblocks_contract_off{position:relative;}";
    html += ".moblocks_date_resident_on,.moblocks_contract_on{position:absolute;opacity:0;transition:opacity 0s ease;}";
    html += ".moblocks_date_resident_checkbox:checked ~ .moblocks_date_resident_on,.moblocks_date_contract_radio:checked ~ .moblocks_contract_on{opacity:1;}";
    html += ".moblocks_space_total{position:absolute;height:7.4vw;left:28.5vw;border:0.5px solid #ececec;box-sizing:border-box;border-radius:3px;text-align:left;overflow:hidden;}";
    html += ".moblocks_space_box{position:absolute;top:0;height:100%;}";
    html += ".moblocks_space{background-repeat:no-repeat;cursor:pointer;background-size:auto 3vw;background-position:50% 46%;width:100%;position:absolute;height:100%;box-sizing:border-box;}";
    html += ".moblocks_space_on{background-color:#2fa678;opacity:0;transition:opacity 0s ease;}";
    html += ".moblocks_space_box_input:checked ~ .moblocks_space_on{opacity:1;}";
    html += ".moblocks_etc{position:absolute;top:39.5vw;left:28.6vw;width:59.2vw;height:20.4vw;border-radius:3px;background:#f2f2f2;}";
    html += ".moblocks_etc_textarea{background-color:transparent;border:0;outline:0;font-family:'Noto Sans KR', sans-serif;font-size:3.4vw;color:#404040;line-height:1.6;letter-spacing:-0.50px;left:0;top:0;text-shadow:none;text-decoration:none;text-transform:none;padding:2.2vw;padding-top:2.2vw;padding-left:3vw;padding-right:3vw;position:absolute;width:100%;height:100%;text-align:left;-ms-overflow-style:none;}";
    html += ".mobelow_box{position:relative;display:block;border-radius:3px;margin-bottom:3.2vw;background:white;}";
    html += ".mobelow_servey{border:1px solid #ececec;}";
    html += ".mobelow_box_policy{text-align: left;position:relative;overflow-y:scroll;height:27vw;width:90%;padding-left:5%;color:#404040;line-height:165%;letter-spacing:-0.3px;word-spacing:-0.5px;font-family:'Noto Sans KR', sans-serif;font-size:3vw;-ms-overflow-style:none;}";
    html += ".mobelow_box_policy::-webkit-scrollbar{display:none;}";
    html += ".mobelow_box_checkbox_div{position:relative;display:block;top:0;height:3.2vw;cursor:pointer;}";
    html += ".mobelow_box_checkbox{position:absolute;height:3.2vw;right:0;background-repeat:no-repeat;background-size:auto 100%;background-color:white;width:55vw;background-position:100% 0;}";
    html += ".mobelow_box_checkbox_on{opacity:0;transition:opacity 0s ease;}";
    html += ".mobelow_box_checkbox_input:checked ~ .mobelow_box_checkbox_on{opacity:1;}";
    html += ".mobelow_box_submit_box{position:absolute;top:0;left:50%;width:26vw;height:100%;margin-left:-13vw;border-radius:3px;background:#2fa678;cursor:pointer;margin-top: 2vw;}";
    html += ".mobelow_box_submit{position:absolute;height:4.3vw;left:50%;margin-left:-8vw;top:3.5vw;transition:opacity 0s ease;}";
    html += ".mobelow_box_submit:hover{opacity:0.5;}";
    html += ".mobelow_servey_question{position:absolute;display:block;width:100%;top:8vw;height:3.6vw;}";
    html += ".mobelow_servey_detail_box{position:absolute;display:inline-block;height:3.5vw;width: 20vw;cursor:pointer;}";
    html += ".mobelow_servey_detail{position:absolute;height:3.8vw;top:0;left:0;background-repeat:no-repeat;background-size:auto 100%;background-color:white;}";
    html += ".mobelow_servey_detail_factors{position:absolute;height:3.4vw;top:0;left:0;background-repeat:no-repeat;background-size:auto 100%;background-color:white;width:20vw}";
    html += ".mobelow_servey_details{position:relative;display:inline-block;width:100%;top:15.7vw;left:0;height:9.6vw;}";
    html += ".mobelow_servey_detail_on{opacity:0;transition:opacity 0s ease;}";
    html += ".mobelow_servey_detail_input:checked ~ .mobelow_servey_detail_on{opacity:1}";
    html += ".mobelow_servey_title{position:absolute;width:74px;left:9px;top:-2vw;height:18px;padding-left:9px;background-repeat:no-repeat;background-size:auto 100%;background:white;}";
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

    html{-ms-touch-action: manipulation;touch-action: manipulation;}

    `;
    html += "#mopostEvent_div{width:75vw;height:90vw;border:0px;left:8vw;top:45vw;position:fixed;z-index:1;padding:4.2vw;padding-bottom:6vw;background:white;box-shadow:0px 2px 9px -4px #a0a0a0;border-radius:5px;animation:fadeup 0.4s ease forwards;}";
    html += ".mothankyou_block{position:relative;display:block;width:100%;margin-bottom:5.2vw;animation:fadeup 0.6s ease forwards;}";
    html += ".mothankyou_block_title{position:relative;height:23vw;background-repeat:no-repeat;background-size:100% auto;width:100%;}";
    html += ".mothankyou_block_image{position:relative;left:0;width:90vw;}";
    html += ".mothankyou_block_imagebox{position:relative;width:100%;}";
    html += ".mothankyou_block_imagebox_detail{background-repeat:no-repeat;background-size:auto 101%;width:41%;height:62vw;background-position:50% 50%;overflow:hidden;display:inline-block;margin-right:2%;border-radius:4px;box-shadow:0px 4px 16px -8px #808080;}";
    html += '}';
    return html;
  }

  return (css_degeneral() + css_mogeneral());
}
