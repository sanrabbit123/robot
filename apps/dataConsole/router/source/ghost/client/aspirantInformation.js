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
      "return ('홈리에종 디자이너 파트너십 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('홈리에종 디자이너 파트너십 페이지 입니다! | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "aspirantInformation",
  "hangul": "디자이너 파트너십",
  "route": [
    "aspirantInformation"
  ]
} %/%/g

const AspirantInformationJs = function () {
  this.mother = new GeneralJs();
}

AspirantInformationJs.binaryPath = FRONTHOST + "/middle/aspinformation";

AspirantInformationJs.prototype.insertInitBox = function () {
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

  titleWording = "디자이너 파트너십";
  subTitleContents = "홈리에종 디자이너 파트너십에 대한 안내입니다.";

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

AspirantInformationJs.prototype.insertNoticeBox = function () {
  const instance = this;
  const mother = this.mother;
  const { ea, baseTong, media, aspirant } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, autoComma, svgMaker } = GeneralJs;
  const blank = "&nbsp;&nbsp;&nbsp;";
  const mainContents = [
    {
      title: "홈리에종 파트너십",
      contents: [
        "홈리에종이 단순 매칭 플랫폼이 아닙니다. 홈리에종은 '고객 중심의 인테리어'라는 뚜렷한 미션을 가지고 인테리어 업계에 꼭 필요한 변화를 이끌어가고 있는 기업이고, 제대로 된 홈스타일링 프로젝트 방식의 보존과 대중화에 힘쓰고 있는 플랫폼의 역할을 하고 있습니다.",
      ]
    },
    {
      title: "파트너십 등록 과정",
      contents: [
        "신규 디자이너 파트너십 신청을 해주시면, 먼저 유선상의 파트너십 설명과 동의 및 진행 여부를 확인하게 됩니다. 그 후, 파트너십을 진행하기로 한 디자이너님들을 대상으로 행정 서류 제출과 등록비 입금이 이루어지고, 대표님 미팅 및 교육까지 마치시면, 정보 체크와 프로필 업로드를 통해 본격적으로 디자이너로서 활동할 수 있게 됩니다."
      ]
    },
  ];
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
  let backImageHeight;
  let backImageMarginBottom;
  let quoteWidth;
  let quoteMarginBottom;
  let helloSize, helloWeight, helloLineHeight;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 4.7 %%>;
  paddingTop =  <%% 52, 52, 44, 36, 4.7 %%>;

  whiteBottomMargin = <%% 40, 36, 30, 22, 0 %%>;

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;
  numberRight = <%% 12, 12, 12, 12, 3 %%>;

  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  titleBottom = <%% (isMac() ? 12 : 10), (isMac() ? 12 : 10), (isMac() ? 12 : 10), (isMac() ? 10 : 8), 0 %%>;
  contentsAreaPaddingTop = <%% 34, 34, 32, 28, 6 %%>;

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

  contentsMarginBottom0 = <%% 4, 4, 4, 4, 2 %%>;
  contentsMarginBottom1 = <%% 32, 32, 30, 28, 3 %%>;

  lineTop = <%% 10, 10, 10, 10, 10 %%>;
  linePadding = <%% 12, 12, 12, 12, 12 %%>;

  backImageHeight = <%% 150, 150, 145, 140, 33 %%>;
  backImageMarginBottom = <%% 36, 36, 32, 30, 6 %%>;

  quoteWidth = <%% 16, 16, 15, 14, 2.5 %%>;
  quoteMarginBottom = <%% 8, 8, 7, 6, 0.8 %%>;

  helloSize = <%% 15, 15, 14, 14, 3.2 %%>;
  helloWeight = <%% 700, 700, 700, 700, 700 %%>;
  helloLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;

  mobilePaddingLeft = 6;

  mobileContentsWordingSize = 3.2;

  this.whiteMargin = (desktop ? margin : 0);

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      background: colorChip.white,
      paddingTop: desktop ? String(paddingTop + (desktop ? 0 : 1.7)) + ea : "",
      paddingBottom: String(whiteBottomMargin) + ea,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
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
      paddingTop: desktop ? "" : String(6) + ea,
    },
    children: [
      {
        style: {
          display: "flex",
          position: "relative",
          width: desktop ? withOut(0, ea) : withOut(6 * 2, ea),
          left: mobile ? String(6) + ea : "",
          height: String(backImageHeight) + ea,
          backgroundPosition: "50% 50%",
          backgroundSize: "101% auto",
          backgroundImage: "url('" + AspirantInformationJs.binaryPath + "/noticeBack.jpg" + "')",
          marginBottom: String(backImageMarginBottom) + ea,
          borderRadius: String(5) + "px",
          overflow: "hidden",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        },
        children: [
          {
            style: {
              position: "absolute",
              top: String(0),
              left: String(0),
              width: withOut(0, ea),
              height: withOut(0, ea),
              background: colorChip.realBlack,
              opacity: String(0.4),
            }
          },
          {
            mode: "svg",
            source: svgMaker.doubleQuote(colorChip.white),
            style: {
              display: "inline-block",
              position: "relative",
              width: String(quoteWidth) + ea,
              marginBottom: String(quoteMarginBottom) + ea,
            }
          },
          {
            text: (desktop ? [
              aspirant.designer + " 디자이너님, 안녕하세요! 홈리에종은 새롭게 인연이 닿은 실장님과",
              "홈스타일링 프로젝트를 함께 하게 되어 기대가 매우 큽니다!",
            ] : [
              aspirant.designer + " 디자이너님, 안녕하세요!",
              "홈리에종은 새롭게 인연이 닿은 실장님과",
              "홈스타일링 프로젝트를 함께",
              "하게 되어 기대가 매우 큽니다!",
            ]).join("\n"),
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(helloSize) + ea,
              fontWeight: String(helloWeight),
              lineHeight: String(helloLineHeight),
              color: colorChip.white,
              textAlign: "center",
            }
          }
        ]
      },
      {
        style: {
          display: "block",
          position: "relative",
          width: desktop ? String(100) + '%' : withOut(6 * 2, ea),
          marginBottom: String(titleBottom) + ea,
          left: mobile ? String(6) + ea : "",
          borderBottom: mobile ? "1px solid " + colorChip.shadow : "",
          paddingBottom: mobile ? String(1.5) + ea : "",
        },
        children: [
          {
            text: "디자이너 파트너십 안내",
            style: {
              position: "relative",
              display: "inline-block",
              top: String(titleTopNumber) + ea,
              fontSize: String(titleFontSize) + ea,
              fontWeight: String(800),
              background: colorChip.white,
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
          paddingTop: String(contentsAreaPaddingTop) + ea,
          borderTop: desktop ? "1px solid " + colorChip.shadow : "",
          paddingLeft: desktop ? "" : String(mobilePaddingLeft) + ea,
          paddingRight: desktop ? "" : String(mobilePaddingLeft) + ea,
          paddingBottom: desktop ? "" : String(5.5) + ea,
        }
      },
    ]
  });
  tong = block.lastChild;

  num = 0;
  for (let { title, contents } of mainContents) {
    num2 = 0;
    for (let str of contents) {
      createNode({
        mother: tong,
        style: {
          display: "block",
          position: "relative",
          marginBottom: String(num2 === contents.length - 1 ? contentsMarginBottom1 : contentsMarginBottom0) + ea,
          marginTop: desktop ? "" : ((num === 0 || num2 !== 0) ? "" : String(6) + ea)
        },
        children: [
          {
            text: (num2 === 0 ? String(num + 1) : ""),
            style: {
              display: desktop ? "inline-block" : "none",
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(600),
              verticalAlign: "top",
              lineHeight: String(1.6),
              width: String(zeroWidth) + ea,
              marginRight: String(zeroMarginRight) + ea,
              textAlign: "right",
              color: colorChip.green,
            }
          },
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
                  display: num2 === 0 ? "block" : "none",
                  position: "absolute",
                  top: String(0),
                  left: String(0),
                  height: String(lineTop) + ea,
                  width: withOut(0),
                  borderBottom: desktop ? "1px solid " + colorChip.gray3 : "",
                }
              },
              {
                text: (num2 === 0 ? (desktop ? title : "<b%" + String(num + 1) + "%b>" + blank + title) : ""),
                style: {
                  display: desktop ? "inline-block" : "block",
                  position: "relative",
                  fontSize: String(contentsWordingSize) + ea,
                  fontWeight: String(600),
                  lineHeight: String(1.6),
                  color: colorChip.black,
                  textAlign: "left",
                  background: colorChip.white,
                  paddingRight: String(linePadding) + ea,
                },
                bold: {
                  fontSize: String(contentsWordingSize) + ea,
                  fontWeight: String(600),
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
              fontWeight: String(600),
              verticalAlign: "top",
              lineHeight: String(1.6),
              width: String(secondWidth) + ea,
              marginRight: String(secondMarginRight) + ea,
              textAlign: desktop ? "right" : "left",
              color: colorChip.green,
            },
          },
          {
            text: str,
            style: {
              display: "inline-block",
              fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
              fontWeight: String(400),
              verticalAlign: "top",
              lineHeight: String(1.6),
              width: withOut(desktop ? zeroWidth + zeroMarginRight + firstWidth + secondWidth + secondMarginRight : secondWidth + secondMarginRight, ea),
              textAlign: "left",
              color: colorChip.black,
            },
            bold: {
              fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
              fontWeight: String(600),
              color: colorChip.black,
            },
            under: {
              fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
              fontWeight: String(600),
              color: colorChip.green,
            },
          },
        ]
      });

      num2++;
    }
    num++;
  }

}

