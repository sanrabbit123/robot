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
      "return ('홈리에종 디자인 제안 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('홈리에종 디자인 제안 페이지 입니다! | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "miniRequest",
  "route": [
    "curation",
    "SC"
  ]
} %/%/g

const MiniRequestJs = function () {
  this.mother = new GeneralJs();
  this.client = null;
  this.firstClick = false;
}

MiniRequestJs.binaryPath = "/middle/miniRequest";

MiniRequestJs.prototype.insertInitBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, svgMaker, serviceParsing } = GeneralJs;
  const { client, ea, media, osException, testMode } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let whiteBlock;
  let bottomMargin;
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
  let rightBoxPaddingBottom;
  let titleTop;
  let titlePaddingTop;
  let descriptionMarginLeft;
  let mobileTitleHeight;
  let mobileBottomMargin;
  let whiteInnerMargin;
  let whiteInnerInnerPadding;
  let whiteBox;
  let block;
  let blockTitleAreaWidth;
  let whiteBlockMinHeight;
  let whiteInnerInnerPaddingBottom;
  let blockFactorSize, blockFactorTitleWeight, blockFactorWeight, blockFactorLineHeight;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 56, 52, 44, 32, 6 %%>;
  leftRatio = <%% 0.32, 0.32, 0.32, 0.32, 0.32 %%>;

  titleFont = <%% 31, 29, 27, 23, 5.8 %%>;
  titleLeft = <%% 6, 6, 6, 6, 0 %%>;
  titleFontWeight = <%% 600, 600, 600, 600, 700 %%>;
  wordSpacing = <%% -3, -3, -3, -3, -2 %%>;
  titleTop = <%% 2, 3, 2, 2, 0 %%>;
  titlePaddingTop = <%% 5, 5, 5, 5, 5 %%>;

  indexFont = <%% 19, 19, 19, 19, 19 %%>;
  indexFontWeight = <%% 200, 200, 200, 200, 200 %%>;

  quoteTop = <%% (isMac() ? 9 : 7), (isMac() ? 9 : 7), (isMac() ? 9 : 7), (isMac() ? 7 : 5), -0.6 %%>;
  quoteHeight = <%% 11, 11, 10, 9, 2.5 %%>;
  quoteLeft = <%% 2, 2, 2, 2, 1.6 %%>;

  rightBoxPaddingTop = <%% 25, 25, 23, 21, 3.5 %%>;
  rightBoxPaddingBottom = <%% 6, 6, 5, 4, 0 %%>;

  initWordingSize = <%% 15.5, 15, 14.5, 13, 3.5 %%>;

  indexNumberBottom = <%% 3, 4, 12, 4, 0 %%>;

  grayBoxMarginTop = <%% (isMac() ? 50 : 48), (isMac() ? 45 : 43), (isMac() ? 35 : 33), (isMac() ? 25 : 23), 9.5 %%>;
  grayBoxImageVisualWidth = <%% 6, 4, 0, 0, 19 %%>;

  descriptionMarginLeft = <%% 5, 5, 5, 5, 8 %%>;
  mobileTitleHeight = 28;
  mobileBottomMargin = 10;

  whiteInnerMargin = <%% 30, 30, 30, 30, 30 %%>;
  whiteInnerInnerPadding = <%% 30, 30, 30, 30, 30 %%>;
  whiteInnerInnerPaddingBottom = <%% 40, 40, 40, 40, 40 %%>;

  blockTitleAreaWidth = <%% 140, 100, 100, 100, 100 %%>;

  whiteBlockMinHeight = <%% 36, 36, 36, 36, 36 %%>;

  blockFactorSize = <%% 16, 16, 16, 16, 16 %%>;
  blockFactorTitleWeight = <%% 700, 700, 700, 700, 700 %%>;
  blockFactorWeight = <%% 400, 400, 400, 400, 400 %%>;
  blockFactorLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;

  contents = {
    title: [
      "김청수 고객님",
      "미니 스타일링 관리"
    ],
    description: [
      "김청수 고객님 관련 <b%홈리에종 미니 서비스 의뢰와 안내%b> 드립니다. 고객님께서 작성해주신",
      "정보를 바탕으로 상담을 진행해주시면 되며, 상담 메모는 하단 영역에 작성해주시면 됩니다.",
    ],
    userInfo: [
      {
        name: "성함",
        value: "김청수"
      },
      {
        name: "연락처",
        value: "010-0000-0000"
      },
      {
        name: "이메일",
        value: "example@gmail.com"
      },
      {
        name: "주소",
        value: "서울특별시 동대문구 장한로 99 (장안동, 양우내안애애플) 1동 319호",
      },
      {
        name: "방 개수",
        value: String(2) + "개",
      },
      {
        name: "요청 사항",
        value: "정보를 바탕으로 상담을 진행해주시면 되며, 상담 메모는 하단 영역에 작성해주시면 됩니다. 정보를 바탕으로 상담을 진행해주시면 되며, 상담 메모는 하단 영역에 작성해주시면 됩니다. 정보를 바탕으로 상담을 진행해주시면 되며, 상담 메모는 하단 영역에 작성해주시면 됩니다. 정보를 바탕으로 상담을 진행해주시면 되며, 상담 메모는 하단 영역에 작성해주시면 됩니다. 정보를 바탕으로 상담을 진행해주시면 되며, 상담 메모는 하단 영역에 작성해주시면 됩니다."
        // value: "정보를 바탕으로 상담을 진행해주시면 되며, 상담 메모는 하단 영역에 작성해주시면 됩니다."
      }
    ]
  };

  whiteBlock = createNode({
    mother: this.baseTong,
    style: {
      position: "relative",
      borderRadius: String(8) + "px",
      width: String(100) + '%',
      paddingTop: String(margin) + ea,
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
      height: desktop ? "calc(100% - " + String(margin * 2) + ea + ")" : String(mobileTitleHeight) + ea,
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
          top: isMac() ? "" : String(titleTop) + ea,
          paddingTop: desktop ? "" : String(titlePaddingTop) + ea,
        }
      }
    ]
  });

  rightBox = createNode({
    mother: whiteBlock,
    style: {
      display: desktop ? "inline-block" : "block",
      position: "relative",
      verticalAlign: "top",
      top: String(0) + ea,
      width: desktop ? "calc(calc(100% - " + String(margin * 2) + ea + ") * " + String(1 - leftRatio) + ")" : withOut(margin * 2, ea),
      marginBottom: desktop ? String(margin) + ea : "",
      marginRight: desktop ? String(margin) + ea : "",
      marginLeft: desktop ? "" : String(margin) + ea,
      paddingTop: String(rightBoxPaddingTop) + ea,
      paddingBottom: String(rightBoxPaddingBottom) + ea,
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
      width: desktop ? String(100) + '%' : withOut(descriptionMarginLeft * 2, ea),
      marginLeft: desktop ? "" : String(descriptionMarginLeft) + ea,
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
      width: desktop ? withOut(grayBoxImageVisualWidth, ea) : String(100) + '%',
      paddingBottom: desktop ? "" : String(mobileBottomMargin) + ea,
    }
  });

  whiteBox = createNode({
    mother: grayBox,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
      background: colorChip.gray1,
      borderRadius: String(5) + "px",
      paddingTop: String(whiteInnerMargin) + ea,
      paddingBottom: String(whiteInnerMargin) + ea,
    },
    children: [
      {
        style: {
          display: "block",
          position: "relative",
          background: colorChip.white,
          width: withOut((whiteInnerMargin * 2) + (whiteInnerInnerPadding * 2), ea),
          marginLeft: String(whiteInnerMargin) + ea,
          paddingLeft: String(whiteInnerInnerPadding) + ea,
          paddingRight: String(whiteInnerInnerPadding) + ea,
          paddingTop: String(whiteInnerInnerPadding) + ea,
          paddingBottom: String(whiteInnerInnerPaddingBottom) + ea,
          boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
          borderRadius: String(5) + "px",
        }
      }
    ]
  }).firstChild;

  for (let { name, value } of contents.userInfo) {
    block = createNode({
      mother: whiteBox,
      style: {
        display: "block",
        position: "relative",
        minHeight: String(whiteBlockMinHeight) + ea,
      }
    });

    createNode({
      mother: block,
      style: {
        display: "inline-block",
        position: "relative",
        width: String(blockTitleAreaWidth) + ea,
        height: String(100) + '%',
        verticalAlign: "top",
      },
      children: [
        {
          text: name,
          style: {
            fontSize: String(blockFactorSize) + ea,
            fontWeight: String(blockFactorTitleWeight),
            color: colorChip.black,
            lineHeight: String(blockFactorLineHeight),
            verticalAlign: "top",
          }
        }
      ]
    });

    createNode({
      mother: block,
      style: {
        display: "inline-block",
        position: "relative",
        width: withOut(blockTitleAreaWidth, ea),
        height: String(100) + '%',
        verticalAlign: "top",
      },
      children: [
        {
          text: value,
          style: {
            fontSize: String(blockFactorSize) + ea,
            fontWeight: String(blockFactorWeight),
            color: colorChip.black,
            lineHeight: String(blockFactorLineHeight),
            verticalAlign: "top",
          }
        }
      ]
    });
  }

}

