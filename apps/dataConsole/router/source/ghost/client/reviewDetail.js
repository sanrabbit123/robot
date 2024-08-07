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
      "return ('홈리에종 고객 리뷰 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('홈리에종 고객 리뷰 디테일 페이지 입니다! | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "reviewDetail",
  "hangul": "리뷰 상세",
  "route": [
    "reviewDetail",
    "RD"
  ]
} %/%/g

const ReviewDetailJs = function () {
  this.mother = new GeneralJs();
}

ReviewDetailJs.binaryPath = FRONTHOST + "/middle/review";

ReviewDetailJs.prototype.reviewInitBox = function () {
  const instance = this;
  const { createNode, colorChip, colorExtended, withOut, svgMaker, isMac, isIphone } = GeneralJs;
  const { totalContents, naviHeight, ea, media, pid, standardWidth } = this;
  const { contentsArr } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const toggleTargetClassName = "toggleTargetClassName";
  const toggleTargetClassName2 = "toggleTargetClassName2";
  const circleClassName = "circleClassName";
  const circleBaseClassName = "circleBaseClassName";
  const touchStartConst = "toggleTouchStartConstName";
  const sortMenuPopupClassName = "sortMenuPopupClassName";
  const filterMenuPopupClassName = "filterMenuPopupClassName";
  const targetTextDomClassName = "targetTextDomClassName";
  const searchTagsButtonClassName = "searchTagsButtonClassName";
  const px = "px";
  const contents = contentsArr.toNormal().filter((obj) => { return obj.contents.portfolio.pid === pid })[0];
  const photoChar = 't';
  const photoCharMobile = "mot";
  let baseTong, baseTop;
  let mainHeight;
  let mainTong;
  let mainBelowBarHeight;
  let contentsBox;
  let pictureWidth, pictureHeight;
  let picture;
  let bottomVisual;
  let photoRightMargin;
  let textTong;
  let quoteHeight, quoteWidth;
  let quoteTop;
  let quotePaddingLeft;
  let topReviewSize, topReviewWeight;
  let mainTitleSize, mainTitleWeight;
  let mainTitleLineHeight;
  let mainTitleMarginTop;
  let subTitleSize, subTitleWeight;
  let subTitleMarginTop;
  let subLineWidth, subLineHeight, subLineLeft;
  let bottomWordingVisualBottom;
  let bottomWordingLineHeight;
  let mobileWhiteBoxTop, mobileWhiteBoxLeft;
  let mobileWhiteBoxWidth, mobileWhiteBoxHeight;
  let mobileWordingLeft;
  let mobileSearchWhiteBoxPaddingTop;
  let mobileSearchWhiteBoxPaddingBottom;
  let mobileSearchWhiteBoxMarginBottom;
  let whiteBlock;
  let style;
  let blockHeight;
  let leftBox, rightBox;
  let titleBox, barBox, indexBox;
  let margin;
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
  let subTitleFontSize;
  let subTitleContents;
  let middleBox;
  let tagTextTop;
  let tagTongBottom;
  let boxTopVisual;
  let mobileBlockTop;
  let buttonSize;
  let buttonWeight;
  let buttonBetween;
  let buttonTongWidth;
  let buttonWidth;
  let buttonHeight;
  let buttonTextTop;
  let buttonLeft;
  let circleWidth;
  let tabletVisualBottom;
  let mobileButtonTongMarginTop;
  let mobileButtonBetween;
  let contentsPaddingTop;
  let sortBoxRight;
  let mobileBackgroundHeight;
  let mobileVisualPaddingLeft;
  let tagBoxRight;
  let illust0Top, illust0Left, illust0Width;
  let illust1Top, illust1Right, illust1Width;
  let illust2Top, illust2Right, illust2Width;
  let mobileTitlePaddingTop;
  let titleBoxRowTong;
  let blackTitleTextTop, blackTitleMarginLeft;
  let numbersBox;
  let numbersBoxBarMargin;
  let numbersBoxPaddingLeft;
  let numbersMargin;
  let multiplyNumber;
  let numbersImageWidth;
  let numbersWidth0, numbersWidth1, numbersWidth2, numbersWidth3;
  let numbersTotalHeight;
  let borderWidth;
  let numbersMaxWidth, numbersRadius;
  let numbersBoxMarginTop;
  let numbersTextSize, numbersTextWeight;
  let numbersImageWidth0, numbersImageWidth1, numbersImageWidth2, numbersImageWidth3;
  let numbersImageTop0, numbersImageTop1, numbersImageTop2, numbersImageTop3;
  let numbersMiddleTitleContents0, numbersMiddleTitleContents1, numbersMiddleTitleContents2, numbersMiddleTitleContents3;
  let numbersDescriptionContents0, numbersDescriptionContents1, numbersDescriptionContents2, numbersDescriptionContents3;
  let numbersDescriptionSize, numbersDescriptionWeight, numbersDescriptionTextTop;
  let numbersMiddleBarHeight;
  let numbersBoxPaddingRight;
  let numbersBoxMarginBottom;
  let sortButtonWidth, sortButtonBetween;
  let sortButtonHeight;
  let buttonArrowDownWidth, buttonArrowDownMarginLeft;
  let serviceNum;
  let borderWidthLight;
  let sortButtonClickEvent;
  let popupBetween;
  let middleBorderWidth;
  let filterButtonClickEvent;
  let searchDescriptionTags;
  let searchWidthTags;
  let menuPopupPaddingTop;
  let numbersBox0, numbersBox1;

  mainHeight = <%% 800, 750, 710, 590, (210 / 297) * 100 %%>;
  mainBelowBarHeight = <%% 250, 250, 250, 216, 250 %%>;

  contentsBoxTop = <%% 70, 70, 70, 70, 0 %%>;
  contentsBoxWidth = <%% 1200, 1050, 900, 720, 1200 %%>;

  bottomVisual = <%% 6, 6, 6, 6, 6 %%>;

  pictureWidth = <%% 820, 720, 610, 480, 610 %%>;
  pictureHeight = mainHeight - (contentsBoxTop * 2) - bottomVisual;

  photoRightMargin = <%% 50, 50, 45, 40, 50 %%>;

  quoteHeight = <%% 14, 14, 13, 11, 1.8 %%>;
  quoteWidth = SvgTong.getRatio(SvgTong.stringParsing(svgMaker.doubleQuote(colorExtended.mainBlue))) * quoteHeight;
  quoteTop = <%% 140, 135, 125, 80, 5 %%>;
  quotePaddingLeft = <%% 2, 2, 2, 2, 5.4 %%>;

  topReviewSize = <%% 16, 16, 15, 14, 15 %%>;
  topReviewWeight = <%% 400, 400, 400, 400, 400 %%>;

  mainTitleSize = <%% 36, 35, 33, 29, 4.5 %%>;
  mainTitleWeight = <%% 500, 500, 500, 500, 500 %%>;
  mainTitleLineHeight = <%% 1.16, 1.16, 1.16, 1.16, 1.2 %%>;
  mainTitleMarginTop = <%% 7, 7, 7, 5, 8.5 %%>;

  subTitleSize = <%% 18, 17, 17, 15, 3 %%>;
  subTitleWeight = <%% 600, 600, 600, 600, 600 %%>;
  subTitleMarginTop = <%% 17, 17, 16, 13, 20 %%>;

  subLineWidth = <%% 170, 120, 95, 65, 95 %%>;
  subLineHeight = <%% (isMac() ? 11 : 9), (isMac() ? 11 : 9), (isMac() ? 11 : 9), (isMac() ? 10 : 8), 11 %%>;
  subLineLeft = <%% 160, 150, 150, 135, 150 %%>;

  bottomWordingVisualBottom = <%% (isMac() ? -2 : -4), (isMac() ? -2 : -4), (isMac() ? -2 : -4), (isMac() ? -2 : -4), -2 %%>;
  bottomWordingLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;

  mobileWhiteBoxTop = 20;
  mobileWhiteBoxLeft = 8;
  mobileWhiteBoxWidth = 38;
  mobileWhiteBoxHeight = 30;

  mobileWordingLeft = 5.3;

  margin = <%% 30, 30, 30, 30, 30 %%>;

  whiteBlockMarginBottom = <%% 50, 50, 50, 50, 5 %%>;

  quoteHeight = <%% 14, 14, 14, 14, 2.5 %%>;
  quotoTongHeight = <%% 16, 16, 16, 16, 4 %%>;
  titleFontSize = <%% 26, 23, 22, 19, 5 %%>;
  titleFontWeight = <%% 700, 700, 700, 700, 700 %%>;
  titleTop = <%% (isMac() ? 0 : 4), (isMac() ? 0 : 4), (isMac() ? 0 : 3), (isMac() ? 0 : 2), (isMac() ? 0 : 4) %%>;

  servicePaddingTop = <%% 7, 7, 7, 7, 7 %%>;
  servicePaddingBottom = <%% 10, 10, 10, 10, 10 %%>;
  servicePaddingLeft = <%% 18, 14, 12, 12, 3 %%>;
  serviceMarginRight = <%% 6, 5, 4, 3, 0.8 %%>;
  serviceSize = <%% 14, 13, 13, 11, 2.8 %%>;
  serviceBlockPaddingTop = <%% (isMac() ? 39 : 42), (isMac() ? 39 : 42), (isMac() ? 39 : 42), (isMac() ? 39 : 42), 5 %%>;

  whiteBlockPaddingTop = <%% 56, 56, 56, 56, 9 %%>;
  whiteBlockPaddingBottom = <%% 80, 80, 80, 80, 11 %%>;

  searchBarPaddingTop = <%% 50, 50, 50, 36, 20 %%>;
  searchBarHeight = <%% 36, 34, 32, 28, 7 %%>;
  searchBarWidth = <%% 690, 516, 412, 284, 88 %%>;

  searchIconHeight = <%% 20, 20, 18, 16, 4.3 %%>;
  searchIconRight = <%% 0, 0, 0, 0, 0.2 %%>;
  searchIconTop = <%% 8, 8, 7, 6, 1 %%>;

  inputWithoutHeight = <%% (isMac() ? 3 : 0), (isMac() ? 3 : 0), (isMac() ? 3 : 0), (isMac() ? 3 : 0), 0.8 %%>;

  inputSize = <%% 14, 14, 14, 14, 3 %%>;
  inputWeight = <%% 300, 300, 300, 300, 300 %%>;

  subTitleMarginTop = <%% 2, 2, 1, 1, 0.1 %%>;
  subTitleFontSize = <%% 21, 19, 18, 16, 3.4 %%>;
  subTitleWeight = <%% 700, 700, 700, 700, 700 %%>;

  tagTextTop = <%% (isMac() ? -0.5 : 0), (isMac() ? -0.5 : 0), (isMac() ? -0.5 : 0), (isMac() ? -0.5 : 0), 0 %%>;
  tagTongBottom = <%% 1, 1, 1, 1, 0 %%>;
  boxTopVisual = <%% 1, 1, 0, 0, 0 %%>;

  titleWording = "PROJECT DETAIL<b%.%b>";
  subTitleContents = "프로젝트 상세";

  mobileBlockTop = 7;

  mobileSearchWhiteBoxPaddingTop = 4;
  mobileSearchWhiteBoxPaddingBottom = 3.6;
  mobileSearchWhiteBoxMarginBottom = 5;

  placeholder = "새아파트";

  buttonSize = <%% 13, 13, 13, 13, 3 %%>;
  buttonWeight = <%% 600, 600, 600, 600, 600 %%>;
  buttonBetween = <%% 1, 1, 1, 1, 2 %%>;

  buttonTongWidth = <%% 65, 65, 60, 60, 90 %%>;

  buttonWidth = <%% 26, 26, 26, 24, 5.6 %%>;
  buttonHeight = <%% 12, 12, 12, 12, 3 %%>;
  buttonTextTop = <%% (isMac() ? 5 : 4), (isMac() ? 5 : 4), (isMac() ? 4 : 3), (isMac() ? 4 : 3), (isIphone() ? 1.3 : 1) %%>;
  buttonLeft = <%% -34, -34, -34, -31, -7 %%>;
  circleWidth = <%% 8, 8, 8, 8, 2 %%>;

  tabletVisualBottom = 4;
  mobileButtonTongMarginTop = 3;
  mobileButtonBetween = 10;
  contentsPaddingTop = <%% 16, 16, 16, 0, 1 %%>;

  sortBoxRight = <%% 0, 0, 0, 0, 20 %%>;

  mobileBackgroundHeight = 58;
  mobileVisualPaddingLeft = 6;

  tagBoxRight = <%% 132, 128, 100, 100, 10 %%>;

  mobileTitlePaddingTop = 2;

  blackTitleMarginLeft = <%% 12, 11, 8, 7, 1 %%>;
  blackTitleTextTop = <%% (isMac() ? -2 : 0.5), (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0.5), (isIphone() ? -0.7 : -0.1) %%>;

  sortButtonWidth = <%% 90, 82, 78, 68, 16.5 %%>;
  sortButtonBetween = <%% 16, 14, 12, 10, 2.6 %%>;
  sortButtonHeight = <%% searchBarHeight - 1, searchBarHeight - 2, searchBarHeight - 1, searchBarHeight - 1, searchBarHeight - 0.1 %%>;

  numbersTotalHeight = <%% 138, 138, 138, 138, 22 %%>;
  borderWidth = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;
  borderWidthLight = 1;
  numbersMaxWidth = <%% 8000, 8000, 8000, 8000, 8000 %%>;
  numbersRadius = <%% 12, 12, 12, 12, 12 %%>;
  numbersBoxMarginTop = <%% 15, 15, 15, 15, 7 %%>;
  numbersBoxMarginBottom = <%% 46, -22, -8, -24, 2.5 %%>;

  numbersBoxPaddingLeft = <%% 42, 40, 38, 32, 5 %%>;
  numbersBoxPaddingRight = <%% 36, 34, 32, 26, 4 %%>;
  numbersBoxBarMargin = <%% 36, 32, 32, 28, 6 %%>;
  numbersMiddleBarHeight = <%% 100, 100, 100, 100, 100 %%>;

  numbersMargin = <%% 20, 12, 12, 6, 2 %%>;

  numbersImageWidth0 = <%% 80, 80, 80, 80, 13 %%>;
  numbersImageWidth1 = <%% 95, 95, 95, 95, 13 %%>;
  numbersImageWidth2 = <%% 110, 110, 110, 110, 14.5 %%>;
  numbersImageWidth3 = <%% 80, 80, 80, 80, 12 %%>;

  numbersImageTop0 = <%% 8, 8, 8, 8, 1.2 %%>;
  numbersImageTop1 = <%% 2, 2, 2, 2, 1 %%>;
  numbersImageTop2 = <%% 7, 7, 7, 7, 1 %%>;
  numbersImageTop3 = <%% 7, 7, 7, 7, 1 %%>;

  numbersWidth0 = <%% 140, 140, 140, 140, 35 %%>;
  numbersWidth1 = <%% 140, 140, 140, 140, 33 %%>;
  numbersWidth2 = <%% 140, 140, 140, 140, 33 %%>;
  numbersWidth3 = <%% 110, 110, 110, 110, 33 %%>;

  numbersTextSize = <%% 38, 38, 38, 38, 6 %%>;
  numbersTextWeight = <%% 700, 700, 700, 700, 700 %%>;

  numbersDescriptionSize = <%% 14, 14, 14, 14, 2.8 %%>;
  numbersDescriptionWeight = <%% 500, 500, 500, 500, 500 %%>;
  numbersDescriptionTextTop = <%% (isMac() ? -5 : -3), (isMac() ? -5 : -3), (isMac() ? -5 : -3), (isMac() ? -5 : -3), -1 %%>;

  buttonArrowDownWidth = <%% 6, 5, 5, 4, 1 %%>;
  buttonArrowDownMarginLeft = <%% 10, 8, 8, 6, 1.9 %%>;

  menuPopupPaddingTop = <%% 4, 4, 4, 4, (isIphone() ? 1.5 : 1.1) %%>;

  baseTop = <%% 130, 125, 120, 100, 9 %%>;

  popupBetween = 6;
  middleBorderWidth = 1;

  baseTong = createNode({
    mother: totalContents,
    style: {
      position: "relative",
      width: String(standardWidth) + ea,
      left: "calc(50% - " + String(standardWidth / 2) + ea + ")",
      paddingTop: desktop ? String(baseTop) + ea : "calc(" + String(naviHeight) + "px" + " + " + String(baseTop) + ea + ")",
      animation: mobile ? "" : "fadeupdelay 0.5s ease forwards",
    }
  });

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
      marginBottom: String(whiteBlockMarginBottom) + ea,
      top: String(-1 * boxTopVisual) + ea,
      overflow: "hidden"
    }
  });

  titleBoxRowTong = createNode({
    mother: whiteBlock,
    style: {
      display: "flex",
      position: "relative",
      width: String(100) + '%',
      flexDirection: desktop ? "row" : "column",
      justifyContent: "start",
      alignItems: "start",
    }
  })

  // title and sub title
  createNode({
    mother: titleBoxRowTong,
    style: {
      display: desktop ? "inline-flex" : "flex",
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
          color: colorExtended.mainBlue,
          wordSpacing: String(2) + "px",
        },
        bold: {
          fontSize: String(titleFontSize) + ea,
          fontFamily: "mont",
          fontWeight: String(titleFontWeight),
          color: colorExtended.mainBlue,
          opacity: String(0.4),
        }
      }
    ]
  });
  createNode({
    mother: titleBoxRowTong,
    style: {
      display: desktop ? "inline-flex" : "flex",
      position: "relative",
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
    },
    children: [
      {
        text: desktop ? "<u%|%u>&nbsp;&nbsp;&nbsp;" + subTitleContents : subTitleContents,
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(subTitleFontSize) + ea,
          fontFamily: "pretendard",
          fontWeight: String(subTitleWeight),
          color: colorChip.black,
          marginLeft: desktop ? String(blackTitleMarginLeft) + ea : "",
          top: String(blackTitleTextTop) + ea,
        },
        under: {
          fontSize: String(subTitleFontSize) + ea,
          fontFamily: "pretendard",
          color: colorChip.deactive,
          fontWeight: String(400),
        },
      }
    ]
  });

}

