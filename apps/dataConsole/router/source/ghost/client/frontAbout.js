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
  "hangul": "서비스 소개",
  "route": [
    "frontAbout"
  ]
} %/%/g

const FrontAboutJs = function () {
  this.mother = new GeneralJs();
}

FrontAboutJs.binaryPath = FRONTHOST + "/middle/about";

FrontAboutJs.prototype.insertInitBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics } = GeneralJs;
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

  whiteBlockMarginBottom = <%% 60, 56, 52, 50, 7 %%>;

  quoteHeight = <%% 14, 14, 14, 14, 2.5 %%>;
  quotoTongHeight = <%% 16, 16, 16, 16, 4 %%>;
  titleFontSize = <%% 35, 34, 32, 29, 5.3 %%>;
  titleFontWeight = <%% 700, 700, 700, 700, 700 %%>;
  titleTop = <%% (isMac() ? 0 : 4), (isMac() ? 0 : 4), (isMac() ? 0 : 3), (isMac() ? 0 : 2), (isMac() ? 0 : 4) %%>;

  servicePaddingTop = <%% 7, 7, 7, 7, 7 %%>;
  servicePaddingBottom = <%% 10, 10, 10, 10, 10 %%>;
  servicePaddingLeft = <%% 15, 15, 14, 13, 2.2 %%>;
  serviceMarginRight = <%% 6, 6, 6, 6, 6 %%>;
  serviceSize = <%% 13.5, 13.5, 13, 12, 3.3 %%>;
  serviceBlockPaddingTop = <%% (isMac() ? 39 : 42), (isMac() ? 39 : 42), (isMac() ? 39 : 42), (isMac() ? 39 : 42), 5 %%>;

  whiteBlockPaddingTop = <%% 56, 56, 56, 56, 9 %%>;
  whiteBlockPaddingBottom = <%% 80, 80, 80, 80, 11 %%>;

  searchBarPaddingTop = <%% 210, 190, 170, 156, 7 %%>;
  searchBarHeight = <%% 40, 40, 40, 36, 8 %%>;
  searchBarWidth = <%% 690, 516, 516, 420, 78 %%>;

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
  tagTongBottom = <%% 1, 1, 1, 1, 0 %%>;
  boxTopVisual = <%% 1, 1, 0, 0, 0 %%>;

  titleWording = "About service<b%.%b>";
  subTitleContents = "홈리에종 서비스에 대한 상세한 안내";

  mobileBlockTop = 5.6;

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
    },
    children: [
      {
        text: titleWording,
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(titleFontSize) + ea,
          fontFamily: "mont",
          fontWeight: String(titleFontWeight),
          color: colorChip.white,
          wordSpacing: String(2) + "px",
        },
        bold: {
          fontSize: String(titleFontSize) + ea,
          fontFamily: "mont",
          fontWeight: String(titleFontWeight),
          color: colorChip.white,
          opacity: String(0.4),
        }
      }
    ]
  });

}

