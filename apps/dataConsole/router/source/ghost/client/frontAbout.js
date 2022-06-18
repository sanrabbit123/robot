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
      "return ('홈리에종 서비스 소개 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('홈리에종 서비스 소개 페이지 입니다! | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "frontAbout",
  "route": [
    "frontAbout"
  ]
} %/%/g

const FrontAboutJs = function () {
  this.mother = new GeneralJs();
}

FrontAboutJs.binaryPath = FRONTHOST + "/middle/about";

FrontAboutJs.prototype.generateGsArray = function (number) {
  if (typeof number !== "number") {
    throw new Error("invaild input");
  }
  const instance = this;
  const standard = [
    'g', 's', 's',
    's', 's', 's', 's',
    's', 's', 'g',
    's', 's', 's', 's',
    's', 's', 's', 's',
    's', 's', 'g',
  ];
  let additional;
  let add;
  let multi;
  let result;
  additional = number % standard.length;
  add = standard.slice(0, additional);
  multi = Math.floor(number / standard.length);
  result = [];
  for (let i = 0; i < multi; i++) {
    result = result.concat(JSON.parse(JSON.stringify(standard)));
  }
  result = result.concat(add);
  return result;
}

FrontAboutJs.prototype.insertInitBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics } = GeneralJs;
  const { ea, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let whiteBlock;
  let style;
  let blockHeight;
  let leftBox, rightBox;
  let titleBox, barBox, indexBox;
  let margin;
  let quoteWidth;
  let quoteHeight;
  let titleFontSize, titleFontWeight;
  let serviceChildren;
  let searchTags;
  let titleWording;
  let servicePaddingLeft;
  let serviceSize;
  let serviceBlockPaddingTop;
  let whiteBlockPaddingTop, whiteBlockPaddingBottom;
  let quotoTongHeight;
  let searchBarPaddingTop;
  let searchBarHeight;
  let searchBarWidth;
  let searchIconHeight;
  let searchIconRight, searchIconTop;
  let whiteBlockMarginBottom;
  let inputWithoutHeight;
  let serviceButtonClassName;
  let serviceBlock;
  let inputSize, inputWeight;
  let placeholder;
  let titleTop;
  let servicePaddingTop, servicePaddingBottom;
  let serviceMarginRight;
  let subTitleMarginTop, subTitleFontSize, subTitleWeight;
  let subTitleContents;
  let middleBox;
  let tagTextTop;
  let tagTongBottom;
  let boxTopVisual;
  let mobileBlockTop;

  margin = <%% 30, 30, 30, 30, 30 %%>;

  whiteBlockMarginBottom = <%% (isMac() ? 133 : 131), (isMac() ? 135 : 135), (isMac() ? 123 : 122), (isMac() ? 102 : 100), 4 %%>;

  quoteHeight = <%% 14, 14, 14, 14, 2.5 %%>;
  quotoTongHeight = <%% 16, 16, 16, 16, 4 %%>;
  titleFontSize = <%% 35, 33, 32, 30, 6.4 %%>;
  titleFontWeight = <%% 700, 700, 700, 700, 700 %%>;
  titleTop = <%% (isMac() ? 0 : 4), (isMac() ? 0 : 4), (isMac() ? 0 : 3), (isMac() ? 0 : 2), (isMac() ? 0 : 4) %%>;

  servicePaddingTop = <%% 7, 7, 7, 7, 7 %%>;
  servicePaddingBottom = <%% 10, 10, 10, 10, 10 %%>;
  servicePaddingLeft = <%% 13, 13, 13, 12, 2.2 %%>;
  serviceMarginRight = <%% 6, 6, 6, 6, 6 %%>;
  serviceSize = <%% 13, 13, 13, 12, 3.3 %%>;
  serviceBlockPaddingTop = <%% (isMac() ? 39 : 42), (isMac() ? 39 : 42), (isMac() ? 39 : 42), (isMac() ? 39 : 42), 5 %%>;

  whiteBlockPaddingTop = <%% 56, 56, 56, 56, 9 %%>;
  whiteBlockPaddingBottom = <%% 80, 80, 80, 80, 11 %%>;

  searchBarPaddingTop = <%% 220, 220, 192, 164, 11.5 %%>;
  searchBarHeight = <%% 40, 40, 40, 36, 8 %%>;
  searchBarWidth = <%% 690, 516, 516, 420, 88 %%>;

  searchIconHeight = <%% 20, 20, 20, 20, 4 %%>;
  searchIconRight = <%% 11, 11, 11, 11, 2 %%>;
  searchIconTop = <%% 10, 10, 10, 10, 1.8 %%>;

  inputWithoutHeight = <%% (isMac() ? 3 : 0), (isMac() ? 3 : 0), (isMac() ? 3 : 0), (isMac() ? 3 : 0), 0.8 %%>;

  inputSize = <%% 15, 15, 15, 14, 3.1 %%>;
  inputWeight = <%% 300, 300, 300, 300, 300 %%>;

  subTitleMarginTop = <%% 2, 2, 1, 1, 0.2 %%>;
  subTitleFontSize = <%% 16, 16, 16, 15, 3.2 %%>;
  subTitleWeight = <%% 500, 500, 500, 500, 500 %%>;

  tagTextTop = <%% (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), -0.3 %%>;
  tagTongBottom = <%% 3, 3, 1, 1, 0 %%>;
  boxTopVisual = <%% 1, 1, 0, 0, 0 %%>;

  titleWording = "홈리에종 서비스 소개";
  subTitleContents = "홈리에종과 함께 하는 홈스타일링";

  mobileBlockTop = 3.5;

  searchTags = [];

  placeholder = "새아파트";

  serviceButtonClassName = "serviceButton";

  whiteBlock = createNode({
    mother: this.baseTong,
    style: {
      display: "block",
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      paddingBottom: String(whiteBlockMarginBottom) + ea,
      top: String(-1 * boxTopVisual) + ea,
      paddingTop: desktop ? "" : String(mobileBlockTop) + ea,
    }
  });

  quoteWidth = SvgTong.getRatio(SvgTong.stringParsing(svgMaker.doubleQuote(colorChip.white))) * quoteHeight;
  createNode({
    mother: whiteBlock,
    style: {
      display: "flex",
      position: "relative",
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
      height: String(quotoTongHeight) + ea,
      opacity: String(0.6),
    },
    children: [
      {
        mode: "svg",
        source: svgMaker.doubleQuote(colorChip.white),
        style: {
          display: "inline-block",
          height: String(quoteHeight) + ea,
          width: String(quoteWidth) + ea,
        }
      }
    ]
  });

  createNode({
    mother: whiteBlock,
    style: {
      display: "flex",
      position: "relative",
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
    },
    children: [
      {
        text: titleWording,
        style: {
          display: "inline-block",
          position: "relative",
          top: mobile ? "" : String(titleTop) + ea,
          fontSize: String(titleFontSize) + ea,
          fontWeight: String(titleFontWeight),
          color: colorChip.white,
        }
      }
    ]
  });

  createNode({
    mother: whiteBlock,
    style: {
      display: "flex",
      position: "relative",
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
      marginTop: String(subTitleMarginTop) + ea,
    },
    children: [
      {
        text: subTitleContents,
        style: {
          display: "inline-block",
          position: "relative",
          top: mobile ? "" : String(0) + ea,
          fontSize: String(subTitleFontSize) + ea,
          fontWeight: String(subTitleWeight),
          color: colorChip.white,
        }
      }
    ]
  });

}

