const Pages = function () {
  this.mother = new GeneralJs();
  this.ea = "vw";
  this.margin = 4.8;
}

Pages.prototype.modeRender = function (obj) {
  if (typeof obj !== "object") {
    throw new Error("invaild argument");
  }
  if (obj.mode === undefined || obj.title === undefined || obj.contents === undefined || obj.index === undefined) {
    throw new Error("invaild argument");
  }
  const instance = this;
  const { returnHash } = this.mother;
  const { ea, margin } = this;
  const { colorChip, createFragment, createNode, createNodes, withOut, vwConvert, willDo } = GeneralJs;
  let base;
  let title, contents, diagram, textArea, order;
  let titleHeight, titleWidth, indexSize;
  let hashWidth, hashMargin;
  let etcDoms;

  titleHeight = 4.1;
  titleWidth = 10 + (obj.mode < 2 ? 0 : 8);
  indexSize = 0.8;

  hashWidth = 0.92;
  hashMargin = 0.45;

  base = createFragment();

  if (obj.mode === 0) {
    [ diagram, title, contents, order ] = createNodes([
      {
        mother: base,
        style: {
          position: "relative",
          marginTop: String(margin) + ea,
          marginLeft: String(margin) + ea,
          width: withOut(margin * 2, ea),
          height: withOut((margin * 2.6) + titleHeight, ea),
          background: "gray",
        }
      },
      {
        mother: base,
        style: {
          display: "inline-block",
          position: "relative",
          marginTop: String(margin * 0.6) + ea,
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
          marginTop: String(margin * 0.6) + ea,
          marginLeft: String(0) + ea,
          marginRight: String(margin) + ea,
          width: withOut((margin * 2.5) + titleWidth, ea),
          height: String(titleHeight) + ea,
        },
      },
      {
        mother: base,
        text: String(obj.index),
        style: {
          position: "absolute",
          bottom: String(margin) + ea,
          right: String(margin) + ea,
          fontSize: String(indexSize) + ea,
          fontWeight: String(300),
          color: GeneralJs.colorChip.green,
        },
      }
    ]);
  } else if (obj.mode === 1) {
    [ title, contents, diagram, order ] = createNodes([
      {
        mother: base,
        style: {
          display: "inline-block",
          position: "relative",
          marginTop: String(margin) + ea,
          marginLeft: String(margin) + ea,
          marginRight: String(margin * 0.5) + ea,
          width: String(titleWidth) + ea,
          height: String(titleHeight) + ea,
        },
      },
      {
        mother: base,
        style: {
          display: "inline-block",
          position: "relative",
          marginTop: String(margin) + ea,
          marginLeft: String(0) + ea,
          marginRight: String(margin) + ea,
          width: withOut((margin * 2.5) + titleWidth, ea),
          height: String(titleHeight) + ea,
        },
      },
      {
        mother: base,
        style: {
          position: "relative",
          marginTop: String(margin * 0.6) + ea,
          marginLeft: String(margin) + ea,
          width: withOut(margin * 2, ea),
          height: withOut((margin * 2.6) + titleHeight, ea),
          background: "gray",
        }
      },
      {
        mother: base,
        text: String(obj.index),
        style: {
          position: "absolute",
          top: String(margin) + ea,
          right: String(margin) + ea,
          fontSize: String(indexSize) + ea,
          fontWeight: String(300),
          color: GeneralJs.colorChip.green,
        },
      }
    ]);
  } else if (obj.mode === 2) {
    [ diagram, textArea, order ] = createNodes([
      {
        mother: base,
        style: {
          display: "inline-block",
          position: "relative",
          marginTop: String(margin) + ea,
          marginLeft: String(margin) + ea,
          width: withOut((margin * 2.6) + titleWidth, ea),
          height: withOut(margin * 2, ea),
          background: "gray",
        }
      },
      {
        mother: base,
        style: {
          display: "inline-block",
          position: "relative",
          marginTop: String(margin) + ea,
          marginLeft: String(margin * 0.6) + ea,
          marginRight: String(margin) + ea,
          width: String(titleWidth) + ea,
          height: withOut(margin * 2, ea),
        },
      },
      {
        mother: base,
        text: String(obj.index),
        style: {
          position: "absolute",
          top: String(margin) + ea,
          right: String(margin) + ea,
          fontSize: String(indexSize) + ea,
          fontWeight: String(300),
          color: GeneralJs.colorChip.green,
        },
      }
    ]);

    [ title, contents ] = createNodes([
      {
        mother: textArea,
        style: {
          display: "block",
          position: "relative",
          width: String(100) + '%',
          height: String(titleHeight) + ea,
        },
      },
      {
        mother: textArea,
        style: {
          display: "block",
          position: "relative",
          marginTop: String(margin * 0.45) + ea,
          width: String(100) + '%',
        },
      }
    ]);
  } else if (obj.mode === 3) {
    [ textArea, diagram, order ] = createNodes([
      {
        mother: base,
        style: {
          display: "inline-block",
          position: "relative",
          marginTop: String(margin) + ea,
          marginLeft: String(margin) + ea,
          marginRight: String(margin * 0.6) + ea,
          width: String(titleWidth) + ea,
          height: withOut(margin * 2, ea),
        },
      },
      {
        mother: base,
        style: {
          display: "inline-block",
          position: "relative",
          marginTop: String(margin) + ea,
          marginRight: String(margin) + ea,
          width: withOut((margin * 2.6) + titleWidth, ea),
          height: withOut(margin * 2, ea),
          background: "gray",
        }
      },
      {
        mother: base,
        text: String(obj.index),
        style: {
          position: "absolute",
          top: String(margin) + ea,
          left: String(margin) + ea,
          fontSize: String(indexSize) + ea,
          fontWeight: String(300),
          color: GeneralJs.colorChip.green,
        },
      }
    ]);

    [ title, contents ] = createNodes([
      {
        mother: textArea,
        style: {
          display: "block",
          position: "relative",
          width: String(100) + '%',
          height: String(titleHeight) + ea,
        },
      },
      {
        mother: textArea,
        style: {
          display: "block",
          position: "relative",
          marginTop: String(margin * 0.45) + ea,
          width: String(100) + '%',
        },
      }
    ]);
  }

  etcDoms = createNodes([
    {
      mother: title,
      mode: "svg",
      source: returnHash(colorChip.green),
      style: {
        position: "absolute",
        top: String(0.2) + ea,
        left: String(0) + ea,
        width: String(hashWidth) + ea,
      }
    },
    {
      mother: title,
      text: obj.title,
      style: {
        position: "absolute",
        top: String(-0.35) + ea,
        left: String(hashWidth + hashMargin) + ea,
        height: "auto",
        fontSize: String(1.9) + ea,
        fontWeight: String(600),
        lineHeight: String(1.25),
      }
    },
    {
      mother: contents,
      text: obj.contents,
      bold: {
        fontWeight: String(600),
        color: colorChip.green
      },
      style: {
        position: "absolute",
        top: String(-0.3) + ea,
        left: String(0) + ea,
        height: "auto",
        fontSize: String(0.9) + ea,
        fontWeight: String(300),
        lineHeight: String(1.72),
      }
    }
  ]);

  if (obj.mode === 2 || obj.mode === 3) {
    willDo(() => { textArea.style.height = String(etcDoms[1].getBoundingClientRect().height + vwConvert(margin * 0.24) + etcDoms[2].getBoundingClientRect().height) + "px"; });
  }

  return base;
}

Pages.prototype.render = async function (target) {
  const instance = this;
  try {
    const A1 = require("/thirdIR/pages/a1.js");
    let app, result;

    result = [];

    app = new A1();
    result.push(this.modeRender({ ...app.render(), index: 1 }));

    return result;
  } catch (e) {
    console.log(e);
  }
};

module.exports = Pages;
