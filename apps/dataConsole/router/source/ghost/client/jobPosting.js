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
      "return ('홈리에종 채용 공고 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('홈리에종 채용 공고 페이지 입니다! | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "jobPosting",
  "hangul": "채용 공고",
  "route": [
    "jobPosting"
  ]
} %/%/g

const JobPostingJs = function () {
  this.mother = new GeneralJs();
}

JobPostingJs.binaryPath = FRONTHOST + "/middle/aspirant";

JobPostingJs.prototype.insertInitBox = function () {
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

  titleWording = "CX 마케터 채용";
  subTitleContents = "지원서를 남겨주시면, 확인 후 연락드립니다!";

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

JobPostingJs.prototype.insertPostingBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, ajaxJson, equalJson, cleanChildren } = GeneralJs;
  const { ea, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let mainBlock;
  let mainPaddingTop, mainPaddingBottom;
  let contentsAreaMarginTop;
  let titleArea, contentsArea;
  let innerPadding;
  let blockHeight;
  let bottomMargin;
  let margin;
  let baseUrl;
  let frontSource, backSource;

  blockHeight = <%% 784, 765, 725, 710, 176 %%>;
  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 52, 52, 44, 32, 52 %%>;
  
  contentsAreaMarginTop = <%% 45, 40, 34, 28, 6 %%>;

  mainPaddingTop = <%% (isMac() ? 133 : 131), (isMac() ? 135 : 135), (isMac() ? 103 : 102), (isMac() ? 83 : 82), 10 %%>;
  mainPaddingBottom = <%% (isMac() ? 153 : 151), (isMac() ? 155 : 155), (isMac() ? 118 : 117), (isMac() ? 98 : 97), 20 %%>;

  innerPadding = <%% 60, 50, 45, 40, 6 %%>;

  baseUrl = BRIDGEHOST.replace(/\:3000$/gi, '') + "/temporaryPage/cx2307/image/";
  frontSource = <&& "big_desktop_front.png" | "middle_desktop_front.png" | "small_desktop_front.png" | "micro_desktop_front.png" | "general_mobile_front.png" &&>;
  backSource = <&& "big_desktop_back.jpg" | "middle_desktop_back.jpg" | "small_desktop_back.jpg" | "micro_desktop_back.jpg" | "general_mobile_back.jpg" &&>;

  mainBlock = createNode({
    mother: this.baseTong,
    style: {
      display: "block",
      position: "relative",
    }
  });

  contentsArea = createNode({
    mother: mainBlock,
    style: {
      display: "block",
      position: "relative",
      width: withOut(innerPadding * 2, ea),
      marginTop: String(contentsAreaMarginTop) + ea,
      background: colorChip.white,
      borderRadius: String(5) + "px",
      boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
      paddingTop: String(innerPadding) + ea,
      paddingBottom: String(innerPadding) + ea,
      paddingLeft: String(innerPadding) + ea,
      paddingRight: String(innerPadding) + ea,
    }
  });

  createNode({
    mother: contentsArea,
    mode: "img",
    attribute: {
      src: baseUrl + backSource,
    },
    style: {
      display: "block",
      width: withOut(0, ea),
      position: "relative",
      borderRadius: String(5) + "px",
    }
  });

  createNode({
    mother: contentsArea,
    mode: "img",
    attribute: {
      src: baseUrl + frontSource,
    },
    style: {
      display: "block",
      width: withOut(innerPadding * 2, ea),
      position: "absolute",
      top: String(innerPadding) + ea,
      left: String(innerPadding) + ea,
      borderRadius: String(5) + "px",
    }
  });

}