FrontAboutJs.prototype.insertFirstService = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics } = GeneralJs;
  const { ea, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let mainBlock;
  let mainPaddingTop, mainPaddingBottom;
  let titleArea, contentsArea;
  let contents;
  let titleSize, titleWeight, titleLineHeight;
  let titlePaddingLeft;
  let titleLineTop;
  let numberSize, numberWeight, numberLineHeight, numberTextTop;
  let contentsAreaMarginTop;
  let contentsSize, contentsWeight, contentsBoldWeight, contentsLineHeight;
  let width0, width1, width2;
  let imageHeight;
  let buttonWidth, buttonHeight;
  let buttonTextTop, buttonSize, buttonWeight, buttonLineHeight;

  mainPaddingTop = <%% (isMac() ? 133 : 131), (isMac() ? 135 : 135), (isMac() ? 123 : 122), (isMac() ? 102 : 100), 4 %%>;
  mainPaddingBottom = <%% (isMac() ? 153 : 151), (isMac() ? 155 : 155), (isMac() ? 143 : 142), (isMac() ? 122 : 120), 5 %%>;

  titleSize = <%% 32, 32, 32, 32, 32 %%>;
  titleWeight = <%% 800, 800, 800, 800, 800 %%>;
  titleLineHeight = <%% 1.4, 1.4, 1.4, 1.4, 1.4 %%>;
  titlePaddingLeft = <%% 24, 24, 24, 24, 24 %%>;
  titleLineTop = <%% 23, 23, 23, 23, 23 %%>;

  numberTextTop = <%% 5, 5, 5, 5, 5 %%>;
  numberSize = <%% 27, 27, 27, 27, 27 %%>;
  numberWeight = <%% 700, 700, 700, 700, 700 %%>;
  numberLineHeight = <%% 1.4, 1.4, 1.4, 1.4, 1.4 %%>;

  contentsAreaMarginTop = <%% 45, 45, 45, 45, 45 %%>;

  contentsSize = <%% 16, 16, 16, 16, 16 %%>;
  contentsWeight = <%% 400, 400, 400, 400, 400 %%>;
  contentsBoldWeight = <%% 700, 700, 700, 700, 700 %%>;
  contentsLineHeight = <%% 1.66, 1.66, 1.66, 1.66, 1.66 %%>;

  width0 = <%% 172, 172, 172, 172, 172 %%>;
  width1 = <%% 418, 418, 418, 418, 418 %%>;
  width2 = <%% 810, 810, 810, 810, 810 %%>;

  imageHeight = <%% 390, 390, 390, 390, 390 %%>;

  buttonHeight = <%% 36, 36, 36, 36, 36 %%>;
  buttonWidth = <%% 180, 180, 180, 180, 180 %%>;
  buttonTextTop = <%% -1, -1, -1, -1, -1 %%>;
  buttonSize = <%% 13, 13, 13, 13, 13 %%>;
  buttonWeight = <%% 700, 700, 700, 700, 700 %%>;
  buttonLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;

  contents = {
    main: [
      "홈리에종의 서비스는",
      "무엇인가요?",
    ],
    sub: [
      "홈리에종 서비스"
    ],
    description: [
      [
        "홈리에종은 홈스타일링 컨시어지 서비스를",
        "운영하는 플랫폼입니다. <b%홈리에종에서 디자이너를",
        "만나 단계별로 제공되는 케어 서비스를 경험해",
        "보세요.%b> 상황에 맞는 방법을 찾아 고객님과 함께",
        "인테리어 디자인을 완성합니다.",
      ],
      [
        "한 명의 디자이너가 우리집 시공부터",
        "홈스타일링까지, 내 상황에 맞는 홈리에종 케어",
        "서비스를 받아 나만의 집을 완성해보세요!",
      ]
    ],
    button: [
      "디자이너 큐레이션 설명 보기"
    ],
    image: [
      FrontAboutJs.binaryPath + "/a1.jpg"
    ],
  };

  mainBlock = createNode({
    mother: this.baseTong,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
      paddingTop: String(mainPaddingTop) + ea,
      paddingBottom: String(mainPaddingBottom) + ea,
    }
  });

  titleArea = createNode({
    mother: mainBlock,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
    }
  });

  createNode({
    mother: titleArea,
    style: {
      display: "block",
      position: "absolute",
      top: String(0),
      left: String(0),
      width: withOut(0, ea),
      height: String(titleLineTop) + ea,
      borderBottom: "1px solid " + colorChip.gray3,
    }
  });

  createNode({
    mother: titleArea,
    text: "01",
    style: {
      display: "block",
      position: "absolute",
      top: String(numberTextTop) + ea,
      right: String(0),
      background: colorChip.gray0,
      paddingLeft: String(titlePaddingLeft) + ea,
      fontSize: String(numberSize) + ea,
      fontWeight: String(numberWeight),
      lineHeight: String(numberLineHeight),
    }
  });

  createNode({
    mother: titleArea,
    text: contents.main.join("\n"),
    style: {
      display: "inline-block",
      position: "relative",
      fontSize: String(titleSize) + ea,
      fontWeight: String(titleWeight),
      lineHeight: String(titleLineHeight),
      background: colorChip.gray0,
      color: colorChip.black,
      textAlign: "left",
      paddingRight: String(titlePaddingLeft) + ea,
    }
  });

  contentsArea = createNode({
    mother: mainBlock,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
      marginTop: String(contentsAreaMarginTop) + ea,
    }
  });

  createNode({
    mother: contentsArea,
    text: contents.sub.join("\n"),
    style: {
      display: "inline-block",
      position: "relative",
      fontSize: String(contentsSize) + ea,
      fontWeight: String(contentsBoldWeight),
      lineHeight: String(contentsLineHeight),
      color: colorChip.black,
      textAlign: "left",
      verticalAlign: "top",
      width: String(width0) + ea,
    }
  });

  createNode({
    mother: contentsArea,
    text: contents.description.map((arr) => { return arr.join("\n") }).join("\n\n"),
    style: {
      display: "inline-block",
      position: "relative",
      fontSize: String(contentsSize) + ea,
      fontWeight: String(contentsWeight),
      lineHeight: String(contentsLineHeight),
      color: colorChip.black,
      textAlign: "left",
      verticalAlign: "top",
      width: String(width1) + ea,
    },
    bold: {
      fontWeight: String(contentsBoldWeight),
      lineHeight: String(contentsLineHeight),
      color: colorChip.black,
    }
  });

  createNode({
    mother: contentsArea,
    style: {
      display: "inline-block",
      position: "relative",
      backgroundImage: "url('" + contents.image[0] + "')",
      backgroundPosition: "50% 41%",
      backgroundSize: "100% auto",
      width: String(width2) + ea,
      height: String(imageHeight) + ea,
      borderRadius: String(5) + "px",
      boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
    }
  });

  createNode({
    mother: contentsArea,
    style: {
      display: "inline-flex",
      position: "absolute",
      bottom: String(0),
      left: String(width0) + ea,
      verticalAlign: "top",
      height: String(buttonHeight) + ea,
      width: String(buttonWidth) + ea,
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      background: colorChip.gradientGreen,
      borderRadius: String(5) + "px",
      cursor: "pointer",
    },
    children: [
      {
        text: contents.button.join("\n"),
        style: {
          position: "relative",
          display: "inline-block",
          top: String(buttonTextTop) + ea,
          fontSize: String(buttonSize) + ea,
          fontWeight: String(buttonWeight),
          lineHeight: String(buttonLineHeight),
          color: colorChip.white,
        }
      }
    ]
  });

}