AspirantInformationJs.prototype.insertHomeLiaisonBox = function () {
  const instance = this;
  const mother = this.mother;
  const { ea, baseTong, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const veryBig = (media[0] || media[1]);
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, autoComma, svgMaker } = GeneralJs;
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
  let grayBigHeight;
  let boxBetween;
  let boxLength;
  let bigSize, bigTextTop;
  let imageWidth;
  let imageBetween;
  let textTong;
  let contentsWordingWeight;
  let contentsWordingLineHeight;
  let contentsWordingMarginTop;
  let imagePosition;
  let mobileMargin;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 4.7 %%>;
  paddingTop =  <%% 52, 52, 44, 36, 4.7 %%>;

  whiteBottomMargin = <%% 40, 36, 30, 22, 0 %%>;

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;
  numberRight = <%% 12, 12, 12, 12, 3 %%>;

  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  titleBottom = <%% (isMac() ? 12 : 10), (isMac() ? 12 : 10), (isMac() ? 12 : 10), (isMac() ? 10 : 8), 0 %%>;
  contentsAreaPaddingTop = <%% 34, 34, 32, 28, 6 %%>;

  mobileTitleLeft = 1.5;
  mobileTitleTop = -8.7;

  secondBlockWidth = <%% 300, 300, 300, 300, 330 %%>;
  secondBlockMargin = <%% 36, 36, 36, 36, 33 %%>;

  contentsWordingSize = <%% 14.5, 14, 14, 13, 3.2 %%>;
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

  contentsMarginBottom0 = <%% 4, 4, 4, 4, 2 %%>;
  contentsMarginBottom1 = <%% 32, 32, 30, 28, 3 %%>;

  lineTop = <%% 10, 10, 10, 10, 10 %%>;
  linePadding = <%% 12, 12, 12, 12, 12 %%>;

  grayBigHeight = <%% 336, 400, 400, 360, 42 %%>;

  boxBetween = <%% 10, 10, 9, 8, 1 %%>;

  mobilePaddingLeft = 6;
  boxLength = 3;

  mobileContentsWordingSize = 3.2;

  bigSize = <%% 23, 19, 17, 13, 4.5 %%>;
  bigTextTop = <%% -3, -3, -3, -2, -0.3 %%>;

  imageWidth = <%% 720, 620, 480, 360, 72 %%>;
  imageBetween = <%% 30, 25, 24, 20, 1 %%>;

  contentsWordingWeight = <%% 400, 400, 400, 400, 400 %%>;
  contentsWordingMarginTop = <%% 22, 22, 21, 20, 4 %%>;
  contentsWordingLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;
  imagePosition = <%% 42, 42, 42, 42, 2 %%>;

  mobileMargin = 6;

  this.whiteMargin = (desktop ? margin : 0);

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      background: colorChip.white,
      paddingTop: desktop ? String(paddingTop + (desktop ? 0 : 1.7)) + ea : String(mobileMargin) + ea,
      paddingBottom: String(paddingTop) + ea,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
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
      display: desktop ? "inline-block" : "block",
      verticalAlign: "top",
      width: desktop ? String(imageWidth) + ea : withOut(mobileMargin * 2, ea),
      marginLeft: desktop ? "" : String(mobileMargin) + ea,
      height: String(grayBigHeight) + ea,
      position: "relative",
      borderRadius: String(5) + "px",
      backgroundImage: "url('" + AspirantInformationJs.binaryPath + "/a1.jpg" + "')",
      backgroundPosition: "50% " + String(imagePosition) + "%",
      backgroundSize: veryBig ? "100% auto" : (desktop ? "auto 100%" : "100% auto"),
    }
  });

  textTong = createNode({
    mother: whiteTong,
    style: {
      display: desktop ? "inline-flex" : "flex",
      position: "relative",
      verticalAlign: "top",
      width: desktop ?withOut(imageWidth + imageBetween, ea) : withOut(mobileMargin * 2, ea),
      height: desktop ? String(grayBigHeight) + ea : "",
      marginLeft: String(desktop ? imageBetween : mobileMargin) + ea,
      flexDirection: "column",
      justifyContent: desktop ? "end" : "start",
      alignItems: "start",
      marginTop: desktop ? "" : String(6) + ea,
      paddingBottom: desktop ? "" : String(3) + ea,
    }
  });

  createNode({
    mother: textTong,
    text: [
      "<b%디자이너와 함께 진행하는%b>",
      "홈스타일링 프로젝트",
    ].join("\n"),
    style: {
      display: "block",
      position: "relative",
      fontSize: String(titleFontSize) + ea,
      fontWeight: String(400),
      color: colorChip.black,
      lineHeight: String(1.4),
    },
    bold: {
      fontSize: String(titleFontSize) + ea,
      fontWeight: String(800),
      color: colorChip.black,
    }
  });

  if (mobile) {
    createNode({
      mother: textTong,
      style: {
        position: "absolute",
        top: String(8.4) + ea,
        left: String(34) + ea,
        width: String(42) + ea,
        borderBottom: "1px solid " + colorChip.black,
        height: String(0) + ea,
      }
    });
  }

  createNode({
    mother: textTong,
    text: [
      "홈리에종은 '고객 중심의 인테리어'라는 미션을 가지고 인테리어 업계에 꼭 필요한 변화를 이끌어가고 있습니다. 홈리에종은 18년 7월 법인으로 설립 후, 다양한 B2B 기관과 협력 중에 있으며 단순 커머스 플랫폼이 아니라 인테리어 컨시어지 서비스로 도약하기 위해 다양한 시도를 하며 성장하고 있습니다.",
      "홈리에종은 단순 매칭이 아니라, 디자이너 큐레이션부터 프로젝트 케어까지, 홈스타일링 연결과 진행에 걸쳐 전반적으로 운영하고 있습니다. 디자이너님께서는 홈리에종의 특징을 잘 파악해 주셔야 합니다."
    ].join("\n\n"),
    style: {
      display: "block",
      position: "relative",
      fontSize: String(contentsWordingSize) + ea,
      fontWeight: String(contentsWordingWeight),
      color: colorChip.black,
      marginTop: String(contentsWordingMarginTop) + ea,
      lineHeight: String(contentsWordingLineHeight),
    },
    bold: {
      fontSize: String(contentsWordingSize) + ea,
      fontWeight: String(800),
      color: colorChip.black,
      lineHeight: String(contentsWordingLineHeight),
    }
  });
  
}

