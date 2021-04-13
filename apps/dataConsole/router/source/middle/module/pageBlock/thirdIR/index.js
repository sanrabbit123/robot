const Pages = function () {
  this.mother = new GeneralJs();
}

Pages.prototype.modeRender = function (obj) {
  if (typeof obj !== "object") {
    throw new Error("invaild argument");
  }
  if (obj.mode === undefined || obj.title === undefined || obj.contents === undefined || obj.index === undefined) {
    throw new Error("invaild argument");
  }
  const instance = this;
  const ratio = (16 / 9);
  const { returnHash } = this.mother;
  const { colorChip, createFragment, createNode, createNodes, withOut, vwConvert, willDo } = GeneralJs;
  let ea, margin;
  let width, height;
  let base;
  let title, contents, diagram, textArea, order;
  let titleHeight, titleWidth, indexSize;
  let hashWidth, hashMargin;
  let etcDoms;
  let marginVisualRatio;
  let requestArr, frameArr;
  let top1, top2, top3;
  let titleFontSize, contentsFontSize;
  let mode23VisualRatio;

  height = window.innerHeight;
  width = height * ratio;

  marginVisualRatio = 0.9;

  if (window.innerWidth >= width) {

    ea = "vh";
    margin = 4.8 * ratio;
    titleHeight = 4.1 * ratio;
    titleWidth = (10 + (obj.mode < 2 ? 0 : 8)) * ratio;
    indexSize = 0.8 * ratio;
    hashWidth = 0.92 * ratio;
    hashMargin = 0.45 * ratio;
    top1 = 0.2 * ratio;
    top2 = -0.35 * ratio;
    titleFontSize = 1.9 * ratio;
    top3 = -0.3 * ratio;
    contentsFontSize = 0.9 * ratio;
    mode23VisualRatio = 0.11;

  } else {

    ea = "vw";
    margin = 4.8;
    titleHeight = 4.1;
    titleWidth = 10 + (obj.mode < 2 ? 0 : 8);
    indexSize = 0.8;
    hashWidth = 0.92;
    hashMargin = 0.45;
    top1 = 0.2;
    top2 = -0.35;
    titleFontSize = 1.9;
    top3 = -0.3;
    contentsFontSize = 0.9;
    mode23VisualRatio = 0.24;

  }

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
          height: withOut((margin * (2 + 1)) + titleHeight, ea),
        }
      },
      {
        mother: base,
        style: {
          display: "inline-block",
          position: "relative",
          marginTop: String(margin * marginVisualRatio) + ea,
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
          marginTop: String(margin * marginVisualRatio) + ea,
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
          bottom: String(margin * 1.15) + ea,
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
          marginTop: String(margin * 1.05) + ea,
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
          marginTop: String(margin * 1.05) + ea,
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
          marginTop: String(margin * 0.9) + ea,
          marginLeft: String(margin) + ea,
          width: withOut(margin * 2, ea),
          height: withOut((margin * (2 + 1)) + titleHeight, ea),
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
          background: "gray",
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
        top: String(top1) + ea,
        left: String(0) + ea,
        width: String(hashWidth) + ea,
      }
    },
    {
      mother: title,
      text: obj.title,
      style: {
        position: "absolute",
        top: String(top2) + ea,
        left: String(hashWidth + hashMargin) + ea,
        height: "auto",
        fontSize: String(titleFontSize) + ea,
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
        top: String(top3) + ea,
        left: String(0) + ea,
        height: "auto",
        fontSize: String(contentsFontSize) + ea,
        fontWeight: String(300),
        lineHeight: String(1.72),
      }
    }
  ]);

  requestArr = [];
  for (let i = 0; i < obj.diagram.length; i++) {
    for (let j = 0; j < obj.diagram[i].length; j++) {
      requestArr.push({
        mother: diagram,
        mode: "svg",
        source: obj.diagram[i][j],
        style: {
          position: "absolute",
          top: String(0) + ea,
          left: String(0) + ea,
          height: String(100) + '%',
          width: String(100) + '%',
          opacity: String(i === 0 ? 1 : 0),
          background: (obj.animation[i][j].white ? "white" : "transparent"),
          animation: `pageAni_${obj.animation[i][j].mode}_${obj.animation[i][j].forwards ? "forwards" : "noforwards"} ${obj.animation[i][j].forwards ? String(0.4) : String((0.4 * 2) + 2)}s ease ${String(i * 2.4)}s forwards`,
        }
      });
    }
  }

  if (requestArr.length > 0) {
    frameArr = createNodes(requestArr);
  }

  if (obj.mode === 2 || obj.mode === 3) {
    willDo(() => { textArea.style.height = String(etcDoms[1].getBoundingClientRect().height + vwConvert(margin * mode23VisualRatio) + etcDoms[2].getBoundingClientRect().height) + "px"; });
  }

  return base;
}

Pages.prototype.render = async function (target) {
  const instance = this;
  try {
    let app, result;

    const $TOTAL_MODULEOBJECT = require("/thirdIR/pages/a" + String(target) + ".js");
    const ThisClass = $TOTAL_MODULEOBJECT[Object.keys($TOTAL_MODULEOBJECT)[0]];
    app = new ThisClass();

    result = [];
    result.push(this.modeRender({ ...app.render(), index: target }));

    return result;
  } catch (e) {
    console.log(e);
  }
};

module.exports = Pages;
