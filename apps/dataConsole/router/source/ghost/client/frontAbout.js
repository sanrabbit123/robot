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

  whiteBlockMarginBottom = <%% (isMac() ? 133 : 131), (isMac() ? 135 : 135), (isMac() ? 123 : 122), (isMac() ? 102 : 100), 20.5 %%>;

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

  mainPaddingTop = <%% (isMac() ? 133 : 131), (isMac() ? 135 : 135), (isMac() ? 103 : 102), (isMac() ? 83 : 82), 10 %%>;
  mainPaddingBottom = <%% (isMac() ? 153 : 151), (isMac() ? 155 : 155), (isMac() ? 118 : 117), (isMac() ? 98 : 97), 11 %%>;

  titleSize = <%% 32, 30, 28, 25, 5.4 %%>;
  titleWeight = <%% 800, 800, 800, 800, 800 %%>;
  titleLineHeight = <%% 1.4, 1.4, 1.4, 1.4, 1.4 %%>;
  titlePaddingLeft = <%% 24, 24, 24, 24, 3 %%>;
  titleLineTop = <%% (isMac() ? 23 : 18), (isMac() ? 21 : 17), (isMac() ? 20 : 16), (isMac() ? 18 : 14), 3.5 %%>;

  numberTextTop = <%% 5, 5, 4, 3, 0.1 %%>;
  numberSize = <%% 27, 26, 25, 24, 5 %%>;
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

  titleSize = <%% 31, 29, 27, 24, 5.4 %%>;

  titleWeight = <%% 800, 800, 800, 800, 800 %%>;
  titleLineHeight = <%% 1.4, 1.4, 1.4, 1.4, 1.4 %%>;

  numberTextTop = <%% 3, 3, 3, 3, 3 %%>;
  numberSize = <%% 25, 23, 22, 21, 5 %%>;
  numberWeight = <%% 700, 700, 700, 700, 700 %%>;
  numberLineHeight = <%% 1.4, 1.4, 1.4, 1.4, 1.4 %%>;

  mainPaddingTop = <%% (isMac() ? 133 : 131), (isMac() ? 135 : 135), (isMac() ? 103 : 102), (isMac() ? 83 : 82), 10 %%>;
  mainPaddingBottom = <%% (isMac() ? 153 : 151), (isMac() ? 155 : 155), (isMac() ? 118 : 117), (isMac() ? 98 : 97), 11 %%>;

  contentsAreaMarginTop = <%% 45, 40, 34, 28, 6 %%>;

  boxBetween = <%% 45, 30, 24, 16, 2 %%>;
  subHorizontalHeight = <%% 40, 30, 24, 20, 30 %%>;
  subHorizontalMargin = <%% 3, 2, 1, 1, 3 %%>;

  boxNumber = desktop ? 5 : 3;

  subSize = <%% 16, 15, 14, 13, 3 %%>;
  subWeight = <%% 600, 600, 600, 600, 600 %%>;
  subBetween = <%% 11, 11, 11, 11, 11 %%>;

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

  mainPaddingTop = <%% (isMac() ? 133 : 131), (isMac() ? 135 : 135), (isMac() ? 103 : 102), (isMac() ? 83 : 82), 10 %%>;
  mainPaddingBottom = <%% (isMac() ? 153 : 151), (isMac() ? 155 : 155), (isMac() ? 118 : 117), (isMac() ? 98 : 97), 11 %%>;

  titleSize = <%% 32, 30, 28, 25, 5.4 %%>;
  titleWeight = <%% 800, 800, 800, 800, 800 %%>;
  titleLineHeight = <%% 1.4, 1.4, 1.4, 1.4, 1.4 %%>;
  titlePaddingLeft = <%% 24, 24, 24, 24, 3 %%>;
  titleLineTop = <%% (isMac() ? 23 : 18), (isMac() ? 21 : 17), (isMac() ? 20 : 16), (isMac() ? 18 : 14), 3.5 %%>;
  titlePaddingRight = <%% 69, 69, 61, 52, 0 %%>;
  numberTextTop = <%% 5, 5, 4, 3, 0.1 %%>;
  numberSize = <%% 27, 26, 25, 24, 5 %%>;
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
  const { withOut, returnGet, createNode, createNodes, colorChip, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics } = GeneralJs;
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

  titleSize = <%% 31, 29, 27, 24, 4 %%>;
  titleWeight = <%% 800, 800, 800, 800, 800 %%>;
  titleLineHeight = <%% 1.4, 1.4, 1.4, 1.4, 1.4 %%>;

  numberTextTop = <%% 3, 3, 3, 3, 3 %%>;
  numberSize = <%% 25, 23, 22, 21, 25 %%>;
  numberWeight = <%% 700, 700, 700, 700, 700 %%>;
  numberLineHeight = <%% 1.4, 1.4, 1.4, 1.4, 1.4 %%>;

  contentsAreaMarginTop = <%% 45, 40, 34, 28, 4 %%>;

  mainPaddingTop = <%% (isMac() ? 133 : 131), (isMac() ? 135 : 135), (isMac() ? 103 : 102), (isMac() ? 83 : 82), 4 %%>;
  mainPaddingBottom = <%% (isMac() ? 153 : 151), (isMac() ? 155 : 155), (isMac() ? 118 : 117), (isMac() ? 98 : 97), 5 %%>;

  innerPadding = <%% 60, 50, 45, 40, 6 %%>;

  imageWidthRatio = <%% 0.5, 0.5, 0.5, 0.5, 0.5 %%>;

  wordingBetween = <%% 15, 15, 15, 14, 15 %%>;
  imageBetween = <%% 40, 36, 36, 30, 40 %%>;
  imageHeight = <%% 330, 270, 250, 210, 33 %%>;

  contentsSize = <%% 16, 15, 14, 13, 3 %%>;
  contentsWeight = <%% 400, 400, 400, 400, 400 %%>;
  contentsBoldWeight = <%% 700, 700, 700, 700, 700 %%>;
  contentsLineHeight = <%% 1.66, 1.66, 1.66, 1.66, 1.66 %%>;

  subSize = <%% 22, 21, 19, 17, 4 %%>;
  subWeight = <%% 700, 700, 700, 700, 700 %%>;

  subNumberSize = <%% 18, 17, 16, 15, 3 %%>;
  subNumberWeight = <%% 200, 200, 200, 200, 200 %%>;

  photoMargin = <%% 20, 18, 18, 16, 3 %%>;
  photoNumber = <%% 7, 7, 5, 5, 7 %%>;
  reviewTitleSize = <%% 24, 22, 21, 20, 24 %%>;
  reviewTitleMarginTop = <%% 80, 80, 70, 60, 80 %%>;
  reviewTitleMarginBottom = <%% 32, 32, 32, 32, 32 %%>;

  moreBoxHeight = <%% 15, 15, 15, 15, 15 %%>;
  moreBoxMarginBottom = <%% 21, 21, 21, 21, 21 %%>;

  moreSize = <%% 16, 16, 16, 15, 16 %%>;
  moreWeight = <%% 700, 700, 700, 700, 700 %%>;
  moreBetween = <%% 10, 10, 10, 10, 10 %%>;
  moreArrowWidth = <%% 30, 30, 30, 30, 30 %%>;
  moreArrowHeight = <%% 10, 10, 10, 8, 10 %%>;

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
      paddingTop: String(innerPadding) + ea,
      paddingBottom: String(innerPadding) + ea,
    }
  });

  serviceBox = createNodes([
    {
      mother: contentsArea,
      style: {
        display: "block",
        position: "relative",
        width: withOut(innerPadding * 2, ea),
        marginLeft: String(innerPadding) + ea,
      }
    },
    {
      mother: contentsArea,
      style: {
        display: "block",
        position: "relative",
        width: withOut(innerPadding * 2, ea),
        marginLeft: String(innerPadding) + ea,
        marginTop: String(imageBetween) + ea,
      }
    }
  ]);

  for (let i = 0; i < serviceBox.length; i++) {
    createNode({
      mother: serviceBox[i],
      style: {
        display: "inline-block",
        borderRadius: String(5) + "px",
        width: String((standardWidth - (innerPadding * 2)) * imageWidthRatio) + ea,
        height: String(imageHeight) + ea,
        backgroundImage: "url('" + contents.image[i] +  "')",
        backgroundSize: "100% auto",
        backgroundPosition: "50% 50%",
        verticalAlign: "top"
      }
    });
    createNode({
      mother: serviceBox[i],
      style: {
        display: "inline-flex",
        position: "relative",
        paddingLeft: String(imageBetween) + ea,
        width: String(((standardWidth - (innerPadding * 2)) * (1 - imageWidthRatio)) - imageBetween) + ea,
        height: String(imageHeight) + ea,
        verticalAlign: "top",
        flexDirection: "column-reverse"
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
          }
        },
        {
          text: "4-" + String(i + 1),
          style: {
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

  reviewBox = createNode({
    mother: contentsArea,
    style: {
      display: "block",
      position: "relative",
      width: withOut(innerPadding + innerPadding - photoMargin, ea),
      marginLeft: String(innerPadding) + ea,
      marginTop: String(reviewTitleMarginTop) + ea,
    }
  });

  createNode({
    mother: reviewBox,
    text: contents.sub[2],
    style: {
      fontSize: String(reviewTitleSize) + ea,
      fontWeight: String(subWeight),
      color: colorChip.black,
      display: "block",
      width: withOut(0, ea),
      textAlign: "center",
    }
  })

  reviewTong = createNode({
    mother: reviewBox,
    style: {
      display: "block",
      width: withOut(0, ea),
      position: "relative",
      marginTop: String(reviewTitleMarginBottom) + ea,
    }
  });

  this.reviewTong = reviewTong;
  this.portfolioBlock(photoNumber, null);

  moreBox = createNode({
    mother: reviewTong,
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

}

FrontAboutJs.prototype.insertConsultingBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, ajaxJson } = GeneralJs;
  const { ea, media, standardWidth } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const inputClassName = "inputClassName";
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
  let blockHeight, bottomMargin;
  let leftBox, rightBox;
  let titleBox, barBox, indexBox;
  let margin;
  let leftRatio;
  let wordSpacing;
  let titleFont, titleLeft, titleFontWeight;
  let barWidth, barLeft;
  let indexFont, indexFontWeight;
  let doubleQuote;
  let quoteTop, quoteLeft, quoteHeight, quoteWidth, quoteMarginBottom;
  let initWordingSize, initWordingHeight, initWordingWordSpacing;
  let indexNumberBottom;
  let initWording0, initWording1;
  let mobileRightBoxHeight;
  let rightBoxPaddingTop;
  let blockMarginBottom;
  let circleRadius;
  let thisBlock;
  let mainSize;
  let mainWeight;
  let circleTop;
  let circleBetween;
  let grayHeight;
  let grayTop;
  let grayInputTop;
  let moduleHeight;
  let leftGrayType0, leftGrayType1, leftGrayType2, leftGrayType3;
  let widthGrayType0, widthGrayType1, widthGrayType2, widthGrayType3;
  let inputSize, inputWeight;
  let grayBigHeight;
  let secondPointLeft;
  let addressWidth;
  let addressSize, addressWeight;
  let addressTop;
  let inputIndent;
  let grayTextAreaTop;
  let blank;
  let marginRatio;
  let initWordingLineHeight;
  let leftCheck0, leftCheck1;
  let checkboxWidth;
  let checkboxTop;
  let checkboxBetween;
  let checkboxWeight;
  let grayLineWidth;
  let grayLineTop;
  let grayLineBlockTop;
  let grayLineBlockHeight;
  let grayLineBlockWidth0, grayLineBlockWidth1, grayLineBlockWidth2;
  let grayLineBlockFontSize, grayLineBlockFontWeight;
  let grayLineBlockFontTop;
  let grayLineBlockFontRight0, grayLineBlockFontRight1, grayLineBlockFontRight2, grayLineBlockFontRight3;
  let spaceStatusLeft0, spaceStatusLeft1;
  let spaceStatusWeight, spaceStatusBarWeight;
  let spaceStatusBoxLeft0, spaceStatusBoxLeft1, spaceStatusBoxLeft2;
  let spaceStatusBoxTop;
  let spaceStatusBoxFactorSize, spaceStatusBoxFactorWeight, spaceStatusBoxFactorMargin;
  let textareaTop, textareaLeft;
  let checkboxClickEvent0, checkboxClickEvent1, checkboxClickEvent2, checkboxClickEvent3;
  let budgetTriangleTop, budgetTriangleWidth;
  let spaceTriangleTop, spaceTriangleWidth;
  let addressPromptWidth, addressPromptHeight;
  let mainTop, mobileCheckBoxMainTop;
  let addressButtonEvent;
  let mobileRightBoxLeft;
  let mobileTongPaddingTop;
  let mobileFactorPaddingLeft
  let mobileFactorCheckWidth;
  let mobileFactorCheckTop;
  let mobileFactorBetween, mobileFactorBetween2, mobileFactorBetween3;
  let mobileFactorPaddingBotom;
  let mobileCheckBoxLeft1, mobileCheckBoxLeft2, mobileCheckBoxLeft3, mobileCheckBoxLeft4;
  let grayTextAreaWidth;
  let mobileCheckBoxMainSize;
  let phoneHypenEvent;
  let pyeongNumberEvent;
  let pyeongBlurEvent;
  let pyeongFocusEvent;
  let greenNoticeSize, greenNoticeWeight;
  let greenNoticePaddingTop, greenNoticePaddingBottom, greenNoticePaddingLeft;
  let greenNoticeBottom, greenNoticeBottom2;
  let greenNoticeLineHeight;
  let greenNoticeWidth0, greenNoticeWidth1, greenNoticeWidth2;
  let addressBlurEvent;
  let addressFocusEvent;
  let calendarViewEvent;
  let calendarWidth;
  let calendarTop;
  let livingAlertEvent;
  let livingDownEvent;
  let nameBlurEvent;
  let phoneBlurEvent;
  let leftBoxWidth;
  let textAreaBlockHeight;
  let descriptionSize, descriptionWeight, descriptionLineHeight, descriptionMarginTop, descriptionBoldWeight;
  let policyArea;
  let policyAreaMarginTop;
  let policyGrayHeight;
  let policyGrayTextTop;
  let policyGrayTextLeft;
  let policyGrayTextSize;
  let policyTong;
  let agreeTong;
  let agreeTongMarginTop, agreeSize, agreeWeight, agreeLineHeight;
  let agreeCircleRadius, agreeCircleTop, agreeCircleMarginRight;
  let submitTong, submitTongMarginTop;
  let submitButtonWidth, submitButtonHeight;
  let submitSize, submitWeight, submitLineHeight, submitTextTop;

  blockHeight = <%% 784, 765, 725, 710, 176 %%>;
  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 52, 52, 44, 32, 52 %%>;
  leftRatio = <%% 0.32, 0.26, 0.26, 0.26, 0.32 %%>;

  titleFont = <%% 31, 29, 27, 23, 5.7 %%>;
  titleLeft = <%% 6, 6, 6, 6, 0 %%>;

  titleFontWeight = <%% 500, 500, 500, 500, 500 %%>;
  wordSpacing = <%% -3, -3, -3, -3, -2 %%>;

  barWidth = <%% 120, 80, 80, 80, 80 %%>;
  barLeft = <%% 190, titleLeft + 234, titleLeft + 234, titleLeft + 234, titleLeft + 234 %%>;

  indexFont = <%% 19, 19, 19, 19, 19 %%>;
  indexFontWeight = <%% 200, 200, 200, 200, 200 %%>;

  quoteTop = <%% 8, 8, 8, 8, -0.6 %%>;
  quoteHeight = <%% 12, 11, 10, 9, 2.5 %%>;
  quoteMarginBottom = <%% (isMac() ? 7 : 8), (isMac() ? 7 : 8), (isMac() ? 7 : 8), (isMac() ? 6 : 7), 7 %%>;
  quoteLeft = <%% 2, 2, 2, 2, 1.6 %%>;

  initWordingHeight = <%% 20, 20, 20, 20, 9 %%>;
  initWordingSize = <%% 15.5, 15, 14.5, 13.5, 3.5 %%>;
  initWordingWordSpacing = <%% -1, -1, -1, -1, -1 %%>;
  initWordingLineHeight = <%% 9, 9, 9, 9, 9 %%>;

  indexNumberBottom = <%% 3, 4, 6, 4, 0 %%>;

  mobileRightBoxHeight = <%% 78, 78, 78, 78, 78 %%>;

  rightBoxPaddingTop = <%% 136, 126, 116, 108, 25 %%>;
  mobileRightBoxLeft = 7;

  circleRadius = <%% 2.5, 2.5, 2, 2, 0.5 %%>;
  circleTop = <%% 12, 12, 11, 10.5, (isIphone() ? 2.9 : 2.7) %%>;
  circleBetween = <%% 6, 6, 5, 5, 1.3 %%>;

  mainSize = <%% 20, 18, 17, 16, 4 %%>;
  mainWeight = <%% 500, 500, 500, 500, 500 %%>;
  mainTop = <%% (isMac() ? 0 : 3), (isMac() ? 2 : 4), (isMac() ? 2 : 4), (isMac() ? 2 : 4), 0.5 %%>;
  inputSize = <%% 13, 13, 12, 12, 3 %%>;
  inputWeight = <%% 400, 400, 400, 400, 400 %%>;
  inputIndent = <%% 10, 10, 10, 10, 2.5 %%>;

  secondPointLeft = <%% 315, 270, 240, 260, 25 %%>;

  grayTop = <%% 0, 0, 0, 0, 0 %%>;
  grayInputTop = <%% (isMac() ? -1.5 : 0), (isMac() ? -1.5 : 0), (isMac() ? -1.5 : 0), (isMac() ? -1.5 : 0), -0.2 %%>;
  grayHeight = <%% 32, 32, 31, 31, 7 %%>;
  grayBigHeight = <%% 114, 114, 122, 124, 28 %%>;
  grayTextAreaTop = <%% 3, 3, 3, 3, 1.3 %%>;
  grayTextAreaWidth = <%% 51.7, 51.7, 51.7, 390, 51.7 %%>;

  moduleHeight = grayTop + grayHeight;
  blockMarginBottom = <%% 12, 12, 9, 9, 2 %%>;

  leftGrayType0 = <%% 101, 90, 78, 78, 18 %%>;
  leftGrayType1 = <%% 418, 361, 318, 96, 22.8 %%>;
  leftGrayType2 = <%% 125, 112, 98, 98, 15 %%>;
  leftGrayType3 = <%% 164, 151, 130, 129, 30.5 %%>;

  widthGrayType0 = <%% 160, 140, 130, 150, 34 %%>;
  widthGrayType1 = <%% 455, 329, 283, 403, 56.5 %%>;
  widthGrayType2 = <%% 757, 588, 503, 383, 60 %%>;
  widthGrayType3 = <%% 392, 268, 231, 352, 44 %%>;

  addressWidth = <%% 54, 54, 46, 46, 11 %%>;
  addressSize = <%% 13, 13, 12, 12, 3 %%>;
  addressWeight = <%% 600, 600, 600, 600, 600 %%>;
  addressTop = <%% (isMac() ? 5 : 7), (isMac() ? 5 : 7), (isMac() ? 5 : 7), (isMac() ? 5 : 7), 1.2 %%>;

  leftCheck0 = <%% 125, 112, 98, 98, 22.8 %%>;
  leftCheck1 = <%% 195, 176, 156, 152, 36.5 %%>;
  checkboxWidth = <%% 9, 9, 9, 8, 2 %%>;
  checkboxTop = <%% (isMac() ? 9 : 10), (isMac() ? 9 : 9), (isMac() ? 9 : 9), (isMac() ? 9 : 9), (isIphone() ? 2.5 : 2.5) %%>;
  checkboxBetween = <%% 8, 8, 8, 6, 1.5 %%>;
  checkboxWeight = <%% 300, 300, 300, 300, 300 %%>;

  marginRatio = <%% 1.2, 1.2, 1.1, 1.1, 1 %%>;

  grayLineWidth = <%% 772, 600, 523, 523, 523 %%>;
  grayLineTop = <%% 12, 12, 12, 12, 12 %%>;
  grayLineBlockTop = <%% 7, 7, 7, 7, 7 %%>;

  grayLineBlockHeight = <%% 12, 12, 12, 12, 12 %%>;
  grayLineBlockWidth0 = <%% 105, 85, 71, 105, 105 %%>;
  grayLineBlockWidth1 = <%% 92, 72, 63, 92, 92 %%>;
  grayLineBlockWidth2 = <%% 106, 86, 72, 106, 106 %%>;

  grayLineBlockFontSize = <%% 14, 12, 12, 12, 3 %%>;
  grayLineBlockFontWeight = <%% 400, 400, 400, 300, 400 %%>;
  grayLineBlockFontTop = <%% 15, 15, 15, 15, 15 %%>;

  grayLineBlockFontRight0 = <%% -37, -32, -32, -32, -33 %%>;
  grayLineBlockFontRight1 = <%% -31, -26, -26, -26, -31 %%>;
  grayLineBlockFontRight2 = <%% -32, -27, -27, -27, -32 %%>;
  grayLineBlockFontRight3 = <%% -45, -38, -38, -38, -41 %%>;

  spaceStatusLeft0 = <%% 406, 326, 295, 295, 295 %%>;
  spaceStatusLeft1 = <%% 696, 546, 464, 464, 464 %%>;
  spaceStatusWeight = <%% 300, 300, 300, 300, 300 %%>;
  spaceStatusBarWeight = <%% 200, 200, 200, 200, 200 %%>;

  spaceStatusBoxLeft0 = <%% 215, 184, 160, 184, 184 %%>;
  spaceStatusBoxLeft1 = <%% 531, 429, 353, 353, 353 %%>;
  spaceStatusBoxLeft2 = <%% 780, 613, 522, 522, 522 %%>;
  spaceStatusBoxTop = <%% (isMac() ? 4 : 6), (isMac() ? 5 : 7), (isMac() ? 6 : 7), 6, 6 %%>;

  spaceStatusBoxFactorSize = <%% 15, 13, 12, 12, 12 %%>;
  spaceStatusBoxFactorWeight = <%% 300, 300, 300, 300, 300 %%>;
  spaceStatusBoxFactorMargin = <%% 10, 8, 7, 7, 7 %%>;

  textareaTop = <%% 10, 10, 10, 10, 2 %%>;
  textareaLeft = <%% 15, 15, 15, 15, 2.5 %%>;

  budgetTriangleTop = <%% -11, -11, -11, -11, -11 %%>;
  budgetTriangleWidth = <%% 8, 8, 8, 8, 8 %%>;

  spaceTriangleTop = <%% (isMac() ? -5 : -6), (isMac() ? -5 : -6), (isMac() ? -5 : -6), -5, -5 %%>;
  spaceTriangleWidth = <%% 6, 6, 6, 6, 6 %%>;

  addressPromptWidth = <%% 900, 900, 900, 900, 80 %%>;
  addressPromptHeight = <%% 450, 450, 450, 450, 90 %%>;

  mobileTongPaddingTop = <%% 0.7, 0.7, 0.7, 0.7, 0.7 %%>;
  mobileFactorPaddingLeft = <%% 3, 3, 3, 15, 3 %%>;
  mobileFactorCheckWidth = <%% 1.8, 1.8, 1.8, 8, 1.8 %%>;
  mobileFactorCheckTop = <%% 1.35, 1.35, 1.35, 6, (isIphone() ? 1.6 : 1.4) %%>;
  mobileFactorBetween = <%% 4.2, 4.2, 4.2, 19, 4.2 %%>;
  mobileFactorBetween2 = <%% 3.2, 3.2, 3.2, 36.5, 3.2 %%>;
  mobileFactorBetween3 = <%% 4.6, 4.6, 4.6, 16.5, 4.6 %%>;
  mobileFactorPaddingBotom = <%% 1.9, 1.9, 1.9, 6, 1.9 %%>;

  mobileCheckBoxLeft1 = <%% 34, 34, 34, 145, 34 %%>;
  mobileCheckBoxLeft2 = <%% 46, 46, 46, 197, 46 %%>;
  mobileCheckBoxLeft3 = <%% 58, 58, 58, 250, 58 %%>;
  mobileCheckBoxLeft4 = <%% 45, 45, 45, 181, 45 %%>;

  mobileCheckBoxMainSize = <%% 3.8, 3.8, 3.8, 15, 3.8 %%>;
  mobileCheckBoxMainTop = <%% 0.7, 0.7, 0.7, 1.5, 1 %%>;

  greenNoticeSize = <%% 12, 12, 11, 11, 2.8 %%>;
  greenNoticeWeight = <%% 600, 600, 600, 600, 600 %%>;
  greenNoticePaddingTop = <%% (isMac() ? 8 : 10), (isMac() ? 8 : 10), (isMac() ? 7 : 9), (isMac() ? 7 : 9), 1.9 %%>;
  greenNoticePaddingBottom = <%% (isMac() ? 9 : 7), (isMac() ? 9 : 7), (isMac() ? 8 : 7), (isMac() ? 8 : 7), 2.3 %%>;
  greenNoticePaddingLeft = <%% 11, 11, 10, 10, 2.4 %%>;
  greenNoticeBottom = <%% 40, 40, 40, 40, 8 %%>;
  greenNoticeBottom2 = <%% 36, 36, 36, 36, 7.2 %%>;
  greenNoticeLineHeight = <%% 1.4, 1.4, 1.4, 1.4, 1.4 %%>;
  greenNoticeWidth0 = <%% 96, 96, 96, 96, 28 %%>;
  greenNoticeWidth1 = <%% 120, 120, 120, 120, 28 %%>;

  calendarWidth = <%% 260, 250, 230, 210, 56 %%>;
  calendarTop = <%% 41, 41, 41, 40, 8.2 %%>;

  titleSize = <%% 31, 29, 27, 24, 4 %%>;
  titleWeight = <%% 800, 800, 800, 800, 800 %%>;
  titleLineHeight = <%% 1.4, 1.4, 1.4, 1.4, 1.4 %%>;

  numberTextTop = <%% 3, 3, 3, 3, 3 %%>;
  numberSize = <%% 25, 23, 22, 21, 25 %%>;
  numberWeight = <%% 700, 700, 700, 700, 700 %%>;
  numberLineHeight = <%% 1.4, 1.4, 1.4, 1.4, 1.4 %%>;

  contentsAreaMarginTop = <%% 45, 40, 34, 28, 4 %%>;

  mainPaddingTop = <%% (isMac() ? 133 : 131), (isMac() ? 135 : 135), (isMac() ? 103 : 102), (isMac() ? 83 : 82), 4 %%>;
  mainPaddingBottom = <%% (isMac() ? 153 : 151), (isMac() ? 155 : 155), (isMac() ? 118 : 117), (isMac() ? 98 : 97), 5 %%>;

  innerPadding = <%% 60, 50, 45, 40, 60 %%>;

  imageWidthRatio = <%% 0.5, 0.5, 0.5, 0.5, 0.5 %%>;

  wordingBetween = <%% 15, 15, 15, 15, 15 %%>;
  imageBetween = <%% 40, 36, 36, 36, 40 %%>;
  imageHeight = <%% 330, 270, 270, 270, 33 %%>;

  contentsSize = <%% 16, 15, 15, 14, 3 %%>;
  contentsWeight = <%% 400, 400, 400, 400, 400 %%>;
  contentsBoldWeight = <%% 700, 700, 700, 700, 700 %%>;
  contentsLineHeight = <%% 1.66, 1.66, 1.66, 1.66, 1.66 %%>;

  subSize = <%% 22, 21, 20, 19, 4 %%>;
  subWeight = <%% 700, 700, 700, 700, 700 %%>;

  subNumberSize = <%% 18, 17, 16, 15, 3 %%>;
  subNumberWeight = <%% 200, 200, 200, 200, 200 %%>;

  photoMargin = <%% 20, 18, 18, 16, 3 %%>;
  photoNumber = <%% 7, 7, 7, 7, 7 %%>;
  reviewTitleSize = <%% 24, 24, 24, 24, 24 %%>;
  reviewTitleMarginTop = <%% 80, 80, 80, 80, 80 %%>;
  reviewTitleMarginBottom = <%% 32, 32, 32, 32, 32 %%>;

  leftBoxWidth = <%% 398, 250, 209, 160, 398 %%>;
  textAreaBlockHeight = <%% 118, 118, 118, 118, 118 %%>;

  descriptionSize = <%% 16, 15, 14, 12, 3 %%>;
  descriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
  descriptionLineHeight = <%% 1.66, 1.66, 1.66, 1.66, 1.66 %%>;
  descriptionMarginTop = <%% 10, 10, 8, 6, 10 %%>;
  descriptionBoldWeight = <%% 700, 700, 700, 700, 700 %%>;

  policyAreaMarginTop = <%% 15, 15, 12, 10, 1 %%>;
  policyGrayHeight = <%% 180, 180, 180, 180, 42 %%>;
  policyGrayTextTop = <%% 22, 22, 20, 20, 3 %%>;
  policyGrayTextLeft = <%% 22, 20, 18, 15, 3 %%>;
  policyGrayTextSize = <%% 12, 12, 10, 10, 2 %%>;

  agreeTongMarginTop = <%% 10, 10, 10, 10, 10 %%>;
  agreeSize = <%% 15, 15, 15, 15, 15 %%>;
  agreeWeight = <%% 500, 500, 500, 500, 500 %%>;
  agreeLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;

  agreeCircleRadius = <%% 6, 6, 6, 6, 6 %%>;
  agreeCircleTop = <%% (isMac() ? 10 : 8), (isMac() ? 10 : 8), (isMac() ? 10 : 8), (isMac() ? 10 : 8), 10 %%>;
  agreeCircleMarginRight = <%% 5, 5, 5, 5, 5 %%>;

  submitTongMarginTop = <%% 20, 20, 20, 20, 20 %%>;
  submitButtonWidth = <%% 156, 156, 142, 130, 156 %%>;
  submitButtonHeight = <%% 47, 47, 42, 38, 47 %%>;
  submitSize = <%% 20, 20, 18, 16, 3 %%>;
  submitWeight = <%% 400, 400, 400, 400, 400 %%>;
  submitLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;
  submitTextTop = <%% (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), -0.3 %%>;

  contents = {
    main: [
      "홈리에종 서비스 신청",
    ],
    sub: [
      <&& "홈리에종의 서비스 진행을 위해서는" | "홈리에종 서비스 진행을 위해서는" | "서비스 진행을 위해서는" | "서비스 진행을 위해서는" | "홈리에종 서비스 진행을 위해서는" &&>,
      <&& "다음과 같이 기본 정보가 필요합니다." | "다음 기본 정보가 필요합니다." | "기본 정보가 필요합니다." | "기본 정보가 필요합니다." | "다음 기본 정보가 필요합니다." &&>,
      <&& "서비스 신청서를 간단히 작성 후," | "신청서를 간단히 작성 후," | "신청서를 간단히 작성 후," | "신청서를 간단히 작성 후," | "신청서를 간단히 작성 후," &&>,
      <&& "<b%디자이너의 1:1 맞춤 상담%b>을 받아보세요!" | "<b%1:1 맞춤 상담%b>을 받아보세요!" | "<b%1:1 상담%b>을 받아보세요!" | "<b%1:1 상담%b>을 받아보세요!" | "<b%1:1 맞춤 상담%b>을 받아보세요!" &&>,
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
      paddingTop: String(innerPadding) + ea,
      paddingBottom: String(innerPadding) + ea,
    }
  });

  leftBox = createNode({
    mother: contentsArea,
    style: {
      display: "inline-block",
      position: "relative",
      marginLeft: String(innerPadding) + ea,
      width: String(leftBoxWidth) + ea,
      verticalAlign: "top",
    }
  });

  createNode({
    mother: leftBox,
    mode: "svg",
    source: svgMaker.doubleQuote(colorChip.green),
    style: {
      display: "block",
      position: "relative",
      height: String(quoteHeight) + ea,
      marginLeft: String(quoteLeft) + ea,
    }
  });

  createNode({
    mother: leftBox,
    text: contents.sub.join("\n"),
    style: {
      display: "block",
      position: "relative",
      fontSize: String(descriptionSize) + ea,
      fontWeight: String(descriptionWeight),
      color: colorChip.black,
      lineHeight: String(descriptionLineHeight),
      marginTop: String(descriptionMarginTop) + ea,
    },
    bold: {
      fontWeight: String(descriptionBoldWeight),
      color: colorChip.black,
    }
  })

  rightBox = createNode({
    mother: contentsArea,
    style: {
      display: "inline-block",
      position: "relative",
      width: withOut(leftBoxWidth + (innerPadding * 2), ea),
      verticalAlign: "top",
    }
  });

  // 1
  createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(blockMarginBottom) + ea,
      height: String(moduleHeight) + ea,
    },
    children: [
      {
        style: {
          display: "inline-block",
          position: "relative",
          width: String(circleRadius * 2) + ea,
          height: String(circleRadius * 2) + ea,
          marginRight: String(circleBetween) + ea,
          borderRadius: String(circleRadius) + ea,
          background: colorChip.green,
          top: String(circleTop) + ea,
          verticalAlign: "top",
        }
      },
      {
        text: "성함",
        style: {
          display: "inline-block",
          position: "relative",
          top: String(mainTop) + ea,
          fontSize: String(mainSize) + ea,
          fontWeight: String(mainWeight),
          color: colorChip.black,
          verticalAlign: "top",
        }
      },
      {
        style: {
          position: "absolute",
          top: String(grayTop) + ea,
          left: String(leftGrayType0) + ea,
          width: String(widthGrayType0) + ea,
          height: String(grayHeight) + ea,
          background: colorChip.gray1,
          borderRadius: String(3) + "px",
        }
      },
      {
        mode: "input",
        class: [ inputClassName ],
        attribute: {
          type: "text",
          placeholder: "성함",
          property: "name",
          value: "",
        },
        event: {
          blur: nameBlurEvent,
        },
        style: {
          position: "absolute",
          top: String(grayInputTop) + ea,
          left: String(leftGrayType0) + ea,
          width: String(widthGrayType0) + ea,
          height: String(grayHeight) + ea,
          outline: String(0),
          border: String(0),
          fontSize: String(inputSize) + ea,
          fontWeight: String(inputWeight),
          color: colorChip.black,
          textAlign: "center",
          background: "transparent",
        }
      },
    ]
  });
  // 2
  createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(blockMarginBottom) + ea,
      height: String(moduleHeight) + ea,
    },
    children: [
      {
        style: {
          display: "inline-block",
          position: "relative",
          width: String(circleRadius * 2) + ea,
          height: String(circleRadius * 2) + ea,
          marginRight: String(circleBetween) + ea,
          borderRadius: String(circleRadius) + ea,
          background: colorChip.green,
          top: String(circleTop) + ea,
          verticalAlign: "top",
        }
      },
      {
        text: "연락처",
        style: {
          display: "inline-block",
          position: "relative",
          top: String(mainTop) + ea,
          fontSize: String(mainSize) + ea,
          fontWeight: String(mainWeight),
          color: colorChip.black,
          verticalAlign: "top",
        }
      },
      {
        style: {
          position: "absolute",
          top: String(grayTop) + ea,
          left: String(leftGrayType0) + ea,
          width: String(widthGrayType0) + ea,
          height: String(grayHeight) + ea,
          background: colorChip.gray1,
          borderRadius: String(3) + "px",
        }
      },
      {
        mode: "input",
        class: [ inputClassName ],
        attribute: {
          type: "text",
          placeholder: "010-0000-0000",
          property: "phone",
          value: "",
        },
        event: {
          keyup: phoneHypenEvent,
          blur: phoneBlurEvent,
        },
        style: {
          position: "absolute",
          top: String(grayInputTop) + ea,
          left: String(leftGrayType0) + ea,
          width: String(widthGrayType0) + ea,
          height: String(grayHeight) + ea,
          outline: String(0),
          border: String(0),
          fontSize: String(inputSize) + ea,
          fontWeight: String(inputWeight),
          color: colorChip.black,
          textAlign: "center",
          background: "transparent",
        }
      },
    ]
  });
  // 3
  createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(blockMarginBottom) + ea,
      height: String(moduleHeight) + ea,
    },
    children: [
      {
        style: {
          display: "inline-block",
          position: "relative",
          width: String(circleRadius * 2) + ea,
          height: String(circleRadius * 2) + ea,
          marginRight: String(circleBetween) + ea,
          borderRadius: String(circleRadius) + ea,
          background: colorChip.green,
          top: String(circleTop) + ea,
          verticalAlign: "top",
        }
      },
      {
        text: "이메일",
        style: {
          display: "inline-block",
          position: "relative",
          top: String(mainTop) + ea,
          fontSize: String(mainSize) + ea,
          fontWeight: String(mainWeight),
          color: colorChip.black,
          verticalAlign: "top",
        }
      },
      {
        style: {
          position: "absolute",
          top: String(grayTop) + ea,
          left: String(leftGrayType0) + ea,
          width: String(widthGrayType1) + ea,
          height: String(grayHeight) + ea,
          background: colorChip.gray1,
          borderRadius: String(3) + "px",
        }
      },
      {
        mode: "input",
        class: [ inputClassName ],
        attribute: {
          type: "text",
          placeholder: "example@home-liaison.com",
          property: "email",
          value: "",
        },
        style: {
          position: "absolute",
          top: String(grayInputTop) + ea,
          left: String(leftGrayType0) + ea,
          width: String(widthGrayType1) + ea,
          height: String(grayHeight) + ea,
          outline: String(0),
          border: String(0),
          fontSize: String(inputSize) + ea,
          fontWeight: String(inputWeight),
          color: colorChip.black,
          textAlign: "left",
          background: "transparent",
          textIndent: String(inputIndent) + ea,
        }
      },
    ]
  });
  // 4
  createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(blockMarginBottom) + ea,
      height: String(moduleHeight) + ea,
    },
    children: [
      {
        style: {
          display: "inline-block",
          position: "relative",
          width: String(circleRadius * 2) + ea,
          height: String(circleRadius * 2) + ea,
          marginRight: String(circleBetween) + ea,
          borderRadius: String(circleRadius) + ea,
          background: colorChip.green,
          top: String(circleTop) + ea,
          verticalAlign: "top",
        }
      },
      {
        text: "주소",
        style: {
          display: "inline-block",
          position: "relative",
          top: String(mainTop) + ea,
          fontSize: String(mainSize) + ea,
          fontWeight: String(mainWeight),
          color: colorChip.black,
          verticalAlign: "top",
        }
      },
      {
        event: {
          click: addressButtonEvent
        },
        style: {
          position: "absolute",
          top: String(grayTop) + ea,
          left: String(leftGrayType0) + ea,
          width: String(addressWidth) + ea,
          height: String(grayHeight) + ea,
          background: colorChip.gradientGreen,
          borderRadius: String(3) + "px",
          cursor: "pointer",
        },
        children: [
          {
            text: "검색",
            style: {
              width: String(100) + '%',
              textAlign: "center",
              fontSize: String(addressSize) + ea,
              fontWeight: String(addressWeight),
              color: colorChip.white,
              position: "relative",
              top: String(addressTop) + ea,
            }
          }
        ]
      },
      {
        style: {
          position: "absolute",
          top: String(grayTop) + ea,
          left: String(leftGrayType3) + ea,
          width: String(widthGrayType3) + ea,
          height: String(grayHeight) + ea,
          background: colorChip.gray1,
          borderRadius: String(3) + "px",
        }
      },
      {
        mode: "input",
        class: [ inputClassName ],
        attribute: {
          type: "text",
          placeholder: "인테리어 받을 곳의 주소",
          property: "address0",
          value: "",
        },
        style: {
          position: "absolute",
          top: String(grayInputTop) + ea,
          left: String(leftGrayType3) + ea,
          width: String(widthGrayType3) + ea,
          height: String(grayHeight) + ea,
          outline: String(0),
          border: String(0),
          fontSize: String(inputSize) + ea,
          fontWeight: String(inputWeight),
          color: colorChip.black,
          textAlign: "left",
          background: "transparent",
          textIndent: String(inputIndent) + ea,
        }
      },
    ]
  });
  // 5
  createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(blockMarginBottom) + ea,
      height: String(moduleHeight) + ea,
    },
    children: [
      {
        style: {
          position: "absolute",
          top: String(grayTop) + ea,
          left: String(leftGrayType0) + ea,
          width: String(widthGrayType1) + ea,
          height: String(grayHeight) + ea,
          background: colorChip.gray1,
          borderRadius: String(3) + "px",
        }
      },
      {
        mode: "input",
        class: [ inputClassName ],
        attribute: {
          type: "text",
          placeholder: "인테리어 받을 곳의 상세 주소",
          property: "address1",
          value: "",
        },
        event: {
          focus: addressFocusEvent,
          blur: addressBlurEvent,
        },
        style: {
          position: "absolute",
          top: String(grayInputTop) + ea,
          left: String(leftGrayType0) + ea,
          width: String(widthGrayType1) + ea,
          height: String(grayHeight) + ea,
          outline: String(0),
          border: String(0),
          fontSize: String(inputSize) + ea,
          fontWeight: String(inputWeight),
          color: colorChip.black,
          textAlign: "left",
          background: "transparent",
          textIndent: String(inputIndent) + ea,
        }
      },
    ]
  });

  // 6 : margin
  createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(blockMarginBottom) + ea,
      height: String(moduleHeight * marginRatio) + ea,
    }
  });

  // 7
  createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(blockMarginBottom) + ea,
      height: String(moduleHeight) + ea,
    },
    children: [
      {
        style: {
          display: "inline-block",
          position: "relative",
          width: String(circleRadius * 2) + ea,
          height: String(circleRadius * 2) + ea,
          marginRight: String(circleBetween) + ea,
          borderRadius: String(circleRadius) + ea,
          background: colorChip.green,
          top: String(circleTop) + ea,
          verticalAlign: "top",
        }
      },
      {
        text: "분양 평수",
        style: {
          display: "inline-block",
          position: "relative",
          top: String(mainTop) + ea,
          fontSize: String(mainSize) + ea,
          fontWeight: String(mainWeight),
          color: colorChip.black,
          verticalAlign: "top",
        }
      },
      {
        style: {
          position: "absolute",
          top: String(grayTop) + ea,
          left: String(leftGrayType2) + ea,
          width: String(widthGrayType0) + ea,
          height: String(grayHeight) + ea,
          background: colorChip.gray1,
          borderRadius: String(3) + "px",
        }
      },
      {
        mode: "input",
        class: [ inputClassName ],
        attribute: {
          type: "text",
          placeholder: "00평 (분양 평수)",
          property: "pyeong",
          value: "",
        },
        event: {
          keyup: pyeongNumberEvent,
          blur: pyeongBlurEvent,
          focus: pyeongFocusEvent,
        },
        style: {
          position: "absolute",
          top: String(grayInputTop) + ea,
          left: String(leftGrayType2) + ea,
          width: String(widthGrayType0) + ea,
          height: String(grayHeight) + ea,
          outline: String(0),
          border: String(0),
          fontSize: String(inputSize) + ea,
          fontWeight: String(inputWeight),
          color: colorChip.black,
          textAlign: "center",
          background: "transparent",
        }
      }
    ]
  });
  // 8
  createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(blockMarginBottom) + ea,
      height: String(moduleHeight) + ea,
    },
    children: [
      {
        style: {
          display: "inline-block",
          position: "relative",
          width: String(circleRadius * 2) + ea,
          height: String(circleRadius * 2) + ea,
          marginRight: String(circleBetween) + ea,
          borderRadius: String(circleRadius) + ea,
          background: colorChip.green,
          top: String(circleTop) + ea,
          verticalAlign: "top",
        }
      },
      {
        text: "거주 여부",
        style: {
          display: "inline-block",
          position: "relative",
          top: String(mainTop) + ea,
          fontSize: String(mainSize) + ea,
          fontWeight: String(mainWeight),
          color: colorChip.black,
          verticalAlign: "top",
        }
      },
      {
        class: [ inputClassName ],
        attribute: {
          toggle: "on",
          property: "living",
        },
        event: {
          click: checkboxClickEvent0
        },
        style: {
          position: "absolute",
          top: String(0),
          left: String(leftCheck0) + ea,
          height: String(100) + '%',
          verticalAlign: "top",
          cursor: "pointer",
        },
        children: [
          {
            mode: "svg",
            source: instance.mother.returnCheckBox(colorChip.gray3),
            style: {
              display: "inline-block",
              position: "relative",
              width: String(checkboxWidth) + ea,
              top: String(checkboxTop) + ea,
              verticalAlign: "top",
              cursor: "pointer",
              opacity: String(0),
            }
          },
          {
            mode: "svg",
            source: instance.mother.returnCheckBox(colorChip.green),
            style: {
              position: "absolute",
              width: String(checkboxWidth) + ea,
              top: String(checkboxTop) + ea,
              left: String(0),
              verticalAlign: "top",
              cursor: "pointer",
              opacity: String(1),
            }
          },
          {
            text: "이사",
            style: {
              display: "inline-block",
              position: "relative",
              marginLeft: String(checkboxBetween) + ea,
              top: String(mainTop) + ea,
              fontSize: String(mainSize) + ea,
              fontWeight: String(checkboxWeight),
              color: colorChip.green,
              verticalAlign: "top",
              cursor: "pointer",
            }
          },
        ]
      },
      {
        class: [ inputClassName ],
        attribute: {
          toggle: "off",
          property: "living",
        },
        event: {
          click: checkboxClickEvent0
        },
        style: {
          position: "absolute",
          top: String(0),
          left: String(leftCheck1) + ea,
          height: String(100) + '%',
          verticalAlign: "top",
          cursor: "pointer",
        },
        children: [
          {
            mode: "svg",
            source: instance.mother.returnCheckBox(colorChip.gray3),
            style: {
              display: "inline-block",
              position: "relative",
              width: String(checkboxWidth) + ea,
              top: String(checkboxTop) + ea,
              verticalAlign: "top",
              cursor: "pointer",
              opacity: String(1),
            }
          },
          {
            mode: "svg",
            source: instance.mother.returnCheckBox(colorChip.green),
            style: {
              position: "absolute",
              width: String(checkboxWidth) + ea,
              top: String(checkboxTop) + ea,
              left: String(0),
              verticalAlign: "top",
              cursor: "pointer",
              opacity: String(0),
            }
          },
          {
            text: "거주중",
            style: {
              display: "inline-block",
              position: "relative",
              marginLeft: String(checkboxBetween) + ea,
              top: String(mainTop) + ea,
              fontSize: String(mainSize) + ea,
              fontWeight: String(checkboxWeight),
              color: colorChip.black,
              verticalAlign: "top",
              cursor: "pointer",
            }
          },
        ]
      },
    ]
  });
  // 9
  createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(blockMarginBottom) + ea,
      height: String(moduleHeight) + ea,
    },
    children: [
      {
        style: {
          display: "inline-block",
          position: "relative",
          width: String(circleRadius * 2) + ea,
          height: String(circleRadius * 2) + ea,
          marginRight: String(circleBetween) + ea,
          borderRadius: String(circleRadius) + ea,
          background: colorChip.green,
          top: String(circleTop) + ea,
          verticalAlign: "top",
        }
      },
      {
        text: "입주일",
        style: {
          display: "inline-block",
          position: "relative",
          top: String(mainTop) + ea,
          fontSize: String(mainSize) + ea,
          fontWeight: String(mainWeight),
          color: colorChip.black,
          verticalAlign: "top",
        }
      },
      {
        style: {
          position: "absolute",
          top: String(grayTop) + ea,
          left: String(leftGrayType2) + ea,
          width: String(widthGrayType0) + ea,
          height: String(grayHeight) + ea,
          background: colorChip.gray1,
          borderRadius: String(3) + "px",
        }
      },
      {
        mode: "input",
        class: [ inputClassName ],
        attribute: {
          type: "text",
          placeholder: dateToString(new Date()),
          property: "movein",
          value: "",
        },
        event: {
          click: calendarViewEvent,
        },
        style: {
          position: "absolute",
          top: String(grayInputTop) + ea,
          left: String(leftGrayType2) + ea,
          width: String(widthGrayType0) + ea,
          height: String(grayHeight) + ea,
          outline: String(0),
          border: String(0),
          fontSize: String(inputSize) + ea,
          fontWeight: String(inputWeight),
          color: colorChip.black,
          textAlign: "center",
          background: "transparent",
        }
      },
    ]
  });
  // 10
  createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(blockMarginBottom) + ea,
      height: String(textAreaBlockHeight) + ea,
    },
    children: [
      {
        style: {
          display: "inline-block",
          position: "relative",
          width: String(circleRadius * 2) + ea,
          height: String(circleRadius * 2) + ea,
          marginRight: String(circleBetween) + ea,
          borderRadius: String(circleRadius) + ea,
          background: colorChip.green,
          top: String(circleTop) + ea,
          verticalAlign: "top",
        }
      },
      {
        text: "요청 사항",
        style: {
          display: "inline-block",
          position: "relative",
          top: String(mainTop) + ea,
          fontSize: String(mainSize) + ea,
          fontWeight: String(mainWeight),
          color: colorChip.black,
          verticalAlign: "top",
        }
      },
      {
        style: {
          position: "absolute",
          top: String(grayTextAreaTop) + ea,
          left: String(leftGrayType2) + ea,
          width: String(widthGrayType2) + ea,
          height: String(grayBigHeight) + ea,
          background: colorChip.gray1,
          borderRadius: String(3) + "px",
        }
      },
      {
        mode: "textarea",
        class: [ inputClassName ],
        attribute: {
          placeholder: "선호하는 스타일 + 공간의 특이 사항을 적어주세요!\n(예) 모던 프렌치 + 코지한 홈스타일링을 원해요.\n(예) 팬트리가 있어요.\n(예) 복층 공간입니다.",
          property: "etc",
        },
        style: {
          position: "absolute",
          top: String(grayTextAreaTop + textareaTop) + ea,
          left: String(leftGrayType2 + textareaLeft) + ea,
          width: String(widthGrayType2 - (textareaLeft * 2)) + ea,
          height: String(grayBigHeight - (textareaTop * 1)) + ea,
          fontSize: String(grayLineBlockFontSize) + ea,
          fontWeight: String(grayLineBlockFontWeight),
          border: String(0),
          background: "transparent",
          outline: String(0),
          overflow: "scroll",
          lineHeight: String(1.6),
          color: colorChip.black,
        }
      }
    ]
  });

  // policy and submit
  policyArea = createNode({
    mother: mainBlock,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
      marginTop: String(policyAreaMarginTop) + ea,
      background: colorChip.white,
      borderRadius: String(5) + "px",
      boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
      paddingTop: String(innerPadding) + ea,
      paddingBottom: String(innerPadding) + ea,
    }
  });

  policyTong = createNode({
    mother: policyArea,
    style: {
      display: "block",
      position: "relative",
      marginLeft: String(innerPadding) + ea,
      width: withOut(innerPadding * 2, ea),
      height: String(policyGrayHeight) + ea,
      background: colorChip.gray1,
      borderRadius: String(3) + "px",
    },
    children: [
      {
        style: {
          position: "absolute",
          top: String(policyGrayTextTop) + ea,
          left: String(policyGrayTextLeft) + ea,
          width: withOut(policyGrayTextLeft * 2, ea),
          height: withOut(policyGrayTextTop * 2, ea),
          overflow: "scroll",
        },
        children: [
          {
            position: "absolute",
            top: String(0) + ea,
            left: String(0) + ea,
            width: String(100) + '%',
            height: "auto",
            fontSize: String(policyGrayTextSize) + ea,
            fontWeight: String(300),
            lineHeight: String(1.6),
            color: colorChip.black,
          }
        ]
      }
    ]
  }).firstChild.firstChild;

  agreeTong = createNode({
    mother: policyArea,
    style: {
      display: "flex",
      position: "relative",
      flexDirection: "row-reverse",
      marginLeft: String(innerPadding) + ea,
      width: withOut(innerPadding * 2, ea),
      marginTop: String(agreeTongMarginTop) + ea,
    },
    children: [
      {
        attribute: {
          toggle: "on",
        },
        text: "상기 개인정보 취급 방침에 동의합니다.",
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(agreeSize) + ea,
          fontWeight: String(agreeWeight),
          color: colorChip.green,
          lineHeight: String(agreeLineHeight),
        }
      },
      {
        attribute: {
          toggle: "on",
        },
        style: {
          display: "inline-block",
          position: "relative",
          width: String(agreeCircleRadius) + ea,
          height: String(agreeCircleRadius) + ea,
          borderRadius: String(agreeCircleRadius) + ea,
          background: colorChip.green,
          top: String(agreeCircleTop) + ea,
          marginRight: String(agreeCircleMarginRight) + ea,
        }
      }
    ]
  });

  submitTong = createNode({
    mother: policyArea,
    style: {
      display: "block",
      position: "relative",
      marginTop: String(submitTongMarginTop) + ea,
      textAlign: "center",
    },
    children: [
      {
        style: {
          display: "inline-flex",
          width: String(submitButtonWidth) + ea,
          height: String(submitButtonHeight) + ea,
          background: colorChip.gradientGreen,
          borderRadius: String(5) + "px",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        },
        children: [
          {
            text: "상담 신청하기",
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(submitSize) + ea,
              fontWeight: String(submitWeight),
              color: colorChip.white,
              lineHeight: String(submitLineHeight),
              top: String(submitTextTop) + ea,
            }
          }
        ]
      }
    ]
  });


  ajaxJson({}, "https://" + GHOSTHOST + "/designerProposal_policy").then(function (res) {
    const { policy } = res;
    let bTags;
    policyTong.insertAdjacentHTML("beforeend", policy);
    bTags = policyTong.querySelectorAll("b");
    for (let b of bTags) {
      b.style.color = colorChip.black;
      b.style.fontWeight = String(600);
    }
  }).catch(function (err) {
    throw new Error(err);
  });

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

  baseWidth = <%% 1280, 950, 810, 640, 128 %%>;
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
    innerPadding = <%% 50, 50, 50, 50, 50 %%>;
    innerPaddingTop = <%% 40, 40, 40, 40, 40 %%>;

    titleBoxPaddingBottom = <%% 12, 12, 12, 12, 12 %%>;
    titleBoxMarginBottom = <%% 24, 24, 24, 24, 24 %%>;

    titleSize = <%% 22, 22, 22, 22, 22 %%>;
    titleWeight = <%% 600, 600, 600, 600, 600 %%>;

    contentsSize = <%% 15, 15, 15, 15, 15 %%>;
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
