module.exports = function () {

  function css_degeneral() {
    let html = '@keyframes slidecolor1 {from,15%,to{transform:scaleX(0)} 21%,55%{transform:scaleX(1)}}';
    html += '@keyframes slidecolor2 {from,35%,75%,to{transform:scaleX(0)} 41%,61%{transform:scaleX(1)}}';
    html += '@keyframes slidecolor3 {from,55%,95%,to{transform:scaleX(0)} 61%,81%{transform:scaleX(1)}}';
    html += '@keyframes slidecolor4 {from,to{transform:scaleX(0);transform-origin:0% 0% 0;} 75%{transform:scaleX(0);transform-origin:100% 0% 0;} 81%{transform:scaleX(1);transform-origin:100% 0% 0;} 95%{transform:scaleX(1);transform-origin:0% 0% 0;}}';
    html += '@keyframes slideimage1 {from,16%,40%,to{opacity:0;} 20%,36% {opacity:1;}}';
    html += '@keyframes slideimage2 {from,36%,60%,to{opacity:0;} 40%,56% {opacity:1;}}';
    html += '@keyframes slideimage3 {from,56%,80%,to{opacity:0;} 60%,76% {opacity:1;}}';
    html += '@keyframes slideimage4 {from,76%,to{opacity:0;} 80%,96% {opacity:1;}}';
    html += `

    @keyframes momslibae1 {
      from{transform:translate(0vw,0);opacity:1}
      17%{transform:translate(0vw,0);opacity:1}
      20%{transform:translate(-100vw,0);opacity:1}
      21%{transform:translate(-100vw,0);opacity:0}
      22%{transform:translate(100vw,0);opacity:0}
      97%{transform:translate(100vw,0);opacity:1}
      to{transform:translate(0vw,0);opacity:1}
    }

    @keyframes momslibae2 {
      from{transform:translate(100vw,0);opacity:0}
      17%{transform:translate(100vw,0);opacity:1}
      20%{transform:translate(0vw,0);opacity:1}
      37%{transform:translate(0vw,0);opacity:1}
      40%{transform:translate(-100vw,0);opacity:1}
      41%{transform:translate(-100vw,0);opacity:0}
      42%{transform:translate(100vw,0);opacity:0}
      to{transform:translate(100vw,0);opacity:0}
    }

    @keyframes momslibae3 {
      from{transform:translate(100vw,0);opacity:0}
      37%{transform:translate(100vw,0);opacity:1}
      40%{transform:translate(0vw,0);opacity:1}
      57%{transform:translate(0vw,0);opacity:1}
      60%{transform:translate(-100vw,0);opacity:1}
      61%{transform:translate(-100vw,0);opacity:0}
      62%{transform:translate(100vw,0);opacity:0}
      to{transform:translate(100vw,0);opacity:0}
    }

    @keyframes momslibae4 {
      from{transform:translate(100vw,0);opacity:0}
      57%{transform:translate(100vw,0);opacity:1}
      60%{transform:translate(0vw,0);opacity:1}
      77%{transform:translate(0vw,0);opacity:1}
      80%{transform:translate(-100vw,0);opacity:1}
      81%{transform:translate(-100vw,0);opacity:0}
      82%{transform:translate(100vw,0);opacity:0}
      to{transform:translate(100vw,0);opacity:0}
    }

    @keyframes momslibae5 {
      from{transform:translate(-100vw,0);opacity:1}
      1%{transform:translate(-100vw,0);opacity:0}
      2%{transform:translate(100vw,0);opacity:0}
      77%{transform:translate(100vw,0);opacity:1}
      80%{transform:translate(0vw,0);opacity:1}
      97%{transform:translate(0vw,0);opacity:1}
      to{transform:translate(-100vw,0);opacity:1}
    }

    @keyframes circlesani {from,24%,to {opacity: 0.4;}4%,20% {opacity : 1;}}
    #bodymain0817{position:relative;top:0px;width:100%;}
    #totalcontents{display:block;position:relative;width:100%;height:auto;}
    #mototalcontents{display:none;}
    .circles{position:absolute;bottom:0;width:10px;height:10px;border-radius:6px;background-color:#aaaaaa;transition:all 0.5s ease;}
    .zlevel1{z-index:1}
    `;
    return html;
  }

  function css_mogeneral() {
    let html = '';

    html += '@media (max-width:900px) {';

    html += '#mainslidebox,#totalcontents{display:none;}';
    html += '#mototalcontents{display:block;position:relative;width:100%;}';
    html += '.moslide{position:absolute;top:0px;width:100%;height:100%;background-position:50% 80%;background-size:auto 100%;background-repeat:no-repeat;transition:all 0.5s ease;}';

    html += '}';
    return html;
  }


  let plugin = require(`${process.cwd()}/apps/frontMaker/source/cssGeneral/contents.js`);
  return css_degeneral() + css_mogeneral() + plugin("small");
}