FrontAboutJs.prototype.insertSecondService = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics } = GeneralJs;
  const { ea, media, standardWidth } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let mainBlock;
  let mainPaddingTop, mainPaddingBottom;
  let contents;
  let baseTongClone;
  let titleArea, contentsArea;
  let titleSize, titleWeight, titleLineHeight;
  let numberSize, numberWeight, numberLineHeight, numberTextTop;
  let boxBetween;
  let boxNumber;
  let baseBox;
  let blockBox;
  let subSize, subWeight, subBetween;
  let subHorizontalHeight;
  let subHorizontalMargin;
  let arrowWidth;
  let imageHeight;
  let blankFirstTop;
  let contentsSize;
  let contentsWeight;
  let contentsBoldWeight;
  let contentsLineHeight;
  let buttonTextTop;
  let buttonSize;
  let buttonWeight;
  let buttonLineHeight;
  let buttonHeight;
  let buttonWidth;
  let contentsVisualTextTop;

  titleSize = <%% 31, 31, 31, 31, 31 %%>;
  titleWeight = <%% 800, 800, 800, 800, 800 %%>;
  titleLineHeight = <%% 1.4, 1.4, 1.4, 1.4, 1.4 %%>;

  numberTextTop = <%% 3, 3, 3, 3, 3 %%>;
  numberSize = <%% 25, 25, 25, 25, 25 %%>;
  numberWeight = <%% 700, 700, 700, 700, 700 %%>;
  numberLineHeight = <%% 1.4, 1.4, 1.4, 1.4, 1.4 %%>;

  contentsAreaMarginTop = <%% 45, 45, 45, 45, 45 %%>;

  mainPaddingTop = <%% (isMac() ? 133 : 131), (isMac() ? 135 : 135), (isMac() ? 123 : 122), (isMac() ? 102 : 100), 4 %%>;
  mainPaddingBottom = <%% (isMac() ? 153 : 151), (isMac() ? 155 : 155), (isMac() ? 143 : 142), (isMac() ? 122 : 120), 5 %%>;

  boxBetween = <%% 45, 45, 45, 45, 45 %%>;
  subHorizontalHeight = <%% 40, 40, 40, 40, 40 %%>;
  subHorizontalMargin = <%% 3, 3, 3, 3, 3 %%>;

  boxNumber = 5;

  subSize = <%% 16, 16, 16, 16, 16 %%>;
  subWeight = <%% 600, 600, 600, 600, 600 %%>;
  subBetween = <%% 11, 11, 11, 11, 11 %%>;

  arrowWidth = <%% 12, 12, 12, 12, 12 %%>;

  imageHeight = <%% 244, 244, 244, 244, 244 %%>;
  blankFirstTop = <%% 33, 33, 33, 33, 33 %%>;

  contentsSize = <%% 16, 16, 16, 16, 16 %%>;
  contentsWeight = <%% 400, 400, 400, 400, 400 %%>;
  contentsBoldWeight = <%% 700, 700, 700, 700, 700 %%>;
  contentsLineHeight = <%% 1.66, 1.66, 1.66, 1.66, 1.66 %%>;

  buttonHeight = <%% 36, 36, 36, 36, 36 %%>;
  buttonWidth = <%% 120, 120, 120, 120, 120 %%>;
  buttonTextTop = <%% -1, -1, -1, -1, -1 %%>;
  buttonSize = <%% 13, 13, 13, 13, 13 %%>;
  buttonWeight = <%% 700, 700, 700, 700, 700 %%>;
  buttonLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;

  contentsVisualTextTop = <%% 5, 5, 5, 5, 5 %%>;

  contents = {
    main: [
      "구체적으로 어떻게 진행되나요?",
    ],
    sub: [
      "상담 신청서 작성",
      "서비스 큐레이션",
      "디자이너 선택",
      "현장 미팅",
      "기획 / 디자인",
      "시공 / 제품 구매",
      "촬영 / 인터뷰"
    ],
    description: [
      [
        "홈리에종의 프로세스는 일단 먼저,",
        "하단 상담 신청서를 작성해주시면,",
        "홈리에종의 친절한 상담과 추천으로",
        "<b%나에게 가장 잘 맞는 디자이너를%b>",
        "<b%만나%b> 홈스타일링을 진행하게 됩니다.",
      ],
      [
        "고객님과 매칭된 디자이너는",
        "<b%일단 기획과 디자인을 선행한 후,",
        "시공 견적을 내고 제품 제안을 진행%b>",
        "하게 됩니다. 그리고 세팅에 관여하여",
        "인테리어 프로세를 완성하게 됩니다.",
      ]
    ],
    button: [
      "결제 및 프로세스"
    ],
    image: [
      FrontAboutJs.binaryPath + "/b1.jpg",
      FrontAboutJs.binaryPath + "/b2.jpg",
      FrontAboutJs.binaryPath + "/b3.jpg",
      FrontAboutJs.binaryPath + "/b4.jpg",
      FrontAboutJs.binaryPath + "/b5.jpg",
      FrontAboutJs.binaryPath + "/b6.jpg",
      FrontAboutJs.binaryPath + "/b7.jpg",
    ]
  };

  baseTongClone = this.baseTong.cloneNode(false);
  this.baseTong.parentNode.appendChild(baseTongClone);

  baseTongClone.style.width = String(100) + '%';
  baseTongClone.style.left = String(0);
  baseTongClone.style.paddingTop = "";
  baseTongClone.style.background = colorChip.gray1;

  mainBlock = createNode({
    mother: baseTongClone,
    style: {
      display: "block",
      position: "relative",
      width: String(standardWidth) + ea,
      left: withOut(50, standardWidth / 2, ea),
      paddingTop: String(mainPaddingTop) + ea,
      paddingBottom: String(mainPaddingBottom) + ea,
    }
  });

  titleArea = createNode({
    mother: mainBlock,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
    }
  });

  createNode({
    mother: titleArea,
    text: "02",
    style: {
      display: "block",
      position: "relative",
      width: withOut(0, ea),
      textAlign: "center",
      fontSize: String(numberSize) + ea,
      fontWeight: String(numberWeight),
      lineHeight: String(numberLineHeight),
    }
  });

  createNode({
    mother: titleArea,
    text: contents.main.join("\n"),
    style: {
      display: "block",
      position: "relative",
      width: withOut(0, ea),
      textAlign: "center",
      fontSize: String(titleSize) + ea,
      fontWeight: String(titleWeight),
      lineHeight: String(titleLineHeight),
      color: colorChip.black,
    }
  });

  contentsArea = createNode({
    mother: mainBlock,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
      marginTop: String(contentsAreaMarginTop) + ea,
    }
  });

  for (let i = 0; i < boxNumber; i++) {
    baseBox = createNode({
      mother: contentsArea,
      attribute: { index: String(i), },
      style: {
        display: "inline-block",
        width: "calc(calc(100% - " + String(boxBetween * (boxNumber - 1)) + ea + ") / " + String(boxNumber) + ")",
        verticalAlign: "top",
      }
    });

    if (i === 0) {
      createNode({
        mother: baseBox,
        style: {
          display: "block",
          position: "relative",
        },
        children: [
          {
            text: contents.sub[0],
            style: {
              display: "block",
              position: "relative",
              width: String(100) + '%',
              textAlign: "center",
              fontSize: String(subSize) + ea,
              fontWeight: String(subWeight),
              color: colorChip.darkShadow,
              marginBottom: String(subBetween) + ea,
            }
          },
          {
            mode: "img",
            attribute: {
              src: contents.image[0],
            },
            style: {
              display: "block",
              position: "relative",
              width: String(100) + '%',
              borderRadius: String(5) + "px",
              boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
            }
          }
        ]
      });
      createNode({
        mother: baseBox,
        style: {
          display: "flex",
          width: withOut(0, ea),
          height: String(subHorizontalHeight) + ea,
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          marginTop: String(subHorizontalMargin) + ea,
          marginBottom: String(subHorizontalMargin) + ea,
        },
        children: [
          {
            mode: "svg",
            source: instance.mother.returnArrow("right", colorChip.gray4),
            style: {
              display: "inline-block",
              width: String(arrowWidth) + ea,
              transform: "rotate(90deg)",
            }
          }
        ]
      });
      createNode({
        mother: baseBox,
        style: {
          display: "block",
          position: "relative",
        },
        children: [
          {
            mode: "img",
            attribute: {
              src: contents.image[5],
            },
            style: {
              display: "block",
              position: "relative",
              width: String(100) + '%',
              borderRadius: String(5) + "px",
              marginBottom: String(subBetween) + ea,
              boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
            }
          },
          {
            text: contents.sub[5],
            style: {
              display: "block",
              position: "relative",
              width: String(100) + '%',
              textAlign: "center",
              fontSize: String(subSize) + ea,
              fontWeight: String(subWeight),
              color: colorChip.darkShadow,
            }
          },
        ]
      });
    } else if (i === 1) {
      createNode({
        mother: baseBox,
        style: {
          display: "block",
          position: "relative",
        },
        children: [
          {
            text: contents.sub[1],
            style: {
              display: "block",
              position: "relative",
              width: String(100) + '%',
              textAlign: "center",
              fontSize: String(subSize) + ea,
              fontWeight: String(subWeight),
              color: colorChip.darkShadow,
              marginBottom: String(subBetween) + ea,
            }
          },
          {
            mode: "img",
            attribute: {
              src: contents.image[1],
            },
            style: {
              display: "block",
              position: "relative",
              width: String(100) + '%',
              borderRadius: String(5) + "px",
              boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
            }
          }
        ]
      });
      createNode({
        mother: baseBox,
        style: {
          display: "flex",
          width: withOut(0, ea),
          height: String(subHorizontalHeight) + ea,
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          marginTop: String(subHorizontalMargin) + ea,
          marginBottom: String(subHorizontalMargin) + ea,
        },
        children: [
          {
            mode: "svg",
            source: instance.mother.returnArrow("right", colorChip.gray4),
            style: {
              display: "inline-block",
              width: String(arrowWidth) + ea,
              transform: "rotate(270deg)",
            }
          }
        ]
      });
      createNode({
        mother: baseBox,
        style: {
          display: "block",
          position: "relative",
        },
        children: [
          {
            mode: "img",
            attribute: {
              src: contents.image[6],
            },
            style: {
              display: "block",
              position: "relative",
              width: String(100) + '%',
              borderRadius: String(5) + "px",
              marginBottom: String(subBetween) + ea,
              boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
            }
          },
          {
            text: contents.sub[6],
            style: {
              display: "block",
              position: "relative",
              width: String(100) + '%',
              textAlign: "center",
              fontSize: String(subSize) + ea,
              fontWeight: String(subWeight),
              color: colorChip.darkShadow,
            }
          },
        ]
      });
    } else if (i === 2) {
      createNode({
        mother: baseBox,
        style: {
          display: "block",
          position: "relative",
        },
        children: [
          {
            text: contents.sub[2],
            style: {
              display: "block",
              position: "relative",
              width: String(100) + '%',
              textAlign: "center",
              fontSize: String(subSize) + ea,
              fontWeight: String(subWeight),
              color: colorChip.darkShadow,
              marginBottom: String(subBetween) + ea,
            }
          },
          {
            mode: "img",
            attribute: {
              src: contents.image[2],
            },
            style: {
              display: "block",
              position: "relative",
              width: String(100) + '%',
              borderRadius: String(5) + "px",
              boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
            }
          }
        ]
      });
      createNode({
        mother: baseBox,
        style: {
          display: "flex",
          position: "relative",
          marginTop: String(subHorizontalHeight + (subHorizontalMargin * 2)) + ea,
          height: String(imageHeight) + ea,
        },
        children: [
          {
            style: {
              display: "flex",
              position: "absolute",
              bottom: String(0),
              left: String(0),
              width: String(buttonWidth) + ea,
              height: String(buttonHeight) + ea,
              background: colorChip.gradientGreen,
              borderRadius: String(5) + "px",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              cursor: "pointer",
            },
            children: [
              {
                text: contents.button.join("\n"),
                style: {
                  position: "relative",
                  top: String(buttonTextTop) + ea,
                  fontSize: String(buttonSize) + ea,
                  fontWeight: String(buttonWeight),
                  color: colorChip.white,
                  lineHeight: String(buttonLineHeight),
                }
              }
            ]
          }
        ]
      });


    } else if (i === 3) {
      createNode({
        mother: baseBox,
        style: {
          display: "block",
          position: "relative",
        },
        children: [
          {
            text: contents.sub[3],
            style: {
              display: "block",
              position: "relative",
              width: String(100) + '%',
              textAlign: "center",
              fontSize: String(subSize) + ea,
              fontWeight: String(subWeight),
              color: colorChip.darkShadow,
              marginBottom: String(subBetween) + ea,
            }
          },
          {
            mode: "img",
            attribute: {
              src: contents.image[3],
            },
            style: {
              display: "block",
              position: "relative",
              width: String(100) + '%',
              borderRadius: String(5) + "px",
              boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
            }
          }
        ]
      });
      createNode({
        mother: baseBox,
        style: {
          display: "flex",
          position: "relative",
          marginTop: String(subHorizontalHeight + (subHorizontalMargin * 2)) + ea,
          height: String(imageHeight) + ea,
          flexDirection: "column-reverse",
        },
        children: [
          {
            text: contents.description[0].join("\n"),
            style: {
              display: "block",
              position: "relative",
              fontSize: String(contentsSize) + ea,
              fontWeight: String(contentsWeight),
              lineHeight: String(contentsLineHeight),
              color: colorChip.black,
              top: String(contentsVisualTextTop) + ea,
            },
            bold: {
              fontWeight: String(contentsBoldWeight),
              color: colorChip.black,
            }
          }
        ]
      });

    } else if (i === 4) {
      createNode({
        mother: baseBox,
        style: {
          display: "block",
          position: "relative",
        },
        children: [
          {
            text: contents.sub[4],
            style: {
              display: "block",
              position: "relative",
              width: String(100) + '%',
              textAlign: "center",
              fontSize: String(subSize) + ea,
              fontWeight: String(subWeight),
              color: colorChip.darkShadow,
              marginBottom: String(subBetween) + ea,
            }
          },
          {
            mode: "img",
            attribute: {
              src: contents.image[4],
            },
            style: {
              display: "block",
              position: "relative",
              width: String(100) + '%',
              borderRadius: String(5) + "px",
              boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
            }
          }
        ]
      });
      createNode({
        mother: baseBox,
        style: {
          display: "flex",
          position: "relative",
          marginTop: String(subHorizontalHeight + (subHorizontalMargin * 2)) + ea,
          height: String(imageHeight) + ea,
          flexDirection: "column-reverse",
        },
        children: [
          {
            text: contents.description[1].join("\n"),
            style: {
              display: "block",
              position: "relative",
              fontSize: String(contentsSize) + ea,
              fontWeight: String(contentsWeight),
              lineHeight: String(contentsLineHeight),
              color: colorChip.black,
              top: String(contentsVisualTextTop) + ea,
            },
            bold: {
              fontWeight: String(contentsBoldWeight),
              color: colorChip.black,
            }
          }
        ]
      });

    }

    if (i !== boxNumber - 1) {
      blockBox = createNode({
        mother: contentsArea,
        style: {
          display: "inline-block",
          width: String(boxBetween) + ea,
          verticalAlign: "top",
        }
      });

      if (i === 0) {

        createNode({
          mother: blockBox,
          style: {
            display: "flex",
            width: withOut(0, ea),
            height: String(imageHeight) + ea,
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            marginTop: String(blankFirstTop) + ea,
          },
        });

        createNode({
          mother: blockBox,
          style: {
            display: "flex",
            width: withOut(0, ea),
            height: String(imageHeight) + ea,
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            marginTop: String(subHorizontalHeight + (subHorizontalMargin * 2)) + ea,
          },
          children: [
            {
              mode: "svg",
              source: instance.mother.returnArrow("right", colorChip.gray4),
              style: {
                display: "inline-block",
                width: String(arrowWidth) + ea,
              }
            }
          ]
        });

      } else {

        createNode({
          mother: blockBox,
          style: {
            display: "flex",
            width: withOut(0, ea),
            height: String(imageHeight) + ea,
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            marginTop: String(blankFirstTop) + ea,
          },
          children: [
            {
              mode: "svg",
              source: instance.mother.returnArrow("right", colorChip.gray4),
              style: {
                display: "inline-block",
                width: String(arrowWidth) + ea,
              }
            }
          ]
        });

      }

    }
  }

}

