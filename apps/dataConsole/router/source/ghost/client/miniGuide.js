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

MiniGuideJs.binaryPath = FRONTHOST + "/middle/miniGuide";

MiniGuideJs.prototype.insertInitBox = function () {
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

  quoteTop = <%% 9, 9, 9, 7, -0.6 %%>;
  quoteHeight = <%% 11, 11, 10, 9, 2.5 %%>;
  quoteLeft = <%% 2, 2, 2, 2, 1.6 %%>;

  rightBoxPaddingTop = <%% 25, 25, 23, 21, 3.5 %%>;
  rightBoxPaddingBottom = <%% 6, 6, 5, 4, 0 %%>;

  initWordingSize = <%% 15.5, 15, 14.5, 13, 3.5 %%>;

  indexNumberBottom = <%% 3, 4, 12, 4, 0 %%>;

  grayBoxMarginTop = <%% 55, 50, 40, 28, 9.5 %%>;
  grayBoxImageVisualWidth = <%% 6, 4, 0, 0, 19 %%>;

  descriptionMarginLeft = <%% 5, 5, 5, 5, 8 %%>;
  mobileTitleHeight = 28;
  mobileBottomMargin = 10;

  contents = {
    title: [
      <&& "공간 실측 가이드와" | "공간 실측 가이드와" | "공간 실측 가이드와" | "실측 가이드와" | "공간 실측 가이드와" &&>,
      "제공 품목 안내"
    ],
    description: [
      <&& "디자이너와의 온라인 상담이 진행되기 전에, 공간 실측 가이드와 제공 품목 안내서를 제공해드립니다." | "디자이너와의 온라인 상담이 진행되기 전에, 공간 실측 가이드와 제공 품목 안내서를 제공해드립니다." | "온라인 상담이 진행되기 전에, 공간 실측 가이드와 제공 품목 안내서를 제공해드립니다." | "상담이 진행되기 전에, 공간 실측 가이드와 제공 품목 안내서를 제공해드립니다." | "상담이 진행되기 전에, 공간 실측 가이드와 제공 품목 안내서를 제공해드립니다." &&>,
      <&& "<b%해당 공간의 실측을 가이드에 따라 진행해주시면,%b> 디자이너는 그 정보를 바탕으로 디자인을 진행하게 됩니다." | "<b%해당 공간의 실측을 가이드에 따라 진행해주시면,%b> 디자이너는 그 정보를 바탕으로 디자인을 진행하게 됩니다." | "<b%해당 공간의 실측을 가이드에 따라 진행해주시면,%b> 그 정보를 바탕으로 디자인이 진행됩니다." | "<b%공간의 실측을 가이드에 따라 진행해주시면,%b> 그 정보를 바탕으로 디자인이 진행됩니다." | "<b%공간의 실측을 가이드에 따라 진행해주시면,%b> 그 정보를 바탕으로 디자인이 진행됩니다." &&>
    ],
    image: MiniGuideJs.binaryPath + "/init" + String(media.findIndex(boo => boo)) + ".svg",
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

  createNode({
    mother: grayBox,
    mode: "img",
    attribute: {
      src: contents.image,
    },
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
    }
  });

}