ReviewDetailJs.prototype.reviewMainBox = function () {
  const instance = this;
  const { createNode, colorChip, colorExtended, withOut, svgMaker, isMac, isIphone, serviceParsing, variableArray, autoComma, blankHref } = GeneralJs;
  const { totalContents, naviHeight, ea, media, pid, standardWidth } = this;
  const { contentsArr, designers, evaluation } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const contents = contentsArr.toNormal().filter((obj) => { return obj.contents.portfolio.pid === pid })[0];
  const designer = designers.toNormal().filter((obj) => { return obj.desid === contents.desid })[0];
  const photoChar = 't';
  const photoCharMobile = "mot";
  let mainHeight;
  let mainTong;
  let mainBelowBarHeight;
  let contentsBox;
  let pictureWidth, pictureHeight;
  let picture;
  let bottomVisual;
  let photoRightMargin;
  let textTong;
  let quoteHeight, quoteWidth;
  let quoteTop;
  let quotePaddingLeft;
  let topReviewSize, topReviewWeight;
  let mainTitleSize, mainTitleWeight;
  let mainTitleLineHeight;
  let mainTitleMarginTop;
  let subTitleSize, subTitleWeight;
  let subTitleMarginTop;
  let subLineWidth, subLineHeight, subLineLeft;
  let bottomWordingVisualBottom;
  let bottomWordingLineHeight;
  let mobileWhiteBoxTop, mobileWhiteBoxLeft;
  let mobileWhiteBoxWidth, mobileWhiteBoxHeight;
  let mobileWordingLeft;
  let borderWidth;
  let descriptionBox;
  let designerInfoBox;
  let designerSpacePhotoWidth;
  let boxRadius;
  let designerSpacePhotoMarginRight;
  let designerDescriptionBox;
  let barBlank;
  let barMargin;
  let mainRatio;
  let valueColumnMargin;
  let valueBlockHeight;
  let borderWidthLight;
  let grayBarMargin;
  let barMarginBottom;
  let satisBarLeft, satisBarHeight;
  let satisBarVisualTop;
  let satisLength;
  let contentsKeywords;
  let keywordsLeft;
  let thisVersion;
  let mainMargin;
  let photoRatio;
  let designerTitleSize, designerTitleWeight;
  let designerStyleSize, designerStyleWeight;
  let designerHomeButtonMarginTop;
  let designerHomeButtonLeft, designerHomeButtonWidth, designerHomeButtonHeight;
  let designerHomeSize, designerHomeWeight;
  let designerHomeArrowWidth, designerHomeArrowMarginLeft, designerHomeArrowTop;
  let projectPropertySize, projectPropertyLightWeight, projectPropertyBoldWeight;
  let projectPropertyTextTop;
  let projectPropertyPyeongSize, projectPropertyPyeongWeight;
  let smallPropertySize, smallPropertyWeight, smallPropertyTextTop;
  let propertyFinalMarginBottom;
  let keywordsHeight, keywordsPadding, keywordsBetween;
  let keywordsSize, keywordsWeight, keywordsSharpWeight, keywordsTextTop;
  let propertyMiddleBarHeight, propertyMiddleBarMarginBottom;
  let propertyBlockHeight;
  let projectPropertySizeFocus;

  thisVersion = instance.version;

  mainRatio = <%% (87 / 160), (125 / 160), (128 / 160), (180 / 160), (72 / 160) %%>;
  mainMargin = <%% 64, 56, 56, 45, 5 %%>;
  photoRatio = <%% 0.58, 0.5, 0.5, 0.4, 0.58 %%>;

  mainHeight = <%% 800, 750, 710, 590, mainRatio * 88 %%>;
  mainBelowBarHeight = <%% 250, 250, 250, 216, 250 %%>;

  contentsBoxTop = <%% 70, 70, 70, 70, 0 %%>;
  contentsBoxWidth = <%% 1200, 1050, 900, 720, 1200 %%>;

  bottomVisual = <%% 6, 6, 6, 6, 6 %%>;

  pictureWidth = <%% 820, 720, 610, 480, 610 %%>;
  pictureHeight = mainHeight - (contentsBoxTop * 2) - bottomVisual;

  boxRadius = <%% 15, 15, 15, 15, 15 %%>;

  photoRightMargin = <%% 45, 32, 30, 25, 45 %%>;
  designerSpacePhotoWidth = <%% 96, 92, 90, 72, 96 %%>;
  designerSpacePhotoMarginRight = <%% 20, 18, 18, 16, 20 %%>;

  barMargin = <%% 30, 28, 25, 21, 6.2 %%>;
  propertyBlockHeight = <%% 37, 35, 35, 35, 6.2 %%>;
  barMarginBottom = <%% 30, 30, 30, 30, 30 %%>;
  valueColumnMargin = <%% 22, 22, 22, 22, 2 %%>;
  valueBlockHeight = <%% 45, 45, 45, 45, 45 %%>;
  grayBarMargin = <%% 16, 16, 16, 16, 4 %%>;

  keywordsLeft = <%% 48, 48, 48, 48, 18.3 %%>;
  satisBarLeft = <%% 131, 114, 92, 94, 18.7 %%>;
  satisBarHeight = <%% 18, 17, 15, 14, 3.4 %%>;
  if (thisVersion === 1) {
    satisBarVisualTop = <%% 4, 3.5, 2.5, 1.5, 0.5 %%>;
  } else {
    satisBarVisualTop = <%% 6, 5.5, 5.5, 4, 0.5 %%>;
  }
  if (desktop) {
    if (!isMac()) {
      satisBarVisualTop = satisBarVisualTop + (1);
    }
  }

  satisLength = <%% 10, 10, 10, 10, 10 %%>;

  designerTitleSize = <%% 19, 18, 17, 15, 3.9 %%>;
  designerTitleWeight = <%% 700, 700, 700, 700, 700 %%>;

  designerStyleSize = <%% 15, 14, 14, 12, 2.7 %%>;
  designerStyleWeight = <%% 400, 400, 400, 400, 400 %%>;

  designerHomeButtonMarginTop = <%% 14, 14, 15, 10, 1 %%>;
  designerHomeButtonLeft = <%% -1, -1, -1, -1, -1 %%>;
  designerHomeButtonWidth = <%% 176, 176, 162, 130, 40 %%>;
  designerHomeButtonHeight = <%% 32, 32, 28, 22, 8 %%>;

  designerHomeSize = <%% 13, 13, 12, 10, 2.8 %%>;
  designerHomeWeight = <%% 300, 300, 300, 300, 300 %%>;

  designerHomeArrowWidth = <%% 16, 16, 13, 10, 3.2 %%>;
  designerHomeArrowMarginLeft = <%% 5, 5, 5, 4, 1 %%>;
  designerHomeArrowTop = <%% -0.5, -0.5, -0.5, -0.5, -0.1 %%>;

  projectPropertySize = <%% 16, 15, 13, 12, 3.2 %%>;
  projectPropertySizeFocus = <%% 17, 16, 14, 13, 3.3 %%>;
  projectPropertyLightWeight = <%% 400, 400, 400, 400, 400 %%>;
  projectPropertyBoldWeight = <%% 700, 700, 700, 700, 700 %%>;
  projectPropertyTextTop = <%% -1, -1, -1, -1, -1 %%>;
  projectPropertyPyeongSize = <%% 14, 13, 11, 10, 2.5 %%>;
  projectPropertyPyeongWeight = <%% 400, 400, 400, 400, 400 %%>;

  smallPropertySize = <%% 9, 8, 7, 6, 1 %%>;
  smallPropertyWeight = <%% 400, 400, 400, 400, 400 %%>;
  smallPropertyTextTop = <%% -5, -5, -5, -5, -1 %%>;

  propertyFinalMarginBottom = <%% -6, -6, -6, -4, -1 %%>;

  keywordsHeight = <%% 30, 27, 25, 24, 6.5 %%>;
  keywordsPadding = <%% 14, 12, 10, 10, 2 %%>;
  keywordsBetween = <%% 4, 4, 3, 3, 1 %%>;

  keywordsSize = <%% 12.5, 12, 11, 10, 2.7 %%>;
  keywordsWeight = <%% 700, 700, 700, 700, 700 %%>;
  keywordsSharpWeight = <%% 400, 400, 400, 400, 400 %%>;
  keywordsTextTop = <%% (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), -0.1 %%>;

  propertyMiddleBarHeight = <%% 24, 20, 18, 16, 3 %%>;
  propertyMiddleBarMarginBottom = <%% 20, 20, 18, 16, 5 %%>;

  quoteHeight = <%% 14, 14, 13, 11, 1.8 %%>;
  quoteWidth = SvgTong.getRatio(SvgTong.stringParsing(svgMaker.doubleQuote(colorExtended.mainBlue))) * quoteHeight;
  quoteTop = <%% 140, 135, 125, 80, 5 %%>;
  quotePaddingLeft = <%% 2, 2, 2, 2, 5.4 %%>;

  topReviewSize = <%% 16, 16, 15, 14, 15 %%>;
  topReviewWeight = <%% 400, 400, 400, 400, 400 %%>;

  mainTitleSize = <%% 36, 35, 33, 29, 4.5 %%>;
  mainTitleWeight = <%% 500, 500, 500, 500, 500 %%>;
  mainTitleLineHeight = <%% 1.16, 1.16, 1.16, 1.16, 1.2 %%>;
  mainTitleMarginTop = <%% 7, 7, 7, 5, 8.5 %%>;

  subTitleSize = <%% 18, 17, 17, 15, 3 %%>;
  subTitleWeight = <%% 600, 600, 600, 600, 600 %%>;
  subTitleMarginTop = <%% 17, 17, 16, 13, 20 %%>;

  subLineWidth = <%% 170, 120, 95, 65, 95 %%>;
  subLineHeight = <%% (isMac() ? 11 : 9), (isMac() ? 11 : 9), (isMac() ? 11 : 9), (isMac() ? 10 : 8), 11 %%>;
  subLineLeft = <%% 160, 150, 150, 135, 150 %%>;

  bottomWordingVisualBottom = <%% (isMac() ? -2 : -4), (isMac() ? -2 : -4), (isMac() ? -2 : -4), (isMac() ? -2 : -4), -2 %%>;
  bottomWordingLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;

  mobileWhiteBoxTop = 20;
  mobileWhiteBoxLeft = 8;
  mobileWhiteBoxWidth = 38;
  mobileWhiteBoxHeight = 30;

  mobileWordingLeft = 5.3;

  borderWidth = 1.5;
  borderWidthLight = 1;

  barBlank = desktop ? "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" : (!isIphone() ? "&nbsp;&nbsp;&nbsp;" : " &nbsp;");

  contentsKeywords = contents.contents.portfolio.detailInfo.tag.filter((s) => {
    let boo = true;
    if (s === "all" || /아파트/gi.test(s) || /평대/gi.test(s) || /인테리어/gi.test(s) || s === "화이트" || s === "네추럴" || s === "네츄럴" || s === "내츄럴" || s === "자연스러운") {
      boo = false;
    }
    return boo;
  }).filter((s) => { return s.length > 2 }).filter((s, index, arr) => {
    const regArr = arr.map((str) => { return new RegExp(str, "gi"); }).filter((r, i) => { return index !== i });
    let boo = true;
    for (let r of regArr) {
      if (r.test(s)) {
        boo = false;
        break;
      }
    }
    return boo;
  });
  if (media[0] || media[1]) {
    contentsKeywords = contentsKeywords.slice(0, 5);
  } else {
    contentsKeywords = contentsKeywords.slice(0, 4);
  }

  mainTong = createNode({
    mother: totalContents,
    style: {
      display: "block",
      position: "relative",
      width: withOut(0, ea),
      background: colorExtended.white,
      animation: "fadeupdelay 0.5s ease forwards",
    },
  });

  // total base
  contentsBox = createNode({
    mother: mainTong,
    style: {
      display: "flex",
      position: "relative",
      flexDirection: desktop ? "row" : "column",
      width: String(standardWidth) + ea,
      left: "calc(50% - " + String(standardWidth / 2) + ea + ")",
      top: String(0),
      paddingBottom: String(mainMargin) + ea,
      borderBottom: String(borderWidth) + "px solid " + (desktop ? colorExtended.gray3 : colorExtended.black),
    }
  });

  // left picture
  picture = createNode({
    mother: contentsBox,
    style: {
      display: desktop ? "inline-flex" : "flex",
      position: "relative",
      width: desktop ? String(standardWidth * photoRatio) + ea : withOut(0, ea),
      height: desktop ? String((standardWidth * photoRatio) * mainRatio) + ea : String(45) + ea,
      borderRadius: String(boxRadius) + "px",
      backgroundImage: "url('" + "https://" + FILEHOST + "/list_image/portp" + pid + (desktop ? ("/" + photoChar) : ("/mobile/" + photoCharMobile)) + String(contents.contents.review.detailInfo.photodae[1]) + pid + ".jpg" + "')",
      backgroundSize: (media[0] || mobile) ? "100% auto" : "auto 100%",
      backgroundPosition: "50% 50%",
      boxShadow: desktop ? "0px 8px 22px -15px " + colorChip.shadow : "",
      marginRight: desktop ? String(photoRightMargin) + ea : "",
      verticalAlign: "top",
    }
  });

  // right box
  descriptionBox = createNode({
    mother: contentsBox,
    style: {
      display: desktop ? "inline-flex" : "flex",
      position: "relative",
      width: desktop ? withOut((standardWidth * photoRatio) + photoRightMargin, ea) : withOut(0, ea),
      height: desktop ? String((standardWidth * photoRatio) * mainRatio) + ea : "auto",
      verticalAlign: "top",
      flexDirection: "column",
      justifyContent: "start",
      alignItems: "start",
    }
  });

  // designer name and info
  designerInfoBox = createNode({
    mother: descriptionBox,
    style: {
      display: "flex",
      position: "relative",
      width: withOut(0, ea),
      height: desktop ? String(designerSpacePhotoWidth) + ea : "",
      flexDirection: "row",
      justifyContent: "start",
      alignItems: "start",
    },
    children: [
      {
        style: {
          display: desktop ? "inline-flex" : "none",
          position: "relative",
          width: String(designerSpacePhotoWidth) + ea,
          height: String(designerSpacePhotoWidth) + ea,
          borderRadius: String(boxRadius) + "px",
          backgroundImage: "url('" + "https://" + FILEHOST + "/list_image/portp" + designer.setting.front.photo.porlid + "/" + designer.setting.front.photo.index + designer.setting.front.photo.porlid + ".jpg" + "')",
          backgroundSize: "auto 100%",
          backgroundPosition: "50% 50%",
          boxShadow: desktop ? "0px 8px 22px -15px " + colorChip.shadow : "",
          marginRight: String(designerSpacePhotoMarginRight) + ea,
        }
      },
      {
        style: {
          display: desktop ? "inline-flex" : "flex",
          position: "relative",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "start",
          width: desktop ? withOut(designerSpacePhotoWidth + designerSpacePhotoMarginRight, ea) : withOut(0, ea),
          height: desktop ? String(designerSpacePhotoWidth) + ea : "",
          marginTop: desktop ? "" : String(6) + ea,
        }
      }
    ]
  });
  designerDescriptionBox = designerInfoBox.children[1];
  createNode({
    mother: designerDescriptionBox,
    style: {
      display: "flex",
      position: "relative",
      width: withOut(0, ea),
      textAlign: "left",
      justifyContent: "start",
      alignItems: "start",
      marginBottom: String(0) + ea,
    },
    child: {
      text: designer.designer + " 디자이너",
      style: {
        display: "inline-block",
        position: "relative",
        fontSize: String(designerTitleSize) + ea,
        fontWeight: String(designerTitleWeight),
        color: colorExtended.black,
        fontFamily: "pretendard",
      }
    }
  });
  createNode({
    mother: designerDescriptionBox,
    style: {
      display: "flex",
      position: "relative",
      width: withOut(0, ea),
      textAlign: "left",
      justifyContent: "start",
      alignItems: "start",
    },
    child: {
      text: designer.styleTendency.map(({ name }) => { return name }).slice(0, 3).join("<b%|%b>"),
      style: {
        display: "inline-block",
        position: "relative",
        fontSize: String(designerStyleSize) + ea,
        fontWeight: String(designerStyleWeight),
        color: colorExtended.black,
        fontFamily: "pretendard",
      },
      bold: {
        fontSize: String(designerStyleSize) + ea,
        fontWeight: String(designerStyleWeight),
        color: colorExtended.gray3,
        marginLeft: String(<&& 10 | 10 | 9 | 8 | 1.66 &&>) + ea,
        marginRight: String(<&& 10 | 10 | 9 | 8 | 1.66 &&>) + ea,
      }
    }
  });
  createNode({
    mother: designerDescriptionBox,
    event: {
      selectstart: (e) => { e.preventDefault() },
    },
    style: {
      display: desktop ? "flex" : "inline-flex",
      position: desktop ? "relative" : "absolute",
      width: desktop ? withOut(0, ea) : "",
      textAlign: desktop ? "left" : "right",
      justifyContent: desktop ? "start" : "end",
      alignItems: desktop ? "start" : "end",
      marginTop: desktop ? String(designerHomeButtonMarginTop) + ea : "",
      bottom: desktop ? "" : String(1) + ea,
      right: desktop ? "" : String(-1) + ea,
      cursor: "pointer",
    },
    child: {
      event: {
        selectstart: (e) => { e.preventDefault() },
        click: function (e) { blankHref(FRONTHOST + "/desdetail.php?desid=" + this.getAttribute("desid")) },
      },
      attribute: { desid: designer.desid },
      style: {
        display: "inline-flex",
        position: "relative",
        left: String(designerHomeButtonLeft) + ea,
        width: String(designerHomeButtonWidth) + ea,
        height: String(designerHomeButtonHeight) + ea,
        borderRadius: String(designerHomeButtonHeight) + ea,
        background: colorExtended.gradientBlue,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      },
      child: {
        event: {
          selectstart: (e) => { e.preventDefault() },
        },
        text: "DESIGNER HOME",
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(designerHomeSize) + ea,
          fontWeight: String(designerHomeWeight),
          fontFamily: "gmarket",
          color: colorExtended.white,
        },
        next: {
          mode: "svg",
          source: svgMaker.squareArrow(colorExtended.white),
          style: {
            display: "inline-block",
            position: "relative",
            width: String(designerHomeArrowWidth) + ea,
            marginLeft: String(designerHomeArrowMarginLeft) + ea,
            top: String(designerHomeArrowTop) + ea,
          }
        }
      }
    }
  });

  if (thisVersion === 0) {

    /* === version 1 === */

    // middle bar
    createNode({
      mother: descriptionBox,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        height: String(propertyMiddleBarHeight) + ea,
        borderBottom: String(borderWidth) + "px solid " + colorExtended.black,
        marginBottom: String(propertyMiddleBarMarginBottom) + ea,
        flexDirection: "row",
        justifyContent: "start",
        alignItems: "start",
      }
    });

    // detail info

    // 1
    createNode({
      mother: descriptionBox,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        height: String(propertyBlockHeight) + ea,
        flexDirection: "row",
        justifyContent: "start",
        alignItems: "start",
      },
      children: [
        {
          style: {
            display: "inline-flex",
            width: withOut(50, 0, ea),
            height: withOut(0, ea),
            position: "relative",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "start",
          },
          children: [
            {
              style: {
                display: "inline-flex",
                position: "relative",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center",
                textAlign: "right",
                width: withOut(0, ea),
                height: withOut(0, ea),
              },
              child: {
                text: "지역",
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(projectPropertySize) + ea,
                  fontWeight: String(projectPropertyLightWeight),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  top: String(projectPropertyTextTop) + ea,
                }
              }
            },
            {
              style: {
                display: "inline-flex",
                position: "absolute",
                flexDirection: "row",
                justifyContent: "end",
                alignItems: "center",
                textAlign: "right",
                width: withOut(valueColumnMargin, ea),
                height: withOut(0, ea),
                top: String(0),
                right: String(valueColumnMargin) + ea,
              },
              child: {
                text: contents.contents.portfolio.spaceInfo.region,
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(projectPropertySize) + ea,
                  fontWeight: String(projectPropertyBoldWeight),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  top: String(projectPropertyTextTop) + ea,
                }
              }
            },
          ]
        },
        {
          style: {
            display: "inline-flex",
            width: String(50) + '%',
            height: withOut(0, ea),
            position: "relative",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "start",
          },
          children: [
            {
              style: {
                display: "inline-flex",
                position: "relative",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center",
                textAlign: "right",
                paddingLeft: String(valueColumnMargin) + ea,
                width: withOut(valueColumnMargin, ea),
                height: withOut(0, ea),
              },
              child: {
                text: "평수 <b%( py )%b>",
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(projectPropertySize) + ea,
                  fontWeight: String(projectPropertyLightWeight),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  top: String(projectPropertyTextTop) + ea,
                },
                bold: {
                  fontSize: String(projectPropertyPyeongSize) + ea,
                  fontWeight: String(projectPropertyPyeongWeight),
                  fontFamily: "pretendard",
                  color: colorExtended.deactive,
                }
              }
            },
            {
              style: {
                display: "inline-flex",
                position: "absolute",
                flexDirection: "row",
                justifyContent: "end",
                alignItems: "center",
                textAlign: "right",
                width: withOut(0, ea),
                height: withOut(0, ea),
                top: String(0),
                right: String(0) + ea,
              },
              child: {
                text: String(contents.contents.portfolio.spaceInfo.pyeong) + "py",
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(projectPropertySize) + ea,
                  fontWeight: String(projectPropertyBoldWeight),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  top: String(projectPropertyTextTop) + ea,
                }
              }
            },
          ]
        },
      ]
    });
    // 2
    createNode({
      mother: descriptionBox,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        height: String(propertyBlockHeight) + ea,
        flexDirection: "row",
        justifyContent: "start",
        alignItems: "start",
      },
      children: [
        {
          style: {
            display: "inline-flex",
            width: withOut(50, 0, ea),
            height: withOut(0, ea),
            position: "relative",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "start",
          },
          children: [
            {
              style: {
                display: "inline-flex",
                position: "relative",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center",
                textAlign: "right",
                width: withOut(0, ea),
                height: withOut(0, ea),
              },
              child: {
                text: "현장명",
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(projectPropertySize) + ea,
                  fontWeight: String(projectPropertyLightWeight),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  top: String(projectPropertyTextTop) + ea,
                }
              }
            },
            {
              style: {
                display: "inline-flex",
                position: "absolute",
                flexDirection: "row",
                justifyContent: "end",
                alignItems: "center",
                textAlign: "right",
                width: withOut(valueColumnMargin, ea),
                height: withOut(0, ea),
                top: String(0),
                right: String(valueColumnMargin) + ea,
              },
              child: {
                text: contents.contents.portfolio.spaceInfo.space,
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(projectPropertySize) + ea,
                  fontWeight: String(projectPropertyBoldWeight),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  top: String(projectPropertyTextTop) + ea,
                }
              }
            },
          ]
        },
        {
          style: {
            display: "inline-flex",
            width: String(50) + '%',
            height: withOut(0, ea),
            position: "relative",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "start",
          },
          children: [
            {
              style: {
                display: "inline-flex",
                position: "relative",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center",
                textAlign: "right",
                paddingLeft: String(valueColumnMargin) + ea,
                width: withOut(valueColumnMargin, ea),
                height: withOut(0, ea),
              },
              child: {
                text: "평수 <b%( m%b><s%2%s><b% )%b>",
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(projectPropertySize) + ea,
                  fontWeight: String(projectPropertyLightWeight),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  top: String(projectPropertyTextTop) + ea,
                },
                bold: {
                  fontSize: String(projectPropertyPyeongSize) + ea,
                  fontWeight: String(projectPropertyPyeongWeight),
                  fontFamily: "pretendard",
                  color: colorExtended.deactive,
                },
                special: {
                  fontSize: String(smallPropertySize) + ea,
                  fontWeight: String(smallPropertyWeight),
                  fontFamily: "pretendard",
                  color: colorExtended.deactive,
                  position: "relative",
                  top: String(smallPropertyTextTop) + ea,
                },
              }
            },
            {
              style: {
                display: "inline-flex",
                position: "absolute",
                flexDirection: "row",
                justifyContent: "end",
                alignItems: "center",
                textAlign: "right",
                width: withOut(0, ea),
                height: withOut(0, ea),
                top: String(0),
                right: String(0) + ea,
              },
              child: {
                text: String(Math.floor(contents.contents.portfolio.spaceInfo.pyeong * 3.306 * 10) / 10) + "m<s%2%s>",
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(projectPropertySize) + ea,
                  fontWeight: String(projectPropertyBoldWeight),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  top: String(projectPropertyTextTop) + ea,
                },
                special: {
                  fontSize: String(smallPropertySize) + ea,
                  fontWeight: String(700),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  position: "relative",
                  top: String(smallPropertyTextTop) + ea,
                },
              }
            },
          ]
        },
      ]
    });
    if (media[0] || media[1]) {
      // 3 - gray bar
      createNode({
        mother: descriptionBox,
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          height: String(grayBarMargin) + ea,
          borderBottom: String(borderWidthLight) + "px solid " + colorExtended.gray3,
          marginBottom: desktop ? String(grayBarMargin) + ea : String(grayBarMargin + 1) + ea,
          flexDirection: "row",
          justifyContent: "start",
          alignItems: "start",
        }
      });
    }
    // 4
    createNode({
      mother: descriptionBox,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        height: String(propertyBlockHeight) + ea,
        flexDirection: "row",
        justifyContent: "start",
        alignItems: "start",
      },
      children: [
        {
          style: {
            display: "inline-flex",
            width: withOut(50, 0, ea),
            height: withOut(0, ea),
            position: "relative",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "start",
          },
          children: [
            {
              style: {
                display: "inline-flex",
                position: "relative",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center",
                textAlign: "right",
                width: withOut(0, ea),
                height: withOut(0, ea),
              },
              child: {
                text: "예산",
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(projectPropertySize) + ea,
                  fontWeight: String(projectPropertyLightWeight),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  top: String(projectPropertyTextTop) + ea,
                }
              }
            },
            {
              style: {
                display: "inline-flex",
                position: "absolute",
                flexDirection: "row",
                justifyContent: "end",
                alignItems: "center",
                textAlign: "right",
                width: withOut(valueColumnMargin, ea),
                height: withOut(0, ea),
                top: String(0),
                right: String(valueColumnMargin) + ea,
              },
              child: {
                text: contents.contents.portfolio.spaceInfo.budget.replace(/[ ]*(이하|이상|미만|초과)[ ]*/gi) + "대",
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(projectPropertySize) + ea,
                  fontWeight: String(projectPropertyBoldWeight),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  top: String(projectPropertyTextTop) + ea,
                }
              }
            },
          ]
        },
        {
          style: {
            display: "inline-flex",
            width: String(50) + '%',
            height: withOut(0, ea),
            position: "relative",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "start",
          },
          children: [
            {
              style: {
                display: "inline-flex",
                position: "relative",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center",
                textAlign: "right",
                paddingLeft: String(valueColumnMargin) + ea,
                width: withOut(valueColumnMargin, ea),
                height: withOut(0, ea),
              },
              child: {
                text: "기간",
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(projectPropertySize) + ea,
                  fontWeight: String(projectPropertyLightWeight),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  top: String(projectPropertyTextTop) + ea,
                },
                bold: {
                  fontSize: String(projectPropertyPyeongSize) + ea,
                  fontWeight: String(projectPropertyPyeongWeight),
                  fontFamily: "pretendard",
                  color: colorExtended.deactive,
                },
                special: {
                  fontSize: String(smallPropertySize) + ea,
                  fontWeight: String(smallPropertyWeight),
                  fontFamily: "pretendard",
                  color: colorExtended.deactive,
                  position: "relative",
                  top: String(smallPropertyTextTop) + ea,
                },
              }
            },
            {
              style: {
                display: "inline-flex",
                position: "absolute",
                flexDirection: "row",
                justifyContent: "end",
                alignItems: "center",
                textAlign: "right",
                width: withOut(0, ea),
                height: withOut(0, ea),
                top: String(0),
                right: String(0) + ea,
              },
              child: {
                text: contents.period,
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(projectPropertySize) + ea,
                  fontWeight: String(projectPropertyBoldWeight),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  top: String(projectPropertyTextTop) + ea,
                },
              }
            },
          ]
        },
      ]
    });
    // 5
    createNode({
      mother: descriptionBox,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        height: String(propertyBlockHeight) + ea,
        flexDirection: "row",
        justifyContent: "start",
        alignItems: "start",
      },
      children: [
        {
          style: {
            display: "inline-flex",
            width: withOut(50, 0, ea),
            height: withOut(0, ea),
            position: "relative",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "start",
          },
          children: [
            {
              style: {
                display: "inline-flex",
                position: "relative",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center",
                textAlign: "right",
                width: withOut(0, ea),
                height: withOut(0, ea),
              },
              child: {
                text: "온오프라인",
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(projectPropertySize) + ea,
                  fontWeight: String(projectPropertyLightWeight),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  top: String(projectPropertyTextTop) + ea,
                }
              }
            },
            {
              style: {
                display: "inline-flex",
                position: "absolute",
                flexDirection: "row",
                justifyContent: "end",
                alignItems: "center",
                textAlign: "right",
                width: withOut(valueColumnMargin, ea),
                height: withOut(0, ea),
                top: String(0),
                right: String(valueColumnMargin) + ea,
              },
              child: {
                text: !contents.service.online ? "오프라인" : "온라인",
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(projectPropertySize) + ea,
                  fontWeight: String(projectPropertyBoldWeight),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  top: String(projectPropertyTextTop) + ea,
                }
              }
            },
          ]
        },
        {
          style: {
            display: "inline-flex",
            width: String(50) + '%',
            height: withOut(0, ea),
            position: "relative",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "start",
          },
          children: [
            {
              style: {
                display: "inline-flex",
                position: "relative",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center",
                textAlign: "right",
                paddingLeft: String(valueColumnMargin) + ea,
                width: withOut(valueColumnMargin, ea),
                height: withOut(0, ea),
              },
              child: {
                text: "서비스 유형",
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(projectPropertySize) + ea,
                  fontWeight: String(projectPropertyLightWeight),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  top: String(projectPropertyTextTop) + ea,
                },
              }
            },
            {
              style: {
                display: "inline-flex",
                position: "absolute",
                flexDirection: "row",
                justifyContent: "end",
                alignItems: "center",
                textAlign: "right",
                width: withOut(0, ea),
                height: withOut(0, ea),
                top: String(0),
                right: String(0) + ea,
              },
              child: {
                text: serviceParsing(contents.service).replace(/(온라인|오프라인)[ ]*/gi, '').replace(/[ ]*(basic|mini|premium)/gi, '').trim(),
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(projectPropertySize) + ea,
                  fontWeight: String(projectPropertyBoldWeight),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  top: String(projectPropertyTextTop) + ea,
                },
                special: {
                  fontSize: String(smallPropertySize) + ea,
                  fontWeight: String(700),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  position: "relative",
                  top: String(smallPropertyTextTop) + ea,
                },
              }
            },
          ]
        },
      ]
    });
    // 6 - gray bar
    createNode({
      mother: descriptionBox,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        height: String(grayBarMargin) + ea,
        borderBottom: String(borderWidthLight) + "px solid " + colorExtended.gray3,
        marginBottom: desktop ? String(grayBarMargin) + ea : String(grayBarMargin + 1) + ea,
        flexDirection: "row",
        justifyContent: "start",
        alignItems: "start",
      }
    });
    // 7
    createNode({
      mother: descriptionBox,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        height: String(propertyBlockHeight) + ea,
        flexDirection: "row",
        justifyContent: "start",
        alignItems: "start",
      },
      children: [
        {
          style: {
            display: "inline-flex",
            width: withOut(0, ea),
            height: withOut(0, ea),
            position: "relative",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "start",
          },
          children: [
            {
              style: {
                display: "inline-flex",
                position: "relative",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center",
                textAlign: "right",
                width: withOut(0, ea),
                height: withOut(0, ea),
              },
              child: {
                text: "만족도",
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(projectPropertySize) + ea,
                  fontWeight: String(projectPropertyLightWeight),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  top: String(projectPropertyTextTop) + ea,
                }
              }
            },
            {
              style: {
                display: "inline-flex",
                position: "absolute",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center",
                textAlign: "right",
                top: String(satisBarVisualTop) + ea,
                left: String(satisBarLeft) + ea,
                width: withOut(satisBarLeft, ea),
                height: String(satisBarHeight) + ea,
                borderRadius: String(satisBarHeight) + ea,
                background: colorExtended.blueWhiteWhiteBack,
              },
              child: {
                style: {
                  display: "inline-flex",
                  position: "relative",
                  width: withOut(0, ea),
                  height: String(satisBarHeight) + ea,
                  borderRadius: String(satisBarHeight) + ea,
                  flexDirection: "row",
                  overflow: "hidden",
                },
                children: variableArray(satisLength).map((i, index, arr) => {
                  const obj = {
                    style: {
                      display: "inline-flex",
                      position: "relative",
                      borderRight: (index === arr.length - 1) ? "" : String(borderWidth) + "px solid " + colorExtended.blueLight,
                      boxSizing: "border-box",
                      width: "calc(100% / " + String(satisLength) + ")",
                      opacity: String(0.9),
                      "mix-blend-mode": "multiply",
                      height: withOut(0, ea),
                    }
                  };

                  if (index === 0) {
                    obj.previous = {
                      style: {
                        display: "inline-flex",
                        position: "absolute",
                        top: String(0),
                        left: String(0),
                        width: "calc(" + String(80 + ((Number(instance.pid.replace(/[^0-9]/gi, '')) % 100) % 10)) + "%)",
                        height: withOut(0, ea),
                        borderRadius: String(satisBarHeight) + ea,
                        background: colorExtended.gradientBlue,
                      }
                    };
                  }

                  return obj;
                })
              }
            },
          ]
        },
      ]
    });
    // 8 - gray bar
    createNode({
      mother: descriptionBox,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        height: String(grayBarMargin) + ea,
        borderBottom: String(borderWidthLight) + "px solid " + colorExtended.gray3,
        marginBottom: desktop ? String(grayBarMargin) + ea : String(grayBarMargin + 1) + ea,
        flexDirection: "row",
        justifyContent: "start",
        alignItems: "start",
      }
    });
    // 9 - final
    createNode({
      mother: descriptionBox,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        height: "calc(" + String(propertyBlockHeight) + ea + " + " + String(borderWidth * 2) + "px" + ")",
        flexDirection: "row",
        justifyContent: "start",
        alignItems: "start",
        marginBottom: String(propertyFinalMarginBottom) + ea,
      },
      children: [
        {
          style: {
            display: "inline-flex",
            width: withOut(0, ea),
            height: withOut(0, ea),
            position: "relative",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "start",
          },
          children: [
            {
              style: {
                display: "inline-flex",
                position: "relative",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center",
                textAlign: "right",
                width: withOut(0, ea),
                height: withOut(0, ea),
              },
              child: {
                text: "키워드",
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(projectPropertySize) + ea,
                  fontWeight: String(projectPropertyLightWeight),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  top: String(projectPropertyTextTop) + ea,
                }
              }
            },
            {
              style: {
                display: "inline-flex",
                position: "absolute",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center",
                textAlign: "right",
                top: desktop ? String(0) : String(-0.8) + ea,
                left: String(keywordsLeft) + ea,
                width: withOut(keywordsLeft, ea),
                height: withOut(0, ea),
              },
              child: {
                style: {
                  display: "inline-flex",
                  position: "relative",
                  width: withOut(0, ea),
                  height: withOut(0, ea),
                  flexDirection: "row",
                  justifyContent: "end",
                  alignItems: "center",
                  overflow: "hidden",
                },
                children: contentsKeywords.map((str, index, arr) => {
                  return {
                    style: {
                      display: "inline-flex",
                      position: "relative",
                      height: String(keywordsHeight) + ea,
                      borderRadius: String(keywordsHeight) + ea,
                      paddingLeft: String(keywordsPadding) + ea,
                      paddingRight: String(keywordsPadding) + ea,
                      boxSizing: "border-box",
                      border: String(borderWidth) + "px solid " + colorExtended.gray3,
                      justifyContent: "center",
                      alignItems: "center",
                      marginLeft: String(index === 0 ? 0 : keywordsBetween) + ea,
                    },
                    child: {
                      text: "<b%#%b> " + str,
                      style: {
                        display: "inline-block",
                        position: "relative",
                        fontSize: String(keywordsSize) + ea,
                        fontWeight: String(keywordsWeight),
                        fontFamily: "pretendard",
                        color: colorExtended.mainBlue,
                        top: String(keywordsTextTop) + ea,
                      },
                      bold: {
                        fontSize: String(keywordsSize) + ea,
                        fontWeight: String(keywordsSharpWeight),
                        fontFamily: "pretendard",
                        color: colorExtended.blueLight,
                      }
                    }
                  }
                })
              }
            },
          ]
        },
      ]
    });

  } else if (thisVersion === 1) {

    /* === version 2 === */

    // middle bar
    createNode({
      mother: descriptionBox,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        height: String(propertyMiddleBarHeight) + ea,
        borderBottom: String(borderWidth) + "px solid " + colorExtended.black,
        marginBottom: String(propertyMiddleBarMarginBottom) + ea,
        flexDirection: "row",
        justifyContent: "start",
        alignItems: "start",
      }
    });
  
    // detail info
  
    // 1
    createNode({
      mother: descriptionBox,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        height: String(barMargin) + ea,
        flexDirection: "row",
        justifyContent: "start",
        alignItems: "start",
      },
      children: [
        {
          style: {
            display: "inline-flex",
            width: withOut(100, 0, ea),
            height: withOut(0, ea),
            position: "relative",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "start",
          },
          children: [
            {
              style: {
                display: "inline-flex",
                position: "relative",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center",
                textAlign: "right",
                width: withOut(0, ea),
                height: withOut(0, ea),
              },
              child: {
                text: "전체 예산",
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(projectPropertySize) + ea,
                  fontWeight: String(projectPropertyLightWeight),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  top: String(projectPropertyTextTop) + ea,
                }
              }
            },
            {
              style: {
                display: "inline-flex",
                position: "absolute",
                flexDirection: "row",
                justifyContent: "end",
                alignItems: "center",
                textAlign: "right",
                width: withOut(valueColumnMargin, ea),
                height: withOut(0, ea),
                top: String(0),
                right: String(0) + ea,
              },
              child: {
                text: autoComma(evaluation.spend.total >= evaluation.spend.styling ? (evaluation.spend.total >= evaluation.spend.construct ? (evaluation.spend.total / 10000) : (evaluation.spend.construct / 10000)) : (evaluation.spend.styling / 10000)) + "만원대",
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(projectPropertySizeFocus) + ea,
                  fontWeight: String(projectPropertyBoldWeight),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  top: String(projectPropertyTextTop) + ea,
                }
              }
            },
          ]
        },
      ]
    });
    // 2
    createNode({
      mother: descriptionBox,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        height: String(barMargin) + ea,
        flexDirection: "row",
        justifyContent: "start",
        alignItems: "start",
      },
      children: [
        {
          style: {
            display: "inline-flex",
            width: withOut(100, 0, ea),
            height: withOut(0, ea),
            position: "relative",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "start",
          },
          children: [
            {
              style: {
                display: "inline-flex",
                position: "relative",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center",
                textAlign: "right",
                width: withOut(0, ea),
                height: withOut(0, ea),
              },
              child: {
                text: "디자인비",
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(projectPropertySize) + ea,
                  fontWeight: String(projectPropertyLightWeight),
                  fontFamily: "pretendard",
                  color: colorExtended.gray5,
                  top: String(projectPropertyTextTop) + ea,
                }
              }
            },
            {
              style: {
                display: "inline-flex",
                position: "absolute",
                flexDirection: "row",
                justifyContent: "end",
                alignItems: "center",
                textAlign: "right",
                width: withOut(valueColumnMargin, ea),
                height: withOut(0, ea),
                top: String(0),
                right: String(0) + ea,
              },
              child: {
                text: autoComma(Math.round(contents.consumer / 10000)) + "만원",
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(projectPropertySize) + ea,
                  fontWeight: String(projectPropertyLightWeight),
                  fontFamily: "pretendard",
                  color: colorExtended.gray5,
                  top: String(projectPropertyTextTop) + ea,
                }
              }
            },
          ]
        },
      ]
    });
    createNode({
      mother: descriptionBox,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        height: String(barMargin) + ea,
        flexDirection: "row",
        justifyContent: "start",
        alignItems: "start",
      },
      children: [
        {
          style: {
            display: "inline-flex",
            width: withOut(100, 0, ea),
            height: withOut(0, ea),
            position: "relative",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "start",
          },
          children: [
            {
              style: {
                display: "inline-flex",
                position: "relative",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center",
                textAlign: "right",
                width: withOut(0, ea),
                height: withOut(0, ea),
              },
              child: {
                text: "시공 예산",
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(projectPropertySize) + ea,
                  fontWeight: String(projectPropertyLightWeight),
                  fontFamily: "pretendard",
                  color: colorExtended.gray5,
                  top: String(projectPropertyTextTop) + ea,
                }
              }
            },
            {
              style: {
                display: "inline-flex",
                position: "absolute",
                flexDirection: "row",
                justifyContent: "end",
                alignItems: "center",
                textAlign: "right",
                width: withOut(valueColumnMargin, ea),
                height: withOut(0, ea),
                top: String(0),
                right: String(0) + ea,
              },
              child: {
                text: ((evaluation.spend.construct <= 0) ? ((contents.service.serid === "s2011_aa01s") ? String(0) + "원" : "비공개") : autoComma(evaluation.spend.construct / 10000) + "만원대"),
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(projectPropertySize) + ea,
                  fontWeight: String(projectPropertyLightWeight),
                  fontFamily: "pretendard",
                  color: colorExtended.gray5,
                  top: String(projectPropertyTextTop) + ea,
                }
              }
            },
          ]
        },
      ]
    });
    // 3
    createNode({
      mother: descriptionBox,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        height: String(barMargin) + ea,
        flexDirection: "row",
        justifyContent: "start",
        alignItems: "start",
      },
      children: [
        {
          style: {
            display: "inline-flex",
            width: withOut(100, 0, ea),
            height: withOut(0, ea),
            position: "relative",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "start",
          },
          children: [
            {
              style: {
                display: "inline-flex",
                position: "relative",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center",
                textAlign: "right",
                width: withOut(0, ea),
                height: withOut(0, ea),
              },
              child: {
                text: "스타일링 예산",
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(projectPropertySize) + ea,
                  fontWeight: String(projectPropertyLightWeight),
                  fontFamily: "pretendard",
                  color: colorExtended.gray5,
                  top: String(projectPropertyTextTop) + ea,
                }
              }
            },
            {
              style: {
                display: "inline-flex",
                position: "absolute",
                flexDirection: "row",
                justifyContent: "end",
                alignItems: "center",
                textAlign: "right",
                width: withOut(valueColumnMargin, ea),
                height: withOut(0, ea),
                top: String(0),
                right: String(0) + ea,
              },
              child: {
                text: autoComma(evaluation.spend.styling < 0 ? 0 : evaluation.spend.styling / 10000) + "만원대",
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(projectPropertySize) + ea,
                  fontWeight: String(projectPropertyLightWeight),
                  fontFamily: "pretendard",
                  color: colorExtended.gray5,
                  top: String(projectPropertyTextTop) + ea,
                }
              }
            },
          ]
        },
      ]
    });
    // gray bar
    createNode({
      mother: descriptionBox,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        height: String(grayBarMargin) + ea,
        borderBottom: String(borderWidthLight) + "px solid " + colorExtended.gray3,
        marginBottom: desktop ? String(grayBarMargin) + ea : String(grayBarMargin + 1) + ea,
        flexDirection: "row",
        justifyContent: "start",
        alignItems: "start",
      }
    });
    // 5
    createNode({
      mother: descriptionBox,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        height: String(barMargin) + ea,
        flexDirection: "row",
        justifyContent: "start",
        alignItems: "start",
      },
      children: [
        {
          style: {
            display: "inline-flex",
            width: withOut(50, 0, ea),
            height: withOut(0, ea),
            position: "relative",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "start",
          },
          children: [
            {
              style: {
                display: "inline-flex",
                position: "relative",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center",
                textAlign: "right",
                width: withOut(0, ea),
                height: withOut(0, ea),
              },
              child: {
                text: "평수",
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(projectPropertySize) + ea,
                  fontWeight: String(projectPropertyLightWeight),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  top: String(projectPropertyTextTop) + ea,
                }
              }
            },
            {
              style: {
                display: "inline-flex",
                position: "absolute",
                flexDirection: "row",
                justifyContent: "end",
                alignItems: "center",
                textAlign: "right",
                width: withOut(valueColumnMargin, ea),
                height: withOut(0, ea),
                top: String(0),
                right: String(valueColumnMargin) + ea,
              },
              child: {
                text: String(contents.contents.portfolio.spaceInfo.pyeong) + "py <b%( %b><u%" + String(Math.floor(contents.contents.portfolio.spaceInfo.pyeong * 3.306 * 10) / 10) + "m%u><s%2%s><b% )%b>",
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(projectPropertySize) + ea,
                  fontWeight: String(projectPropertyBoldWeight),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  top: String(projectPropertyTextTop) + ea,
                },
                bold: {
                  fontSize: String(projectPropertySize) + ea,
                  fontWeight: String(500),
                  fontFamily: "pretendard",
                  color: colorExtended.mainBlue,
                },
                under: {
                  fontSize: String(projectPropertySize) + ea,
                  fontWeight: String(600),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                },
                special: {
                  fontSize: String(smallPropertySize) + ea,
                  fontWeight: String(500),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  position: "relative",
                  top: String(smallPropertyTextTop) + ea,
                },
              }
            },
          ]
        },
        {
          style: {
            display: "inline-flex",
            width: String(50) + '%',
            height: withOut(0, ea),
            position: "relative",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "start",
          },
          children: [
            {
              style: {
                display: "inline-flex",
                position: "relative",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center",
                textAlign: "right",
                paddingLeft: String(valueColumnMargin) + ea,
                width: withOut(valueColumnMargin, ea),
                height: withOut(0, ea),
              },
              child: {
                text: "현장명",
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(projectPropertySize) + ea,
                  fontWeight: String(projectPropertyLightWeight),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  top: String(projectPropertyTextTop) + ea,
                },
              }
            },
            {
              style: {
                display: "inline-flex",
                position: "absolute",
                flexDirection: "row",
                justifyContent: "end",
                alignItems: "center",
                textAlign: "right",
                width: withOut(0, ea),
                height: withOut(0, ea),
                top: String(0),
                right: String(0) + ea,
              },
              child: {
                text: contents.contents.portfolio.spaceInfo.space,
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(projectPropertySize) + ea,
                  fontWeight: String(projectPropertyBoldWeight),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  top: String(projectPropertyTextTop) + ea,
                },
                special: {
                  fontSize: String(smallPropertySize) + ea,
                  fontWeight: String(700),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  position: "relative",
                  top: String(smallPropertyTextTop) + ea,
                },
              }
            },
          ]
        },
      ]
    });
    // 6
    createNode({
      mother: descriptionBox,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        height: String(barMargin) + ea,
        flexDirection: "row",
        justifyContent: "start",
        alignItems: "start",
      },
      children: [
        {
          style: {
            display: "inline-flex",
            width: withOut(50, 0, ea),
            height: withOut(0, ea),
            position: "relative",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "start",
          },
          children: [
            {
              style: {
                display: "inline-flex",
                position: "relative",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center",
                textAlign: "right",
                width: withOut(0, ea),
                height: withOut(0, ea),
              },
              child: {
                text: "서비스 유형",
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(projectPropertySize) + ea,
                  fontWeight: String(projectPropertyLightWeight),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  top: String(projectPropertyTextTop) + ea,
                }
              }
            },
            {
              style: {
                display: "inline-flex",
                position: "absolute",
                flexDirection: "row",
                justifyContent: "end",
                alignItems: "center",
                textAlign: "right",
                width: withOut(valueColumnMargin, ea),
                height: withOut(0, ea),
                top: String(0),
                right: String(valueColumnMargin) + ea,
              },
              child: {
                text: serviceParsing(contents.service).replace(/(온라인|오프라인)[ ]*/gi, '').replace(/[ ]*(basic|mini|premium)/gi, '').trim(),
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(projectPropertySize) + ea,
                  fontWeight: String(projectPropertyBoldWeight),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  top: String(projectPropertyTextTop) + ea,
                }
              }
            },
          ]
        },
        {
          style: {
            display: "inline-flex",
            width: String(50) + '%',
            height: withOut(0, ea),
            position: "relative",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "start",
          },
          children: [
            {
              style: {
                display: "inline-flex",
                position: "relative",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center",
                textAlign: "right",
                paddingLeft: String(valueColumnMargin) + ea,
                width: withOut(valueColumnMargin, ea),
                height: withOut(0, ea),
              },
              child: {
                text: "기간",
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(projectPropertySize) + ea,
                  fontWeight: String(projectPropertyLightWeight),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  top: String(projectPropertyTextTop) + ea,
                },
              }
            },
            {
              style: {
                display: "inline-flex",
                position: "absolute",
                flexDirection: "row",
                justifyContent: "end",
                alignItems: "center",
                textAlign: "right",
                width: withOut(0, ea),
                height: withOut(0, ea),
                top: String(0),
                right: String(0) + ea,
              },
              child: {
                text: contents.period,
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(projectPropertySize) + ea,
                  fontWeight: String(projectPropertyBoldWeight),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  top: String(projectPropertyTextTop) + ea,
                },
                special: {
                  fontSize: String(smallPropertySize) + ea,
                  fontWeight: String(700),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  position: "relative",
                  top: String(smallPropertyTextTop) + ea,
                },
              }
            },
          ]
        },
      ]
    });
    // 7
    createNode({
      mother: descriptionBox,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        height: String(barMargin) + ea,
        flexDirection: "row",
        justifyContent: "start",
        alignItems: "start",
      },
      children: [
        {
          style: {
            display: "inline-flex",
            width: withOut(50, 0, ea),
            height: withOut(0, ea),
            position: "relative",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "start",
          },
          children: [
            {
              style: {
                display: "inline-flex",
                position: "relative",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center",
                textAlign: "right",
                width: withOut(0, ea),
                height: withOut(0, ea),
              },
              child: {
                text: "가구 구매",
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(projectPropertySize) + ea,
                  fontWeight: String(projectPropertyLightWeight),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  top: String(projectPropertyTextTop) + ea,
                }
              }
            },
            {
              style: {
                display: "inline-flex",
                position: "absolute",
                flexDirection: "row",
                justifyContent: "end",
                alignItems: "center",
                textAlign: "right",
                width: withOut(valueColumnMargin, ea),
                height: withOut(0, ea),
                top: String(0),
                right: String(valueColumnMargin) + ea,
              },
              child: {
                text: [ "기존 가구 재배치", "일부 신규 구매", "전체 신규 구매" ][evaluation.purchase.furniture],
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(projectPropertySize) + ea,
                  fontWeight: String(projectPropertyBoldWeight),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  top: String(projectPropertyTextTop) + ea,
                }
              }
            },
          ]
        },
        {
          style: {
            display: "inline-flex",
            width: String(50) + '%',
            height: withOut(0, ea),
            position: "relative",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "start",
          },
          children: [
            {
              style: {
                display: "inline-flex",
                position: "relative",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center",
                textAlign: "right",
                paddingLeft: String(valueColumnMargin) + ea,
                width: withOut(valueColumnMargin, ea),
                height: withOut(0, ea),
              },
              child: {
                text: "제안 구매율",
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(projectPropertySize) + ea,
                  fontWeight: String(projectPropertyLightWeight),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  top: String(projectPropertyTextTop) + ea,
                },
              }
            },
            {
              style: {
                display: "inline-flex",
                position: "absolute",
                flexDirection: "row",
                justifyContent: "end",
                alignItems: "center",
                textAlign: "right",
                width: withOut(0, ea),
                height: withOut(0, ea),
                top: String(0),
                right: String(0) + ea,
              },
              child: {
                text: String(Math.floor(evaluation.purchase.compliance * 1000) / 10) + "<b%%%b>",
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(projectPropertySize) + ea,
                  fontWeight: String(projectPropertyBoldWeight),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  top: String(projectPropertyTextTop) + ea,
                },
                bold: {
                  fontSize: String(projectPropertySize) + ea,
                  fontWeight: String(projectPropertyBoldWeight),
                  fontFamily: "pretendard",
                  color: colorExtended.mainBlue,
                },
                special: {
                  fontSize: String(smallPropertySize) + ea,
                  fontWeight: String(projectPropertyBoldWeight),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  position: "relative",
                  top: String(smallPropertyTextTop) + ea,
                },
              }
            },
          ]
        },
      ]
    });
    // 8 - gray bar
    createNode({
      mother: descriptionBox,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        height: String(grayBarMargin) + ea,
        borderBottom: String(borderWidthLight) + "px solid " + colorExtended.gray3,
        marginBottom: desktop ? String(grayBarMargin) + ea : String(grayBarMargin + 1) + ea,
        flexDirection: "row",
        justifyContent: "start",
        alignItems: "start",
      }
    });
    // 9 - final
    createNode({
      mother: descriptionBox,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        height: String(barMargin) + ea,
        flexDirection: "row",
        justifyContent: "start",
        alignItems: "start",
        marginBottom: String(propertyFinalMarginBottom) + ea,
      },
      children: [
        {
          style: {
            display: "inline-flex",
            width: withOut(0, ea),
            height: withOut(0, ea),
            position: "relative",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "start",
          },
          children: [
            {
              style: {
                display: "inline-flex",
                position: "relative",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center",
                textAlign: "right",
                width: withOut(0, ea),
                height: withOut(0, ea),
              },
              child: {
                text: "만족도",
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(projectPropertySize) + ea,
                  fontWeight: String(projectPropertyLightWeight),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  top: String(projectPropertyTextTop) + ea,
                }
              }
            },
            {
              style: {
                display: "inline-flex",
                position: "absolute",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center",
                textAlign: "right",
                top: String(satisBarVisualTop) + ea,
                left: String(satisBarLeft) + ea,
                width: withOut(satisBarLeft, ea),
                height: String(satisBarHeight) + ea,
                borderRadius: String(satisBarHeight) + ea,
                background: colorExtended.blueWhiteWhiteBack,
              },
              child: {
                style: {
                  display: "inline-flex",
                  position: "relative",
                  width: withOut(0, ea),
                  height: String(satisBarHeight) + ea,
                  borderRadius: String(satisBarHeight) + ea,
                  flexDirection: "row",
                  overflow: "hidden",
                },
                children: variableArray(satisLength).map((i, index, arr) => {
                  const obj = {
                    style: {
                      display: "inline-flex",
                      position: "relative",
                      borderRight: (index === arr.length - 1) ? "" : String(borderWidth) + "px solid " + colorExtended.blueLight,
                      boxSizing: "border-box",
                      width: "calc(100% / " + String(satisLength) + ")",
                      opacity: String(0.9),
                      "mix-blend-mode": "multiply",
                      height: withOut(0, ea),
                    }
                  };
  
                  if (index === 0) {
                    obj.previous = {
                      style: {
                        display: "inline-flex",
                        position: "absolute",
                        top: String(0),
                        left: String(0),
                        width: "calc(" + String((90 * ((evaluation.satisfaction.design + evaluation.satisfaction.feedback + evaluation.satisfaction.operation + evaluation.purchase.list) / 8)) + ((Number(instance.pid.replace(/[^0-9]/gi, '')) % 100) % 10)) + "%)",
                        height: withOut(0, ea),
                        borderRadius: String(satisBarHeight) + ea,
                        background: colorExtended.gradientBlue,
                      }
                    };
                  }
  
                  return obj;
                })
              }
            },
          ]
        },
      ]
    });

  }

}

