module.exports = function () {
  const flexible_media = ['@media (min-width:1611px){','@media (min-width:901px) and (max-width:1610px) {','}'];
  const width = [ 1400, 1200, 1050, 900, ];
  let html = `


#bodymain0817{position:relative;top:0px;width:100%;}
#totalcontents{display:block;position:relative;width:100%;height:auto;padding-top: 407px;}
#mototalcontents{display:none;}
#aboutback{display:block;position:absolute;top:71px;width:100%;height:336px;}
#aboutbackword{display:block;position:absolute;top:157px;width:100%;height:128px;}
.blockbox{display:block;position:relative;left:0;}
.belowbox{display:block;position:relative;width:100%;height:280px;background-color:#f7f7f7}
#belowboxposition{display:block;position:absolute;top:41px;width:1050px;height:176px;left:50%;margin-left:-525px;}
#belowbutton1{position:absolute;top:50px;left:120px;width:165px;height:70px;}
#belowbutton2{position:absolute;top:50px;left:450px;width:142px;height:70px;}
#belowbutton3{position:absolute;top:50px;left:764px;width:140px;height:70px;}
.belowbutton{background-color:#f7f7f7;opacity:0;transition:all 0.5s ease;}
.belowbutton:hover{opacity:0.6;}
.block_titlebox,.block_contentsbox,.block_contentsbox_review{
  display: block;
  position: relative;
}
.block_titlebox, .block_contentsbox{
  left: 50%;
}
.block_contentsbox_picture{
  position: absolute;
  background-position: center;
  background-size: 100%;
  border-radius:10px;
  box-shadow: 0px 6px 16px -9px #606060;
}

.block_contentsbox_process{
  position:relative;
  display:inline-block;
  border-radius: 6px;
  box-shadow: 0px 3px 15px -10px #606060;
  background-size: 102% 102%;
}
.block_contentsbox_button_proccess_arrow{
  position: absolute;
  top: 50%;
}

.block_contentsbox_button{
  display:block;
  position:absolute;
  background-color:rgb(89, 175, 137);
  border-radius:4px;
  box-shadow:0px 7px 13px -13px #606060;
  cursor:pointer;
  transition:all 0.5s ease;
}
.block_contentsbox_button:hover{
  opacity:0.8;
}
.block_contentsbox_review{
  left: 50%;
  padding-bottom:45px;
}


@keyframes popFadein {
  from,30% {opacity:0}
  to {opacity:0.4}
}

#cancelBack{
  position:fixed;
  display:block;
  width:100%;
  height:100%;
  top:0;
  left:0;
  background:#202020;
  opacity:0.4;
  animation: popFadein 0.5s ease forwards;
  cursor:pointer;
  z-index:1;
}

@keyframes popFadeup {
  from,30% {opacity:0;transform:translateY(16px)}
  to {opacity:1;transform:translateY(0px)}
}


#whitePopup{
  position:fixed;
  display:block;
  background:white;
  border-radius:5px;
  left:50%;
  box-shadow:0 6px 20px -10px #606060;
  animation: popFadeup 0.5s ease forwards;
  z-index:1;
}

.whitePopupFrame{
  display:block;
  position:relative;
  top:0;
  left:0;
  width:100%;
  height:100%;
  overflow: hidden;
  transition: all 0.5s ease;
}

.whitePopupContents{
  display:block;
  position:relative;
  top:0;
  left:0;
  width:100%;
  height:100%;

  transition: all 0.5s ease;
}





@media (max-width:900px) {

  #totalcontents{display:none;}
  #mototalcontents{display:block;position:relative;width:100%;}
  .mofooterbelow,.momafooter{display:block;position:relative;width:100%}
  .mfbelbutton{position:absolute;height:10vw;top:8vw;}
  .mfbelbu1{left:17vw;width:20vw;}
  .mfbelbu2{left:41vw;width:20vw;}
  .mfbelbu3{left:64vw;width:20vw;}
  #moaboutback{display:block;position:relative;top:0px;width:100%;height:255px;}
  #moaboutbackword{display:block;position:absolute;top:61px;width:320px;height:auto;left:50%;margin-left:-160px;}
  .moblockbox{
    display:block;
    position:relative;
    left:0;
    width: 100%;
    padding-top: 17vw;
  }
  .moblock_titlebox,.moblock_contentsbox{
    width:87.2vw;
    margin-left:auto;
    margin-right:auto;
    display:block;
    position:relative;
  }
  .moblock_contentsbox_picture{
    position: absolute;
    background-position: center;
    background-size: 100%;
    border-radius:1.5vw;
    box-shadow: 0px 6px 16px -9px #606060;
  }

  .moblock_contentsbox_process{
    position:relative;
    display:inline-block;
    border-radius: 6px;
    box-shadow: 0px 3px 15px -10px #606060;
    background-size: 102% 102%;
  }
  .moblock_contentsbox_button_proccess_arrow{
    position: absolute;
    top: 50%;
  }

  .moblock_contentsbox_review{
    transform: scale(0.99);
    transform-origin: 0 0;
    margin-top: 7vw;
  }

  #whitePopup{

    overflow:hidden;

  }


  .whitePopupFrame{
    overflow-x: hidden;
    overflow-y: scroll;

  }
  .whitePopupFrame::-webkit-scrollbar{display:none;}

  .whitePopupContents{
    height:auto;
    padding-top:0vw;
    padding-bottom:12vw;
  }

  .whitePopupGroup{
    display:block;
    position:relative;
    top:0;
    width:100%;
    overflow-x: hidden;
    overflow-y: scroll;
    transition: all 0.5s ease;
  }


}`;

  let plugin = require(`${process.cwd()}/apps/frontMaker/source/cssGeneral/contents.js`);
  return (html + plugin("big"));
}
