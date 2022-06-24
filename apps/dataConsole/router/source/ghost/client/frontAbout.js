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
  const { ea, media, totalContents } = this;
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

  whiteBlockMarginBottom = <%% (isMac() ? 133 : 131), (isMac() ? 135 : 135), (isMac() ? 123 : 122), (isMac() ? 102 : 100), 21.5 %%>;

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

  mobileBlockTop = 4.5;

  searchTags = [];

  placeholder = "새아파트";

  serviceButtonClassName = "serviceButton";

  if (mobile) {
    totalContents.children[2].style.height = String(68) + ea;
  }

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
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
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

  mainPaddingTop = <%% (isMac() ? 133 : 131), (isMac() ? 135 : 135), (isMac() ? 103 : 102), (isMac() ? 83 : 82), 11 %%>;
  mainPaddingBottom = <%% (isMac() ? 153 : 151), (isMac() ? 155 : 155), (isMac() ? 118 : 117), (isMac() ? 98 : 97), 14 %%>;

  titleSize = <%% 32, 30, 28, 25, 5 %%>;
  titleWeight = <%% 800, 800, 800, 800, 800 %%>;
  titleLineHeight = <%% 1.4, 1.4, 1.4, 1.4, 1.4 %%>;
  titlePaddingLeft = <%% 24, 24, 24, 24, 3 %%>;
  titleLineTop = <%% (isMac() ? 23 : 18), (isMac() ? 21 : 17), (isMac() ? 20 : 16), (isMac() ? 18 : 14), 3.5 %%>;

  numberTextTop = <%% 5, 5, 4, 3, 0.3 %%>;
  numberSize = <%% 27, 26, 25, 24, 4.5 %%>;
  numberWeight = <%% 700, 700, 700, 700, 700 %%>;
  numberLineHeight = <%% 1.4, 1.4, 1.4, 1.4, 1.4 %%>;

  contentsAreaMarginTop = <%% 45, 40, 34, 28, 6 %%>;

  contentsSize = <%% 16, 15, 14, 13, 3.5 %%>;
  contentsWeight = <%% 400, 400, 400, 400, 400 %%>;
  contentsBoldWeight = <%% 700, 700, 700, 700, 700 %%>;
  contentsLineHeight = <%% 1.66, 1.66, 1.66, 1.66, 1.66 %%>;

  width0 = <%% 172, 141, 132, 117, 33 %%>;
  width1 = <%% 418, 339, 319, 248, 55 %%>;
  width2 = <%% 810, 570, 449, 354, 88 %%>;

  imageHeight = <%% 390, 320, 296, 258, 39 %%>;

  buttonHeight = <%% 36, 36, 34, 30, 7.5 %%>;
  buttonWidth = <%% 130, 130, 130, 120, 30 %%>;
  buttonTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), 0 %%>;
  buttonSize = <%% 13, 13, 13, 12, 3 %%>;
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
        (big ? "홈리에종은 홈스타일링 컨시어지 서비스를" : "홈리에종은 홈스타일링 서비스를"),
        (big ? "운영하는 플랫폼입니다. <b%홈리에종에서 디자이너를" : "운영하는 플랫폼입니다. <b%디자이너를"),
        (big ? "만나 단계별로 제공되는 케어 서비스를 경험해" : "만나 단계별로 제공되는 서비스를 경험해"),
        (big ? "보세요.%b> 상황에 맞는 방법을 찾아 고객님과 함께" : "보세요.%b> 상황에 맞는 방법을 찾아 함께"),
        (big ? "인테리어 디자인을 완성합니다." : "인테리어 디자인을 완성합니다."),
      ],
      [
        (big ? "한 명의 디자이너가 우리집 시공부터" : "한 명의 디자이너가 우리집 시공부터"),
        (big ? "홈스타일링까지, 내 상황에 맞는 홈리에종 케어" : "홈스타일링까지, 내 상황에 맞는 케어"),
        (big ? "서비스를 받아 나만의 집을 완성해보세요!" : "서비스를 받아 집을 완성해보세요!"),
      ]
    ],
    button: [
      "디자이너 큐레이션"
    ],
    image: [
      FrontAboutJs.binaryPath + "/a1.jpg"
    ],
    popup: [
      [
        "홀리에종에서 디자이너를 만나는 방식은",
        "먼저 고객님이 상담 신청서를 통해 기본적인",
        "정보를 남겨주시면, 그에 맞춰 홈리에종이",
        "적합한 <b%디자이너를 추천드리고, 고객님이",
        "추천 받은 디자이너들 중 한 명을 선택함으로써%b>",
        "디자이너 매칭이 성사됩니다.",
      ],
      [
        "매칭된 디자이너는 고객님 현장의 <b%전담",
        "디자이너가 되어 1:1 상담과 함께",
        "집의 완성까지 책임지고%b> 고객님을 리드하게",
        "됩니다.",
      ]
    ]
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
      background: desktop ? colorChip.gray0 : colorChip.gray1,
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
      background: desktop ? colorChip.gray0 : colorChip.gray1,
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
      backgroundPosition: !media[3] ? "50% 41%" : "50% 50%",
      backgroundSize: !media[3] ? "100% auto" : "auto 100%",
      width: String(width2) + ea,
      height: String(imageHeight) + ea,
      borderRadius: String(5) + "px",
      boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
      marginTop: desktop ? "" : String(8.5) + ea,
    }
  });

  createNode({
    mother: contentsArea,
    event: {
      click: instance.aboutPopup(contents),
    },
    style: {
      display: desktop ? "inline-flex" : "none",
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
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
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

  titleSize = <%% 31, 29, 27, 24, 5 %%>;

  titleWeight = <%% 800, 800, 800, 800, 800 %%>;
  titleLineHeight = <%% 1.4, 1.4, 1.4, 1.4, 1.4 %%>;

  numberTextTop = <%% 3, 3, 3, 3, 3 %%>;
  numberSize = <%% 25, 23, 22, 21, 4.5 %%>;
  numberWeight = <%% 700, 700, 700, 700, 700 %%>;
  numberLineHeight = <%% 1.4, 1.4, 1.4, 1.4, 1.4 %%>;

  mainPaddingTop = <%% (isMac() ? 133 : 131), (isMac() ? 135 : 135), (isMac() ? 103 : 102), (isMac() ? 83 : 82), 11 %%>;
  mainPaddingBottom = <%% (isMac() ? 153 : 151), (isMac() ? 155 : 155), (isMac() ? 118 : 117), (isMac() ? 98 : 97), 13 %%>;

  contentsAreaMarginTop = <%% 45, 40, 34, 28, 6 %%>;

  boxBetween = <%% 45, 30, 24, 16, 2 %%>;
  subHorizontalHeight = <%% 40, 30, 24, 20, 30 %%>;
  subHorizontalMargin = <%% 3, 2, 1, 1, 3 %%>;

  boxNumber = desktop ? 5 : 3;

  subSize = <%% 16, 15, 14, 13, 3 %%>;
  subWeight = <%% 600, 600, 600, 600, 600 %%>;
  subBetween = <%% 11, 11, 11, 11, 2 %%>;

  arrowWidth = <%% 12, 10, 8, 6, 2 %%>;

  imageHeight = <%% 244, 186, 161, 131, 186 %%>;
  blankFirstTop = <%% 33, 33, 33, 33, 33 %%>;

  contentsSize = <%% 16, 15, 14, 13, 3.5 %%>;
  contentsWeight = <%% 400, 400, 400, 400, 400 %%>;
  contentsBoldWeight = <%% 700, 700, 700, 700, 700 %%>;
  contentsLineHeight = <%% 1.66, 1.66, 1.66, 1.66, 1.66 %%>;

  buttonHeight = <%% 36, 36, 34, 30, 36 %%>;
  buttonWidth = <%% 110, 110, 110, 100, 110 %%>;
  buttonTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), 0 %%>;
  buttonSize = <%% 13, 13, 13, 12, 3 %%>;
  buttonWeight = <%% 700, 700, 700, 700, 700 %%>;
  buttonLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;

  contentsVisualTextTop = <%% 5, 5, 5, 5, 5 %%>;

  contents = {
    main: [
      "구체적으로 어떻게 진행되나요?",
    ],
    sub: [
      "상담 신청서 작성",
      "현장 미팅",
      "기획 / 디자인",
      "시공 / 제품 구매",
      "촬영 / 인터뷰",
      "서비스 큐레이션",
      "디자이너 선택",
    ],
    description: [
      [
        (<&& "홈리에종의 프로세스는 일단 먼저," | "홈리에종의 프로세스는 먼저," | "홈리에종의 프로세스는" | "홈리에종의 프로세스는" | "홈리에종의 프로세스는" &&>),
        (<&& "하단 상담 신청서를 작성해주시면," | "상담 신청서를 작성해주시면," | "신청서를 작성해주시면," | "신청서를 작성해주시면," | "신청서를 작성해주시면," &&>),
        (<&& "홈리에종의 친절한 상담과 추천으로" | "홈리에종의 상담과 추천으로" | "홈리에종의 추천으로 가장" | "홈리에종의 추천으로 가장" | "홈리에종의 추천으로 가장" &&>),
        (<&& "<b%나에게 가장 잘 맞는 디자이너를%b>" | "<b%나에게 가장 잘 맞는 디자이너를%b>" | "<b%잘 맞는 디자이너를 만나%b>" | "<b%잘 맞는 디자이너를 만나%b>" | "<b%잘 맞는 디자이너를 만나%b>" &&>),
        (<&& "<b%만나%b> 홈스타일링을 진행하게 됩니다." | "<b%만나%b> 홈스타일링을 진행합니다." | "홈스타일링을 진행합니다." | "홈스타일링을 진행합니다." | "홈스타일링을 진행합니다." &&>),
      ],
      [
        (<&& "고객님과 매칭된 디자이너는" | "고객님과 매칭된 디자이너는" | "매칭된 디자이너는" | "매칭된 디자이너는" | "매칭된 디자이너는" &&>),
        (<&& "<b%일단 기획과 디자인을 선행한 후," | "<b%일단 기획과 디자인을 선행한 후" | "<b%기획과 디자인을 선행한 후" | "<b%기획과 디자인을 선행한 후" | "<b%기획과 디자인을 선행한 후" &&>),
        (<&& "시공 견적을 내고 제품 제안을 진행%b>" | "견적을 내고 제품 제안을 진행%b>" | "견적을 내고 제품 제안을%b>" | "견적을 내고 제품 제안을%b>" | "견적을 내고 제품 제안을%b>" &&>),
        (<&& "하게 됩니다. 그리고 세팅에 관여하여" | "하게 됩니다. 그리고 세팅에 관여" | "하며, 세팅에 관여하여" | "하며, 세팅에 관여하여" | "하며, 세팅에 관여하여" &&>),
        (<&& "인테리어 프로세스를 완성하게 됩니다." | "하여 프로세스를 완성하게 됩니다." | "프로세스를 완성합니다." | "프로세스를 완성합니다." | "프로세스를 완성합니다." &&>),
      ]
    ],
    button: [
      "디자인비 결제"
    ],
    popup: [
      [
        "홈리에종의 프로세스는 디자이너와 1:1로 만나",
        "인테리어의 전반적인 과정을 같이 진행하는",
        "형식이기 때문에 <b%시공비, 구매비와는 별도로 디자인비가",
        "발생%b>합니다. 시점은 디자이너 선택 후 디자인비를",
        "결제 하시게 되며, 디자인비를 결제 해주셔야 현장 미팅이 가능합니다.",
      ],
      [
        "결제해주신 디자인비는 홈리에종이 가지고 있다가 <b%인테리어 현장이 잘 끝나면",
        "디자이너에게 정산하는 형식%b>으로 고객님께 안전한 서비스를 제공합니다.",
      ]
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

  if (mobile) {
    contents.sub.splice(1, 0, contents.sub.pop())
    contents.sub.splice(1, 0, contents.sub.pop())
    contents.image.splice(1, 0, contents.image.pop())
    contents.image.splice(1, 0, contents.image.pop())
  }


  baseTongClone = this.baseTong.cloneNode(false);
  this.baseTong.parentNode.appendChild(baseTongClone);

  baseTongClone.style.width = String(100) + '%';
  baseTongClone.style.left = String(0);
  baseTongClone.style.paddingTop = "";
  baseTongClone.style.background = desktop ? colorChip.gray1 : colorChip.gray2;

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

  if (desktop) {
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
              event: {
                click: instance.aboutPopup(contents),
              },
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

  } else {

    for (let i = 0; i < contents.sub.length; i++) {

      baseBox = createNode({
        mother: contentsArea,
        attribute: { index: String(i), },
        style: {
          display: "inline-block",
          width: "calc(calc(100% - " + String(boxBetween * (boxNumber - 1)) + ea + ") / " + String(boxNumber) + ")",
          verticalAlign: "top",
          marginRight: String(i % boxNumber === boxNumber - 1 ? 0 : boxBetween) + ea,
          marginBottom: String(i !== contents.sub.length - 1 ? 5.4 : 0) + ea,
        }
      });
      createNode({
        mother: baseBox,
        style: {
          display: "block",
          position: "relative",
        },
        children: [
          {
            text: String(i + 1) + ". " + contents.sub[i],
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
              src: contents.image[i],
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

    }

    baseBox = createNode({
      mother: contentsArea,
      style: {
        display: "inline-block",
        width: "calc(calc(calc(calc(calc(100% - " + String(boxBetween * (boxNumber - 1)) + ea + ") / " + String(boxNumber) + ") * 2) + " + String(boxBetween) + ea + ") - " + String(6) + ea + ")",
        verticalAlign: "top",
        paddingTop: String(5) + ea,
        paddingLeft: String(6) + ea,
      },
      children: [
        {
          text: contents.description.map((arr) => { return arr.join(" ") })[0],
          style: {
            fontSize: String(contentsSize) + ea,
            fontWeight: String(contentsWeight),
            color: colorChip.black,
            lineHeight: String(contentsLineHeight),
          },
          bold: {
            fontWeight: String(contentsBoldWeight),
            color: colorChip.black,
          }
        }
      ]
    });

  }

}

FrontAboutJs.prototype.insertThirdService = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics } = GeneralJs;
  const { ea, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
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

  mainPaddingTop = <%% (isMac() ? 133 : 131), (isMac() ? 135 : 135), (isMac() ? 103 : 102), (isMac() ? 83 : 82), 11 %%>;
  mainPaddingBottom = <%% (isMac() ? 153 : 151), (isMac() ? 155 : 155), (isMac() ? 118 : 117), (isMac() ? 98 : 97), 13 %%>;

  titleSize = <%% 32, 30, 28, 25, 5 %%>;
  titleWeight = <%% 800, 800, 800, 800, 800 %%>;
  titleLineHeight = <%% 1.4, 1.4, 1.4, 1.4, 1.4 %%>;
  titlePaddingLeft = <%% 24, 24, 24, 24, 3 %%>;
  titleLineTop = <%% (isMac() ? 23 : 18), (isMac() ? 21 : 17), (isMac() ? 20 : 16), (isMac() ? 18 : 14), 3.5 %%>;
  titlePaddingRight = <%% 69, 69, 61, 52, 0 %%>;
  numberTextTop = <%% 5, 5, 4, 3, 0.3 %%>;
  numberSize = <%% 27, 26, 25, 24, 4.5 %%>;
  numberWeight = <%% 700, 700, 700, 700, 700 %%>;
  numberLineHeight = <%% 1.4, 1.4, 1.4, 1.4, 1.4 %%>;

  contentsAreaMarginTop = <%% 45, 40, 34, 28, 7 %%>;

  contentsSize = <%% 16, 15, 14, 13, 3.5 %%>;
  contentsWeight = <%% 400, 400, 400, 400, 400 %%>;
  contentsBoldWeight = <%% 700, 700, 700, 700, 700 %%>;
  contentsLineHeight = <%% 1.66, 1.66, 1.66, 1.66, 1.66 %%>;

  width0 = <%% 172, 133, 127, 85, 33 %%>;
  width1 = <%% 310, 292, 272, 240, 55 %%>;
  width2 = <%% 810, 570, 449, 354, 88 %%>;

  width1MarginLeft = <%% 108, 52, 52, 41, 0 %%>;

  imageHeight = <%% 390, 320, 296, 258, 39 %%>;

  buttonHeight = <%% 36, 36, 34, 30, 36 %%>;
  buttonWidth = <%% 130, 130, 130, 120, 130 %%>;
  buttonTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), 0 %%>;
  buttonSize = <%% 13, 13, 13, 12, 3 %%>;
  buttonWeight = <%% 700, 700, 700, 700, 700 %%>;
  buttonLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;
  buttonLeft = <%% 1090, 755, 628, 481, 755 %%>;

  contents = {
    main: [
      "예산과 기간은",
      "어떻게 설정하나요?",
    ],
    sub: [
      !media[3] ? "고객 준비 사항" : "준비 사항"
    ],
    description: [
      [
        (big ? "나에게 맞는 효율적이고 합리적인 예산 활용을 위해" : "효율적이고 합리적인 예산 활용을 위해"),
        (desktop ? "전체적인 예산에 대한 고민이 선행되어야 합니다." : "예산에 대한 고민이 선행되어야 합니다."),
        (desktop ? "사용 가능한 전체 예산을 정하는 것은 디자이너가" : "전체 예산을 정하는 것은 디자이너가"),
        (desktop ? "임의로 설정할 수 없으므로, <b%최대 최소 예산의" : "임의로 설정할 수 없으므로, <b%최대 예산의"),
        (desktop ? "범위를 고객님께서 직접 정해주시고, 디자이너와" : "범위를 고객님께서 정해주시고, 디자"),
        (desktop ? "상담을 시작%b>하시면 됩니다." : "이너와 상담을 시작%b>하시면 됩니다."),
      ],
      [
        (desktop ? "* 가전을 위한 금액은 전체 예산에서 별도로 구분" : "* 가전을 위한 금액은 전체 예산에서"),
        (desktop ? "하셔야 합니다." : "별도로 구분하셔야 합니다."),
      ]
    ],
    button: [
      "예산의 3가지 구성"
    ],
    popup: [
      [
        "인테리어를 하는 데에 있어 예산을 3가지로 나누어",
        "진행해주셔야 합니다. <b%1. 인테리어 시공 비용과 2. 제품 구매 비용",
        "3. 가전 및 생활 용품 비용%b>으로",
        "나누어서 예산을 설정해 주시면 디자이너는",
        "1번과 2번 예산에 맞추어 시공 정도를 조정해드리고",
        "제품 선택을 리드해드립니다.",
      ],
      [
        "가전과 생활 용품은 디자이너의 제공 범위를",
        "넘어서는 범위로, 고객님께서 별도로 생각하시어",
        "진행해주시면 됩니다.",
      ]
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
      background: desktop ? colorChip.gray0 : colorChip.gray1,
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
      background: desktop ? colorChip.gray0 : colorChip.gray1,
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
      backgroundPosition: !media[3] ? "50% 41%" : "50% 50%",
      backgroundSize: !media[3] ? "100% auto" : "auto 100%",
      width: String(width2) + ea,
      height: String(imageHeight) + ea,
      borderRadius: String(5) + "px",
      boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
      marginBottom: desktop ? "" : String(8) + ea,
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
    event: {
      click: instance.aboutPopup(contents),
    },
    style: {
      display: desktop ? "inline-flex" : "none",
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
  const { withOut, returnGet, createNode, createNodes, colorChip, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, blankHref } = GeneralJs;
  const { ea, media, standardWidth } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
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
  let serviceBox0, serviceBox1, reviewBox;
  let innerPadding;
  let imageWidthRatio;
  let wordingBetween;
  let imageBetween;
  let imageHeight;
  let serviceBox;
  let contentsSize;
  let contentsWeight;
  let contentsBoldWeight;
  let contentsLineHeight;
  let subSize, subWeight;
  let subNumberSize, subNumberWeight;
  let reviewTong;
  let photoMargin;
  let photoNumber, reviewTitleSize;
  let reviewTitleMarginTop, reviewTitleMarginBottom;
  let moreBox;
  let moreBoxHeight, moreBoxMarginBottom;
  let moreSize, moreWeight, moreBetween;
  let moreArrowWidth, moreArrowHeight;
  let paddingBottomVisual, paddingTopVisual;
  let imageWidth;
  let plusMarginLeft;
  let image;
  let plusFontSize, plusFontTopMinus, plusFontLeftVisual;
  let imageBlockBetween;

  titleSize = <%% 31, 29, 27, 24, 5 %%>;
  titleWeight = <%% 800, 800, 800, 800, 800 %%>;
  titleLineHeight = <%% 1.4, 1.4, 1.4, 1.4, 1.4 %%>;

  numberTextTop = <%% 3, 3, 3, 3, 3 %%>;
  numberSize = <%% 25, 23, 22, 21, 4.5 %%>;
  numberWeight = <%% 700, 700, 700, 700, 700 %%>;
  numberLineHeight = <%% 1.4, 1.4, 1.4, 1.4, 1.4 %%>;

  contentsAreaMarginTop = <%% 45, 40, 34, 28, 6 %%>;

  mainPaddingTop = <%% (isMac() ? 133 : 131), (isMac() ? 135 : 135), (isMac() ? 103 : 102), (isMac() ? 83 : 82), 11 %%>;
  mainPaddingBottom = <%% (isMac() ? 153 : 151), (isMac() ? 155 : 155), (isMac() ? 118 : 117), (isMac() ? 98 : 97), 15 %%>;

  innerPadding = <%% 60, 50, 45, 40, 6 %%>;

  imageWidthRatio = <%% 0.5, 0.5, 0.5, 0.5, 1 %%>;

  wordingBetween = <%% 15, 15, 15, 14, 2.5 %%>;
  imageBetween = <%% 56, 52, 52, 42, 7 %%>;
  imageBlockBetween = <%% 60, 56, 56, 48, 7 %%>;
  imageWidth = <%% 810, 570, 449, 354, 88 %%>;
  imageHeight = <%% 390, 320, 296, 258, 39 %%>;

  contentsSize = <%% 16, 15, 14, 13, 3.5 %%>;
  contentsWeight = <%% 400, 400, 400, 400, 400 %%>;
  contentsBoldWeight = <%% 700, 700, 700, 700, 700 %%>;
  contentsLineHeight = <%% 1.66, 1.66, 1.66, 1.66, 1.66 %%>;

  subSize = <%% 22, 21, 19, 17, 4.5 %%>;
  subWeight = <%% 700, 700, 700, 700, 700 %%>;

  subNumberSize = <%% 18, 17, 16, 15, 3 %%>;
  subNumberWeight = <%% 200, 200, 200, 200, 200 %%>;

  photoMargin = <%% 20, 18, 18, 16, 3 %%>;
  photoNumber = <%% 7, 7, 5, 5, 7 %%>;
  reviewTitleSize = <%% 24, 22, 21, 20, 4.5 %%>;
  reviewTitleMarginTop = <%% 80, 80, 70, 60, 12 %%>;
  reviewTitleMarginBottom = <%% 32, 32, 32, 32, 4.5 %%>;

  moreBoxHeight = <%% 15, 15, 15, 15, 3 %%>;
  moreBoxMarginBottom = <%% 21, 21, 21, 21, 4.5 %%>;

  moreSize = <%% 16, 16, 16, 15, 3.5 %%>;
  moreWeight = <%% 700, 700, 700, 700, 700 %%>;
  moreBetween = <%% 10, 10, 10, 10, 1.5 %%>;
  moreArrowWidth = <%% 30, 30, 30, 30, 8 %%>;
  moreArrowHeight = <%% 10, 10, 10, 8, 2 %%>;

  paddingTopVisual = <%% 0, 0, 0, 0, 0.3 %%>;
  paddingBottomVisual = <%% 3, 3, 2, 1, 1 %%>;

  plusMarginLeft = <%% 108, 100, 100, 100, 12 %%>;
  plusFontTopMinus = <%% 100, 100, 100, 100, 100 %%>;
  plusFontLeftVisual = <%% 4, 4, 4, 4, 4 %%>;
  plusFontSize = <%% 115, 115, 115, 115, 115 %%>;

  contents = {
    main: [
      "홈리에종의 이점은 무엇인가요?",
    ],
    sub: [
      "홈스타일링 플랫폼",
      "<b%+%b> 프로젝트 케어",
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
          big ? "있도록 전 인테리어 과정을 케어하고 인프라를 지원합니다." : "있도록 전 과정을 케어하고 인프라를 지원합니다.",
        ],
        [
          big ? "홈리에종은 고객과 디자이너를 위해 있기에, <b%중재와 보증" : "홈리에종은 고객과 디자이너를 위해 있기에, <b%중재와",
          big ? "시공 인프라 지원, 다양한 부가 서비스 제공 등을 통해" : "보증 인프라 지원, 다양한 부가 서비스 제공 등을 통해",
          big ? "프로젝트 중심의 새로운 인테리어 문화%b>를 선도합니다." : "프로젝트 중심의 새로운 인테리어 문화%b>를 선도합니다.",
        ]
      ]
    ],
    button: [],
    image: [
      FrontAboutJs.binaryPath + "/c2.jpg",
      FrontAboutJs.binaryPath + "/c3.jpg",
    ]
  };

  baseTongClone = this.baseTong.cloneNode(false);
  this.baseTong.parentNode.appendChild(baseTongClone);

  baseTongClone.style.width = String(100) + '%';
  baseTongClone.style.left = String(0);
  baseTongClone.style.paddingTop = "";
  baseTongClone.style.background = colorChip.white;

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
      paddingTop: String(innerPadding + paddingTopVisual) + ea,
      paddingBottom: String(innerPadding + paddingBottomVisual) + ea,
    }
  });

  serviceBox = createNodes([
    {
      mother: contentsArea,
      style: {
        display: "block",
        position: "relative",
        width: withOut(0),
      }
    },
    {
      mother: contentsArea,
      style: {
        display: "block",
        position: "relative",
        width: withOut(0),
        marginTop: String(imageBlockBetween) + ea,
      }
    }
  ]);

  for (let i = 0; i < serviceBox.length; i++) {
    image = createNode({
      mother: serviceBox[i],
      style: {
        display: "inline-block",
        position: "relative",
        borderRadius: String(5) + "px",
        width: String(imageWidth) + ea,
        height: String(imageHeight) + ea,
        backgroundImage: "url('" + contents.image[i] +  "')",
        backgroundSize: "100% auto",
        backgroundPosition: "50% 50%",
        verticalAlign: "top",
        marginLeft: (i !== 0 ? String(plusMarginLeft) + ea : ""),
      }
    });

    if (i !== 0) {
      createNode({
        mother: image,
        text: '+',
        style: {
          position: "absolute",
          top: withOut(50, plusFontTopMinus, ea),
          left: String(-1 * (plusMarginLeft + plusFontLeftVisual)) + ea,
          fontSize: String(plusFontSize) + ea,
          fontFamily: "graphik",
          fontWeight: String(500),
          color: colorChip.green,
        }
      });
    }

    createNode({
      mother: serviceBox[i],
      style: {
        display: desktop ? "inline-flex" : "flex",
        position: "relative",
        paddingLeft: desktop ? String(imageBetween) + ea : "",
        width: withOut(imageWidth + imageBetween + (i !== 0 ? plusMarginLeft : 0), ea),
        height: desktop ? String(imageHeight) + ea : "",
        verticalAlign: "top",
        flexDirection: "column-reverse",
        textAlign: desktop ? "left" : "center",
        marginTop: desktop ? "" : String(reviewTitleMarginBottom) + ea,
      },
      children: [
        {
          text: contents.description[i][1].join("\n"),
          style: {
            display: "block",
            position: "relative",
            fontSize: String(contentsSize) + ea,
            fontWeight: String(contentsWeight),
            lineHeight: String(contentsLineHeight),
            color: colorChip.black,
          },
          bold: {
            fontWeight: String(contentsBoldWeight),
            color: colorChip.black,
          }
        },
        {
          text: contents.description[i][0].join("\n"),
          style: {
            display: "block",
            position: "relative",
            fontSize: String(contentsSize) + ea,
            fontWeight: String(contentsWeight),
            lineHeight: String(contentsLineHeight),
            color: colorChip.black,
            marginBottom: String(wordingBetween) + ea,
          }
        },
        {
          text: contents.sub[i],
          style: {
            display: "block",
            position: "relative",
            fontSize: String(subSize) + ea,
            fontWeight: String(subWeight),
            color: colorChip.black,
            marginBottom: String(wordingBetween) + ea,
          },
          bold: {
            fontSize: String(subSize) + ea,
            fontWeight: String(800),
            color: colorChip.green,
          }
        },
        {
          text: "4-" + String(i + 1),
          style: {
            display: desktop ? "block" : "none",
            fontSize: String(subNumberSize) + ea,
            fontWeight: String(subNumberWeight),
            color: colorChip.green,
            position: "absolute",
            top: String(0),
            right: String(0),
          }
        }
      ]
    });
  }

}

FrontAboutJs.prototype.insertFifthService = function () {
  const instance = this;
  const { withOut, returnGet, createNode, createNodes, colorChip, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, blankHref } = GeneralJs;
  const { ea, media, standardWidth } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
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
  let serviceBox0, serviceBox1, reviewBox;
  let innerPadding;
  let imageWidthRatio;
  let wordingBetween;
  let imageBetween;
  let imageHeight;
  let serviceBox;
  let contentsSize;
  let contentsWeight;
  let contentsBoldWeight;
  let contentsLineHeight;
  let subSize, subWeight;
  let subNumberSize, subNumberWeight;
  let reviewTong;
  let photoMargin;
  let photoNumber, reviewTitleSize;
  let reviewTitleMarginTop, reviewTitleMarginBottom;
  let moreBox;
  let moreBoxHeight, moreBoxMarginBottom;
  let moreSize, moreWeight, moreBetween;
  let moreArrowWidth, moreArrowHeight;
  let paddingBottomVisual, paddingTopVisual;
  let buttonBox;
  let buttonWidth;
  let buttonHeight;
  let buttonSize;
  let buttonWeight;
  let buttonTextTop;
  let buttonBoxMarginTop;
  let buttonBoxMarginBottom;

  titleSize = <%% 31, 29, 27, 24, 5 %%>;
  titleWeight = <%% 800, 800, 800, 800, 800 %%>;
  titleLineHeight = <%% 1.4, 1.4, 1.4, 1.4, 1.4 %%>;

  numberTextTop = <%% 3, 3, 3, 3, 3 %%>;
  numberSize = <%% 25, 23, 22, 21, 4.5 %%>;
  numberWeight = <%% 700, 700, 700, 700, 700 %%>;
  numberLineHeight = <%% 1.4, 1.4, 1.4, 1.4, 1.4 %%>;

  contentsAreaMarginTop = <%% 45, 40, 34, 28, 6 %%>;

  mainPaddingTop = <%% (isMac() ? 133 : 131), (isMac() ? 135 : 135), (isMac() ? 103 : 102), (isMac() ? 83 : 82), 11 %%>;
  mainPaddingBottom = <%% (isMac() ? 153 : 151), (isMac() ? 155 : 155), (isMac() ? 118 : 117), (isMac() ? 98 : 97), 21 %%>;

  innerPadding = <%% 60, 50, 45, 40, 6 %%>;

  imageWidthRatio = <%% 0.5, 0.5, 0.5, 0.5, 1 %%>;

  wordingBetween = <%% 15, 15, 15, 14, 2.5 %%>;
  imageBetween = <%% 40, 36, 36, 30, 7 %%>;
  imageHeight = <%% 330, 270, 250, 210, 36 %%>;

  contentsSize = <%% 16, 15, 14, 13, 3.5 %%>;
  contentsWeight = <%% 400, 400, 400, 400, 400 %%>;
  contentsBoldWeight = <%% 700, 700, 700, 700, 700 %%>;
  contentsLineHeight = <%% 1.66, 1.66, 1.66, 1.66, 1.66 %%>;

  subSize = <%% 22, 21, 19, 17, 4.5 %%>;
  subWeight = <%% 700, 700, 700, 700, 700 %%>;

  subNumberSize = <%% 18, 17, 16, 15, 3 %%>;
  subNumberWeight = <%% 200, 200, 200, 200, 200 %%>;

  photoMargin = <%% 20, 18, 18, 16, 3 %%>;
  photoNumber = <%% 7, 7, 5, 5, 7 %%>;
  reviewTitleSize = <%% 24, 22, 21, 20, 4.5 %%>;
  reviewTitleMarginTop = <%% 80, 80, 70, 60, 12 %%>;
  reviewTitleMarginBottom = <%% 32, 32, 32, 32, 4.5 %%>;

  moreBoxHeight = <%% 15, 15, 15, 15, 3 %%>;
  moreBoxMarginBottom = <%% 21, 21, 21, 21, 4.5 %%>;

  moreSize = <%% 16, 16, 16, 15, 3.5 %%>;
  moreWeight = <%% 700, 700, 700, 700, 700 %%>;
  moreBetween = <%% 10, 10, 10, 10, 1.5 %%>;
  moreArrowWidth = <%% 30, 30, 30, 30, 8 %%>;
  moreArrowHeight = <%% 10, 10, 10, 8, 2 %%>;

  paddingTopVisual = <%% 0, 0, 0, 0, 0.3 %%>;
  paddingBottomVisual = <%% 3, 3, 2, 1, 1 %%>;

  buttonWidth = <%% 135, 135, 135, 135, 135 %%>;
  buttonHeight = <%% 50, 50, 50, 50, 50 %%>;
  buttonSize = <%% 19, 19, 19, 19, 19 %%>;
  buttonWeight = <%% 700, 700, 700, 700, 700 %%>;
  buttonTextTop = <%% -2, -2, -2, -2, -2 %%>;
  buttonBoxMarginTop = <%% 40, 40, 40, 40, 40 %%>;
  buttonBoxMarginBottom = <%% 42, 42, 42, 42, 42 %%>;

  contents = {
    main: [
      "솔직한 고객 후기",
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
          big ? "있도록 전 인테리어 과정을 케어하고 인프라를 지원합니다." : "있도록 전 과정을 케어하고 인프라를 지원합니다.",
        ],
        [
          big ? "홈리에종은 고객과 디자이너를 위해 있기에, <b%중재와 보증" : "홈리에종은 고객과 디자이너를 위해 있기에, <b%중재와",
          big ? "시공 인프라 지원, 다양한 부가 서비스 제공 등을 통해" : "보증 인프라 지원, 다양한 부가 서비스 제공 등을 통해",
          big ? "프로젝트 중심의 새로운 인테리어 문화%b>를 선도합니다." : "프로젝트 중심의 새로운 인테리어 문화%b>를 선도합니다.",
        ]
      ]
    ],
    button: [],
    image: [
      FrontAboutJs.binaryPath + "/c2.jpg",
      FrontAboutJs.binaryPath + "/c3.jpg",
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
    text: "05",
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
      paddingTop: String(innerPadding + paddingTopVisual) + ea,
      paddingBottom: String(innerPadding + paddingBottomVisual) + ea,
    }
  });

  reviewBox = createNode({
    mother: contentsArea,
    style: {
      display: "block",
      position: "relative",
      width: withOut(innerPadding + innerPadding - photoMargin, ea),
      marginLeft: String(innerPadding) + ea,
    }
  });
  reviewTong = createNode({
    mother: reviewBox,
    style: {
      display: "block",
      width: withOut(0, ea),
      position: "relative",
    }
  });
  this.reviewTong = reviewTong;
  this.portfolioBlock(photoNumber, null);

  moreBox = createNode({
    mother: reviewTong,
    event: {
      click: function (e) {
        blankHref(FRONTHOST + "/review.php");
      }
    },
    style: {
      display: "flex",
      position: "relative",
      width: withOut(0, ea),
      height: String(moreBoxHeight) + ea,
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      flexDirection: "row",
      marginBottom: String(moreBoxMarginBottom) + ea,
    },
    children: [
      {
        text: "더보기",
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(moreSize) + ea,
          fontWeight: String(moreWeight),
          color: colorChip.black,
          marginRight: String(moreBetween) + ea,
          cursor: "pointer",
        }
      },
      {
        mode: "svg",
        source: svgMaker.horizontalArrow(moreArrowWidth, moreArrowHeight, colorChip.green),
        style: {
          display: "inline-block",
          position: "relative",
          width: String(moreArrowWidth) + ea,
          height: String(moreArrowHeight) + ea,
          cursor: "pointer",
        }
      }
    ]
  });

  buttonBox = createNode({
    mother: mainBlock,
    style: {
      display: "flex",
      position: "relative",
      width: String(100) + '%',
      height: String(buttonHeight) + ea,
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      marginTop: String(buttonBoxMarginTop) + ea,
      marginBottom: String(buttonBoxMarginBottom) + ea,
    },
    children: [
      {
        event: {
          click: instance.mother.consultingPopup(),
        },
        style: {
          display: "inline-flex",
          position: "relative",
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
            text: "서비스 신청",
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(buttonSize) + ea,
              fontWeight: String(buttonWeight),
              color: colorChip.white,
              top: String(buttonTextTop) + ea,
            }
          }
        ]
      }
    ]
  })

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

  baseWidth = <%% 1280, 950, 810, 640, 76 %%>;
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

  titleSize = <%% 20, 16, 16, 14, 3 %%>;
  titleWeight = <%% 600, 600, 600, 600, 600 %%>;
  titleMarginLeft = <%% 6, 6, 5, 5, 1.1 %%>;

  photoBlockMarginBottom = <%% 72, 66, 64, 52, 8 %%>;

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
  subTitleSize = <%% 14, 11, 12, 11, 2.6 %%>;
  subTitleTextTop = <%% (isMac() ? 0 : 1), (isMac() ? 0 : 1), (isMac() ? 0 : 1), (isMac() ? 0 : 0), 0 %%>;

  reviewSubTitleVisual = <%% 1, 1, 1, 0, 0 %%>;

  arrowWidth = <%% 32, 24, 24, 22, 4 %%>;
  arrowHeight = <%% 9, 8, 8, 8, 1.5 %%>;
  arrowBottom = <%% 3, 3, 3, 2, 1 %%>;
  arrowReviewBottom = <%% (isMac() ? 5 : 6), (isMac() ? 4 : 5), (isMac() ? 4 : 5), (isMac() ? 4 : 5), 1.5 %%>;

  baseBlock = this.reviewTong;

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

