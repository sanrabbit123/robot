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
      "return ('홈리에종 디자이너비 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('홈리에종 디자이너비 | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "feeManual",
  "hangul": "디자인비 측정",
  "route": [
    "feeManual"
  ]
} %/%/g

const FeeManualJs = function () {
  this.mother = new GeneralJs();
}

FeeManualJs.binaryPath = FRONTHOST + "/middle/console/fee";

FeeManualJs.prototype.insertInitBox = function () {
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

  whiteBlockMarginBottom = <%% 90, 80, 74, 60, 14.5 %%>;

  quoteHeight = <%% 15, 15, 15, 15, 2.5 %%>;
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

  searchBarPaddingTop = <%% 220, 220, 192, 164, 12.5 %%>;
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

  titleWording = "디자인비 설명";
  subTitleContents = "홈리에종 디자이너 비용 산출식";

  mobileBlockTop = 4.5;

  whiteBlock = createNode({
    mother: this.baseTong,
    style: {
      display: "block",
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      marginBottom: String(whiteBlockMarginBottom) + ea,
      top: String(-1 * boxTopVisual) + ea,
      paddingTop: desktop ? "" : String(mobileBlockTop) + ea,
    }
  });

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
        source: svgMaker.serifAsterisk(colorChip.white),
        style: {
          display: "inline-block",
          height: String(quoteHeight) + ea,
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

FeeManualJs.prototype.insertFirstBox = function () {
  const instance = this;
  const mother = this.mother;
  const { client, ea, baseTong, media, project } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, autoComma } = GeneralJs;
  let paddingTop;
  let whiteBlock, whiteTong;
  let bottomMargin;
  let whiteBottomMargin;
  let firstWidth;
  let firstPaddingLeft;
  let titleSize, titleWeight, titleLineHeight;
  let barTop, barWidth, barHeight;
  let contentsSize, contentsWeight, contentsLineHeight, contentsBetween;
  let contents;
  let mobileFirstMarginBottom;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 8 %%>;
  paddingTop =  <%% 52, 52, 44, 36, 8 %%>;

  whiteBottomMargin = <%% 42, 42, 42, 36, 0 %%>;

  firstWidth = <%% 380, 300, 280, 220, 50 %%>;
  firstPaddingLeft = <%% 28, 24, 22, 18, 4 %%>;

  barTop = <%% (isMac() ? 9 : 6), (isMac() ? 9 : 6), (isMac() ? 8 : 5), (isMac() ? 7 : 5), 1.4 %%>;
  barWidth = <%% 6, 6, 6, 5, 1 %%>;
  barHeight = <%% 53, 52, 49, 40, 10.6 %%>;

  titleSize = <%% 24, 24, 22, 18, 4.3 %%>;
  titleWeight = <%% 800, 800, 800, 800, 800 %%>;
  titleLineHeight = <%% 1.4, 1.4, 1.4, 1.4, 1.5 %%>;

  contentsSize = <%% 15, 15, 14, 13, 3.2 %%>;
  contentsWeight = <%% 600, 600, 600, 600, 600 %%>;
  contentsLineHeight = <%% 1.7, 1.7, 1.7, 1.7, 1.7 %%>;
  contentsBetween = <%% 20, 20, 20, 20, 4 %%>;

  mobileFirstMarginBottom = 4;

  contents = {
    title: [
      "디자이너 비용에 대한",
      "산출 과정 안내"
    ],
    description: [
      [
        "홈리에종은 디자이너의 업무에 대해 정당한 비용을 청구하고 받아내는 임무를 수행하고 있습니다. 이러한 미션을 위해 디자이너의 업무량을 서비스별, 평형별로 계산하여 합리적인 비용을 정하는 공식을 만들었으며, 고객님들을 잘 설득해 가며 디자인비를 받아 내는 일에 최선을 다하고 있습니다."
      ],
      [
        "홈리에종은 디자이너를 위한 플랫폼으로 성장해 나아가기 위해, 디자인비 측정과 청구에 최선을 다하고 있습니다. 그 산출식의 개념에 대해서 공유해드립니다."
      ]
    ]
  };

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      background: colorChip.white,
      paddingTop: String(paddingTop) + ea,
      paddingBottom: String(paddingTop) + ea,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
    },
    children: [
      {
        display: "block",
        position: "relative",
        width: withOut(margin * 2, ea),
        height: String(100) + '%',
        marginLeft: String(margin) + ea,
      }
    ]
  });
  whiteTong = whiteBlock.firstChild;


  createNode({
    mother: whiteTong,
    style: {
      display: desktop ? "inline-block" : "block",
      position: "relative",
      width: desktop ? String(firstWidth - firstPaddingLeft) + ea : "",
      paddingLeft: String(firstPaddingLeft) + ea,
      verticalAlign: "top",
      marginBottom: desktop ? "" : String(mobileFirstMarginBottom) + ea,
    },
    children: [
      {
        style: {
          position: "absolute",
          top: String(barTop) + ea,
          left: String(0),
          width: String(barWidth) + ea,
          height: String(barHeight) + ea,
          borderRadius: String(5) + "px",
          background: colorChip.gray3,
        }
      },
      {
        text: contents.title.join("\n"),
        style: {
          display: "block",
          position: "relative",
          fontSize: String(titleSize) + ea,
          fontWeight: String(titleWeight),
          color: colorChip.black,
          lineHeight: String(titleLineHeight),
        }
      }
    ]
  });

  createNode({
    mother: whiteTong,
    style: {
      display: desktop ? "inline-block" : "block",
      position: "relative",
      width: desktop ? withOut(firstWidth, ea) : "",
      verticalAlign: "top",
    },
    children: [
      {
        text: contents.description[0].join("\n"),
        style: {
          display: "block",
          position: "relative",
          fontSize: String(contentsSize) + ea,
          fontWeight: String(contentsWeight),
          color: colorChip.black,
          lineHeight: String(contentsLineHeight),
        }
      },
      {
        text: contents.description[1].join("\n"),
        style: {
          display: "block",
          position: "relative",
          fontSize: String(contentsSize) + ea,
          fontWeight: String(contentsWeight),
          color: colorChip.black,
          lineHeight: String(contentsLineHeight),
          marginTop: String(contentsBetween) + ea,
        }
      },
    ]
  });

}