AspirantInformationJs.prototype.insertDifferentBox = function () {
  const instance = this;
  const mother = this.mother;
  const { ea, baseTong, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const veryBig = (media[0] || media[1]);
  const big = (media[0] || media[1] || media[2]);
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, autoComma, svgMaker, variableArray } = GeneralJs;
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
  let grayBigHeight;
  let boxBetween;
  let boxLength;
  let bigSize, bigTextTop;
  let imageWidth;
  let imageBetween;
  let textTong;
  let contentsWordingWeight;
  let contentsWordingLineHeight;
  let contentsWordingMarginTop;
  let imagePosition;
  let titleBoxWidth;
  let factorBox;
  let factorBetween;
  let contents;
  let numberBoxWidth;
  let factorSize, factorWeight, factorBoldWeight;
  let lineBox;
  let standardWidth, lineWidth;
  let numberTextTop, factorTextTop;
  let textBottomLineTop;
  let centerToLeftLineWidth;
  let lineBoxHeight;
  let factorLineTop;
  let bottomLineLeft, bottomLineWidth;
  let standardWidth2;
  let numberBoxWidth2;
  let titleHeight;
  let mobileMargin;
  let mobileTitleBetween;
  let titleTong;
  let mobileLineTop, mobileLineLeft, mobileLineWidth;
  let mobileTextTongMarginBottom;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 4.7 %%>;
  paddingTop =  <%% 52, 52, 44, 36, 4.7 %%>;

  whiteBottomMargin = <%% 40, 36, 30, 22, 0 %%>;

  titleFontSize = <%% 21, 20, 17, 17, 4 %%>;
  numberRight = <%% 12, 12, 12, 12, 3 %%>;

  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  titleBottom = <%% (isMac() ? 12 : 10), (isMac() ? 12 : 10), (isMac() ? 12 : 10), (isMac() ? 10 : 8), 0 %%>;
  contentsAreaPaddingTop = <%% 34, 34, 32, 28, 6 %%>;

  mobileTitleLeft = 1.5;
  mobileTitleTop = -8.7;

  secondBlockWidth = <%% 300, 300, 300, 300, 330 %%>;
  secondBlockMargin = <%% 36, 36, 36, 36, 33 %%>;

  contentsWordingSize = <%% 14.5, 14, 14, 13, 3.2 %%>;
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

  contentsMarginBottom0 = <%% 4, 4, 4, 4, 2 %%>;
  contentsMarginBottom1 = <%% 32, 32, 30, 28, 3 %%>;

  lineTop = <%% 10, 10, 10, 10, 10 %%>;
  linePadding = <%% 12, 12, 12, 12, 12 %%>;

  grayBigHeight = <%% 224, 190, 170, 140, 36 %%>;

  boxBetween = <%% 5, 5, 4, 3, 1 %%>;

  mobilePaddingLeft = 6;
  boxLength = 3;

  mobileContentsWordingSize = 3.2;

  bigSize = <%% 23, 19, 17, 13, 4.5 %%>;
  bigTextTop = <%% -3, -3, -3, -2, -0.3 %%>;

  imageWidth = <%% 720, 720, 720, 720, 72 %%>;
  imageBetween = <%% 30, 25, 24, 20, 1 %%>;

  contentsWordingWeight = <%% 400, 400, 400, 400, 400 %%>;
  contentsWordingMarginTop = <%% 8, 6, 5, 4, 1 %%>;
  contentsWordingLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;
  imagePosition = <%% 26, 26, 26, 26, 2 %%>;

  titleBoxWidth = <%% 273, 233, 190, 200, 27 %%>;
  factorBetween = <%% 12, 10, 8, 6, 1 %%>;

  numberBoxWidth = <%% 32, 32, 28, 24, 6 %%>;
  numberBoxWidth2 = <%% 100, 80, 64, 72, 13.5 %%>;

  factorSize = <%% 18, 16, 14, 13, 3.2 %%>;
  factorWeight = <%% 300, 300, 300, 300, 300 %%>;
  factorBoldWeight = <%% 800, 800, 800, 800, 800 %%>;

  standardWidth = <%% 447, 388, 290, 360, 44 %%>;
  standardWidth2 = <%% 707, 510, 430, 440, 44 %%>;
  lineWidth = <%% 64, 0, 0, 0, 6 %%>;

  numberTextTop = <%% -1, -1, -1, -1, -1 %%>;
  factorTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.2 %%>;

  textBottomLineTop = <%% 65, 65, 65, 65, 65 %%>;
  centerToLeftLineWidth = <%% 169, 169, 169, 169, 169 %%>;
  lineBoxHeight = <%% 48, 48, 48, 48, 48 %%>;
  factorLineTop = <%% 23, 23, 23, 23, 23 %%>;

  bottomLineLeft = <%% -272, -272, -272, -272, -272 %%>;
  bottomLineWidth = <%% 209, 209, 209, 209, 209 %%>;

  titleHeight = (desktop ? 63 : 6);

  mobileMargin = 6;
  mobileTitleBetween = 3;

  mobileLineTop = 8.4;
  mobileLineLeft = 34;
  mobileLineWidth = 42;
  mobileTextTongMarginBottom = 2;

  this.whiteMargin = (desktop ? margin : 0);

  contents = {
    factors: [
      "고객의 <b%가용 예산을 고려%b>한 컨설팅",
      "시공 위주가 아닌 <b%삶 중심 디자인%b>",
      "<b%스타일링 완료%b>시, 프로젝트 종료",
      "<b%선 기획 후 시공,%b> 디자인 프로세스",
    ],
    essential: [
      desktop ? [ "마인드", "프로젝트 진행 시, 개인이 아닌 <b%홈리에종 디자이너%b>입니다." ] : [ "마인드", "개인이 아닌 <b%홈리에종의 디자이너%b>입니다." ],
      desktop ? [ "협업", "진행할 프로젝트의 <b%고객은 홈리에종의 고객%b>입니다." ] : [ "협업", "진행할 <b%고객은 홈리에종의 고객%b>입니다." ],
      desktop ? [ "일관성", "<b%모든 디자이너가 같은 마음%b>으로 홈리에종 고객을 대합니다." ] : [ "일관성", "<b%모든 디자이너가 한 마음%b>으로 고객을 대합니다." ],
      desktop ? [ "안내", "서비스의 부족함이 없도록 <b%명확하게 안내%b>합니다." ] : [ "안내", "부족함이 없도록 <b%명확하게 안내%b>합니다." ],
    ],
    homeliaison: [
      desktop ? "단순 서비스가 아닌, 여러 상황을 포함하고 있는 <b%고관여 서비스%b>입니다." : "여러 상황을 포함한 <b%고관여 서비스%b>입니다.",
      desktop ? "홈리에종은 <b%갈등이 최소화되도록 프로젝트 케어를 진행%b>합니다." : "홈리에종은 <b%갈등이 최소화되도록 케어를 진행%b>합니다.",
      desktop ? "촬영까지 안전하고 <b%완벽하게 마무리 될 수 있도록%b> 관리하고 있습니다." : "촬영까지 <b%완벽히 마무리 될 수 있도록%b> 관리하고 있습니다.",
      desktop ? "상황에 유연하게 대처할 수 있는 <b%디자이너의 협력 태도가 필요%b>합니다." : "상황에 대처할 수 있는 <b%디자이너의 협력이 필요%b>합니다.",
    ]
  }

  // 1

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      background: colorChip.white,
      paddingTop: desktop ? String(paddingTop + (desktop ? 0 : 1.7)) + ea : String(mobileMargin) + ea,
      paddingBottom: String(paddingTop) + ea,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
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

  titleTong = createNode({
    mother: whiteTong,
    style: {
      display: big ? "inline-flex" : "flex",
      position: "relative",
      verticalAlign: "top",
      width: desktop ? String(titleBoxWidth - imageBetween) + ea : withOut(mobileMargin * 2, ea),
      height: big ? String(grayBigHeight) + ea : (desktop ? String(titleHeight) + ea : ""),
      marginRight: desktop ? String(imageBetween) + ea : "",
      marginLeft: desktop ? "" : String(mobileMargin) + ea,
      flexDirection: "column",
      justifyContent: "start",
      alignItems: "start",
    },
    child: {
      text: [
        "<b%타 플랫폼과 핵심 차별점,%b>",
        (veryBig ? "모든 " : "") + "홈리에종 디자이너는",
      ].join("\n"),
      style: {
        display: "block",
        position: "relative",
        fontSize: String(titleFontSize) + ea,
        fontWeight: String(400),
        color: colorChip.black,
        lineHeight: String(1.4),
      },
      bold: {
        fontSize: String(titleFontSize) + ea,
        fontWeight: String(800),
        color: colorChip.black,
      }
    }
  });

  if (mobile) {
    createNode({
      mother: titleTong,
      style: {
        position: "absolute",
        top: String(mobileLineTop) + ea,
        left: String(mobileLineLeft) + ea,
        width: String(mobileLineWidth) + ea,
        borderBottom: "1px solid " + colorChip.black,
        height: String(0) + ea,
      }
    });
  }
  
  lineBox = createNode({
    mother: whiteTong,
    style: {
      display: media[0] ? "inline-flex" : "none",
      position: "relative",
      verticalAlign: "top",
      width: String(lineWidth) + ea,
      height: String(grayBigHeight) + ea,
      flexDirection: "column",
      justifyContent: "start",
      alignItems: "start",
    },
    children: [
      {
        style: {
          display: "inline-block",
          position: "absolute",
          left: String(0),
          top: String(factorLineTop) + ea,
          height: withOut(factorLineTop * 2, ea),
          width: withOut(factorBetween, ea),
          borderTop: "1px solid " + colorChip.gray3,
          borderLeft: "1px solid " + colorChip.gray3,
          borderBottom: "1px solid " + colorChip.gray3,
          borderTopLeftRadius: String(5) + "px",
          borderBottomLeftRadius: String(5) + "px",
        },
        children: [
          {
            style: {
              display: "block",
              position: "relative",
              borderBottom: "1px solid " + colorChip.gray3,
              width: withOut(0, ea),
              height: "calc(100% / 3)",
            }
          },
          {
            style: {
              display: "block",
              position: "relative",
              borderBottom: "1px solid " + colorChip.gray3,
              width: withOut(0, ea),
              height: "calc(100% / 3)",
            }
          },
        ]
      },
      {
        style: {
          display: "inline-block",
          position: "absolute",
          left: String(-1 * centerToLeftLineWidth) + ea,
          top: String(textBottomLineTop) + ea,
          height: String(lineBoxHeight) + ea,
          width: String(centerToLeftLineWidth) + ea,
          borderLeft: "1px solid " + colorChip.gray3,
          borderBottom: "1px solid " + colorChip.gray3,
          borderBottomLeftRadius: String(5) + "px",
        },
      },
      {
        style: {
          display: "inline-block",
          position: "absolute",
          left: String(bottomLineLeft) + ea,
          top: String(textBottomLineTop) + ea,
          height: String(0) + ea,
          width: String(bottomLineWidth) + ea,
          borderTop: "1px solid " + colorChip.gray3,
        },
      },
    ]
  })

  factorBox = createNode({
    mother: whiteTong,
    style: {
      display: desktop ? "inline-flex" : "flex",
      verticalAlign: "top",
      width: desktop ? String(standardWidth - lineWidth) + ea : withOut(mobileMargin * 2, ea),
      marginLeft: desktop ? "" : String(mobileMargin) + ea,
      height: String(grayBigHeight) + ea,
      flexDirection: "column",
      justifyContent: "start",
      alignItems: "start",
      marginTop: desktop ? "" : String(mobileTitleBetween) + ea,
      marginBottom: desktop ? "" : String(mobileMargin) + ea,
    },
    children: variableArray(contents.factors.length).map((index) => {
      return {
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          height: "calc(calc(100% - " + String(factorBetween * (contents.factors.length - 1)) + ea + ") / " + String(contents.factors.length) + ")",
          marginBottom: index === contents.factors.length - 1 ? "" : String(factorBetween) + ea,
          flexDirection: "row",
        },
        children: [
          {
            style: {
              width: String(numberBoxWidth) + ea,
              height: withOut(0, ea),
              display: "inline-flex",
              justifyContent: "start",
              alignItems: "center",
              position: "relative",
            },
            child: {
              text: String(index + 1),
              style: {
                position: "relative",
                top: String(numberTextTop) + ea,
                fontSize: String(factorSize) + ea,
                fontWeight: String(500),
                color: colorChip.black,
                fontFamily: "graphik",
              }
            }
          },
          {
            style: {
              width: withOut(numberBoxWidth, ea),
              height: withOut(0, ea),
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              background: colorChip.realBlack,
              borderRadius: String(5) + "px",
            },
            child: {
              text: contents.factors[index],
              style: {
                position: "relative",
                top: String(factorTextTop) + ea,
                fontSize: String(factorSize) + ea,
                fontWeight: String(factorWeight),
                color: colorChip.white,
              },
              bold: {
                fontSize: String(factorSize) + ea,
                fontWeight: String(factorBoldWeight),
                color: colorChip.white,
              }
            }
          },
        ]
      }
    })
  });

  textTong = createNode({
    mother: whiteTong,
    style: {
      display: desktop ? "inline-flex" : "flex",
      verticalAlign: "top",
      width: desktop ? withOut(standardWidth + imageBetween + (big ? titleBoxWidth : 0), ea) : withOut(mobileMargin * 2, ea),
      height: desktop ? String(grayBigHeight) + ea : "",
      marginLeft: String(desktop ? imageBetween : mobileMargin) + ea,
      flexDirection: "column",
      justifyContent: "end",
      alignItems: "start",
      marginBottom: desktop ? "" : String(mobileTextTongMarginBottom) + ea,
    }
  });

  createNode({
    mother: textTong,
    text: "홈리에종의 홈스타일링",
    style: {
      display: "block",
      position: "relative",
      fontSize: String(contentsWordingSize) + ea,
      fontWeight: String(800),
      color: colorChip.black,
      lineHeight: String(1.4),
    },
  });

  createNode({
    mother: textTong,
    text: "홈리에종의 홈스타일링 프로젝트는 일반적인 리모델링과 달리, '선 디자인 후 시공' 원칙을 기반으로 합니다. 시공 위주가 아닌 삶 중심의 기획으로, 스타일링까지 마무리되어야 프로젝트가 끝난 것으로 보며, 고객님의 가용 예산을 고려한 컨설팅을 중요시합니다.",
    style: {
      display: "block",
      position: "relative",
      fontSize: String(contentsWordingSize) + ea,
      fontWeight: String(contentsWordingWeight),
      color: colorChip.black,
      marginTop: String(contentsWordingMarginTop) + ea,
      lineHeight: String(contentsWordingLineHeight),
    },
    bold: {
      fontSize: String(contentsWordingSize) + ea,
      fontWeight: String(800),
      color: colorChip.black,
      lineHeight: String(contentsWordingLineHeight),
    }
  });
  

  // 2

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      background: colorChip.white,
      paddingTop: desktop ? String(paddingTop + (desktop ? 0 : 1.7)) + ea : String(mobileMargin) + ea,
      paddingBottom: String(paddingTop) + ea,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
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

  titleTong = createNode({
    mother: whiteTong,
    style: {
      display: big ? "inline-flex" : "flex",
      position: "relative",
      verticalAlign: "top",
      width: desktop ? String(titleBoxWidth - imageBetween) + ea : withOut(mobileMargin * 2, ea),
      height: big ? String(grayBigHeight) + ea : (desktop ? String(titleHeight) + ea : ""),
      marginRight: desktop ? String(imageBetween) + ea : "",
      marginLeft: desktop ? "" : String(mobileMargin) + ea,
      flexDirection: "column",
      justifyContent: "start",
      alignItems: "start",
    },
    child: {
      text: [
        "<b%파트너십의 4가지 요소,%b>",
        (veryBig ? "모든 " : "") + "홈리에종 디자이너는",
      ].join("\n"),
      style: {
        display: "block",
        position: "relative",
        fontSize: String(titleFontSize) + ea,
        fontWeight: String(400),
        color: colorChip.black,
        lineHeight: String(1.4),
      },
      bold: {
        fontSize: String(titleFontSize) + ea,
        fontWeight: String(800),
        color: colorChip.black,
      }
    }
  });

  if (mobile) {
    createNode({
      mother: titleTong,
      style: {
        position: "absolute",
        top: String(mobileLineTop) + ea,
        left: String(mobileLineLeft) + ea,
        width: String(mobileLineWidth) + ea,
        borderBottom: "1px solid " + colorChip.black,
        height: String(0) + ea,
      }
    });
  }

  lineBox = createNode({
    mother: whiteTong,
    style: {
      display: media[0] ? "inline-flex" : "none",
      position: "relative",
      verticalAlign: "top",
      width: String(lineWidth) + ea,
      height: String(grayBigHeight) + ea,
      flexDirection: "column",
      justifyContent: "start",
      alignItems: "start",
    },
    children: [
      {
        style: {
          display: "inline-block",
          position: "absolute",
          left: String(0),
          top: String(factorLineTop) + ea,
          height: withOut(factorLineTop * 2, ea),
          width: withOut(factorBetween, ea),
          borderTop: "1px solid " + colorChip.gray3,
          borderLeft: "1px solid " + colorChip.gray3,
          borderBottom: "1px solid " + colorChip.gray3,
          borderTopLeftRadius: String(5) + "px",
          borderBottomLeftRadius: String(5) + "px",
        },
        children: [
          {
            style: {
              display: "block",
              position: "relative",
              borderBottom: "1px solid " + colorChip.gray3,
              width: withOut(0, ea),
              height: "calc(100% / 3)",
            }
          },
          {
            style: {
              display: "block",
              position: "relative",
              borderBottom: "1px solid " + colorChip.gray3,
              width: withOut(0, ea),
              height: "calc(100% / 3)",
            }
          },
        ]
      },
      {
        style: {
          display: "inline-block",
          position: "absolute",
          left: String(-1 * centerToLeftLineWidth) + ea,
          top: String(textBottomLineTop) + ea,
          height: String(lineBoxHeight) + ea,
          width: String(centerToLeftLineWidth) + ea,
          borderLeft: "1px solid " + colorChip.gray3,
          borderBottom: "1px solid " + colorChip.gray3,
          borderBottomLeftRadius: String(5) + "px",
        },
      },
      {
        style: {
          display: "inline-block",
          position: "absolute",
          left: String(bottomLineLeft) + ea,
          top: String(textBottomLineTop) + ea,
          height: String(0) + ea,
          width: String(bottomLineWidth) + ea,
          borderTop: "1px solid " + colorChip.gray3,
        },
      },
    ]
  })

  factorBox = createNode({
    mother: whiteTong,
    style: {
      display: desktop ? "inline-flex" : "flex",
      verticalAlign: "top",
      width: desktop ? String(standardWidth2 - lineWidth) + ea : withOut(mobileMargin * 2, ea),
      marginLeft: desktop ? "" : String(mobileMargin) + ea,
      height: String(grayBigHeight) + ea,
      flexDirection: "column",
      justifyContent: "start",
      alignItems: "start",
      marginTop: desktop ? "" : String(mobileTitleBetween) + ea,
      marginBottom: desktop ? "" : String(mobileMargin) + ea,
    },
    children: variableArray(contents.essential.length).map((index) => {
      return {
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          height: "calc(calc(100% - " + String(factorBetween * (contents.essential.length - 1)) + ea + ") / " + String(contents.essential.length) + ")",
          marginBottom: index === contents.essential.length - 1 ? "" : String(factorBetween) + ea,
          flexDirection: "row",
        },
        children: [
          {
            style: {
              width: String(numberBoxWidth2 - boxBetween) + ea,
              marginRight: String(boxBetween) + ea,
              height: withOut(0, ea),
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              background: colorChip.green,
              borderRadius: String(5) + "px",
            },
            child: {
              text: contents.essential[index][0],
              style: {
                position: "relative",
                top: String(factorTextTop) + ea,
                fontSize: String(factorSize) + ea,
                fontWeight: String(factorBoldWeight),
                color: colorChip.white,
              }
            }
          },
          {
            style: {
              width: withOut(numberBoxWidth2, ea),
              height: withOut(0, ea),
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              background: colorChip.green,
              borderRadius: String(5) + "px",
            },
            child: {
              text: contents.essential[index][1],
              style: {
                position: "relative",
                top: String(factorTextTop) + ea,
                fontSize: String(factorSize) + ea,
                fontWeight: String(factorWeight),
                color: colorChip.white,
              },
              bold: {
                fontSize: String(factorSize) + ea,
                fontWeight: String(factorBoldWeight),
                color: colorChip.white,
              }
            }
          },
        ]
      }
    })
  });

  textTong = createNode({
    mother: whiteTong,
    style: {
      display: desktop ? "inline-flex" : "flex",
      verticalAlign: "top",
      width: desktop ? withOut(standardWidth2 + imageBetween + (big ? titleBoxWidth : 0), ea) : withOut(mobileMargin * 2, ea),
      height: desktop ? String(grayBigHeight) + ea : "",
      marginLeft: String(desktop ? imageBetween : mobileMargin) + ea,
      flexDirection: "column",
      justifyContent: "end",
      alignItems: "start",
      marginBottom: desktop ? "" : String(mobileTextTongMarginBottom) + ea,
    }
  });

  createNode({
    mother: textTong,
    text: "파트너십의 필수 요소",
    style: {
      display: "block",
      position: "relative",
      fontSize: String(contentsWordingSize) + ea,
      fontWeight: String(800),
      color: colorChip.black,
      lineHeight: String(1.4),
    },
  });

  createNode({
    mother: textTong,
    text: "고객님께 퀄리티 있고 일관된 인테리어를 제공하고자 하기에, 디자이너님께선 위와 같은 마인드, 협업, 일관성, 안내에 대한 인식이 꼭 필요합니다.",
    style: {
      display: "block",
      position: "relative",
      fontSize: String(contentsWordingSize) + ea,
      fontWeight: String(contentsWordingWeight),
      color: colorChip.black,
      marginTop: String(contentsWordingMarginTop) + ea,
      lineHeight: String(contentsWordingLineHeight),
    },
    bold: {
      fontSize: String(contentsWordingSize) + ea,
      fontWeight: String(800),
      color: colorChip.black,
      lineHeight: String(contentsWordingLineHeight),
    }
  });

  // 3

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      background: colorChip.white,
      paddingTop: desktop ? String(paddingTop + (desktop ? 0 : 1.7)) + ea : String(mobileMargin) + ea,
      paddingBottom: String(paddingTop) + ea,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
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

  titleTong = createNode({
    mother: whiteTong,
    style: {
      display: big ? "inline-flex" : "flex",
      position: "relative",
      verticalAlign: "top",
      width: desktop ? String(titleBoxWidth - imageBetween) + ea : withOut(mobileMargin * 2, ea),
      height: big ? String(grayBigHeight) + ea : (desktop ? String(titleHeight) + ea : ""),
      marginRight: desktop ? String(imageBetween) + ea : "",
      marginLeft: desktop ? "" : String(mobileMargin) + ea,
      flexDirection: "column",
      justifyContent: "start",
      alignItems: "start",
    },
    child: {
      text: [
        "<b%홈리에종 프로젝트 특징,%b>",
        (veryBig ? "모든 " : "") + "홈리에종 프로젝트는",
      ].join("\n"),
      style: {
        display: "block",
        position: "relative",
        fontSize: String(titleFontSize) + ea,
        fontWeight: String(400),
        color: colorChip.black,
        lineHeight: String(1.4),
      },
      bold: {
        fontSize: String(titleFontSize) + ea,
        fontWeight: String(800),
        color: colorChip.black,
      }
    }
  });

  if (mobile) {
    createNode({
      mother: titleTong,
      style: {
        position: "absolute",
        top: String(mobileLineTop) + ea,
        left: String(mobileLineLeft) + ea,
        width: String(mobileLineWidth) + ea,
        borderBottom: "1px solid " + colorChip.black,
        height: String(0) + ea,
      }
    });
  }

  lineBox = createNode({
    mother: whiteTong,
    style: {
      display: media[0] ? "inline-flex" : "none",
      position: "relative",
      verticalAlign: "top",
      width: String(lineWidth) + ea,
      height: String(grayBigHeight) + ea,
      flexDirection: "column",
      justifyContent: "start",
      alignItems: "start",
    },
    children: [
      {
        style: {
          display: "inline-block",
          position: "absolute",
          left: String(0),
          top: String(factorLineTop) + ea,
          height: withOut(factorLineTop * 2, ea),
          width: withOut(factorBetween, ea),
          borderTop: "1px solid " + colorChip.gray3,
          borderLeft: "1px solid " + colorChip.gray3,
          borderBottom: "1px solid " + colorChip.gray3,
          borderTopLeftRadius: String(5) + "px",
          borderBottomLeftRadius: String(5) + "px",
        },
        children: [
          {
            style: {
              display: "block",
              position: "relative",
              borderBottom: "1px solid " + colorChip.gray3,
              width: withOut(0, ea),
              height: "calc(100% / 3)",
            }
          },
          {
            style: {
              display: "block",
              position: "relative",
              borderBottom: "1px solid " + colorChip.gray3,
              width: withOut(0, ea),
              height: "calc(100% / 3)",
            }
          },
        ]
      },
      {
        style: {
          display: "inline-block",
          position: "absolute",
          left: String(-1 * centerToLeftLineWidth) + ea,
          top: String(textBottomLineTop) + ea,
          height: String(lineBoxHeight) + ea,
          width: String(centerToLeftLineWidth) + ea,
          borderLeft: "1px solid " + colorChip.gray3,
          borderBottom: "1px solid " + colorChip.gray3,
          borderBottomLeftRadius: String(5) + "px",
        },
      },
      {
        style: {
          display: "inline-block",
          position: "absolute",
          left: String(bottomLineLeft) + ea,
          top: String(textBottomLineTop) + ea,
          height: String(0) + ea,
          width: String(bottomLineWidth) + ea,
          borderTop: "1px solid " + colorChip.gray3,
        },
      },
    ]
  })

  factorBox = createNode({
    mother: whiteTong,
    style: {
      display: desktop ? "inline-flex" : "flex",
      verticalAlign: "top",
      width: desktop ? String(standardWidth2 - lineWidth) + ea : withOut(mobileMargin * 2, ea),
      marginLeft: desktop ? "" : String(mobileMargin) + ea,
      height: String(grayBigHeight) + ea,
      flexDirection: "column",
      justifyContent: "start",
      alignItems: "start",
      marginTop: desktop ? "" : String(mobileTitleBetween) + ea,
      marginBottom: desktop ? "" : String(mobileMargin) + ea,

    },
    children: variableArray(contents.homeliaison.length).map((index) => {
      return {
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          height: "calc(calc(100% - " + String(factorBetween * (contents.homeliaison.length - 1)) + ea + ") / " + String(contents.homeliaison.length) + ")",
          marginBottom: index === contents.homeliaison.length - 1 ? "" : String(factorBetween) + ea,
          flexDirection: "row",
        },
        children: [
          {
            style: {
              width: withOut(0, ea),
              height: withOut(0, ea),
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              background: colorChip.realBlack,
              borderRadius: String(5) + "px",
            },
            child: {
              text: contents.homeliaison[index],
              style: {
                position: "relative",
                top: String(factorTextTop) + ea,
                fontSize: String(factorSize) + ea,
                fontWeight: String(factorWeight),
                color: colorChip.white,
              },
              bold: {
                fontSize: String(factorSize) + ea,
                fontWeight: String(factorBoldWeight),
                color: colorChip.white,
              }
            }
          },
        ]
      }
    })
  });

  textTong = createNode({
    mother: whiteTong,
    style: {
      display: desktop ? "inline-flex" : "flex",
      verticalAlign: "top",
      width: desktop ? withOut(standardWidth2 + imageBetween + (big ? titleBoxWidth : 0), ea) : withOut(mobileMargin * 2, ea),
      height: desktop ? String(grayBigHeight) + ea : "",
      marginLeft: String(desktop ? imageBetween : mobileMargin) + ea,
      flexDirection: "column",
      justifyContent: "end",
      alignItems: "start",
      marginBottom: desktop ? "" : String(mobileTextTongMarginBottom) + ea,
    }
  });

  createNode({
    mother: textTong,
    text: "홈리에종 케어",
    style: {
      display: "block",
      position: "relative",
      fontSize: String(contentsWordingSize) + ea,
      fontWeight: String(800),
      color: colorChip.black,
      lineHeight: String(1.4),
    },
  });

  createNode({
    mother: textTong,
    text: "모든 홈스타일링 프로젝트는 홈리에종 케어 아래 운영됩니다. 디자이너님께선 홈리에종과 협업하며 함께 잘 끝낼 수 있도록 해주시면 됩니다!",
    style: {
      display: "block",
      position: "relative",
      fontSize: String(contentsWordingSize) + ea,
      fontWeight: String(contentsWordingWeight),
      color: colorChip.black,
      marginTop: String(contentsWordingMarginTop) + ea,
      lineHeight: String(contentsWordingLineHeight),
    },
    bold: {
      fontSize: String(contentsWordingSize) + ea,
      fontWeight: String(800),
      color: colorChip.black,
      lineHeight: String(contentsWordingLineHeight),
    }
  });

}

