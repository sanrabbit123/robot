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

  whiteBlockMarginBottom = <%% 36, 32, 30, 23, 9.5 %%>;

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
      marginBottom: String(50) + ea,
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
  const { createNode, colorChip, colorExtended, withOut, svgMaker, isMac, isIphone, serviceParsing, variableArray, autoComma } = GeneralJs;
  const { totalContents, naviHeight, ea, media, pid, standardWidth } = this;
  const { contentsArr } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const contents = contentsArr.toNormal().filter((obj) => { return obj.contents.portfolio.pid === pid })[0];
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

  thisVersion = instance.version;

  mainRatio = (87 / 160);
  mainMargin = 64;
  photoRatio = 0.58;

  mainHeight = <%% 800, 750, 710, 590, mainRatio * 100 %%>;
  mainBelowBarHeight = <%% 250, 250, 250, 216, 250 %%>;

  contentsBoxTop = <%% 70, 70, 70, 70, 0 %%>;
  contentsBoxWidth = <%% 1200, 1050, 900, 720, 1200 %%>;

  bottomVisual = <%% 6, 6, 6, 6, 6 %%>;

  pictureWidth = <%% 820, 720, 610, 480, 610 %%>;
  pictureHeight = mainHeight - (contentsBoxTop * 2) - bottomVisual;

  boxRadius = 15;

  photoRightMargin = 45;
  designerSpacePhotoWidth = 96;
  designerSpacePhotoMarginRight = 20;

  barMargin = 30;
  barMarginBottom = 30;
  valueColumnMargin = 22;
  valueBlockHeight = 45;
  grayBarMargin = 16;

  keywordsLeft = 60;
  satisBarLeft = thisVersion === 0 ? 177 : 132;
  satisBarHeight = 20;
  satisBarVisualTop = -0.5;
  satisLength = 10;

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

  barBlank = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";

  contentsKeywords = [
    "밝은",
    "편안한 톤",
    "가성비 있게",
    "수납",
    "화이트 우드",
    "자연스러운"
  ];

  mainTong = createNode({
    mother: totalContents,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
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
      flexDirection: "row",
      width: desktop ? String(standardWidth) + ea : String(100) + '%',
      left: desktop ? "calc(50% - " + String(standardWidth / 2) + ea + ")" : String(0),
      top: String(0),
      paddingBottom: String(mainMargin) + ea,
      borderBottom: String(borderWidth) + "px solid " + colorExtended.gray3,
    }
  });

  // left picture
  picture = createNode({
    mother: contentsBox,
    style: {
      display: desktop ? "inline-flex" : "block",
      position: desktop ? "relative" : "absolute",
      width: desktop ? String(standardWidth * photoRatio) + ea : String(100) + '%',
      height: desktop ? String((standardWidth * photoRatio) * mainRatio) + ea : String(100) + '%',
      borderRadius: String(boxRadius) + "px",
      backgroundImage: "url('" + FRONTHOST + "/list_image/portp" + pid + (desktop ? ("/" + photoChar) : ("/mobile/" + photoCharMobile)) + String(contents.contents.review.detailInfo.photodae[1]) + pid + ".jpg" + "')",
      backgroundSize: "100% auto",
      backgroundPosition: "50% 50%",
      boxShadow: desktop ? "0px 8px 22px -15px " + colorChip.shadow : "",
      marginRight: String(photoRightMargin) + ea,
      verticalAlign: "top",
    }
  });

  // right box
  descriptionBox = createNode({
    mother: contentsBox,
    style: {
      display: "inline-flex",
      position: "relative",
      width: withOut((standardWidth * photoRatio) + photoRightMargin, ea),
      height: desktop ? String((standardWidth * photoRatio) * mainRatio) + ea : String(100) + '%',
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
      height: String(designerSpacePhotoWidth) + ea,
      flexDirection: "row",
      justifyContent: "start",
      alignItems: "start",
    },
    children: [
      {
        style: {
          display: "inline-flex",
          position: "relative",
          width: String(designerSpacePhotoWidth) + ea,
          height: String(designerSpacePhotoWidth) + ea,
          borderRadius: String(boxRadius) + "px",
          backgroundImage: "url('" + FRONTHOST + "/list_image/portp" + pid + (desktop ? ("/" + photoChar) : ("/mobile/" + photoCharMobile)) + String(contents.contents.review.detailInfo.photodae[1]) + pid + ".jpg" + "')",
          backgroundSize: "auto 100%",
          backgroundPosition: "50% 50%",
          boxShadow: desktop ? "0px 8px 22px -15px " + colorChip.shadow : "",
          marginRight: String(designerSpacePhotoMarginRight) + ea,
        }
      },
      {
        style: {
          display: "inline-flex",
          position: "relative",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "start",
          width: withOut(designerSpacePhotoWidth + designerSpacePhotoMarginRight, ea),
          height: String(designerSpacePhotoWidth) + ea,
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
      text: "호지희 디자이너",
      style: {
        display: "inline-block",
        position: "relative",
        fontSize: String(19) + ea,
        fontWeight: String(700),
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
      text: "모던" + barBlank + "<b%|%b>" + barBlank + "네추럴" + barBlank + "<b%|%b>" + barBlank + "모던",
      style: {
        display: "inline-block",
        position: "relative",
        fontSize: String(15) + ea,
        fontWeight: String(400),
        color: colorExtended.black,
        fontFamily: "pretendard",
      },
      bold: {
        fontSize: String(15) + ea,
        fontWeight: String(400),
        color: colorExtended.gray3,
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
      marginTop: String(14) + ea,
    },
    child: {
      style: {
        display: "inline-flex",
        position: "relative",
        left: String(-1) + ea,
        width: String(176) + ea,
        height: String(32) + ea,
        borderRadius: String(32) + ea,
        background: colorExtended.gradientBlue,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      },
      child: {
        text: "DESIGNER HOME",
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(13) + ea,
          fontWeight: String(300),
          fontFamily: "gmarket",
          color: colorExtended.white,
        },
        next: {
          mode: "svg",
          source: svgMaker.squareArrow(colorExtended.white),
          style: {
            display: "inline-block",
            position: "relative",
            width: String(16) + ea,
            marginLeft: String(5) + ea,
            top: String(-0.5) + ea,
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
        height: String(barMargin) + ea,
        borderBottom: String(borderWidth) + "px solid " + colorExtended.black,
        marginBottom: String(barMarginBottom) + ea,
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
                  fontSize: String(16) + ea,
                  fontWeight: String(400),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  top: String(-1) + ea,
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
                  fontSize: String(16) + ea,
                  fontWeight: String(700),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  top: String(-1) + ea,
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
                  fontSize: String(16) + ea,
                  fontWeight: String(400),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  top: String(-1) + ea,
                },
                bold: {
                  fontSize: String(14) + ea,
                  fontWeight: String(400),
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
                  fontSize: String(16) + ea,
                  fontWeight: String(700),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  top: String(-1) + ea,
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
                  fontSize: String(16) + ea,
                  fontWeight: String(400),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  top: String(-1) + ea,
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
                  fontSize: String(16) + ea,
                  fontWeight: String(700),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  top: String(-1) + ea,
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
                  fontSize: String(16) + ea,
                  fontWeight: String(400),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  top: String(-1) + ea,
                },
                bold: {
                  fontSize: String(14) + ea,
                  fontWeight: String(400),
                  fontFamily: "pretendard",
                  color: colorExtended.deactive,
                },
                special: {
                  fontSize: String(9) + ea,
                  fontWeight: String(400),
                  fontFamily: "pretendard",
                  color: colorExtended.deactive,
                  position: "relative",
                  top: String(-5) + ea,
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
                text: String(88.2) + "m<s%2%s>",
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(16) + ea,
                  fontWeight: String(700),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  top: String(-1) + ea,
                },
                special: {
                  fontSize: String(9) + ea,
                  fontWeight: String(700),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  position: "relative",
                  top: String(-5) + ea,
                },
              }
            },
          ]
        },
      ]
    });
    // 3 - gray bar
    createNode({
      mother: descriptionBox,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        height: String(grayBarMargin) + ea,
        borderBottom: String(borderWidthLight) + "px solid " + colorExtended.gray3,
        marginBottom: String(grayBarMargin) + ea,
        flexDirection: "row",
        justifyContent: "start",
        alignItems: "start",
      }
    });
    // 4
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
                text: "예산",
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(16) + ea,
                  fontWeight: String(400),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  top: String(-1) + ea,
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
                  fontSize: String(16) + ea,
                  fontWeight: String(700),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  top: String(-1) + ea,
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
                  fontSize: String(16) + ea,
                  fontWeight: String(400),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  top: String(-1) + ea,
                },
                bold: {
                  fontSize: String(14) + ea,
                  fontWeight: String(400),
                  fontFamily: "pretendard",
                  color: colorExtended.deactive,
                },
                special: {
                  fontSize: String(9) + ea,
                  fontWeight: String(400),
                  fontFamily: "pretendard",
                  color: colorExtended.deactive,
                  position: "relative",
                  top: String(-5) + ea,
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
                text: "약 60일",
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(16) + ea,
                  fontWeight: String(700),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  top: String(-1) + ea,
                },
                special: {
                  fontSize: String(9) + ea,
                  fontWeight: String(700),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  position: "relative",
                  top: String(-5) + ea,
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
                text: "온오프라인",
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(16) + ea,
                  fontWeight: String(400),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  top: String(-1) + ea,
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
                text: "오프라인",
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(16) + ea,
                  fontWeight: String(700),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  top: String(-1) + ea,
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
                  fontSize: String(16) + ea,
                  fontWeight: String(400),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  top: String(-1) + ea,
                },
                bold: {
                  fontSize: String(14) + ea,
                  fontWeight: String(400),
                  fontFamily: "pretendard",
                  color: colorExtended.deactive,
                },
                special: {
                  fontSize: String(9) + ea,
                  fontWeight: String(400),
                  fontFamily: "pretendard",
                  color: colorExtended.deactive,
                  position: "relative",
                  top: String(-5) + ea,
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
                  fontSize: String(16) + ea,
                  fontWeight: String(700),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  top: String(-1) + ea,
                },
                special: {
                  fontSize: String(9) + ea,
                  fontWeight: String(700),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  position: "relative",
                  top: String(-5) + ea,
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
        marginBottom: String(grayBarMargin) + ea,
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
        height: String(barMargin) + ea,
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
                  fontSize: String(16) + ea,
                  fontWeight: String(400),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  top: String(-1) + ea,
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
                top: String(0),
                left: String(satisBarLeft) + ea,
                width: withOut(satisBarLeft, ea),
                height: withOut(0, ea),
              },
              child: {
                style: {
                  display: "inline-flex",
                  position: "relative",
                  width: withOut(0, ea),
                  height: String(satisBarHeight) + ea,
                  borderRadius: String(satisBarHeight) + ea,
                  border: String(borderWidth) + "px solid " + colorExtended.black,
                  boxSizing: "border-box",
                  top: String(satisBarVisualTop) + ea,
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
                        width: "calc(" + String(84) + "%)",
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
        marginBottom: String(grayBarMargin) + ea,
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
        marginBottom: String(-6) + ea,
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
                  fontSize: String(16) + ea,
                  fontWeight: String(400),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  top: String(-1) + ea,
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
                top: String(0),
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
                      height: withOut(0, ea),
                      borderRadius: String(30) + ea,
                      paddingLeft: String(14) + ea,
                      paddingRight: String(14) + ea,
                      boxSizing: "border-box",
                      border: String(borderWidth) + "px solid " + colorExtended.gray3,
                      justifyContent: "center",
                      alignItems: "center",
                      marginLeft: String(index === 0 ? 0 : 4) + ea,
                    },
                    child: {
                      text: "<b%#%b> " + str,
                      style: {
                        display: "inline-block",
                        position: "relative",
                        fontSize: String(12.5) + ea,
                        fontWeight: String(700),
                        fontFamily: "pretendard",
                        color: colorExtended.mainBlue,
                        top: String(-1) + ea,
                      },
                      bold: {
                        fontSize: String(12.5) + ea,
                        fontWeight: String(400),
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
        height: String(24) + ea,
        borderBottom: String(borderWidth) + "px solid " + colorExtended.black,
        marginBottom: String(20) + ea,
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
                  fontSize: String(16) + ea,
                  fontWeight: String(400),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  top: String(-1) + ea,
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
                text: autoComma(6000) + "만원대",
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(17) + ea,
                  fontWeight: String(700),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  top: String(-1) + ea,
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
                  fontSize: String(16) + ea,
                  fontWeight: String(400),
                  fontFamily: "pretendard",
                  color: colorExtended.gray5,
                  top: String(-1) + ea,
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
                text: autoComma(231) + "만원",
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(16) + ea,
                  fontWeight: String(400),
                  fontFamily: "pretendard",
                  color: colorExtended.gray5,
                  top: String(-1) + ea,
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
                  fontSize: String(16) + ea,
                  fontWeight: String(400),
                  fontFamily: "pretendard",
                  color: colorExtended.gray5,
                  top: String(-1) + ea,
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
                text: autoComma(4000) + "만원대",
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(16) + ea,
                  fontWeight: String(400),
                  fontFamily: "pretendard",
                  color: colorExtended.gray5,
                  top: String(-1) + ea,
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
                  fontSize: String(16) + ea,
                  fontWeight: String(400),
                  fontFamily: "pretendard",
                  color: colorExtended.gray5,
                  top: String(-1) + ea,
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
                text: autoComma(2000) + "만원대",
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(16) + ea,
                  fontWeight: String(400),
                  fontFamily: "pretendard",
                  color: colorExtended.gray5,
                  top: String(-1) + ea,
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
        marginBottom: String(grayBarMargin) + ea,
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
                  fontSize: String(16) + ea,
                  fontWeight: String(400),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  top: String(-1) + ea,
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
                text: String(contents.contents.portfolio.spaceInfo.pyeong) + "py&nbsp;&nbsp;<b%( %b><u%84m%u><s%2%s><b% )%b>",
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(16) + ea,
                  fontWeight: String(700),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  top: String(-1) + ea,
                },
                bold: {
                  fontSize: String(16) + ea,
                  fontWeight: String(600),
                  fontFamily: "pretendard",
                  color: colorExtended.mainBlue,
                },
                under: {
                  fontSize: String(16) + ea,
                  fontWeight: String(600),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                },
                special: {
                  fontSize: String(9) + ea,
                  fontWeight: String(600),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  position: "relative",
                  top: String(-5) + ea,
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
                  fontSize: String(16) + ea,
                  fontWeight: String(400),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  top: String(-1) + ea,
                },
                bold: {
                  fontSize: String(14) + ea,
                  fontWeight: String(400),
                  fontFamily: "pretendard",
                  color: colorExtended.deactive,
                },
                special: {
                  fontSize: String(9) + ea,
                  fontWeight: String(400),
                  fontFamily: "pretendard",
                  color: colorExtended.deactive,
                  position: "relative",
                  top: String(-5) + ea,
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
                  fontSize: String(16) + ea,
                  fontWeight: String(700),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  top: String(-1) + ea,
                },
                special: {
                  fontSize: String(9) + ea,
                  fontWeight: String(700),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  position: "relative",
                  top: String(-5) + ea,
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
                  fontSize: String(16) + ea,
                  fontWeight: String(400),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  top: String(-1) + ea,
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
                  fontSize: String(16) + ea,
                  fontWeight: String(700),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  top: String(-1) + ea,
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
                  fontSize: String(16) + ea,
                  fontWeight: String(400),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  top: String(-1) + ea,
                },
                bold: {
                  fontSize: String(14) + ea,
                  fontWeight: String(400),
                  fontFamily: "pretendard",
                  color: colorExtended.deactive,
                },
                special: {
                  fontSize: String(9) + ea,
                  fontWeight: String(400),
                  fontFamily: "pretendard",
                  color: colorExtended.deactive,
                  position: "relative",
                  top: String(-5) + ea,
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
                text: "약 60일",
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(16) + ea,
                  fontWeight: String(700),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  top: String(-1) + ea,
                },
                special: {
                  fontSize: String(9) + ea,
                  fontWeight: String(700),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  position: "relative",
                  top: String(-5) + ea,
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
                  fontSize: String(16) + ea,
                  fontWeight: String(400),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  top: String(-1) + ea,
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
                text: "일부 구매 + 재배치",
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(16) + ea,
                  fontWeight: String(700),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  top: String(-1) + ea,
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
                  fontSize: String(16) + ea,
                  fontWeight: String(400),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  top: String(-1) + ea,
                },
                bold: {
                  fontSize: String(14) + ea,
                  fontWeight: String(400),
                  fontFamily: "pretendard",
                  color: colorExtended.deactive,
                },
                special: {
                  fontSize: String(9) + ea,
                  fontWeight: String(400),
                  fontFamily: "pretendard",
                  color: colorExtended.deactive,
                  position: "relative",
                  top: String(-5) + ea,
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
                text: String(95.5) + "<b%%%b>",
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(16) + ea,
                  fontWeight: String(700),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  top: String(-1) + ea,
                },
                bold: {
                  fontSize: String(16) + ea,
                  fontWeight: String(700),
                  fontFamily: "pretendard",
                  color: colorExtended.mainBlue,
                },
                special: {
                  fontSize: String(9) + ea,
                  fontWeight: String(700),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  position: "relative",
                  top: String(-5) + ea,
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
        marginBottom: String(grayBarMargin) + ea,
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
        marginBottom: String(-6) + ea,
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
                  fontSize: String(16) + ea,
                  fontWeight: String(400),
                  fontFamily: "pretendard",
                  color: colorExtended.black,
                  top: String(-1) + ea,
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
                top: String(0),
                left: String(satisBarLeft) + ea,
                width: withOut(satisBarLeft, ea),
                height: withOut(0, ea),
              },
              child: {
                style: {
                  display: "inline-flex",
                  position: "relative",
                  width: withOut(0, ea),
                  height: String(satisBarHeight) + ea,
                  borderRadius: String(satisBarHeight) + ea,
                  border: String(borderWidth) + "px solid " + colorExtended.black,
                  boxSizing: "border-box",
                  top: String(satisBarVisualTop) + ea,
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
                        width: "calc(" + String(84) + "%)",
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
  const { createNode, colorChip, colorExtended, withOut, svgMaker, isMac, isIphone, serviceParsing, variableArray, autoComma } = GeneralJs;
  const { totalContents, naviHeight, ea, media, pid, standardWidth } = this;
  const { contentsArr } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const contents = contentsArr.toNormal().filter((obj) => { return obj.contents.portfolio.pid === pid })[0];
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
  let titleBox;
  let grayLineBoxMarginTop, grayLineBoxBetween;
  let grayLineBoxPaddingTop;
  let grayLineBoxPaddingLeft;
  let thisContents;

  thisVersion = instance.version;

  mainRatio = (10 / 16);
  mainMargin = 150;
  photoRatio = 0.73;

  mainHeight = <%% 800, 750, 710, 590, mainRatio * 100 %%>;
  mainBelowBarHeight = <%% 250, 250, 250, 216, 250 %%>;

  contentsBoxTop = <%% 70, 70, 70, 70, 0 %%>;
  contentsBoxWidth = <%% 1200, 1050, 900, 720, 1200 %%>;

  bottomVisual = <%% 6, 6, 6, 6, 6 %%>;

  pictureWidth = <%% 820, 720, 610, 480, 610 %%>;
  pictureHeight = mainHeight - (contentsBoxTop * 2) - bottomVisual;

  boxRadius = 15;

  photoRightMargin = 45;
  designerSpacePhotoWidth = 100;
  designerSpacePhotoMarginRight = 20;

  barMargin = 30;
  barMarginBottom = 30;
  valueColumnMargin = 22;
  valueBlockHeight = 45;
  grayBarMargin = 16;

  keywordsLeft = 60;
  satisBarLeft = 130;
  satisBarHeight = 20;
  satisBarVisualTop = -0.5;
  satisLength = 10;

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

  grayLineBoxMarginTop = 22;
  grayLineBoxBetween = 10;
  grayLineBoxPaddingTop = 20;
  grayLineBoxPaddingLeft = 24;


  barBlank = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";

  thisContents = [
    "고객님의 공간은 사무실의 멀티룸 공간으로 일반 사무를 보는 공간이 아닌, 직원들이 쉬고 가볍게 회의하는 공간을 구성하고자 하셨습니다.",
    "선호하시는 스타일로는 대표님의 취향이 어둡고 무게감 있는 분위기를 원하신다고 하셨는데,시공이 들아갈 수 없는 현장이라 가구톤을 어두운 월넛톤과 블랙 금속이 여기저기 매치되도록 구성하였습니다.",
    "그리고 너무 다운되는 분위기를 막을 수 있도록 패브릭은 밝고 차분한 톤으로 매치 하였습니다.",
  ];

  contentsKeywords = [
    "밝은",
    "편안한 톤",
    "가성비 있게",
    "수납",
    "화이트 우드",
    "자연스러운"
  ];

  mainTong = createNode({
    mother: totalContents,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
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
      flexDirection: "row",
      width: desktop ? String(standardWidth) + ea : String(100) + '%',
      left: desktop ? "calc(50% - " + String(standardWidth / 2) + ea + ")" : String(0),
      top: String(0),
      paddingTop: String(mainMargin) + ea,
      paddingBottom: String(60) + ea,
    }
  });

  // left picture
  picture = createNode({
    mother: contentsBox,
    style: {
      display: desktop ? "inline-flex" : "block",
      position: desktop ? "relative" : "absolute",
      width: desktop ? String(standardWidth * photoRatio) + ea : String(100) + '%',
      height: desktop ? String((standardWidth * photoRatio) * mainRatio) + ea : String(100) + '%',
      borderRadius: String(boxRadius) + "px",
      backgroundImage: "url('" + FRONTHOST + "/list_image/portp" + pid + (desktop ? ("/" + photoChar) : ("/mobile/" + photoCharMobile)) + String(1) + pid + ".jpg" + "')",
      backgroundSize: "100% auto",
      backgroundPosition: "50% 50%",
      boxShadow: desktop ? "0px 8px 22px -15px " + colorChip.shadow : "",
      marginRight: String(photoRightMargin) + ea,
      verticalAlign: "top",
    }
  });

  // right box
  descriptionBox = createNode({
    mother: contentsBox,
    style: {
      display: "inline-flex",
      position: "relative",
      width: withOut((standardWidth * photoRatio) + photoRightMargin, ea),
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
      text: [
        "전문가를 이용하는 과정이",
        "확실히 편한 것 같아요."
      ].join("\n"),
      style: {
        display: "inline-block",
        position: "relative",
        fontSize: String(21) + ea,
        fontWeight: String(700),
        color: colorExtended.black,
        fontFamily: "pretendard",
      }
    }
  });

  createNode({
    mother: descriptionBox,
    style: {
      display: "flex",
      position: "relative",
      width: withOut(grayLineBoxPaddingLeft * 2, ea),
      height: withOut(grayLineBoxMarginTop + titleBox.getBoundingClientRect().height + (grayLineBoxPaddingTop * 2) + 22 + (30 * 2) + 6 + 10, ea),
      marginTop: String(grayLineBoxMarginTop) + ea,
      border: "1px solid " + colorExtended.gray3,
      borderRadius: String(12) + "px",
      paddingLeft: String(grayLineBoxPaddingLeft) + ea,
      paddingRight: String(grayLineBoxPaddingLeft) + ea,
      paddingTop: String(grayLineBoxPaddingTop) + ea,
      paddingBottom: String(grayLineBoxPaddingTop) + ea,
      flexDirection: "column",
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
          paddingBottom: String(6) + ea,
          borderBottom: String(borderWidth) + "px solid " + colorExtended.black,
        },
        children: [
          {
            style: {
              display: "inline-block",
              position: "relative",
              width: String(10) + ea,
              height: String(10) + ea,
              borderRadius: String(2) + "px",
              background: colorExtended.black,
              marginRight: String(4) + ea,
            }
          },
          {
            text: "DESIGNER's COMMENT",
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(15) + ea,
              fontWeight: String(700),
              color: colorExtended.black,
              top: String(1) + ea,
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
          paddingTop: String(12) + ea,
          height: withOut(26.5, ea),
          overflow: "scroll",
        },
        children: [
          {
            text: thisContents.join("\n\n"),
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(14) + ea,
              fontWeight: String(400),
              color: colorExtended.black,
              fontFamily: "pretendard",
              lineHeight: String(1.6),
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
      height: String(22) + ea,
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
      height: String(barMargin) + ea,
      flexDirection: "row",
      justifyContent: "start",
      alignItems: "start",
      marginBottom: String(-6) + ea,
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
              display: "inline-block",
              position: "absolute",
              textAlign: "left",
              top: String(0),
              left: String(-4) + ea,
              width: withOut(0 - (-4), ea),
              height: withOut(0, ea),
            },
            child: {
              style: {
                display: "inline-block",
                position: "relative",
                width: withOut(0, ea),
                height: withOut(0, ea),
                textAlign: "left",
              },
              children: contentsKeywords.map((str, index, arr) => {
                return {
                  style: {
                    display: "inline-flex",
                    position: "relative",
                    height: withOut(0, ea),
                    borderRadius: String(30) + ea,
                    paddingLeft: String(14) + ea,
                    paddingRight: String(14) + ea,
                    boxSizing: "border-box",
                    border: String(borderWidth) + "px solid " + colorExtended.gray3,
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: String(4) + ea,
                    marginBottom: String(6) + ea,
                  },
                  child: {
                    text: "<b%#%b> " + str,
                    style: {
                      display: "inline-block",
                      position: "relative",
                      fontSize: String(12.5) + ea,
                      fontWeight: String(700),
                      fontFamily: "pretendard",
                      color: colorExtended.mainBlue,
                      top: String(-1) + ea,
                    },
                    bold: {
                      fontSize: String(12.5) + ea,
                      fontWeight: String(400),
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
      height: String(160) + ea,
    },
    children: [
      {
        style: {
          display: "flex",
          flexDirection: "row",
          position: "relative",
          width: withOut(1.5 * 2, ea),
          height: String(160 - (10 * 2)) + ea,
          top: String(10) + ea,
          left: String(1.5) + ea,
          overflow: "scroll",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: String(8) + "px",
        },
        child: {
          style: {
            display: "flex",
            flexDirection: "row",
            position: "relative",
            width: String(500) + "%",
            height: withOut(0, ea),
          },
          children: contents.photos.detail.map((o) => {
            const { index, gs } = o;
            const src = FRONTHOST + "/list_image/portp" + pid + "/" + photoChar + String(index) + pid + ".jpg";
            return {
              mode: "img",
              attribute: { src },
              style: {
                display: "inline-block",
                position: "relative",
                height: withOut(0, ea),
                marginLeft: String(6) + ea,
                borderRadius: String(8) + "px",
              }
            }
          })
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
        src = FRONTHOST + "/list_image/portp" + pid + "/" + photoChar + String(index) + pid + ".jpg";
      } else {
        src = FRONTHOST + "/list_image/portp" + pid + "/mobile/" + photoCharMobile + String(index) + pid + ".jpg";
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

  belowBox = createNode({
    mother: mainTong,
    style: {
      display: "block",
      position: "relative",
      width: desktop ? withOut(belowBoxPadding * 2, ea) : withOut((belowBoxPadding + contentsPadding) * 2, ea),
      padding: String(belowBoxPadding) + ea,
      height: String(belowBoxHeight) + ea,
      borderRadius: String(5) + "px",
      background: colorChip.gray0,
      marginLeft: desktop ? "" : String(contentsPadding) + ea,
      marginRight: desktop ? "" : String(contentsPadding) + ea,
      marginBottom: desktop ? "" : String(mobileDesignerBoxBetween) + ea
    },
    children: [
      {
        attribute: {
          desid: designer.desid,
        },
        event: {
          click: function (e) {
            const desid = this.getAttribute("desid");
            selfHref(FRONTHOST + "/desdetail.php?desid=" + desid);
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
              const desid = this.getAttribute("desid");
              selfHref(FRONTHOST + "/desdetail.php?desid=" + desid);
            }
          }
        },
        style: {
          display: desktop ? "inline-block" : "none",
          position: "relative",
          borderRadius: String(5) + "px",
          width: String(belowWhiteWidth) + ea,
          paddingTop: String(designerTongPaddingTop) + ea,
          height: withOut(designerTongPaddingTop, ea),
          background: colorChip.white,
          textAlign: "center",
          verticalAlign: "top",
          cursor: "pointer",
        },
        children: [
          {
            style: {
              backgroundImage: "url('" + FRONTHOST + "/list_image/portp" + designer.setting.front.photo.porlid + "/" + designer.setting.front.photo.index + designer.setting.front.photo.porlid + ".jpg" + "')",
              backgroundSize: "auto 100%",
              backgroundPosition: "50% 50%",
              display: "inline-block",
              width: String(deignserPhotoWidth) + ea,
              height: String(deignserPhotoWidth) + ea,
              borderRadius: String(deignserPhotoWidth / 2) + ea,
            }
          },
          {
            text: designer.designer,
            style: {
              marginTop: String(designerTitleMarginTop) + ea,
              marginBottom: String(designerTitleMarginTop) + ea,
              textAlign: "center",
              fontSize: String(designerTitleSize) + ea,
              fontWeight: String(designerTitleWeight),
              color: colorChip.black,
            }
          }
        ]
      },
      {
        attribute: { pid },
        event: {
          click: function (e) {
            const pid = this.getAttribute("pid");
            selfHref(FRONTHOST + "/portdetail.php?pid=" + pid);
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
              selfHref(FRONTHOST + "/portdetail.php?pid=" + pid);
            }
          }
        },
        style: {
          display: "inline-block",
          position: "relative",
          borderRadius: String(5) + "px",
          width: String(belowPictureWidth) + ea,
          height: String(100) + '%',
          marginLeft: String(belowPictureMargin) + ea,
          backgroundImage: "url('" + FRONTHOST + "/list_image/portp" + pid + (desktop ? ("/" + photoChar) : ("/mobile/" + photoCharMobile)) + String(contents.contents.portfolio.detailInfo.photodae[1]) + pid + ".jpg" + "')",
          backgroundSize: desktop ? "auto 100%" : "100% auto",
          backgroundPosition: "50% 50%",
          verticalAlign: "top",
          cursor: "pointer",
        }
      },
      {
        attribute: { pid },
        event: {
          click: function (e) {
            const pid = this.getAttribute("pid");
            selfHref(FRONTHOST + "/portdetail.php?pid=" + pid);
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
              selfHref(FRONTHOST + "/portdetail.php?pid=" + pid);
            }
          }
        },
        style: {
          display: "inline-block",
          position: "relative",
          width: withOut(belowWhiteWidth + belowPictureWidth + (belowPictureMargin * 2) + belowTextAreaPaddingLeft, ea),
          paddingTop: String(belowTextAreaPaddingTop) + ea,
          marginLeft: String(belowPictureMargin) + ea,
          paddingLeft: String(belowTextAreaPaddingLeft) + ea,
          verticalAlign: "top",
          cursor: "pointer",
        },
        children: [
          {
            text: nameCardWording,
            style: {
              fontSize: String(belowTextTitleSize) + ea,
              fontWeight: String(belowTextTitleWeight),
              color: colorChip.black,
              lineHeight: String(belowTextTitleLineHeight),
            }
          },
          {
            style: {
              display: "block",
              height: String(belowTextAreaTitleBarTop) + ea,
              width: String(100) + '%',
              borderBottom: "1px solid " + colorChip.gray3,
            }
          },
          {
            text: contents.contents.portfolio.title.sub.split(", ").join("\n"),
            style: {
              fontSize: String(belowTextAreaSubSize) + ea,
              fontWeight: String(belowTextAreaSubWeight),
              color: colorChip.shadow,
              lineHeight: String(belowTextAreaSubLineHeight),
              marginTop: String(belowTextAreaSubMarginTop) + ea,
            }
          },
        ]
      },
      {
        text: "Portfolio",
        style: {
          position: "absolute",
          fontSize: String(portfolioWordingSize) + ea,
          fontWeight: String(portfolioWordingWeight),
          fontFamily: "graphik",
          color: colorChip.black,
          top: String(belowBoxPadding) + ea,
          right: String(belowBoxPadding) + ea,
          textAlign: "right",
        }
      }
    ]
  });

  if (mobile) {
    createNode({
      mother: mainTong,
      style: {
        display: "block",
        position: "relative",
        width: desktop ? withOut(belowBoxPadding * 2, ea) : withOut((belowBoxPadding + contentsPadding) * 2, ea),
        padding: String(belowBoxPadding) + ea,
        height: String(belowBoxHeight) + ea,
        borderRadius: String(5) + "px",
        background: colorChip.gray0,
        marginLeft: desktop ? "" : String(contentsPadding) + ea,
        marginRight: desktop ? "" : String(contentsPadding) + ea,
      },
      children: [
        {
          attribute: { desid: designer.desid },
          event: {
            click: function (e) {
              const desid = this.getAttribute("desid");
              selfHref(FRONTHOST + "/desdetail.php?desid=" + desid);
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
                const desid = this.getAttribute("desid");
                selfHref(FRONTHOST + "/desdetail.php?desid=" + desid);
              }
            }
          },
          style: {
            display: "inline-block",
            position: "relative",
            borderRadius: String(5) + "px",
            width: String(belowPictureWidth) + ea,
            height: String(100) + '%',
            marginLeft: String(belowPictureMargin) + ea,
            backgroundImage: "url('" + FRONTHOST + "/list_image/portp" + designer.setting.front.photo.porlid + "/" + designer.setting.front.photo.index + designer.setting.front.photo.porlid + ".jpg" + "')",
            backgroundSize: desktop ? "auto 100%" : "100% auto",
            backgroundPosition: "50% 50%",
            verticalAlign: "top",
          }
        },
        {
          attribute: { desid: designer.desid },
          event: {
            click: function (e) {
              const desid = this.getAttribute("desid");
              selfHref(FRONTHOST + "/desdetail.php?desid=" + desid);
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
                const desid = this.getAttribute("desid");
                selfHref(FRONTHOST + "/desdetail.php?desid=" + desid);
              }
            }
          },
          style: {
            display: "inline-block",
            position: "relative",
            width: withOut(belowWhiteWidth + belowPictureWidth + (belowPictureMargin * 2) + belowTextAreaPaddingLeft, ea),
            paddingTop: String(mobileDesignerWordingTop) + ea,
            marginLeft: String(belowPictureMargin) + ea,
            paddingLeft: String(belowTextAreaPaddingLeft) + ea,
            verticalAlign: "top",
          },
          children: [
            {
              text: designer.designer,
              style: {
                fontSize: String(belowTextTitleSize) + ea,
                fontWeight: String(belowTextTitleWeight),
                color: colorChip.black,
                lineHeight: String(belowTextTitleLineHeight),
              }
            },
            {
              style: {
                display: "block",
                height: String(belowTextAreaTitleBarTop) + ea,
                width: String(100) + '%',
                borderBottom: "1px solid " + colorChip.gray3,
              }
            },
            {
              text: designerMthParsing(designer.setting.front.methods).join(", ") + "\n" + designerCareer(designer, true),
              style: {
                fontSize: String(belowTextAreaSubSize) + ea,
                fontWeight: String(belowTextAreaSubWeight),
                color: colorChip.shadow,
                lineHeight: String(belowTextAreaSubLineHeight),
                marginTop: String(belowTextAreaSubMarginTop) + ea,
              },
              bold: {
                fontSize: String(belowTextAreaSubSize) + ea,
                fontWeight: String(belowTextAreaSubWeight),
                color: colorChip.shadow,
              }
            },
          ]
        },
        {
          text: "Designer",
          style: {
            position: "absolute",
            fontSize: String(portfolioWordingSize) + ea,
            fontWeight: String(portfolioWordingWeight),
            fontFamily: "graphik",
            color: colorChip.black,
            top: String(belowBoxPadding) + ea,
            right: String(belowBoxPadding) + ea,
            textAlign: "right",
          }
        }
      ]
    });
  }

  createNode({
    mother: mainTong,
    style: {
      display: "block",
      height: String(blankMarginLast) + ea,
    }
  });

  if (desktop) {
    designerTong = belowBox.firstChild;
    designerMthTargets = designerMthParsing(designer.setting.front.methods);
    for (let mth of designerMthTargets) {
      createNode({
        mother: designerTong,
        text: mth,
        style: {
          marginTop: String(designerMthMarginTop) + ea,
          textAlign: "center",
          fontSize: String(designerMthSize) + ea,
          fontWeight: String(designerMthWeight),
          color: colorChip.black,
        }
      });
    }

    createNode({
      mother: designerTong,
      text: designerCareer(designer, true),
      style: {
        position: "absolute",
        width: String(100) + '%',
        textAlign: "center",
        bottom: String(careerBottom) + ea,
        fontSize: String(careerSize) + ea,
        fontWeight: String(careerWeight),
        color: colorChip.black,
      },
      bold: {
        fontWeight: String(200),
        color: colorChip.deactive,
      }
    });
  }

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
  const { createNode, colorChip, colorExtended, withOut, svgMaker, sleep, setQueue, equalJson, isMac, isIphone, selfHref, swipePatch, homeliaisonAnalytics, dateToString } = GeneralJs;
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

  this.relativePhotoNumber = 0;

  baseWidth = <%% 1300, 980, 800, 640, 76 %%>;
  baseBetween = standardWidth - baseWidth;

  arrowHeight = <%% 28, 25, 25, 24, 4 %%>;
  arrowTop = <%% 230, 218, 230, 190, 34 %%>;

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

  photoMargin = <%% 20, 16, 16, 14, 3 %%>;
  columns = <%% 5, 4, 3, 3, 2 %%>;
  photoRatio = (297 / 210);
  seroWidth = (baseWidth - (photoMargin * (columns - 1))) / columns;
  photoHeight = seroWidth * photoRatio;
  photoMarginBottom = <%% (isMac() ? 15 : 17), (isMac() ? 15 : 17), (isMac() ? 15 : 17), (isMac() ? 13 : 15), 2.4 %%>;

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

  // share

  shareTong = createNode({
    mother: totalContents,
    style: {
      display: "block",
      position: "relative",
      width: withOut(0),
      background: colorExtended.gray1,
      height: String(shareTongHeight) + ea,
    }
  });

  shareBaseTong = createNode({
    mother: shareTong,
    style: {
      display: "flex",
      flexDirection: "row",
      position: "relative",
      width: String(standardWidth) + ea,
      height: withOut(0, ea),
      left: "calc(50% - " + String(standardWidth / 2) + ea + ")",
      justifyContent: "center",
      alignItems: "center",
    },
    children: [
      {
        mode: "svg",
        source: svgMaker.facebookIcon(colorChip.black),
        event: {
          click: function (e) {
            if (window.FB !== undefined) {
              homeliaisonAnalytics({
                page: instance.pageName,
                standard: instance.firstPageViewTime,
                action: "shareFacebook",
                data: {
                  href: window.encodeURIComponent(window.location.href),
                  date: dateToString(new Date(), true),
                },
              }).catch((err) => {
                console.log(err);
              });
              window.FB.ui({
                method: 'share',
                href: window.location.href,
              }, (response) => {});
            }
          }
        },
        style: {
          display: "inline-block",
          position: "relative",
          height: String(shareIconHeight) + ea,
          cursor: "pointer",
        }
      },
      {
        mode: "svg",
        source: svgMaker.talkIcon(colorChip.black),
        event: {
          click: function () {
            if (window.Kakao !== undefined) {
              homeliaisonAnalytics({
                page: instance.pageName,
                standard: instance.firstPageViewTime,
                action: "shareKaKao",
                data: {
                  href: window.encodeURIComponent(window.location.href),
                  date: dateToString(new Date(), true),
                },
              }).catch((err) => {
                console.log(err);
              });
              window.Kakao.Share.sendDefault({
                objectType: "feed",
                content: {
                  title: document.querySelector("title").textContent,
                  description: [ ...document.querySelectorAll("meta") ].find((dom) => { return dom.getAttribute("property") === "og:description" }).getAttribute("content"),
                  imageUrl: FRONTHOST + [ ...document.querySelectorAll("meta") ].find((dom) => { return dom.getAttribute("property") === "og:image" }).getAttribute("content"),
                  link: {
                    mobileWebUrl: window.location.href,
                    webUrl: window.location.href,
                  },
                },
                buttons: [
                  {
                    title: "웹으로 보기",
                    link: {
                      mobileWebUrl: window.location.href,
                      webUrl: window.location.href,
                    },
                  }
                ],
              });
            }
          }
        },
        style: {
          display: "inline-block",
          position: "relative",
          height: String(shareIconHeight) + ea,
          marginLeft: String(shareIconBetween0) + ea,
          marginRight: String(shareIconBetween1) + ea,
          cursor: "pointer",
        }
      },
      {
        mode: "svg",
        source: svgMaker.linkIcon(colorChip.black),
        event: {
          click: async function (e) {
            try {
              homeliaisonAnalytics({
                page: instance.pageName,
                standard: instance.firstPageViewTime,
                action: "shareLink",
                data: {
                  href: window.encodeURIComponent(window.location.href),
                  date: dateToString(new Date(), true),
                },
              }).catch((err) => {
                console.log(err);
              });
              await window.navigator.clipboard.writeText(window.location.href);
              window.alert("링크가 복사되었습니다!");
            } catch (e) {
              console.log(e);
            }
          }
        },
        style: {
          display: "inline-block",
          position: "relative",
          height: String(shareIconHeight) + ea,
          cursor: "pointer",
        }
      },
      {
        text: "previous",
        event: {
          click: function (e) {
            const entireContents = instance.contentsArr.toNormal();
            const entireContentsLength = entireContents.length;
            let thisContentsIndex;
            let previousIndex;
            let newLink;
            thisContentsIndex = entireContents.findIndex((obj) => { return obj.contents.portfolio.pid === pid });
            if (thisContentsIndex === entireContentsLength - 1) {
              previousIndex = thisContentsIndex;
            } else {
              previousIndex = thisContentsIndex + 1;
            }
            newLink = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search.replace(new RegExp("pid=" + pid, "gi"), "pid=" + entireContents[previousIndex].contents.portfolio.pid);
            selfHref(newLink);
          }
        },
        style: {
          display: "inline-block",
          position: "absolute",
          fontSize: String(previousNextSize) + ea,
          fontWeight: String(previousNextWeight),
          color: colorChip.darkDarkShadow,
          fontFamily: "graphik",
          top: String(previousNextTextTop) + ea,
          left: String(previousNextLeftRight) + ea,
          cursor: "pointer",
        }
      },
      {
        text: "next",
        event: {
          click: function (e) {
            const entireContents = instance.contentsArr.toNormal();
            const entireContentsLength = entireContents.length;
            let thisContentsIndex;
            let nextIndex;
            let newLink;
            thisContentsIndex = entireContents.findIndex((obj) => { return obj.contents.portfolio.pid === pid });
            if (thisContentsIndex === 0) {
              nextIndex = 0;
            } else {
              nextIndex = thisContentsIndex - 1;
            }
            newLink = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search.replace(new RegExp("pid=" + pid, "gi"), "pid=" + entireContents[nextIndex].contents.portfolio.pid);
            selfHref(newLink);
          }
        },
        style: {
          display: "inline-block",
          position: "absolute",
          fontSize: String(previousNextSize) + ea,
          fontWeight: String(previousNextWeight),
          color: colorChip.darkDarkShadow,
          fontFamily: "graphik",
          top: String(previousNextTextTop) + ea,
          right: String(previousNextLeftRight) + ea,
          cursor: "pointer",
        }
      },
    ]
  });

  // relative

  mainTong = createNode({
    mother: totalContents,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
      background: colorExtended.gray0,
      paddingTop: String(mainPaddingTop) + ea,
      paddingBottom: String(150) + ea,
    }
  });

  baseTong = createNode({
    mother: mainTong,
    style: {
      display: "block",
      position: "relative",
      width: String(standardWidth) + ea,
      left: "calc(50% - " + String(standardWidth / 2) + ea + ")",
    }
  });

  createNode({
    mother: baseTong,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
      height: String(titleHeight) + ea,
      marginBottom: String(titleMarginBottom) + ea,
      textAlign: "center",
    },
    children: [
      {
        text: "유사한 고객 후기",
        style: {
          fontSize: String(mainTitleSize) + ea,
          fontWeight: String(mainTitleWeight),
          color: colorChip.black,
          display: "inline-block",
          position: "absolute",
          fontFamily: "pretendard",
          top: String(mainTitleTop) + ea,
          textAlign: "center",
          width: String(mainTitleWidth) + ea,
          left: "calc(50% - " + String(mainTitleWidth / 2) + ea + ")"
        }
      }
    ]
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
            source: this.mother.returnBigArrow(colorExtended.mainBlue),
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
            source: this.mother.returnBigArrow(colorExtended.mainBlue),
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
            src = FRONTHOST + "/list_image/portp" + filteredContents.portfolio.pid + "/" + photoChar + String(filteredContents.review.detailInfo.photodae[0]) + filteredContents.portfolio.pid + ".jpg";
          } else {
            src = FRONTHOST + "/list_image/portp" + filteredContents.portfolio.pid + "/mobile/" + photoCharMobile + String(filteredContents.review.detailInfo.photodae[0]) + filteredContents.portfolio.pid + ".jpg";
          }
          title = filteredContents.review.title.sub.split(", ").join(" ");
          tag = equalJson(JSON.stringify(filteredContents.portfolio.detailInfo.tag));

          if (desktop) {
            tag = tag.slice(5, 10);
          } else {
            tag = tag.slice(5, 8);
          }
          if (tag.reduce((acc, curr) => { return acc + curr.length }, 0) > 17) {
            tag = tag.slice(0, -1);
          }

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
              borderRadius: String(5) + "px",
              marginRight: String(photoMargin) + ea,
              verticalAlign: "top",
              overflow: "hidden",
              cursor: "pointer",
            },
            children: [
              {
                style: {
                  display: "block",
                  width: String(seroWidth) + ea,
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
                  marginTop: String(subTitleMarginTopReview) + ea,
                  paddingLeft: String(quoteWidth + titleMarginLeft + reviewSubTitleVisual) + ea,
                  width: withOut(quoteWidth + titleMarginLeft + reviewSubTitleVisual, ea),
                  left: String(0) + ea,
                },
                children: [
                  {
                    text: filteredContents.portfolio.spaceInfo.space + " " + String(filteredContents.portfolio.spaceInfo.pyeong) + "py " + ((media[0] || media[1] || media[2]) ? "홈스타일링 후기" : "후기"),
                    style: {
                      display: "inline-block",
                      fontSize: String(subTitleSize) + ea,
                      fontWeight: String(titleWeight),
                      color: colorChip.gray5,
                    }
                  },
                  {
                    mode: "svg",
                    source: svgMaker.horizontalArrow(subArrowWidth, subArrowHeight),
                    style: {
                      position: "absolute",
                      width: String(subArrowWidth) + ea,
                      right: String(0),
                      bottom: String(subArrowReviewBottom) + ea,
                    }
                  }
                ]
              }
            ]
          });

          instance.relativePhotoNumber++;
        }
      }

    } catch (e) {
      console.log(e);
    }
  }, 1000);


}