ReviewDetailJs.prototype.reviewDetailBox = function () {
  const instance = this;
  const { createNode, colorChip, colorExtended, withOut, svgMaker, isMac, isIphone, serviceParsing, variableArray, autoComma, setQueue, selectByClass, fireEvent } = GeneralJs;
  const { totalContents, naviHeight, ea, media, pid, standardWidth, evaluation, version } = this;
  const { contentsArr, editable } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const contents = contentsArr.toNormal().filter((obj) => { return obj.contents.portfolio.pid === pid })[0];
  const photoChar = 't';
  const photoCharMobile = "mot";
  const bigPhotoClassName = "bigPhotoClassName";
  const baseMotherClassName = "baseMotherClassName";
  const imgTargetClassName = "imgTargetClassName";
  const slideDelta = 2000;
  const restartDelta = 4000;
  let mainHeight;
  let mainTong;
  let mainBelowBarHeight;
  let contentsBox;
  let pictureWidth, pictureHeight;
  let picture;
  let bottomVisual;
  let photoRightMargin;
  let textTong;
  let quoteHeight, quoteWidth;
  let quoteTop;
  let quotePaddingLeft;
  let topReviewSize, topReviewWeight;
  let mainTitleLineHeight;
  let mainTitleMarginTop;
  let subTitleSize, subTitleWeight;
  let subTitleMarginTop;
  let subLineWidth, subLineHeight, subLineLeft;
  let bottomWordingVisualBottom;
  let bottomWordingLineHeight;
  let mobileWhiteBoxTop, mobileWhiteBoxLeft;
  let mobileWhiteBoxWidth, mobileWhiteBoxHeight;
  let mobileWordingLeft;
  let borderWidth;
  let descriptionBox;
  let designerInfoBox;
  let designerSpacePhotoWidth;
  let boxRadius;
  let designerSpacePhotoMarginRight;
  let designerDescriptionBox;
  let barBlank;
  let barMargin;
  let mainRatio;
  let valueColumnMargin;
  let valueBlockHeight;
  let borderWidthLight;
  let grayBarMargin;
  let barMarginBottom;
  let satisBarLeft, satisBarHeight;
  let satisBarVisualTop;
  let satisLength;
  let contentsKeywords;
  let keywordsLeft;
  let thisVersion;
  let mainMargin;
  let photoRatio;
  let titleBox;
  let grayLineBoxMarginTop, grayLineBoxBetween;
  let grayLineBoxPaddingTop;
  let grayLineBoxPaddingLeft;
  let thisContents;
  let contentsBoxPaddingBottom;
  let mainTitleSize, mainTitleWeight;
  let commentBoxPaddingBottom;
  let commentSquareWidth, commentSquareMarginRight;
  let commentSize, commentWeight;
  let commentTextTop;
  let commentBoxHeight;
  let detailContentsPaddingTop;
  let detailContentsSize, detailContentsWeight, detailContentsLineHeight;
  let keywordsBoxMarginBottom;
  let keywordsBoxVisualLeft;
  let keywordsHeight;
  let keywordsPadding;
  let keywordsBetween;
  let keywordsBetweenBottom;
  let keywordsSize;
  let keywordsWeight;
  let keywordsSharpWeight;
  let keywordsTextTop;
  let slideBoxHeight, slideBoxHeightPadding;
  let slidePhotoBetween;
  let minusVisual;
  let childrenSpreadMap;
  let childrenFocusEvent;
  let fireSlideTurn;

  thisVersion = version;

  mainRatio = <%% (10 / 16), (12 / 16), (14 / 16), (16 / 16), (10 / 16) %%>;
  mainMargin = <%% 150, 120, 100, 80, 22.5 %%>;
  photoRatio = <%% 0.75, 0.7, 0.65, 0.6, 0.75 %%>;

  mainHeight = <%% 800, 750, 710, 590, mainRatio * 100 %%>;
  mainBelowBarHeight = <%% 250, 250, 250, 216, 250 %%>;

  contentsBoxTop = <%% 70, 70, 70, 70, 0 %%>;
  contentsBoxWidth = <%% 1200, 1050, 900, 720, 1200 %%>;

  bottomVisual = <%% 6, 6, 6, 6, 6 %%>;

  pictureWidth = <%% 820, 720, 610, 480, 610 %%>;
  pictureHeight = mainHeight - (contentsBoxTop * 2) - bottomVisual;

  boxRadius = <%% 15, 15, 15, 15, 15 %%>;

  photoRightMargin = <%% 45, 32, 30, 25, 45 %%>;
  designerSpacePhotoWidth = <%% 100, 100, 100, 100, 100 %%>;
  designerSpacePhotoMarginRight = <%% 20, 20, 20, 20, 20 %%>;

  barMargin = <%% 30, 30, 30, 30, 6 %%>;
  barMarginBottom = <%% 30, 30, 30, 30, 30 %%>;
  valueColumnMargin = <%% 22, 20, 18, 16, 22 %%>;
  valueBlockHeight = <%% 45, 45, 45, 45, 45 %%>;
  grayBarMargin = <%% 16, 16, 16, 16, 16 %%>;

  keywordsLeft = <%% 60, 60, 60, 60, 60 %%>;
  satisBarLeft = <%% 130, 130, 130, 130, 130 %%>;
  satisBarHeight = <%% 20, 20, 20, 20, 20 %%>;
  satisBarVisualTop = <%% -0.5, -0.5, -0.5, -0.5, -0.5 %%>;
  satisLength = <%% 10, 10, 10, 10, 10 %%>;

  quoteHeight = <%% 14, 14, 13, 11, 1.8 %%>;
  quoteWidth = SvgTong.getRatio(SvgTong.stringParsing(svgMaker.doubleQuote(colorExtended.mainBlue))) * quoteHeight;
  quoteTop = <%% 140, 135, 125, 80, 5 %%>;
  quotePaddingLeft = <%% 2, 2, 2, 2, 5.4 %%>;

  topReviewSize = <%% 16, 16, 15, 14, 15 %%>;
  topReviewWeight = <%% 400, 400, 400, 400, 400 %%>;

  mainTitleLineHeight = <%% 1.16, 1.16, 1.16, 1.16, 1.2 %%>;
  mainTitleMarginTop = <%% 7, 7, 7, 5, 8.5 %%>;

  subTitleSize = <%% 18, 17, 17, 15, 3 %%>;
  subTitleWeight = <%% 600, 600, 600, 600, 600 %%>;
  subTitleMarginTop = <%% 17, 17, 16, 13, 20 %%>;

  subLineWidth = <%% 170, 120, 95, 65, 95 %%>;
  subLineHeight = <%% (isMac() ? 11 : 9), (isMac() ? 11 : 9), (isMac() ? 11 : 9), (isMac() ? 10 : 8), 11 %%>;
  subLineLeft = <%% 160, 150, 150, 135, 150 %%>;

  bottomWordingVisualBottom = <%% (isMac() ? -2 : -4), (isMac() ? -2 : -4), (isMac() ? -2 : -4), (isMac() ? -2 : -4), -2 %%>;
  bottomWordingLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;

  mobileWhiteBoxTop = <%% 20, 20, 20, 20, 20 %%>;
  mobileWhiteBoxLeft = <%% 8, 8, 8, 8, 8 %%>;
  mobileWhiteBoxWidth = <%% 38, 38, 38, 38, 38 %%>;
  mobileWhiteBoxHeight = <%% 30, 30, 30, 30, 30 %%>;

  mobileWordingLeft = <%% 5.3, 5.3, 5.3, 5.3, 5.3 %%>;

  borderWidth = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;
  borderWidthLight = <%% 1, 1, 1, 1, 1 %%>;

  grayLineBoxMarginTop = <%% 22, 20, 18, 16, 6 %%>;
  grayLineBoxBetween = <%% 10, 10, 10, 10, 10 %%>;
  grayLineBoxPaddingTop = <%% 20, 20, 20, 20, 20 %%>;
  grayLineBoxPaddingLeft = <%% 24, 24, 24, 24, 24 %%>;

  contentsBoxPaddingBottom = <%% 60, 45, 40, 35, 2.5 %%>;
  mainTitleSize = <%% 21, 19, 18, 16, 4.6 %%>;
  mainTitleWeight = <%% 700, 700, 700, 700, 700 %%>;

  commentBoxPaddingBottom = <%% 6, 6, 6, 6, 2 %%>;
  commentSquareWidth = <%% 10, 9, 9, 8, 2.4 %%>;
  commentSquareMarginRight = <%% 4, 4, 4, 4, 1 %%>;
  commentSize = <%% 15, 14, 14, 13, 3.6 %%>;
  commentWeight = <%% 700, 700, 700, 700, 700 %%>;
  commentTextTop = <%% (isMac() ? 1 : 0), (isMac() ? 1 : 0), (isMac() ? 1 : 0), (isMac() ? 1 : 0), 0.2 %%>;
  commentBoxHeight = <%% 26.5, 25.5, 25.5, 25.5, 25.5 %%>;
  detailContentsPaddingTop = <%% 12, 12, 12, 12, 5 %%>;
  detailContentsSize = <%% 14, 13, 13, 12, 3.5 %%>;
  detailContentsWeight = <%% 400, 400, 400, 400, 400 %%>;
  detailContentsLineHeight = <%% 1.66, 1.66, 1.66, 1.66, 1.66 %%>;

  keywordsBoxMarginBottom = <%% -6, -6, -5, -4, -6 %%>;
  keywordsBoxVisualLeft = <%% -4, -4, -4, -4, -4 %%>;

  keywordsHeight = <%% 30, 27, 25, 24, 6.5 %%>;
  keywordsPadding = <%% 14, 12, 10, 10, 2 %%>;
  keywordsBetween = <%% 4, 4, 3, 3, 1 %%>;

  keywordsBetweenBottom = <%% 6, 6, 5, 5, 6 %%>;

  keywordsSize = <%% 12.5, 12, 11, 10, 2.7 %%>;
  keywordsWeight = <%% 700, 700, 700, 700, 700 %%>;
  keywordsSharpWeight = <%% 400, 400, 400, 400, 400 %%>;
  keywordsTextTop = <%% (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), -0.1 %%>;

  slideBoxHeight = <%% 160, 150, 140, 120, 20 %%>;
  slideBoxHeightPadding = <%% 10, 8, 6, 4, 1 %%>;
  slidePhotoBetween = <%% 6, 5, 4, 3, 1 %%>;

  minusVisual = <%% 10, 10, 10, 12, 1 %%>;

  thisContents = contents.contents.portfolio.contents.detail[0].contents;

  contentsKeywords = contents.contents.portfolio.detailInfo.tag.filter((s) => {
    let boo = true;
    if (s === "all" || /아파트/gi.test(s) || /평대/gi.test(s) || /인테리어/gi.test(s) || s === "화이트" || s === "네추럴" || s === "네츄럴" || s === "내츄럴" || s === "자연스러운") {
      boo = false;
    }
    return boo;
  }).filter((s) => { return s.length > 2 }).filter((s, index, arr) => {
    const regArr = arr.map((str) => { return new RegExp(str, "gi"); }).filter((r, i) => { return index !== i });
    let boo = true;
    for (let r of regArr) {
      if (r.test(s)) {
        boo = false;
        break;
      }
    }
    return boo;
  });
  if (media[0] || media[1]) {
    contentsKeywords = contentsKeywords.slice(0, 5);
  } else {
    contentsKeywords = contentsKeywords.slice(0, 4);
  }

  fireSlideTurn = async function () {
    try {
      const [ motherTarget ] = selectByClass(baseMotherClassName);
      const returnBoo = (motherTarget.getAttribute("return") === String(1));
      let targetIndex, targets, target, thisFunction;
      if (returnBoo) {
        motherTarget.style.transition = "all 0s ease";
        targetIndex = Number(motherTarget.getAttribute("start"));
        targets = selectByClass(imgTargetClassName);
        target = targets[targetIndex];
        thisFunction = childrenFocusEvent().bind(target);
        await thisFunction({ real: false });
        setQueue(() => {
          motherTarget.style.transition = "all 0.4s ease";
        }, 300);
      } else {
        targetIndex = Number(motherTarget.getAttribute("index")) + 1;
        targets = selectByClass(imgTargetClassName);
        target = targets[targetIndex];
        thisFunction = childrenFocusEvent().bind(target);
        await thisFunction({ real: false });
      }

      instance.slideTimeout = setTimeout(async () => {
        try {
          await fireSlideTurn();
        } catch {}
      }, slideDelta);
    } catch {}
  }

  childrenFocusEvent = () => {
    return async function (e) {
      try {
        const self = this;
        const thisMother = this.parentNode;
        const thisGrandMother = thisMother.parentNode;
        const siblings = [ ...thisMother.children ];
        const gs = this.getAttribute("gs");
        const pid = this.getAttribute("pid");
        const index = Number(this.getAttribute("index"));
        const originalIndex = Number(this.getAttribute("original"));
        const px = "px";
        const grandMotherBox = thisGrandMother.getBoundingClientRect();
        const motherBox = thisMother.getBoundingClientRect();
        const thisBox = self.getBoundingClientRect();
        const thisStatus = Number(thisMother.style.transform.replace(/[^0-9\-\.]/gi, ''));
        const visualConst = (<&& 300 | 300 | 200 | 150 | 10 &&>);
        const [ bigPhotoDom ] = selectByClass(bigPhotoClassName);
        let alpha, thisIndex;
        let standardX, targetXIndex;

        if (e.real !== false) {
          if (instance.slideTimeout !== null) {
            clearTimeout(instance.slideTimeout);
            instance.slideTimeout = null;
            setQueue(fireSlideTurn, restartDelta);
          }
        }

        alpha = 0;
        alpha = (grandMotherBox.width / 2) - (thisBox.width / 2) - (thisBox.x - grandMotherBox.x)
        alpha = alpha + thisStatus;

        if (thisStatus === 0) {
          standardX = motherBox.x + (grandMotherBox.width / 2)
          targetXIndex = 0;
          for (let i = 0; i < siblings.length; i++) {
            if (standardX <= siblings[i].getBoundingClientRect().x) {
              targetXIndex = i;
              break;
            }
          }
          thisMother.setAttribute("start", String(targetXIndex + 1));
        }

        thisMother.style.transform = "translateX(" + String(alpha) + px + ")";
        thisIndex = siblings.findIndex((d) => { return d === self });

        thisMother.setAttribute("index", String(thisIndex));
        if (gs === "g") {
          bigPhotoDom.style.backgroundSize = ((media[0] || mobile) ? "100% auto" : "auto 100%");
        } else {
          bigPhotoDom.style.backgroundSize = "auto 100%";
        }
        bigPhotoDom.style.backgroundImage = "url('" + "https://" + FILEHOST + "/list_image/portp" + pid + (desktop ? ("/" + photoChar) : ("/mobile/" + photoCharMobile)) + String(originalIndex) + pid + ".jpg" + "')";

        thisMother.setAttribute("return", String(0));
        if ((motherBox.width + motherBox.x - visualConst) <= (grandMotherBox.width + grandMotherBox.x)) {
          thisMother.setAttribute("return", String(1));
        } else {
          thisMother.setAttribute("return", String(0));
        }

      } catch (e) {
        console.log(e);
      }
    }
  }

  childrenSpreadMap = () => {
    return (o) => {
      const { index, gs } = o;
      const src = "https://" + FILEHOST + "/list_image/portp" + pid + (desktop ? ("/" + photoChar) : ("/mobile/" + photoCharMobile)) + String(index) + pid + ".jpg";
      return {
        mode: "img",
        class: [ imgTargetClassName ],
        attribute: { src, gs, pid, index: String(index), original: String(index) },
        event: {
          click: childrenFocusEvent(),
        },
        style: {
          display: "inline-block",
          position: "relative",
          height: withOut(0, ea),
          marginLeft: String(slidePhotoBetween) + ea,
          borderRadius: String(desktop ? 8 : 2) + "px",
          cursor: "pointer",
        }
      }
    }
  }


  if (media[3] || media[4]) {
    contentsKeywords = contentsKeywords.slice(0, 4);
  }

  mainTong = createNode({
    mother: totalContents,
    style: {
      display: "block",
      position: "relative",
      width: withOut(0, ea),
      background: colorExtended.white,
      animation: "fadeupdelay 0.5s ease forwards",
    },
  });

  // total base
  contentsBox = createNode({
    mother: mainTong,
    style: {
      display: "flex",
      position: "relative",
      flexDirection: desktop ? "row" : "column",
      width: desktop ? String(standardWidth) + ea : withOut(0, ea),
      left: desktop ? "calc(50% - " + String(standardWidth / 2) + ea + ")" : String(0),
      top: String(0),
      paddingTop: String(mainMargin) + ea,
      paddingBottom: String(contentsBoxPaddingBottom) + ea,
    }
  });

  // left picture
  picture = createNode({
    mother: contentsBox,
    class: [ bigPhotoClassName ],
    style: {
      display: desktop ? "inline-flex" : "flex",
      position: "relative",
      width: desktop ? String(standardWidth * photoRatio) + ea : withOut(0, ea),
      height: desktop ? String((standardWidth * photoRatio) * mainRatio) + ea : String(standardWidth * (210 / 297)) + ea,
      borderRadius: desktop ? String(boxRadius) + "px" : "",
      background: colorExtended.gray1,
      backgroundImage: "url('" + "https://" + FILEHOST + "/list_image/portp" + pid + (desktop ? ("/" + photoChar) : ("/mobile/" + photoCharMobile)) + String(1) + pid + ".jpg" + "')",
      backgroundSize: (media[0] || mobile) ? "100% auto" : "auto 100%",
      backgroundPosition: "50% 50%",
      backgroundRepeat: "no-repeat",
      boxShadow: desktop ? "0px 8px 22px -15px " + colorChip.shadow : "",
      marginRight: desktop ? String(photoRightMargin) + ea : "",
      verticalAlign: "top",
      transition: "all 0s ease",
    }
  });

  if (mobile) {
    createNode({
      mother: mainTong,
      style: {
        display: "flex",
        position: "relative",
        flexDirection: "row",
        width: String(100) + '%',
        left: String(0),
      },
      children: [
        {
          style: {
            display: "flex",
            flexDirection: "row",
            position: "relative",
            width: withOut(0, ea),
            height: String(slideBoxHeight - (slideBoxHeightPadding * 2)) + ea,
            top: String(slideBoxHeightPadding) + ea,
            left: String(0) + ea,
            overflow: "scroll",
            justifyContent: "center",
            alignItems: "center",
          },
          child: {
            class: [ baseMotherClassName ],
            attribute: { index: String(0), start: String(0) },
            style: {
              display: "flex",
              flexDirection: "row",
              position: "relative",
              width: String(3000) + "%",
              justifyContent: "center",
              alignItems: "center",
              height: withOut(0, ea),
              transform: "translateX(0px)",
              transformOrigin: "50% 50%",
              transition: "all 0.4s ease",
            },
            children: contents.photos.detail.map(childrenSpreadMap()).concat(contents.photos.detail.map(childrenSpreadMap())).concat(contents.photos.detail.map(childrenSpreadMap())),
          }
        }
      ]
    });

    contentsBox = createNode({
      mother: mainTong,
      style: {
        display: "flex",
        position: "relative",
        flexDirection: desktop ? "row" : "column",
        width: String(standardWidth) + ea,
        left: "calc(50% - " + String(standardWidth / 2) + ea + ")",
        top: String(0),
        paddingTop: String(10) + ea,
      }
    });
  }

  // right box
  descriptionBox = createNode({
    mother: contentsBox,
    style: {
      display: desktop ? "inline-flex" : "flex",
      position: "relative",
      width: desktop ? withOut((standardWidth * photoRatio) + photoRightMargin, ea) : withOut(0, ea),
      height: desktop ? String((standardWidth * photoRatio) * mainRatio) + ea : String(100) + '%',
      verticalAlign: "top",
      flexDirection: "column",
      justifyContent: "start",
      alignItems: "start",
    }
  });

  titleBox = createNode({
    mother: descriptionBox,
    style: {
      display: "flex",
      position: "relative",
      width: withOut(0, ea),
    },
    child: {
      text: contents.contents.review.title.main.replace(/, /gi, "\n"),
      style: {
        display: "inline-block",
        position: "relative",
        fontSize: String(mainTitleSize) + ea,
        fontWeight: String(mainTitleWeight),
        color: colorExtended.black,
        fontFamily: "pretendard",
        lineHeight: 1.4,
      }
    }
  });
  if (editable) {
    titleBox.addEventListener("click", async (e) => {
      let words, tempArr;
      words = null;
      while (typeof words !== "string") {
        words = await GeneralJs.promptLong("새로운 고객 리뷰의 제목을 적어주세요! (중간에 쉼표가 있어야 합니다 => ', ')", contents.contents.review.title.main);
        if (typeof words === "string") {
          if (words === "") {
            words = null;
          } else if (!/, /gi.test(words)) {
            words = null;
          } else {
            tempArr = words.split(", ");
            if (tempArr.length !== "2") {
              tempArr = tempArr.map((s) => { return s.trim() });
              if (tempArr[0].length < 5 || tempArr[1].length < 5) {
                words = null;
              } else {
                words = tempArr[0] + ", " + tempArr[1];
              }
            } else {
              words = null;
            }
          }
        }
      }
      await GeneralJs.ajaxJson({ mode: "title", words, pid }, S3HOST + ":3000/updateReviewInfo");
      window.location.reload();
    })
  }

  createNode({
    mother: descriptionBox,
    event: {
      click: async function (e) {
        let words;
        if (editable) {
          words = null;
          while (typeof words !== "string") {
            words = await GeneralJs.promptVeryLong("새로운 이야기를 적어주세요!\n" + thisContents, thisContents);
            if (typeof words === "string") {
              if (words === "") {
                words = null;
              }
            }
          }
          await GeneralJs.ajaxJson({ mode: "story", words, pid }, S3HOST + ":3000/updateReviewInfo");
          window.location.reload();
        }
      }
    },
    style: {
      display: "flex",
      position: "relative",
      width: desktop ? withOut(grayLineBoxPaddingLeft * 2, ea) : withOut(0, ea),
      height: desktop ? withOut(grayLineBoxMarginTop + titleBox.getBoundingClientRect().height + (grayLineBoxPaddingTop * 2) + grayLineBoxMarginTop + (keywordsHeight * 2) + keywordsBetweenBottom + minusVisual, ea) : "",
      marginTop: String(grayLineBoxMarginTop) + ea,
      border: desktop ? "1px solid " + colorExtended.gray3 : "",
      borderRadius: desktop ? String(12) + "px" : "",
      paddingLeft: desktop ? String(grayLineBoxPaddingLeft) + ea : "",
      paddingRight: desktop ? String(grayLineBoxPaddingLeft) + ea : "",
      paddingTop: desktop ? String(grayLineBoxPaddingTop) + ea : "",
      paddingBottom: desktop ? String(grayLineBoxPaddingTop) + ea : "",
      flexDirection: "column",
      cursor: "pointer",
    },
    children: [
      {
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          flexDirection: "row",
          justifyContent: "start",
          alignItems: "center",
          height: desktop ? String(commentBoxHeight - commentBoxPaddingBottom - borderWidth) + ea : "",
          paddingBottom: String(commentBoxPaddingBottom) + ea,
          borderBottom: String(borderWidth) + "px solid " + colorExtended.black,
        },
        children: [
          {
            style: {
              display: "inline-block",
              position: "relative",
              width: String(commentSquareWidth) + ea,
              height: String(commentSquareWidth) + ea,
              borderRadius: String(2) + "px",
              background: colorExtended.black,
              marginRight: String(commentSquareMarginRight) + ea,
            }
          },
          {
            text: "DESIGNER's COMMENT",
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(commentSize) + ea,
              fontWeight: String(commentWeight),
              color: colorExtended.black,
              top: String(commentTextTop) + ea,
              fontFamily: "mont",
            }
          }
        ]
      },
      {
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          flexDirection: "row",
          justifyContent: "start",
          alignItems: "start",
          paddingTop: String(detailContentsPaddingTop) + ea,
          height: desktop ? withOut(commentBoxHeight, ea) : "",
          overflow: desktop ? "scroll" : "",
        },
        children: [
          {
            text: thisContents,
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(detailContentsSize) + ea,
              fontWeight: String(detailContentsWeight),
              color: colorExtended.black,
              fontFamily: "pretendard",
              lineHeight: String(detailContentsLineHeight),
            }
          }
        ]
      },
    ]
  });

  createNode({
    mother: descriptionBox,
    style: {
      display: "flex",
      position: "relative",
      width: withOut(0, ea),
      height: desktop ? String(grayLineBoxMarginTop) + ea : String(8) + ea,
      flexDirection: "row",
      justifyContent: "start",
      alignItems: "start",
    }
  });
  createNode({
    mother: descriptionBox,
    style: {
      display: "flex",
      position: "relative",
      width: withOut(0, ea),
      height: desktop ? String(barMargin) + ea : "",
      flexDirection: "row",
      justifyContent: "start",
      alignItems: "start",
      marginBottom: String(keywordsBoxMarginBottom) + ea,
    },
    children: [
      {
        style: {
          display: "inline-flex",
          width: withOut(0, ea),
          height: desktop ? withOut(0, ea) : "",
          position: "relative",
          flexDirection: "row",
          justifyContent: "start",
          alignItems: "start",
        },
        children: [
          {
            style: {
              display: "inline-block",
              position: desktop ? "absolute" : "relative",
              textAlign: "left",
              top: String(0),
              left: desktop ? String(keywordsBoxVisualLeft) + ea : "",
              width: desktop ? withOut(0 - keywordsBoxVisualLeft, ea) : withOut(0, ea),
              height: withOut(0, ea),
            },
            child: {
              style: {
                display: "inline-block",
                position: "relative",
                width: withOut(0, ea),
                height: withOut(0, ea),
                textAlign: "left",
                paddingBottom: desktop ? "" : String(6) + ea,
                left: desktop ? "" : String(-0.2) + ea,
              },
              children: contentsKeywords.map((str, index, arr) => {
                return {
                  style: {
                    display: "inline-flex",
                    position: "relative",
                    height: String(keywordsHeight) + ea,
                    borderRadius: String(keywordsHeight) + ea,
                    paddingLeft: String(keywordsPadding) + ea,
                    paddingRight: String(keywordsPadding) + ea,
                    boxSizing: "border-box",
                    border: String(borderWidth) + "px solid " + colorExtended.gray3,
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: String((mobile && index === 0) ? 0 : keywordsBetween) + ea,
                    marginBottom: desktop ? String(keywordsBetweenBottom) + ea : String(keywordsBetween) + ea,
                  },
                  child: {
                    text: "<b%#%b> " + str,
                    style: {
                      display: "inline-block",
                      position: "relative",
                      fontSize: String(keywordsSize) + ea,
                      fontWeight: String(keywordsWeight),
                      fontFamily: "pretendard",
                      color: colorExtended.mainBlue,
                      top: String(keywordsTextTop) + ea,
                    },
                    bold: {
                      fontSize: String(keywordsSize) + ea,
                      fontWeight: String(keywordsSharpWeight),
                      fontFamily: "pretendard",
                      color: colorExtended.blueLight,
                    }
                  }
                }
              })
            }
          },
        ]
      },
    ]
  });

  if (desktop) {
    // bottom box
    createNode({
      mother: mainTong,
      style: {
        display: "flex",
        position: "relative",
        flexDirection: "row",
        width: desktop ? String(standardWidth) + ea : String(100) + '%',
        left: desktop ? "calc(50% - " + String(standardWidth / 2) + ea + ")" : String(0),
        marginBottom: String(mainMargin) + ea,
        height: String(slideBoxHeight) + ea,
      },
      children: [
        {
          style: {
            display: "flex",
            flexDirection: "row",
            position: "relative",
            width: withOut(0, ea),
            height: String(slideBoxHeight - (slideBoxHeightPadding * 2)) + ea,
            top: String(slideBoxHeightPadding) + ea,
            left: String(0) + ea,
            overflow: "hidden",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: String(8) + "px",
          },
          child: {
            class: [ baseMotherClassName ],
            attribute: { index: String(0), start: String(0) },
            style: {
              display: "flex",
              flexDirection: "row",
              position: "relative",
              width: String(3000) + "%",
              justifyContent: "center",
              alignItems: "center",
              height: withOut(0, ea),
              transform: "translateX(0px)",
              transformOrigin: "50% 50%",
              transition: "all 0.4s ease",
            },
            children: contents.photos.detail.map(childrenSpreadMap()).concat(contents.photos.detail.map(childrenSpreadMap())).concat(contents.photos.detail.map(childrenSpreadMap())),
          }
        }
      ]
    });
    createNode({
      mother: mainTong,
      style: {
        display: "flex",
        position: "relative",
        flexDirection: "row",
        width: desktop ? String(standardWidth) + ea : String(100) + '%',
        left: desktop ? "calc(50% - " + String(standardWidth / 2) + ea + ")" : String(0),
        borderBottom: String(borderWidth) + "px solid " + colorExtended.gray3,
      },
    });

  }

  setQueue(async () => {
    try {
      const targets = selectByClass(imgTargetClassName);
      const target = targets[Math.round(targets.length / 2)];
      let targetIndex, num, thisEventFunction;
      num = 0;
      for (let dom of targets) {
        dom.setAttribute("index", String(num));
        num++;
      }
      targetIndex = Number(target.getAttribute("index"));
      
      thisEventFunction = childrenFocusEvent().bind(target);
      await thisEventFunction({ real: false });

      setQueue(fireSlideTurn, slideDelta);
    } catch {}
  });

}

