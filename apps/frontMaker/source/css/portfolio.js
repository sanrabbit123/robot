module.exports = function () {
  const orderarray = [[1,700/655],[1,7/6],[1200,1050],[1400,1050],['display:inline-block;','display:none;'],[18,12],['about.php','consulting.php']];
  const porlistratio = [0.238,0.016,0.41,0.045];


  let html = `
  #bodymain0817{position:relative;top:0px;width:100%;}
  #totalcontents{display:block;position:relative;padding-top:407px;width:100%;height:auto;}
  #mototalcontents{display:none;}

  @media (max-width:900px) {
    #bodymain0817{position:relative;top:0px;width:100%;}
    #mototalcontents{display:block;position:relative;width:100%;}
    #totalcontents{display:none;}
  }


  `;

  function css_mogeneral() {
    let html = '@media (max-width:900px) {';


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

  let plugin = require(`${process.cwd()}/apps/frontMaker/source/cssGeneral/contents.js`);
  return html + css_mogeneral() + plugin("big");
}
