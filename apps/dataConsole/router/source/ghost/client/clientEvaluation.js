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
      "return ('홈리에종 서비스 평가 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('홈리에종 서비스 평가 페이지 입니다! | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "clientEvaluation",
  "hangul": "서비스 평가",
  "route": [
    "evaluation",
    "CE"
  ]
} %/%/g

const ClientEvaluationJs = function () {
  this.mother = new GeneralJs();
}

ClientEvaluationJs.binaryPath = FRONTHOST + "/middle/evaluation";

ClientEvaluationJs.prototype.insertInitBox = function () {
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

  titleWording = "홈리에종 서비스 평가";
  subTitleContents = "홈스타일링에 대한 솔직한 평가를 남겨주세요!";

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

ClientEvaluationJs.prototype.insertEvaluationBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, ajaxJson, equalJson } = GeneralJs;
  const { ea, media, standardWidth } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const inputClassName = "inputClassName";
  const agreeTargetClassName = "agreeTargetClassName";
  const variableBarClassName = "variableBarClassName";
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
  let budgetValues;
  let furnitureValues;
  let defaultRatio;
  let barClickEvent;
  let selectionFactorWidth;
  let selectionFactorTongMarginTop;
  let barFactorVisualMarginRatio;
  let selectionFactorVisualMarginRatio;
  let grayBarUpDownMarginRatio;
  let barFactorTongVisualTop;
  let mobileQuestionWordingPaddingTop;
  let mobileQuestionWordingPaddingBottom;
  let mobileSelectionFactorWidth0;
  let mobileSelectionFactorMarginBottom;
  let mobileModuleBlockHeight;
  let descriptionBox;
  let domList;
  let questionLength;

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

  mainSize = <%% 20, 18, 17, 15, 4 %%>;
  mainWeight = <%% 500, 500, 500, 500, 500 %%>;
  mainTop = <%% (isMac() ? 0 : 3), (isMac() ? 2 : 4), (isMac() ? 2 : 4), (isMac() ? 2 : 4), 0.5 %%>;
  inputSize = <%% 13, 13, 12, 12, 3 %%>;
  inputWeight = <%% 400, 400, 400, 400, 400 %%>;
  inputIndent = <%% 10, 10, 10, 10, 2.5 %%>;

  secondPointLeft = <%% 315, 270, 240, 260, 25 %%>;

  grayTop = <%% 0, 0, 0, 0, 0 %%>;
  grayInputTop = <%% (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), -0.2 %%>;
  grayHeight = <%% 32, 32, 28, 26, 7 %%>;
  grayBigHeight = <%% 156, 137, 136, 135, 38 %%>;
  grayTextAreaTop = <%% 3, 3, 3, 3, 1.3 %%>;
  grayTextAreaWidth = <%% 51.7, 51.7, 51.7, 390, 51.7 %%>;

  moduleHeight = grayTop + grayHeight;
  blockMarginBottom = <%% 12, 4, 3, 2, 5 %%>;

  leftGrayType0 = <%% 101, 90, 78, 78, 18 %%>;
  leftGrayType1 = <%% 418, 361, 318, 96, 22.8 %%>;
  leftGrayType2 = <%% 125, 112, 98, 88, 22.8 %%>;
  leftGrayType3 = <%% 164, 151, 130, 129, 30.5 %%>;

  widthGrayType0 = <%% 160, 140, 140, 150, 34 %%>;
  widthGrayType1 = <%% 455, 329, 283, 403, 58.1 %%>;
  widthGrayType2 = <%% 757, 588, 503, 383, 53.4 %%>;
  widthGrayType3 = <%% 392, 268, 231, 352, 45.6 %%>;

  addressWidth = <%% 54, 54, 46, 46, 11 %%>;
  addressSize = <%% 13, 13, 12, 12, 3 %%>;
  addressWeight = <%% 600, 600, 600, 600, 600 %%>;
  addressTop = <%% (isMac() ? 5 : 7), (isMac() ? 5 : 7), (isMac() ? 5 : 7), (isMac() ? 5 : 7), 1.2 %%>;

  leftCheck0 = <%% 125, 112, 98, 98, 22.8 %%>;
  leftCheck1 = <%% 195, 176, 156, 152, 36.5 %%>;
  checkboxWidth = <%% 9, 9, 9, 8, 2 %%>;
  checkboxTop = <%% (isMac() ? 9 : 9), (isMac() ? 9 : 8), (isMac() ? 9 : 8), (isMac() ? 9 : 8), (isIphone() ? 2.5 : 2.3) %%>;
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

  descriptionSize = <%% 15, 14, 13, 13, 3 %%>;
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
  submitButtonWidth = <%% 156, 156, 142, 130, 33 %%>;
  submitButtonHeight = <%% 47, 47, 42, 38, 10 %%>;
  submitSize = <%% 20, 20, 18, 16, 4 %%>;
  submitWeight = <%% 400, 400, 400, 400, 400 %%>;
  submitLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;
  submitTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.3 %%>;

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

  selectionFactorWidth = <%% 156, 126, 107, 81, 16 %%>;
  selectionFactorTongMarginTop = <%% 9, 9, 8, 7, 1 %%>;

  barFactorVisualMarginRatio = <%% 1, 1, 1, 1, 1 %%>;
  selectionFactorVisualMarginRatio = <%% 0.1, 0.1, 0.1, 0.1, 0.1 %%>;

  mobileGrayTextAreaTop = 7.8;

  defaultRatio = 0.5;

  grayBarUpDownMarginRatio = <%% 1.8, 1.8, 1.8, 1.8, 1.2 %%>;
  barFactorTongVisualTop = <%% 1, 2, 1, 1, 0 %%>;

  mobileQuestionWordingPaddingTop = 0.6;
  mobileQuestionWordingPaddingBottom = 1.6;
  mobileSelectionFactorWidth0 = 27;
  mobileSelectionFactorMarginBottom = 1;
  mobileModuleBlockHeight = 20;

  questionLength = 11;
  domList = [];
  for (let i = 0; i < questionLength; i++) {
    domList.push({
      dom: null,
      type: "selection"
    });
  }
  
  contents = {
    main: [
      "홈리에종 서비스 평가",
    ],
    sub: [
      <&& "홈리에종의 서비스 경험에 대해서" | "홈리에종의 서비스 경험에 대해서" | "홈리에종의 경험에 대해서" | "홈리에종의 경험에 대해서" | "홈리에종의 경험에 대해서" &&>,
      <&& "고객님의 <b%솔직한 평가%b>를 남겨주세요." | "고객님의 <b%솔직한 평가%b>를 남겨주세요." | "<b%고객님의 평가%b>를 남겨주세요." | "<b%고객님의 평가%b>를 남겨주세요." | "<b%고객님의 평가%b>를 남겨주세요." &&>,
      <&& "고객님께서 작성해주신 평가 내용은" | "고객님께서 작성해주신 평가 내용은" | "작성해주신 평가 내용은" | "작성해주신 평가 내용은" | "작성해주신 평가 내용은" &&>,
      <&& "홈리에종 서비스 개선에 사용됩니다!" | "홈리에종 서비스 개선에 사용됩니다!" | "서비스 개선에 사용됩니다!" | "서비스 개선에 사용됩니다!" | "서비스 개선에 사용됩니다!" &&>,
    ]
  };

  if (mobile) {
    contents.sub = [
      "홈리에종의 경험에 대해서 <b%고객님의 평가%b>를 남겨주세요.",
      "작성해주신 평가 내용은 서비스 개선에 사용됩니다!"
    ]
  }

  budgetValues = [
    { title: (desktop ? "1,000만원 이하" : "1천만원 이하"), value: "1,000만원", },
    { title: (desktop ? "2,000만원" : "2천만원"), value: "2,000만원", },
    { title: (desktop ? "3,000만원" : "3천만원"), value: "3,000만원", },
    { title: (desktop ? "4,000만원" : "4천만원"), value: "4,000만원", },
    { title: (desktop ? "5,000만원" : "5천만원"), value: "5,000만원 이상", },
    { title: (desktop ? "6,000만원" : "6천만원"), value: "6,000만원 이상", },
    { title: (desktop ? "7,000만원" : "7천만원"), value: "7,000만원 이상", },
    { title: (desktop ? "8,000만원" : "8천만원"), value: "8,000만원 이상", },
    { title: "1억원 이상", value: "1억원 이상", },
  ];

  furnitureValues = [
    { title: "재배치", value: "재배치", },
    { title: "재배치 + 일부 구매", value: "일부 구매", },
    { title: "전체 구매", value: "전체 구매", },
  ];

  barClickEvent = (arr) => {
    const valuesArr = equalJson(JSON.stringify(arr));
    return function (e) {
      const bar = this.querySelector("." + variableBarClassName);
      const box = this.getBoundingClientRect();
      let thisLength;
      let ratio;

      thisLength = e.x - box.x;
      ratio = Math.round((thisLength / box.width) * 1000000) / 1000000;

      bar.style.width = String(ratio * 100) + '%';
      this.setAttribute("click", "true");
      this.setAttribute("ratio", String(ratio));
      this.setAttribute("value", valuesArr[Math.round((valuesArr.length - 1) * ratio)].value);
    }
  }

  phoneHypenEvent = function (e) {
    this.value = autoHypenPhone(this.value);
  }

  nameBlurEvent = function (e) {
    this.value = this.value.trim().replace(/[^a-zA-Z가-힣]/gi, '');
    if (this.value !== '') {
      homeliaisonAnalytics({
        page: instance.pageName,
        standard: instance.firstPageViewTime,
        action: "inputBlur",
        data: {
          property: "name",
          value: this.value,
          date: dateToString(new Date(), true),
        },
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  phoneBlurEvent = function (e) {
    this.value = this.value.trim().replace(/[^0-9\-]/gi, '');
    this.value = autoHypenPhone(this.value);
    if (this.value !== '') {
      homeliaisonAnalytics({
        page: instance.pageName,
        standard: instance.firstPageViewTime,
        action: "inputBlur",
        data: {
          property: "phone",
          value: this.value,
          date: dateToString(new Date(), true),
        },
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  emailBlurEvent = function () {
    this.value = this.value.replace(/[\=\+\?\#\&\(\)]/gi, '');
    if (this.value !== '') {
      homeliaisonAnalytics({
        page: instance.pageName,
        standard: instance.firstPageViewTime,
        action: "inputBlur",
        data: {
          property: "email",
          value: this.value,
          date: dateToString(new Date(), true),
        },
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  bigAddressBlurEvent = function () {
    if (this.value !== '') {
      homeliaisonAnalytics({
        page: instance.pageName,
        standard: instance.firstPageViewTime,
        action: "inputBlur",
        data: {
          property: "address0",
          value: this.value,
          date: dateToString(new Date(), true),
        },
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  addressButtonEvent = async function (e) {
    try {
      const totalContents = document.getElementById("totalcontents");
      const removeTargets = "removeTargets";
      const zIndex = 4;
      let cancelBack, whitePrompt;

      GeneralJs.stacks["addressEvent"] = async function (e) {
        try {
          if (typeof e.data === "string") {
            findByAttribute(document.querySelectorAll('.' + inputClassName), "property", "address0").value = e.data.trim();
            findByAttribute(document.querySelectorAll('.' + inputClassName), "property", "address1").value = '';
            findByAttribute(document.querySelectorAll('.' + inputClassName), "property", "address1").focus();
          }
          const targets = document.querySelectorAll('.' + removeTargets);
          for (let dom of targets) {
            dom.remove();
          }
          window.removeEventListener("message", GeneralJs.stacks["addressEvent"]);
          GeneralJs.stacks["addressEvent"] = null;
        } catch (e) {
          await GeneralJs.ajaxJson({ message: "ClientEvaluationJs.addressEvent : " + e.message }, BACKHOST + "/errorLog");
        }
      }
      window.addEventListener("message", GeneralJs.stacks["addressEvent"]);

      homeliaisonAnalytics({
        page: instance.pageName,
        standard: instance.firstPageViewTime,
        action: "addressClick",
        data: {
          date: dateToString(new Date(), true),
        },
      }).catch((err) => {
        console.log(err);
      });

      cancelBack = createNode({
        mother: totalContents,
        class: [ removeTargets ],
        event: {
          click: (e) => {
            const targets = document.querySelectorAll('.' + removeTargets);
            for (let dom of targets) {
              dom.remove();
            }
            if (GeneralJs.stacks["addressEvent"] !== null && GeneralJs.stacks["addressEvent"] !== undefined) {
              window.removeEventListener("message", GeneralJs.stacks["addressEvent"]);
              GeneralJs.stacks["addressEvent"] = null;
            }
          }
        },
        style: {
          position: "fixed",
          top: String(0),
          left: String(0),
          zIndex: String(zIndex),
          width: String(100) + '%',
          height: String(100) + '%',
          background: "transparent",
        }
      });

      whitePrompt = createNode({
        mother: totalContents,
        class: [ removeTargets ],
        event: {
          click: (e) => { e.stopPropagation() }
        },
        style: {
          position: "fixed",
          left: "calc(50% - " + String(addressPromptWidth / 2) + ea + ")",
          top: "calc(50% - " + String(addressPromptHeight / 2) + ea + ")",
          width: String(addressPromptWidth) + ea,
          height: String(addressPromptHeight) + ea,
          zIndex: String(zIndex),
          background: colorChip.white,
          borderRadius: String(3) + "px",
          boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
          animation: "fadeuphard 0.3s ease forwards",
          overflow: "hidden",
        },
        children: [
          {
            mode: "iframe",
            attribute: [
              { src: FRONTHOST + "/engine/address.php" },
              { width: String(100) + '%' },
              { height: String(100) + '%' },
            ],
            style: {
              position: "absolute",
              top: String(0) + ea,
              left: String(0) + ea,
              border: String(0),
            }
          }
        ]
      });

    } catch (e) {
      console.log(e);
    }
  }

  addressBlurEvent = function (e) {
    const self = this;
    const mother = this.previousElementSibling;
    const targets = [ ...mother.children ];
    for (let dom of targets) {
      dom.remove();
    }
    if (this.value !== '') {
      homeliaisonAnalytics({
        page: instance.pageName,
        standard: instance.firstPageViewTime,
        action: "inputBlur",
        data: {
          property: "address1",
          value: this.value,
          date: dateToString(new Date(), true),
        },
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  addressFocusEvent = function (e) {
    const self = this;
    const mother = this.previousElementSibling;

    this.value = this.value.replace(/[\=\+\?\#\&]/gi, '');

    createNode({
      mode: "aside",
      mother,
      style: {
        position: "relative",
        top: String(0),
        left: String(0),
        width: String(100) + '%',
        height: String(100) + '%',
        textAlign: "center",
      },
      children: [
        {
          text: "주소는 인테리어를 받으실 곳으로 적어주세요!",
          style: {
            position: "absolute",
            width: String(greenNoticeWidth1) + ea,
            left: "calc(50% - " + String((greenNoticeWidth1 / 2) + greenNoticePaddingLeft) + ea + ")",
            background: colorExtended.gradientBlue,
            fontSize: String(greenNoticeSize) + ea,
            fontWeight: String(greenNoticeWeight),
            color: colorChip.white,
            paddingTop: String(greenNoticePaddingTop) + ea,
            paddingBottom: String(greenNoticePaddingBottom) + ea,
            paddingLeft: String(greenNoticePaddingLeft) + ea,
            paddingRight: String(greenNoticePaddingLeft) + ea,
            bottom: String(greenNoticeBottom) + ea,
            borderRadius: String(5) + "px",
            boxShadow: "0px 3px 13px -9px " + colorChip.shadow,
            animation: "fadeuplite 0.3s ease forwards",
            lineHeight: String(greenNoticeLineHeight),
          }
        }
      ]
    });

  }

  commentsFocusEvent = function (e) {
    const self = this;
    const mother = this.previousElementSibling;

    this.value = this.value.replace(/[\=\+\?\#\&]/gi, '');

    createNode({
      mode: "aside",
      mother,
      style: {
        position: "relative",
        top: String(0),
        left: String(0),
        width: String(100) + '%',
        height: String(100) + '%',
        textAlign: "center",
      },
      children: [
        {
          text: "(예시)\n=> 시공: 도배, 조명만 부분적으로 원해요.\n=> 스타일링: 가구, 패브릭, 소품 전체 구매\n=> 예산: 최대 00만원 이내로 하고 싶어요.",
          style: {
            position: "absolute",
            width: String(greenNoticeWidth3) + ea,
            left: "calc(50% - " + String((greenNoticeWidth3 / 2) + greenNoticePaddingLeft) + ea + ")",
            background: colorExtended.gradientBlue,
            fontSize: String(greenNoticeSize) + ea,
            fontWeight: String(greenNoticeWeight),
            color: colorChip.white,
            paddingTop: String(greenNoticePaddingTop) + ea,
            paddingBottom: String(greenNoticePaddingBottom) + ea,
            paddingLeft: String(greenNoticePaddingLeft) + ea,
            paddingRight: String(greenNoticePaddingLeft) + ea,
            bottom: String(greenNoticeBottom3) + ea,
            borderRadius: String(5) + "px",
            boxShadow: "0px 3px 13px -9px " + colorChip.shadow,
            animation: "fadeuplite 0.3s ease forwards",
            lineHeight: String(greenNoticeLineHeight),
            textAlign: "left",
          }
        }
      ]
    });

  }

  commentsBlurEvent = function (e) {
    const self = this;
    const mother = this.previousElementSibling;
    const targets = [ ...mother.children ];
    for (let dom of targets) {
      dom.remove();
    }
    this.value = this.value.replace(/[\=\+\?\#\&]/gi, '');
    if (this.value !== '') {
      homeliaisonAnalytics({
        page: instance.pageName,
        standard: instance.firstPageViewTime,
        action: "inputBlur",
        data: {
          property: "etc",
          value: this.value,
          date: dateToString(new Date(), true),
        },
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  pyeongNumberEvent = function (e) {
    this.value = this.value.replace(/[^0-9\.]/gi, '');
  }

  pyeongBlurEvent = function (e) {
    const self = this;
    const mother = this.previousElementSibling;
    const targets = [ ...mother.children ];
    for (let dom of targets) {
      dom.remove();
    }
    if (this.value.replace(/[^0-9\.]/gi, '').trim() === '') {
      this.value = "00평";
    } else {
      this.value = this.value.replace(/[^0-9\.]/gi, '') + "평";
    }
    if (this.value !== "00평" && this.value !== '') {
      homeliaisonAnalytics({
        page: instance.pageName,
        standard: instance.firstPageViewTime,
        action: "inputBlur",
        data: {
          property: "pyeong",
          value: this.value,
          date: dateToString(new Date(), true),
        },
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  pyeongFocusEvent = function (e) {
    const self = this;
    const mother = this.previousElementSibling;

    this.value = this.value.replace(/[^0-9\.]/gi, '');

    createNode({
      mode: "aside",
      mother,
      style: {
        position: "relative",
        top: String(0),
        left: String(0),
        width: String(100) + '%',
        height: String(100) + '%',
        textAlign: "center",
      },
      children: [
        {
          text: "평수는 반드시 분양 평수(공급 평수)로 적어주세요!",
          style: {
            position: "absolute",
            width: String(greenNoticeWidth0) + ea,
            left: "calc(50% - " + String((greenNoticeWidth0 / 2) + greenNoticePaddingLeft) + ea + ")",
            background: colorExtended.gradientBlue,
            fontSize: String(greenNoticeSize) + ea,
            fontWeight: String(greenNoticeWeight),
            color: colorChip.white,
            paddingTop: String(greenNoticePaddingTop) + ea,
            paddingBottom: String(greenNoticePaddingBottom) + ea,
            paddingLeft: String(greenNoticePaddingLeft) + ea,
            paddingRight: String(greenNoticePaddingLeft) + ea,
            bottom: String(greenNoticeBottom) + ea,
            borderRadius: String(5) + "px",
            boxShadow: "0px 3px 13px -9px " + colorChip.shadow,
            animation: "fadeuplite 0.3s ease forwards",
            lineHeight: String(greenNoticeLineHeight),
          }
        }
      ]
    });

  }

  livingDownEvent = function (id) {
    GeneralJs.stacks["currentLivingAlertId"] = null;
    if (document.getElementById(id) !== null) {
      document.getElementById(id).style.animation = "fadedownlite 0.3s ease forwards";
      setQueue(() => {
        if (document.getElementById(id) !== null) {
          document.getElementById(id).parentElement.removeChild(document.getElementById(id));
        }
      }, 301);
    }
  }

  livingAlertEvent = function (mother) {

    // const tempId = uniqueValue("hex");
    const moveinTarget = [ ...document.querySelectorAll("." + inputClassName) ].find((dom) => { return dom.getAttribute("property") === "movein" });
    // createNode({
    //   mode: "aside",
    //   mother,
    //   id: tempId,
    //   style: {
    //     position: "absolute",
    //     top: String(0),
    //     left: String(0),
    //     width: String(100) + '%',
    //     height: String(100) + '%',
    //     textAlign: "center",
    //   },
    //   children: [
    //     {
    //       text: "거주중일 시, 보관 이사가 없다면 도배와 필름 제외 시공이 어렵습니다!",
    //       style: {
    //         position: "absolute",
    //         width: String(greenNoticeWidth1) + ea,
    //         left: "calc(50% - " + String((greenNoticeWidth1 / 2) + (greenNoticePaddingLeft / 2)) + ea + ")",
    //         background: colorExtended.gradientBlue,
    //         fontSize: String(greenNoticeSize) + ea,
    //         fontWeight: String(greenNoticeWeight),
    //         color: colorChip.white,
    //         paddingTop: String(greenNoticePaddingTop) + ea,
    //         paddingBottom: String(greenNoticePaddingBottom) + ea,
    //         paddingLeft: String(greenNoticePaddingLeft) + ea,
    //         paddingRight: String(greenNoticePaddingLeft) + ea,
    //         bottom: String(greenNoticeBottom2) + ea,
    //         borderRadius: String(5) + "px",
    //         boxShadow: "0px 3px 13px -9px " + colorChip.shadow,
    //         animation: "fadeuplite 0.3s ease forwards",
    //         lineHeight: String(greenNoticeLineHeight),
    //       }
    //     }
    //   ]
    // });
    if (moveinTarget.value.trim() === '') {
      moveinTarget.value = dateToString(new Date());
    }
    // GeneralJs.stacks["currentLivingAlertId"] = tempId;
    // setQueue(() => {
    //   livingDownEvent(tempId);
    // }, 5 * 1000);

  }

  checkboxClickEvent0 = async function (e) {
    try {
      const property = this.getAttribute("property");
      const toggle = this.getAttribute("toggle");
      const targetsAll = [ ...document.querySelectorAll("." + inputClassName) ];
      const targets = targetsAll.filter((dom) => { return dom.getAttribute("property") === property });
      this.parentElement.setAttribute("click", "true");
      if (toggle === "off") {
        for (let dom of targets) {
          if (dom === this) {
            dom.setAttribute("toggle", "on");
            dom.children[0].style.opacity = String(0);
            dom.children[1].style.opacity = String(1);
            dom.children[2].style.color = colorExtended.mainBlue;
          } else {
            dom.setAttribute("toggle", "off");
            dom.children[0].style.opacity = String(1);
            dom.children[1].style.opacity = String(0);
            dom.children[2].style.color = colorChip.black;
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  calendarViewEvent = async function (e) {
    try {
      this.blur();
      const mother = this.previousElementSibling;
      const removeTargets = "removeTargets";
      const zIndex = 4;
      let cancelBack, whitePrompt;
      let calendar;

      cancelBack = createNode({
        mother,
        class: [ removeTargets ],
        event: {
          click: (e) => {
            const targets = document.querySelectorAll('.' + removeTargets);
            for (let dom of targets) {
              dom.remove();
            }
          }
        },
        style: {
          position: "fixed",
          top: String(0),
          left: String(0),
          zIndex: String(zIndex),
          width: String(100) + '%',
          height: String(100) + '%',
          background: "transparent",
        }
      });

      whitePrompt = createNode({
        mother,
        class: [ removeTargets ],
        style: {
          position: "relative",
          top: String(0),
          left: String(0),
          width: String(100) + '%',
          height: String(100) + '%',
        },
        children: [
          {
            style: {
              position: "absolute",
              left: "calc(50% - " + String(calendarWidth / 2) + ea + ")",
              top: String(calendarTop) + ea,
              width: String(calendarWidth) + ea,
              zIndex: String(zIndex),
              background: colorChip.white,
              borderRadius: String(3) + "px",
              boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
              animation: "fadeuphard 0.3s ease forwards",
              transition: "all 0s ease",
            },
          }
        ]
      }).firstChild;

      calendar = instance.mother.makeCalendar(stringToDate(new Date()), function (e) {
        let targets;
        findByAttribute(document.querySelectorAll('.' + inputClassName), "property", "movein").value = this.getAttribute("buttonValue");
        targets = document.querySelectorAll('.' + removeTargets);
        for (let dom of targets) {
          dom.remove();
        }
      }, { width: calendarWidth, mobile });
      whitePrompt.appendChild(calendar.calendarBase);

    } catch (e) {
      console.log(e);
    }
  }

  agreeToggleEvent = function () {
    const children = [ ...this.parentElement.children ];
    const [ words, circle ] = children;
    let toggle;

    for (let dom of children) {
      toggle = dom.getAttribute("toggle");
    }

    if (toggle === "on") {
      circle.style.background = colorChip.gray4;
      words.style.color = colorChip.deactive;
      circle.setAttribute("toggle", "off");
      words.setAttribute("toggle", "off");
    } else {
      circle.style.background = colorExtended.mainBlue;
      words.style.color = colorExtended.mainBlue;
      circle.setAttribute("toggle", "on");
      words.setAttribute("toggle", "on");
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

  if (mobile) {
    descriptionBox = createNode({
      mother: mainBlock,
      style: {
        display: "flex",
        position: "relative",
        width: String(100) + '%',
        marginTop: String(contentsAreaMarginTop) + ea,
        background: colorChip.white,
        borderRadius: String(5) + "px",
        boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
        paddingTop: String(7) + ea,
        paddingBottom: String(7) + ea,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }
    });

    createNode({
      mother: descriptionBox,
      mode: "svg",
      source: svgMaker.doubleQuote(colorExtended.mainBlue),
      style: {
        display: "block",
        position: "relative",
        height: String(quoteHeight) + ea,
        marginLeft: String(quoteLeft) + ea,
      }
    });
  
    createNode({
      mother: descriptionBox,
      text: contents.sub.join("\n"),
      style: {
        display: "block",
        position: "relative",
        fontSize: String(3.2) + ea,
        fontWeight: String(descriptionWeight),
        color: colorChip.black,
        lineHeight: String(1.6),
        marginTop: String(1.8) + ea,
        textAlign: "center",
      },
      bold: {
        fontWeight: String(descriptionBoldWeight),
        color: colorChip.black,
      }
    });
  }

  contentsArea = createNode({
    mother: mainBlock,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
      marginTop: String(desktop ?contentsAreaMarginTop : policyAreaMarginTop) + ea,
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
    source: svgMaker.doubleQuote(colorExtended.mainBlue),
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
  });

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
  
  // 1
  domList[0].dom = createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(blockMarginBottom) + ea,
      height: desktop ? String(moduleHeight * 3) + ea : "",
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
          background: colorExtended.mainBlue,
          top: String(circleTop) + ea,
          verticalAlign: "top",
        }
      },
      {
        text: "시공 정도",
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
          display: desktop ? "inline-flex" : "flex",
          position: desktop ? "absolute" : "relative",
          top: desktop ? String(barFactorTongVisualTop) + ea : "",
          left: desktop ? String(leftGrayType2) + ea : "",
          paddingLeft: desktop ? "" : String((circleRadius * 2) + circleBetween) + ea,
          width: desktop ? withOut(leftGrayType2, ea) : withOut((circleRadius * 2) + circleBetween, ea),
          paddingTop: desktop ? "" : String(mobileQuestionWordingPaddingTop) + ea,
          height: "auto",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "start",
        },
        children: [
          {
            text: [
              "실제로 진행한 <b%시공 정도는 어느 정도%b>이신가요?",
            ].join("\n"),
            style: {
              display: "block",
              position: "relative",
              fontSize: String(descriptionSize) + ea,
              fontWeight: String(descriptionWeight),
              lineHeight: String(barDescriptionLingHeight),
              color: colorChip.black,
              top: String(barDescriptionTextTop) + ea,
              paddingBottom: desktop ? "" : String(mobileQuestionWordingPaddingBottom) + ea,
            },
            bold: {
              fontSize: String(descriptionSize) + ea,
              fontWeight: String(descriptionBoldWeight),
              color: colorChip.black
            },
            under: {
              fontSize: String(barDescriptionSubSize) + ea,
              fontWeight: String(descriptionWeight),
              color: colorExtended.mainBlue
            },
          },
          {
            attribute: {
              click: "false",
            },
            style: {
              display: "block",
              position: "relative",
              width: withOut(0, ea),
              marginTop: String(selectionFactorTongMarginTop) + ea,
            },
            children: [
              {
                class: [ inputClassName ],
                attribute: {
                  toggle: "off",
                  property: "constructamount",
                },
                event: {
                  click: checkboxClickEvent0
                },
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(0),
                  height: String(100) + '%',
                  verticalAlign: "top",
                  cursor: "pointer",
                  width: String(desktop ? selectionFactorWidth : mobileSelectionFactorWidth0) + ea,
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
                    source: instance.mother.returnCheckBox(colorExtended.mainBlue),
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
                    text: "시공 없음",
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
              {
                class: [ inputClassName ],
                attribute: {
                  toggle: "off",
                  property: "constructamount",
                },
                event: {
                  click: checkboxClickEvent0
                },
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(0),
                  height: String(100) + '%',
                  verticalAlign: "top",
                  cursor: "pointer",
                  width: String(desktop ? selectionFactorWidth : mobileSelectionFactorWidth0) + ea,
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
                    source: instance.mother.returnCheckBox(colorExtended.mainBlue),
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
                    text: "부분 시공",
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
              {
                class: [ inputClassName ],
                attribute: {
                  toggle: "off",
                  property: "constructamount",
                },
                event: {
                  click: checkboxClickEvent0
                },
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(0),
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
                    source: instance.mother.returnCheckBox(colorExtended.mainBlue),
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
                    text: "전체 시공",
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
          },
        ]
      },
    ]
  });
  // margin
  createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(blockMarginBottom) + ea,
      height: String(moduleHeight * marginRatio * selectionFactorVisualMarginRatio) + ea,
    }
  });
  // 2
  domList[1].dom = createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(blockMarginBottom) + ea,
      height: desktop ? String(moduleHeight * 3) + ea : "",
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
          background: colorExtended.mainBlue,
          top: String(circleTop) + ea,
          verticalAlign: "top",
        }
      },
      {
        text: "시공 기간",
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
          display: desktop ? "inline-flex" : "flex",
          position: desktop ? "absolute" : "relative",
          top: desktop ? String(barFactorTongVisualTop) + ea : "",
          left: desktop ? String(leftGrayType2) + ea : "",
          paddingLeft: desktop ? "" : String((circleRadius * 2) + circleBetween) + ea,
          width: desktop ? withOut(leftGrayType2, ea) : withOut((circleRadius * 2) + circleBetween, ea),
          paddingTop: desktop ? "" : String(mobileQuestionWordingPaddingTop) + ea,
          height: "auto",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "start",
        },
        children: [
          {
            text: [
              "진행한 시공의 <b%소요 시간은 어느 정도%b>이셨나요?",
            ].join("\n"),
            style: {
              display: "block",
              position: "relative",
              fontSize: String(descriptionSize) + ea,
              fontWeight: String(descriptionWeight),
              lineHeight: String(barDescriptionLingHeight),
              color: colorChip.black,
              top: String(barDescriptionTextTop) + ea,
              paddingBottom: desktop ? "" : String(mobileQuestionWordingPaddingBottom) + ea,
            },
            bold: {
              fontSize: String(descriptionSize) + ea,
              fontWeight: String(descriptionBoldWeight),
              color: colorChip.black
            },
            under: {
              fontSize: String(barDescriptionSubSize) + ea,
              fontWeight: String(descriptionWeight),
              color: colorExtended.mainBlue
            },
          },
          {
            attribute: {
              click: "false",
            },
            style: {
              display: "block",
              position: "relative",
              width: withOut(0, ea),
              marginTop: String(selectionFactorTongMarginTop) + ea,
            },
            children: [
              {
                class: [ inputClassName ],
                attribute: {
                  toggle: "off",
                  property: "constructperiod",
                },
                event: {
                  click: checkboxClickEvent0
                },
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(0),
                  height: String(100) + '%',
                  verticalAlign: "top",
                  cursor: "pointer",
                  width: String(desktop ? selectionFactorWidth : mobileSelectionFactorWidth0) + ea,
                  marginBottom: desktop ? "" : String(mobileSelectionFactorMarginBottom) + ea,
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
                    source: instance.mother.returnCheckBox(colorExtended.mainBlue),
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
                    text: "시공 없음",
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
              {
                class: [ inputClassName ],
                attribute: {
                  toggle: "off",
                  property: "constructperiod",
                },
                event: {
                  click: checkboxClickEvent0
                },
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(0),
                  height: String(100) + '%',
                  verticalAlign: "top",
                  cursor: "pointer",
                  width: String(desktop ? selectionFactorWidth : mobileSelectionFactorWidth0) + ea,
                  marginBottom: desktop ? "" : String(mobileSelectionFactorMarginBottom) + ea,
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
                    source: instance.mother.returnCheckBox(colorExtended.mainBlue),
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
                    text: "2주 이하",
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
              {
                class: [ inputClassName ],
                attribute: {
                  toggle: "off",
                  property: "constructperiod",
                },
                event: {
                  click: checkboxClickEvent0
                },
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(0),
                  height: String(100) + '%',
                  verticalAlign: "top",
                  cursor: "pointer",
                  width: String(desktop ? selectionFactorWidth : mobileSelectionFactorWidth0) + ea,
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
                    source: instance.mother.returnCheckBox(colorExtended.mainBlue),
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
                    text: "2주 ~ 3주",
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
              {
                class: [ inputClassName ],
                attribute: {
                  toggle: "off",
                  property: "constructperiod",
                },
                event: {
                  click: checkboxClickEvent0
                },
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(0),
                  height: String(100) + '%',
                  verticalAlign: "top",
                  cursor: "pointer",
                  width: String(desktop ? selectionFactorWidth : mobileSelectionFactorWidth0) + ea,
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
                    source: instance.mother.returnCheckBox(colorExtended.mainBlue),
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
                    text: "3주 ~ 4주",
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
              {
                class: [ inputClassName ],
                attribute: {
                  toggle: "off",
                  property: "constructperiod",
                },
                event: {
                  click: checkboxClickEvent0
                },
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(0),
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
                    source: instance.mother.returnCheckBox(colorExtended.mainBlue),
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
                    text: "4주 이상",
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
          },
        ]
      },
    ]
  });
  // margin
  createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(blockMarginBottom) + ea,
      height: String(moduleHeight * marginRatio * selectionFactorVisualMarginRatio) + ea,
    }
  });
  // 3
  domList[2].dom = createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(blockMarginBottom) + ea,
      height: String(desktop ? moduleHeight * 3 : mobileModuleBlockHeight) + ea,
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
          background: colorExtended.mainBlue,
          top: String(circleTop) + ea,
          verticalAlign: "top",
        }
      },
      {
        text: "전체 비용",
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
          display: "inline-flex",
          position: "absolute",
          top: String(barFactorTongVisualTop) + ea,
          left: String(leftGrayType2) + ea,
          width: withOut(leftGrayType2, ea),
          height: "auto",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "start",
        },
        children: [
          {
            text: [
              desktop ? "인테리어에 사용한 <b%전체 비용은 어느 정도%b>이신가요?" : "인테리어에 <b%어느 정도의 비용을%b> 쓰셨나요?",
              desktop ? "<u%* 스타일링, 시공을 모두 포함하는 비용 / 가전 비용은 제외%u>" : "<u%* 스타일링, 시공 모두 포함 비용 / 가전 제외%u>"
            ].join("\n"),
            style: {
              display: "block",
              position: "relative",
              fontSize: String(descriptionSize) + ea,
              fontWeight: String(descriptionWeight),
              lineHeight: String(barDescriptionLingHeight),
              color: colorChip.black,
              top: String(barDescriptionTextTop) + ea,
            },
            bold: {
              fontSize: String(descriptionSize) + ea,
              fontWeight: String(descriptionBoldWeight),
              color: colorChip.black
            },
            under: {
              fontSize: String(barDescriptionSubSize) + ea,
              fontWeight: String(descriptionWeight),
              color: colorExtended.mainBlue
            },
          },
          {
            mode: "aside",
            class: [ inputClassName ],
            attribute: {
              ratio: String(defaultRatio),
              value: budgetValues[Math.round((budgetValues.length - 1) * defaultRatio)].value,
              property: "totalamount",
              click: "false",
            },
            event: {
              click: barClickEvent(budgetValues),
            },
            style: {
              display: "block",
              position: "relative",
              height: String(barTongHeight) + ea,
              cursor: "pointer",
              width: desktop ? withOut(0, ea) : withOut(-1 * leftGrayType2, ea),
              marginTop: String(barTongMarginTop) + ea,
              left: mobile ? String(-1 * leftGrayType2) + ea : "",
            },
            children: [
              {
                style: {
                  position: "absolute",
                  top: String(barTop) + ea,
                  height: String(barHeight) + ea,
                  borderRadius: String(barHeight + 1) + ea,
                  background: colorChip.gray3,
                  width: withOut(0, ea),
                  left: String(0) + ea,
                }
              },
              {
                text: budgetValues[0].title,
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(barDescriptionSubSize) + ea,
                  fontWeight: String(barFactorWeight),
                  color: colorChip.black,
                  top: String(barFactorTop) + ea,
                }
              },
              {
                text: budgetValues[2].title,
                style: {
                  position: "absolute",
                  fontSize: String(barDescriptionSubSize) + ea,
                  fontWeight: String(barFactorWeight),
                  color: colorChip.black,
                  top: String(barFactorTop) + ea,
                  left: String(barFactorA0Left) + ea,
                }
              },
              {
                text: budgetValues[4].title,
                style: {
                  position: "absolute",
                  fontSize: String(barDescriptionSubSize) + ea,
                  fontWeight: String(700),
                  color: colorChip.black,
                  top: String(barFactorTop) + ea,
                  left: String(barFactorA1Left) + ea,
                }
              },
              {
                text: budgetValues[6].title,
                style: {
                  position: "absolute",
                  fontSize: String(barDescriptionSubSize) + ea,
                  fontWeight: String(barFactorWeight),
                  color: colorChip.black,
                  top: String(barFactorTop) + ea,
                  left: String(barFactorA2Left) + ea,
                }
              },
              {
                text: budgetValues[8].title,
                style: {
                  position: "absolute",
                  fontSize: String(barDescriptionSubSize) + ea,
                  fontWeight: String(barFactorWeight),
                  color: colorChip.black,
                  top: String(barFactorTop) + ea,
                  right: String(0) + ea,
                }
              },
              {
                class: [ variableBarClassName ],
                style: {
                  position: "absolute",
                  left: String(0) + ea,
                  top: String(0) + ea,
                  width: String(defaultRatio * 100) + '%',
                  height: String(100) + '%',
                  transition: "all 0.3s ease",
                },
                children: [
                  {
                    style: {
                      position: "absolute",
                      top: String(barTop) + ea,
                      height: String(barHeight) + ea,
                      borderRadius: String(barHeight + 1) + ea,
                      background: colorChip.black,
                      width: withOut(0, ea),
                      left: String(0) + ea,
                    }
                  },
                  {
                    style: {
                      position: "absolute",
                      top: String(barCircleTop) + ea,
                      right: String(-1 * barCircleRadius) + ea,
                      width: String(barCircleRadius * 2) + ea,
                      height: String(barCircleRadius * 2) + ea,
                      borderRadius: String(barCircleRadius + 1) + ea,
                      background: colorChip.white,
                      border: "1px solid " + colorChip.gray4,
                      cursor: "pointer",
                    }
                  }
                ]
              }
            ]
          },
        ]
      },
    ]
  });
  domList[2].type = "bar";
  // margin
  createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(blockMarginBottom) + ea,
      height: String(desktop ? moduleHeight * marginRatio * barFactorVisualMarginRatio : moduleHeight * marginRatio * selectionFactorVisualMarginRatio) + ea,
    }
  });
  // 4
  domList[3].dom = createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(blockMarginBottom) + ea,
      height: String(moduleHeight * 3) + ea,
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
          background: colorExtended.mainBlue,
          top: String(circleTop) + ea,
          verticalAlign: "top",
        }
      },
      {
        text: "스타일링",
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
          display: "inline-flex",
          position: "absolute",
          top: String(barFactorTongVisualTop) + ea,
          left: String(leftGrayType2) + ea,
          width: withOut(leftGrayType2, ea),
          height: "auto",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "start",
        },
        children: [
          {
            text: [
              desktop ? "<b%스타일링에만 사용한 비용%b>은 어느 정도이신가요?" : "스타일링에만 <b%어느 정도의 비용을%b> 쓰셨나요?",
              desktop ? "<u%* 가구, 소품과 같은 스타일링(퍼니싱)에만 사용하신 비용%u>" : "<u%* 가구, 소품과 같은 스타일링에만 사용하신 비용%u>"
            ].join("\n"),
            style: {
              display: "block",
              position: "relative",
              fontSize: String(descriptionSize) + ea,
              fontWeight: String(descriptionWeight),
              lineHeight: String(barDescriptionLingHeight),
              color: colorChip.black,
              top: String(barDescriptionTextTop) + ea,
            },
            bold: {
              fontSize: String(descriptionSize) + ea,
              fontWeight: String(descriptionBoldWeight),
              color: colorChip.black
            },
            under: {
              fontSize: String(barDescriptionSubSize) + ea,
              fontWeight: String(descriptionWeight),
              color: colorExtended.mainBlue
            },
          },
          {
            mode: "aside",
            class: [ inputClassName ],
            attribute: {
              ratio: String(defaultRatio),
              value: budgetValues[Math.round((budgetValues.length - 1) * defaultRatio)].value,
              property: "stylingamount",
              click: "false",
            },
            event: {
              click: barClickEvent(budgetValues),
            },
            style: {
              display: "block",
              position: "relative",
              height: String(barTongHeight) + ea,
              cursor: "pointer",
              width: desktop ? withOut(0, ea) : withOut(-1 * leftGrayType2, ea),
              marginTop: String(barTongMarginTop) + ea,
              left: mobile ? String(-1 * leftGrayType2) + ea : "",
            },
            children: [
              {
                style: {
                  position: "absolute",
                  top: String(barTop) + ea,
                  height: String(barHeight) + ea,
                  borderRadius: String(barHeight + 1) + ea,
                  background: colorChip.gray3,
                  width: withOut(0, ea),
                  left: String(0) + ea,
                }
              },
              {
                text: budgetValues[0].title,
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(barDescriptionSubSize) + ea,
                  fontWeight: String(barFactorWeight),
                  color: colorChip.black,
                  top: String(barFactorTop) + ea,
                }
              },
              {
                text: budgetValues[2].title,
                style: {
                  position: "absolute",
                  fontSize: String(barDescriptionSubSize) + ea,
                  fontWeight: String(barFactorWeight),
                  color: colorChip.black,
                  top: String(barFactorTop) + ea,
                  left: String(barFactorA0Left) + ea,
                }
              },
              {
                text: budgetValues[4].title,
                style: {
                  position: "absolute",
                  fontSize: String(barDescriptionSubSize) + ea,
                  fontWeight: String(700),
                  color: colorChip.black,
                  top: String(barFactorTop) + ea,
                  left: String(barFactorA1Left) + ea,
                }
              },
              {
                text: budgetValues[6].title,
                style: {
                  position: "absolute",
                  fontSize: String(barDescriptionSubSize) + ea,
                  fontWeight: String(barFactorWeight),
                  color: colorChip.black,
                  top: String(barFactorTop) + ea,
                  left: String(barFactorA2Left) + ea,
                }
              },
              {
                text: budgetValues[8].title,
                style: {
                  position: "absolute",
                  fontSize: String(barDescriptionSubSize) + ea,
                  fontWeight: String(barFactorWeight),
                  color: colorChip.black,
                  top: String(barFactorTop) + ea,
                  right: String(0) + ea,
                }
              },
              {
                class: [ variableBarClassName ],
                style: {
                  position: "absolute",
                  left: String(0) + ea,
                  top: String(0) + ea,
                  width: String(defaultRatio * 100) + '%',
                  height: String(100) + '%',
                  transition: "all 0.3s ease",
                },
                children: [
                  {
                    style: {
                      position: "absolute",
                      top: String(barTop) + ea,
                      height: String(barHeight) + ea,
                      borderRadius: String(barHeight + 1) + ea,
                      background: colorChip.black,
                      width: withOut(0, ea),
                      left: String(0) + ea,
                    }
                  },
                  {
                    style: {
                      position: "absolute",
                      top: String(barCircleTop) + ea,
                      right: String(-1 * barCircleRadius) + ea,
                      width: String(barCircleRadius * 2) + ea,
                      height: String(barCircleRadius * 2) + ea,
                      borderRadius: String(barCircleRadius + 1) + ea,
                      background: colorChip.white,
                      border: "1px solid " + colorChip.gray4,
                      cursor: "pointer",
                    }
                  }
                ]
              }
            ]
          },
        ]
      },
    ]
  });
  domList[3].type = "bar";
  // margin
  createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(blockMarginBottom) + ea,
      height: String(desktop ? moduleHeight * marginRatio * barFactorVisualMarginRatio : moduleHeight * marginRatio * selectionFactorVisualMarginRatio) + ea,
    }
  });
  // 5
  domList[4].dom = createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(blockMarginBottom) + ea,
      height: String(moduleHeight * 3) + ea,
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
          background: colorExtended.mainBlue,
          top: String(circleTop) + ea,
          verticalAlign: "top",
        }
      },
      {
        text: "가구",
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
          display: "inline-flex",
          position: "absolute",
          top: String(barFactorTongVisualTop) + ea,
          left: String(leftGrayType2) + ea,
          width: withOut(leftGrayType2, ea),
          height: "auto",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "start",
        },
        children: [
          {
            text: [
              "가구의 <b%재사용과 구매의 비율을 알려주세요!%b>",
              desktop ? "<u%* 재배치 = 기존 가구를 재사용 / 구매 = 새로운 가구를 구매%u>" : "<u%* 재배치 = 기존 가구 재사용 / 구매 = 새로 구매%u>",
            ].join("\n"),
            style: {
              display: "block",
              position: "relative",
              fontSize: String(descriptionSize) + ea,
              fontWeight: String(descriptionWeight),
              lineHeight: String(barDescriptionLingHeight),
              color: colorChip.black,
              top: String(barDescriptionTextTop) + ea,
            },
            bold: {
              fontSize: String(descriptionSize) + ea,
              fontWeight: String(descriptionBoldWeight),
              color: colorChip.black
            },
            under: {
              fontSize: String(barDescriptionSubSize) + ea,
              fontWeight: String(descriptionWeight),
              color: colorExtended.mainBlue
            },
          },
          {
            mode: "aside",
            class: [ inputClassName ],
            attribute: {
              ratio: String(defaultRatio),
              value: furnitureValues[Math.round((furnitureValues.length - 1) * defaultRatio)].value,
              property: "furniture",
              click: "false",
            },
            event: {
              click: barClickEvent(furnitureValues),
            },
            style: {
              display: "block",
              position: "relative",
              height: String(barTongHeight) + ea,
              cursor: "pointer",
              width: desktop ? withOut(0, ea) : withOut(-1 * leftGrayType2, ea),
              marginTop: String(barTongMarginTop) + ea,
              left: mobile ? String(-1 * leftGrayType2) + ea : "",
            },
            children: [
              {
                style: {
                  position: "absolute",
                  top: String(barTop) + ea,
                  height: String(barHeight) + ea,
                  borderRadius: String(barHeight + 1) + ea,
                  background: colorChip.gray3,
                  width: withOut(0, ea),
                  left: String(0) + ea,
                }
              },
              {
                text: furnitureValues[0].title,
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(barDescriptionSubSize) + ea,
                  fontWeight: String(barFactorWeight),
                  color: colorChip.black,
                  top: String(barFactorTop) + ea,
                }
              },
              {
                text: furnitureValues[1].title,
                style: {
                  position: "absolute",
                  fontSize: String(barDescriptionSubSize) + ea,
                  fontWeight: String(barFactorWeight),
                  color: colorChip.black,
                  top: String(barFactorTop) + ea,
                  left: String(barFactorB0Left) + ea,
                }
              },
              {
                text: furnitureValues[2].title,
                style: {
                  position: "absolute",
                  fontSize: String(barDescriptionSubSize) + ea,
                  fontWeight: String(barFactorWeight),
                  color: colorChip.black,
                  top: String(barFactorTop) + ea,
                  right: String(0) + ea,
                }
              },
              {
                class: [ variableBarClassName ],
                style: {
                  position: "absolute",
                  left: String(0) + ea,
                  top: String(0) + ea,
                  width: String(defaultRatio * 100) + '%',
                  height: String(100) + '%',
                  transition: "all 0.3s ease",
                },
                children: [
                  {
                    style: {
                      position: "absolute",
                      top: String(barTop) + ea,
                      height: String(barHeight) + ea,
                      borderRadius: String(barHeight + 1) + ea,
                      background: colorExtended.gradientBlue,
                      width: withOut(0, ea),
                      left: String(0) + ea,
                    }
                  },
                  {
                    style: {
                      position: "absolute",
                      top: String(barCircleTop) + ea,
                      right: String(-1 * barCircleRadius) + ea,
                      width: String(barCircleRadius * 2) + ea,
                      height: String(barCircleRadius * 2) + ea,
                      borderRadius: String(barCircleRadius + 1) + ea,
                      background: colorChip.white,
                      border: "1px solid " + colorChip.gray4,
                      cursor: "pointer",
                    }
                  }
                ]
              }
            ]
          },
        ]
      },
    ]
  });
  domList[4].type = "bar";

  // bar up margin
  createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      height: String(moduleHeight * marginRatio * grayBarUpDownMarginRatio) + ea,
    }
  });
  // gray bar
  createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      width: withOut(0, ea),
      borderBottom: "1px dashed " + colorChip.gray3,
    }
  });
  // bar down margin
  createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(blockMarginBottom) + ea,
      height: String(moduleHeight * marginRatio * grayBarUpDownMarginRatio) + ea,
    }
  });

  // 6
  domList[5].dom = createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(blockMarginBottom) + ea,
      height: desktop ? String(moduleHeight * 3) + ea : "",
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
          background: colorExtended.mainBlue,
          top: String(circleTop) + ea,
          verticalAlign: "top",
        }
      },
      {
        text: "제품 제안",
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
          display: desktop ? "inline-flex" : "flex",
          position: desktop ? "absolute" : "relative",
          top: desktop ? String(barFactorTongVisualTop) + ea : "",
          left: desktop ? String(leftGrayType2) + ea : "",
          paddingLeft: desktop ? "" : String((circleRadius * 2) + circleBetween) + ea,
          width: desktop ? withOut(leftGrayType2, ea) : withOut((circleRadius * 2) + circleBetween, ea),
          paddingTop: desktop ? "" : String(mobileQuestionWordingPaddingTop) + ea,
          height: "auto",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "start",
        },
        children: [
          {
            text: [
              desktop ? "디자이너가 제안한 <b%제품 리스트에 대한 만족도%b>는 어느 정도이신가요?" : "제안받은 <b%제품 리스트에 대한 만족도%b>는 어느 정도이신가요?",
            ].join("\n"),
            style: {
              display: "block",
              position: "relative",
              fontSize: String(descriptionSize) + ea,
              fontWeight: String(descriptionWeight),
              lineHeight: String(barDescriptionLingHeight),
              color: colorChip.black,
              top: String(barDescriptionTextTop) + ea,
              paddingBottom: desktop ? "" : String(mobileQuestionWordingPaddingBottom) + ea,
            },
            bold: {
              fontSize: String(descriptionSize) + ea,
              fontWeight: String(descriptionBoldWeight),
              color: colorChip.black
            },
            under: {
              fontSize: String(barDescriptionSubSize) + ea,
              fontWeight: String(descriptionWeight),
              color: colorExtended.mainBlue
            },
          },
          {
            attribute: {
              click: "false",
            },
            style: {
              display: "block",
              position: "relative",
              width: withOut(0, ea),
              marginTop: String(selectionFactorTongMarginTop) + ea,
            },
            children: [
              {
                class: [ inputClassName ],
                attribute: {
                  toggle: "off",
                  property: "productlist",
                },
                event: {
                  click: checkboxClickEvent0
                },
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(0),
                  height: String(100) + '%',
                  verticalAlign: "top",
                  cursor: "pointer",
                  width: String(desktop ? selectionFactorWidth : mobileSelectionFactorWidth0) + ea,
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
                    source: instance.mother.returnCheckBox(colorExtended.mainBlue),
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
                    text: "불만족",
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
              {
                class: [ inputClassName ],
                attribute: {
                  toggle: "off",
                  property: "productlist",
                },
                event: {
                  click: checkboxClickEvent0
                },
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(0),
                  height: String(100) + '%',
                  verticalAlign: "top",
                  cursor: "pointer",
                  width: String(desktop ? selectionFactorWidth : mobileSelectionFactorWidth0) + ea,
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
                    source: instance.mother.returnCheckBox(colorExtended.mainBlue),
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
                    text: "보통",
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
              {
                class: [ inputClassName ],
                attribute: {
                  toggle: "off",
                  property: "productlist",
                },
                event: {
                  click: checkboxClickEvent0
                },
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(0),
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
                    source: instance.mother.returnCheckBox(colorExtended.mainBlue),
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
                    text: "만족",
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
          },
        ]
      },
    ]
  });
  // margin
  createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(blockMarginBottom) + ea,
      height: String(moduleHeight * marginRatio * selectionFactorVisualMarginRatio) + ea,
    }
  });
  // 7
  domList[6].dom = createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(blockMarginBottom) + ea,
      height: desktop ? String(moduleHeight * 3) + ea : "",
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
          background: colorExtended.mainBlue,
          top: String(circleTop) + ea,
          verticalAlign: "top",
        }
      },
      {
        text: "세팅 기간",
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
          display: desktop ? "inline-flex" : "flex",
          position: desktop ? "absolute" : "relative",
          top: desktop ? String(barFactorTongVisualTop) + ea : "",
          left: desktop ? String(leftGrayType2) + ea : "",
          paddingLeft: desktop ? "" : String((circleRadius * 2) + circleBetween) + ea,
          width: desktop ? withOut(leftGrayType2, ea) : withOut((circleRadius * 2) + circleBetween, ea),
          paddingTop: desktop ? "" : String(mobileQuestionWordingPaddingTop) + ea,
          height: "auto",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "start",
        },
        children: [
          {
            text: [
              desktop ? "제품을 구입하고 <b%배송부터 세팅까지 하는데 어느 정도의 시간%b>이 걸리셨나요?" : "제품 <b%구입부터 세팅까지 하는데 어느 정도의 시간%b>이 걸리셨나요?",
            ].join("\n"),
            style: {
              display: "block",
              position: "relative",
              fontSize: String(descriptionSize) + ea,
              fontWeight: String(descriptionWeight),
              lineHeight: String(barDescriptionLingHeight),
              color: colorChip.black,
              top: String(barDescriptionTextTop) + ea,
              paddingBottom: desktop ? "" : String(mobileQuestionWordingPaddingBottom) + ea,
            },
            bold: {
              fontSize: String(descriptionSize) + ea,
              fontWeight: String(descriptionBoldWeight),
              color: colorChip.black
            },
            under: {
              fontSize: String(barDescriptionSubSize) + ea,
              fontWeight: String(descriptionWeight),
              color: colorExtended.mainBlue
            },
          },
          {
            attribute: {
              click: "false",
            },
            style: {
              display: "block",
              position: "relative",
              width: withOut(0, ea),
              marginTop: String(selectionFactorTongMarginTop) + ea,
            },
            children: [
              {
                class: [ inputClassName ],
                attribute: {
                  toggle: "off",
                  property: "settingperiod",
                },
                event: {
                  click: checkboxClickEvent0
                },
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(0),
                  height: String(100) + '%',
                  verticalAlign: "top",
                  cursor: "pointer",
                  width: String(desktop ? selectionFactorWidth : mobileSelectionFactorWidth0) + ea,
                  marginBottom: desktop ? "" : String(mobileSelectionFactorMarginBottom) + ea,
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
                    source: instance.mother.returnCheckBox(colorExtended.mainBlue),
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
                    text: "구매 없음",
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
              {
                class: [ inputClassName ],
                attribute: {
                  toggle: "off",
                  property: "settingperiod",
                },
                event: {
                  click: checkboxClickEvent0
                },
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(0),
                  height: String(100) + '%',
                  verticalAlign: "top",
                  cursor: "pointer",
                  width: String(desktop ? selectionFactorWidth : mobileSelectionFactorWidth0) + ea,
                  marginBottom: desktop ? "" : String(mobileSelectionFactorMarginBottom) + ea,
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
                    source: instance.mother.returnCheckBox(colorExtended.mainBlue),
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
                    text: "2주 이하",
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
              {
                class: [ inputClassName ],
                attribute: {
                  toggle: "off",
                  property: "settingperiod",
                },
                event: {
                  click: checkboxClickEvent0
                },
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(0),
                  height: String(100) + '%',
                  verticalAlign: "top",
                  cursor: "pointer",
                  width: String(desktop ? selectionFactorWidth : mobileSelectionFactorWidth0) + ea,
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
                    source: instance.mother.returnCheckBox(colorExtended.mainBlue),
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
                    text: "2주 ~ 3주",
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
              {
                class: [ inputClassName ],
                attribute: {
                  toggle: "off",
                  property: "settingperiod",
                },
                event: {
                  click: checkboxClickEvent0
                },
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(0),
                  height: String(100) + '%',
                  verticalAlign: "top",
                  cursor: "pointer",
                  width: String(desktop ? selectionFactorWidth : mobileSelectionFactorWidth0) + ea,
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
                    source: instance.mother.returnCheckBox(colorExtended.mainBlue),
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
                    text: "3주 ~ 4주",
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
              {
                class: [ inputClassName ],
                attribute: {
                  toggle: "off",
                  property: "settingperiod",
                },
                event: {
                  click: checkboxClickEvent0
                },
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(0),
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
                    source: instance.mother.returnCheckBox(colorExtended.mainBlue),
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
                    text: "4주 이상",
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
          },
        ]
      },
    ]
  });
  // margin
  createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(blockMarginBottom) + ea,
      height: String(moduleHeight * marginRatio * selectionFactorVisualMarginRatio) + ea,
    }
  });
  // 8
  domList[7].dom = createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(blockMarginBottom) + ea,
      height: String(moduleHeight * 3) + ea,
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
          background: colorExtended.mainBlue,
          top: String(circleTop) + ea,
          verticalAlign: "top",
        }
      },
      {
        text: "구입 정도",
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
          display: "inline-flex",
          position: "absolute",
          top: String(barFactorTongVisualTop) + ea,
          left: String(leftGrayType2) + ea,
          width: withOut(leftGrayType2, ea),
          height: "auto",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "start",
        },
        children: [
          {
            text: [
              desktop ? "디자이너가 제안한 제품을 구입하신 정도와 그렇지 않은 정도를 알려주세요!" : "제안받은 제품을 구입하신 정도를 알려주세요!",
              desktop ? "<u%* 제품 리스트 그대로 구입하셨는지, 아니면 자체적으로 찾아 구입하셨는지%u>" : "<u%* 제품 리스트 그대로 구입 VS 자체적으로 찾아 구입%u>",
            ].join("\n"),
            style: {
              display: "block",
              position: "relative",
              fontSize: String(descriptionSize) + ea,
              fontWeight: String(descriptionWeight),
              lineHeight: String(barDescriptionLingHeight),
              color: colorChip.black,
              top: String(barDescriptionTextTop) + ea,
            },
            bold: {
              fontSize: String(descriptionSize) + ea,
              fontWeight: String(descriptionBoldWeight),
              color: colorChip.black
            },
            under: {
              fontSize: String(barDescriptionSubSize) + ea,
              fontWeight: String(descriptionWeight),
              color: colorExtended.mainBlue
            },
          },
          {
            mode: "aside",
            class: [ inputClassName ],
            attribute: {
              ratio: String(defaultRatio),
              value: furnitureValues[Math.round((furnitureValues.length - 1) * defaultRatio)].value,
              property: "compliance_ratio",
              click: "false",
            },
            event: {
              click: barClickEvent(furnitureValues),
            },
            style: {
              display: "block",
              position: "relative",
              height: String(barTongHeight) + ea,
              cursor: "pointer",
              width: desktop ? withOut(0, ea) : withOut(-1 * leftGrayType2, ea),
              marginTop: String(barTongMarginTop) + ea,
              left: mobile ? String(-1 * leftGrayType2) + ea : "",
            },
            children: [
              {
                style: {
                  position: "absolute",
                  top: String(barTop) + ea,
                  height: String(barHeight) + ea,
                  borderRadius: String(barHeight + 1) + ea,
                  background: colorChip.gray3,
                  width: withOut(0, ea),
                  left: String(0) + ea,
                }
              },
              {
                text: "스스로 다시 찾아서 구매",
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(barDescriptionSubSize) + ea,
                  fontWeight: String(barFactorWeight),
                  color: colorChip.black,
                  top: String(barFactorTop) + ea,
                }
              },
              {
                text: "",
                style: {
                  position: "absolute",
                  fontSize: String(barDescriptionSubSize) + ea,
                  fontWeight: String(barFactorWeight),
                  color: colorChip.black,
                  top: String(barFactorTop) + ea,
                  left: String(barFactorB0Left) + ea,
                }
              },
              {
                text: "제안한 그대로 구매",
                style: {
                  position: "absolute",
                  fontSize: String(barDescriptionSubSize) + ea,
                  fontWeight: String(barFactorWeight),
                  color: colorChip.black,
                  top: String(barFactorTop) + ea,
                  right: String(0) + ea,
                }
              },
              {
                class: [ variableBarClassName ],
                style: {
                  position: "absolute",
                  left: String(0) + ea,
                  top: String(0) + ea,
                  width: String(defaultRatio * 100) + '%',
                  height: String(100) + '%',
                  transition: "all 0.3s ease",
                },
                children: [
                  {
                    style: {
                      position: "absolute",
                      top: String(barTop) + ea,
                      height: String(barHeight) + ea,
                      borderRadius: String(barHeight + 1) + ea,
                      background: colorExtended.gradientBlue,
                      width: withOut(0, ea),
                      left: String(0) + ea,
                    }
                  },
                  {
                    style: {
                      position: "absolute",
                      top: String(barCircleTop) + ea,
                      right: String(-1 * barCircleRadius) + ea,
                      width: String(barCircleRadius * 2) + ea,
                      height: String(barCircleRadius * 2) + ea,
                      borderRadius: String(barCircleRadius + 1) + ea,
                      background: colorChip.white,
                      border: "1px solid " + colorChip.gray4,
                      cursor: "pointer",
                    }
                  }
                ]
              }
            ]
          },
        ]
      },
    ]
  });
  domList[7].type = "bar";

  // bar up margin
  createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      height: String(moduleHeight * marginRatio * grayBarUpDownMarginRatio) + ea,
    }
  });
  // gray bar
  createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      width: withOut(0, ea),
      borderBottom: "1px dashed " + colorChip.gray3,
    }
  });
  // bar down margin
  createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(blockMarginBottom) + ea,
      height: String(moduleHeight * marginRatio * grayBarUpDownMarginRatio) + ea,
    }
  });

  // 9
  domList[8].dom = createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(blockMarginBottom) + ea,
      height: desktop ? String(moduleHeight * 3) + ea : "",
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
          background: colorExtended.mainBlue,
          top: String(circleTop) + ea,
          verticalAlign: "top",
        }
      },
      {
        text: "디자인",
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
          display: desktop ? "inline-flex" : "flex",
          position: desktop ? "absolute" : "relative",
          top: desktop ? String(barFactorTongVisualTop) + ea : "",
          left: desktop ? String(leftGrayType2) + ea : "",
          paddingLeft: desktop ? "" : String((circleRadius * 2) + circleBetween) + ea,
          width: desktop ? withOut(leftGrayType2, ea) : withOut((circleRadius * 2) + circleBetween, ea),
          paddingTop: desktop ? "" : String(mobileQuestionWordingPaddingTop) + ea,
          height: "auto",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "start",
        },
        children: [
          {
            text: [
              "인테리어 <b%디자인에 대한 만족도%b>는 어느 정도이신가요?",
            ].join("\n"),
            style: {
              display: "block",
              position: "relative",
              fontSize: String(descriptionSize) + ea,
              fontWeight: String(descriptionWeight),
              lineHeight: String(barDescriptionLingHeight),
              color: colorChip.black,
              top: String(barDescriptionTextTop) + ea,
              paddingBottom: desktop ? "" : String(mobileQuestionWordingPaddingBottom) + ea,
            },
            bold: {
              fontSize: String(descriptionSize) + ea,
              fontWeight: String(descriptionBoldWeight),
              color: colorChip.black
            },
            under: {
              fontSize: String(barDescriptionSubSize) + ea,
              fontWeight: String(descriptionWeight),
              color: colorExtended.mainBlue
            },
          },
          {
            attribute: {
              click: "false",
            },
            style: {
              display: "block",
              position: "relative",
              width: withOut(0, ea),
              marginTop: String(selectionFactorTongMarginTop) + ea,
            },
            children: [
              {
                class: [ inputClassName ],
                attribute: {
                  toggle: "off",
                  property: "designsatisfaction",
                },
                event: {
                  click: checkboxClickEvent0
                },
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(0),
                  height: String(100) + '%',
                  verticalAlign: "top",
                  cursor: "pointer",
                  width: String(desktop ? selectionFactorWidth : mobileSelectionFactorWidth0) + ea,
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
                    source: instance.mother.returnCheckBox(colorExtended.mainBlue),
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
                    text: "불만족",
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
              {
                class: [ inputClassName ],
                attribute: {
                  toggle: "on",
                  property: "designsatisfaction",
                },
                event: {
                  click: checkboxClickEvent0
                },
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(0),
                  height: String(100) + '%',
                  verticalAlign: "top",
                  cursor: "pointer",
                  width: String(desktop ? selectionFactorWidth : mobileSelectionFactorWidth0) + ea,
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
                    source: instance.mother.returnCheckBox(colorExtended.mainBlue),
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
                    text: "보통",
                    style: {
                      display: "inline-block",
                      position: "relative",
                      marginLeft: String(checkboxBetween) + ea,
                      top: String(mainTop) + ea,
                      fontSize: String(mainSize) + ea,
                      fontWeight: String(checkboxWeight),
                      color: colorExtended.mainBlue,
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
                  property: "designsatisfaction",
                },
                event: {
                  click: checkboxClickEvent0
                },
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(0),
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
                    source: instance.mother.returnCheckBox(colorExtended.mainBlue),
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
                    text: "만족",
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
          },
        ]
      },
    ]
  });
  // margin
  createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(blockMarginBottom) + ea,
      height: String(moduleHeight * marginRatio * selectionFactorVisualMarginRatio) + ea,
    }
  });
  // 10
  domList[9].dom = createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(blockMarginBottom) + ea,
      height: desktop ? String(moduleHeight * 3) + ea : "",
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
          background: colorExtended.mainBlue,
          top: String(circleTop) + ea,
          verticalAlign: "top",
        }
      },
      {
        text: "피드백",
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
          display: desktop ? "inline-flex" : "flex",
          position: desktop ? "absolute" : "relative",
          top: desktop ? String(barFactorTongVisualTop) + ea : "",
          left: desktop ? String(leftGrayType2) + ea : "",
          paddingLeft: desktop ? "" : String((circleRadius * 2) + circleBetween) + ea,
          width: desktop ? withOut(leftGrayType2, ea) : withOut((circleRadius * 2) + circleBetween, ea),
          paddingTop: desktop ? "" : String(mobileQuestionWordingPaddingTop) + ea,
          height: "auto",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "start",
        },
        children: [
          {
            text: [
              desktop ? "디자이너는 고객님 요청과 수정에 대해 <b%적절한 피드백을 제공%b>하였나요?" : "디자이너는 요청과 수정에 대해 <b%피드백을 잘 제공%b>하였나요?",
            ].join("\n"),
            style: {
              display: "block",
              position: "relative",
              fontSize: String(descriptionSize) + ea,
              fontWeight: String(descriptionWeight),
              lineHeight: String(barDescriptionLingHeight),
              color: colorChip.black,
              top: String(barDescriptionTextTop) + ea,
              paddingBottom: desktop ? "" : String(mobileQuestionWordingPaddingBottom) + ea,
            },
            bold: {
              fontSize: String(descriptionSize) + ea,
              fontWeight: String(descriptionBoldWeight),
              color: colorChip.black
            },
            under: {
              fontSize: String(barDescriptionSubSize) + ea,
              fontWeight: String(descriptionWeight),
              color: colorExtended.mainBlue
            },
          },
          {
            attribute: {
              click: "false",
            },
            style: {
              display: "block",
              position: "relative",
              width: withOut(0, ea),
              marginTop: String(selectionFactorTongMarginTop) + ea,
            },
            children: [
              {
                class: [ inputClassName ],
                attribute: {
                  toggle: "off",
                  property: "feedbacksatisfaction",
                },
                event: {
                  click: checkboxClickEvent0
                },
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(0),
                  height: String(100) + '%',
                  verticalAlign: "top",
                  cursor: "pointer",
                  width: String(desktop ? selectionFactorWidth : mobileSelectionFactorWidth0) + ea,
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
                    source: instance.mother.returnCheckBox(colorExtended.mainBlue),
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
                    text: "불만족",
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
              {
                class: [ inputClassName ],
                attribute: {
                  toggle: "on",
                  property: "feedbacksatisfaction",
                },
                event: {
                  click: checkboxClickEvent0
                },
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(0),
                  height: String(100) + '%',
                  verticalAlign: "top",
                  cursor: "pointer",
                  width: String(desktop ? selectionFactorWidth : mobileSelectionFactorWidth0) + ea,
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
                    source: instance.mother.returnCheckBox(colorExtended.mainBlue),
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
                    text: "보통",
                    style: {
                      display: "inline-block",
                      position: "relative",
                      marginLeft: String(checkboxBetween) + ea,
                      top: String(mainTop) + ea,
                      fontSize: String(mainSize) + ea,
                      fontWeight: String(checkboxWeight),
                      color: colorExtended.mainBlue,
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
                  property: "feedbacksatisfaction",
                },
                event: {
                  click: checkboxClickEvent0
                },
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(0),
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
                    source: instance.mother.returnCheckBox(colorExtended.mainBlue),
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
                    text: "만족",
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
          },
        ]
      },
    ]
  });
  // margin
  createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(blockMarginBottom) + ea,
      height: String(moduleHeight * marginRatio * selectionFactorVisualMarginRatio) + ea,
    }
  });
  // 11
  domList[10].dom = createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(blockMarginBottom) + ea,
      height: desktop ? String(moduleHeight * 3) + ea : "",
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
          background: colorExtended.mainBlue,
          top: String(circleTop) + ea,
          verticalAlign: "top",
        }
      },
      {
        text: "운영",
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
          display: desktop ? "inline-flex" : "flex",
          position: desktop ? "absolute" : "relative",
          top: desktop ? String(barFactorTongVisualTop) + ea : "",
          left: desktop ? String(leftGrayType2) + ea : "",
          paddingLeft: desktop ? "" : String((circleRadius * 2) + circleBetween) + ea,
          width: desktop ? withOut(leftGrayType2, ea) : withOut((circleRadius * 2) + circleBetween, ea),
          paddingTop: desktop ? "" : String(mobileQuestionWordingPaddingTop) + ea,
          height: "auto",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "start",
        },
        children: [
          {
            text: [
              desktop ? "디자이너의 <b%일정 운영과 예산 운영%b>에 대한 만족도는 어느 정도이신가요?" : "디자이너의 <b%일정과 예산 운영%b>에 대한 만족도를 알려주세요!",
            ].join("\n"),
            style: {
              display: "block",
              position: "relative",
              fontSize: String(descriptionSize) + ea,
              fontWeight: String(descriptionWeight),
              lineHeight: String(barDescriptionLingHeight),
              color: colorChip.black,
              top: String(barDescriptionTextTop) + ea,
              paddingBottom: desktop ? "" : String(mobileQuestionWordingPaddingBottom) + ea,
            },
            bold: {
              fontSize: String(descriptionSize) + ea,
              fontWeight: String(descriptionBoldWeight),
              color: colorChip.black
            },
            under: {
              fontSize: String(barDescriptionSubSize) + ea,
              fontWeight: String(descriptionWeight),
              color: colorExtended.mainBlue
            },
          },
          {
            attribute: {
              click: "false",
            },
            style: {
              display: "block",
              position: "relative",
              width: withOut(0, ea),
              marginTop: String(selectionFactorTongMarginTop) + ea,
            },
            children: [
              {
                class: [ inputClassName ],
                attribute: {
                  toggle: "off",
                  property: "operationsatisfaction",
                },
                event: {
                  click: checkboxClickEvent0
                },
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(0),
                  height: String(100) + '%',
                  verticalAlign: "top",
                  cursor: "pointer",
                  width: String(desktop ? selectionFactorWidth : mobileSelectionFactorWidth0) + ea,
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
                    source: instance.mother.returnCheckBox(colorExtended.mainBlue),
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
                    text: "불만족",
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
              {
                class: [ inputClassName ],
                attribute: {
                  toggle: "on",
                  property: "operationsatisfaction",
                },
                event: {
                  click: checkboxClickEvent0
                },
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(0),
                  height: String(100) + '%',
                  verticalAlign: "top",
                  cursor: "pointer",
                  width: String(desktop ? selectionFactorWidth : mobileSelectionFactorWidth0) + ea,
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
                    source: instance.mother.returnCheckBox(colorExtended.mainBlue),
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
                    text: "보통",
                    style: {
                      display: "inline-block",
                      position: "relative",
                      marginLeft: String(checkboxBetween) + ea,
                      top: String(mainTop) + ea,
                      fontSize: String(mainSize) + ea,
                      fontWeight: String(checkboxWeight),
                      color: colorExtended.mainBlue,
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
                  property: "operationsatisfaction",
                },
                event: {
                  click: checkboxClickEvent0
                },
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(0),
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
                    source: instance.mother.returnCheckBox(colorExtended.mainBlue),
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
                    text: "만족",
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
          },
        ]
      },
    ]
  });

  this.domList = domList;

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
    attribute: {
      toggle: "on",
    },
    style: {
      display: "flex",
      position: "relative",
      flexDirection: "row-reverse",
      marginLeft: String(innerPadding) + ea,
      width: withOut(innerPadding * 2, ea),
      marginTop: String(agreeTongMarginTop) + ea,
      cursor: "pointer",
    },
    children: [
      {
        class: [ agreeTargetClassName ],
        attribute: {
          toggle: "on",
        },
        event: {
          click: agreeToggleEvent
        },
        text: "상기 개인정보 취급 방침에 동의합니다.",
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(agreeSize) + ea,
          fontWeight: String(agreeWeight),
          color: colorExtended.mainBlue,
          lineHeight: String(agreeLineHeight),
          cursor: "pointer",
        }
      },
      {
        class: [ agreeTargetClassName ],
        attribute: {
          toggle: "on",
        },
        event: {
          click: agreeToggleEvent
        },
        style: {
          display: "inline-block",
          position: "relative",
          width: String(agreeCircleRadius) + ea,
          height: String(agreeCircleRadius) + ea,
          borderRadius: String(agreeCircleRadius) + ea,
          background: colorExtended.mainBlue,
          top: String(agreeCircleTop) + ea,
          marginRight: String(agreeCircleMarginRight) + ea,
          cursor: "pointer",
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
        class: [ "submitButtonClassName" ],
        event: {
          click: instance.finalSubmit()
        },
        style: {
          display: "inline-flex",
          width: String(submitButtonWidth) + ea,
          height: String(submitButtonHeight) + ea,
          background: colorExtended.gradientBlue,
          borderRadius: String(5) + "px",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          cursor: "pointer",
        },
        children: [
          {
            text: !instance.evaluationRows.exist ? "평가 제출하기" : (instance.contentsRawInfo.raw.link !== "" ? "사진 다운로드" : "평가 제출하기"),
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(submitSize) + ea,
              fontWeight: String(800),
              color: colorChip.white,
              lineHeight: String(submitLineHeight),
              top: String(submitTextTop) + ea,
            }
          }
        ]
      }
    ]
  });

  ajaxJson({}, BACKHOST + "/designerProposal_policy").then(function (res) {
    const { policy } = res;
    let bTags;
    policyTong.insertAdjacentHTML("beforeend", policy);
    bTags = policyTong.querySelectorAll("b");
    for (let b of bTags) {
      b.style.color = colorChip.black;
      b.style.fontWeight = String(600);
    }
  }).catch(function (err) {
    console.log(err);
  });

}

