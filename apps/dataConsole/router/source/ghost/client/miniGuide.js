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

MiniGuideJs.binaryPath = "/middle/miniGuide";

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
  rightBoxPaddingBottom = <%% 6, 6, 5, 4, 0 %%>;

  initWordingSize = <%% 15.5, 15, 14.5, 13.5, 3.5 %%>;

  indexNumberBottom = <%% 3, 4, 12, 4, 0 %%>;

  grayBoxMarginTop = <%% 55, 55, 55, 55, 36 %%>;
  grayBoxImageVisualWidth = <%% 6, 4, 0, 0, 19 %%>;

  contents = {
    title: [
      "공간 실측 가이드와",
      "제공 품목 안내"
    ],
    description: [
      "디자이너와의 온라인 상담이 진행되기 전에, 공간 실측 가이드와 제공 품목 안내서를 제공해드립니다.",
      "<b%스타일링을 받고자 하는 공간의 실측을 가이드에 따라 진행해주시면,%b> 디자이너는 그 정보를 바탕으로 디자인을 진행하게 됩니다."
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
      height: desktop ? "calc(100% - " + String(margin * 2) + ea + ")" : String(29) + ea,
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

  rightBox = createNode({
    mother: whiteBlock,
    style: {
      display: desktop ? "inline-block" : "block",
      position: "relative",
      verticalAlign: "top",
      top: String(0) + ea,
      width: desktop ? "calc(calc(100% - " + String(margin * 2) + ea + ") * " + String(1 - leftRatio) + ")" : String(100) + '%',
      marginBottom: desktop ? String(margin) + ea : "",
      marginRight: desktop ? String(margin) + ea : "",
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
      width: withOut(grayBoxImageVisualWidth, ea),
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

  bottomMargin = <%% 16, 16, 16, 12, 5 %%>;
  margin = <%% 56, 52, 44, 32, 52 %%>;

  topBottomVisualMargin = <%% 18, 18, 18, 18, 18 %%>;

  blankWidth = <%% 60, 100, 100, 100, 100 %%>;

  circleRadius = <%% 158, 120, 120, 120, 120 %%>;
  circleMargin = <%% 19, 19, 19, 19, 19 %%>;
  descriptionMarginTop = <%% 6, 6, 6, 6, 6 %%>;

  processLineTop = <%% 120, 120, 120, 120, 120 %%>;
  processLineHeight = <%% 18, 18, 18, 18, 18 %%>;

  numberSize = <%% 15, 15, 15, 15, 15 %%>;
  numberWeight = <%% 400, 400, 400, 400, 400 %%>;

  titleSize = <%% 19, 19, 19, 19, 19 %%>;
  titleWeight = <%% 800, 800, 800, 800, 800 %%>;
  titleLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;

  descriptionSize = <%% 13, 13, 13, 13, 13 %%>;
  descriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
  descriptionLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;

  contents = {
    process: [
      {
        title: "서비스 결제",
        description: [
          "기본적인 정보와 함께",
          "디자인비를 결제합니다.",
        ],
        image: "process0.jpg",
      },
      {
        title: "온라인 상담",
        description: [
          "결제가 완료되면 디자이너와",
          "1:1 상담이 진행됩니다.",
        ],
        image: "process1.jpg",
      },
      {
        title: "정보 전달",
        description: [
          "가이드에 따라 진행된 실측",
          "정보와 요청 사항을 전달합니다.",
        ],
        image: "process2.jpg",
      },
      {
        title: "디자인 작업",
        description: [
          "상담과 실측 정보를 바탕으로",
          "디자인 작업이 진행됩니다.",
        ],
        image: "process3.jpg",
      },
      {
        title: "디자인 시안",
        description: [
          "작업이 완료되면 고객님께",
          "디자인 시안과 설명을 제공합니다.",
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
    }
  })

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

  for (let i = 0; i < contents.process.length; i++) {

    processFactor = createNode({
      mother: processBox,
      style: {
        display: "inline-block",
        width: "calc(calc(100% - " + String(blankWidth * 2) + ea + ") / " + String(contents.process.length) + ")",
        verticalAlign: "top",
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
        marginTop: String(circleMargin) + ea,
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

  createNode({
    mother: processBox,
    style: {
      display: "inline-block",
      width: String(blankWidth) + ea,
      verticalAlign: "top",
    }
  });

}

MiniGuideJs.prototype.insertGuideBox = function () {
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
  let guideBlock;
  let guideBlockPaddingTop;
  let guideImageWidth;
  let guideDescriptionBlock;
  let descriptionBox;
  let descriptionHeight;
  let descriptionWidth;

  bottomMargin = <%% 16, 16, 16, 12, 5 %%>;
  margin = <%% 56, 52, 44, 32, 52 %%>;

  topBottomVisualMargin = <%% 18, 18, 18, 18, 18 %%>;

  guideImageWidth = <%% 876, 876, 876, 876, 876 %%>;
  guideBlockPaddingTop = <%% 80, 90, 90, 90, 90 %%>;

  descriptionHeight = <%% 340, 340, 340, 340, 340 %%>;
  descriptionWidth = <%% 365, 365, 365, 365, 365 %%>;

  contents = {
    title: "공간 실측 가이드",
    guide: [
      {
        title: "기본 실측",
        description: [
          "공간의 실측은 <b%내벽과 내벽간 폭,",
          "바닥과 천장의 높이%b>를 측정하는 것입니다.",
          "5m 이상의 줄자를 이용하여 같은 곳이라도",
          "최소 2회 이상 측정하여 공간의 사이즈를",
          "정확히 기록해주세요!",
        ],
        image: "guide0.svg",
      },
      {
        title: "창문에만 설치시 (반창용)",
        description: [
          "창 넓이에서 <b%20cm 정도 여유 있게 가로",
          "사이즈%b>를 측정해주시고, 높이는 <b%커튼 박스",
          "안의 천장으로부터 창틀 하단%b>까지 20cm",
          "정도 여유 있게 측정해주시면 됩니다.",
        ],
        image: "guide1.svg",
      },
      {
        title: "벽 전체에 설치시 (통창용)",
        description: [
          "벽 전체에 설치시에는 일반 벽 실측과",
          "같이 벽 전체의 폭을 측정해주시고,",
          "높이는 <b%커튼 박스 안의 천장으로부터",
          "바닥%b>까지 측정해주시면 됩니다.",
        ],
        image: "guide2.svg",
      },
      {
        title: "침대 사이즈",
        description: [
          "베딩과 관련한 패브릭 스타일링을 위해",
          "침대 사이즈 또한 알아야 합니다. 침대",
          "프레임이 아닌 <b%매트리스 사이즈를 기준으로",
          "측정%b>해주시면 되며, 매트리스 사이즈 종류와",
          "폭, 길이, 높이를 알려주시면 됩니다.",
        ],
        image: "guide3.svg",
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
          height: String(18) + ea,
          top: String(0),
          left: String(0),
        }
      },
      {
        text: contents.title,
        style: {
          fontSize: String(26) + ea,
          fontWeight: String(800),
          color: colorChip.black,
          display: "inline-block",
          position: "relative",
          textAlign: "center",
          paddingLeft: String(20) + ea,
          paddingRight: String(20) + ea,
          background: colorChip.white,
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
        paddingBottom: String(guideBlockPaddingTop) + ea,
        paddingTop: String(guideBlockPaddingTop) + ea,
        borderBottom: i === contents.guide.length - 1 ? "" : "1px dashed " + colorChip.gray3,
      }
    });

    guideDescriptionBlock = createNode({
      mother: guideBlock,
      style: {
        display: "inline-block",
        position: "relative",
        width: withOut(guideImageWidth, ea),
        height: String(descriptionHeight) + ea,
        verticalAlign: "top",
      }
    });

    createNode({
      mother: guideDescriptionBlock,
      text: "0" + String(i + 1),
      style: {
        display: "block",
        position: "relative",
        fontSize: String(22) + ea,
        fontWeight: String(400),
        color: colorChip.black,
        fontFamily: "graphik",
      }
    });

    descriptionBox = createNode({
      mother: guideDescriptionBlock,
      style: {
        position: "absolute",
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
        textAlign: "right",
        fontSize: String(18) + ea,
        fontWeight: String(800),
        color: colorChip.black,
        lineHeight: String(1.66),
      }
    });

    createNode({
      mother: descriptionBox,
      text: contents.guide[i].description.join("\n"),
      style: {
        display: "block",
        position: "relative",
        textAlign: "right",
        fontSize: String(14) + ea,
        fontWeight: String(400),
        color: colorChip.black,
        lineHeight: String(1.6),
        marginTop: String(8) + ea,
      },
      bold: {
        fontSize: String(14) + ea,
        color: colorChip.green,
        fontWeight: String(600),
      }
    });


    createNode({
      mother: guideBlock,
      mode: "img",
      attribute: {
        src: MiniGuideJs.binaryPath + "/" + contents.guide[i].image,
      },
      style: {
        display: "inline-block",
        position: "relative",
        width: String(guideImageWidth) + ea,
        height: "auto",
        verticalAlign: "top",
      }
    });

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

  bottomMargin = <%% 16, 16, 16, 12, 5 %%>;
  margin = <%% 56, 52, 44, 32, 52 %%>;

  contents = {
    title: [
      "공간 실측 가이드와",
      "제공 품목 안내"
    ],
    description: [
      "디자이너와의 온라인 상담이 진행되기 전에, 공간 실측 가이드와 제공 품목 안내서를 제공해드립니다.",
      "<b%스타일링을 받고자 하는 공간의 실측을 가이드에 따라 진행해주시면,%b> 디자이너는 그 정보를 바탕으로 디자인을 진행하게 됩니다."
    ],
    image: MiniGuideJs.binaryPath + "/init" + String(media.findIndex(boo => boo)) + ".svg",
  };

  whiteBlock = createNode({
    mother: this.baseTong,
    style: {
      position: "relative",
      borderRadius: String(8) + "px",
      width: String(100) + '%',
      height: String(400) + ea,
      background: colorChip.white,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
    }
  });

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

  bottomMargin = <%% 16, 16, 16, 12, 5 %%>;
  margin = <%% 56, 52, 44, 32, 52 %%>;

  contents = {
    title: [
      "공간 실측 가이드와",
      "제공 품목 안내"
    ],
    description: [
      "디자이너와의 온라인 상담이 진행되기 전에, 공간 실측 가이드와 제공 품목 안내서를 제공해드립니다.",
      "<b%스타일링을 받고자 하는 공간의 실측을 가이드에 따라 진행해주시면,%b> 디자이너는 그 정보를 바탕으로 디자인을 진행하게 됩니다."
    ],
    image: MiniGuideJs.binaryPath + "/init" + String(media.findIndex(boo => boo)) + ".svg",
  };

  whiteBlock = createNode({
    mother: this.baseTong,
    style: {
      position: "relative",
      borderRadius: String(8) + "px",
      width: String(100) + '%',
      height: String(400) + ea,
      background: colorChip.white,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
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