FrontAboutJs.prototype.insertThirdService = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics } = GeneralJs;
  const { ea, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let mainBlock;
  let mainPaddingTop, mainPaddingBottom;
  let titleArea, contentsArea;
  let contents;
  let titleSize, titleWeight, titleLineHeight;
  let titlePaddingLeft;
  let titleLineTop;
  let numberSize, numberWeight, numberLineHeight, numberTextTop;
  let contentsAreaMarginTop;
  let contentsSize, contentsWeight, contentsBoldWeight, contentsLineHeight;
  let width0, width1, width2;
  let imageHeight;
  let buttonWidth, buttonHeight;
  let buttonTextTop, buttonSize, buttonWeight, buttonLineHeight;
  let buttonLeft;
  let titlePaddingRight;
  let width1MarginLeft;

  mainPaddingTop = <%% (isMac() ? 133 : 131), (isMac() ? 135 : 135), (isMac() ? 123 : 122), (isMac() ? 102 : 100), 4 %%>;
  mainPaddingBottom = <%% (isMac() ? 153 : 151), (isMac() ? 155 : 155), (isMac() ? 143 : 142), (isMac() ? 122 : 120), 5 %%>;

  titleSize = <%% 32, 32, 32, 32, 32 %%>;
  titleWeight = <%% 800, 800, 800, 800, 800 %%>;
  titleLineHeight = <%% 1.4, 1.4, 1.4, 1.4, 1.4 %%>;
  titlePaddingLeft = <%% 24, 24, 24, 24, 24 %%>;
  titleLineTop = <%% 23, 23, 23, 23, 23 %%>;
  titlePaddingRight = <%% 69, 69, 69, 69, 69 %%>;
  numberTextTop = <%% 5, 5, 5, 5, 5 %%>;
  numberSize = <%% 27, 27, 27, 27, 27 %%>;
  numberWeight = <%% 700, 700, 700, 700, 700 %%>;
  numberLineHeight = <%% 1.4, 1.4, 1.4, 1.4, 1.4 %%>;

  contentsAreaMarginTop = <%% 45, 45, 45, 45, 45 %%>;

  contentsSize = <%% 16, 16, 16, 16, 16 %%>;
  contentsWeight = <%% 400, 400, 400, 400, 400 %%>;
  contentsBoldWeight = <%% 700, 700, 700, 700, 700 %%>;
  contentsLineHeight = <%% 1.66, 1.66, 1.66, 1.66, 1.66 %%>;

  width0 = <%% 172, 172, 172, 172, 172 %%>;
  width1 = <%% 310, 310, 310, 310, 310 %%>;
  width2 = <%% 810, 810, 810, 810, 810 %%>;

  width1MarginLeft = <%% 108, 108, 108, 108, 108 %%>;

  imageHeight = <%% 390, 390, 390, 390, 390 %%>;

  buttonHeight = <%% 36, 36, 36, 36, 36 %%>;
  buttonWidth = <%% 130, 130, 130, 130, 130 %%>;
  buttonTextTop = <%% -1, -1, -1, -1, -1 %%>;
  buttonSize = <%% 13, 13, 13, 13, 13 %%>;
  buttonWeight = <%% 700, 700, 700, 700, 700 %%>;
  buttonLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;
  buttonLeft = <%% 1090, 1090, 1090, 1090, 1090 %%>;

  contents = {
    main: [
      "예산과 기간은",
      "어떻게 설정하나요?",
    ],
    sub: [
      "고객 준비 사항"
    ],
    description: [
      [
        "나에게 맞는 효율적이고 합리적인 예산 활용을 위해",
        "전체적인 예산에 대한 고민이 선행되어야 합니다.",
        "사용 가능한 전체 예산을 정하는 것은 디자이너가",
        "임의로 설정할 수 없으므로, <b%최대 최소 예산의",
        "범위를 고객님께서 직접 정해주시고, 디자이너와",
        "상담을 시작%b>하시면 됩니다.",
      ],
      [
        "* 가전을 위한 금액은 전체 예산에서 별도로 구분",
        "하셔야 합니다.",
      ]
    ],
    button: [
      "예산의 3가지 구성"
    ],
    image: [
      FrontAboutJs.binaryPath + "/c1.jpg"
    ],
  };

  baseTongClone = this.baseTong.cloneNode(false);
  this.baseTong.parentNode.appendChild(baseTongClone);

  baseTongClone.style.paddingTop = "";

  mainBlock = createNode({
    mother: baseTongClone,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
      paddingTop: String(mainPaddingTop) + ea,
      paddingBottom: String(mainPaddingBottom) + ea,
    }
  });

  titleArea = createNode({
    mother: mainBlock,
    style: {
      display: "flex",
      position: "relative",
      width: String(100) + '%',
      flexDirection: "row-reverse",
    }
  });

  createNode({
    mother: titleArea,
    style: {
      display: "block",
      position: "absolute",
      top: String(0),
      left: String(0),
      width: withOut(0, ea),
      height: String(titleLineTop) + ea,
      borderBottom: "1px solid " + colorChip.gray3,
    }
  });

  createNode({
    mother: titleArea,
    text: "03",
    style: {
      display: "block",
      position: "absolute",
      top: String(numberTextTop) + ea,
      left: String(0),
      background: colorChip.gray0,
      paddingRight: String(titlePaddingLeft) + ea,
      fontSize: String(numberSize) + ea,
      fontWeight: String(numberWeight),
      lineHeight: String(numberLineHeight),
    }
  });

  createNode({
    mother: titleArea,
    text: contents.main.join("\n"),
    style: {
      display: "inline-block",
      position: "relative",
      fontSize: String(titleSize) + ea,
      fontWeight: String(titleWeight),
      lineHeight: String(titleLineHeight),
      background: colorChip.gray0,
      color: colorChip.black,
      textAlign: "left",
      paddingLeft: String(titlePaddingLeft) + ea,
      paddingRight: String(titlePaddingRight) + ea,
    }
  });

  contentsArea = createNode({
    mother: mainBlock,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
      marginTop: String(contentsAreaMarginTop) + ea,
    }
  });

  createNode({
    mother: contentsArea,
    style: {
      display: "inline-block",
      position: "relative",
      backgroundImage: "url('" + contents.image[0] + "')",
      backgroundPosition: "50% 41%",
      backgroundSize: "100% auto",
      width: String(width2) + ea,
      height: String(imageHeight) + ea,
      borderRadius: String(5) + "px",
      boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
    }
  });

  createNode({
    mother: contentsArea,
    text: contents.sub.join("\n"),
    style: {
      display: "inline-block",
      position: "relative",
      fontSize: String(contentsSize) + ea,
      fontWeight: String(contentsBoldWeight),
      lineHeight: String(contentsLineHeight),
      color: colorChip.black,
      textAlign: "left",
      verticalAlign: "top",
      width: String(width0) + ea,
      marginLeft: String(width1MarginLeft) + ea,
    }
  });

  createNode({
    mother: contentsArea,
    text: contents.description.map((arr) => { return arr.join("\n") }).join("\n\n"),
    style: {
      display: "inline-block",
      position: "relative",
      fontSize: String(contentsSize) + ea,
      fontWeight: String(contentsWeight),
      lineHeight: String(contentsLineHeight),
      color: colorChip.black,
      textAlign: "left",
      verticalAlign: "top",
      width: String(width1) + ea,
    },
    bold: {
      fontWeight: String(contentsBoldWeight),
      lineHeight: String(contentsLineHeight),
      color: colorChip.black,
    }
  });

  createNode({
    mother: contentsArea,
    style: {
      display: "inline-flex",
      position: "absolute",
      bottom: String(0),
      left: String(buttonLeft) + ea,
      verticalAlign: "top",
      height: String(buttonHeight) + ea,
      width: String(buttonWidth) + ea,
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      background: colorChip.gradientGreen,
      borderRadius: String(5) + "px",
      cursor: "pointer",
    },
    children: [
      {
        text: contents.button.join("\n"),
        style: {
          position: "relative",
          display: "inline-block",
          top: String(buttonTextTop) + ea,
          fontSize: String(buttonSize) + ea,
          fontWeight: String(buttonWeight),
          lineHeight: String(buttonLineHeight),
          color: colorChip.white,
        }
      }
    ]
  });
}