MiniGuideJs.prototype.insertProcessBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, svgMaker, serviceParsing } = GeneralJs;
  const { client, ea, media, osException, testMode } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let whiteBlock;
  let bottomMargin;
  let contents;
  let margin;
  let processBox;
  let blankWidth;
  let processFactor;
  let circleRadius;
  let topBottomVisualMargin;
  let circleMargin;
  let descriptionMarginTop;
  let processLineTop, processLineHeight;
  let numberSize, numberWeight;
  let titleSize, titleWeight, titleLineHeight;
  let descriptionSize, descriptionWeight, descriptionLineHeight;
  let titleMarginTopVisual;
  let mobileBlockWidth;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 56, 52, 44, 32, 6 %%>;

  topBottomVisualMargin = <%% 18, 16, 12, 10, 3 %%>;

  blankWidth = <%% 60, 25, 14, 0, 20 %%>;

  circleRadius = <%% 158, 132, 120, 98, 29 %%>;
  circleMargin = <%% 19, 16, 14, 14, 2.8 %%>;
  descriptionMarginTop = <%% 6, 5, 4, 4, 1 %%>;

  processLineTop = <%% 120, 102, 94, 82, 120 %%>;
  processLineHeight = <%% 18, 18, 16, 14, 18 %%>;

  numberSize = <%% 15, 15, 15, 14, 3 %%>;
  numberWeight = <%% 400, 400, 400, 400, 400 %%>;

  titleSize = <%% 19, 18, 16, 14, 4 %%>;
  titleWeight = <%% 800, 800, 800, 800, 800 %%>;
  titleLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;
  titleMarginTopVisual = <%% 2, 2, 2, 1, 0 %%>;

  descriptionSize = <%% 13, 13, 11, 11, 3 %%>;
  descriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
  descriptionLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;

  mobileBlockWidth = 38;

  contents = {
    process: [
      {
        title: "서비스 결제",
        description: [
          "기본적인 정보와 함께",
          <&& "디자인비를 결제합니다." | "디자인비를 결제합니다." | "디자인비를 결제합니다." | "비용을 결제합니다." | "비용을 결제합니다." &&>,
        ],
        image: "process0.jpg",
      },
      {
        title: "온라인 상담",
        description: [
          <&& "결제가 완료되면 디자이너와" | "결제가 완료되면 디자이너와" | "결제가 완료되면 디자이너와" | "결제가 되면 디자이너와" | "결제가 되면 디자이너와" &&>,
          "1:1 상담이 진행됩니다.",
        ],
        image: "process1.jpg",
      },
      {
        title: "정보 전달",
        description: [
          <&& "가이드에 따라 진행된 실측" | "가이드에 따라 진행된 실측" | "가이드에 따라 진행된 실측" | "가이드에 따라 진행된" | "가이드에 따라 진행된" &&>,
          <&& "정보와 요청 사항을 전달합니다." | "정보와 요청을 전달합니다." | "정보와 요청을 전달합니다." | "실측 정보를 전달합니다." | "실측 정보를 전달합니다." &&>,
        ],
        image: "process2.jpg",
      },
      {
        title: "디자인 작업",
        description: [
          <&& "상담과 실측 정보를 바탕으로" | "상담과 실측 정보를 바탕으로" | "상담과 실측 정보를 바탕으로" | "상담과 정보를 바탕으로" | "상담과 정보를 바탕으로" &&>,
          <&& "디자인 작업이 진행됩니다." | "디자인 작업이 진행됩니다." | "디자인 작업이 진행됩니다." | "디자인이 진행됩니다." | "디자인이 진행됩니다." &&>,
        ],
        image: "process3.jpg",
      },
      {
        title: "디자인 시안",
        description: [
          <&& "작업이 완료되면 고객님께" | "작업이 완료되면 고객님께" | "작업이 완료되면 고객님께" | "완료되면 고객님께" | "완료되면 고객님께" &&>,
          <&& "디자인 시안과 설명을 제공합니다." | "시안과 설명을 제공합니다." | "시안과 설명을 제공합니다." | "시안과 설명을 제공합니다." | "시안과 설명을 제공합니다." &&>,
        ],
        image: "process4.jpg",
      },
    ]
  };

  whiteBlock = createNode({
    mother: this.baseTong,
    style: {
      position: "relative",
      borderRadius: String(8) + "px",
      width: String(100) + '%',
      paddingTop: String(margin + topBottomVisualMargin) + ea,
      paddingBottom: String(margin + topBottomVisualMargin) + ea,
      background: colorChip.white,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
    }
  });

  processBox = createNode({
    mother: whiteBlock,
    style: {
      marginLeft: String(margin) + ea,
      marginRight: String(margin) + ea,
      display: "block",
      position: "relative",
      width: withOut(margin * 2, ea),
      textAlign: desktop ? "" : "center",
    }
  });

  if (desktop) {
    createNode({
      mother: processBox,
      style: {
        position: "absolute",
        display: "block",
        width: String(100) + '%',
        height: String(0),
        left: String(0),
        top: String(processLineTop) + ea,
        borderBottom: "1px solid " + colorChip.gray3,
        boxSizing: "border-box",
      }
    });
    createNode({
      mother: processBox,
      style: {
        position: "absolute",
        display: "block",
        width: String(100) + '%',
        height: String(processLineHeight) + ea,
        left: String(0),
        top: String(processLineTop - (processLineHeight / 2) + 1) + ea,
        borderRight: "1px solid " + colorChip.gray3,
        borderLeft: "1px solid " + colorChip.gray3,
        boxSizing: "border-box",
      }
    });
    createNode({
      mother: processBox,
      style: {
        display: "inline-block",
        width: String(blankWidth) + ea,
        verticalAlign: "top",
      }
    });
  }

  for (let i = 0; i < contents.process.length; i++) {

    processFactor = createNode({
      mother: processBox,
      style: {
        display: "inline-block",
        width: desktop ? "calc(calc(100% - " + String(blankWidth * 2) + ea + ") / " + String(contents.process.length) + ")" : String(mobileBlockWidth) + ea,
        verticalAlign: "top",
        marginBottom: desktop ? "" : String(i === contents.process.length - 1 ? margin / 2 : 4) + ea,
      }
    });

    createNode({
      mother: processFactor,
      text: String(i + 1),
      style: {
        fontSize: String(numberSize) + ea,
        fontWeight: String(numberWeight),
        fontFamily: "graphik",
        color: colorChip.black,
        display: "block",
        width: String(100) + '%',
        textAlign: "center",
      }
    });

    createNode({
      mother: processFactor,
      style: {
        display: "block",
        width: String(100) + '%',
        textAlign: "center",
      },
      children: [
        {
          display: "inline-block",
          position: "relative",
          width: String(circleRadius) + ea,
          height: String(circleRadius) + ea,
          background: colorChip.gray1,
          backgroundImage: "url('" + MiniGuideJs.binaryPath + "/" + contents.process[i].image + "')",
          backgroundSize: "auto 100%",
          backgroundPosition: "50% 50%",
          borderRadius: String(circleRadius) + ea,
          marginTop: String(circleMargin) + ea,
        }
      ]
    });

    createNode({
      mother: processFactor,
      text: contents.process[i].title,
      style: {
        fontSize: String(titleSize) + ea,
        fontWeight: String(titleWeight),
        color: colorChip.black,
        display: "block",
        width: String(100) + '%',
        textAlign: "center",
        marginTop: String(circleMargin + (isMac() ? 0 : titleMarginTopVisual)) + ea,
        lineHeight: String(titleLineHeight),
      }
    });

    createNode({
      mother: processFactor,
      text: contents.process[i].description,
      style: {
        fontSize: String(descriptionSize) + ea,
        fontWeight: String(descriptionWeight),
        color: colorChip.black,
        display: "block",
        width: String(100) + '%',
        textAlign: "center",
        marginTop: String(descriptionMarginTop) + ea,
        lineHeight: String(descriptionLineHeight),
      }
    });

  }

  if (desktop) {
    createNode({
      mother: processBox,
      style: {
        display: "inline-block",
        width: String(blankWidth) + ea,
        verticalAlign: "top",
      }
    });
  }

}

