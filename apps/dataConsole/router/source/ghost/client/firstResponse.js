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
      "return ('홈리에종 1차 응대 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('홈리에종 1차 응대 페이지 입니다! | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "firstResponse",
  "hangul": "1차 응대",
  "route": [
    "firstResponse"
  ]
} %/%/g

const FirstResponseJs = function () {
  this.mother = new GeneralJs();
}

FirstResponseJs.binaryPath = FRONTHOST + "/middle/response";

FirstResponseJs.prototype.insertInitBox = function () {
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

  titleWording = "서비스 상세 안내";
  subTitleContents = "디자이너 추천전 서비스 상세 안내";

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

FirstResponseJs.prototype.insertDescriptionBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, svgMaker, serviceParsing } = GeneralJs;
  const { ea, media, osException, testMode } = this;
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
  let title, description;
  let leftTitleWidth;
  let descriptionMarginTop;
  let rightBoxHeight;
  let imageBetween;
  let rightBoxMarginLeft;
  let titleLineHeight;
  let circleTop, circleLeft, circleWidth;
  let mobilePaddingTop, mobilePaddingLeft;
  let descriptionRightBase, descriptionLeftBase;
  let mobileDescriptionLeftBaseWidth;
  let mobileDescriptionBlockMarginTop;

  blockHeight = <%% 500, 316, 273, 226, 129.5 %%>;
  bottomMargin = <%% 16, 16, 16, 12, 5 %%>;
  margin = <%% 52, 52, 44, 32, 52 %%>;
  marginTop = <%% 52, 50, 40, 32, 52 %%>;
  leftRatio = <%% 0.32, 0.32, 0.32, 0.32, 0.32 %%>;

  titleFont = <%% 26, 24, 22, 18, 4.6 %%>;
  titleLeft = <%% 6, 6, 6, 6, 0 %%>;
  titleFontWeight = <%% 800, 800, 800, 800, 800 %%>;
  wordSpacing = <%% -3, -3, -3, -3, -2 %%>;

  titleTop = <%% 108, 54, 40, 30, 8.5 %%>;
  descriptionSize = <%% 15, 14, 13, 12, 3.7 %%>;
  descriptionBottom = <%% 0, -8, -7, -2, 0 %%>;

  barWidth = <%% 70, 80, 80, 80, 80 %%>;
  barLeft = <%% 240, titleLeft + 234, titleLeft + 234, titleLeft + 234, titleLeft + 234 %%>;

  indexFont = <%% 19, 19, 19, 19, 19 %%>;
  indexFontWeight = <%% 200, 200, 200, 200, 200 %%>;

  leftWidth = <%% 658, 480, 412, 230, 300 %%>;

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

  leftTitleWidth = <%% 180, 175, 175, 175, 18 %%>;
  descriptionMarginTop = <%% 120, 50, 40, 25, 0 %%>; 

  rightBoxHeight = <%% 552, 498, 474, 592, 40 %%>;

  imageBetween = <%% 8, 8, 6, 4, 1 %%>;

  rightBoxMarginLeft = <%% 64, 50, 50, 40, 11 %%>;

  circleTop = <%% (isMac() ? 4 : 2), (isMac() ? 4 : 2), (isMac() ? 5 : 3), (isMac() ? 4 : 2), 4 %%>;
  circleLeft = <%% -7, -7, -6, -5, -7 %%>;
  circleWidth = <%% 6, 6, 5, 4, 1 %%>;

  titleLineHeight = 1.4;

  mobilePaddingTop = 7;
  mobilePaddingLeft = 6;
  mobileDescriptionLeftBaseWidth = 5;
  mobileDescriptionBlockMarginTop = 5;

  grayUpWordings = [ "프로세스", "후 시공 / 구매", "선 디자인 / 기획", "디자이너 선택" ];
  grayDownWordings = [ "비용 구성", "시공 비용", "구매 비용", "디자인비" ];

  title = media[0] ? "인테리어는\n시공이 전부가\n아닙니다." : "인테리어는\n시공이 전부가 아닙니다.";
  description = [
    `일반적으로 주거 인테리어를 생각하면 시공 위주의 리모델링이 떠오르곤 합니다. 1차원적인 시공 선택과 견적 내기에 방점을 찍은 리모델링 문화가 주거 인테리어의 대표적인 영역으로 자리매김하면서 <b%집을 인테리어한다는 개념은 시공에 집중하면서 비슷한 스타일을 찍어내는 형태%b>가 되었습니다.`,
    `이러한 리모델링 문화는 문제가 많습니다. 공간 디자인이 부재한 인테리어는 체계적인 시공 계획을 할 수 없고, 주먹구구식 시공 진행은 그저 하얗고 깔끔하게 찍어내는 데에 집중되기 때문입니다. 그렇게 만들어진 공간 위에 스타일링 없는 가구와 소품 배치는 그 깔끔한 바탕마저 의미 없는 것으로 만들어 버립니다. <b%조화롭지 못한 가구, 중구난방의 소품, 살림 살이 가득한 짐들로 인해 집은 리모델링을 한 의미가 없는 공간이%b> 되어버리곤 합니다.`,
    `공간을 인테리어한다는 것은 오로지 시공을 통해 바탕을 깔끔하게 만드는 것만이 아닙니다. 제대로 된 공간 디자인이란 인테리어를 시작하기 전 가구와 소품이 포함된 최종적인 모습을 먼저 생각합니다. 그리고 그에 따라 시공을 하고 가구를 구입하여 위치와 배치를 완벽하게 조정하면, 완벼한 인테리어 디자인을 보실 수 있습니다. 따라서 인테리어는 시공이 전부가 아니라는 것을 명심해야 하며, <b%시공만 원하면서 예쁜집을 꿈꾸셨다면 그것은 잘못된 접근 방법입니다.%b>`,
  ];

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
      width: desktop ? String(leftWidth) + ea : String(100) + '%',
      lineHeight: String(1.42),
      height: desktop ? "calc(100% - " + String(margin * 2) + ea + ")" : "auto",
      marginTop: desktop ? String(marginTop) + ea : "",
      marginBottom: desktop ? String(margin) + ea : "",
      marginLeft: desktop ? String(margin) + ea : "",
      flexDirection: desktop ? (media[0] ? "row" : "column") : "",
    },
    children: [
      {
        text: desktop ? title : "",
        style: {
          display: desktop ? "block" : "flex",
          position: "relative",
          fontSize: String(titleFont) + ea,
          fontWeight: String(titleFontWeight),
          color: colorChip.black,
          width: desktop ? (media[0] ? String(leftTitleWidth) + ea : withOut(0, ea)) : withOut(mobilePaddingLeft * 2, ea),
          lineHeight: desktop ? String(titleLineHeight) : "",
          flexDirection: mobile ? "row" : "",
          paddingTop: mobile ? String(mobilePaddingTop) + ea : "",
          paddingLeft: mobile ? String(mobilePaddingLeft) + ea : "",
          paddingRight: mobile ? String(mobilePaddingLeft) + ea : "",
        },
        child: {
          style: {
            display: desktop ? "inline-block" : "none",
            position: "absolute",
            top: String(circleTop) + ea,
            left: String(circleLeft) + ea,
            width: String(circleWidth) + ea,
            height: String(circleWidth) + ea,
            borderRadius: String(circleWidth) + ea,
            background: colorChip.green,
          }
        }
      },
      {
        text: desktop ? description.join("\n\n") : "",
        style: {
          position: "relative",
          bottom: mobile ? String(descriptionBottom) + ea : "",
          left: mobile ? String(titleLeft) + ea : "",
          color: colorChip.black,
          paddingLeft: mobile ? String(mobilePaddingLeft) + ea : "",
          paddingRight: mobile ? String(mobilePaddingLeft) + ea : "",
          width: desktop ? (media[0] ? withOut(leftTitleWidth, ea) : withOut(0, ea)) : withOut(mobilePaddingLeft * 2, ea),
          fontSize: String(descriptionSize) + ea,
          fontWeight: String(400),
          lineHeight: String(1.6),
          marginTop: String(descriptionMarginTop) + ea,
          paddingBottom: mobile ? String(mobilePaddingTop) + ea : "",
        },
        bold: {
          color: colorChip.black,
          fontSize: String(descriptionSize) + ea,
          fontWeight: String(700),
          lineHeight: String(1.6),
        }
      }
    ]
  });

  if (mobile) {

    createNode({
      mother: leftBox.children[0],
      text: ">&nbsp;&nbsp;",
      style: {
        fontSize: String(titleFont) + ea,
        fontWeight: String(200),
        color: colorChip.green,
      }
    });
    createNode({
      mother: leftBox.children[0],
      text: title,
      style: {
        fontSize: String(titleFont) + ea,
        fontWeight: String(titleFontWeight),
        color: colorChip.black,
      }
    });

    for (let i = 0; i < description.length; i++) {
      descriptionLeftBase = createNode({
        mother: leftBox.children[1],
        style: {
          display: "inline-flex",
          verticalAlign: "top",
          position: "relative",
          flexDirection: "column",
          width: String(mobileDescriptionLeftBaseWidth) + ea,
        },
        child: {
          text: String(i + 1),
          style: {
            display: "block",
            position: "relative",
            fontSize: String(descriptionSize) + ea,
            fontWeight: String(200),
            lineHeight: String(1.7),
            color: colorChip.green,
            marginTop: String(i === 0 ? 0 : mobileDescriptionBlockMarginTop) + ea,
          },
        }
      });
      descriptionRightBase = createNode({
        mother: leftBox.children[1],
        style: {
          display: "inline-flex",
          verticalAlign: "top",
          position: "relative",
          flexDirection: "column",
          width: withOut(mobileDescriptionLeftBaseWidth, ea),
        },
        child: {
          text: description[i],
          style: {
            display: "block",
            position: "relative",
            fontSize: String(descriptionSize) + ea,
            fontWeight: String(400),
            lineHeight: String(1.7),
            color: colorChip.black,
            marginTop: String(i === 0 ? 0 : mobileDescriptionBlockMarginTop) + ea,
          },
          bold: {
            fontSize: String(descriptionSize) + ea,
            fontWeight: String(700),
            lineHeight: String(1.7),
            color: colorChip.black,
          }
        }
        
      });
    }

  }

  rightBox = createNode({
    mother: whiteBlock,
    style: {
      display: desktop ? "inline-flex" : "block",
      position: "relative",
      verticalAlign: "top",
      top: String(0) + ea,
      width: desktop ? withOut(leftWidth + (margin * 2) + rightBoxMarginLeft, ea) : withOut(rightBoxMarginLeft + mobilePaddingLeft, ea),
      height: desktop ? String(rightBoxHeight) + ea : String(rightBoxHeight) + ea,
      borderRadius: String(5) + "px",
      overflow: "hidden",
      flexDirection: desktop ? "row" : "",
      marginTop: desktop ? String(marginTop) + ea : String(5) + ea,
      marginBottom: desktop ? String(margin) + ea : String(7) + ea,
      marginRight: desktop ? String(margin) + ea : "",
      paddingLeft: String(rightBoxMarginLeft) + ea,
      paddingRight: mobile ? String(mobilePaddingLeft) + ea : "",
    },
  });
  createNode({
    mother: rightBox,
    style: {
      display: "inline-block",
      position: "relative",
      width: "calc(calc(100% - " + String(imageBetween * 2) + ea + ") / " + String(3) + ")",
      height: withOut(0, ea),
      background: colorChip.gray1,
      borderRadius: String(5) + "px",
      marginRight: String(imageBetween) + ea,
      backgroundImage: "url('" + FirstResponseJs.binaryPath + "/construct0.jpg" + "')",
      backgroundPosition: "50% 50%",
      backgroundSize: desktop ? "auto 100%" : "100% auto",
    },
  });
  createNode({
    mother: rightBox,
    style: {
      display: "inline-block",
      position: "relative",
      width: "calc(calc(100% - " + String(imageBetween * 2) + ea + ") / " + String(3) + ")",
      height: withOut(0, ea),
      background: colorChip.gray1,
      borderRadius: String(5) + "px",
      marginRight: String(imageBetween) + ea,
      backgroundImage: "url('" + FirstResponseJs.binaryPath + "/construct1.jpg" + "')",
      backgroundPosition: "50% 50%",
      backgroundSize: desktop ? "auto 100%" : "100% auto",
    },
  });
  createNode({
    mother: rightBox,
    style: {
      display: "inline-block",
      position: "relative",
      width: "calc(calc(100% - " + String(imageBetween * 2) + ea + ") / " + String(3) + ")",
      height: withOut(0, ea),
      background: colorChip.gray1,
      borderRadius: String(5) + "px",
      backgroundImage: "url('" + FirstResponseJs.binaryPath + "/construct2.jpg" + "')",
      backgroundPosition: "50% 50%",
      backgroundSize: desktop ? "auto 100%" : "100% auto",
    },
  });

  if (mobile) {
    leftBox.insertBefore(rightBox, leftBox.children[1]);
  }

}