FrontAboutJs.prototype.insertPeopleBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, svgMaker, serviceParsing } = GeneralJs;
  const { ea, media, osException, testMode } = this;
  const mobileTitleToken = "<u%>%u>&nbsp;&nbsp;";
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const mobile = media[4];
  const desktop = !mobile;
  let whiteBlock;
  let style;
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
  let initWordingSize, initWordingHeight, initWordingWordSpacing, initWordingLineHeight;
  let indexNumberBottom;
  let grayBox;
  let grayBoxMarginTop;
  let grayBoxTitleSize, grayBoxTitleWeight, grayBoxTitleTop, grayBoxTitleLeft;
  let grayBoxUp, grayBoxDown;
  let grayBoxHeight, grayBoxTop;
  let grayBoxUpWidth0, grayBoxUpWidth1, grayBoxUpWidth2, grayBoxUpWidth3;
  let grayBoxUpRight1, grayBoxUpRight2, grayBoxUpRight3;
  let grayBoxDownWidth0, grayBoxDownWidth1, grayBoxDownWidth2;
  let grayBoxDownRight1, grayBoxDownRight2;
  let grayBoxArrowTop, grayBoxArrowHeight;
  let overlappingWidth;
  let grayInnerWordingSize;
  let grayInnerWordingWeight;
  let grayInnerWordingTextTop;
  let grayUpWordings, grayDownWordings;
  let mobileGrayUpHeight;
  let mobileRightBoxHeight;
  let grayBoxImageVisualWidth;
  let marginTop;
  let mobileLeftBoxHeight;
  let titleTop;
  let descriptionSize;
  let descriptionBottom;
  let pictureTong;
  let pictureBetween;
  let pictureTongPaddingTop;
  let subDescriptionColorBoxHeight;
  let descriptionTextTop;
  let titleBarWidth, titleBarHeight, titleBarMarginRight;
  let factorImageWidth;
  let descriptionSizeInBox;
  let arrowWidth, arrowHeight;
  let subDescriptionBottomSize;
  let plusWidth;
  let plusSize;

  blockHeight = <%% 383, 316, 273, 226, 129.5 %%>;
  bottomMargin = <%% 16, 16, 16, 12, 5 %%>;
  margin = <%% 52, 52, 44, 32, 52 %%>;
  marginTop = <%% 52, 50, 40, 32, 52 %%>;
  leftRatio = <%% 0.32, 0.32, 0.32, 0.32, 0.32 %%>;

  titleFont = <%% 22, 21, 19, 17, 4.2 %%>;
  titleLeft = <%% 6, 6, 6, 6, 0 %%>;
  titleFontWeight = <%% 800, 800, 800, 800, 800 %%>;
  wordSpacing = <%% -3, -3, -3, -3, -2 %%>;

  titleTop = <%% 108, 54, 40, 30, 8.5 %%>;
  descriptionSize = <%% 15, 14, 13, 12, 3.4 %%>;
  descriptionBottom = <%% 0, -8, -7, -2, 0 %%>;
  descriptionTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.2 %%>;

  barWidth = <%% 70, 80, 80, 80, 80 %%>;
  barLeft = <%% 240, titleLeft + 234, titleLeft + 234, titleLeft + 234, titleLeft + 234 %%>;

  indexFont = <%% 19, 19, 19, 19, 19 %%>;
  indexFontWeight = <%% 200, 200, 200, 200, 200 %%>;

  leftWidth = <%% 230, 160, 140, 110, 12 %%>;

  initWordingHeight = <%% 20, 20, 20, 20, 9 %%>;
  initWordingSize = <%% 15.5, 15, 14.5, 13.5, 5 %%>;
  initWordingWordSpacing = <%% -1, -1, -1, -1, -1 %%>;
  initWordingLineHeight = <%% 9, 9, 9, 9, 9 %%>;

  indexNumberBottom = <%% 3, 4, 12, 4, 0 %%>;

  grayBoxMarginTop = <%% 108, 103, 96, 86, 36 %%>;

  grayBoxTitleSize = <%% 14, 14, 13, 11, 3.2 %%>;
  grayBoxTitleWeight = <%% 700, 700, 700, 700, 700 %%>;
  grayBoxTitleTop = <%% (isMac() ? 36 : 38), (isMac() ? 36 : 38), (isMac() ? 36 : 38), (isMac() ? 20 : 21), 0 %%>;
  grayBoxTitleLeft = <%% 40, 32, 30, 16, 6 %%>;
  grayBoxHeight = <%% 36, 36, 34, 28, 7 %%>;
  grayBoxTop = <%% 30, 30, 30, 15, 6.6 %%>;

  grayBoxUpWidth0 = <%% 280, 180, 140, 120, 24 %%>;
  grayBoxUpWidth1 = <%% 230, 160, 130, 110, 24 %%>;
  grayBoxUpWidth2 = <%% 72, 72, 72, 72, 9 %%>;
  grayBoxUpWidth3 = <%% 130, 112, 108, 90, 20 %%>;

  grayBoxUpRight1 = <%% 310, 200, 160, 125, 28.5 %%>;
  grayBoxUpRight2 = <%% 550, 370, 300, 244, 54 %%>;
  grayBoxUpRight3 = <%% 622, 422, 341, 285, 62 %%>;

  grayBoxDownWidth0 = <%% 280, 242, 195, 175, 30 %%>;
  grayBoxDownWidth1 = <%% 277, 170, 142, 120, 29 %%>;
  grayBoxDownWidth2 = <%% 175, 112, 108, 90, 20 %%>;

  grayBoxDownRight1 = <%% 310, 264, 210, 179, 34 %%>;
  grayBoxDownRight2 = <%% 577, 422, 341, 285, 62 %%>;

  grayBoxArrowTop = <%% 42, 42, 42, 24, 8.8 %%>;
  grayBoxArrowHeight = <%% 11, 11, 11, 9, 2 %%>;

  overlappingWidth = <%% 10, 10, 10, 10, 0 %%>;
  grayInnerWordingSize = <%% 13, 13, 13, 11, 2.8 %%>;
  grayInnerWordingTextTop = desktop ? (isMac() ? -1 : 0) : -0.1;
  grayInnerWordingWeight = 600;

  mobileGrayUpHeight = 18;
  mobileRightBoxHeight = 78;
  mobileLeftBoxHeight = 39;

  grayBoxImageVisualWidth = <%% 16, 4, 0, 0, 19 %%>;

  pictureBetween = <%% 2, 2, 1, 1, 0.5 %%>;
  pictureTongPaddingTop = <%% 44, 44, 36, 28, 7.5 %%>;

  subDescriptionColorBoxHeight = <%% 38, 35, 30, 24, 7.5 %%>;

  titleBarWidth = <%% 5, 5, 4, 3, 5 %%>;
  titleBarHeight = <%% 45, 42, 38, 40, 41 %%>;
  titleBarMarginRight = <%% 14, 12, 10, 10, 1 %%>;

  factorImageWidth = <%% 234, 174, 151, 135, 37 %%>;

  descriptionSizeInBox = <%% 14, 13, 11, 10, 2.9 %%>;

  arrowWidth = <%% 496, 366, 308, 256, 366 %%>;
  arrowHeight = <%% 11, 11, 10, 9, 11 %%>;

  subDescriptionBottomSize = <%% 12, 12, 11, 10, 3 %%>;

  plusWidth = <%% 60, 40, 30, 0, 0 %%>;
  plusSize = <%% 38, 26, 20, 0, 0 %%>;

  grayUpWordings = [ "프로세스", "후 시공 / 구매", "선 디자인 / 기획", "디자이너 선택" ];
  grayDownWordings = [ "비용 구성", "시공 비용", "구매 비용", "디자인비" ];

  whiteBlock = createNode({
    mother: this.baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      background: colorChip.white,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
    }
  });

  leftBox = createNode({
    mother: whiteBlock,
    style: {
      display: desktop ? "inline-flex" : "block",
      position: "relative",
      lineHeight: String(1.42),
      verticalAlign: "top",
      justifyContent: "start",
      alignItems: "center",
      marginTop: desktop ? String(marginTop) + ea : "",
      marginBottom: desktop ? String(margin) + ea : "",
      marginLeft: desktop ? String(margin) + ea : "",
      paddingTop: desktop ? "" : String(7.8) + ea,
      paddingLeft: desktop ? "" : String(6) + ea,
      paddingRight: desktop ? "" : String(6) + ea,
      width: desktop ? String(leftWidth) + ea : withOut(6 * 2, ea),
    },
    children: [
      {
        style: {
          display: big ? "inline-block" : "none",
          position: "relative",
          width: String(titleBarWidth) + ea,
          height: String(titleBarHeight) + ea,
          borderRadius: String(5) + "px",
          background: colorChip.gradientGray,
          marginRight: String(titleBarMarginRight) + ea,
          marginBottom: desktop ? String(isMac() ? 0 : 2) + ea : "",
        }
      },
      {
        text: desktop ? "홈리에종\n홈스타일링?" : mobileTitleToken + "홈리에종 홈스타일링?",
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(titleFont) + ea,
          fontWeight: String(titleFontWeight),
          color: colorChip.black,
          lineHeight: String(1.3),
          width: desktop ? "" : String(100) + '%',
          textAlign: desktop ? "" : "left",
        },
        under: {
          fontSize: String(titleFont) + ea,
          fontWeight: String(200),
          color: colorExtended.mainBlue,
        }
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
      width: desktop ? withOut(leftWidth + (margin * 2), ea) : withOut(6 * 2, ea),
      height: desktop ? String(100) + '%' : withOut(mobileLeftBoxHeight, ea),
      borderRadius: String(5) + "px",
      overflow: "hidden",
      marginTop: desktop ? String(marginTop) + ea : "",
      marginBottom: desktop ? String(margin) + ea : "",
      height: "calc(100% - " + String(margin * 2) + ea + ")",
      padding: desktop ? "" : String(6) + ea,
      paddingTop: desktop ? "" : String(2.5) + ea,
    },
    child: {
      text: desktop ? [
        "홈리에종은 빈 집으로 끝나는 기존 리모델링과 다르게 온전히 거주할 수 있는 상태로 완성하는 인테리어를 합니다.",
        "처음부터 예산을 고려하여 시공 범위를 조정하고, 가구, 소품, 패브릭의 조화까지 고려해 공간의 쓰임을 미리 고민하며 각 고객님께 맞추어 완성해 나갑니다!"
      ].join(" ") : [
        "홈리에종은 빈 집으로 끝나는 기존 리모델링과 다르게 온전히 거주할 수 있는 상태로 완성하는 인테리어를 합니다.",
        "처음부터 예산을 고려하여 시공 범위를 조정하고, 가구, 소품, 패브릭의 조화까지 고려해 공간의 쓰임을 미리 고민하며 완성해 나갑니다."
      ].join(" "),
      style: {
        display: "block",
        position: "relative",
        fontSize: String(descriptionSize) + ea,
        fontWeight: String(400),
        color: colorChip.black,
        lineHeight: String(1.6),
      },
      next: {
        style: {
          display: "block",
          position: "relative",
          width: withOut(0, ea),
          paddingTop: String(pictureTongPaddingTop) + ea,
        },
      }
    }
  });

  pictureTong = rightBox.children[1];

  if (desktop) {

    createNode({
      mother: pictureTong,
      style: {
        display: "inline-flex",
        position: "relative",
        width: "calc(calc(calc(100% - " + String(plusWidth * 2) + ea + ") - " + String(pictureBetween * (4 - 1)) + ea + ") / " + String(4) + ")",
        height: String(subDescriptionColorBoxHeight) + ea,
        borderRadius: String(5) + "px",
        background: colorChip.gray2,
        marginRight: String(pictureBetween + plusWidth) + ea,
        marginBottom: String(pictureBetween) + ea,
        justifyContent: "center",
        alignItems: "center",
        verticalAlign: "top",
      },
      child: {
        text: "빈 집으로 끝나는 리모델링",
        style: {
          top: String(descriptionTextTop) + ea,
          position: "relative",
          fontSize: String(descriptionSizeInBox) + ea,
          fontWeight: String(800),
          color: colorChip.black,
        }
      }
    });
    createNode({
      mother: pictureTong,
      style: {
        display: "inline-flex",
        position: "relative",
        width: "calc(calc(calc(calc(100% - " + String(plusWidth * 2) + ea + ") - " + String(pictureBetween * (4 - 1)) + ea + ") / " + String(2) + ") + " + String(pictureBetween) + ea + ")",
        height: String(subDescriptionColorBoxHeight) + ea,
        borderRadius: String(5) + "px",
        background: colorChip.gray1,
        marginRight: String(pictureBetween + plusWidth) + ea,
        marginBottom: String(pictureBetween) + ea,
        justifyContent: "center",
        alignItems: "center",
        verticalAlign: "top",
      },
      child: {
        text: "가구 / 소품 / 패브릭",
        style: {
          top: String(descriptionTextTop) + ea,
          position: "relative",
          fontSize: String(descriptionSizeInBox) + ea,
          fontWeight: String(800),
          color: colorChip.black,
        }
      }
    });
    createNode({
      mother: pictureTong,
      style: {
        display: "inline-flex",
        position: "relative",
        width: "calc(calc(calc(100% - " + String(plusWidth * 2) + ea + ") - " + String(pictureBetween * (4 - 1)) + ea + ") / " + String(4) + ")",
        height: String(subDescriptionColorBoxHeight) + ea,
        borderRadius: String(5) + "px",
        background: colorExtended.gradientBlue,
        marginBottom: String(pictureBetween) + ea,
        justifyContent: "center",
        alignItems: "center",
        verticalAlign: "top",
      },
      child: {
        text: "가구까지 완벽한 홈스타일링",
        style: {
          top: String(descriptionTextTop) + ea,
          position: "relative",
          fontSize: String(descriptionSizeInBox) + ea,
          fontWeight: String(800),
          color: colorChip.white,
        }
      }
    });
  
    for (let i = 0; i < 4 * 3; i++) {
      createNode({
        mother: pictureTong,
        style: {
          display: "inline-block",
          position: "relative",
          width: "calc(calc(calc(100% - " + String(plusWidth * 2) + ea + ") - " + String(pictureBetween * (4 - 1)) + ea + ") / " + String(4) + ")",
          height: String(factorImageWidth) + ea,
          borderRadius: String(5) + "px",
          background: colorChip.black,
          marginRight: String(i % 4 === (4 - 1) ? 0 : pictureBetween) + ea,
          marginBottom: String(Math.floor(i / 4) < 2 ? pictureBetween : 0) + ea,
          backgroundImage: "url('" + FrontAboutJs.binaryPath + "/rooms/a" + String(i) + ".jpg" + "')",
          backgroundSize: "100% auto",
          backgroundPosition: "50% 50%",
          verticalAlign: "top",
        }
      });

      if (i % 4 === 0) {
        createNode({
          mother: pictureTong,
          style: {
            display: big ? "inline-flex" : "none",
            position: "relative",
            width: String(plusWidth) + ea,
            height: String(factorImageWidth) + ea,
            marginBottom: String(Math.floor(i / 4) < 2 ? pictureBetween : 0) + ea,
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            verticalAlign: "top",
          },
          child: {
            text: "+",
            style: {
              position: "relative",
              top: String(descriptionTextTop) + ea,
              fontSize: String(plusSize) + ea,
              fontWeight: String(800),
              color: colorChip.black,
            }
          }
        })
      }

      if (i % 4 === 2) {
        createNode({
          mother: pictureTong,
          style: {
            display: big ? "inline-flex" : "none",
            position: "relative",
            width: String(plusWidth) + ea,
            height: String(factorImageWidth) + ea,
            marginBottom: String(Math.floor(i / 4) < 2 ? pictureBetween : 0) + ea,
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            verticalAlign: "top",
          },
          child: {
            text: "=",
            style: {
              position: "relative",
              top: String(descriptionTextTop) + ea,
              fontSize: String(plusSize) + ea,
              fontWeight: String(800),
              color: colorExtended.mainBlue,
            }
          }
        })
      }

    }
    
    createNode({
      mother: whiteBlock,
      style: {
        display: "block",
        position: "absolute",
        bottom: String(margin) + ea,
        left: String(margin) + ea,
        width: String(leftWidth) + ea,
      },
      child: {
        text: [
          <&& "<b%*%b> 홈리에종 프로젝트 현장 사진" | "<b%*%b> 홈리에종 현장 사진" | "<b%*%b> 홈리에종 현장 사진" | "<b%*%b> 홈리에종 현장 사진" | "<b%*%b> 홈리에종 현장 사진" &&>,
          <&& "<b%**%b> 인공지능 기술로 만든 이미지" | "<b%**%b> 인공지능 이미지" | "<b%**%b> 인공지능 이미지" | "<b%**%b> 인공지능 이미지" | "<b%**%b> 인공지능 이미지" &&>,
        ],
        style: {
          display: "block",
          position: "relative",
          fontSize: String(subDescriptionBottomSize) + ea,
          fontWeight: String(500),
          color: colorChip.black,
          lineHeight: String(1.5),
        },
        bold: {
          fontSize: String(subDescriptionBottomSize) + ea,
          fontWeight: String(400),
          color: colorChip.deactive,
        }
      }
    });

  } else {

    for (let z = 0; z < 3; z++) {

      createNode({
        mother: pictureTong,
        style: {
          display: "inline-flex",
          position: "relative",
          width: "calc(calc(100% - " + String(pictureBetween * (2 - 1)) + ea + ") / " + String(2) + ")",
          height: String(subDescriptionColorBoxHeight) + ea,
          borderRadius: String(5) + "px",
          marginRight: String(pictureBetween) + ea,
          marginBottom: String(pictureBetween) + ea,
          justifyContent: "center",
          alignItems: "center",
          verticalAlign: "top",
          background: colorChip.gray2,
        },
        child: {
          text: "빈 집으로 끝나는 리모델링",
          style: {
            top: String(descriptionTextTop) + ea,
            position: "relative",
            fontSize: String(descriptionSizeInBox) + ea,
            fontWeight: String(700),
            color: colorChip.black,
          }
        }
      });
      createNode({
        mother: pictureTong,
        style: {
          display: "inline-flex",
          position: "relative",
          width: "calc(calc(100% - " + String(pictureBetween * (2 - 1)) + ea + ") / " + String(2) + ")",
          height: String(subDescriptionColorBoxHeight) + ea,
          borderRadius: String(5) + "px",
          marginBottom: String(pictureBetween) + ea,
          justifyContent: "center",
          alignItems: "center",
          verticalAlign: "top",
          background: "transparent",
        },
      });

      for (let i = 0; i < 4; i++) {
        createNode({
          mother: pictureTong,
          style: {
            display: "inline-block",
            position: "relative",
            width: "calc(calc(100% - " + String(pictureBetween * (2 - 1)) + ea + ") / " + String(2) + ")",
            height: String(factorImageWidth) + ea,
            borderRadius: String(5) + "px",
            background: colorChip.black,
            marginRight: String(i % 2 === (2 - 1) ? 0 : pictureBetween) + ea,
            marginBottom: String(Math.floor(i / 2) < 2 ? pictureBetween : 0) + ea,
            backgroundImage: "url('" + FrontAboutJs.binaryPath + "/rooms/a" + String((i) + (z * 4)) + ".jpg" + "')",
            backgroundSize: "100% auto",
            backgroundPosition: "50% 50%",
          }
        });
      }

      createNode({
        mother: pictureTong,
        style: {
          display: "inline-flex",
          position: "relative",
          width: "calc(calc(100% - " + String(pictureBetween * (2 - 1)) + ea + ") / " + String(2) + ")",
          height: String(subDescriptionColorBoxHeight) + ea,
          borderRadius: String(5) + "px",
          marginRight: String(pictureBetween) + ea,
          justifyContent: "center",
          alignItems: "center",
          verticalAlign: "top",
          background: "transparent",
        },
      });
      createNode({
        mother: pictureTong,
        style: {
          display: "inline-flex",
          position: "relative",
          width: "calc(calc(100% - " + String(pictureBetween * (2 - 1)) + ea + ") / " + String(2) + ")",
          height: String(subDescriptionColorBoxHeight) + ea,
          borderRadius: String(5) + "px",
          justifyContent: "center",
          alignItems: "center",
          verticalAlign: "top",
          background: colorExtended.gradientBlue,
        },
        child: {
          text: "가구까지 완벽한 홈스타일링",
          style: {
            top: String(descriptionTextTop) + ea,
            position: "relative",
            fontSize: String(descriptionSizeInBox) + ea,
            fontWeight: String(700),
            color: colorChip.white,
          }
        }
      });

      if (z !== 3 - 1) {

        createNode({
          mother: pictureTong,
          style: {
            display: "flex",
            position: "relative",
            width: withOut(0, ea),
            height: String(5.5 * 2) + ea, 
            flexDirection: "center",
            alignItems: "center",
            textAlign: "center",
          },
          child: {
            style: {
              position: "relative",
              borderTop: "1px dashed " + colorChip.gray3,
              width: withOut(0, ea),
              height: String(0),
            }
          }
        })

      }

    }
  }

}