ReviewDetailJs.prototype.reviewContentsBox = function () {
  const instance = this;
  const { createNode, colorChip, colorExtended, withOut, svgMaker, equalJson, designerMthParsing, designerCareer, isMac, isIphone, selfHref, setQueue } = GeneralJs;
  const { totalContents, naviHeight, ea, media, pid } = this;
  const { contentsArr, designers } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const contents = contentsArr.toNormal().filter((obj) => { return obj.contents.portfolio.pid === pid })[0];
  const { contents: { review }, photos } = contents;
  const { detail: photoDetail } = photos;
  const { contents: { detail } } = review;
  const [ { contents: customerStoryMother } ] = detail;
  const designer = designers.search("desid", contents.desid);
  const story = equalJson(JSON.stringify(detail));
  const photoChar = 't';
  const photoCharMobile = "mot";
  const touchStartConst = "touchStartConstName";
  const today = new Date();
  let mainTong;
  let mainWidth;
  let mainPaddingTop;
  let titleSize, titleWeight;
  let titleLineHeight;
  let titleBarMarginTop, titleBarWidth;
  let contentsSize, contentsWeight;
  let contentsLineHeight;
  let customerPaddingLeft, customerMarginTop;
  let customerSize, customerWeight;
  let customerTop, customerLineHeight;
  let customerStory;
  let src;
  let garo;
  let num;
  let photoMargin;
  let blankMargin, blankMargin2;
  let totalNum;
  let blankMarginFirst;
  let contentsPadding;
  let wordingTop;
  let questionMargin, answerMargin;
  let questionWeight, answerWeight;
  let belowBox;
  let belowBoxPadding;
  let belowBoxHeight;
  let blankMarginLast;
  let belowPictureWidth;
  let belowPictureMargin;
  let belowWhiteWidth;
  let nameCardWording;
  let nameCardIndex;
  let belowTextTitleSize, belowTextTitleWeight, belowTextTitleLineHeight;
  let belowTextAreaPaddingLeft;
  let portfolioWordingSize, portfolioWordingWeight;
  let belowTextAreaPaddingTop;
  let belowTextAreaTitleBarTop;
  let belowTextAreaSubSize, belowTextAreaSubWeight, belowTextAreaSubLineHeight, belowTextAreaSubMarginTop;
  let designerTongPaddingTop;
  let deignserPhotoWidth;
  let designerTitleSize, designerTitleWeight, designerTitleMarginTop;
  let designerTong;
  let designerMthTargets;
  let designerMthSize, designerMthWeight, designerMthMarginTop;
  let careerBottom;
  let careerSize, careerWeight;
  let mobileDesignerWordingTop;
  let mobileDesignerBoxBetween;

  story.shift();
  customerStory = '';
  for (let { answer } of customerStoryMother) {
    customerStory += answer;
    customerStory += "\n\n";
  }
  customerStory = customerStory.slice(0, -2);

  mainWidth = <%% 900, 900, 900, 720, 100 %%>;
  mainPaddingTop = <%% 110, 110, 110, 80, 17 %%>;

  titleSize = <%% 23, 23, 23, 21, 4.6 %%>;
  titleWeight = <%% 700, 700, 700, 700, 700 %%>;
  titleLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;
  titleBarMarginTop = <%% 15, 15, 15, 15, 3 %%>;
  titleBarWidth = <%% 80, 80, 80, 80, 18 %%>;

  contentsSize = <%% 16, 16, 16, 15, 3.5 %%>;
  contentsWeight = <%% 400, 400, 400, 400, 400 %%>;
  contentsLineHeight = <%% 1.7, 1.7, 1.7, 1.7, 1.7 %%>;

  customerPaddingLeft = <%% 150, 150, 150, 130, 6 %%>;
  customerMarginTop = <%% 36, 36, 36, 36, 5.5 %%>;

  customerSize = <%% 17, 17, 17, 16, 0 %%>;
  customerWeight = <%% 400, 400, 400, 400, 400 %%>;
  customerTop = <%% 3, 3, 3, 3, 3 %%>;
  customerLineHeight = <%% 1.3, 1.3, 1.3, 1.3, 1.3 %%>;

  photoMargin = <%% 8, 8, 8, 8, 1 %%>;
  blankMarginFirst = <%% 126, 126, 126, 96, 13.5 %%>;
  blankMargin = <%% 100, 100, 100, 70, 11 %%>;
  blankMargin2 = <%% 100, 100, 100, 70, 10 %%>;
  blankMarginLast = <%% 200, 200, 200, 170, 20 %%>;

  contentsPadding = <%% 21, 21, 21, 21, 6 %%>;

  wordingTop = <%% (isMac() ? 3 : 1), (isMac() ? 3 : 1), (isMac() ? 3 : 1), (isMac() ? 3 : 1), 0.6 %%>;
  questionMargin = <%% 10, 10, 10, 10, 1 %%>;
  answerMargin = <%% 36, 36, 36, 36, 6 %%>;

  questionWeight = <%% 700, 700, 700, 700, 700 %%>;
  answerWeight = <%% 400, 400, 400, 400, 400 %%>;

  belowBoxPadding = <%% 50, 50, 50, 36, 3.5 %%>;
  belowBoxHeight = <%% 300, 300, 300, 260, 30 %%>;

  belowWhiteWidth = <%% 200, 200, 200, 156, 0 %%>;

  belowPictureWidth = <%% 350, 350, 350, 290, 43 %%>;
  belowPictureMargin = <%% 18, 18, 18, 12, 0 %%>;

  nameCardWording = contents.contents.portfolio.title.main.split(", ")[1];

  nameCardIndex = nameCardWording.split(' ').findIndex((str) => { return /py/gi.test(str); });
  nameCardWording = nameCardWording.split(' ').slice(0, nameCardIndex).join(' ') + "\n" + nameCardWording.split(' ').slice(nameCardIndex).join(' ');

  portfolioWordingSize = <%% 15, 15, 15, 15, 2 %%>;
  portfolioWordingWeight = <%% 400, 400, 400, 400, 400 %%>;

  belowTextAreaPaddingLeft = <%% 12, 12, 12, 12, 4 %%>;
  belowTextTitleSize = <%% 25, 25, 25, 20, 3.5 %%>;
  belowTextTitleWeight = <%% 700, 700, 700, 700, 700 %%>;
  belowTextTitleLineHeight = <%% 1.4, 1.4, 1.4, 1.4, 1.4 %%>;
  belowTextAreaPaddingTop = <%% 158, 158, 158, 137, 8.5 %%>;
  belowTextAreaTitleBarTop = <%% (isMac() ? 12 : 14), (isMac() ? 12 : 14), (isMac() ? 12 : 14), (isMac() ? 12 : 14), 2 %%>;

  belowTextAreaSubSize = <%% 14, 14, 14, 12, 2 %%>;
  belowTextAreaSubWeight = <%% 500, 500, 500, 500, 500 %%>;
  belowTextAreaSubLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;
  belowTextAreaSubMarginTop = <%% 20, 20, 20, 20, 2 %%>;

  designerTongPaddingTop = <%% 30, 30, 30, 27, 30 %%>;
  deignserPhotoWidth = <%% 124, 124, 124, 110, 124 %%>;

  designerTitleSize = <%% 19, 19, 19, 16, 19 %%>;
  designerTitleWeight = <%% 700, 700, 700, 700, 700 %%>;
  designerTitleMarginTop = <%% 10, 10, 10, 7, 10 %%>;

  designerMthSize = <%% 13, 13, 13, 11, 13 %%>;
  designerMthWeight = <%% 500, 500, 500, 500, 500 %%>;
  designerMthMarginTop = <%% 3, 3, 3, 2, 3 %%>;

  careerBottom = <%% 30, 30, 30, 27, 30 %%>;
  careerSize = <%% 12, 12, 12, 11, 12 %%>;
  careerWeight = <%% 400, 400, 400, 400, 400 %%>;

  mobileDesignerWordingTop = 13;
  mobileDesignerBoxBetween = 2;

  mainTong = createNode({
    mother: totalContents,
    style: {
      display: "block",
      position: "relative",
      width: String(mainWidth) + ea,
      left: "calc(50% - " + String(mainWidth / 2) + ea + ")",
      background: colorChip.white,
      paddingTop: String(mainPaddingTop) + ea,
      animation: "fadeupdelay 0.5s ease forwards",
    },
  });

  createNode({
    mother: mainTong,
    text: review.title.main.replace(/, /, " "),
    style: {
      display: "block",
      position: "relative",
      textAlign: "center",
      fontSize: String(titleSize) + ea,
      fontFamily: "pretendard",
      fontWeight: String(titleWeight),
      lineHeight: String(titleLineHeight),
      color: colorChip.black,
    }
  });

  createNode({
    mother: mainTong,
    style: {
      display: "block",
      position: "relative",
      textAlign: "center",
      marginTop: String(titleBarMarginTop) + ea,
    },
  });

  createNode({
    mother: mainTong,
    text: customerStory,
    event: {
      contextmenu: (e) => { e.preventDefault(); },
      selectstart: (e) => { e.preventDefault(); }
    },
    style: {
      display: "block",
      position: "relative",
      textAlign: "left",
      fontSize: String(contentsSize) + ea,
      fontWeight: String(contentsWeight),
      lineHeight: String(contentsLineHeight),
      color: colorChip.black,
      paddingLeft: String(customerPaddingLeft) + ea,
      marginTop: String(customerMarginTop) + ea,
      paddingRight: desktop ? "" : String(customerPaddingLeft) + ea,
    },
    children: [
      {
        text: "Customer\nStory",
        style: {
          display: desktop ? "block" : "none",
          fontSize: String(customerSize) + ea,
          fontWeight: String(700),
          fontFamily: "mont",
          color: colorChip.black,
          position: "absolute",
          top: String(customerTop) + ea,
          left: String(0),
          lineHeight: String(customerLineHeight),
        }
      }
    ]
  });

  totalNum = 0;
  for (let { contents, photos } of story) {

    createNode({
      mother: mainTong,
      style: {
        display: "block",
        height: String(totalNum === 0 ? blankMarginFirst : blankMargin2) + ea,
      }
    });
    num = 0;
    for (let index of photos) {
      if (desktop) {
        src = "https://" + FILEHOST + "/list_image/portp" + pid + "/" + photoChar + String(index) + pid + ".jpg";
      } else {
        src = "https://" + FILEHOST + "/list_image/portp" + pid + "/mobile/" + photoCharMobile + String(index) + pid + ".jpg";
      }
      garo = (photoDetail[index - 1].gs === 'g');
      createNode({
        mother: mainTong,
        mode: "img",
        attribute: { src },
        event: {
          contextmenu: (e) => { e.preventDefault(); },
          selectstart: (e) => { e.preventDefault(); }
        },
        style: {
          width: garo ? String(100) + '%' : "calc(50% - " + String(photoMargin / 2) + ea + ")",
          display: "inline-block",
          marginBottom: String(photoMargin) + ea,
          marginRight: String(garo ? 0 : (num % 2 === 0 ? photoMargin : 0)) + ea,
          borderRadius: String(desktop ? 15 : 0) + "px",
        }
      });
      if (!garo) {
        num++;
      }
    }
    createNode({
      mother: mainTong,
      style: {
        display: "block",
        height: String(blankMargin) + ea,
      }
    });

    for (let { answer, question } of contents) {

      createNode({
        mother: mainTong,
        text: question,
        event: {
          contextmenu: (e) => { e.preventDefault(); },
          selectstart: (e) => { e.preventDefault(); }
        },
        style: {
          display: "block",
          position: "relative",
          textAlign: "left",
          fontSize: String(contentsSize) + ea,
          fontWeight: String(questionWeight),
          lineHeight: String(contentsLineHeight),
          color: colorChip.black,
          paddingLeft: String(desktop ? contentsPadding : (contentsPadding * 2)) + ea,
          marginBottom: String(questionMargin) + ea,
          paddingRight: desktop ? "" : String(contentsPadding) + ea,
        },
        children: [
          {
            text: "Q.",
            style: {
              fontSize: String(contentsSize) + ea,
              fontWeight: String(customerWeight),
              fontFamily: "graphik",
              color: colorChip.black,
              position: "absolute",
              top: String(wordingTop) + ea,
              left: desktop ? String(0) : String(contentsPadding) + ea,
              lineHeight: String(customerLineHeight),
            }
          }
        ]
      });

      createNode({
        mother: mainTong,
        text: answer,
        event: {
          contextmenu: (e) => { e.preventDefault(); },
          selectstart: (e) => { e.preventDefault(); }
        },
        style: {
          display: "block",
          position: "relative",
          textAlign: "left",
          fontSize: String(contentsSize) + ea,
          fontWeight: String(answerWeight),
          lineHeight: String(contentsLineHeight),
          color: colorChip.black,
          paddingLeft: String(desktop ? contentsPadding : (contentsPadding * 2)) + ea,
          marginBottom: String(answerMargin) + ea,
          paddingRight: desktop ? "" : String(contentsPadding) + ea,
        },
        children: [
          {
            text: "A.",
            style: {
              fontSize: String(contentsSize) + ea,
              fontWeight: String(300),
              fontFamily: "graphik",
              color: colorChip.black,
              position: "absolute",
              top: String(wordingTop) + ea,
              left: desktop ? String(0) : String(contentsPadding) + ea,
              lineHeight: String(customerLineHeight),
            }
          }
        ]
      });

    }

    totalNum++;
  }

  createNode({
    mother: mainTong,
    style: {
      display: "block",
      height: String(blankMargin) + ea,
    }
  });

}