FrontAboutJs.prototype.insertFourthService = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics } = GeneralJs;
  const { ea, media, standardWidth } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let mainBlock;
  let mainPaddingTop, mainPaddingBottom;
  let contents;
  let baseTongClone;
  let titleSize;
  let titleWeight;
  let titleLineHeight;
  let numberTextTop;
  let numberSize;
  let numberWeight;
  let numberLineHeight;
  let contentsAreaMarginTop;
  let titleArea, contentsArea;

  titleSize = <%% 31, 31, 31, 31, 31 %%>;
  titleWeight = <%% 800, 800, 800, 800, 800 %%>;
  titleLineHeight = <%% 1.4, 1.4, 1.4, 1.4, 1.4 %%>;

  numberTextTop = <%% 3, 3, 3, 3, 3 %%>;
  numberSize = <%% 25, 25, 25, 25, 25 %%>;
  numberWeight = <%% 700, 700, 700, 700, 700 %%>;
  numberLineHeight = <%% 1.4, 1.4, 1.4, 1.4, 1.4 %%>;

  contentsAreaMarginTop = <%% 45, 45, 45, 45, 45 %%>;

  mainPaddingTop = <%% (isMac() ? 133 : 131), (isMac() ? 135 : 135), (isMac() ? 123 : 122), (isMac() ? 102 : 100), 4 %%>;
  mainPaddingBottom = <%% (isMac() ? 153 : 151), (isMac() ? 155 : 155), (isMac() ? 143 : 142), (isMac() ? 122 : 120), 5 %%>;

  contents = {
    main: [
      "홈리에종과 함께 하는 홈스타일링",
    ],
    sub: [
      "홈스타일링 플랫폼",
      "프로젝트 케어",
      "솔직한 고객 후기",
    ],
    description: [
      [
        [
          "홈리에종에서는 다양한 스타일의 포트폴리오와",
          "홈스타일링 디자이너를 한 번에 만나 보실 수 있습니다.",
        ],
        [
          "홈리에종은 <b%시공에 치우쳐져 있던 인테리어 디자인을",
          "고객님들의 실제 생활을 위한 디자인으%b>로 바꾸어",
          "공간이 줄 수 있는 풍성함과 편안함을 전하고자 합니다.",
        ]
      ],
      [
        [
          "홈리에종은 고객님께서 안심하고 서비스를 받을 수",
          "있도록 전 인테리어 과정을 케어하고 인프라를 지원합니다.",
        ],
        [
          "홈리에종은 고객과 디자이너를 위해 있기에, <b%중재와 보증",
          "시공 인프라 지원, 다양한 부가 서비스 제공 등을 통해",
          "프로젝트 중심의 새로운 인테리어 문화%b>를 선도합니다.",
        ]
      ]
    ],
    button: [],
    image: []
  };

  baseTongClone = this.baseTong.cloneNode(false);
  this.baseTong.parentNode.appendChild(baseTongClone);

  baseTongClone.style.width = String(100) + '%';
  baseTongClone.style.left = String(0);
  baseTongClone.style.paddingTop = "";
  baseTongClone.style.background = colorChip.gray2;

  mainBlock = createNode({
    mother: baseTongClone,
    style: {
      display: "block",
      position: "relative",
      width: String(standardWidth) + ea,
      left: withOut(50, standardWidth / 2, ea),
      paddingTop: String(mainPaddingTop) + ea,
      paddingBottom: String(mainPaddingBottom) + ea,
    }
  });

  titleArea = createNode({
    mother: mainBlock,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
    }
  });

  createNode({
    mother: titleArea,
    text: "04",
    style: {
      display: "block",
      position: "relative",
      width: withOut(0, ea),
      textAlign: "center",
      fontSize: String(numberSize) + ea,
      fontWeight: String(numberWeight),
      lineHeight: String(numberLineHeight),
    }
  });

  createNode({
    mother: titleArea,
    text: contents.main.join("\n"),
    style: {
      display: "block",
      position: "relative",
      width: withOut(0, ea),
      textAlign: "center",
      fontSize: String(titleSize) + ea,
      fontWeight: String(titleWeight),
      lineHeight: String(titleLineHeight),
      color: colorChip.black,
    }
  });

  contentsArea = createNode({
    mother: mainBlock,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
      marginTop: String(contentsAreaMarginTop) + ea,
      background: colorChip.white,
      borderRadius: String(5) + "px",
      boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
      height: String(800) + ea,
    }
  });



}

