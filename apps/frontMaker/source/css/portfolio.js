module.exports = function () {
  let html = `
  #bodymain0817{position:relative;top:0px;width:100%;}
  #totalcontents{display:block;position:relative;padding-top:407px;width:100%;height:auto;}
  #mototalcontents{display:none;}

  @media (max-width:900px) {
    #bodymain0817{position:relative;top:0px;width:100%;}
    #mototalcontents{display:block;position:relative;width:100%;}
    #totalcontents{display:none;}
  }`;

  let plugin = require(`${process.cwd()}/apps/frontMaker/source/cssGeneral/contents.js`);
  return html + plugin("big");
}
