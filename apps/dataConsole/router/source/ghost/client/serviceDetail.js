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
  "name": "serviceDetail",
  "hangul": "서비스 소개",
  "route": [
    "serviceDetail"
  ]
} %/%/g

const ServiceDetailJs = function () {
  this.mother = new GeneralJs();
}

ServiceDetailJs.binaryPath = "/middle/detail";

ServiceDetailJs.prototype.insertInitBox = function () {
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

  titleWording = "홈리에종 서비스";
  subTitleContents = "홈리에종 서비스에 대한 상세한 안내";

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

ServiceDetailJs.prototype.insertStartBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, svgMaker, serviceParsing } = GeneralJs;
  const { ea, media, baseTong } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let whiteBlock;
  let blockHeight;
  let bottomMargin;
  let margin;
  let marginTop;
  let leftBox;
  let rightBox;
  let contents;
  let titleSize, titleWeight, titleBoldWeight;
  let titleLineHeight;
  let titleLineTop, titleLineWidth, titleLineLength, titleLineMarginRight;
  let subBlockMarginTop;
  let subSize, subWeight, subLineHeight;
  let rightImagePosition;

  blockHeight = <%% 294, 294, 273, 226, 129.5 %%>;
  bottomMargin = <%% 16, 16, 16, 12, 5 %%>;
  margin = <%% 52, 50, 40, 32, 52 %%>;
  marginTop = <%% 52, 50, 40, 32, 52 %%>;

  titleSize = <%% 22, 22, 22, 22, 22 %%>;
  titleWeight = <%% 400, 400, 400, 400, 400 %%>;
  titleBoldWeight = <%% 800, 800, 800, 800, 800 %%>;
  titleLineHeight = <%% 1.55, 1.55, 1.55, 1.55, 1.55 %%>;

  titleLineTop = <%% 9, 9, 9, 9, 9 %%>;
  titleLineWidth = <%% 4, 4, 4, 4, 4 %%>;
  titleLineLength = <%% 54, 54, 54, 54, 54 %%>;
  titleLineMarginRight = <%% 20, 20, 20, 20, 20 %%>;

  subBlockMarginTop = <%% 70, 70, 70, 70, 70 %%>;
  subSize = <%% 15, 15, 15, 15, 15 %%>;
  subWeight = <%% 400, 400, 400, 400, 400 %%>;
  subLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;

  rightImagePosition = <%% 80, 80, 80, 80, 80 %%>;

  contents = {
    left: {
      title: [
        "<b%인테리어 시공 없이 가구, 패브릭, 소품만으로%b>",
        "우리집 무드를 변화시켜주는 스타일링",
      ],
      sub: [
        "홈퍼니싱은 시공 없이 스타일링만으로 완성하는 인테리어 서비스입니다.",
        "내 집의 컨디션에 적합한 스타일링 서비스를 경험해보세요.",
      ]
    },
    right: {
      image: ServiceDetailJs.binaryPath + "/startf0.jpg",
    }
  }

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(5) + "px",
      width: String(100) + '%',
      height: String(blockHeight) + ea,
      background: colorChip.white,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
      overflow: "hidden",
    }
  });

  leftBox = createNode({
    mother: whiteBlock,
    style: {
      display: desktop ? "inline-block" : "block",
      position: "relative",
      width: withOut(50, margin * 2, ea),
      height: withOut(marginTop + margin, ea),
      marginTop: desktop ? String(marginTop) + ea : "",
      marginBottom: desktop ? String(margin) + ea : "",
      marginLeft: desktop ? String(margin) + ea : "",
      marginRight: desktop ? String(margin) + ea : "",
    },
    children: [
      {
        style: {
          display: "block",
          position: "relative",
          textAlign: "left",
        },
        children: [
          {
            style: {
              display: "inline-block",
              verticalAlign: "top",
              position: "relative",
              top: String(titleLineTop) + ea,
              width: String(titleLineWidth) + ea,
              height: String(titleLineLength) + ea,
              borderRadius: String(5) + "px",
              background: colorChip.gray3,
              marginRight: String(titleLineMarginRight) + ea,
            }
          },
          {
            text: contents.left.title.join("\n"),
            style: {
              display: "inline-block",
              verticalAlign: "top",
              position: "relative",
              fontSize: String(titleSize) + ea,
              fontWeight: String(titleWeight),
              color: colorChip.black,
              lineHeight: String(titleLineHeight),
              textAlign: "left",
            },
            bold: {
              fontSize: String(titleSize) + ea,
              fontWeight: String(titleBoldWeight),
              color: colorChip.black,
            }
          }
        ]
      },
      {
        text: contents.left.sub.join("\n"),
        style: {
          display: "block",
          position: "relative",
          marginTop: String(subBlockMarginTop) + ea,
          fontSize: String(subSize) + ea,
          fontWeight: String(subWeight),
          color: colorChip.black,
          lineHeight: String(subLineHeight),
          textAlign: "right",
        },
      },
    ]
  });

  rightBox = createNode({
    mother: whiteBlock,
    style: {
      display: desktop ? "inline-block" : "block",
      position: "relative",
      verticalAlign: "top",
      top: String(0) + ea,
      width: desktop ? String(50) + '%' : String(100) + '%',
      height: String(100) + '%',
      overflow: "hidden",
      backgroundImage: "url('" + contents.right.image + "')",
      backgroundPosition: "50% " + String(rightImagePosition) + "%",
      backgroundSize: "100% auto",
    },
  });

}