ReviewDetailJs.prototype.relativeContents = function (contents, length) {
  const instance = this;
  const tendencyKey = [
    {
      target: "style",
      name: "스타일 경향성",
      order: [
        "modern",
        "classic",
        "natural",
        "mixmatch",
        "scandinavian",
        "vintage",
        "oriental",
        "exotic",
      ],
      map: {
        modern: "모던",
        classic: "클래식",
        natural: "내추럴",
        mixmatch: "믹스매치",
        scandinavian: "북유럽",
        vintage: "빈티지",
        oriental: "오리엔탈",
        exotic: "이그저틱",
      }
    },
    {
      target: "texture",
      name: "텍스처 경향성",
      order: [
        "darkWood",
        "whiteWood",
        "coating",
        "metal",
      ],
      map: {
        darkWood: "진한 우드",
        whiteWood: "연한 우드",
        coating: "도장",
        metal: "금속",
      }
    },
    {
      target: "color",
      name: "컬러톤 경향성",
      order: [
        "darkWood",
        "whiteWood",
        "highContrast",
        "vivid",
        "white",
        "mono",
        "bright",
        "dark",
      ],
      map: {
        darkWood: "다크 우드",
        whiteWood: "밝은 우드",
        highContrast: "고대비",
        vivid: "비비드",
        white: "화이트",
        mono: "모노톤",
        bright: "밝은톤",
        dark: "어두운톤",
      }
    },
    {
      target: "density",
      name: "밀도 경향성",
      order: [
        "maximun",
        "minimum",
      ],
      map: {
        maximun: "맥시멈",
        minimum: "미니멈",
      }
    },
  ];
  const tagAmplification = (contents) => {
    const { conid, proid, cliid, desid, contents: { portfolio: { detailInfo: { tag } } } } = contents;
    const filtered = [ ...new Set(tag.concat(tag.map((str) => {
      return str.replace(/한$/gi, '').replace(/적인$/gi, '').replace(/스러운$/gi, '').replace(/가구$/gi, '').replace(/인테리어$/gi, '').replace(/있는$/gi, '');
    }))) ];
    filtered.conid = conid;
    return filtered;
  }
  const tendencySpread = (contents) => {
    const { conid, proid, cliid, desid, contents: { portfolio: { detailInfo: { tendency } } } } = contents;
    let values;
    values = [];
    for (let { target, order } of tendencyKey) {
      for (let key of order) {
        values.push(tendency[target][key]);
      }
    }
    values.conid = conid;
    return values;
  }
  const tendencyConst = length * 2;
  const relativeConst = length * 2;
  const tagMultiplyConst = 2;
  let standardTag;
  let totalTag;
  let firstFiltered;
  let standardTendency;
  let totalTendency;
  let secondFiltered;

  standardTag = tagAmplification(contents);

  totalTag = instance.contentsArr.toNormal().map((obj) => {
    return tagAmplification(obj);
  }).map((arr) => {
    let num;
    num = 0;
    for (let i of arr) {
      if (standardTag.includes(i)) {
        num++;
      }
    }
    arr.number = num;
    return arr;
  });

  totalTag.sort((a, b) => { return b.number - a.number });
  firstFiltered = totalTag.slice(1).slice(0, relativeConst * tagMultiplyConst).map((arr) => { return arr.conid }).map((conid) => {
    return instance.contentsArr.search("conid", conid);
  });

  standardTendency = tendencySpread(contents);
  totalTendency = firstFiltered.map((obj) => {
    return tendencySpread(obj);
  }).map((arr) => {
    let num;
    num = 0;
    for (let i = 0; i < arr.length; i++) {
      num = num + (standardTendency[i] - arr[i]);
    }
    num = num / arr.length;
    arr.number = Math.abs(num);
    return arr;
  });
  totalTendency.sort((a, b) => { return a.number - b.number });

  secondFiltered = totalTendency.slice(0, relativeConst).map((arr) => { return arr.conid }).map((conid) => {
    return instance.contentsArr.search("conid", conid);
  });

  return secondFiltered;
}

