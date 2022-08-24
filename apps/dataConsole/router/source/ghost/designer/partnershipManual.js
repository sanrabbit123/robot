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
      "return ('파트너십 매뉴얼 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('파트너십 매뉴얼 | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "partnershipManual",
  "hangul": "파트너십 매뉴얼",
  "route": [
    "partnershipManual"
  ]
} %/%/g

const PartnershipManualJs = function () {
  this.mother = new GeneralJs();
}

PartnershipManualJs.binaryPath = FRONTHOST + "/middle/console/partnership";

PartnershipManualJs.prototype.insertInitBox = function () {
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

  titleWording = "파트너십 매뉴얼";
  subTitleContents = "홈리에종 디자이너 파트너십 매뉴얼";

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

PartnershipManualJs.prototype.insertFirstBox = function () {
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

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 4.7 %%>;
  paddingTop =  <%% 52, 52, 44, 36, 4.7 %%>;

  whiteBottomMargin = <%% 42, 42, 42, 42, 0 %%>;

  firstWidth = <%% 572, 572, 572, 572, 50 %%>;
  firstPaddingLeft = <%% 28, 28, 28, 28, 2 %%>;

  barTop = <%% 11, 11, 11, 11, 11 %%>;
  barWidth = <%% 6, 6, 6, 6, 6 %%>;
  barHeight = <%% 62, 62, 62, 62, 62 %%>;

  titleSize = <%% 27, 27, 27, 27, 27 %%>;
  titleWeight = <%% 800, 800, 800, 800, 800 %%>;
  titleLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;

  contentsSize = <%% 15, 15, 15, 15, 15 %%>;
  contentsWeight = <%% 600, 600, 600, 600, 600 %%>;
  contentsLineHeight = <%% 1.7, 1.7, 1.7, 1.7, 1.7 %%>;
  contentsBetween = <%% 20, 20, 20, 20, 20 %%>;

  contents = {
    title: [
      "홈리에종과 파트너십 디자이너가",
      "지속적으로 협업하기 위한 정책 안내"
    ],
    description: [
      [
        "홈리에종은 집을 디자인하는 새로운 방법을 안내합니다.",
        "디자이너의 성장을 위해 디자이너 역량 관리, 인프라 제공, 교육 등을 지원하고, 고객에게 가장 효과적이고, 만족스러운 홈스타일링이 되도록 혁신적인 서비스를 제공하고자 노력하며, 모두가 만족스러운 결과를 얻도록 고객 중심의 프로젝트를 홈리에종이 함께 케어합니다."
      ],
      [
        "홈리에종은 파트너입니다. 고객에게는 만족스러운 집과 편리한 서비스로, 디자이너에게는 지속적인 성장을 위한 폭넓은 지원으로 함께 의논하면서 함께 성장합니다."
      ]
    ]
  };

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      background: desktop ? colorChip.white : "",
      paddingTop: desktop ? String(paddingTop) + ea : "",
      paddingBottom: desktop ? String(paddingTop) + ea : "",
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


  createNode({
    mother: whiteTong,
    style: {
      display: "inline-block",
      position: "relative",
      width: String(firstWidth - firstPaddingLeft) + ea,
      paddingLeft: String(firstPaddingLeft) + ea,
      verticalAlign: "top",
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
      display: "inline-block",
      position: "relative",
      width: withOut(firstWidth, ea),
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

PartnershipManualJs.prototype.insertContextBox = function () {
  const instance = this;
  const mother = this.mother;
  const { client, ea, baseTong, media, project } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, autoComma, svgMaker } = GeneralJs;
  let paddingTop;
  let whiteBlock, whiteTong;
  let bottomMargin;
  let whiteBottomMargin;
  let grayInnerPadding;
  let contents;
  let contextTong;
  let grayInnerPaddingLeft;
  let titleSize, titleWeight, titleMarginBottom;
  let contextPadding;
  let arrowWidth, arrowHeight, arrowTop;
  let contextBetween;
  let contentsSize, contentsWeight;
  let numberWeight, numberWidth;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 4.7 %%>;
  paddingTop =  <%% 52, 52, 44, 36, 4.7 %%>;

  whiteBottomMargin = <%% 42, 42, 42, 42, 0 %%>;

  grayInnerPadding = <%% 40, 40, 40, 40, 30 %%>;
  grayInnerPaddingLeft = <%% 72, 72, 72, 72, 40 %%>;

  titleSize = <%% 19, 19, 19, 19, 19 %%>;
  titleWeight = <%% 700, 700, 700, 700, 700 %%>;
  titleMarginBottom = <%% 16, 16, 16, 16, 16 %%>;

  contextPadding = <%% 56, 56, 56, 56, 56 %%>;

  arrowWidth = <%% 48, 48, 48, 48, 48 %%>;
  arrowHeight = <%% 6, 6, 6, 6, 6 %%>;
  arrowTop = <%% 7, 7, 7, 7, 7 %%>;

  contextBetween = <%% 6, 6, 6, 6, 6 %%>;

  contentsSize = <%% 15, 15, 15, 15, 15 %%>;
  contentsWeight = <%% 600, 600, 600, 600, 600 %%>;

  numberWeight = <%% 300, 300, 300, 300, 300 %%>;
  numberWidth = <%% 30, 30, 30, 30, 30 %%>;

  contents = [
    {
      title: "프로젝트 사전 준비",
      context: [
        "디자이너 교육 이수",
        "활동 가능 영역 책정",
        "서비스 비용 책정",
        "디자이너 작업 가능 일정",
      ]
    },
    {
      title: "첫 프로젝트 운영",
      context: [
        "첫 프로젝트 응대",
        "디자이너 직접 시공",
        "현장 촬영",
        "디자이너 글 가이드",
      ]
    },
    {
      title: "컨텐츠 가이드",
      context: [
        "컨텐츠 활용 방법",
        "홈리에종 제공 컨텐츠",
      ]
    },
    {
      title: "디자이너 프로젝트 진행",
      context: [
        "디자이너 현장미팅 준비 / 응대",
        "디자이너 작성 폼",
        "시공사 선택",
        "디자이너 소통",
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
      paddingTop: desktop ? String(paddingTop) + ea : "",
      paddingBottom: desktop ? String(paddingTop) + ea : "",
      marginBottom: String(bottomMargin) + ea,
      boxShadow: desktop ? "0px 5px 12px -10px " + colorChip.gray5 : "",
    },
    children: [
      {
        display: "block",
        position: "relative",
        width: withOut(margin * 2, ea),
        marginLeft: String(desktop ? margin : 0) + ea,
        borderRadius: String(desktop ? 8 : 1) + ea,
        paddingTop: String(grayInnerPadding) + ea,
        paddingBottom: String(grayInnerPadding) + ea,
        background: colorChip.gray1,
      }
    ]
  });
  whiteTong = whiteBlock.firstChild;

  for (let i = 0; i < contents.length; i++) {

    contextTong = createNode({
      mother: whiteTong,
      style: {
        display: "inline-block",
        width: "calc(calc(100% - " + String(grayInnerPaddingLeft * 2) + ea + ") / " + String(contents.length) + ")",
        verticalAlign: "top",
        marginLeft: (i === 0 ? String(grayInnerPaddingLeft) + ea : ""),
        marginRight: (i === contents.length - 1 ? String(grayInnerPaddingLeft) + ea : ""),
      },
      children: [
        {
          text: contents[i].title,
          style: {
            display: "block",
            position: "relative",
            fontSize: String(titleSize) + ea,
            fontWeight: String(titleWeight),
            color: colorChip.black,
            marginBottom: String(titleMarginBottom) + ea,
          }
        },
        {
          style: {
            display: "block",
            position: "relative",
          }
        }
      ]
    }).children[1];

    for (let j = 0; j < contents[i].context.length; j++) {

      createNode({
        mother: contextTong,
        style: {
          display: "block",
          position: "relative",
          marginBottom: String(contextBetween) + ea,
          paddingLeft: String(contextPadding) + ea,
        },
        children: [
          {
            mode: "svg",
            source: svgMaker.horizontalArrow(arrowWidth, arrowHeight, colorChip.gray4),
            style: {
              position: "absolute",
              left: String(0),
              top: String(arrowTop) + ea,
              width: String(arrowWidth) + ea,
            }
          },
          {
            text: String(i + 1) + "-" + String(j + 1),
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(contentsSize) + ea,
              fontWeight: String(numberWeight),
              color: colorChip.green,
              verticalAlign: "top",
              width: String(numberWidth) + ea,
            }
          },
          {
            text: contents[i].context[j],
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(contentsSize) + ea,
              fontWeight: String(contentsWeight),
              color: colorChip.black,
              verticalAlign: "top",
            }
          }
        ]
      });

    }

  }

}

PartnershipManualJs.prototype.insertPreProjectBox = function () {
  const instance = this;
  const mother = this.mother;
  const { client, ea, baseTong, media, project } = this;
  const mobile = media[4];
  const desktop = !mobile;
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

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 4.7 %%>;
  paddingTop =  <%% 52, 52, 44, 36, 4.7 %%>;

  whiteBottomMargin = <%% 42, 42, 42, 42, 0 %%>;

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;
  numberRight = <%% 12, 12, 12, 12, 3 %%>;

  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  titleBottom = <%% (isMac() ? 16 : 14), (isMac() ? 16 : 14), (isMac() ? 16 : 14), (isMac() ? 16 : 14), 0 %%>;
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
  firstWidth = <%% 240, 240, 190, 170, 10 %%>;
  secondWidth = <%% 15, 15, 15, 15, 2 %%>;
  secondMarginRight = <%% 10, 10, 10, 10, 2 %%>;

  checkBoxWidth = <%% 10, 10, 10, 10, 2 %%>;
  arrowBoxWidth = <%% 9, 8, 8, 8, 1.8 %%>;
  checkBoxTop = <%% (isMac() ? 8 : 5.5), (isMac() ? 7 : 5), (isMac() ? 7 : 4.5), (isMac() ? 6.5 : 4), 1.6 %%>;
  arrowBoxTop = <%% (isMac() ? 8 : 5.5), (isMac() ? 7 : 5), (isMac() ? 7 : 4.5), (isMac() ? 6.5 : 4), 1.5 %%>;

  contentsMarginBottom0 = <%% 24, 24, 24, 24, 2 %%>;
  contentsMarginBottom1 = <%% 32, 32, 30, 28, 3 %%>;

  lineTop = <%% 10, 10, 10, 10, 10 %%>;
  linePadding = <%% 12, 12, 12, 12, 12 %%>;

  mobilePaddingLeft = 6;

  mobileContentsWordingSize = 3.2;

  contentsHeight = <%% 180, 180, 180, 180, 180 %%>;

  factorBoxTop = <%% 25, 25, 25, 25, 25 %%>;
  factorBoxLeft = <%% 920, 920, 920, 920, 920 %%>;

  factorLineTop = <%% 36, 36, 36, 36, 36 %%>;
  factorLineLeft = <%% 888, 888, 888, 888, 888 %%>;
  factorLineWidth = <%% 22, 22, 22, 22, 22 %%>;
  factorLineHeight = <%% 123, 123, 123, 123, 123 %%>;

  mainTitle = "프로젝트 운영을 위한 사전 준비";
  mainContents = [
    {
      title: "디자이너 교육 이수",
      contents: [
        "각 디자이너는 홈리에종에서 제공하는 디자이너 공통 교육을 이수해야만 홈리에종에서 제공하는 파트너십 프로젝트 진행을 할 수 있습니다.",
        "디자이너의 프로젝트 운영 방식을 이해하기 위한 과정으로 이수한 디자이너에게 우선적으로 프로젝트 참여 자격이 주어집니다.",
      ],
    },
    {
      title: "활동 가능 영역 및 서비스 비용 책정",
      contents: [
        "각 디자이너의 프로젝트 운영 방식을 이해하기 위한 과정으로 전체 내용은 공통 교육에서 우선적으로 설명 후,",
        "홈리에종 담당자가 개별적으로 연락을 취하여 확인합니다.",
      ],
      factors: [
        "서비스 제공 가능 지역",
        "활동 가능 서비스 영역",
        "프로젝트 운영(스케쥴 및 예산 운영)",
        "디자인 제안 방식",
        "시공 운영 방식",
        "스타일링 운영 방식(가구 및 패브릭 발주 가능 여부 등)",
      ],
    },
    {
      title: "디자이너 작업 가능 일정",
      contents: [
        "디자이너의 일정은 매월 마지막주 정기적으로 익월 일정을 확인합니다. 상시로 일정 변동이 있기 때문에 매월 확인한 일정 외에 변동사항이 생길 때마다 홈리에종 채널로 변동 일정을 공유해주셔야 합니다. 초기 계약시 [활동 대기] 단계에서 일정을 확인합니다. 디자이너는 <b%홈리에종의 서비스 유형(F, S, T, XT) 에 대하여 활동 가능 영역을 결정하고, 이에 따라 서비스 비용을 책정%b>합니다. 초기 계약시 책정한 서비스 비용은 프로젝트 누적 수량에 따라 달라질 수 있습니다. 작업 일정에 대한 답이 없다면, 계속 진행 가능함으로 판단하고 추천서에 등록되게 됩니다.",
        "이후부터 홈리에종은 디자이너 추천을 시작하고 고객의 선택을 기다리게 됩니다.\n프로젝트 계약이 확정되고 첫번째 현장 미팅이 잡히기까지의 소요시간을 예상할 수 없습니다.",
      ]
    }
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

  ({ title, contents } = mainContents[0]);

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
        text: contents.join("\n"),
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
        text: "<b%< " + title + " >%b>\n" + contents.join("\n"),
        style: {
          display: "inline-block",
          fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
          fontWeight: String(400),
          verticalAlign: "top",
          lineHeight: String(1.7),
          width: withOut(desktop ? firstWidth + secondWidth + secondMarginRight : secondWidth + secondMarginRight, ea),
          textAlign: "left",
          color: colorChip.black,
          height: String(contentsHeight) + ea,
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
              position: "absolute",
              top: String(factorBoxTop) + ea,
              left: String(factorBoxLeft) + ea,
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
          marginBottom: desktop ? "" : String(1.5) + ea,
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

PartnershipManualJs.prototype.insertFirstProjectBox = function () {
  const instance = this;
  const mother = this.mother;
  const { client, ea, baseTong, media, project } = this;
  const mobile = media[4];
  const desktop = !mobile;
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

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 4.7 %%>;
  paddingTop =  <%% 52, 52, 44, 36, 4.7 %%>;

  whiteBottomMargin = <%% 42, 42, 42, 42, 0 %%>;

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;
  numberRight = <%% 12, 12, 12, 12, 3 %%>;

  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  titleBottom = <%% (isMac() ? 16 : 14), (isMac() ? 16 : 14), (isMac() ? 16 : 14), (isMac() ? 16 : 14), 0 %%>;
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
  firstWidth = <%% 240, 240, 190, 170, 10 %%>;
  secondWidth = <%% 15, 15, 15, 15, 2 %%>;
  secondMarginRight = <%% 10, 10, 10, 10, 2 %%>;

  checkBoxWidth = <%% 10, 10, 10, 10, 2 %%>;
  arrowBoxWidth = <%% 9, 8, 8, 8, 1.8 %%>;
  checkBoxTop = <%% (isMac() ? 8 : 5.5), (isMac() ? 7 : 5), (isMac() ? 7 : 4.5), (isMac() ? 6.5 : 4), 1.6 %%>;
  arrowBoxTop = <%% (isMac() ? 8 : 5.5), (isMac() ? 7 : 5), (isMac() ? 7 : 4.5), (isMac() ? 6.5 : 4), 1.5 %%>;

  contentsMarginBottom0 = <%% 24, 24, 24, 24, 2 %%>;
  contentsMarginBottom1 = <%% 60, 60, 58, 56, 3 %%>;

  lineTop = <%% 10, 10, 10, 10, 10 %%>;
  linePadding = <%% 12, 12, 12, 12, 12 %%>;

  mobilePaddingLeft = 6;

  mobileContentsWordingSize = 3.2;

  contentsHeight = <%% 180, 180, 180, 180, 180 %%>;

  factorBoxTop = <%% 25, 25, 25, 25, 25 %%>;
  factorBoxLeft = <%% 920, 920, 920, 920, 920 %%>;

  factorLineTop = <%% 36, 36, 36, 36, 36 %%>;
  factorLineLeft = <%% 888, 888, 888, 888, 888 %%>;
  factorLineWidth = <%% 22, 22, 22, 22, 22 %%>;
  factorLineHeight = <%% 123, 123, 123, 123, 123 %%>;

  mainTitle = "첫 프로젝트 운영";
  mainContents = [
    {
      title: "첫 프로젝트 응대",
      contents: [
        "고객 첫 응대 시 홈리에종과 함께 프로젝트를 진행하는 협업의 관계라는 점과 디자인을 진행하면서\n불편 사항이 있는 경우 홈리에종을 통해 연락해달라고 안내해주세요.",
        "프로젝트를 마무리 후 인터뷰와 촬영을 진행하는데 <b%이는 프로젝트 검수(정산)와 디자이너를 지원하기 위해 중요한 과정임을 함께 설명%b>해주세요.\n모든 고객이 디자이너의 포트폴리오를 보고 선택하신 것처럼 최신의 포트폴리오가 누적되어야 디자이너가 계속해서 성장할 수 있기에 소중하게 관리되고 있으며 개인정보 노출 정도는 홈리에종과 조율할 수 있습니다.",
      ],
    },
    {
      title: "디자이너 시공사의\n직접 시공",
      contents: [
        "<b%디자이너가 직접 시공을 진행했을 경우 시공 계약서와 세부 내용이 담긴 견적서를 보내주세요!%b> 디자이너 직영 시공사가 있는 경우 사전에",
        "홈리에종과의 미팅을 통해서 시공 파트너사 등록을 진행해야 합니다. 디자이너 직영 시공사와 진행하는 과정에서 문제가 발생한 경우 홈리에종이 고객의 불편 사항 접수를 받게되고, 책임과 평가에 직접적으로 영향을 받기 때문에 필수적인 정책 등의 과정이 필요합니다.",
      ],
    },
    {
      title: "시공사와 계약시",
      contents: [
        "공정별 계약은 불가하며,",
        "선택하신 시공사와 직접 계약을 맺습니다.",
        "시공에 대한 모든 책임은 계약한 시공사에 있고,",
        "시공 복잡도에 따라 디자이너의 감리 비용이 일부 책정될 수 있습니다.",
        "모든 시공사는 경험에 따라 시공 방법이나 견적에 차이가 있을 수 있습니다.",
      ]
    }
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

  ({ title, contents } = mainContents[0]);

  createNode({
    mother: tong,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(contentsMarginBottom1) + ea,
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

  // 2

  ({ title, contents } = mainContents[1]);

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
        text: contents.join("\n"),
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

  // 3

  ({ title, contents } = mainContents[2]);

  createNode({
    mother: tong,
    style: {
      display: "block",
      position: "relative",
      paddingTop: String(34) + ea,
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
        style: {
          display: "inline-block",
          position: "relative",
          verticalAlign: "top",
          width: withOut(firstWidth + secondWidth + secondMarginRight + (12 * 2), ea),
          textAlign: "left",
          background: colorChip.gray2,
          borderRadius: String(5) + "px",
          padding: String(12) + ea,
        },
        children: [
          {
            text: title,
            style: {
              position: "absolute",
              top: String(-28) + ea,
              left: String(0),
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(700),
              color: colorChip.green,
            }
          },
          {
            style: {
              display: "flex",
              flexDirection: "row",
              position: "relative",
              background: colorChip.white,
              borderRadius: String(5) + "px",
              width: withOut(22 * 2, ea),
              paddingLeft: String(22) + ea,
              paddingRight: String(22) + ea,
              paddingTop: String(16) + ea,
              paddingBottom: String(4) + ea,
            },
            children: [
              {
                text: (new Array(contents.length)).fill(1).map((num, index) => { return '0' + String(num + index) }).join("\n"),
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(contentsWordingSize) + ea,
                  fontWeight: String(700),
                  lineHeight: String(2),
                  color: colorChip.black,
                  width: String(20) + ea,
                  textAlign: "center",
                }
              },
              {
                style: {
                  display: "inline-flex",
                  flexDirection: "column",
                  position: "relative",
                  width: String(110) + ea,
                  paddingTop: String(14) + ea,
                  paddingLeft: String(10) + ea,
                },
                children: (new Array(contents.length)).fill(null).map((n) => {
                  return {
                    style: {
                      position: "relative",
                      width: String(100) + ea,
                      height: String(28) + ea,
                      borderTop: "1px solid " + colorChip.gray3,
                    }
                  }
                }),
              },
              {
                text: contents.join("\n"),
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(contentsWordingSize) + ea,
                  fontWeight: String(700),
                  lineHeight: String(2),
                  color: colorChip.black,
                }
              }
            ]
          }
        ],
      },
    ]
  });

}

PartnershipManualJs.prototype.insertPhotoSettingBox = function () {
  const instance = this;
  const mother = this.mother;
  const { client, ea, baseTong, media, project } = this;
  const mobile = media[4];
  const desktop = !mobile;
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
  let preContents;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 4.7 %%>;
  paddingTop =  <%% 52, 52, 44, 36, 4.7 %%>;

  whiteBottomMargin = <%% 42, 42, 42, 42, 0 %%>;

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;
  numberRight = <%% 12, 12, 12, 12, 3 %%>;

  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  titleBottom = <%% (isMac() ? 16 : 14), (isMac() ? 16 : 14), (isMac() ? 16 : 14), (isMac() ? 16 : 14), 0 %%>;
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
  firstWidth = <%% 240, 240, 190, 170, 10 %%>;
  secondWidth = <%% 15, 15, 15, 15, 2 %%>;
  secondMarginRight = <%% 10, 10, 10, 10, 2 %%>;

  checkBoxWidth = <%% 10, 10, 10, 10, 2 %%>;
  arrowBoxWidth = <%% 9, 8, 8, 8, 1.8 %%>;
  checkBoxTop = <%% (isMac() ? 8 : 5.5), (isMac() ? 7 : 5), (isMac() ? 7 : 4.5), (isMac() ? 6.5 : 4), 1.6 %%>;
  arrowBoxTop = <%% (isMac() ? 8 : 5.5), (isMac() ? 7 : 5), (isMac() ? 7 : 4.5), (isMac() ? 6.5 : 4), 1.5 %%>;

  contentsMarginBottom0 = <%% 24, 24, 24, 24, 2 %%>;
  contentsMarginBottom1 = <%% 60, 60, 58, 56, 3 %%>;

  lineTop = <%% 10, 10, 10, 10, 10 %%>;
  linePadding = <%% 12, 12, 12, 12, 12 %%>;

  mobilePaddingLeft = 6;

  mobileContentsWordingSize = 3.2;

  contentsHeight = <%% 180, 180, 180, 180, 180 %%>;

  factorBoxTop = <%% 25, 25, 25, 25, 25 %%>;
  factorBoxLeft = <%% 920, 920, 920, 920, 920 %%>;

  factorLineTop = <%% 36, 36, 36, 36, 36 %%>;
  factorLineLeft = <%% 888, 888, 888, 888, 888 %%>;
  factorLineWidth = <%% 22, 22, 22, 22, 22 %%>;
  factorLineHeight = <%% 123, 123, 123, 123, 123 %%>;

  mainTitle = "촬영 및 세팅 가이드";
  mainContents = [
    {
      preContents: [
        "홈리에종과의 협업 포트폴리오는 가능한 현장을 정돈한 후 촬영하여 보존합니다.",
        "<b%1) 프로젝트의 종료를 검수하는 의미와 2) 디자이너의 지속적인 성장을 지원하고자 하는%b> 두 가지 의미를 가집니다.",
      ],
      contents: [
        "디자이너는 고객, 홈리에종과 촬영 일자를 맞추고 촬영 전 고객과 부족한 부분은 없는 지, 사전에 논의하여 촬영 준비를 합니다.",
        "디자이너가 준비할 수 있는 소품이 있다면 현장에서 배치를 해도 무방합니다.",
        "포토 실장님께 각 공간별 디자이너의 의도를 전달하며 원하는 촬영 부분에 대해 논의합니다.",
      ]
    },
    {
      title: "촬영 세팅 TIP",
      contents: [
        {
          title: "선 정리",
          contents: [
            "전자제품, 문어발 콘센트, TV케이블, 마우스 선 등을 정리해주시면 훨씬 깔끔한 사진을 얻을 수 있습니다.",
          ]
        },
        {
          title: "패브릭 정돈",
          contents: [
            "커튼 : 주름이 잘 잡히는 소재의 커튼이 아니라면 손으로 주름을 잡아주세요. 커튼 연 것, 친 것 모두 촬영하셔도 됩니다.",
            "쿠션 : 쪼글쪼글하지 않도록 탁탁 쳐서 볼륨감을 살려주세요.",
            "베딩 : 정면에서는 자락이 양쪽으로 균등하게 떨어지게 하는 것이 안정감 있습니다. 방향에 따라 한 쪽을 당겨 프레임이나 어수선한 부분을 가려도 좋아요.",
          ]
        },
        {
          title: "물건 정리",
          contents: [
            "텅 빈 집처럼 치우는 것보다는 적당한 사람냄새가 묻어나는 것이 좋아요. 그래도 수세미, 음식, 쓰레기통 등이 생활감이 많이 묻어나는 것들은 숨겨주세요.",
          ]
        },
        {
          title: "소품 세팅",
          contents: [
            "고객님이 구매하신 것 활용 : 같은 소품도 어떻게 배치하고 활용하는 지에 따라 확 다르다는 것을 고객님께 보여드릴 수 있어요.",
            "고객 후기에서도 많이 언급해 주시는데, 디자이너님이 손을 대주시니까 확 달라졌다고요!",
            "디자이너 준비 : 소품이 부족한 경우, 디자이너가 준비하여 추가 세팅하고 촬영합니다. 화병, 액자, 오브제, 쿠션, 조명 등을 챙겨오시는 편이에요. 홈리에종 디자이너님들 중에는 플로리스트 공부하시는 분들도 있답니다.",
          ]
        },
      ],
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

  ({ preContents, contents } = mainContents[0]);

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
          width: String(100) + '%',
          marginBottom: desktop ? "" : String(1.5) + ea,
        },
        children: [
          {
            text: preContents.join("\n"),
            style: {
              display: desktop ? "inline-block" : "block",
              position: "relative",
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(400),
              lineHeight: String(1.7),
              color: colorChip.black,
              textAlign: "left",
              background: colorChip.white,
              paddingRight: String(linePadding) + ea,
            },
            bold: {
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(700),
              color: colorChip.black,
            },
          }
        ]
      },
    ]
  });

  createNode({
    mother: tong,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(contentsMarginBottom1) + ea,
    },
    children: [
      {
        style: {
          display: desktop ? "inline-block" : "block",
          position: "relative",
          verticalAlign: "top",
          width: withOut(0, ea),
          marginBottom: desktop ? "" : String(1.5) + ea,
        },
        children: [
          {
            style: {
              display: "inline-block",
              position: "relative",
              width: String(424) + ea,
              paddingRight: String(16) + ea,
              verticalAlign: "top",
              paddingTop: String(13) + ea,
            },
            children: (new Array(contents.length)).fill(null).map((n, index) => {
              return {
                style: {
                  display: "block",
                  position: "relative",
                  borderTop: "1px solid " + colorChip.gray3,
                  height: String(23) + ea,
                }
              };
            }),
          },
          {
            text: (new Array(contents.length)).fill(null).map((n, index) => { return `${String(index + 1)}) ` }),
            style: {
              display: desktop ? "inline-block" : "block",
              position: "relative",
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(400),
              lineHeight: String(1.7),
              color: colorChip.deactive,
              textAlign: "left",
              background: colorChip.white,
              paddingRight: String(linePadding) + ea,
              width: String(12) + ea,
              verticalAlign: "top",
            }
          },
          {
            text: contents.join("\n"),
            style: {
              display: desktop ? "inline-block" : "block",
              position: "relative",
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(400),
              lineHeight: String(1.7),
              color: colorChip.black,
              textAlign: "left",
              background: colorChip.white,
              paddingRight: String(linePadding) + ea,
              verticalAlign: "top",
            },
            bold: {
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(700),
              color: colorChip.green,
            },
          }
        ]
      },
    ]
  });

  // 2

  ({ title, contents } = mainContents[1]);

  num = 0;
  for (let obj of contents) {
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
              text: num === 0 ? title : "",
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
          text: obj.title,
          style: {
            display: "inline-block",
            fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
            fontWeight: String(700),
            verticalAlign: "top",
            lineHeight: String(1.7),
            width: String(175) + ea,
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
        {
          text: obj.contents.join("\n"),
          style: {
            display: "inline-block",
            fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
            fontWeight: String(400),
            verticalAlign: "top",
            lineHeight: String(1.7),
            width: withOut(desktop ? firstWidth + secondWidth + secondMarginRight + 175 : secondWidth + secondMarginRight, ea),
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
    num++;
  }

}

PartnershipManualJs.prototype.launching = async function (loading) {
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
    let designers, designer;
    let requestNumber;
    let service;
    let response, services;
    let ghostContents;

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
      name: "partnershipManual",
      designer: this.designer,
      base: {
        instance: this,
        binaryPath: PartnershipManualJs.binaryPath,
        subTitle: "",
      },
      local: async () => {
        try {
          let whiteBlock;
          instance.insertInitBox();
          instance.insertFirstBox();
          instance.insertContextBox();
          instance.insertPreProjectBox();
          instance.insertFirstProjectBox();
          instance.insertPhotoSettingBox();
        } catch (e) {
          await GeneralJs.ajaxJson({ message: "PartnershipManualJs.launching.ghostClientLaunching : " + e.message }, BACKHOST + "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

  } catch (err) {
    console.log(err);
    await GeneralJs.ajaxJson({ message: "PartnershipManualJs.launching 에러 일어남 => " + err.message }, BACKHOST + "/errorLog");
  }
}