ServiceDetailJs.prototype.insertThreeBox = function () {
  const instance = this;
  const { ea, media } = this;
  const baseTong = this.baseTong;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1]);
  const small = !big;
  const { createNode, createNodes, colorChip, withOut, ajaxJson, isMac, isIphone, svgMaker } = GeneralJs;
  let contents;
  let middleTongPaddinngTop;
  let middleTongPaddingBottom;
  let middleTong;
  let middleTitleSize;
  let middleTitleWeight;
  let middleTitlePadding;
  let middleTitleLineTop;
  let middleTitleTextTop;
  let middleAreaPaddingTop;
  let middleInfoSize;
  let middleTitleMarginBottom;
  let threeBetween;
  let threeHeight;
  let threeBlock;
  let threeBlockMarginTop;
  let threeVisualPaddingBottom;
  let threeWidth0, threeWidth1;
  let threeSize, threeWeight, threeSmallSize;
  let blackCircleWidth;
  let arrowWidth, arrowHeight;
  let numberTop, numberLeft, numberSize, numberWeight;
  let mainBetween, subBetween, subTop;

  middleTongPaddinngTop = <%% 108, 84, 72, 52, 10 %%>;
  middleTongPaddingBottom = <%% 150, 130, 100, 70, 17 %%>;
  middleTitleMarginBottom = <%% 10, 10, 10, 10, 10 %%>;

  middleTitleLineTop = <%% 68, 68, 68, 68, 68 %%>;

  middleTitleSize = <%% 23, 23, 21, 18, 4.2 %%>;
  middleTitleWeight = <%% 800, 800, 800, 800, 800 %%>;
  middleTitlePadding = <%% 16, 16, 12, 10, 2 %%>;
  middleTitleTextTop = <%% (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), 0 %%>;

  middleAreaPaddingTop = <%% 40, 40, 30, 20, 5 %%>;
  middleInfoSize = <%% 14, 14, 14, 13, 3 %%>;

  threeBetween = <%% 10, 10, 10, 10, 1 %%>;
  threeHeight = <%% 170, 170, 170, 170, 170 %%>;
  threeVisualPaddingBottom = <%% 2, 2, 2, 2, 2 %%>;
  threeBlockMarginTop = <%% 48, 48, 48, 48, 48 %%>;

  threeWidth0 = <%% 540, 540, 540, 540, 540 %%>;
  threeWidth1 = <%% 340, 340, 340, 340, 340 %%>;

  threeSize = <%% 20, 20, 20, 20, 20 %%>;
  threeWeight = <%% 800, 800, 800, 800, 800 %%>;
  threeSmallSize = <%% 12, 12, 12, 12, 12 %%>;

  blackCircleWidth = <%% 40, 40, 40, 40, 40 %%>;

  arrowWidth = <%% 22, 22, 22, 22, 22 %%>;
  arrowHeight = <%% 8, 8, 8, 8, 8 %%>;

  numberTop = <%% 14, 14, 14, 14, 14 %%>;
  numberLeft = <%% 22, 22, 22, 22, 22 %%>;
  numberSize = <%% 13, 13, 13, 13, 13 %%>;
  numberWeight = <%% 500, 500, 500, 500, 500 %%>;

  mainBetween = <%% 4, 4, 4, 4, 4 %%>;
  subBetween = <%% 6, 6, 6, 6, 6 %%>;
  subTop = <%% 3, 3, 3, 3, 3 %%>;

  contents = {
    title: "디자이너가 이끄는 무드 체인지 효과",
    description: [
      "디자이너의 기획이 담긴 디자인 컨셉에 맞게,",
      "제안된 스타일링으로 조화로운 완성을 이끌어 냅니다.",
    ],
  }

  middleTong = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      width: withOut(0 * 2, ea),
      paddingTop: String(middleTongPaddinngTop) + ea,
      paddingBottom: String(middleTitleMarginBottom) + ea,
    }
  });

  createNode({
    mother: middleTong,
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      position: "relative",
      width: String(100) + '%',
      textAlign: "center",
    },
    children: [
      {
        style: {
          display: "block",
          position: "absolute",
          width: String(100) + '%',
          height: String(middleTitleLineTop) + ea,
          top: String(0),
          left: String(0),
          borderBottom: "1px solid " + colorChip.gray4,
        }
      },
      {
        text: contents.title,
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(middleTitleSize) + ea,
          fontWeight: String(middleTitleWeight),
          color: colorChip.black,
          textAlign: "center",
          paddingLeft: String(middleTitlePadding) + ea,
          paddingRight: String(middleTitlePadding) + ea,
          top: String(middleTitleTextTop) + ea,
          background: colorChip.gray1,
        }
      },
      {
        text: contents.description.join("\n"),
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(middleInfoSize) + ea,
          fontWeight: String(400),
          lineHeight: String(1.6),
          color: colorChip.black,
          textAlign: "center",
          paddingTop: String(middleTitlePadding) + ea,
          paddingLeft: String(middleTitlePadding * 1.5) + ea,
          paddingRight: String(middleTitlePadding * 1.5) + ea,
          background: colorChip.gray1,
        }
      }
    ]
  });

  threeBlock = createNode({
    mother: middleTong,
    style: {
      display: "flex",
      flexDirection: "row",
      position: "relative",
      width: String(100) + '%',
      marginTop: String(threeBlockMarginTop) + ea,
    },
    children: [
      {
        style: {
          display: "inline-flex",
          position: "relative",
          flexDirection: "column",
          width: String(threeWidth0) + ea,
          height: String(threeHeight) + ea,
          borderRadius: String(5) + "px",
          background: colorChip.white,
          boxShadow: "0px 5px 13px -10px " + colorChip.gray5,
          marginRight: String(threeBetween) + ea,
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: String(threeVisualPaddingBottom) + ea,
        },
        children: [
          {
            text: String(1),
            style: {
              position: "absolute",
              top: String(numberTop) + ea,
              left: String(numberLeft) + ea,
              fontSize: String(numberSize) + ea,
              fontWeight: String(numberWeight),
              color: colorChip.green,
              fontStyle: "italic",
              fontFamily: "graphik",
            }
          },
          {
            style: {
              display: "flex",
              flexDirection: "row",
              position: "relative",
              alignItems: "center",
              justifyContent: "center",
            },
            children: [
              {
                text: "빈 집을 취향대로 꾸미고 싶다면",
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(threeSize) + ea,
                  fontWeight: String(threeWeight),
                  color: colorChip.black,
                }
              },
              {
                text: "(새입주)",
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(threeSmallSize) + ea,
                  fontWeight: String(threeWeight),
                  color: colorChip.deactive,
                  marginLeft: String(subBetween) + ea,
                  top: String(subTop) + ea,
                }
              },
            ]
          },
          {
            style: {
              display: "flex",
              flexDirection: "row",
              position: "relative",
              alignItems: "center",
              justifyContent: "center",
              marginTop: String(mainBetween) + ea,
            },
            children: [
              {
                text: "가구 일부를 바꿔 분위기 변화를 주고 싶다면",
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(threeSize) + ea,
                  fontWeight: String(threeWeight),
                  color: colorChip.black,
                }
              },
              {
                text: "(거주중)",
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(threeSmallSize) + ea,
                  fontWeight: String(threeWeight),
                  color: colorChip.deactive,
                  marginLeft: String(subBetween) + ea,
                  top: String(subTop) + ea,
                }
              },
            ]
          },
        ]
      },
      {
        style: {
          display: "inline-flex",
          position: "relative",
          flexDirection: "column",
          width: String(threeWidth0) + ea,
          height: String(threeHeight) + ea,
          borderRadius: String(5) + "px",
          background: colorChip.white,
          boxShadow: "0px 5px 13px -10px " + colorChip.gray5,
          marginRight: String(threeBetween) + ea,
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: String(threeVisualPaddingBottom) + ea,
        },
        children: [
          {
            text: String(2),
            style: {
              position: "absolute",
              top: String(numberTop) + ea,
              left: String(numberLeft) + ea,
              fontSize: String(numberSize) + ea,
              fontWeight: String(numberWeight),
              color: colorChip.green,
              fontStyle: "italic",
              fontFamily: "graphik",
            }
          },
          {
            style: {
              display: "flex",
              flexDirection: "row",
              position: "relative",
              alignItems: "center",
              justifyContent: "center",
            },
            children: [
              {
                text: "디자이너의 기획이 담긴 디자인 컨셉",
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(threeSize) + ea,
                  fontWeight: String(threeWeight),
                  color: colorChip.black,
                }
              },
            ]
          },
          {
            style: {
              display: "flex",
              flexDirection: "row",
              position: "relative",
              alignItems: "center",
              justifyContent: "center",
              marginTop: String(mainBetween) + ea,
            },
            children: [
              {
                text: "( 가구 + 디자인 조명 + 소품 + 패브릭 + 액자 )",
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(threeSmallSize) + ea,
                  fontWeight: String(threeWeight),
                  color: colorChip.deactive,
                }
              },
            ]
          },
          {
            style: {
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              width: String(blackCircleWidth) + ea,
              height: String(blackCircleWidth) + ea,
              borderRadius: String(blackCircleWidth) + ea,
              background: colorChip.black,
              left: String((-1 * (threeBetween / 2)) + (-1 * (blackCircleWidth / 2))) + ea,
              top: withOut(50, blackCircleWidth / 2, ea),
            },
            child: {
              mode: "svg",
              source: svgMaker.horizontalArrow(arrowWidth, arrowHeight, colorChip.white),
              style: {
                display: "inline-block",
                position: "relative",
                width: String(arrowWidth) + ea,
              }
            }
          }
        ]
      },
      {
        style: {
          display: "inline-flex",
          position: "relative",
          flexDirection: "column",
          width: String(threeWidth1) + ea,
          height: String(threeHeight) + ea,
          borderRadius: String(5) + "px",
          background: colorChip.white,
          boxShadow: "0px 5px 13px -10px " + colorChip.gray5,
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: String(threeVisualPaddingBottom) + ea,
        },
        children: [
          {
            text: String(3),
            style: {
              position: "absolute",
              top: String(numberTop) + ea,
              left: String(numberLeft) + ea,
              fontSize: String(numberSize) + ea,
              fontWeight: String(numberWeight),
              color: colorChip.green,
              fontStyle: "italic",
              fontFamily: "graphik",
            }
          },
          {
            style: {
              display: "flex",
              flexDirection: "row",
              position: "relative",
              alignItems: "center",
              justifyContent: "center",
            },
            children: [
              {
                text: "맞춤형 인테리어 완성",
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(threeSize) + ea,
                  fontWeight: String(threeWeight),
                  color: colorChip.green,
                }
              },
            ]
          },
          {
            style: {
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              width: String(blackCircleWidth) + ea,
              height: String(blackCircleWidth) + ea,
              borderRadius: String(blackCircleWidth) + ea,
              background: colorChip.black,
              left: String((-1 * (threeBetween / 2)) + (-1 * (blackCircleWidth / 2))) + ea,
              top: withOut(50, blackCircleWidth / 2, ea),
            },
            child: {
              mode: "svg",
              source: svgMaker.horizontalArrow(arrowWidth, arrowHeight, colorChip.white),
              style: {
                display: "inline-block",
                position: "relative",
                width: String(arrowWidth) + ea,
              }
            }
          }
        ]
      },
    ]
  })



}