FeeManualJs.prototype.insertMainDescriptionBox = function () {
  const instance = this;
  const mother = this.mother;
  const { client, ea, baseTong, media, project } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, autoComma } = GeneralJs;
  const blank = "&nbsp;&nbsp;&nbsp;";
  let paddingTop;
  let block;
  let whiteBlock, whiteTong;
  let bottomMargin;
  let titleFontSize;
  let num, num2;
  let numberRight;
  let titleTop, titleTopNumber;
  let titleBottom;
  let index;
  let mobileTitleLeft, mobileTitleTop;
  let secondBlockWidth, secondBlockMargin;
  let tong;
  let contentsWordingSize;
  let contentsBottom;
  let whiteBottomMargin;
  let contentsTitleMarginTop, contentsMarginTop;
  let contentsPaddingLeft;
  let arrowWidth;
  let arrowTop;
  let arrorLeft;
  let bigNumberSize;
  let bigNumberBetween;
  let bigNumberMargin;
  let bigNumberBetweenMargin;
  let matrix;
  let firstWidth, secondWidth, secondMarginRight;
  let contentsAreaPaddingTop;
  let zeroWidth, zeroMarginRight;
  let checkBoxWidth, checkBoxTop;
  let arrowBoxWidth, arrowBoxTop;
  let contentsMarginBottom0, contentsMarginBottom1;
  let mobilePaddingLeft;
  let mobileContentsWordingSize;
  let wordings;
  let lineTop, linePadding;
  let mainContents;
  let mainTitle;
  let title, contents;
  let factors;
  let contentsHeight;
  let factorBoxTop, factorBoxLeft;
  let factorLineTop, factorLineLeft, factorLineWidth, factorLineHeight;
  let image;
  let funcAreaOuterPadding;
  let funcAreaHeight;
  let funcAreaContentsHeight;
  let funcAreaAlphaContentsHeight;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 4.7 %%>;
  paddingTop =  <%% 52, 52, 44, 36, 4.7 %%>;

  whiteBottomMargin = <%% 42, 42, 42, 36, 0 %%>;

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;
  numberRight = <%% 12, 12, 12, 12, 3 %%>;

  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  titleBottom = <%% (isMac() ? 14 : 12), (isMac() ? 14 : 12), (isMac() ? 14 : 12), (isMac() ? 14 : 12), 0 %%>;
  contentsAreaPaddingTop = <%% 34, 34, 34, 34, 6 %%>;

  mobileTitleLeft = 1.5;
  mobileTitleTop = -8.7;

  secondBlockWidth = <%% 300, 300, 300, 300, 330 %%>;
  secondBlockMargin = <%% 36, 36, 36, 36, 33 %%>;

  contentsWordingSize = <%% 14.5, 14, 14, 13, 3.5 %%>;
  contentsBottom = <%% -5, -5, -5, -5, 0 %%>;

  contentsTitleMarginTop = <%% 14, 14, 14, 14, 1 %%>;
  contentsMarginTop = <%% 36, 36, 36, 36, 1 %%>;
  contentsPaddingLeft = <%% 14, 14, 14, 14, 0 %%>;
  arrowWidth = <%% 8, 8, 7, 6, 1.6 %%>;
  arrowTop = <%% 6, 6, 6, 6, 0.3 %%>;
  arrorLeft = <%% 1, 1, 1, 1, 0 %%>;

  bigNumberSize = <%% 37, 37, 37, 37, 5 %%>;
  bigNumberBetween = <%% -3, -3, -3, -3, 0 %%>;
  bigNumberMargin = <%% 0, 0, 0, 0, 0 %%>;
  bigNumberBetweenMargin = <%% 28, 28, 28, 28, 0 %%>;

  zeroWidth = <%% 8, 8, 8, 8, 10 %%>;
  zeroMarginRight = <%% 10, 10, 10, 10, 10 %%>;
  firstWidth = <%% 240, 180, 170, 150, 10 %%>;
  secondWidth = <%% 15, 15, 8, 0, 0 %%>;
  secondMarginRight = <%% 10, 10, 10, 10, 0 %%>;

  checkBoxWidth = <%% 10, 10, 10, 10, 2 %%>;
  arrowBoxWidth = <%% 9, 8, 8, 8, 1.8 %%>;
  checkBoxTop = <%% (isMac() ? 8 : 5.5), (isMac() ? 7 : 5), (isMac() ? 7 : 4.5), (isMac() ? 6.5 : 4), 1.6 %%>;
  arrowBoxTop = <%% (isMac() ? 8 : 5.5), (isMac() ? 7 : 5), (isMac() ? 7 : 4.5), (isMac() ? 6.5 : 4), 1.5 %%>;

  contentsMarginBottom0 = <%% 30, 24, 24, 24, 3 %%>;
  contentsMarginBottom1 = <%% 32, 32, 30, 28, 6 %%>;

  lineTop = <%% 10, 10, 10, 10, 10 %%>;
  linePadding = <%% 12, 12, 12, 12, 12 %%>;

  mobilePaddingLeft = 6;

  mobileContentsWordingSize = 3.2;

  contentsHeight = <%% 143, 143, 143, 143, 180 %%>;

  factorBoxTop = <%% 25, 25, 25, 25, 25 %%>;
  factorBoxLeft = <%% 920, 600, 600, 600, 920 %%>;

  factorLineTop = <%% (isMac() ? 36 : 34), 36, 36, 36, 36 %%>;
  factorLineLeft = <%% 888, 588, 588, 588, 888 %%>;
  factorLineWidth = <%% 22, 22, 22, 22, 22 %%>;
  factorLineHeight = <%% 99, 99, 99, 99, 123 %%>;

  funcAreaOuterPadding = <%% 8, 7, 6, 4, 0.5 %%>;
  funcAreaHeight = <%% 120, 102, 92, 70, 12 %%>;
  funcAreaContentsHeight = <%% 58, 50, 42, 33, 5.2 %%>;
  funcAreaAlphaContentsHeight = <%% 26, 22, 19, 15, 2.6 %%>;

  mainTitle = "디자이너 산출 공식";
  mainContents = [
    {
      title: "디자이너 매트릭스",
      contents: [
        "홈리에종은 먼저 서비스와 평형대별 표를 만들어 필요한 업무 시간을 나열했습니다. 그리고 인테리어 디자이너의 평균 연봉을 토대로 시간당 비용을 구하고,",
        "디자이너의 연차, 레벨별 연봉 지점을 16분류로 나누어 각각의 서비스와 평형에 적합한 디자인비 기준을 만들어 냈습니다.",
      ],
      image: <&& FeeManualJs.binaryPath + "/" + "table_desktop.png" | FeeManualJs.binaryPath + "/" + "table_tablet.png" | FeeManualJs.binaryPath + "/" + "table_tablet.png" | FeeManualJs.binaryPath + "/" + "table_mobile.png" | FeeManualJs.binaryPath + "/" + "table_mobile.png" &&>,
    },
    {
      title: "디자인비 기준과 실제 디자인비",
      contents: [
        "디자인비의 기준은 실제 디자인비와 다릅니다. 디자인비 기준을 토대로",
        "실장님별 가산 비율이 곱해져 최종 디자인비가 산출되는 구조로 가산점에 들어가는 항목은 다음과 같습니다.",
      ],
      factors: [
        "서비스 제공 범위와 역량",
        "스타일 인기도",
        "경력과 협업 유지 기간",
        "페이퍼 워크 능력",
        "고객 평가 자료",
      ],
    },
    {
      title: "디자인비 전체 공식",
      contents: [
        "디자이너 전체 공식은 복잡해 보이지만 사실은 간단합니다. 디자이너 매트릭스 중 해당되는 기준 금액을 불러온 뒤, 해당 영역과 그 전 영역(평수별 영역)의 차이를 구해 기울기를 정하고 그 기울기 값으로 1차 방정식을 만들어 디자인비를 공역의 변수로, 고객 평수를 정의역 변수로 지정합니다. 그리고 그 기울기에 평수를 곱한 값에 디자이너별로 개인화되어 생성된 가산점을 곱해 최종적인 디자인비를 구하게 됩니다.",
        "수식 자체는 복잡해 보이지만 결국 고객님의 평수, 그리고 받으실 서비스와 디자이너 가산점으로 이루어진 간단한 1차 방정식인 것입니다.",
      ]
    },
    {
      title: "디자인비 가산점 공식",
      contents: [
        "매트릭스의 값과 평수에 곱해지는 디자이너별 개인 가산점의 구성은 위와 같습니다. 서비스 제공 범위와 역량, 스타일 인기도, 경력과 협업 유지 기간, 페이퍼 워크 능력, 고객 평가 자료가 각각의 함수에 의해 별개로 구해져 모두 하나로 더해지는 구조로 이루어져 있습니다. 디자이너별로 경력과 능력, 그리고 보조 기술 등에 따라 금액적인 차이를 둠으로써 최대한 합리적인 디자인비를 산출하기 위해 노력하고 있습니다.",
      ]
    },
  ];

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      background: desktop ? colorChip.white : "",
      paddingTop: desktop ? String(paddingTop + (desktop ? 0 : 1.7)) + ea : "",
      paddingBottom: desktop ? String(whiteBottomMargin) + ea : "",
      marginBottom: String(bottomMargin) + ea,
      boxShadow: desktop ? "0px 5px 12px -10px " + colorChip.gray5 : "",
    },
    children: [
      {
        display: "block",
        position: "relative",
        width: desktop ? withOut(margin * 2, ea) : String(100) + '%',
        height: String(100) + '%',
        marginLeft: String(desktop ? margin : 0) + ea,
      }
    ]
  });
  whiteTong = whiteBlock.firstChild;

  block = createNode({
    mother: whiteTong,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
    },
    children: [
      {
        style: {
          display: "block",
          position: mobile ? "absolute" : "relative",
          left: desktop ? "" : String(mobileTitleLeft) + ea,
          top: desktop ? "" : String(mobileTitleTop) + ea,
          width: desktop ? String(100) + '%' : withOut((mobileTitleLeft * 2), ea),
          marginBottom: String(titleBottom) + ea,
          zIndex: mobile ? String(1) : "",
        },
        children: [
          {
            text: mainTitle,
            style: {
              position: "relative",
              display: "inline-block",
              top: String(titleTopNumber) + ea,
              fontSize: String(titleFontSize) + ea,
              fontWeight: String(800),
              background: desktop ? colorChip.white : colorChip.gray1,
              paddingRight: String(numberRight) + ea,
              color: colorChip.black,
            }
          },
        ]
      },
      {
        style: {
          display: "block",
          position: "relative",
          width: desktop ? String(100) + '%' : withOut(mobilePaddingLeft * 2, ea),
          background: desktop ? "" : colorChip.white,
          boxShadow: mobile ? "0px 5px 12px -10px " + colorChip.gray5 : "",
          borderRadius: mobile ? String(1) + ea : "",
          overflow: "hidden",
          marginBottom: String(0) + ea,
          marginTop: desktop ? "" : String(14) + ea,
          paddingTop: String(contentsAreaPaddingTop) + ea,
          borderTop: desktop ? "1px solid " + colorChip.shadow : "",
          paddingLeft: desktop ? "" : String(mobilePaddingLeft) + ea,
          paddingRight: desktop ? "" : String(mobilePaddingLeft) + ea,
          paddingBottom: desktop ? "" : String(6) + ea,
        }
      },
    ]
  });
  tong = block.lastChild;


  // 1

  ({ title, contents, image } = mainContents[0]);

  createNode({
    mother: tong,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(contentsMarginBottom0) + ea,
    },
    children: [
      {
        style: {
          display: desktop ? "inline-block" : "block",
          position: "relative",
          verticalAlign: "top",
          width: desktop ? String(firstWidth) + ea : String(100) + '%',
          marginBottom: desktop ? "" : String(3) + ea,
        },
        children: [
          {
            text: title,
            style: {
              display: desktop ? "inline-block" : "block",
              position: "relative",
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(700),
              lineHeight: String(1.7),
              color: colorChip.black,
              textAlign: "left",
              background: colorChip.white,
              paddingRight: String(linePadding) + ea,
            },
            bold: {
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(700),
              color: colorChip.green,
            },
          }
        ]
      },
      {
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(contentsWordingSize) + ea,
          fontWeight: String(700),
          verticalAlign: "top",
          lineHeight: String(1.7),
          width: String(secondWidth) + ea,
          marginRight: String(secondMarginRight) + ea,
          color: colorChip.green,
        },
      },
      {
        mode: "img",
        attribute: {
          src: image,
        },
        style: {
          display: "inline-block",
          position: "relative",
          verticalAlign: "top",
          width: withOut(desktop ? firstWidth + secondWidth + secondMarginRight : secondWidth + secondMarginRight, ea),
          color: colorChip.black,
        },
      },
    ]
  });

  createNode({
    mother: tong,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(contentsMarginBottom0) + ea,
    },
    children: [
      {
        style: {
          display: desktop ? "inline-block" : "block",
          position: "relative",
          verticalAlign: "top",
          width: desktop ? String(firstWidth) + ea : String(100) + '%',
          marginBottom: desktop ? "" : String(1.5) + ea,
        },
        children: [
          {
            style: {
              display: desktop ? "inline-block" : "block",
              position: "relative",
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(700),
              lineHeight: String(1.7),
              color: colorChip.black,
              textAlign: "left",
              background: colorChip.white,
              paddingRight: String(linePadding) + ea,
            },
            bold: {
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(700),
              color: colorChip.green,
            },
          }
        ]
      },
      {
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(contentsWordingSize) + ea,
          fontWeight: String(700),
          verticalAlign: "top",
          lineHeight: String(1.7),
          width: String(secondWidth) + ea,
          marginRight: String(secondMarginRight) + ea,
          color: colorChip.green,
        },
      },
      {
        text: media[0] ? contents.join("\n") : contents.join(" "),
        style: {
          display: "inline-block",
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(400),
          verticalAlign: "top",
          lineHeight: String(1.7),
          width: withOut(desktop ? firstWidth + secondWidth + secondMarginRight : secondWidth + secondMarginRight, ea),
          textAlign: "left",
          color: colorChip.black,
        },
        bold: {
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(700),
          color: colorChip.black,
        },
        under: {
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(700),
          color: colorChip.green,
        },
      },
    ]
  });

   // 2

  ({ title, contents, factors } = mainContents[1]);

  createNode({
    mother: tong,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(contentsMarginBottom0 * 3) + ea,
    },
    children: [
      {
        style: {
          display: desktop ? "inline-block" : "block",
          position: "relative",
          verticalAlign: "top",
          width: desktop ? String(firstWidth) + ea : String(100) + '%',
          marginBottom: desktop ? "" : String(3) + ea,
        },
        children: [
          {
            style: {
              display: desktop ? "inline-block" : "block",
              position: "relative",
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(700),
              lineHeight: String(1.7),
              color: colorChip.black,
              textAlign: "left",
              background: colorChip.white,
              paddingRight: String(linePadding) + ea,
            },
            bold: {
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(700),
              color: colorChip.green,
            },
          }
        ]
      },
      {
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(contentsWordingSize) + ea,
          fontWeight: String(700),
          verticalAlign: "top",
          lineHeight: String(1.7),
          width: String(secondWidth) + ea,
          marginRight: String(secondMarginRight) + ea,
          color: colorChip.green,
        },
      },
      {
        text: "<b%< " + title + " >%b>\n" + (big ? contents.join("\n") : contents.join(" ")),
        style: {
          display: "inline-block",
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(400),
          verticalAlign: "top",
          lineHeight: String(1.7),
          width: withOut(desktop ? firstWidth + secondWidth + secondMarginRight : secondWidth + secondMarginRight, ea),
          textAlign: "left",
          color: colorChip.black,
          height: media[0] ? String(contentsHeight) + ea : "",
        },
        bold: {
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(800),
          color: colorChip.black,
        },
        under: {
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(800),
          color: colorChip.green,
        },
        children: [
          {
            style: {
              display: media[0] ? "block" : "none",
              position: "absolute",
              top: String(factorLineTop) + ea,
              left: String(factorLineLeft) + ea,
              width: String(factorLineWidth) + ea,
              height: String(factorLineHeight) + ea,
              border: "1px solid " + colorChip.gray3,
              borderTopLeftRadius: String(8) + "px",
              borderBottomLeftRadius: String(8) + "px",
              borderRight: String(0),
            }
          },
          {
            text: factors.map((str, index) => { return "<b%" + String(index + 1) + ".%b> " + str }).join("\n"),
            style: {
              display: "block",
              position: media[0] ? "absolute" : "relative",
              top: media[0] ? String(factorBoxTop) + ea : "",
              left: media[0] ? String(factorBoxLeft) + ea : "",
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(400),
              color: colorChip.black,
              lineHeight: String(1.7),
            },
            bold: {
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(400),
              color: colorChip.green,
            }
          }
        ]
      },
    ]
  });

  // 3

  ({ title, contents } = mainContents[2]);

  createNode({
    mother: tong,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(contentsMarginBottom0) + ea,
    },
    children: [
      {
        style: {
          display: desktop ? "inline-block" : "block",
          position: "relative",
          verticalAlign: "top",
          width: desktop ? String(firstWidth) + ea : String(100) + '%',
          marginBottom: desktop ? "" : String(3) + ea,
        },
        children: [
          {
            text: title,
            style: {
              display: desktop ? "inline-block" : "block",
              position: "relative",
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(700),
              lineHeight: String(1.7),
              color: colorChip.black,
              textAlign: "left",
              background: colorChip.white,
              paddingRight: String(linePadding) + ea,
            },
            bold: {
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(700),
              color: colorChip.green,
            },
          }
        ]
      },
      {
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(contentsWordingSize) + ea,
          fontWeight: String(700),
          verticalAlign: "top",
          lineHeight: String(1.7),
          width: String(secondWidth) + ea,
          marginRight: String(secondMarginRight) + ea,
          color: colorChip.green,
        },
      },
      {
        style: {
          display: "inline-flex",
          position: "relative",
          verticalAlign: "top",
          width: withOut(desktop ? firstWidth + secondWidth + secondMarginRight : secondWidth + secondMarginRight, ea),
          height: String(funcAreaHeight) + ea,
          background: colorChip.gray2,
          borderRadius: String(5) + "px",
          justifyContent: "center",
          alignItems: "center",
        },
        child: {
          style: {
            display: "inline-flex",
            position: "relative",
            width: withOut(funcAreaOuterPadding * 2, ea),
            height: withOut(funcAreaOuterPadding * 2, ea),
            borderRadius: String(5) + "px",
            background: colorChip.white,
            boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
            justifyContent: "center",
            alignItems: "center",
          },
          child: {
            mode: "img",
            attribute: {
              src: FeeManualJs.binaryPath + "/" + "feeFunction.svg",
            },
            style: {
              position: "relative",
              height: String(funcAreaContentsHeight) + ea,
            }
          }
        }
      },
    ]
  });

  createNode({
    mother: tong,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(contentsMarginBottom0 * 3) + ea,
    },
    children: [
      {
        style: {
          display: desktop ? "inline-block" : "block",
          position: "relative",
          verticalAlign: "top",
          width: desktop ? String(firstWidth) + ea : String(100) + '%',
          marginBottom: desktop ? "" : String(1.5) + ea,
        },
        children: [
          {
            text: "",
            style: {
              display: desktop ? "inline-block" : "block",
              position: "relative",
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(700),
              lineHeight: String(1.7),
              color: colorChip.black,
              textAlign: "left",
              background: colorChip.white,
              paddingRight: String(linePadding) + ea,
            },
            bold: {
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(700),
              color: colorChip.green,
            },
          }
        ]
      },
      {
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(contentsWordingSize) + ea,
          fontWeight: String(700),
          verticalAlign: "top",
          lineHeight: String(1.7),
          width: String(secondWidth) + ea,
          marginRight: String(secondMarginRight) + ea,
          color: colorChip.green,
        },
      },
      {
        text: contents.join("\n\n"),
        style: {
          display: "inline-block",
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(400),
          verticalAlign: "top",
          lineHeight: String(1.7),
          width: withOut(desktop ? firstWidth + secondWidth + secondMarginRight : secondWidth + secondMarginRight, ea),
          textAlign: "left",
          color: colorChip.black,
        },
        bold: {
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(700),
          color: colorChip.black,
        },
        under: {
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(700),
          color: colorChip.green,
        },
      },
    ]
  });


  // 4

  ({ title, contents } = mainContents[3]);

  createNode({
    mother: tong,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(contentsMarginBottom0) + ea,
    },
    children: [
      {
        style: {
          display: desktop ? "inline-block" : "block",
          position: "relative",
          verticalAlign: "top",
          width: desktop ? String(firstWidth) + ea : String(100) + '%',
          marginBottom: desktop ? "" : String(3) + ea,
        },
        children: [
          {
            text: title,
            style: {
              display: desktop ? "inline-block" : "block",
              position: "relative",
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(700),
              lineHeight: String(1.7),
              color: colorChip.black,
              textAlign: "left",
              background: colorChip.white,
              paddingRight: String(linePadding) + ea,
            },
            bold: {
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(700),
              color: colorChip.green,
            },
          }
        ]
      },
      {
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(contentsWordingSize) + ea,
          fontWeight: String(700),
          verticalAlign: "top",
          lineHeight: String(1.7),
          width: String(secondWidth) + ea,
          marginRight: String(secondMarginRight) + ea,
          color: colorChip.green,
        },
      },
      {
        style: {
          display: "inline-flex",
          position: "relative",
          verticalAlign: "top",
          width: withOut(desktop ? firstWidth + secondWidth + secondMarginRight : secondWidth + secondMarginRight, ea),
          height: String(funcAreaHeight) + ea,
          background: colorChip.gray2,
          borderRadius: String(5) + "px",
          justifyContent: "center",
          alignItems: "center",
        },
        child: {
          style: {
            display: "inline-flex",
            position: "relative",
            width: withOut(funcAreaOuterPadding * 2, ea),
            height: withOut(funcAreaOuterPadding * 2, ea),
            borderRadius: String(5) + "px",
            background: colorChip.white,
            boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
            justifyContent: "center",
            alignItems: "center",
          },
          child: {
            mode: "img",
            attribute: {
              src: FeeManualJs.binaryPath + "/" + "alphaFunction.svg",
            },
            style: {
              position: "relative",
              height: String(funcAreaAlphaContentsHeight) + ea,
            }
          }
        }
      },
    ]
  });

  createNode({
    mother: tong,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(contentsMarginBottom0 * 2) + ea,
    },
    children: [
      {
        style: {
          display: desktop ? "inline-block" : "block",
          position: "relative",
          verticalAlign: "top",
          width: desktop ? String(firstWidth) + ea : String(100) + '%',
          marginBottom: desktop ? "" : String(1.5) + ea,
        },
        children: [
          {
            text: "",
            style: {
              display: desktop ? "inline-block" : "block",
              position: "relative",
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(700),
              lineHeight: String(1.7),
              color: colorChip.black,
              textAlign: "left",
              background: colorChip.white,
              paddingRight: String(linePadding) + ea,
            },
            bold: {
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(700),
              color: colorChip.green,
            },
          }
        ]
      },
      {
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(contentsWordingSize) + ea,
          fontWeight: String(700),
          verticalAlign: "top",
          lineHeight: String(1.7),
          width: String(secondWidth) + ea,
          marginRight: String(secondMarginRight) + ea,
          color: colorChip.green,
        },
      },
      {
        text: contents.join("\n\n"),
        style: {
          display: "inline-block",
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(400),
          verticalAlign: "top",
          lineHeight: String(1.7),
          width: withOut(desktop ? firstWidth + secondWidth + secondMarginRight : secondWidth + secondMarginRight, ea),
          textAlign: "left",
          color: colorChip.black,
        },
        bold: {
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(700),
          color: colorChip.black,
        },
        under: {
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(700),
          color: colorChip.green,
        },
      },
    ]
  });

}