ReviewDetailJs.prototype.reviewRelativeBox = function () {
  const instance = this;
  const { createNode, colorChip, colorExtended, withOut, svgMaker, sleep, setQueue, equalJson, isMac, isIphone, selfHref, autoComma, swipePatch, homeliaisonAnalytics, dateToString } = GeneralJs;
  const { totalContents, naviHeight, ea, media, pid, standardWidth } = this;
  const { contentsArr } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const contents = contentsArr.toNormal().filter((obj) => { return obj.contents.portfolio.pid === pid })[0];
  const touchStartConst = "touchStartConstName";
  const photoTouchStartConst = "photoTouchStartConst";
  const photoChar = 't';
  const photoCharMobile = "mot";
  const photoDefaultRatio = (297 / 210);
  const whitePhotoBigClassName = "whitePhotoBigClassName";
  let mainTong;
  let photoTong;
  let baseWidth;
  let baseTong;
  let arrowHeight;
  let arrowTop;
  let leftArrow, rightArrow;
  let mainPaddingTop;
  let baseBetween;
  let titleHeight, titleMarginBottom;
  let titleLineHeight;
  let mainTitleSize, mainTitleWeight;
  let mainTitleWidth;
  let belowTong;
  let belowBaseTong;
  let mainHeight;
  let belowBoxHeight;
  let belowButtonTop;
  let belowButtonHeight;
  let belowButtonBetween;
  let belowButtonWordPadding;
  let belowButtonTextTop, belowButtonSize, belowButtonWeight;
  let photoTongClassName;
  let move;
  let block;
  let src, title, tag;
  let photoMargin;
  let columns;
  let photoRatio;
  let seroWidth;
  let photoHeight;
  let photoMarginBottom;
  let quoteHeight, quoteWidth, quoteTop;
  let titleSize;
  let titleWeight;
  let titleMarginLeft;
  let tagTongMarginTop;
  let tagTongWidthRatio;
  let tagTong;
  let filteredContents;
  let tagSize;
  let tagWeight;
  let tagPaddingLeft;
  let tagPaddingTop;
  let tagPaddingBottom;
  let tagMarginRight;
  let relativeLength;
  let mainTitleTop;
  let tagBlock;
  let subTitleMarginTop;
  let subTitleMarginTopReview;
  let subTitleSize;
  let subArrowWidth;
  let subArrowHeight;
  let subArrowBottom;
  let subArrowReviewBottom;
  let reviewSubTitleVisual;
  let shareTong, shareBaseTong;
  let shareTongHeight;
  let shareIconHeight;
  let shareIconBetween0, shareIconBetween1;
  let previousNextSize, previousNextWeight, previousNextTextTop, previousNextLeftRight;
  let whitePhotoTong;
  let photoSrc;
  let photoBetween;
  let whitePhotoTongInnerPadding;
  let whitePhotoHeight;
  let whitePhotoNumbers;
  let whitePhotoTongMarginBottom;
  let whitePopupBigPadding;
  let whitePhotoBigArrowHeight;
  let whitePhotoBigArrowAreaHeight;
  let whitePhotoEvent;
  let rightArrowEvent, leftArrowEvent;
  let mainPaddingBottom;
  let thisPyeong;
  let thisBudget;
  let radiusPixel;
  let montTitleSize;
  let montTitleMarginLeft;
  let montHangulTitleTop;
  let montTitleTop;
  let montSpecialTitleTop;
  let baseTop, baseBottom;

  this.relativePhotoNumber = 0;

  baseWidth = <%% 1300, 980, 800, 640, 76 %%>;
  baseBetween = standardWidth - baseWidth;

  arrowHeight = <%% 26, 24, 24, 24, 4 %%>;
  arrowTop = <%% 280, 262, 276, 240, 37 %%>;

  mainHeight = <%% 590, 570, 590, 496, 94 %%>;
  mainPaddingTop = <%% 110, 96, 86, 72, 10 %%>;
  mainPaddingBottom = <%% 110, 106, 94, 80, 10.5 %%>;

  titleHeight = <%% 30, 30, 30, 28, 6 %%>;
  titleMarginBottom = <%% 32, 32, 32, 28, 5 %%>;
  titleLineHeight = <%% 14, 14, 14, 14, 3 %%>;

  mainTitleSize = <%% 22, 22, 22, 20, 4.5 %%>;
  mainTitleWeight = <%% 600, 600, 600, 600, 600 %%>;
  mainTitleWidth = <%% 170, 170, 170, 150, 34 %%>;
  mainTitleTop = <%% (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), 0 %%>;

  belowBoxHeight = <%% 150, 148, 148, 125, 24 %%>;
  belowButtonTop = <%% 45, 45, 45, 32, 7 %%>;

  belowButtonHeight = <%% 50, 48, 48, 45, 10 %%>;
  belowButtonBetween = <%% 10, 10, 10, 10, 2 %%>;
  belowButtonWordPadding = <%% 20, 20, 20, 20, 4 %%>;

  belowButtonTextTop = <%% (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), -0.3 %%>;
  belowButtonSize = <%% 18, 17, 17, 16, 3.5 %%>;
  belowButtonWeight = <%% 600, 600, 600, 600, 600 %%>;

  move = <%% 264, 249, 272, 218, 39.45 %%>;

  photoTongClassName = "photoTongClassName";

  relativeLength = <%% 20, 20, 20, 20, 20 %%>;

  photoMargin = <%% 16, 16, 14, 12, 2.5 %%>;
  columns = <%% 5, 4, 3, 3, 2 %%>;
  photoRatio = (297 / 210);
  seroWidth = (baseWidth - (photoMargin * (columns - 1))) / columns;
  photoHeight = seroWidth * photoRatio;
  photoMarginBottom = <%% 10, 10, 10, 10, 2.1 %%>;

  quoteHeight = <%% 8, 8, 8, 7, 1.4 %%>;
  quoteWidth = SvgTong.getRatio(SvgTong.stringParsing(svgMaker.doubleQuote(colorExtended.mainBlue))) * quoteHeight;
  quoteTop = <%% (isMac() ? 5 : 3), (isMac() ? 5 : 3), (isMac() ? 5 : 3), (isMac() ? 4 : 2), isIphone() ? 1.3 : 1.2 %%>;

  titleSize = <%% 17, 16, 17, 14, 2.7 %%>;
  titleWeight = <%% 600, 600, 600, 600, 600 %%>;
  titleMarginLeft = <%% 6, 6, 5, 5, 1.1 %%>;

  tagTongMarginTop = <%% 10, 10, 10, 8, 1.6 %%>;
  tagTongWidthRatio = <%% 1.3, 1.3, 1.3, 1.3, 1.3 %%>;

  tagSize = <%% 10, 8, 10, 7, 2 %%>;
  tagWeight = <%% 500, 500, 500, 500, 500 %%>;

  tagPaddingLeft = <%% 8, 7, 7, 7, 1 %%>;
  tagPaddingTop = <%% (isMac() ? 4 : 5), (isMac() ? 4 : 5), (isMac() ? 4 : 5), (isMac() ? 4 : 5), 0.9 %%>;
  tagPaddingBottom = <%% (isMac() ? 6 : 5), (isMac() ? 6 : 5), (isMac() ? 6 : 5), (isMac() ? 6 : 5), isIphone() ? 1.2 : 1.4 %%>;
  tagMarginRight = <%% 3, 2, 3, 2, 1 %%>;

  subTitleMarginTop = <%% 3, 3, 3, 3, 0.5 %%>;
  subTitleMarginTopReview = <%% 3, 3, 3, 2, 0.2 %%>;
  subTitleSize = <%% 12, 12, 12, 12, 2.3 %%>;

  subArrowWidth = <%% 24, 20, 24, 24, 4 %%>;
  subArrowHeight = <%% 8, 8, 8, 8, 1.5 %%>;
  subArrowBottom = <%% 2, 2, 2, 2, 1 %%>;
  subArrowReviewBottom = <%% (isMac() ? 5 : 6), (isMac() ? 5 : 6), (isMac() ? 4 : 6), (isMac() ? 4 : 6), 1.5 %%>;

  reviewSubTitleVisual = <%% 1, 1, 1, 0, 0 %%>;

  shareTongHeight = <%% 100, 100, 96, 90, 13 %%>;
  shareIconHeight = <%% 19, 19, 18, 18, 3.6 %%>;

  shareIconBetween0 = <%% 34, 34, 34, 34, 5.4 %%>;
  shareIconBetween1 = <%% 30, 30, 30, 30, 5 %%>;

  previousNextSize = <%% 16, 16, 15, 14, 3 %%>;
  previousNextWeight = <%% 500, 500, 500, 500, 500 %%>;
  previousNextTextTop = <%% 36, 36, 34, 33, 3.9 %%>;
  previousNextLeftRight = baseBetween / 2;

  photoBetween = <%% 8, 8, 7, 6, 1 %%>;
  whitePhotoTongInnerPadding = <%% 36, 36, 32, 30, 3 %%>;
  whitePhotoHeight = <%% 210, 210, 170, 133, 24 %%>;
  whitePhotoNumbers = <%% 8, 6, 6, 6, 4 %%>;
  whitePhotoTongMarginBottom = <%% 10, 10, 10, 10, 1 %%>;
  whitePopupBigPadding = <%% 64, 64, 64, 64, 28 %%>;
  whitePhotoBigArrowHeight = <%% 15, 15, 15, 15, 2 %%>;
  whitePhotoBigArrowAreaHeight = <%% 200, 200, 200, 200, 20 %%>;

  thisPyeong = "<s%" + String(24) + "PY%s>";
  thisBudget = "<u%" + autoComma(3000) + "%u> " + "<b%" + "만원" + "대" + "%b>";
  radiusPixel = <%% 15, 15, 15, 15, 15 %%>;

  titleSize = <%% 17, 17, 17, 14, 3.2 %%>;
  montTitleSize = <%% 20, 20, 20, 15, 3.2 %%>;
  montTitleMarginLeft = <%% 8, 8, 8, 6, 1.6 %%>;
  montHangulTitleTop = <%% -1, -1, -1, -1, (isIphone() ? -0.3 : -0.1) %%>;
  montTitleTop = <%% -0.5, -1, -1, -1, (isIphone() ? -0.2 : -0) %%>;
  montSpecialTitleTop = <%% (isMac() ? 1.5 : 0), (isMac() ? 1.5 : 0), (isMac() ? 1.5 : 0), (isMac() ? 1.5 : 0), (isIphone() ? 0.7 : 0.6) %%>; 
  titleWeight = <%% 400, 400, 400, 400, 400 %%>;
  titleMarginLeft = <%% 6, 6, 5, 5, 1.6 %%>;

  baseTop = <%% 120, 100, 100, 100, 13 %%>;
  baseBottom = <%% 120, 100, 100, 100, 11 %%>;

  // relative

  mainTong = createNode({
    mother: totalContents,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
      paddingBottom: String(baseBottom) + ea,
    },
    child: {
      style: {
        display: "block",
        position: "absolute",
        top: String(0),
        left: String(0),
        width: withOut(0, ea),
        height: withOut(0, ea),
        background: colorExtended.gradientBlue5,
      }
    }
  });

  baseTong = createNode({
    mother: mainTong,
    style: {
      display: "block",
      position: "relative",
      width: String(standardWidth) + ea,
      left: "calc(50% - " + String(standardWidth / 2) + ea + ")",
      paddingTop: String(baseTop) + ea,
    }
  });

  leftArrow = createNode({
    mother: baseTong,
    class: [ "leftArrow" ],
    event: {
      click: function (e) {
        const photoTong = document.querySelector('.' + photoTongClassName);
        let current, newMove;
        current = Number(photoTong.style.transform.replace(/[^0-9\-\.]/gi, ''));
        newMove = current + move;
        if (newMove <= 0) {
          photoTong.style.transform = "translateX(" + String(newMove) + ea + ")";
        }
      }
    },
    style: {
      position: "absolute",
      top: String(arrowTop) + ea,
      left: String(0),
      width: String(arrowHeight) + ea,
      height: String(arrowHeight) + ea,
      cursor: "pointer",
    },
    children: [
      {
        style: {
          position: "relative",
          width: String(100) + '%',
          height: String(100) + '%',
        },
        children: [
          {
            mode: "svg",
            source: svgMaker.squareArrow(colorExtended.blueLight),
            style: {
              position: "absolute",
              top: String(0),
              left: String(0),
              height: String(arrowHeight) + ea,
              transform: "rotate(180deg)",
            }
          }
        ]
      }
    ]
  });

  rightArrow = createNode({
    mother: baseTong,
    class: [ "rightArrow" ],
    event: {
      click: function (e) {
        const photoTong = document.querySelector('.' + photoTongClassName);
        let current, newMove;
        current = Number(photoTong.style.transform.replace(/[^0-9\-\.]/gi, ''));
        newMove = current - move;
        if (Math.abs((instance.relativePhotoNumber - columns) * move) >= Math.abs(newMove)) {
          photoTong.style.transform = "translateX(" + String(newMove) + ea + ")";
        }
      }
    },
    style: {
      position: "absolute",
      top: String(arrowTop) + ea,
      right: String(0),
      width: String(arrowHeight) + ea,
      height: String(arrowHeight) + ea,
      cursor: "pointer",
    },
    children: [
      {
        style: {
          position: "relative",
          width: String(100) + '%',
          height: String(100) + '%',
        },
        children: [
          {
            mode: "svg",
            source: svgMaker.squareArrow(colorExtended.blueLight),
            style: {
              position: "absolute",
              top: String(0),
              right: String(0),
              height: String(arrowHeight) + ea,
              transform: "rotate(0deg)",
            }
          }
        ]
      }
    ]
  });

  photoTong = createNode({
    mother: baseTong,
    style: {
      display: "block",
      position: "relative",
      width: String(baseWidth) + ea,
      left: "calc(50% - " + String(baseWidth / 2) + ea + ")",
      overflow: "hidden",
    },
    children: [
      {
        class: [ photoTongClassName ],
        style: {
          display: "block",
          position: "relative",
          transform: "translateX(" + String(0) + ea + ")",
          transition: "all 0.5s ease",
          width: String(8000) + ea,
        }
      }
    ]
  }).firstChild;

  setQueue(async () => {

    try {
      const photoChar = 't';
      const photoCharMobile = "mot";
      let contentsArr;
      let filtered;

      while (!instance.fullLoad) {
        await sleep(500);
      }

      contentsArr = instance.contentsArr;
      filtered = instance.relativeContents(contents, relativeLength);

      for (let i = 0; i < relativeLength; i++) {

        ({ contents: filteredContents } = filtered[i]);

        if (filteredContents.review.detailInfo.photodae.length > 1) {

          if (desktop) {
            src = "https://" + FILEHOST + "/list_image/portp" + filteredContents.portfolio.pid + "/" + photoChar + String(filteredContents.review.detailInfo.photodae[0]) + filteredContents.portfolio.pid + ".jpg";
          } else {
            src = "https://" + FILEHOST + "/list_image/portp" + filteredContents.portfolio.pid + "/mobile/" + photoCharMobile + String(filteredContents.review.detailInfo.photodae[0]) + filteredContents.portfolio.pid + ".jpg";
          }
          title = filteredContents.portfolio.spaceInfo.space;

          block = createNode({
            mother: photoTong,
            attribute: { pid: filteredContents.portfolio.pid },
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
              width: String(seroWidth) + ea,
              marginRight: String(photoMargin) + ea,
              verticalAlign: "top",
              cursor: "pointer",
              overflow: "hidden",
            },
            children: [
              {
                style: {
                  display: "block",
                  width: String(seroWidth) + ea,
                  height: String(photoHeight) + ea,
                  borderRadius: String(radiusPixel) + "px",
                  marginBottom: String(photoMarginBottom) + ea,
                  backgroundSize: "100% auto",
                  backgroundPosition: "50% 50%",
                  backgroundImage: "url('" + src + "')",
                  boxShadow: "0px 3px 15px -9px " + colorExtended.black,
                }
              },
              {
                style: {
                  display: "block",
                  position: "relative",
                  width: String(100) + '%',
                  overflow: "hidden",
                },
                child: {
                  style: {
                    display: "block",
                    position: "relative",
                    width: String(100) + '%',
                    left: String(0),
                    top: String(0),
                    overflow: "hidden",
                  },
                  children: [
                    {
                      style: {
                        display: "block",
                        position: "relative",
                        width: String(500) + '%',
                        left: String(0),
                        top: String(0),
                      },
                      child: {
                        text: title,
                        style: {
                          display: "inline-block",
                          position: "relative",
                          fontSize: String(titleSize) + ea,
                          fontFamily: "pretendard",
                          fontWeight: String(600),
                          color: colorExtended.white,
                          verticalAlign: "top",
                        },
                        special: {
                          fontSize: String(titleSize) + ea,
                          fontFamily: "pretendard",
                          fontWeight: String(500),
                          color: colorExtended.gray3,
                        },
                      }
                    },
                    {
                      text: thisPyeong,
                      style: {
                        display: "inline-block",
                        position: "absolute",
                        fontSize: String(montTitleSize) + ea,
                        fontFamily: "mont",
                        fontWeight: String(700),
                        color: colorExtended.mainBlue,
                        verticalAlign: "top",
                        top: String(0) + ea,
                        right: String(0) + ea,
                        paddingLeft: String(montTitleMarginLeft) + ea,
                      },
                      special: {
                        position: "relative",
                        fontSize: String(montTitleSize) + ea,
                        fontFamily: "mont",
                        fontWeight: String(700),
                        color: colorExtended.mainBlue,
                        top: String(montSpecialTitleTop) + ea,
                      },
                      bold: {
                        fontSize: String(titleSize) + ea,
                        fontFamily: "pretendard",
                        fontWeight: String(800),
                        color: colorExtended.mainBlue,
                        position: "relative",
                        top: String(montHangulTitleTop) + ea,
                      },
                      under: {
                        fontSize: String(montTitleSize) + ea,
                        fontFamily: "mont",
                        fontWeight: String(700),
                        color: colorExtended.mainBlue,
                        position: "relative",
                        top: String(montTitleTop) + ea,
                      },
                    },
                  ]
                }
              },
            ]
          });

          instance.relativePhotoNumber++;
        }
      }

    } catch (e) {
      console.log(e);
    }
  });
  
}