ServiceDetailJs.prototype.insertSlideBox = function () {
  const instance = this;
  const { ea, media } = this;
  const baseTong = this.baseTong;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1]);
  const small = !big;
  const { createNode, createNodes, colorChip, withOut, ajaxJson, isMac, isIphone, svgMaker } = GeneralJs;
  let whiteBlock;
  let bottomMargin;
  let slideTong;
  let slideTongHeight;
  let blockWidth;
  let blockBetween;
  let walk;
  let nextWalk;
  let length;
  let images;
  let pastWalk;
  let margin;
  let interval;
  let contents;
  let descriptionTong;
  let slideLeft;
  let slideWidth;
  let whitePaddingTop;
  let arrowWidth;
  let arrowHeight;
  let arrowMargin;
  let arrowTop;
  let descriptionSize, descriptionWeight, descriptionLineHeight, descriptionBoldWeight;
  let circleWidth, circleBetween;
  let circleBoxMarginTop, circleBoxPaddingLeft;
  let feeTong;
  let feeTongMarginTop;
  let finalMarginBottom;
  let feeTitleTongHeight;
  let feeTitleSize, feeTitleWeight, feeTitleTextTop;
  let feeDescriptionTongHeight;
  let feeDescriptionLineTop;
  let feeDescriptionSize;
  let feeDescriptionWeight, feeDescriptionWeightBold;
  let feeDescriptionPadding;
  let barWidth0, barBetween;
  let barHeight, barMarginBottom;
  let feeBarTongHeight;

  bottomMargin = <%% 180, 180, 180, 180, 180 %%>;
  slideTongHeight = <%% 340, 340, 340, 340, 340 %%>;
  blockWidth = <%% 240, 240, 240, 240, 240 %%>;
  blockBetween = <%% 12, 12, 12, 12, 12 %%>;

  margin = <%% 52, 50, 40, 32, 52 %%>;
  finalMarginBottom = <%% 72, 72, 72, 72, 72 %%>;

  whitePaddingTop = <%% 68, 68, 68, 68, 68 %%>;

  slideLeft = <%% -680, -680, -680, -680, -680 %%>;
  slideWidth = <%% 8000, 8000, 8000, 8000, 8000 %%>;

  arrowWidth = <%% 762, 762, 762, 762, 762 %%>;
  arrowHeight = <%% 10, 10, 10, 10, 10 %%>;

  arrowMargin = <%% 18, 18, 18, 18, 18 %%>;
  arrowTop = <%% 6, 6, 6, 6, 6 %%>;

  descriptionSize = <%% 15, 15, 15, 15, 15 %%>;
  descriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
  descriptionLineHeight = <%% 1.66, 1.66, 1.66, 1.66, 1.66 %%>;
  descriptionBoldWeight = <%% 700, 700, 700, 700, 700 %%>;

  circleWidth = <%% 6, 6, 6, 6, 6 %%>;
  circleBetween = <%% 4, 4, 4, 4, 4 %%>;

  circleBoxMarginTop = <%% 16, 16, 16, 16, 16 %%>;
  circleBoxPaddingLeft = <%% 1, 1, 1, 1, 1 %%>;

  feeTongMarginTop = <%% 100, 100, 100, 100, 100 %%>;
  feeTitleTongHeight = <%% 50, 50, 50, 50, 50 %%>;

  feeTitleSize = <%% 20, 20, 20, 20, 20 %%>;
  feeTitleWeight = <%% 800, 800, 800, 800, 800 %%>;
  feeTitleTextTop = <%% -1, -1, -1, -1, -1 %%>;

  feeDescriptionTongHeight = <%% 60, 60, 60, 60, 60 %%>;
  feeDescriptionLineTop = <%% 9, 9, 9, 9, 9 %%>;
  feeDescriptionSize = <%% 15, 15, 15, 15, 15 %%>;
  feeDescriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
  feeDescriptionWeightBold = <%% 600, 600, 600, 600, 600 %%>;
  feeDescriptionPadding = <%% 20, 20, 20, 20, 20 %%>;

  barWidth0 = <%% 360, 360, 360, 360, 360 %%>;
  barBetween = <%% 5, 5, 5, 5, 5 %%>;

  barHeight = <%% 20, 20, 20, 20, 20 %%>;
  barMarginBottom = <%% 8, 8, 8, 8, 8 %%>;

  feeBarTongHeight = <%% 60, 60, 60, 60, 60 %%>;

  contents = {
    images: [
      ServiceDetailJs.binaryPath + "/slide0.jpg",
      ServiceDetailJs.binaryPath + "/slide1.jpg",
      ServiceDetailJs.binaryPath + "/slide2.jpg",
      ServiceDetailJs.binaryPath + "/slide3.jpg",
      ServiceDetailJs.binaryPath + "/slide4.jpg",
      ServiceDetailJs.binaryPath + "/slide5.jpg",
      ServiceDetailJs.binaryPath + "/slide6.jpg",
      ServiceDetailJs.binaryPath + "/slide7.jpg",
      ServiceDetailJs.binaryPath + "/slide8.jpg",
      ServiceDetailJs.binaryPath + "/slide9.jpg",
      ServiceDetailJs.binaryPath + "/slide10.jpg",
      ServiceDetailJs.binaryPath + "/slide11.jpg",
      ServiceDetailJs.binaryPath + "/slide12.jpg",
      ServiceDetailJs.binaryPath + "/slide13.jpg",
    ],
    description: [
      "가구와 패브릭, 소품 만으로도 확실하게 분위기가 바뀌는 무드체인지를 되는 경험해보세요!",
      "<b%내 집의 컨디션에 맞는 디자인 컨셉을 디자이너가 대신 고민해줄거예요.%b>",
    ],
  };
  length = contents.images.length;
  walk = blockWidth + blockBetween;
  interval = 3000;

  // base

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(5) + "px",
      width: String(100) + '%',
      paddingTop: String(whitePaddingTop) + ea,
      background: colorChip.white,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: "0px 5px 15px -10px " + colorChip.gray5,
      overflow: "hidden",
    }
  });

  // slide

  slideTong = createNode({
    mother: whiteBlock,
    style: {
      display: "block",
      position: "relative",
      width: withOut(0, ea),
      height: String(slideTongHeight) + ea,
      overflow: "hidden",
    },
    child: {
      style: {
        position: "absolute",
        top: String(0),
        left: String(slideLeft) + ea,
        width: String(slideWidth) + ea,
        height: withOut(0, ea),
      }
    }
  }).firstChild;
  for (let i = 0; i < length; i++) {
    createNode({
      mother: slideTong,
      attribute: {
        walk: String(i * walk),
      },
      style: {
        display: "inline-block",
        position: "absolute",
        top: String(0),
        left: String(0),
        width: String(blockWidth) + ea,
        height: String(slideTongHeight) + ea,
        borderRadius: String(5) + "px",
        backgroundImage: "url('" + contents.images[i] + "')",
        backgroundSize: "auto 100%",
        backgroundPosition: "50% 50%",
        transform: "translateX(" + String(i * walk) + ea + ")",
        transition: "all 0.5s ease",
        opacity: String((i >= length - 2 || i === 0) ? 0 : 1),
      }
    });
  }

  setInterval(() => {
    const targets = [ ...slideTong.children ];
    for (let target of targets) {
      pastWalk = Number(target.getAttribute("walk"));
      if (pastWalk >= walk * (length - 2) || pastWalk === 0) {
        target.style.opacity = String(0);
      } else {
        target.style.opacity = String(1);
      }
    }
    for (let target of targets) {
      pastWalk = Number(target.getAttribute("walk"));
      if (pastWalk === walk * (length - 1)) {
        nextWalk = 0;
      } else {
        nextWalk = pastWalk + walk;
      }
      target.setAttribute("walk", String(nextWalk));
      target.style.transform = "translateX(" + String(nextWalk) + ea + ")";
    }
    for (let target of targets) {
      nextWalk = Number(target.getAttribute("walk"));
      if (nextWalk >= walk * (length - 2) || nextWalk === 0) {
        target.style.opacity = String(0);
      } else {
        target.style.opacity = String(1);
      }
    }
  }, interval);

  // slide description

  descriptionTong = createNode({
    mother: whiteBlock,
    style: {
      display: "flex",
      flexDirection: "row",
      position: "relative",
      width: withOut(margin * 2, ea),
      overflow: "hidden",
      paddingLeft: String(margin) + ea,
      paddingRight: String(margin) + ea,
      paddingTop: String(margin) + ea,
      alignItems: "start",
    },
  });
  createNode({
    mother: descriptionTong,
    mode: "svg",
    source: svgMaker.horizontalArrow(arrowWidth, arrowHeight, colorChip.gray4),
    style: {
      width: String(arrowWidth) + ea,
      display: "inline-block",
      position: "relative",
      marginRight: String(arrowMargin) + ea,
      top: String(arrowTop) + ea,
    }
  });
  createNode({
    mother: descriptionTong,
    style: {
      display: "inline-flex",
      position: "relative",
      flexDirection: "column",
      width: withOut(arrowWidth + arrowMargin, ea),
    },
    children: [
      {
        text: contents.description.join("\n"),
        style: {
          display: "block",
          position: "relative",
          fontSize: String(descriptionSize) + ea,
          fontWeight: String(descriptionWeight),
          color: colorChip.black,
          lineHeight: String(descriptionLineHeight),
        },
        bold: {
          fontSize: String(descriptionSize) + ea,
          fontWeight: String(descriptionBoldWeight),
          color: colorChip.black,
        }
      },
      {
        style: {
          display: "flex",
          flexDirection: "row",
          width: withOut(0, ea),
          position: "relative",
          marginTop: String(circleBoxMarginTop) + ea,
          paddingLeft: String(circleBoxPaddingLeft) + ea,
        },
        children: [
          {
            style: {
              display: "inline-block",
              position: "relative",
              width: String(circleWidth) + ea,
              height: String(circleWidth) + ea,
              borderRadius: String(circleWidth) + ea,
              background: colorChip.deactive,
            }
          },
          {
            style: {
              display: "inline-block",
              position: "relative",
              width: String(circleWidth) + ea,
              height: String(circleWidth) + ea,
              borderRadius: String(circleWidth) + ea,
              marginRight: String(circleBetween) + ea,
              marginLeft: String(circleBetween) + ea,
              background: colorChip.deactive,
            }
          },
          {
            style: {
              display: "inline-block",
              position: "relative",
              width: String(circleWidth) + ea,
              height: String(circleWidth) + ea,
              borderRadius: String(circleWidth) + ea,
              background: colorChip.deactive,
            }
          },
        ]
      }
    ]
  });

  // fee
  feeTong = createNode({
    mother: whiteBlock,
    style: {
      display: "flex",
      flexDirection: "column",
      position: "relative",
      marginTop: String(feeTongMarginTop) + ea,
      paddingLeft: String(margin) + ea,
      paddingRight: String(margin) + ea,
      paddingBottom: String(finalMarginBottom) + ea,
      width: withOut(margin * 2, ea),
    }
  });
  createNode({
    mother: feeTong,
    style: {
      display: "flex",
      flexDirection: "column",
      position: "relative",
      height: String(feeTitleTongHeight) + ea,
      width: withOut(0, ea),
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
    },
    child: {
      text: "비용의 구성",
      style: {
        position: "relative",
        top: String(feeTitleTextTop) + ea,
        fontSize: String(feeTitleSize) + ea,
        fontWeight: String(feeTitleWeight),
        color: colorChip.black,
      }
    }
  });
  createNode({
    mother: feeTong,
    style: {
      display: "flex",
      flexDirection: "column",
      position: "relative",
      width: withOut(0, ea),
      height: String(feeDescriptionTongHeight) + ea,
      alignItems: "center",
      justifyContent: "start",
    },
    children: [
      {
        style: {
          position: "absolute",
          bottom: String(0),
          left: String(0),
          width: withOut(0, ea),
          height: String(feeDescriptionTongHeight - feeDescriptionLineTop) + ea,
          border: "1px solid " + colorChip.gray3,
          borderTopLeftRadius: String(5) + "px",
          borderTopRightRadius: String(5) + "px",
          borderBottom: String(0),
          boxSizing: "border-box",
        }
      },
      {
        text: [
          "홈퍼니싱 서비스는 디자인비와 제품 구매비로 구성됩니다."
        ].join("\n"),
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(feeDescriptionSize) + ea,
          fontWeight: String(feeDescriptionWeight),
          color: colorChip.black,
          background: colorChip.white,
          paddingLeft: String(feeDescriptionPadding) + ea,
          paddingRight: String(feeDescriptionPadding) + ea,
        }
      }
    ]
  });
  createNode({
    mother: feeTong,
    style: {
      display: "flex",
      flexDirection: "row",
      position: "relative",
      width: withOut(0, ea),
      height: String(feeBarTongHeight) + ea,
      alignItems: "end",
      justifyContent: "start",
    },
    children: [
      {
        style: {
          display: "inline-flex",
          flexDirection: "column",
          position: "relative",
          width: String(barWidth0) + ea,
          marginRight: String(barBetween) + ea,
        },
        children: [
          {
            style: {
              display: "block",
              position: "relative",
              width: withOut(0, ea),
              height: String(barHeight) + ea,
              borderRadius: String(5) + "px",
              background: colorChip.green,
              marginBottom: String(barMarginBottom) + ea,
            }
          },
          {
            style: {
              display: "flex",
              flexDirection: "column",
              position: "relative",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            },
            child: {
              text: "디자인 비용",
              style: {
                position: "relative",
                fontSize: String(feeDescriptionSize) + ea,
                fontWeight: String(feeDescriptionWeightBold),
                color: colorChip.green,
              }
            }
          }
        ]
      },
      {
        style: {
          display: "inline-flex",
          flexDirection: "column",
          position: "relative",
          width: withOut(barWidth0 + barBetween, ea),
        },
        children: [
          {
            style: {
              display: "block",
              position: "relative",
              width: withOut(0, ea),
              height: String(barHeight) + ea,
              borderRadius: String(5) + "px",
              background: colorChip.gray4,
              marginBottom: String(barMarginBottom) + ea,
            }
          },
          {
            style: {
              display: "flex",
              flexDirection: "column",
              position: "relative",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            },
            child: {
              text: "가구 및 제안 제품 구매 비용",
              style: {
                position: "relative",
                fontSize: String(feeDescriptionSize) + ea,
                fontWeight: String(feeDescriptionWeightBold),
                color: colorChip.black,
              }
            }
          }
        ]
      },
    ]
  });

}

