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
  "name": "aboutService",
  "hangul": "서비스 소개",
  "route": [
    "aboutService"
  ]
} %/%/g

const AboutServiceJs = function () {
  this.mother = new GeneralJs();
}

AboutServiceJs.binaryPath = FRONTHOST + "/middle/curation";

AboutServiceJs.prototype.insertInitBox = function () {
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

AboutServiceJs.prototype.insertPeopleBox = function () {
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

  blockHeight = <%% 383, 316, 273, 226, 129.5 %%>;
  bottomMargin = <%% 16, 16, 16, 12, 5 %%>;
  margin = <%% 52, 52, 44, 32, 52 %%>;
  marginTop = <%% 52, 50, 40, 32, 52 %%>;
  leftRatio = <%% 0.32, 0.32, 0.32, 0.32, 0.32 %%>;

  titleFont = <%% 22, 22, 20, 17, 4.5 %%>;
  titleLeft = <%% 6, 6, 6, 6, 0 %%>;
  titleFontWeight = <%% 800, 800, 800, 800, 800 %%>;
  wordSpacing = <%% -3, -3, -3, -3, -2 %%>;

  titleTop = <%% 108, 54, 40, 30, 8.5 %%>;
  descriptionSize = <%% 15, 14, 13, 12, 3 %%>;
  descriptionBottom = <%% 0, -8, -7, -2, 0 %%>;

  barWidth = <%% 70, 80, 80, 80, 80 %%>;
  barLeft = <%% 240, titleLeft + 234, titleLeft + 234, titleLeft + 234, titleLeft + 234 %%>;

  indexFont = <%% 19, 19, 19, 19, 19 %%>;
  indexFontWeight = <%% 200, 200, 200, 200, 200 %%>;

  leftWidth = <%% 340, 260, 250, 210, 300 %%>;

  initWordingHeight = <%% 20, 20, 20, 20, 9 %%>;
  initWordingSize = <%% 15.5, 15, 14.5, 13.5, 3.5 %%>;
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
  mobileLeftBoxHeight = 37.5;

  grayBoxImageVisualWidth = <%% 16, 4, 0, 0, 19 %%>;

  grayUpWordings = [ "프로세스", "후 시공 / 구매", "선 디자인 / 기획", "디자이너 선택" ];
  grayDownWordings = [ "비용 구성", "시공 비용", "구매 비용", "디자인비" ];

  whiteBlock = createNode({
    mother: this.baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      height: String(blockHeight) + ea,
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
      width: desktop ? String(leftWidth) + ea : String(100) + '%',
      lineHeight: String(1.42),
      height: desktop ? "calc(100% - " + String(margin * 2) + ea + ")" : String(mobileLeftBoxHeight) + ea,
      marginTop: desktop ? String(marginTop) + ea : "",
      marginBottom: desktop ? String(margin) + ea : "",
      marginLeft: desktop ? String(margin) + ea : "",
    },
    children: [
      {
        text: "인테리어, 막상 하려니\n막막하지 않으세요?",
        style: {
          position: "absolute",
          fontSize: String(titleFont) + ea,
          fontWeight: String(titleFontWeight),
          top: String(titleTop) + ea,
          left: String(titleLeft) + ea,
          color: colorChip.black,
          width: desktop ? "" : String(100) + '%',
          textAlign: desktop ? "" : "center",
        }
      },
      {
        text: [
          desktop ? "알아보면 알아볼수록 해야 할 것이" : "알아볼수록 해야할 것이 너무 많은 인테리어,",
          desktop ? "너무나도 많은 인테리어, 준비하다 보면" : "막히는 부분도 많고 실패도 많이 하기 마련입니다.",
          desktop ? "막히는 부분도 많고, 구입하다 보면" : "",
          desktop ? "실패도 많이 하기 마련입니다." : "",
        ].join("\n"),
        style: {
          position: "absolute",
          bottom: String(descriptionBottom) + ea,
          left: String(titleLeft) + ea,
          color: colorChip.black,
          textAlign: desktop ? "" : "center",
          width: desktop ? "" : withOut(0),
          fontSize: String(descriptionSize) + ea,
          fontWeight: String(400),
          lineHeight: String(1.6),
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
      width: desktop ? withOut(leftWidth + margin, ea) : String(100) + '%',
      height: desktop ? String(100) + '%' : withOut(mobileLeftBoxHeight, ea),
      borderRadius: String(5) + "px",
      overflow: "hidden",
    },
    children: [
      {
        mode: "img",
        attribute: {
          src: AboutServiceJs.binaryPath + "/contents5" + String(media.findIndex(boo => boo)) + ".png",
        },
        style: {
          display: "block",
          position: "absolute",
          width: String(100) + '%',
          bottom: String(0),
          right: String(0),
        }
      }
    ]
  });

}

AboutServiceJs.prototype.insertServiceBox = function () {
  const instance = this;
  const { ea, media } = this;
  const baseTong = this.baseTong;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1]);
  const small = !big;
  const { createNode, createNodes, colorChip, withOut, ajaxJson, isMac, isIphone, svgMaker } = GeneralJs;
  let blockMarginBottom;
  let top;
  let bottom;
  let whiteBlock0, whiteBlock1, whiteBlock2, whiteBlock3, whiteBlock4;
  let leftBox0, leftBox1, leftBox2, leftBox3, leftBox4;
  let rightBox0, rightBox1, rightBox2, rightBox3, rightBox4;
  let contents0, contents1, contents2, contents3, contents4;
  let height0, height1, height2, height3, height4;
  let lastBlockMarginBottom;
  let margin;
  let titleFont;
  let titleLeft;
  let titleFontWeight;
  let wordSpacing;
  let lineHeight;
  let leftBoxWidth;
  let title;
  let description;
  let image;
  let boxMargin;
  let boxTong;
  let rightBoxPaddingTop;
  let titleVisualTop;
  let boxTongPaddingBottom;
  let contents0PhotoHeight;
  let contents0PaddingLeft, contents0PaddingTop, contents0PaddingBottom;
  let contents0TitleSize, contents0TitleWeight;
  let contents0TitleWhiteBoxMargin;
  let contents0DescriptionSize, contents0DescriptionWeight;
  let contents0DescriptionMarginTop;
  let contents0DescriptionWeightBold;
  let contents0DescriptionLineHeight;
  let contents0DescriptionLeft;
  let contents0DescriptionBottom;
  let contents0Columns;
  let contents0Box;
  let contents0ArrowWidth, contents0ArrowHeight;
  let contents0ArrowTop;
  let contents0WhitePaddingTop, contents0WhitePaddingBottom, contents0WhitePaddingLeft;
  let contents0IconWidth, contents0IconMarginRight, contents0IconTop;
  let contents0FactorMarginBottom;
  let contents0LineTop;
  let contents0TitlePaddingTop;
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
  let contents2Box;
  let contents2LineBoxHeight;
  let contents2LineTop;
  let contents2LineRadius;
  let contents2LineTitlePaddingTop;
  let contents2LineTitlePaddingBottom;
  let contents2LineTitlePaddingLeft;
  let contents2LineTitleSize;
  let contents2LineTitleWeight;
  let contents2ImageTop;
  let contents2BoxMarginTop;
  let contents2BoxFactorWidth;
  let contents2BoxFactorHeight;
  let contents2BoxFactorMarginLeftArr;
  let contents2TitleSize;
  let contents2TitleWeight;
  let contents2DescriptionSize;
  let contents2DescriptionWeight;
  let contents2DescriptionMarginTop;
  let contents2DescriptionLineHeight;
  let contents3Box, contents3BoxFactor;
  let contents3BoxGray;
  let contents3BoxMarginTop;
  let contents3BoxBetween;
  let contents3GreenHeight;
  let contents3GreenTextTop;
  let contents3GreenSize;
  let contents3GreenWeight;
  let contents3GrayHeight;
  let contents3GrayInnerPadding;
  let contents3GrayWhiteSize;
  let contents3GrayWhiteWeight;
  let contents3GrayWhiteLineHeight;
  let contents3GrayWhitePaddingTop;
  let contents3GrayWhitePaddingBottom;
  let contents3GrayWhiteWeightBold;
  let contents3GrayChildrenMarginTop;
  let contents3GrayChildrenWeight;
  let contents3GrayChildrenPaddingTop;
  let contents3PictureHeight;
  let num;
  let titleMarginBottom;
  let contents0Tong;
  let baseTongBack2, baseTongBack3;
  let baseTong2, baseTong3;
  let middleTitleSize, middleTitleWeight;
  let middleTitlePadding;
  let middleTitleLineTop;
  let middleTongPaddinngTop;
  let middleTitleMarginBottom;
  let contents0TongBoxHeight;
  let contents0TongPhotoWidth;
  let contents0TitleLineHeight;
  let middleTongPaddingBottom;
  let middleAreaPaddingTop;
  let contents2ImageBottom;
  let contents4Tong;
  let baseTong4, baseTong4Back;
  let whiteBlock5;
  let contents5Tong;
  let photoMargin;
  let middleTitleTextTop;
  let bottomMargin;
  let contents0InfoSize;

  bottomMargin = <%% 16, 16, 16, 12, 5 %%>;
  blockMarginBottom = <%% 16, 16, 16, 16, 2 %%>;

  lastBlockMarginBottom = <%% 160, 160, 160, 80, 12 %%>;

  margin = <%% 52, 52, 44, 32, 6 %%>;

  titleFont = <%% 22, 22, 18, 16, 4.2 %%>;
  titleLeft = <%% 6, 6, 6, 6, 0 %%>;
  titleFontWeight = <%% 700, 700, 700, 700, 700 %%>;
  wordSpacing = <%% -3, -3, -3, -3, -2 %%>;
  titleMarginBottom = <%% 0, 0, 18, 12, 0.5 %%>;

  lineHeight = <%% 1.42, 1.42, 1.42, 1.42, 1.42 %%>;

  leftBoxWidth = <%% 300, 230, 300, 300, 300 %%>;

  boxMargin = <%% 36, 25, 24, 14, 2 %%>;

  rightBoxPaddingTop = <%% 7, 5, 7, 7, 6.5 %%>;
  rightBoxPaddingTopFontVersion = <%% 2, 2, 2, 2, 7 %%>;

  middleTitleSize = <%% 23, 23, 21, 18, 4.2 %%>;
  middleTitleWeight = <%% 800, 800, 800, 800, 800 %%>;
  middleTitlePadding = <%% 16, 16, 12, 10, 2 %%>;
  middleTitleLineTop = <%% 14, 14, 13, 11, (isIphone() ? 2.9 : 2.6) %%>;
  middleTitleTextTop = <%% (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), 0 %%>;

  middleTongPaddinngTop = <%% 108, 84, 72, 52, 10 %%>;
  middleTongPaddingBottom = <%% 150, 130, 100, 70, 17 %%>;
  middleTitleMarginBottom = <%% 50, 42, 40, 34, 7.5 %%>;
  middleAreaPaddingTop = <%% 40, 40, 30, 20, 5 %%>;

  height0 = <%% 545, 415, 506, 389, 141 %%>;
  height1 = <%% 570, 480, 550, 447, 215 %%>;
  height2 = <%% 450, 345, 442, 358, 120 %%>;
  height3 = <%% 430, 360, 438, 370, 163 %%>;
  height4 = <%% 310, 270, 310, 276, 109 %%>;

  titleVisualTop = <%% (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), 2 %%>;

  boxTongPaddingBottom = <%% 10, 10, 6, 10, 3.8 %%>;
  contents0PhotoHeight = <%% 180, 130, 150, 114, 22 %%>;

  contents0PaddingLeft = <%% 30, 30, 30, 25, 4.8 %%>;
  contents0PaddingTop = <%% (isMac() ? 24 : 25), (isMac() ? 24 : 25), (isMac() ? 24 : 25), (isMac() ? 20 : 21), 3.5 %%>;
  contents0PaddingBottom = <%% (isMac() ? 9 : 7), (isMac() ? 9 : 7), (isMac() ? 9 : 7), (isMac() ? 9 : 7), 2 %%>;

  contents0InfoSize = <%% 14, 14, 14, 13, 3 %%>;

  contents0TitleSize = <%% 15, 15, 14, 13, 3.1 %%>;
  contents0TitleWeight = <%% 600, 600, 600, 600, 600 %%>;
  contents0TitleWhiteBoxMargin = <%% 10, 10, 10, 10, 2 %%>;
  contents0TitleLineHeight = <%% 1.45, 1.45, 1.45, 1.45, 1.45 %%>;

  contents0DescriptionSize = <%% 13, 13, 13, 12, 2.6 %%>;
  contents0DescriptionWeight = <%% 300, 300, 300, 300, 300 %%>;
  contents0DescriptionLineHeight = <%% 1.45, 1.45, 1.45, 1.45, 1.45 %%>;
  contents0DescriptionWeightBold = <%% 700, 700, 700, 700, 700 %%>;
  contents0DescriptionMarginTop = <%% 20, 15, 15, 9, (isIphone() ? 7.5 : 7.8) %%>;
  contents0DescriptionLeft = <%% 72, 72, 62, 25, 11 %%>;
  contents0DescriptionBottom = <%% (isMac() ? 26 : 24), (isMac() ? 26 : 24), (isMac() ? 26 : 24), (isMac() ? 22 : 20), 3.7 %%>;

  contents0Columns = <%% 2, 2, 2, 2, 1 %%>;

  contents0TongBoxHeight = <%% 145, 145, 138, 126, 26 %%>;
  contents0TongPhotoWidth = <%% 425, 250, 190, 150, 39 %%>;

  contents0ArrowWidth = <%% 34, 34, 24, 0, 4.8 %%>;
  contents0ArrowHeight = <%% 8, 8, 8, 8, 1.8 %%>;
  contents0ArrowTop = <%% 86, 86, 79, 80, 15.6 %%>;

  contents1TitleSize = <%% 17, 17, 16, 15, 4.2 %%>;
  contents1TitleWeight = <%% 700, 700, 700, 700, 700 %%>;
  contents1TitleBetween = <%% 16, 14, 14, 12, 6 %%>;
  contents1Between = <%% 45, 40, 30, 22, 8 %%>;

  contents1Columns = <%% 5, 5, 5, 5, 2 %%>;

  contents1UpBoxWidth = <%% 232, 197, 225, 185, 88 %%>;
  contents1UpBoxMargin = <%% 10, 8, 8, 8, 1 %%>;
  contents1UpBoxPaddingLeft = <%% 22, 18, 20, 14, 3.5 %%>;
  contents1UpBoxPaddingTop = <%% (isMac() ? 16 : 17), (isMac() ? 14 : 15), (isMac() ? 15 : 16), (isMac() ? 11 : 12), 3.5 %%>;

  contents1UpBoxCheckTop = <%% (isMac() ? 7 : 5), (isMac() ? 7 : 5), (isMac() ? 7 : 5), (isMac() ? 7 : 5), 15.5 %%>;
  contents1UpBoxCheckWidth = <%% 11, 11, 11, 10, 2.6 %%>;
  contents1UpBoxCheckMarginRight = <%% 6, 6, 6, 6, 6 %%>;

  contents1UpBoxTitleSize = <%% 15, 15, 15, 14, 3.5 %%>;
  contents1UpBoxTitleWeight = <%% 600, 600, 600, 600, 600 %%>;

  contents1UpBoxWhiteMarginTop = <%% (isMac() ? 10 : 8), (isMac() ? 10 : 8), (isMac() ? 10 : 8), (isMac() ? 8 : 6), 3 %%>;
  contents1UpBoxWhitePaddingTop = <%% (isMac() ? 16 : 17), (isMac() ? 16 : 17), (isMac() ? 16 : 17), (isMac() ? 13 : 14), 3 %%>;
  contents1UpBoxWhitePaddingBottom = <%% (isMac() ? 21 : 19), (isMac() ? 21 : 19), (isMac() ? 21 : 19), (isMac() ? 18 : 16), 3.5 %%>;

  contents1UpBoxWhiteSize = <%% 14, 13, 13, 11, 2.8 %%>;
  contents1UpBoxWhiteWeight = <%% 400, 400, 400, 400, 400 %%>;
  contents1UpBoxWhiteWeightBold = <%% 700, 700, 700, 700, 700 %%>;
  contents1UpBoxWhiteLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;

  contents1DownBoxPaddingTop = <%% 30, 22, 24, 18, 5.5 %%>;
  contents1DownBoxPaddingBottom = <%% (isMac() ? 36 : 34), (isMac() ? 24 : 22), (isMac() ? 26 : 24), (isMac() ? 21 : 19), 6 %%>;
  contents1DownBoxPaddingMargin = <%% 10, 8, 10, 8, 2 %%>;
  contents1DownBoxPaddingLeft = <%% 36, 22, 24, 18, 6 %%>;
  contents1DownBoxCircleHeight = <%% 119, 92, 106, 87, 25 %%>;

  contents1DownBoxTitleMarginTop = <%% (isMac() ? 17 : 18), (isMac() ? 12 : 13), (isMac() ? 14 : 15), (isMac() ? 12 : 13), 2.5 %%>;
  contents1DownBoxDescriptionMarginTop = <%% (isMac() ? 5 : 4), (isMac() ? 5 : 4), (isMac() ? 5 : 4), (isMac() ? 4 : 3), 1 %%>;
  contents1DownBoxDescriptionSize = <%% 13, 12, 13, 11, 2.8 %%>;

  contents2LineBoxHeight = <%% 45, 45, 45, 45, 45 %%>;
  contents2LineTop = <%% 17, 16, 17, 17, 17 %%>;
  contents2LineRadius = <%% 12, 12, 12, 12, 12 %%>;
  contents2LineTitlePaddingTop = <%% 7, 7, 7, 7, 7 %%>;
  contents2LineTitlePaddingBottom = <%% 9, 9, 9, 9, 9 %%>;
  contents2LineTitlePaddingLeft = <%% 16, 16, 16, 16, 16 %%>;
  contents2LineTitleSize = <%% 14, 13, 14, 14, 14 %%>;
  contents2LineTitleWeight = <%% 600, 600, 600, 600, 600 %%>;

  contents2ImageTop = <%% 80, 80, 54, 40, 6 %%>;
  contents2ImageBottom = <%% 30, 30, 30, 24, 11 %%>;

  contents2BoxMarginTop = <%% 25, 18, 20, 25, 25 %%>;
  contents2BoxFactorWidth = <%% 172, 144, 166, 172, 172 %%>;
  contents2BoxFactorHeight = <%% 100, 100, 100, 100, 100 %%>;
  contents2BoxFactorMarginLeftArr = <&& [ 0, 106, 106, 91 ] | [ 0, 48, 48, 41 ] | [ 0, 49, 52, 42 ] | [ 0, 106, 106, 91 ] | [ 0, 106, 106, 91 ] &&>;

  contents2TitleSize = <%% 18, 17, 17, 18, 3.5 %%>;
  contents2TitleWeight = <%% 600, 600, 600, 600, 600 %%>;
  contents2DescriptionSize = <%% 13, 13, 13, 13, 13 %%>;
  contents2DescriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
  contents2DescriptionMarginTop = <%% 10, 6, 6, 6, 10 %%>;
  contents2DescriptionLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;

  contents3BoxMarginTop = <%% 40, 20, 20, 40, 4 %%>;
  contents3BoxBetween = <%% 12, 8, 8, 8, 2 %%>;
  contents3GreenHeight = <%% 48, 48, 48, 40, 9 %%>;
  contents3GreenTextTop = <%% (isMac() ? -2 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), -0.2 %%>;
  contents3GreenSize = <%% 15, 14, 14, 13, 3 %%>;
  contents3GreenWeight = <%% 600, 600, 600, 600, 600 %%>;

  contents3GrayHeight = <%% 640, 584, 625, 640, 640 %%>;
  contents3GrayInnerPadding = <%% 12, 10, 12, 10, 2 %%>;
  contents3GrayWhiteSize = <%% 13, 12, 13, 11, 2.7 %%>;
  contents3GrayWhiteWeight = <%% 400, 400, 400, 400, 400 %%>;
  contents3GrayWhiteWeightBold = <%% 700, 700, 700, 700, 700 %%>;
  contents3GrayWhiteLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;

  contents3GrayWhitePaddingTop = <%% (isMac() ? 17 : 18), (isMac() ? 13 : 14), (isMac() ? 13 : 14), (isMac() ? 12 : 13), 3 %%>;
  contents3GrayWhitePaddingBottom = <%% (isMac() ? 20 : 18), (isMac() ? 17 : 15), (isMac() ? 17 : 15), (isMac() ? 16 : 14), 3.8 %%>;

  contents3GrayChildrenMarginTop = <%% 20, 15, 20, 20, 20 %%>;
  contents3GrayChildrenWeight = <%% 600, 600, 600, 600, 600 %%>;
  contents3GrayChildrenPaddingTop = <%% 3, 3, 3, 3, 3 %%>;
  contents3GrayTongMarginBottom = <%% 170, 150, 110, 80, 17 %%>;

  contents3PictureHeight = <%% 160, 120, 138, 110, 26 %%>;

  photoMargin = <%% 20, 18, 18, 16, 3 %%>;

  contents0 = [
    {
      title: "전문 지식이 없어\n난감하다면?",
      description: "시공 전 발생할 수 있는 <b%리스크를%b>\n<b%미리 체크하고 보완%b>해 드려요.",
      image: "contents00.jpg",
    },
    {
      title: "취향이 명확하지\n않다면?",
      description: "상담을 통해 <b%니즈와 취향을 파악%b>해\n컨셉의 방향성을 잡아드려요.",
      image: "contents01.jpg",
    },
    {
      title: "결정이 어려운\n성향이라면?",
      description: "선택의 폭을 좁혀드리고\n<b%결정의 순간 명확한 조언%b>을 드려요.",
      image: "contents02.jpg",
    },
    {
      title: "부족한\n감각은?",
      description: "<b%전문가의 아이디어와 감각%b>으로\n특색 있는 집을 완성합니다.",
      image: "contents03.jpg",
    },
    {
      title: "예산을 잘 쓰고\n싶다면?",
      description: "전체 <b%예산을 우선순위에 따라 분배%b>\n해 합리적으로 운영해드려요.",
      image: "contents04.jpg",
    },
    {
      title: "시간과 에너지가\n부족할 땐?",
      description: "일상 생활에 집중하실 수 있도록\n<b%전문가가 대신 고민%b>합니다.",
      image: "contents05.jpg",
    },
  ];

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
    contents1[1].children.pop();
  }

  contents2 = {
    image: "contents2" + String(media.findIndex(boo => boo)) + ".png"
  };

  contents3 = {
    title: "디자인 서비스 종류",
    children: [
      {
        title: "홈퍼니싱",
        description: [
          (<&& "시공 없이 가구와 소품 등으로\n진행하는 <b%효율적 인테리어%b>" | "시공 없이 가구, 소품으로\n진행하는 <b%효율적 인테리어%b>" | "시공 없이 가구, 소품으로\n진행하는 <b%효율적 인테리어%b>" | "시공 없이 가구, 소품으로\n진행하는 <b%효율적 인테리어%b>" | "시공 없이 가구, 소품으로\n진행하는 <b%효율적 인테리어%b>" &&>),
          "시공 없음\n약 30일 소요"
        ],
        image: "s0.jpg",
      },
      {
        title: "홈스타일링",
        description: [
          (<&& "부분 시공과 홈퍼니싱으로 필요\n부분만 진행하는 <b%스마트 인테리어%b>" | "부분 시공과 홈퍼니싱으로\n진행하는 <b%스마트 인테리어%b>" | "부분 시공과 홈퍼니싱으로\n진행하는 <b%스마트 인테리어%b>" | "부분 시공과 홈퍼니싱으로\n진행하는 <b%스마트 인테리어%b>" | "부분 시공과 홈퍼니싱으로\n진행하는 <b%스마트 인테리어%b>" &&>),
          "5개 공정 이하의 시공\n약 45일 소요"
        ],
        image: "s1.jpg",
      },
      {
        title: "토탈 스타일링",
        description: [
          (<&& "시공부터 스타일링까지 완벽하게\n진행하는 <b%원스탑 인테리어%b>" | "시공부터 스타일링까지\n진행하는 <b%원스탑 인테리어%b>" | "시공부터 스타일링까지\n진행하는 <b%원스탑 인테리어%b>" | "시공부터 스타일링까지\n진행하는 <b%원스탑 인테리어%b>" | "시공부터 스타일링까지\n진행하는 <b%원스탑 인테리어%b>" &&>),
          "5개 초과 공정 전체 시공\n약 60일 소요"
        ],
        image: "s2.jpg",
      },
      {
        title: "엑스트라 스타일링",
        description: [
          (<&& "디자인 토탈 시공과 <b%프리미엄%b>\n<b%스타일링으로 진행%b>하는 인테리어" | "토탈 시공과 <b%프리미엄 스타%b>\n<b%일링으로 진행%b>하는 인테리어" | "토탈 시공과 <b%프리미엄 스타%b>\n<b%일링으로 진행%b>하는 인테리어" | "토탈 시공과 <b%프리미엄 스타%b>\n<b%일링으로 진행%b>하는 인테리어" | "토탈 시공과 <b%프리미엄 스타%b>\n<b%일링으로 진행%b>하는 인테리어" &&>),
          "5개 초과 공정 전체 시공\n약 75일 소요"
        ],
        image: "s3.jpg",
      },
    ],
  };

  contents4 = {
    image: "contents4" + String(media.findIndex(boo => boo)) + ".png"
  };

  // box 0 ---------------------------------------------------------------------------------------------------

  whiteBlock0 = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 3) + "px",
      width: withOut(0 * 2, ea),
      paddingTop: String(middleTongPaddinngTop) + ea,
      paddingBottom: String(middleTitleMarginBottom) + ea,
    }
  });

  createNode({
    mother: whiteBlock0,
    style: {
      display: "block",
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
        text: "이젠, 디자이너와 함께 진행하세요!",
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
        text: [
          desktop ? "막힘도 실패도 많은 인테리어, 혼자 하려 하지 말고 전문가의 도움을 받아보세요!" : "막힘이 많은 인테리어, 혼자 하지 말고 전문가의 도움을 받아보세요!",
          desktop ? "인테리어 전 과정 속에서 도움을 받으며 수월하고 확실하게 결과를 보실 수 있답니다." : "인테리어 전 과정에서 도움을 받으며 수월하게 결과를 보실 수 있답니다.",
        ].join("\n"),
        style: {
          display: "block",
          position: "relative",
          fontSize: String(contents0InfoSize) + ea,
          fontWeight: String(400),
          lineHeight: String(1.6),
          color: colorChip.black,
          textAlign: "center",
          paddingTop: String(middleTitlePadding) + ea,
          top: String(0) + ea,
        }
      }
    ]
  });

  contents0Tong = createNode({
    mother: whiteBlock0,
    style: {
      display: "block",
      position: "relative",
      paddingTop: String(middleTitleMarginBottom) + ea,
    }
  })

  for (let i = 0; i < contents0.length; i++) {
    createNode({
      mother: contents0Tong,
      style: {
        display: "inline-block",
        width: "calc(calc(100% - " + String(contents0TitleWhiteBoxMargin * (contents0Columns - 1)) + ea + ") / " + String(contents0Columns) + ")",
        height: String(contents0TongBoxHeight) + ea,
        marginRight: (i % 2 !== 0 ? "" : String(contents0TitleWhiteBoxMargin) + ea),
        marginBottom: String(contents0TitleWhiteBoxMargin) + ea,
        background: colorChip.white,
        borderRadius: String(5) + "px",
        boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
        overflow: "hidden",
      },
      children: [
        {
          style: {
            display: "inline-block",
            height: String(100) + '%',
            width: String(contents0TongPhotoWidth) + ea,
            backgroundImage: "url('" + AboutServiceJs.binaryPath + "/" + contents0[i].image + "')",
            backgroundPosition: "50% 50%",
            backgroundSize: !(media[2] || media[3] || media[4]) ? "100% auto" : "auto 100%",
          }
        },
        {
          style: {
            display: "inline-block",
            width: withOut(contents0TongPhotoWidth, ea),
            position: "relative",
            height: String(100) + '%',
          },
          children: [
            {
              text: contents0[i].title,
              style: {
                position: "absolute",
                left: String(contents0PaddingLeft) + ea,
                top: String(contents0PaddingTop) + ea,
                fontSize: String(contents0TitleSize) + ea,
                fontWeight: String(contents0TitleWeight),
                color: colorChip.green,
                lineHeight: String(contents0TitleLineHeight),
              }
            },
            {
              mode: "svg",
              source: svgMaker.horizontalArrow(contents0ArrowWidth, contents0ArrowHeight, colorChip.gray4),
              style: {
                position: "absolute",
                left: String(contents0PaddingLeft) + ea,
                width: String(contents0ArrowWidth) + ea,
                height: String(contents0ArrowHeight) + ea,
                top: String(contents0ArrowTop) + ea,
               }
            },
            {
              text: contents0[i].description,
              style: {
                position: "absolute",
                left: String(contents0DescriptionLeft) + ea,
                bottom: String(contents0DescriptionBottom) + ea,
                fontSize: String(contents0DescriptionSize) + ea,
                fontWeight: String(contents0DescriptionWeight),
                color: colorChip.black,
                lineHeight: String(contents0DescriptionLineHeight),
              },
              bold: {
                fontSize: String(contents0DescriptionSize) + ea,
                fontWeight: String(contents0DescriptionWeightBold),
                color: colorChip.black,
              }
            },
          ]
        }
      ]
    });
  }

  // box 1 ---------------------------------------------------------------------------------------------------

  createNode({
    mother: whiteBlock0,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
      textAlign: "center",
      marginTop: String(middleTongPaddinngTop + bottomMargin) + ea,
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
        text: "디자이너와 함께 하면, 제공받는 것들",
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
        text: [
          desktop ? "디자이너는 단순히 디자인만 하는 것이 아니라, 예산에 맞춰 공간 계획을 세우고" : "디자이너는 디자인 뿐만 아니라, 예산에 맞춰 공간 계획을 세우고",
          desktop ? "전체적인 일정을 조율하며 인테리어가 잘 완성되도록 운영합니다. 구체적인 제공물은 아래와 같습니다." : "일정을 조율하며 운영합니다. 구체적인 제공물은 아래와 같습니다.",
        ].join("\n"),
        style: {
          display: "block",
          position: "relative",
          fontSize: String(contents0InfoSize) + ea,
          fontWeight: String(400),
          lineHeight: String(1.6),
          color: colorChip.black,
          textAlign: "center",
          paddingTop: String(middleTitlePadding) + ea,
          top: String(0) + ea,
        }
      }
    ]
  });

  whiteBlock1 = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 3) + "px",
      width: withOut(margin * 2, ea),
      background: colorChip.white,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
      marginBottom: String(blockMarginBottom) + ea,
      height: String(height1) + ea,
      paddingTop: String(margin) + ea,
      paddingBottom: String(margin) + ea,
      paddingLeft: String(margin) + ea,
      paddingRight: String(margin) + ea,
    }
  });

  leftBox1 = createNode({
    mother: whiteBlock1,
    style: {
      display: big ? "inline-block" : "block",
      position: "relative",
      width: big ? String(leftBoxWidth) + ea : String(100) + '%',
      height: big ? String(100) + '%' : "",
      verticalAlign: "top",
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
    mother: whiteBlock1,
    style: {
      display: big ? "inline-block" : "block",
      position: "relative",
      width: big ? withOut(leftBoxWidth, ea) : String(100) + '%',
      height: String(100) + '%',
      verticalAlign: "top",
      paddingTop: String(rightBoxPaddingTopFontVersion) + ea,
    }
  });

  createNode({
    mother: rightBox1,
    text: contents1[0].title,
    style: {
      display: desktop ? "block" : "none",
      fontSize: String(contents1TitleSize) + ea,
      fontWeight: String(contents1TitleWeight),
      color: colorChip.black,
      marginBottom: String(contents1TitleBetween) + ea,
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
        marginBottom: desktop ? "" : String(2) + ea,
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
        width: desktop ? "" : String(26) + '%',
        fontSize: String(contents1UpBoxTitleSize) + ea,
        fontWeight: String(contents1UpBoxTitleWeight),
        verticalAlign: "top",
      }
    });

    createNode({
      mother: contents1UpBox,
      style: {
        display: desktop ? "block" : "inline-block",
        width: desktop ? String(contents1UpBoxWidth) + ea : String(74) + '%',
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
      display: "block",
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
        marginRight: desktop ? String(i === contents1Columns - 1 ? 0 : contents1DownBoxPaddingMargin) + ea : String(i % 2 === 1 ? 0 : contents1DownBoxPaddingMargin) + ea,
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
        backgroundImage: "url('" + AboutServiceJs.binaryPath + "/" + contents1[1].children[i].image + "')",
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
  baseTong.style.marginBottom = String(middleTongPaddingBottom) + ea;

  // box 2 ---------------------------------------------------------------------------------------------------

  whiteBlock2 = createNode({
    mother: baseTong2,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 3) + "px",
      width: withOut(0 * 2, ea),
      background: "transparent",
      paddingTop: String(middleTongPaddinngTop) + ea,
    }
  });

  createNode({
    mother: whiteBlock2,
    style: {
      display: "block",
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
        text: "인테리어 비용, 어떻게 구성되나요?",
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(middleTitleSize) + ea,
          fontWeight: String(middleTitleWeight),
          color: colorChip.black,
          textAlign: "center",
          paddingLeft: String(middleTitlePadding) + ea,
          paddingRight: String(middleTitlePadding) + ea,
          background: colorChip.white,
          top: String(middleTitleTextTop) + ea,
        }
      },
      {
        text: [
          desktop ? "인테리어 비용은 크게 시공 비용, 제품 구매 비용, 디자인 비용으로 나뉩니다." : "인테리어 비용은 크게 시공, 제품 구매, 디자인 비용으로 나뉩니다.",
          desktop ? "디자이너는 예산에 따라 시공 비용과 제품 구매 비용의 한계를 정하고 그에 맞춰 구체적인 계획을 세웁니다." : "디자이너는 시공, 구매 비용의 한계를 정하고 그에 맞춰 계획을 세웁니다.",
        ].join("\n"),
        style: {
          display: "block",
          position: "relative",
          fontSize: String(contents0InfoSize) + ea,
          fontWeight: String(400),
          lineHeight: String(1.6),
          color: colorChip.black,
          textAlign: "center",
          paddingTop: String(middleTitlePadding) + ea,
          top: String(0) + ea,
        }
      }
    ]
  });

  createNode({
    mother: whiteBlock2,
    mode: "img",
    attribute: { src: AboutServiceJs.binaryPath + "/" + contents2.image },
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
      marginTop: String(contents2ImageTop) + ea,
      marginBottom: String(contents2ImageBottom) + ea,
    }
  });


  // white area ---------------------------------------------------------------------------------------------------

  baseTong3 = baseTong.cloneNode(false);
  baseTong3Back = baseTong.cloneNode(false);
  baseTong.parentNode.appendChild(baseTong3Back);
  baseTong3Back.appendChild(baseTong3);
  baseTong3Back.style.background = colorChip.white;
  baseTong3Back.style.marginBottom = "";
  baseTong3Back.style.paddingBottom = String(contents3GrayTongMarginBottom) + ea;
  baseTong3.style.marginBottom = "";
  baseTong3.style.paddingTop = String(0) + ea;
  baseTong3Back.style.paddingTop = String(0) + ea;
  baseTong3Back.style.width = String(100) + '%';
  baseTong3Back.style.left = String(0);
  baseTong2Back.style.paddingBottom = String(middleTongPaddingBottom) + ea;

  // box 3 - (new) homeliaison appeal ---------------------------------------------------------------------------------------------------

  whiteBlock4 = createNode({
    mother: baseTong3,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 3) + "px",
      width: withOut(0 * 2, ea),
      background: "transparent",
      marginBottom: String(middleTitleMarginBottom) + ea,
    }
  });

  createNode({
    mother: whiteBlock4,
    style: {
      display: "block",
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
        text: "서비스 기간은 어떻게 되나요?",
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(middleTitleSize) + ea,
          fontWeight: String(middleTitleWeight),
          color: colorChip.black,
          textAlign: "center",
          paddingLeft: String(middleTitlePadding) + ea,
          paddingRight: String(middleTitlePadding) + ea,
          background: colorChip.white,
          top: String(middleTitleTextTop) + ea,
        }
      },
      {
        text: [
          "인테리어에 드는 기간은 시공 정도에 따라 다르게 설정됩니다.",
          "각각의 경우에 따라 필요한 소요 시간은 아래 표와 같습니다."
        ],
        style: {
          display: "block",
          position: "relative",
          fontSize: String(contents0InfoSize) + ea,
          fontWeight: String(400),
          lineHeight: String(1.6),
          color: colorChip.black,
          textAlign: "center",
          paddingTop: String(middleTitlePadding) + ea,
          top: String(0) + ea,
        }
      }
    ]
  });

  whiteBlock3 = createNode({
    mother: baseTong3,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 3) + "px",
      width: withOut(margin * 2, ea),
      background: colorChip.gray1,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
      height: String(height3) + ea,
      paddingTop: String(margin) + ea,
      paddingBottom: String(margin) + ea,
      paddingLeft: String(margin) + ea,
      paddingRight: String(margin) + ea,
    }
  });

  leftBox3 = createNode({
    mother: whiteBlock3,
    style: {
      display: big ? "inline-block" : "block",
      position: "relative",
      width: big ? String(leftBoxWidth) + ea : String(100) + '%',
      height: big ? String(100) + '%' : "",
      verticalAlign: "top",
    }
  });

  createNode({
    mother: leftBox3,
    text: big ? "디자인 서비스의\n4가지 분류" : "디자인 서비스의 4가지 분류",
    style: {
      display: "inline-block",
      position: "relative",
      fontSize: String(titleFont) + ea,
      fontWeight: String(titleFontWeight),
      wordSpacing: String(wordSpacing) + "px",
      top: String(0) + ea,
      marginLeft: big ? String(titleLeft) + ea : "",
      marginBottom: big ? "" : String(titleMarginBottom) + ea,
      color: colorChip.black,
      width: big ? "" : String(100) + '%',
      textAlign: desktop ? "" : "center",
      lineHeight: String(lineHeight),
    }
  });

  rightBox3 = createNode({
    mother: whiteBlock3,
    style: {
      display: big ? "inline-block" : "block",
      position: "relative",
      width: big ? withOut(leftBoxWidth, ea) : String(100) + '%',
      height: String(100) + '%',
      verticalAlign: "top",
      paddingTop: String(rightBoxPaddingTop) + ea,
    }
  });

  contents3Box = createNode({
    mother: rightBox3,
    style: {
      display: "block",
      width: String(100) + '%',
      position: "relative",
    }
  });

  for (let i = 0; i < contents3.children.length; i++) {

    contents3BoxFactor = createNode({
      mother: contents3Box,
      style: {
        display: "inline-block",
        width: "calc(calc(100% - " + String(contents3BoxBetween * (desktop ? (contents3.children.length - 1) : 1)) + ea + ") / " + String(desktop ? contents3.children.length : 2) + ")",
        marginRight: desktop ? String(i === contents3.children.length - 1 ? 0 : contents3BoxBetween) + ea : String(i % 2 === 1 ? 0 : contents3BoxBetween) + ea,
        marginBottom: desktop ? "" : String(contents3BoxBetween) + ea,
        verticalAlign: "top",
      }
    })

    createNode({
      mother: contents3BoxFactor,
      style: {
        display: "flex",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        borderRadius: String(5) + "px",
        background: colorChip.white,
        height: String(contents3GreenHeight) + ea,
        marginBottom: desktop ? String(contents3BoxBetween) + ea : String(contents3BoxBetween / 2) + ea,
      },
      children: [
        {
          text: contents3.children[i].title,
          style: {
            position: "relative",
            top: String(contents3GreenTextTop) + ea,
            fontSize: String(contents3GreenSize) + ea,
            fontWeight: String(contents3GreenWeight),
            color: colorChip.black,
          }
        }
      ]
    })

    createNode({
      mother: contents3BoxFactor,
      style: {
        display: "flex",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        borderRadius: String(5) + "px",
        background: colorChip.gray1,
        height: String(contents3PictureHeight) + ea,
        marginBottom: desktop ? String(contents3BoxBetween) + ea : String(contents3BoxBetween / 2) + ea,
        backgroundImage: "url('" + AboutServiceJs.binaryPath + "/" + contents3.children[i].image + "')",
        backgroundSize: "100% auto",
        backgroundPosition: "50% 50%",
      }
    })

    contents3BoxGray = createNode({
      mother: contents3BoxFactor,
      style: {
        display: "block",
        position: "relative",
        textAlign: "center",
        borderRadius: String(5) + "px",
        background: colorChip.gray3,
        paddingTop: String(contents3GrayInnerPadding) + ea,
        paddingBottom: String(contents3GrayInnerPadding) + ea,
      }
    });

    createNode({
      mother: contents3BoxGray,
      text: contents3.children[i].description[0],
      style: {
        display: "block",
        textAlign: "center",
        fontSize: String(contents3GrayWhiteSize) + ea,
        fontWeight: String(contents3GrayWhiteWeight),
        color: colorChip.black,
        lineHeight: String(contents3GrayWhiteLineHeight),
        background: colorChip.white,
        borderRadius: String(5) + "px",
        boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
        marginLeft: String(contents3GrayInnerPadding) + ea,
        width: withOut(contents3GrayInnerPadding * 2, ea),
        paddingTop: String(contents3GrayWhitePaddingTop) + ea,
        paddingBottom: String(contents3GrayWhitePaddingBottom) + ea,
        marginBottom: String(contents3GrayInnerPadding) + ea,
      },
      bold: {
        fontWeight: String(contents3GrayWhiteWeightBold),
        color: colorChip.black,
      }
    });

    createNode({
      mother: contents3BoxGray,
      text: contents3.children[i].description[1],
      style: {
        display: "block",
        textAlign: "center",
        fontSize: String(contents3GrayWhiteSize) + ea,
        fontWeight: String(contents3GrayWhiteWeight),
        color: colorChip.green,
        lineHeight: String(contents3GrayWhiteLineHeight),
        background: colorChip.white,
        borderRadius: String(5) + "px",
        boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
        marginLeft: String(contents3GrayInnerPadding) + ea,
        width: withOut(contents3GrayInnerPadding * 2, ea),
        paddingTop: String(contents3GrayWhitePaddingTop) + ea,
        paddingBottom: String(contents3GrayWhitePaddingBottom) + ea,
      },
      bold: {
        fontWeight: String(contents3GrayWhiteWeightBold),
        color: colorChip.green,
      }
    });

  }



  // gray area ---------------------------------------------------------------------------------------------------

  baseTong3 = baseTong.cloneNode(false);
  baseTong3Back = baseTong.cloneNode(false);
  baseTong.parentNode.appendChild(baseTong3Back);
  baseTong3Back.appendChild(baseTong3);
  baseTong3Back.style.marginBottom = String(contents3GrayTongMarginBottom) + ea;
  baseTong3.style.marginBottom = "";
  baseTong3.style.paddingTop = String(0) + ea;
  baseTong3Back.style.paddingTop = String(middleAreaPaddingTop) + ea;
  baseTong3Back.style.width = String(100) + '%';
  baseTong3Back.style.left = String(0);
  baseTong2Back.style.paddingBottom = String(middleTongPaddingBottom) + ea;

  // box 4 ---------------------------------------------------------------------------------------------------

  whiteBlock4 = createNode({
    mother: baseTong3,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 3) + "px",
      width: withOut(0 * 2, ea),
      background: "transparent",
      paddingTop: String(middleTongPaddinngTop) + ea,
    }
  });

  createNode({
    mother: whiteBlock4,
    style: {
      display: "block",
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
        text: "홈리에종 프로세스, 궁금해요!",
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(middleTitleSize) + ea,
          fontWeight: String(middleTitleWeight),
          color: colorChip.black,
          textAlign: "center",
          paddingLeft: String(middleTitlePadding) + ea,
          paddingRight: String(middleTitlePadding) + ea,
          background: colorChip.gray1,
          top: String(middleTitleTextTop) + ea,
        }
      },
      {
        text: [
          desktop ? "홈리에종의 프로세스는 먼저 디자이너를 선택하는 과정부터 시작됩니다." : "홈리에종의 프로세스는 디자이너를 선택하는 과정부터 시작됩니다.",
          desktop ? "디자이너와 매칭이 되면, 디자인이 시작되고 그 디자인에 맞춰 시공과 구매가 진행되는 형식입니다." : "매칭이 되면, 디자인이 시작되고 그에 맞춰 시공과 구매가 진행됩니다.",
        ].join("\n"),
        style: {
          display: "block",
          position: "relative",
          fontSize: String(contents0InfoSize) + ea,
          fontWeight: String(400),
          lineHeight: String(1.6),
          color: colorChip.black,
          textAlign: "center",
          paddingTop: String(middleTitlePadding) + ea,
          top: String(0) + ea,
        }
      }
    ]
  });

  contents4Tong = createNode({
    mother: whiteBlock4,
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
      marginTop: String(middleTitleMarginBottom) + ea,
    }
  });

  leftBox4 = createNode({
    mother: contents4Tong,
    style: {
      display: big ? "inline-block" : "block",
      position: "relative",
      width: big ? String(leftBoxWidth) + ea : String(100) + '%',
      height: big ? String(100) + '%' : "",
      verticalAlign: "top",
    }
  });

  createNode({
    mother: leftBox4,
    text: "프로세스 안내",
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

  rightBox4 = createNode({
    mother: contents4Tong,
    style: {
      display: big ? "inline-block" : "block",
      position: "relative",
      width: big ? withOut(leftBoxWidth, ea) : String(100) + '%',
      height: String(100) + '%',
      verticalAlign: "top",
      paddingTop: String(rightBoxPaddingTop) + ea,
    }
  });

  createNode({
    mother: rightBox4,
    mode: "img",
    attribute: { src: AboutServiceJs.binaryPath + "/" + contents4.image },
    style: {
      display: "block",
      width: withOut(0 * 2, ea),
    }
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
  baseTong4.style.paddingBottom = String(middleTongPaddingBottom) + ea;
  baseTong4.style.marginBottom = String(0) + ea;
  baseTong4Back.style.marginBottom = String(0) + ea;

  // box 5 ---------------------------------------------------------------------------------------------------

  whiteBlock5 = createNode({
    mother: baseTong4,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 3) + "px",
      width: withOut(0 * 2, ea),
      background: "transparent",
      paddingTop: String(middleTongPaddinngTop) + ea,
    }
  });

  createNode({
    mother: whiteBlock5,
    style: {
      display: "block",
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
        text: "솔직한 고객 후기",
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(middleTitleSize) + ea,
          fontWeight: String(middleTitleWeight),
          color: colorChip.black,
          textAlign: "center",
          paddingLeft: String(middleTitlePadding) + ea,
          paddingRight: String(middleTitlePadding) + ea,
          background: colorChip.white,
          top: String(middleTitleTextTop) + ea,
        }
      }
    ]
  });

  contents5Tong = createNode({
    mother: whiteBlock5,
    style: {
      display: "block",
      position: "relative",
      width: "calc(100% + " + String(photoMargin) + ea + ")",
      marginTop: String(middleTitleMarginBottom) + ea,
    }
  });

  this.portfolioBlock(contents5Tong);

}