FrontAboutJs.prototype.insertMainContentsBox = function () {
  const instance = this;
  const { ea, media, baseTong } = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isIphone, isMac, svgMaker, serviceParsing, variableArray } = GeneralJs;
  const mobileTitleToken = "<u%>%u>&nbsp;&nbsp;";
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1]);
  const small = !big;
  const generalBig = (media[0] || media[1] || media[2]);
  const tablet = media[3];
  let whiteBlock0;
  let middleTongPaddinngTop;
  let middleTongPaddingBottom;
  let middleTitleMarginBottom;
  let middleAreaPaddingTop;
  let middleTitleSize;
  let middleTitleWeight;
  let middleTitlePadding;
  let middleTitleLineTop;
  let middleTitleTextTop;
  let contentsSize, contentsWeight, contentsLineHeight;
  let contents;
  let contentsMotherBox;
  let contentsMotherBoxMarginTop, contentsMotherBoxPaddingTop;
  let indentBoxWidth;
  let doubleLineHeight;
  let contentsMotherEntirePaddingTop, contentsMotherEntirePaddingBottom;
  let contentsSmallSize;
  let smallDescriptionPaddingTop;
  let baseTong2;
  let baseTong2Back;
  let whiteBlock1;
  let imageHeight;
  let basicContentsMaker;
  let whiteBlock2;
  let margin;
  let leftBoxWidth;
  let rightBoxPaddingTop;
  let lineHeight;
  let titleFont;
  let titleLeft;
  let titleFontWeight;
  let titleMarginBottom;
  let titleVisualTop;
  let baseTong3;
  let baseTong3Back;
  let whiteBlock3;
  let baseTong4;
  let baseTong4Back;
  let whiteBlock4;
  let whiteBlock5;
  let photoMargin;
  let columns;
  let photoMarginBottom;
  let downTitleSize;
  let whiteInjection;
  let bottomMargin;
  let marginTop;
  let whiteVisualPaddingTop;
  let whiteInjectionMarginTop;
  let middleTitleMarginBottom2;

  margin = <%% 52, 52, 44, 32, 6 %%>;
  bottomMargin = <%% 16, 16, 16, 12, 4 %%>;
  marginTop = <%% 52, 50, 40, 32, 7 %%>;
  whiteVisualPaddingTop = <%% 10, 10, 9, 8, 0 %%>;

  middleTitleSize = <%% 23, 23, 20, 18, 4.2 %%>;
  middleTitleWeight = <%% 800, 800, 800, 800, 800 %%>;
  middleTitlePadding = <%% 16, 16, 12, 10, 0 %%>;
  middleTitleLineTop = <%% 14, 14, 13, 11, (isIphone() ? 2.9 : 2.6) %%>;
  middleTitleTextTop = <%% (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), 0 %%>;

  middleTongPaddinngTop = <%% 138, 104, 92, 72, 12 %%>;
  middleTongPaddingBottom = <%% 190, 130, 100, 70, 12 %%>;
  middleTitleMarginBottom = <%% 30, 30, 50, 30, 7.5 %%>;
  middleTitleMarginBottom2 = <%% 122, 100, 84, 72, 10 %%>;
  middleAreaPaddingTop = <%% 40, 40, 30, 20, 5 %%>;

  downTitleSize = <%% 20, 18, 14, 13, 4 %%>;
  contentsSize = <%% 16, 15, 14, 13, 3.4 %%>;
  contentsSmallSize = <%% 15, 14, 13, 12, 3.4 %%>;
  contentsWeight = <%% 400, 400, 400, 400, 400 %%>;
  contentsLineHeight = <%% 1.7, 1.7, 1.7, 1.7, 1.7 %%>;

  contentsMotherBoxMarginTop = <%% 60, 60, 50, 40, 21 %%>;
  contentsMotherBoxPaddingTop = <%% 32, 32, 30, 24, 5 %%>;
  indentBoxWidth = <%% 240, 160, 140, 120, 12 %%>;

  doubleLineHeight = <%% 6, 6, 6, 6, 6 %%>;

  contentsMotherEntirePaddingTop = <%% (isMac() ? 12 : 14), (isMac() ? 12 : 14), (isMac() ? 12 : 14), (isMac() ? 8 : 10), 1 %%>;
  contentsMotherEntirePaddingBottom = <%% 46, 46, 45, 34, 6 %%>;

  smallDescriptionPaddingTop = <%% 16, 16, 14, 12, 2.1 %%>;
  imageHeight = <%% 320, 270, 230, 180, 28 %%>;

  leftBoxWidth = <%% 300, 230, 300, 300, 300 %%>;

  rightBoxPaddingTop = <%% 7, 5, 7, 7, 6.5 %%>;
  lineHeight = <%% 1.42, 1.42, 1.42, 1.42, 1.42 %%>;

  titleFont = <%% 20, 18, 14, 13, 3.8 %%>;
  titleLeft = <%% 6, 6, 6, 6, 0 %%>;
  titleFontWeight = <%% 800, 800, 800, 800, 800 %%>;
  titleMarginBottom = <%% 0, 0, 18, 12, 0.5 %%>;
  titleVisualTop = <%% (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), 1 %%>;

  photoMargin = <%% 20, 18, 18, 16, 3 %%>;
  columns = <%% 4, 4, 3, 3, 2 %%>;
  photoMarginBottom = <%% (isMac() ? 18 : 20), (isMac() ? 16 : 18), (isMac() ? 16 : 18), (isMac() ? 16 : 18), 2.5 %%>;

  whiteInjectionMarginTop = <%% 45, 40, 30, 16, 10 %%>;

  contents = {
    designer: {
      up: {
        title: "이젠, 디자이너와 함께 진행하세요!",
        description: [
          "인테리어는 막힘과 실패의 가능성이 높은 작업이에요. 혼서 하기보다 전문가의 도움을 받는 것이 좋습니다. 디자이너와 함께하는 홈스타일링은 과정과 결과 모두가 만족스러울 뿐",
          "아니라 진행하는 동안 내내 편안한 경험을 하실 수 있답니다. 디자인, 예산 계획, 공간 기획 모두 한 번에 전문가에게 맡기면, 우리 집을 고급스럽고 예쁘게 변화시킬 수 있어요.",
        ]
      },
      down: {
        title: "디자이너와 함께\n해야 하는 이유",
        children: [
          {
            description: [
              `첫 번째로, <b%인테리어의 광범위한 범위입니다.%b> 인테리어를 한 번이라도 경험해 보면 그 광범위함을 깨닫게 됩니다. 상상조차 못한 문제와 극도로 세세한 디테일이 많으며, 진행하는 동안 내내 고려해야 할 사항이 많아 끊임없이 처리해야 할 일이 발생합니다. 이렇게 생각해야 할 것이 많기 때문에 전문가를 고용하는 것은 전혀 지나친 일이 아닙니다. 전문가와 함께하면 광범위한 업무량을 쉽게 처리할 수 있으며, 시간을 절약할 수 있기 때문에 디자이너와 함께하는 것입니다.`
            ],
          },
          {
            description: [
              `두 번째로, <b%인테리어는 한번 실패하면 복구하기 힘든 점이 있습니다.%b> 인테리어는 돈도 많이 들고 시간도 많이 드는 작업에다가 복구가 쉽지 않다는 특성까지 지니고 있습니다. 돈과 시간이 무한정하지 않은 이상, 이것저것 다 해보고 마음에 드는 것으로 바꿀 수 없으며, 실패하면 실패한대로 감수해야 합니다. 실제로 혼자서 고급스럽고 예쁜 집을 시도해보다가 생각하지도 못했던 문제에 가로막혀 실패하는 경우가 매우 많으며, 이러한 실패는 큰 돈과 시간을 소모했음에도 다시 되돌릴 수 없습니다. 그렇기 때문에 경험이 많은 전문가를 고용하여 실패의 확률을 크게 낮추는 것은 필수적인 과정입니다. 이러한 선택은 오히려 돈과 시간을 절약하는 전략적인 선택일 수 있습니다.`
            ],
          },
          {
            description: [
              `세 번째로, <b%전문가와 함께하는 이유는 결과물에 대한 보증입니다.%b> 디자이너는 단순히 감각이 좋은 사람이 아니라, 인테리어 디자인 분야에서 경력을 쌓은 전문가들입니다. 이들은 실제 현장을 다녀보고 구현해본 경험이 많으며, 주거 인테리어 시공 분야에 대한 경험이 풍부합니다. 또한, 가구와 소품 브랜드에 대한 깊은 지식을 갖고 있습니다. 주거 인테리어에 대한 경험치가 다르기 때문에 어떤 컨셉으로 디자인을 진행하면 어떻게 구현될지 미리 예측할 수 있으며, 가상적으로 구현해 볼 수도 있습니다. 또한, 전문가는 도면과 3D에 대한 능력도 있어 현장 작업자들과 원활한 소통이 가능합니다. 따라서 전문가에게 맡기면 전문적인 지식과 경험, 감각 등이 더해져 월등히 좋은 결과물이 나오게 됩니다.`
            ],
          },
        ]
      }
    },
    role: {
      up: {
        title: "디자이너는 실제로 어떤 역할을 하나요?",
        description: [
          "디자이너는 프로젝트를 총괄하는 프로젝트 매니저로, 디자인은 물론, 일정의 운영, 예산 분할 계획, 시공 조율 등, 집이 만들어지는 과정에 모두 관여합니다.",
          "디자이너의 목표는 단순 디자인만 끝내는 것이 아니라 고객님의 집이 실제로 완성되는 것에 있기 때문에, 그들의 역할에 대해 신뢰와 기대를 가지셔도 좋습니다.",
        ]
      },
    },
    homeliaison: {
      up: {
        title: "홈리에종의 프로젝트 케어",
        description: desktop ? [
          "인테리어는 디자이너, 각 공정별 반장님, 현장 소장님, 제품 구입처 등 수많은 사람들과 1~3개월 이상 진행하게 되는 특별한 프로젝트입니다.",
          "전문 영역의 수많은 단계와 방식을 투명하게 관리하여 고객님이 잘 이해할 수 있도록 하나의 통합된 시스템을 제공하여 관리해 드립니다.",
        ] : [
          "인테리어는 디자이너, 반장님, 소장님, 제품 구입처 등 수많은 사람들과 1~3개월 이상 진행하게 되는 프로젝트입니다.",
          "전문 영역의 수많은 단계와 방식을 투명하게 관리하여 고객님이 잘 이해할 수 있도록 하나의 통합된 시스템을 제공하여 관리해 드립니다.",
        ]
      },
    },
    process: {
      up: {
        title: "홈리에종 프로세스, 궁금해요!",
        description: [
          "문의 후 응대가 이루어지고, 응대가 끝나면 홈리에종은 고객님께 디자이너 추천서를 보내며, 고객님이 디자이너를 선택하신 후, 계약금을 결제하시면 계약이 체결됩니다.",
          "계약이 체결되면 현장 미팅이 이루어지고 미팅 후 디자이너와 매칭이 되면, 디자인이 본격적으로 시작되고 그 디자인에 맞춰 시공과 구매가 진행되는 형식입니다."
        ]
      },
      process: {
        title: "프로세스 안내",
        image: FrontAboutJs.binaryPath + "/" + "contents4" + String(media.findIndex(m => m)) + ".png",
      }
    },
    service: {
      up: {
        title: "홈리에종의 서비스 종류",
        description: desktop ? [
          "시공의 정도에 따라 서비스를 구분합니다. 시공이 아예 없는 경우(홈퍼니싱), 톤을 보정하는 간단한 부분 시공의 경우(홈스타일링), 집의 전체 공간을 대체로 교체하는",
          "시공의 경우(토탈 스타일링)으로 나누고 스타일링에 필요한 디자인과 예산을 함께 분할하여 조화로운 구성으로 마무리합니다.",
        ] : [
          "시공 정도에 따라 서비스를 구분합니다. 시공이 없는 경우(홈퍼니싱), 간단한 부분 시공의 경우(홈스타일링), 집의 전체 공간을 교체하는",
          "시공의 경우(토탈 스타일링)으로 나누고 스타일링에 필요한 디자인과 예산을 분할해 조화로운 구성으로 마무리합니다",
        ]
      },
    },
    etc: {
      up: {
        title: "기타 안내 사항과 솔직한 고객 후기",
        description: [
          "예산과 기간은 어떻게 설정되는지, 디자이너 제공물에는 무엇이 있는지, 시공사는 외부 시공사를 선택해서 진행할 수 있는지 등에 대한 안내를 드립니다.",
          "더 상세한 안내는 홈리에종 카카오 채널 또는 유선 전화를 통해 별도 문의해주시면 받으실 수 있습니다."
        ]
      },
      down: {
        title: "기타 안내 사항",
        children: [
          {
            title: "예산과 기간",
            description: [
              `홈리에종이 설명하는 인테리어 예산은 세 가지로 나누어집니다. 시공 예산, 가구 구매 예산, 디자인비로 구성됩니다. 시공 예산은 시공에 쓰이는 비용을 의미하며, 가구 구매 예산은 가구, 소품, 패브릭 등 구매에 필요한 비용을 의미합니다. 디자인비는 디자이너에게 지불하는 비용으로, 인테리어 프로젝트가 시작하기 전에 홈리에종에 미리 지불하게 됩니다. 프로젝트에 소요되는 시간은 서비스 종류에 따라 다릅니다. 또한, 배송 상황에 따라 유동적으로 변할 수 있기 때문에 정확한 기간을 정의하기는 어렵습니다. 그러나 대략적인 평균 소요기간은 예측할 수 있습니다. 다음은 서비스별 예상 소요기간입니다. 1. 홈퍼니싱 : 30일 소요 2. 홈스타일링 : 45일 소요 3. 토탈 스타일링 : 60일 소요 4. 엑스트라 스타일링 : 60일 소요`,
            ],
          },
          {
            title: "디자이너의 제공물",
            description: [
              `디자이너의 기본 작업물은 일정표, 시공 의뢰서, 컨셉 제안서, 디자인 제안서, 배치도(도면), 콜라쥬, 3D 모델, 제품 리스트입니다. 이 중 시공 의뢰서와 디자인 제안서, 배치도, 그리고 제품 리스트는 필수적으로 제공되며, 나머지는 디자이너마다 제공될 수도 있고 안 될 수도 있습니다. 특히 3D 모델링과 같은 경우는 노가다 작업이 크기 때문에 일부 디자이너는 별도의 요금을 받거나 제공하지 않을 수도 있습니다. 디자이너가 제공하는 작업물은 고객과의 소통을 원활하게 하기 위한 것이며, ‘디자인’ 자체가 아닙니다. 디자이너가 작업물만 너무 몰두되어 있다보면 현장의 문제를 해결하지 못하는 경우가 있을 수 있습니다. 결국 가장 중요한 것은 최종 결과물인 '현장'이기 때문에, 디자이너가 디자인 작업물에만 집중하면서 현장에 대한 고민을 줄이는 것보다는 좋은 현장이 만드는 데에 더 많은 시간을 쏟아야 합니다. 작업물만 화려하고, 최종 결과물이 실제로 잘 나오지 않는 경우를 피하는 것이 중요합니다.`,
            ],
          },
          {
            title: "시공사 선택권",
            description: [
              `일반 리모델링 회사와는 달리 홈리에종은 플랫폼으로서, 디자이너를 중심으로 한 홈스타일링 운영 체제입니다. 이러한 특성 때문에 시공 과정에서 고객이 선택권을 가질 수 있습니다. 디자이너가 진행한 디자인을 그대로 시공해줄 회사를 외부에서 찾아 시공을 진행할 수 있는 것입니다. 고객의 시공사 선택권은 홈리에종 시공사, 디자이너 시공사, 외부 시공사로 구분됩니다. 홈리에종 시공사는 홈리에종과 파트너십 계약을 맺은 시공사가 시공을 진행하는 것을 의미하며, 디자이너 시공사는 디자이너와 긴밀한 관계를 갖고 있거나 소속되어 있는 시공사와 시공을 진행하는 것을 말합니다. 외부 시공사는 홈리에종 파트너십이나 디자이너와의 관계가 없는 외부 턴키 업체를 의미합니다. 홈리에종은 공정별로 시공을 진행하길 원하는 고객의 선택을 허용하지 않습니다. 따라서 고객은 홈리에종, 디자이너, 외부 턴키 업체 중에서 하나를 선택하여 시공을 진행할 수 있습니다.`,
            ],
          },
        ]
      }
    },
  };

  if (mobile) {
    contents.designer.image = FrontAboutJs.binaryPath + "/about_designer_00.jpg";
  }

  basicContentsMaker = (mother, keyword, backgroundColor, whiteBoardMode = false) => {
    createNode({
      mother: mother,
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: desktop ? "center" : "start",
        position: "relative",
        width: String(100) + '%',
        textAlign: desktop ? "center" : "left",
      },
      children: [
        {
          text: (mobile ? mobileTitleToken : "") + contents[keyword].up.title,
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: (mobile && whiteBoardMode) ? String(4) + ea : String(middleTitleSize) + ea,
            fontWeight: String(middleTitleWeight),
            color: colorChip.black,
            textAlign: desktop ? "center" : "left",
            paddingLeft: String(middleTitlePadding) + ea,
            paddingRight: String(middleTitlePadding) + ea,
            top: String(middleTitleTextTop) + ea,
            background: backgroundColor,
          },
          under: {
            fontSize: String(middleTitleSize) + ea,
            fontWeight: String(200),
            color: colorExtended.mainBlue,
          }
        },
        {
          text: contents[keyword].up.description.join(generalBig ? "\n" : " "),
          style: {
            display: "block",
            position: "relative",
            fontSize: String(contentsSmallSize) + ea,
            fontWeight: String(contentsWeight),
            lineHeight: String(contentsLineHeight),
            color: colorChip.black,
            textAlign: desktop ? "center" : "left",
            paddingTop: String(smallDescriptionPaddingTop) + ea,
            top: String(0) + ea,
            width: !tablet ? withOut(0, ea) : String(80) + '%',
          }
        }
      ]
    });
    createNode({
      mother: mother,
      style: {
        display: contents[keyword].image !== undefined ? "flex" : "none",
        marginTop: String(desktop ? contentsMotherBoxMarginTop : 6) + ea,
        paddingBottom: desktop ? "" : String(5) + ea,
        position: "relative",
        flexDirection: "column",
        alignItems: "start",
        justifyContent: "start",
      },
      child: {
        style: {
          display: "block",
          borderRadius: String(5) + "px",
          width: withOut(0, ea),
          height: String(imageHeight) + ea,
          background: colorChip.black,
          backgroundImage: contents[keyword].image !== undefined ? "url('" + contents[keyword].image + "')" : "",
          backgroundSize: desktop ? "100% auto" : "auto 100%",
          backgroundPosition: "50% 50%",
        }
      }
    });
    if (contents[keyword].down !== undefined) {
      createNode({
        mother: mother,
        style: {
          display: "flex",
          marginTop: String(contentsMotherBoxMarginTop) + ea,
          position: "relative",
          flexDirection: "column",
          alignItems: "start",
          justifyContent: "start",
          paddingTop: String(contentsMotherEntirePaddingTop) + ea,
          paddingBottom: String(contentsMotherEntirePaddingBottom) + ea,
        },
        children: [
          {
            style: {
              position: "absolute",
              top: String(0),
              left: String(0),
              width: withOut(0, ea),
              height: String(0),
              borderTop: "2px solid " + (backgroundColor === colorChip.white ? colorChip.gray2 : colorChip.gray3),
            }
          },
          {
            style: {
              position: "absolute",
              bottom: String(0),
              left: String(0),
              width: withOut(0, ea),
              height: String(0),
              borderBottom: "2px solid " + (backgroundColor === colorChip.white ? colorChip.gray2 : colorChip.gray3),
            }
          },
          {
            style: {
              display: desktop ? "none" : "block",
              position: "absolute",
              top: String(-8.5) + ea,
              left: String(0),
              width: withOut(0, ea),
            },
            child: {
              text: (mobile ? mobileTitleToken : "") + contents[keyword].down.title.replace(/\n/gi, " "),
              style: {
                fontSize: String(middleTitleSize) + ea,
                fontWeight: String(middleTitleWeight),
                color: colorChip.black,
                textAlign: desktop ? "center" : "left",
              },
              under: {
                fontSize: String(middleTitleSize) + ea,
                fontWeight: String(200),
                color: colorChip.deactive,
              }
            }
          },
          ...variableArray(contents[keyword].down.children.length).map((index) => {
            return {
              style: {
                display: "flex",
                position: "relative",
                flexDirection: "row",
                alignItems: "start",
                justifyContent: "start",
                width: withOut(0, ea),
              },
              children: [
                {
                  style: {
                    display: desktop ? "inline-flex" : "none",
                    position: "relative",
                    verticalAlign: "top",
                    width: String(indentBoxWidth) + ea,
                    height: withOut(0, ea),
                    flexDirection: "column",
                    alignItems: "start",
                    justifyContent: "start",
                    paddingTop: String(contentsMotherBoxPaddingTop) + ea,
                  },
                  children: [
                    {
                      text: index === 0 ? contents[keyword].down.title : "",
                      style: {
                        position: "relative",
                        fontSize: String(downTitleSize) + ea,
                        fontWeight: String(middleTitleWeight),
                      }
                    }
                  ]
                },
                {
                  style: {
                    display: "inline-flex",
                    position: "relative",
                    verticalAlign: "top",
                    width: String(indentBoxWidth) + ea,
                    height: withOut(0, ea),
                    flexDirection: "column",
                    alignItems: "start",
                    justifyContent: "start",
                    paddingTop: String(contentsMotherBoxPaddingTop) + ea,
                  },
                  children: [
                    {
                      text: (contents[keyword].down.children[index].title === undefined || mobile) ? String(index + 1) : contents[keyword].down.children[index].title,
                      style: {
                        position: "relative",
                        fontSize: String(contentsSize) + ea,
                        fontWeight: String(middleTitleWeight),
                        lineHeight: String(1.7),
                      }
                    }
                  ]
                },
                {
                  style: {
                    display: "inline-flex",
                    position: "relative",
                    verticalAlign: "top",
                    width: withOut(indentBoxWidth * (desktop ? 2 : 1), ea),
                    height: withOut(0, ea),
                    flexDirection: "column",
                    alignItems: "start",
                    justifyContent: "start",
                    paddingTop: String(contentsMotherBoxPaddingTop) + ea,
                  },
                  children: [
                    {
                      text: contents[keyword].down.children[index].description.join(" "),
                      style: {
                        position: "relative",
                        fontSize: String(contentsSize) + ea,
                        fontWeight: String(contentsWeight),
                        lineHeight: String(1.7),
                        color: colorChip.black,
                      },
                      bold: {
                        fontSize: String(contentsSize) + ea,
                        fontWeight: String(middleTitleWeight),
                        lineHeight: String(1.7),
                        color: colorChip.black,
                      },
                      under: {
                        fontSize: String(contentsSize) + ea,
                        fontWeight: String(middleTitleWeight),
                        lineHeight: String(1.7),
                        color: colorChip.black,
                      },
                    }
                  ]
                },
              ]
            }
          }),
        ]
      });
    }
    if (contents[keyword].process !== undefined) {
      createNode({
        mother: mother,
        style: {
          display: "block",
          position: "relative",
          width: withOut(margin * 2, ea),
          paddingTop: String(margin) + ea,
          paddingBottom: String(margin) + ea,
          paddingLeft: String(margin) + ea,
          paddingRight: String(margin) + ea,
          background: colorChip.white,
          borderRadius: String(8) + "px",
          boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
          marginTop: String(desktop ? contentsMotherBoxMarginTop : 6.5) + ea,
        },
        children: [
          {
            style: {
              display: big ? "inline-block" : "block",
              position: "relative",
              width: big ? String(leftBoxWidth) + ea : String(100) + '%',
              height: big ? String(100) + '%' : "",
              verticalAlign: "top",
            },
            child: {
              text: contents[keyword].process.title,
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(titleFont) + ea,
                fontWeight: String(titleFontWeight),
                top: String(titleVisualTop) + ea,
                marginLeft: big ? String(titleLeft) + ea : "",
                marginBottom: big ? "" : String(titleMarginBottom) + ea,
                color: colorChip.black,
                width: big ? "" : String(100) + '%',
                textAlign: desktop ? "" : "center",
                lineHeight: String(lineHeight),
              }
            }
          },
          {
            style: {
              display: big ? "inline-block" : "block",
              position: "relative",
              width: big ? withOut(leftBoxWidth, ea) : String(100) + '%',
              height: String(100) + '%',
              verticalAlign: "top",
              paddingTop: String(rightBoxPaddingTop) + ea,
            } ,
            child: {
              mode: "img",
              attribute: { src:contents[keyword].process.image },
              style: {
                display: "block",
                width: withOut(0 * 2, ea),
              }
            }
          }
        ]
      });
    }
  }

  // box0
  whiteBlock0 = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      width: withOut(0 * 2, ea),
      paddingTop: String(desktop ? middleTongPaddinngTop : 14) + ea,
      paddingBottom: String(desktop ? middleTitleMarginBottom2 : 11) + ea,
    }
  });
  basicContentsMaker(whiteBlock0, "service", colorChip.gray1);
  instance.insertThreeBox(whiteBlock0);

  whiteInjection = createNode({
    mother: baseTong,
    style: {
      display: "block",
      position: "relative",
      width: withOut(margin * 2, ea),
      paddingLeft: String(margin) + ea,
      paddingRight: String(margin) + ea,
      paddingTop: String(marginTop) + ea,
      paddingBottom: String(marginTop) + ea,
      background: colorChip.white,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
      borderRadius: String(desktop ? 8 : 1) + ea,
      marginTop: String(whiteInjectionMarginTop) + ea,
    }
  });
  
  instance.insertRoleBox(whiteInjection);
  GeneralJs.setQueue(() => {
    if (media[1]) {
      baseTong.style.marginBottom = String(150) + ea;
    }
    if (media[2]) {
      baseTong.style.marginBottom = String(130) + ea;
    }
    if (media[4]) {
      baseTong.style.marginBottom = String(20) + ea;
    }
  })

  // white area ---------------------------------------------------------------------------------------------------

  baseTong2 = baseTong.cloneNode(false);
  baseTong2Back = baseTong.cloneNode(false);
  baseTong.parentNode.appendChild(baseTong2Back);
  baseTong2Back.appendChild(baseTong2);
  baseTong2.style.paddingTop = String(0) + ea;
  baseTong2Back.style.paddingTop = String(middleAreaPaddingTop) + ea;
  baseTong2Back.style.width = String(100) + '%';
  baseTong2Back.style.left = String(0);
  baseTong2Back.style.background = colorChip.white;
  baseTong.style.marginBottom = String(desktop ? middleTongPaddingBottom : 18) + ea;
  baseTong2.style.paddingBottom = String(middleTongPaddingBottom - 40) + ea;
  baseTong2.style.borderBottom = "1px dashed " + colorChip.gray4;

  // box1

  whiteBlock1 = createNode({
    mother: baseTong2,
    style: {
      position: "relative",
      width: withOut(0 * 2, ea),
      paddingTop: String(middleTongPaddinngTop) + ea,
      paddingBottom: String(desktop ? middleTitleMarginBottom : 11) + ea,
    }
  });
  basicContentsMaker(whiteBlock1, "homeliaison", colorChip.white);

  createNode({
    mother: whiteBlock1,
    mode: "img",
    attribute: {
      src: FrontAboutJs.binaryPath + "/" + (<&& "app.png" | "app.png" | "app.png" | "app2.png" | "app3.png" &&>),
    },
    style: {
      display: "flex",
      marginTop: String(desktop ? contentsMotherBoxMarginTop : 8) + ea,
      paddingBottom: desktop ? "" : String(5) + ea,
      position: "relative",
      width: withOut(0, ea),
    },
  });

  // white area ---------------------------------------------------------------------------------------------------

  baseTong4 = baseTong.cloneNode(false);
  baseTong4Back = baseTong.cloneNode(false);
  baseTong.parentNode.appendChild(baseTong4Back);
  baseTong4Back.appendChild(baseTong4);
  baseTong4.style.paddingTop = String(0) + ea;
  baseTong4Back.style.paddingTop = String(middleAreaPaddingTop) + ea;
  baseTong4Back.style.width = String(100) + '%';
  baseTong4Back.style.left = String(0);
  baseTong4Back.style.background = colorChip.white;
  baseTong.style.marginBottom = String(desktop ? middleTongPaddingBottom : 18) + ea;
  baseTong4.style.marginBottom = String(0) + ea;
  baseTong4Back.style.marginBottom = String(0) + ea;
  baseTong4.style.paddingBottom = String(middleTongPaddingBottom) + ea;

  whiteBlock5 = createNode({
    mother: baseTong4,
    style: {
      position: "relative",
      width: "calc(100% + " + String(photoMargin) + ea + ")",
      paddingTop: String(middleTongPaddinngTop) + ea,
      paddingBottom: String(middleTitleMarginBottom) + ea,
    }
  });
  this.portfolioBlock(whiteBlock5);

}