MiniGuideJs.prototype.insertGuideBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, svgMaker, serviceParsing } = GeneralJs;
  const { client, ea, media, osException, testMode } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1]);
  const small = !big;
  let whiteBlock;
  let bottomMargin;
  let contents;
  let margin;
  let topBottomVisualMargin;
  let guideBlock;
  let guideBlockPaddingTop;
  let guideImageWidth;
  let guideDescriptionBlock;
  let descriptionBox;
  let descriptionHeight;
  let descriptionWidth;
  let bigTitleSize, bigTitleWeight, bigTitlePaddingLeft, bigTitleLineTop;
  let numberSize, numberWeight;
  let guideTitleSize, guideTitleWeight, guideTitleLineHeight;
  let guideDescriptionSize, guideDescriptionLineHeight, guideDescriptionMarginTop;
  let guideDescriptionWeight, guideDescriptionBoldWeight;
  let guideImage;
  let guideDescriptionBlockMarginTop;
  let guideDescriptionBlockNumberTop, guideDescriptionBlockNumberLeft;
  let guideBlockPaddingBottomVisual;
  let bigTitleVisual;
  let mobileGuideBlockFirstTop;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 56, 52, 44, 32, 6 %%>;

  topBottomVisualMargin = <%% 18, 16, 12, 10, 3.5 %%>;

  guideImageWidth = <%% 876, 710, 812, 756, 876 %%>;
  guideBlockPaddingTop = <%% 80, 65, 52, 38, 12 %%>;
  guideBlockPaddingBottomVisual = <%% 0, 0, 8, 6, 2 %%>;

  descriptionHeight = <%% 340, 280, 280, 280, 340 %%>;
  descriptionWidth = <%% 365, 200, 363, 290, 69 %%>;

  bigTitleLineTop = <%% (isMac() ? 18 : 17), 17, 15, 13, 3.5 %%>;
  bigTitleSize = <%% 26, 25, 23, 20, 5 %%>;
  bigTitleWeight = <%% 800, 800, 800, 800, 800 %%>;
  bigTitlePaddingLeft = <%% 20, 20, 20, 20, 3.2 %%>;
  bigTitleVisual = <%% 3, 3, 2, 2, 0 %%>;

  numberSize = <%% 22, 18, 17, 16, 3.8 %%>;
  numberWeight = <%% 400, 400, 400, 400, 700 %%>;

  guideTitleSize = <%% 18, 17, 16, 16, 4 %%>;
  guideTitleWeight = <%% 800, 800, 800, 800, 800 %%>;
  guideTitleLineHeight = <%% 1.66, 1.66, 1.66, 1.66, 1.66 %%>;

  guideDescriptionSize = <%% 14, 13, 13, 12, 3 %%>;
  guideDescriptionLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;
  guideDescriptionMarginTop = <%% 8, 8, 8, 8, 1.5 %%>;

  guideDescriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
  guideDescriptionBoldWeight = <%% 600, 600, 600, 600, 600 %%>;

  guideDescriptionBlockMarginTop = <%% 0, 0, 24, 18, 5 %%>;
  guideDescriptionBlockNumberTop = <%% 0, 0, 2, 2, (isIphone() ? 0.4 : 0.6) %%>;
  guideDescriptionBlockNumberLeft = <%% 0, 0, 415, 335, 0 %%>;

  mobileGuideBlockFirstTop = 4;

  contents = {
    title: "공간 실측 가이드",
    guide: [
      {
        title: "기본 실측",
        description: [
          "공간의 실측은 <b%내벽간 폭, 바닥과",
          "천장의 높이%b>를 측정하는 것입니다.",
          "5m 이상 줄자를 이용하여 같은",
          "곳이라도 2회 이상 측정하여 공간의",
          "사이즈를 정확히 기록해주세요!",
        ],
        image: desktop ? "guide0.svg" : "moguide0.svg",
      },
      {
        title: "창문에만 설치시 (반창용)",
        description: [
          "넓이에서 <b%20cm 정도 여유 있게 가로",
          "사이즈%b>를 측정해주시고, 높이는 <b%커튼",
          "박스 안 천장으로부터 창틀 하단%b>까지",
          "여유 있게 측정해주시면 됩니다.",
        ],
        image: desktop ? "guide1.svg" : "moguide1.svg",
      },
      {
        title: "벽 전체에 설치시 (통창용)",
        description: [
          "벽 전체에 설치시에는 일반 벽 실측과",
          "같이 벽 전체의 폭을 측정해주시고,",
          "높이는 <b%커튼 박스 안의 천장으로부터",
          "바닥%b>까지 측정해주시면 됩니다.",
        ],
        image: desktop ? "guide2.svg" : "moguide2.svg",
      },
      {
        title: "침대 사이즈",
        description: [
          "베딩과 관련한 스타일링을 위해",
          "침대 사이즈 또한 알아야 합니다.",
          "<b%침대 매트리스 사이즈를 기준으로",
          "측정%b>해주시면 되며, 매트리스 종류와",
          "폭, 길이, 높이를 알려주시면 됩니다.",
        ],
        image: desktop ? "guide3.svg" : "moguide3.svg",
      },
    ]
  };

  whiteBlock = createNode({
    mother: this.baseTong,
    style: {
      position: "relative",
      borderRadius: String(8) + "px",
      width: String(100) + '%',
      paddingTop: String(margin + topBottomVisualMargin) + ea,
      paddingBottom: String(desktop ? margin : 5) + ea,
      background: colorChip.white,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
    }
  });

  createNode({
    mother: whiteBlock,
    style: {
      display: "block",
      position: "relative",
      marginLeft: String(margin) + ea,
      marginRight: String(margin) + ea,
      width: withOut(margin * 2, ea),
      textAlign: "center",
    },
    children: [
      {
        style: {
          position: "absolute",
          borderBottom: "1px solid " + colorChip.gray3,
          width: String(100) + '%',
          height: String(bigTitleLineTop) + ea,
          top: String(0),
          left: String(0),
        }
      },
      {
        text: contents.title,
        style: {
          fontSize: String(bigTitleSize) + ea,
          fontWeight: String(bigTitleWeight),
          color: colorChip.black,
          display: "inline-block",
          position: "relative",
          textAlign: "center",
          paddingLeft: String(bigTitlePaddingLeft) + ea,
          paddingRight: String(bigTitlePaddingLeft) + ea,
          background: colorChip.white,
          top: isMac() ? "" : String(bigTitleVisual) + ea,
        }
      }
    ]
  });

  for (let i = 0; i < contents.guide.length; i++) {

    guideBlock = createNode({
      mother: whiteBlock,
      style: {
        display: "block",
        position: "relative",
        marginLeft: String(margin) + ea,
        marginRight: String(margin) + ea,
        width: withOut(margin * 2, ea),
        paddingBottom: big ? String(guideBlockPaddingTop) + ea : String(guideBlockPaddingTop - guideBlockPaddingBottomVisual) + ea,
        paddingTop: String(guideBlockPaddingTop) + ea,
        borderBottom: i === contents.guide.length - 1 ? "" : "1px dashed " + colorChip.gray3,
      }
    });

    if (mobile) {
      if (i === 0) {
        guideBlock.style.paddingTop = String(guideBlockPaddingTop - mobileGuideBlockFirstTop) + ea;
      }
    }

    guideDescriptionBlock = createNode({
      mother: guideBlock,
      style: {
        display: big ? "inline-block" : "block",
        position: "relative",
        width: big ? withOut(guideImageWidth, ea) : String(100) + '%',
        height: big ? String(descriptionHeight) + ea : "",
        verticalAlign: "top",
        textAlign: big ? "" : "right",
        marginTop: big ? "" : String(guideDescriptionBlockMarginTop) + ea,
      }
    });

    createNode({
      mother: guideDescriptionBlock,
      text: "0" + String(i + 1),
      style: {
        display: "block",
        position: big ? "relative" : "absolute",
        fontSize: String(numberSize) + ea,
        fontWeight: String(numberWeight),
        color: colorChip.black,
        fontFamily: desktop ? "graphik" : "sandoll",
        top: big ? "" : String(guideDescriptionBlockNumberTop) + ea,
        left: big ? "" : String(guideDescriptionBlockNumberLeft) + ea,
      }
    });

    descriptionBox = createNode({
      mother: guideDescriptionBlock,
      style: {
        display: big ? "block" : "inline-block",
        position: big ? "absolute" : "relative",
        bottom: String(0) + ea,
        left: String(0) + ea,
        width: String(descriptionWidth) + ea,
      }
    });

    createNode({
      mother: descriptionBox,
      text: contents.guide[i].title,
      style: {
        display: "block",
        position: "relative",
        textAlign: big ? "right" : "left",
        fontSize: String(guideTitleSize) + ea,
        fontWeight: String(guideTitleWeight),
        color: colorChip.black,
        lineHeight: String(guideTitleLineHeight),
      }
    });

    createNode({
      mother: descriptionBox,
      text: big ? contents.guide[i].description.join("\n") : contents.guide[i].description.join(" "),
      style: {
        display: "block",
        position: "relative",
        textAlign: big ? "right" : "left",
        fontSize: String(guideDescriptionSize) + ea,
        fontWeight: String(guideDescriptionWeight),
        color: colorChip.black,
        lineHeight: String(guideDescriptionLineHeight),
        marginTop: String(guideDescriptionMarginTop) + ea,
      },
      bold: {
        fontSize: String(guideDescriptionSize) + ea,
        color: colorChip.green,
        fontWeight: String(guideDescriptionBoldWeight),
      }
    });

    guideImage = createNode({
      mother: guideBlock,
      mode: "img",
      attribute: {
        src: MiniGuideJs.binaryPath + "/" + contents.guide[i].image,
      },
      style: {
        display: big ? "inline-block" : "block",
        position: "relative",
        width: big ? String(guideImageWidth) + ea : String(100) + '%',
        height: "auto",
        verticalAlign: "top",
      }
    });

    if (small) {
      guideBlock.insertBefore(guideImage, guideDescriptionBlock);
    }

  }

}

