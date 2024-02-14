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
      "return ('홈리에종 디자이너 신청 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('홈리에종 디자이너 신청 설명 페이지 입니다! | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "aspirantSubmit",
  "hangul": "디자이너 신청",
  "route": [
    "aspirantSubmit"
  ]
} %/%/g

const AspirantSubmitJs = function () {
  this.mother = new GeneralJs();
}

AspirantSubmitJs.binaryPath = FRONTHOST + "/middle/aspirant";

AspirantSubmitJs.prototype.insertInitBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics } = GeneralJs;
  const { ea, media, portfolioMode } = this;
  const generalMode = !portfolioMode;
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

  if (generalMode) {
    titleWording = "디자이너 파트너십 신청";
    subTitleContents = "신청서를 남겨주시면, 확인 후 연락드립니다!";
  } else {
    titleWording = "추가 포트폴리오 전송";
    subTitleContents = "추가적으로 포트폴리오를 전송하실 수 있습니다!";  
  }

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

AspirantSubmitJs.prototype.insertAspirantBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, ajaxJson, equalJson, cleanChildren } = GeneralJs;
  const { ea, media, standardWidth, portfolioMode, normalMode, totalContents } = this;
  const generalMode = !portfolioMode;
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
  widthGrayType1 = <%% 455, 312, 245, 178, 58.1 %%>;
  widthGrayType2 = <%% 757, 588, 503, 383, 53.4 %%>;
  widthGrayType3 = <%% 392, 251, 193, 127, 45.6 %%>;

  addressWidth = <%% 54, 54, 46, 46, 11 %%>;
  addressSize = <%% 13, 13, 12, 12, 3 %%>;
  addressWeight = <%% 600, 600, 600, 600, 600 %%>;
  addressTop = <%% (isMac() ? 5 : 7), (isMac() ? 5 : 7), (isMac() ? 5 : 7), (isMac() ? 5 : 7), 1.2 %%>;

  leftCheck0 = <%% 125, 112, 98, 98, 22.8 %%>;
  leftCheck1 = <%% 195, 176, 156, 152, 36.5 %%>;
  checkboxWidth = <%% 9, 9, 9, 8, 2 %%>;
  checkboxTop = <%% (isMac() ? 9 : 10), (isMac() ? 10 : 10), (isMac() ? 9 : 9), (isMac() ? 9 : 9), (isIphone() ? 2.5 : 2.5) %%>;
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
  if (generalMode) {
    submitButtonWidth = <%% 180, 180, 160, 145, 36 %%>;
  } else {
    submitButtonWidth = <%% 200, 200, 170, 155, 39 %%>;
  }
  submitButtonHeight = <%% 47, 47, 42, 38, 10 %%>;
  submitSize = <%% 20, 20, 17, 16, 4 %%>;
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
  if (generalMode) {
    titleWidth = <%% 165, 165, 132, 114, 30 %%>;
  } else {
    titleWidth = <%% 90, 79, 69, 69, 30 %%>;
  }
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

  if (generalMode) {
    contents = {
      main: [
        "홈리에종 파트너십 신청",
      ],
      sub: [
        <&& "홈리에종의 파트너십 신청을 위해서는" | "홈리에종 파트너십 신청을 위해서는" | "파트너십 신청을 위해서는" | "파트너십 신청을 위해서는" | "홈리에종 파트너십 신청을 위해서는" &&>,
        <&& "다음과 같이 기본 정보가 필요합니다." | "다음 기본 정보가 필요합니다." | "기본 정보가 필요합니다." | "기본 정보가 필요합니다." | "다음 기본 정보가 필요합니다." &&>,
        <&& "파트너십 신청서를 간단히 작성 후," | "신청서를 간단히 작성 후," | "신청서를 간단히 작성 후," | "신청서를 간단히 작성 후," | "신청서를 간단히 작성 후," &&>,
        <&& "<b%디자이너 활동%b>을 시작해보세요!" | "<b%디자이너 활동%b>을 시작해보세요!" | "<b%디자이너 활동%b>을 시작해보세요!" | "<b%활동%b>을 시작해보세요!" | "<b%활동%b>을 시작해보세요!" &&>,
      ]
    };
  } else {
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
  }

  careerBlocksRender = () => {}
  plusValueCareer = () => {}
  plusBlockEvent = () => {}
  updateValueCareer = () => {}
  deleteValueCareer = () => {}

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
      this.setAttribute("ratio", String(ratio));
      this.setAttribute("value", valuesArr[Math.round((valuesArr.length - 1) * ratio)].value);
    }
  }

  phoneHypenEvent = function (e) {
    this.value = autoHypenPhone(this.value);
  }

  nameBlurEvent = function (e) {
    this.value = this.value.trim().replace(/[^a-zA-Z가-힣]/gi, '');
  }

  phoneBlurEvent = function (e) {
    this.value = this.value.trim().replace(/[^0-9\-]/gi, '');
  }

  emailBlurEvent = function () {
    this.value = this.value.replace(/[\=\+\?\#\&\(\)]/gi, '');
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
          await GeneralJs.ajaxJson({ message: "AspirantSubmitJs.addressEvent : " + e.message }, BACKHOST + "/errorLog");
        }
      }
      window.addEventListener("message", GeneralJs.stacks["addressEvent"]);

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
    this.value = this.value.replace(/[\=\+\?\#\&]/gi, '');
  }

  addressFocusEvent = function (e) {
    this.value = this.value.replace(/[\=\+\?\#\&]/gi, '');
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
            background: colorChip.gradientGreen,
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
  }

  checkboxClickEvent0 = async function (e) {
    try {
      const property = this.getAttribute("property");
      const toggle = this.getAttribute("toggle");
      const targetsAll = [ ...document.querySelectorAll("." + inputClassName) ];
      const targets = targetsAll.filter((dom) => { return dom.getAttribute("property") === property });
      if (toggle === "off") {
        for (let dom of targets) {
          if (dom === this) {
            dom.setAttribute("toggle", "on");
            dom.children[0].style.opacity = String(0);
            dom.children[1].style.opacity = String(1);
            dom.children[2].style.color = colorChip.green;
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
      circle.style.background = colorChip.green;
      words.style.color = colorChip.green;
      circle.setAttribute("toggle", "on");
      words.setAttribute("toggle", "on");
    }
  }

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

  greenBasicFocusEvent = function (e) {
    const motherBlock = this.parentElement.parentElement;
    const noticeTarget = motherBlock.querySelector('.' + noticeClassName);
    this.value = this.value.trim().replace(/[^a-zA-Z가-힣0-9\(\)-_\[\]\!\~\*\,\.\:\; ]/gi, '');
    if (noticeTarget !== null) {
      noticeTarget.style.color = colorChip.green;
    }
  }

  greenBasicBlurEvent = function (e) {
    const motherBlock = this.parentElement.parentElement;
    const noticeTarget = motherBlock.querySelector('.' + noticeClassName);
    this.value = this.value.trim().replace(/[^a-zA-Z가-힣0-9\(\)-_\[\]\!\~\*\,\.\:\; ]/gi, '');
    if (noticeTarget !== null) {
      noticeTarget.style.color = colorChip.deactive;
    }
  }

  greenNumberFocusEvent = function (e) {
    const motherBlock = this.parentElement.parentElement;
    const noticeTarget = motherBlock.querySelector('.' + noticeClassName);
    this.value = this.value.trim().replace(/[^0-9\-\.]/gi, '');
    if (noticeTarget !== null) {
      noticeTarget.style.color = colorChip.green;
    }
  }

  greenNumberBlurEvent = function (e) {
    const motherBlock = this.parentElement.parentElement;
    const noticeTarget = motherBlock.querySelector('.' + noticeClassName);
    this.value = this.value.trim().replace(/[^0-9\-\.]/gi, '');
    if (noticeTarget !== null) {
      noticeTarget.style.color = colorChip.deactive;
    }
  }

  greenDateFocusEvent = function (e) {
    const motherBlock = this.parentElement.parentElement;
    const noticeTarget = motherBlock.querySelector('.' + noticeClassName);
    this.value = this.value.trim().replace(/[^0-9\-\.]/gi, '');
    if (noticeTarget !== null) {
      noticeTarget.style.color = colorChip.green;
    }
  }

  greenDateBlurEvent = function (e) {
    const motherBlock = this.parentElement.parentElement;
    const noticeTarget = motherBlock.querySelector('.' + noticeClassName);
    this.value = this.value.trim().replace(/[^0-9\-\.]/gi, '');
    if (!/^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]$/.test(this.value)) {
      window.alert("'yyyy-mm-dd' 형태로 적어주세요!");
      this.value = dateToString(new Date());
    }
    if (noticeTarget !== null) {
      noticeTarget.style.color = colorChip.deactive;
    }
  }

  greenCareerFocusEvent = function (e) {
    const motherBlock = this.parentElement.parentElement;
    const noticeTarget = motherBlock.querySelector('.' + noticeClassName);
    this.value = this.value.trim().replace(/[^0-9년개월위와같음 ]/gi, '').trim();
    if (noticeTarget !== null) {
      noticeTarget.style.color = colorChip.green;
    }
  }

  greenCareerBlurEvent = function (e) {
    const motherBlock = this.parentElement.parentElement;
    const noticeTarget = motherBlock.querySelector('.' + noticeClassName);
    this.value = this.value.trim().replace(/[^0-9년개월위와같음 ]/gi, '').trim();
    if (!((/^[0-9]+년( [0-9]개월)?/.test(this.value.trim()) && !/[0-9개]$/.test(this.value.trim())) || this.value.trim() === "위와 같음" || /^[0-9]+개월$/.test(this.value.trim()))) {
      window.alert("'y년 m개월' 형태로 적어주세요!");
      this.value = "0년 0개월";
    }
    if (noticeTarget !== null) {
      noticeTarget.style.color = colorChip.deactive;
    }
  }

  greenLinkFocusEvent = function (e) {
    const motherBlock = this.parentElement.parentElement;
    const noticeTarget = motherBlock.querySelector('.' + noticeClassName);
    this.value = window.decodeURIComponent(this.value.trim().replace(/ /gi, '').trim());
    this.style.color = colorChip.black;
    if (noticeTarget !== null) {
      noticeTarget.style.color = colorChip.green;
    }
  }

  greenLinkBlurEvent = function (e) {
    const motherBlock = this.parentElement.parentElement;
    const noticeTarget = motherBlock.querySelector('.' + noticeClassName);
    this.value = window.encodeURIComponent(this.value.trim().replace(/ /gi, '').trim());
    if (!/^http/.test(this.value)) {
      window.alert("http로 시작하는 전체 링크를 복사 붙여넣기 해주세요!");
      this.value = "";
    } else {
      this.style.color = colorChip.gray4;
    }
    if (noticeTarget !== null) {
      noticeTarget.style.color = colorChip.deactive;
    }
  }

  textareaBlurEvent = function (e) {
    this.value = this.value.replace(/[\=\+\?\#\&]/gi, '');
  }

  careerBlocksRender = (tong, method = 0) => {
    const pipe = "&nbsp;&nbsp;<u%|%u>&nbsp;&nbsp;";
    let pureValue;
    let value;
    let targetDom;
    let title;
    let emptyValue;
    let endMatrix;
    let emptyBoo;

    cleanChildren(tong);

    value = [];
    if (method === 0) {
      title = [
        "회사",
        "담당 업무",
        "기간",
        "태그",
      ];
      emptyValue = [
        "회사명",
        "담당 업무 상세",
        "총 기간",
        "태그",
      ];

      targetDom = document.querySelector('.' + blockTargetClassName.career);
      pureValue = equalJson(targetDom.getAttribute("block"));
      endMatrix = pureValue.map((obj) => {
        const endDate = (obj.date.end.valueOf() > (new Date(3000, 0, 1)).valueOf()) ? new Date() : obj.date.end;
        const startDate = obj.date.start;
        const startWords = (String(obj.date.start.getFullYear()).slice(2) + "." + String(obj.date.start.getMonth() + 1));
        const endWords = (obj.date.end.valueOf() > (new Date(3000, 0, 1)).valueOf()) ? "재직중" : (String(obj.date.end.getFullYear()).slice(2) + "." + String(obj.date.end.getMonth() + 1));
        const delta = endDate.valueOf() - startDate.valueOf();
        const deltaDates = Math.round((((delta / 1000) / 60) / 60) / 24);
        const rangeWords = String(Math.floor(deltaDates / 365)) + "년 " + String(Math.floor((deltaDates % 365) / 30)) + "개월" + "&nbsp;&nbsp;(" + startWords + " ~ " + endWords + ")";
        return {
          title: equalJson(JSON.stringify(title)),
          value: [
            obj.company + pipe + obj.team,
            obj.role,
            rangeWords,
            obj.tag,
          ]
        };
      });

      for (let o of endMatrix) {
        value.push(o);
      }
      if (value.length === 0) {
        value.push({
          title: equalJson(JSON.stringify(title)),
          value: emptyValue,
        });
        emptyBoo = true;
      } else {
        emptyBoo = false;
      }

    } else if (method === 1) {
      title = [
        "학교",
        "전공",
        "졸업",
      ];
      emptyValue = [
        "학교명",
        "전공명",
        "총 기간",
      ];
      targetDom = document.querySelector('.' + blockTargetClassName.school);
      pureValue = equalJson(targetDom.getAttribute("block"));
      endMatrix = pureValue.map((obj) => {
        return {
          title: title,
          value: [
            obj.school,
            obj.major,
            ((obj.date.end.valueOf() > (new Date(3000, 0, 1)).valueOf()) ? "재학중" : dateToString(obj.date.end).split("-").slice(0, 2).join("년 ") + "월"),
          ]
        };
      });

      for (let o of endMatrix) {
        value.push(o);
      }
      if (value.length === 0) {
        value.push({
          title: equalJson(JSON.stringify(title)),
          value: emptyValue,
        });
        emptyBoo = true;
      } else {
        emptyBoo = false;
      }
    }

    createNode({
      mother: tong,
      attribute: { empty: emptyBoo ? "true" : "false" },
      style: {
        display: "block",
        position: "relative",
        padding: String(careerBlockGrayOuterMargin) + ea,
        width: withOut(careerBlockGrayOuterMargin * 2, ea),
        borderRadius: String(5) + "px",
        background: desktop ? colorChip.gray0 : colorChip.white,
      },
      children: value.map((obj, index) => {
        const { title, value: factorValue } = obj;
        const lastBoo = (index === value.length - 1);
        return {
          attribute: {
            index: String(index),
          },
          style: {
            display: "block",
            position: "relative",
            padding: String(careerBlockOuterMargin) + ea,
            paddingTop: String(careerBlockOuterMarginTop) + ea,
            paddingBottom: String(careerBlockOuterMarginBottom) + ea,
            width: withOut(careerBlockOuterMargin * 2, ea),
            borderRadius: String(5) + "px",
            marginBottom: !lastBoo ? String(careerBlockInnerMargin) + ea : "",
            background: desktop ? colorChip.white : colorChip.gray0,
            boxShadow: desktop ? "0px 2px 11px -9px " + colorChip.shadow : "",
          },
          children: factorValue.map((str, index) => {
            const lastBoo = (index === factorValue.length - 1);
            return {
              attribute: {
                method: String(method),
              },
              event: {
                click: async function (e) {
                  try {
                    const method = Number(this.getAttribute("method"));
                    const index = Number(this.parentElement.getAttribute("index"));
                    const emptyBoo = (this.parentElement.parentElement.getAttribute("empty") === "true");
                    let targetDom;
                    if (method === 0) {
                      targetDom = document.querySelector('.' + blockTargetClassName.career);
                    } else {
                      targetDom = document.querySelector('.' + blockTargetClassName.school);
                    }
                    const updateFunction = plusBlockEvent("update", index, method, targetDom, emptyBoo);
                    await updateFunction.call(this, e);
                  } catch (e) {
                    console.log(e);
                  }
                }
              },
              text: "<b%" + title[index] + " %b>:" + "&nbsp;&nbsp;&nbsp;" + str,
              style: {
                display: "block",
                position: "relative",
                fontSize: String(careerBlockSize) + ea,
                fontWeight: String(400),
                color: colorChip.black,
                marginBottom: !lastBoo ? String(careerBlockInnerMarginSmall) + ea : "",
              },
              bold: {
                fontSize: String(careerBlockSize) + ea,
                fontWeight: String(800),
                color: colorChip.black,
              },
              under: {
                fontSize: String(careerBlockSize) + ea,
                fontWeight: String(200),
                color: colorChip.green,
              }
            }
          }).concat([
            {
              mode: "svg",
              attribute: {
                index: String(index),
                method: String(method),
              },
              event: {
                click: async function (e) {
                  try {
                    const index = Number(this.getAttribute("index"));
                    const method = Number(this.getAttribute("method"));
                    let targetDom;
                    if (method === 0) {
                      targetDom = document.querySelector('.' + blockTargetClassName.career);
                    } else {
                      targetDom = document.querySelector('.' + blockTargetClassName.school);
                    }
                    await deleteValueCareer(targetDom, index, method);
                  } catch (e) {
                    console.log(e);
                  }
                }
              },
              source: instance.mother.returnCancelCircle(colorChip.gray4),
              style: {
                display: "inline-block",
                position: "absolute",
                width: String(blockCancelWidth) + ea,
                top: String(blockCancelTop) + ea,
                right: String(blockCancelTop) + ea,
                cursor: "pointer",
              }
            }
          ])
        }
      })
    });
  }

  plusValueCareer = async (matrix, tong, method = 0) => {
    try {
      if (method === 0) {
        const pipe = "&nbsp;&nbsp;<u%|%u>&nbsp;&nbsp;";
        const titleArr = [
          "회사",
          "담당 업무",
          "기간",
          "태그",
        ];
        const targetDom = document.querySelector('.' + blockTargetClassName.career);
        let company, team, role, start, end;
        let tag;
        let block;
        let original;
        let whereQuery, updateQuery;
        let endMatrix;
  
        company = matrix[0][1];
        team = matrix[1][1];
        role = matrix[2][1];
        tag = matrix[3][1];
        start = matrix[4][1];
        end = matrix[5][1];
  
        block = {
          company,
          team,
          role,
          tag,
          date: { start, end }
        };
  
        original = equalJson(targetDom.getAttribute("block"));
        original.push(block);
        original.sort((a, b) => { return b.date.start.valueOf() - a.date.start.valueOf() });

        targetDom.setAttribute("block", JSON.stringify(original));
        careerBlocksRender(tong, method);
      } else {
        const titleArr = [
          "학교",
          "전공",
          "졸업",
        ];
        const targetDom = document.querySelector('.' + blockTargetClassName.school);
        let school, major, start, end;
        let block;
        let original;
        let whereQuery, updateQuery;
        let endMatrix;

        school = matrix[0][1];
        major = matrix[1][1];
        start = matrix[2][1];
        end = matrix[3][1];

        block = {
          school,
          major,
          date: { start, end }
        };
  
        original = equalJson(targetDom.getAttribute("block"));
        original.push(block);
        original.sort((a, b) => { return b.date.start.valueOf() - a.date.start.valueOf() });
  
        targetDom.setAttribute("block", JSON.stringify(original));
        careerBlocksRender(tong, method);
      }
    } catch (e) {
      console.log(e);
    }
  }

  updateValueCareer = async (matrix, tong, index, method = 0) => {
    try {
      if (method === 0) {
        const pipe = "&nbsp;&nbsp;<u%|%u>&nbsp;&nbsp;";
        const titleArr = [
          "회사",
          "담당 업무",
          "기간",
          "태그",
        ];
        const targetDom = document.querySelector('.' + blockTargetClassName.career);
        let company, team, role, start, end;
        let tag;
        let block;
        let original;
        let whereQuery, updateQuery;
        let endMatrix;
  
        company = matrix[0][1];
        team = matrix[1][1];
        role = matrix[2][1];
        tag = matrix[3][1];
        start = matrix[4][1];
        end = matrix[5][1];
  
        block = {
          company,
          team,
          role,
          tag,
          date: { start, end }
        };
  
        original = equalJson(targetDom.getAttribute("block"));
        original.splice(index, 1);
        original.push(block);
        original.sort((a, b) => { return b.date.start.valueOf() - a.date.start.valueOf() });

        targetDom.setAttribute("block", JSON.stringify(original));
        careerBlocksRender(tong, method);
      } else {
        const titleArr = [
          "학교",
          "전공",
          "졸업",
        ];
        const targetDom = document.querySelector('.' + blockTargetClassName.school);
        let school, major, start, end;
        let block;
        let original;
        let whereQuery, updateQuery;
        let endMatrix;

        school = matrix[0][1];
        major = matrix[1][1];
        start = matrix[2][1];
        end = matrix[3][1];

        block = {
          school,
          major,
          date: { start, end }
        };
  
        original = equalJson(targetDom.getAttribute("block"));
        original.splice(index, 1);
        original.push(block);
        original.sort((a, b) => { return b.date.start.valueOf() - a.date.start.valueOf() });
  
        targetDom.setAttribute("block", JSON.stringify(original));
        careerBlocksRender(tong, method);
      }
    } catch (e) {
      console.log(e);
    }
  }

  deleteValueCareer = async (tong, index, method = 0) => {
    try {
      if (method === 0) {
        const targetDom = document.querySelector('.' + blockTargetClassName.career);
        let company, team, role, start, end;
        let tag;
        let block;
        let original;
        let whereQuery, updateQuery;
        let endMatrix;
  
        original = equalJson(targetDom.getAttribute("block"));
        original.splice(index, 1);
        original.sort((a, b) => { return b.date.start.valueOf() - a.date.start.valueOf() });
        targetDom.setAttribute("block", JSON.stringify(original));
        careerBlocksRender(tong, method);
      } else {
        const targetDom = document.querySelector('.' + blockTargetClassName.school);
        let school, major, start, end;
        let block;
        let original;
        let whereQuery, updateQuery;
        let endMatrix;
  
        original = equalJson(targetDom.getAttribute("block"));
        original.splice(index, 1);
        original.sort((a, b) => { return b.date.start.valueOf() - a.date.start.valueOf() });
        targetDom.setAttribute("block", JSON.stringify(original));
        careerBlocksRender(tong, method);
      }
    } catch (e) {
      console.log(e);
    }
  }

  plusBlockEvent = (mode, index = -1, method = 0, tong = null, emptyBoo = false) => {
    let valueTargets;
    if (method === 0) {
      valueTargets = [
        { name: "회사", type: "string" },
        { name: "부서", type: "string" },
        { name: "담당 업무", type: "string" },
        { name: "업무 태그", type: "button", buttons: [
          "리모델링",
          "건축 설계",
          "홈스타일링",
          "전시",
          "디스플레이",
          "모델하우스",
          "가구",
          "패브릭",
          "조명",
          "기타 디자인",
          "기타 업무",
        ] },
        { name: "시작일", type: "date", progressBoo: false, progressName: "" },
        { name: "종료일", type: "date", progressBoo: true, progressName: "재직중" },
      ];
    } else {
      valueTargets = [
        { name: "학교", type: "string" },
        { name: "전공", type: "string" },
        { name: "입학일", type: "date", progressBoo: false, progressName: "" },
        { name: "졸업일", type: "date", progressBoo: true, progressName: "재학중" },
      ];
    }
    return async function (e) {
      try {
        let valueMatrix;
        let tempArr;
        let tempValue;
  
        valueMatrix = [];
  
        for (let obj of valueTargets) {
          tempArr = [];
          if (obj.type === "string") {
            tempArr.push(obj.name);
            do {
              tempValue = await GeneralJs.prompt(obj.name + "명을 알려주세요!");
              if (typeof tempValue !== "string") {
                throw new Error("cancel");
              }
            } while (tempValue.trim() === "")
            tempArr.push(tempValue.trim());
          } else if (obj.type === "date") {
            tempArr.push(obj.name);
            do {
              tempValue = await GeneralJs.promptYearMonth(obj.name + "을(를) 알려주세요!", obj.progressBoo, obj.progressName);
              if (tempValue === null) {
                throw new Error("cancel");
              }
            } while (tempValue === null)
            tempArr.push(tempValue);

          } else if (obj.type === "button") {
            tempArr.push(obj.name);
            do {
              tempValue = await GeneralJs.promptButtons(obj.name + "을(를) 선택해주세요!", obj.buttons);
              if (tempValue === null) {
                throw new Error("cancel");
              }
            } while (tempValue === null)
            tempArr.push(tempValue);

          } else {
            throw new Error("invalid type");
          }
          valueMatrix.push(tempArr);
        }
  
        if (mode === "create") {
          await plusValueCareer(valueMatrix, tong, method);
        } else {
          if (emptyBoo) {
            await plusValueCareer(valueMatrix, tong, method);
          } else {
            await updateValueCareer(valueMatrix, tong, index, method);
          }
        }
      } catch (e) {
        window.alert("입력을 취소하셨습니다! 처음부터 다시 진행해주세요!");
      }
    }
  }

  mainBlock = createNode({
    mother: normalMode ? totalContents : this.baseTong,
    style: {
      display: "block",
      position: "relative",
      paddingBottom: normalMode ? String(30) + ea : String(mainPaddingBottom) + ea,
    }
  });

  contentsArea = createNode({
    mother: mainBlock,
    style: {
      display: "block",
      position: "relative",
      marginTop: normalMode ? "" : String(contentsAreaMarginTop) + ea,
      background: colorChip.white,
      borderRadius: String(5) + "px",
      boxShadow: !normalMode ? "0px 3px 15px -9px " + colorChip.shadow : "",
      paddingTop: String(innerPadding) + ea,
      paddingBottom: normalMode ? "" : String(innerPadding) + ea,
      paddingLeft: normalMode ? String(innerPadding) + ea : "",
      width: normalMode ? withOut(innerPadding, ea) : withOut(0, ea),
    }
  });

  if (normalMode) {

    createNode({
      mother: contentsArea,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(innerPadding, ea),
        justifyContent: "start",
        alignItems: "start",
      },
      children: [
        {
          text: "신청서를 작성 후 제출하시면, 확인 후 연락을 드립니다.",
          style: {
            display: "block",
            position: "relative",
            fontSize: String(<&& 26 | 26 | 25 | 24 | 4 &&>) + ea,
            fontWeight: String(800),
            color: colorChip.black,
            marginBottom: String(<&& 9 | 9 | 8 | 7 | 1 &&>) + ea,
          }
        }
      ]
    });

    createNode({
      mother: contentsArea,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(innerPadding, ea),
        justifyContent: "start",
        alignItems: "start",
      },
      children: [
        {
          text: [
            "홈리에종의 파트너십 신청을 위해서는 다음과 같이 기본 정보가 필요합니다.",
            "파트너십 신청서를 간단히 작성 후, 디자이너 활동을 시작해보세요!",
          ].join("\n"),
          style: {
            display: "block",
            position: "relative",
            fontSize: String(<&& 15 | 15 | 14 | 13 | 3.2 &&>) + ea,
            fontWeight: String(400),
            color: colorChip.black,
            marginBottom: String(<&& 24 | 24 | 22 | 20 | 1 &&>) + ea,
            lineHeight: String(1.5),
            textAlign: "left",
          }
        }
      ]
    });

    createNode({
      mother: contentsArea,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(innerPadding, ea),
        borderBottom: "1px solid " + colorChip.black,
        marginBottom: String(innerPadding) + ea,
      },
    });


  }

  leftBox = createNode({
    mother: contentsArea,
    style: {
      display: normalMode ? "none" : (desktop ? "inline-block" : "none"),
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
      width: normalMode ? withOut((innerPadding * 1), ea) : withOut(leftBoxWidth + (innerPadding * 2), ea),
      verticalAlign: "top",
      marginLeft: desktop ? "" : String(innerPadding) + ea,
      paddingTop: desktop ? "" : String(1) + ea,
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

  if (generalMode) {

    // 2-2
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
          text: "성별",
          style: {
            display: "inline-block",
            position: "relative",
            top: String(mainTop) + ea,
            fontSize: String(mainSize) + ea,
            fontWeight: String(mainWeight),
            color: colorChip.black,
            verticalAlign: "top",
            width: String(propertyWidth) + ea,
          }
        },
        {
          class: [ inputClassName ],
          attribute: {
            toggle: "on",
            property: "gender",
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
            marginRight: String(factorBetween) + ea,
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
              text: "여성",
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
            property: "gender",
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
            marginRight: mobile ? "" : String(factorBetween) + ea,
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
              text: "남성",
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

    // 2-3
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
          text: "생일",
          style: {
            display: "inline-block",
            position: "relative",
            top: String(mainTop) + ea,
            fontSize: String(mainSize) + ea,
            fontWeight: String(mainWeight),
            color: colorChip.black,
            verticalAlign: "top",
            width: String(propertyWidth) + ea,
          }
        },
        {
          style: {
            display: "inline-block",
            position: "relative",
            top: String(grayTop) + ea,
            width: String(yearWidth) + ea,
            height: String(grayHeight) + ea,
            background: colorChip.gray1,
            borderRadius: String(3) + "px",
          },
          child: {
            mode: "input",
            class: [ inputClassName ],
            attribute: {
              type: "text",
              placeholder: "1990",
              property: "birth_y",
              value: "",
            },
            style: {
              position: "absolute",
              top: String(0) + ea,
              left: String(0) + ea,
              width: withOut(0, ea),
              height: withOut((desktop ? 2 : 0.3), ea),
              outline: String(0),
              border: String(0),
              fontSize: String(inputSize) + ea,
              fontWeight: String(inputWeight),
              color: colorChip.black,
              textAlign: "center",
              background: "transparent",
            }
          }
        },
        {
          text: "년",
          style: {
            display: "inline-block",
            position: "relative",
            top: String(mainTop) + ea,
            fontSize: String(mainSize) + ea,
            fontWeight: String(300),
            color: colorChip.black,
            verticalAlign: "top",
            marginLeft: String(yearMonthTextMargin) + ea,
            width: String(yearMonthTextWidth) + ea,
          }
        },
        {
          style: {
            display: "inline-block",
            position: "relative",
            top: String(grayTop) + ea,
            width: String(monthWidth) + ea,
            height: String(grayHeight) + ea,
            background: colorChip.gray1,
            borderRadius: String(3) + "px",
          },
          child: {
            mode: "input",
            class: [ inputClassName ],
            attribute: {
              type: "text",
              placeholder: "10",
              property: "birth_m",
              value: "",
            },
            style: {
              position: "absolute",
              top: String(0) + ea,
              left: String(0) + ea,
              width: withOut(0, ea),
              height: withOut((desktop ? 2 : 0.3), ea),
              outline: String(0),
              border: String(0),
              fontSize: String(inputSize) + ea,
              fontWeight: String(inputWeight),
              color: colorChip.black,
              textAlign: "center",
              background: "transparent",
            }
          }
        },
        {
          text: "월",
          style: {
            display: "inline-block",
            position: "relative",
            top: String(mainTop) + ea,
            fontSize: String(mainSize) + ea,
            fontWeight: String(300),
            color: colorChip.black,
            verticalAlign: "top",
            marginLeft: String(yearMonthTextMargin) + ea,
            width: String(yearMonthTextWidth) + ea,
          }
        },
        {
          style: {
            display: "inline-block",
            position: "relative",
            top: String(grayTop) + ea,
            width: String(monthWidth) + ea,
            height: String(grayHeight) + ea,
            background: colorChip.gray1,
            borderRadius: String(3) + "px",
          },
          child: {
            mode: "input",
            class: [ inputClassName ],
            attribute: {
              type: "text",
              placeholder: "10",
              property: "birth_d",
              value: "",
            },
            style: {
              position: "absolute",
              top: String(0) + ea,
              left: String(0) + ea,
              width: withOut(0, ea),
              height: withOut((desktop ? 2 : 0.3), ea),
              outline: String(0),
              border: String(0),
              fontSize: String(inputSize) + ea,
              fontWeight: String(inputWeight),
              color: colorChip.black,
              textAlign: "center",
              background: "transparent",
            }
          }
        },
        {
          text: "일",
          style: {
            display: "inline-block",
            position: "relative",
            top: String(mainTop) + ea,
            fontSize: String(mainSize) + ea,
            fontWeight: String(300),
            color: colorChip.black,
            verticalAlign: "top",
            marginLeft: String(yearMonthTextMargin) + ea,
            width: String(yearMonthTextWidth) + ea,
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
          event: {
            blur: emailBlurEvent
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
            placeholder: "주소",
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
            placeholder: "상세 주소",
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
        marginBottom: String(desktop ? blockMarginBottom : 5) + ea,
        height: desktop ? String(moduleHeight) + ea : "",
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
          text: "사업자 구분",
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
          class: [ inputClassName ],
          attribute: {
            toggle: "on",
            property: "business",
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
            marginRight: String(factorBetween) + ea,
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
              text: "법인(일반)",
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
            property: "business",
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
            marginRight: mobile ? "" : String(factorBetween) + ea,
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
              text: "개인(일반)",
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
            property: "business",
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
            marginRight: String(factorBetween) + ea,
            marginTop: mobile ? String(2) + ea : "",
            marginLeft: mobile ? String(32.4) + ea : "",
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
              text: "개인(간이)",
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
            property: "business",
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
            marginTop: mobile ? String(2) + ea : "",
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
              text: "프리랜서",
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
          text: "회사명",
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
          style: {
            display: "inline-block",
            position: "relative",
            top: String(grayTop) + ea,
            width: String(grayWidth) + ea,
            height: String(grayHeight) + ea,
            background: colorChip.gray1,
            borderRadius: String(3) + "px",
          },
          child: {
            mode: "input",
            class: [ inputClassName ],
            attribute: {
              type: "text",
              placeholder: "회사명",
              property: "company",
              value: "",
            },
            event: {
              focus: greenBasicFocusEvent,
              blur: greenBasicBlurEvent,
            },
            style: {
              position: "absolute",
              top: String(inputTop) + ea,
              left: String(0) + ea,
              width: String(grayWidth) + ea,
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
        },
        {
          class: [ noticeClassName ],
          text: "* 사업자가 없는 경우, '프리랜서'로 작성해주세요!",
          style: {
            display: desktop ? "inline-block" : "none",
            position: "relative",
            top: String(subFontTop) + ea,
            fontSize: String(subFontSize) + ea,
            fontWeight: String(mainWeight),
            color: colorChip.deactive,
            verticalAlign: "top",
            marginLeft: String(subFontBetween) + ea,
            transition: "all 0.3s ease",
          }
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
          text: "사업자 등록번호",
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
          style: {
            display: "inline-block",
            position: "relative",
            top: String(grayTop) + ea,
            width: String(grayWidth) + ea,
            height: String(grayHeight) + ea,
            background: colorChip.gray1,
            borderRadius: String(3) + "px",
          },
          child: {
            mode: "input",
            class: [ inputClassName ],
            attribute: {
              type: "text",
              placeholder: "000-00-00000",
              property: "numbers",
              value: "",
            },
            event: {
              focus: greenNumberFocusEvent,
              blur: greenNumberBlurEvent,
            },
            style: {
              position: "absolute",
              top: String(inputTop) + ea,
              left: String(0) + ea,
              width: String(grayWidth) + ea,
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
        },
        {
          class: [ noticeClassName ],
          text: "* 프리랜서인 경우, 생년월일 6자리를 적어주세요!",
          style: {
            display: desktop ? "inline-block" : "none",
            position: "relative",
            top: String(subFontTop) + ea,
            fontSize: String(subFontSize) + ea,
            fontWeight: String(mainWeight),
            color: colorChip.deactive,
            verticalAlign: "top",
            marginLeft: String(subFontBetween) + ea,
            transition: "all 0.3s ease",
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
          text: "사업자 개업일",
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
          style: {
            display: "inline-block",
            position: "relative",
            top: String(grayTop) + ea,
            width: String(grayWidth) + ea,
            height: String(grayHeight) + ea,
            background: colorChip.gray1,
            borderRadius: String(3) + "px",
          },
          child: {
            mode: "input",
            class: [ inputClassName ],
            attribute: {
              type: "text",
              placeholder: "2000-00-00",
              property: "start",
              value: "",
            },
            event: {
              focus: greenDateFocusEvent,
              blur: greenDateBlurEvent,
            },
            style: {
              position: "absolute",
              top: String(inputTop) + ea,
              left: String(0) + ea,
              width: String(grayWidth) + ea,
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
        },
        {
          class: [ noticeClassName ],
          text: "* 프리랜서인 경우, 오늘 날짜를 기입해주세요!",
          style: {
            display: desktop ? "inline-block" : "none",
            position: "relative",
            top: String(subFontTop) + ea,
            fontSize: String(subFontSize) + ea,
            fontWeight: String(mainWeight),
            color: colorChip.deactive,
            verticalAlign: "top",
            marginLeft: String(subFontBetween) + ea,
            transition: "all 0.3s ease",
          }
        },
      ]
    });
    // 11
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
          text: "대표자 성함",
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
          style: {
            display: "inline-block",
            position: "relative",
            top: String(grayTop) + ea,
            width: String(grayWidth) + ea,
            height: String(grayHeight) + ea,
            background: colorChip.gray1,
            borderRadius: String(3) + "px",
          },
          child: {
            mode: "input",
            class: [ inputClassName ],
            attribute: {
              type: "text",
              placeholder: "성함",
              property: "representative",
              value: "",
            },
            event: {
              focus: greenBasicFocusEvent,
              blur: greenBasicBlurEvent,
            },
            style: {
              position: "absolute",
              top: String(inputTop) + ea,
              left: String(0) + ea,
              width: String(grayWidth) + ea,
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
        },
        {
          class: [ noticeClassName ],
          text: "* 프리랜서인 경우, 본인 성함을 입력해주세요!",
          style: {
            display: desktop ? "inline-block" : "none",
            position: "relative",
            top: String(subFontTop) + ea,
            fontSize: String(subFontSize) + ea,
            fontWeight: String(mainWeight),
            color: colorChip.deactive,
            verticalAlign: "top",
            marginLeft: String(subFontBetween) + ea,
            transition: "all 0.3s ease",
          }
        },
      ]
    });

    // 12 : margin
    createNode({
      mother: rightBox,
      style: {
        display: "block",
        position: "relative",
        marginBottom: String(blockMarginBottom) + ea,
        height: String(moduleHeight * marginRatio) + ea,
      }
    });

    // 13
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
          text: "은행명",
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
          style: {
            display: "inline-block",
            position: "relative",
            top: String(grayTop) + ea,
            width: String(desktop ? widthGrayType0 : grayWidth) + ea,
            height: String(grayHeight) + ea,
            background: colorChip.gray1,
            borderRadius: String(3) + "px",
          },
          child: {
            mode: "input",
            class: [ inputClassName ],
            attribute: {
              type: "text",
              placeholder: "은행명",
              property: "bankname",
              value: "",
            },
            event: {
              focus: greenBasicFocusEvent,
              blur: greenBasicBlurEvent,
            },
            style: {
              position: "absolute",
              top: String(inputTop) + ea,
              left: String(0) + ea,
              width: String(desktop ? widthGrayType0 : grayWidth) + ea,
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
        },
      ]
    });
    // 14
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
          text: "계좌 번호",
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
          style: {
            display: "inline-block",
            position: "relative",
            top: String(grayTop) + ea,
            width: String(desktop ? widthGrayType1 : grayWidth) + ea,
            height: String(grayHeight) + ea,
            background: colorChip.gray1,
            borderRadius: String(3) + "px",
          },
          child: {
            mode: "input",
            class: [ inputClassName ],
            attribute: {
              type: "text",
              placeholder: "계좌 번호",
              property: "banknumber",
              value: "",
            },
            event: {
              focus: greenNumberFocusEvent,
              blur: greenNumberBlurEvent,
            },
            style: {
              position: "absolute",
              top: String(inputTop) + ea,
              left: String(0) + ea,
              width: String(desktop ? widthGrayType1 : grayWidth) + ea,
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
        },
        {
          class: [ noticeClassName ],
          text: "* 은행명 없이, 계좌 번호만 적어주세요!",
          style: {
            display: desktop ? "inline-block" : "none",
            position: "relative",
            top: String(subFontTop) + ea,
            fontSize: String(subFontSize) + ea,
            fontWeight: String(mainWeight),
            color: colorChip.deactive,
            verticalAlign: "top",
            marginLeft: String(subFontBetween) + ea,
            transition: "all 0.3s ease",
          }
        },
      ]
    });
    // 15
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
          text: "예금주",
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
          style: {
            display: "inline-block",
            position: "relative",
            top: String(grayTop) + ea,
            width: String(desktop ? widthGrayType0 : grayWidth) + ea,
            height: String(grayHeight) + ea,
            background: colorChip.gray1,
            borderRadius: String(3) + "px",
          },
          child: {
            mode: "input",
            class: [ inputClassName ],
            attribute: {
              type: "text",
              placeholder: "예금주",
              property: "bankto",
              value: "",
            },
            event: {
              focus: greenBasicFocusEvent,
              blur: greenBasicBlurEvent,
            },
            style: {
              position: "absolute",
              top: String(inputTop) + ea,
              left: String(0) + ea,
              width: String(desktop ? widthGrayType0 : grayWidth) + ea,
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
        },
      ]
    });

    // 16 : margin
    createNode({
      mother: rightBox,
      style: {
        display: "block",
        position: "relative",
        marginBottom: String(blockMarginBottom) + ea,
        height: String(moduleHeight * marginRatio) + ea,
      }
    });

    // 17
    tempBlock = createNode({
      mother: rightBox,
      style: {
        display: "block",
        position: "relative",
        marginBottom: String(blockMarginBottom) + ea,
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
          text: "경력",
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
            verticalAlign: "top",
            position: "relative",
            background: colorChip.green,
            width: String(noticeCircleWidth) + ea,
            height: String(noticeCircleWidth) + ea,
            borderRadius: String(noticeCircleWidth) + ea,
            top: String(noticeCircleTop) + ea,
            marginLeft: String(noticeCircleMargin) + ea,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          },
          child: {
            text: "+",
            style: {
              position: "relative",
              fontSize: String(plusSize) + ea,
              fontWeight: String(questionWeight),
              top: String(plusTextTop) + ea,
              color: colorChip.white,
              fontFamily: "graphik",
            }
          }
        },
        {
          mode: "article",
          class: [ blockTargetClassName.career, inputClassName ],
          attribute: {
            block: JSON.stringify([]),
            property: "careerdetail",
          },
          style: {
            display: "inline-block",
            verticalAlign: "top",
            position: "relative",
            top: String(grayTop) + ea,
            marginLeft: String(careerBlockMarginLeft) + ea,
            width: withOut(careerBlockMinus, ea),
            "min-height": String(grayHeight) + ea,
            background: colorChip.gray1,
            borderRadius: String(3) + "px",
          }
        },
      ]
    });
    tempBlock.children[2].addEventListener("click", plusBlockEvent("create", -1, 0, tempBlock.children[3]), false);
    careerBlocksRender(tempBlock.children[3], 0);

    // 18
    tempBlock = createNode({
      mother: rightBox,
      style: {
        display: "block",
        position: "relative",
        marginBottom: String(blockMarginBottom) + ea,
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
          text: "학력",
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
            verticalAlign: "top",
            position: "relative",
            background: colorChip.green,
            width: String(noticeCircleWidth) + ea,
            height: String(noticeCircleWidth) + ea,
            borderRadius: String(noticeCircleWidth) + ea,
            top: String(noticeCircleTop) + ea,
            marginLeft: String(noticeCircleMargin) + ea,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          },
          child: {
            text: "+",
            style: {
              position: "relative",
              fontSize: String(plusSize) + ea,
              fontWeight: String(questionWeight),
              top: String(plusTextTop) + ea,
              color: colorChip.white,
              fontFamily: "graphik",
            }
          }
        },
        {
          mode: "article",
          class: [ blockTargetClassName.school, inputClassName ],
          attribute: {
            block: JSON.stringify([]),
            property: "schooldetail",
          },
          style: {
            display: "inline-block",
            verticalAlign: "top",
            position: "relative",
            top: String(grayTop) + ea,
            marginLeft: String(careerBlockMarginLeft) + ea,
            width: withOut(careerBlockMinus, ea),
            "min-height": String(grayHeight) + ea,
            background: colorChip.gray1,
            borderRadius: String(3) + "px",
          }
        },
      ]
    });
    tempBlock.children[2].addEventListener("click", plusBlockEvent("create", -1, 1, tempBlock.children[3]), false);
    careerBlocksRender(tempBlock.children[3], 1);

    // 20 : margin
    createNode({
      mother: rightBox,
      style: {
        display: "block",
        position: "relative",
        marginBottom: String(blockMarginBottom) + ea,
        height: String(moduleHeight * marginRatio) + ea,
      }
    });

    // 21
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
          text: "홈페이지",
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
          style: {
            display: "inline-block",
            position: "relative",
            top: String(grayTop) + ea,
            width: String(desktop ? widthGrayType1 : grayWidth) + ea,
            height: String(grayHeight) + ea,
            background: colorChip.gray1,
            borderRadius: String(3) + "px",
          },
          child: {
            mode: "input",
            class: [ inputClassName ],
            attribute: {
              type: "text",
              placeholder: "전체 링크",
              property: "homepage",
              value: "",
            },
            event: {
              focus: greenLinkFocusEvent,
              blur: greenLinkBlurEvent,
            },
            style: {
              position: "absolute",
              top: String(inputTop) + ea,
              left: String(0) + ea,
              width: String(desktop ? widthGrayType1 : grayWidth) + ea,
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
        },
        {
          class: [ noticeClassName ],
          text: "* https로 시작하는 링크 전체를 적어주세요!",
          style: {
            display: desktop ? "inline-block" : "none",
            position: "relative",
            top: String(subFontTop) + ea,
            fontSize: String(subFontSize) + ea,
            fontWeight: String(mainWeight),
            color: colorChip.deactive,
            verticalAlign: "top",
            marginLeft: String(subFontBetween) + ea,
            transition: "all 0.3s ease",
          }
        },
      ]
    });
    // 22
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
          text: "SNS",
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
          style: {
            display: "inline-block",
            position: "relative",
            top: String(grayTop) + ea,
            width: String(desktop ? widthGrayType1 : grayWidth) + ea,
            height: String(grayHeight) + ea,
            background: colorChip.gray1,
            borderRadius: String(3) + "px",
          },
          child: {
            mode: "input",
            class: [ inputClassName ],
            attribute: {
              type: "text",
              placeholder: "전체 링크",
              property: "sns",
              value: "",
            },
            event: {
              focus: greenLinkFocusEvent,
              blur: greenLinkBlurEvent,
            },
            style: {
              position: "absolute",
              top: String(inputTop) + ea,
              left: String(0) + ea,
              width: String(desktop ? widthGrayType1 : grayWidth) + ea,
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
        },
        {
          class: [ noticeClassName ],
          text: "* 계정명이 아닌, 링크 전체를 적어주세요!",
          style: {
            display: desktop ? "inline-block" : "none",
            position: "relative",
            top: String(subFontTop) + ea,
            fontSize: String(subFontSize) + ea,
            fontWeight: String(mainWeight),
            color: colorChip.deactive,
            verticalAlign: "top",
            marginLeft: String(subFontBetween) + ea,
            transition: "all 0.3s ease",
          }
        },
      ]
    });
    // 23
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
          text: "포트폴리오",
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

    // 24 : margin
    createNode({
      mother: rightBox,
      style: {
        display: "block",
        position: "relative",
        marginBottom: String(blockMarginBottom) + ea,
        height: String(moduleHeight * marginRatio) + ea,
      }
    });

    // 25
    createNode({
      mother: rightBox,
      style: {
        display: "block",
        position: "relative",
        marginBottom: String(blockMarginBottom) + ea,
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
          text: "자신에 대해 서술해 주세요!",
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
            display: "block",
            position: "relative",
            marginTop: String(desktop ? 12 : mobileGrayTextAreaTop) + ea,
            left: String(0) + ea,
            width: withOut(0, ea),
            height: String((grayBigHeight * 2)) + ea,
            background: colorChip.gray1,
            borderRadius: String(3) + "px",
          }
        },
        {
          mode: "textarea",
          class: [ inputClassName ],
          attribute: {
            property: "etc",
          },
          style: {
            position: "absolute",
            top: String(textareaVisualTop + textareaTop) + ea,
            left: String(0 + textareaLeft) + ea,
            width: withOut(textareaLeft * 2, ea),
            height: String((grayBigHeight * 2) - (textareaTop * 1)) + ea,
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

  } else {
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
          text: "파일",
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
              this.querySelector("input").files = e.dataTransfer.files;
              fileChangeEvent.call(this.querySelector("input"), e);
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
  }

  this.fileInput = portfolioBlock.querySelector("input");

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
      boxShadow: !normalMode ? "0px 3px 15px -9px " + colorChip.shadow : "",
      paddingTop: normalMode ? "" : String(innerPadding) + ea,
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
          color: colorChip.green,
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
          background: colorChip.green,
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
          background: colorChip.gradientGreen,
          borderRadius: String(5) + "px",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          cursor: "pointer",
        },
        children: [
          {
            text: generalMode ? "디자이너 신청하기" : "포트폴리오 전송하기",
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

AspirantSubmitJs.prototype.finalSubmit = function () {
  const instance = this;
  const inputClassName = "inputClassName";
  const agreeTargetClassName = "agreeTargetClassName";
  const { ajaxJson, colorChip, findByAttribute, scrollTo, dateToString, sleep, selfHref, homeliaisonAnalytics, setQueue, ajaxForm, equalJson } = GeneralJs;
  const { portfolioMode } = this;
  const generalMode = !portfolioMode;
  return async function (e) {
    try {
      const property = "property";
      const targets = [ ...document.querySelectorAll('.' + inputClassName) ];
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
      let formData;
      let cancelPhoto;
      let thisName;
      let grayLoading;

      if (document.querySelector('.' + agreeTargetClassName).getAttribute("toggle") === "off") {
        window.alert("개인정보 취급 방침에 동의해주세요!");
      } else {
        if (instance.fileInput.files.length === 0) {
          window.alert("포트폴리오를 반드시 제출하셔야 합니다!");
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
  
                if (p === "name") {
                  firstDom.value = firstDom.value.replace(/[^a-zA-Z가-힣]/gi, '');
                  if (firstDom.value.trim() === '') {
                    throw new Error("성함을 입력해주세요!");
                  }
                  name = firstDom.value.trim();
                } else if (p === "phone") {
                  firstDom.value = firstDom.value.replace(/[^0-9\-]/gi, '');
                  if (firstDom.value.trim() === '') {
                    throw new Error("연락처를 입력해주세요!");
                  }
                  phone = firstDom.value.trim();
                } else if (p === "address0") {
                  firstDom.value = firstDom.value.trim();
                  if (firstDom.value.trim() === '') {
                    throw new Error("주소를 검색하여 입력해주세요!");
                  }
                } else if (p === "address1") {
                  firstDom.value = firstDom.value.trim();
                  if (firstDom.value.trim() === '') {
                    throw new Error("상세 주소를 적어주세요!");
                  }
                } else if (p === "email") {
                  firstDom.value = firstDom.value.trim();
                  if (firstDom.value.trim() === '') {
                    throw new Error("이메일 주소를 적어주세요!");
                  }
                } else if (p === "company") {
                  firstDom.value = firstDom.value.trim();
                  if (firstDom.value.trim() === '') {
                    throw new Error("회사명을 적어주세요! (프리랜서의 경우 '프리랜서')");
                  }
                } else if (p === "numbers") {
                  firstDom.value = firstDom.value.replace(/[^0-9\.]/gi, '');
                  if (firstDom.value.trim() === '' || Number.isNaN(Number(firstDom.value.trim())) || Number(firstDom.value.trim()) === 0) {
                    throw new Error("사업자 등록번호를 입력해주세요! (프리랜서의 경우, 생년월일 6자리)");
                  }
                } else if (p === "start") {
                  firstDom.value = firstDom.value.replace(/[^0-9\-]/gi, '').trim();
                  if (!/[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]/gi.test(firstDom.value.trim())) {
                    throw new Error("시작일 기입해주세요! (프리랜서의 경우, 오늘 날짜를 기입)");
                  }
                } else if (p === "representative") {
                  firstDom.value = firstDom.value.trim();
                  if (firstDom.value.trim() === '') {
                    throw new Error("대표자명을 적어주세요! (프피랜서의 경우, 본인명)");
                  }
                } else if (p === "bankname") {
                  firstDom.value = firstDom.value.trim();
                  if (firstDom.value.trim() === '') {
                    throw new Error("은행명을 적어주세요!");
                  }
                } else if (p === "banknumber") {
                  firstDom.value = firstDom.value.replace(/[^0-9\.]/gi, '');
                  if (firstDom.value.trim() === '' || Number.isNaN(Number(firstDom.value.trim())) || Number(firstDom.value.trim()) === 0) {
                    throw new Error("계좌번호를 입력해주세요!");
                  }
                } else if (p === "bankto") {
                  firstDom.value = firstDom.value.trim();
                  if (firstDom.value.trim() === '') {
                    throw new Error("예금주를 적어주세요!");
                  }
                } else if (p === "etc") {
                  firstDom.value = firstDom.value.trim().replace(/[\=\+\&\>\<\/\\\{\}\[\]\`]/gi, '');
                  if (firstDom.value.trim() === '') {
                    throw new Error("자기 소개를 적어주세요!");
                  }
                }
  
                tempObj.value = firstDom.value.replace(/[\=\+\&\>\<\/\\\{\}\[\]\`]/gi, '');
  
              } catch (e) {
                window.alert(e.message);
                boo = false;
                scrollTo(window, firstDom, visualSpecific);
                if (firstDom.previousElementSibling === null) {
                  firstDom.parentElement.style.boxSizing = "border-box";
                  firstDom.parentElement.style.border = "1px solid " + colorChip.green;
                } else {
                  firstDom.previousElementSibling.style.boxSizing = "border-box";
                  firstDom.previousElementSibling.style.border = "1px solid " + colorChip.green;
                }
                if (typeof firstDom.focus === "function") {
                  firstDom.focus();
                }
                break;
              }
            } else if (/DIV/gi.test(nodeName)) {
  
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
              tempObj.value = onValue;
  
            } else if (/ASIDE/gi.test(nodeName)) {
  
              tempObj.value = firstDom.getAttribute("value");
  
            } else if (/ARTICLE/gi.test(nodeName)) {
              try {
                if (p === "careerdetail") {
                  if (equalJson(firstDom.getAttribute("block")).length === 0) {
                    throw new Error("경력 사항을 적어주세요!");
                  }
                } else if (p === "schooldetail") {
                  if (equalJson(firstDom.getAttribute("block")).length === 0) {
                    throw new Error("학력 사항을 적어주세요!");
                  }
                }
                tempObj.value = JSON.stringify(equalJson(firstDom.getAttribute("block")));
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
            instance.mother.certificationBox(name, phone, async function (back, box) {
              try {
                const { aspid } = await ajaxJson({ map, mode: (generalMode ? "general" : "portfolio") }, BACKHOST + "/aspirantSubmit");
                if (typeof aspid !== "string") {
                  window.alert("오류가 발생하였습니다! 다시 시도해주세요!");
                  window.location.reload();
                }
                homeliaisonAnalytics({
                  page: instance.pageName,
                  standard: instance.firstPageViewTime,
                  action: generalMode ? "aspirantSubmit" : "aspirantPortfolioSend",
                  data: {
                    aspid,
                    date: dateToString(new Date(), true),
                  },
                }).then(() => {
                  document.body.removeChild(box);
                  document.body.removeChild(back);
                  grayLoading = instance.mother.whiteProgressLoading();
                  formData = new FormData();
                  formData.enctype = "multipart/form-data";
                  formData.append("name", name);
                  formData.append("aspid", aspid);
                  cancelPhoto = JSON.parse(instance.fileInput.getAttribute("cancel"));
                  for (let i = 0; i < instance.fileInput.files.length; i++) {
                    if (!cancelPhoto.includes(i)) {
                      formData.append("upload0", instance.fileInput.files[i]);
                    }
                  }
                  return ajaxForm(formData, BRIDGEHOST + "/aspirantBinary", grayLoading.progress.firstChild);
                }).then(() => {
                  grayLoading.remove();
                  GeneralJs.scrollTo(window, 0);
                  if (generalMode) {
                    window.alert("신청이 완료되었습니다! 확인 후 연락드리겠습니다 :)");
                  } else {
                    window.alert("전송이 완료되었습니다! 확인 후 연락드리겠습니다 :)");
                  }
                  selfHref(FRONTHOST + "/aspinformation.php?aspid=" + aspid);
                }).catch((err) => {
                  window.alert("오류가 발생하였습니다! 다시 시도해주세요!");
                  window.location.reload();
                });

              } catch (e) {
                await ajaxJson({ message: "front aspirantSubmit.certificationBox : " + e.message }, BACKHOST + "/errorLog");
              }
            });
          }

        }
      }

    } catch (e) {
      console.log(e);
      window.location.reload();
    }
  }
}

AspirantSubmitJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    this.mother.setGeneralProperties(this);

    const { returnGet, ajaxJson, selfHref } = GeneralJs;
    const getObj = returnGet();
    const entireMode = (getObj.entire === "true");
    const normalMode = (entireMode && getObj.normal === "true");

    this.inputClassName = "consultingInput";
    if (typeof getObj.mode === "string" && getObj.mode === "portfolio") {
      this.portfolioMode = true;
    } else {
      this.portfolioMode = false;
    }

    this.normalMode = normalMode;

    if (!normalMode) {
      await this.mother.ghostClientLaunching({
        mode: "front",
        name: "aspirantSubmit",
        client: null,
        base: {
          instance: this,
          binaryPath: AspirantSubmitJs.binaryPath,
          subTitle: "",
          secondBackground: false,
          backgroundType: 0,
        },
        local: async () => {
          try {
            instance.insertAspirantBox();
          } catch (e) {
            await GeneralJs.ajaxJson({ message: "AspirantSubmitJs.launching.ghostClientLaunching : " + e.message }, BACKHOST + "/errorLog");
          }
        }
      });
    } else {

      GeneralJs.colorChip.green = "#9eb6d8";
      GeneralJs.colorChip.gradientGreen = "#404040";

      instance.insertInitBox();
      instance.insertAspirantBox();
    }

    loading.parentNode.removeChild(loading);

  } catch (err) {
    console.log(err);
    await GeneralJs.ajaxJson({ message: "AspirantSubmitJs.launching 에러 일어남 => " + err.message }, BACKHOST + "/errorLog");
  }
}