FrontAboutJs.prototype.generateGsArray = function (number) {
  if (typeof number !== "number") {
    throw new Error("invaild input");
  }
  const instance = this;
  const { colorExtended } = GeneralJs;
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

FrontAboutJs.prototype.portfolioBlock = function (baseBlock) {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, equalJson, cleanChildren, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, selfHref } = GeneralJs;
  const { ea, media, baseTong } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const photoChar = 't';
  const photoCharMobile = "mot";
  const touchStartConst = "touchStartConstName";
  let { contentsArr, designers } = this;
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
  let limitLength;

  limitLength = contentsArr.length;

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
  quoteWidth = SvgTong.getRatio(SvgTong.stringParsing(svgMaker.doubleQuote(colorExtended.mainBlue))) * quoteHeight;
  quoteTop = <%% (isMac() ? 7 : 5), (isMac() ? 5 : 3), (isMac() ? 5 : 3), (isMac() ? 5 : 3), isIphone() ? 1.2 : 1.1 %%>;

  titleSize = <%% 21, 17, 17, 15, 3.4 %%>;
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

  for (let i = 0; i < limitLength; i++) {
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
                source: svgMaker.doubleQuote(colorExtended.mainBlue),
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
              marginTop: String(tagTongMarginTop) + ea,
              width: String(tagTongWidthRatio * 100) + '%',
              left: String(0) + ea,
            }
          }
        ]
      });
      tagTong = block.children[2];
      for (let t of tag) {
        tagBlock = createNode({
          mother: tagTong,
          text: "<b%#%b> " + t,
          style: {
            display: "inline-block",
            fontSize: String(tagSize) + ea,
            fontWeight: String(tagWeight),
            color: colorChip.black,
            paddingLeft: String(tagPaddingLeft) + ea,
            paddingTop: String(tagPaddingTop) + ea,
            paddingBottom: String(tagPaddingBottom) + ea,
            paddingRight: String(tagPaddingLeft) + ea,
            borderRadius: String(3) + "px",
            marginRight: String(tagMarginRight) + ea,
            background: colorChip.gray2,
            textAlign: "center",
          },
          bold: {
            fontWeight: String(400),
            color: colorChip.deactive,
          }
        });

        tagBlock.style.width = String(Math.ceil(tagBlock.getBoundingClientRect().width - (tagPaddingLeft * 2)) + 1) + "px";

      }

    }

  }


}