MiniGuideJs.prototype.insertTargetsBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, svgMaker, serviceParsing } = GeneralJs;
  const { client, ea, media, osException, testMode } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let whiteBlock;
  let bottomMargin;
  let contents;
  let margin;
  let topBottomVisualMargin;
  let bigTitleSize, bigTitleWeight, bigTitlePaddingLeft, bigTitleLineTop;
  let targetsMother;
  let targetsBetween;
  let targetsMotherPaddingTop;
  let targetBox;
  let targetTitleBox;
  let targetTitlePaddingTop;
  let targetTitleHeight;
  let targetNumberVisual;
  let targetTitlePaddingLeft;
  let targetTitleSize, targetTitleWeight, targetNumberWeight;
  let targetItemBox;
  let targetItemPaddingTop, targetItemPaddingBottom;
  let targetItemSize, targetItemWeight, targetItemMarginBottom;
  let descriptionArea;
  let descriptionBox;
  let descriptionBoxTong;
  let descriptionSize, descriptionWeight, descriptionBoldWeight, descriptionLineHeight;
  let descriptionLineBottom;
  let descriptionAreaMarginBottom;
  let bigTitleVisual;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 56, 52, 44, 32, 6 %%>;

  topBottomVisualMargin = <%% 18, 16, 12, 10, 3.5 %%>;

  bigTitleLineTop = <%% (isMac() ? 18 : 17), 17, 15, 13, 3.5 %%>;
  bigTitleSize = <%% 26, 25, 23, 20, 5 %%>;
  bigTitleWeight = <%% 800, 800, 800, 800, 800 %%>;
  bigTitlePaddingLeft = <%% 20, 20, 20, 20, 3.2 %%>;
  bigTitleVisual = <%% 3, 3, 2, 2, 0 %%>;

  targetsBetween = <%% 20, 18, 16, 12, 2 %%>;

  targetsMotherPaddingTop = <%% 40, 30, 25, 24, 6.5 %%>;

  targetTitlePaddingTop = <%% (isMac() ? 12 : 14), (isMac() ? 6 : 8), (isMac() ? 5 : 7), (isMac() ? 4 : 6), 2 %%>;
  targetNumberVisual = <%% 1, 1, 1, 1, 1 %%>;
  targetTitleHeight = <%% (isMac() ? 43 : 41), (isMac() ? 35 : 33), (isMac() ? 30 : 28), (isMac() ? 25 : 23), 9 %%>;
  targetTitlePaddingLeft = <%% 32, 28, 26, 21, 4.5 %%>;

  targetTitleSize = <%% 18, 17, 15, 13, 4 %%>;
  targetTitleWeight = <%% 800, 800, 800, 800, 800 %%>;
  targetNumberWeight = <%% 300, 300, 300, 300, 300 %%>;

  targetItemPaddingTop = <%% (isMac() ? 22 : 21), (isMac() ? 18 : 17), (isMac() ? 16 : 15), (isMac() ? 13 : 12), 3.5 %%>;
  targetItemPaddingBottom = <%% (isMac() ? 20 : 20), (isMac() ? 16 : 16), (isMac() ? 14 : 14), (isMac() ? 11 : 11), 3.5 %%>;

  targetItemSize = <%% 15, 14, 13, 12, 3 %%>;
  targetItemWeight = <%% 400, 400, 400, 400, 400 %%>;
  targetItemMarginBottom = <%% 5, 5, 5, 5, 1 %%>;

  descriptionSize = <%% 14, 13, 13, 12, 3 %%>;
  descriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
  descriptionBoldWeight = <%% 700, 700, 700, 700, 700 %%>;
  descriptionLineHeight = <%% 1.7, 1.7, 1.7, 1.7, 1.7 %%>;

  descriptionLineBottom = <%% (isMac() ? 10 : 12), (isMac() ? 16 : 18), (isMac() ? 19 : 21), (isMac() ? 20 : 22), 10 %%>;

  descriptionAreaMarginBottom = <%% 25, 20, 14, 12, 4 %%>;

  contents = {
    title: "제공 품목 안내",
    targets: [
      {
        title: "가구",
        factor: [
          "가구 추천 제공하지 않음",
        ],
        image: "targets0.jpg",
      },
      {
        title: "패브릭",
        factor: [
          "매트리스 커버",
          "매트리스 패드",
          <&& "이불 ( 커버 + 솜 / 일체형 )" | "이불 ( 커버 + 솜 / 일체형 )" | "이불 ( 커버 + 솜 / 일체형 )" | "이불 ( 커버 + 솜 )" | "이불 ( 커버 + 솜 )" &&>,
          "베개 ( 커버 + 솜 )",
          "쿠션 ( 커버 + 솜 )",
          "스프레드",
          "블라인드",
          "커튼 + 커튼 봉 / 레일",
          <&& "대형 러그, 소형 러그, 미니 러그" | "대형 러그, 소형 러그, 미니 러그" | "대형 러그, 소형 러그" | "대형 러그, 소형 러그" | "대형 러그, 소형 러그" &&>,
        ],
        image: "targets1.jpg",
      },
      {
        title: "액자",
        factor: [
          "액자 프레임",
          "그림 / 아트웍",
          "레일 / 설치 자리",
        ],
        image: "targets2.jpg",
      },
      {
        title: "소품",
        factor: [
          "디피용 소품",
          <&& "디자인 조명 / 스탠드 조명" | "디자인 조명 / 스탠드 조명" | "디자인 조명 / 스탠드 조명" | "디자인, 스탠드 조명" | "디자인, 스탠드 조명" &&>,
          <&& "시공 / 설치가 필요한 조명 제외" | "시공 / 설치가 필요한 조명 제외" | "시공, 설치 필요한 조명 제외" | "설치가 필요한 조명 제외" | "설치가 필요한 조명 제외" &&>,
        ],
        image: "targets3.jpg",
      },
    ],
    description: [
      [
        <&& "홈리에종 미니의 기본적인 제공 항목은" | "홈리에종 미니의 기본적인 제공 항목은" | "미니의 기본적인 제공 항목은" | "미니의 기본적인 제공 항목은" | "미니의 기본적인 제공 항목은" &&>,
        <&& "<b%패브릭과 액자, 소품%b> 이 3가지의 카테고리" | "<b%패브릭과 액자, 소품%b> 이 3가지의 카테고리" | "<b%패브릭, 액자, 소품%b> 3가지 카테고리" | "<b%패브릭, 액자, 소품%b> 카테고리" | "<b%패브릭, 액자, 소품%b> 카테고리" &&>,
        <&& "입니다. 가구 추천은 미니의 서비스 범위에" | "입니다. 가구 추천은 미니의 서비스 범위에" | "입니다. 가구 추천은 서비스 범위에" | "입니다. 가구는 서비스에 해당" | "입니다. 가구는 서비스에 해당" &&>,
        <&& "해당되지 않아 제공되지 않습니다." | "해당되지 않아 제공되지 않습니다." | "해당되지 않아 제공되지 않습니다." | "않아 제공되지 않습니다." | "되지 않아 제공되지 않습니다." &&>,
      ],
      [
        <&& "패브릭, 액자, 소품에 해당되는 제품군은 위와" | "패브릭, 액자, 소품에 해당되는 제품군은 위와" | "서비스에 해당되는 제품군은 위와" | "서비스에 해당되는 군은 위와" | "서비스에 해당되는 군은 위와" &&>,
        <&& "같으며, <b%설치와 별도의 실측이 필요한 제품의" | "같으며, <b%설치와 별도의 실측이 필요한 제품의" | "같으며, <b%별도 설치가 필요한 제품의" | "같으며, <b%설치가 필요한 제품의" | "같으며, <b%설치가 필요하거나" &&>,
        <&& "경우, 또는 시공이 필요한 제품의 경우 서비스" | "경우, 또는 시공이 필요한 제품의 경우 서비스" | "경우, 시공이 필요한 경우 범위에" | "경우, 시공이 필요한 경우 범위가" | "시공이 필요한 경우 범위가" &&>,
        <&& "범위에 해당되지 않아%b> 제공되지 않습니다." | "범위에 해당되지 않아%b> 제공되지 않습니다." | "해당되지 않아%b> 제공되지 않습니다." | "아니어서%b> 제공되지 않습니다." | "아니어서%b> 제공되지 않습니다." &&>,
      ]
    ]
  };

  if (mobile) {
    contents.targets.push(JSON.parse(JSON.stringify(contents.targets[1])));
    contents.targets.push(JSON.parse(JSON.stringify(contents.targets[0])));
    if (contents.targets.length > 4) {
      contents.targets.shift();
      contents.targets.shift();
    }
  }

  whiteBlock = createNode({
    mother: this.baseTong,
    style: {
      position: "relative",
      borderRadius: String(8) + "px",
      width: String(100) + '%',
      paddingTop: String(margin + topBottomVisualMargin) + ea,
      paddingBottom: String(margin) + ea,
      background: colorChip.white,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
    }
  });

  createNode({
    mother: whiteBlock,
    style: {
      display: "block",
      position: "relative",
      marginLeft: String(margin) + ea,
      marginRight: String(margin) + ea,
      width: withOut(margin * 2, ea),
      textAlign: "center",
    },
    children: [
      {
        style: {
          position: "absolute",
          borderBottom: "1px solid " + colorChip.gray3,
          width: String(100) + '%',
          height: String(bigTitleLineTop) + ea,
          top: String(0),
          left: String(0),
        }
      },
      {
        text: contents.title,
        style: {
          fontSize: String(bigTitleSize) + ea,
          fontWeight: String(bigTitleWeight),
          color: colorChip.black,
          display: "inline-block",
          position: "relative",
          textAlign: "center",
          paddingLeft: String(bigTitlePaddingLeft) + ea,
          paddingRight: String(bigTitlePaddingLeft) + ea,
          background: colorChip.white,
          top: isMac() ? "" : String(bigTitleVisual) + ea,
        }
      }
    ]
  });

  targetsMother = createNode({
    mother: whiteBlock,
    style: {
      display: "block",
      position: "relative",
      marginLeft: String(margin) + ea,
      marginRight: String(margin) + ea,
      width: withOut(margin * 2, ea),
      paddingTop: String(targetsMotherPaddingTop) + ea,
    }
  });

  descriptionArea = createNode({
    mother: whiteBlock,
    style: {
      display: "block",
      position: "relative",
      marginLeft: String(margin) + ea,
      marginRight: String(margin) + ea,
      width: withOut(margin * 2, ea),
      paddingTop: String(desktop ? targetsMotherPaddingTop : 3.5) + ea,
      marginBottom: String(descriptionAreaMarginBottom) + ea,
    }
  })

  for (let i = 0; i < contents.targets.length; i++) {
    targetBox = createNode({
      mother: targetsMother,
      style: {
        display: "inline-block",
        position: "relative",
        marginRight: ((desktop ? i === contents.targets.length - 1 : i % 2 === 1) ? String(0) + ea : String(targetsBetween) + ea),
        marginBottom: desktop ? "" : String(targetsBetween) + ea,
        width: "calc(calc(100% - " + String(targetsBetween * (desktop ? contents.targets.length - 1 : 1)) + ea + ") / " + String(desktop ? contents.targets.length : 2) + ")",
        verticalAlign: "top",
      }
    });

    targetTitleBox = createNode({
      mother: targetBox,
      style: {
        display: "block",
        position: "relative",
        borderRadius: String(5) + "px",
        width: String(100) + '%',
        paddingTop: String(targetTitlePaddingTop) + ea,
        height: String(targetTitleHeight) + ea,
        background: colorChip.gray1,
        backgroundImage: "url('" + MiniGuideJs.binaryPath + "/" + contents.targets[i].image + "')",
        backgroundPosition: "50% 50%",
        backgroundSize: desktop ? "100% auto" : "auto 100%",
        textAlign: "right",
      }
    });

    if (desktop) {
      createNode({
        mother: targetTitleBox,
        text: String(i),
        style: {
          top: String(targetTitlePaddingTop + targetNumberVisual) + ea,
          left: String(targetTitlePaddingLeft) + ea,
          position: "absolute",
          fontSize: String(targetTitleSize) + ea,
          fontWeight: String(targetNumberWeight),
          color: colorChip.white,
        }
      });
    }

    createNode({
      mother: targetTitleBox,
      text: contents.targets[i].title,
      style: {
        display: desktop ? "inline-block" : "block",
        position: "relative",
        fontSize: String(targetTitleSize) + ea,
        fontWeight: String(targetTitleWeight),
        color: colorChip.white,
        marginRight: desktop ? String(targetTitlePaddingLeft) + ea : "",
        verticalAlign: "top",
        textAlign: desktop ? "" : "center",
      }
    });

    targetItemBox = createNode({
      mother: targetBox,
      style: {
        display: "block",
        position: "relative",
        borderRadius: String(5) + "px",
        width: String(100) + '%',
        background: colorChip.gray1,
        paddingTop: String(targetItemPaddingTop) + ea,
        paddingBottom: String(targetItemPaddingBottom) + ea,
      }
    });

    for (let j = 0; j < contents.targets[i].factor.length; j++) {
      createNode({
        mother: targetItemBox,
        text: contents.targets[i].factor[j],
        style: {
          display: "block",
          position: "relative",
          fontSize: String(targetItemSize) + ea,
          fontWeight: String(targetItemWeight),
          color: colorChip.black,
          paddingLeft: String(targetTitlePaddingLeft) + ea,
          width: withOut(targetTitlePaddingLeft, ea),
          marginBottom: String(targetItemMarginBottom) + ea,
        }
      });
    }

    descriptionBox = createNode({
      mother: descriptionArea,
      style: {
        display: "inline-block",
        position: "relative",
        marginRight: ((desktop ? i === contents.targets.length - 1 : i % 2 === 1) ? String(0) + ea : String(targetsBetween) + ea),
        marginBottom: desktop ? "" : String(targetsBetween) + ea,
        width: "calc(calc(100% - " + String(targetsBetween * (desktop ? contents.targets.length - 1 : 1)) + ea + ") / " + String(desktop ? contents.targets.length : 2) + ")",
        verticalAlign: "top",
      }
    });

    descriptionBoxTong = createNode({
      mother: descriptionBox,
      style: {
        display: "block",
        position: "relative",
        width: String(100) + '%',
        height: desktop ? String(100) + ea : "",
      }
    });

    if (Array.isArray(contents.description[i - 2])) {
      createNode({
        mother: descriptionBoxTong,
        text: contents.description[i - 2].join("\n"),
        style: {
          display: "block",
          position: "relative",
          width: String(100) + '%',
          fontSize: String(descriptionSize) + ea,
          fontWeight: String(descriptionWeight),
          color: colorChip.black,
          lineHeight: String(descriptionLineHeight),
          textAlign: desktop ? "right" : "left",
        },
        bold: {
          fontSize: String(descriptionSize) + ea,
          fontWeight: String(descriptionBoldWeight),
          color: colorChip.black,
          lineHeight: String(descriptionLineHeight),
        }
      });
    } else {
      createNode({
        mother: descriptionBoxTong,
        style: {
          display: desktop ? "block" : "none",
          position: "absolute",
          bottom: String(descriptionLineBottom) + ea,
          width: (i === 0 ? "calc(100% + " + String(targetsBetween) + ea + ")" : "calc(100%)"),
          left: String(0),
          borderBottom: "1px solid " + colorChip.gray3,
        }
      });
    }

  }

}