MiniRequestJs.prototype.insertMemoBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, svgMaker, serviceParsing } = GeneralJs;
  const { client, ea, media, osException, testMode } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let whiteBlock;
  let bottomMargin;
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
  let rightBoxPaddingBottom;
  let titleTop;
  let titlePaddingTop;
  let descriptionMarginLeft;
  let mobileTitleHeight;
  let mobileBottomMargin;
  let whiteInnerMargin;
  let whiteInnerInnerPadding;
  let whiteBox;
  let block;
  let blockTitleAreaWidth;
  let whiteBlockMinHeight;
  let whiteInnerInnerPaddingBottom;
  let blockFactorSize, blockFactorTitleWeight, blockFactorWeight, blockFactorLineHeight;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 56, 52, 44, 32, 6 %%>;
  leftRatio = <%% 0.32, 0.32, 0.32, 0.32, 0.32 %%>;

  titleFont = <%% 31, 29, 27, 23, 5.8 %%>;
  titleLeft = <%% 6, 6, 6, 6, 0 %%>;
  titleFontWeight = <%% 600, 600, 600, 600, 700 %%>;
  wordSpacing = <%% -3, -3, -3, -3, -2 %%>;
  titleTop = <%% 2, 3, 2, 2, 0 %%>;
  titlePaddingTop = <%% 5, 5, 5, 5, 5 %%>;

  indexFont = <%% 19, 19, 19, 19, 19 %%>;
  indexFontWeight = <%% 200, 200, 200, 200, 200 %%>;

  quoteTop = <%% (isMac() ? 9 : 7), (isMac() ? 9 : 7), (isMac() ? 9 : 7), (isMac() ? 7 : 5), -0.6 %%>;
  quoteHeight = <%% 11, 11, 10, 9, 2.5 %%>;
  quoteLeft = <%% 2, 2, 2, 2, 1.6 %%>;

  rightBoxPaddingTop = <%% 25, 25, 23, 21, 3.5 %%>;
  rightBoxPaddingBottom = <%% 6, 6, 5, 4, 0 %%>;

  initWordingSize = <%% 15.5, 15, 14.5, 13, 3.5 %%>;

  indexNumberBottom = <%% 3, 4, 12, 4, 0 %%>;

  grayBoxMarginTop = <%% (isMac() ? 50 : 48), (isMac() ? 45 : 43), (isMac() ? 35 : 33), (isMac() ? 25 : 23), 9.5 %%>;
  grayBoxImageVisualWidth = <%% 6, 4, 0, 0, 19 %%>;

  descriptionMarginLeft = <%% 5, 5, 5, 5, 8 %%>;
  mobileTitleHeight = 28;
  mobileBottomMargin = 10;

  whiteInnerMargin = <%% 30, 30, 30, 30, 30 %%>;
  whiteInnerInnerPadding = <%% 30, 30, 30, 30, 30 %%>;
  whiteInnerInnerPaddingBottom = <%% 40, 40, 40, 40, 40 %%>;

  blockTitleAreaWidth = <%% 140, 100, 100, 100, 100 %%>;

  whiteBlockMinHeight = <%% 400, 400, 400, 400, 400 %%>;

  blockFactorSize = <%% 16, 16, 16, 16, 16 %%>;
  blockFactorTitleWeight = <%% 700, 700, 700, 700, 700 %%>;
  blockFactorWeight = <%% 400, 400, 400, 400, 400 %%>;
  blockFactorLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;

  contents = {
    title: [
      "김청수 고객님",
      "미니 스타일링 관리"
    ],
    description: [
      "김청수 고객님 관련 <b%홈리에종 미니 서비스 의뢰와 안내%b> 드립니다. 고객님께서 작성해주신",
      "정보를 바탕으로 상담을 진행해주시면 되며, 상담 메모는 하단 영역에 작성해주시면 됩니다.",
    ],
    userInfo: [
      {
        name: "성함",
        value: "김청수"
      },
      {
        name: "연락처",
        value: "010-0000-0000"
      },
      {
        name: "이메일",
        value: "example@gmail.com"
      },
      {
        name: "주소",
        value: "서울특별시 동대문구 장한로 99 (장안동, 양우내안애애플) 1동 319호",
      },
      {
        name: "방 개수",
        value: String(2) + "개",
      },
      {
        name: "요청 사항",
        value: "정보를 바탕으로 상담을 진행해주시면 되며, 상담 메모는 하단 영역에 작성해주시면 됩니다. 정보를 바탕으로 상담을 진행해주시면 되며, 상담 메모는 하단 영역에 작성해주시면 됩니다. 정보를 바탕으로 상담을 진행해주시면 되며, 상담 메모는 하단 영역에 작성해주시면 됩니다. 정보를 바탕으로 상담을 진행해주시면 되며, 상담 메모는 하단 영역에 작성해주시면 됩니다. 정보를 바탕으로 상담을 진행해주시면 되며, 상담 메모는 하단 영역에 작성해주시면 됩니다."
        // value: "정보를 바탕으로 상담을 진행해주시면 되며, 상담 메모는 하단 영역에 작성해주시면 됩니다."
      }
    ]
  };

  whiteBlock = createNode({
    mother: this.baseTong,
    style: {
      position: "relative",
      borderRadius: String(8) + "px",
      width: String(100) + '%',
      paddingTop: String(margin) + ea,
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
      height: desktop ? "calc(100% - " + String(margin * 2) + ea + ")" : String(mobileTitleHeight) + ea,
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
          top: isMac() ? "" : String(titleTop) + ea,
          paddingTop: desktop ? "" : String(titlePaddingTop) + ea,
        }
      }
    ]
  });

  rightBox = createNode({
    mother: whiteBlock,
    style: {
      display: desktop ? "inline-block" : "block",
      position: "relative",
      verticalAlign: "top",
      top: String(0) + ea,
      width: desktop ? "calc(calc(100% - " + String(margin * 2) + ea + ") * " + String(1 - leftRatio) + ")" : withOut(margin * 2, ea),
      marginBottom: desktop ? String(margin) + ea : "",
      marginRight: desktop ? String(margin) + ea : "",
      marginLeft: desktop ? "" : String(margin) + ea,
      paddingBottom: String(rightBoxPaddingBottom) + ea,
    }
  });

  grayBox = createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      width: desktop ? withOut(grayBoxImageVisualWidth, ea) : String(100) + '%',
      paddingBottom: desktop ? "" : String(mobileBottomMargin) + ea,
    }
  });

  whiteBox = createNode({
    mother: grayBox,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
      background: colorChip.gray1,
      borderRadius: String(5) + "px",
      paddingTop: String(whiteInnerMargin) + ea,
      paddingBottom: String(whiteInnerMargin) + ea,
    },
    children: [
      {
        style: {
          display: "block",
          position: "relative",
          background: colorChip.white,
          width: withOut((whiteInnerMargin * 2) + (whiteInnerInnerPadding * 2), ea),
          marginLeft: String(whiteInnerMargin) + ea,
          paddingLeft: String(whiteInnerInnerPadding) + ea,
          paddingRight: String(whiteInnerInnerPadding) + ea,
          paddingTop: String(whiteInnerInnerPadding) + ea,
          paddingBottom: String(whiteInnerInnerPadding) + ea,
          boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
          borderRadius: String(5) + "px",
        }
      }
    ]
  }).firstChild;

  block = createNode({
    mother: whiteBox,
    style: {
      display: "block",
      position: "relative",
      minHeight: String(whiteBlockMinHeight) + ea,
    }
  });

  createNode({
    mother: block,
    style: {
      display: "inline-block",
      position: "relative",
      width: String(100) + '%',
      height: String(100) + '%',
      verticalAlign: "top",
    },
    children: [
      {
        text: "이곳을 클릭하여 메모를 남겨주세요!",
        style: {
          fontSize: String(blockFactorSize) + ea,
          fontWeight: String(blockFactorWeight),
          color: colorChip.black,
          lineHeight: String(blockFactorLineHeight),
          verticalAlign: "top",
        }
      }
    ]
  });

}

MiniRequestJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    this.mother.setGeneralProperties(this);
    const { returnGet, ajaxJson, requestPromise, setDebounce } = GeneralJs;
    const getObj = returnGet();

    await this.mother.ghostClientLaunching({
      mode: "ghost",
      name: "miniRequest",
      client: this.client,
      base: {
        instance: this,
        binaryPath: MiniRequestJs.binaryPath,
        subTitle: "디자인 요청",
        secondBackground: false,
        backgroundType: 0,
      },
      local: async () => {
        try {
          instance.insertInitBox();
          instance.insertMemoBox();
        } catch (e) {
          await GeneralJs.ajaxJson({ message: "MiniRequestJs.launching.ghostClientLaunching : " + e.message }, "/errorLog");
        }
      }
    });

    this.mother.backgroundGray.style.background = "darkslategray";
    this.mother.backgroundImageBox.style.backgroundImage = "";
    this.mother.backgroundImageBox.style.background = "darkslategray";
    document.getElementById("footergreenback0817").style.background = "transparent";

    loading.parentNode.removeChild(loading);

  } catch (err) {
    console.log(err);
    await GeneralJs.ajaxJson({ message: "MiniRequestJs.launching 에러 일어남 => " + err.message }, "/errorLog");
  }
}