FrontAboutJs.prototype.insertThreeBox = function (middleTong) {
  const instance = this;
  const { ea, media, standardWidth, totalContents } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const { createNode, createNodes, colorChip, colorExtended, withOut, ajaxJson, isMac, isIphone, svgMaker, selfHref } = GeneralJs;
  let contents;
  let middleTongPaddinngTop;
  let middleTongPaddingBottom;
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
  let numberTop, numberLeft, numberSize, numberWeight;
  let mainBetween, subBetween, subTop;
  let mainTong, blockTong;
  let threeBlockWidth, threeBlockHeight;
  let threeTitleSize, threeTitleWeight;
  let threePhotoHeight;
  let threeTitlePaddingLeft;
  let threeTitleAreaHeight;
  let threeDescriptionBoxPaddingTop, threeDescriptionBoxBetween;
  let checkBoxWidth, checkBoxMarginRight, checkBoxTop;
  let arrowBottom, arrowWidth, arrowHeight;
  let boxNumber;
  let mobileBlockPadding;
  let mobilePhotoMarginBottom;
  let mobileTitleMarginBottom;
  let mobileContentsMarginBottom;
  let titleTextTop, descriptionTextTop;
  let smallTextTop;

  middleTongPaddinngTop = <%% 160, 140, 110, 95, 0 %%>;
  middleTongPaddingBottom = <%% 180, 150, 120, 105, 0 %%>;
  middleTitleMarginBottom = <%% 10, 10, 10, 10, 1 %%>;

  middleTitleLineTop = <%% 68, 65, 56, 49, 12 %%>;

  middleTitleSize = <%% 22, 21, 20, 18, 3.9 %%>;
  middleTitleWeight = <%% 700, 700, 700, 700, 700 %%>;
  middleTitlePadding = <%% 16, 16, 12, 10, 1.8 %%>;
  middleTitleTextTop = <%% (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), 0 %%>;

  middleAreaPaddingTop = <%% 40, 40, 30, 20, 5 %%>;
  middleInfoSize = <%% 13, 13, 12, 12, 2.7 %%>;

  threeBetween = <%% 10, 10, 6, 4, 1 %%>;
  threeHeight = <%% 170, 120, 110, 84, 21 %%>;
  threeVisualPaddingBottom = <%% 2, 2, 2, 2, 0.5 %%>;
  threeBlockMarginTop = <%% 50, 50, 48, 40, 7 %%>;

  threeWidth0 = <%% 525, 525, 525, 525, 525 %%>;
  threeWidth1 = <%% 330, 330, 330, 330, 330 %%>;

  threeTitleSize = <%% 18, 17, 16, 14, 4 %%>;
  threeTitleWeight = <%% 800, 800, 800, 800, 700 %%>;

  threeSize = <%% 13, 13, 12, 11, 2.6 %%>;
  threeWeight = <%% 400, 400, 400, 400, 400 %%>;
  threeSmallSize = <%% 13, 12, 10, 10, 2.5 %%>;

  blackCircleWidth = <%% 40, 36, 32, 28, 3 %%>;

  numberTop = <%% 14, 14, 12, 10, 2.5 %%>;
  numberLeft = <%% 22, 22, 20, 16, 3.5 %%>;
  numberSize = <%% 13, 13, 12, 10, 2.5 %%>;
  numberWeight = <%% 500, 500, 500, 500, 500 %%>;

  mainBetween = <%% 4, 4, 2, 2, 0.5 %%>;
  subBetween = <%% 6, 6, 6, 6, 0.5 %%>;
  subTop = <%% 3, 3, 3, 3, 0.5 %%>;

  threeBlockWidth = <%% 390, 340, 290, 234, 31 %%>;
  threeBlockHeight = <%% 457, 408, 385, 338, 26.4 %%>;

  threePhotoHeight = <%% 310, 270, 260, 230, 230 %%>;
  threeTitlePaddingLeft = <%% 26, 26, 24, 21, 4.8 %%>;
  threeTitleAreaHeight = <%% 60, 50, 48, 40, 5 %%>;

  threeDescriptionBoxPaddingTop = <%% 23, 23, 19, 16, 5.2 %%>;
  threeDescriptionBoxBetween = <%% 5, 5, 5, 4, (isIphone() ? 0.8 : 1) %%>;

  checkBoxWidth = <%% 10, 10, 9, 8, 2 %%>;
  checkBoxMarginRight = <%% 6, 6, 6, 5, 1 %%>;
  checkBoxTop = <%% 5, 5, 4, 4, 1 %%>;

  arrowBottom = <%% 27, 27, 24, 22, (isIphone() ? 6.3 : 6) %%>;
  arrowWidth = <%% 36, 36, 20, 12, 3 %%>;
  arrowHeight = <%% 10, 10, 8, 4, 1.5 %%>;

  mobileBlockPadding = 14;
  mobilePhotoMarginBottom = 6;
  mobileTitleMarginBottom = 2.5;
  mobileContentsMarginBottom = 4;

  smallTextTop = <%% (isMac() ? 20 : 22), (isMac() ? 15 : 17), (isMac() ? 15 : 17), (isMac() ? 11 : 13), 0 %%>;

  titleTextTop = <%% (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 1), 0 %%>;
  descriptionTextTop = <%% (isMac() ? 0 : 2.5), (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 1.5), 0 %%>;

  contents = {
    title: "나에게 맞는 서비스, 나에게 맞는 디자이너",
    description: [
      "홈리에종은 내게 맞는 서비스와 디자이너를 선택하는 과정부터 시작합니다.",
      "내 상황에 딱 맞는 서비스를 고르고 디자이너를 추천받아 보세요!",
    ],
    three: [
      {
        title: "홈퍼니싱",
        small: "시공 없이 스타일링만",
        sub: "home-furnishing",
        description: [
          "인테리어 시공 없이 가구, 패브릭, 소품만",
          "집 무드를 변화시켜주는 스타일링",
        ],
        color: colorExtended.mainBlue,
        background: FrontAboutJs.binaryPath + "/" + "s0.jpg",
        href: FRONTHOST + "/service.php?mode=furnishing",
      },
      {
        title: "홈스타일링",
        small: "부분 시공과 스타일링",
        sub: "home-styling",
        description: [
          "집 컨디션에 맞는 범위의 시공을 진행",
          "컨셉에 맞게 변화시켜주는 스타일링",
        ],
        color: colorExtended.mainBlue,
        background: FrontAboutJs.binaryPath + "/" + "s1.jpg",
        href: FRONTHOST + "/service.php?mode=styling",
      },
      {
        title: "토탈 스타일링",
        small: "전체 시공과 스타일링",
        sub: "total-styling",
        description: [
          "원하는 스타일과 라이프 패턴에 맞게 기획",
          "전체적인 구조를 변경하는 스타일링",
        ],
        color: colorExtended.mainBlue,
        background: FrontAboutJs.binaryPath + "/" + "s3.jpg",
        href: FRONTHOST + "/service.php?mode=total",
      },
    ]
  }

  boxNumber = contents.three.length;

  // three base
  threeBlock = createNode({
    mother: middleTong,
    style: {
      display: "flex",
      flexDirection: desktop ? "row" : "column",
      position: "relative",
      width: String(100) + '%',
      marginTop: String(threeBlockMarginTop) + ea,
    },
  });


  // three detail

  for (let i = 0; i < boxNumber; i++) {
    createNode({
      mother: threeBlock,
      attribute: {
        index: String(i),
      },
      event: {
        click: function (e) {
          const index = Number(this.getAttribute("index"));
          selfHref(contents.three[index].href);
        }
      },
      style: {
        display: desktop ? "inline-block" : "block",
        width: desktop ? String(threeBlockWidth) + ea : withOut(0),
        height: String(threeBlockHeight) + ea,
        background: colorChip.white,
        borderRadius: String(8) + "px",
        boxShadow: "0px 5px 20px -12px " + colorChip.shadow,
        overflow: desktop ? "" : "hidden",
        marginBottom: desktop ? "" : String(2) + ea,
        cursor: "pointer",
      },
      children: [
        {
          style: {
            display: desktop ? "flex" : "none",
            height: String(threeTitleAreaHeight) + ea,
            width: withOut(threeTitlePaddingLeft, ea),
            position: "relative",
            alignItems: "center",
            justifyContent: "start",
            paddingLeft: String(threeTitlePaddingLeft) + ea,
          },
          child: {
            text: contents.three[i].title,
            style: {
              position: "relative",
              fontSize: String(threeTitleSize) + ea,
              fontWeight: String(threeTitleWeight),
              color: colorChip.black,
              top: desktop ? String(titleTextTop) + ea : "",
            },
            next: {
              text: contents.three[i].small,
              style: {
                display: desktop ? "inline-block" : "none", 
                position: "absolute",
                fontSize: String(threeSize) + ea,
                fontWeight: String(600),
                color: colorExtended.mainBlue,
                top: String(smallTextTop) + ea,
                right: String(threeTitlePaddingLeft - 2) + ea,
              },
            }
          }
        },
        {
          style: {
            display: desktop ? "block" : "inline-block",
            position: "relative",
            width: desktop ? withOut(0, ea) : String(threeBlockWidth) + ea,
            height: desktop ? String(threePhotoHeight) + ea : String(102) + '%',
            backgroundImage: "url('" + contents.three[i].background + "')",
            backgroundSize: desktop ? "auto 100%" : "auto 100%",
            backgroundPosition: "50% 50%",
            verticalAlign: desktop ? "" : "top",
          }
        },
        {
          style: {
            display: desktop ? "flex" : "inline-block",
            position: "relative",
            flexDirection: "column",
            width: desktop ? withOut(threeTitlePaddingLeft * 2, ea) : withOut((threeTitlePaddingLeft * 2) + threeBlockWidth, ea),
            paddingLeft: String(threeTitlePaddingLeft) + ea,
            paddingRight: String(threeTitlePaddingLeft) + ea,
            paddingTop: String(desktop ? threeDescriptionBoxPaddingTop : 13.4) + ea,
            paddingBottom: String(threeDescriptionBoxPaddingTop) + ea,
            verticalAlign: desktop ? "" : "top",
            top: desktop ? "" : String(0),
          },
          children: [
            {
              style: {
                display: desktop ? "none" : "inline-block",
                position: "absolute",
                top: String(isIphone() ? 4.6 : 4.8) + ea,
                left: String(threeTitlePaddingLeft) + ea,
              },
              children: [
                {
                  text: contents.three[i].title,
                  style: {
                    display: "inline-block",
                    position: "relative",
                    fontSize: String(threeTitleSize) + ea,
                    fontWeight: String(threeTitleWeight),
                    color: colorChip.black,
                  }
                },
                {
                  text: contents.three[i].sub,
                  style: {
                    display: "inline-block",
                    position: "relative",
                    fontSize: String(2.7) + ea,
                    fontWeight: String(500),
                    color: colorChip.gray3,
                    fontFamily: "graphik",
                    fontStyle: "italic",
                    marginLeft: String(1.2) + ea,
                  }
                }
              ]
            },
            {
              style: {
                display: "flex",
                flexDirection: "row",
                position: "relative",
                marginBottom: String(threeDescriptionBoxBetween) + ea,
              },
              children: [
                {
                  mode: "svg",
                  source: instance.mother.returnCheckBox(contents.three[i].color),
                  style: {
                    display: "inline-block",
                    position: "relative",
                    width: String(checkBoxWidth) + ea,
                    marginRight: String(checkBoxMarginRight) + ea,
                    top: String(checkBoxTop) + ea,
                  }
                },
                {
                  text: contents.three[i].description[0],
                  style: {
                    display: "inline-block",
                    position: "relative",
                    fontSize: String(threeSize) + ea,
                    fontWeight: String(threeWeight),
                    color: colorChip.black,
                    top: desktop ? String(descriptionTextTop) + ea : "",
                  }
                }
              ]
            },
            {
              style: {
                display: "flex",
                flexDirection: "row",
                position: "relative",
              },
              children: [
                {
                  mode: "svg",
                  source: instance.mother.returnCheckBox(contents.three[i].color),
                  style: {
                    display: "inline-block",
                    position: "relative",
                    width: String(checkBoxWidth) + ea,
                    marginRight: String(checkBoxMarginRight) + ea,
                    top: String(checkBoxTop) + ea,
                  }
                },
                {
                  text: contents.three[i].description[1],
                  style: {
                    display: "inline-block",
                    position: "relative",
                    fontSize: String(threeSize) + ea,
                    fontWeight: String(threeWeight),
                    color: colorChip.black,
                    top: desktop ? String(descriptionTextTop) + ea : "",
                  }
                }
              ]
            },
            {
              mode: "svg",
              source: svgMaker.horizontalArrow(arrowWidth, arrowHeight, contents.three[i].color),
              style: {
                display: !media[3] ? "inline-block" : "none",
                position: "absolute",
                bottom: String(arrowBottom) + ea,
                right: String(threeTitlePaddingLeft) + ea,
                width: String(arrowWidth) + ea,
              }
            }
          ]
        }
      ]
    });
  
    if (i !== boxNumber - 1) {
      createNode({
        mother: threeBlock,
        style: {
          display: desktop ? "inline-block" : "none",
          position: "relative",
          width: "calc(calc(100% - " + String(threeBlockWidth * boxNumber) + ea + ") / " + String(boxNumber - 1) + ")",
          height: String(threeBlockHeight) + ea,
        },
        child: {
          style: {
            display: media[0] ? "inline-block" : "none",
            position: "absolute",
            top: String(0),
            left: String(0),
            width: String(50) + '%',
            height: withOut(0, ea),
            borderRight: "1px dashed " + colorChip.gray3,
            boxSizing: "border-box",
          },
        }
      });
    }
  }

}