ReviewDetailJs.prototype.reviewDesignerBox = function () {
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

  story.shift();
  customerStory = '';
  for (let { answer } of customerStoryMother) {
    customerStory += answer;
    customerStory += "\n\n";
  }
  customerStory = customerStory.slice(0, -2);

  mainWidth = <%% 980, 940, 900, 720, 100 %%>;
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

  boxHeight = 404;
  boxPhotoWidth = 652;
  boxBorderRadius = 10;
  boxBetween = 12;

  boxDetailBoxPaddingTop = 24;
  boxDetailBoxPaddingLeft = 24;

  boxDetailBoxLineMargin = 8;

  boxDetailAbsolutePadding = 10;
  boxDetailAbsoluteBoxHeight = 52;

  boxDetailAbsoluteArrowPadding = 12;
  boxDetailAbsoluteTextSize = 15;
  boxDetailAbsoluteTextWeight = 300;
  boxDetailAbsoluteArrowWidth = 18;
  boxDetailAbsoluteArrowBetween = 6;
  boxDetailAbsoluteArrowVisualTop = -0.5;

  boxDetailBoxTitleSize = 20;
  boxDetailBoxTitleWeight = 700;
  boxDetailBoxDetailSize = 13;
  boxDetailBoxDetailWeight = 400;

  boxDetailBoxTitleEngSize = 22;
  boxDetailBoxTitleEngWeight = 700;
  boxDetailBoxTitleEngVisualTop = 0.5;

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

  createNode({
    mother: mainTong,
    style: {
      display: "block",
      height: String(140) + ea,
    }
  });

  createNode({
    mother: mainTong,
    style: {
      display: "flex",
      position: "relative",
      width: withOut(0, ea),
      height: String(boxHeight) + ea,
      flexDirection: "row",
      justifyContent: "start",
      alignItems: "start",
    },
    children: [
      {
        style: {
          display: "inline-flex",
          position: "relative",
          height: withOut(0, ea),
          width: String(boxPhotoWidth) + ea,
          backgroundImage: "url('" + FRONTHOST + "/list_image/portp" + pid + (desktop ? ("/" + photoChar) : ("/mobile/" + photoCharMobile)) + String(3) + pid + ".jpg" + "')",
          backgroundSize: "100% auto",
          backgroundPosition: "50% 50%",
          borderRadius: String(boxBorderRadius) + "px",
        }
      },
      {
        style: {
          display: "inline-flex",
          position: "relative",
          height: withOut(0, ea),
          width: withOut(boxPhotoWidth + boxBetween, ea),
          marginLeft: String(boxBetween) + ea,
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
              height: "calc(calc(calc(100% - " + String(boxBetween) + ea + ") / 2) - " + String(boxDetailBoxPaddingTop * 2) + ea + ")",
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
                },
                child: {
                  text: "DESIGNER HOME",
                  style: {
                    display: "inline-block",
                    position: "relative",
                    fontSize: String(boxDetailAbsoluteTextSize) + ea,
                    fontWeight: String(boxDetailAbsoluteTextWeight),
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
                  text: "호지희 디자이너",
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
                  marginBottom: String(boxDetailBoxLineMargin) + ea,
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
                  text: "홈스타일링&nbsp;&nbsp;&nbsp;토탈 스타일링",
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
                  text: "경력&nbsp;&nbsp;&nbsp;9년 11개월",
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
            ],
          },
          {
            style: {
              display: "flex",
              position: "relative",
              width: withOut(boxDetailBoxPaddingLeft * 2, ea),
              height: "calc(calc(calc(100% - " + String(boxBetween) + ea + ") / 2) - " + String(boxDetailBoxPaddingTop * 2) + ea + ")",
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
                  text: "PORTFOLIO",
                  style: {
                    display: "inline-block",
                    position: "relative",
                    fontSize: String(boxDetailAbsoluteTextSize) + ea,
                    fontWeight: String(boxDetailAbsoluteTextWeight),
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
                  text: "강남구 오피스 <b%11PY%b>",
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
                  marginBottom: String(boxDetailBoxLineMargin) + ea,
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
                  text: "오프라인 홈스타일링",
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
                  text: "모던하고 무게감 있는 강남구 오피스 홈스타일링",
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
      height: String(150) + ea,
    }
  });

}

ReviewDetailJs.prototype.launching = async function (loading) {
  const instance = this;
  const { returnGet, ajaxJson, colorExtended, setQueue, setDebounce, facebookSdkPatch, kakaoSdkPatch, setMetaData, homeliaisonAnalytics, dateToString } = GeneralJs;
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
    let response;
    let thisVersion;

    if (typeof pid !== "string") {
      throw new Error("invaild pid");
    }
    this.pid = pid;

    response = await ajaxJson({ mode: "review", pid }, LOGHOST + "/getContents", { equal: true });
    this.contentsArr = new SearchArray(response.contentsArr);
    this.designers = new SearchArray(response.designers);
    this.fullLoad = false;
    this.photoLoad = false;
    this.loadedContents = [];

    thisVersion = GeneralJs.returnGet().mode === undefined ? 0 : Number(GeneralJs.returnGet().mode);
    this.version = thisVersion;

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
            instance.reviewDesignerBox();
          }
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
      facebookSdkPatch().then(() => {
        return kakaoSdkPatch();
      }).catch((err) => {
        console.log(err);
      });
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