FrontAboutJs.prototype.insertConsultingBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics } = GeneralJs;
  const { ea, media, standardWidth } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let mainBlock;
  let mainPaddingTop, mainPaddingBottom;
  let contents;
  let baseTongClone;

  mainPaddingTop = <%% (isMac() ? 133 : 131), (isMac() ? 135 : 135), (isMac() ? 123 : 122), (isMac() ? 102 : 100), 4 %%>;
  mainPaddingBottom = <%% (isMac() ? 153 : 151), (isMac() ? 155 : 155), (isMac() ? 143 : 142), (isMac() ? 122 : 120), 5 %%>;

  contents = {
    main: [
      "홈리에종 서비스 신청",
    ],
  };

  baseTongClone = this.baseTong.cloneNode(false);
  this.baseTong.parentNode.appendChild(baseTongClone);

  baseTongClone.style.width = String(100) + '%';
  baseTongClone.style.left = String(0);
  baseTongClone.style.paddingTop = "";
  baseTongClone.style.background = colorChip.gray1;

  mainBlock = createNode({
    mother: baseTongClone,
    style: {
      display: "block",
      position: "relative",
      width: String(standardWidth) + ea,
      left: withOut(50, standardWidth / 2, ea),
      paddingTop: String(mainPaddingTop) + ea,
      paddingBottom: String(mainPaddingBottom) + ea,
    }
  });

}