FeeManualJs.prototype.insertButtonBox = function () {
  const instance = this;
  const mother = this.mother;
  const { ea, baseTong, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, autoComma, svgMaker, downloadFile, selfHref } = GeneralJs;
  const buttonsClassName = "buttonsClassName";
  let margin;
  let paddingTop;
  let titleFontSize;
  let bottomMargin;
  let whiteBlock;
  let grayTong;
  let arrowBetween;
  let innerMargin;
  let arrowWidth, arrowHeight;
  let textTop;
  let textSize, textWeight;
  let textMarginLeft;
  let buttonHeight, buttonPadding;
  let buttonBetween;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 6 %%>;
  paddingTop =  <%% 52, 52, 44, 36, 6 %%>;

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;

  innerMargin = <%% 40, 40, 40, 40, 4 %%>;

  arrowBetween = <%% 5, 5, 5, 5, 4 %%>;
  arrowWidth = <%% 204, 203, 203, 203, 203 %%>;
  arrowHeight = <%% 100, 100, 100, 100, 100 %%>;

  textTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.2 %%>;
  textSize = <%% 17, 17, 15, 14, 2.5 %%>;
  textWeight = <%% 700, 700, 700, 700, 700 %%>;
  textMarginLeft = <%% 50, 50, 50, 50, 50 %%>;

  buttonPadding = <%% 20, 19, 18, 18, 2.1 %%>;
  buttonHeight = <%% 42, 42, 36, 32, 6.3 %%>;

  buttonBetween = <%% 6, 6, 5, 4, 0.5 %%>;

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      background: colorChip.white,
      paddingTop: String(paddingTop) + ea,
      paddingBottom: String(paddingTop) + ea,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
    },
    children: [
      {
        display: "block",
        position: "relative",
        width: withOut(margin * 2, ea),
        height: String(100) + '%',
        marginLeft: String(margin) + ea,
      }
    ]
  });
  whiteTong = whiteBlock.firstChild;

  grayTong = createNode({
    mother: whiteTong,
    style: {
      display: "flex",
      position: "relative",
      width: withOut(0, ea),
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
    }
  });

  createNode({
    mother: grayTong,
    event: {
      click: function (e) {
        let url;
        url = "";
        url += FRONTHOST;
        url += "/designer/manual.php";
        url += "?";
        url += "desid=";
        url += instance.designer.desid;
        selfHref(url);
      }
    },
    style: {
      display: "inline-flex",
      position: "relative",
      paddingLeft: String(buttonPadding) + ea,
      paddingRight: String(buttonPadding) + ea,
      marginRight: String(buttonBetween) + ea,
      height: String(buttonHeight) + ea,
      borderRadius: String(5) + "px",
      background: colorChip.gradientGray,
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      cursor: "pointer",
    },
    children: [
      {
        text: "콘솔 사용법",
        style: {
          display: "inline-block",
          position: "relative",
          top: String(textTop) + ea,
          fontSize: String(textSize) + ea,
          fontWeight: String(textWeight),
          color: colorChip.white,
        }
      }
    ]
  });

  createNode({
    mother: grayTong,
    event: {
      click: function (e) {
        let url;
        url = "";
        url += FRONTHOST;
        url += "/designer/partnership.php";
        url += "?";
        url += "desid=";
        url += instance.designer.desid;
        selfHref(url);
      }
    },
    style: {
      display: "inline-flex",
      position: "relative",
      paddingLeft: String(buttonPadding) + ea,
      paddingRight: String(buttonPadding) + ea,
      marginRight: String(buttonBetween) + ea,
      height: String(buttonHeight) + ea,
      borderRadius: String(5) + "px",
      background: colorChip.gradientGray,
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      cursor: "pointer",
    },
    children: [
      {
        text: "파트너십 정보",
        style: {
          display: "inline-block",
          position: "relative",
          top: String(textTop) + ea,
          fontSize: String(textSize) + ea,
          fontWeight: String(textWeight),
          color: colorChip.white,
        }
      }
    ]
  });

  createNode({
    mother: grayTong,
    event: {
      click: function (e) {
        let url;
        url = "";
        url += FRONTHOST;
        url += "/designer/provision.php";
        url += "?";
        url += "desid=";
        url += instance.designer.desid;
        selfHref(url);
      }
    },
    style: {
      display: "inline-flex",
      position: "relative",
      paddingLeft: String(buttonPadding) + ea,
      paddingRight: String(buttonPadding) + ea,
      marginRight: String(buttonBetween) + ea,
      height: String(buttonHeight) + ea,
      borderRadius: String(5) + "px",
      background: colorChip.gradientGray,
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      cursor: "pointer",
    },
    children: [
      {
        text: "디자이너 가이드",
        style: {
          display: "inline-block",
          position: "relative",
          top: String(textTop) + ea,
          fontSize: String(textSize) + ea,
          fontWeight: String(textWeight),
          color: colorChip.white,
        }
      }
    ]
  });

  createNode({
    mother: grayTong,
    event: {
      click: function (e) {
        let url;
        url = "";
        url += FRONTHOST;
        url += "/designer/provision.php";
        url += "?mode=contract&";
        url += "desid=";
        url += instance.designer.desid;
        selfHref(url);
      }
    },
    style: {
      display: "inline-flex",
      position: "relative",
      paddingLeft: String(buttonPadding) + ea,
      paddingRight: String(buttonPadding) + ea,
      // marginRight: String(buttonBetween) + ea,
      height: String(buttonHeight) + ea,
      borderRadius: String(5) + "px",
      background: colorChip.gradientGray,
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      cursor: "pointer",
    },
    children: [
      {
        text: "계약 내역",
        style: {
          display: "inline-block",
          position: "relative",
          top: String(textTop) + ea,
          fontSize: String(textSize) + ea,
          fontWeight: String(textWeight),
          color: colorChip.white,
        }
      }
    ]
  });

}