ReviewDetailJs.prototype.reviewDesignerBox = function () {
  const instance = this;
  const { createNode, colorChip, colorExtended, withOut, svgMaker, equalJson, designerMthParsing, designerCareer, isMac, isIphone, selfHref, setQueue, serviceParsing } = GeneralJs;
  const { totalContents, naviHeight, ea, media, pid, version } = this;
  const { contentsArr, designers } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const contents = contentsArr.toNormal().filter((obj) => { return obj.contents.portfolio.pid === pid })[0];
  const { contents: { review }, photos } = contents;
  const { detail: photoDetail } = photos;
  const { contents: { detail } } = review;
  const [ { contents: customerStoryMother } ] = detail;
  const designer = designers.search("desid", contents.desid);
  const story = equalJson(JSON.stringify(detail));
  const photoChar = 't';
  const photoCharMobile = "mot";
  const touchStartConst = "touchStartConstName";
  const today = new Date();
  let mainTong;
  let mainWidth;
  let mainPaddingTop;
  let titleSize, titleWeight;
  let titleLineHeight;
  let titleBarMarginTop, titleBarWidth;
  let contentsSize, contentsWeight;
  let contentsLineHeight;
  let customerPaddingLeft, customerMarginTop;
  let customerSize, customerWeight;
  let customerTop, customerLineHeight;
  let customerStory;
  let src;
  let garo;
  let num;
  let photoMargin;
  let blankMargin, blankMargin2;
  let totalNum;
  let blankMarginFirst;
  let contentsPadding;
  let wordingTop;
  let questionMargin, answerMargin;
  let questionWeight, answerWeight;
  let belowBox;
  let belowBoxPadding;
  let belowBoxHeight;
  let blankMarginLast;
  let belowPictureWidth;
  let belowPictureMargin;
  let belowWhiteWidth;
  let nameCardWording;
  let nameCardIndex;
  let belowTextTitleSize, belowTextTitleWeight, belowTextTitleLineHeight;
  let belowTextAreaPaddingLeft;
  let portfolioWordingSize, portfolioWordingWeight;
  let belowTextAreaPaddingTop;
  let belowTextAreaTitleBarTop;
  let belowTextAreaSubSize, belowTextAreaSubWeight, belowTextAreaSubLineHeight, belowTextAreaSubMarginTop;
  let designerTongPaddingTop;
  let deignserPhotoWidth;
  let designerTitleSize, designerTitleWeight, designerTitleMarginTop;
  let designerTong;
  let designerMthTargets;
  let designerMthSize, designerMthWeight, designerMthMarginTop;
  let careerBottom;
  let careerSize, careerWeight;
  let mobileDesignerWordingTop;
  let mobileDesignerBoxBetween;
  let boxHeight, boxPhotoWidth, boxBorderRadius;
  let boxBetween;
  let boxDetailBoxPaddingTop;
  let boxDetailBoxPaddingLeft;
  let boxDetailBoxLineMargin;
  let boxDetailAbsolutePadding;
  let boxDetailAbsoluteBoxHeight;
  let boxDetailAbsoluteArrowPadding;
  let boxDetailAbsoluteTextSize, boxDetailAbsoluteTextWeight;
  let boxDetailAbsoluteArrowWidth, boxDetailAbsoluteArrowBetween, boxDetailAbsoluteArrowVisualTop;
  let boxDetailBoxTitleSize, boxDetailBoxTitleWeight;
  let boxDetailBoxDetailSize, boxDetailBoxDetailWeight;
  let boxDetailBoxTitleEngSize, boxDetailBoxTitleEngWeight, boxDetailBoxTitleEngVisualTop;
  let baseTop;
  let baseBottom0, baseBottom1;
  let designerHomeTextTop;
  let careerString;

  story.shift();
  customerStory = '';
  for (let { answer } of customerStoryMother) {
    customerStory += answer;
    customerStory += "\n\n";
  }
  customerStory = customerStory.slice(0, -2);

  mainWidth = <%% (version === 1 ? 980 : 900), 900, 900, 720, 88 %%>;
  mainPaddingTop = <%% 110, 110, 110, 80, 11.7 %%>;

  titleSize = <%% 23, 23, 23, 21, 4.8 %%>;
  titleWeight = <%% 700, 700, 700, 700, 700 %%>;
  titleLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;
  titleBarMarginTop = <%% 15, 15, 15, 15, 3 %%>;
  titleBarWidth = <%% 80, 80, 80, 80, 18 %%>;

  contentsSize = <%% 16, 16, 16, 15, 3.8 %%>;
  contentsWeight = <%% 400, 400, 400, 400, 400 %%>;
  contentsLineHeight = <%% 1.7, 1.7, 1.7, 1.7, 1.7 %%>;

  customerPaddingLeft = <%% 150, 150, 150, 130, 6 %%>;
  customerMarginTop = <%% 36, 36, 36, 36, 5.5 %%>;

  customerSize = <%% 17, 17, 17, 16, 0 %%>;
  customerWeight = <%% 400, 400, 400, 400, 400 %%>;
  customerTop = <%% 3, 3, 3, 3, 3 %%>;
  customerLineHeight = <%% 1.3, 1.3, 1.3, 1.3, 1.3 %%>;

  photoMargin = <%% 8, 8, 8, 8, 1 %%>;
  blankMarginFirst = <%% 126, 126, 126, 96, 13.5 %%>;
  blankMargin = <%% 100, 100, 100, 70, 11 %%>;
  blankMargin2 = <%% 100, 100, 100, 70, 10 %%>;
  blankMarginLast = <%% 200, 200, 200, 170, 20 %%>;

  contentsPadding = <%% 21, 21, 21, 21, 6 %%>;

  wordingTop = <%% (isMac() ? 3 : 1), (isMac() ? 3 : 1), (isMac() ? 3 : 1), (isMac() ? 3 : 1), 0.6 %%>;
  questionMargin = <%% 10, 10, 10, 10, 1 %%>;
  answerMargin = <%% 36, 36, 36, 36, 6 %%>;

  questionWeight = <%% 700, 700, 700, 700, 700 %%>;
  answerWeight = <%% 400, 400, 400, 400, 400 %%>;

  belowBoxPadding = <%% 50, 50, 50, 36, 3.5 %%>;
  belowBoxHeight = <%% 300, 300, 300, 260, 30 %%>;

  belowWhiteWidth = <%% 200, 200, 200, 156, 0 %%>;

  belowPictureWidth = <%% 350, 350, 350, 290, 43 %%>;
  belowPictureMargin = <%% 18, 18, 18, 12, 0 %%>;

  nameCardWording = contents.contents.portfolio.title.main.split(", ")[1];

  nameCardIndex = nameCardWording.split(' ').findIndex((str) => { return /py/gi.test(str); });
  nameCardWording = nameCardWording.split(' ').slice(0, nameCardIndex).join(' ') + "\n" + nameCardWording.split(' ').slice(nameCardIndex).join(' ');

  portfolioWordingSize = <%% 15, 15, 15, 15, 2 %%>;
  portfolioWordingWeight = <%% 400, 400, 400, 400, 400 %%>;

  belowTextAreaPaddingLeft = <%% 12, 12, 12, 12, 4 %%>;
  belowTextTitleSize = <%% 25, 25, 25, 20, 3.5 %%>;
  belowTextTitleWeight = <%% 700, 700, 700, 700, 700 %%>;
  belowTextTitleLineHeight = <%% 1.4, 1.4, 1.4, 1.4, 1.4 %%>;
  belowTextAreaPaddingTop = <%% 158, 158, 158, 137, 8.5 %%>;
  belowTextAreaTitleBarTop = <%% (isMac() ? 12 : 14), (isMac() ? 12 : 14), (isMac() ? 12 : 14), (isMac() ? 12 : 14), 2 %%>;

  belowTextAreaSubSize = <%% 14, 14, 14, 12, 2 %%>;
  belowTextAreaSubWeight = <%% 500, 500, 500, 500, 500 %%>;
  belowTextAreaSubLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;
  belowTextAreaSubMarginTop = <%% 20, 20, 20, 20, 2 %%>;

  designerTongPaddingTop = <%% 30, 30, 30, 27, 30 %%>;
  deignserPhotoWidth = <%% 124, 124, 124, 110, 124 %%>;

  designerTitleSize = <%% 19, 19, 19, 16, 19 %%>;
  designerTitleWeight = <%% 700, 700, 700, 700, 700 %%>;
  designerTitleMarginTop = <%% 10, 10, 10, 7, 10 %%>;

  designerMthSize = <%% 13, 13, 13, 11, 13 %%>;
  designerMthWeight = <%% 500, 500, 500, 500, 500 %%>;
  designerMthMarginTop = <%% 3, 3, 3, 2, 3 %%>;

  careerBottom = <%% 30, 30, 30, 27, 30 %%>;
  careerSize = <%% 12, 12, 12, 11, 12 %%>;
  careerWeight = <%% 400, 400, 400, 400, 400 %%>;

  mobileDesignerWordingTop = 13;
  mobileDesignerBoxBetween = 2;

  boxHeight = <%% 404, 404, 394, 330, 80 %%>;
  boxPhotoWidth = <%% (version === 1 ? 652 : 572), (version === 1 ? 572 : 572), (version === 1 ? 572 : 572), (version === 1 ? 450 : 450), 88 %%>;
  boxBorderRadius = <%% 10, 10, 10, 10, 10 %%>;
  boxBetween = <%% 12, 12, 12, 12, 1.5 %%>;

  boxDetailBoxPaddingTop = <%% 24, 24, 24, 18, 4 %%>;
  boxDetailBoxPaddingLeft = <%% 24, 24, 24, 20, 5 %%>;

  boxDetailBoxLineMargin = <%% 8, 8, 8, 8, 1.6 %%>;

  boxDetailAbsolutePadding = <%% 10, 10, 10, 10, 2 %%>;
  boxDetailAbsoluteBoxHeight = <%% 52, 52, 50, 45, 9.6 %%>;

  boxDetailAbsoluteArrowPadding = <%% 16, 15, 14, 13, 4 %%>;
  boxDetailAbsoluteTextSize = <%% 15, 15, 15, 13, 3 %%>;
  boxDetailAbsoluteTextWeight = <%% 300, 300, 300, 300, 300 %%>;
  boxDetailAbsoluteArrowWidth = <%% 18, 18, 18, 14, 4 %%>;
  boxDetailAbsoluteArrowBetween = <%% 6, 6, 6, 6, 1.5 %%>;
  boxDetailAbsoluteArrowVisualTop = <%% (isMac() ? -0 : 0), (isMac() ? -0 : 0), (isMac() ? -0 : 0), (isMac() ? -0 : 0), -0.1 %%>;

  boxDetailBoxTitleSize = <%% 20, 19, 17, 16, 3.8 %%>;
  boxDetailBoxTitleWeight = <%% 700, 700, 700, 700, 700 %%>;
  boxDetailBoxDetailSize = <%% 13, 13, 13, 10, 3 %%>;
  boxDetailBoxDetailWeight = <%% 400, 400, 400, 400, 400 %%>;

  boxDetailBoxTitleEngSize = <%% 22, 21, 19, 18, 4.1 %%>;
  boxDetailBoxTitleEngWeight = <%% 700, 700, 700, 700, 700 %%>;
  boxDetailBoxTitleEngVisualTop = <%% 0.5, 0.5, 0.5, 0.5, 0.1 %%>;

  baseTop = <%% 140, 110, 110, 80, 2.5 %%>;
  baseBottom0 = <%% 150, 115, 115, 85, 25 %%>;
  baseBottom1 = <%% 200, 200, 200, 160, 24 %%>;

  careerString = designerCareer(designer, true);

  designerHomeTextTop = <%% (isMac() ? 1 : 2), (isMac() ? 1 : 2), (isMac() ? 1 : 2), (isMac() ? 1 : 2), 0 %%>;

  mainTong = createNode({
    mother: totalContents,
    style: {
      display: "block",
      position: "relative",
      width: String(mainWidth) + ea,
      left: "calc(50% - " + String(mainWidth / 2) + ea + ")",
      background: colorChip.white,
      animation: "fadeupdelay 0.5s ease forwards",
    },
  });

  if (version === 1) {
    createNode({
      mother: mainTong,
      style: {
        display: "block",
        height: String(baseTop) + ea,
      }
    });
  }

  createNode({
    mother: mainTong,
    style: {
      display: "flex",
      position: "relative",
      width: withOut(0, ea),
      height: desktop ? String(boxHeight) + ea : "",
      flexDirection: desktop ? "row" : "column",
      justifyContent: "start",
      alignItems: "start",
    },
    children: [
      {
        style: {
          display: desktop ? "inline-flex" : "none",
          position: "relative",
          height: desktop ? withOut(0, ea) : String(45) + ea,
          width: desktop ? String(boxPhotoWidth) + ea : withOut(0, ea),
          backgroundImage: "url('" + "https://" + FILEHOST + "/list_image/portp" + pid + (desktop ? ("/" + photoChar) : ("/mobile/" + photoCharMobile)) + String(contents.contents.portfolio.detailInfo.photodae[1]) + pid + ".jpg" + "')",
          backgroundSize: big ? "100% auto" : "auto 100%",
          backgroundPosition: "50% 50%",
          borderRadius: String(boxBorderRadius) + "px",
        }
      },
      {
        style: {
          display: desktop ? "inline-flex" : "flex",
          position: "relative",
          height: desktop ? withOut(0, ea) : "",
          width: desktop ? withOut(boxPhotoWidth + boxBetween, ea) : withOut(0, ea),
          marginLeft: desktop ? String(boxBetween) + ea : "",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "start",
        },
        children: [
          {
            style: {
              display: "flex",
              position: "relative",
              width: withOut(boxDetailBoxPaddingLeft * 2, ea),
              height: desktop ? "calc(calc(calc(100% - " + String(boxBetween) + ea + ") / 2) - " + String(boxDetailBoxPaddingTop * 2) + ea + ")" : String(30) + ea,
              borderRadius: String(boxBorderRadius) + "px",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "start",
              marginBottom: String(boxBetween) + ea,
              paddingTop: String(boxDetailBoxPaddingTop) + ea,
              paddingBottom: String(boxDetailBoxPaddingTop) + ea,
              paddingLeft: String(boxDetailBoxPaddingLeft) + ea,
              paddingRight: String(boxDetailBoxPaddingLeft) + ea,
              background: colorExtended.blue,
            },
            children: [
              {
                event: {
                  selectstart: (e) => { e.preventDefault() },
                  click: function (e) { selfHref(FRONTHOST + "/desdetail.php?desid=" + this.getAttribute("desid")) },
                },
                attribute: { desid: designer.desid },
                style: {
                  display: "flex",
                  position: "absolute",
                  width: withOut((boxDetailAbsolutePadding * 2) + boxDetailAbsoluteArrowPadding, ea),
                  left: String(boxDetailAbsolutePadding) + ea,
                  bottom: String(boxDetailAbsolutePadding) + ea,
                  height: String(boxDetailAbsoluteBoxHeight) + ea,
                  borderRadius: String(boxBorderRadius) + "px",
                  background: colorExtended.blueLight,
                  flexDirection: "row",
                  justifyContent: "end",
                  alignItems: "center",
                  paddingRight: String(boxDetailAbsoluteArrowPadding) + ea,
                  cursor: "pointer",
                },
                child: {
                  event: {
                    selectstart: (e) => { e.preventDefault() },
                  },
                  text: "DESIGNER HOME",
                  style: {
                    display: "inline-block",
                    position: "relative",
                    fontSize: String(boxDetailAbsoluteTextSize) + ea,
                    fontWeight: String(boxDetailAbsoluteTextWeight),
                    top: String(designerHomeTextTop) + ea,
                    fontFamily: "gmarket",
                    color: colorExtended.white,
                  },
                  next: {
                    mode: "svg",
                    source: svgMaker.squareArrow(colorExtended.white),
                    style: {
                      display: "inline-block",
                      position: "relative",
                      width: String(boxDetailAbsoluteArrowWidth) + ea,
                      marginLeft: String(boxDetailAbsoluteArrowBetween) + ea,
                      top: String(boxDetailAbsoluteArrowVisualTop) + ea,
                    }
                  }
                }
              },
              {
                style: {
                  display: "flex",
                  position: "relative",
                  flexDirection: "row",
                  justifyContent: "start",
                  alignItems: "start",
                },
                child: {
                  text: designer.designer + " 디자이너",
                  style: {
                    display: "inline-block",
                    position: "relative",
                    fontSize: String(boxDetailBoxTitleSize) + ea,
                    fontWeight: String(boxDetailBoxTitleWeight),
                    color: colorExtended.white,
                    fontFamily: "pretendard",
                  }
                }
              },
              {
                style: {
                  display: "block",
                  position: "relative",
                  width: withOut(0, ea),
                  height: String(boxDetailBoxLineMargin) + ea,
                  borderBottom: "1px solid " + colorExtended.white,
                  marginBottom: String(desktop ? boxDetailBoxLineMargin : 2) + ea,
                  opacity: String(0.6),
                }
              },
              {
                style: {
                  display: "flex",
                  position: "relative",
                  flexDirection: "row",
                  justifyContent: "start",
                  alignItems: "start",
                },
                child: {
                  text: designerMthParsing(designer.setting.front.methods).join(", "),
                  style: {
                    display: "inline-block",
                    position: "relative",
                    fontSize: String(boxDetailBoxDetailSize) + ea,
                    fontWeight: String(boxDetailBoxDetailWeight),
                    color: colorExtended.white,
                    fontFamily: "pretendard",
                  }
                }
              },
              {
                style: {
                  display: "flex",
                  position: "relative",
                  flexDirection: "row",
                  justifyContent: "start",
                  alignItems: "start",
                },
                child: {
                  text: careerString,
                  style: {
                    display: "inline-block",
                    position: "relative",
                    fontSize: String(boxDetailBoxDetailSize) + ea,
                    fontWeight: String(boxDetailBoxDetailWeight),
                    color: colorExtended.white,
                    fontFamily: "pretendard",
                  },
                  bold: {
                    fontSize: String(boxDetailBoxDetailSize) + ea,
                    fontWeight: String(boxDetailBoxDetailWeight),
                    color: colorExtended.white,
                    fontFamily: "pretendard",
                    opacity: String(0.4),
                  }
                }
              },
            ],
          },
          {
            style: {
              display: "flex",
              position: "relative",
              width: withOut(boxDetailBoxPaddingLeft * 2, ea),
              height: desktop ? "calc(calc(calc(100% - " + String(boxBetween) + ea + ") / 2) - " + String(boxDetailBoxPaddingTop * 2) + ea + ")" : String(30) + ea,
              borderRadius: String(boxBorderRadius) + "px",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "start",
              paddingTop: String(boxDetailBoxPaddingTop) + ea,
              paddingBottom: String(boxDetailBoxPaddingTop) + ea,
              paddingLeft: String(boxDetailBoxPaddingLeft) + ea,
              paddingRight: String(boxDetailBoxPaddingLeft) + ea,
              background: colorExtended.black,
            },
            children: [
              {
                event: {
                  selectstart: (e) => { e.preventDefault() },
                  click: function (e) { selfHref(FRONTHOST + "/portdetail.php?pid=" + this.getAttribute("pid")) },
                },
                attribute: { pid: instance.pid },
                style: {
                  display: "flex",
                  position: "absolute",
                  width: withOut((boxDetailAbsolutePadding * 2) + boxDetailAbsoluteArrowPadding, ea),
                  left: String(boxDetailAbsolutePadding) + ea,
                  bottom: String(boxDetailAbsolutePadding) + ea,
                  height: String(boxDetailAbsoluteBoxHeight) + ea,
                  borderRadius: String(boxBorderRadius) + "px",
                  background: colorExtended.darkDarkShadow,
                  flexDirection: "row",
                  justifyContent: "end",
                  alignItems: "center",
                  paddingRight: String(boxDetailAbsoluteArrowPadding) + ea,
                },
                child: {
                  event: {
                    selectstart: (e) => { e.preventDefault() },
                  },
                  text: "PORTFOLIO",
                  style: {
                    display: "inline-block",
                    position: "relative",
                    fontSize: String(boxDetailAbsoluteTextSize) + ea,
                    fontWeight: String(boxDetailAbsoluteTextWeight),
                    top: String(designerHomeTextTop) + ea,
                    fontFamily: "gmarket",
                    color: colorExtended.white,
                  },
                  next: {
                    mode: "svg",
                    source: svgMaker.squareArrow(colorExtended.blue),
                    style: {
                      display: "inline-block",
                      position: "relative",
                      width: String(boxDetailAbsoluteArrowWidth) + ea,
                      marginLeft: String(boxDetailAbsoluteArrowBetween) + ea,
                      top: String(boxDetailAbsoluteArrowVisualTop) + ea,
                    }
                  }
                }
              },
              {
                style: {
                  display: "flex",
                  position: "relative",
                  flexDirection: "row",
                  justifyContent: "start",
                  alignItems: "start",
                },
                child: {
                  text: contents.contents.portfolio.spaceInfo.space + " <b%" + String(contents.contents.portfolio.spaceInfo.pyeong) + "PY%b>",
                  style: {
                    display: "inline-block",
                    position: "relative",
                    fontSize: String(boxDetailBoxTitleSize) + ea,
                    fontWeight: String(boxDetailBoxTitleWeight),
                    color: colorExtended.white,
                    fontFamily: "pretendard",
                  },
                  bold: {
                    fontSize: String(boxDetailBoxTitleEngSize) + ea,
                    fontWeight: String(boxDetailBoxTitleEngWeight),
                    color: colorExtended.white,
                    fontFamily: "mont",
                    position: "relative",
                    top: String(boxDetailBoxTitleEngVisualTop) + ea,
                  }
                }
              },
              {
                style: {
                  display: "block",
                  position: "relative",
                  width: withOut(0, ea),
                  height: String(boxDetailBoxLineMargin) + ea,
                  borderBottom: "1px solid " + colorExtended.white,
                  marginBottom: String(desktop ? boxDetailBoxLineMargin : 2) + ea,
                  opacity: String(0.6),
                }
              },
              {
                style: {
                  display: "flex",
                  position: "relative",
                  flexDirection: "row",
                  justifyContent: "start",
                  alignItems: "start",
                },
                child: {
                  text: serviceParsing(contents.service).replace(/[ ]*(basic|mini|premium)/gi, '').trim(),
                  style: {
                    display: "inline-block",
                    position: "relative",
                    fontSize: String(boxDetailBoxDetailSize) + ea,
                    fontWeight: String(boxDetailBoxDetailWeight),
                    color: colorExtended.white,
                    fontFamily: "pretendard",
                  }
                }
              },
              {
                style: {
                  display: "flex",
                  position: "relative",
                  flexDirection: "row",
                  justifyContent: "start",
                  alignItems: "start",
                },
                child: {
                  text: contents.contents.portfolio.title.sub.split(", ")[0] + " " + contents.contents.portfolio.spaceInfo.space,
                  style: {
                    display: "inline-block",
                    position: "relative",
                    fontSize: String(boxDetailBoxDetailSize) + ea,
                    fontWeight: String(boxDetailBoxDetailWeight),
                    color: colorExtended.white,
                    fontFamily: "pretendard",
                  }
                }
              },
            ]
          },
        ]
      }
    ]
  })

  createNode({
    mother: mainTong,
    style: {
      display: "block",
      height: String(version === 1 ? baseBottom0 : baseBottom1) + ea,
    }
  });

}