FrontAboutJs.prototype.insertPortfolioBase = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, svgMaker, equalJson, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics } = GeneralJs;
  const { ea, media, baseTong } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let baseBlock;
  let limitLength;
  let photoMargin;
  let paddingBottom;

  limitLength = <%% 42, 42, 42, 42, 42 %%>;
  photoMargin = <%% 20, 18, 18, 16, 3 %%>;
  paddingBottom = <%% 120, 120, 120, 120, 40 %%>;

  baseBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      width: "calc(100% + " + String(photoMargin) + ea + ")",
      paddingBottom: String(paddingBottom) + ea,
    }
  });

  this.portfolioBlock(limitLength, null);
}

FrontAboutJs.prototype.portfolioBlock = function (limitLength, search = null) {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, svgMaker, equalJson, cleanChildren, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, selfHref } = GeneralJs;
  const { ea, media, baseTong } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const photoChar = 't';
  const photoCharMobile = "mot";
  const touchStartConst = "touchStartConstName";
  let { contentsArr, designers } = this;
  let baseBlock;
  let gsArray;
  let baseWidth;
  let photoMargin;
  let columns;
  let seroWidth, garoWidth;
  let photoRatio;
  let photoHeight;
  let src;
  let contents;
  let title;
  let quoteWidth, quoteHeight;
  let quoteTop;
  let photoMarginBottom;
  let titleSize, titleWeight, titleMarginLeft;
  let tag;
  let block;
  let tagTong;
  let photoBlockMarginBottom;
  let garoSliceStart, garoSliceEnd, garoSliceLimit;
  let seroSliceStart, seroSliceEnd, seroSliceLimit;
  let tagTongMarginTop, tagTongWidthRatio;
  let tagSize, tagWeight;
  let tagPaddingLeft, tagPaddingTop, tagPaddingBottom;
  let tagMarginRight;
  let contentsArrCopied;
  let attach;
  let tagBlock;
  let subTitleMarginTop;
  let subTitleSize;
  let reviewSubTitleVisual;
  let arrowWidth;
  let arrowHeight;
  let arrowBottom;
  let arrowReviewBottom;
  let subTitleTextTop;

  if (typeof search === "string") {

    if (search === '') {
      contentsArr = contentsArr;
    } else {

      if (/엑스트라/gi.test(search)) {
        search = "엑스트라";
      }
      contentsArr = contentsArr.toNormal().filter((obj) => {
        let boo;
        let target;
        let projectTarget;
        let designerTarget;

        target = equalJson(JSON.stringify(obj.contents.portfolio.detailInfo.tag));
        target.push(obj.contents.review.title.main);
        target.push(obj.contents.review.title.sub);
        target.push(serviceParsing(obj.service));
        designerTarget = designers.search("desid", obj.desid);
        target.push(designerTarget.designer);

        boo = false;
        for (let t of target) {
          if ((new RegExp(search, "gi")).test(t)) {
            boo = true;
            break;
          }
        }

        return boo;
      });

    }

  } else {
    contentsArr = contentsArr;
  }

  if (limitLength === null) {
    limitLength = contentsArr.length;
  }

  gsArray = this.generateGsArray(limitLength);

  baseWidth = Number(baseTong.style.width.replace(/[^0-9\.]/gi, ''));
  photoMargin = <%% 20, 18, 18, 16, 3 %%>;
  columns = <%% 4, 4, 3, 3, 2 %%>;

  photoRatio = (297 / 210);
  seroWidth = (baseWidth - (photoMargin * (columns - 1))) / columns;
  garoWidth = (seroWidth * 2) + photoMargin;
  photoHeight = seroWidth * photoRatio;
  photoMarginBottom = <%% (isMac() ? 18 : 20), (isMac() ? 16 : 18), (isMac() ? 16 : 18), (isMac() ? 16 : 18), 2.5 %%>;

  quoteHeight = <%% 10, 8, 8, 7, 1.6 %%>;
  quoteWidth = SvgTong.getRatio(SvgTong.stringParsing(svgMaker.doubleQuote(colorChip.green))) * quoteHeight;
  quoteTop = <%% (isMac() ? 7 : 5), (isMac() ? 5 : 3), (isMac() ? 5 : 3), (isMac() ? 5 : 3), isIphone() ? 1.2 : 1.1 %%>;

  titleSize = <%% 21, 17, 17, 15, 3.2 %%>;
  titleWeight = <%% 600, 600, 600, 600, 600 %%>;
  titleMarginLeft = <%% 6, 6, 5, 5, 1.1 %%>;

  photoBlockMarginBottom = <%% 72, 66, 66, 62, 8 %%>;

  garoSliceStart = <%% 5, 5, 5, 5, 5 %%>;
  garoSliceEnd = <%% 10, 10, 10, 10, 9 %%>;
  garoSliceLimit = <%% 17, 17, 17, 17, 17 %%>;

  seroSliceStart = <%% 5, 5, 5, 5, 5 %%>;
  seroSliceEnd = <%% 16, 15, 17, 15, 13 %%>;
  seroSliceLimit = <%% 30, 30, 30, 30, 30 %%>;

  tagTongMarginTop = <%% 11, 11, 10, 8, 1.4 %%>;
  tagTongWidthRatio = <%% 2, 2, 2, 2, 2 %%>;

  tagSize = <%% 12, 10, 10, 9, 2 %%>;
  tagWeight = <%% 500, 500, 500, 500, 500 %%>;

  tagPaddingLeft = <%% 10, 8, 8, 7, 1 %%>;
  tagPaddingTop = <%% (isMac() ? 5 : 6), (isMac() ? 4 : 5), (isMac() ? 4 : 5), (isMac() ? 4 : 5), 0.9 %%>;
  tagPaddingBottom = <%% (isMac() ? 7 : 6), (isMac() ? 6 : 5), (isMac() ? 6 : 5), (isMac() ? 6 : 5), isIphone() ? 1.2 : 1.4 %%>;
  tagMarginRight = <%% 4, 3, 3, 3, 1 %%>;

  subTitleMarginTop = <%% 3, 3, 3, 2, 0.2 %%>;
  subTitleSize = <%% 14, 12, 12, 11, 2.6 %%>;
  subTitleTextTop = <%% (isMac() ? 0 : 1), (isMac() ? 0 : 1), (isMac() ? 0 : 1), (isMac() ? 0 : 0), 0 %%>;

  reviewSubTitleVisual = <%% 1, 1, 1, 0, 0 %%>;

  arrowWidth = <%% 32, 28, 28, 26, 4 %%>;
  arrowHeight = <%% 9, 8, 8, 8, 1.5 %%>;
  arrowBottom = <%% 3, 3, 3, 2, 1 %%>;
  arrowReviewBottom = <%% (isMac() ? 5 : 6), (isMac() ? 4 : 5), (isMac() ? 4 : 5), (isMac() ? 4 : 5), 1.5 %%>;

  baseBlock = baseTong.children[1];

  if (search !== null) {
    cleanChildren(baseBlock);
  }

  if (limitLength !== 0) {
    for (let i = 0; i < limitLength; i++) {
      if (!this.loadedContents.includes(i) || search !== null) {

        ({ contents } = contentsArr[i]);

        if (contents.review.detailInfo.photodae.length > 1) {

          if (desktop) {
            src = FRONTHOST + "/list_image/portp" + contents.portfolio.pid + "/" + photoChar + String(contents.review.detailInfo.photodae[gsArray[i] === 'g' ? 1 : 0]) + contents.portfolio.pid + ".jpg";
          } else {
            src = FRONTHOST + "/list_image/portp" + contents.portfolio.pid + "/mobile/" + photoCharMobile + String(contents.review.detailInfo.photodae[gsArray[i] === 'g' ? 1 : 0]) + contents.portfolio.pid + ".jpg";
          }

          title = contents.review.title.sub.split(", ").join(" ");
          tag = equalJson(JSON.stringify(contents.portfolio.detailInfo.tag));

          if (gsArray[i] !== 'g') {
            tag = tag.slice(garoSliceStart, garoSliceEnd);
            if (tag.reduce((acc, curr) => { return acc + curr.length }, 0) > garoSliceLimit) {
              tag = tag.slice(0, -1);
            }
          } else {
            tag = tag.slice(seroSliceStart, seroSliceEnd);
            if (tag.reduce((acc, curr) => { return acc + curr.length }, 0) > seroSliceLimit) {
              tag = tag.slice(0, -1);
            }
          }

          block = createNode({
            mother: baseBlock,
            attribute: {
              pid: contents.portfolio.pid,
            },
            event: {
              click: function (e) {
                const pid = this.getAttribute("pid");
                selfHref(FRONTHOST + "/revdetail.php?pid=" + pid);
              },
              touchstart: function (e) {
                const self = this;
                self.setAttribute(touchStartConst, "on");
                setQueue(() => {
                  self.setAttribute(touchStartConst, "off");
                });
              },
              touchend: function (e) {
                if (this.getAttribute(touchStartConst) === "on") {
                  const pid = this.getAttribute("pid");
                  selfHref(FRONTHOST + "/revdetail.php?pid=" + pid);
                }
              }
            },
            style: {
              display: "inline-block",
              width: String(gsArray[i] === 'g' ? garoWidth : seroWidth) + ea,
              borderRadius: String(5) + "px",
              marginRight: String(photoMargin) + ea,
              marginBottom: String(photoBlockMarginBottom) + ea,
              verticalAlign: "top",
              overflow: "hidden",
              cursor: "pointer",
            },
            children: [
              {
                style: {
                  display: "block",
                  width: String(gsArray[i] === 'g' ? garoWidth : seroWidth) + ea,
                  height: String(photoHeight) + ea,
                  borderRadius: String(5) + "px",
                  marginBottom: String(photoMarginBottom) + ea,
                  backgroundSize: "100% auto",
                  backgroundPosition: "50% 50%",
                  backgroundImage: "url('" + src + "')",
                }
              },
              {
                style: {
                  display: "block",
                  position: "relative",
                  width: String(100) + '%',
                },
                children: [
                  {
                    mode: "svg",
                    source: svgMaker.doubleQuote(colorChip.green),
                    style: {
                      display: "inline-block",
                      height: String(quoteHeight) + ea,
                      width: String(quoteWidth) + ea,
                      verticalAlign: "top",
                      position: "relative",
                      top: String(quoteTop) + ea,
                    }
                  },
                  {
                    text: title,
                    style: {
                      display: "inline-block",
                      fontSize: String(titleSize) + ea,
                      fontWeight: String(titleWeight),
                      color: colorChip.black,
                      marginLeft: String(titleMarginLeft) + ea,
                      width: withOut(quoteWidth + titleMarginLeft, ea),
                      verticalAlign: "top",
                    }
                  }
                ]
              },
              {
                style: {
                  display: "block",
                  position: "relative",
                  marginTop: String(subTitleMarginTop) + ea,
                  paddingLeft: String(quoteWidth + titleMarginLeft + reviewSubTitleVisual) + ea,
                  width: withOut(quoteWidth + titleMarginLeft + reviewSubTitleVisual, ea),
                  left: String(0) + ea,
                },
                children: [
                  {
                    text: contents.portfolio.spaceInfo.space + " " + String(contents.portfolio.spaceInfo.pyeong) + "py " + (desktop ? "홈스타일링 후기" : "후기"),
                    style: {
                      display: "inline-block",
                      position: "relative",
                      top: String(subTitleTextTop) + ea,
                      fontSize: String(subTitleSize) + ea,
                      fontWeight: String(titleWeight),
                      color: colorChip.gray5,
                    }
                  },
                  {
                    mode: "svg",
                    source: svgMaker.horizontalArrow(arrowWidth, arrowHeight),
                    style: {
                      position: "absolute",
                      width: String(arrowWidth) + ea,
                      right: String(0),
                      bottom: String(arrowReviewBottom) + ea,
                    }
                  }
                ]
              }
            ]
          });


          if (search === null) {
            this.loadedContents.push(i);
          }
        }
      }
    }
  } else {

    for (let i = 0; i < 4; i++) {

      block = createNode({
        mother: baseBlock,
        style: {
          display: "inline-block",
          width: String(seroWidth) + ea,
          borderRadius: String(5) + "px",
          marginRight: String(photoMargin) + ea,
          marginBottom: String(photoBlockMarginBottom) + ea,
          verticalAlign: "top",
          overflow: "hidden",
        },
        children: [
          {
            style: {
              width: String(seroWidth) + ea,
              height: String(photoHeight) + ea,
              borderRadius: String(5) + "px",
              marginBottom: String(photoMarginBottom) + ea,
              background: colorChip.gray2,
            }
          },
          {
            style: {
              display: "block",
              position: "relative",
            },
            children: [
              {
                mode: "svg",
                source: svgMaker.doubleQuote(colorChip.green),
                style: {
                  display: "inline-block",
                  height: String(quoteHeight) + ea,
                  width: String(quoteWidth) + ea,
                  verticalAlign: "top",
                  position: "relative",
                  top: String(quoteTop) + ea,
                }
              },
              {
                text: "-",
                style: {
                  display: "inline-block",
                  fontSize: String(titleSize) + ea,
                  fontWeight: String(titleWeight),
                  color: colorChip.black,
                  marginLeft: String(titleMarginLeft) + ea,
                  verticalAlign: "top",
                }
              }
            ]
          },
          {
            style: {
              display: "block",
              position: "relative",
              marginTop: String(tagTongMarginTop) + ea,
              width: String(tagTongWidthRatio * 100) + '%',
              left: String(0) + ea,
            }
          }
        ]
      });

    }

  }

}