FrontAboutJs.prototype.insertRoleBox = function (whiteBlock) {
  const instance = this;
  const { ea, media } = this;
  const baseTong = this.baseTong;
  const mobileTitleToken = "<u%>%u>&nbsp;&nbsp;";
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1]);
  const small = !big;
  const { createNode, createNodes, colorChip, colorExtended, withOut, ajaxJson, isMac } = GeneralJs;
  let blockMarginBottom;
  let leftBox0, leftBox1, leftBox2, leftBox3, leftBox4;
  let rightBox0, rightBox1, rightBox2, rightBox3, rightBox4;
  let contents0, contents1, contents2, contents3, contents4;
  let lastBlockMarginBottom;
  let margin;
  let titleFont;
  let titleLeft;
  let titleFontWeight;
  let wordSpacing;
  let lineHeight;
  let leftBoxWidth;
  let boxMargin;
  let boxTong;
  let rightBoxPaddingTop;
  let titleVisualTop;
  let boxTongPaddingBottom;
  let rightBoxPaddingTopFontVersion;
  let contents1TitleSize, contents1TitleWeight;
  let contents1UpBox, contents1DownBox;
  let contents1TitleBetween;
  let contents1Between;
  let contents1Columns;
  let contents1UpBoxWidth;
  let contents1UpBoxMargin;
  let contents1UpBoxPaddingLeft;
  let contents1UpBoxPaddingTop;
  let contents1UpBoxCheckTop;
  let contents1UpBoxCheckWidth;
  let contents1UpBoxCheckMarginRight;
  let contents1UpBoxTitleSize;
  let contents1UpBoxTitleWeight;
  let contents1UpBoxWhiteMarginTop;
  let contents1UpBoxWhitePaddingTop;
  let contents1UpBoxWhitePaddingBottom;
  let contents1UpBoxWhiteSize;
  let contents1UpBoxWhiteWeight;
  let contents1UpBoxWhiteWeightBold;
  let contents1UpBoxWhiteLineHeight;
  let contents1DownBoxPaddingTop;
  let contents1DownBoxPaddingBottom;
  let contents1DownBoxPaddingMargin;
  let contents1DownBoxPaddingLeft;
  let contents1DownBoxCircleHeight;
  let contents1DownBoxTitleMarginTop;
  let contents1DownBoxDescriptionMarginTop;
  let contents1DownBoxDescriptionSize;
  let num;
  let titleMarginBottom;
  let contentsMotherBoxMarginTop;
  let titleBarWidth;
  let titleBarHeight;
  let titleBarMarginRight;
  let descriptionSize;
  let pictureTongPaddingTop;
  let descriptionBottom;
  let descriptionTextTop;

  blockMarginBottom = <%% 16, 16, 16, 16, 2 %%>;

  lastBlockMarginBottom = <%% 160, 160, 160, 80, 12 %%>;

  margin = <%% 52, 52, 44, 32, 6 %%>;

  titleFont = <%% 22, 21, 20, 16, 4.2 %%>;
  titleLeft = <%% 6, 6, 6, 6, 0 %%>;
  titleFontWeight = <%% 800, 800, 800, 800, 800 %%>;
  wordSpacing = <%% -3, -3, -3, -3, -2 %%>;
  titleMarginBottom = <%% 0, 0, 18, 12, 0.5 %%>;

  lineHeight = <%% 1.42, 1.42, 1.42, 1.42, 1.42 %%>;

  leftBoxWidth = <%% 240, 160, 140, 120, 12 %%>;

  boxMargin = <%% 36, 25, 24, 36, 36 %%>;

  rightBoxPaddingTop = <%% 7, 5, 7, 7, 6.5 %%>;
  rightBoxPaddingTopFontVersion = <%% 2, 2, 2, 2, 7 %%>;

  titleVisualTop = <%% (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), 2 %%>;

  boxTongPaddingBottom = <%% 10, 10, 6, 10, 10 %%>;

  contents1TitleSize = <%% 17, 17, 16, 14, 3.6 %%>;
  contents1TitleWeight = <%% 700, 700, 800, 800, 800 %%>;
  contents1TitleBetween = <%% 14, 12, 10, 8, 2 %%>;
  contents1Between = <%% 45, 40, 30, 22, 9 %%>;

  contents1Columns = <%% 5, 5, 5, 5, 3 %%>;

  contents1UpBoxWidth = <%% 232, 197, 229, 190, 88 %%>;
  contents1UpBoxMargin = <%% 10, 8, 8, 7, 1 %%>;
  contents1UpBoxPaddingLeft = <%% 18, 16, 18, 12, 3.5 %%>;
  contents1UpBoxPaddingTop = <%% (isMac() ? 16 : 17), (isMac() ? 14 : 15), (isMac() ? 15 : 16), (isMac() ? 11 : 12), 3.5 %%>;

  contents1UpBoxCheckTop = <%% (isMac() ? 7 : 5), (isMac() ? 7 : 5), (isMac() ? 7 : 5), (isMac() ? 7 : 5), 15.5 %%>;
  contents1UpBoxCheckWidth = <%% 11, 11, 11, 10, 2.6 %%>;
  contents1UpBoxCheckMarginRight = <%% 6, 6, 6, 6, 6 %%>;

  contents1UpBoxTitleSize = <%% 15, 15, 14, 13, 3.2 %%>;
  contents1UpBoxTitleWeight = <%% 600, 600, 600, 600, 700 %%>;

  contents1UpBoxWhiteMarginTop = <%% (isMac() ? 10 : 8), (isMac() ? 10 : 8), (isMac() ? 10 : 8), (isMac() ? 8 : 6), 3 %%>;
  contents1UpBoxWhitePaddingTop = <%% (isMac() ? 16 : 17), (isMac() ? 16 : 17), (isMac() ? 16 : 17), (isMac() ? 13 : 14), 3 %%>;
  contents1UpBoxWhitePaddingBottom = <%% (isMac() ? 21 : 19), (isMac() ? 21 : 19), (isMac() ? 21 : 19), (isMac() ? 18 : 16), 3.5 %%>;

  contents1UpBoxWhiteSize = <%% 14, 13, 14, 11, 2.8 %%>;
  contents1UpBoxWhiteWeight = <%% 400, 400, 400, 400, 400 %%>;
  contents1UpBoxWhiteWeightBold = <%% 700, 700, 700, 700, 700 %%>;
  contents1UpBoxWhiteLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;

  contents1DownBoxPaddingTop = <%% 30, 22, 24, 18, 3 %%>;
  contents1DownBoxPaddingBottom = <%% (isMac() ? 36 : 34), (isMac() ? 24 : 22), (isMac() ? 26 : 24), (isMac() ? 21 : 19), 3.5 %%>;
  contents1DownBoxPaddingMargin = <%% 10, 8, 10, 8, 1 %%>;
  contents1DownBoxPaddingLeft = <%% 41, 28, 24, 18, 3 %%>;
  contents1DownBoxCircleHeight = <%% 119, 92, 106, 87, 19 %%>;

  contents1DownBoxTitleMarginTop = <%% (isMac() ? 17 : 18), (isMac() ? 12 : 13), (isMac() ? 14 : 15), (isMac() ? 12 : 13), 2.5 %%>;
  contents1DownBoxDescriptionMarginTop = <%% (isMac() ? 5 : 4), (isMac() ? 5 : 4), (isMac() ? 5 : 4), (isMac() ? 4 : 3), 1 %%>;
  contents1DownBoxDescriptionSize = <%% 13, 12, 13, 11, 2.5 %%>;

  contentsMotherBoxMarginTop = <%% 64, 64, 42, 40, 7 %%>;

  titleBarWidth = <%% 5, 5, 4, 3, 5 %%>;
  titleBarHeight = <%% 45, 42, 38, 41, 41 %%>;
  titleBarMarginRight = <%% 14, 12, 10, 10, 1 %%>;

  descriptionSize = <%% 15, 14, 13, 12, 3.4 %%>;
  descriptionBottom = <%% 0, -8, -7, -2, 0 %%>;
  descriptionTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.2 %%>;
  pictureTongPaddingTop = <%% 44, 44, 36, 28, 11 %%>;

  contents1 = [
    {
      title: "디자이너 역할",
      children: [
        {
          title: "디자인",
          description: "큰 <b%가구부터 패브릭%b>과 소품,\n그리고 <b%시공 디자인%b>을 제안해요.",
        },
        {
          title: "일정 운영",
          description: "시공과 제품 주문 시기의\n<b%일정을 일괄적으로 관리%b>해요.",
        },
        {
          title: "예산 운영",
          description: "<b%같은 예산도 다르게%b> 쓰일 수 있도록\n예산을 분배하고 최적화합니다.",
        },
      ]
    },
    {
      title: "디자이너 제공물",
      children: [
        {
          title: "일정표",
          description: "계약 기간 기준의\n전체 일정 캘린더",
          image: "contents10.png",
        },
        {
          title: "컨셉 제안",
          description: "프로젝트에 반영될\n컨셉 디자인",
          image: "contents11.png",
        },
        {
          title: "배치도",
          description: "공간별 구성 및\n가구/소품 배치 도면",
          image: "contents12.png",
        },
        {
          title: "제품 제안",
          description: "기존 제품 활용 제안 및\n새 제품 구매 리스트",
          image: "contents13.png",
        },
        {
          title: "시공 디자인",
          description: "시공 포함된\n서비스 진행 시 해당",
          image: "contents14.png",
        },
      ]
    }
  ];

  if (mobile) {
    contents1[1].children.push({
      title: "시공 의뢰서",
      description: "시공에 대한\n구체적인 지시사항",
      image: "contents15.png",
    });
  }

  leftBox1 = createNode({
    mother: whiteBlock,
    style: {
      display: big ? "inline-flex" : "flex",
      position: "relative",
      width: big ? String(leftBoxWidth) + ea : String(100) + '%',
      verticalAlign: "top",
      justifyContent: "start",
      alignItems: "center",
      marginBottom: desktop ? "" : String(2.1) + ea,
    },
    children: [
      {
        style: {
          display: big ? "inline-block" : "none",
          position: "relative",
          width: String(titleBarWidth) + ea,
          height: String(titleBarHeight) + ea,
          borderRadius: String(5) + "px",
          background: colorChip.gradientGray,
          marginRight: String(titleBarMarginRight) + ea,
          marginBottom: desktop ? String(isMac() ? -2 : 2) + ea : "",
        }
      },
      {
        text: <&& "디자이너\n선택을 먼저!" | "디자이너\n선택을 먼저!" | "디자이너 선택을 먼저!" | "디자이너 선택을 먼저!" | mobileTitleToken + "디자이너 선택을 먼저!" &&>,
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(titleFont) + ea,
          fontWeight: String(titleFontWeight),
          wordSpacing: String(wordSpacing) + "px",
          marginBottom: big ? "" : String(titleMarginBottom) + ea,
          color: colorChip.black,
          width: big ? "" : String(100) + '%',
          textAlign: big ? "" : (desktop ? "center" : "left"),
          lineHeight: String(1.3),
        },
        under: {
          fontSize: String(titleFont) + ea,
          fontWeight: String(200),
          color: colorExtended.mainBlue,
        }
      }
    ]
  });

  rightBox1 = createNode({
    mother: whiteBlock,
    style: {
      display: big ? "inline-block" : "block",
      position: "relative",
      width: big ? withOut(leftBoxWidth, ea) : String(100) + '%',
      height: String(100) + '%',
      verticalAlign: "top",
      textAlign: !media[3] ? "" : "center",
    }
  });

  createNode({
    mother: rightBox1,
    text: big ? [
      "디자인 감성의 취향을 맞추고, 시공 난이도에 따라 적합한 역량을 가진 디자이너를 선택합니다. 처음부터 공간 상태, 예산, 스타일 등을 고려하여",
      "시공하고 스타일링하면 만족스러운 공간 경험을 하게 됩니다. 수많은 의사 결정이 필요한 인테리어, 전문가와 함께 하며 실패를 줄이고 가심비 높은 결과를 얻기를 추천합니다."
    ].join(" ") : [
      "디자인 감성의 취향을 맞추고, 시공 난이도에 따라 역량을 가진 디자이너를 선택합니다. 처음부터 공간, 예산, 스타일을 고려해",
      "홈스타일링하면 만족스러운 경험을 하게 됩니다. 수많은 결정이 필요한 인테리어, 전문가와 함께 하며 효과적인 결과를 얻기를 추천합니다."
    ].join(desktop ? "\n" : " "),
    style: {
      display: "block",
      position: "relative",
      fontSize: String(descriptionSize) + ea,
      fontWeight: String(400),
      color: colorChip.black,
      lineHeight: String(1.6),
      textAlign: big ? "" : (desktop ? "center" : "left"),
    },
    next: {
      style: {
        display: "block",
        position: "relative",
        width: withOut(0, ea),
        paddingTop: String(pictureTongPaddingTop) + ea,
      },
    }
  });

  createNode({
    mother: rightBox1,
    text: "디자이너 전면 배치",
    style: {
      display: desktop ? "block" : "none",
      fontSize: String(contents1TitleSize) + ea,
      fontWeight: String(contents1TitleWeight),
      color: colorChip.black,
      marginBottom: String(contents1TitleBetween) + ea,
      textAlign: desktop ? "left" : "center",
    }
  });

  createNode({
    mode: "img",
    mother: rightBox1,
    attribute: {
      src: <&& FrontAboutJs.binaryPath + "/model.svg" | FrontAboutJs.binaryPath + "/model1.svg" | FrontAboutJs.binaryPath + "/model1.svg" | FrontAboutJs.binaryPath + "/model2.svg" | FrontAboutJs.binaryPath + "/model3.svg" &&>,
    },
    style: {
      display: "block",
      position: "relative",
      width: withOut(0, ea),
    },
    next: {
      style: {
        display: "block",
        position: "relative",
        width: withOut(0, ea),
        paddingTop: String(pictureTongPaddingTop) + ea,
      },
    }
  });

  createNode({
    mother: rightBox1,
    text: desktop ? contents1[0].title : "디자이너의 역할과 제공물",
    style: {
      display: "block",
      fontSize: String(contents1TitleSize) + ea,
      fontWeight: String(contents1TitleWeight),
      color: colorChip.black,
      marginBottom: String(contents1TitleBetween) + ea,
      textAlign: desktop ? "left" : "center",
    }
  });

  num = 0;
  for (let { title, description } of contents1[0].children) {

    contents1UpBox = createNode({
      mother: rightBox1,
      style: {
        display: desktop ? "inline-block" : "block",
        position: "relative",
        width: desktop ? String(contents1UpBoxWidth) + ea : withOut(contents1UpBoxPaddingLeft * 2, ea),
        marginRight: desktop ? String(num === contents1[0].children.length - 1 ? 0 : contents1UpBoxMargin) + ea : "",
        background: colorChip.gray1,
        borderRadius: String(5) + "px",
        verticalAlign: "top",
        paddingLeft: String(contents1UpBoxPaddingLeft) + ea,
        paddingTop: String(contents1UpBoxPaddingTop) + ea,
        paddingRight: String(contents1UpBoxPaddingLeft) + ea,
        paddingBottom: String(contents1UpBoxPaddingLeft) + ea,
        marginBottom: desktop ? "" : String(1) + ea,
        textAlign: "left",
      }
    });

    createNode({
      mother: contents1UpBox,
      mode: "svg",
      source: instance.mother.returnCheckIcon(colorExtended.mainBlue),
      style: {
        display: "inline-block",
        position: desktop ? "relative" : "absolute",
        top: String(contents1UpBoxCheckTop) + ea,
        left: desktop ? "" : String(contents1UpBoxPaddingLeft) + ea,
        width: String(contents1UpBoxCheckWidth) + ea,
        marginRight: String(contents1UpBoxCheckMarginRight) + ea,
        verticalAlign: "top",
      }
    });

    createNode({
      mother: contents1UpBox,
      text: title,
      style: {
        display: "inline-block",
        width: desktop ? "" : String(25) + '%',
        fontSize: String(contents1UpBoxTitleSize) + ea,
        fontWeight: String(contents1UpBoxTitleWeight),
        verticalAlign: "top",
        textAlign: "left",
      }
    });

    createNode({
      mother: contents1UpBox,
      style: {
        display: desktop ? "block" : "inline-block",
        width: desktop ? String(contents1UpBoxWidth) + ea : String(75) + '%',
        background: colorChip.white,
        boxShadow: "0px 3px 13px -9px " + colorChip.shadow,
        borderRadius: String(5) + "px",
        marginTop: desktop ? String(contents1UpBoxWhiteMarginTop) + ea : "",
        paddingTop: String(contents1UpBoxWhitePaddingTop) + ea,
        paddingBottom: String(contents1UpBoxWhitePaddingBottom) + ea,
      },
      children: [
        {
          text: description,
          style: {
            display: "block",
            width: String(100) + '%',
            textAlign: "center",
            fontSize: String(contents1UpBoxWhiteSize) + ea,
            fontWeight: String(contents1UpBoxWhiteWeight),
            color: colorChip.black,
            lineHeight: String(contents1UpBoxWhiteLineHeight),
          },
          bold: {
            fontSize: String(contents1UpBoxWhiteSize) + ea,
            fontWeight: String(contents1UpBoxWhiteWeightBold),
            color: colorChip.black,
          }
        }
      ]
    });

    num++;
  }

  createNode({
    mother: rightBox1,
    text: contents1[1].title,
    style: {
      display: desktop ? "block" : "none",
      fontSize: String(contents1TitleSize) + ea,
      fontWeight: String(contents1TitleWeight),
      color: colorChip.black,
      marginTop: String(contents1Between) + ea,
      marginBottom: String(contents1TitleBetween) + ea,
      textAlign: desktop ? "left" : "center",
    }
  });

  for (let i = 0; i < contents1[1].children.length; i++) {
    contents1DownBox = createNode({
      mother: rightBox1,
      style: {
        display: "inline-block",
        width: "calc(calc(100% - " + String(contents1DownBoxPaddingMargin * (contents1Columns - 1)) + ea + ") / " + String(contents1Columns) + ")",
        marginRight: desktop ? String(i === contents1Columns - 1 ? 0 : contents1DownBoxPaddingMargin) + ea : String(i % 3 === 2 ? 0 : contents1DownBoxPaddingMargin) + ea,
        paddingTop: String(contents1DownBoxPaddingTop) + ea,
        paddingBottom: String(contents1DownBoxPaddingBottom) + ea,
        marginBottom: desktop ? "" : String(contents1DownBoxPaddingMargin) + ea,
        background: colorChip.gray1,
        borderRadius: String(5) + "px",
        verticalAlign: "top",
      }
    })

    createNode({
      mother: contents1DownBox,
      style: {
        marginLeft: String(contents1DownBoxPaddingLeft) + ea,
        marginRight: String(contents1DownBoxPaddingLeft) + ea,
        width: withOut(contents1DownBoxPaddingLeft * 2, ea),
        height: String(contents1DownBoxCircleHeight) + ea,
        borderRadius: String(contents1DownBoxCircleHeight) + ea,
        background: colorChip.gray3,
        backgroundImage: "url('" + FrontAboutJs.binaryPath + "/" + contents1[1].children[i].image + "')",
        backgroundSize: "100% auto",
        backgroundPosition: "50% 50%",
      }
    })

    createNode({
      mother: contents1DownBox,
      text: contents1[1].children[i].title,
      style: {
        display: "block",
        textAlign: "center",
        width: String(100) + '%',
        fontSize: String(contents1UpBoxTitleSize) + ea,
        fontWeight: String(contents1UpBoxTitleWeight),
        color: colorChip.black,
        marginTop: String(contents1DownBoxTitleMarginTop) + ea,
      }
    })

    createNode({
      mother: contents1DownBox,
      text: contents1[1].children[i].description,
      style: {
        display: "block",
        textAlign: "center",
        width: String(100) + '%',
        fontSize: String(contents1DownBoxDescriptionSize) + ea,
        fontWeight: String(contents1UpBoxWhiteWeight),
        color: colorChip.black,
        marginTop: String(contents1DownBoxDescriptionMarginTop) + ea,
        lineHeight: String(contents1UpBoxWhiteLineHeight),
      }
    })

  }

}