AboutServiceJs.prototype.insertMainContentsBox = function () {
  const instance = this;
  const { ea, media, baseTong } = this;
  const { withOut, returnGet, createNode, colorChip, isMac, svgMaker, serviceParsing, variableArray } = GeneralJs;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1]);
  const small = !big;
  const generalBig = (media[0] || media[1] || media[2]);
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

  margin = <%% 52, 52, 44, 32, 6 %%>;

  middleTitleSize = <%% 23, 23, 20, 18, 4.2 %%>;
  middleTitleWeight = <%% 800, 800, 800, 800, 800 %%>;
  middleTitlePadding = <%% 16, 16, 12, 10, 2 %%>;
  middleTitleLineTop = <%% 14, 14, 13, 11, (isIphone() ? 2.9 : 2.6) %%>;
  middleTitleTextTop = <%% (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), 0 %%>;

  middleTongPaddinngTop = <%% 108, 84, 72, 52, 10 %%>;
  middleTongPaddingBottom = <%% 150, 130, 100, 70, 17 %%>;
  middleTitleMarginBottom = <%% 30, 30, 30, 30, 7.5 %%>;
  middleAreaPaddingTop = <%% 40, 40, 30, 20, 5 %%>;

  downTitleSize = <%% 20, 18, 14, 13, 3.8 %%>;
  contentsSize = <%% 16, 15, 14, 13, 3.8 %%>;
  contentsSmallSize = <%% 15, 14, 13, 12, 3.5 %%>;
  contentsWeight = <%% 400, 400, 400, 400, 400 %%>;
  contentsLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;

  contentsMotherBoxMarginTop = <%% 60, 60, 50, 40, 6 %%>;
  contentsMotherBoxPaddingTop = <%% 32, 32, 30, 24, 3 %%>;
  indentBoxWidth = <%% 240, 160, 140, 120, 24 %%>;

  doubleLineHeight = <%% 6, 6, 6, 6, 6 %%>;

  contentsMotherEntirePaddingTop = <%% 12, 12, 12, 8, 1 %%>;
  contentsMotherEntirePaddingBottom = <%% 50, 50, 50, 34, 5 %%>;

  smallDescriptionPaddingTop = <%% 16, 16, 14, 12, 1 %%>;
  imageHeight = <%% 320, 270, 230, 180, 36 %%>;

  leftBoxWidth = <%% 300, 230, 300, 300, 300 %%>;

  rightBoxPaddingTop = <%% 7, 5, 7, 7, 6.5 %%>;
  lineHeight = <%% 1.42, 1.42, 1.42, 1.42, 1.42 %%>;

  titleFont = <%% 22, 22, 18, 16, 4.2 %%>;
  titleLeft = <%% 6, 6, 6, 6, 0 %%>;
  titleFontWeight = <%% 700, 700, 700, 700, 700 %%>;
  titleMarginBottom = <%% 0, 0, 18, 12, 0.5 %%>;
  titleVisualTop = <%% (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), 2 %%>;

  photoMargin = <%% 20, 18, 18, 16, 3 %%>;
  columns = <%% 4, 4, 3, 3, 2 %%>;
  photoMarginBottom = <%% (isMac() ? 18 : 20), (isMac() ? 16 : 18), (isMac() ? 16 : 18), (isMac() ? 16 : 18), 2.5 %%>;

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
              `세 번째로, <b%전문가와 함께하는 이유는 결과물에 대한 보증입니다.%b> 디자이너는 단순히 감각이 좋은 사람이 아니라, 인테리어 디자인 분야에서 경력을 쌓은 전문가들입니다. 이들은 실제 현장을 다녀보고 구현해본 경험이 많으며, 주거 인테리어 시공 분야에 대한 경험이 풍부합니다. 또한, 가구와 소품 브랜드에 대한 깊은 지식을 갖고 있습니다. 주거 인테리어에 대한 경험치 자체가 다르기 때문에 어떤 컨셉으로 디자인을 진행하면 어떻게 구현될지 미리 예측할 수 있으며, 가상적으로 구현해 볼 수도 있습니다. 또한, 전문가는 도면과 3D에 대한 능력도 있어 현장 작업자들과 원활한 소통이 가능합니다. 따라서 전문가에게 맡기면 전문적인 지식과 경험, 감각 등이 더해져 월등히 좋은 결과물이 나오게 됩니다.`
            ],
          },
        ]
      }
    },
    homeliaison: {
      up: {
        title: "전문가의 홈스타일링, 홈리에종에서!",
        description: [
          "홈스타일링 디자이너와 함께하는 이유는 다양합니다. 홈리에종을 거치지 않고 디자이너와 직접적으로 연결하면 더 많은 비용을 절약할 수 있지 않을까 생각할 수 있겠지만,",
          "그래도 홈리에종을 통해 디자이너를 만나야 하는 이유는 분명히 있습니다. 다음과 같이 4가지 대표적인 이유가 있습니다."
        ]
      },
      down: {
        title: "홈리에종과 함께\n해야 하는 이유",
        children: [
          {
            description: [
              `첫 번째로 <b%안전한 프로젝트 운영입니다.%b> 디자이너와 직접적으로 연결하여 작업을 진행하는 경우, 문제가 발생할 때 중재해줄 제3자가 없어 리스크가 큽니다. 문제가 발생하여 해결이 되지 않으면 연락이 끊길 수 있고, 책임을 회피하느라 프로젝트가 올바르게 마무리되지 않을 수 있습니다. 특히 인테리어 분야는 예측할 수 없는 문제가 매우 빈번하게 발생하며, 피해 금액도 크기 때문에 리스크 관리가 매우 중요합니다. 디자이너 또는 작업자와 직접 연락을 취하여 중재할 제3자를 끼지 않는 것은 상당히 위험합니다. 인테리어 분야에서는 꼭 회사나 플랫폼을 끼고 프로젝트를 진행하는 것이 안전하고 올바른 선택입니다.`,
            ],
          },
          {
            description: [
              `두 번째로 홈리에종에는 <b%검증된 디자이너들만 모였다는 점 때문입니다.%b> 프리랜서 디자이너는 수많이 존재하지만, 그들의 실력과 작업 방식을 정확히 평가하기는 어렵습니다. 또한 인테리어 업계에서는 표준화가 잘 이루어지지 않아, 작업 방식이 다양하고 품질이 일정하지 않을 수 있습니다. 그러나 홈리에종의 디자이너들은 검증 과정을 거쳐 선발된 전문가들로 구성되어 있으며, 홈리에종의 표준에 맞춰 작업을 수행합니다. 또한 결과물에 대한 보증 및 포트폴리오 검증도 철저히 이루어지므로, 홈리에종의 디자이너라면 믿고 인테리어를 맡길 수 있는 것입니다.`,
            ],
          },
          {
            description: [
              `세 번째로 <b%홈리에종의 큐레이션이 있기 때문입니다.%b> 인테리어를 디자이너와 진행하려면, 수많은 디자이너들 중에서 내 취향과 조건에 부합하는 디자이너를 찾아야 합니다. 하지만 내가 원하는 디자이너가 있더라도 예산, 일정, 거리 등 다양한 요인들을 고려해야 하기 때문에 선택 과정은 복잡하고 어렵습니다. 홈리에종의 큐레이션 서비스는 이러한 문제를 해결해줍니다. 고객 상담을 통해 고객님의 기본 정보와 여러 조건들을 체계적으로 분석하여, 최적의 인테리어 디자이너 3~4명을 추천해줍니다. 이를 통해 고객님은 어떤 디자이너가 가장 적합한지를 쉽게 확인할 수 있으며, 예산, 일정, 거리 등 다양한 요인들도 모두 고려된 맞춤형 추천을 받을 수 있습니다. 홈리에종과 함께하면 디자이너를 찾기 위해 복잡하고 긴 시간을 들일 필요 없이, 쉽고 빠르게 디자이너를 추천받고 선택할 수 있습니다.`,
            ],
          },
          {
            description: [
              `네 번째로 <b%홈리에종의 프로젝트 케어가 있기 때문입니다.%b> 인테리어 프로젝트를 진행하는 동안 디자이너와 고객만 소통하는 것이 아니라, 홈리에종은 중재 역할을 하며 문제가 발생하면 적극적으로 해결해줍니다. 만약 디자이너와 맞지 않는 경우, 다른 디자이너로 교체하는 것도 가능합니다. 프로젝트의 각 중요 단계에서 홈리에종은 고객과 디자이너에게 전화를 걸어 문제 없이 진행되고 있는지 확인하며, 현장을 사진으로 확인하여 프로젝트가 원활하게 마무리될 수 있도록 합니다. 또한, 세팅과 촬영까지 진행하게 하여 최종 결과물을 확실하게 만들어드립니다. 고객님은 프로젝트가 중간에 흐지부지 끝나거나 제대로 마무리되지 않을까 하는 걱정 없이, 프로젝트가 완성도 높게 끝나길 기다리기만 하시면 됩니다.`,
            ],
          },
        ]
      },
      image: AboutServiceJs.binaryPath + "/about_homeliaison_00.jpg",
    },
    process: {
      up: {
        title: "홈리에종 프로세스, 궁금해요!",
        description: [
          "문의를 주시면 1차 응대가 이루어지고, 응대가 끝나면 홈리에종은 고객님께 디자이너 추천서를 보내며, 고객님이 디자이너를 선택하신 후, 계약금을 결제하시면 계약이 체결됩니다.",
          "계약이 체결되면 현장 미팅이 이루어지고 미팅 후 디자이너와 매칭이 되면, 디자인이 본격적으로 시작되고 그 디자인에 맞춰 시공과 구매가 진행되는 형식입니다."
        ]
      },
      process: {
        title: "프로세스 안내",
        image: AboutServiceJs.binaryPath + "/" + "contents40.png",
      }
    },
    service: {
      up: {
        title: "홈리에종의 서비스 종류",
        description: [
          "서비스는 시공 범위에 따라 구분됩니다. 홈퍼니싱은 시공이 없는 서비스이며, 홈스타일링과 토탈 스타일링은 부분 시공만 진행하는 지, 전체 시공을 진행하는 지에 따라 구분됩니다.",
          "엑스트라 스타일링은 토탈 스타일링의 프리미엄 버전으로, '설계 변경'이라고도 불리며, 시공 디자인이 필요한지 여부에 따라 토탈과 구분됩니다.",
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
  }

  basicContentsMaker = (mother, keyword, backgroundColor) => {
    createNode({
      mother: mother,
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
          text: contents[keyword].up.title,
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
            background: backgroundColor,
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
            textAlign: "center",
            paddingTop: String(smallDescriptionPaddingTop) + ea,
            top: String(0) + ea,
            width: generalBig ? withOut(0, ea) : String(80) + '%',
          }
        }
      ]
    });
    createNode({
      mother: mother,
      style: {
        display: contents[keyword].image !== undefined ? "flex" : "none",
        marginTop: String(contentsMotherBoxMarginTop) + ea,
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
          backgroundSize: "100% auto",
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
                      text: contents[keyword].down.children[index].title === undefined ? String(index + 1) : contents[keyword].down.children[index].title,
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
                    width: withOut(indentBoxWidth * 2, ea),
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
          marginTop: String(contentsMotherBoxMarginTop) + ea,
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
  baseTong.style.marginBottom = String(middleTongPaddingBottom) + ea;
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
  baseTong.style.marginBottom = String(middleTongPaddingBottom) + ea;
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
  baseTong.style.marginBottom = String(middleTongPaddingBottom) + ea;
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

AboutServiceJs.prototype.generateGsArray = function (number) {
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

AboutServiceJs.prototype.portfolioBlock = function (baseBlock) {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, svgMaker, equalJson, cleanChildren, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, selfHref } = GeneralJs;
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
  quoteWidth = SvgTong.getRatio(SvgTong.stringParsing(svgMaker.doubleQuote(colorChip.green))) * quoteHeight;
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

AboutServiceJs.prototype.insertThreeBox = function (middleTong) {
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
        background: AboutServiceJs.binaryPath + "/" + "startillf0.png",
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
        background: AboutServiceJs.binaryPath + "/" + "startills0.png",
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
        background: AboutServiceJs.binaryPath + "/" + "startillt0.png",
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
            backgroundSize: desktop ? "100% auto" : "100% auto",
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

AboutServiceJs.prototype.launching = async function (loading) {
  const instance = this;
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

    const { returnGet, ajaxJson, requestPromise, setDebounce, colorChip } = GeneralJs;
    const getObj = returnGet();
    let response;

    response = await ajaxJson({ mode: "review", limit: 42 }, LOGHOST + "/getContents", { equal: true });
    this.contentsArr = new SearchArray(response.contentsArr);
    this.designers = new SearchArray(response.designers);

    await this.mother.ghostClientLaunching({
      mode: "ghost",
      name: "aboutService",
      client: null,
      base: {
        instance: this,
        binaryPath: AboutServiceJs.binaryPath,
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
          instance.insertPeopleBox();
          instance.insertMainContentsBox();
        } catch (e) {
          await GeneralJs.ajaxJson({ message: "AboutServiceJs.launching.ghostClientLaunching : " + e.message }, "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

    this.totalContents.children[0].style.background = colorChip.gray1;
    this.totalContents.children[1].style.transition = "all 0s ease";
    this.totalContents.children[1].style.height = String(<&& 600 | 540 | 460 | 400 | 118 &&>) + this.ea;

  } catch (err) {
    console.log(err);
    await GeneralJs.ajaxJson({ message: "AboutServiceJs.launching 에러 일어남 => " + err.message }, "/errorLog");
  }
}