ServiceDetailJs.prototype.insertPeopleBox = function () {
  const instance = this;
  const { ea, media, standardWidth } = this;
  const pastBaseTong = this.baseTong;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1]);
  const small = !big;
  const { createNode, createNodes, colorChip, withOut, ajaxJson, isMac, isIphone, svgMaker } = GeneralJs;
  const newBaseTong = pastBaseTong.cloneNode(false);
  let bottomMargin;
  let margin;
  let baseTong;
  let contents;
  let middleTong;
  let middleTongPaddingBottom;
  let middleTitleMarginBottom;
  let middleTitleLineTop;
  let middleTitleSize;
  let middleTitleWeight;
  let middleTitlePadding;
  let middleTitleTextTop;
  let middleAreaPaddingTop;
  let middleInfoSize;
  let peopleTong;
  let peopleSize, peopleWeight, peopleBoldWeight;
  let peopleLineHeight;
  let peopleBetween, peopleMarginBottom;
  let topMargin;

  topMargin = <%% 160, 160, 160, 120, 50 %%>;
  bottomMargin = <%% 180, 180, 180, 180, 50 %%>;
  margin = <%% 52, 50, 40, 32, 52 %%>;

  middleTongPaddingBottom = <%% 150, 130, 100, 70, 17 %%>;
  middleTitleMarginBottom = <%% 60, 60, 60, 60, 60 %%>;

  middleTitleLineTop = <%% 68, 68, 68, 68, 68 %%>;

  middleTitleSize = <%% 23, 23, 21, 18, 4.2 %%>;
  middleTitleWeight = <%% 800, 800, 800, 800, 800 %%>;
  middleTitlePadding = <%% 16, 16, 12, 10, 2 %%>;
  middleTitleTextTop = <%% (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), 0 %%>;

  middleAreaPaddingTop = <%% 40, 40, 30, 20, 5 %%>;
  middleInfoSize = <%% 14, 14, 14, 13, 3 %%>;

  peopleSize = <%% 15, 15, 15, 15, 15 %%>;
  peopleWeight = <%% 400, 400, 400, 400, 400 %%>;
  peopleBoldWeight = <%% 800, 800, 800, 800, 800 %%>;
  peopleLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;

  peopleBetween = <%% 8, 8, 8, 8, 8 %%>;
  peopleMarginBottom = <%% 40, 40, 40, 40, 40 %%>;

  pastBaseTong.parentNode.insertBefore(newBaseTong, pastBaseTong.nextElementSibling);
  newBaseTong.style.left = String(0);
  newBaseTong.style.width = withOut(0, ea);
  newBaseTong.style.background = colorChip.white;
  newBaseTong.style.paddingTop = String(topMargin) + ea;

  contents = {
    title: "바쁜 1, 2인 가구가 선택한 홈퍼니싱",
    description: [
      "시간은 없고, 선택할 것은 많잖아요.",
      "<b%디자이너가 함께하면 시간은 줄이고 확실한 변화를 느낄 수 있어요.%b>",
    ],
    people: {
      title: "디자이너와 함께 할 때 효과",
      description: [
        "선택의 연속, 인테리어 프로세스,",
        "모두 시간과 비용의 부담이죠.",
        "이렇게 혼자하기 부담스러운 과정을",
        "디자이너가 함께하면 효율적이고",
        "합리적인 결과를 낼 수 있습니다.",
      ]
    }
  };

  baseTong = createNode({
    mother: newBaseTong,
    style: {
      display: "block",
      position: "relative",
      width: String(standardWidth) + ea,
      left: withOut(50, standardWidth / 2, ea),
      paddingBottom: String(bottomMargin) + ea,
    }
  });

  middleTong = createNode({
    mother: baseTong,
    style: {
      display: "block",
      position: "relative",
      width: withOut(0 * 2, ea),
      paddingBottom: String(middleTitleMarginBottom) + ea,
    }
  });

  createNode({
    mother: middleTong,
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      position: "relative",
      width: String(100) + '%',
      textAlign: "center",
    },
    children: [
      {
        style: {
          display: "block",
          position: "absolute",
          width: String(100) + '%',
          height: String(middleTitleLineTop) + ea,
          top: String(0),
          left: String(0),
          borderBottom: "1px solid " + colorChip.gray4,
        }
      },
      {
        text: contents.title,
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(middleTitleSize) + ea,
          fontWeight: String(middleTitleWeight),
          color: colorChip.black,
          textAlign: "center",
          paddingLeft: String(middleTitlePadding) + ea,
          paddingRight: String(middleTitlePadding) + ea,
          top: String(middleTitleTextTop) + ea,
          background: colorChip.white,
        }
      },
      {
        text: contents.description.join("\n"),
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(middleInfoSize) + ea,
          fontWeight: String(400),
          lineHeight: String(1.6),
          color: colorChip.black,
          textAlign: "center",
          paddingTop: String(middleTitlePadding) + ea,
          paddingLeft: String(middleTitlePadding * 1.5) + ea,
          paddingRight: String(middleTitlePadding * 1.5) + ea,
          background: colorChip.white,
        },
        bold: {
          fontSize: String(middleInfoSize) + ea,
          fontWeight: String(700),
          lineHeight: String(1.6),
          color: colorChip.black,
        }
      }
    ]
  });

  peopleTong = createNode({
    mother: baseTong,
    style: {
      display: "block",
      position: "relative",
      width: withOut(0 * 2, ea),
      borderBottom: "1px solid " + colorChip.gray4,
    },
    children: [
      {
        mode: "img",
        attribute: {
          src: ServiceDetailJs.binaryPath + "/people_f.svg",
        },
        style: {
          display: "block",
          position: "relative",
          width: withOut(0, ea),
        }
      }
    ]
  });

  createNode({
    mother: peopleTong,
    style: {
      display: "flex",
      position: "absolute",
      right: String(0),
      bottom: String(0),
      flexDirection: "column-reverse",
    },
    children: [
      {
        text: contents.people.description.join("\n"),
        style: {
          fontSize: String(peopleSize) + ea,
          fontWeight: String(peopleWeight),
          color: colorChip.black,
          position: "relative",
          display: "block",
          lineHeight: String(peopleLineHeight),
          marginBottom: String(peopleMarginBottom) + ea,
        }
      },
      {
        text: contents.people.title,
        style: {
          fontSize: String(peopleSize) + ea,
          fontWeight: String(peopleBoldWeight),
          color: colorChip.black,
          position: "relative",
          display: "block",
          lineHeight: String(peopleLineHeight),
          marginBottom: String(peopleBetween) + ea,
        }
      },
    ]
  });

  return [ newBaseTong, baseTong ];
}

