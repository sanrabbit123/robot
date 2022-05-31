/<%patch%>/ {
  "patch": {
    "entire": false,
    "client": false,
    "designer": false,
    "project": false,
    "contents": false,
    "service": false,
    "photo": false
  },
  "class": {
    "client": false,
    "designer": false,
    "project": false,
    "contents": false,
    "service": false
  },
  "meta": {
    "title": [
      "thisPerson",
      "return ('홈리에종 실측 가이드 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('홈리에종 실측 가이드 페이지 입니다! | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "miniGuide",
  "route": [
    "curation",
    "SC"
  ]
} %/%/g

const MiniGuideJs = function () {
  this.mother = new GeneralJs();
  this.client = null;
  this.firstClick = false;
}

MiniGuideJs.binaryPath = "/middle/mini";

MiniGuideJs.prototype.insertInitBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, svgMaker, serviceParsing } = GeneralJs;
  const { client, ea, media, osException, testMode } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let whiteBlock;
  let blockHeight, bottomMargin;
  let leftBox, rightBox;
  let titleBox, barBox, indexBox;
  let margin;
  let leftRatio;
  let wordSpacing;
  let titleFont, titleLeft, titleFontWeight;
  let indexFont, indexFontWeight;
  let doubleQuote;
  let quoteTop, quoteLeft, quoteHeight, quoteWidth, quoteMarginBottom;
  let initWordingSize;
  let indexNumberBottom;
  let grayBox;
  let grayBoxMarginTop;
  let grayBoxHeight;
  let grayBoxImageVisualWidth;
  let contents;
  let rightBoxPaddingTop;

  blockHeight = <%% 418, 389, 353, 282, 161 %%>;
  bottomMargin = <%% 16, 16, 16, 12, 5 %%>;
  margin = <%% 56, 52, 44, 32, 52 %%>;
  leftRatio = <%% 0.32, 0.32, 0.32, 0.32, 0.32 %%>;

  titleFont = <%% 31, 29, 27, 23, 5.7 %%>;
  titleLeft = <%% 6, 6, 6, 6, 0 %%>;
  titleFontWeight = <%% 500, 500, 500, 500, 500 %%>;
  wordSpacing = <%% -3, -3, -3, -3, -2 %%>;

  indexFont = <%% 19, 19, 19, 19, 19 %%>;
  indexFontWeight = <%% 200, 200, 200, 200, 200 %%>;

  quoteTop = <%% 9, 9, 9, 9, -0.6 %%>;
  quoteHeight = <%% 11, 11, 10, 9, 2.5 %%>;
  quoteLeft = <%% 2, 2, 2, 2, 1.6 %%>;

  rightBoxPaddingTop = <%% 25, 25, 25, 25, 5 %%>;

  initWordingSize = <%% 15.5, 15, 14.5, 13.5, 3.5 %%>;

  indexNumberBottom = <%% 3, 4, 12, 4, 0 %%>;

  grayBoxMarginTop = <%% 33, 33, 33, 33, 36 %%>;
  grayBoxHeight = <%% 198, 198, 198, 198, 198 %%>;
  grayBoxImageVisualWidth = <%% 16, 4, 0, 0, 19 %%>;

  contents = {
    title: [
      "공간 실측 가이드와",
      "제공 품목 안내"
    ],
    description: [
      "디자이너와의 온라인 상담이 진행되기 전에, 공간 실측 가이드와 제공 품목 안내서를 제공해드립니다.",
    "<b%스타일링을 받고자 하는 공간의 실측을 가이드에 따라 진행해주시면,%b> 디자이너는 그 정보를 바탕으로 디자인을 진행하게 됩니다."
    ]
  };


  whiteBlock = createNode({
    mother: this.baseTong,
    style: {
      position: "relative",
      borderRadius: String(8) + "px",
      width: String(100) + '%',
      height: String(blockHeight) + ea,
      background: colorChip.white,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
    }
  });

  leftBox = createNode({
    mother: whiteBlock,
    style: {
      display: desktop ? "inline-block" : "block",
      position: "relative",
      width: desktop ? "calc(calc(100% - " + String(margin * 2) + ea + ") * " + String(leftRatio) + ")" : String(100) + '%',
      height: desktop ? "calc(100% - " + String(margin * 2) + ea + ")" : String(29) + ea,
      marginTop: desktop ? String(margin) + ea : "",
      marginBottom: desktop ? String(margin) + ea : "",
      marginLeft: desktop ? String(margin) + ea : "",
    },
    children: [
      {
        text: contents.title.join("\n"),
        style: {
          display: "block",
          position: "relative",
          fontSize: String(titleFont) + ea,
          fontWeight: String(titleFontWeight),
          wordSpacing: String(wordSpacing) + "px",
          lineHeight: String(1.4),
          left: String(titleLeft) + ea,
          color: colorChip.black,
          width: desktop ? "" : String(100) + '%',
          textAlign: desktop ? "left" : "center",
        }
      }
    ]
  });

  if (desktop) {
    createNode({
      mother: leftBox,
      text: String(0),
      style: {
        position: "absolute",
        fontSize: String(indexFont) + ea,
        fontWeight: String(indexFontWeight),
        wordSpacing: String(wordSpacing) + ea,
        bottom: String(indexNumberBottom) + ea,
        left: String(titleLeft) + ea,
        color: colorChip.gray4,
      }
    });
  }

  rightBox = createNode({
    mother: whiteBlock,
    style: {
      display: desktop ? "inline-block" : "block",
      position: "relative",
      verticalAlign: "top",
      top: String(0) + ea,
      width: desktop ? "calc(calc(100% - " + String(margin * 2) + ea + ") * " + String(1 - leftRatio) + ")" : String(100) + '%',
      height: "calc(100% - " + String((margin * 2) + rightBoxPaddingTop) + ea + ")",
      marginTop: desktop ? String(margin) + ea : "",
      marginBottom: desktop ? String(margin) + ea : "",
      marginRight: desktop ? String(margin) + ea : "",
      paddingTop: String(rightBoxPaddingTop) + ea,
    }
  });

  quoteWidth = SvgTong.getRatio(SvgTong.stringParsing(svgMaker.doubleQuote(colorChip.green))) * quoteHeight;
  createNode({
    mother: rightBox,
    mode: "svg",
    source: svgMaker.doubleQuote(colorChip.green),
    style: {
      position: "absolute",
      top: String(quoteTop) + ea,
      left: desktop ? String(quoteLeft) + ea : "calc(50% - " + String(quoteWidth / 2) + ea + ")",
      width: String(quoteWidth) + ea,
      height: String(quoteHeight) + ea,
    }
  });

  createNode({
    mother: rightBox,
    text: contents.description.join("\n"),
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
      fontSize: String(initWordingSize) + ea,
      fontWeight: String(400),
      color: colorChip.black,
      lineHeight: String(1.6),
      textAlign: desktop ? "left" : "center",
    },
    bold: {
      fontWeight: String(600),
      color: colorChip.green,
    }
  });

  grayBox = createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      marginTop: desktop ? String(grayBoxMarginTop) + ea : "",
      paddingTop: desktop ? "" : String(grayBoxMarginTop) + ea,
      height: String(grayBoxHeight) + ea,
      width: withOut(grayBoxImageVisualWidth, ea),
      borderRadius: String(5) + "px",
      overflow: "hidden",
    }
  });

  // createNode({
  //   mother: grayBox,
  //   mode: "img",
  //   attribute: {
  //     src: MiniGuideJs.binaryPath + "/init" + String(media.findIndex(boo => boo)) + ".png",
  //   },
  //   style: {
  //     display: "block",
  //     position: "relative",
  //     width: String(100) + '%',
  //   }
  // })

}

MiniGuideJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    this.mother.setGeneralProperties(this);
    const { returnGet, ajaxJson, requestPromise, setDebounce } = GeneralJs;
    const getObj = returnGet();

    await this.mother.ghostClientLaunching({
      mode: "ghost",
      name: "miniGuide",
      client: this.client,
      base: {
        instance: this,
        binaryPath: MiniGuideJs.binaryPath,
        subTitle: "실측 가이드",
        secondBackground: false,
        backgroundType: 0,
      },
      local: async () => {
        try {
          instance.insertInitBox();
        } catch (e) {
          await GeneralJs.ajaxJson({ message: "MiniGuideJs.launching.ghostClientLaunching : " + e.message }, "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

  } catch (err) {
    console.log(err);
    await GeneralJs.ajaxJson({ message: "MiniGuideJs.launching 에러 일어남 => " + err.message }, "/errorLog");
  }
}