ClientEvaluationJs.prototype.finalSubmit = function () {
  const instance = this;
  const { ea, media, contentsRawInfo: { raw } } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const inputClassName = "inputClassName";
  const agreeTargetClassName = "agreeTargetClassName";
  const { ajaxJson, colorChip, colorExtended, findByAttribute, scrollTo, dateToString, sleep, selfHref, homeliaisonAnalytics, setQueue, downloadFile } = GeneralJs;
  return async function (e) {
    try {
      const property = "property";
      const targets = [ ...document.querySelectorAll('.' + inputClassName) ];
      const valueDictionary = {
        constructamount: "시공 정도",
        constructperiod: "시공 기간",
        totalamount: "전체 비용 정도",
        stylingamount: "스타일링 비용 정도",
        furniture: "가구 구매 정도",
        productlist: "제품 제안",
        settingperiod: "세팅 기간",
        compliance_ratio: "구입 정도",
        designsatisfaction: "디자인 만족도",
        feedbacksatisfaction: "피드백 만족도",
        operationsatisfaction: "운영 만족도",
      };
      let properties;
      let map;
      let tempObj;
      let nodeName;
      let firstDom;
      let visualSpecific;
      let name, phone;
      let tempTargets;
      let onValue;
      let boo;
      let thisName;

      if (document.querySelector('.' + agreeTargetClassName).getAttribute("toggle") === "off") {
        window.alert("개인정보 취급 방침에 동의해주세요!");
      } else {

        visualSpecific = 150;

        properties = [];
        for (let dom of targets) {
          properties.push(dom.getAttribute(property));
        }
        properties = [ ...new Set(properties) ];

        map = [];
        boo = true;
        for (let p of properties) {
          tempObj = {};
          tempObj.property = p;

          firstDom = findByAttribute(targets, property, p);
          nodeName = firstDom.nodeName;
          if (/INPUT/gi.test(nodeName) || /TEXTAREA/gi.test(nodeName)) {
            try {
              tempObj.value = firstDom.value.replace(/[\=\+\&\>\<\/\\\{\}\[\]\`]/gi, '');
            } catch (e) {
              window.alert(e.message);
              boo = false;
              scrollTo(window, firstDom, visualSpecific);
              firstDom.previousElementSibling.style.border = "1px solid " + colorExtended.mainBlue;
              if (typeof firstDom.focus === "function") {
                firstDom.focus();
              }
              break;
            }
          } else if (/DIV/gi.test(nodeName)) {
            try {
              tempTargets = [];
              for (let dom of targets) {
                if (dom.getAttribute(property) === p) {
                  tempTargets.push(dom);
                }
              }
  
              onValue = '';
              for (let dom of tempTargets) {
                if (dom.getAttribute("toggle") === "on") {
                  onValue = dom.textContent.trim();
                  break;
                }
              }
              if (onValue === '') {
                throw new Error(valueDictionary[p] !== undefined ? valueDictionary[p] + " 선택란을 체크해주세요!" : "선택하지 않은 체크란을 모두 선택해주세요!");
              }
              tempObj.value = onValue;
            } catch (e) {
              window.alert(e.message);
              boo = false;
              scrollTo(window, firstDom, visualSpecific);
              break;
            }
          } else if (/ASIDE/gi.test(nodeName)) {
            try {
              if (firstDom.getAttribute("click") !== "true") {
                throw new Error(valueDictionary[p] !== undefined ? valueDictionary[p] + " 바를 선택해주세요!" : "선택하지 않은 바를 모두 선택해주세요!");
              }
              if (/_ratio$/gi.test(p)) {
                tempObj.value = Number(firstDom.getAttribute("ratio"));
              } else {
                tempObj.value = firstDom.getAttribute("value");
              }
            } catch (e) {
              window.alert(e.message);
              boo = false;
              scrollTo(window, firstDom, visualSpecific);
              break;
            }
          }

          map.push(tempObj)
        }

        if (typeof instance.clientSessionId === "string") {
          map.push({
            property: "sessionId",
            value: instance.clientSessionId,
          });
        } else {
          if (typeof window.homeliaisonSessionId === "string") {
            map.push({
              property: "sessionId",
              value: window.homeliaisonSessionId,
            });
          } else {
            window.location.href = FRONTHOST + "/sessionClear.php";
          }
        }

        if (boo) {
          instance.mother.certificationBox(instance.client.name, instance.client.phone, async function (back, box) {
            try {
              await ajaxJson({ cliid: instance.project.cliid, proid: instance.project.proid, desid: instance.project.desid, map }, S3HOST + ":3000/evaluationSubmit");
              document.body.removeChild(box);
              document.body.removeChild(back);  
              if (raw.exist && instance.contentsRawInfo.raw.link !== "") {
                const loading = instance.mother.whiteProgressLoading();
                instance.mother.greenAlert("다운로드를 진행합니다!").catch((err) => { console.log(err); });
                await downloadFile(raw.link, null, loading.progress.firstChild);
                loading.remove();
                setTimeout(() => {
                  window.alert("평가가 완료되었습니다! 감사합니다 :)");
                  selfHref(FRONTHOST);
                }, 3000);
              } else {
                window.alert("평가가 완료되었습니다! 감사합니다 :)");
                selfHref(FRONTHOST);
              }
            } catch (e) {
              window.alert("오류가 발생하였습니다! 다시 시도해주세요!");
              await ajaxJson({ message: "front clientEvaluation.certificationBox : " + e.message }, BACKHOST + "/errorLog");
              window.location.reload();
            }
          });
        }

      }

    } catch (e) {
      console.log(e);
      window.location.reload();
    }
  }
}

ClientEvaluationJs.prototype.preselectionEvaluation = function (data) {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, ajaxJson, equalJson } = GeneralJs;
  const { ea, media, standardWidth, domList } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const inputClassName = "inputClassName";
  let num;
  let target;
  let targets;
  let targetIndex;
  let clickEvent;
  let rectBox;
  let ratio;
  if (data !== undefined && data !== null && domList.length > 0) {
    num = 0;
    for (let { dom, type } of domList) {
      if (num === 0) {
        targets = [ ...dom.querySelectorAll("." + inputClassName) ];
        targets[data.construct.level].click();
      } else if (num === 1) {
        targets = [ ...dom.querySelectorAll("." + inputClassName) ];
        if (data.construct.period < 14) {
          targetIndex = 0;
        } else if (data.construct.period === 14) {
          targetIndex = 1;
        } else if (data.construct.period < 21) {
          targetIndex = 2;
        } else if (data.construct.period < 28) {
          targetIndex = 3;
        } else {
          targetIndex = 4;
        }
        targets[targetIndex].click();
      } else if (num === 2) {
        target = dom.querySelector("aside");
        rectBox = target.getBoundingClientRect();
        clickEvent = new Event("click", { bubbles: true });
        if (data.spend.total <= 10000000) {
          clickEvent.x = rectBox.x;
        } else if (data.spend.total === 20000000) {
          clickEvent.x = ((rectBox.width / 8) * 1) + rectBox.x;
        } else if (data.spend.total === 30000000) {
          clickEvent.x = ((rectBox.width / 8) * 2) + rectBox.x;
        } else if (data.spend.total === 40000000) {
          clickEvent.x = ((rectBox.width / 8) * 3) + rectBox.x;
        } else if (data.spend.total === 50000000) {
          clickEvent.x = ((rectBox.width / 8) * 4) + rectBox.x;
        } else if (data.spend.total === 60000000) {
          clickEvent.x = ((rectBox.width / 8) * 5) + rectBox.x;
        } else if (data.spend.total === 70000000) {
          clickEvent.x = ((rectBox.width / 8) * 6) + rectBox.x;
        } else if (data.spend.total === 80000000) {
          clickEvent.x = ((rectBox.width / 8) * 7) + rectBox.x;
        } else if (data.spend.total > 80000000) {
          clickEvent.x = rectBox.width + rectBox.x;
        }
        target.dispatchEvent(clickEvent);
      } else if (num === 3) {
        target = dom.querySelector("aside");
        rectBox = target.getBoundingClientRect();
        clickEvent = new Event("click", { bubbles: true });
        if (data.spend.styling <= 10000000) {
          clickEvent.x = rectBox.x;
        } else if (data.spend.styling === 20000000) {
          clickEvent.x = ((rectBox.width / 8) * 1) + rectBox.x;
        } else if (data.spend.styling === 30000000) {
          clickEvent.x = ((rectBox.width / 8) * 2) + rectBox.x;
        } else if (data.spend.styling === 40000000) {
          clickEvent.x = ((rectBox.width / 8) * 3) + rectBox.x;
        } else if (data.spend.styling === 50000000) {
          clickEvent.x = ((rectBox.width / 8) * 4) + rectBox.x;
        } else if (data.spend.styling === 60000000) {
          clickEvent.x = ((rectBox.width / 8) * 5) + rectBox.x;
        } else if (data.spend.styling === 70000000) {
          clickEvent.x = ((rectBox.width / 8) * 6) + rectBox.x;
        } else if (data.spend.styling === 80000000) {
          clickEvent.x = ((rectBox.width / 8) * 7) + rectBox.x;
        } else if (data.spend.styling > 80000000) {
          clickEvent.x = rectBox.width + rectBox.x;
        }
        target.dispatchEvent(clickEvent);
      } else if (num === 4) {
        target = dom.querySelector("aside");
        rectBox = target.getBoundingClientRect();
        clickEvent = new Event("click", { bubbles: true });
        if (data.purchase.furniture === 0) {
          clickEvent.x = rectBox.x;
        } else if (data.purchase.furniture === 1) {
          clickEvent.x = ((rectBox.width / 2) * 1) + rectBox.x;
        } else if (data.purchase.furniture === 2) {
          clickEvent.x = ((rectBox.width / 2) * 2) + rectBox.x;
        }
        target.dispatchEvent(clickEvent);
      } else if (num === 5) {
        targets = [ ...dom.querySelectorAll("." + inputClassName) ];
        targets[data.purchase.list].click();
      } else if (num === 6) {
        targets = [ ...dom.querySelectorAll("." + inputClassName) ];
        if (data.purchase.period < 14) {
          targetIndex = 0;
        } else if (data.purchase.period === 14) {
          targetIndex = 1;
        } else if (data.purchase.period < 21) {
          targetIndex = 2;
        } else if (data.purchase.period < 28) {
          targetIndex = 3;
        } else {
          targetIndex = 4;
        }
        targets[targetIndex].click();
      } else if (num === 7) {
        target = dom.querySelector("aside");
        rectBox = target.getBoundingClientRect();
        clickEvent = new Event("click", { bubbles: true });
        clickEvent.x = (rectBox.width * data.purchase.compliance) + rectBox.x;
        target.dispatchEvent(clickEvent);
      } else if (num === 8) {
        targets = [ ...dom.querySelectorAll("." + inputClassName) ];
        targets[data.satisfaction.design].click();
      } else if (num === 9) {
        targets = [ ...dom.querySelectorAll("." + inputClassName) ];
        targets[data.satisfaction.feedback].click();
      } else if (num === 10) {
        targets = [ ...dom.querySelectorAll("." + inputClassName) ];
        targets[data.satisfaction.operation].click();
      }
      num++;
    }
  }
}

ClientEvaluationJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    this.mother.setGeneralProperties(this);

    const { returnGet, colorExtended, ajaxJson } = GeneralJs;
    const getObj = returnGet();
    let proid, projects, project;
    let evaluationRows;
    let cliid, clients, client;

    if (getObj.proid === undefined) {
      window.alert("잘못된 접근입니다! 2");
      window.location.href = this.frontPage;
      throw new Error("page ban");
    }

    proid = getObj.proid;
    projects = await ajaxJson({ whereQuery: { proid } }, SECONDHOST + "/getProjects", { equal: true });
    if (projects.length === 0) {
      window.alert("잘못된 접근입니다! 3");
      window.location.href = this.frontPage;
      throw new Error("page ban");
    }
    [ project ] = projects;
    if (!/^d/.test(project.desid)) {
      window.alert("잘못된 접근입니다! 4");
      window.location.href = this.frontPage;
      throw new Error("page ban");
    }
    this.project = project;

    cliid = project.cliid;
    clients = await ajaxJson({ whereQuery: { cliid } }, SECONDHOST + "/getClients", { equal: true });
    if (clients.length === 0) {
      window.alert("잘못된 접근입니다! 5");
      window.location.href = this.frontPage;
      throw new Error("page ban");
    }
    [ client ] = clients;
    this.client = client;

    evaluationRows = await ajaxJson({ proid: instance.project.proid }, S3HOST + ":3000/evaluationList", { equal: true });
    this.evaluationRows = evaluationRows;

    this.inputClassName = "consultingInput";
    this.contentsRawInfo = await ajaxJson({ mode: "search", proid }, SECONDHOST + "/rawImageParsing", { equal: true });

    this.domList = [];

    await this.mother.ghostClientLaunching({
      mode: "front",
      name: "clientEvaluation",
      client: null,
      base: {
        instance: this,
        binaryPath: ClientEvaluationJs.binaryPath,
        subTitle: "",
        secondBackground: false,
        backgroundType: 0,
      },
      local: async () => {
        try {
          instance.insertInitBox();
          instance.insertEvaluationBox();
          if (instance.evaluationRows.exist) {
            instance.preselectionEvaluation(instance.evaluationRows.data);
          }
        } catch (e) {
          await GeneralJs.ajaxJson({ message: "ClientEvaluationJs.launching.ghostClientLaunching : " + e.message }, BACKHOST + "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

  } catch (err) {
    console.log(err);
    await GeneralJs.ajaxJson({ message: "ClientEvaluationJs.launching 에러 일어남 => " + err.message }, BACKHOST + "/errorLog");
  }
}