ServiceDetailJs.prototype.insertReviewBox = function (newBaseTong, baseTong) {
  const instance = this;
  const { ea, media, standardWidth } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1]);
  const small = !big;
  const { createNode, createNodes, colorChip, withOut, ajaxJson, isMac, isIphone, svgMaker } = GeneralJs;
  let blankBlock;
  let setBlock;
  let contents;
  let imageHeight;
  let imageWidth;
  let imageBetween;
  let startBlankHeight;
  let blockBetween;
  let titleSize, titleWeight, textLineHeight;
  let quoteWidth, quoteMarginTop, quoteMarginBottom, quoteVisual;
  let descriptionSize, descriptionWeight;
  let lineTop, lineBottom;
  let tagTongHeight;
  let tagBetween;
  let tagTextTop, tagSize, tagWeight, tagPaddingLeft;

  startBlankHeight = <%% 100, 100, 100, 100, 100 %%>;

  blockBetween = <%% 40, 40, 40, 40, 40 %%>;

  imageHeight = <%% 420, 420, 420, 420, 420 %%>;
  imageWidth = <%% 890, 890, 890, 890, 890 %%>;
  imageBetween = <%% 40, 40, 40, 40, 40 %%>;

  titleSize = <%% 20, 20, 20, 20, 20 %%>;
  titleWeight = <%% 800, 800, 800, 800, 800 %%>;
  textLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;

  quoteWidth = <%% 16, 16, 16, 16, 16 %%>;
  quoteMarginTop = <%% 14, 14, 14, 14, 14 %%>;
  quoteMarginBottom = <%% 8, 8, 8, 8, 8 %%>;
  quoteVisual = <%% 1, 1, 1, 1, 1 %%>;

  descriptionSize = <%% 15, 15, 15, 15, 15 %%>;
  descriptionWeight = <%% 400, 400, 400, 400, 400 %%>;

  lineTop = <%% 20, 20, 20, 20, 20 %%>;
  lineBottom = <%% 22, 22, 22, 22, 22 %%>;

  tagTongHeight = <%% 30, 30, 30, 30, 30 %%>;

  tagBetween = <%% 4, 4, 4, 4, 4 %%>;

  tagTextTop = <%% -1, -1, -1, -1, -1 %%>;
  tagSize = <%% 12, 12, 12, 12, 12 %%>;
  tagWeight = <%% 600, 600, 600, 600, 600 %%>;
  tagPaddingLeft = <%% 12, 12, 12, 12, 12 %%>;

  blankBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      display: "block",
      height: String(startBlankHeight) + ea,
      width: withOut(0),
    }
  });

  contents = [
    {
      image: ServiceDetailJs.binaryPath + "/review_f_0.jpg",
      position: "50% 100%",
      title: "DMC SK view 33py 아파트",
      description: [
        "임차 공간이라 시공도 어려운 상황인데 배치만으로도 확실한 변화가 있었어요.",
        "예산도 중요했고, 결혼 준비 해보신 분들은 아실거에요.",
        "정말 알아볼 것도 많고 준비할 것도 많은데 시간을 잘 아꼈죠.",
        "결과적으로 디자이너님 덕에 저의 시간과 기회비용을 아낄 수 있었어요.",
      ],
      tag: [
        "깔끔",
        "심플",
        "전체 구매",
        "2,000 만원 초",
        "새입주",
        "33py",
        "홈오피스",
        "재택 근무",
        "맞벌이",
        "신혼집",
        "신혼 부부",
        "임차 공간",
        "30대",
      ],
    },
    {
      image: ServiceDetailJs.binaryPath + "/review_f_1.jpg",
      position: "50% 50%",
      title: "광주 헤스티아 35py 빌라",
      description: [
        "일하면서 시간이 정말 없었어요, 솔직히 가서 보고 사도 배송 와서 보면,",
        "잘 맞지 않을 때도 있잖아요, 디자이너님께서 주신 도면과 자료만 보고 믿고",
        "구매했는데, 배치했을 때 마음에 들더라고요! 디자이너님이 시각화 작업을",
        "잘하시는 편이라 자료를 토대로 믿고 구매하기 더 원활했어요. ",
      ],
      tag: [
        "깔끔",
        "심플",
        "전체 구매",
        "2,000 만원 초",
        "새입주",
        "33py",
        "홈오피스",
        "재택 근무",
        "맞벌이",
        "신혼집",
        "신혼 부부",
        "임차 공간",
        "30대",
      ],
    },
    {
      image: ServiceDetailJs.binaryPath + "/review_f_2.jpg",
      position: "50% 50%",
      title: "서울숲 트리마제 64py 아파트",
      description: [
        "제가 일을 하다보니 시간이 정말 부족했어요, 그래서 디자이너님과 함께 한",
        "과정이 정말 신의 한 수였죠. 제가 미처 생각하지 못한 부분까지 챙겨주셔서",
        "확실히 전문가는 다르다는 것을 느끼게 되었어요. 시간이 부족한 분들에게",
        "정말 추천하고 싶어요. 확실히 인테리어 수월해지는 것 같거든요.",
      ],
      tag: [
        "깔끔",
        "심플",
        "전체 구매",
        "2,000 만원 초",
        "새입주",
        "33py",
        "홈오피스",
        "재택 근무",
        "맞벌이",
        "신혼집",
        "신혼 부부",
        "임차 공간",
        "30대",
      ],
    },
  ];

  setBlock = ({ image, position, title, description, tag }) => {
    createNode({
      mother: baseTong,
      style: {
        display: "flex",
        flexDirection: "row",
        position: "relative",
        width: withOut(0),
        justifyContent: "center",
        alignItems: "center",
        marginBottom: String(blockBetween) + ea,
      },
      children: [
        {
          style: {
            display: "inline-block",
            position: "relative",
            width: String(imageWidth) + ea,
            height: String(imageHeight) + ea,
            marginRight: String(imageBetween) + ea,
            backgroundImage: "url('" + image + "')",
            backgroundSize: "100% auto",
            backgroundPosition: position,
            borderRadius: String(5) + "px",
            boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
          }
        },
        {
          style: {
            display: "inline-flex",
            flexDirection: "column",
            position: "relative",
            width: withOut(imageWidth + imageBetween, ea),
            height: String(imageHeight) + ea,
            justifyContent: "end",
            alignItems: "start",
          },
          children: [
            {
              text: title,
              style: {
                display: "block",
                textAlign: "left",
                position: "relative",
                fontSize: String(titleSize) + ea,
                fontWeight: String(titleWeight),
                lineHeight: String(textLineHeight),
                color: colorChip.black,
              }
            },
            {
              mode: "svg",
              source: svgMaker.doubleQuote(colorChip.deactive),
              style: {
                display: "inline-block",
                position: "relative",
                width: String(quoteWidth) + ea,
                marginTop: String(quoteMarginTop) + ea,
                marginBottom: String(quoteMarginBottom) + ea,
                marginLeft: String(quoteVisual) + ea,
              }
            },
            {
              text: description.join("\n"),
              style: {
                display: "block",
                textAlign: "left",
                position: "relative",
                fontSize: String(descriptionSize) + ea,
                fontWeight: String(descriptionWeight),
                lineHeight: String(textLineHeight),
                color: colorChip.black,
              }
            },
            {
              style: {
                display: "block",
                position: "relative",
                width: withOut(0),
                height: String(lineTop) + ea,
                marginBottom: String(lineBottom) + ea,
                borderBottom: "1px solid " + colorChip.gray4,
              }
            },
            {
              style: {
                display: "block",
                position: "relative",
                width: withOut(0),
              },
              children: tag.map((text) => {
                return {
                  style: {
                    display: "inline-flex",
                    position: "relative",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: String(tagTongHeight) + ea,
                    marginRight: String(tagBetween) + ea,
                    marginBottom: String(tagBetween) + ea,
                    borderRadius: String(8) + "px",
                    background: colorChip.gray2,
                  },
                  child: {
                    text,
                    style: {
                      display: "inline-block",
                      position: "relative",
                      top: String(tagTextTop) + ea,
                      fontSize: String(tagSize) + ea,
                      fontWeight: String(tagWeight),
                      color: colorChip.black,
                      paddingLeft: String(tagPaddingLeft) + ea,
                      paddingRight: String(tagPaddingLeft) + ea,
                    }
                  }
                }
              })
            }
          ]
        }
      ]
    });
  }

  contents.forEach(setBlock);

}