FrontAboutJs.prototype.launching = async function (loading) {
  const instance = this;
  const { returnGet, ajaxJson, setQueue, setDebounce } = GeneralJs;
  try {
    this.mother.setGeneralProperties(this);

    class SearchArray extends Array {
      constructor(arr) {
        super();
        for (let i of arr) {
          this.push(i);
        }
      }
      search(target, value) {
        let obj = null;
        for (let i of this) {
          if (i[target] === value) {
            obj = i;
          }
        }
        return obj;
      }
      toNormal() {
        let arr = [];
        for (let i of this) {
          arr.push(i);
        }
        return arr;
      }
    }

    const getObj = returnGet();
    let response;

    response = await ajaxJson({ mode: "review", limit: 42 }, LOGHOST + "/getContents", { equal: true });
    this.contentsArr = new SearchArray(response.contentsArr);
    this.designers = new SearchArray(response.designers);
    this.fullLoad = false;
    this.photoLoad = false;
    this.loadedContents = [];

    await this.mother.ghostClientLaunching({
      mode: "front",
      name: "frontAbout",
      client: null,
      base: {
        instance: this,
        binaryPath: FrontAboutJs.binaryPath,
        subTitle: "홈리에종 서비스 설명",
        secondBackground: false,
        backgroundType: 1,
      },
      local: async () => {
        try {
          instance.insertInitBox();
          instance.insertFirstService();
          instance.insertSecondService();
          instance.insertThirdService();
          instance.insertFourthService();
          instance.insertConsultingBox();
        } catch (e) {
          await GeneralJs.ajaxJson({ message: "FrontAboutJs.launching.ghostClientLaunching : " + e.message }, "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

  } catch (err) {
    console.log(err);
    await ajaxJson({ message: "FrontAboutJs.launching 에러 일어남 => " + err.message }, "/errorLog");
  }
}