FrontAboutJs.prototype.aboutPopup = function (contents) {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, ajaxJson } = GeneralJs;
  const { ea, media, standardWidth, totalContents, naviHeight } = this;
  return function (e) {
    const zIndex = 99;
    const aboutPopupClassName = "aboutPopupClassName";
    const { button, popup } = contents;
    let cancelBack, whitePopup;
    let popupWidth, popupHeight;
    let popupHeightRatio;
    let popupHeightMarginTop;
    let innerPadding;
    let innerPaddingTop;
    let titleBox, titleBoxPaddingBottom, titleBoxMarginBottom;
    let titleSize, titleWeight;
    let contentsSize, contentsWeight, contentsLineHeight, contentsBoldWeight;
    let contentsBox;

    popupHeightRatio = 0.84;
    popupHeight = (window.innerHeight - naviHeight) * popupHeightRatio;
    popupHeightMarginTop = ((window.innerHeight - naviHeight) - popupHeight) / 2;
    popupWidth = <%% 600, 600, 600, 600, 600 %%>;
    innerPadding = <%% 50, 50, 40, 40, 50 %%>;
    innerPaddingTop = <%% 40, 40, 30, 30, 40 %%>;

    titleBoxPaddingBottom = <%% 12, 12, 12, 12, 12 %%>;
    titleBoxMarginBottom = <%% 24, 24, 24, 24, 24 %%>;

    titleSize = <%% 22, 22, 21, 20, 22 %%>;
    titleWeight = <%% 600, 600, 600, 600, 600 %%>;

    contentsSize = <%% 15, 15, 14, 13, 15 %%>;
    contentsWeight = <%% 400, 400, 400, 400, 400 %%>;
    contentsLineHeight = <%% 1.66, 1.66, 1.66, 1.66, 1.66 %%>;
    contentsBoldWeight = <%% 700, 700, 700, 700, 700 %%>;

    cancelBack = createNode({
      mother: totalContents,
      class: [ aboutPopupClassName ],
      event: {
        click: function (e) {
          const removeTargets = document.querySelectorAll('.' + aboutPopupClassName);
          for (let dom of removeTargets) {
            dom.remove();
          }
        }
      },
      style: {
        position: "fixed",
        top: String(0),
        left: String(0),
        width: String(100) + '%',
        height: String(100) + '%',
        background: colorChip.black,
        opacity: String(0.4),
        zIndex: String(zIndex),
      }
    });

    whitePopup = createNode({
      mother: totalContents,
      class: [ aboutPopupClassName ],
      style: {
        position: "fixed",
        top: String(naviHeight + popupHeightMarginTop) + ea,
        width: String(popupWidth - (innerPadding * 2)) + ea,
        left: withOut(50, popupWidth / 2, ea),
        background: colorChip.white,
        borderRadius: String(5) + "px",
        boxShadow: "0px 3px 15px -9px " + colorChip.darkShadow,
        zIndex: String(zIndex),
        paddingTop: String(innerPaddingTop) + ea,
        paddingLeft: String(innerPadding) + ea,
        paddingRight: String(innerPadding) + ea,
        paddingBottom: String(innerPadding) + ea,
        transition: "all 0s ease",
        transform: "translateY(20px)",
        opacity: String(0),
      }
    });

    titleBox = createNode({
      mother: whitePopup,
      style: {
        display: "block",
        position: "relative",
        width: withOut(0, ea),
        paddingBottom: String(titleBoxPaddingBottom) + ea,
        marginBottom: String(titleBoxMarginBottom) + ea,
        borderBottom: "1px solid " + colorChip.gray3,
      },
      children: [
        {
          text: button.join(" "),
          style: {
            fontSize: String(titleSize) + ea,
            fontWeight: String(titleWeight),
            color: colorChip.black,
          }
        }
      ]
    });

    contentsBox = createNode({
      mother: whitePopup,
      style: {
        display: "block",
        position: "relative",
        width: withOut(0, ea),
      },
      children: [
        {
          text: popup.map((arr) => { return arr.join(" ") }).join("\n\n"),
          style: {
            fontSize: String(contentsSize) + ea,
            fontWeight: String(contentsWeight),
            color: colorChip.black,
            lineHeight: String(contentsLineHeight),
          },
          bold: {
            fontWeight: String(contentsBoldWeight),
            color: colorChip.green,
          }
        }
      ]
    })

    popupHeight = whitePopup.getBoundingClientRect().height;
    whitePopup.style.top = "calc(calc(50% - " + String(popupHeight / 2) + "px" + ") + " + String(0) + "px" + ")";
    whitePopup.style.animation = "fadeuporiginal 0.3s ease forwards";

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
          instance.insertFifthService();
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
