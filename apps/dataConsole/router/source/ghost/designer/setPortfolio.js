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
      "return ('세트 포트폴리오 전송 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('세트 포트폴리오 전송 | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "setPortfolio",
  "hangul": "세트 포트폴리오 전송",
  "route": [
    "setPortfolio"
  ]
} %/%/g

const SetPortfolioJs = function () {
  this.mother = new GeneralJs();
}

SetPortfolioJs.binaryPath = FRONTHOST + "/middle/aspsetting";

SetPortfolioJs.prototype.insertInitBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics } = GeneralJs;
  const { ea, media, mode } = this;
  const generalMode = mode === "general";
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

  titleWording = generalMode ? "세트 포트폴리오 전송" : "추천서 사진 전송";
  subTitleContents = generalMode ? "업로드 가능한 포트폴리오를 요청드립니다!" : "추천 가능한 사진을 요청드립니다!";

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

SetPortfolioJs.prototype.insertSettingBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, ajaxJson, equalJson, cleanChildren } = GeneralJs;
  const { ea, media, standardWidth, portfolioMode, designer, mode } = this;
  const generalMode = mode === "general";
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
  let nameDom, phoneDom, longDom;
  let exampleTong;
  let exampleDescriptionTong;
  let pictureNumber;
  let settingTongPaddingTop;
  let settingTongPaddingLeft;
  let settingTongImageBetween;
  let settingTongImageHeight;
  let settingSetDescriptionContents;
  let thisTitle, thisDescription;
  let descriptionBlock;
  let descriptionBlockMarginBottom;
  let descriptionBlockSize;
  let descriptionBlockWeight;
  let descriptionBlockBoldWeight;
  let descriptionBlockNumberWidth;
  let descriptionBlockTitleWidth;
  let descriptionBlockPaddingLeft;
  let descriptionBlockPaddingTop;
  let garoExampleTong;
  let garoExampleDescriptionTong;
  let seroExampleTong;
  let seroExampleDescriptionTong;
  let secondLeftBox, secondRightBox;
  let middleBarHeight, middleBarMarginBottom;
  let settingGaroDescriptionContents;
  let settingSeroDescriptionContents;
  let contents2;
  let garoRepresentativePhotoNumber;
  let seroRepresentativePhotoNumber0;
  let seroRepresentativePhotoNumber1;
  let denyTong;
  let submitTongBetween;
  let garoImageHeight, seroImageHeight;
  let descriptionBoxVisualPaddingTop;

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
  quoteLeft = <%% 2, 2, 2, 2, 0.4 %%>;

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
  blockMarginBottom = <%% 12, 12, 9, 9, 7 %%>;

  leftGrayType0 = <%% 127, 111, 106, 98, 18 %%>;
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

  descriptionSize = <%% 15, 14, 13, 13, 3.2 %%>;
  descriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
  descriptionLineHeight = <%% 1.7, 1.7, 1.7, 1.7, 1.66 %%>;
  descriptionMarginTop = <%% 10, 10, 8, 6, 1 %%>;
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
  submitButtonWidth = <%% 200, 200, 170, 155, 39 %%>;

  submitButtonHeight = <%% 47, 47, 42, 38, 10 %%>;
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
  titleWidth = <%% 115, 100, 96, 88, 30 %%>;

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

  careerBlockMarginLeft = <%% 64, 52, 50, 44, 5 %%>;
  careerBlockMinus = <%% 128, 112, 106, 98, 18.2 %%>;

  propertyWidth = <%% 90, 79, 69, 69, 15.7 %%>;
  yearWidth = <%% 72, 72, 64, 56, 13 %%>;
  monthWidth = <%% 40, 40, 36, 32, 8 %%>;

  yearMonthTextWidth = <%% 32, 32, 30, 24, 6 %%>;
  yearMonthTextMargin = <%% 6, 6, 5, 4, 1 %%>;

  textareaVisualTop = <%% 38, 35, 34, 32, 8 %%>;

  pictureNumber = 22;

  settingTongPaddingTop = <%% 13, 13, 11, 7, 2 %%>;
  settingTongPaddingLeft = <%% 12, 12, 10, 6, 2 %%>;
  settingTongImageBetween = <%% 7, 6, 5, 3, 0.5 %%>;
  settingTongImageHeight = <%% 167, 128, 108, 84.5, 16.6 %%>;
  garoImageHeight = <%% 516, 398, 335, 261, 50.7 %%>;
  seroImageHeight = <%% 511, 394, 332, 259, 50 %%>;

  descriptionBlockMarginBottom = <%% 5, 5, 5, 3, 2.2 %%>;

  descriptionBlockSize = <%% 14, 14, 12, 11, 3 %%>;
  descriptionBlockWeight = <%% 400, 400, 400, 400, 400 %%>;
  descriptionBlockBoldWeight = <%% 700, 700, 700, 700, 700 %%>;

  descriptionBlockNumberWidth = <%% 18, 18, 18, 12, 3 %%>;
  descriptionBlockTitleWidth = <%% 160, 154, 124, 78, 20 %%>;

  descriptionBlockPaddingLeft = <%% 20, 20, 20, 14, 3.5 %%>;
  descriptionBlockPaddingTop = <%% 18, 18, 18, 12, 3.5 %%>;

  middleBarHeight = <%% 50, 50, 50, 50, 5 %%>;
  middleBarMarginBottom = <%% 50, 50, 50, 50, 6 %%>;

  submitTongBetween = <%% 8, 8, 8, 8, 1 %%>;

  descriptionBoxVisualPaddingTop = <%% (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), 0 %%>;

  if (generalMode) {

    contents = {
      main: [
        "세트 포트폴리오 전송",
      ],
      sub: [
        <&& "개별 디자이너 컨텐츠 제작을 위해서는" | "개별 디자이너 컨텐츠 제작을 위해서는" | "디자이너 컨텐츠 제작을 위해서는" | "컨텐츠 제작을 위해서는" | "개별 디자이너 컨텐츠 제작을 위해서는" &&>,
        <&& "같은 집의 1세트 포트폴리오가 필요합니다." | "같은 집의 1세트 포트폴리오가 필요합니다." | "세트 포트폴리오가 필요합니다." | "하나의 세트가 필요합니다." | "같은 집의 1세트 포트폴리오가 필요합니다." &&>,
        <&& "세트 포트폴리오는 다음 예시와 같이" | "세트 포트폴리오는 다음 예시와 같이" | "포트폴리오는 다음 예시와 같이" | "사진은 다음 예시와 같이" | "세트 포트폴리오는 다음 예시와 같이" &&>,
        <&& "여러 조건을 만족해야만 합니다." | "여러 조건을 만족해야만 합니다." | "여러 조건을 만족해야만 합니다." | "조건을 만족해야만 합니다." | "여러 조건을 만족해야만 합니다." &&>,
      ]
    };
  
    contents2 = {
      main: [
        "세트 포트폴리오 전송",
      ],
      sub: [
        <&& "다음 포트폴리오 전송칸을 통해" | "다음 포트폴리오 전송칸을 통해" | "다음 포트폴리오 전송칸을 통해" | "다음 사진 전송칸을 통해" | "다음 포트폴리오 전송칸을 통해" &&>,
        <&& "1세트 포트폴리오를 전송해 주세요!" | "1세트 포트폴리오를 전송해 주세요!" | "포트폴리오를 전송해 주세요!" | "이미지를 전송해 주세요!" | "1세트 포트폴리오를 전송해 주세요!" &&>,
        <&& "jpg 등의 낱개 이미지 파일이 아닌" | "jpg 등의 낱개 이미지 파일이 아닌" | "jpg 등의 낱개 이미지 파일이 아닌" | "낱개 이미지 파일이 아닌" | "jpg 등의 낱개 이미지 파일이 아닌" &&>,
        <&& "zip 파일로 올려주셔야 합니다." | "zip 파일로 올려주셔야 합니다." | "zip 파일로 올려주셔야 합니다." | "zip 파일로 올려야 합니다." | "zip 파일로 올려주셔야 합니다." &&>,
      ]
    };

    settingSetDescriptionContents = [
      {
        title: "세트의 구성",
        description: "공간별로 스타일링 잘 보여줄 수 있는 사진의 나열",
      },
      {
        title: "사진의 개수",
        description: "공간별 사진 가로 기준 1장 이상, 세로 기준 2장 이상",
      },
      {
        title: "사진의 비율",
        description: "사진 비율은 A4와 동일 비율인 1:1.414, 가로 또는 세로",
      },
      {
        title: "세로 사진",
        description: "세로형 사진은 반드시 짝수로 존재하여 짝을 이뤄야 함",
      },
      {
        title: "전체적인 톤",
        description: "밝고 화사한 공간 사진, 사실적인 톤의 사진",
      }
    ];
  
    settingGaroDescriptionContents = [
      {
        title: "가로 비율",
        description: "사진의 비율은 A4와 동일 비율인 1:1.414",
      },
      {
        title: "최소 사이즈",
        description: "세로가 (짧은 쪽) 최소 1200픽셀 이상",
      },
      {
        title: "사진 개수",
        description: "공간당 최소 1장 이상, 광각컷(18mm 이하) 1장 이상",
      },
    ];
  
    settingSeroDescriptionContents = [
      {
        title: "세로 비율",
        description: "사진의 비율은 A4와 동일 비율인 1:1.414",
      },
      {
        title: "최소 사이즈",
        description: "가로가 (짧은 쪽) 최소 1200픽셀 이상",
      },
      {
        title: "사진 개수",
        description: "반드시 짝수로 있어야 함 (0장, 2장, 4장, 6장...)",
      },
    ];

  } else {

    contents = {
      main: [
        "추천서 사진 전송",
      ],
      sub: [
        <&& "현재 1세트 포트폴리오가 없다면" | "현재 1세트 포트폴리오가 없다면" | "현재 1세트 포트폴리오가 없다면" | "1세트 포트폴리오가 없다면" | "현재 1세트 포트폴리오가 없다면" &&>,
        <&& "추천서 제작을 위한 이미지가 필요합니다." | "추천서 제작을 위한 이미지가 필요합니다." | "추천서를 위한 사진이 필요합니다." | "추천서 사진이 필요합니다." | "추천서 제작을 위한 이미지가 필요합니다." &&>,
        <&& "추천서 사진 이미지는 다음 예시와 같이" | "추천서 사진 이미지는 다음 예시와 같이" | "사진 이미지는 다음 예시와 같이" | "이미지는 다음 예시와 같이" | "추천서 사진 이미지는 다음 예시와 같이" &&>,
        <&& "여러 조건을 만족해야만 합니다." | "여러 조건을 만족해야만 합니다." | "여러 조건을 만족해야만 합니다." | "조건을 만족해야만 합니다." | "여러 조건을 만족해야만 합니다." &&>,
      ]
    };
  
    contents2 = {
      main: [
        "추천서 사진 전송",
      ],
      sub: [
        <&& "다음 포트폴리오 전송칸을 통해" | "다음 포트폴리오 전송칸을 통해" | "다음 포트폴리오 전송칸을 통해" | "다음 사진 전송칸을 통해" | "다음 포트폴리오 전송칸을 통해" &&>,
        <&& "추천서 사진을 전송해 주세요!" | "추천서 사진을 전송해 주세요!" | "추천서 사진을 전송해 주세요!" | "이미지를 전송해 주세요!" | "추천서 사진을 전송해 주세요!" &&>,
        <&& "가로, 세로 합쳐 최소 8장의 사진을" | "가로, 세로 합쳐 최소 8장의 사진을" | "가로, 세로 합쳐 최소 8장의 사진을" | "모두 합쳐 8장의 사진을" | "가로, 세로 합쳐 최소 8장의 사진을" &&>,
        <&& "낱개 이미지 파일로 올려주시면 됩니다." | "낱개 이미지 파일로 올려주시면 됩니다." | "이미지 파일로 올려주시면 됩니다." | "낱개로 올려주시면 됩니다." | "낱개 이미지 파일로 올려주시면 됩니다." &&>,
      ]
    };

    settingSetDescriptionContents = [];
  
    settingGaroDescriptionContents = [
      {
        title: "가로 비율",
        description: "사진의 비율은 A4와 동일 비율인 1:1.414",
      },
      {
        title: "최소 사이즈",
        description: "세로가 (짧은 쪽) 최소 1200픽셀 이상",
      },
      {
        title: "사진 개수",
        description: "합쳐서 총 최소 6장 이상, 광각컷(18mm 이하) 1장 이상",
      },
    ];
  
    settingSeroDescriptionContents = [
      {
        title: "세로 비율",
        description: "사진의 비율은 A4와 동일 비율인 1:1.414",
      },
      {
        title: "최소 사이즈",
        description: "가로가 (짧은 쪽) 최소 1200픽셀 이상",
      },
      {
        title: "사진 개수",
        description: "합쳐서 총 최소 2장 이상",
      },
    ];

  }

  if (generalMode) {
    garoRepresentativePhotoNumber = 3;
    seroRepresentativePhotoNumber0 = 6;
    seroRepresentativePhotoNumber1 = 7;
  } else {
    garoRepresentativePhotoNumber = 23;
    seroRepresentativePhotoNumber0 = 24;
    seroRepresentativePhotoNumber1 = 25;
  }

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
          await GeneralJs.ajaxJson({ message: "SetPortfolioJs.addressEvent : " + e.message }, BACKHOST + "/errorLog");
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
      marginTop: String(contentsAreaMarginTop) + ea,
      background: colorChip.white,
      borderRadius: String(5) + "px",
      boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
      paddingTop: String(innerPadding) + ea,
      paddingBottom: String(innerPadding) + ea,
    }
  });

  // example

  leftBox = createNode({
    mother: contentsArea,
    style: {
      display: desktop ? "inline-block" : "block",
      position: "relative",
      marginLeft: String(innerPadding) + ea,
      width: desktop ? String(leftBoxWidth) + ea : withOut((innerPadding * 2), ea),
      verticalAlign: "top",
      paddingTop: desktop ? "" : String(1) + ea,
      marginBottom: desktop ? "" : String(4) + ea,
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
    text: contents.sub.join(desktop ? "\n" : " "),
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

  // description - set
  if (generalMode) {
    exampleTong = createNode({
      mother: rightBox,
      style: {
        display: "block",
        position: "relative",
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
          text: "세트 예시",
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
            top: String(desktop ? grayTextAreaTop : mobileGrayTextAreaTop) + ea,
            padding: String(settingTongPaddingLeft) + ea,
            paddingTop: String(settingTongPaddingTop) + ea,
            paddingBottom: String(settingTongPaddingTop - settingTongImageBetween) + ea,
            paddingRight: String(settingTongPaddingLeft - settingTongImageBetween) + ea,
            width: desktop ? withOut((circleRadius * 2) + circleBetween + titleWidth + (settingTongPaddingLeft * 2) - settingTongImageBetween, ea) : withOut((settingTongPaddingLeft * 2) - settingTongImageBetween, ea),
            background: colorChip.gray1,
            borderRadius: String(3) + "px",
            borderBottomRightRadius: String(0)  + "px",
            borderBottomLeftRadius: String(0)  + "px",
            cursor: "pointer",
            textAlign: "center",
          },
        },
      ]
    }).lastChild;
    for (let i = 0; i < pictureNumber; i++) {
      createNode({
        mother: exampleTong,
        mode: "img",
        attribute: { src: SetPortfolioJs.binaryPath + "/set/t" + String(i + 1) + ".jpg" },
        style: {
          display: "inline-block",
          position: "relative",
          height: String(settingTongImageHeight) + ea,
          borderRadius: String(3) + "px",
          marginRight: String(settingTongImageBetween) + ea,
          marginBottom: String(settingTongImageBetween) + ea,
        }
      });
    }
    exampleDescriptionTong = createNode({
      mother: rightBox,
      style: {
        display: "block",
        position: "relative",
        marginBottom: String(blockMarginBottom) + ea,
      },
      children: [
        {
          style: {
            display: mobile ? "none" : "inline-block",
            position: "relative",
            width: String(circleRadius * 2) + ea,
            height: String(circleRadius * 2) + ea,
            marginRight: String(circleBetween) + ea,
            borderRadius: String(circleRadius) + ea,
            background: "transparent",
            top: String(circleTop) + ea,
            verticalAlign: "top",
          }
        },
        {
          text: "",
          style: {
            display: mobile ? "none" : "inline-block",
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
            top: String(desktop ? grayTextAreaTop : mobileGrayTextAreaTop) + ea,
            padding: String(settingTongPaddingTop) + ea,
            width: desktop ? withOut((circleRadius * 2) + circleBetween + titleWidth + (settingTongPaddingTop * 2), ea) : withOut(settingTongPaddingTop * 2, ea),
            background: colorChip.gray1,
            borderRadius: String(3) + "px",
            borderTopRightRadius: String(0)  + "px",
            borderTopLeftRadius: String(0)  + "px",
            paddingTop: String(0) + ea,
            cursor: "pointer",
            textAlign: "center",
          },
          child: {
            style: {
              display: "block",
              width: withOut(descriptionBlockPaddingLeft * 2, ea),
              background: colorChip.white,
              borderRadius: String(3) + "px",
              boxShadow: "0px 3px 15px -9px " + colorChip.gray4,
              padding: String(descriptionBlockPaddingLeft) + ea,
              paddingTop: String(descriptionBlockPaddingTop + descriptionBoxVisualPaddingTop) + ea,
              paddingBottom: String(descriptionBlockPaddingLeft - descriptionBlockMarginBottom + (mobile ? 0.4 : 0)) + ea,
            }
          }
        },
      ]
    }).lastChild.lastChild;
    for (let i = 0; i < settingSetDescriptionContents.length; i++) {
  
      thisTitle = settingSetDescriptionContents[i].title;
      thisDescription = settingSetDescriptionContents[i].description;
  
      descriptionBlock = createNode({
        mother: exampleDescriptionTong,
        style: {
          display: "block",
          position: "relative",
          textAlign: "left",
          marginBottom: String(descriptionBlockMarginBottom) + ea,
        }
      });
  
      createNode({
        mother: descriptionBlock,
        text: String(i + 1),
        style: {
          display: "inline-block",
          position: "relative",
          color: colorChip.green,
          fontSize: String(descriptionBlockSize) + ea,
          fontWeight: String(descriptionBlockWeight),
          width: String(descriptionBlockNumberWidth) + ea,
        }
      });
  
      createNode({
        mother: descriptionBlock,
        text: thisTitle,
        style: {
          display: "inline-block",
          position: "relative",
          color: colorChip.block,
          fontSize: String(descriptionBlockSize) + ea,
          fontWeight: String(descriptionBlockBoldWeight),
          width: String(descriptionBlockTitleWidth) + ea,
        }
      });
  
      createNode({
        mother: descriptionBlock,
        text: thisDescription,
        style: {
          display: mobile ? "block" : "inline-block",
          position: "relative",
          color: colorChip.block,
          fontSize: String(descriptionBlockSize) + ea,
          fontWeight: String(descriptionBlockWeight),
          paddingLeft: mobile ? String(descriptionBlockNumberWidth) + ea : "",
          marginTop: mobile ? String(0.8) + ea : "",
        }
      });
  
    }
  }
  
  // description - garo
  garoExampleTong = createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
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
        text: "가로 사진",
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
          top: String(desktop ? grayTextAreaTop : mobileGrayTextAreaTop) + ea,
          padding: String(settingTongPaddingLeft) + ea,
          paddingTop: String(settingTongPaddingTop) + ea,
          paddingBottom: String(settingTongPaddingTop - settingTongImageBetween) + ea,
          paddingRight: String(settingTongPaddingLeft - settingTongImageBetween) + ea,
          width: desktop ? withOut((circleRadius * 2) + circleBetween + titleWidth + (settingTongPaddingLeft * 2) - settingTongImageBetween, ea) : withOut((settingTongPaddingLeft * 2) - settingTongImageBetween, ea),
          background: colorChip.gray1,
          borderRadius: String(3) + "px",
          borderBottomRightRadius: String(0)  + "px",
          borderBottomLeftRadius: String(0)  + "px",
          cursor: "pointer",
          textAlign: "center",
        },
      },
    ]
  }).lastChild;
  createNode({
    mother: garoExampleTong,
    mode: "img",
    attribute: { src: SetPortfolioJs.binaryPath + "/set/t" + String(garoRepresentativePhotoNumber) + ".jpg" },
    style: {
      display: "inline-block",
      position: "relative",
      height: String(garoImageHeight) + ea,
      borderRadius: String(3) + "px",
      marginRight: String(settingTongImageBetween) + ea,
      marginBottom: String(settingTongImageBetween) + ea,
    }
  });
  garoExampleDescriptionTong = createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(blockMarginBottom) + ea,
    },
    children: [
      {
        style: {
          display: mobile ? "none" : "inline-block",
          position: "relative",
          width: String(circleRadius * 2) + ea,
          height: String(circleRadius * 2) + ea,
          marginRight: String(circleBetween) + ea,
          borderRadius: String(circleRadius) + ea,
          background: "transparent",
          top: String(circleTop) + ea,
          verticalAlign: "top",
        }
      },
      {
        text: "",
        style: {
          display: mobile ? "none" : "inline-block",
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
          top: String(desktop ? grayTextAreaTop : mobileGrayTextAreaTop) + ea,
          padding: String(settingTongPaddingTop) + ea,
          width: desktop ? withOut((circleRadius * 2) + circleBetween + titleWidth + (settingTongPaddingTop * 2), ea) : withOut((settingTongPaddingTop * 2), ea),
          background: colorChip.gray1,
          borderRadius: String(3) + "px",
          borderTopRightRadius: String(0)  + "px",
          borderTopLeftRadius: String(0)  + "px",
          paddingTop: String(0) + ea,
          cursor: "pointer",
          textAlign: "center",
        },
        child: {
          style: {
            display: "block",
            width: withOut(descriptionBlockPaddingLeft * 2, ea),
            background: colorChip.white,
            borderRadius: String(3) + "px",
            boxShadow: "0px 3px 15px -9px " + colorChip.gray4,
            padding: String(descriptionBlockPaddingLeft) + ea,
            paddingTop: String(descriptionBlockPaddingTop + descriptionBoxVisualPaddingTop) + ea,
            paddingBottom: String(descriptionBlockPaddingLeft - descriptionBlockMarginBottom + (mobile ? 0.4 : 0)) + ea,
          }
        }
      },
    ]
  }).lastChild.lastChild;
  for (let i = 0; i < settingGaroDescriptionContents.length; i++) {

    thisTitle = settingGaroDescriptionContents[i].title;
    thisDescription = settingGaroDescriptionContents[i].description;

    descriptionBlock = createNode({
      mother: garoExampleDescriptionTong,
      style: {
        display: "block",
        position: "relative",
        textAlign: "left",
        marginBottom: String(descriptionBlockMarginBottom) + ea,
      }
    });

    createNode({
      mother: descriptionBlock,
      text: String(i + 1),
      style: {
        display: "inline-block",
        position: "relative",
        color: colorChip.green,
        fontSize: String(descriptionBlockSize) + ea,
        fontWeight: String(descriptionBlockWeight),
        width: String(descriptionBlockNumberWidth) + ea,
      }
    });

    createNode({
      mother: descriptionBlock,
      text: thisTitle,
      style: {
        display: "inline-block",
        position: "relative",
        color: colorChip.block,
        fontSize: String(descriptionBlockSize) + ea,
        fontWeight: String(descriptionBlockBoldWeight),
        width: String(descriptionBlockTitleWidth) + ea,
      }
    });

    createNode({
      mother: descriptionBlock,
      text: thisDescription,
      style: {
        display: mobile ? "block" : "inline-block",
        position: "relative",
        color: colorChip.block,
        fontSize: String(descriptionBlockSize) + ea,
        fontWeight: String(descriptionBlockWeight),
        paddingLeft: mobile ? String(descriptionBlockNumberWidth) + ea : "",
        marginTop: mobile ? String(0.8) + ea : "",
      }
    });

  }

  // description - sero
  seroExampleTong = createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
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
        text: "세로 사진",
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
          top: String(desktop ? grayTextAreaTop : mobileGrayTextAreaTop) + ea,
          padding: String(settingTongPaddingLeft) + ea,
          paddingTop: String(settingTongPaddingTop) + ea,
          paddingBottom: String(settingTongPaddingTop - settingTongImageBetween) + ea,
          paddingRight: String(settingTongPaddingLeft - settingTongImageBetween) + ea,
          width: desktop ? withOut((circleRadius * 2) + circleBetween + titleWidth + (settingTongPaddingLeft * 2) - settingTongImageBetween, ea) : withOut((settingTongPaddingLeft * 2) - settingTongImageBetween, ea),
          background: colorChip.gray1,
          borderRadius: String(3) + "px",
          borderBottomRightRadius: String(0)  + "px",
          borderBottomLeftRadius: String(0)  + "px",
          cursor: "pointer",
          textAlign: "center",
        },
      },
    ]
  }).lastChild;
  createNode({
    mother: seroExampleTong,
    mode: "img",
    attribute: { src: SetPortfolioJs.binaryPath + "/set/t" + String(seroRepresentativePhotoNumber0) + ".jpg" },
    style: {
      display: "inline-block",
      position: "relative",
      height: String(seroImageHeight) + ea,
      borderRadius: String(3) + "px",
      marginRight: String(settingTongImageBetween) + ea,
      marginBottom: String(settingTongImageBetween) + ea,
    }
  });
  createNode({
    mother: seroExampleTong,
    mode: "img",
    attribute: { src: SetPortfolioJs.binaryPath + "/set/t" + String(seroRepresentativePhotoNumber1) + ".jpg" },
    style: {
      display: "inline-block",
      position: "relative",
      height: String(seroImageHeight) + ea,
      borderRadius: String(3) + "px",
      marginRight: String(settingTongImageBetween) + ea,
      marginBottom: String(settingTongImageBetween) + ea,
    }
  });
  seroExampleDescriptionTong = createNode({
    mother: rightBox,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(blockMarginBottom) + ea,
    },
    children: [
      {
        style: {
          display: mobile ? "none" : "inline-block",
          position: "relative",
          width: String(circleRadius * 2) + ea,
          height: String(circleRadius * 2) + ea,
          marginRight: String(circleBetween) + ea,
          borderRadius: String(circleRadius) + ea,
          background: "transparent",
          top: String(circleTop) + ea,
          verticalAlign: "top",
        }
      },
      {
        text: "",
        style: {
          display: mobile ? "none" : "inline-block",
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
          top: String(desktop ? grayTextAreaTop : mobileGrayTextAreaTop) + ea,
          padding: String(settingTongPaddingTop) + ea,
          width: desktop ? withOut((circleRadius * 2) + circleBetween + titleWidth + (settingTongPaddingTop * 2), ea) : withOut(settingTongPaddingTop * 2, ea),
          background: colorChip.gray1,
          borderRadius: String(3) + "px",
          borderTopRightRadius: String(0)  + "px",
          borderTopLeftRadius: String(0)  + "px",
          paddingTop: String(0) + ea,
          cursor: "pointer",
          textAlign: "center",
        },
        child: {
          style: {
            display: "block",
            width: withOut(descriptionBlockPaddingLeft * 2, ea),
            background: colorChip.white,
            borderRadius: String(3) + "px",
            boxShadow: "0px 3px 15px -9px " + colorChip.gray4,
            padding: String(descriptionBlockPaddingLeft) + ea,
            paddingTop: String(descriptionBlockPaddingTop + descriptionBoxVisualPaddingTop) + ea,
            paddingBottom: String(descriptionBlockPaddingLeft - descriptionBlockMarginBottom + (mobile ? 0.4 : 0)) + ea,
          }
        }
      },
    ]
  }).lastChild.lastChild;
  for (let i = 0; i < settingSeroDescriptionContents.length; i++) {

    thisTitle = settingSeroDescriptionContents[i].title;
    thisDescription = settingSeroDescriptionContents[i].description;

    descriptionBlock = createNode({
      mother: seroExampleDescriptionTong,
      style: {
        display: "block",
        position: "relative",
        textAlign: "left",
        marginBottom: String(descriptionBlockMarginBottom) + ea,
      }
    });

    createNode({
      mother: descriptionBlock,
      text: String(i + 1),
      style: {
        display: "inline-block",
        position: "relative",
        color: colorChip.green,
        fontSize: String(descriptionBlockSize) + ea,
        fontWeight: String(descriptionBlockWeight),
        width: String(descriptionBlockNumberWidth) + ea,
      }
    });

    createNode({
      mother: descriptionBlock,
      text: thisTitle,
      style: {
        display: "inline-block",
        position: "relative",
        color: colorChip.block,
        fontSize: String(descriptionBlockSize) + ea,
        fontWeight: String(descriptionBlockBoldWeight),
        width: String(descriptionBlockTitleWidth) + ea,
      }
    });

    createNode({
      mother: descriptionBlock,
      text: thisDescription,
      style: {
        display: mobile ? "block" : "inline-block",
        position: "relative",
        color: colorChip.block,
        fontSize: String(descriptionBlockSize) + ea,
        fontWeight: String(descriptionBlockWeight),
        paddingLeft: mobile ? String(descriptionBlockNumberWidth) + ea : "",
        marginTop: mobile ? String(0.8) + ea : "",
      }
    });

  }

  // bar

  secondLeftBox = createNode({
    mother: contentsArea,
    style: {
      display: "block",
      position: "relative",
      marginLeft: String(innerPadding) + ea,
      width: withOut(innerPadding * 2, ea),
      verticalAlign: "top",
      borderBottom: "1px dashed " + colorChip.gray3,
      height: String(middleBarHeight) + ea,
      marginBottom: String(middleBarMarginBottom) + ea,
    }
  });


  // portfolio

  secondLeftBox = createNode({
    mother: contentsArea,
    style: {
      display: desktop ? "inline-block" : "block",
      position: "relative",
      marginLeft: String(innerPadding) + ea,
      width: desktop ? String(leftBoxWidth) + ea : withOut((innerPadding * 2), ea),
      verticalAlign: "top",
      paddingTop: desktop ? "" : String(1) + ea,
      marginBottom: desktop ? "" : String(4) + ea,
    }
  });

  createNode({
    mother: secondLeftBox,
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
    mother: secondLeftBox,
    text: contents2.sub.join(desktop ? "\n" : " "),
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

  secondRightBox = createNode({
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

  // 23
  portfolioBlock = createNode({
    mother: secondRightBox,
    style: {
      display: "block",
      position: "relative",
      marginBottom: String(desktop ? blockMarginBottom : (generalMode ? 5 : 3)) + ea,
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
            if (generalMode) {
              if ([ ...e.dataTransfer.files ].map((file) => { return file.type }).filter((str) => { return !/zip/.test(str) }).length > 0) {
                window.alert("zip 파일로만 올려주세요!");
              } else {
                this.querySelector("input").files = e.dataTransfer.files;
                fileChangeEvent.call(this.querySelector("input"), e);
              }
            } else {
              if ([ ...e.dataTransfer.files ].map((file) => { return file.type }).filter((str) => { return !/^image/.test(str) }).filter((str) => { return !/pdf/.test(str) }).length > 0) {
                window.alert("이미지 또는 pdf 파일로만 올려주세요!");
              } else {
                this.querySelector("input").files = e.dataTransfer.files;
                fileChangeEvent.call(this.querySelector("input"), e);
              }
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
              accept: generalMode ? "application/zip" : "image/*,  application/pdf",
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

  // 25
  if (generalMode) {
    longDom = createNode({
      mother: secondRightBox,
      style: {
        display: "block",
        position: "relative",
        marginBottom: desktop ? String(blockMarginBottom) + ea : String(1) + ea,
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
          text: "공간 설명",
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
  }

  this.fileInput = portfolioBlock.querySelector("input");

  // policy and submit
  policyArea = createNode({
    mother: mainBlock,
    style: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
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

  if (generalMode) {
    submitTong = createNode({
      mother: policyArea,
      style: {
        display: "inline-block",
        position: "relative",
        textAlign: "center",
        marginRight: String(submitTongBetween) + ea,
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
              text: generalMode ? "포트폴리오 전송하기" : "추천서 사진 전송하기",
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

    denyTong = createNode({
      mother: policyArea,
      style: {
        display: "inline-block",
        position: "relative",
        textAlign: "center",
      },
      children: [
        {
          event: {
            click: function (e) {
              window.location.href = window.location.protocol + "//" + window.location.host + window.location.pathname + "?" + "desid=" + instance.desid + "&mode=proposal";
            }
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
              text: "세트 포트폴리오 없음",
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
  } else {
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
              text: generalMode ? "포트폴리오 전송하기" : "추천서 사진 전송하기",
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

}

SetPortfolioJs.prototype.finalSubmit = function () {
  const instance = this;
  const inputClassName = "inputClassName";
  const agreeTargetClassName = "agreeTargetClassName";
  const { ajaxJson, colorChip, findByAttribute, scrollTo, dateToString, sleep, selfHref, homeliaisonAnalytics, setQueue, ajaxForm, equalJson } = GeneralJs;
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
      let description;

      if (instance.fileInput.files.length === 0) {
        window.alert("포트폴리오를 반드시 제출하셔야 합니다!");
      } else {

        description = '';
        if (targets.length > 0) {
          try {
            description = targets[0].value.trim().replace(/[\=\+\&\>\<\/\\\{\}\[\]\`]/gi, '');
          } catch (e) {
            description = '';
          }
        } else {
          description = '';
        }

        await homeliaisonAnalytics({
          page: instance.pageName,
          standard: instance.firstPageViewTime,
          action: "designerSettingSend",
          data: {
            desid: instance.desid,
            date: dateToString(new Date(), true),
          },
        });

        grayLoading = instance.mother.whiteProgressLoading();
        formData = new FormData();
        formData.enctype = "multipart/form-data";
        formData.append("desid", instance.desid);
        formData.append("mode", instance.mode);
        formData.append("name", instance.designer.designer);
        formData.append("phone", instance.designer.information.phone);
        formData.append("description", description);
        cancelPhoto = JSON.parse(instance.fileInput.getAttribute("cancel"));
        for (let i = 0; i < instance.fileInput.files.length; i++) {
          if (!cancelPhoto.includes(i)) {
            formData.append((instance.mode === "general" ? "upload0" : "upload1"), instance.fileInput.files[i]);
          }
        }
        await ajaxForm(formData, BRIDGEHOST + "/designerSettingBinary", grayLoading.progress.firstChild);
        
        grayLoading.remove();
        GeneralJs.scrollTo(window, 0);
        window.alert("전송이 완료되었습니다! 확인 후 연락드리겠습니다 :)");
        selfHref(FRONTHOST + "/designer/dashboard.php?desid=" + instance.desid);

      }

    } catch (e) {
      console.log(e);
      window.location.reload();
    }
  }
}

SetPortfolioJs.prototype.launching = async function (loading) {
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
    const mode = (getObj.mode === undefined) ? "general" : getObj.mode;
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

    this.inputClassName = "consultingInput";
    this.mode = mode;
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
      name: "setPortfolio",
      designer: this.designer,
      base: {
        instance: this,
        binaryPath: SetPortfolioJs.binaryPath,
        subTitle: "",
      },
      local: async () => {
        try {
          let whiteBlock;
          instance.insertInitBox();
          instance.insertSettingBox();
        } catch (e) {
          await GeneralJs.ajaxJson({ message: "SetPortfolioJs.launching.ghostDesignerLaunching : " + e.message }, BACKHOST + "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

  } catch (err) {
    console.log(err);
    await GeneralJs.ajaxJson({ message: "SetPortfolioJs.launching 에러 일어남 => " + err.message }, BACKHOST + "/errorLog");
  }
}