JobPostingJs.prototype.insertApplyBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, ajaxJson, equalJson, cleanChildren } = GeneralJs;
  const { ea, media, standardWidth, portfolioMode } = this;
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
  let factorBetween;
  let inputTop;
  let titleWidth;
  let grayWidth;
  let subFontSize, subFontTop, subFontBetween;
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
  let plusSize;
  let questionWeight;
  let plusTextTop;
  let noticeCircleWidth;
  let noticeCircleTop;
  let noticeCircleMargin;
  let careerBlocksRender;
  let careerBlockGrayOuterMargin;
  let careerBlockOuterMargin;
  let careerBlockOuterMarginTop;
  let careerBlockOuterMarginBottom;
  let careerBlockInnerMargin;
  let careerBlockInnerMarginSmall;
  let careerBlockSize;
  let blockCancelWidth;
  let blockCancelTop;
  let tempBlock;
  let careerBlockMarginLeft;
  let propertyWidth;
  let yearWidth, monthWidth;
  let yearMonthTextWidth;
  let yearMonthTextMargin;
  let careerBlockLeftMinus;
  let textareaVisualTop;
  let plusBlockEvent;
  let plusValueCareer;

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

  contentsAreaMarginTop = <%% 15, 15, 12, 10, 2 %%>;

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
  submitButtonWidth = <%% 110, 110, 110, 110, 36 %%>;
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

  plusTextTop = <%% -1, -1.5, -1.5, -1.5, -0.2 %%>;

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

  careerBlockMarginLeft = <%% 38, 30, 22, 22, 4.9 %%>;

  propertyWidth = <%% 90, 79, 69, 69, 15.7 %%>;
  yearWidth = <%% 72, 72, 64, 56, 13 %%>;
  monthWidth = <%% 40, 40, 36, 32, 8 %%>;

  yearMonthTextWidth = <%% 32, 32, 30, 24, 6 %%>;
  yearMonthTextMargin = <%% 6, 6, 5, 4, 1 %%>;

  textareaVisualTop = <%% 38, 35, 34, 32, 8 %%>;

  contents = {
    main: [
      "홈리에종 CX 지원",
    ],
    sub: [
      <&& "홈리에종 CX 마케터 지원을 위해서는" | "CX 마케터 지원을 위해서는" | "CX 마케터 지원을 위해서는" | "CX 지원을 위해서는" | "CX 마케터 지원을 위해서는"&&>,
      <&& "다음과 같은 기본 정보가 필요합니다." | "다음 기본 정보가 필요합니다." | "기본 정보가 필요합니다." | "기본 정보가 필요합니다." | "다음 기본 정보가 필요합니다." &&>,
      "지원서를 작성해주시면,",
      <&& "확인 후 연락 드리겠습니다." | "확인 후 연락 드리겠습니다." | "확인 후 연락 드리겠습니다." | "연락 드리겠습니다." | "확인 후 연락 드리겠습니다." &&>,
    ]
  };

  careerBlocksRender = () => {};

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

  plusValueCareer = async (matrix, tong) => {
    try {
      const pipe = "&nbsp;&nbsp;<u%|%u>&nbsp;&nbsp;";
      const titleArr = [
        "회사",
        "담당 업무",
        "기간",
      ];
      let company, team, role, start, end;
      let block;
      let original;
      let whereQuery, updateQuery;
      let endMatrix;

      company = matrix[0][1];
      team = matrix[1][1];
      role = matrix[2][1];
      start = matrix[3][1];
      end = matrix[4][1];

      block = {
        company,
        team,
        role,
        date: { start, end }
      };

      original = [];
      original.push(block);
      original.sort((a, b) => { return b.date.start.valueOf() - a.date.start.valueOf() });

      endMatrix = original.map((obj) => {
        const endDate = (obj.date.end.valueOf() > (new Date(3000, 0, 1)).valueOf()) ? new Date() : obj.date.end;
        const startDate = obj.date.start;
        const startWords = (String(obj.date.start.getFullYear()).slice(2) + "." + String(obj.date.start.getMonth() + 1));
        const endWords = (obj.date.end.valueOf() > (new Date(3000, 0, 1)).valueOf()) ? "재직중" : (String(obj.date.end.getFullYear()).slice(2) + "." + String(obj.date.end.getMonth() + 1));
        const delta = endDate.valueOf() - startDate.valueOf();
        const deltaDates = Math.round((((delta / 1000) / 60) / 60) / 24);
        const rangeWords = String(Math.floor(deltaDates / 365)) + "년 " + String(Math.floor((deltaDates % 365) / 30)) + "개월" + "&nbsp;&nbsp;(" + startWords + " ~ " + endWords + ")";
        return {
          title: titleArr,
          value: [
            obj.company + pipe + obj.team,
            obj.role,
            rangeWords,
            obj.tag,
          ]
        };
      });
      careerBlocksRender(endMatrix, tong);

    } catch (e) {
      console.log(e);
    }
  }

  plusBlockEvent = (mode, index = -1, method = 0) => {
    let valueTargets;
    if (method === 0) {
      valueTargets = [
        { name: "회사", type: "string" },
        { name: "부서", type: "string" },
        { name: "담당 업무", type: "string" },
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
              tempValue = await GeneralJs.promptDate(obj.name + "을(를) 알려주세요!", obj.progressBoo, obj.progressName);
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



          // await instance.contents[x].contents[z].plusValue(valueMatrix, instance.designer, this.parentElement.nextElementSibling);
        } else {
          // await instance.contents[x].contents[z].updateValue({
          //   mode: "update",
          //   index,
          //   value: valueMatrix,
          //   tong: this.parentElement.parentElement.parentElement,
          // }, instance.designer);
        }
      } catch (e) {
        window.alert("입력을 취소하셨습니다! 처음부터 다시 진행해주세요!");
      }
    }
  }

  careerBlocksRender = (value, tong) => {
    cleanChildren(tong);
    createNode({
      mother: tong,
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
              event: {
                click: async function (e) {
                  try {
                    const index = Number(this.parentElement.getAttribute("index"));
                    const updateFunction = plusBlockEvent("create", index, 0);
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
              },
              event: {
                click: async function (e) {
                  try {
                    const index = Number(this.getAttribute("index"));

                    
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
  };

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
        style: {
          display: "inline-block",
          verticalAlign: "top",
          position: "relative",
          top: String(grayTop) + ea,
          marginLeft: String(careerBlockMarginLeft) + ea,
          width: withOut(leftGrayType0, ea),
          "min-height": String(grayHeight) + ea,
          background: colorChip.gray1,
          borderRadius: String(3) + "px",
        }
      },
    ]
  });
  careerBlocksRender([{
    title: [
      "회사",
      "담당 업무",
      "기간",
    ],
    value: [
      "회사명",
      "담당 업무 상세",
      "총 기간",
    ]
  }], tempBlock.children[3]);
  // 8
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
        style: {
          display: "inline-block",
          verticalAlign: "top",
          position: "relative",
          top: String(grayTop) + ea,
          marginLeft: String(careerBlockMarginLeft) + ea,
          width: withOut(leftGrayType0, ea),
          "min-height": String(grayHeight) + ea,
          background: colorChip.gray1,
          borderRadius: String(3) + "px",
        }
      },
    ]
  });
  careerBlocksRender([{
    title: [
      "학교",
      "전공",
      "졸업",
    ],
    value: [
      "학교명",
      "전공명",
      "총 기간",
    ]
  }], tempBlock.children[3]);




  // 9
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
        text: "자기소개서",
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
          height: String(grayBigHeight) + ea,
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
          height: String(grayBigHeight - (textareaTop * 1)) + ea,
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
            text: "지원하기",
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

