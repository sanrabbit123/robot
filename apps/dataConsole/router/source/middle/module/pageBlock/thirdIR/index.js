const Pages = function () {
  this.ea = "vw";
  this.margin = 4.8;
}

Pages.prototype.baseStructure = function (mode = 0, index = 1) {
  const { ea, margin } = this;
  const { createNode, createNodes, createFragment, withOut } = GeneralJs;
  let base;
  let title, contents, diagram, order;
  let titleHeight, titleWidth;

  titleHeight = 5;
  titleWidth = 10;

  base = createFragment();
  [ diagram, title, contents, order ] = createNodes([
    {
      mother: base,
      style: {
        position: "relative",
        marginTop: String(margin) + ea,
        marginLeft: String(margin) + ea,
        width: withOut(margin * 2, ea),
        height: withOut((margin * 2.5) + titleHeight, ea),
        background: "gray",
      }
    },
    {
      mother: base,
      style: {
        display: "inline-block",
        position: "relative",
        marginTop: String(margin / 2) + ea,
        marginLeft: String(margin) + ea,
        marginRight: String(margin / 2) + ea,
        width: String(titleWidth) + ea,
        height: String(titleHeight) + ea,
      },
    },
    {
      mother: base,
      style: {
        display: "inline-block",
        position: "relative",
        marginTop: String(margin / 2) + ea,
        marginLeft: String(0) + ea,
        marginRight: String(margin) + ea,
        width: withOut((margin * 2.5) + titleWidth, ea),
        height: String(titleHeight) + ea,
      },
    },
    {
      mother: base,
      text: String(index),
      style: {
        position: "absolute",
      },
    }
  ]);

  return { base, diagram, title, contents, index: order, ea };
}

Pages.prototype.render = async function (target) {
  const instance = this;
  try {
    const A1 = require("/thirdIR/pages/a1.js");
    let app, result;

    result = [];

    app = new A1();
    result.push(app.render(this.baseStructure(0, 1)));

    return result;
  } catch (e) {
    console.log(e);
  }
};

module.exports = Pages;