AspirantInformationJs.prototype.insertAspirantBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, ajaxJson, equalJson, cleanChildren } = GeneralJs;
  const { ea, media, standardWidth } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const inputClassName = "inputClassName";
  const agreeTargetClassName = "agreeTargetClassName";
  const variableBarClassName = "variableBarClassName";
  const fileTongClassName = "fileTongClassName";
  const noticeClassName = "noticeClassName";
  const blockTargetClassName = {
    career: "careerBlockTargetClassName",
    school: "schoolBlockTargetClassName",
  };
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
  let agreeToggleEvent;
  let emailBlurEvent;
  let bigAddressBlurEvent;
  let commentsFocusEvent, commentsBlurEvent;
  let greenNoticeWidth3, greenNoticeBottom3;
  let barDescriptionLingHeight;
  let barDescriptionTextTop;
  let barDescriptionSubSize;
  let barTongHeight, barTongMarginTop;
  let barTop, barHeight;
  let barFactorWeight;
  let barFactorTop;
  let barCircleTop, barCircleRadius;
  let barFactorA0Left, barFactorA1Left, barFactorA2Left;
  let barFactorB0Left;
  let mobileGrayTextAreaTop;
  let defaultRatio;
  let barClickEvent;
  let factorBetween;
  let inputTop;
  let titleWidth;
  let grayWidth;
  let subFontSize, subFontTop, subFontBetween;
  let fileChangeEvent;
  let grayTextTop;
  let grayMargin;
  let portfolioBlock;
  let mobileTitleLeft;
  let mobileTitleTop;
  let cardWidthNumber;
  let cardHeightNumber;
  let cardMargin;
  let cardHeight;
  let cardWordingSize;
  let cardInnerMargin;
  let cardInnerMarginTop;
  let xIconWidth;
  let xIconTop;
  let xVisual;
  let greenBasicFocusEvent;
  let greenBasicBlurEvent;
  let greenNumberFocusEvent;
  let greenNumberBlurEvent;
  let greenDateFocusEvent;
  let greenDateBlurEvent;
  let greenCareerFocusEvent;
  let greenCareerBlurEvent;
  let textareaBlurEvent;
  let greenLinkFocusEvent;
  let greenLinkBlurEvent;
  let plusSize;
  let questionWeight;
  let plusTextTop;
  let noticeCircleWidth;
  let noticeCircleTop;
  let noticeCircleMargin;
  let careerBlockGrayOuterMargin;
  let careerBlockOuterMargin;
  let careerBlockOuterMarginTop;
  let careerBlockOuterMarginBottom;
  let careerBlockInnerMargin;
  let careerBlockInnerMarginSmall;
  let careerBlockSize;
  let blockCancelWidth;
  let blockCancelTop;
  let careerBlockMarginLeft;
  let propertyWidth;
  let yearWidth;
  let monthWidth;
  let yearMonthTextWidth;
  let yearMonthTextMargin;
  let textareaVisualTop;
  let tempBlock;
  let careerBlocksRender;
  let careerBlockMinus;
  let plusValueCareer;
  let plusBlockEvent;
  let updateValueCareer;
  let deleteValueCareer;
  let titleFontSize;
  let numberRight;
  let titleTopNumber;
  let titleTop;
  let titleBottom;
  let contentsAreaPaddingTop;
  let finalAreaPaddingTop;

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;
  numberRight = <%% 12, 12, 12, 12, 3 %%>;

  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  titleBottom = <%% (isMac() ? 12 : 10), (isMac() ? 12 : 10), (isMac() ? 12 : 10), (isMac() ? 10 : 8), 0 %%>;
  contentsAreaPaddingTop = <%% 34, 34, 32, 28, 3 %%>;

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
  grayInputTop = <%% (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), -0.2 %%>;
  grayHeight = <%% 32, 32, 31, 31, 7 %%>;
  grayBigHeight = <%% 164, 137, 136, 135, 38 %%>;
  grayTextAreaTop = <%% 3, 3, 3, 3, 1.3 %%>;
  grayTextAreaWidth = <%% 51.7, 51.7, 51.7, 390, 51.7 %%>;

  moduleHeight = grayTop + grayHeight;
  blockMarginBottom = <%% 12, 12, 9, 9, 2 %%>;

  leftGrayType0 = <%% 101, 90, 78, 78, 18 %%>;
  leftGrayType1 = <%% 418, 361, 318, 96, 22.8 %%>;
  leftGrayType2 = <%% 125, 112, 98, 98, 22.8 %%>;
  leftGrayType3 = <%% 164, 151, 130, 129, 30.5 %%>;

  widthGrayType0 = <%% 160, 140, 140, 140, 34 %%>;
  widthGrayType1 = <%% 455, 272, 245, 178, 58.1 %%>;
  widthGrayType2 = <%% 757, 588, 503, 383, 53.4 %%>;
  widthGrayType3 = <%% 392, 211, 193, 127, 45.6 %%>;

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

  marginRatio = <%% 1.2, 1.2, 1.1, 1.1, 0.8 %%>;

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

  addressPromptWidth = <%% 800, 720, 640, 600, 80 %%>;
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
  greenNoticePaddingTop = <%% (isMac() ? 8 : 9), (isMac() ? 8 : 9), (isMac() ? 7 : 9), (isMac() ? 7 : 9), 1.9 %%>;
  greenNoticePaddingBottom = <%% (isMac() ? 9 : 7), (isMac() ? 9 : 7), (isMac() ? 8 : 7), (isMac() ? 8 : 7), 2.3 %%>;
  greenNoticePaddingLeft = <%% 11, 11, 10, 10, 2.4 %%>;
  greenNoticeBottom = <%% 40, 40, 40, 40, 9 %%>;
  greenNoticeBottom2 = <%% 36, 36, 36, 36, 9 %%>;
  greenNoticeLineHeight = <%% 1.4, 1.4, 1.4, 1.4, 1.4 %%>;
  greenNoticeWidth0 = <%% 96, 96, 96, 96, 28 %%>;
  greenNoticeWidth1 = <%% 120, 120, 120, 120, 28 %%>;
  greenNoticeWidth3 = <%% 210, 210, 190, 190, 48.5 %%>;
  greenNoticeBottom3 = <%% 164, 144, 144, 142, 40 %%>;

  calendarWidth = <%% 260, 250, 230, 210, 56 %%>;
  calendarTop = <%% 41, 41, 41, 40, 8.2 %%>;

  titleSize = <%% 31, 29, 27, 24, 5 %%>;
  titleWeight = <%% 800, 800, 800, 800, 800 %%>;
  titleLineHeight = <%% 1.4, 1.4, 1.4, 1.4, 1.4 %%>;

  numberTextTop = <%% 3, 3, 3, 3, 3 %%>;
  numberSize = <%% 25, 23, 22, 21, 4.5 %%>;
  numberWeight = <%% 700, 700, 700, 700, 700 %%>;
  numberLineHeight = <%% 1.4, 1.4, 1.4, 1.4, 1.4 %%>;

  contentsAreaMarginTop = <%% 45, 40, 34, 28, 6 %%>;

  mainPaddingTop = <%% (isMac() ? 133 : 131), (isMac() ? 135 : 135), (isMac() ? 103 : 102), (isMac() ? 83 : 82), 10 %%>;
  mainPaddingBottom = <%% (isMac() ? 153 : 151), (isMac() ? 155 : 155), (isMac() ? 118 : 117), (isMac() ? 98 : 97), 20 %%>;

  innerPadding = <%% 60, 50, 45, 40, 6 %%>;

  imageWidthRatio = <%% 0.5, 0.5, 0.5, 0.5, 0.5 %%>;

  wordingBetween = <%% 15, 15, 15, 15, 1.5 %%>;
  imageBetween = <%% 40, 36, 36, 36, 4 %%>;
  imageHeight = <%% 330, 270, 270, 270, 3 %%>;

  contentsSize = <%% 16, 15, 15, 14, 3.5 %%>;
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

  leftBoxWidth = <%% 398, 250, 209, 160, 0 %%>;
  textAreaBlockHeight = <%% 156, 136, 133, 130, 44.2 %%>;

  descriptionSize = <%% 14.5, 14, 14, 13, 3.5 %%>;
  descriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
  descriptionLineHeight = <%% 1.7, 1.7, 1.7, 1.7, 1.66 %%>;
  descriptionMarginTop = <%% 10, 10, 8, 6, 10 %%>;
  descriptionBoldWeight = <%% 700, 700, 700, 700, 700 %%>;

  policyAreaMarginTop = <%% 15, 15, 12, 10, 2 %%>;
  policyGrayHeight = <%% 180, 180, 180, 180, 42 %%>;
  policyGrayTextTop = <%% 22, 22, 20, 20, 3 %%>;
  policyGrayTextLeft = <%% 22, 20, 18, 15, 3 %%>;
  policyGrayTextSize = <%% 12, 12, 10, 10, 2 %%>;

  agreeTongMarginTop = <%% 10, 10, 10, 10, 1 %%>;
  agreeSize = <%% 15, 15, 15, 15, 3 %%>;
  agreeWeight = <%% 500, 500, 500, 500, 500 %%>;
  agreeLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;

  agreeCircleRadius = <%% 6, 6, 6, 6, 1 %%>;
  agreeCircleTop = <%% (isMac() ? 10 : 8), (isMac() ? 10 : 8), (isMac() ? 10 : 8), (isMac() ? 10 : 8), 2 %%>;
  agreeCircleMarginRight = <%% 5, 5, 5, 5, 1 %%>;

  submitTongMarginTop = <%% 20, 20, 20, 20, 6 %%>;
  submitButtonWidth = <%% 154, 154, 140, 130, 30 %%>;

  submitButtonHeight = <%% 46, 46, 42, 38, 9.6 %%>;
  submitSize = <%% 20, 20, 17, 16, 4 %%>;
  submitWeight = <%% 400, 400, 400, 400, 400 %%>;
  submitLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;
  submitTextTop = <%% (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), -0.3 %%>;

  barDescriptionLingHeight = <%% 1.4, 1.4, 1.4, 1.4, 1.4 %%>
  barDescriptionTextTop = <%% (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 2 : 4), (isMac() ? 1 : 3), (isIphone() ? 0.8 : 0.6) %%>;
  barDescriptionSubSize = <%% 13, 12, 11, 11, 2.6 %%>;

  barTongHeight = <%% 50, 48, 40, 40, 12 %%>;
  barTongMarginTop = <%% 12, 10, 10, 8, 3.4 %%>;

  barTop = <%% 28, 28, 24, 21, 5 %%>;
  barHeight = <%% 9, 9, 9, 9, 2 %%>;
  barFactorWeight = <%% 700, 700, 700, 700, 700 %%>;
  barFactorTop = <%% (isMac() ? 3 : 4), (isMac() ? 3 : 4), (isMac() ? 2 : 3), (isMac() ? 1 : 2), 0 %%>;

  barCircleTop = <%% 26, 26, 23, 20, 4.7 %%>;
  barCircleRadius = <%% 6, 6, 5, 5, 1.2 %%>

  barFactorA0Left = <%% 183, 142, 122, 92, 18.6 %%>;
  barFactorA1Left = <%% 349, 268, 227, 167, 33.6 %%>;
  barFactorA2Left = <%% 518, 397, 341, 252, 49.4 %%>;

  barFactorB0Left = <%% 332, 250, 211, 153, 28.6 %%>;

  grayTextTop = <%% 40, 40, 39, 39, 14 %%>;
  grayMargin = <%% 16, 16, 16, 16, 3 %%>;

  if (desktop) {
    grayTextTop = grayTextTop + (isMac() ? 0 : 2);
  }

  mobileTitleLeft = 1.5;
  mobileTitleTop = -8.7;

  cardWidthNumber = <%% 4, 4, 3, 2, 2 %%>;
  cardHeightNumber = <%% 3, 3, 2, 2, 3 %%>;
  cardMargin = <%% 6, 6, 6, 6, 1 %%>;
  cardHeight = (grayBigHeight - (desktop ? grayMargin * 2 : (grayMargin * 2) + 2) - (cardMargin * (cardHeightNumber - 1))) / cardHeightNumber;

  cardWordingSize = <%% 13, 13, 13, 13, 3 %%>;
  cardInnerMargin = <%% 16, 16, 16, 16, 3 %%>;
  cardInnerMarginTop = <%% 11, 11, 11, 11, 2.1 %%>;
  if (desktop) {
    cardInnerMarginTop = cardInnerMarginTop + (isMac() ? 0 : 1);
  }
  xIconWidth = <%% 10, 10, 10, 10, 2 %%>;
  xIconTop = <%% 14, 14, 14, 14, 3 %%>;
  xVisual = <%% 4, 4, 4, 4, 1 %%>;

  mobileGrayTextAreaTop = 3;

  defaultRatio = 0.5;

  factorBetween = <%% 30, 30, 24, 14, 4 %%>;
  inputTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.1 %%>;
  titleWidth = <%% 90, 79, 69, 69, 30 %%>;
  grayWidth = <%% 226, 226, 190, 140, 43.5 %%>;

  subFontSize = <%% 14, 13, 12, 10, 2.5 %%>;
  subFontTop = <%% 14, 14, 15, 16, 1 %%>;
  subFontBetween = <%% 12, 12, 9, 6, 1 %%>;

  plusSize = <%% 13, 13, 13, 13, 2.5 %%>;

  questionWeight = <%% 500, 500, 500, 500, 500 %%>;

  plusTextTop = <%% -1.5, -1.5, -1.5, -1.5, -0.2 %%>;

  noticeCircleWidth = <%% 12, 12, 12, 12, 2.8 %%>;
  noticeCircleTop = <%% (isMac() ? 9 : 6.5), (isMac() ? 9 : 6.5), (isMac() ? 8.5 : 6), (isMac() ? 8 : 5.5), 2 %%>;
  noticeCircleMargin = <%% 5, 5, 5, 5, 1 %%>;

  careerBlockGrayOuterMargin = <%% 10, 10, 9, 8, 0 %%>;
  careerBlockOuterMargin = <%% 14, 14, 14, 12, 2.5 %%>;
  careerBlockOuterMarginTop = <%% (isMac() ? 10 : 12), (isMac() ? 10 : 12), (isMac() ? 10 : 12), (isMac() ? 10 : 12), 2 %%>;
  careerBlockOuterMarginBottom = <%% (isMac() ? 12 : 10), (isMac() ? 12 : 10), (isMac() ? 12 : 10), (isMac() ? 12 : 10), 2 %%>;
  careerBlockInnerMargin = <%% 6, 6, 6, 4, 1 %%>;
  careerBlockInnerMarginSmall = <%% 2, 2, 2, 2, 0 %%>;
  careerBlockSize = <%% 13, 13, 13, 13, 2.5 %%>;

  blockCancelWidth = <%% 12, 12, 12, 12, 2.8 %%>;
  blockCancelTop = <%% 14, 14, 13, 12, 2 %%>;

  careerBlockMarginLeft = <%% 113, 117, 85, 69, 19.4 %%>;
  careerBlockMinus = <%% 177, 178, 142, 124, 32.6 %%>;

  propertyWidth = <%% 90, 79, 69, 69, 15.7 %%>;
  yearWidth = <%% 72, 72, 64, 56, 13 %%>;
  monthWidth = <%% 40, 40, 36, 32, 8 %%>;

  yearMonthTextWidth = <%% 32, 32, 30, 24, 6 %%>;
  yearMonthTextMargin = <%% 6, 6, 5, 4, 1 %%>;

  textareaVisualTop = <%% 38, 35, 34, 32, 8 %%>;

  finalAreaPaddingTop = <%% 36, 36, 30, 24, 6 %%>;

  contents = {
    main: [
      "추가 포트폴리오 전송",
    ],
    sub: [
      <&& "신청시 못 보낸 포트폴리오가 있다면," | "못 보낸 포트폴리오가 있다면," | "못 보낸 포트폴리오가 있다면," | "포트폴리오가 있다면," | "못 보낸 포트폴리오가 있다면," &&>,
      <&& "추가로 전송하실 수 있습니다!" | "추가로 전송하실 수 있습니다!" | "추가로 전송하실 수 있습니다!" | "전송하실 수 있습니다!" | "추가로 전송하실 수 있습니다!" &&>,
      <&& "포트폴리오를 최대한 많이 보내주시면," | "포트폴리오를 최대한 보내주시면," | "포트폴리오를 최대한 보내주시면," | "포트폴리오를 보내주시면," | "포트폴리오를 최대한 보내주시면," &&>,
      <&& "홈리에종에서 모두 검토 후 연락드립니다." | "홈리에종에서 검토 후 연락드립니다." | "홈리에종에서 검토 후 연락드립니다." | "검토 후 연락드립니다." | "홈리에종에서 검토 후 연락드립니다." &&>,
    ]
  };

  fileChangeEvent = function (e) {
    const self = this;
    const mother = document.querySelector('.' + fileTongClassName);
    const cardMaker = (fileObj, index) => {
      createNode({
        mother,
        events: [ { type: "click", event: (e) => { e.stopPropagation(); e.preventDefault(); } } ],
        style: {
          display: "inline-block",
          position: "relative",
          width: "calc(calc(100% - " + String(cardMargin * (cardWidthNumber - 1)) + ea + ") / " + String(cardWidthNumber) + ")",
          height: String(cardHeight) + ea,
          marginRight: String(index % cardWidthNumber === cardWidthNumber - 1 ? 0 : cardMargin) + ea,
          marginBottom: String(cardMargin) + ea,
          background: colorChip.white,
          borderRadius: String(3) + "px",
        },
        children: [
          {
            style: {
              position: "relative",
              top: String(cardInnerMarginTop) + ea,
              left: String(cardInnerMargin) + ea,
              width: withOut(xIconWidth + (cardInnerMargin * 2.8), ea),
              height: withOut(cardInnerMarginTop, ea),
              overflow: "hidden",
            },
            children: [
              {
                text: fileObj.name,
                style: {
                  position: "absolute",
                  fontSize: String(cardWordingSize) + ea,
                  fontWeight: String(400),
                  color: colorChip.black,
                  width: String(900) + ea,
                }
              }
            ]
          },
          {
            attribute: [
              { index }
            ],
            events: [
              {
                type: "click",
                event: function (e) {
                  const index = Number(this.getAttribute("index"));
                  let cancel;
                  cancel = JSON.parse(instance.fileInput.getAttribute("cancel"));
                  cancel.push(index);
                  instance.fileInput.setAttribute("cancel", JSON.stringify(cancel));
                  this.parentElement.parentElement.removeChild(this.parentElement);
                }
              }
            ],
            style: {
              position: "absolute",
              background: colorChip.white,
              width: String(xIconWidth) + ea,
              height: String(xIconWidth) + ea,
              right: String(cardInnerMargin) + ea,
              top: String(xIconTop) + ea,
            },
            children: [
              {
                style: {
                  position: "absolute",
                  background: colorChip.white,
                  width: String(xIconWidth + (xVisual * 2)) + ea,
                  height: String(xIconWidth + (xVisual * 2)) + ea,
                  right: String(-1 * xVisual) + ea,
                  top: String(-1 * xVisual) + ea,
                }
              },
              {
                mode: "svg",
                source: instance.mother.returnCancel(colorChip.green),
                style: {
                  position: "absolute",
                  background: colorChip.white,
                  width: String(xIconWidth) + ea,
                  right: String(0) + ea,
                  top: String(0) + ea,
                }
              }
            ]
          }
        ]
      });
    }
    instance.fileInput.setAttribute("cancel", JSON.stringify([]));
    cleanChildren(mother);
    for (let i = 0; i < this.files.length; i++) {
      cardMaker(this.files[i], i);
    }
    if (this.files.length === 0) {
      this.previousElementSibling.style.display = "flex";
    } else {
      this.previousElementSibling.style.display = "none";
    }
  }

  mainBlock = createNode({
    mother: this.baseTong,
    style: {
      display: "block",
      position: "relative",
      paddingBottom: String(mainPaddingBottom) + ea,
    }
  });

  contentsArea = createNode({
    mother: mainBlock,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
      background: colorChip.white,
      borderRadius: String(5) + "px",
      boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
      paddingTop: String(innerPadding) + ea,
      paddingBottom: String(innerPadding) + ea,
    }
  });

  createNode({
    mother: contentsArea,
    style: {
      display: "block",
      position: "relative",
      width: withOut(innerPadding * 2, ea),
      marginLeft: String(innerPadding) + ea,
      marginRight: String(innerPadding) + ea,
      paddingBottom: mobile ? String(1.5) + ea : String(titleBottom) + ea,
      marginBottom: String(contentsAreaPaddingTop) + ea,
      borderBottom: "1px solid " + colorChip.shadow,
    },
    children: [
      {
        text: "추가 포트폴리오 업로드",
        style: {
          position: "relative",
          display: "inline-block",
          top: String(titleTopNumber) + ea,
          fontSize: String(titleFontSize) + ea,
          fontWeight: String(800),
          background: colorChip.white,
          paddingRight: String(numberRight) + ea,
          color: colorChip.black,
        }
      },
    ]
  })

  leftBox = createNode({
    mother: contentsArea,
    style: {
      display: desktop ? "inline-block" : "none",
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
      marginLeft: desktop ? "" : String(innerPadding) + ea,
      paddingTop: desktop ? "" : String(1) + ea,
    }
  });

  portfolioBlock = createNode({
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
        text: desktop ? "파일" : "포트폴리오",
        style: {
          display: "inline-block",
          position: "relative",
          top: String(mainTop) + ea,
          fontSize: String(mainSize) + ea,
          fontWeight: String(mainWeight),
          color: colorChip.black,
          verticalAlign: "top",
          width: String(titleWidth) + ea,
        }
      },
      {
        event: {
          click: function (e) {
            this.querySelector("input").click();
          },
          dragenter: (e) => { e.preventDefault(); e.stopPropagation(); },
          dragover: (e) => { e.preventDefault(); e.stopPropagation(); },
          dragleave: (e) => { e.preventDefault(); e.stopPropagation(); },
          drop: function (e) {
            e.preventDefault();
            e.stopPropagation();
            if ([ ...e.dataTransfer.files ].map((file) => { return file.type }).filter((str) => { return !/^image/.test(str) }).filter((str) => { return !/pdf/.test(str) }).length > 0) {
              window.alert("이미지 또는 pdf 파일로만 올려주세요!");
            } else {
              this.querySelector("input").files = e.dataTransfer.files;
              fileChangeEvent.call(this.querySelector("input"), e);
            }
          }
        },
        style: {
          display: "inline-block",
          position: "relative",
          top: String(desktop ? grayTextAreaTop : mobileGrayTextAreaTop) + ea,
          width: desktop ? withOut((circleRadius * 2) + circleBetween + titleWidth, ea) : withOut(0, ea),
          height: String(grayBigHeight) + ea,
          background: colorChip.gray1,
          borderRadius: String(3) + "px",
          cursor: "pointer",
        },
        children: [
          {
            style: {
              position: "absolute",
              top: String(grayMargin + (desktop ? 0 : 2)) + ea,
              left: String(grayMargin) + ea,
              width: withOut(grayMargin * 2, ea),
              height: withOut(grayMargin + grayMargin + (desktop ? 0 : 2), ea),
              overflow: "scroll",
              zIndex: String(1),
            },
            children: [
              {
                class: [ fileTongClassName ],
                style: {
                  position: "relative",
                  width: String(100) + '%',
                  top: String(0),
                  left: String(0),
                }
              }
            ]
          },
          {
            style: {
              display: "flex",
              position: "absolute",
              width: withOut(0, ea),
              height: withOut(0, ea),
              top: String(0),
              left: String(0),
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            },
            child: {
              text: desktop ? "클릭 또는 드래그하여 파일 업로드..." : "클릭하여 파일 업로드...",
              style: {
                display: "inline-block",
                position: "relative",
                top: String(desktop ? -3 : -0.3) + ea,
                fontSize: String(desktop ? 23 : 4.5) + ea,
                fontWeight: String(200),
                color: colorChip.gray4,
              }
            }
          },
          {
            mode: "input",
            attribute: {
              type: "file",
              name: "upload",
              accept: "image/*,  application/pdf",
              multiple: "true",
              cancel: JSON.stringify([]),
              property: "portfolio",
            },
            event: {
              change: fileChangeEvent,
            },
            style: {
              position: "absolute",
              display: "none",
            }
          }
        ]
      },
    ]
  });

  this.fileInput = portfolioBlock.querySelector("input");

  // policy and submit
  policyArea = createNode({
    mother: mainBlock,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
      borderRadius: String(5) + "px",
      paddingTop: String(finalAreaPaddingTop) + ea,
    }
  });

  submitTong = createNode({
    mother: policyArea,
    style: {
      display: "block",
      position: "relative",
      textAlign: "center",
    },
    children: [
      {
        class: [ "submitButtonClassName" ],
        event: {
          click: instance.finalSubmit()
        },
        style: {
          display: "inline-flex",
          width: String(submitButtonWidth) + ea,
          height: String(submitButtonHeight) + ea,
          background: colorChip.gradientGreen,
          borderRadius: String(5) + "px",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          cursor: "pointer",
        },
        children: [
          {
            text: "파일 전송하기",
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

}

AspirantInformationJs.prototype.finalSubmit = function () {
  const instance = this;
  const { ajaxJson, colorChip, findByAttribute, scrollTo, dateToString, sleep, selfHref, homeliaisonAnalytics, setQueue, ajaxForm, equalJson } = GeneralJs;
  const { aspid, aspirant } = this;
  return async function (e) {
    try {
      let account, business, identity;
      let portfolioFiles;
      let grayLoading;
      let formData;
      let cancelPhoto;

      portfolioFiles = instance.fileInput.files;

      grayLoading = instance.mother.whiteProgressLoading();

      await homeliaisonAnalytics({
        page: instance.pageName,
        standard: instance.firstPageViewTime,
        action: "aspirantPortfolioSend",
        data: {
          aspid,
          date: dateToString(new Date(), true),
        },
      })

      formData = new FormData();
      formData.enctype = "multipart/form-data";
      formData.append("name", aspirant.designer);
      formData.append("aspid", aspid);
      cancelPhoto = JSON.parse(instance.fileInput.getAttribute("cancel"));
      for (let i = 0; i < instance.fileInput.files.length; i++) {
        if (!cancelPhoto.includes(i)) {
          formData.append("upload0", instance.fileInput.files[i]);
        }
      }

      ajaxForm(formData, BRIDGEHOST + "/aspirantBinary", grayLoading.progress.firstChild).then((res) => {
        grayLoading.remove();
        GeneralJs.scrollTo(window, 0);
        window.alert("전송이 완료되었습니다! 확인 후 연락드리겠습니다 :)");
        selfHref(FRONTHOST);
      }).catch((err) => {
        window.alert("오류가 발생하였습니다! 다시 시도해주세요!");
        window.location.reload();
      });

    } catch (e) {
      console.log(e);
      window.alert(e.message);
    }
  }
}

AspirantInformationJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    this.mother.setGeneralProperties(this);

    const { returnGet, ajaxJson } = GeneralJs;
    const getObj = returnGet();

    if (typeof getObj.aspid !== "string") {
      this.aspid = "a2101_aa01s";
    } else {
      this.aspid = getObj.aspid;
    }
    this.aspirants = await ajaxJson({ whereQuery: { aspid: this.aspid } }, SECONDHOST + "/getAspirants", { equal: true });
    if (this.aspirants.length > 0) {
      this.aspirant = this.aspirants[0];
    } else {
      this.aspid = "a2101_aa01s";
      this.aspirants = await ajaxJson({ whereQuery: { aspid: this.aspid } }, SECONDHOST + "/getAspirants", { equal: true });
      this.aspirant = this.aspirants[0];
    }
    this.inputClassName = "consultingInput";

    await this.mother.ghostClientLaunching({
      mode: "front",
      name: "aspirantInformation",
      client: null,
      base: {
        instance: this,
        binaryPath: AspirantInformationJs.binaryPath,
        subTitle: "",
        secondBackground: false,
        backgroundType: 0,
      },
      local: async () => {
        try {
          instance.insertInitBox();
          instance.insertNoticeBox();
          instance.insertHomeLiaisonBox();
          instance.insertDifferentBox();
          instance.insertAspirantBox();
        } catch (e) {
          await GeneralJs.ajaxJson({ message: "AspirantInformationJs.launching.ghostClientLaunching : " + e.message }, BACKHOST + "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

  } catch (err) {
    console.log(err);
    await GeneralJs.ajaxJson({ message: "AspirantInformationJs.launching 에러 일어남 => " + err.message }, BACKHOST + "/errorLog");
  }
}