FrontAboutJs.prototype.launching = async function (loading) {
  const instance = this;
  const { returnGet, ajaxJson, requestPromise, setDebounce, colorChip, colorExtended, homeliaisonAnalytics, dateToString } = GeneralJs;
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
        backgroundType: 10,
        talk: {
          text: "실제 고객님들의 후기를 살펴보세요!",
          event: "review",
          second: true,
        }
      },
      local: async () => {
        try {
          instance.insertInitBox();
          instance.insertPeopleBox();
          instance.insertMainContentsBox();

          setInterval(() => {
            homeliaisonAnalytics({
              page: instance.pageName,
              standard: instance.firstPageViewTime,
              action: "readTimer",
              data: {
                cliid: "null",
                href: window.encodeURIComponent(window.location.href),
                date: dateToString(new Date(), true),
              },
            }).catch((err) => {
              console.log(err);
            });
          }, 60 * 1000);

        } catch (e) {
          console.log(e);
          await GeneralJs.ajaxJson({ message: "FrontAboutJs.launching.ghostClientLaunching : " + e.message }, BACKHOST + "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);
    
    this.totalContents.children[0].style.background = colorChip.gray1;
    this.totalContents.children[1].style.transition = "all 0s ease";
    this.totalContents.children[1].style.height = String(<&& 500 | 440 | 400 | 360 | 66 &&>) + this.ea;

  } catch (err) {
    console.log(err);
    await ajaxJson({ message: "FrontAboutJs.launching 에러 일어남 => " + err.message }, BACKHOST + "/errorLog");
  }
}