FirstResponseJs.prototype.insertMainContentsBox = function () {
  const instance = this;
  const { ea, media, baseTong } = this;
  const { withOut, returnGet, createNode, colorChip, isIphone, isMac, svgMaker, serviceParsing, variableArray, ajaxJson, sleep, selfHref } = GeneralJs;
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
  let imageBetween;
  let whiteInjection2;
  let buttonAreaMarginTop, buttonAreaMarginBottom;
  let buttonWidth, buttonHeight;
  let buttonTextTop, buttonSize, buttonWeight;
  let upBase;
  let imageBase, imagesBase;

  margin = <%% 52, 52, 44, 32, 6 %%>;
  bottomMargin = <%% 16, 16, 16, 12, 4 %%>;
  marginTop = <%% 52, 50, 40, 32, 7 %%>;
  whiteVisualPaddingTop = <%% 10, 10, 9, 8, 0 %%>;

  middleTitleSize = <%% 23, 23, 20, 18, 4.2 %%>;
  middleTitleWeight = <%% 800, 800, 800, 800, 800 %%>;
  middleTitlePadding = <%% 16, 16, 12, 10, 0 %%>;
  middleTitleLineTop = <%% 14, 14, 13, 11, (isIphone() ? 2.9 : 2.6) %%>;
  middleTitleTextTop = <%% (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), 0 %%>;

  middleTongPaddinngTop = <%% 108, 84, 72, 52, 10 %%>;
  middleTongPaddingBottom = <%% 150, 130, 100, 70, 12 %%>;
  middleTitleMarginBottom = <%% 30, 30, 30, 30, 7.5 %%>;
  middleAreaPaddingTop = <%% 40, 40, 30, 20, 5 %%>;

  downTitleSize = <%% 20, 18, 14, 13, 4 %%>;
  contentsSize = <%% 16, 15, 14, 13, 3.7 %%>;
  contentsSmallSize = <%% 15, 14, 13, 12, 3.7 %%>;
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

  whiteInjectionMarginTop = <%% 45, 40, 30, 16, 0 %%>;

  imageBetween = <%% 6, 6, 6, 5, 1 %%>;

  buttonAreaMarginTop = <%% 30, 30, 28, 26, 6 %%>;
  buttonAreaMarginBottom = <%% 12, 12, 12, 12, 1 %%>;
  buttonWidth = <%% 144, 144, 144, 132, 30 %%>;
  buttonHeight = <%% 38, 38, 38, 36, 8 %%>;
  buttonTextTop = <%% (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), -0.2 %%>;
  buttonSize = <%% 15, 15, 15, 14, 3.3 %%>;
  buttonWeight = <%% 800, 800, 800, 800, 800 %%>;

  contents = {
    designer: {
      up: {
        title: "새로운 트렌드, 홈스타일링",
        description: [
          `인테리어 시장에서 떠오르는 트렌드는 '홈스타일링'입니다. 홈스타일링은 디자인을 먼저 진행하고, 그 디자인에 따라 시공을 진행한 뒤 스타일링으로 마무리하는 인테리어입니다.`,
          `합리적 시공과 가구, 소품, 패브릭을 이용하여 운영한다는 특징이 있습니다. 이러한 트렌드가 인기를 얻는 이유는 합리적인 예산으로 완성도 있는 인테리어를 할 수 있기 때문입니다.`,
        ]
      },
      down: {
        title: "홈스타일링을\n해야 하는 이유",
        children: [
          {
            description: [
              `홈스타일링은 다양한 장점을 가지고 있지만, 그 중에서도 대표적으로 3가지의 장점이 있습니다. 첫째로는 <b%'인테리어의 제대로 된 완성'입니다.%b> 인테리어는 바탕 시공만으로는 끝나지 않습니다. 바탕 시공을 어떻게 하는지는 시작에 불과하며, 이후에는 가구와 소품의 조합을 어떻게 할 지 컨셉을 정하고 구체적인 제품을 선택해야 합니다. 이러한 작업들을 통해 인테리어 디자인을 완성시키는 것이 원래의 인테리어 디자인의 작업입니다. 홈스타일링은 이러한 과정을 필수적으로 거치며, 디자인 컨셉과 제품 선택 등을 통해 주거 인테리어의 완성도를 높입니다. 이러한 점에서 리모델링과는 다른 장점을 가지고 있습니다.`,
            ],
          },
          {
            description: [
              `두 번째로는 <b%합리적인 시공 진행%b>입니다. 리모델링 회사들은 시공을 많이 하면 할수록 이익이 많이 남기 때문에 고객에게 쓸데없이 시공을 많이 시키고 강요하는 경우가 많습니다. 이러한 경우 고객은 불필요한 시공을 많이 하게 되면서 예산을 낭비하게 됩니다. 하지만 홈스타일링에서는 달라집니다. 디자이너는 시공을 얼마나 많이 하는 지에 상관 없이 똑같은 디자인비를 받게 되므로 시공을 무작정 많이 하는 것에 관심이 없습니다. 게다가 디자인을 기준으로 시공 범위를 정할 수 있기 때문에 어떤 시공이 진짜로 필요하고 어떤 시공이 필요없는지를 명확하게 구체적으로 정할 수 있습니다. 이러한 이유로 불필요한 시공을 방지할 수 있으며 고객은 쓸데없이 예산을 낭비하지 않을 수 있게 됩니다.`,
            ],
          },
          {
            description: [
              `세 번째로는 <b%고객의 상황과 취향에 딱 맞는 커스터마이징 서비스%b>라는 점입니다. 디자인을 선행하면서 예산에 대한 고려도 함께 이루어집니다. 주어진 예산 안에서 어떤 시공을 하고, 어떤 가격대에 있는 가구를 구매해야 가장 효과적인 결과를 얻을 수 있는지를 고민하고 실현합니다. 예산이 부족하다면 시공 범위를 줄이고 가구 브랜드의 급을 낮춰 보여지는 모습에 집중하고, 예산이 충분하다면 그에 맞는 브랜드의 가구를 추천합니다. 또한, 예산 뿐만 아니라 고객의 집 계약 상태, 가족 구성원, 평수 등 여러 조건을 모두 고려하여 최적의 디자인을 기획합니다. 이렇게 디자인 및 기획을 선행함으로써 고객 맞춤형 결과물을 얻을 수 있습니다. 리모델링과는 달리 시공만 무조건 시작하는 것이 아니라, 디자인과 기획을 통해 최적의 결과를 얻을 수 있는 큰 장점을 가지고 있습니다.`,
            ],
          },
        ]
      },
      images: [
        FRONTHOST + "/middle/detail/review/f22.jpg",
        FRONTHOST + "/middle/detail/review/s10.jpg",
        FRONTHOST + "/middle/detail/review/t10.jpg",
      ]
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
    curation: {
      up: {
        title: "홈리에종 큐레이션과 디자이너 추천",
        description: [
          (media[0] || media[1]) ? "서비스에 대해 이해하셨다면, 이제 고객님은 홈리에종으로부터 취향뿐만 아니라 예산, 일정, 거리 등 다양한 요인들도 모두 고려된 맞춤형 디자이너 추천을 받을 수 있습니다." : "이제 고객님은 홈리에종으로부터 취향뿐만 아니라 예산, 일정, 거리 등 다양한 요인들도 모두 고려된 맞춤형 디자이너 추천을 받을 수 있습니다.",
          "하단의 버튼을 눌러 나에게 딱 맞는 디자이너 추천서를 받아보세요! 손쉽게 내 상황에 딱 맞고 작업 가능한 디자이너 리스트를 제공받으실 수 있습니다."
        ]
      },
      buttons: [
        {
          title: "디자이너 추천 받기",
          event: () => {
            return async function (e) {
              try {
                let projects, loading;

                loading = instance.mother.grayLoading();
                projects = await ajaxJson({ whereQuery: { cliid: instance.client.cliid } }, SECONDHOST + "/getProjects", { equal: true });
                projects.sort((a, b) => {
                  return b.proposal.date.valueOf() - a.proposal.date.valueOf();
                })

                if (projects.length > 0) {
                  await sleep(2 * 1000);
                  selfHref(FRONTHOST + "/proposal.php?proid=" + projects[0].proid);
                  loading.remove();
                } else {
                  window.alert("스타일 체크를 진행하지 않아 디자이너 추천서를 받으실 수 없습니다! 스타일 체크를 진행하시고 홈리에종에 문의주세요!");
                  selfHref(FRONTHOST + "/curation.php?cliid=" + instance.client.cliid);
                  loading.remove();
                }

              } catch (e) {
                console.log(e);
              }
            }
          }
        }
      ]
    },
    homeliaison: {
      up: {
        title: "홈스타일링, 홈리에종에서 해야만 하는 이유",
        description: [
          `이렇게 좋은 홈스타일링, 프리랜서 디자이너와 별도로 진행할 수도 있지 않을까요? 홈리에종을 거치지 않고 디자이너와 직접적으로 연결하면`,
          `더 많은 비용을 절약할 수 있지 않을까 생각할 수 있겠지만, 그래도 홈리에종을 통해 홈스타일링을 해야 하는 이유는 분명히 있습니다. 다음과 같은 이유가 있습니다.`,
        ]
      },
      down: {
        title: "홈리에종과 함께\n해야 하는 이유",
        children: [
          {
            description: [
              `<b%홈리에종에는 검증된 디자이너들만 모여 있습니다.%b> 프리랜서 디자이너는 수많이 존재하지만, 그들의 실력과 작업 방식을 정확히 평가하기는 어렵습니다. 또한 인테리어 업계에서는 표준화가 잘 이루어지지 않아, 작업 방식이 다양하고 품질이 일정하지 않을 수 있습니다. 그러나 홈리에종의 디자이너들은 검증 과정을 거쳐 선발된 전문가들로 구성되어 있으며, 홈리에종의 표준에 맞춰 작업을 수행합니다. 또한 결과물에 대한 보증 및 포트폴리오 검증도 철저히 이루어지므로, 홈리에종의 디자이너라면 믿고 인테리어를 맡길 수 있는 것입니다.`,
            ],
          },
          {
            description: [
              `<b%홈리에종은 체계적인 큐레이션 시스템이 있습니다.%b> 인테리어를 디자이너와 진행하려면, 수많은 디자이너들 중에서 내 취향과 조건에 부합하는 디자이너를 찾아야 합니다. 하지만 내가 원하는 디자이너가 있더라도 예산, 일정, 거리 등 다양한 요인들을 고려해야 하기 때문에 선택 과정은 복잡하고 어렵습니다. 홈리에종의 큐레이션 서비스는 이러한 문제를 해결해줍니다. 고객 상담을 통해 고객님의 기본 정보와 여러 조건들을 체계적으로 분석하여, 최적의 인테리어 디자이너 3~4명을 추천해줍니다. 이를 통해 고객님은 어떤 디자이너가 가장 적합한지를 쉽게 확인할 수 있으며, 예산, 일정, 거리 등 다양한 요인들도 모두 고려된 맞춤형 추천을 받을 수 있습니다. 홈리에종과 함께하면 디자이너를 찾기 위해 복잡하고 긴 시간을 들일 필요 없이, 쉽고 빠르게 디자이너를 추천받고 선택할 수 있습니다.`,
            ],
          },
          {
            description: [
              `<b%홈리에종은 프로젝트 케어 시스템을 갖추고 있습니다.%b> 인테리어 프로젝트를 진행하는 동안 디자이너와 고객만 소통하는 것이 아니라, 홈리에종은 중재 역할을 하며 문제가 발생하면 적극적으로 해결해줍니다. 만약 디자이너와 맞지 않는 경우, 다른 디자이너로 교체하는 것도 가능합니다. 프로젝트의 각 중요 단계에서 홈리에종은 고객과 디자이너에게 전화를 걸어 문제 없이 진행되고 있는지 확인하며, 현장을 사진으로 확인하여 프로젝트가 원활하게 마무리될 수 있도록 합니다. 또한, 세팅과 촬영까지 진행하게 하여 최종 결과물을 확실하게 만들어드립니다. 고객님은 프로젝트가 중간에 흐지부지 끝나거나 제대로 마무리되지 않을까 하는 걱정 없이, 프로젝트가 완성도 높게 끝나길 기다리기만 하시면 됩니다.`,
            ],
          },
        ]
      },
      image: FirstResponseJs.binaryPath + "/about_homeliaison_01.jpg",
    },
    process: {
      up: {
        title: "홈리에종 프로세스, 궁금해요!",
        description: [
          "문의 후 응대가 이루어지고, 끝나면 홈리에종은 고객님께 디자이너 추천서를 보내며, 고객님이 디자이너를 선택하신 후, 계약금을 결제하시면 계약이 체결됩니다.",
          "계약이 체결되면 현장 미팅이 이루어지고 미팅 후 디자이너와 매칭이 되면, 디자인이 본격적으로 시작되고 그 디자인에 맞춰 시공과 구매가 진행되는 형식입니다."
        ]
      },
      process: {
        title: "프로세스 안내",
        image: FirstResponseJs.binaryPath + "/" + "contents4" + String(media.findIndex(m => m)) + ".png",
      }
    },
    service: {
      up: {
        title: "홈리에종의 서비스 종류",
        description: [
          "서비스는 시공에 따라 구분됩니다. 홈퍼니싱은 시공이 없는 서비스이며, 홈스타일링과 토탈 스타일링은 부분 시공만 진행하는 지, 전체 시공을 진행하는 지에 따라 구분됩니다.",
          "엑스트라 스타일링은 토탈 스타일링의 프리미엄 버전으로, '설계 변경'이라고도 불리며, 시공 디자인이 필요한지 여부에 따라 토탈과 구분됩니다.",
        ]
      },
    },
    etc: {
      up: {
        title: "기타 안내 사항",
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
              `일반 리모델링 회사와는 달리 홈리에종은 플랫폼으로서, 디자이너를 중심으로 한 홈스타일링 운영 체제입니다. 이러한 특성 때문에 시공 과정에서 선택권을 가질 수 있습니다. 디자이너가 진행한 디자인을 그대로 시공해줄 회사를 외부에서 찾아 시공을 진행할 수 있는 것입니다. 고객의 시공사 선택권은 홈리에종 시공사, 디자이너 시공사, 외부 시공사로 구분됩니다. 홈리에종 시공사는 홈리에종과 파트너십 계약을 맺은 시공사가 시공을 진행하는 것을 의미하며, 디자이너 시공사는 디자이너와 긴밀한 관계를 갖고 있거나 소속되어 있는 시공사와 시공을 진행하는 것을 말합니다. 외부 시공사는 홈리에종 파트너십이나 디자이너와의 관계가 없는 외부 턴키 업체를 의미합니다. 홈리에종은 공정별로 시공을 진행하길 원하는 고객의 선택을 허용하지 않습니다. 따라서 고객은 홈리에종, 디자이너, 외부 턴키 업체 중에서 하나를 선택하여 시공을 진행할 수 있습니다.`,
            ],
          },
        ]
      }
    },
  };

  basicContentsMaker = (mother, keyword, backgroundColor, whiteBoardMode = false) => {
    upBase = createNode({
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
            color: colorChip.green,
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
    imageBase = createNode({
      mother: mother,
      style: {
        display: contents[keyword].image !== undefined ? "flex" : "none",
        marginTop: String(desktop ? contentsMotherBoxMarginTop : 4.5) + ea,
        paddingBottom: desktop ? "" : String(3) + ea,
        position: "relative",
        flexDirection: "column",
        alignItems: "start",
        justifyContent: "start",
        width: mobile ? withOut(0, ea) : "",
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

    if (mobile) {
      upBase.insertBefore(imageBase, upBase.children[1]);
    }

    if (Array.isArray(contents[keyword].images)) {
      imagesBase = createNode({
        mother: mother,
        style: {
          display: "flex",
          marginTop: String(desktop ? contentsMotherBoxMarginTop : 4.5) + ea,
          paddingBottom: desktop ? "" : String(3) + ea,
          position: "relative",
          flexDirection: "row",
          alignItems: "start",
          justifyContent: "start",
          width: mobile ? withOut(0, ea) : "",
        },
        children: contents[keyword].images.map((src, index) => {
          return {
            style: {
              display: "inline-block",
              borderRadius: String(5) + "px",
              width: "calc(calc(100% - " + String(imageBetween * (contents[keyword].images.length - 1)) + ea + ") / " + String(contents[keyword].images.length) + ")",
              height: String(imageHeight) + ea,
              marginRight: (index === contents[keyword].images.length - 1 ? "" : String(imageBetween) + ea),
              background: colorChip.black,
              backgroundImage: "url('" + src + "')",
              backgroundSize: desktop ? (media[0] ? "100% auto" : "auto 100%") : "auto 100%",
              backgroundPosition: "50% 50%",
            }
          }
        }),
      });

      if (mobile) {
        upBase.insertBefore(imagesBase, upBase.children[1]);
      }

    }
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
    if (contents[keyword].buttons !== undefined) {

      createNode({
        mother: mother,
        style: {
          display: "flex",
          marginTop: String(buttonAreaMarginTop) + ea,
          position: "relative",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: String(buttonAreaMarginBottom) + ea,
        },
        children: contents[keyword].buttons.map(({ title, event }, index) => {
          return {
            event: {
              click: event()
            },
            style: {
              display: "inline-flex",
              position: "relative",
              width: String(buttonWidth) + ea,
              height: String(buttonHeight) + ea,
              borderRadius: String(5) + "px",
              background: colorChip.gradientGreen,
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            },
            child: {
              text: title,
              style: {
                position: "relative",
                top: String(buttonTextTop) + ea,
                fontSize: String(buttonSize) + ea,
                fontWeight: String(buttonWeight),
                color: colorChip.white,
              }
            }
          }
        })
      });


    }
  }

  // box0

  whiteBlock0 = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      width: withOut(0 * 2, ea),
      paddingTop: String(middleTongPaddinngTop) + ea,
      paddingBottom: String(middleTitleMarginBottom) + ea,
    }
  });
  basicContentsMaker(whiteBlock0, "designer", colorChip.gray1);


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
  baseTong2.style.paddingBottom = String(middleTongPaddingBottom) + ea;

  // box1

  whiteBlock1 = createNode({
    mother: baseTong2,
    style: {
      position: "relative",
      width: withOut(0 * 2, ea),
      paddingTop: String(middleTongPaddinngTop) + ea,
      paddingBottom: String(middleTitleMarginBottom) + ea,
    }
  });
  basicContentsMaker(whiteBlock1, "homeliaison", colorChip.white);

  // box2

  whiteBlock2 = createNode({
    mother: baseTong2,
    style: {
      position: "relative",
      width: withOut(0 * 2, ea),
      paddingTop: String(middleTongPaddinngTop) + ea,
      paddingBottom: String(middleTitleMarginBottom) + ea,
    }
  });
  basicContentsMaker(whiteBlock2, "process", colorChip.white);


  // gray area ---------------------------------------------------------------------------------------------------

  baseTong3 = baseTong.cloneNode(false);
  baseTong3Back = baseTong.cloneNode(false);
  baseTong.parentNode.appendChild(baseTong3Back);
  baseTong3Back.appendChild(baseTong3);
  baseTong3.style.paddingTop = String(0) + ea;
  baseTong3Back.style.paddingTop = String(middleAreaPaddingTop) + ea;
  baseTong3Back.style.width = String(100) + '%';
  baseTong3Back.style.left = String(0);
  baseTong3Back.style.background = colorChip.gray0;
  baseTong.style.marginBottom = String(desktop ? middleTongPaddingBottom : 18) + ea;
  baseTong3.style.marginBottom = String(0) + ea;
  baseTong3Back.style.marginBottom = String(0) + ea;
  baseTong3.style.paddingBottom = String(middleTongPaddingBottom) + ea;


  whiteBlock3 = createNode({
    mother: baseTong3,
    style: {
      position: "relative",
      width: withOut(0 * 2, ea),
      paddingTop: String(middleTongPaddinngTop) + ea,
      paddingBottom: String(middleTitleMarginBottom) + ea,
    }
  });
  basicContentsMaker(whiteBlock3, "service", colorChip.gray0);
  instance.insertThreeBox(whiteBlock3);

  whiteInjection = createNode({
    mother: baseTong3,
    style: {
      display: "block",
      position: "relative",
      width: withOut(margin * 2, ea),
      paddingLeft: String(margin) + ea,
      paddingRight: String(margin) + ea,
      paddingTop: String(marginTop + whiteVisualPaddingTop) + ea,
      paddingBottom: String(marginTop) + ea,
      background: colorChip.white,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
      borderRadius: String(desktop ? 8 : 1) + ea,
      marginTop: String(whiteInjectionMarginTop) + ea,
    }
  })
  basicContentsMaker(whiteInjection, "role", colorChip.white, true);
  instance.insertRoleBox(whiteInjection);


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

  whiteBlock4 = createNode({
    mother: baseTong4,
    style: {
      position: "relative",
      width: withOut(0 * 2, ea),
      paddingTop: String(middleTongPaddinngTop) + ea,
      paddingBottom: String(middleTitleMarginBottom) + ea,
    }
  });
  basicContentsMaker(whiteBlock4, "etc", colorChip.white);

  whiteInjection2 = createNode({
    mother: baseTong4,
    style: {
      display: "block",
      position: "relative",
      width: withOut(margin * 2, ea),
      paddingLeft: String(margin) + ea,
      paddingRight: String(margin) + ea,
      paddingTop: String(marginTop + whiteVisualPaddingTop) + ea,
      paddingBottom: String(marginTop) + ea,
      background: colorChip.white,
      boxShadow: "0px 5px 21px -10px " + colorChip.gray5,
      borderRadius: String(desktop ? 8 : 1) + ea,
      marginTop: String(whiteInjectionMarginTop) + ea,
    }
  })
  basicContentsMaker(whiteInjection2, "curation", colorChip.white, true);

}

FirstResponseJs.prototype.insertThreeBox = function (middleTong) {
  const instance = this;
  const { ea, media, standardWidth, totalContents } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const { createNode, createNodes, colorChip, withOut, ajaxJson, isMac, isIphone, svgMaker, selfHref } = GeneralJs;
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
  threeBlockMarginTop = <%% 60, 60, 50, 40, 6 %%>;

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
        sub: "home-furnishing",
        description: [
          "인테리어 시공 없이 가구, 패브릭, 소품만",
          "집 무드를 변화시켜주는 스타일링",
        ],
        color: "#bfb8b0",
        background: FRONTHOST + "/middle/detail/review/f20.jpg",
        href: FRONTHOST + "/service.php?mode=furnishing",
      },
      {
        title: "홈스타일링",
        sub: "home-styling",
        description: [
          "집 컨디션에 맞는 범위의 시공을 진행",
          "컨셉에 맞게 변화시켜주는 스타일링",
        ],
        color: "#b1ae9d",
        background: FRONTHOST + "/middle/detail/review/s01.jpg",
        href: FRONTHOST + "/service.php?mode=styling",
      },
      {
        title: "토탈 스타일링",
        sub: "total-styling",
        description: [
          "원하는 스타일과 라이프 패턴에 맞게 기획",
          "전체적인 구조를 변경하는 스타일링",
        ],
        color: "#546d81",
        background: FRONTHOST + "/middle/detail/review/t11.jpg",
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

FirstResponseJs.prototype.insertRoleBox = function (whiteBlock) {
  const instance = this;
  const { ea, media } = this;
  const baseTong = this.baseTong;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1]);
  const small = !big;
  const { createNode, createNodes, colorChip, withOut, ajaxJson, isMac } = GeneralJs;
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

  blockMarginBottom = <%% 16, 16, 16, 16, 2 %%>;

  lastBlockMarginBottom = <%% 160, 160, 160, 80, 12 %%>;

  margin = <%% 52, 52, 44, 32, 6 %%>;

  titleFont = <%% 20, 18, 14, 13, 3.8 %%>;
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

  contents1TitleSize = <%% 17, 17, 14, 13, 3.4 %%>;
  contents1TitleWeight = <%% 700, 700, 800, 800, 800 %%>;
  contents1TitleBetween = <%% 16, 14, 10, 8, 2 %%>;
  contents1Between = <%% 45, 40, 30, 22, 9 %%>;

  contents1Columns = <%% 5, 5, 5, 5, 3 %%>;

  contents1UpBoxWidth = <%% 232, 197, 225, 185, 88 %%>;
  contents1UpBoxMargin = <%% 10, 8, 8, 7, 1 %%>;
  contents1UpBoxPaddingLeft = <%% 18, 16, 18, 12, 3.5 %%>;
  contents1UpBoxPaddingTop = <%% (isMac() ? 16 : 17), (isMac() ? 14 : 15), (isMac() ? 15 : 16), (isMac() ? 11 : 12), 3.5 %%>;

  contents1UpBoxCheckTop = <%% (isMac() ? 7 : 5), (isMac() ? 7 : 5), (isMac() ? 7 : 5), (isMac() ? 7 : 5), 15.5 %%>;
  contents1UpBoxCheckWidth = <%% 11, 11, 11, 10, 2.6 %%>;
  contents1UpBoxCheckMarginRight = <%% 6, 6, 6, 6, 6 %%>;

  contents1UpBoxTitleSize = <%% 15, 15, 15, 14, 3.2 %%>;
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

  contentsMotherBoxMarginTop = <%% 60, 60, 42, 40, 7 %%>;

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

  leftBox1 = createNode({
    mother: whiteBlock,
    style: {
      display: big ? "inline-block" : "none",
      position: "relative",
      width: big ? String(leftBoxWidth) + ea : String(100) + '%',
      height: big ? String(100) + '%' : "",
      verticalAlign: "top",
      marginTop: String(contentsMotherBoxMarginTop) + ea,
    }
  });

  createNode({
    mother: leftBox1,
    text: big ? "디자이너 역할과\n구체적 제공물" : (mobile ? "디자이너의 3가지 역할" : "디자이너 역할과 구체적 제공물"),
    style: {
      display: "inline-block",
      position: "relative",
      fontSize: String(titleFont) + ea,
      fontWeight: String(titleFontWeight),
      wordSpacing: String(wordSpacing) + "px",
      top: String(titleVisualTop) + ea,
      marginLeft: big ? String(titleLeft) + ea : "",
      marginBottom: big ? "" : String(titleMarginBottom) + ea,
      color: colorChip.black,
      width: big ? "" : String(100) + '%',
      textAlign: desktop ? "" : "center",
      lineHeight: String(lineHeight),
    }
  });

  rightBox1 = createNode({
    mother: whiteBlock,
    style: {
      display: big ? "inline-block" : "block",
      position: "relative",
      width: big ? withOut(leftBoxWidth, ea) : String(100) + '%',
      height: String(100) + '%',
      verticalAlign: "top",
      marginTop: String(contentsMotherBoxMarginTop - (desktop ? 1 : 0)) + ea,
      textAlign: desktop ? "" : "center",
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
      }
    });

    createNode({
      mother: contents1UpBox,
      mode: "svg",
      source: instance.mother.returnCheckIcon(colorChip.green),
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
        backgroundImage: "url('" + FirstResponseJs.binaryPath + "/" + contents1[1].children[i].image + "')",
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

FirstResponseJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    this.mother.setGeneralProperties(this);

    const { returnGet, ajaxJson, requestPromise, setDebounce, colorChip, homeliaisonAnalytics, dateToString } = GeneralJs;
    const getObj = returnGet();
    let cliid;
    let clients, client;

    if (getObj.cliid === undefined) {
      window.alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }

    clients = await ajaxJson({ whereQuery: { cliid: getObj.cliid } }, SECONDHOST + "/getClients", { equal: true });
    if (clients.length === 0) {
      window.alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }
    client = clients[0];
    this.client = client;

    await this.mother.ghostClientLaunching({
      mode: "ghost",
      name: "firstResponse",
      client: this.client,
      base: {
        instance: this,
        binaryPath: FirstResponseJs.binaryPath,
        subTitle: (this.client.name + " 고객님 서비스 설명"),
        secondBackground: false,
        backgroundType: 1,
        talk: {
          text: "기타 문의 사항은 홈리에종 채널에 주세요!",
          event: "channel",
        }
      },
      local: async () => {
        try {
          instance.insertInitBox();
          instance.insertDescriptionBox();
          instance.insertMainContentsBox();

          setInterval(() => {
            homeliaisonAnalytics({
              page: instance.pageName,
              standard: instance.firstPageViewTime,
              action: "readTimer",
              data: {
                cliid: instance.client.cliid,
                href: window.encodeURIComponent(window.location.href),
                date: dateToString(new Date(), true),
              },
            }).catch((err) => {
              console.log(err);
            });
          }, 20 * 1000);

        } catch (e) {
          console.log(e);
          await GeneralJs.ajaxJson({ message: "FirstResponseJs.launching.ghostClientLaunching : " + e.message }, "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

    this.totalContents.children[0].style.background = colorChip.gray1;
    this.totalContents.children[1].style.transition = "all 0s ease";
    this.totalContents.children[1].style.height = String(<&& 600 | 540 | 460 | 400 | 118 &&>) + this.ea;

  } catch (err) {
    console.log(err);
    await GeneralJs.ajaxJson({ message: "FirstResponseJs.launching 에러 일어남 => " + err.message }, "/errorLog");
  }
}