FeeManualJs.prototype.launching = async function (loading) {
  const instance = this;
  const { returnGet, ajaxJson, serviceParsing, colorChip } = GeneralJs;
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
    let cliid, clients, client;
    let proid, projects, project;
    let whereQuery;
    let desid, designers, designer;
    let requestNumber;
    let service;
    let response, services;
    let ghostContents;
    let socket;
    let wsLaunching;
    let wsOpenEvent;
    let wsMessageEvent;
    let wsCloseEvent;

    if (getObj.desid === undefined) {
      window.alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }

    desid = getObj.desid;
    this.desid = desid;
    designers = await ajaxJson({ whereQuery: { desid } }, SECONDHOST + "/getDesigners", { equal: true });
    if (designers.length === 0) {
      window.alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }
    [ designer ] = designers;
    this.designer = designer;

    await this.mother.ghostDesignerLaunching({
      name: "feeManual",
      designer: this.designer,
      base: {
        instance: this,
        binaryPath: FeeManualJs.binaryPath,
        subTitle: "",
      },
      local: async () => {
        try {
          let whiteBlock;
          instance.insertInitBox();
          instance.insertFirstBox();
          instance.insertMainDescriptionBox();
          instance.insertButtonBox();
        } catch (e) {
          await GeneralJs.ajaxJson({ message: "FeeManualJs.launching.ghostDesignerLaunching : " + e.message }, BACKHOST + "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

  } catch (err) {
    console.log(err);
    await GeneralJs.ajaxJson({ message: "FeeManualJs.launching 에러 일어남 => " + err.message }, BACKHOST + "/errorLog");
  }
}