ReviewDetailJs.prototype.launching = async function (loading) {
  const instance = this;
  const { returnGet, ajaxJson, colorExtended, setQueue, setDebounce, stringToJson, facebookSdkPatch, kakaoSdkPatch, setMetaData, homeliaisonAnalytics, dateToString, objectDeepCopy } = GeneralJs;
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
    const { pid } = getObj;
    const editable = (typeof getObj.edit === "string");
    let response;
    let thisVersion;

    if (typeof pid !== "string") {
      throw new Error("invaild pid");
    }
    this.pid = pid;
    this.editable = editable;

    response = await ajaxJson({ mode: "review", pid }, LOGHOST + "/getContents", { equal: true });
    this.contentsArr = new SearchArray(response.contentsArr);
    this.designers = new SearchArray(response.designers);
    this.fullLoad = false;
    this.photoLoad = false;
    this.loadedContents = [];
    this.slideTimeout = null;

    thisVersion = !/999/gi.test(this.contentsArr[0].contents.review.rid) ? 0 : 1;
    this.version = thisVersion;
    if (this.version === 1) {
      this.evaluation = stringToJson(this.contentsArr[0].contents.review.contents.detail[0].contents[0].answer);
    } else {
      this.evaluation = null;
    }

    if (/^re/.test(pid)) {
      this.pid = this.contentsArr[0].contents.portfolio.pid;
    }

    await this.mother.ghostClientLaunching({
      mode: "front",
      name: "reviewDetail",
      client: null,
      base: {
        instance: this,
        binaryPath: ReviewDetailJs.binaryPath,
        subTitle: "",
        secondBackground: false,
        backgroundType: 2,
      },
      local: async () => {
        try {

          instance.reviewInitBox();
          instance.reviewMainBox();
          if (instance.version === 0) {
            instance.reviewContentsBox();
          } else {
            instance.reviewDetailBox();
          }
          instance.reviewDesignerBox();
          instance.reviewRelativeBox();

          homeliaisonAnalytics({
            page: instance.pageName,
            standard: instance.firstPageViewTime,
            action: "contentsView",
            data: {
              cliid: "null",
              href: window.encodeURIComponent(window.location.href),
              date: dateToString(new Date(), true),
            },
            dimension: {
              contents_desid: instance.designers.length > 0 ? instance.designers[0].desid : "null",
              contents_pid: instance.pid,
            }
          }).catch((err) => {
            console.log(err);
          });

        } catch (e) {
          await GeneralJs.ajaxJson({ message: "ReviewDetailJs.launching.ghostClientLaunching : " + e.message + "\n\n" + JSON.stringify(instance.contentsArr)}, BACKHOST + "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

    setQueue(() => {
      ajaxJson({ mode: "review" }, LOGHOST + "/getContents", { equal: true }).then((response) => {
        instance.contentsArr = new SearchArray(response.contentsArr);
        instance.designers = new SearchArray(response.designers);
        instance.fullLoad = true;
      }).catch((err) => {
        console.log(err);
      });
    });

  } catch (err) {
    console.log(err);
    window.alert("잘못된 접근입니다!");
    await ajaxJson({ message: "ReviewDetailJs.launching 에러 일어남 => " + err.message }, BACKHOST + "/errorLog");
  }
}