JobPostingJs.prototype.finalSubmit = function () {
  const instance = this;
  const inputClassName = "inputClassName";
  const agreeTargetClassName = "agreeTargetClassName";
  const { ajaxJson, colorChip, findByAttribute, scrollTo, dateToString, sleep, selfHref, homeliaisonAnalytics, setQueue, ajaxForm } = GeneralJs;
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
                } else if (p === "interior") {
                  firstDom.value = firstDom.value.trim();
                  if (firstDom.value.trim() === '') {
                    throw new Error("인테리어 경력을 적어주세요!");
                  }
                } else if (p === "styling") {
                  firstDom.value = firstDom.value.trim();
                  if (firstDom.value.trim() === '') {
                    throw new Error("스타일링 경력을 적어주세요!");
                  }
                } else if (p === "career") {
                  firstDom.value = firstDom.value.trim();
                  if (firstDom.value.trim() === '') {
                    throw new Error("경력 상세를 적어주세요!");
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
                  selfHref(FRONTHOST);
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

JobPostingJs.prototype.insertPannelBox = function () {
  const instance = this;
  const { ea, baseTong, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, isIphone } = GeneralJs;
  let whiteBlock;
  let style;
  let blockHeight, blockMarginBottom;
  let designerButtonTong;
  let designerButtonBar;
  let designerButtonBarHead;
  let designerButton;
  let designerButtonText;
  let buttonHeight, buttonWidth;
  let buttonMargin;
  let buttonTextTop, buttonTextSize;
  let headWidth, headVisual;
  let informationArea;
  let wordSpacing;
  let finalBottom;
  let grayTong, grayTextScroll, grayTextTong;
  let grayHeight, grayTop, grayTextTop, grayTextLeft, grayTextSize;
  let buttonOff, buttonOn;
  let buttonTongHeight, grayButtonHeight;
  let margin, paddingTop;

  margin = <%% 52, 52, 44, 36, 4.7 %%>;
  paddingTop =  <%% 46, 46, 40, 32, 4.7 %%>;

  blockHeight = <%% 820, 820, 820, 820, 820 %%>;
  blockMarginBottom = <%% 160, 160, 160, 80, 12 %%>;

  buttonHeight = <%% 47, 48, 48, 40, 8.4 %%>;
  buttonWidth = <%% 156, 156, 156, 126, 28 %%>;
  buttonMargin = <%% 8, 8, 8, 5, 2 %%>;

  buttonTextTop = <%% 8, 8, 8, 8, (isIphone() ? 1.1 : 1.3) %%>;
  buttonTextSize = <%% 20, 20, 20, 16, 3.8 %%>;

  if (desktop) {
    buttonTextTop = buttonTextTop + (isMac() ? 0 : 1);
  }

  headWidth = <%% 10, 10, 10, 10, 2 %%>;
  headVisual = <%% 11, 11, 11, 11, 11 %%>;

  wordSpacing = <%% -1, -1, -1, -1, -1 %%>;

  finalBottom = <%% paddingTop + 6, paddingTop + 6, paddingTop + 6, paddingTop + 6, 8 %%>;

  grayHeight = <%% 180, 180, 180, 180, 42 %%>;
  grayTop = <%% 5, 5, 5, 5, 0 %%>;
  grayTextTop = <%% 22, 22, 20, 20, 3 %%>;
  grayTextLeft = <%% 22, 20, 18, 15, 3 %%>;
  grayTextSize = <%% 12, 12, 10, 10, 2 %%>;

  buttonTongHeight = <%% 30, 30, 30, 30, 5 %%>;
  grayButtonHeight = <%% 13, 13, 12, 11, 2.5 %%>;

  buttonOn = {};

  whiteBlock = createNode({
    mother: this.baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 3) + "px",
      paddingTop: String(paddingTop) + ea,
      paddingLeft: String(margin) + ea,
      paddingRight: String(margin) + ea,
      width: withOut(margin * 2, ea),
      height: String(blockHeight) + ea,
      background: colorChip.white,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
      marginBottom: String(blockMarginBottom) + ea,
    }
  });

  [ grayTong, grayTextScroll, grayTextTong ] = createNodes([
    {
      mother: whiteBlock,
      style: {
        position: "relative",
        left: String(0) + ea,
        width: withOut(0 * 2, ea),
        marginTop: String(grayTop) + ea,
        marginBottom: String(desktop ? 15 : 2.5) + ea,
        height: String(grayHeight) + ea,
        background: colorChip.gray1,
        borderRadius: String(3) + "px",
      }
    },
    {
      mother: -1,
      style: {
        position: "absolute",
        top: String(grayTextTop) + ea,
        left: String(grayTextLeft) + ea,
        width: withOut(grayTextLeft * 2, ea),
        height: withOut(grayTextTop * 2, ea),
        overflow: "scroll",
      }
    },
    {
      mother: -1,
      style: {
        position: "absolute",
        top: String(0) + ea,
        left: String(0) + ea,
        width: String(100) + '%',
        height: "auto",
        fontSize: String(grayTextSize) + ea,
        fontWeight: String(300),
        lineHeight: String(1.6),
      }
    },
  ]);

  [ buttonTong ] = createNodes([
    {
      mother: whiteBlock,
      attribute: [
        { toggle: "on" }
      ],
      events: [
        {
          type: "click",
          event: function (e) {
            if (buttonOn.style !== undefined) {
              if (this.getAttribute("toggle") === "on") {
                buttonOn.style.opacity = String(0);
                this.setAttribute("toggle", "off");
              } else {
                buttonOn.style.opacity = String(1);
                this.setAttribute("toggle", "on");
              }
            }
          }
        }
      ],
      style: {
        position: "relative",
        left: String(0) + ea,
        width: withOut(0 * 2, ea),
        height: String(buttonTongHeight) + ea,
        cursor: "pointer",
      }
    },
  ]);

  ajaxJson({}, BACKHOST + "/designerProposal_policy").then(function (res) {
    const { policy, button } = res;
    let bTags;

    grayTextTong.insertAdjacentHTML("beforeend", policy);
    bTags = grayTextTong.querySelectorAll("b");
    for (let b of bTags) {
      b.style.color = colorChip.black;
      b.style.fontWeight = String(600);
    }

    [ buttonOff, buttonOn ] = createNodes([
      {
        mother: buttonTong,
        mode: "svg",
        source: button.off,
        style: {
          position: "absolute",
          height: String(grayButtonHeight) + ea,
          right: String(0) + ea,
          top: String(0) + ea,
        }
      },
      {
        mother: buttonTong,
        mode: "svg",
        source: button.on,
        style: {
          position: "absolute",
          height: String(grayButtonHeight) + ea,
          right: String(0) + ea,
          top: String(0) + ea,
          background: colorChip.white,
        }
      },
    ]);

  }).catch(function (err) {
    throw new Error(err);
  });

  createNode({
    mother: whiteBlock,
    style: {
      position: "relative",
      height: String(buttonHeight) + ea,
      textAlign: "center",
      marginTop: desktop ? "" : String(3) + ea,
    },
    children: [
      {
        class: [ "submitButtonClassName" ],
        events: [
          {
            type: "click",
            event: instance.finalSubmit(),
          }
        ],
        style: {
          display: "inline-block",
          position: "relative",
          width: String(buttonWidth) + ea,
          height: String(100) + '%',
          background: colorChip.gradientGreen,
          borderRadius: String(5) + "px",
          cursor: "pointer",
        },
        children: [
          {
            text: "상담 신청하기",
            style: {
              position: "absolute",
              top: String(buttonTextTop) + ea,
              fontSize: String(buttonTextSize) + ea,
              fontWeight: String(400),
              color: colorChip.white,
              width: String(100) + '%',
              textAlign: "center",
            }
          }
        ]
      }
    ]
  });

  whiteBlock.style.paddingBottom = String(finalBottom) + ea;
  whiteBlock.style.height = "";

}