MiniGuideJs.prototype.insertNextBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, svgMaker, serviceParsing } = GeneralJs;
  const { client, ea, media, osException, testMode } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let whiteBlock;
  let bottomMargin;
  let contents;
  let margin;
  let finalHeight;
  let finalSize, finalWeight, finalRight, finalTop, finalLineHeight;

  bottomMargin = <%% 200, 200, 200, 200, 12 %%>;
  margin = <%% 56, 52, 44, 32, 6 %%>;

  finalHeight = <%% 224, 200, 194, 180, 32 %%>;
  finalSize = <%% 27, 26, 24, 21, 4.5 %%>;
  finalWeight = <%% 700, 700, 700, 700, 700 %%>;
  finalRight = <%% 125, 100, 92, 80, 0 %%>;
  finalTop = <%% (isMac() ? 70 : 73), (isMac() ? 63 : 66), (isMac() ? 63 : 65), (isMac() ? 58 : 60), 9.5 %%>;
  finalLineHeight = <%% 1.4, 1.4, 1.4, 1.4, 1.4 %%>;

  contents = {
    final: [
      "디자이너 상담 후 디자인 시안이",
      "제공될 예정입니다."
    ],
    image: MiniGuideJs.binaryPath + "/final.jpg",
  };

  whiteBlock = createNode({
    mother: this.baseTong,
    style: {
      position: "relative",
      borderRadius: String(8) + "px",
      width: String(100) + '%',
      height: String(finalHeight) + ea,
      background: colorChip.shadow,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
      backgroundImage: "url('" + contents.image + "')",
      backgroundSize: "100% auto",
      backgroundPosition: "50% 50%",
    }
  });

  createNode({
    mother: whiteBlock,
    text: contents.final.join("\n"),
    style: {
      position: "absolute",
      fontSize: String(finalSize) + ea,
      fontWeight: String(finalWeight),
      color: colorChip.white,
      right: String(finalRight) + ea,
      top: String(finalTop) + ea,
      lineHeight: String(finalLineHeight),
      textAlign: desktop ? "left" : "center",
      width: desktop ? "" : String(100) + '%',
    }
  });

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
          instance.insertProcessBox();
          instance.insertGuideBox();
          instance.insertTargetsBox();
          instance.insertNextBox();
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
