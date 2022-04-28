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
  "route": [
    "aboutService"
  ]
} %/%/g

const AboutServiceJs = function () {
  this.mother = new GeneralJs();
}

AboutServiceJs.binaryPath = "/middle/curation";

AboutServiceJs.prototype.insertInitBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, svgMaker, serviceParsing } = GeneralJs;
  const { client, ea, media, osException, testMode } = this;
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
  let initWording0, initWording1;
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

  blockHeight = <%% 396, 326, 293, 246, 120 %%>;
  bottomMargin = <%% 16, 16, 16, 12, 5 %%>;
  margin = <%% 52, 52, 44, 32, 52 %%>;
  marginTop = <%% 52, 50, 40, 32, 52 %%>;
  leftRatio = <%% 0.32, 0.32, 0.32, 0.32, 0.32 %%>;

  titleFont = <%% 31, 26, 23, 19, 5.4 %%>;
  titleLeft = <%% 6, 6, 6, 6, 0 %%>;
  titleFontWeight = <%% 500, 500, 600, 600, 500 %%>;
  wordSpacing = <%% -3, -3, -3, -3, -2 %%>;

  barWidth = <%% 70, 80, 80, 80, 80 %%>;
  barLeft = <%% 240, titleLeft + 234, titleLeft + 234, titleLeft + 234, titleLeft + 234 %%>;

  indexFont = <%% 19, 19, 19, 19, 19 %%>;
  indexFontWeight = <%% 200, 200, 200, 200, 200 %%>;

  leftWidth = <%% 300, 232, 200, 164, 300 %%>;

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
  mobileLeftBoxHeight = 29;

  grayBoxImageVisualWidth = <%% 16, 4, 0, 0, 19 %%>;

  grayUpWordings = [ "프로세스", "후 시공 / 구매", "선 디자인 / 기획", "디자이너 선택" ];
  grayDownWordings = [ "비용 구성", "시공 비용", "구매 비용", "디자인비" ];

  initWording0 = "본격적인 인테리어는 고객님과 맞는 <b%디자이너가 매칭된 이후%b> 진행되며,";
  initWording1 = "<b%이를 위해 상세 큐레이션%b>이 꼭 필요합니다. 다음 질문들에 꼭 답변해주세요!";

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
          wordSpacing: String(wordSpacing) + "px",
          top: desktop ? (String((media[0] ? 0 : media[1] ? 1 : 3) + (isMac() || mobile ? 0 : 2)) + ea) : String(9) + ea,
          left: String(titleLeft) + ea,
          color: colorChip.black,
          width: desktop ? "" : String(100) + '%',
          textAlign: desktop ? "" : "center",
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
  const { createNode, createNodes, colorChip, withOut, ajaxJson, isMac, isIphone } = GeneralJs;
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
  let contents0Columns;
  let contents0Box;
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

  blockMarginBottom = <%% 16, 16, 16, 16, 2 %%>;

  lastBlockMarginBottom = <%% 160, 160, 160, 80, 12 %%>;

  margin = <%% 52, 52, 44, 32, 6 %%>;

  titleFont = <%% 29, 24, 21, 17, 4.2 %%>;
  titleLeft = <%% 6, 6, 6, 6, 0 %%>;
  titleFontWeight = <%% 500, 500, 600, 600, 600 %%>;
  wordSpacing = <%% -3, -3, -3, -3, -2 %%>;
  titleMarginBottom = <%% 0, 0, 18, 12, 0.5 %%>;

  lineHeight = <%% 1.42, 1.42, 1.42, 1.42, 1.42 %%>;

  leftBoxWidth = <%% 300, 230, 300, 300, 300 %%>;

  boxMargin = <%% 36, 25, 24, 14, 2 %%>;

  rightBoxPaddingTop = <%% 7, 5, 7, 7, 6.5 %%>;
  rightBoxPaddingTopFontVersion = <%% 2, 2, 2, 2, 7 %%>;

  height0 = <%% 545, 415, 506, 389, 141 %%>;
  height1 = <%% 570, 480, 550, 447, 216 %%>;
  height2 = <%% 450, 345, 442, 358, 120 %%>;
  height3 = <%% 430, 360, 438, 370, 163 %%>;
  height4 = <%% 310, 270, 310, 276, 109 %%>;

  titleVisualTop = <%% (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), 2 %%>;

  boxTongPaddingBottom = <%% 10, 10, 6, 10, 3.8 %%>;
  contents0PhotoHeight = <%% 180, 130, 150, 114, 22 %%>;

  contents0PaddingLeft = <%% 15, 15, 15, 12, 1 %%>;
  contents0PaddingTop = <%% (isMac() ? 6 : 8), (isMac() ? 6 : 8), (isMac() ? 6 : 8), (isMac() ? 6 : 8), 2 %%>;
  contents0PaddingBottom = <%% (isMac() ? 9 : 7), (isMac() ? 9 : 7), (isMac() ? 9 : 7), (isMac() ? 9 : 7), 2 %%>;
  contents0TitleSize = <%% 14, 13, 13, 11, 3 %%>;
  contents0TitleWeight = <%% 700, 700, 700, 700, 700 %%>;
  contents0TitleWhiteBoxMargin = <%% 15, 12, 14, 10, -7 %%>;

  contents0DescriptionSize = <%% 15, 14, 14, 12, 2.6 %%>;
  contents0DescriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
  contents0DescriptionLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;
  contents0DescriptionWeightBold = <%% 700, 700, 700, 700, 700 %%>;
  contents0DescriptionMarginTop = <%% 20, 15, 15, 9, (isIphone() ? 7.5 : 7.8) %%>;

  contents0Columns = <%% 3, 3, 3, 3, 2 %%>;

  contents1TitleSize = <%% 19, 18, 17, 15, 4.2 %%>;
  contents1TitleWeight = <%% 600, 600, 600, 600, 600 %%>;
  contents1TitleBetween = <%% 16, 14, 14, 12, 6 %%>;
  contents1Between = <%% 45, 40, 30, 22, 9 %%>;

  contents1Columns = <%% 5, 5, 5, 5, 2 %%>;

  contents1UpBoxWidth = <%% 232, 197, 225, 185, 88 %%>;
  contents1UpBoxMargin = <%% 10, 8, 8, 8, 1 %%>;
  contents1UpBoxPaddingLeft = <%% 22, 18, 20, 14, 3.5 %%>;
  contents1UpBoxPaddingTop = <%% (isMac() ? 16 : 17), (isMac() ? 14 : 15), (isMac() ? 15 : 16), (isMac() ? 11 : 12), 3.5 %%>;

  contents1UpBoxCheckTop = <%% (isMac() ? 7 : 5), (isMac() ? 7 : 5), (isMac() ? 7 : 5), (isMac() ? 7 : 5), 15.5 %%>;
  contents1UpBoxCheckWidth = <%% 11, 11, 11, 10, 2.6 %%>;
  contents1UpBoxCheckMarginRight = <%% 6, 6, 6, 6, 6 %%>;

  contents1UpBoxTitleSize = <%% 16, 15, 16, 14, 3.5 %%>;
  contents1UpBoxTitleWeight = <%% 600, 600, 600, 600, 600 %%>;

  contents1UpBoxWhiteMarginTop = <%% (isMac() ? 10 : 8), (isMac() ? 10 : 8), (isMac() ? 10 : 8), (isMac() ? 8 : 6), 3 %%>;
  contents1UpBoxWhitePaddingTop = <%% (isMac() ? 16 : 17), (isMac() ? 16 : 17), (isMac() ? 16 : 17), (isMac() ? 13 : 14), 3 %%>;
  contents1UpBoxWhitePaddingBottom = <%% (isMac() ? 21 : 19), (isMac() ? 21 : 19), (isMac() ? 21 : 19), (isMac() ? 18 : 16), 3.5 %%>;

  contents1UpBoxWhiteSize = <%% 14, 13, 14, 11, 2.8 %%>;
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

  contents2ImageTop = <%% 40, 25, 20, 40, 40 %%>;
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

  contents3PictureHeight = <%% 160, 120, 138, 110, 26 %%>;

  contents0 = [
    {
      title: "전문 지식이 없어 난감하다면?",
      description: "시공 전 발생할 수 있는 <b%리스크를%b>\n<b%미리 체크하고 보완%b>해 드려요.",
      image: "contents00.jpg",
    },
    {
      title: "취향이 명확하지 않다면?",
      description: "상담을 통해 <b%니즈와 취향을 파악%b>해\n컨셉의 방향성을 잡아드려요.",
      image: "contents01.jpg",
    },
    {
      title: "결정이 어려운 성향이라면?",
      description: "선택의 폭을 좁혀드리고\n<b%결정의 순간 명확한 조언%b>을 드려요.",
      image: "contents02.jpg",
    },
    {
      title: "부족한 감각은?",
      description: "<b%전문가의 아이디어와 감각%b>으로\n특색 있는 집을 완성합니다.",
      image: "contents03.jpg",
    },
    {
      title: "예산을 잘 쓰고 싶다면?",
      description: "전체 <b%예산을 우선순위에 따라 분배%b>\n해 합리적으로 운영해드려요.",
      image: "contents04.jpg",
    },
    {
      title: "시간과 에너지가 부족할 땐?",
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
      width: withOut(margin * 2, ea),
      background: colorChip.white,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
      marginBottom: String(blockMarginBottom) + ea,
      height: String(height0) + ea,
      paddingTop: String(margin) + ea,
      paddingBottom: String(margin) + ea,
      paddingLeft: String(margin) + ea,
      paddingRight: String(margin) + ea,
    }
  });

  leftBox0 = createNode({
    mother: whiteBlock0,
    style: {
      display: big ? "inline-block" : "block",
      position: "relative",
      width: big ? String(leftBoxWidth) + ea : String(100) + '%',
      height: big ? String(100) + '%' : "",
      verticalAlign: "top",
    }
  });

  createNode({
    mother: leftBox0,
    text: big ? "이젠 디자이너와\n함께 진행하세요!" : "이젠 디자이너와 함께 진행하세요!",
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

  rightBox0 = createNode({
    mother: whiteBlock0,
    style: {
      display: big ? "inline-block" : "block",
      position: "relative",
      width: big ? withOut(leftBoxWidth, ea) : String(100) + '%',
      height: String(100) + '%',
      verticalAlign: "top",
      paddingTop: String(desktop ? rightBoxPaddingTop : rightBoxPaddingTopFontVersion) + ea,
    }
  });

  for (let i = 0; i < contents0.length; i++) {
    title = contents0[i].title;
    description = contents0[i].description;
    image = contents0[i].image;

    boxTong = createNode({
      mother: rightBox0,
      style: {
        display: "inline-block",
        width: "calc(calc(100% - " + String(boxMargin * (contents0Columns - 1)) + ea + ") / " + String(contents0Columns) + ")",
        marginRight: String(i % contents0Columns === contents0Columns - 1 ? 0 : boxMargin) + ea,
        marginBottom: String(boxMargin) + ea,
        paddingBottom: String(boxTongPaddingBottom) + ea,
      }
    });

    createNode({
      mother: boxTong,
      style: {
        display: "block",
        position: "relative",
        width: String(100) + '%',
        height: String(contents0PhotoHeight) + ea,
        backgroundSize: "102% auto",
        backgroundPosition: "50% 50%",
        backgroundImage: "url('" + AboutServiceJs.binaryPath + "/" + image + "')",
        borderRadius: String(5) + "px",
      },
      children: [
        {
          text: title,
          style: {
            display: "inline-block",
            position: "absolute",
            background: colorChip.white,
            paddingLeft: desktop ? String(contents0PaddingLeft) + ea : "",
            paddingRight: desktop ? String(contents0PaddingLeft) + ea : "",
            paddingTop: desktop ? String(contents0PaddingTop) + ea : "",
            paddingBottom: desktop ? String(contents0PaddingBottom) + ea : "",
            fontSize: String(contents0TitleSize) + ea,
            fontWeight: String(contents0TitleWeight),
            color: colorChip.green,
            bottom: String(contents0TitleWhiteBoxMargin) + ea,
            left: String(desktop ? contents0TitleWhiteBoxMargin : 0) + ea,
            borderRadius: String(5) + "px",
            opacity: String(0.95),
            width: desktop ? "" : String(100) + '%',
            textAlign: desktop ? "" : "center",
          }
        }
      ]
    });

    createNode({
      mother: boxTong,
      text: description,
      style: {
        display: "block",
        fontSize: String(contents0DescriptionSize) + ea,
        fontWeight: String(contents0DescriptionWeight),
        color: colorChip.black,
        textAlign: "center",
        lineHeight: String(contents0DescriptionLineHeight),
        marginTop: String(contents0DescriptionMarginTop) + ea,
      },
      bold: {
        fontWeight: String(contents0DescriptionWeightBold),
        color: colorChip.black,
      }
    });

  }

  // box 1 ---------------------------------------------------------------------------------------------------

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

  // box 2 ---------------------------------------------------------------------------------------------------

  whiteBlock2 = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 3) + "px",
      width: withOut(margin * 2, ea),
      background: colorChip.white,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
      marginBottom: String(blockMarginBottom) + ea,
      height: String(height2) + ea,
      paddingTop: String(margin) + ea,
      paddingBottom: String(margin) + ea,
      paddingLeft: String(margin) + ea,
      paddingRight: String(margin) + ea,
    }
  });

  leftBox2 = createNode({
    mother: whiteBlock2,
    style: {
      display: big ? "inline-block" : "block",
      position: "relative",
      width: big ? String(leftBoxWidth) + ea : String(100) + '%',
      height: big ? String(100) + '%' : "",
      verticalAlign: "top",
    }
  });

  createNode({
    mother: leftBox2,
    text: big ? "인테리어 예산의\n3가지 분류" : "인테리어 예산의 3가지 분류",
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

  rightBox2 = createNode({
    mother: whiteBlock2,
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
    mother: rightBox2,
    mode: "img",
    attribute: { src: AboutServiceJs.binaryPath + "/" + contents2.image },
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
    }
  });

  // box 3 ---------------------------------------------------------------------------------------------------

  whiteBlock3 = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 3) + "px",
      width: withOut(margin * 2, ea),
      background: colorChip.white,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
      marginBottom: String(blockMarginBottom) + ea,
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
    text: big ? "홈리에종 서비스의\n4가지 분류" : "홈리에종 서비스의 4가지 분류",
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
        background: colorChip.liteGreen,
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
        background: colorChip.gray1,
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

  // box 4 ---------------------------------------------------------------------------------------------------

  whiteBlock4 = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 3) + "px",
      width: withOut(margin * 2, ea),
      background: colorChip.white,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
      marginBottom: String(lastBlockMarginBottom) + ea,
      height: String(height4) + ea,
      paddingTop: String(margin) + ea,
      paddingBottom: String(margin) + ea,
      paddingLeft: String(margin) + ea,
      paddingRight: String(margin) + ea,
    }
  });

  leftBox4 = createNode({
    mother: whiteBlock4,
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
    mother: whiteBlock4,
    style: {
      display: big ? "inline-block" : "block",
      position: "relative",
      width: big ? withOut(leftBoxWidth, ea) : String(100) + '%',
      height: String(100) + '%',
      verticalAlign: "top",
      paddingTop: big ? String(rightBoxPaddingTop) + ea : (mobile ? String(7) + ea : String(0) + ea),
    }
  });

  createNode({
    mother: rightBox4,
    mode: "img",
    attribute: { src: AboutServiceJs.binaryPath + "/" + contents4.image },
    style: {
      display: "block",
      width: String(100) + '%',
    }
  });

}

AboutServiceJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    this.mother.setGeneralProperties(this);

    const { returnGet, ajaxJson, requestPromise, setDebounce } = GeneralJs;
    const getObj = returnGet();

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
      },
      local: async () => {
        try {
          instance.insertInitBox();
          instance.insertServiceBox();
        } catch (e) {
          await GeneralJs.ajaxJson({ message: "AboutServiceJs.launching.ghostClientLaunching : " + e.message }, "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

  } catch (err) {
    console.log(err);
    await GeneralJs.ajaxJson({ message: "AboutServiceJs.launching 에러 일어남 => " + err.message }, "/errorLog");
  }
}