JobPostingJs.prototype.insertStrongBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics } = GeneralJs;
  const { ea, media, totalContents, standardWidth } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let speed;
  let mainHeight;
  let mainTong;
  let blockTong;
  let blockNumber;
  let tongPaddingLeft;
  let tongPaddingTop, tongPaddingBottom;
  let strongContents;
  let whiteTongPaddingLeft, whiteTongPaddingTop, whiteTongPaddingRight, whiteTongPaddingBottom;
  let whiteTongTitleSize;
  let iconWidth;
  let whiteTongTitleWeight;
  let whiteTongDescriptionSize;
  let whiteTongDescriptionWeight;
  let whiteTongDescriptionMarginTop;
  let whiteTongDescriptionLineHeight;
  let iconBottom;
  let iconRight;
  let blockMarginBottom;

  if (media[0]) {
    strongContents = [
      {
        title: "디자이너 추천",
        description: "선호하는 스타일과 역량이 맞는\n디자이너를 추천받을 수 있어요.",
        icon: "icons0.png",
      },
      {
        title: "홈리에종 케어",
        description: "예상하지 못한 상황에도 안심하고\n인테리어를 진행할 수 있어요.",
        icon: "icons1.png",
      },
      {
        title: "원스탑 서비스",
        description: "시공부터 스타일링까지 원스탑\n서비스를 경험할 수 있어요.",
        icon: "icons2.png",
      },
      {
        title: "선 기획 후 시공",
        description: "디자인 선 기획 후 꼭 필요한 시공\n부터 효율적으로 진행할 수 있어요.",
        icon: "icons3.png",
      },
    ]
  } else {
    strongContents = [
      {
        title: "디자이너 추천",
        description: "선호하는 스타일이 맞는\n디자이너를 추천받아요.",
        icon: "icons0.png",
      },
      {
        title: "홈리에종 케어",
        description: "문제 상황에도 안심하고\n진행할 수 있어요.",
        icon: "icons1.png",
      },
      {
        title: "원스탑 서비스",
        description: "시공부터 스타일링까지\n원스탑으로 진행해요.",
        icon: "icons2.png",
      },
      {
        title: "선 기획 후 시공",
        description: "디자인 후 꼭 필요한 시공\n부터 진행할 수 있어요.",
        icon: "icons3.png",
      },
    ]
  }

  speed = <%% 0.8, 0.8, 0.8, 0.8, 0.8 %%>;
  mainHeight = <%% 240, 240, 240, 240, 40 %%>;
  margin = <%% 12, 12, 10, 10, 2 %%>;
  blockNumber = desktop ? strongContents.length : 2;

  tongPaddingLeft = 0;
  tongPaddingTop = <%% 16, 16, 16, 12, 3 %%>;
  tongPaddingBottom = <%% 180, 160, 150, 80, 14 %%>;

  whiteTongPaddingLeft = <%% 32, 26, 26, 21, 4 %%>;
  whiteTongPaddingTop = <%% 21, 18, 18, 15, 3.5 %%>;
  whiteTongPaddingRight = <%% 84, 50, 50, 42, 5 %%>;
  whiteTongPaddingBottom = <%% 28, 25, 24, 20, 4 %%>;

  whiteTongTitleSize = <%% 18, 16, 16, 14, 3.5 %%>;
  whiteTongTitleWeight = <%% 700, 700, 700, 700, 700 %%>;

  whiteTongDescriptionSize = <%% 14, 13, 13, 11, 2.5 %%>;
  whiteTongDescriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
  whiteTongDescriptionMarginTop = <%% 7, 7, 5, 5, 1.2 %%>;
  whiteTongDescriptionLineHeight = <%% 1.55, 1.55, 1.55, 1.55, 1.55 %%>;

  iconWidth = <%% 24, 24, 24, 18, 5 %%>;
  iconBottom = <%% 32, 28, 28, 24, 4.8 %%>;
  iconRight = <%% 28, 20, 20, 18, 2.8 %%>;

  blockMarginBottom = <%% 3, 3, 3, 3, 2 %%>;

  mainTong = createNode({
    mother: totalContents,
    style: {
      display: "block",
      position: "relative",
      animation: "justfadeinoriginal " + String(speed) + "s ease forwards",
    },
  });

  blockTong = createNode({
    mother: mainTong,
    style: {
      display: "block",
      position: "relative",
      width: String((standardWidth - (tongPaddingLeft * 2)) + margin) + ea,
      paddingTop: String(tongPaddingTop) + ea,
      paddingBottom: String(tongPaddingBottom) + ea,
      left: "calc(50% - " + String((standardWidth - (tongPaddingLeft * 2)) / 2) + ea + ")",
    }
  });

  for (let i = 0; i < strongContents.length; i++) {
    createNode({
      mother: blockTong,
      style: {
        display: "inline-block",
        position: "relative",
        width: "calc(calc(calc(100% - " + String(margin * blockNumber) + ea + ") / " + String(blockNumber) + ") - " + String(whiteTongPaddingLeft + whiteTongPaddingRight) + ea + ")",
        paddingTop: String(whiteTongPaddingTop) + ea,
        paddingLeft: String(whiteTongPaddingLeft) + ea,
        paddingRight: String(whiteTongPaddingRight) + ea,
        paddingBottom: String(whiteTongPaddingBottom) + ea,
        marginRight: String(margin) + ea,
        borderRadius: String(5) + "px",
        background: colorChip.white,
        boxShadow: "0px 3px 13px -9px " + colorChip.shadow,
        marginBottom: desktop ? "" : String(blockMarginBottom) + ea,
      },
      children: [
        {
          text: strongContents[i].title,
          style: {
            display: "inline-block",
            position: "relative",
            top: (isMac() || mobile ? "" : String(2) + ea),
            fontSize: String(whiteTongTitleSize) + ea,
            fontWeight: String(whiteTongTitleWeight),
            color: colorChip.black,
          }
        },
        {
          text: strongContents[i].description,
          style: {
            display: "inline-block",
            position: "relative",
            top: (isMac() || mobile ? "" : String(2) + ea),
            marginTop: String(whiteTongDescriptionMarginTop) + ea,
            fontSize: String(whiteTongDescriptionSize) + ea,
            fontWeight: String(whiteTongDescriptionWeight),
            lineHeight: String(whiteTongDescriptionLineHeight),
            color: colorChip.black,
          }
        },
        {
          mode: "img",
          attribute: {
            src: (FRONTHOST + "/middle/index") + "/" + strongContents[i].icon,
          },
          style: {
            position: "absolute",
            bottom: String(iconBottom) + ea,
            right: String(iconRight) + ea,
            width: String(iconWidth) + ea,
            height: "auto",
          }
        }
      ]
    });
  }

}

JobPostingJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    this.mother.setGeneralProperties(this);

    const { returnGet, ajaxJson } = GeneralJs;
    const getObj = returnGet();

    this.inputClassName = "consultingInput";
    if (typeof getObj.mode === "string" && getObj.mode === "portfolio") {
      this.portfolioMode = true;
    } else {
      this.portfolioMode = false;
    }

    await this.mother.ghostClientLaunching({
      mode: "front",
      name: "jobPosting",
      client: null,
      base: {
        instance: this,
        binaryPath: JobPostingJs.binaryPath,
        subTitle: "",
        secondBackground: false,
        backgroundType: 0,
      },
      local: async () => {
        try {
          instance.insertInitBox();
          instance.insertPostingBox();
          instance.insertApplyBox();
        } catch (e) {
          await GeneralJs.ajaxJson({ message: "JobPostingJs.launching.ghostClientLaunching : " + e.message }, BACKHOST + "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

  } catch (err) {
    console.log(err);
    await GeneralJs.ajaxJson({ message: "JobPostingJs.launching 에러 일어남 => " + err.message }, BACKHOST + "/errorLog");
  }
}