ServiceDetailJs.prototype.insertToneBox = function (pastBaseTong, baseTong) {
  const instance = this;
  const { ea, media, standardWidth } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1]);
  const small = !big;
  const { createNode, createNodes, colorChip, withOut, ajaxJson, isMac, isIphone, svgMaker } = GeneralJs;
  const newBaseTong = pastBaseTong.cloneNode(false);
  let topMargin;
  let bottomMargin;
  let margin;
  let middleTongPaddingBottom;
  let middleTitleMarginBottom;
  let middleTitleLineTop;
  let middleTitleSize;
  let middleTitleWeight;
  let middleTitlePadding;
  let middleTitleTextTop;
  let middleAreaPaddingTop;
  let middleInfoSize;
  let contents;
  let middleTong;
  let whiteTongMarginTop;
  let whiteBlock;
  let setToneSetting;
  let imageWidth, imageHeight;
  let imageBetween;
  let marginTop;
  let titleSize, titleWeight, descriptionWeight;
  let descriptionLineHeight;
  let titleMarginBottom;
  let factorTextTop, factorSize, factorWeight;
  let factorTongHeight, factorTongWidth;
  let lineStart;
  let lineWidth, lineHeight;
  let lineEnd;
  let arrowWidth;
  let boxWidth, boxHeight;

  topMargin = <%% 160, 160, 160, 120, 50 %%>;
  bottomMargin = <%% 180, 180, 180, 180, 50 %%>;
  margin = <%% 52, 50, 40, 32, 52 %%>;
  marginTop = <%% 56, 56, 56, 56, 56 %%>;

  middleTongPaddingBottom = <%% 150, 130, 100, 70, 17 %%>;
  middleTitleMarginBottom = <%% 60, 60, 60, 60, 60 %%>;

  middleTitleLineTop = <%% 68, 68, 68, 68, 68 %%>;

  middleTitleSize = <%% 23, 23, 21, 18, 4.2 %%>;
  middleTitleWeight = <%% 800, 800, 800, 800, 800 %%>;
  middleTitlePadding = <%% 16, 16, 12, 10, 2 %%>;
  middleTitleTextTop = <%% (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), 0 %%>;

  middleAreaPaddingTop = <%% 40, 40, 30, 20, 5 %%>;
  middleInfoSize = <%% 14, 14, 14, 13, 3 %%>;

  whiteTongMarginTop = <%% 48, 48, 48, 48, 48 %%>;

  imageWidth = <%% 680, 680, 680, 680, 680 %%>;
  imageHeight = <%% 400, 400, 400, 400, 400 %%>;
  imageBetween = <%% 12, 12, 12, 12, 12 %%>;

  titleSize = <%% 15, 15, 15, 15, 15 %%>;
  titleWeight = <%% 800, 800, 800, 800, 800 %%>;
  descriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
  descriptionLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;

  titleMarginBottom = <%% 6, 6, 6, 6, 6 %%>;

  factorTextTop = <%% -1, -1, -1, -1, -1 %%>;
  factorSize = <%% 13, 13, 13, 13, 13 %%>;
  factorWeight = <%% 700, 700, 700, 700, 700 %%>;

  factorTongHeight = <%% 36, 36, 36, 36, 36 %%>;
  factorTongWidth = <%% 96, 96, 96, 96, 96 %%>;

  lineStart = <%% 20, 20, 20, 20, 20 %%>;
  lineWidth = <%% 74, 74, 74, 74, 74 %%>;
  lineHeight = <%% 94, 94, 94, 94, 94 %%>;
  lineEnd = <%% 2, 2, 2, 2, 2 %%>;

  arrowWidth = <%% 10, 10, 10, 10, 10 %%>;

  boxWidth = <%% 150, 150, 150, 150, 150 %%>;
  boxHeight = <%% 80, 80, 80, 80, 80 %%>;

  pastBaseTong.parentNode.insertBefore(newBaseTong, pastBaseTong.nextElementSibling);
  newBaseTong.style.left = String(0);
  newBaseTong.style.width = withOut(0, ea);
  newBaseTong.style.background = colorChip.gray2;
  newBaseTong.style.paddingTop = String(topMargin) + ea;

  contents = {
    title: "확실한 무드 체인지",
    description: [
      "홈퍼니싱 서비스를 이용한 실제 고객님들의 비포 앤 에프터",
      "사진을 통해 확실한 무드 체인지를 느껴보세요!",
    ],
    tone: [
      {
        title: "거실 비포 에프터",
        description: [
          "시공 없이 스타일링 서비스만",
          "진행한 현장으로 가구와 패브릭,",
          "소품의 변화만으로 완전히 다른",
          "분위기의 공간으로 변화한",
          "고객님의 현장 사례입니다.",
        ],
        factors: [
          "소품 배치",
          "가구 배치",
          "패브릭 설치",
        ],
        before: ServiceDetailJs.binaryPath + "/tone_before0_f.jpg",
        after: ServiceDetailJs.binaryPath + "/tone_after0_f.jpg",
      },
      {
        title: "아이방 비포 에프터",
        description: [
          "사용하던 기존 가구의 변화된",
          "배치만으로 공간의 무드를",
          "확실하게 바꾸어 준 사례입니다.",
        ],
        factors: [
          "소품 배치",
          "가구 배치",
          "패브릭 설치",
        ],
        before: ServiceDetailJs.binaryPath + "/tone_before1_f.jpg",
        after: ServiceDetailJs.binaryPath + "/tone_after1_f.jpg",
      },
    ]
  };

  baseTong = createNode({
    mother: newBaseTong,
    style: {
      display: "block",
      position: "relative",
      width: String(standardWidth) + ea,
      left: withOut(50, standardWidth / 2, ea),
      paddingBottom: String(bottomMargin) + ea,
    }
  });

  middleTong = createNode({
    mother: baseTong,
    style: {
      display: "block",
      position: "relative",
      width: withOut(0 * 2, ea),
    }
  });

  createNode({
    mother: middleTong,
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      position: "relative",
      width: String(100) + '%',
      textAlign: "center",
    },
    children: [
      {
        style: {
          display: "block",
          position: "absolute",
          width: String(100) + '%',
          height: String(middleTitleLineTop) + ea,
          top: String(0),
          left: String(0),
          borderBottom: "1px solid " + colorChip.gray4,
        }
      },
      {
        text: contents.title,
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(middleTitleSize) + ea,
          fontWeight: String(middleTitleWeight),
          color: colorChip.black,
          textAlign: "center",
          paddingLeft: String(middleTitlePadding) + ea,
          paddingRight: String(middleTitlePadding) + ea,
          top: String(middleTitleTextTop) + ea,
          background: colorChip.gray2,
        }
      },
      {
        text: contents.description.join("\n"),
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(middleInfoSize) + ea,
          fontWeight: String(400),
          lineHeight: String(1.6),
          color: colorChip.black,
          textAlign: "center",
          paddingTop: String(middleTitlePadding) + ea,
          paddingLeft: String(middleTitlePadding * 1.5) + ea,
          paddingRight: String(middleTitlePadding * 1.5) + ea,
          background: colorChip.gray2,
        },
        bold: {
          fontSize: String(middleInfoSize) + ea,
          fontWeight: String(700),
          lineHeight: String(1.6),
          color: colorChip.black,
        }
      }
    ]
  });

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      display: "flex",
      flexDirection: "column",
      marginTop: String(whiteTongMarginTop) + ea,
      width: withOut(margin * 2, ea),
      paddingLeft: String(margin) + ea,
      paddingRight: String(margin) + ea,
      paddingTop: String(marginTop) + ea,
      paddingBottom: String(marginTop) + ea,
      background: colorChip.white,
      boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
      borderRadius: String(8) + "px",
    }
  });

  setToneSetting = ({ title, description, factors, before, after }, index) => {

    createNode({
      mother: whiteBlock,
      style: {
        display: "flex",
        flexDirection: "row",
        width: withOut(0),
        position: "relative",
      },
      children: [
        {
          style: {
            display: "inline-flex",
            flexDirection: "column",
            position: "relative",
            marginRight: String(imageBetween) + ea,
            width: withOut((imageWidth / 2) + imageWidth + (imageBetween * 2)),
            height: String(imageHeight) + ea,
            alignItems: "start",
            justifyContent: "end",
          },
          children: [
            {
              text: String(index + 1),
              style: {
                position: "absolute",
                top: String(0),
                left: String(0),
                fontSize: String(titleSize) + ea,
                fontWeight: String(500),
                fontFamily: "graphik",
                fontStyle: "italic",
                color: colorChip.green
              }
            },
            {
              text: title,
              style: {
                display: "block",
                position: "relative",
                fontSize: String(titleSize) + ea,
                fontWeight: String(titleWeight),
                color: colorChip.black,
                lineHeight: String(descriptionLineHeight),
                marginBottom: String(titleMarginBottom) + ea,
              }
            },
            {
              text: description.join("\n"),
              style: {
                display: "block",
                position: "relative",
                fontSize: String(titleSize) + ea,
                fontWeight: String(descriptionWeight),
                color: colorChip.black,
                lineHeight: String(descriptionLineHeight),
              }
            },
          ]
        },
        {
          style: {
            display: "inline-flex",
            position: "relative",
            flexDirection: "column",
            height: String(imageHeight) + ea,
            width: String(imageWidth / 2) + ea,
            marginRight: String(imageBetween) + ea,
          },
          children: [
            {
              style: {
                display: "flex",
                position: "relative",
                width: String(imageWidth / 2) + ea,
                height: String(imageHeight / 2) + ea,
                borderRadius: String(8) + "px",
                backgroundImage: "url('" + before + "')",
                backgroundSize: "100% auto",
                backgroundPosition: "50% 50%",
                marginBottom: String(imageBetween) + ea,
              }
            },
            {
              style: {
                display: "flex",
                flexDirection: "column",
                position: "relative",
                width: String(imageWidth / 2) + ea,
                height: withOut((imageHeight / 2) + imageBetween, ea),
                justifyContent: "center",
                alignItems: "center",
              },
              children: [
                {
                  style: {
                    position: "absolute",
                    width: String(lineWidth) + ea,
                    height: String(lineHeight) + ea,
                    top: String(0),
                    left: String(lineStart) + ea,
                    borderBottomLeftRadius: String(8) + "px",
                    borderLeft: "1px solid " + colorChip.gray5,
                    borderBottom: "1px solid " + colorChip.gray5,
                  }
                },
                {
                  style: {
                    position: "absolute",
                    width: String(boxWidth) + ea,
                    height: String(boxHeight) + ea,
                    border: "1px solid " + colorChip.gray5,
                    borderRadius: String(8) + "px",
                    left: withOut(50, boxWidth / 2, ea),
                    top: withOut(50, boxHeight / 2, ea),
                  }
                },
                {
                  style: {
                    position: "absolute",
                    width: String(boxWidth) + ea,
                    height: String(0) + ea,
                    borderBottom: "1px solid " + colorChip.gray5,
                    left: withOut(50, boxWidth / 2, ea),
                    top: withOut(50, 0, ea),
                  }
                },
                {
                  style: {
                    position: "absolute",
                    width: String(lineWidth + lineStart - lineEnd) + ea,
                    height: String(0),
                    right: String(lineEnd) + ea,
                    top: withOut(50, 0, ea),
                    borderBottom: "1px solid " + colorChip.gray5,
                  }
                },
                {
                  style: {
                    position: "absolute",
                    width: String(arrowWidth) + ea,
                    height: String(arrowWidth) + ea,
                    borderRight: "1px solid " + colorChip.gray5,
                    borderBottom: "1px solid " + colorChip.gray5,
                    right: String(lineEnd) + ea,
                    top: withOut(50, arrowWidth / 2, ea),
                    transform: "rotate(-45deg)",
                  }
                }
              ].concat(factors.map((factor, index) => {
                return {
                  style: {
                    display: "flex",
                    position: "relative",
                    justifyContent: "center",
                    alignItems: "center",
                    height: String(factorTongHeight) + ea,
                    width: String(factorTongWidth) + ea,
                    background: colorChip.black,
                    borderRadius: String(8) + "px",
                    marginBottom: String(index === factors.length - 1 ? 0 : 4) + ea,
                  },
                  child: {
                    text: factor,
                    style: {
                      position: "relative",
                      top: String(factorTextTop) + ea,
                      fontSize: String(factorSize) + ea,
                      fontWeight: String(factorWeight),
                      color: colorChip.white,
                    }
                  }
                }
              }))
            }
          ]
        },
        {
          style: {
            display: "inline-block",
            position: "relative",
            width: String(imageWidth) + ea,
            height: String(imageHeight) + ea,
            borderRadius: String(8) + "px",
            backgroundImage: "url('" + after + "')",
            backgroundSize: "100% auto",
            backgroundPosition: "50% 50%",
          }
        }
      ]
    });

    createNode({
      mother: whiteBlock,
      style: {
        display: "block",
        position: "relative",
        height: String(margin) + ea,
        width: withOut(0),
        marginBottom: String(margin) + ea,
        borderBottom: "1px solid " + colorChip.gray4,
      }
    })

  }

  contents.tone.forEach(setToneSetting);
  whiteBlock.removeChild(whiteBlock.lastChild);

  return [ newBaseTong, baseTong ];
}

ServiceDetailJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    this.mother.setGeneralProperties(this);

    const { returnGet, ajaxJson, requestPromise, setDebounce, colorChip } = GeneralJs;
    const getObj = returnGet();
    let newBaseTong, baseTong;

    await this.mother.ghostClientLaunching({
      mode: "front",
      name: "serviceDetail",
      client: null,
      base: {
        instance: this,
        binaryPath: ServiceDetailJs.binaryPath,
        subTitle: "홈리에종 서비스 설명",
        secondBackground: false,
        backgroundType: 0,
        talk: {
          text: "기타 문의 사항은 홈리에종 채널에 주세요!",
          event: "channel",
        }
      },
      local: async () => {
        try {
          instance.insertInitBox();
          instance.insertStartBox();
          instance.insertThreeBox();
          instance.insertSlideBox();

          [ newBaseTong, baseTong ] = instance.insertPeopleBox();
          instance.insertReviewBox(newBaseTong, baseTong);

          [ newBaseTong, baseTong ] = instance.insertToneBox(newBaseTong, baseTong);

        } catch (e) {
          await GeneralJs.ajaxJson({ message: "ServiceDetailJs.launching.ghostClientLaunching : " + e.message }, "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

    this.totalContents.children[0].style.background = colorChip.gray1;
    this.totalContents.children[1].style.transition = "all 0s ease";
    this.totalContents.children[1].style.height = String(<&& 560 | 540 | 460 | 400 | 118 &&>) + this.ea;

  } catch (err) {
    console.log(err);
    await GeneralJs.ajaxJson({ message: "ServiceDetailJs.launching 에러 일어남 => " + err.message }, "/errorLog");
  }
}
